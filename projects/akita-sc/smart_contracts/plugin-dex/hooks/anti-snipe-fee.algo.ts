import { Account, Application, BoxMap, clone, Contract, Global, GlobalState, loggedAssert, op, uint64 } from '@algorandfoundation/algorand-typescript'
import { abimethod, decodeArc4, sizeOf } from '@algorandfoundation/algorand-typescript/arc4'
import {
  HookPointAfterAddLiquidity,
  HookPointAfterInitialize,
  HookPointBeforeSwap,
  HookPointQuote,
  HookResultSetFee,
  MaxFeeBps,
  MaxPoolFeeCapBps,
} from '../constants'
import { passResult, requireDexCaller } from '../hook-interface'
import { HookContext, HookResult } from '../types'

// ANTI-SNIPE FEE HOOK (FINAL-SPEC §5 WP5b, akita-hooks B5.1) --------------------------------------

/** Linear decay from startFeeBps to endFeeBps over `decayRounds` rounds */
export const SnipeDecayLinear: uint64 = 0
/** Halving decay with half-life `decayRounds`, linearly interpolated inside each half-life */
export const SnipeDecayExponential: uint64 = 1
/** The decay clock starts at the pool's AfterInitialize (createPool) */
export const SnipeStartCreation: uint64 = 0
/**
 * The decay clock starts at the pool's first AfterAddLiquidity (addLiquidity or initializeLaunch), or at its
 * first BeforeSwap if that comes first (an install without the AfterAddLiquidity point)
 */
export const SnipeStartFirstLiquidity: uint64 = 1
/**
 * Bound on the decay: a linear duration, or 64 half-lives, may not exceed this many rounds
 * (about 3.2 days at 2.8 s per round). After it the fee is endFeeBps.
 */
export const SnipeMaxDecayRounds: uint64 = 100_000
/** Box prefix of the per-pool config */
export const AntiSnipeBoxPrefix = 's'

/**
 * F6 initData of one pool (ABI tuple, 72 bytes). `exempt` is the zero address or the pool creator
 * (ctx.caller at AfterInitialize; for managed launches this is the LaunchManager app account).
 */
export type SnipeInit = {
  startFeeBps: uint64
  endFeeBps: uint64
  decayMode: uint64
  decayRounds: uint64
  startMode: uint64
  exempt: Account
}

/**
 * Per-pool state. `startRound == 0` means the clock has not started (FirstLiquidity before the first add, or
 * before the first swap when the install lacks AfterAddLiquidity).
 */
export type SnipeConfig = {
  startRound: uint64
  startFeeBps: uint64
  endFeeBps: uint64
  decayMode: uint64
  decayRounds: uint64
  startMode: uint64
  exempt: Account
}

const errBadConfig = 'errAxcf'
const errInitialized = 'errAxin'
const errBadInitData = 'errAxdt'

/**
 * The anti-snipe fee at `elapsed` rounds after the start. Linear:
 * `end + (start − end)·(D − e)/D` for `e < D`, else `end`. Exponential (half-life H):
 * `x₀ = (start − end) >> (e/H)`, `fee = end + x₀ − x₀·(e mod H)/(2H)`, and `end` once `e/H ≥ 64`.
 */
export function snipeFee(config: SnipeConfig, elapsed: uint64): uint64 {
  const span: uint64 = config.startFeeBps - config.endFeeBps
  if (config.decayMode === SnipeDecayLinear) {
    if (elapsed >= config.decayRounds) {
      return config.endFeeBps
    }
    return config.endFeeBps + op.divw(...op.mulw(span, config.decayRounds - elapsed), config.decayRounds)
  }
  const halvings: uint64 = elapsed / config.decayRounds
  if (halvings >= 64) {
    return config.endFeeBps
  }
  const x0 = op.shr(span, halvings)
  const within: uint64 = elapsed % config.decayRounds
  return config.endFeeBps + x0 - op.divw(...op.mulw(x0, within), 2 * config.decayRounds)
}

/**
 * Multi-tenant DynamicFee hook that charges snipers a decaying, LP-bound fee on the first rounds of a
 * pool (akita-hooks B5.1).
 *
 * - Permission: DynamicFee. Points: `AfterInitialize | BeforeSwap | Quote`, plus `AfterAddLiquidity` for
 *   `SnipeStartFirstLiquidity`. The hook cannot see its install's points, so a FirstLiquidity pool
 *   without `AfterAddLiquidity` (or any pool whose clock is still unstarted) starts the clock at its first
 *   BeforeSwap: the start fee and the creator exemption never outlive the first trading round.
 * - Each pool is configured once through F6: `HookInstall.initData = encode(SnipeInit)` and
 *   `HookInstall.funding ≥ AntiSnipeFunding()` (the config box MBR). A pool that installs it without
 *   `AfterInitialize` is never configured and the hook passes.
 * - The fee goes to reserves as an ordinary LP fee (the Vault applies it), never to the creator, so a
 *   creator cannot snipe their own launch for free. The protocol share applies.
 * - It returns `SetFee` with `max(ctx.feeBps, fee)`: the hook never lowers a fee set earlier in the
 *   stack (place it after GatedFeeHook). The Vault separately caps the result at `pool.maxFeeBps`, so a
 *   pool using this hook needs `maxFeeBps ≥ startFeeBps` (LaunchManager sets it).
 * - Exemption: `ctx.caller == exempt` at `e == 0` pays the running fee. `exempt` can only be the pool
 *   creator (for managed launches, LaunchManager), which already chooses the whole hook stack.
 * - Deterministic in `Global.round`, so a quote and a swap in the same group agree.
 */
export class AntiSnipeFeeHook extends Contract {
  dex = GlobalState<Application>({ key: 'dex' })
  configs = BoxMap<uint64, SnipeConfig>({ keyPrefix: AntiSnipeBoxPrefix })

  @abimethod({ onCreate: 'require' })
  create(dex: Application): void {
    this.dex.value = dex
  }

  akitaDexHook(dex: Application, hookIndex: uint64, ctx: HookContext): HookResult {
    requireDexCaller(this.dex.value)

    if (ctx.point === HookPointAfterInitialize) {
      this.initialize(ctx)
      return passResult()
    }

    if (!this.configs(ctx.poolId).exists) {
      return passResult()
    }

    if (ctx.point === HookPointAfterAddLiquidity) {
      const box = this.configs(ctx.poolId)
      if (box.value.startMode === SnipeStartFirstLiquidity && box.value.startRound === 0) {
        box.value.startRound = Global.round
      }
      return passResult()
    }

    if (ctx.point !== HookPointBeforeSwap && ctx.point !== HookPointQuote) {
      return passResult()
    }

    const config = clone(this.configs(ctx.poolId).value)
    // FirstLiquidity whose clock has not started (the install lacks AfterAddLiquidity, or no deposit fired
    // it): the first swap starts it. A swap needs liquidity, so this is at the latest the first round the
    // pool trades; a failed swap reverts the write. Quote cannot write: it prices the same round as e == 0,
    // which is what BeforeSwap in that round charges, so quote == swap holds.
    if (ctx.point === HookPointBeforeSwap && config.startRound === 0) {
      this.configs(ctx.poolId).value.startRound = Global.round
    }
    // before the clock starts the full start fee applies (elapsed 0)
    const elapsed: uint64 = config.startRound === 0 ? 0 : Global.round - config.startRound
    if (elapsed === 0 && config.exempt !== Global.zeroAddress && ctx.caller === config.exempt) {
      return passResult()
    }
    const fee = snipeFee(config, elapsed)
    return { flags: HookResultSetFee, feeBps: fee > ctx.feeBps ? fee : ctx.feeBps, hookFee: 0, hookFeeOutBps: 0 }
  }

  /** F6: validate and store this pool's config from its initData */
  private initialize(ctx: HookContext): void {
    loggedAssert(!this.configs(ctx.poolId).exists, errInitialized)
    loggedAssert(ctx.data.length === sizeOf<SnipeInit>(), errBadInitData)
    const init = decodeArc4<SnipeInit>(ctx.data)

    loggedAssert(
      init.startFeeBps <= MaxPoolFeeCapBps && init.endFeeBps <= MaxFeeBps && init.endFeeBps <= init.startFeeBps,
      errBadConfig,
    )
    loggedAssert(init.decayRounds > 0 && init.startMode <= SnipeStartFirstLiquidity, errBadConfig)
    if (init.decayMode === SnipeDecayLinear) {
      loggedAssert(init.decayRounds <= SnipeMaxDecayRounds, errBadConfig)
    } else {
      loggedAssert(init.decayMode === SnipeDecayExponential && init.decayRounds <= SnipeMaxDecayRounds / 64, errBadConfig)
    }
    loggedAssert(init.exempt === Global.zeroAddress || init.exempt === ctx.caller, errBadConfig)

    this.configs(ctx.poolId).value = {
      startRound: init.startMode === SnipeStartCreation ? Global.round : 0,
      startFeeBps: init.startFeeBps,
      endFeeBps: init.endFeeBps,
      decayMode: init.decayMode,
      decayRounds: init.decayRounds,
      startMode: init.startMode,
      exempt: init.exempt,
    }
  }

  // READ ONLY -------------------------------------------------------------------------------------

  @abimethod({ readonly: true })
  getConfig(poolId: uint64): SnipeConfig {
    loggedAssert(this.configs(poolId).exists, errBadConfig)
    return clone(this.configs(poolId).value)
  }

  /** The anti-snipe fee of `poolId` at `round` (before `max` with the running fee); 0 if unconfigured */
  @abimethod({ readonly: true })
  feeAt(poolId: uint64, round: uint64): uint64 {
    if (!this.configs(poolId).exists) {
      return 0
    }
    const config = clone(this.configs(poolId).value)
    const elapsed: uint64 = config.startRound === 0 || round <= config.startRound ? 0 : round - config.startRound
    return snipeFee(config, elapsed)
  }
}

/** F6 funding a pool must give this hook: the MBR of its config box */
export function antiSnipeFunding(): uint64 {
  return 2_500 + 400 * (1 + 8 + sizeOf<SnipeConfig>())
}

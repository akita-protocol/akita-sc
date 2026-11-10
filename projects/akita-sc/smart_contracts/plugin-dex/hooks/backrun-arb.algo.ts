import {
  Account,
  Application,
  BigUint,
  biguint,
  BoxMap,
  Bytes,
  clone,
  Contract,
  emit,
  ensureBudget,
  Global,
  GlobalState,
  itxn,
  loggedAssert,
  op,
  OpUpFeeSource,
  Txn,
  uint64,
  Uint64,
} from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod } from '@algorandfoundation/algorand-typescript/arc4'
import { BpsDivisor, CurveFlagBonding, HookPermCustody, HookPointAfterSwap, HookPointPoke, HookResultRequestCustody } from '../constants'
import { passResult, rekeyBackToDex, requireDexCaller } from '../hook-interface'
import { mulDiv, mulDivUp } from '../math'
import { HookContext, HookResult } from '../types'
import { TmPool, tmFixedInputOut, tmPoolAddress, tmReadPool, tmSwapAs } from './shared/tinyman-v2'

// CONTRACT IMPORTS
import type { PluginDex } from '../contract.algo'

/**
 * Fee buffer per backrun pool (see the class doc): the most inner transactions a backrun that runs adds over
 * the no-gap skip path. Lazy: 2 sizing op-ups + 2 custody-budget op-ups + the Vault's rekey + the custody
 * call + the Tinyman deposit, appl and payout (9), plus 2 op-ups the Vault may issue at its checkpoints.
 */
export const BackrunMaxExtraInners: uint64 = 11
/** a backrun never sells more than half of the sold reserve: keeps the k break-even in uint64 */
const MaxTradeCapBps: uint64 = 5_000
const MaxUint64: uint64 = Uint64(18_446_744_073_709_551_615n)
/**
 * Pooled opcode budget ensured once a price gap is found, before sizing: covers the closed form, Tinyman's
 * exact output, the break-even and the return, with spare for the Vault to decode the result and reach its
 * own checkpoint (§10 A14 asks curves for 100; hooks get the same courtesy). Op-ups are fee 0
 * (OpUpFeeSource.GroupCredit): the caller's group pays for them (OPEN-DECISIONS #19).
 */
const SizingBudget: uint64 = 900
/**
 * Pooled budget ensured at the end of a lazy call that asks for custody (group credit): the Vault's custody
 * snapshot and rekey, the custody call's execution, Tinyman's swap and the Vault's guard then run without
 * the Vault issuing op-ups of its own.
 */
const LazyCustodyBudget: uint64 = 1_000
/** the same for an eager custody call that executes: Tinyman's swap, the handback and the Vault's guard */
const EagerExecuteBudget: uint64 = 1_000

const errAdminOnly = 'errBrao'
const errPoolNotEligible = 'errBrpl'
const errNoVenue = 'errBrtm'
const errBadParams = 'errBrpm'

/** Per-pool registration (box `b‖poolId`) */
export type BackrunVenue = {
  /** Tinyman v2 pool logicsig account for the pair (derived on chain at registration) */
  pool: Account
  assetA: uint64
  assetB: uint64
  /** LP-profit floor per executed backrun, in units of the side that gains (A when selling B) */
  minSurplusA: uint64
  minSurplusB: uint64
  /** clamp on the amount sold, bps of the sold reserve (≤ 5,000) */
  maxTradeBps: uint64
  /** per-pool kill switch */
  enabled: boolean
}

/** A backrun decision; a pure function of the hook context, Tinyman state and the venue */
export type BackrunPlan = {
  execute: boolean
  /** true: sell A to Tinyman for B */
  sellA: boolean
  amountIn: uint64
  /** exact Tinyman output */
  amountOut: uint64
  /** passed to Tinyman: k break-even + guard fee + minSurplus */
  minOut: uint64
}

export type BackrunEvent = {
  poolId: uint64
  point: uint64
  sellA: boolean
  amountIn: uint64
  amountOut: uint64
}

function skipPlan(): BackrunPlan {
  return { execute: false, sellA: false, amountIn: 0, amountOut: 0, minOut: 0 }
}

/**
 * BackrunArbHook: an AfterSwap/Poke custody hook that arbitrages the pool against the Tinyman v2 pool of
 * the same pair, so the reversion value after uninformed flow stays with LPs (research/lvr.md §3,
 * FINAL-SPEC §5 WP3).
 *
 * - Install with Custody, points AfterSwap | Poke, flag HookFlagLazyCustody. The first (non-custody)
 *   call reads Tinyman and decides; it asks for custody only when the trade passes the Vault guard with
 *   margin: `surplus ≥ minSurplus + guardFee`, `guardFee = ceil(out·custodyFeeBps/1e4)`. The no-gap skip
 *   path costs the swapper exactly one inner transaction (this hook's call).
 * - Sizing maximizes the guard slack `(x₁ − a)(y₁ + (1 − φ)·g(a))` with φ = ctx.custodyFeeBps: the
 *   lvr §3.2 closed form with Tinyman's output scaled by (1 − φ). It trades iff Tinyman's post-fee price
 *   beats ours by more than the custody fee.
 * - Fees (OPEN-DECISIONS #19): every inner transaction this hook issues is fee 0, op-ups included
 *   (OpUpFeeSource.GroupCredit). The caller's group pays for all of them through fee pooling; there is no
 *   keeper tip, gas tank or fee rebate, so the whole surplus above the guard fee stays with LPs.
 *   Simulate-based fee coverage (e.g. algokit `coverAppCallInnerTransactionFees`) prices the path the
 *   simulation took.
 * - Fee buffer: if prices move between simulate and submit, a backrun simulated as skipped may run at
 *   submit (or the reverse). Running costs more inners than the skip, and an underfunded group fails as a
 *   whole (the user's swap included), so callers should add a buffer of at most `BackrunMaxExtraInners`
 *   (11) × min fee per backrun pool on the route: lazy, up to 2 sizing op-ups + 2 custody-budget op-ups +
 *   the Vault's rekey + the custody call + the Tinyman deposit, appl and payout + 2 op-ups the Vault may
 *   issue at its checkpoints (eager installs add fewer). A backrun simulated as running that skips at
 *   submit only overpays.
 * - Never reverts the user's swap on its own account: every unmet condition (paused, unregistered or
 *   disabled pool, Tinyman locked, no gap, dust, a surplus not above guardFee + minSurplus) is a skip
 *   (lvr §3.7). Native, non-launch, external-free pools only (checked at registration; curve and bonding
 *   contexts pass through).
 * - Admin (DAO wallet): `registerPool` (top level, reads `PluginDex.getPool`), per-pool `enabled`, global
 *   `paused`, withdrawal of ALGO above the box MBR. The guard protects LP funds whatever the admin does.
 */
export class BackrunArbHook extends Contract {
  dex = GlobalState<Application>({ key: 'dex' })
  /** Tinyman v2 AMM app (mainnet 1002541853) */
  tinyman = GlobalState<Application>({ key: 'tinyman' })
  admin = GlobalState<Account>({ key: 'admin' })
  /** global kill switch: the hook becomes pass-through */
  paused = GlobalState<boolean>({ key: 'paused' })
  /**
   * poolId + 1 between a lazy call that decided to execute and the custody call that consumes it; 0
   * otherwise
   */
  pendingPool = GlobalState<uint64>({ key: 'pending' })
  /** the plan decided by that lazy call; the custody call at the same point executes it without recomputing */
  pending = GlobalState<BackrunPlan>({ key: 'plan' })

  venues = BoxMap<uint64, BackrunVenue>({ keyPrefix: 'b' })

  @abimethod({ onCreate: 'require' })
  create(dex: Application, tinyman: Application, admin: Account): void {
    this.dex.value = dex
    this.tinyman.value = tinyman
    this.admin.value = admin
    this.paused.value = false
    this.pendingPool.value = 0
  }

  // ADMIN ----------------------------------------------------------------------------------------

  private requireAdmin(): void {
    loggedAssert(Txn.sender === this.admin.value, errAdminOnly)
  }

  setAdmin(admin: Account): void {
    this.requireAdmin()
    this.admin.value = admin
  }

  setPaused(paused: boolean): void {
    this.requireAdmin()
    this.paused.value = paused
  }

  /**
   * Register (or re-register) a native pool. Called at the top level, so the Vault is not on the stack:
   * reads the pool, derives the Tinyman pool for its pair on chain and requires it to be bootstrapped.
   * Box MBR (35,300 µALGO) comes from this app's balance; the inner reads are fee 0 (the caller pays).
   */
  registerPool(poolId: uint64, minSurplusA: uint64, minSurplusB: uint64, maxTradeBps: uint64): void {
    this.requireAdmin()
    loggedAssert(maxTradeBps > 0 && maxTradeBps <= MaxTradeCapBps, errBadParams)

    const pool = abiCall<typeof PluginDex.prototype.getPool>({ appId: this.dex.value, args: [poolId], fee: 0 }).returnValue
    loggedAssert(pool.curve === 0 && pool.externalSlots === 0 && (pool.virtualA | pool.virtualB) === 0, errPoolNotEligible)
    // the pool must run this hook with custody at AfterSwap or Poke: a lazy call that asks for custody is
    // then always followed by the custody call, so the pending marker can never go stale
    const hooks = abiCall<typeof PluginDex.prototype.getPoolHooks>({ appId: this.dex.value, args: [poolId], fee: 0 }).returnValue
    let installed = false
    for (let i: uint64 = 0; i < hooks.length; i += 1) {
      const hook = clone(hooks[i])
      if (hook.app === Global.currentApplicationId.id && (hook.perms & HookPermCustody) !== 0 && (hook.points & (HookPointAfterSwap | HookPointPoke)) !== 0) {
        installed = true
      }
    }
    loggedAssert(installed, errPoolNotEligible)

    const tmPool = tmPoolAddress(this.tinyman.value, pool.assetA, pool.assetB)
    const tm = tmReadPool(tmPool, this.tinyman.value)
    // Tinyman asset_1 is the larger id; PluginDex assetA is the smaller
    loggedAssert(tm.exists && tm.asset1 === pool.assetB && tm.asset2 === pool.assetA, errNoVenue)

    this.venues(poolId).value = {
      pool: tmPool,
      assetA: pool.assetA,
      assetB: pool.assetB,
      minSurplusA,
      minSurplusB,
      maxTradeBps,
      enabled: true,
    }
  }

  /** per-pool kill switch */
  setPoolEnabled(poolId: uint64, enabled: boolean): void {
    this.requireAdmin()
    loggedAssert(this.venues(poolId).exists, errNoVenue)
    this.venues(poolId).value.enabled = enabled
  }

  /** withdraw ALGO above the box MBR to the admin (fee 0: the admin's call pays) */
  withdraw(amount: uint64): void {
    this.requireAdmin()
    itxn.payment({ receiver: this.admin.value, amount, fee: 0 }).submit()
  }

  @abimethod({ readonly: true })
  getVenue(poolId: uint64): BackrunVenue {
    loggedAssert(this.venues(poolId).exists, errNoVenue)
    return clone(this.venues(poolId).value)
  }

  // HOOK -----------------------------------------------------------------------------------------

  akitaDexHook(dex: Application, hookIndex: uint64, ctx: HookContext): HookResult {
    requireDexCaller(this.dex.value)
    const pointOk = ctx.point === HookPointAfterSwap || ctx.point === HookPointPoke
    const custody = ctx.escrow.authAddress === Global.currentApplicationAddress

    if (!custody) {
      // lazy first call: decide without touching the escrow. A plan still pending would mean custody never
      // followed (impossible for registered pools): clear it and skip this once.
      if (this.pendingPool.value !== 0) {
        this.pendingPool.value = 0
        return passResult()
      }
      if (!pointOk) {
        return passResult()
      }
      const plan = this.plan(ctx)
      if (!plan.execute) {
        return passResult()
      }
      // the Vault calls again at this point with custody and nothing else in between, so the plan stays
      // valid. Pre-fund the custody path's budget on group credit so the Vault needs no op-ups for it.
      ensureBudget(LazyCustodyBudget, OpUpFeeSource.GroupCredit)
      this.pendingPool.value = ctx.poolId + 1
      this.pending.value = clone(plan)
      return { flags: HookResultRequestCustody, feeBps: 0, hookFee: 0, hookFeeOutBps: 0 }
    }

    const lazy = this.pendingPool.value !== 0
    let plan = skipPlan()
    if (lazy) {
      // lazy install: execute the plan of the call just before (same pool, same point)
      if (this.pendingPool.value === ctx.poolId + 1 && pointOk) {
        plan = clone(this.pending.value)
      }
      this.pendingPool.value = 0
    } else if (pointOk) {
      // eager install: decide now
      plan = this.plan(ctx)
      if (plan.execute) {
        ensureBudget(EagerExecuteBudget, OpUpFeeSource.GroupCredit)
      }
    }
    if (!plan.execute) {
      rekeyBackToDex(this.dex.value, ctx.escrow)
      return passResult()
    }
    this.execute(ctx, plan)
    return passResult()
  }

  // PRIVATE --------------------------------------------------------------------------------------

  /**
   * The backrun decision (lvr §3.2-§3.7 with the FINAL-SPEC overrides). Never reverts: every unmet
   * condition returns a skip.
   */
  private plan(ctx: HookContext): BackrunPlan {
    const skip = skipPlan()
    if (this.paused.value || ctx.curve !== 0 || (ctx.before.flags & CurveFlagBonding) !== 0) {
      return skip
    }
    if (!this.venues(ctx.poolId).exists) {
      return skip
    }
    const venue = clone(this.venues(ctx.poolId).value)
    if (!venue.enabled) {
      return skip
    }
    const inIsA = ctx.assetIn === venue.assetA && ctx.assetOut === venue.assetB
    if (!inIsA && !(ctx.assetIn === venue.assetB && ctx.assetOut === venue.assetA)) {
      return skip
    }
    if (ctx.custodyFeeBps >= BpsDivisor) {
      return skip
    }

    // our effective reserves (no virtual offsets on registered pools) and Tinyman's for (A, B)
    const rA: uint64 = inIsA ? ctx.reserveIn : ctx.reserveOut
    const rB: uint64 = inIsA ? ctx.reserveOut : ctx.reserveIn
    const tm: TmPool = tmReadPool(venue.pool, this.tinyman.value)
    if (!tm.exists || tm.lock !== 0 || tm.feeShare >= BpsDivisor) {
      return skip
    }
    const tA = tm.reserve2
    const tB = tm.reserve1
    if (rA === 0 || rB === 0 || tA === 0 || tB === 0) {
      return skip
    }

    // direction: sell X to Tinyman iff γ(1−φ)·(Tinyman price of X) > our price of X
    const g: uint64 = BpsDivisor - tm.feeShare
    const p: uint64 = BpsDivisor - ctx.custodyFeeBps
    const gp: biguint = BigUint(g * p)
    const scale: biguint = BigUint(BpsDivisor * BpsDivisor)
    let sellA = true
    if (gp * BigUint(tB) * BigUint(rA) > scale * BigUint(rB) * BigUint(tA)) {
      sellA = true
    } else if (gp * BigUint(tA) * BigUint(rB) > scale * BigUint(rA) * BigUint(tB)) {
      sellA = false
    } else {
      return skip
    }
    // a gap: everything below costs more than the Vault leaves a hook (≥ HookPreBudget + 700). Fee 0 op-ups:
    // the caller's group pays (OPEN-DECISIONS #19)
    ensureBudget(SizingBudget, OpUpFeeSource.GroupCredit)
    const x1: uint64 = sellA ? rA : rB
    const y1: uint64 = sellA ? rB : rA
    const x2: uint64 = sellA ? tA : tB
    const y2: uint64 = sellA ? tB : tA

    // u² = x₂·y₂'·(γx₁ + x₂) / (y₁ + y₂'), y₂' = (1−φ)·y₂, in bps integers:
    // u² = x₂·y₂·p·(g·x₁ + 1e4·x₂) / (1e4·(1e4·y₁ + p·y₂))
    const bps: biguint = BigUint(BpsDivisor)
    const bx2: biguint = BigUint(x2)
    const num: biguint = bx2 * BigUint(y2) * BigUint(p) * (BigUint(g) * BigUint(x1) + bps * bx2)
    const den: biguint = bps * (bps * BigUint(y1) + BigUint(p) * BigUint(y2))
    const u: biguint = op.bsqrt(num / den)
    if (u <= bx2) {
      return skip
    }
    const ideal: biguint = ((u - bx2) * bps) / BigUint(g)
    const cap = mulDiv(x1, venue.maxTradeBps, BpsDivisor)
    let a: uint64 = cap
    if (ideal < BigUint(cap)) {
      a = op.btoi(Bytes(ideal))
    }

    const assetX: uint64 = sellA ? venue.assetA : venue.assetB
    const assetY: uint64 = sellA ? venue.assetB : venue.assetA
    // exact Tinyman output; 0 covers dust (zero fee), empty, locked, overflow
    const out = tmFixedInputOut(tm, assetX, assetY, a)
    if (a === 0 || out === 0) {
      return skip
    }

    // k break-even on our pool: need = ceil(x₁·y₁ / (x₁ − a)) − y₁ (a ≤ x₁/2, so x₁ − a > 0)
    const [qHigh, qLow, remHigh, remLow] = op.divmodw(...op.mulw(x1, y1), 0, x1 - a)
    if (qHigh !== 0) {
      return skip
    }
    let breakEven: uint64 = qLow
    if (remHigh !== 0 || remLow !== 0) {
      if (qLow === MaxUint64) {
        return skip
      }
      breakEven = qLow + 1
    }
    const need: uint64 = breakEven - y1
    if (out <= need) {
      return skip
    }
    const surplus: uint64 = out - need

    // the Vault charges custodyFeeBps on the gain: price it on `out` (≥ the measured gain). What is left
    // above that hurdle must cover the LP floor; all of it stays with LPs.
    const guardFee = mulDivUp(out, ctx.custodyFeeBps, BpsDivisor)
    if (surplus <= guardFee) {
      return skip
    }
    const rest: uint64 = surplus - guardFee
    const minSurplus: uint64 = sellA ? venue.minSurplusB : venue.minSurplusA
    if (rest < minSurplus) {
      return skip
    }

    return {
      execute: true,
      sellA,
      amountIn: a,
      amountOut: out,
      // out − (rest − minSurplus) = need + guardFee + minSurplus
      minOut: out - (rest - minSurplus),
    }
  }

  /** Sell `amountIn` of X from the escrow to Tinyman (fee 0 inners), handing the escrow back to the Vault */
  private execute(ctx: HookContext, plan: BackrunPlan): void {
    const venue = clone(this.venues(ctx.poolId).value)
    const assetX: uint64 = plan.sellA ? venue.assetA : venue.assetB
    const assetY: uint64 = plan.sellA ? venue.assetB : venue.assetA

    tmSwapAs(ctx.escrow, this.tinyman.value, venue.pool, assetX, plan.amountIn, assetY, plan.minOut, this.dex.value.address)

    emit<BackrunEvent>({
      poolId: ctx.poolId,
      point: ctx.point,
      sellA: plan.sellA,
      amountIn: plan.amountIn,
      amountOut: plan.amountOut,
    })
  }
}

import { Account, Application, Asset, BoxMap, clone, Contract, emit, Global, GlobalState, itxn, loggedAssert, op, Txn, uint64 } from '@algorandfoundation/algorand-typescript'
import { abimethod, decodeArc4, sizeOf } from '@algorandfoundation/algorand-typescript/arc4'
import { BpsDivisor, HookPointAfterInitialize, HookPointAfterSwap, HookPointBeforeSwap, HookPointQuote } from '../constants'
import { passResult, requireDexCaller } from '../hook-interface'
import { HookContext, HookResult } from '../types'

// LAUNCH TAX HOOK (FINAL-SPEC §5 WP5b, akita-hooks B5.2) ------------------------------------------

/** The hook's own cap on either tax (the Vault also enforces pool.maxHookFeeBps ≤ 10%) */
export const LaunchTaxMaxBps: uint64 = 500
/** Box prefix of the per-pool config */
export const LaunchTaxBoxPrefix = 't'
/** Box prefix of the per-ASA total of unclaimed tax */
export const LaunchTaxTotalPrefix = 'q'

/** F6 initData of one pool (ABI tuple, 64 bytes) */
export type TaxInit = {
  /** receives the accrued tax through `claim` */
  owner: Account
  /** the pool side every tax is paid in; a buy is a swap whose input is this asset */
  quoteAsset: uint64
  /** HookFee on buys, in bps of the quote input */
  buyTaxBps: uint64
  /** HookFeeOut on sells, in bps of the quote output */
  sellTaxBps: uint64
  /** 0 = forever; otherwise no tax from this round on */
  untilRound: uint64
}

export type TaxConfig = {
  owner: Account
  quoteAsset: uint64
  buyTaxBps: uint64
  sellTaxBps: uint64
  untilRound: uint64
  /** quote-asset units owed to `owner` */
  accrued: uint64
}

export type TaxClaimEvent = { poolId: uint64; owner: Account; asset: uint64; amount: uint64 }

const errBadConfig = 'errLxcf'
const errInitialized = 'errLxin'
const errBadInitData = 'errLxdt'
const errNotOwner = 'errLxow'
const errNotSunset = 'errLxsn'
const errUnderfunded = 'errLxfd'
const errInsolvent = 'errLxsv'

/**
 * Multi-tenant creator tax for launch pools (akita-hooks B5.2, the multi-tenant `SwapTaxHook` v2).
 * Every tax is paid in the pool's quote asset, so the tax owner never accumulates tokens to dump:
 *
 * - **Buys** (input = quote asset): `HookFee = floor(amountIn · buyTaxBps / 1e4)`, taken from the input
 *   at BeforeSwap and accrued there.
 * - **Sells** (output = quote asset): `HookFeeOut = sellTaxBps` (F8). The Vault pays
 *   `floor(amountOut · sellTaxBps / 1e4)` of the gross output to this app after AfterSwap; the hook
 *   accrues exactly that amount at AfterSwap from `ctx.amountOut`.
 *
 * Install (LaunchManager does this): perms `HookFee` if buyTaxBps > 0 and `HookFeeOut` if sellTaxBps > 0;
 * points `AfterInitialize | BeforeSwap | Quote`, plus `AfterSwap` whenever sellTaxBps > 0 (without it a
 * sell tax is still paid to the hook but never accrued, so it is not claimable). `initData =
 * encode(TaxInit)`, `funding ≥ launchTaxFunding(quoteAsset)`: the config box MBR, plus for an ASA the
 * quote-asset opt-in and total box (paid only by the first pool of that asset). An install whose funding
 * does not cover the MBR it adds fails (errLxfd). The pool needs `maxHookFeeBps ≥ max(buy, sell)`.
 *
 * `Quote` returns the same fees as BeforeSwap and writes nothing. After `untilRound` the hook passes.
 *
 * The hook holds every pool's unclaimed tax in one balance and cannot see its own install, so it books
 * only taxes the Vault provably pays: a buy fee is paid with the BeforeSwap result that books it, and a
 * sell tax is booked at AfterSwap only if this swap's BeforeSwap returned `hookFeeOutBps` (`pendingSell`).
 * `algoAccrued` / `asaAccrued` total the bookings per quote asset; claims require the holding to cover them.
 */
export class LaunchTaxHook extends Contract {
  dex = GlobalState<Application>({ key: 'dex' })
  /** poolId + 1 of the sell whose BeforeSwap returned hookFeeOutBps; 0 = none */
  pendingSell = GlobalState<uint64>({ key: 'pending' })
  algoAccrued = GlobalState<uint64>({ key: 'algo' })
  configs = BoxMap<uint64, TaxConfig>({ keyPrefix: LaunchTaxBoxPrefix })
  asaAccrued = BoxMap<uint64, uint64>({ keyPrefix: LaunchTaxTotalPrefix })

  @abimethod({ onCreate: 'require' })
  create(dex: Application): void {
    this.dex.value = dex
    this.pendingSell.value = 0
    this.algoAccrued.value = 0
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
    const config = clone(this.configs(ctx.poolId).value)
    if (config.untilRound !== 0 && Global.round >= config.untilRound) {
      return passResult()
    }
    const buy = ctx.assetIn === config.quoteAsset

    if (ctx.point === HookPointBeforeSwap || ctx.point === HookPointQuote) {
      if (buy) {
        const fee: uint64 = op.divw(...op.mulw(ctx.amountIn, config.buyTaxBps), BpsDivisor)
        if (ctx.point === HookPointBeforeSwap) {
          this.pendingSell.value = 0
          // the Vault pays this fee right after this call, or reverts the swap without HookFee
          if (fee > 0) {
            this.book(ctx.poolId, config, fee)
          }
        }
        return { flags: 0, feeBps: 0, hookFee: fee, hookFeeOutBps: 0 }
      }
      if (ctx.point === HookPointBeforeSwap) {
        // a returned hookFeeOutBps makes the Vault pay the sell tax after AfterSwap, or reverts the swap
        // without HookFeeOut: the marker is the only proof AfterSwap has that the tax will be paid
        this.pendingSell.value = config.sellTaxBps > 0 ? ctx.poolId + 1 : 0
      }
      return { flags: 0, feeBps: 0, hookFee: 0, hookFeeOutBps: config.sellTaxBps }
    }

    if (ctx.point === HookPointAfterSwap) {
      const paid = this.pendingSell.value === ctx.poolId + 1
      this.pendingSell.value = 0
      if (paid) {
        // the Vault pays mulDiv(amountOut, hookFeeOutBps, 1e4) of the gross output right after this point
        const fee: uint64 = op.divw(...op.mulw(ctx.amountOut, config.sellTaxBps), BpsDivisor)
        if (fee > 0) {
          this.book(ctx.poolId, config, fee)
        }
      }
    }
    return passResult()
  }

  private book(poolId: uint64, config: TaxConfig, fee: uint64): void {
    this.configs(poolId).value.accrued = config.accrued + fee
    if (config.quoteAsset === 0) {
      this.algoAccrued.value += fee
    } else {
      this.asaAccrued(config.quoteAsset).value += fee
    }
  }

  /** F6: validate and store this pool's config from its initData; opt into an ASA quote asset */
  private initialize(ctx: HookContext): void {
    loggedAssert(!this.configs(ctx.poolId).exists, errInitialized)
    loggedAssert(ctx.data.length === sizeOf<TaxInit>(), errBadInitData)
    const init = decodeArc4<TaxInit>(ctx.data)

    // at AfterInitialize assetIn/assetOut are the pool's assetA/assetB
    loggedAssert(init.quoteAsset === ctx.assetIn || init.quoteAsset === ctx.assetOut, errBadConfig)
    loggedAssert(init.owner !== Global.zeroAddress, errBadConfig)
    loggedAssert(init.buyTaxBps <= LaunchTaxMaxBps && init.sellTaxBps <= LaunchTaxMaxBps, errBadConfig)
    loggedAssert(init.untilRound === 0 || init.untilRound > Global.round, errBadConfig)

    this.configs(ctx.poolId).value = {
      owner: init.owner,
      quoteAsset: init.quoteAsset,
      buyTaxBps: init.buyTaxBps,
      sellTaxBps: init.sellTaxBps,
      untilRound: init.untilRound,
      accrued: 0,
    }

    // taxes arrive in the quote asset only (buy input, sell output), so that is the only opt-in needed
    if (init.quoteAsset !== 0) {
      if (!Global.currentApplicationAddress.isOptedIn(Asset(init.quoteAsset))) {
        itxn.assetTransfer({ assetReceiver: Global.currentApplicationAddress, xferAsset: init.quoteAsset, assetAmount: 0 }).submit()
      }
      if (!this.asaAccrued(init.quoteAsset).exists) {
        this.asaAccrued(init.quoteAsset).value = 0
      }
    }

    // the F6 funding (paid before this call) must cover the MBR this install adds: the rest of the free
    // ALGO is other owners' unclaimed tax
    const app = Global.currentApplicationAddress
    loggedAssert(app.balance >= app.minBalance + this.algoAccrued.value, errUnderfunded)
  }

  /** Pays `config.accrued` out of the pool's quote-asset bookings; the holding must cover every booking */
  private payAccrued(poolId: uint64, config: TaxConfig): void {
    const app = Global.currentApplicationAddress
    if (config.quoteAsset === 0) {
      loggedAssert(app.balance >= app.minBalance + this.algoAccrued.value, errInsolvent)
      this.algoAccrued.value -= config.accrued
    } else {
      loggedAssert(Asset(config.quoteAsset).balance(app) >= this.asaAccrued(config.quoteAsset).value, errInsolvent)
      this.asaAccrued(config.quoteAsset).value -= config.accrued
    }
    this.configs(poolId).value.accrued = 0
    this.pay(config, config.accrued)
  }

  private pay(config: TaxConfig, amount: uint64): void {
    if (config.quoteAsset === 0) {
      itxn.payment({ receiver: config.owner, amount }).submit()
    } else {
      itxn.assetTransfer({ assetReceiver: config.owner, xferAsset: config.quoteAsset, assetAmount: amount }).submit()
    }
  }

  /** Owner only: pay out the pool's accrued tax */
  claim(poolId: uint64): uint64 {
    loggedAssert(this.configs(poolId).exists, errBadConfig)
    const config = clone(this.configs(poolId).value)
    loggedAssert(Txn.sender === config.owner, errNotOwner)
    if (config.accrued > 0) {
      this.payAccrued(poolId, config)
    }
    emit<TaxClaimEvent>({ poolId, owner: config.owner, asset: config.quoteAsset, amount: config.accrued })
    return config.accrued
  }

  /**
   * Owner only, after the sunset: pay out the accrued tax, delete the config box and refund its MBR in
   * ALGO. Later swaps on the pool find no config and pass.
   */
  close(poolId: uint64): void {
    loggedAssert(this.configs(poolId).exists, errBadConfig)
    const config = clone(this.configs(poolId).value)
    loggedAssert(Txn.sender === config.owner, errNotOwner)
    loggedAssert(config.untilRound !== 0 && Global.round >= config.untilRound, errNotSunset)
    if (config.accrued > 0) {
      this.payAccrued(poolId, config)
    }
    emit<TaxClaimEvent>({ poolId, owner: config.owner, asset: config.quoteAsset, amount: config.accrued })
    const before = Global.currentApplicationAddress.minBalance
    this.configs(poolId).delete()
    itxn.payment({ receiver: config.owner, amount: before - Global.currentApplicationAddress.minBalance }).submit()
  }

  // READ ONLY -------------------------------------------------------------------------------------

  @abimethod({ readonly: true })
  getConfig(poolId: uint64): TaxConfig {
    loggedAssert(this.configs(poolId).exists, errBadConfig)
    return clone(this.configs(poolId).value)
  }
}

/**
 * F6 funding a pool must give this hook: the config box MBR, plus the opt-in and the per-ASA total box for
 * an ASA quote asset (both created only by the first pool of that asset)
 */
export function launchTaxFunding(quoteAsset: uint64): uint64 {
  const box: uint64 = 2_500 + 400 * (1 + 8 + sizeOf<TaxConfig>())
  const total: uint64 = 2_500 + 400 * (1 + 8 + 8)
  return quoteAsset === 0 ? box : box + Global.assetOptInMinBalance + total
}

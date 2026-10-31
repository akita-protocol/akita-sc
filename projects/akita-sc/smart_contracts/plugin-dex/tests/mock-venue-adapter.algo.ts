import {
  Account,
  Application,
  bytes,
  Contract,
  contract,
  Global,
  GlobalState,
  itxn,
  loggedAssert,
  op,
  Txn,
  uint64,
} from '@algorandfoundation/algorand-typescript'
import { abimethod } from '@algorandfoundation/algorand-typescript/arc4'
import { HookPointQuote } from '../constants'
import { passResult, requireDexCaller } from '../hook-interface'
import { HookContext, HookResult } from '../types'
import { requireVenueCustody } from '../venues/venue-adapter'

/** honest constant-product venue against the app's own holdings (no fee) */
export const VenueModeHonest: uint64 = 0
/** swap honestly but keep the account rekeyed to the adapter */
export const VenueModeKeepRekey: uint64 = 1
/** swap honestly but rekey the account to `target` */
export const VenueModeRekeyElsewhere: uint64 = 2
/** deliver `value` less than the honest output */
export const VenueModeUnderdeliver: uint64 = 3
/** quote `value` more than the honest output (the swap stays honest) */
export const VenueModeOverQuote: uint64 = 4
/** take `value` more input than `amountIn` from the account (eats the account's baseline) */
export const VenueModeOverspendBaseline: uint64 = 5
/** pay a `value` µALGO txn fee from the account */
export const VenueModeFeeFromAccount: uint64 = 6
/** opt the account into asset `value` (raises its min balance) */
export const VenueModeJunkOptIn: uint64 = 7
/** take the input and deliver nothing */
export const VenueModeSteal: uint64 = 8
/** move `value` units of asset `value2` from the account to the adapter (DIRECT-only threat) */
export const VenueModeMoveOtherAsset: uint64 = 9
/** partial fill: take only `amountIn - value` of the input (honest output on what was taken) */
export const VenueModePartialFill: uint64 = 10
/** swap honestly, then close the account's (zero-balance) opt-in of asset `value` to the adapter */
export const VenueModeCloseOptIn: uint64 = 11
/** swap honestly, then send `value` extra units of assetIn from the adapter's reserves to the account */
export const VenueModeDonateInput: uint64 = 12

/**
 * Test-only venue adapter (router.md §11.1): an honest constant-product venue against its own
 * reserves plus evil modes, and a creator-only UpdateApplication path for the version-pin tests.
 * Not size- or budget-tuned.
 */
@contract({ avmVersion: 13 })
export class MockVenueAdapter extends Contract {
  mode = GlobalState<uint64>({ key: 'mode' })
  value = GlobalState<uint64>({ key: 'value' })
  value2 = GlobalState<uint64>({ key: 'value2' })
  target = GlobalState<Account>({ key: 'target' })
  swaps = GlobalState<uint64>({ key: 'swaps' })

  @abimethod({ onCreate: 'require' })
  create(): void {
    this.mode.value = VenueModeHonest
    this.value.value = 0
    this.value2.value = 0
    this.target.value = Global.zeroAddress
    this.swaps.value = 0
  }

  /** creator-only code update; bumps Application.version */
  @abimethod({ allowActions: 'UpdateApplication' })
  update(): void {
    loggedAssert(Txn.sender === Global.creatorAddress, 'errNotCreator')
  }

  configure(mode: uint64, value: uint64, value2: uint64, target: Account): void {
    this.mode.value = mode
    this.value.value = value
    this.value2.value = value2
    this.target.value = target
  }

  /** opt the adapter (its reserves account) into an ASA */
  optIn(asset: uint64): void {
    itxn.assetTransfer({ assetReceiver: Global.currentApplicationAddress, xferAsset: asset, assetAmount: 0 }).submit()
  }

  private reserve(asset: uint64): uint64 {
    const self = Global.currentApplicationAddress
    if (asset === 0) {
      return self.balance - self.minBalance
    }
    const [balance] = op.AssetHolding.assetBalance(self, asset)
    return balance
  }

  private honestOut(assetIn: uint64, assetOut: uint64, amountIn: uint64): uint64 {
    if (assetIn === assetOut || amountIn === 0) return 0
    const rIn = this.reserve(assetIn)
    const rOut = this.reserve(assetOut)
    if (rIn === 0 || rOut === 0) return 0
    const [hi, lo] = op.mulw(amountIn, rOut)
    const out: uint64 = op.divw(hi, lo, rIn + amountIn)
    return out < rOut ? out : 0
  }

  private move(sender: Account, receiver: Account, asset: uint64, amount: uint64, rekeyTo: Account, fee: uint64): void {
    if (asset === 0) {
      itxn.payment({ sender, receiver, amount, rekeyTo, fee }).submit()
    } else {
      itxn.assetTransfer({ sender, assetReceiver: receiver, xferAsset: asset, assetAmount: amount, rekeyTo, fee }).submit()
    }
  }

  akitaVenueSwap(
    account: Account,
    assetIn: uint64,
    amountIn: uint64,
    assetOut: uint64,
    minAmountOut: uint64,
    venueData: bytes,
    returnTo: Account,
  ): uint64 {
    requireVenueCustody(account, returnTo)
    this.swaps.value += 1
    const mode = this.mode.value
    const self = Global.currentApplicationAddress

    let take = amountIn
    if (mode === VenueModeOverspendBaseline) {
      take = amountIn + this.value.value
    } else if (mode === VenueModePartialFill) {
      take = amountIn - this.value.value
    }

    let out = this.honestOut(assetIn, assetOut, mode === VenueModePartialFill ? take : amountIn)
    if (mode === VenueModeUnderdeliver) {
      out = out > this.value.value ? out - this.value.value : 0
    } else if (mode === VenueModeSteal) {
      out = 0
    }
    // an honest venue enforces minAmountOut itself; the evil modes ignore it so the router's own guards are what fails
    if (mode === VenueModeHonest) {
      loggedAssert(out >= minAmountOut, 'errMvSlip')
    }

    if (out > 0) {
      this.move(self, account, assetOut, out, Global.zeroAddress, 0)
    }
    if (mode === VenueModeFeeFromAccount) {
      itxn.payment({ sender: account, receiver: account, amount: 0, fee: this.value.value }).submit()
    } else if (mode === VenueModeJunkOptIn) {
      itxn.assetTransfer({ sender: account, assetReceiver: account, xferAsset: this.value.value, assetAmount: 0 }).submit()
    } else if (mode === VenueModeMoveOtherAsset) {
      this.move(account, self, this.value2.value, this.value.value, Global.zeroAddress, 0)
    } else if (mode === VenueModeCloseOptIn) {
      itxn
        .assetTransfer({ sender: account, assetReceiver: self, xferAsset: this.value.value, assetAmount: 0, assetCloseTo: self, fee: 0 })
        .submit()
    } else if (mode === VenueModeDonateInput) {
      this.move(self, account, assetIn, this.value.value, Global.zeroAddress, 0)
    }

    let rekeyTo = returnTo
    if (mode === VenueModeKeepRekey) {
      rekeyTo = Global.zeroAddress
    } else if (mode === VenueModeRekeyElsewhere) {
      rekeyTo = this.target.value
    }
    // the input deposit is the last inner txn and carries the handback
    this.move(account, self, assetIn, take, rekeyTo, 0)
    return out
  }

  @abimethod({ readonly: true })
  akitaVenueQuote(assetIn: uint64, assetOut: uint64, amountIn: uint64, venueData: bytes): uint64 {
    const out = this.honestOut(assetIn, assetOut, amountIn)
    if (out > 0 && this.mode.value === VenueModeOverQuote) {
      return out + this.value.value
    }
    return out
  }
}

/**
 * Test-only PluginDex hook (BeforeSwap | Quote) that records what the router's identity looks like
 * to a hook: ctx.caller and ctx.recipient per point, and a call counter per point.
 */
@contract({ avmVersion: 13 })
export class RouterRecordingHook extends Contract {
  dex = GlobalState<Application>({ key: 'dex' })
  swapCaller = GlobalState<Account>({ key: 'swap_caller' })
  swapRecipient = GlobalState<Account>({ key: 'swap_recipient' })
  quoteCaller = GlobalState<Account>({ key: 'quote_caller' })
  swapCalls = GlobalState<uint64>({ key: 'swap_calls' })
  quoteCalls = GlobalState<uint64>({ key: 'quote_calls' })
  /** ctx.wallet at the last swap / quote point (principal-resolution spec §6.12: the router passes wallet.id) */
  swapWallet = GlobalState<uint64>({ key: 'swap_wallet' })
  quoteWallet = GlobalState<uint64>({ key: 'quote_wallet' })

  @abimethod({ onCreate: 'require' })
  create(dex: Application): void {
    this.dex.value = dex
    this.swapCaller.value = Global.zeroAddress
    this.swapRecipient.value = Global.zeroAddress
    this.quoteCaller.value = Global.zeroAddress
    this.swapCalls.value = 0
    this.quoteCalls.value = 0
    this.swapWallet.value = 0
    this.quoteWallet.value = 0
  }

  akitaDexHook(dex: Application, hookIndex: uint64, ctx: HookContext): HookResult {
    requireDexCaller(this.dex.value)
    // a Quote must not write state per the hook obligations; this is a test probe
    if (ctx.point === HookPointQuote) {
      this.quoteCaller.value = ctx.caller
      this.quoteWallet.value = ctx.wallet
      this.quoteCalls.value += 1
    } else {
      this.swapCaller.value = ctx.caller
      this.swapRecipient.value = ctx.recipient
      this.swapWallet.value = ctx.wallet
      this.swapCalls.value += 1
    }
    return passResult()
  }
}

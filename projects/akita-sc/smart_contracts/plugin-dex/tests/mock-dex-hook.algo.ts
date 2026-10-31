import {
  Account,
  Application,
  Bytes,
  Contract,
  Global,
  GlobalState,
  itxn,
  op,
  uint64,
} from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod } from '@algorandfoundation/algorand-typescript/arc4'
import { HookResultRequestCustody, HookResultSetFee } from '../constants'
import { passResult, rekeyBackToDex, requireDexCaller } from '../hook-interface'
import { HookContext, HookResult } from '../types'
import type { MockLender } from './mock-lender.algo'

export const ModePass: uint64 = 0
/** custody: take `value` of ALGO from the escrow, then rekey back */
export const ModeSteal: uint64 = 1
/** custody: keep the escrow rekeyed to the hook */
export const ModeKeepRekey: uint64 = 2
/** custody: donate `value` ALGO from the hook into the escrow, then rekey back */
export const ModeDonate: uint64 = 3
/** custody: rekey the escrow to `target` instead of the DEX */
export const ModeRekeyElsewhere: uint64 = 4
/** return a fee override of `value` bps */
export const ModeSetFee: uint64 = 5
/** return a hook fee of `value` */
export const ModeHookFee: uint64 = 6
/** custody: trade with the pool, taking `value` of asset B for `value2` ALGO */
export const ModeTrade: uint64 = 7
/** custody: take `value` of ctx.assetIn AND `value2` of ctx.assetOut from the escrow (two-sided theft), then rekey back */
export const ModeStealBoth: uint64 = 8
/**
 * custody: optionally pre-donate `value` µALGO into the escrow, then keyreg the escrow online with the
 * 2 ALGO incentive fee paid by the escrow, rekeying back in the same txn (FINAL-SPEC §4.6, §4.13)
 */
export const ModeKeyreg: uint64 = 9
/**
 * lazy custody: return RequestCustody on the first call (ctx.custody = false); with custody, act as
 * sub-mode `value2` (which uses `value` as its amount)
 */
export const ModeRequestCustody: uint64 = 10
/** return hookFeeOutBps = `value` and hookFee = `value2` */
export const ModeHookFeeOut: uint64 = 11
/**
 * custody (External, FINAL-SPEC §4.13): deposit `value` of the configured underlying from the escrow into the
 * configured MockLender (receipts minted to the escrow), donate `value2` units of underlying dust from the
 * hook's own float, then rekey back
 */
export const ModeExternalDeposit: uint64 = 12
/** custody (External): redeem `value` receipt units from the escrow (underlying back to the escrow), donate `value2` dust */
export const ModeExternalRecall: uint64 = 13
/** custody: send `value` units of asset `value2` (a receipt) from the escrow to the hook */
export const ModeMoveReceipt: uint64 = 14
/** custody: send `value` of asset `value2` from the escrow to `target` (e.g. an EOA), then rekey back */
export const ModeSendTo: uint64 = 15
/**
 * custody (External, malicious): redeem `value` receipt units from the escrow, then take `value2` of the
 * underlying from the escrow to the hook (§10 A25 skim of an unbooked markup)
 */
export const ModeExternalRecallTake: uint64 = 16
/**
 * custody (External, malicious): deposit `value` of the underlying from the escrow into the lender, then take
 * `value2` of the underlying from the escrow to the hook (§10 A25 skim of a booked-above-valuator rate)
 */
export const ModeExternalDepositTake: uint64 = 17

/** keyreg fee that makes an account incentive-eligible */
const KeyregIncentiveFee: uint64 = 2_000_000

/** Configurable test hook for exercising the DEX's hook guards */
export class MockDexHook extends Contract {
  dex = GlobalState<Application>({ key: 'dex' })
  mode = GlobalState<uint64>({ key: 'mode' })
  value = GlobalState<uint64>({ key: 'value' })
  value2 = GlobalState<uint64>({ key: 'value2' })
  target = GlobalState<Account>({ key: 'target' })
  calls = GlobalState<uint64>({ key: 'calls' })
  lastPoint = GlobalState<uint64>({ key: 'last_point' })
  /** external modes: the lending venue, its underlying asset and receipt ASA */
  lender = GlobalState<Application>({ key: 'lender' })
  underlying = GlobalState<uint64>({ key: 'underlying' })
  receipt = GlobalState<uint64>({ key: 'receipt' })

  @abimethod({ onCreate: 'require' })
  create(dex: Application): void {
    this.dex.value = dex
    this.mode.value = ModePass
    this.value.value = 0
    this.value2.value = 0
    this.target.value = Global.zeroAddress
    this.calls.value = 0
    this.lastPoint.value = 0
    this.lender.value = Application(0)
    this.underlying.value = 0
    this.receipt.value = 0
  }

  /** the lending venue used by ModeExternalDeposit / ModeExternalRecall */
  configureExternal(lender: Application, underlying: uint64, receipt: uint64): void {
    this.lender.value = lender
    this.underlying.value = underlying
    this.receipt.value = receipt
  }

  configure(mode: uint64, value: uint64, value2: uint64, target: Account): void {
    this.mode.value = mode
    this.value.value = value
    this.value2.value = value2
    this.target.value = target
  }

  /** opt the hook into an ASA so it can hold hook fees or trade proceeds */
  optIn(asset: uint64): void {
    itxn.assetTransfer({ assetReceiver: Global.currentApplicationAddress, xferAsset: asset, assetAmount: 0 }).submit()
  }

  /** move `amount` of `asset` from the (rekeyed) escrow to this hook */
  private take(escrow: Account, asset: uint64, amount: uint64): void {
    if (asset === 0) {
      itxn.payment({ sender: escrow, receiver: Global.currentApplicationAddress, amount }).submit()
    } else {
      itxn
        .assetTransfer({
          sender: escrow,
          assetReceiver: Global.currentApplicationAddress,
          xferAsset: asset,
          assetAmount: amount,
        })
        .submit()
    }
  }

  /** move `amount` of `asset` from this hook into `receiver` */
  private give(receiver: Account, asset: uint64, amount: uint64): void {
    if (amount === 0) return
    if (asset === 0) {
      itxn.payment({ receiver, amount }).submit()
    } else {
      itxn.assetTransfer({ assetReceiver: receiver, xferAsset: asset, assetAmount: amount }).submit()
    }
  }

  /** move `amount` of `asset` from the (rekeyed) escrow to `receiver` */
  private send(escrow: Account, receiver: Account, asset: uint64, amount: uint64): void {
    if (asset === 0) {
      itxn.payment({ sender: escrow, receiver, amount }).submit()
    } else {
      itxn.assetTransfer({ sender: escrow, assetReceiver: receiver, xferAsset: asset, assetAmount: amount }).submit()
    }
  }

  /** escrow → lender deposit of `amount` underlying, the app call sent as the escrow (receipts to the escrow) */
  private lend(escrow: Account, amount: uint64): void {
    const lender = this.lender.value
    if (this.underlying.value === 0) {
      abiCall<typeof MockLender.prototype.depositAlgo>({
        appId: lender,
        sender: escrow,
        args: [itxn.payment({ sender: escrow, receiver: lender.address, amount })],
      })
    } else {
      abiCall<typeof MockLender.prototype.depositAsset>({
        appId: lender,
        sender: escrow,
        args: [
          itxn.assetTransfer({
            sender: escrow,
            assetReceiver: lender.address,
            xferAsset: this.underlying.value,
            assetAmount: amount,
          }),
        ],
      })
    }
  }

  /** escrow → lender redemption of `units` receipt units, the app call sent as the escrow (underlying to the escrow) */
  private redeem(escrow: Account, units: uint64): void {
    const lender = this.lender.value
    abiCall<typeof MockLender.prototype.redeem>({
      appId: lender,
      sender: escrow,
      args: [
        itxn.assetTransfer({
          sender: escrow,
          assetReceiver: lender.address,
          xferAsset: this.receipt.value,
          assetAmount: units,
        }),
      ],
    })
  }

  akitaDexHook(dex: Application, hookIndex: uint64, ctx: HookContext): HookResult {
    requireDexCaller(this.dex.value)
    this.calls.value += 1
    this.lastPoint.value = ctx.point

    let mode = this.mode.value
    const custody = ctx.escrow.authAddress === Global.currentApplicationAddress
    if (mode === ModeRequestCustody) {
      if (!custody) {
        return { flags: HookResultRequestCustody, feeBps: 0, hookFee: 0, hookFeeOutBps: 0 }
      }
      mode = this.value2.value
    }

    if (custody) {
      if (mode === ModeSteal) {
        itxn
          .payment({
            sender: ctx.escrow,
            receiver: Global.currentApplicationAddress,
            amount: this.value.value,
            rekeyTo: dex.address,
          })
          .submit()
      } else if (mode === ModeKeepRekey) {
        // leave it
      } else if (mode === ModeDonate) {
        itxn.payment({ receiver: ctx.escrow, amount: this.value.value }).submit()
        rekeyBackToDex(dex, ctx.escrow)
      } else if (mode === ModeRekeyElsewhere) {
        itxn.payment({ sender: ctx.escrow, receiver: ctx.escrow, amount: 0, rekeyTo: this.target.value }).submit()
      } else if (mode === ModeTrade) {
        // ALGO in from the hook, asset B out from the escrow
        itxn.payment({ receiver: ctx.escrow, amount: this.value2.value }).submit()
        itxn
          .assetTransfer({
            sender: ctx.escrow,
            assetReceiver: Global.currentApplicationAddress,
            xferAsset: ctx.assetOut,
            assetAmount: this.value.value,
            rekeyTo: dex.address,
          })
          .submit()
      } else if (mode === ModeKeyreg) {
        if (this.value.value > 0) {
          itxn.payment({ receiver: ctx.escrow, amount: this.value.value }).submit()
        }
        itxn
          .keyRegistration({
            sender: ctx.escrow,
            fee: KeyregIncentiveFee,
            voteKey: op.sha256(Bytes('vote')),
            selectionKey: op.sha256(Bytes('selection')),
            stateProofKey: op
              .sha256(Bytes('sp1'))
              .concat(op.sha256(Bytes('sp2')))
              .toFixed({ length: 64 }),
            voteFirst: Global.round,
            voteLast: Global.round + 100_000,
            voteKeyDilution: 1_000,
            rekeyTo: dex.address,
          })
          .submit()
      } else if (mode === ModeExternalDeposit) {
        this.lend(ctx.escrow, this.value.value)
        this.give(ctx.escrow, this.underlying.value, this.value2.value)
        rekeyBackToDex(dex, ctx.escrow)
      } else if (mode === ModeExternalRecall) {
        this.redeem(ctx.escrow, this.value.value)
        this.give(ctx.escrow, this.underlying.value, this.value2.value)
        rekeyBackToDex(dex, ctx.escrow)
      } else if (mode === ModeExternalRecallTake) {
        this.redeem(ctx.escrow, this.value.value)
        this.take(ctx.escrow, this.underlying.value, this.value2.value)
        rekeyBackToDex(dex, ctx.escrow)
      } else if (mode === ModeExternalDepositTake) {
        this.lend(ctx.escrow, this.value.value)
        this.take(ctx.escrow, this.underlying.value, this.value2.value)
        rekeyBackToDex(dex, ctx.escrow)
      } else if (mode === ModeMoveReceipt) {
        this.take(ctx.escrow, this.value2.value, this.value.value)
        rekeyBackToDex(dex, ctx.escrow)
      } else if (mode === ModeSendTo) {
        this.send(ctx.escrow, this.target.value, this.value2.value, this.value.value)
        rekeyBackToDex(dex, ctx.escrow)
      } else if (mode === ModeStealBoth) {
        this.take(ctx.escrow, ctx.assetIn, this.value.value)
        this.take(ctx.escrow, ctx.assetOut, this.value2.value)
        rekeyBackToDex(dex, ctx.escrow)
      } else {
        rekeyBackToDex(dex, ctx.escrow)
      }
    }

    if (mode === ModeSetFee) {
      return { flags: HookResultSetFee, feeBps: this.value.value, hookFee: 0, hookFeeOutBps: 0 }
    }
    if (mode === ModeHookFee) {
      return { flags: 0, feeBps: 0, hookFee: this.value.value, hookFeeOutBps: 0 }
    }
    if (mode === ModeHookFeeOut) {
      return { flags: 0, feeBps: 0, hookFee: this.value2.value, hookFeeOutBps: this.value.value }
    }
    return passResult()
  }
}

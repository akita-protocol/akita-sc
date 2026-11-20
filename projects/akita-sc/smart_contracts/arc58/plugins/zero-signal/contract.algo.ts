import { Application, bytes, Contract, Global, GlobalState, itxn, loggedAssert, OnCompleteAction, uint64 } from "@algorandfoundation/algorand-typescript";
import { abiCall, abimethod } from "@algorandfoundation/algorand-typescript/arc4";
import { getControlledSpendingAccount, rekeyAddress } from "@akita-protocol/plugin/functions";
import { PayParams } from "../pay/types";
import { ZeroSignalPluginGlobalStateKeyEscrowApp } from "./constants";
import { errNoEscrowApp, errReceiverNotEscrow } from "./errors";

// CONTRACT IMPORTS
import type { ZeroSignalEscrow } from "../../../utils/types/zero-signal";

/**
 * Lets an ARC-58 wallet act as a ZeroSignal payer. Every method sends from the wallet's spending
 * account and reaches one app only, the ZeroSignal escrow named when this plugin was created:
 * payments go to that app's account and calls go to that app. The last transaction a method sends
 * hands the spending account back to the wallet when `rekeyBack` is set.
 */
export class ZeroSignalPlugin extends Contract {

  // GLOBAL STATE ---------------------------------------------------------------------------------

  /** the ZeroSignal escrow app this plugin pays and calls. Set at creation and never changed */
  escrowApp = GlobalState<uint64>({ key: ZeroSignalPluginGlobalStateKeyEscrowApp })

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  create(escrowApp: uint64): void {
    loggedAssert(escrowApp !== 0, errNoEscrowApp)
    this.escrowApp.value = escrowApp
  }

  // ZEROSIGNAL PLUGIN METHODS --------------------------------------------------------------------

  /**
   * Pay the escrow. This is the payer's part of opening a ticket: the serving node sends the
   * escrow's `open` itself.
   */
  pay(wallet: Application, rekeyBack: boolean, payments: PayParams[]): void {
    const sender = getControlledSpendingAccount(wallet)
    const escrow = Application(this.escrowApp.value).address

    for (let i: uint64 = 0; i < payments.length; i++) {
      const { receiver, asset, amount } = payments[i];
      loggedAssert(receiver === escrow, errReceiverNotEscrow)

      if (asset === 0) {
        itxn
          .payment({
            sender,
            receiver: escrow,
            amount,
            rekeyTo: i < (payments.length - 1) ? Global.zeroAddress : rekeyAddress(rekeyBack, wallet),
          })
          .submit()
      } else {
        itxn
          .assetTransfer({
            sender,
            assetReceiver: escrow,
            assetAmount: amount,
            xferAsset: asset,
            rekeyTo: i < (payments.length - 1) ? Global.zeroAddress : rekeyAddress(rekeyBack, wallet),
          })
          .submit()
      }
    }
  }

  /**
   * Fund the payer's prepaid pool for ticket storage. The first deposit opts the spending account
   * in to the escrow, later ones top it up.
   */
  depositMbr(wallet: Application, rekeyBack: boolean, amount: uint64): void {
    const sender = getControlledSpendingAccount(wallet)
    const appId = Application(this.escrowApp.value)

    abiCall<typeof ZeroSignalEscrow.prototype.depositMbr>({
      sender,
      appId,
      onCompletion: sender.isOptedIn(appId) ? OnCompleteAction.NoOp : OnCompleteAction.OptIn,
      args: [
        itxn.payment({
          sender,
          receiver: appId.address,
          amount,
        }),
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  /** Take unreserved ALGO back out of the payer's prepaid pool */
  withdrawMbr(wallet: Application, rekeyBack: boolean, amount: uint64): void {
    const sender = getControlledSpendingAccount(wallet)

    abiCall<typeof ZeroSignalEscrow.prototype.withdrawMbr>({
      sender,
      appId: this.escrowApp.value,
      args: [amount],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  /** Close the payer's prepaid pool and opt the spending account out of the escrow */
  closeDeposit(wallet: Application, rekeyBack: boolean): void {
    const sender = getControlledSpendingAccount(wallet)

    abiCall<typeof ZeroSignalEscrow.prototype.closeDeposit>({
      sender,
      appId: this.escrowApp.value,
      onCompletion: OnCompleteAction.CloseOut,
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  /**
   * The payer's half of a settle: confirm the amount and receipt the operator claimed. Always sent
   * as the payer, never as the operator.
   */
  settle(
    wallet: Application,
    rekeyBack: boolean,
    ticketId: bytes,
    amountCharged: uint64,
    receiptDigest: bytes,
    ttftMs: uint64,
    decodeMs: uint64,
    inputCount: uint64,
    outputCount: uint64,
    outputUsageType: uint64,
    auxOutputUsageType: uint64,
    auxOutputCount: uint64,
  ): void {
    const sender = getControlledSpendingAccount(wallet)

    abiCall<typeof ZeroSignalEscrow.prototype.settle>({
      sender,
      appId: this.escrowApp.value,
      args: [
        ticketId,
        amountCharged,
        receiptDigest,
        ttftMs,
        decodeMs,
        inputCount,
        outputCount,
        outputUsageType,
        auxOutputUsageType,
        auxOutputCount,
        false,
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  /** Take back the payment for a ticket no operator ever claimed */
  refundInactive(wallet: Application, rekeyBack: boolean, ticketId: bytes): void {
    const sender = getControlledSpendingAccount(wallet)

    abiCall<typeof ZeroSignalEscrow.prototype.refundInactive>({
      sender,
      appId: this.escrowApp.value,
      args: [ticketId],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  /** Dispute an operator's claim with the receipt the node signed */
  protest(
    wallet: Application,
    rekeyBack: boolean,
    ticketId: bytes,
    amountCharged: uint64,
    receiptDigest: bytes,
    receiptSig: bytes,
    disputeExcerpt: bytes,
    reasonCode: uint64,
  ): void {
    const sender = getControlledSpendingAccount(wallet)

    abiCall<typeof ZeroSignalEscrow.prototype.protest>({
      sender,
      appId: this.escrowApp.value,
      args: [ticketId, amountCharged, receiptDigest, receiptSig, disputeExcerpt, reasonCode],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }
}

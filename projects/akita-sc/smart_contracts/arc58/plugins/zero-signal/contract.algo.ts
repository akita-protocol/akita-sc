import { Application, Contract, Global, GlobalState, itxn, loggedAssert, uint64 } from "@algorandfoundation/algorand-typescript";
import { abimethod } from "@algorandfoundation/algorand-typescript/arc4";
import { getControlledSpendingAccount, rekeyAddress } from "../../../utils/functions";
import { PayParams } from "../pay/types";
import { ZeroSignalPluginGlobalStateKeyEscrowApp } from "./constants";
import { errNoEscrowApp, errReceiverNotEscrow } from "./errors";

/**
 * A pay plugin that can only pay the ZeroSignal escrow app.
 *
 * It keeps PayPlugin's `pay` signature and refuses any receiver other than
 * the escrow app's own address. The escrow app id is written once at creation
 * and has no setter, and the program has no update or delete route, so the
 * target can never change.
 */
export class ZeroSignalPlugin extends Contract {

  /** the ZeroSignal escrow app every payment must go to */
  escrowApp = GlobalState<uint64>({ key: ZeroSignalPluginGlobalStateKeyEscrowApp })

  @abimethod({ onCreate: 'require' })
  create(escrowApp: uint64): void {
    // App id 0 resolves to the calling app, so it would make this plugin its own receiver.
    loggedAssert(escrowApp !== 0, errNoEscrowApp)
    this.escrowApp.value = escrowApp
  }

  /**
   * Pay ALGO or an asset from the wallet's spending account to the escrow.
   * A zero amount is allowed.
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
}

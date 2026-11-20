import { Application, Contract, Global, GlobalState, itxn, loggedAssert, uint64 } from "@algorandfoundation/algorand-typescript";
import { abimethod } from "@algorandfoundation/algorand-typescript/arc4";
import { getSpendingAccount, rekeyAddress } from "../../../utils/functions";
import { PayParams } from "../pay/types";
import { ZeroSignalPluginGlobalStateKeyEscrow } from "./constants";
import { ERR_INVALID_ESCROW, ERR_INVALID_RECEIVER } from "./errors";

/**
 * A pay plugin that can only pay the ZeroSignal escrow app.
 *
 * It keeps the PayPlugin method signature so the escrow can recognise the
 * call, and refuses any receiver other than the escrow's own address. The
 * escrow app id is fixed at creation and has no setter, and the program has
 * no update or delete path, so the target can never change.
 */
export class ZeroSignalPlugin extends Contract {

  /** the ZeroSignal escrow app every payment must go to */
  escrow = GlobalState<Application>({ key: ZeroSignalPluginGlobalStateKeyEscrow })

  @abimethod({ onCreate: 'require' })
  create(escrow: Application): void {
    loggedAssert(escrow.id !== 0, ERR_INVALID_ESCROW)
    this.escrow.value = escrow
  }

  /**
   * Pay ALGO or an asset from the wallet's spending account to the escrow.
   * A zero amount is allowed: the escrow uses a zero payment as a signal.
   */
  pay(wallet: Application, rekeyBack: boolean, payments: PayParams[]): void {
    const sender = getSpendingAccount(wallet)
    const escrowAddress = this.escrow.value.address

    for (let i: uint64 = 0; i < payments.length; i++) {
      const { receiver, asset, amount } = payments[i];
      loggedAssert(receiver === escrowAddress, ERR_INVALID_RECEIVER)

      if (asset === 0) {
        itxn
          .payment({
            sender,
            receiver: escrowAddress,
            amount,
            rekeyTo: i < (payments.length - 1) ? Global.zeroAddress : rekeyAddress(rekeyBack, wallet),
          })
          .submit()
      } else {
        itxn
          .assetTransfer({
            sender,
            assetReceiver: escrowAddress,
            assetAmount: amount,
            xferAsset: asset,
            rekeyTo: i < (payments.length - 1) ? Global.zeroAddress : rekeyAddress(rekeyBack, wallet),
          })
          .submit()
      }
    }
  }
}

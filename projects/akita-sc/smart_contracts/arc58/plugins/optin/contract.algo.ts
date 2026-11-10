import { Application, Asset, Global, gtxn, itxn, loggedAssert, uint64, Contract } from "@algorandfoundation/algorand-typescript";
import { errAlreadyOptedIn, errInvalidPayment } from "./errors";
import { getSpendingAccount, rekeyAddress } from "../../../utils/functions";

export class OptInPlugin extends Contract {

  optIn(wallet: Application, rekeyBack: boolean, assets: uint64[], mbrPayment: gtxn.PaymentTxn): void {
    const sender = getSpendingAccount(wallet)
    loggedAssert(mbrPayment.receiver === sender, errInvalidPayment)
    loggedAssert(mbrPayment.amount === Global.assetOptInMinBalance * assets.length, errInvalidPayment)

    for (let i: uint64 = 0; i < assets.length; i++) {
      loggedAssert(!sender.isOptedIn(Asset(assets[i])), errAlreadyOptedIn)

      itxn
        .assetTransfer({
          sender,
          assetReceiver: sender,
          assetAmount: 0,
          xferAsset: Asset(assets[i]),
          rekeyTo: i < (assets.length - 1) ? Global.zeroAddress : rekeyAddress(rekeyBack, wallet)
        })
        .submit();
    }
  }
}

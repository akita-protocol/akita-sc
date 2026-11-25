import { Application, Asset, Global, gtxn, itxn, loggedAssert, uint64, Contract } from "@algorandfoundation/algorand-typescript";
import { errAlreadyOptedIn, errInvalidPayment } from "./errors";
import { getOpenGrantSpendingAccount, rekeyAddress } from "@akita-protocol/plugin/functions";

export class OptInPlugin extends Contract {

  optIn(wallet: Application, rekeyBack: boolean, assets: uint64[], mbrPayment: gtxn.PaymentTxn): void {
    // Safe under a grant anyone may use: the caller pays the exact opt-in minimum balance itself
    // (checked below), and the account only gains empty holdings.
    const sender = getOpenGrantSpendingAccount(wallet)
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

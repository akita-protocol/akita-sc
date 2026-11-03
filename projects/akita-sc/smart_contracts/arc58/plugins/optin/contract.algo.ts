import { Application, Asset, Global, gtxn, itxn, loggedAssert, uint64, Contract, abimethod, contract } from "@algorandfoundation/algorand-typescript";
import { ERR_ALREADY_OPTED_IN, ERR_INVALID_PAYMENT } from "./errors";
import { getSpendingAccount, rekeyAddress } from "../../../utils/functions";

@contract({ ui: { glyph: 'PlusCircle', color: '#22c55e', defaultAction: 'opt_in' } })
export class OptInPlugin extends Contract {

  @abimethod({ ui: { action: 'opt_in', glyph: 'PlusCircle', label: 'Opt in' } })
  optIn(wallet: Application, rekeyBack: boolean, assets: uint64[], mbrPayment: gtxn.PaymentTxn): void {
    const sender = getSpendingAccount(wallet)
    loggedAssert(mbrPayment.receiver === sender, ERR_INVALID_PAYMENT)
    loggedAssert(mbrPayment.amount === Global.assetOptInMinBalance * assets.length, ERR_INVALID_PAYMENT)

    for (let i: uint64 = 0; i < assets.length; i++) {
      loggedAssert(!sender.isOptedIn(Asset(assets[i])), ERR_ALREADY_OPTED_IN)

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

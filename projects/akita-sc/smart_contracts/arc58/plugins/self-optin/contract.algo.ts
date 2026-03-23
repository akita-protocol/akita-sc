import { Application, Asset, Global, itxn, uint64, assert, Contract } from "@algorandfoundation/algorand-typescript";
import { ERR_ALREADY_OPTED_IN } from "../optin/errors";
import { getSpendingAccount, rekeyAddress } from "../../../utils/functions";

export class SelfOptInPlugin extends Contract {

  optIn(wallet: Application, rekeyBack: boolean, assets: uint64[]): void {
    const sender = getSpendingAccount(wallet)

    for (let i: uint64 = 0; i < assets.length; i++) {
      assert(!sender.isOptedIn(Asset(assets[i])), ERR_ALREADY_OPTED_IN)

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

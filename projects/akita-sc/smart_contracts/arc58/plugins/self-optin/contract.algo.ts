import { Application, Asset, Global, itxn, uint64, loggedAssert, Contract, op } from "@algorandfoundation/algorand-typescript";
import { ERR_ALREADY_OPTED_IN, ERR_NOT_OPTED_IN, ERR_INVALID_ASSET_AMOUNT } from "./errors";
import { getSpendingAccount, rekeyAddress } from "../../../utils/functions";

export class SelfOptInPlugin extends Contract {

  optIn(wallet: Application, rekeyBack: boolean, assets: uint64[]): void {
    const sender = getSpendingAccount(wallet)

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

  optOut(wallet: Application, rekeyBack: boolean, assets: uint64[]): void {
    const sender = getSpendingAccount(wallet)
    for (let i: uint64 = 0; i < assets.length; i++) {
      const [balance, optedIn] = op.AssetHolding.assetBalance(sender, Asset(assets[i]))

      loggedAssert(optedIn, ERR_NOT_OPTED_IN)
      loggedAssert(balance === 0, ERR_INVALID_ASSET_AMOUNT)

      itxn
        .assetTransfer({
          sender,
          assetReceiver: Asset(assets[i]).creator,
          assetAmount: 0,
          xferAsset: Asset(assets[i]),
          assetCloseTo: Asset(assets[i]).creator,
          rekeyTo: i < (assets.length - 1) ? Global.zeroAddress : rekeyAddress(rekeyBack, wallet)
        })
        .submit();
    }
  }
}

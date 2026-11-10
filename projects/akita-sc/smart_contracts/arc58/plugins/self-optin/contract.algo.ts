import { Application, Asset, Global, itxn, uint64, loggedAssert, Contract, op } from "@algorandfoundation/algorand-typescript";
import { errAlreadyOptedIn, errNotOptedIn, errInvalidAssetAmount } from "./errors";
import { getControlledSpendingAccount, rekeyAddress } from "../../../utils/functions";

export class SelfOptInPlugin extends Contract {

  optIn(wallet: Application, rekeyBack: boolean, assets: uint64[]): void {
    const sender = getControlledSpendingAccount(wallet)

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

  optOut(wallet: Application, rekeyBack: boolean, assets: uint64[]): void {
    const sender = getControlledSpendingAccount(wallet)
    for (let i: uint64 = 0; i < assets.length; i++) {
      const [balance, optedIn] = op.AssetHolding.assetBalance(sender, Asset(assets[i]))

      loggedAssert(optedIn, errNotOptedIn)
      loggedAssert(balance === 0, errInvalidAssetAmount)

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

import { Account, Application, Asset, bytes, Contract, OnCompleteAction } from "@algorandfoundation/algorand-typescript"
import { abiCall } from "@algorandfoundation/algorand-typescript/arc4"
import { getSpendingAccount, rekeyAddress } from "../../../utils/functions"
import { SunsetContract } from "../../../sunset/contract.algo"
import { AssetCloseParams } from "../../../sunset/types"

export class SunsetPlugin extends Contract {

  delete(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application,
    closeRemainderTo: Account
  ) {
    const sender = getSpendingAccount(wallet)
    abiCall<typeof SunsetContract.prototype.delete>({
      sender,
      appId,
      args: [closeRemainderTo],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
      onCompletion: OnCompleteAction.DeleteApplication
    })
  }

  deleteBoxes(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application,
    boxes: bytes[]
  ) {
    const sender = getSpendingAccount(wallet)
    abiCall<typeof SunsetContract.prototype.deleteBoxes>({
      sender,
      appId,
      args: [boxes],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  closeOut(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application,
    closes: AssetCloseParams[]
  ) {
    const sender = getSpendingAccount(wallet)
    abiCall<typeof SunsetContract.prototype.closeOut>({
      sender,
      appId,
      args: [closes],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  deleteAssets(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application,
    assets: Asset[]
  ) {
    const sender = getSpendingAccount(wallet)
    abiCall<typeof SunsetContract.prototype.deleteAssets>({
      sender,
      appId,
      args: [assets],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }
}
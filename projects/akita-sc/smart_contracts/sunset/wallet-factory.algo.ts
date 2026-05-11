import {
  abimethod,
  Account,
  Application,
  Asset,
  Box,
  bytes,
  Bytes,
  Contract,
  Global,
  GlobalState,
  itxn,
  OnCompleteAction,
  op,
  uint64,
} from '@algorandfoundation/algorand-typescript'
import { abiCall, compileArc4 } from '@algorandfoundation/algorand-typescript/arc4'
import { MAX_AVM_BYTE_ARRAY_LENGTH } from '../utils/constants'
import { SunsetContract } from './contract.algo'
import { AssetCloseParams } from './types'

const BaseFactoryGlobalStateKeyChildContractVersion = 'child_contract_version'
const BoxKeyBoxedContract = 'bc'

class AbstractedAccountUpdateStub extends Contract {
  update(version: string): void {
    return
  }
}

/**
 * Final approval for the ARC58 wallet factory during protocol sunset.
 *
 * The factory is the creator of DAO wallet apps, so this keeps just enough of
 * the old factory behavior alive to push the already-boxed SunsetContract into
 * the DAO wallet and then call the wallet's sunset cleanup methods as creator.
 */
export class WalletFactorySunsetContract extends Contract {
  childContractVersion = GlobalState<string>({ key: BaseFactoryGlobalStateKeyChildContractVersion })
  boxedContract = Box<bytes>({ key: BoxKeyBoxedContract })

  updateWallet(wallet: Application): void {
    const approvalSize: uint64 = this.boxedContract.length

    let chunk1: bytes
    let chunk2: bytes
    if (approvalSize > MAX_AVM_BYTE_ARRAY_LENGTH) {
      chunk1 = this.boxedContract.extract(0, MAX_AVM_BYTE_ARRAY_LENGTH)
      chunk2 = this.boxedContract.extract(MAX_AVM_BYTE_ARRAY_LENGTH, approvalSize - MAX_AVM_BYTE_ARRAY_LENGTH)
    } else {
      chunk1 = this.boxedContract.extract(0, approvalSize)
      chunk2 = Bytes('')
    }

    abiCall<typeof AbstractedAccountUpdateStub.prototype.update>({
      appId: wallet,
      args: [this.childContractVersion.value],
      onCompletion: OnCompleteAction.UpdateApplication,
      approvalProgram: [chunk1, chunk2],
      clearStateProgram: compileArc4(SunsetContract).clearStateProgram,
    })
  }

  deleteWalletBoxes(wallet: Application, boxes: bytes[]): void {
    abiCall<typeof SunsetContract.prototype.deleteBoxes>({
      sender: Global.currentApplicationAddress,
      appId: wallet,
      args: [boxes],
    })
  }

  closeOutWallet(wallet: Application, closes: AssetCloseParams[]): void {
    abiCall<typeof SunsetContract.prototype.closeOut>({
      sender: Global.currentApplicationAddress,
      appId: wallet,
      args: [closes],
    })
  }

  deleteWalletAssets(wallet: Application, assets: Asset[]): void {
    abiCall<typeof SunsetContract.prototype.deleteAssets>({
      sender: Global.currentApplicationAddress,
      appId: wallet,
      args: [assets],
    })
  }

  deleteWallet(wallet: Application, closeRemainderTo: Account): void {
    abiCall<typeof SunsetContract.prototype.delete>({
      sender: Global.currentApplicationAddress,
      appId: wallet,
      args: [closeRemainderTo],
      onCompletion: OnCompleteAction.DeleteApplication,
    })
  }

  deleteBoxedContract(): void {
    this.boxedContract.delete()
  }

  deleteBoxes(boxes: bytes[]): void {
    for (let i: uint64 = 0; i < boxes.length; i++) {
      op.Box.delete(boxes[i])
    }
  }

  closeOut(closes: AssetCloseParams[]): void {
    for (let i: uint64 = 0; i < closes.length; i++) {
      const { assetCloseTo, xferAsset } = closes[i]
      itxn.assetTransfer({ assetCloseTo, xferAsset }).submit()
    }
  }

  deleteAssets(assets: Asset[]): void {
    for (let i: uint64 = 0; i < assets.length; i++) {
      itxn.assetConfig({ configAsset: assets[i] }).submit()
    }
  }

  @abimethod({ allowActions: ['DeleteApplication'] })
  delete(closeRemainderTo: Account): void {
    itxn.payment({ closeRemainderTo }).submit()
  }
}

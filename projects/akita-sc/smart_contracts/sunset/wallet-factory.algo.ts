import {
  abimethod,
  Account,
  Application,
  Asset,
  Box,
  bytes,
  Bytes,
  contract,
  Contract,
  Global,
  GlobalState,
  itxn,
  loggedAssert,
  OnCompleteAction,
  op,
  TemplateVar,
  Txn,
  uint64,
} from '@algorandfoundation/algorand-typescript'
import { abiCall, compileArc4 } from '@algorandfoundation/algorand-typescript/arc4'
import { errNotAkitaDao } from '../errors'
import { appGlobalSchema, boxedProgramChunk, boxedProgramSize, extraPagesToGrow } from '../utils/programs'
import { SunsetContract } from './contract.algo'
import { AssetCloseParams } from './types'

const BaseFactoryGlobalStateKeyChildContractVersion = 'child_contract_version'
const BoxKeyBoxedContract = 'bc'

/** Sunset operator pinned at compile time (same template variable as SunsetContract). */
const sunsetCaller = TemplateVar<Account>('SUNSET_CALLER')

@contract({ avmVersion: 13 })
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
 *
 * Every entry point is restricted to the factory creator or SUNSET_CALLER. The
 * factory is the creator of every wallet, so an open entry point would let any
 * caller pass SunsetContract.auth() on any wallet and pick the close-out
 * destination for its funds.
 */
@contract({ avmVersion: 13 })
export class WalletFactorySunsetContract extends Contract {
  childContractVersion = GlobalState<string>({ key: BaseFactoryGlobalStateKeyChildContractVersion })
  boxedContract = Box<bytes>({ key: BoxKeyBoxedContract })

  private auth(): void {
    loggedAssert(
      (Txn.sender === Global.creatorAddress || Txn.sender === sunsetCaller),
      errNotAkitaDao
    )
  }

  updateWallet(wallet: Application): void {
    this.auth()
    const key = Bytes(BoxKeyBoxedContract)
    const clearProgram = compileArc4(SunsetContract).clearStateProgram
    // The factory sends the update; on page growth it becomes the wallet's size sponsor.
    const growTo = extraPagesToGrow(wallet, boxedProgramSize(key), clearProgram.length)

    if (growTo > 0) {
      // Setting extraProgramPages also sets the global schema (0 when omitted): keep the wallet's.
      const [numUint, numBytes] = appGlobalSchema(wallet)
      abiCall<typeof AbstractedAccountUpdateStub.prototype.update>({
        appId: wallet,
        args: [this.childContractVersion.value],
        onCompletion: OnCompleteAction.UpdateApplication,
        approvalProgram: [
          boxedProgramChunk(key, 0),
          boxedProgramChunk(key, 1),
          boxedProgramChunk(key, 2),
          boxedProgramChunk(key, 3),
        ],
        clearStateProgram: clearProgram,
        extraProgramPages: growTo,
        globalNumUint: numUint,
        globalNumBytes: numBytes,
      })
    } else {
      abiCall<typeof AbstractedAccountUpdateStub.prototype.update>({
        appId: wallet,
        args: [this.childContractVersion.value],
        onCompletion: OnCompleteAction.UpdateApplication,
        approvalProgram: [
          boxedProgramChunk(key, 0),
          boxedProgramChunk(key, 1),
          boxedProgramChunk(key, 2),
          boxedProgramChunk(key, 3),
        ],
        clearStateProgram: clearProgram,
      })
    }
  }

  deleteWalletBoxes(wallet: Application, boxes: bytes[]): void {
    this.auth()
    abiCall<typeof SunsetContract.prototype.deleteBoxes>({
      sender: Global.currentApplicationAddress,
      appId: wallet,
      args: [boxes],
    })
  }

  closeOutWallet(wallet: Application, closes: AssetCloseParams[]): void {
    this.auth()
    abiCall<typeof SunsetContract.prototype.closeOut>({
      sender: Global.currentApplicationAddress,
      appId: wallet,
      args: [closes],
    })
  }

  deleteWalletAssets(wallet: Application, assets: Asset[]): void {
    this.auth()
    abiCall<typeof SunsetContract.prototype.deleteAssets>({
      sender: Global.currentApplicationAddress,
      appId: wallet,
      args: [assets],
    })
  }

  deleteWalletEscrows(wallet: Application, escrowFactory: Application, escrowIds: uint64[]): void {
    this.auth()
    abiCall<typeof SunsetContract.prototype.deleteEscrows>({
      sender: Global.currentApplicationAddress,
      appId: wallet,
      args: [escrowFactory, escrowIds],
    })
  }

  deleteWallet(wallet: Application, closeRemainderTo: Account): void {
    this.auth()
    abiCall<typeof SunsetContract.prototype.delete>({
      sender: Global.currentApplicationAddress,
      appId: wallet,
      args: [closeRemainderTo],
      onCompletion: OnCompleteAction.DeleteApplication,
    })
  }

  deleteBoxedContract(): void {
    this.auth()
    this.boxedContract.delete()
  }

  deleteBoxes(boxes: bytes[]): void {
    this.auth()
    for (let i: uint64 = 0; i < boxes.length; i++) {
      op.Box.delete(boxes[i])
    }
  }

  closeOut(closes: AssetCloseParams[]): void {
    this.auth()
    for (let i: uint64 = 0; i < closes.length; i++) {
      const { assetCloseTo, xferAsset } = closes[i]
      itxn.assetTransfer({ assetCloseTo, xferAsset }).submit()
    }
  }

  deleteAssets(assets: Asset[]): void {
    this.auth()
    for (let i: uint64 = 0; i < assets.length; i++) {
      itxn.assetConfig({ configAsset: assets[i] }).submit()
    }
  }

  @abimethod({ allowActions: ['DeleteApplication'] })
  delete(closeRemainderTo: Account): void {
    this.auth()
    itxn.payment({ closeRemainderTo }).submit()
  }
}

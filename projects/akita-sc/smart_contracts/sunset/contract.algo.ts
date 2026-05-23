import { abimethod, Account, Application, Asset, bytes, clone, Contract, Global, itxn, loggedAssert, op, TemplateVar, Txn, uint64 } from "@algorandfoundation/algorand-typescript"
import { abiCall } from "@algorandfoundation/algorand-typescript/arc4"
import { AbstractedAccount } from "../arc58/account/contract.algo"
import { EscrowReclaim } from "../arc58/account/types"
import { EscrowFactory } from "../escrow/factory.algo"
import { ERR_NOT_AKITA_DAO } from "../errors"
import { AssetCloseParams, WalletEscrowReclaim } from "./types"

const sunsetCaller = TemplateVar<Account>('SUNSET_CALLER')

export class SunsetContract extends Contract {

  private auth(): void {
    loggedAssert(
      (Txn.sender === Global.creatorAddress || Txn.sender === sunsetCaller),
      ERR_NOT_AKITA_DAO
    )
  }

  @abimethod({ allowActions: ['DeleteApplication'] })
  delete(closeRemainderTo: Account): void {
    this.auth()
    itxn.payment({ closeRemainderTo }).submit()
  }

  deleteBoxes(boxes: bytes[]): void {
    for (let i: uint64 = 0; i < boxes.length; i++) {
      op.Box.delete(boxes[i])
    }
  }

  closeOut(closes: AssetCloseParams[]): void {
    this.auth()
    for (let i: uint64 = 0; i < closes.length; i++) {
      const { assetCloseTo, xferAsset } = clone(closes[i])
      itxn.assetTransfer({ assetCloseTo, xferAsset }).submit()
    }
  }

  deleteAssets(assets: Asset[]): void {
    this.auth()
    for (let i: uint64 = 0; i < assets.length; i++) {
      itxn.assetConfig({ configAsset: assets[i] }).submit()
    }
  }

  deleteEscrows(escrowFactory: Application, escrowIds: uint64[]): void {
    this.auth()
    for (let i: uint64 = 0; i < escrowIds.length; i++) {
      abiCall<typeof EscrowFactory.prototype.delete>({
        appId: escrowFactory,
        args: [escrowIds[i]],
      })
    }
  }

  reclaimWalletEscrows(wallet: Application, reclaims: WalletEscrowReclaim[]): void {
    this.auth()
    for (let i: uint64 = 0; i < reclaims.length; i++) {
      const reclaim = clone(reclaims[i])
      const walletReclaims: EscrowReclaim[] = [{
        asset: reclaim.asset,
        amount: reclaim.amount,
        closeOut: reclaim.closeOut,
      }]
      abiCall<typeof AbstractedAccount.prototype.arc58_reclaim>({
        appId: wallet,
        args: [reclaim.escrow, walletReclaims],
      })
    }
  }
}

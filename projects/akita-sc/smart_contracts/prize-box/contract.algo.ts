import {
  abimethod,
  Account,
  Contract,
  Global,
  GlobalState,
  gtxn,
  itxn,
  loggedAssert,
  Txn,
  uint64,
} from '@algorandfoundation/algorand-typescript'
import { AssetHolding } from '@algorandfoundation/algorand-typescript/op'
import { AssetInfo } from '../utils/types/asset'
import { PrizeBoxGlobalStateKeyOptinCount, PrizeBoxGlobalStateKeyOwner } from './constants'
import { ERR_INVALID_ASSET, ERR_INVALID_PAYMENT, ERR_NOT_EMPTY, ERR_NOT_OWNER } from './errors'

export class PrizeBox extends Contract {

  // GLOBAL STATE ---------------------------------------------------------------------------------

  /** the owner of the box of prizes */
  owner = GlobalState<Account>({ key: PrizeBoxGlobalStateKeyOwner })
  /** the current count of prizes opted in */
  optinCount = GlobalState<uint64>({ key: PrizeBoxGlobalStateKeyOptinCount })

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  create(owner: Account): void {
    this.owner.value = owner
    this.optinCount.value = 0
  }

  @abimethod({ allowActions: 'DeleteApplication' })
  deleteApplication(): void {
    loggedAssert(Txn.sender === this.owner.value, ERR_NOT_OWNER)
    loggedAssert(this.optinCount.value === 0, ERR_NOT_EMPTY)
    itxn
      .payment({ closeRemainderTo: this.owner.value })
      .submit()
  }

  // PRIZE BOX METHODS ----------------------------------------------------------------------------

  /**
   * optin tells the contract to opt into an asa
   * @param payment The payment transaction
   * @param asset The asset to be opted into
   */
  optin(payment: gtxn.PaymentTxn, asset: uint64): void {
    loggedAssert(Txn.sender === this.owner.value, ERR_NOT_OWNER)
    loggedAssert(payment.receiver === Global.currentApplicationAddress, ERR_INVALID_PAYMENT)
    loggedAssert(payment.amount === Global.assetOptInMinBalance, ERR_INVALID_PAYMENT)

    itxn
      .assetTransfer({
        assetReceiver: Global.currentApplicationAddress,
        assetAmount: 0,
        xferAsset: asset,
      })
      .submit()

    this.optinCount.value += 1
  }

  transfer(newOwner: Account): void {
    loggedAssert(Txn.sender === this.owner.value, ERR_NOT_OWNER)
    this.owner.value = newOwner
  }

  withdraw(assets: AssetInfo[]): void {
    loggedAssert(Txn.sender === this.owner.value, ERR_NOT_OWNER)

    for (let i: uint64 = 0; i < assets.length; i += 1) {
      if (assets[i].asset !== 0) {
        const [assetHolding, optedIn] = AssetHolding.assetBalance(
          Global.currentApplicationAddress,
          assets[i].asset
        )
        loggedAssert(optedIn, ERR_INVALID_ASSET)

        const closeOut = assetHolding === assets[i].amount
        if (closeOut) {
          this.optinCount.value -= 1

          itxn
            .assetTransfer({
              xferAsset: assets[i].asset,
              assetAmount: assets[i].amount,
              assetReceiver: this.owner.value,
              assetCloseTo: this.owner.value,
            })
            .submit()
        } else {
          itxn
            .assetTransfer({
              xferAsset: assets[i].asset,
              assetAmount: assets[i].amount,
              assetReceiver: this.owner.value,
            })
            .submit()
        }
      } else {
        itxn
          .payment({
            amount: assets[i].amount,
            receiver: this.owner.value,
          })
          .submit()
      }
    }
  }
}

import {
  abimethod,
  Account,
  Asset,
  clone,
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
import { errAlreadyOptedIn, errClawbackAsset, errInvalidAsset, errInvalidPayment, errMustBeCalledFromFactory, errNotEmpty, errNotOwner } from './errors'
import { FunderInfo } from '../utils/types/mbr'

// CONTRACT IMPORTS
import { ChildContract } from '../utils/base-contracts/child'

/**
 * A transferable bundle of ASAs/ALGO. `funder` (from `ChildContract`) records who paid the
 * app-creation MBR; the factory refunds it to them on deletion. Everything held in the box
 * account (its min balance, opt-in MBR, any ALGO) belongs to the current owner.
 */
export class PrizeBox extends ChildContract {

  // GLOBAL STATE ---------------------------------------------------------------------------------

  /** the owner of the box of prizes */
  owner = GlobalState<Account>({ key: PrizeBoxGlobalStateKeyOwner })
  /** the current count of prizes opted in */
  optinCount = GlobalState<uint64>({ key: PrizeBoxGlobalStateKeyOptinCount })

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  create(owner: Account, funder: FunderInfo): void {
    this.owner.value = owner
    this.optinCount.value = 0
    this.funder.value = clone(funder)
  }

  /**
   * Deleted only through `PrizeBoxFactory.deletePrizeBox` so the creation MBR the factory
   * releases can be refunded to the minter; the box account closes to the owner.
   */
  @abimethod({ allowActions: 'DeleteApplication' })
  deleteApplication(caller: Account): void {
    loggedAssert(Txn.sender === Global.creatorAddress, errMustBeCalledFromFactory)
    loggedAssert(caller === this.owner.value, errNotOwner)
    loggedAssert(this.optinCount.value === 0, errNotEmpty)
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
    loggedAssert(Txn.sender === this.owner.value, errNotOwner)
    loggedAssert(payment.receiver === Global.currentApplicationAddress, errInvalidPayment)
    loggedAssert(payment.amount === Global.assetOptInMinBalance, errInvalidPayment)
    // a repeat opt-in would inflate optinCount and make the box undeletable
    loggedAssert(!Global.currentApplicationAddress.isOptedIn(Asset(asset)), errAlreadyOptedIn)
    // a clawback-enabled asset could be seized out of the box after it is sold
    loggedAssert(Asset(asset).clawback === Global.zeroAddress, errClawbackAsset)

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
    loggedAssert(Txn.sender === this.owner.value, errNotOwner)
    this.owner.value = newOwner
  }

  withdraw(assets: AssetInfo[]): void {
    loggedAssert(Txn.sender === this.owner.value, errNotOwner)

    for (let i: uint64 = 0; i < assets.length; i += 1) {
      if (assets[i].asset !== 0) {
        const [assetHolding, optedIn] = AssetHolding.assetBalance(
          Global.currentApplicationAddress,
          assets[i].asset
        )
        loggedAssert(optedIn, errInvalidAsset)

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

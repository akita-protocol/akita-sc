import {
  Asset,
  Contract,
  Global,
  gtxn,
  itxn,
  loggedAssert,
  loggedErr,
  Txn,
  uint64,
} from '@algorandfoundation/algorand-typescript'
import { errInvalidPaymentAmount, errInvalidPaymentReceiver, errForbidden } from '../../errors'

export class ContractWithOptIn extends Contract {

  // CONTRACT W/ OPTIN METHODS --------------------------------------------------------------------

  /**
   * optin tells the contract to opt into an asa
   * @param payment The payment transaction
   * @param asset The asset to be opted into
   */
  optIn(payment: gtxn.PaymentTxn, asset: Asset): void {

    loggedAssert(payment.receiver === Global.currentApplicationAddress, errInvalidPaymentReceiver)
    loggedAssert(payment.amount === Global.assetOptInMinBalance, errInvalidPaymentAmount)

    itxn
      .assetTransfer({
        assetReceiver: Global.currentApplicationAddress,
        assetAmount: 0,
        xferAsset: asset
      })
      .submit()
  }
}

export class ContractWithCreatorOnlyOptIn extends Contract {

  // CONTRACT W/ CREATOR ONLY OPTIN METHODS -------------------------------------------------------

  /**
   * optin tells the contract to opt into an asa
   * @param payment The payment transaction
   * @param asset The asset to be opted into
   */
  optin(payment: gtxn.PaymentTxn, asset: uint64): void {
    loggedAssert(Txn.sender === Global.creatorAddress, errForbidden)

    loggedAssert(payment.receiver === Global.currentApplicationAddress, errInvalidPaymentReceiver)
    loggedAssert(payment.amount === Global.assetOptInMinBalance, errInvalidPaymentAmount)

    itxn.assetTransfer({
      assetReceiver: Global.currentApplicationAddress,
      assetAmount: 0,
      xferAsset: asset
    }).submit()
  }
}

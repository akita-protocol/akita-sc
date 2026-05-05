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
import { ERR_INVALID_PAYMENT_AMOUNT, ERR_INVALID_PAYMENT_RECEIVER, ERR_FORBIDDEN } from '../../errors'

export class ContractWithOptIn extends Contract {

  // CONTRACT W/ OPTIN METHODS --------------------------------------------------------------------

  /**
   * optin tells the contract to opt into an asa
   * @param payment The payment transaction
   * @param asset The asset to be opted into
   */
  optIn(payment: gtxn.PaymentTxn, asset: Asset): void {

    loggedAssert(payment.receiver === Global.currentApplicationAddress, ERR_INVALID_PAYMENT_RECEIVER)
    loggedAssert(payment.amount === Global.assetOptInMinBalance, ERR_INVALID_PAYMENT_AMOUNT)

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
    loggedAssert(Txn.sender === Global.creatorAddress, ERR_FORBIDDEN)

    loggedAssert(payment.receiver === Global.currentApplicationAddress, ERR_INVALID_PAYMENT_RECEIVER)
    loggedAssert(payment.amount === Global.assetOptInMinBalance, ERR_INVALID_PAYMENT_AMOUNT)

    itxn.assetTransfer({
      assetReceiver: Global.currentApplicationAddress,
      assetAmount: 0,
      xferAsset: asset
    }).submit()
  }
}

import { Account, Application, assert, assertMatch, Asset, clone, Global, GlobalState, gtxn, itxn, Txn, uint64 } from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod } from '@algorandfoundation/algorand-typescript/arc4'
import { classes } from 'polytype'
import { MAX_UINT64 } from '../utils/constants'
import { ERR_INVALID_PAYMENT, ERR_INVALID_TRANSFER } from '../utils/errors'
import { calcPercent, createInstantDisbursement, getNFTFees, getUserImpact, impactRange, sendReferralPayment } from '../utils/functions'
import { FunderInfo } from '../utils/types/mbr'
import { RoyaltyAmounts } from '../utils/types/royalties'
import { ListingGlobalStateKeyAkitaDAOEscrow, ListingGlobalStateKeyCreatorRoyalty, ListingGlobalStateKeyExpiration, ListingGlobalStateKeyGateID, ListingGlobalStateKeyIsPrizeBox, ListingGlobalStateKeyMarketplace, ListingGlobalStateKeyMarketplaceRoyalties, ListingGlobalStateKeyPaymentAsset, ListingGlobalStateKeyPrice, ListingGlobalStateKeyPrize, ListingGlobalStateKeyReservedFor, ListingGlobalStateKeySeller } from './constants'
import { ERR_INVALID_EXPIRATION, ERR_LISTING_EXPIRED, ERR_MUST_BE_CALLED_FROM_FACTORY, ERR_MUST_BE_SELLER, ERR_ONLY_SELLER_CAN_DELIST, ERR_PAYMENT_ASSET_MUST_BE_ALGO, ERR_PAYMENT_ASSET_MUST_NOT_BE_ALGO, ERR_RESERVED_FOR_DIFFERENT_ADDRESS } from './errors'

// CONTRACT IMPORTS
import type { PrizeBox } from '../prize-box/contract.algo'
import { AkitaBaseContract } from '../utils/base-contracts/base'
import { ChildContract } from '../utils/base-contracts/child'
import { ContractWithCreatorOnlyOptIn } from '../utils/base-contracts/optin'

export class Listing extends classes(
  AkitaBaseContract,
  ContractWithCreatorOnlyOptIn,
  ChildContract
) {

  // GLOBAL STATE ---------------------------------------------------------------------------------

  /** the asset for sale: Asset | Application ( Prize Box ) */
  prize = GlobalState<uint64>({ key: ListingGlobalStateKeyPrize })
  /** whether or not the prize is an asset or a prize box */
  isPrizeBox = GlobalState<boolean>({ key: ListingGlobalStateKeyIsPrizeBox })
  /** the price of the asset */
  price = GlobalState<uint64>({ key: ListingGlobalStateKeyPrice })
  /** the asset to use for payment */
  paymentAsset = GlobalState<Asset>({ key: ListingGlobalStateKeyPaymentAsset })
  /** the timestamp the listing expires on, once this passes all that can be done is delist */
  expiration = GlobalState<uint64>({ key: ListingGlobalStateKeyExpiration })
  /** the address selling the asset */
  seller = GlobalState<Account>({ key: ListingGlobalStateKeySeller })
  /** the address the sale is reserved for */
  reservedFor = GlobalState<Account>({ key: ListingGlobalStateKeyReservedFor })
  /** the amount the creator will get for the sale */
  creatorRoyalty = GlobalState<uint64>({ key: ListingGlobalStateKeyCreatorRoyalty })
  /** the gate ID to use to check if the user is qualified to buy */
  gateID = GlobalState<uint64>({ key: ListingGlobalStateKeyGateID })

  /**
   * The address of the marketplace that listed the asset to send the fee to
   *
   * IMPORTANT: this is a double sided marketplace fee contract
   * the marketplace referred to internally in the contract
   * is the listing side marketplace.
   * the buyer side marketplace provides their address at
   * the time of purchase
   */
  marketplace = GlobalState<Account>({ key: ListingGlobalStateKeyMarketplace })
  /** the amount the marketplaces will get for the sale */
  marketplaceRoyalties = GlobalState<uint64>({ key: ListingGlobalStateKeyMarketplaceRoyalties })
  /** the app ID for the akita DAO escrow */
  akitaDAOEscrow = GlobalState<Application>({ key: ListingGlobalStateKeyAkitaDAOEscrow })

  // PRIVATE METHODS ------------------------------------------------------------------------------

  private getAmounts(amount: uint64): RoyaltyAmounts {
    let creatorAmount = calcPercent(amount, this.creatorRoyalty.value)
    if (creatorAmount === 0 && this.creatorRoyalty.value > 0 && amount > 0) {
      creatorAmount = 1
    }

    const { marketplaceSalePercentageMin: min, marketplaceSalePercentageMax: max } = getNFTFees(this.akitaDAO.value)
    const impact = getUserImpact(this.akitaDAO.value, this.seller.value)
    const akitaTaxRate = impactRange(impact, min, max)

    let akitaAmount = calcPercent(amount, akitaTaxRate)
    if (akitaAmount === 0 && amount > 0) {
      akitaAmount = 1
    }

    let marketplaceAmount = calcPercent(amount, this.marketplaceRoyalties.value)
    if (marketplaceAmount === 0 && this.marketplaceRoyalties.value > 0 && amount > 0) {
      marketplaceAmount = 1
    }

    const sellerAmount: uint64 = amount - (creatorAmount + akitaAmount + (2 * marketplaceAmount))

    return {
      creator: creatorAmount,
      akita: akitaAmount,
      marketplace: marketplaceAmount,
      seller: sellerAmount,
    }
  }

  private transferPurchaseToBuyer(buyer: Account): void {
    if (this.isPrizeBox.value) {
      abiCall<typeof PrizeBox.prototype.transfer>({
        appId: this.prize.value,
        args: [buyer],
      })
      return
    }

    const prizeAsset = Asset(this.prize.value)

    if (buyer.isOptedIn(prizeAsset)) {
      // transfer the purchase to the caller & opt out of the asset
      itxn.assetTransfer({
        assetCloseTo: buyer,
        xferAsset: prizeAsset,
      }).submit()
    } else {
      createInstantDisbursement(
        this.akitaDAO.value,
        prizeAsset.id,
        0,
        MAX_UINT64,
        [{ address: buyer, amount: prizeAsset.balance(Global.currentApplicationAddress) }],
        prizeAsset.balance(Global.currentApplicationAddress),
        true
      )
    }
  }

  private completeAlgoPayments(marketplace: Account): void {
    // get the royalty payment amounts
    const amounts = this.getAmounts(this.price.value)

    // pay akita fee (referral + escrow)
    let leftover: uint64 = amounts.akita
    if (amounts.akita > 0) {
      ({ leftover } = sendReferralPayment(this.akitaDAO.value, 0, amounts.akita))
    }

    itxn
      .payment({
        receiver: this.akitaDAOEscrow.value.address,
        amount: leftover,
      })
      .submit()

    // pay listing marketplace
    itxn
      .payment({
        amount: amounts.marketplace,
        receiver: this.marketplace.value,
      })
      .submit()

    // pay buying marketplace
    itxn
      .payment({
        amount: amounts.marketplace,
        receiver: marketplace,
      })
      .submit()

    // pay seller
    if (this.isPrizeBox.value) {
      itxn
        .payment({
          amount: amounts.seller,
          receiver: this.seller.value,
        })
        .submit()
    } else {
      const assetPrize = Asset(this.prize.value)

      // pay the creator
      itxn
        .payment({
          amount: amounts.creator,
          receiver: assetPrize.creator,
        })
        .submit()

      // pay the seller
      itxn
        .payment({
          amount: amounts.seller,
          note: String(assetPrize.name) + ' Sold',
          receiver: this.seller.value,
        })
        .submit()
    }
  }

  private completeAsaPayments(marketplace: Account): void {
    // get the royalty payment amounts
    const amounts = this.getAmounts(this.price.value)

    // pay akita fee (referral + escrow)
    let leftover: uint64 = amounts.akita
    if (amounts.akita > 0) {
      ({ leftover } = sendReferralPayment(this.akitaDAO.value, this.paymentAsset.value.id, amounts.akita))
    }

    itxn
      .assetTransfer({
        assetReceiver: this.akitaDAOEscrow.value.address,
        assetAmount: leftover,
        xferAsset: this.paymentAsset.value,
      })
      .submit()

    // pay the creator (only for regular ASAs — prize boxes have no creator royalty)
    if (!this.isPrizeBox.value) {
      const assetPrize = Asset(this.prize.value)

      if (assetPrize.creator.isOptedIn(this.paymentAsset.value)) {
        itxn
          .assetTransfer({
            assetReceiver: assetPrize.creator,
            assetAmount: amounts.creator,
            xferAsset: this.paymentAsset.value,
          })
          .submit()
      } else {
        createInstantDisbursement(
          this.akitaDAO.value,
          this.paymentAsset.value.id,
          0,
          MAX_UINT64,
          [{ address: assetPrize.creator, amount: amounts.creator }],
          amounts.creator,
          false
        )
      }
    }

    // pay listing marketplace
    if (this.marketplace.value.isOptedIn(this.paymentAsset.value)) {
      itxn
        .assetTransfer({
          assetReceiver: this.marketplace.value,
          assetAmount: amounts.marketplace,
          xferAsset: this.paymentAsset.value,
        })
        .submit()
    } else {
      createInstantDisbursement(
        this.akitaDAO.value,
        this.paymentAsset.value.id,
        0,
        MAX_UINT64,
        [{ address: this.marketplace.value, amount: amounts.marketplace }],
        amounts.marketplace,
        false
      )
    }

    // pay buying marketplace
    if (marketplace.isOptedIn(this.paymentAsset.value)) {
      itxn
        .assetTransfer({
          assetReceiver: marketplace,
          assetAmount: amounts.marketplace,
          xferAsset: this.paymentAsset.value,
        })
        .submit()
    } else {
      createInstantDisbursement(
        this.akitaDAO.value,
        this.paymentAsset.value.id,
        0,
        MAX_UINT64,
        [{ address: marketplace, amount: amounts.marketplace }],
        amounts.marketplace,
        false
      )
    }

    // pay seller
    if (this.seller.value.isOptedIn(this.paymentAsset.value)) {
      itxn
        .assetTransfer({
          assetCloseTo: this.seller.value,
          xferAsset: this.paymentAsset.value,
        })
        .submit()
    } else {
      createInstantDisbursement(
        this.akitaDAO.value,
        this.paymentAsset.value.id,
        0,
        MAX_UINT64,
        [{ address: this.seller.value, amount: amounts.seller }],
        amounts.seller,
        false
      )
    }
  }

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  /** create the listing application */
  @abimethod({ onCreate: 'require' })
  create(
    prize: uint64,
    isPrizeBox: boolean,
    price: uint64,
    paymentAsset: uint64,
    expiration: uint64,
    seller: Account,
    funder: FunderInfo,
    reservedFor: Account,
    creatorRoyalty: uint64,
    gateID: uint64,
    marketplace: Account,
    version: string,
    akitaDAO: Application,
    akitaDAOEscrow: Application
  ): void {
    assert(Global.callerApplicationId !== 0, ERR_MUST_BE_CALLED_FROM_FACTORY)

    this.prize.value = prize
    this.isPrizeBox.value = isPrizeBox
    this.price.value = price
    this.paymentAsset.value = Asset(paymentAsset)
    assert(expiration === 0 || expiration > Global.latestTimestamp, ERR_INVALID_EXPIRATION)
    this.expiration.value = expiration
    this.seller.value = seller
    this.funder.value = clone(funder)
    this.reservedFor.value = reservedFor
    this.creatorRoyalty.value = creatorRoyalty
    this.gateID.value = gateID
    this.marketplace.value = marketplace
    this.version.value = version
    this.akitaDAO.value = akitaDAO
    this.akitaDAOEscrow.value = akitaDAOEscrow

    // internal variables
    this.marketplaceRoyalties.value = getNFTFees(this.akitaDAO.value).marketplaceComposablePercentage
  }

  /**
   *
   * @param {PaymentTxn} payment - the payment for purchasing the asset
   * @param {Address} buyer - the buyer of the asset
   * @param {Address} listingSeller - the payment side marketplace address to pay for selling the asset
   * @param {GateArgs} args - the args to pass to the gate
   * @throws {Error} - if the caller is not the factory
   * @throws {Error} - if the buyer doesnt pass the gate
   * @throws {Error} - if the buyer is not the reserved address
   * @throws {Error} - if the payment is not correct
   */
  @abimethod({ allowActions: 'DeleteApplication' })
  purchase(
    payment: gtxn.PaymentTxn,
    buyer: Account,
    marketplace: Account
  ): void {
    assert(Txn.sender === Global.creatorAddress, ERR_MUST_BE_CALLED_FROM_FACTORY)
    assert(this.paymentAsset.value.id === 0, ERR_PAYMENT_ASSET_MUST_BE_ALGO)
    assert(this.expiration.value === 0 || this.expiration.value > Global.latestTimestamp, ERR_LISTING_EXPIRED)

    if (this.reservedFor.value !== Global.zeroAddress) {
      assert(buyer === this.reservedFor.value, ERR_RESERVED_FOR_DIFFERENT_ADDRESS)
    }

    assertMatch(
      payment,
      {
        sender: Global.creatorAddress,
        receiver: Global.currentApplicationAddress,
        amount: this.price.value,
      },
      ERR_INVALID_PAYMENT
    )

    this.transferPurchaseToBuyer(buyer)
    this.completeAlgoPayments(marketplace)
    itxn
      .payment({ closeRemainderTo: Global.creatorAddress })
      .submit()
  }

  /**
   *
   * @param {PayTxn} payment - the payment for purchasing the asset
   * @param {Address} listingSeller - the payment side marketplace address to pay for selling the asset
   * @throws {Error} - if the caller is not the reserved address
   * @throws {Error} - if the payment is not correct
   */
  // @ts-ignore
  @abimethod({ OnCompleteAction: 'DeleteApplication' })
  purchaseAsa(
    assetXfer: gtxn.AssetTransferTxn,
    buyer: Account,
    marketplace: Account
  ): void {
    assert(Txn.sender === Global.creatorAddress, ERR_MUST_BE_CALLED_FROM_FACTORY)
    assert(this.paymentAsset.value.id !== 0, ERR_PAYMENT_ASSET_MUST_NOT_BE_ALGO)
    assert(this.expiration.value === 0 || this.expiration.value > Global.latestTimestamp, ERR_LISTING_EXPIRED)

    if (this.reservedFor.value !== Global.zeroAddress) {
      assert(buyer === this.reservedFor.value, ERR_RESERVED_FOR_DIFFERENT_ADDRESS)
    }

    assertMatch(
      assetXfer,
      {
        assetReceiver: Global.currentApplicationAddress,
        assetAmount: this.price.value,
      },
      ERR_INVALID_TRANSFER
    )

    this.transferPurchaseToBuyer(buyer)
    this.completeAsaPayments(marketplace)
    itxn
      .payment({ closeRemainderTo: Global.creatorAddress })
      .submit()
  }

  /** Deletes the app and returns the asset/mbr to the seller */
  @abimethod({ allowActions: 'DeleteApplication' })
  delist(caller: Account): void {
    assert(Txn.sender === Global.creatorAddress, ERR_MUST_BE_CALLED_FROM_FACTORY)
    assert(this.seller.value === caller, ERR_ONLY_SELLER_CAN_DELIST)

    const assetTransfer = itxn.assetTransfer({
      assetCloseTo: this.seller.value,
      xferAsset: this.prize.value,
    })

    const payment = itxn.payment({
      closeRemainderTo: Global.creatorAddress,
    })

    if (!(this.paymentAsset.value.id === 0)) {
      // opt out of payment asset
      const paymentAssetTransfer = itxn.assetTransfer({
        assetCloseTo: this.seller.value,
        xferAsset: this.paymentAsset.value,
      })

      if (this.isPrizeBox.value) {
        abiCall<typeof PrizeBox.prototype.transfer>({
          appId: this.prize.value,
          args: [this.seller.value],
        })
        itxn.submitGroup(paymentAssetTransfer, payment)
      } else {
        itxn.submitGroup(assetTransfer, paymentAssetTransfer, payment)
      }
    } else {
      if (this.isPrizeBox.value) {
        abiCall<typeof PrizeBox.prototype.transfer>({
          appId: this.prize.value,
          args: [this.seller.value],
        })
        payment.submit()
      } else {
        itxn.submitGroup(assetTransfer, payment)
      }
    }
  }

  changePrice(price: uint64): void {
    assert(Txn.sender === this.seller.value, ERR_MUST_BE_SELLER)
    this.price.value = price
  }
}

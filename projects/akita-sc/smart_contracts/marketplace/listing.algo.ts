import { Account, Application, Asset, clone, Global, GlobalState, gtxn, itxn, loggedAssert, Txn, uint64 } from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod } from '@algorandfoundation/algorand-typescript/arc4'
import { classes } from 'polytype'
import { MAX_UINT64 } from '../utils/constants'
import { calcPercent, canReceiveAlgo, createInstantDisbursement, getNFTFees, getUserImpact, impactRange, sendReferralPaymentTo } from '../utils/functions'
import { FunderInfo } from '../utils/types/mbr'
import { RoyaltyAmounts } from '../utils/types/royalties'
import { ListingGlobalStateKeyAkitaDAOEscrow, ListingGlobalStateKeyCreatorRoyalty, ListingGlobalStateKeyExpiration, ListingGlobalStateKeyFactoryFloat, ListingGlobalStateKeyGateID, ListingGlobalStateKeyIsPrizeBox, ListingGlobalStateKeyMarketplace, ListingGlobalStateKeyMarketplaceRoyalties, ListingGlobalStateKeyPaymentAsset, ListingGlobalStateKeyPrice, ListingGlobalStateKeyPrize, ListingGlobalStateKeyPriceRound, ListingGlobalStateKeyPrizeAmount, ListingGlobalStateKeyReservedFor, ListingGlobalStateKeyRevision, ListingGlobalStateKeySeller, ListingGlobalStateKeySellerReferrer, ListingMinimumPrice, ListingPriceChangeCooldownRounds, ListingRevision } from './constants'
import { errInvalidExpiration, errInvalidPayment, errInvalidTransfer, errListingExpired, errMustBeCalledFromFactory, errMustBeSeller, errOnlySellerCanDelist, errPaymentAssetMustBeAlgo, errPaymentAssetMustNotBeAlgo, errPriceRecentlyChanged, errPriceTooLow, errPrizeChanged, errReservedForDifferentAddress } from './errors'

// CONTRACT IMPORTS
import type { PrizeBox } from '../prize-box/contract.algo'
import { AkitaBaseContract,  } from '../utils/base-contracts/upgradeable'
import { EscrowConfig } from '../utils/base-contracts/base'
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
  akitaDAOEscrow = GlobalState<EscrowConfig>({ key: ListingGlobalStateKeyAkitaDAOEscrow })
  /** the amount of the prize asset escrowed at listing time (0 for prize boxes) */
  prizeAmount = GlobalState<uint64>({ key: ListingGlobalStateKeyPrizeAmount })
  /** the round of the last price change (0 = never changed); purchases wait out a cooldown after it */
  lastPriceRound = GlobalState<uint64>({ key: ListingGlobalStateKeyPriceRound })
  /** program revision; absent on legacy listings so the factory can tell them apart */
  rev = GlobalState<uint64>({ key: ListingGlobalStateKeyRevision })
  /**
   * the seller's referrer, fixed by the factory at creation (rev 3+): the verified principal's referrer
   * on the hinted `list`, the registry referrer on the legacy shim. Settlement pays the referral cut
   * here with no registry read. Zero address = no referral. (Rev-absent deployed listings never paid a
   * seller referral: their registry lookup keyed on `Txn.sender`, which is always the factory.)
   */
  sellerReferrer = GlobalState<Account>({ key: ListingGlobalStateKeySellerReferrer })
  /**
   * rev 3+: the creation MBR the factory advanced for a legacy-paid listing (0 otherwise). The factory
   * reads it before deletion and recovers it ahead of the funder refund; the Listing only stores it.
   */
  factoryFloat = GlobalState<uint64>({ key: ListingGlobalStateKeyFactoryFloat })

  // PRIVATE METHODS ------------------------------------------------------------------------------

  private getAmounts(amount: uint64): RoyaltyAmounts {
    const { marketplaceSalePercentageMin: min, marketplaceSalePercentageMax: max } = getNFTFees(this.akitaDAO.value)
    const impact = getUserImpact(this.akitaDAO.value, this.seller.value)
    return this.amountsAt(amount, impactRange(impact, min, max))
  }

  /**
   * A price must settle: every share of it is floored at one unit, so a price of a few units can owe
   * more than it brings in. Checked at the highest protocol rate, so a price accepted here settles
   * whatever the seller's impact is at the sale.
   */
  private assertPriceSettles(price: uint64): void {
    this.amountsAt(price, getNFTFees(this.akitaDAO.value).marketplaceSalePercentageMax)
  }

  /** The split of `amount` at protocol rate `akitaTaxRate`; refuses an amount the shares exceed (errPrlo). */
  private amountsAt(amount: uint64, akitaTaxRate: uint64): RoyaltyAmounts {
    let creatorAmount = calcPercent(amount, this.creatorRoyalty.value)
    if (creatorAmount === 0 && this.creatorRoyalty.value > 0 && amount > 0) {
      creatorAmount = 1
    }

    let akitaAmount = calcPercent(amount, akitaTaxRate)
    if (akitaAmount === 0 && amount > 0) {
      akitaAmount = 1
    }

    let marketplaceAmount = calcPercent(amount, this.marketplaceRoyalties.value)
    if (marketplaceAmount === 0 && this.marketplaceRoyalties.value > 0 && amount > 0) {
      marketplaceAmount = 1
    }

    const fees: uint64 = creatorAmount + akitaAmount + (2 * marketplaceAmount)
    loggedAssert(amount >= fees, errPriceTooLow)
    const sellerAmount: uint64 = amount - fees

    return {
      creator: creatorAmount,
      akita: akitaAmount,
      marketplace: marketplaceAmount,
      seller: sellerAmount,
    }
  }

  /** purchases must land strictly after the cooldown that follows a price change */
  private assertPriceSettled(): void {
    const last = this.lastPriceRound.value
    if (last > 0) {
      loggedAssert(Global.round > last + ListingPriceChangeCooldownRounds, errPriceRecentlyChanged)
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
    // the escrowed prize must be intact (e.g. not clawed back after listing); a donation on top
    // goes to the buyer with the close-out (TRADE-6)
    loggedAssert(prizeAsset.balance(Global.currentApplicationAddress) >= this.prizeAmount.value, errPrizeChanged)

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
        true,
        Global.zeroAddress
      )
    }
  }

  private completeAlgoPayments(marketplace: Account): void {
    // get the royalty payment amounts
    const amounts = this.getAmounts(this.price.value)

    // pay akita fee (referral + escrow)
    let leftover: uint64 = amounts.akita
    if (amounts.akita > 0) {
      ({ leftover } = sendReferralPaymentTo(this.akitaDAO.value, this.sellerReferrer.value, 0, amounts.akita, this.akitaDAOEscrow.value.app.address))
    }

    itxn
      .payment({
        receiver: this.akitaDAOEscrow.value.app.address,
        amount: leftover,
      })
      .submit()

    // A fee below the minimum balance cannot be paid to an account that holds no ALGO. Such a fee
    // goes to the DAO escrow, so a marketplace address that was never funded cannot revert the sale.
    const escrow = this.akitaDAOEscrow.value.app.address

    // pay listing marketplace
    itxn
      .payment({
        amount: amounts.marketplace,
        receiver: canReceiveAlgo(this.marketplace.value, amounts.marketplace) ? this.marketplace.value : escrow,
      })
      .submit()

    // pay buying marketplace
    itxn
      .payment({
        amount: amounts.marketplace,
        receiver: canReceiveAlgo(marketplace, amounts.marketplace) ? marketplace : escrow,
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
      ({ leftover } = sendReferralPaymentTo(this.akitaDAO.value, this.sellerReferrer.value, this.paymentAsset.value.id, amounts.akita, this.akitaDAOEscrow.value.app.address))
    }

    itxn
      .assetTransfer({
        assetReceiver: this.akitaDAOEscrow.value.app.address,
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
          false,
          Global.zeroAddress
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
        false,
        Global.zeroAddress
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
        false,
        Global.zeroAddress
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
      // close the payment asset out into the seller's inbox so the listing can be deleted
      const remaining = this.paymentAsset.value.balance(Global.currentApplicationAddress)
      createInstantDisbursement(
        this.akitaDAO.value,
        this.paymentAsset.value.id,
        0,
        MAX_UINT64,
        [{ address: this.seller.value, amount: remaining }],
        remaining,
        true,
        Global.zeroAddress
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
    akitaDAOEscrow: EscrowConfig,
    prizeAmount: uint64,
    sellerReferrer: Account,
    factoryFloat: uint64
  ): void {
    loggedAssert(Global.callerApplicationId !== 0, errMustBeCalledFromFactory)

    this.prize.value = prize
    this.isPrizeBox.value = isPrizeBox
    this.price.value = price
    this.paymentAsset.value = Asset(paymentAsset)
    loggedAssert(expiration === 0 || expiration > Global.latestTimestamp, errInvalidExpiration)
    this.expiration.value = expiration
    this.seller.value = seller
    this.funder.value = clone(funder)
    this.reservedFor.value = reservedFor
    this.creatorRoyalty.value = creatorRoyalty
    this.gateID.value = gateID
    this.marketplace.value = marketplace
    this.version.value = version
    this.akitaDAO.value = akitaDAO
    this.akitaDAOEscrow.value = clone(akitaDAOEscrow)
    this.prizeAmount.value = prizeAmount
    this.lastPriceRound.value = 0
    this.rev.value = ListingRevision
    this.sellerReferrer.value = sellerReferrer
    this.factoryFloat.value = factoryFloat

    // internal variables
    this.marketplaceRoyalties.value = getNFTFees(this.akitaDAO.value).marketplaceComposablePercentage
    // refuse a price that could not settle at this royalty
    this.assertPriceSettles(price)
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
    loggedAssert(Txn.sender === Global.creatorAddress, errMustBeCalledFromFactory)
    loggedAssert(this.paymentAsset.value.id === 0, errPaymentAssetMustBeAlgo)
    loggedAssert(this.expiration.value === 0 || this.expiration.value > Global.latestTimestamp, errListingExpired)
    this.assertPriceSettled()

    if (this.reservedFor.value !== Global.zeroAddress) {
      loggedAssert(buyer === this.reservedFor.value, errReservedForDifferentAddress)
    }

    loggedAssert(payment.sender === Global.creatorAddress, errInvalidPayment)
    loggedAssert(payment.receiver === Global.currentApplicationAddress, errInvalidPayment)
    loggedAssert(payment.amount === this.price.value, errInvalidPayment)

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
  @abimethod({ allowActions: 'DeleteApplication' })
  purchaseAsa(
    assetXfer: gtxn.AssetTransferTxn,
    buyer: Account,
    marketplace: Account
  ): void {
    loggedAssert(Txn.sender === Global.creatorAddress, errMustBeCalledFromFactory)
    loggedAssert(this.paymentAsset.value.id !== 0, errPaymentAssetMustNotBeAlgo)
    loggedAssert(this.expiration.value === 0 || this.expiration.value > Global.latestTimestamp, errListingExpired)
    this.assertPriceSettled()

    if (this.reservedFor.value !== Global.zeroAddress) {
      loggedAssert(buyer === this.reservedFor.value, errReservedForDifferentAddress)
    }

    loggedAssert(assetXfer.xferAsset.id === this.paymentAsset.value.id, errInvalidTransfer)
    loggedAssert(assetXfer.assetReceiver === Global.currentApplicationAddress, errInvalidTransfer)
    loggedAssert(assetXfer.assetAmount === this.price.value, errInvalidTransfer)

    this.transferPurchaseToBuyer(buyer)
    this.completeAsaPayments(marketplace)
    itxn
      .payment({ closeRemainderTo: Global.creatorAddress })
      .submit()
  }

  /** Deletes the app and returns the asset/mbr to the seller */
  @abimethod({ allowActions: 'DeleteApplication' })
  delist(caller: Account): void {
    loggedAssert(Txn.sender === Global.creatorAddress, errMustBeCalledFromFactory)
    loggedAssert(this.seller.value === caller, errOnlySellerCanDelist)

    const assetTransfer = itxn.assetTransfer({
      assetCloseTo: this.seller.value,
      xferAsset: this.prize.value,
    })

    const payment = itxn.payment({
      closeRemainderTo: Global.creatorAddress,
    })

    if (!(this.paymentAsset.value.id === 0)) {
      // Opt out of the payment asset. The listing holds none of it unless someone sent it some, and a
      // seller that is not opted in could not take that balance: it goes to the asset's creator, who
      // always can, so a donation cannot block the delist.
      const paymentAssetTransfer = itxn.assetTransfer({
        assetCloseTo: this.seller.value.isOptedIn(this.paymentAsset.value) ? this.seller.value : this.paymentAsset.value.creator,
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
    loggedAssert(Txn.sender === this.seller.value, errMustBeSeller)
    loggedAssert(price >= ListingMinimumPrice, errPriceTooLow)
    this.assertPriceSettles(price)
    this.price.value = price
    this.lastPriceRound.value = Global.round
  }
}

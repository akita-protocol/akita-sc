import { Account, Application, Asset, Bytes, clone, contract, Global, gtxn, itxn, loggedAssert, OnCompleteAction, op, Txn, uint64 } from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod, compileArc4, methodSelector } from '@algorandfoundation/algorand-typescript/arc4'
import { errHasGate } from '../social/errors'
import { CreatorRoyaltyMaximumSingle, FactoryGlobalStateMaxBytes, FactoryGlobalStateMaxUints, GLOBAL_STATE_KEY_BYTES_COST, GLOBAL_STATE_KEY_UINT_COST } from '../utils/constants'
import { MinDisbursementsMBR } from '../rewards/constants'
import { programPagesMbr } from '../utils/programs'
import { errBadMethodPrizeBoxTransferNeeded, errContractNotSet, errNotPrizeBoxOwner } from '../utils/errors'
import { assertSafeAssetTransfer, assertSafePayment, disbursementCost, gateCheck, gateCheckCtx, getFunder, getPrizeBoxOwner, legacyWalletOf, legacyOriginOrTxnSender, principalOf, referrerOrZeroAddress, rewardsOptInCost, royalties, splitOptInCount } from '../utils/functions'
import { gateCtx } from '../utils/principal'
import { Proof } from '../utils/types/merkles'
import { LegacyFloatReserve, LegacyListingCreateMbr, LegacyMinDisbursementsMBR, ListingGlobalStateKeyFactoryFloat, ListingGlobalStateKeyGateID, ListingGlobalStateKeyPaymentAsset, ListingGlobalStateKeyRevision, ListingMinimumPrice } from './constants'
import { errFailedGate, errInvalidPayment, errInvalidTransfer, errLegacyFloatReserve, errLegacyListing, errNotAListing, errPriceTooLow, errPrizeIsPaymentAsset, errRoyaltyAboveMax } from './errors'
import { ListingCostInfo } from './types'
import type { PrizeBox } from '../prize-box/contract.algo'

// CONTRACT IMPORTS
import { EscrowConfig } from '../utils/base-contracts/base'
import { FactoryContract, releasedRefund } from '../utils/base-contracts/factory'
import { Listing } from './listing.algo'


@contract({
  stateTotals: {
    globalBytes: FactoryGlobalStateMaxBytes,
    globalUints: FactoryGlobalStateMaxUints
  }
})
export class Marketplace extends FactoryContract {

  // BOXES ----------------------------------------------------------------------------------------

  // PRIVATE METHODS ------------------------------------------------------------------------------

  /**
   * Itemised cost of creating a listing child. Single source of truth for `list`,
   * `listPrizeBox`, the readonly `listCost` quote, the plugin and the SDK.
   */
  private listingCost(prize: uint64, paymentAsset: uint64, isPrizeBox: boolean): ListingCostInfo {
    const listing = compileArc4(Listing)
    const isAlgoPayment = paymentAsset === 0

    let optin: uint64 = 0
    let disbursement: uint64 = 0
    if (isPrizeBox) {
      // No prize disbursement (prize box transfer, not ASA)
      // 1 for referral payment (in payment asset)
      // ASA payment: 3 more (marketplace x2, seller) — no creator royalty for prize boxes
      if (isAlgoPayment) {
        disbursement = disbursementCost(1)
      } else {
        optin = Global.assetOptInMinBalance
        disbursement = disbursementCost(4) + rewardsOptInCost(this.akitaDAO.value, paymentAsset)
      }
    } else {
      // 1 for prize transfer (prize asset) + 1 for referral payment (in payment asset)
      // ASA payment: 4 more (creator, marketplace x2, seller)
      disbursement = disbursementCost(1) + rewardsOptInCost(this.akitaDAO.value, prize)
      if (isAlgoPayment) {
        optin = Global.assetOptInMinBalance
        disbursement += disbursementCost(1)
      } else {
        optin = Global.assetOptInMinBalance * 2
        disbursement += disbursementCost(5) + rewardsOptInCost(this.akitaDAO.value, paymentAsset)
      }
    }

    // Cost to opt the akita escrow (+ splits) into the payment asset; paid to the DAO, never refunded
    const escrowOptIn: uint64 = isAlgoPayment
      ? 0
      : Global.assetOptInMinBalance * splitOptInCount(this.akitaDAO.value, this.akitaDAOEscrow.value.app.address, Asset(paymentAsset))

    const createMbr: uint64 = (
      programPagesMbr(this.childExtraPagesAtLeast(listing.clearStateProgram.length, listing.extraProgramPages)) +
      (GLOBAL_STATE_KEY_UINT_COST * listing.globalUints) +
      (GLOBAL_STATE_KEY_BYTES_COST * listing.globalBytes)
    )
    const total: uint64 = createMbr + Global.minBalance + optin + disbursement + escrowOptIn

    return { total, escrowOptIn, disbursement, optin, createMbr }
  }

  /** Listings created before the `rev` marker run the old program (purchaseAsa never deletes) */
  private isLegacyListing(appId: Application): boolean {
    return !op.AppGlobal.getExUint64(appId, Bytes(ListingGlobalStateKeyRevision))[1]
  }

  /**
   * Refund a deleted listing's funder. Legacy listings keep their original full-deposit terms
   * (a bounded set); new listings get exactly what deletion released (balance received + creator
   * min-balance freed) minus the factory's float, capped at the recorded deposit. Consumed settlement
   * MBR is therefore the seller's on both the hinted and the legacy-paid path:
   * `min(released - float, recorded) = min(released, recorded + float) - float`.
   */
  private refundListingFunder(
    legacy: boolean,
    receiver: Account,
    amount: uint64,
    float: uint64,
    balanceBefore: uint64,
    minBefore: uint64,
    forwarded: uint64
  ): void {
    if (legacy) {
      itxn.payment({ receiver, amount }).submit()
    } else {
      const gross = releasedRefund(amount + float, balanceBefore, minBefore, forwarded)
      const refund: uint64 = gross > float ? gross - float : 0
      if (refund > 0) {
        itxn.payment({ receiver, amount: refund }).submit()
      }
    }
  }

  /** The creation MBR the factory floated for this listing (absent = 0 on rev-absent listings). Read before deletion. */
  private listingFloat(appId: Application): uint64 {
    return op.AppGlobal.getExUint64(appId, Bytes(ListingGlobalStateKeyFactoryFloat))[0]
  }

  private assertIsListing(appId: Application): void {
    loggedAssert(appId.creator === Global.currentApplicationAddress, errNotAListing)
  }

  private assertUngated(appId: Application): void {
    const gateID = op.AppGlobal.getExUint64(appId, Bytes(ListingGlobalStateKeyGateID))[0]
    loggedAssert(gateID === 0, errHasGate)
  }

  /**
   * Hinted gate (principal resolution §6.7): the buyer's verified context `(principal, wallet, spender)`
   * must be the exact `ctx` of the grouped `Gate.mustCheckFor` call. Invalid hints revert (errHnwl/errHtop/errHnbd).
   */
  private assertGatePassed(gateTxn: gtxn.ApplicationCallTxn, appId: Application, wallet: uint64): void {
    const p = principalOf(this.akitaDAO.value, wallet)
    const gateID = op.AppGlobal.getExUint64(appId, Bytes(ListingGlobalStateKeyGateID))[0]
    loggedAssert(gateCheckCtx(gateTxn, this.akitaDAO.value, gateCtx(p), gateID), errFailedGate)
  }

  /**
   * LEGACY (old-selector shims; delete in Phase 4). Deployed semantics: the subject is the buyer's
   * registry origin, checked by a plain `Gate.mustCheck(origin, ...)`.
   */
  private assertLegacyGatePassed(gateTxn: gtxn.ApplicationCallTxn, appId: Application): void {
    const wallet = legacyWalletOf(this.akitaDAO.value, Txn.sender)
    const origin = legacyOriginOrTxnSender(wallet)
    const gateID = op.AppGlobal.getExUint64(appId, Bytes(ListingGlobalStateKeyGateID))[0]
    loggedAssert(gateCheck(gateTxn, this.akitaDAO.value, origin, gateID), errFailedGate)
  }

  /**
   * LEGACY: the seller's creation-time registry referrer (spec §6.7 shim row). The deployed rev-absent
   * child never paid a seller referral (its lookup keyed on `Txn.sender` = this factory), so this is a
   * new payout on shim-created listings, not a deployed semantic (IMPLEMENTATION-LOG, marketplace review fixes).
   */
  private legacySellerReferrer(): Account {
    return referrerOrZeroAddress(legacyWalletOf(this.akitaDAO.value, Txn.sender))
  }

  /**
   * The listing payment: exactly `cost.total`. The legacy shims (`legacyPayment`) also accept, for
   * ALGO-priced listings only, the amount the deployed MarketplacePlugin 3569561455 and the pre-audit
   * SDK compute locally: the same terms with the pre-audit child creation MBR (`LegacyListingCreateMbr`)
   * and the v1 disbursement MBR (`LegacyMinDisbursementsMBR`) on each of the quote's disbursements
   * (prize + referral, or referral only for a prize box). The factory floats the difference
   * (`legacyListingFloat`) from its free balance while the listing lives and records it on the child (`factory_float`); settlement and delist repay
   * it before the funder refund (`refundListingFunder`). A legacy-paid list must leave at least
   * `LegacyFloatReserve` free (errLflt). ASA-priced legacy listings never settled on the deployed program
   * (MKT-05) and their legacy escrow opt-in term is wrong, so they must pay `cost.total`.
   * Returns the float (0 for a full payment).
   */
  private assertListingPayment(payment: gtxn.PaymentTxn, cost: ListingCostInfo, isAlgoPayment: boolean, isPrizeBox: boolean, legacyPayment: boolean): uint64 {
    loggedAssert(payment.receiver === Global.currentApplicationAddress, errInvalidPayment)
    if (payment.amount === cost.total) {
      return 0
    }
    const float = this.legacyListingFloat(cost, isPrizeBox)
    loggedAssert((
      legacyPayment && isAlgoPayment && cost.createMbr > LegacyListingCreateMbr &&
      payment.amount === cost.total - float
    ), errInvalidPayment)
    // creating the child costs the factory `cost.total` of free balance (payouts + creator MBR) against
    // `payment.amount` received, so free balance afterwards = now - cost.total
    const self = Global.currentApplicationAddress
    loggedAssert(self.balance - self.minBalance >= cost.total + LegacyFloatReserve, errLegacyFloatReserve)
    return float
  }

  /** What an ALGO-priced legacy quote leaves out: the creation MBR gap and the v2 MBR increase per disbursement. */
  private legacyListingFloat(cost: ListingCostInfo, isPrizeBox: boolean): uint64 {
    const disbursements: uint64 = isPrizeBox ? 1 : 2
    return cost.createMbr - LegacyListingCreateMbr + ((MinDisbursementsMBR - LegacyMinDisbursementsMBR) * disbursements)
  }

  /** The buyer's grouped ASA payment: plain transfer from the buyer, in the listing's payment asset */
  private assertBuyerAsaPayment(assetXfer: gtxn.AssetTransferTxn, appId: Application): void {
    assertSafeAssetTransfer(assetXfer, Txn.sender)
    loggedAssert(assetXfer.assetReceiver === Global.currentApplicationAddress, errInvalidTransfer)
    loggedAssert(assetXfer.assetAmount > 0, errInvalidTransfer)
    const paymentAsset = op.AppGlobal.getExUint64(appId, Bytes(ListingGlobalStateKeyPaymentAsset))[0]
    loggedAssert(assetXfer.xferAsset.id === paymentAsset, errInvalidTransfer)
  }

  /** The buyer's grouped ALGO payment: plain payment from the buyer */
  private assertBuyerPayment(payment: gtxn.PaymentTxn): void {
    assertSafePayment(payment, Txn.sender)
    loggedAssert(payment.receiver === Global.currentApplicationAddress, errInvalidPayment)
  }

  private settleAlgo(payment: gtxn.PaymentTxn, appId: Application, marketplace: Account, balanceBefore: uint64, minBefore: uint64): void {
    const legacy = this.isLegacyListing(appId)
    // Get funder info BEFORE purchase call (which deletes the app)
    const { account: receiver, amount } = getFunder(appId)
    const float = this.listingFloat(appId)

    const listing = compileArc4(Listing)
    listing.call.purchase({
      appId,
      args: [
        itxn.payment({
          receiver: appId.address,
          amount: payment.amount,
        }),
        Txn.sender,
        marketplace
      ],
      onCompletion: OnCompleteAction.DeleteApplication,
    })

    this.refundListingFunder(legacy, receiver, amount, float, balanceBefore, minBefore, payment.amount)
  }

  private settleAsa(assetXfer: gtxn.AssetTransferTxn, appId: Application, marketplace: Account, balanceBefore: uint64, minBefore: uint64): void {
    // legacy children compiled purchaseAsa as NoOp: settling would orphan the app, so they must delist + relist
    loggedAssert(!this.isLegacyListing(appId), errLegacyListing)
    // Get funder info BEFORE purchase call (which deletes the app)
    const { account: receiver, amount } = getFunder(appId)
    const float = this.listingFloat(appId)

    const listing = compileArc4(Listing)
    listing.call.purchaseAsa({
      appId,
      args: [
        itxn.assetTransfer({
          assetReceiver: appId.address,
          assetAmount: assetXfer.assetAmount,
          xferAsset: assetXfer.xferAsset,
        }),
        Txn.sender,
        marketplace
      ],
      onCompletion: OnCompleteAction.DeleteApplication,
    })

    this.refundListingFunder(false, receiver, amount, float, balanceBefore, minBefore, 0)
  }

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  create(version: string, childVersion: string, akitaDAO: Application, akitaDAOEscrow: EscrowConfig): void {
    this.version.value = version
    this.childContractVersion.value = childVersion
    this.akitaDAO.value = akitaDAO
    this.akitaDAOEscrow.value = clone(akitaDAOEscrow)
  }

  // LISTING CREATION (shared by the hinted methods and their legacy shims) -------------------------

  /** Body of `list` / `legacyList`: `sellerReferrer` is stored on the child as `seller_referrer`. */
  private listImpl(
    payment: gtxn.PaymentTxn,
    assetXfer: gtxn.AssetTransferTxn,
    price: uint64,
    paymentAsset: uint64, // 0 | Asset
    expiration: uint64,
    reservedFor: Account,
    gateID: uint64,
    marketplace: Account,
    name: string,
    proof: Proof,
    sellerReferrer: Account,
    legacyPayment: boolean,
    maxCreatorRoyalty: uint64
  ): uint64 {
    /** lowest split is 4 */
    loggedAssert(price >= ListingMinimumPrice, errPriceTooLow)
    loggedAssert(this.boxedContract.exists, errContractNotSet)

    // make sure they actually send the asset they want to sell (plain transfer, no clawback/close)
    assertSafeAssetTransfer(assetXfer, Txn.sender)
    loggedAssert(assetXfer.assetReceiver === Global.currentApplicationAddress, errInvalidPayment)
    loggedAssert(assetXfer.assetAmount > 0, errInvalidPayment)
    // settlement closes the whole prize balance to the buyer, so the payment asset must differ
    loggedAssert(paymentAsset !== assetXfer.xferAsset.id, errPrizeIsPaymentAsset)

    const isAlgoPayment = paymentAsset === 0
    const cost = clone(this.listingCost(assetXfer.xferAsset.id, paymentAsset, false))

    // ensure they paid exactly the contract mint + mbr costs (or the legacy amount: the factory floats the gap)
    const float = this.assertListingPayment(payment, cost, isAlgoPayment, false, legacyPayment)

    const creatorRoyalty = royalties(this.akitaDAO.value, assetXfer.xferAsset, name, proof)
    // the royalty is read now, not when the seller signed: the seller bounds what it agreed to
    loggedAssert(creatorRoyalty <= maxCreatorRoyalty, errRoyaltyAboveMax)

    const listing = compileArc4(Listing)

    // mint listing contract
    const listingApp = listing.call
      .create({
        args: [
          assetXfer.xferAsset.id,
          false,
          price,
          paymentAsset,
          expiration,
          Txn.sender,
          // the escrow opt-in is paid to the DAO and never released, so it is not refundable
          { account: payment.sender, amount: payment.amount - cost.escrowOptIn },
          reservedFor,
          creatorRoyalty,
          gateID,
          marketplace,
          this.childContractVersion.value,
          this.akitaDAO.value,
          this.akitaDAOEscrow.value,
          assetXfer.assetAmount,
          sellerReferrer,
          float,
        ],
        // Boxed approval program in up to four 4 KB chunks (AVM 13: up to 16 KB).
        approvalProgram: [
          this.childApprovalChunk(0),
          this.childApprovalChunk(1),
          this.childApprovalChunk(2),
          this.childApprovalChunk(3),
        ],
        clearStateProgram: listing.clearStateProgram,
        extraProgramPages: this.childExtraPagesAtLeast(listing.clearStateProgram.length, listing.extraProgramPages),
      })
      .itxn
      .createdApp

    // Fund child app with base minBalance + disbursement MBR
    itxn
      .payment({
        receiver: listingApp.address,
        amount: Global.minBalance + cost.disbursement
      })
      .submit()

    // optin child contract to sale asset
    listing.call.optin({
      appId: listingApp,
      args: [
        itxn.payment({
          receiver: listingApp.address,
          amount: Global.assetOptInMinBalance,
        }),
        assetXfer.xferAsset.id,
      ],
    })

    // xfer asset to child
    itxn
      .assetTransfer({
        assetReceiver: listingApp.address,
        assetAmount: assetXfer.assetAmount,
        xferAsset: assetXfer.xferAsset,
      })
      .submit()

    if (!isAlgoPayment) {
      // optin child contract to payment asset (exactly one opt-in MBR; the Listing requires it)
      listing.call.optin({
        appId: listingApp,
        args: [
          itxn.payment({
            receiver: listingApp.address,
            amount: Global.assetOptInMinBalance,
          }),
          paymentAsset,
        ],
      })

      // ensure akita escrow is opted into payment asset for fee collection
      if (!this.akitaDAOEscrow.value.app.address.isOptedIn(Asset(paymentAsset))) {
        this.optAkitaEscrowInAndSend(Asset(paymentAsset), 0)
      }
    }

    return listingApp.id
  }

  /** Body of `listPrizeBox` / `legacyListPrizeBox`. */
  private listPrizeBoxImpl(
    prizeBoxTransferTxn: gtxn.ApplicationCallTxn,
    payment: gtxn.PaymentTxn,
    price: uint64,
    paymentAsset: uint64,
    expiration: uint64,
    reservedFor: Account,
    gateID: uint64,
    marketplace: Account,
    sellerReferrer: Account,
    legacyPayment: boolean
  ): uint64 {
    loggedAssert(price >= ListingMinimumPrice, errPriceTooLow)
    loggedAssert(this.boxedContract.exists, errContractNotSet)

    loggedAssert((
      prizeBoxTransferTxn.appArgs(0) === methodSelector<typeof PrizeBox.prototype.transfer>() &&
      prizeBoxTransferTxn.onCompletion === OnCompleteAction.NoOp
    ), errBadMethodPrizeBoxTransferNeeded)
    // the seller must be the one handing the box over in this group
    loggedAssert(prizeBoxTransferTxn.sender === Txn.sender, errNotPrizeBoxOwner)
    loggedAssert(getPrizeBoxOwner(this.akitaDAO.value, prizeBoxTransferTxn.appId) === Global.currentApplicationAddress, errNotPrizeBoxOwner)

    const isAlgoPayment = paymentAsset === 0
    const cost = clone(this.listingCost(0, paymentAsset, true))

    const float = this.assertListingPayment(payment, cost, isAlgoPayment, true, legacyPayment)

    const listing = compileArc4(Listing)

    // mint listing contract
    const listingApp = listing.call
      .create({
        args: [
          prizeBoxTransferTxn.appId.id,
          true,
          price,
          paymentAsset,
          expiration,
          Txn.sender,
          { account: payment.sender, amount: payment.amount - cost.escrowOptIn },
          reservedFor,
          0,
          gateID,
          marketplace,
          this.childContractVersion.value,
          this.akitaDAO.value,
          this.akitaDAOEscrow.value,
          0,
          sellerReferrer,
          float,
        ],
        // Boxed approval program in up to four 4 KB chunks (AVM 13: up to 16 KB).
        approvalProgram: [
          this.childApprovalChunk(0),
          this.childApprovalChunk(1),
          this.childApprovalChunk(2),
          this.childApprovalChunk(3),
        ],
        clearStateProgram: listing.clearStateProgram,
        extraProgramPages: this.childExtraPagesAtLeast(listing.clearStateProgram.length, listing.extraProgramPages),
      })
      .itxn
      .createdApp

    // Fund child app with base minBalance + disbursement MBR
    itxn
      .payment({
        receiver: listingApp.address,
        amount: Global.minBalance + cost.disbursement
      })
      .submit()

    // Transfer prize box ownership to the listing app
    abiCall<typeof PrizeBox.prototype.transfer>({
      appId: prizeBoxTransferTxn.appId,
      args: [listingApp.address],
    })

    if (!isAlgoPayment) {
      // optin child contract to payment asset
      listing.call.optin({
        appId: listingApp,
        args: [
          itxn.payment({
            receiver: listingApp.address,
            amount: Global.assetOptInMinBalance,
          }),
          paymentAsset,
        ],
      })

      // ensure akita escrow is opted into payment asset for fee collection
      if (!this.akitaDAOEscrow.value.app.address.isOptedIn(Asset(paymentAsset))) {
        this.optAkitaEscrowInAndSend(Asset(paymentAsset), 0)
      }
    }

    return listingApp.id
  }

  // MARKETPLACE METHODS --------------------------------------------------------------------------

  /**
   * Opt this factory into a prize asset only. A prize never earns protocol fees, so the DAO revenue
   * escrow does not have to hold it: nothing is registered with the revenue manager, the call does
   * not depend on the escrow's payout phase, and the payer is charged one opt-in.
   *
   * `optIn` stays the route for a payment asset, whose fees the escrow must be able to receive. An
   * asset opted in here can still become a payment asset later: `list` opts the escrow in (and
   * `listCost` charges for it) whenever the escrow does not hold a listing's payment asset.
   */
  optInPrize(payment: gtxn.PaymentTxn, asset: Asset): void {
    loggedAssert(payment.receiver === Global.currentApplicationAddress, errInvalidPayment)
    loggedAssert(payment.amount === Global.assetOptInMinBalance, errInvalidPayment)

    itxn
      .assetTransfer({
        assetReceiver: Global.currentApplicationAddress,
        assetAmount: 0,
        xferAsset: asset,
      })
      .submit()
  }

  /**
   * List an ASA (principal resolution §6.7). `wallet` is the caller's wallet hint (0 = plain account):
   * the verified principal's referrer is fixed on the rev-3 child as `seller_referrer`. The seller is
   * the spender (`Txn.sender`).
   *
   * `maxCreatorRoyalty` is the highest creator royalty the seller accepts (in the units of the
   * listing's `creator_royalty`, 50_000 = 50%). The royalty is resolved from the creator's record
   * when the call runs, so a rate raised after the seller signed reverts the listing (errRamx).
   */
  list(
    payment: gtxn.PaymentTxn,
    assetXfer: gtxn.AssetTransferTxn,
    price: uint64,
    paymentAsset: uint64, // 0 | Asset
    expiration: uint64,
    reservedFor: Account,
    gateID: uint64,
    marketplace: Account,
    name: string,
    proof: Proof,
    wallet: uint64,
    maxCreatorRoyalty: uint64
  ): uint64 {
    const { referrer } = principalOf(this.akitaDAO.value, wallet)
    return this.listImpl(payment, assetXfer, price, paymentAsset, expiration, reservedFor, gateID, marketplace, name, proof, referrer, false, maxCreatorRoyalty)
  }

  /**
   * LEGACY shim, deployed selector `list(pay,axfer,uint64,uint64,uint64,address,uint64,address,string,byte[32][])uint64`.
   * Creates a rev-3 child whose `seller_referrer` is the seller's registry referrer at creation
   * (`legacySellerReferrer`). Also accepts the deployed plugin's ALGO payment (`assertListingPayment`).
   * The deployed selector carries no royalty bound, so the shim keeps the deployed behaviour (the cap only).
   */
  @abimethod({ name: 'list' })
  legacyList(
    payment: gtxn.PaymentTxn,
    assetXfer: gtxn.AssetTransferTxn,
    price: uint64,
    paymentAsset: uint64, // 0 | Asset
    expiration: uint64,
    reservedFor: Account,
    gateID: uint64,
    marketplace: Account,
    name: string,
    proof: Proof
  ): uint64 {
    return this.listImpl(payment, assetXfer, price, paymentAsset, expiration, reservedFor, gateID, marketplace, name, proof, this.legacySellerReferrer(), true, CreatorRoyaltyMaximumSingle)
  }

  /** List a prize box; `wallet` as in `list`. */
  listPrizeBox(
    prizeBoxTransferTxn: gtxn.ApplicationCallTxn,
    payment: gtxn.PaymentTxn,
    price: uint64,
    paymentAsset: uint64,
    expiration: uint64,
    reservedFor: Account,
    gateID: uint64,
    marketplace: Account,
    wallet: uint64
  ): uint64 {
    const { referrer } = principalOf(this.akitaDAO.value, wallet)
    return this.listPrizeBoxImpl(prizeBoxTransferTxn, payment, price, paymentAsset, expiration, reservedFor, gateID, marketplace, referrer, false)
  }

  /** LEGACY shim, deployed selector `listPrizeBox(appl,pay,uint64,uint64,uint64,address,uint64,address)uint64` (see `legacyList`). */
  @abimethod({ name: 'listPrizeBox' })
  legacyListPrizeBox(
    prizeBoxTransferTxn: gtxn.ApplicationCallTxn,
    payment: gtxn.PaymentTxn,
    price: uint64,
    paymentAsset: uint64,
    expiration: uint64,
    reservedFor: Account,
    gateID: uint64,
    marketplace: Account
  ): uint64 {
    return this.listPrizeBoxImpl(prizeBoxTransferTxn, payment, price, paymentAsset, expiration, reservedFor, gateID, marketplace, this.legacySellerReferrer(), true)
  }

  /**
   * Gated ALGO purchase. `gateTxn` must be `Gate.mustCheckFor(ctx, gateID, args)` with `ctx` = the
   * buyer's verified `(principal, wallet, spender)` for hint `wallet` (0 = plain account).
   */
  gatedPurchase(
    payment: gtxn.PaymentTxn,
    gateTxn: gtxn.ApplicationCallTxn,
    appId: Application,
    marketplace: Account,
    wallet: uint64
  ): void {
    const balanceBefore: uint64 = Global.currentApplicationAddress.balance
    const minBefore: uint64 = Global.currentApplicationAddress.minBalance

    this.assertIsListing(appId)
    this.assertGatePassed(gateTxn, appId, wallet)
    this.assertBuyerPayment(payment)

    this.settleAlgo(payment, appId, marketplace, balanceBefore, minBefore)
  }

  /** LEGACY shim, deployed selector `gatedPurchase(pay,appl,uint64,address)void`: registry-origin `Gate.mustCheck`. */
  @abimethod({ name: 'gatedPurchase' })
  legacyGatedPurchase(
    payment: gtxn.PaymentTxn,
    gateTxn: gtxn.ApplicationCallTxn,
    appId: Application,
    marketplace: Account,
  ): void {
    const balanceBefore: uint64 = Global.currentApplicationAddress.balance
    const minBefore: uint64 = Global.currentApplicationAddress.minBalance

    this.assertIsListing(appId)
    this.assertLegacyGatePassed(gateTxn, appId)
    this.assertBuyerPayment(payment)

    this.settleAlgo(payment, appId, marketplace, balanceBefore, minBefore)
  }

  purchase(
    payment: gtxn.PaymentTxn,
    appId: Application,
    marketplace: Account,
  ): void {
    const balanceBefore: uint64 = Global.currentApplicationAddress.balance
    const minBefore: uint64 = Global.currentApplicationAddress.minBalance

    this.assertIsListing(appId)
    this.assertUngated(appId)
    this.assertBuyerPayment(payment)

    this.settleAlgo(payment, appId, marketplace, balanceBefore, minBefore)
  }

  /** Gated ASA purchase; `gateTxn` and `wallet` as in `gatedPurchase`. */
  gatedPurchaseAsa(
    assetXfer: gtxn.AssetTransferTxn,
    gateTxn: gtxn.ApplicationCallTxn,
    appId: Application,
    marketplace: Account,
    wallet: uint64
  ): void {
    const balanceBefore: uint64 = Global.currentApplicationAddress.balance
    const minBefore: uint64 = Global.currentApplicationAddress.minBalance

    this.assertIsListing(appId)
    this.assertGatePassed(gateTxn, appId, wallet)
    this.assertBuyerAsaPayment(assetXfer, appId)

    this.settleAsa(assetXfer, appId, marketplace, balanceBefore, minBefore)
  }

  /** LEGACY shim, deployed selector `gatedPurchaseAsa(axfer,appl,uint64,address)void`: registry-origin `Gate.mustCheck`. */
  @abimethod({ name: 'gatedPurchaseAsa' })
  legacyGatedPurchaseAsa(
    assetXfer: gtxn.AssetTransferTxn,
    gateTxn: gtxn.ApplicationCallTxn,
    appId: Application,
    marketplace: Account,
  ): void {
    const balanceBefore: uint64 = Global.currentApplicationAddress.balance
    const minBefore: uint64 = Global.currentApplicationAddress.minBalance

    this.assertIsListing(appId)
    this.assertLegacyGatePassed(gateTxn, appId)
    this.assertBuyerAsaPayment(assetXfer, appId)

    this.settleAsa(assetXfer, appId, marketplace, balanceBefore, minBefore)
  }

  purchaseAsa(
    assetXfer: gtxn.AssetTransferTxn,
    appId: Application,
    marketplace: Account,
  ): void {
    const balanceBefore: uint64 = Global.currentApplicationAddress.balance
    const minBefore: uint64 = Global.currentApplicationAddress.minBalance

    this.assertIsListing(appId)
    this.assertUngated(appId)
    this.assertBuyerAsaPayment(assetXfer, appId)

    this.settleAsa(assetXfer, appId, marketplace, balanceBefore, minBefore)
  }

  delist(appId: Application): void {
    const balanceBefore: uint64 = Global.currentApplicationAddress.balance
    const minBefore: uint64 = Global.currentApplicationAddress.minBalance

    this.assertIsListing(appId)
    const legacy = this.isLegacyListing(appId)

    // Get funder info BEFORE delist call (which deletes the app)
    const { account: receiver, amount } = getFunder(appId)
    const float = this.listingFloat(appId)

    const listing = compileArc4(Listing)
    listing.call.delist({
      appId,
      args: [Txn.sender],
      onCompletion: OnCompleteAction.DeleteApplication,
    })

    this.refundListingFunder(legacy, receiver, amount, float, balanceBefore, minBefore, 0)
  }

  // READ ONLY METHODS ----------------------------------------------------------------------------

  /**
   * Exact payment `list` (isPrizeBox = false, `prize` = the ASA) or `listPrizeBox`
   * (isPrizeBox = true, `prize` ignored) requires right now. Includes the non-refundable
   * DAO-escrow opt-in for a payment asset the escrow does not hold yet.
   */
  @abimethod({ readonly: true })
  listCost(prize: uint64, paymentAsset: uint64, isPrizeBox: boolean): uint64 {
    return this.listingCost(prize, paymentAsset, isPrizeBox).total
  }
}

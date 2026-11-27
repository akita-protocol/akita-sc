import { Account, Application, Asset, Bytes, clone, contract, Global, gtxn, itxn, loggedAssert, OnCompleteAction, op, uint64 } from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod, compileArc4, methodSelector } from '@algorandfoundation/algorand-typescript/arc4'
import { Txn } from '@algorandfoundation/algorand-typescript/op'
import { classes } from 'polytype'
import { FactoryGlobalStateMaxBytes, FactoryGlobalStateMaxUints, GLOBAL_STATE_KEY_BYTES_COST, GLOBAL_STATE_KEY_UINT_COST } from '../utils/constants'
import { errBadMethodPrizeBoxTransferNeeded, errContractNotSet, errNotPrizeBoxOwner } from '../utils/errors'
import { disbursementCost, getFunder, getNFTFees, getPrizeBoxOwner, legacyWalletOf, principalOf, referrerOrZeroAddress, rewardsOptInCost, royalties } from '../utils/functions'
import { Proof } from '../utils/types/merkles'
import { AuctionGlobalStateKeySeller } from './constants'
import { errBidsMustAlwaysIncrease, errEndMustBeAtleastFiveMinutesAfterStart, errInvalidPayment, errInvalidTransfer, errNotAnAuction, errNotOptedIn, errPrizeIsBidAsset, errPrizeSeizable, errStartingBidRequired, errFeeAuctionNeedsWeights, errWeightsNeedBidFee } from './errors'

// CONTRACT IMPORTS
import type { PrizeBox } from '../prize-box/contract.algo'
import { EscrowConfig } from '../utils/base-contracts/base'
import { FactoryContract } from '../utils/base-contracts/factory'
import { BaseAuction } from './base'
import { Auction } from './contract.algo'


@contract({
  stateTotals: {
    globalBytes: FactoryGlobalStateMaxBytes,
    globalUints: FactoryGlobalStateMaxUints
  }
})
export class AuctionFactory extends classes(BaseAuction, FactoryContract) {

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  create(version: string, childVersion: string, akitaDAO: Application, akitaDAOEscrow: EscrowConfig): void {
    this.version.value = version
    this.childContractVersion.value = childVersion
    this.akitaDAO.value = akitaDAO
    this.akitaDAOEscrow.value = clone(akitaDAOEscrow)
  }

  // PRIVATE METHODS ------------------------------------------------------------------------------

  /**
   * AR-02: fee auctions need a positive starting bid (every bid then carries raffle weight).
   *
   * `weightsListCount` no longer sizes anything: a fee auction's weights storage grows with its
   * bidders, who each pay for their own, so there is no bidder limit to choose and no weights box
   * to reserve. It now only says which kind of auction is being priced, because `newAuctionCost`
   * does not see the bid fee: any value above 0 for a fee auction, whose (empty) totals box the
   * seller funds, and 0 for a zero-fee auction.
   */
  private validateRaffleConfig(bidFee: uint64, startingBid: uint64, weightsListCount: uint64): void {
    if (bidFee > 0) {
      loggedAssert(startingBid > 0, errStartingBidRequired)
      loggedAssert(weightsListCount > 0, errFeeAuctionNeedsWeights)
    } else {
      // only fee auctions send the weights MBR to the child; a zero-fee auction would strand it here
      loggedAssert(weightsListCount === 0, errWeightsNeedBidFee)
    }
  }

  /** the weights storage a seller funds: the totals box of a fee auction, nothing for a zero-fee one */
  private weightsMbr(weightsListCount: uint64): uint64 {
    return weightsListCount > 0 ? this.mbr().weights : 0
  }

  /**
   * The DAO's auction creation fee (`nft_fees.auctionCreationFee`, microAlgos), read on every call.
   * It is charged on top of the storage costs, goes to the DAO escrow and is never refunded.
   */
  private creationFee(): uint64 {
    return getNFTFees(this.akitaDAO.value).auctionCreationFee
  }

  /** Send the creation fee to the DAO escrow (`akitaDAOEscrow`). Nothing is sent for a zero fee. */
  private payCreationFee(fee: uint64): void {
    if (fee > 0) {
      itxn
        .payment({
          receiver: this.akitaDAOEscrow.value.app.address,
          amount: fee,
        })
        .submit()
    }
  }

  // AUCTION FACTORY METHODS ----------------------------------------------------------------------

  /**
   * Creation-time referrer for a LEGACY (old-ABI) creation: today's registry referral of the seller
   * (`Txn.sender`), resolved at creation instead of at settlement (spec §6.6). Delete in Phase 4.
   */
  private legacySellerReferrer(): Account {
    return referrerOrZeroAddress(legacyWalletOf(this.akitaDAO.value, Txn.sender))
  }

  private newAuctionImpl(
    payment: gtxn.PaymentTxn,
    assetXfer: gtxn.AssetTransferTxn,
    name: string,
    proof: Proof,
    bidAssetID: uint64, // 0 | Asset
    bidFee: uint64,
    startingBid: uint64,
    bidMinimumIncrease: uint64,
    startTimestamp: uint64,
    endTimestamp: uint64,
    gateID: uint64,
    marketplace: Account,
    weightsListCount: uint64,
    sellerReferrer: Account
  ): uint64 {
    loggedAssert(bidMinimumIncrease > 0, errBidsMustAlwaysIncrease)
    loggedAssert(endTimestamp > startTimestamp + 300, errEndMustBeAtleastFiveMinutesAfterStart)
    loggedAssert(this.boxedContract.exists, errContractNotSet)
    this.validateRaffleConfig(bidFee, startingBid, weightsListCount)

    const isAlgoBid = bidAssetID === 0

    loggedAssert(isAlgoBid || Global.currentApplicationAddress.isOptedIn(Asset(bidAssetID)), errNotOptedIn)

    const optinMBR: uint64 = Global.assetOptInMinBalance * (isAlgoBid ? 1 : 2)

    const auction = compileArc4(Auction)

    // Worst-case disbursement MBR:
    // 1 for prize transfer (prize asset)
    // 1 for referral payment (in bid asset)
    // 4 for ASA bid payments (marketplace x2, seller, creator) when bid is ASA
    let disbursementMBR: uint64 = disbursementCost(1) + rewardsOptInCost(this.akitaDAO.value, assetXfer.xferAsset.id)
    if (isAlgoBid) {
      disbursementMBR += disbursementCost(1)
    } else {
      disbursementMBR += disbursementCost(5) + rewardsOptInCost(this.akitaDAO.value, bidAssetID)
    }

    const childAppMBR: uint64 = Global.minBalance + optinMBR + this.weightsMbr(weightsListCount) + disbursementMBR
    const totalMBR: uint64 = (
      this.childPagesMbr(auction.clearStateProgram.length) +
      (GLOBAL_STATE_KEY_UINT_COST * auction.globalUints) +
      (GLOBAL_STATE_KEY_BYTES_COST * auction.globalBytes) +
      childAppMBR
    )

    // ensure they paid exactly the creation fee plus the contract mint + mbr costs
    const creationFee = this.creationFee()
    loggedAssert(payment.receiver === Global.currentApplicationAddress, errInvalidPayment)
    loggedAssert(payment.amount === totalMBR + creationFee, errInvalidPayment)

    // make sure they actually sent the asset they want to auction
    loggedAssert(assetXfer.sender === Txn.sender, errInvalidTransfer)
    // AR-11: the prize can't be the bid asset (the prize close-out would sweep every bid)
    loggedAssert(assetXfer.xferAsset.id !== bidAssetID, errPrizeIsBidAsset)
    loggedAssert(assetXfer.assetReceiver === Global.currentApplicationAddress, errInvalidTransfer)
    loggedAssert(assetXfer.assetAmount > 0, errInvalidTransfer)
    loggedAssert(
      assetXfer.xferAsset.clawback === Global.zeroAddress && assetXfer.xferAsset.freeze === Global.zeroAddress,
      errPrizeSeizable
    )

    const creatorRoyalty = royalties(this.akitaDAO.value, assetXfer.xferAsset, name, proof)

    this.payCreationFee(creationFee)

    // the funder's recorded deposit is the storage cost alone: the creation fee is not refundable
    const auctionApp = auction.call
      .create({
        args: [
          assetXfer.xferAsset.id,
          false,
          bidAssetID,
          bidFee,
          startingBid,
          bidMinimumIncrease,
          startTimestamp,
          endTimestamp,
          { account: payment.sender, amount: totalMBR },
          Txn.sender,
          creatorRoyalty,
          gateID,
          marketplace,
          this.childContractVersion.value,
          { akitaDAO: this.akitaDAO.value, akitaDAOEscrow: this.akitaDAOEscrow.value },
          sellerReferrer,
        ],
        // Boxed approval program in up to four 4 KB chunks (AVM 13: up to 16 KB).
        approvalProgram: [
          this.childApprovalChunk(0),
          this.childApprovalChunk(1),
          this.childApprovalChunk(2),
          this.childApprovalChunk(3),
        ],
        clearStateProgram: auction.clearStateProgram,
        extraProgramPages: this.childExtraPages(auction.clearStateProgram.length)
      })
      .itxn
      .createdApp

    // Fund child app with base minBalance + disbursement MBR
    itxn
      .payment({
        receiver: auctionApp.address,
        amount: Global.minBalance + disbursementMBR
      })
      .submit()

    // optin child contract to asset (we can use the AuctionBase)
    auction.call.optin({
      appId: auctionApp,
      args: [
        itxn.payment({
          receiver: auctionApp.address,
          amount: Global.assetOptInMinBalance
        }),
        assetXfer.xferAsset.id,
      ]
    })

    // xfer asset to child
    itxn
      .assetTransfer({
        assetReceiver: auctionApp.address,
        assetAmount: assetXfer.assetAmount,
        xferAsset: assetXfer.xferAsset
      })
      .submit()

    if (!isAlgoBid) {
      // optin child contract to bidding asset
      auction.call.optin({
        appId: auctionApp,
        args: [
          itxn.payment({
            receiver: auctionApp.address,
            amount: Global.assetOptInMinBalance
          }),
          bidAssetID,
        ]
      })
    }

    // Only call init when there's a raffle (bidFee > 0) since it sets up weight boxes
    if (bidFee > 0) {
      // the totals box only (base and optIn MBR already sent above)
      const weightsMBR: uint64 = this.weightsMbr(weightsListCount)
      auction.call.init({
        appId: auctionApp.id,
        args: [
          itxn.payment({
            receiver: Application(auctionApp.id).address,
            amount: weightsMBR
          }),
          weightsListCount,
        ]
      })
    }

    return auctionApp.id
  }

  /**
   * New ASA-prize auction (principal ABI, spec §6.6). The seller stays `Txn.sender`; `wallet` is the
   * seller's wallet hint (0 = acting as itself; a plugin passes `windowHint(wallet)`), verified here
   * (invalid hints revert), and its referrer is stored in the child as `seller_referrer`, which the
   * child pays at settlement. The +50,000 µA global is part of `newAuctionCost`, and so is the DAO's
   * auction creation fee.
   */
  newAuction(
    payment: gtxn.PaymentTxn,
    assetXfer: gtxn.AssetTransferTxn,
    name: string,
    proof: Proof,
    bidAssetID: uint64, // 0 | Asset
    bidFee: uint64,
    startingBid: uint64,
    bidMinimumIncrease: uint64,
    startTimestamp: uint64,
    endTimestamp: uint64,
    gateID: uint64,
    marketplace: Account,
    weightsListCount: uint64,
    wallet: uint64
  ): uint64 {
    const sellerReferrer = principalOf(this.akitaDAO.value, wallet).referrer
    return this.newAuctionImpl(
      payment, assetXfer, name, proof, bidAssetID, bidFee, startingBid, bidMinimumIncrease,
      startTimestamp, endTimestamp, gateID, marketplace, weightsListCount, sellerReferrer
    )
  }

  /**
   * LEGACY shim (spec §7.2; delete in Phase 4): the pre-principal `newAuction(...)uint64` selector.
   * The child gets `seller_referrer` = the seller's registry referrer, resolved at creation.
   */
  @abimethod({ name: 'newAuction' })
  legacyNewAuction(
    payment: gtxn.PaymentTxn,
    assetXfer: gtxn.AssetTransferTxn,
    name: string,
    proof: Proof,
    bidAssetID: uint64, // 0 | Asset
    bidFee: uint64,
    startingBid: uint64,
    bidMinimumIncrease: uint64,
    startTimestamp: uint64,
    endTimestamp: uint64,
    gateID: uint64,
    marketplace: Account,
    weightsListCount: uint64
  ): uint64 {
    return this.newAuctionImpl(
      payment, assetXfer, name, proof, bidAssetID, bidFee, startingBid, bidMinimumIncrease,
      startTimestamp, endTimestamp, gateID, marketplace, weightsListCount, this.legacySellerReferrer()
    )
  }

  /** New prize-box auction (principal ABI, spec §6.6); see `newAuction`. */
  newPrizeBoxAuction(
    prizeBoxTransferTxn: gtxn.ApplicationCallTxn,
    payment: gtxn.PaymentTxn,
    bidAssetID: uint64, // 0 | Asset
    bidFee: uint64,
    startingBid: uint64,
    bidMinimumIncrease: uint64,
    startTimestamp: uint64,
    endTimestamp: uint64,
    gateID: uint64,
    marketplace: Account,
    weightsListCount: uint64,
    wallet: uint64
  ): uint64 {
    const sellerReferrer = principalOf(this.akitaDAO.value, wallet).referrer
    return this.newPrizeBoxAuctionImpl(
      prizeBoxTransferTxn, payment, bidAssetID, bidFee, startingBid, bidMinimumIncrease,
      startTimestamp, endTimestamp, gateID, marketplace, weightsListCount, sellerReferrer
    )
  }

  /** LEGACY shim of the pre-principal `newPrizeBoxAuction(...)uint64` (registry referrer at creation). */
  @abimethod({ name: 'newPrizeBoxAuction' })
  legacyNewPrizeBoxAuction(
    prizeBoxTransferTxn: gtxn.ApplicationCallTxn,
    payment: gtxn.PaymentTxn,
    bidAssetID: uint64, // 0 | Asset
    bidFee: uint64,
    startingBid: uint64,
    bidMinimumIncrease: uint64,
    startTimestamp: uint64,
    endTimestamp: uint64,
    gateID: uint64,
    marketplace: Account,
    weightsListCount: uint64
  ): uint64 {
    return this.newPrizeBoxAuctionImpl(
      prizeBoxTransferTxn, payment, bidAssetID, bidFee, startingBid, bidMinimumIncrease,
      startTimestamp, endTimestamp, gateID, marketplace, weightsListCount, this.legacySellerReferrer()
    )
  }

  private newPrizeBoxAuctionImpl(
    prizeBoxTransferTxn: gtxn.ApplicationCallTxn,
    payment: gtxn.PaymentTxn,
    bidAssetID: uint64, // 0 | Asset
    bidFee: uint64,
    startingBid: uint64,
    bidMinimumIncrease: uint64,
    startTimestamp: uint64,
    endTimestamp: uint64,
    gateID: uint64,
    marketplace: Account,
    weightsListCount: uint64,
    sellerReferrer: Account
  ): uint64 {
    
    loggedAssert((
      prizeBoxTransferTxn.appArgs(0) === methodSelector<typeof PrizeBox.prototype.transfer>() &&
      prizeBoxTransferTxn.onCompletion === OnCompleteAction.NoOp
    ), errBadMethodPrizeBoxTransferNeeded)
    loggedAssert(getPrizeBoxOwner(this.akitaDAO.value, prizeBoxTransferTxn.appId) === Global.currentApplicationAddress, errNotPrizeBoxOwner)
    loggedAssert(bidMinimumIncrease > 0, errBidsMustAlwaysIncrease)
    loggedAssert(endTimestamp > startTimestamp + 300, errEndMustBeAtleastFiveMinutesAfterStart)
    loggedAssert(this.boxedContract.exists, errContractNotSet)
    this.validateRaffleConfig(bidFee, startingBid, weightsListCount)

    const isAlgoBid = bidAssetID === 0
    // the child closes its bid asset to this factory when it is cancelled or deleted
    loggedAssert(isAlgoBid || Global.currentApplicationAddress.isOptedIn(Asset(bidAssetID)), errNotOptedIn)
    const optinMBR: uint64 = isAlgoBid ? 0 : Global.assetOptInMinBalance

    const auction = compileArc4(Auction)

    // Worst-case disbursement MBR for prize box auction:
    // No prize disbursement (prize box transfer, not ASA)
    // 1 for referral payment (in bid asset)
    // ASA bid payments (marketplace x2, seller) when bid is ASA — no creator royalty for prize boxes
    let disbursementMBR: uint64 = 0
    if (isAlgoBid) {
      disbursementMBR = disbursementCost(1)
    } else {
      disbursementMBR = disbursementCost(4) + rewardsOptInCost(this.akitaDAO.value, bidAssetID)
    }

    const childAppMBR: uint64 = Global.minBalance + optinMBR + this.weightsMbr(weightsListCount) + disbursementMBR
    const totalMBR: uint64 = (
      this.childPagesMbr(auction.clearStateProgram.length) +
      (GLOBAL_STATE_KEY_UINT_COST * auction.globalUints) +
      (GLOBAL_STATE_KEY_BYTES_COST * auction.globalBytes) +
      childAppMBR
    )

    // ensure they paid exactly the creation fee plus the contract mint + mbr costs
    const creationFee = this.creationFee()
    loggedAssert(payment.receiver === Global.currentApplicationAddress, errInvalidPayment)
    loggedAssert(payment.amount === totalMBR + creationFee, errInvalidPayment)

    const creatorRoyalty = royalties(this.akitaDAO.value, Asset(0), '', [])

    this.payCreationFee(creationFee)

    // the funder's recorded deposit is the storage cost alone: the creation fee is not refundable
    const auctionApp = auction.call
      .create({
        args: [
          prizeBoxTransferTxn.appId.id,
          true,
          bidAssetID,
          bidFee,
          startingBid,
          bidMinimumIncrease,
          startTimestamp,
          endTimestamp,
          { account: payment.sender, amount: totalMBR },
          Txn.sender,
          creatorRoyalty,
          gateID,
          marketplace,
          this.childContractVersion.value,
          { akitaDAO: this.akitaDAO.value, akitaDAOEscrow: this.akitaDAOEscrow.value },
          sellerReferrer,
        ],
        // Boxed approval program in up to four 4 KB chunks (AVM 13: up to 16 KB).
        approvalProgram: [
          this.childApprovalChunk(0),
          this.childApprovalChunk(1),
          this.childApprovalChunk(2),
          this.childApprovalChunk(3),
        ],
        clearStateProgram: auction.clearStateProgram,
        extraProgramPages: this.childExtraPages(auction.clearStateProgram.length)
      })
      .itxn
      .createdApp

    abiCall<typeof PrizeBox.prototype.transfer>({
      appId: prizeBoxTransferTxn.appId,
      args: [auctionApp.address]
    })

    // Fund child app with base minBalance + disbursement MBR
    itxn
      .payment({
        receiver: auctionApp.address,
        amount: Global.minBalance + disbursementMBR
      })
      .submit()

    if (!isAlgoBid) {
      // optin child contract to bidding asset
      auction.call.optin({
        appId: auctionApp,
        args: [
          itxn.payment({
            receiver: auctionApp.address,
            amount: Global.assetOptInMinBalance
          }),
          bidAssetID,
        ]
      })
    }

    // Only call init when there's a raffle (bidFee > 0) since it sets up weight boxes
    if (bidFee > 0) {
      const weightsMBR: uint64 = this.weightsMbr(weightsListCount)
      auction.call.init({
        appId: auctionApp.id,
        args: [
          itxn.payment({
            receiver: Application(auctionApp.id).address,
            amount: weightsMBR
          }),
          weightsListCount,
        ]
      })
    }

    return auctionApp.id
  }

  deleteAuctionApp(appId: Application): void {
    loggedAssert(appId.creator === Global.currentApplicationAddress, errNotAnAuction)
    const seller = Account(op.AppGlobal.getExBytes(appId, Bytes(AuctionGlobalStateKeySeller))[0])
    loggedAssert(seller === Txn.sender, errNotPrizeBoxOwner)

    // AR-13: refund exactly what the deletion released back to the factory
    const balanceBefore: uint64 = Global.currentApplicationAddress.balance
    const minBefore: uint64 = Global.currentApplicationAddress.minBalance
    const { account: receiver, amount } = getFunder(appId)

    const auction = compileArc4(Auction)

    auction.call.deleteApplication({ appId })

    this.refundReleased(receiver, amount, balanceBefore, minBefore, 0)
  }

  cancelAuction(appId: Application): void {
    loggedAssert(appId.creator === Global.currentApplicationAddress, errNotAnAuction)
    const seller = Account(op.AppGlobal.getExBytes(appId, Bytes(AuctionGlobalStateKeySeller))[0])
    loggedAssert(seller === Txn.sender, errNotPrizeBoxOwner)

    // AR-13: refund exactly what the cancellation released back to the factory
    const balanceBefore: uint64 = Global.currentApplicationAddress.balance
    const minBefore: uint64 = Global.currentApplicationAddress.minBalance
    const { account: receiver, amount } = getFunder(appId)

    const auction = compileArc4(Auction)

    auction.call.cancel({ appId })

    this.refundReleased(receiver, amount, balanceBefore, minBefore, 0)
  }

  /**
   * exact ALGO payment `newAuction` / `newPrizeBoxAuction` require: the DAO's auction creation fee
   * plus the storage costs of the child. Only the storage part is the funder's refundable deposit.
   */
  @abimethod({ readonly: true })
  newAuctionCost(isPrizeBox: boolean, bidAssetID: uint64, prizeAssetID: uint64, weightsListCount: uint64): uint64 {

    const isAlgoBid = bidAssetID === 0
    const optinMBR: uint64 = Global.assetOptInMinBalance * (isPrizeBox ? (isAlgoBid ? 0 : 1) : (isAlgoBid ? 1 : 2))

    const auction = compileArc4(Auction)

    // 1 referral (in bid asset) + prize + ASA bid payments
    let disbursementMBR: uint64 = 0
    if (!isPrizeBox) {
      disbursementMBR += disbursementCost(1) + rewardsOptInCost(this.akitaDAO.value, prizeAssetID)
      if (isAlgoBid) {
        disbursementMBR += disbursementCost(1)
      } else {
        disbursementMBR += disbursementCost(5) + rewardsOptInCost(this.akitaDAO.value, bidAssetID)
      }
    } else if (isAlgoBid) {
      disbursementMBR = disbursementCost(1)
    } else {
      disbursementMBR = disbursementCost(4) + rewardsOptInCost(this.akitaDAO.value, bidAssetID)
    }

    const childAppMBR: uint64 = Global.minBalance + optinMBR + this.weightsMbr(weightsListCount) + disbursementMBR
    const totalMBR: uint64 = (
      this.childPagesMbr(auction.clearStateProgram.length) +
      (GLOBAL_STATE_KEY_UINT_COST * auction.globalUints) +
      (GLOBAL_STATE_KEY_BYTES_COST * auction.globalBytes) +
      childAppMBR
    )

    return totalMBR + this.creationFee()
  }
}

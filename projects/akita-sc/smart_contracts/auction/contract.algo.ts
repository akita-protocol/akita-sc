import { Account, Asset, BoxMap, bytes, clone, ensureBudget, Global, GlobalState, gtxn, itxn, loggedAssert, op, Txn, uint64 } from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod, StaticArray, Uint128, Uint64 } from '@algorandfoundation/algorand-typescript/arc4'
import { classes } from 'polytype'
import { errHasGate } from '../social/errors'
import { MAX_UINT64 } from '../utils/constants'
import { assertPlainPayment, assertSafeAssetTransfer, calcPercent, createInstantDisbursement, recordPayer, releaseDeposit, sponsorCost, gateCheck, gateCheckCtx, getNFTFees, getOtherAppList, getUserImpact, legacyWalletOf, impactRange, legacyOriginOrTxnSender, principalOf, sendReferralPaymentTo } from '../utils/functions'
import { gateCtx } from '../utils/principal'
import { pcg64Init, pcg64Random } from '../utils/types/lib_pcg/pcg64.algo'
import { FunderInfo } from '../utils/types/mbr'
import { RoyaltyAmounts } from '../utils/types/royalties'
import { AuctionBoxPrefixBids, AuctionBoxPrefixBidsByAddress, AuctionBoxPrefixLocations, AuctionBoxPrefixWeights, AuctionGlobalStateKeyBidAsset, AuctionGlobalStateKeyBidFee, AuctionGlobalStateKeyBidID, AuctionGlobalStateKeyBidMinimumIncrease, AuctionGlobalStateKeyBidTotal, AuctionGlobalStateKeyCreatorRoyalty, AuctionGlobalStateKeyEndTimestamp, AuctionGlobalStateKeyFindWinnerCursors, AuctionGlobalStateKeyGateID, AuctionGlobalStateKeyHighestBid, AuctionGlobalStateKeyIsPrizeBox, AuctionGlobalStateKeyMarketplace, AuctionGlobalStateKeyMarketplaceRoyalties, AuctionGlobalStateKeyPrize, AuctionGlobalStateKeyPrizeClaimed, AuctionGlobalStateKeyRaffleAmount, AuctionGlobalStateKeyRafflePrizeClaimed, AuctionGlobalStateKeyRaffleRound, AuctionGlobalStateKeyRaffleWinner, AuctionGlobalStateKeyRefundCount, AuctionGlobalStateKeyRefundMBRCursor, AuctionGlobalStateKeySalt, AuctionGlobalStateKeySeller, AuctionGlobalStateKeySellerReferrer, AuctionGlobalStateKeyStartingBid, AuctionGlobalStateKeyStartTimestamp, AuctionGlobalStateKeyUniqueAddressCount, AuctionGlobalStateKeyVRFFailureCount, AuctionGlobalStateKeyWeightedBidTotal, AuctionGlobalStateKeyWeightsBoxCount, AuctionGlobalStateKeyWeightTotals, AuctionGlobalStateKeyWinningTicket, BEACON_LAG_ROUNDS, BEACON_MAX_WAIT_ROUNDS, BEACON_ROUND_INTERVAL, ChunkSize, DRAW_DELAY_ROUNDS, MaxWeightsBoxes, SNIPE_EXTENSION, SNIPE_RANGE } from './constants'
import { errAllRefundsComplete, errAuctionAlreadyStarted, errBeaconNotReady, errCannotOutbidSelf, errTooManyWeightsBoxes, errAuctionHasNotEnded, errAuctionNotLive, errBidAlreadyRefunded, errBidNotFound, errCannotRefundMostRecentBid, errFailedGate, errInvalidApp, errInvalidAsset, errInvalidPayment, errInvalidTransfer, errMustAllocateAtLeastThreeHighestBidsChunks, errMustBeCalledFromFactory, errNotAllRefundsComplete, errNotApplicableToThisAuction, errNotEnoughTime, errPrizeAlreadyClaimed, errPrizeNotClaimed, errRaffleAlreadyPrizeClaimed, errRaffleNotPrizeClaimed, errRaffleWinnerHasNotClaimed, errStillHasHighestBidsBoxes, errTooManyParticipants, errWinnerAlreadyDrawn, errWinnerAlreadyFound, errWinnerNotFound, errWinningNumberNotFound } from './errors'
import { BidInfo, FindWinnerCursors, WeightLocation, WeightsList } from './types'

// CONTRACT IMPORTS
import type { PrizeBox } from '../prize-box/contract.algo'
import { AkitaBaseFeeGeneratorContract, AkitaConfig } from '../utils/base-contracts/base'
import { ChildContract } from '../utils/base-contracts/child'
import { ContractWithCreatorOnlyOptIn } from '../utils/base-contracts/optin'
import type { RandomnessBeacon } from '../utils/types/randomness-beacon'
import { BaseAuction } from './base'


export class Auction extends classes(
  BaseAuction,
  AkitaBaseFeeGeneratorContract,
  ContractWithCreatorOnlyOptIn,
  ChildContract
) {

  // GLOBAL STATE ---------------------------------------------------------------------------------

  /** the asset up for auction */
  prize = GlobalState<uint64>({ key: AuctionGlobalStateKeyPrize })
  /** whether or not the prize is an asset or a prize box */
  isPrizeBox = GlobalState<boolean>({ key: AuctionGlobalStateKeyIsPrizeBox })
  /** whether the prize has been claimed */
  prizeClaimed = GlobalState<boolean>({ key: AuctionGlobalStateKeyPrizeClaimed })
  /** the asset that is being used for bidding in the auction */
  bidAsset = GlobalState<Asset>({ key: AuctionGlobalStateKeyBidAsset })
  /** the percentage fee to take for the raffle on each bid in hundreds to support two decimals */
  bidFee = GlobalState<uint64>({ key: AuctionGlobalStateKeyBidFee })
  /** the starting amount to begin bids at */
  startingBid = GlobalState<uint64>({ key: AuctionGlobalStateKeyStartingBid })
  /** the smallest amount each new bid need increment the auction price */
  bidMinimumIncrease = GlobalState<uint64>({ key: AuctionGlobalStateKeyBidMinimumIncrease })
  /** the unix time that the auction starts on */
  startTimestamp = GlobalState<uint64>({ key: AuctionGlobalStateKeyStartTimestamp })
  /** the round that the auction ends on */
  endTimestamp = GlobalState<uint64>({ key: AuctionGlobalStateKeyEndTimestamp })
  /** the address selling the asset */
  seller = GlobalState<Account>({ key: AuctionGlobalStateKeySeller })
  /** the royalty percentage the creator will get for the auction */
  creatorRoyalty = GlobalState<uint64>({ key: AuctionGlobalStateKeyCreatorRoyalty })
  /**
   * The address of the marketplace that created the auction to send the fee to
   *
   * IMPORTANT: this is a double sided marketplace fee contract
   * the marketplace referred to internally in the contract
   * is the listing side marketplace.
   * the buyer side marketplace provides their address at
   * the time of purchase
   */
  marketplace = GlobalState<Account>({ key: AuctionGlobalStateKeyMarketplace })
  /** the royalty percentage each side of the market will take for the auction  */
  marketplaceRoyalties = GlobalState<uint64>({ key: AuctionGlobalStateKeyMarketplaceRoyalties })
  /** the gate ID to use to check if the user is qualified to bid in the auction */
  gateID = GlobalState<uint64>({ key: AuctionGlobalStateKeyGateID })
  /** counter for how many times we've failed to get rng from the beacon */
  vrfFailureCount = GlobalState<uint64>({ initialValue: 0, key: AuctionGlobalStateKeyVRFFailureCount })
  /** the number of bids that have been refunded */
  refundCount = GlobalState<uint64>({ initialValue: 0, key: AuctionGlobalStateKeyRefundCount })
  /** the total sum of all bids */
  bidTotal = GlobalState<Uint128>({ key: AuctionGlobalStateKeyBidTotal })
  /** the total sum of all highest bids */
  weightedBidTotal = GlobalState<uint64>({ initialValue: 0, key: AuctionGlobalStateKeyWeightedBidTotal })
  /** highest bid the contract has received thus far */
  highestBid = GlobalState<uint64>({ initialValue: 0, key: AuctionGlobalStateKeyHighestBid })
  /** the id or index of the last bid */
  bidID = GlobalState<uint64>({ initialValue: 1, key: AuctionGlobalStateKeyBidID })
  /** the total amount collected for the loser raffle */
  raffleAmount = GlobalState<uint64>({ initialValue: 0, key: AuctionGlobalStateKeyRaffleAmount })
  /** whether the raffle winner has claimed their prize */
  rafflePrizeClaimed = GlobalState<boolean>({ initialValue: false, key: AuctionGlobalStateKeyRafflePrizeClaimed })
  /**
   * we count how many unique addresses bid so we can
   * properly get each bids % of the total bid amount
   */
  uniqueAddressCount = GlobalState<uint64>({ initialValue: 0, key: AuctionGlobalStateKeyUniqueAddressCount })
  /** the number of boxes allocated to tracking weights */
  weightsBoxCount = GlobalState<uint64>({ initialValue: 0, key: AuctionGlobalStateKeyWeightsBoxCount })
  /** totals for each box of weights for our skip list */
  weightTotals = GlobalState<StaticArray<Uint64, 15>>({ key: AuctionGlobalStateKeyWeightTotals })
  /**
   * cursors to track iteration of finding winner
   * index being for the bid iteration
   * amountIndex being the index for the amount of the bids seen
   */
  findWinnerCursors = GlobalState<FindWinnerCursors>({ key: AuctionGlobalStateKeyFindWinnerCursors })
  /** cursor to track iteration of MBR refunds */
  refundMBRCursor = GlobalState<uint64>({ initialValue: 1, key: AuctionGlobalStateKeyRefundMBRCursor })
  /**
   * we get the winning number from the randomness beacon
   * after the auction ends & we have ran findWinner
   * to compile our list
   */
  winningTicket = GlobalState<uint64>({ initialValue: 0, key: AuctionGlobalStateKeyWinningTicket })
  /** the winning address of the raffle */
  raffleWinner = GlobalState<Account>({ key: AuctionGlobalStateKeyRaffleWinner })
  /** salt for randomness */
  salt = GlobalState<bytes<32>>({ key: AuctionGlobalStateKeySalt })
  /**
   * the round captured when raffle() is first called after auction ends
   * used for VRF since round times are dynamic and we need a deterministic round
   */
  raffleRound = GlobalState<uint64>({ initialValue: 0, key: AuctionGlobalStateKeyRaffleRound })
  /**
   * Referrer of the seller's verified wallet, resolved once by the factory at creation (zero if
   * none) and paid at settlement (spec §6.6). Plugins read its EXISTENCE as the marker of this
   * child's principal ABI; children created before it keep registry semantics until they settle.
   */
  sellerReferrer = GlobalState<Account>({ key: AuctionGlobalStateKeySellerReferrer })

  // BOXES ----------------------------------------------------------------------------------------

  /** the list of bids in the auction */
  bids = BoxMap<uint64, BidInfo>({ keyPrefix: AuctionBoxPrefixBids })
  /** weights set for bidders */
  weights = BoxMap<uint64, WeightsList>({ keyPrefix: AuctionBoxPrefixWeights })
  /**
   * when we run our raffle we need to transform
   * our list of bids into an address based box
   */
  bidsByAddress = BoxMap<Account, WeightLocation>({ keyPrefix: AuctionBoxPrefixBidsByAddress })
  /**
   * the addresses associated with highest bid locations
   */
  locations = BoxMap<uint64, Account>({ keyPrefix: AuctionBoxPrefixLocations })

  // PRIVATE METHODS ------------------------------------------------------------------------------

  private newBidID(): uint64 {
    const id = this.bidID.value
    this.bidID.value += 1
    return id
  }

  private setNewBid(id: uint64, bidAmount: uint64, marketplace: Account): void {
    this.bids(id).value = {
      account: Txn.sender,
      amount: bidAmount,
      refunded: false,
      marketplace,
    }

    if (this.bidFee.value > 0) {
      if (this.bidsByAddress(Txn.sender).exists) {
        const loc = this.bidsByAddress(Txn.sender).value
        const lastBid = this.weights(loc / ChunkSize).value[loc % ChunkSize].asUint64()
        const difference: uint64 = bidAmount - lastBid
        const lastWeightedTotal = this.weightTotals.value[loc / ChunkSize].asUint64()

        this.weightedBidTotal.value += difference
        this.weights(loc / ChunkSize).value[loc % ChunkSize] = new Uint64(bidAmount)
        this.weightTotals.value[loc / ChunkSize] = new Uint64(lastWeightedTotal + difference)
      } else {
        const loc = this.uniqueAddressCount.value
        loggedAssert(loc < ChunkSize * this.weightsBoxCount.value, errTooManyParticipants)
        const lastWeightedTotal = this.weightTotals.value[loc / ChunkSize].asUint64()

        this.weightedBidTotal.value += bidAmount
        this.bidsByAddress(Txn.sender).value = loc
        this.weights(loc / ChunkSize).value[loc % ChunkSize] = new Uint64(bidAmount)
        this.weightTotals.value[loc / ChunkSize] = new Uint64(lastWeightedTotal + bidAmount)
        this.locations(loc).value = Txn.sender
        this.uniqueAddressCount.value += 1
      }
    } else if (!this.bidsByAddress(Txn.sender).exists) {
      // Track participation even without bid fee (for hasBid read method)
      this.bidsByAddress(Txn.sender).value = 0
    }
  }

  private getBidFee(amount: uint64): uint64 {
    const fee = calcPercent(amount, this.bidFee.value)
    if (fee === 0 && this.bidFee.value > 0 && amount > 0) {
      return 1
    }
    return fee
  }

  private getAmounts(amount: uint64): RoyaltyAmounts {

    let creatorAmount: uint64 = 0
    if (this.creatorRoyalty.value > 0) {
      creatorAmount = calcPercent(amount, this.creatorRoyalty.value)
      if (creatorAmount === 0 && this.creatorRoyalty.value > 0 && amount > 0) {
        creatorAmount = 1
      }
    }

    const { auctionSaleImpactTaxMin: min, auctionSaleImpactTaxMax: max } = getNFTFees(this.akitaDAO.value)
    let akitaAmount: uint64 = 0
    let akitaTaxRate: uint64 = 0
    if (max > 0) {
      const impact = getUserImpact(this.akitaDAO.value, this.seller.value)
      akitaTaxRate = impactRange(impact, min, max)

      akitaAmount = calcPercent(amount, akitaTaxRate)
      if (akitaAmount === 0 && amount > 0) {
        akitaAmount = 1
      }
    }

    let marketplaceAmount: uint64 = 0
    if (this.marketplaceRoyalties.value > 0) {
      marketplaceAmount = calcPercent(amount, this.marketplaceRoyalties.value)
      if (marketplaceAmount === 0 && this.marketplaceRoyalties.value > 0 && amount > 0) {
        marketplaceAmount = 1
      }
    }

    // tiny amounts: the 1-unit minimums can exceed the amount (seller underflow would block
    // settlement forever), so fall back to plain proportional amounts
    if (creatorAmount + akitaAmount + (2 * marketplaceAmount) > amount) {
      creatorAmount = calcPercent(amount, this.creatorRoyalty.value)
      akitaAmount = calcPercent(amount, akitaTaxRate)
      marketplaceAmount = calcPercent(amount, this.marketplaceRoyalties.value)
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

    const prizeAmount = op.AssetHolding.assetBalance(Global.currentApplicationAddress, this.prize.value)[0]

    if (buyer.isOptedIn(Asset(this.prize.value))) {
      itxn
        .assetTransfer({
          assetCloseTo: buyer,
          xferAsset: this.prize.value,
        })
        .submit()
    } else {
      createInstantDisbursement(
        this.akitaDAO.value,
        this.prize.value,
        0,
        MAX_UINT64,
        [{ address: buyer, amount: prizeAmount }],
        prizeAmount,
        true,
        Global.zeroAddress
      )
    }
  }

  /** ALGO-bid settlement (the bid asset is ALGO, so `sendBidAsset` sends payments) */
  private completeAlgoPayments(amount: uint64, buySideMarketplace: Account): void {
    // get the royalty payment amounts
    const { creator, akita, marketplace, seller } = this.getAmounts(amount)
    // we dont pay royalties on prize boxes, creator fees roll into akita fee in those cases
    const akitaAmount: uint64 = this.isPrizeBox.value ? (akita + creator) : akita 

    // AR-10 / principal §6.6: the referral cut goes to the seller's creation-time verified referrer
    let leftover: uint64 = akitaAmount;
    if (akitaAmount > 0) {
      ({ leftover } = sendReferralPaymentTo(this.akitaDAO.value, this.sellerReferrer.value, 0, akitaAmount, this.akitaDAOEscrow.value.app.address))
    }

    this.sendToAkitaEscrow(this.bidAsset.value, leftover)

    // pay listing marketplace
    this.sendBidAsset(this.marketplace.value, marketplace)

    // pay buying marketplace
    this.sendBidAsset(buySideMarketplace, marketplace)

    // pay seller
    this.sendBidAsset(this.seller.value, seller)

    // pay royalties
    if (!this.isPrizeBox.value) {
      this.sendBidAsset(Asset(this.prize.value).creator, creator)
    }
  }

  /**
   * A closed (empty) account cannot receive an ALGO payment below the minimum balance. Such a payment
   * is skipped: the amount stays here and leaves with the rest of the account when the auction is
   * deleted, so one closed account never blocks the settlement, the refunds after it or the delete.
   */
  private canReceiveAlgo(receiver: Account, amount: uint64): boolean {
    const [balance] = op.AcctParams.acctBalance(receiver)
    return balance > 0 || amount >= Global.minBalance
  }

  /**
   * pays `amount` of the bid asset (ALGO payment or ASA transfer) to `receiver`, skipping ALGO a
   * closed account cannot take
   */
  private sendBidAsset(receiver: Account, amount: uint64): void {
    if (this.bidAsset.value.id === 0) {
      if (this.canReceiveAlgo(receiver, amount)) {
        itxn.payment({ receiver, amount }).submit()
      }
    } else {
      itxn
        .assetTransfer({
          assetReceiver: receiver,
          assetAmount: amount,
          xferAsset: this.bidAsset.value,
        })
        .submit()
    }
  }

  /**
   * pays `amount` of the bid asset directly when `receiver` can hold it, otherwise through a
   * rewards disbursement; returns the disbursement's MBR cost (0 for a direct payment)
   */
  private sendBidAssetOrDisburse(receiver: Account, amount: uint64): uint64 {
    if (this.bidAsset.value.id === 0 || receiver.isOptedIn(this.bidAsset.value)) {
      this.sendBidAsset(receiver, amount)
      return 0
    }
    return createInstantDisbursement(
      this.akitaDAO.value,
      this.bidAsset.value.id,
      0,
      MAX_UINT64,
      [{ address: receiver, amount }],
      amount,
      false,
      Global.zeroAddress
    ).cost
  }

  private completeAsaPayments(amount: uint64, buySideMarketplace: Account): void {
    // get the royalty payment amounts
    const { creator, akita, marketplace, seller } = this.getAmounts(amount)
    // we dont pay royalties on prize boxes, creator fees roll into akita fee in those cases
    const akitaAmount: uint64 = this.isPrizeBox.value ? (akita + creator) : akita 

    // AR-10 / principal §6.6: the referral cut goes to the seller's creation-time verified referrer
    let leftover: uint64 = akitaAmount;
    if (akitaAmount > 0) {
      ({ leftover } = sendReferralPaymentTo(this.akitaDAO.value, this.sellerReferrer.value, this.bidAsset.value.id, akitaAmount, this.akitaDAOEscrow.value.app.address))
    }

    // AR-06: protocol fee goes to the DAO revenue escrow (never the DAO app account)
    this.sendToAkitaEscrow(this.bidAsset.value, leftover)

    // pay listing marketplace
    this.sendBidAssetOrDisburse(this.marketplace.value, marketplace)

    // pay buying marketplace
    this.sendBidAssetOrDisburse(buySideMarketplace, marketplace)

    // pay seller
    this.sendBidAssetOrDisburse(this.seller.value, seller)

    // pay royalties
    if (!this.isPrizeBox.value) {
      this.sendBidAssetOrDisburse(Asset(this.prize.value).creator, creator)
    }
  }

  /**
   * AR-08: skip whole weights boxes only while the cursor sits on a box boundary,
   * using the totals of the box the cursor is actually in.
   */
  private getWinnerWeightBoxInfo(): [uint64, uint64] {
    let startingIndex = this.findWinnerCursors.value.startingIndex
    let currentRangeStart = this.findWinnerCursors.value.currentRangeStart

    while (startingIndex % ChunkSize === 0 && startingIndex / ChunkSize < this.weightsBoxCount.value) {
      const boxStake = this.weightTotals.value[startingIndex / ChunkSize].asUint64()
      if (this.winningTicket.value < currentRangeStart + boxStake) {
        break
      }

      startingIndex += ChunkSize
      currentRangeStart += boxStake
    }

    return [startingIndex, currentRangeStart]
  }

  /** weights boxes allocated; legacy zero-fee children never stored the key (init never ran) */
  private weightsBoxes(): uint64 {
    return this.weightsBoxCount.hasValue ? this.weightsBoxCount.value : 0
  }

  /** AR-03: the winning bid's fee is never retained (the winner pays the full bid as proceeds) */
  private rafflePool(): uint64 {
    return this.raffleAmount.value - this.getBidFee(this.highestBid.value)
  }

  /**
   * AR-02: remove the auction winner's weight so every drawn ticket belongs to a losing bidder.
   * Idempotent (the weight is 0 after the first call).
   */
  private excludeWinnerWeight(): void {
    if (this.bidID.value === 1) {
      return
    }

    const { account } = this.bids(this.bidID.value - 1).value
    if (!this.bidsByAddress(account).exists) {
      return
    }

    const loc = this.bidsByAddress(account).value
    const box: uint64 = loc / ChunkSize
    const w = this.weights(box).value[loc % ChunkSize].asUint64()
    this.weights(box).value[loc % ChunkSize] = new Uint64(0)
    this.weightTotals.value[box] = new Uint64(this.weightTotals.value[box].asUint64() - w)
    this.weightedBidTotal.value -= w
  }

  /** AR-02: no eligible losing weight → no raffle; any orphan pool goes to the DAO escrow */
  private settleWithoutRaffle(): void {
    this.sendToAkitaEscrow(this.bidAsset.value, this.rafflePool())
    this.rafflePrizeClaimed.value = true
  }

  /** legacy recovery: a search that ran past every participant without a match is re-drawn */
  private resetDraw(): void {
    this.winningTicket.value = 0
    this.raffleRound.value = 0
    this.findWinnerCursors.value = { startingIndex: 0, currentRangeStart: 1 }
  }

  /** returns the prize to the seller (prize box transfer, ASA close-out, or rewards disbursement if not opted in) */
  private returnPrizeToSeller(): void {
    this.transferPurchaseToBuyer(this.seller.value)
  }

  /** AR-02: a fee auction's current highest bidder cannot immediately outbid itself */
  private assertNotSelfOutbid(): void {
    if (this.bidFee.value > 0 && this.bidID.value > 1) {
      loggedAssert(this.bids(this.bidID.value - 1).value.account !== Txn.sender, errCannotOutbidSelf)
    }
  }

  /**
   * Live auction and passed gate. `legacy` (old-ABI shims): registry origin of `Txn.sender` checked
   * with `Gate.mustCheck`, exactly as before. Otherwise (spec §6.6): the verified context of the
   * `wallet` hint, checked with `Gate.mustCheckFor` (`gateCheckCtx`).
   */
  private assertGated(gateTxn: gtxn.ApplicationCallTxn, legacy: boolean, wallet: uint64): void {
    loggedAssert(this.isLive(), errAuctionNotLive)
    let passed = false
    if (legacy) {
      const origin = legacyOriginOrTxnSender(legacyWalletOf(this.akitaDAO.value, Txn.sender))
      passed = gateCheck(gateTxn, this.akitaDAO.value, origin, this.gateID.value)
    } else {
      passed = gateCheckCtx(gateTxn, this.akitaDAO.value, gateCtx(principalOf(this.akitaDAO.value, wallet)), this.gateID.value)
    }
    loggedAssert(passed, errFailedGate)
  }

  /** live auction without a gate (the ungated bid methods) */
  private assertUngated(): void {
    loggedAssert(this.isLive(), errAuctionNotLive)
    loggedAssert(this.gateID.value === 0, errHasGate)
  }

  /** box MBR a bid by `Txn.sender` must carry (first bids also pay the address and location boxes) */
  private bidMbr(): uint64 {
    const { bids, bidsByAddress, locations } = this.mbr()
    let mbr = bids
    if (!this.bidsByAddress(Txn.sender).exists) {
      mbr += bidsByAddress
      if (this.bidFee.value > 0) {
        mbr += locations
      }
    }
    return mbr
  }

  /** stores a validated bid and updates the snipe window, raffle pool and highest bid */
  private recordBid(id: uint64, bidAmount: uint64, marketplace: Account): void {
    this.setNewBid(id, bidAmount, marketplace)

    // if this is a snipe increase the time left by 5 minutes
    if (Global.latestTimestamp > (this.endTimestamp.value - SNIPE_RANGE)) {
      this.endTimestamp.value += SNIPE_EXTENSION
    }

    if (this.bidFee.value > 0) {
      const bidFee = this.getBidFee(bidAmount)
      this.raffleAmount.value += bidFee
    }

    this.highestBid.value = bidAmount
  }

  private createBid(payment: gtxn.PaymentTxn, marketplace: Account): void {
    assertPlainPayment(payment)
    this.assertNotSelfOutbid()
    const id = this.newBidID()

    // a payer other than the bidder also funds its payer record; the bid's storage returns to it,
    // the bid itself stays the bidder's
    const mbr: uint64 = this.bidMbr() + sponsorCost(payment.sender, Txn.sender)
    const minimumBidAmount = this.getMinimumBidAmount()

    loggedAssert(payment.receiver === Global.currentApplicationAddress, errInvalidPayment)
    loggedAssert(payment.amount >= (minimumBidAmount + mbr), errInvalidPayment)
    const bidAmount: uint64 = payment.amount - mbr

    this.recordBid(id, bidAmount, marketplace)
    recordPayer(this.bids(id).key, payment.sender, Txn.sender)
  }

  private createBidAsa(
    payment: gtxn.PaymentTxn,
    assetXfer: gtxn.AssetTransferTxn,
    marketplace: Account
  ): void {
    assertPlainPayment(payment)
    assertSafeAssetTransfer(assetXfer, Txn.sender)
    this.assertNotSelfOutbid()
    const id = this.newBidID()

    // a payer other than the bidder also funds its payer record; the bid's storage returns to it
    const mbr: uint64 = this.bidMbr() + sponsorCost(payment.sender, Txn.sender)

    loggedAssert(payment.receiver === Global.currentApplicationAddress, errInvalidPayment)
    loggedAssert(payment.amount === mbr, errInvalidPayment)

    const bidAmount = assetXfer.assetAmount
    const minimumBidAmount = this.getMinimumBidAmount()

    loggedAssert(assetXfer.assetReceiver === Global.currentApplicationAddress, errInvalidTransfer)
    loggedAssert(assetXfer.assetAmount >= minimumBidAmount, errInvalidTransfer)
    loggedAssert(assetXfer.xferAsset === this.bidAsset.value, errInvalidTransfer)

    this.recordBid(id, bidAmount, marketplace)
    recordPayer(this.bids(id).key, payment.sender, Txn.sender)
  }

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  create(
    prize: uint64,
    isPrizeBox: boolean,
    bidAsset: uint64, // 0 | Asset
    bidFee: uint64,
    startingBid: uint64,
    bidMinimumIncrease: uint64,
    startTimestamp: uint64,
    endTimestamp: uint64,
    funder: FunderInfo,
    seller: Account,
    creatorRoyalty: uint64,
    gateID: uint64,
    marketplace: Account,
    version: string,
    akitaConfig: AkitaConfig,
    sellerReferrer: Account
  ) {
    loggedAssert(Global.callerApplicationId !== 0, errMustBeCalledFromFactory)

    this.prize.value = prize
    this.isPrizeBox.value = isPrizeBox
    this.prizeClaimed.value = false
    // bidAsset 0 represents ALGO bids, only validate actual ASA
    if (bidAsset !== 0) {
      loggedAssert(Asset(bidAsset).total > 0, errInvalidAsset)
    }
    this.bidAsset.value = Asset(bidAsset)
    this.bidFee.value = bidFee
    this.startingBid.value = startingBid
    this.bidMinimumIncrease.value = bidMinimumIncrease
    this.startTimestamp.value = startTimestamp
    this.endTimestamp.value = endTimestamp
    this.funder.value = clone(funder)
    this.seller.value = seller
    this.creatorRoyalty.value = creatorRoyalty
    this.gateID.value = gateID
    this.marketplace.value = marketplace
    // forwarded by the factory, which verified the seller's wallet hint (or read the legacy registry)
    this.sellerReferrer.value = sellerReferrer

    // Validate app exists by checking it has an address (approvalProgram.length fails for large contracts)
    loggedAssert(akitaConfig.akitaDAO.address !== Global.zeroAddress, errInvalidApp)
    this.akitaDAO.value = akitaConfig.akitaDAO
    this.akitaDAOEscrow.value = clone(akitaConfig.akitaDAOEscrow)

    this.version.value = version

    // internal variables
    this.weightTotals.value = new StaticArray<Uint64, 15>()
    this.findWinnerCursors.value = { startingIndex: 0, currentRangeStart: 1 }
    this.raffleWinner.value = Global.zeroAddress
    this.salt.value = Txn.txId
    this.marketplaceRoyalties.value = getNFTFees(this.akitaDAO.value).auctionComposablePercentage
  }

  init(payment: gtxn.PaymentTxn, weightListLength: uint64) {
    loggedAssert(Txn.sender === Global.creatorAddress, errMustBeCalledFromFactory)
    loggedAssert(this.bidFee.value > 0, errNotApplicableToThisAuction)
    loggedAssert(weightListLength >= 3, errMustAllocateAtLeastThreeHighestBidsChunks)
    loggedAssert(weightListLength <= MaxWeightsBoxes, errTooManyWeightsBoxes)

    // Only weights MBR is expected - base MBR and optIn MBR were sent during optin call
    const weightsMBR: uint64 = weightListLength * this.mbr().weights

    loggedAssert(payment.receiver === Global.currentApplicationAddress, errInvalidPayment)
    loggedAssert(payment.amount === weightsMBR, errInvalidPayment)

    for (let i: uint64 = 0; i < weightListLength; i += 1) {
      this.weights(i).create()
    }
    this.weightsBoxCount.value = weightListLength
  }

  @abimethod({ allowActions: 'DeleteApplication' })
  deleteApplication(): void {
    loggedAssert(Txn.sender === Global.creatorAddress, errMustBeCalledFromFactory)
    // bidID is "next bid id"; refundable bids are all except the latest (winning) bid
    const expectedRefundCount: uint64 = this.bidID.value > 1 ? this.bidID.value - 2 : 0
    loggedAssert(this.refundCount.value === expectedRefundCount, errNotAllRefundsComplete)
    loggedAssert(this.prizeClaimed.value, errPrizeNotClaimed)
    // AR-05: zero-fee auctions have no loser raffle to settle
    loggedAssert(this.bidFee.value === 0 || this.rafflePrizeClaimed.value, errRaffleWinnerHasNotClaimed)
    const refundsComplete = this.bidID.value === this.refundMBRCursor.value
    loggedAssert(refundsComplete, errNotAllRefundsComplete)
    loggedAssert(this.weightsBoxes() === 0, errStillHasHighestBidsBoxes)

    // AR-05: the prize holding was already closed out when the prize was claimed
    if (!this.isPrizeBox.value && Global.currentApplicationAddress.isOptedIn(Asset(this.prize.value))) {
      itxn
        .assetTransfer({
          assetCloseTo: Global.creatorAddress,
          xferAsset: this.prize.value,
        })
        .submit()
    }

    if (this.bidAsset.value.id !== 0 && Global.currentApplicationAddress.isOptedIn(this.bidAsset.value)) {
      itxn
        .assetTransfer({
          assetCloseTo: Global.creatorAddress,
          xferAsset: this.bidAsset.value,
        })
        .submit()
    }

    itxn
      .payment({
        closeRemainderTo: Global.creatorAddress,
      })
      .submit()
  }

  /**
   * deletes the application & returns the mbr + asset
   * to the seller IF the auction hasn't started
   */
  @abimethod({ allowActions: 'DeleteApplication' })
  cancel(): void {
    loggedAssert(Txn.sender === Global.creatorAddress, errMustBeCalledFromFactory)
    loggedAssert(Global.latestTimestamp < this.startTimestamp.value, errAuctionAlreadyStarted)
    loggedAssert(this.weightsBoxes() === 0, errStillHasHighestBidsBoxes)

    this.returnPrizeToSeller()

    if (this.bidAsset.value.id !== 0) {
      itxn
        .assetTransfer({
          assetCloseTo: Global.creatorAddress,
          xferAsset: this.bidAsset.value,
        })
        .submit()
    }

    itxn
      .payment({
        closeRemainderTo: Global.creatorAddress,
      })
      .submit()
  }

  // AUCTION METHODS ------------------------------------------------------------------------------

  /**
   * Gated bid (principal ABI, spec §6.6). The gate subject is the verified context of the bidder's
   * `wallet` hint (0 = acting as itself), pinned through `Gate.mustCheckFor` (`gateCheckCtx`). A
   * plugin passes `windowHint(wallet)`; an invalid hint reverts. Bids stay keyed by `Txn.sender`.
   */
  gatedBid(
    payment: gtxn.PaymentTxn,
    gateTxn: gtxn.ApplicationCallTxn,
    marketplace: Account,
    wallet: uint64,
  ): void {
    this.assertGated(gateTxn, false, wallet)
    this.createBid(payment, marketplace)
  }

  /**
   * LEGACY shim (spec §7.2; delete in Phase 4): the pre-principal `gatedBid(pay,appl,address)void`
   * with its registry semantics (gate subject = registry origin of `Txn.sender`, `Gate.mustCheck`).
   * Kept for old plugins and SDKs during the compatibility window.
   */
  @abimethod({ name: 'gatedBid' })
  legacyGatedBid(
    payment: gtxn.PaymentTxn,
    gateTxn: gtxn.ApplicationCallTxn,
    marketplace: Account,
  ): void {
    this.assertGated(gateTxn, true, 0)
    this.createBid(payment, marketplace)
  }

  bid(payment: gtxn.PaymentTxn, marketplace: Account): void {
    this.assertUngated()

    this.createBid(payment, marketplace)
  }

  /** ASA twin of `gatedBid` (principal ABI, spec §6.6). */
  gatedBidAsa(
    payment: gtxn.PaymentTxn,
    assetXfer: gtxn.AssetTransferTxn,
    gateTxn: gtxn.ApplicationCallTxn,
    marketplace: Account,
    wallet: uint64
  ): void {
    this.assertGated(gateTxn, false, wallet)
    this.createBidAsa(payment, assetXfer, marketplace)
  }

  /** LEGACY shim of `gatedBidAsa(pay,axfer,appl,address)void` (registry semantics; delete in Phase 4). */
  @abimethod({ name: 'gatedBidAsa' })
  legacyGatedBidAsa(
    payment: gtxn.PaymentTxn,
    assetXfer: gtxn.AssetTransferTxn,
    gateTxn: gtxn.ApplicationCallTxn,
    marketplace: Account
  ): void {
    this.assertGated(gateTxn, true, 0)
    this.createBidAsa(payment, assetXfer, marketplace)
  }

  bidAsa(
    payment: gtxn.PaymentTxn,
    assetXfer: gtxn.AssetTransferTxn,
    marketplace: Account
  ): void {
    this.assertUngated()

    this.createBidAsa(payment, assetXfer, marketplace)
  }

  refundBid(id: uint64): void {
    const [receiver, returnAmount] = this.markRefunded(id)
    // A single refund is never skipped. When the bidder closed their account and the amount is below
    // the minimum balance this call fails as a whole, so the bid stays unrefunded until the account is
    // funded again or the cleanup in `refundMBR` reaches it.
    if (this.bidAsset.value.id === 0) {
      itxn.payment({ receiver, amount: returnAmount }).submit()
    } else {
      this.sendBidAsset(receiver, returnAmount)
    }
  }

  /** marks bid `id` refunded and returns who gets how much back */
  private markRefunded(id: uint64): [Account, uint64] {
    // make sure were not refunding the winning (most recent) bid
    loggedAssert(id < this.bidID.value - 1, errCannotRefundMostRecentBid)
    // make sure the bid exists
    loggedAssert(this.bids(id).exists, errBidNotFound)
    // get bid info
    const { refunded, amount, account: receiver } = this.bids(id).value
    // make sure its not already refunded
    loggedAssert(!refunded, errBidAlreadyRefunded)
    // mark the bid as refunded
    this.bids(id).value.refunded = true

    const bidFee = this.getBidFee(amount)

    const returnAmount: uint64 = amount - bidFee

    // increment our refund counter
    this.refundCount.value += 1
    return [receiver, returnAmount]
  }

  /** commits the draw to the first beacon-stored round at least DRAW_DELAY_ROUNDS ahead */
  private commitDrawRound(): void {
    this.raffleRound.value = (Global.round + DRAW_DELAY_ROUNDS + BEACON_ROUND_INTERVAL - 1) / BEACON_ROUND_INTERVAL * BEACON_ROUND_INTERVAL
  }

  /**
   * Loser-raffle draw, commit-reveal (AR-01):
   * - first call after the end freezes the eligible weight (AR-02) and commits to a
   *   beacon-stored round at least DRAW_DELAY_ROUNDS ahead, whose output nobody can know yet
   * - a later call (BEACON_LAG_ROUNDS after that round) draws the ticket
   * - an empty beacon read reverts, so nobody can move the commitment (TRADE-3); only after
   *   BEACON_MAX_WAIT_ROUNDS does it re-commit forward, never to an already-public round
   */
  raffle(): void {
    loggedAssert(Global.latestTimestamp > this.endTimestamp.value, errAuctionHasNotEnded)
    loggedAssert(this.bidFee.value > 0, errNotApplicableToThisAuction)
    loggedAssert(this.winningTicket.value === 0, errWinnerAlreadyDrawn)
    loggedAssert(this.raffleWinner.value === Global.zeroAddress, errWinnerAlreadyFound)
    loggedAssert(!this.rafflePrizeClaimed.value, errRaffleAlreadyPrizeClaimed)

    if (this.raffleRound.value === 0) {
      this.excludeWinnerWeight()

      if (this.weightedBidTotal.value === 0) {
        this.settleWithoutRaffle()
        return
      }

      if (this.weightedBidTotal.value === 1) {
        this.winningTicket.value = 1
        return
      }

      this.commitDrawRound()
      return
    }

    loggedAssert(Global.round >= this.raffleRound.value + BEACON_LAG_ROUNDS, errNotEnoughTime)

    const seed = abiCall<typeof RandomnessBeacon.prototype.get>({
      appId: getOtherAppList(this.akitaDAO.value).vrfBeacon,
      args: [this.raffleRound.value, this.salt.value],
    }).returnValue

    if (seed.length === 0) {
      loggedAssert(Global.round >= this.raffleRound.value + BEACON_MAX_WAIT_ROUNDS, errBeaconNotReady)
      this.vrfFailureCount.value += 1
      this.commitDrawRound()
      return
    }

    const rngState = pcg64Init(seed.slice(0, 16))

    // make upper bounds inclusive if we can
    let upperBound = this.weightedBidTotal.value
    if (upperBound < MAX_UINT64) {
      upperBound += 1
    }

    const rngResult = pcg64Random(rngState, 1, upperBound, 1)
    this.winningTicket.value = rngResult[1][0].asUint64()
  }

  findWinner(iterationAmount: uint64): void {
    loggedAssert(this.bidFee.value > 0, errNotApplicableToThisAuction)
    loggedAssert(Global.latestTimestamp > this.endTimestamp.value, errAuctionHasNotEnded)
    loggedAssert(this.winningTicket.value !== 0, errWinningNumberNotFound)
    loggedAssert(this.raffleWinner.value === Global.zeroAddress, errWinnerAlreadyFound)

    const winningBoxInfo = this.getWinnerWeightBoxInfo()

    const startingIndex = winningBoxInfo[0]
    let currentRangeStart = winningBoxInfo[1]
    let currentRangeEnd: uint64 = 0

    // only reachable for children drawn under legacy code (ticket inside the winner's weight)
    if (startingIndex >= this.uniqueAddressCount.value) {
      this.resetDraw()
      return
    }

    const remainder: uint64 = this.uniqueAddressCount.value - startingIndex
    iterationAmount = remainder > iterationAmount ? iterationAmount : remainder

    const chunkOffset: uint64 = startingIndex % ChunkSize
    const remainingInChunk: uint64 = ChunkSize - chunkOffset
    if (iterationAmount > remainingInChunk) {
      iterationAmount = remainingInChunk
    }

    const weight = clone(this.weights(startingIndex / ChunkSize).value)

    ensureBudget((iterationAmount * 60))

    for (let i: uint64 = 0; i < iterationAmount; i += 1) {
      // the auction winner's weight was zeroed at commit (AR-02)
      const amount = weight[chunkOffset + i].asUint64()
      currentRangeEnd = currentRangeStart + amount
      if (this.winningTicket.value >= currentRangeStart && this.winningTicket.value < currentRangeEnd) {
        this.raffleWinner.value = this.locations(startingIndex + i).value
      }
      currentRangeStart = currentRangeEnd
    }

    this.findWinnerCursors.value = {
      startingIndex: (startingIndex + iterationAmount),
      currentRangeStart: currentRangeStart,
    }
  }

  refundMBR(iterationAmount: uint64): void {
    loggedAssert(this.prizeClaimed.value, errPrizeNotClaimed)
    /** make sure we've already found the winner of the raffle */
    loggedAssert(
      this.bidFee.value === 0 || this.raffleWinner.value !== Global.zeroAddress || this.rafflePrizeClaimed.value,
      errWinnerNotFound
    )
    /** make sure we haven't already refunded all MBR */
    loggedAssert(this.bidID.value !== this.refundMBRCursor.value, errAllRefundsComplete)

    const startingIndex = this.refundMBRCursor.value
    const remainder: uint64 = this.bidID.value - this.refundMBRCursor.value
    iterationAmount = remainder > iterationAmount ? iterationAmount : remainder

    ensureBudget((iterationAmount * 160))

    const { bids, bidsByAddress, locations } = this.mbr()

    for (let i = startingIndex; i < startingIndex + iterationAmount; i += 1) {

      const { refunded, account } = this.bids(i).value
      // TRADE-5: a bidder who left the bid asset is refunded through a disbursement, so the
      // sequential cleanup never stops at it
      let disbursementCost: uint64 = 0
      if (!refunded && i !== this.bidID.value - 1) {
        const [receiver, returnAmount] = this.markRefunded(i)
        disbursementCost = this.sendBidAssetOrDisburse(receiver, returnAmount)
      }

      // free up the MBR
      let refundAmount = bids
      this.bids(i).delete()
      if (this.bidsByAddress(account).exists) {
        const loc = this.bidsByAddress(account).value
        this.bidsByAddress(account).delete()
        refundAmount += bidsByAddress
        // locations box only exists when there's a bid fee
        if (this.locations(loc).exists) {
          this.locations(loc).delete()
          refundAmount += locations
        }
      }

      // the bid's storage goes back to whoever paid for it (the bidder, unless someone else did);
      // a disbursement made for that bidder is paid out of it
      const [payee, total] = releaseDeposit(this.bids(i).key, account, refundAmount)
      if (total > disbursementCost && this.canReceiveAlgo(payee, total - disbursementCost)) {
        itxn
          .payment({
            receiver: payee,
            amount: total - disbursementCost,
          })
          .submit()
      }
    }

    this.refundMBRCursor.value += iterationAmount
  }

  claimPrize(): void {
    // make sure the auction has ended
    loggedAssert(Global.latestTimestamp > this.endTimestamp.value, errAuctionHasNotEnded)
    loggedAssert(!this.prizeClaimed.value, errPrizeAlreadyClaimed)

    // AR-04: no bids → the prize goes back to the seller and there is no raffle
    if (this.bidID.value === 1) {
      this.returnPrizeToSeller()
      this.prizeClaimed.value = true
      this.rafflePrizeClaimed.value = true
      return
    }

    // get the winners details (bidID is the next bid ID, so winning bid is bidID - 1)
    const { account, amount, marketplace } = this.bids(this.bidID.value - 1).value

    this.transferPurchaseToBuyer(account)

    if (this.bidAsset.value.id === 0) {
      this.completeAlgoPayments(amount, marketplace)
    } else {
      this.completeAsaPayments(amount, marketplace)
    }

    this.prizeClaimed.value = true
  }

  claimRafflePrize(): void {
    loggedAssert(this.raffleWinner.value !== Global.zeroAddress, errWinnerNotFound)
    loggedAssert(!this.rafflePrizeClaimed.value, errRaffleAlreadyPrizeClaimed)

    // AR-03: pay only the retained (losing-bid) fees
    const pool = this.rafflePool()
    const { auctionRafflePercentage } = getNFTFees(this.akitaDAO.value)
    const akitaFee = calcPercent(pool, auctionRafflePercentage)
    const leftover: uint64 = pool - akitaFee

    this.sendToAkitaEscrow(this.bidAsset.value, akitaFee)

    // TRADE-5: a winner who left the bid asset gets a disbursement instead of blocking cleanup
    this.sendBidAssetOrDisburse(this.raffleWinner.value, leftover)

    this.rafflePrizeClaimed.value = true
  }

  clearWeightsBoxes(iterationAmount: uint64): uint64 {
    // AR-04: the seller may clear weights before start (no bids yet) so a fee auction can be cancelled
    const preStartCancel: boolean = (
      Txn.sender === this.seller.value &&
      this.bidID.value === 1 &&
      Global.latestTimestamp < this.startTimestamp.value
    )

    if (!preStartCancel) {
      loggedAssert(Global.latestTimestamp > this.endTimestamp.value, errAuctionHasNotEnded)
      loggedAssert(this.prizeClaimed.value, errPrizeNotClaimed)
      loggedAssert(this.rafflePrizeClaimed.value, errRaffleNotPrizeClaimed)
    }

    ensureBudget((iterationAmount * 30))

    for (let i: uint64 = 0; i < iterationAmount; i += 1) {
      const ri: uint64 = (this.weightsBoxCount.value - 1) - i
      this.weights(ri).delete()
    }

    this.weightsBoxCount.value -= iterationAmount

    const returnAmount: uint64 = iterationAmount * this.mbr().weights

    // AR-13: the weights MBR goes straight back to whoever funded the auction
    itxn
      .payment({
        receiver: this.funder.value.account,
        amount: returnAmount,
      })
      .submit()

    return returnAmount
  }

  // READ ONLY METHODS ----------------------------------------------------------------------------

  /** @returns a boolean of whether the auction is live */
  @abimethod({ readonly: true })
  isLive(): boolean {
    return (
      Global.latestTimestamp >= this.startTimestamp.value &&
      Global.latestTimestamp <= this.endTimestamp.value
    )
  }

  /** @returns a boolean of whether the address has bid in the auction */
  @abimethod({ readonly: true })
  hasBid(address: Account): boolean {
    return this.bidsByAddress(address).exists
  }

  @abimethod({ readonly: true })
  getMinimumBidAmount(): uint64 {
    if (this.highestBid.value > 0) {
      return this.highestBid.value + this.bidMinimumIncrease.value
    }
    return this.startingBid.value
  }
}

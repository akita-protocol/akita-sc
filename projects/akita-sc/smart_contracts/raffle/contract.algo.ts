import {
  abimethod,
  Account,
  Application,
  arc4,
  Asset,
  BoxMap,
  bytes,
  clone,
  ensureBudget,
  Global,
  GlobalState,
  gtxn,
  itxn,
  loggedAssert,
  op,
  Txn,
  uint64
} from '@algorandfoundation/algorand-typescript'
import { abiCall, Uint64 } from '@algorandfoundation/algorand-typescript/arc4'
import { classes } from 'polytype'
import { MAX_UINT64 } from '../utils/constants'
import { assertSafeAssetTransfer, assertSafePayment, calcPercent, createInstantDisbursement, gateCheck, gateCheckCtx, getNFTFees, getOtherAppList, getUserImpact, legacyWalletOf, impactRange, legacyOriginOrTxnSender, principalOf, sendReferralPaymentTo } from '../utils/functions'
import { gateCtx } from '../utils/principal'
import { pcg64Init, pcg64Random } from '../utils/types/lib_pcg/pcg64.algo'
import { FunderInfo } from '../utils/types/mbr'
import { RandomnessBeacon } from '../utils/types/randomness-beacon'
import { RoyaltyAmounts } from '../utils/types/royalties'
import {
  BEACON_LAG_ROUNDS,
  BEACON_MAX_WAIT_ROUNDS,
  BEACON_ROUND_INTERVAL,
  ChunkSize,
  DRAW_DELAY_ROUNDS,
  RaffleBoxPrefixEntries,
  RaffleBoxPrefixEntriesByAddress,
  RaffleBoxPrefixWeights,
  RaffleGlobalStateKeyAkitaRoyalty,
  RaffleGlobalStateKeyCreatorRoyalty,
  RaffleGlobalStateKeyEndTimestamp,
  RaffleGlobalStateKeyEntryCount,
  RaffleGlobalStateKeyEntryID,
  RaffleGlobalStateKeyFailed,
  RaffleGlobalStateKeyFindWinnersCursor,
  RaffleGlobalStateKeyGateID,
  RaffleGlobalStateKeyIsPrizeBox,
  RaffleGlobalStateKeyMarketplace,
  RaffleGlobalStateKeyMarketplaceRoyalties,
  RaffleGlobalStateKeyMaxTickets,
  RaffleGlobalStateKeyMinEntries,
  RaffleGlobalStateKeyMinTickets,
  RaffleGlobalStateKeyPrize,
  RaffleGlobalStateKeyPrizeClaimed,
  RaffleGlobalStateKeyRaffleRound,
  RaffleGlobalStateKeyRefundMBRCursor,
  RaffleGlobalStateKeySalt,
  RaffleGlobalStateKeySeller,
  RaffleGlobalStateKeySellerReferrer,
  RaffleGlobalStateKeyStartTimestamp,
  RaffleGlobalStateKeyTicketAsset,
  RaffleGlobalStateKeyTicketCount,
  RaffleGlobalStateKeyVRFFailureCount,
  RaffleGlobalStateKeyWeightsBoxCount,
  RaffleGlobalStateKeyWeightTotals,
  RaffleGlobalStateKeyWinner,
  RaffleGlobalStateKeyWinningTicket,
} from './constants'
import {
  errAllRefundsComplete,
  errAlreadyEntered,
  errEntryDoesNotExist,
  errFailedGate,
  errInvalidAsset,
  errInvalidEndingRound,
  errInvalidPayment,
  errInvalidTransfer,
  errMustAllocateAtLeastFourHighestBidsChunks,
  errMustAllocateAtMostFifteenHighestBidsChunks,
  errMustBeCalledFromFactory,
  errNoWinningTicketYet,
  errNotEnoughTime,
  errNotLive,
  errPrizeAlreadyClaimed,
  errPrizeNotClaimed,
  errRaffleHasNotEnded,
  errStillHasWeightsBoxes,
  errTicketAssetAlgo,
  errTicketAssetNotAlgo,
  errWinnerAlreadyDrawn,
  errWinnerAlreadyFound,
  errRefundsNotComplete,
  errWinnerNotFound,
  errBadMethodGateNeeded,
  errInvalidTicketBounds,
  errPrizeIsTicketAsset,
  errNotSeller,
  errBeaconNotReady,
} from './errors'
import { EntryData, FindWinnerCursors, RaffleState } from './types'

// CONTRACT IMPORTS
import { WeightsList } from '../auction/types'
import type { PrizeBox } from '../prize-box/contract.algo'
import { AkitaBaseFeeGeneratorContract, EscrowConfig } from '../utils/base-contracts/base'
import { ChildContract } from '../utils/base-contracts/child'
import { ContractWithCreatorOnlyOptIn } from '../utils/base-contracts/optin'
import { BaseRaffle } from './base'


export class Raffle extends classes(
  BaseRaffle,
  AkitaBaseFeeGeneratorContract,
  ContractWithCreatorOnlyOptIn,
  ChildContract
) {

  // GLOBAL STATE ---------------------------------------------------------------------------------

  /** The asset required to enter the raffle */
  ticketAsset = GlobalState<Asset>({ key: RaffleGlobalStateKeyTicketAsset })
  /** The start round of the raffle as a unix timestamp */
  startTimestamp = GlobalState<uint64>({ key: RaffleGlobalStateKeyStartTimestamp })
  /** The end time of the raffle as a unix timestamp */
  endTimestamp = GlobalState<uint64>({ key: RaffleGlobalStateKeyEndTimestamp })
  /** the address selling the asset */
  seller = GlobalState<Account>({ key: RaffleGlobalStateKeySeller })
  /** The minimum number of tickets to use for the raffle */
  minTickets = GlobalState<uint64>({ key: RaffleGlobalStateKeyMinTickets })
  /** The maximum number of tickets users can enter the raffle with */
  maxTickets = GlobalState<uint64>({ key: RaffleGlobalStateKeyMaxTickets })
  /** The number of entries for the raffle */
  entryCount = GlobalState<uint64>({ initialValue: 0, key: RaffleGlobalStateKeyEntryCount })
  /** The number of tickets entered into the raffle */
  ticketCount = GlobalState<uint64>({ initialValue: 0, key: RaffleGlobalStateKeyTicketCount })
  /** the winning ticket */
  winningTicket = GlobalState<uint64>({ initialValue: 0, key: RaffleGlobalStateKeyWinningTicket })
  /** the winning address of the raffle */
  winner = GlobalState<Account>({ key: RaffleGlobalStateKeyWinner })
  /** the prize for the raffle if prizeBox is true prize represents the app id of the prize box, otherwise the asset being raffled */
  prize = GlobalState<uint64>({ key: RaffleGlobalStateKeyPrize })
  /** whether or not the prize is an asset or a prize box */
  isPrizeBox = GlobalState<boolean>({ key: RaffleGlobalStateKeyIsPrizeBox })
  /** Indicator for whether the prize has been claimed */
  prizeClaimed = GlobalState<boolean>({ initialValue: false, key: RaffleGlobalStateKeyPrizeClaimed })
  /** the amount the creator will get for the sale */
  creatorRoyalty = GlobalState<uint64>({ key: RaffleGlobalStateKeyCreatorRoyalty })
  /** the gate to use for the raffle */
  gateID = GlobalState<uint64>({ key: RaffleGlobalStateKeyGateID })
  /** the address of the creation side marketplace */
  marketplace = GlobalState<Account>({ key: RaffleGlobalStateKeyMarketplace })
  /** the amount the marketplaces will get for the sale */
  marketplaceRoyalties = GlobalState<uint64>({ key: RaffleGlobalStateKeyMarketplaceRoyalties })
  /** the minimum impact tax for the raffle */
  akitaRoyalty = GlobalState<uint64>({ key: RaffleGlobalStateKeyAkitaRoyalty })
  /** counter for how many times we've failed to get rng from the beacon */
  vrfFailureCount = GlobalState<uint64>({ initialValue: 0, key: RaffleGlobalStateKeyVRFFailureCount })
  /** The id's of the raffle entries */
  entryID = GlobalState<uint64>({ initialValue: 0, key: RaffleGlobalStateKeyEntryID })
  /** the number of boxes allocated to tracking weights */
  weightsBoxCount = GlobalState<uint64>({ initialValue: 0, key: RaffleGlobalStateKeyWeightsBoxCount })
  /** totals for each box of weights for our skip list */
  weightTotals = GlobalState<arc4.StaticArray<arc4.Uint64, 15>>({
    key: RaffleGlobalStateKeyWeightTotals,
  })
  /**
   * cursors to track iteration of finding winner
   * index being for the bid iteration
   * amountIndex being the index for the amount of the bids seen
   */
  findWinnerCursors = GlobalState<FindWinnerCursors>({ key: RaffleGlobalStateKeyFindWinnersCursor })
  /** cursor to track iteration of MBR refunds */
  refundMBRCursor = GlobalState<uint64>({ initialValue: 0, key: RaffleGlobalStateKeyRefundMBRCursor })
  /** the transaction id of the create application call for salting our VRF call */
  salt = GlobalState<bytes>({ key: RaffleGlobalStateKeySalt })
  /** the future round committed to by the first post-end raffle() call, used for VRF (AR-01) */
  raffleRound = GlobalState<uint64>({ initialValue: 0, key: RaffleGlobalStateKeyRaffleRound })
  /** AR-C: minimum number of entries for the raffle to be drawn (below it the raffle fails) */
  minEntries = GlobalState<uint64>({ initialValue: 0, key: RaffleGlobalStateKeyMinEntries })
  /**
   * AR-07 / AR-C: the raffle did not reach minimum participation (or sold no tickets).
   * The prize returns to the seller and every entrant is refunded their tickets.
   */
  failed = GlobalState<boolean>({ initialValue: false, key: RaffleGlobalStateKeyFailed })
  /**
   * Referrer of the seller's verified wallet, resolved once by the factory at creation (zero if
   * none) and paid at settlement (spec §6.8). Plugins read its EXISTENCE as the marker of this
   * child's principal ABI; children created before it keep their own semantics until they settle.
   */
  sellerReferrer = GlobalState<Account>({ key: RaffleGlobalStateKeySellerReferrer })

  // BOXES ----------------------------------------------------------------------------------------

  /** The entries for the raffle */
  entries = BoxMap<uint64, EntryData>({ keyPrefix: RaffleBoxPrefixEntries })
  /** weights set for bidders */
  weights = BoxMap<uint64, WeightsList>({ keyPrefix: RaffleBoxPrefixWeights })
  /** The address map of entries for the raffle */
  entriesByAddress = BoxMap<Account, uint64>({ keyPrefix: RaffleBoxPrefixEntriesByAddress })

  // PRIVATE METHODS ------------------------------------------------------------------------------

  /**
   * AR-08: skip whole weights boxes only while the cursor sits on a box boundary,
   * using the totals of the box the cursor is actually in.
   */
  private getWinnerWeightBoxInfo(): [uint64, uint64] {
    let startingIndex = this.findWinnerCursors.value.index
    let currentRangeStart = this.findWinnerCursors.value.amountIndex

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

  /** LEGACY shims only: origin of a (DAO-authenticated) registry wallet sender, else the sender itself (AR-E) */
  private gateSubject(): Account {
    return legacyOriginOrTxnSender(legacyWalletOf(this.akitaDAO.value, Txn.sender))
  }

  /**
   * Gate check of every gated entry point. `legacy` (old-ABI shims): `Gate.mustCheck` with the
   * registry subject (`gateSubject`), exactly as before. Otherwise (spec §6.8): `Gate.mustCheckFor`
   * pinned to the verified context of the caller's `wallet` hint (`gateCheckCtx`); invalid hints revert.
   */
  private assertGate(gateTxn: gtxn.ApplicationCallTxn, legacy: boolean, wallet: uint64): void {
    let passed = false
    if (legacy) {
      passed = gateCheck(gateTxn, this.akitaDAO.value, this.gateSubject(), this.gateID.value)
    } else {
      passed = gateCheckCtx(gateTxn, this.akitaDAO.value, gateCtx(principalOf(this.akitaDAO.value, wallet)), this.gateID.value)
    }
    loggedAssert(passed, errFailedGate)
  }

  /** tickets held by entry `loc` */
  private ticketsOf(loc: uint64): uint64 {
    return this.weights(loc / ChunkSize).value[loc % ChunkSize].asUint64()
  }

  /**
   * A closed (empty) account cannot receive an ALGO payment below the minimum balance. Such a payment
   * is skipped: the amount stays here and leaves with the rest of the account when the raffle is
   * deleted, so one closed account never blocks the settlement, the refunds after it or the delete.
   */
  private canReceiveAlgo(receiver: Account, amount: uint64): boolean {
    const [balance] = op.AcctParams.acctBalance(receiver)
    return balance > 0 || amount >= Global.minBalance
  }

  /** sends `amount` of the ticket asset, skipping zero amounts and ALGO a closed account cannot take */
  private sendTickets(receiver: Account, amount: uint64): void {
    if (amount === 0) {
      return
    }

    if (this.ticketAsset.value.id === 0) {
      if (this.canReceiveAlgo(receiver, amount)) {
        itxn.payment({ receiver, amount }).submit()
      }
    } else {
      itxn
        .assetTransfer({
          assetReceiver: receiver,
          assetAmount: amount,
          xferAsset: this.ticketAsset.value,
        })
        .submit()
    }
  }

  /**
   * pays `amount` of the ticket asset directly when `receiver` can hold it, otherwise through a
   * rewards disbursement; returns the disbursement's MBR cost (0 for a direct payment)
   */
  private sendTicketsOrDisburse(receiver: Account, amount: uint64): uint64 {
    if (amount === 0) {
      return 0
    }

    if (this.ticketAsset.value.id === 0 || receiver.isOptedIn(this.ticketAsset.value)) {
      this.sendTickets(receiver, amount)
      return 0
    }
    return createInstantDisbursement(
      this.akitaDAO.value,
      this.ticketAsset.value.id,
      0,
      MAX_UINT64,
      [{ address: receiver, amount }],
      amount,
      false,
      Global.zeroAddress
    ).cost
  }

  private transferPrize(receiver: Account): void {
    if (this.isPrizeBox.value) {
      abiCall<typeof PrizeBox.prototype.transfer>({
        appId: this.prize.value,
        args: [receiver],
      })
      return
    }

    const prizeAmount = op.AssetHolding.assetBalance(Global.currentApplicationAddress, this.prize.value)[0]

    if (receiver.isOptedIn(Asset(this.prize.value))) {
      itxn
        .assetTransfer({
          assetCloseTo: receiver,
          xferAsset: this.prize.value,
        })
        .submit()
    } else {
      createInstantDisbursement(
        this.akitaDAO.value,
        this.prize.value,
        0,
        MAX_UINT64,
        [{ address: receiver, amount: prizeAmount }],
        prizeAmount,
        true,
        Global.zeroAddress
      )
    }
  }

  private getAmounts(amount: uint64, isPrizeBox: boolean): RoyaltyAmounts {

    let creatorAmount: uint64 = 0
    if (!isPrizeBox && this.creatorRoyalty.value > 0) {
      creatorAmount = calcPercent(amount, this.creatorRoyalty.value)
      if (creatorAmount === 0 && this.creatorRoyalty.value > 0 && amount > 0) {
        creatorAmount = 1
      }
    }

    let akitaAmount: uint64 = 0
    if (this.akitaRoyalty.value > 0) {
      akitaAmount = calcPercent(amount, this.akitaRoyalty.value)
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

    // tiny totals: the 1-unit minimums can exceed the amount (seller underflow would block
    // settlement forever), so fall back to plain proportional amounts
    if (creatorAmount + akitaAmount + (2 * marketplaceAmount) > amount) {
      creatorAmount = (!isPrizeBox && this.creatorRoyalty.value > 0) ? calcPercent(amount, this.creatorRoyalty.value) : 0
      akitaAmount = calcPercent(amount, this.akitaRoyalty.value)
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

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  create(
    prize: uint64,
    isPrizeBox: boolean,
    ticketAsset: uint64,
    startTimestamp: uint64,
    endTimestamp: uint64,
    seller: Account,
    funder: FunderInfo,
    creatorRoyalty: uint64,
    minTickets: uint64,
    maxTickets: uint64,
    minEntries: uint64,
    gateID: uint64,
    marketplace: Account,
    akitaDAO: Application,
    akitaDAOEscrow: EscrowConfig,
    sellerReferrer: Account,
  ): void {
    loggedAssert(Global.callerApplicationId !== 0, errMustBeCalledFromFactory)

    this.prize.value = prize
    this.isPrizeBox.value = isPrizeBox
    // ticketAsset 0 represents ALGO tickets, only validate actual ASA
    if (ticketAsset !== 0) {
      loggedAssert(Asset(ticketAsset).total > 0, errInvalidAsset)
    }
    this.ticketAsset.value = Asset(ticketAsset)
    this.startTimestamp.value = startTimestamp
    loggedAssert(endTimestamp > startTimestamp && endTimestamp > Global.latestTimestamp, errInvalidEndingRound)
    this.endTimestamp.value = endTimestamp
    this.seller.value = seller
    this.funder.value = clone(funder)
    this.creatorRoyalty.value = creatorRoyalty
    // AR-07: entries must be able to buy at least one ticket
    loggedAssert(maxTickets > 0 && maxTickets >= minTickets, errInvalidTicketBounds)
    // AR-11: the prize can't be the ticket asset (the prize close-out would sweep every ticket)
    loggedAssert(isPrizeBox || prize !== ticketAsset, errPrizeIsTicketAsset)
    this.minTickets.value = minTickets
    this.maxTickets.value = maxTickets
    this.minEntries.value = minEntries
    this.winner.value = Global.zeroAddress
    this.gateID.value = gateID
    this.marketplace.value = marketplace
    // forwarded by the factory, which verified the seller's wallet hint (or read the legacy registry)
    this.sellerReferrer.value = sellerReferrer
    this.akitaDAO.value = akitaDAO
    this.akitaDAOEscrow.value = clone(akitaDAOEscrow)

    // internal variables
    const fees = getNFTFees(this.akitaDAO.value)
    this.marketplaceRoyalties.value = fees.raffleComposablePercentage

    const impact = getUserImpact(this.akitaDAO.value, this.seller.value)
    this.akitaRoyalty.value = impactRange(impact, fees.raffleSaleImpactTaxMin, fees.raffleSaleImpactTaxMax)

    this.weightTotals.value = new arc4.StaticArray<Uint64, 15>()
    this.salt.value = Txn.txId
    this.findWinnerCursors.value = { index: 0, amountIndex: 1 }
  }

  init(payment: gtxn.PaymentTxn, weightListLength: uint64) {
    loggedAssert(Txn.sender === Global.creatorAddress, errMustBeCalledFromFactory)
    loggedAssert(weightListLength >= 4, errMustAllocateAtLeastFourHighestBidsChunks)
    loggedAssert(weightListLength < 16, errMustAllocateAtMostFifteenHighestBidsChunks)

    // Base MBR and asset opt-in MBR are handled by factory before this call
    // This init only expects the weights MBR
    const weightsMBR: uint64 = (weightListLength * this.mbr().weights)

    loggedAssert(payment.receiver === Global.currentApplicationAddress, errInvalidPayment)
    loggedAssert(payment.amount === weightsMBR, errInvalidPayment)

    this.weightsBoxCount.value = weightListLength
    for (let i: uint64 = 0; i < weightListLength; i += 1) {
      this.weights(i).create()
    }
  }

  /**
   * AR-C: the seller sets the minimum number of entries needed for the raffle to be drawn.
   * Only before anyone has entered, and before the end. Below the minimum the raffle fails:
   * the prize returns to the seller and every entrant is refunded.
   */
  setMinEntries(minEntries: uint64): void {
    loggedAssert(Txn.sender === this.seller.value, errNotSeller)
    loggedAssert(this.entryCount.value === 0, errAlreadyEntered)
    loggedAssert(Global.latestTimestamp <= this.endTimestamp.value, errNotLive)
    this.minEntries.value = minEntries
  }

  refundMBR(iterationAmount: uint64): void {
    /** make sure the prize has been claimed before refunding MBR */
    loggedAssert(this.prizeClaimed.value, errPrizeNotClaimed)
    /** make sure we've already found the winner of the raffle */
    loggedAssert(this.winner.value !== Global.zeroAddress, errWinnerNotFound)
    /** make sure we haven't already refunded all MBR */
    loggedAssert(this.entryCount.value !== this.refundMBRCursor.value, errAllRefundsComplete)

    const startingIndex = this.refundMBRCursor.value
    const remainder: uint64 = this.entryCount.value - this.refundMBRCursor.value
    iterationAmount = remainder > iterationAmount ? iterationAmount : remainder

    const costs = this.mbr()
    const entryTotalMBR: uint64 = costs.entries + costs.entriesByAddress

    const opUpIterationAmount: uint64 = iterationAmount * 120
    ensureBudget(opUpIterationAmount)

    for (let i = startingIndex; i < startingIndex + iterationAmount; i += 1) {
      const { account } = this.entries(i).value
      // AR-C: a failed raffle refunds every entrant's tickets with their MBR
      let disbursementCost: uint64 = 0
      if (this.failed.value) {
        disbursementCost = this.sendTicketsOrDisburse(account, this.ticketsOf(i))
      }
      this.entries(i).delete()
      this.entriesByAddress(account).delete()
      // TRADE-5: an entrant who left the ticket asset pays its refund disbursement out of its released MBR
      if (entryTotalMBR > disbursementCost && this.canReceiveAlgo(account, entryTotalMBR - disbursementCost)) {
        itxn
          .payment({
            amount: entryTotalMBR - disbursementCost,
            receiver: account,
          })
          .submit()
      }
    }

    this.refundMBRCursor.value += iterationAmount
  }

  clearWeightsBoxes(): uint64 {
    loggedAssert(this.prizeClaimed.value, errPrizeNotClaimed)
    // ticket refunds of a failed raffle read the weights boxes
    loggedAssert(this.entryCount.value === this.refundMBRCursor.value, errRefundsNotComplete)

    for (let i: uint64 = 0; i < this.weightsBoxCount.value; i += 1) {
      const ri: uint64 = (this.weightsBoxCount.value - 1) - i
      this.weights(ri).delete()
    }

    const returnAmount: uint64 = this.weightsBoxCount.value * this.mbr().weights

    // AR-09: the weights MBR goes straight back to whoever funded the raffle
    // (the factory refunds only what the deletion itself releases)
    itxn
      .payment({
        receiver: this.funder.value.account,
        amount: returnAmount,
      })
      .submit()

    this.weightsBoxCount.value = 0
    return returnAmount
  }

  @abimethod({ allowActions: 'DeleteApplication' })
  deleteApplication(): void {
    loggedAssert(Txn.sender === Global.creatorAddress, errMustBeCalledFromFactory)
    loggedAssert(this.prizeClaimed.value, errPrizeNotClaimed)
    loggedAssert(this.entryCount.value === this.refundMBRCursor.value, errRefundsNotComplete)
    loggedAssert(this.weightsBoxCount.value === 0, errStillHasWeightsBoxes)

    // AR-09: close every holding back to the factory so nothing is stranded in the deleted app
    if (this.ticketAsset.value.id !== 0 && Global.currentApplicationAddress.isOptedIn(this.ticketAsset.value)) {
      const ticketCloseTo = Global.creatorAddress.isOptedIn(this.ticketAsset.value)
        ? Global.creatorAddress
        : this.ticketAsset.value.creator
      itxn
        .assetTransfer({
          assetCloseTo: ticketCloseTo,
          xferAsset: this.ticketAsset.value,
        })
        .submit()
    }

    if (!this.isPrizeBox.value && Global.currentApplicationAddress.isOptedIn(Asset(this.prize.value))) {
      itxn
        .assetTransfer({
          assetCloseTo: Asset(this.prize.value).creator,
          xferAsset: this.prize.value,
        })
        .submit()
    }

    itxn
      .payment({
        closeRemainderTo: Global.creatorAddress,
      })
      .submit()
  }

  // RAFFLE METHODS -------------------------------------------------------------------------------

  /**
   * Gated entry (principal ABI, spec §6.8): the gate subject is the verified context of the
   * entrant's `wallet` hint (0 = acting as itself). A plugin passes `windowHint(wallet)`.
   * Entries stay keyed by `Txn.sender`.
   */
  gatedEnter(gateTxn: gtxn.ApplicationCallTxn, payment: gtxn.PaymentTxn, marketplace: Account, wallet: uint64): void {
    this.assertGate(gateTxn, false, wallet)
    this.enterImpl(payment, marketplace, true)
  }

  /** LEGACY shim of `gatedEnter(appl,pay,address)void` (registry gate subject; delete in Phase 4). */
  @abimethod({ name: 'gatedEnter' })
  legacyGatedEnter(gateTxn: gtxn.ApplicationCallTxn, payment: gtxn.PaymentTxn, marketplace: Account): void {
    this.assertGate(gateTxn, true, 0)
    this.enterImpl(payment, marketplace, true)
  }

  enter(
    payment: gtxn.PaymentTxn,
    marketplace: Account
  ): void {
    this.enterImpl(payment, marketplace, false)
  }

  /**
   * `gated`: reached through a gated entry point that already checked the gate. The ungated entry
   * point requires an ungated raffle (`errBadMethodGateNeeded`). This replaces the outer-selector
   * compare, which would reject the legacy shims (spec §6 conventions, P2-RAF-01).
   */
  private enterImpl(
    payment: gtxn.PaymentTxn,
    marketplace: Account,
    gated: boolean
  ): void {
    loggedAssert(this.isLive(), errNotLive)
    loggedAssert(this.ticketAsset.value.id === 0, errTicketAssetNotAlgo)

    if (!gated) {
      loggedAssert(this.gateID.value === 0, errBadMethodGateNeeded)
    }

    loggedAssert(!this.entriesByAddress(Txn.sender).exists, errAlreadyEntered)

    const costs = this.mbr()
    const mbr: uint64 = costs.entries + costs.entriesByAddress

    assertSafePayment(payment, Txn.sender)
    loggedAssert(payment.receiver === Global.currentApplicationAddress, errInvalidPayment)
    loggedAssert(
      payment.amount >= (this.minTickets.value + mbr) && payment.amount <= (this.maxTickets.value + mbr),
      errInvalidPayment
    )

    const loc = this.entryCount.value
    this.entries(loc).value = {
      account: Txn.sender,
      marketplace,
    }
    this.entriesByAddress(Txn.sender).value = this.entryCount.value

    const amount: uint64 = payment.amount - mbr

    this.weights(loc / ChunkSize).value[loc % ChunkSize] = new Uint64(amount)
    const newWeight = new Uint64(this.weightTotals.value[loc / ChunkSize].asUint64() + amount)
    this.weightTotals.value[loc / ChunkSize] = newWeight

    this.entryCount.value += 1
    this.ticketCount.value += amount
  }

  /** ASA twin of `gatedEnter` (principal ABI, spec §6.8). */
  gatedEnterAsa(gateTxn: gtxn.ApplicationCallTxn, payment: gtxn.PaymentTxn, assetXfer: gtxn.AssetTransferTxn, marketplace: Account, wallet: uint64): void {
    this.assertGate(gateTxn, false, wallet)
    this.enterAsaImpl(payment, assetXfer, marketplace, true)
  }

  /** LEGACY shim of `gatedEnterAsa(appl,pay,axfer,address)void` (registry gate subject; delete in Phase 4). */
  @abimethod({ name: 'gatedEnterAsa' })
  legacyGatedEnterAsa(gateTxn: gtxn.ApplicationCallTxn, payment: gtxn.PaymentTxn, assetXfer: gtxn.AssetTransferTxn, marketplace: Account): void {
    this.assertGate(gateTxn, true, 0)
    this.enterAsaImpl(payment, assetXfer, marketplace, true)
  }

  enterAsa(
    payment: gtxn.PaymentTxn,
    assetXfer: gtxn.AssetTransferTxn,
    marketplace: Account
  ): void {
    this.enterAsaImpl(payment, assetXfer, marketplace, false)
  }

  /** see `enterImpl` */
  private enterAsaImpl(
    payment: gtxn.PaymentTxn,
    assetXfer: gtxn.AssetTransferTxn,
    marketplace: Account,
    gated: boolean
  ): void {
    loggedAssert(this.isLive(), errNotLive)
    loggedAssert(this.ticketAsset.value.id !== 0, errTicketAssetAlgo)

    if (!gated) {
      loggedAssert(this.gateID.value === 0, errBadMethodGateNeeded)
    }

    loggedAssert(!this.entriesByAddress(Txn.sender).exists, errAlreadyEntered)

    const costs = this.mbr()
    const entryTotalMBR: uint64 = costs.entries + costs.entriesByAddress

    assertSafePayment(payment, Txn.sender)
    assertSafeAssetTransfer(assetXfer, Txn.sender)
    loggedAssert(payment.receiver === Global.currentApplicationAddress, errInvalidPayment)
    loggedAssert(payment.amount === entryTotalMBR, errInvalidPayment)

    loggedAssert(assetXfer.assetReceiver === Global.currentApplicationAddress, errInvalidTransfer)
    loggedAssert(assetXfer.xferAsset === this.ticketAsset.value, errInvalidTransfer)
    loggedAssert(
      assetXfer.assetAmount >= this.minTickets.value && assetXfer.assetAmount <= this.maxTickets.value,
      errInvalidTransfer
    )

    const loc = this.entryCount.value
    this.entries(loc).value = {
      account: Txn.sender,
      marketplace
    }
    this.entriesByAddress(Txn.sender).value = loc

    const amount = assetXfer.assetAmount
    this.weights(loc / ChunkSize).value[loc % ChunkSize] = new Uint64(amount)
    const newWeight = new Uint64(this.weightTotals.value[loc / ChunkSize].asUint64() + amount)
    this.weightTotals.value[loc / ChunkSize] = newWeight

    this.entryCount.value += 1
    this.ticketCount.value += amount
  }

  /** Gated ticket top-up (principal ABI, spec §6.8). */
  gatedAdd(gateTxn: gtxn.ApplicationCallTxn, payment: gtxn.PaymentTxn, wallet: uint64): void {
    this.assertGate(gateTxn, false, wallet)
    this.addImpl(payment, true)
  }

  /** LEGACY shim of `gatedAdd(appl,pay)void` (registry gate subject; delete in Phase 4). */
  @abimethod({ name: 'gatedAdd' })
  legacyGatedAdd(gateTxn: gtxn.ApplicationCallTxn, payment: gtxn.PaymentTxn): void {
    this.assertGate(gateTxn, true, 0)
    this.addImpl(payment, true)
  }

  add(payment: gtxn.PaymentTxn): void {
    this.addImpl(payment, false)
  }

  /** see `enterImpl` */
  private addImpl(payment: gtxn.PaymentTxn, gated: boolean): void {
    loggedAssert(this.isLive(), errNotLive)
    loggedAssert(this.ticketAsset.value.id === 0, errTicketAssetNotAlgo)

    // if our gate is enabled, this method must be reached through a gated entry point
    if (!gated) {
      loggedAssert(this.gateID.value === 0, errBadMethodGateNeeded)
    }

    loggedAssert(this.entriesByAddress(Txn.sender).exists, errEntryDoesNotExist)

    const loc = this.entriesByAddress(Txn.sender).value
    const amount = this.weights(loc / ChunkSize).value[loc % ChunkSize]

    assertSafePayment(payment, Txn.sender)
    loggedAssert(payment.receiver === Global.currentApplicationAddress, errInvalidPayment)
    loggedAssert(payment.amount <= (this.maxTickets.value - amount.asUint64()), errInvalidPayment)

    const newWeights = new Uint64(
      this.weights(loc / ChunkSize).value[loc % ChunkSize].asUint64() + payment.amount
    )
    this.weights(loc / ChunkSize).value[loc % ChunkSize] = newWeights
    const boxAmount = new Uint64(this.weightTotals.value[loc / ChunkSize].asUint64() + payment.amount)
    this.weightTotals.value[loc / ChunkSize] = boxAmount
    this.ticketCount.value += payment.amount
  }

  /** ASA twin of `gatedAdd` (principal ABI, spec §6.8). */
  gatedAddAsa(gateTxn: gtxn.ApplicationCallTxn, assetXfer: gtxn.AssetTransferTxn, wallet: uint64): void {
    this.assertGate(gateTxn, false, wallet)
    this.addAsaImpl(assetXfer, true)
  }

  /** LEGACY shim of `gatedAddAsa(appl,axfer)void` (registry gate subject; delete in Phase 4). */
  @abimethod({ name: 'gatedAddAsa' })
  legacyGatedAddAsa(gateTxn: gtxn.ApplicationCallTxn, assetXfer: gtxn.AssetTransferTxn): void {
    this.assertGate(gateTxn, true, 0)
    this.addAsaImpl(assetXfer, true)
  }

  addAsa(assetXfer: gtxn.AssetTransferTxn): void {
    this.addAsaImpl(assetXfer, false)
  }

  /** see `enterImpl` */
  private addAsaImpl(assetXfer: gtxn.AssetTransferTxn, gated: boolean): void {
    loggedAssert(this.isLive(), errNotLive)
    loggedAssert(this.ticketAsset.value.id !== 0, errTicketAssetAlgo)

    // if our gate is enabled, this method must be reached through a gated entry point
    if (!gated) {
      loggedAssert(this.gateID.value === 0, errBadMethodGateNeeded)
    }

    loggedAssert(this.entriesByAddress(Txn.sender).exists, errEntryDoesNotExist)

    const loc = this.entriesByAddress(Txn.sender).value
    const amount = this.weights(loc / ChunkSize).value[loc % ChunkSize]

    assertSafeAssetTransfer(assetXfer, Txn.sender)
    loggedAssert(assetXfer.assetReceiver === Global.currentApplicationAddress, errInvalidTransfer)
    loggedAssert(assetXfer.xferAsset === this.ticketAsset.value, errInvalidTransfer)
    loggedAssert(assetXfer.assetAmount <= (this.maxTickets.value - amount.asUint64()), errInvalidTransfer)

    const newWeights = new Uint64(
      this.weights(loc / ChunkSize).value[loc % ChunkSize].asUint64() + assetXfer.assetAmount
    )
    this.weights(loc / ChunkSize).value[loc % ChunkSize] = newWeights
    const boxAmount = new Uint64(this.weightTotals.value[loc / ChunkSize].asUint64() + assetXfer.assetAmount)
    this.weightTotals.value[loc / ChunkSize] = boxAmount
    this.ticketCount.value += assetXfer.assetAmount
  }

  /** commits the draw to the first beacon-stored round at least DRAW_DELAY_ROUNDS ahead */
  private commitDrawRound(): void {
    this.raffleRound.value = (Global.round + DRAW_DELAY_ROUNDS + BEACON_ROUND_INTERVAL - 1) / BEACON_ROUND_INTERVAL * BEACON_ROUND_INTERVAL
  }

  /**
   * Draw, commit-reveal (AR-01):
   * - first call after the end settles degenerate raffles (AR-07 / AR-C) or commits to a
   *   beacon-stored round at least DRAW_DELAY_ROUNDS ahead, whose output nobody can know yet
   * - a later call (BEACON_LAG_ROUNDS after that round) draws the ticket
   * - an empty beacon read reverts, so nobody can move the commitment (TRADE-3); only after
   *   BEACON_MAX_WAIT_ROUNDS does it re-commit forward, never to an already-public round
   */
  raffle(): void {
    loggedAssert(Global.latestTimestamp > this.endTimestamp.value, errRaffleHasNotEnded)
    loggedAssert(this.winningTicket.value === 0, errWinnerAlreadyDrawn)
    loggedAssert(this.winner.value === Global.zeroAddress, errWinnerAlreadyFound)

    if (this.raffleRound.value === 0) {
      // AR-C / AR-07: not enough participation (or nothing sold): prize back to seller, tickets refunded
      const minEntries: uint64 = this.minEntries.value > 0 ? this.minEntries.value : 1
      if (this.entryCount.value < minEntries || this.ticketCount.value === 0) {
        this.failed.value = true
        this.winner.value = this.seller.value
        return
      }

      // pcg64Random needs a range of at least two values
      if (this.ticketCount.value === 1) {
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
    let upperBound = this.ticketCount.value
    if (upperBound < MAX_UINT64) {
      upperBound += 1
    }

    const rngResult = pcg64Random(rngState, 1, upperBound, 1)
    this.winningTicket.value = rngResult[1][0].asUint64()
  }

  findWinner(iterationAmount: uint64): void {
    loggedAssert(Global.latestTimestamp > this.endTimestamp.value, errRaffleHasNotEnded)
    loggedAssert(this.winningTicket.value !== 0, errNoWinningTicketYet)
    loggedAssert(this.winner.value === Global.zeroAddress, errWinnerAlreadyFound)

    const winningBoxInfo = this.getWinnerWeightBoxInfo()

    // walk the index to find the winner
    const startingIndex = winningBoxInfo[0]
    let currentRangeStart = winningBoxInfo[1]
    let currentRangeEnd: uint64 = 0

    loggedAssert(startingIndex < this.entryCount.value, errWinnerNotFound)
    const remainder: uint64 = this.entryCount.value - startingIndex
    iterationAmount = remainder > iterationAmount ? iterationAmount : remainder

    const chunkOffset: uint64 = startingIndex % ChunkSize
    const remainingInChunk: uint64 = ChunkSize - chunkOffset
    if (iterationAmount > remainingInChunk) {
      iterationAmount = remainingInChunk
    }

    const weight = clone(this.weights(startingIndex / ChunkSize).value)

    const opUpIterationAmount: uint64 = iterationAmount * 40
    ensureBudget(opUpIterationAmount)

    for (let i: uint64 = 0; i < iterationAmount; i += 1) {
      currentRangeEnd = currentRangeStart + weight[chunkOffset + i].asUint64()
      if (this.winningTicket.value >= currentRangeStart && this.winningTicket.value < currentRangeEnd) {
        this.winner.value = this.entries(startingIndex + i).value.account
      }
      currentRangeStart = currentRangeEnd
    }

    // AR-08: store the position this call actually iterated from
    this.findWinnerCursors.value = { index: startingIndex + iterationAmount, amountIndex: currentRangeStart }
  }

  claimRafflePrize(): void {
    loggedAssert(this.winner.value !== Global.zeroAddress, errWinnerNotFound)
    loggedAssert(!this.prizeClaimed.value, errPrizeAlreadyClaimed)

    // AR-07 / AR-C: a failed raffle returns the prize; ticket proceeds are refunded via refundMBR
    if (this.failed.value) {
      this.transferPrize(this.seller.value)
      this.prizeClaimed.value = true
      return
    }

    // give the winner the prize
    this.transferPrize(this.winner.value)

    const amounts = this.getAmounts(this.ticketCount.value, this.isPrizeBox.value)

    const loc = this.entriesByAddress(this.winner.value).value
    const marketplace = this.entries(loc).value.marketplace

    // AR-10 / principal §6.8: the referral cut goes to the seller's creation-time verified referrer
    let leftover: uint64 = amounts.akita
    if (amounts.akita > 0) {
      ({ leftover } = sendReferralPaymentTo(this.akitaDAO.value, this.sellerReferrer.value, this.ticketAsset.value.id, amounts.akita, this.akitaDAOEscrow.value.app.address))
    }

    if (this.ticketAsset.value.id === 0) {
      if (amounts.creator > 0) {
        // pay the nft creator
        this.sendTickets(Asset(this.prize.value).creator, amounts.creator)
      }
      this.sendToAkitaEscrow(this.ticketAsset.value, leftover)
      this.sendTickets(this.marketplace.value, amounts.marketplace)
      this.sendTickets(marketplace, amounts.marketplace)
      this.sendTickets(this.seller.value, amounts.seller)
    } else {
      if (amounts.creator > 0) {
        this.sendTicketsOrDisburse(Asset(this.prize.value).creator, amounts.creator)
      }
      this.sendToAkitaEscrow(this.ticketAsset.value, leftover)
      this.sendTicketsOrDisburse(this.marketplace.value, amounts.marketplace)
      this.sendTicketsOrDisburse(marketplace, amounts.marketplace)
      this.sendTicketsOrDisburse(this.seller.value, amounts.seller)
    }

    this.prizeClaimed.value = true
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

  getState(): RaffleState {
    return {
      ticketAsset: this.ticketAsset.value.id,
      startTimestamp: this.startTimestamp.value,
      endTimestamp: this.endTimestamp.value,
      seller: this.seller.value,
      minTickets: this.minTickets.value,
      maxTickets: this.maxTickets.value,
      entryCount: this.entryCount.value,
      ticketCount: this.ticketCount.value,
      winningTicket: this.winningTicket.value,
      winner: this.winner.value,
      prize: this.prize.value,
      prizeClaimed: this.prizeClaimed.value,
      gateID: this.gateID.value,
      vrfFailureCount: this.vrfFailureCount.value,
      entryID: this.entryID.value,
      refundMBRCursor: this.refundMBRCursor.value,
      minEntries: this.minEntries.value,
      failed: this.failed.value,
      raffleRound: this.raffleRound.value,
    }
  }
}

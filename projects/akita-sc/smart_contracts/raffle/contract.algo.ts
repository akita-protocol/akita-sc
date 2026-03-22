import {
  abimethod,
  Account,
  Application,
  arc4,
  assert,
  assertMatch,
  Asset,
  BoxMap,
  bytes,
  clone,
  ensureBudget,
  Global,
  GlobalState,
  gtxn,
  itxn,
  op,
  Txn,
  uint64
} from '@algorandfoundation/algorand-typescript'
import { abiCall, methodSelector, Uint64 } from '@algorandfoundation/algorand-typescript/arc4'
import { classes } from 'polytype'
import { AkitaDAOEscrowAccountRaffles } from '../arc58/dao/constants'
import { GateArgs } from '../gates/types'
import { MAX_UINT64 } from '../utils/constants'
import {
  ERR_INVALID_ASSET,
  ERR_INVALID_PAYMENT,
  ERR_INVALID_TRANSFER,
} from '../utils/errors'
import { calcPercent, createInstantDisbursement, gateCall, gateCheck, getNFTFees, getOtherAppList, getUserImpact, getWalletIDUsingAkitaDAO, impactRange, originOrTxnSender, sendReferralPayment } from '../utils/functions'
import { pcg64Init, pcg64Random } from '../utils/types/lib_pcg/pcg64.algo'
import { FunderInfo } from '../utils/types/mbr'
import { RandomnessBeacon } from '../utils/types/randomness-beacon'
import { RoyaltyAmounts } from '../utils/types/royalties'
import {
  ChunkSize,
  RaffleBoxPrefixEntries,
  RaffleBoxPrefixEntriesByAddress,
  RaffleBoxPrefixWeights,
  RaffleGlobalStateKeyAkitaRoyalty,
  RaffleGlobalStateKeyCreatorRoyalty,
  RaffleGlobalStateKeyEndTimestamp,
  RaffleGlobalStateKeyEntryCount,
  RaffleGlobalStateKeyEntryID,
  RaffleGlobalStateKeyFindWinnersCursor,
  RaffleGlobalStateKeyGateID,
  RaffleGlobalStateKeyIsPrizeBox,
  RaffleGlobalStateKeyMarketplace,
  RaffleGlobalStateKeyMarketplaceRoyalties,
  RaffleGlobalStateKeyMaxTickets,
  RaffleGlobalStateKeyMinTickets,
  RaffleGlobalStateKeyPrize,
  RaffleGlobalStateKeyPrizeClaimed,
  RaffleGlobalStateKeyRaffleRound,
  RaffleGlobalStateKeyRefundMBRCursor,
  RaffleGlobalStateKeySalt,
  RaffleGlobalStateKeySeller,
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
  ERR_ALL_REFUNDS_COMPLETE,
  ERR_ALREADY_ENTERED,
  ERR_ENTRY_DOES_NOT_EXIST,
  ERR_FAILED_GATE,
  ERR_INVALID_ENDING_ROUND,
  ERR_MUST_ALLOCATE_AT_LEAST_FOUR_HIGHEST_BIDS_CHUNKS,
  ERR_MUST_ALLOCATE_AT_MOST_FIFTEEN_HIGHEST_BIDS_CHUNKS,
  ERR_MUST_BE_CALLED_FROM_FACTORY,
  ERR_NO_WINNING_TICKET_YET,
  ERR_NOT_ENOUGH_TIME,
  ERR_NOT_LIVE,
  ERR_PRIZE_ALREADY_CLAIMED,
  ERR_PRIZE_NOT_CLAIMED,
  ERR_RAFFLE_HAS_NOT_ENDED,
  ERR_STILL_HAS_WEIGHTS_BOXES,
  ERR_TICKET_ASSET_ALGO,
  ERR_TICKET_ASSET_NOT_ALGO,
  ERR_WINNER_ALREADY_DRAWN,
  ERR_WINNER_ALREADY_FOUND,
  ERR_REFUNDS_NOT_COMPLETE,
  ERR_WINNER_NOT_FOUND,
  ERR_BAD_METHOD_GATE_NEEDED,
} from './errors'
import { EntryData, FindWinnerCursors, RaffleState } from './types'

// CONTRACT IMPORTS
import { WeightsList } from '../auction/types'
import type { PrizeBox } from '../prize-box/contract.algo'
import { AkitaBaseFeeGeneratorContract } from '../utils/base-contracts/base'
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
  /** the round captured when raffle() is first called, used for VRF */
  raffleRound = GlobalState<uint64>({ initialValue: 0, key: RaffleGlobalStateKeyRaffleRound })

  // BOXES ----------------------------------------------------------------------------------------

  /** The entries for the raffle */
  entries = BoxMap<uint64, EntryData>({ keyPrefix: RaffleBoxPrefixEntries })
  /** weights set for bidders */
  weights = BoxMap<uint64, WeightsList>({ keyPrefix: RaffleBoxPrefixWeights })
  /** The address map of entries for the raffle */
  entriesByAddress = BoxMap<Account, uint64>({ keyPrefix: RaffleBoxPrefixEntriesByAddress })

  // PRIVATE METHODS ------------------------------------------------------------------------------

  private getWinnerWeightBoxInfo(): [uint64, uint64] {
    let startingIndex = this.findWinnerCursors.value.index
    let currentRangeStart = this.findWinnerCursors.value.amountIndex

    for (let i: uint64 = 0; i < this.weightsBoxCount.value; i += 1) {
      const boxStake = this.weightTotals.value[i].asUint64()
      if (this.winningTicket.value < currentRangeStart + boxStake) {
        return [startingIndex, currentRangeStart]
      }

      startingIndex += ChunkSize
      currentRangeStart += boxStake
    }

    return [startingIndex, currentRangeStart]
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
    gateID: uint64,
    marketplace: Account,
    akitaDAO: Application,
    akitaDAOEscrow: Application,
  ): void {
    assert(Global.callerApplicationId !== 0, ERR_MUST_BE_CALLED_FROM_FACTORY)

    this.prize.value = prize
    this.isPrizeBox.value = isPrizeBox
    // ticketAsset 0 represents ALGO tickets, only validate actual ASA
    if (ticketAsset !== 0) {
      assert(Asset(ticketAsset).total > 0, ERR_INVALID_ASSET)
    }
    this.ticketAsset.value = Asset(ticketAsset)
    this.startTimestamp.value = startTimestamp
    assert(endTimestamp > startTimestamp && endTimestamp > Global.latestTimestamp, ERR_INVALID_ENDING_ROUND)
    this.endTimestamp.value = endTimestamp
    this.seller.value = seller
    this.funder.value = clone(funder)
    this.creatorRoyalty.value = creatorRoyalty
    this.minTickets.value = minTickets
    this.maxTickets.value = maxTickets
    this.winner.value = Global.zeroAddress
    this.gateID.value = gateID
    this.marketplace.value = marketplace
    this.akitaDAO.value = akitaDAO
    this.akitaDAOEscrow.value = akitaDAOEscrow

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
    assert(Txn.sender === Global.creatorAddress, ERR_MUST_BE_CALLED_FROM_FACTORY)
    assert(weightListLength >= 4, ERR_MUST_ALLOCATE_AT_LEAST_FOUR_HIGHEST_BIDS_CHUNKS)
    assert(weightListLength < 16, ERR_MUST_ALLOCATE_AT_MOST_FIFTEEN_HIGHEST_BIDS_CHUNKS)

    // Base MBR and asset opt-in MBR are handled by factory before this call
    // This init only expects the weights MBR
    const weightsMBR: uint64 = (weightListLength * this.mbr().weights)

    assertMatch(
      payment,
      {
        receiver: Global.currentApplicationAddress,
        amount: weightsMBR,
      },
      ERR_INVALID_PAYMENT
    )

    this.weightsBoxCount.value = weightListLength
    for (let i: uint64 = 0; i < weightListLength; i += 1) {
      this.weights(i).create()
    }
  }

  refundMBR(iterationAmount: uint64): void {
    /** make sure the prize has been claimed before refunding MBR */
    assert(this.prizeClaimed.value, ERR_PRIZE_NOT_CLAIMED)
    /** make sure we've already found the winner of the raffle */
    assert(this.winner.value !== Global.zeroAddress, ERR_WINNER_NOT_FOUND)
    /** make sure we haven't already refunded all MBR */
    assert(this.entryCount.value !== this.refundMBRCursor.value, ERR_ALL_REFUNDS_COMPLETE)

    const startingIndex = this.refundMBRCursor.value
    const remainder: uint64 = this.entryCount.value - this.refundMBRCursor.value
    iterationAmount = remainder > iterationAmount ? iterationAmount : remainder

    const costs = this.mbr()
    const entryTotalMBR: uint64 = costs.entries + costs.entriesByAddress

    const opUpIterationAmount: uint64 = iterationAmount * 100
    ensureBudget(opUpIterationAmount)

    for (let i = startingIndex; i < startingIndex + iterationAmount; i += 1) {
      const { account } = this.entries(i).value
      this.entries(i).delete()
      this.entriesByAddress(account).delete()
      itxn
        .payment({
          amount: entryTotalMBR,
          receiver: account,
        })
        .submit()
    }

    this.refundMBRCursor.value += iterationAmount
  }

  clearWeightsBoxes(): uint64 {
    assert(this.prizeClaimed.value, ERR_PRIZE_NOT_CLAIMED)

    for (let i: uint64 = 0; i < this.weightsBoxCount.value; i += 1) {
      const ri: uint64 = (this.weightsBoxCount.value - 1) - i
      this.weights(ri).delete()
    }

    const returnAmount: uint64 = this.weightsBoxCount.value * this.mbr().weights

    itxn
      .payment({
        receiver: Global.creatorAddress,
        amount: returnAmount,
      })
      .submit()

    this.weightsBoxCount.value = 0
    return returnAmount
  }

  @abimethod({ allowActions: 'DeleteApplication' })
  deleteApplication(): void {
    assert(Txn.sender === Global.creatorAddress, ERR_MUST_BE_CALLED_FROM_FACTORY)
    assert(this.prizeClaimed.value, ERR_PRIZE_NOT_CLAIMED)
    assert(this.entryCount.value === this.refundMBRCursor.value, ERR_REFUNDS_NOT_COMPLETE)
    assert(this.weightsBoxCount.value === 0, ERR_STILL_HAS_WEIGHTS_BOXES)
  }

  // RAFFLE METHODS -------------------------------------------------------------------------------

  gatedEnter(gateTxn: gtxn.ApplicationCallTxn, payment: gtxn.PaymentTxn, marketplace: Account): void {
    assert(gateCheck(gateTxn, this.akitaDAO.value, Txn.sender, this.gateID.value), ERR_FAILED_GATE)
    this.enter(payment, marketplace)
  }

  enter(
    payment: gtxn.PaymentTxn,
    marketplace: Account
  ): void {
    assert(this.isLive(), ERR_NOT_LIVE)
    assert(this.ticketAsset.value.id === 0, ERR_TICKET_ASSET_NOT_ALGO)

    if (this.gateID.value !== 0) {
      assert(Txn.applicationArgs(0) === methodSelector<typeof Raffle.prototype.gatedEnter>(), ERR_BAD_METHOD_GATE_NEEDED)
    }

    assert(!this.entriesByAddress(Txn.sender).exists, ERR_ALREADY_ENTERED)

    const costs = this.mbr()
    const mbr: uint64 = costs.entries + costs.entriesByAddress

    assertMatch(
      payment,
      {
        receiver: Global.currentApplicationAddress,
        amount: {
          greaterThanEq: (this.minTickets.value + mbr),
          lessThanEq: (this.maxTickets.value + mbr),
        }
      },
      ERR_INVALID_PAYMENT
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

  gatedEnterAsa(gateTxn: gtxn.ApplicationCallTxn, payment: gtxn.PaymentTxn, assetXfer: gtxn.AssetTransferTxn, marketplace: Account): void {
    assert(gateCheck(gateTxn, this.akitaDAO.value, Txn.sender, this.gateID.value), ERR_FAILED_GATE)
    this.enterAsa(payment, assetXfer, marketplace)
  }

  enterAsa(
    payment: gtxn.PaymentTxn,
    assetXfer: gtxn.AssetTransferTxn,
    marketplace: Account
  ): void {
    assert(this.isLive(), ERR_NOT_LIVE)
    assert(this.ticketAsset.value.id !== 0, ERR_TICKET_ASSET_ALGO)

    if (this.gateID.value !== 0) {
      assert(Txn.applicationArgs(0) === methodSelector<typeof Raffle.prototype.gatedEnterAsa>(), ERR_BAD_METHOD_GATE_NEEDED)
    }

    assert(!this.entriesByAddress(Txn.sender).exists, ERR_ALREADY_ENTERED)

    const costs = this.mbr()
    const entryTotalMBR: uint64 = costs.entries + costs.entriesByAddress

    assertMatch(
      payment,
      {
        receiver: Global.currentApplicationAddress,
        amount: entryTotalMBR
      },
      ERR_INVALID_PAYMENT
    )

    assertMatch(
      assetXfer,
      {
        assetReceiver: Global.currentApplicationAddress,
        xferAsset: this.ticketAsset.value,
        assetAmount: {
          greaterThanEq: this.minTickets.value,
          lessThanEq: this.maxTickets.value
        }
      },
      ERR_INVALID_TRANSFER
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

  gatedAdd(gateTxn: gtxn.ApplicationCallTxn, payment: gtxn.PaymentTxn): void {
    assert(gateCheck(gateTxn, this.akitaDAO.value, Txn.sender, this.gateID.value), ERR_FAILED_GATE)
    this.add(payment)
  }
  
  add(payment: gtxn.PaymentTxn): void {
    assert(this.isLive(), ERR_NOT_LIVE)
    assert(this.ticketAsset.value.id === 0, ERR_TICKET_ASSET_NOT_ALGO)

    // if our gate is enabled, this method must be triggered from the gated method instead of directly
    if (this.gateID.value !== 0) {
      assert(Txn.applicationArgs(0) === methodSelector<typeof Raffle.prototype.gatedAdd>(), ERR_BAD_METHOD_GATE_NEEDED)
    }

    assert(this.entriesByAddress(Txn.sender).exists, ERR_ENTRY_DOES_NOT_EXIST)

    const loc = this.entriesByAddress(Txn.sender).value
    const amount = this.weights(loc / ChunkSize).value[loc % ChunkSize]

    assertMatch(
      payment,
      {
        receiver: Global.currentApplicationAddress,
        amount: {
          lessThanEq: (this.maxTickets.value - amount.asUint64())
        }
      },
      ERR_INVALID_PAYMENT
    )

    const newWeights = new Uint64(
      this.weights(loc / ChunkSize).value[loc % ChunkSize].asUint64() + payment.amount
    )
    this.weights(loc / ChunkSize).value[loc % ChunkSize] = newWeights
    const boxAmount = new Uint64(this.weightTotals.value[loc / ChunkSize].asUint64() + payment.amount)
    this.weightTotals.value[loc / ChunkSize] = boxAmount
    this.ticketCount.value += payment.amount
  }

  gatedAddAsa(gateTxn: gtxn.ApplicationCallTxn, assetXfer: gtxn.AssetTransferTxn): void {
    assert(gateCheck(gateTxn, this.akitaDAO.value, Txn.sender, this.gateID.value), ERR_FAILED_GATE)
    this.addAsa(assetXfer)
  }

  addAsa(assetXfer: gtxn.AssetTransferTxn): void {
    assert(this.isLive(), ERR_NOT_LIVE)
    assert(this.ticketAsset.value.id !== 0, ERR_TICKET_ASSET_ALGO)

    // if our gate is enabled, this method must be triggered from the gated method instead of directly
    if (this.gateID.value !== 0) {
      assert(Txn.applicationArgs(0) === methodSelector<typeof Raffle.prototype.gatedAddAsa>(), ERR_BAD_METHOD_GATE_NEEDED)
    }

    assert(this.entriesByAddress(Txn.sender).exists, ERR_ENTRY_DOES_NOT_EXIST)

    const loc = this.entriesByAddress(Txn.sender).value
    const amount = this.weights(loc / ChunkSize).value[loc % ChunkSize]

    assertMatch(
      assetXfer,
      {
        assetReceiver: Global.currentApplicationAddress,
        xferAsset: this.ticketAsset.value,
        assetAmount: {
          lessThanEq: (this.maxTickets.value - amount.asUint64())
        }
      },
      ERR_INVALID_TRANSFER
    )

    const newWeights = new Uint64(
      this.weights(loc / ChunkSize).value[loc % ChunkSize].asUint64() + assetXfer.assetAmount
    )
    this.weights(loc / ChunkSize).value[loc % ChunkSize] = newWeights
    const boxAmount = new Uint64(this.weightTotals.value[loc / ChunkSize].asUint64() + assetXfer.assetAmount)
    this.weightTotals.value[loc / ChunkSize] = boxAmount
    this.ticketCount.value += assetXfer.assetAmount
  }

  raffle(): void {
    assert(Global.latestTimestamp > this.endTimestamp.value, ERR_RAFFLE_HAS_NOT_ENDED)
    assert(this.winningTicket.value === 0, ERR_WINNER_ALREADY_DRAWN)

    if (this.raffleRound.value === 0) {
      this.raffleRound.value = Global.round - 8
    }

    const roundToUse: uint64 = this.raffleRound.value + (4 * this.vrfFailureCount.value)
    assert(Global.round >= roundToUse + 8, ERR_NOT_ENOUGH_TIME)

    const seed = abiCall<typeof RandomnessBeacon.prototype.get>({
      appId: getOtherAppList(this.akitaDAO.value).vrfBeacon,
      args: [roundToUse, this.salt.value],
    }).returnValue

    if (seed.length === 0) {
      this.vrfFailureCount.value += 1
      return
    }

    const rngState = pcg64Init(seed.slice(0, 16))

    // make upper bounds inclusive if we can
    let upperBound = this.ticketCount.value
    if (upperBound < MAX_UINT64) {
      upperBound = upperBound += 1
    }

    const rngResult = pcg64Random(rngState, 1, upperBound, 1)
    this.winningTicket.value = rngResult[1][0].asUint64()
  }

  findWinner(iterationAmount: uint64): void {
    assert(Global.latestTimestamp > this.endTimestamp.value, ERR_RAFFLE_HAS_NOT_ENDED)
    assert(this.winningTicket.value !== 0, ERR_NO_WINNING_TICKET_YET)
    assert(this.winner.value === Global.zeroAddress, ERR_WINNER_ALREADY_FOUND)

    const winningBoxInfo = this.getWinnerWeightBoxInfo()

    // walk the index to find the winner
    const startingIndex = winningBoxInfo[0]
    let currentRangeStart = winningBoxInfo[1]
    let currentRangeEnd: uint64 = 0

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

    this.findWinnerCursors.value.index += iterationAmount
    this.findWinnerCursors.value.amountIndex = currentRangeStart
  }

  claimRafflePrize(): void {
    assert(this.winner.value !== Global.zeroAddress, ERR_WINNER_NOT_FOUND)
    assert(!this.prizeClaimed.value, ERR_PRIZE_ALREADY_CLAIMED)

    // give the winner the prize
    if (this.isPrizeBox.value) {
      abiCall<typeof PrizeBox.prototype.transfer>({
        appId: this.prize.value,
        args: [this.winner.value],
      })
    } else {
      const prizeAmount = op.AssetHolding.assetBalance(Global.currentApplicationAddress, this.prize.value)[0]

      if (this.winner.value.isOptedIn(Asset(this.prize.value))) {
        itxn
          .assetTransfer({
            assetCloseTo: this.winner.value,
            xferAsset: this.prize.value,
          })
          .submit()
      } else {
        createInstantDisbursement(
          this.akitaDAO.value,
          this.prize.value,
          0,
          MAX_UINT64,
          [{ address: this.winner.value, amount: prizeAmount }],
          prizeAmount,
          true
        )
      }
    }

    const amounts = this.getAmounts(this.ticketCount.value, this.isPrizeBox.value)

    const loc = this.entriesByAddress(this.winner.value).value
    const marketplace = this.entries(loc).value.marketplace

    if (this.ticketAsset.value.id === 0) {

      if (amounts.creator > 0) {
        // pay the nft creator
        itxn
          .payment({
            receiver: Asset(this.prize.value).creator,
            amount: amounts.creator,
          })
          .submit()
      }

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

      itxn
        .payment({
          receiver: this.marketplace.value,
          amount: amounts.marketplace,
        })
        .submit()

      itxn
        .payment({
          receiver: marketplace,
          amount: amounts.marketplace,
        })
        .submit()

      itxn
        .payment({
          receiver: this.seller.value,
          amount: amounts.seller,
        })
        .submit()

    } else {

      if (amounts.creator > 0) {
        if (Asset(this.prize.value).creator.isOptedIn(this.ticketAsset.value)) {
          itxn
            .assetTransfer({
              assetReceiver: Asset(this.prize.value).creator,
              assetAmount: amounts.creator,
              xferAsset: this.ticketAsset.value,
            })
            .submit()
        } else {
          createInstantDisbursement(
            this.akitaDAO.value,
            this.ticketAsset.value.id,
            0,
            MAX_UINT64,
            [{ address: Asset(this.prize.value).creator, amount: amounts.creator }],
            amounts.creator,
            false
          )
        }
      }

      // pay akita fee (referral + escrow)
      let leftover: uint64 = amounts.akita
      if (amounts.akita > 0) {
        ({ leftover } = sendReferralPayment(this.akitaDAO.value, this.ticketAsset.value.id, amounts.akita))
      }

      if (this.akitaDAOEscrow.value.address.isOptedIn(this.ticketAsset.value)) {
        itxn
          .assetTransfer({
            assetReceiver: this.akitaDAOEscrow.value.address,
            assetAmount: leftover,
            xferAsset: this.ticketAsset.value,
          })
          .submit()
      } else {
        this.optAkitaEscrowInAndSend(
          AkitaDAOEscrowAccountRaffles,
          this.ticketAsset.value,
          leftover,
        )
      }

      if (this.marketplace.value.isOptedIn(this.ticketAsset.value)) {
        itxn
          .assetTransfer({
            assetReceiver: this.marketplace.value,
            assetAmount: amounts.marketplace,
            xferAsset: this.ticketAsset.value,
          })
          .submit()
      } else {
        createInstantDisbursement(
          this.akitaDAO.value,
          this.ticketAsset.value.id,
          0,
          MAX_UINT64,
          [{ address: this.marketplace.value, amount: amounts.marketplace }],
          amounts.marketplace,
          false
        )
      }

      if (marketplace.isOptedIn(this.ticketAsset.value)) {
        itxn
          .assetTransfer({
            assetReceiver: marketplace,
            assetAmount: amounts.marketplace,
            xferAsset: this.ticketAsset.value,
          })
          .submit()
      } else {
        createInstantDisbursement(
          this.akitaDAO.value,
          this.ticketAsset.value.id,
          0,
          MAX_UINT64,
          [{ address: marketplace, amount: amounts.marketplace }],
          amounts.marketplace,
          false
        )
      }

      if (this.seller.value.isOptedIn(this.ticketAsset.value)) {
        itxn
          .assetTransfer({
            assetReceiver: this.seller.value,
            assetAmount: amounts.seller,
            xferAsset: this.ticketAsset.value,
          })
          .submit()
      } else {
        createInstantDisbursement(
          this.akitaDAO.value,
          this.ticketAsset.value.id,
          0,
          MAX_UINT64,
          [{ address: this.seller.value, amount: amounts.seller }],
          amounts.seller,
          false
        )
      }
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
    }
  }
}

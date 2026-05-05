import {
  Account,
  Application,
  Asset,
  BoxMap,
  Bytes,
  bytes,
  clone,
  Global,
  GlobalState,
  gtxn,
  itxn,
  loggedAssert,
  Txn,
  uint64,
} from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod, decodeArc4, methodSelector } from '@algorandfoundation/algorand-typescript/arc4'
import { AssetHolding, itob, sha256 } from '@algorandfoundation/algorand-typescript/op'
import { classes } from 'polytype'
import { RootKey } from '../meta-merkles/types'
import { MinDisbursementsMBR, UserAllocationMBR } from '../rewards/constants'
import { UserAllocation } from '../rewards/types'
import { StakingType } from '../staking/types'
import { BoxCostPerByte, MAX_UINT64 } from '../utils/constants'
import { calcPercent, gateCheck, getAkitaAppList, getAkitaSocialAppList, getGateArgs, getOtherAppList, getStakingFees, getUserImpact, getWalletIDUsingAkitaDAO, impactRange, originOr, originOrTxnSender, percentageOf, splitOptInCount } from '../utils/functions'
import { pcg64Init, pcg64Random } from '../utils/types/lib_pcg/pcg64.algo'

import {
  DisbursementPhaseAllocation,
  DisbursementPhaseFinalization,
  DisbursementPhaseIdle,
  DisbursementPhasePreparation,
  DistributionTypeEven,
  DistributionTypeFlat,
  DistributionTypePercentage,
  DistributionTypeShuffle,
  MaxGlobalStateUint64Array,
  POOL_STAKING_TYPE_HEARTBEAT,
  POOL_STAKING_TYPE_NONE,
  POOL_STAKING_TYPE_SOFT,
  PoolBoxPrefixDisbursements,
  PoolBoxPrefixEntries,
  PoolBoxPrefixEntriesByAddress,
  PoolBoxPrefixRewards,
  PoolEntriesByAddressMBR,
  PoolEntriesMBR,
  PoolGlobalStateKeyAkitaRoyalty,
  PoolGlobalStateKeyAkitaRoyaltyAmount,
  PoolGlobalStateKeyAllowLateSignups,
  PoolGlobalStateKeyCreator,
  PoolGlobalStateKeyEndTimestamp,
  PoolGlobalStateKeyEntryCount,
  PoolGlobalStateKeyGateID,
  PoolGlobalStateKeyGateSize,
  PoolGlobalStateKeyMarketplace,
  PoolGlobalStateKeyMarketplaceRoyalties,
  PoolGlobalStateKeyMaxEntries,
  PoolGlobalStateKeyMinimumStakeAmount,
  PoolGlobalStateKeyRewardCount,
  PoolGlobalStateKeySalt,
  PoolGlobalStateKeySignupTimestamp,
  PoolGlobalStateKeyStakeKey,
  PoolGlobalStateKeyStartTimestamp,
  PoolGlobalStateKeyStatus,
  PoolGlobalStateKeyTitle,
  PoolGlobalStateKeyTotalStaked,
  PoolGlobalStateKeyType,
  PoolGlobalStateKeyUniques,
  PoolStatusDraft,
  PoolStatusFinal,
  PoolUniquesMBR,
  WinnerCountCap,
} from './constants'
import {
  ERR_CREATOR_ONLY_DELETE,
  ERR_CREATOR_ONLY_FINALIZE,
  ERR_DAO_NOT_OPTED_IN,
  ERR_DISBURSEMENT_NOT_READY_FOR_FINALIZATION,
  ERR_DISTRIBUTION_WINDOW_NOT_OPEN,
  ERR_FACTORY_ONLY_DELETE,
  ERR_FACTORY_ONLY_INIT,
  ERR_FAILED_GATE,
  ERR_FAILED_STAKE_VERIFY,
  ERR_FORBIDDEN,
  ERR_GATE_ID_NOT_SET,
  ERR_GATE_ID_SET,
  ERR_INVALID_DISBURSEMENT_PHASE,
  ERR_INVALID_END_TIMESTAMP,
  ERR_INVALID_PAYMENT,
  ERR_INVALID_POOL_TYPE_FOR_CHECK,
  ERR_INVALID_SIGNUP_TIMESTAMP,
  ERR_INVALID_START_TIMESTAMP,
  ERR_INVALID_START_ZERO_REQUIRES_LATE,
  ERR_INVALID_TRANSFER,
  ERR_MAX_ENTRIES_CANNOT_BE_GREATER_THAN_RATE,
  ERR_NOT_ALGO,
  ERR_NOT_ENOUGH_FUNDS,
  ERR_NOT_READY_TO_DISBURSE,
  ERR_POOL_MAX_ENTRIES_REACHED,
  ERR_POOL_MUST_BE_DRAFT,
  ERR_POOL_NOT_DRAFT_OR_ENDED,
  ERR_POOL_NOT_LIVE,
  ERR_QUANTITY_BELOW_MIN_STAKE,
  ERR_RATE_MUST_BE_GREATER_THAN_WINNER_COUNT,
  ERR_RATE_MUST_BE_GREATER_THAN_ZERO,
  ERR_REWARD_ALREADY_IN_DISBURSEMENT,
  ERR_REWARD_NOT_FOUND,
  ERR_SIGNUPS_NOT_OPEN,
  ERR_STAKE_KEY_REQUIRED,
  ERR_UNKNOWN_REWARD_RATE_TYPE,
  ERR_USER_BALANCE_TOO_LOW,
  ERR_USER_STAKE_TOO_LOW,
  ERR_WINNING_TICKETS_ALREADY_EXIST,
} from './errors'
import {
  AddRewardParams,
  DistributionType,
  EntryData,
  EntryKey,
  Reward,
  StakeEntry,
  StakingPoolStakingType,
  StakingPoolState,
  StakingPoolStatus,
} from './types'

import { FunderInfo } from '../utils/types/mbr'

// CONTRACT IMPORTS
import { Gate } from '../gates/contract.algo'
import { GateArgs } from '../gates/types'
import type { MetaMerkles } from '../meta-merkles/contract.algo'
import type { Rewards } from '../rewards/contract.algo'
import type { Staking } from '../staking/contract.algo'
import { AkitaBaseFeeGeneratorContract, EscrowConfig } from '../utils/base-contracts/base'
import { ChildContract } from '../utils/base-contracts/child'
import type { RandomnessBeacon } from '../utils/types/randomness-beacon'
import { BaseStakingPool } from './base'

const MERKLE_TREE_TYPE_ASSET: uint64 = 1

export class StakingPool extends classes(
  BaseStakingPool,
  AkitaBaseFeeGeneratorContract,
  ChildContract
) {

  // GLOBAL STATE ---------------------------------------------------------------------------------

  /** the status the pool is in */
  status = GlobalState<StakingPoolStatus>({ key: PoolGlobalStateKeyStatus })
  /** title of the staking pool */
  title = GlobalState<string>({ key: PoolGlobalStateKeyTitle })
  /** the method of staking to be used for the pool */
  type = GlobalState<StakingPoolStakingType>({ key: PoolGlobalStateKeyType })
  /** the timestamp when sign ups for the pool are allowed */
  signupTimestamp = GlobalState<uint64>({ initialValue: 0, key: PoolGlobalStateKeySignupTimestamp })
  /** whether signups are allowed after the staking pool begins */
  allowLateSignups = GlobalState<boolean>({ initialValue: false, key: PoolGlobalStateKeyAllowLateSignups })
  /** the timestamp when the pool starts */
  startTimestamp = GlobalState<uint64>({ initialValue: 0, key: PoolGlobalStateKeyStartTimestamp })
  /** the timestamp when the pool ends */
  endTimestamp = GlobalState<uint64>({ initialValue: 0, key: PoolGlobalStateKeyEndTimestamp })
  /** the maximum entries allowed for the pool */
  maxEntries = GlobalState<uint64>({ key: PoolGlobalStateKeyMaxEntries })
  /** the number of entries in a pool */
  entryID = GlobalState<uint64>({ initialValue: 1, key: PoolGlobalStateKeyEntryCount })
  /** the number of rewards for the pool */
  rewardID = GlobalState<uint64>({ initialValue: 1, key: PoolGlobalStateKeyRewardCount })
  /** the total amount staked in the pool */
  totalStaked = GlobalState<uint64>({ initialValue: 0, key: PoolGlobalStateKeyTotalStaked })
  /**
   * the name for the meta merkle asset group to validate staking
   * stake key can be empty if distribution !== DistributionTypePercentage
   */
  stakeKey = GlobalState<RootKey>({ key: PoolGlobalStateKeyStakeKey })
  /** minimum stake amount */
  minimumStakeAmount = GlobalState<uint64>({ key: PoolGlobalStateKeyMinimumStakeAmount })
  /** the gate id of the pool */
  gateID = GlobalState<uint64>({ key: PoolGlobalStateKeyGateID })
  /** the size of the gate were using */
  gateSize = GlobalState<uint64>({ key: PoolGlobalStateKeyGateSize })
  /** the address of the creator of the staking pool */
  creator = GlobalState<Account>({ key: PoolGlobalStateKeyCreator })
  /** marketplace is pool creation side marketplace */
  marketplace = GlobalState<Account>({ key: PoolGlobalStateKeyMarketplace })
  /** the amount the marketplaces will get for the sale */
  marketplaceRoyalties = GlobalState<uint64>({ key: PoolGlobalStateKeyMarketplaceRoyalties })
  /** the akita royalty for the pool */
  akitaRoyalty = GlobalState<uint64>({ key: PoolGlobalStateKeyAkitaRoyalty })
  /** the amount of royalties that were paid in a disbursement */
  akitaRoyaltyAmount = GlobalState<uint64>({ key: PoolGlobalStateKeyAkitaRoyaltyAmount })
  /** salt for randomness */
  salt = GlobalState<bytes<32>>({ key: PoolGlobalStateKeySalt })

  // BOXES ----------------------------------------------------------------------------------------

  /** indexed entries for efficient iteration */
  entries = BoxMap<uint64, EntryData>({ keyPrefix: PoolBoxPrefixEntries })
  /** the number of unique asset entries by address */
  uniques = BoxMap<Account, uint64>({ keyPrefix: PoolGlobalStateKeyUniques })
  /** the entries in the pool */
  entriesByAddress = BoxMap<EntryKey, uint64>({ keyPrefix: PoolBoxPrefixEntriesByAddress })
  /** the rewards for this staking pool */
  rewards = BoxMap<uint64, Reward>({ keyPrefix: PoolBoxPrefixRewards })
  /** the disbursements this pool as created & finalized */
  disbursements = BoxMap<uint64, bytes<0>>({ keyPrefix: PoolBoxPrefixDisbursements })


  // PRIVATE METHODS ------------------------------------------------------------------------------

  private newEntryID(): uint64 {
    const id = this.entryID.value
    this.entryID.value += 1
    return id
  }

  private newRewardID(): uint64 {
    const id = this.rewardID.value
    this.rewardID.value += 1
    return id
  }

  private payAkitaRoyalty(distribution: DistributionType, rate: uint64, asset: uint64, qualifiedStakers: uint64): void {
    let amount: uint64 = 0
    if (distribution === DistributionTypeFlat) {
      amount = calcPercent((qualifiedStakers * rate), this.akitaRoyalty.value)
    } else {
      amount = calcPercent(rate, this.akitaRoyalty.value)
    }

    this.akitaRoyaltyAmount.value = amount

    // Skip payment if royalty amount is 0
    if (amount === 0) {
      return
    }

    // pay the akita dao
    if (asset === 0) {
      itxn
        .payment({
          receiver: this.akitaDAOEscrow.value.app.address,
          amount,
        })
        .submit()
    } else {
      loggedAssert(this.akitaDAOEscrow.value.app.address.isOptedIn(Asset(asset)), ERR_DAO_NOT_OPTED_IN)

      itxn
        .assetTransfer({
          assetReceiver: this.akitaDAOEscrow.value.app.address,
          assetAmount: amount,
          xferAsset: asset,
        })
        .submit()
    }
  }

  private processPreparationPhase(rewardID: uint64, iterationAmount: uint64): void {
    const { disbursementCursor, distribution, rate, asset, activeDisbursementID, winnerCount } = this.rewards(rewardID).value
    let count: uint64 = 0
    let total: uint64 = 0

    if ((disbursementCursor + iterationAmount) > this.entryID.value) {
      iterationAmount = this.entryID.value - disbursementCursor
    }

    for (let id = disbursementCursor; id < (disbursementCursor + iterationAmount); id++) {
      const { disqualified, quantity } = clone(this.entries(id).value)
      if (disqualified) {
        continue
      }

      // if its not avg based, this check will disqualify the entry if necessary
      const { valid } = this.getStakeValue(id)
      if (!valid) {
        continue
      }

      count += 1
      total += quantity
    }

    this.rewards(rewardID).value.qualifiedStakers += count
    this.rewards(rewardID).value.qualifiedStake += total

    if (this.entryID.value === disbursementCursor) {
      // end the phase & payout royalties
      this.rewards(rewardID).value.phase = DisbursementPhaseAllocation
      this.rewards(rewardID).value.disbursementCursor = 1 // Entry IDs start at 1

      let allocationCount = this.rewards(rewardID).value.qualifiedStakers
      if (distribution === DistributionTypeShuffle) {
        allocationCount = winnerCount
      }

      this.fundRewardMbrCredits(activeDisbursementID, allocationCount)
      this.payAkitaRoyalty(distribution, rate, asset, this.rewards(rewardID).value.qualifiedStakers)
    } else {
      // update the reward state for the next iteration
      this.rewards(rewardID).value.disbursementCursor += iterationAmount
    }
  }

  private createPercentageDisbursement(rewardID: uint64, iterationAmount: uint64): void {
    const {
      asset,
      disbursementCursor,
      activeDisbursementID,
      qualifiedStake,
      rate: amount
    } = this.rewards(rewardID).value

    if ((disbursementCursor + iterationAmount) > this.entryID.value) {
      iterationAmount = this.entryID.value - disbursementCursor
    }

    const actualAmount: uint64 = amount - this.akitaRoyaltyAmount.value
    let allocations: UserAllocation[] = []
    let sum: uint64 = 0

    for (let id = disbursementCursor; id < (disbursementCursor + iterationAmount); id++) {
      const { disqualified, quantity, address } = this.entries(id).value
      if (disqualified) {
        continue
      }

      const individualAmount = calcPercent(actualAmount, percentageOf(quantity, qualifiedStake))
      allocations.push({ address, amount: individualAmount })
      sum += individualAmount
    }

    this.rewards(rewardID).value.disbursementCursor += iterationAmount

    this.createRewardAllocations(activeDisbursementID, asset, allocations, sum)

    if (this.entryID.value === (disbursementCursor + iterationAmount)) {
      this.rewards(rewardID).value.phase = DisbursementPhaseFinalization
      this.rewards(rewardID).value.disbursementCursor = 1 // Entry IDs start at 1
    }
  }

  private createFlatDisbursement(rewardID: uint64, iterationAmount: uint64): void {
    const {
      activeDisbursementID,
      disbursementCursor,
      qualifiedStakers,
      rate: amount,
      asset
    } = this.rewards(rewardID).value

    const total: uint64 = (qualifiedStakers * amount) - this.akitaRoyaltyAmount.value
    const percentageAkitaFee = calcPercent(amount, this.akitaRoyalty.value)
    const adjustedAmount: uint64 = amount - percentageAkitaFee

    // For ALGO (asset=0), use contract balance; for ASAs, use AssetHolding
    let balance: uint64
    if (asset === 0) {
      balance = Global.currentApplicationAddress.balance
    } else {
      [balance] = AssetHolding.assetBalance(Global.currentApplicationAddress, asset)
    }

    loggedAssert(balance >= total, ERR_NOT_ENOUGH_FUNDS)

    if ((disbursementCursor + iterationAmount) > this.entryID.value) {
      iterationAmount = this.entryID.value - disbursementCursor
    }

    let allocations: UserAllocation[] = []
    let sum: uint64 = 0

    for (let id = disbursementCursor; id < (disbursementCursor + iterationAmount); id++) {
      const { disqualified, address } = this.entries(id).value
      if (disqualified) {
        continue
      }

      allocations.push({ address, amount: adjustedAmount })
      sum += adjustedAmount
    }

    const newCursorValue: uint64 = disbursementCursor + iterationAmount
    this.rewards(rewardID).value.disbursementCursor = newCursorValue
    this.createRewardAllocations(activeDisbursementID, asset, allocations, sum)

    if (this.entryID.value === newCursorValue) {
      this.rewards(rewardID).value.phase = DisbursementPhaseFinalization
      this.rewards(rewardID).value.disbursementCursor = 1 // Entry IDs start at 1
    }
  }

  private createEvenDisbursement(rewardID: uint64, iterationAmount: uint64): void {
    const {
      activeDisbursementID,
      disbursementCursor,
      qualifiedStakers,
      asset,
      rate
    } = this.rewards(rewardID).value

    // For ALGO (asset=0), use contract balance; for ASAs, use AssetHolding
    let balance: uint64
    if (asset === 0) {
      balance = Global.currentApplicationAddress.balance
    } else {
      balance = AssetHolding.assetBalance(Global.currentApplicationAddress, asset)[0]
    }
    const actualSum: uint64 = rate - this.akitaRoyaltyAmount.value
    loggedAssert(balance >= actualSum, ERR_NOT_ENOUGH_FUNDS)

    if ((disbursementCursor + iterationAmount) > this.entryID.value) {
      iterationAmount = this.entryID.value - disbursementCursor
    }

    const amount: uint64 = actualSum / qualifiedStakers
    let allocations: UserAllocation[] = []
    let allocSum: uint64 = 0
    for (let id = disbursementCursor; id < (disbursementCursor + iterationAmount); id++) {
      const { disqualified, address } = this.entries(id).value
      if (disqualified) {
        continue
      }

      allocations.push({ address, amount })
      allocSum += amount
    }

    const newCursorValue: uint64 = disbursementCursor + iterationAmount
    this.rewards(rewardID).value.disbursementCursor = newCursorValue
    this.createRewardAllocations(activeDisbursementID, asset, allocations, allocSum)

    if (this.entryID.value === newCursorValue) {
      this.rewards(rewardID).value.phase = DisbursementPhaseFinalization
      this.rewards(rewardID).value.disbursementCursor = 1 // Entry IDs start at 1
    }
  }

  private createShuffleDisbursement(rewardID: uint64, iterationAmount: uint64): void {
    const {
      activeDisbursementID,
      disbursementCursor,
      winnerCount,
      winningTickets: tickets,
      asset,
      rate: sum,
      raffleCursor,
    } = clone(this.rewards(rewardID).value)

    // For ALGO (asset=0), use contract balance; for ASAs, use AssetHolding
    let balance: uint64
    if (asset === 0) {
      balance = Global.currentApplicationAddress.balance
    } else {
      balance = AssetHolding.assetBalance(Global.currentApplicationAddress, asset)[0]
    }
    const actualSum: uint64 = sum - this.akitaRoyaltyAmount.value
    loggedAssert(balance >= actualSum, ERR_NOT_ENOUGH_FUNDS)

    if ((disbursementCursor + iterationAmount) > this.entryID.value) {
      iterationAmount = this.entryID.value - disbursementCursor
    }

    let amount = actualSum
    if (winnerCount > 0) {
      amount = actualSum / winnerCount
    }

    let { stake, ticket, disbursed } = raffleCursor
    let currentTicket = tickets[ticket]
    let currentRangeStart = stake
    let currentRangeEnd: uint64 = 0

    let allocations: UserAllocation[] = []
    for (let i = disbursementCursor; i < (disbursementCursor + iterationAmount); i++) {
      const { disqualified, address, asset, quantity } = this.entries(i).value

      currentRangeEnd = currentRangeStart + quantity
      if (currentTicket >= currentRangeStart && currentTicket <= currentRangeEnd) {
        if (!disqualified) {
          allocations.push({ address, amount })
          disbursed++
        }

        if (ticket === tickets.length - 1) {
          // we didnt find enough winners, reset raffle
          if (winnerCount !== disbursed) {
            this.rewards(rewardID).value.disbursementCursor = 1 // Entry IDs start at 1
            this.rewards(rewardID).value.raffleCursor = {
              ticket: 0,
              stake: 0,
              disbursed: 0,
            }
            this.rewards(rewardID).value.winningTickets = []
            this.createRewardAllocations(activeDisbursementID, asset, allocations, sum)
            return
          }
          break
        }

        iterationAmount -= i
        ticket++
        currentTicket = tickets[ticket]
        this.rewards(rewardID).value.disbursementCursor = 1 // Entry IDs start at 1
        i = 0
        stake = 0
        currentRangeEnd = 0
      }
      currentRangeStart = currentRangeEnd + 1
    }

    this.createRewardAllocations(activeDisbursementID, asset, allocations, sum)

    if (winnerCount === disbursed) {
      this.rewards(rewardID).value.phase = DisbursementPhaseFinalization
      this.rewards(rewardID).value.disbursementCursor = 1 // Entry IDs start at 1
      this.rewards(rewardID).value.raffleCursor = {
        ticket: 0,
        stake: 0,
        disbursed: 0,
      }
      this.rewards(rewardID).value.winningTickets = []
    } else {
      this.rewards(rewardID).value.disbursementCursor += iterationAmount
      this.rewards(rewardID).value.raffleCursor = { ticket, stake, disbursed }
    }
  }

  private checkByID(id: uint64): { valid: boolean, balance: uint64 } {
    loggedAssert(
      this.type.value !== POOL_STAKING_TYPE_NONE || this.type.value !== POOL_STAKING_TYPE_HEARTBEAT,
      ERR_INVALID_POOL_TYPE_FOR_CHECK
    )

    const { disqualified, address, asset, quantity } = this.entries(id).value

    if (disqualified) {
      return { valid: false, balance: 0 }
    }

    if (this.type.value === POOL_STAKING_TYPE_SOFT) {
      const check = abiCall<typeof Staking.prototype.softCheck>({
        appId: getAkitaAppList(this.akitaDAO.value).staking,
        args: [address, asset],
      }).returnValue

      if (check.balance >= quantity) {
        return { valid: true, balance: check.balance }
      }
    } else {
      const info = abiCall<typeof Staking.prototype.getInfo>({
        appId: getAkitaAppList(this.akitaDAO.value).staking,
        args: [
          address,
          {
            asset: asset,
            type: this.type.value,
          },
        ],
      }).returnValue

      if (info.amount >= quantity) {
        return { valid: true, balance: info.amount }
      }
    }

    this.entries(id).value.disqualified = true
    return { valid: false, balance: 0 }
  }

  private getLatestWindowStart(interval: uint64): uint64 {
    return Global.latestTimestamp - ((Global.latestTimestamp - this.startTimestamp.value) % interval)
  }

  private validWindow(interval: uint64, last: uint64): boolean {
    const latestWindowStart = this.getLatestWindowStart(interval)
    return latestWindowStart !== Global.latestTimestamp && last < latestWindowStart
  }

  private getStakeValue(id: uint64): { valid: boolean, balance: uint64 } {
    if (this.type.value === POOL_STAKING_TYPE_NONE) {
      return { valid: true, balance: 0 }
    } else if (this.type.value === POOL_STAKING_TYPE_HEARTBEAT) {
      const { address, asset } = this.entries(id).value

      const avg = abiCall<typeof Staking.prototype.getHeartbeatAverage>({
        appId: getAkitaAppList(this.akitaDAO.value).staking,
        args: [address, asset, true],
      }).returnValue

      return { valid: true, balance: avg }
    }

    return this.checkByID(id)
  }

  private createRewards(title: string, timeToUnlock: uint64, expiration: uint64): uint64 {

    const rewardsApp = Application(getAkitaAppList(this.akitaDAO.value).rewards)
    const rewardMBR: uint64 = MinDisbursementsMBR + (BoxCostPerByte * Bytes(title).length)

    const mbrPayment = itxn.payment({
      receiver: rewardsApp.address,
      amount: rewardMBR,
    })

    return abiCall<typeof Rewards.prototype.createDisbursement>({
      appId: rewardsApp,
      args: [
        mbrPayment,
        title,
        timeToUnlock,
        expiration,
        '',
      ],
    }).returnValue
  }

  private fundRewardMbrCredits(disbursementID: uint64, allocationCount: uint64): void {
    const rewardsApp = Application(getAkitaAppList(this.akitaDAO.value).rewards)
    const mbrAmount: uint64 = UserAllocationMBR * allocationCount

    if (mbrAmount === 0) {
      return
    }

    abiCall<typeof Rewards.prototype.fundMbrCredits>({
      appId: rewardsApp,
      args: [
        disbursementID,
        itxn.payment({
          receiver: rewardsApp.address,
          amount: mbrAmount,
        }),
      ],
    })
  }

  private createRewardAllocations(
    disbursementID: uint64,
    asset: uint64,
    allocations: UserAllocation[],
    sum: uint64
  ): void {

    const rewardsApp = Application(getAkitaAppList(this.akitaDAO.value).rewards)

    if (asset === 0) {
      // ALGO allocations
      abiCall<typeof Rewards.prototype.createUserAllocations>({
        appId: rewardsApp,
        args: [
          itxn.payment({
            receiver: rewardsApp.address,
            amount: sum,
          }),
          disbursementID,
          allocations,
        ],
      })
    } else {
      // ASA allocations
      abiCall<typeof Rewards.prototype.createAsaUserAllocations>({
        appId: rewardsApp,
        args: [
          itxn.assetTransfer({
            assetReceiver: rewardsApp.address,
            xferAsset: asset,
            assetAmount: sum,
          }),
          disbursementID,
          allocations,
        ],
      })
    }
  }

  private finalizeRewards(disbursementID: uint64): void {
    const rewardsApp = Application(getAkitaAppList(this.akitaDAO.value).rewards)

    abiCall<typeof Rewards.prototype.finalizeDisbursement>({
      appId: rewardsApp,
      args: [disbursementID],
    })
  }

  private validateReward(reward: AddRewardParams): void {
    // stake key is optional if the distribution type is not percentage based
    // we use this to qualify stakes for the pool but in some cases users may
    // want to distribute rewards on something else like subscription status
    // or impact score. In these cases the gate is the only requirement
    // and the stake key is not needed
    loggedAssert(
      this.stakeKey.value.address !== Global.zeroAddress || reward.distribution !== DistributionTypePercentage,
      ERR_STAKE_KEY_REQUIRED
    )

    // rate needs to be greater than the number of winners we want to pick for shuffles
    if (reward.distribution === DistributionTypeShuffle) {
      loggedAssert(reward.rate > reward.winnerCount && reward.winnerCount <= WinnerCountCap, ERR_RATE_MUST_BE_GREATER_THAN_WINNER_COUNT)
    }

    // if we're distributing evenly, the max entries must be less than or equal to the rate
    if (reward.distribution === DistributionTypeEven) {
      loggedAssert(this.maxEntries.value === 0 || this.maxEntries.value <= reward.rate, ERR_MAX_ENTRIES_CANNOT_BE_GREATER_THAN_RATE)
    }

    loggedAssert(reward.rate > 0, ERR_RATE_MUST_BE_GREATER_THAN_ZERO)
  }

  private createPoolEntries(payment: gtxn.PaymentTxn, entries: StakeEntry[], gateArgs: GateArgs): void {
    loggedAssert(this.signUpsOpen(), ERR_SIGNUPS_NOT_OPEN)

    loggedAssert(
      (this.entryID.value + 1) <= this.maxEntries.value ||
      this.maxEntries.value === 0,
      ERR_POOL_MAX_ENTRIES_REACHED
    )

    // Verify payment for box storage (increased for additional box)
    const entryMBR: uint64 = PoolEntriesMBR + PoolEntriesByAddressMBR
    let total: uint64 = entryMBR * entries.length
    if (!this.uniques(Txn.sender).exists) {
      total += PoolUniquesMBR
    }

    loggedAssert(payment.receiver === Global.currentApplicationAddress, ERR_INVALID_PAYMENT)
    loggedAssert(payment.amount >= total, ERR_INVALID_PAYMENT)

    const { address, name } = this.stakeKey.value

    for (let i: uint64 = 0; i < entries.length; i++) {
      loggedAssert(entries[i].quantity >= this.minimumStakeAmount.value, ERR_QUANTITY_BELOW_MIN_STAKE)

      if (address !== Global.zeroAddress) {
        const verified = abiCall<typeof MetaMerkles.prototype.verify>({
          appId: getAkitaAppList(this.akitaDAO.value).metaMerkles,
          args: [
            address,
            name,
            sha256(sha256(itob(entries[i].asset))),
            entries[i].proof,
            MERKLE_TREE_TYPE_ASSET,
          ],
        }).returnValue

        loggedAssert(verified, ERR_FAILED_STAKE_VERIFY)
      }

      // check their actual balance if the assets aren't escrowed
      if (
        this.type.value === POOL_STAKING_TYPE_HEARTBEAT ||
        this.type.value === POOL_STAKING_TYPE_SOFT
      ) {
        let balance: uint64 = 0
        let optedIn: boolean = false;
        if (entries[i].asset !== 0) {
          ([balance, optedIn] = AssetHolding.assetBalance(Txn.sender, entries[i].asset))
        } else {
          optedIn = true
          balance = Txn.sender.balance
        }
        loggedAssert(optedIn && balance >= entries[i].quantity, ERR_USER_BALANCE_TOO_LOW)
      }

      // Skip staking check for NONE type pools
      if (this.type.value !== POOL_STAKING_TYPE_NONE) {
        const stakeInfo = abiCall<typeof Staking.prototype.getInfo>({
          appId: getAkitaAppList(this.akitaDAO.value).staking,
          args: [
            Txn.sender,
            {
              asset: entries[i].asset,
              type: this.type.value,
            },
          ],
        }).returnValue

        loggedAssert(stakeInfo.amount >= entries[i].quantity, ERR_USER_STAKE_TOO_LOW)
      }

      const entryID = this.newEntryID()
      this.entries(entryID).value = {
        address: Txn.sender,
        asset: entries[i].asset,
        quantity: entries[i].quantity,
        gateArgs: clone(gateArgs),
        disqualified: false
      }

      const aKey = {
        address: Txn.sender,
        asset: entries[i].asset,
      }

      this.entriesByAddress(aKey).value = entryID
      if (!this.uniques(Txn.sender).exists) {
        this.uniques(Txn.sender).value = entries.length  // or any non-zero value
      }
    }
  }

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  create(
    title: string,
    type: StakingType,
    creator: Account,
    funder: FunderInfo,
    marketplace: Account,
    stakeKey: RootKey,
    minimumStakeAmount: uint64,
    allowLateSignups: boolean,
    gateID: uint64,
    maxEntries: uint64,
    akitaDAO: Application,
    akitaDAOEscrow: EscrowConfig,
  ): void {
    this.status.value = PoolStatusDraft
    this.title.value = title
    this.type.value = type
    this.creator.value = creator
    this.funder.value = clone(funder)
    this.marketplace.value = marketplace

    this.stakeKey.value = clone(stakeKey)
    this.minimumStakeAmount.value = minimumStakeAmount
    this.allowLateSignups.value = allowLateSignups
    this.gateID.value = gateID
    this.maxEntries.value = maxEntries

    this.salt.value = Txn.txId
    this.akitaDAO.value = akitaDAO
    this.akitaDAOEscrow.value = clone(akitaDAOEscrow)

    const fees = getStakingFees(this.akitaDAO.value)

    const { impact: impactApp } = getAkitaSocialAppList(this.akitaDAO.value);
    // Only get user impact if impact app is configured
    let impact: uint64 = 0;
    if (impactApp !== 0) {
      impact = getUserImpact(this.akitaDAO.value, this.creator.value)
    }
    this.akitaRoyalty.value = impactRange(impact, fees.impactTaxMin, fees.impactTaxMax)
  }

  init() {
    loggedAssert(Global.callerApplicationAddress === Global.creatorAddress, ERR_FACTORY_ONLY_INIT)

    if (this.gateID.value > 0) {
      this.gateSize.value = abiCall<typeof Gate.prototype.size>({
        appId: getAkitaAppList(this.akitaDAO.value).gate,
        args: [this.gateID.value],
      }).returnValue
    }
  }

  @abimethod({ allowActions: 'DeleteApplication' })
  delete(caller: Account): void {
    loggedAssert(Txn.sender === Global.creatorAddress, ERR_FACTORY_ONLY_DELETE)
    loggedAssert(caller === this.creator.value, ERR_CREATOR_ONLY_DELETE)
    loggedAssert(this.status.value === PoolStatusDraft || Global.latestTimestamp > this.endTimestamp.value, ERR_POOL_NOT_DRAFT_OR_ENDED)

    // TODO: ensure weights are cleared

    itxn
      .payment({ closeRemainderTo: Global.creatorAddress })
      .submit()
  }

  // POOL METHODS ---------------------------------------------------------------------------------

  /**
   * optin tells the contract to opt into an asa, it may also require the akita dao escrow to opt in
   * @param payment The payment transaction
   * @param asset The asset to be opted into
   */
  optIn(payment: gtxn.PaymentTxn, asset: Asset): void {
    loggedAssert(Txn.sender === this.creator.value, ERR_FORBIDDEN)

    let optinMBR: uint64 = Global.assetOptInMinBalance
    // check if the akita dao escrow is opted in to the asset
    // if it does that means 4 extra optins are needed
    if (!this.akitaDAOEscrow.value.app.address.isOptedIn(asset)) {
      const count = splitOptInCount(this.akitaDAO.value, this.akitaDAOEscrow.value.app.address, asset)
      optinMBR += Global.assetOptInMinBalance * count
    }

    const rewardsMBR: uint64 = this.rewardsMbr(WinnerCountCap) * 2

    loggedAssert(payment.receiver === Global.currentApplicationAddress, ERR_INVALID_PAYMENT)
    loggedAssert(payment.amount === optinMBR + rewardsMBR, ERR_INVALID_PAYMENT)

    itxn
      .assetTransfer({
        assetReceiver: Global.currentApplicationAddress,
        assetAmount: 0,
        xferAsset: asset,
      })
      .submit()

    this.optAkitaEscrowInAndSend(asset, 0)
  }

  addReward(payment: gtxn.PaymentTxn, reward: AddRewardParams): void {
    loggedAssert(Txn.sender === this.creator.value, ERR_FORBIDDEN)
    if (Txn.applicationArgs(0) === methodSelector(this.addReward)) {
      loggedAssert(reward.asset === 0, ERR_NOT_ALGO)
    }

    this.validateReward(reward)

    loggedAssert(payment.receiver === Global.currentApplicationAddress, ERR_INVALID_PAYMENT)
    loggedAssert(payment.amount >= this.rewardsMbr(reward.winnerCount), ERR_INVALID_PAYMENT)

    const id = this.newRewardID()
    this.rewards(id).value = {
      ...clone(reward),
      qualifiedStakers: 0,
      qualifiedStake: 0,
      winningTickets: [] as uint64[],
      raffleCursor: {
        ticket: 0,
        stake: 0,
        disbursed: 0
      },
      vrfFailureCount: 0,
      phase: DisbursementPhaseIdle,
      disbursementCursor: 1,
      activeDisbursementID: 0,
      activeDisbursementRoundStart: 0,
      lastDisbursementTimestamp: 0
    }
  }

  addRewardAsa(payment: gtxn.PaymentTxn, assetXfer: gtxn.AssetTransferTxn, reward: AddRewardParams): void {
    loggedAssert(assetXfer.assetReceiver === Global.currentApplicationAddress, ERR_INVALID_TRANSFER)
    loggedAssert(assetXfer.xferAsset === Asset(reward.asset), ERR_INVALID_TRANSFER)
    loggedAssert(assetXfer.assetAmount > 0, ERR_INVALID_TRANSFER)

    this.addReward(payment, reward)
  }

  finalize(signupTimestamp: uint64, startTimestamp: uint64, endTimestamp: uint64) {
    loggedAssert(Txn.sender === this.creator.value, ERR_CREATOR_ONLY_FINALIZE)
    loggedAssert(this.status.value === PoolStatusDraft, ERR_POOL_MUST_BE_DRAFT)
    loggedAssert(
      signupTimestamp > Global.latestTimestamp || (signupTimestamp === 0 && this.allowLateSignups.value),
      ERR_INVALID_SIGNUP_TIMESTAMP
    )
    // if start is zero then signup must also be zero and allowLateSignups must be true
    loggedAssert(
      startTimestamp === 0 ||
      startTimestamp > Global.latestTimestamp,
      ERR_INVALID_START_TIMESTAMP
    )

    if (startTimestamp === 0) {
      loggedAssert(signupTimestamp === 0 && this.allowLateSignups.value, ERR_INVALID_START_ZERO_REQUIRES_LATE)
      startTimestamp = Global.latestTimestamp
    }

    loggedAssert(
      endTimestamp === 0 || endTimestamp > (startTimestamp + 10),
      ERR_INVALID_END_TIMESTAMP
    )

    this.signupTimestamp.value = signupTimestamp
    this.startTimestamp.value = startTimestamp
    this.endTimestamp.value = endTimestamp
    this.status.value = PoolStatusFinal
  }

  gatedEnter(
    payment: gtxn.PaymentTxn,
    gateTxn: gtxn.ApplicationCallTxn,
    entries: StakeEntry[],
  ): void {
    const wallet = getWalletIDUsingAkitaDAO(this.akitaDAO.value, Txn.sender)
    const origin = originOrTxnSender(wallet)

    loggedAssert(this.gateID.value !== 0, ERR_GATE_ID_NOT_SET)
    loggedAssert(gateCheck(gateTxn, this.akitaDAO.value, origin, this.gateID.value), ERR_FAILED_GATE)

    this.createPoolEntries(payment, entries, getGateArgs(gateTxn))
  }

  enter(payment: gtxn.PaymentTxn, entries: StakeEntry[]): void {
    loggedAssert(this.gateID.value === 0, ERR_GATE_ID_SET)
    this.createPoolEntries(payment, entries, [])
  }

  startDisbursement(rewardID: uint64): void {
    loggedAssert(this.isLive(), ERR_POOL_NOT_LIVE)
    loggedAssert(this.rewards(rewardID).exists, ERR_REWARD_NOT_FOUND)

    const { phase, interval, lastDisbursementTimestamp, expiration } = this.rewards(rewardID).value

    loggedAssert(phase === DisbursementPhaseIdle, ERR_REWARD_ALREADY_IN_DISBURSEMENT)
    loggedAssert(this.validWindow(interval, lastDisbursementTimestamp), ERR_DISTRIBUTION_WINDOW_NOT_OPEN)

    const disbursementID = this.createRewards(
      `${this.title.value} - Rewards`,
      0,
      Global.latestTimestamp + expiration
    )

    this.rewards(rewardID).value.qualifiedStakers = 0
    this.rewards(rewardID).value.qualifiedStake = 0
    this.rewards(rewardID).value.phase = DisbursementPhasePreparation
    this.rewards(rewardID).value.disbursementCursor = 1 // Entry IDs start at 1
    this.rewards(rewardID).value.activeDisbursementID = disbursementID
    this.rewards(rewardID).value.activeDisbursementRoundStart = Global.round
    this.rewards(rewardID).value.lastDisbursementTimestamp = Global.latestTimestamp
  }

  raffle(rewardID: uint64): void {
    loggedAssert(this.rewards(rewardID).exists, ERR_REWARD_NOT_FOUND)
    const {
      phase,
      winningTickets,
      activeDisbursementRoundStart,
      vrfFailureCount,
      qualifiedStake
    } = clone(this.rewards(rewardID).value)

    loggedAssert(phase === DisbursementPhaseAllocation, ERR_INVALID_DISBURSEMENT_PHASE)
    loggedAssert(winningTickets.length === 0, ERR_WINNING_TICKETS_ALREADY_EXIST)

    const roundToUse: uint64 = activeDisbursementRoundStart + 1 + (4 * vrfFailureCount)

    const seed = abiCall<typeof RandomnessBeacon.prototype.get>({
      appId: getOtherAppList(Global.currentApplicationId).vrfBeacon,
      args: [roundToUse, this.salt.value],
    }).returnValue

    if (seed.length === 0) {
      this.rewards(rewardID).value.vrfFailureCount += 1
      return
    }

    // Initialize PCG randomness with the seed
    const rngState = pcg64Init(seed.slice(0, 16))

    // make upper bounds inclusive if we can
    let upperBound = qualifiedStake
    if (upperBound < MAX_UINT64) {
      upperBound += 1
    }

    const rngResult = pcg64Random(rngState, 1, upperBound, MaxGlobalStateUint64Array)

    this.rewards(rewardID).value.winningTickets = decodeArc4<uint64[]>(rngResult[1].bytes)
    this.rewards(rewardID).value.vrfFailureCount = 0
  }

  disburseRewards(rewardID: uint64, iterationAmount: uint64): void {
    // assert(this.status.value === PoolStatusDisbursing, 'pool is not in disbursement phase')
    loggedAssert(this.rewards(rewardID).exists, ERR_REWARD_NOT_FOUND)

    const { phase, distribution, winningTickets } = clone(this.rewards(rewardID).value)

    loggedAssert(
      phase === DisbursementPhasePreparation ||
      phase === DisbursementPhaseAllocation,
      ERR_NOT_READY_TO_DISBURSE
    )

    if (phase === DisbursementPhasePreparation) {
      this.processPreparationPhase(rewardID, iterationAmount)
    } else {
      switch (distribution) {
        case DistributionTypePercentage: {
          this.createPercentageDisbursement(rewardID, iterationAmount)
          break
        }
        case DistributionTypeFlat: {
          this.createFlatDisbursement(rewardID, iterationAmount)
          break
        }
        case DistributionTypeEven: {
          this.createEvenDisbursement(rewardID, iterationAmount)
          break
        }
        case DistributionTypeShuffle: {
          if (winningTickets.length === 0) {
            this.raffle(rewardID)
          } else {
            this.createShuffleDisbursement(rewardID, iterationAmount)
          }
          break
        }
        default: {
          loggedAssert(false, ERR_UNKNOWN_REWARD_RATE_TYPE)
        }
      }
    }
  }

  finalizeDistribution(rewardID: uint64): void {
    loggedAssert(this.rewards(rewardID).exists, ERR_REWARD_NOT_FOUND)
    const { phase, activeDisbursementID } = this.rewards(rewardID).value
    loggedAssert(phase === DisbursementPhaseFinalization, ERR_DISBURSEMENT_NOT_READY_FOR_FINALIZATION)

    this.finalizeRewards(activeDisbursementID)

    this.disbursements(activeDisbursementID).create()

    this.rewards(rewardID).value.phase = DisbursementPhaseIdle
    this.rewards(rewardID).value.activeDisbursementID = 0
    this.rewards(rewardID).value.activeDisbursementRoundStart = 0
    this.rewards(rewardID).value.disbursementCursor = 1 // Entry IDs start at 1
    this.rewards(rewardID).value.qualifiedStakers = 0
    this.rewards(rewardID).value.qualifiedStake = 0
  }

  check(address: Account, asset: uint64): { valid: boolean, balance: uint64 } {
    const key: EntryKey = { address, asset }
    const id = this.entriesByAddress(key).value
    return this.checkByID(id)
  }

  gateCheck(gateTxn: gtxn.ApplicationCallTxn, address: Account, asset: uint64) {
    const wallet = getWalletIDUsingAkitaDAO(this.akitaDAO.value, address)
    const origin = originOr(wallet, address)

    const passes = gateCheck(gateTxn, this.akitaDAO.value, origin, this.gateID.value)
    if (!passes && this.type.value !== POOL_STAKING_TYPE_HEARTBEAT) {
      const key: EntryKey = { address, asset }
      const id = this.entriesByAddress(key).value
      this.entries(id).value.disqualified = true
    }
  }

  // READ ONLY METHODS ----------------------------------------------------------------------------

  /**
   * Calculates the total cost required to enter the pool
   * @param address The address that will be entering
   * @param entryCount The number of entries being added
   * @returns The total payment amount needed (includes box MBR + any shortfall to meet min balance)
   */
  @abimethod({ readonly: true })
  enterCost(address: Account, entryCount: uint64): uint64 {
    // Calculate box MBR: (entries + entriesByAddress) per entry
    const entryMBR: uint64 = PoolEntriesMBR + PoolEntriesByAddressMBR
    let boxMbr: uint64 = entryMBR * entryCount

    // Add uniques MBR if this is the user's first entry
    if (!this.uniques(address).exists) {
      boxMbr += PoolUniquesMBR
    }

    return boxMbr
  }

  @abimethod({ readonly: true })
  optInCost(asset: Asset): uint64 {
    const count = splitOptInCount(this.akitaDAO.value, this.akitaDAOEscrow.value.app.address, asset)
    return (Global.assetOptInMinBalance * (1 + count)) + (this.rewardsMbr(WinnerCountCap) * 2)
  }

  /** @returns a boolean of whether sign ups are open */
  @abimethod({ readonly: true })
  signUpsOpen(): boolean {
    return (
      this.status.value !== PoolStatusDraft &&
      (Global.latestTimestamp <= this.endTimestamp.value || this.endTimestamp.value === 0) &&
      (
        (
          Global.latestTimestamp >= this.signupTimestamp.value &&
          Global.latestTimestamp < this.startTimestamp.value
        ) ||
        (
          this.allowLateSignups.value &&
          Global.latestTimestamp >= this.startTimestamp.value
        )
      )
    )
  }

  /** @returns a boolean of whether the pool is live */
  @abimethod({ readonly: true })
  isLive(): boolean {
    return (
      this.status.value !== PoolStatusDraft &&
      (Global.latestTimestamp >= this.startTimestamp.value) &&
      (Global.latestTimestamp <= this.endTimestamp.value || this.endTimestamp.value === 0)
    )
  }

  /** @returns a boolean indicating if the address has entered the staking pool */
  @abimethod({ readonly: true })
  isEntered(address: Account): boolean {
    return this.uniques(address).exists;
  }

  @abimethod({ readonly: true })
  getState(): StakingPoolState {
    return {
      status: this.status.value,
      title: this.title.value,
      type: this.type.value,
      signupTimestamp: this.signupTimestamp.value,
      allowLateSignups: this.allowLateSignups.value,
      startTimestamp: this.startTimestamp.value,
      endTimestamp: this.endTimestamp.value,
      maxEntries: this.maxEntries.value,
      entryCount: (this.entryID.value + 1),
      rewardCount: (this.rewardID.value + 1),
      totalStaked: this.totalStaked.value,
      stakeKey: this.stakeKey.value,
      minimumStakeAmount: this.minimumStakeAmount.value,
      gateID: this.gateID.value,
      creator: this.creator.value,
    }
  }
}

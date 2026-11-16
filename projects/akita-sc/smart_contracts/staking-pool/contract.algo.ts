import {
  Account,
  Application,
  Asset,
  Box,
  BoxMap,
  Bytes,
  bytes,
  clone,
  Global,
  GlobalState,
  gtxn,
  itxn,
  loggedAssert,
  op,
  Txn,
  uint64,
} from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod, decodeArc4, encodeArc4, methodSelector } from '@algorandfoundation/algorand-typescript/arc4'
import { AssetHolding, itob, sha256 } from '@algorandfoundation/algorand-typescript/op'
import { classes } from 'polytype'
import { RootKey } from '../meta/types'
import { MinDisbursementsMBR, UserAllocationMBR } from '../rewards/constants'
import { AppStakesMBR } from '../staking/constants'
import { AllocationReclaimDetails, UserAllocation } from '../rewards/types'
import { StakingType } from '../staking/types'
import { BoxCostPerBox, BoxCostPerByte } from '../utils/constants'
import { errPayerOnly } from '../utils/errors'
import {
  assertPlainPayment,
  assertSafeAssetTransfer,
  canReceiveAlgo,
  payerOf,
  recordPayer,
  releaseDeposit,
  sponsorCost,
  atRestPrincipalOf,
  calcPercent,
  gateCheck,
  gateCheckCtx,
  getAkitaAppList,
  getGateArgs,
  getOtherAppList,
  legacyWalletOf,
  legacyOriginOrTxnSender,
  ownsAtRestOf,
  principalOf,
  splitOptInCount,
} from '../utils/functions'
import { GateCtx, gateCtx } from '../utils/principal'
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
  EndPoolGracePeriod,
  MinRewardExpiration,
  POOL_STAKING_TYPE_HARD,
  POOL_STAKING_TYPE_HEARTBEAT,
  POOL_STAKING_TYPE_LOCK,
  POOL_STAKING_TYPE_NONE,
  POOL_STAKING_TYPE_SOFT,
  PoolBoxKeyActiveRounds,
  PoolUint64BoxMapMBR,
  PoolBoxPrefixBudgets,
  PoolBoxPrefixCommitted,
  PoolBoxPrefixDisbursements,
  PoolBoxPrefixEntries,
  PoolBoxPrefixEntriesByAddress,
  PoolBoxPrefixRewards,
  PoolBoxPrefixRoundPaid,
  PoolBoxPrefixRoundRewards,
  PoolBoxPrefixPrincipals,
  PoolEntriesByAddressExactMBR,
  PoolEntriesByAddressMBR,
  PoolEntriesFixedBytes,
  PoolEntriesMBR,
  PoolGlobalStateKeyPrincipalVersion,
  PoolPrincipalsMBR,
  PoolPrincipalVersion,
  PoolGlobalStateKeyAkitaRoyalty,
  PoolGlobalStateKeyAllowLateSignups,
  PoolGlobalStateKeyCreator,
  PoolGlobalStateKeyEndTimestamp,
  PoolGlobalStateKeyEntryCount,
  PoolGlobalStateKeyGateID,
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
  PoolGlobalStateKeyType,
  PoolGlobalStateKeyUniques,
  PoolStatusDraft,
  PoolStatusFinal,
  PoolUniquesMBR,
  WinnerCountCap,
  BEACON_LAG_ROUNDS,
  BEACON_MAX_WAIT_ROUNDS,
  BEACON_ROUND_INTERVAL,
  DRAW_DELAY_ROUNDS,
} from './constants'
import {
  errAbortForbidden,
  errAssetCommitted,
  errCreatorOnlyDelete,
  errCreatorOnlyFinalize,
  errDaoNotOptedIn,
  errDisbursementNotReadyForFinalization,
  errDistributionWindowNotOpen,
  errEntryAlreadyExists,
  errEntryNotFound,
  errFactoryOnlyDelete,
  errFactoryOnlyInit,
  errFailedGate,
  errFailedStakeVerify,
  errForbidden,
  errGateIdNotSet,
  errGateIdSet,
  errInvalidDisbursementPhase,
  errInvalidEndTimestamp,
  errInvalidPayment,
  errInvalidPoolTypeForCheck,
  errInvalidQuantity,
  errInvalidRewardTiming,
  errInvalidSignupTimestamp,
  errInvalidStartTimestamp,
  errInvalidStartZeroRequiresLate,
  errInvalidTransfer,
  errMaxEntriesCannotBeGreaterThanRate,
  errNotAlgo,
  errNotEnoughFunds,
  errNotEntrant,
  errNotReadyToDisburse,
  errNotShuffle,
  errPoolMaxEntriesReached,
  errPoolMustBeDraft,
  errPoolNotDraftOrEnded,
  errPoolNotEnded,
  errPoolNotLive,
  errQuantityBelowMinStake,
  errRateMustBeGreaterThanWinnerCount,
  errRateMustBeGreaterThanZero,
  errRewardAlreadyInDisbursement,
  errRewardBudget,
  errRewardNotFound,
  errRoundOpen,
  errShuffleExhausted,
  errSignupsNotOpen,
  errSoftValueWeighted,
  errStakeKeyRequired,
  errTypedPoolNeedsStakeKey,
  errUnknownRewardRateType,
  errUserBalanceTooLow,
  errUserStakeTooLow,
  errWinningTicketsAlreadyExist,
  errBeaconNotReady,
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
  StoredPrincipal,
} from './types'

import { FunderInfo } from '../utils/types/mbr'

// CONTRACT IMPORTS
import type { Gate } from '../gates/contract.algo'
import { GateArgs } from '../gates/types'
import type { Meta } from '../meta/contract.algo'
import type { Rewards } from '../rewards/contract.algo'
import type { Staking } from '../staking/contract.algo'
import { AkitaBaseFeeGeneratorContract, EscrowConfig } from '../utils/base-contracts/base'
import { ChildContract } from '../utils/base-contracts/child'
import type { RandomnessBeacon } from '../utils/types/randomness-beacon'
import { BaseStakingPool } from './base'

const MERKLE_TREE_TYPE_ASSET: uint64 = 1

/** Abort modes for `abortRound` (what to do with an already created Rewards disbursement). */
const ABORT_LEAVE: uint64 = 0
const ABORT_FINALIZE: uint64 = 1
const ABORT_CLOSE: uint64 = 2

/** `createPoolEntries` kinds (PHASE-0-SPEC §6.5): which charges an entry request may pay. */
const ENTRY_HINTED: uint64 = 0
const ENTRY_UNGATED: uint64 = 1
const ENTRY_LEGACY_GATED: uint64 = 2

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
  /**
   * the name for the meta merkle asset group to validate staking
   * stake key can be empty only for POOL_STAKING_TYPE_NONE pools
   */
  stakeKey = GlobalState<RootKey>({ key: PoolGlobalStateKeyStakeKey })
  /** minimum stake amount */
  minimumStakeAmount = GlobalState<uint64>({ key: PoolGlobalStateKeyMinimumStakeAmount })
  /** the gate id of the pool */
  gateID = GlobalState<uint64>({ key: PoolGlobalStateKeyGateID })
  /** the address of the creator of the staking pool */
  creator = GlobalState<Account>({ key: PoolGlobalStateKeyCreator })
  /** marketplace is pool creation side marketplace */
  marketplace = GlobalState<Account>({ key: PoolGlobalStateKeyMarketplace })
  /** the amount the marketplaces will get for the sale */
  marketplaceRoyalties = GlobalState<uint64>({ key: PoolGlobalStateKeyMarketplaceRoyalties })
  /** the akita royalty for the pool */
  akitaRoyalty = GlobalState<uint64>({ key: PoolGlobalStateKeyAkitaRoyalty })
  /** salt for randomness */
  salt = GlobalState<bytes<32>>({ key: PoolGlobalStateKeySalt })
  /**
   * ABI marker (PHASE-0-SPEC §6.5): `PoolPrincipalVersion` on children with the hinted
   * `gatedEnter`/`enterCost` and the legacy shims. Older children lack the key.
   */
  principalVersion = GlobalState<uint64>({ key: PoolGlobalStateKeyPrincipalVersion })

  // BOXES ----------------------------------------------------------------------------------------

  /** indexed entries for efficient iteration (a removed entry leaves a hole that loops skip) */
  entries = BoxMap<uint64, EntryData>({ keyPrefix: PoolBoxPrefixEntries })
  /** the number of entries by address */
  uniques = BoxMap<Account, uint64>({ keyPrefix: PoolGlobalStateKeyUniques })
  /** the entries in the pool */
  entriesByAddress = BoxMap<EntryKey, uint64>({ keyPrefix: PoolBoxPrefixEntriesByAddress })
  /** the rewards for this staking pool */
  rewards = BoxMap<uint64, Reward>({ keyPrefix: PoolBoxPrefixRewards })
  /** legacy marker of finalized disbursements (pre-2026-10 children); no longer written */
  disbursements = BoxMap<uint64, bytes<0>>({ keyPrefix: PoolBoxPrefixDisbursements })
  /** number of reward rounds outside Idle (at most 1, STAKE-1); entries, checks and removals are frozen while > 0 (H-4) */
  activeRounds = Box<uint64>({ key: PoolBoxKeyActiveRounds })
  /** rewardID -> reward asset reserved for that reward (M-5) */
  budgets = BoxMap<uint64, uint64>({ keyPrefix: PoolBoxPrefixBudgets })
  /** asset (0 = ALGO) -> sum of all reward budgets in that asset (M-5) */
  committed = BoxMap<uint64, uint64>({ keyPrefix: PoolBoxPrefixCommitted })
  /** rewardID -> amount allocated in the open round (M-1) */
  roundPaid = BoxMap<uint64, uint64>({ keyPrefix: PoolBoxPrefixRoundPaid })
  /** Rewards disbursementID -> rewardID of finalized rounds (M-5 reclaim) */
  roundRewards = BoxMap<uint64, uint64>({ keyPrefix: PoolBoxPrefixRoundRewards })
  /**
   * entrant -> stored pair `(W, principal)` verified at gated entry (§6.5, §3.8 rule 2). Read by the
   * permissionless `gateCheck` through `atRestPrincipal`, which reads no wallet global.
   */
  principals = BoxMap<Account, StoredPrincipal>({ keyPrefix: PoolBoxPrefixPrincipals })

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

  // --- round bookkeeping (H-4) ---

  private openRounds(): uint64 {
    const [n, exists] = this.activeRounds.maybe()
    return exists ? n : 0
  }

  private assertNoOpenRound(): void {
    loggedAssert(this.openRounds() === 0, errRoundOpen)
  }

  private openRound(): void {
    this.activeRounds.value = this.openRounds() + 1
  }

  /** Children upgraded mid-round start at 0, so never underflow. */
  private releaseRound(): void {
    const n = this.openRounds()
    if (n > 1) {
      this.activeRounds.value = n - 1
    } else if (n === 1) {
      this.activeRounds.delete()
    }
  }

  // --- budgets (M-5) ---

  private budgetOf(rewardID: uint64): uint64 {
    const [amount, exists] = this.budgets(rewardID).maybe()
    return exists ? amount : 0
  }

  private committedOf(asset: uint64): uint64 {
    const [amount, exists] = this.committed(asset).maybe()
    return exists ? amount : 0
  }

  /** Funds of `asset` held by the pool and not reserved by any reward budget. */
  private freeFunds(asset: uint64): uint64 {
    let held: uint64
    if (asset === 0) {
      const self = Global.currentApplicationAddress
      held = self.balance > self.minBalance ? self.balance - self.minBalance : 0
    } else {
      held = AssetHolding.assetBalance(Global.currentApplicationAddress, asset)[0]
    }
    const reserved = this.committedOf(asset)
    return held > reserved ? held - reserved : 0
  }

  private creditBudget(rewardID: uint64, asset: uint64, amount: uint64): void {
    this.budgets(rewardID).value = this.budgetOf(rewardID) + amount
    if (amount > 0) {
      this.committed(asset).value = this.committedOf(asset) + amount
    }
  }

  /** Adds to the open round's allocated total (a round opened before this tracking existed has none). */
  private addRoundPaid(rewardID: uint64, amount: uint64): void {
    const [paid, tracked] = this.roundPaid(rewardID).maybe()
    if (tracked) {
      this.roundPaid(rewardID).value = paid + amount
    }
  }

  private debitBudget(rewardID: uint64, asset: uint64, amount: uint64): void {
    if (amount === 0) {
      return
    }
    const budget = this.budgetOf(rewardID)
    loggedAssert(budget >= amount, errRewardBudget)
    this.budgets(rewardID).value = budget - amount

    const reserved = this.committedOf(asset)
    if (reserved > amount) {
      this.committed(asset).value = reserved - amount
    } else if (this.committed(asset).exists) {
      this.committed(asset).delete()
    }
  }

  /**
   * Round operations (Rewards MBR, allocation credits, bookkeeping boxes) are paid from free
   * ALGO, never from ALGO reserved for rewards.
   */
  private assertAlgoReservesCovered(): void {
    const self = Global.currentApplicationAddress
    loggedAssert(self.balance >= self.minBalance + this.committedOf(0), errNotEnoughFunds)
  }

  private isEnded(): boolean {
    return this.endTimestamp.value !== 0 && Global.latestTimestamp > this.endTimestamp.value
  }

  private assertDraftOrEnded(): void {
    loggedAssert(this.status.value === PoolStatusDraft || this.isEnded(), errPoolNotEnded)
  }

  private payOut(receiver: Account, asset: uint64, amount: uint64): void {
    if (amount === 0) {
      return
    }
    if (asset === 0) {
      itxn.payment({ receiver, amount }).submit()
    } else {
      itxn.assetTransfer({ assetReceiver: receiver, assetAmount: amount, xferAsset: asset }).submit()
    }
  }

  // --- reward distribution ---

  /** NONE pools have no stake to weigh, so every entry counts once (ST-1 / H-2). */
  private entryWeight(quantity: uint64): uint64 {
    return this.type.value === POOL_STAKING_TYPE_NONE ? 1 : quantity
  }

  /** The reward funds a round needs before royalties. */
  private roundRequirement(distribution: DistributionType, rate: uint64, qualifiedStakers: uint64): uint64 {
    return distribution === DistributionTypeFlat ? rate * qualifiedStakers : rate
  }

  private payAkitaRoyalty(distribution: DistributionType, rate: uint64, asset: uint64, qualifiedStakers: uint64): uint64 {
    let amount: uint64 = this.roundRequirement(distribution, rate, qualifiedStakers)
    amount = calcPercent(amount, this.akitaRoyalty.value)

    // Skip payment if royalty amount is 0
    if (amount === 0) {
      return 0
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
      loggedAssert(this.akitaDAOEscrow.value.app.address.isOptedIn(Asset(asset)), errDaoNotOptedIn)

      itxn
        .assetTransfer({
          assetReceiver: this.akitaDAOEscrow.value.app.address,
          assetAmount: amount,
          xferAsset: asset,
        })
        .submit()
    }

    return amount
  }

  /** Last entry ID (exclusive) a batch starting at `cursor` may process. */
  private batchEnd(cursor: uint64, iterationAmount: uint64): uint64 {
    const end: uint64 = cursor + iterationAmount
    return end > this.entryID.value ? this.entryID.value : end
  }

  private processPreparationPhase(rewardID: uint64, iterationAmount: uint64): void {
    const reward = clone(this.rewards(rewardID).value)
    const end = this.batchEnd(reward.disbursementCursor, iterationAmount)
    let count: uint64 = 0
    let total: uint64 = 0

    for (let id = reward.disbursementCursor; id < end; id++) {
      if (!this.entries(id).exists) {
        continue
      }
      const entry = clone(this.entries(id).value)
      // a previous round's hold-out ends here: this round decides afresh
      if (entry.heldOut) {
        this.entries(id).value.heldOut = false
      }
      if (entry.disqualified) {
        continue
      }

      // re-validates the stake every round and disqualifies the entry if it no longer holds (ST-1)
      const { valid } = this.getStakeValue(id, reward.lastDisbursementTimestamp)
      if (!valid) {
        continue
      }

      const weight = this.entryWeight(entry.quantity)
      if (weight === 0) {
        continue
      }

      count += 1
      total += weight
    }

    reward.qualifiedStakers += count
    reward.qualifiedStake += total
    reward.disbursementCursor = end

    if (end < this.entryID.value) {
      this.rewards(rewardID).value = clone(reward)
      return
    }

    // preparation complete: the qualified set is final and frozen until the round closes
    if (reward.qualifiedStakers === 0) {
      // nothing to pay; no Rewards disbursement was ever created (M-1)
      this.rewards(rewardID).value = clone(reward)
      this.closeRound(rewardID)
      return
    }

    // budget check; legacy rewards (no budget box) reserve the round from free funds as they go
    const required = this.roundRequirement(reward.distribution, reward.rate, reward.qualifiedStakers)

    // an Even split smaller than one base unit per staker would pay the royalty and nobody else
    // (e.g. maxEntries = 0 lets the head count outgrow the rate): close the round unpaid instead
    if (
      reward.distribution === DistributionTypeEven &&
      (reward.rate - calcPercent(required, this.akitaRoyalty.value)) / reward.qualifiedStakers === 0
    ) {
      this.rewards(rewardID).value = clone(reward)
      this.closeRound(rewardID)
      return
    }
    if (!this.budgets(rewardID).exists) {
      loggedAssert(this.freeFunds(reward.asset) >= required, errNotEnoughFunds)
      this.creditBudget(rewardID, reward.asset, required)
    }
    loggedAssert(this.budgetOf(rewardID) >= required, errRewardBudget)

    // create the Rewards disbursement only now that there is something to pay (M-1)
    reward.activeDisbursementID = this.createRewards(
      `${this.title.value} - Rewards`,
      0,
      Global.latestTimestamp + reward.expiration
    )
    // commit to the VRF round only after the ticket space (qualifiedStake) is fixed (H-6), and only
    // to a beacon-stored round nobody can know yet (TRADE-3)
    reward.activeDisbursementRoundStart = this.drawRound()
    reward.phase = DisbursementPhaseAllocation
    reward.disbursementCursor = 1 // Entry IDs start at 1

    const allocationCount = reward.distribution === DistributionTypeShuffle ? reward.winnerCount : reward.qualifiedStakers
    this.fundRewardMbrCredits(reward.activeDisbursementID, allocationCount)

    reward.royaltyAmount = this.payAkitaRoyalty(
      reward.distribution,
      reward.rate,
      reward.asset,
      reward.qualifiedStakers
    )
    this.debitBudget(rewardID, reward.asset, reward.royaltyAmount)
    this.roundPaid(rewardID).value = 0

    this.rewards(rewardID).value = clone(reward)
    this.assertAlgoReservesCovered()
  }

  private createPercentageDisbursement(rewardID: uint64, iterationAmount: uint64): void {
    const { asset, disbursementCursor, activeDisbursementID, qualifiedStake, royaltyAmount, rate } = this.rewards(rewardID).value
    const end = this.batchEnd(disbursementCursor, iterationAmount)
    const actualAmount: uint64 = rate - royaltyAmount
    const allocations: UserAllocation[] = []
    let sum: uint64 = 0

    for (let id = disbursementCursor; id < end; id++) {
      if (!this.entries(id).exists) {
        continue
      }
      const entry = clone(this.entries(id).value)
      if (entry.disqualified || entry.heldOut) {
        continue
      }

      // share = actualAmount * weight / qualifiedStake (a single staker gets everything, M-1)
      const individualAmount = op.divw(...op.mulw(actualAmount, this.entryWeight(entry.quantity)), qualifiedStake)
      allocations.push({ address: entry.address, amount: individualAmount })
      sum += individualAmount
    }

    this.settleBatch(rewardID, activeDisbursementID, asset, allocations, sum, end)
  }

  private createFlatDisbursement(rewardID: uint64, iterationAmount: uint64): void {
    const { activeDisbursementID, disbursementCursor, qualifiedStakers, royaltyAmount, rate, asset } = this.rewards(rewardID).value
    const end = this.batchEnd(disbursementCursor, iterationAmount)
    const adjustedAmount: uint64 = ((qualifiedStakers * rate) - royaltyAmount) / qualifiedStakers

    const allocations: UserAllocation[] = []
    let sum: uint64 = 0
    for (let id = disbursementCursor; id < end; id++) {
      if (!this.entries(id).exists) {
        continue
      }
      const entry = clone(this.entries(id).value)
      if (entry.disqualified || entry.heldOut) {
        continue
      }

      allocations.push({ address: entry.address, amount: adjustedAmount })
      sum += adjustedAmount
    }

    this.settleBatch(rewardID, activeDisbursementID, asset, allocations, sum, end)
  }

  private createEvenDisbursement(rewardID: uint64, iterationAmount: uint64): void {
    const { activeDisbursementID, disbursementCursor, qualifiedStakers, royaltyAmount, asset, rate } = this.rewards(rewardID).value
    const end = this.batchEnd(disbursementCursor, iterationAmount)
    const amount: uint64 = (rate - royaltyAmount) / qualifiedStakers

    const allocations: UserAllocation[] = []
    let sum: uint64 = 0
    for (let id = disbursementCursor; id < end; id++) {
      if (!this.entries(id).exists) {
        continue
      }
      const entry = clone(this.entries(id).value)
      if (entry.disqualified || entry.heldOut) {
        continue
      }

      allocations.push({ address: entry.address, amount })
      sum += amount
    }

    this.settleBatch(rewardID, activeDisbursementID, asset, allocations, sum, end)
  }

  /** Writes a batch to Rewards, debits the budget and advances (or ends) the allocation phase. */
  private settleBatch(
    rewardID: uint64,
    disbursementID: uint64,
    asset: uint64,
    allocations: UserAllocation[],
    sum: uint64,
    end: uint64
  ): void {
    this.createRewardAllocations(disbursementID, asset, allocations, sum)
    this.debitBudget(rewardID, asset, sum)
    this.addRoundPaid(rewardID, sum)

    if (end >= this.entryID.value) {
      this.rewards(rewardID).value.phase = DisbursementPhaseFinalization
      this.rewards(rewardID).value.disbursementCursor = 1 // Entry IDs start at 1
    } else {
      this.rewards(rewardID).value.disbursementCursor = end
    }
  }

  /**
   * Weighted shuffle (H-6). Tickets are drawn in [0, qualifiedStake); every qualified entry owns
   * the half-open range [start, start + weight) and disqualified, held-out or removed entries own nothing,
   * so the ranges cover exactly the ticket space. Each ticket rescans from entry 1 with its
   * position persisted in `raffleCursor`, so the outcome does not depend on batch sizes.
   */
  private createShuffleDisbursement(rewardID: uint64, iterationAmount: uint64): void {
    const reward = clone(this.rewards(rewardID).value)
    const amount: uint64 = (reward.rate - reward.royaltyAmount) / reward.winnerCount
    const ticketCount: uint64 = reward.winningTickets.length

    let ticket = reward.raffleCursor.ticket
    let rangeStart = reward.raffleCursor.stake
    let disbursed = reward.raffleCursor.disbursed
    let id = reward.disbursementCursor
    let steps: uint64 = 0

    const allocations: UserAllocation[] = []
    let sum: uint64 = 0
    while (steps < iterationAmount && ticket < ticketCount) {
      loggedAssert(id < this.entryID.value, errShuffleExhausted)
      steps += 1

      if (this.entries(id).exists && !this.entries(id).value.disqualified && !this.entries(id).value.heldOut) {
        const { address, quantity } = this.entries(id).value
        const rangeEnd: uint64 = rangeStart + this.entryWeight(quantity)
        if (reward.winningTickets[ticket] < rangeEnd) {
          allocations.push({ address, amount })
          sum += amount
          disbursed += 1
          ticket += 1
          // the next ticket rescans from the first entry
          id = 1
          rangeStart = 0
          continue
        }
        rangeStart = rangeEnd
      }
      id += 1
    }

    this.createRewardAllocations(reward.activeDisbursementID, reward.asset, allocations, sum)
    this.debitBudget(rewardID, reward.asset, sum)
    this.addRoundPaid(rewardID, sum)

    if (ticket === ticketCount) {
      this.rewards(rewardID).value.phase = DisbursementPhaseFinalization
      this.rewards(rewardID).value.disbursementCursor = 1 // Entry IDs start at 1
      this.rewards(rewardID).value.raffleCursor = { ticket: 0, stake: 0, disbursed: 0 }
      this.rewards(rewardID).value.winningTickets = []
    } else {
      this.rewards(rewardID).value.disbursementCursor = id
      this.rewards(rewardID).value.raffleCursor = { ticket, stake: rangeStart, disbursed }
    }
  }

  /**
   * @param roundStart non-zero inside a round: a HARD stake must be unchanged since before it, so
   * one escrowed balance cannot be withdrawn and re-staked to back entries in later batches (STAKE-2).
   * A HARD stake that still covers the entry but changed during the round (a top-up) only sits this
   * round out (`heldOut`); it is not disqualified.
   */
  private checkByID(id: uint64, roundStart: uint64): { valid: boolean, balance: uint64 } {
    loggedAssert(
      this.type.value !== POOL_STAKING_TYPE_NONE && this.type.value !== POOL_STAKING_TYPE_HEARTBEAT,
      errInvalidPoolTypeForCheck
    )

    const { disqualified, address, asset, quantity } = this.entries(id).value

    if (disqualified) {
      return { valid: false, balance: 0 }
    }

    if (this.type.value === POOL_STAKING_TYPE_SOFT) {
      const check = abiCall<typeof Staking.prototype.checkpointAppSoftStake>({
        appId: getAkitaAppList(this.akitaDAO.value).staking,
        args: [Global.currentApplicationId.id, address, asset],
      }).returnValue

      // validate against the entry, not the (possibly lowered) commitment (H-1)
      if (check.valid && check.balance >= quantity) {
        return check
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

      // a LOCK pool only counts locks that are still locked (L-3)
      const stillLocked = this.type.value !== POOL_STAKING_TYPE_LOCK || info.expiration > Global.latestTimestamp
      const heldSinceRoundStart = this.type.value !== POOL_STAKING_TYPE_HARD || roundStart === 0 || info.lastUpdate < roundStart
      if (info.amount >= quantity && stillLocked) {
        if (heldSinceRoundStart) {
          return { valid: true, balance: info.amount }
        }
        this.entries(id).value.heldOut = true
        return { valid: false, balance: 0 }
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

  private getStakeValue(id: uint64, roundStart: uint64): { valid: boolean, balance: uint64 } {
    if (this.type.value === POOL_STAKING_TYPE_NONE) {
      return { valid: true, balance: 0 }
    } else if (this.type.value === POOL_STAKING_TYPE_HEARTBEAT) {
      const { address, asset, quantity } = this.entries(id).value

      const avg = abiCall<typeof Staking.prototype.getHeartbeatAverage>({
        appId: getAkitaAppList(this.akitaDAO.value).staking,
        args: [address, asset, true],
      }).returnValue

      // the manager-sampled average must still cover the entered quantity (ST-1)
      if (avg >= quantity) {
        return { valid: true, balance: avg }
      }

      this.entries(id).value.disqualified = true
      return { valid: false, balance: 0 }
    }

    return this.checkByID(id, roundStart)
  }

  private createRewards(title: string, timeToUnlock: uint64, expiration: uint64): uint64 {

    const rewardsApp = Application(getAkitaAppList(this.akitaDAO.value).rewards)
    const rewardMBR: uint64 = MinDisbursementsMBR + (BoxCostPerByte * Bytes(title).length)

    const mbrPayment = itxn.payment({
      receiver: rewardsApp.address,
      amount: rewardMBR,
    })

    return abiCall<typeof Rewards.prototype.legacyCreateDisbursement>({
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
    if (allocations.length === 0) {
      return
    }

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

  /**
   * Finalizes the round's Rewards disbursement with a fresh claim window (L-1), or closes it when
   * nothing was allocated, then records which reward it belongs to (for reclaims).
   */
  private settleDisbursement(rewardID: uint64, disbursementID: uint64, expiration: uint64): void {
    const rewardsApp = Application(getAkitaAppList(this.akitaDAO.value).rewards)
    const [paid, tracked] = this.roundPaid(rewardID).maybe()

    // an untracked (pre-upgrade) round is assumed to have allocations
    if (tracked && paid === 0) {
      abiCall<typeof Rewards.prototype.closeDisbursement>({
        appId: rewardsApp,
        args: [disbursementID],
      })
      return
    }

    abiCall<typeof Rewards.prototype.editDisbursement>({
      appId: rewardsApp,
      args: [disbursementID, `${this.title.value} - Rewards`, 0, Global.latestTimestamp + expiration, ''],
    })

    abiCall<typeof Rewards.prototype.finalizeDisbursement>({
      appId: rewardsApp,
      args: [disbursementID],
    })

    this.roundRewards(disbursementID).value = rewardID
  }

  /** Returns a reward to Idle and releases its round slot. */
  private closeRound(rewardID: uint64): void {
    this.rewards(rewardID).value.phase = DisbursementPhaseIdle
    this.rewards(rewardID).value.activeDisbursementID = 0
    this.rewards(rewardID).value.activeDisbursementRoundStart = 0
    this.rewards(rewardID).value.disbursementCursor = 1 // Entry IDs start at 1
    this.rewards(rewardID).value.qualifiedStakers = 0
    this.rewards(rewardID).value.qualifiedStake = 0
    this.rewards(rewardID).value.royaltyAmount = 0
    this.rewards(rewardID).value.vrfFailureCount = 0
    this.rewards(rewardID).value.raffleCursor = { ticket: 0, stake: 0, disbursed: 0 }
    this.rewards(rewardID).value.winningTickets = []

    if (this.roundPaid(rewardID).exists) {
      this.roundPaid(rewardID).delete()
    }

    this.releaseRound()
  }

  private validateReward(reward: AddRewardParams): void {
    // stake key is optional if the distribution type is not percentage based
    // we use this to qualify stakes for the pool but in some cases users may
    // want to distribute rewards on something else like subscription status
    // or impact score. In these cases the gate is the only requirement
    // and the stake key is not needed
    if (reward.distribution === DistributionTypePercentage) {
      loggedAssert(this.stakeKey.value.address !== Global.zeroAddress, errStakeKeyRequired)
    }

    // a SOFT balance is not escrowed and can move between preparation batches, so it may only
    // back head-count rewards (STAKE-2)
    if (this.type.value === POOL_STAKING_TYPE_SOFT) {
      loggedAssert(
        reward.distribution !== DistributionTypePercentage && reward.distribution !== DistributionTypeShuffle,
        errSoftValueWeighted
      )
    }

    // rate needs to be greater than the number of winners we want to pick for shuffles
    if (reward.distribution === DistributionTypeShuffle) {
      loggedAssert(
        reward.winnerCount > 0 && reward.rate > reward.winnerCount && reward.winnerCount <= WinnerCountCap,
        errRateMustBeGreaterThanWinnerCount
      )
    }

    // if we're distributing evenly, the max entries must be less than or equal to the rate
    if (reward.distribution === DistributionTypeEven) {
      loggedAssert(this.maxEntries.value <= reward.rate, errMaxEntriesCannotBeGreaterThanRate)
    }

    loggedAssert(
      reward.distribution === DistributionTypePercentage ||
      reward.distribution === DistributionTypeFlat ||
      reward.distribution === DistributionTypeEven ||
      reward.distribution === DistributionTypeShuffle,
      errUnknownRewardRateType
    )
    loggedAssert(reward.rate > 0, errRateMustBeGreaterThanZero)
    // a zero interval would divide by zero; a short expiration could not survive a long round (L-1)
    loggedAssert(reward.interval > 0 && reward.expiration >= MinRewardExpiration, errInvalidRewardTiming)
  }

  /** Exact `entries` box MBR for an entry stored with `gateArgs` (Q14). */
  private entryBoxMbr(gateArgs: GateArgs): uint64 {
    return BoxCostPerBox + (BoxCostPerByte * (PoolEntriesFixedBytes + encodeArc4(gateArgs).length))
  }

  /**
   * Box MBR (plus any app-scoped SOFT stake MBR) an entry request must pay.
   * @param entryMbr per-entry `entries` box charge (exact for `gateArgs`, or the flat legacy charge)
   * @param byAddressMbr per-entry `entriesByAddress` box charge
   * @param pairWallet non-zero when the request writes the entrant's stored pair (`'i'`)
   */
  private getEnterCost(
    address: Account,
    entries: StakeEntry[],
    entryMbr: uint64,
    byAddressMbr: uint64,
    pairWallet: uint64
  ): uint64 {
    let total: uint64 = entryMbr * entries.length
    if (entries.length > 0 && !this.uniques(address).exists) {
      total += PoolUniquesMBR
    }
    if (entries.length > 0 && pairWallet !== 0 && !this.principals(address).exists) {
      total += PoolPrincipalsMBR
    }

    for (let i: uint64 = 0; i < entries.length; i++) {
      const key: EntryKey = { address, asset: entries[i].asset }
      loggedAssert(!this.entriesByAddress(key).exists, errEntryAlreadyExists)

      total += byAddressMbr
      if (this.type.value === POOL_STAKING_TYPE_SOFT) {
        total += AppStakesMBR
      }
    }
    return total
  }

  /** Exact cost of an entry request whose entries store `gateArgs` (hinted path and `enter`). */
  private exactEnterCost(address: Account, entries: StakeEntry[], gateArgs: GateArgs, pairWallet: uint64): uint64 {
    return this.getEnterCost(address, entries, this.entryBoxMbr(gateArgs), PoolEntriesByAddressExactMBR, pairWallet)
  }

  /**
   * LEGACY quote/charge (shim `gatedEnter`; delete in Phase 4): the deployed plugin quotes before it
   * knows the gate args, so gated legacy entries keep the flat pre-Q14 box charge. `'i'` is charged
   * when the registry names a genuine wallet for `address` (exactly when the shim writes it).
   */
  private legacyEnterCost(address: Account, entries: StakeEntry[]): uint64 {
    if (this.gateID.value === 0) {
      // ungated pools: `enter` stores no gate args, so the exact charge needs no args
      return this.exactEnterCost(address, entries, [], 0)
    }
    let pairWallet: uint64 = 0
    if (entries.length > 0 && !this.principals(address).exists) {
      pairWallet = legacyWalletOf(this.akitaDAO.value, address).id
    }
    return this.getEnterCost(address, entries, PoolEntriesMBR, PoolEntriesByAddressMBR, pairWallet)
  }

  /**
   * @param pairWallet non-zero: the entrant's stored pair `(pairWallet, pairPrincipal)` (`'i'`) is due
   * @param kind `ENTRY_HINTED` / `ENTRY_UNGATED` / `ENTRY_LEGACY_GATED` (the accepted charges differ)
   */
  private createPoolEntries(
    payment: gtxn.PaymentTxn,
    entries: StakeEntry[],
    gateArgs: GateArgs,
    pairWallet: uint64,
    pairPrincipal: Account,
    kind: uint64
  ): void {
    loggedAssert(this.signUpsOpen(), errSignupsNotOpen)
    // the qualified set of an open round must not change (H-4)
    this.assertNoOpenRound()

    if (this.maxEntries.value !== 0) {
      loggedAssert(
        (this.entryID.value - 1) + entries.length <= this.maxEntries.value,
        errPoolMaxEntriesReached
      )
    }

    // anyone may fund the entry MBR, exactly; it is refunded to whoever paid it
    assertPlainPayment(payment)
    loggedAssert(payment.receiver === Global.currentApplicationAddress, errInvalidPayment)
    // One account funds all of an entrant's entries in this pool and gets their MBR back. When that
    // account is not the entrant it also funds a payer record, once, with the entrant's first entries.
    let sponsor: uint64 = 0
    if (entries.length > 0) {
      const payerRecord = this.uniques(Txn.sender).key
      if (this.uniques(Txn.sender).exists) {
        loggedAssert(payment.sender === payerOf(payerRecord, Txn.sender), errPayerOnly)
      } else {
        sponsor = sponsorCost(payment.sender, Txn.sender)
        recordPayer(payerRecord, payment.sender, Txn.sender)
      }
    }
    loggedAssert(payment.amount >= sponsor, errInvalidPayment)
    const paid: uint64 = payment.amount - sponsor
    // Charges (each refunded exactly by removeEntry, PHASE-0-SPEC §6.5, Q14):
    // - hinted gatedEnter: the exact box MBR for the stored gate args, plus `'i'` when due;
    // - enter: the exact box MBR, or (legacy plugins that hard-code it, e.g. MainNet 3569562283) the
    //   flat pre-Q14 MBR; the two always differ, so the payment says which one applies;
    // - legacy gatedEnter shim: the flat pre-Q14 MBR (its quote cannot see the gate args), plus
    //   `'i'` when due if the caller paid it (the July-2026 plugin pays the `enterCost` quote; the
    //   May-2026 plugin hard-codes the flat MBR and never pays `'i'`, so no pair is stored for it and
    //   `gateCheck` falls back to the registry wallet that owns the entrant at rest).
    //   A legacy entry whose gate args make the flat charge too small must leave reward reserves covered.
    let legacyCharged = false
    let borrowsFreeAlgo = false
    let writePair = pairWallet !== 0 && entries.length > 0
    if (kind === ENTRY_LEGACY_GATED) {
      legacyCharged = true
      const flat = this.getEnterCost(Txn.sender, entries, PoolEntriesMBR, PoolEntriesByAddressMBR, 0)
      const pairDue = writePair && !this.principals(Txn.sender).exists
      if (!(pairDue && paid === flat + PoolPrincipalsMBR)) {
        loggedAssert(paid === flat, errInvalidPayment)
        writePair = writePair && !pairDue
      }
      // the flat charge undercharges gate args longer than 5 encoded bytes; the shortfall may only
      // come from free ALGO, never from ALGO reserved for rewards (checked after the boxes exist)
      borrowsFreeAlgo = this.entryBoxMbr(gateArgs) + PoolEntriesByAddressExactMBR > PoolEntriesMBR + PoolEntriesByAddressMBR
    } else {
      const exact = this.exactEnterCost(Txn.sender, entries, gateArgs, pairWallet)
      if (paid !== exact) {
        loggedAssert(
          kind === ENTRY_UNGATED &&
          paid === this.getEnterCost(Txn.sender, entries, PoolEntriesMBR, PoolEntriesByAddressMBR, 0),
          errInvalidPayment
        )
        legacyCharged = true
      }
    }

    if (writePair) {
      // the latest verified pair wins (one pair per entrant; its MBR is charged once)
      this.principals(Txn.sender).value = { wallet: pairWallet, principal: pairPrincipal }
    }

    const { address, name } = this.stakeKey.value
    const staking = Application(getAkitaAppList(this.akitaDAO.value).staking)
    const poolType = this.type.value

    // typed pools weigh real stake, so the staked asset must come from the pool's asset list (H-2)
    loggedAssert(poolType === POOL_STAKING_TYPE_NONE || address !== Global.zeroAddress, errTypedPoolNeedsStakeKey)

    for (let i: uint64 = 0; i < entries.length; i++) {
      const { asset, proof } = clone(entries[i])
      let quantity = entries[i].quantity
      if (poolType === POOL_STAKING_TYPE_NONE) {
        // nothing backs a NONE entry's quantity: every entry weighs 1 (ST-1)
        quantity = 1
      } else {
        loggedAssert(quantity > 0, errInvalidQuantity)
        loggedAssert(quantity >= this.minimumStakeAmount.value, errQuantityBelowMinStake)
      }

      if (address !== Global.zeroAddress) {
        const verified = abiCall<typeof Meta.prototype.verify>({
          appId: getAkitaAppList(this.akitaDAO.value).metaMerkles,
          args: [
            address,
            name,
            sha256(sha256(itob(asset))),
            proof,
            MERKLE_TREE_TYPE_ASSET,
          ],
        }).returnValue

        loggedAssert(verified, errFailedStakeVerify)
      }

      // Heartbeat entries are balance based and do not create a commitment.
      if (poolType === POOL_STAKING_TYPE_HEARTBEAT) {
        let balance: uint64 = 0
        let optedIn: boolean = false;
        if (asset !== 0) {
          ([balance, optedIn] = AssetHolding.assetBalance(Txn.sender, asset))
        } else {
          optedIn = true
          balance = Txn.sender.balance
        }
        loggedAssert(optedIn && balance >= quantity, errUserBalanceTooLow)
      }

      const aKey = {
        address: Txn.sender,
        asset,
      }
      loggedAssert(!this.entriesByAddress(aKey).exists, errEntryAlreadyExists)

      if (poolType === POOL_STAKING_TYPE_SOFT) {
        abiCall<typeof Staking.prototype.commitAppSoftStake>({
          appId: staking,
          args: [
            itxn.payment({ receiver: staking.address, amount: AppStakesMBR }),
            Txn.sender,
            asset,
            quantity,
            true,
          ],
        })
      } else if (poolType !== POOL_STAKING_TYPE_NONE && poolType !== POOL_STAKING_TYPE_HEARTBEAT) {
        // (a heartbeat stake's recorded amount is caller-chosen; heartbeat pools use the
        // manager-sampled average instead, checked every round)
        const stakeInfo = abiCall<typeof Staking.prototype.getInfo>({
          appId: staking,
          args: [
            Txn.sender,
            {
              asset,
              type: poolType,
            },
          ],
        }).returnValue

        loggedAssert(stakeInfo.amount >= quantity, errUserStakeTooLow)
      }

      const entryID = this.newEntryID()
      this.entries(entryID).value = {
        address: Txn.sender,
        asset,
        quantity,
        gateArgs: clone(gateArgs),
        disqualified: false,
        legacyCharged,
        heldOut: false,
      }

      this.entriesByAddress(aKey).value = entryID
      const [count, entered] = this.uniques(Txn.sender).maybe()
      this.uniques(Txn.sender).value = entered ? count + 1 : 1
    }

    if (borrowsFreeAlgo) {
      this.assertAlgoReservesCovered()
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
    this.principalVersion.value = PoolPrincipalVersion
    this.akitaDAO.value = akitaDAO
    this.akitaDAOEscrow.value = clone(akitaDAOEscrow)
  }

  /**
   * Completes factory-only initialization with the creator-specific royalty.
   */
  init(akitaRoyalty: uint64): void {
    loggedAssert(Global.callerApplicationAddress === Global.creatorAddress, errFactoryOnlyInit)
    this.akitaRoyalty.value = akitaRoyalty
  }

  /**
   * Factory-only. The pool must be a draft or past its end, with no open round, every reward
   * closed and every asset closed out (boxes and holdings must be gone for the account to close).
   * Free ALGO goes to the pool creator; the remaining minimum balance closes to the factory,
   * which refunds the creation funder (M-5).
   */
  @abimethod({ allowActions: 'DeleteApplication' })
  delete(caller: Account): void {
    loggedAssert(Txn.sender === Global.creatorAddress, errFactoryOnlyDelete)
    loggedAssert(caller === this.creator.value, errCreatorOnlyDelete)
    loggedAssert(this.status.value === PoolStatusDraft || this.isEnded(), errPoolNotDraftOrEnded)
    this.assertNoOpenRound()
    loggedAssert(this.committedOf(0) === 0, errAssetCommitted)

    const self = Global.currentApplicationAddress
    if (self.balance > self.minBalance) {
      itxn.payment({ receiver: this.creator.value, amount: self.balance - self.minBalance }).submit()
    }

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
    loggedAssert(Txn.sender === this.creator.value, errForbidden)

    let optinMBR: uint64 = Global.assetOptInMinBalance
    // check if the akita dao escrow is opted in to the asset
    // if it does that means 4 extra optins are needed
    if (!this.akitaDAOEscrow.value.app.address.isOptedIn(asset)) {
      const count = splitOptInCount(this.akitaDAO.value, this.akitaDAOEscrow.value.app.address, asset)
      optinMBR += Global.assetOptInMinBalance * count
    }

    const rewardsMBR: uint64 = this.rewardsMbr(WinnerCountCap) * 2

    loggedAssert(payment.receiver === Global.currentApplicationAddress, errInvalidPayment)
    loggedAssert(payment.amount === optinMBR + rewardsMBR, errInvalidPayment)

    itxn
      .assetTransfer({
        assetReceiver: Global.currentApplicationAddress,
        assetAmount: 0,
        xferAsset: asset,
      })
      .submit()

    this.optAkitaEscrowInAndSend(asset, 0)
  }

  /**
   * Creator closes the pool out of an ASA once no reward reserves it; any remaining balance goes
   * to the creator (M-5). Required before the pool can be deleted.
   */
  closeOutAsset(asset: Asset): void {
    loggedAssert(Txn.sender === this.creator.value, errForbidden)
    this.assertDraftOrEnded()
    this.assertNoOpenRound()
    loggedAssert(this.committedOf(asset.id) === 0, errAssetCommitted)

    itxn
      .assetTransfer({
        assetReceiver: this.creator.value,
        assetAmount: 0,
        assetCloseTo: this.creator.value,
        xferAsset: asset,
      })
      .submit()
  }

  /**
   * Adds a reward. ALGO: the payment beyond the reward box MBR becomes the reward's budget.
   * ASA (via `addRewardAsa`): the transferred amount becomes the budget.
   */
  addReward(payment: gtxn.PaymentTxn, reward: AddRewardParams): void {
    loggedAssert(Txn.sender === this.creator.value, errForbidden)
    const isAlgo = Txn.applicationArgs(0) === methodSelector(this.addReward)
    if (isAlgo) {
      loggedAssert(reward.asset === 0, errNotAlgo)
    }

    this.validateReward(reward)

    assertPlainPayment(payment)
    loggedAssert(payment.receiver === Global.currentApplicationAddress, errInvalidPayment)
    // a payer other than the creator also funds a payer record, and gets the reward's box MBR back
    // at `closeReward`; the budget stays the creator's
    const sponsor = sponsorCost(payment.sender, Txn.sender)
    const boxMbr = this.rewardsMbr(reward.winnerCount)
    loggedAssert(payment.amount >= boxMbr + sponsor, errInvalidPayment)
    // ALGO rewards pay their bookkeeping boxes out of the deposit; ASA rewards from free ALGO
    // (the reward box MBR rule is unchanged so already-deployed plugins keep working)
    const algoCost: uint64 = this.addRewardCost(reward.winnerCount, reward.asset) + sponsor
    if (isAlgo) {
      loggedAssert(payment.amount >= algoCost, errInvalidPayment)
    }

    const id = this.newRewardID()
    recordPayer(this.rewards(id).key, payment.sender, Txn.sender)
    this.rewards(id).value = {
      ...clone(reward),
      qualifiedStakers: 0,
      qualifiedStake: 0,
      royaltyAmount: 0,
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

    // a budget box always exists for new rewards (a missing one marks a legacy reward)
    this.creditBudget(id, reward.asset, isAlgo ? payment.amount - algoCost : 0)
    this.assertAlgoReservesCovered()
  }

  addRewardAsa(payment: gtxn.PaymentTxn, assetXfer: gtxn.AssetTransferTxn, reward: AddRewardParams): void {
    assertSafeAssetTransfer(assetXfer, Txn.sender)
    loggedAssert(assetXfer.assetReceiver === Global.currentApplicationAddress, errInvalidTransfer)
    loggedAssert(assetXfer.xferAsset === Asset(reward.asset), errInvalidTransfer)
    loggedAssert(assetXfer.assetAmount > 0, errInvalidTransfer)

    this.addReward(payment, reward)
    this.creditBudget(this.rewardID.value - 1, reward.asset, assetXfer.assetAmount)
  }

  /**
   * Creator reserves free funds of the reward's asset (for example a plain top-up transfer, or
   * funds of a pre-budget pool) for a reward (M-5).
   */
  assignBudget(rewardID: uint64, amount: uint64): void {
    loggedAssert(Txn.sender === this.creator.value, errForbidden)
    loggedAssert(this.rewards(rewardID).exists, errRewardNotFound)
    const asset = this.rewards(rewardID).value.asset
    loggedAssert(this.freeFunds(asset) >= amount, errNotEnoughFunds)
    this.creditBudget(rewardID, asset, amount)
  }

  /** Creator withdraws unspent reward budget once the pool is a draft or has ended (M-5). */
  withdrawReward(rewardID: uint64, amount: uint64): void {
    loggedAssert(Txn.sender === this.creator.value, errForbidden)
    loggedAssert(this.rewards(rewardID).exists, errRewardNotFound)
    this.assertDraftOrEnded()
    const { asset, phase } = this.rewards(rewardID).value
    loggedAssert(phase === DisbursementPhaseIdle, errRewardAlreadyInDisbursement)

    this.debitBudget(rewardID, asset, amount)
    this.payOut(this.creator.value, asset, amount)
  }

  /**
   * Creator deletes an idle reward with no budget left. The box MBR it frees goes to whoever funded
   * the reward: the creator, unless someone else paid (M-5).
   */
  closeReward(rewardID: uint64): void {
    loggedAssert(Txn.sender === this.creator.value, errForbidden)
    loggedAssert(this.rewards(rewardID).exists, errRewardNotFound)
    this.assertDraftOrEnded()
    loggedAssert(this.rewards(rewardID).value.phase === DisbursementPhaseIdle, errRewardAlreadyInDisbursement)
    loggedAssert(this.budgetOf(rewardID) === 0, errRewardBudget)

    const minBefore = Global.currentApplicationAddress.minBalance
    this.rewards(rewardID).delete()
    if (this.budgets(rewardID).exists) {
      this.budgets(rewardID).delete()
    }
    const freed: uint64 = minBefore - Global.currentApplicationAddress.minBalance
    const [receiver, amount] = releaseDeposit(this.rewards(rewardID).key, this.creator.value, freed)
    this.payOut(receiver, 0, amount)
  }

  finalize(signupTimestamp: uint64, startTimestamp: uint64, endTimestamp: uint64) {
    loggedAssert(Txn.sender === this.creator.value, errCreatorOnlyFinalize)
    loggedAssert(this.status.value === PoolStatusDraft, errPoolMustBeDraft)
    loggedAssert(
      signupTimestamp > Global.latestTimestamp || (signupTimestamp === 0 && this.allowLateSignups.value),
      errInvalidSignupTimestamp
    )
    // if start is zero then signup must also be zero and allowLateSignups must be true
    if (startTimestamp !== 0) {
      loggedAssert(startTimestamp > Global.latestTimestamp, errInvalidStartTimestamp)
    }

    if (startTimestamp === 0) {
      loggedAssert(signupTimestamp === 0 && this.allowLateSignups.value, errInvalidStartZeroRequiresLate)
      startTimestamp = Global.latestTimestamp
    }

    if (endTimestamp !== 0) {
      loggedAssert(endTimestamp > (startTimestamp + 10), errInvalidEndTimestamp)
    }

    this.signupTimestamp.value = signupTimestamp
    this.startTimestamp.value = startTimestamp
    this.endTimestamp.value = endTimestamp
    this.status.value = PoolStatusFinal
  }

  /**
   * Creator ends a perpetual (endTimestamp = 0) pool. Entrants keep a one-week grace period of
   * rounds before budgets can be withdrawn and the pool cleaned up (M-5).
   */
  endPool(): void {
    loggedAssert(Txn.sender === this.creator.value, errForbidden)
    loggedAssert(this.status.value === PoolStatusFinal, errPoolMustBeDraft)
    loggedAssert(this.endTimestamp.value === 0, errInvalidEndTimestamp)
    this.endTimestamp.value = Global.latestTimestamp + EndPoolGracePeriod
  }

  /**
   * Gated entry with a wallet hint (PHASE-0-SPEC §6.5). The gate txn must be
   * `Gate.mustCheckFor(gateCtx(principalOf(dao, wallet)), gateID, args)`; the verified pair
   * `(p.wallet, p.principal)` is stored per entrant when `wallet != 0`, so the permissionless
   * `gateCheck` re-checks the same principal later without reading any wallet global.
   * @param wallet the caller's ARC-58 wallet hint (0 = act as `Txn.sender`); plugins pass `windowHint(wallet)`
   */
  @abimethod({ name: 'gatedEnter' })
  hintedGatedEnter(
    payment: gtxn.PaymentTxn,
    gateTxn: gtxn.ApplicationCallTxn,
    entries: StakeEntry[],
    wallet: uint64,
  ): void {
    const p = principalOf(this.akitaDAO.value, wallet)

    loggedAssert(this.gateID.value !== 0, errGateIdNotSet)
    loggedAssert(gateCheckCtx(gateTxn, this.akitaDAO.value, gateCtx(p), this.gateID.value), errFailedGate)

    this.createPoolEntries(payment, entries, getGateArgs(gateTxn), p.wallet, p.principal, ENTRY_HINTED)
  }

  /**
   * LEGACY SHIM `gatedEnter(pay,appl,(uint64,uint64,byte[32][])[])void` (deployed staking-pool plugin
   * 3642438287; delete in Phase 4). Registry gate subject and `Gate.mustCheck`, as deployed. It also
   * stores `'i'` = `(W, legacyOriginOr(W, S))` when the registry names a genuine wallet `W` for the
   * sender, so a later third-party `gateCheck` re-checks the origin, not the spender (§6.5, R11).
   * Entries keep the flat pre-Q14 charge that the legacy `enterCost` quotes.
   * (TS name kept: `mocks/fake-wallet` binds `StakingPool.prototype.gatedEnter`.)
   */
  gatedEnter(
    payment: gtxn.PaymentTxn,
    gateTxn: gtxn.ApplicationCallTxn,
    entries: StakeEntry[],
  ): void {
    const wallet = legacyWalletOf(this.akitaDAO.value, Txn.sender)
    const origin = legacyOriginOrTxnSender(wallet)

    loggedAssert(this.gateID.value !== 0, errGateIdNotSet)
    loggedAssert(gateCheck(gateTxn, this.akitaDAO.value, origin, this.gateID.value), errFailedGate)

    this.createPoolEntries(payment, entries, getGateArgs(gateTxn), wallet.id, origin, ENTRY_LEGACY_GATED)
  }

  /**
   * Ungated entry. Pays the exact box MBR (`enterCost`), or the flat pre-Q14 MBR that older plugins
   * hard-code (refunded as charged).
   */
  enter(payment: gtxn.PaymentTxn, entries: StakeEntry[]): void {
    loggedAssert(this.gateID.value === 0, errGateIdSet)
    this.createPoolEntries(payment, entries, [], 0, Txn.sender, ENTRY_UNGATED)
  }

  /**
   * Removes an entry and refunds its box MBR (and, for SOFT pools, its Staking commitment's MBR)
   * to whoever funded the entrant's entries: the entrant, unless someone else paid (M-5). The
   * entrant may leave any time no round is open; after the pool ends anyone may clean up.
   */
  removeEntry(address: Account, asset: uint64): void {
    this.assertNoOpenRound()
    loggedAssert(Txn.sender === address || this.isEnded(), errNotEntrant)

    const key: EntryKey = { address, asset }
    loggedAssert(this.entriesByAddress(key).exists, errEntryNotFound)
    const id = this.entriesByAddress(key).value

    // refund exactly what the entry was charged: the flat pre-Q14 MBR for `legacyCharged` entries,
    // otherwise the exact box MBR the deletions release (Q14)
    let refund: uint64 = PoolEntriesMBR + PoolEntriesByAddressMBR
    this.entriesByAddress(key).delete()
    if (this.entries(id).exists) {
      if (!this.entries(id).value.legacyCharged) {
        refund = BoxCostPerBox + (BoxCostPerByte * (1 + 8 + this.entries(id).length)) + PoolEntriesByAddressExactMBR
      }
      this.entries(id).delete()
    }

    const [count, entered] = this.uniques(address).maybe()
    let last = false
    if (entered) {
      if (count > 1) {
        this.uniques(address).value = count - 1
      } else {
        last = true
        this.uniques(address).delete()
        refund += PoolUniquesMBR
        // the stored pair lives as long as the entrant has an entry
        if (this.principals(address).exists) {
          this.principals(address).delete()
          refund += PoolPrincipalsMBR
        }
      }
    }

    if (this.type.value === POOL_STAKING_TYPE_SOFT) {
      // Staking returns the commitment's MBR to this pool, which passes it on with the entry's own
      abiCall<typeof Staking.prototype.reclaimAppStake>({
        appId: getAkitaAppList(this.akitaDAO.value).staking,
        args: [address, asset],
      })
      refund += AppStakesMBR
    }

    // everything goes back to whoever funded the entrant's entries; the payer record goes with the last one
    const payerRecord = this.uniques(address).key
    let receiver = address
    if (last) {
      ([receiver, refund] = releaseDeposit(payerRecord, address, refund))
    } else {
      const payer = payerOf(payerRecord, address)
      if (canReceiveAlgo(payer, refund)) {
        receiver = payer
      }
    }

    itxn.payment({ receiver, amount: refund }).submit()
  }

  startDisbursement(rewardID: uint64): void {
    loggedAssert(this.isLive(), errPoolNotLive)
    loggedAssert(this.rewards(rewardID).exists, errRewardNotFound)

    const { phase, interval, lastDisbursementTimestamp } = this.rewards(rewardID).value

    loggedAssert(phase === DisbursementPhaseIdle, errRewardAlreadyInDisbursement)
    loggedAssert(this.validWindow(interval, lastDisbursementTimestamp), errDistributionWindowNotOpen)
    // one round per pool: another reward's preparation would disqualify entries under this
    // round's frozen qualified set and shift its shuffle ranges (STAKE-1)
    this.assertNoOpenRound()

    // the Rewards disbursement is created once preparation finds qualified stakers (M-1)
    this.rewards(rewardID).value.qualifiedStakers = 0
    this.rewards(rewardID).value.qualifiedStake = 0
    this.rewards(rewardID).value.royaltyAmount = 0
    this.rewards(rewardID).value.phase = DisbursementPhasePreparation
    this.rewards(rewardID).value.disbursementCursor = 1 // Entry IDs start at 1
    this.rewards(rewardID).value.activeDisbursementID = 0
    this.rewards(rewardID).value.activeDisbursementRoundStart = 0
    this.rewards(rewardID).value.lastDisbursementTimestamp = Global.latestTimestamp
    this.openRound()
    this.assertAlgoReservesCovered()
  }

  /** The first beacon-stored round at least DRAW_DELAY_ROUNDS ahead. */
  private drawRound(): uint64 {
    return (Global.round + DRAW_DELAY_ROUNDS + BEACON_ROUND_INTERVAL - 1) / BEACON_ROUND_INTERVAL * BEACON_ROUND_INTERVAL
  }

  /**
   * Draws the shuffle tickets from the beacon round committed when allocation started
   * (`activeDisbursementRoundStart`). The read waits BEACON_LAG_ROUNDS past that round. An empty
   * read reverts, so nobody can push the commitment forward and stall the round (TRADE-3); only
   * after BEACON_MAX_WAIT_ROUNDS does it re-commit, and never to an already-public round.
   */
  raffle(rewardID: uint64): void {
    loggedAssert(this.rewards(rewardID).exists, errRewardNotFound)
    const {
      phase,
      distribution,
      winningTickets,
      activeDisbursementRoundStart,
      vrfFailureCount,
      qualifiedStake,
      winnerCount,
    } = clone(this.rewards(rewardID).value)

    loggedAssert(distribution === DistributionTypeShuffle, errNotShuffle)
    loggedAssert(phase === DisbursementPhaseAllocation, errInvalidDisbursementPhase)
    loggedAssert(winningTickets.length === 0, errWinningTicketsAlreadyExist)

    // with less than two units of weight there is only one possible winner: no randomness needed
    if (qualifiedStake < 2) {
      const tickets: uint64[] = []
      for (let i: uint64 = 0; i < winnerCount; i++) {
        tickets.push(0)
      }
      this.rewards(rewardID).value.winningTickets = clone(tickets)
      return
    }

    loggedAssert(Global.round >= activeDisbursementRoundStart + BEACON_LAG_ROUNDS, errBeaconNotReady)

    const seed = abiCall<typeof RandomnessBeacon.prototype.get>({
      appId: getOtherAppList(this.akitaDAO.value).vrfBeacon,
      args: [activeDisbursementRoundStart, this.salt.value],
    }).returnValue

    if (seed.length === 0) {
      loggedAssert(Global.round >= activeDisbursementRoundStart + BEACON_MAX_WAIT_ROUNDS, errBeaconNotReady)
      this.rewards(rewardID).value.vrfFailureCount = vrfFailureCount + 1
      this.rewards(rewardID).value.activeDisbursementRoundStart = this.drawRound()
      return
    }

    // Initialize PCG randomness with the seed
    const rngState = pcg64Init(seed.slice(0, 16))

    // tickets in [0, qualifiedStake): exactly the weight ranges of the qualified entries (H-6)
    const rngResult = pcg64Random(rngState, 0, qualifiedStake, winnerCount)

    this.rewards(rewardID).value.winningTickets = decodeArc4<uint64[]>(rngResult[1].bytes)
    this.rewards(rewardID).value.vrfFailureCount = 0
  }

  disburseRewards(rewardID: uint64, iterationAmount: uint64): void {
    loggedAssert(this.rewards(rewardID).exists, errRewardNotFound)

    const { phase, distribution, winningTickets } = clone(this.rewards(rewardID).value)

    if (phase !== DisbursementPhasePreparation) {
      loggedAssert(phase === DisbursementPhaseAllocation, errNotReadyToDisburse)
    }

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
          loggedAssert(false, errUnknownRewardRateType)
        }
      }
    }
  }

  finalizeDistribution(rewardID: uint64): void {
    loggedAssert(this.rewards(rewardID).exists, errRewardNotFound)
    const { phase, activeDisbursementID, expiration } = this.rewards(rewardID).value
    loggedAssert(phase === DisbursementPhaseFinalization, errDisbursementNotReadyForFinalization)

    this.settleDisbursement(rewardID, activeDisbursementID, expiration)
    this.closeRound(rewardID)
    this.assertAlgoReservesCovered()
  }

  /**
   * Creator or DAO wallet unsticks a reward round (M-1). `mode` decides what happens to a Rewards
   * disbursement the round already created:
   * 0 = leave it (e.g. it lives on a previous Rewards app), 1 = finalize it so existing
   * allocations become claimable, 2 = close it (only possible when it has no allocations).
   */
  abortRound(rewardID: uint64, mode: uint64): void {
    loggedAssert(
      Txn.sender === this.creator.value || Txn.sender === this.getAkitaDAOWallet().address,
      errAbortForbidden
    )
    loggedAssert(this.rewards(rewardID).exists, errRewardNotFound)
    const { phase, activeDisbursementID, expiration } = this.rewards(rewardID).value
    loggedAssert(phase !== DisbursementPhaseIdle, errInvalidDisbursementPhase)

    if (activeDisbursementID !== 0 && mode !== ABORT_LEAVE) {
      const rewardsApp = Application(getAkitaAppList(this.akitaDAO.value).rewards)
      if (mode === ABORT_FINALIZE) {
        abiCall<typeof Rewards.prototype.editDisbursement>({
          appId: rewardsApp,
          args: [activeDisbursementID, `${this.title.value} - Rewards`, 0, Global.latestTimestamp + expiration, ''],
        })
        abiCall<typeof Rewards.prototype.finalizeDisbursement>({
          appId: rewardsApp,
          args: [activeDisbursementID],
        })
        this.roundRewards(activeDisbursementID).value = rewardID
      } else {
        loggedAssert(mode === ABORT_CLOSE, errInvalidDisbursementPhase)
        abiCall<typeof Rewards.prototype.closeDisbursement>({
          appId: rewardsApp,
          args: [activeDisbursementID],
        })
      }
    }

    this.closeRound(rewardID)
  }

  /**
   * Recovers what a finalized round left in Rewards (M-5). Anyone may call it.
   * - `reclaims`: expired, unclaimed allocations; the funds return to the round's reward budget.
   * - `close`: once the disbursement has no allocations left, delete it; its box MBR and unused
   *   allocation credits return to the pool as free ALGO.
   */
  reclaimRound(disbursementID: uint64, reclaims: AllocationReclaimDetails[], close: boolean): void {
    loggedAssert(this.roundRewards(disbursementID).exists, errRewardNotFound)
    const rewardID = this.roundRewards(disbursementID).value
    const rewardsApp = Application(getAkitaAppList(this.akitaDAO.value).rewards)

    if (reclaims.length > 0) {
      let asset: uint64 = 0
      let rewardExists = false
      if (this.rewards(rewardID).exists) {
        asset = this.rewards(rewardID).value.asset
        rewardExists = true
      }

      const self = Global.currentApplicationAddress
      const before: uint64 = asset === 0 ? self.balance : AssetHolding.assetBalance(self, asset)[0]

      abiCall<typeof Rewards.prototype.reclaimRewards>({
        appId: rewardsApp,
        args: [disbursementID, clone(reclaims)],
      })

      const after: uint64 = asset === 0 ? self.balance : AssetHolding.assetBalance(self, asset)[0]
      // reclaimed reward funds go back to the reward that paid them (if it still exists)
      if (rewardExists && after > before) {
        this.creditBudget(rewardID, asset, after - before)
      }
    }

    if (close) {
      abiCall<typeof Rewards.prototype.closeDisbursement>({
        appId: rewardsApp,
        args: [disbursementID],
      })
      this.roundRewards(disbursementID).delete()
    }
  }

  check(address: Account, asset: uint64): { valid: boolean, balance: uint64 } {
    // disqualifications must not change the qualified set of an open round (H-4 / H-6)
    this.assertNoOpenRound()
    const key: EntryKey = { address, asset }
    const id = this.entriesByAddress(key).value
    return this.checkByID(id, 0)
  }

  /**
   * Re-evaluates the pool gate for an entrant with the arguments the entrant itself supplied at
   * entry, and disqualifies the entry if it no longer passes (H-5). Anyone may call it.
   */
  gateCheck(address: Account, asset: uint64): void {
    loggedAssert(this.gateID.value !== 0, errGateIdNotSet)
    this.assertNoOpenRound()

    const key: EntryKey = { address, asset }
    const id = this.entriesByAddress(key).value

    // PHASE-0-SPEC §6.5 / §3.8 rule 2: the subject comes from the pair stored at entry and is
    // re-checked with `AppCreator`/`AuthAddr` only, so no wallet global is read and an entrant cannot
    // make this panic. No pair: the entrant acted as itself.
    let ctx: GateCtx = { principal: address, wallet: 0, spender: address }
    if (this.principals(address).exists) {
      const pair = clone(this.principals(address).value)
      ctx = {
        principal: atRestPrincipalOf(this.akitaDAO.value, address, pair.wallet, pair.principal),
        wallet: ownsAtRestOf(this.akitaDAO.value, pair.wallet, address) ? pair.wallet : 0,
        spender: address,
      }
    } else if (this.entries(id).value.legacyCharged) {
      // LEGACY (compatibility window; delete in Phase 4): a legacy-shim entry without a pair (the
      // May-2026 plugin never pays `'i'`). Its registry wallet W counts only if it owns the entrant
      // at rest, and then the subject is W.address while W.address is un-rekeyed (the subject the
      // shim checked for a default wallet). Registry + AppCreator/AuthAddr only: never panics.
      const wallet = legacyWalletOf(this.akitaDAO.value, address)
      if (wallet.id !== 0 && ownsAtRestOf(this.akitaDAO.value, wallet.id, address)) {
        ctx = {
          principal: atRestPrincipalOf(this.akitaDAO.value, address, wallet.id, wallet.address),
          wallet: wallet.id,
          spender: address,
        }
      }
    }

    const passes = abiCall<typeof Gate.prototype.checkFor>({
      appId: getAkitaAppList(this.akitaDAO.value).gate,
      args: [ctx, this.gateID.value, clone(this.entries(id).value.gateArgs)],
    }).returnValue

    if (!passes) {
      this.entries(id).value.disqualified = true
    }
  }

  // READ ONLY METHODS ----------------------------------------------------------------------------

  /**
   * Calculates the total cost required to enter the pool
   * @param address The address that will be entering
   * @param entries The entries being added
   * @returns The entry box MBR plus any app-scoped SOFT stake MBR
   */
  /**
   * Calculates the total cost required to enter the pool (PHASE-0-SPEC §6.5, Q14).
   * @param address The address that will be entering
   * @param entries The entries being added
   * @param args The gate args the gate txn will carry (stored per entry; ignored by ungated pools)
   * @param wallet The wallet hint `gatedEnter` will receive: non-zero adds the stored pair `'i'`
   *               (31,700) on a gated pool when the entrant has none yet
   * @returns The exact entry box MBR plus any app-scoped SOFT stake MBR
   */
  @abimethod({ readonly: true, name: 'enterCost' })
  hintedEnterCost(address: Account, entries: StakeEntry[], args: GateArgs, wallet: uint64): uint64 {
    if (this.gateID.value === 0) {
      return this.exactEnterCost(address, entries, [], 0)
    }
    return this.exactEnterCost(address, entries, args, wallet)
  }

  /**
   * LEGACY SHIM `enterCost(address,(uint64,uint64,byte[32][])[])uint64` (deployed plugin; delete in
   * Phase 4). Ungated pools: the exact `enter` charge. Gated pools: what the legacy `gatedEnter`
   * shim charges (flat pre-Q14 box MBR, plus `'i'` when the registry names a genuine wallet).
   */
  @abimethod({ readonly: true })
  enterCost(address: Account, entries: StakeEntry[]): uint64 {
    return this.legacyEnterCost(address, entries)
  }

  @abimethod({ readonly: true })
  optInCost(asset: Asset): uint64 {
    const count = splitOptInCount(this.akitaDAO.value, this.akitaDAOEscrow.value.app.address, asset)
    return (Global.assetOptInMinBalance * (1 + count)) + (this.rewardsMbr(WinnerCountCap) * 2)
  }

  /**
   * @returns the MBR an `addReward` payment must cover before its surplus becomes the ALGO
   * budget: the reward box plus the reward's budget box and, the first time, the asset's total box.
   */
  @abimethod({ readonly: true })
  addRewardCost(winnerCount: uint64, asset: uint64): uint64 {
    return this.rewardsMbr(winnerCount) + PoolUint64BoxMapMBR + (this.committed(asset).exists ? 0 : PoolUint64BoxMapMBR)
  }

  /** @returns the reward's remaining budget (0 for a legacy reward without one) */
  @abimethod({ readonly: true })
  getRewardBudget(rewardID: uint64): uint64 {
    return this.budgetOf(rewardID)
  }

  /** @returns funds of `asset` not reserved by any reward (ALGO: above the minimum balance) */
  @abimethod({ readonly: true })
  getFreeFunds(asset: uint64): uint64 {
    return this.freeFunds(asset)
  }

  /** @returns the number of reward rounds currently open */
  @abimethod({ readonly: true })
  getOpenRounds(): uint64 {
    return this.openRounds()
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

  /** @returns the entrant's stored pair `(W, principal)` (`(0, address)` when none is stored) */
  @abimethod({ readonly: true })
  getStoredPrincipal(address: Account): StoredPrincipal {
    if (!this.principals(address).exists) {
      return { wallet: 0, principal: address }
    }
    return clone(this.principals(address).value)
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
      entryCount: (this.entryID.value - 1),
      rewardCount: (this.rewardID.value - 1),
      stakeKey: this.stakeKey.value,
      minimumStakeAmount: this.minimumStakeAmount.value,
      gateID: this.gateID.value,
      creator: this.creator.value,
    }
  }
}

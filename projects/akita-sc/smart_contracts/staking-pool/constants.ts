import { uint64 } from "@algorandfoundation/algorand-typescript"
import { Uint8 } from "@algorandfoundation/algorand-typescript/arc4"
import { DisbursementPhase, DistributionType, StakingPoolStakingType, StakingPoolStatus } from "./types"

export const PoolGlobalStateUintCount: uint64 = 13
export const PoolGlobalStateBytesCount: uint64 = 8


export const PoolGlobalStateKeyStatus = 'status'
export const PoolGlobalStateKeyDisbursementPhase = 'disbursement_phase'
export const PoolGlobalStateKeyTitle = 'title'
export const PoolGlobalStateKeyType = 'type'
export const PoolGlobalStateKeyRewardCount = 'reward_count'
export const PoolGlobalStateKeySignupTimestamp = 'signup_timestamp'
export const PoolGlobalStateKeyAllowLateSignups = 'allow_late_signups'
export const PoolGlobalStateKeyStartTimestamp = 'start_timestamp'
export const PoolGlobalStateKeyStartRound = 'start_round'
export const PoolGlobalStateKeyEndTimestamp = 'end_timestamp'
export const PoolGlobalStateKeyRewardInterval = 'reward_interval'
export const PoolGlobalStateKeyLastDisbursementTimestamp = 'last_disbursement_timestamp'
export const PoolGlobalStateKeyMaxEntries = 'max_entries'
/** entries that exist now (STK-04) */
export const PoolGlobalStateKeyLiveEntries = 'live_entries'
export const PoolGlobalStateKeyEntryCount = 'entry_count'
export const PoolGlobalStateKeyUniqueAssetsStaked = 'unique_assets_staked'
export const PoolGlobalStateKeyStakeKey = 'stake_key'
export const PoolGlobalStateKeyMinimumStakeAmount = 'minimum_stake_amount'
export const PoolGlobalStateKeyGateID = 'gate_id'
export const PoolGlobalStateKeyCreator = 'creator'
export const PoolGlobalStateKeyMarketplace = 'marketplace'
export const PoolGlobalStateKeyMarketplaceRoyalties = 'marketplace_royalties'
export const PoolGlobalStateKeyAkitaRoyalty = 'akita_royalty'
export const PoolGlobalStateKeySalt = 'salt'
export const PoolGlobalStateKeyActiveDisbursementID = 'active_disbursement_id'
export const PoolGlobalStateKeyActiveDisbursementWindow = 'active_disbursement_window'
export const PoolGlobalStateKeyDisbursementCursor = 'disbursement_cursor'
export const PoolGlobalStateKeyQualifiedStake = 'qualified_stake'
export const PoolGlobalStateKeyWinningTickets = 'wtickets'
export const PoolGlobalStateKeyRaffleCursor = 'raffle_cursor'
export const PoolGlobalStateKeyVRFFailureCount = 'vrf_failure_count'

export const PoolBoxPrefixEntries = 'e'
export const PoolGlobalStateKeyUniques = 'u'
export const PoolBoxPrefixEntriesByAddress = 'a'
export const PoolBoxPrefixDisbursements = 'd'
export const PoolBoxPrefixRewards = 'r'

export const PoolStatusDraft: StakingPoolStatus = new Uint8(0)
export const PoolStatusFinal: StakingPoolStatus = new Uint8(10)

export const POOL_STAKING_TYPE_NONE: StakingPoolStakingType = new Uint8(0)
export const POOL_STAKING_TYPE_HEARTBEAT: StakingPoolStakingType = new Uint8(10)
export const POOL_STAKING_TYPE_SOFT: StakingPoolStakingType = new Uint8(20)
export const POOL_STAKING_TYPE_HARD: StakingPoolStakingType = new Uint8(30)
export const POOL_STAKING_TYPE_LOCK: StakingPoolStakingType = new Uint8(40)

/**
 * disburse the rewards at the given rate based on the users % of stake in the pool
 * eg. the rate is 1000 and a users stake is 6% of the pool, they get 166.66
 */
export const DistributionTypePercentage: DistributionType = new Uint8(10)
/**
 * disburse the rewards at the given rate using a flat amount
 * eg. each user gets 10 AKTA per day if they qualify
 */
export const DistributionTypeFlat: DistributionType = new Uint8(20)
/**
 * disburse the rewards at the given rate evenly among all participants
 * eg. the rate is 1000 & theres 6 stakers, each gets 166.66
 */
export const DistributionTypeEven: DistributionType = new Uint8(30)
/**
 * disburse the rewards randomly to a single user at the given rate
 * eg. the rate is 1000, one random qualified user gets it all
 */
export const DistributionTypeShuffle: DistributionType = new Uint8(40)


export const DisbursementPhaseIdle: DisbursementPhase = new Uint8(0)
export const DisbursementPhasePreparation: DisbursementPhase = new Uint8(10)
export const DisbursementPhaseAllocation: DisbursementPhase = new Uint8(20)
export const DisbursementPhaseFinalization: DisbursementPhase = new Uint8(30)


export const MaxAlgoIterationAmount: uint64 = 128
// the maximum amount we can iterate in a single txn group
// if the reward is not algo we call 3 transactions per allocation
// so max inner txns is 256 / 3 = 85
export const MaxIterationAmount: uint64 = 85

// the maximum amount of uint64's we can store in a single global state key
export const MaxGlobalStateUint64Array: uint64 = 15

export const PoolEntriesMBR: uint64 = 25_300
export const PoolUniquesMBR: uint64 = 18_900
export const PoolEntriesByAddressMBR: uint64 = 25_300
// Reward box key: 1-byte prefix + 8-byte uint64 ID.
// Reward value: 134 fixed bytes, including the per-disbursement royalty amount,
// plus 8 bytes for every winning ticket in the dynamic uint64 array.
export const MinPoolRewardsMBR: uint64 = 59_700
export const PoolRewardWinningTicketBytes: uint64 = 8
export const PoolDisbursementSMBR: uint64 = 6_100


export const WinnerCountCap: uint64 = 10

// --- 2026-10 audit fixes: new boxes (existing children stay layout-compatible) ---------------------
/** single box: number of reward rounds outside Idle (H-4) */
export const PoolBoxKeyActiveRounds = 'x'
/** rewardID -> amount of the reward asset reserved for that reward (M-5) */
export const PoolBoxPrefixBudgets = 'b'
/** asset -> sum of all reward budgets in that asset (M-5) */
export const PoolBoxPrefixCommitted = 'c'
/** rewardID -> amount allocated in the open round (M-1) */
export const PoolBoxPrefixRoundPaid = 'p'
/** Rewards disbursementID -> rewardID for finalized rounds (M-5 reclaim) */
export const PoolBoxPrefixRoundRewards = 'w'

/** 2_500 + 400 * (1 + 8 + 8) */
export const PoolUint64BoxMapMBR: uint64 = 9_300
/** 2_500 + 400 * (1 + 8) */
export const PoolActiveRoundsMBR: uint64 = 6_100
/** Minimum reward expiration window (L-1). */
export const MinRewardExpiration: uint64 = 3_600
/** Grace period entrants get after `endPool` on a perpetual pool (M-5). */
export const EndPoolGracePeriod: uint64 = 604_800

// --- Principal resolution (docs/principal-resolution/PHASE-0-SPEC.md §6.5, Q11, Q14) ---------------
/**
 * Child global uint ABI marker. Present (= `PoolPrincipalVersion`) only on children built with the
 * hinted `gatedEnter(…,uint64)` / `enterCost(…,uint64)` and the legacy shims. Plugins and the SDK
 * read it with `app_global_get_ex` to pick the ABI; older children do not have the key.
 */
export const PoolGlobalStateKeyPrincipalVersion = 'pv'
export const PoolPrincipalVersion: uint64 = 1
/** entrant address -> stored pair `(W, principal)` written at gated entry (§3.8 rule 2) */
export const PoolBoxPrefixPrincipals = 'i'
/** `'i'` box: 2_500 + 400 * ((1 + 32) + (8 + 32)) */
export const PoolPrincipalsMBR: uint64 = 31_700
/**
 * Q14: an `entries` box is `'e'` + uint64 key (9 B) plus the `EntryData` head (address 32 + asset 8 +
 * quantity 8 + gateArgs offset 2 + packed bools 1 = 51 B), plus the ARC-4 encoded `gateArgs` (its
 * 2-byte length prefix included). Exact MBR: 2_500 + 400 * (60 + encodedLen(gateArgs)).
 */
export const PoolEntriesFixedBytes: uint64 = 60
/** Q14: exact `entries` MBR for an entry stored with no gate args (60 + 2 bytes). */
export const PoolEntriesBaseMBR: uint64 = 27_300
/** Q14: exact `entriesByAddress` MBR: 2_500 + 400 * ((1 + 32 + 8) + 8) */
export const PoolEntriesByAddressExactMBR: uint64 = 22_100

// VRF draw for shuffle rewards (TRADE-3, same timing as the auction and raffle). The MainNet beacon
// (1615566206) stores one value per multiple of BEACON_ROUND_INTERVAL rounds and submits it about 2
// rounds later. Allocation commits to the first stored round at least DRAW_DELAY_ROUNDS ahead; the
// draw may read it BEACON_LAG_ROUNDS after that round. An empty read reverts until
// BEACON_MAX_WAIT_ROUNDS have passed (inside the beacon's ~1,512-round window); after that the pool
// closes the round unpaid instead of drawing again (STK-07).
export const DRAW_DELAY_ROUNDS: uint64 = 8
export const BEACON_ROUND_INTERVAL: uint64 = 8
export const BEACON_LAG_ROUNDS: uint64 = 4
export const BEACON_MAX_WAIT_ROUNDS: uint64 = 1_000

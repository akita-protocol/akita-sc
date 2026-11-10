import { BaseSDK } from "../base";
import { StakingPoolClient, StakingPoolArgs, StakingPoolState, StakingPoolMbrData, Reward } from '../generated/StakingPoolClient';
import { GroupReturn, MaybeSigner, NewContractSDKParams } from "../types";
import { AddRewardAsaParams, FinalizePoolParams, EnterPoolParams, StartDisbursementParams, RaffleParams, DisburseRewardsParams, FinalizeDistributionParams, OptinAssetParams, CheckParams, CheckResult, IsEnteredParams, StakingPoolMbrParams, GateCheckParams, AssignBudgetParams, WithdrawRewardParams, CloseRewardParams, CloseOutAssetParams, RemoveEntryParams, AbortRoundParams, ReclaimRoundParams, EnterCostParams, GetStoredPrincipalParams, StoredPrincipal } from "./types";
/** Rounds after the committed beacon round before a shuffle draw may read it (TRADE-3). */
export declare const STAKING_POOL_BEACON_LAG_ROUNDS = 4n;
export * from "./errors";
export * from "./factory";
export * from "./types";
type PoolContractArgs = StakingPoolArgs["obj"];
/** Global uint key of the child ABI marker (`PoolGlobalStateKeyPrincipalVersion`, PHASE-0-SPEC §6.5). */
export declare const STAKING_POOL_PRINCIPAL_VERSION_KEY = "pv";
/** Hinted ABI signatures (the generated client suffixes overloaded names with their argument types). */
export declare const STAKING_POOL_HINTED_GATED_ENTER = "gatedEnter(pay,appl,(uint64,uint64,byte[32][])[],uint64)void";
export declare const STAKING_POOL_LEGACY_GATED_ENTER = "gatedEnter(pay,appl,(uint64,uint64,byte[32][])[])void";
export declare const STAKING_POOL_HINTED_ENTER_COST = "enterCost(address,(uint64,uint64,byte[32][])[],byte[][],uint64)uint64";
export declare const STAKING_POOL_LEGACY_ENTER_COST = "enterCost(address,(uint64,uint64,byte[32][])[])uint64";
/** `gateCheck` of pools created before principal resolution (live MainNet children; caller-supplied gate txn). */
export declare const STAKING_POOL_LEGACY_GATE_CHECK = "gateCheck(appl,address,uint64)void";
/** Box MBR constants of hinted children (Q14 / Q11). */
export declare const STAKING_POOL_PRINCIPALS_MBR = 31700n;
export declare const STAKING_POOL_ENTRY_BASE_MBR = 27300n;
export declare const STAKING_POOL_ENTRY_BY_ADDRESS_MBR = 22100n;
/** ARC-4 encoded length of a `byte[][]` (length prefix, one offset per element, each element's length prefix + bytes). */
export declare function encodedGateArgsLength(args: readonly Uint8Array[]): bigint;
/** Exact `entries` box MBR of a hinted child for an entry stored with `args` (Q14). */
export declare function stakingPoolEntryMbr(args?: readonly Uint8Array[]): bigint;
/**
 * SDK for interacting with an individual Staking Pool contract.
 * Use this to manage pool state, add rewards, and handle entries.
 */
export declare class StakingPoolSDK extends BaseSDK<StakingPoolClient> {
    private hintedPool?;
    constructor(params: NewContractSDKParams);
    /**
     * True when the pool is a principal-resolution child (global `pv`): it has the hinted
     * `gatedEnter(…,uint64)` / `enterCost(…,byte[][],uint64)` next to the legacy shims. Older
     * children only have the legacy ABI. Cached per SDK instance (the marker never changes).
     */
    isHintedPool(): Promise<boolean>;
    /**
     * The stored pair `(W, principal)` the pool re-checks the entrant's gate with (box `'i'`).
     * `{ wallet: 0n, principal: address }` when none is stored or the pool predates the marker.
     */
    getStoredPrincipal({ address }: GetStoredPrincipalParams): Promise<StoredPrincipal>;
    /**
     * Gets the current state of the pool.
     */
    getState(): Promise<StakingPoolState>;
    /**
     * Checks if pool signups are currently open.
     */
    signUpsOpen(): Promise<boolean>;
    /**
     * Checks if the pool is currently live (active).
     */
    isLive(): Promise<boolean>;
    /**
     * Checks if an address is entered in the pool.
     */
    isEntered({ address }: IsEnteredParams): Promise<boolean>;
    /**
     * Checks eligibility and stake amount for an address/asset combination.
     */
    check({ address, asset }: CheckParams): Promise<CheckResult>;
    /**
     * Re-evaluates the pool gate for an entrant with the arguments stored at entry, and
     * disqualifies the entry if it no longer passes. Anyone may call it (no open round).
     */
    gateCheck({ sender, signer, address, asset, gateTxn }: GateCheckParams): Promise<void>;
    /**
     * MBR an ALGO `addReward` payment must cover before its surplus becomes the reward's budget
     * (reward box plus budget bookkeeping boxes).
     */
    getAddRewardCost({ winnerCount, asset }: {
        winnerCount: bigint | number;
        asset: bigint | number;
    }): Promise<bigint>;
    /** Remaining budget reserved for a reward (0 for a legacy reward without one). */
    getRewardBudget(rewardId: bigint | number): Promise<bigint>;
    /** Funds of `asset` (0 = ALGO, above the minimum balance) not reserved by any reward. */
    getFreeFunds(asset: bigint | number): Promise<bigint>;
    /** Number of reward rounds currently open (entries, checks and removals are frozen while > 0). */
    getOpenRounds(): Promise<bigint>;
    /**
     * Gets MBR data for the pool based on winning tickets count.
     */
    getMbr({ winningTickets }: StakingPoolMbrParams): Promise<StakingPoolMbrData>;
    getReward(rewardId: number): Promise<Reward>;
    getRewards(): Promise<Map<number, Reward>>;
    /**
     * Initializes the pool after creation.
     */
    init(params?: MaybeSigner): Promise<void>;
    /**
     * Opts the pool contract into an asset.
     */
    optIn({ sender, signer, asset }: OptinAssetParams): Promise<GroupReturn>;
    /**
     * Adds a reward to the pool.
     */
    addReward({ sender, signer, reward, amount }: AddRewardAsaParams): Promise<void>;
    /**
     * Finalizes the pool with signup, start, and end timestamps.
     */
    finalize({ sender, signer, signupTimestamp, startTimestamp, endTimestamp }: FinalizePoolParams): Promise<void>;
    /**
     * Gets the cost to enter the pool for a given address and set of assets.
     * This calls the contract's enterCost method, which accounts for entry box MBR
     * and any app-scoped SOFT stake MBR.
     *
     * Hinted pools (`isHintedPool`) quote the exact Q14 box MBR for the gate `args` the entry will
     * store, plus the stored pair (31,700) when `wallet != 0` on a gated pool. Pass `legacy: true`
     * (or use an older pool) for the legacy quote that the legacy `gatedEnter` shim charges.
     */
    enterCost({ address, assets, args, wallet, legacy }: EnterCostParams): Promise<bigint>;
    /**
     * Enters the pool with specified entries.
     *
     * Gated pools: the ABI follows the gate txn. A `Gate.mustCheckFor(ctx, …)` txn (GateSDK
     * `build.mustCheckFor`, ctx = the principal the pool resolves for `wallet`) goes to the hinted
     * `gatedEnter(…, wallet)`; a legacy `Gate.mustCheck(caller, …)` txn goes to the legacy shim.
     * Direct (top-level) callers act as themselves: `wallet` must be `0` (a non-zero hint reverts with
     * `errHtop` outside an app call).
     */
    enter({ sender, signer, entries, gateTxn, wallet }: EnterPoolParams): Promise<void>;
    /**
     * Starts the disbursement phase for a reward.
     */
    startDisbursement({ sender, signer, rewardId }: StartDisbursementParams): Promise<void>;
    /**
     * Runs a raffle for a raffle-type reward.
     */
    raffle({ sender, signer, rewardId }: RaffleParams): Promise<void>;
    /**
     * First round a shuffle reward's draw may run (TRADE-3): its committed beacon round plus the
     * beacon lag. 0 when there is nothing to draw (not allocating, not a shuffle, or already drawn).
     * `raffle` / `disburseRewards` before that round fail with errBnrd.
     */
    drawReadyRound(rewardId: number): Promise<bigint>;
    /**
     * Disburses rewards to participants.
     */
    disburseRewards({ sender, signer, rewardId, iterationAmount }: DisburseRewardsParams): Promise<void>;
    /**
     * Finalizes the distribution for a reward.
     */
    finalizeDistribution({ sender, signer, rewardId }: FinalizeDistributionParams): Promise<void>;
    /** Creator reserves free funds of the reward's asset for that reward. */
    assignBudget({ sender, signer, rewardId, amount }: AssignBudgetParams): Promise<void>;
    /** Creator withdraws unspent reward budget (pool must be a draft or ended). */
    withdrawReward({ sender, signer, rewardId, amount }: WithdrawRewardParams): Promise<void>;
    /** Creator deletes an idle reward with an empty budget and receives the freed box MBR. */
    closeReward({ sender, signer, rewardId }: CloseRewardParams): Promise<void>;
    /** Creator closes the pool out of an ASA no reward reserves; the remainder goes to the creator. */
    closeOutAsset({ sender, signer, asset }: CloseOutAssetParams): Promise<void>;
    /** Creator ends a perpetual pool, starting a one-week grace period. */
    endPool(params?: MaybeSigner): Promise<void>;
    /** Removes an entry and refunds its MBR (entrant any time no round is open; anyone after the end). */
    removeEntry({ sender, signer, address, asset }: RemoveEntryParams): Promise<void>;
    /** Creator or DAO wallet unsticks a reward round. */
    abortRound({ sender, signer, rewardId, mode }: AbortRoundParams): Promise<void>;
    /** Recovers expired allocations and/or closes a finalized round's Rewards disbursement. */
    reclaimRound({ sender, signer, disbursementId, reclaims, close }: ReclaimRoundParams): Promise<void>;
    /**
     * Updates the Akita DAO escrow reference.
     */
    updateAkitaDAOEscrow({ sender, signer, config }: MaybeSigner & PoolContractArgs['updateAkitaDAOEscrow((string,uint64))void']): Promise<void>;
    /**
     * Updates the Akita DAO reference.
     */
    updateAkitaDAO({ sender, signer, akitaDao }: MaybeSigner & PoolContractArgs['updateAkitaDAO(uint64)void']): Promise<void>;
}

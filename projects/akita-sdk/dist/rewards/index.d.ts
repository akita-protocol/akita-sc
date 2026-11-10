import { BaseSDK } from "../base";
import { RewardsClient, DisbursementDetails, RewardsMbrData } from '../generated/RewardsClient';
import { MaybeSigner, NewContractSDKParams } from "../types";
import { GetMbrParams, GetAllocationMbrCreditShortfallParams, GetDisbursementParams, GetUserAllocationParams, RewardsGlobalState, OptInAssetParams, CreateDisbursementParams, EditDisbursementParams, FundMbrCreditsParams, WithdrawMbrCreditsParams, CreateUserAllocationsParams, CreateAsaUserAllocationsParams, FinalizeDisbursementParams, CreateInstantDisbursementParams, CreateInstantAsaDisbursementParams, CreateAsaDisbursementFromGroupParams, ClaimRewardsParams, ReclaimRewardsParams, SweepExpiredParams, SweepableAllocation, UpdateAkitaDaoParams } from "./types";
export * from "./types";
export * from "./errors";
/**
 * rewards/constants.ts (v2): the disbursement box with an empty title and note, which includes the
 * 32-byte `reclaimTo`. The v1 app charged 41,700.
 */
export declare const MIN_DISBURSEMENTS_MBR = 54500n;
export declare const USER_ALLOCATION_MBR = 25300n;
/**
 * Decodes a disbursement box of either Rewards layout. v1 boxes have no reclaim target, so their
 * `reclaimTo` is the zero address.
 */
export declare function decodeDisbursementDetails(value: Uint8Array): DisbursementDetails;
/**
 * Decodes the user allocation box names of disbursement `id` (any other name is skipped). Exported for
 * unit tests; `getSweepableAllocations` reads the amounts.
 */
export declare function allocationKeysOf(names: readonly Uint8Array[], id: bigint): {
    name: Uint8Array;
    address: string;
    asset: bigint;
}[];
/** A disbursement is sweepable once it has a reclaim target and its expiration (0 = never) has passed. */
export declare function isSweepable(disbursement: Pick<DisbursementDetails, 'expiration' | 'reclaimTo'>, now: bigint): boolean;
/**
 * SDK for interacting with the Rewards contract.
 * Use this to create disbursements, manage allocations, and claim/reclaim rewards.
 */
/** Read current and retained Rewards deployments without conflating their disbursement IDs.
 * Supply clients from the same network. Keep each returned client for allocation reads and claims.
 * A failed deployment read rejects the result rather than hiding potentially claimable rewards.
 */
export declare function getDisbursementsAcrossDeployments(clients: readonly RewardsSDK[], { currentAppId }?: {
    currentAppId?: bigint;
}): Promise<{
    appId: bigint;
    client: RewardsSDK;
    /** Wallet claims from this deployment go through `RewardsPluginSDK.claimLegacyRewards` (see `claimRewardsFrom`). */
    legacy: boolean;
    disbursements: Map<bigint, DisbursementDetails>;
}[]>;
export declare class RewardsSDK extends BaseSDK<RewardsClient> {
    constructor(params: NewContractSDKParams);
    /**
     * Gets the current global state of the rewards contract.
     */
    getState(): Promise<RewardsGlobalState>;
    /**
     * Gets the MBR (Minimum Balance Requirement) data for creating disbursements.
     * @param title - The disbursement title
     * @param note - The disbursement note
     */
    mbr({ title, note }: GetMbrParams): Promise<RewardsMbrData>;
    /**
     * Gets a specific disbursement by ID.
     */
    getDisbursement({ id }: GetDisbursementParams): Promise<DisbursementDetails>;
    /**
     * Gets all disbursements as a map.
     */
    getDisbursements(): Promise<Map<bigint, DisbursementDetails>>;
    /** The reclaim target of disbursement `id`, or undefined when it has none (v1, or created without one). */
    getReclaimTarget({ id }: GetDisbursementParams): Promise<string | undefined>;
    /** The open allocations of disbursement `id`: what `sweepExpired` (or `reclaimRewards`) would move. */
    getSweepableAllocations({ id }: GetDisbursementParams): Promise<SweepableAllocation[]>;
    /**
     * IDs of the disbursements anyone may sweep now (reclaim target set, expired at the latest block).
     * A keeper calls `sweepExpired` for each.
     */
    getSweepableDisbursementIds(): Promise<bigint[]>;
    /**
     * Gets a user's allocation for a specific disbursement and asset.
  
     */
    getUserAllocation({ address, disbursementId, asset }: GetUserAllocationParams): Promise<bigint>;
    /**
     * Checks if a user has an allocation for a specific disbursement and asset.
     *
     * NOTE: Property order MUST match APP_SPEC struct order (address, asset,
     * disbursementId). See getUserAllocation for the full explanation.
     */
    hasAllocation({ address, disbursementId, asset }: GetUserAllocationParams): Promise<boolean>;
    /**
     * Gets the additional MBR credit needed to create allocation boxes.
     */
    allocationMbrCreditShortfall({ id, allocationCount, }: GetAllocationMbrCreditShortfallParams): Promise<bigint>;
    /**
     * Opts the rewards contract into an asset.
     */
    optIn({ sender, signer, asset }: OptInAssetParams): Promise<void>;
    /**
     * Creates a draft disbursement; add allocations in batches, then finalize it.
     * With `reclaimTo` (v2 only), anyone can sweep what is unclaimed at `expiration` to that address.
     * Returns the disbursement ID.
     */
    createDisbursement({ sender, signer, title, timeToUnlock, expiration, note, mbrCredits, reclaimTo, }: CreateDisbursementParams): Promise<bigint>;
    /**
     * Edits an existing disbursement (only before finalization).
     */
    editDisbursement({ sender, signer, id, title, timeToUnlock, expiration, note, }: EditDisbursementParams): Promise<void>;
    /**
     * Helper to format allocations for the contract.
     */
    private formatAllocations;
    /**
     * Calculates the total amount from allocations.
     */
    private sumAllocations;
    /**
     * Funds reusable MBR credits on a disbursement.
     */
    fundMbrCredits({ sender, signer, id, amount }: FundMbrCreditsParams): Promise<void>;
    /**
     * Deletes a disbursement with no outstanding allocations and refunds its box MBR plus any
     * remaining MBR credits to the creator.
     */
    closeDisbursement({ sender, signer, id }: MaybeSigner & {
        id: bigint | number;
    }): Promise<void>;
    /**
     * Withdraws reusable MBR credits from a disbursement.
     */
    withdrawMbrCredits({ sender, signer, id, amount }: WithdrawMbrCreditsParams): Promise<void>;
    /**
     * Creates ALGO allocations using existing disbursement MBR credits.
     * Fund credits separately with fundMbrCredits when allocationMbrCreditShortfall reports a shortfall.
     */
    createUserAllocations({ sender, signer, id, allocations, }: CreateUserAllocationsParams): Promise<void>;
    /**
     * Creates ASA allocations using existing disbursement MBR credits.
     * Fund credits separately with fundMbrCredits when allocationMbrCreditShortfall reports a shortfall.
     */
    createAsaUserAllocations({ sender, signer, id, asset, allocations, }: CreateAsaUserAllocationsParams): Promise<void>;
    /**
     * Creates and finalizes a multi-ASA disbursement in a single transaction group.
     *
     * Group shape:
     *   0: MBR payment
     *   1..N: ASA transfers to the rewards app
     *   N+1: createAsaDisbursementFromGroup app call
     *
     * This supports up to 14 ASA allocations in one Algorand group.
     */
    createAsaDisbursementFromGroup({ sender, signer, title, timeToUnlock, expiration, note, allocations, }: CreateAsaDisbursementFromGroupParams): Promise<bigint>;
    /**
     * Finalizes a disbursement, locking it for distribution.
     */
    finalizeDisbursement({ sender, signer, id }: FinalizeDisbursementParams): Promise<void>;
    /**
     * Creates and finalizes an ALGO disbursement in a single call.
     * With `reclaimTo` (v2 only), anyone can sweep what is unclaimed at `expiration` to that address.
     * Returns the disbursement ID.
     */
    createInstantDisbursement({ sender, signer, timeToUnlock, expiration, allocations, reclaimTo, }: CreateInstantDisbursementParams): Promise<bigint>;
    /**
     * Creates and finalizes an ASA disbursement in a single call.
     * With `reclaimTo` (v2 only), anyone can sweep what is unclaimed at `expiration` to that address.
     * Returns the disbursement ID.
     */
    createInstantAsaDisbursement({ sender, signer, timeToUnlock, expiration, asset, allocations, reclaimTo, }: CreateInstantAsaDisbursementParams): Promise<bigint>;
    /** Exact MBR an instant disbursement charges: the disbursement box plus one allocation box per entry. */
    private instantMbr;
    /**
     * Claims rewards from one or more disbursements.
     * The caller claims their allocated rewards.
     */
    claimRewards({ sender, signer, rewards }: ClaimRewardsParams): Promise<void>;
    /**
     * Reclaims unclaimed rewards after a disbursement has expired.
     * Only the disbursement creator can reclaim.
     */
    reclaimRewards({ sender, signer, id, reclaims }: ReclaimRewardsParams): Promise<void>;
    /**
     * Permissionless: after expiration, sends the listed allocations (default: every open one) and the
     * freed MBR to the disbursement's reclaim target, and closes the disbursement once it is empty.
     * The reclaim target must be opted into every swept ASA.
     */
    sweepExpired({ sender, signer, id, reclaims }: SweepExpiredParams): Promise<void>;
    /**
     * Updates the Akita DAO reference.
     */
    updateAkitaDao({ sender, signer, akitaDao }: UpdateAkitaDaoParams): Promise<void>;
}

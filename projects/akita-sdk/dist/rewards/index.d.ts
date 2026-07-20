import { BaseSDK } from "../base";
import { RewardsClient, DisbursementDetails, RewardsMbrData } from '../generated/RewardsClient';
import { NewContractSDKParams } from "../types";
import { GetMbrParams, GetAllocationMbrCreditShortfallParams, GetDisbursementParams, GetUserAllocationParams, RewardsGlobalState, OptInAssetParams, CreateDisbursementParams, EditDisbursementParams, FundMbrCreditsParams, WithdrawMbrCreditsParams, CreateUserAllocationsParams, CreateAsaUserAllocationsParams, FinalizeDisbursementParams, CreateInstantDisbursementParams, CreateInstantAsaDisbursementParams, CreateAsaDisbursementFromGroupParams, ClaimRewardsParams, ReclaimRewardsParams, UpdateAkitaDaoParams } from "./types";
export * from "./types";
export * from "./errors";
/**
 * SDK for interacting with the Rewards contract.
 * Use this to create disbursements, manage allocations, and claim/reclaim rewards.
 */
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
    /**
     * Gets a user's allocation for a specific disbursement and asset.
     *
     * NOTE: Property order MUST match the APP_SPEC struct declaration order
     * (address, asset, disbursementId). v10's ABIStructType encoder uses
     * Object.values() which iterates in input-object property order and then
     * maps positionally onto the declared struct fields — a mismatched order
     * silently produces the wrong box key.
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
     * Creates a new disbursement.
     * Returns the disbursement ID.
     */
    createDisbursement({ sender, signer, title, timeToUnlock, expiration, note, mbrCredits, }: CreateDisbursementParams): Promise<bigint>;
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
     * Returns the disbursement ID.
     */
    createInstantDisbursement({ sender, signer, timeToUnlock, expiration, allocations, }: CreateInstantDisbursementParams): Promise<bigint>;
    /**
     * Creates and finalizes an ASA disbursement in a single call.
     * Returns the disbursement ID.
     */
    createInstantAsaDisbursement({ sender, signer, timeToUnlock, expiration, asset, allocations, }: CreateInstantAsaDisbursementParams): Promise<bigint>;
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
     * Updates the Akita DAO reference.
     */
    updateAkitaDao({ sender, signer, akitaDao }: UpdateAkitaDaoParams): Promise<void>;
}

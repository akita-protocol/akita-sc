import { MaybeSigner } from "../types";
import { StakingPoolArgs, StakingPoolState, Reward, RootKey, FunderInfo, StakingPoolMbrData, EntryData } from '../generated/StakingPoolClient';
import { StakingPoolFactoryArgs } from '../generated/StakingPoolFactoryClient';
import { AppCallMethodCall } from '@algorandfoundation/algokit-utils/types/composer';
export { StakingPoolState, Reward, RootKey, FunderInfo, StakingPoolMbrData, EntryData };
type FactoryContractArgs = StakingPoolFactoryArgs["obj"];
export type NewPoolParams = MaybeSigner & Omit<FactoryContractArgs['newPool(pay,string,uint8,address,(address,string),uint64,bool,uint64,uint64,uint64)uint64'], 'payment' | 'wallet'> & {
    /**
     * Wallet hint for the hinted `newPool(…, wallet)` (PHASE-0-SPEC §6.5). Default `0n` (act as the
     * sender). A non-zero hint only verifies inside an app call (plugin window or the wallet itself).
     */
    wallet?: bigint | number;
};
export type NewPoolCostParams = MaybeSigner & {
    /** the wallet hint `newPool` will receive (adds the referral MBR of a genuine wallet's referrer) */
    wallet?: bigint | number;
};
export type DeletePoolParams = MaybeSigner & FactoryContractArgs['deletePool(uint64)void'];
type PoolContractArgs = StakingPoolArgs["obj"];
export type AddRewardParams = MaybeSigner & Omit<PoolContractArgs['addReward(pay,(uint64,uint8,uint64,uint64,uint64,uint64))void'], 'payment'>;
export type AddRewardAsaParams = MaybeSigner & Omit<PoolContractArgs['addRewardAsa(pay,axfer,(uint64,uint8,uint64,uint64,uint64,uint64))void'], 'payment' | 'assetXfer'> & {
    /** the asset ID of the reward */
    asset: bigint;
    /** The amount of the asset to transfer for the reward */
    amount: bigint;
};
export type FinalizePoolParams = MaybeSigner & PoolContractArgs['finalize(uint64,uint64,uint64)void'];
export type Entry = {
    /** The asset ID being staked */
    asset: bigint | number;
    /** The amount being entered */
    amount: bigint | number;
    /** Optional merkle proofs for gated entry */
    proofs?: Uint8Array[];
};
export type EnterPoolParams = MaybeSigner & {
    /** Array of entries (asset, amount, optional proofs) */
    entries: Entry[];
    /**
     * Gate txn for a gated pool: `Gate.mustCheckFor(ctx, gateId, args)` selects the hinted
     * `gatedEnter`; `Gate.mustCheck(caller, gateId, args)` selects the legacy shim.
     */
    gateTxn?: AppCallMethodCall;
    /** Wallet hint for the hinted `gatedEnter` (default `0n`: act as the sender). */
    wallet?: bigint | number;
};
export type EnterCostParams = {
    /** the address that will enter */
    address: string;
    /** the assets of the entries */
    assets: (bigint | number)[];
    /** hinted pools: the gate args the gate txn will carry (stored per entry, priced per byte) */
    args?: readonly Uint8Array[];
    /** hinted pools: the wallet hint `gatedEnter` will receive (adds the stored pair on gated pools) */
    wallet?: bigint | number;
    /** quote the legacy `enterCost(address, entries)` (what the legacy `gatedEnter` shim charges) */
    legacy?: boolean;
};
/** The pair `(W, principal)` a hinted pool stores per gated entrant (box `'i'`). */
export type StoredPrincipal = {
    wallet: bigint;
    principal: string;
};
export type GetStoredPrincipalParams = {
    address: string;
};
export type StartDisbursementParams = MaybeSigner & PoolContractArgs['startDisbursement(uint64)void'];
export type RaffleParams = MaybeSigner & PoolContractArgs['raffle(uint64)void'];
export type DisburseRewardsParams = MaybeSigner & PoolContractArgs['disburseRewards(uint64,uint64)void'];
export type FinalizeDistributionParams = MaybeSigner & PoolContractArgs['finalizeDistribution(uint64)void'];
export type OptinAssetParams = MaybeSigner & Omit<PoolContractArgs['optIn(pay,uint64)void'], 'payment'>;
export type CheckParams = PoolContractArgs['check(address,uint64)(bool,uint64)'];
export type GateCheckParams = MaybeSigner & PoolContractArgs['gateCheck(address,uint64)void'] & {
    /**
     * Pools created before principal resolution (no `pv` marker, e.g. every live MainNet pool) route only
     * `gateCheck(appl,address,uint64)void` and re-run the caller-supplied gate txn (`Gate.mustCheck`).
     * Required for those pools, refused for `pv` pools (they re-run the stored gate args themselves).
     */
    gateTxn?: AppCallMethodCall;
};
export type AssignBudgetParams = MaybeSigner & PoolContractArgs['assignBudget(uint64,uint64)void'];
export type WithdrawRewardParams = MaybeSigner & PoolContractArgs['withdrawReward(uint64,uint64)void'];
export type CloseRewardParams = MaybeSigner & PoolContractArgs['closeReward(uint64)void'];
export type CloseOutAssetParams = MaybeSigner & PoolContractArgs['closeOutAsset(uint64)void'];
export type RemoveEntryParams = MaybeSigner & PoolContractArgs['removeEntry(address,uint64)void'];
/** What `abortRound` does with a Rewards disbursement the round already created. */
export declare enum AbortRoundMode {
    /** leave it untouched (e.g. it lives on a previous Rewards app) */
    Leave = 0,
    /** finalize it so the allocations already written become claimable */
    Finalize = 1,
    /** close it (only when it has no allocations) */
    Close = 2
}
export type AbortRoundParams = MaybeSigner & {
    rewardId: bigint | number;
    mode: AbortRoundMode | bigint | number;
};
export type ReclaimRoundParams = MaybeSigner & {
    disbursementId: bigint | number;
    reclaims: {
        address: string;
        asset: bigint | number;
    }[];
    close: boolean;
};
export type CheckResult = {
    isEligible: boolean;
    stake: bigint;
};
export type IsEnteredParams = PoolContractArgs['isEntered(address)bool'];
export type StakingPoolMbrParams = PoolContractArgs['mbr(uint64)(uint64,uint64,uint64,uint64,uint64)'];
export declare enum PoolStatus {
    Draft = 0,
    Final = 10
}
export declare enum StakingPoolStakingType {
    NONE = 0,
    HEARTBEAT = 10,
    SOFT = 20,
    HARD = 30,
    LOCK = 40
}
export declare enum DistributionType {
    Percentage = 10,
    Flat = 20,
    Even = 30,
    Shuffle = 40
}
export declare enum DisbursementPhase {
    Idle = 0,
    Preparation = 10,
    Allocation = 20,
    Finalization = 30
}

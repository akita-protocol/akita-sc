import { BaseSDK } from "../../base";
import { RewardsPluginArgs, RewardsPluginClient } from "../../generated/RewardsPluginClient";
import { NewContractSDKParams, MaybeSigner } from "../../types";
import { PluginSDKReturn } from "../../types";
type ContractArgs = RewardsPluginArgs["obj"];
type ClaimRewardsArgs = Omit<ContractArgs["claimRewards(uint64,bool,(uint64,uint64)[])void"], "wallet" | "rekeyBack"> & MaybeSigner & {
    rekeyBack?: boolean;
};
type ClaimLegacyRewardsArgs = Omit<ContractArgs["claimLegacyRewards(uint64,bool,(uint64,uint64)[])void"], "wallet" | "rekeyBack"> & MaybeSigner & {
    rekeyBack?: boolean;
};
type ReclaimRewardsArgs = Omit<ContractArgs["reclaimRewards(uint64,bool,uint64,(address,uint64)[])void"], "wallet" | "rekeyBack"> & MaybeSigner & {
    rekeyBack?: boolean;
};
type ReclaimLegacyRewardsArgs = Omit<ContractArgs["reclaimLegacyRewards(uint64,bool,uint64,(address,uint64)[])void"], "wallet" | "rekeyBack"> & MaybeSigner & {
    rekeyBack?: boolean;
};
type InboxAssetArgs = {
    asset: bigint | number;
} & MaybeSigner & {
    rekeyBack?: boolean;
};
type InboxAlgoArgs = MaybeSigner & {
    rekeyBack?: boolean;
};
declare const LEGACY_CREATE_DISBURSEMENT = "createDisbursement(uint64,bool,string,uint64,uint64,string,uint64)uint64";
type CreateDisbursementArgs = Omit<ContractArgs[typeof LEGACY_CREATE_DISBURSEMENT], "wallet" | "rekeyBack"> & MaybeSigner & {
    rekeyBack?: boolean;
    /** Where anyone may sweep what is unclaimed after `expiration` (omit for none, the legacy selector) */
    reclaimTo?: string;
};
type CreateUserAllocationsArgs = Omit<ContractArgs["createUserAllocations(uint64,bool,uint64,(address,uint64)[],uint64)void"], "wallet" | "rekeyBack" | "sum"> & MaybeSigner & {
    rekeyBack?: boolean;
};
type CreateAsaUserAllocationsArgs = Omit<ContractArgs["createAsaUserAllocations(uint64,bool,uint64,uint64,(address,uint64)[],uint64)void"], "wallet" | "rekeyBack"> & MaybeSigner & {
    rekeyBack?: boolean;
};
type FinalizeDisbursementArgs = Omit<ContractArgs["finalizeDisbursement(uint64,bool,uint64)void"], "wallet" | "rekeyBack"> & MaybeSigner & {
    rekeyBack?: boolean;
};
type CreateInstantDisbursementArgs = Omit<ContractArgs["createInstantDisbursement(uint64,bool,uint64,uint64,(address,uint64)[],uint64)uint64"], "wallet" | "rekeyBack" | "sum"> & MaybeSigner & {
    rekeyBack?: boolean;
};
type CreateInstantAsaDisbursementArgs = Omit<ContractArgs["createInstantAsaDisbursement(uint64,bool,uint64,uint64,uint64,(address,uint64)[],uint64)uint64"], "wallet" | "rekeyBack" | "sum"> & MaybeSigner & {
    rekeyBack?: boolean;
};
type WithdrawMbrCreditsArgs = Omit<ContractArgs["withdrawMbrCredits(uint64,bool,uint64,uint64,uint64)void"], "wallet" | "rekeyBack"> & MaybeSigner & {
    rekeyBack?: boolean;
};
type EditDisbursementArgs = Omit<ContractArgs["editDisbursement(uint64,bool,uint64,string,uint64,uint64,string)void"], "wallet" | "rekeyBack"> & MaybeSigner & {
    rekeyBack?: boolean;
};
type CloseDisbursementArgs = Omit<ContractArgs["closeDisbursement(uint64,bool,uint64,uint64)void"], "wallet" | "rekeyBack"> & MaybeSigner & {
    rekeyBack?: boolean;
};
export declare class RewardsPluginSDK extends BaseSDK<RewardsPluginClient> {
    constructor(params: NewContractSDKParams);
    createDisbursement(): PluginSDKReturn;
    createDisbursement(args: CreateDisbursementArgs): PluginSDKReturn;
    /** ALGO allocations for a draft disbursement; the wallet pays their sum. */
    createUserAllocations(): PluginSDKReturn;
    createUserAllocations(args: CreateUserAllocationsArgs): PluginSDKReturn;
    createAsaUserAllocations(): PluginSDKReturn;
    createAsaUserAllocations(args: CreateAsaUserAllocationsArgs): PluginSDKReturn;
    finalizeDisbursement(): PluginSDKReturn;
    finalizeDisbursement(args: FinalizeDisbursementArgs): PluginSDKReturn;
    createInstantDisbursement(): PluginSDKReturn;
    createInstantDisbursement(args: CreateInstantDisbursementArgs): PluginSDKReturn;
    createInstantAsaDisbursement(): PluginSDKReturn;
    createInstantAsaDisbursement(args: CreateInstantAsaDisbursementArgs): PluginSDKReturn;
    claimRewards(): PluginSDKReturn;
    claimRewards(args: ClaimRewardsArgs): PluginSDKReturn;
    /** Claims allocations held by the legacy (v1) Rewards app the plugin was created with. */
    claimLegacyRewards(): PluginSDKReturn;
    claimLegacyRewards(args: ClaimLegacyRewardsArgs): PluginSDKReturn;
    /**
     * Claims from the deployment a `getDisbursementsAcrossDeployments` result came from: the registry's
     * Rewards app through `claimRewards`, the legacy one through `claimLegacyRewards`.
     */
    claimRewardsFrom({ legacy }: {
        legacy: boolean;
    }, args: ClaimRewardsArgs): PluginSDKReturn;
    /** Reclaims expired allocations of a disbursement the wallet created on the registry's Rewards app. */
    reclaimRewards(): PluginSDKReturn;
    reclaimRewards(args: ReclaimRewardsArgs): PluginSDKReturn;
    /** Reclaims expired allocations of a disbursement the wallet created on the legacy (v1) Rewards app. */
    reclaimLegacyRewards(): PluginSDKReturn;
    reclaimLegacyRewards(args: ReclaimLegacyRewardsArgs): PluginSDKReturn;
    private walletCall;
    /**
     * Withdraws the wallet's unused MBR credits of a disbursement it created. `rewardsApp` must be the
     * registry's Rewards app or the legacy one the plugin was created with.
     */
    withdrawMbrCredits(): PluginSDKReturn;
    withdrawMbrCredits(args: WithdrawMbrCreditsArgs): PluginSDKReturn;
    /**
     * Changes the title, unlock time, expiration and note of a disbursement the wallet created. It
     * never changes the allocations, the asset or the reclaim target.
     */
    editDisbursement(): PluginSDKReturn;
    editDisbursement(args: EditDisbursementArgs): PluginSDKReturn;
    /**
     * Deletes an empty disbursement the wallet created and refunds its box MBR and credits. The legacy
     * (v1) Rewards app has no `closeDisbursement`; use `withdrawMbrCredits` there.
     */
    closeDisbursement(): PluginSDKReturn;
    closeDisbursement(args: CloseDisbursementArgs): PluginSDKReturn;
    /** Claim an ASA from the wallet's ARC-59 inbox, opting the spending account in first when needed */
    claimInbox(): PluginSDKReturn;
    claimInbox(args: InboxAssetArgs): PluginSDKReturn;
    /** Reject an ASA in the wallet's ARC-59 inbox, returning it to the asset creator */
    rejectInbox(): PluginSDKReturn;
    rejectInbox(args: InboxAssetArgs): PluginSDKReturn;
    /** Recover ALGO above the wallet inbox's minimum balance (before claimInbox, per ARC-59) */
    claimInboxAlgo(): PluginSDKReturn;
    claimInboxAlgo(args: InboxAlgoArgs): PluginSDKReturn;
    private inboxCall;
}
export {};

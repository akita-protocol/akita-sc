import { BaseSDK } from "../../base";
import { RewardsPluginArgs, RewardsPluginClient } from "../../generated/RewardsPluginClient";
import { NewContractSDKParams, MaybeSigner } from "../../types";
import { PluginSDKReturn } from "../../types";
type ContractArgs = RewardsPluginArgs["obj"];
type ClaimRewardsArgs = Omit<ContractArgs["claimRewards(uint64,bool,(uint64,uint64)[])void"], "wallet" | "rekeyBack"> & MaybeSigner & {
    rekeyBack?: boolean;
};
type CreateDisbursementArgs = Omit<ContractArgs["createDisbursement(uint64,bool,string,uint64,uint64,string,uint64)uint64"], "wallet" | "rekeyBack"> & MaybeSigner & {
    rekeyBack?: boolean;
};
type CreateAsaUserAllocationsArgs = Omit<ContractArgs["createAsaUserAllocations(uint64,bool,uint64,uint64,(address,uint64)[],uint64)void"], "wallet" | "rekeyBack"> & MaybeSigner & {
    rekeyBack?: boolean;
};
type FinalizeDisbursementArgs = Omit<ContractArgs["finalizeDisbursement(uint64,bool,uint64)void"], "wallet" | "rekeyBack"> & MaybeSigner & {
    rekeyBack?: boolean;
};
export declare class RewardsPluginSDK extends BaseSDK<RewardsPluginClient> {
    constructor(params: NewContractSDKParams);
    createDisbursement(): PluginSDKReturn;
    createDisbursement(args: CreateDisbursementArgs): PluginSDKReturn;
    createAsaUserAllocations(): PluginSDKReturn;
    createAsaUserAllocations(args: CreateAsaUserAllocationsArgs): PluginSDKReturn;
    finalizeDisbursement(): PluginSDKReturn;
    finalizeDisbursement(args: FinalizeDisbursementArgs): PluginSDKReturn;
    claimRewards(): PluginSDKReturn;
    claimRewards(args: ClaimRewardsArgs): PluginSDKReturn;
}
export {};

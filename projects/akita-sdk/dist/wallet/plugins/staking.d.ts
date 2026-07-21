import { BaseSDK } from "../../base";
import { StakingPluginArgs, StakingPluginClient } from "../../generated/StakingPluginClient";
import { NewContractSDKParams, MaybeSigner } from "../../types";
import { PluginSDKReturn } from "../../types";
type ContractArgs = StakingPluginArgs["obj"];
type StakeArgs = (Omit<ContractArgs['stake(uint64,bool,uint64,uint8,uint64,uint64,bool)void'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
});
type WithdrawArgs = (Omit<ContractArgs['withdraw(uint64,bool,uint64,uint8)void'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
});
type CreateHeartbeatArgs = (Omit<ContractArgs['createHeartbeat(uint64,bool,address,uint64)void'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
});
export type SoftStakeKey = {
    address: string;
    asset: bigint | number;
};
export type AppSoftStakeKey = SoftStakeKey & {
    app: bigint | number;
};
type CheckpointSoftStakeArgs = (Omit<ContractArgs['checkpointSoftStake(uint64,bool,(address,uint64)[])(bool,uint64)[]'], 'wallet' | 'rekeyBack' | 'stakeKeys'> & MaybeSigner & {
    rekeyBack?: boolean;
    stakeKeys: SoftStakeKey[];
});
type CheckpointAppSoftStakeArgs = (Omit<ContractArgs['checkpointAppSoftStake(uint64,bool,(uint64,address,uint64)[])(bool,uint64)[]'], 'wallet' | 'rekeyBack' | 'appStakeKeys'> & MaybeSigner & {
    rekeyBack?: boolean;
    appStakeKeys: AppSoftStakeKey[];
});
type UpdateSettingsArgs = (Omit<ContractArgs['updateSettings(uint64,bool,uint64,uint64)void'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
});
export declare class StakingPluginSDK extends BaseSDK<StakingPluginClient> {
    constructor(params: NewContractSDKParams);
    stake(): PluginSDKReturn;
    stake(args: StakeArgs): PluginSDKReturn;
    withdraw(): PluginSDKReturn;
    withdraw(args: WithdrawArgs): PluginSDKReturn;
    createHeartbeat(): PluginSDKReturn;
    createHeartbeat(args: CreateHeartbeatArgs): PluginSDKReturn;
    checkpointSoftStake(): PluginSDKReturn;
    checkpointSoftStake(args: CheckpointSoftStakeArgs): PluginSDKReturn;
    checkpointAppSoftStake(): PluginSDKReturn;
    checkpointAppSoftStake(args: CheckpointAppSoftStakeArgs): PluginSDKReturn;
    updateSettings(): PluginSDKReturn;
    updateSettings(args: UpdateSettingsArgs): PluginSDKReturn;
}
export {};

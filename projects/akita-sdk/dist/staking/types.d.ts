import { MaybeSigner } from "../types";
import { StakingArgs, Stake, Escrow, StakeInfo, StakeKey, WeightedStake } from '../generated/StakingClient';
export { Stake, Escrow, StakeInfo, StakeKey, WeightedStake };
type ContractArgs = StakingArgs["obj"];
/** Staking type enum matching contract values */
export declare enum StakingType {
    Heartbeat = 10,
    Soft = 20,
    Hard = 30,
    Lock = 40
}
export type OptInArgs = MaybeSigner & Omit<ContractArgs['optIn(pay,uint64)void'], 'payment'>;
/** Stake parameters for ALGO staking */
export type StakeArgs = MaybeSigner & Omit<ContractArgs['stake(pay,uint8,uint64,uint64)void'], 'payment' | 'amount' | 'expiration'> & {
    /** The asset ID to stake */
    asset: bigint;
    amount: bigint;
} & ({
    type: StakingType.Hard | StakingType.Lock;
    expiration: bigint;
} | {
    type: StakingType.Soft | StakingType.Heartbeat;
});
/** Withdraw parameters */
export type WithdrawArgs = MaybeSigner & ContractArgs['withdraw(uint64,uint8)void'];
/** Create heartbeat parameters */
export type CreateHeartbeatArgs = MaybeSigner & ContractArgs['createHeartbeat(address,uint64)void'];
/** Update settings parameters */
export type UpdateSettingsArgs = MaybeSigner & Omit<ContractArgs['updateSettings(pay,uint64,uint64)void'], 'payment'>;
/** Soft check parameters */
export type SoftCheckArgs = ContractArgs['softCheck(address,uint64)(bool,uint64)'];
/** Permissionless root soft-stake checkpoint parameters */
export type CheckpointSoftStakeArgs = MaybeSigner & ContractArgs['checkpointSoftStake(address,uint64)(bool,uint64)'];
/** Permissionless expired lock checkpoint parameters */
export type CheckpointExpiredLockArgs = MaybeSigner & ContractArgs['checkpointExpiredLock(address,uint64)bool'];
/** Get time left parameters */
export type GetTimeLeftArgs = ContractArgs['getTimeLeft(address,uint64)uint64'];
/** Get info parameters */
export type GetInfoArgs = ContractArgs['getInfo(address,(uint64,uint8))(uint64,uint64,uint64,uint64)'];
/** Get combined amount and weighted age across valid soft, hard, and lock stakes */
export type GetWeightedStakeArgs = ContractArgs['getWeightedStake(address,uint64)(uint64,uint64)'];
/** Get app soft stake combined with global hard and lock stake */
export type GetAppWeightedStakeArgs = ContractArgs['getAppWeightedStake(uint64,address,uint64,bool)(uint64,uint64)'];
/** Get escrow info parameters */
export type GetEscrowInfoArgs = ContractArgs['getEscrowInfo(address,uint64)(uint64,uint64)'];
/** Get heartbeat parameters */
export type GetHeartbeatArgs = ContractArgs['getHeartbeat(address,uint64)(uint64,uint64,uint64,uint64)[4]'];
/** Get heartbeat average parameters */
export type GetHeartbeatAverageArgs = ContractArgs['getHeartbeatAverage(address,uint64,bool)uint64'];
/** Get info list parameters */
export type GetInfoListArgs = ContractArgs['getInfoList(address,uint8,uint64[])(uint64,uint64,uint64,uint64)[]'];
/** Stake check parameters */
export type StakeCheckArgs = ContractArgs['stakeCheck(address,(uint64,uint64)[],uint8,bool)bool'];
/** Heartbeat entry - tuple of [timestamp, balance, escrowed, average] */
export type HeartbeatEntry = {
    timestamp: bigint;
    balance: bigint;
    escrowed: bigint;
    average: bigint;
};
export type AssetCheck = {
    asset: bigint;
    amount: bigint;
};

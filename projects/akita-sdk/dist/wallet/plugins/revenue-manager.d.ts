import { ReceiveEscrow, RevenueManagerPluginArgs, RevenueManagerPluginClient, SplitRef } from "../../generated/RevenueManagerPluginClient";
import { BaseSDK } from "../../base";
import { MaybeSigner, NewContractSDKParams, PluginSDKReturn } from "../../types";
type ContractArgs = RevenueManagerPluginArgs["obj"];
type OptInContractArgs = (Omit<ContractArgs['optIn(uint64,bool,uint64[],pay)void'], 'wallet' | 'rekeyBack' | 'mbrPayment'> & MaybeSigner & {
    rekeyBack?: boolean;
});
type NewReceiveEscrowContractArgs = (Omit<ContractArgs['newReceiveEscrow(uint64,bool,string,address,bool,bool,((uint64,string),uint8,uint64)[])void'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
});
type NewReceiveEscrowWithRefContractArgs = (Omit<ContractArgs['newReceiveEscrowWithRef(uint64,bool,string,address,bool,bool,(uint64,byte[]))void'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
});
type MigrateReceiveEscrowContractArgs = MaybeSigner & {
    rekeyBack?: boolean;
    escrow: string;
    receiveEscrow: ReceiveEscrow;
    /** Exact non-zero ASA identities represented by receiveEscrow.optinCount. */
    assets: bigint[];
    splits: [[bigint | number, string], bigint | number, bigint | number][];
    splitRef: SplitRef;
    useSplitRef: boolean;
};
type StartEscrowDisbursementContractArgs = (Omit<ContractArgs['startEscrowDisbursement(uint64,bool)void'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
});
type ProcessEscrowAllocationContractArgs = (Omit<ContractArgs['processEscrowAllocation(uint64,bool,uint64[])void'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
} & {
    ids: bigint[];
});
type FinalizeEscrowDisbursementContractArgs = (Omit<ContractArgs['finalizeEscrowDisbursement(uint64,bool,uint64[])void'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
} & {
    ids: bigint[];
});
type SkipEscrowAllocationContractArgs = (Omit<ContractArgs['skipEscrowAllocation(uint64,bool,string,uint64[])void'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
} & {
    ids: bigint[];
});
type UpdateSplitsContractArgs = (Omit<ContractArgs['updateSplits(uint64,bool,string,((uint64,string),uint8,uint64)[])void'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
});
export declare class RevenueManagerPluginSDK extends BaseSDK<RevenueManagerPluginClient> {
    constructor(params: NewContractSDKParams);
    optIn(): PluginSDKReturn;
    optIn(args: OptInContractArgs): PluginSDKReturn;
    newReceiveEscrow(): PluginSDKReturn;
    newReceiveEscrow(args: NewReceiveEscrowContractArgs): PluginSDKReturn;
    newReceiveEscrowWithRef(): PluginSDKReturn;
    newReceiveEscrowWithRef(args: NewReceiveEscrowWithRefContractArgs): PluginSDKReturn;
    migrateReceiveEscrow(): PluginSDKReturn;
    migrateReceiveEscrow(args: MigrateReceiveEscrowContractArgs): PluginSDKReturn;
    startEscrowDisbursement(): PluginSDKReturn;
    startEscrowDisbursement(args: StartEscrowDisbursementContractArgs): PluginSDKReturn;
    processEscrowAllocation(): PluginSDKReturn;
    processEscrowAllocation(args: ProcessEscrowAllocationContractArgs): PluginSDKReturn;
    finalizeEscrowDisbursement(): PluginSDKReturn;
    finalizeEscrowDisbursement(args: FinalizeEscrowDisbursementContractArgs): PluginSDKReturn;
    /**
     * DAO-only escape hatch: mark assets of `escrow` as handled for the current cycle
     * without transferring (balances roll over). Must be called through the DAO wallet's
     * main-account (execution-key) grant.
     */
    skipEscrowAllocation(): PluginSDKReturn;
    skipEscrowAllocation(args: SkipEscrowAllocationContractArgs): PluginSDKReturn;
    /** DAO-wallet only: replace the splits of an idle receive escrow (drops any split reference). */
    updateSplits(): PluginSDKReturn;
    updateSplits(args: UpdateSplitsContractArgs): PluginSDKReturn;
}
export {};

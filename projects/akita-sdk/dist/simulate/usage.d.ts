import type { Algodv2, modelsv2 } from 'algosdk';
interface UsageTransaction {
    innerTxns?: UsageTransaction[];
}
export interface UsageGroup {
    groupUsage?: bigint | number;
    txnResults?: Array<{
        txnResult?: UsageTransaction;
    }>;
}
/** algosdk 3.7 preserves protocol group usage in the native simulate model. */
export declare function simulateWithUsage(client: Algodv2, request: modelsv2.SimulateRequest): Promise<modelsv2.SimulateResponse>;
/** Add only usage beyond the per-transaction fees already covered by AlgoKit. */
export declare function usageFeeSurcharge(group: UsageGroup | undefined, minFee: bigint): bigint;
export {};

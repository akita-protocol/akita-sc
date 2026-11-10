import type { Algodv2, modelsv2 } from 'algosdk';

interface UsageTransaction { innerTxns?: UsageTransaction[] }
export interface UsageGroup {
  groupUsage?: bigint | number;
  txnResults?: Array<{ txnResult?: UsageTransaction }>;
}

/** algosdk 3.7 preserves protocol group usage in the native simulate model. */
export async function simulateWithUsage(client: Algodv2, request: modelsv2.SimulateRequest): Promise<modelsv2.SimulateResponse> {
  return client.simulateTransactions(request).do();
}

/** Add only usage beyond the per-transaction fees already covered by AlgoKit. */
export function usageFeeSurcharge(group: UsageGroup | undefined, minFee: bigint): bigint {
  if (group?.groupUsage === undefined || !group.txnResults) return 0n;
  const count = (transaction: UsageTransaction): bigint =>
    1n + (transaction.innerTxns ?? []).reduce((sum, child) => sum + count(child), 0n);
  const transactionCount = group.txnResults.reduce((sum, result) => sum + count(result.txnResult ?? {}), 0n);
  const required = (BigInt(group.groupUsage) * minFee + 999_999n) / 1_000_000n;
  const baseline = transactionCount * minFee;
  return required > baseline ? required - baseline : 0n;
}

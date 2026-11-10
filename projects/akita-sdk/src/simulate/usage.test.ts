import { describe, expect, test } from "vitest";
import { modelsv2 } from "algosdk";
import { simulateWithUsage, usageFeeSurcharge, type UsageGroup } from "./usage";

describe("Protocol usage fees", () => {
  test("decodes group-usage in the native algosdk model", () => {
    const group = modelsv2.SimulateTransactionGroupResult.fromEncodingData(new Map<string, unknown>([
      ['txn-results', []], ['group-usage', 1_000_001n],
    ]));
    expect(group.groupUsage).toBe(1_000_001);
  });
  test("rounds the whole group once and counts nested inner transactions", () => {
    const group: UsageGroup = {
      groupUsage: 4_001_001n,
      txnResults: [
        { txnResult: { innerTxns: [{ innerTxns: [{}] }] } },
        { txnResult: {} },
      ],
    };
    expect(usageFeeSurcharge(group, 1_000n)).toBe(2n);
    expect(usageFeeSurcharge(group, 2_000n)).toBe(3n);
  });

  test("does not double charge the transaction fees or change older-node results", () => {
    expect(usageFeeSurcharge({ groupUsage: 2_000_000n, txnResults: [{ txnResult: { innerTxns: [{}] } }] }, 1_000n)).toBe(0n);
    expect(usageFeeSurcharge({ txnResults: [{}] }, 1_000n)).toBe(0n);
    expect(usageFeeSurcharge(undefined, 1_000n)).toBe(0n);
  });

  test("reads native algosdk group usage with one request", async () => {
    let calls = 0;
    const client = { simulateTransactions: () => ({ do: async () => {
      calls++;
      return { txnGroups: [{ groupUsage: 1_000_001, txnResults: [{ txnResult: {} }] }] };
    } }) };
    const response = await simulateWithUsage(client as never, {} as never);
    expect(response.txnGroups[0].groupUsage).toBe(1_000_001);
    expect(usageFeeSurcharge(response.txnGroups[0], 1000n)).toBe(1n);
    expect(calls).toBe(1);
  });
});

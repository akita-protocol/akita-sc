import { AlgorandClient } from "@algorandfoundation/algokit-utils";
import { ABIMethod, ABIType, generateAccount, makeEmptyTransactionSigner } from "algosdk";
import { describe, expect, test, vi } from "vitest";
import { APP_SPEC as StakingPoolAppSpec } from "../generated/StakingPoolClient";
import { APP_SPEC as StakingPoolFactoryAppSpec } from "../generated/StakingPoolFactoryClient";
import {
  encodedGateArgsLength,
  STAKING_POOL_ENTRY_BASE_MBR,
  STAKING_POOL_ENTRY_BY_ADDRESS_MBR,
  STAKING_POOL_HINTED_ENTER_COST,
  STAKING_POOL_HINTED_GATED_ENTER,
  STAKING_POOL_LEGACY_ENTER_COST,
  STAKING_POOL_LEGACY_GATE_CHECK,
  STAKING_POOL_LEGACY_GATED_ENTER,
  STAKING_POOL_PRINCIPALS_MBR,
  stakingPoolEntryMbr,
  StakingPoolFactorySDK,
  StakingPoolSDK,
} from "./index";

/**
 * StakingPool SDK under principal resolution (PHASE-0-SPEC §6.5, §6.13, Q14): ABI selection by the
 * child's `pv` marker and by the gate txn (`mustCheckFor` → hinted, `mustCheck` → legacy shim).
 */

const SENDER = generateAccount().addr.toString();
const signer = makeEmptyTransactionSigner();

const signatures = (spec: { methods: { name: string; args: { type: string }[]; returns: { type: string } }[] }) =>
  spec.methods.map((m) => `${m.name}(${m.args.map((a) => a.type).join(",")})${m.returns.type}`);

function pool(hinted: boolean | "throws") {
  vi.stubEnv("ALGORAND_NETWORK", "localnet");
  const sdk = new StakingPoolSDK({
    algorand: AlgorandClient.defaultLocalNet(),
    factoryParams: { appId: 4321n, defaultSender: SENDER, defaultSigner: signer },
  });
  const version = hinted === "throws"
    ? vi.fn().mockRejectedValue(new Error("no such key"))
    : vi.fn().mockResolvedValue(hinted ? 1n : undefined);
  Object.assign(sdk.client.state.global, { principalVersion: version });
  const hintedCost = vi.fn().mockResolvedValue(111n);
  const legacyCost = vi.fn().mockResolvedValue(222n);
  Object.assign(sdk.client, {
    enterCostAddressUint64Uint64Byte_32ByteUint64Uint64: hintedCost,
    enterCostAddressUint64Uint64Byte_32Uint64: legacyCost,
  });
  const calls: { method: string; args: Record<string, unknown> }[] = [];
  const group = {
    gatedEnterPayApplUint64Uint64Byte_32Uint64Void: (p: { args: Record<string, unknown> }) => { calls.push({ method: "hinted", args: p.args }); return group; },
    gatedEnterPayApplUint64Uint64Byte_32Void: (p: { args: Record<string, unknown> }) => { calls.push({ method: "legacy", args: p.args }); return group; },
    enter: (p: { args: Record<string, unknown> }) => { calls.push({ method: "enter", args: p.args }); return group; },
    send: vi.fn().mockResolvedValue({}),
  };
  Object.assign(sdk.client, { newGroup: () => group });
  const payment = vi.fn().mockImplementation(async (p: { amount: { microAlgos: bigint } }) => ({ amount: p.amount.microAlgos }));
  Object.assign(sdk.client.algorand.createTransaction, { payment });
  return { sdk, hintedCost, legacyCost, calls, payment, version };
}

const gateTxn = (name: string, args: unknown[]) => ({ method: { name }, args }) as never;

describe("StakingPool SDK (principal resolution §6.5)", () => {
  test("the generated clients expose both ABIs (hinted overload + legacy shim)", () => {
    const child = signatures(StakingPoolAppSpec);
    for (const sig of [STAKING_POOL_HINTED_GATED_ENTER, STAKING_POOL_LEGACY_GATED_ENTER, STAKING_POOL_HINTED_ENTER_COST, STAKING_POOL_LEGACY_ENTER_COST]) {
      expect(child).toContain(sig);
    }
    expect(child).toContain("getStoredPrincipal(address)(uint64,address)");
    const factory = signatures(StakingPoolFactoryAppSpec);
    expect(factory).toContain("newPool(pay,string,uint8,address,(address,string),uint64,bool,uint64,uint64,uint64)uint64");
    expect(factory).toContain("newPool(pay,string,uint8,address,(address,string),uint64,bool,uint64,uint64)uint64");
    expect(factory).toContain("newPoolCost(uint64)uint64");
    expect(factory).toContain("newPoolCost()uint64");
  });

  test("Q14 helpers mirror the contract: encoded byte[][] length and the exact entries MBR", () => {
    for (const args of [[], [new Uint8Array(72)], [new Uint8Array(32), new Uint8Array(0), new Uint8Array(40)]]) {
      expect(encodedGateArgsLength(args)).toBe(BigInt(ABIType.from("byte[][]").encode(args).length));
    }
    expect(stakingPoolEntryMbr()).toBe(STAKING_POOL_ENTRY_BASE_MBR);
    expect(STAKING_POOL_ENTRY_BASE_MBR).toBe(27_300n);
    expect(stakingPoolEntryMbr([new Uint8Array(72)])).toBe(57_700n);
    expect(STAKING_POOL_ENTRY_BY_ADDRESS_MBR).toBe(22_100n);
    expect(STAKING_POOL_PRINCIPALS_MBR).toBe(31_700n);
  });

  test("isHintedPool reads the pv marker once; a missing key means a legacy child", async () => {
    const hinted = pool(true);
    expect(await hinted.sdk.isHintedPool()).toBe(true);
    expect(await hinted.sdk.isHintedPool()).toBe(true);
    expect(hinted.version).toHaveBeenCalledTimes(1);
    expect(await pool(false).sdk.isHintedPool()).toBe(false);
    expect(await pool("throws").sdk.isHintedPool()).toBe(false);
  });

  test("enterCost: hinted pools quote with args + wallet; legacy pools (or legacy: true) use the old selector", async () => {
    const args = [new Uint8Array([1, 2, 3])];
    const hinted = pool(true);
    expect(await hinted.sdk.enterCost({ address: SENDER, assets: [5n], args, wallet: 9n })).toBe(111n);
    expect(hinted.hintedCost.mock.calls[0][0].args).toEqual({ address: SENDER, entries: [[5n, 0n, []]], args, wallet: 9n });
    expect(await hinted.sdk.enterCost({ address: SENDER, assets: [5n], legacy: true })).toBe(222n);

    const legacy = pool(false);
    expect(await legacy.sdk.enterCost({ address: SENDER, assets: [5n], args, wallet: 9n })).toBe(222n);
    expect(legacy.hintedCost).not.toHaveBeenCalled();
  });

  test("enter: a mustCheckFor gate txn selects the hinted gatedEnter with the wallet and prices its args", async () => {
    const { sdk, hintedCost, calls, payment } = pool(true);
    const gateArgs = [new Uint8Array(72)];
    await sdk.enter({ sender: SENDER, signer, entries: [{ asset: 0n, amount: 1n }], gateTxn: gateTxn("mustCheckFor", [{}, 3n, gateArgs]), wallet: 42n });
    expect(hintedCost.mock.calls[0][0].args).toMatchObject({ args: gateArgs, wallet: 42n });
    expect(payment.mock.calls[0][0].amount.microAlgos).toBe(111n);
    expect(calls).toHaveLength(1);
    expect(calls[0].method).toBe("hinted");
    expect(calls[0].args.wallet).toBe(42n);
  });

  test("enter: a legacy mustCheck gate txn selects the legacy shim at the legacy quote", async () => {
    const { sdk, hintedCost, legacyCost, calls } = pool(true);
    await sdk.enter({ sender: SENDER, signer, entries: [{ asset: 0n, amount: 1n }], gateTxn: gateTxn("mustCheck", ["caller", 3n, []]) });
    expect(legacyCost).toHaveBeenCalledTimes(1);
    expect(hintedCost).not.toHaveBeenCalled();
    expect(calls[0].method).toBe("legacy");
    expect(calls[0].args.wallet).toBeUndefined();
  });

  test("enter: ungated pools call enter at the hinted (exact) quote; old children at the legacy quote", async () => {
    const hinted = pool(true);
    await hinted.sdk.enter({ sender: SENDER, signer, entries: [{ asset: 0n, amount: 1n }] });
    expect(hinted.hintedCost.mock.calls[0][0].args).toMatchObject({ args: [], wallet: 0n });
    expect(hinted.calls[0].method).toBe("enter");

    const legacy = pool(false);
    await legacy.sdk.enter({ sender: SENDER, signer, entries: [{ asset: 0n, amount: 1n }] });
    expect(legacy.legacyCost).toHaveBeenCalledTimes(1);
    expect(legacy.calls[0].method).toBe("enter");
  });

  test("enter: a mustCheckFor gate txn on a pre-pv child is refused before anything is sent", async () => {
    const { sdk, calls } = pool(false);
    await expect(sdk.enter({ sender: SENDER, signer, entries: [{ asset: 0n, amount: 1n }], gateTxn: gateTxn("mustCheckFor", [{}, 3n, []]) }))
      .rejects.toThrow(/predates principal resolution/);
    expect(calls).toHaveLength(0);
  });

  test("getStoredPrincipal: legacy children report (0, address) without a call", async () => {
    const { sdk } = pool(false);
    const read = vi.fn();
    Object.assign(sdk.client, { getStoredPrincipal: read });
    expect(await sdk.getStoredPrincipal({ address: SENDER })).toEqual({ wallet: 0n, principal: SENDER });
    expect(read).not.toHaveBeenCalled();
  });
});

describe("StakingPoolFactory SDK (principal resolution §6.5)", () => {
  function factory() {
    vi.stubEnv("ALGORAND_NETWORK", "localnet");
    const sdk = new StakingPoolFactorySDK({
      algorand: AlgorandClient.defaultLocalNet(),
      factoryParams: { appId: 999n, defaultSender: SENDER, defaultSigner: signer },
    });
    const cost = vi.fn().mockResolvedValue(1_000n);
    Object.assign(sdk.client, { newPoolCostUint64Uint64: cost });
    return { sdk, cost };
  }

  test("cost({ wallet }) quotes the hinted newPoolCost(wallet)", async () => {
    const { sdk, cost } = factory();
    expect(await sdk.cost({ wallet: 77n })).toBe(1_000n);
    expect(cost.mock.calls[0][0].args).toEqual({ wallet: 77n });
    await sdk.cost();
    expect(cost.mock.calls[1][0].args).toEqual({ wallet: 0n });
  });

  test("new() sends the hinted newPool with the wallet and pays the hinted quote", async () => {
    const { sdk, cost } = factory();
    const sent: Record<string, unknown>[] = [];
    const group = {
      newPoolPayStringUint8AddressAddressStringUint64BoolUint64Uint64Uint64Uint64: (p: { args: Record<string, unknown> }) => { sent.push(p.args); return group; },
      send: vi.fn().mockResolvedValue({ returns: [55n] }),
    };
    Object.assign(sdk.client, { newGroup: () => group });
    Object.assign(sdk.client.algorand.createTransaction, { payment: vi.fn().mockResolvedValue({}) });
    const created = await sdk.new({
      sender: SENDER, signer, title: "t", type: 0, marketplace: SENDER, stakeKey: [SENDER, ""] as never,
      minimumStakeAmount: 0n, allowLateSignups: true, gateId: 0n, maxEntries: 0n, wallet: 5n,
    });
    expect(cost.mock.calls[0][0].args).toEqual({ wallet: 5n });
    expect(sent[0].wallet).toBe(5n);
    expect(created.appId).toBe(55n);
  });
});

describe("gateCheck on live (pre-pv) pools: compat finding 1", () => {
  const gate = { method: { name: "mustCheck" }, args: [] } as never;

  test("a pre-pv pool gets the deployed gateCheck(appl,address,uint64)void with the caller's gate txn", async () => {
    const { sdk } = pool(false);
    const added: Record<string, unknown>[] = [];
    const send = vi.fn().mockResolvedValue({});
    const composer = { addAppCallMethodCall: (p: Record<string, unknown>) => { added.push(p); return composer; }, send };
    Object.assign(sdk.client.algorand, { newGroup: () => composer });
    await sdk.gateCheck({ address: SENDER, asset: 0n, gateTxn: gate });
    expect(added).toHaveLength(1);
    expect((added[0].method as { getSignature(): string }).getSignature()).toBe(STAKING_POOL_LEGACY_GATE_CHECK);
    expect(added[0].appId).toBe(4321n);
    expect(added[0].args).toEqual([gate, SENDER, 0n]);
    expect(send).toHaveBeenCalledOnce();
  });

  test("a pre-pv pool without a gate txn is refused before sending", async () => {
    const { sdk } = pool(false);
    await expect(sdk.gateCheck({ address: SENDER, asset: 0n })).rejects.toThrow("predates principal resolution");
  });

  test("a pv pool keeps gateCheck(address,uint64)void and refuses a caller gate txn", async () => {
    const { sdk } = pool(true);
    const calls: Record<string, unknown>[] = [];
    const group = { gateCheck: (p: { args: Record<string, unknown> }) => { calls.push(p.args); return group; }, send: vi.fn().mockResolvedValue({}) };
    Object.assign(sdk.client, { newGroup: () => group });
    await sdk.gateCheck({ address: SENDER, asset: 0n });
    expect(calls).toEqual([{ address: SENDER, asset: 0n }]);
    await expect(sdk.gateCheck({ address: SENDER, asset: 0n, gateTxn: gate })).rejects.toThrow("do not pass gateTxn");
  });

  test("the deployed signature is the one the live child routes (selector bc58ad09)", () => {
    expect(Buffer.from(ABIMethod.fromSignature(STAKING_POOL_LEGACY_GATE_CHECK).getSelector()).toString("hex")).toBe("bc58ad09");
  });
});

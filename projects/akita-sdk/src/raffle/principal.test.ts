import { AlgorandClient } from "@algorandfoundation/algokit-utils";
import { generateAccount } from "algosdk";
import { describe, expect, test, vi } from "vitest";
import { APP_SPEC as RaffleAppSpec } from "../generated/RaffleClient";
import { APP_SPEC as RaffleFactoryAppSpec } from "../generated/RaffleFactoryClient";
import { RAFFLE_LEGACY_GET_STATE, RAFFLE_SELLER_REFERRER_KEY, RaffleFactorySDK, RaffleSDK, raffleDirectGateCtx } from "./index";
import { ABIMethod } from "algosdk";
import { PrizeBoxFactorySDK } from "../prize-box";

/**
 * Principal-resolution SDK wrappers for Raffle (docs/principal-resolution/PHASE-0-SPEC.md §6.8, §6.13,
 * P2-ABI-01): hinted overloads on principal-ABI raffles, the pre-principal ABI on older ones.
 */

const SENDER = generateAccount().addr.toString();
const REFERRER = generateAccount();
const MARKETPLACE = generateAccount().addr.toString();
const GATE_TXN = { sender: SENDER, method: { name: "mustCheckFor" } } as never;
const LEGACY_GATE_TXN = { sender: SENDER, method: { name: "mustCheck" } } as never;
const PAYMENT = { txn: "payment" } as never;
const signer = (async () => []) as never;

/** The DEPLOYED RaffleFactory creation signatures that Kyle decision K6 (2026-10-04) removed. */
const DEPLOYED_RAFFLE_FACTORY_CREATION = [
  "newRaffle(pay,axfer,uint64,uint64,uint64,uint64,uint64,uint64,address,string,byte[32][],uint64)uint64",
  "newPrizeBoxRaffle(appl,pay,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64",
];

const signatures = (spec: { methods: { name: string; args: { type: string }[]; returns: { type: string } }[] }) =>
  spec.methods.map((m) => `${m.name}(${m.args.map((a) => a.type).join(",")})${m.returns.type}`);

function raffle(withMarker: boolean) {
  vi.stubEnv("ALGORAND_NETWORK", "localnet");
  const sdk = new RaffleSDK({ algorand: AlgorandClient.defaultLocalNet(), factoryParams: { appId: 1234n, defaultSender: SENDER } });
  const client = sdk.client as unknown as Record<string, any>;
  vi.spyOn(client.appClient, "getGlobalState").mockResolvedValue(
    withMarker
      ? { [RAFFLE_SELLER_REFERRER_KEY]: { value: "", valueRaw: REFERRER.addr.publicKey, valueBase64: "", keyRaw: new Uint8Array(), keyBase64: "" } }
      : {},
  );
  vi.spyOn(client, "mbr").mockResolvedValue({ entries: 31_700n, weights: 0n, entriesByAddress: 18_900n });
  vi.spyOn(client.algorand.createTransaction, "payment").mockResolvedValue(PAYMENT);
  const calls: Record<string, unknown[]> = {};
  const group: Record<string, unknown> = { send: vi.fn().mockResolvedValue({}) };
  for (const name of ["gatedEnterApplPayAddressUint64Void", "gatedEnterApplPayAddressVoid", "enter", "gatedAddApplPayUint64Void", "gatedAddApplPayVoid", "add"]) {
    group[name] = (params: unknown) => { (calls[name] ??= []).push(params); return group; };
  }
  vi.spyOn(client, "newGroup").mockReturnValue(group);
  return { sdk, calls };
}

describe("Raffle principal ABI (SDK)", () => {
  test("the generated Raffle client exposes both gated overloads", () => {
    expect(signatures(RaffleAppSpec)).toEqual(expect.arrayContaining([
      "gatedEnter(appl,pay,address,uint64)void", "gatedEnter(appl,pay,address)void",
      "gatedEnterAsa(appl,pay,axfer,address,uint64)void", "gatedEnterAsa(appl,pay,axfer,address)void",
      "gatedAdd(appl,pay,uint64)void", "gatedAdd(appl,pay)void",
      "gatedAddAsa(appl,axfer,uint64)void", "gatedAddAsa(appl,axfer)void",
    ]));
  });

  test("K6: the RaffleFactory client has only the hinted creation methods; the DEPLOYED creation selectors are gone", () => {
    const sigs = signatures(RaffleFactoryAppSpec);
    expect(sigs.filter((s) => /^new(PrizeBox)?Raffle\(/.test(s)).sort()).toEqual([
      "newPrizeBoxRaffle(appl,pay,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64,uint64)uint64",
      "newRaffle(pay,axfer,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,string,byte[32][],uint64,uint64)uint64",
    ]);
    // MainNet RaffleFactory 3569557743 (no minEntries, no hint): not routed after the Phase 2 upgrade
    const selector = (s: string) => Buffer.from(ABIMethod.fromSignature(s).getSelector()).toString("hex");
    const routed = new Set(sigs.map(selector));
    for (const deployed of DEPLOYED_RAFFLE_FACTORY_CREATION) expect(routed.has(selector(deployed)), deployed).toBe(false);
  });

  test("raffleDirectGateCtx is the context of a top-level caller", () => {
    expect(raffleDirectGateCtx(SENDER)).toEqual({ principal: SENDER, wallet: 0n, spender: SENDER });
  });

  test("sellerReferrer decodes the stored address ('' without the marker)", async () => {
    expect(await raffle(true).sdk.sellerReferrer()).toBe(REFERRER.addr.toString());
    expect(await raffle(false).sdk.sellerReferrer()).toBe("");
  });

  test("gated enter/add on a principal-ABI raffle use the hinted overloads with the wallet hint", async () => {
    const { sdk, calls } = raffle(true);
    await sdk.enter({ sender: SENDER, signer, amount: 1n, marketplace: MARKETPLACE, gateTxn: GATE_TXN, wallet: 9n });
    await sdk.add({ sender: SENDER, signer, amount: 1n, gateTxn: GATE_TXN });
    expect((calls.gatedEnterApplPayAddressUint64Void[0] as { args: unknown }).args).toEqual({ gateTxn: GATE_TXN, payment: PAYMENT, marketplace: MARKETPLACE, wallet: 9n });
    expect((calls.gatedAddApplPayUint64Void[0] as { args: unknown }).args).toEqual({ gateTxn: GATE_TXN, payment: PAYMENT, wallet: 0n });
    expect(calls.gatedEnterApplPayAddressVoid).toBeUndefined();
    expect(calls.gatedAddApplPayVoid).toBeUndefined();
  });

  test("gated enter/add on an older raffle use the legacy overloads (no hint)", async () => {
    const { sdk, calls } = raffle(false);
    await sdk.enter({ sender: SENDER, signer, amount: 1n, marketplace: MARKETPLACE, gateTxn: GATE_TXN, wallet: 9n });
    await sdk.add({ sender: SENDER, signer, amount: 1n, gateTxn: GATE_TXN });
    expect((calls.gatedEnterApplPayAddressVoid[0] as { args: unknown }).args).toEqual({ gateTxn: GATE_TXN, payment: PAYMENT, marketplace: MARKETPLACE });
    expect((calls.gatedAddApplPayVoid[0] as { args: unknown }).args).toEqual({ gateTxn: GATE_TXN, payment: PAYMENT });
    expect(calls.gatedEnterApplPayAddressUint64Void).toBeUndefined();
  });

  test("a Gate.mustCheck gate txn takes the legacy overloads even on a principal-ABI raffle", async () => {
    const { sdk, calls } = raffle(true);
    await sdk.enter({ sender: SENDER, signer, amount: 1n, marketplace: MARKETPLACE, gateTxn: LEGACY_GATE_TXN });
    expect((calls.gatedEnterApplPayAddressVoid[0] as { args: unknown }).args).toEqual({ gateTxn: LEGACY_GATE_TXN, payment: PAYMENT, marketplace: MARKETPLACE });
    expect(calls.gatedEnterApplPayAddressUint64Void).toBeUndefined();
  });

  test("factory.newRaffle calls the hinted method and forwards the wallet hint", async () => {
    vi.stubEnv("ALGORAND_NETWORK", "localnet");
    const factory = new RaffleFactorySDK({ algorand: AlgorandClient.defaultLocalNet(), factoryParams: { appId: 99n, defaultSender: SENDER } });
    const client = factory.client as unknown as Record<string, any>;
    vi.spyOn(client, "newRaffleCost").mockResolvedValue(1_000n);
    vi.spyOn(client.algorand.createTransaction, "payment").mockResolvedValue(PAYMENT);
    vi.spyOn(client.algorand.createTransaction, "assetTransfer").mockResolvedValue(PAYMENT);
    const hinted = vi.spyOn(client.send, "newRaffle")
      .mockResolvedValue({ return: 777n } as never);
    const created = await factory.newRaffle({
      sender: SENDER, signer, prizeAsset: 1n, prizeAmount: 1n, ticketAsset: 0n, startTimestamp: 0n, endTimestamp: 1n,
      minTickets: 1n, maxTickets: 2n, gateId: 0n, marketplace: MARKETPLACE, name: "", proof: [], weightsListCount: 4n,
    });
    expect(created.appId).toBe(777n);
    expect(hinted.mock.calls[0][0].args.wallet).toBe(0n);
    expect(hinted.mock.calls[0][0].args.minEntries).toBe(0n);
  });

  /** A RaffleFactorySDK whose quote, payment and transfers are stubbed; returns the spies. */
  function stubbedFactory() {
    vi.stubEnv("ALGORAND_NETWORK", "localnet");
    const factory = new RaffleFactorySDK({ algorand: AlgorandClient.defaultLocalNet(), factoryParams: { appId: 99n, defaultSender: SENDER } });
    const client = factory.client as unknown as Record<string, any>;
    const cost = vi.spyOn(client, "newRaffleCost").mockResolvedValue(1_000n);
    vi.spyOn(client.algorand.createTransaction, "payment").mockResolvedValue(PAYMENT);
    const ASSET_XFER = { txn: "assetTransfer" } as never;
    const assetXfer = vi.spyOn(client.algorand.createTransaction, "assetTransfer").mockResolvedValue(ASSET_XFER);
    const newRaffle = vi.spyOn(client.send, "newRaffle").mockResolvedValue({ return: 777n } as never);
    const newPrizeBoxRaffle = vi.spyOn(client.send, "newPrizeBoxRaffle").mockResolvedValue({ return: 778n } as never);
    return { factory, cost, assetXfer, ASSET_XFER, newRaffle, newPrizeBoxRaffle };
  }

  test("factory.newRaffle (ASA prize) forwards a non-zero wallet hint and minEntries to the hinted method", async () => {
    const { factory, cost, assetXfer, ASSET_XFER, newRaffle, newPrizeBoxRaffle } = stubbedFactory();
    const created = await factory.newRaffle({
      sender: SENDER, signer, prizeAsset: 5n, prizeAmount: 2n, ticketAsset: 6n, startTimestamp: 0n, endTimestamp: 1n,
      minTickets: 1n, maxTickets: 2n, minEntries: 3n, gateId: 0n, marketplace: MARKETPLACE, name: "n", proof: [], weightsListCount: 4n,
      wallet: 9n,
    });
    expect(created.appId).toBe(777n);
    expect(cost.mock.calls[0][0]).toEqual({ args: { isPrizeBox: false, prizeId: 5n, ticketAsset: 6n, weightsListCount: 4n } });
    expect(assetXfer.mock.calls[0][0]).toMatchObject({ amount: 2n, assetId: 5n });
    expect(newRaffle.mock.calls[0][0].args).toMatchObject({ payment: PAYMENT, assetXfer: ASSET_XFER, ticketAsset: 6n, minEntries: 3n, wallet: 9n });
    expect(newPrizeBoxRaffle).not.toHaveBeenCalled();
  });

  test("factory.newRaffle (prize box) quotes with the prize box id and sends newPrizeBoxRaffle with the wallet hint and minEntries", async () => {
    const { factory, cost, assetXfer, newRaffle, newPrizeBoxRaffle } = stubbedFactory();
    // the wrapper builds a PrizeBoxFactorySDK only to reach the prize box's transfer
    vi.stubEnv("PRIZE_BOX_FACTORY_APP_ID", "55");
    const PRIZE_BOX_TRANSFER = { txn: "prizeBoxTransfer" } as never;
    const transfer = vi.fn().mockResolvedValue({ transactions: [PRIZE_BOX_TRANSFER] });
    const get = vi.spyOn(PrizeBoxFactorySDK.prototype, "get").mockReturnValue({ client: { createTransaction: { transfer } } } as never);
    try {
      const created = await factory.newRaffle({
        sender: SENDER, signer, isPrizeBox: true, prizeBoxId: 42n, ticketAsset: 0n, startTimestamp: 0n, endTimestamp: 1n,
        minTickets: 1n, maxTickets: 2n, minEntries: 3n, gateId: 0n, marketplace: MARKETPLACE, weightsListCount: 4n, wallet: 9n,
      });
      expect(created.appId).toBe(778n);
      expect(cost.mock.calls[0][0]).toEqual({ args: { isPrizeBox: true, prizeId: 42n, ticketAsset: 0n, weightsListCount: 4n } });
      expect(get).toHaveBeenCalledWith({ appId: 42n });
      // the prize box goes to the factory
      expect(transfer.mock.calls[0][0]).toMatchObject({ sender: SENDER, args: { newOwner: factory.client.appAddress.toString() } });
      expect(newPrizeBoxRaffle.mock.calls[0][0].args).toMatchObject({
        prizeBoxTransferTxn: PRIZE_BOX_TRANSFER, payment: PAYMENT, ticketAsset: 0n, minEntries: 3n, wallet: 9n,
      });
      expect(newRaffle).not.toHaveBeenCalled();
      expect(assetXfer).not.toHaveBeenCalled();
    } finally {
      get.mockRestore();
    }
  });
});

describe("RaffleSDK.state on live (pre-principal) raffles: compat finding 2", () => {
  const legacyTuple = [1n, 2n, 3n, SENDER, 4n, 5n, 6n, 7n, 8n, MARKETPLACE, 9n, true, 10n, 11n, 12n, 13n];

  test("a raffle without seller_referrer is read through the deployed getState selector (9e5726f1), simulated", async () => {
    const { sdk } = raffle(false);
    const added: Record<string, unknown>[] = [];
    const simulate = vi.fn().mockResolvedValue({ returns: [{ returnValue: legacyTuple }] });
    const composer = { addAppCallMethodCall: (p: Record<string, unknown>) => { added.push(p); return composer; }, simulate };
    vi.spyOn(sdk.client.algorand, "newGroup").mockReturnValue(composer as never);
    const state = await sdk.state();
    expect(Buffer.from((added[0].method as ABIMethod).getSelector()).toString("hex")).toBe("9e5726f1");
    expect((added[0].method as ABIMethod).getSignature()).toBe(RAFFLE_LEGACY_GET_STATE);
    expect(simulate).toHaveBeenCalledWith(expect.objectContaining({ skipSignatures: true }));
    expect(state).toMatchObject({
      ticketAsset: 1n, seller: SENDER, winner: MARKETPLACE, prizeClaimed: true, refundMbrCursor: 13n,
      minEntries: 0n, failed: false, raffleRound: 0n, legacyAbi: true,
    });
  });

  test("a principal-ABI raffle keeps the current getState", async () => {
    const { sdk } = raffle(true);
    const current = { ticketAsset: 1n, minEntries: 2n, failed: false, raffleRound: 77n };
    const getState = vi.spyOn(sdk.client.send, "getState").mockResolvedValue({ return: current } as never);
    await expect(sdk.state()).resolves.toEqual({ ...current, legacyAbi: false });
    expect(getState).toHaveBeenCalledOnce();
  });
});

import { AlgorandClient } from "@algorandfoundation/algokit-utils";
import { generateAccount } from "algosdk";
import { describe, expect, test, vi } from "vitest";
import { APP_SPEC as AuctionAppSpec } from "../generated/AuctionClient";
import { APP_SPEC as AuctionFactoryAppSpec } from "../generated/AuctionFactoryClient";
import { AuctionFactorySDK, AuctionSDK, directGateCtx, SELLER_REFERRER_KEY } from "./index";

/**
 * Principal-resolution SDK wrappers for Auction (docs/principal-resolution/PHASE-0-SPEC.md §6.6, §6.13,
 * P2-ABI-01): the wrappers call the hinted overloads (wallet hint, default 0) and fall back to the
 * pre-principal ABI on auctions created before `seller_referrer` existed.
 */

const SENDER = generateAccount().addr.toString();
const MARKETPLACE = generateAccount().addr.toString();
const GATE_TXN = { sender: SENDER, method: { name: "mustCheckFor" } } as never;
const LEGACY_GATE_TXN = { sender: SENDER, method: { name: "mustCheck" } } as never;
const PAYMENT = { txn: "payment" } as never;

const signatures = (spec: { methods: { name: string; args: { type: string }[]; returns: { type: string } }[] }) =>
  spec.methods.map((m) => `${m.name}(${m.args.map((a) => a.type).join(",")})${m.returns.type}`);

function auction(withMarker: boolean) {
  vi.stubEnv("ALGORAND_NETWORK", "localnet");
  const sdk = new AuctionSDK({ algorand: AlgorandClient.defaultLocalNet(), factoryParams: { appId: 1234n, defaultSender: SENDER } });
  const client = sdk.client as unknown as Record<string, any>;
  vi.spyOn(client.appClient, "getGlobalState").mockResolvedValue(
    withMarker ? { [SELLER_REFERRER_KEY]: { value: "", valueRaw: new Uint8Array(32), valueBase64: "", keyRaw: new Uint8Array(), keyBase64: "" } } : {},
  );
  vi.spyOn(client, "mbr").mockResolvedValue({ bids: 35_300n, weights: 0n, bidsByAddress: 18_900n, locations: 18_900n });
  vi.spyOn(client, "hasBid").mockResolvedValue(false);
  vi.spyOn(client.state.global, "getAll").mockResolvedValue({ bidFee: 0n });
  vi.spyOn(client.algorand.createTransaction, "payment").mockResolvedValue(PAYMENT);
  const hinted = vi.spyOn(client.send, "gatedBidPayApplAddressUint64Void").mockResolvedValue({} as never);
  const legacy = vi.spyOn(client.send, "gatedBidPayApplAddressVoid").mockResolvedValue({} as never);
  const ungated = vi.spyOn(client.send, "bid").mockResolvedValue({} as never);
  return { sdk, hinted, legacy, ungated };
}

describe("Auction principal ABI (SDK)", () => {
  test("the generated client exposes both overloads (P2-ABI-01)", () => {
    expect(signatures(AuctionAppSpec)).toEqual(expect.arrayContaining([
      "gatedBid(pay,appl,address,uint64)void",
      "gatedBid(pay,appl,address)void",
      "gatedBidAsa(pay,axfer,appl,address,uint64)void",
      "gatedBidAsa(pay,axfer,appl,address)void",
    ]));
    expect(signatures(AuctionFactoryAppSpec)).toEqual(expect.arrayContaining([
      "newAuction(pay,axfer,string,byte[32][],uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64,uint64)uint64",
      "newAuction(pay,axfer,string,byte[32][],uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64",
    ]));
    const keys = Object.values(AuctionAppSpec.state.keys.global).map((k) => Buffer.from(k.key, "base64").toString());
    expect(keys).toContain(SELLER_REFERRER_KEY);
  });

  test("directGateCtx is the context a top-level caller is verified as (wallet 0)", () => {
    expect(directGateCtx(SENDER)).toEqual({ principal: SENDER, wallet: 0n, spender: SENDER });
  });

  test("gated bid on a principal-ABI auction: hinted overload with the wallet hint (default 0)", async () => {
    const { sdk, hinted, legacy } = auction(true);
    await sdk.bid({ sender: SENDER, signer: (async () => []) as never, amount: 1_000_000n, marketplace: MARKETPLACE, gateTxn: GATE_TXN });
    expect(legacy).not.toHaveBeenCalled();
    expect(hinted).toHaveBeenCalledTimes(1);
    expect(hinted.mock.calls[0][0].args).toEqual({ payment: PAYMENT, gateTxn: GATE_TXN, marketplace: MARKETPLACE, wallet: 0n });
  });

  test("gated bid on an auction without seller_referrer: legacy overload, no hint", async () => {
    const { sdk, hinted, legacy } = auction(false);
    await sdk.bid({ sender: SENDER, signer: (async () => []) as never, amount: 1_000_000n, marketplace: MARKETPLACE, gateTxn: GATE_TXN, wallet: 7n });
    expect(hinted).not.toHaveBeenCalled();
    expect(legacy).toHaveBeenCalledTimes(1);
    expect(legacy.mock.calls[0][0].args).toEqual({ payment: PAYMENT, gateTxn: GATE_TXN, marketplace: MARKETPLACE });
  });

  test("a Gate.mustCheck gate txn takes the legacy shim even on a principal-ABI auction (existing callers)", async () => {
    const { sdk, hinted, legacy } = auction(true);
    await sdk.bid({ sender: SENDER, signer: (async () => []) as never, amount: 1_000_000n, marketplace: MARKETPLACE, gateTxn: LEGACY_GATE_TXN });
    expect(hinted).not.toHaveBeenCalled();
    expect(legacy.mock.calls[0][0].args).toEqual({ payment: PAYMENT, gateTxn: LEGACY_GATE_TXN, marketplace: MARKETPLACE });
  });

  test("an ungated bid never reads the marker", async () => {
    const { sdk, ungated } = auction(true);
    await sdk.bid({ sender: SENDER, signer: (async () => []) as never, amount: 1_000_000n, marketplace: MARKETPLACE });
    expect(ungated).toHaveBeenCalledTimes(1);
    expect((sdk.client.appClient.getGlobalState as unknown as { mock: { calls: unknown[] } }).mock.calls.length).toBe(0);
  });

  test("factory.newAuction calls the hinted overload and forwards the wallet hint", async () => {
    vi.stubEnv("ALGORAND_NETWORK", "localnet");
    const factory = new AuctionFactorySDK({ algorand: AlgorandClient.defaultLocalNet(), factoryParams: { appId: 99n, defaultSender: SENDER } });
    const client = factory.client as unknown as Record<string, any>;
    vi.spyOn(client, "newAuctionCost").mockResolvedValue(1_000n);
    vi.spyOn(client.algorand.createTransaction, "payment").mockResolvedValue(PAYMENT);
    vi.spyOn(client.algorand.createTransaction, "assetTransfer").mockResolvedValue(PAYMENT);
    const hinted = vi.spyOn(client.send, "newAuctionPayAxferStringByte_32Uint64Uint64Uint64Uint64Uint64Uint64Uint64AddressUint64Uint64Uint64")
      .mockResolvedValue({ return: 555n } as never);
    const created = await factory.newAuction({
      sender: SENDER, signer: (async () => []) as never, isPrizeBox: false, prizeAsset: 1n, prizeAmount: 1n, name: "", proof: [],
      bidAssetId: 0n, bidFee: 0n, startingBid: 1n, bidMinimumIncrease: 1n, startTimestamp: 0n, endTimestamp: 1n,
      gateId: 0n, marketplace: MARKETPLACE, weightsListCount: 0n, wallet: 42n,
    });
    expect(created.appId).toBe(555n);
    expect(hinted.mock.calls[0][0].args.wallet).toBe(42n);
  });
});

describe("AuctionSDK.state", () => {
  test("bool globals (stored as uint64) decode to real booleans, as AuctionState declares", async () => {
    vi.stubEnv("ALGORAND_NETWORK", "localnet");
    const sdk = new AuctionSDK({ algorand: AlgorandClient.defaultLocalNet(), factoryParams: { appId: 1234n, defaultSender: SENDER } });
    const client = sdk.client as unknown as Record<string, any>;
    const getAll = vi.spyOn(client.state.global, "getAll");

    getAll.mockResolvedValueOnce({ isPrizeBox: 1n, prizeClaimed: 1n, rafflePrizeClaimed: 1n });
    const set = await sdk.state();
    expect([set.isPrizeBox, set.prizeClaimed, set.rafflePrizeClaimed]).toEqual([true, true, true]);

    getAll.mockResolvedValueOnce({ isPrizeBox: 0n, prizeClaimed: 0n });
    const unset = await sdk.state();
    expect([unset.isPrizeBox, unset.prizeClaimed, unset.rafflePrizeClaimed]).toEqual([false, false, false]);
  });
});

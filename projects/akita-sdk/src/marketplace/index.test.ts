import { AlgorandClient } from "@algorandfoundation/algokit-utils";
import { ABIMethod, generateAccount } from "algosdk";
import { describe, expect, test, vi } from "vitest";
import { APP_SPEC as ListingAppSpec } from "../generated/ListingClient";
import { APP_SPEC as MarketplaceAppSpec } from "../generated/MarketplaceClient";
import {
  CREATOR_ROYALTY_DEFAULT,
  CREATOR_ROYALTY_MAXIMUM,
  directGateCtx,
  isLegacyGateTxn,
  LEGACY_LISTING_CREATE_MBR,
  LISTING_CREATE_MBR,
  MARKETPLACE_HINTED_METHODS,
  MARKETPLACE_LEGACY_METHODS,
  MarketplaceSDK,
  resolveMaxCreatorRoyalty,
  translateMarketplaceError,
} from "./index";
import { ListingSDK } from "./listing";

/**
 * Principal resolution, Marketplace / Listing rev 3 (docs/principal-resolution/PHASE-0-SPEC.md §6.7,
 * §6.13, §7.2): SDK mirror of the listing cost, the overloaded (hinted + legacy) ABI, and the
 * gated-purchase routing. On-chain behaviour is covered by smart_contracts/marketplace/*.e2e.spec.ts.
 */

const BUYER = generateAccount().addr.toString();
const LISTING = 4321n;

const signatures = (spec: { methods: { name: string; args: { type: string }[]; returns: { type: string } }[] }) =>
  spec.methods.map((m) => `${m.name}(${m.args.map((a) => a.type).join(",")})${m.returns.type}`);

/** Creator MBR of an app with this ARC-56 spec: 100_000 per program page + 28_500 / 50_000 per global key. */
function createMbrOf(spec: typeof ListingAppSpec): bigint {
  const approval = Buffer.from(spec.byteCode!.approval, "base64").length;
  const clear = Buffer.from(spec.byteCode!.clear, "base64").length;
  const pages = BigInt(Math.ceil((approval + clear) / 2048));
  const { ints, bytes } = spec.state.schema.global;
  return 100_000n * pages + 28_500n * BigInt(ints) + 50_000n * BigInt(bytes);
}

function sdk(): MarketplaceSDK {
  vi.stubEnv("ALGORAND_NETWORK", "localnet");
  return new MarketplaceSDK({
    algorand: AlgorandClient.defaultLocalNet(),
    factoryParams: { appId: 1234n, defaultSender: BUYER },
  });
}

/** Records which composer method `purchase` picked, without touching the network. */
function stubPurchaseGroup(market: MarketplaceSDK) {
  const calls: { method: string; args: Record<string, unknown> }[] = [];
  const record = (method: string) => (params: { args: Record<string, unknown> }) => {
    calls.push({ method, args: params.args });
    return group;
  };
  const group = {
    gatedPurchaseAsaAxferApplUint64AddressVoid: record("legacy gatedPurchaseAsa"),
    gatedPurchaseAsaAxferApplUint64AddressUint64Void: record("hinted gatedPurchaseAsa"),
    purchaseAsa: record("purchaseAsa"),
    send: vi.fn().mockResolvedValue({}),
  };
  Object.assign(market.client, { newGroup: () => group });
  vi.spyOn(market.client.algorand.createTransaction, "assetTransfer").mockResolvedValue({} as never);
  return calls;
}

const gateCall = (signature: string) => ({ method: ABIMethod.fromSignature(signature) }) as never;
const MUST_CHECK_FOR = "mustCheckFor((address,uint64,address),uint64,byte[][])void";
const MUST_CHECK = "mustCheck(address,uint64,byte[][])void";

describe("Marketplace principal resolution (§6.7)", () => {
  test("P2-ABI-01: the factory ABI has each hinted method and its legacy shim under the same name", () => {
    const sigs = signatures(MarketplaceAppSpec);
    for (const name of Object.keys(MARKETPLACE_HINTED_METHODS) as (keyof typeof MARKETPLACE_HINTED_METHODS)[]) {
      const hinted = MARKETPLACE_HINTED_METHODS[name];
      const legacy = MARKETPLACE_LEGACY_METHODS[name];
      expect(sigs).toContain(hinted);
      expect(sigs).toContain(legacy);
      // the hint is the trailing uint64 of the legacy argument list (PHASE-0-SPEC §2, "Wallet hint");
      // the hinted `list` then takes the seller's royalty bound (audit 09, MKT-03)
      const added = name === "list" ? ",uint64,uint64" : ",uint64";
      expect(hinted).toBe(legacy.replace(/\)([a-z0-9]+)$/, `${added})$1`));
    }
    // a prize is opted in by the factory alone (audit 09, MKT-01); `optIn` stays for payment assets
    expect(sigs).toContain("optInPrize(pay,uint64)void");
    expect(sigs).toContain("optIn(pay,uint64)void");
    // unchanged entry points keep a single selector
    for (const kept of ["purchase(pay,uint64,address)void", "purchaseAsa(axfer,uint64,address)void", "delist(uint64)void", "listCost(uint64,uint64,bool)uint64"]) {
      expect(sigs.filter((s) => s === kept)).toHaveLength(1);
    }
  });

  test("Listing rev 3: create takes sellerReferrer then factoryFloat last; seller_referrer is a byte slice, factory_float a uint", () => {
    const create = signatures(ListingAppSpec).find((s) => s.startsWith("create("));
    expect(create).toBe(
      "create(uint64,bool,uint64,uint64,uint64,address,(address,uint64),address,uint64,uint64,address,string,uint64,(string,uint64),uint64,address,uint64)void",
    );
    expect(ListingAppSpec.state.keys.global.sellerReferrer).toMatchObject({ keyType: "AVMString", valueType: "address" });
    expect(Buffer.from(ListingAppSpec.state.keys.global.sellerReferrer.key, "base64").toString()).toBe("seller_referrer");
    expect(ListingAppSpec.state.keys.global.factoryFloat).toMatchObject({ keyType: "AVMString", valueType: "AVMUint64" });
    expect(Buffer.from(ListingAppSpec.state.keys.global.factoryFloat.key, "base64").toString()).toBe("factory_float");
    expect(ListingAppSpec.state.schema.global).toEqual({ ints: 13, bytes: 7 });
  });

  test("listCost mirror: LISTING_CREATE_MBR equals the generated Listing's pages + schema (+78,500 vs rev 2)", () => {
    expect(LISTING_CREATE_MBR).toBe(createMbrOf(ListingAppSpec));
    expect(LISTING_CREATE_MBR).toBe(920_500n);
    // rev 2 charged 842,000; rev 3 adds seller_referrer (one byte slice) and factory_float (one uint)
    expect(LISTING_CREATE_MBR - 842_000n).toBe(50_000n + 28_500n);
    // the float a legacy-paid listing borrows from the factory (recovered at settlement / delist)
    expect(LISTING_CREATE_MBR - LEGACY_LISTING_CREATE_MBR).toBe(164_000n);
    const market = sdk();
    // ALGO-priced ASA listing, rewards already opted in: base + minBalance + prize opt-in + 2 Rewards v2
    // disbursements (54,500 box with reclaimTo + 25,300 allocation)
    expect(market.listCost({ isAlgoPayment: true, prizeRewardsOptInCost: 0n })).toBe(920_500n + 100_000n + 100_000n + 2n * 79_800n);
    // ALGO-priced prize box: base + minBalance + 1 referral disbursement
    expect(market.listCost({ isPrizeBox: true, isAlgoPayment: true })).toBe(920_500n + 100_000n + 79_800n);
  });

  test("LEGACY_LISTING_CREATE_MBR is the pre-audit Listing the deployed plugin bakes in (2 pages, 9 uints, 6 bytes)", () => {
    expect(LEGACY_LISTING_CREATE_MBR).toBe(2n * 100_000n + 9n * 28_500n + 6n * 50_000n);
    expect(LEGACY_LISTING_CREATE_MBR).toBe(756_500n);
  });

  test("directGateCtx is the ctx the hinted gatedPurchase asserts for a top-level buyer", () => {
    expect(directGateCtx(BUYER)).toEqual({ principal: BUYER, wallet: 0n, spender: BUYER });
  });

  test("isLegacyGateTxn: only Gate.mustCheck is legacy", () => {
    expect(isLegacyGateTxn(gateCall(MUST_CHECK))).toBe(true);
    expect(isLegacyGateTxn(gateCall(MUST_CHECK_FOR))).toBe(false);
  });

  test("purchase routes a mustCheckFor gate txn to the hinted gatedPurchaseAsa with the wallet hint (default 0)", async () => {
    const market = sdk();
    const calls = stubPurchaseGroup(market);
    const gateTxn = gateCall(MUST_CHECK_FOR);

    await market.purchase({ sender: BUYER, signer: (() => {}) as never, listingAppId: LISTING, marketplace: BUYER, isAsa: true, paymentAsset: 7n, paymentAmount: 10n, gateTxn });
    await market.purchase({ sender: BUYER, signer: (() => {}) as never, listingAppId: LISTING, marketplace: BUYER, isAsa: true, paymentAsset: 7n, paymentAmount: 10n, gateTxn, wallet: 99n });

    expect(calls.map((c) => c.method)).toEqual(["hinted gatedPurchaseAsa", "hinted gatedPurchaseAsa"]);
    expect(calls[0].args.wallet).toBe(0n);
    expect(calls[1].args.wallet).toBe(99n);
    expect(calls[0].args.gateTxn).toBe(gateTxn);
  });

  test("purchase routes a legacy mustCheck gate txn to the legacy shim (no hint), and ungated to purchaseAsa", async () => {
    const market = sdk();
    const calls = stubPurchaseGroup(market);

    await market.purchase({ sender: BUYER, signer: (() => {}) as never, listingAppId: LISTING, marketplace: BUYER, isAsa: true, paymentAsset: 7n, paymentAmount: 10n, gateTxn: gateCall(MUST_CHECK) });
    await market.purchase({ sender: BUYER, signer: (() => {}) as never, listingAppId: LISTING, marketplace: BUYER, isAsa: true, paymentAsset: 7n, paymentAmount: 10n });

    expect(calls.map((c) => c.method)).toEqual(["legacy gatedPurchaseAsa", "purchaseAsa"]);
    expect("wallet" in calls[0].args).toBe(false);
  });
});

describe("Marketplace audit 09 fixes (SDK side)", () => {
  /** Records the calls `list` adds to its group, with the factory opted into nothing. */
  function stubListGroup(market: MarketplaceSDK, optInCost: bigint) {
    const calls: { method: string; args: Record<string, unknown> }[] = [];
    const payments: bigint[] = [];
    const record = (method: string) => (params: { args: Record<string, unknown> }) => {
      calls.push({ method, args: params.args });
      return group;
    };
    const group = {
      optIn: record("optIn"),
      optInPrize: record("optInPrize"),
      listPayAxferUint64Uint64Uint64AddressUint64AddressStringByte_32Uint64Uint64Uint64: record("list"),
      send: vi.fn().mockResolvedValue({ returns: [undefined, 4321n] }),
    };
    Object.assign(market.client, { newGroup: () => group, optInCost: vi.fn().mockResolvedValue(optInCost) });
    vi.spyOn(market.client.algorand.createTransaction, "payment").mockImplementation((async (params: { amount: { microAlgo: bigint } }) => {
      payments.push(params.amount.microAlgo);
      return {};
    }) as never);
    vi.spyOn(market.client.algorand.createTransaction, "assetTransfer").mockResolvedValue({} as never);
    const internals = market as unknown as { isMarketplaceOptedInToAsset: () => Promise<boolean>; getRewardsOptInCost: () => Promise<bigint> };
    internals.isMarketplaceOptedInToAsset = async () => false;
    internals.getRewardsOptInCost = async () => 0n;
    return { calls, payments };
  }

  const LISTING_PARAMS = {
    sender: BUYER, signer: (() => {}) as never, price: 1_000_000n, expiration: 0n, reservedFor: BUYER, gateId: 0n, marketplace: BUYER, asset: 5n, amount: 1n,
  };

  test("MKT-01: the asset being sold is opted in with optInPrize for one opt-in; the payment asset still uses optIn", async () => {
    const market = sdk();
    const { calls, payments } = stubListGroup(market, 500_000n);

    await market.list({ ...LISTING_PARAMS, paymentAsset: 7n, name: "", proof: [] });

    expect(calls.map((c) => c.method)).toEqual(["optInPrize", "optIn", "list"]);
    expect(calls[0].args.asset).toBe(5n);
    expect(calls[1].args.asset).toBe(7n);
    // listing payment first, then one opt-in (0.1 ALGO) for the prize and the quoted cost for the payment asset
    expect(payments.slice(1)).toEqual([100_000n, 500_000n]);
  });

  test("MKT-03: list sends the seller's royalty bound; it is required with a proof and open without one", async () => {
    const market = sdk();
    const { calls } = stubListGroup(market, 500_000n);
    const proof = [new Uint8Array(32)];

    await market.list({ ...LISTING_PARAMS, paymentAsset: 0n, name: "", proof: [] });
    expect(calls.at(-1)).toMatchObject({ method: "list", args: { wallet: 0n, maxCreatorRoyalty: CREATOR_ROYALTY_MAXIMUM } });

    await market.list({ ...LISTING_PARAMS, paymentAsset: 0n, name: "collection", proof, maxCreatorRoyalty: 10_000n });
    expect(calls.at(-1)).toMatchObject({ method: "list", args: { name: "collection", proof, maxCreatorRoyalty: 10_000n } });

    const before = calls.length;
    await expect(market.list({ ...LISTING_PARAMS, paymentAsset: 0n, name: "collection", proof })).rejects.toThrow(/maxCreatorRoyalty is required/);
    expect(calls.filter((c) => c.method === "list")).toHaveLength(2);
    expect(calls.length).toBeGreaterThanOrEqual(before);
  });

  test("resolveMaxCreatorRoyalty: a given bound is kept, no proof means no bound, a proof needs one", () => {
    expect(CREATOR_ROYALTY_DEFAULT).toBe(5_000n);
    expect(CREATOR_ROYALTY_MAXIMUM).toBe(50_000n);
    expect(resolveMaxCreatorRoyalty(undefined, [])).toBe(50_000n);
    expect(resolveMaxCreatorRoyalty(0, [])).toBe(0n);
    expect(resolveMaxCreatorRoyalty(7_500n, [new Uint8Array(32)])).toBe(7_500n);
    expect(() => resolveMaxCreatorRoyalty(undefined, [new Uint8Array(32)])).toThrow(/maxCreatorRoyalty is required/);
  });

  test("the new error codes translate", () => {
    expect(translateMarketplaceError("ERR:errRamx")).toMatch(/royalty/i);
    expect(translateMarketplaceError("ERR:errPrlo")).toMatch(/too low/i);
  });
});

describe("ListingSDK.state", () => {
  test("isPrizeBox (a bool global stored as uint64) decodes to a real boolean, as ListingState declares", async () => {
    vi.stubEnv("ALGORAND_NETWORK", "localnet");
    const listing = new ListingSDK({ algorand: AlgorandClient.defaultLocalNet(), factoryParams: { appId: LISTING, defaultSender: BUYER } });
    const getAll = vi.spyOn(listing.client.state.global, "getAll");

    getAll.mockResolvedValueOnce({ isPrizeBox: 1n } as never);
    expect((await listing.state()).isPrizeBox).toBe(true);

    getAll.mockResolvedValueOnce({ isPrizeBox: 0n } as never);
    expect((await listing.state()).isPrizeBox).toBe(false);

    getAll.mockResolvedValueOnce({} as never);
    expect((await listing.state()).isPrizeBox).toBe(false);
  });
});

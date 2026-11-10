import { AlgorandClient } from "@algorandfoundation/algokit-utils";
import { ABIMethod, generateAccount } from "algosdk";
import { describe, expect, test, vi } from "vitest";
import { APP_SPEC as ListingAppSpec } from "../generated/ListingClient";
import { APP_SPEC as MarketplaceAppSpec } from "../generated/MarketplaceClient";
import {
  directGateCtx,
  isLegacyGateTxn,
  LEGACY_LISTING_CREATE_MBR,
  LISTING_CREATE_MBR,
  MARKETPLACE_HINTED_METHODS,
  MARKETPLACE_LEGACY_METHODS,
  MarketplaceSDK,
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
      // the hint is the trailing uint64 of the legacy argument list (PHASE-0-SPEC §2, "Wallet hint")
      expect(hinted).toBe(legacy.replace(/\)([a-z0-9]+)$/, ",uint64)$1"));
    }
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

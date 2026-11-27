import algosdk from "algosdk";
import { BaseSDK } from "../base";
import { MarketplaceClient, MarketplaceArgs } from '../generated/MarketplaceClient';
import { MaybeSigner, NewContractSDKParams } from "../types";
import { ListingSDK } from "./listing";
import { ListParams, PurchaseParams, DelistParams, OptInParams } from "./types";
import type { GateCtx } from "../principal";
import type { AppCallMethodCall } from '@algorandfoundation/algokit-utils/types/composer';
export * from "./errors";
export * from "./listing";
export * from "./royalty";
export * from "./types";
export type MarketplaceContractArgs = MarketplaceArgs["obj"];
/**
 * Full ARC-4 signatures of the Marketplace methods that exist twice during the principal-resolution
 * compatibility window (PHASE-0-SPEC §7.2, P2-ABI-01). The hinted method (trailing `wallet: uint64`)
 * keeps the canonical name; the legacy shim keeps the deployed selector. The generated client exposes
 * each overload under a suffixed name (no shared `client.send.list`); this SDK always sends the hinted one,
 * except `purchase` with a legacy `Gate.mustCheck` gate txn.
 */
export declare const MARKETPLACE_HINTED_METHODS: {
    readonly list: "list(pay,axfer,uint64,uint64,uint64,address,uint64,address,string,byte[32][],uint64,uint64)uint64";
    readonly listPrizeBox: "listPrizeBox(appl,pay,uint64,uint64,uint64,address,uint64,address,uint64)uint64";
    readonly gatedPurchase: "gatedPurchase(pay,appl,uint64,address,uint64)void";
    readonly gatedPurchaseAsa: "gatedPurchaseAsa(axfer,appl,uint64,address,uint64)void";
};
/** Deployed (pre-principal-resolution) selectors, served by the legacy shims until Phase 4. */
export declare const MARKETPLACE_LEGACY_METHODS: {
    readonly list: "list(pay,axfer,uint64,uint64,uint64,address,uint64,address,string,byte[32][])uint64";
    readonly listPrizeBox: "listPrizeBox(appl,pay,uint64,uint64,uint64,address,uint64,address)uint64";
    readonly gatedPurchase: "gatedPurchase(pay,appl,uint64,address)void";
    readonly gatedPurchaseAsa: "gatedPurchaseAsa(axfer,appl,uint64,address)void";
};
/**
 * Creator MBR of a rev-3 Listing child: 2 program pages + 13 global uints + 7 global byte slices
 * = 200_000 + 13 * 28_500 + 7 * 50_000. Mirrors the on-chain `listCost`; prefer `quoteListCost()`.
 * (`seller_referrer` +50,000 and `factory_float` +28,500 over the rev-2 842,000.)
 */
export declare const LISTING_CREATE_MBR = 920500n;
/**
 * Creator MBR the deployed MarketplacePlugin (MainNet 3569561455) and pre-audit SDKs bake into their
 * listing payment (pre-audit Listing: 2 pages, 9 uints, 6 bytes). The legacy `list`/`listPrizeBox`
 * shims still accept it for ALGO-priced listings; the hinted methods never do. The factory floats
 * `LISTING_CREATE_MBR - LEGACY_LISTING_CREATE_MBR` (164,000) plus the v2 disbursement MBR increase
 * (12,800) per quoted disbursement per open legacy-paid listing (189,600 for an ASA listing, 176,800
 * for a prize box), records it on the child (`factoryFloat`) and takes it back at settlement or delist before refunding the seller.
 */
export declare const LEGACY_LISTING_CREATE_MBR = 756500n;
/**
 * The gate context a DIRECT (top-level, wallet hint 0) buyer must pin in `Gate.mustCheckFor`:
 * the hinted `gatedPurchase` resolves `(principal, wallet, spender) = (sender, 0, sender)`.
 */
export declare function directGateCtx(sender: string | algosdk.Address): GateCtx;
/** A `Gate.mustCheck(caller, ...)` txn (legacy subject) rather than `Gate.mustCheckFor(ctx, ...)`. */
export declare function isLegacyGateTxn(gateTxn: AppCallMethodCall): boolean;
/**
 * SDK for interacting with the Marketplace contract.
 * Use this to create listings, purchase items, and delist items.
 */
export declare class MarketplaceSDK extends BaseSDK<MarketplaceClient> {
    constructor(params: NewContractSDKParams);
    /**
     * Creates a new listing and returns a ListingSDK instance.
     * Can list either an ASA or a PrizeBox based on the `isPrizeBox` flag.
     * @returns ListingSDK for the newly created listing
     */
    list({ sender, signer, isPrizeBox, price, paymentAsset, expiration, reservedFor, gateId, marketplace, wallet, ...rest }: ListParams): Promise<ListingSDK>;
    /**
     * Gets a ListingSDK instance for an existing listing.
     * @param appId - The app ID of the listing
     * @returns ListingSDK for the specified listing
     */
    getListing({ appId }: {
        appId: bigint;
    }): ListingSDK;
    /**
     * Checks if the rewards app is already opted into the given asset.
     * Returns 0n if opted in (no cost needed), 100_000n if not.
     */
    private getRewardsOptInCost;
    /**
     * Builds the atomic opt-in plan needed before a listing can be created.
     *
     * The listed ASA must be receivable by the marketplace before the `assetXfer`
     * transaction runs: that takes the factory's own opt-in only (`optInPrize`), because a prize never
     * earns protocol fees. For ASA-denominated listings, the payment asset also needs
     * marketplace/escrow preparation so a future purchase can settle cleanly.
     */
    private getListingOptInPlan;
    private isMarketplaceOptedInToAsset;
    /**
     * Gets the cost to create a new listing.
     * @param isPrizeBox - Whether the prize is a PrizeBox
     * @param isAlgoPayment - Whether the listing will accept ALGO as payment
     * @param prizeRewardsOptInCost - Rewards app opt-in cost for the prize asset (default: 100,000, pass 0 if already opted in)
     * @param paymentRewardsOptInCost - Rewards app opt-in cost for the payment asset (default: 100,000, pass 0 if already opted in)
     */
    listCost({ isPrizeBox, isAlgoPayment, prizeRewardsOptInCost, paymentRewardsOptInCost, escrowOptInCost }?: {
        isPrizeBox?: boolean;
        isAlgoPayment?: boolean;
        prizeRewardsOptInCost?: bigint;
        paymentRewardsOptInCost?: bigint;
        escrowOptInCost?: bigint;
    }): bigint;
    /**
     * Exact listing payment from the factory's readonly `listCost(prize, paymentAsset, isPrizeBox)`, as
     * the chain computes it right now (includes the rewards and DAO-escrow opt-in terms). Pass `prize = 0`
     * for a prize box. Quote after any factory opt-ins the listing group adds, or use `listCost` offline.
     */
    quoteListCost({ prize, paymentAsset, isPrizeBox }?: {
        prize?: bigint | number;
        paymentAsset?: bigint | number;
        isPrizeBox?: boolean;
    }): Promise<bigint>;
    /**
     * Purchases a listing.
     * Use `isAsa: true` with `paymentAsset` and `paymentAmount` for ASA payments, otherwise ALGO is used.
     * Provide `gateTxn` for gated listings.
     */
    purchase({ sender, signer, listingAppId, marketplace, isAsa, gateTxn, wallet, ...rest }: PurchaseParams): Promise<void>;
    /**
     * Opts the marketplace into an asset so listings using it as the payment
     * asset can be fulfilled. When the marketplace has a named DAO escrow
     * configured, this also eagerly opts the escrow + every revenue-split
     * escrow in via the revenue-manager plugin, so downstream list/purchase
     * calls don't have to do the rekey dance mid-group.
     */
    optIn({ sender, signer, asset }: OptInParams): Promise<void>;
    /**
     * Opts the marketplace into an asset that is going to be SOLD on it. Only the factory itself opts
     * in: the DAO revenue escrow never receives a prize, so this costs one asset opt-in (0.1 ALGO) and
     * does not depend on the escrow's payout cycle. `list` adds this call on its own when it is needed.
     * Use `optIn` for a payment asset.
     */
    optInPrize({ sender, signer, asset }: OptInParams): Promise<void>;
    /**
     * Removes a listing and returns the asset to the seller.
     * Can only be called by the seller.
     */
    delist({ sender, signer, appId }: DelistParams): Promise<void>;
    /**
     * Updates the Akita DAO reference.
     */
    updateAkitaDAO({ sender, signer, akitaDao }: MaybeSigner & MarketplaceContractArgs['updateAkitaDAO(uint64)void']): Promise<void>;
    /**
     * Updates the Akita DAO Escrow reference.
     */
    updateAkitaDAOEscrow({ sender, signer, config }: MaybeSigner & MarketplaceContractArgs['updateAkitaDAOEscrow((string,uint64))void']): Promise<void>;
}
/**
 * Convenience function to create a new listing and return the SDK.
 * Creates a marketplace SDK, creates the listing, and returns the listing SDK.
 */
export declare function newListing({ factoryParams, algorand, readerAccount, sendParams, ...listParams }: NewContractSDKParams & ListParams): Promise<ListingSDK>;

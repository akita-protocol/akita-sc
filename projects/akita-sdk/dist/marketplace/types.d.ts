import { MaybeSigner } from "../types";
import { MarketplaceArgs } from '../generated/MarketplaceClient';
import { ListingArgs, FunderInfo } from '../generated/ListingClient';
import { AppCallMethodCall } from '@algorandfoundation/algokit-utils/types/composer';
export { FunderInfo };
type MarketplaceContractArgs = MarketplaceArgs["obj"];
type BaseListParams = MaybeSigner & {
    /** The price for the listing */
    price: bigint | number;
    /** The payment asset ID (0 for ALGO) */
    paymentAsset: bigint | number;
    /** Optional expiration timestamp */
    expiration: bigint | number;
    /** Optional address to reserve listing for */
    reservedFor: string;
    /** Gate app ID for gated listings (0 for none) */
    gateId: bigint | number;
    /** Marketplace address for royalties */
    marketplace: string;
    /**
     * Wallet hint (principal resolution, PHASE-0-SPEC §2): the ARC-58 wallet app id this call acts
     * for, or 0 (default) for a plain account. The verified principal's referrer becomes the listing's
     * `seller_referrer`. A direct (top-level) call must pass 0: any other hint reverts with `errHtop`,
     * because only an app call from inside the wallet's window can prove the binding.
     */
    wallet?: bigint | number;
};
export type ListParams = BaseListParams & ({
    /** Whether listing a PrizeBox */
    isPrizeBox: true;
    /** The PrizeBox app ID */
    prizeBoxId: bigint | number;
} | {
    /** Whether listing a PrizeBox */
    isPrizeBox?: false;
    /** The asset ID to list */
    asset: bigint | number;
    /** The amount of the asset to list */
    amount: bigint | number;
    /** Name of the asset for royalties */
    name: string;
    /** Merkle proof for royalties */
    proof: Uint8Array[];
    /**
     * The highest creator royalty the seller accepts (50_000 = 50%). The royalty is read from the
     * creator's record when the listing lands, and a higher one reverts the listing (errRamx).
     * Required when `proof` is supplied: pass the royalty the seller was shown. Without a proof the
     * listing pays the protocol default and the bound may be left out.
     */
    maxCreatorRoyalty?: bigint | number;
});
type BasePurchaseParams = MaybeSigner & {
    /** The listing app ID */
    listingAppId: bigint | number;
    /** Marketplace address for referrals */
    marketplace: string;
    /**
     * Gate transaction for gated listings. Build it with `GateSDK.build.mustCheckFor({ ctx, gateId, args })`
     * where `ctx` is the buyer's verified context: `{ principal: sender, wallet: 0n, spender: sender }` for a
     * direct call (see `directGateCtx`). The hinted `gatedPurchase` asserts exactly that ctx. A legacy
     * `Gate.mustCheck(caller, ...)` txn is routed to the legacy selector (registry-origin subject) instead.
     */
    gateTxn?: AppCallMethodCall;
    /** Wallet hint for the hinted gated purchase (default 0; see `BaseListParams.wallet`). */
    wallet?: bigint | number;
};
export type PurchaseParams = BasePurchaseParams & ({
    /** Whether paying with ASA (true) or ALGO (false/undefined) */
    isAsa?: false;
} | {
    /** Whether paying with ASA (true) or ALGO (false/undefined) */
    isAsa: true;
    /** The payment asset ID (required when isAsa is true) */
    paymentAsset: bigint | number;
    /** The payment amount (required when isAsa is true) */
    paymentAmount: bigint | number;
});
export type DelistParams = MaybeSigner & MarketplaceContractArgs['delist(uint64)void'];
export type OptInParams = MaybeSigner & {
    /** The asset ID to opt the marketplace into (so it can receive/forward that asset) */
    asset: bigint | number;
};
type ListingContractArgs = ListingArgs["obj"];
export type ChangePriceParams = MaybeSigner & ListingContractArgs['changePrice(uint64)void'];
export type ListingState = {
    prize: bigint;
    isPrizeBox: boolean;
    price: bigint;
    paymentAsset: bigint;
    expiration: bigint;
    seller: string;
    reservedFor: string;
    creatorRoyalty: bigint;
    gateId: bigint;
    marketplace: string;
    marketplaceRoyalties: bigint;
    /** program revision (0 = pre-audit listing with no `rev` global) */
    rev: bigint;
    /**
     * rev 3+: the referrer fixed at creation, paid the referral cut at settlement (zero address = none).
     * Undefined for rev-absent (deployed) listings. Those never pay a seller referral: their registry
     * lookup at settlement keys on `Txn.sender`, which is always the Marketplace factory.
     */
    sellerReferrer?: string;
    /**
     * rev 3+: creation MBR the factory advanced because the listing was paid with the deployed plugin's
     * pre-audit amount (legacy shim); 0 otherwise. Repaid to the factory before the seller's refund.
     * Undefined for rev-absent listings.
     */
    factoryFloat?: bigint;
};

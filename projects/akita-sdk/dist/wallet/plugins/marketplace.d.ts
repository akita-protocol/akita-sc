import { ABIMethod } from "algosdk";
import { BaseSDK } from "../../base";
import { MarketplacePluginArgs, MarketplacePluginClient } from "../../generated/MarketplacePluginClient";
import { NewContractSDKParams, MaybeSigner } from "../../types";
import { PluginSDKReturn } from "../../types";
type ContractArgs = MarketplacePluginArgs["obj"];
/**
 * `purchase` of every MarketplacePlugin deployed before audit MKT-02 added `maxPrice` (selector 0x269e4bb0).
 * The working-tree plugin routes `purchase(uint64,bool,uint64,address,uint64,byte[][])void` (0x703f18ca)
 * instead; its other five selectors are unchanged. Method-restricted grants and pinned keepers must list
 * the new selector after the Phase 3 swap (PHASE-0-SPEC §7.3).
 */
export declare const MARKETPLACE_PLUGIN_LEGACY_PURCHASE: ABIMethod;
/**
 * MarketplacePlugin app ids that route only the legacy (no `maxPrice`) `purchase`: every generation in
 * `networks.ts` so far. `MarketplacePluginSDK` builds the legacy call for these ids, so the current SDK
 * can still buy through the live plugin until Phase 3.
 */
export declare const MARKETPLACE_PLUGIN_LEGACY_PURCHASE_APP_IDS: ReadonlySet<bigint>;
/**
 * `list` of every MarketplacePlugin deployed before the seller's royalty bound (`maxCreatorRoyalty`) was
 * added. The ids in `MARKETPLACE_PLUGIN_LEGACY_PURCHASE_APP_IDS` route this form and no other.
 */
export declare const MARKETPLACE_PLUGIN_LEGACY_LIST: ABIMethod;
type ListArgs = (Omit<ContractArgs['list(uint64,bool,uint64,uint64,uint64,uint64,uint64,address,uint64,address,string,byte[32][],uint64)uint64'], 'wallet' | 'rekeyBack' | 'maxCreatorRoyalty'> & MaybeSigner & {
    rekeyBack?: boolean;
    maxCreatorRoyalty?: bigint | number;
});
type ListPrizeBoxArgs = (Omit<ContractArgs['listPrizeBox(uint64,bool,uint64,uint64,uint64,uint64,address,uint64,address)uint64'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
});
type PurchaseArgs = (Omit<ContractArgs['purchase(uint64,bool,uint64,address,uint64,byte[][])void'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
});
type ChangePriceArgs = (Omit<ContractArgs['changePrice(uint64,bool,uint64,uint64)void'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
});
type DelistArgs = (Omit<ContractArgs['delist(uint64,bool,uint64)void'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
});
export declare class MarketplacePluginSDK extends BaseSDK<MarketplacePluginClient> {
    /**
     * Force the `purchase` ABI: `true` = legacy (no `maxPrice`), `false` = current. Unset = legacy only for
     * the ids in `MARKETPLACE_PLUGIN_LEGACY_PURCHASE_APP_IDS` (e.g. set it for a deployed program reinstalled
     * under a new id on LocalNet).
     */
    legacyPurchaseAbi?: boolean;
    constructor({ legacyPurchaseAbi, ...params }: NewContractSDKParams & {
        legacyPurchaseAbi?: boolean;
    });
    /** Whether this plugin app routes only the legacy `purchase(uint64,bool,uint64,address,byte[][])void`. */
    usesLegacyPurchaseAbi(): boolean;
    private listSelector;
    private purchaseSelector;
    /**
     * The legacy plugin has no on-chain price bound, so refuse here when the listing already costs more
     * than `maxPrice`. This is a read before signing, not an atomic check. Rev-3 listings add the on-chain
     * price-change cooldown (errPrcd), which covers the few rounds between this read and the purchase.
     */
    private assertLegacyPriceWithin;
    list(): PluginSDKReturn;
    list(args: ListArgs): PluginSDKReturn;
    listPrizeBox(): PluginSDKReturn;
    listPrizeBox(args: ListPrizeBoxArgs): PluginSDKReturn;
    purchase(): PluginSDKReturn;
    purchase(args: PurchaseArgs): PluginSDKReturn;
    changePrice(): PluginSDKReturn;
    changePrice(args: ChangePriceArgs): PluginSDKReturn;
    delist(): PluginSDKReturn;
    delist(args: DelistArgs): PluginSDKReturn;
}
export {};

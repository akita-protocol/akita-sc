import { BaseSDK } from "../../base";
import { MarketplacePluginArgs, MarketplacePluginClient } from "../../generated/MarketplacePluginClient";
import { NewContractSDKParams, MaybeSigner } from "../../types";
import { PluginSDKReturn } from "../../types";
type ContractArgs = MarketplacePluginArgs["obj"];
type ListArgs = (Omit<ContractArgs['list(uint64,bool,uint64,uint64,uint64,uint64,uint64,address,uint64,address,string,byte[32][])uint64'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
});
type ListPrizeBoxArgs = (Omit<ContractArgs['listPrizeBox(uint64,bool,uint64,uint64,uint64,uint64,address,uint64,address)uint64'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
});
type PurchaseArgs = (Omit<ContractArgs['purchase(uint64,bool,uint64,address,byte[][])void'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
});
type ChangePriceArgs = (Omit<ContractArgs['changePrice(uint64,bool,uint64,uint64)void'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
});
type DelistArgs = (Omit<ContractArgs['delist(uint64,bool,uint64)void'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
});
export declare class MarketplacePluginSDK extends BaseSDK<MarketplacePluginClient> {
    constructor(params: NewContractSDKParams);
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

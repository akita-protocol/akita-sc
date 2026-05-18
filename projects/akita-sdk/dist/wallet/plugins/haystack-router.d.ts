import { BaseSDK } from "../../base";
import { HaystackRouterPluginArgs, HaystackRouterPluginClient } from "../../generated/HaystackRouterPluginClient";
import { MaybeSigner, NewContractSDKParams } from "../../types";
import { PluginSDKReturn } from "../../types";
type ContractArgs = HaystackRouterPluginArgs["obj"];
type SwapArgs = (Omit<ContractArgs["swap(uint64,bool,uint64,uint64,uint64,uint64)void"], "wallet" | "rekeyBack"> & MaybeSigner & {
    rekeyBack?: boolean;
});
type ClaimArgs = (Omit<ContractArgs["claim(uint64,bool,address,address,uint64[],uint64,bool)void"], "wallet" | "rekeyBack"> & MaybeSigner & {
    rekeyBack?: boolean;
});
export declare class HaystackRouterPluginSDK extends BaseSDK<HaystackRouterPluginClient> {
    constructor(params: NewContractSDKParams);
    swap(): PluginSDKReturn;
    swap(args: SwapArgs): PluginSDKReturn;
    claim(): PluginSDKReturn;
    claim(args: ClaimArgs): PluginSDKReturn;
}
export {};

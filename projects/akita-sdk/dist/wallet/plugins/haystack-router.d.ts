import { BaseSDK } from "../../base";
import { HaystackRouterPluginArgs, HaystackRouterPluginClient } from "../../generated/HaystackRouterPluginClient";
import { MaybeSigner, NewContractSDKParams } from "../../types";
import { PluginSDKReturn } from "../../types";
type ContractArgs = HaystackRouterPluginArgs["obj"];
type SwapArgs = (Omit<ContractArgs["swap(uint64,bool,uint64,uint64,uint64,uint64)void"], "wallet" | "rekeyBack"> & MaybeSigner & {
    rekeyBack?: boolean;
});
export declare class HaystackRouterPluginSDK extends BaseSDK<HaystackRouterPluginClient> {
    constructor(params: NewContractSDKParams);
    /**
     * Find the matching Haystack input transaction in the group and fund its sender.
     * Append the intact route after the wallet's rekey, plugin, and verify calls,
     * using the wallet spending address as the route's output beneficiary.
     */
    swap(): PluginSDKReturn;
    swap(args: SwapArgs): PluginSDKReturn;
}
export {};

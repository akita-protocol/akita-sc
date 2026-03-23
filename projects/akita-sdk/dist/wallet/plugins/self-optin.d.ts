import { BaseSDK } from "../../base";
import { SelfOptInPluginArgs, SelfOptInPluginClient } from "../../generated/SelfOptInPluginClient";
import { NewContractSDKParams, MaybeSigner } from "../../types";
import { PluginSDKReturn } from "../../types";
type ContractArgs = SelfOptInPluginArgs["obj"];
type SelfOptInArgs = (Omit<ContractArgs['optIn(uint64,bool,uint64[])void'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
});
export declare class SelfOptInPluginSDK extends BaseSDK<SelfOptInPluginClient> {
    constructor(params: NewContractSDKParams);
    optIn(): PluginSDKReturn;
    optIn(args: SelfOptInArgs): PluginSDKReturn;
}
export {};

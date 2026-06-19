import { BaseSDK } from "../../base";
import { AsaManagerPluginArgs, AsaManagerPluginClient } from "../../generated/AsaManagerPluginClient";
import { NewContractSDKParams, MaybeSigner } from "../../types";
import { PluginSDKReturn } from "../../types";
type CreateAssetParams = {
    assetName: string;
    unitName: string;
    total: bigint | number;
    decimals: bigint | number;
    manager: string;
    reserve: string;
    freeze: string;
    clawback: string;
    defaultFrozen: boolean;
    url: string;
};
type ContractArgs = AsaManagerPluginArgs["obj"];
type MintArgs = (Omit<ContractArgs['mint(uint64,bool,(string,string,uint64,uint64,address,address,address,address,bool,string)[],pay)uint64[]'], 'wallet' | 'rekeyBack' | 'assets' | 'mbrPayment'> & MaybeSigner & {
    rekeyBack?: boolean;
    assets: CreateAssetParams[];
});
type DeleteArgs = (Omit<ContractArgs['delete(uint64,bool,uint64[])void'], 'wallet' | 'rekeyBack' | 'assets'> & MaybeSigner & {
    rekeyBack?: boolean;
    assets: bigint[] | number[];
});
export declare class AsaManagerPluginSDK extends BaseSDK<AsaManagerPluginClient> {
    constructor(params: NewContractSDKParams);
    mint(): PluginSDKReturn;
    mint(args: MintArgs): PluginSDKReturn;
    delete(): PluginSDKReturn;
    delete(args: DeleteArgs): PluginSDKReturn;
}
export { AsaManagerPluginSDK as AsaMintPluginSDK };

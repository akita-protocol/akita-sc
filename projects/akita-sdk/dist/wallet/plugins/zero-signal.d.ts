import { BaseSDK } from "../../base";
import { ZeroSignalPluginArgs, ZeroSignalPluginClient } from "../../generated/ZeroSignalPluginClient";
import { NewContractSDKParams, MaybeSigner } from "../../types";
import { PluginSDKReturn } from "../../types";
type ContractArgs = ZeroSignalPluginArgs["obj"];
type ZeroSignalPaymentParams = {
    /** 0 = ALGO */
    asset: bigint | number;
    /** may be 0 */
    amount: bigint | number;
};
type PayArgs = (Omit<ContractArgs['pay(uint64,bool,(address,uint64,uint64)[])void'], 'wallet' | 'rekeyBack' | 'payments'> & MaybeSigner & {
    rekeyBack?: boolean;
    payments: ZeroSignalPaymentParams[];
});
/**
 * A pay plugin that can only pay the ZeroSignal escrow app. The contract takes
 * a receiver per payment and refuses any but the escrow's address, so this SDK
 * fills the receiver in from the plugin's own `escrow_app` global.
 */
export declare class ZeroSignalPluginSDK extends BaseSDK<ZeroSignalPluginClient> {
    constructor(params: NewContractSDKParams);
    /** The ZeroSignal escrow app id this plugin was created for. */
    escrowApp(): Promise<bigint>;
    pay(): PluginSDKReturn;
    pay(args: PayArgs): PluginSDKReturn;
}
export {};

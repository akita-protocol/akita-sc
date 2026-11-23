import { BaseSDK } from "../../base";
import { PayPluginArgs, PayPluginClient } from "../../generated/PayPluginClient";
import { NewContractSDKParams, MaybeSigner } from "../../types";
import { PluginSDKReturn } from "../../types";
import { Address } from "algosdk";
type CreatePaymentParams = {
    receiver: Address | string;
    amount: bigint | number;
    asset: bigint | number;
};
type ContractArgs = PayPluginArgs["obj"];
type PayArgs = (Omit<ContractArgs['pay(uint64,bool,(address,uint64,uint64)[])void'], 'wallet' | 'rekeyBack' | 'payments'> & MaybeSigner & {
    rekeyBack?: boolean;
    payments: CreatePaymentParams[];
});
export declare class PayPluginSDK extends BaseSDK<PayPluginClient> {
    constructor(params: NewContractSDKParams);
    pay(): PluginSDKReturn;
    pay(args: PayArgs): PluginSDKReturn;
}
/** The policy of a delegated PayPlugin grant: the only receivers it may pay, and the only assets (0 is ALGO). */
export type PayPolicy = {
    recipients: string[];
    assets: bigint[];
};
/**
 * Encode a PayPlugin policy body for `MetaPluginSDK.configurePolicy`. Sorts both lists and drops
 * repeats, which the plugin's `validatePolicy` requires; each list must hold 1 to 8 entries.
 */
export declare function encodePayPolicy(policy: {
    recipients: (string | Address)[];
    assets: (bigint | number)[];
}): Uint8Array;
export declare function decodePayPolicy(body: Uint8Array): PayPolicy;
export {};

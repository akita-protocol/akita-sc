type ReadableAddress = string | import('algosdk').Address;
import { BaseSDK } from "../../base";
import { InferencePluginClient } from "../../generated/InferencePluginClient";
import { MaybeSigner, NewContractSDKParams, PluginSDKReturn } from "../../types";
/**
 * The references `InferenceNetwork.settle` needs, for providers that build the call themselves. A
 * settle in an ASA touches three holdings (the network's, the payout's and the payer's), and a pool
 * ticket two more boxes, which can be more than automatic resource population will place in one call.
 * For a pool ticket pass `pool` (the ticket's pool); `payer` is then the member.
 */
export declare function inferenceSettleReferences(args: {
    ticket: bigint | number;
    provider: bigint | number;
    asset: bigint | number;
    payer: ReadableAddress;
    payout: ReadableAddress;
    pool?: bigint | number;
}): {
    accountReferences: ReadableAddress[];
    assetReferences: bigint[];
    boxReferences: Uint8Array<ArrayBuffer>[];
};
/**
 * Policy of a delegated InferencePlugin grant: the network it may use, the only providers it may open
 * tickets to, the only assets it may lock (0 is ALGO), and the most one ticket may lock.
 */
export type InferencePolicy = {
    network: bigint;
    providers: bigint[];
    assets: bigint[];
    maxPrice: bigint;
};
/**
 * Encode an InferencePlugin policy body for `MetaPluginSDK.configurePolicy`. Sorts the lists and drops
 * repeats, which the plugin's `validatePolicy` requires; each list must hold 1 to 8 entries.
 */
export declare function encodeInferencePolicy(policy: {
    network: bigint | number;
    providers: (bigint | number)[];
    assets: (bigint | number)[];
    maxPrice: bigint | number;
}): Uint8Array;
export declare function decodeInferencePolicy(body: Uint8Array): InferencePolicy;
type OpenArgs = MaybeSigner & {
    rekeyBack?: boolean;
    network: bigint | number;
    provider: bigint | number;
    asset: bigint | number;
    /** The most this request may cost; locked until the provider settles. */
    maxPrice: bigint | number;
    /** The caller's 32-byte id for the request, which it also sends to the provider. */
    request: Uint8Array;
};
/** Builds InferencePlugin calls for `WalletSDK.usePlugin`. */
export declare class InferencePluginSDK extends BaseSDK<InferencePluginClient> {
    constructor(params: NewContractSDKParams);
    private selector;
    /** Opens a ticket from the wallet's spending account for one request; the call returns the ticket id. */
    open(): PluginSDKReturn;
    open(args: OpenArgs): PluginSDKReturn;
}
export {};

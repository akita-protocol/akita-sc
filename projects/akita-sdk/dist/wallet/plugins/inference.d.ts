type ReadableAddress = string | import('algosdk').Address;
import { BaseSDK } from "../../base";
import { InferencePluginClient } from "../../generated/InferencePluginClient";
import { MaybeSigner, NewContractSDKParams, PluginSDKReturn } from "../../types";
/**
 * An InferenceNetwork ticket's id: sha256 of the principal's address (the wallet's controlled address)
 * and the caller's 32-byte request id. The caller knows it before the ticket lands.
 */
export declare function inferenceTicketId(principal: ReadableAddress, request: Uint8Array): Uint8Array;
/** The box key of a subscription's use of an InferenceNetwork sponsor pool. */
export declare function inferenceUsageKey(pool: bigint | number, subscriber: ReadableAddress, subscription: bigint | number): Uint8Array<ArrayBuffer>;
/**
 * The references `InferenceNetwork.settle` needs, for providers that build the call themselves. A
 * settle in an ASA touches three holdings (the network's, the payout's and the payer's), and a pool
 * ticket two more boxes, which can be more than automatic resource population will place in one call.
 * For a pool ticket pass `pool` and `subscription` from the ticket; `payer` is then the ticket's payer
 * field, the subscription's address.
 */
export declare function inferenceSettleReferences(args: {
    ticket: Uint8Array;
    provider: bigint | number;
    asset: bigint | number;
    payer: ReadableAddress;
    payout: ReadableAddress;
    pool?: bigint | number;
    subscription?: bigint | number;
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
type OpenPooledArgs = MaybeSigner & {
    rekeyBack?: boolean;
    network: bigint | number;
    /** The sponsor pool that pays. */
    pool: bigint | number;
    provider: bigint | number;
    /** The most this request may cost; locked from the pool until the provider settles. */
    maxPrice: bigint | number;
    /** The caller's 32-byte id for the request, which it also sends to the provider. */
    request: Uint8Array;
    /** The wallet's paid-up subscription to the pool's service. */
    subscription: {
        address: ReadableAddress;
        id: bigint | number;
    };
};
/** Builds InferencePlugin calls for `WalletSDK.usePlugin`. */
export declare class InferencePluginSDK extends BaseSDK<InferencePluginClient> {
    constructor(params: NewContractSDKParams);
    private selector;
    /** Opens a ticket from the wallet's spending account for one request; the call returns the ticket id. */
    open(): PluginSDKReturn;
    open(args: OpenArgs): PluginSDKReturn;
    /**
     * Opens a ticket paid from a sponsor pool, against the wallet's subscription to the pool's service;
     * nothing leaves the wallet. The call returns the ticket id. The network call reads the subscription
     * with two inner calls, so give the wallet call `extraFee` for them.
     */
    openPooled(): PluginSDKReturn;
    openPooled(args: OpenPooledArgs): PluginSDKReturn;
}
export {};

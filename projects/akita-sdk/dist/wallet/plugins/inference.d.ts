type ReadableAddress = string | import('algosdk').Address;
import { BaseSDK } from "../../base";
import { InferencePluginClient } from "../../generated/InferencePluginClient";
import { MaybeSigner, NewContractSDKParams, PluginSDKReturn } from "../../types";
export { INFERENCE_ERROR_MESSAGES, translateInferenceError } from "../../inference/errors";
/**
 * An InferenceNetwork ticket's id: sha256 of the principal's address (the wallet's controlled address)
 * and the caller's 32-byte request id. The caller knows it before the ticket lands.
 */
export declare function inferenceTicketId(principal: ReadableAddress, request: Uint8Array): Uint8Array;
/** The box key of a subscription's use of an InferenceNetwork sponsor pool. */
export declare function inferenceUsageKey(pool: bigint | number, subscriber: ReadableAddress, subscription: bigint | number): Uint8Array<ArrayBuffer>;
/**
 * The references `InferenceNetwork.settle` (and `refundExpired`) need, for providers that build the call
 * themselves, with automatic resource population off. Pass the ticket's fields: `payer`, `principal`,
 * and for a pool ticket `pool` and `subscription` (`payer` is then the subscription's address).
 *
 * A plain ticket names the payout, the payer and the principal (the refund falls back to the principal
 * when the payer can no longer receive) and the asset: 7 references with its three boxes. A pool
 * ticket's deposit goes back to the principal and its lock to the pool, so it names the payout and the
 * principal, the asset and five boxes: 8, the most one call holds.
 */
export declare function inferenceSettleReferences(args: {
    ticket: Uint8Array;
    provider: bigint | number;
    asset: bigint | number;
    payer: ReadableAddress;
    principal: ReadableAddress;
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
type Common = MaybeSigner & {
    rekeyBack?: boolean;
    network: bigint | number;
};
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
/** InferenceNetwork settings, as `setSettings` takes them. */
export type InferenceSettings = {
    unbondDelay: bigint | number;
    settleWindow: bigint | number;
    openRegistration: boolean;
};
/** InferenceNetwork provider status. A Frozen provider can neither take nor settle tickets. */
export declare const InferenceProviderStatus: {
    readonly Pending: 0n;
    readonly Active: 1n;
    readonly Paused: 2n;
    readonly Unbonding: 3n;
    readonly Exited: 4n;
    readonly Frozen: 5n;
};
type AdminArgs = {
    setSettings: {
        settings: InferenceSettings;
    };
    /** `newBox` on the first call for an asset: the spending account then pays the asset's box. */
    setPaymentAsset: {
        asset: bigint | number;
        allowed: boolean;
        newBox: boolean;
    };
    setProviderStatus: {
        provider: bigint | number;
        status: bigint | number;
    };
    slash: {
        provider: bigint | number;
        amount: bigint | number;
        receiver: ReadableAddress;
    };
    /** The zero address hands the network to the DAO's wallet alone. */
    setAdmin: {
        admin: ReadableAddress;
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
    /** InferenceNetwork.setSettings through the wallet. */
    setSettings(): PluginSDKReturn;
    setSettings(args: Common & AdminArgs["setSettings"]): PluginSDKReturn;
    /** InferenceNetwork.setPaymentAsset through the wallet. */
    setPaymentAsset(): PluginSDKReturn;
    setPaymentAsset(args: Common & AdminArgs["setPaymentAsset"]): PluginSDKReturn;
    /** InferenceNetwork.setProviderStatus through the wallet; see `InferenceProviderStatus`. */
    setProviderStatus(): PluginSDKReturn;
    setProviderStatus(args: Common & AdminArgs["setProviderStatus"]): PluginSDKReturn;
    /** InferenceNetwork.slash through the wallet: sends up to the provider's whole bond to `receiver`. */
    slash(): PluginSDKReturn;
    slash(args: Common & AdminArgs["slash"]): PluginSDKReturn;
    /** InferenceNetwork.setAdmin through the wallet. */
    setAdmin(): PluginSDKReturn;
    setAdmin(args: Common & AdminArgs["setAdmin"]): PluginSDKReturn;
    /** One admin pass-through. */
    private adminCall;
}

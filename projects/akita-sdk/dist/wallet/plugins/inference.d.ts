import { BaseSDK } from "../../base";
import { InferencePluginClient } from "../../generated/InferencePluginClient";
import { MaybeSigner, NewContractSDKParams, PluginSDKReturn } from "../../types";
/** Prefix of every InferenceNetwork receipt. Matches INFERENCE_RECEIPT_DOMAIN in the contract. */
export declare const INFERENCE_RECEIPT_DOMAIN = "akita/inference/v1";
/**
 * The bytes a channel's session key signs to say the channel owes its provider `total` in all.
 * Sign them with plain ed25519 (no "MX" prefix): the contract checks them with ed25519verify_bare.
 */
export declare function inferenceReceiptMessage(network: bigint | number, channel: bigint | number, total: bigint | number): Uint8Array;
/**
 * Policy of a delegated InferencePlugin grant: the network it may use, the only providers and assets
 * (0 is ALGO) it may use, and the most one channel may ever hold.
 */
export type InferencePolicy = {
    network: bigint;
    providers: bigint[];
    assets: bigint[];
    maxDeposit: bigint;
};
/**
 * Encode an InferencePlugin policy body for `MetaPluginSDK.configurePolicy`. Sorts the lists and drops
 * repeats, which the plugin's `validatePolicy` requires; each list must hold 1 to 8 entries.
 */
export declare function encodeInferencePolicy(policy: {
    network: bigint | number;
    providers: (bigint | number)[];
    assets: (bigint | number)[];
    maxDeposit: bigint | number;
}): Uint8Array;
export declare function decodeInferencePolicy(body: Uint8Array): InferencePolicy;
type Common = MaybeSigner & {
    rekeyBack?: boolean;
    network: bigint | number;
};
type OpenArgs = Common & {
    provider: bigint | number;
    asset: bigint | number;
    amount: bigint | number;
    /** The 32-byte ed25519 public key that will sign this channel's receipts. */
    sessionKey: Uint8Array;
};
type TopUpArgs = Common & {
    channel: bigint | number;
    amount: bigint | number;
};
type RequestCloseArgs = Common & {
    channel: bigint | number;
};
/** Builds InferencePlugin calls for `WalletSDK.usePlugin`. */
export declare class InferencePluginSDK extends BaseSDK<InferencePluginClient> {
    constructor(params: NewContractSDKParams);
    private selector;
    /** Opens a channel from the wallet's spending account; the call returns the channel id. */
    open(): PluginSDKReturn;
    open(args: OpenArgs): PluginSDKReturn;
    /** Adds to a channel the wallet's spending account opened. */
    topUp(): PluginSDKReturn;
    topUp(args: TopUpArgs): PluginSDKReturn;
    /** Asks to close a channel the wallet's spending account opened. */
    requestClose(): PluginSDKReturn;
    requestClose(args: RequestCloseArgs): PluginSDKReturn;
}
export {};

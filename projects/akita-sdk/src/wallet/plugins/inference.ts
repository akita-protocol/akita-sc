type ReadableAddress = string | import('algosdk').Address;
import { ABIType, encodeUint64 } from "algosdk";
import { BaseSDK } from "../../base";
import { InferencePluginClient, InferencePluginFactory } from "../../generated/InferencePluginClient";
import { MaybeSigner, NewContractSDKParams, PluginHookParams, PluginSDKReturn } from "../../types";
import { getTxns } from "../utils";

/** Prefix of every InferenceNetwork receipt. Matches INFERENCE_RECEIPT_DOMAIN in the contract. */
export const INFERENCE_RECEIPT_DOMAIN = "akita/inference/v1";

/**
 * The bytes a channel's session key signs to say the channel owes its provider `total` in all.
 * Sign them with plain ed25519 (no "MX" prefix): the contract checks them with ed25519verify_bare.
 */
export function inferenceReceiptMessage(network: bigint | number, channel: bigint | number, total: bigint | number): Uint8Array {
  const domain = new TextEncoder().encode(INFERENCE_RECEIPT_DOMAIN);
  const message = new Uint8Array(domain.length + 24);
  message.set(domain, 0);
  message.set(encodeUint64(BigInt(network)), domain.length);
  message.set(encodeUint64(BigInt(channel)), domain.length + 8);
  message.set(encodeUint64(BigInt(total)), domain.length + 16);
  return message;
}

/**
 * Policy of a delegated InferencePlugin grant: the network it may use, the only providers and assets
 * (0 is ALGO) it may use, and the most one channel may ever hold.
 */
export type InferencePolicy = { network: bigint; providers: bigint[]; assets: bigint[]; maxDeposit: bigint };

const inferencePolicyType = ABIType.from("(uint64,uint64[],uint64[],uint64)");
const sortedUnique = (values: (bigint | number)[]) =>
  [...new Set(values.map((v) => BigInt(v)))].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));

/**
 * Encode an InferencePlugin policy body for `MetaPluginSDK.configurePolicy`. Sorts the lists and drops
 * repeats, which the plugin's `validatePolicy` requires; each list must hold 1 to 8 entries.
 */
export function encodeInferencePolicy(policy: {
  network: bigint | number;
  providers: (bigint | number)[];
  assets: (bigint | number)[];
  maxDeposit: bigint | number;
}): Uint8Array {
  const providers = sortedUnique(policy.providers);
  const assets = sortedUnique(policy.assets);
  if (providers.length < 1 || providers.length > 8) throw new Error("An inference policy lists 1 to 8 providers");
  if (assets.length < 1 || assets.length > 8) throw new Error("An inference policy lists 1 to 8 assets");
  if (BigInt(policy.maxDeposit) <= 0n) throw new Error("An inference policy needs a cap above zero");
  return inferencePolicyType.encode([BigInt(policy.network), providers, assets, BigInt(policy.maxDeposit)]);
}

export function decodeInferencePolicy(body: Uint8Array): InferencePolicy {
  const [network, providers, assets, maxDeposit] = inferencePolicyType.decode(body) as [bigint, bigint[], bigint[], bigint];
  return {
    network: BigInt(network),
    providers: providers.map((p) => BigInt(p)),
    assets: assets.map((a) => BigInt(a)),
    maxDeposit: BigInt(maxDeposit),
  };
}

type Common = MaybeSigner & { rekeyBack?: boolean; network: bigint | number };

type OpenArgs = Common & {
  provider: bigint | number;
  asset: bigint | number;
  amount: bigint | number;
  /** The 32-byte ed25519 public key that will sign this channel's receipts. */
  sessionKey: Uint8Array;
};
type TopUpArgs = Common & { channel: bigint | number; amount: bigint | number };
type RequestCloseArgs = Common & { channel: bigint | number };

/** Builds InferencePlugin calls for `WalletSDK.usePlugin`. */
export class InferencePluginSDK extends BaseSDK<InferencePluginClient> {

  constructor(params: NewContractSDKParams) {
    super({ factory: InferencePluginFactory, ...params });
  }

  private selector(name: string) {
    return [this.client.appClient.getABIMethod(name).getSelector()];
  }

  /** Opens a channel from the wallet's spending account; the call returns the channel id. */
  open(): PluginSDKReturn;
  open(args: OpenArgs): PluginSDKReturn;
  open(args?: OpenArgs): PluginSDKReturn {
    if (args === undefined) {
      return (_?: ReadableAddress) => ({ appId: this.client.appId, selectors: this.selector("open"), getTxns });
    }
    const sendParams = this.getRequiredSendParams({ sender: args.sender, signer: args.signer });
    return (_?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: this.selector("open"),
      getTxns: async ({ wallet }: PluginHookParams) => {
        const params = await this.client.params.open({
          ...sendParams,
          args: {
            wallet,
            rekeyBack: args.rekeyBack ?? true,
            network: BigInt(args.network),
            provider: BigInt(args.provider),
            asset: BigInt(args.asset),
            amount: BigInt(args.amount),
            sessionKey: args.sessionKey,
          },
        });
        return [{ type: "methodCall", ...params }];
      },
    });
  }

  /** Adds to a channel the wallet's spending account opened. */
  topUp(): PluginSDKReturn;
  topUp(args: TopUpArgs): PluginSDKReturn;
  topUp(args?: TopUpArgs): PluginSDKReturn {
    if (args === undefined) {
      return (_?: ReadableAddress) => ({ appId: this.client.appId, selectors: this.selector("topUp"), getTxns });
    }
    const sendParams = this.getRequiredSendParams({ sender: args.sender, signer: args.signer });
    return (_?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: this.selector("topUp"),
      getTxns: async ({ wallet }: PluginHookParams) => {
        const params = await this.client.params.topUp({
          ...sendParams,
          args: {
            wallet,
            rekeyBack: args.rekeyBack ?? true,
            network: BigInt(args.network),
            channel: BigInt(args.channel),
            amount: BigInt(args.amount),
          },
        });
        return [{ type: "methodCall", ...params }];
      },
    });
  }

  /** Asks to close a channel the wallet's spending account opened. */
  requestClose(): PluginSDKReturn;
  requestClose(args: RequestCloseArgs): PluginSDKReturn;
  requestClose(args?: RequestCloseArgs): PluginSDKReturn {
    if (args === undefined) {
      return (_?: ReadableAddress) => ({ appId: this.client.appId, selectors: this.selector("requestClose"), getTxns });
    }
    const sendParams = this.getRequiredSendParams({ sender: args.sender, signer: args.signer });
    return (_?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: this.selector("requestClose"),
      getTxns: async ({ wallet }: PluginHookParams) => {
        const params = await this.client.params.requestClose({
          ...sendParams,
          args: { wallet, rekeyBack: args.rekeyBack ?? true, network: BigInt(args.network), channel: BigInt(args.channel) },
        });
        return [{ type: "methodCall", ...params }];
      },
    });
  }
}

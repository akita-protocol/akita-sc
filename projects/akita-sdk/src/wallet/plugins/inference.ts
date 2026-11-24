type ReadableAddress = string | import('algosdk').Address;
import { ABIType, encodeUint64 } from "algosdk";
import { BaseSDK } from "../../base";
import { InferencePluginClient, InferencePluginFactory } from "../../generated/InferencePluginClient";
import { MaybeSigner, NewContractSDKParams, PluginHookParams, PluginSDKReturn } from "../../types";
import { getTxns } from "../utils";

/** InferenceNetwork box key prefixes, for naming references explicitly. */
const boxKey = (prefix: string, id: bigint | number) => {
  const key = new Uint8Array(9);
  key[0] = prefix.charCodeAt(0);
  key.set(encodeUint64(BigInt(id)), 1);
  return key;
};

/**
 * The references `InferenceNetwork.settle` needs, for providers that build the call themselves. A
 * settle in an ASA touches three holdings (the network's, the payout's and the payer's), which can be
 * more than automatic resource population will place in one call.
 */
export function inferenceSettleReferences(args: {
  ticket: bigint | number;
  provider: bigint | number;
  asset: bigint | number;
  payer: ReadableAddress;
  payout: ReadableAddress;
}) {
  return {
    accountReferences: [args.payout, args.payer],
    assetReferences: BigInt(args.asset) === 0n ? [] : [BigInt(args.asset)],
    boxReferences: [boxKey("t", args.ticket), boxKey("p", args.provider), boxKey("x", args.asset)],
  };
}

/**
 * Policy of a delegated InferencePlugin grant: the network it may use, the only providers it may open
 * tickets to, the only assets it may lock (0 is ALGO), and the most one ticket may lock.
 */
export type InferencePolicy = { network: bigint; providers: bigint[]; assets: bigint[]; maxPrice: bigint };

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
  maxPrice: bigint | number;
}): Uint8Array {
  const providers = sortedUnique(policy.providers);
  const assets = sortedUnique(policy.assets);
  if (providers.length < 1 || providers.length > 8) throw new Error("An inference policy lists 1 to 8 providers");
  if (assets.length < 1 || assets.length > 8) throw new Error("An inference policy lists 1 to 8 assets");
  if (BigInt(policy.maxPrice) <= 0n) throw new Error("An inference policy needs a cap above zero");
  return inferencePolicyType.encode([BigInt(policy.network), providers, assets, BigInt(policy.maxPrice)]);
}

export function decodeInferencePolicy(body: Uint8Array): InferencePolicy {
  const [network, providers, assets, maxPrice] = inferencePolicyType.decode(body) as [bigint, bigint[], bigint[], bigint];
  return {
    network: BigInt(network),
    providers: providers.map((p) => BigInt(p)),
    assets: assets.map((a) => BigInt(a)),
    maxPrice: BigInt(maxPrice),
  };
}

type Common = MaybeSigner & { rekeyBack?: boolean; network: bigint | number };

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
export class InferencePluginSDK extends BaseSDK<InferencePluginClient> {

  constructor(params: NewContractSDKParams) {
    super({ factory: InferencePluginFactory, ...params });
  }

  private selector(name: string) {
    return [this.client.appClient.getABIMethod(name).getSelector()];
  }

  /** Opens a ticket from the wallet's spending account for one request; the call returns the ticket id. */
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
            maxPrice: BigInt(args.maxPrice),
            request: args.request,
          },
        });
        return [{ type: "methodCall", ...params }];
      },
    });
  }
}

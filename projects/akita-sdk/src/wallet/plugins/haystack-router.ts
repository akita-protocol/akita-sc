import { ReadableAddress } from "@algorandfoundation/algokit-utils/common";
import { BaseSDK } from "../../base";
import {
  HaystackRouterPluginArgs,
  HaystackRouterPluginClient,
  HaystackRouterPluginFactory,
} from "../../generated/HaystackRouterPluginClient";
import { MaybeSigner, NewContractSDKParams } from "../../types";
import { PluginHookParams, PluginSDKReturn } from "../../types";
import { getTxns } from "../utils";

type ContractArgs = HaystackRouterPluginArgs["obj"];

type SwapArgs = (
  Omit<ContractArgs["swap(uint64,bool,uint64,uint64,uint64,uint64)void"], "wallet" | "rekeyBack">
  & MaybeSigner
  & { rekeyBack?: boolean }
);

type ClaimArgs = (
  Omit<ContractArgs["claim(uint64,bool,address,address,uint64[],uint64,bool)void"], "wallet" | "rekeyBack">
  & MaybeSigner
  & { rekeyBack?: boolean }
);

export class HaystackRouterPluginSDK extends BaseSDK<HaystackRouterPluginClient> {
  constructor(params: NewContractSDKParams) {
    super({ factory: HaystackRouterPluginFactory, ...params });
  }

  swap(): PluginSDKReturn;
  swap(args: SwapArgs): PluginSDKReturn;
  swap(args?: SwapArgs): PluginSDKReturn {
    const methodName = "swap";

    if (args === undefined) {
      return (_spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns,
      });
    }

    const { sender, signer } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (_spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = args.rekeyBack ?? true;

        const params = await this.client.params.swap({
          ...sendParams,
          args: { wallet, rekeyBack, ...args },
        });

        return [{
          type: "methodCall",
          ...params,
        }];
      },
    });
  }

  claim(): PluginSDKReturn;
  claim(args: ClaimArgs): PluginSDKReturn;
  claim(args?: ClaimArgs): PluginSDKReturn {
    const methodName = "claim";

    if (args === undefined) {
      return (_spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns,
      });
    }

    const { sender, signer } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (_spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = args.rekeyBack ?? true;

        const params = await this.client.params.claim({
          ...sendParams,
          args: { wallet, rekeyBack, ...args },
        });

        return [{
          type: "methodCall",
          ...params,
        }];
      },
    });
  }
}

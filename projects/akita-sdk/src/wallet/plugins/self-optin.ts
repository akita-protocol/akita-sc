import { BaseSDK } from "../../base";
import { SelfOptInPluginArgs, SelfOptInPluginClient, SelfOptInPluginFactory } from "../../generated/SelfOptInPluginClient";
import { NewContractSDKParams, MaybeSigner } from "../../types";
import { PluginHookParams, PluginSDKReturn } from "../../types";
import { Address } from "algosdk";
import { getTxns } from "../utils";

type ContractArgs = SelfOptInPluginArgs["obj"];

type SelfOptInArgs = (
  Omit<ContractArgs['optIn(uint64,bool,uint64[])void'], 'wallet' | 'rekeyBack'>
  & MaybeSigner
  & { rekeyBack?: boolean }
);

export class SelfOptInPluginSDK extends BaseSDK<SelfOptInPluginClient> {

  constructor(params: NewContractSDKParams) {
    super({ factory: SelfOptInPluginFactory, ...params });
  }

  optIn(): PluginSDKReturn;
  optIn(args: SelfOptInArgs): PluginSDKReturn;
  optIn(args?: SelfOptInArgs): PluginSDKReturn {
    const methodName = 'optIn';
    if (args === undefined) {
      // Called without arguments - return selector for method restrictions
      return (spendingAddress?: Address | string) => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns
      });
    }

    const { sender, signer, assets } = args;

    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (spendingAddress?: Address | string) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {

        const rekeyBack = args.rekeyBack ?? true;

        // No MBR payment needed - the wallet covers its own MBR from its existing balance
        const params = (
          await this.client.params.optIn({
            ...sendParams,
            args: { wallet, ...args, rekeyBack },
          })
        )

        return [{
          type: 'methodCall',
          ...params
        }]
      }
    });
  }
}

import { ReadableAddress } from "@algorandfoundation/algokit-utils/common";
import { BaseSDK } from "../../base";
import { AsaManagerPluginArgs, AsaManagerPluginClient, AsaManagerPluginFactory } from "../../generated/AsaManagerPluginClient";
import { NewContractSDKParams, MaybeSigner } from "../../types";
import { PluginHookParams, PluginSDKReturn } from "../../types";
import algosdk from "algosdk";
import { microAlgo } from "@algorandfoundation/algokit-utils";
import { getTxns } from "../utils";

const assetCreateCost = 100_000

type CreateAssetParams = {
  assetName: string,
  unitName: string,
  total: bigint | number,
  decimals: bigint | number,
  manager: string,
  reserve: string,
  freeze: string,
  clawback: string,
  defaultFrozen: boolean,
  url: string,
}

type ContractArgs = AsaManagerPluginArgs["obj"];

type MintArgs = (
  Omit<ContractArgs['mint(uint64,bool,(string,string,uint64,uint64,address,address,address,address,bool,string)[],pay)uint64[]'], 'wallet' | 'rekeyBack' | 'assets' | 'mbrPayment'>
  & MaybeSigner
  & {
    rekeyBack?: boolean
    assets: CreateAssetParams[]
  }
);

type DeleteAssetsArgs = (
  Omit<ContractArgs['delete(uint64,bool,uint64[])void'], 'wallet' | 'rekeyBack' | 'assets'>
  & MaybeSigner
  & {
    rekeyBack?: boolean
    assets: bigint[] | number[]
  }
);

export class AsaManagerPluginSDK extends BaseSDK<AsaManagerPluginClient> {

  constructor(params: NewContractSDKParams) {
    super({ factory: AsaManagerPluginFactory, ...params });
  }

  mint(): PluginSDKReturn;
  mint(args: MintArgs): PluginSDKReturn;
  mint(args?: MintArgs): PluginSDKReturn {
    const methodName = 'mint';
    if (args === undefined) {
      // Called without arguments - return selector for method restrictions
      return (spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns
      });
    }

    const { sender, signer, assets } = args;

    const sendParams = this.getRequiredSendParams({ sender, signer });

    const opUpCount = Math.max(1, assets.length * 2);

    return (spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      opUpCount,
      getTxns: async ({ wallet }: PluginHookParams) => {

        const rekeyBack = args.rekeyBack ?? true;

        const mbrPayment = this.client.algorand.createTransaction.payment({
          ...sendParams,
          amount: microAlgo(assetCreateCost * assets.length),
          receiver: spendingAddress ? spendingAddress : algosdk.getApplicationAddress(wallet).toString(),
        })

        const assetsTuple = assets.map(asset => [
          asset.assetName,
          asset.unitName,
          asset.total,
          asset.decimals,
          asset.manager,
          asset.reserve,
          asset.freeze,
          asset.clawback,
          asset.defaultFrozen,
          asset.url,
        ] as [string, string, bigint | number, bigint | number, string, string, string, string, boolean, string])

        const params = (
          await this.client.params.mint({
            ...sendParams,
            args: { wallet, assets: assetsTuple, rekeyBack, mbrPayment },
          })
        )

        return [{
          type: 'methodCall',
          ...params
        }]
      }
    });
  }

  deleteAssets(): PluginSDKReturn;
  deleteAssets(args: DeleteAssetsArgs): PluginSDKReturn;
  deleteAssets(args?: DeleteAssetsArgs): PluginSDKReturn {
    const methodName = 'deleteAssets';
    if (args === undefined) {
      return (spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns
      });
    }

    const { sender, signer, assets } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = args.rekeyBack ?? true;
        const params = (
          await this.client.params.delete({
            ...sendParams,
            args: { wallet, assets, rekeyBack },
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

export { AsaManagerPluginSDK as AsaMintPluginSDK };

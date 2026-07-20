import { ReadableAddress } from "@algorandfoundation/algokit-utils/common";
import { BaseSDK } from "../../base";
import { RewardsPluginArgs, RewardsPluginClient, RewardsPluginFactory } from "../../generated/RewardsPluginClient";
import { NewContractSDKParams, MaybeSigner } from "../../types";
import { PluginHookParams, PluginSDKReturn } from "../../types";
import { Address } from "algosdk";
import { getTxns } from "../utils";

type ContractArgs = RewardsPluginArgs["obj"];

type ClaimRewardsArgs = Omit<ContractArgs["claimRewards(uint64,bool,(uint64,uint64)[])void"], "wallet" | "rekeyBack"> &
  MaybeSigner & { rekeyBack?: boolean };

type CreateDisbursementArgs = Omit<
  ContractArgs["createDisbursement(uint64,bool,string,uint64,uint64,string,uint64)uint64"],
  "wallet" | "rekeyBack"
> &
  MaybeSigner & { rekeyBack?: boolean };

type CreateAsaUserAllocationsArgs = Omit<
  ContractArgs["createAsaUserAllocations(uint64,bool,uint64,uint64,(address,uint64)[],uint64)void"],
  "wallet" | "rekeyBack"
> &
  MaybeSigner & { rekeyBack?: boolean };

type FinalizeDisbursementArgs = Omit<ContractArgs["finalizeDisbursement(uint64,bool,uint64)void"], "wallet" | "rekeyBack"> &
  MaybeSigner & { rekeyBack?: boolean };

export class RewardsPluginSDK extends BaseSDK<RewardsPluginClient> {
  constructor(params: NewContractSDKParams) {
    super({ factory: RewardsPluginFactory, ...params });
  }

  createDisbursement(): PluginSDKReturn;
  createDisbursement(args: CreateDisbursementArgs): PluginSDKReturn;
  createDisbursement(args?: CreateDisbursementArgs): PluginSDKReturn {
    const methodName = "createDisbursement";
    if (args === undefined) {
      return () => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns,
      });
    }

    const { sender, signer } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });

    return () => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = args.rekeyBack ?? true;
        const params = await this.client.params.createDisbursement({
          ...sendParams,
          args: { wallet, rekeyBack, ...args },
        });

        return [
          {
            type: "methodCall",
            ...params,
          },
        ];
      },
    });
  }

  createAsaUserAllocations(): PluginSDKReturn;
  createAsaUserAllocations(args: CreateAsaUserAllocationsArgs): PluginSDKReturn;
  createAsaUserAllocations(args?: CreateAsaUserAllocationsArgs): PluginSDKReturn {
    const methodName = "createAsaUserAllocations";
    if (args === undefined) {
      return () => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns,
      });
    }

    const { sender, signer } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });

    return () => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = args.rekeyBack ?? true;
        const params = await this.client.params.createAsaUserAllocations({
          ...sendParams,
          args: { wallet, rekeyBack, ...args },
        });

        return [
          {
            type: "methodCall",
            ...params,
          },
        ];
      },
    });
  }

  finalizeDisbursement(): PluginSDKReturn;
  finalizeDisbursement(args: FinalizeDisbursementArgs): PluginSDKReturn;
  finalizeDisbursement(args?: FinalizeDisbursementArgs): PluginSDKReturn {
    const methodName = "finalizeDisbursement";
    if (args === undefined) {
      return () => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns,
      });
    }

    const { sender, signer } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });

    return () => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = args.rekeyBack ?? true;
        const params = await this.client.params.finalizeDisbursement({
          ...sendParams,
          args: { wallet, rekeyBack, ...args },
        });

        return [
          {
            type: "methodCall",
            ...params,
          },
        ];
      },
    });
  }

  claimRewards(): PluginSDKReturn;
  claimRewards(args: ClaimRewardsArgs): PluginSDKReturn;
  claimRewards(args?: ClaimRewardsArgs): PluginSDKReturn {
    const methodName = "claimRewards";
    if (args === undefined) {
      return (spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns,
      });
    }

    const { sender, signer } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = args.rekeyBack ?? true;

        const params = await this.client.params.claimRewards({
          ...sendParams,
          args: { wallet, rekeyBack, ...args },
        });

        return [
          {
            type: "methodCall",
            ...params,
          },
        ];
      },
    });
  }
}

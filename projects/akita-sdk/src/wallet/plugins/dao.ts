import { ReadableAddress } from "@algorandfoundation/algokit-utils/common";
import { BaseSDK } from "../../base";
import { AkitaDaoPluginArgs, AkitaDaoPluginClient, AkitaDaoPluginFactory } from "../../generated/AkitaDAOPluginClient";
import { NewContractSDKParams, MaybeSigner } from "../../types";
import { PluginHookParams, PluginSDKReturn } from "../../types";
import { Address } from "algosdk";
import { microAlgo } from "@algorandfoundation/algokit-utils";
import { getTxns } from "../utils";
import { assertByteArrayLength, randomByteArray } from "../../utils";

type ContractArgs = AkitaDaoPluginArgs["obj"];

type SetupArgs = (
  Omit<ContractArgs['setup(uint64,bool,string,byte[32])void'], 'wallet' | 'rekeyBack' | 'salt'>
  & Partial<Pick<ContractArgs['setup(uint64,bool,string,byte[32])void'], 'salt'>>
  & MaybeSigner
  & { rekeyBack?: boolean }
);

type NewProposalArgs = (
  Omit<ContractArgs['newProposal(uint64,bool,byte[36],(uint8,byte[])[])uint64'], 'wallet' | 'rekeyBack'>
  & MaybeSigner
  & { rekeyBack?: boolean }
);

type VoteProposalArgs = (
  Omit<ContractArgs['voteProposal(uint64,bool,uint64,uint8)void'], 'wallet' | 'rekeyBack'>
  & MaybeSigner
  & { rekeyBack?: boolean }
);

type FinalizeProposalArgs = (
  Omit<ContractArgs['finalizeProposal(uint64,bool,uint64)void'], 'wallet' | 'rekeyBack'>
  & MaybeSigner
  & { rekeyBack?: boolean }
);

type ExecuteProposalArgs = (
  Omit<ContractArgs['executeProposal(uint64,bool,uint64)void'], 'wallet' | 'rekeyBack'>
  & MaybeSigner
  & { rekeyBack?: boolean }
);

export class DAOPluginSDK extends BaseSDK<AkitaDaoPluginClient> {

  constructor(params: NewContractSDKParams) {
    super({ factory: AkitaDaoPluginFactory, ...params });
  }

  setup(): PluginSDKReturn;
  setup(args: SetupArgs): PluginSDKReturn;
  setup(args?: SetupArgs): PluginSDKReturn {
    const methodName = 'setup';
    if (args === undefined) {
      return (spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns
      });
    }

    const { sender, signer } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const salt = args.salt ?? randomByteArray(32);
    assertByteArrayLength(salt, 'salt', 32);

    return (spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = args.rekeyBack ?? true;

        const params = await this.client.params.setup({
          ...sendParams,
          args: { wallet, rekeyBack, ...args, salt },
        });

        return [{
          type: 'methodCall',
          ...params
        }];
      }
    });
  }

  newProposal(): PluginSDKReturn;
  newProposal(args: NewProposalArgs): PluginSDKReturn;
  newProposal(args?: NewProposalArgs): PluginSDKReturn {
    const methodName = 'newProposal';
    if (args === undefined) {
      return (spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns
      });
    }

    const { sender, signer } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = args.rekeyBack ?? true;

        const params = await this.client.params.newProposal({
          ...sendParams,
          args: { wallet, rekeyBack, ...args },
        });

        return [{
          type: 'methodCall',
          ...params
        }];
      }
    });
  }

  voteProposal(): PluginSDKReturn;
  voteProposal(args: VoteProposalArgs): PluginSDKReturn;
  voteProposal(args?: VoteProposalArgs): PluginSDKReturn {
    const methodName = 'voteProposal';
    if (args === undefined) {
      return (spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns
      });
    }

    const { sender, signer } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = args.rekeyBack ?? true;

        const params = await this.client.params.voteProposal({
          ...sendParams,
          args: { wallet, rekeyBack, ...args },
        });

        return [{
          type: 'methodCall',
          ...params
        }];
      }
    });
  }

  finalizeProposal(): PluginSDKReturn;
  finalizeProposal(args: FinalizeProposalArgs): PluginSDKReturn;
  finalizeProposal(args?: FinalizeProposalArgs): PluginSDKReturn {
    const methodName = 'finalizeProposal';
    if (args === undefined) {
      return (spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns
      });
    }

    const { sender, signer } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = args.rekeyBack ?? true;

        const params = await this.client.params.finalizeProposal({
          ...sendParams,
          args: { wallet, rekeyBack, ...args },
        });

        return [{
          type: 'methodCall',
          ...params
        }];
      }
    });
  }

  executeProposal(): PluginSDKReturn;
  executeProposal(args: ExecuteProposalArgs): PluginSDKReturn;
  executeProposal(args?: ExecuteProposalArgs): PluginSDKReturn {
    const methodName = 'executeProposal';
    if (args === undefined) {
      return (spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns
      });
    }

    const { sender, signer } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = args.rekeyBack ?? true;

        const params = await this.client.params.executeProposal({
          ...sendParams,
          args: { wallet, rekeyBack, ...args },
        });

        return [{
          type: 'methodCall',
          ...params
        }];
      }
    });
  }
}

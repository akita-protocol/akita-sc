type ReadableAddress = string | import('algosdk').Address;
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

type EditProposalArgs = (
  Omit<ContractArgs['editProposal(uint64,bool,uint64,byte[36],(uint8,byte[])[])void'], 'wallet' | 'rekeyBack'>
  & MaybeSigner
  & { rekeyBack?: boolean }
);

type SubmitProposalArgs = (
  Omit<ContractArgs['submitProposal(uint64,bool,uint64)void'], 'wallet' | 'rekeyBack'>
  & MaybeSigner
  & { rekeyBack?: boolean }
);

type DeleteProposalArgs = (
  Omit<ContractArgs['deleteProposal(uint64,bool,uint64)void'], 'wallet' | 'rekeyBack'>
  & MaybeSigner
  & { rekeyBack?: boolean }
);

type CancelProposalArgs = (
  Omit<ContractArgs['cancelProposal(uint64,bool,uint64)void'], 'wallet' | 'rekeyBack'>
  & MaybeSigner
  & { rekeyBack?: boolean }
);

type SimpleMethod = 'editProposal' | 'submitProposal' | 'deleteProposal' | 'cancelProposal';

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

  /** Shared hook builder for the single-call DAO plugin methods. */
  private simpleHook(methodName: SimpleMethod, args?: (MaybeSigner & { rekeyBack?: boolean } & Record<string, unknown>)): PluginSDKReturn {
    if (args === undefined) {
      return (spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns
      });
    }

    const { sender, signer, rekeyBack: maybeRekeyBack, ...rest } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = maybeRekeyBack ?? true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const params = await (this.client.params[methodName] as any)({
          ...sendParams,
          args: { wallet, rekeyBack, ...rest },
        });
        return [{ type: 'methodCall', ...params }];
      }
    });
  }

  /** Edit one of this wallet's draft proposals (the plugin tops up or the DAO refunds the cost difference). */
  editProposal(): PluginSDKReturn;
  editProposal(args: EditProposalArgs): PluginSDKReturn;
  editProposal(args?: EditProposalArgs): PluginSDKReturn {
    return this.simpleHook('editProposal', args);
  }

  /** Submit one of this wallet's draft proposals to voting. */
  submitProposal(): PluginSDKReturn;
  submitProposal(args: SubmitProposalArgs): PluginSDKReturn;
  submitProposal(args?: SubmitProposalArgs): PluginSDKReturn {
    return this.simpleHook('submitProposal', args);
  }

  /** Delete one of this wallet's proposals; the released prepayment returns to the wallet. */
  deleteProposal(): PluginSDKReturn;
  deleteProposal(args: DeleteProposalArgs): PluginSDKReturn;
  deleteProposal(args?: DeleteProposalArgs): PluginSDKReturn {
    return this.simpleHook('deleteProposal', args);
  }

  /** Abandon one of this wallet's approved, unexecuted proposals. */
  cancelProposal(): PluginSDKReturn;
  cancelProposal(args: CancelProposalArgs): PluginSDKReturn;
  cancelProposal(args?: CancelProposalArgs): PluginSDKReturn {
    return this.simpleHook('cancelProposal', args);
  }
}

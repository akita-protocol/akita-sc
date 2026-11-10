type ReadableAddress = string | import('algosdk').Address;
import { BaseSDK } from "../../base";
import { StakingPluginArgs, StakingPluginClient, StakingPluginFactory } from "../../generated/StakingPluginClient";
import { NewContractSDKParams, MaybeSigner } from "../../types";
import { PluginHookParams, PluginSDKReturn } from "../../types";
import { getTxns } from "../utils";

type ContractArgs = StakingPluginArgs["obj"];

type StakeArgs = (
  Omit<ContractArgs['stake(uint64,bool,uint64,uint8,uint64,uint64,bool)void'], 'wallet' | 'rekeyBack'>
  & MaybeSigner
  & { rekeyBack?: boolean }
);

type WithdrawArgs = (
  Omit<ContractArgs['withdraw(uint64,bool,uint64,uint8)void'], 'wallet' | 'rekeyBack'>
  & MaybeSigner
  & { rekeyBack?: boolean }
);

type CreateHeartbeatArgs = (
  Omit<ContractArgs['createHeartbeat(uint64,bool,address,uint64)void'], 'wallet' | 'rekeyBack'>
  & MaybeSigner
  & { rekeyBack?: boolean }
);

export type SoftStakeKey = {
  address: string;
  asset: bigint | number;
};

export type AppSoftStakeKey = SoftStakeKey & {
  app: bigint | number;
};

type CheckpointSoftStakeArgs = (
  Omit<ContractArgs['checkpointSoftStake(uint64,bool,(address,uint64)[])(bool,uint64)[]'], 'wallet' | 'rekeyBack' | 'stakeKeys'>
  & MaybeSigner
  & {
    rekeyBack?: boolean;
    stakeKeys: SoftStakeKey[];
  }
);

type CheckpointAppSoftStakeArgs = (
  Omit<ContractArgs['checkpointAppSoftStake(uint64,bool,(uint64,address,uint64)[])(bool,uint64)[]'], 'wallet' | 'rekeyBack' | 'appStakeKeys'>
  & MaybeSigner
  & {
    rekeyBack?: boolean;
    appStakeKeys: AppSoftStakeKey[];
  }
);

type UpdateSettingsArgs = (
  Omit<ContractArgs['updateSettings(uint64,bool,uint64,uint64)void'], 'wallet' | 'rekeyBack'>
  & MaybeSigner
  & { rekeyBack?: boolean }
);

type SetHeartbeatManagerArgs = (
  Omit<ContractArgs['setHeartbeatManager(uint64,bool,address)void'], 'wallet' | 'rekeyBack'>
  & MaybeSigner
  & { rekeyBack?: boolean }
);

type CloseStakeArgs = (
  Omit<ContractArgs['closeSoftStake(uint64,bool,uint64)void'], 'wallet' | 'rekeyBack'>
  & MaybeSigner
  & { rekeyBack?: boolean }
);

type ReleaseAppStakeArgs = (
  Omit<ContractArgs['releaseAppStake(uint64,bool,uint64,uint64)void'], 'wallet' | 'rekeyBack'>
  & MaybeSigner
  & { rekeyBack?: boolean }
);

export class StakingPluginSDK extends BaseSDK<StakingPluginClient> {

  constructor(params: NewContractSDKParams) {
    super({ factory: StakingPluginFactory, ...params });
  }

  stake(): PluginSDKReturn;
  stake(args: StakeArgs): PluginSDKReturn;
  stake(args?: StakeArgs): PluginSDKReturn {
    const methodName = 'stake';
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

        const params = await this.client.params.stake({
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

  withdraw(): PluginSDKReturn;
  withdraw(args: WithdrawArgs): PluginSDKReturn;
  withdraw(args?: WithdrawArgs): PluginSDKReturn {
    const methodName = 'withdraw';
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

        const params = await this.client.params.withdraw({
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

  createHeartbeat(): PluginSDKReturn;
  createHeartbeat(args: CreateHeartbeatArgs): PluginSDKReturn;
  createHeartbeat(args?: CreateHeartbeatArgs): PluginSDKReturn {
    const methodName = 'createHeartbeat';
    if (args === undefined) {
      return (spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns
      });
    }

    const { sender, signer, address, asset } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = args.rekeyBack ?? true;

        const params = await this.client.params.createHeartbeat({
          ...sendParams,
          args: { wallet, rekeyBack, address, asset },
        });

        return [{
          type: 'methodCall',
          ...params
        }];
      }
    });
  }

  checkpointSoftStake(): PluginSDKReturn;
  checkpointSoftStake(args: CheckpointSoftStakeArgs): PluginSDKReturn;
  checkpointSoftStake(args?: CheckpointSoftStakeArgs): PluginSDKReturn {
    const methodName = 'checkpointSoftStake';
    if (args === undefined) {
      return (spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns
      });
    }

    const { sender, signer, stakeKeys } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = args.rekeyBack ?? true;
        const formattedStakeKeys: [string, bigint | number][] = stakeKeys.map(({ address, asset }) => [
          address,
          asset,
        ]);

        const params = await this.client.params.checkpointSoftStake({
          ...sendParams,
          args: { wallet, rekeyBack, stakeKeys: formattedStakeKeys },
        });

        return [{
          type: 'methodCall',
          ...params
        }];
      }
    });
  }

  checkpointAppSoftStake(): PluginSDKReturn;
  checkpointAppSoftStake(args: CheckpointAppSoftStakeArgs): PluginSDKReturn;
  checkpointAppSoftStake(args?: CheckpointAppSoftStakeArgs): PluginSDKReturn {
    const methodName = 'checkpointAppSoftStake';
    if (args === undefined) {
      return (spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns
      });
    }

    const { sender, signer, appStakeKeys } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = args.rekeyBack ?? true;
        const formattedAppStakeKeys: [bigint | number, string, bigint | number][] = appStakeKeys.map(({
          app,
          address,
          asset,
        }) => [app, address, asset]);

        const params = await this.client.params.checkpointAppSoftStake({
          ...sendParams,
          args: { wallet, rekeyBack, appStakeKeys: formattedAppStakeKeys },
        });

        return [{
          type: 'methodCall',
          ...params
        }];
      }
    });
  }

  updateSettings(): PluginSDKReturn;
  updateSettings(args: UpdateSettingsArgs): PluginSDKReturn;
  updateSettings(args?: UpdateSettingsArgs): PluginSDKReturn {
    const methodName = 'updateSettings';
    if (args === undefined) {
      return (spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns
      });
    }

    const { sender, signer, asset, value } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = args.rekeyBack ?? true;

        const params = await this.client.params.updateSettings({
          ...sendParams,
          args: { wallet, rekeyBack, asset, value },
        });

        return [{
          type: 'methodCall',
          ...params
        }];
      }
    });
  }

  setHeartbeatManager(): PluginSDKReturn;
  setHeartbeatManager(args: SetHeartbeatManagerArgs): PluginSDKReturn;
  setHeartbeatManager(args?: SetHeartbeatManagerArgs): PluginSDKReturn {
    return this.simpleHook('setHeartbeatManager', args, (wallet, rekeyBack, a) =>
      this.client.params.setHeartbeatManager({
        ...this.getRequiredSendParams({ sender: a.sender, signer: a.signer }),
        args: { wallet, rekeyBack, manager: a.manager },
      }));
  }

  closeSoftStake(): PluginSDKReturn;
  closeSoftStake(args: CloseStakeArgs): PluginSDKReturn;
  closeSoftStake(args?: CloseStakeArgs): PluginSDKReturn {
    return this.simpleHook('closeSoftStake', args, (wallet, rekeyBack, a) =>
      this.client.params.closeSoftStake({
        ...this.getRequiredSendParams({ sender: a.sender, signer: a.signer }),
        args: { wallet, rekeyBack, asset: a.asset },
      }));
  }

  closeHeartbeat(): PluginSDKReturn;
  closeHeartbeat(args: CloseStakeArgs): PluginSDKReturn;
  closeHeartbeat(args?: CloseStakeArgs): PluginSDKReturn {
    return this.simpleHook('closeHeartbeat', args, (wallet, rekeyBack, a) =>
      this.client.params.closeHeartbeat({
        ...this.getRequiredSendParams({ sender: a.sender, signer: a.signer }),
        args: { wallet, rekeyBack, asset: a.asset },
      }));
  }

  releaseAppStake(): PluginSDKReturn;
  releaseAppStake(args: ReleaseAppStakeArgs): PluginSDKReturn;
  releaseAppStake(args?: ReleaseAppStakeArgs): PluginSDKReturn {
    return this.simpleHook('releaseAppStake', args, (wallet, rekeyBack, a) =>
      this.client.params.releaseAppStake({
        ...this.getRequiredSendParams({ sender: a.sender, signer: a.signer }),
        args: { wallet, rekeyBack, app: a.app, asset: a.asset },
      }));
  }

  /** Shared hook shape for single-call plugin methods. */
  private simpleHook<A extends MaybeSigner & { rekeyBack?: boolean }>(
    methodName: string,
    args: A | undefined,
    build: (wallet: bigint, rekeyBack: boolean, args: A) => Promise<any>,
  ): PluginSDKReturn {
    const selectors = [this.client.appClient.getABIMethod(methodName).getSelector()];
    if (args === undefined) {
      return (spendingAddress?: ReadableAddress) => ({ appId: this.client.appId, selectors, getTxns });
    }

    return (spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors,
      getTxns: async ({ wallet }: PluginHookParams) => {
        const params = await build(wallet, args.rekeyBack ?? true, args);
        return [{ type: 'methodCall', ...params }];
      }
    });
  }
}

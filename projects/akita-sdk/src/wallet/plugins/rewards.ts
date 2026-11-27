type ReadableAddress = string | import('algosdk').Address;
import { BaseSDK } from "../../base";
import { RewardsPluginArgs, RewardsPluginClient, RewardsPluginFactory } from "../../generated/RewardsPluginClient";
import { NewContractSDKParams, MaybeSigner } from "../../types";
import { PluginHookParams, PluginSDKReturn } from "../../types";
import { Address } from "algosdk";
import { getTxns } from "../utils";

type ContractArgs = RewardsPluginArgs["obj"];

type ClaimRewardsArgs = Omit<ContractArgs["claimRewards(uint64,bool,(uint64,uint64)[])void"], "wallet" | "rekeyBack"> &
  MaybeSigner & { rekeyBack?: boolean };

type ClaimLegacyRewardsArgs = Omit<ContractArgs["claimLegacyRewards(uint64,bool,(uint64,uint64)[])void"], "wallet" | "rekeyBack"> &
  MaybeSigner & { rekeyBack?: boolean };

type ReclaimRewardsArgs = Omit<ContractArgs["reclaimRewards(uint64,bool,uint64,(address,uint64)[])void"], "wallet" | "rekeyBack"> &
  MaybeSigner & { rekeyBack?: boolean };

type ReclaimLegacyRewardsArgs = Omit<ContractArgs["reclaimLegacyRewards(uint64,bool,uint64,(address,uint64)[])void"], "wallet" | "rekeyBack"> &
  MaybeSigner & { rekeyBack?: boolean };

type InboxAssetArgs = { asset: bigint | number } & MaybeSigner & { rekeyBack?: boolean };
type InboxAlgoArgs = MaybeSigner & { rekeyBack?: boolean };
type WalletCallMethod = "claimLegacyRewards" | "reclaimRewards" | "reclaimLegacyRewards";

const CREATE_DISBURSEMENT = "createDisbursement(uint64,bool,string,uint64,uint64,string,uint64,address)uint64";
const LEGACY_CREATE_DISBURSEMENT = "createDisbursement(uint64,bool,string,uint64,uint64,string,uint64)uint64";

type CreateDisbursementArgs = Omit<ContractArgs[typeof LEGACY_CREATE_DISBURSEMENT], "wallet" | "rekeyBack"> &
  MaybeSigner & {
    rekeyBack?: boolean;
    /** Where anyone may sweep what is unclaimed after `expiration` (omit for none, the legacy selector) */
    reclaimTo?: string;
  };

type CreateUserAllocationsArgs = Omit<
  ContractArgs["createUserAllocations(uint64,bool,uint64,(address,uint64)[],uint64)void"],
  "wallet" | "rekeyBack" | "sum"
> &
  MaybeSigner & { rekeyBack?: boolean };

type CreateAsaUserAllocationsArgs = Omit<
  ContractArgs["createAsaUserAllocations(uint64,bool,uint64,uint64,(address,uint64)[],uint64)void"],
  "wallet" | "rekeyBack"
> &
  MaybeSigner & { rekeyBack?: boolean };

type FinalizeDisbursementArgs = Omit<ContractArgs["finalizeDisbursement(uint64,bool,uint64)void"], "wallet" | "rekeyBack"> &
  MaybeSigner & { rekeyBack?: boolean };

type CreateInstantDisbursementArgs = Omit<
  ContractArgs["createInstantDisbursement(uint64,bool,uint64,uint64,(address,uint64)[],uint64)uint64"],
  "wallet" | "rekeyBack" | "sum"
> &
  MaybeSigner & { rekeyBack?: boolean };

type CreateInstantAsaDisbursementArgs = Omit<
  ContractArgs["createInstantAsaDisbursement(uint64,bool,uint64,uint64,uint64,(address,uint64)[],uint64)uint64"],
  "wallet" | "rekeyBack" | "sum"
> &
  MaybeSigner & { rekeyBack?: boolean };

type WithdrawMbrCreditsArgs = Omit<
  ContractArgs["withdrawMbrCredits(uint64,bool,uint64,uint64,uint64)void"],
  "wallet" | "rekeyBack"
> &
  MaybeSigner & { rekeyBack?: boolean };

type EditDisbursementArgs = Omit<
  ContractArgs["editDisbursement(uint64,bool,uint64,string,uint64,uint64,string)void"],
  "wallet" | "rekeyBack"
> &
  MaybeSigner & { rekeyBack?: boolean };

type CloseDisbursementArgs = Omit<
  ContractArgs["closeDisbursement(uint64,bool,uint64,uint64)void"],
  "wallet" | "rekeyBack"
> &
  MaybeSigner & { rekeyBack?: boolean };

export class RewardsPluginSDK extends BaseSDK<RewardsPluginClient> {
  constructor(params: NewContractSDKParams) {
    super({ factory: RewardsPluginFactory, ...params });
  }

  createDisbursement(): PluginSDKReturn;
  createDisbursement(args: CreateDisbursementArgs): PluginSDKReturn;
  /** Without args, the selectors of both overloads, so one grant covers callers with and without `reclaimTo`. */
  createDisbursement(args?: CreateDisbursementArgs): PluginSDKReturn {
    const selector = (signature: string) => this.client.appClient.getABIMethod(signature).getSelector();
    if (args === undefined) {
      return () => ({
        appId: this.client.appId,
        selectors: [selector(CREATE_DISBURSEMENT), selector(LEGACY_CREATE_DISBURSEMENT)],
        getTxns,
      });
    }

    const { sender, signer, reclaimTo, ...rest } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });

    return () => ({
      appId: this.client.appId,
      selectors: [selector(reclaimTo === undefined ? LEGACY_CREATE_DISBURSEMENT : CREATE_DISBURSEMENT)],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = args.rekeyBack ?? true;
        const params = reclaimTo === undefined
          ? await this.client.params.createDisbursementUint64BoolStringUint64Uint64StringUint64Uint64({
            ...sendParams,
            args: { ...rest, wallet, rekeyBack },
          })
          : await this.client.params.createDisbursementUint64BoolStringUint64Uint64StringUint64AddressUint64({
            ...sendParams,
            args: { ...rest, wallet, rekeyBack, reclaimTo },
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

  /** ALGO allocations for a draft disbursement; the wallet pays their sum. */
  createUserAllocations(): PluginSDKReturn;
  createUserAllocations(args: CreateUserAllocationsArgs): PluginSDKReturn;
  createUserAllocations(args?: CreateUserAllocationsArgs): PluginSDKReturn {
    const methodName = "createUserAllocations";
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
        const sum = args.allocations.reduce((total, [, amount]) => total + BigInt(amount), 0n);
        const params = await this.client.params.createUserAllocations({
          ...sendParams,
          args: { wallet, rekeyBack, ...args, sum },
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

  createInstantDisbursement(): PluginSDKReturn;
  createInstantDisbursement(args: CreateInstantDisbursementArgs): PluginSDKReturn;
  createInstantDisbursement(args?: CreateInstantDisbursementArgs): PluginSDKReturn {
    const methodName = "createInstantDisbursement";
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
        const sum = args.allocations.reduce((total, [, amount]) => total + BigInt(amount), 0n);
        const params = await this.client.params.createInstantDisbursement({
          ...sendParams,
          args: { wallet, rekeyBack, ...args, sum },
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

  createInstantAsaDisbursement(): PluginSDKReturn;
  createInstantAsaDisbursement(args: CreateInstantAsaDisbursementArgs): PluginSDKReturn;
  createInstantAsaDisbursement(args?: CreateInstantAsaDisbursementArgs): PluginSDKReturn {
    const methodName = "createInstantAsaDisbursement";
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
        const sum = args.allocations.reduce((total, [, amount]) => total + BigInt(amount), 0n);
        const params = await this.client.params.createInstantAsaDisbursement({
          ...sendParams,
          args: { wallet, rekeyBack, ...args, sum },
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

  /** Claims allocations held by the legacy (v1) Rewards app the plugin was created with. */
  claimLegacyRewards(): PluginSDKReturn;
  claimLegacyRewards(args: ClaimLegacyRewardsArgs): PluginSDKReturn;
  claimLegacyRewards(args?: ClaimLegacyRewardsArgs): PluginSDKReturn {
    return this.walletCall("claimLegacyRewards", args);
  }

  /**
   * Claims from the deployment a `getDisbursementsAcrossDeployments` result came from: the registry's
   * Rewards app through `claimRewards`, the legacy one through `claimLegacyRewards`.
   */
  claimRewardsFrom({ legacy }: { legacy: boolean }, args: ClaimRewardsArgs): PluginSDKReturn {
    return legacy ? this.claimLegacyRewards(args) : this.claimRewards(args);
  }

  /** Reclaims expired allocations of a disbursement the wallet created on the registry's Rewards app. */
  reclaimRewards(): PluginSDKReturn;
  reclaimRewards(args: ReclaimRewardsArgs): PluginSDKReturn;
  reclaimRewards(args?: ReclaimRewardsArgs): PluginSDKReturn {
    return this.walletCall("reclaimRewards", args);
  }

  /** Reclaims expired allocations of a disbursement the wallet created on the legacy (v1) Rewards app. */
  reclaimLegacyRewards(): PluginSDKReturn;
  reclaimLegacyRewards(args: ReclaimLegacyRewardsArgs): PluginSDKReturn;
  reclaimLegacyRewards(args?: ReclaimLegacyRewardsArgs): PluginSDKReturn {
    return this.walletCall("reclaimLegacyRewards", args);
  }

  private walletCall(
    methodName: WalletCallMethod,
    args?: ClaimLegacyRewardsArgs | ReclaimRewardsArgs | ReclaimLegacyRewardsArgs,
  ): PluginSDKReturn {
    const selectors = [this.client.appClient.getABIMethod(methodName).getSelector()];
    if (args === undefined) {
      return () => ({ appId: this.client.appId, selectors, getTxns });
    }

    const sendParams = this.getRequiredSendParams({ sender: args.sender, signer: args.signer });

    return () => ({
      appId: this.client.appId,
      selectors,
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = args.rekeyBack ?? true;
        const params = await (this.client.params[methodName] as (p: unknown) => ReturnType<RewardsPluginClient['params']['claimRewards']>)({
          ...sendParams,
          args: { wallet, rekeyBack, ...args },
        });

        return [{ type: "methodCall", ...params }];
      },
    });
  }

  /**
   * Withdraws the wallet's unused MBR credits of a disbursement it created. `rewardsApp` must be the
   * registry's Rewards app or the legacy one the plugin was created with.
   */
  withdrawMbrCredits(): PluginSDKReturn;
  withdrawMbrCredits(args: WithdrawMbrCreditsArgs): PluginSDKReturn;
  withdrawMbrCredits(args?: WithdrawMbrCreditsArgs): PluginSDKReturn {
    const methodName = "withdrawMbrCredits";
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
        const params = await this.client.params.withdrawMbrCredits({
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

  /**
   * Changes the title, unlock time, expiration and note of a disbursement the wallet created. It
   * never changes the allocations, the asset or the reclaim target.
   */
  editDisbursement(): PluginSDKReturn;
  editDisbursement(args: EditDisbursementArgs): PluginSDKReturn;
  editDisbursement(args?: EditDisbursementArgs): PluginSDKReturn {
    const methodName = "editDisbursement";
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
        const params = await this.client.params.editDisbursement({
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

  /**
   * Deletes an empty disbursement the wallet created and refunds its box MBR and credits. The legacy
   * (v1) Rewards app has no `closeDisbursement`; use `withdrawMbrCredits` there.
   */
  closeDisbursement(): PluginSDKReturn;
  closeDisbursement(args: CloseDisbursementArgs): PluginSDKReturn;
  closeDisbursement(args?: CloseDisbursementArgs): PluginSDKReturn {
    const methodName = "closeDisbursement";
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
        const params = await this.client.params.closeDisbursement({
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

  // ARC-59 ASA INBOX ---------------------------------------------------------------------------------

  /** Claim an ASA from the wallet's ARC-59 inbox, opting the spending account in first when needed */
  claimInbox(): PluginSDKReturn;
  claimInbox(args: InboxAssetArgs): PluginSDKReturn;
  claimInbox(args?: InboxAssetArgs): PluginSDKReturn {
    return this.inboxCall("claimInbox", args);
  }

  /** Reject an ASA in the wallet's ARC-59 inbox, returning it to the asset creator */
  rejectInbox(): PluginSDKReturn;
  rejectInbox(args: InboxAssetArgs): PluginSDKReturn;
  rejectInbox(args?: InboxAssetArgs): PluginSDKReturn {
    return this.inboxCall("rejectInbox", args);
  }

  /** Recover ALGO above the wallet inbox's minimum balance (before claimInbox, per ARC-59) */
  claimInboxAlgo(): PluginSDKReturn;
  claimInboxAlgo(args: InboxAlgoArgs): PluginSDKReturn;
  claimInboxAlgo(args?: InboxAlgoArgs): PluginSDKReturn {
    return this.inboxCall("claimInboxAlgo", args);
  }

  private inboxCall(
    methodName: "claimInbox" | "rejectInbox" | "claimInboxAlgo",
    args?: InboxAssetArgs | InboxAlgoArgs,
  ): PluginSDKReturn {
    const selectors = [this.client.appClient.getABIMethod(methodName).getSelector()];
    if (args === undefined) {
      return () => ({ appId: this.client.appId, selectors, getTxns });
    }

    const sendParams = this.getRequiredSendParams({ sender: args.sender, signer: args.signer });

    return () => ({
      appId: this.client.appId,
      selectors,
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = args.rekeyBack ?? true;
        const params =
          methodName === "claimInboxAlgo"
            ? await this.client.params.claimInboxAlgo({ ...sendParams, args: { wallet, rekeyBack } })
            : await this.client.params[methodName]({
                ...sendParams,
                args: { wallet, rekeyBack, asset: (args as InboxAssetArgs).asset },
              });
        return [{ type: "methodCall", ...params }];
      },
    });
  }
}

import { ReadableAddress } from "@algorandfoundation/algokit-utils/common";
import { ReceiveEscrow, RevenueManagerPluginArgs, RevenueManagerPluginClient, RevenueManagerPluginFactory, SplitRef } from "../../generated/RevenueManagerPluginClient"
import { BaseSDK } from "../../base";
import { MaybeSigner, NewContractSDKParams, PluginHookParams, PluginSDKReturn } from "../../types";
import algosdk, { Address } from "algosdk";
import { getTxns } from "../utils";
import { microAlgo } from "@algorandfoundation/algokit-utils";

const assetOptInCost = 100_000 // This is the cost for asset opt-in, adjust as necessary

type ContractArgs = RevenueManagerPluginArgs["obj"];

type OptInContractArgs = (
  Omit<ContractArgs['optIn(uint64,bool,uint64[],pay)void'], 'wallet' | 'rekeyBack' | 'mbrPayment'>
  & MaybeSigner
  & { rekeyBack?: boolean }
);

type NewReceiveEscrowContractArgs = (
  Omit<ContractArgs['newReceiveEscrow(uint64,bool,string,address,bool,bool,((uint64,string),uint8,uint64)[])void'], 'wallet' | 'rekeyBack'>
  & MaybeSigner
  & { rekeyBack?: boolean }
)

type NewReceiveEscrowWithRefContractArgs = (
  Omit<ContractArgs['newReceiveEscrowWithRef(uint64,bool,string,address,bool,bool,(uint64,byte[]))void'], 'wallet' | 'rekeyBack'>
  & MaybeSigner
  & { rekeyBack?: boolean }
)

type MigrateReceiveEscrowContractArgs = MaybeSigner & {
  rekeyBack?: boolean
  escrow: string
  receiveEscrow: ReceiveEscrow
  /** Exact non-zero ASA identities represented by receiveEscrow.optinCount. */
  assets: bigint[]
  splits: [[bigint | number, string], bigint | number, bigint | number][]
  splitRef: SplitRef
  useSplitRef: boolean
}

type ExistingMethodCallParams = Parameters<RevenueManagerPluginClient['params']['newReceiveEscrow']>[0]
type ExistingMethodParams = Awaited<ReturnType<RevenueManagerPluginClient['params']['newReceiveEscrow']>>
type MigrateReceiveEscrowCallParams = Omit<ExistingMethodCallParams, 'args'> & {
  args: {
    wallet: bigint
    rekeyBack: boolean
    escrow: string
    receiveEscrow: ReceiveEscrow
    assets: bigint[]
    splits: MigrateReceiveEscrowContractArgs['splits']
    splitRef: SplitRef
    useSplitRef: boolean
  }
}

type StartEscrowDisbursementContractArgs = (
  Omit<ContractArgs['startEscrowDisbursement(uint64,bool)void'], 'wallet' | 'rekeyBack'>
  & MaybeSigner
  & { rekeyBack?: boolean }
)

type ProcessEscrowAllocationContractArgs = (
  Omit<ContractArgs['processEscrowAllocation(uint64,bool,uint64[])void'], 'wallet' | 'rekeyBack'>
  & MaybeSigner
  & { rekeyBack?: boolean }
  & { ids: bigint[] }
)

type FinalizeEscrowDisbursementContractArgs = (
  Omit<ContractArgs['finalizeEscrowDisbursement(uint64,bool,uint64[])void'], 'wallet' | 'rekeyBack'>
  & MaybeSigner
  & { rekeyBack?: boolean }
  & { ids: bigint[] }
)

export class RevenueManagerPluginSDK extends BaseSDK<RevenueManagerPluginClient> {

  constructor(params: NewContractSDKParams) {
    super({ factory: RevenueManagerPluginFactory, ...params });
  }

  optIn(): PluginSDKReturn
  optIn(args: OptInContractArgs): PluginSDKReturn
  optIn(args?: OptInContractArgs): PluginSDKReturn {
    const methodName = 'optIn';
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

    return (spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {

        const rekeyBack = args.rekeyBack ?? true;

        const mbrPayment = this.client.algorand.createTransaction.payment({
          ...sendParams,
          amount: microAlgo(assetOptInCost * assets.length),
          receiver: spendingAddress ? spendingAddress : algosdk.getApplicationAddress(wallet).toString(),
        })

        const params = (
          await this.client.params.optIn({
            ...sendParams,
            args: { wallet, rekeyBack, assets, mbrPayment }
          })
        )

        return [{
          type: 'methodCall',
          ...params
        }]
      }
    });
  }

  newReceiveEscrow(): PluginSDKReturn
  newReceiveEscrow(args: NewReceiveEscrowContractArgs): PluginSDKReturn
  newReceiveEscrow(args?: NewReceiveEscrowContractArgs): PluginSDKReturn {
    const methodName = 'newReceiveEscrow';
    if (args === undefined) {
      // Called without arguments - return selector for method restrictions
      return (spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns
      });
    }

    const { sender, signer, escrow, source, allocatable, optinAllowed, splits } = args;

    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = args.rekeyBack ?? true;

        const params = (
          await this.client.params.newReceiveEscrow({
            ...sendParams,
            args: { wallet, rekeyBack, escrow, source, allocatable, optinAllowed, splits }
          })
        )

        return [{
          type: 'methodCall',
          ...params
        }]
      }
    });
  }

  newReceiveEscrowWithRef(): PluginSDKReturn
  newReceiveEscrowWithRef(args: NewReceiveEscrowWithRefContractArgs): PluginSDKReturn
  newReceiveEscrowWithRef(args?: NewReceiveEscrowWithRefContractArgs): PluginSDKReturn {
    const methodName = 'newReceiveEscrowWithRef';
    if (args === undefined) {
      // Called without arguments - return selector for method restrictions
      return (spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns
      });
    }

    const { sender, signer, escrow, source, allocatable, optinAllowed, splitRef } = args;

    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = args.rekeyBack ?? true;

        const params = (
          await this.client.params.newReceiveEscrowWithRef({
            ...sendParams,
            args: { wallet, rekeyBack, escrow, source, allocatable, optinAllowed, splitRef }
          })
        )

        return [{
          type: 'methodCall',
          ...params
        }]
      }
    });
  }

  migrateReceiveEscrow(): PluginSDKReturn
  migrateReceiveEscrow(args: MigrateReceiveEscrowContractArgs): PluginSDKReturn
  migrateReceiveEscrow(args?: MigrateReceiveEscrowContractArgs): PluginSDKReturn {
    const methodName = 'migrateReceiveEscrow'
    if (args === undefined) {
      return () => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns,
      })
    }

    const { sender, signer, escrow, receiveEscrow, assets, splits, splitRef, useSplitRef } = args
    const sendParams = this.getRequiredSendParams({ sender, signer })

    return () => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = args.rekeyBack ?? true
        const params = await (
          this.client.params as unknown as {
            migrateReceiveEscrow(params: MigrateReceiveEscrowCallParams): Promise<ExistingMethodParams>
          }
        ).migrateReceiveEscrow({
          ...sendParams,
          args: { wallet, rekeyBack, escrow, receiveEscrow, assets, splits, splitRef, useSplitRef },
        })

        return [{ type: 'methodCall', ...params }]
      },
    })
  }


  startEscrowDisbursement(): PluginSDKReturn
  startEscrowDisbursement(args: StartEscrowDisbursementContractArgs): PluginSDKReturn
  startEscrowDisbursement(args?: StartEscrowDisbursementContractArgs): PluginSDKReturn {
    const methodName = 'startEscrowDisbursement';
    if (args === undefined) {
      // Called without arguments - return selector for method restrictions
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

        const params = (
          await this.client.params.startEscrowDisbursement({
            ...sendParams,
            args: { wallet, rekeyBack }
          })
        )

        return [{
          type: 'methodCall',
          ...params
        }]
      }
    });
  }

  processEscrowAllocation(): PluginSDKReturn
  processEscrowAllocation(args: ProcessEscrowAllocationContractArgs): PluginSDKReturn
  processEscrowAllocation(args?: ProcessEscrowAllocationContractArgs): PluginSDKReturn {
    const methodName = 'processEscrowAllocation';
    if (args === undefined) {
      // Called without arguments - return selector for method restrictions
      return (spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns
      });
    }

    const { sender, signer, ids } = args;

    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = args.rekeyBack ?? true;

        const params = (
          await this.client.params.processEscrowAllocation({
            ...sendParams,
            args: { wallet, rekeyBack, ids }
          })
        )

        return [{
          type: 'methodCall',
          ...params
        }]
      }
    });
  }

  finalizeEscrowDisbursement(): PluginSDKReturn
  finalizeEscrowDisbursement(args: FinalizeEscrowDisbursementContractArgs): PluginSDKReturn
  finalizeEscrowDisbursement(args?: FinalizeEscrowDisbursementContractArgs): PluginSDKReturn {
    const methodName = 'finalizeEscrowDisbursement';
    if (args === undefined) {
      // Called without arguments - return selector for method restrictions
      return (spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns
      });
    }

    const { sender, signer, ids } = args;

    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = args.rekeyBack ?? true;

        const params = (
          await this.client.params.finalizeEscrowDisbursement({
            ...sendParams,
            args: { wallet, rekeyBack, ids }
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

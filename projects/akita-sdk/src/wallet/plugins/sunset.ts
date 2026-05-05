import { ReadableAddress } from "@algorandfoundation/algokit-utils/common";
import { BaseSDK } from "../../base";
import { SunsetPluginArgs, SunsetPluginClient, SunsetPluginFactory } from "../../generated/SunsetPluginClient";
import { NewContractSDKParams, MaybeSigner } from "../../types";
import { PluginHookParams, PluginSDKReturn } from "../../types";
import { getTxns } from "../utils";

type ContractArgs = SunsetPluginArgs["obj"];

type DeleteArgs = (
  Omit<ContractArgs['delete(uint64,bool,uint64,address)void'], 'wallet' | 'rekeyBack'>
  & MaybeSigner
  & { rekeyBack?: boolean }
)

type DeleteBoxesArgs = (
  Omit<ContractArgs['deleteBoxes(uint64,bool,uint64,byte[][])void'], 'wallet' | 'rekeyBack'>
  & MaybeSigner
  & { rekeyBack?: boolean }
)

type CloseOutArgs = (
  Omit<ContractArgs['closeOut(uint64,bool,uint64,(address,uint64)[])void'], 'wallet' | 'rekeyBack' | 'closes'>
  & MaybeSigner
  & {
    rekeyBack?: boolean
    /**
     * Each entry closes one ASA out to a destination. The generated ABI
     * expects `(address, uint64)[]` tuples; this form accepts the named
     * object shape for ergonomics and serializes it below.
     */
    closes: { assetCloseTo: string; xferAsset: bigint | number }[]
  }
)

type DeleteAssetsArgs = (
  Omit<ContractArgs['deleteAssets(uint64,bool,uint64,uint64[])void'], 'wallet' | 'rekeyBack' | 'assets'>
  & MaybeSigner
  & {
    rekeyBack?: boolean
    /**
     * Accept both `bigint` and `number` for each ID; the SDK normalizes to
     * `bigint[]` to match the generated overload's narrower type.
     */
    assets: (bigint | number)[]
  }
)

/**
 * Plugin SDK for the `SunsetPlugin` — an ARC-58 plugin that forwards to a
 * {@link SunsetContract} so an abstracted-account wallet can tear down
 * contracts it controls (or is the `TMPL_SUNSET_CALLER` of). The plugin is
 * intentionally a thin wrapper: each method here mirrors one abimethod on
 * the target sunset contract, and each call results in an inner abiCall
 * whose `Txn.sender` is the wallet's spending account.
 *
 * Typical flow for a production sunset sweep:
 *   1. Update a DAO-owned contract in-place to `SunsetContract` bytecode via
 *      `UpdateAkitaDAOPluginSDK.updateApp` (with `TMPL_SUNSET_CALLER` pinned
 *      at compile time to the DAO wallet's controlled address).
 *   2. `deleteBoxes` to clear residual state (closeRemainderTo refuses to
 *      run while boxes remain).
 *   3. `closeOut` any ASA balances the sunsetted contract still holds.
 *   4. `deleteAssets` to destroy any ASAs whose manager is the app.
 *   5. `delete` to drain the app account to the destination escrow and
 *      execute the `DeleteApplication` OnComplete.
 */
export class SunsetPluginSDK extends BaseSDK<SunsetPluginClient> {

  constructor(params: NewContractSDKParams) {
    super({ factory: SunsetPluginFactory, ...params });
  }

  delete(): PluginSDKReturn;
  delete(args: DeleteArgs): PluginSDKReturn;
  delete(args?: DeleteArgs): PluginSDKReturn {
    const methodName = 'delete';
    if (args === undefined) {
      return (spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns,
      });
    }

    const { sender, signer, appId, closeRemainderTo } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = args.rekeyBack ?? true;

        const params = await this.client.params.delete({
          ...sendParams,
          args: { wallet, rekeyBack, appId, closeRemainderTo },
        });

        return [{
          type: 'methodCall',
          ...params,
        }];
      },
    });
  }

  deleteBoxes(): PluginSDKReturn;
  deleteBoxes(args: DeleteBoxesArgs): PluginSDKReturn;
  deleteBoxes(args?: DeleteBoxesArgs): PluginSDKReturn {
    const methodName = 'deleteBoxes';
    if (args === undefined) {
      return (spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns,
      });
    }

    const { sender, signer, appId, boxes } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = args.rekeyBack ?? true;

        const params = await this.client.params.deleteBoxes({
          ...sendParams,
          args: { wallet, rekeyBack, appId, boxes },
        });

        return [{
          type: 'methodCall',
          ...params,
        }];
      },
    });
  }

  closeOut(): PluginSDKReturn;
  closeOut(args: CloseOutArgs): PluginSDKReturn;
  closeOut(args?: CloseOutArgs): PluginSDKReturn {
    const methodName = 'closeOut';
    if (args === undefined) {
      return (spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns,
      });
    }

    const { sender, signer, appId, closes } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });

    // The generated ABI expects `(address, uint64)[]`; flatten the named
    // object form into that tuple layout here so callers don't have to.
    const closesTuples: [string, bigint | number][] = closes.map(
      (c) => [c.assetCloseTo, c.xferAsset],
    );

    return (spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = args.rekeyBack ?? true;

        const params = await this.client.params.closeOut({
          ...sendParams,
          args: { wallet, rekeyBack, appId, closes: closesTuples },
        });

        return [{
          type: 'methodCall',
          ...params,
        }];
      },
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
        getTxns,
      });
    }

    const { sender, signer, appId, assets } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });

    // Narrow to `bigint[]` so the generated overload picks the right signature
    // regardless of whether callers passed number[] or bigint[].
    const assetIds = assets.map((a) => BigInt(a));

    return (spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = args.rekeyBack ?? true;

        const params = await this.client.params.deleteAssets({
          ...sendParams,
          args: { wallet, rekeyBack, appId, assets: assetIds },
        });

        return [{
          type: 'methodCall',
          ...params,
        }];
      },
    });
  }
}

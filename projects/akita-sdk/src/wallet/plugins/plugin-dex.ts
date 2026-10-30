import { BaseSDK } from "../../base";
import { ENV_VAR_NAMES } from "../../config";
import { PluginDexPluginClient, PluginDexPluginFactory, PoolConfig } from "../../generated/PluginDexPluginClient";
import { ExternalSlotTuple, HookInstall, hookInstallTuple, orderPair } from "../../plugin-dex";
import { GroupReturn, MaybeSigner, NewContractSDKParams, PluginHookParams, PluginSDKReturn } from "../../types";
import { getTxns } from "../utils";

const EMPTY = new Uint8Array();
/** ARC-4 return log prefix */
const RETURN_PREFIX = "151f7c75";

type PluginArgs = MaybeSigner & { rekeyBack?: boolean };

export type PluginDexSwapArgs = PluginArgs & {
  poolId: bigint;
  assetIn: bigint;
  amountIn: bigint;
  /** floor on the output; pass `withSlippage(quote, bps)` */
  minAmountOut: bigint;
  data?: Uint8Array;
};

export type PluginDexSwapRouteArgs = PluginArgs & {
  route: bigint[];
  assetIn: bigint;
  /** the route's final asset (the wallet is opted in when needed) */
  assetOut: bigint;
  amountIn: bigint;
  minAmountOut: bigint;
  data?: Uint8Array;
};

export type PluginDexCreatePoolArgs = PluginArgs & {
  assetA: bigint;
  assetB: bigint;
  config: PoolConfig;
  hooks?: HookInstall[];
  externals?: ExternalSlotTuple[];
  /** µALGO sent to the Vault (it refunds the excess); see `PluginDexSDK.estimateCreatePoolPayment` */
  payment: bigint;
};

export type PluginDexAddLiquidityArgs = PluginArgs & {
  poolId: bigint;
  amountA: bigint;
  amountB: bigint;
  minLpOut?: bigint;
  data?: Uint8Array;
};

export type PluginDexRemoveLiquidityArgs = PluginArgs & {
  poolId: bigint;
  lpAmount: bigint;
  minAmountA?: bigint;
  minAmountB?: bigint;
  data?: Uint8Array;
};

export type PluginDexAddLiquidityCurveArgs = PluginArgs & {
  poolId: bigint;
  /** 0 opens a new position */
  positionId?: bigint;
  amountA: bigint;
  amountB: bigint;
  minShares?: bigint;
  curveArgs: Uint8Array;
  /** µALGO for boxes the curve may create (see `binAddMbr`); the excess is refunded */
  mbr: bigint;
  data?: Uint8Array;
};

export type PluginDexRemoveLiquidityCurveArgs = PluginArgs & {
  poolId: bigint;
  positionId: bigint;
  minAmountA?: bigint;
  minAmountB?: bigint;
  curveArgs: Uint8Array;
  data?: Uint8Array;
  /** Also delete the emptied position on the curve engine, refunding its MBR. Only valid when the remove empties every share. */
  closePosition?: boolean;
};

/**
 * ARC-58 wallet plugin for the PluginDex Vault: swaps, pool creation and liquidity from an Akita wallet,
 * through `wallet.usePlugin({ calls: [dexPlugin.swap({...})] })`. Every Vault call is sent as the wallet's
 * spending account, so pools, LP tokens, positions and swap output stay in the wallet.
 */
export class PluginDexPluginSDK extends BaseSDK<PluginDexPluginClient> {
  constructor(params: NewContractSDKParams) {
    super({ factory: PluginDexPluginFactory, ...params }, ENV_VAR_NAMES.PLUGIN_DEX_PLUGIN_APP_ID);
  }

  swap(): PluginSDKReturn;
  swap(args: PluginDexSwapArgs): PluginSDKReturn;
  swap(args?: PluginDexSwapArgs): PluginSDKReturn {
    return this.plugin("swap", args, (wallet, sendParams) => {
      const { rekeyBack = true, poolId, assetIn, amountIn, minAmountOut, data = EMPTY } = args!;
      return this.client.params.swap({ ...sendParams, args: { wallet, rekeyBack, poolId, assetIn, amountIn, minAmountOut, data } });
    });
  }

  swapRoute(): PluginSDKReturn;
  swapRoute(args: PluginDexSwapRouteArgs): PluginSDKReturn;
  swapRoute(args?: PluginDexSwapRouteArgs): PluginSDKReturn {
    return this.plugin("swapRoute", args, (wallet, sendParams) => {
      const { rekeyBack = true, route, assetIn, assetOut, amountIn, minAmountOut, data = EMPTY } = args!;
      return this.client.params.swapRoute({ ...sendParams, args: { wallet, rekeyBack, route, assetIn, assetOut, amountIn, minAmountOut, data } });
    });
  }

  /** Assets are put in Vault order (A < B); when that flips the caller's order, the launch fields flip with them */
  createPool(): PluginSDKReturn;
  createPool(args: PluginDexCreatePoolArgs): PluginSDKReturn;
  createPool(args?: PluginDexCreatePoolArgs): PluginSDKReturn {
    return this.plugin("createPool", args, (wallet, sendParams) => {
      const { rekeyBack = true, hooks = [], externals = [], payment } = args!;
      const { assetA, assetB, flipped } = orderPair(args!.assetA, args!.assetB);
      const config: PoolConfig = flipped
        ? { ...args!.config, virtualA: args!.config.virtualB, virtualB: args!.config.virtualA, quoteIsA: !args!.config.quoteIsA }
        : args!.config;
      return this.client.params.createPool({
        ...sendParams,
        args: { wallet, rekeyBack, assetA, assetB, config, hooks: hooks.map(hookInstallTuple), externals, payment },
      });
    });
  }

  addLiquidity(): PluginSDKReturn;
  addLiquidity(args: PluginDexAddLiquidityArgs): PluginSDKReturn;
  addLiquidity(args?: PluginDexAddLiquidityArgs): PluginSDKReturn {
    return this.plugin("addLiquidity", args, (wallet, sendParams) => {
      const { rekeyBack = true, poolId, amountA, amountB, minLpOut = 0n, data = EMPTY } = args!;
      return this.client.params.addLiquidity({ ...sendParams, args: { wallet, rekeyBack, poolId, amountA, amountB, minLpOut, data } });
    });
  }

  removeLiquidity(): PluginSDKReturn;
  removeLiquidity(args: PluginDexRemoveLiquidityArgs): PluginSDKReturn;
  removeLiquidity(args?: PluginDexRemoveLiquidityArgs): PluginSDKReturn {
    return this.plugin("removeLiquidity", args, (wallet, sendParams) => {
      const { rekeyBack = true, poolId, lpAmount, minAmountA = 0n, minAmountB = 0n, data = EMPTY } = args!;
      return this.client.params.removeLiquidity({ ...sendParams, args: { wallet, rekeyBack, poolId, lpAmount, minAmountA, minAmountB, data } });
    });
  }

  addLiquidityCurve(): PluginSDKReturn;
  addLiquidityCurve(args: PluginDexAddLiquidityCurveArgs): PluginSDKReturn;
  addLiquidityCurve(args?: PluginDexAddLiquidityCurveArgs): PluginSDKReturn {
    return this.plugin("addLiquidityCurve", args, (wallet, sendParams) => {
      const { rekeyBack = true, poolId, positionId = 0n, amountA, amountB, minShares = 0n, curveArgs, mbr, data = EMPTY } = args!;
      return this.client.params.addLiquidityCurve({
        ...sendParams,
        args: { wallet, rekeyBack, poolId, positionId, amountA, amountB, minShares, curveArgs, mbr, data },
      });
    });
  }

  removeLiquidityCurve(): PluginSDKReturn;
  removeLiquidityCurve(args: PluginDexRemoveLiquidityCurveArgs): PluginSDKReturn;
  removeLiquidityCurve(args?: PluginDexRemoveLiquidityCurveArgs): PluginSDKReturn {
    return this.plugin("removeLiquidityCurve", args, (wallet, sendParams) => {
      const { rekeyBack = true, poolId, positionId, minAmountA = 0n, minAmountB = 0n, curveArgs, data = EMPTY, closePosition = false } = args!;
      return this.client.params.removeLiquidityCurve({
        ...sendParams,
        args: { wallet, rekeyBack, poolId, positionId, minAmountA, minAmountB, curveArgs, data, closePosition },
      });
    });
  }

  /**
   * The ABI return of `methodName` in a `wallet.usePlugin` result. usePlugin does not decode plugin returns,
   * so this reads the plugin call's last log. Tuples decode to arrays (RemoveResult: [amountA, amountB]).
   */
  decodeReturn<T>(result: GroupReturn, methodName: string): T {
    // confirmations carry their own transaction; `transactions` is not filled by every algokit send path
    const confirmation = result.confirmations.find((c) => c.txn.txn.applicationCall?.appIndex === this.appId);
    const logs = confirmation?.logs ?? [];
    const log = logs[logs.length - 1];
    if (!log || Buffer.from(log.subarray(0, 4)).toString("hex") !== RETURN_PREFIX) {
      throw new Error(`No ${methodName} return in the plugin call`);
    }
    const type = this.client.appClient.getABIMethod(methodName).returns.type;
    if (typeof type === "string") throw new Error(`${methodName} returns nothing`);
    return type.decode(log.subarray(4)) as T;
  }

  /** Without args: the method's selector for a grant. With args: the call for `wallet.usePlugin`. */
  private plugin(
    methodName: string,
    args: PluginArgs | undefined,
    params: (wallet: bigint, sendParams: ReturnType<PluginDexPluginSDK["getRequiredSendParams"]>) => Promise<object>,
  ): PluginSDKReturn {
    const selectors = [this.client.appClient.getABIMethod(methodName).getSelector()];
    if (args === undefined) {
      return () => ({ appId: this.client.appId, selectors, getTxns });
    }
    const sendParams = this.getRequiredSendParams({ sender: args.sender, signer: args.signer });
    return () => ({
      appId: this.client.appId,
      selectors,
      getTxns: async ({ wallet }: PluginHookParams) => [{ type: "methodCall", ...(await params(wallet, sendParams)) }] as never,
    });
  }
}

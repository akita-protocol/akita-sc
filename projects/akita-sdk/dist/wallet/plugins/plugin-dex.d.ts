import { BaseSDK } from "../../base";
import { PluginDexPluginClient, PoolConfig } from "../../generated/PluginDexPluginClient";
import { ExternalSlotTuple, HookInstall } from "../../plugin-dex";
import { GroupReturn, MaybeSigner, NewContractSDKParams, PluginSDKReturn } from "../../types";
import type { ABIMethod } from "algosdk";
/**
 * The ABI return of plugin `appId`'s `method` in a `wallet.usePlugin` result. usePlugin does not decode
 * plugin returns, so this reads the plugin call's last log. Tuples decode to arrays.
 */
export declare function decodePluginReturn<T>(result: GroupReturn, appId: bigint, method: ABIMethod): T;
/** Every return of plugin `appId`'s `method` in a `wallet.usePlugin` result, in group order */
export declare function decodePluginReturns<T>(result: GroupReturn, appId: bigint, method: ABIMethod): T[];
type PluginArgs = MaybeSigner & {
    rekeyBack?: boolean;
};
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
export declare class PluginDexPluginSDK extends BaseSDK<PluginDexPluginClient> {
    constructor(params: NewContractSDKParams);
    swap(): PluginSDKReturn;
    swap(args: PluginDexSwapArgs): PluginSDKReturn;
    swapRoute(): PluginSDKReturn;
    swapRoute(args: PluginDexSwapRouteArgs): PluginSDKReturn;
    /** Assets are put in Vault order (A < B); when that flips the caller's order, the launch fields flip with them */
    createPool(): PluginSDKReturn;
    createPool(args: PluginDexCreatePoolArgs): PluginSDKReturn;
    addLiquidity(): PluginSDKReturn;
    addLiquidity(args: PluginDexAddLiquidityArgs): PluginSDKReturn;
    removeLiquidity(): PluginSDKReturn;
    removeLiquidity(args: PluginDexRemoveLiquidityArgs): PluginSDKReturn;
    addLiquidityCurve(): PluginSDKReturn;
    addLiquidityCurve(args: PluginDexAddLiquidityCurveArgs): PluginSDKReturn;
    removeLiquidityCurve(): PluginSDKReturn;
    removeLiquidityCurve(args: PluginDexRemoveLiquidityCurveArgs): PluginSDKReturn;
    /** The ABI return of `methodName` in a `wallet.usePlugin` result (see `decodePluginReturn`) */
    decodeReturn<T>(result: GroupReturn, methodName: string): T;
    /** Without args: the method's selector for a grant. With args: the call for `wallet.usePlugin`. */
    private plugin;
}
export {};

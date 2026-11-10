import { TransactionSigner } from 'algosdk';
import { BaseSDK } from '../base';
import { CurveLiquidityResult, HookApproval, PluginDexArgs, PluginDexClient, PoolConfig, PoolInfo } from '../generated/PluginDexClient';
import { MaybeSigner, NewContractSDKParams } from '../types';
import { HookInstall } from './hooks';
export * from './constants';
export * from './hooks';
export * from './bins';
export * from './draft';
export type { CurveLiquidityResult, HookApproval, PoolConfig, PoolInfo } from '../generated/PluginDexClient';
export type PluginDexContractArgs = PluginDexArgs['obj'];
/** A pool's installed hook (HookConfig): pinned version and the points, perms and flags it runs with */
export type PoolHook = {
    app: bigint;
    version: bigint;
    points: bigint;
    perms: bigint;
    flags: bigint;
};
/** ExternalSlotConfig: [hook, valuator, side, receipt, capBps, maxMarkupBpsPerDay, maxMarkdownBpsPerDay] */
export type ExternalSlotTuple = [bigint, bigint, bigint, bigint, bigint, bigint, bigint];
/** An Akita wallet the SDK acts for: its app, its controlled address and the admin who signs */
export type WalletFlash = {
    walletAppId: bigint;
    /** the wallet's controlled address (usually the wallet app's address) */
    controlledAddress: string;
    admin: string;
    signer: TransactionSigner;
};
/** Native constant-product defaults: fee cap 1000 bps, custody fee = base fee, no hook fees */
export declare const defaultPoolConfig: (feeBps: bigint, overrides?: Partial<PoolConfig>) => PoolConfig;
/** The Vault requires assetA < assetB; `flipped` says the caller's A/B were swapped to get there */
export declare function orderPair(assetA: bigint, assetB: bigint): {
    assetA: bigint;
    assetB: bigint;
    flipped: boolean;
};
/** `amount` reduced by `slippageBps` */
export declare const withSlippage: (amount: bigint, slippageBps: bigint) => bigint;
/** The µALGO a pool escrow is funded with: min balance plus one opt-in per ASA side and per external slot */
export declare const escrowFunding: (assetA: bigint, externals?: number) => bigint;
export type CreatePoolParams = MaybeSigner & {
    assetA: bigint;
    assetB: bigint;
    config: PoolConfig;
    hooks?: HookInstall[];
    externals?: ExternalSlotTuple[];
    /** µALGO sent with createPool (the Vault refunds the excess); defaults to `estimateCreatePoolPayment` */
    payment?: bigint;
};
export type AddLiquidityParams = MaybeSigner & {
    poolId: bigint;
    amountA: bigint;
    amountB: bigint;
    minLpOut?: bigint;
    data?: Uint8Array;
};
export type RemoveLiquidityParams = MaybeSigner & {
    poolId: bigint;
    lpAmount: bigint;
    minAmountA?: bigint;
    minAmountB?: bigint;
    data?: Uint8Array;
};
export type AddLiquidityCurveParams = MaybeSigner & {
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
export type RemoveLiquidityCurveParams = MaybeSigner & {
    poolId: bigint;
    positionId: bigint;
    minAmountA?: bigint;
    minAmountB?: bigint;
    curveArgs: Uint8Array;
    data?: Uint8Array;
    /** Also delete the emptied position on the curve engine in the same group, refunding its MBR. Only valid when the remove empties every share. */
    closePosition?: boolean;
};
export type QuoteParams = {
    poolId: bigint;
    assetIn: bigint;
    amountIn: bigint;
    /** whose fee discount applies (GatedFee); defaults to the reader account */
    swapper?: string;
    /** an Akita wallet app id the swapper acts for, or 0 */
    wallet?: bigint;
    data?: Uint8Array;
};
export type QuoteRouteParams = Omit<QuoteParams, 'poolId'> & {
    route: bigint[];
};
export type SwapParams = MaybeSigner & {
    poolId: bigint;
    assetIn: bigint;
    amountIn: bigint;
    /** floor on the output; pass `withSlippage(quote, bps)` */
    minAmountOut: bigint;
    /** defaults to the sender */
    recipient?: string;
    wallet?: bigint;
    data?: Uint8Array;
};
export type SwapRouteParams = Omit<SwapParams, 'poolId'> & {
    route: bigint[];
};
/**
 * SDK for the PluginDex v2 Vault: pools with version-pinned hook stacks, optional curves (BinEngine) and
 * launch (bonding-curve) pools. Follows the integrator rules of akita-sc ARCHITECTURE §12.1: the fee buffer for
 * lazy-custody hooks, `sync` before curve-pool removes and the LP opt-in before adds.
 */
export declare class PluginDexSDK extends BaseSDK<PluginDexClient> {
    private flash?;
    constructor(params: NewContractSDKParams);
    /**
     * A copy of this SDK that acts for an Akita (ARC-58) wallet: every write group opens with the wallet's
     * admin-only `arc58_rekeyTo(admin, flash = true)`, sends the Vault calls and deposits from the wallet's
     * controlled address (signed by the admin) and closes by rekeying that address back to the wallet app.
     * Pools, LP tokens and swap output stay in the wallet.
     */
    asWallet(flash: WalletFlash): PluginDexSDK;
    getPool(poolId: bigint): Promise<PoolInfo>;
    /** Every pool the Vault has created, by id (reads the pool boxes, so it grows with the pool count) */
    listPools(): Promise<Map<bigint, PoolInfo>>;
    /** The address deposits for `pool` go to */
    escrowAddress(pool: Pick<PoolInfo, 'escrow'>): string;
    getPoolHooks(poolId: bigint): Promise<PoolHook[]>;
    getExternalSlots(poolId: bigint): Promise<[bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint][]>;
    /** Indexed pools of a pair (at most 64). The index is permissionless: check each pool before trusting it. */
    getPairPools(assetA: bigint, assetB: bigint): Promise<bigint[]>;
    /** The DAO's approval of a hook app, or undefined when it is not approved */
    getHookApproval(hook: bigint): Promise<HookApproval | undefined>;
    /** Approved perms of every given hook app, for `validateHookStack` */
    getHookApprovals(hooks: bigint[]): Promise<Map<bigint, bigint>>;
    /** Output of one pool for `amountIn`, priced through the pool's Quote hooks (simulated, never sent) */
    quote({ poolId, assetIn, amountIn, swapper, wallet, data }: QuoteParams): Promise<bigint>;
    /** Output of a 1..4 hop route; 0 when any hop cannot fill (tryQuoteRoute) */
    quoteRoute({ route, assetIn, amountIn, swapper, wallet, data }: QuoteRouteParams): Promise<bigint>;
    /**
     * Fee buffer (µALGO) a swap through these pools adds on top of the simulated fee (§12.1 rule 1).
     * `backrunApp` is the BackrunArbHook app id when known.
     */
    swapFeeBuffer(poolIds: bigint[], backrunApp?: bigint): Promise<bigint>;
    /**
     * An upper estimate of what createPool must be paid: the Vault's own MBR growth (pool, hook and pair
     * boxes and the LP asset), the escrow funding, every hook's F6 funding and the curve MBR. The Vault
     * refunds what it does not use.
     */
    estimateCreatePoolPayment({ assetA, assetB, config, hooks, externals }: Omit<CreatePoolParams, 'payment' | keyof MaybeSigner>): bigint;
    /**
     * Create a pool. Assets are put in Vault order (A < B); when that flips the caller's order, the launch
     * fields (virtualA/B, quoteIsA) are flipped with them. Returns the new pool id and its info.
     */
    createPool(params: CreatePoolParams): Promise<{
        poolId: bigint;
        pool: PoolInfo;
    }>;
    /** Add to a fungible-LP pool. Opts the sender into the LP asset in the same group when needed. */
    addLiquidity({ poolId, amountA, amountB, minLpOut, data, ...signer }: AddLiquidityParams): Promise<bigint>;
    /** Burn LP for both sides of a fungible-LP pool */
    removeLiquidity({ poolId, lpAmount, minAmountA, minAmountB, data, ...signer }: RemoveLiquidityParams): Promise<{
        amountA: bigint;
        amountB: bigint;
    }>;
    /** Add to a curve-managed position (e.g. bins; build `curveArgs` with `encodeBinAddArgs`) */
    addLiquidityCurve({ poolId, positionId, amountA, amountB, minShares, curveArgs, mbr, data, ...signer }: AddLiquidityCurveParams): Promise<CurveLiquidityResult>;
    /** Remove from a curve-managed position; `sync` runs first so the LP keeps its share of unsynced surplus */
    removeLiquidityCurve({ poolId, positionId, minAmountA, minAmountB, curveArgs, data, closePosition, ...signer }: RemoveLiquidityCurveParams): Promise<{
        amountA: bigint;
        amountB: bigint;
    }>;
    /** Swap through one pool. Opts the sender into the output asset when it is the recipient and not yet opted in. */
    swap({ poolId, assetIn, amountIn, minAmountOut, recipient, wallet, data, ...signer }: SwapParams): Promise<bigint>;
    /** Swap through 1..4 pools in one call; each hop runs its pool's full hook stack */
    swapRoute({ route, assetIn, amountIn, minAmountOut, recipient, wallet, data, ...signer }: SwapRouteParams): Promise<bigint>;
    /** Run one hook's Poke (keepers, volatility refresh, backrun) */
    poke({ poolId, hookIndex, data, ...signer }: MaybeSigner & {
        poolId: bigint;
        hookIndex: bigint;
        data?: Uint8Array;
    }): Promise<void>;
    /** Book unsynced balances (donations, consensus rewards) to LPs */
    sync({ poolId, ...signer }: MaybeSigner & {
        poolId: bigint;
    }): Promise<void>;
    /** Graduate a launch pool once its quote reserve reaches the threshold (permissionless) */
    graduate({ poolId, ...signer }: MaybeSigner & {
        poolId: bigint;
    }): Promise<void>;
    collectProtocolFees({ poolId, ...signer }: MaybeSigner & {
        poolId: bigint;
    }): Promise<void>;
    private depositTxn;
    /** An opt-in for `asset` when the sender does not hold it yet */
    private optInTxn;
    private sendSwap;
    /**
     * Build and send one group. In wallet mode it is wrapped in the flash rekey: the admin's
     * `arc58_rekeyTo(admin, true)` first and the controlled address's rekey back to the wallet last.
     * Returns the decoded ABI returns of the Vault calls.
     */
    private run;
}
export * from './launch';
export * from './engine';

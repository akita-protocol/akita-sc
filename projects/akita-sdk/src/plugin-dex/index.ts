import { microAlgo } from '@algorandfoundation/algokit-utils';
import algosdk, { ABIMethod, Transaction, TransactionSigner } from 'algosdk';
import { BaseSDK } from '../base';
import { ENV_VAR_NAMES } from '../config';
import {
  CurveLiquidityResult,
  HookApproval,
  PluginDexArgs,
  PluginDexClient,
  PluginDexComposer,
  PluginDexFactory,
  PoolConfig,
  PoolInfo,
} from '../generated/PluginDexClient';
import { ExpandedSendParamsWithSigner, MaybeSigner, NewContractSDKParams } from '../types';
import { BPS_DIVISOR, MAX_ROUTE_HOPS } from './constants';
import { HookInstall, hookFunding, hookInstallTuple, swapFeeBuffer } from './hooks';

export * from './constants';
export * from './hooks';
export * from './bins';
export * from './draft';
export type { CurveLiquidityResult, HookApproval, PoolConfig, PoolInfo } from '../generated/PluginDexClient';

export type PluginDexContractArgs = PluginDexArgs['obj'];

/** A pool's installed hook (HookConfig): pinned version and the points, perms and flags it runs with */
export type PoolHook = { app: bigint; version: bigint; points: bigint; perms: bigint; flags: bigint };

/** ExternalSlotConfig: [hook, valuator, side, receipt, capBps, maxMarkupBpsPerDay, maxMarkdownBpsPerDay] */
export type ExternalSlotTuple = [bigint, bigint, bigint, bigint, bigint, bigint, bigint];

const EMPTY = new Uint8Array();
/** opcode budget simulate may add to a quote: hooks and curves can be expensive to price */
const QUOTE_EXTRA_OPCODE_BUDGET = 320_000;
/** fee credit for a simulated quote: hook and curve calls are fee-0 inners paid from the group */
const QUOTE_FEE = microAlgo(100_000);
/** a pool's own min balance plus its ASA opt-ins, its LP asset and its boxes fit well inside this */
const CREATE_POOL_BASE_ESTIMATE = 1_000_000n;
const MIN_BALANCE = 100_000n;
const ASSET_OPT_IN_MBR = 100_000n;

/** An Akita wallet the SDK acts for: its app, its controlled address and the admin who signs */
export type WalletFlash = {
  walletAppId: bigint;
  /** the wallet's controlled address (usually the wallet app's address) */
  controlledAddress: string;
  admin: string;
  signer: TransactionSigner;
};

const ARC58_REKEY_TO = ABIMethod.fromSignature('arc58_rekeyTo(address,bool)void');
const CLOSE_POSITION = ABIMethod.fromSignature('closePosition(uint64)void');

/** Native constant-product defaults: fee cap 1000 bps, custody fee = base fee, no hook fees */
export const defaultPoolConfig = (feeBps: bigint, overrides: Partial<PoolConfig> = {}): PoolConfig => ({
  curve: 0n,
  feeBps,
  maxFeeBps: 1_000n,
  custodyFeeBps: feeBps,
  maxHookFeeBps: 0n,
  virtualA: 0n,
  virtualB: 0n,
  graduationThreshold: 0n,
  quoteIsA: false,
  curveMbr: 0n,
  curveArgs: EMPTY,
  ...overrides,
});

/** The Vault requires assetA < assetB; `flipped` says the caller's A/B were swapped to get there */
export function orderPair(assetA: bigint, assetB: bigint): { assetA: bigint; assetB: bigint; flipped: boolean } {
  if (assetA === assetB) throw new Error('A pool needs two different assets');
  return assetA < assetB ? { assetA, assetB, flipped: false } : { assetA: assetB, assetB: assetA, flipped: true };
}

/** `amount` reduced by `slippageBps` */
export const withSlippage = (amount: bigint, slippageBps: bigint): bigint => (amount * (BPS_DIVISOR - slippageBps)) / BPS_DIVISOR;

/** The µALGO a pool escrow is funded with: min balance plus one opt-in per ASA side and per external slot */
export const escrowFunding = (assetA: bigint, externals = 0): bigint =>
  MIN_BALANCE + ASSET_OPT_IN_MBR * ((assetA === 0n ? 1n : 2n) + BigInt(externals));

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

export type QuoteRouteParams = Omit<QuoteParams, 'poolId'> & { route: bigint[] };

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

export type SwapRouteParams = Omit<SwapParams, 'poolId'> & { route: bigint[] };

/**
 * SDK for the PluginDex v2 Vault: pools with version-pinned hook stacks, optional curves (BinEngine) and
 * launch (bonding-curve) pools. Follows the integrator rules of akita-sc ARCHITECTURE §12.1: the fee buffer for
 * lazy-custody hooks, `sync` before curve-pool removes and the LP opt-in before adds.
 */
export class PluginDexSDK extends BaseSDK<PluginDexClient> {
  private flash?: WalletFlash;

  constructor(params: NewContractSDKParams) {
    super({ factory: PluginDexFactory, ...params }, ENV_VAR_NAMES.PLUGIN_DEX_APP_ID);
  }

  /**
   * A copy of this SDK that acts for an Akita (ARC-58) wallet: every write group opens with the wallet's
   * admin-only `arc58_rekeyTo(admin, flash = true)`, sends the Vault calls and deposits from the wallet's
   * controlled address (signed by the admin) and closes by rekeying that address back to the wallet app.
   * Pools, LP tokens and swap output stay in the wallet.
   */
  asWallet(flash: WalletFlash): PluginDexSDK {
    const copy = Object.create(PluginDexSDK.prototype) as PluginDexSDK;
    Object.assign(copy, this);
    copy.flash = flash;
    copy.sendParams = { ...this.sendParams, sender: flash.controlledAddress, signer: flash.signer };
    return copy;
  }

  // READS --------------------------------------------------------------------------------------------

  async getPool(poolId: bigint): Promise<PoolInfo> {
    return this.client.getPool({ ...this.getReaderSendParams(), args: { poolId } });
  }

  /** Every pool the Vault has created, by id (reads the pool boxes, so it grows with the pool count) */
  async listPools(): Promise<Map<bigint, PoolInfo>> {
    return this.client.state.box.pools.getMap();
  }

  /** The address deposits for `pool` go to */
  escrowAddress(pool: Pick<PoolInfo, 'escrow'>): string {
    return algosdk.getApplicationAddress(pool.escrow).toString();
  }

  async getPoolHooks(poolId: bigint): Promise<PoolHook[]> {
    const hooks = await this.client.getPoolHooks({ ...this.getReaderSendParams(), args: { poolId } });
    return hooks.map(([app, version, points, perms, flags]) => ({ app, version, points, perms, flags }));
  }

  async getExternalSlots(poolId: bigint) {
    return this.client.getExternalSlots({ ...this.getReaderSendParams(), args: { poolId } });
  }

  /** Indexed pools of a pair (at most 64). The index is permissionless: check each pool before trusting it. */
  async getPairPools(assetA: bigint, assetB: bigint): Promise<bigint[]> {
    const pair = orderPair(assetA, assetB);
    return this.client.getPairPools({ ...this.getReaderSendParams(), args: { assetA: pair.assetA, assetB: pair.assetB } });
  }

  /** The DAO's approval of a hook app, or undefined when it is not approved */
  async getHookApproval(hook: bigint): Promise<HookApproval | undefined> {
    try {
      const approval = await this.client.getHookApproval({ ...this.getReaderSendParams(), args: { hook } });
      return approval.version === 0n && approval.perms === 0n ? undefined : approval;
    } catch {
      return undefined;
    }
  }

  /** Approved perms of every given hook app, for `validateHookStack` */
  async getHookApprovals(hooks: bigint[]): Promise<Map<bigint, bigint>> {
    const out = new Map<bigint, bigint>();
    await Promise.all(
      hooks.map(async (hook) => {
        const approval = await this.getHookApproval(hook);
        if (approval) out.set(hook, approval.perms);
      }),
    );
    return out;
  }

  /** Output of one pool for `amountIn`, priced through the pool's Quote hooks (simulated, never sent) */
  async quote({ poolId, assetIn, amountIn, swapper, wallet = 0n, data = EMPTY }: QuoteParams): Promise<bigint> {
    const reader = this.getReaderSendParams(swapper ? { sender: swapper } : {});
    const result = await this.client
      .newGroup()
      .quote({ ...reader, staticFee: QUOTE_FEE, args: { poolId, assetIn, amountIn, swapper: swapper ?? String(reader.sender), data, wallet } })
      .simulate({ skipSignatures: true, allowUnnamedResources: true, extraOpcodeBudget: QUOTE_EXTRA_OPCODE_BUDGET });
    return result.returns[0] as unknown as bigint;
  }

  /** Output of a 1..4 hop route; 0 when any hop cannot fill (tryQuoteRoute) */
  async quoteRoute({ route, assetIn, amountIn, swapper, wallet = 0n, data = EMPTY }: QuoteRouteParams): Promise<bigint> {
    checkRoute(route);
    const reader = this.getReaderSendParams(swapper ? { sender: swapper } : {});
    const result = await this.client
      .newGroup()
      .tryQuoteRoute({ ...reader, staticFee: QUOTE_FEE, args: { route, assetIn, amountIn, swapper: swapper ?? String(reader.sender), data, wallet } })
      .simulate({ skipSignatures: true, allowUnnamedResources: true, extraOpcodeBudget: QUOTE_EXTRA_OPCODE_BUDGET });
    return result.returns[0] as unknown as bigint;
  }

  /**
   * Fee buffer (µALGO) a swap through these pools adds on top of the simulated fee (§12.1 rule 1).
   * `backrunApp` is the BackrunArbHook app id when known.
   */
  async swapFeeBuffer(poolIds: bigint[], backrunApp?: bigint): Promise<bigint> {
    const stacks = await Promise.all(poolIds.map((id) => this.getPoolHooks(id)));
    return stacks.reduce((sum, hooks) => sum + swapFeeBuffer(hooks, backrunApp), 0n);
  }

  // POOLS --------------------------------------------------------------------------------------------

  /**
   * An upper estimate of what createPool must be paid: the Vault's own MBR growth (pool, hook and pair
   * boxes and the LP asset), the escrow funding, every hook's F6 funding and the curve MBR. The Vault
   * refunds what it does not use.
   */
  estimateCreatePoolPayment({ assetA, assetB, config, hooks = [], externals = [] }: Omit<CreatePoolParams, 'payment' | keyof MaybeSigner>): bigint {
    const { assetA: a } = orderPair(assetA, assetB);
    return CREATE_POOL_BASE_ESTIMATE + escrowFunding(a, externals.length) + hookFunding(hooks) + config.curveMbr;
  }

  /**
   * Create a pool. Assets are put in Vault order (A < B); when that flips the caller's order, the launch
   * fields (virtualA/B, quoteIsA) are flipped with them. Returns the new pool id and its info.
   */
  async createPool(params: CreatePoolParams): Promise<{ poolId: bigint; pool: PoolInfo }> {
    const sendParams = this.getRequiredSendParams(params);
    const { assetA, assetB, flipped } = orderPair(params.assetA, params.assetB);
    const config: PoolConfig = flipped
      ? { ...params.config, virtualA: params.config.virtualB, virtualB: params.config.virtualA, quoteIsA: !params.config.quoteIsA }
      : params.config;
    const hooks = params.hooks ?? [];
    const externals = params.externals ?? [];
    const amount = params.payment ?? this.estimateCreatePoolPayment({ assetA, assetB, config, hooks, externals });

    const payment = this.algorand.createTransaction.payment({
      sender: sendParams.sender,
      signer: sendParams.signer,
      receiver: this.client.appAddress,
      amount: microAlgo(amount),
    });

    const returns = await this.run(sendParams, (group) =>
      group.createPool({ ...sendParams, args: { payment, assetA, assetB, config, hooks: hooks.map(hookInstallTuple), externals } }),
    );
    const poolId = returns[returns.length - 1] as bigint | undefined;
    if (poolId === undefined) throw new Error('createPool returned no pool id');
    return { poolId, pool: await this.getPool(poolId) };
  }

  // LIQUIDITY ----------------------------------------------------------------------------------------

  /** Add to a fungible-LP pool. Opts the sender into the LP asset in the same group when needed. */
  async addLiquidity({ poolId, amountA, amountB, minLpOut = 0n, data = EMPTY, ...signer }: AddLiquidityParams): Promise<bigint> {
    const sendParams = this.getRequiredSendParams(signer);
    const pool = await this.getPool(poolId);
    const escrow = this.escrowAddress(pool);
    const lpOptIn = await this.optInTxn(sendParams, pool.lpAsset);
    const returns = await this.run(sendParams, (group) => (lpOptIn ? group.addTransaction(lpOptIn, sendParams.signer) : group).addLiquidity({
      ...sendParams,
      args: {
        depositA: this.depositTxn(sendParams, escrow, pool.assetA, amountA),
        depositB: this.depositTxn(sendParams, escrow, pool.assetB, amountB),
        poolId,
        minLpOut,
        data,
      },
    }));
    return returns[returns.length - 1] as bigint;
  }

  /** Burn LP for both sides of a fungible-LP pool */
  async removeLiquidity({ poolId, lpAmount, minAmountA = 0n, minAmountB = 0n, data = EMPTY, ...signer }: RemoveLiquidityParams): Promise<{ amountA: bigint; amountB: bigint }> {
    const sendParams = this.getRequiredSendParams(signer);
    const pool = await this.getPool(poolId);
    const returns = await this.run(sendParams, (group) => (pool.curve !== 0n ? group.sync({ ...sendParams, args: { poolId } }) : group).removeLiquidity({
      ...sendParams,
      args: {
        lpTransfer: this.algorand.createTransaction.assetTransfer({
          sender: sendParams.sender,
          signer: sendParams.signer,
          receiver: this.client.appAddress,
          assetId: pool.lpAsset,
          amount: lpAmount,
        }),
        poolId,
        minAmountA,
        minAmountB,
        data,
      },
    }));
    return returns[returns.length - 1] as { amountA: bigint; amountB: bigint };
  }

  /** Add to a curve-managed position (e.g. bins; build `curveArgs` with `encodeBinAddArgs`) */
  async addLiquidityCurve({
    poolId,
    positionId = 0n,
    amountA,
    amountB,
    minShares = 0n,
    curveArgs,
    mbr,
    data = EMPTY,
    ...signer
  }: AddLiquidityCurveParams): Promise<CurveLiquidityResult> {
    const sendParams = this.getRequiredSendParams(signer);
    const pool = await this.getPool(poolId);
    const escrow = this.escrowAddress(pool);
    const returns = await this.run(sendParams, (group) => group.addLiquidityCurve({
      ...sendParams,
      args: {
        mbr: this.algorand.createTransaction.payment({
          sender: sendParams.sender,
          signer: sendParams.signer,
          receiver: this.client.appAddress,
          amount: microAlgo(mbr),
        }),
        depositA: this.depositTxn(sendParams, escrow, pool.assetA, amountA),
        depositB: this.depositTxn(sendParams, escrow, pool.assetB, amountB),
        poolId,
        positionId,
        minShares,
        curveArgs,
        data,
      },
    }));
    const result = returns[returns.length - 1] as CurveLiquidityResult | undefined;
    if (result === undefined) throw new Error('addLiquidityCurve returned no result');
    return result;
  }

  /** Remove from a curve-managed position; `sync` runs first so the LP keeps its share of unsynced surplus */
  async removeLiquidityCurve({ poolId, positionId, minAmountA = 0n, minAmountB = 0n, curveArgs, data = EMPTY, closePosition = false, ...signer }: RemoveLiquidityCurveParams): Promise<{ amountA: bigint; amountB: bigint }> {
    const sendParams = this.getRequiredSendParams(signer);
    const close = closePosition
      ? (
          await this.algorand.createTransaction.appCallMethodCall({
            sender: sendParams.sender,
            appId: (await this.getPool(poolId)).curve,
            method: CLOSE_POSITION,
            args: [positionId],
            // the call and its MBR refund inner
            staticFee: microAlgo(2_000),
          })
        ).transactions[0]
      : undefined;
    const returns = await this.run(sendParams, (group) => {
      const removed = group
        .sync({ ...sendParams, args: { poolId } })
        .removeLiquidityCurve({ ...sendParams, args: { poolId, positionId, minAmountA, minAmountB, curveArgs, data } });
      return close ? removed.addTransaction(close, sendParams.signer) : removed;
    });
    return returns[returns.length - 1] as { amountA: bigint; amountB: bigint };
  }

  // SWAPS --------------------------------------------------------------------------------------------

  /** Swap through one pool. Opts the sender into the output asset when it is the recipient and not yet opted in. */
  async swap({ poolId, assetIn, amountIn, minAmountOut, recipient, wallet = 0n, data = EMPTY, ...signer }: SwapParams): Promise<bigint> {
    const sendParams = this.getRequiredSendParams(signer);
    const pool = await this.getPool(poolId);
    const assetOut = assetIn === pool.assetA ? pool.assetB : pool.assetA;
    const buffer = await this.swapFeeBuffer([poolId]);
    return this.sendSwap(sendParams, assetOut, recipient, (group) =>
      group.swap({
        ...sendParams,
        ...(buffer > 0n ? { extraFee: microAlgo(buffer) } : {}),
        args: {
          input: this.depositTxn(sendParams, this.escrowAddress(pool), assetIn, amountIn),
          poolId,
          minAmountOut,
          recipient: recipient ?? algosdk.ALGORAND_ZERO_ADDRESS_STRING,
          data,
          wallet,
        },
      }),
    );
  }

  /** Swap through 1..4 pools in one call; each hop runs its pool's full hook stack */
  async swapRoute({ route, assetIn, amountIn, minAmountOut, recipient, wallet = 0n, data = EMPTY, ...signer }: SwapRouteParams): Promise<bigint> {
    checkRoute(route);
    const sendParams = this.getRequiredSendParams(signer);
    const pools = await Promise.all(route.map((id) => this.getPool(id)));
    let asset = assetIn;
    for (const pool of pools) asset = asset === pool.assetA ? pool.assetB : pool.assetA;
    const buffer = await this.swapFeeBuffer(route);
    return this.sendSwap(sendParams, asset, recipient, (group) =>
      group.swapRoute({
        ...sendParams,
        ...(buffer > 0n ? { extraFee: microAlgo(buffer) } : {}),
        args: {
          input: this.depositTxn(sendParams, this.escrowAddress(pools[0]), assetIn, amountIn),
          route,
          minAmountOut,
          recipient: recipient ?? algosdk.ALGORAND_ZERO_ADDRESS_STRING,
          data,
          wallet,
        },
      }),
    );
  }

  // MAINTENANCE --------------------------------------------------------------------------------------

  /** Run one hook's Poke (keepers, volatility refresh, backrun) */
  async poke({ poolId, hookIndex, data = EMPTY, ...signer }: MaybeSigner & { poolId: bigint; hookIndex: bigint; data?: Uint8Array }): Promise<void> {
    const sendParams = this.getRequiredSendParams(signer);
    const buffer = await this.swapFeeBuffer([poolId]);
    await this.run(sendParams, (group) => group.poke({ ...sendParams, ...(buffer > 0n ? { extraFee: microAlgo(buffer) } : {}), args: { poolId, hookIndex, data } }));
  }

  /** Book unsynced balances (donations, consensus rewards) to LPs */
  async sync({ poolId, ...signer }: MaybeSigner & { poolId: bigint }): Promise<void> {
    const sendParams = this.getRequiredSendParams(signer);
    await this.run(sendParams, (group) => group.sync({ ...sendParams, args: { poolId } }));
  }

  /** Graduate a launch pool once its quote reserve reaches the threshold (permissionless) */
  async graduate({ poolId, ...signer }: MaybeSigner & { poolId: bigint }): Promise<void> {
    const sendParams = this.getRequiredSendParams(signer);
    await this.run(sendParams, (group) => group.graduate({ ...sendParams, args: { poolId } }));
  }

  async collectProtocolFees({ poolId, ...signer }: MaybeSigner & { poolId: bigint }): Promise<void> {
    const sendParams = this.getRequiredSendParams(signer);
    await this.run(sendParams, (group) => group.collectProtocolFees({ ...sendParams, args: { poolId } }));
  }

  // INTERNALS ----------------------------------------------------------------------------------------

  private depositTxn(sendParams: ExpandedSendParamsWithSigner, receiver: string, asset: bigint, amount: bigint) {
    return asset === 0n
      ? this.algorand.createTransaction.payment({ sender: sendParams.sender, signer: sendParams.signer, receiver, amount: microAlgo(amount) })
      : this.algorand.createTransaction.assetTransfer({ sender: sendParams.sender, signer: sendParams.signer, receiver, assetId: asset, amount });
  }

  /** An opt-in for `asset` when the sender does not hold it yet */
  private async optInTxn(sendParams: ExpandedSendParamsWithSigner, asset: bigint): Promise<Transaction | undefined> {
    if (asset === 0n) return undefined;
    const sender = sendParams.sender.toString();
    const held = await this.algorand.asset.getAccountInformation(sender, asset).then(
      () => true,
      () => false,
    );
    if (held) return undefined;
    return this.algorand.createTransaction.assetOptIn({ sender, assetId: asset });
  }

  private async sendSwap(
    sendParams: ExpandedSendParamsWithSigner,
    assetOut: bigint,
    recipient: string | undefined,
    add: (group: PluginDexComposer<any[]>) => PluginDexComposer<any[]>,
  ): Promise<bigint> {
    const optIn = recipient === undefined || recipient === sendParams.sender.toString() ? await this.optInTxn(sendParams, assetOut) : undefined;
    const returns = await this.run(sendParams, (group) => add(optIn ? group.addTransaction(optIn, sendParams.signer) : group));
    return returns[returns.length - 1] as bigint;
  }

  /**
   * Build and send one group. In wallet mode it is wrapped in the flash rekey: the admin's
   * `arc58_rekeyTo(admin, true)` first and the controlled address's rekey back to the wallet last.
   * Returns the decoded ABI returns of the Vault calls.
   */
  private async run(
    sendParams: ExpandedSendParamsWithSigner,
    build: (group: PluginDexComposer<any[]>) => PluginDexComposer<any[]>,
  ): Promise<unknown[]> {
    let group = this.client.newGroup() as PluginDexComposer<any[]>;
    const flash = this.flash;
    if (flash) {
      const { transactions } = await this.algorand.createTransaction.appCallMethodCall({
        sender: flash.admin,
        signer: flash.signer,
        appId: flash.walletAppId,
        method: ARC58_REKEY_TO,
        args: [flash.admin, true],
        // the call and its rekey payment inner
        staticFee: microAlgo(2_000),
      });
      group = group.addTransaction(transactions[0], flash.signer);
    }
    group = build(group);
    if (flash) {
      const rekeyBack = await this.algorand.createTransaction.payment({
        sender: flash.controlledAddress,
        receiver: flash.controlledAddress,
        amount: microAlgo(0),
        rekeyTo: algosdk.getApplicationAddress(flash.walletAppId).toString(),
      });
      group = group.addTransaction(rekeyBack, flash.signer);
    }
    const { returns } = await group.send(sendParams);
    return (returns ?? []) as unknown[];
  }
}

function checkRoute(route: bigint[]) {
  if (route.length === 0 || route.length > MAX_ROUTE_HOPS) throw new Error(`A route takes 1 to ${MAX_ROUTE_HOPS} pools`);
  if (new Set(route).size !== route.length) throw new Error('A route may not use a pool twice');
}
export * from './launch';
export * from './engine';

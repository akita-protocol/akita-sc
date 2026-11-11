import { BaseSDK } from "../../base";
import { ENV_VAR_NAMES } from "../../config";
import { FeeSchedule, PluginDexAdminPluginClient, PluginDexAdminPluginFactory, PoolKeys } from "../../generated/PluginDexAdminPluginClient";
import { MaybeSigner, NewContractSDKParams, PluginHookParams, PluginSDKReturn } from "../../types";
import { getTxns } from "../utils";

type PluginArgs = MaybeSigner & { rekeyBack?: boolean };

/** One of the four apps with a stored admin: the Vault, LaunchManager, BackrunArbHook or ConsensusKeyregHook */
export type PluginDexAdminTargetArgs = PluginArgs & { app: bigint };
export type PluginDexAdminProposeArgs = PluginDexAdminTargetArgs & { admin: string };
export type PluginDexAdminProtocolFeeArgs = PluginArgs & { protocolFeeBps: bigint; treasury: string };
export type PluginDexAdminHookApprovalArgs = PluginArgs & { hook: bigint; perms: bigint };
export type PluginDexAdminCurveApprovalArgs = PluginArgs & { curve: bigint; lpMode: bigint; approved: boolean };
export type PluginDexAdminValuatorApprovalArgs = PluginArgs & { valuator: bigint; approved: boolean };
export type PluginDexAdminPoolPausedArgs = PluginArgs & { poolId: bigint; paused: boolean };
export type PluginDexAdminWriteDownArgs = PluginArgs & { poolId: bigint; slot: bigint };
export type PluginDexAdminLaunchFeesArgs = PluginArgs & { launchFee: bigint; bounty: bigint; treasury: string };
export type PluginDexAdminLaunchHooksArgs = PluginArgs & { antiSnipeHook: bigint; launchTaxHook: bigint; gatedHook: bigint; gatedFunding: bigint };
export type PluginDexAdminLaunchDevBuyArgs = PluginArgs & { rewards: bigint; maxBps: bigint; minVestSeconds: bigint; maxVestSeconds: bigint };
export type PluginDexAdminBackrunPausedArgs = PluginArgs & { paused: boolean };
export type PluginDexAdminBackrunRegisterArgs = PluginArgs & { poolId: bigint; minSurplusA: bigint; minSurplusB: bigint; maxTradeBps: bigint };
export type PluginDexAdminBackrunPoolEnabledArgs = PluginArgs & { poolId: bigint; enabled: boolean };
export type PluginDexAdminWithdrawArgs = PluginArgs & { amount: bigint };
export type PluginDexAdminPoolKeysArgs = PluginArgs & { poolId: bigint; keys: PoolKeys };
export type PluginDexAdminPoolArgs = PluginArgs & { poolId: bigint };
export type PluginDexAdminGateSlotsArgs = PluginArgs & { slots: bigint[] };
export type PluginDexAdminPassTtlArgs = PluginArgs & { ttl: bigint };
export type PluginDexAdminDailyCapArgs = PluginArgs & { cap: bigint };
export type PluginDexAdminDefaultScheduleArgs = PluginArgs & { schedule: FeeSchedule };

/**
 * ARC-58 wallet plugin for the admin role of a Plugin DEX deployment: the Vault, LaunchManager,
 * BackrunArbHook and ConsensusKeyregHook (a stored admin, handed over in two steps) and GatedFeeHook (its
 * admin is always the DAO's wallet). Each of those apps checks the sender against its admin, and a
 * wallet's address is only a sender inside a plugin window, so a wallet that is the admin (the DAO wallet
 * on MainNet) accepts the role and uses it through
 * `wallet.usePlugin({ calls: [admin.acceptAdminOf({ app })] })`, or through a DAO ExecutePlugin proposal.
 *
 * The plugin holds no authority: each call is sent as the wallet's main account and the target app decides.
 * Every method is a separate grantable selector (call it without args for the selector), so a wallet can
 * grant, for example, only `vaultSetPoolPaused`.
 */
export class PluginDexAdminPluginSDK extends BaseSDK<PluginDexAdminPluginClient> {
  constructor(params: NewContractSDKParams) {
    super({ factory: PluginDexAdminPluginFactory, ...params }, ENV_VAR_NAMES.PLUGIN_DEX_ADMIN_PLUGIN_APP_ID);
  }

  /** The five apps this plugin was created for */
  async targets(): Promise<{ vault: bigint; launchManager: bigint; backrunArbHook: bigint; consensusKeyregHook: bigint; gatedFeeHook: bigint }> {
    const state = await this.client.state.global.getAll();
    return {
      vault: state.vault ?? 0n,
      launchManager: state.launchManager ?? 0n,
      backrunArbHook: state.backrunArbHook ?? 0n,
      consensusKeyregHook: state.consensusKeyregHook ?? 0n,
      gatedFeeHook: state.gatedFeeHook ?? 0n,
    };
  }

  // Handover (the four apps with a stored admin)

  /** Step 2 of a handover: the wallet takes the admin role of `app`, which named it with proposeAdmin */
  acceptAdminOf(): PluginSDKReturn;
  acceptAdminOf(args: PluginDexAdminTargetArgs): PluginSDKReturn;
  acceptAdminOf(args?: PluginDexAdminTargetArgs): PluginSDKReturn {
    return this.plugin("acceptAdminOf", args, (wallet, sendParams) => {
      const { rekeyBack = true, app } = args!;
      return this.client.params.acceptAdminOf({ ...sendParams, args: { wallet, rekeyBack, app } });
    });
  }

  /** Step 1 of a handover, as the current admin: name the account that may take over `app` */
  proposeAdminOf(): PluginSDKReturn;
  proposeAdminOf(args: PluginDexAdminProposeArgs): PluginSDKReturn;
  proposeAdminOf(args?: PluginDexAdminProposeArgs): PluginSDKReturn {
    return this.plugin("proposeAdminOf", args, (wallet, sendParams) => {
      const { rekeyBack = true, app, admin } = args!;
      return this.client.params.proposeAdminOf({ ...sendParams, args: { wallet, rekeyBack, app, admin } });
    });
  }

  // Vault

  vaultSetProtocolFee(): PluginSDKReturn;
  vaultSetProtocolFee(args: PluginDexAdminProtocolFeeArgs): PluginSDKReturn;
  vaultSetProtocolFee(args?: PluginDexAdminProtocolFeeArgs): PluginSDKReturn {
    return this.plugin("vaultSetProtocolFee", args, (wallet, sendParams) => {
      const { rekeyBack = true, protocolFeeBps, treasury } = args!;
      return this.client.params.vaultSetProtocolFee({ ...sendParams, args: { wallet, rekeyBack, protocolFeeBps, treasury } });
    });
  }

  /** `perms` 0 revokes. The Vault pays the approval box, so fund it first. */
  vaultSetHookApproval(): PluginSDKReturn;
  vaultSetHookApproval(args: PluginDexAdminHookApprovalArgs): PluginSDKReturn;
  vaultSetHookApproval(args?: PluginDexAdminHookApprovalArgs): PluginSDKReturn {
    return this.plugin("vaultSetHookApproval", args, (wallet, sendParams) => {
      const { rekeyBack = true, hook, perms } = args!;
      return this.client.params.vaultSetHookApproval({ ...sendParams, args: { wallet, rekeyBack, hook, perms } });
    });
  }

  vaultSetCurveApproval(): PluginSDKReturn;
  vaultSetCurveApproval(args: PluginDexAdminCurveApprovalArgs): PluginSDKReturn;
  vaultSetCurveApproval(args?: PluginDexAdminCurveApprovalArgs): PluginSDKReturn {
    return this.plugin("vaultSetCurveApproval", args, (wallet, sendParams) => {
      const { rekeyBack = true, curve, lpMode, approved } = args!;
      return this.client.params.vaultSetCurveApproval({ ...sendParams, args: { wallet, rekeyBack, curve, lpMode, approved } });
    });
  }

  vaultSetValuatorApproval(): PluginSDKReturn;
  vaultSetValuatorApproval(args: PluginDexAdminValuatorApprovalArgs): PluginSDKReturn;
  vaultSetValuatorApproval(args?: PluginDexAdminValuatorApprovalArgs): PluginSDKReturn {
    return this.plugin("vaultSetValuatorApproval", args, (wallet, sendParams) => {
      const { rekeyBack = true, valuator, approved } = args!;
      return this.client.params.vaultSetValuatorApproval({ ...sendParams, args: { wallet, rekeyBack, valuator, approved } });
    });
  }

  /** Pausing stops swaps and deposits on the pool and opens `emergencyRemoveLiquidity` */
  vaultSetPoolPaused(): PluginSDKReturn;
  vaultSetPoolPaused(args: PluginDexAdminPoolPausedArgs): PluginSDKReturn;
  vaultSetPoolPaused(args?: PluginDexAdminPoolPausedArgs): PluginSDKReturn {
    return this.plugin("vaultSetPoolPaused", args, (wallet, sendParams) => {
      const { rekeyBack = true, poolId, paused } = args!;
      return this.client.params.vaultSetPoolPaused({ ...sendParams, args: { wallet, rekeyBack, poolId, paused } });
    });
  }

  /** Paused pools only */
  vaultWriteDownExternal(): PluginSDKReturn;
  vaultWriteDownExternal(args: PluginDexAdminWriteDownArgs): PluginSDKReturn;
  vaultWriteDownExternal(args?: PluginDexAdminWriteDownArgs): PluginSDKReturn {
    return this.plugin("vaultWriteDownExternal", args, (wallet, sendParams) => {
      const { rekeyBack = true, poolId, slot } = args!;
      return this.client.params.vaultWriteDownExternal({ ...sendParams, args: { wallet, rekeyBack, poolId, slot } });
    });
  }

  // LaunchManager

  launchSetFees(): PluginSDKReturn;
  launchSetFees(args: PluginDexAdminLaunchFeesArgs): PluginSDKReturn;
  launchSetFees(args?: PluginDexAdminLaunchFeesArgs): PluginSDKReturn {
    return this.plugin("launchSetFees", args, (wallet, sendParams) => {
      const { rekeyBack = true, launchFee, bounty, treasury } = args!;
      return this.client.params.launchSetFees({ ...sendParams, args: { wallet, rekeyBack, launchFee, bounty, treasury } });
    });
  }

  launchSetHooks(): PluginSDKReturn;
  launchSetHooks(args: PluginDexAdminLaunchHooksArgs): PluginSDKReturn;
  launchSetHooks(args?: PluginDexAdminLaunchHooksArgs): PluginSDKReturn {
    return this.plugin("launchSetHooks", args, (wallet, sendParams) => {
      const { rekeyBack = true, antiSnipeHook, launchTaxHook, gatedHook, gatedFunding } = args!;
      return this.client.params.launchSetHooks({ ...sendParams, args: { wallet, rekeyBack, antiSnipeHook, launchTaxHook, gatedHook, gatedFunding } });
    });
  }

  launchSetDevBuy(): PluginSDKReturn;
  launchSetDevBuy(args: PluginDexAdminLaunchDevBuyArgs): PluginSDKReturn;
  launchSetDevBuy(args?: PluginDexAdminLaunchDevBuyArgs): PluginSDKReturn {
    return this.plugin("launchSetDevBuy", args, (wallet, sendParams) => {
      const { rekeyBack = true, rewards, maxBps, minVestSeconds, maxVestSeconds } = args!;
      return this.client.params.launchSetDevBuy({ ...sendParams, args: { wallet, rekeyBack, rewards, maxBps, minVestSeconds, maxVestSeconds } });
    });
  }

  // BackrunArbHook

  backrunSetPaused(): PluginSDKReturn;
  backrunSetPaused(args: PluginDexAdminBackrunPausedArgs): PluginSDKReturn;
  backrunSetPaused(args?: PluginDexAdminBackrunPausedArgs): PluginSDKReturn {
    return this.plugin("backrunSetPaused", args, (wallet, sendParams) => {
      const { rekeyBack = true, paused } = args!;
      return this.client.params.backrunSetPaused({ ...sendParams, args: { wallet, rekeyBack, paused } });
    });
  }

  backrunRegisterPool(): PluginSDKReturn;
  backrunRegisterPool(args: PluginDexAdminBackrunRegisterArgs): PluginSDKReturn;
  backrunRegisterPool(args?: PluginDexAdminBackrunRegisterArgs): PluginSDKReturn {
    return this.plugin("backrunRegisterPool", args, (wallet, sendParams) => {
      const { rekeyBack = true, poolId, minSurplusA, minSurplusB, maxTradeBps } = args!;
      return this.client.params.backrunRegisterPool({ ...sendParams, args: { wallet, rekeyBack, poolId, minSurplusA, minSurplusB, maxTradeBps } });
    });
  }

  backrunSetPoolEnabled(): PluginSDKReturn;
  backrunSetPoolEnabled(args: PluginDexAdminBackrunPoolEnabledArgs): PluginSDKReturn;
  backrunSetPoolEnabled(args?: PluginDexAdminBackrunPoolEnabledArgs): PluginSDKReturn {
    return this.plugin("backrunSetPoolEnabled", args, (wallet, sendParams) => {
      const { rekeyBack = true, poolId, enabled } = args!;
      return this.client.params.backrunSetPoolEnabled({ ...sendParams, args: { wallet, rekeyBack, poolId, enabled } });
    });
  }

  /** The hook pays its admin, which is the wallet */
  backrunWithdraw(): PluginSDKReturn;
  backrunWithdraw(args: PluginDexAdminWithdrawArgs): PluginSDKReturn;
  backrunWithdraw(args?: PluginDexAdminWithdrawArgs): PluginSDKReturn {
    return this.plugin("backrunWithdraw", args, (wallet, sendParams) => {
      const { rekeyBack = true, amount } = args!;
      return this.client.params.backrunWithdraw({ ...sendParams, args: { wallet, rekeyBack, amount } });
    });
  }

  // ConsensusKeyregHook

  keyregSetPoolKeys(): PluginSDKReturn;
  keyregSetPoolKeys(args: PluginDexAdminPoolKeysArgs): PluginSDKReturn;
  keyregSetPoolKeys(args?: PluginDexAdminPoolKeysArgs): PluginSDKReturn {
    return this.plugin("keyregSetPoolKeys", args, (wallet, sendParams) => {
      const { rekeyBack = true, poolId, keys } = args!;
      return this.client.params.keyregSetPoolKeys({ ...sendParams, args: { wallet, rekeyBack, poolId, keys } });
    });
  }

  keyregDeletePoolKeys(): PluginSDKReturn;
  keyregDeletePoolKeys(args: PluginDexAdminPoolArgs): PluginSDKReturn;
  keyregDeletePoolKeys(args?: PluginDexAdminPoolArgs): PluginSDKReturn {
    return this.plugin("keyregDeletePoolKeys", args, (wallet, sendParams) => {
      const { rekeyBack = true, poolId } = args!;
      return this.client.params.keyregDeletePoolKeys({ ...sendParams, args: { wallet, rekeyBack, poolId } });
    });
  }

  /** The hook pays its admin, which is the wallet */
  keyregWithdraw(): PluginSDKReturn;
  keyregWithdraw(args: PluginDexAdminWithdrawArgs): PluginSDKReturn;
  keyregWithdraw(args?: PluginDexAdminWithdrawArgs): PluginSDKReturn {
    return this.plugin("keyregWithdraw", args, (wallet, sendParams) => {
      const { rekeyBack = true, amount } = args!;
      return this.client.params.keyregWithdraw({ ...sendParams, args: { wallet, rekeyBack, amount } });
    });
  }

  // GatedFeeHook (no handover: its admin is the wallet of its DAO)

  /** At most 8 gate ids; bit i of a pass refers to slot i. The hook pays the box, so fund it first. */
  gatedSetGateSlots(): PluginSDKReturn;
  gatedSetGateSlots(args: PluginDexAdminGateSlotsArgs): PluginSDKReturn;
  gatedSetGateSlots(args?: PluginDexAdminGateSlotsArgs): PluginSDKReturn {
    return this.plugin("gatedSetGateSlots", args, (wallet, sendParams) => {
      const { rekeyBack = true, slots } = args!;
      return this.client.params.gatedSetGateSlots({ ...sendParams, args: { wallet, rekeyBack, slots } });
    });
  }

  gatedSetPassTtl(): PluginSDKReturn;
  gatedSetPassTtl(args: PluginDexAdminPassTtlArgs): PluginSDKReturn;
  gatedSetPassTtl(args?: PluginDexAdminPassTtlArgs): PluginSDKReturn {
    return this.plugin("gatedSetPassTtl", args, (wallet, sendParams) => {
      const { rekeyBack = true, ttl } = args!;
      return this.client.params.gatedSetPassTtl({ ...sendParams, args: { wallet, rekeyBack, ttl } });
    });
  }

  /** 0 = unlimited */
  gatedSetMaxDiscountedSwapsPerDay(): PluginSDKReturn;
  gatedSetMaxDiscountedSwapsPerDay(args: PluginDexAdminDailyCapArgs): PluginSDKReturn;
  gatedSetMaxDiscountedSwapsPerDay(args?: PluginDexAdminDailyCapArgs): PluginSDKReturn {
    return this.plugin("gatedSetMaxDiscountedSwapsPerDay", args, (wallet, sendParams) => {
      const { rekeyBack = true, cap } = args!;
      return this.client.params.gatedSetMaxDiscountedSwapsPerDay({ ...sendParams, args: { wallet, rekeyBack, cap } });
    });
  }

  /** For pools created later with empty initData. The hook pays the box, so fund it first. */
  gatedSetDefaultSchedule(): PluginSDKReturn;
  gatedSetDefaultSchedule(args: PluginDexAdminDefaultScheduleArgs): PluginSDKReturn;
  gatedSetDefaultSchedule(args?: PluginDexAdminDefaultScheduleArgs): PluginSDKReturn {
    return this.plugin("gatedSetDefaultSchedule", args, (wallet, sendParams) => {
      const { rekeyBack = true, schedule } = args!;
      return this.client.params.gatedSetDefaultSchedule({ ...sendParams, args: { wallet, rekeyBack, schedule } });
    });
  }

  /** Without args: the method's selector for a grant. With args: the call for `wallet.usePlugin`. */
  private plugin(
    methodName: string,
    args: PluginArgs | undefined,
    params: (wallet: bigint, sendParams: ReturnType<PluginDexAdminPluginSDK["getRequiredSendParams"]>) => Promise<object>,
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

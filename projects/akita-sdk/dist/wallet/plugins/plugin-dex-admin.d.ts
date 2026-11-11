import { BaseSDK } from "../../base";
import { FeeSchedule, PluginDexAdminPluginClient, PoolKeys } from "../../generated/PluginDexAdminPluginClient";
import { MaybeSigner, NewContractSDKParams, PluginSDKReturn } from "../../types";
type PluginArgs = MaybeSigner & {
    rekeyBack?: boolean;
};
/** One of the four apps with a stored admin: the Vault, LaunchManager, BackrunArbHook or ConsensusKeyregHook */
export type PluginDexAdminTargetArgs = PluginArgs & {
    app: bigint;
};
export type PluginDexAdminProposeArgs = PluginDexAdminTargetArgs & {
    admin: string;
};
export type PluginDexAdminProtocolFeeArgs = PluginArgs & {
    protocolFeeBps: bigint;
    treasury: string;
};
export type PluginDexAdminHookApprovalArgs = PluginArgs & {
    hook: bigint;
    perms: bigint;
};
export type PluginDexAdminCurveApprovalArgs = PluginArgs & {
    curve: bigint;
    lpMode: bigint;
    approved: boolean;
};
export type PluginDexAdminValuatorApprovalArgs = PluginArgs & {
    valuator: bigint;
    approved: boolean;
};
export type PluginDexAdminPoolPausedArgs = PluginArgs & {
    poolId: bigint;
    paused: boolean;
};
export type PluginDexAdminWriteDownArgs = PluginArgs & {
    poolId: bigint;
    slot: bigint;
};
export type PluginDexAdminLaunchFeesArgs = PluginArgs & {
    launchFee: bigint;
    bounty: bigint;
    treasury: string;
};
export type PluginDexAdminLaunchHooksArgs = PluginArgs & {
    antiSnipeHook: bigint;
    launchTaxHook: bigint;
    gatedHook: bigint;
    gatedFunding: bigint;
};
export type PluginDexAdminLaunchDevBuyArgs = PluginArgs & {
    rewards: bigint;
    maxBps: bigint;
    minVestSeconds: bigint;
    maxVestSeconds: bigint;
};
export type PluginDexAdminBackrunPausedArgs = PluginArgs & {
    paused: boolean;
};
export type PluginDexAdminBackrunRegisterArgs = PluginArgs & {
    poolId: bigint;
    minSurplusA: bigint;
    minSurplusB: bigint;
    maxTradeBps: bigint;
};
export type PluginDexAdminBackrunPoolEnabledArgs = PluginArgs & {
    poolId: bigint;
    enabled: boolean;
};
export type PluginDexAdminWithdrawArgs = PluginArgs & {
    amount: bigint;
};
export type PluginDexAdminPoolKeysArgs = PluginArgs & {
    poolId: bigint;
    keys: PoolKeys;
};
export type PluginDexAdminPoolArgs = PluginArgs & {
    poolId: bigint;
};
export type PluginDexAdminGateSlotsArgs = PluginArgs & {
    slots: bigint[];
};
export type PluginDexAdminPassTtlArgs = PluginArgs & {
    ttl: bigint;
};
export type PluginDexAdminDailyCapArgs = PluginArgs & {
    cap: bigint;
};
export type PluginDexAdminDefaultScheduleArgs = PluginArgs & {
    schedule: FeeSchedule;
};
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
export declare class PluginDexAdminPluginSDK extends BaseSDK<PluginDexAdminPluginClient> {
    constructor(params: NewContractSDKParams);
    /** The five apps this plugin was created for */
    targets(): Promise<{
        vault: bigint;
        launchManager: bigint;
        backrunArbHook: bigint;
        consensusKeyregHook: bigint;
        gatedFeeHook: bigint;
    }>;
    /** Step 2 of a handover: the wallet takes the admin role of `app`, which named it with proposeAdmin */
    acceptAdminOf(): PluginSDKReturn;
    acceptAdminOf(args: PluginDexAdminTargetArgs): PluginSDKReturn;
    /** Step 1 of a handover, as the current admin: name the account that may take over `app` */
    proposeAdminOf(): PluginSDKReturn;
    proposeAdminOf(args: PluginDexAdminProposeArgs): PluginSDKReturn;
    vaultSetProtocolFee(): PluginSDKReturn;
    vaultSetProtocolFee(args: PluginDexAdminProtocolFeeArgs): PluginSDKReturn;
    /** `perms` 0 revokes. The Vault pays the approval box, so fund it first. */
    vaultSetHookApproval(): PluginSDKReturn;
    vaultSetHookApproval(args: PluginDexAdminHookApprovalArgs): PluginSDKReturn;
    vaultSetCurveApproval(): PluginSDKReturn;
    vaultSetCurveApproval(args: PluginDexAdminCurveApprovalArgs): PluginSDKReturn;
    vaultSetValuatorApproval(): PluginSDKReturn;
    vaultSetValuatorApproval(args: PluginDexAdminValuatorApprovalArgs): PluginSDKReturn;
    /** Pausing stops swaps and deposits on the pool and opens `emergencyRemoveLiquidity` */
    vaultSetPoolPaused(): PluginSDKReturn;
    vaultSetPoolPaused(args: PluginDexAdminPoolPausedArgs): PluginSDKReturn;
    /** Paused pools only */
    vaultWriteDownExternal(): PluginSDKReturn;
    vaultWriteDownExternal(args: PluginDexAdminWriteDownArgs): PluginSDKReturn;
    launchSetFees(): PluginSDKReturn;
    launchSetFees(args: PluginDexAdminLaunchFeesArgs): PluginSDKReturn;
    launchSetHooks(): PluginSDKReturn;
    launchSetHooks(args: PluginDexAdminLaunchHooksArgs): PluginSDKReturn;
    launchSetDevBuy(): PluginSDKReturn;
    launchSetDevBuy(args: PluginDexAdminLaunchDevBuyArgs): PluginSDKReturn;
    backrunSetPaused(): PluginSDKReturn;
    backrunSetPaused(args: PluginDexAdminBackrunPausedArgs): PluginSDKReturn;
    backrunRegisterPool(): PluginSDKReturn;
    backrunRegisterPool(args: PluginDexAdminBackrunRegisterArgs): PluginSDKReturn;
    backrunSetPoolEnabled(): PluginSDKReturn;
    backrunSetPoolEnabled(args: PluginDexAdminBackrunPoolEnabledArgs): PluginSDKReturn;
    /** The hook pays its admin, which is the wallet */
    backrunWithdraw(): PluginSDKReturn;
    backrunWithdraw(args: PluginDexAdminWithdrawArgs): PluginSDKReturn;
    keyregSetPoolKeys(): PluginSDKReturn;
    keyregSetPoolKeys(args: PluginDexAdminPoolKeysArgs): PluginSDKReturn;
    keyregDeletePoolKeys(): PluginSDKReturn;
    keyregDeletePoolKeys(args: PluginDexAdminPoolArgs): PluginSDKReturn;
    /** The hook pays its admin, which is the wallet */
    keyregWithdraw(): PluginSDKReturn;
    keyregWithdraw(args: PluginDexAdminWithdrawArgs): PluginSDKReturn;
    /** At most 8 gate ids; bit i of a pass refers to slot i. The hook pays the box, so fund it first. */
    gatedSetGateSlots(): PluginSDKReturn;
    gatedSetGateSlots(args: PluginDexAdminGateSlotsArgs): PluginSDKReturn;
    gatedSetPassTtl(): PluginSDKReturn;
    gatedSetPassTtl(args: PluginDexAdminPassTtlArgs): PluginSDKReturn;
    /** 0 = unlimited */
    gatedSetMaxDiscountedSwapsPerDay(): PluginSDKReturn;
    gatedSetMaxDiscountedSwapsPerDay(args: PluginDexAdminDailyCapArgs): PluginSDKReturn;
    /** For pools created later with empty initData. The hook pays the box, so fund it first. */
    gatedSetDefaultSchedule(): PluginSDKReturn;
    gatedSetDefaultSchedule(args: PluginDexAdminDefaultScheduleArgs): PluginSDKReturn;
    /** Without args: the method's selector for a grant. With args: the call for `wallet.usePlugin`. */
    private plugin;
}
export {};

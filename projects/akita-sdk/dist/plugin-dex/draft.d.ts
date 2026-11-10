import type { NetworkAppIds } from '../networks';
import type { PoolConfig } from '../generated/PluginDexClient';
import { type HookPointName } from './constants';
import { type AntiSnipeInit, type GatedFeeSchedule, type HookCatalogueEntry, type HookInstall, type HookKind, type HookStackIssue, type LaunchTaxInit } from './hooks';
/**
 * A pool as a create-pool form holds it, before it is turned into the Vault's PoolConfig and hook
 * installs. Kept free of any UI framework so the app and desktop wizards share one model.
 */
export type PoolCurveKind = 'constantProduct' | 'bins';
type PlainHookKind = Exclude<HookKind, 'antiSnipeFee' | 'launchTax' | 'gatedFee'>;
/**
 * Mirrors the Vault's createPool check (readiness audit 2026-11-09, C15). A launch tax above zero is
 * declared to the Vault when the pool is created. Every hook fee of a swap counts against the pool's one
 * hook fee cap, so the Vault then refuses the pool if another hook installed with a hook-fee permission
 * does not declare its own maximum (errPdhm). Of the catalogue hooks only the launch tax declares, so
 * a taxed launch pool cannot also carry another fee-charging hook such as the swap tax.
 *
 * `installs` are the built installs in the same order as `hooks` (the permissions as they will be
 * sent); without them the catalogue's default permissions are used.
 */
export declare function validateDeclaredHookFees(hooks: HookDraft[], installs?: HookInstall[]): HookStackIssue[];
export type HookDraft = {
    kind: 'antiSnipeFee';
    init: AntiSnipeInit;
} | {
    kind: 'launchTax';
    init: LaunchTaxInit;
    quoteAssetIsNew?: boolean;
} | {
    kind: 'gatedFee';
    schedule?: GatedFeeSchedule;
    defaultTiers?: number;
} | {
    kind: PlainHookKind;
    extraPoints?: bigint;
};
export type BinsDraft = {
    binStep: bigint;
    /** starting price, in base units of B per base unit of A as the user ordered the pair */
    price: number;
    /** decimals of the pool's B side (in Vault order), for the dust floor */
    decimalsB: number;
};
export type PoolDraft = {
    assetA: bigint;
    assetB: bigint;
    curve: PoolCurveKind;
    feeBps: bigint;
    /** defaults to 1000 bps */
    maxFeeBps?: bigint;
    /** defaults to the largest tax a hook in the stack can take, else 0 */
    maxHookFeeBps?: bigint;
    bins?: BinsDraft;
    /** in install order: hooks run in this order at every point they share */
    hooks: HookDraft[];
};
export type BuiltPoolDraft = {
    config: PoolConfig;
    hooks: HookInstall[];
    issues: HookStackIssue[];
    /** follow-up calls needed after createPool, by hook */
    afterCreate: Array<{
        kind: HookKind;
        step: NonNullable<HookCatalogueEntry['afterCreate']>;
    }>;
};
/** The deployment of a catalogue hook on this network, or 0 when it is not deployed */
export declare const hookAppId: (kind: HookKind, appIds: Partial<NetworkAppIds>) => bigint;
/** Catalogue hooks deployed on this network */
export declare const availableHooks: (appIds: Partial<NetworkAppIds>) => HookCatalogueEntry[];
export declare function hookDraftInstall(draft: HookDraft, app: bigint): HookInstall;
/**
 * Turn a draft into createPool's config and hooks, with every problem the Vault would reject it for.
 * `approvals` (hook app → approved perms, from `getHookApprovals`) adds the DAO approval checks.
 */
export declare function buildPoolDraft(draft: PoolDraft, appIds: Partial<NetworkAppIds>, approvals?: Map<bigint, bigint>): BuiltPoolDraft;
export type LifecycleSlot = {
    point: HookPointName;
    /** indexes into the draft's hooks, in the order they run at this point */
    hooks: number[];
};
/** The stack laid out by lifecycle point, in the order a pool goes through them */
export declare function lifecycleSlots(hooks: Array<Pick<HookInstall, 'points'>>): LifecycleSlot[];
/** Plain-language names for the lifecycle points */
export declare const HOOK_POINT_LABELS: Record<HookPointName, string>;
/** Plain-language names for what a hook may do */
export declare function permissionLabels(perms: bigint): string[];
export {};

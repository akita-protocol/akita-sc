import type { NetworkAppIds } from '../networks';
import { HookPointName } from './constants';
/** HookInstall as the generated client encodes it: [app, points, perms, flags, funding, initData] */
export type HookInstallTuple = [bigint, bigint, bigint, bigint, bigint, Uint8Array];
export type HookInstall = {
    app: bigint;
    points: bigint;
    perms: bigint;
    flags?: bigint;
    /** µALGO the Vault forwards to the hook at AfterInitialize (F6), paid inside createPool */
    funding?: bigint;
    initData?: Uint8Array;
};
export declare const hookInstallTuple: ({ app, points, perms, flags, funding, initData, }: HookInstall) => HookInstallTuple;
/** Pool settings a hook stack is checked against (the matching PoolConfig fields) */
export type HookPoolLimits = {
    maxFeeBps: bigint;
    maxHookFeeBps: bigint;
};
export type HookKind = 'impactFee' | 'swapTax' | 'volatilityFee' | 'backrunArb' | 'gatedFee' | 'antiSnipeFee' | 'launchTax' | 'consensusKeyreg';
export type HookCatalogueEntry = {
    kind: HookKind;
    /** NetworkAppIds key of the shared, DAO-approved deployment */
    appIdKey: keyof NetworkAppIds;
    name: string;
    description: string;
    /** points the hook needs; the UI may add `optionalPoints` */
    points: bigint;
    optionalPoints?: bigint;
    perms: bigint;
    flags: bigint;
    /** the hook reads per-pool config from initData at AfterInitialize */
    takesInitData: boolean;
    /** a follow-up call is needed after createPool before the hook is live */
    afterCreate?: 'volatilityInitPool' | 'backrunRegisterPool' | 'consensusSetKeys';
};
/** The hooks the Akita DAO ships, with the install each one expects */
export declare const HOOK_CATALOGUE: Record<HookKind, HookCatalogueEntry>;
export type AntiSnipeInit = {
    startFeeBps: bigint;
    endFeeBps: bigint;
    /** AntiSnipe.DecayLinear | AntiSnipe.DecayExponential */
    decayMode: bigint;
    decayRounds: bigint;
    /** AntiSnipe.StartCreation | AntiSnipe.StartFirstLiquidity (the latter needs AfterAddLiquidity) */
    startMode: bigint;
    /** zero address, or the pool creator */
    exempt?: string;
};
export declare function encodeAntiSnipeInit(init: AntiSnipeInit): Uint8Array;
export type LaunchTaxInit = {
    /** receives the accrued tax through `claim` */
    owner: string;
    /** the pool side every tax is paid in */
    quoteAsset: bigint;
    buyTaxBps: bigint;
    sellTaxBps: bigint;
    /** 0 = forever */
    untilRound: bigint;
};
export declare function encodeLaunchTaxInit(init: LaunchTaxInit): Uint8Array;
export type GatedFeeTier = {
    minPower: bigint;
    minImpact: bigint;
    /** every bit must be set in the pass's gates */
    gateMask: bigint;
    discountBps: bigint;
};
export type GatedFeeSchedule = {
    floorFeeBps: bigint;
    maxDiscountBps: bigint;
    impactMaxDiscountBps: bigint;
    tiers: GatedFeeTier[];
};
/** `undefined` installs with empty initData, which copies the DAO's default schedule */
export declare function encodeGatedFeeSchedule(schedule?: GatedFeeSchedule): Uint8Array;
export declare const antiSnipeFunding: () => bigint;
/** pass `quoteAssetIsNew` false when the hook already holds the ASA (another pool paid the opt-in and total box) */
export declare const launchTaxFunding: (quoteAsset: bigint, quoteAssetIsNew?: boolean) => bigint;
/** tiers = the schedule's tier count; for an empty initData pass the DAO default's tier count */
export declare const gatedFeeFunding: (tiers: number) => bigint;
export declare function antiSnipeInstall(app: bigint, init: AntiSnipeInit): HookInstall;
export declare function launchTaxInstall(app: bigint, init: LaunchTaxInit, quoteAssetIsNew?: boolean): HookInstall;
/** `defaultTiers` is the tier count of the DAO's default schedule, used only when `schedule` is undefined */
export declare function gatedFeeInstall(app: bigint, schedule?: GatedFeeSchedule, defaultTiers?: number): HookInstall;
/** Install a catalogue hook that takes no initData with its default points, perms and flags */
export declare function catalogueInstall(kind: HookKind, app: bigint, extraPoints?: bigint): HookInstall;
export type HookStackIssue = {
    index?: number;
    message: string;
};
/**
 * Mirrors PluginDex.validateHooks and the createPool fee checks, so a UI can explain a bad stack before
 * the user signs. `approvals` maps hook app id → approved perms; missing entries are reported.
 */
export declare function validateHookStack(hooks: HookInstall[], pool: HookPoolLimits & {
    feeBps?: bigint;
    custodyFeeBps?: bigint;
}, approvals?: Map<bigint, bigint>): HookStackIssue[];
/** Hook-specific checks for the builders' init data against the pool settings */
export declare function validateAntiSnipe(init: AntiSnipeInit, pool: HookPoolLimits): HookStackIssue[];
export declare function validateLaunchTax(init: LaunchTaxInit, pool: HookPoolLimits): HookStackIssue[];
export declare function validateGatedFeeSchedule(schedule: GatedFeeSchedule): HookStackIssue[];
/** Total F6 funding the stack adds to the createPool payment */
export declare const hookFunding: (hooks: HookInstall[]) => bigint;
/** OR of every install's points: the pool's `hookPoints` */
export declare const stackPoints: (hooks: HookInstall[]) => bigint;
/**
 * Extra µALGO a swap through this pool should add to its fee budget (ARCHITECTURE §12.1 rule 1): 11 min fees
 * for a backrun hook, 2 for any other lazy-custody hook, 0 otherwise.
 */
export declare function swapFeeBuffer(hooks: Array<Pick<HookInstall, 'app' | 'perms' | 'flags'>>, backrunApp?: bigint): bigint;
/** Names of the lifecycle points set in a bitmask, in pool-lifecycle order */
export declare const pointNames: (points: bigint) => HookPointName[];

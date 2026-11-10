/**
 * PluginDex v2 constants, mirrored from akita-sc `smart_contracts/plugin-dex/constants.ts` and the hook
 * contracts. The contract is the source of truth; keep these in step with it.
 */
/** Lifecycle points a hook can subscribe to (HookPoint* bitmask) */
export declare const HookPoint: {
    readonly AfterInitialize: 1n;
    readonly BeforeAddLiquidity: 2n;
    readonly AfterAddLiquidity: 4n;
    readonly BeforeRemoveLiquidity: 8n;
    readonly AfterRemoveLiquidity: 16n;
    readonly BeforeSwap: 32n;
    readonly AfterSwap: 64n;
    /** read-only pricing; no custody, no writes */
    readonly Quote: 128n;
    readonly Poke: 256n;
};
export type HookPointName = keyof typeof HookPoint;
export declare const HOOK_POINT_ALL = 511n;
/** Points in pool-lifecycle order, for UIs that lay a hook stack out as slots */
export declare const HOOK_POINT_ORDER: HookPointName[];
/** What a hook may do (HookPerm* bitmask); an install's perms must be a subset of the DAO approval */
export declare const HookPerm: {
    /** the pool escrow is flash-rekeyed to the hook for its call */
    readonly Custody: 1n;
    /** may set the swap fee at BeforeSwap/Quote, up to pool.maxFeeBps */
    readonly DynamicFee: 2n;
    /** takes a fee on the swap input at BeforeSwap */
    readonly HookFee: 4n;
    /** takes bps of the swap output (at most one such hook per pool) */
    readonly HookFeeOut: 8n;
    /** requires Custody; may change the receipts of the external slots naming it */
    readonly External: 16n;
};
export type HookPermName = keyof typeof HookPerm;
export declare const HOOK_PERM_ALL = 31n;
export declare const PRICING_PERMS: bigint;
export declare const HookFlag: {
    /** called without custody first; rekeyed and called again only when it asks */
    readonly LazyCustody: 1n;
};
export declare const HOOK_FLAGS_ALL = 1n;
export declare const LpMode: {
    readonly Fungible: 0n;
    readonly Curve: 1n;
};
export declare const MAX_HOOKS_PER_POOL = 8;
export declare const MAX_POOLS_PER_PAIR = 64;
export declare const BPS_DIVISOR = 10000n;
/** ceiling of a pool's base fee */
export declare const MAX_FEE_BPS = 1000n;
/** ceiling of a pool's maxFeeBps (what DynamicFee hooks may reach) */
export declare const MAX_POOL_FEE_CAP_BPS = 9000n;
/** ceiling of hook fee in + hook fee out */
export declare const MAX_HOOK_FEE_BPS = 1000n;
export declare const MAX_ROUTE_HOPS = 4;
export declare const MINIMUM_LIQUIDITY = 1000n;
export declare const LP_ASSET_DECIMALS = 6;
/** bins pools: maxFeeBps must stay at or below this */
export declare const BINS_MAX_FEE_BPS = 1000n;
/** Fee buffer per pool whose stack has BackrunArbHook (ARCHITECTURE §12.1 rule 1): 11 inners */
export declare const BACKRUN_MAX_EXTRA_INNERS = 11n;
/** Fee buffer per pool for any other lazy-custody hook: the escrow rekey and the custody call */
export declare const LAZY_CUSTODY_MIN_EXTRA_INNERS = 2n;
export declare const MIN_TXN_FEE = 1000n;
export declare const AntiSnipe: {
    readonly DecayLinear: 0n;
    readonly DecayExponential: 1n;
    /** the decay clock starts at pool creation */
    readonly StartCreation: 0n;
    /** the decay clock starts at the first liquidity add (needs AfterAddLiquidity) */
    readonly StartFirstLiquidity: 1n;
    readonly MaxStartFeeBps: 9000n;
    readonly MaxEndFeeBps: 1000n;
    readonly MaxDecayRounds: 100000n;
    /** config box MBR: 2,500 + 400 · (1 + 8 + 80) */
    readonly Funding: 38100n;
};
export declare const LaunchTax: {
    readonly MaxTaxBps: 500n;
    /** config box MBR: 2,500 + 400 · (1 + 8 + 72) */
    readonly ConfigBoxMbr: 34900n;
    /** per-ASA accrued-total box: 2,500 + 400 · (1 + 8 + 8) */
    readonly TotalBoxMbr: 9300n;
    readonly AssetOptInMbr: 100000n;
};
export declare const GatedFee: {
    readonly MaxTiers: 4;
    readonly MaxDiscountCapBps: 9000n;
    readonly ScheduleMbrBase: 17300n;
    readonly ScheduleMbrPerTier: 12800n;
    /** FeePass box MBR */
    readonly PassMbr: 47700n;
};

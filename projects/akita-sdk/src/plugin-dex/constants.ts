/**
 * PluginDex v2 constants, mirrored from akita-sc `smart_contracts/plugin-dex/constants.ts` and the hook
 * contracts. The contract is the source of truth; keep these in step with it.
 */

/** Lifecycle points a hook can subscribe to (HookPoint* bitmask) */
export const HookPoint = {
  AfterInitialize: 1n,
  BeforeAddLiquidity: 2n,
  AfterAddLiquidity: 4n,
  BeforeRemoveLiquidity: 8n,
  AfterRemoveLiquidity: 16n,
  BeforeSwap: 32n,
  AfterSwap: 64n,
  /** read-only pricing; no custody, no writes */
  Quote: 128n,
  Poke: 256n,
} as const;
export type HookPointName = keyof typeof HookPoint;
export const HOOK_POINT_ALL = 511n;
/** Points in pool-lifecycle order, for UIs that lay a hook stack out as slots */
export const HOOK_POINT_ORDER: HookPointName[] = [
  'AfterInitialize',
  'BeforeAddLiquidity',
  'AfterAddLiquidity',
  'BeforeRemoveLiquidity',
  'AfterRemoveLiquidity',
  'BeforeSwap',
  'AfterSwap',
  'Quote',
  'Poke',
];

/** What a hook may do (HookPerm* bitmask); an install's perms must be a subset of the DAO approval */
export const HookPerm = {
  /** the pool escrow is flash-rekeyed to the hook for its call */
  Custody: 1n,
  /** may set the swap fee at BeforeSwap/Quote, up to pool.maxFeeBps */
  DynamicFee: 2n,
  /** takes a fee on the swap input at BeforeSwap */
  HookFee: 4n,
  /** takes bps of the swap output (at most one such hook per pool) */
  HookFeeOut: 8n,
  /** requires Custody; may change the receipts of the external slots naming it */
  External: 16n,
} as const;
export type HookPermName = keyof typeof HookPerm;
export const HOOK_PERM_ALL = 31n;
export const PRICING_PERMS = HookPerm.DynamicFee | HookPerm.HookFee | HookPerm.HookFeeOut;

export const HookFlag = {
  /** called without custody first; rekeyed and called again only when it asks */
  LazyCustody: 1n,
} as const;
export const HOOK_FLAGS_ALL = 1n;

export const LpMode = { Fungible: 0n, Curve: 1n } as const;

export const MAX_HOOKS_PER_POOL = 8;
export const MAX_POOLS_PER_PAIR = 64;
export const BPS_DIVISOR = 10_000n;
/** ceiling of a pool's base fee */
export const MAX_FEE_BPS = 1_000n;
/** ceiling of a pool's maxFeeBps (what DynamicFee hooks may reach) */
export const MAX_POOL_FEE_CAP_BPS = 9_000n;
/** ceiling of hook fee in + hook fee out */
export const MAX_HOOK_FEE_BPS = 1_000n;
export const MAX_ROUTE_HOPS = 4;
export const MINIMUM_LIQUIDITY = 1_000n;
export const LP_ASSET_DECIMALS = 6;

/** bins pools: maxFeeBps must stay at or below this */
export const BINS_MAX_FEE_BPS = 1_000n;

/** Fee buffer per pool whose stack has BackrunArbHook (ARCHITECTURE §12.1 rule 1): 11 inners */
export const BACKRUN_MAX_EXTRA_INNERS = 11n;
/** Fee buffer per pool for any other lazy-custody hook: the escrow rekey and the custody call */
export const LAZY_CUSTODY_MIN_EXTRA_INNERS = 2n;
export const MIN_TXN_FEE = 1_000n;

// Hook-specific limits ------------------------------------------------------------------------------

export const AntiSnipe = {
  DecayLinear: 0n,
  DecayExponential: 1n,
  /** the decay clock starts at pool creation */
  StartCreation: 0n,
  /** the decay clock starts at the first liquidity add (needs AfterAddLiquidity) */
  StartFirstLiquidity: 1n,
  MaxStartFeeBps: 9_000n,
  MaxEndFeeBps: 1_000n,
  MaxDecayRounds: 100_000n,
  /** config box MBR: 2,500 + 400 · (1 + 8 + 80) */
  Funding: 38_100n,
} as const;

export const LaunchTax = {
  MaxTaxBps: 500n,
  /** config box MBR: 2,500 + 400 · (1 + 8 + 72) */
  ConfigBoxMbr: 34_900n,
  /** per-ASA accrued-total box: 2,500 + 400 · (1 + 8 + 8) */
  TotalBoxMbr: 9_300n,
  AssetOptInMbr: 100_000n,
} as const;

export const GatedFee = {
  MaxTiers: 4,
  MaxDiscountCapBps: 9_000n,
  ScheduleMbrBase: 17_300n,
  ScheduleMbrPerTier: 12_800n,
  /** FeePass box MBR */
  PassMbr: 47_700n,
} as const;

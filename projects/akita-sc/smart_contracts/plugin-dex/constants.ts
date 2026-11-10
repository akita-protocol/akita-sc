import { Uint64, uint64 } from '@algorandfoundation/algorand-typescript'

// FROZEN INTERFACE (PluginDex v2, FINAL-SPEC §3.2). Existing v1 names and values are kept.

export const PluginDexGlobalStateKeyVersion = 'version'
export const PluginDexGlobalStateKeyAdmin = 'admin'
export const PluginDexGlobalStateKeyPendingAdmin = 'pending_admin'
export const PluginDexGlobalStateKeyPoolCursor = 'pool_cursor'
export const PluginDexGlobalStateKeyProtocolFeeBps = 'protocol_fee_bps'
export const PluginDexGlobalStateKeyTreasury = 'treasury'

export const PluginDexBoxPrefixPools = 'p'
export const PluginDexBoxPrefixPoolHooks = 'h'
export const PluginDexBoxPrefixApprovedHooks = 'a'
export const PluginDexBoxPrefixPairPools = 'x'
export const PluginDexBoxPrefixCurveApprovals = 't'
export const PluginDexBoxPrefixValuatorApprovals = 'v'
export const PluginDexBoxPrefixExternalSlots = 'e'

// Hook points. A hook subscribes to any subset of these with a bitmask, and
// the DEX calls `akitaDexHook` once per subscribed point in install order.
export const HookPointAfterInitialize: uint64 = 1
export const HookPointBeforeAddLiquidity: uint64 = 2
export const HookPointAfterAddLiquidity: uint64 = 4
export const HookPointBeforeRemoveLiquidity: uint64 = 8
export const HookPointAfterRemoveLiquidity: uint64 = 16
export const HookPointBeforeSwap: uint64 = 32
export const HookPointAfterSwap: uint64 = 64
/** Side-effect free mirror of BeforeSwap used by `quote`; custody is never granted here */
export const HookPointQuote: uint64 = 128
/** keeper/admin-triggered via `poke`; custody allowed, fee fields of the result are ignored */
export const HookPointPoke: uint64 = 256
export const HookPointAll: uint64 = 511

// Hook permissions. Granted per hook app by the admin (`approvedHooks`) and
// requested per install; a pool can only request a subset of the approval.
/** The pool escrow is flash-rekeyed to the hook for the duration of its call (custody-guarded) */
export const HookPermCustody: uint64 = 1
/** The hook may override the swap fee for BeforeSwap / Quote */
export const HookPermDynamicFee: uint64 = 2
/** The hook may take a fee on the swap input at BeforeSwap / Quote */
export const HookPermHookFee: uint64 = 4
/** The hook may take a bps fee on the swap output (paid in assetOut); at most one per pool */
export const HookPermHookFeeOut: uint64 = 8
/** Requires Custody; may change the receipt balance of external slots naming it */
export const HookPermExternal: uint64 = 16
export const HookPermAll: uint64 = 31

/** Install flag: call first WITHOUT rekey; rekey + re-call only on HookResultRequestCustody */
export const HookFlagLazyCustody: uint64 = 1
export const HookFlagsAll: uint64 = 1

/** HookResult.flags bit: apply HookResult.feeBps as the new swap fee */
export const HookResultSetFee: uint64 = 1
/** HookResult.flags bit (lazy custody hooks): call me again at this point with custody */
export const HookResultRequestCustody: uint64 = 2

// Curve app operations (CurveRequest.op) and flags
export const CurveOpInit: uint64 = 1
export const CurveOpSwap: uint64 = 2
export const CurveOpQuote: uint64 = 3
export const CurveOpAdd: uint64 = 4
export const CurveOpRemove: uint64 = 5
export const CurveOpSettle: uint64 = 6
/** curve result: no more swaps/adds (removes stay open) */
export const CurveFlagClose: uint64 = 1
/** native snapshot: launch offsets active */
export const CurveFlagBonding: uint64 = 2

export const LpModeFungible: uint64 = 0
export const LpModeCurve: uint64 = 1

export const MaxHooksPerPool: uint64 = 8
export const MaxPoolsPerPair: uint64 = 64
export const BpsDivisor: uint64 = 10_000
/** cap on base feeBps (name kept) */
export const MaxFeeBps: uint64 = 1_000
/** cap on per-pool maxFeeBps (anti-snipe) */
export const MaxPoolFeeCapBps: uint64 = 9_000
export const MaxHookFeeBps: uint64 = 1_000
export const MaxProtocolFeeBps: uint64 = 5_000
export const MaxExternalSlots: uint64 = 2
export const MaxExternalCapBps: uint64 = 5_000
/** valuator rate units */
export const RateScale: uint64 = 1_000_000_000_000
export const SecondsPerDay: uint64 = 86_400
/** maximum pools in one route (moved from contract.algo.ts) */
export const MaxRouteHops: uint64 = 4
/** LP units burned on the first deposit so a pool can never be fully drained to zero supply */
export const MinimumLiquidity: uint64 = 1_000
/** µALGO in existence (10B ALGO): the largest ALGO reserve a pool can hold */
export const AlgoMaxSupply: uint64 = Uint64(10_000_000_000_000_000n)

export const LPAssetTotal: uint64 = Uint64(18_446_744_073_709_551_615n)
export const LPAssetDecimals: uint64 = 6
export const LPAssetUnitName = 'AKLP'
export const LPAssetName = 'Akita Hook LP'

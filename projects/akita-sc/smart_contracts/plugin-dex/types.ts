import { Account, bytes, uint64 } from '@algorandfoundation/algorand-typescript'

// FROZEN INTERFACE (PluginDex v2, FINAL-SPEC §3.1). Every type below is ARC-4 encoded as a tuple, so
// field order is part of the immutable ABI. Prices are `bytes<16>`: an unsigned Q64.64 price of one
// base unit of A in base units of B, big-endian (do arithmetic with `BigUint(bytes)`).

/**
 * Curve-agnostic view the Vault caches/passes to hooks. Native pools: liquidity = 0, activeId = 0.
 * Curve pools: PoolInfo caches only priceX64 and activeId, so a snapshot built from the cache
 * (ctx.before, and ctx.after where no curve call happened in the op) has liquidity = 0 and flags = 0;
 * ctx.after after a curve call in the op (AfterSwap) is the curve's own full snapshot.
 */
export type CurveSnapshot = {
  /** B per A, Q64.64, floor */
  priceX64: bytes<16>
  /** bins: active bin id; native: 0 */
  activeId: uint64
  /** curve-defined depth hint (bins: active-bin value in B base units); native: 0 */
  liquidity: uint64
  /** native: CurveFlagBonding while virtual offsets are active; curve apps: curve-defined */
  flags: uint64
}

export type PoolInfo = {
  /** lower asset id (0 = ALGO) */
  assetA: uint64
  assetB: uint64
  /** child Escrow app id; auth address = Vault */
  escrow: uint64
  /** LpModeFungible: Vault-created LP ASA; LpModeCurve: 0 */
  lpAsset: uint64
  /** 0 = native constant product (optionally with virtual offsets) */
  curve: uint64
  /** pinned Application.version of `curve` (0 for native) */
  curveVersion: uint64
  /** LpModeFungible | LpModeCurve */
  lpMode: uint64
  /** booked LP-owned balance = liquid + externalA (never includes virtual/locked/fees) */
  reserveA: uint64
  reserveB: uint64
  /** Σ bookValue of side-A external slots (always recomputed from slots) */
  externalA: uint64
  externalB: uint64
  /** number of slots in box e (0..2); 0 ⇒ box e is never read */
  externalSlots: uint64
  /** launch offsets (native only); both 0 after graduation */
  virtualA: uint64
  virtualB: uint64
  /** held by the escrow outside reserves forever-or-until-graduation (launch reserve, retained burn excess) */
  lockedA: uint64
  lockedB: uint64
  /** LP units incl. MinimumLiquidity and lockedLp (fungible modes) */
  lpSupply: uint64
  /** launch LP that is never transferable */
  lockedLp: uint64
  /** base LP fee (≤ MaxFeeBps) */
  feeBps: uint64
  /** ceiling for DynamicFee results on this pool (≤ MaxPoolFeeCapBps) */
  maxFeeBps: uint64
  /** fee a custody delta must pay (≤ maxFeeBps). SDK default = feeBps */
  custodyFeeBps: uint64
  /** cap on hook fee in + hook fee out (≤ MaxHookFeeBps) */
  maxHookFeeBps: uint64
  /** union of installed hook points */
  hookPoints: uint64
  protocolFeesA: uint64
  protocolFeesB: uint64
  /** launch: real quote-side reserve that unlocks graduate() */
  graduationThreshold: uint64
  /** curve pools: cached canonical spot; native: zero (computed on demand) */
  priceX64: bytes<16>
  /** curve pools: cached; native: 0 */
  activeId: uint64
  /** Global.latestTimestamp of the last price-moving operation */
  lastUpdate: uint64
  createdAt: uint64
  creator: Account
  /** launch: which side is the quote asset */
  quoteIsA: boolean
  /** set when a curve result carries CurveFlagClose: no swaps/adds, removes open */
  closed: boolean
  paused: boolean
}

/** createPool input (everything here is frozen into PoolInfo) */
export type PoolConfig = {
  curve: uint64
  feeBps: uint64
  maxFeeBps: uint64
  custodyFeeBps: uint64
  maxHookFeeBps: uint64
  /** native only; any non-zero offset makes a launch pool */
  virtualA: uint64
  virtualB: uint64
  /** launch only (> 0 iff offsets > 0) */
  graduationThreshold: uint64
  /** launch only */
  quoteIsA: boolean
  /** curve pools: µALGO forwarded to the curve's Init (excess refunded by the curve to the creator) */
  curveMbr: uint64
  /** curve pools: Init args (bins: FINAL-SPEC §5.2) */
  curveArgs: bytes
}

export type HookInstall = {
  app: uint64
  /** HookPoint* bitmask */
  points: uint64
  /** HookPerm* bitmask (⊆ approval) */
  perms: uint64
  /** HookFlag* bitmask */
  flags: uint64
  /** µALGO paid by the Vault to the hook app before AfterInitialize (F6) */
  funding: uint64
  /** passed as ctx.data to THIS hook at AfterInitialize (F6) */
  initData: bytes
}

export type HookConfig = {
  app: uint64
  /** pinned Application.version (rejectVersion = version + 1) */
  version: uint64
  points: uint64
  perms: uint64
  flags: uint64
}

export type HookApproval = { perms: uint64; version: uint64 }
export type CurveApproval = { version: uint64; lpMode: uint64 }

export type ExternalSlotConfig = {
  /** the only hook (with HookPermExternal) allowed to change this receipt balance */
  hook: uint64
  /** approved valuator; version pinned at creation */
  valuator: uint64
  /** 0 = underlying is assetA, 1 = assetB */
  side: uint64
  /** ASA the escrow holds; the Vault opts the escrow in at creation */
  receipt: uint64
  /** bookValue ≤ capBps·reserveSide/1e4 whenever units increase (≤ MaxExternalCapBps) */
  capBps: uint64
  /** per-unit rate may rise at most this much per day */
  maxMarkupBpsPerDay: uint64
  /** per-unit rate may fall at most this much per day (permissionless path) */
  maxMarkdownBpsPerDay: uint64
}

export type ExternalSlot = {
  hook: uint64
  valuator: uint64
  valuatorVersion: uint64
  side: uint64
  receipt: uint64
  capBps: uint64
  maxMarkupBpsPerDay: uint64
  maxMarkdownBpsPerDay: uint64
  /** receipt units the escrow held at the last booking */
  units: uint64
  /** booked underlying per receipt unit × RateScale */
  rate: uint64
  /** floor(units · rate / RateScale), counted inside reserveSide */
  bookValue: uint64
  /** Global.latestTimestamp of the last rate booking */
  lastMark: uint64
}

export type PairKey = { assetA: uint64; assetB: uint64 }

/**
 * Field order frozen. ~358 B + data + curveData; keep data ≤ 1,400 B (2 KB app-args cap).
 * Amended 2026-10-04 (principal-resolution spec §6.12, before the first deployment): `wallet` was added
 * immediately after `callerApp`; every hook and mock was recompiled against the new layout.
 */
export type HookContext = {
  point: uint64
  poolId: uint64
  /** 0 = native; hooks may refuse curves they do not understand */
  curve: uint64
  escrow: Account
  /** Txn.sender of the Vault call; at Quote: swapper (zero ⇒ Txn.sender) */
  caller: Account
  /** Global.callerApplicationId at the Vault (router plugin id, LaunchManager, 0) */
  callerApp: uint64
  /**
   * Caller-supplied ARC-58 wallet hint (`0` = plain account), passed through UNVERIFIED: the Vault stays
   * DAO-agnostic and hooks verify (utils/principal.ts). Set by swap / swapRoute / quote / quoteRoute /
   * tryQuoteRoute (their trailing `wallet` argument); 0 at every liquidity, initialize and poke point.
   * At BeforeSwap/AfterSwap (`caller` = the Vault's Txn.sender, `callerApp` = its caller app) a hook may
   * resolve it with `resolvePrincipalFromDexCtx` after `requireDexCaller`. At Quote `caller` is the
   * caller-chosen swapper: use only the quote-only `thirdPartyPrincipal(F, caller, wallet)` there.
   */
  wallet: uint64
  recipient: Account
  /** liquidity/initialize/poke points: assetA */
  assetIn: uint64
  /** liquidity/initialize/poke points: assetB */
  assetOut: uint64
  /** always true in v2; reserved */
  exactIn: boolean
  /** true iff the escrow is rekeyed to this hook for this call */
  custody: boolean
  amountIn: uint64
  /** AfterSwap: gross curve output (before hook fee out) */
  amountOut: uint64
  /** effective = booked + virtual */
  reserveIn: uint64
  reserveOut: uint64
  lpAmount: uint64
  lpSupply: uint64
  /** curve-managed liquidity points */
  positionId: uint64
  /** running LP fee (after earlier DynamicFee hooks) */
  feeBps: uint64
  /** so custody hooks can size trades that pass the guard */
  custodyFeeBps: uint64
  /** state at the start of this Vault operation */
  before: CurveSnapshot
  /**
   * After-points; equal to `before` at Before-points, Quote, Poke and Initialize. It is the state before this
   * point's hooks: it is set once per point and NOT refreshed after an earlier custody hook at the same point
   * books a delta (amendment L1, OPEN-DECISIONS #8). Only `reserveIn/Out` are recomputed for each hook; a hook
   * that needs the post-custody price must derive it from those (or from its own live reads).
   */
  after: CurveSnapshot
  /** curve-app hook data from the last curve call this op (bins: BinHookState); native: empty */
  curveData: bytes
  /** caller-supplied; AfterInitialize: this hook's HookInstall.initData */
  data: bytes
}

export type HookResult = {
  /** HookResultSetFee | HookResultRequestCustody */
  flags: uint64
  /** DynamicFee (≤ pool.maxFeeBps) */
  feeBps: uint64
  /** HookFee: units of assetIn taken at BeforeSwap/Quote */
  hookFee: uint64
  /** HookFeeOut: bps of amountOut paid to this hook in assetOut */
  hookFeeOutBps: uint64
}

export type SwapResult = { assetOut: uint64; amountOut: uint64 }
/** unchanged (v1 parity) */
export type RemoveResult = { amountA: uint64; amountB: uint64 }
export type CurveLiquidityResult = { positionId: uint64; shares: uint64; amountA: uint64; amountB: uint64 }

// EVENTS (ARC-28) --------------------------------------------------------------------------------

/** unchanged */
export type SwapEvent = {
  poolId: uint64
  caller: Account
  assetIn: uint64
  amountIn: uint64
  assetOut: uint64
  amountOut: uint64
  feeBps: uint64
  hookFees: uint64
  reserveA: uint64
  reserveB: uint64
}

/** unchanged */
export type LiquidityEvent = {
  poolId: uint64
  caller: Account
  amountA: uint64
  amountB: uint64
  lpAmount: uint64
  reserveA: uint64
  reserveB: uint64
}

export type CustodyEvent = {
  poolId: uint64
  hook: uint64
  point: uint64
  deltaA: uint64
  negA: boolean
  deltaB: uint64
  negB: boolean
  reserveA: uint64
  reserveB: uint64
}

export type ExternalMarkEvent = { poolId: uint64; slot: uint64; units: uint64; rate: uint64; bookValue: uint64 }

/**
 * In-kind receipt payout of one external slot on removeLiquidity / emergencyRemoveLiquidity (§4.4):
 * `units` of the `receipt` ASA paid to `recipient`, carrying `value` (= mulDiv(lp, bookValue, S)) of the
 * slot's booked underlying out of reserveSide. One event per slot with units > 0.
 */
export type ExternalExitEvent = {
  poolId: uint64
  slot: uint64
  receipt: uint64
  recipient: Account
  units: uint64
  value: uint64
}

export type GraduationEvent = {
  poolId: uint64
  tokenIn: uint64
  tokenRetained: uint64
  quoteToTreasury: uint64
  priceX64: bytes<16>
}

import { Account, bytes, uint64 } from '@algorandfoundation/algorand-typescript'

// FROZEN INTERFACE (PluginDex v2, FINAL-SPEC §3.8 and §6 item 9; router.md §4.2). Every type below is
// ARC-4 encoded as a tuple, so field order is part of the immutable ABI. Created in WP0; the router
// contract itself (contract.algo.ts) is WP4's.
//
// Frozen router method signatures (router.md §4.1; implemented by WP4 in contract.algo.ts):
//   @abimethod({ onCreate: 'require' }) create(version: string, dex: Application, registry: Application): void
//   init(payment: gtxn.PaymentTxn): uint64
//   optInLegEscrow(payment: gtxn.PaymentTxn, assets: uint64[]): void
//   opUp(): void
//   swap(wallet: Application, rekeyBack: boolean, assetIn: uint64, assetOut: uint64,
//        minAmountOut: uint64, flags: uint64, legs: Leg[]): uint64
//   swapBest(wallet: Application, rekeyBack: boolean, assetIn: uint64, assetOut: uint64,
//            amountIn: uint64, minAmountOut: uint64, flags: uint64, chunks: uint64,
//            toleranceBps: uint64, candidates: Segment[]): uint64

export type Segment = {
  /** 0 = native PluginDex; otherwise an adapter app id approved in VenueRegistry */
  venue: uint64
  /** asset this segment outputs (the chain is validated by measurement) */
  assetOut: uint64
  /** native only: PluginDex pool ids, 1..MaxRouteHops (4) */
  pools: uint64[]
  /** native only: escrow address of pools[0] (PluginDex validates it; zero for adapters) */
  escrow: Account
  /** native: opaque hook data forwarded to PluginDex; adapter: venueData */
  data: bytes
}

export type Leg = {
  amountIn: uint64
  /** per-leg floor (0 = only the aggregate minAmountOut applies) */
  minAmountOut: uint64
  /** 1..MaxSegments, executed in order; segment k's input is segment k-1's measured output */
  segments: Segment[]
}

/** VenueRegistry value (32 bytes) */
export type AdapterInfo = {
  /** pinned Application.version (callers use rejectVersion = version + 1) */
  version: uint64
  /** AdapterEnabled | AdapterDirectCustody | AdapterExactQuote */
  flags: uint64
  /** max inner txns one swap issues (SDK planning, sanity) */
  innerTxns: uint64
  /** opcode budget to ensure before calling it */
  opBudget: uint64
}

// EVENTS (ARC-28) --------------------------------------------------------------------------------

export type RouteEvent = {
  wallet: uint64
  account: Account
  assetIn: uint64
  amountIn: uint64
  assetOut: uint64
  amountOut: uint64
  legs: uint64
}

export type LegEvent = {
  leg: uint64
  venue: uint64
  holder: Account
  assetIn: uint64
  amountIn: uint64
  assetOut: uint64
  amountOut: uint64
}

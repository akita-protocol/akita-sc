import { uint64 } from '@algorandfoundation/algorand-typescript'

/**
 * CurveResult.hookData of every BinEngine result (FINAL-SPEC §5 WP2 override 4), ABI-encoded (40 B).
 * Hooks receive it as ctx.curveData. Non-swap ops report startId = endId = activeId, binsCrossed = 0.
 */
export type BinHookState = {
  startId: uint64
  endId: uint64
  binsCrossed: uint64
  /** volatility accumulator after the op (LB va) */
  va: uint64
  binStep: uint64
}

/** Outcome of one exact-in traversal (Swap/Quote) */
export type SwapLoop = {
  /** input left unfilled (0 = full fill) */
  rem: uint64
  amountOut: uint64
  lpFee: uint64
  protocolFee: uint64
  endId: uint64
  crossed: uint64
  va: uint64
  /** the end bin's reserves after the traversal (also for Quote, which writes nothing) */
  endX: uint64
  endY: uint64
}

/** The chunk currently loaded by a traversal */
export type ChunkCursor = {
  chunk: uint64
  occupancy: uint64
}

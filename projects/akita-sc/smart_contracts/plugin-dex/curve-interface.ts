import { Account, Application, bytes, Contract, Global, gtxn, loggedAssert, op, uint64 } from '@algorandfoundation/algorand-typescript'
import { CurveSnapshot } from './types'

// FROZEN INTERFACE (PluginDex v2, FINAL-SPEC §3.5): pool-type ("curve") apps.

export type CurveRequest = {
  op: uint64
  poolId: uint64
  /** DEX-attested Txn.sender (position owner); Init: pool creator */
  owner: Account
  /** Add (0 = new position) / Remove */
  positionId: uint64
  /** Swap/Quote direction */
  inIsA: boolean
  /** Settle: true = side A left the pool */
  negA: boolean
  negB: boolean
  /** Swap/Quote: input net of hook fees (exact-in, full fill) */
  amountIn: uint64
  /** Add: deposited; Settle: |delta A| */
  amountA: uint64
  amountB: uint64
  /** Remove (fungible curves): LP burned */
  lpAmount: uint64
  lpSupply: uint64
  /** Swap/Quote: running fee after hooks; Settle: pool.custodyFeeBps */
  feeBps: uint64
  /**
   * pool.maxFeeBps, filled by the Vault on every op. The authoritative cap for any curve-native variable
   * fee (bins: per-bin total ≤ min(MaxFee, maxFeeBps × 1e5)); curves never take it from Init args.
   */
  maxFeeBps: uint64
  protocolFeeBps: uint64
  /** Vault-booked aggregate before the op */
  reserveA: uint64
  reserveB: uint64
  /** Init: PoolConfig.curveArgs; Add/Remove: curve-defined shape */
  args: bytes
}

export type CurveResult = {
  /** Swap/Quote: consumed (must equal req.amountIn) */
  amountIn: uint64
  /** Swap/Quote: output (0 from Quote = no liquidity, never revert) */
  amountOut: uint64
  /** Add: used; Remove: owed to owner */
  amountA: uint64
  amountB: uint64
  /** Swap/Quote: total fee charged on the input (incl. curve-native variable fee) */
  lpFee: uint64
  /** portion of lpFee kept OUT of the curve's reserves */
  protocolFee: uint64
  /** Add: minted; Remove: burned (fungible curves: LP units) */
  shares: uint64
  /** Add: position written */
  positionId: uint64
  /** curve aggregate after the op: MUST equal the Vault's booking */
  reserveA: uint64
  reserveB: uint64
  /** after the op */
  snapshot: CurveSnapshot
  /** CurveFlagClose */
  flags: uint64
  /** funded ops: µALGO kept for boxes (rest already refunded to owner) */
  mbrUsed: uint64
  /** forwarded to hooks as ctx.curveData */
  hookData: bytes
}

/**
 * Static interface of a curve app. Curve obligations (approval checklist + tests):
 * - `Quote` writes nothing and returns exactly what `Swap` would.
 * - Rounding always favours the pool.
 * - Never call the Vault.
 * - `Remove` depends on no other app (it is the emergency path for curve-managed pools).
 * - `Settle` accepts a delta only if it is a feasible trade at `req.feeBps` against the curve, books
 *   the surplus into the curve, and rejects a donation it cannot place.
 * - Freed MBR is refunded to `owner`.
 * - A fungible curve must tolerate a stale state after a Vault-side emergency exit.
 */
export class PluginDexCurve extends Contract {
  /** Swap, Quote, Remove, Settle. Mutating ops require Global.callerApplicationId == vault. */
  akitaDexCurve(req: CurveRequest): CurveResult {
    return emptyCurveResult()
  }

  /**
   * Init, Add: grouped with an MBR payment from the Vault (amount may be 0). The curve measures its
   * minBalance delta, refunds the excess to req.owner with an inner payment, reports mbrUsed.
   */
  akitaDexCurveFunded(mbr: gtxn.PaymentTxn, req: CurveRequest): CurveResult {
    return emptyCurveResult()
  }
}

/** a zeroed CurveResult (helper for curve implementations and mocks) */
export function emptyCurveResult(): CurveResult {
  return {
    amountIn: 0,
    amountOut: 0,
    amountA: 0,
    amountB: 0,
    lpFee: 0,
    protocolFee: 0,
    shares: 0,
    positionId: 0,
    reserveA: 0,
    reserveB: 0,
    snapshot: { priceX64: op.bzero(16).toFixed({ length: 16 }), activeId: 0, liquidity: 0, flags: 0 },
    flags: 0,
    mbrUsed: 0,
    hookData: op.bzero(0),
  }
}

/** Curve apps must only accept mutating requests from their Vault */
export function requireVault(vault: Application): void {
  loggedAssert(Global.callerApplicationId === vault.id, 'errCurveCaller')
}

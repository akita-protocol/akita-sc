import {
  Application,
  BigUint,
  biguint,
  BoxMap,
  Bytes,
  bytes,
  clone,
  Contract,
  contract,
  Global,
  GlobalState,
  gtxn,
  itxn,
  loggedAssert,
  Txn,
  uint64,
} from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod } from '@algorandfoundation/algorand-typescript/arc4'
import { BpsDivisor, CurveOpAdd, CurveOpInit, CurveOpQuote, CurveOpRemove, CurveOpSettle, CurveOpSwap } from '../constants'
import type { CurveRequest, CurveResult, PluginDexCurve } from '../curve-interface'
import { errCurveViolation, errCustodyInvariant, errInvalidInput, errPoolNotFound } from '../errors'
import { mulDiv, mulDivUp, q64One, SignedDelta } from '../math'

/** The part of PoolInfo a curve pool's curve calls read and write */
export type HarnessPool = {
  curve: uint64
  curveVersion: uint64
  reserveA: uint64
  reserveB: uint64
  protocolFeesA: uint64
  protocolFeesB: uint64
  feeBps: uint64
  maxFeeBps: uint64
  custodyFeeBps: uint64
  priceX64: bytes<16>
  activeId: uint64
}

/**
 * Test-only harness for curve apps (FINAL-SPEC §5 WP2): calls `akitaDexCurve` / `akitaDexCurveFunded`
 * exactly as the PluginDex Vault does (request fields, version pinning with rejectVersion, funded MBR
 * payment) and applies the Vault's §4.5 checks and bookings to a pool record. It moves no tokens: the
 * reserves are pure bookkeeping, so tests can drive any amounts.
 *
 * Mirrors contract.algo.ts: `curveRequest`, `callCurve`, `checkSwapResult`, the curve branch of
 * `swapCore`, the curve branch of `bookDelta` (L2 + Settle + direction band), and the createPool Init
 * call. Add/Remove follow the §4.5 table (the Vault's curve-managed liquidity is a WP1 stub).
 */
@contract({ avmVersion: 13 })
export class MockVaultCaller extends Contract {
  poolCursor = GlobalState<uint64>({ key: 'pool_cursor' })
  protocolFeeBps = GlobalState<uint64>({ key: 'protocol_fee_bps' })
  pools = BoxMap<uint64, HarnessPool>({ keyPrefix: 'p' })

  @abimethod({ onCreate: 'require' })
  create(): void {
    this.poolCursor.value = 1
    this.protocolFeeBps.value = 0
  }

  /** resource and budget carrier */
  opUp(): void {}

  setProtocolFee(protocolFeeBps: uint64): void {
    this.protocolFeeBps.value = protocolFeeBps
  }

  @abimethod({ readonly: true })
  getPool(poolId: uint64): HarnessPool {
    loggedAssert(this.pools(poolId).exists, errPoolNotFound)
    return this.pools(poolId).value
  }

  /** createPool's curve branch: pin the version, call the funded Init with `curveMbr`, require (0,0) */
  createPool(
    payment: gtxn.PaymentTxn,
    curve: Application,
    feeBps: uint64,
    maxFeeBps: uint64,
    custodyFeeBps: uint64,
    curveMbr: uint64,
    curveArgs: bytes,
  ): uint64 {
    loggedAssert(payment.receiver === Global.currentApplicationAddress && payment.amount >= curveMbr, errInvalidInput)
    const poolId = this.poolCursor.value
    this.poolCursor.value = poolId + 1
    const pool: HarnessPool = {
      curve: curve.id,
      curveVersion: curve.version,
      reserveA: 0,
      reserveB: 0,
      protocolFeesA: 0,
      protocolFeesB: 0,
      feeBps,
      maxFeeBps,
      custodyFeeBps,
      priceX64: BigUintZero16(),
      activeId: 0,
    }
    const req = this.curveRequest(CurveOpInit, poolId, pool)
    req.args = curveArgs
    const r = abiCall<typeof PluginDexCurve.prototype.akitaDexCurveFunded>({
      appId: curve,
      args: [itxn.payment({ receiver: curve.address, amount: curveMbr }), req],
      rejectVersion: pool.curveVersion + 1,
    }).returnValue
    loggedAssert(r.reserveA === 0 && r.reserveB === 0, errCurveViolation)
    loggedAssert(r.mbrUsed <= curveMbr, errCurveViolation)
    pool.priceX64 = r.snapshot.priceX64
    pool.activeId = r.snapshot.activeId
    this.pools(poolId).value = clone(pool)
    return poolId
  }

  /** swapCore's curve branch (commit): `feeBps` is the running fee after hooks (DynamicFee override) */
  swap(poolId: uint64, inIsA: boolean, amountIn: uint64, feeBps: uint64): CurveResult {
    return this.swapCore(poolId, inIsA, amountIn, feeBps, true)
  }

  /** quoteCore's curve branch; a Quote with amountOut 0 is returned unchecked (tryQuote yields 0) */
  @abimethod({ readonly: true })
  quote(poolId: uint64, inIsA: boolean, amountIn: uint64, feeBps: uint64): CurveResult {
    return this.swapCore(poolId, inIsA, amountIn, feeBps, false)
  }

  /** curve-managed Add (§4.5): used ≤ deposits, reserves + used, P1 == P0, mbrUsed ≤ mbr */
  addLiquidityCurve(mbr: gtxn.PaymentTxn, poolId: uint64, positionId: uint64, amountA: uint64, amountB: uint64, curveArgs: bytes): CurveResult {
    loggedAssert(mbr.receiver === Global.currentApplicationAddress, errInvalidInput)
    const pool = this.loadPool(poolId)
    const req = this.curveRequest(CurveOpAdd, poolId, pool)
    req.positionId = positionId
    req.amountA = amountA
    req.amountB = amountB
    req.args = curveArgs
    const r = abiCall<typeof PluginDexCurve.prototype.akitaDexCurveFunded>({
      appId: pool.curve,
      args: [itxn.payment({ receiver: Application(pool.curve).address, amount: mbr.amount }), req],
      rejectVersion: pool.curveVersion + 1,
    }).returnValue
    loggedAssert(r.amountA <= amountA && r.amountB <= amountB, errCurveViolation)
    loggedAssert(r.reserveA === pool.reserveA + r.amountA && r.reserveB === pool.reserveB + r.amountB, errCurveViolation)
    loggedAssert(r.snapshot.priceX64 === pool.priceX64, errCurveViolation)
    loggedAssert(r.mbrUsed <= mbr.amount, errCurveViolation)
    pool.reserveA = r.reserveA
    pool.reserveB = r.reserveB
    this.pools(poolId).value = clone(pool)
    return r
  }

  /** curve-managed Remove (§4.5): out ≤ reserves, reserves − out, P1 == P0 */
  removeLiquidityCurve(poolId: uint64, positionId: uint64, curveArgs: bytes): CurveResult {
    const pool = this.loadPool(poolId)
    const req = this.curveRequest(CurveOpRemove, poolId, pool)
    req.positionId = positionId
    req.args = curveArgs
    const r = this.callCurve(pool, req)
    loggedAssert(r.amountA <= pool.reserveA && r.amountB <= pool.reserveB, errCurveViolation)
    loggedAssert(r.reserveA === pool.reserveA - r.amountA && r.reserveB === pool.reserveB - r.amountB, errCurveViolation)
    loggedAssert(r.snapshot.priceX64 === pool.priceX64, errCurveViolation)
    pool.reserveA = r.reserveA
    pool.reserveB = r.reserveB
    this.pools(poolId).value = clone(pool)
    return r
  }

  /**
   * The curve branch of the custody guard's `bookDelta` for a measured delta (dA, dB): both negative
   * fails; a loss needs a gain; L2 value floor at the cached spot; Settle at custodyFeeBps; aggregate
   * cross-check; direction band.
   */
  settle(poolId: uint64, amountA: uint64, negA: boolean, amountB: uint64, negB: boolean): CurveResult {
    const pool = this.loadPool(poolId)
    const dA: SignedDelta = { mag: amountA, neg: negA && amountA > 0 }
    const dB: SignedDelta = { mag: amountB, neg: negB && amountB > 0 }
    loggedAssert(!(dA.neg && dB.neg), errCustodyInvariant)
    const mixed = dA.neg || dB.neg
    const gainIsA = !dA.neg
    if (mixed) {
      const gain: uint64 = gainIsA ? dA.mag : dB.mag
      const loss: uint64 = gainIsA ? dB.mag : dA.mag
      loggedAssert(gain > 0 && loss <= (gainIsA ? pool.reserveB : pool.reserveA), errCustodyInvariant)
    }
    const newA: uint64 = dA.neg ? pool.reserveA - dA.mag : pool.reserveA + dA.mag
    const newB: uint64 = dB.neg ? pool.reserveB - dB.mag : pool.reserveB + dB.mag
    const p0: biguint = BigUint(pool.priceX64)
    const one: biguint = q64One()
    if (mixed) {
      loggedAssert(
        BigUint(newA) * p0 + BigUint(newB) * one >= BigUint(pool.reserveA) * p0 + BigUint(pool.reserveB) * one,
        errCustodyInvariant,
      )
    }
    const req = this.curveRequest(CurveOpSettle, poolId, pool)
    req.negA = dA.neg
    req.negB = dB.neg
    req.amountA = dA.mag
    req.amountB = dB.mag
    req.feeBps = pool.custodyFeeBps
    const r = this.callCurve(pool, req)
    loggedAssert(r.reserveA === newA && r.reserveB === newB, errCurveViolation)
    const p1: biguint = BigUint(r.snapshot.priceX64)
    if (mixed) {
      loggedAssert(gainIsA ? p1 <= p0 : p1 >= p0, errCurveViolation)
    }
    pool.priceX64 = r.snapshot.priceX64
    pool.activeId = r.snapshot.activeId
    pool.reserveA = newA
    pool.reserveB = newB
    this.pools(poolId).value = clone(pool)
    return r
  }

  // PRIVATE ---------------------------------------------------------------------------------------

  private loadPool(poolId: uint64): HarnessPool {
    loggedAssert(this.pools(poolId).exists, errPoolNotFound)
    return clone(this.pools(poolId).value)
  }

  /** contract.algo.ts `curveRequest` */
  private curveRequest(curveOp: uint64, poolId: uint64, pool: HarnessPool): CurveRequest {
    return {
      op: curveOp,
      poolId,
      owner: Txn.sender,
      positionId: 0,
      inIsA: true,
      negA: false,
      negB: false,
      amountIn: 0,
      amountA: 0,
      amountB: 0,
      lpAmount: 0,
      lpSupply: 0,
      feeBps: pool.feeBps,
      maxFeeBps: pool.maxFeeBps,
      protocolFeeBps: this.protocolFeeBps.value,
      reserveA: pool.reserveA,
      reserveB: pool.reserveB,
      args: Bytes(''),
    }
  }

  /** contract.algo.ts `callCurve` (version-pinned) */
  private callCurve(pool: HarnessPool, req: CurveRequest): CurveResult {
    return abiCall<typeof PluginDexCurve.prototype.akitaDexCurve>({
      appId: pool.curve,
      args: [req],
      rejectVersion: pool.curveVersion + 1,
    }).returnValue
  }

  private swapCore(poolId: uint64, inIsA: boolean, amountIn: uint64, feeBps: uint64, commit: boolean): CurveResult {
    const pool = this.loadPool(poolId)
    loggedAssert(amountIn > 0 && feeBps <= pool.maxFeeBps, errInvalidInput)
    const rIn = inIsA ? pool.reserveA : pool.reserveB
    const rOut = inIsA ? pool.reserveB : pool.reserveA
    const req = this.curveRequest(commit ? CurveOpSwap : CurveOpQuote, poolId, pool)
    req.inIsA = inIsA
    req.amountIn = amountIn
    req.feeBps = feeBps
    const r = this.callCurve(pool, req)
    if (r.amountOut === 0) {
      loggedAssert(!commit, errCurveViolation)
      return r
    }
    this.checkSwapResult(pool, req, r, rIn, rOut)
    if (commit) {
      if (inIsA) {
        pool.reserveA += amountIn - r.protocolFee
        pool.reserveB -= r.amountOut
        pool.protocolFeesA += r.protocolFee
      } else {
        pool.reserveB += amountIn - r.protocolFee
        pool.reserveA -= r.amountOut
        pool.protocolFeesB += r.protocolFee
      }
      pool.priceX64 = r.snapshot.priceX64
      pool.activeId = r.snapshot.activeId
      this.pools(poolId).value = clone(pool)
    }
    return r
  }

  /** contract.algo.ts `checkSwapResult` (§4.5 Swap/Quote) */
  private checkSwapResult(pool: HarnessPool, req: CurveRequest, r: CurveResult, rIn: uint64, rOut: uint64): void {
    loggedAssert(r.amountIn === req.amountIn && r.amountOut < rOut, errCurveViolation)
    loggedAssert(r.lpFee <= mulDivUp(req.amountIn, pool.maxFeeBps, BpsDivisor), errCurveViolation)
    loggedAssert(mulDiv(r.lpFee, req.protocolFeeBps, BpsDivisor) <= r.protocolFee && r.protocolFee <= r.lpFee, errCurveViolation)
    const newIn: uint64 = rIn + req.amountIn - r.protocolFee
    const newOut: uint64 = rOut - r.amountOut
    if (req.inIsA) {
      loggedAssert(r.reserveA === newIn && r.reserveB === newOut, errCurveViolation)
    } else {
      loggedAssert(r.reserveB === newIn && r.reserveA === newOut, errCurveViolation)
    }
    const p0: biguint = BigUint(pool.priceX64)
    const p1: biguint = BigUint(r.snapshot.priceX64)
    const one: biguint = q64One()
    const net: biguint = BigUint(req.amountIn - r.lpFee)
    if (req.inIsA) {
      loggedAssert(BigUint(r.amountOut) * one <= net * p0 + one && p1 <= p0, errCurveViolation)
    } else {
      loggedAssert(BigUint(r.amountOut) * p0 <= net * one + p0 && p1 >= p0, errCurveViolation)
    }
  }
}

function BigUintZero16(): bytes<16> {
  return Bytes.fromHex('00000000000000000000000000000000').toFixed({ length: 16 })
}

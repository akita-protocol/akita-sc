import {
  Account,
  Application,
  BigUint,
  biguint,
  BoxMap,
  Bytes,
  bytes,
  clone,
  Contract,
  Global,
  GlobalState,
  gtxn,
  itxn,
  loggedAssert,
  op,
  Txn,
  uint64,
} from '@algorandfoundation/algorand-typescript'
import { abimethod } from '@algorandfoundation/algorand-typescript/arc4'
import {
  BpsDivisor,
  CurveFlagClose,
  CurveOpAdd,
  CurveOpInit,
  CurveOpQuote,
  CurveOpRemove,
  CurveOpSettle,
  CurveOpSwap,
  LpModeFungible,
  MinimumLiquidity,
} from '../constants'
import { CurveRequest, CurveResult, requireVault } from '../curve-interface'
import { mulDiv, mulDivUp, priceX64, q64One, sqrtProduct, toX64 } from '../math'

// Honest constant-product curve app for the Vault's curve slot (FINAL-SPEC §4.12 test 13), plus every
// evil mode the §4.5 checks and the §4.6 L2 floor must catch. Test-only.

/** honest constant product: the native Vault math, byte for byte */
export const CurveModeHonest: uint64 = 0
/** Swap/Quote: the reported out-side reserve is 1 unit too high (aggregate cross-check) */
export const CurveModeWrongAggregate: uint64 = 1
/** Swap/Quote: pays floor(net·P0) + 2, a fill better than the price band allows */
export const CurveModeBetterThanBand: uint64 = 2
/** Swap/Quote: honest fill, but the new price is on the wrong side of P0 */
export const CurveModePriceWrongSide: uint64 = 3
/** Swap/Quote: lpFee = ceil(in·maxFeeBps) + 1 */
export const CurveModeLpFeeAboveMax: uint64 = 4
/** Swap/Quote: protocolFee = floor(lpFee·protocolFeeBps) − 1 */
export const CurveModeProtocolFeeBelowFloor: uint64 = 5
/** Add (fungible): one share above the LP mint bound */
export const CurveModeOverMint: uint64 = 6
/** Add: the price moves by one Q64 unit */
export const CurveModeAddMovesPrice: uint64 = 7
/** Init: reports reserveA = 1 */
export const CurveModeInitNonZero: uint64 = 8
/** Settle: accepts any delta (no feasibility check), so only the Vault's L2 floor protects LPs */
export const CurveModePermissiveSettle: uint64 = 9
/** every op reverts (a dead curve: the emergency exit must not depend on it) */
export const CurveModeRevertAll: uint64 = 10
/** Quote returns amountOut 0 (no liquidity); Swap is honest */
export const CurveModeQuoteZero: uint64 = 11
/** Swap: honest, and the result carries CurveFlagClose */
export const CurveModeClose: uint64 = 12
/** honest, but every op burns the pooled opcode budget down to BurnFloor before returning */
export const CurveModeBurnBudget: uint64 = 13
/** Remove: pays one unit of A more than its share (reserves consistent with the overpayment) */
export const CurveModeRemoveOverpay: uint64 = 14
/** Remove: the price moves by one Q64 unit */
export const CurveModeRemoveMovesPrice: uint64 = 15
/** Settle: the new price is one unit above the pre-call price (wrong side when the pool gained A) */
export const CurveModeSettleWrongSide: uint64 = 16
/** Settle: the reported B reserve is one unit above the Vault's post-delta booking */
export const CurveModeSettleWrongAggregate: uint64 = 17

/** opcodes CurveModeBurnBudget leaves for the rest of the curve call and the Vault */
const BurnFloor: uint64 = 100

const errRevert = 'errMcrv'
const errOp = 'errMcop'
const errMbr = 'errMcmb'
const errPosition = 'errMcps'
const errArgs = 'errMcar'
/** a Settle the curve cannot accept: the Vault's custody guard code (FINAL-SPEC §3.3) */
const errSettle = 'errPdki'

/** per-pool curve state. Reserves are not stored: the Vault's booked reserves (req.reserveA/B) are the truth */
export type MockCurvePool = {
  priceX64: bytes<16>
  /** LpModeCurve: total position shares */
  totalShares: uint64
  swaps: uint64
  settles: uint64
}

export type MockCurvePosition = {
  poolId: uint64
  owner: Account
  shares: uint64
}

/**
 * Constant-product curve app (FINAL-SPEC §3.5) in either LP mode, fixed at creation:
 * - LpModeFungible: the Vault mints LP; Add/Remove use req.lpSupply exactly like the native pool.
 * - LpModeCurve: positions (shares) live here; Add creates or tops up a position owned by req.owner.
 * Init args: initA u64 ‖ initB u64 (the initial price B per A). The cached price moves only on Swap and
 * Settle, so Add and Remove leave it unchanged (§4.5 `P1 == P0`); the first deposit is taken at that price.
 */
export class MockCurve extends Contract {
  vault = GlobalState<Application>({ key: 'vault' })
  lpMode = GlobalState<uint64>({ key: 'lp_mode' })
  mode = GlobalState<uint64>({ key: 'mode' })
  lastOp = GlobalState<uint64>({ key: 'last_op' })
  lastPoolId = GlobalState<uint64>({ key: 'last_pool' })
  positionCursor = GlobalState<uint64>({ key: 'position_cursor' })

  pools = BoxMap<uint64, MockCurvePool>({ keyPrefix: 'p' })
  positions = BoxMap<uint64, MockCurvePosition>({ keyPrefix: 'q' })

  @abimethod({ onCreate: 'require' })
  create(vault: Application, lpMode: uint64): void {
    this.vault.value = vault
    this.lpMode.value = lpMode
    this.mode.value = CurveModeHonest
    this.lastOp.value = 0
    this.lastPoolId.value = 0
    this.positionCursor.value = 0
  }

  /** creator-only code update; bumps Application.version (pinning tests) */
  @abimethod({ allowActions: 'UpdateApplication' })
  update(): void {
    loggedAssert(Txn.sender === Global.creatorAddress, 'errMcnc')
  }

  setMode(mode: uint64): void {
    this.mode.value = mode
  }

  @abimethod({ readonly: true })
  getPoolState(poolId: uint64): MockCurvePool {
    return clone(this.pools(poolId).value)
  }

  @abimethod({ readonly: true })
  getPosition(positionId: uint64): MockCurvePosition {
    return clone(this.positions(positionId).value)
  }

  // CURVE INTERFACE --------------------------------------------------------------------------------

  akitaDexCurve(req: CurveRequest): CurveResult {
    loggedAssert(this.mode.value !== CurveModeRevertAll, errRevert)
    let r: CurveResult
    if (req.op === CurveOpQuote) {
      r = this.swapOp(req, false)
    } else {
      requireVault(this.vault.value)
      this.record(req)
      if (req.op === CurveOpSwap) {
        r = this.swapOp(req, true)
      } else if (req.op === CurveOpRemove) {
        r = this.removeOp(req)
      } else {
        loggedAssert(req.op === CurveOpSettle, errOp)
        r = this.settleOp(req)
      }
    }
    this.burn()
    return r
  }

  /** CurveModeBurnBudget: spend the pooled opcode budget, like a curve that uses all of its allotment */
  private burn(): void {
    if (this.mode.value === CurveModeBurnBudget) {
      while (Global.opcodeBudget > BurnFloor) {
        op.sha256(op.itob(Global.opcodeBudget))
      }
    }
  }

  akitaDexCurveFunded(mbr: gtxn.PaymentTxn, req: CurveRequest): CurveResult {
    loggedAssert(this.mode.value !== CurveModeRevertAll, errRevert)
    requireVault(this.vault.value)
    loggedAssert(mbr.receiver === Global.currentApplicationAddress, errMbr)
    this.record(req)
    const before = Global.currentApplicationAddress.minBalance
    let r: CurveResult
    if (req.op === CurveOpInit) {
      r = this.initOp(req)
    } else {
      loggedAssert(req.op === CurveOpAdd, errOp)
      r = this.addOp(req)
    }
    const after = Global.currentApplicationAddress.minBalance
    const used: uint64 = after > before ? after - before : 0
    loggedAssert(mbr.amount >= used, errMbr)
    if (mbr.amount > used) {
      itxn.payment({ receiver: req.owner, amount: mbr.amount - used }).submit()
    }
    r.mbrUsed = used
    this.burn()
    return r
  }

  // OPS --------------------------------------------------------------------------------------------

  private record(req: CurveRequest): void {
    this.lastOp.value = req.op
    this.lastPoolId.value = req.poolId
  }

  private result(
    amountA: uint64,
    amountB: uint64,
    shares: uint64,
    positionId: uint64,
    reserveA: uint64,
    reserveB: uint64,
    price: bytes<16>,
  ): CurveResult {
    return {
      amountIn: 0,
      amountOut: 0,
      amountA,
      amountB,
      lpFee: 0,
      protocolFee: 0,
      shares,
      positionId,
      reserveA,
      reserveB,
      snapshot: { priceX64: price, activeId: 0, liquidity: reserveB, flags: 0 },
      flags: 0,
      mbrUsed: 0,
      hookData: op.itob(positionId),
    }
  }

  private initOp(req: CurveRequest): CurveResult {
    loggedAssert(!this.pools(req.poolId).exists && req.args.length === 16, errArgs)
    const initA = op.extractUint64(req.args, 0)
    const initB = op.extractUint64(req.args, 8)
    loggedAssert(initA > 0 && initB > 0, errArgs)
    const price = priceX64(initA, initB)
    this.pools(req.poolId).value = { priceX64: price, totalShares: 0, swaps: 0, settles: 0 }
    const reserveA: uint64 = this.mode.value === CurveModeInitNonZero ? 1 : 0
    return this.result(0, 0, 0, 0, reserveA, 0, price)
  }

  /** exact-in constant product on the Vault's booked reserves (native formulas) */
  private swapOp(req: CurveRequest, commit: boolean): CurveResult {
    const pool = clone(this.pools(req.poolId).value)
    const mode = this.mode.value
    const rIn: uint64 = req.inIsA ? req.reserveA : req.reserveB
    const rOut: uint64 = req.inIsA ? req.reserveB : req.reserveA
    const net = req.amountIn

    let lpFee = mulDiv(net, req.feeBps, BpsDivisor)
    if (mode === CurveModeLpFeeAboveMax) {
      lpFee = mulDivUp(net, req.maxFeeBps, BpsDivisor) + 1
    }
    let protocolFee = mulDiv(lpFee, req.protocolFeeBps, BpsDivisor)
    if (mode === CurveModeProtocolFeeBelowFloor) {
      protocolFee = protocolFee - 1
    }
    const effective: uint64 = net - lpFee
    let out: uint64 = 0
    if (rIn + effective > 0) {
      out = mulDiv(effective, rOut, rIn + effective)
    }
    if (mode === CurveModeBetterThanBand) {
      const p0 = BigUint(pool.priceX64)
      const fair: biguint = req.inIsA ? (BigUint(effective) * p0) / q64One() : (BigUint(effective) * q64One()) / p0
      out = op.btoi(Bytes(fair)) + 2
    }

    const r = this.result(0, 0, 0, 0, 0, 0, pool.priceX64)
    r.amountIn = net
    if (out === 0 || out >= rOut || (mode === CurveModeQuoteZero && !commit)) {
      // no liquidity: Quote returns 0 and never reverts
      return r
    }

    const newIn: uint64 = rIn + net - protocolFee
    let newOut: uint64 = rOut - out
    if (mode === CurveModeWrongAggregate) {
      newOut += 1
    }
    const reserveA = req.inIsA ? newIn : newOut
    const reserveB = req.inIsA ? newOut : newIn
    let price = priceX64(reserveA, reserveB)
    if (mode === CurveModePriceWrongSide) {
      const p0 = BigUint(pool.priceX64)
      price = req.inIsA ? toX64(p0 + BigUint(1)) : toX64(p0 - BigUint(1))
    }

    if (commit) {
      pool.priceX64 = price
      pool.swaps += 1
      this.pools(req.poolId).value = clone(pool)
    }
    r.amountOut = out
    r.lpFee = lpFee
    r.protocolFee = protocolFee
    r.reserveA = reserveA
    r.reserveB = reserveB
    r.snapshot = { priceX64: price, activeId: 0, liquidity: reserveB, flags: 0 }
    r.flags = commit && mode === CurveModeClose ? CurveFlagClose : 0
    r.hookData = op.itob(req.poolId)
    return r
  }

  /** deposits at the current price; native LP math (fungible) or position shares (curve mode) */
  private addOp(req: CurveRequest): CurveResult {
    const pool = clone(this.pools(req.poolId).value)
    const fungible = this.lpMode.value === LpModeFungible
    const supply: uint64 = fungible ? req.lpSupply : pool.totalShares
    const rA = req.reserveA
    const rB = req.reserveB

    let usedA = req.amountA
    let usedB = req.amountB
    let shares: uint64 = 0
    if (supply === 0) {
      // first deposit: at the cached price, rounding in the pool's favour
      const p = BigUint(pool.priceX64)
      const needB = op.btoi(Bytes((BigUint(usedA) * p + q64One() - BigUint(1)) / q64One()))
      if (needB <= usedB) {
        usedB = needB
      } else {
        usedA = op.btoi(Bytes((BigUint(usedB) * q64One()) / p))
      }
      shares = sqrtProduct(usedA, usedB)
      if (fungible) {
        loggedAssert(shares > MinimumLiquidity, errArgs)
        shares = shares - MinimumLiquidity
      }
    } else {
      loggedAssert(rA > 0 && rB > 0, errArgs)
      const fromA = mulDiv(usedA, supply, rA)
      const fromB = mulDiv(usedB, supply, rB)
      if (fromA <= fromB) {
        shares = fromA
        const needB = mulDivUp(usedA, rB, rA)
        usedB = needB < usedB ? needB : usedB
      } else {
        shares = fromB
        const needA = mulDivUp(usedB, rA, rB)
        usedA = needA < usedA ? needA : usedA
      }
    }
    if (this.mode.value === CurveModeOverMint) {
      shares += 1
    }

    let positionId: uint64 = 0
    if (!fungible) {
      positionId = req.positionId
      if (positionId === 0) {
        positionId = this.positionCursor.value + 1
        this.positionCursor.value = positionId
        this.positions(positionId).value = { poolId: req.poolId, owner: req.owner, shares }
      } else {
        const position = clone(this.positions(positionId).value)
        loggedAssert(position.owner === req.owner && position.poolId === req.poolId, errPosition)
        position.shares += shares
        this.positions(positionId).value = clone(position)
      }
      pool.totalShares += shares
      this.pools(req.poolId).value = clone(pool)
    }

    let price = pool.priceX64
    if (this.mode.value === CurveModeAddMovesPrice) {
      price = toX64(BigUint(price) + BigUint(1))
    }
    return this.result(usedA, usedB, shares, positionId, rA + usedA, rB + usedB, price)
  }

  /**
   * Fungible: burn req.lpAmount of req.lpSupply. Curve mode: owner-checked; args = shares u64 (empty =
   * the whole position); a fully burned position is deleted and its MBR refunded to the owner.
   */
  private removeOp(req: CurveRequest): CurveResult {
    const pool = clone(this.pools(req.poolId).value)
    let burn = req.lpAmount
    let supply = req.lpSupply
    if (this.lpMode.value !== LpModeFungible) {
      const position = clone(this.positions(req.positionId).value)
      loggedAssert(position.owner === req.owner && position.poolId === req.poolId, errPosition)
      burn = req.args.length === 8 ? op.extractUint64(req.args, 0) : position.shares
      loggedAssert(burn > 0 && burn <= position.shares, errArgs)
      supply = pool.totalShares
      pool.totalShares -= burn
      this.pools(req.poolId).value = clone(pool)
      if (burn === position.shares) {
        const before = Global.currentApplicationAddress.minBalance
        this.positions(req.positionId).delete()
        itxn.payment({ receiver: req.owner, amount: before - Global.currentApplicationAddress.minBalance }).submit()
      } else {
        position.shares -= burn
        this.positions(req.positionId).value = clone(position)
      }
    }
    let amountA = mulDiv(burn, req.reserveA, supply)
    const amountB = mulDiv(burn, req.reserveB, supply)
    if (this.mode.value === CurveModeRemoveOverpay) {
      amountA += 1
    }
    let price = pool.priceX64
    if (this.mode.value === CurveModeRemoveMovesPrice) {
      price = toX64(BigUint(price) + BigUint(1))
    }
    return this.result(amountA, amountB, burn, req.positionId, req.reserveA - amountA, req.reserveB - amountB, price)
  }

  /**
   * Accept a custody delta only if it is a trade at least as good as one paying req.feeBps (the native
   * fee-adjusted k check), or a donation to a pool with liquidity on both sides; book it; reprice.
   */
  private settleOp(req: CurveRequest): CurveResult {
    const pool = clone(this.pools(req.poolId).value)
    const rA = req.reserveA
    const rB = req.reserveB
    loggedAssert(!req.negA || rA >= req.amountA, errSettle)
    loggedAssert(!req.negB || rB >= req.amountB, errSettle)
    const newA: uint64 = req.negA ? rA - req.amountA : rA + req.amountA
    const newB: uint64 = req.negB ? rB - req.amountB : rB + req.amountB
    const p0 = pool.priceX64

    if (this.mode.value !== CurveModePermissiveSettle) {
      if (req.negA || req.negB) {
        const gainIsA = req.negB
        const gain = gainIsA ? req.amountA : req.amountB
        const loss = gainIsA ? req.amountB : req.amountA
        const eGain = gainIsA ? rA : rB
        const eLoss = gainIsA ? rB : rA
        const fee = mulDivUp(gain, req.feeBps, BpsDivisor)
        loggedAssert(BigUint(eGain + gain - fee) * BigUint(eLoss - loss) >= BigUint(eGain) * BigUint(eLoss), errSettle)
      } else {
        loggedAssert(rA > 0 && rB > 0, errSettle)
      }
    }

    if (newA > 0) {
      pool.priceX64 = priceX64(newA, newB)
    }
    if (this.mode.value === CurveModeSettleWrongSide) {
      pool.priceX64 = toX64(BigUint(p0) + BigUint(1))
    }
    pool.settles += 1
    this.pools(req.poolId).value = clone(pool)
    const reportedB: uint64 = this.mode.value === CurveModeSettleWrongAggregate ? newB + 1 : newB
    return this.result(0, 0, 0, 0, newA, reportedB, pool.priceX64)
  }
}

/** the same curve with a trivially different program, so an update bumps Application.version */
export class MockCurveV2 extends MockCurve {
  @abimethod({ readonly: true })
  codeVersion(): uint64 {
    return 2
  }
}

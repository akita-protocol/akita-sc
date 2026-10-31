import {
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
  loggedAssert,
  op,
  uint64,
} from '@algorandfoundation/algorand-typescript'
import { abimethod } from '@algorandfoundation/algorand-typescript/arc4'
import { BpsDivisor, HookPointAfterSwap, HookPointPoke, HookResultSetFee, MaxPoolFeeCapBps } from '../constants'
import { passResult, requireDexCaller } from '../hook-interface'
import { priceX64, q64One } from '../math'
import { HookContext, HookResult } from '../types'

/** varFeeBps = A · v² / FeeScale (Trader Joe LB v2.1 units with v in bps of price move) */
const FeeScale: uint64 = 100_000_000
/** upper bound on max_vol (bps of price move) */
const MaxVolatilityBps: uint64 = 100_000
/** byte offset of `binStep` in the bins curve's ABI-encoded BinHookState {startId, endId, binsCrossed, va, binStep} */
const BinStepOffset: uint64 = 32

const errBadParams = 'errVfpm'
const errStateExists = 'errVfex'
const errBadMbr = 'errVfmb'

/**
 * Per-pool volatility state (box `v‖poolId`, 80 B). Prices are Q64.64 (B per A). `refId`/`lastId` and
 * `binStep` are used only on curve pools that report an active bin (bins: `|Δid|·binStep`).
 */
export type VolState = {
  /** reference price (LB idReference) */
  refPrice: bytes<16>
  /** price after the last AfterSwap/Poke; promoted to the reference once a filter period passes */
  lastPrice: bytes<16>
  refId: uint64
  lastId: uint64
  /** bin step in bps learned from the curve's hook data (0 = price mode) */
  binStep: uint64
  /** volatility reference, bps of price move (LB volatilityReference) */
  vRef: uint64
  /** volatility accumulator after the last recorded swap (LB volatilityAccumulator) */
  vAcc: uint64
  /** Global.latestTimestamp of the last record; 0 = not seeded */
  tLast: uint64
}

type Refreshed = { refPrice: bytes<16>; refId: uint64; vRef: uint64 }
type Position = { price: bytes<16>; id: uint64; binStep: uint64 }

/**
 * VolatilityFeeHook: a DynamicFee hook that charges `base + A·v²` where `v` is the realized volatility
 * in bps of price move, ported from the Trader Joe Liquidity Book v2.1 variable fee (research/lvr.md §2,
 * FINAL-SPEC §5 WP3).
 *
 * - Points: BeforeSwap | AfterSwap | Quote | Poke. Permission: DynamicFee.
 * - BeforeSwap and Quote share one read-only path, so quote == swap for the same block and pool state.
 *   AfterSwap and Poke are the only writes.
 * - Only AfterSwap advances the accumulator (tLast, the reference, vRef, vAcc), as LB does on swaps. Poke is
 *   permissionless, so it only seeds an unseeded box and refreshes `lastPrice`/`lastId` to the current
 *   price (the price the next reference refresh promotes); it never moves the clock or decays vRef, so
 *   repeated pokes cannot suppress the variable fee.
 * - Native pools measure the move at the trade's midpoint on effective reserves. Curve pools that report
 *   an active bin use `|activeId − refId|·binStep` (the bin step comes from the curve's hook data);
 *   other curve pools compare the cached Q64.64 spot.
 * - One deployment per preset; parameters are immutable. The hook only adds to the running fee: it returns
 *   `max(ctx.feeBps, min(ctx.feeBps + varFee, max_fee))`, so `max_fee` (≤ MaxPoolFeeCapBps) clamps its own
 *   contribution and never lowers a fee set by an earlier hook. The Vault separately enforces
 *   pool.maxFeeBps, so pools using this hook must be created with maxFeeBps ≥ max_fee.
 * - Never reverts on valid input: every subtraction is guarded, a missing box degrades to base fee plus
 *   the trade's own impact.
 */
export class VolatilityFeeHook extends Contract {
  dex = GlobalState<Application>({ key: 'dex' })
  /** filterPeriod, seconds: swaps closer than this share a reference */
  filter = GlobalState<uint64>({ key: 'filter' })
  /** decayPeriod, seconds: after this much quiet the volatility reference resets to 0 */
  decay = GlobalState<uint64>({ key: 'decay' })
  /** reduction factor R, bps of vAcc carried into vRef after a filter period */
  reduction = GlobalState<uint64>({ key: 'reduction' })
  /** variable fee control A (LB variableFeeControl) */
  control = GlobalState<uint64>({ key: 'control' })
  /** cap on v, bps of price move */
  maxVol = GlobalState<uint64>({ key: 'max_vol' })
  /** cap on the total fee returned, bps */
  maxFee = GlobalState<uint64>({ key: 'max_fee' })

  states = BoxMap<uint64, VolState>({ keyPrefix: 'v' })

  @abimethod({ onCreate: 'require' })
  create(dex: Application, filter: uint64, decay: uint64, reduction: uint64, control: uint64, maxVol: uint64, maxFee: uint64): void {
    loggedAssert(filter < decay, errBadParams)
    loggedAssert(reduction <= BpsDivisor, errBadParams)
    loggedAssert(maxVol <= MaxVolatilityBps, errBadParams)
    loggedAssert(maxFee <= MaxPoolFeeCapBps, errBadParams)
    // A · maxVol² must fit in uint64 so the variable fee never overflows
    const [sqHigh, sq] = op.mulw(maxVol, maxVol)
    const [prodHigh] = op.mulw(control, sq)
    loggedAssert(sqHigh === 0 && prodHigh === 0, errBadParams)

    this.dex.value = dex
    this.filter.value = filter
    this.decay.value = decay
    this.reduction.value = reduction
    this.control.value = control
    this.maxVol.value = maxVol
    this.maxFee.value = maxFee
  }

  /** Permissionless: create the zeroed state box for a pool; the payment covers its MBR. The first record seeds it. */
  initPool(mbr: gtxn.PaymentTxn, poolId: uint64): void {
    loggedAssert(!this.states(poolId).exists, errStateExists)
    const before = Global.currentApplicationAddress.minBalance
    this.states(poolId).value = {
      refPrice: op.bzero(16).toFixed({ length: 16 }),
      lastPrice: op.bzero(16).toFixed({ length: 16 }),
      refId: 0,
      lastId: 0,
      binStep: 0,
      vRef: 0,
      vAcc: 0,
      tLast: 0,
    }
    loggedAssert(mbr.receiver === Global.currentApplicationAddress, errBadMbr)
    loggedAssert(mbr.amount >= Global.currentApplicationAddress.minBalance - before, errBadMbr)
  }

  @abimethod({ readonly: true })
  getState(poolId: uint64): VolState {
    if (!this.states(poolId).exists) {
      return {
        refPrice: op.bzero(16).toFixed({ length: 16 }),
        lastPrice: op.bzero(16).toFixed({ length: 16 }),
        refId: 0,
        lastId: 0,
        binStep: 0,
        vRef: 0,
        vAcc: 0,
        tLast: 0,
      }
    }
    return clone(this.states(poolId).value)
  }

  akitaDexHook(dex: Application, hookIndex: uint64, ctx: HookContext): HookResult {
    requireDexCaller(this.dex.value)
    if (ctx.point === HookPointAfterSwap) {
      this.record(ctx)
      return passResult()
    }
    if (ctx.point === HookPointPoke) {
      this.observe(ctx)
      return passResult()
    }
    // BeforeSwap and Quote: one read-only path
    return { flags: HookResultSetFee, feeBps: this.fee(ctx), hookFee: 0, hookFeeOutBps: 0 }
  }

  // PRIVATE ----------------------------------------------------------------------------------------

  /** pure function of stored state and time (LB updateReferences) */
  private refresh(s: VolState): Refreshed {
    const now = Global.latestTimestamp
    const dt: uint64 = now > s.tLast ? now - s.tLast : 0
    if (dt < this.filter.value) {
      return { refPrice: s.refPrice, refId: s.refId, vRef: s.vRef }
    }
    const vRef: uint64 = dt >= this.decay.value ? 0 : op.divw(...op.mulw(s.vAcc, this.reduction.value), BpsDivisor)
    return { refPrice: s.lastPrice, refId: s.lastId, vRef }
  }

  /** |n/d − 1| in bps for the ratio n/d, as max/min − 1 (symmetric in log space), capped at max_vol */
  private devRatio(n: biguint, d: biguint): uint64 {
    const zero = BigUint(0)
    if (n === zero || d === zero) {
      return 0
    }
    let hi = n
    let lo = d
    if (d > n) {
      hi = d
      lo = n
    }
    const dev: biguint = ((hi - lo) * BigUint(BpsDivisor)) / lo
    const cap = this.maxVol.value
    return dev > BigUint(cap) ? cap : op.btoi(Bytes(dev))
  }

  /** |id − refId| · binStep, capped at max_vol (overflow-safe) */
  private devId(id: uint64, refId: uint64, binStep: uint64): uint64 {
    const dist: uint64 = id > refId ? id - refId : refId - id
    const [high, low] = op.mulw(dist, binStep)
    const cap = this.maxVol.value
    return high !== 0 || low > cap ? cap : low
  }

  private capVol(v: uint64): uint64 {
    return v > this.maxVol.value ? this.maxVol.value : v
  }

  /** `running + ceil(A·v²/1e8)` clamped to max_fee (never below the running fee), v at the trade's midpoint */
  private fee(ctx: HookContext): uint64 {
    const inIsA = ctx.assetIn < ctx.assetOut
    const rA: uint64 = inIsA ? ctx.reserveIn : ctx.reserveOut
    const rB: uint64 = inIsA ? ctx.reserveOut : ctx.reserveIn

    let seeded = false
    let s: VolState = {
      refPrice: ctx.before.priceX64,
      lastPrice: ctx.before.priceX64,
      refId: ctx.before.activeId,
      lastId: ctx.before.activeId,
      binStep: 0,
      vRef: 0,
      vAcc: 0,
      tLast: 0,
    }
    if (this.states(ctx.poolId).exists) {
      const stored = clone(this.states(ctx.poolId).value)
      if (stored.tLast !== 0) {
        s = clone(stored)
        seeded = true
      }
    }
    // unseeded: reference = the pre-trade price, no history (still identical at Quote and BeforeSwap)
    let ref: Refreshed = { refPrice: s.refPrice, refId: s.refId, vRef: 0 }
    if (seeded) {
      ref = this.refresh(s)
    }

    let dev: uint64 = 0
    if (ctx.curve === 0) {
      // effective reserves halfway through this trade (fees ignored)
      const half: uint64 = ctx.amountIn / 2
      let mA = rA
      let mB = rB
      if (inIsA) {
        mA = rA + half
        mB = rB - op.divw(...op.mulw(half, rB), rA + half)
      } else {
        mB = rB + half
        mA = rA - op.divw(...op.mulw(half, rA), rB + half)
      }
      // (mB / mA) / ref = (mB · 2^64) / (mA · ref)
      dev = this.devRatio(BigUint(mB) * q64One(), BigUint(mA) * BigUint(ref.refPrice))
    } else if (s.binStep !== 0) {
      dev = this.devId(ctx.before.activeId, ref.refId, s.binStep)
    } else {
      dev = this.devRatio(BigUint(ctx.before.priceX64), BigUint(ref.refPrice))
    }

    const v = this.capVol(ref.vRef + dev)
    // A · v² < 2^64 by the create bound (v ≤ max_vol)
    const cvv: uint64 = this.control.value * v * v
    const varFee: uint64 = cvv / FeeScale + (cvv % FeeScale !== 0 ? 1 : 0)
    // max_fee clamps only this hook's contribution: a running fee already at or above it (an earlier
    // AntiSnipe or ImpactFee) is passed through unchanged, never lowered
    const cap = this.maxFee.value
    if (ctx.feeBps >= cap) {
      return ctx.feeBps
    }
    return varFee >= cap - ctx.feeBps ? cap : ctx.feeBps + varFee
  }

  /** the pool's current position for a record: Q64.64 price, active id (curve pools) and the bin step */
  private position(ctx: HookContext, s: VolState): Position {
    // native pools use the live effective reserves of this hook's context, which already include any
    // earlier custody hook's change at this point (ctx.after is not refreshed between hooks)
    if (ctx.curve === 0) {
      const inIsA = ctx.assetIn < ctx.assetOut
      return {
        price: inIsA ? priceX64(ctx.reserveIn, ctx.reserveOut) : priceX64(ctx.reserveOut, ctx.reserveIn),
        id: 0,
        binStep: s.binStep,
      }
    }
    let binStep = s.binStep
    if (ctx.curveData.length >= BinStepOffset + 8) {
      binStep = op.extractUint64(ctx.curveData, BinStepOffset)
    }
    return { price: ctx.after.priceX64, id: ctx.after.activeId, binStep }
  }

  /** first record of a box: reference = last = the current position, no history */
  private seed(poolId: uint64, cur: Position): void {
    this.states(poolId).value = {
      refPrice: cur.price,
      lastPrice: cur.price,
      refId: cur.id,
      lastId: cur.id,
      binStep: cur.binStep,
      vRef: 0,
      vAcc: 0,
      tLast: Global.latestTimestamp,
    }
  }

  /** AfterSwap: seeds an initialized box, then tracks the LB accumulator */
  private record(ctx: HookContext): void {
    if (!this.states(ctx.poolId).exists) {
      return
    }
    const s = clone(this.states(ctx.poolId).value)
    const cur = this.position(ctx, s)
    if (s.tLast === 0) {
      this.seed(ctx.poolId, cur)
      return
    }

    const ref = this.refresh(s)
    let dev: uint64 = 0
    if (ctx.curve !== 0 && cur.binStep !== 0) {
      dev = this.devId(cur.id, ref.refId, cur.binStep)
    } else {
      dev = this.devRatio(BigUint(cur.price), BigUint(ref.refPrice))
    }
    this.states(ctx.poolId).value = {
      refPrice: ref.refPrice,
      lastPrice: cur.price,
      refId: ref.refId,
      lastId: cur.id,
      binStep: cur.binStep,
      vRef: ref.vRef,
      vAcc: this.capVol(ref.vRef + dev),
      tLast: Global.latestTimestamp,
    }
  }

  /**
   * Poke (permissionless): seeds an initialized box; on a seeded box only refreshes the last observed
   * position, so the next reference refresh promotes the current price. tLast, the reference, vRef and
   * vAcc move only on swaps: pokes cannot freeze the reference or decay the accumulator.
   */
  private observe(ctx: HookContext): void {
    if (!this.states(ctx.poolId).exists) {
      return
    }
    const s = clone(this.states(ctx.poolId).value)
    const cur = this.position(ctx, s)
    if (s.tLast === 0) {
      this.seed(ctx.poolId, cur)
      return
    }
    this.states(ctx.poolId).value = {
      refPrice: s.refPrice,
      lastPrice: cur.price,
      refId: s.refId,
      lastId: cur.id,
      binStep: cur.binStep,
      vRef: s.vRef,
      vAcc: s.vAcc,
      tLast: s.tLast,
    }
  }
}

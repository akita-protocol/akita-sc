import {
  Account,
  Application,
  BigUint,
  biguint,
  Bytes,
  bytes,
  Contract,
  contract,
  ensureBudget,
  Global,
  GlobalState,
  gtxn,
  itxn,
  loggedAssert,
  op,
  OpUpFeeSource,
  Txn,
  uint64,
  Uint64,
} from '@algorandfoundation/algorand-typescript'
import { abimethod, encodeArc4 } from '@algorandfoundation/algorand-typescript/arc4'
import { BpsDivisor, CurveOpAdd, CurveOpInit, CurveOpQuote, CurveOpRemove, CurveOpSettle, CurveOpSwap } from '../../constants'
import { CurveRequest, CurveResult, requireVault } from '../../curve-interface'
import { errCustodyInvariant } from '../../errors'
import { q64One } from '../../math'
import {
  AddBinBudget,
  BinBudget,
  BinsPerChunk,
  BitmapWords,
  BpsToPpb,
  ChunkBoxSize,
  ChunkBudget,
  ChunkMask,
  ChunkOccupancy,
  ChunkPrefix,
  ChunkRecords,
  ChunkRentPayer,
  ChunkShift,
  FeeScale,
  IdCenter,
  MaxBinStep,
  MaxBinsPerSwapCap,
  MaxFee,
  MaxId,
  MaxPoolFeeBps,
  MinBinSharesFloor,
  MaxPositionWidth,
  PoolActiveId,
  PoolBinStep,
  PoolBitmap,
  PoolBoxSize,
  PoolDecayPeriod,
  PoolFilterPeriod,
  PoolHeaderSize,
  PoolIdRef,
  PoolMaxBinsPerSwap,
  PoolMaxVa,
  PoolMinBinShares,
  PoolMinId,
  PoolPrefix,
  PoolReductionFactor,
  PoolSummary,
  PoolTLast,
  PoolTotalX,
  PoolTotalY,
  PoolVa,
  PoolVarFeeControl,
  PoolVr,
  ResultBudget,
  PositionLower,
  PositionOwner,
  PositionPool,
  PositionPrefix,
  PositionShares,
  PositionWidth,
  RecordSize,
  RecordSupply,
  TableBits,
  TableBoxSize,
  TableBudget,
  TableF,
  TablePrefix,
  VarFeeDivisor,
  VaScale,
  WindowBins,
  WindowHalf,
} from './layout'
import {
  absDiff,
  ceilDiv,
  ceilShr32,
  lowestBit,
  maxPrice,
  minPrice,
  mulDivCeil,
  mulDivFloor,
  padTo,
  q128,
  q128Minus1,
  q256,
  satU64,
  shl128,
  shr128,
  shr96,
  toU64,
} from './math'
import { BinHookState, SwapLoop } from './types'

// error codes (7-char loggedAssert style). Settle rejections use the Vault's errPdki (FINAL-SPEC §3.3).
const errArgs = 'errBnAr'
const errMbr = 'errBnMb'
const errOp = 'errBnOp'
const errRange = 'errBnRg'
const errStep = 'errBnSt'
const errExists = 'errBnEx'
const errLiquidity = 'errBnLq'
const errSlippage = 'errBnSl'
const errComposition = 'errBnCo'
const errDistribution = 'errBnDi'
const errShares = 'errBnZs'
const errOwner = 'errBnOw'
const errPosition = 'errBnPo'
const errChunk = 'errBnCk'
/** Init: maxFeeBps above MaxPoolFeeBps (the engine charges at most 10%) */
const errFeeCap = 'errBnFc'
/** Init: minBinShares below MinBinSharesFloor (2^32, one Y base unit per new bin) */
const errMinShares = 'errBnMs'

/** dist entry deltaId bias (u32) */
const DeltaBias: uint64 = 2_147_483_648
/** "no next chunk" */
const NoChunk: uint64 = Uint64(18_446_744_073_709_551_615n)
const U64Max: uint64 = Uint64(18_446_744_073_709_551_615n)

/**
 * BinEngine: the bin-based concentrated-liquidity curve app (Liquidity Book / DLMM) for PluginDex v2
 * (FINAL-SPEC §5 WP2, research/bins.md §2-§4, §7).
 *
 * The engine owns every bin box and does all bin math; it never holds or moves pool funds (only box
 * MBR). The Vault calls it through the frozen curve interface: `akitaDexCurve` (Swap, Quote, Remove,
 * Settle) and `akitaDexCurveFunded` (Init, Add, with an MBR payment). Mutating ops require the Vault as
 * caller; Quote is open and writes nothing. Positions live here, owned by `req.owner`.
 *
 * Price of bin id: p = (1 + s/1e4)^(id − 2^23) as Q128.128, canonical = chunk anchor × step table
 * (bins.md §2.2). Within a bin the curve is constant sum. Fees in ppb: base = req.feeBps × 1e5 plus the
 * native LB v2.1 variable fee per bin, capped at min(MaxFee, req.maxFeeBps × 1e5) (§10 A5). Protocol
 * share per bin, rounded up. Rounding always favours the pool. Foreign box reads are enabled so routers,
 * hooks and the SDK can read pools, chunks and tables directly.
 */
@contract({ avmVersion: 13 })
export class BinEngine extends Contract {
  vault = GlobalState<Application>({ key: 'vault' })
  positionCursor = GlobalState<uint64>({ key: 'position_cursor' })

  @abimethod({ onCreate: 'require' })
  create(vault: Application): void {
    this.vault.value = vault
    this.positionCursor.value = 1
    op.AppParamsSet.appForeignBoxReads(true)
  }

  /** resource carrier: chunk and table box refs ride on these in the same group, plus budget */
  opUp(): void {}

  // ---------------------------------------------------------------------------------------------
  // PERMISSIONLESS
  // ---------------------------------------------------------------------------------------------

  /**
   * Store the step table of `binStep` (bins.md §2.2): T[k] = r^(2^k) (0 once > 2^192), F[j] = r^j − 1.
   * Idempotent: an existing table is left as is. The measured MBR is kept, the rest is refunded.
   */
  initBinStep(mbr: gtxn.PaymentTxn, binStep: uint64): void {
    loggedAssert(mbr.receiver === Global.currentApplicationAddress, errMbr)
    loggedAssert(binStep >= 1 && binStep <= MaxBinStep, errArgs)
    const before = Global.currentApplicationAddress.minBalance
    const key = tableKey(binStep)
    if (op.Box.create(key, TableBoxSize)) {
      ensureBudget(TableBudget, OpUpFeeSource.GroupCredit)
      const one: biguint = q128()
      const limit: biguint = maxPrice()
      const r: biguint = one + (BigUint(binStep) * one) / BigUint(10_000)
      let t: biguint = r
      for (let k: uint64 = 0; k < TableBits; k++) {
        op.Box.replace(key, k * 32, padTo(t, 32))
        if (t !== BigUint(0)) {
          t = (t * t) / one
          if (t > limit) {
            t = BigUint(0)
          }
        }
      }
      let g: biguint = one
      for (let j: uint64 = 1; j < BinsPerChunk; j++) {
        g = (g * r) / one
        op.Box.replace(key, TableF + j * 16, padTo(g - one, 16))
      }
    }
    this.refund(before, mbr.amount, Txn.sender)
  }

  /** hand a position to another owner (an app, a wallet). Never moves pool funds. */
  transferPosition(positionId: uint64, to: Account): void {
    const key = positionKey(positionId)
    loggedAssert(op.Box.length(key)[1], errPosition)
    loggedAssert(Txn.sender.bytes === op.Box.extract(key, PositionOwner, 32), errOwner)
    op.Box.replace(key, PositionOwner, to.bytes)
  }

  /** delete an empty position (every share zero) and refund its MBR to the owner */
  closePosition(positionId: uint64): void {
    const key = positionKey(positionId)
    loggedAssert(op.Box.length(key)[1], errPosition)
    const owner = Account(op.Box.extract(key, PositionOwner, 32))
    loggedAssert(Txn.sender === owner, errOwner)
    const sharesLen: uint64 = op.extractUint64(op.Box.extract(key, PositionWidth, 8), 0) * 16
    loggedAssert(op.Box.extract(key, PositionShares, sharesLen) === op.bzero(sharesLen), errPosition)
    const before = Global.currentApplicationAddress.minBalance
    op.Box.delete(key)
    this.payFreed(before, owner)
  }

  /** delete an empty (no supply, no reserves), non-active chunk and refund its MBR to whoever paid for it (permissionless) */
  closeChunk(poolId: uint64, chunk: uint64): void {
    const key = chunkKey(op.itob(poolId), chunk)
    loggedAssert(op.Box.length(key)[1], errChunk)
    loggedAssert(op.extractUint64(op.Box.extract(key, ChunkOccupancy, 8), 0) === 0, errChunk)
    // no occupancy is not enough: a Settle donation parked in an empty active bin (B1) holds reserves with no
    // supply. Deleting its chunk would drop booked reserves from every bin while the totals keep them
    const recordsLen: uint64 = BinsPerChunk * RecordSize
    loggedAssert(op.Box.extract(key, ChunkRecords, recordsLen) === op.bzero(recordsLen), errChunk)
    const activeId = op.extractUint64(op.Box.extract(poolKey(poolId), PoolActiveId, 8), 0)
    loggedAssert(activeId >> ChunkShift !== chunk, errChunk)
    const payer = Account(op.Box.extract(key, ChunkRentPayer, 32))
    const before = Global.currentApplicationAddress.minBalance
    op.Box.delete(key)
    this.payFreed(before, payer)
  }

  // ---------------------------------------------------------------------------------------------
  // CURVE INTERFACE (FINAL-SPEC §3.5)
  // ---------------------------------------------------------------------------------------------

  /** Swap, Quote, Remove, Settle. Quote is open to anyone and writes nothing. */
  akitaDexCurve(req: CurveRequest): CurveResult {
    if (req.op === CurveOpQuote) {
      return this.swapOp(req, false)
    }
    requireVault(this.vault.value)
    if (req.op === CurveOpSwap) {
      return this.swapOp(req, true)
    }
    if (req.op === CurveOpRemove) {
      return this.removeOp(req)
    }
    loggedAssert(req.op === CurveOpSettle, errOp)
    return this.settleOp(req)
  }

  /** Init, Add: the MBR payment funds new boxes; the excess is refunded to req.owner */
  akitaDexCurveFunded(mbr: gtxn.PaymentTxn, req: CurveRequest): CurveResult {
    requireVault(this.vault.value)
    loggedAssert(mbr.receiver === Global.currentApplicationAddress, errMbr)
    loggedAssert(req.op === CurveOpInit || req.op === CurveOpAdd, errOp)
    const before = Global.currentApplicationAddress.minBalance
    const r: CurveResult = req.op === CurveOpInit ? this.initOp(req) : this.addOp(req)
    r.mbrUsed = this.refund(before, mbr.amount, req.owner)
    return r
  }

  // ---------------------------------------------------------------------------------------------
  // INIT
  // ---------------------------------------------------------------------------------------------

  /**
   * args = binStep ‖ activeId ‖ baseFactor ‖ A, filterPeriod, decayPeriod, R, maxVa ‖ minBinShares ‖
   * maxBinsPerSwap (10 × u64). The active chunk is created with the creator as rent payer. Rejects
   * req.maxFeeBps > MaxPoolFeeBps (errBnFc) and minBinShares < MinBinSharesFloor (errBnMs).
   */
  private initOp(req: CurveRequest): CurveResult {
    const args = req.args
    loggedAssert(args.length === 80, errArgs)
    const binStep = op.extractUint64(args, 0)
    const activeId = op.extractUint64(args, 8)
    const A = op.extractUint64(args, 24)
    const filterPeriod = op.extractUint64(args, 32)
    const decayPeriod = op.extractUint64(args, 40)
    const reduction = op.extractUint64(args, 48)
    const maxVa = op.extractUint64(args, 56)
    const maxBins = op.extractUint64(args, 72)
    loggedAssert(req.maxFeeBps <= MaxPoolFeeBps, errFeeCap)
    loggedAssert(op.extractUint64(args, 64) >= MinBinSharesFloor, errMinShares)
    loggedAssert(op.Box.length(tableKey(binStep))[1], errStep)
    loggedAssert(activeId >= WindowHalf && activeId + WindowHalf <= MaxId, errRange)
    loggedAssert(reduction <= BpsDivisor && filterPeriod <= decayPeriod, errArgs)
    loggedAssert(maxBins >= 1 && maxBins <= MaxBinsPerSwapCap, errArgs)
    // keeps (va·s)^2·A inside u64 math: va·s < 2^32, A < 2^32
    loggedAssert(maxVa * binStep < 4_294_967_296 && A < 4_294_967_296, errArgs)

    const pk = poolKey(req.poolId)
    loggedAssert(op.Box.create(pk, PoolBoxSize), errExists)
    const minId: uint64 = ((activeId - WindowHalf) >> ChunkShift) << ChunkShift
    // binStep, activeId, minId, baseFactor, A, filterPeriod, decayPeriod, R, maxVa
    const head = op
      .extract(args, 0, 16)
      .concat(op.itob(minId))
      .concat(op.extract(args, 16, 48))
      // va, vr, idRef, tLast, totalX, totalY
      .concat(op.bzero(16))
      .concat(op.itob(activeId))
      .concat(op.itob(Global.latestTimestamp))
      .concat(op.bzero(16))
      // minBinShares, maxBinsPerSwap (summary stays 0)
      .concat(op.extract(args, 64, 16))
    op.Box.replace(pk, 0, head)

    this.createChunk(op.itob(req.poolId), activeId >> ChunkShift, binStep, req.owner)
    return this.result(req.poolId, activeId, 0, 0, activeId, 0, 0, binStep, Bytes(''))
  }

  // ---------------------------------------------------------------------------------------------
  // SWAP / QUOTE (bins.md §4.3)
  // ---------------------------------------------------------------------------------------------

  /** exact-in, full fill. Swap reverts when liquidity runs out; Quote returns amountOut = 0. */
  private swapOp(req: CurveRequest, write: boolean): CurveResult {
    const pk = poolKey(req.poolId)
    const h = op.Box.extract(pk, 0, PoolHeaderSize)
    const activeId = op.extractUint64(h, PoolActiveId)
    const now = Global.latestTimestamp
    // updateReferences (LB v2.1)
    let idRef = op.extractUint64(h, PoolIdRef)
    let vr = op.extractUint64(h, PoolVr)
    const dt: uint64 = now - op.extractUint64(h, PoolTLast)
    if (dt >= op.extractUint64(h, PoolFilterPeriod)) {
      idRef = activeId
      vr =
        dt < op.extractUint64(h, PoolDecayPeriod)
          ? mulDivFloor(op.extractUint64(h, PoolVa), op.extractUint64(h, PoolReductionFactor), BpsDivisor)
          : 0
    }
    const loop = this.swapLoop(pk, req.poolId, h, req.inIsA, req.amountIn, req.feeBps * BpsToPpb, feeCap(req.maxFeeBps), req.protocolFeeBps, idRef, vr, write)
    const binStep = op.extractUint64(h, PoolBinStep)
    let totalX = op.extractUint64(h, PoolTotalX)
    let totalY = op.extractUint64(h, PoolTotalY)
    if (loop.rem > 0) {
      // not filled: Quote reports "no liquidity", Swap reverts
      loggedAssert(!write, errLiquidity)
      return this.result(req.poolId, activeId, totalX, totalY, activeId, 0, op.extractUint64(h, PoolVa), binStep, Bytes(''))
    }
    const booked: uint64 = req.amountIn - loop.protocolFee
    if (req.inIsA) {
      totalX += booked
      totalY -= loop.amountOut
    } else {
      totalY += booked
      totalX -= loop.amountOut
    }
    if (write) {
      op.Box.replace(pk, PoolActiveId, op.itob(loop.endId))
      op.Box.replace(
        pk,
        PoolVa,
        op.itob(loop.va).concat(op.itob(vr)).concat(op.itob(idRef)).concat(op.itob(now)).concat(op.itob(totalX)).concat(op.itob(totalY)),
      )
    }
    const r: CurveResult = this.result(req.poolId, loop.endId, totalX, totalY, activeId, loop.crossed, loop.va, binStep, op.itob(loop.endX).concat(op.itob(loop.endY)))
    r.amountIn = req.amountIn
    r.amountOut = loop.amountOut
    r.lpFee = loop.lpFee
    r.protocolFee = loop.protocolFee
    return r
  }

  /**
   * The bin traversal shared by Swap and Quote. Starts at the active bin, fills each non-empty bin
   * (§2.4) and moves to the next occupied bin with the 3-level bitmap, until the input is used up, the
   * window has no more liquidity, or MaxBinsPerSwap moves were made. `write = false` writes nothing.
   */
  private swapLoop(
    pk: bytes,
    poolId: uint64,
    h: bytes,
    xForY: boolean,
    amountIn: uint64,
    base: uint64,
    cap: uint64,
    protocolFeeBps: uint64,
    idRef: uint64,
    vr: uint64,
    write: boolean,
  ): SwapLoop {
    const binStep = op.extractUint64(h, PoolBinStep)
    const A = op.extractUint64(h, PoolVarFeeControl)
    const maxVa = op.extractUint64(h, PoolMaxVa)
    const maxBins = op.extractUint64(h, PoolMaxBinsPerSwap)
    const minChunk: uint64 = op.extractUint64(h, PoolMinId) >> ChunkShift
    const summary = op.extractUint64(h, PoolSummary)
    const tk = tableKey(binStep)
    const pid = op.itob(poolId)
    const oneMinus: biguint = q128Minus1()

    let id = op.extractUint64(h, PoolActiveId)
    let chunk: uint64 = id >> ChunkShift
    let ck = chunkKey(pid, chunk)
    let head = op.Box.extract(ck, 0, 40)
    let anchor: biguint = BigUint(op.extract(head, 0, 32))
    let occ = op.extractUint64(head, ChunkOccupancy)

    let va = op.extractUint64(h, PoolVa)
    let rem = amountIn
    let out: uint64 = 0
    let lpFee: uint64 = 0
    let proto: uint64 = 0
    let crossed: uint64 = 0
    /** F·FS − Σ in·f ∈ [0, FS): the aggregate fee-rounding carry */
    let slack: uint64 = 0
    let endX: uint64 = 0
    let endY: uint64 = 0

    while (true) {
      // hot loop: helpers are inlined (each subroutine call costs ~8 opcodes per bin)
      if (Global.opcodeBudget < BinBudget) {
        ensureBudget(BinBudget, OpUpFeeSource.GroupCredit)
      }
      const j: uint64 = id & ChunkMask
      const off: uint64 = ChunkRecords + j * RecordSize
      const rec = op.Box.extract(ck, off, 16)
      const xb = op.extractUint64(rec, 0)
      const yb = op.extractUint64(rec, 8)
      const reserveOut = xForY ? yb : xb
      endX = xb
      endY = yb
      if (reserveOut > 0) {
        const dId: uint64 = id > idRef ? id - idRef : idRef - id
        va = vr + dId * VaScale
        if (va > maxVa) {
          va = maxVa
        }
        let f = base
        if (A > 0) {
          const vs: uint64 = va * binStep
          f += mulDivCeil(vs * vs, A, VarFeeDivisor)
        }
        if (f > cap) {
          f = cap
        }
        // P = floor(A · (2^128 + F[j]) / 2^128) = A + floor(A · F[j] / 2^128); the product is ≥ 2^192
        const pa = Bytes(anchor * BigUint(Bytes.fromHex('01').concat(op.Box.extract(tk, TableF + j * 16, 16))))
        const P = BigUint(op.substring(pa, 0, pa.length - 16))

        // Fees round up on the swap's aggregate (FINAL-SPEC §4.5 fee bound): slack = F·FS − Σ in·f.
        // Drain when the input covers maxNet + the minimal fee max(0, ceil((maxNet·f − slack)/(FS − f))).
        let amt = rem
        let fee: uint64 = 0
        let o: uint64 = 0
        let drained = false
        let maxNetBytes = Bytes('')
        if (xForY) {
          // ceil(yb · 2^128 / P)
          maxNetBytes = Bytes((BigUint(op.itob(yb).concat(op.bzero(16))) - BigUint(1)) / P + BigUint(1))
        } else {
          // ceil(xb · P / 2^128); the sum is ≥ 2^128 − 1, so it has ≥ 16 bytes
          const nb = Bytes(BigUint(xb) * P + oneMinus)
          maxNetBytes = op.substring(nb, 0, nb.length - 16)
        }
        if (maxNetBytes.length <= 8) {
          const maxNet = op.btoi(maxNetBytes)
          let [hi, lo] = op.mulw(maxNet, f)
          let dFee: uint64 = 0
          let dSlack: uint64 = 0
          if (hi === 0 && lo <= slack) {
            dSlack = slack - lo
          } else {
            if (lo >= slack) {
              lo = lo - slack
            } else {
              hi = hi - 1
              lo = U64Max - slack + lo + 1
            }
            const [, qLo, , rLo] = op.divmodw(hi, lo, 0, FeeScale - f)
            dFee = rLo === 0 ? qLo : qLo + 1
            dSlack = rLo === 0 ? 0 : FeeScale - f - rLo
          }
          if (dFee <= U64Max - maxNet && rem >= maxNet + dFee) {
            amt = maxNet + dFee
            fee = dFee
            slack = dSlack
            o = reserveOut
            drained = true
          }
        }
        if (!drained) {
          let [hi, lo] = op.mulw(rem, f)
          if (hi === 0 && lo <= slack) {
            slack = slack - lo
          } else {
            if (lo >= slack) {
              lo = lo - slack
            } else {
              hi = hi - 1
              lo = U64Max - slack + lo + 1
            }
            const [, qLo, , rLo] = op.divmodw(hi, lo, 0, FeeScale)
            fee = rLo === 0 ? qLo : qLo + 1
            slack = rLo === 0 ? 0 : FeeScale - rLo
          }
          const net: uint64 = rem - fee
          if (net > 0) {
            if (xForY) {
              const ob = Bytes(BigUint(net) * P)
              o = ob.length > 16 ? op.btoi(op.substring(ob, 0, ob.length - 16)) : 0
            } else {
              o = op.btoi(Bytes(BigUint(op.itob(net).concat(op.bzero(16))) / P))
            }
          }
          if (o > reserveOut) {
            o = reserveOut
          }
        }
        const p: uint64 = protocolFeeBps === 0 ? 0 : mulDivCeil(fee, protocolFeeBps, BpsDivisor)
        const kept: uint64 = amt - p
        endX = xForY ? xb + kept : xb - o
        endY = xForY ? yb - o : yb + kept
        if (write) {
          op.Box.replace(ck, off, op.itob(endX).concat(op.itob(endY)))
        }
        rem -= amt
        out += o
        lpFee += fee
        proto += p
      }
      if (rem === 0 || crossed === maxBins) {
        break
      }

      // next occupied bin: inside the chunk first, then the bitmap
      let next: uint64 = 0
      if (xForY) {
        next = occ & ((1 << j) - 1)
      } else {
        next = (occ >> (j + 1)) << (j + 1)
      }
      if (next !== 0) {
        id = id - j + (xForY ? op.bitLength(next) - 1 : op.bitLength(next ^ (next & (next - 1))) - 1)
      } else {
        chunk = nextChunk(pk, minChunk, summary, chunk, xForY)
        if (chunk === NoChunk) {
          break
        }
        ck = chunkKey(pid, chunk)
        head = op.Box.extract(ck, 0, 40)
        anchor = BigUint(op.extract(head, 0, 32))
        occ = op.extractUint64(head, ChunkOccupancy)
        id = (chunk << ChunkShift) + (xForY ? op.bitLength(occ) - 1 : lowestBit(occ))
      }
      crossed += 1
    }
    return { rem, amountOut: out, lpFee, protocolFee: proto, endId: id, crossed, va, endX, endY }
  }

  // ---------------------------------------------------------------------------------------------
  // SETTLE (bins.md §4.7): custody deltas, sync donations
  // ---------------------------------------------------------------------------------------------

  /**
   * A donation goes to the active bin when it has supply. Otherwise X goes to the nearest occupied bin
   * above it and Y to the nearest occupied bin below it (composition rule), or stays in the empty active
   * bin when that side has none, so a stray transfer to the escrow never blocks sync, adds or removes.
   * A mixed delta is booked as an exact-out swap at fee req.feeBps (pool.custodyFeeBps): the loss side is
   * taken from the bins in price order, the gain must cover input + fee, and the surplus goes to the end
   * bin. Every rejection is errPdki.
   */
  private settleOp(req: CurveRequest): CurveResult {
    const pk = poolKey(req.poolId)
    const h = op.Box.extract(pk, 0, PoolHeaderSize)
    const binStep = op.extractUint64(h, PoolBinStep)
    const startId = op.extractUint64(h, PoolActiveId)
    const va = op.extractUint64(h, PoolVa)
    let totalX = op.extractUint64(h, PoolTotalX)
    let totalY = op.extractUint64(h, PoolTotalY)
    const lossX = req.negA && req.amountA > 0
    const lossY = req.negB && req.amountB > 0
    loggedAssert(!(lossX && lossY), errCustodyInvariant)
    const pid = op.itob(req.poolId)
    let id = startId
    let chunk: uint64 = id >> ChunkShift
    let ck = chunkKey(pid, chunk)
    let crossed: uint64 = 0

    if (!lossX && !lossY) {
      if (req.amountA === 0 && req.amountB === 0) {
        return this.result(req.poolId, startId, totalX, totalY, startId, 0, va, binStep, Bytes(''))
      }
      // donation
      const supply = op.Box.extract(ck, ChunkRecords + (id & ChunkMask) * RecordSize + RecordSupply, 16)
      if (supply !== op.bzero(16)) {
        creditBin(pid, id, req.amountA, req.amountB)
      } else {
        const minChunk: uint64 = op.extractUint64(h, PoolMinId) >> ChunkShift
        const summary = op.extractUint64(h, PoolSummary)
        if (req.amountA > 0) {
          creditBin(pid, nearestOccupied(pk, pid, minChunk, summary, id, false), req.amountA, 0)
        }
        if (req.amountB > 0) {
          creditBin(pid, nearestOccupied(pk, pid, minChunk, summary, id, true), 0, req.amountB)
        }
      }
      totalX += req.amountA
      totalY += req.amountB
    } else {
      // gain X / lose Y is an X→Y (price down) trade
      const xForY = lossY
      const gain: uint64 = xForY ? req.amountA : req.amountB
      const loss: uint64 = xForY ? req.amountB : req.amountA
      let f: uint64 = req.feeBps * BpsToPpb
      const cap = feeCap(req.maxFeeBps)
      if (f > cap) {
        f = cap
      }
      const tk = tableKey(binStep)
      const minChunk: uint64 = op.extractUint64(h, PoolMinId) >> ChunkShift
      const summary = op.extractUint64(h, PoolSummary)
      const maxBins = op.extractUint64(h, PoolMaxBinsPerSwap)
      const oneMinus: biguint = q128Minus1()
      let head = op.Box.extract(ck, 0, 40)
      let anchor: biguint = BigUint(op.extract(head, 0, 32))
      let occ = op.extractUint64(head, ChunkOccupancy)
      let outLeft = loss
      let need: uint64 = 0
      while (true) {
        ensureBudget(BinBudget, OpUpFeeSource.GroupCredit)
        const j: uint64 = id & ChunkMask
        const off: uint64 = ChunkRecords + j * RecordSize
        const rec = op.Box.extract(ck, off, 16)
        const xb = op.extractUint64(rec, 0)
        const yb = op.extractUint64(rec, 8)
        const reserveOut = xForY ? yb : xb
        if (reserveOut > 0) {
          const take: uint64 = outLeft < reserveOut ? outLeft : reserveOut
          const P: biguint = anchor + shr128(anchor * BigUint(op.Box.extract(tk, TableF + j * 16, 16)))
          const net = toU64(xForY ? ceilDiv(shl128(take), P) : shr128(BigUint(take) * P + oneMinus))
          const paid: uint64 = net + mulDivCeil(net, f, FeeScale - f)
          need += paid
          op.Box.replace(ck, off, xForY ? op.itob(xb + paid).concat(op.itob(yb - take)) : op.itob(xb - take).concat(op.itob(yb + paid)))
          outLeft -= take
        }
        if (outLeft === 0) {
          break
        }
        loggedAssert(crossed < maxBins, errCustodyInvariant)
        let next: uint64 = 0
        if (xForY) {
          next = occ & ((1 << j) - 1)
        } else {
          next = (occ >> (j + 1)) << (j + 1)
        }
        if (next !== 0) {
          id = id - j + (xForY ? op.bitLength(next) - 1 : lowestBit(next))
        } else {
          chunk = nextChunk(pk, minChunk, summary, chunk, xForY)
          loggedAssert(chunk !== NoChunk, errCustodyInvariant)
          ck = chunkKey(pid, chunk)
          head = op.Box.extract(ck, 0, 40)
          anchor = BigUint(op.extract(head, 0, 32))
          occ = op.extractUint64(head, ChunkOccupancy)
          id = (chunk << ChunkShift) + (xForY ? op.bitLength(occ) - 1 : lowestBit(occ))
        }
        crossed += 1
      }
      // at least as good as a trader paying the custody fee; the surplus stays with the end bin's LPs
      loggedAssert(need <= gain, errCustodyInvariant)
      const surplus: uint64 = gain - need
      if (surplus > 0) {
        const off: uint64 = ChunkRecords + (id & ChunkMask) * RecordSize + (xForY ? 0 : 8)
        op.Box.replace(ck, off, op.itob(op.extractUint64(op.Box.extract(ck, off, 8), 0) + surplus))
      }
      if (xForY) {
        totalX += gain
        totalY -= loss
      } else {
        totalY += gain
        totalX -= loss
      }
      op.Box.replace(pk, PoolActiveId, op.itob(id))
    }
    op.Box.replace(pk, PoolTotalX, op.itob(totalX).concat(op.itob(totalY)))
    return this.result(req.poolId, id, totalX, totalY, startId, crossed, va, binStep, Bytes(''))
  }

  // ---------------------------------------------------------------------------------------------
  // ADD (bins.md §4.5)
  // ---------------------------------------------------------------------------------------------

  /**
   * args = activeIdDesired u64 ‖ idSlippage u64 ‖ n × (deltaId + 2^31 u32, distX u32, distY u32), ids
   * strictly ascending, Σdist ≤ 1e9 per side. Bins below the active bin take only Y and bins above it
   * only X (LB composition rule). positionId 0 opens a position over the deposit range.
   * An occupied bin takes only its own composition (no LB composition fee): shares = min over its
   * non-empty sides of amount·supply/reserve, charged ceil(shares·reserve/supply) per side, the rest is
   * refunded. So an add followed by a remove is never a swap that skips the swap path's hooks and fees.
   * Reported shares = Σ ceil(binShares / 2^32) over the bins minted (≥ 1 per bin), so an add confined to a
   * bin with an inflated share price is never reported as 0 (the Vault requires minted > 0).
   * Value floor (OPEN-DECISIONS #14): a new bin's shares, and a position's whole stake in an occupied bin
   * after the add, must be worth ≥ minBinShares (value·2^32), else errBnZs. With Remove's sweep, every
   * nonzero position-bin stake is worth ≥ the floor, so every occupied bin is too.
   */
  private addOp(req: CurveRequest): CurveResult {
    const pk = poolKey(req.poolId)
    const h = op.Box.extract(pk, 0, PoolHeaderSize)
    const a = op.extractUint64(h, PoolActiveId)
    const binStep = op.extractUint64(h, PoolBinStep)
    const minId = op.extractUint64(h, PoolMinId)
    const args = req.args
    loggedAssert(args.length >= 28 && (args.length - 16) % 12 === 0, errArgs)
    const n: uint64 = (args.length - 16) / 12
    loggedAssert(n <= MaxPositionWidth, errArgs)
    loggedAssert(absDiff(a, op.extractUint64(args, 0)) <= op.extractUint64(args, 8), errSlippage)
    const firstId = binOf(a, args, 0)
    const lastId = binOf(a, args, n - 1)
    loggedAssert(lastId >= firstId, errArgs)
    loggedAssert(firstId >= minId && lastId < minId + WindowBins, errRange)

    // position
    let positionId = req.positionId
    let lower: uint64 = firstId
    let width: uint64 = lastId - firstId + 1
    let pq = positionKey(positionId)
    if (positionId === 0) {
      loggedAssert(width <= MaxPositionWidth, errPosition)
      positionId = this.positionCursor.value
      this.positionCursor.value = positionId + 1
      pq = positionKey(positionId)
      op.Box.create(pq, PositionShares + width * 16)
      op.Box.replace(pq, 0, req.owner.bytes.concat(op.itob(req.poolId)).concat(op.itob(lower)).concat(op.itob(width)))
    } else {
      loggedAssert(op.Box.length(pq)[1], errPosition)
      const ph = op.Box.extract(pq, 0, PositionShares)
      loggedAssert(op.extract(ph, PositionOwner, 32) === req.owner.bytes, errOwner)
      loggedAssert(op.extractUint64(ph, PositionPool) === req.poolId, errPosition)
      lower = op.extractUint64(ph, PositionLower)
      width = op.extractUint64(ph, PositionWidth)
    }
    loggedAssert(firstId >= lower && lastId < lower + width, errPosition)

    const pid = op.itob(req.poolId)
    const tk = tableKey(binStep)
    const minShares: biguint = BigUint(op.extractUint64(h, PoolMinBinShares))
    let summary = op.extractUint64(h, PoolSummary)
    let chunk: uint64 = NoChunk
    let ck = Bytes('')
    let anchor: biguint = BigUint(0)
    let occ: uint64 = 0
    let usedX: uint64 = 0
    let usedY: uint64 = 0
    let sumX: uint64 = 0
    let sumY: uint64 = 0
    let sharesOut: biguint = BigUint(0)
    let prev: uint64 = 0

    for (let i: uint64 = 0; i < n; i++) {
      ensureBudget(AddBinBudget, OpUpFeeSource.GroupCredit)
      const id = binOf(a, args, i)
      loggedAssert(i === 0 || id > prev, errArgs)
      prev = id
      const distX = op.extractUint32(args, 20 + i * 12)
      const distY = op.extractUint32(args, 24 + i * 12)
      sumX += distX
      sumY += distY
      let x = mulDivFloor(req.amountA, distX, FeeScale)
      let y = mulDivFloor(req.amountB, distY, FeeScale)
      loggedAssert(!((id < a && x > 0) || (id > a && y > 0)), errComposition)

      if (id >> ChunkShift !== chunk) {
        chunk = id >> ChunkShift
        ck = chunkKey(pid, chunk)
        if (!op.Box.length(ck)[1]) {
          this.createChunk(pid, chunk, binStep, req.owner)
          ensureBudget(AddBinBudget, OpUpFeeSource.GroupCredit)
        }
        const head = op.Box.extract(ck, 0, 40)
        anchor = BigUint(op.extract(head, 0, 32))
        occ = op.extractUint64(head, ChunkOccupancy)
      }
      const j: uint64 = id & ChunkMask
      const P: biguint = anchor + shr128(anchor * BigUint(op.Box.extract(tk, TableF + j * 16, 16)))
      const off: uint64 = ChunkRecords + j * RecordSize
      const rec = op.Box.extract(ck, off, 32)
      const xb = op.extractUint64(rec, 0)
      const yb = op.extractUint64(rec, 8)
      const supply: biguint = BigUint(op.extract(rec, RecordSupply, 16))
      let shares: biguint = BigUint(0)
      if (supply === BigUint(0)) {
        shares = shr96(P * BigUint(x) + shl128(y))
        loggedAssert(shares >= minShares, errShares)
        // occupancy, bitmap and summary bits
        if (occ === 0) {
          const wc: uint64 = chunk - (minId >> ChunkShift)
          const w: uint64 = wc >> 6
          const wordOff: uint64 = PoolBitmap + w * 8
          const word = op.extractUint64(op.Box.extract(pk, wordOff, 8), 0)
          op.Box.replace(pk, wordOff, op.itob(word | (1 << (wc & 63))))
          summary = summary | (1 << w)
        }
        occ = occ | (1 << j)
        op.Box.replace(ck, ChunkOccupancy, op.itob(occ))
      } else {
        // composition-matched: no value moves between X and Y, rounding favours the bin
        loggedAssert(xb > 0 || yb > 0, errLiquidity)
        shares = xb > 0 ? (BigUint(x) * supply) / BigUint(xb) : BigUint(0)
        if (yb > 0) {
          const sy: biguint = (BigUint(y) * supply) / BigUint(yb)
          if (xb === 0 || sy < shares) {
            shares = sy
          }
        }
        x = toU64(ceilDiv(shares * BigUint(xb), supply))
        y = toU64(ceilDiv(shares * BigUint(yb), supply))
      }
      loggedAssert(shares > BigUint(0), errShares)
      const sOff: uint64 = PositionShares + (id - lower) * 16
      const mine: biguint = BigUint(op.Box.extract(pq, sOff, 16)) + shares
      if (supply !== BigUint(0)) {
        // OPEN-DECISIONS #14: the position's stake in an occupied bin is worth ≥ minBinShares (value·2^32),
        // so a co-add can never become a dust bin's last holder
        loggedAssert(mine * shr96(P * BigUint(xb + x) + shl128(yb + y)) >= minShares * (supply + shares), errShares)
      }
      op.Box.replace(ck, off, op.itob(xb + x).concat(op.itob(yb + y)).concat(padTo(supply + shares, 16)))
      op.Box.replace(pq, sOff, padTo(mine, 16))
      usedX += x
      usedY += y
      sharesOut += ceilShr32(shares)
    }
    loggedAssert(sumX <= FeeScale && sumY <= FeeScale, errDistribution)
    const totalX: uint64 = op.extractUint64(h, PoolTotalX) + usedX
    const totalY: uint64 = op.extractUint64(h, PoolTotalY) + usedY
    op.Box.replace(pk, PoolTotalX, op.itob(totalX).concat(op.itob(totalY)))
    op.Box.replace(pk, PoolSummary, op.itob(summary))

    const r: CurveResult = this.result(req.poolId, a, totalX, totalY, a, 0, op.extractUint64(op.Box.extract(pk, PoolVa, 8), 0), binStep, Bytes(''))
    r.amountA = usedX
    r.amountB = usedY
    r.shares = satU64(sharesOut)
    r.positionId = positionId
    return r
  }

  // ---------------------------------------------------------------------------------------------
  // REMOVE (bins.md §4.6): depends on no other app (emergency path)
  // ---------------------------------------------------------------------------------------------

  /**
   * args = fromId u64 ‖ toId u64 ‖ fracPpb u64; owner only; fracPpb = 1e9 removes everything exactly.
   * A partial remove that would leave the position a stake worth < minBinShares in a bin takes that bin's
   * whole stake instead (OPEN-DECISIONS #14); it reads the binStep table box only in that case.
   * Reported shares = Σ ceil(binShares / 2^32), the unit Add reports.
   */
  private removeOp(req: CurveRequest): CurveResult {
    const pk = poolKey(req.poolId)
    const h = op.Box.extract(pk, 0, PoolHeaderSize)
    const args = req.args
    loggedAssert(args.length === 24, errArgs)
    const fromId = op.extractUint64(args, 0)
    const toId = op.extractUint64(args, 8)
    const frac = op.extractUint64(args, 16)
    loggedAssert(frac > 0 && frac <= FeeScale && fromId <= toId, errArgs)
    const pq = positionKey(req.positionId)
    loggedAssert(op.Box.length(pq)[1], errPosition)
    const ph = op.Box.extract(pq, 0, PositionShares)
    loggedAssert(op.extractUint64(ph, PositionPool) === req.poolId, errPosition)
    loggedAssert(op.extract(ph, PositionOwner, 32) === req.owner.bytes, errOwner)
    const lower = op.extractUint64(ph, PositionLower)
    const upper: uint64 = lower + op.extractUint64(ph, PositionWidth) - 1
    const lo: uint64 = fromId > lower ? fromId : lower
    const hi: uint64 = toId < upper ? toId : upper

    const pid = op.itob(req.poolId)
    const minChunk: uint64 = op.extractUint64(h, PoolMinId) >> ChunkShift
    const fracB: biguint = BigUint(frac)
    const fs: biguint = BigUint(FeeScale)
    const tk = tableKey(op.extractUint64(h, PoolBinStep))
    const minShares: biguint = BigUint(op.extractUint64(h, PoolMinBinShares))
    let summary = op.extractUint64(h, PoolSummary)
    let chunk: uint64 = NoChunk
    let ck = Bytes('')
    let outX: uint64 = 0
    let outY: uint64 = 0
    let sharesOut: biguint = BigUint(0)

    for (let id: uint64 = lo; id <= hi; id++) {
      ensureBudget(BinBudget, OpUpFeeSource.GroupCredit)
      const sOff: uint64 = PositionShares + (id - lower) * 16
      const owned: biguint = BigUint(op.Box.extract(pq, sOff, 16))
      let sh: biguint = (owned * fracB) / fs
      if (sh === BigUint(0)) {
        continue
      }
      if (id >> ChunkShift !== chunk) {
        chunk = id >> ChunkShift
        ck = chunkKey(pid, chunk)
      }
      const off: uint64 = ChunkRecords + (id & ChunkMask) * RecordSize
      const rec = op.Box.extract(ck, off, 32)
      const xb = op.extractUint64(rec, 0)
      const yb = op.extractUint64(rec, 8)
      const supply: biguint = BigUint(op.extract(rec, RecordSupply, 16))
      if (sh < owned) {
        // OPEN-DECISIONS #14: a remainder worth < minBinShares is swept with the rest (never a revert), so a
        // partial remove cannot leave a dust bin occupied. A 100% remove (the emergency path) skips this.
        const anchor: biguint = BigUint(op.Box.extract(ck, 0, 32))
        const P: biguint = anchor + shr128(anchor * BigUint(op.Box.extract(tk, TableF + (id & ChunkMask) * 16, 16)))
        if ((owned - sh) * shr96(P * BigUint(xb) + shl128(yb)) < minShares * supply) {
          sh = owned
        }
      }
      const ox = toU64((sh * BigUint(xb)) / supply)
      const oy = toU64((sh * BigUint(yb)) / supply)
      const left: biguint = supply - sh
      op.Box.replace(ck, off, op.itob(xb - ox).concat(op.itob(yb - oy)).concat(padTo(left, 16)))
      op.Box.replace(pq, sOff, padTo(owned - sh, 16))
      if (left === BigUint(0)) {
        // clear occupancy; an empty chunk clears its bitmap bit, an empty word its summary bit
        const occ: uint64 = op.extractUint64(op.Box.extract(ck, ChunkOccupancy, 8), 0) ^ (1 << (id & ChunkMask))
        op.Box.replace(ck, ChunkOccupancy, op.itob(occ))
        if (occ === 0) {
          const wc: uint64 = chunk - minChunk
          const w: uint64 = wc >> 6
          const wordOff: uint64 = PoolBitmap + w * 8
          const word: uint64 = op.extractUint64(op.Box.extract(pk, wordOff, 8), 0) ^ (1 << (wc & 63))
          op.Box.replace(pk, wordOff, op.itob(word))
          if (word === 0) {
            summary = summary ^ (1 << w)
          }
        }
      }
      outX += ox
      outY += oy
      sharesOut += ceilShr32(sh)
    }
    const totalX: uint64 = op.extractUint64(h, PoolTotalX) - outX
    const totalY: uint64 = op.extractUint64(h, PoolTotalY) - outY
    op.Box.replace(pk, PoolTotalX, op.itob(totalX).concat(op.itob(totalY)))
    op.Box.replace(pk, PoolSummary, op.itob(summary))
    const a = op.extractUint64(h, PoolActiveId)
    const r: CurveResult = this.result(req.poolId, a, totalX, totalY, a, 0, op.extractUint64(h, PoolVa), op.extractUint64(h, PoolBinStep), Bytes(''))
    r.amountA = outX
    r.amountB = outY
    r.shares = satU64(sharesOut)
    r.positionId = req.positionId
    return r
  }

  // ---------------------------------------------------------------------------------------------
  // HELPERS
  // ---------------------------------------------------------------------------------------------

  /**
   * Create chunk `chunk` of a pool: anchor = r^(32c − 2^23) by the T table (§2.2). Every bin of the
   * chunk must price inside [2^64, 2^192) (Q128.128), so priceX64 always fits 16 bytes.
   */
  private createChunk(pid: bytes, chunk: uint64, binStep: uint64, payer: Account): void {
    ensureBudget(ChunkBudget, OpUpFeeSource.GroupCredit)
    const tk = tableKey(binStep)
    const first: uint64 = chunk << ChunkShift
    const neg = first < IdCenter
    let mag: uint64 = neg ? IdCenter - first : first - IdCenter
    loggedAssert(mag < 1 << TableBits, errRange)
    const one: biguint = q128()
    const limit: biguint = maxPrice()
    let acc: biguint = one
    let k: uint64 = 0
    while (mag > 0) {
      if ((mag & 1) === 1) {
        const t: biguint = BigUint(op.Box.extract(tk, k * 32, 32))
        loggedAssert(t !== BigUint(0), errRange)
        acc = (acc * t) / one
        loggedAssert(acc <= limit, errRange)
      }
      mag = mag >> 1
      k += 1
    }
    const anchor: biguint = neg ? q256() / acc : acc
    loggedAssert(anchor >= minPrice(), errRange)
    loggedAssert(anchor + shr128(anchor * BigUint(op.Box.extract(tk, TableF + 31 * 16, 16))) < limit, errRange)
    const ck = chunkKey(pid, chunk)
    op.Box.create(ck, ChunkBoxSize)
    op.Box.replace(ck, 0, padTo(anchor, 32))
    op.Box.replace(ck, ChunkRentPayer, payer.bytes)
  }

  /**
   * CurveResult with the post-op aggregate, the snapshot of `activeId` (priceX64 = floor(P / 2^64),
   * liquidity = active-bin value in Y base units) and BinHookState as hookData. Other fields are zero.
   */
  private result(
    poolId: uint64,
    activeId: uint64,
    totalX: uint64,
    totalY: uint64,
    startId: uint64,
    crossed: uint64,
    va: uint64,
    binStep: uint64,
    endRec: bytes,
  ): CurveResult {
    ensureBudget(ResultBudget, OpUpFeeSource.GroupCredit)
    const ck = chunkKey(op.itob(poolId), activeId >> ChunkShift)
    const anchor: biguint = BigUint(op.Box.extract(ck, 0, 32))
    const j: uint64 = activeId & ChunkMask
    const P: biguint = anchor + shr128(anchor * BigUint(op.Box.extract(tableKey(binStep), TableF + j * 16, 16)))
    // the active bin's (x, y): given by a Quote traversal (nothing written), else read from the box
    const rec = endRec.length === 16 ? endRec : op.Box.extract(ck, ChunkRecords + j * RecordSize, 16)
    const hook: BinHookState = { startId, endId: activeId, binsCrossed: crossed, va, binStep }
    return {
      amountIn: 0,
      amountOut: 0,
      amountA: 0,
      amountB: 0,
      lpFee: 0,
      protocolFee: 0,
      shares: 0,
      positionId: 0,
      reserveA: totalX,
      reserveB: totalY,
      snapshot: {
        priceX64: padTo(P / q64One(), 16).toFixed({ length: 16 }),
        activeId,
        liquidity: satU64(shr128(P * BigUint(op.extractUint64(rec, 0))) + BigUint(op.extractUint64(rec, 8))),
        flags: 0,
      },
      flags: 0,
      mbrUsed: 0,
      hookData: encodeArc4(hook),
    }
  }

  /** keep the measured MBR growth since `before`, refund the rest of `paid` to `to`; returns the MBR used */
  private refund(before: uint64, paid: uint64, to: Account): uint64 {
    const after = Global.currentApplicationAddress.minBalance
    const used: uint64 = after > before ? after - before : 0
    loggedAssert(paid >= used, errMbr)
    if (paid > used) {
      itxn.payment({ receiver: to, amount: paid - used }).submit()
    }
    return used
  }

  /** pay the MBR freed since `before` to `to` */
  private payFreed(before: uint64, to: Account): void {
    const freed: uint64 = before - Global.currentApplicationAddress.minBalance
    if (freed > 0) {
      itxn.payment({ receiver: to, amount: freed }).submit()
    }
  }
}

// -------------------------------------------------------------------------------------------------
// module helpers
// -------------------------------------------------------------------------------------------------

function poolKey(poolId: uint64): bytes {
  return Bytes(PoolPrefix).concat(op.itob(poolId))
}

function tableKey(binStep: uint64): bytes {
  return Bytes(TablePrefix).concat(op.itob(binStep))
}

function chunkKey(pid: bytes, chunk: uint64): bytes {
  return Bytes(ChunkPrefix).concat(pid).concat(op.itob(chunk))
}

function positionKey(positionId: uint64): bytes {
  return Bytes(PositionPrefix).concat(op.itob(positionId))
}

/** per-bin fee cap in ppb: min(MaxFee, maxFeeBps × 1e5) (FINAL-SPEC §10 A5) */
function feeCap(maxFeeBps: uint64): uint64 {
  const cap: uint64 = maxFeeBps * BpsToPpb
  return cap < MaxFee ? cap : MaxFee
}

/** add x and y to bin `id`'s reserves */
function creditBin(pid: bytes, id: uint64, x: uint64, y: uint64): void {
  const ck = chunkKey(pid, id >> ChunkShift)
  const off: uint64 = ChunkRecords + (id & ChunkMask) * RecordSize
  const rec = op.Box.extract(ck, off, 16)
  op.Box.replace(ck, off, op.itob(op.extractUint64(rec, 0) + x).concat(op.itob(op.extractUint64(rec, 8) + y)))
}

/** the nearest occupied bin strictly below (down) or above `id`; `id` itself when there is none */
function nearestOccupied(pk: bytes, pid: bytes, minChunk: uint64, summary: uint64, id: uint64, down: boolean): uint64 {
  const j: uint64 = id & ChunkMask
  let chunk: uint64 = id >> ChunkShift
  let occ = op.extractUint64(op.Box.extract(chunkKey(pid, chunk), ChunkOccupancy, 8), 0)
  occ = down ? occ & ((1 << j) - 1) : (occ >> (j + 1)) << (j + 1)
  if (occ === 0) {
    chunk = nextChunk(pk, minChunk, summary, chunk, down)
    if (chunk === NoChunk) {
      return id
    }
    occ = op.extractUint64(op.Box.extract(chunkKey(pid, chunk), ChunkOccupancy, 8), 0)
  }
  return (chunk << ChunkShift) + (down ? op.bitLength(occ) - 1 : lowestBit(occ))
}

/** bin id of Add entry i: activeId + deltaId (biased u32) */
function binOf(activeId: uint64, args: bytes, i: uint64): uint64 {
  const biased: uint64 = activeId + op.extractUint32(args, 16 + i * 12)
  loggedAssert(biased >= DeltaBias, errRange)
  return biased - DeltaBias
}

/**
 * The next window chunk with occupancy ≠ 0 strictly below (xForY) or above `chunk`, by the bitmap word
 * of `chunk` and then the 32-bit summary; NoChunk when there is none.
 */
function nextChunk(pk: bytes, minChunk: uint64, summary: uint64, chunk: uint64, down: boolean): uint64 {
  const wc: uint64 = chunk - minChunk
  let w: uint64 = wc >> 6
  const b: uint64 = wc & 63
  let word = op.extractUint64(op.Box.extract(pk, PoolBitmap + w * 8, 8), 0)
  if (down) {
    word = word & ((1 << b) - 1)
    if (word === 0) {
      const s: uint64 = summary & ((1 << w) - 1)
      if (s === 0) {
        return NoChunk
      }
      w = op.bitLength(s) - 1
      word = op.extractUint64(op.Box.extract(pk, PoolBitmap + w * 8, 8), 0)
    }
    return minChunk + (w << 6) + op.bitLength(word) - 1
  }
  word = b === 63 ? 0 : (word >> (b + 1)) << (b + 1)
  if (word === 0) {
    const s: uint64 = w === BitmapWords - 1 ? 0 : (summary >> (w + 1)) << (w + 1)
    if (s === 0) {
      return NoChunk
    }
    w = lowestBit(s)
    word = op.extractUint64(op.Box.extract(pk, PoolBitmap + w * 8, 8), 0)
  }
  return minChunk + (w << 6) + lowestBit(word)
}

/**
 * Bigint reference model of the BinEngine curve app (FINAL-SPEC §5 WP2, research/bins.md §2-§4, §7).
 *
 * Every procedure below is the exact integer procedure the engine runs (same rounding, same order), so
 * tests compare on-chain results to the model to the base unit. The SDK can use the same model to quote
 * bin pools off-chain from boxes it reads directly.
 *
 * Units: X = assetA (lower id), Y = assetB. Prices are Q128.128 (`P = floor(p · 2^128)`, p = Y base units
 * per X base unit). Fees are in ppb (`FS = 1e9`). Shares are u128 per bin.
 */

export const Q128 = 1n << 128n
export const Q64 = 1n << 64n
export const FS = 1_000_000_000n
export const MaxFee = 100_000_000n
export const BpsToPpb = 100_000n
export const IdCenter = 1n << 23n
export const MaxId = 1n << 24n
export const BinsPerChunk = 32n
export const WindowBins = 65_536n
export const WindowHalf = 32_768n
export const WindowChunks = WindowBins / BinsPerChunk
export const MinPrice = 1n << 64n
/** exclusive */
export const MaxPrice = 1n << 192n
export const TableBits = 20
export const StepCount = 32
export const MaxBinStep = 200n
export const MaxPositionWidth = 64n
/** must match curves/bins/layout.ts (sized by bins e2e (20b), the sparse one-bin-per-chunk budget case) */
export const MaxBinsPerSwapCap = 128n
export const U64Max = (1n << 64n) - 1n
export const U128 = 1n << 128n

// ---------------------------------------------------------------------------------------------------
// Box layouts (must match curves/bins/layout.ts)
// ---------------------------------------------------------------------------------------------------

export const PoolBoxPrefix = 'b'
export const ChunkBoxPrefix = 'c'
export const TableBoxPrefix = 's'
export const PositionBoxPrefix = 'q'

/** pool state header offsets (u64 fields) */
export const PoolOff = {
  binStep: 0,
  activeId: 8,
  minId: 16,
  baseFactor: 24,
  varFeeControl: 32,
  filterPeriod: 40,
  decayPeriod: 48,
  reductionFactor: 56,
  maxVa: 64,
  va: 72,
  vr: 80,
  idRef: 88,
  tLast: 96,
  totalX: 104,
  totalY: 112,
  minBinShares: 120,
  maxBinsPerSwap: 128,
  summary: 136,
  bitmap: 144,
} as const
export const PoolBoxSize = 144 + 32 * 8

export const ChunkHeader = 72
export const RecordSize = 32
export const ChunkBoxSize = ChunkHeader + 32 * RecordSize
export const TableBoxSize = TableBits * 32 + StepCount * 16
export const PositionHeader = 56

export const boxMbr = (keyLength: number, size: number): bigint => 2_500n + 400n * BigInt(keyLength + size)
export const PoolBoxMbr = boxMbr(9, PoolBoxSize)
export const ChunkBoxMbr = boxMbr(17, ChunkBoxSize)
export const TableBoxMbr = boxMbr(9, TableBoxSize)
export const positionBoxMbr = (width: bigint): bigint => boxMbr(9, PositionHeader + 16 * Number(width))

const u64be = (v: bigint): Uint8Array => {
  const out = new Uint8Array(8)
  new DataView(out.buffer).setBigUint64(0, v)
  return out
}
const concat = (...parts: Uint8Array[]): Uint8Array => {
  const out = new Uint8Array(parts.reduce((n, p) => n + p.length, 0))
  let o = 0
  for (const p of parts) {
    out.set(p, o)
    o += p.length
  }
  return out
}
export const toBytes = (v: bigint, length: number): Uint8Array => {
  if (v < 0n || v >= 1n << BigInt(8 * length)) throw new Error(`value does not fit ${length} bytes`)
  const out = new Uint8Array(length)
  for (let i = length - 1; i >= 0; i--) {
    out[i] = Number(v & 0xffn)
    v >>= 8n
  }
  return out
}
export const fromBytes = (b: Uint8Array): bigint => b.reduce((acc, byte) => (acc << 8n) | BigInt(byte), 0n)

export const poolBoxName = (poolId: bigint) => concat(new TextEncoder().encode(PoolBoxPrefix), u64be(poolId))
export const chunkBoxName = (poolId: bigint, chunk: bigint) => concat(new TextEncoder().encode(ChunkBoxPrefix), u64be(poolId), u64be(chunk))
export const tableBoxName = (binStep: bigint) => concat(new TextEncoder().encode(TableBoxPrefix), u64be(binStep))
export const positionBoxName = (positionId: bigint) => concat(new TextEncoder().encode(PositionBoxPrefix), u64be(positionId))

// ---------------------------------------------------------------------------------------------------
// Integer helpers (all rounding explicit)
// ---------------------------------------------------------------------------------------------------

export const ceilDiv = (a: bigint, b: bigint): bigint => (a === 0n ? 0n : (a - 1n) / b + 1n)
export const mulDivUp = (a: bigint, b: bigint, c: bigint): bigint => ceilDiv(a * b, c)
export const min = (a: bigint, b: bigint): bigint => (a < b ? a : b)
export const max = (a: bigint, b: bigint): bigint => (a > b ? a : b)
export const satU64 = (v: bigint): bigint => (v > U64Max ? U64Max : v)

// ---------------------------------------------------------------------------------------------------
// §2.2 Canonical price: step table and anchors
// ---------------------------------------------------------------------------------------------------

export type StepTable = { binStep: bigint; T: bigint[]; F: bigint[] }

/** T[k] = r^(2^k) (0 once out of range), F[j] = r^j − 1, all Q128.128 floors */
export const stepTable = (binStep: bigint): StepTable => {
  if (binStep < 1n || binStep > MaxBinStep) throw new Error('binStep out of range')
  const R = Q128 + (binStep * Q128) / 10_000n
  const T: bigint[] = [R]
  for (let k = 1; k < TableBits; k++) {
    const prev = T[k - 1]
    const sq = (prev * prev) / Q128
    T.push(prev === 0n || sq > MaxPrice ? 0n : sq)
  }
  const F: bigint[] = [0n]
  let g = Q128
  for (let j = 1; j < StepCount; j++) {
    g = (g * R) / Q128
    F.push(g - Q128)
  }
  return { binStep, T, F }
}

/** the table box value: T[0..19] (32 B each) ‖ F[0..31] (16 B each) */
export const encodeStepTable = (t: StepTable): Uint8Array =>
  concat(...t.T.map((v) => toBytes(v, 32)), ...t.F.map((v) => toBytes(v, 16)))

/** r^e for e ≥ 0 in Q128.128 (fold over set bits, ascending); undefined when out of range (> 2^192) */
const powPositive = (t: StepTable, e: bigint): bigint | undefined => {
  if (e >= 1n << BigInt(TableBits)) return undefined
  let acc = Q128
  for (let k = 0; k < TableBits; k++) {
    if (((e >> BigInt(k)) & 1n) === 1n) {
      if (t.T[k] === 0n) return undefined
      acc = (acc * t.T[k]) / Q128
      if (acc > MaxPrice) return undefined
    }
  }
  return acc
}

/** r^e for any e, Q128.128; negative exponents are floor(2^256 / r^|e|) */
export const pow = (t: StepTable, e: bigint): bigint | undefined => {
  if (e >= 0n) return powPositive(t, e)
  const p = powPositive(t, -e)
  return p === undefined ? undefined : (Q128 * Q128) / p
}

/** P at offset j inside a chunk with anchor A */
export const priceFromAnchor = (t: StepTable, anchor: bigint, j: bigint): bigint => anchor + (anchor * t.F[Number(j)]) / Q128

/**
 * Anchor P(32c) of absolute chunk c, or undefined when any bin of the chunk is outside the price range
 * [2^64, 2^192) (Q128.128), i.e. p outside [2^-64, 2^64).
 */
export const anchorOf = (t: StepTable, chunk: bigint): bigint | undefined => {
  const a = pow(t, chunk * BinsPerChunk - IdCenter)
  if (a === undefined || a < MinPrice) return undefined
  if (priceFromAnchor(t, a, BinsPerChunk - 1n) >= MaxPrice) return undefined
  return a
}

/** canonical bin price P(id) (Q128.128); throws when the bin's chunk is out of range */
export const priceOf = (t: StepTable, id: bigint): bigint => {
  const a = anchorOf(t, id / BinsPerChunk)
  if (a === undefined) throw new Error('bin out of range')
  return priceFromAnchor(t, a, id % BinsPerChunk)
}

/** the Q64.64 snapshot price (floor), as the engine reports it */
export const toPriceX64 = (P: bigint): bigint => P / Q64

/** off-chain inverse: the bin id nearest to a real price p (B per A) */
export const idForPrice = (binStep: bigint, p: number): bigint =>
  IdCenter + BigInt(Math.round(Math.log(p) / Math.log(1 + Number(binStep) / 10_000)))

// ---------------------------------------------------------------------------------------------------
// §2.5 Fees
// ---------------------------------------------------------------------------------------------------

/** Init rejects pool.maxFeeBps above this (errBnFc): the engine charges at most MaxFee (OPEN-DECISIONS #13) */
export const MaxPoolFeeBps = MaxFee / BpsToPpb
/** Init rejects minBinShares below this (errBnMs): a new bin is worth ≥ 1 Y base unit (OPEN-DECISIONS #14) */
export const MinBinSharesFloor = 1n << 32n

/** per-bin fee cap in ppb: min(MaxFee, maxFeeBps · 1e5) (FINAL-SPEC §10 A5) */
export const feeCap = (maxFeeBps: bigint): bigint => min(MaxFee, maxFeeBps * BpsToPpb)

/** LB v2.1 variable fee: ceil((va · s)^2 · A / 1e11) */
export const variableFee = (va: bigint, binStep: bigint, A: bigint): bigint => {
  if (A === 0n) return 0n
  const vs = va * binStep
  return ceilDiv(vs * vs * A, 100_000_000_000n)
}

/** total per-bin fee in ppb */
export const totalFee = (base: bigint, va: bigint, binStep: bigint, A: bigint, cap: bigint): bigint =>
  min(base + variableFee(va, binStep, A), cap)

/** per-bin protocol share: ceil(fee · protocolFeeBps / 1e4) */
export const protocolShare = (fee: bigint, protocolFeeBps: bigint): bigint => mulDivUp(fee, protocolFeeBps, 10_000n)

// ---------------------------------------------------------------------------------------------------
// §2.4 In-bin swap (exact input) and exact output
// ---------------------------------------------------------------------------------------------------

export type BinSwap = { amountIn: bigint; fee: bigint; amountOut: bigint; slack: bigint }

/**
 * Exact-input fill of one bin. `reserveOut` is yb (xForY) or xb. Output rounds down.
 *
 * Fees are rounded up on the swap's aggregate, not per bin (so the swap's total fee never exceeds
 * ceil(amountIn · cap / FS), the Vault's §4.5 fee bound): with F the fee charged so far and
 * a = Σ in_i · f_i the exact fee numerator, the engine keeps F = ceil(a / FS) and carries
 * `slack` = F · FS − a ∈ [0, FS) from bin to bin (0 at the start of a swap).
 *
 * Draining the bin needs maxNet = ceil(reserve · 2^128 / P) (X→Y) or ceil(reserve · P / 2^128) of net
 * input and the minimal fee with F + fee ≥ (a + (maxNet + fee) · f) / FS:
 * fee = max(0, ceil((maxNet · f − slack) / (FS − f))). A smaller input is a partial fill with
 * fee = max(0, ceil((rem · f − slack) / FS)).
 */
export const binSwapExactIn = (xForY: boolean, reserveOut: bigint, P: bigint, rem: bigint, f: bigint, slack = 0n): BinSwap => {
  const maxNet = xForY ? ceilDiv(reserveOut * Q128, P) : ceilDiv(reserveOut * P, Q128)
  if (maxNet <= U64Max) {
    const num = maxNet * f - slack
    const fee = num <= 0n ? 0n : ceilDiv(num, FS - f)
    const nextSlack = num <= 0n ? -num : fee * (FS - f) - num
    const maxIn = maxNet + fee
    if (maxIn <= U64Max && rem >= maxIn) {
      return { amountIn: maxIn, fee, amountOut: reserveOut, slack: nextSlack }
    }
  }
  const num = rem * f - slack
  const fee = num <= 0n ? 0n : ceilDiv(num, FS)
  const nextSlack = num <= 0n ? -num : fee * FS - num
  const net = rem - fee
  const raw = xForY ? (net * P) / Q128 : (net * Q128) / P
  return { amountIn: rem, fee, amountOut: min(reserveOut, raw), slack: nextSlack }
}

/** Exact-output fill of one bin: take `take` (≤ reserve) of the output; returns net + fee needed */
export const binSwapExactOut = (xForY: boolean, take: bigint, P: bigint, f: bigint): { net: bigint; fee: bigint } => {
  const net = xForY ? ceilDiv(take * Q128, P) : ceilDiv(take * P, Q128)
  const fee = ceilDiv(net * f, FS - f)
  return { net, fee }
}

// ---------------------------------------------------------------------------------------------------
// §2.3 Liquidity and shares
// ---------------------------------------------------------------------------------------------------

export const binValue = (P: bigint, x: bigint, y: bigint): bigint => P * x + y * Q128

/**
 * The per-bin share count as Add/Remove report it in CurveResult.shares: ceil(shares / 2^32), so a nonzero
 * mint is never reported as 0 (the Vault requires minted > 0) however inflated the bin's share price is.
 */
export const reportedShares = (shares: bigint): bigint => ceilDiv(shares, 1n << 32n)

export type Bin = { x: bigint; y: bigint; supply: bigint }

// ---------------------------------------------------------------------------------------------------
// Init args, add args, remove args, hook state (must match curves/bins/types.ts)
// ---------------------------------------------------------------------------------------------------

export type BinPoolParams = {
  binStep: bigint
  activeId: bigint
  baseFactor: bigint
  varFeeControl: bigint
  filterPeriod: bigint
  decayPeriod: bigint
  reductionFactor: bigint
  maxVa: bigint
  minBinShares: bigint
  maxBinsPerSwap: bigint
}

/** PoolConfig.curveArgs: binStep ‖ activeId ‖ baseFactor ‖ A, filterPeriod, decayPeriod, R, maxVa ‖ minBinShares ‖ maxBinsPerSwap */
export const encodeInitArgs = (p: BinPoolParams): Uint8Array =>
  concat(
    ...[
      p.binStep,
      p.activeId,
      p.baseFactor,
      p.varFeeControl,
      p.filterPeriod,
      p.decayPeriod,
      p.reductionFactor,
      p.maxVa,
      p.minBinShares,
      p.maxBinsPerSwap,
    ].map(u64be),
  )

export type DistEntry = { delta: bigint; distX: bigint; distY: bigint }

/** Add args: activeIdDesired u64 ‖ idSlippage u64 ‖ per bin (deltaId + 2^31 u32, distX u32, distY u32) */
export const encodeAddArgs = (activeIdDesired: bigint, idSlippage: bigint, dist: DistEntry[]): Uint8Array =>
  concat(
    u64be(activeIdDesired),
    u64be(idSlippage),
    ...dist.map((d) => concat(toBytes(d.delta + (1n << 31n), 4), toBytes(d.distX, 4), toBytes(d.distY, 4))),
  )

/** Remove args: fromId u64 ‖ toId u64 ‖ fracPpb u64 */
export const encodeRemoveArgs = (fromId: bigint, toId: bigint, fracPpb: bigint): Uint8Array => concat(u64be(fromId), u64be(toId), u64be(fracPpb))

/** ABI-decoded BinHookState {startId, endId, binsCrossed, va, binStep} */
export const decodeHookState = (b: Uint8Array) => {
  const view = new DataView(b.buffer, b.byteOffset, b.byteLength)
  return {
    startId: view.getBigUint64(0),
    endId: view.getBigUint64(8),
    binsCrossed: view.getBigUint64(16),
    va: view.getBigUint64(24),
    binStep: view.getBigUint64(32),
  }
}

// ---------------------------------------------------------------------------------------------------
// Pool model
// ---------------------------------------------------------------------------------------------------

export class ModelError extends Error {
  constructor(public code: string) {
    super(code)
  }
}
const fail = (code: string): never => {
  throw new ModelError(code)
}

export type SwapResult = {
  filled: boolean
  amountIn: bigint
  amountOut: bigint
  lpFee: bigint
  protocolFee: bigint
  startId: bigint
  endId: bigint
  crossed: bigint
  va: bigint
}

export type Position = { owner: string; poolId: bigint; lowerId: bigint; width: bigint; shares: bigint[] }

export type FeeContext = { feeBps: bigint; maxFeeBps: bigint; protocolFeeBps: bigint; now: bigint }

/** one bin pool of the engine; positions live in `BinEngineModel` */
export class BinPoolModel {
  readonly table: StepTable
  binStep: bigint
  activeId: bigint
  minId: bigint
  baseFactor: bigint
  A: bigint
  filterPeriod: bigint
  decayPeriod: bigint
  R: bigint
  maxVa: bigint
  va = 0n
  vr = 0n
  idRef: bigint
  tLast: bigint
  totalX = 0n
  totalY = 0n
  minBinShares: bigint
  maxBinsPerSwap: bigint
  bins = new Map<bigint, Bin>()
  /** chunk index → anchor (existing chunk boxes) */
  chunks = new Map<bigint, bigint>()

  constructor(params: BinPoolParams, now: bigint, table?: StepTable) {
    this.table = table ?? stepTable(params.binStep)
    this.binStep = params.binStep
    this.activeId = params.activeId
    this.minId = ((params.activeId - WindowHalf) / BinsPerChunk) * BinsPerChunk
    this.baseFactor = params.baseFactor
    this.A = params.varFeeControl
    this.filterPeriod = params.filterPeriod
    this.decayPeriod = params.decayPeriod
    this.R = params.reductionFactor
    this.maxVa = params.maxVa
    this.idRef = params.activeId
    this.tLast = now
    this.minBinShares = params.minBinShares
    this.maxBinsPerSwap = params.maxBinsPerSwap
    this.loadChunk(params.activeId / BinsPerChunk, true)
  }

  bin(id: bigint): Bin {
    return this.bins.get(id) ?? { x: 0n, y: 0n, supply: 0n }
  }

  price(id: bigint): bigint {
    const a = this.chunks.get(id / BinsPerChunk) ?? anchorOf(this.table, id / BinsPerChunk)
    if (a === undefined) fail('errBnRg')
    return priceFromAnchor(this.table, a!, id % BinsPerChunk)
  }

  inWindow(id: bigint): boolean {
    return id >= this.minId && id < this.minId + WindowBins
  }

  /** returns true when the chunk box had to be created */
  loadChunk(chunk: bigint, create: boolean): boolean {
    if (this.chunks.has(chunk)) return false
    if (!create) fail('errBnCk')
    const a = anchorOf(this.table, chunk)
    if (a === undefined) fail('errBnRg')
    this.chunks.set(chunk, a!)
    return true
  }

  occupied(): bigint[] {
    return [...this.bins.entries()].filter(([, b]) => b.supply > 0n).map(([id]) => id).sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
  }

  nextOccupied(id: bigint, down: boolean): bigint | undefined {
    const ids = this.occupied()
    if (down) {
      for (let i = ids.length - 1; i >= 0; i--) if (ids[i] < id) return ids[i]
      return undefined
    }
    return ids.find((x) => x > id)
  }

  /** updateReferences (LB v2.1) on a copy; returns {idRef, vr} */
  references(now: bigint): { idRef: bigint; vr: bigint } {
    const dt = now - this.tLast
    if (dt >= this.filterPeriod) {
      return { idRef: this.activeId, vr: dt < this.decayPeriod ? (this.va * this.R) / 10_000n : 0n }
    }
    return { idRef: this.idRef, vr: this.vr }
  }

  accumulator(id: bigint, idRef: bigint, vr: bigint): bigint {
    const d = id > idRef ? id - idRef : idRef - id
    return min(this.maxVa, vr + d * 10_000n)
  }

  /** Swap/Quote: exact-in, full fill. `write = false` leaves the pool untouched. */
  swap(xForY: boolean, amountIn: bigint, ctx: FeeContext, write: boolean): SwapResult {
    const { idRef, vr } = this.references(ctx.now)
    const base = ctx.feeBps * BpsToPpb
    const cap = feeCap(ctx.maxFeeBps)
    let va = this.va
    let id = this.activeId
    const startId = id
    let rem = amountIn
    let out = 0n
    let lpFee = 0n
    let proto = 0n
    let crossed = 0n
    let slack = 0n
    const writes: [bigint, Bin][] = []
    let filled = false
    for (;;) {
      const b = this.bin(id)
      const reserveOut = xForY ? b.y : b.x
      if (reserveOut > 0n) {
        va = this.accumulator(id, idRef, vr)
        const f = totalFee(base, va, this.binStep, this.A, cap)
        const P = this.price(id)
        const s = binSwapExactIn(xForY, reserveOut, P, rem, f, slack)
        slack = s.slack
        const p = protocolShare(s.fee, ctx.protocolFeeBps)
        const add = s.amountIn - p
        writes.push([id, xForY ? { ...b, x: b.x + add, y: b.y - s.amountOut } : { ...b, x: b.x - s.amountOut, y: b.y + add }])
        rem -= s.amountIn
        out += s.amountOut
        lpFee += s.fee
        proto += p
      }
      if (rem === 0n) {
        filled = true
        break
      }
      const next = this.nextOccupied(id, xForY)
      if (next === undefined || crossed === this.maxBinsPerSwap) break
      id = next
      crossed++
    }
    const result: SwapResult = { filled, amountIn, amountOut: out, lpFee, protocolFee: proto, startId, endId: id, crossed, va }
    if (write && filled) {
      for (const [bid, nb] of writes) this.bins.set(bid, nb)
      this.activeId = id
      this.idRef = idRef
      this.vr = vr
      this.va = va
      this.tLast = ctx.now
      if (xForY) {
        this.totalX += amountIn - proto
        this.totalY -= out
      } else {
        this.totalY += amountIn - proto
        this.totalX -= out
      }
    }
    return result
  }

  /** active-bin value in Y base units (saturating u64): the CurveSnapshot.liquidity depth hint */
  activeLiquidity(): bigint {
    const b = this.bin(this.activeId)
    return satU64((this.price(this.activeId) * b.x) / Q128 + b.y)
  }

  snapshot() {
    return { priceX64: toPriceX64(this.price(this.activeId)), activeId: this.activeId, liquidity: this.activeLiquidity(), flags: 0n }
  }

  /**
   * Settle a custody delta (bins.md §4.7, fee = custodyFeeBps): a donation goes to the active bin when it
   * has supply; otherwise X goes to the nearest occupied bin above it and Y to the nearest occupied bin
   * below it (the composition rule), or stays in the active bin when that side has none. A mixed delta is
   * booked as an exact-out swap and the surplus goes to the end bin.
   */
  settle(dX: bigint, negX: boolean, dY: bigint, negY: boolean, custodyFeeBps: bigint, maxFeeBps: bigint): { endId: bigint; crossed: bigint } {
    if (dX === 0n && dY === 0n) return { endId: this.activeId, crossed: 0n }
    if ((negX && dX > 0n) && (negY && dY > 0n)) fail('errPdki')
    const lossX = negX && dX > 0n
    const lossY = negY && dY > 0n
    if (!lossX && !lossY) {
      const a = this.activeId
      const credit = (id: bigint, x: bigint, y: bigint) => {
        const b = this.bin(id)
        this.bins.set(id, { ...b, x: b.x + x, y: b.y + y })
      }
      if (this.bin(a).supply > 0n) {
        credit(a, dX, dY)
      } else {
        if (dX > 0n) credit(this.nextOccupied(a, false) ?? a, dX, 0n)
        if (dY > 0n) credit(this.nextOccupied(a, true) ?? a, 0n, dY)
      }
      this.totalX += dX
      this.totalY += dY
      return { endId: this.activeId, crossed: 0n }
    }
    // gain X / lose Y is an X→Y (price down) trade
    const xForY = lossY
    const gain = xForY ? dX : dY
    const loss = xForY ? dY : dX
    const f = min(custodyFeeBps * BpsToPpb, feeCap(maxFeeBps))
    let outLeft = loss
    let need = 0n
    let id = this.activeId
    let crossed = 0n
    const writes = new Map<bigint, Bin>()
    for (;;) {
      const b = writes.get(id) ?? this.bin(id)
      const reserveOut = xForY ? b.y : b.x
      if (reserveOut > 0n) {
        const take = min(outLeft, reserveOut)
        const { net, fee } = binSwapExactOut(xForY, take, this.price(id), f)
        need += net + fee
        writes.set(id, xForY ? { ...b, x: b.x + net + fee, y: b.y - take } : { ...b, x: b.x - take, y: b.y + net + fee })
        outLeft -= take
      }
      if (outLeft === 0n) break
      const next = this.nextOccupied(id, xForY)
      if (next === undefined || crossed === this.maxBinsPerSwap) fail('errPdki')
      id = next!
      crossed++
    }
    if (need > gain) fail('errPdki')
    const end = writes.get(id)!
    writes.set(id, xForY ? { ...end, x: end.x + gain - need } : { ...end, y: end.y + gain - need })
    for (const [bid, nb] of writes) this.bins.set(bid, nb)
    this.activeId = id
    if (xForY) {
      this.totalX += gain
      this.totalY -= loss
    } else {
      this.totalY += gain
      this.totalX -= loss
    }
    return { endId: id, crossed }
  }
}

export type AddResult = { usedX: bigint; usedY: bigint; positionId: bigint; shares: bigint; perBin: { id: bigint; shares: bigint; x: bigint; y: bigint }[]; createdChunks: bigint[] }

/** the engine: pools, positions, the position counter */
export class BinEngineModel {
  pools = new Map<bigint, BinPoolModel>()
  positions = new Map<bigint, Position>()
  nextPositionId = 1n

  pool(poolId: bigint): BinPoolModel {
    const p = this.pools.get(poolId)
    if (!p) throw new Error(`unknown pool ${poolId}`)
    return p
  }

  /** the engine's Init checks (maxFeeBps is the pool's, when known), then the new pool */
  init(poolId: bigint, params: BinPoolParams, now: bigint, maxFeeBps?: bigint): BinPoolModel {
    if (maxFeeBps !== undefined && maxFeeBps > MaxPoolFeeBps) fail('errBnFc')
    if (params.minBinShares < MinBinSharesFloor) fail('errBnMs')
    const pool = new BinPoolModel(params, now)
    this.pools.set(poolId, pool)
    return pool
  }

  /**
   * Add across a range (bins.md §4.5) with the LB composition rule. An occupied bin takes only its own
   * composition (no composition fee): shares = min over its non-empty sides of floor(amount · supply /
   * reserve), and each side is charged ceil(shares · reserve / supply); the rest is refunded.
   */
  add(
    poolId: bigint,
    owner: string,
    positionId: bigint,
    amountX: bigint,
    amountY: bigint,
    activeIdDesired: bigint,
    idSlippage: bigint,
    dist: DistEntry[],
    ctx: FeeContext,
  ): AddResult {
    const pool = this.pool(poolId)
    const a = pool.activeId
    const d = a > activeIdDesired ? a - activeIdDesired : activeIdDesired - a
    if (d > idSlippage) fail('errBnSl')
    if (dist.length === 0 || dist.length > Number(MaxPositionWidth)) fail('errBnAr')
    let sumX = 0n
    let sumY = 0n
    for (const e of dist) {
      sumX += e.distX
      sumY += e.distY
    }
    if (sumX > FS || sumY > FS) fail('errBnDi')
    const ids = dist.map((e) => a + e.delta)
    for (let i = 1; i < ids.length; i++) if (ids[i] <= ids[i - 1]) fail('errBnAr')

    let pos: Position
    let newId = positionId
    if (positionId === 0n) {
      const width = ids[ids.length - 1] - ids[0] + 1n
      if (width > MaxPositionWidth) fail('errBnPo')
      pos = { owner, poolId, lowerId: ids[0], width, shares: Array(Number(width)).fill(0n) }
      newId = this.nextPositionId
    } else {
      const p = this.positions.get(positionId)
      if (!p) fail('errBnPo')
      pos = { ...p!, shares: [...p!.shares] }
      if (pos.owner !== owner) fail('errBnOw')
      if (pos.poolId !== poolId) fail('errBnPo')
    }

    // snapshot of the pool state, so a failing add leaves nothing behind
    const bins = new Map(pool.bins)
    const chunks = new Map(pool.chunks)
    const saved = { va: pool.va, vr: pool.vr, idRef: pool.idRef, tLast: pool.tLast }
    const perBin: AddResult['perBin'] = []
    const createdChunks: bigint[] = []
    let usedX = 0n
    let usedY = 0n
    let sharesSum = 0n
    try {
      for (let i = 0; i < dist.length; i++) {
        const id = ids[i]
        if (!pool.inWindow(id)) fail('errBnRg')
        if (id < pos.lowerId || id >= pos.lowerId + pos.width) fail('errBnPo')
        let x = (amountX * dist[i].distX) / FS
        let y = (amountY * dist[i].distY) / FS
        if ((id < a && x > 0n) || (id > a && y > 0n)) fail('errBnCo')
        if (pool.loadChunk(id / BinsPerChunk, true)) createdChunks.push(id / BinsPerChunk)
        const P = pool.price(id)
        const b = pool.bin(id)
        let shares: bigint
        if (b.supply === 0n) {
          shares = binValue(P, x, y) >> 96n
          if (shares < pool.minBinShares) fail('errBnZs')
        } else {
          if (b.x === 0n && b.y === 0n) fail('errBnLq')
          shares = b.x > 0n ? (x * b.supply) / b.x : 0n
          if (b.y > 0n) {
            const sy = (y * b.supply) / b.y
            if (b.x === 0n || sy < shares) shares = sy
          }
          x = ceilDiv(shares * b.x, b.supply)
          y = ceilDiv(shares * b.y, b.supply)
        }
        if (shares === 0n) fail('errBnZs')
        const k = Number(id - pos.lowerId)
        // OPEN-DECISIONS #14: the position's stake in an occupied bin must be worth ≥ minBinShares
        // (value · 2^32), so a co-add can never become a dust bin's last holder
        if (b.supply > 0n && (pos.shares[k] + shares) * (binValue(P, b.x + x, b.y + y) >> 96n) < pool.minBinShares * (b.supply + shares)) fail('errBnZs')
        const supply = b.supply + shares
        if (supply >= U128) fail('errBnOv')
        pool.bins.set(id, { x: b.x + x, y: b.y + y, supply })
        pos.shares[k] += shares
        usedX += x
        usedY += y
        sharesSum += reportedShares(shares)
        perBin.push({ id, shares, x, y })
      }
    } catch (e) {
      pool.bins = bins
      pool.chunks = chunks
      Object.assign(pool, saved)
      throw e
    }
    pool.totalX += usedX
    pool.totalY += usedY
    if (positionId === 0n) this.nextPositionId++
    this.positions.set(newId, pos)
    return { usedX, usedY, positionId: newId, shares: satU64(sharesSum), perBin, createdChunks }
  }

  /** Remove a fraction of a position's shares over [fromId, toId] (bins.md §4.6) */
  remove(poolId: bigint, owner: string, positionId: bigint, fromId: bigint, toId: bigint, fracPpb: bigint) {
    const pool = this.pool(poolId)
    const pos = this.positions.get(positionId)
    if (!pos || pos.poolId !== poolId) fail('errBnPo')
    if (pos!.owner !== owner) fail('errBnOw')
    if (fracPpb === 0n || fracPpb > FS || fromId > toId) fail('errBnAr')
    const lo = max(fromId, pos!.lowerId)
    const hi = min(toId, pos!.lowerId + pos!.width - 1n)
    let outX = 0n
    let outY = 0n
    let sharesSum = 0n
    for (let id = lo; id <= hi; id++) {
      const k = Number(id - pos!.lowerId)
      const owned = pos!.shares[k]
      let sh = (owned * fracPpb) / FS
      if (sh === 0n) continue
      const b = pool.bin(id)
      // OPEN-DECISIONS #14: a remainder worth < minBinShares is swept with the rest (never a revert),
      // so a partial remove cannot leave a dust bin occupied
      if (sh < owned && (owned - sh) * (binValue(pool.price(id), b.x, b.y) >> 96n) < pool.minBinShares * b.supply) sh = owned
      const ox = (sh * b.x) / b.supply
      const oy = (sh * b.y) / b.supply
      pool.bins.set(id, { x: b.x - ox, y: b.y - oy, supply: b.supply - sh })
      pos!.shares[k] -= sh
      outX += ox
      outY += oy
      sharesSum += reportedShares(sh)
    }
    pool.totalX -= outX
    pool.totalY -= outY
    return { outX, outY, shares: satU64(sharesSum) }
  }
}

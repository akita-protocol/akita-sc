import { describe, expect, test } from 'vitest'
import {
  anchorOf,
  BinEngineModel,
  BinsPerChunk,
  binSwapExactIn,
  binValue,
  encodeStepTable,
  FS,
  IdCenter,
  MaxPoolFeeBps,
  MaxPrice,
  MinBinSharesFloor,
  MinPrice,
  pow,
  priceFromAnchor,
  priceOf,
  Q128,
  reportedShares,
  stepTable,
  TableBoxSize,
} from '../../../../tests/models/bins-model'

/**
 * bins.md §11 off-chain cases 1-5: the bigint reference model's canonical price (anchor × step table)
 * against independent derivations and the real price.
 */

const Steps = [1n, 2n, 5n, 10n, 15n, 20n, 25n, 50n, 100n]

/** independent re-derivation of §2.2 written from the spec text (no shared code with the model) */
const independentTable = (s: bigint) => {
  const one = 2n ** 128n
  const r = one + (s * one) / 10000n
  const T = [r]
  while (T.length < 20) {
    const prev = T[T.length - 1]
    const next = prev === 0n ? 0n : (prev * prev) / one
    T.push(next > 2n ** 192n ? 0n : next)
  }
  const F = [0n]
  let g = one
  for (let j = 1; j < 32; j++) {
    g = (g * r) / one
    F.push(g - one)
  }
  return { T, F }
}

/** independent pow: fold set bits ascending, reject past 2^192; negative exponents invert */
const independentPow = (T: bigint[], e: bigint): bigint | undefined => {
  const one = 2n ** 128n
  const mag = e < 0n ? -e : e
  let acc = one
  for (let k = 0; mag >> BigInt(k) > 0n; k++) {
    if ((mag >> BigInt(k)) & 1n) {
      if (k >= 20 || T[k] === 0n) return undefined
      acc = (acc * T[k]) / one
      if (acc > 2n ** 192n) return undefined
    }
  }
  return e < 0n ? (one * one) / acc : acc
}

/** first and last chunk whose bins are all in [2^64, 2^192) */
const chunkRange = (s: bigint) => {
  const t = stepTable(s)
  let lo = IdCenter / BinsPerChunk
  while (anchorOf(t, lo - 1n) !== undefined) lo--
  let hi = IdCenter / BinsPerChunk
  while (anchorOf(t, hi + 1n) !== undefined) hi++
  return { t, lo, hi }
}

/** (1 + s/1e4)^e as a fixed-point bigint scaled by 2^Scale (exponentiation by squaring, truncating) */
const Scale = 512n
const realPrice = (s: bigint, e: bigint): bigint => {
  const one = 1n << Scale
  const base = ((10_000n + s) << Scale) / 10_000n
  let mag = e < 0n ? -e : e
  let acc = one
  let sq = base
  while (mag > 0n) {
    if (mag & 1n) acc = (acc * sq) >> Scale
    sq = (sq * sq) >> Scale
    mag >>= 1n
  }
  return e < 0n ? (one * one) / acc : acc
}

describe('bins model: canonical price (bins.md §11 off-chain 1-5)', () => {
  test('(1) T, F and anchors match the §2.2 integer procedures for every binStep in use', () => {
    for (const s of Steps) {
      const t = stepTable(s)
      const ref = independentTable(s)
      expect(t.T).toEqual(ref.T)
      expect(t.F).toEqual(ref.F)
      expect(encodeStepTable(t).length).toBe(TableBoxSize)
      // F fits 16 bytes because r^31 < 2
      expect(t.F[31] < Q128).toBe(true)
      const { lo, hi } = chunkRange(s)
      // every 37th chunk plus both ends
      for (let c = lo; c <= hi; c += 37n) expect(anchorOf(t, c)).toBe(independentPow(ref.T, c * 32n - IdCenter))
      expect(anchorOf(t, lo)).toBe(independentPow(ref.T, lo * 32n - IdCenter))
      expect(anchorOf(t, hi)).toBe(independentPow(ref.T, hi * 32n - IdCenter))
    }
  })

  test('(2) P(2^23) = 2^128 for every binStep', () => {
    for (const s of Steps) expect(priceOf(stepTable(s), IdCenter)).toBe(Q128)
  })

  test('(3) P(id+1) > P(id) for every id in range, across chunk edges and negative exponents', () => {
    for (const s of Steps) {
      const { t, lo, hi } = chunkRange(s)
      let prev = 0n
      let count = 0
      for (let c = lo; c <= hi; c++) {
        const a = anchorOf(t, c)!
        for (let j = 0n; j < BinsPerChunk; j++) {
          const p = priceFromAnchor(t, a, j)
          expect(p > prev).toBe(true)
          prev = p
          count++
        }
      }
      // the window of any pool fits inside the range many times over for s ≥ 1
      expect(count).toBeGreaterThan(8_000)
    }
  }, 120_000)

  test('(4) price within 1e-12 relative of the real (1 + s/1e4)^e', () => {
    for (const s of Steps) {
      const { t, lo, hi } = chunkRange(s)
      const first = lo * BinsPerChunk
      const last = hi * BinsPerChunk + 31n
      const ids = [first, first + 1n, IdCenter - 1n, IdCenter, IdCenter + 1n, last - 1n, last]
      for (let id = first; id <= last; id += 997n) ids.push(id)
      for (const id of ids) {
        const p = priceOf(t, id)
        const real = realPrice(s, id - IdCenter) // scaled 2^512
        const pScaled = p << (Scale - 128n)
        const diff = pScaled > real ? pScaled - real : real - pScaled
        // |P − p| ≤ 1e-12 · p
        expect(diff * 1_000_000_000_000n <= real).toBe(true)
      }
    }
  })

  test('(5) chunks outside [2^-64, 2^64) are rejected; the range edges are at 2^±64', () => {
    for (const s of Steps) {
      const { t, lo, hi } = chunkRange(s)
      expect(anchorOf(t, lo - 1n)).toBeUndefined()
      expect(anchorOf(t, hi + 1n)).toBeUndefined()
      expect(() => priceOf(t, (hi + 1n) * BinsPerChunk)).toThrow()
      expect(() => priceOf(t, lo * BinsPerChunk - 1n)).toThrow()
      const pLo = priceOf(t, lo * BinsPerChunk)
      const pHi = priceOf(t, hi * BinsPerChunk + 31n)
      expect(pLo >= MinPrice).toBe(true)
      expect(pHi < MaxPrice).toBe(true)
      // within one chunk of the edges: the next chunk out would cross 2^-64 (or 2^64)
      const r32 = pow(t, 32n)!
      expect((pLo * Q128) / r32 < MinPrice * 2n).toBe(true)
      expect((pHi * r32) / Q128 >= MaxPrice / 2n).toBe(true)
    }
  })

  test('in-bin swap rounding never decreases the bin value at its price', () => {
    const t = stepTable(25n)
    const P = priceOf(t, IdCenter + 123n)
    let seed = 12345n
    const rand = (m: bigint) => {
      seed = (seed * 6364136223846793005n + 1442695040888963407n) % 2n ** 64n
      return seed % m
    }
    for (let i = 0; i < 2_000; i++) {
      const x = rand(10n ** 12n)
      const y = rand(10n ** 12n)
      const xForY = rand(2n) === 0n
      const f = rand(100_000_000n)
      const rem = rand(10n ** 12n) + 1n
      const s = binSwapExactIn(xForY, xForY ? y : x, P, rem, f)
      const x2 = xForY ? x + s.amountIn : x - s.amountOut
      const y2 = xForY ? y - s.amountOut : y + s.amountIn
      expect(binValue(P, x2, y2) >= binValue(P, x, y)).toBe(true)
    }
  })

  test('review fix: reported shares are ceil(binShares / 2^32) per bin, so a nonzero mint is never reported as 0', () => {
    expect([0n, 1n, 4_294n, 1n << 32n, (1n << 32n) + 1n].map(reportedShares)).toEqual([0n, 1n, 1n, 1n, 2n])
    const m = new BinEngineModel()
    const a = IdCenter + 16n
    m.init(1n, { binStep: 25n, activeId: a, baseFactor: 10_000n, varFeeControl: 0n, filterPeriod: 30n, decayPeriod: 600n, reductionFactor: 5_000n, maxVa: 350_000n, minBinShares: 1n << 32n, maxBinsPerSwap: 64n }, 0n)
    const ctx = { feeBps: 25n, maxFeeBps: 1_000n, protocolFeeBps: 0n, now: 0n }
    const only = [{ delta: 0n, distX: 0n, distY: FS }]
    expect(m.add(1n, 'attacker', 0n, 0n, 1n, a, 0n, only, ctx).shares).toBe(1n)
    m.pool(1n).settle(0n, false, 10n ** 12n, false, 25n, 1_000n)
    const user = m.add(1n, 'user', 0n, 0n, 1_000_000n, a, 0n, only, ctx)
    expect(user.perBin[0].shares).toBe(4_294n)
    expect(user.shares).toBe(1n)
    expect(m.remove(1n, 'user', user.positionId, a, a, FS).shares).toBe(1n)
  })

  test('OPEN-DECISIONS #13/#14: Init rejects maxFeeBps > 1,000 (errBnFc) and minBinShares < 2^32 (errBnMs)', () => {
    const m = new BinEngineModel()
    const a = IdCenter + 16n
    const params = { binStep: 25n, activeId: a, baseFactor: 10_000n, varFeeControl: 0n, filterPeriod: 30n, decayPeriod: 600n, reductionFactor: 5_000n, maxVa: 350_000n, minBinShares: 1n << 32n, maxBinsPerSwap: 64n }
    expect([MaxPoolFeeBps, MinBinSharesFloor]).toEqual([1_000n, 1n << 32n])
    expect(() => m.init(1n, params, 0n, 1_001n)).toThrow('errBnFc')
    expect(() => m.init(1n, { ...params, minBinShares: (1n << 32n) - 1n }, 0n, 1_000n)).toThrow('errBnMs')
    m.init(1n, params, 0n, 1_000n)
    // one Y base unit is exactly the floor
    const ctx = { feeBps: 25n, maxFeeBps: 1_000n, protocolFeeBps: 0n, now: 0n }
    expect(m.add(1n, 'lp', 0n, 0n, 1n, a, 0n, [{ delta: -1n, distX: 0n, distY: FS }], ctx).perBin[0].shares).toBe(1n << 32n)
    // X worth < 1 Y unit (price < 1 below the center) is below the floor
    const lowM = new BinEngineModel()
    lowM.init(2n, { ...params, activeId: IdCenter - 16n }, 0n, 1_000n)
    expect(() => lowM.add(2n, 'lp', 0n, 1n, 0n, IdCenter - 16n, 0n, [{ delta: 1n, distX: FS, distY: 0n }], ctx)).toThrow('errBnZs')
  })

  test('OPEN-DECISIONS #14 (verifier bypass): no position-bin stake below the floor survives a remove or a co-add', () => {
    const m = new BinEngineModel()
    const a = IdCenter + 16n
    const floor = 1_000_000n
    m.init(1n, { binStep: 25n, activeId: a, baseFactor: 10_000n, varFeeControl: 0n, filterPeriod: 30n, decayPeriod: 600n, reductionFactor: 5_000n, maxVa: 350_000n, minBinShares: floor << 32n, maxBinsPerSwap: 64n }, 0n, 1_000n)
    const ctx = { feeBps: 25n, maxFeeBps: 1_000n, protocolFeeBps: 0n, now: 0n }
    const yOnly = [{ delta: -1n, distX: 0n, distY: FS }]
    // add at the floor, remove all but one ppb: the remainder is swept and the bin is empty
    const p1 = m.add(1n, 'attacker', 0n, 0n, floor, a, 0n, yOnly, ctx).positionId
    expect(m.remove(1n, 'attacker', p1, a - 1n, a - 1n, FS - 1n).outY).toBe(floor)
    expect(m.pool(1n).bin(a - 1n).supply).toBe(0n)
    // a co-add below the floor into an occupied bin is refused; at the floor it passes
    m.add(1n, 'lp', 0n, 0n, 3n * floor, a, 0n, yOnly, ctx)
    expect(() => m.add(1n, 'attacker', 0n, 0n, floor - 1n, a, 0n, yOnly, ctx)).toThrow('errBnZs')
    expect(m.add(1n, 'attacker', 0n, 0n, floor, a, 0n, yOnly, ctx).perBin[0].shares).toBe(floor << 32n)
    expect(m.pool(1n).bin(a - 1n).supply).toBe((4n * floor) << 32n)
  })
})

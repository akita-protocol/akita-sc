import { describe, expect, test } from 'vitest'

/**
 * AR-08 regression: a plain-TypeScript model of the chunked winner search used by
 * Raffle.findWinner / Auction.findWinner (getWinnerWeightBoxInfo + the per-call walk).
 *
 * The on-chain ChunkSize is 4096, which makes an e2e reproduction need > 4096 entrants;
 * the model runs the identical algorithm with a tiny chunk size so every multi-box
 * cursor path is exercised, and checks it against a linear scan for arbitrary
 * caller-chosen iteration sequences.
 */

type Cursor = { index: number; rangeStart: number }

const linearWinner = (weights: number[], ticket: number): number => {
  let start = 1
  for (let i = 0; i < weights.length; i++) {
    if (ticket >= start && ticket < start + weights[i]) return i
    start += weights[i]
  }
  return -1
}

const boxTotals = (weights: number[], chunk: number, boxes: number) =>
  Array.from({ length: boxes }, (_, b) => weights.slice(b * chunk, (b + 1) * chunk).reduce((a, w) => a + w, 0))

/** fixed algorithm (audit 2026-10) */
const fixedSearch = (weights: number[], ticket: number, chunk: number, boxes: number, iterations: number[]): number => {
  const totals = boxTotals(weights, chunk, boxes)
  let cursor: Cursor = { index: 0, rangeStart: 1 }
  for (const requested of iterations) {
    let startingIndex = cursor.index
    let rangeStart = cursor.rangeStart
    // skip whole boxes only on a box boundary
    while (startingIndex % chunk === 0 && Math.floor(startingIndex / chunk) < boxes) {
      const stake = totals[Math.floor(startingIndex / chunk)]
      if (ticket < rangeStart + stake) break
      startingIndex += chunk
      rangeStart += stake
    }
    if (startingIndex >= weights.length) throw new Error('search exhausted')
    let n = Math.min(requested, weights.length - startingIndex, chunk - (startingIndex % chunk))
    for (let i = 0; i < n; i++) {
      const end = rangeStart + weights[startingIndex + i]
      if (ticket >= rangeStart && ticket < end) return startingIndex + i
      rangeStart = end
    }
    cursor = { index: startingIndex + n, rangeStart }
  }
  return -1
}

/** pre-fix raffle algorithm: re-walks totals from box 0 and stores the old index */
const legacyRaffleSearch = (weights: number[], ticket: number, chunk: number, boxes: number, iterations: number[]): number => {
  const totals = boxTotals(weights, chunk, boxes)
  let cursor: Cursor = { index: 0, rangeStart: 1 }
  for (const requested of iterations) {
    let startingIndex = cursor.index
    let rangeStart = cursor.rangeStart
    for (let b = 0; b < boxes; b++) {
      if (ticket < rangeStart + totals[b]) break
      startingIndex += chunk
      rangeStart += totals[b]
    }
    if (startingIndex >= weights.length) return -1
    let n = Math.min(requested, weights.length - startingIndex, chunk - (startingIndex % chunk))
    for (let i = 0; i < n; i++) {
      const end = rangeStart + weights[startingIndex + i]
      if (ticket >= rangeStart && ticket < end) return startingIndex + i
      rangeStart = end
    }
    cursor = { index: cursor.index + n, rangeStart }
  }
  return -1
}

const rng = (seed: number) => () => {
  seed = (seed * 1103515245 + 12345) % 2 ** 31
  return seed / 2 ** 31
}

describe('AR-08 chunked winner search model', () => {
  test('reproduces the legacy misattribution (ticket in box 1, partial first window)', () => {
    const weights = [10, 10, 10, 10, 10, 10] // chunk 4: box 0 = e0..e3, box 1 = e4, e5
    const ticket = 55 // belongs to e5
    expect(linearWinner(weights, ticket)).toBe(5)
    expect(legacyRaffleSearch(weights, ticket, 4, 4, [1, 1])).toBe(1) // wrong entrant
    expect(fixedSearch(weights, ticket, 4, 4, [1, 1])).toBe(5)
  })

  test('fixed search matches a linear scan for every ticket and random iteration sequences', () => {
    const random = rng(42)
    for (let trial = 0; trial < 300; trial++) {
      const chunk = 2 + Math.floor(random() * 4)
      const boxes = 4
      const count = 1 + Math.floor(random() * chunk * boxes)
      const weights = Array.from({ length: count }, () => Math.floor(random() * 20)) // zero weights allowed
      const total = weights.reduce((a, w) => a + w, 0)
      if (total === 0) continue
      for (let ticket = 1; ticket <= total; ticket++) {
        const iterations = Array.from({ length: count + 2 }, () => 1 + Math.floor(random() * (chunk + 1)))
        expect(fixedSearch(weights, ticket, chunk, boxes, iterations)).toBe(linearWinner(weights, ticket))
      }
    }
  })
})

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, test } from 'vitest'

/**
 * The raffle keeps ticket counts in weights boxes that grow with the entries, and every entry pays
 * a flat share of that storage (`EntryWeightMBR`). This is a plain-TypeScript model of the storage
 * the contract holds at each step (`allocateWeight` on entry, `releaseWeight` on refund), checked
 * against the deposits it holds, with the constants read from the contract source.
 */

const source = readFileSync(fileURLToPath(new URL('./constants.ts', import.meta.url)), 'utf8')
const constant = (name: string): number => {
  const match = source.match(new RegExp(`export const ${name}: uint64 = ([0-9_]+)`))
  if (!match) throw new Error(`constant ${name} not found`)
  return Number(match[1].replaceAll('_', ''))
}

const ChunkSize = constant('ChunkSize')
const MaxWeightsBoxes = constant('MaxWeightsBoxes')
const EntryBoxMBR = constant('EntryBoxMBR')
const EntryWeightMBR = constant('EntryWeightMBR')
const EntriesMBR = constant('EntriesMBR')
const EntriesByAddressMBR = constant('EntriesByAddressMBR')
const WeightsMBR = constant('WeightsMBR')

/** minimum balance of a box: 2,500 + 400 per byte of key and value */
const boxMbr = (keyBytes: number, valueBytes: number) => 2_500 + 400 * (keyBytes + valueBytes)
const WEIGHTS_KEY = 1 + 8 // 'w' + uint64
const TOTALS_KEY = 1 // 't'
const MAX_BOX_BYTES = 32_768

/** the weights storage of a raffle with `live` entries: boxes as long as their entries, plus the totals box */
const storage = (live: number): number => {
  const boxes = Math.ceil(live / ChunkSize)
  let total = boxMbr(TOTALS_KEY, boxes * 8)
  for (let box = 0; box < boxes; box++) {
    const slots = Math.min(ChunkSize, live - box * ChunkSize)
    total += boxMbr(WEIGHTS_KEY, slots * 8)
  }
  return total
}

/** what the raffle holds for that storage: the seller's totals box and each live entry's share */
const held = (live: number): number => WeightsMBR + EntryWeightMBR * live

describe('raffle weights storage', () => {
  test('the constants are the box prices they stand for', () => {
    expect(EntryBoxMBR).toBe(boxMbr(1 + 8, 32 + 32)) // 'e' + id: account, marketplace
    expect(EntriesByAddressMBR).toBe(boxMbr(1 + 32, 8)) // 'a' + address: id
    expect(WeightsMBR).toBe(boxMbr(TOTALS_KEY, 0))
    // a slot, plus opening a weights box and adding its total
    expect(EntryWeightMBR).toBe(400 * 8 + boxMbr(WEIGHTS_KEY, 0) + 400 * 8)
    expect(EntriesMBR).toBe(EntryBoxMBR + EntryWeightMBR)
    expect(EntriesMBR + EntriesByAddressMBR).toBe(63_100)
  })

  test('a full weights box and a full totals box are the largest boxes the chain allows', () => {
    expect(ChunkSize * 8).toBe(MAX_BOX_BYTES)
    expect(MaxWeightsBoxes * 8).toBe(MAX_BOX_BYTES)
  })

  test('the first entry of a weights box needs exactly its share; every other entry needs one slot', () => {
    for (const box of [0, 1, 2]) {
      const first = box * ChunkSize
      expect(storage(first + 1) - storage(first)).toBe(EntryWeightMBR)
      expect(storage(first + 2) - storage(first + 1)).toBe(400 * 8)
      expect(storage(first + ChunkSize) - storage(first + ChunkSize - 1)).toBe(400 * 8)
    }
  })

  test('the deposits cover the storage after every entry, and after every refund from the last entry down', () => {
    const entries = 3 * ChunkSize + 5
    for (let live = 0; live <= entries; live++) {
      // entering up to `live`, and refunding down to `live`, pass through the same storage
      expect(held(live)).toBeGreaterThanOrEqual(storage(live))
    }
    // what an entry is refunded is never more than its refund releases plus the surplus held
    for (let live = entries; live > 0; live--) {
      const released = storage(live) - storage(live - 1)
      const surplus = held(live) - storage(live)
      expect(released + surplus).toBeGreaterThanOrEqual(EntryWeightMBR)
    }
    expect(storage(0)).toBe(WeightsMBR)
    expect(held(0)).toBe(WeightsMBR)
  })

  test('refunding from the first entry up would run short, which is why refunds run from the last entry down', () => {
    // ascending refunds cannot shrink a box (its slots sit below the entries still in it)
    const entries = ChunkSize
    let short = false
    for (let refunded = 1; refunded <= entries; refunded++) {
      if (held(entries - refunded) < storage(entries)) short = true
    }
    expect(short).toBe(true)
  })
})

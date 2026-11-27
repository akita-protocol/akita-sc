import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, test } from 'vitest'

/**
 * A fee auction keeps one loser-raffle weight per unique bidder in weights boxes that grow with the
 * bidders, and every unique bidder pays a flat share of that storage (`AuctionMBRWeightSlot`, part
 * of `mbr().locations`). This is a plain-TypeScript model of the storage the contract holds at each
 * step (`allocateWeight` on a first bid, `releaseWeightSlot` on a storage refund), checked against
 * the deposits it holds, with the constants read from the contract sources.
 */

const read = (relative: string) => readFileSync(fileURLToPath(new URL(relative, import.meta.url)), 'utf8')
const constantIn = (source: string) => (name: string): number => {
  const match = source.match(new RegExp(`export const ${name}: uint64 = ([0-9_]+)`))
  if (!match) throw new Error(`constant ${name} not found`)
  return Number(match[1].replaceAll('_', ''))
}

const auction = constantIn(read('./constants.ts'))
const raffle = constantIn(read('../raffle/constants.ts'))
const rewards = constantIn(read('../rewards/constants.ts'))
const contract = read('./contract.algo.ts')

const ChunkSize = auction('ChunkSize')
const MaxWeightsBoxes = auction('MaxWeightsBoxes')
const Bids = auction('AuctionMBRBids')
const BidsByAddress = auction('AuctionMBRBidsByAddress')
const LocationBox = auction('AuctionMBRLocationBox')
const WeightSlot = auction('AuctionMBRWeightSlot')
const Locations = auction('AuctionMBRLocations')
const Weights = auction('AuctionMBRWeights')
const RefundDisbursement = auction('AuctionRefundDisbursementMBR')

/** minimum balance of a box: 2,500 + 400 per byte of key and value */
const boxMbr = (keyBytes: number, valueBytes: number) => 2_500 + 400 * (keyBytes + valueBytes)
const WEIGHTS_KEY = 1 + 8 // 'w' + uint64
const TOTALS_KEY = 1 // 't'
const MAX_BOX_BYTES = 32_768

/** the weights storage of an auction with `live` unique bidders: boxes as long as their bidders, plus the totals box */
const storage = (live: number): number => {
  const boxes = Math.ceil(live / ChunkSize)
  let total = boxMbr(TOTALS_KEY, boxes * 8)
  for (let box = 0; box < boxes; box++) {
    const slots = Math.min(ChunkSize, live - box * ChunkSize)
    total += boxMbr(WEIGHTS_KEY, slots * 8)
  }
  return total
}

/** what the auction holds for that storage: the seller's totals box and each unique bidder's share */
const held = (live: number): number => Weights + WeightSlot * live

describe('fee auction weights storage', () => {
  test('the constants are the box prices they stand for', () => {
    expect(Bids).toBe(boxMbr(1 + 8, 32 + 8 + 32 + 1)) // 'b' + id: account, amount, marketplace, refunded
    expect(BidsByAddress).toBe(boxMbr(1 + 32, 8)) // 'a' + address: location
    expect(LocationBox).toBe(boxMbr(1 + 8, 32)) // 'l' + location: address
    expect(Weights).toBe(boxMbr(TOTALS_KEY, 0))
    // a slot, plus opening a weights box and adding its total
    expect(WeightSlot).toBe(400 * 8 + boxMbr(WEIGHTS_KEY, 0) + 400 * 8)
    expect(Locations).toBe(LocationBox + WeightSlot)
  })

  test('a full weights box and a full totals box are the largest boxes the chain allows', () => {
    expect(ChunkSize * 8).toBe(MAX_BOX_BYTES)
    expect(MaxWeightsBoxes * 8).toBe(MAX_BOX_BYTES)
  })

  test('the first bidder of a weights box needs exactly its share; every other bidder needs one slot', () => {
    for (const box of [0, 1, 2]) {
      const first = box * ChunkSize
      expect(storage(first + 1) - storage(first)).toBe(WeightSlot)
      expect(storage(first + 2) - storage(first + 1)).toBe(400 * 8)
      expect(storage(first + ChunkSize) - storage(first + ChunkSize - 1)).toBe(400 * 8)
    }
  })

  test('the deposits cover the storage after every new bidder and after every storage refund', () => {
    // Refunds walk the bids in the order they were placed, but each one gives back the LAST slot
    // (the weights are no longer read by then), so the storage after k refunds is the storage of
    // the first `bidders - k` slots, whichever bidders are still waiting for theirs.
    const bidders = 3 * ChunkSize + 5
    for (let live = 0; live <= bidders; live++) {
      expect(held(live)).toBeGreaterThanOrEqual(storage(live))
    }
    // what a bidder is refunded is never more than its refund releases plus the surplus held
    for (let live = bidders; live > 0; live--) {
      const released = storage(live) - storage(live - 1)
      const surplus = held(live) - storage(live)
      expect(released + surplus).toBeGreaterThanOrEqual(WeightSlot)
    }
    expect(storage(0)).toBe(Weights)
    expect(held(0)).toBe(Weights)
  })

  test('a slot is given back exactly where a location box is removed, and nowhere else', () => {
    // one slot per unique bidder: allocated with its location box, released with it
    expect(contract.match(/this\.allocateWeight\(/g)).toHaveLength(1)
    expect(contract.match(/this\.releaseWeightSlot\(\)/g)).toHaveLength(1)
    expect(contract).toMatch(/this\.allocateWeight\(loc\)\s+this\.bidsByAddress\(Txn\.sender\)\.value = loc\s+this\.locations\(loc\)\.value = Txn\.sender/)
    expect(contract).toMatch(/this\.locations\(loc\)\.delete\(\)\s+this\.releaseWeightSlot\(\)\s+refundAmount \+= locations/)
    // and the refunds only start once the loser raffle no longer needs the weights
    expect(contract).toMatch(/this\.bidFee\.value === 0 \|\| this\.raffleWinner\.value !== Global\.zeroAddress \|\| this\.rafflePrizeClaimed\.value,\s+errWinnerNotFound/)
  })
})

describe('refund deposit of ASA bids and ASA raffle entries (audit 10, AUC-02)', () => {
  const disbursement = rewards('MinDisbursementsMBR') + rewards('UserAllocationMBR')

  test('the deposit targets are the cost of one single-allocation Rewards disbursement', () => {
    expect(RefundDisbursement).toBe(disbursement)
    expect(raffle('RaffleRefundDisbursementMBR')).toBe(disbursement)
  })

  test('an ASA bid holds enough to pay for its own refund disbursement, an ALGO bid only its storage', () => {
    // the child's mbr(): bids = AuctionMBRBids + (ASA ? AuctionRefundDisbursementMBR - AuctionMBRBids : 0)
    expect(contract).toMatch(/return this\.bidAsset\.value\.id === 0 \? 0 : AuctionRefundDisbursementMBR - AuctionMBRBids/)
    expect(contract).toMatch(/bids: AuctionMBRBids \+ this\.refundDeposit\(\),/)
    expect(RefundDisbursement).toBeGreaterThan(Bids)
    const asaBid = Bids + (RefundDisbursement - Bids)
    expect(asaBid).toBe(79_800)
    // what a bid adds to the payment, by kind of auction (all of it refundable)
    expect(Bids).toBe(35_300) // ALGO, a later bid
    expect(Bids + BidsByAddress).toBe(54_200) // ALGO, first bid, no bid fee
    expect(Bids + BidsByAddress + Locations).toBe(85_600) // ALGO, first bid, fee auction
    expect(asaBid + BidsByAddress).toBe(98_700) // ASA, first bid, no bid fee
    expect(asaBid + BidsByAddress + Locations).toBe(130_100) // ASA, first bid, fee auction
  })

  test('an entry of an ASA raffle holds enough to pay for its own refund disbursement', () => {
    const raffleContract = read('../raffle/contract.algo.ts')
    expect(raffleContract).toMatch(/return this\.ticketAsset\.value\.id === 0 \? EntriesMBR \+ EntriesByAddressMBR : RaffleRefundDisbursementMBR/)
    const algoEntry = raffle('EntriesMBR') + raffle('EntriesByAddressMBR')
    expect(algoEntry).toBe(63_100)
    expect(raffle('RaffleRefundDisbursementMBR')).toBeGreaterThanOrEqual(algoEntry)
    // mbr().entries of an ASA raffle = deposit - entriesByAddress, so the two still add up to it
    expect(raffle('RaffleRefundDisbursementMBR') - raffle('EntriesByAddressMBR')).toBe(60_900)
  })
})

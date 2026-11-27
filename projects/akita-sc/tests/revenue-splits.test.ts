/**
 * The revenue split plan (runbook B3b), against the table MainNet's DAO held on 2026-11-18: what
 * changes, what is kept, what is refused, and that the table encodes to the bytes the chain stores.
 */
import { ProposalActionEnum, SplitDistributionType, SplitsToTuples, type Split } from 'akita-sdk/dao'
import algosdk from 'algosdk'
import { describe, expect, test } from 'vitest'
import { chooseOptInPlugin, missingAssets } from '../scripts/lib/revenue-receiver-opt-ins'
import { parseShares, percent, planRevenueSplits, splitDifferences, type StoredSplit } from '../scripts/lib/revenue-splits'

const WALLET = 3569559153n
const PERCENTAGE = SplitDistributionType.Percentage
// MainNet's `revenue_splits` global as read on 2026-11-18; TestNet held the same shares on its own wallet.
const LIVE_BYTES = '0003000600250043000b140000000000009c4000000000d4c32671000a00087265635f6b726279000b140000000000004e2000000000d4c32671000a00077265635f6d6f64000b140000000000009c4000000000d4c32671000a00077265635f676f76'
const TABLE_TYPE = algosdk.ABIType.from('((uint64,string),uint8,uint64)[]')
const live = (): StoredSplit[] => [
  { wallet: WALLET, escrow: 'rec_krby', type: PERCENTAGE, value: 40_000n },
  { wallet: WALLET, escrow: 'rec_mod', type: PERCENTAGE, value: 20_000n },
  { wallet: WALLET, escrow: 'rec_gov', type: PERCENTAGE, value: 40_000n },
]
const RELEASE = parseShares('rec_krby=80,rec_mod=5,rec_gov=15')
const entry = (escrow: string, value: bigint): Split => ({ receiver: { wallet: WALLET, escrow }, type: PERCENTAGE, value })

describe('revenue split plan', () => {
  test('the release split: one action rewrites the three shares, in the stored order', () => {
    const plan = planRevenueSplits(live(), RELEASE, WALLET)
    expect(plan.changed).toBe(true)
    expect(plan.rows).toEqual([
      { escrow: 'rec_krby', from: 40_000n, to: 80_000n },
      { escrow: 'rec_mod', from: 20_000n, to: 5_000n },
      { escrow: 'rec_gov', from: 40_000n, to: 15_000n },
    ])
    expect(plan.actions).toEqual([{
      type: ProposalActionEnum.UpdateFields, field: 'revenue_splits',
      value: [entry('rec_krby', 80_000n), entry('rec_mod', 5_000n), entry('rec_gov', 15_000n)],
    }])
    expect(plan.expected.reduce((sum, split) => sum + split.value, 0n)).toBe(100_000n)
  })

  test('the stored order is kept whatever order the shares are named in', () => {
    // rec_gov stays last: the last percentage entry takes the rounding remainder of every payout.
    const plan = planRevenueSplits(live(), parseShares('rec_gov=15,rec_krby=80,rec_mod=5'), WALLET)
    expect(plan.expected.map((split) => `${split.escrow} ${split.value}`)).toEqual(['rec_krby 80000', 'rec_mod 5000', 'rec_gov 15000'])
  })

  test('a table already at its shares needs no proposal', () => {
    const after = planRevenueSplits(live(), RELEASE, WALLET).expected
    const plan = planRevenueSplits(after, RELEASE, WALLET)
    expect(plan.changed).toBe(false)
    expect(plan.actions).toEqual([])
    expect(plan.rows.every((row) => row.from === row.to)).toBe(true)
  })

  test('shares that do not total 100%, a zero share and a receiver named twice are refused', () => {
    expect(() => planRevenueSplits(live(), parseShares('rec_krby=80,rec_mod=5,rec_gov=14'), WALLET)).toThrow('total 99%, not 100%')
    expect(() => planRevenueSplits(live(), parseShares('rec_krby=80,rec_mod=5.001,rec_gov=15'), WALLET)).toThrow('total 100.001%, not 100%')
    expect(() => planRevenueSplits(live(), parseShares('rec_krby=85,rec_mod=0,rec_gov=15'), WALLET)).toThrow('"rec_mod" must be more than 0%')
    expect(() => planRevenueSplits(live(), parseShares('rec_krby=80,rec_krby=5,rec_gov=15'), WALLET)).toThrow('"rec_krby" is named twice')
    expect(() => planRevenueSplits(live(), [], WALLET)).toThrow('at least one share')
  })

  test('this step changes shares only: a receiver cannot be dropped, added or renamed', () => {
    expect(() => planRevenueSplits(live(), parseShares('rec_krby=85,rec_gov=15'), WALLET)).toThrow('name exactly those receivers')
    expect(() => planRevenueSplits(live(), parseShares('rec_krby=80,rec_mod=5,rec_gov=10,rec_new=5'), WALLET)).toThrow('name exactly those receivers')
    expect(() => planRevenueSplits(live(), parseShares('rec_krby=80,rec_mods=5,rec_gov=15'), WALLET)).toThrow('pays rec_krby, rec_mod, rec_gov today')
    // One receiver cannot take everything through this step either, whatever the chain would accept.
    expect(() => planRevenueSplits(live(), parseShares('rec_krby=100'), WALLET)).toThrow('name exactly those receivers')
  })

  test('a stored table this step does not understand is left alone', () => {
    const flat = live(); flat[1].type = SplitDistributionType.Flat
    expect(() => planRevenueSplits(flat, RELEASE, WALLET)).toThrow('"rec_mod" a flat amount or the remainder')
    const remainder = live(); remainder[2].type = SplitDistributionType.Remainder
    expect(() => planRevenueSplits(remainder, RELEASE, WALLET)).toThrow('"rec_gov" a flat amount or the remainder')
    const elsewhere = live(); elsewhere[0].wallet = 7n
    expect(() => planRevenueSplits(elsewhere, RELEASE, WALLET)).toThrow('on wallet 7, not the DAO wallet')
    expect(() => planRevenueSplits([...live(), live()[0]], RELEASE, WALLET)).toThrow('names a receiver twice')
  })

  test('an empty table takes the receivers in the order given, and at most ten', () => {
    const plan = planRevenueSplits([], RELEASE, WALLET)
    expect(plan.rows).toEqual([{ escrow: 'rec_krby', from: undefined, to: 80_000n }, { escrow: 'rec_mod', from: undefined, to: 5_000n }, { escrow: 'rec_gov', from: undefined, to: 15_000n }])
    expect(plan.actions).toHaveLength(1)
    const eleven = Array.from({ length: 11 }, (_, i) => ({ escrow: `rec_${i}`, value: i === 0 ? 90_000n : 1_000n }))
    expect(() => planRevenueSplits([], eleven, WALLET)).toThrow('at most 10 receivers')
  })

  test('shares parse as percentages with up to three decimals', () => {
    expect(RELEASE).toEqual([{ escrow: 'rec_krby', value: 80_000n }, { escrow: 'rec_mod', value: 5_000n }, { escrow: 'rec_gov', value: 15_000n }])
    expect(parseShares(' rec_a=12.5 , rec_b=87.499,rec_c=0.001')).toEqual([{ escrow: 'rec_a', value: 12_500n }, { escrow: 'rec_b', value: 87_499n }, { escrow: 'rec_c', value: 1n }])
    for (const bad of ['rec_krby', 'rec_krby=80%', 'rec_krby=1.2345', 'rec_krby=80=5', '=5', 'rec_krby=-5', 'rec_krby=eighty', '']) {
      expect(() => parseShares(bad)).toThrow('--split takes escrow=percent pairs')
    }
    expect([percent(80_000n), percent(12_500n), percent(1n), percent(100_000n), percent(0n)]).toEqual(['80%', '12.5%', '0.001%', '100%', '0%'])
  })

  test('the table encodes to the bytes MainNet stores, and the new table is the same size', () => {
    const encode = (table: StoredSplit[]) => Buffer.from(TABLE_TYPE.encode(SplitsToTuples(table.map((split) => entry(split.escrow, split.value))))).toString('hex')
    expect(encode(live())).toBe(LIVE_BYTES)
    const decoded = (TABLE_TYPE.decode(Uint8Array.from(Buffer.from(LIVE_BYTES, 'hex'))) as [[bigint, string], bigint, bigint][])
      .map(([[wallet, escrow], type, value]) => ({ wallet, escrow, type: Number(type), value }))
    expect(decoded).toEqual(live())
    const next = encode(planRevenueSplits(live(), RELEASE, WALLET).expected)
    expect(next).not.toBe(LIVE_BYTES)
    expect(next.length).toBe(LIVE_BYTES.length)
  })

  test('a read-back that differs is named entry by entry', () => {
    const expected = planRevenueSplits(live(), RELEASE, WALLET).expected
    expect(splitDifferences(expected, expected)).toEqual([])
    expect(splitDifferences(live(), expected)).toHaveLength(3)
    expect(splitDifferences(expected.slice(0, 2), expected)).toEqual([`entry 3: nothing, expected rec_gov on wallet ${WALLET}, type 20, value 15000`])
  })
})

describe('revenue receiver opt-ins', () => {
  test('a receiver opts in to the wanted assets it does not hold, each once, in ascending order', () => {
    const USDC = 31566704n, AKTA = 523683256n
    expect(missingAssets([AKTA, USDC, AKTA], [])).toEqual([USDC, AKTA])
    expect(missingAssets([USDC, AKTA], [AKTA, 5n])).toEqual([USDC])
    expect(missingAssets([USDC, AKTA], [USDC, AKTA])).toEqual([])
    expect(missingAssets([], [USDC])).toEqual([])
  })

  // TestNet rehearsal 2026-11-25: step G2 had moved the receivers' grants to the new OptInPlugin and
  // left pal.optin on the old one, and the step read pal.optin alone and refused.
  describe('which OptInPlugin the receivers granted', () => {
    const ZERO = algosdk.ALGORAND_ZERO_ADDRESS_STRING
    const OLD = 763128795n
    const NEW = 777358640n
    const receivers = ['rec_krby', 'rec_mod', 'rec_gov']
    const open = (plugin: bigint) => receivers.map((escrow) => ({ plugin, caller: ZERO, escrow }))

    test('after G2 it is the newest registered plugin, though pal.optin still names the old one', () => {
      expect(chooseOptInPlugin([NEW, OLD], receivers, open(NEW))).toBe(NEW)
    })
    test('before G2 it is the plugin pal.optin names, though a newer one is registered', () => {
      expect(chooseOptInPlugin([NEW, OLD], receivers, open(OLD))).toBe(OLD)
    })
    test('a grant held by one caller, or on another escrow, is not an open grant of the receiver', () => {
      const other = [{ plugin: NEW, caller: 'CALLER', escrow: 'rec_krby' }, { plugin: NEW, caller: ZERO, escrow: 'rev_social' }]
      expect(chooseOptInPlugin([NEW, OLD], receivers, [...other, ...open(OLD)])).toBe(OLD)
    })
    test('a plugin every receiver granted wins over one only some granted', () => {
      expect(chooseOptInPlugin([NEW, OLD], receivers, [...open(NEW).slice(0, 1), ...open(OLD)])).toBe(OLD)
      expect(chooseOptInPlugin([NEW, OLD], receivers, open(NEW).slice(0, 2))).toBe(NEW)
    })
    test('with no grant at all it names the first candidate, and unset ids are left out', () => {
      expect(chooseOptInPlugin([0n, OLD], receivers, [])).toBe(OLD)
      expect(chooseOptInPlugin([NEW, OLD], receivers, [])).toBe(NEW)
      expect(chooseOptInPlugin([0n, 0n], receivers, [])).toBe(0n)
    })
  })
})

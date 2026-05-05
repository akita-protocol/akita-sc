import { describe, test, expect } from 'vitest'
import { encodeAddress } from 'algosdk'
import {
  SpendAllowanceTypeFromString,
  AllowancesToTuple,
  AllowanceInfoTranslate,
  executionBoxKey,
  domainBoxKey,
  ValueMap,
} from './utils'
import type { AddAllowanceArgs } from './types'
import type { AllowanceInfo as SubAllowanceInfo } from '../generated/AbstractedAccountClient'

describe('SpendAllowanceTypeFromString', () => {
  test('maps "flat" → 1n', () => {
    expect(SpendAllowanceTypeFromString('flat')).toBe(1n)
  })

  test('maps "window" → 2n', () => {
    expect(SpendAllowanceTypeFromString('window')).toBe(2n)
  })

  test('maps "drip" → 3n', () => {
    expect(SpendAllowanceTypeFromString('drip')).toBe(3n)
  })

  test('throws on unknown type', () => {
    expect(() => SpendAllowanceTypeFromString('bogus')).toThrow(/Invalid allowance type: bogus/)
  })

  test('throws on empty string', () => {
    expect(() => SpendAllowanceTypeFromString('')).toThrow(/Invalid allowance type:/)
  })

  test('is case-sensitive (rejects "FLAT")', () => {
    // Lock in current behavior: the base contract keys on the exact lowercase
    // form, so the SDK has to match that. If we ever decide to accept mixed
    // case, this test will fail and force a conscious update.
    expect(() => SpendAllowanceTypeFromString('FLAT')).toThrow(/Invalid allowance type/)
  })
})

describe('AllowancesToTuple', () => {
  test('flat allowance: [asset, 1n, amount, 0n, 0n, useRounds]', () => {
    const input: AddAllowanceArgs[] = [
      { asset: 0n, type: 'flat', amount: 1_000_000n },
    ]
    expect(AllowancesToTuple(input)).toEqual([[0n, 1n, 1_000_000n, 0n, 0n, false]])
  })

  test('window allowance: [asset, 2n, amount, 0n, interval, useRounds]', () => {
    const input: AddAllowanceArgs[] = [
      { asset: 42n, type: 'window', amount: 500n, interval: 3600n },
    ]
    expect(AllowancesToTuple(input)).toEqual([[42n, 2n, 500n, 0n, 3600n, false]])
  })

  test('drip allowance: [asset, 3n, rate, max, interval, useRounds]', () => {
    const input: AddAllowanceArgs[] = [
      { asset: 42n, type: 'drip', rate: 10n, max: 1000n, interval: 60n },
    ]
    expect(AllowancesToTuple(input)).toEqual([[42n, 3n, 10n, 1000n, 60n, false]])
  })

  test('propagates useRounds=true', () => {
    const input: AddAllowanceArgs[] = [
      { asset: 0n, type: 'flat', amount: 1n, useRounds: true },
    ]
    expect(AllowancesToTuple(input)[0][5]).toBe(true)
  })

  test('defaults useRounds to false when omitted', () => {
    const input: AddAllowanceArgs[] = [
      { asset: 0n, type: 'flat', amount: 1n },
    ]
    expect(AllowancesToTuple(input)[0][5]).toBe(false)
  })

  test('handles multiple allowances in order', () => {
    const input: AddAllowanceArgs[] = [
      { asset: 0n, type: 'flat', amount: 1n },
      { asset: 1n, type: 'window', amount: 2n, interval: 100n },
      { asset: 2n, type: 'drip', rate: 3n, max: 30n, interval: 10n },
    ]
    const result = AllowancesToTuple(input)
    expect(result.length).toBe(3)
    expect(result[0][1]).toBe(1n) // flat
    expect(result[1][1]).toBe(2n) // window
    expect(result[2][1]).toBe(3n) // drip
  })

  test('returns empty array for empty input', () => {
    expect(AllowancesToTuple([])).toEqual([])
  })
})

describe('AllowanceInfoTranslate', () => {
  // The SubAllowanceInfo type from AbstractedAccountClient is a unified struct
  // that carries fields for every variant (spent/amount/max/interval/rate). The
  // translator picks the right subset based on the numeric `type` discriminator.

  const base = {
    last: 100n,
    start: 50n,
    useRounds: false,
    // Variant-specific fields — present on the unified struct but ignored
    // depending on `type`.
    spent: 0n,
    amount: 0n,
    max: 0n,
    interval: 0n,
  }

  test('type 1 → flat', () => {
    const input = { ...base, type: 1, amount: 1_000_000n, spent: 200n } as unknown as SubAllowanceInfo
    expect(AllowanceInfoTranslate(input)).toEqual({
      type: 'flat',
      amount: 1_000_000n,
      spent: 200n,
      last: 100n,
      start: 50n,
      useRounds: false,
    })
  })

  test('type 2 → window (includes interval)', () => {
    const input = { ...base, type: 2, amount: 500n, spent: 100n, interval: 3600n } as unknown as SubAllowanceInfo
    expect(AllowanceInfoTranslate(input)).toEqual({
      type: 'window',
      amount: 500n,
      spent: 100n,
      interval: 3600n,
      last: 100n,
      start: 50n,
      useRounds: false,
    })
  })

  test('type 3 → drip (remaps amount→rate, spent→lastLeftover, carries max+interval)', () => {
    // The drip form is the tricky one: the on-chain struct reuses `amount`
    // for the drip rate and `spent` for the remaining leftover from the last
    // interval. The translator renames those so downstream code can
    // distinguish drip semantics without a discriminator re-check.
    const input = { ...base, type: 3, amount: 10n, spent: 5n, max: 1000n, interval: 60n } as unknown as SubAllowanceInfo
    expect(AllowanceInfoTranslate(input)).toEqual({
      type: 'drip',
      rate: 10n,
      lastLeftover: 5n,
      max: 1000n,
      interval: 60n,
      last: 100n,
      start: 50n,
      useRounds: false,
    })
  })

  test('propagates useRounds', () => {
    const input = { ...base, type: 1, amount: 1n, useRounds: true } as unknown as SubAllowanceInfo
    const result = AllowanceInfoTranslate(input)
    expect(result.useRounds).toBe(true)
  })

  test('throws on unknown type', () => {
    const input = { ...base, type: 99 } as unknown as SubAllowanceInfo
    expect(() => AllowanceInfoTranslate(input)).toThrow(/Unknown allowance type 99/)
  })

  test('throws on type 0', () => {
    const input = { ...base, type: 0 } as unknown as SubAllowanceInfo
    expect(() => AllowanceInfoTranslate(input)).toThrow(/Unknown allowance type 0/)
  })
})

describe('executionBoxKey', () => {
  test('prefixes "x" byte', () => {
    const key = executionBoxKey('my-lease')
    // 0x78 is the ASCII value of 'x'
    expect(key[0]).toBe(0x78)
  })

  test('returns prefix + encoded lease (32-byte encoded lease → 33 bytes total)', () => {
    // algokit's encodeLease produces a 32-byte padded output
    const key = executionBoxKey('my-lease')
    expect(key.length).toBe(33)
  })

  test('produces deterministic output for the same lease', () => {
    const a = executionBoxKey('my-lease')
    const b = executionBoxKey('my-lease')
    expect(Array.from(a)).toEqual(Array.from(b))
  })

  test('produces different output for different leases', () => {
    const a = executionBoxKey('lease-1')
    const b = executionBoxKey('lease-2')
    expect(Array.from(a)).not.toEqual(Array.from(b))
  })
})

describe('domainBoxKey', () => {
  // Build the zero-address deterministically from a known zero pubkey.
  // This is the correct base32 form with Algorand's checksum appended.
  const ZERO_PUBKEY = new Uint8Array(32)
  const ZERO_ADDR = encodeAddress(ZERO_PUBKEY)

  test('prefixes "d" byte', () => {
    const key = domainBoxKey(ZERO_ADDR)
    // 0x64 is the ASCII value of 'd'
    expect(key[0]).toBe(0x64)
  })

  test('returns prefix + 32 pubkey bytes = 33 total', () => {
    const key = domainBoxKey(ZERO_ADDR)
    expect(key.length).toBe(33)
  })

  test('zero-address produces 32 trailing zero bytes', () => {
    const key = domainBoxKey(ZERO_ADDR)
    // byte[0] is the 'd' prefix; byte[1..33] is the public key
    for (let i = 1; i < 33; i++) {
      expect(key[i]).toBe(0)
    }
  })

  test('distinct addresses produce distinct keys', () => {
    const addrA = encodeAddress(new Uint8Array(32).fill(0x01))
    const addrB = encodeAddress(new Uint8Array(32).fill(0x02))
    const keyA = domainBoxKey(addrA)
    const keyB = domainBoxKey(addrB)
    expect(Array.from(keyA)).not.toEqual(Array.from(keyB))
  })
})

describe('ValueMap', () => {
  type Key = { asset: bigint; owner: string }
  const keyGen = (k: Key) => `${k.asset}:${k.owner}`

  test('set/get with object key uses keyGenerator', () => {
    const m = new ValueMap<Key, string>(keyGen)
    m.set({ asset: 1n, owner: 'alice' }, 'value-a')
    expect(m.get({ asset: 1n, owner: 'alice' })).toBe('value-a')
  })

  test('get returns undefined for missing key', () => {
    const m = new ValueMap<Key, string>(keyGen)
    expect(m.get({ asset: 1n, owner: 'alice' })).toBeUndefined()
  })

  test('set with string key bypasses keyGenerator', () => {
    const m = new ValueMap<Key, string>(keyGen)
    m.set('raw-key', 'value-raw')
    expect(m.get('raw-key')).toBe('value-raw')
  })

  test('string key matches the generated key for the equivalent object', () => {
    const m = new ValueMap<Key, string>(keyGen)
    m.set({ asset: 7n, owner: 'bob' }, 'value-b')
    expect(m.get('7:bob')).toBe('value-b')
  })

  test('size reflects number of entries', () => {
    const m = new ValueMap<Key, string>(keyGen)
    expect(m.size).toBe(0)
    m.set({ asset: 1n, owner: 'a' }, 'x')
    m.set({ asset: 2n, owner: 'a' }, 'y')
    expect(m.size).toBe(2)
  })

  test('delete removes entry and returns true; false when missing', () => {
    const m = new ValueMap<Key, string>(keyGen)
    m.set({ asset: 1n, owner: 'a' }, 'x')
    expect(m.delete({ asset: 1n, owner: 'a' })).toBe(true)
    expect(m.get({ asset: 1n, owner: 'a' })).toBeUndefined()
    expect(m.delete({ asset: 1n, owner: 'a' })).toBe(false)
  })

  test('has returns correct boolean', () => {
    const m = new ValueMap<Key, string>(keyGen)
    expect(m.has({ asset: 1n, owner: 'a' })).toBe(false)
    m.set({ asset: 1n, owner: 'a' }, 'x')
    expect(m.has({ asset: 1n, owner: 'a' })).toBe(true)
  })

  test('clear empties the map', () => {
    const m = new ValueMap<Key, string>(keyGen)
    m.set({ asset: 1n, owner: 'a' }, 'x')
    m.set({ asset: 2n, owner: 'b' }, 'y')
    m.clear()
    expect(m.size).toBe(0)
    expect(m.get({ asset: 1n, owner: 'a' })).toBeUndefined()
  })

  test('accepts initial iterable in constructor', () => {
    const m = new ValueMap<Key, string>(keyGen, [
      [{ asset: 1n, owner: 'a' }, 'x'],
      [{ asset: 2n, owner: 'b' }, 'y'],
    ])
    expect(m.size).toBe(2)
    expect(m.get({ asset: 1n, owner: 'a' })).toBe('x')
    expect(m.get({ asset: 2n, owner: 'b' })).toBe('y')
  })

  test('is iterable via for-of', () => {
    const m = new ValueMap<Key, string>(keyGen)
    m.set({ asset: 1n, owner: 'a' }, 'x')
    m.set({ asset: 2n, owner: 'b' }, 'y')
    const seen: [string, string][] = []
    for (const [k, v] of m) seen.push([k, v])
    expect(seen).toEqual([['1:a', 'x'], ['2:b', 'y']])
  })
})

/**
 * The pre-upgrade top-up of `scripts/fund-subscription-service-reserve.ts` (audit 07, SUB-02): before
 * the Subscriptions upgrade the app has to hold, above its minimum balance, both the ALGO subscribers
 * can withdraw and the storage the services that already exist could still take for nothing.
 */
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'
import {
  boxMbr,
  describeServiceReserve,
  readAlgoEscrow,
  SERVICES_MBR,
  SERVICES_PREFIX,
  SUBSCRIPTION_BYTES,
  SUBSCRIPTION_FIELDS,
  SUBSCRIPTIONS_PREFIX,
  subscriptionOffset,
  type ServiceReservePlan,
} from '../scripts/lib/subscription-service-reserve'

/** The contract's own constants, read from its source (the module is contract code). */
const constants = readFileSync(path.resolve(__dirname, '../smart_contracts/subscriptions/constants.ts'), 'utf8')
const constant = (name: string, pattern: string): string => {
  const match = constants.match(new RegExp(`export const ${name}[^=]*= ${pattern}`))
  if (!match) throw new Error(`${name} not found in the subscriptions constants`)
  return match[1]
}

/** The fields of one of the contract's own structs, in order, read from its source. */
const types = readFileSync(path.resolve(__dirname, '../smart_contracts/subscriptions/types.ts'), 'utf8')
const structFields = (name: string): { field: string; type: string }[] => {
  const match = types.match(new RegExp(`export type ${name} = \\{([^}]*)\\}`))
  if (!match) throw new Error(`${name} not found in the subscriptions types`)
  return match[1]
    .split('\n')
    .map((line) => line.replace(/\/\/.*$/, '').trim().replace(/[,;]$/, ''))
    .filter((line) => line.length > 0)
    .map((line) => {
      const [field, type] = line.split(':').map((part) => part.trim())
      return { field, type }
    })
}

/** What `planServiceReserve` works out, with the chain reads replaced by numbers. */
const plan = (
  balance: bigint,
  minBalance: bigint,
  serviceBoxBytes: number[],
  escrows: bigint[],
): ServiceReservePlan => {
  const services = serviceBoxBytes.map((bytes) => {
    const mbr = boxMbr(41, bytes)
    return { key: new Uint8Array(41), bytes, mbr, owed: mbr >= SERVICES_MBR ? 0n : SERVICES_MBR - mbr }
  })
  const reserveOwed = services.reduce((sum, s) => sum + s.owed, 0n)
  const algoEscrow = escrows.reduce((sum, e) => sum + e, 0n)
  const free = balance > minBalance ? balance - minBalance : 0n
  const needed = reserveOwed + algoEscrow
  return {
    appId: 7n,
    address: 'A',
    balance,
    minBalance,
    free,
    services,
    reserveOwed,
    algoEscrow,
    shortfall: needed > free ? needed - free : 0n,
  }
}

describe('subscription service reserve (SUB-02)', () => {
  test('the constants are the ones the contract uses', () => {
    expect(SERVICES_PREFIX).toBe(constant('SubscriptionsBoxPrefixServices', "'(.)'"))
    expect(SUBSCRIPTIONS_PREFIX).toBe(constant('SubscriptionsBoxPrefixSubscriptions', "'(.)'"))
    expect(SERVICES_MBR).toBe(BigInt(constant('ServicesMBR', '([0-9_]+)').replace(/_/g, '')))
    // a subscription box is the whole reserve the deployed program charges for one
    expect(boxMbr(41, SUBSCRIPTION_BYTES)).toBe(BigInt(constant('SubscriptionsMBR', '([0-9_]+)').replace(/_/g, '')))
    // and the service reserve is a box of the maximum size the contract allows
    expect(SERVICES_MBR).toBe(boxMbr(41, 3_400))
  })

  test('a subscription box is read at the offsets the contract stores', () => {
    // `asset` read one field early would see `interval`, which is never 0, so every ALGO escrow would
    // be skipped and the shortfall under-counted.
    const fields = structFields('SubscriptionInfo')
    expect(fields.map((f) => f.field)).toEqual(['recipient', ...SUBSCRIPTION_FIELDS])
    expect(fields[0].type).toBe('Account')
    expect(fields.slice(1).map((f) => f.type)).toEqual(fields.slice(1).map((f) => (f.field === 'serviceID' ? 'ServiceID' : 'uint64')))
    expect(SUBSCRIPTION_BYTES).toBe(104)
    expect(subscriptionOffset('asset')).toBe(64)
    expect(subscriptionOffset('escrowed')).toBe(96)
  })

  test('a service owes the reserve less what its box already holds', () => {
    const one = plan(10_000_000n, 1_000_000n, [168], [])
    expect(one.services[0].mbr).toBe(2_500n + 400n * 209n)
    expect(one.reserveOwed).toBe(SERVICES_MBR - (2_500n + 400n * 209n))
    // a service already at the maximum owes nothing
    expect(plan(10_000_000n, 1_000_000n, [3_400], []).reserveOwed).toBe(0n)
  })

  test('the four MainNet services need 1,284,400 µALGO more than today\'s surplus (audit 07)', () => {
    // The live app when the audit read it: four service boxes of 451 bytes, so 199,300 µALGO of reserve
    // each, 797,200 in all, and 3,434,000 µALGO above its minimum balance with no ALGO escrow.
    const live = plan(1_000_000n + 3_434_000n, 1_000_000n, [451, 451, 451, 451], [])
    expect(live.services.map((s) => s.mbr)).toEqual([199_300n, 199_300n, 199_300n, 199_300n])
    expect(live.reserveOwed).toBe(4n * SERVICES_MBR - 797_200n)
    expect(live.reserveOwed).toBe(4_718_400n)
    expect(live.shortfall).toBe(1_284_400n)
  })

  test('escrowed ALGO counts on top of the reserve, and other assets do not', () => {
    const withEscrow = plan(5_000_000n, 1_000_000n, [3_400], [2_000_000n, 3_000_000n])
    expect(withEscrow.algoEscrow).toBe(5_000_000n)
    expect(withEscrow.shortfall).toBe(1_000_000n)
    expect(plan(5_000_000n, 1_000_000n, [3_400], [4_000_000n]).shortfall).toBe(0n)
  })

  test('only an ALGO escrow of a whole subscription box is counted', () => {
    const box = (asset: bigint, escrowed: bigint) => {
      const value = new Uint8Array(SUBSCRIPTION_BYTES)
      const view = new DataView(value.buffer)
      view.setBigUint64(subscriptionOffset('interval'), 2_592_000n) // a renewal interval is never 0
      view.setBigUint64(subscriptionOffset('asset'), asset)
      view.setBigUint64(subscriptionOffset('escrowed'), escrowed)
      return value
    }
    expect(readAlgoEscrow(box(0n, 1_234n))).toBe(1_234n)
    expect(readAlgoEscrow(box(31566704n, 1_234n))).toBe(0n)
    expect(readAlgoEscrow(new Uint8Array(40))).toBe(0n)
  })

  test('what the check prints says whether E2 may go ahead', () => {
    const short = describeServiceReserve(plan(1_000_000n, 1_000_000n, [451], [])).join('\n')
    expect(short).toContain(`send ${SERVICES_MBR - 199_300n} µALGO before the upgrade (E2)`)
    expect(short).toContain('SUB-02')
    const covered = describeServiceReserve(plan(10_000_000n, 1_000_000n, [3_400], [])).join('\n')
    expect(covered).toContain('nothing to send')
  })
})

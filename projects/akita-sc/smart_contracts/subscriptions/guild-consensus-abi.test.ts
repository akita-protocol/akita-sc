import { readFileSync } from 'node:fs'
import path from 'node:path'
import algosdk from 'algosdk'
import { describe, expect, test } from 'vitest'

/**
 * Static check (no LocalNet) of the Subscriptions calls made by the Guild subscription consensus
 * (`arc58/guilds/consensus/subscriptions/contract.algo.ts`) after the principal-resolution overloads.
 *
 * `methodSelector<typeof Subscriptions.prototype.newService>()` resolves to the HINTED selector (11 ABI args
 * after the payment), so a guild that keeps the pre-hint 10 args compiles but reverts on every createService. This test reads the compiled
 * TEAL and asserts, for every inner call that pushes a method selector, that the number of ApplicationArgs equals
 * 1 + the method's ABI arg count (transaction args excluded), and that the guild and its test mock use only the
 * hinted Subscriptions selectors.
 */

type Arc56 = { methods: { name: string; args: { type: string }[]; returns: { type: string } }[] }

const root = path.resolve(__dirname, '..')
const read = (file: string) => readFileSync(path.join(root, file), 'utf8')
const readJson = <T>(file: string): T => JSON.parse(read(file)) as T

const guildTeal = read('artifacts/arc58/guilds/consensus/subscriptions/SubscriptionGuildConsensus.approval.teal')
const subscriptions = readJson<Arc56>('artifacts/subscriptions/Subscriptions.arc56.json')
const mock = readJson<Arc56>('artifacts/arc58/guilds/tests/MockGuildSubscriptions.arc56.json')

const signature = (m: Arc56['methods'][number]) => `${m.name}(${m.args.map((a) => a.type).join(',')})${m.returns.type}`
const TXN_TYPES = new Set(['txn', 'pay', 'keyreg', 'acfg', 'axfer', 'afrz', 'appl'])
const abiArgCount = (sig: string) =>
  algosdk.ABIMethod.fromSignature(sig).args.filter((a) => !TXN_TYPES.has(String(a.type))).length

const HINTED_NEW_SERVICE =
  'newService(pay,uint64,uint64,uint64,uint64,uint64,address,string,byte[36],uint8,byte[3],uint64)uint64'
const LEGACY_NEW_SERVICE =
  'newService(pay,uint64,uint64,uint64,uint64,uint64,address,string,byte[36],uint8,byte[3])uint64'
const HINTED_NEW_SERVICE_COST = 'newServiceCost(uint64,uint64)uint64'
const LEGACY_NEW_SERVICE_COST = 'newServiceCost(uint64)uint64'

/** Each inner call in the TEAL that pushes a selector: its signature and the ApplicationArgs it sets. */
const innerCalls = (teal: string) => {
  const lines = teal.split('\n').map((l) => l.trim()).filter((l) => l !== '' && !l.startsWith('//'))
  const calls: { sig: string; appArgs: number }[] = []
  for (let i = 0; i < lines.length; i++) {
    const m = /^pushbytes 0x[0-9a-f]{8} \/\/ method "([^"]+)"$/.exec(lines[i])
    if (!m || lines[i + 1] !== 'itxn_field ApplicationArgs') continue
    let appArgs = 0
    for (let j = i + 1; j < lines.length && !/^itxn_(next|submit)$/.test(lines[j]); j++) {
      if (lines[j] === 'itxn_field ApplicationArgs') appArgs++
    }
    calls.push({ sig: m[1], appArgs })
  }
  return calls
}

describe('Guild subscription consensus → Subscriptions ABI (principal-resolution overloads)', () => {
  const calls = innerCalls(guildTeal)

  test('the guild calls the hinted newService and newServiceCost, never the legacy selectors', () => {
    const sigs = calls.map((c) => c.sig)
    expect(sigs).toContain(HINTED_NEW_SERVICE)
    expect(sigs).toContain(HINTED_NEW_SERVICE_COST)
    expect(sigs).not.toContain(LEGACY_NEW_SERVICE)
    expect(sigs).not.toContain(LEGACY_NEW_SERVICE_COST)
  })

  test('every inner call sets exactly 1 + (ABI arg count) ApplicationArgs', () => {
    expect(calls.length).toBeGreaterThan(0)
    for (const call of calls) {
      expect(call.appArgs, call.sig).toBe(1 + abiArgCount(call.sig))
    }
  })

  test('newService sets 12 ApplicationArgs: selector + 10 offering fields + hint 0 (the payment is a group txn)', () => {
    expect(abiArgCount(HINTED_NEW_SERVICE)).toBe(abiArgCount(LEGACY_NEW_SERVICE) + 1)
    const create = calls.filter((c) => c.sig === HINTED_NEW_SERVICE)
    expect(create.length).toBeGreaterThan(0)
    for (const c of create) expect(c.appArgs).toBe(12)
  })

  test('every Subscriptions method the guild calls is routed by Subscriptions and by MockGuildSubscriptions', () => {
    const real = subscriptions.methods.map(signature)
    const mocked = mock.methods.map(signature)
    const subscriptionNames = new Set(subscriptions.methods.map((m) => m.name))
    const used = calls.map((c) => c.sig).filter((sig) => subscriptionNames.has(sig.slice(0, sig.indexOf('('))))
    expect(used).toEqual(expect.arrayContaining([HINTED_NEW_SERVICE, HINTED_NEW_SERVICE_COST, 'activateService()void']))
    for (const sig of used) {
      expect(real, sig).toContain(sig)
      expect(mocked, sig).toContain(sig)
    }
  })

  test('the mock mirrors only the hinted overloads (no stale legacy signatures)', () => {
    const mocked = mock.methods.map(signature)
    expect(mocked).not.toContain(LEGACY_NEW_SERVICE)
    expect(mocked).not.toContain(LEGACY_NEW_SERVICE_COST)
  })
})

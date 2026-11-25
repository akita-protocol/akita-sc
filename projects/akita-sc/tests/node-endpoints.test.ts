/**
 * Which node a rollout command talks to, and with which key.
 *
 * The TestNet rehearsal of 2026-11-25 was rate limited on the public endpoints, so a MainNet run uses
 * the owner's Nodely key. The key comes from NODELY_API_KEY (or --token) and is sent only to the hosts
 * its plan is honoured on. These checks need no network.
 */
import { describe, expect, test } from 'vitest'
import { describeNode, nodelyEndpoints, nodeToken } from '../scripts/script-base'

const KEY = 'k'.repeat(32)

describe('node key', () => {
  test('--token wins over NODELY_API_KEY, and blanks count as unset', () => {
    expect(nodeToken('mainnet', 'explicit', { NODELY_API_KEY: KEY })).toBe('explicit')
    expect(nodeToken('mainnet', undefined, { NODELY_API_KEY: ` ${KEY}\n` })).toBe(KEY)
    expect(nodeToken('testnet', '  ', { NODELY_API_KEY: KEY })).toBe(KEY)
    expect(nodeToken('mainnet', undefined, { NODELY_API_KEY: '   ' })).toBeUndefined()
    expect(nodeToken('mainnet', undefined, {})).toBeUndefined()
  })

  test('LocalNet never takes the key', () => {
    expect(nodeToken('localnet', 'explicit', { NODELY_API_KEY: KEY })).toBeUndefined()
    expect(nodelyEndpoints('localnet', { NODELY_PLAN: 'unlimited' })).toBeUndefined()
    expect(describeNode('localnet', undefined, { NODELY_API_KEY: KEY })).toBe('LocalNet')
  })
})

describe('Nodely hosts by plan', () => {
  test('a Boost key, the default, goes to the public hosts', () => {
    for (const env of [{}, { NODELY_PLAN: '' }, { NODELY_PLAN: 'boost' }, { NODELY_PLAN: ' Boost ' }]) {
      expect(nodelyEndpoints('mainnet', env)).toEqual({ algod: 'https://mainnet-api.4160.nodely.dev', indexer: 'https://mainnet-idx.4160.nodely.dev' })
      expect(nodelyEndpoints('testnet', env)).toEqual({ algod: 'https://testnet-api.4160.nodely.dev', indexer: 'https://testnet-idx.4160.nodely.dev' })
    }
  })

  test('an Unlimited or Enterprise key goes to the commercial hosts', () => {
    for (const plan of ['unlimited', 'enterprise', 'UNLIMITED']) {
      expect(nodelyEndpoints('mainnet', { NODELY_PLAN: plan })).toEqual({ algod: 'https://mainnet-api.4160.nodely.io', indexer: 'https://mainnet-idx.4160.nodely.io' })
      expect(nodelyEndpoints('testnet', { NODELY_PLAN: plan })).toEqual({ algod: 'https://testnet-api.4160.nodely.io', indexer: 'https://testnet-idx.4160.nodely.io' })
    }
  })

  test('an unknown plan stops the run instead of guessing a host', () => {
    expect(() => nodelyEndpoints('mainnet', { NODELY_PLAN: 'pro' })).toThrow(/NODELY_PLAN is "pro"; use one of boost, unlimited, enterprise/)
  })
})

describe('the Node line of a run', () => {
  test('it names the host and never the key', () => {
    const line = describeNode('mainnet', undefined, { NODELY_API_KEY: KEY, NODELY_PLAN: 'unlimited' })
    expect(line).toBe('https://mainnet-api.4160.nodely.io (with the Nodely key)')
    expect(line).not.toContain(KEY)
    expect(describeNode('testnet', KEY, {})).toBe('https://testnet-api.4160.nodely.dev (with the Nodely key)')
  })

  test('without a key it says the public endpoint is in use and how to set one', () => {
    expect(describeNode('mainnet', undefined, {})).toBe('the public mainnet endpoint (no key; set NODELY_API_KEY to use one)')
  })
})

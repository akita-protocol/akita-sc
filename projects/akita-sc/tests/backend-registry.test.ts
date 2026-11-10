import { describe, expect, test } from 'vitest'
import { updateBackendRegistry } from '../scripts/script-base'

const REGISTRY = `var contractNetworks = map[string]contractNetworkInfo{
\t"mainnet": {
\t\tSubscriptionsAppID:        3569556497,
\t\tEscrowFactoryAppIDs:       []uint64{3569555755},
\t\tSubscriptionsPluginAppIDs: []uint64{3368399152, 3569561107},
\t\tRewardsAppIDs:             []uint64{3569556095},
\t},
\t"testnet": {
\t\tSubscriptionsAppID:        763128278,
\t\tRewardsAppIDs:             []uint64{763128244},
\t},
}`

describe('akita-backend contract registry sync', () => {
  test('a new Rewards id is appended on its own network and v1 stays listed', () => {
    const next = updateBackendRegistry(REGISTRY, 'mainnet', 'rewards', 4000000001n)!
    expect(next).toContain('RewardsAppIDs:             []uint64{3569556095, 4000000001},')
    expect(next).toContain('RewardsAppIDs:             []uint64{763128244},')
  })

  test('re-recording a listed id changes nothing', () => {
    expect(updateBackendRegistry(REGISTRY, 'mainnet', 'rewards', 3569556095n)).toBeUndefined()
  })

  test('a scalar field is replaced, unmapped keys and localnet are ignored', () => {
    expect(updateBackendRegistry(REGISTRY, 'testnet', 'subscriptions', 999n)).toContain('SubscriptionsAppID:        999,')
    expect(updateBackendRegistry(REGISTRY, 'mainnet', 'social', 1n)).toBeUndefined()
    expect(updateBackendRegistry(REGISTRY, 'localnet', 'rewards', 1n)).toBeUndefined()
  })

  test('a registry without the field fails loudly instead of silently skipping', () => {
    expect(() => updateBackendRegistry(REGISTRY.replace(/\t\tRewardsAppIDs.*\n/g, ''), 'mainnet', 'rewards', 1n)).toThrow(/RewardsAppIDs/)
  })
})

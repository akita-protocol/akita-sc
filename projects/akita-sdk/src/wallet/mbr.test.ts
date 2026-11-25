import { describe, expect, test, vi } from 'vitest'
import { WalletSDK } from './index'

describe('Wallet execution funding', () => {
  test('uses the MBR contract quote for execution storage', async () => {
    const quote = { plugins: 38_900n, namedPlugins: 3_700n, escrows: 29_700n, allowances: 7_700n,
      domainKeys: 0n, executions: 36_500n, escrowExists: false, newEscrowMintCost: 0n }
    const mbr = vi.fn().mockResolvedValue(quote)
    const wallet = { client: { appId: 123n }, mbrClient: { mbr } } as unknown as WalletSDK
    const params = { escrow: '', methodCount: 0n, plugin: '', groups: 1n }

    const result = await WalletSDK.prototype.getMbr.call(wallet, params)

    expect(result).toEqual(quote)
    expect(mbr.mock.calls[0][0].args).toEqual({ appId: 123n, ...params })
  })
})

describe('Wallet escrow storage since 2.0.0', () => {
  test('the count of what uses an escrow costs 6,100 µALGO plus 400 per byte of the name', async () => {
    const { escrowCountMbr } = await import('./constants')
    expect(escrowCountMbr('')).toBe(6_100n)
    expect(escrowCountMbr('rewards')).toBe(8_900n)
    // bytes, not characters
    expect(escrowCountMbr('é')).toBe(6_900n)
  })

  test('a grant that uses an escrow by default costs 20,500 µALGO plus 400 per byte of the name more', async () => {
    const { defaultEscrowGrantMbr } = await import('./constants')
    expect(defaultEscrowGrantMbr('rewards')).toBe(23_300n)
    expect(defaultEscrowGrantMbr('é')).toBe(21_300n)
  })
})

describe('The price of plugins installed with a new wallet', () => {
  test('a grant on the main account costs its box only, as before 2.0.0', async () => {
    const { pluginInstallCost } = await import('./constants')
    expect(pluginInstallCost([])).toBe(0n)
    expect(pluginInstallCost([{}])).toBe(38_900n)
    expect(pluginInstallCost([{ escrow: '', methods: [1, 2] }])).toBe(38_900n + 2n * 8_000n)
  })

  test('the first grant that names an escrow also pays for the escrow', async () => {
    const { pluginInstallCost } = await import('./constants')
    // box 38,900 + 7 bytes; escrow app 150,000; account 100,000; record 19,300 + 7 bytes; count 6,100 + 7 bytes
    const first = 38_900n + 2_800n + 150_000n + 100_000n + 19_300n + 2_800n + 6_100n + 2_800n
    expect(pluginInstallCost([{ escrow: 'rewards' }])).toBe(first)
    // the 281,000 the wallet audit measured as missing for a 7-byte name
    expect(first - (38_900n + 2_800n)).toBe(281_000n)
    // a second grant on the same escrow pays for its own box only
    expect(pluginInstallCost([{ escrow: 'rewards' }, { escrow: 'rewards' }])).toBe(first + 38_900n + 2_800n)
  })

  test('a grant that uses its escrow by default stores the name beside the grant, not in its key', async () => {
    const { pluginInstallCost, defaultEscrowGrantMbr } = await import('./constants')
    const escrowItself = 150_000n + 100_000n + 19_300n + 2_800n + 6_100n + 2_800n
    expect(pluginInstallCost([{ escrow: 'rewards', defaultToEscrow: true }]))
      .toBe(38_900n + defaultEscrowGrantMbr('rewards') + escrowItself)
  })
})

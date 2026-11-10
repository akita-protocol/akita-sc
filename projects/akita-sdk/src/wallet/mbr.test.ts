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

/**
 * Extra fee for the inner MBR payments/refunds a wallet makes when its controlled address is
 * external (`_payMbrFromControlled` / `_refundMbrToControlled` in AbstractedAccount). Each one costs
 * one min fee, which the outer call must carry when the caller does not use
 * `coverAppCallInnerTransactionFees` (e.g. after `setSendParams` without the fee flags).
 * Same rule as the addPlugin fix (add-plugin-fee.test.ts), applied to every method that moves MBR.
 */
import { AlgorandClient } from '@algorandfoundation/algokit-utils'
import { ALGORAND_ZERO_ADDRESS_STRING, generateAccount, getApplicationAddress } from 'algosdk'
import { describe, expect, test, vi } from 'vitest'
import { addPluginExtraFee, controlledMbrFee, NewEscrowFeeAmount, newEscrowExtraFee } from './constants'
import { WalletSDK } from './index'

const OWNER = generateAccount().addr.toString()
const EXTERNAL = generateAccount().addr.toString()
const WALLET_ID = 4_321n
const LEASE = new Uint8Array(32)

describe('controlled-address MBR fee helpers', () => {
  test('one min fee per MBR move, only for an external controlled address', () => {
    expect(controlledMbrFee(false)).toBe(0n)
    expect(controlledMbrFee(false, 2n)).toBe(0n)
    expect(controlledMbrFee(true)).toBe(1_000n)
    expect(controlledMbrFee(true, 2n)).toBe(2_000n)
  })

  test('addPluginExtraFee keeps its values (plugin boxes + escrow box)', () => {
    expect(addPluginExtraFee(false, false)).toBe(0n)
    expect(addPluginExtraFee(true, false)).toBe(NewEscrowFeeAmount)
    expect(addPluginExtraFee(false, true)).toBe(1_000n)
    expect(addPluginExtraFee(true, true)).toBe(NewEscrowFeeAmount + 2_000n)
  })

  test('newEscrowExtraFee: factory path only when minting, one escrow-box payment when external', () => {
    expect(newEscrowExtraFee(false, false)).toBe(0n)
    expect(newEscrowExtraFee(true, false)).toBe(NewEscrowFeeAmount)
    expect(newEscrowExtraFee(false, true)).toBe(1_000n)
    expect(newEscrowExtraFee(true, true)).toBe(NewEscrowFeeAmount + 1_000n)
  })
})

type Recorded = { method: string; extraFee?: bigint }

function wallet(controlled: 'app' | 'external') {
  vi.stubEnv('ALGORAND_NETWORK', 'localnet')
  vi.stubEnv('WALLET_MBR_APP_ID', '1')
  const sdk = new WalletSDK({ algorand: AlgorandClient.defaultLocalNet(), factoryParams: { appId: WALLET_ID, defaultSender: OWNER } })
  const client = sdk.client as unknown as Record<string, any>
  const address = controlled === 'app' ? getApplicationAddress(WALLET_ID).toString() : EXTERNAL
  vi.spyOn(client.state.global, 'controlledAddress').mockResolvedValue(address)

  const calls: Recorded[] = []
  const record = (method: string) => (params: { extraFee?: { microAlgos: bigint } }) => {
    calls.push({ method, extraFee: params.extraFee?.microAlgos })
    return {} as never
  }
  const methods = ['arc58AddAllowances', 'arc58RemoveAllowances', 'arc58AddExecutionKey', 'arc58RemoveExecutionKey', 'arc58NewEscrow', 'arc58RemovePlugin']
  for (const m of methods) vi.spyOn(client.send, m).mockImplementation(record(m) as never)

  // group(): record the composer calls, and let send() resolve them without a network
  const group: Record<string, unknown> = {
    composer: async () => ({ txns: [], send: async () => ({}) }),
  }
  for (const m of methods) group[m] = (p: { extraFee?: { microAlgos: bigint } }) => { record(`group.${m}`)(p); return group }
  vi.spyOn(client, 'newGroup').mockReturnValue(group)
  vi.spyOn(client.algorand, 'getSuggestedParams').mockResolvedValue({ minFee: 1_000n } as never)
  return { sdk, calls }
}

const ALLOWANCE = { type: 'flat', asset: 0n, amount: 1n } as const

async function callAll(sdk: WalletSDK) {
  await sdk.addAllowances({ escrow: 'e', allowances: [ALLOWANCE] })
  await sdk.removeAllowances({ escrow: 'e', assets: [0n] })
  await sdk.addExecutionKey({ lease: LEASE, groups: [LEASE], firstValid: 1n, lastValid: 2n })
  await sdk.removeExecutionKey({ lease: LEASE })
  await sdk.removePlugin({ plugin: 1n, caller: OWNER, escrow: '' })
  await sdk.newEscrow({ escrow: 'minted', address: ALGORAND_ZERO_ADDRESS_STRING })
  await sdk.newEscrow({ escrow: 'adopted', address: OWNER })
  await sdk.group()
    .addAllowances({ escrow: 'e', allowances: [ALLOWANCE] })
    .removeAllowances({ escrow: 'e', assets: [0n] })
    .addExecutionKey({ lease: LEASE, groups: [LEASE], firstValid: 1n, lastValid: 2n })
    .removeExecutionKey({ lease: LEASE })
    .removePlugin({ plugin: 1n, caller: OWNER, escrow: '' })
    .newEscrow({ escrow: 'minted', address: ALGORAND_ZERO_ADDRESS_STRING })
    .newEscrow({ escrow: 'adopted', address: OWNER })
    .send()
}

const METHODS = [
  'arc58AddAllowances', 'arc58RemoveAllowances', 'arc58AddExecutionKey', 'arc58RemoveExecutionKey', 'arc58RemovePlugin',
  'arc58NewEscrow', 'arc58NewEscrow',
]

describe('WalletSDK MBR-moving methods carry the inner payment fee', () => {
  test('external controlled address: one min fee per MBR payment/refund (+ factory path on a minted escrow)', async () => {
    const { sdk, calls } = wallet('external')
    await callAll(sdk)
    const expected = [1_000n, 1_000n, 1_000n, 1_000n, 1_000n, NewEscrowFeeAmount + 1_000n, 1_000n]
    expect(calls).toEqual([
      ...METHODS.map((method, i) => ({ method, extraFee: expected[i] })),
      ...METHODS.map((method, i) => ({ method: `group.${method}`, extraFee: expected[i] })),
    ])
  })

  test('wallet-controlled (controlled address = app address): no MBR payment, no extra fee', async () => {
    const { sdk, calls } = wallet('app')
    await callAll(sdk)
    const expected = [0n, 0n, 0n, 0n, 0n, NewEscrowFeeAmount, 0n]
    expect(calls).toEqual([
      ...METHODS.map((method, i) => ({ method, extraFee: expected[i] })),
      ...METHODS.map((method, i) => ({ method: `group.${method}`, extraFee: expected[i] })),
    ])
  })
})

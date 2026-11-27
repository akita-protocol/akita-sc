import { describe, expect, test, vi } from 'vitest'
import type { UpdateAkitaDaoPluginClient } from '../../generated/UpdateAkitaDAOPluginClient'
import { encodeLease } from '@algorandfoundation/algokit-utils'
import algosdk from 'algosdk'
import { pendingUpgradeBoxBytes, UPGRADE_BINDING_NOTE_PROPOSAL, UpdateAkitaDAOPluginSDK } from './update-akita-dao'

const SENDER = 'B4NOFTMLUTGTTPBY5NHLW3EHQPB5XCW3BHYDQFMX5XDT2A6Q24Z2HK2WRQ'

describe('pendingUpgradeBoxBytes (boxes an UpgradeApp proposal writes after the group is built)', () => {
  const lease = algosdk.ABIType.from('(byte[32],uint64)[]')
  const upgradeApp = algosdk.ABIType.from('(uint64,byte[32],byte[32][],uint64,uint64)')
  // ProposalDetails: status, cid, votes, creator, votingTs, created, feesPaid, actions (type, data)
  const proposal = algosdk.ABIType.from('(uint8,byte[36],(uint64,uint64,uint64),address,uint64,uint64,uint64,(uint8,byte[])[])')
  const proposalBytes = (actions: number, groups: number) => {
    const data = upgradeApp.encode([1n, new Uint8Array(32), Array.from({ length: groups }, () => new Uint8Array(32)), 1n, 2n])
    return proposal.encode([0, new Uint8Array(36), [0n, 0n, 0n], algosdk.ALGORAND_ZERO_ADDRESS_STRING, 0n, 0n, 0n,
      Array.from({ length: actions }, () => [60, data])]).length
  }

  test('lease read: the upgrade lease box of the target', () => {
    expect(pendingUpgradeBoxBytes({ groups: 1 })).toBe(lease.encode([[new Uint8Array(32), 1n]]).length)
    expect(pendingUpgradeBoxBytes({ groups: 2, actions: 2 })).toBe(lease.encode([[new Uint8Array(32), 1n], [new Uint8Array(32), 2n]]).length)
    // the box the rollout rehearsal ran 80 B over its budget for: 42 B here and the wallet's 52 B key box
    expect(pendingUpgradeBoxBytes({ groups: 1 })).toBe(42)
  })

  test('proposal read: also the DAO execution box and the proposal box', () => {
    for (const [actions, groups] of [[1, 1], [1, 2], [2, 3]] as const) {
      expect(pendingUpgradeBoxBytes({ groups, actions, proposalRead: true }))
        .toBe(lease.encode(Array.from({ length: actions }, () => [new Uint8Array(32), 1n])).length + 16 + proposalBytes(actions, groups))
    }
  })
})

describe('DAO update program pairs', () => {
  test.each([false, true])('keeps the upload contiguous when a clear program is supplied: %s', async (includeClear) => {
    const names = ['setClearProgram', 'initBoxedContract', 'loadBoxedContract', 'updateApp'] as const
    const calls: string[] = []
    const params = Object.fromEntries(names.map((name) => [name, vi.fn().mockImplementation(async () => {
      calls.push(name)
      return { appId: 42n }
    })]))
    const sdk = Object.create(UpdateAkitaDAOPluginSDK.prototype) as UpdateAkitaDAOPluginSDK
    sdk.client = {
      appId: 42n,
      appClient: { getABIMethod: (name: string) => ({ getSelector: () => new Uint8Array([names.indexOf(name as typeof names[number])]) }) },
      // no DAO configured: upgradeReferences adds no app/box references
      state: { global: { akitaDao: async () => undefined } },
      params,
    } as unknown as UpdateAkitaDaoPluginClient
    sdk.sendParams = { sender: SENDER, signer: vi.fn() }
    const clearProgram = new Uint8Array([13, 129, 1])
    const hook = sdk.updateApp({
      appId: 99n, version: '2', data: new Uint8Array(2_027),
      ...(includeClear ? { clearProgram } : {}),
    })()
    await hook.getTxns({ wallet: 55n })

    expect(calls).toEqual([
      ...(includeClear ? ['setClearProgram'] : []),
      'initBoxedContract', 'loadBoxedContract', 'loadBoxedContract', 'updateApp',
    ])
    expect(hook.selectors).toHaveLength(includeClear ? 4 : 3)
    if (includeClear) {
      expect(params.setClearProgram.mock.calls[0][0].args).toEqual({ wallet: 55n, rekeyBack: false, clearProgram })
    } else {
      expect(params.setClearProgram).not.toHaveBeenCalled()
    }
    expect(params.loadBoxedContract.mock.calls.map(([call]) => call.args.offset)).toEqual([0, 2_026])
    expect(params.updateApp.mock.calls[0][0].args).toEqual({ wallet: 55n, rekeyBack: true, appId: 99n })
  })
})

describe('DAO binding references (principal-resolution Phase 2a)', () => {
  const sdkWith = (dao: bigint | undefined) => {
    const params = { initBoxedContract: vi.fn(async () => ({})), loadBoxedContract: vi.fn(async () => ({})), updateApp: vi.fn(async () => ({})), updateFactoryChildContract: vi.fn(async () => ({})) }
    const sdk = Object.create(UpdateAkitaDAOPluginSDK.prototype) as UpdateAkitaDAOPluginSDK
    sdk.client = {
      appId: 42n,
      appClient: { getABIMethod: () => ({ getSelector: () => new Uint8Array([1]) }) },
      state: { global: { akitaDao: async () => dao } },
      params,
    } as unknown as UpdateAkitaDaoPluginClient
    sdk.sendParams = { sender: SENDER, signer: vi.fn() }
    return { sdk, params }
  }

  test('default: the target\'s u-box plus one empty read-headroom reference, no note', async () => {
    const { sdk, params } = sdkWith(7n)
    await sdk.updateApp({ appId: 99n, version: '2', data: new Uint8Array(10) })().getTxns({ wallet: 55n })
    const call = params.updateApp.mock.calls[0][0] as { boxReferences: { appId: bigint; name: Uint8Array }[]; note?: Uint8Array; appReferences: bigint[] }
    expect(call.appReferences).toEqual([7n])
    expect(call.boxReferences.map((b) => [b.appId, Buffer.from(b.name).toString('hex')])).toEqual([[7n, '75' + '0000000000000063'], [0n, '']])
    expect(call.note).toBeUndefined()
  })

  test('daoBinding adds the note and the DAO\'s execution and proposal boxes', async () => {
    const { sdk, params } = sdkWith(7n)
    const lease = new Uint8Array(32).fill(9)
    await sdk.updateFactoryChildContract({ factoryAppId: 99n, version: '2', data: new Uint8Array(10), daoBinding: { lease, proposalId: 300n } })().getTxns({ wallet: 55n })
    const call = params.updateFactoryChildContract.mock.calls[0][0] as { boxReferences: { appId: bigint; name: Uint8Array }[]; note?: Uint8Array }
    expect(Buffer.from(call.note!).toString()).toBe(UPGRADE_BINDING_NOTE_PROPOSAL)
    expect(call.boxReferences.map((b) => [b.appId, Buffer.from(b.name).toString('hex')])).toEqual([
      [7n, '75' + '0000000000000063'],
      [7n, '78' + '09'.repeat(32)],
      [7n, '6c' + '000000000000012c'],
      [0n, ''],
    ])
    // A string lease is encoded exactly as usePlugin encodes it.
    const { sdk: other, params: otherParams } = sdkWith(7n)
    await other.updateApp({ appId: 99n, version: '2', data: new Uint8Array(10), daoBinding: { lease: 'p2_dao_0_1', proposalId: 1n } })().getTxns({ wallet: 55n })
    const name = (otherParams.updateApp.mock.calls[0][0] as { boxReferences: { name: Uint8Array }[] }).boxReferences[1].name
    expect(Buffer.from(name.slice(1))).toEqual(Buffer.from(encodeLease('p2_dao_0_1')!))
  })

  test('daoBinding without a DAO is refused', async () => {
    const { sdk } = sdkWith(undefined)
    await expect(sdk.updateApp({ appId: 99n, version: '2', data: new Uint8Array(10), daoBinding: { lease: 'x', proposalId: 1n } })().getTxns({ wallet: 55n })).rejects.toThrow('akita_dao')
  })
})

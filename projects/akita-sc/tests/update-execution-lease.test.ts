/**
 * `runUpdate --proposal-id` (scripts/script-base.ts) resumes an UpgradeApp proposal. The rebuilt
 * groups must hash to the recorded group ids, and the wallet's execution box reference ('x' + lease)
 * is part of each hashed group. So the rebuild must use the lease the action recorded, not a fresh
 * `${leasePrefix}_${timestamp}` (2026-10-04 review; same fix as principal-rollout-run's resume).
 */
import { encodeLease } from '@algorandfoundation/algokit-utils'
import { ProposalActionEnum } from 'akita-sdk/dao'
import { describe, expect, test } from 'vitest'
import { recordedLease } from '../scripts/lib/execution-lease'
import { loadCompiled } from '../scripts/lib/principal-rollout'
import { approvalBytes } from './compat/lib/snapshot'
import { runUpdate, updateExecutionLease, type ScriptContext } from '../scripts/script-base'

const RECORDED = 'acct_upg_421337'
const RECORDED_KEY = encodeLease(RECORDED)!

describe('recordedLease', () => {
  test('recovers the string usePlugin padded into the 32-byte execution key', () => {
    expect(recordedLease(RECORDED_KEY)).toBe(RECORDED)
    expect(recordedLease(encodeLease('wallet_child_0_7')!)).toBe('wallet_child_0_7')
  })

  test('refuses a key that is not a zero-padded lease string', () => {
    const hashed = new Uint8Array(32).fill(0xab) // a 32-byte lease that encodeLease would hash, not pad
    hashed[31] = 0
    hashed[30] = 0xff // invalid UTF-8 does not round-trip
    expect(() => recordedLease(hashed)).toThrow(/not a padded lease string/)
    expect(() => recordedLease(new Uint8Array(31))).toThrow(/not a padded lease string/)
  })
})

describe('updateExecutionLease', () => {
  test('a new proposal gets a fresh prefix_timestamp lease', () => {
    expect(updateExecutionLease('acct_upg', undefined, 1_759_999_123_456)).toBe('acct_upg_123456')
  })

  test('a resumed proposal reuses the recorded lease, whatever the clock says', () => {
    const lease = updateExecutionLease('acct_upg', { executionKey: RECORDED_KEY }, 1_759_999_000_001)
    expect(lease).toBe(RECORDED)
    expect(encodeLease(lease)).toEqual(RECORDED_KEY)
  })
})

describe('runUpdate --proposal-id', () => {
  /** Minimal context: enough of runUpdate to reach the execution build, which records its lease and stops. */
  function context(proposalId: bigint | undefined, daoProgram: Uint8Array = approvalBytes('AkitaDAO')) {
    const built: string[] = []
    const bindings: unknown[] = []
    const account = { balance: { microAlgos: 100_000_000n }, minBalance: { microAlgos: 0n } }
    const upgradeAction = {
      type: ProposalActionEnum.UpgradeApp, app: 77n, executionKey: RECORDED_KEY, groups: [new Uint8Array(32)], firstValid: 10n, lastValid: 1_009n,
    }
    const ctx = {
      sender: 'SENDER',
      signer: async () => [],
      options: { proposalId, version: '9.9.9', dryRun: false },
      appIds: { updatePlugin: 88n },
      algorand: {
        account: { getInformation: async () => account, ensureFunded: async () => undefined },
        client: { algod: { getApplicationByID: (id: bigint) => ({ do: async () => ({ params: { approvalProgram: id === 3n ? daoProgram : new Uint8Array(100) } }) }) } },
      },
      updatePlugin: { appId: 88n, client: { appAddress: 'UPDATE' }, updateApp: ({ daoBinding }: { daoBinding?: unknown }) => { bindings.push(daoBinding); return { kind: 'updateApp' } } },
      dao: {
        appId: 3n,
        getWallet: async () => undefined,
        decodeProposalAction: () => upgradeAction,
        client: { state: { global: { pluginAppList: async () => ({ update: 88n }), proposalId: async () => 171n }, box: { proposals: { value: async (id: bigint) => (id === 5n ? { status: 40, actions: [[1, new Uint8Array()]] } : undefined) } } } },
        wallet: {
          client: { appAddress: 'WALLET', state: { global: { admin: async () => 'ADMIN' } } },
          getMbr: async () => ({ executions: 0n }),
          getPlugins: async () => undefined,
          plugins: { get: () => ({ methods: [] }) },
          build: {
            usePlugin: async ({ lease }: { lease: string }) => {
              built.push(lease)
              throw new Error('stop after build')
            },
          },
        },
      },
    } as unknown as ScriptContext
    const target = {
      name: 'Target', leasePrefix: 'acct_upg', appIdKey: '', appId: 77n, syncSelectors: false,
      createFactory: () => ({ appFactory: { compile: async () => ({ approvalProgram: new Uint8Array(100) }) } }),
    }
    return { ctx, target, built, bindings }
  }

  test('the resumed rebuild uses the lease recorded in the proposal', async () => {
    const { ctx, target, built } = context(5n)
    await expect(runUpdate(ctx, [target])).rejects.toThrow('stop after build')
    expect(built).toEqual([RECORDED])
  })

  test('a fresh update still builds with a new prefix_timestamp lease', async () => {
    const { ctx, target, built } = context(undefined)
    await expect(runUpdate(ctx, [target])).rejects.toThrow('stop after build')
    expect(built).toHaveLength(1)
    expect(built[0]).toMatch(/^acct_upg_\d{1,6}$/)
  })

  // Between Phase 2a and the DAO upgrade, the Phase 2a plugin reads the deployed DAO through the proposal
  // (K1); without the binding every generic update (Staking, PrizeBox, Impact, children) reverts.
  test('on the deployed DAO a fresh update binds its groups to the proposal id the DAO will assign', async () => {
    const { ctx, target, built, bindings } = context(undefined)
    await expect(runUpdate(ctx, [target])).rejects.toThrow('stop after build')
    expect(bindings).toEqual([{ lease: built[0], proposalId: 171n }])
  })

  test('on the tree DAO (isUpgradeLease) a fresh update carries no proposal binding', async () => {
    const { ctx, target, bindings } = context(undefined, loadCompiled('arc58/dao/AkitaDAO.arc56.json').approval)
    await expect(runUpdate(ctx, [target])).rejects.toThrow('stop after build')
    expect(bindings).toEqual([undefined])
  })

  test('a resume on the deployed DAO rebuilds with the resumed proposal binding first', async () => {
    const { ctx, target, bindings } = context(5n)
    await expect(runUpdate(ctx, [target])).rejects.toThrow('stop after build')
    expect(bindings[0]).toEqual({ lease: RECORDED, proposalId: 5n })
  })

  test('a resume on the tree DAO rebuilds unbound first (the lease read)', async () => {
    const { ctx, target, bindings } = context(5n, loadCompiled('arc58/dao/AkitaDAO.arc56.json').approval)
    await expect(runUpdate(ctx, [target])).rejects.toThrow('stop after build')
    expect(bindings).toEqual([undefined])
  })
})

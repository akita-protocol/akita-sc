/**
 * The TestNet parity plan (runbook A4), against both DAO wallets as read on 2026-11-17: what the plan
 * holds, how a MainNet plugin app is matched to its TestNet app, and what the plan refuses.
 */
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import { describe, expect, test } from 'vitest'
import { batchActions, describePlan, isEmptyPlan, parseSetup, planParity, serializeSetup, type Setup, type SetupGrant } from '../scripts/lib/dao-wallet-parity'

const load = (network: string): Setup => parseSetup(readFileSync(path.join(__dirname, 'fixtures/dao-wallet-parity', `${network}-2026-11-17.json`), 'utf8'))
const CREATOR = 'R2MOGXW7CILK33VEET2F2DN5ENGNWGSKXG3I4U5KGP7I26TZTHDVOP6BLE'
const OPERATOR = 'YIIMG4OHC4SBM2HGVU3PHZSUL7YCFTGVR4U2ADA5RZZGDLIBAM5IEK5RUY'
const STICKERS_CALLER = 'E3H5NBMSKM2IKBSE5YCVQKMMLPVP3HKLMK3RJ7Z3VLW6FLM6O7B3ND22CQ'
const row = (g: { plugin: bigint; caller: string; source: SetupGrant }) => `${g.source.key} ${g.plugin} ${g.caller.slice(0, 6)} "${g.source.escrow}"`

describe('DAO wallet parity plan, TestNet to MainNet as read 2026-11-17', () => {
  const mainnet = load('mainnet')
  const testnet = load('testnet')

  test('a setup survives being written to a file', () => {
    expect(parseSetup(serializeSetup(mainnet))).toEqual(mainnet)
    expect(typeof mainnet.grants[0].plugin).toBe('bigint')
    expect(typeof mainnet.grants[0].policy.lastValid).toBe('bigint')
  })

  test('the plan: two account escrows, one unlock, nine grants added, two removed', () => {
    const plan = planParity(mainnet, testnet)
    expect(plan.escrows).toEqual([
      { name: 'akta_creator', action: 'new-account' },
      { name: 'collections', action: 'new-account' },
      { name: 'stickers', action: 'unlock' },
    ])
    expect(plan.add.map(row).sort()).toEqual([
      `asaManagerPlugin 764705920 ${CREATOR.slice(0, 6)} ""`,
      `asaManagerPlugin 764705920 ${OPERATOR.slice(0, 6)} ""`,
      `nfdPlugin 763128895 ${OPERATOR.slice(0, 6)} ""`,
      `nfdPlugin 763128895 ${OPERATOR.slice(0, 6)} "akta_creator"`,
      `nfdPlugin 763128895 ${OPERATOR.slice(0, 6)} "collections"`,
      `rewardsPlugin 763128923 ${STICKERS_CALLER.slice(0, 6)} "stickers"`,
      `selfOptinPlugin 763128796 ${OPERATOR.slice(0, 6)} ""`,
      `selfOptinPlugin 763128796 ${CREATOR.slice(0, 6)} "stickers"`,
      `socialPlugin 763128930 ${OPERATOR.slice(0, 6)} ""`,
    ].sort())
    expect(plan.replace).toEqual([])
    expect(plan.remove.map((g) => `${g.key}@${g.revision} ${g.plugin} ${g.caller.slice(0, 6)} "${g.escrow}"`)).toEqual([
      `asaManagerPlugin@2 763128820 ${CREATOR.slice(0, 6)} ""`,
      `rewardsPlugin@2 763128923 ${CREATOR.slice(0, 6)} "stickers"`,
    ])
    expect(plan.notes).toEqual([])
    // 3 escrow actions, 9 grants, 2 removals at five actions a proposal.
    expect(batchActions([...plan.escrows, ...plan.add, ...plan.remove].map((x) => ({ actions: [x] })), 5).map((b) => b.length)).toEqual([5, 5, 4])
  })

  test('proposals keep their order, and an action that needs an earlier one waits for the next proposal', () => {
    const unit = (name: string, extra: { id?: string; after?: string } = {}) => ({ actions: [name], ...extra })
    expect(batchActions([unit('a'), unit('b'), unit('c')], 2)).toEqual([['a', 'b'], ['c']])
    // The lock of a new escrow cannot share a proposal with the escrow's creation: the validator reads the wallet as it is.
    expect(batchActions([unit('new', { id: 'e' }), unit('lock', { after: 'e' }), unit('x')], 5)).toEqual([['new'], ['lock', 'x']])
    expect(batchActions([unit('new', { id: 'e' }), unit('a'), unit('b'), unit('lock', { after: 'e' })], 2)).toEqual([['new', 'a'], ['b', 'lock']])
    expect(() => batchActions([{ actions: ['a', 'b', 'c'] }], 2)).toThrow('one change here needs 3')
  })

  test('a plugin app is matched by its program, and by "latest" only where no TestNet app runs it', () => {
    const plan = planParity(mainnet, testnet)
    const how = Object.fromEntries(plan.add.map((g) => [`${g.source.key}@${g.source.revision}`, g.mapped]))
    expect(how).toEqual({
      'asaManagerPlugin@3': 'same program', 'rewardsPlugin@2': 'same program', 'selfOptinPlugin@1': 'same program', 'socialPlugin@2': 'same program',
      // MainNet's NFD plugin was redeployed (3 deployments); TestNet's latest is the older program.
      'nfdPlugin@3': 'latest, another program',
    })
    // The grants both networks already share map onto themselves: nothing to replace, nothing to remove but the two.
    expect(plan.add.length + (testnet.grants.length - plan.remove.length)).toBe(mainnet.grants.length)
  })

  test('once TestNet holds the plan, a second plan is empty', () => {
    const plan = planParity(mainnet, testnet)
    const after: Setup = {
      ...testnet,
      escrows: mainnet.escrows.map((e) => ({ ...e, address: testnet.escrows.find((t) => t.name === e.name)?.address ?? ALGORAND_ZERO_ADDRESS_STRING })),
      grants: [
        ...testnet.grants.filter((g) => !plan.remove.includes(g)),
        ...plan.add.map((g) => ({ ...g.source, plugin: g.plugin, caller: g.caller })),
      ],
    }
    const second = planParity(mainnet, after)
    expect(isEmptyPlan(second)).toBe(true)
    expect(describePlan(second).join('\n')).toContain('Nothing to change')
  })

  test('a grant anyone may use with no method list and no execution key is carried, with a note', () => {
    // Today neither wallet holds one: every open grant names methods or needs a key (plan.notes is empty above).
    const open = mainnet.grants.find((g) => g.caller === ALGORAND_ZERO_ADDRESS_STRING)
    expect(open).toBeDefined()
    const wide: SetupGrant = {
      ...open!,
      escrow: 'stickers',
      policy: { ...open!.policy, methods: [], useExecutionKey: false },
    }
    const plan = planParity({ ...mainnet, grants: [...mainnet.grants, wide] }, testnet)
    const notes = plan.notes.filter((n) => n.includes('may be used by anyone, names no method'))
    expect(notes).toHaveLength(1)
    expect(notes[0]).toContain('restrict it on testnet')
    // it is still planned, as it is
    expect(plan.add.some((g) => g.source === wide)).toBe(true)
  })

  test('--keep-extra leaves TestNet\'s own grants and says so', () => {
    const plan = planParity(mainnet, testnet, { keepExtra: true })
    expect(plan.remove).toEqual([])
    expect(plan.add).toHaveLength(9)
    expect(plan.notes.filter((n) => n.startsWith('Kept, only on testnet'))).toHaveLength(2)
  })

  test('a caller can be another account on TestNet, and then TestNet\'s own stickers grant is the match', () => {
    const plan = planParity(mainnet, testnet, { callers: new Map([[STICKERS_CALLER, CREATOR]]) })
    expect(plan.add.map(row).filter((r) => r.startsWith('rewardsPlugin'))).toEqual([])
    expect(plan.remove.map((g) => g.key)).toEqual(['asaManagerPlugin'])
  })

  test('a named app wins over the match by program', () => {
    const plan = planParity(mainnet, testnet, { plugins: new Map([[3605315701n, 763128820n]]) })
    // TestNet's older AsaManager grant for the creator is then the match, so only the operator's is added.
    expect(plan.add.map(row).filter((r) => r.startsWith('asaManagerPlugin'))).toEqual([`asaManagerPlugin 763128820 ${OPERATOR.slice(0, 6)} ""`])
    expect(plan.remove.map((g) => g.key)).toEqual(['rewardsPlugin'])
  })

  test('refusals: an older deployment with no twin, an unlisted app, an admin grant, a round expiry, an escrow of another kind', () => {
    const without = (key: string): Setup => ({ ...testnet, deployments: { ...testnet.deployments, [key]: testnet.deployments[key as 'selfOptinPlugin']!.map((d) => ({ ...d, program: 'other' })) } })
    expect(() => planParity(mainnet, without('selfOptinPlugin'))).toThrow('an older deployment, and no testnet selfOptinPlugin runs its program')

    const edit = (change: (g: SetupGrant) => SetupGrant): Setup => ({ ...mainnet, grants: mainnet.grants.map((g) => (g.key === 'nfdPlugin' && g.escrow === 'collections' ? change(g) : g)) })
    expect(() => planParity(edit((g) => ({ ...g, key: undefined, plugin: 1n })), testnet)).toThrow('which the SDK registry does not list')
    expect(() => planParity(edit((g) => ({ ...g, policy: { ...g.policy, admin: true } })), testnet)).toThrow('a DAO proposal cannot create one')
    expect(() => planParity(edit((g) => ({ ...g, policy: { ...g.policy, useRounds: true, lastValid: 60_000_000n } })), testnet)).toThrow('expires at round 60000000')

    const asApp: Setup = { ...testnet, escrows: [...testnet.escrows, { name: 'collections', account: false, address: ALGORAND_ZERO_ADDRESS_STRING, locked: false }] }
    expect(() => planParity(mainnet, asApp)).toThrow('no proposal action converts one')
  })

  test('the grant of the Update plugin that holds pal.update is never removed or replaced', () => {
    const noUpdate: Setup = { ...mainnet, grants: mainnet.grants.filter((g) => g.key !== 'updatePlugin') }
    expect(() => planParity(noUpdate, testnet)).toThrow('has no mainnet counterpart')
    const changed: Setup = { ...mainnet, grants: mainnet.grants.map((g) => (g.key === 'updatePlugin' ? { ...g, policy: { ...g.policy, cooldown: 5n } } : g)) }
    expect(() => planParity(changed, testnet)).toThrow("the rollout's Phase 2a replaces that grant")
  })

  test('a policy that differs on a grant both hold is replaced, and an execution-key threshold is compared too', () => {
    const pay = (s: Setup) => s.grants.find((g) => g.key === 'payPlugin')!
    const changed: Setup = { ...mainnet, grants: mainnet.grants.map((g) => (g === pay(mainnet) ? { ...g, settings: { ...g.settings!, approval: 65_000n } } : g)) }
    const plan = planParity(changed, testnet)
    expect(plan.replace.map((r) => [r.target.plugin, r.differences])).toEqual([[pay(testnet).plugin, ['proposal approval 60000 -> 65000']]])
  })

  test('an allowance or a named plugin on either wallet is reported, not carried', () => {
    const plan = planParity({ ...mainnet, allowances: 2, named: ['ops'] }, testnet)
    expect(plan.notes).toEqual([
      "mainnet's DAO wallet holds 2 allowance(s). Asset ids differ per network, so allowances are not carried; compare them by hand.",
      "mainnet's DAO wallet holds the named plugin(s) ops. Named plugins are not carried.",
    ])
  })
})

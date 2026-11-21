/**
 * The rollout steps that had no script until 2026-11-16, on LocalNet against the tree DAO:
 * the proposal threshold rescale and its copy in the grant swaps (I1), the launch readiness check (I1),
 * pointing a fee generator at a DAO escrow (H1, G14) and registering a receive escrow with the
 * RevenueManager (G3a).
 */
import { getNetworkAppIds } from 'akita-sdk'
import { ProposalActionEnum } from 'akita-sdk/dao'
import { CallerType } from 'akita-sdk/wallet'
import algosdk, { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import { microAlgo } from '@algorandfoundation/algokit-utils'
import { beforeAll, describe, expect, test } from 'vitest'
import { bootstrapDaoTestContext, type DaoTestContext } from '../smart_contracts/arc58/dao/tests/utils'
import { deployStakingPlugin } from './fixtures/plugins/staking'
import { type ScriptContext } from '../scripts/script-base'
import { proposeAndExecute } from '../scripts/utils'
import { createMigrationPlan, runMigration } from '../scripts/lib/dao-wallet-plugin-migration'
import { pointAppAtDaoEscrow, readAppDaoEscrow, registerRevenueEscrow } from '../scripts/lib/dao-escrow-steps'
import { planLaunch } from '../scripts/lib/dao-launch'
import { isLegacyPower, isUnclearPower, toBaseUnitPower } from '../scripts/lib/power-units'
import { planPowerRescale, powerProblems, runPowerRescale } from '../scripts/lib/proposal-power'
import type { RolloutRow } from '../scripts/lib/rollout-steps'

describe('rollout steps: thresholds, launch check and DAO escrows', () => {
  let boot: DaoTestContext
  let ctx: ScriptContext
  const log = () => {}
  const stranger = () => algosdk.generateAccount().addr.toString()
  const newEscrow = async (escrow: string) => {
    const wallet = await ctx.dao.getWallet()
    const mbr = await wallet.getMbr({ escrow, methodCount: 0n, plugin: '', groups: 0n })
    await wallet.client.appClient.fundAppAccount({ amount: microAlgo(mbr.newEscrowMintCost + 1_000_000n) })
    await proposeAndExecute(ctx.algorand, ctx.dao, [{ type: ProposalActionEnum.NewEscrow, escrow, address: ALGORAND_ZERO_ADDRESS_STRING }])
    return (await wallet.getEscrow(escrow)).id
  }
  const settingsBox = (plugin: bigint) => ctx.dao.client.state.box.plugins.value({ plugin, escrow: '' }).catch(() => undefined)

  beforeAll(async () => {
    boot = await bootstrapDaoTestContext({ useFullSetup: true, fundAmount: 800 })
    ctx = { options: { network: 'localnet', version: 'rollout-steps' }, algorand: boot.fixture.algorand,
      sender: boot.sender, signer: boot.signer, dao: boot.dao, updatePlugin: boot.daoUpdatePluginSdk!,
      appIds: { ...getNetworkAppIds('localnet'), dao: boot.dao.appId, updatePlugin: boot.daoUpdatePluginSdk!.appId } }
    ctx.algorand.setSigner(ctx.sender, ctx.signer)
  })

  describe('proposal thresholds', () => {
    test('a whole-token power is told from a base-unit one by the old cap of 1,000', () => {
      expect([1n, 600n, 1_000n].every(isLegacyPower)).toBe(true)
      expect([0n, 1_001n, 600_000_000n].some(isLegacyPower)).toBe(false)
      expect(toBaseUnitPower(600n)).toBe(600_000_000n)
      expect(toBaseUnitPower(600_000_000n)).toBe(600_000_000n)
      expect(isUnclearPower(5_000n)).toBe(true)
      expect(isUnclearPower(1_000_000n)).toBe(false)
    })

    test('the tree DAO starts in base units: nothing to rescale', async () => {
      const plan = await planPowerRescale(ctx)
      expect(plan.baseUnits).toBe(true)
      expect(plan.fields).toEqual([])
      expect(powerProblems(plan)).toEqual([])
    })

    test('globals left in whole tokens are rewritten, every other setting kept, and a rerun does nothing', async () => {
      const g = ctx.dao.client.state.global
      const before = { add: (await g.addPluginProposalSettings())!, fields: (await g.updateFieldsProposalSettings())!, upgrade: (await g.upgradeAppProposalSettings())! }
      await proposeAndExecute(ctx.algorand, ctx.dao, [
        { type: ProposalActionEnum.UpdateFields, field: 'add_plugin_ps', value: { ...before.add, power: 300n } },
        { type: ProposalActionEnum.UpdateFields, field: 'update_fields_ps', value: { ...before.fields, power: 200n } },
      ])

      const plan = await planPowerRescale(ctx)
      expect(plan.fields.map((f) => [f.field, f.current.power, f.target])).toEqual([
        ['add_plugin_ps', 300n, 300_000_000n], ['update_fields_ps', 200n, 200_000_000n],
      ])
      expect(powerProblems(plan)).toHaveLength(2)
      // Only the DAO creator can send the proposals.
      await expect(runPowerRescale({ ...ctx, sender: stranger() }, plan, log)).rejects.toThrow('Only the DAO creator')

      const ids = await runPowerRescale(ctx, plan, log)
      expect(ids).toHaveLength(1)
      expect(await g.addPluginProposalSettings()).toEqual({ ...before.add, power: 300_000_000n })
      expect(await g.updateFieldsProposalSettings()).toEqual({ ...before.fields, power: 200_000_000n })
      expect(await g.upgradeAppProposalSettings()).toEqual(before.upgrade)
      const after = await planPowerRescale(ctx)
      expect(after.fields).toEqual([])
      expect(await runPowerRescale(ctx, after, log)).toEqual([])
    })

    test('a value neither unit explains is reported and never guessed', async () => {
      const g = ctx.dao.client.state.global
      const current = (await g.newEscrowProposalSettings())!
      await proposeAndExecute(ctx.algorand, ctx.dao, [{ type: ProposalActionEnum.UpdateFields, field: 'new_escrow_ps', value: { ...current, power: 5_000n } }])
      const plan = await planPowerRescale(ctx)
      expect(plan.fields).toEqual([])
      expect(plan.unclear).toEqual(['new_escrow_ps power 5000'])
      await expect(runPowerRescale(ctx, plan, log)).rejects.toThrow('Refusing to guess a unit')
      await proposeAndExecute(ctx.algorand, ctx.dao, [{ type: ProposalActionEnum.UpdateFields, field: 'new_escrow_ps', value: current }])
      expect((await planPowerRescale(ctx)).unclear).toEqual([])
    })

    test('a grant swap rescales the threshold it copies from a grant made in whole tokens', async () => {
      const deploy = (version: string) => deployStakingPlugin({ fixture: boot.fixture, sender: boot.sender, signer: boot.signer, args: { akitaDao: boot.dao.appId, version } })
      const [old, next] = [await deploy('power-old'), await deploy('power-new')]
      const upgrade = (await ctx.dao.client.state.global.upgradeAppProposalSettings())!
      const wallet = await ctx.dao.getWallet()
      await wallet.client.appClient.fundAppAccount({ amount: microAlgo(3_000_000n) })
      await proposeAndExecute(ctx.algorand, ctx.dao, [{
        type: ProposalActionEnum.AddPlugin, client: old, callerType: CallerType.Global, escrow: '', useRounds: true, coverFees: false,
        sourceLink: 'test', methods: [{ name: old.setHeartbeatManager(), cooldown: 0n }], useExecutionKey: true, ...upgrade, power: 600n,
      }])
      expect((await settingsBox(old.appId))!.power).toBe(600n)
      // The stale grant is reported until it is rotated.
      expect(powerProblems(await planPowerRescale(ctx))).toEqual([`plugin ${old.appId} escrow "" settings power 600 is in whole tokens`])

      const options = { effectiveSender: ctx.sender, replacements: [{ key: 'stakingPlugin', from: old.appId, to: next.appId }] }
      const { migrations } = await createMigrationPlan(ctx, options)
      expect(migrations).toHaveLength(1)
      expect(migrations[0].executionSettings).toEqual({ ...upgrade, power: 600_000_000n })
      const result = await runMigration(ctx, { ...options, confirm: true, log })
      expect(result.executed).toBe(true)
      expect(await settingsBox(old.appId)).toBeUndefined()
      expect(await settingsBox(next.appId)).toEqual({ ...upgrade, power: 600_000_000n })
      expect(powerProblems(await planPowerRescale(ctx))).toEqual([])
    })
  })

  describe('launch readiness', () => {
    const row = (id: string, done: boolean): RolloutRow => ({ id, stage: 'X', title: id, requires: [], run: '', status: done ? 'done' : 'ready', missing: [], detail: `${id} detail` })
    const status = (pending: string[]) => ({ daoState: 0n, rows: ['phase2a', 'dao', 'validator', 'dao-wallet', 'power', 'sdk-flags', 'social-claim', 'initialize'].map((id) => row(id, !pending.includes(id) && id !== 'initialize')) })

    test('tracked bootstrap keys block the launch until they are cleared', async () => {
      const tracked = await ctx.dao.getBootstrapKeys()
      expect(tracked.length).toBeGreaterThan(0)
      expect((await planLaunch(ctx, { status: status([]) })).problems).toEqual([
        `${tracked.length} bootstrap execution key(s) are still tracked; run scripts/revoke-dao-bootstrap-grants.ts --confirm-revoke`,
      ])
      // As scripts/revoke-dao-bootstrap-grants.ts does it: every tracked key in one call.
      await ctx.dao.clearBootstrapKeys({ leases: tracked })
      expect(await ctx.dao.getBootstrapKeys()).toEqual([])
    })

    test('every step done and no bootstrap key: ready, for the creator only', async () => {
      expect(await planLaunch(ctx, { status: status([]), sender: ctx.sender })).toMatchObject({ initialized: false, allowed: [], problems: [] })
      const other = await planLaunch(ctx, { status: status([]), sender: stranger() })
      expect(other.problems).toHaveLength(1)
      expect(other.problems[0]).toContain('Only the DAO creator')
    })

    test('an unfinished step blocks unless it is named, and the steps the DAO needs to govern itself cannot be named', async () => {
      const blocked = await planLaunch(ctx, { status: status(['sdk-flags', 'social-claim']) })
      expect(blocked.problems).toEqual(['sdk-flags is not done: sdk-flags detail', 'social-claim is not done: social-claim detail'])
      const allowed = await planLaunch(ctx, { status: status(['sdk-flags', 'social-claim']), allowPending: ['sdk-flags', 'social-claim'] })
      expect(allowed).toMatchObject({ allowed: ['sdk-flags', 'social-claim'], problems: [] })
      const required = await planLaunch(ctx, { status: status(['power']), allowPending: ['power', 'nonsense', 'initialize'] })
      expect(required.allowed).toEqual([])
      expect(required.problems).toEqual([
        '--allow-pending nonsense is not a rollout:status step', '--allow-pending cannot name initialize itself',
        'power is not done: power detail (this step cannot be left pending)',
      ])
    })

    test('read from the chain, a network where the rollout has not run is not ready', async () => {
      const plan = await planLaunch(ctx, { sender: ctx.sender })
      expect(plan.initialized).toBe(false)
      expect(plan.problems.some((p) => p.startsWith('dao-wallet is not done'))).toBe(true)
      expect(plan.problems.some((p) => p.startsWith('social-claim is not done'))).toBe(true)
    })
  })

  describe('DAO escrows', () => {
    test('a fee generator is pointed at a DAO escrow through the Update plugin, once', async () => {
      const appId = boot.subscriptions!.appId
      const id = await newEscrow('rev_step_test')
      expect((await readAppDaoEscrow(ctx, appId))?.name).not.toBe('rev_step_test')
      await expect(pointAppAtDaoEscrow(ctx, { appId, escrow: 'no_such_escrow', log })).rejects.toThrow('has no escrow "no_such_escrow"')
      await expect(pointAppAtDaoEscrow(ctx, { appId, escrow: 'rev_step_test', sender: stranger(), log })).rejects.toThrow('Only the DAO creator')
      expect(await pointAppAtDaoEscrow(ctx, { appId, escrow: 'rev_step_test', plan: true, log })).toEqual({ appId, escrow: 'rev_step_test', escrowApp: id, changed: true })
      expect((await readAppDaoEscrow(ctx, appId))?.name).not.toBe('rev_step_test')

      const keysBefore = (await ctx.dao.getBootstrapKeys()).length
      const result = await pointAppAtDaoEscrow(ctx, { appId, escrow: 'rev_step_test', log })
      expect(result).toMatchObject({ changed: true, escrowApp: id })
      expect(await readAppDaoEscrow(ctx, appId)).toEqual({ name: 'rev_step_test', app: id })
      expect((await ctx.dao.getBootstrapKeys()).length).toBe(keysBefore)
      expect(await pointAppAtDaoEscrow(ctx, { appId, escrow: 'rev_step_test', log })).toMatchObject({ changed: false })
    })

    test('an escrow is registered with the RevenueManager and gets the four-method grant, once', async () => {
      const escrow = 'rev_step_extra'
      await newEscrow(escrow)
      const source = stranger()
      await expect(registerRevenueEscrow(ctx, { escrow, source: ALGORAND_ZERO_ADDRESS_STRING, log })).rejects.toThrow('non-zero')
      const planned = await registerRevenueEscrow(ctx, { escrow, source, plan: true, log })
      expect(planned).toMatchObject({ registered: true, granted: true })
      expect(planned.proposalId).toBeUndefined()

      const keysBefore = (await ctx.dao.getBootstrapKeys()).length
      const result = await registerRevenueEscrow(ctx, { escrow, source, log })
      expect(result).toMatchObject({ registered: true, granted: true })
      expect(result.proposalId).toBeGreaterThan(0n)
      expect((await ctx.dao.getBootstrapKeys()).length).toBe(keysBefore)
      const wallet = await ctx.dao.getWallet()
      const grant = [...await wallet.client.state.box.plugins.getMap()].find(([key]) => key.plugin === result.revenueManager && key.escrow === escrow)
      expect(grant![0].caller).toBe(ALGORAND_ZERO_ADDRESS_STRING)
      expect(grant![1].methods).toHaveLength(4)

      expect(await registerRevenueEscrow(ctx, { escrow, source, log })).toMatchObject({ registered: false, granted: false })
      await expect(registerRevenueEscrow(ctx, { escrow, source: stranger(), log })).rejects.toThrow('the source cannot be changed here')
    })

  })
})

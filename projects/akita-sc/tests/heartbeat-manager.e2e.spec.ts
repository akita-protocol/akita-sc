/**
 * `scripts/set-heartbeat-manager.ts` (scripts/lib/heartbeat-manager.ts) on LocalNet: the DAO wallet
 * sets Staking's heartbeat manager through a narrow StakingPlugin execution-key grant (rollout D1, gap HB).
 */
import { getNetworkAppIds } from 'akita-sdk'
import { ProposalActionEnum } from 'akita-sdk/dao'
import { CallerType, type StakingPluginSDK } from 'akita-sdk/wallet'
import algosdk, { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import { beforeAll, describe, expect, test } from 'vitest'
import { bootstrapDaoTestContext, type DaoTestContext } from '../smart_contracts/arc58/dao/tests/utils'
import { deployStakingPlugin } from './fixtures/plugins/staking'
import { type ScriptContext } from '../scripts/script-base'
import { proposeAndExecute } from '../scripts/utils'
import { readLiveApp } from '../scripts/lib/principal-rollout-run'
import {
  assertRoutesSetHeartbeatManager,
  planHeartbeatManager,
  readHeartbeatManager,
  runHeartbeatManager,
} from '../scripts/lib/heartbeat-manager'

describe('set-heartbeat-manager through the DAO wallet', () => {
  let boot: DaoTestContext
  let ctx: ScriptContext
  let plugin: StakingPluginSDK
  let stakingAppId: bigint
  const log = () => {}
  const newManager = () => algosdk.generateAccount().addr.toString()

  const grant = async () => {
    const grants = await (await ctx.dao.getWallet()).client.state.box.plugins.getMap()
    return [...grants].find(([key]) => key.plugin === plugin.appId && key.caller === ALGORAND_ZERO_ADDRESS_STRING && key.escrow === '')?.[1]
  }
  const daoSettings = () => ctx.dao.client.state.box.plugins.value({ plugin: plugin.appId, escrow: '' }).catch(() => undefined)
  const bootstrapKeyCount = async () => (await ctx.dao.client.state.global.bootstrapKeyCount()) ?? 0n

  beforeAll(async () => {
    boot = await bootstrapDaoTestContext({ useFullSetup: true, fundAmount: 500 })
    stakingAppId = (await boot.dao.client.state.global.akitaAppList())!.staking
    plugin = await deployStakingPlugin({ fixture: boot.fixture, sender: boot.sender, signer: boot.signer,
      args: { akitaDao: boot.dao.appId, version: 'hb-test' } })
    ctx = { options: { network: 'localnet', version: 'hb-test' }, algorand: boot.fixture.algorand,
      sender: boot.sender, signer: boot.signer, dao: boot.dao, updatePlugin: boot.daoUpdatePluginSdk!,
      appIds: { ...getNetworkAppIds('localnet'), dao: boot.dao.appId, updatePlugin: boot.daoUpdatePluginSdk!.appId,
        staking: stakingAppId, stakingPlugin: plugin.appId } }
    ctx.algorand.setSigner(ctx.sender, ctx.signer)
    expect(await grant()).toBeUndefined()
  })

  test('the route check accepts the tree Staking and rejects a program without the route', async () => {
    assertRoutesSetHeartbeatManager((await readLiveApp(ctx, stakingAppId)).approval, stakingAppId)
    // The StakingPlugin wrapper's own selector is setHeartbeatManager(uint64,bool,address)void: not Staking's.
    const pluginProgram = (await readLiveApp(ctx, plugin.appId)).approval
    expect(() => assertRoutesSetHeartbeatManager(pluginProgram, plugin.appId)).toThrow('run rollout step D1')
  })

  test('refuses a StakingPlugin id that runs another program, and a non-creator sender', async () => {
    const manager = newManager()
    await expect(planHeartbeatManager(ctx, { manager, stakingPluginId: boot.walletFactory!.appId }))
      .rejects.toThrow('does not run the tree')
    await expect(planHeartbeatManager(ctx, { manager, stakingPluginId: plugin.appId, effectiveSender: newManager() }))
      .rejects.toThrow('Only the DAO creator')
    await expect(planHeartbeatManager(ctx, { manager: ALGORAND_ZERO_ADDRESS_STRING, stakingPluginId: plugin.appId }))
      .rejects.toThrow('non-zero')
  })

  test('sets the manager, reads it back, clears the used bootstrap key and removes the grant', async () => {
    const manager = newManager()
    const keysBefore = await bootstrapKeyCount()
    const plan = await planHeartbeatManager(ctx, { manager, stakingPluginId: plugin.appId })
    expect(plan).toMatchObject({ addGrant: true, execute: true, removeGrant: true, grant: 'absent' })

    const result = await runHeartbeatManager(ctx, { manager, stakingPluginId: plugin.appId, log })
    expect(result.proposalIds).toHaveLength(3)
    expect(await readHeartbeatManager(ctx, stakingAppId)).toBe(manager)
    expect(await grant()).toBeUndefined()
    expect(await daoSettings()).toBeUndefined()
    expect(await bootstrapKeyCount()).toBe(keysBefore)

    // Already set and no grant left: nothing to do.
    const again = await runHeartbeatManager(ctx, { manager, stakingPluginId: plugin.appId, log })
    expect(again).toMatchObject({ execute: false, removeGrant: false, proposalIds: [] })
  })

  test('--keep-grant keeps only the narrow grant; a later run reuses it and then removes it', async () => {
    const first = newManager()
    await runHeartbeatManager(ctx, { manager: first, stakingPluginId: plugin.appId, keepGrant: true, log })
    expect(await readHeartbeatManager(ctx, stakingAppId)).toBe(first)

    const kept = await grant()
    expect(kept).toBeDefined()
    expect(kept!.useExecutionKey).toBe(true)
    expect(kept!.admin).toBe(false)
    expect(kept!.methods.map(([selector]) => Buffer.from(selector).toString('hex')))
      .toEqual([Buffer.from(plugin.setHeartbeatManager()().selectors[0]).toString('hex')])
    const upgradeSettings = await ctx.dao.client.state.global.upgradeAppProposalSettings()
    expect(await daoSettings()).toEqual(upgradeSettings)

    // Without an execution proposal the grant does not let anyone call setHeartbeatManager.
    await expect((await ctx.dao.getWallet()).usePlugin({ sender: ctx.sender, signer: ctx.signer, callerType: CallerType.Global,
      calls: [plugin.setHeartbeatManager({ sender: ctx.sender, signer: ctx.signer, manager: newManager() })] })).rejects.toThrow()
    expect(await readHeartbeatManager(ctx, stakingAppId)).toBe(first)

    const second = newManager()
    const result = await runHeartbeatManager(ctx, { manager: second, stakingPluginId: plugin.appId, log })
    expect(result).toMatchObject({ grant: 'narrow', addGrant: false })
    expect(result.proposalIds).toHaveLength(2)
    expect(await readHeartbeatManager(ctx, stakingAppId)).toBe(second)
    expect(await grant()).toBeUndefined()
  })

  test('refuses to reuse or remove a broader StakingPlugin grant', async () => {
    await proposeAndExecute(ctx.algorand, ctx.dao, [{ type: ProposalActionEnum.AddPlugin, client: plugin,
      callerType: CallerType.Global, escrow: '', sourceLink: 'test', useExecutionKey: false }])
    await expect(planHeartbeatManager(ctx, { manager: newManager(), stakingPluginId: plugin.appId }))
      .rejects.toThrow('not the narrow setHeartbeatManager execution-key grant')
    await proposeAndExecute(ctx.algorand, ctx.dao, [{ type: ProposalActionEnum.RemovePlugin, plugin: plugin.appId,
      caller: ALGORAND_ZERO_ADDRESS_STRING, escrow: '' }])
  })
})

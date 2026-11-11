/**
 * `scripts/accept-plugin-dex-admin.ts` (scripts/lib/plugin-dex-admin-handover.ts) on LocalNet: the whole
 * Plugin DEX admin handover against a real DAO (rollout step H4; readiness audit 2026-11-09, C10).
 *
 * The deployer deploys and activates the 14-contract stack, which ends with every app that has an admin
 * proposing the DAO wallet. The DAO wallet then accepts through PluginDexAdminPlugin under
 * creator-approved proposals. Afterwards the DAO wallet administers the stack, the deployer does not,
 * and a later admin action goes the same way (shown with the backrun kill switch and, for the one app
 * whose admin was the DAO wallet all along, the GatedFeeHook pass lifetime).
 */
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { getNetworkAppIds } from 'akita-sdk'
import { ProposalActionEnum } from 'akita-sdk/dao'
import { CallerType, PluginDexAdminPluginSDK } from 'akita-sdk/wallet'
import { AppClient } from '@algorandfoundation/algokit-utils/types/app-client'
import algosdk, { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { bootstrapDaoTestContext } from '../smart_contracts/arc58/dao/tests/utils'
import { deployImmutable, immutableCatalog, pluginDexDeployOrder } from '../scripts/lib/immutable-deployment'
import { activatePluginDex, type ActivationPolicy, type DexContract } from '../scripts/lib/plugin-dex-activation'
import { ADMIN_PLUGIN, planAcceptAdmin, runAcceptAdmin } from '../scripts/lib/plugin-dex-admin-handover'
import { type ScriptContext } from '../scripts/script-base'
import { proposeAndExecute } from '../scripts/utils'

describe('accept-plugin-dex-admin through the DAO wallet', () => {
  let ctx: ScriptContext
  let daoWallet: string
  let plugin: PluginDexAdminPluginSDK
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'akita-dex-handover-'))
  const deployed = {} as Record<DexContract, bigint>
  const appClient = (name: DexContract) => new AppClient({ appId: deployed[name], algorand: ctx.algorand, defaultSender: ctx.sender, defaultSigner: ctx.signer,
    appSpec: fs.readFileSync(path.join(__dirname, '../smart_contracts/artifacts', immutableCatalog[name].artifact), 'utf8') })
  let policy: ActivationPolicy
  const log = () => {}

  // in the order the activation plans them
  const HANDOVER = ['PluginDex', 'BackrunArbHook', 'ConsensusKeyregHook', 'LaunchManager'] as const
  const admins = async () => Promise.all(HANDOVER.map(async (name) => {
    const state = await appClient(name).state.global.getAll()
    return [name, state.admin as string, state.pendingAdmin as string | undefined]
  }))
  const grant = async () => {
    const grants = await (await ctx.dao.getWallet()).client.state.box.plugins.getMap()
    return [...grants].find(([key]) => key.plugin === plugin.appId && key.caller === ALGORAND_ZERO_ADDRESS_STRING && key.escrow === '')?.[1]
  }
  const daoSettings = () => ctx.dao.client.state.box.plugins.value({ plugin: plugin.appId, escrow: '' }).catch(() => undefined)
  const bootstrapKeyCount = async () => (await ctx.dao.client.state.global.bootstrapKeyCount()) ?? 0n

  beforeAll(async () => {
    const boot = await bootstrapDaoTestContext({ useFullSetup: true, fundAmount: 500 })
    const apps = await boot.dao.client.state.global.akitaAppList()
    ctx = { options: { network: 'localnet', version: 'handover-test' }, algorand: boot.fixture.algorand,
      sender: boot.sender, signer: boot.signer, dao: boot.dao, updatePlugin: boot.daoUpdatePluginSdk!,
      appIds: { ...getNetworkAppIds('localnet'), dao: boot.dao.appId, updatePlugin: boot.daoUpdatePluginSdk!.appId,
        rewards: apps!.rewards, gate: apps!.gate } }
    ctx.algorand.setSigner(ctx.sender, ctx.signer)
    daoWallet = algosdk.getApplicationAddress((await ctx.dao.client.state.global.wallet())!).toString()
    policy = { launchFee: 1_000_000n, bounty: 200_000n, treasury: daoWallet, gatedFunding: 30_100n,
      devBuy: { maxBps: 500n, minVestSeconds: 86_400n, maxVestSeconds: 31_536_000n } }

    // Rewards v2 cutover (stage D2) comes before the stack; LaunchManager.setDevBuy must point at it.
    await deployImmutable(ctx, 'Rewards', {}, path.join(dir, 'Rewards.json'), true)
    // Tinyman is external and only stored at create; any live app ID stands in on LocalNet.
    const tinyman = ctx.dao.appId.toString()
    const params: Record<string, Record<string, string>> = {
      ImpactFeeHook: { minFeeBps: '30', maxFeeBps: '100', slopeBps: '10' },
      SwapTaxHook: { owner: ctx.sender, taxBps: '100' },
      VolatilityFeeHook: { filter: '30', decay: '600', reduction: '5000', control: '40000', maxVol: '1000', maxFee: '500' },
      BackrunArbHook: { tinyman },
    }
    for (const name of pluginDexDeployOrder) {
      const wiring = Object.entries(immutableCatalog[name].dependencies ?? {}).map(([arg, dep]) => [arg, deployed[dep as DexContract].toString()])
      deployed[name] = (await deployImmutable(ctx, name, { ...params[name], ...Object.fromEntries(wiring) }, path.join(dir, `${name}.json`), true))!
    }
    plugin = new PluginDexAdminPluginSDK({ algorand: ctx.algorand, factoryParams: { appId: deployed[ADMIN_PLUGIN], defaultSender: ctx.sender, defaultSigner: ctx.signer } })
  })
  afterAll(() => fs.rmSync(dir, { recursive: true, force: true }))

  test('the admin plugin is the last contract of the stack, pinned to the five apps the DAO wallet administers', async () => {
    expect(pluginDexDeployOrder.at(-1)).toBe(ADMIN_PLUGIN)
    expect(await plugin.targets()).toEqual({
      vault: deployed.PluginDex,
      launchManager: deployed.LaunchManager,
      backrunArbHook: deployed.BackrunArbHook,
      consensusKeyregHook: deployed.ConsensusKeyregHook,
      gatedFeeHook: deployed.GatedFeeHook,
    })
    // deploy-immutable refuses to pin it to an app that is not the named contract (two hooks swapped)
    const swapped = path.join(dir, 'swapped.json')
    await expect(deployImmutable(ctx, ADMIN_PLUGIN, { vault: deployed.PluginDex.toString(), launchManager: deployed.LaunchManager.toString(),
      backrunArbHook: deployed.ConsensusKeyregHook.toString(), consensusKeyregHook: deployed.BackrunArbHook.toString(),
      gatedFeeHook: deployed.GatedFeeHook.toString() }, swapped))
      .rejects.toThrow(`${ADMIN_PLUGIN}.backrunArbHook: app ${deployed.ConsensusKeyregHook} is not BackrunArbHook`)
    expect(fs.existsSync(swapped)).toBe(false)
  })

  test('refuses, sending nothing, until every app has proposed the DAO wallet', async () => {
    await expect(planAcceptAdmin(ctx, { receiptsDir: dir })).rejects.toThrow(/PluginDex \d+ has not proposed the DAO wallet[\s\S]*run activate:plugin-dex first/)
    await expect(runAcceptAdmin(ctx, { receiptsDir: dir, log })).rejects.toThrow('has not proposed the DAO wallet')
    expect(await admins()).toEqual(HANDOVER.map((name) => [name, ctx.sender, undefined]))
    expect(await grant()).toBeUndefined()
  })

  test('activation proposes the DAO wallet; the plan then accepts all four under creator proposals', async () => {
    const report = await activatePluginDex(ctx, dir, policy)
    expect(report.filter((r) => r.status === 'awaiting').map((r) => [r.label, r.signer]))
      .toEqual(HANDOVER.map((name) => [`${name}.acceptAdmin()`, daoWallet]))
    expect(await admins()).toEqual(HANDOVER.map((name) => [name, ctx.sender, daoWallet]))

    const plan = await planAcceptAdmin(ctx, { receiptsDir: dir })
    expect(plan).toMatchObject({ adminPluginId: deployed[ADMIN_PLUGIN], daoWallet, grant: 'absent', addGrant: true, execute: true, removeGrant: true })
    expect(plan.apps.map((app) => [app.name, app.appId, app.status])).toEqual(HANDOVER.map((name) => [name, deployed[name], 'proposed']))

    const stranger = algosdk.generateAccount().addr.toString()
    await expect(planAcceptAdmin(ctx, { receiptsDir: dir, effectiveSender: stranger })).rejects.toThrow('Only the DAO creator')
  })

  test('refuses to reuse or remove a broader grant of the admin plugin', async () => {
    await proposeAndExecute(ctx.algorand, ctx.dao, [{ type: ProposalActionEnum.AddPlugin, client: plugin,
      callerType: CallerType.Global, escrow: '', sourceLink: 'test', useExecutionKey: false }])
    await expect(planAcceptAdmin(ctx, { receiptsDir: dir })).rejects.toThrow('not the narrow acceptAdminOf execution-key grant')
    await proposeAndExecute(ctx.algorand, ctx.dao, [{ type: ProposalActionEnum.RemovePlugin, plugin: plugin.appId,
      caller: ALGORAND_ZERO_ADDRESS_STRING, escrow: '' }])
    expect(await grant()).toBeUndefined()
  })

  test('the DAO wallet accepts every admin role in one group; the key is cleared and the grant removed', async () => {
    const keysBefore = await bootstrapKeyCount()
    const result = await runAcceptAdmin(ctx, { receiptsDir: dir, log })
    expect(result.proposalIds).toHaveLength(3)
    expect(await admins()).toEqual(HANDOVER.map((name) => [name, daoWallet, undefined]))
    expect(await grant()).toBeUndefined()
    expect(await daoSettings()).toBeUndefined()
    expect(await bootstrapKeyCount()).toBe(keysBefore)

    // the activation now finds nothing left to do or to wait for
    const done = await activatePluginDex(ctx, dir, policy)
    expect(done.every((r) => r.status === 'done')).toBe(true)

    // the deployer's key no longer administers anything
    await expect(appClient('PluginDex').send.call({ method: 'setProtocolFee', args: [0n, ctx.sender] })).rejects.toThrow(/errPdao/)
    await expect(appClient('LaunchManager').send.call({ method: 'setFees', args: [0n, 0n, ctx.sender] })).rejects.toThrow(/errLmad/)
    await expect(appClient('BackrunArbHook').send.call({ method: 'setPaused', args: [true] })).rejects.toThrow(/errBrao/)
    await expect(appClient('ConsensusKeyregHook').send.call({ method: 'deletePoolKeys', args: [1n] })).rejects.toThrow(/errCkad/)

    // already accepted and no grant left: nothing to do
    const again = await runAcceptAdmin(ctx, { receiptsDir: dir, log })
    expect(again).toMatchObject({ execute: false, removeGrant: false, proposalIds: [] })
    expect(again.apps.every((app) => app.status === 'accepted')).toBe(true)
  })

  test('a later admin action goes the same way: the DAO pauses the backrun hook and retunes the gated hook through a proposal', async () => {
    const paused = async () => (await appClient('BackrunArbHook').state.global.getAll()).paused
    const passTtl = async () => (await appClient('GatedFeeHook').state.global.getAll()).passTtl
    expect(await paused()).toBe(0n)
    expect(await passTtl()).not.toBe(7_200n)
    // GatedFeeHook never had a stored admin: only the DAO wallet may call it, the deployer never could
    await expect(appClient('GatedFeeHook').send.call({ method: 'setPassTtl', args: [7_200n] })).rejects.toThrow(/errGfad/)

    // a grant for these two methods, usable only through an execution proposal
    const settings = (await ctx.dao.client.state.global.upgradeAppProposalSettings())!
    await proposeAndExecute(ctx.algorand, ctx.dao, [{ type: ProposalActionEnum.AddPlugin, client: plugin, callerType: CallerType.Global, escrow: '',
      methods: [{ name: plugin.backrunSetPaused(), cooldown: 0n }, { name: plugin.gatedSetPassTtl(), cooldown: 0n }],
      useRounds: true, coverFees: false, sourceLink: 'test', useExecutionKey: true, ...settings }])
    const wallet = await ctx.dao.getWallet()

    // without an execution proposal the grant lets nobody make the call
    await expect(wallet.usePlugin({ sender: ctx.sender, signer: ctx.signer, callerType: CallerType.Global,
      calls: [plugin.backrunSetPaused({ sender: ctx.sender, signer: ctx.signer, paused: true })] })).rejects.toThrow()
    expect(await paused()).toBe(0n)

    const execution = await wallet.build.usePlugin({ sender: ctx.sender, signer: ctx.signer, lease: 'dex_pause_1', windowSize: 1000n,
      callerType: CallerType.Global, calls: [
        plugin.backrunSetPaused({ sender: ctx.sender, signer: ctx.signer, paused: true, rekeyBack: false }),
        plugin.gatedSetPassTtl({ sender: ctx.sender, signer: ctx.signer, ttl: 7_200n, rekeyBack: true }),
      ] })
    await proposeAndExecute(ctx.algorand, ctx.dao, [{ type: ProposalActionEnum.ExecutePlugin, plugin: plugin.appId,
      caller: ALGORAND_ZERO_ADDRESS_STRING, escrow: '', executionKey: execution.lease, groups: execution.ids,
      firstValid: execution.firstValid, lastValid: execution.lastValid }])
    await execution.send()
    expect(await paused()).toBe(1n)
    expect(await passTtl()).toBe(7_200n)

    const used = (await ctx.dao.getBootstrapKeys()).some((lease) => Buffer.from(lease).equals(Buffer.from(execution.lease)))
    if (used) await ctx.dao.clearBootstrapKeys({ leases: [execution.lease] })
    await proposeAndExecute(ctx.algorand, ctx.dao, [{ type: ProposalActionEnum.RemovePlugin, plugin: plugin.appId,
      caller: ALGORAND_ZERO_ADDRESS_STRING, escrow: '' }])
    expect(await grant()).toBeUndefined()
  })
})

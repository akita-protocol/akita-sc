import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import algosdk from 'algosdk'
import { getNetworkAppIds } from 'akita-sdk'
import { AppClient } from '@algorandfoundation/algokit-utils/types/app-client'
import { bootstrapDaoTestContext } from '../smart_contracts/arc58/dao/tests/utils'
import { deployImmutable, immutableCatalog, pluginDexDeployOrder } from '../scripts/lib/immutable-deployment'
import { activatePluginDex, type ActivationPolicy, type DexContract } from '../scripts/lib/plugin-dex-activation'
import { type ScriptContext } from '../scripts/script-base'

describe('activate-plugin-dex', () => {
  let ctx: ScriptContext
  let daoWallet: string
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'akita-dex-activation-'))
  const deployed = {} as Record<DexContract, bigint>
  const appClient = (name: DexContract) => new AppClient({ appId: deployed[name], algorand: ctx.algorand, defaultSender: ctx.sender, defaultSigner: ctx.signer,
    appSpec: fs.readFileSync(path.join(__dirname, '../smart_contracts/artifacts', immutableCatalog[name].artifact), 'utf8') })
  let policy: ActivationPolicy

  beforeAll(async () => {
    const boot = await bootstrapDaoTestContext({ useFullSetup: true, fundAmount: 500 })
    const apps = await boot.dao.client.state.global.akitaAppList()
    ctx = { options: { network: 'localnet', version: 'activation-test' }, algorand: boot.fixture.algorand,
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
  })
  afterAll(() => fs.rmSync(dir, { recursive: true, force: true }))

  test('refuses before any write when a receipt is missing', async () => {
    const partial = fs.mkdtempSync(path.join(dir, 'partial-'))
    for (const name of pluginDexDeployOrder.filter(n => n !== 'GatedFeePassPlugin')) fs.copyFileSync(path.join(dir, `${name}.json`), path.join(partial, `${name}.json`))
    await expect(activatePluginDex(ctx, partial, policy)).rejects.toThrow('Missing GatedFeePassPlugin receipt')
    expect((await appClient('PluginDex').state.box.getMap('approvedHooks')).size).toBe(0)
  })

  test('a dry run plans every call and sends nothing', async () => {
    const report = await activatePluginDex({ ...ctx, options: { ...ctx.options, dryRun: true } }, dir, policy)
    expect(report.every(r => r.status === 'pending')).toBe(true)
    expect(report.map(r => r.label)).toContain(`PluginDex.setAdmin(${daoWallet})`)
    expect(report.at(-1)!.signer).toBe(ctx.sender)
    expect((await appClient('PluginDex').state.box.getMap('approvedHooks')).size).toBe(0)
  })

  test('activates the stack as the deployer and hands every admin to the DAO wallet', async () => {
    const report = await activatePluginDex(ctx, dir, policy)
    expect(report.filter(r => r.status !== 'sent')).toEqual([])

    const vault = appClient('PluginDex')
    const hooks = await vault.state.box.getMap('approvedHooks')
    for (const name of pluginDexDeployOrder) for (const step of immutableCatalog[name].postDeploy ?? []) {
      if (step.method === 'setHookApproval') expect((hooks.get(deployed[name]) as any)?.perms, name).toBe(BigInt(step.args.perms as number))
    }
    expect(hooks.size).toBe(8)
    expect(((await vault.state.box.getMap('approvedCurves')).get(deployed.BinEngine) as any).lpMode).toBe(1n)

    const rewards = (await ctx.dao.client.state.global.akitaAppList())!.rewards
    expect(rewards).toBe(BigInt(JSON.parse(fs.readFileSync(path.join(dir, 'Rewards.json'), 'utf8')).appId))
    expect(await appClient('LaunchManager').state.global.getAll()).toMatchObject({ launchFee: 1_000_000n, bounty: 200_000n, treasury: daoWallet,
      antiSnipeHook: deployed.AntiSnipeFeeHook, launchTaxHook: deployed.LaunchTaxHook, gatedHook: deployed.GatedFeeHook, gatedFunding: 30_100n,
      rewards, devBuyMaxBps: 500n, devVestMin: 86_400n, devVestMax: 31_536_000n })

    for (const name of ['PluginDex', 'LaunchManager', 'BackrunArbHook', 'ConsensusKeyregHook'] as const) {
      expect((await appClient(name).state.global.getAll()).admin, name).toBe(daoWallet)
    }
  })

  test('a rerun skips every call', async () => {
    const report = await activatePluginDex(ctx, dir, policy)
    expect(report.every(r => r.status === 'done')).toBe(true)
  })

  test('refuses and prints DAO-proposal calls when the admin is already the DAO wallet', async () => {
    await expect(activatePluginDex(ctx, dir, { ...policy, launchFee: 2_000_000n }))
      .rejects.toThrow(/DAO proposal[\s\S]*"method":"setFees\(uint64,uint64,address\)void","args":\["2000000","200000"/)
    expect((await appClient('LaunchManager').state.global.getAll()).launchFee).toBe(1_000_000n)
  })
})

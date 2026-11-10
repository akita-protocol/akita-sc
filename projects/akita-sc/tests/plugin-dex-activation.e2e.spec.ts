import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import algosdk from 'algosdk'
import { getNetworkAppIds } from 'akita-sdk'
import { AlgoAmount } from '@algorandfoundation/algokit-utils/types/amount'
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

  // in the order the activation plans them
  const HANDOVER = ['PluginDex', 'BackrunArbHook', 'ConsensusKeyregHook', 'LaunchManager'] as const
  const admins = async (name: DexContract) => {
    const state = await appClient(name).state.global.getAll()
    return { admin: state.admin as string, pendingAdmin: state.pendingAdmin as string | undefined }
  }

  test('a dry run plans every call and sends nothing', async () => {
    const report = await activatePluginDex({ ...ctx, options: { ...ctx.options, dryRun: true } }, dir, policy)
    const labels = report.map(r => r.label)
    // AUD-C10: the handover is planned as propose (the deployer's call) then accept (the DAO wallet's call)
    expect(labels).toContain(`PluginDex.proposeAdmin(${daoWallet})`)
    expect(labels.slice(-HANDOVER.length)).toEqual(HANDOVER.map(name => `${name}.acceptAdmin()`))
    expect(labels.some(label => label.includes('setAdmin'))).toBe(false)
    const accepts = report.filter(r => r.label.endsWith('.acceptAdmin()'))
    expect(accepts.every(r => r.status === 'awaiting' && r.signer === daoWallet)).toBe(true)
    expect(report.filter(r => !r.label.endsWith('.acceptAdmin()')).every(r => r.status === 'pending' && r.signer === ctx.sender)).toBe(true)
    expect((await appClient('PluginDex').state.box.getMap('approvedHooks')).size).toBe(0)
    expect(await admins('PluginDex')).toEqual({ admin: ctx.sender, pendingAdmin: undefined })
  })

  test('activates the stack as the deployer and proposes the DAO wallet as admin of every app', async () => {
    const report = await activatePluginDex(ctx, dir, policy)
    expect(report.filter(r => r.status !== 'sent').map(r => [r.label, r.status, r.signer]))
      .toEqual(HANDOVER.map(name => [`${name}.acceptAdmin()`, 'awaiting', daoWallet]))

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

    // The deployer is still the admin everywhere; the DAO wallet is only proposed. Nothing is locked
    // if the DAO wallet has no way to call these apps yet.
    for (const name of HANDOVER) expect(await admins(name), name).toEqual({ admin: ctx.sender, pendingAdmin: daoWallet })
  })

  test('a rerun sends nothing: only the DAO wallet\'s own acceptances are open', async () => {
    const report = await activatePluginDex(ctx, dir, policy)
    expect(report.filter(r => r.status === 'sent')).toEqual([])
    expect(report.filter(r => r.status !== 'done').map(r => [r.label, r.status]))
      .toEqual(HANDOVER.map(name => [`${name}.acceptAdmin()`, 'awaiting']))
  })

  test('while the handover is pending the deployer can still correct the configuration', async () => {
    const report = await activatePluginDex(ctx, dir, { ...policy, launchFee: 1_500_000n })
    expect(report.filter(r => r.status === 'sent').map(r => r.label)).toEqual([expect.stringContaining('LaunchManager.setFees(')])
    expect((await appClient('LaunchManager').state.global.getAll()).launchFee).toBe(1_500_000n)
    await activatePluginDex(ctx, dir, policy)
    expect((await appClient('LaunchManager').state.global.getAll()).launchFee).toBe(1_000_000n)
  })

  test('the handover finishes only when the proposed admin accepts, and then the deployer is out', async () => {
    // The DAO wallet is an app account, which a test cannot sign for. A plain account stands in as the
    // final admin through the library-only override (the CLI always uses the DAO wallet).
    const successor = ctx.algorand.account.random()
    await ctx.algorand.send.payment({ sender: ctx.sender, receiver: successor.addr, amount: AlgoAmount.Algos(10) })
    const finalAdmin = successor.addr.toString()
    const proposed = await activatePluginDex(ctx, dir, policy, { finalAdmin })
    // the proposal moves from the DAO wallet to the stand-in; acceptance still waits for the stand-in itself
    expect(proposed.filter(r => r.status === 'sent').map(r => r.label)).toEqual(HANDOVER.map(name => `${name}.proposeAdmin(${finalAdmin})`))
    expect(proposed.filter(r => r.status === 'awaiting').map(r => r.signer)).toEqual(HANDOVER.map(() => finalAdmin))
    for (const name of HANDOVER) expect(await admins(name), name).toEqual({ admin: ctx.sender, pendingAdmin: finalAdmin })

    // the deployer cannot accept for it
    await expect(appClient('PluginDex').send.call({ method: 'acceptAdmin', args: [] })).rejects.toThrow(/errPdao/)
    for (const name of HANDOVER) {
      await appClient(name).send.call({ method: 'acceptAdmin', args: [], sender: successor.addr, signer: successor.signer })
      expect(await admins(name), name).toEqual({ admin: finalAdmin, pendingAdmin: undefined })
    }

    const done = await activatePluginDex(ctx, dir, policy, { finalAdmin })
    expect(done.every(r => r.status === 'done')).toBe(true)

    // Once the final admin has accepted, further changes are its to make: nothing is sent and the
    // calls are printed for it.
    await expect(activatePluginDex(ctx, dir, { ...policy, launchFee: 2_000_000n }, { finalAdmin }))
      .rejects.toThrow(/DAO proposal[\s\S]*"method":"setFees\(uint64,uint64,address\)void","args":\["2000000","200000"/)
    expect((await appClient('LaunchManager').state.global.getAll()).launchFee).toBe(1_000_000n)
  })
})

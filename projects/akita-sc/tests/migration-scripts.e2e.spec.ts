import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { beforeAll, afterAll, describe, expect, test, vi } from 'vitest'
import algosdk from 'algosdk'
import { getNetworkAppIds } from 'akita-sdk'
import { microAlgo } from '@algorandfoundation/algokit-utils'
import { AppClient } from '@algorandfoundation/algokit-utils/types/app-client'
import { bootstrapDaoTestContext, type DaoTestContext } from '../smart_contracts/arc58/dao/tests/utils'
import { deployImmutable, immutableCatalog, immutableContracts, pluginDexDeployOrder, postDeploySteps, prepareImmutable,
  registerDaoApp } from '../scripts/lib/immutable-deployment'
import { type ScriptContext } from '../scripts/script-base'
import { discoverChildren, updateChildren } from '../scripts/lib/child-updates'
import { StakingPoolStakingType } from 'akita-sdk/staking-pool'

describe('migration deployment and update scripts', () => {
  let boot: DaoTestContext
  let ctx: ScriptContext
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'akita-migration-test-'))
  const deployed: Record<string, bigint> = {}
  beforeAll(async () => {
    boot = await bootstrapDaoTestContext({ useFullSetup: true, fundAmount: 500 })
    const apps = await boot.dao.client.state.global.akitaAppList()
    ctx = { options: { network: 'localnet', version: 'migration-test' }, algorand: boot.fixture.algorand,
      sender: boot.sender, signer: boot.signer, dao: boot.dao, updatePlugin: boot.daoUpdatePluginSdk!,
      appIds: { ...getNetworkAppIds('localnet'), dao: boot.dao.appId, updatePlugin: boot.daoUpdatePluginSdk!.appId,
        rewards: apps!.rewards, gate: apps!.gate } }
    ctx.algorand.setSigner(ctx.sender, ctx.signer)
  })
  afterAll(() => fs.rmSync(dir, { recursive: true, force: true }))

  const dexStack = new Set<string>(pluginDexDeployOrder)
  const ordered = immutableContracts.filter(name => !dexStack.has(name))
  for (const name of ordered) test(`deploys ${name} and verifies a receipt`, async () => {
    const allConfig = { router: ctx.dao.appId.toString(), gateAppID: ctx.appIds.gate.toString(),
      factory: boot.walletFactory!.appId.toString(), guild: '0', recipient: ctx.sender,
      registry: ctx.dao.appId.toString(), namespace: 'migration', keys: ['status'],
      // Gate v2: v1 gate_cursor at migration time; 1 = fresh network, no legacy imports
      legacyCutoff: '1',
      // SocialClaim: the WelcomePlugin and PayPlugin deployed above, a 32-byte attestor key and its manager
      welcome: deployed.WelcomePlugin?.toString() ?? '', pay: deployed.PayPlugin?.toString() ?? '',
      attestor: Array.from({ length: 32 }, (_, i) => i + 1) as unknown as string[], manager: ctx.sender }
    // Only supply fields declared by this contract; argument spelling comes from ARC-56.
    const catalog = await import('../scripts/lib/immutable-catalog.json')
    const entry = catalog.default[name as keyof typeof catalog.default]
    const spec = JSON.parse(fs.readFileSync(path.join(__dirname, '../smart_contracts/artifacts', entry.artifact), 'utf8'))
    const argNames = spec.methods.find((m: any) => m.actions.create.includes('NoOp'))?.args.map((a: any) => a.name) ?? []
    const config = Object.fromEntries(Object.entries(allConfig).filter(([key]) => argNames.includes(key)))
    const receipt = path.join(dir, `${name}.json`)
    // A stale/local-empty SDK map must not hide the currently active Rewards ID.
    const deploymentContext = name === 'Rewards' ? { ...ctx, appIds: { ...ctx.appIds, rewards: 0n } } : ctx
    const id = await deployImmutable(deploymentContext, name, config, receipt, true)
    expect(id).toBeGreaterThan(0n)
    deployed[name] = id!
    expect(JSON.parse(fs.readFileSync(receipt, 'utf8')).status).toBe('registered')
    if (name === 'Rewards') {
      expect((await ctx.dao.client.state.global.akitaAppList())!.rewards).toBe(id)
      expect(JSON.parse(fs.readFileSync(receipt, 'utf8')).oldAppId).toBe(ctx.appIds.rewards.toString())
      expect(await deployImmutable(ctx, name, config, receipt, true)).toBe(id)
      await expect(deployImmutable({ ...ctx, options: { ...ctx.options, version: 'different' } }, name, config, receipt)).rejects.toThrow('Manifest does not match')
    }
  })

  // OPEN-DECISIONS #2 (a): the PluginDex v2 stack deploys in dependency order, each dependency arg taken from an
  // earlier receipt. Non-ID parameters are deployment choices; the values here are the hook e2e suites' values.
  const artifactSpec = (name: string) => fs.readFileSync(path.join(__dirname, '../smart_contracts/artifacts', immutableCatalog[name].artifact), 'utf8')
  const appClient = (name: string, appId: bigint) => new AppClient({ appId, appSpec: artifactSpec(name), algorand: ctx.algorand,
    defaultSender: ctx.sender, defaultSigner: ctx.signer })
  const stackParams = (name: string): Record<string, string> => {
    // Tinyman is external and only stored at create; any live app ID stands in on LocalNet.
    const tinyman = ctx.dao.appId.toString()
    return ({
      ImpactFeeHook: { minFeeBps: '30', maxFeeBps: '100', slopeBps: '10' },
      SwapTaxHook: { owner: ctx.sender, taxBps: '100' },
      VolatilityFeeHook: { filter: '30', decay: '600', reduction: '5000', control: '40000', maxVol: '1000', maxFee: '500' },
      BackrunArbHook: { tinyman },
    } as Record<string, Record<string, string>>)[name] ?? {}
  }
  for (const name of pluginDexDeployOrder) test(`deploys PluginDex v2 stack: ${name} in dependency order`, async () => {
    const dependencies = Object.entries(immutableCatalog[name].dependencies ?? {})
    for (const [, dep] of [...dependencies, ...(immutableCatalog[name].after ?? []).map(d => ['', d])]) {
      expect(deployed[dep], `${dep} must be deployed before ${name}`).toBeDefined()
    }
    const config = { ...stackParams(name), ...Object.fromEntries(dependencies.map(([arg, dep]) => [arg, deployed[dep].toString()])) }
    const receipt = path.join(dir, `${name}.json`)
    const id = await deployImmutable(ctx, name, config, receipt, true)
    expect(id).toBeGreaterThan(0n)
    deployed[name] = id!
    expect(JSON.parse(fs.readFileSync(receipt, 'utf8')).status).toBe('registered')
    // The created app stores each dependency it was wired to.
    const state = await appClient(name, id!).state.global.getAll()
    for (const [arg, dep] of dependencies) expect(state[arg], `${name}.${arg}`).toBe(deployed[dep])
    if (name === 'PluginDex') expect(state).toMatchObject({ version: 'migration-test', admin: ctx.sender })
    if (name === 'PluginDexPlugin') expect(state.version).toBe('migration-test')
  })

  test('rejects a missing, nonexistent or wrong-contract dependency before writing a receipt', async () => {
    const receipt = path.join(dir, 'plugin-bad-dependency.json')
    expect(() => prepareImmutable(ctx, 'PluginDexPlugin')).toThrow('the app ID of PluginDex')
    await expect(deployImmutable(ctx, 'PluginDexPlugin', { dex: deployed.BinEngine.toString() }, receipt))
      .rejects.toThrow(`PluginDexPlugin.dex: app ${deployed.BinEngine} is not PluginDex`)
    await expect(deployImmutable(ctx, 'BinEngine', { vault: '999999999' }, receipt)).rejects.toThrow('does not exist; deploy PluginDex first')
    expect(fs.existsSync(receipt)).toBe(false)
  })

  test('the printed post-deploy admin checklist is accepted by the deployed Vault', async () => {
    // Approval boxes are paid from the Vault account (setHookApproval doc comment).
    await ctx.algorand.send.payment({ sender: ctx.sender, signer: ctx.signer, receiver: algosdk.getApplicationAddress(deployed.PluginDex), amount: microAlgo(1_000_000) })
    for (const name of pluginDexDeployOrder) for (const step of postDeploySteps(name, deployed[name])) {
      const target = appClient(step.app, deployed[step.app])
      const method = target.appSpec.methods.find(m => m.name === step.method)!
      const toAbi = (v: unknown): unknown => typeof v === 'number' ? BigInt(v) : Array.isArray(v) ? v.map(toAbi) : v
      await target.send.call({ method: step.method, args: method.args.map(a => toAbi(step.args[a.name!])) as any, populateAppCallResources: true })
    }
    const vault = appClient('PluginDex', deployed.PluginDex)
    for (const name of pluginDexDeployOrder) for (const step of immutableCatalog[name].postDeploy ?? []) {
      if (step.method === 'setHookApproval') expect((await vault.state.box.getMapValue('approvedHooks', deployed[name]) as any).perms).toBe(BigInt(step.args.perms as number))
      if (step.method === 'setCurveApproval') expect((await vault.state.box.getMapValue('approvedCurves', deployed[name]) as any).lpMode).toBe(1n)
    }
  })

  test('rejects a stale DAO pointer and unresolved deployment', async () => {
    await expect(registerDaoApp(ctx, 'gate', ctx.dao.appId, 0n)).rejects.toThrow('changed')
    const file = path.join(dir, 'PayPlugin.json')
    const receipt = JSON.parse(fs.readFileSync(file, 'utf8'))
    delete receipt.appId
    fs.writeFileSync(file, JSON.stringify(receipt))
    await expect(deployImmutable(ctx, 'PayPlugin', {}, file)).rejects.toThrow('unresolved')
    expect(() => prepareImmutable(ctx, 'EscrowFactory')).toThrow('Unknown immutable')
    expect(() => prepareImmutable(ctx, 'PaySiloPlugin', { recipient: 'bad-address' })).toThrow()
  })

  test('updates an existing pool through DAO governance and preserves state', async () => {
    const pool = await boot.stakingPoolFactory!.new({ sender: ctx.sender, signer: ctx.signer, title: 'Preserved pool',
      type: StakingPoolStakingType.NONE, marketplace: ctx.sender, stakeKey: { address: ctx.sender, name: 'migration' }, minimumStakeAmount: 1n,
      gateId: 0n, allowLateSignups: false, maxEntries: 0n })
    const before = await pool.client.state.global.getAll()
    await expect(updateChildren(ctx, 'staking-pool', boot.stakingPoolFactory!.appId + 1n, [pool.appId], false)).rejects.toThrow('not created')
    await updateChildren(ctx, 'staking-pool', boot.stakingPoolFactory!.appId, [pool.appId], false)
    const after = await pool.client.state.global.getAll()
    expect(after.version).toBe('migration-test')
    const storedClear = (await ctx.updatePlugin.client.state.global.clearProgram()).asByteArray()
    const live = (await ctx.algorand.client.algod.getApplicationByID(pool.appId).do()).params!
    expect(live.clearStateProgram).toEqual(storedClear)
    expect({ ...after, version: before.version }).toEqual(before)
    expect(await updateChildren(ctx, 'staking-pool', boot.stakingPoolFactory!.appId, [pool.appId], false)).toEqual([])
    await vi.waitFor(async () => {
      expect(await discoverChildren(ctx, boot.stakingPoolFactory!.appId)).toContain(pool.appId)
    }, { timeout: 30_000, interval: 500 })
  })

  for (const kind of ['auction', 'raffle'] as const) test(`updates an existing ${kind} and preserves its sale state`, async () => {
    const asset = await ctx.algorand.send.assetCreate({ sender: ctx.sender, signer: ctx.signer, total: 10n, decimals: 0 })
    const factory = kind === 'auction' ? boot.auctionFactory! : boot.raffleFactory!
    await factory.optIn({ sender: ctx.sender, signer: ctx.signer, asset: asset.assetId })
    const status = await ctx.algorand.client.algod.status().do()
    const timestamp = (await ctx.algorand.client.algod.block(status.lastRound).do()).block.header.timestamp
    const common = { sender: ctx.sender, signer: ctx.signer, prizeAsset: asset.assetId, prizeAmount: 1n, name: 'Preserved sale', proof: [],
      startTimestamp: timestamp + 1000n, endTimestamp: timestamp + 86_400n, gateId: 0n, marketplace: ctx.sender, weightsListCount: 4n }
    const child = kind === 'auction'
      ? await boot.auctionFactory!.newAuction({ ...common, isPrizeBox: false, bidAssetId: 0n, bidFee: 0n, startingBid: 1_000_000n, bidMinimumIncrease: 100_000n, weightsListCount: 0n })
      : await boot.raffleFactory!.newRaffle({ ...common, ticketAsset: 0n, minTickets: 1_000_000n, maxTickets: 100_000_000n })
    const before = await child.client.state.global.getAll()
    await updateChildren(ctx, kind, factory.appId, [child.appId], false)
    const after = await child.client.state.global.getAll()
    expect(after.version).toBe('migration-test')
    expect({ ...after, version: before.version }).toEqual(before)
  })

  test('resumes the recorded DAO proposal after an interrupted registration', async () => {
    const appIds = { ...ctx.appIds, gate: (await ctx.dao.client.state.global.akitaAppList())!.gate }
    const context = { ...ctx, appIds }
    const file = path.join(dir, 'gate-resume.json')
    const gateConfig = { legacyCutoff: '1' }
    const interrupted = vi.spyOn(ctx.dao.client.send, 'executeProposal').mockRejectedValueOnce(new Error('test interruption'))
    try {
      await expect(deployImmutable(context, 'Gate', gateConfig, file, true)).rejects.toThrow('test interruption')
    } finally { interrupted.mockRestore() }
    const receipt = JSON.parse(fs.readFileSync(file, 'utf8'))
    expect(BigInt(receipt.registrationProposalId)).toBeGreaterThanOrEqual(0n)
    const live = (await ctx.dao.client.state.global.akitaAppList())!
    const stale = vi.spyOn(ctx.dao.client.state.global, 'akitaAppList').mockResolvedValueOnce({ ...live, pool: live.pool + 1n })
    try {
      await expect(deployImmutable(context, 'Gate', gateConfig, file, true)).rejects.toThrow('no longer matches')
    } finally { stale.mockRestore() }
    await expect(registerDaoApp(ctx, 'gate', ctx.dao.appId, live.gate, { unresolved: true })).rejects.toThrow('outcome is unresolved')
    const create = vi.spyOn(ctx.dao, 'newProposal')
    try {
      expect(await deployImmutable(context, 'Gate', gateConfig, file, true)).toBe(BigInt(receipt.appId))
      expect(create).not.toHaveBeenCalled()
    } finally { create.mockRestore() }
  })
})

import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterAll, beforeAll, describe, expect, test, vi } from 'vitest'
import algosdk from 'algosdk'
import { getNetworkAppIds } from 'akita-sdk'
import { microAlgo } from '@algorandfoundation/algokit-utils'
import { bootstrapDaoTestContext, type DaoTestContext } from '../smart_contracts/arc58/dao/tests/utils'
import { GuildConsensusFactoryFactory } from '../smart_contracts/artifacts/arc58/guilds/consensus/GuildConsensusFactoryClient'
import { type ScriptContext } from '../scripts/script-base'
import { assertProgram, CONSENSUS_PROGRAMS, compileGuildDeployment, deployGuildFactories, GUILD_PROGRAM } from '../scripts/lib/guild-deployment'
import { uploadGuildProgram } from '../scripts/lib/guild-programs'
import { deployMeta } from '../scripts/lib/meta-deployment'

describe('Guild factory and Meta deployment receipts', () => {
  let boot: DaoTestContext
  let ctx: ScriptContext
  let revenueEscrow: { name: string; app: bigint }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'akita-release-deploy-test-'))
  const createdApps = async () => (await ctx.algorand.client.algod.accountInformation(ctx.sender).do()).totalCreatedApps
  const receiptOf = (file: string) => JSON.parse(fs.readFileSync(file, 'utf8'))

  beforeAll(async () => {
    boot = await bootstrapDaoTestContext({ useFullSetup: true, fundAmount: 500 })
    ctx = { options: { network: 'localnet', version: 'release-test' }, algorand: boot.fixture.algorand,
      sender: boot.sender, signer: boot.signer, dao: boot.dao, updatePlugin: boot.daoUpdatePluginSdk!,
      appIds: { ...getNetworkAppIds('localnet'), dao: boot.dao.appId } }
    ctx.algorand.setSigner(ctx.sender, ctx.signer)
    revenueEscrow = { name: 'guild_revenue', app: (await ctx.dao.client.state.global.wallet())! }
  })
  afterAll(() => fs.rmSync(dir, { recursive: true, force: true }))

  test('refuses before any write when aal.wallet lacks the 11-argument newAccount (K2)', async () => {
    const file = path.join(dir, 'guild-k2.json')
    const before = await createdApps()
    const live = (await ctx.dao.client.state.global.akitaAppList())!
    // Any app without the selector stands in for a pre-K2 factory (not the DAO: it calls newAccount itself).
    const legacy = vi.spyOn(ctx.dao.client.state.global, 'akitaAppList').mockResolvedValue({ ...live, wallet: live.gate })
    try {
      await expect(deployGuildFactories(ctx, { revenueEscrow, manifest: file })).rejects.toThrow(`K2: wallet factory ${live.gate} (aal.wallet) does not route`)
    } finally { legacy.mockRestore() }
    expect(fs.existsSync(file)).toBe(false)
    expect(await createdApps()).toBe(before)
  })

  test('refuses before any write when the DAO has no guild_fees', async () => {
    const file = path.join(dir, 'guild-fees.json')
    const before = await createdApps()
    const missing = vi.spyOn(ctx.dao.client.state.global, 'guildFees').mockResolvedValue(undefined)
    try {
      await expect(deployGuildFactories(ctx, { revenueEscrow, manifest: file })).rejects.toThrow('has no guild_fees global')
    } finally { missing.mockRestore() }
    expect(fs.existsSync(file)).toBe(false)
    expect(await createdApps()).toBe(before)
  })

  test('resumes an interrupted deployment without recreating the consensus factory', async () => {
    const file = path.join(dir, 'guild.json')
    const before = await createdApps()
    const interrupted = vi.spyOn(ctx.algorand.account, 'ensureFunded').mockRejectedValueOnce(new Error('test interruption'))
    try {
      await expect(deployGuildFactories(ctx, { revenueEscrow, manifest: file })).rejects.toThrow('test interruption')
    } finally { interrupted.mockRestore() }
    const partial = receiptOf(file)
    expect(partial.apps.GuildConsensusFactory.appId).toBeDefined()
    expect(partial.apps.GuildFactory).toBeUndefined()

    const ids = (await deployGuildFactories(ctx, { revenueEscrow, manifest: file, register: true }))!
    expect(ids.consensusFactory.toString()).toBe(partial.apps.GuildConsensusFactory.appId)
    expect(await createdApps()).toBe(before + 2)
    expect(receiptOf(file)).toMatchObject({ registered: true, apps: { GuildFactory: { appId: ids.guildFactory.toString() } } })
    const { programs } = await compileGuildDeployment(ctx)
    for (const name of CONSENSUS_PROGRAMS) await assertProgram(ctx, ids.consensusFactory, name, programs[name])
    await assertProgram(ctx, ids.guildFactory, GUILD_PROGRAM, programs.guild)

    expect(await deployGuildFactories(ctx, { revenueEscrow, manifest: file, register: true })).toEqual(ids)
    expect(await createdApps()).toBe(before + 2)
    await expect(deployGuildFactories(ctx, { revenueEscrow: { ...revenueEscrow, name: 'other' }, manifest: file })).rejects.toThrow('Manifest does not match')
  })

  test('refuses to publish a consensus factory whose name holds another program', async () => {
    const file = path.join(dir, 'guild-squatted.json')
    const interrupted = vi.spyOn(ctx.algorand.account, 'ensureFunded').mockRejectedValueOnce(new Error('test interruption'))
    try {
      await expect(deployGuildFactories(ctx, { revenueEscrow, manifest: file })).rejects.toThrow('test interruption')
    } finally { interrupted.mockRestore() }
    const consensusFactoryId = BigInt(receiptOf(file).apps.GuildConsensusFactory.appId)
    // initProgram is permissionless: anyone can claim a consensus name first.
    const { programs } = await compileGuildDeployment(ctx)
    await ctx.algorand.send.payment({ sender: ctx.sender, signer: ctx.signer, receiver: algosdk.getApplicationAddress(consensusFactoryId), amount: microAlgo(100_000) })
    const squatted = new GuildConsensusFactoryFactory({ algorand: ctx.algorand, defaultSender: ctx.sender, defaultSigner: ctx.signer })
      .getAppClientById({ appId: consensusFactoryId })
    await uploadGuildProgram(ctx.algorand, squatted, ctx.sender, ctx.signer, 'fixed-signers', programs['locked-token'])

    await expect(deployGuildFactories(ctx, { revenueEscrow, manifest: file, register: true })).rejects.toThrow(`Factory ${consensusFactoryId} "fixed-signers" is not the expected program`)
    expect(receiptOf(file).apps.GuildFactory).toBeUndefined()
    expect(receiptOf(file).registered).toBeUndefined()
  })

  test('deploys Meta once per receipt and leaves aal.metaMerkles alone', async () => {
    const file = path.join(dir, 'meta.json')
    const before = await createdApps()
    const metaMerkles = (await ctx.dao.client.state.global.akitaAppList())!.metaMerkles
    const appId = (await deployMeta(ctx, file, true))!
    expect(await deployMeta(ctx, file, true)).toBe(appId)
    expect(await createdApps()).toBe(before + 1)
    expect(receiptOf(file)).toMatchObject({ registered: true, apps: { Meta: { appId: appId.toString() } } })
    expect((await ctx.dao.client.state.global.akitaAppList())!.metaMerkles).toBe(metaMerkles)
    await expect(deployMeta({ ...ctx, options: { ...ctx.options, version: 'other' } }, file)).rejects.toThrow('Manifest does not match')
  })
})

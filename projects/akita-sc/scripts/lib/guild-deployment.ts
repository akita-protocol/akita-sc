import fs from 'node:fs'
import path from 'node:path'
import algosdk from 'algosdk'
import { microAlgo } from '@algorandfoundation/algokit-utils'
import { GuildFactory as GuildProgramFactory } from '../../smart_contracts/artifacts/arc58/guilds/core/GuildClient'
import { GuildFactoryClient, GuildFactoryFactory } from '../../smart_contracts/artifacts/arc58/guilds/factory/GuildFactoryClient'
import { LockedTokenGuildConsensusFactory } from '../../smart_contracts/artifacts/arc58/guilds/consensus/locked-token/LockedTokenGuildConsensusClient'
import { FixedSignerGuildConsensusFactory } from '../../smart_contracts/artifacts/arc58/guilds/consensus/fixed-signers/FixedSignerGuildConsensusClient'
import { SubscriptionGuildConsensusFactory } from '../../smart_contracts/artifacts/arc58/guilds/consensus/subscriptions/SubscriptionGuildConsensusClient'
import { GuildConsensusFactoryClient, GuildConsensusFactoryFactory } from '../../smart_contracts/artifacts/arc58/guilds/consensus/GuildConsensusFactoryClient'
import { type ScriptContext, recordNetworkAppDeployment } from '../script-base'
import { programHasSelector } from './principal-rollout'
import { openReceipt, sha256, type CompiledApp } from './deployment-receipt'
import { uploadGuildProgram } from './guild-programs'

/** The official consensus options, registered under these first-come names before any factory ID is published. */
export const CONSENSUS_PROGRAMS = ['fixed-signers', 'locked-token', 'subscription'] as const
export const GUILD_PROGRAM = 'guild'
const PROGRAM_BOX_PREFIX = 'p'

type GuildPrograms = Record<(typeof CONSENSUS_PROGRAMS)[number] | typeof GUILD_PROGRAM, Uint8Array>
export type GuildDeploymentOptions = {
  revenueEscrow: { name: string; app: bigint }
  manifest?: string
  register?: boolean
}

/** The `newAccount` that Guild.createWallet calls: the tree wallet factory's 11-argument version (K2). */
export function guildNewAccountSignature(): string {
  const spec = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../smart_contracts/artifacts/arc58/account/AbstractedAccountFactory.arc56.json'), 'utf8'))
  const method = spec.methods.find((m: { name: string; args: unknown[] }) => m.name === 'newAccount' && m.args.length === 11)
  if (!method) throw new Error('AbstractedAccountFactory artifact has no 11-argument newAccount')
  return new algosdk.ABIMethod({ name: method.name, args: method.args.map((a: { type: string }) => ({ type: a.type })), returns: { type: method.returns.type } }).getSignature()
}

/**
 * Refuse before any write when the Guild factory could not create a working Guild: GuildFactory reads
 * aal.wallet and guild_fees at newGuild time, and every Guild calls the 11-argument newAccount.
 */
export async function assertGuildPrerequisites(ctx: ScriptContext): Promise<{ walletFactory: bigint }> {
  const walletFactory = (await ctx.dao.client.state.global.akitaAppList())?.wallet ?? 0n
  if (walletFactory === 0n) throw new Error('DAO aal.wallet is unset; Guilds create their wallets through it')
  let program: Uint8Array | undefined
  try {
    program = (await ctx.algorand.client.algod.getApplicationByID(walletFactory).do()).params?.approvalProgram
  } catch { /* deleted or never created */ }
  const signature = guildNewAccountSignature()
  if (!program || !programHasSelector(program, signature)) {
    throw new Error(`K2: wallet factory ${walletFactory} (aal.wallet) does not route ${signature}; `
      + 'upgrade the wallet factory (stage E7) before deploying Guilds')
  }
  if (await ctx.dao.client.state.global.guildFees() === undefined) {
    throw new Error(`DAO ${ctx.dao.appId} has no guild_fees global; set it through a DAO UpdateFields on the upgraded `
      + 'DAO and validator (scripts/update-guild-creation-cost.ts) before deploying Guilds')
  }
  return { walletFactory }
}

export async function compileGuildDeployment(ctx: ScriptContext) {
  const params = { algorand: ctx.algorand, defaultSender: ctx.sender, defaultSigner: ctx.signer }
  const compile = async (factory: { appFactory: { compile(): Promise<CompiledApp> } }) => {
    const { approvalProgram, clearStateProgram } = await factory.appFactory.compile()
    return { approvalProgram, clearStateProgram }
  }
  const programs: GuildPrograms = {
    'fixed-signers': (await compile(new FixedSignerGuildConsensusFactory(params))).approvalProgram,
    'locked-token': (await compile(new LockedTokenGuildConsensusFactory(params))).approvalProgram,
    subscription: (await compile(new SubscriptionGuildConsensusFactory(params))).approvalProgram,
    guild: (await compile(new GuildProgramFactory(params))).approvalProgram,
  }
  return {
    params,
    programs,
    consensusFactory: await compile(new GuildConsensusFactoryFactory(params)),
    guildFactory: await compile(new GuildFactoryFactory(params)),
  }
}

async function readProgram(ctx: ScriptContext, appId: bigint, name: string): Promise<Uint8Array | undefined> {
  const key = new Uint8Array(Buffer.from(PROGRAM_BOX_PREFIX + name))
  const names = await ctx.algorand.app.getBoxNames(appId)
  if (!names.some((box) => Buffer.from(box.nameRaw).equals(Buffer.from(key)))) return undefined
  return ctx.algorand.app.getBoxValue(appId, key)
}

/** Throws unless `name` on factory `appId` holds exactly `program`. */
export async function assertProgram(ctx: ScriptContext, appId: bigint, name: string, program: Uint8Array) {
  const live = await readProgram(ctx, appId, name)
  if (!live) throw new Error(`Factory ${appId} has no "${name}" program`)
  if (!Buffer.from(live).equals(Buffer.from(program))) {
    throw new Error(`Factory ${appId} "${name}" is not the expected program (sha256 ${sha256(live)}, expected ${sha256(program)}). `
      + 'Program names are first-come; do not publish this factory')
  }
}

/** Upload `program` unless the name already holds it. A name holding another program is refused, never overwritten. */
async function ensureProgram(ctx: ScriptContext, client: GuildFactoryClient | GuildConsensusFactoryClient, name: string, program: Uint8Array) {
  if (await readProgram(ctx, client.appId, name) === undefined) {
    await uploadGuildProgram(ctx.algorand, client, ctx.sender, ctx.signer, name, program)
  }
  await assertProgram(ctx, client.appId, name, program)
}

function programMbr(name: string, program: Uint8Array): bigint {
  // One-byte BoxMap prefix followed by the UTF-8 program name.
  return 2_500n + 400n * BigInt(1 + new TextEncoder().encode(name).length + program.length)
}

/**
 * GuildConsensusFactory → its three consensus programs → GuildFactory → the Guild kernel, resumable
 * through the receipt. Returns undefined in dry-run, after the pre-flight guards.
 */
export async function deployGuildFactories(ctx: ScriptContext, options: GuildDeploymentOptions) {
  const compiled = await compileGuildDeployment(ctx)
  for (const [name, program] of Object.entries(compiled.programs)) console.log(`${name} program: ${program.length} bytes`)
  const { walletFactory } = await assertGuildPrerequisites(ctx)
  console.log(`aal.wallet ${walletFactory} routes the 11-argument newAccount; DAO guild_fees is set`)
  if (ctx.options.dryRun) {
    const funding = Object.entries(compiled.programs).reduce((sum, [name, program]) => sum + programMbr(name, program), 200_000n)
    console.log(`Required factory funding: ${funding} microAlgos`)
    return undefined
  }

  const receipt = await openReceipt(ctx, options.manifest, {
    contract: 'GuildFactory',
    revenueEscrow: options.revenueEscrow,
    consensusFactory: { approval: sha256(compiled.consensusFactory.approvalProgram), clear: sha256(compiled.consensusFactory.clearStateProgram) },
    guildFactory: { approval: sha256(compiled.guildFactory.approvalProgram), clear: sha256(compiled.guildFactory.clearStateProgram) },
    programs: Object.fromEntries(Object.entries(compiled.programs).map(([name, program]) => [name, sha256(program)])),
  })
  const { params, programs } = compiled
  const daoArgs = { version: ctx.options.version, akitaDao: ctx.appIds.dao }

  const consensusFactoryId = await receipt.createApp('GuildConsensusFactory', compiled.consensusFactory, async (note) => {
    const { appClient, result } = await new GuildConsensusFactoryFactory(params).send.create.create({ args: daoArgs, note })
    return { appId: appClient.appId, txId: result.txIds[0] }
  })
  const consensusFactory = new GuildConsensusFactoryFactory(params).getAppClientById({ appId: consensusFactoryId })
  await ctx.algorand.account.ensureFunded(algosdk.getApplicationAddress(consensusFactoryId), ctx.sender, microAlgo(100_000))
  for (const name of CONSENSUS_PROGRAMS) await ensureProgram(ctx, consensusFactory, name, programs[name])

  const guildFactoryId = await receipt.createApp('GuildFactory', compiled.guildFactory, async (note) => {
    const { appClient, result } = await new GuildFactoryFactory(params).send.create.create({
      args: { ...daoArgs, consensusFactory: consensusFactoryId, akitaDaoEscrow: options.revenueEscrow }, note,
    })
    return { appId: appClient.appId, txId: result.txIds[0] }
  })
  const guildFactory = new GuildFactoryFactory(params).getAppClientById({ appId: guildFactoryId })
  await ctx.algorand.account.ensureFunded(algosdk.getApplicationAddress(guildFactoryId), ctx.sender, microAlgo(100_000))
  await ensureProgram(ctx, guildFactory, GUILD_PROGRAM, programs.guild)

  // Consensus names are permissionless: read every name back right before the IDs are published.
  for (const name of CONSENSUS_PROGRAMS) await assertProgram(ctx, consensusFactoryId, name, programs[name])
  await assertProgram(ctx, guildFactoryId, GUILD_PROGRAM, programs.guild)

  if (options.register) {
    await recordNetworkAppDeployment(ctx.options.network, 'guildConsensusFactory', consensusFactoryId)
    await recordNetworkAppDeployment(ctx.options.network, 'guildFactory', guildFactoryId)
    receipt.receipt.registered = true
    receipt.save()
  }
  console.log(`GuildConsensusFactory: ${consensusFactoryId}; GuildFactory: ${guildFactoryId}; receipt ${options.manifest}`)
  return { consensusFactory: consensusFactoryId, guildFactory: guildFactoryId }
}

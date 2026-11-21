/**
 * Rollout steps about grant policies. A grant policy is a Meta record, owned by a wallet and written
 * only through MetaPlugin (Meta's policy writer), that a plugin reads to decide what one grant may do.
 *
 *   - `installPolicyWriterGrant` (H1): the DAO wallet gets MetaPlugin as a global grant on no escrow
 *     that needs an execution key. The DAO's wallet has no admin who can sign, so this grant is how the
 *     DAO writes a policy: one ExecutePlugin proposal registers one group. It stays installed, so that
 *     after launch a policy changes by one vote at the thresholds of an app upgrade.
 *   - `writeDaoGrantPolicy`: that proposal and group, for the policy of one grant on the DAO wallet.
 *
 * Both need the DAO creator's key, the upgraded DAO (rollout B2) and a DAO that is not initialized;
 * after `initialize()` each is a vote, which no script here drives. Each reads back what it wrote, and
 * a rerun does only what is still missing.
 */
import algosdk, { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import { ProposalActionEnum } from 'akita-sdk/dao'
import { CallerType, MetaPluginSDK } from 'akita-sdk/wallet'
import type { ScriptContext } from '../script-base'
import { proposeAndExecute } from '../utils'
import { bootstrapWallet, clearUsedKey, fundWallet, fundWalletAdmin } from './dao-escrow-steps'
import { DEFAULT_SOURCE_LINK } from './dao-wallet-plugin-migration'
import { loadCompiled } from './principal-rollout'

const WINDOW_ROUNDS = 2000n
const META_PLUGIN_ARTIFACT = 'arc58/plugins/meta/MetaPlugin.arc56.json'
const hex = (bytes: Uint8Array) => Buffer.from(bytes).toString('hex')
type Log = (line: string) => void
type DaoWallet = Awaited<ReturnType<typeof bootstrapWallet>>['wallet']
type GrantInfo = Awaited<ReturnType<DaoWallet['client']['state']['box']['plugins']['getMap']>> extends Map<unknown, infer V> ? V : never

const globalUint = (app: algosdk.modelsv2.Application, key: string): bigint => {
  const entry = (app.params?.globalState ?? []).find((kv) => Buffer.from(kv.key).toString() === key)
  return entry ? BigInt(entry.value.uint) : 0n
}

/** The app Meta accepts grant policies from (`policy_writer`), or 0 when none is registered. */
export async function readPolicyWriter(ctx: Pick<ScriptContext, 'algorand'>, meta: bigint): Promise<bigint> {
  return globalUint(await ctx.algorand.client.algod.getApplicationByID(meta).do(), 'policy_writer')
}

/**
 * What keeps a global MetaPlugin grant on no escrow from being the DAO wallet's policy writer grant;
 * undefined when it is that grant. The execution key is the whole safety of it: without one, anyone
 * could open the window, and with one the wallet runs only a group a proposal registered.
 */
export function policyWriterGrantProblem(info: Pick<GrantInfo, 'useExecutionKey' | 'admin' | 'canReclaim' | 'coverFees'> | undefined): string | undefined {
  if (!info) return 'is not installed'
  if (!info.useExecutionKey) return 'does not need an execution key'
  if (info.admin) return 'is an admin grant'
  if (info.canReclaim) return 'can reclaim'
  if (info.coverFees) return 'covers fees'
  return undefined
}

/** Meta, and the MetaPlugin it takes policies from, as the SDK records them; throws unless they agree. */
async function resolveWriter(ctx: ScriptContext): Promise<{ meta: bigint; writer: bigint }> {
  const meta = ctx.appIds.meta
  const writer = ctx.appIds.metaPlugin
  if (!meta || !writer) throw new Error('The SDK records no meta or metaPlugin id for this network. Run deploy:meta and deploy:meta-plugin with --register, then rebuild the SDK')
  const app = await ctx.algorand.client.algod.getApplicationByID(writer).do().catch(() => { throw new Error(`MetaPlugin ${writer} does not exist`) })
  if (!Buffer.from(app.params!.approvalProgram).equals(Buffer.from(loadCompiled(META_PLUGIN_ARTIFACT).approval))) {
    throw new Error(`App ${writer} does not run the tree ${META_PLUGIN_ARTIFACT}`)
  }
  const registry = globalUint(app, 'registry')
  if (registry !== meta) throw new Error(`MetaPlugin ${writer} writes to Meta ${registry}, not ${meta}`)
  const current = await readPolicyWriter(ctx, meta)
  if (current !== writer) throw new Error(`Meta ${meta} takes policies from ${current || 'no app yet'}, not MetaPlugin ${writer}; run npm run set:policy-writer -- --confirm first`)
  return { meta, writer }
}

const writerClient = (ctx: ScriptContext, writer: bigint, sender: string) =>
  new MetaPluginSDK({ algorand: ctx.algorand, factoryParams: { appId: writer, defaultSender: sender, defaultSigner: ctx.signer } })

const findGrant = async (wallet: DaoWallet, plugin: bigint, caller: string, escrow: string) =>
  [...await wallet.client.state.box.plugins.getMap()].find(([key]) => key.plugin === plugin && key.caller === caller && key.escrow === escrow)?.[1]

// ---------------------------------------------------------------------------------------------
// H1: the DAO wallet's policy writer grant
// ---------------------------------------------------------------------------------------------

export type PolicyWriterGrantResult = { meta: bigint; writer: bigint; installed: boolean; proposalId?: bigint }

export async function installPolicyWriterGrant(ctx: ScriptContext, options: { plan?: boolean; sender?: string; sourceLink?: string; log?: Log } = {}): Promise<PolicyWriterGrantResult> {
  const log = options.log ?? console.log
  const sender = options.sender ?? ctx.sender
  const { wallet, walletAddress } = await bootstrapWallet(ctx, sender)
  const { meta, writer } = await resolveWriter(ctx)
  // A policy says who a grant may pay, so changing one is held to the thresholds of an app upgrade.
  const settings = await ctx.dao.client.state.global.upgradeAppProposalSettings()
  if (!settings) throw new Error('The DAO has no upgradeApp proposal settings')

  const existing = await findGrant(wallet, writer, ALGORAND_ZERO_ADDRESS_STRING, '')
  const problem = policyWriterGrantProblem(existing)
  if (existing && problem) throw new Error(`The DAO wallet already holds a global MetaPlugin ${writer} grant on no escrow that ${problem}; refusing to reuse it`)
  log(`  Meta ${meta} takes policies from MetaPlugin ${writer}; the DAO wallet's execution-key grant of it: ${existing ? 'present' : 'absent'}`)
  if (existing || options.plan) return { meta, writer, installed: !existing }

  const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n })
  await fundWallet(ctx, walletAddress, mbr.plugins, log)
  const proposalId = await proposeAndExecute(ctx.algorand, ctx.dao, [{
    type: ProposalActionEnum.AddPlugin, client: writerClient(ctx, writer, sender), callerType: CallerType.Global, escrow: '',
    sourceLink: options.sourceLink ?? DEFAULT_SOURCE_LINK, useExecutionKey: true,
    fee: settings.fee, power: settings.power, duration: settings.duration, participation: settings.participation, approval: settings.approval,
  }])
  const after = await findGrant(wallet, writer, ALGORAND_ZERO_ADDRESS_STRING, '')
  const afterProblem = policyWriterGrantProblem(after)
  if (afterProblem) throw new Error(`The DAO wallet's MetaPlugin ${writer} grant ${afterProblem} after proposal ${proposalId}`)
  const stored = await ctx.dao.client.state.box.plugins.value({ plugin: writer, escrow: '' }).catch(() => undefined)
  if (!stored || stored.power !== settings.power || stored.approval !== settings.approval || stored.participation !== settings.participation || stored.duration !== settings.duration) {
    throw new Error(`The DAO does not hold the upgrade thresholds for MetaPlugin ${writer} after proposal ${proposalId}`)
  }
  log(`  AddPlugin proposal ${proposalId} executed; verified the execution-key grant and its thresholds (power ${settings.power}, approval ${settings.approval}, participation ${settings.participation})`)
  return { meta, writer, installed: true, proposalId }
}

// ---------------------------------------------------------------------------------------------
// One grant's policy on the DAO wallet, written by proposal
// ---------------------------------------------------------------------------------------------

export type DaoGrantPolicy = { exists: boolean; revision: bigint; start: bigint; body: Uint8Array; current: boolean }

/** The stored policy of the DAO wallet's grant `(plugin, caller, escrow)`; `current` when it belongs to the installed grant. */
export async function readDaoGrantPolicy(ctx: ScriptContext, options: { plugin: bigint; caller: string; escrow: string; sender?: string }): Promise<DaoGrantPolicy & { grantStart: bigint }> {
  const writer = ctx.appIds.metaPlugin
  if (!writer) throw new Error('The SDK records no metaPlugin id for this network')
  const wallet = await ctx.dao.getWallet()
  const grant = await findGrant(wallet, options.plugin, options.caller, options.escrow)
  const policy = await writerClient(ctx, writer, options.sender ?? ctx.sender).getPolicy({ wallet: wallet.appId, plugin: options.plugin, caller: options.caller, escrow: options.escrow })
  const grantStart = grant ? BigInt(grant.start) : 0n
  return { exists: policy.exists, revision: policy.revision, start: policy.start, body: policy.body, grantStart, current: policy.exists && grantStart !== 0n && policy.start === grantStart }
}

export type GrantPolicyResult = { plugin: bigint; caller: string; escrow: string; written: boolean; revision: bigint; proposalId?: bigint }

export async function writeDaoGrantPolicy(ctx: ScriptContext, options: { plugin: bigint; caller: string; escrow: string; body: Uint8Array; plan?: boolean; sender?: string; log?: Log }): Promise<GrantPolicyResult> {
  const log = options.log ?? console.log
  const { plugin, caller, escrow, body } = options
  const sender = options.sender ?? ctx.sender
  const { wallet, walletAddress } = await bootstrapWallet(ctx, sender)
  const { writer } = await resolveWriter(ctx)
  const writerProblem = policyWriterGrantProblem(await findGrant(wallet, writer, ALGORAND_ZERO_ADDRESS_STRING, ''))
  if (writerProblem) throw new Error(`The DAO wallet's MetaPlugin ${writer} grant ${writerProblem}; run npm run install:policy-writer-grant -- --confirm first`)

  const where = `plugin ${plugin} on ${escrow === '' ? 'no escrow' : `"${escrow}"`}`
  const before = await readDaoGrantPolicy(ctx, { plugin, caller, escrow, sender })
  if (before.grantStart === 0n) throw new Error(`The DAO wallet has no grant of ${where} for caller ${caller}; install the grant first`)
  const same = before.current && hex(before.body) === hex(body)
  log(`  Policy of ${where}: ${!before.exists ? 'none' : before.current ? `revision ${before.revision}` : `revision ${before.revision}, written for an earlier install of the grant`}${same ? ' (already the wanted policy)' : ''}`)
  const result = { plugin, caller, escrow }
  if (same || options.plan) return { ...result, written: !same, revision: before.revision }

  await fundWalletAdmin(ctx, wallet)
  const client = writerClient(ctx, writer, ctx.sender)
  const execution = await wallet.build.usePlugin({
    sender: ctx.sender, signer: ctx.signer, lease: `grant_policy_${Date.now() % 1_000_000}`, windowSize: WINDOW_ROUNDS, callerType: CallerType.Global,
    calls: [client.configurePolicy({ sender: ctx.sender, signer: ctx.signer, plugin, caller, escrow, body, expectedRevision: before.revision })],
  })
  // The wallet pays for the registered group, and its own account pays Meta for the record.
  const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: BigInt(execution.ids.length) })
  await fundWallet(ctx, walletAddress, mbr.executions, log)
  const proposalId = await proposeAndExecute(ctx.algorand, ctx.dao, [{
    type: ProposalActionEnum.ExecutePlugin, plugin: writer, caller: ALGORAND_ZERO_ADDRESS_STRING, escrow: '',
    executionKey: execution.lease, groups: execution.ids, firstValid: execution.firstValid, lastValid: execution.lastValid,
  }])
  log(`  ExecutePlugin proposal ${proposalId} executed (lease ${hex(execution.lease)})`)
  await execution.send()
  await clearUsedKey(ctx, execution.lease, log)

  const after = await readDaoGrantPolicy(ctx, { plugin, caller, escrow, sender })
  if (!after.current || hex(after.body) !== hex(body)) throw new Error(`The policy of ${where} is not the wanted one after proposal ${proposalId}`)
  log(`  Verified: the policy of ${where} is stored at revision ${after.revision}, owned by the DAO wallet`)
  return { ...result, written: true, revision: after.revision, proposalId }
}

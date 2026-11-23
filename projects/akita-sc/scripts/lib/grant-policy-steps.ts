/**
 * Rollout steps about grant policies. A grant policy is a Meta record, owned by a wallet and written
 * only through MetaPlugin (Meta's policy writer), that a plugin reads to decide what one grant may do.
 *
 *   - `installPolicyWriterGrant` (H1): the DAO wallet gets MetaPlugin as a global grant on no escrow
 *     that needs an execution key. The DAO's wallet has no admin who can sign, so this grant is how the
 *     DAO writes a policy: one ExecutePlugin proposal registers one group. It stays installed, so that
 *     after launch a policy changes by one vote at the thresholds of an app upgrade.
 *   - `writeDaoGrantPolicy`: that proposal and group, for the policy of one grant on the DAO wallet.
 *   - `installPayPolicyGrant` (H6): an escrow pays out through PayPlugin as a global grant with only
 *     `pay`, and a policy that lists the one receiver it may pay. Anyone may trigger a payment, and it
 *     can only reach that receiver. This replaces the pay silo, whose receiver was fixed in a program.
 *
 * All three need the DAO creator's key, the upgraded DAO (rollout B2) and a DAO that is not initialized;
 * after `initialize()` each is a vote, which no script here drives. Each reads back what it wrote, and
 * a rerun does only what is still missing.
 */
import fs from 'fs'
import path from 'path'
import algosdk, { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import type { SDKClient } from 'akita-sdk'
import { ProposalAction, ProposalActionEnum } from 'akita-sdk/dao'
import { CallerType, decodePayPolicy, encodePayPolicy, MetaPluginSDK, type PayPluginSDK } from 'akita-sdk/wallet'
import type { ScriptContext } from '../script-base'
import { proposeAndExecute } from '../utils'
import { bootstrapWallet, clearUsedKey, fundWallet, fundWalletAdmin } from './dao-escrow-steps'
import { createPluginClient, DEFAULT_SOURCE_LINK } from './dao-wallet-plugin-migration'
import { artifactsRoot, loadCompiled } from './principal-rollout'

const WINDOW_ROUNDS = 2000n
const META_PLUGIN_ARTIFACT = 'arc58/plugins/meta/MetaPlugin.arc56.json'
const PAY_PLUGIN_ARTIFACT = 'arc58/plugins/pay/PayPlugin.arc56.json'
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

// ---------------------------------------------------------------------------------------------
// H6: an escrow that pays one receiver, through PayPlugin and its policy
// ---------------------------------------------------------------------------------------------

/**
 * What keeps app `plugin` from being a PayPlugin that reads this network's grant policies; undefined
 * when it is one. The registry a PayPlugin reads is fixed when it is created and nothing at deploy
 * checks it, so one created with another id would never find a policy.
 */
export async function payPluginProblem(ctx: Pick<ScriptContext, 'algorand' | 'appIds'>, plugin: bigint | undefined): Promise<string | undefined> {
  if (!plugin) return 'is not recorded in the SDK'
  const app = await ctx.algorand.client.algod.getApplicationByID(plugin).do().catch(() => undefined)
  if (!app?.params?.approvalProgram) return 'does not exist'
  if (!Buffer.from(app.params.approvalProgram).equals(Buffer.from(loadCompiled(PAY_PLUGIN_ARTIFACT).approval))) return `does not run the tree ${PAY_PLUGIN_ARTIFACT}`
  const registry = globalUint(app, 'registry')
  if (!ctx.appIds.meta || registry !== ctx.appIds.meta) return `reads grant policies from app ${registry}, not from Meta ${ctx.appIds.meta || '(not recorded)'}`
  return undefined
}

/** The selector of PayPlugin's `pay`, in hex, from the tree artifact. */
export function payMethodSelector(): string {
  const spec = JSON.parse(fs.readFileSync(path.join(artifactsRoot, PAY_PLUGIN_ARTIFACT), 'utf8')) as { methods: { name: string; args: { type: string; name: string }[]; returns: { type: string } }[] }
  const method = spec.methods.find((m) => m.name === 'pay')
  if (!method) throw new Error(`${PAY_PLUGIN_ARTIFACT} has no pay method`)
  return hex(new algosdk.ABIMethod({ name: method.name, args: method.args.map(({ type, name }) => ({ type, name })), returns: { type: method.returns.type } }).getSelector())
}

/**
 * What keeps a global PayPlugin grant from being the open, pay-only grant of H6; undefined when it is
 * that grant. Anyone may call it, so the policy is its only limit: it must not also reclaim, repay
 * fees out of the escrow, or reach another method.
 */
export function payOnlyGrantProblem(info: Pick<GrantInfo, 'useExecutionKey' | 'admin' | 'canReclaim' | 'coverFees' | 'methods'> | undefined, paySelector = payMethodSelector()): string | undefined {
  if (!info) return 'is not installed'
  if (info.admin) return 'is an admin grant'
  if (info.canReclaim) return 'can reclaim'
  if (info.coverFees) return 'covers fees'
  if (info.useExecutionKey) return 'needs an execution key'
  if (info.methods.length !== 1 || hex(info.methods[0][0]) !== paySelector) return 'does not list pay as its only method'
  return undefined
}

export type PayPolicyGrantResult = { plugin: bigint; escrow: string; recipient: string; assets: bigint[]; installed: boolean; written: boolean; proposalIds: bigint[] }

/**
 * Two proposals: the global pay-only grant of the recorded PayPlugin on `escrow`, then its policy,
 * which lists `recipient` as the one receiver. Between the two PayPlugin refuses every call of the
 * grant, because a global grant without an execution key pays nothing until it has a policy.
 *
 * `assets` are the only assets the grant may send (0 is ALGO). Left out, they are ALGO, the network's
 * AKTA and USDC, and whatever the escrow holds today. A pay silo sent any asset; here an asset that is
 * not listed stays in the escrow until a proposal changes the policy.
 */
export async function installPayPolicyGrant(ctx: ScriptContext, options: { escrow: string; recipient: string; assets?: bigint[]; plan?: boolean; sender?: string; sourceLink?: string; log?: Log }): Promise<PayPolicyGrantResult> {
  const log = options.log ?? console.log
  const { escrow, recipient } = options
  if (!algosdk.isValidAddress(recipient)) throw new Error(`--recipient ${recipient} is not an Algorand address`)
  if (escrow === '') throw new Error('An escrow is required: this grant is open to anyone, and must not reach the DAO wallet\'s own account')
  const sender = options.sender ?? ctx.sender
  const { wallet, walletAddress } = await bootstrapWallet(ctx, sender)
  const { writer } = await resolveWriter(ctx)
  const plugin = ctx.appIds.payPlugin
  const pluginProblem = await payPluginProblem(ctx, plugin)
  if (pluginProblem) throw new Error(`PayPlugin ${plugin || '(unset)'} ${pluginProblem}. Deploy it after Meta (npm run deploy:pay-plugin -- --config '{"registry":"<Meta app id>"}' --register) and rebuild the SDK`)
  const writerProblem = policyWriterGrantProblem(await findGrant(wallet, writer, ALGORAND_ZERO_ADDRESS_STRING, ''))
  if (writerProblem) throw new Error(`The DAO wallet's MetaPlugin ${writer} grant ${writerProblem}; run npm run install:policy-writer-grant -- --confirm first`)

  const escrowInfo = [...await wallet.client.state.box.escrows.getMap()].find(([name]) => name === escrow)?.[1]
  if (!escrowInfo || BigInt(escrowInfo.id) <= 0n) throw new Error(`The DAO wallet has no escrow "${escrow}"; create it first: npm run create:dao-escrow -- --escrow ${escrow} --execute`)
  const algod = ctx.algorand.client.algod
  const holdings = async (address: string) => ((await algod.accountInformation(address).do()).assets ?? []).map((a) => BigInt(a.assetId))
  const held = await holdings(algosdk.getApplicationAddress(BigInt(escrowInfo.id)).toString())
  const wanted = options.assets ?? [0n, ...[ctx.appIds.akta, ctx.appIds.usdc].filter((id) => !!id && id > 0n), ...held]
  const assets = [...new Set(wanted.map((id) => BigInt(id)))].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
  if (assets.length < 1 || assets.length > 8) throw new Error(`A pay policy lists 1 to 8 assets, and this one would list ${assets.length} (${assets.join(', ')}); choose them with --assets`)
  const body = encodePayPolicy({ recipients: [recipient], assets })

  const client = createPluginClient('payPlugin', ctx, plugin, sender) as unknown as PayPluginSDK
  const paySelector = hex(client.pay()().selectors[0])
  const existing = await findGrant(wallet, plugin, ALGORAND_ZERO_ADDRESS_STRING, escrow)
  const grantProblem = payOnlyGrantProblem(existing, paySelector)
  if (existing && grantProblem) throw new Error(`The DAO wallet already holds a global PayPlugin ${plugin} grant on "${escrow}" that ${grantProblem}; refusing to reuse it`)
  const before = existing ? await readDaoGrantPolicy(ctx, { plugin, caller: ALGORAND_ZERO_ADDRESS_STRING, escrow, sender }) : undefined
  const same = !!before?.current && hex(before.body) === hex(body)
  const paysNow = before?.current ? decodePayPolicy(before.body) : undefined
  log(`  PayPlugin ${plugin} on "${escrow}": pay-only grant ${existing ? 'present' : 'absent'}; policy ${same ? 'already the wanted one' : paysNow ? `pays ${paysNow.recipients.join(', ')} in assets ${paysNow.assets.join(', ')}, to be replaced` : before?.exists ? 'written for an earlier install of the grant' : 'absent'}`)
  log(`  Wanted: "${escrow}" pays only ${recipient}, in assets ${assets.join(', ')} (0 is ALGO)`)
  for (const id of held.filter((id) => !assets.includes(id))) log(`  Note: "${escrow}" holds asset ${id}, which the policy does not list; it stays in the escrow until a proposal changes the policy`)
  const receiverHolds = await holdings(recipient).catch(() => [] as bigint[])
  for (const id of assets.filter((id) => id !== 0n && !receiverHolds.includes(id))) log(`  Note: ${recipient} is not opted in to asset ${id}; a payment in it fails until it is`)
  const result = { plugin, escrow, recipient, assets }
  if (options.plan) return { ...result, installed: !existing, written: !same, proposalIds: [] }

  const proposalIds: bigint[] = []
  if (!existing) {
    const mbr = await wallet.getMbr({ escrow, methodCount: 1n, plugin: '', groups: 0n })
    await fundWallet(ctx, walletAddress, mbr.plugins, log)
    const proposalId = await proposeAndExecute(ctx.algorand, ctx.dao, [{
      type: ProposalActionEnum.AddPlugin, client, callerType: CallerType.Global, escrow,
      sourceLink: options.sourceLink ?? DEFAULT_SOURCE_LINK, useExecutionKey: false, methods: [{ name: client.pay(), cooldown: 0n }],
    } as ProposalAction<SDKClient>])
    const afterProblem = payOnlyGrantProblem(await findGrant(wallet, plugin, ALGORAND_ZERO_ADDRESS_STRING, escrow), paySelector)
    if (afterProblem) throw new Error(`The global PayPlugin ${plugin} grant on "${escrow}" ${afterProblem} after proposal ${proposalId}`)
    log(`  AddPlugin proposal ${proposalId} executed; verified the pay-only grant on "${escrow}". It pays nothing until its policy is written`)
    proposalIds.push(proposalId)
  }
  const policy = await writeDaoGrantPolicy(ctx, { plugin, caller: ALGORAND_ZERO_ADDRESS_STRING, escrow, body, sender, log })
  if (policy.proposalId !== undefined) proposalIds.push(policy.proposalId)

  const stored = await readDaoGrantPolicy(ctx, { plugin, caller: ALGORAND_ZERO_ADDRESS_STRING, escrow, sender })
  const pays = stored.current ? decodePayPolicy(stored.body) : undefined
  if (!pays || pays.recipients.length !== 1 || pays.recipients[0] !== recipient) throw new Error(`"${escrow}" does not pay only ${recipient} after proposal(s) ${proposalIds.join(', ')}`)
  log(`  Verified: "${escrow}" pays only ${recipient}, in assets ${pays.assets.join(', ')}`)
  return { ...result, installed: !existing, written: policy.written, proposalIds }
}

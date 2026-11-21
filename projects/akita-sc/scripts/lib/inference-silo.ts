/**
 * Mint the inference PaySilo from the DAO wallet, so the silo Akita bills through has DAO provenance.
 *
 * PaySiloPlugin.create(recipient) fixes the one address a silo can pay. An ARC-58 wallet can't create
 * apps itself, so the DAO wallet mints through PaySiloFactoryPlugin.mint(wallet, rekeyBack, recipient),
 * which creates the silo from the wallet's spending account. Before DAO `initialize()` (creator-approved
 * proposals, executed at once):
 *   1. AddPlugin: a PaySiloFactoryPlugin grant on the DAO wallet, global caller + execution key,
 *      restricted to `mint`. An execution key means every mint needs its own proposal, so the grant
 *      can't be used to mint silos (and spend the DAO wallet's ALGO on their MBR) without one.
 *   2. ExecutePlugin: registers the one group that calls `mint(recipient)`; the group is sent.
 *   3. The minted silo is read back: its creator is the DAO wallet, its approval program is the
 *      release manifest's PaySiloPlugin, and its `recipient` global is the requested recipient. The used
 *      bootstrap key is cleared, so it does not block `initialize()`.
 *   4. RemovePlugin (unless `keepGrant`): the grant and its DAO settings box are removed.
 *
 * Refuses unless the factory runs the release manifest's PaySiloFactoryPlugin (which embeds the 2.0.0
 * PaySilo). An existing grant at the same key is reused only if it has exactly this narrow shape.
 * Modeled on `heartbeat-manager.ts`.
 */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { microAlgo } from '@algorandfoundation/algokit-utils'
import algosdk, { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import type { SDKClient } from 'akita-sdk'
import { ProposalAction, ProposalActionEnum } from 'akita-sdk/dao'
import { CallerType, type PaySiloFactoryPluginSDK } from 'akita-sdk/wallet'
import type { ScriptContext } from '../script-base'
import { getAppFundingNeeded, proposeAndExecute } from '../utils'
import { createPluginClient, DAO_STATE_FULLY_INITIALIZED, DEFAULT_SOURCE_LINK } from './dao-wallet-plugin-migration'

export const RELEASE_MANIFEST_PATH = join(__dirname, '..', '..', 'release', 'manifest.json')
export const PAY_SILO_MANIFEST_KEY = 'arc58/plugins/pay-silo/PaySiloPlugin'
export const PAY_SILO_FACTORY_MANIFEST_KEY = 'arc58/plugins/pay-silo/PaySiloFactoryPlugin'
const RECIPIENT_KEY = 'recipient'
const WINDOW_ROUNDS = 1000n
/** A silo's own MBR (one global byte slice) plus room for the mint's fees. */
const MINT_FUNDING = 500_000n

type GrantState = 'absent' | 'narrow'

export type InferenceSiloOptions = {
  recipient: string
  factoryPluginId: bigint
  /** Keep the narrow factory grant installed after the mint (for later silos). */
  keepGrant?: boolean
  /** Sender of the proposals; must be the DAO creator. Defaults to `ctx.sender`. */
  effectiveSender?: string
  /** Release manifest to check programs against. Defaults to `release/manifest.json`. */
  manifestPath?: string
  log?: (line: string) => void
}

export type InferenceSiloPlan = {
  factoryPluginId: bigint
  recipient: string
  daoCreator: string
  daoState: bigint
  walletAppId: bigint
  spendingAddress: string
  siloApprovalSha256: string
  grant: GrantState
  addGrant: boolean
  removeGrant: boolean
  settings: { fee: bigint; power: bigint; duration: bigint; participation: bigint; approval: bigint }
}

export type InferenceSiloResult = InferenceSiloPlan & {
  proposalIds: bigint[]
  siloAppId: bigint
}

const hex = (bytes: Uint8Array) => Buffer.from(bytes).toString('hex')
const sha256 = (bytes: Uint8Array) => createHash('sha256').update(bytes).digest('hex')

/** The approval sha256 the release manifest records for `key`; throws when there is none. */
export function manifestApprovalSha256(key: string, manifestPath = RELEASE_MANIFEST_PATH): string {
  let manifest: { programs?: Record<string, { approval?: { sha256?: unknown } }> }
  try {
    manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
  } catch {
    throw new Error(`No release manifest at ${manifestPath}: run this from the release branch`)
  }
  const sha = manifest.programs?.[key]?.approval?.sha256
  if (typeof sha !== 'string' || !/^[0-9a-f]{64}$/.test(sha)) throw new Error(`The release manifest has no ${key} entry`)
  return sha
}

async function approvalOf(ctx: Pick<ScriptContext, 'algorand'>, appId: bigint) {
  const app = await ctx.algorand.client.algod.getApplicationByID(appId).do()
    .catch(() => { throw new Error(`App ${appId} does not exist`) })
  return { app, sha256: sha256(app.params!.approvalProgram) }
}

export async function readSiloRecipient(ctx: Pick<ScriptContext, 'algorand'>, siloAppId: bigint): Promise<string | undefined> {
  const app = await ctx.algorand.client.algod.getApplicationByID(siloAppId).do()
  const entry = (app.params?.globalState ?? []).find((kv) => Buffer.from(kv.key).toString() === RECIPIENT_KEY)
  return entry ? algosdk.encodeAddress(entry.value.bytes) : undefined
}

async function daoSettingsExist(ctx: ScriptContext, plugin: bigint): Promise<boolean> {
  try {
    return (await ctx.dao.client.state.box.plugins.value({ plugin, escrow: '' })) !== undefined
  } catch (error) {
    const status = (error as { status?: number; response?: { status?: number } })?.status ?? (error as { response?: { status?: number } })?.response?.status
    if (status === 404 || /box not found/i.test(String((error as Error)?.message ?? ''))) return false
    throw error
  }
}

async function readGrant(ctx: ScriptContext, plugin: bigint) {
  const grants = await (await ctx.dao.getWallet()).client.state.box.plugins.getMap()
  for (const [key, info] of grants) {
    if (key.plugin === plugin && key.caller === ALGORAND_ZERO_ADDRESS_STRING && key.escrow === '') return info
  }
  return undefined
}

function factoryPlugin(ctx: ScriptContext, appId: bigint, sender: string): PaySiloFactoryPluginSDK {
  return createPluginClient('paySiloFactoryPlugin', ctx, appId, sender) as unknown as PaySiloFactoryPluginSDK
}

/** Read-only checks; throws on every refusal. */
export async function planInferenceSilo(ctx: ScriptContext, options: InferenceSiloOptions): Promise<InferenceSiloPlan> {
  const { recipient, factoryPluginId, keepGrant = false } = options
  if (!algosdk.isValidAddress(recipient) || recipient === ALGORAND_ZERO_ADDRESS_STRING) {
    throw new Error(`--recipient must be a non-zero Algorand address (got ${recipient})`)
  }
  const effectiveSender = options.effectiveSender ?? ctx.sender
  const siloApprovalSha256 = manifestApprovalSha256(PAY_SILO_MANIFEST_KEY, options.manifestPath)
  const factoryApprovalSha256 = manifestApprovalSha256(PAY_SILO_FACTORY_MANIFEST_KEY, options.manifestPath)

  const g = ctx.dao.client.state.global
  const [pal, daoState, settings, daoApp] = await Promise.all([
    g.pluginAppList(), g.state(), g.upgradeAppProposalSettings(),
    ctx.algorand.client.algod.getApplicationByID(ctx.dao.appId).do(),
  ])
  const daoCreator = daoApp.params!.creator.toString()
  if (BigInt(daoState ?? 0n) === BigInt(DAO_STATE_FULLY_INITIALIZED)) {
    throw new Error('The DAO is initialized: this needs voted proposals, which this script does not drive')
  }
  if (effectiveSender !== daoCreator) {
    throw new Error(`Only the DAO creator ${daoCreator} can create pre-initialization proposals (sender ${effectiveSender})`)
  }
  if (!settings) throw new Error('The DAO has no upgradeApp proposal settings')
  if (factoryPluginId === pal?.update) throw new Error(`${factoryPluginId} is the DAO's Update plugin`)

  // The factory embeds the silo it mints, so the factory's program pins the silo's program.
  const factory = await approvalOf(ctx, factoryPluginId)
  if (factory.sha256 !== factoryApprovalSha256) {
    throw new Error(`PaySiloFactoryPlugin ${factoryPluginId} runs ${factory.sha256}, not the release manifest's ` +
      `${factoryApprovalSha256}; deploy the release factory first`)
  }

  const wallet = await ctx.dao.getWallet()
  // With no escrow, the plugin spends from (and so creates the silo from) the controlled address.
  const spendingAddress = (await wallet.client.state.global.controlledAddress()) ?? wallet.client.appAddress.toString()
  const selector = factoryPlugin(ctx, factoryPluginId, effectiveSender).mint()().selectors[0]
  const info = await readGrant(ctx, factoryPluginId)
  let grant: GrantState = 'absent'
  if (info) {
    const narrow = info.useExecutionKey && !info.admin && !info.canReclaim && !info.coverFees && info.methods.length === 1 &&
      hex(info.methods[0][0]) === hex(selector) && await daoSettingsExist(ctx, factoryPluginId)
    if (!narrow) {
      throw new Error(`The DAO wallet already holds a global PaySiloFactoryPlugin ${factoryPluginId} grant that is not the ` +
        'narrow mint execution-key grant; refusing to reuse or remove it')
    }
    grant = 'narrow'
  }

  return {
    factoryPluginId, recipient, daoCreator, daoState: BigInt(daoState ?? 0n),
    walletAppId: wallet.client.appId, spendingAddress: spendingAddress.toString(), siloApprovalSha256,
    grant, settings,
    addGrant: grant === 'absent',
    removeGrant: !keepGrant,
  }
}

export function describeInferenceSiloPlan(plan: InferenceSiloPlan): string[] {
  return [
    `PaySiloFactoryPlugin ${plan.factoryPluginId} runs the release manifest's program`,
    `DAO state ${plan.daoState}; creator ${plan.daoCreator}`,
    `DAO wallet ${plan.walletAppId} mints from ${plan.spendingAddress}`,
    `Silo recipient: ${plan.recipient}`,
    `Expected silo approval sha256: ${plan.siloApprovalSha256}`,
    `Existing narrow grant: ${plan.grant === 'narrow' ? 'yes (reused)' : 'no'}`,
    `Proposals: ${[plan.addGrant && 'AddPlugin', 'ExecutePlugin', plan.removeGrant && 'RemovePlugin'].filter(Boolean).join(' -> ')}`,
    `Grant policy: global caller, execution key, methods [mint], settings fee=${plan.settings.fee} ` +
      `power=${plan.settings.power} duration=${plan.settings.duration} participation=${plan.settings.participation} approval=${plan.settings.approval}`,
  ]
}

function addGrantAction(plan: InferenceSiloPlan, client: PaySiloFactoryPluginSDK): ProposalAction<SDKClient> {
  return {
    type: ProposalActionEnum.AddPlugin,
    client,
    callerType: CallerType.Global,
    escrow: '',
    methods: [{ name: client.mint(), cooldown: 0n }],
    useRounds: true,
    coverFees: false,
    sourceLink: DEFAULT_SOURCE_LINK,
    useExecutionKey: true,
    ...plan.settings,
  } as ProposalAction<SDKClient>
}

/** Cost of the AddPlugin proposal (simulated; signs nothing). */
export async function addFactoryGrantCost(ctx: ScriptContext, plan: InferenceSiloPlan, sender: string) {
  return await ctx.dao.proposalCost({ sender, signer: ctx.signer, actions: [addGrantAction(plan, factoryPlugin(ctx, plan.factoryPluginId, sender))] })
}

type InnerTxn = { applicationIndex?: bigint; innerTxns?: InnerTxn[]; txn?: { txn?: { type?: string } } }

function createdApps(transaction: InnerTxn): bigint[] {
  const own = transaction.applicationIndex && transaction.applicationIndex > 0n ? [transaction.applicationIndex] : []
  return [...own, ...(transaction.innerTxns ?? []).flatMap(createdApps)]
}

/** The app the mint group created, read from its confirmed transactions. */
async function mintedSiloId(ctx: ScriptContext, txIds: string[]): Promise<bigint> {
  const found = new Set<bigint>()
  for (const txId of txIds) {
    const info = await ctx.algorand.client.algod.pendingTransactionInformation(txId).do()
    for (const inner of (info.innerTxns ?? []) as unknown as InnerTxn[]) {
      for (const appId of createdApps(inner)) found.add(appId)
    }
  }
  if (found.size !== 1) throw new Error(`The mint group created ${found.size} apps, expected exactly one silo`)
  return [...found][0]
}

/** Throws unless the silo was created by the DAO wallet, runs the release PaySilo and pays `recipient`. */
export async function verifyInferenceSilo(ctx: ScriptContext, plan: InferenceSiloPlan, siloAppId: bigint): Promise<void> {
  const silo = await approvalOf(ctx, siloAppId)
  if (silo.app.params!.creator.toString() !== plan.spendingAddress) {
    throw new Error(`Silo ${siloAppId} was created by ${silo.app.params!.creator}, not the DAO wallet ${plan.spendingAddress}`)
  }
  if (silo.sha256 !== plan.siloApprovalSha256) {
    throw new Error(`Silo ${siloAppId} runs ${silo.sha256}, not the release PaySilo ${plan.siloApprovalSha256}`)
  }
  const stored = await readSiloRecipient(ctx, siloAppId)
  if (stored !== plan.recipient) throw new Error(`Silo ${siloAppId} pays ${stored}, expected ${plan.recipient}`)
}

export async function runInferenceSilo(ctx: ScriptContext, options: InferenceSiloOptions): Promise<InferenceSiloResult> {
  const log = options.log ?? ((line: string) => console.log(line))
  const plan = await planInferenceSilo(ctx, options)
  for (const line of describeInferenceSiloPlan(plan)) log(`  ${line}`)
  const proposalIds: bigint[] = []
  const client = factoryPlugin(ctx, plan.factoryPluginId, ctx.sender)
  const wallet = await ctx.dao.getWallet()
  const walletAddress = wallet.client.appAddress.toString()

  // The wallet holds the grant and execution boxes; the spending account pays the silo's MBR.
  const mbr = await wallet.getMbr({ escrow: '', methodCount: 1n, plugin: '', groups: 1n })
  const walletFunding = await getAppFundingNeeded(ctx.algorand, walletAddress, mbr.plugins + mbr.executions + 1_000_000n, 0n)
  if (walletFunding > 0n) await ctx.algorand.send.payment({ sender: ctx.sender, signer: ctx.signer, receiver: walletAddress, amount: microAlgo(walletFunding) })
  if (plan.spendingAddress !== walletAddress) {
    const spendingFunding = await getAppFundingNeeded(ctx.algorand, plan.spendingAddress, MINT_FUNDING, 0n)
    if (spendingFunding > 0n) await ctx.algorand.send.payment({ sender: ctx.sender, signer: ctx.signer, receiver: plan.spendingAddress, amount: microAlgo(spendingFunding) })
  }
  const admin = await wallet.client.state.global.admin()
  if (!admin) throw new Error('DAO wallet admin is missing')
  const adminFunding = await getAppFundingNeeded(ctx.algorand, admin, 1_000_000n, 0n)
  if (adminFunding > 0n) await ctx.algorand.send.payment({ sender: ctx.sender, signer: ctx.signer, receiver: admin, amount: microAlgo(adminFunding) })

  if (plan.addGrant) {
    proposalIds.push(await proposeAndExecute(ctx.algorand, ctx.dao, [addGrantAction(plan, client)]))
    log(`  AddPlugin proposal ${proposalIds.at(-1)} executed`)
  }

  const execution = await wallet.build.usePlugin({
    sender: ctx.sender,
    signer: ctx.signer,
    lease: `inf_silo_${Date.now() % 1_000_000}`,
    windowSize: WINDOW_ROUNDS,
    callerType: CallerType.Global,
    calls: [client.mint({ sender: ctx.sender, signer: ctx.signer, recipient: plan.recipient })],
  })
  proposalIds.push(await proposeAndExecute(ctx.algorand, ctx.dao, [{
    type: ProposalActionEnum.ExecutePlugin,
    plugin: plan.factoryPluginId,
    caller: ALGORAND_ZERO_ADDRESS_STRING,
    escrow: '',
    executionKey: execution.lease,
    groups: execution.ids,
    firstValid: execution.firstValid,
    lastValid: execution.lastValid,
  }]))
  log(`  ExecutePlugin proposal ${proposalIds.at(-1)} executed (lease ${hex(execution.lease)})`)
  const sent = await execution.send()

  const tracked = (await ctx.dao.getBootstrapKeys()).some((lease) => hex(lease) === hex(execution.lease))
  if (tracked) {
    await ctx.dao.clearBootstrapKeys({ leases: [execution.lease] })
    log('  Cleared the used bootstrap key')
  }

  const siloAppId = await mintedSiloId(ctx, sent.txIds)
  await verifyInferenceSilo(ctx, plan, siloAppId)
  log(`  Verified: silo ${siloAppId} was minted by the DAO wallet, runs the release PaySilo and pays ${plan.recipient}`)

  if (plan.removeGrant) {
    proposalIds.push(await proposeAndExecute(ctx.algorand, ctx.dao, [{
      type: ProposalActionEnum.RemovePlugin, plugin: plan.factoryPluginId, caller: ALGORAND_ZERO_ADDRESS_STRING, escrow: '',
    }]))
    if (await readGrant(ctx, plan.factoryPluginId) || await daoSettingsExist(ctx, plan.factoryPluginId)) {
      throw new Error(`PaySiloFactoryPlugin ${plan.factoryPluginId} grant or its DAO settings survived RemovePlugin`)
    }
    log(`  RemovePlugin proposal ${proposalIds.at(-1)} executed; grant removed`)
  }

  return { ...plan, proposalIds, siloAppId }
}

/**
 * Finish the Plugin DEX admin handover from the DAO wallet (rollout step H4; readiness audit 2026-11-09, C10).
 *
 * `activate-plugin-dex` ends with `proposeAdmin(DAO wallet)` on every DEX app that has an admin. Each app
 * then waits for `acceptAdmin()` from the DAO wallet itself. A wallet's address is only a sender inside a
 * plugin window, so the acceptance goes through PluginDexAdminPlugin. Before DAO `initialize()`
 * (creator-approved proposals, executed at once):
 *   1. AddPlugin: a PluginDexAdminPlugin grant on the DAO wallet, global caller + execution key, restricted
 *      to `acceptAdminOf`. Only a global execution-key grant gets DAO ExecutePlugin settings, and an
 *      execution key means every use needs its own proposal. The settings are the DAO's live
 *      upgrade-class settings, so after launch each use needs an upgrade-class vote.
 *   2. ExecutePlugin: registers the one group that calls `acceptAdminOf(app)` for every app that has
 *      proposed the DAO wallet; the group is sent.
 *   3. Each app's admin is read back. The used bootstrap key is cleared, so it does not block `initialize()`.
 *   4. RemovePlugin (unless `keepGrant`): the grant and its DAO settings box are removed. The grant only
 *      covers `acceptAdminOf`; a later admin action (pause a pool, change an approval or a fee) needs its
 *      own grant for that method and its own execution proposal.
 *
 * Refuses unless the receipts describe one finished stack on this network (`loadDexStack`), the admin
 * plugin runs the tree artifact, and every app with an admin has either proposed the DAO wallet or is
 * already administered by it. An existing grant at the same key is reused only if it has exactly this
 * narrow shape; any other grant there is refused.
 */
import { microAlgo } from '@algorandfoundation/algokit-utils'
import { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import type { SDKClient } from 'akita-sdk'
import { ProposalAction, ProposalActionEnum } from 'akita-sdk/dao'
import { CallerType, PluginDexAdminPluginSDK } from 'akita-sdk/wallet'
import type { ScriptContext } from '../script-base'
import { getAppFundingNeeded, proposeAndExecute } from '../utils'
import { DAO_STATE_FULLY_INITIALIZED, DEFAULT_SOURCE_LINK } from './dao-wallet-plugin-migration'
import { approvalHashOf, immutableCatalog } from './immutable-deployment'
import { daoWalletAddress, dexClients, handoverApps, loadDexStack, type DexContract, type DexStack } from './plugin-dex-activation'
import { createHash } from 'node:crypto'

export const ADMIN_PLUGIN = 'PluginDexAdminPlugin' as const
const WINDOW_ROUNDS = 1000n

type GrantState = 'absent' | 'narrow'
/** `proposed`: the app waits for the DAO wallet's acceptance. `accepted`: the DAO wallet is its admin. */
export type HandoverStatus = 'proposed' | 'accepted'

export type AcceptAdminOptions = {
  /** directory of the deploy-immutable receipts, one `<Contract>.json` per contract of the stack */
  receiptsDir: string
  /** Keep the `acceptAdminOf` grant installed after the call. */
  keepGrant?: boolean
  /** Sender of the proposals; must be the DAO creator. Defaults to `ctx.sender`. */
  effectiveSender?: string
  log?: (line: string) => void
}

export type AcceptAdminPlan = {
  adminPluginId: bigint
  daoWallet: string
  daoCreator: string
  daoState: bigint
  apps: { name: DexContract; appId: bigint; admin: string; status: HandoverStatus }[]
  grant: GrantState
  addGrant: boolean
  execute: boolean
  removeGrant: boolean
  settings: { fee: bigint; power: bigint; duration: bigint; participation: bigint; approval: bigint }
}

export type AcceptAdminResult = AcceptAdminPlan & { proposalIds: bigint[] }

const hex = (bytes: Uint8Array) => Buffer.from(bytes).toString('hex')
const sha256 = (bytes: Uint8Array) => createHash('sha256').update(bytes).digest('hex')

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

const adminPlugin = (ctx: ScriptContext, appId: bigint, sender: string) =>
  new PluginDexAdminPluginSDK({ algorand: ctx.algorand, factoryParams: { appId, defaultSender: sender, defaultSigner: ctx.signer } })

/** Admin and pending admin of every app of the stack that has an admin, in handover order */
async function readHandover(ctx: ScriptContext, stack: DexStack) {
  const client = dexClients(ctx, stack)
  return Promise.all(handoverApps(client).map(async (name) => {
    const state = await client(name).state.global.getAll()
    return { name, appId: stack[name], admin: state.admin as string, pendingAdmin: state.pendingAdmin as string | undefined }
  }))
}

/** Read-only checks; throws on every refusal. */
export async function planAcceptAdmin(ctx: ScriptContext, options: AcceptAdminOptions): Promise<AcceptAdminPlan> {
  const { keepGrant = false } = options
  const effectiveSender = options.effectiveSender ?? ctx.sender

  // one finished stack on this network: every live program matches its receipt, and every dependency
  // stored on chain (the admin plugin's five apps included) names the app in its dependency's receipt
  const stack = await loadDexStack(ctx, options.receiptsDir)
  const adminPluginId = stack[ADMIN_PLUGIN]
  const live = (await ctx.algorand.client.algod.getApplicationByID(adminPluginId).do()).params
  if (!live || sha256(live.approvalProgram) !== approvalHashOf(ADMIN_PLUGIN)) {
    throw new Error(`${ADMIN_PLUGIN} ${adminPluginId} does not run the tree artifact; deploy it from this build (deploy:immutable --contract ${ADMIN_PLUGIN})`)
  }

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
  if (adminPluginId === pal?.update) throw new Error(`${adminPluginId} is the DAO's Update plugin`)

  const daoWallet = await daoWalletAddress(ctx)
  const handover = await readHandover(ctx, stack)
  // the plugin reaches exactly the apps it was created for; an app with an admin outside that set could
  // be proposed to the DAO wallet but never accepted
  const reachable = new Set(Object.values(immutableCatalog[ADMIN_PLUGIN].dependencies ?? {}))
  const unreachable = handover.filter(({ name }) => !reachable.has(name)).map(({ name }) => name)
  if (unreachable.length) throw new Error(`${ADMIN_PLUGIN} is not pinned to ${unreachable.join(', ')}; it cannot accept that admin role`)

  const apps = handover.map(({ name, appId, admin, pendingAdmin }) => {
    if (admin === daoWallet) return { name, appId, admin, status: 'accepted' as const }
    if (pendingAdmin === daoWallet) return { name, appId, admin, status: 'proposed' as const }
    throw new Error(`${name} ${appId} has not proposed the DAO wallet ${daoWallet} (admin ${admin}, pending ${pendingAdmin ?? 'none'}); ` +
      'run activate:plugin-dex first (nothing was sent)')
  })

  const selector = adminPlugin(ctx, adminPluginId, effectiveSender).acceptAdminOf()('').selectors[0]
  const info = await readGrant(ctx, adminPluginId)
  let grant: GrantState = 'absent'
  if (info) {
    const narrow = info.useExecutionKey && !info.admin && !info.canReclaim && !info.coverFees && info.methods.length === 1 &&
      hex(info.methods[0][0]) === hex(selector) && await daoSettingsExist(ctx, adminPluginId)
    if (!narrow) {
      throw new Error(`The DAO wallet already holds a global ${ADMIN_PLUGIN} ${adminPluginId} grant that is not the ` +
        'narrow acceptAdminOf execution-key grant; refusing to reuse or remove it')
    }
    grant = 'narrow'
  }

  const execute = apps.some((app) => app.status === 'proposed')
  return {
    adminPluginId, daoWallet, daoCreator, daoState: BigInt(daoState ?? 0n), apps, grant, settings,
    addGrant: execute && grant === 'absent',
    execute,
    removeGrant: !keepGrant && (grant === 'narrow' || execute),
  }
}

export function describePlan(plan: AcceptAdminPlan): string[] {
  return [
    `${ADMIN_PLUGIN} ${plan.adminPluginId} runs the tree artifact and is pinned to this stack`,
    `DAO state ${plan.daoState}; creator ${plan.daoCreator}; DAO wallet ${plan.daoWallet}`,
    ...plan.apps.map((app) => app.status === 'accepted'
      ? `${app.name} ${app.appId}: the DAO wallet is already the admin`
      : `${app.name} ${app.appId}: admin ${app.admin}, DAO wallet proposed -> acceptAdminOf`),
    `Existing narrow grant: ${plan.grant === 'narrow' ? 'yes (reused)' : 'no'}`,
    `Proposals: ${[plan.addGrant && 'AddPlugin', plan.execute && 'ExecutePlugin', plan.removeGrant && 'RemovePlugin'].filter(Boolean).join(' -> ') || 'none'}`,
    `Grant policy: global caller, execution key, methods [acceptAdminOf], settings fee=${plan.settings.fee} ` +
      `power=${plan.settings.power} duration=${plan.settings.duration} participation=${plan.settings.participation} approval=${plan.settings.approval}`,
  ]
}

function addGrantAction(plan: AcceptAdminPlan, client: PluginDexAdminPluginSDK): ProposalAction<SDKClient> {
  return {
    type: ProposalActionEnum.AddPlugin,
    client,
    callerType: CallerType.Global,
    escrow: '',
    methods: [{ name: client.acceptAdminOf(), cooldown: 0n }],
    useRounds: true,
    coverFees: false,
    sourceLink: DEFAULT_SOURCE_LINK,
    useExecutionKey: true,
    ...plan.settings,
  } as ProposalAction<SDKClient>
}

/** Cost of the AddPlugin proposal (simulated; signs nothing). */
export async function addGrantCost(ctx: ScriptContext, plan: AcceptAdminPlan, sender: string) {
  return await ctx.dao.proposalCost({ sender, signer: ctx.signer, actions: [addGrantAction(plan, adminPlugin(ctx, plan.adminPluginId, sender))] })
}

export async function runAcceptAdmin(ctx: ScriptContext, options: AcceptAdminOptions): Promise<AcceptAdminResult> {
  const log = options.log ?? ((line: string) => console.log(line))
  const plan = await planAcceptAdmin(ctx, options)
  for (const line of describePlan(plan)) log(`  ${line}`)
  const proposalIds: bigint[] = []
  const client = adminPlugin(ctx, plan.adminPluginId, ctx.sender)
  const wallet = await ctx.dao.getWallet()
  const walletAddress = wallet.client.appAddress.toString()

  if (plan.execute) {
    // The wallet holds the grant and execution boxes; usePlugin simulates as the wallet admin.
    const mbr = await wallet.getMbr({ escrow: '', methodCount: 1n, plugin: '', groups: 1n })
    const walletFunding = await getAppFundingNeeded(ctx.algorand, walletAddress, mbr.plugins + mbr.executions + 1_000_000n, 0n)
    if (walletFunding > 0n) await ctx.algorand.send.payment({ sender: ctx.sender, signer: ctx.signer, receiver: walletAddress, amount: microAlgo(walletFunding) })
    const admin = await wallet.client.state.global.admin()
    if (!admin) throw new Error('DAO wallet admin is missing')
    const adminFunding = await getAppFundingNeeded(ctx.algorand, admin, 1_000_000n, 0n)
    if (adminFunding > 0n) await ctx.algorand.send.payment({ sender: ctx.sender, signer: ctx.signer, receiver: admin, amount: microAlgo(adminFunding) })

    if (plan.addGrant) {
      proposalIds.push(await proposeAndExecute(ctx.algorand, ctx.dao, [addGrantAction(plan, client)]))
      log(`  AddPlugin proposal ${proposalIds.at(-1)} executed`)
    }

    // one window: an acceptAdminOf per proposed app, and only the last hands the wallet back
    const proposed = plan.apps.filter((app) => app.status === 'proposed')
    const execution = await wallet.build.usePlugin({
      sender: ctx.sender,
      signer: ctx.signer,
      lease: `dex_adm_${Date.now() % 1_000_000}`,
      windowSize: WINDOW_ROUNDS,
      callerType: CallerType.Global,
      calls: proposed.map((app, i) => client.acceptAdminOf({ sender: ctx.sender, signer: ctx.signer, app: app.appId, rekeyBack: i === proposed.length - 1 })),
    })
    proposalIds.push(await proposeAndExecute(ctx.algorand, ctx.dao, [{
      type: ProposalActionEnum.ExecutePlugin,
      plugin: plan.adminPluginId,
      caller: ALGORAND_ZERO_ADDRESS_STRING,
      escrow: '',
      executionKey: execution.lease,
      groups: execution.ids,
      firstValid: execution.firstValid,
      lastValid: execution.lastValid,
    }]))
    log(`  ExecutePlugin proposal ${proposalIds.at(-1)} executed (lease ${hex(execution.lease)})`)
    await execution.send()

    const tracked = (await ctx.dao.getBootstrapKeys()).some((lease) => hex(lease) === hex(execution.lease))
    if (tracked) {
      await ctx.dao.clearBootstrapKeys({ leases: [execution.lease] })
      log('  Cleared the used bootstrap key')
    }
  }

  const stack = await loadDexStack(ctx, options.receiptsDir)
  for (const app of await readHandover(ctx, stack)) {
    if (app.admin !== plan.daoWallet || app.pendingAdmin !== undefined) {
      throw new Error(`${app.name} ${app.appId}: admin is ${app.admin} (pending ${app.pendingAdmin ?? 'none'}), expected the DAO wallet ${plan.daoWallet}`)
    }
    log(`  Verified: ${app.name} ${app.appId} admin = DAO wallet`)
  }

  if (plan.removeGrant) {
    proposalIds.push(await proposeAndExecute(ctx.algorand, ctx.dao, [{
      type: ProposalActionEnum.RemovePlugin, plugin: plan.adminPluginId, caller: ALGORAND_ZERO_ADDRESS_STRING, escrow: '',
    }]))
    if (await readGrant(ctx, plan.adminPluginId) || await daoSettingsExist(ctx, plan.adminPluginId)) {
      throw new Error(`${ADMIN_PLUGIN} ${plan.adminPluginId} grant or its DAO settings survived RemovePlugin`)
    }
    log(`  RemovePlugin proposal ${proposalIds.at(-1)} executed; grant removed`)
  } else if (await readGrant(ctx, plan.adminPluginId)) {
    log('  Grant kept (--keep-grant)')
  }

  return { ...plan, proposalIds }
}

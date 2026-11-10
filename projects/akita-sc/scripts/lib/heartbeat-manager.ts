/**
 * Set Staking's heartbeat manager from the DAO wallet (rollout step D1 follow-up, gap HB).
 *
 * Staking accepts `setHeartbeatManager` only from the DAO wallet, so the call goes through the
 * StakingPlugin wrapper. Before DAO `initialize()` (creator-approved proposals, executed at once):
 *   1. AddPlugin: a StakingPlugin grant on the DAO wallet, global caller + execution key, restricted to
 *      `setHeartbeatManager`. Only a global execution-key grant gets DAO ExecutePlugin settings, and an
 *      execution key means every use needs its own proposal. The settings are the DAO's live
 *      upgrade-class settings, so after launch each use needs an upgrade-class vote.
 *   2. ExecutePlugin: registers the one group that calls `setHeartbeatManager(manager)`; the group is sent.
 *   3. The stored manager is read back from Staking. The used bootstrap key is cleared, so it does not
 *      block `initialize()`.
 *   4. RemovePlugin (unless `keepGrant`): the grant and its DAO settings box are removed.
 *
 * Refuses unless the live Staking (`aal.staking`) routes `setHeartbeatManager(address)void` (step D1)
 * and the StakingPlugin app runs the tree artifact and points at this DAO. An existing grant at the same
 * key is reused only if it has exactly this narrow shape; any other grant there is refused.
 */
import { microAlgo } from '@algorandfoundation/algokit-utils'
import algosdk, { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import type { SDKClient } from 'akita-sdk'
import { ProposalAction, ProposalActionEnum } from 'akita-sdk/dao'
import { CallerType, type StakingPluginSDK } from 'akita-sdk/wallet'
import type { ScriptContext } from '../script-base'
import { getAppFundingNeeded, proposeAndExecute } from '../utils'
import { createPluginClient, DAO_STATE_FULLY_INITIALIZED, DEFAULT_SOURCE_LINK } from './dao-wallet-plugin-migration'
import { abiSignatures, loadArtifact } from './ctx-sub-gates'
import { loadCompiled } from './principal-rollout'
import { readLiveApp } from './principal-rollout-run'

export const STAKING_PLUGIN_ARTIFACT = 'arc58/plugins/staking/StakingPlugin.arc56.json'
const STAKING_ARTIFACT = 'staking/Staking.arc56.json'
const MANAGER_KEY = 'heartbeat_manager_address'
const WINDOW_ROUNDS = 1000n

type GrantState = 'absent' | 'narrow'

export type HeartbeatManagerOptions = {
  manager: string
  stakingPluginId: bigint
  /** Keep the grant installed after the call (for later manager changes). */
  keepGrant?: boolean
  /** Sender of the proposals; must be the DAO creator. Defaults to `ctx.sender`. */
  effectiveSender?: string
  log?: (line: string) => void
}

export type HeartbeatManagerPlan = {
  stakingAppId: bigint
  stakingPluginId: bigint
  daoCreator: string
  daoState: bigint
  currentManager?: string
  manager: string
  grant: GrantState
  addGrant: boolean
  execute: boolean
  removeGrant: boolean
  settings: { fee: bigint; power: bigint; duration: bigint; participation: bigint; approval: bigint }
}

export type HeartbeatManagerResult = HeartbeatManagerPlan & { proposalIds: bigint[]; storedManager?: string }

const hex = (bytes: Uint8Array) => Buffer.from(bytes).toString('hex')

/** ARC-4 selector of `name` in a compiled ARC-56 artifact. */
function artifactSelector(artifact: string, name: string): Uint8Array {
  const method = loadArtifact(artifact).methods.find((m) => m.name === name)
  if (!method) throw new Error(`${artifact} has no method ${name}`)
  return algosdk.ABIMethod.fromSignature(abiSignatures({ methods: [method] })[0]).getSelector()
}

const OP_PUSHBYTESS = 0x82
const TXNA_APPLICATION_ARGS_0 = [0x36, 0x1a, 0x00]
const OP_MATCH = 0x8e

function readVarUint(program: Uint8Array, at: number): [value: number, next: number] | undefined {
  let value = 0
  for (let shift = 0, i = at; i < program.length && shift < 35; shift += 7, i++) {
    value += (program[i] & 0x7f) * 2 ** shift
    if ((program[i] & 0x80) === 0) return [value, i + 1]
  }
  return undefined
}

/**
 * Selectors the Puya ARC-4 router matches: `pushbytess s1..sn; txna ApplicationArgs 0; match`. A program
 * that only calls a method holds its selector in `pushbytes`/`bytecblock`, so it is not counted here.
 */
export function routedSelectors(program: Uint8Array): Set<string> {
  const routes = new Set<string>()
  for (let p = 0; p < program.length; p++) {
    if (program[p] !== OP_PUSHBYTESS) continue
    const count = readVarUint(program, p + 1)
    if (!count || count[0] === 0 || count[0] > 255) continue
    const items: string[] = []
    let at = count[1]
    for (let k = 0; k < count[0] && at !== -1; k++) {
      const length = readVarUint(program, at)
      if (!length || length[1] + length[0] > program.length) at = -1
      else { items.push(hex(program.subarray(length[1], length[1] + length[0]))); at = length[1] + length[0] }
    }
    if (at === -1) continue
    const tail = program.subarray(at, at + 4)
    if (tail.length === 4 && TXNA_APPLICATION_ARGS_0.every((b, i) => tail[i] === b) && tail[3] === OP_MATCH) {
      for (const item of items) if (item.length === 8) routes.add(item)
    }
  }
  return routes
}

/** Throws unless the router of `program` matches Staking's `setHeartbeatManager(address)void` selector. */
export function assertRoutesSetHeartbeatManager(program: Uint8Array, stakingAppId: bigint): void {
  const selector = artifactSelector(STAKING_ARTIFACT, 'setHeartbeatManager')
  if (!routedSelectors(program).has(hex(selector))) {
    throw new Error(`Staking ${stakingAppId} does not route setHeartbeatManager (selector ${hex(selector)}); run rollout step D1 (update:staking) first`)
  }
}

export async function readHeartbeatManager(ctx: Pick<ScriptContext, 'algorand'>, stakingAppId: bigint): Promise<string | undefined> {
  const app = await ctx.algorand.client.algod.getApplicationByID(stakingAppId).do()
  const entry = (app.params?.globalState ?? []).find((kv) => Buffer.from(kv.key).toString() === MANAGER_KEY)
  return entry ? algosdk.encodeAddress(entry.value.bytes) : undefined
}

function globalUint(app: algosdk.modelsv2.Application, key: string): bigint | undefined {
  return (app.params?.globalState ?? []).find((kv) => Buffer.from(kv.key).toString() === key)?.value.uint
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

function stakingPlugin(ctx: ScriptContext, appId: bigint, sender: string): StakingPluginSDK {
  return createPluginClient('stakingPlugin', ctx, appId, sender) as unknown as StakingPluginSDK
}

/** Read-only checks; throws on every refusal. */
export async function planHeartbeatManager(ctx: ScriptContext, options: HeartbeatManagerOptions): Promise<HeartbeatManagerPlan> {
  const { manager, stakingPluginId, keepGrant = false } = options
  if (!algosdk.isValidAddress(manager) || manager === ALGORAND_ZERO_ADDRESS_STRING) {
    throw new Error(`--manager must be a non-zero Algorand address (got ${manager})`)
  }
  const effectiveSender = options.effectiveSender ?? ctx.sender

  const g = ctx.dao.client.state.global
  const [aal, pal, daoState, settings, daoApp] = await Promise.all([
    g.akitaAppList(), g.pluginAppList(), g.state(), g.upgradeAppProposalSettings(),
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

  const stakingAppId = aal?.staking ?? 0n
  if (stakingAppId === 0n) throw new Error('The DAO akitaAppList has no staking app')
  if (ctx.appIds.staking && ctx.appIds.staking !== stakingAppId) {
    throw new Error(`DAO aal.staking is ${stakingAppId}, but the SDK names Staking ${ctx.appIds.staking}`)
  }
  assertRoutesSetHeartbeatManager((await readLiveApp(ctx, stakingAppId)).approval, stakingAppId)

  if (stakingPluginId === pal?.update) throw new Error(`${stakingPluginId} is the DAO's Update plugin`)
  const pluginApp = await ctx.algorand.client.algod.getApplicationByID(stakingPluginId).do()
    .catch(() => { throw new Error(`StakingPlugin ${stakingPluginId} does not exist`) })
  if (!Buffer.from(pluginApp.params!.approvalProgram).equals(Buffer.from(loadCompiled(STAKING_PLUGIN_ARTIFACT).approval))) {
    throw new Error(`StakingPlugin ${stakingPluginId} does not run the tree ${STAKING_PLUGIN_ARTIFACT}; deploy it first (rollout step G2)`)
  }
  const pluginDao = globalUint(pluginApp, 'akita_dao')
  if (pluginDao !== ctx.dao.appId) throw new Error(`StakingPlugin ${stakingPluginId} points at DAO ${pluginDao}, not ${ctx.dao.appId}`)

  const selector = stakingPlugin(ctx, stakingPluginId, effectiveSender).setHeartbeatManager()().selectors[0]
  const info = await readGrant(ctx, stakingPluginId)
  let grant: GrantState = 'absent'
  if (info) {
    const narrow = info.useExecutionKey && !info.admin && !info.canReclaim && !info.coverFees && info.methods.length === 1 &&
      hex(info.methods[0][0]) === hex(selector) && await daoSettingsExist(ctx, stakingPluginId)
    if (!narrow) {
      throw new Error(`The DAO wallet already holds a global StakingPlugin ${stakingPluginId} grant that is not the ` +
        'narrow setHeartbeatManager execution-key grant; refusing to reuse or remove it')
    }
    grant = 'narrow'
  }

  const currentManager = await readHeartbeatManager(ctx, stakingAppId)
  const execute = currentManager !== manager
  return {
    stakingAppId, stakingPluginId, daoCreator, daoState: BigInt(daoState ?? 0n), currentManager, manager, grant, settings,
    addGrant: execute && grant === 'absent',
    execute,
    removeGrant: !keepGrant && (grant === 'narrow' || execute),
  }
}

export function describePlan(plan: HeartbeatManagerPlan): string[] {
  return [
    `Staking ${plan.stakingAppId} (aal.staking) routes setHeartbeatManager`,
    `StakingPlugin ${plan.stakingPluginId} runs the tree artifact`,
    `DAO state ${plan.daoState}; creator ${plan.daoCreator}`,
    `Heartbeat manager: ${plan.currentManager ?? '(unset)'} -> ${plan.manager}${plan.execute ? '' : ' (already set)'}`,
    `Existing narrow grant: ${plan.grant === 'narrow' ? 'yes (reused)' : 'no'}`,
    `Proposals: ${[plan.addGrant && 'AddPlugin', plan.execute && 'ExecutePlugin', plan.removeGrant && 'RemovePlugin'].filter(Boolean).join(' -> ') || 'none'}`,
    `Grant policy: global caller, execution key, methods [setHeartbeatManager], settings fee=${plan.settings.fee} ` +
      `power=${plan.settings.power} duration=${plan.settings.duration} participation=${plan.settings.participation} approval=${plan.settings.approval}`,
  ]
}

function addGrantAction(plan: HeartbeatManagerPlan, client: StakingPluginSDK): ProposalAction<SDKClient> {
  return {
    type: ProposalActionEnum.AddPlugin,
    client,
    callerType: CallerType.Global,
    escrow: '',
    methods: [{ name: client.setHeartbeatManager(), cooldown: 0n }],
    useRounds: true,
    coverFees: false,
    sourceLink: DEFAULT_SOURCE_LINK,
    useExecutionKey: true,
    ...plan.settings,
  } as ProposalAction<SDKClient>
}

/** Cost of the AddPlugin proposal (simulated; signs nothing). */
export async function addGrantCost(ctx: ScriptContext, plan: HeartbeatManagerPlan, sender: string) {
  return await ctx.dao.proposalCost({ sender, signer: ctx.signer, actions: [addGrantAction(plan, stakingPlugin(ctx, plan.stakingPluginId, sender))] })
}

export async function runHeartbeatManager(ctx: ScriptContext, options: HeartbeatManagerOptions): Promise<HeartbeatManagerResult> {
  const log = options.log ?? ((line: string) => console.log(line))
  const plan = await planHeartbeatManager(ctx, options)
  for (const line of describePlan(plan)) log(`  ${line}`)
  const proposalIds: bigint[] = []
  const client = stakingPlugin(ctx, plan.stakingPluginId, ctx.sender)
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

    const execution = await wallet.build.usePlugin({
      sender: ctx.sender,
      signer: ctx.signer,
      lease: `hb_mgr_${Date.now() % 1_000_000}`,
      windowSize: WINDOW_ROUNDS,
      callerType: CallerType.Global,
      calls: [client.setHeartbeatManager({ sender: ctx.sender, signer: ctx.signer, manager: plan.manager })],
    })
    proposalIds.push(await proposeAndExecute(ctx.algorand, ctx.dao, [{
      type: ProposalActionEnum.ExecutePlugin,
      plugin: plan.stakingPluginId,
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

  const storedManager = await readHeartbeatManager(ctx, plan.stakingAppId)
  if (storedManager !== plan.manager) throw new Error(`Staking ${plan.stakingAppId} heartbeat manager is ${storedManager}, expected ${plan.manager}`)
  log(`  Verified: Staking ${plan.stakingAppId} heartbeat manager = ${storedManager}`)

  if (plan.removeGrant) {
    proposalIds.push(await proposeAndExecute(ctx.algorand, ctx.dao, [{
      type: ProposalActionEnum.RemovePlugin, plugin: plan.stakingPluginId, caller: ALGORAND_ZERO_ADDRESS_STRING, escrow: '',
    }]))
    if (await readGrant(ctx, plan.stakingPluginId) || await daoSettingsExist(ctx, plan.stakingPluginId)) {
      throw new Error(`StakingPlugin ${plan.stakingPluginId} grant or its DAO settings survived RemovePlugin`)
    }
    log(`  RemovePlugin proposal ${proposalIds.at(-1)} executed; grant removed`)
  } else if (await readGrant(ctx, plan.stakingPluginId)) {
    log('  Grant kept (--keep-grant)')
  }

  return { ...plan, proposalIds, storedManager }
}

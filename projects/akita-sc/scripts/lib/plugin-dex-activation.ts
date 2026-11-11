import fs from 'node:fs'
import path from 'node:path'
import { createHash } from 'node:crypto'
import algosdk from 'algosdk'
import { microAlgo } from '@algorandfoundation/algokit-utils'
import { AppClient } from '@algorandfoundation/algokit-utils/types/app-client'
import { type ScriptContext } from '../script-base'
import { approvalHashOf, immutableCatalog, pluginDexDeployOrder, postDeploySteps } from './immutable-deployment'

export type DexContract = typeof pluginDexDeployOrder[number]
/** App ID of every PluginDex v2 contract, read from its deployment receipt */
export type DexStack = Record<DexContract, bigint>

/** LaunchManager policy for future launches. The hook and Rewards app IDs come from the chain, not from here. */
export type ActivationPolicy = {
  launchFee: bigint
  bounty: bigint
  treasury: string
  /** µALGO a launch sends GatedFeeHook for its schedule box when the launch sets none */
  gatedFunding: bigint
  devBuy: { maxBps: bigint; minVestSeconds: bigint; maxVestSeconds: bigint }
}

/**
 * One activation call. It is skipped when `isDone` already holds on chain and verified with
 * `isDone` after it is sent, so a rerun converges instead of repeating calls.
 */
type Step = {
  label: string
  app: DexContract
  method: string
  args: unknown[]
  /** sent by the target app's admin; false = permissionless */
  admin: boolean
  /**
   * The only account that can send this call, when that is neither the app's admin nor anyone:
   * `acceptAdmin` must come from the proposed admin itself. The script sends it only if that is the
   * sender; otherwise it reports the call as awaiting that account.
   */
  onlyFrom?: string
  isDone: () => Promise<boolean>
  requires?: () => Promise<void>
  /** µALGO the target app must hold above its minimum balance before the call (box MBR) */
  fund?: bigint
}

/**
 * `awaiting`: the call is not this sender's to make (the proposed admin's `acceptAdmin`). It is left
 * for `signer` and is not an error.
 */
export type StepReport = { label: string; status: 'done' | 'sent' | 'pending' | 'awaiting'; signer?: string }

/** Matches LaunchManager's MaxDevBuyBps, checked here so a bad policy fails before any write */
const MaxDevBuyBps = 1_000n
/** Approval box: 1-byte prefix + uint64 key, 16-byte value → 2,500 + 400 × 25 µALGO */
const ApprovalBoxMbr = 12_500n
const sendParams = { populateAppCallResources: true, coverAppCallInnerTransactionFees: true, maxFee: microAlgo(100_000) }

const sha256 = (bytes: Uint8Array) => createHash('sha256').update(bytes).digest('hex')
const json = (value: unknown) => JSON.stringify(value, (_, v) => typeof v === 'bigint' ? v.toString() : v)

export function parseActivationPolicy(raw: any): ActivationPolicy {
  const uint = (key: string, value: unknown) => {
    if (!/^(0|[1-9][0-9]*)$/.test(String(value))) throw new Error(`policy.${key} must be a non-negative integer (large values as strings)`)
    return BigInt(String(value))
  }
  if (typeof raw?.treasury !== 'string' || !algosdk.isValidAddress(raw.treasury)) throw new Error('policy.treasury must be an Algorand address')
  const policy: ActivationPolicy = {
    launchFee: uint('launchFee', raw.launchFee), bounty: uint('bounty', raw.bounty), treasury: raw.treasury,
    gatedFunding: uint('gatedFunding', raw.gatedFunding),
    devBuy: { maxBps: uint('devBuy.maxBps', raw.devBuy?.maxBps), minVestSeconds: uint('devBuy.minVestSeconds', raw.devBuy?.minVestSeconds),
      maxVestSeconds: uint('devBuy.maxVestSeconds', raw.devBuy?.maxVestSeconds) },
  }
  if (policy.devBuy.maxBps > MaxDevBuyBps) throw new Error(`policy.devBuy.maxBps must be at most ${MaxDevBuyBps}`)
  if (policy.devBuy.minVestSeconds > policy.devBuy.maxVestSeconds) throw new Error('policy.devBuy.minVestSeconds must not exceed maxVestSeconds')
  return policy
}

const artifactSpec = (name: DexContract) =>
  fs.readFileSync(path.resolve(__dirname, '../../smart_contracts/artifacts', immutableCatalog[name].artifact), 'utf8')

export function dexClients(ctx: ScriptContext, stack: DexStack) {
  const clients = new Map<DexContract, AppClient>()
  return (name: DexContract) => {
    if (!clients.has(name)) clients.set(name, new AppClient({ appId: stack[name], appSpec: artifactSpec(name), algorand: ctx.algorand,
      defaultSender: ctx.sender, defaultSigner: ctx.signer }))
    return clients.get(name)!
  }
}

/**
 * The contracts of the stack that have an admin (a `proposeAdmin` method), in deploy order. The admin
 * plugin is not one of them: its handover methods are named `proposeAdminOf` / `acceptAdminOf`.
 */
export const handoverApps = (client: ReturnType<typeof dexClients>) =>
  pluginDexDeployOrder.filter(name => client(name).appSpec.methods.some(m => m.name === 'proposeAdmin'))

/**
 * Reads `<dir>/<Contract>.json` for every contract in `pluginDexDeployOrder`. Each receipt must belong to this network and a
 * finished deployment whose live programs match it, and each dependency arg stored on chain must name
 * the app in its dependency's receipt, so receipts from two different stacks cannot be mixed.
 */
export async function loadDexStack(ctx: ScriptContext, dir: string): Promise<DexStack> {
  const genesisHash = Buffer.from((await ctx.algorand.getSuggestedParams()).genesisHash!).toString('base64')
  const stack = {} as DexStack
  for (const name of pluginDexDeployOrder) {
    const file = path.join(dir, `${name}.json`)
    if (!fs.existsSync(file)) throw new Error(`Missing ${name} receipt ${file}: deploy the whole stack first (deploy-immutable --contract ${name} --manifest ${file})`)
    const receipt = JSON.parse(fs.readFileSync(file, 'utf8'))
    if (receipt.contract !== name || receipt.network !== ctx.options.network || receipt.genesisHash !== genesisHash) {
      throw new Error(`${file} is not a ${name} receipt for ${ctx.options.network}`)
    }
    if (!receipt.appId || !['funded', 'registered'].includes(receipt.status)) {
      throw new Error(`${file}: deployment unfinished (status ${receipt.status}); rerun deploy-immutable with this manifest`)
    }
    const live = (await ctx.algorand.client.algod.getApplicationByID(BigInt(receipt.appId)).do()).params
    if (!live || sha256(live.approvalProgram) !== receipt.approvalHash || sha256(live.clearStateProgram) !== receipt.clearHash) {
      throw new Error(`App ${receipt.appId} does not match its receipt ${file}`)
    }
    stack[name] = BigInt(receipt.appId)
  }
  const client = dexClients(ctx, stack)
  for (const name of pluginDexDeployOrder) {
    const dependencies = Object.entries(immutableCatalog[name].dependencies ?? {})
    if (!dependencies.length) continue
    const state = await client(name).state.global.getAll()
    for (const [arg, dep] of dependencies) {
      if (state[arg] !== stack[dep as DexContract]) throw new Error(`${name}.${arg} is ${state[arg]}, not the ${dep} receipt's app ${stack[dep as DexContract]}`)
    }
  }
  return stack
}

/** The DAO's live Rewards app; it must run the Rewards v2 artifact, since LaunchManager vests dev buys there. */
export async function rewardsV2(ctx: ScriptContext): Promise<bigint> {
  const rewards = (await ctx.dao.client.state.global.akitaAppList())!.rewards
  const program = (await ctx.algorand.client.algod.getApplicationByID(rewards).do()).params?.approvalProgram
  if (!program || sha256(program) !== approvalHashOf('Rewards')) {
    throw new Error(`DAO aal.rewards ${rewards} is not Rewards v2 (its program differs from the Rewards artifact); finish the Rewards v2 cutover first`)
  }
  return rewards
}

export async function daoWalletAddress(ctx: ScriptContext): Promise<string> {
  const wallet = await ctx.dao.client.state.global.wallet()
  if (!wallet) throw new Error('The DAO has no wallet')
  return algosdk.getApplicationAddress(wallet).toString()
}

/**
 * The activation calls in send order: the catalog's post-deploy approvals (curve, hooks),
 * LaunchManager policy, then the admin handover of every app that has an admin.
 *
 * The handover is two calls per app (readiness audit 2026-11-09, C10). `proposeAdmin(finalAdmin)` is
 * sent by the current admin and changes nothing yet. `acceptAdmin()` must be sent by `finalAdmin`
 * itself, which proves it can call the app before it becomes the only account that may. Until then
 * the deployer stays admin and can still correct the configuration. The handover comes last, so a
 * rerun finds all configuration done and only handover calls open.
 */
export function planActivation(ctx: ScriptContext, stack: DexStack, policy: ActivationPolicy,
  { finalAdmin, rewards }: { finalAdmin: string; rewards: bigint }): Step[] {
  const client = dexClients(ctx, stack)
  const globals = (name: DexContract) => client(name).state.global.getAll()
  const approval = async (map: 'approvedHooks' | 'approvedCurves', id: bigint) =>
    (await client('PluginDex').state.box.getMap(map)).get(id) as Record<string, bigint> | undefined

  const steps: Step[] = []
  for (const name of pluginDexDeployOrder) for (const step of postDeploySteps(name, stack[name])) {
    const app = step.app as DexContract
    const method = client(app).appSpec.methods.find(m => m.name === step.method)
    if (!method) throw new Error(`Catalog error: ${app} has no method ${step.method}`)
    const toAbi = (v: unknown): unknown => typeof v === 'number' ? BigInt(v) : Array.isArray(v) ? v.map(toAbi) : v
    const args = method.args.map(a => toAbi(step.args[a.name!]))
    const base = { label: `${app}.${step.method}(${name}: ${json(args.slice(1))})`, app, method: step.method, args, admin: true }
    if (step.method === 'setHookApproval') {
      const [hook, perms] = args as [bigint, bigint]
      steps.push({ ...base, fund: ApprovalBoxMbr, isDone: async () => (await approval('approvedHooks', hook))?.perms === perms,
        // A pool may install GatedFeeHook once it is approved; wallet users need the pass plugin by then.
        requires: name !== 'GatedFeeHook' ? undefined : async () => {
          if ((await globals('GatedFeePassPlugin')).hook !== hook) throw new Error('GatedFeePassPlugin must be pinned to GatedFeeHook before the hook is approved')
        } })
    } else if (step.method === 'setCurveApproval') {
      const [curve, lpMode, approved] = args as [bigint, bigint, boolean]
      if (!approved) throw new Error(`Catalog error: ${step.method} for ${name} revokes`)
      steps.push({ ...base, fund: ApprovalBoxMbr, isDone: async () => (await approval('approvedCurves', curve))?.lpMode === lpMode })
    } else {
      throw new Error(`No on-chain check for post-deploy step ${app}.${step.method}; teach plugin-dex-activation.ts before activating`)
    }
  }

  const launchManager = (method: string, args: unknown[], expected: Record<string, unknown>): Step => ({
    label: `LaunchManager.${method}(${json(expected)})`, app: 'LaunchManager', method, args, admin: true,
    isDone: async () => { const state = await globals('LaunchManager'); return Object.entries(expected).every(([k, v]) => state[k] === v) },
  })
  steps.push(launchManager('setFees', [policy.launchFee, policy.bounty, policy.treasury],
    { launchFee: policy.launchFee, bounty: policy.bounty, treasury: policy.treasury }))
  steps.push(launchManager('setHooks', [stack.AntiSnipeFeeHook, stack.LaunchTaxHook, stack.GatedFeeHook, policy.gatedFunding],
    { antiSnipeHook: stack.AntiSnipeFeeHook, launchTaxHook: stack.LaunchTaxHook, gatedHook: stack.GatedFeeHook, gatedFunding: policy.gatedFunding }))
  const { maxBps, minVestSeconds, maxVestSeconds } = policy.devBuy
  steps.push(launchManager('setDevBuy', [rewards, maxBps, minVestSeconds, maxVestSeconds],
    { rewards, devBuyMaxBps: maxBps, devVestMin: minVestSeconds, devVestMax: maxVestSeconds }))

  const handover = handoverApps(client)
  for (const name of handover) {
    steps.push({ label: `${name}.proposeAdmin(${finalAdmin})`, app: name, method: 'proposeAdmin', args: [finalAdmin], admin: true,
      isDone: async () => { const state = await globals(name); return state.admin === finalAdmin || state.pendingAdmin === finalAdmin } })
  }
  for (const name of handover) {
    steps.push({ label: `${name}.acceptAdmin()`, app: name, method: 'acceptAdmin', args: [], admin: false, onlyFrom: finalAdmin,
      isDone: async () => (await globals(name)).admin === finalAdmin })
  }
  return steps
}

/**
 * Sends every pending activation call as `ctx.sender`, which must be the admin of each app a pending
 * call targets. When that admin is already the DAO wallet, nothing is sent and the error lists the calls
 * a DAO proposal must make. A dry run reports the plan and sends nothing.
 *
 * The run ends with the handover proposed, not finished: each `acceptAdmin()` is reported as `awaiting`
 * the DAO wallet and printed with its app id, because only the DAO wallet can send it. The DAO wallet
 * accepts through PluginDexAdminPlugin (`accept-plugin-dex-admin`, scripts/lib/plugin-dex-admin-handover.ts).
 * Rerun after the DAO has accepted to confirm every admin.
 *
 * `overrides.finalAdmin` replaces the DAO wallet as the account the admin is handed to. It exists for
 * tests and LocalNet rehearsals, where a plain account can stand in and accept; the CLI never sets it.
 */
export async function activatePluginDex(ctx: ScriptContext, receiptsDir: string, policy: ActivationPolicy,
  overrides: { finalAdmin?: string } = {}): Promise<StepReport[]> {
  const stack = await loadDexStack(ctx, receiptsDir)
  const finalAdmin = overrides.finalAdmin ?? await daoWalletAddress(ctx)
  const steps = planActivation(ctx, stack, policy, { finalAdmin, rewards: await rewardsV2(ctx) })
  const client = dexClients(ctx, stack)

  const admins = new Map<DexContract, string>()
  const report: StepReport[] = []
  for (const step of steps) {
    if (await step.isDone()) { report.push({ label: step.label, status: 'done' }); continue }
    if (step.admin && !admins.has(step.app)) admins.set(step.app, (await client(step.app).state.global.getAll()).admin)
    // A call only another account can send is not this run's to make: it waits for that account.
    const awaiting = step.onlyFrom !== undefined && step.onlyFrom !== ctx.sender
    report.push({ label: step.label, status: awaiting ? 'awaiting' : 'pending',
      signer: step.onlyFrom ?? (step.admin ? admins.get(step.app) : ctx.sender) })
  }
  console.log(`PluginDex v2 activation on ${ctx.options.network}; final admin ${finalAdmin}${overrides.finalAdmin ? ' (override)' : ' (DAO wallet)'}`)
  for (const r of report) console.log(`  [${r.status}] ${r.label}${r.signer ? ` (signer ${r.signer})` : ''}`)
  const signatureOf = (s: Step) => { const m = client(s.app).appSpec.methods.find(m => m.name === s.method)!
    return `${m.name}(${m.args.map(a => a.type).join(',')})${m.returns.type}` }
  const printAwaiting = () => {
    const awaiting = steps.filter((_, i) => report[i].status === 'awaiting')
    if (!awaiting.length) return
    console.log(`\nThe admin handover is proposed, not finished. ${finalAdmin} must send these calls itself; until it does, the current admin stays in charge:`)
    for (const s of awaiting) console.log(`  ${json({ appId: stack[s.app], app: s.app, method: signatureOf(s), args: s.args, signer: s.onlyFrom })}`)
    if (!overrides.finalAdmin) console.log(`The DAO wallet sends them through PluginDexAdminPlugin: npm run accept:plugin-dex-admin -- -n ${ctx.options.network} --receipts ${receiptsDir}`)
  }
  const pending = steps.filter((_, i) => report[i].status === 'pending')
  if (ctx.options.dryRun || !pending.length) { printAwaiting(); return report }

  const foreign = pending.filter(s => s.admin && admins.get(s.app) !== ctx.sender)
  if (foreign.length) {
    const calls = foreign.map(s => ({ appId: stack[s.app], app: s.app, method: signatureOf(s), args: s.args, signer: admins.get(s.app) }))
    const toDao = foreign.every(s => admins.get(s.app) === finalAdmin)
    throw new Error(`${toDao ? 'The admin is already the DAO wallet; submit these calls through a DAO proposal' : 'Pending calls need an admin other than the sender'} (nothing was sent):\n${
      calls.map(c => `  ${json(c)}`).join('\n')}`)
  }

  for (const [i, step] of steps.entries()) {
    if (report[i].status !== 'pending') continue
    await step.requires?.()
    const target = client(step.app)
    if (step.fund) await ctx.algorand.account.ensureFunded(target.appAddress, ctx.sender, microAlgo(step.fund))
    await target.send.call({ method: step.method, args: step.args as any, ...sendParams })
    if (!(await step.isDone())) throw new Error(`${step.label} was sent but its on-chain state does not match`)
    report[i].status = 'sent'
    console.log(`  sent ${step.label}`)
  }
  printAwaiting()
  return report
}

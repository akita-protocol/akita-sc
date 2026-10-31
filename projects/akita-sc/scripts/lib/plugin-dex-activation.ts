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
  isDone: () => Promise<boolean>
  requires?: () => Promise<void>
  /** µALGO the target app must hold above its minimum balance before the call (box MBR) */
  fund?: bigint
  /** the first ABI arg is a payment of this many µALGO to the target app */
  payment?: bigint
}

export type StepReport = { label: string; status: 'done' | 'sent' | 'pending'; signer?: string }

/** Matches LaunchManager's MaxDevBuyBps, checked here so a bad policy fails before any write */
const MaxDevBuyBps = 1_000n
/** Approval box: 1-byte prefix + uint64 key, 16-byte value → 2,500 + 400 × 25 µALGO */
const ApprovalBoxMbr = 12_500n
/** AkitaRouterPlugin.init: the leg escrow's create and funding; the router refunds the excess */
const RouterInitPayment = 1_000_000n
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

function dexClients(ctx: ScriptContext, stack: DexStack) {
  const clients = new Map<DexContract, AppClient>()
  return (name: DexContract) => {
    if (!clients.has(name)) clients.set(name, new AppClient({ appId: stack[name], appSpec: artifactSpec(name), algorand: ctx.algorand,
      defaultSender: ctx.sender, defaultSigner: ctx.signer }))
    return clients.get(name)!
  }
}

/**
 * Reads `<dir>/<Contract>.json` for all 15 contracts. Each receipt must belong to this network and a
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
 * The activation calls in send order: the catalog's post-deploy approvals (curve, hooks, adapter),
 * router init, LaunchManager policy, then every admin handed to `finalAdmin`. Admin handoff comes last,
 * so a rerun after a partial handoff finds all configuration done and only handoffs pending.
 */
export function planActivation(ctx: ScriptContext, stack: DexStack, policy: ActivationPolicy,
  { finalAdmin, rewards }: { finalAdmin: string; rewards: bigint }): Step[] {
  const client = dexClients(ctx, stack)
  const globals = (name: DexContract) => client(name).state.global.getAll()
  const approval = async (map: 'approvedHooks' | 'approvedCurves', id: bigint) =>
    (await client('PluginDex').state.box.getMap(map)).get(id) as Record<string, bigint> | undefined
  const adapterEntry = async (adapter: bigint) => {
    const state = (await ctx.algorand.client.algod.getApplicationByID(stack.VenueRegistry).do()).params?.globalState ?? []
    const raw = state.find(kv => Buffer.from(kv.key).equals(algosdk.encodeUint64(adapter)))?.value.bytes
    return raw && algosdk.ABIType.from('(uint64,uint64,uint64,uint64)').decode(raw) as bigint[]
  }

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
    } else if (step.method === 'setAdapter') {
      const [adapter, info] = args as [bigint, bigint[]]
      steps.push({ ...base, isDone: async () => json(await adapterEntry(adapter)) === json(info) })
    } else {
      throw new Error(`No on-chain check for post-deploy step ${app}.${step.method}; teach plugin-dex-activation.ts before activating`)
    }
  }

  steps.push({ label: 'AkitaRouterPlugin.init (leg escrow)', app: 'AkitaRouterPlugin', method: 'init', args: [], admin: false,
    payment: RouterInitPayment, isDone: async () => (await globals('AkitaRouterPlugin')).legEscrow !== 0n })

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

  for (const name of pluginDexDeployOrder) {
    if (!client(name).appSpec.methods.some(m => m.name === 'setAdmin')) continue
    steps.push({ label: `${name}.setAdmin(${finalAdmin})`, app: name, method: 'setAdmin', args: [finalAdmin], admin: true,
      isDone: async () => (await globals(name)).admin === finalAdmin })
  }
  return steps
}

/**
 * Sends every pending activation call as `ctx.sender`, which must be the admin of each app a pending
 * call targets. When that admin is already the DAO wallet, nothing is sent and the error lists the calls
 * a DAO proposal must make. A dry run reports the plan and sends nothing.
 */
export async function activatePluginDex(ctx: ScriptContext, receiptsDir: string, policy: ActivationPolicy): Promise<StepReport[]> {
  const stack = await loadDexStack(ctx, receiptsDir)
  const finalAdmin = await daoWalletAddress(ctx)
  const steps = planActivation(ctx, stack, policy, { finalAdmin, rewards: await rewardsV2(ctx) })
  const client = dexClients(ctx, stack)

  const admins = new Map<DexContract, string>()
  const report: StepReport[] = []
  for (const step of steps) {
    if (await step.isDone()) { report.push({ label: step.label, status: 'done' }); continue }
    if (step.admin && !admins.has(step.app)) admins.set(step.app, (await client(step.app).state.global.getAll()).admin)
    report.push({ label: step.label, status: 'pending', signer: step.admin ? admins.get(step.app) : ctx.sender })
  }
  console.log(`PluginDex v2 activation on ${ctx.options.network}; final admin ${finalAdmin} (DAO wallet)`)
  for (const r of report) console.log(`  [${r.status}] ${r.label}${r.signer ? ` (signer ${r.signer})` : ''}`)
  const pending = steps.filter((_, i) => report[i].status === 'pending')
  if (ctx.options.dryRun || !pending.length) return report

  const foreign = pending.filter(s => s.admin && admins.get(s.app) !== ctx.sender)
  if (foreign.length) {
    const signature = (s: Step) => { const m = client(s.app).appSpec.methods.find(m => m.name === s.method)!
      return `${m.name}(${m.args.map(a => a.type).join(',')})${m.returns.type}` }
    const calls = foreign.map(s => ({ appId: stack[s.app], app: s.app, method: signature(s), args: s.args, signer: admins.get(s.app) }))
    const toDao = foreign.every(s => admins.get(s.app) === finalAdmin)
    throw new Error(`${toDao ? 'The admin is already the DAO wallet; submit these calls through a DAO proposal' : 'Pending calls need an admin other than the sender'} (nothing was sent):\n${
      calls.map(c => `  ${json(c)}`).join('\n')}`)
  }

  for (const [i, step] of steps.entries()) {
    if (report[i].status !== 'pending') continue
    await step.requires?.()
    const target = client(step.app)
    if (step.fund) await ctx.algorand.account.ensureFunded(target.appAddress, ctx.sender, microAlgo(step.fund))
    const args = step.payment === undefined ? step.args : [ctx.algorand.createTransaction.payment({ sender: ctx.sender, receiver: target.appAddress,
      amount: microAlgo(step.payment) }), ...step.args]
    await target.send.call({ method: step.method, args: args as any, ...sendParams })
    if (!(await step.isDone())) throw new Error(`${step.label} was sent but its on-chain state does not match`)
    report[i].status = 'sent'
    console.log(`  sent ${step.label}`)
  }
  return report
}

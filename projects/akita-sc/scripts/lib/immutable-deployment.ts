import fs from 'node:fs'
import path from 'node:path'
import { createHash } from 'node:crypto'
import algosdk from 'algosdk'
import { microAlgo } from '@algorandfoundation/algokit-utils'
import { AppFactory } from '@algorandfoundation/algokit-utils/types/app-factory'
import { PLUGIN_APP_ID_KEYS } from 'akita-sdk'
import { ProposalActionEnum } from 'akita-sdk/dao'
import catalog from './immutable-catalog.json'
import { type ScriptContext, recordNetworkAppDeployment, recordPluginDeployment } from '../script-base'
import { executeProposal, getAppFundingNeeded } from '../utils'
import { assertRewardsOptedIn } from './rewards-opt-ins'

export type ConstructorConfig = Record<string, string | string[] | number>
/** An admin call the deployed app needs before use. `$self` is replaced by the new app's ID. */
export type PostDeployStep = { app: string; method: string; args: Record<string, unknown>; note?: string }
export type CatalogEntry = {
  artifact: string; registryKey: string | null; plugin: boolean; daoField: string | null
  /** uint64 constructor args that must hold the app ID of an earlier catalog deployment */
  dependencies?: Record<string, string>
  /** catalog apps that must be deployed first although no constructor arg names them */
  after?: string[]
  /** uint64 constructor args that are plain numbers (0 allowed), not app IDs */
  params?: string[]
  /** constructor defaults for this contract, applied before the context defaults */
  defaults?: ConstructorConfig
  postDeploy?: PostDeployStep[]
  notes?: string[]
  /** constructor args that must equal these values for the deployment to become the SDK's `registryKey` */
  registerWhen?: Record<string, string>
  /** SDK key that keeps the replaced `registryKey` app on --register, when that key is still unset */
  retainPreviousAs?: string
}
export const immutableCatalog = catalog as unknown as Record<string, CatalogEntry>
export const immutableContracts = Object.keys(catalog)

/**
 * Deploy order for catalog contracts whose constructor takes the app ID of another catalog contract
 * (`dependencies`) or that must follow one (`after`). No catalog contract has either at present, so the
 * order is empty. Every dependency arg must name an app deployed earlier; `deployImmutable` checks on
 * chain that it runs the dependency's compiled program. Admin calls are not sent by this tooling (on
 * MainNet the admin is the DAO wallet); each deployment prints its `postDeploy` checklist instead.
 */
export const dependencyDeployOrder: readonly string[] = []

/** Throws when a dependency is unknown or not deployed before its dependent in `dependencyDeployOrder`. */
export function validateDeployOrder(order: readonly string[] = dependencyDeployOrder, entries = immutableCatalog) {
  order.forEach((name, i) => {
    const entry = entries[name]
    if (!entry) throw new Error(`Deploy order names unknown contract ${name}`)
    for (const dep of [...Object.values(entry.dependencies ?? {}), ...(entry.after ?? [])]) {
      if (!entries[dep]) throw new Error(`${name} depends on unknown contract ${dep}`)
      const at = order.indexOf(dep)
      if (at < 0 || at >= i) throw new Error(`${name} must be deployed after ${dep}`)
    }
  })
  for (const [name, entry] of Object.entries(entries)) {
    if ((entry.dependencies || entry.after) && !order.includes(name)) throw new Error(`${name} has dependencies but no deploy order`)
  }
}
validateDeployOrder()

/** Human-readable deploy order for --help and errors; empty when no contract depends on another. */
export function describeDeployOrder() {
  return dependencyDeployOrder.map((name, i) => {
    const deps = Object.entries(immutableCatalog[name].dependencies ?? {}).map(([arg, dep]) => `${arg}=${dep}`)
    const approvals = (immutableCatalog[name].postDeploy ?? []).map(s => `${s.app}.${s.method}(${
      Object.entries(s.args).map(([k, v]) => `${k}=${v === '$self' ? 'id' : JSON.stringify(v)}`).join(', ')})`)
    return `  ${String(i + 1).padStart(2)}. ${name}${deps.length ? ` (${deps.join(', ')})` : ''}${approvals.length ? ` → ${approvals.join(', ')}` : ''}`
  }).join('\n')
}
const json = (value: unknown) => JSON.stringify(value, (_, v) => typeof v === 'bigint' ? v.toString() : v, 2) + '\n'
const hash = (value: string | Uint8Array) => createHash('sha256').update(value).digest('hex')

/** Programs (approval + clear) above this many bytes need write budget and a higher fee to create. */
export const SmallProgramLimit = 8_192
/**
 * Creation parameters for apps whose programs exceed 8,192 B (AVM: each byte over needs write budget,
 * granted 2,048 B per empty box ref, and the creating txn's minimum fee rises with the excess). Small
 * programs return no overrides, so their creation is unchanged. Extra pages are computed from the
 * program length by AlgoKit. A large create pays a static fee, so it cannot cover inner transactions.
 */
export function largeProgramCreateParams(approval: Uint8Array, clear: Uint8Array) {
  const over = approval.length + clear.length - SmallProgramLimit
  if (over <= 0) return {}
  return {
    boxReferences: Array.from({ length: Math.ceil(over / 2_048) }, () => ({ appId: 0n, name: new Uint8Array() })),
    staticFee: microAlgo(1_000 * (1 + Math.ceil(over / 10_000))),
    coverAppCallInnerTransactionFees: false,
    maxFee: undefined,
  }
}

const artifactPath = (entry: CatalogEntry) => path.resolve(__dirname, '../../smart_contracts/artifacts', entry.artifact)

export function prepareImmutable(ctx: ScriptContext, name: string, config: ConstructorConfig = {}) {
  const entry = Object.hasOwn(immutableCatalog, name) ? immutableCatalog[name] : undefined
  if (!entry) throw new Error(`Unknown immutable contract ${name}. Choose: ${immutableContracts.join(', ')}`)
  const source = fs.readFileSync(artifactPath(entry), 'utf8')
  const factory = new AppFactory({ appSpec: source, algorand: ctx.algorand, defaultSender: ctx.sender, defaultSigner: ctx.signer })
  const spec = factory.appSpec
  if (spec.name !== name || !spec.byteCode?.approval || !spec.byteCode?.clear) throw new Error(`Missing or mismatched compiled artifact for ${name}`)
  if (spec.bareActions.call.includes('UpdateApplication') || spec.methods.some(m => m.actions.call.includes('UpdateApplication'))) throw new Error(`${name} is upgradeable; use its update route`)
  const method = spec.methods.find(m => m.actions.create.includes('NoOp'))
  const defaults: ConstructorConfig = { version: ctx.options.version, akitaDAO: ctx.appIds.dao.toString(), daoAppID: ctx.appIds.dao.toString(), admin: ctx.sender, ...entry.defaults }
  for (const key of [...Object.keys(entry.dependencies ?? {}), ...(entry.params ?? [])]) {
    if (method?.args.find(a => a.name === key)?.type !== 'uint64') throw new Error(`Catalog error: ${name}.${key} is not a uint64 constructor argument`)
  }
  for (const key of Object.keys(config)) {
    if (!method?.args.some(a => a.name === key)) throw new Error(`Unknown ${name} constructor argument: ${key}`)
    if (['version', 'akitaDAO', 'daoAppID'].includes(key) && String(config[key]) !== String(defaults[key])) {
      throw new Error(`${key} conflicts with the selected context; use --version or --dao-app-id`)
    }
  }
  const args = (method?.args ?? []).map(arg => {
    const value = config[arg.name!] ?? defaults[arg.name!]
    const dependency = entry.dependencies?.[arg.name!]
    if (value === undefined && dependency) {
      const order = describeDeployOrder()
      throw new Error(`${name} requires ${arg.name}: the app ID of ${dependency}. Deploy ${dependency} first${order ? `; order:\n${order}` : ''}`)
    }
    if (value === undefined) throw new Error(`${name} requires constructor config ${arg.name} (${arg.type})`)
    if (arg.type === 'uint64') {
      const plain = entry.params?.includes(arg.name!)
      if (plain) {
        if (!/^(0|[1-9][0-9]*)$/.test(String(value))) throw new Error(`${arg.name} must be a non-negative integer`)
        if (typeof value === 'number' && !Number.isSafeInteger(value)) throw new Error(`${arg.name}: encode large values as strings`)
        return BigInt(String(value))
      }
      const pattern = name === 'GuildPlugin' && arg.name === 'guild' ? /^(0|[1-9][0-9]*)$/ : /^[1-9][0-9]*$/
      if (!pattern.test(String(value))) throw new Error(`${arg.name} must be a positive integer app ID (GuildPlugin.guild also accepts 0)`)
      if (typeof value === 'number' && !Number.isSafeInteger(value)) throw new Error(`${arg.name}: encode large IDs as strings`)
      return BigInt(String(value))
    }
    return value
  })
  // Encode before any write so invalid values cannot leave a partial deployment.
  method?.args.forEach((arg, i) => algosdk.ABIType.from(arg.type).encode(args[i]))
  if (!method && !spec.bareActions.create.includes('NoOp')) throw new Error(`${name} has no supported create action`)
  const approval = Buffer.from(spec.byteCode!.approval!, 'base64')
  const clear = Buffer.from(spec.byteCode!.clear!, 'base64')
  // Match the existing balance-reader deployment test: its create writes an app ID,
  // while the artifact's explicit stateTotals incorrectly reserve no integer slot.
  const schema = name === 'AbstractedAccountBalanceReader'
    ? { globalInts: 1, globalByteSlices: 1, localInts: 0, localByteSlices: 0 } : undefined
  const dependencies = Object.entries(entry.dependencies ?? {}).map(([arg, contract]) => {
    const i = method!.args.findIndex(a => a.name === arg)
    return { arg, contract, appId: args[i] as bigint }
  })
  return { entry, factory, method, args, approval, clear, schema, dependencies, artifactHash: hash(source) }
}

/** SHA-256 of a catalog contract's compiled approval program. */
export function approvalHashOf(name: string) {
  const spec = JSON.parse(fs.readFileSync(artifactPath(immutableCatalog[name]), 'utf8'))
  if (!spec.byteCode?.approval) throw new Error(`Missing compiled artifact for ${name}`)
  return hash(Buffer.from(spec.byteCode.approval, 'base64'))
}

/**
 * Before any write: every dependency arg must be a live app running the dependency's compiled
 * approval program, so a mistyped or swapped ID (e.g. one plugin's ID passed for another) cannot be baked
 * into an immutable app. `allowMismatch` accepts a dependency deployed from another build.
 */
export async function verifyDependencies(ctx: ScriptContext, name: string, dependencies: { arg: string; contract: string; appId: bigint }[], allowMismatch = false) {
  for (const { arg, contract, appId } of dependencies) {
    let program: Uint8Array | undefined
    try {
      program = (await ctx.algorand.client.algod.getApplicationByID(appId).do()).params?.approvalProgram
    } catch { /* deleted or never created */ }
    if (!program) throw new Error(`${name}.${arg}: app ${appId} does not exist; deploy ${contract} first`)
    if (hash(program) === approvalHashOf(contract)) continue
    const message = `${name}.${arg}: app ${appId} is not ${contract} (its approval program differs from the ${contract} artifact)`
    if (!allowMismatch) throw new Error(`${message}. Pass --allow-dependency-mismatch only for a ${contract} deployed from another build`)
    console.warn(`WARNING: ${message}; continuing because of --allow-dependency-mismatch`)
  }
}

/** The post-deploy admin checklist with `$self` resolved to the new app ID. */
export function postDeploySteps(name: string, appId: bigint) {
  const resolve = (v: unknown): unknown => v === '$self' ? appId : Array.isArray(v) ? v.map(resolve) : v
  return (immutableCatalog[name]?.postDeploy ?? []).map(step => ({ ...step,
    args: Object.fromEntries(Object.entries(step.args).map(([k, v]) => [k, resolve(v)])) }))
}

type Receipt = {
  identity: string; network: string; genesisHash: string; sender: string; contract: string; version: string;
  dao: string; artifactHash: string; approvalHash: string; clearHash: string; args: unknown[];
  oldAppId?: string; appId?: string; txId?: string; status: 'creating' | 'deployed' | 'funded' | 'registered';
  registrationProposalId?: string;
  registrationStarted?: boolean;
}

export async function deployImmutable(ctx: ScriptContext, name: string, config: ConstructorConfig, receiptPath?: string, register = false,
  options: { allowDependencyMismatch?: boolean; allowMissingOptIns?: boolean } = {}) {
  const p = prepareImmutable(ctx, name, config)
  if (ctx.options.dryRun) {
    console.log(json({ contract: name, args: p.args, approvalBytes: p.approval.length, clearBytes: p.clear.length,
      schemaOverride: p.schema, registryKey: p.entry.registryKey, daoField: p.entry.daoField, register,
      dependencies: p.dependencies, postDeploy: p.entry.postDeploy ?? [], writes: false }))
    return undefined
  }
  if (!receiptPath) throw new Error('--manifest is required for a deployment receipt')
  const genesisHash = Buffer.from((await ctx.algorand.getSuggestedParams()).genesisHash!).toString('base64')
  const identity = hash(json({ genesisHash, sender: ctx.sender, name, version: ctx.options.version, args: p.args, schema: p.schema, artifactHash: p.artifactHash, dao: ctx.appIds.dao }))
  const exists = fs.existsSync(receiptPath)
  // The DAO is authoritative for service cutovers, including LocalNet where
  // there are no baked-in service IDs. Capture it before creating the replacement.
  const oldAppId = !exists && p.entry.daoField
    ? ((await ctx.dao.client.state.global.akitaAppList()) as unknown as Record<string, bigint>)[p.entry.daoField].toString()
    : p.entry.registryKey ? (ctx.appIds as unknown as Record<string, bigint>)[p.entry.registryKey]?.toString() : undefined
  let receipt: Receipt = { identity, network: ctx.options.network, genesisHash, sender: ctx.sender, contract: name,
    version: ctx.options.version, dao: ctx.appIds.dao.toString(), artifactHash: p.artifactHash,
    approvalHash: hash(p.approval), clearHash: hash(p.clear), args: p.args, oldAppId, status: 'creating' }
  const save = () => {
    fs.writeFileSync(`${receiptPath}.tmp`, json(receipt), { mode: 0o600 })
    fs.renameSync(`${receiptPath}.tmp`, receiptPath)
  }
  if (exists) {
    receipt = JSON.parse(fs.readFileSync(receiptPath, 'utf8')) as Receipt
    if (receipt.identity !== identity) throw new Error('Manifest does not match network, sender, DAO, constructor or artifact')
    if (!receipt.appId) throw new Error('Creation outcome is unresolved. Reconcile the creating receipt on chain before retrying; refusing duplicate deployment')
  } else {
    // Checked before the receipt exists, so a bad dependency leaves nothing to reconcile.
    await verifyDependencies(ctx, name, p.dependencies, options.allowDependencyMismatch)
    // Exclusive creation also prevents two processes from submitting the same step.
    fs.writeFileSync(receiptPath, json(receipt), { flag: 'wx', mode: 0o600 })
    const params = { schema: p.schema, note: `akita-migration:${identity}`, maxFee: microAlgo(100_000),
      populateAppCallResources: true, coverAppCallInnerTransactionFees: true, ...largeProgramCreateParams(p.approval, p.clear) }
    const created = p.method
      ? await p.factory.send.create({ ...params, method: p.method.name, args: p.args })
      : await p.factory.send.bare.create(params)
    receipt.appId = created.appClient.appId.toString()
    receipt.txId = created.result.txIds[0]
    receipt.status = 'deployed'
    save()
  }
  const appId = BigInt(receipt.appId!)
  const live = await ctx.algorand.client.algod.getApplicationByID(appId).do()
  if (!live.params || live.params.creator.toString() !== ctx.sender || hash(live.params.approvalProgram) !== receipt.approvalHash || hash(live.params.clearStateProgram) !== receipt.clearHash) {
    throw new Error(`App ${appId} does not match its deployment receipt`)
  }
  // All apps receive the base balance; ensureFunded only pays a deficit on resume.
  await ctx.algorand.account.ensureFunded(algosdk.getApplicationAddress(appId), ctx.sender, microAlgo(100_000))
  receipt.status = 'funded'
  save()
  if (register) {
    // A Rewards app that lacks an asset the old one pays out would stop that asset's rewards at the cutover.
    if (p.entry.daoField === 'rewards' && !options.allowMissingOptIns) await assertRewardsOptedIn(ctx, BigInt(receipt.oldAppId ?? '0'), appId)
    if (p.entry.daoField) await registerDaoApp(ctx, p.entry.daoField, appId, BigInt(receipt.oldAppId ?? '0'), {
      proposalId: receipt.registrationProposalId ? BigInt(receipt.registrationProposalId) : undefined,
      unresolved: receipt.registrationStarted && receipt.registrationProposalId === undefined,
      onProposalIntent: () => { receipt.registrationStarted = true; save() },
      onProposal: id => { receipt.registrationProposalId = id.toString(); save() },
    })
    if (p.entry.registryKey) await recordSdkKey(ctx, name, p, appId, receipt.oldAppId)
    receipt.status = 'registered'
    save()
  }
  console.log(`${name}: ${appId}; receipt ${receiptPath}`)
  if (!p.entry.registryKey) console.log('No canonical SDK key: consumers must use this receipt app ID explicitly.')
  const steps = postDeploySteps(name, appId)
  if (steps.length || p.entry.notes?.length) {
    console.log('Required before use (not sent by this script; on MainNet the admin is the DAO wallet):')
    for (const s of steps) console.log(`  ${s.app}.${s.method}(${JSON.stringify(s.args, (_, v) => typeof v === 'bigint' ? v.toString() : v)})${s.note ? ` — ${s.note}` : ''}`)
    for (const note of p.entry.notes ?? []) console.log(`  ${note}`)
  }
  return appId
}

/** Record a --register deployment under its SDK key (plugin history or network app map). */
export async function recordSdkKey(ctx: ScriptContext, name: string, p: ReturnType<typeof prepareImmutable>, appId: bigint, oldAppId?: string) {
  const key = p.entry.registryKey!
  const differs = Object.entries(p.entry.registerWhen ?? {})
    .filter(([arg, value]) => String(p.args[p.method!.args.findIndex(a => a.name === arg)]) !== value)
  if (differs.length) {
    console.log(`${name} ${appId} is not the canonical ${key} (${differs.map(([arg, v]) => `${arg} must be ${v}`).join(', ')}); SDK key unchanged`)
    return
  }
  const appIds = ctx.appIds as unknown as Record<string, bigint | undefined>
  const retain = p.entry.retainPreviousAs
  if (retain && oldAppId && BigInt(oldAppId) !== appId && !appIds[retain]) {
    await recordNetworkAppDeployment(ctx.options.network, retain, BigInt(oldAppId))
  }
  if ((PLUGIN_APP_ID_KEYS as readonly string[]).includes(key)) await recordPluginDeployment(ctx.options.network, key, appId, ctx.options.version)
  else await recordNetworkAppDeployment(ctx.options.network, key, appId)
}

/** Guard the old pointer and verify the actual DAO state after governance executes. */
export async function registerDaoApp(ctx: ScriptContext, field: string, appId: bigint, expectedOld: bigint,
  progress: { proposalId?: bigint; unresolved?: boolean; onProposalIntent?: () => void; onProposal?: (id: bigint) => void } = {}) {
  if (!['rewards', 'gate'].includes(field)) throw new Error(`Unsupported automatic DAO cutover: ${field}`)
  if (ctx.options.dryRun) throw new Error('DAO registration is unavailable in dry-run context')
  const read = async () => (await ctx.dao.client.state.global.akitaAppList()) as unknown as Record<string, bigint>
  const snapshot = await read()
  const current = snapshot[field]
  if (current === appId) return
  if (current !== expectedOld) throw new Error(`DAO aal.${field} changed: expected ${expectedOld}, found ${current}`)
  if (progress.unresolved) throw new Error('Registration proposal outcome is unresolved; reconcile its ID before retrying')
  let proposalId = progress.proposalId
  if (proposalId === undefined) {
    const actions = [{ type: ProposalActionEnum.UpdateFields as const, field: 'aal' as const, value: { [field]: appId } }]
    const cost = await ctx.dao.proposalCost({ actions })
    const funding = await getAppFundingNeeded(ctx.algorand, ctx.dao.client.appAddress.toString(), cost.total + 1_000_000n)
    if (funding > 0n) await ctx.algorand.send.payment({ sender: ctx.sender, signer: ctx.signer, receiver: ctx.dao.client.appAddress, amount: microAlgo(funding) })
    progress.onProposalIntent?.()
    proposalId = (await ctx.dao.newProposal({ actions })).return
    if (proposalId === undefined) throw new Error('DAO registration proposal creation returned no ID')
    progress.onProposal?.(proposalId)
  }
  // UpdateFields contains a full list snapshot. A resumed proposal must not
  // overwrite other DAO pointers changed while it was waiting for governance.
  const fields = ctx.dao.client.appClient.appSpec.structs.AkitaAppList
  const tuple = algosdk.ABIType.from(`(${fields.map(f => f.type).join(',')})`)
  const expected = tuple.encode(fields.map(f => f.name === field ? appId : snapshot[f.name]))
  const proposal = await ctx.dao.getProposal(proposalId)
  const action = proposal.actions[0]
  if (proposal.actions.length !== 1 || action.type !== ProposalActionEnum.UpdateFields || action.field !== 'aal'
    || !Buffer.from(action.value).equals(Buffer.from(expected))) {
    throw new Error(`Proposal ${proposalId} no longer matches the requested cutover/current DAO pointers`)
  }
  await executeProposal(ctx.dao, proposalId)
  if ((await read())[field] !== appId) throw new Error(`DAO aal.${field} cutover verification failed`)
}

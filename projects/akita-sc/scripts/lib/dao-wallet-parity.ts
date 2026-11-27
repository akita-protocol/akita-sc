/**
 * Bring one network's DAO wallet to the shape of another's: the same escrows, the same escrow locks and
 * the same plugin grants. Written for the TestNet rehearsal of docs/rollout/MAINNET-ROLLOUT.md (A4).
 * MainNet's DAO wallet carries grants and account escrows that TestNet's never got, so without this the
 * rehearsal's grant swap, wallet upgrade and escrow steps meet less on TestNet than they will on MainNet.
 *
 * `readSetup` reads one network and never signs. `planParity` is pure: it maps every source grant to the
 * target network's app for the same plugin and compares. `runParity` proposes and executes the difference
 * on a DAO that is not initialized, as its creator, then reads the wallet back and plans again.
 *
 * A grant's plugin app is mapped by the program it runs: the target deployment of the same plugin whose
 * program is byte-identical to the source app's (the newest, when several are). When none is, a grant on
 * the source's latest deployment maps to the target's latest and the plan says the programs differ; a
 * grant on an older source deployment is refused until `plugins` names its app.
 *
 * Reported and left alone: allowances (asset ids differ per network), named plugins, an escrow only the
 * target has (no proposal action removes one) and what each escrow holds. A grant of the Update plugin
 * that holds `pal.update` is never removed or replaced here; the rollout's Phase 2a moves that one.
 */
import { createHash } from 'node:crypto'
import algosdk, { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import { microAlgo } from '@algorandfoundation/algokit-utils'
import { NETWORK_PLUGIN_DEPLOYMENTS, PLUGIN_APP_ID_KEYS, resolvePluginDeployment, type AkitaNetwork, type PluginAppIdKey, type SDKClient } from 'akita-sdk'
import { ProposalActionEnum, type ProposalAction } from 'akita-sdk/dao'
import { CallerType, defaultEscrowGrantMbr } from 'akita-sdk/wallet'
import type { ScriptContext } from '../script-base'
import { executeProposal, getAppFundingNeeded } from '../utils'
import { createPluginClient, DAO_STATE_FULLY_INITIALIZED, DEFAULT_SOURCE_LINK, pluginKeyId } from './dao-wallet-plugin-migration'
import { comparesPowerInBaseUnits, isLegacyPower, toBaseUnitPower } from './power-units'

const MAX_UINT64 = 2n ** 64n - 1n
/** What a stand-in account is given: its minimum balance and the fee of its rekey. */
export const STAND_IN_FUNDING = 200_000n

export type GrantSettings = { fee: bigint; power: bigint; duration: bigint; participation: bigint; approval: bigint }
export type GrantPolicy = {
  delegationType: number
  lastValid: bigint
  cooldown: bigint
  /** Selector (hex) and cooldown of each allowed method, sorted by selector; empty when every method is allowed. */
  methods: { selector: string; cooldown: bigint }[]
  useRounds: boolean
  useExecutionKey: boolean
  coverFees: boolean
  admin: boolean
  canReclaim: boolean
  /** Name of the default spending escrow of a grant on the main account, else ''. */
  defaultEscrow: string
}
export type SetupGrant = {
  plugin: bigint
  /** The SDK registry's name for the plugin app, when it lists it. */
  key?: PluginAppIdKey
  revision?: number
  isLatest?: boolean
  /** sha256 of the app's approval program; undefined when the app no longer exists. */
  program?: string
  caller: string
  escrow: string
  policy: GrantPolicy
  /** The DAO's proposal settings of an execution-key grant. */
  settings?: GrantSettings
}
export type SetupEscrow = { name: string; account: boolean; address: string; locked: boolean }
export type SetupDeployment = { appId: bigint; revision: number; isLatest: boolean; program?: string }
export type Setup = {
  network: AkitaNetwork
  dao: bigint
  wallet: bigint
  /** The DAO's `pal.update`. */
  updatePlugin: bigint
  /** The DAO compares proposal power in base units (the upgraded DAO), not whole tokens. */
  baseUnits: boolean
  grants: SetupGrant[]
  escrows: SetupEscrow[]
  allowances: number
  named: string[]
  deployments: Partial<Record<PluginAppIdKey, SetupDeployment[]>>
}

const BIGINT_FIELDS = new Set(['dao', 'wallet', 'updatePlugin', 'plugin', 'appId', 'lastValid', 'cooldown', 'fee', 'power', 'duration', 'participation', 'approval'])
export const serializeSetup = (setup: Setup): string => JSON.stringify(setup, (_, v) => (typeof v === 'bigint' ? v.toString() : v), 1)
export const parseSetup = (text: string): Setup => JSON.parse(text, (k, v) => (BIGINT_FIELDS.has(k) && typeof v === 'string' ? BigInt(v) : v))

const isMissing = (error: unknown) => {
  const status = (error as { status?: number; response?: { status?: number } })?.status ?? (error as { response?: { status?: number } })?.response?.status
  return status === 404 || /does not exist|not found/i.test(String((error as Error)?.message ?? error))
}

/** A read that tells "it is not there" (undefined) from a failed request, which it retries and then throws. */
async function readOrMissing<T>(read: () => Promise<T>, tries = 5): Promise<T | undefined> {
  for (let i = 0; ; i++) {
    try { return await read() } catch (error) {
      if (isMissing(error)) return undefined
      if (i >= tries - 1) throw error
      await new Promise((resolve) => setTimeout(resolve, 1_000 * (i + 1)))
    }
  }
}

/** The DAO wallet's escrows, locks and grants on `ctx`'s network, and the program of every plugin deployment the SDK lists. */
export async function readSetup(ctx: ScriptContext): Promise<Setup> {
  const network = ctx.options.network
  const algod = ctx.algorand.client.algod
  const wallet = await ctx.dao.getWallet()
  const [grants, named, escrows, allowances, pal, daoApp] = await Promise.all([
    wallet.client.state.box.plugins.getMap(),
    wallet.getNamedPlugins(),
    wallet.getEscrows(),
    wallet.client.state.box.allowances.getMap(),
    ctx.dao.client.state.global.pluginAppList(),
    algod.getApplicationByID(ctx.dao.appId).do(),
  ])

  const escrowNameById = new Map<bigint, string>()
  for (const [name, info] of escrows) if (info.id > 0n) escrowNameById.set(info.id, name)

  const registered = NETWORK_PLUGIN_DEPLOYMENTS[network]
  const ids = new Set<bigint>([...grants.keys()].map((key) => key.plugin))
  if (registered) for (const key of PLUGIN_APP_ID_KEYS) for (const d of registered[key]) ids.add(d.appId)
  const programs = new Map<bigint, string | undefined>()
  const list = [...ids]
  for (let i = 0; i < list.length; i += 8) {
    await Promise.all(list.slice(i, i + 8).map(async (id) => {
      const app = await readOrMissing(() => algod.getApplicationByID(id).do())
      programs.set(id, app ? createHash('sha256').update(app.params!.approvalProgram).digest('hex') : undefined)
    }))
  }

  const deployments: Setup['deployments'] = {}
  if (registered) {
    for (const key of PLUGIN_APP_ID_KEYS) {
      deployments[key] = registered[key].map((d, i, all) => ({ appId: d.appId, revision: i + 1, isLatest: i === all.length - 1, program: programs.get(d.appId) }))
    }
  }

  const out: SetupGrant[] = []
  for (const [key, info] of grants) {
    if (info.start === 0n) continue
    const deployment = resolvePluginDeployment(network, key.plugin)
    let defaultEscrow = ''
    if (key.escrow === '' && info.escrow > 0n) {
      const name = escrowNameById.get(info.escrow)
      if (!name) throw new Error(`${network}: grant ${pluginKeyId(key)} spends from escrow app ${info.escrow}, which the wallet does not list`)
      defaultEscrow = name
    }
    let settings: GrantSettings | undefined
    if (info.useExecutionKey) {
      const box = await readOrMissing(() => ctx.dao.client.state.box.plugins.value({ plugin: key.plugin, escrow: defaultEscrow || key.escrow }))
      if (!box) throw new Error(`${network}: the DAO holds no proposal settings for the execution-key grant ${pluginKeyId(key)}`)
      settings = { fee: box.fee, power: box.power, duration: box.duration, participation: box.participation, approval: box.approval }
    }
    out.push({
      plugin: key.plugin, key: deployment?.key, revision: deployment?.revision, isLatest: deployment?.isLatest, program: programs.get(key.plugin),
      caller: key.caller, escrow: key.escrow, settings,
      policy: {
        delegationType: Number(info.delegationType), lastValid: info.lastValid, cooldown: info.cooldown,
        methods: info.methods.map(([selector, cooldown]) => ({ selector: Buffer.from(selector).toString('hex'), cooldown })).sort((a, b) => a.selector.localeCompare(b.selector)),
        useRounds: info.useRounds, useExecutionKey: info.useExecutionKey, coverFees: info.coverFees, admin: info.admin, canReclaim: info.canReclaim, defaultEscrow,
      },
    })
  }

  return {
    network, dao: ctx.dao.appId, wallet: wallet.client.appId, updatePlugin: pal?.update ?? 0n,
    baseUnits: comparesPowerInBaseUnits(daoApp.params!.approvalProgram),
    grants: out.sort((a, b) => grantOrder(a).localeCompare(grantOrder(b))),
    escrows: [...escrows].map(([name, info]) => ({ name, account: info.id === 0n, address: info.address, locked: info.locked })).sort((a, b) => a.name.localeCompare(b.name)),
    allowances: allowances.size, named: [...named.keys()].sort(), deployments,
  }
}

const grantOrder = (g: Pick<SetupGrant, 'key' | 'plugin' | 'escrow' | 'caller'>) => `${g.key ?? ''}\0${g.plugin}\0${g.escrow}\0${g.caller}`
const callerName = (caller: string) => (caller === ALGORAND_ZERO_ADDRESS_STRING ? 'anyone' : caller)
const pluginName = (g: Pick<SetupGrant, 'key' | 'plugin' | 'revision' | 'isLatest'>) => (g.key ? `${g.key}${g.isLatest ? '' : `@rev${g.revision}`} ${g.plugin}` : `app ${g.plugin}`)
export const describeGrant = (g: Pick<SetupGrant, 'key' | 'plugin' | 'revision' | 'isLatest' | 'caller' | 'escrow'>) =>
  `${pluginName(g)} for ${callerName(g.caller)} on ${g.escrow ? `escrow "${g.escrow}"` : 'the main account'}`

export type ParityOptions = {
  /** Source plugin app id to target plugin app id, ahead of the mapping by program. */
  plugins?: ReadonlyMap<bigint, bigint>
  /** Source caller to target caller, for an account that differs per network. */
  callers?: ReadonlyMap<string, string>
  /** Leave the target's own grants in place instead of removing them. */
  keepExtra?: boolean
}
export type EscrowStep = { name: string; action: 'new-app' | 'new-account' | 'lock' | 'unlock' }
export type GrantAdd = { source: SetupGrant; plugin: bigint; caller: string; mapped: 'named' | 'same program' | 'latest, another program' }
export type GrantReplace = GrantAdd & { target: SetupGrant; differences: string[] }
export type ParityPlan = {
  source: AkitaNetwork
  target: AkitaNetwork
  escrows: EscrowStep[]
  add: GrantAdd[]
  replace: GrantReplace[]
  remove: SetupGrant[]
  /** What the plan leaves as it is, for the reader. */
  notes: string[]
}

export const isEmptyPlan = (plan: ParityPlan) => plan.escrows.length + plan.add.length + plan.replace.length + plan.remove.length === 0

function mapPlugin(grant: SetupGrant, source: Setup, target: Setup, plugins: ReadonlyMap<bigint, bigint>): Pick<GrantAdd, 'plugin' | 'mapped'> {
  const named = plugins.get(grant.plugin)
  if (named !== undefined) return { plugin: named, mapped: 'named' }
  if (!grant.key) throw new Error(`${source.network} grants app ${grant.plugin}, which the SDK registry does not list. Name its ${target.network} app: ${grant.plugin}=<app id>`)
  const candidates = target.deployments[grant.key] ?? []
  const twin = grant.program ? candidates.filter((d) => d.program === grant.program).at(-1) : undefined
  if (twin) return { plugin: twin.appId, mapped: 'same program' }
  const latest = candidates.at(-1)
  if (grant.isLatest && latest) return { plugin: latest.appId, mapped: 'latest, another program' }
  throw new Error(`${source.network} grants ${pluginName(grant)}, an older deployment, and no ${target.network} ${grant.key} runs its program. Name the ${target.network} app: ${grant.plugin}=<app id>`)
}

/** The power a target DAO must hold to mean what `power` means on the source. */
function carryPower(power: bigint, source: Setup, target: Setup): bigint {
  if (source.baseUnits === target.baseUnits) return power
  if (!target.baseUnits) throw new Error(`${source.network} compares proposal power in base units and ${target.network} in whole tokens; upgrade the ${target.network} DAO first`)
  return isLegacyPower(power) ? toBaseUnitPower(power) : power
}

function policyDifferences(want: SetupGrant, have: SetupGrant, source: Setup, target: Setup): string[] {
  const out: string[] = []
  const a = want.policy
  const b = have.policy
  for (const field of ['delegationType', 'lastValid', 'cooldown', 'useRounds', 'useExecutionKey', 'coverFees', 'admin', 'canReclaim', 'defaultEscrow'] as const) {
    if (a[field] !== b[field]) out.push(`${field} ${b[field]} -> ${a[field]}`)
  }
  const methods = (p: GrantPolicy) => p.methods.map((m) => `${m.selector}:${m.cooldown}`).join(',')
  if (methods(a) !== methods(b)) out.push(`methods [${methods(b)}] -> [${methods(a)}]`)
  if (want.settings && have.settings) {
    const wanted = { ...want.settings, power: carryPower(want.settings.power, source, target) }
    for (const field of ['fee', 'power', 'duration', 'participation', 'approval'] as const) {
      if (wanted[field] !== have.settings[field]) out.push(`proposal ${field} ${have.settings[field]} -> ${wanted[field]}`)
    }
  }
  return out
}

/** What must change on `target` for its DAO wallet to hold `source`'s escrows, locks and grants. Pure. */
export function planParity(source: Setup, target: Setup, options: ParityOptions = {}): ParityPlan {
  const plugins = options.plugins ?? new Map<bigint, bigint>()
  const callers = options.callers ?? new Map<string, string>()
  const notes: string[] = []

  const escrows: EscrowStep[] = []
  const targetEscrows = new Map(target.escrows.map((e) => [e.name, e]))
  for (const e of source.escrows) {
    const have = targetEscrows.get(e.name)
    if (!have) {
      escrows.push({ name: e.name, action: e.account ? 'new-account' : 'new-app' })
      if (e.locked) escrows.push({ name: e.name, action: 'lock' })
    } else if (have.account !== e.account) {
      throw new Error(`Escrow "${e.name}" is ${e.account ? 'a plain account' : 'an escrow app'} on ${source.network} and ${have.account ? 'a plain account' : 'an escrow app'} on ${target.network}; no proposal action converts one`)
    } else if (have.locked !== e.locked) {
      escrows.push({ name: e.name, action: e.locked ? 'lock' : 'unlock' })
    }
  }
  const sourceEscrows = new Set(source.escrows.map((e) => e.name))
  const extraEscrows = target.escrows.filter((e) => !sourceEscrows.has(e.name)).map((e) => e.name)
  if (extraEscrows.length) notes.push(`Only ${target.network} has the escrow(s) ${extraEscrows.join(', ')}; no proposal action removes an escrow, so they stay.`)

  const have = new Map(target.grants.map((g) => [pluginKeyId(g), g]))
  const wanted = new Set<string>()
  const add: GrantAdd[] = []
  const replace: GrantReplace[] = []
  const protectedGrant = (g: SetupGrant) => target.updatePlugin !== 0n && g.plugin === target.updatePlugin
  for (const g of source.grants) {
    const mapped = mapPlugin(g, source, target, plugins)
    const caller = callers.get(g.caller) ?? g.caller
    const id = pluginKeyId({ plugin: mapped.plugin, caller, escrow: g.escrow })
    if (wanted.has(id)) throw new Error(`Two ${source.network} grants map to the same ${target.network} grant (${describeGrant({ ...g, plugin: mapped.plugin, caller })}); name their apps apart`)
    wanted.add(id)
    if (g.escrow && !sourceEscrows.has(g.escrow)) throw new Error(`${source.network} grant ${describeGrant(g)} names an escrow the wallet does not list`)
    const existing = have.get(id)
    if (existing) {
      const differences = policyDifferences(g, existing, source, target)
      if (differences.length === 0) continue
      if (protectedGrant(existing)) throw new Error(`${target.network}'s grant of the Update plugin that holds pal.update differs from ${source.network}'s (${differences.join('; ')}); the rollout's Phase 2a replaces that grant, this step never does`)
      replace.push({ source: g, target: existing, ...mapped, caller, differences })
      continue
    }
    if (g.policy.admin || g.policy.canReclaim) throw new Error(`${source.network} grant ${describeGrant(g)} is an admin or reclaim grant; a DAO proposal cannot create one`)
    if (g.policy.useRounds && g.policy.lastValid !== MAX_UINT64) throw new Error(`${source.network} grant ${describeGrant(g)} expires at round ${g.policy.lastValid}, which means nothing on ${target.network}`)
    add.push({ source: g, ...mapped, caller })
  }

  const extra = target.grants.filter((g) => !wanted.has(pluginKeyId(g)))
  const remove: SetupGrant[] = []
  for (const g of extra) {
    if (protectedGrant(g)) throw new Error(`${target.network}'s grant of the Update plugin that holds pal.update (${describeGrant(g)}) has no ${source.network} counterpart. Name the pair of Update plugin apps: <${source.network} app>=${g.plugin}`)
    if (options.keepExtra) notes.push(`Kept, only on ${target.network}: ${describeGrant(g)}.`)
    else remove.push(g)
  }

  for (const s of [source, target]) {
    if (s.allowances > 0) notes.push(`${s.network}'s DAO wallet holds ${s.allowances} allowance(s). Asset ids differ per network, so allowances are not carried; compare them by hand.`)
    if (s.named.length > 0) notes.push(`${s.network}'s DAO wallet holds the named plugin(s) ${s.named.join(', ')}. Named plugins are not carried.`)
  }
  // A grant anyone may use is the point of several plugins, but one that also names no method and needs
  // no execution key hands every method of that plugin to every passer-by. The run carries such a grant
  // as it is (it is what the source wallet holds); the operator should see which ones they are.
  for (const g of [...add.map((a) => a.source), ...replace.map((r) => r.source)]) {
    if (g.caller !== ALGORAND_ZERO_ADDRESS_STRING || g.policy.methods.length > 0 || g.policy.useExecutionKey) continue
    notes.push(`${describeGrant(g)} may be used by anyone, names no method and needs no execution key, so every method of that plugin `
      + `is open to every account. Carried as it is; restrict it on ${target.network} if that is not meant.`)
  }
  return { source: source.network, target: target.network, escrows, add, replace, remove, notes }
}

/** The plan, one line per change. */
export function describePlan(plan: ParityPlan): string[] {
  const lines: string[] = []
  const words: Record<EscrowStep['action'], string> = {
    'new-app': 'create the escrow (an escrow app)', 'new-account': `register a stand-in account rekeyed to the DAO wallet (on ${plan.source} it is a plain account)`, lock: 'lock', unlock: 'unlock',
  }
  for (const e of plan.escrows) lines.push(`  escrow "${e.name}": ${words[e.action]}`)
  for (const g of plan.add) {
    lines.push(`  add     ${describeGrant({ ...g.source, plugin: g.plugin, caller: g.caller, revision: undefined, isLatest: true })}`)
    lines.push(`          from ${plan.source} ${pluginName(g.source)}; ${g.mapped}; methods ${g.source.policy.methods.length || 'all'}; execution key ${g.source.policy.useExecutionKey}`)
  }
  for (const g of plan.replace) lines.push(`  replace ${describeGrant(g.target)}: ${g.differences.join('; ')}`)
  for (const g of plan.remove) lines.push(`  remove  ${describeGrant(g)} (only on ${plan.target})`)
  if (isEmptyPlan(plan)) lines.push(`  Nothing to change: ${plan.target}'s DAO wallet holds ${plan.source}'s escrows, locks and grants.`)
  for (const note of plan.notes) lines.push(`  note: ${note}`)
  return lines
}

type Action = ProposalAction<SDKClient>

function addAction(ctx: ScriptContext, g: GrantAdd, source: Setup, target: Setup, sender: string, sourceLink: string): Action {
  const p = g.source.policy
  // The DAO SDK reads only the client's app id, and the selectors below are raw, so any plugin class serves an unlisted app.
  const key = resolvePluginDeployment(ctx.options.network, g.plugin)?.key ?? g.source.key ?? 'payPlugin'
  const client = createPluginClient(key, ctx, g.plugin, sender)
  const caller = g.caller === ALGORAND_ZERO_ADDRESS_STRING
    ? { callerType: CallerType.Global as typeof CallerType.Global }
    : { callerType: CallerType.Other as typeof CallerType.Other, caller: g.caller }
  const settings = g.source.settings
  if (p.useExecutionKey && !settings) throw new Error(`No proposal settings were read for the execution-key grant ${describeGrant(g.source)}`)
  const execution = p.useExecutionKey
    ? { useExecutionKey: true as const, ...settings!, power: carryPower(settings!.power, source, target) }
    : { useExecutionKey: false as const }
  return {
    type: ProposalActionEnum.AddPlugin, client, ...caller,
    escrow: p.defaultEscrow || g.source.escrow, defaultToEscrow: p.defaultEscrow !== '',
    delegationType: BigInt(p.delegationType), lastValid: p.lastValid, cooldown: p.cooldown,
    methods: p.methods.map((m) => ({ name: [Uint8Array.from(Buffer.from(m.selector, 'hex'))], cooldown: m.cooldown })),
    useRounds: p.useRounds, coverFees: p.coverFees, sourceLink, ...execution,
  }
}

const removeAction = (g: SetupGrant): Action => ({ type: ProposalActionEnum.RemovePlugin, plugin: g.plugin, caller: g.caller, escrow: g.escrow })

/** One or more actions that share a proposal. `after` names a unit that must sit in an earlier proposal. */
export type ActionUnit<T = Action> = { actions: T[]; id?: string; after?: string }

/**
 * The plan as proposal actions, in order: new escrows, lock changes, new grants, then removals. The DAO's
 * validator checks every action against the wallet as it is when the proposal is created, so two kinds of
 * action wait for a later proposal: the lock of an escrow the plan creates, and the new half of a
 * replacement (its old grant is removed one proposal earlier). `standIns` names the account behind each
 * account escrow the plan creates.
 */
export async function parityActions(ctx: ScriptContext, plan: ParityPlan, source: Setup, target: Setup,
  options: { sender: string; standIns: ReadonlyMap<string, string>; sourceLink?: string }): Promise<{ units: ActionUnit[]; walletMbr: bigint }> {
  const wallet = await ctx.dao.getWallet()
  const sourceLink = options.sourceLink ?? DEFAULT_SOURCE_LINK
  const mbr = (escrow: string, methodCount = 0) => wallet.getMbr({ escrow, methodCount: BigInt(methodCount), plugin: '', groups: 0n })
  const units: ActionUnit[] = []
  const later: ActionUnit[] = []
  let walletMbr = 0n
  const created = new Set(plan.escrows.filter((e) => e.action === 'new-app' || e.action === 'new-account').map((e) => e.name))
  for (const e of plan.escrows) {
    if (e.action === 'new-app') {
      walletMbr += (await mbr(e.name)).newEscrowMintCost
      units.push({ id: `escrow:${e.name}`, actions: [{ type: ProposalActionEnum.NewEscrow, escrow: e.name, address: ALGORAND_ZERO_ADDRESS_STRING }] })
    } else if (e.action === 'new-account') {
      const address = options.standIns.get(e.name)
      if (!address) throw new Error(`No stand-in account was given for the account escrow "${e.name}"`)
      walletMbr += (await mbr(e.name)).escrows
      units.push({ id: `escrow:${e.name}`, actions: [{ type: ProposalActionEnum.NewEscrow, escrow: e.name, address }] })
    } else {
      const toggle: ActionUnit = { actions: [{ type: ProposalActionEnum.ToggleEscrowLock, escrow: e.name }] }
      if (created.has(e.name)) later.push({ ...toggle, after: `escrow:${e.name}` })
      else units.push(toggle)
    }
  }
  // a grant that uses an escrow by default also stores that escrow's name
  const grantMbr = async (g: { source: { escrow: string; policy: { methods: readonly unknown[]; defaultEscrow: string } } }) => {
    const { escrow, policy } = g.source
    const plugins = (await mbr(escrow, policy.methods.length)).plugins
    return policy.defaultEscrow === '' ? plugins : plugins + defaultEscrowGrantMbr(policy.defaultEscrow)
  }
  for (const g of plan.replace) {
    const id = `replace:${pluginKeyId(g.target)}`
    walletMbr += await grantMbr(g)
    units.push({ id, actions: [removeAction(g.target)] })
    later.push({ after: id, actions: [addAction(ctx, g, source, target, options.sender, sourceLink)] })
  }
  for (const g of plan.add) {
    walletMbr += await grantMbr(g)
    units.push({ actions: [addAction(ctx, g, source, target, options.sender, sourceLink)] })
  }
  for (const g of plan.remove) units.push({ actions: [removeAction(g)] })
  return { units: [...units, ...later], walletMbr }
}

/** Pack units into proposals of at most `limit` actions, in order, starting a new proposal where a unit must follow another's. */
export function batchActions<T>(units: readonly ActionUnit<T>[], limit: number): T[][] {
  const batches: T[][] = []
  const placed = new Map<string, number>()
  for (const unit of units) {
    if (unit.actions.length > limit) throw new Error(`The DAO allows ${limit} action(s) per proposal; one change here needs ${unit.actions.length}`)
    const last = batches.length - 1
    const waits = unit.after !== undefined && (placed.get(unit.after) ?? -1) >= last
    if (last >= 0 && !waits && batches[last].length + unit.actions.length <= limit) batches[last].push(...unit.actions)
    else batches.push([...unit.actions])
    if (unit.id) placed.set(unit.id, batches.length - 1)
  }
  return batches
}

/**
 * Fund a new account and rekey it to the DAO wallet in one group, so it can be registered as an account
 * escrow. The account's own key signs the rekey and is then dropped: after the rekey it authorizes nothing.
 */
export async function createStandIn(ctx: ScriptContext, walletAddress: string, name: string): Promise<string> {
  const account = algosdk.generateAccount()
  const address = account.addr.toString()
  await ctx.algorand.newGroup()
    .addPayment({ sender: ctx.sender, signer: ctx.signer, receiver: address, amount: microAlgo(STAND_IN_FUNDING), note: `Akita DAO stand-in for the ${name} escrow` })
    .addPayment({ sender: address, signer: algosdk.makeBasicAccountTransactionSigner(account), receiver: address, amount: microAlgo(0n), rekeyTo: walletAddress })
    .send()
  const auth = (await ctx.algorand.account.getInformation(address)).authAddr?.toString()
  if (auth !== walletAddress) throw new Error(`Stand-in ${address} for "${name}" is not rekeyed to the DAO wallet (auth address ${auth ?? address})`)
  return address
}

export type RunParityOptions = ParityOptions & {
  /** Send. Without it the run plans and prices only. */
  confirm: boolean
  /** The sender proposals are priced for in a plan (the DAO creator). */
  sender: string
  /** An existing account, already rekeyed to the target DAO wallet, to register for an account escrow instead of a new one. */
  standIns?: ReadonlyMap<string, string>
  sourceLink?: string
  log?: (line: string) => void
}

/** Plan parity and, with `confirm`, carry it out on a DAO that is not initialized; then read back and plan again. */
export async function runParity(ctx: ScriptContext, source: Setup, options: RunParityOptions): Promise<{ plan: ParityPlan; proposalIds: bigint[]; standIns: Map<string, string> }> {
  const log = options.log ?? ((line: string) => console.log(line))
  const target = await readSetup(ctx)
  const plan = planParity(source, target, options)
  const standIns = new Map(options.standIns ?? [])
  log(`DAO wallet parity: ${target.network} (DAO ${target.dao}, wallet ${target.wallet}) to the shape of ${source.network} (DAO ${source.dao}, wallet ${source.wallet})`)
  log(`  ${source.network}: ${source.grants.length} grants, ${source.escrows.length} escrows. ${target.network}: ${target.grants.length} grants, ${target.escrows.length} escrows.`)
  for (const line of describePlan(plan)) log(line)
  if (isEmptyPlan(plan)) return { plan, proposalIds: [], standIns }

  const [daoState, daoApp, wallet] = await Promise.all([ctx.dao.client.state.global.getAll(), ctx.algorand.app.getById(ctx.dao.appId), ctx.dao.getWallet()])
  const walletAddress = wallet.client.appAddress.toString()
  const creator = daoApp.creator.toString()
  const live = options.confirm && !ctx.options.dryRun
  if (live) {
    if (daoState.state === DAO_STATE_FULLY_INITIALIZED) throw new Error(`The ${target.network} DAO is initialized: these changes need votes there, so this step only runs before initialize()`)
    if (ctx.sender !== creator) throw new Error(`Only the DAO creator ${creator} can run this before the DAO is initialized`)
  }

  // An account escrow needs an account whose auth address is the DAO wallet. A plan prices with a placeholder.
  const needed = plan.escrows.filter((e) => e.action === 'new-account' && !standIns.has(e.name))
  for (const e of plan.escrows.filter((s) => s.action === 'new-account' && standIns.has(s.name))) {
    const auth = (await ctx.algorand.account.getInformation(standIns.get(e.name)!)).authAddr?.toString()
    if (auth !== walletAddress) throw new Error(`The account given for "${e.name}" is not rekeyed to the DAO wallet ${walletAddress}`)
  }
  for (const e of needed) {
    if (live) {
      const address = await createStandIn(ctx, walletAddress, e.name)
      standIns.set(e.name, address)
      log(`  Created the stand-in ${address} for "${e.name}" and rekeyed it to the DAO wallet. To use it again on a re-run: --stand-in ${e.name}=${address}`)
    } else {
      standIns.set(e.name, algosdk.generateAccount().addr.toString())
    }
  }

  const sender = live ? ctx.sender : options.sender
  const built = await parityActions(ctx, plan, source, target, { sender, standIns, sourceLink: options.sourceLink })
  const batches = batchActions(built.units, Number(daoState.proposalActionLimit ?? 1n))
  const walletFunding = await getAppFundingNeeded(ctx.algorand, walletAddress, built.walletMbr + 1_000_000n, 0n)
  log(`  ${batches.length} proposal(s); new DAO wallet storage ${built.walletMbr} microAlgos; DAO wallet funding shortfall ${walletFunding} microAlgos${needed.length ? `; ${needed.length} stand-in account(s) at ${STAND_IN_FUNDING} microAlgos each` : ''}`)
  for (const [i, actions] of batches.entries()) {
    const cost = await ctx.dao.proposalCost({ sender, signer: ctx.signer, actions })
    log(`  proposal ${i + 1}: ${actions.length} action(s), proposal fee ${cost.total} microAlgos, DAO storage ${cost.mbr} microAlgos`)
  }
  if (!live) {
    log(`\n${ctx.options.dryRun ? 'DRY RUN' : 'PLAN ONLY'}: every proposal was priced by simulation; nothing was sent.`)
    return { plan, proposalIds: [], standIns }
  }

  if (walletFunding > 0n) await ctx.algorand.send.payment({ sender: ctx.sender, signer: ctx.signer, receiver: walletAddress, amount: microAlgo(walletFunding) })
  const proposalIds: bigint[] = []
  for (const actions of batches) {
    const cost = await ctx.dao.proposalCost({ sender, signer: ctx.signer, actions })
    // The proposal's own boxes are held by the DAO account; a creator's proposal on a Draft DAO is charged nothing for them.
    const daoFunding = await getAppFundingNeeded(ctx.algorand, ctx.dao.client.appAddress.toString(), cost.total + cost.mbr, 1_000_000n)
    if (daoFunding > 0n) await ctx.algorand.send.payment({ sender: ctx.sender, signer: ctx.signer, receiver: ctx.dao.client.appAddress, amount: microAlgo(daoFunding) })
    const { return: proposalId } = await ctx.dao.newProposal({ actions })
    if (proposalId === undefined) throw new Error('The DAO returned no proposal id')
    await executeProposal(ctx.dao, proposalId)
    proposalIds.push(proposalId)
    log(`  Created and executed proposal ${proposalId} (${actions.length} action(s))`)
  }

  // The stand-ins are now this network's account escrows, so the escrow names match; the plan must be empty.
  const after = planParity(source, await readSetup(ctx), options)
  if (!isEmptyPlan(after)) throw new Error(`Parity was not reached:\n${describePlan(after).join('\n')}`)
  log(`  Verified: ${target.network}'s DAO wallet now holds ${source.network}'s escrows, locks and grants.`)
  return { plan, proposalIds, standIns }
}

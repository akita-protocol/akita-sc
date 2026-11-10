/**
 * Replace stale plugin grants on the DAO wallet with new plugin versions, preserving each grant's
 * policy. Used by `scripts/update-dao-wallet-plugins.ts` (CLI) and the principal-resolution rollout
 * (`scripts/lib/principal-rollout-run.ts`, Phases 2a and 3).
 *
 * Each replacement preserves the configurable permission policy:
 *   - caller
 *   - escrow scope / default spending escrow
 *   - delegation type and expiration
 *   - plugin and per-method cooldowns
 *   - method restrictions (including known ABI selector migrations, plus opt-in new methods)
 *   - round/timestamp mode, execution-key policy, and fee coverage
 *   - DAO proposal settings for execution-key grants
 *
 * Allowances are keyed by escrow + asset rather than plugin, so they are left untouched. On-chain
 * runtime counters (`start` and `lastCalled`) restart on the new grant.
 *
 * Rules added for the principal-resolution rollout (spec §7.1 Phases 2a and 3):
 *   - The Update plugin is the DAO's `PluginAppList.update`. Replacing its grant also repoints
 *     `pal.update` in the SAME proposal, before the add/remove pair. Targets accept updates only from
 *     `pal.update`, and the DAO bans ExecutePlugin only for `pal.update`, so the old Update plugin must
 *     lose both its role and its grant atomically (an ExecutePlugin key on a still-installed old Update
 *     plugin could call `updateAkitaDaoAppIDForApp`/`updateAkitaDaoEscrowForApp` on any target).
 *   - Named aliases cannot be removed and recreated in one proposal (the validator checks the alias
 *     against current state). With `unnameAliases`, a named grant is replaced by an UNNAMED grant with
 *     the same key policy (the manual path of `scripts/install-dao-social-caller.ts`) and the alias is
 *     removed in the same proposal. Callers that resolve the alias must switch to the plugin key.
 *   - Explicit replacements (`key:to` or `key:from:to`) name the new app id directly, so a rollout can
 *     run before the SDK registry (`akita-sdk/src/networks.ts`) is rebuilt, and on LocalNet.
 */
import {
  getPluginUpdate,
  PLUGIN_APP_ID_KEYS,
  PLUGIN_DEFINITIONS,
  resolvePluginDeployment,
  type AkitaSDK,
  type NewContractSDKParams,
  type PluginAppIdKey,
  type ResolvedPluginDeployment,
  type SDKClient,
} from 'akita-sdk'
import { ProposalAction, ProposalActionEnum } from 'akita-sdk/dao'
import {
  AsaManagerPluginSDK,
  AuctionPluginSDK,
  CallerType,
  DAOPluginSDK,
  DualStakePluginSDK,
  GatePluginSDK,
  HaystackRouterPluginSDK,
  HyperSwapPluginSDK,
  MarketplacePluginSDK,
  NFDPluginSDK,
  OptInPluginSDK,
  PayPluginSDK,
  PaySiloFactoryPluginSDK,
  PaySiloPluginSDK,
  PollPluginSDK,
  RafflePluginSDK,
  RevenueManagerPluginSDK,
  RewardsPluginSDK,
  SelfOptInPluginSDK,
  SocialPluginSDK,
  StakingPluginSDK,
  StakingPoolPluginSDK,
  SubscriptionsPluginSDK,
  UpdateAkitaDAOPluginSDK,
} from 'akita-sdk/wallet'
import { microAlgo } from '@algorandfoundation/algokit-utils'
import { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import type { ScriptContext } from '../script-base'
import { executeProposal, getAppFundingNeeded } from '../utils'
import type { GrantReplacement } from './principal-rollout'

export const DEFAULT_SOURCE_LINK = 'https://github.com/kylebee/akita-sc'

type RawPluginEntries = Awaited<
  ReturnType<ScriptContext['dao']['wallet']['client']['state']['box']['plugins']['getMap']>
>
export type RawPluginKey = RawPluginEntries extends Map<infer K, unknown> ? K : never
export type RawPluginInfo = RawPluginEntries extends Map<unknown, infer V> ? V : never
type ProposalSettings = NonNullable<
  Awaited<ReturnType<ScriptContext['dao']['client']['state']['box']['plugins']['value']>>
>
type PluginClient = AkitaSDK<SDKClient>

export interface Migration {
  key: RawPluginKey
  info: RawPluginInfo
  current: ResolvedPluginDeployment
  latest: ResolvedPluginDeployment
  configuredEscrow: string
  defaultToEscrow: boolean
  methods: Array<{ name: Uint8Array[]; cooldown: bigint }>
  executionSettings?: ProposalSettings
  /** Aliases removed by this migration (`unnameAliases`). */
  aliases: string[]
  /** This migration also repoints the DAO's `pal.update`. */
  repointsUpdate: boolean
  /**
   * A stale Update plugin grant that does not hold the `pal.update` role: it is removed, never
   * replaced (the DAO wallet keeps exactly one Update grant, the role holder's).
   */
  removeOnly: boolean
  actions: ProposalAction<SDKClient>[]
}

export type MigrationOptions = {
  /** Sender used to build plugin clients (the DAO creator in dry runs). */
  effectiveSender: string
  /** Restrict to plugin keys, names or app ids. */
  filters?: readonly string[]
  sourceLink?: string
  /** Explicit replacements; they take precedence over the SDK registry. */
  replacements?: readonly GrantReplacement[]
  /** Replace named grants by unnamed grants (drops the alias) instead of refusing them. */
  unnameAliases?: boolean
  /** New methods to add to METHOD-RESTRICTED grants of a plugin key (e.g. `socialPlugin: ['setMetaWallet']`). */
  addMethods?: Readonly<Record<string, readonly string[]>>
}

export const PLUGIN_METHOD_SELECTOR_MIGRATIONS: Partial<Record<PluginAppIdKey, Readonly<Record<string, string | null>>>> = {
  optinPlugin: { a6a035ee: null },
  updatePlugin: { '3f3e25b8': 'updateAkitaDaoEscrowForApp' },
  subscriptionsPlugin: { febf85f1: 'newService' },
  daoPlugin: { '669d30da': 'setup' },
  dualStakePlugin: { dff7cd15: 'redeem' },
  nfdPlugin: { '820cd4a6': 'updateFields' },
  rewardsPlugin: { '08c25eff': 'createDisbursement' },
  socialPlugin: {
    '1659c1a7': 'post',
    '4a7eb54d': 'editPost',
    c198459d: 'reply',
    '21a80aed': 'reply',
    caf8e713: 'gatedReply',
    '609dc073': 'gatedReply',
    '66b72962': 'editReply',
    '5b45e36b': 'gatedEditReply',
    '75ae40a4': 'vote',
    '5faa3a83': 'react',
    '35c6e396': 'gatedReact',
    '92b8899d': 'unfollow',
  },
  stakingPoolPlugin: { e7439919: 'addReward' },
  // Principal Phase 3: the new MarketplacePlugin `purchase` carries the audit MKT-02 `maxPrice`
  // argument (0x269e4bb0 -> 0x703f18ca, spec §7.3 second selector exception).
  marketplacePlugin: { '269e4bb0': 'purchase' },
  haystackRouterPlugin: { '6b1fdd29': null },
  stakingPlugin: { fdbf8960: null },
}

const REMOVED_PLUGIN_METHOD_NAMES: Readonly<Record<string, string>> = {
  a6a035ee: 'optOut',
  '6b1fdd29': 'claim',
  fdbf8960: 'softCheck',
}

export function pluginKeyId(key: Pick<RawPluginKey, 'plugin' | 'caller' | 'escrow'>): string {
  return `${key.plugin}\0${key.caller}\0${key.escrow}`
}

function selectorHex(selector: Uint8Array): string {
  return Buffer.from(selector).toString('hex')
}

export function callerLabel(caller: string, walletAddress: string): string {
  if (caller === ALGORAND_ZERO_ADDRESS_STRING) return 'global'
  if (caller === walletAddress) return 'wallet admin'
  return caller
}

export function migrationLabel(migration: Pick<Migration, 'current' | 'latest' | 'key'>): string {
  const escrow = migration.key.escrow ? ` escrow="${migration.key.escrow}"` : ''
  return `${migration.current.name} ${migration.current.appId} -> ${migration.latest.appId}${escrow}`
}

function matchesFilter(
  filters: readonly string[],
  current: ResolvedPluginDeployment,
  latest: ResolvedPluginDeployment,
): boolean {
  if (filters.length === 0) return true
  const candidates = new Set([
    current.key.toLowerCase(),
    current.name.toLowerCase(),
    current.appId.toString(),
    latest.appId.toString(),
  ])
  return filters.some((filter) => candidates.has(filter.toLowerCase()))
}

function isPluginKey(key: string): key is PluginAppIdKey {
  return (PLUGIN_APP_ID_KEYS as readonly string[]).includes(key)
}

function synthesized(network: ScriptContext['options']['network'], key: PluginAppIdKey, appId: bigint, latestAppId: bigint): ResolvedPluginDeployment {
  return {
    ...PLUGIN_DEFINITIONS[key],
    appId,
    network,
    revision: 0,
    isLatest: appId === latestAppId,
    latest: { appId: latestAppId },
  }
}

/**
 * The replacement for an installed grant's plugin `appId`: an explicit replacement (`key:from:to`
 * first, then `key:to` for any app id the SDK registry lists under `key`), else the SDK registry's
 * latest deployment. Undefined when the grant is current or unknown.
 */
export function resolveGrantUpdate(
  network: ScriptContext['options']['network'],
  appId: bigint,
  replacements: readonly GrantReplacement[] = [],
): { current: ResolvedPluginDeployment; latest: ResolvedPluginDeployment } | undefined {
  for (const r of replacements) {
    if (!isPluginKey(r.key)) throw new Error(`--replace: unknown plugin key ${r.key}`)
  }
  const explicit = replacements.find((r) => r.from === appId)
  if (explicit) {
    const key = explicit.key as PluginAppIdKey
    const registered = resolvePluginDeployment(network, appId)
    if (registered && registered.key !== key) {
      throw new Error(`--replace ${key}:${appId}:${explicit.to}: the SDK registry lists ${appId} as ${registered.key}`)
    }
    return {
      current: registered ?? synthesized(network, key, appId, explicit.to),
      latest: resolvePluginDeployment(network, explicit.to) ?? synthesized(network, key, explicit.to, explicit.to),
    }
  }
  const registered = resolvePluginDeployment(network, appId)
  if (registered) {
    const byKey = replacements.find((r) => r.from === undefined && r.key === registered.key)
    if (byKey) {
      if (byKey.to === appId) return undefined
      return {
        current: registered,
        latest: resolvePluginDeployment(network, byKey.to) ?? synthesized(network, registered.key, byKey.to, byKey.to),
      }
    }
  }
  return getPluginUpdate(network, appId)
}

export function createPluginClient(key: PluginAppIdKey, ctx: Pick<ScriptContext, 'algorand' | 'signer'>, appId: bigint, sender: string): PluginClient {
  const params = {
    algorand: ctx.algorand,
    factoryParams: {
      appId,
      defaultSender: sender,
      defaultSigner: ctx.signer,
    },
  }

  const constructors: Record<PluginAppIdKey, new (params: NewContractSDKParams) => PluginClient> = {
    revenueManagerPlugin: RevenueManagerPluginSDK,
    updatePlugin: UpdateAkitaDAOPluginSDK,
    optinPlugin: OptInPluginSDK,
    selfOptinPlugin: SelfOptInPluginSDK,
    asaManagerPlugin: AsaManagerPluginSDK,
    payPlugin: PayPluginSDK,
    haystackRouterPlugin: HaystackRouterPluginSDK,
    hyperSwapPlugin: HyperSwapPluginSDK,
    subscriptionsPlugin: SubscriptionsPluginSDK,
    auctionPlugin: AuctionPluginSDK,
    daoPlugin: DAOPluginSDK,
    dualStakePlugin: DualStakePluginSDK,
    gatePlugin: GatePluginSDK,
    marketplacePlugin: MarketplacePluginSDK,
    nfdPlugin: NFDPluginSDK,
    paySiloPlugin: PaySiloPluginSDK,
    paySiloFactoryPlugin: PaySiloFactoryPluginSDK,
    pollPlugin: PollPluginSDK,
    rafflePlugin: RafflePluginSDK,
    rewardsPlugin: RewardsPluginSDK,
    socialPlugin: SocialPluginSDK,
    stakingPlugin: StakingPluginSDK,
    stakingPoolPlugin: StakingPoolPluginSDK,
  }

  return new constructors[key](params)
}

function resolveLatestSelectors(
  selector: Uint8Array,
  deployment: ResolvedPluginDeployment,
  client: PluginClient,
): Uint8Array[] {
  const hex = selectorHex(selector)
  const migration = PLUGIN_METHOD_SELECTOR_MIGRATIONS[deployment.key]?.[hex]
  if (migration === undefined) return [selector]

  // This deployment still implements the historical four-argument NFD ABI.
  if (deployment.key === 'nfdPlugin' && deployment.latest.appId === 763128895n && hex === '820cd4a6') {
    return [selector]
  }

  if (migration === null) {
    const methodName = REMOVED_PLUGIN_METHOD_NAMES[hex] ?? hex
    throw new Error(
      `${deployment.name} permission "${methodName}" is unavailable in the latest deployment; no proposal was created`,
    )
  }

  const methodFactory: unknown = Reflect.get(client, migration)
  if (typeof methodFactory !== 'function') {
    throw new Error(`Latest ${deployment.name} SDK does not expose method "${migration}"`)
  }

  const pluginMethod = methodFactory.call(client)
  const result = typeof pluginMethod === 'function' ? pluginMethod() : undefined
  const selectors = Array.isArray(result?.selectors)
    ? result.selectors.filter((candidate: unknown): candidate is Uint8Array => candidate instanceof Uint8Array)
    : []

  if (selectors.length === 0) {
    throw new Error(`Could not resolve latest selector for ${deployment.name}.${migration}`)
  }
  return selectors
}

/** Selector of `method` in the latest plugin's ABI (the SDK's generated client spec). */
function newMethodSelector(client: PluginClient, deployment: ResolvedPluginDeployment, method: string): Uint8Array {
  try {
    return (client.client as unknown as { appClient: { getABIMethod(name: string): { getSelector(): Uint8Array } } }).appClient.getABIMethod(method).getSelector()
  } catch {
    throw new Error(`Latest ${deployment.name} ABI has no method "${method}"; rebuild the SDK clients first`)
  }
}

export function migrateMethods(
  info: Pick<RawPluginInfo, 'methods'>,
  deployment: ResolvedPluginDeployment,
  client: PluginClient,
  addMethods: readonly string[] = [],
): Array<{ name: Uint8Array[]; cooldown: bigint }> {
  const methods = new Map<string, { name: Uint8Array[]; cooldown: bigint }>()

  for (const [selector, cooldown] of info.methods) {
    for (const latestSelector of resolveLatestSelectors(selector, deployment, client)) {
      const hex = selectorHex(latestSelector)
      const existing = methods.get(hex)
      if (!existing || cooldown > existing.cooldown) {
        methods.set(hex, { name: [latestSelector], cooldown })
      }
    }
  }

  // An unrestricted grant (no methods) already allows every method, including new ones.
  if (info.methods.length > 0) {
    for (const method of addMethods) {
      const selector = newMethodSelector(client, deployment, method)
      const hex = selectorHex(selector)
      if (!methods.has(hex)) methods.set(hex, { name: [selector], cooldown: 0n })
    }
  }

  return Array.from(methods.values())
}

function selectorsMatch(
  actual: RawPluginInfo['methods'],
  expected: Array<{ name: Uint8Array[]; cooldown: bigint }>,
): boolean {
  const actualBySelector = new Map(actual.map(([selector, cooldown]) => [selectorHex(selector), cooldown]))
  const expectedBySelector = new Map(
    expected.flatMap((method) => method.name.map((selector) => [selectorHex(selector), method.cooldown] as const)),
  )
  if (actualBySelector.size !== expectedBySelector.size) return false
  return Array.from(expectedBySelector).every(([selector, cooldown]) => actualBySelector.get(selector) === cooldown)
}

/** Batch migrations into proposals of at most `actionLimit` actions; a migration's actions stay together. */
export function splitMigrations<T extends { actions: readonly unknown[] }>(migrations: readonly T[], actionLimit: number): T[][] {
  const widest = migrations.reduce((max, m) => Math.max(max, m.actions.length), 0)
  if (migrations.length > 0 && actionLimit < widest) {
    throw new Error(`DAO proposal action limit is ${actionLimit}; a plugin replacement here needs ${widest} actions`)
  }

  const batches: T[][] = []
  let current: T[] = []
  let actions = 0
  for (const migration of migrations) {
    if (actions + migration.actions.length > actionLimit && current.length > 0) {
      batches.push(current)
      current = []
      actions = 0
    }
    current.push(migration)
    actions += migration.actions.length
  }
  if (current.length > 0) batches.push(current)
  return batches
}

export async function createMigrationPlan(
  ctx: ScriptContext,
  options: MigrationOptions,
): Promise<{ migrations: Migration[]; walletAddress: string; requiredWalletMbr: bigint }> {
  const { effectiveSender, filters = [], sourceLink = DEFAULT_SOURCE_LINK, replacements = [], unnameAliases = false, addMethods = {} } = options
  const wallet = await ctx.dao.getWallet()
  const walletAddress = wallet.client.appAddress.toString()
  const [pluginEntries, namedPlugins, escrows, pal] = await Promise.all([
    wallet.client.state.box.plugins.getMap(),
    wallet.getNamedPlugins(),
    wallet.getEscrows(),
    ctx.dao.client.state.global.pluginAppList(),
  ])

  const namesByKey = new Map<string, string[]>()
  for (const [name, key] of namedPlugins) {
    const names = namesByKey.get(pluginKeyId(key)) ?? []
    names.push(name)
    namesByKey.set(pluginKeyId(key), names)
  }

  const escrowNamesById = new Map<string, string>()
  for (const [name, info] of escrows) {
    if (info.id > 0n) escrowNamesById.set(info.id.toString(), name)
  }

  const installedKeys = new Set(Array.from(pluginEntries.keys(), pluginKeyId))
  const migrations: Migration[] = []
  let requiredWalletMbr = 0n
  let updateRepointed = false

  for (const [key, info] of pluginEntries) {
    if (info.start === 0n) continue
    const update = resolveGrantUpdate(ctx.options.network, key.plugin, replacements)
    if (!update || !matchesFilter(filters, update.current, update.latest)) continue

    if (info.admin || info.canReclaim) {
      throw new Error(
        `Cannot faithfully migrate privileged grant ${update.current.name} ${pluginKeyId(key)} through DAO governance`,
      )
    }

    const aliases = namesByKey.get(pluginKeyId(key)) ?? []
    if (aliases.length > 0 && !unnameAliases) {
      throw new Error(
        `Cannot safely migrate named ${update.current.name} grant ${pluginKeyId(key)} ` +
          `(alias${aliases.length === 1 ? '' : 'es'}: ${aliases.join(', ')}): the current DAO validator ` +
          'does not allow an alias to be removed and recreated atomically. Pass --unname-aliases to replace it ' +
          'with an unnamed grant (the alias is dropped)',
      )
    }
    if (aliases.length > 1) {
      throw new Error(`Grant ${pluginKeyId(key)} has several aliases (${aliases.join(', ')}); migrate it by hand`)
    }

    const removeAction: ProposalAction<SDKClient> = aliases.length > 0
      ? { type: ProposalActionEnum.RemoveNamedPlugin, name: aliases[0] }
      : { type: ProposalActionEnum.RemovePlugin, plugin: key.plugin, caller: key.caller, escrow: key.escrow }

    // The Update plugin is a role (`pal.update`), not just a grant: only the role holder's grant is
    // replaced (and the role moves with it); any other Update grant is stale and is only removed.
    if (update.current.key === 'updatePlugin' && pal?.update !== key.plugin) {
      migrations.push({
        key, info, current: update.current, latest: update.latest, configuredEscrow: key.escrow, defaultToEscrow: false,
        methods: [], aliases, repointsUpdate: false, removeOnly: true, actions: [removeAction],
      })
      continue
    }

    const latestKey = pluginKeyId({ ...key, plugin: update.latest.appId })
    if (installedKeys.has(latestKey)) {
      throw new Error(
        `Latest ${update.current.name} grant already exists for caller=${key.caller}, escrow="${key.escrow}"; ` +
          'refusing to overwrite or merge configurations',
      )
    }

    let configuredEscrow = key.escrow
    let defaultToEscrow = false
    if (key.escrow === '' && info.escrow > 0n) {
      const defaultEscrow = escrowNamesById.get(info.escrow.toString())
      if (!defaultEscrow) {
        throw new Error(`Could not resolve default escrow app ${info.escrow} for ${update.current.name}`)
      }
      configuredEscrow = defaultEscrow
      defaultToEscrow = true
    }

    const client = createPluginClient(update.current.key, ctx, update.latest.appId, effectiveSender)
    const methods = migrateMethods(info, update.current, client, addMethods[update.current.key] ?? [])
    let executionSettings: ProposalSettings | undefined
    if (info.useExecutionKey) {
      executionSettings = await readDaoExecutionSettings(ctx, key.plugin, configuredEscrow)
      if (!executionSettings) {
        throw new Error(`Missing DAO execution settings for ${update.current.name} ${pluginKeyId(key)}`)
      }
    }

    const caller =
      key.caller === ALGORAND_ZERO_ADDRESS_STRING
        ? { callerType: CallerType.Global as typeof CallerType.Global }
        : { callerType: CallerType.Other as typeof CallerType.Other, caller: key.caller }
    const execution = info.useExecutionKey
      ? {
          useExecutionKey: true as const,
          fee: executionSettings!.fee,
          power: executionSettings!.power,
          duration: executionSettings!.duration,
          participation: executionSettings!.participation,
          approval: executionSettings!.approval,
        }
      : { useExecutionKey: false as const }
    const addAction: ProposalAction<SDKClient> = {
      type: ProposalActionEnum.AddPlugin,
      client,
      ...caller,
      escrow: configuredEscrow,
      delegationType: BigInt(info.delegationType),
      lastValid: info.lastValid,
      cooldown: info.cooldown,
      methods,
      useRounds: info.useRounds,
      coverFees: info.coverFees,
      defaultToEscrow,
      sourceLink,
      ...execution,
    }
    // Keep the replacement present before removing the old deployment.
    const actions: ProposalAction<SDKClient>[] = [addAction, removeAction]
    let repointsUpdate = false
    if (update.current.key === 'updatePlugin') {
      if (updateRepointed) throw new Error('Several grants of the current Update plugin; migrate them by hand')
      actions.unshift({ type: ProposalActionEnum.UpdateFields, field: 'pal', value: { update: update.latest.appId } })
      repointsUpdate = true
      updateRepointed = true
    }

    const mbr = await wallet.getMbr({
      escrow: key.escrow,
      methodCount: methods.length,
      plugin: '',
      groups: 0n,
    })
    requiredWalletMbr += mbr.plugins
    migrations.push({
      key,
      info,
      current: update.current,
      latest: update.latest,
      configuredEscrow,
      defaultToEscrow,
      methods,
      executionSettings,
      aliases,
      repointsUpdate,
      removeOnly: false,
      actions,
    })
  }

  migrations.sort((left, right) => migrationLabel(left).localeCompare(migrationLabel(right)))
  return { migrations, walletAddress, requiredWalletMbr }
}

/**
 * The DAO's execution settings box for (plugin, escrow), or undefined when the box does not exist.
 * algod answers a missing box with HTTP 404, which the generated map reader throws; a removed
 * grant's settings box is expected to be absent after a migration.
 */
async function readDaoExecutionSettings(ctx: ScriptContext, plugin: bigint, escrow: string): Promise<ProposalSettings | undefined> {
  try {
    return await ctx.dao.client.state.box.plugins.value({ plugin, escrow })
  } catch (error) {
    const status = (error as { status?: number; response?: { status?: number } })?.status ?? (error as { response?: { status?: number } })?.response?.status
    if (status === 404 || /box not found/i.test(String((error as Error)?.message ?? ''))) return undefined
    throw error
  }
}

export async function verifyMigrations(ctx: ScriptContext, migrations: readonly Migration[]): Promise<void> {
  const wallet = await ctx.dao.getWallet()
  const [entries, namedPlugins, pal] = await Promise.all([
    wallet.client.state.box.plugins.getMap(),
    wallet.getNamedPlugins(),
    ctx.dao.client.state.global.pluginAppList(),
  ])
  const byKey = new Map(Array.from(entries, ([key, info]) => [pluginKeyId(key), info]))

  for (const migration of migrations) {
    const oldKey = pluginKeyId(migration.key)
    const newKey = pluginKeyId({ ...migration.key, plugin: migration.latest.appId })
    const installed = byKey.get(newKey)
    if (migration.removeOnly) {
      if (byKey.has(oldKey)) throw new Error(`Stale Update grant ${oldKey} is still installed`)
      continue
    }
    if (byKey.has(oldKey) || !installed) {
      throw new Error(`Migration verification failed for ${migrationLabel(migration)}`)
    }
    if (migration.aliases.some((alias) => namedPlugins.has(alias))) {
      throw new Error(`Alias still present after ${migrationLabel(migration)}`)
    }
    if (migration.repointsUpdate && pal?.update !== migration.latest.appId) {
      throw new Error(`DAO pal.update is ${pal?.update}, expected ${migration.latest.appId}`)
    }
    if (
      installed.escrow !== migration.info.escrow ||
      installed.delegationType !== migration.info.delegationType ||
      installed.lastValid !== migration.info.lastValid ||
      installed.cooldown !== migration.info.cooldown ||
      installed.admin !== migration.info.admin ||
      installed.useRounds !== migration.info.useRounds ||
      installed.useExecutionKey !== migration.info.useExecutionKey ||
      installed.coverFees !== migration.info.coverFees ||
      installed.canReclaim !== migration.info.canReclaim ||
      !selectorsMatch(installed.methods, migration.methods)
    ) {
      throw new Error(`Latest grant configuration does not match ${migrationLabel(migration)}`)
    }

    if (migration.executionSettings) {
      const [oldSettings, newSettings] = await Promise.all([
        readDaoExecutionSettings(ctx, migration.current.appId, migration.configuredEscrow),
        readDaoExecutionSettings(ctx, migration.latest.appId, migration.configuredEscrow),
      ])
      const expected = migration.executionSettings
      if (
        oldSettings ||
        !newSettings ||
        newSettings.fee !== expected.fee ||
        newSettings.power !== expected.power ||
        newSettings.duration !== expected.duration ||
        newSettings.participation !== expected.participation ||
        newSettings.approval !== expected.approval
      ) {
        throw new Error(`DAO execution settings do not match ${migrationLabel(migration)}`)
      }
    }
  }
}

/** Print one migration in the dry-run format. */
export function describeMigration(migration: Migration, walletAddress: string): string[] {
  if (migration.removeOnly) {
    return [`  - ${migration.current.name} ${migration.current.appId} (stale Update grant without the pal.update role): REMOVE only`,
      `    caller: ${callerLabel(migration.key.caller, walletAddress)}; escrow: ${migration.key.escrow || '(main account)'}`]
  }
  const lines = [`  - ${migrationLabel(migration)}`]
  lines.push(`    caller: ${callerLabel(migration.key.caller, walletAddress)}`)
  lines.push(
    `    escrow: ${migration.configuredEscrow || '(main account)'}` +
      `${migration.defaultToEscrow ? ' (default spending escrow)' : ''}`,
  )
  lines.push(
    `    methods=${migration.info.methods.length} -> ${migration.methods.length}; ` +
      `executionKey=${migration.info.useExecutionKey}; coverFees=${migration.info.coverFees}`,
  )
  lines.push(
    `    delegationType=${migration.info.delegationType}; lastValid=${migration.info.lastValid}; ` +
      `cooldown=${migration.info.cooldown}; clock=${migration.info.useRounds ? 'rounds' : 'timestamps'}`,
  )
  if (migration.executionSettings) {
    const settings = migration.executionSettings
    lines.push(
      `    proposalSettings: fee=${settings.fee}; power=${settings.power}; duration=${settings.duration}; ` +
        `participation=${settings.participation}; approval=${settings.approval}`,
    )
  }
  if (migration.repointsUpdate) lines.push(`    also repoints DAO pal.update -> ${migration.latest.appId} (same proposal, first action)`)
  if (migration.aliases.length > 0) lines.push(`    alias "${migration.aliases[0]}" is removed; the new grant is unnamed`)
  return lines
}

export const DAO_STATE_FULLY_INITIALIZED = 2

export type RunMigrationOptions = MigrationOptions & {
  /** Fund the wallet, create proposals and (pre-initialization) execute them. Without it the run plans only. */
  confirm: boolean
  /** Submit created proposals for voting when the DAO is fully initialized. */
  submit?: boolean
  log?: (line: string) => void
}

export type RunMigrationResult = {
  migrations: Migration[]
  proposalIds: bigint[]
  /** True when the proposals were executed and the grants verified (bootstrap DAO). */
  executed: boolean
}

/**
 * Plan, then (with `confirm`) fund, propose and execute grant replacements. Before DAO initialization
 * only the DAO creator can create proposals, and they are executed and verified at once. After
 * initialization the proposals are left as drafts (or submitted with `submit`).
 */
export async function runMigration(ctx: ScriptContext, options: RunMigrationOptions): Promise<RunMigrationResult> {
  const log = options.log ?? ((line: string) => console.log(line))
  const daoState = await ctx.dao.client.state.global.getAll()
  const { migrations, walletAddress, requiredWalletMbr } = await createMigrationPlan(ctx, options)
  const actionLimit = Number(daoState.proposalActionLimit ?? 1n)
  const batches = splitMigrations(migrations, actionLimit)

  log(`DAO wallet plugin update plan on ${ctx.options.network}`)
  log(`  DAO: ${ctx.dao.appId} (state ${daoState.state ?? 'unknown'})`)
  log(`  DAO wallet: ${(await ctx.dao.getWallet()).appId} (${walletAddress})`)
  log(`  Proposal action limit: ${actionLimit}`)
  log(`  Stale grants: ${migrations.length}`)
  log(`  Proposal batches: ${batches.length}`)
  for (const migration of migrations) {
    log('')
    for (const line of describeMigration(migration, walletAddress)) log(line)
  }

  if (migrations.length === 0) {
    const filters = options.filters ?? []
    log(`\nNothing to do: no stale registered plugin grants${filters.length > 0 ? ` matching: ${filters.join(', ')}` : ''}.`)
    return { migrations, proposalIds: [], executed: false }
  }

  const walletFunding = await getAppFundingNeeded(ctx.algorand, walletAddress, requiredWalletMbr + 1_000_000n, 0n)
  log(`\nTemporary/new wallet MBR required: ${requiredWalletMbr} microAlgos`)
  log(`Wallet funding shortfall: ${walletFunding} microAlgos`)

  for (let i = 0; i < batches.length; i++) {
    const actions = batches[i].flatMap((migration) => migration.actions)
    const cost = await ctx.dao.proposalCost({ sender: options.effectiveSender, signer: ctx.signer, actions })
    log(
      `Batch ${i + 1}: grants=${batches[i].length}, actions=${actions.length}, ` +
        `proposal total=${cost.total}, fee=${cost.fee}, mbr=${cost.mbr}`,
    )
  }

  if (ctx.options.dryRun || !options.confirm) {
    log(`\n${ctx.options.dryRun ? 'DRY RUN' : 'PLAN ONLY'} - all discovery and proposal-cost simulations passed; no state was changed.`)
    return { migrations, proposalIds: [], executed: false }
  }
  const daoCreator = (await ctx.algorand.app.getById(ctx.dao.appId)).creator.toString()
  if (daoState.state !== DAO_STATE_FULLY_INITIALIZED && options.effectiveSender !== daoCreator) {
    throw new Error(`Only DAO creator ${daoCreator} can create pre-initialization migration proposals`)
  }

  if (walletFunding > 0n) {
    await ctx.algorand.send.payment({
      sender: ctx.sender,
      signer: ctx.signer,
      receiver: walletAddress,
      amount: microAlgo(walletFunding),
    })
    log(`Funded DAO wallet with ${walletFunding} microAlgos`)
  }

  const proposalIds: bigint[] = []
  for (const batch of batches) {
    const actions = batch.flatMap((migration) => migration.actions)
    const cost = await ctx.dao.proposalCost({ sender: options.effectiveSender, signer: ctx.signer, actions })
    const daoFunding = await getAppFundingNeeded(ctx.algorand, ctx.dao.client.appAddress.toString(), cost.total + 1_000_000n)
    if (daoFunding > 0n) {
      await ctx.algorand.send.payment({ sender: ctx.sender, signer: ctx.signer, receiver: ctx.dao.client.appAddress, amount: microAlgo(daoFunding) })
    }
    const { return: proposalId } = await ctx.dao.newProposal({ actions })
    if (proposalId === undefined) throw new Error('Failed to create plugin migration proposal')
    proposalIds.push(proposalId)

    if (daoState.state === DAO_STATE_FULLY_INITIALIZED) {
      if (options.submit) {
        await ctx.dao.submitProposal({ proposalId })
        log(`Created and submitted proposal ${proposalId}`)
      } else {
        log(`Created draft proposal ${proposalId}`)
      }
    } else {
      await executeProposal(ctx.dao, proposalId)
      log(`Created and executed proposal ${proposalId}`)
    }
  }

  const executed = daoState.state !== DAO_STATE_FULLY_INITIALIZED
  if (executed) {
    await verifyMigrations(ctx, migrations)
    log('Verified all replacement grants and preserved configurations')
  }
  return { migrations, proposalIds, executed }
}

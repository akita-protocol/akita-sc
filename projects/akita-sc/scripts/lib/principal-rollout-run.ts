/**
 * Governance flows for the principal-resolution rollout (docs/principal-resolution/PHASE-0-SPEC.md §7.1):
 *
 *   Phase 2a  `runPhase2a`  deploy the page-growing UpdateAkitaDAOPlugin, repoint `pal.update` and swap
 *                           the DAO wallet's Update grant in ONE proposal, fund the DAO wallet as size sponsor.
 *   Phase 2   `runPhase2`   upgrade each singleton (hinted selectors + legacy shims) and push its child
 *                           bytecode, the factory upgrade and the child push in one group when they fit.
 *                           `--target AkitaDAO` upgrades the DAO itself through the same plugin.
 *   Phase 3   `runPhase3`   deploy the new plugin versions from the immutable catalog and swap the DAO
 *                           wallet's grants (`dao-wallet-plugin-migration.ts`), only once every app the
 *                           new plugins call runs the Phase 2 code.
 *
 * Every flow plans first and prints the plan. Nothing is written without `confirm`, and a dry-run
 * context (`--dry-run`) never signs. The pure planning rules live in `principal-rollout.ts`.
 */
import { microAlgo } from '@algorandfoundation/algokit-utils'
import { PLUGIN_APP_ID_KEYS, type SDKClient } from 'akita-sdk'
import { ProposalAction, ProposalActionEnum } from 'akita-sdk/dao'
import { CallerType, type ExecutionBuildGroup } from 'akita-sdk/wallet'
import algosdk from 'algosdk'
import fs from 'node:fs'
import type { ScriptContext } from '../script-base'
import { executeProposal, getAppFundingNeeded } from '../utils'
import { recordedLease } from './execution-lease'
import { DAO_STATE_FULLY_INITIALIZED, runMigration, type RunMigrationResult } from './dao-wallet-plugin-migration'
import { deployImmutable } from './immutable-deployment'
import {
  acceptedRemoval,
  artifactsRoot,
  BOXED_CONTRACT_KEY,
  boxMbr,
  childPushProblems,
  createSignatures,
  dependencyGaps,
  loadAcceptedAbiRemovals,
  lockstepPlugins,
  daoBindingMode,
  diffAbi,
  loadCompiled,
  MAX_LOG_SIZE,
  missingPhase2aMarkers,
  phase3Gaps,
  planAppUpdate,
  planExecutionWindow,
  planGroups,
  PHASE2_TARGETS,
  PHASE3_NEW_METHODS,
  PHASE3_PLUGINS,
  programHash,
  programHasSelector,
  proposalReturnSize,
  restampExecution,
  roundsForGroups,
  splitLockstep,
  sponsorFunding,
  upgradeActionDataLength,
  UPGRADE_LEASE_SIGNATURE,
  windowSizeArg,
  type AbiDiff,
  type AcceptedAbiRemoval,
  type CompiledProgram,
  type ExecutionWindow,
  type GrantReplacement,
  type GroupPlan,
  type LiveApp,
  type Phase2Target,
  type Phase3Dependency,
  type Phase3Gap,
  type Phase3Plugin,
  type UpdatePlan,
} from './principal-rollout'

export const UPDATE_PLUGIN_ARTIFACT = 'arc58/plugins/update-akita-dao/UpdateAkitaDAOPlugin.arc56.json'
const PROPOSAL_STATUS_EXECUTED = 50

type Log = (line: string) => void
const defaultLog: Log = (line) => console.log(line)

// ── Chain reads ────────────────────────────────────────────────────────────────────────────────

export type LiveAppState = LiveApp & { appId: bigint; approval: Uint8Array; clear: Uint8Array; creator: string }

export async function readLiveApp(ctx: Pick<ScriptContext, 'algorand'>, appId: bigint): Promise<LiveAppState> {
  const app = await ctx.algorand.client.algod.getApplicationByID(appId).do()
  const params = app.params
  if (!params) throw new Error(`App ${appId} does not exist`)
  return {
    appId,
    approval: params.approvalProgram,
    clear: params.clearStateProgram,
    approvalSize: params.approvalProgram.length,
    clearSize: params.clearStateProgram.length,
    extraProgramPages: Number(params.extraProgramPages ?? 0),
    globalInts: Number(params.globalStateSchema?.numUint ?? 0),
    globalBytes: Number(params.globalStateSchema?.numByteSlice ?? 0),
    creator: params.creator.toString(),
  }
}

/** The DAO exposes `isUpgradeLease` (the tree DAO's lease index). */
export async function daoSupportsUpgradeLease(ctx: Pick<ScriptContext, 'algorand' | 'dao'>): Promise<boolean> {
  const dao = await readLiveApp(ctx, ctx.dao.appId)
  return programHasSelector(dao.approval, UPGRADE_LEASE_SIGNATURE)
}

/** How the Phase 2a plugin binds upgrades on this DAO (`daoBindingMode`); undefined = it cannot. */
export async function readDaoBindingMode(ctx: Pick<ScriptContext, 'algorand' | 'dao'>): Promise<'lease' | 'proposal' | undefined> {
  return daoBindingMode((await readLiveApp(ctx, ctx.dao.appId)).approval)
}

/** The factory's staged child program (box `bc`), or undefined when none is staged. */
export async function readFactoryChild(ctx: Pick<ScriptContext, 'algorand'>, factoryId: bigint): Promise<Uint8Array | undefined> {
  try {
    return await ctx.algorand.app.getBoxValue(factoryId, BOXED_CONTRACT_KEY)
  } catch {
    return undefined
  }
}

const sameBytes = (a: Uint8Array | undefined, b: Uint8Array) => a !== undefined && Buffer.compare(Buffer.from(a), Buffer.from(b)) === 0

/** Whether `appId` runs exactly the UpdateAkitaDAOPlugin artifact of this tree (informational). */
export async function isCurrentUpdatePlugin(ctx: Pick<ScriptContext, 'algorand'>, appId: bigint): Promise<boolean> {
  if (appId <= 0n) return false
  try {
    const live = await readLiveApp(ctx, appId)
    return programHash(live.approval) === programHash(loadCompiled(UPDATE_PLUGIN_ARTIFACT).approval)
  } catch {
    return false
  }
}

/**
 * Whether `appId` is a Phase 2a Update plugin bound to this DAO, decided by behaviour rather than by an
 * exact artifact hash (a later rebuild of the artifact must not make the installed plugin look foreign):
 * it carries every `PHASE2A_PLUGIN_SIGNATURES` selector and its `akita_dao` global is this DAO.
 */
export async function isPhase2aUpdatePlugin(ctx: Pick<ScriptContext, 'algorand' | 'dao'>, appId: bigint): Promise<boolean> {
  if (appId <= 0n) return false
  try {
    const live = await readLiveApp(ctx, appId)
    if (missingPhase2aMarkers(live.approval).length > 0) return false
    const state = await ctx.algorand.app.getGlobalState(appId)
    return BigInt(state.akita_dao?.value ?? 0) === ctx.dao.appId
  } catch {
    return false
  }
}

/** The approval hash a `deployImmutable` receipt recorded for `appId`, if the receipt names that app. */
function receiptApprovalHash(manifest: string | undefined, appId: bigint): string | undefined {
  if (!manifest || !fs.existsSync(manifest)) return undefined
  const receipt = JSON.parse(fs.readFileSync(manifest, 'utf8')) as { appId?: string; approvalHash?: string; contract?: string }
  return receipt.contract === 'UpdateAkitaDAOPlugin' && receipt.appId === appId.toString() ? receipt.approvalHash : undefined
}

// ── Phase 2a ───────────────────────────────────────────────────────────────────────────────────

export type SponsorLine = { target: string; appId: bigint; plan: UpdatePlan }

/** Plan the size sponsorship of the Phase 2 targets that exist on this network. */
export async function planSponsorship(ctx: ScriptContext, targets: readonly Phase2Target[] = PHASE2_TARGETS): Promise<{ lines: SponsorLine[]; total: bigint }> {
  const lines: SponsorLine[] = []
  for (const target of targets) {
    const appId = ctx.appIds[target.appIdKey]
    if (!appId || appId <= 0n) continue
    const live = await readLiveApp(ctx, appId)
    lines.push({ target: target.name, appId, plan: planAppUpdate(live, loadCompiled(target.artifact)) })
  }
  return { lines, total: sponsorFunding(lines.map((l) => l.plan)) }
}

export type Phase2aOptions = {
  /** An already-deployed new Update plugin; otherwise it is deployed from the immutable catalog. */
  newPluginId?: bigint
  /** Deployment receipt for the catalog deploy (required unless `newPluginId` or a dry run). */
  manifest?: string
  /** Record the new plugin in the SDK registry (testnet/mainnet only; LocalNet is skipped). */
  register?: boolean
  confirm: boolean
  submit?: boolean
  sourceLink?: string
  /** Fund the DAO wallet now for the Phase 2 size sponsorship. */
  fundSponsor?: boolean
  sponsorTargets?: readonly Phase2Target[]
  log?: Log
}

export type Phase2aResult = {
  oldPluginId: bigint
  newPluginId?: bigint
  /** How the Phase 2a plugin binds upgrades on this DAO (`proposal` on the deployed MainNet DAO). */
  daoBindingMode: 'lease' | 'proposal'
  /** The DAO has the tree's `isUpgradeLease` (false on the deployed MainNet DAO). */
  daoSupportsUpgradeLease: boolean
  sponsorship: { lines: SponsorLine[]; total: bigint }
  migration?: RunMigrationResult
}

/**
 * Phase 2a. The deployed Update plugin builds `approvalProgram: [chunk1, chunk2]` with no extra pages
 * and no schema, so it cannot push AkitaSocial, Subscriptions or the DAO (> 8,192 B). The new plugin
 * grows pages and passes the schema through; on growth the DAO wallet becomes the target's size sponsor.
 *
 * The new plugin binds every execution-key upgrade to its UpgradeApp action and target: by default
 * through `DAO.isUpgradeLease` (tree DAO), and, when the group selects it (SDK `daoBinding`), through
 * `DAO.mustGetExecution` + `DAO.getProposal`, which the deployed DAO has. So after this repoint the DAO
 * itself (`--target AkitaDAO`) and every Phase 2 target can be upgraded in any order. Refuses when the
 * DAO supports neither read or the plugin artifact lacks the Phase 2a markers (a stale build).
 */
export async function runPhase2a(ctx: ScriptContext, options: Phase2aOptions): Promise<Phase2aResult> {
  const log = options.log ?? defaultLog
  const pal = await ctx.dao.client.state.global.pluginAppList()
  const oldPluginId = pal?.update ?? 0n
  if (oldPluginId <= 0n) throw new Error('DAO pal.update is not set')
  const artifact = loadCompiled(UPDATE_PLUGIN_ARTIFACT)
  const artifactGaps = missingPhase2aMarkers(artifact.approval)
  if (artifactGaps.length > 0) {
    throw new Error(`The UpdateAkitaDAOPlugin artifact lacks ${artifactGaps.join(', ')}; rebuild it from this tree before Phase 2a`)
  }

  log(`Phase 2a on ${ctx.options.network}: DAO ${ctx.dao.appId}, pal.update ${oldPluginId}`)
  const oldIsCurrent = await isPhase2aUpdatePlugin(ctx, oldPluginId)
  if (oldIsCurrent) log(`  pal.update ${oldPluginId} already runs a Phase 2a Update plugin`)

  // The plugin binds every execution-key upgrade through the DAO: isUpgradeLease (tree DAO) or the
  // proposal read (mustGetExecution + getProposal, the deployed DAO). Without either it would revert on
  // every upgrade, the DAO's own included, and only a vote could repoint pal.update back.
  const mode = await readDaoBindingMode(ctx)
  const supportsLease = mode === 'lease'
  log(`  DAO binding: ${mode === 'lease' ? `${UPGRADE_LEASE_SIGNATURE} (lease read)` : mode === 'proposal'
    ? 'mustGetExecution + getProposal (proposal read; this DAO has no isUpgradeLease)' : 'NONE'}`)
  if (mode === undefined) {
    throw new Error(`DAO ${ctx.dao.appId} has neither ${UPGRADE_LEASE_SIGNATURE} nor mustGetExecution + getProposal; the Phase 2a Update plugin could not bind any upgrade on it`)
  }

  const sponsorship = await planSponsorship(ctx, options.sponsorTargets)
  for (const line of sponsorship.lines) {
    const p = line.plan
    log(`  ${line.target} ${line.appId}: pages ${p.extraPagesAfter}${p.growTo > 0 ? ' (grows)' : ''}, schema ${p.globalIntsAfter}/${p.globalBytesAfter}` +
      `${p.sizeChange ? `, DAO wallet sponsors ${p.sponsoredMbrAfter} µALGO` : ', no size change'}` +
      `${p.legacyPluginCanPush ? '' : ', NOT pushable by the deployed Update plugin'}`)
  }
  const daoWallet = await ctx.dao.getWallet()
  const walletAddress = daoWallet.client.appAddress.toString()
  const sponsorShortfall = await getAppFundingNeeded(ctx.algorand, walletAddress, sponsorship.total, 0n)
  log(`  Phase 2 sponsorship: ${sponsorship.total} µALGO; DAO wallet shortfall ${sponsorShortfall} µALGO`)

  const binding = { daoBindingMode: mode, daoSupportsUpgradeLease: supportsLease }
  if (oldIsCurrent) return { oldPluginId, newPluginId: oldPluginId, ...binding, sponsorship }

  let newPluginId = options.newPluginId
  if (newPluginId !== undefined) {
    // An operator-supplied id must be the plugin this tree builds, or the one its deployment receipt
    // recorded (the artifact may have been rebuilt since), and must behave as a Phase 2a plugin.
    const live = await readLiveApp(ctx, newPluginId)
    const liveHash = programHash(live.approval)
    const recorded = receiptApprovalHash(options.manifest, newPluginId)
    if (liveHash !== programHash(artifact.approval) && liveHash !== recorded) {
      throw new Error(`App ${newPluginId} runs neither the UpdateAkitaDAOPlugin artifact of this tree nor the program its --manifest receipt recorded`)
    }
    if (!(await isPhase2aUpdatePlugin(ctx, newPluginId))) {
      const dao = await ctx.algorand.app.getGlobalState(newPluginId)
      throw new Error(`Update plugin ${newPluginId} is not a Phase 2a plugin for DAO ${ctx.dao.appId} (akita_dao ${dao.akita_dao?.value}, missing ${missingPhase2aMarkers(live.approval).join(', ') || 'nothing'})`)
    }
  } else if (ctx.options.dryRun) {
    await deployImmutable(ctx, 'UpdateAkitaDAOPlugin', {}, undefined, Boolean(options.register))
  } else {
    if (!options.confirm) throw new Error('Pass --confirm to deploy the new Update plugin')
    if (!options.manifest) throw new Error('--manifest is required to deploy the new Update plugin')
    newPluginId = await deployImmutable(ctx, 'UpdateAkitaDAOPlugin', {}, options.manifest, Boolean(options.register))
  }

  if (newPluginId === undefined) {
    log('DRY RUN - the grant swap is planned after the new plugin exists. The proposal will be:')
    log(`  1. UpdateFields pal.update = <new plugin>`)
    log(`  2. AddPlugin <new plugin> with the settings of the ${oldPluginId} grant (global, execution key)`)
    log(`  3. RemovePlugin ${oldPluginId}`)
    return { oldPluginId, ...binding, sponsorship }
  }

  const replacements: GrantReplacement[] = [{ key: 'updatePlugin', from: oldPluginId, to: newPluginId }]
  const migration = await runMigration(ctx, {
    effectiveSender: ctx.options.dryRun ? (await ctx.algorand.app.getById(ctx.dao.appId)).creator.toString() : ctx.sender,
    filters: [oldPluginId.toString()],
    sourceLink: options.sourceLink,
    replacements,
    confirm: options.confirm,
    submit: options.submit,
    log,
  })
  const repoint = migration.migrations.filter((m) => m.repointsUpdate)
  if (repoint.length !== 1) {
    throw new Error(`Expected exactly one Update grant that repoints pal.update, found ${repoint.length}`)
  }

  if (options.confirm && !ctx.options.dryRun && options.fundSponsor) {
    // Re-read: installing the new grant consumed part of the wallet's spare balance.
    const shortfall = await getAppFundingNeeded(ctx.algorand, walletAddress, sponsorship.total, 0n)
    if (shortfall > 0n) {
      await ctx.algorand.send.payment({ sender: ctx.sender, signer: ctx.signer, receiver: walletAddress, amount: microAlgo(shortfall) })
      log(`Funded the DAO wallet with ${shortfall} µALGO for the Phase 2 size sponsorship`)
    }
  }

  return { oldPluginId, newPluginId, ...binding, sponsorship, migration }
}

// ── Phase 2 ────────────────────────────────────────────────────────────────────────────────────

export type TargetPlan = {
  target: Phase2Target
  appId: bigint
  live: LiveAppState
  next: CompiledProgram
  child?: CompiledProgram
  appUpToDate: boolean
  childUpToDate: boolean
  plan: UpdatePlan
  groups?: GroupPlan
  /** ARC-4 methods the upgrade removes and adds (spec §7.1 point 3); undefined when the app is up to date. */
  abi?: AbiDiff
  /** Why this plan must not run (a child the factory cannot create, a non-atomic wallet push, a dependency gap). */
  blockers: string[]
}

export type PlanTargetOptions = {
  /** Push the child in its own group after the factory (refused for a child marked `atomic`). */
  splitChild?: boolean
  /** Push only the child; the factory app keeps its live program (refused when that program cannot create it). */
  childOnly?: boolean
}

export async function planTarget(ctx: ScriptContext, target: Phase2Target, options: PlanTargetOptions = {}): Promise<TargetPlan> {
  const appId = ctx.appIds[target.appIdKey]
  if (!appId || appId <= 0n) throw new Error(`No ${target.appIdKey} app id on ${ctx.options.network}`)
  if (options.childOnly && !target.child) throw new Error(`${target.name} has no child to push`)
  const live = await readLiveApp(ctx, appId)
  const next = loadCompiled(target.artifact)
  const child = target.child ? loadCompiled(target.child.artifact) : undefined
  const appUpToDate = options.childOnly || (sameBytes(live.approval, next.approval) && sameBytes(live.clear, next.clear))
  const childUpToDate = child ? sameBytes(await readFactoryChild(ctx, appId), child.approval) : true
  const plan = planAppUpdate(live, next)
  const app = appUpToDate ? undefined : { approvalSize: next.approval.length, withClear: true }
  const groups = !app && (!child || childUpToDate) ? undefined : planGroups(app, child && !childUpToDate ? child.approval.length : undefined, options.splitChild)
  const abi = appUpToDate ? undefined : diffAbi(live.approval, target.artifact)

  const blockers: string[] = []
  if (child && !childUpToDate) {
    // The factory program that will receive the child: the artifact when this run upgrades it, else the live one.
    const factory = appUpToDate ? live.approval : next.approval
    const spec = JSON.parse(fs.readFileSync(`${artifactsRoot}/${target.child!.artifact}`, 'utf8'))
    for (const problem of childPushProblems(factory, { ...child, createSignatures: createSignatures(spec) })) {
      blockers.push(`${target.name}: child ${child.name}: ${problem}${appUpToDate && !sameBytes(live.approval, next.approval) ? ' (upgrade the factory with its child)' : ''}`)
    }
    if (target.child!.atomic && groups && !groups.atomic) {
      blockers.push(`${target.name}: the factory and its ${child.name} child must land in one group (ACCT-3); do not split them`)
    }
  }
  const pushed = [...(app ? [next.approval] : []), ...(child && !childUpToDate ? [child.approval] : [])]
  if (target.dependencies && pushed.length > 0) {
    const gaps = dependencyGaps(target.name, pushed, target.dependencies, await readDependencies(ctx, target.dependencies))
    for (const gap of gaps) {
      blockers.push(`${target.name} -> ${gap.dependency}${gap.appId ? ` ${gap.appId}` : ''}: ${gap.missing === 'not deployed' ? 'not deployed' : `missing ${gap.missing.join(', ')}`} (upgrade it first)`)
    }
  }
  return { target, appId, live, next, child, appUpToDate, childUpToDate, plan, groups, abi, blockers }
}

export function describeTargetPlan(p: TargetPlan): string[] {
  const lines = [`${p.target.name} ${p.appId}: approval ${p.live.approvalSize} -> ${p.next.approval.length} B (AVM ${p.next.avmVersion})`]
  if (p.appUpToDate) lines.push('  app: up to date')
  else {
    lines.push(`  pages ${p.live.extraProgramPages} -> ${p.plan.extraPagesAfter}, schema ${p.live.globalInts}/${p.live.globalBytes} -> ${p.plan.globalIntsAfter}/${p.plan.globalBytesAfter}` +
      `${p.plan.schemaArgs ? ' (updateAppWithSchema)' : ''}`)
    lines.push(p.plan.sizeChange
      ? `  size change: the DAO wallet becomes the sponsor (${p.plan.sponsoredMbrAfter} µALGO; the previous sponsor is released ${p.plan.sponsoredMbrBefore} µALGO)`
      : '  no size change')
    if (!p.plan.legacyPluginCanPush) lines.push('  needs the Phase 2a Update plugin (> 8,192 B or outgrows its pages)')
    if (p.abi && !p.abi.known) lines.push('  ABI: the live program is not in the deployed-ABI snapshot; removed methods cannot be listed')
    if (p.abi?.known) {
      lines.push(`  ABI (${p.abi.source}): ${p.abi.added.length} method(s) added, ${p.abi.removed.length} removed`)
      const liveHash = programHash(p.live.approval)
      for (const signature of p.abi.removed) {
        const accepted = acceptedRemoval(p.target.name, liveHash, signature)
        lines.push(`    REMOVED ${signature} (every caller of this selector breaks at the upgrade)` +
          `${accepted ? `; accepted by Kyle decision ${accepted.decision} (${accepted.date})` : ''}`)
      }
    }
  }
  if (p.child) lines.push(`  child ${p.child.name}: ${p.child.approval.length} B${p.childUpToDate ? ' (already staged)' : ''}`)
  for (const plugin of p.target.lockstep ?? []) {
    lines.push(`  lockstep: the deployed ${plugin} breaks at this upgrade; its new version is deployed and the DAO wallet grants swapped in this run`)
  }
  for (const blocker of p.blockers) lines.push(`  BLOCKED: ${blocker}`)
  if (p.groups) {
    lines.push(`  execution: ${p.groups.groups.map((g) => `[${[g.app ? 'app' : '', g.child ? 'child' : ''].filter(Boolean).join('+')} ${g.txns} txns]`).join(' then ')}` +
      `${p.groups.groups.length > 1 ? ' (NOT atomic: child creation reverts between the groups)' : ''}`)
  }
  return lines
}

/** How each ARC-4 removal of a Phase 2 upgrade was let through (`assertAbiAcknowledged`). */
export type AbiAcknowledgment = {
  /** removals Kyle accepted as decisions (`principal-accepted-abi-removals.json`) */
  accepted: { target: string; signature: string; decision: string; date: string }[]
  /** removals waived for this run only by `--accept-removed` (an exact `<Target>:<signature>`, or `all`) */
  waived: { target: string; signature: string; by: 'signature' | 'all' }[]
  /** the run passed `--accept-removed all` (printed as a top-level WARNING even when it waived nothing) */
  waiveAll: boolean
  /** `<Target>:<signature>` waivers that matched no removal of this run (a stale or mistyped override) */
  unusedWaivers: string[]
}

/**
 * Parse one-off `--accept-removed` waivers. Each one names its target, `<Target>:<signature>`, so a waiver
 * never lets the same signature through on another target. A bare signature is refused.
 */
export function parseRemovalWaivers(removed: readonly string[]): string[] {
  for (const w of removed) {
    const colon = w.indexOf(':')
    if (colon <= 0 || colon === w.length - 1 || !/^[A-Za-z][A-Za-z0-9]*$/.test(w.slice(0, colon))) {
      throw new Error(`--accept-removed ${w}: name the target, as <Target>:<signature> (e.g. RaffleFactory:newRaffle(...)uint64), or pass all`)
    }
  }
  return [...removed]
}

/**
 * Refuse an upgrade that removes ARC-4 methods unless each removal is acknowledged (spec §7.1 point 3:
 * the ride-along changes of every Phase 2 contract are surfaced, not shipped silently). A removal passes
 * when Kyle accepted it as a decision (checked-in list `principal-accepted-abi-removals.json`: K2
 * `AbstractedAccountFactory.newAccount`, K6 the two RaffleFactory creation selectors), or when the run
 * waives it with `--accept-removed <Target>:<signature>` or `--accept-removed all` (one-off override).
 * Every other removal is refused. Returns what was accepted and what was waived, so the caller prints
 * every signature `all` waives and a WARNING whenever `all` is used.
 */
export function assertAbiAcknowledged(
  plans: readonly TargetPlan[],
  accept: { removed?: readonly string[] | 'all'; unknownAbi?: boolean; acceptedRemovals?: readonly AcceptedAbiRemoval[] },
): AbiAcknowledgment {
  const decisions = accept.acceptedRemovals ?? loadAcceptedAbiRemovals()
  const waivers = accept.removed === 'all' ? [] : parseRemovalWaivers(accept.removed ?? [])
  const used = new Set<string>()
  const result: AbiAcknowledgment = { accepted: [], waived: [], waiveAll: accept.removed === 'all', unusedWaivers: [] }
  const problems: string[] = []
  for (const p of plans) {
    if (!p.abi) continue
    if (!p.abi.known) {
      if (!accept.unknownAbi) problems.push(`${p.target.name}: live program ${programHash(p.live.approval).slice(0, 12)}… is not in the deployed-ABI snapshot (pass --accept-unknown-abi after checking its ABI by hand)`)
      continue
    }
    const liveHash = programHash(p.live.approval)
    for (const signature of p.abi.removed) {
      const decision = acceptedRemoval(p.target.name, liveHash, signature, decisions)
      if (decision) result.accepted.push({ target: p.target.name, signature, decision: decision.decision, date: decision.date })
      else if (accept.removed === 'all') result.waived.push({ target: p.target.name, signature, by: 'all' })
      else if (waivers.includes(`${p.target.name}:${signature}`)) {
        used.add(`${p.target.name}:${signature}`)
        result.waived.push({ target: p.target.name, signature, by: 'signature' })
      } else problems.push(`${p.target.name}: removes ${signature} (not an accepted decision in scripts/lib/principal-accepted-abi-removals.json; pass --accept-removed '${p.target.name}:${signature}' to override for this run)`)
    }
  }
  result.unusedWaivers = waivers.filter((w) => !used.has(w))
  if (problems.length > 0) throw new Error(`Phase 2 would break deployed callers:\n  ${problems.join('\n  ')}`)
  return result
}

/**
 * Log lines for an acknowledgment: a top-level WARNING when `--accept-removed all` was used (with the count,
 * also when it is 0), every accepted removal with its decision, every waived one, and every unused waiver.
 */
export function describeAbiAcknowledgment(ack: AbiAcknowledgment): string[] {
  const allCount = ack.waived.filter((w) => w.by === 'all').length
  return [
    ...(ack.waiveAll ? [`WARNING: --accept-removed all waived ${allCount} unlisted removal(s)${allCount === 0 ? ' (nothing to waive: drop the flag)' : ''}`] : []),
    ...ack.unusedWaivers.map((w) => `WARNING: --accept-removed ${w} matched no removal of this run`),
    ...ack.accepted.map((a) => `  ACCEPTED removal (Kyle decision ${a.decision}, ${a.date}) ${a.target}: ${a.signature}`),
    ...ack.waived.map((w) => `  WAIVED removal (--accept-removed ${w.by === 'all' ? 'all' : 'signature'}) ${w.target}: ${w.signature}`),
  ]
}

export type Phase2Options = {
  targets: readonly Phase2Target[]
  /** Push children in their own group even when factory + child fit one group (e.g. if a carrier txn overflows 16). */
  splitChild?: boolean
  /** Push only the children (refused when a live factory cannot create the new child). */
  childOnly?: boolean
  /** Lockstep plugins (`Phase2Target.lockstep`) that are already deployed, by catalog name. */
  lockstepDeployed?: Readonly<Record<string, bigint>>
  /** Deployment receipts of lockstep plugins this run deploys (one file per plugin). */
  manifestDir?: string
  /** Record newly deployed lockstep plugins in the SDK registry (testnet/mainnet). */
  register?: boolean
  confirm: boolean
  /** Resume: the existing proposal that holds this target's UpgradeApp actions (one target only). */
  proposalId?: bigint
  /** Submit a new draft for voting at once (fully initialized DAO); the window assumes it. */
  submit?: boolean
  /** Execution window overrides (rounds). */
  firstValid?: bigint
  windowRounds?: number
  leadRounds?: number
  /** Seconds per round for the vote-end estimate (default: measured from recent blocks). */
  roundSeconds?: number
  /**
   * One-off waiver of removed ARC-4 methods that are NOT in the accepted-decision list (`all` or exact
   * `<Target>:<signature>` entries). Each waived signature is printed; `all` also prints a WARNING.
   */
  acceptRemoved?: readonly string[] | 'all'
  /** Second confirmation (`--i-know`) that a `--confirm` run with `--accept-removed all` requires. */
  confirmWaiveAll?: boolean
  /** Proceed when a live program is not in the deployed-ABI snapshot. */
  acceptUnknownAbi?: boolean
  log?: Log
}

export type Phase2Result = {
  target: string
  appId: bigint
  proposalId?: bigint
  /** `scheduled`: the proposal is executed but its window opens later (resume with the proposal id). */
  status: 'up-to-date' | 'planned' | 'proposed' | 'scheduled' | 'upgraded'
  window?: { firstValid: bigint; lastValid: bigint }
  /** Round of the last confirmed execution group (`upgraded`). */
  confirmedRound?: bigint
}

export async function requirePhase2aDone(ctx: ScriptContext): Promise<void> {
  const pal = await ctx.dao.client.state.global.pluginAppList()
  if (pal?.update !== ctx.updatePlugin.appId) {
    throw new Error(`DAO pal.update is ${pal?.update}, the selected Update plugin is ${ctx.updatePlugin.appId}; run Phase 2a first`)
  }
  if (!(await isPhase2aUpdatePlugin(ctx, ctx.updatePlugin.appId))) {
    throw new Error(`Update plugin ${ctx.updatePlugin.appId} is not a Phase 2a (page-growing, DAO-bound) plugin for DAO ${ctx.dao.appId}; run Phase 2a first`)
  }
  if ((await readDaoBindingMode(ctx)) === undefined) {
    throw new Error(`DAO ${ctx.dao.appId} has neither ${UPGRADE_LEASE_SIGNATURE} nor mustGetExecution + getProposal; the Update plugin cannot bind upgrades on it`)
  }
}

/** Average seconds per round over the last `sample` rounds; `fallback` when the chain cannot tell (LocalNet dev mode). */
export async function measureRoundSeconds(ctx: Pick<ScriptContext, 'algorand'>, sample = 300n, fallback = 2.8): Promise<number> {
  try {
    const last = BigInt((await ctx.algorand.client.algod.status().do()).lastRound)
    if (last <= sample) return fallback
    const [a, b] = await Promise.all([ctx.algorand.client.algod.block(last - sample).do(), ctx.algorand.client.algod.block(last).do()])
    const seconds = Number(BigInt(b.block.header.timestamp) - BigInt(a.block.header.timestamp)) / Number(sample)
    return seconds >= 0.5 && seconds <= 10 ? seconds : fallback
  } catch {
    return fallback
  }
}

/** Whether the DAO wallet's Update grant (global caller, no escrow) counts its windows in rounds. */
async function updateGrantUsesRounds(ctx: ScriptContext): Promise<boolean> {
  const grant = await ctx.dao.wallet.getPluginByKey({ plugin: ctx.updatePlugin.appId, caller: algosdk.ALGORAND_ZERO_ADDRESS_STRING, escrow: '' })
  return grant.useRounds
}

/** Plan the window of a NEW proposal for one target. */
export async function planTargetWindow(ctx: ScriptContext, options: Pick<Phase2Options, 'firstValid' | 'windowRounds' | 'leadRounds' | 'roundSeconds'>): Promise<ExecutionWindow> {
  const voting = (await ctx.dao.client.state.global.getAll()).state === DAO_STATE_FULLY_INITIALIZED
  const settings = voting ? await ctx.dao.client.state.global.upgradeAppProposalSettings() : undefined
  const currentRound = BigInt((await ctx.algorand.client.algod.status().do()).lastRound)
  return planExecutionWindow({
    currentRound,
    voting,
    voteDurationSeconds: BigInt(settings?.duration ?? 0n),
    roundSeconds: options.roundSeconds ?? (voting ? await measureRoundSeconds(ctx) : 2.8),
    firstValid: options.firstValid,
    windowRounds: options.windowRounds,
    leadRounds: options.leadRounds,
  })
}

/**
 * The proposal read of the Update plugin (DAO without `isUpgradeLease`): the id of the proposal that
 * will carry (or carries) the groups, and per group the recorded lease bytes when resuming.
 */
export type ProposalBinding = { proposalId: bigint; leases?: readonly Uint8Array[] }

/** Build the execution groups of one target, in send order (the factory before its child). */
export async function buildTargetExecutions(ctx: ScriptContext, p: TargetPlan, lease: (index: number) => string,
  window: Pick<ExecutionWindow, 'firstValid' | 'windowRounds'> = { firstValid: 0n, windowRounds: 2_000 },
  binding?: ProposalBinding): Promise<ExecutionBuildGroup[]> {
  if (!p.groups) return []
  const version = ctx.options.version
  const windowSize = windowSizeArg(window.windowRounds, await updateGrantUsesRounds(ctx))
  const executions: ExecutionBuildGroup[] = []
  for (let i = 0; i < p.groups.groups.length; i++) {
    const group = p.groups.groups[i]
    const daoBinding = binding ? { lease: binding.leases?.[i] ?? lease(i), proposalId: binding.proposalId } : undefined
    const calls = []
    if (group.app) {
      calls.push(ctx.updatePlugin.updateApp({
        sender: ctx.sender,
        signer: ctx.signer,
        appId: p.appId,
        version,
        data: p.next.approval,
        clearProgram: p.next.clear,
        ...(p.plan.schemaArgs ?? {}),
        // In a combined group the window stays open for the child push that follows.
        rekeyBack: !group.child,
        daoBinding,
      }))
    }
    if (group.child) {
      calls.push(ctx.updatePlugin.updateFactoryChildContract({
        sender: ctx.sender,
        signer: ctx.signer,
        factoryAppId: p.appId,
        version,
        data: p.child!.approval,
        rekeyBack: true,
        daoBinding,
      }))
    }
    executions.push(await ctx.dao.wallet.build.usePlugin({
      sender: ctx.sender,
      signer: ctx.signer,
      lease: lease(i),
      firstValid: window.firstValid,
      windowSize,
      callerType: CallerType.Global,
      calls,
    }))
  }
  return executions
}

async function fundTarget(ctx: ScriptContext, p: TargetPlan, groups: number, log: Log): Promise<void> {
  const pay = async (receiver: string, required: bigint, buffer: bigint, label: string) => {
    const amount = await getAppFundingNeeded(ctx.algorand, receiver, required, buffer)
    if (amount === 0n) return
    await ctx.algorand.send.payment({ sender: ctx.sender, signer: ctx.signer, receiver, amount: microAlgo(amount) })
    log(`  funded ${label} with ${amount} µALGO`)
  }
  const walletMbr = await ctx.dao.wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: BigInt(groups) })
  const sponsor = !p.appUpToDate && p.plan.sizeChange ? p.plan.sponsoredMbrAfter : 0n
  await pay(ctx.dao.wallet.client.appAddress.toString(), sponsor + walletMbr.executions + 2_000_000n, 1_000_000n, 'the DAO wallet (sponsor + execution keys)')
  // usePlugin simulates as the DAO wallet admin before the proposal authorizes the real caller.
  const admin = await ctx.dao.wallet.client.state.global.admin()
  if (!admin) throw new Error('DAO wallet admin is missing')
  await pay(admin, 5_000_000n, 1_000_000n, 'the DAO wallet admin (simulation fee headroom)')
  const staged = Math.max(p.appUpToDate ? 0 : p.next.approval.length, p.child && !p.childUpToDate ? p.child.approval.length : 0)
  await pay(ctx.updatePlugin.client.appAddress.toString(), boxMbr(BOXED_CONTRACT_KEY.length, staged), 0n, 'the Update plugin (staging box)')
  if (p.child && !p.childUpToDate) {
    await pay(algosdk.getApplicationAddress(p.appId).toString(), boxMbr(BOXED_CONTRACT_KEY.length, p.child.approval.length), 0n, `${p.target.name} (child box)`)
  }
}

async function verifyTarget(ctx: ScriptContext, p: TargetPlan): Promise<void> {
  const live = await readLiveApp(ctx, p.appId)
  if (!p.appUpToDate) {
    if (!sameBytes(live.approval, p.next.approval) || !sameBytes(live.clear, p.next.clear)) {
      throw new Error(`${p.target.name}: approval/clear bytecode verification failed`)
    }
    if (live.extraProgramPages !== p.plan.extraPagesAfter || live.globalInts !== p.plan.globalIntsAfter || live.globalBytes !== p.plan.globalBytesAfter) {
      throw new Error(`${p.target.name}: pages/schema are ${live.extraProgramPages} ${live.globalInts}/${live.globalBytes}, expected ` +
        `${p.plan.extraPagesAfter} ${p.plan.globalIntsAfter}/${p.plan.globalBytesAfter}`)
    }
    const state = await ctx.algorand.app.getGlobalState(p.appId)
    if (state.version?.value !== ctx.options.version) throw new Error(`${p.target.name}: version is ${state.version?.value}`)
  }
  if (p.child && !p.childUpToDate && !sameBytes(await readFactoryChild(ctx, p.appId), p.child.approval)) {
    throw new Error(`${p.target.name}: staged child ${p.child.name} does not match the artifact`)
  }
}

type UpgradeAction = { app: bigint; executionKey: Uint8Array; groups: Uint8Array[]; firstValid: bigint; lastValid: bigint }

/**
 * Fund, build, propose (or resume `proposalId`), execute, send and verify one target's plan.
 *
 * Before DAO initialization the proposal is executed at once. On a voting DAO the window is placed
 * around the estimated end of the vote (`planExecutionWindow`) and the target is reported `proposed`:
 * after the vote passes, re-run with the proposal id. A resumed or freshly executed proposal whose
 * window has not opened yet is reported `scheduled` (re-run with the proposal id once it opens).
 */
export async function executeTargetPlan(ctx: ScriptContext, p: TargetPlan,
  options: { proposalId?: bigint; submit?: boolean; log?: Log } & Pick<Phase2Options, 'firstValid' | 'windowRounds' | 'leadRounds' | 'roundSeconds'> = {}): Promise<Phase2Result> {
  const log = options.log ?? defaultLog
  if (!p.groups) return { target: p.target.name, appId: p.appId, status: 'up-to-date' }
  const daoState = (await ctx.dao.client.state.global.getAll()).state
  log(`\n${p.target.name}: funding, building ${p.groups.groups.length} execution group(s)`)
  await fundTarget(ctx, p, p.groups.groups.length, log)
  const stamp = Date.now() % 1_000_000
  const lease = (i: number) => `${p.target.leasePrefix}_${i}_${stamp}`

  let proposalId = options.proposalId
  let executions: ExecutionBuildGroup[]
  if (proposalId !== undefined) {
    const proposal = await ctx.dao.getProposal(proposalId)
    const upgrades = proposal.actions.filter((a) => a.type === ProposalActionEnum.UpgradeApp && a.app === p.appId) as unknown as UpgradeAction[]
    if (upgrades.length !== p.groups.groups.length) throw new Error(`Proposal ${proposalId} has ${upgrades.length} UpgradeApp action(s) for ${p.appId}, expected ${p.groups.groups.length}`)
    // Rebuild with the recorded window (so each rebuilt execution has as many groups as the action),
    // the recorded lease and, for the proposal read, this proposal's boxes.
    const proposalRead = (await readDaoBindingMode(ctx)) === 'proposal'
    executions = []
    for (let i = 0; i < upgrades.length; i++) {
      // The wallet's execution box reference ('x' + lease) is part of the hashed group, so the rebuild
      // must use the recorded lease, not a fresh stamp (`restampExecution` only fixes txn[0].lease).
      const recorded = recordedLease(upgrades[i].executionKey)
      const [execution] = await buildTargetExecutions(ctx, { ...p, groups: { ...p.groups, groups: [p.groups.groups[i]] } }, () => recorded,
        { firstValid: upgrades[i].firstValid, windowRounds: roundsForGroups(upgrades[i].groups.length) },
        proposalRead ? { proposalId, leases: [upgrades[i].executionKey] } : undefined)
      restampExecution(execution, upgrades[i])
      executions.push(execution)
    }
    if (proposal.status !== PROPOSAL_STATUS_EXECUTED) {
      await executeProposal(ctx.dao, proposalId)
      log(`  executed proposal ${proposalId}`)
    }
  } else {
    const window = await planTargetWindow(ctx, options)
    // The proposal read references the proposal box, so its id is fixed before the groups are built:
    // the DAO assigns the next `proposal_id`. Checked after creation (a concurrent proposal would take it).
    const proposalRead = (await readDaoBindingMode(ctx)) === 'proposal'
    const predictedId = proposalRead ? await ctx.dao.client.state.global.proposalId() : undefined
    if (proposalRead && predictedId === undefined) throw new Error('DAO proposal_id is not readable')
    executions = await buildTargetExecutions(ctx, p, lease, window, predictedId !== undefined ? { proposalId: predictedId } : undefined)
    const actions: ProposalAction<SDKClient>[] = executions.map((e) => ({
      type: ProposalActionEnum.UpgradeApp,
      app: p.appId,
      executionKey: e.lease,
      groups: e.ids,
      firstValid: e.firstValid,
      lastValid: e.lastValid,
    }))
    // The Update plugin reads the proposal through DAO.getProposal on every execution-key upgrade.
    const returnSize = proposalReturnSize(executions.map((e) => upgradeActionDataLength(e.ids.length)))
    if (returnSize > MAX_LOG_SIZE) {
      throw new Error(`${p.target.name}: the UpgradeApp proposal would return ${returnSize} B from getProposal (max ${MAX_LOG_SIZE}); use a shorter --window-rounds`)
    }
    const cost = await ctx.dao.proposalCost({ sender: ctx.sender, signer: ctx.signer, actions })
    const daoFunding = await getAppFundingNeeded(ctx.algorand, ctx.dao.client.appAddress.toString(), cost.total + 1_000_000n)
    if (daoFunding > 0n) await ctx.algorand.send.payment({ sender: ctx.sender, signer: ctx.signer, receiver: ctx.dao.client.appAddress, amount: microAlgo(daoFunding) })
    proposalId = (await ctx.dao.newProposal({ actions })).return
    if (proposalId === undefined) throw new Error('UpgradeApp proposal creation returned no id')
    if (predictedId !== undefined && proposalId !== predictedId) {
      throw new Error(`${p.target.name}: proposal ${proposalId} was created, but its groups reference proposal ${predictedId} ` +
        '(another proposal was created in between); delete the draft and run again')
    }
    const span = `rounds ${executions[0].firstValid}-${executions[executions.length - 1].lastValid}`
    if (daoState !== DAO_STATE_FULLY_INITIALIZED) {
      await executeProposal(ctx.dao, proposalId)
      log(`  created and executed proposal ${proposalId} (window ${span})`)
    } else {
      if (options.submit) {
        await ctx.dao.submitProposal({ sender: ctx.sender, signer: ctx.signer, proposalId })
        log(`  submitted proposal ${proposalId} for voting`)
      } else {
        log('  NOTE: the window assumes the vote starts now; submit the draft right away (or pass --submit)')
      }
      log(`  draft proposal ${proposalId}: execution window ${span} (vote ends ~round ${window.voteEndRound}).` +
        ` After approval re-run with --target ${p.target.name} --proposal-id ${proposalId} inside the window`)
      return { target: p.target.name, appId: p.appId, proposalId, status: 'proposed', window: { firstValid: executions[0].firstValid, lastValid: executions[executions.length - 1].lastValid } }
    }
  }

  const round = BigInt((await ctx.algorand.client.algod.status().do()).lastRound)
  const first = executions[0].firstValid
  const last = executions[executions.length - 1].lastValid
  if (round > last) throw new Error(`${p.target.name}: proposal ${proposalId}'s execution window ${first}-${last} has expired (round ${round}); propose again`)
  if (round < first) {
    log(`  the execution window opens at round ${first} (now ${round}); re-run with --target ${p.target.name} --proposal-id ${proposalId} then`)
    return { target: p.target.name, appId: p.appId, proposalId, status: 'scheduled', window: { firstValid: first, lastValid: last } }
  }
  let confirmedRound: bigint | undefined
  for (const execution of executions) {
    const sent = await execution.send()
    confirmedRound = sent.confirmations[0]?.confirmedRound
    log(`  group confirmed in round ${confirmedRound}`)
  }
  await verifyTarget(ctx, p)
  log(`  verified ${p.target.name}`)
  return { target: p.target.name, appId: p.appId, proposalId, status: 'upgraded', confirmedRound }
}

/** Phase 2: upgrade each target through UpgradeApp proposals (one proposal per target). */
export async function runPhase2(ctx: ScriptContext, options: Phase2Options): Promise<Phase2Result[]> {
  const log = options.log ?? defaultLog
  if (options.proposalId !== undefined && options.targets.length !== 1) throw new Error('--proposal-id resumes exactly one target')
  const plans: TargetPlan[] = []
  for (const target of options.targets) plans.push(await planTarget(ctx, target, { splitChild: options.splitChild, childOnly: options.childOnly }))
  const blockers = plans.flatMap((p) => p.blockers)
  log(`Phase 2 plan on ${ctx.options.network} (version ${ctx.options.version}):`)
  for (const p of plans) for (const line of describeTargetPlan(p)) log(`  ${line}`)
  const sponsor = sponsorFunding(plans.filter((p) => !p.appUpToDate).map((p) => p.plan))
  log(`  DAO wallet sponsorship for these upgrades: ${sponsor} µALGO`)

  if (ctx.options.dryRun || !options.confirm) {
    try {
      for (const line of describeAbiAcknowledgment(assertAbiAcknowledged(plans, { removed: options.acceptRemoved, unknownAbi: options.acceptUnknownAbi }))) log(line)
    } catch (error) {
      log(`  WOULD REFUSE: ${(error as Error).message}`)
    }
    if (blockers.length > 0) log(`  WOULD REFUSE:\n    ${blockers.join('\n    ')}`)
    log(`${ctx.options.dryRun ? 'DRY RUN' : 'PLAN ONLY'} - no proposal was created`)
    return plans.map((p) => ({ target: p.target.name, appId: p.appId, status: p.groups ? 'planned' : 'up-to-date' }))
  }
  if (options.acceptRemoved === 'all' && !options.confirmWaiveAll) {
    throw new Error('--accept-removed all with --confirm also needs --i-know (it waives every unlisted ABI removal); prefer --accept-removed <Target>:<signature>')
  }
  for (const line of describeAbiAcknowledgment(assertAbiAcknowledged(plans, { removed: options.acceptRemoved, unknownAbi: options.acceptUnknownAbi }))) log(line)
  if (blockers.length > 0) throw new Error(`Phase 2 refused:\n  ${blockers.join('\n  ')}`)
  await requirePhase2aDone(ctx)
  const results: Phase2Result[] = []
  for (const p of plans) {
    const lockstep = p.groups ? lockstepPlugins(p.target) : []
    if (lockstep.length === 0) {
      results.push(await executeTargetPlan(ctx, p, { ...options, log }))
      continue
    }
    // ROLLOUT-2 / MISC-6: the deployed plugin breaks at this upgrade. Deploy its new version first; swap the
    // DAO grants of each new version as soon as its target can serve it (before the upgrade when it already
    // can, otherwise right after the upgrade executes).
    const deployed = await deployPlugins(ctx, lockstep, { deployed: options.lockstepDeployed, manifestDir: options.manifestDir, register: options.register, confirm: true })
    const { beforeUpgrade, afterUpgrade: after } = splitLockstep(lockstep, await readDependencies(ctx, lockstep.flatMap((plugin) => plugin.dependencies)))
    if (beforeUpgrade.length > 0) await runPhase3(ctx, { plugins: beforeUpgrade, deployed, swap: true, confirm: true, submit: options.submit, log })
    const result = await executeTargetPlan(ctx, p, { ...options, log })
    results.push(result)
    if (after.length === 0) continue
    if (result.status === 'upgraded') {
      await runPhase3(ctx, { plugins: after, deployed, swap: true, confirm: true, submit: options.submit, log })
    } else {
      const ids = after.map((plugin) => `${plugin.catalog}=${deployed[plugin.catalog]}`).join(',')
      log(`  once ${p.target.name} is upgraded, swap the grants at once: principal-phase3-plugins.ts --plugin ${after.map((plugin) => plugin.catalog).join(',')} --deployed ${ids} --swap --confirm`)
    }
  }
  return results
}

// ── Phase 3 ────────────────────────────────────────────────────────────────────────────────────

export type Phase3Options = {
  plugins: readonly Phase3Plugin[]
  /** Already-deployed new versions by catalog name; the others are deployed from the catalog. */
  deployed?: Readonly<Record<string, bigint>>
  manifestDir?: string
  register?: boolean
  /** Swap the DAO wallet's grants after deployment. */
  swap: boolean
  unnameAliases?: boolean
  /** Add `PHASE3_NEW_METHODS` (setMetaWallet) to method-restricted grants. */
  addNewMethods?: boolean
  confirm: boolean
  submit?: boolean
  sourceLink?: string
  /** Deploy and swap although a dependency still runs code the new plugin cannot call (explicit override). */
  allowUnupgradedTargets?: boolean
  log?: Log
}

export type Phase3Result = { deployed: Record<string, bigint>; gaps: Phase3Gap[]; migration?: RunMigrationResult }

/** Read the program each Phase 3 dependency runs on this network (see `Phase3Dependency`). */
export async function readPhase3Dependencies(ctx: ScriptContext, plugins: readonly Phase3Plugin[]): Promise<Record<string, { appId?: bigint; program?: Uint8Array }>> {
  return readDependencies(ctx, plugins.flatMap((p) => p.dependencies))
}

/** Read the program each dependency runs on this network (a singleton, a factory's staged child, or a DAO app-list entry). */
export async function readDependencies(ctx: ScriptContext, dependencies: readonly Phase3Dependency[]): Promise<Record<string, { appId?: bigint; program?: Uint8Array }>> {
  const live: Record<string, { appId?: bigint; program?: Uint8Array }> = {}
  const appIds = ctx.appIds as unknown as Record<string, bigint | undefined>
  for (const dependency of dependencies) {
    if (live[dependency.name]) continue
    let appId: bigint | undefined
    let program: Uint8Array | undefined
    if (dependency.akitaAppList) {
      appId = ((await ctx.dao.client.state.global.akitaAppList()) as unknown as Record<string, bigint> | undefined)?.[dependency.akitaAppList]
    } else {
      appId = appIds[(dependency.appIdKey ?? dependency.childOf)!]
    }
    if (appId && appId > 0n) {
      try {
        program = dependency.childOf ? await readFactoryChild(ctx, appId) : (await readLiveApp(ctx, appId)).approval
      } catch { /* deleted or never created */ }
    }
    live[dependency.name] = { appId, program }
  }
  return live
}

/**
 * Phase 3 runs only after Phase 2 (spec §7.1): every method a new plugin calls on a singleton, on the
 * child program a factory stages for new children, or on the DAO's Gate must exist in the live program.
 * Otherwise the swap would replace working grants with grants that revert. `allowUnupgradedTargets`
 * overrides (logged). Returns the gaps found.
 */
export async function assertPhase3Ready(ctx: ScriptContext, plugins: readonly Phase3Plugin[], options: { allow?: boolean; dryRun?: boolean; log?: Log } = {}): Promise<Phase3Gap[]> {
  const log = options.log ?? defaultLog
  const gaps = phase3Gaps(plugins, await readPhase3Dependencies(ctx, plugins))
  if (gaps.length === 0) {
    log('Phase 3 dependencies: every method the new plugins call exists on the live apps')
    return gaps
  }
  const lines = gaps.map((g) => `${g.plugin} -> ${g.dependency}${g.appId ? ` ${g.appId}` : ''}: ${g.missing === 'not deployed' ? 'not deployed / nothing staged' : `missing ${g.missing.join(', ')}`}`)
  const message = `Phase 2 has not landed for the new plugins (they would revert):\n  ${lines.join('\n  ')}`
  if (options.dryRun) log(`WOULD REFUSE: ${message}`)
  else if (options.allow) log(`WARNING (--allow-unupgraded-targets): ${message}`)
  else throw new Error(`${message}\nRun Phase 2 first, or pass --allow-unupgraded-targets to override`)
  return gaps
}

/** Deploy each plugin from the immutable catalog unless `deployed` names it; returns every id. */
export async function deployPlugins(ctx: ScriptContext, plugins: readonly Phase3Plugin[],
  options: { deployed?: Readonly<Record<string, bigint>>; manifestDir?: string; register?: boolean; confirm: boolean }): Promise<Record<string, bigint>> {
  const deployed: Record<string, bigint> = { ...(options.deployed ?? {}) }
  for (const plugin of plugins) {
    if (deployed[plugin.catalog] !== undefined) continue
    const config: Record<string, string> = {}
    if (plugin.factoryKey) {
      const factory = ctx.appIds[plugin.factoryKey]
      if (!factory || factory <= 0n) throw new Error(`${plugin.catalog} needs the ${plugin.factoryKey} app id`)
      config.factory = factory.toString()
    }
    if (!ctx.options.dryRun && !options.confirm) throw new Error('Pass --confirm to deploy the Phase 3 plugins')
    const manifest = options.manifestDir ? `${options.manifestDir.replace(/\/$/, '')}/${plugin.catalog}.json` : undefined
    const appId = await deployImmutable(ctx, plugin.catalog, config, manifest, Boolean(options.register))
    if (appId !== undefined) deployed[plugin.catalog] = appId
  }
  return deployed
}

export async function runPhase3(ctx: ScriptContext, options: Phase3Options): Promise<Phase3Result> {
  const log = options.log ?? defaultLog
  // Checked before any deploy and before the swap: both are pointless (the swap harmful) before Phase 2.
  const gaps = await assertPhase3Ready(ctx, options.plugins, { allow: options.allowUnupgradedTargets, dryRun: ctx.options.dryRun, log })
  const deployed = await deployPlugins(ctx, options.plugins, options)
  if (!options.swap) return { deployed, gaps }

  const replacements: GrantReplacement[] = []
  for (const plugin of options.plugins) {
    const to = deployed[plugin.catalog]
    // A plugin with no earlier version (e.g. WelcomePlugin) has no DAO grant to replace.
    if (!plugin.registryKey || !(PLUGIN_APP_ID_KEYS as readonly string[]).includes(plugin.registryKey) || to === undefined) continue
    // LocalNet has no SDK registry history: replace the version the context names.
    const from = ctx.options.network === 'localnet' ? (ctx.appIds as unknown as Record<string, bigint>)[plugin.registryKey] : undefined
    if (ctx.options.network === 'localnet' && (!from || from <= 0n)) continue
    replacements.push({ key: plugin.registryKey, from, to })
  }
  if (replacements.length === 0) {
    log('No grant replacements to plan (no deployed plugin ids yet)')
    return { deployed, gaps }
  }
  const migration = await runMigration(ctx, {
    effectiveSender: ctx.options.dryRun ? (await ctx.algorand.app.getById(ctx.dao.appId)).creator.toString() : ctx.sender,
    filters: replacements.map((r) => r.key),
    sourceLink: options.sourceLink,
    replacements,
    unnameAliases: options.unnameAliases,
    addMethods: options.addNewMethods ? PHASE3_NEW_METHODS : {},
    confirm: options.confirm,
    submit: options.submit,
    log,
  })
  log('\nUser wallets are not migrated by governance: ship the new ids in the SDK registry so getPluginUpdate')
  log('flags stale grants, and the frontend builds arc58_removePlugin + arc58_addPlugin (spec §7.3).')
  return { deployed, gaps, migration }
}

export { PHASE2_TARGETS, PHASE3_PLUGINS }

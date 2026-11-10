/**
 * Planning logic for the principal-resolution rollout, Phases 2a, 2 and 3
 * (docs/principal-resolution/PHASE-0-SPEC.md §7.1). Pure functions only: no network, no signing.
 * The governance flows that use them live in `principal-rollout-run.ts`.
 *
 * The page and schema rules mirror `UpdateAkitaDAOPlugin.pushUpdate`
 * (`smart_contracts/arc58/plugins/update-akita-dao/contract.algo.ts`) and `utils/programs.ts`.
 * The size-sponsor rules mirror go-algorand `ledger/apply/application.go` `updateApplication`
 * (consensus v42, `AppSizeUpdates`): an update that sets `extraProgramPages` or a global schema is a
 * size change. The update's sender then becomes the app's size sponsor and carries the MBR of the app's
 * extra pages and global schema. The base page stays with the creator.
 */
import fs from 'node:fs'
import path from 'node:path'
import { createHash } from 'node:crypto'
import algosdk from 'algosdk'
import type { ExecutionBuildGroup } from 'akita-sdk/wallet'

// ── AVM and protocol constants ──────────────────────────────────────────────────────────────────

/** One program page (`MaxAppProgramLen` and `MaxAppTotalProgramLen`). */
export const PROGRAM_PAGE_SIZE = 2_048
/** AVM 13: the base page plus 7 extra pages (`utils/programs.ts` `MAX_PROGRAM_TOTAL_PAGES`). */
export const MAX_TOTAL_PAGES = 8
/** Largest approval program the deployed (HEAD) update plugin can push: two 4,096-byte chunks, no page growth. */
export const LEGACY_UPDATE_PLUGIN_MAX_APPROVAL = 8_192
/** Maximum group size (top level). */
export const MAX_GROUP_SIZE = 16
/** Upload chunk of `UpdateAkitaDAOPlugin.loadBoxedContract` (2,048 B of args minus 22 B of ABI overhead). */
export const PLUGIN_UPLOAD_CHUNK = 2_026
/** Chunk of the factory's `loadBoxedContract` (inner calls from `updateFactoryChildContract`). */
export const FACTORY_UPLOAD_CHUNK = 2_032
/** MBR per extra program page, per global uint and per global byte slice (µALGO). */
export const EXTRA_PAGE_MBR = 100_000n
export const GLOBAL_UINT_MBR = 28_500n
export const GLOBAL_BYTES_MBR = 50_000n
/** Box key of the staged program, in the update plugin and in every factory (`BoxKeyBoxedContract`). */
export const BOXED_CONTRACT_KEY = 'bc'

/**
 * The tree DAO's lease index (DAO-03). The Phase 2a Update plugin reads it by default (box
 * `'u' + itob(target)`, which the SDK references from the target alone). The deployed MainNet DAO
 * does NOT have it; there the plugin reads the proposal instead (`DAO_UPGRADE_BINDING_SIGNATURES`).
 */
export const UPGRADE_LEASE_SIGNATURE = 'isUpgradeLease(uint64,byte[32])bool'

/**
 * The DAO methods of the plugin's proposal read (selected by the SDK's `daoBinding` note): the
 * (proposal, action) that registered the lease, then that UpgradeApp action, which must name the
 * target. Both exist, with these exact signatures, on the deployed MainNet DAO (HEAD `e7f174ee`) and
 * on this tree's DAO.
 */
export const DAO_UPGRADE_BINDING_SIGNATURES = [
  'mustGetExecution(byte[32])(uint64,uint64)',
  'getProposal(uint64)(uint8,byte[36],(uint64,uint64,uint64),address,uint64,uint64,uint64,(uint8,byte[])[])',
] as const

/**
 * What identifies the Phase 2a Update plugin by behaviour (not by an exact artifact hash): it grows the
 * schema (`updateAppWithSchema`) and can bind upgrades through either DAO read, whose selectors the
 * puya router embeds as inner-call constants.
 */
export const PHASE2A_PLUGIN_SIGNATURES = [
  'updateAppWithSchema(uint64,bool,uint64,uint64,uint64)void',
  'setClearProgram(uint64,bool,byte[])void',
  UPGRADE_LEASE_SIGNATURE,
  ...DAO_UPGRADE_BINDING_SIGNATURES,
] as const

/** The Phase 2a markers a program lacks (empty = it is a Phase 2a Update plugin). */
export function missingPhase2aMarkers(program: Uint8Array): string[] {
  return PHASE2A_PLUGIN_SIGNATURES.filter((signature) => !programHasSelector(program, signature))
}

/** The proposal-read methods a DAO program lacks. */
export function missingDaoBindingMethods(daoProgram: Uint8Array): string[] {
  return DAO_UPGRADE_BINDING_SIGNATURES.filter((signature) => !programHasSelector(daoProgram, signature))
}

/**
 * How the Phase 2a plugin can bind upgrades on a DAO: `lease` (the DAO has `isUpgradeLease`; groups
 * need only the target's box), `proposal` (the deployed DAO: groups carry the SDK `daoBinding` note and
 * the execution and proposal boxes, so the proposal id must be known when the group is built), or
 * undefined (neither: no upgrade could pass).
 */
export function daoBindingMode(daoProgram: Uint8Array): 'lease' | 'proposal' | undefined {
  if (programHasSelector(daoProgram, UPGRADE_LEASE_SIGNATURE)) return 'lease'
  return missingDaoBindingMethods(daoProgram).length === 0 ? 'proposal' : undefined
}

/** AVM `MaxLogSize`: an ABI return value (4-byte prefix + encoding) must fit one log entry. */
export const MAX_LOG_SIZE = 1_024

/**
 * Size of the ABI return of `DAO.getProposal` for a proposal whose actions carry `dataLengths` bytes
 * of data each. In the proposal read the Update plugin calls it on every execution-key upgrade, so an
 * UpgradeApp proposal whose return exceeds `MAX_LOG_SIZE` could never be executed that way.
 *
 * ProposalDetails head: status 1 + cid 36 + votes 24 + creator 32 + votingTs/created/feesPaid 24 +
 * actions offset 2 = 119; plus the 4-byte return prefix and the actions length (2). Each action adds
 * an offset (2), its type (1), its data offset (2), the data length (2) and the data.
 */
export function proposalReturnSize(dataLengths: readonly number[]): number {
  return 4 + 119 + 2 + dataLengths.reduce((sum, length) => sum + 7 + length, 0)
}

/** ARC-4 length of a `ProposalUpgradeApp` with `groups` group ids: 8 + 32 + 2 + 8 + 8 + 2 + 32·groups. */
export function upgradeActionDataLength(groups: number): number {
  return 60 + 32 * groups
}

/** Box MBR for a box with a `keyLength`-byte name and `size`-byte value. */
export function boxMbr(keyLength: number, size: number): bigint {
  return 2_500n + 400n * BigInt(keyLength + size)
}

/** sha256 hex of a program (the hash `deployImmutable` writes into receipts). */
export function programHash(program: Uint8Array): string {
  return createHash('sha256').update(program).digest('hex')
}

/** First 4 bytes of sha512_256(signature). */
export function selectorOf(signature: string): Uint8Array {
  return algosdk.ABIMethod.fromSignature(signature).getSelector()
}

/**
 * True if `program` contains the ARC-4 selector of `signature`. The puya router embeds every
 * selector as a constant, so a contract that implements the method always contains it. A 4-byte
 * match by chance is possible in principle, so use this only to detect a MISSING method.
 */
export function programHasSelector(program: Uint8Array, signature: string): boolean {
  const selector = Buffer.from(selectorOf(signature))
  return Buffer.from(program).indexOf(selector) >= 0
}

// ── Artifacts ──────────────────────────────────────────────────────────────────────────────────

export const artifactsRoot = path.resolve(__dirname, '../../smart_contracts/artifacts')

export type CompiledProgram = {
  name: string
  approval: Uint8Array
  clear: Uint8Array
  globalInts: number
  globalBytes: number
  /** AVM version byte of the approval program. */
  avmVersion: number
}

/** Load a compiled contract from its ARC-56 artifact (path relative to `smart_contracts/artifacts`). */
export function loadCompiled(relative: string): CompiledProgram {
  const spec = JSON.parse(fs.readFileSync(path.join(artifactsRoot, relative), 'utf8'))
  if (!spec.byteCode?.approval || !spec.byteCode?.clear) throw new Error(`${relative}: no compiled bytecode`)
  const approval = new Uint8Array(Buffer.from(spec.byteCode.approval, 'base64'))
  const clear = new Uint8Array(Buffer.from(spec.byteCode.clear, 'base64'))
  return {
    name: spec.name,
    approval,
    clear,
    globalInts: Number(spec.state?.schema?.global?.ints ?? 0),
    globalBytes: Number(spec.state?.schema?.global?.bytes ?? 0),
    avmVersion: approval[0],
  }
}

// ── Page, schema and sponsor planning ──────────────────────────────────────────────────────────

/** The live parameters of an app that an update changes. */
export type LiveApp = {
  approvalSize: number
  clearSize: number
  extraProgramPages: number
  globalInts: number
  globalBytes: number
}

/** Extra pages a program pair needs (`utils/programs.ts` `programExtraPages(…, 0)`). Throws above 8 pages. */
export function neededExtraPages(approvalSize: number, clearSize: number): number {
  const pages = Math.ceil((approvalSize + clearSize) / PROGRAM_PAGE_SIZE)
  if (pages > MAX_TOTAL_PAGES) {
    throw new Error(`program pair of ${approvalSize + clearSize} B needs ${pages} pages; the AVM allows ${MAX_TOTAL_PAGES}`)
  }
  return pages > 0 ? pages - 1 : 0
}

/** The MBR a size sponsor carries for an app: extra pages plus global schema (never the base page). */
export function sponsoredMbr(extraPages: number, globalInts: number, globalBytes: number): bigint {
  return EXTRA_PAGE_MBR * BigInt(extraPages) + GLOBAL_UINT_MBR * BigInt(globalInts) + GLOBAL_BYTES_MBR * BigInt(globalBytes)
}

/** go-algorand `WellSizedPrograms`: the pair fits `1 + extraPages` pages. */
export function fitsPages(approvalSize: number, clearSize: number, extraPages: number): boolean {
  const limit = (1 + extraPages) * PROGRAM_PAGE_SIZE
  return approvalSize <= limit && clearSize <= limit && approvalSize + clearSize <= limit
}

export type UpdatePlan = {
  /** Extra pages the new plugin sets (0 = no page change). Mirrors `extraPagesToGrow`. */
  growTo: number
  extraPagesAfter: number
  globalIntsAfter: number
  globalBytesAfter: number
  /** The update sets pages or schema, so the DAO wallet (the update's sender) becomes the size sponsor. */
  sizeChange: boolean
  /** Pass these to `updateAppWithSchema` (the new program declares more state than the app holds). */
  schemaArgs?: { globalNumUint: bigint; globalNumBytes: bigint }
  /** MBR the size sponsor carries after the update (the DAO wallet when `sizeChange`). */
  sponsoredMbrAfter: bigint
  /** MBR the previous sponsor (usually the creator) carried for pages and schema before the update. */
  sponsoredMbrBefore: bigint
  /** The deployed (HEAD) update plugin could push this program: ≤ 8,192 B and fits the current pages. */
  legacyPluginCanPush: boolean
}

/**
 * Plan one `updateApp`/`updateAppWithSchema` exactly as the new plugin's `pushUpdate` executes it.
 * Pages and schema only ever grow. A page-growing update carries the current (or larger) schema, so
 * an app with global state keeps it.
 */
export function planAppUpdate(live: LiveApp, next: Pick<CompiledProgram, 'approval' | 'clear' | 'globalInts' | 'globalBytes'>): UpdatePlan {
  const needed = neededExtraPages(next.approval.length, next.clear.length)
  const growTo = needed > live.extraProgramPages ? needed : 0
  const globalIntsAfter = Math.max(next.globalInts, live.globalInts)
  const globalBytesAfter = Math.max(next.globalBytes, live.globalBytes)
  const growSchema = globalIntsAfter > live.globalInts || globalBytesAfter > live.globalBytes
  const sizeChange = growSchema || growTo > 0
  const extraPagesAfter = growTo > 0 ? growTo : live.extraProgramPages
  return {
    growTo,
    extraPagesAfter,
    globalIntsAfter,
    globalBytesAfter,
    sizeChange,
    schemaArgs: growSchema ? { globalNumUint: BigInt(next.globalInts), globalNumBytes: BigInt(next.globalBytes) } : undefined,
    sponsoredMbrAfter: sponsoredMbr(extraPagesAfter, globalIntsAfter, globalBytesAfter),
    sponsoredMbrBefore: sponsoredMbr(live.extraProgramPages, live.globalInts, live.globalBytes),
    legacyPluginCanPush: next.approval.length <= LEGACY_UPDATE_PLUGIN_MAX_APPROVAL
      && fitsPages(next.approval.length, next.clear.length, live.extraProgramPages),
  }
}

/** DAO-wallet funding a set of plans needs for sponsorship (the full sponsored MBR of every size change). */
export function sponsorFunding(plans: readonly UpdatePlan[]): bigint {
  return plans.reduce((sum, plan) => sum + (plan.sizeChange ? plan.sponsoredMbrAfter : 0n), 0n)
}

// ── Group planning ─────────────────────────────────────────────────────────────────────────────

/** Top-level txns of an `updateApp` segment: [setClearProgram?] initBoxedContract, loads, updateApp. */
export function appSegmentTxns(approvalSize: number, withClear: boolean): number {
  return (withClear ? 1 : 0) + 1 + Math.ceil(approvalSize / PLUGIN_UPLOAD_CHUNK) + 1
}

/** Top-level txns of an `updateFactoryChildContract` segment: initBoxedContract, loads, push. */
export function childSegmentTxns(childSize: number): number {
  return 1 + Math.ceil(childSize / PLUGIN_UPLOAD_CHUNK) + 1
}

/** Inner txns `updateFactoryChildContract` issues: the factory's initBoxedContract plus its loads. */
export function childInnerTxns(childSize: number): number {
  return 1 + Math.ceil(childSize / FACTORY_UPLOAD_CHUNK)
}

export type GroupPlan = {
  /** Each entry is one execution group (one UpgradeApp action), in send order. */
  groups: Array<{ app: boolean; child: boolean; txns: number }>
  /** The factory upgrade and its child push land in one group (no window with mismatched code). */
  atomic: boolean
}

/**
 * Plan the execution groups for one target. Every group is wrapped by the wallet's
 * `arc58_rekeyToPlugin` and `arc58_verifyAuthAddress` (2 txns). A factory upgrade and its child push go
 * in ONE group when they fit, the factory first: the new factory code receives the child bytecode and
 * no block ever runs a new factory with an old child or the reverse. When they do not fit, the factory
 * goes first and the child follows in the next group (between the two, child creation reverts).
 */
export function planGroups(app: { approvalSize: number; withClear: boolean } | undefined, childSize: number | undefined, forceSplit = false): GroupPlan {
  const wrap = 2
  const appTxns = app ? appSegmentTxns(app.approvalSize, app.withClear) : 0
  const childTxns = childSize !== undefined ? childSegmentTxns(childSize) : 0
  if (!app && childSize === undefined) throw new Error('nothing to upgrade')
  for (const [label, txns] of [['app', appTxns], ['child', childTxns]] as const) {
    if (txns > 0 && wrap + txns > MAX_GROUP_SIZE) {
      throw new Error(`${label} segment needs ${wrap + txns} txns; a group holds ${MAX_GROUP_SIZE}`)
    }
  }
  if (!forceSplit && app && childSize !== undefined && wrap + appTxns + childTxns <= MAX_GROUP_SIZE) {
    return { groups: [{ app: true, child: true, txns: wrap + appTxns + childTxns }], atomic: true }
  }
  const groups: GroupPlan['groups'] = []
  if (app) groups.push({ app: true, child: false, txns: wrap + appTxns })
  if (childSize !== undefined) groups.push({ app: false, child: true, txns: wrap + childTxns })
  return { groups, atomic: groups.length === 1 }
}

// ── Execution windows ──────────────────────────────────────────────────────────────────────────

/** One execution-key group is valid for this many rounds (`WalletSDK.build.usePlugin` `validityPeriod`). */
export const EXECUTION_VALIDITY_PERIOD = 1_000
/** Rounds per second the SDK assumes when a grant counts in seconds (`usePlugin`: `ceil(seconds / 2.7)`). */
export const SDK_SECONDS_PER_ROUND = 2.7
/** Window of an execution that runs at once (DAO before initialization). */
export const DEFAULT_IMMEDIATE_WINDOW_ROUNDS = 2_000
/** Window of an execution that waits for a vote: 10 groups (~7.5 h at 2.7 s per round). */
export const DEFAULT_VOTED_WINDOW_ROUNDS = 10_000
/** The voted window opens this many rounds before the estimated end of the vote (round-time drift). */
export const DEFAULT_VOTED_LEAD_ROUNDS = 2_000

export type ExecutionWindowInput = {
  currentRound: bigint
  /** The DAO votes on proposals (fully initialized); otherwise the proposal executes at once. */
  voting: boolean
  /** Seconds from proposal creation to the earliest execution (the UpgradeApp vote duration). */
  voteDurationSeconds: bigint
  /** Measured (or assumed) seconds per round. */
  roundSeconds: number
  /** Operator overrides. */
  firstValid?: bigint
  windowRounds?: number
  leadRounds?: number
}

export type ExecutionWindow = {
  /** 0 = the SDK's default (the current round). */
  firstValid: bigint
  windowRounds: number
  /** Group ids each UpgradeApp action carries (one per `EXECUTION_VALIDITY_PERIOD` rounds). */
  groups: number
  /** Estimated round at which the vote ends (undefined when the proposal executes at once). */
  voteEndRound?: bigint
}

/**
 * Plan the validity window of a Phase 2 execution. An execution key is a fixed set of group ids, each
 * valid for 1,000 rounds, recorded in the proposal; a vote cannot move it. On a voting DAO the window
 * must therefore open around the END of the vote, not at proposal creation: otherwise it expires
 * while the vote runs (7 days by default, about 224,000 rounds). The window opens `leadRounds` before
 * the estimated vote end and lasts `windowRounds`, so moderate round-time drift still overlaps it.
 */
export function planExecutionWindow(input: ExecutionWindowInput): ExecutionWindow {
  if (input.roundSeconds <= 0) throw new Error('roundSeconds must be positive')
  const voteEndRound = input.voting
    ? input.currentRound + BigInt(Math.ceil(Number(input.voteDurationSeconds) / input.roundSeconds))
    : undefined
  const windowRounds = input.windowRounds ?? (input.voting ? DEFAULT_VOTED_WINDOW_ROUNDS : DEFAULT_IMMEDIATE_WINDOW_ROUNDS)
  if (!Number.isInteger(windowRounds) || windowRounds <= 0) throw new Error('windowRounds must be a positive integer')
  let firstValid = input.firstValid ?? 0n
  if (input.firstValid === undefined && voteEndRound !== undefined) {
    const lead = BigInt(input.leadRounds ?? DEFAULT_VOTED_LEAD_ROUNDS)
    firstValid = voteEndRound - lead > input.currentRound ? voteEndRound - lead : input.currentRound
  }
  if (voteEndRound !== undefined && firstValid !== 0n && firstValid + BigInt(windowRounds) <= voteEndRound) {
    throw new Error(`the execution window ${firstValid}-${firstValid + BigInt(windowRounds)} closes before the vote ends (~round ${voteEndRound})`)
  }
  return { firstValid, windowRounds, groups: Math.ceil(windowRounds / EXECUTION_VALIDITY_PERIOD), voteEndRound }
}

/**
 * The `windowSize` argument for `usePlugin` that yields `rounds` rounds. A grant that counts in rounds
 * takes rounds; one that counts in seconds takes seconds, which the SDK converts with
 * `ceil(seconds / 2.7)`. Returns the smallest such seconds value (the conversion is monotonic and
 * steps by at most one round per second, so it lands on `rounds` exactly).
 */
export function windowSizeArg(rounds: number, useRounds: boolean): bigint {
  if (useRounds) return BigInt(rounds)
  let seconds = Math.max(1, Math.floor((rounds - 1) * SDK_SECONDS_PER_ROUND))
  while (Math.ceil(seconds / SDK_SECONDS_PER_ROUND) < rounds) seconds++
  while (seconds > 1 && Math.ceil((seconds - 1) / SDK_SECONDS_PER_ROUND) >= rounds) seconds--
  return BigInt(seconds)
}

/** Rounds that make `usePlugin` build exactly `groups` windows (the middle of the bucket). */
export function roundsForGroups(groups: number): number {
  if (!Number.isInteger(groups) || groups <= 0) throw new Error('groups must be a positive integer')
  return groups * EXECUTION_VALIDITY_PERIOD - EXECUTION_VALIDITY_PERIOD / 2
}

// ── ABI compatibility (spec §7.1 point 3: what rides along with Phase 2) ─────────────────────

export type KnownAbi = { contract: string; source: string; signatures: string[] }

/**
 * ARC-4 method signatures of deployed programs, keyed by the sha256 of the approval program. Built from
 * the HEAD (`e7f174ee`) ARC-56 artifacts whose approval hash equals the MainNet program
 * (`fixtures/mainnet-deployed.json`), so it also matches any other network that runs the same bytes.
 */
export function loadKnownAbis(): Record<string, KnownAbi> {
  return JSON.parse(fs.readFileSync(path.join(__dirname, 'principal-deployed-abi.json'), 'utf8')).programs
}

/** ARC-4 signatures of an ARC-56 artifact (path relative to `smart_contracts/artifacts`). */
export function artifactSignatures(relative: string): string[] {
  const spec = JSON.parse(fs.readFileSync(path.join(artifactsRoot, relative), 'utf8'))
  return (spec.methods as Array<{ name: string; args: Array<{ type: string }>; returns: { type: string } }>)
    .map((m) => `${m.name}(${m.args.map((a) => a.type).join(',')})${m.returns.type}`)
}

export type AbiDiff =
  | { known: true; source: string; removed: string[]; added: string[] }
  | { known: false }

/**
 * The methods an upgrade from `liveApproval` to `artifact` removes (callers of these selectors break
 * at once) and adds. `known: false` when the live program is neither a snapshot entry nor the artifact.
 */
export function diffAbi(liveApproval: Uint8Array, artifact: string, known: Record<string, KnownAbi> = loadKnownAbis()): AbiDiff {
  const next = artifactSignatures(artifact)
  const liveHash = programHash(liveApproval)
  const before = known[liveHash]?.signatures
    ?? (liveHash === programHash(loadCompiled(artifact).approval) ? next : undefined)
  if (!before) return { known: false }
  return {
    known: true,
    source: known[liveHash]?.source ?? 'artifact',
    removed: before.filter((s) => !next.includes(s)),
    added: next.filter((s) => !before.includes(s)),
  }
}

/**
 * A method removal Kyle accepted as a decision (spec §9.4), checked in as data
 * (`principal-accepted-abi-removals.json`). Phase 2 lets these through without `--accept-removed`.
 */
export type AcceptedAbiRemoval = {
  /** decision id in spec §9.4, e.g. `K6` */
  decision: string
  /** ISO date of the decision */
  date: string
  /** Phase 2 target name (`Phase2Target.name`) */
  contract: string
  /** sha256 of the deployed approval program that routes the method (a key of the deployed-ABI snapshot) */
  programSha256: string
  /** exact ARC-4 signature */
  signature: string
  note: string
}

export function loadAcceptedAbiRemovals(): AcceptedAbiRemoval[] {
  return JSON.parse(fs.readFileSync(path.join(__dirname, 'principal-accepted-abi-removals.json'), 'utf8')).removals
}

/**
 * The accepted-removal entry for `signature`, removed from the live program `liveSha256` of target
 * `contract`, or undefined. All three must match, so an entry never accepts the same signature on another
 * target or on a program other than the deployed one it was decided for.
 */
export function acceptedRemoval(
  contract: string,
  liveSha256: string,
  signature: string,
  accepted: readonly AcceptedAbiRemoval[] = loadAcceptedAbiRemovals(),
): AcceptedAbiRemoval | undefined {
  return accepted.find((a) => a.contract === contract && a.programSha256 === liveSha256 && a.signature === signature)
}

/**
 * Entries of the accepted-removal list that do not name a method of the deployed snapshot program they
 * cite (a typo there would silently accept nothing). Empty = the list is sound.
 */
export function invalidAcceptedRemovals(
  accepted: readonly AcceptedAbiRemoval[] = loadAcceptedAbiRemovals(),
  known: Record<string, KnownAbi> = loadKnownAbis(),
): string[] {
  const problems: string[] = []
  for (const a of accepted) {
    const program = known[a.programSha256]
    if (!/^(K[0-9]+|[A-Z]+-[0-9]+)$/.test(a.decision) || !/^\d{4}-\d{2}-\d{2}$/.test(a.date)) problems.push(`${a.signature}: bad decision id or date (${a.decision}, ${a.date})`)
    if (!ALL_PHASE2_TARGETS.some((t) => t.name === a.contract)) problems.push(`${a.decision} ${a.signature}: ${a.contract} is not a Phase 2 target`)
    if (!program) problems.push(`${a.decision} ${a.signature}: program ${a.programSha256.slice(0, 12)}… is not in the deployed-ABI snapshot`)
    else if (program.contract !== a.contract) problems.push(`${a.decision} ${a.signature}: program ${a.programSha256.slice(0, 12)}… is ${program.contract}, not ${a.contract}`)
    else if (!program.signatures.includes(a.signature)) problems.push(`${a.decision} ${a.signature}: not a method of the deployed ${a.contract}`)
  }
  return problems
}

/** Selectors of `signatures` that `program` does not contain. */
export function missingSelectors(program: Uint8Array, signatures: readonly string[]): string[] {
  return signatures.filter((signature) => !programHasSelector(program, signature))
}

// ── Phase 2 targets ────────────────────────────────────────────────────────────────────────────

export type Phase2Target = {
  name: string
  /** `getNetworkAppIds()` key of the deployed singleton. */
  appIdKey: 'social' | 'socialGraph' | 'subscriptions' | 'marketplace' | 'stakingPoolFactory' | 'auctionFactory' | 'raffleFactory' | 'walletFactory' | 'dao'
    | 'hyperSwap' | 'pollFactory'
  artifact: string
  leasePrefix: string
  /**
   * The program the factory stages for new children. It always ships with its factory (ACCT-3): a factory
   * paired with a child it cannot create stops all creation. `atomic`: the two must land in one group.
   */
  child?: { name: string; artifact: string; atomic?: boolean }
  /** Apps the pushed programs call: every called selector must be routed live before the push (ROLLOUT-1). */
  dependencies?: readonly Phase3Dependency[]
  /**
   * Catalog names (`LOCKSTEP_PLUGINS`) of plugins whose deployed version breaks at this upgrade. Their new
   * versions are deployed and the DAO wallet grants swapped in the same run (ROLLOUT-2, MISC-6).
   */
  lockstep?: readonly string[]
}

/**
 * Hinted gated paths call `Gate.checkFor`/`mustCheckFor` through `aal.gate`, which the deployed Gate v1 does
 * not route (spec §9.5 step 5, review ROLLOUT-7): Gate v2 must be at `aal.gate` before these programs are pushed.
 */
const GATE_DEPENDENCY = { name: 'Gate (DAO akitaAppList.gate)', artifact: 'gates/Gate.arc56.json', akitaAppList: 'gate' } as const
/**
 * Referral payments create instant disbursements with a reclaim target (the service's DAO escrow), an
 * overload Rewards v1 does not route, and pay the v2 disbursement MBR (54,500, v1 takes 41,700): Rewards v2
 * must be at `aal.rewards` before these programs are pushed.
 */
const REWARDS_DEPENDENCY = { name: 'Rewards (DAO akitaAppList.rewards)', artifact: 'rewards/Rewards.arc56.json', akitaAppList: 'rewards' } as const

/** The singletons Phase 2 upgrades (spec §7.1), with the child bytecode each factory carries. */
export const PHASE2_TARGETS: readonly Phase2Target[] = [
  { name: 'AkitaSocial', appIdKey: 'social', artifact: 'social/AkitaSocial.arc56.json', leasePrefix: 'p2_social', dependencies: [GATE_DEPENDENCY, REWARDS_DEPENDENCY] },
  { name: 'AkitaSocialGraph', appIdKey: 'socialGraph', artifact: 'social/AkitaSocialGraph.arc56.json', leasePrefix: 'p2_graph' },
  { name: 'Subscriptions', appIdKey: 'subscriptions', artifact: 'subscriptions/Subscriptions.arc56.json', leasePrefix: 'p2_subs', dependencies: [GATE_DEPENDENCY, REWARDS_DEPENDENCY] },
  {
    name: 'Marketplace', appIdKey: 'marketplace', artifact: 'marketplace/Marketplace.arc56.json', leasePrefix: 'p2_mkt',
    child: { name: 'Listing', artifact: 'marketplace/Listing.arc56.json' },
    dependencies: [GATE_DEPENDENCY, REWARDS_DEPENDENCY],
  },
  {
    name: 'StakingPoolFactory', appIdKey: 'stakingPoolFactory', artifact: 'staking-pool/StakingPoolFactory.arc56.json', leasePrefix: 'p2_pool',
    child: { name: 'StakingPool', artifact: 'staking-pool/StakingPool.arc56.json' },
    // ROLLOUT-1: new pools call Staking.releaseAppStake and Rewards.closeDisbursement. Upgrade Staking and
    // repoint aal.rewards to Rewards v2 first; the deployed ones do not route them.
    dependencies: [
      { name: 'Staking (DAO akitaAppList.staking)', artifact: 'staking/Staking.arc56.json', akitaAppList: 'staking' },
      REWARDS_DEPENDENCY,
      GATE_DEPENDENCY,
    ],
  },
  {
    name: 'AuctionFactory', appIdKey: 'auctionFactory', artifact: 'auction/AuctionFactory.arc56.json', leasePrefix: 'p2_auc',
    child: { name: 'Auction', artifact: 'auction/Auction.arc56.json' },
    dependencies: [GATE_DEPENDENCY, REWARDS_DEPENDENCY],
  },
  {
    name: 'RaffleFactory', appIdKey: 'raffleFactory', artifact: 'raffle/RaffleFactory.arc56.json', leasePrefix: 'p2_raf',
    child: { name: 'Raffle', artifact: 'raffle/Raffle.arc56.json' },
    dependencies: [GATE_DEPENDENCY, REWARDS_DEPENDENCY],
  },
  {
    // The tree factory creates only the AVM 13 wallet (11-arg create, AVM 13 clear), and the deployed
    // factory cannot create it: the two always land together, in one group (ACCT-3).
    name: 'AbstractedAccountFactory', appIdKey: 'walletFactory', artifact: 'arc58/account/AbstractedAccountFactory.arc56.json', leasePrefix: 'p2_wfac',
    child: { name: 'AbstractedAccount', artifact: 'arc58/account/AbstractedAccount.arc56.json', atomic: true },
    dependencies: [REWARDS_DEPENDENCY],
  },
]

/**
 * The DAO itself, through the Phase 2a plugin (`--target AkitaDAO`; never selected by default). The
 * deployed DAO (7,151 B) cannot run ChangeAdmin and its wallet admin is the DAO app address, so the
 * DAO's own upgrade to this tree (9,738 B, page growth) is an ordinary UpgradeApp execution through
 * the Phase 2a plugin, which binds it with calls the deployed DAO has (`DAO_UPGRADE_BINDING_SIGNATURES`).
 * It is the audit-remediation DAO rollout's step; it may run before or after the Phase 2 singletons.
 */
export const PHASE2_DAO_TARGET: Phase2Target = { name: 'AkitaDAO', appIdKey: 'dao', artifact: 'arc58/dao/AkitaDAO.arc56.json', leasePrefix: 'p2_dao' }

/**
 * Upgrades outside the principal change that break a deployed plugin (`--target` only, never default). They
 * go through the same ABI guard, and their new plugin ships in the same run (`lockstep`).
 */
export const PHASE2_RIDE_ALONG_TARGETS: readonly Phase2Target[] = [
  // ROLLOUT-2: accept() gains the terms hash (C-3); the deployed HyperSwapPlugin calls the old selector.
  { name: 'HyperSwap', appIdKey: 'hyperSwap', artifact: 'hyper-swap/HyperSwap.arc56.json', leasePrefix: 'p2_hs', lockstep: ['HyperSwapPlugin'] },
  // MISC-6: newPollCost now charges the Poll's program pages; the deployed PollPlugin pays one page.
  { name: 'PollFactory', appIdKey: 'pollFactory', artifact: 'poll/PollFactory.arc56.json', leasePrefix: 'p2_poll', lockstep: ['PollPluginContract'] },
]

/** Every app the Phase 2 runner upgrades; the generic `runUpdate` refuses these (ROLLOUT-3). */
export const ALL_PHASE2_TARGETS: readonly Phase2Target[] = [...PHASE2_TARGETS, PHASE2_DAO_TARGET, ...PHASE2_RIDE_ALONG_TARGETS]

export function selectPhase2Targets(names: readonly string[]): Phase2Target[] {
  if (names.length === 0) return [...PHASE2_TARGETS]
  const all = ALL_PHASE2_TARGETS
  return names.map((name) => {
    const target = all.find((t) => t.name.toLowerCase() === name.toLowerCase() || t.appIdKey === name)
    if (!target) throw new Error(`Unknown Phase 2 target ${name}. Choose: ${all.map((t) => t.name).join(', ')}`)
    return target
  })
}

// ── Phase 3 plugins ────────────────────────────────────────────────────────────────────────────

/**
 * An app a Phase 3 plugin calls, which must run the Phase 2 code before the plugin is installed
 * (spec §7.1: a plugin compiled against hinted selectors reverts on an un-upgraded target).
 * `appIdKey`: a Phase 2 singleton; `child`: the program a factory stages for NEW children (live children
 * are not upgraded, Q8); `akitaAppList`: an app the DAO registers (Gate v2 is a separate deployment).
 */
export type Phase3Dependency = {
  name: string
  artifact: string
  appIdKey?: Phase2Target['appIdKey']
  childOf?: Phase2Target['appIdKey']
  akitaAppList?: 'gate' | 'staking' | 'rewards'
}

export type Phase3Plugin = {
  /** Immutable-catalog name (= ARC-56 contract name). */
  catalog: string
  /** ARC-56 artifact of the plugin (path relative to `smart_contracts/artifacts`). */
  artifact: string
  /** SDK key, or null for a plugin without a canonical SDK key. Only plugin-history keys get a grant swap. */
  registryKey: string | null
  /** `getNetworkAppIds()` key of the singleton passed as the plugin's `factory` constructor arg. */
  factoryKey?: 'stakingPoolFactory' | 'auctionFactory' | 'marketplace' | 'raffleFactory' | 'walletFactory' | 'pollFactory'
  /** The apps whose methods the plugin calls (checked before deploy and before the grant swap). */
  dependencies: readonly Phase3Dependency[]
}

const dep = {
  social: { name: 'AkitaSocial', artifact: 'social/AkitaSocial.arc56.json', appIdKey: 'social' },
  graph: { name: 'AkitaSocialGraph', artifact: 'social/AkitaSocialGraph.arc56.json', appIdKey: 'socialGraph' },
  subscriptions: { name: 'Subscriptions', artifact: 'subscriptions/Subscriptions.arc56.json', appIdKey: 'subscriptions' },
  marketplace: { name: 'Marketplace', artifact: 'marketplace/Marketplace.arc56.json', appIdKey: 'marketplace' },
  listing: { name: 'Listing (staged child)', artifact: 'marketplace/Listing.arc56.json', childOf: 'marketplace' },
  poolFactory: { name: 'StakingPoolFactory', artifact: 'staking-pool/StakingPoolFactory.arc56.json', appIdKey: 'stakingPoolFactory' },
  pool: { name: 'StakingPool (staged child)', artifact: 'staking-pool/StakingPool.arc56.json', childOf: 'stakingPoolFactory' },
  auctionFactory: { name: 'AuctionFactory', artifact: 'auction/AuctionFactory.arc56.json', appIdKey: 'auctionFactory' },
  auction: { name: 'Auction (staged child)', artifact: 'auction/Auction.arc56.json', childOf: 'auctionFactory' },
  raffleFactory: { name: 'RaffleFactory', artifact: 'raffle/RaffleFactory.arc56.json', appIdKey: 'raffleFactory' },
  raffle: { name: 'Raffle (staged child)', artifact: 'raffle/Raffle.arc56.json', childOf: 'raffleFactory' },
  walletFactory: { name: 'AbstractedAccountFactory', artifact: 'arc58/account/AbstractedAccountFactory.arc56.json', appIdKey: 'walletFactory' },
  gate: GATE_DEPENDENCY,
} as const satisfies Record<string, Phase3Dependency>

/** The plugin versions Phase 3 deploys (spec §6.11, §7.1). The router ships with the PluginDex stack. */
export const PHASE3_PLUGINS: readonly Phase3Plugin[] = [
  { catalog: 'AkitaSocialPlugin', artifact: 'arc58/plugins/social/AkitaSocialPlugin.arc56.json', registryKey: 'socialPlugin', dependencies: [dep.social, dep.graph, dep.gate] },
  { catalog: 'SubscriptionsPlugin', artifact: 'arc58/plugins/subscriptions/SubscriptionsPlugin.arc56.json', registryKey: 'subscriptionsPlugin', dependencies: [dep.subscriptions] },
  {
    catalog: 'StakingPoolPlugin', artifact: 'arc58/plugins/staking-pool/StakingPoolPlugin.arc56.json', registryKey: 'stakingPoolPlugin', factoryKey: 'stakingPoolFactory',
    dependencies: [dep.poolFactory, dep.pool, dep.gate],
  },
  {
    catalog: 'AuctionPlugin', artifact: 'arc58/plugins/auction/AuctionPlugin.arc56.json', registryKey: 'auctionPlugin', factoryKey: 'auctionFactory',
    dependencies: [dep.auctionFactory, dep.auction],
  },
  {
    catalog: 'MarketplacePlugin', artifact: 'arc58/plugins/marketplace/MarketplacePlugin.arc56.json', registryKey: 'marketplacePlugin', factoryKey: 'marketplace',
    dependencies: [dep.marketplace, dep.listing],
  },
  {
    catalog: 'RafflePlugin', artifact: 'arc58/plugins/raffle/RafflePlugin.arc56.json', registryKey: 'rafflePlugin', factoryKey: 'raffleFactory',
    dependencies: [dep.raffleFactory, dep.raffle],
  },
  { catalog: 'WelcomePlugin', artifact: 'arc58/plugins/welcome/WelcomePlugin.arc56.json', registryKey: 'welcomePlugin', factoryKey: 'walletFactory', dependencies: [dep.walletFactory] },
]

/** New versions of plugins that a Phase 2 ride-along upgrade breaks (`Phase2Target.lockstep`). */
export const LOCKSTEP_PLUGINS: readonly Phase3Plugin[] = [
  {
    catalog: 'HyperSwapPlugin', artifact: 'arc58/plugins/hyper-swap/HyperSwapPlugin.arc56.json', registryKey: 'hyperSwapPlugin',
    dependencies: [{ name: 'HyperSwap', artifact: 'hyper-swap/HyperSwap.arc56.json', appIdKey: 'hyperSwap' }],
  },
  {
    catalog: 'PollPluginContract', artifact: 'arc58/plugins/poll/PollPluginContract.arc56.json', registryKey: 'pollPlugin', factoryKey: 'pollFactory',
    dependencies: [{ name: 'PollFactory', artifact: 'poll/PollFactory.arc56.json', appIdKey: 'pollFactory' }],
  },
]

/**
 * When each lockstep plugin's DAO grants swap: before the upgrade when its new version already works
 * against the live programs (no gap), so the DAO never holds a broken grant; otherwise right after it.
 */
export function splitLockstep(plugins: readonly Phase3Plugin[], live: Readonly<Record<string, { appId?: bigint; program?: Uint8Array }>>) {
  const beforeUpgrade = plugins.filter((plugin) => phase3Gaps([plugin], live).length === 0)
  return { beforeUpgrade, afterUpgrade: plugins.filter((plugin) => !beforeUpgrade.includes(plugin)) }
}

export function lockstepPlugins(target: Phase2Target): Phase3Plugin[] {
  return (target.lockstep ?? []).map((name) => {
    const plugin = LOCKSTEP_PLUGINS.find((p) => p.catalog === name)
    if (!plugin) throw new Error(`${target.name}: unknown lockstep plugin ${name}`)
    return plugin
  })
}

/**
 * The methods of `dependencyArtifact` that the plugin program calls: the plugin embeds the selector of
 * every method it calls as an inner-call constant. (A 4-byte collision can only ADD a requirement.)
 */
export function calledSignatures(pluginProgram: Uint8Array, dependencyArtifact: string): string[] {
  return artifactSignatures(dependencyArtifact).filter((signature) => programHasSelector(pluginProgram, signature))
}

export type Phase3Gap = { plugin: string; dependency: string; appId?: bigint; missing: string[] | 'not deployed' }

/**
 * The calls each plugin would make that its live dependency cannot serve. `live` maps a dependency name
 * to the program it runs on this network (undefined = not deployed / nothing staged).
 */
export function phase3Gaps(plugins: readonly Phase3Plugin[], live: Readonly<Record<string, { appId?: bigint; program?: Uint8Array }>>): Phase3Gap[] {
  return plugins.flatMap((plugin) => dependencyGaps(plugin.catalog, [loadCompiled(plugin.artifact).approval], plugin.dependencies, live))
}

/** The calls `programs` (of `subject`) make that the live programs of their `dependencies` cannot serve. */
export function dependencyGaps(subject: string, programs: readonly Uint8Array[], dependencies: readonly Phase3Dependency[],
  live: Readonly<Record<string, { appId?: bigint; program?: Uint8Array }>>): Phase3Gap[] {
  const gaps: Phase3Gap[] = []
  for (const dependency of dependencies) {
    const required = [...new Set(programs.flatMap((program) => calledSignatures(program, dependency.artifact)))]
    if (required.length === 0) continue
    const current = live[dependency.name]
    if (!current?.program) {
      gaps.push({ plugin: subject, dependency: dependency.name, appId: current?.appId, missing: 'not deployed' })
      continue
    }
    const missing = missingSelectors(current.program, required)
    if (missing.length > 0) gaps.push({ plugin: subject, dependency: dependency.name, appId: current.appId, missing })
  }
  return gaps
}

/** ARC-4 signatures of the create methods in an ARC-56 spec. */
export function createSignatures(spec: { methods: Array<{ name: string; args: Array<{ type: string }>; returns: { type: string }; actions?: { create?: string[] } }> }): string[] {
  return spec.methods.filter((m) => (m.actions?.create?.length ?? 0) > 0).map((m) => `${m.name}(${m.args.map((a) => a.type).join(',')})${m.returns.type}`)
}

/**
 * Why `factoryProgram` cannot create children from `child` (empty = it can). A factory embeds the child's
 * create selector and the child's clear program (`compileArc4(Child)`), and pairs that clear program with
 * the staged approval; a missing selector or a clear program of another AVM version makes every creation
 * revert (ACCT-3, ROLLOUT-3). Byte search, so use it only to detect what is MISSING.
 */
export function childPushProblems(factoryProgram: Uint8Array, child: { approval: Uint8Array; clear: Uint8Array; createSignatures: readonly string[] }): string[] {
  const problems = child.createSignatures.filter((signature) => !programHasSelector(factoryProgram, signature))
    .map((signature) => `the factory does not call the child's create ${signature}`)
  if (Buffer.from(factoryProgram).indexOf(Buffer.from(child.clear)) < 0) {
    problems.push(`the factory does not carry the child's AVM ${child.clear[0]} clear program (it would pair the AVM ${child.approval[0]} approval with another version)`)
  }
  return problems
}

/** New methods that method-restricted grants may add on reinstall (spec §7.3). */
export const PHASE3_NEW_METHODS: Readonly<Record<string, readonly string[]>> = {
  socialPlugin: ['setMetaWallet'],
}

// ── Grant replacement arguments ────────────────────────────────────────────────────────────────

export type GrantReplacement = { key: string; from?: bigint; to: bigint }

/**
 * Parse `--replace` values: `key:to` (every installed grant whose app id the SDK registry lists under
 * `key` moves to `to`) or `key:from:to` (only grants of app `from`, e.g. on LocalNet, which has no registry).
 */
export function parseReplacement(value: string): GrantReplacement {
  const parts = value.split(':').map((p) => p.trim())
  const id = (raw: string, label: string) => {
    if (!/^[1-9][0-9]*$/.test(raw)) throw new Error(`--replace ${value}: ${label} must be a positive app id`)
    return BigInt(raw)
  }
  if (parts.length === 2 && parts[0]) return { key: parts[0], to: id(parts[1], 'to') }
  if (parts.length === 3 && parts[0]) {
    const replacement = { key: parts[0], from: id(parts[1], 'from'), to: id(parts[2], 'to') }
    if (replacement.from === replacement.to) throw new Error(`--replace ${value}: from and to are the same app`)
    return replacement
  }
  throw new Error(`--replace ${value}: expected key:to or key:from:to`)
}

/** Parse `--add-method key:method[,method]`. */
export function parseAddMethod(value: string): { key: string; methods: string[] } {
  const [key, list] = value.split(':')
  const methods = (list ?? '').split(',').map((m) => m.trim()).filter(Boolean)
  if (!key || methods.length === 0) throw new Error(`--add-method ${value}: expected key:method[,method]`)
  return { key, methods }
}

// ── Resuming an execution against an existing proposal ─────────────────────────────────────────

type UpgradeActionLike = { executionKey: Uint8Array; groups: Uint8Array[]; firstValid: bigint; lastValid: bigint }

/**
 * Re-stamp a freshly built execution with the lease, validity and group ids an existing UpgradeApp
 * action recorded, so the rebuilt windows match the approved groups (the same rule as
 * `script-base.ts` `restampExecutionFromProposal`, which is not exported). Throws on any mismatch.
 */
export function restampExecution(execution: ExecutionBuildGroup, action: UpgradeActionLike): void {
  if (execution.windows.length !== action.groups.length) {
    throw new Error(`proposal expects ${action.groups.length} group(s), the rebuilt execution has ${execution.windows.length}`)
  }
  execution.lease = action.executionKey
  execution.firstValid = action.firstValid
  execution.lastValid = action.lastValid
  execution.ids = []
  const validityPeriod = 1_000n
  for (let i = 0; i < execution.windows.length; i++) {
    const window = execution.windows[i]
    const start = action.firstValid + BigInt(i) * validityPeriod
    const end = i === execution.windows.length - 1 ? action.lastValid - 1n : start + validityPeriod - 1n
    window.transactions.forEach((txn, index) => {
      const mutable = txn as unknown as { group?: Uint8Array; firstValid: bigint; lastValid: bigint; lease?: Uint8Array }
      mutable.group = undefined
      mutable.firstValid = start
      mutable.lastValid = end
      if (index === 0) mutable.lease = action.executionKey
    })
    algosdk.assignGroupID(window.transactions)
    const rebuilt = window.transactions[0].group!
    if (Buffer.compare(Buffer.from(rebuilt), Buffer.from(action.groups[i])) !== 0) {
      throw new Error(`rebuilt group ${i + 1} does not match the proposal's group id`)
    }
    execution.ids.push(rebuilt)
    window.groupId = Buffer.from(rebuilt).toString('base64')
  }
}

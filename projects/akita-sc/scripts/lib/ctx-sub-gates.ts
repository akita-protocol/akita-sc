/**
 * Shared logic for allowlisting sub-gates on Gate v2, including the context-aware flag
 * (principal-resolution spec §3.5, §6.9, Q12). Used by `scripts/allowlist-sub-gates.ts`, the test
 * fixtures (`tests/fixtures/gates/gate.ts`) and `tests/ctx-sub-gates.test.ts`.
 *
 * A context-aware sub-gate implements `checkFor(ctx, gateID, args)`. Gate v2 calls it with the
 * first hop's verified `GateCtx`. All other sub-gates receive `ctx.principal` through the plain `check`.
 * The Gate learns which is which from `setSubGate(app, allowed, ctxAware)`.
 */
import fs from 'node:fs'
import path from 'node:path'
import { createHash } from 'node:crypto'
import algosdk from 'algosdk'

/** Gate v2 allowlist call with the context-aware flag. */
export const SET_SUB_GATE_CTX_SIGNATURE = 'setSubGate(uint64,bool,bool)void'
/** Gate v2 allowlist call before the flag existed. */
export const SET_SUB_GATE_SIGNATURE = 'setSubGate(uint64,bool)void'
/** The method a context-aware sub-gate implements (any argument types; the Gate track owns them). */
export const CTX_AWARE_SUB_GATE_METHOD = 'checkFor'
/** Sub-gates the spec makes context-aware (§6.9, plus the 2026-10-12 activity / participation gates). Informational: detection uses the ABI. */
export const SPEC_CTX_AWARE_SUB_GATES = ['SubscriptionGate', 'SubscriptionStreakGate', 'AkitaReferrerGate', 'ModeratorActivityGate', 'GovernanceParticipationGate'] as const

export type Arc56Like = {
  name: string
  methods: { name: string; args: { type: string }[]; returns: { type: string } }[]
  state?: { maps?: { box?: Record<string, { prefix?: string }> } }
  byteCode?: { approval: string; clear: string }
}

export const artifactsRoot = path.resolve(__dirname, '../../smart_contracts/artifacts')

/** Load an ARC-56 spec by its path relative to `smart_contracts/artifacts`. */
export function loadArtifact(relative: string): Arc56Like {
  return JSON.parse(fs.readFileSync(path.join(artifactsRoot, relative), 'utf8')) as Arc56Like
}

/** ARC-4 signatures of every method in a spec. */
export function abiSignatures(spec: Pick<Arc56Like, 'methods'>): string[] {
  return spec.methods.map((m) => `${m.name}(${m.args.map((a) => a.type).join(',')})${m.returns.type}`)
}

/** True if the Gate spec exposes `setSubGate(app, allowed, ctxAware)`. */
export function gateSupportsCtxFlag(gate: Pick<Arc56Like, 'methods'>): boolean {
  return abiSignatures(gate).includes(SET_SUB_GATE_CTX_SIGNATURE)
}

/** True if a sub-gate spec implements the context-aware `checkFor`. */
export function isCtxAwareSpec(subGate: Pick<Arc56Like, 'methods'>): boolean {
  return subGate.methods.some((m) => m.name === CTX_AWARE_SUB_GATE_METHOD)
}

/** sha256 hex of a compiled program (the same hash `deployImmutable` writes into receipts). */
export function programHash(program: Uint8Array): string {
  return createHash('sha256').update(program).digest('hex')
}

/** sha256 hex of a spec's compiled approval program. */
export function artifactApprovalHash(spec: Arc56Like): string {
  if (!spec.byteCode?.approval) throw new Error(`${spec.name}: artifact has no compiled approval program`)
  return programHash(Buffer.from(spec.byteCode.approval, 'base64'))
}

/** Box name of the Gate's allowlist entry for `app`: the `subGates` map prefix + itob(app). */
export function subGateBoxName(gate: Arc56Like, app: bigint): Uint8Array {
  const prefix = gate.state?.maps?.box?.subGates?.prefix
  if (prefix === undefined) throw new Error(`${gate.name}: no subGates box map in the ARC-56 spec`)
  return new Uint8Array([...Buffer.from(prefix, 'base64'), ...algosdk.encodeUint64(app)])
}

export type AllowlistState = { allowed: false } | { allowed: true; ctxAware: boolean }

/**
 * Decode an allowlist box value. Gate v2 before the flag stores an empty value. With the flag, the
 * spec says the value holds `ctxAware`, so any non-zero byte means context-aware.
 */
export function decodeAllowlistBox(value: Uint8Array | undefined): AllowlistState {
  if (value === undefined) return { allowed: false }
  return { allowed: true, ctxAware: value.some((byte) => byte !== 0) }
}

/** Upper bound for the MBR of one allowlist box: 2,500 + 400 × (key 9 B + value ≤ 8 B). */
export const ALLOWLIST_BOX_MBR_BOUND = 2_500n + 400n * (9n + 8n)

export type SubGateCandidate = {
  /** catalog contract name, e.g. `SubscriptionGate` */
  name: string
  appId: bigint
  /** sha256 hex of the approval program the app runs on chain */
  onChainApprovalHash: string
  /** the current compiled artifact for `name` */
  artifact: Arc56Like
}

export type AllowlistAction = {
  name: string
  appId: bigint
  ctxAware: boolean
  /** `add`: not allowlisted yet. `reflag`: allowlisted with the other flag (remove, then add). `none`: already right. */
  kind: 'add' | 'reflag' | 'none'
}

/**
 * Decide the allowlist calls. Every sub-gate must run the current artifact of its name: an app that
 * runs any other program is refused, whatever name it is given. The allowlist is what makes a program
 * trusted by every gate that names it, and after the seal only a DAO proposal can take an entry out,
 * so nothing is allowlisted on the strength of a name and an app id alone (2.0.0 deploys every
 * sub-gate again, so there is no older program to keep). A sub-gate is flagged context-aware when
 * that artifact has `checkFor`.
 */
export function planAllowlist(
  gate: Arc56Like,
  candidates: SubGateCandidate[],
  current: Map<bigint, AllowlistState>,
): AllowlistAction[] {
  const withFlag = gateSupportsCtxFlag(gate)
  const seen = new Set<bigint>()
  return candidates.map((candidate) => {
    if (candidate.appId <= 0n) throw new Error(`${candidate.name}: invalid app id ${candidate.appId}`)
    if (seen.has(candidate.appId)) throw new Error(`${candidate.name}: app ${candidate.appId} listed twice`)
    seen.add(candidate.appId)
    if (candidate.onChainApprovalHash !== artifactApprovalHash(candidate.artifact)) {
      throw new Error(`${candidate.name}: app ${candidate.appId} does not run the current ${candidate.name} artifact; deploy it again first (deploy-gates.ts)`)
    }
    const ctxAware = isCtxAwareSpec(candidate.artifact)
    if (ctxAware && !withFlag) {
      throw new Error(`${candidate.name}: context-aware sub-gate, but the Gate has no ${SET_SUB_GATE_CTX_SIGNATURE}`)
    }
    const state = current.get(candidate.appId) ?? { allowed: false }
    const kind: AllowlistAction['kind'] = !state.allowed
      ? 'add'
      : withFlag && state.ctxAware !== ctxAware ? 'reflag' : 'none'
    return { name: candidate.name, appId: candidate.appId, ctxAware, kind }
  })
}

/** The ABI method and args of one `setSubGate` call on a Gate with or without the flag. */
export function setSubGateCall(gate: Arc56Like, app: bigint, allowed: boolean, ctxAware: boolean): { method: string; args: (bigint | boolean)[] } {
  return gateSupportsCtxFlag(gate)
    ? { method: SET_SUB_GATE_CTX_SIGNATURE, args: [app, allowed, ctxAware] }
    : { method: SET_SUB_GATE_SIGNATURE, args: [app, allowed] }
}

/**
 * The Gate v2 app the allowlist and seal steps act on: `--gate` when given, else the Gate receipt in
 * the deploy-gates receipt directory, else the network's registered gate. The receipt comes before the
 * registry because the registry still names Gate v1 until the cutover (rollout C4), and both steps
 * run before it.
 */
export function resolveGateId(explicit: string | undefined, directory: string | undefined, network: string, registered: bigint | undefined): bigint {
  if (explicit !== undefined) {
    if (!/^[1-9][0-9]*$/.test(explicit)) throw new Error(`--gate ${explicit} is not an app id`)
    return BigInt(explicit)
  }
  const file = directory ? path.join(directory, 'Gate.json') : undefined
  if (file && fs.existsSync(file)) {
    const receipt = JSON.parse(fs.readFileSync(file, 'utf8')) as { contract: string; appId?: string; network: string }
    if (receipt.contract !== 'Gate' || receipt.network !== network) throw new Error(`${file}: receipt is for ${receipt.contract} on ${receipt.network}`)
    if (!receipt.appId) throw new Error(`${file}: deployment is unresolved (no appId)`)
    return BigInt(receipt.appId)
  }
  if (!registered || registered <= 0n) throw new Error('--gate is required (no Gate receipt in --manifest-dir and no gate id configured for this network)')
  return registered
}

/** Gate v2 issues its ids from 2^32 (`FirstGateV2ID`); a gate whose cursor is below that is a Gate v1. */
const FIRST_GATE_V2_ID = 2n ** 32n

/**
 * The legacy cutoff decides which Gate v1 ids can ever be imported, and Gate v2 can never change it.
 * Gate v1 accepts registrations by anyone until the cutover, so a cutoff written down earlier can be
 * stale by the time Gate v2 is created: a gate registered in between could not be imported, and
 * whatever stored its id would fail its gate check for good (audit 13, XSY-05). This compares the
 * cutoff with the cursor of the gate the network names, right before the create is sent.
 */
export function checkLegacyCutoff(legacyCutoff: string, liveGate: bigint, liveCursor: bigint | undefined): string {
  if (!/^(0|[1-9][0-9]*)$/.test(legacyCutoff)) throw new Error(`--legacy-cutoff ${legacyCutoff} is not a number`)
  if (liveCursor === undefined) throw new Error(`Gate ${liveGate} has no gate_cursor in its global state; refusing to guess the legacy cutoff`)
  if (liveCursor >= FIRST_GATE_V2_ID) {
    return `Gate ${liveGate} is a Gate v2 (cursor ${liveCursor}): its ids cannot be imported, so the cutoff ${legacyCutoff} is not checked against it`
  }
  if (BigInt(legacyCutoff) !== liveCursor) {
    throw new Error(`--legacy-cutoff ${legacyCutoff} does not match Gate v1 ${liveGate}, whose gate_cursor is ${liveCursor} now. ` +
      `Pass --legacy-cutoff ${liveCursor}, and import its gates before sealImports`)
  }
  return `Legacy cutoff ${legacyCutoff} matches the gate_cursor of Gate v1 ${liveGate}`
}

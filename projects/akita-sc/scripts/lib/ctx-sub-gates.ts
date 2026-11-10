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
 * Decide the allowlist calls. A sub-gate is context-aware only if the program it runs on chain is the
 * current artifact and that artifact has `checkFor`. A context-aware artifact whose deployed program
 * differs is refused: flagging an older program would make the Gate call a method it lacks.
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
    const artifactCtx = isCtxAwareSpec(candidate.artifact)
    const matches = candidate.onChainApprovalHash === artifactApprovalHash(candidate.artifact)
    if (artifactCtx && !matches) {
      throw new Error(`${candidate.name}: app ${candidate.appId} does not run the current (context-aware) artifact; redeploy it first`)
    }
    const ctxAware = artifactCtx && matches
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

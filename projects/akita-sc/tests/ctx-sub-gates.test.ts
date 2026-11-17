/**
 * Unit tests for scripts/lib/ctx-sub-gates.ts (no LocalNet): the allowlist planner behind
 * scripts/allowlist-sub-gates.ts and the test fixtures (principal-resolution spec §6.9, Q12).
 */
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, test } from 'vitest'
import algosdk from 'algosdk'
import immutableCatalog from '../scripts/lib/immutable-catalog.json'
import {
  type Arc56Like,
  ALLOWLIST_BOX_MBR_BOUND,
  abiSignatures,
  artifactApprovalHash,
  decodeAllowlistBox,
  gateSupportsCtxFlag,
  isCtxAwareSpec,
  loadArtifact,
  planAllowlist,
  resolveGateId,
  SET_SUB_GATE_CTX_SIGNATURE,
  SET_SUB_GATE_SIGNATURE,
  setSubGateCall,
  SPEC_CTX_AWARE_SUB_GATES,
  subGateBoxName,
} from '../scripts/lib/ctx-sub-gates'

const catalog = immutableCatalog as Record<string, { artifact: string }>
/** Gate v2 in the tree: has setSubGate(uint64,bool,bool) since the Gate track (2026-10-04). */
const gateWithFlag = loadArtifact(catalog.Gate.artifact)
const gate = gateWithFlag
/** The context-aware SubscriptionGate artifact in the tree (has checkFor since the Gate track). */
const ctxSubGate = loadArtifact(catalog.SubscriptionGate.artifact)
/** A plain sub-gate artifact (no checkFor). */
const subscriptionGate = loadArtifact(catalog.AssetGate.artifact)

/** A Gate spec with the flag-less setSubGate(uint64,bool): Gate v2 before the Gate track. */
const gateFlagless: Arc56Like = {
  ...gateWithFlag,
  methods: gateWithFlag.methods.map((m) => (m.name === 'setSubGate'
    ? { ...m, args: m.args.slice(0, 2) }
    : m)),
}

describe('ctx-sub-gates: ABI detection', () => {
  test('every spec context-aware sub-gate exists in the immutable catalog', () => {
    for (const name of SPEC_CTX_AWARE_SUB_GATES) expect(catalog[name]).toBeDefined()
  })

  test('the Gate in the tree has the flagged setSubGate (Gate track); the flag-less one is gone', () => {
    expect(abiSignatures(gateWithFlag)).toContain(SET_SUB_GATE_CTX_SIGNATURE)
    expect(abiSignatures(gateWithFlag)).not.toContain(SET_SUB_GATE_SIGNATURE)
    expect(gateSupportsCtxFlag(gateWithFlag)).toBe(true)
    expect(gateSupportsCtxFlag(gateFlagless)).toBe(false)
  })

  test('the spec context-aware sub-gates in the tree implement checkFor; the others do not', () => {
    for (const name of Object.keys(catalog).filter((n) => n.endsWith('Gate') && n !== 'Gate')) {
      expect(isCtxAwareSpec(loadArtifact(catalog[name].artifact)), name).toBe((SPEC_CTX_AWARE_SUB_GATES as readonly string[]).includes(name))
    }
  })

  test('checkFor marks a sub-gate context-aware', () => {
    expect(isCtxAwareSpec(ctxSubGate)).toBe(true)
    expect(isCtxAwareSpec({ methods: [{ name: 'check', args: [], returns: { type: 'bool' } }] })).toBe(false)
  })
})

describe('ctx-sub-gates: allowlist box', () => {
  test('box name is the subGates prefix plus itob(app)', () => {
    const name = subGateBoxName(gate, 1234n)
    expect(name).toHaveLength(9)
    expect(Buffer.from(name.slice(0, 1)).toString()).toBe('s')
    expect(algosdk.decodeUint64(name.slice(1), 'bigint')).toBe(1234n)
  })

  test('box value decoding', () => {
    expect(decodeAllowlistBox(undefined)).toEqual({ allowed: false })
    expect(decodeAllowlistBox(new Uint8Array())).toEqual({ allowed: true, ctxAware: false })
    expect(decodeAllowlistBox(new Uint8Array([0]))).toEqual({ allowed: true, ctxAware: false })
    expect(decodeAllowlistBox(new Uint8Array([0x80]))).toEqual({ allowed: true, ctxAware: true })
    expect(decodeAllowlistBox(algosdk.encodeUint64(1))).toEqual({ allowed: true, ctxAware: true })
  })

  test('MBR bound covers a 9-byte key and an 8-byte value', () => {
    expect(ALLOWLIST_BOX_MBR_BOUND).toBe(2_500n + 400n * 17n)
  })
})

describe('ctx-sub-gates: planAllowlist', () => {
  const hash = artifactApprovalHash(subscriptionGate)

  test('plain sub-gates on a flag-less Gate', () => {
    const plan = planAllowlist(gateFlagless, [{ name: 'AssetGate', appId: 10n, onChainApprovalHash: hash, artifact: subscriptionGate }], new Map())
    expect(plan).toEqual([{ name: 'AssetGate', appId: 10n, ctxAware: false, kind: 'add' }])
    expect(setSubGateCall(gateFlagless, 10n, true, false)).toEqual({ method: SET_SUB_GATE_SIGNATURE, args: [10n, true] })
    expect(setSubGateCall(gate, 10n, true, false)).toEqual({ method: SET_SUB_GATE_CTX_SIGNATURE, args: [10n, true, false] })
  })

  test('a context-aware sub-gate running the current artifact is flagged', () => {
    const plan = planAllowlist(gateWithFlag, [{ name: 'SubscriptionGate', appId: 10n, onChainApprovalHash: artifactApprovalHash(ctxSubGate), artifact: ctxSubGate }], new Map())
    expect(plan[0]).toMatchObject({ ctxAware: true, kind: 'add' })
    expect(setSubGateCall(gateWithFlag, 10n, true, true)).toEqual({ method: SET_SUB_GATE_CTX_SIGNATURE, args: [10n, true, true] })
  })

  test('an older deployed program of a context-aware artifact is refused', () => {
    expect(() => planAllowlist(gateWithFlag, [{ name: 'SubscriptionGate', appId: 10n, onChainApprovalHash: 'ff', artifact: ctxSubGate }], new Map()))
      .toThrow(/does not run the current/)
  })

  test('a context-aware sub-gate cannot be allowlisted on a flag-less Gate', () => {
    expect(() => planAllowlist(gateFlagless, [{ name: 'SubscriptionGate', appId: 10n, onChainApprovalHash: artifactApprovalHash(ctxSubGate), artifact: ctxSubGate }], new Map()))
      .toThrow(/has no setSubGate\(uint64,bool,bool\)void/)
  })

  test('already-allowlisted entries are skipped or re-flagged', () => {
    const candidates = [
      { name: 'SubscriptionGate', appId: 10n, onChainApprovalHash: artifactApprovalHash(ctxSubGate), artifact: ctxSubGate },
      { name: 'AssetGate', appId: 11n, onChainApprovalHash: hash, artifact: subscriptionGate },
    ]
    const current = new Map([
      [10n, { allowed: true as const, ctxAware: false }],
      [11n, { allowed: true as const, ctxAware: false }],
    ])
    expect(planAllowlist(gateWithFlag, candidates, current).map((a) => a.kind)).toEqual(['reflag', 'none'])
  })

  test('duplicate or invalid app ids are rejected', () => {
    const entry = { name: 'SubscriptionGate', appId: 10n, onChainApprovalHash: hash, artifact: subscriptionGate }
    expect(() => planAllowlist(gate, [entry, { ...entry, name: 'AssetGate' }], new Map())).toThrow(/listed twice/)
    expect(() => planAllowlist(gate, [{ ...entry, appId: 0n }], new Map())).toThrow(/invalid app id/)
  })
})

describe('ctx-sub-gates: which Gate the allowlist and seal steps act on', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'akita-gate-receipt-'))
  const receipt = (body: object) => fs.writeFileSync(path.join(dir, 'Gate.json'), JSON.stringify(body))

  test('between the deployment and the cutover the receipt names Gate v2, not the registered v1', () => {
    receipt({ contract: 'Gate', network: 'mainnet', appId: '4000000001', status: 'funded' })
    expect(resolveGateId(undefined, dir, 'mainnet', 1111n)).toBe(4000000001n)
    // An explicit --gate wins; with no receipt the registered gate is used.
    expect(resolveGateId('77', dir, 'mainnet', 1111n)).toBe(77n)
    expect(resolveGateId(undefined, path.join(dir, 'absent'), 'mainnet', 1111n)).toBe(1111n)
    expect(resolveGateId(undefined, undefined, 'mainnet', 1111n)).toBe(1111n)
  })

  test('a receipt for another network or contract, an unresolved one and a bad --gate are refused', () => {
    receipt({ contract: 'Gate', network: 'testnet', appId: '5' })
    expect(() => resolveGateId(undefined, dir, 'mainnet', 1111n)).toThrow('receipt is for Gate on testnet')
    receipt({ contract: 'Rewards', network: 'mainnet', appId: '5' })
    expect(() => resolveGateId(undefined, dir, 'mainnet', 1111n)).toThrow('receipt is for Rewards on mainnet')
    receipt({ contract: 'Gate', network: 'mainnet', status: 'creating' })
    expect(() => resolveGateId(undefined, dir, 'mainnet', 1111n)).toThrow('unresolved')
    expect(() => resolveGateId('0', dir, 'mainnet', 1111n)).toThrow('is not an app id')
    expect(() => resolveGateId('abc', undefined, 'mainnet', 1111n)).toThrow('is not an app id')
    expect(() => resolveGateId(undefined, undefined, 'mainnet', 0n)).toThrow('--gate is required')
    fs.rmSync(dir, { recursive: true, force: true })
  })
})

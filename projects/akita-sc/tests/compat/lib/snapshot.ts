/**
 * Loader for the compatibility baseline snapshot (`tests/compat/fixtures/mainnet-programs.json`) and the
 * selector catalog (`tests/compat/fixtures/signature-catalog.json`). Both are written by
 * `tests/compat/fetch-mainnet-programs.ts` from read-only MainNet algod GETs; this module never touches
 * the network.
 */
import algosdk from 'algosdk'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import type { BaselineEntry } from '../baseline'
import { ProgramFacts, sha256Hex } from './teal-facts'

export const FIXTURES = path.resolve(__dirname, '../fixtures')
export const ARTIFACTS = path.resolve(__dirname, '../../../smart_contracts/artifacts')

export type GlobalValue = { type: 'uint'; uint: string } | { type: 'bytes'; base64: string; utf8?: string; address?: string }

export type SnapshotProgram = {
  key: string
  role: BaselineEntry['role']
  family: BaselineEntry['family']
  appId: string
  box?: string
  generation?: BaselineEntry['generation']
  inScope: boolean
  artifact: string
  creator?: string
  approval: string
  clear?: string
  approvalSha256: string
  clearSha256?: string
  approvalLength: number
  extraProgramPages?: number
  globalSchema?: { ints: number; bytes: number }
  localSchema?: { ints: number; bytes: number }
  globalState?: Record<string, GlobalValue>
  /** git commit + artifact whose ARC-56 `byteCode.approval` equals the deployed approval program, if any */
  provenance: { commit: string; date: string; artifact: string }[]
  facts: ProgramFacts
}

export type Snapshot = {
  $comment: string
  source: string
  fetchedAt: string
  programs: Record<string, SnapshotProgram>
}

/** selector (8 hex chars) → ARC-4 method signatures that hash to it, from current + historical artifacts */
export type SignatureCatalog = {
  $comment: string
  generatedAt: string
  selectors: Record<string, string[]>
}

let cachedSnapshot: Snapshot | undefined
let cachedCatalog: SignatureCatalog | undefined

export function loadSnapshot(): Snapshot {
  cachedSnapshot ??= JSON.parse(readFileSync(path.join(FIXTURES, 'mainnet-programs.json'), 'utf8')) as Snapshot
  return cachedSnapshot
}

export function loadCatalog(): SignatureCatalog {
  cachedCatalog ??= JSON.parse(readFileSync(path.join(FIXTURES, 'signature-catalog.json'), 'utf8')) as SignatureCatalog
  return cachedCatalog
}

export function program(key: string): SnapshotProgram {
  const p = loadSnapshot().programs[key]
  if (!p) throw new Error(`compat snapshot has no program '${key}' (re-run tests/compat/fetch-mainnet-programs.ts)`)
  return p
}

export const b64 = (value: string): Uint8Array => new Uint8Array(Buffer.from(value, 'base64'))

/** Approval bytes of a snapshot program, sha-checked against the recorded MainNet hash. */
export function approvalBytes(key: string): Uint8Array {
  const p = program(key)
  const bytes = b64(p.approval)
  if (sha256Hex(bytes) !== p.approvalSha256) throw new Error(`compat snapshot '${key}' approval drifted from its recorded sha256`)
  return bytes
}

/** Clear bytes (children staged in a `bc` box have none on MainNet: the factory sets the clear program itself). */
export function clearBytes(key: string): Uint8Array | undefined {
  const p = program(key)
  return p.clear === undefined ? undefined : b64(p.clear)
}

export const selectorOf = (signature: string): string => Buffer.from(algosdk.ABIMethod.fromSignature(signature).getSelector()).toString('hex')

/** Names for a selector from the catalog ([] when unknown). */
export function signaturesFor(selector: string): string[] {
  return loadCatalog().selectors[selector] ?? []
}

type Arc56Like = { name: string; methods: { name: string; args: { type: string }[]; returns: { type: string } }[]; byteCode?: { approval: string; clear: string } }

export function readArtifact(artifact: string): Arc56Like {
  return JSON.parse(readFileSync(path.join(ARTIFACTS, artifact), 'utf8')) as Arc56Like
}

export const methodSignature = (m: Arc56Like['methods'][number]): string => `${m.name}(${m.args.map((a) => a.type).join(',')})${m.returns.type}`

/** Working-tree ABI of an artifact: selector → signature. */
export function artifactRoutes(artifact: string): Map<string, string> {
  const spec = readArtifact(artifact)
  return new Map(spec.methods.map((m) => [selectorOf(methodSignature(m)), methodSignature(m)]))
}

/** The deployed program's routes, named through the catalog (unknown selectors keep their hex). */
export function namedRoutes(key: string): Map<string, string[]> {
  return new Map(program(key).facts.routes.map((s) => [s, signaturesFor(s)]))
}

/** Decodes the recorded uint global `name` of a snapshot program. */
export function globalUint(key: string, name: string): bigint | undefined {
  const v = program(key).globalState?.[name]
  return v?.type === 'uint' ? BigInt(v.uint) : undefined
}

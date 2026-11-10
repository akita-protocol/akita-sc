/**
 * Static compatibility analysis shared by the unit test and the LocalNet suite. Everything here reads
 * files only (snapshot, signature catalog, working-tree artifacts and sources); no network, no goal.
 */
import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { BASELINE } from '../baseline'
import { ARTIFACTS, artifactRoutes, loadSnapshot, program, signaturesFor, SnapshotProgram } from './snapshot'
import { factsFromTeal, ProgramFacts, sha256Hex } from './teal-facts'

export const CONTRACTS = path.resolve(__dirname, '../../../smart_contracts')

const treeFactsCache = new Map<string, ProgramFacts>()

/**
 * Facts of a WORKING-TREE program, from the puya TEAL next to its ARC-56 (same parser as the deployed
 * disassembly; the two agree byte for byte on routes/calls/ints/strings, checked when the suite was built).
 */
export function treeFacts(artifact: string): ProgramFacts {
  let facts = treeFactsCache.get(artifact)
  if (!facts) {
    const spec = JSON.parse(readFileSync(path.join(ARTIFACTS, artifact), 'utf8')) as { byteCode?: { approval: string } }
    const teal = readFileSync(path.join(ARTIFACTS, artifact.replace(/\.arc56\.json$/, '.approval.teal')), 'utf8')
    const sha = spec.byteCode ? sha256Hex(new Uint8Array(Buffer.from(spec.byteCode.approval, 'base64'))) : ''
    facts = factsFromTeal(teal, sha)
    treeFactsCache.set(artifact, facts)
  }
  return facts
}

/** Human-readable name of a selector (catalog signatures, or the hex). */
export const nameOf = (selector: string): string => signaturesFor(selector).join(' | ') || `0x${selector}`

/** Deployed programs an old plugin can call: Phase 2 targets, old children and context apps (in scope). */
export function servingPrograms(): SnapshotProgram[] {
  return Object.values(loadSnapshot().programs).filter((p) => p.inScope && (p.role === 'target' || p.role === 'child' || p.role === 'context'))
}

export function inScopePlugins(): SnapshotProgram[] {
  return Object.values(loadSnapshot().programs).filter((p) => p.role === 'plugin' && p.inScope)
}

/**
 * Selectors `plugin` calls on deployed program `served` that the working-tree counterpart of `served`
 * (`served.artifact`: the upgraded singleton, the NEW child, Gate v2, the current wallet) no longer routes.
 * Empty = every call the old plugin makes there still lands on a method (legacy shim or unchanged ABI).
 */
export function unservedCalls(pluginFacts: ProgramFacts, served: SnapshotProgram): string[] {
  const tree = artifactRoutes(served.artifact)
  return pluginFacts.calls.filter((c) => served.facts.routes.includes(c) && !tree.has(c))
}

/** Every selector routed by any working-tree artifact or any snapshot program. */
export function allKnownRoutes(): Set<string> {
  const out = new Set<string>()
  const files = execSync(`find ${JSON.stringify(ARTIFACTS)} -name '*.arc56.json'`, { encoding: 'utf8' }).trim().split('\n')
  for (const file of files) for (const sel of artifactRoutes(path.relative(ARTIFACTS, file)).keys()) out.add(sel)
  for (const p of Object.values(loadSnapshot().programs)) for (const r of p.facts.routes) out.add(r)
  return out
}

/** `export const NAME: uint64 = 12_345` (or without a type) from a working-tree contract source. */
export function sourceConst(file: string, name: string): bigint {
  const text = readFileSync(path.join(CONTRACTS, file), 'utf8')
  const m = new RegExp(`export const ${name}(?::\\s*\\w+)?\\s*=\\s*([0-9_]+)`).exec(text)
  if (!m) throw new Error(`${file}: no numeric constant ${name}`)
  return BigInt(m[1].replace(/_/g, ''))
}

export const hasInt = (key: string, value: bigint): boolean => program(key).facts.ints.includes(value.toString())

/** In-scope MainNet app ids per baseline key. */
export const baselineId = (key: string): bigint => {
  const entry = BASELINE.find((e) => e.key === key)
  if (!entry) throw new Error(`no baseline entry ${key}`)
  return entry.appId
}

#!/usr/bin/env node
/**
 * Principal-resolution compatibility suite: fetch the COMPATIBILITY BASELINE (PHASE-0-SPEC.md §7.1).
 *
 * READ-ONLY. It issues only `GET /v2/applications/{id}` and `GET /v2/applications/{id}/box?name=…` against a
 * public MainNet algod. It has no signer, no mnemonic and builds no transaction. It never writes to any
 * network.
 *
 * Writes:
 *   tests/compat/fixtures/mainnet-programs.json  approval/clear programs, schema, pages, decoded globals,
 *                                                git provenance and disassembly facts of every program in
 *                                                tests/compat/baseline.ts (plugins of every generation,
 *                                                Phase 2 singletons, factories' `bc` child programs)
 *   tests/compat/fixtures/signature-catalog.json selector → ARC-4 signatures, from the working-tree
 *                                                artifacts and every committed version of them (git, read-only)
 *
 * Usage (from projects/akita-sc):
 *   npx ts-node --transpile-only tests/compat/fetch-mainnet-programs.ts            # refresh both fixtures
 *   npx ts-node --transpile-only tests/compat/fetch-mainnet-programs.ts --check    # compare MainNet with the snapshot, write nothing
 *   ... --algod https://mainnet-api.algonode.cloud                                  # another public MainNet algod
 *
 * Requires `goal` on PATH for the disassembly (`goal clerk compile -D`, offline).
 */
import algosdk from 'algosdk'
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { BASELINE, BaselineEntry, CATALOG_ARTIFACTS, MAINNET_ALGOD } from './baseline'
import { FIXTURES, GlobalValue, loadSnapshot, selectorOf, SignatureCatalog, Snapshot, SnapshotProgram } from './lib/snapshot'
import { programFacts, sha256Hex } from './lib/teal-facts'

const argv = process.argv.slice(2)
const option = (key: string) => {
  const i = argv.indexOf(key)
  return i < 0 ? undefined : argv[i + 1]
}
const CHECK = argv.includes('--check')
const ALGOD = (option('--algod') ?? MAINNET_ALGOD).replace(/\/$/, '')
const REPO = path.resolve(__dirname, '../../../..')
const ARTIFACT_PREFIX = 'projects/akita-sc/smart_contracts/artifacts/'

if (!/mainnet/i.test(ALGOD)) throw new Error(`--algod must be a MainNet endpoint (got ${ALGOD})`)

async function get<T>(route: string): Promise<T> {
  const url = `${ALGOD}${route}`
  let last: unknown
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const res = await fetch(url, { method: 'GET', headers: { accept: 'application/json' } })
      if (!res.ok) throw new Error(`GET ${url} → ${res.status} ${await res.text()}`)
      return (await res.json()) as T
    } catch (e) {
      last = e
      await new Promise((r) => setTimeout(r, 500 * (attempt + 1)))
    }
  }
  throw last
}

type AlgodApp = {
  id: number
  params: {
    'approval-program': string
    'clear-state-program': string
    creator: string
    'extra-program-pages'?: number
    'global-state'?: { key: string; value: { type: number; bytes: string; uint: number } }[]
    'global-state-schema': { 'num-uint': number; 'num-byte-slice': number }
    'local-state-schema': { 'num-uint': number; 'num-byte-slice': number }
  }
}

const decodeGlobals = (state: NonNullable<AlgodApp['params']['global-state']>): Record<string, GlobalValue> => {
  const out: Record<string, GlobalValue> = {}
  for (const { key, value } of state) {
    const name = Buffer.from(key, 'base64').toString('utf8')
    if (value.type === 2) {
      out[name] = { type: 'uint', uint: String(value.uint) }
      continue
    }
    const raw = Buffer.from(value.bytes, 'base64')
    const entry: GlobalValue = { type: 'bytes', base64: value.bytes }
    if (raw.length > 0 && [...raw].every((b) => b >= 0x20 && b < 0x7f)) entry.utf8 = raw.toString('utf8')
    if (raw.length === 32) entry.address = algosdk.encodeAddress(raw)
    out[name] = entry
  }
  return out
}

// ── git (read-only): every committed version of the catalog artifacts ─────────────────────────────
const git = (...args: string[]) => execFileSync('git', ['-C', REPO, ...args], { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] })

type Arc56 = { methods?: { name: string; args: { type: string }[]; returns: { type: string } }[]; byteCode?: { approval?: string } }
type Version = { commit: string; date: string; artifact: string; spec: Arc56 }

function artifactVersions(artifact: string): Version[] {
  const file = ARTIFACT_PREFIX + artifact
  const commits = git('log', '--format=%H %ad', '--date=short', '--', file).trim().split('\n').filter(Boolean)
  const versions: Version[] = []
  for (const line of commits) {
    const [commit, date] = line.split(' ')
    try {
      versions.push({ commit, date, artifact, spec: JSON.parse(git('show', `${commit}:${file}`)) as Arc56 })
    } catch {
      // deleted in that commit, or not JSON
    }
  }
  return versions
}

function buildCatalog(versionsByArtifact: Map<string, Version[]>): SignatureCatalog {
  const selectors = new Map<string, Set<string>>()
  const add = (spec: Arc56) => {
    for (const m of spec.methods ?? []) {
      const sig = `${m.name}(${m.args.map((a) => a.type).join(',')})${m.returns.type}`
      try {
        const sel = selectorOf(sig)
        if (!selectors.has(sel)) selectors.set(sel, new Set())
        selectors.get(sel)!.add(sig)
      } catch {
        // a type algosdk cannot parse (should not happen for ARC-4 artifacts)
      }
    }
  }
  // the whole working tree (current ABI of every contract) …
  const all = execFileSync('find', [path.join(REPO, ARTIFACT_PREFIX), '-name', '*.arc56.json'], { encoding: 'utf8' }).trim().split('\n')
  for (const file of all) add(JSON.parse(readFileSync(file, 'utf8')) as Arc56)
  // … and every committed version of the catalog artifacts
  for (const versions of versionsByArtifact.values()) for (const v of versions) add(v.spec)
  return {
    $comment: 'Selector → ARC-4 signatures (working-tree artifacts + every committed version of tests/compat/baseline.ts CATALOG_ARTIFACTS). Generated by tests/compat/fetch-mainnet-programs.ts; used to name the routes and calls found in deployed programs.',
    generatedAt: new Date().toISOString(),
    selectors: Object.fromEntries([...selectors.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([s, sigs]) => [s, [...sigs].sort()])),
  }
}

async function fetchEntry(entry: BaselineEntry, versions: Version[]): Promise<SnapshotProgram> {
  const base = {
    key: entry.key,
    role: entry.role,
    family: entry.family,
    appId: entry.appId.toString(),
    generation: entry.generation,
    inScope: entry.inScope,
    artifact: entry.artifact,
  }
  let approval: Uint8Array
  let rest: Partial<SnapshotProgram> = {}
  if (entry.box) {
    const name = Buffer.from(entry.box).toString('base64')
    const box = await get<{ name: string; value: string }>(`/v2/applications/${entry.appId}/box?name=b64:${encodeURIComponent(name)}`)
    approval = new Uint8Array(Buffer.from(box.value, 'base64'))
    rest = { box: entry.box }
  } else {
    const app = await get<AlgodApp>(`/v2/applications/${entry.appId}`)
    approval = new Uint8Array(Buffer.from(app.params['approval-program'], 'base64'))
    const clear = new Uint8Array(Buffer.from(app.params['clear-state-program'], 'base64'))
    rest = {
      creator: app.params.creator,
      clear: Buffer.from(clear).toString('base64'),
      clearSha256: sha256Hex(clear),
      extraProgramPages: app.params['extra-program-pages'] ?? 0,
      globalSchema: { ints: app.params['global-state-schema']['num-uint'], bytes: app.params['global-state-schema']['num-byte-slice'] },
      localSchema: { ints: app.params['local-state-schema']['num-uint'], bytes: app.params['local-state-schema']['num-byte-slice'] },
      globalState: decodeGlobals(app.params['global-state'] ?? []),
    }
  }
  const b64 = Buffer.from(approval).toString('base64')
  const provenance = versions
    .filter((v) => v.spec.byteCode?.approval === b64)
    .map((v) => ({ commit: v.commit, date: v.date, artifact: v.artifact }))
  return {
    ...base,
    ...rest,
    approval: b64,
    approvalSha256: sha256Hex(approval),
    approvalLength: approval.length,
    provenance,
    facts: programFacts(approval),
  } as SnapshotProgram
}

async function main() {
  const versionsByArtifact = new Map<string, Version[]>()
  for (const artifact of CATALOG_ARTIFACTS) versionsByArtifact.set(artifact, artifactVersions(artifact))

  const programs: Record<string, SnapshotProgram> = {}
  for (const entry of BASELINE) {
    process.stdout.write(`GET ${entry.key} (${entry.appId}${entry.box ? ` box ${entry.box}` : ''}) … `)
    programs[entry.key] = await fetchEntry(entry, versionsByArtifact.get(entry.artifact) ?? [])
    const p = programs[entry.key]
    console.log(`${p.approvalLength} B sha256 ${p.approvalSha256.slice(0, 16)}… provenance ${p.provenance[0]?.commit.slice(0, 8) ?? 'none'}`)
  }

  if (CHECK) {
    const recorded = loadSnapshot().programs
    const drift = Object.values(programs).filter((p) => recorded[p.key]?.approvalSha256 !== p.approvalSha256 || recorded[p.key]?.clearSha256 !== p.clearSha256)
    for (const p of drift) console.error(`DRIFT ${p.key}: MainNet ${p.approvalSha256} != snapshot ${recorded[p.key]?.approvalSha256 ?? 'missing'}`)
    if (drift.length > 0) process.exit(1)
    console.log(`OK: ${Object.keys(programs).length} programs match the snapshot`)
    return
  }

  const snapshot: Snapshot = {
    $comment:
      'Principal-resolution compatibility baseline (PHASE-0-SPEC.md §7.1): the DEPLOYED MainNet programs, read-only (GET /v2/applications/{id}, /box). Installed on LocalNet by tests/compat/*.e2e.spec.ts as the old generation. Never deploy to MainNet/TestNet from this file. Refresh: npx ts-node --transpile-only tests/compat/fetch-mainnet-programs.ts',
    source: `${ALGOD}/v2/applications/{id}`,
    fetchedAt: new Date().toISOString(),
    programs,
  }
  writeFileSync(path.join(FIXTURES, 'mainnet-programs.json'), JSON.stringify(snapshot, null, 2) + '\n')
  writeFileSync(path.join(FIXTURES, 'signature-catalog.json'), JSON.stringify(buildCatalog(versionsByArtifact), null, 2) + '\n')
  console.log(`wrote ${Object.keys(programs).length} programs to tests/compat/fixtures/`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

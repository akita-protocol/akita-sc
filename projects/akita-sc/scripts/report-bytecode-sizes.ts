#!/usr/bin/env node

/**
 * Report compiled bytecode size and headroom for every contract in the project.
 *
 * Reads the base64-encoded `byteCode` field from each `*.arc56.json` artifact
 * and compares the decoded size against AVM program-page limits.
 *
 * Exclusions:
 *   - Anything under `artifacts/mocks/**`
 *   - Anything under `artifacts/mock-beacon/**`
 *   - Any file whose basename starts with `Mock`
 *
 * AVM program-size rules (as of AVM v11):
 *   - Per program page: 2048 bytes
 *   - Max extra pages beyond the default 1: 3 (so 4 pages total)
 *   - Combined limit: len(approval) + len(clear) ≤ 2048 * (1 + extraProgramPages)
 *     → absolute max combined = 2048 * 4 = 8192 bytes
 *
 * Headroom columns:
 *   - "Page Fill": how full the currently-allocated pages are
 *     (pages = ceil(total / 2048); fill = pages * 2048 - total)
 *   - "Max Headroom": bytes still available if the app provisions the maximum
 *     3 extra pages (8192 − total)
 *
 * Usage:
 *   npx ts-node --transpile-only scripts/report-bytecode-sizes.ts
 *   npx ts-node --transpile-only scripts/report-bytecode-sizes.ts --json
 *   npx ts-node --transpile-only scripts/report-bytecode-sizes.ts --sort=headroom
 */

import fs from 'node:fs'
import path from 'node:path'

// AVM limits
const PAGE_SIZE = 2048
const MAX_PAGES = 4 // 1 default + 3 extra
const MAX_COMBINED = PAGE_SIZE * MAX_PAGES // 8192

// Warning thresholds for "max headroom"
const TIGHT_THRESHOLD = 500
const WATCH_THRESHOLD = 1500

const ARTIFACTS_ROOT = path.resolve(__dirname, '..', 'smart_contracts', 'artifacts')

// Directories to skip outright (matched as path segments)
const SKIP_DIRS = new Set(['mocks', 'mock-beacon'])

interface ContractReport {
  name: string
  relPath: string
  approvalBytes: number
  clearBytes: number
  totalBytes: number
  pagesNeeded: number
  pageFillHeadroom: number
  maxHeadroom: number
  status: 'ok' | 'watch' | 'tight' | 'over'
}

interface Arc56 {
  byteCode?: {
    approval?: string
    clear?: string
  }
}

function* walk(dir: string): Generator<string> {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue
      yield* walk(path.join(dir, entry.name))
    } else if (entry.isFile() && entry.name.endsWith('.arc56.json')) {
      yield path.join(dir, entry.name)
    }
  }
}

function base64ByteLength(b64: string): number {
  // Buffer handles padding correctly; fast and accurate.
  return Buffer.from(b64, 'base64').length
}

function buildReport(filePath: string): ContractReport | null {
  const basename = path.basename(filePath, '.arc56.json')

  // Skip Mock* contracts that may live outside the mocks/ folder
  if (basename.startsWith('Mock')) return null

  const raw = fs.readFileSync(filePath, 'utf8')
  const spec = JSON.parse(raw) as Arc56

  const approvalB64 = spec.byteCode?.approval
  const clearB64 = spec.byteCode?.clear

  if (!approvalB64 || !clearB64) {
    console.warn(`[warn] ${filePath}: missing byteCode (skipping)`)
    return null
  }

  const approvalBytes = base64ByteLength(approvalB64)
  const clearBytes = base64ByteLength(clearB64)
  const totalBytes = approvalBytes + clearBytes

  const pagesNeeded = Math.max(1, Math.ceil(totalBytes / PAGE_SIZE))
  const pageFillHeadroom = pagesNeeded * PAGE_SIZE - totalBytes
  const maxHeadroom = MAX_COMBINED - totalBytes

  let status: ContractReport['status']
  if (totalBytes > MAX_COMBINED) status = 'over'
  else if (maxHeadroom < TIGHT_THRESHOLD) status = 'tight'
  else if (maxHeadroom < WATCH_THRESHOLD) status = 'watch'
  else status = 'ok'

  return {
    name: basename,
    relPath: path.relative(ARTIFACTS_ROOT, filePath),
    approvalBytes,
    clearBytes,
    totalBytes,
    pagesNeeded,
    pageFillHeadroom,
    maxHeadroom,
    status,
  }
}

// ───────── formatting helpers ─────────

const useColor = process.stdout.isTTY && !process.env.NO_COLOR
const c = {
  reset: useColor ? '\x1b[0m' : '',
  dim: useColor ? '\x1b[2m' : '',
  bold: useColor ? '\x1b[1m' : '',
  red: useColor ? '\x1b[31m' : '',
  yellow: useColor ? '\x1b[33m' : '',
  green: useColor ? '\x1b[32m' : '',
  cyan: useColor ? '\x1b[36m' : '',
}

function statusBadge(s: ContractReport['status']): string {
  switch (s) {
    case 'over':
      return `${c.red}${c.bold}OVER${c.reset}`
    case 'tight':
      return `${c.red}TIGHT${c.reset}`
    case 'watch':
      return `${c.yellow}WATCH${c.reset}`
    case 'ok':
      return `${c.green}OK${c.reset}`
  }
}

function pad(s: string, n: number, right = false): string {
  // Strip ANSI to compute visible length
  const visible = s.replace(/\x1b\[[0-9;]*m/g, '')
  const diff = n - visible.length
  if (diff <= 0) return s
  return right ? ' '.repeat(diff) + s : s + ' '.repeat(diff)
}

function fmtBytes(n: number): string {
  return n.toLocaleString()
}

function printTable(rows: ContractReport[]): void {
  const headers = ['Contract', 'Path', 'Approval', 'Clear', 'Total', 'Pages', 'Page Fill', 'Max Headroom', 'Status']

  // Build display rows (strings)
  const display = rows.map((r) => [
    r.name,
    r.relPath,
    fmtBytes(r.approvalBytes),
    fmtBytes(r.clearBytes),
    fmtBytes(r.totalBytes),
    String(r.pagesNeeded),
    fmtBytes(r.pageFillHeadroom),
    fmtBytes(r.maxHeadroom),
    statusBadge(r.status),
  ])

  // Compute column widths (from visible lengths)
  const widths = headers.map((h, i) => {
    const cellLens = display.map((row) => row[i].replace(/\x1b\[[0-9;]*m/g, '').length)
    return Math.max(h.length, ...cellLens)
  })

  const rightAlign = [false, false, true, true, true, true, true, true, false]

  const renderRow = (cells: string[]): string =>
    cells.map((cell, i) => pad(cell, widths[i], rightAlign[i])).join('  ')

  console.log(c.bold + renderRow(headers) + c.reset)
  console.log(c.dim + widths.map((w) => '─'.repeat(w)).join('  ') + c.reset)
  for (const row of display) console.log(renderRow(row))
}

function printSummary(rows: ContractReport[]): void {
  const total = rows.length
  const over = rows.filter((r) => r.status === 'over').length
  const tight = rows.filter((r) => r.status === 'tight').length
  const watch = rows.filter((r) => r.status === 'watch').length
  const ok = rows.filter((r) => r.status === 'ok').length

  const bytesAll = rows.reduce((acc, r) => acc + r.totalBytes, 0)
  const avgBytes = total > 0 ? Math.round(bytesAll / total) : 0
  const maxRow = rows.reduce<ContractReport | null>((a, b) => (!a || b.totalBytes > a.totalBytes ? b : a), null)
  const minRow = rows.reduce<ContractReport | null>((a, b) => (!a || b.totalBytes < a.totalBytes ? b : a), null)

  console.log()
  console.log(c.bold + 'Summary' + c.reset)
  console.log(`  Contracts analysed:   ${total}`)
  console.log(
    `  Status:               ${c.green}${ok} ok${c.reset}  ${c.yellow}${watch} watch${c.reset}  ${c.red}${tight} tight${c.reset}  ${c.red}${c.bold}${over} over${c.reset}`,
  )
  console.log(`  Total combined bytes: ${fmtBytes(bytesAll)}`)
  console.log(`  Average total:        ${fmtBytes(avgBytes)} bytes`)
  if (maxRow) console.log(`  Largest:              ${maxRow.name} (${fmtBytes(maxRow.totalBytes)} bytes)`)
  if (minRow) console.log(`  Smallest:             ${minRow.name} (${fmtBytes(minRow.totalBytes)} bytes)`)
  console.log()
  console.log(
    c.dim +
      `  Page size: ${PAGE_SIZE} · Max pages: ${MAX_PAGES} · Max combined: ${MAX_COMBINED} bytes` +
      c.reset,
  )
  console.log(
    c.dim +
      `  Thresholds: tight < ${TIGHT_THRESHOLD} headroom, watch < ${WATCH_THRESHOLD} headroom` +
      c.reset,
  )
}

// ───────── main ─────────

function parseArgs(argv: string[]): { json: boolean; sort: 'name' | 'size' | 'headroom' } {
  let json = false
  let sort: 'name' | 'size' | 'headroom' = 'headroom'
  for (const a of argv) {
    if (a === '--json') json = true
    else if (a.startsWith('--sort=')) {
      const v = a.split('=')[1]
      if (v === 'name' || v === 'size' || v === 'headroom') sort = v
      else throw new Error(`Unknown sort: ${v}`)
    }
  }
  return { json, sort }
}

function main(): void {
  if (!fs.existsSync(ARTIFACTS_ROOT)) {
    console.error(`Artifacts directory not found: ${ARTIFACTS_ROOT}`)
    console.error('Did you run `npm run build` first?')
    process.exit(1)
  }

  const { json, sort } = parseArgs(process.argv.slice(2))

  const reports: ContractReport[] = []
  for (const file of walk(ARTIFACTS_ROOT)) {
    const r = buildReport(file)
    if (r) reports.push(r)
  }

  if (reports.length === 0) {
    console.error('No contracts found. Check the exclusion filters or build your contracts first.')
    process.exit(1)
  }

  const sorters: Record<typeof sort, (a: ContractReport, b: ContractReport) => number> = {
    name: (a, b) => a.name.localeCompare(b.name),
    size: (a, b) => b.totalBytes - a.totalBytes,
    headroom: (a, b) => a.maxHeadroom - b.maxHeadroom, // tightest first
  }
  reports.sort(sorters[sort])

  if (json) {
    console.log(JSON.stringify(reports, null, 2))
    return
  }

  printTable(reports)
  printSummary(reports)
}

main()

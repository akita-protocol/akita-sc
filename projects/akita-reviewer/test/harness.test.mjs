// node --test projects/akita-reviewer/test
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { test } from 'node:test'
import { fromAuditMarkdown, fromReportData, locationsFromText } from '../scripts/core/audits.mjs'
import { lineGap, normalizePath, parseLocation, sameFile } from '../scripts/core/locations.mjs'
import { inScope, score } from '../scripts/core/match.mjs'
import { programHashes } from '../scripts/core/program.mjs'
import { validateReport } from '../scripts/core/report.mjs'

test('locations normalize every path style to one key', () => {
  assert.equal(normalizePath('projects/akita-sc/smart_contracts/arc58/dao/contract.algo.ts'), 'arc58/dao/contract.algo.ts')
  assert.equal(normalizePath('smart_contracts/sunset/contract.algo.ts'), 'sunset/contract.algo.ts')
  assert.equal(normalizePath('projects/akita-plugin/base.algo.ts'), 'projects/akita-plugin/base.algo.ts')
  assert.deepEqual(parseLocation('arc58/dao/validator.algo.ts:53-61,144-148'), {
    file: 'arc58/dao/validator.algo.ts',
    ranges: [
      [53, 61],
      [144, 148],
    ],
  })
  assert.equal(parseLocation('projects/akita-sc/scripts/run.sh'), null)
  assert.ok(sameFile('arc58/dao/contract.algo.ts', 'dao/contract.algo.ts'))
  assert.ok(!sameFile('arc58/dao/contract.algo.ts', 'o/contract.algo.ts'))
  assert.equal(lineGap([[10, 20]], [[15, 30]]), 0)
  assert.equal(lineGap([[10, 20]], [[50, 60]]), 30)
})

test('backtick citations attach bare ranges and bare names to the previous file', () => {
  const locs = locationsFromText('`arc58/dao/contract.algo.ts:171-192` (x), `:994-1081`, `validator.algo.ts:53-61`, `guilds/core/contract.algo.ts`:12-14')
  assert.deepEqual(
    locs.map((l) => [l.file, l.ranges]),
    [
      ['arc58/dao/contract.algo.ts', [[171, 192], [994, 1081]]],
      ['arc58/dao/validator.algo.ts', [[53, 61]]],
      ['guilds/core/contract.algo.ts', [[12, 14]]],
    ],
  )
})

const MARKDOWN = `# Example audit

## Scope covered

- \`projects/akita-sc/smart_contracts/social/graph.algo.ts\`

| ID | Severity | Title |
| --- | --- | --- |
| X-03 | Medium | Table-only severity |

### DAO-01: Bootstrap proposals survive activation
- **Severity:** High (governance bypass)
- **Location:** \`arc58/dao/contract.algo.ts:171-192\`, \`:994-1081\`
- **Description:** mentions \`staking/contract.algo.ts:1\` outside the location block

## S-03 — Follow keys cut to 16 bytes (High, Confirmed)

**Location**
\`graph.algo.ts:40-52\`

**Fix** something

### X-03: A finding whose severity is only in the table
- **Location:** \`poll/contract.algo.ts:5\`

### C-1: Severity from the ID prefix
- **Location:** \`rewards/contract.algo.ts:260-327\`
`

test('markdown audits yield id, severity, title and primary location', () => {
  const findings = fromAuditMarkdown(MARKDOWN, 'full-test')
  assert.deepEqual(
    findings.map((f) => [f.id, f.severity, f.title, f.locations.map((l) => l.file)]),
    [
      ['DAO-01', 'high', 'Bootstrap proposals survive activation', ['arc58/dao/contract.algo.ts']],
      ['S-03', 'high', 'Follow keys cut to 16 bytes', ['social/graph.algo.ts']],
      ['X-03', 'medium', 'A finding whose severity is only in the table', ['poll/contract.algo.ts']],
      ['C-1', 'critical', 'Severity from the ID prefix', ['rewards/contract.algo.ts']],
    ],
  )
  assert.deepEqual(findings[0].locations[0].ranges, [
    [171, 192],
    [994, 1081],
  ])
})

test('structured review data keeps severity and parses locations', () => {
  const [f] = fromReportData(
    { findings: [{ id: 'ACCT-1', slice: 'ACCT', severity: 'High', title: 't', location: ['sunset/contract.algo.ts:11', 'projects/akita-sc/scripts/x.ts:1'], status: 'fixed' }] },
    'review-test',
  )
  assert.equal(f.severity, 'high')
  assert.equal(f.locations.length, 2)
  assert.equal(f.locations[0].file, 'sunset/contract.algo.ts')
})

const RUBRIC = 'a'.repeat(64)
function report(findings, paths = ['arc58/dao']) {
  const summary = { critical: 0, high: 0, medium: 0, low: 0, info: 0 }
  for (const f of findings) summary[f.severity]++
  return {
    schema: 'akita.review-report.v1',
    subject: { kind: 'source', family: 'dao', commit: 'e7f174ee', paths },
    reviewer: { model: 'test', harnessCommit: 'abcdef0', rubricHash: RUBRIC, startedAt: '2026-11-24T00:00:00Z', finishedAt: '2026-11-24T00:10:00Z' },
    summary,
    findings,
    notReviewed: [],
    caveats: [],
  }
}
function finding(id, severity, title, locations) {
  return { id, severity, confidence: 'confirmed', title, locations, description: title, scenario: 's', fix: 'f', refutation: 'r' }
}

test('report validation catches count mismatches and overrated possible findings', () => {
  assert.deepEqual(validateReport(report([finding('dao-1', 'high', 'x', ['arc58/dao/contract.algo.ts:1'])])).errors, [])
  const bad = report([{ ...finding('dao-1', 'high', 'x', ['arc58/dao/contract.algo.ts:1']), confidence: 'possible' }])
  bad.summary.high = 2
  const { errors } = validateReport(bad)
  assert.ok(errors.some((e) => e.includes('possible')))
  assert.ok(errors.some((e) => e.startsWith('summary.high')))
  const bytecode = report([])
  bytecode.subject = { kind: 'bytecode', paths: ['approval.teal'] }
  assert.ok(validateReport(bytecode).errors.some((e) => e.includes('appId')))
})

test('scoring matches by file and lines or title, one to one, and scopes by reviewed paths', () => {
  const truth = [
    { id: 'T1', source: 's', severity: 'high', title: 'Bootstrap proposals survive activation', locations: [{ file: 'arc58/dao/contract.algo.ts', ranges: [[171, 192]] }] },
    { id: 'T2', source: 's', severity: 'medium', title: 'Quorum mixes voting power with raw token counts', locations: [{ file: 'arc58/dao/contract.algo.ts', ranges: [[600, 640]] }] },
    { id: 'T3', source: 's', severity: 'high', title: 'Not in the snapshot', locations: [{ file: 'arc58/guilds/core/contract.algo.ts', ranges: [[1, 2]] }] },
    { id: 'T4', source: 's', severity: 'low', title: 'Staking family, not reviewed', locations: [{ file: 'staking/contract.algo.ts', ranges: [[1, 2]] }] },
  ]
  const snapshotFiles = ['arc58/dao/contract.algo.ts', 'staking/contract.algo.ts']
  assert.ok(!inScope(truth[2], snapshotFiles, ['arc58/dao']))
  assert.ok(!inScope(truth[3], snapshotFiles, ['arc58/dao']))
  const reports = [
    report([
      finding('dao-1', 'high', 'Pre-initialization approvals execute later', ['arc58/dao/contract.algo.ts:180-185']),
      finding('dao-2', 'high', 'Duplicate of the same bootstrap issue', ['arc58/dao/contract.algo.ts:175']),
      finding('dao-3', 'low', 'Quorum compares voting power and token counts', ['arc58/dao/contract.algo.ts:2000']),
      finding('dao-4', 'info', 'Unrelated', ['arc58/dao/contract.algo.ts:5000']),
    ]),
  ]
  const result = score({ truth, reports, snapshotFiles, triage: { 'dao-4': 'false-positive' } })
  assert.equal(result.outOfScope, 2)
  const matched = Object.fromEntries(result.matches.map((m) => [m.truth, m.review]))
  // Two review findings describe T1; exactly one of them may claim it.
  assert.ok(['dao-1', 'dao-2'].includes(matched['s#T1']))
  assert.equal(matched['s#T2'], 'dao-3')
  assert.equal(result.matches.length, 2)
  assert.equal(result.recall.all.rate, 1)
  assert.deepEqual(result.precision, { valid: 2, judged: 3, untriaged: 1, rate: 2 / 3 })
})

test('program hash binds both programs', () => {
  const approval = Buffer.from([0x0a, 0x81, 0x01, 0x43])
  const clear = Buffer.from([0x0a, 0x81, 0x01])
  const h = programHashes(approval, clear)
  const a = createHash('sha256').update(approval).digest()
  const c = createHash('sha256').update(clear).digest()
  assert.equal(h.programHash, createHash('sha256').update(Buffer.concat([a, c])).digest('hex'))
  assert.notEqual(programHashes(approval, approval).programHash, h.programHash)
})

test('fetchApplication decodes programs from algod and reports deleted apps', async () => {
  const { createServer } = await import('node:http')
  const { fetchApplication } = await import('../scripts/core/program.mjs')
  const approval = Buffer.from([0x0a, 0x81, 0x01, 0x43])
  const clear = Buffer.from([0x0a, 0x81, 0x01])
  const server = createServer((req, res) => {
    if (req.url === '/v2/status') return res.end(JSON.stringify({ 'last-round': 42 }))
    if (req.url === '/v2/applications/7') {
      return res.end(JSON.stringify({ id: 7, params: { creator: 'C', 'approval-program': approval.toString('base64'), 'clear-state-program': clear.toString('base64') } }))
    }
    res.statusCode = 404
    res.end('{}')
  })
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
  const algod = `http://127.0.0.1:${server.address().port}`
  try {
    const app = await fetchApplication({ algod, appId: 7 })
    assert.equal(app.round, 42)
    assert.equal(app.programHash, programHashes(approval, clear).programHash)
    assert.deepEqual(await fetchApplication({ algod, appId: 8 }), { appId: 8, deleted: true })
  } finally {
    server.close()
  }
})

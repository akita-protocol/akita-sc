#!/usr/bin/env node
// Scores calibration reports against work/truth.json, separately for each audit
// run, and writes work/score.md and work/score.json.
//
//   node scripts/score.mjs --snapshot work/snapshots/e7f174ee0a1b --reports work/reviews/<run>
//
// Review findings that match no audit finding are listed for triage. Mark them
// in work/triage.json as { "<finding id>": "valid" | "false-positive" } and run
// the scorer again; precision counts only judged findings.
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'
import { score } from './core/match.mjs'
import { validateReport } from './core/report.mjs'

const ROOT = fileURLToPath(new URL('../', import.meta.url))
const { values } = parseArgs({
  options: {
    truth: { type: 'string', default: join(ROOT, 'work/truth.json') },
    snapshot: { type: 'string' },
    reports: { type: 'string' },
    triage: { type: 'string', default: join(ROOT, 'work/triage.json') },
    out: { type: 'string', default: join(ROOT, 'work/score') },
  },
})
if (!values.snapshot || !values.reports) {
  console.error('usage: score.mjs --snapshot <dir> --reports <dir> [--truth work/truth.json] [--triage work/triage.json]')
  process.exit(2)
}

const truth = JSON.parse(readFileSync(values.truth, 'utf8'))
const manifest = JSON.parse(readFileSync(join(values.snapshot, 'manifest.json'), 'utf8'))
const snapshotFiles = manifest.files.map((f) => f.key)
const triage = existsSync(values.triage) ? JSON.parse(readFileSync(values.triage, 'utf8')) : {}

const reports = []
for (const name of readdirSync(values.reports).filter((n) => n.endsWith('.json')).sort()) {
  const report = JSON.parse(readFileSync(join(values.reports, name), 'utf8'))
  const { errors } = validateReport(report)
  if (errors.length) {
    console.error(`${name} is not a valid report; fix it first:\n  ${errors.join('\n  ')}`)
    process.exit(1)
  }
  if (report.subject.commit && !manifest.commit.startsWith(report.subject.commit) && !report.subject.commit.startsWith(manifest.commit.slice(0, report.subject.commit.length))) {
    console.error(`${name} reviewed ${report.subject.commit}, but the snapshot is ${manifest.commit}`)
    process.exit(1)
  }
  reports.push(report)
}

const listOrNone = (items) => (items.length ? items : ['None.'])
const pct = (r) => (r.rate === null ? 'n/a' : `${Math.round(r.rate * 100)}%`)
const results = {}
const lines = [
  `# Calibration score`,
  '',
  `Snapshot ${manifest.commit.slice(0, 12)}, ${reports.length} reports, ${reports.reduce((n, r) => n + r.findings.length, 0)} review findings.`,
  '',
  'Recall counts only audit findings whose primary file exists in the snapshot and was under a path these reports reviewed. Findings about code that was uncommitted at the snapshot (guilds, Meta, DEX hooks), about deploy scripts, or about families not reviewed in this run are out of scope.',
  '',
]
for (const source of truth.sources.map((s) => s.source)) {
  const subset = truth.findings.filter((f) => f.source === source)
  const result = score({ truth: subset, reports, snapshotFiles, triage })
  results[source] = result
  const r = result.recall
  lines.push(
    `## ${source}`,
    '',
    `${result.outOfScope} of ${subset.length} findings were out of scope.`,
    '',
    '| Severity | Found | In scope | Recall |',
    '| --- | --- | --- | --- |',
    ...['critical', 'high', 'medium', 'low', 'info'].map((s) => `| ${s} | ${r[s].found} | ${r[s].total} | ${pct(r[s])} |`),
    `| critical + high | ${r.criticalOrHigh.found} | ${r.criticalOrHigh.total} | ${pct(r.criticalOrHigh)} |`,
    `| all | ${r.all.found} | ${r.all.total} | ${pct(r.all)} |`,
    '',
    `Precision: ${pct(result.precision)} (${result.precision.valid} valid of ${result.precision.judged} judged; ${result.precision.untriaged} unmatched findings still need triage).`,
    '',
    '### Missed critical and high findings',
    '',
    ...listOrNone(result.missed.filter((m) => m.severity === 'critical' || m.severity === 'high').map((m) => `- ${m.key} (${m.severity}): ${m.title}`)),
    '',
  )
}

const unmatched = new Map()
for (const result of Object.values(results)) {
  for (const u of result.unmatchedReviews) unmatched.set(u.id, (unmatched.get(u.id) ?? 0) + 1)
}
const sourceCount = Object.keys(results).length
const neverMatched = [...unmatched].filter(([, n]) => n === sourceCount).map(([id]) => id)
const byId = new Map(reports.flatMap((r) => r.findings.map((f) => [f.id, f])))
lines.push(
  '## Needs triage',
  '',
  'These review findings match no finding in any audit. Each is either a false positive or something the audits missed; mark it in `work/triage.json`.',
  '',
  ...listOrNone(neverMatched.map((id) => `- ${id} (${byId.get(id).severity}, ${byId.get(id).confidence}): ${byId.get(id).title}${triage[id] ? ` [${triage[id]}]` : ''}`)),
  '',
)

writeFileSync(`${values.out}.json`, JSON.stringify({ snapshot: manifest.commit, results, needsTriage: neverMatched }, null, 2) + '\n')
writeFileSync(`${values.out}.md`, lines.join('\n'))
console.log(lines.join('\n'))
console.log(`\nwrote ${resolve(values.out)}.md and .json`)

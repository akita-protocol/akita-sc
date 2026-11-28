#!/usr/bin/env node
// Builds work/truth.json from an audits folder. Run it only when scoring, never
// inside a review session: the reviewer must not see these findings.
//
//   node scripts/extract-truth.mjs --audits <akita-sc>/projects/akita-sc/audits
//
// Recognized inside the folder:
//   full-*/audit-*.md           Markdown audits, one heading per finding
//   review-*/report-data.json   structured findings
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'
import { fromAuditMarkdown, fromReportData } from './core/audits.mjs'

const ROOT = fileURLToPath(new URL('../', import.meta.url))
const { values } = parseArgs({
  options: {
    audits: { type: 'string' },
    out: { type: 'string', default: join(ROOT, 'work/truth.json') },
  },
})
if (!values.audits) {
  console.error('usage: extract-truth.mjs --audits <folder> [--out work/truth.json]')
  process.exit(2)
}

const dir = resolve(values.audits)
const findings = []
const sources = []
for (const name of readdirSync(dir).sort()) {
  const sub = join(dir, name)
  if (!statSync(sub).isDirectory()) continue
  const data = join(sub, 'report-data.json')
  if (/^review-/.test(name) && existsSync(data)) {
    const parsed = fromReportData(JSON.parse(readFileSync(data, 'utf8')), name)
    findings.push(...parsed)
    sources.push({ source: name, findings: parsed.length })
  }
  if (/^full-/.test(name)) {
    let count = 0
    for (const file of readdirSync(sub).filter((f) => /^audit-.*\.md$/.test(f)).sort()) {
      // IDs such as "L-1" repeat across files, so qualify them with the file's family.
      const family = file.replace(/^audit-|\.md$/g, '')
      const parsed = fromAuditMarkdown(readFileSync(join(sub, file), 'utf8'), name).map((f) => ({ ...f, id: `${family}/${f.id}`, group: family }))
      findings.push(...parsed)
      count += parsed.length
    }
    sources.push({ source: name, findings: count })
  }
}

mkdirSync(dirname(resolve(values.out)), { recursive: true })
writeFileSync(values.out, JSON.stringify({ generatedAt: new Date().toISOString(), sources, findings }, null, 2) + '\n')
for (const s of sources) console.log(`${s.source}: ${s.findings} findings`)
const missing = findings.filter((f) => !f.severity || !f.locations.length)
if (missing.length) console.log(`${missing.length} findings have no severity or no file location and will not be matched`)

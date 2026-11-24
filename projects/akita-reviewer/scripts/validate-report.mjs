#!/usr/bin/env node
// Validates review reports. Exits 1 when any report has errors.
//
//   node scripts/validate-report.mjs work/reviews/<run>/*.json
import { readFileSync } from 'node:fs'
import { rubricHash, validateReport } from './core/report.mjs'

const files = process.argv.slice(2)
if (!files.length) {
  console.error('usage: validate-report.mjs <report.json> [...]')
  process.exit(2)
}
const expectedRubricHash = rubricHash()
let failed = false
for (const file of files) {
  let report
  try {
    report = JSON.parse(readFileSync(file, 'utf8'))
  } catch (error) {
    console.log(`${file}: not valid JSON (${error.message})`)
    failed = true
    continue
  }
  const { errors, warnings } = validateReport(report, { expectedRubricHash })
  for (const e of errors) console.log(`${file}: error: ${e}`)
  for (const w of warnings) console.log(`${file}: warning: ${w}`)
  if (errors.length) failed = true
  else console.log(`${file}: ok (${report.findings.length} findings)`)
}
process.exit(failed ? 1 : 0)

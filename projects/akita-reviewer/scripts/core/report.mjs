// Checks a review report against schema/review-report.schema.json without
// pulling in a JSON Schema library. The checks mirror the schema; keep both in
// step when either changes.
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { sha256Hex } from './program.mjs'
import { SEVERITIES } from './audits.mjs'

const ROOT = fileURLToPath(new URL('../../', import.meta.url))

export function rubricHash() {
  return sha256Hex(readFileSync(ROOT + 'CLAUDE.md'))
}

const SHA256 = /^[0-9a-f]{64}$/
const COMMIT = /^[0-9a-f]{7,40}$/
const CONFIDENCE = ['confirmed', 'likely', 'possible']

function checkKeys(obj, allowed, where, errors) {
  for (const key of Object.keys(obj)) if (!allowed.includes(key)) errors.push(`${where}: unexpected field "${key}"`)
}

function requireString(obj, key, where, errors) {
  if (typeof obj[key] !== 'string' || obj[key].length === 0) errors.push(`${where}.${key} must be a non-empty string`)
}

export function validateReport(report, { expectedRubricHash } = {}) {
  const errors = []
  const warnings = []
  if (typeof report !== 'object' || report === null) return { errors: ['report must be an object'], warnings }
  checkKeys(report, ['schema', 'subject', 'reviewer', 'summary', 'findings', 'notReviewed', 'caveats'], 'report', errors)
  if (report.schema !== 'akita.review-report.v1') errors.push('schema must be "akita.review-report.v1"')

  const subject = report.subject ?? {}
  checkKeys(subject, ['kind', 'family', 'repo', 'commit', 'network', 'appId', 'round', 'approvalHash', 'clearHash', 'programHash', 'paths'], 'subject', errors)
  if (!['source', 'bytecode'].includes(subject.kind)) errors.push('subject.kind must be "source" or "bytecode"')
  if (!Array.isArray(subject.paths) || subject.paths.length === 0) errors.push('subject.paths must list at least one path')
  if (subject.commit !== undefined && !COMMIT.test(subject.commit)) errors.push('subject.commit must be a hex commit')
  for (const key of ['approvalHash', 'clearHash', 'programHash']) {
    if (subject[key] !== undefined && !SHA256.test(subject[key])) errors.push(`subject.${key} must be a sha256 hex string`)
  }
  if (subject.kind === 'bytecode' && !(Number.isInteger(subject.appId) && SHA256.test(subject.programHash ?? ''))) {
    errors.push('a bytecode review needs subject.appId and subject.programHash')
  }
  if (subject.kind === 'source' && !subject.commit) warnings.push('a source review should name subject.commit')

  const reviewer = report.reviewer ?? {}
  checkKeys(reviewer, ['model', 'harnessCommit', 'rubricHash', 'startedAt', 'finishedAt'], 'reviewer', errors)
  requireString(reviewer, 'model', 'reviewer', errors)
  if (!COMMIT.test(reviewer.harnessCommit ?? '')) errors.push('reviewer.harnessCommit must be a hex commit')
  if (!SHA256.test(reviewer.rubricHash ?? '')) errors.push('reviewer.rubricHash must be a sha256 hex string')
  else if (expectedRubricHash && reviewer.rubricHash !== expectedRubricHash) {
    warnings.push('reviewer.rubricHash does not match the current CLAUDE.md')
  }
  for (const key of ['startedAt', 'finishedAt']) {
    if (Number.isNaN(Date.parse(reviewer[key] ?? ''))) errors.push(`reviewer.${key} must be an ISO date-time`)
  }

  const findings = Array.isArray(report.findings) ? report.findings : (errors.push('findings must be an array'), [])
  const ids = new Set()
  findings.forEach((f, i) => {
    const where = `findings[${i}]`
    checkKeys(f, ['id', 'severity', 'confidence', 'title', 'locations', 'description', 'scenario', 'fix', 'refutation'], where, errors)
    if (!/^[a-z0-9-]+-[0-9]+$/.test(f.id ?? '')) errors.push(`${where}.id must look like "<family>-<n>"`)
    if (ids.has(f.id)) errors.push(`${where}.id "${f.id}" is repeated`)
    ids.add(f.id)
    if (!SEVERITIES.includes(f.severity)) errors.push(`${where}.severity must be one of ${SEVERITIES.join(', ')}`)
    if (!CONFIDENCE.includes(f.confidence)) errors.push(`${where}.confidence must be one of ${CONFIDENCE.join(', ')}`)
    if (f.confidence === 'possible' && ['critical', 'high'].includes(f.severity)) {
      errors.push(`${where}: "possible" findings may not be rated above medium`)
    }
    for (const key of ['title', 'description', 'scenario', 'fix', 'refutation']) requireString(f, key, where, errors)
    if ((f.title ?? '').length > 200) errors.push(`${where}.title is longer than 200 characters`)
    if (!Array.isArray(f.locations) || f.locations.length === 0) errors.push(`${where}.locations must list at least one location`)
    else if (!f.locations.some((l) => /:\d/.test(l))) {
      warnings.push(`${where} has no location with a line number`)
    }
    const banned = /\b(safe|secure|verified|audited)\b/i
    if (banned.test(f.title ?? '')) warnings.push(`${where}.title uses wording the rubric forbids`)
  })

  const summary = report.summary ?? {}
  checkKeys(summary, SEVERITIES, 'summary', errors)
  for (const severity of SEVERITIES) {
    const counted = findings.filter((f) => f.severity === severity).length
    if (summary[severity] !== counted) errors.push(`summary.${severity} is ${summary[severity]}, but ${counted} findings have that severity`)
  }
  for (const key of ['notReviewed', 'caveats']) {
    if (!Array.isArray(report[key]) || report[key].some((x) => typeof x !== 'string')) errors.push(`${key} must be an array of strings`)
  }
  return { errors, warnings }
}

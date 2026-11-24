// Scores a set of review findings against ground-truth audit findings.
//
// A truth finding is "in scope" only when its primary file exists in the
// snapshot and was part of what the reports reviewed: findings about scripts,
// about code that was never committed at the snapshot's commit, or about
// families not reviewed in this run cannot be found and are left out of recall.
//
// A review finding matches a truth finding when they cite the same file and
// either their line ranges come within LINE_SLACK lines or their titles share
// enough words. Each finding is matched at most once, best pairs first.
import { lineGap, normalizePath, parseLocation, sameFile } from './locations.mjs'
import { SEVERITIES } from './audits.mjs'

export const LINE_SLACK = 30
export const TITLE_THRESHOLD = 0.15

const STOP = new Set(
  'the and for are can any not but its with that this from into when than then each only one all via has have was were will would'.split(' '),
)

export function tokens(text) {
  return new Set(
    (text ?? '')
      .toLowerCase()
      .replace(/[`'"]/g, '')
      .split(/[^a-z0-9]+/)
      .filter((w) => w.length > 2 && !STOP.has(w)),
  )
}

export function jaccard(a, b) {
  if (!a.size || !b.size) return 0
  let shared = 0
  for (const w of a) if (b.has(w)) shared++
  return shared / (a.size + b.size - shared)
}

export function truthKey(f) {
  return `${f.source}#${f.id}`
}

/**
 * A truth finding is in scope when its primary (first) file exists in the
 * snapshot and sits under a path one of the reports reviewed. Later locations
 * are often cross-references into other contracts, so they do not count.
 */
export function inScope(truth, snapshotFiles, reviewedPaths) {
  const primary = truth.locations[0]
  if (!primary) return false
  const under = (file) => reviewedPaths.some((p) => file === p || file.startsWith(p.replace(/\/+$/, '') + '/'))
  // A bare file name such as "contract.algo.ts" is ambiguous; count it only
  // when it names exactly one snapshot file.
  const candidates = snapshotFiles.filter((file) => sameFile(file, primary.file))
  if (!primary.file.includes('/') && candidates.length !== 1) return false
  return candidates.some(under)
}

/** Review findings carry locations as strings; parse them once. */
export function reviewFindings(reports) {
  const out = []
  for (const report of reports) {
    for (const f of report.findings ?? []) {
      out.push({ ...f, family: report.subject?.family ?? null, parsed: f.locations.map(parseLocation).filter(Boolean) })
    }
  }
  return out
}

function pairScore(truth, review) {
  let fileHit = false
  let lineHit = false
  for (const t of truth.locations) {
    for (const r of review.parsed) {
      if (!sameFile(t.file, r.file)) continue
      fileHit = true
      if (t.ranges.length && r.ranges.length && lineGap(t.ranges, r.ranges) <= LINE_SLACK) lineHit = true
    }
  }
  if (!fileHit) return null
  const title = jaccard(tokens(truth.title), tokens(`${review.title} ${review.description ?? ''}`))
  if (!lineHit && title < TITLE_THRESHOLD) return null
  return { score: (lineHit ? 1 : 0.5) + title, lineHit, title }
}

export function score({ truth, reports, snapshotFiles, triage = {} }) {
  const reviews = reviewFindings(reports)
  const reviewedPaths = reports.flatMap((r) => (r.subject?.paths ?? []).map(normalizePath))
  const scoped = truth.filter((t) => inScope(t, snapshotFiles, reviewedPaths))
  const outOfScope = truth.filter((t) => !inScope(t, snapshotFiles, reviewedPaths))

  const pairs = []
  for (const t of scoped) {
    for (const r of reviews) {
      const s = pairScore(t, r)
      if (s) pairs.push({ truth: t, review: r, ...s })
    }
  }
  pairs.sort((a, b) => b.score - a.score)
  const usedTruth = new Set()
  const usedReview = new Set()
  const matches = []
  for (const p of pairs) {
    const tk = truthKey(p.truth)
    if (usedTruth.has(tk) || usedReview.has(p.review.id)) continue
    usedTruth.add(tk)
    usedReview.add(p.review.id)
    matches.push(p)
  }

  const recall = {}
  for (const severity of SEVERITIES) {
    const total = scoped.filter((t) => t.severity === severity).length
    const found = matches.filter((m) => m.truth.severity === severity).length
    recall[severity] = { found, total, rate: total ? found / total : null }
  }
  const total = scoped.length
  recall.all = { found: matches.length, total, rate: total ? matches.length / total : null }
  const serious = scoped.filter((t) => t.severity === 'critical' || t.severity === 'high')
  const seriousFound = matches.filter((m) => m.truth.severity === 'critical' || m.truth.severity === 'high').length
  recall.criticalOrHigh = { found: seriousFound, total: serious.length, rate: serious.length ? seriousFound / serious.length : null }

  // Unmatched review findings may be real issues the audits missed. Only a
  // person can tell, so precision counts the ones triaged so far.
  const unmatchedReviews = reviews.filter((r) => !usedReview.has(r.id))
  const triaged = unmatchedReviews.filter((r) => triage[r.id] === 'valid' || triage[r.id] === 'false-positive')
  const valid = matches.length + triaged.filter((r) => triage[r.id] === 'valid').length
  const judged = matches.length + triaged.length
  const precision = {
    valid,
    judged,
    untriaged: unmatchedReviews.length - triaged.length,
    rate: judged ? valid / judged : null,
  }

  return {
    recall,
    precision,
    matches: matches.map((m) => ({
      truth: truthKey(m.truth),
      review: m.review.id,
      truthSeverity: m.truth.severity,
      reviewSeverity: m.review.severity,
      lineHit: m.lineHit,
      titleSimilarity: Number(m.title.toFixed(2)),
    })),
    missed: scoped.filter((t) => !usedTruth.has(truthKey(t))).map((t) => ({ key: truthKey(t), severity: t.severity, title: t.title })),
    unmatchedReviews: unmatchedReviews.map((r) => ({ id: r.id, severity: r.severity, title: r.title, triage: triage[r.id] ?? null })),
    outOfScope: outOfScope.length,
    reviewCount: reviews.length,
  }
}

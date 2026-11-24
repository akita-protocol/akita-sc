// Parses and compares code locations such as "arc58/dao/contract.algo.ts:171-192".
//
// Audits and reviews name files in different ways: relative to
// projects/akita-sc/smart_contracts, prefixed with "smart_contracts/", or
// repository-relative ("projects/akita-plugin/base.algo.ts"). normalizePath
// reduces all of them to one key.

const SMART_CONTRACTS = 'projects/akita-sc/smart_contracts/'

export function normalizePath(path) {
  let p = path.trim().replace(/^\.\//, '').replace(/\\/g, '/')
  const index = p.indexOf('smart_contracts/')
  if (index >= 0) return p.slice(index + 'smart_contracts/'.length)
  return p
}

/** Repository-relative path for a normalized key. */
export function repoPath(key) {
  return key.startsWith('projects/') ? key : SMART_CONTRACTS + key
}

/**
 * Parses "file:12", "file:12-30", "file:12-30,44" or "file". Returns
 * { file, ranges: [[start, end], ...] }, or null when there is no source file.
 */
export function parseLocation(text) {
  const match = /^\s*([\w./@{}-]+\.(?:algo\.)?ts)(?::([\d\s,–-]+))?/.exec(text)
  if (!match) return null
  return { file: normalizePath(match[1]), ranges: parseRanges(match[2] ?? '') }
}

export function parseRanges(text) {
  const ranges = []
  for (const part of text.split(',')) {
    const m = /(\d+)\s*(?:[-–]\s*(\d+))?/.exec(part)
    if (!m) continue
    const start = Number(m[1])
    const end = m[2] ? Number(m[2]) : start
    ranges.push([Math.min(start, end), Math.max(start, end)])
  }
  return ranges
}

/** True when one path is the other, or ends with it at a "/" boundary. */
export function sameFile(a, b) {
  if (a === b) return true
  const [long, short] = a.length >= b.length ? [a, b] : [b, a]
  return long.endsWith('/' + short)
}

/** Smallest gap in lines between two range lists; 0 when they overlap. */
export function lineGap(rangesA, rangesB) {
  let best = Infinity
  for (const [a0, a1] of rangesA) {
    for (const [b0, b1] of rangesB) {
      const gap = Math.max(0, Math.max(a0, b0) - Math.min(a1, b1))
      best = Math.min(best, gap)
    }
  }
  return best
}

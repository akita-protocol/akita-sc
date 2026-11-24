// Turns Akita's past audit reports into one list of "ground truth" findings
// that a calibration run is scored against.
//
// Two formats exist:
// - review-*/report-data.json: structured findings with severity and locations.
// - full-*/audit-*.md: Markdown, one heading per finding, in a few house styles
//   ("### DAO-01: title", "## S-01 — title (High, Confirmed)", "### C-1: title").
import { parseLocation, parseRanges } from './locations.mjs'

export const SEVERITIES = ['critical', 'high', 'medium', 'low', 'info']

export function normalizeSeverity(text) {
  const m = /\b(critical|high|medium|low|info(?:rmational)?)\b/i.exec(text ?? '')
  if (!m) return null
  const word = m[1].toLowerCase()
  return word.startsWith('info') ? 'info' : word
}

// "C-1", "H-2", "M-3", "L-4", "I-1" encode severity in the ID itself.
const ID_PREFIX_SEVERITY = { C: 'critical', H: 'high', M: 'medium', L: 'low', I: 'info' }

export function fromReportData(data, source) {
  return (data.findings ?? []).map((f) => ({
    id: f.id,
    source,
    group: f.slice ?? null,
    severity: normalizeSeverity(f.severity),
    title: f.title,
    locations: (f.location ?? []).map(parseLocation).filter(Boolean),
    status: f.status ?? null,
  }))
}

const HEADING = /^(#{2,3})\s+([A-Z][A-Z0-9]*-?\d+[a-z]?)\s*(?::|—|–|-)\s+(.+?)\s*$/

/** Extracts locations from text that cites files in backticks. */
export function locationsFromText(text) {
  const out = []
  const span = /`([^`]+)`(:[\d\s,–-]+)?/g
  let m
  while ((m = span.exec(text))) {
    const inner = m[1].trim()
    const trailing = m[2] ? m[2].slice(1) : ''
    if (/^:[\d\s,–-]+$/.test(inner)) {
      // A bare ":994-1081" continues the previous file.
      const last = out.at(-1)
      if (last) last.ranges.push(...parseRanges(inner.slice(1)))
      continue
    }
    const loc = parseLocation(inner)
    if (!loc) continue
    // A bare "validator.algo.ts" sits beside the file cited before it.
    const previous = [...out].reverse().find((l) => l.file.includes('/'))
    if (!loc.file.includes('/') && previous) loc.file = previous.file.replace(/[^/]+$/, loc.file)
    if (trailing) loc.ranges.push(...parseRanges(trailing))
    out.push(loc)
  }
  return out
}

function locationBlock(section) {
  const marker = /\*\*Locations?:?\*\*:?/i.exec(section)
  if (!marker) return section
  const rest = section.slice(marker.index + marker[0].length)
  const end = rest.search(/\n\s*(?:-\s+)?\*\*[A-Z][^*]*\*\*/)
  return end >= 0 ? rest.slice(0, end) : rest
}

/** Severity from a summary table row such as "| SG-01 | High | Confirmed | ... |". */
function tableSeverities(text) {
  const map = new Map()
  for (const line of text.split('\n')) {
    if (!line.startsWith('|')) continue
    const cells = line.split('|').map((c) => c.trim())
    const id = cells.find((c) => /^[A-Z][A-Z0-9]*-?\d+[a-z]?$/.test(c))
    if (!id) continue
    for (const cell of cells) {
      if (cell === id) continue
      const severity = /^(critical|high|medium|low|info(?:rmational)?)\b/i.test(cell) ? normalizeSeverity(cell) : null
      if (severity) {
        map.set(id, severity)
        break
      }
    }
  }
  return map
}

export function fromAuditMarkdown(text, source) {
  const lines = text.split('\n')
  const table = tableSeverities(text)
  const heads = []
  lines.forEach((line, index) => {
    const m = HEADING.exec(line)
    if (m) heads.push({ index, level: m[1].length, id: m[2], title: m[3] })
  })
  // Some reports cite bare file names ("graph.algo.ts") after listing full
  // paths in their scope section. Resolve each bare name to the first full
  // path in the report with the same base name.
  const known = locationsFromText(text).map((l) => l.file).filter((f) => f.includes('/'))
  const resolveBare = (loc) => {
    if (loc.file.includes('/')) return loc
    const full = known.find((f) => f.endsWith('/' + loc.file))
    return full ? { ...loc, file: full } : loc
  }
  return heads.map((head) => {
    let end = lines.length
    for (let i = head.index + 1; i < lines.length; i++) {
      if (/^#{1,3}\s/.test(lines[i])) {
        end = i
        break
      }
    }
    const section = lines.slice(head.index + 1, end).join('\n')
    let title = head.title
    let severity = null
    const paren = /\s*\(([^()]*)\)\s*$/.exec(title)
    if (paren && normalizeSeverity(paren[1]) && /^(critical|high|medium|low|info)/i.test(paren[1].trim())) {
      severity = normalizeSeverity(paren[1])
      title = title.slice(0, paren.index)
    }
    severity ??= normalizeSeverity(/\*\*Severity:?\*\*:?\s*([^\n]*)/i.exec(section)?.[1])
    severity ??= table.get(head.id) ?? null
    severity ??= ID_PREFIX_SEVERITY[/^([CHMLI])-\d/.exec(head.id)?.[1]] ?? null
    return {
      id: head.id,
      source,
      group: null,
      severity,
      title: title.replace(/`/g, '').trim(),
      locations: locationsFromText(locationBlock(section)).map(resolveBare),
      status: null,
    }
  })
}

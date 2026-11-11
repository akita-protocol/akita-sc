/**
 * release/manifest.json pins the bytes of every program under smart_contracts/artifacts. The deploy and
 * update scripts send whatever is in that folder, so the manifest is the reviewed record of what a release
 * contains. This test fails when the artifacts and the manifest drift apart: after an intended rebuild, run
 * `npm run release:manifest` and commit the manifest together with the artifacts.
 */
import { readFileSync } from 'node:fs'
import { describe, expect, test } from 'vitest'
// @ts-expect-error plain ES module without type declarations
import { buildManifest, diffManifest, manifestPath, serialize } from '../scripts/release-manifest.mjs'

describe('release manifest', () => {
  const committed = JSON.parse(readFileSync(manifestPath, 'utf8'))
  const built = buildManifest()

  test('matches the built artifacts', () => {
    expect(diffManifest(committed, built)).toEqual([])
    expect(readFileSync(manifestPath, 'utf8')).toBe(serialize(built))
  })

  test('covers every program once, with one compiler', () => {
    const programs = Object.entries(built.programs) as [string, { name: string; approval: { bytes: number; sha256: string }; clear: { bytes: number }; extraPages: number }][]
    expect(programs.length).toBeGreaterThan(100)
    expect(built.compiler.puya).toMatch(/^\d+\.\d+\.\d+$/)
    for (const [key, program] of programs) {
      expect(key.endsWith(`/${program.name}`), key).toBe(true)
      expect(program.approval.sha256, key).toMatch(/^[0-9a-f]{64}$/)
      // the AVM holds approval + clear in at most 8 pages of 2,048 bytes
      expect(program.approval.bytes + program.clear.bytes, key).toBeLessThanOrEqual((program.extraPages + 1) * 2048)
      expect(program.extraPages, key).toBeLessThanOrEqual(7)
    }
  })

  test('reports what changed, one line per program', () => {
    const changed = JSON.parse(JSON.stringify(built))
    const [first, second] = Object.keys(changed.programs)
    changed.programs[first].approval.sha256 = '0'.repeat(64)
    delete changed.programs[second]
    changed.programs['x/New'] = changed.programs[first]
    const lines = diffManifest(changed, built)
    expect(lines).toHaveLength(3)
    expect(lines.join('\n')).toContain(`${first}: approval changed`)
    expect(lines.join('\n')).toContain(`${second}: built but not in the manifest`)
    expect(lines.join('\n')).toContain('x/New: in the manifest but not built')
  })
})

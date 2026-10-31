import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

/**
 * CI size gate (FINAL-SPEC §4.9). Programs up to 16 KB are accepted (extraPages ≤ 7), but the Vault is
 * held to 15,000 B (size only affects the one-time creation cost; Kyle, 2026-10-02) so later work
 * packages keep headroom; every other plugin-dex app to 14,000 B.
 * Reads `byteCode.approval` from the compiled ARC-56 artifacts, so run the build first.
 */
const VaultLimit = 15_000
const AppLimit = 14_000

const artifacts = path.resolve(__dirname, '../artifacts/plugin-dex')

const arc56Files = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name)
    if (entry.isDirectory()) return arc56Files(file)
    return entry.name.endsWith('.arc56.json') ? [file] : []
  })

const approvalBytes = (file: string): number => {
  const spec = JSON.parse(readFileSync(file, 'utf8')) as { byteCode?: { approval?: string } }
  expect(spec.byteCode?.approval, `${file} has no compiled approval program`).toBeTruthy()
  return Buffer.from(spec.byteCode!.approval!, 'base64').length
}

describe('plugin-dex program size gate', () => {
  const files = arc56Files(artifacts)

  test(`PluginDex (Vault) approval ≤ ${VaultLimit} B`, () => {
    const vault = files.find((file) => path.basename(file) === 'PluginDex.arc56.json')
    expect(vault, 'PluginDex.arc56.json missing; build plugin-dex first').toBeDefined()
    expect(approvalBytes(vault!)).toBeLessThanOrEqual(VaultLimit)
  })

  test(`every other plugin-dex app approval ≤ ${AppLimit} B`, () => {
    const oversized = files
      .filter((file) => path.basename(file) !== 'PluginDex.arc56.json')
      .map((file) => ({ app: path.relative(artifacts, file), bytes: approvalBytes(file) }))
      .filter(({ bytes }) => bytes > AppLimit)
    expect(oversized).toEqual([])
  })

  /**
   * Release gate (FINAL-SPEC §10, A7): the WP0 skeleton's temporary 'errPdni' stubs must all be gone
   * before the Vault can ship. The last ones (externals, write-down) were removed in WP1-M4, so the gate
   * now always runs.
   */
  test('release: the Vault has no errPdni (not-implemented) stubs', () => {
    const teal = readFileSync(path.join(artifacts, 'PluginDex.approval.teal'), 'utf8')
    expect(teal.includes('errPdni')).toBe(false)
  })
})

import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'
import { INTERNAL_BEGIN, INTERNAL_END, mirrorOf, PRINCIPAL_MIRROR, PRINCIPAL_SOURCE } from '../scripts/lib/principal-mirror'

/**
 * Phase 0 (docs/principal-resolution/PHASE-0-SPEC.md §3.3, §5.4): `@akta/plugin` ships a copy of the
 * principal helper, byte-for-byte except the Akita-only `@akita-sc-only` block. Fix drift with
 * `npx tsx scripts/sync-akita-plugin-principal.ts`.
 */
const source = path.resolve(__dirname, '../smart_contracts/utils/principal.ts')
const mirror = path.resolve(__dirname, '../../akita-plugin/principal.ts')

/** Names a third party must never be able to import from `@akta/plugin` or `@akta/plugin/principal`. */
const INTERNAL_ONLY = ['resolvePrincipalCtx', 'resolvePrincipalFromDexCtx', 'walletControlsLive', 'tipWalletFor']
/** Akita-only exports that live in the stripped block (present in the source, absent from the mirror). */
const STRIPPED = ['resolvePrincipalFromDexCtx', 'tipWalletFor']

const stripComments = (text: string) => text.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '')
const exportedFunctions = (text: string) =>
  [...stripComments(text).matchAll(/^export function (\w+)/gm)].map((m) => m[1])

describe('principal helper mirror', () => {
  test('the sync paths are the files this test checks', () => {
    expect(PRINCIPAL_SOURCE).toBe(source)
    expect(PRINCIPAL_MIRROR).toBe(mirror)
  })

  test('akita-plugin/principal.ts is utils/principal.ts byte-for-byte minus the @akita-sc-only block', () => {
    const src = readFileSync(source, 'utf8')
    expect(readFileSync(mirror, 'utf8')).toBe(mirrorOf(src))
    // only the block is removed: everything before the begin marker is identical
    const head = src.slice(0, src.indexOf(INTERNAL_BEGIN)).replace(/\n+$/, '')
    expect(readFileSync(mirror, 'utf8').startsWith(head)).toBe(true)
  })

  test('mirrorOf refuses a source without exactly one well-formed internal block', () => {
    expect(() => mirrorOf('export const a = 1\n')).toThrow()
    expect(() => mirrorOf(`${INTERNAL_END}\nx\n${INTERNAL_BEGIN}\n`)).toThrow()
    expect(() => mirrorOf(`${INTERNAL_BEGIN}\n${INTERNAL_END}\n${INTERNAL_BEGIN}\n${INTERNAL_END}\n`)).toThrow()
    expect(mirrorOf(`a\n\n${INTERNAL_BEGIN}\nsecret\n${INTERNAL_END}\nb\n`)).toBe('a\nb\n')
  })

  test('the internal-only helpers are not exported by the mirror (nor by the package root)', () => {
    const mirrorExports = exportedFunctions(readFileSync(mirror, 'utf8'))
    for (const name of INTERNAL_ONLY) expect(mirrorExports).not.toContain(name)
    for (const name of STRIPPED) expect(readFileSync(mirror, 'utf8')).not.toMatch(new RegExp(`\\b${name}\\b`))
    // the source keeps them for Akita contracts (PluginDex hooks, functions.ts tipWallet)
    const sourceExports = exportedFunctions(readFileSync(source, 'utf8'))
    for (const name of STRIPPED) expect(sourceExports).toContain(name)
    expect(sourceExports).not.toContain('walletControlsLive')
    expect(sourceExports).not.toContain('resolvePrincipalCtx')
  })

  test('the helper is self-contained (imports only algorand-typescript)', () => {
    const imports = [...readFileSync(source, 'utf8').matchAll(/^import .* from '([^']+)'/gm)].map((m) => m[1])
    expect(imports.length).toBeGreaterThan(0)
    expect(imports.filter((m) => !m.startsWith('@algorandfoundation/algorand-typescript'))).toEqual([])
  })

  test('@akta/plugin exports the third-party surface but not the internal helpers', () => {
    const index = stripComments(readFileSync(path.resolve(__dirname, '../../akita-plugin/index.ts'), 'utf8'))
    for (const name of [
      'isGenuineWallet', 'resolvePrincipal', 'tryResolvePrincipal', 'quoteReferrer', 'ownsAtRest',
      'atRestPrincipal', 'thirdPartyPrincipal', 'gateCtx', 'ctxOwns', 'pluginPrincipal', 'windowHint', 'controls',
    ]) {
      expect(index).toMatch(new RegExp(`\\b${name}\\b`))
    }
    for (const name of INTERNAL_ONLY) expect(index).not.toMatch(new RegExp(`\\b${name}\\b`))
    // every function the mirror exports is re-exported by the package root
    for (const name of exportedFunctions(readFileSync(mirror, 'utf8'))) expect(index).toMatch(new RegExp(`\\b${name}\\b`))
  })

  test('error codes inlined in the helper match utils/errors.ts', () => {
    const helper = readFileSync(source, 'utf8')
    const errors = readFileSync(path.resolve(__dirname, '../smart_contracts/utils/errors.ts'), 'utf8')
    const value = (text: string, name: string) => text.match(new RegExp(`export const ${name} = '([^']+)'`))?.[1]
    // [name in principal.ts, name in utils/errors.ts]
    for (const [helperName, errorsName] of [
      ['errHintNotWallet', 'errHintNotWallet'],
      ['errHintTopLevel', 'errHintTopLevel'],
      ['errHintNotBound', 'errHintNotBound'],
      ['errHintNotOwner', 'errHintNotOwner'],
      ['errHintBadWallet', 'errInvalidWallet'],
      ['errHintPluginNotAuth', 'errPluginNotAuthAddr'],
    ]) {
      expect(value(helper, helperName), helperName).toBeDefined()
      expect(value(helper, helperName), helperName).toBe(value(errors, errorsName))
    }
  })
})

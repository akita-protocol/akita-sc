/**
 * Shared by `scripts/sync-akita-plugin-principal.ts` and `tests/principal-sync.test.ts`.
 *
 * `akita-plugin/principal.ts` (the `@akta/plugin` mirror) is `smart_contracts/utils/principal.ts`
 * byte-for-byte, minus the Akita-internal block between the marker lines below. That block holds
 * helpers that trust caller-supplied context (`resolvePrincipalFromDexCtx`) or must not be part of the
 * third-party surface (`tipWalletFor`); see docs/principal-resolution/IMPLEMENTATION-LOG.md.
 */
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
export const PRINCIPAL_SOURCE = path.resolve(here, '../../smart_contracts/utils/principal.ts')
export const PRINCIPAL_MIRROR = path.resolve(here, '../../../akita-plugin/principal.ts')

export const INTERNAL_BEGIN = '// @akita-sc-only:begin'
export const INTERNAL_END = '// @akita-sc-only:end'

/**
 * The mirror text for `source`: drop every line from the INTERNAL_BEGIN marker line through the
 * INTERNAL_END marker line, plus the single blank line that precedes the block. Throws unless the
 * source has exactly one well-formed block, so a missing or broken marker can never leak the block.
 */
export function mirrorOf(source: string): string {
  const lines = source.split('\n')
  const begins = lines.flatMap((line, i) => (line.startsWith(INTERNAL_BEGIN) ? [i] : []))
  const ends = lines.flatMap((line, i) => (line.startsWith(INTERNAL_END) ? [i] : []))
  if (begins.length !== 1 || ends.length !== 1 || ends[0] <= begins[0]) {
    throw new Error(
      `principal.ts must contain exactly one '${INTERNAL_BEGIN}' line followed by one '${INTERNAL_END}' line`
    )
  }
  const start = begins[0] > 0 && lines[begins[0] - 1] === '' ? begins[0] - 1 : begins[0]
  return [...lines.slice(0, start), ...lines.slice(ends[0] + 1)].join('\n')
}

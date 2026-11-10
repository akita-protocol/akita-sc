#!/usr/bin/env node
/**
 * Write `../akita-plugin/principal.ts` (the `@akta/plugin` mirror) from
 * `smart_contracts/utils/principal.ts`: a byte-for-byte copy minus the Akita-internal
 * `@akita-sc-only` block (scripts/lib/principal-mirror.ts). `tests/principal-sync.test.ts` fails the
 * build on drift.
 *
 *   npx tsx scripts/sync-akita-plugin-principal.ts          # write the mirror
 *   npx tsx scripts/sync-akita-plugin-principal.ts --check  # exit 1 if the mirror differs
 */
import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { mirrorOf, PRINCIPAL_MIRROR, PRINCIPAL_SOURCE } from './lib/principal-mirror'

const expected = mirrorOf(readFileSync(PRINCIPAL_SOURCE, 'utf8'))
let mirror: string | undefined
try {
  mirror = readFileSync(PRINCIPAL_MIRROR, 'utf8')
} catch {
  mirror = undefined
}
const inSync = mirror === expected

if (process.argv.includes('--check')) {
  if (!inSync) {
    console.error(`${PRINCIPAL_MIRROR} differs from mirrorOf(${PRINCIPAL_SOURCE}); run scripts/sync-akita-plugin-principal.ts`)
    process.exit(1)
  }
  console.log('akita-plugin/principal.ts is in sync')
} else if (inSync) {
  console.log('akita-plugin/principal.ts already in sync')
} else {
  writeFileSync(PRINCIPAL_MIRROR, expected)
  console.log(`Wrote ${path.relative(process.cwd(), PRINCIPAL_MIRROR)} from ${path.relative(process.cwd(), PRINCIPAL_SOURCE)} (internal block stripped)`)
}

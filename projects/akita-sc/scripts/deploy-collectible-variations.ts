#!/usr/bin/env node

import { deployCollectibleVariations } from './lib/collectible-variations-deployment'
import { parseBaseArgs, runScript, setupContext } from './script-base'

runScript(async () => {
  const options = parseBaseArgs('deploy-collectible-variations.ts', `
  --manifest <json>     Durable receipt (required unless --dry-run); rerun with it to resume
  --meta-app-id <id>    Meta app to bind to (default: the SDK's recorded meta)
  --register            Record the collectibleVariations key in the SDK network map
  --reserve-type-zero   On a Meta with no types, add a placeholder type 0 first (100 ALGO)`)
  const value = (key: string) => { const i = process.argv.indexOf(key); return i < 0 ? undefined : process.argv[i + 1] }
  const metaApp = value('--meta-app-id')
  // The run checks the exact balance it needs (each addType pays Meta 100 ALGO).
  const ctx = await setupContext(options, { minBalance: 5_000_000n })
  await deployCollectibleVariations(ctx, value('--manifest'), {
    register: process.argv.includes('--register'),
    metaApp: metaApp ? BigInt(metaApp) : undefined,
    reserveTypeZero: process.argv.includes('--reserve-type-zero'),
  })
})

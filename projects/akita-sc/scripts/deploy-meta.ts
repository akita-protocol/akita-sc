#!/usr/bin/env node

import { deployMeta } from './lib/meta-deployment'
import { parseBaseArgs, setupContext, runScript } from './script-base'

runScript(async () => {
  const options = parseBaseArgs('deploy-meta.ts', `
  --manifest <json>   Durable receipt (required unless --dry-run); rerun with it to resume
  --register          Record the meta key in the SDK network map (never repoints aal.metaMerkles)`)
  const index = process.argv.indexOf('--manifest')
  const ctx = await setupContext(options, { minBalance: 10_000_000n })
  await deployMeta(ctx, index < 0 ? undefined : process.argv[index + 1], process.argv.includes('--register'))
})

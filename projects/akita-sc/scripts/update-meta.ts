#!/usr/bin/env node

import { MetaFactory } from '../smart_contracts/artifacts/meta/MetaClient'
import { parseBaseArgs, runScript, runUpdate, setupContext } from './script-base'

// Meta is a new app with no SDK key; its id comes from the deploy:meta receipt. The legacy MetaMerkles app
// (`metaMerkles`) has no update route, so an UpgradeApp against it always reverts (review ROLLOUT-6).
runScript(async () => {
  const options = parseBaseArgs('update-meta.ts', '  --meta-app-id <id>          Meta app id from the deploy:meta receipt (required)')
  const argv = process.argv.slice(2)
  const flag = argv.indexOf('--meta-app-id')
  const metaAppId = flag >= 0 && argv[flag + 1] ? BigInt(argv[flag + 1]) : undefined
  if (!metaAppId || metaAppId <= 0n) throw new Error('--meta-app-id <id> is required (the Meta app from the deploy:meta receipt)')
  const ctx = await setupContext(options)
  if (metaAppId === ctx.appIds.metaMerkles) {
    throw new Error(`${metaAppId} is the legacy MetaMerkles app (aal.metaMerkles); it has no update route. Pass the Meta app id`)
  }
  await runUpdate(ctx, [{
    name: 'Meta', leasePrefix: 'meta_upg', appIdKey: '', appId: metaAppId,
    createFactory: (params) => new MetaFactory(params),
  }])
})

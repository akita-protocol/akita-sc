#!/usr/bin/env node

/** Update the PrizeBoxFactory app through the DAO update plugin. */

import { PrizeBoxFactoryFactory } from '../smart_contracts/artifacts/prize-box/PrizeBoxFactoryClient'
import { parseBaseArgs, runScript, runUpdate, setupContext } from './script-base'

runScript(async () => {
  const options = parseBaseArgs('update-prize-box.ts')
  console.log(`\nStarting Prize Box Factory update on ${options.network}...\n`)

  const ctx = await setupContext(options)

  await runUpdate(ctx, [
    {
      name: 'PrizeBoxFactory',
      leasePrefix: 'pb_upg',
      appIdKey: 'prizeBoxFactory',
      createFactory: (p) => new PrizeBoxFactoryFactory(p),
    },
  ])
})

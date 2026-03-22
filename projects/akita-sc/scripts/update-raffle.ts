#!/usr/bin/env node

/**
 * Update Raffle Factory Contract Script
 *
 * Updates the RaffleFactory app. The child Raffle contract bytecode is
 * embedded in the factory via compileArc4(), so updating the factory app
 * automatically includes the latest child contract code.
 *
 * Usage:
 *   npm run update:raffle -- -n testnet -m "your mnemonic" -v "0.0.2"
 */

import { parseBaseArgs, setupContext, runUpdate, runScript } from './script-base'
import { RaffleFactoryFactory } from '../smart_contracts/artifacts/raffle/RaffleFactoryClient'

runScript(async () => {
  const options = parseBaseArgs('update-raffle.ts')
  console.log(`\nStarting Raffle Factory update on ${options.network}...\n`)

  const ctx = await setupContext(options)

  await runUpdate(ctx, [
    {
      name: 'RaffleFactory',
      leasePrefix: 'rf_upg',
      appIdKey: 'raffleFactory',
      createFactory: (p) => new RaffleFactoryFactory(p),
    },
  ])
})

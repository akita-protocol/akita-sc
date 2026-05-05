#!/usr/bin/env node

/**
 * Update Raffle Factory & Raffle Child Contract Script
 *
 * Updates the RaffleFactory app and the Raffle child contract bytecode
 * stored in the factory's boxedContract, in a single DAO proposal.
 *
 * Usage:
 *   npm run update:raffle -- -n testnet -m "your mnemonic" -v "0.0.2"
 */

import { parseBaseArgs, setupContext, runUpdate, runScript } from './script-base'
import { RaffleFactory } from '../smart_contracts/artifacts/raffle/RaffleClient'
import { RaffleFactoryFactory } from '../smart_contracts/artifacts/raffle/RaffleFactoryClient'

runScript(async () => {
  const options = parseBaseArgs('update-raffle.ts')
  console.log(`\nStarting Raffle Factory + Raffle update on ${options.network}...\n`)

  const ctx = await setupContext(options)

  await runUpdate(ctx, [
    {
      name: 'RaffleFactory',
      leasePrefix: 'rf_upg',
      appIdKey: 'raffleFactory',
      createFactory: (p) => new RaffleFactoryFactory(p),
      childFactory: (p) => new RaffleFactory(p),
    },
  ])
})

#!/usr/bin/env node

/**
 * Update Auction Factory Contract Script
 *
 * Updates the AuctionFactory app. The child Auction contract bytecode is
 * embedded in the factory via compileArc4(), so updating the factory app
 * automatically includes the latest child contract code.
 *
 * Usage:
 *   npm run update:auction -- -n testnet -m "your mnemonic" -v "0.0.3"
 */

import { parseBaseArgs, setupContext, runUpdate, runScript } from './script-base'
import { AuctionFactoryFactory } from '../smart_contracts/artifacts/auction/AuctionFactoryClient'
import { AuctionFactory } from '../smart_contracts/artifacts/auction/AuctionClient'

runScript(async () => {
  const options = parseBaseArgs('update-auction.ts')
  console.log(`\nStarting Auction Factory update on ${options.network}...\n`)

  const ctx = await setupContext(options)

  await runUpdate(ctx, [
    {
      name: 'AuctionFactory',
      leasePrefix: 'af_upg',
      appIdKey: 'auctionFactory',
      createFactory: (p) => new AuctionFactoryFactory(p),
      childFactory: (p) => new AuctionFactory(p),
    },
  ])
})

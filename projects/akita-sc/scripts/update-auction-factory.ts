#!/usr/bin/env node

/**
 * Update Auction Factory Contract Script
 *
 * Updates the AuctionFactory smart contract to a new version.
 * NOTE: This only updates the factory app itself. Use update-auction.ts
 * to update both the factory AND the child contract bytecode.
 *
 * Usage:
 *   npm run update:auction-factory -- -n testnet -m "your mnemonic" -v "0.0.3"
 */

import { parseBaseArgs, setupContext, runUpdate, runScript } from './script-base'
import { AuctionFactoryFactory } from '../smart_contracts/artifacts/auction/AuctionFactoryClient'

runScript(async () => {
  const options = parseBaseArgs('update-auction-factory.ts')
  console.log(`\nStarting Auction Factory contract update on ${options.network}...\n`)

  const ctx = await setupContext(options)

  await runUpdate(ctx, [
    {
      name: 'AuctionFactory',
      leasePrefix: 'af_upg',
      appIdKey: 'auctionFactory',
      createFactory: (p) => new AuctionFactoryFactory(p),
    },
  ])
})

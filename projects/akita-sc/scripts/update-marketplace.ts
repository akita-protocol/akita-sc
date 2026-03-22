#!/usr/bin/env node

/**
 * Update Marketplace & Listing Child Contract Script
 *
 * Updates the Marketplace app and the Listing child contract bytecode
 * stored in the factory's boxedContract, in a single DAO proposal.
 *
 * Usage:
 *   npm run update:marketplace -- -n testnet -m "your mnemonic" -v "0.0.2"
 */

import { parseBaseArgs, setupContext, runUpdate, runScript } from './script-base'
import { ListingFactory } from '../smart_contracts/artifacts/marketplace/ListingClient'
import { MarketplaceFactory } from '../smart_contracts/artifacts/marketplace/MarketplaceClient'

runScript(async () => {
  const options = parseBaseArgs('update-marketplace.ts')
  console.log(`\nStarting Marketplace + Listing update on ${options.network}...\n`)

  const ctx = await setupContext(options)

  await runUpdate(ctx, [
    {
      name: 'Marketplace',
      leasePrefix: 'mkt_upg',
      appIdKey: 'marketplace',
      createFactory: (p) => new MarketplaceFactory(p),
      childFactory: (p) => new ListingFactory(p),
    },
  ])
})

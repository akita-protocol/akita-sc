#!/usr/bin/env node

/**
 * Update Subscriptions Contract Script
 *
 * Updates the Subscriptions smart contract to a new version via the
 * UpdateAkitaDAO plugin and a DAO proposal.
 *
 * Usage:
 *   npm run update:subscriptions -- -n testnet -m "your mnemonic" -v "0.0.4"
 */

import { parseBaseArgs, setupContext, runUpdate, runScript } from './script-base'
import { SubscriptionsFactory } from '../smart_contracts/artifacts/subscriptions/SubscriptionsClient'

runScript(async () => {
  const options = parseBaseArgs('update-subscriptions.ts')
  console.log(`\nStarting Subscriptions contract update on ${options.network}...\n`)

  const ctx = await setupContext(options)

  await runUpdate(ctx, [
    {
      name: 'Subscriptions',
      leasePrefix: 'sub_upg',
      appIdKey: 'subscriptions',
      createFactory: (p) => new SubscriptionsFactory(p),
    },
  ])
})

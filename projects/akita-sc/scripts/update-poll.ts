#!/usr/bin/env node

/**
 * Update Poll Factory Contract Script
 *
 * Updates the PollFactory app. The child Poll contract bytecode is
 * embedded in the factory via compileArc4(), so updating the factory app
 * automatically includes the latest child contract code.
 *
 * Usage:
 *   npm run update:poll -- -n testnet -m "your mnemonic" -v "0.0.2"
 */

import { parseBaseArgs, setupContext, runUpdate, runScript } from './script-base'
import { PollFactoryFactory } from '../smart_contracts/artifacts/poll/PollFactoryClient'
import { PollFactory } from '../smart_contracts/artifacts/poll/PollClient'

runScript(async () => {
  const options = parseBaseArgs('update-poll.ts')
  console.log(`\nStarting Poll Factory update on ${options.network}...\n`)

  const ctx = await setupContext(options)

  await runUpdate(ctx, [
    {
      name: 'PollFactory',
      leasePrefix: 'poll_upg',
      appIdKey: 'pollFactory',
      createFactory: (p) => new PollFactoryFactory(p),
      childFactory: (p) => new PollFactory(p),
    },
  ])
})

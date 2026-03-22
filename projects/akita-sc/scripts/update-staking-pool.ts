#!/usr/bin/env node

/**
 * Update Staking Pool Factory Contract Script
 *
 * Updates the StakingPoolFactory app. The child StakingPool contract bytecode
 * is embedded in the factory via compileArc4(), so updating the factory app
 * automatically includes the latest child contract code.
 *
 * Usage:
 *   npm run update:staking-pool -- -n testnet -m "your mnemonic" -v "0.0.2"
 */

import { parseBaseArgs, setupContext, runUpdate, runScript } from './script-base'
import { StakingPoolFactoryFactory } from '../smart_contracts/artifacts/staking-pool/StakingPoolFactoryClient'

runScript(async () => {
  const options = parseBaseArgs('update-staking-pool.ts')
  console.log(`\nStarting Staking Pool Factory update on ${options.network}...\n`)

  const ctx = await setupContext(options)

  await runUpdate(ctx, [
    {
      name: 'StakingPoolFactory',
      leasePrefix: 'sp_upg',
      appIdKey: 'stakingPoolFactory',
      createFactory: (p) => new StakingPoolFactoryFactory(p),
    },
  ])
})

#!/usr/bin/env node

/**
 * Update Staking Contract Script
 *
 * Updates the existing Staking application via the UpdateAkitaDAO plugin and
 * a DAO UpgradeApp proposal. This preserves the current application ID and
 * all staking box state.
 *
 * Usage:
 *   npm run update:staking -- -n mainnet --dry-run -v "0.0.3"
 *   npm run update:staking -- -n mainnet -m "$MNEMONIC" -v "0.0.3"
 *
 * Resume an existing proposal:
 *   npm run update:staking -- -n mainnet -m "$MNEMONIC" -v "0.0.3" --proposal-id 123
 */

import { StakingFactory } from '../smart_contracts/artifacts/staking/StakingClient'
import { parseBaseArgs, runScript, runUpdate, setupContext } from './script-base'

runScript(async () => {
  const options = parseBaseArgs('update-staking.ts')
  console.log(`\nStarting Staking contract update on ${options.network}...\n`)

  const ctx = await setupContext(options)

  await runUpdate(ctx, [
    {
      name: 'Staking',
      leasePrefix: 'staking_upg',
      appIdKey: 'staking',
      createFactory: (params) =>
        new StakingFactory(params as unknown as ConstructorParameters<typeof StakingFactory>[0]),
    },
  ])
})

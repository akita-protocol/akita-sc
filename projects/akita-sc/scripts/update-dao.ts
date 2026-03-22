#!/usr/bin/env node

/**
 * Update AkitaDAO Contract Script
 *
 * Updates the AkitaDAO smart contract to a new version via the
 * UpdateAkitaDAO plugin and a DAO proposal.
 *
 * Usage:
 *   npm run update:dao -- -n testnet -m "your mnemonic" -v "1.1.0"
 */

import { parseBaseArgs, setupContext, runUpdate, runScript } from './script-base'
import { AkitaDaoFactory } from '../smart_contracts/artifacts/arc58/dao/AkitaDAOClient'

runScript(async () => {
  const options = parseBaseArgs('update-dao.ts')
  console.log(`\nStarting AkitaDAO contract update on ${options.network}...\n`)

  const ctx = await setupContext(options)

  await runUpdate(ctx, [
    {
      name: 'AkitaDAO',
      leasePrefix: 'dao_upg',
      appIdKey: 'dao',
      createFactory: (p) => new AkitaDaoFactory(p),
    },
  ])
})

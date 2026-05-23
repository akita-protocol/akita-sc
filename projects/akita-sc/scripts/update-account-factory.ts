#!/usr/bin/env node

/**
 * Update Account Factory Contract Script
 *
 * Updates the AbstractedAccountFactory app itself. This does not update the
 * boxed AbstractedAccount child contract bytecode.
 *
 * Usage:
 *   npm run update:account-factory -- -n testnet -m "your mnemonic" -v "1.2.0"
 */

import { parseBaseArgs, setupContext, runUpdate, runScript } from './script-base'
import { AbstractedAccountFactoryFactory } from '../smart_contracts/artifacts/arc58/account/AbstractedAccountFactoryClient'

runScript(async () => {
  const options = parseBaseArgs('update-account-factory.ts')
  console.log(`\nStarting Account Factory contract update on ${options.network}...\n`)

  const ctx = await setupContext(options)

  await runUpdate(ctx, [
    {
      name: 'AccountFactory',
      leasePrefix: 'acct_upg',
      appIdKey: 'walletFactory',
      createFactory: (p) => new AbstractedAccountFactoryFactory(p),
    },
  ])
})

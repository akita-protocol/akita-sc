#!/usr/bin/env node

/**
 * Update Account Factory & Account Contract Script
 *
 * Updates both the AbstractedAccountFactory app and the AbstractedAccount
 * child contract bytecode in a single DAO proposal.
 *
 * Usage:
 *   npm run update:account-factory -- -n testnet -m "your mnemonic" -v "1.2.0"
 */

import { parseBaseArgs, setupContext, runUpdate, runScript } from './script-base'
import { AbstractedAccountFactory } from '../smart_contracts/artifacts/arc58/account/AbstractedAccountClient'
import { AbstractedAccountFactoryFactory } from '../smart_contracts/artifacts/arc58/account/AbstractedAccountFactoryClient'

runScript(async () => {
  const options = parseBaseArgs('update-account-factory.ts')
  console.log(`\nStarting Account Factory & Account Contract update on ${options.network}...\n`)

  const ctx = await setupContext(options)

  await runUpdate(ctx, [
    {
      name: 'AccountFactory',
      leasePrefix: 'acct_upg',
      appIdKey: 'walletFactory',
      createFactory: (p) => new AbstractedAccountFactoryFactory(p),
      childFactory: (p) => new AbstractedAccountFactory(p),
    },
  ])
})

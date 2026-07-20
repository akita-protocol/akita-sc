#!/usr/bin/env node

/**
 * Upload the latest AbstractedAccount bytecode to the wallet factory.
 *
 * By default this only updates the factory's boxed child contract. Use
 * --update-factory when the factory app bytecode itself also needs an update.
 * Use update-dao-wallet.ts after this when the DAO wallet should be updated
 * through the DAO's dedicated UpdateWallet proposal type.
 */

import { parseBaseArgs, setupContext, runUpdate, runScript } from './script-base'
import { AbstractedAccountFactory as AbstractedAccountChildFactory } from '../smart_contracts/artifacts/arc58/account/AbstractedAccountClient'
import { AbstractedAccountFactoryFactory } from '../smart_contracts/artifacts/arc58/account/AbstractedAccountFactoryClient'

function hasFlag(flag: string): boolean {
  return process.argv.slice(2).includes(flag)
}

runScript(async () => {
  const options = parseBaseArgs('update-wallet-factory.ts', `
Wallet factory options:
  --update-factory            Also update the wallet factory app itself

Examples:
  npm run update:wallet-factory -- -n testnet -m "$MNEMONIC" -v "1.2.3"
  npm run update:wallet-factory -- -n testnet -m "$MNEMONIC" -v "1.2.3" --update-factory
`)
  const updateFactory = hasFlag('--update-factory')

  console.log(`\nStarting Wallet Factory ${updateFactory ? 'factory + child' : 'child bytecode'} update on ${options.network}...\n`)
  const ctx = await setupContext(options)

  await runUpdate(ctx, [
    {
      name: 'WalletFactory',
      leasePrefix: updateFactory ? 'wallet_upg' : 'wallet_child',
      appIdKey: 'walletFactory',
      createFactory: (p) => new AbstractedAccountFactoryFactory(p),
      childFactory: (p) => new AbstractedAccountChildFactory(p),
      skipAppUpdate: !updateFactory,
    },
  ])
})

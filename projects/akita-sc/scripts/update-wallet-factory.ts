#!/usr/bin/env node

/**
 * Upload the latest AbstractedAccount bytecode to the wallet factory, through the Phase 2 runner
 * (scripts/lib/principal-phase2-cli.ts: ABI guard, clear program, atomic factory + child group).
 *
 * By default this pushes only the wallet child. That is refused while the live factory cannot create
 * the new wallet: the deployed factory pairs it with its AVM 11 clear program and calls the old create
 * selector, so every newAccount and updateWallet would revert (ACCT-3). Pass --update-factory to upgrade
 * the factory and the wallet child in one group. Run update-dao-wallet.ts afterwards to move the DAO
 * wallet onto the staged version.
 */

import { runScript } from './script-base'
import { runPhase2Cli } from './lib/principal-phase2-cli'

runScript(() => runPhase2Cli('update-wallet-factory.ts', {
  targets: ['AbstractedAccountFactory'],
  childOnly: !process.argv.slice(2).includes('--update-factory'),
  help: `
Wallet factory options:
  --update-factory            Also upgrade the wallet factory app (factory + wallet in one group)

Examples:
  npm run update:wallet-factory -- -n testnet -m "$MNEMONIC" -v "1.2.3" --update-factory --confirm`,
}))

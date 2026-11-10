#!/usr/bin/env node

/**
 * Update Account Factory Contract Script
 *
 * Upgrades the AbstractedAccountFactory app through the Phase 2 runner, always together with the
 * AbstractedAccount child in one group: the upgraded factory creates only the AVM 13 wallet, so a factory
 * upgrade without its child would stop all wallet creation (ACCT-3, ROLLOUT-3).
 *
 * Usage:
 *   npm run update:account-factory -- -n testnet --dry-run
 *   npm run update:account-factory -- -n testnet -m "your mnemonic" -v "1.2.0" --confirm
 */

import { runScript } from './script-base'
import { runPhase2Cli } from './lib/principal-phase2-cli'

runScript(() => runPhase2Cli('update-account-factory.ts', { targets: ['AbstractedAccountFactory'] }))

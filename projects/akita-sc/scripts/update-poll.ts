#!/usr/bin/env node

/**
 * Update Poll Factory Contract Script
 *
 * Upgrades the PollFactory app through the Phase 2 runner. The child Poll bytecode is embedded in the
 * factory via compileArc4(), so the factory upgrade carries the latest child. The upgraded factory
 * charges the Poll's program pages, which the deployed PollPlugin does not pay (MISC-6): the run deploys
 * the new PollPluginContract and swaps the DAO wallet grants with the upgrade (--manifest-dir, or
 * --lockstep-deployed PollPluginContract=<id>).
 *
 * Usage:
 *   npm run update:poll -- -n testnet --dry-run
 *   npm run update:poll -- -n testnet -m "your mnemonic" -v "0.0.2" --manifest-dir receipts/poll --register --confirm
 */

import { runScript } from './script-base'
import { runPhase2Cli } from './lib/principal-phase2-cli'

runScript(() => runPhase2Cli('update-poll.ts', { targets: ['PollFactory'] }))

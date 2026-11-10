#!/usr/bin/env node
/**
 * Upgrade HyperSwap through the Phase 2 runner (ROLLOUT-2): the ABI guard lists the accept() selector it
 * removes (accepted decision ROLLOUT-2), and the new HyperSwapPlugin is deployed and swapped into the DAO
 * wallet grants in the same run (--manifest-dir, or --lockstep-deployed HyperSwapPlugin=<id>).
 */
import { runScript } from './script-base'
import { runPhase2Cli } from './lib/principal-phase2-cli'

runScript(() => runPhase2Cli('update-hyper-swap.ts', { targets: ['HyperSwap'] }))

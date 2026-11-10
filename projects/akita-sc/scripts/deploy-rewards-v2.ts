#!/usr/bin/env node

/**
 * Deploy Rewards v2 (2026-10 audit: C-1, H-3, M-4, L-1, closeDisbursement, sender binding).
 *
 * Rewards v1 has no update method, so the fix ships as a new app. This script only creates and
 * funds the new app; switching the protocol to it is a DAO action (see the printed steps).
 * For MainNet prefer `npm run deploy:rewards -- --manifest <file> [--register]`: it writes a resumable
 * receipt and guards the aal.rewards cutover.
 *
 * Usage:
 *   npx tsx scripts/deploy-rewards-v2.ts -n localnet -m "your mnemonic" -v "2.0.0" [--dry-run]
 */

import { microAlgo } from '@algorandfoundation/algokit-utils'
import { parseBaseArgs, runScript, setupContext } from './script-base'
import { RewardsFactory } from '../smart_contracts/artifacts/rewards/RewardsClient'

runScript(async () => {
  const options = parseBaseArgs('deploy-rewards-v2.ts')
  console.log(`\nStarting Rewards v2 deployment on ${options.network}...\n`)

  const ctx = await setupContext(options, { minBalance: 5_000_000n })

  if (options.dryRun) {
    console.log('DRY RUN - Would deploy a new Rewards app and fund its minimum balance\n')
    return
  }

  const factory = ctx.algorand.client.getTypedAppFactory(RewardsFactory, {
    defaultSender: ctx.sender,
    defaultSigner: ctx.signer,
  })

  const { appClient } = await factory.send.create.create({
    args: { version: options.version, akitaDao: ctx.appIds.dao },
  })

  // base account minimum balance; disbursements fund their own boxes
  await ctx.algorand.send.payment({ sender: ctx.sender, signer: ctx.signer, receiver: appClient.appAddress, amount: microAlgo(100_000) })

  console.log(`
Rewards v2 app ID: ${appClient.appId}

Next steps (not performed by this script):
  1. Opt Rewards v2 into the ASAs it will distribute (Rewards.optIn, anyone can pay the MBR).
  2. Finish or abort (StakingPool.abortRound, mode 0) every open staking-pool round while the DAO
     still points at the old Rewards app.
  3. DAO proposal (UpdateFields): set akitaAppList.rewards = ${appClient.appId}.
     Pools, the Rewards plugin, and the referral / auction / raffle / listing payout helpers resolve
     Rewards through this registry entry at call time.
  4. akita-sdk/src/networks.ts: rewards = ${appClient.appId}n, and keep the old ID in the legacy
     deployment list so existing v1 allocations stay claimable.
`)
})

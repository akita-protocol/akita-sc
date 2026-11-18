#!/usr/bin/env node
/**
 * Set the shares in the DAO's revenue split table through one DAO proposal
 * (docs/rollout/MAINNET-ROLLOUT.md, B3b). Every revenue source reads this one table, so the change
 * applies to all of them. The receivers stay as they are; only their shares change, and the shares
 * must total 100%. See `scripts/lib/revenue-splits.ts`.
 *
 * Usage (from projects/akita-sc):
 *   npm run update:revenue-splits -- -n mainnet --split rec_krby=80,rec_mod=5,rec_gov=15 --dry-run --sender "$CREATOR"
 *   npm run update:revenue-splits -- -n mainnet --split rec_krby=80,rec_mod=5,rec_gov=15 --confirm
 */
import { parseBaseArgs, runScript, setupContext } from './script-base'
import { parseShares, runRevenueSplits } from './lib/revenue-splits'

runScript(async () => {
  const args = process.argv.slice(2)
  const options = parseBaseArgs('update-revenue-splits.ts', `
Revenue split options (there is no default):
  --split <escrow=percent,...>  The share of each receiver, such as rec_krby=80,rec_mod=5,rec_gov=15.
                                Names every receiver the table pays today; the shares total 100.
  --confirm                     Create and execute the proposal (plans only without it)`)
  const at = args.indexOf('--split')
  if (at < 0 || !args[at + 1]) throw new Error('Name the shares: --split rec_krby=80,rec_mod=5,rec_gov=15')
  const wanted = parseShares(args[at + 1])
  const ctx = await setupContext(options)
  await runRevenueSplits(ctx, wanted, { confirm: args.includes('--confirm'), sender: options.sender })
})

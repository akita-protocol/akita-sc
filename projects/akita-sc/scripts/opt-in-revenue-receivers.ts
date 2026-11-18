#!/usr/bin/env node
/**
 * Opt the receivers of the DAO's revenue split in to every asset the revenue escrows hold and pay out
 * (docs/rollout/MAINNET-ROLLOUT.md, G3b). A receiver that has not opted in to an asset is skipped by a
 * payout and loses that share to the others, so this runs before the split keeper is enabled.
 * See `scripts/lib/revenue-receiver-opt-ins.ts`.
 *
 * Any funded account can send the opt-ins; it pays 0.1 ALGO of minimum balance for each.
 *
 * Usage (from projects/akita-sc):
 *   npm run opt-in:revenue-receivers -- -n mainnet --dry-run --sender "$CREATOR"
 *   npm run opt-in:revenue-receivers -- -n mainnet --confirm
 */
import { parseBaseArgs, runScript, setupContext } from './script-base'
import { runReceiverOptIns } from './lib/revenue-receiver-opt-ins'

runScript(async () => {
  const args = process.argv.slice(2)
  const options = parseBaseArgs('opt-in-revenue-receivers.ts', `
Receiver opt-in options:
  --asset <id[,id]>   Extra assets to opt the receivers in to, beyond those the revenue escrows hold today
  --confirm           Send the opt-ins (plans only without it)`)
  if (!args.includes('--network') && !args.includes('-n')) throw new Error('An explicit --network is required')
  const at = args.indexOf('--asset')
  const assets = (at < 0 ? '' : args[at + 1] ?? '').split(',').map((s) => s.trim()).filter(Boolean).map((s) => {
    if (!/^[1-9][0-9]*$/.test(s)) throw new Error(`--asset ${s} is not an asset id`)
    return BigInt(s)
  })
  const ctx = await setupContext(options, { minBalance: 1_000_000n })
  await runReceiverOptIns(ctx, { assets, confirm: args.includes('--confirm'), sender: options.sender })
})

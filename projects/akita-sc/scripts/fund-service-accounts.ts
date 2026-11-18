#!/usr/bin/env node
/**
 * Give the service apps that hold no ALGO their minimum balance, and the moderation app its float
 * (docs/rollout/MAINNET-ROLLOUT.md, E6a). HyperSwap, PrizeBoxFactory and AkitaSocialModeration hold
 * nothing on MainNet, so no offer, no prize box mint and no moderation action can succeed there.
 * See `scripts/lib/service-account-funding.ts`.
 *
 * Any funded account can send the payments. A rerun sends only what is still short.
 *
 * Usage (from projects/akita-sc):
 *   npm run fund:service-accounts -- -n mainnet --dry-run --sender "$CREATOR"
 *   npm run fund:service-accounts -- -n mainnet --confirm
 */
import { parseBaseArgs, runScript, setupContext } from './script-base'
import { DEFAULT_MODERATION_FLOAT, describeServiceFunding, planServiceFunding, sendServiceFunding } from './lib/service-account-funding'

runScript(async () => {
  const args = process.argv.slice(2)
  const options = parseBaseArgs('fund-service-accounts.ts', `
Service account options:
  --moderation-float <µALGO>   Free ALGO to bring AkitaSocialModeration up to (default ${DEFAULT_MODERATION_FLOAT})
  --confirm                    Send the payments (plans only without it)`)
  if (!args.includes('--network') && !args.includes('-n')) throw new Error('An explicit --network is required')
  const at = args.indexOf('--moderation-float')
  const raw = at < 0 ? undefined : args[at + 1]
  if (raw !== undefined && !/^[0-9]+$/.test(raw)) throw new Error(`--moderation-float ${raw} is not an amount in µALGO`)
  const moderationFloat = raw === undefined ? DEFAULT_MODERATION_FLOAT : BigInt(raw)

  const ctx = await setupContext(options, { minBalance: 1_000_000n })
  const plans = await planServiceFunding(ctx, moderationFloat)
  for (const line of describeServiceFunding(plans)) console.log(line)
  const total = plans.reduce((sum, p) => sum + p.shortfall, 0n)
  console.log(`\nTotal to send: ${total} µALGO`)

  if (total === 0n) {
    console.log('Every service account holds what it needs.')
    return
  }
  if (options.dryRun || !args.includes('--confirm')) {
    console.log('PLAN ONLY - nothing was sent. Pass --confirm to send the payments.')
    return
  }
  await sendServiceFunding(ctx, plans)

  const after = await planServiceFunding(ctx, moderationFloat)
  const short = after.filter((p) => p.shortfall > 0n)
  if (short.length) throw new Error(`Still short after funding: ${short.map((p) => `${p.name} by ${p.shortfall}`).join(', ')}`)
  console.log('Read back: every service account holds what it needs.')
})

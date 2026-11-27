#!/usr/bin/env node
/**
 * Give the live Subscriptions app the storage reserve its existing services could still take, before
 * the upgrade of rollout step E2 (docs/rollout/MAINNET-ROLLOUT.md; audit 07, SUB-02).
 *
 * The upgraded program charges the whole reserve when a service is created and takes nothing in its
 * two setters, so a service created before the upgrade can grow its text to the maximum for free, out
 * of the app's own balance, which is where subscribers' escrowed ALGO sits. Topping the app up first
 * keeps every withdrawal, unsubscribe and ALGO renewal payable whatever the merchants do afterwards.
 *
 * Any funded account can send the payment. A rerun sends only what is still short.
 *
 * Usage (from projects/akita-sc):
 *   npm run fund:subscription-reserve -- -n mainnet --dry-run
 *   npm run fund:subscription-reserve -- -n mainnet --confirm
 */
import { parseBaseArgs, runScript, setupContext } from './script-base'
import { describeServiceReserve, planServiceReserve, sendServiceReserve } from './lib/subscription-service-reserve'

runScript(async () => {
  const args = process.argv.slice(2)
  const options = parseBaseArgs('fund-subscription-service-reserve.ts', `
Subscription reserve options:
  --confirm                    Send the payment (plans only without it)`)
  if (!args.includes('--network') && !args.includes('-n')) throw new Error('An explicit --network is required')

  const ctx = await setupContext(options, { minBalance: 1_000_000n })
  const appId = ctx.appIds.subscriptions
  if (!appId) throw new Error(`No subscriptions app id configured for ${options.network}`)

  const plan = await planServiceReserve(ctx, appId)
  for (const line of describeServiceReserve(plan)) console.log(line)

  if (plan.shortfall === 0n) return
  if (options.dryRun || !args.includes('--confirm')) {
    console.log('PLAN ONLY - nothing was sent. Pass --confirm to send the payment.')
    return
  }
  await sendServiceReserve(ctx, plan)

  const after = await planServiceReserve(ctx, appId)
  if (after.shortfall > 0n) throw new Error(`Still short by ${after.shortfall} µALGO after the payment`)
  console.log('Read back: the free balance covers the reserve and the escrow. E2 can go ahead.')
})

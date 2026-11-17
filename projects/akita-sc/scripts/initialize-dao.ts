#!/usr/bin/env node
/**
 * Launch the DAO: call `initialize()` (rollout step I1). One-way. After it only votes change the DAO,
 * and no script here drives a vote, so every rollout step has to be finished first.
 *
 * The script reads the same steps as `rollout:status` and refuses while any of them is not done. A step
 * that is deliberately left for governance is named with `--allow-pending <id[,id]>`. It also refuses
 * while a bootstrap execution key is still tracked (the DAO would refuse too) and unless the sender is
 * the DAO creator. It plans by default; `--confirm-initialize` sends the call and reads the state back.
 *
 * Usage (from projects/akita-sc):
 *   npm run dao:initialize -- -n mainnet --dry-run
 *   npm run dao:initialize -- -n mainnet --confirm-initialize
 *   npm run dao:initialize -- -n mainnet --allow-pending social-claim,sdk-flags --confirm-initialize
 */
import dotenv from 'dotenv'
import { parseBaseArgs, runScript, setupContext } from './script-base'
import { planLaunch } from './lib/dao-launch'
import { DAO_STATE_FULLY_INITIALIZED } from './lib/dao-wallet-plugin-migration'

runScript(async () => {
  const args = process.argv.slice(2)
  const value = (key: string) => { const i = args.indexOf(key); return i < 0 ? undefined : args[i + 1] }
  if (!args.includes('--network') && !args.includes('-n')) throw new Error('An explicit --network is required')
  dotenv.config({ path: `.env.${value('--network') ?? value('-n')}` })
  const options = parseBaseArgs('initialize-dao.ts', `
  --allow-pending <id[,id]>   rollout:status step ids that may stay unfinished (each needs a vote afterwards)
  --confirm-initialize        Send initialize(); it cannot be undone`)
  const allowPending = (value('--allow-pending') ?? '').split(',').map((s) => s.trim()).filter(Boolean)
  const ctx = await setupContext(options, { minBalance: 1_000_000n })

  const plan = await planLaunch(ctx, { allowPending, sender: options.dryRun ? options.sender : ctx.sender })
  console.log(`Launch plan on ${options.network} (DAO ${ctx.dao.appId}, state ${plan.daoState}, creator ${plan.daoCreator})`)
  if (plan.initialized) { console.log('  The DAO is already initialized. Nothing to do.'); return }
  for (const id of plan.allowed) console.log(`  Left for governance (--allow-pending): ${id}`)
  for (const problem of plan.problems) console.log(`  BLOCKED: ${problem}`)
  if (plan.problems.length > 0) throw new Error(`The DAO is not ready to launch: ${plan.problems.length} problem(s) above`)
  console.log('  Every rollout step is done and no bootstrap key is tracked.')

  if (options.dryRun || !args.includes('--confirm-initialize')) {
    console.log('\nNothing was sent. Pass --confirm-initialize to launch; it cannot be undone.')
    return
  }
  await ctx.dao.initialize({ sender: ctx.sender, signer: ctx.signer })
  const state = await ctx.dao.client.state.global.state()
  if (Number(state ?? 0) !== DAO_STATE_FULLY_INITIALIZED) throw new Error(`DAO state is ${state} after initialize()`)
  console.log(`\nDAO ${ctx.dao.appId} is initialized. Every later change needs a vote.`)
})

#!/usr/bin/env node

/**
 * Set Staking's heartbeat manager through the DAO wallet (after rollout step D1). See
 * `scripts/lib/heartbeat-manager.ts` for the proposals and the refusal rules.
 *
 * Usage (from projects/akita-sc):
 *   npx ts-node --transpile-only scripts/set-heartbeat-manager.ts -n mainnet --manager <addr> --dry-run
 *   npx ts-node --transpile-only scripts/set-heartbeat-manager.ts -n mainnet --manager <addr> -m "$M" [--keep-grant]
 */
import dotenv from 'dotenv'
import { parseBaseArgs, runScript, setupContext } from './script-base'
import { addGrantCost, describePlan, planHeartbeatManager, runHeartbeatManager } from './lib/heartbeat-manager'

runScript(async () => {
  const args = process.argv.slice(2)
  const value = (key: string) => { const i = args.indexOf(key); return i < 0 ? undefined : args[i + 1] }
  if (!args.includes('--network') && !args.includes('-n')) throw new Error('An explicit --network is required')
  dotenv.config({ path: `.env.${value('--network') ?? value('-n')}` })
  const options = parseBaseArgs('set-heartbeat-manager.ts', `
Additional options:
  --manager <address>        Account allowed to record heartbeats (required)
  --staking-plugin <id>      StakingPlugin app id (default: the SDK's stakingPlugin for the network)
  --keep-grant               Keep the narrow StakingPlugin grant on the DAO wallet afterwards`)
  const manager = value('--manager')
  if (!manager) throw new Error('--manager <address> is required')
  const keepGrant = args.includes('--keep-grant')

  const ctx = await setupContext(options, { minBalance: 2_000_000n })
  const stakingPluginId = BigInt(value('--staking-plugin') ?? ctx.appIds.stakingPlugin ?? 0n)
  if (stakingPluginId <= 0n) throw new Error('--staking-plugin is required (no stakingPlugin id configured for this network)')

  if (options.dryRun) {
    const daoCreator = (await ctx.algorand.app.getById(ctx.dao.appId)).creator.toString()
    const sender = options.sender ?? daoCreator
    ctx.dao.setSendParams({ sender, signer: ctx.signer })
    const plan = await planHeartbeatManager(ctx, { manager, stakingPluginId, keepGrant, effectiveSender: sender })
    console.log(`Heartbeat manager plan on ${options.network}`)
    for (const line of describePlan(plan)) console.log(`  ${line}`)
    if (plan.addGrant) {
      const cost = await addGrantCost(ctx, plan, sender)
      console.log(`  AddPlugin proposal cost: total=${cost.total}, mbr=${cost.mbr}`)
    }
    console.log('\nDRY RUN: no state was changed.')
    return
  }

  console.log(`Setting the Staking heartbeat manager on ${options.network}`)
  await runHeartbeatManager(ctx, { manager, stakingPluginId, keepGrant })
})

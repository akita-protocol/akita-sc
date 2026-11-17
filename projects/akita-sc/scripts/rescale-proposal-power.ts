#!/usr/bin/env node
/**
 * Rewrite the DAO's proposal thresholds in base units (rollout step I1, before `initialize()`).
 * See `scripts/lib/proposal-power.ts` for why and for what is left to the grant swaps.
 *
 * Plans by default; `--confirm-rescale` creates and executes the UpdateFields proposals, which needs
 * the DAO creator's key and a DAO that is upgraded (rollout B2) and not initialized. A rerun rescales
 * only what is still in whole tokens.
 *
 * Usage (from projects/akita-sc):
 *   npm run dao:rescale-power -- -n mainnet --dry-run
 *   npm run dao:rescale-power -- -n mainnet --confirm-rescale
 */
import dotenv from 'dotenv'
import type { SDKClient } from 'akita-sdk'
import { ProposalAction, ProposalActionEnum } from 'akita-sdk/dao'
import { parseBaseArgs, runScript, setupContext } from './script-base'
import { describePowerPlan, planPowerRescale, runPowerRescale } from './lib/proposal-power'

runScript(async () => {
  const args = process.argv.slice(2)
  const value = (key: string) => { const i = args.indexOf(key); return i < 0 ? undefined : args[i + 1] }
  if (!args.includes('--network') && !args.includes('-n')) throw new Error('An explicit --network is required')
  dotenv.config({ path: `.env.${value('--network') ?? value('-n')}` })
  const options = parseBaseArgs('rescale-proposal-power.ts', `
  --confirm-rescale           Create and execute the UpdateFields proposals (plans only without it)`)
  const ctx = await setupContext(options, { minBalance: 2_000_000n })

  const plan = await planPowerRescale(ctx)
  console.log(`Proposal threshold plan on ${options.network}`)
  for (const line of describePowerPlan(plan)) console.log(`  ${line}`)
  if (plan.fields.length === 0) { console.log('\nNothing to rescale.'); return }

  if (options.dryRun || !args.includes('--confirm-rescale')) {
    if (plan.baseUnits && plan.unclear.length === 0) {
      // Simulated as the DAO creator, so a field or value the validator refuses shows up here.
      const sender = options.sender ?? plan.daoCreator
      const actions: ProposalAction<SDKClient>[] = plan.fields.slice(0, plan.actionLimit).map((f) => ({
        type: ProposalActionEnum.UpdateFields, field: f.field, value: { ...f.current, power: f.target },
      }))
      const cost = await ctx.dao.proposalCost({ sender, signer: ctx.signer, actions })
      console.log(`  First proposal (${actions.length} action(s)) is accepted by the validator; cost total=${cost.total}`)
    }
    console.log(`\n${Math.ceil(plan.fields.length / plan.actionLimit)} proposal(s) would be created. Nothing was sent; pass --confirm-rescale to send.`)
    return
  }

  const ids = await runPowerRescale(ctx, plan)
  console.log(`\nRescaled ${plan.fields.length} proposal threshold(s) in proposal(s) ${ids.join(', ')}; each was read back.`)
})

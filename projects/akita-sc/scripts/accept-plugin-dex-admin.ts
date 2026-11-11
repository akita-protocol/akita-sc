#!/usr/bin/env node

/**
 * Finish the Plugin DEX admin handover: the DAO wallet accepts the admin role of every DEX app that
 * proposed it (after `activate-plugin-dex`). See `scripts/lib/plugin-dex-admin-handover.ts` for the
 * proposals and the refusal rules.
 *
 * Usage (from projects/akita-sc):
 *   npx ts-node --transpile-only scripts/accept-plugin-dex-admin.ts -n mainnet --receipts receipts/dex --dry-run
 *   npx ts-node --transpile-only scripts/accept-plugin-dex-admin.ts -n mainnet --receipts receipts/dex -m "$M" [--keep-grant]
 */
import dotenv from 'dotenv'
import { parseBaseArgs, runScript, setupContext } from './script-base'
import { addGrantCost, describePlan, planAcceptAdmin, runAcceptAdmin } from './lib/plugin-dex-admin-handover'

runScript(async () => {
  const args = process.argv.slice(2)
  const value = (key: string) => { const i = args.indexOf(key); return i < 0 ? undefined : args[i + 1] }
  if (!args.includes('--network') && !args.includes('-n')) throw new Error('An explicit --network is required')
  dotenv.config({ path: `.env.${value('--network') ?? value('-n')}` })
  const options = parseBaseArgs('accept-plugin-dex-admin.ts', `
Additional options:
  --receipts <dir>    Required: the deploy-immutable receipts of all 14 PluginDex v2 contracts, one
                      <Contract>.json each (the directory given to activate-plugin-dex)
  --keep-grant        Keep the acceptAdminOf grant on the DAO wallet afterwards

Through DAO proposals (creator-approved before initialize()), the DAO wallet calls
PluginDexAdminPlugin.acceptAdminOf for every DEX app that has proposed it as admin, in one group. Each
admin is read back afterwards. Apps the DAO wallet already administers are skipped, so a rerun converges.
Refuses, sending nothing, if any app with an admin has not proposed the DAO wallet yet.`)
  const receiptsDir = value('--receipts')
  if (!receiptsDir) throw new Error('--receipts <dir> is required')
  const keepGrant = args.includes('--keep-grant')

  const ctx = await setupContext(options, { minBalance: 2_000_000n })

  if (options.dryRun) {
    const daoCreator = (await ctx.algorand.app.getById(ctx.dao.appId)).creator.toString()
    const sender = options.sender ?? daoCreator
    ctx.dao.setSendParams({ sender, signer: ctx.signer })
    const plan = await planAcceptAdmin(ctx, { receiptsDir, keepGrant, effectiveSender: sender })
    console.log(`Plugin DEX admin acceptance plan on ${options.network}`)
    for (const line of describePlan(plan)) console.log(`  ${line}`)
    if (plan.addGrant) {
      const cost = await addGrantCost(ctx, plan, sender)
      console.log(`  AddPlugin proposal cost: total=${cost.total}, mbr=${cost.mbr}`)
    }
    console.log('\nDRY RUN: no state was changed.')
    return
  }

  console.log(`Accepting the Plugin DEX admin roles from the DAO wallet on ${options.network}`)
  await runAcceptAdmin(ctx, { receiptsDir, keepGrant })
})

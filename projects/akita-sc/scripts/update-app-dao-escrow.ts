#!/usr/bin/env node
/**
 * Tell a fee-generating app which DAO escrow its fees go to (rollout H1 step 2, gap G14).
 * One UpgradeApp proposal drives the Update plugin's `updateAkitaDaoEscrowForApp`. See
 * `scripts/lib/dao-escrow-steps.ts` for the rules.
 *
 * Usage (from projects/akita-sc):
 *   npm run update:app-dao-escrow -- -n mainnet --app meta --escrow rev_meta --dry-run
 *   npm run update:app-dao-escrow -- -n mainnet --app meta --escrow rev_meta --confirm
 */
import dotenv from 'dotenv'
import { parseBaseArgs, runScript, setupContext } from './script-base'
import { pointAppAtDaoEscrow } from './lib/dao-escrow-steps'

runScript(async () => {
  const args = process.argv.slice(2)
  const value = (key: string) => { const i = args.indexOf(key); return i < 0 ? undefined : args[i + 1] }
  if (!args.includes('--network') && !args.includes('-n')) throw new Error('An explicit --network is required')
  dotenv.config({ path: `.env.${value('--network') ?? value('-n')}` })
  const options = parseBaseArgs('update-app-dao-escrow.ts', `
  --app <key|id>      The app to point: an SDK key such as meta, or an app id (required)
  --escrow <name>     The DAO wallet escrow its fees go to (required; create it with create:dao-escrow)
  --confirm           Create and execute the proposal (plans only without it)`)
  const app = value('--app')
  const escrow = value('--escrow')
  if (!app || !escrow) throw new Error('--app and --escrow are required')
  const ctx = await setupContext(options, { minBalance: 2_000_000n })
  const appId = /^[1-9][0-9]*$/.test(app) ? BigInt(app) : BigInt((ctx.appIds as unknown as Record<string, bigint | undefined>)[app] ?? 0n)
  if (appId <= 0n) throw new Error(`--app ${app}: the SDK records no app id under that key for ${options.network}. Deploy it with --register first, then rebuild the SDK`)

  const plan = options.dryRun || !args.includes('--confirm')
  const daoCreator = (await ctx.algorand.app.getById(ctx.dao.appId)).creator.toString()
  console.log(`DAO escrow of app ${appId} on ${options.network}`)
  const result = await pointAppAtDaoEscrow(ctx, { appId, escrow, plan, sender: options.dryRun ? options.sender ?? daoCreator : ctx.sender })
  if (!result.changed) console.log('Nothing to do.')
  else if (plan) console.log('\nOne UpgradeApp proposal would be created. Nothing was sent; pass --confirm to send.')
})

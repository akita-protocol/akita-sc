#!/usr/bin/env node
/**
 * Register a DAO wallet escrow with the RevenueManager as a receive escrow that follows the DAO's
 * revenue_splits, and give it the same global grant as the other revenue escrows (rollout G3a).
 * See `scripts/lib/dao-escrow-steps.ts` for the rules.
 *
 * `--source` is the account allowed to opt the escrow in to assets: the fee generator that fills it
 * (for example the Meta app's address for rev_meta, the GuildFactory's for rev_guilds).
 *
 * Usage (from projects/akita-sc):
 *   npm run register:revenue-escrow -- -n mainnet --escrow rev_nfd --source <address> --dry-run
 *   npm run register:revenue-escrow -- -n mainnet --escrow rev_nfd --source <address> --confirm
 */
import dotenv from 'dotenv'
import { parseBaseArgs, runScript, setupContext } from './script-base'
import { registerRevenueEscrow } from './lib/dao-escrow-steps'

runScript(async () => {
  const args = process.argv.slice(2)
  const value = (key: string) => { const i = args.indexOf(key); return i < 0 ? undefined : args[i + 1] }
  if (!args.includes('--network') && !args.includes('-n')) throw new Error('An explicit --network is required')
  dotenv.config({ path: `.env.${value('--network') ?? value('-n')}` })
  const options = parseBaseArgs('register-revenue-escrow.ts', `
  --escrow <name>     The DAO wallet escrow to register (required; create it with create:dao-escrow)
  --source <address>  The account allowed to opt the escrow in to assets (required)
  --source-link <url> Source link stored with the grant
  --confirm           Create and execute the proposal (plans only without it)`)
  const escrow = value('--escrow')
  const source = value('--source')
  if (!escrow || !source) throw new Error('--escrow and --source are required')
  const ctx = await setupContext(options, { minBalance: 2_000_000n })

  const plan = options.dryRun || !args.includes('--confirm')
  const daoCreator = (await ctx.algorand.app.getById(ctx.dao.appId)).creator.toString()
  console.log(`Revenue escrow "${escrow}" on ${options.network}`)
  const result = await registerRevenueEscrow(ctx, { escrow, source, plan, sourceLink: value('--source-link'),
    sender: options.dryRun ? options.sender ?? daoCreator : ctx.sender })
  if (!result.registered && !result.granted) console.log('Nothing to do.')
  else if (plan) console.log('\nOne proposal would be created. Nothing was sent; pass --confirm to send.')
})

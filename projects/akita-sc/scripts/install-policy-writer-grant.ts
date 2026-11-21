#!/usr/bin/env node
/**
 * Give the DAO wallet its policy writer grant (rollout H1, after set:policy-writer): MetaPlugin as a
 * global grant on no escrow that needs an execution key, at the DAO's app upgrade thresholds. The DAO
 * writes every grant policy through it, one ExecutePlugin proposal per group. See
 * `scripts/lib/grant-policy-steps.ts` for the rules.
 *
 * Usage (from projects/akita-sc):
 *   npm run install:policy-writer-grant -- -n mainnet --dry-run
 *   npm run install:policy-writer-grant -- -n mainnet --confirm
 */
import dotenv from 'dotenv'
import { parseBaseArgs, runScript, setupContext } from './script-base'
import { installPolicyWriterGrant } from './lib/grant-policy-steps'

runScript(async () => {
  const args = process.argv.slice(2)
  const value = (key: string) => { const i = args.indexOf(key); return i < 0 ? undefined : args[i + 1] }
  if (!args.includes('--network') && !args.includes('-n')) throw new Error('An explicit --network is required')
  dotenv.config({ path: `.env.${value('--network') ?? value('-n')}` })
  const options = parseBaseArgs('install-policy-writer-grant.ts', `
  --source-link <url>   Source link stored with the grant
  --confirm             Create and execute the proposal (plans only without it)`)
  const ctx = await setupContext(options, { minBalance: 2_000_000n })

  const plan = options.dryRun || !args.includes('--confirm')
  const daoCreator = (await ctx.algorand.app.getById(ctx.dao.appId)).creator.toString()
  console.log(`Policy writer grant on ${options.network}`)
  const result = await installPolicyWriterGrant(ctx, { plan, sourceLink: value('--source-link'),
    sender: options.dryRun ? options.sender ?? daoCreator : ctx.sender })
  if (!result.installed) console.log('Nothing to do.')
  else if (plan) console.log('\nOne AddPlugin proposal would be created. Nothing was sent; pass --confirm to send.')
})

#!/usr/bin/env node
/**
 * Install a PaySiloPlugin on one DAO wallet escrow with only its `pay` method (rollout H6: the Labs
 * revenue pay silo on rec_krby). The plugin's recipient is fixed at creation, so anyone may trigger a
 * payment and it can only reach that recipient. See `scripts/lib/dao-escrow-steps.ts` for the rules.
 *
 * `--recipient` restates the address the plugin pays. The script refuses when the plugin's stored
 * recipient differs, so a grant cannot be given to the wrong instance.
 *
 * Usage (from projects/akita-sc):
 *   npm run install:pay-silo-grant -- -n mainnet --plugin <id> --escrow rec_krby --recipient <address> --dry-run
 *   npm run install:pay-silo-grant -- -n mainnet --plugin <id> --escrow rec_krby --recipient <address> --confirm
 */
import dotenv from 'dotenv'
import { parseBaseArgs, runScript, setupContext } from './script-base'
import { installPaySiloGrant } from './lib/dao-escrow-steps'

runScript(async () => {
  const args = process.argv.slice(2)
  const value = (key: string) => { const i = args.indexOf(key); return i < 0 ? undefined : args[i + 1] }
  if (!args.includes('--network') && !args.includes('-n')) throw new Error('An explicit --network is required')
  dotenv.config({ path: `.env.${value('--network') ?? value('-n')}` })
  const options = parseBaseArgs('install-pay-silo-grant.ts', `
  --plugin <id>         The PaySiloPlugin app, from its deploy receipt (required)
  --escrow <name>       The DAO wallet escrow it pays from (required)
  --recipient <address> The address the plugin pays, restated as a check (required)
  --source-link <url>   Source link stored with the grant
  --confirm             Create and execute the proposal (plans only without it)`)
  const plugin = value('--plugin')
  const escrow = value('--escrow')
  const recipient = value('--recipient')
  if (!plugin || !/^[1-9][0-9]*$/.test(plugin) || !escrow || !recipient) throw new Error('--plugin <id>, --escrow and --recipient are required')
  const ctx = await setupContext(options, { minBalance: 2_000_000n })

  const plan = options.dryRun || !args.includes('--confirm')
  const daoCreator = (await ctx.algorand.app.getById(ctx.dao.appId)).creator.toString()
  console.log(`Pay silo grant on ${options.network}`)
  const result = await installPaySiloGrant(ctx, { plugin: BigInt(plugin), escrow, recipient, plan, sourceLink: value('--source-link'),
    sender: options.dryRun ? options.sender ?? daoCreator : ctx.sender })
  if (!result.installed) console.log('Nothing to do.')
  else if (plan) console.log('\nOne AddPlugin proposal would be created. Nothing was sent; pass --confirm to send.')
})

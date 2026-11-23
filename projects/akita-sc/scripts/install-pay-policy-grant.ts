#!/usr/bin/env node
/**
 * Let one DAO wallet escrow pay out through PayPlugin to one receiver (rollout H6: the Labs share in
 * rec_krby). Two proposals: PayPlugin as a global grant on the escrow with only its `pay` method, then
 * the grant's policy, which lists the receiver and the assets. Anyone may then trigger a payment, and
 * it can only reach that receiver. See `scripts/lib/grant-policy-steps.ts` for the rules.
 *
 * It needs rollout H1 first: Meta, MetaPlugin as its policy writer, the DAO wallet's policy writer
 * grant, and a PayPlugin created with that Meta as its registry.
 *
 * Usage (from projects/akita-sc):
 *   npm run install:pay-policy-grant -- -n mainnet --escrow rec_krby --recipient <address> --dry-run
 *   npm run install:pay-policy-grant -- -n mainnet --escrow rec_krby --recipient <address> --confirm
 */
import dotenv from 'dotenv'
import { parseBaseArgs, runScript, setupContext } from './script-base'
import { installPayPolicyGrant } from './lib/grant-policy-steps'

runScript(async () => {
  const args = process.argv.slice(2)
  const value = (key: string) => { const i = args.indexOf(key); return i < 0 ? undefined : args[i + 1] }
  if (!args.includes('--network') && !args.includes('-n')) throw new Error('An explicit --network is required')
  dotenv.config({ path: `.env.${value('--network') ?? value('-n')}` })
  const options = parseBaseArgs('install-pay-policy-grant.ts', `
  --escrow <name>       The DAO wallet escrow that pays out (required)
  --recipient <address> The one address the escrow may pay (required)
  --assets <ids>        The only assets it may send, comma separated, 0 for ALGO (at most 8).
                        Default: ALGO, the network's AKTA and USDC, and what the escrow holds
  --source-link <url>   Source link stored with the grant
  --confirm             Create and execute the proposals (plans only without it)`)
  const escrow = value('--escrow')
  const recipient = value('--recipient')
  const list = value('--assets')
  if (!escrow || !recipient) throw new Error('--escrow and --recipient are required')
  if (list !== undefined && !/^(0|[1-9][0-9]*)(,(0|[1-9][0-9]*))*$/.test(list)) throw new Error('--assets takes asset ids separated by commas, for example 0,31566704')
  const ctx = await setupContext(options, { minBalance: 2_000_000n })

  const plan = options.dryRun || !args.includes('--confirm')
  const daoCreator = (await ctx.algorand.app.getById(ctx.dao.appId)).creator.toString()
  console.log(`Pay policy grant on ${options.network}`)
  const result = await installPayPolicyGrant(ctx, { escrow, recipient, assets: list?.split(',').map((id) => BigInt(id)), plan,
    sourceLink: value('--source-link'), sender: options.dryRun ? options.sender ?? daoCreator : ctx.sender })
  const proposals = Number(result.installed) + Number(result.written)
  if (proposals === 0) console.log('Nothing to do.')
  else if (plan) console.log(`\n${proposals} proposal(s) would be created${result.installed ? ' (AddPlugin, then ExecutePlugin for the policy)' : ' (ExecutePlugin for the policy)'}. Nothing was sent; pass --confirm to send.`)
})

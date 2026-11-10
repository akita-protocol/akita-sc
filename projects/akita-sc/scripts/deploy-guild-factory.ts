#!/usr/bin/env node

import { Config } from '@algorandfoundation/algokit-utils'
import { deployGuildFactories } from './lib/guild-deployment'
import { parseBaseArgs, runScript, setupContext } from './script-base'

Config.configure({ populateAppCallResources: true })

function option(name: string): string | undefined {
  const index = process.argv.indexOf(name)
  return index === -1 ? undefined : process.argv[index + 1]
}

runScript(async () => {
  const options = parseBaseArgs(
    'deploy-guild-factory.ts',
    `
Guild factory options:
  --revenue-escrow-app <id>   ARC-58 revenue escrow application (required)
  --revenue-escrow-name <s>   Named escrow receiving fees. Default: rev_guilds
  --manifest <json>           Durable receipt (required unless --dry-run); rerun with it to resume
  --register                  Record guildFactory and guildConsensusFactory in the SDK network map
  --confirm-mainnet           Required safety acknowledgement for a mainnet deployment

Refuses before any write unless aal.wallet routes the 11-argument newAccount (K2) and the DAO has
guild_fees. Each consensus name is read back and compared with its program before the IDs are printed.`,
  )
  const revenueEscrowValue = option('--revenue-escrow-app')
  if (!revenueEscrowValue) throw new Error('--revenue-escrow-app is required')
  const app = BigInt(revenueEscrowValue)
  if (app <= 0n) throw new Error('--revenue-escrow-app must be a positive application ID')
  if (options.network === 'mainnet' && !options.dryRun && !process.argv.includes('--confirm-mainnet')) {
    throw new Error('Mainnet deployment requires --confirm-mainnet')
  }
  const ctx = await setupContext(options, { minBalance: 15_000_000n })
  await deployGuildFactories(ctx, {
    revenueEscrow: { name: option('--revenue-escrow-name') ?? 'rev_guilds', app },
    manifest: option('--manifest'),
    register: process.argv.includes('--register'),
  })
})

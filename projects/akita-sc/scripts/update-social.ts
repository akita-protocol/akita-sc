#!/usr/bin/env node

/**
 * Update Social Contract Script
 *
 * Updates one or more social contracts to a new version via the
 * UpdateAkitaDAO plugin and DAO proposals.
 *
 * Available contracts: social, socialGraph, socialImpact, socialModeration
 *
 * Usage:
 *   npm run update:social -- -n testnet -m "your mnemonic" -v "1.1.0"
 *   npm run update:social -- --contracts social,socialImpact -n testnet -m "your mnemonic" -v "1.1.0"
 */

import { AlgorandClient } from '@algorandfoundation/algokit-utils'
import { parseBaseArgs, setupContext, runUpdate, runScript, type UpdateTarget } from './script-base'
import algosdk from 'algosdk'
import { AkitaSocialFactory } from '../smart_contracts/artifacts/social/AkitaSocialClient'
import { AkitaSocialGraphFactory } from '../smart_contracts/artifacts/social/AkitaSocialGraphClient'
import { AkitaSocialImpactFactory } from '../smart_contracts/artifacts/social/AkitaSocialImpactClient'
import { AkitaSocialModerationFactory } from '../smart_contracts/artifacts/social/AkitaSocialModerationClient'

type FactoryParams = {
  algorand: AlgorandClient
  defaultSender: string
  defaultSigner: algosdk.TransactionSigner
}

const SOCIAL_CONTRACTS = ['social', 'socialGraph', 'socialImpact', 'socialModeration'] as const
type SocialContract = typeof SOCIAL_CONTRACTS[number]

const CONTRACT_CONFIG: Record<SocialContract, { name: string; leasePrefix: string; appIdKey: string; createFactory: (p: FactoryParams) => any }> = {
  social: { name: 'AkitaSocial', leasePrefix: 'social_upg', appIdKey: 'social', createFactory: (p) => new AkitaSocialFactory(p) },
  socialGraph: { name: 'AkitaSocialGraph', leasePrefix: 'sgraph_upg', appIdKey: 'socialGraph', createFactory: (p) => new AkitaSocialGraphFactory(p) },
  socialImpact: { name: 'AkitaSocialImpact', leasePrefix: 'simpact_upg', appIdKey: 'socialImpact', createFactory: (p) => new AkitaSocialImpactFactory(p) },
  socialModeration: { name: 'AkitaSocialModeration', leasePrefix: 'smod_upg', appIdKey: 'socialModeration', createFactory: (p) => new AkitaSocialModerationFactory(p) },
}

runScript(async () => {
  // Parse --contracts in addition to base args
  let contracts: SocialContract[] = []
  const args = process.argv.slice(2)
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--contracts') {
      const value = args[i + 1]
      if (!value) {
        console.error('Error: --contracts requires a comma-separated list')
        process.exit(1)
      }
      const names = value.split(',').map(s => s.trim())
      for (const name of names) {
        if (!(SOCIAL_CONTRACTS as readonly string[]).includes(name)) {
          console.error(`Invalid contract: ${name}. Must be one of: ${SOCIAL_CONTRACTS.join(', ')}`)
          process.exit(1)
        }
        contracts.push(name as SocialContract)
      }
    }
  }

  if (contracts.length === 0) {
    contracts = [...SOCIAL_CONTRACTS]
  }

  const options = parseBaseArgs('update-social.ts', `
  --contracts <list>            Comma-separated list of contracts to update.
                                Valid: ${SOCIAL_CONTRACTS.join(', ')}
                                Default: all four`)
  console.log(`\nStarting social contract update on ${options.network}...`)
  console.log(`   Contracts: ${contracts.map(c => CONTRACT_CONFIG[c].name).join(', ')}\n`)

  const ctx = await setupContext(options)

  const targets: UpdateTarget[] = contracts.map(c => ({
    ...CONTRACT_CONFIG[c],
  }))

  await runUpdate(ctx, targets)
})

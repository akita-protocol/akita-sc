#!/usr/bin/env node

/**
 * Deploy Gate & Sub-Gate Contracts Script
 *
 * Gates and sub-gates extend AkitaBaseContract (not UpgradeableAkitaBaseContract),
 * so they CANNOT be updated in place. This script deploys fresh instances.
 *
 * After deployment, the DAO's gate app ID (and any sub-gate references) must be
 * updated via a DAO proposal (UpdateFields).
 *
 * Available contracts: gate, socialActivity, socialFollowerCount,
 *   socialModerator, stakingPower, subscription
 *
 * Usage:
 *   ts-node scripts/deploy-gates.ts --network testnet --mnemonic "your mnemonic" --version "1.0.1"
 *   ts-node scripts/deploy-gates.ts --contracts gate,socialActivity --network testnet --mnemonic "..." --version "1.0.1"
 */

import { parseBaseArgs, setupContext, runScript } from './script-base'
import { GateFactory } from '../smart_contracts/artifacts/gates/GateClient'
import { SocialActivityGateFactory } from '../smart_contracts/artifacts/gates/sub-gates/social-activity/SocialActivityGateClient'
import { SocialFollowerCountGateFactory } from '../smart_contracts/artifacts/gates/sub-gates/social-follower-count/SocialFollowerCountGateClient'
import { SocialModeratorGateFactory } from '../smart_contracts/artifacts/gates/sub-gates/social-moderator/SocialModeratorGateClient'
import { StakingPowerGateFactory } from '../smart_contracts/artifacts/gates/sub-gates/staking-power/StakingPowerGateClient'
import { SubscriptionGateFactory } from '../smart_contracts/artifacts/gates/sub-gates/subscription/SubscriptionGateClient'

const GATE_CONTRACTS = ['gate', 'socialActivity', 'socialFollowerCount', 'socialModerator', 'stakingPower', 'subscription'] as const
type GateContract = typeof GATE_CONTRACTS[number]

const GATE_CONFIG: Record<GateContract, {
  name: string
  appIdKey: string
  getFactory: (params: { algorand: any; sender: string; signer: any }) => any
}> = {
  gate: {
    name: 'Gate',
    appIdKey: 'gate',
    getFactory: ({ algorand, sender, signer }) =>
      algorand.client.getTypedAppFactory(GateFactory, { defaultSender: sender, defaultSigner: signer }),
  },
  socialActivity: {
    name: 'SocialActivityGate',
    appIdKey: 'socialActivityGate',
    getFactory: ({ algorand, sender, signer }) =>
      algorand.client.getTypedAppFactory(SocialActivityGateFactory, { defaultSender: sender, defaultSigner: signer }),
  },
  socialFollowerCount: {
    name: 'SocialFollowerCountGate',
    appIdKey: 'socialFollowerCountGate',
    getFactory: ({ algorand, sender, signer }) =>
      algorand.client.getTypedAppFactory(SocialFollowerCountGateFactory, { defaultSender: sender, defaultSigner: signer }),
  },
  socialModerator: {
    name: 'SocialModeratorGate',
    appIdKey: 'socialModeratorGate',
    getFactory: ({ algorand, sender, signer }) =>
      algorand.client.getTypedAppFactory(SocialModeratorGateFactory, { defaultSender: sender, defaultSigner: signer }),
  },
  stakingPower: {
    name: 'StakingPowerGate',
    appIdKey: 'stakingPowerGate',
    getFactory: ({ algorand, sender, signer }) =>
      algorand.client.getTypedAppFactory(StakingPowerGateFactory, { defaultSender: sender, defaultSigner: signer }),
  },
  subscription: {
    name: 'SubscriptionGate',
    appIdKey: 'subscriptionGate',
    getFactory: ({ algorand, sender, signer }) =>
      algorand.client.getTypedAppFactory(SubscriptionGateFactory, { defaultSender: sender, defaultSigner: signer }),
  },
}

runScript(async () => {
  // Parse --contracts in addition to base args
  let contracts: GateContract[] = []
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
        if (!(GATE_CONTRACTS as readonly string[]).includes(name)) {
          console.error(`Invalid contract: ${name}. Must be one of: ${GATE_CONTRACTS.join(', ')}`)
          process.exit(1)
        }
        contracts.push(name as GateContract)
      }
    }
  }

  if (contracts.length === 0) {
    contracts = [...GATE_CONTRACTS]
  }

  const options = parseBaseArgs('deploy-gates.ts', `
  --contracts <list>            Comma-separated list of gate contracts to deploy.
                                Valid: ${GATE_CONTRACTS.join(', ')}
                                Default: all`)
  console.log(`\nStarting Gate contract deployment on ${options.network}...`)
  console.log(`   Contracts: ${contracts.map(c => GATE_CONFIG[c].name).join(', ')}\n`)

  const ctx = await setupContext(options, { minBalance: 10_000_000n })

  if (options.dryRun && !options.mnemonic && options.network !== 'localnet') {
    console.log('DRY RUN - Would deploy the following gate contracts:\n')
    for (const c of contracts) {
      console.log(`   ${GATE_CONFIG[c].name} (replaces app ID: ${(ctx.appIds as any)[GATE_CONFIG[c].appIdKey]})`)
    }
    console.log()
    return
  }

  const results: { name: string; oldAppId: bigint; newAppId: bigint }[] = []

  for (const contractKey of contracts) {
    const config = GATE_CONFIG[contractKey]
    const oldAppId = (ctx.appIds as any)[config.appIdKey] as bigint

    console.log(`${'─'.repeat(60)}`)
    console.log(`Deploying ${config.name}...`)

    const factory = config.getFactory({
      algorand: ctx.algorand,
      sender: ctx.sender,
      signer: ctx.signer,
    })

    const { appClient: client } = await factory.send.create.create({
      args: {
        version: options.version,
        akitaDao: ctx.appIds.dao,
      },
    })

    console.log(`   New ${config.name}: ${client.appId}`)
    console.log(`   Old ${config.name}: ${oldAppId}\n`)

    results.push({ name: config.name, oldAppId, newAppId: client.appId })
  }

  // Summary
  console.log('='.repeat(80))
  console.log('GATE DEPLOYMENT COMPLETE!')
  console.log('='.repeat(80))
  console.log(`\nNetwork: ${options.network}, Version: ${options.version}\n`)
  for (const r of results) {
    console.log(`  ${r.name}:`)
    console.log(`    Old App ID: ${r.oldAppId}`)
    console.log(`    New App ID: ${r.newAppId}`)
  }
  console.log(`
IMPORTANT: Update the SDK networks.ts file with the new app IDs.
The DAO's gate configuration may also need updating via a DAO proposal.
`)
})

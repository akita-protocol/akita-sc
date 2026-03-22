#!/usr/bin/env node

/**
 * Deploy Dual Stake Plugin Script
 *
 * Deploys a new DualStakePlugin contract. The DualStakePlugin is an ARC-58
 * plugin that enables dual staking (mint/burn) through the Akita wallet system.
 *
 * Usage:
 *   ts-node scripts/deploy-dual-stake-plugin.ts --network testnet --mnemonic "your mnemonic"
 *   ts-node scripts/deploy-dual-stake-plugin.ts --network testnet --mnemonic "..." --registry 12345
 */

import { parseBaseArgs, setupContext, runScript } from './script-base'
import { DualStakePluginSDK } from 'akita-sdk/wallet'
import { DualStakePluginFactory } from '../smart_contracts/artifacts/arc58/plugins/dual-stake/DualStakePluginClient'

runScript(async () => {
  // Parse --registry arg in addition to base args
  let registry = 0n
  const args = process.argv.slice(2)
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--registry') {
      registry = BigInt(args[i + 1])
    }
  }

  const options = parseBaseArgs('deploy-dual-stake-plugin.ts', `
  --registry <appId>            DualStake registry app ID (required)`)
  console.log(`\nStarting DualStakePlugin deployment on ${options.network}...\n`)

  const ctx = await setupContext(options, { minBalance: 10_000_000n })

  if (registry === 0n) {
    console.error('Error: --registry is required (the DualStake registry app ID)')
    process.exit(1)
  }

  if (options.dryRun && !options.mnemonic && options.network !== 'localnet') {
    console.log(`DRY RUN - Would deploy new DualStakePlugin with registry=${registry}\n`)
    return
  }

  const factory = ctx.algorand.client.getTypedAppFactory(DualStakePluginFactory, {
    defaultSender: ctx.sender,
    defaultSigner: ctx.signer,
  })

  console.log('Deploying new DualStakePlugin...')
  const { appClient: client } = await factory.send.create.create({
    args: {
      registry,
    },
  })

  const plugin = new DualStakePluginSDK({
    algorand: ctx.algorand,
    factoryParams: {
      appId: client.appId,
      defaultSender: ctx.sender,
      defaultSigner: ctx.signer,
    },
  })

  console.log(`   New plugin deployed: ${plugin.appId}\n`)

  console.log('='.repeat(80))
  console.log('DUAL STAKE PLUGIN DEPLOYMENT COMPLETE!')
  console.log('='.repeat(80))
  console.log(`
Summary:
  Network: ${options.network}
  New Plugin App ID: ${plugin.appId}
  Registry: ${registry}

IMPORTANT: Update the SDK networks.ts file with the new plugin app ID:
  dualStakePlugin: ${plugin.appId}n,
`)
})

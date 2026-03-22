#!/usr/bin/env node

/**
 * Deploy Raffle Plugin Script
 *
 * Deploys a new RafflePlugin contract. The RafflePlugin is an ARC-58 plugin
 * that enables raffle creation through the Akita wallet system.
 *
 * Usage:
 *   ts-node scripts/deploy-raffle-plugin.ts --network testnet --mnemonic "your mnemonic"
 */

import { parseBaseArgs, setupContext, runScript } from './script-base'
import { RafflePluginSDK } from 'akita-sdk/wallet'
import { RafflePluginFactory } from '../smart_contracts/artifacts/arc58/plugins/raffle/RafflePluginClient'

runScript(async () => {
  const options = parseBaseArgs('deploy-raffle-plugin.ts')
  console.log(`\nStarting RafflePlugin deployment on ${options.network}...\n`)

  const ctx = await setupContext(options, { minBalance: 10_000_000n })

  if (options.dryRun && !options.mnemonic && options.network !== 'localnet') {
    console.log('DRY RUN - Would deploy new RafflePlugin contract\n')
    return
  }

  const factory = ctx.algorand.client.getTypedAppFactory(RafflePluginFactory, {
    defaultSender: ctx.sender,
    defaultSigner: ctx.signer,
  })

  console.log('Deploying new RafflePlugin...')
  const { appClient: client } = await factory.send.create.create({
    args: {
      version: options.version,
      factory: ctx.appIds.raffleFactory,
    },
  })

  const plugin = new RafflePluginSDK({
    algorand: ctx.algorand,
    factoryParams: {
      appId: client.appId,
      defaultSender: ctx.sender,
      defaultSigner: ctx.signer,
    },
  })

  console.log(`   New plugin deployed: ${plugin.appId}\n`)

  console.log('='.repeat(80))
  console.log('RAFFLE PLUGIN DEPLOYMENT COMPLETE!')
  console.log('='.repeat(80))
  console.log(`
Summary:
  Network: ${options.network}
  New Plugin App ID: ${plugin.appId}
  Version: ${options.version}

IMPORTANT: Update the SDK networks.ts file with the new plugin app ID:
  rafflePlugin: ${plugin.appId}n,
`)
})

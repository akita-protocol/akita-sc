#!/usr/bin/env node

/**
 * Deploy Auction Plugin Script
 *
 * Deploys a new AuctionPlugin contract. The AuctionPlugin is an ARC-58 plugin
 * that enables auction creation through the Akita wallet system.
 *
 * Usage:
 *   ts-node scripts/deploy-auction-plugin.ts --network testnet --mnemonic "your mnemonic"
 */

import { parseBaseArgs, setupContext, runScript } from './script-base'
import { AuctionPluginSDK } from 'akita-sdk/wallet'
import { AuctionPluginFactory } from '../smart_contracts/artifacts/arc58/plugins/auction/AuctionPluginClient'

runScript(async () => {
  const options = parseBaseArgs('deploy-auction-plugin.ts')
  console.log(`\nStarting AuctionPlugin deployment on ${options.network}...\n`)

  const ctx = await setupContext(options, { minBalance: 10_000_000n })

  if (options.dryRun && !options.mnemonic && options.network !== 'localnet') {
    console.log('DRY RUN - Would deploy new AuctionPlugin contract\n')
    return
  }

  const factory = ctx.algorand.client.getTypedAppFactory(AuctionPluginFactory, {
    defaultSender: ctx.sender,
    defaultSigner: ctx.signer,
  })

  console.log('Deploying new AuctionPlugin...')
  const { appClient: client } = await factory.send.create.create({
    args: {
      version: options.version,
      factory: ctx.appIds.auctionFactory,
      akitaDao: ctx.appIds.dao,
    },
  })

  const plugin = new AuctionPluginSDK({
    algorand: ctx.algorand,
    factoryParams: {
      appId: client.appId,
      defaultSender: ctx.sender,
      defaultSigner: ctx.signer,
    },
  })

  console.log(`   New plugin deployed: ${plugin.appId}\n`)

  console.log('='.repeat(80))
  console.log('AUCTION PLUGIN DEPLOYMENT COMPLETE!')
  console.log('='.repeat(80))
  console.log(`
Summary:
  Network: ${options.network}
  New Plugin App ID: ${plugin.appId}
  Version: ${options.version}

IMPORTANT: Update the SDK networks.ts file with the new plugin app ID:
  auctionPlugin: ${plugin.appId}n,
`)
})

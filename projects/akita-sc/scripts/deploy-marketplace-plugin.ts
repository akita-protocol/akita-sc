#!/usr/bin/env node

/**
 * Deploy Marketplace Plugin Script
 *
 * Deploys a new MarketplacePlugin contract. The MarketplacePlugin is an ARC-58
 * plugin that enables marketplace listing creation through the Akita wallet system.
 *
 * Usage:
 *   ts-node scripts/deploy-marketplace-plugin.ts --network testnet --mnemonic "your mnemonic"
 */

import { parseBaseArgs, setupContext, runScript } from './script-base'
import { MarketplacePluginSDK } from 'akita-sdk/wallet'
import { MarketplacePluginFactory } from '../smart_contracts/artifacts/arc58/plugins/marketplace/MarketplacePluginClient'

runScript(async () => {
  const options = parseBaseArgs('deploy-marketplace-plugin.ts')
  console.log(`\nStarting MarketplacePlugin deployment on ${options.network}...\n`)

  const ctx = await setupContext(options, { minBalance: 10_000_000n })

  if (options.dryRun && !options.mnemonic && options.network !== 'localnet') {
    console.log('DRY RUN - Would deploy new MarketplacePlugin contract\n')
    return
  }

  const factory = ctx.algorand.client.getTypedAppFactory(MarketplacePluginFactory, {
    defaultSender: ctx.sender,
    defaultSigner: ctx.signer,
  })

  console.log('Deploying new MarketplacePlugin...')
  const { appClient: client } = await factory.send.create.createApplication({
    args: {
      version: options.version,
      factory: ctx.appIds.marketplace,
      akitaDao: ctx.appIds.dao,
    },
  })

  const plugin = new MarketplacePluginSDK({
    algorand: ctx.algorand,
    factoryParams: {
      appId: client.appId,
      defaultSender: ctx.sender,
      defaultSigner: ctx.signer,
    },
  })

  console.log(`   New plugin deployed: ${plugin.appId}\n`)

  console.log('='.repeat(80))
  console.log('MARKETPLACE PLUGIN DEPLOYMENT COMPLETE!')
  console.log('='.repeat(80))
  console.log(`
Summary:
  Network: ${options.network}
  New Plugin App ID: ${plugin.appId}
  Version: ${options.version}

IMPORTANT: Update the SDK networks.ts file with the new plugin app ID:
  marketplacePlugin: ${plugin.appId}n,
`)
})

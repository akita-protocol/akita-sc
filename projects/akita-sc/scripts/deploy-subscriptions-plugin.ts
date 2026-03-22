#!/usr/bin/env node

/**
 * Deploy Subscriptions Plugin Script
 *
 * Deploys a new SubscriptionsPlugin contract.
 *
 * Usage:
 *   npm run deploy:subscriptions-plugin -- -n testnet -m "your mnemonic" -v "0.0.3"
 */

import { parseBaseArgs, setupContext, runScript } from './script-base'
import { SubscriptionsPluginSDK } from 'akita-sdk/wallet'
import { SubscriptionsPluginFactory } from '../smart_contracts/artifacts/arc58/plugins/subscriptions/SubscriptionsPluginClient'

runScript(async () => {
  const options = parseBaseArgs('deploy-subscriptions-plugin.ts')
  console.log(`\nStarting SubscriptionsPlugin deployment on ${options.network}...\n`)

  const ctx = await setupContext(options, { minBalance: 10_000_000n })

  if (options.dryRun && !options.mnemonic && options.network !== 'localnet') {
    console.log('DRY RUN - Would deploy new SubscriptionsPlugin contract\n')
    return
  }

  const factory = ctx.algorand.client.getTypedAppFactory(SubscriptionsPluginFactory, {
    defaultSender: ctx.sender,
    defaultSigner: ctx.signer,
  })

  console.log('Deploying new SubscriptionsPlugin...')
  const { appClient: client } = await factory.send.create.create({
    args: {
      akitaDao: ctx.appIds.dao,
      version: options.version,
    },
  })

  const plugin = new SubscriptionsPluginSDK({
    algorand: ctx.algorand,
    factoryParams: {
      appId: client.appId,
      defaultSender: ctx.sender,
      defaultSigner: ctx.signer,
    },
  })

  console.log(`   New plugin deployed: ${plugin.appId}\n`)

  console.log('='.repeat(80))
  console.log('SUBSCRIPTIONS PLUGIN DEPLOYMENT COMPLETE!')
  console.log('='.repeat(80))
  console.log(`
Summary:
  Network: ${options.network}
  New Plugin App ID: ${plugin.appId}
  Version: ${options.version}

IMPORTANT: Update the SDK networks.ts file with the new plugin app ID:
  subscriptionsPlugin: ${plugin.appId}n,
`)
})

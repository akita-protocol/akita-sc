#!/usr/bin/env node

/**
 * Deploy HyperSwap Plugin Script
 *
 * Deploys a new HyperSwapPlugin. Plugins are immutable, so changing the plugin ABI (for example
 * `accept` taking the offer-terms commitment) needs a new app, a DAO plugin-list update and wallet
 * re-installs.
 *
 * Usage:
 *   ts-node scripts/deploy-hyper-swap-plugin.ts --network testnet --mnemonic "your mnemonic" -v "0.0.2"
 */

import { parseBaseArgs, pluginDeploymentInstructions, recordPluginDeployment, setupContext, runScript } from './script-base'
import { HyperSwapPluginSDK } from 'akita-sdk/wallet'
import { HyperSwapPluginFactory } from '../smart_contracts/artifacts/arc58/plugins/hyper-swap/HyperSwapPluginClient'

runScript(async () => {
  const options = parseBaseArgs('deploy-hyper-swap-plugin.ts')
  console.log(`\nStarting HyperSwapPlugin deployment on ${options.network}...\n`)

  const ctx = await setupContext(options, { minBalance: 10_000_000n })

  if (options.dryRun) {
    console.log('DRY RUN - Would deploy new HyperSwapPlugin contract\n')
    return
  }

  const factory = ctx.algorand.client.getTypedAppFactory(HyperSwapPluginFactory, {
    defaultSender: ctx.sender,
    defaultSigner: ctx.signer,
  })

  console.log('Deploying new HyperSwapPlugin...')
  const { appClient: client } = await factory.send.create.create({
    args: {
      version: options.version,
      akitaDao: ctx.appIds.dao,
    },
  })

  const plugin = new HyperSwapPluginSDK({
    algorand: ctx.algorand,
    factoryParams: {
      appId: client.appId,
      defaultSender: ctx.sender,
      defaultSigner: ctx.signer,
    },
  })

  console.log(`   New plugin deployed: ${plugin.appId}\n`)

  await recordPluginDeployment(options.network, 'hyperSwapPlugin', plugin.appId, options.version)

  console.log('='.repeat(80))
  console.log('HYPERSWAP PLUGIN DEPLOYMENT COMPLETE!')
  console.log('='.repeat(80))
  console.log(`
Summary:
  Network: ${options.network}
  New Plugin App ID: ${plugin.appId}
  Version: ${options.version}

${pluginDeploymentInstructions(options.network, 'hyperSwapPlugin', plugin.appId, options.version)}
`)
})

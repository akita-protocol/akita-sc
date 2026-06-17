#!/usr/bin/env node

/**
 * Deploy ASA Manager Plugin Script
 *
 * Deploys a new AsaManagerPlugin contract.
 *
 * Usage:
 *   npm run deploy:asa-manager-plugin -- -n testnet -m "your mnemonic"
 *   npm run deploy:asa-manager-plugin -- -n mainnet -m "your mnemonic"
 */

import { parseBaseArgs, runScript, setupContext } from './script-base'
import { AsaManagerPluginSDK } from 'akita-sdk/wallet'
import { AsaManagerPluginFactory } from '../smart_contracts/artifacts/arc58/plugins/asa-manager/AsaManagerPluginClient'

runScript(async () => {
  const options = parseBaseArgs('deploy-asa-manager-plugin.ts')
  console.log(`\nStarting AsaManagerPlugin deployment on ${options.network}...\n`)

  const ctx = await setupContext(options, { minBalance: 10_000_000n })

  if (options.dryRun && !options.mnemonic && options.network !== 'localnet') {
    console.log('DRY RUN - Would deploy new AsaManagerPlugin contract\n')
    return
  }

  const deployer = options.mnemonic
    ? ctx.algorand.account.fromMnemonic(options.mnemonic)
    : undefined
  const defaultSender = deployer?.addr.toString() ?? ctx.sender
  const defaultSigner = deployer?.signer ?? ctx.signer

  const factory = ctx.algorand.client.getTypedAppFactory(AsaManagerPluginFactory, {
    defaultSender,
    defaultSigner,
  })

  console.log('Deploying new AsaManagerPlugin...')
  const { appClient: client } = await factory.deploy({
    onUpdate: 'append',
    onSchemaBreak: 'append',
  })

  const plugin = new AsaManagerPluginSDK({
    algorand: ctx.algorand,
    factoryParams: {
      appId: client.appId,
      defaultSender,
      defaultSigner,
    },
  })

  console.log(`   New plugin deployed: ${plugin.appId}\n`)

  console.log('='.repeat(80))
  console.log('ASA MANAGER PLUGIN DEPLOYMENT COMPLETE!')
  console.log('='.repeat(80))
  console.log(`
Summary:
  Network: ${options.network}
  New Plugin App ID: ${plugin.appId}

IMPORTANT: Update SDK network config / env with the new plugin app ID:
  asaManagerPlugin: ${plugin.appId}n,
  asaMintPlugin: ${plugin.appId}n, // deprecated alias
  ASA_MINT_PLUGIN_APP_ID=${plugin.appId}
`)
})

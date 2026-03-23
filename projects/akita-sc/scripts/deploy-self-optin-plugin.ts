#!/usr/bin/env node

/**
 * Deploy Self Opt-In Plugin Script
 *
 * Deploys a new SelfOptInPlugin contract. This plugin allows wallets to opt
 * into assets using the wallet's own balance for MBR, rather than requiring
 * an external MBR payment from the caller.
 *
 * Usage:
 *   npm run deploy:self-optin-plugin -- -n localnet
 *   npm run deploy:self-optin-plugin -- -n testnet -m "your mnemonic"
 */

import { parseBaseArgs, setupContext, runScript } from './script-base'
import { SelfOptInPluginSDK } from 'akita-sdk/wallet'
import { SelfOptInPluginFactory } from '../smart_contracts/artifacts/arc58/plugins/self-optin/SelfOptInPluginClient'

runScript(async () => {
  const options = parseBaseArgs('deploy-self-optin-plugin.ts')
  console.log(`\nStarting SelfOptInPlugin deployment on ${options.network}...\n`)

  const ctx = await setupContext(options, { minBalance: 10_000_000n })

  if (options.dryRun && !options.mnemonic && options.network !== 'localnet') {
    console.log('DRY RUN - Would deploy new SelfOptInPlugin contract\n')
    return
  }

  const factory = ctx.algorand.client.getTypedAppFactory(SelfOptInPluginFactory, {
    defaultSender: ctx.sender,
    defaultSigner: ctx.signer,
  })

  console.log('Deploying new SelfOptInPlugin...')
  const { appClient: client } = await factory.deploy({
    onUpdate: 'append',
    onSchemaBreak: 'append',
  })

  const plugin = new SelfOptInPluginSDK({
    algorand: ctx.algorand,
    factoryParams: {
      appId: client.appId,
      defaultSender: ctx.sender,
      defaultSigner: ctx.signer,
    },
  })

  console.log(`   New plugin deployed: ${plugin.appId}\n`)

  console.log('='.repeat(80))
  console.log('SELF OPT-IN PLUGIN DEPLOYMENT COMPLETE!')
  console.log('='.repeat(80))
  console.log(`
Summary:
  Network: ${options.network}
  New Plugin App ID: ${plugin.appId}

IMPORTANT: Update the SDK networks.ts file with the new plugin app ID:
  selfOptinPlugin: ${plugin.appId}n,
`)
})

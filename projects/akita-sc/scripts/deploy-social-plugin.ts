#!/usr/bin/env node

/**
 * Deploy Social Plugin Script
 *
 * Deploys a new AkitaSocialPlugin contract.
 *
 * Usage:
 *   npm run deploy:social-plugin -- -n testnet -m "your mnemonic" -v "1.1.0"
 */

import { parseBaseArgs, pluginDeploymentInstructions, recordPluginDeployment, setupContext, runScript } from './script-base'
import { SocialPluginSDK } from 'akita-sdk/wallet'
import { AkitaSocialPluginFactory } from '../smart_contracts/artifacts/arc58/plugins/social/AkitaSocialPluginClient'

runScript(async () => {
  const options = parseBaseArgs('deploy-social-plugin.ts')
  console.log(`\nStarting AkitaSocialPlugin deployment on ${options.network}...\n`)

  const ctx = await setupContext(options, { minBalance: 10_000_000n })

  if (options.dryRun && !options.mnemonic && options.network !== 'localnet') {
    console.log('DRY RUN - Would deploy new AkitaSocialPlugin contract\n')
    return
  }

  const factory = ctx.algorand.client.getTypedAppFactory(AkitaSocialPluginFactory, {
    defaultSender: ctx.sender,
    defaultSigner: ctx.signer,
  })

  console.log('Deploying new AkitaSocialPlugin...')
  const { appClient: client } = await factory.send.create.create({
    args: {
      version: options.version,
      akitaDao: ctx.appIds.dao,
    },
  })

  const plugin = new SocialPluginSDK({
    algorand: ctx.algorand,
    factoryParams: {
      appId: client.appId,
      defaultSender: ctx.sender,
      defaultSigner: ctx.signer,
    },
  })

  console.log(`   New plugin deployed: ${plugin.appId}\n`)

  await recordPluginDeployment(options.network, 'socialPlugin', plugin.appId, options.version)

  console.log('='.repeat(80))
  console.log('SOCIAL PLUGIN DEPLOYMENT COMPLETE!')
  console.log('='.repeat(80))
  console.log(`
Summary:
  Network: ${options.network}
  New Plugin App ID: ${plugin.appId}
  Version: ${options.version}

${pluginDeploymentInstructions(options.network, 'socialPlugin', plugin.appId, options.version)}
`)
})

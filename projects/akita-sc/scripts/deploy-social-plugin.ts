#!/usr/bin/env node

/**
 * Deploy Social Plugin Script
 *
 * Deploys a new AkitaSocialPlugin contract.
 *
 * Usage:
 *   npm run deploy:social-plugin -- -n testnet -m "your mnemonic" -v "1.1.0"
 *   npm run deploy:social-plugin -- -n testnet -m "your mnemonic" -v "1.1.0" --escrow 12345
 */

import { parseBaseArgs, setupContext, runScript } from './script-base'
import { SocialPluginSDK } from 'akita-sdk/wallet'
import { AkitaSocialPluginFactory } from '../smart_contracts/artifacts/arc58/plugins/social/AkitaSocialPluginClient'

runScript(async () => {
  // Parse --escrow in addition to base args
  let escrow = 0n
  const args = process.argv.slice(2)
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--escrow' || args[i] === '-e') {
      escrow = BigInt(args[i + 1])
    }
  }

  const options = parseBaseArgs('deploy-social-plugin.ts', `
  --escrow, -e <appId>          Escrow app ID (default: 0)`)
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
      escrow,
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

  console.log('='.repeat(80))
  console.log('SOCIAL PLUGIN DEPLOYMENT COMPLETE!')
  console.log('='.repeat(80))
  console.log(`
Summary:
  Network: ${options.network}
  New Plugin App ID: ${plugin.appId}
  Version: ${options.version}
  Escrow: ${escrow}

IMPORTANT: Update the SDK networks.ts file with the new plugin app ID:
  socialPlugin: ${plugin.appId}n,
`)
})

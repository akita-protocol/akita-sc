#!/usr/bin/env node

/**
 * Deploy Staking Plugin Script
 *
 * Deploys a new StakingPlugin contract. The StakingPlugin is an ARC-58 plugin
 * that routes staking actions through the Akita wallet system.
 *
 * Usage:
 *   ts-node scripts/deploy-staking-plugin.ts --network mainnet --mnemonic "your mnemonic"
 */

import { parseBaseArgs, setupContext, runScript } from './script-base'
import { StakingPluginSDK } from 'akita-sdk/wallet'
import { StakingPluginFactory } from '../smart_contracts/artifacts/arc58/plugins/staking/StakingPluginClient'

runScript(async () => {
  const options = parseBaseArgs('deploy-staking-plugin.ts')
  console.log(`\nStarting StakingPlugin deployment on ${options.network}...\n`)

  const ctx = await setupContext(options, { minBalance: 10_000_000n })
  if (options.mnemonic && options.network !== 'localnet') {
    const deployer = ctx.algorand.account.fromMnemonic(options.mnemonic)
    ctx.sender = deployer.addr.toString()
    ctx.signer = deployer.signer
  }

  if (options.dryRun && !options.mnemonic && options.network !== 'localnet') {
    console.log('DRY RUN - Would deploy new StakingPlugin contract\n')
    return
  }

  const factory = ctx.algorand.client.getTypedAppFactory(StakingPluginFactory, {
    defaultSender: ctx.sender,
    defaultSigner: ctx.signer,
  })

  console.log('Deploying new StakingPlugin...')
  const { appClient: client } = await factory.send.create.create({
      args: {
        akitaDao: ctx.appIds.dao,
        version: options.version,
      },
  })

  const plugin = new StakingPluginSDK({
    algorand: ctx.algorand,
    factoryParams: {
      appId: client.appId,
      defaultSender: ctx.sender,
      defaultSigner: ctx.signer,
    },
  })

  console.log(`   New plugin deployed: ${plugin.appId}\n`)

  console.log('='.repeat(80))
  console.log('STAKING PLUGIN DEPLOYMENT COMPLETE!')
  console.log('='.repeat(80))
  console.log(`
Summary:
  Network: ${options.network}
  New Plugin App ID: ${plugin.appId}
  Version: ${options.version}

IMPORTANT: Update the SDK networks.ts file with the new plugin app ID:
  stakingPlugin: ${plugin.appId}n,
`)
})

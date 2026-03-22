#!/usr/bin/env node

/**
 * Deploy Staking Pool Plugin Script
 *
 * Deploys a new StakingPoolPlugin contract. The StakingPoolPlugin is an ARC-58
 * plugin that enables staking pool creation through the Akita wallet system.
 *
 * Usage:
 *   ts-node scripts/deploy-staking-pool-plugin.ts --network testnet --mnemonic "your mnemonic"
 */

import { parseBaseArgs, setupContext, runScript } from './script-base'
import { StakingPoolPluginSDK } from 'akita-sdk/wallet'
import { StakingPoolPluginFactory } from '../smart_contracts/artifacts/arc58/plugins/staking-pool/StakingPoolPluginClient'

runScript(async () => {
  const options = parseBaseArgs('deploy-staking-pool-plugin.ts')
  console.log(`\nStarting StakingPoolPlugin deployment on ${options.network}...\n`)

  const ctx = await setupContext(options, { minBalance: 10_000_000n })

  if (options.dryRun && !options.mnemonic && options.network !== 'localnet') {
    console.log('DRY RUN - Would deploy new StakingPoolPlugin contract\n')
    return
  }

  const factory = ctx.algorand.client.getTypedAppFactory(StakingPoolPluginFactory, {
    defaultSender: ctx.sender,
    defaultSigner: ctx.signer,
  })

  console.log('Deploying new StakingPoolPlugin...')
  const { appClient: client } = await factory.send.create.create({
    args: {
      version: options.version,
      factory: ctx.appIds.stakingPoolFactory,
      akitaDao: ctx.appIds.dao,
    },
  })

  const plugin = new StakingPoolPluginSDK({
    algorand: ctx.algorand,
    factoryParams: {
      appId: client.appId,
      defaultSender: ctx.sender,
      defaultSigner: ctx.signer,
    },
  })

  console.log(`   New plugin deployed: ${plugin.appId}\n`)

  console.log('='.repeat(80))
  console.log('STAKING POOL PLUGIN DEPLOYMENT COMPLETE!')
  console.log('='.repeat(80))
  console.log(`
Summary:
  Network: ${options.network}
  New Plugin App ID: ${plugin.appId}
  Version: ${options.version}

IMPORTANT: Update the SDK networks.ts file with the new plugin app ID:
  stakingPoolPlugin: ${plugin.appId}n,
`)
})

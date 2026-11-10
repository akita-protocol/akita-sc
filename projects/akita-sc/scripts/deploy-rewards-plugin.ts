#!/usr/bin/env node

/**
 * Deploy Rewards Plugin Script
 *
 * Deploys a new RewardsPlugin contract with instant ALGO and ASA disbursement
 * support and records it as the current network deployment.
 *
 * `--legacy-rewards <id>` pins the previous Rewards app the plugin may still withdraw credits from
 * and close disbursements on (default: MainNet Rewards v1 3569556095 on mainnet, none elsewhere).
 *
 * Usage:
 *   npm run deploy:rewards-plugin -- -n testnet -m "your mnemonic" -v "1.0.0"
 */

import { parseBaseArgs, pluginDeploymentInstructions, recordPluginDeployment, setupContext, runScript } from './script-base'
import { RewardsPluginSDK } from 'akita-sdk/wallet'
import { RewardsPluginFactory } from '../smart_contracts/artifacts/arc58/plugins/rewards/RewardsPluginClient'

const MAINNET_REWARDS_V1 = 3569556095n

runScript(async () => {
  const options = parseBaseArgs('deploy-rewards-plugin.ts', '\n  --legacy-rewards <id>  Previous Rewards app (default: MainNet v1 on mainnet, 0 elsewhere)')
  const argv = process.argv.slice(2)
  const legacyFlag = argv.indexOf('--legacy-rewards')
  const legacyRewards = legacyFlag >= 0 ? BigInt(argv[legacyFlag + 1]) : options.network === 'mainnet' ? MAINNET_REWARDS_V1 : 0n
  console.log(`\nStarting RewardsPlugin deployment on ${options.network}...\n`)

  const ctx = await setupContext(options, { minBalance: 10_000_000n })

  if (options.dryRun) {
    console.log('DRY RUN - Would deploy new RewardsPlugin contract\n')
    return
  }

  const factory = ctx.algorand.client.getTypedAppFactory(RewardsPluginFactory, {
    defaultSender: ctx.sender,
    defaultSigner: ctx.signer,
  })

  console.log('Deploying new RewardsPlugin...')
  const { appClient: client } = await factory.send.create.create({
    args: {
      version: options.version,
      akitaDao: ctx.appIds.dao,
      legacyRewards,
      // the ARC-59 ASA inbox router the network uses (0 where there is none)
      inboxRouter: ctx.appIds.assetInbox ?? 0n,
    },
  })

  const plugin = new RewardsPluginSDK({
    algorand: ctx.algorand,
    factoryParams: {
      appId: client.appId,
      defaultSender: ctx.sender,
      defaultSigner: ctx.signer,
    },
  })

  console.log(`   New plugin deployed: ${plugin.appId}\n`)

  await recordPluginDeployment(options.network, 'rewardsPlugin', plugin.appId, options.version)

  console.log('='.repeat(80))
  console.log('REWARDS PLUGIN DEPLOYMENT COMPLETE!')
  console.log('='.repeat(80))
  console.log(`
Summary:
  Network: ${options.network}
  New Plugin App ID: ${plugin.appId}
  Legacy Rewards: ${legacyRewards}
  Version: ${options.version}

${pluginDeploymentInstructions(options.network, 'rewardsPlugin', plugin.appId, options.version)}
`)
})

#!/usr/bin/env node

/**
 * Deploy Poll Plugin Script
 *
 * Deploys a new PollPluginContract. Plugins are immutable, so the gate-subject fix (gating the
 * spending account that actually votes) needs a new app, a DAO plugin-list update and wallet
 * re-installs.
 *
 * Usage:
 *   ts-node scripts/deploy-poll-plugin.ts --network testnet --mnemonic "your mnemonic" -v "0.0.2"
 */

import { parseBaseArgs, pluginDeploymentInstructions, recordPluginDeployment, setupContext, runScript } from './script-base'
import { PollPluginSDK } from 'akita-sdk/wallet'
import { PollPluginContractFactory } from '../smart_contracts/artifacts/arc58/plugins/poll/PollPluginContractClient'

runScript(async () => {
  const options = parseBaseArgs('deploy-poll-plugin.ts')
  console.log(`\nStarting PollPlugin deployment on ${options.network}...\n`)

  const ctx = await setupContext(options, { minBalance: 10_000_000n })

  if (options.dryRun) {
    console.log('DRY RUN - Would deploy new PollPlugin contract\n')
    return
  }

  const factory = ctx.algorand.client.getTypedAppFactory(PollPluginContractFactory, {
    defaultSender: ctx.sender,
    defaultSigner: ctx.signer,
  })

  console.log('Deploying new PollPlugin...')
  const { appClient: client } = await factory.send.create.create({
    args: {
      version: options.version,
      factory: ctx.appIds.pollFactory,
      akitaDao: ctx.appIds.dao,
    },
  })

  const plugin = new PollPluginSDK({
    algorand: ctx.algorand,
    factoryParams: {
      appId: client.appId,
      defaultSender: ctx.sender,
      defaultSigner: ctx.signer,
    },
  })

  console.log(`   New plugin deployed: ${plugin.appId}\n`)

  await recordPluginDeployment(options.network, 'pollPlugin', plugin.appId, options.version)

  console.log('='.repeat(80))
  console.log('POLL PLUGIN DEPLOYMENT COMPLETE!')
  console.log('='.repeat(80))
  console.log(`
Summary:
  Network: ${options.network}
  New Plugin App ID: ${plugin.appId}
  Version: ${options.version}

${pluginDeploymentInstructions(options.network, 'pollPlugin', plugin.appId, options.version)}
`)
})

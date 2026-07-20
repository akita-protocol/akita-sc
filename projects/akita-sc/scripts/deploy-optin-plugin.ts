#!/usr/bin/env node

/** Deploy a new OptInPlugin app while retaining its deployment lineage. */

import { OptInPluginSDK } from 'akita-sdk/wallet'
import { OptInPluginFactory } from '../smart_contracts/artifacts/arc58/plugins/optin/OptInPluginClient'
import { parseBaseArgs, pluginDeploymentInstructions, recordPluginDeployment, runScript, setupContext } from './script-base'

runScript(async () => {
  const options = parseBaseArgs('deploy-optin-plugin.ts')
  console.log(`\nStarting OptInPlugin deployment on ${options.network}...\n`)

  const ctx = await setupContext(options, { minBalance: 10_000_000n })
  if (options.dryRun && !options.mnemonic && options.network !== 'localnet') {
    console.log('DRY RUN - Would deploy new OptInPlugin contract\n')
    return
  }

  const factory = ctx.algorand.client.getTypedAppFactory(OptInPluginFactory, {
    defaultSender: ctx.sender,
    defaultSigner: ctx.signer,
  })
  const { appClient } = await factory.deploy({
    onUpdate: 'append',
    onSchemaBreak: 'append',
  })

  const plugin = new OptInPluginSDK({
    algorand: ctx.algorand,
    factoryParams: {
      appId: appClient.appId,
      defaultSender: ctx.sender,
      defaultSigner: ctx.signer,
    },
  })

  await recordPluginDeployment(options.network, 'optinPlugin', plugin.appId)

  console.log('\n' + '='.repeat(80))
  console.log('OPT-IN PLUGIN DEPLOYMENT COMPLETE!')
  console.log('='.repeat(80))
  console.log(`
Network: ${options.network}
New Plugin App ID: ${plugin.appId}

${pluginDeploymentInstructions(options.network, 'optinPlugin', plugin.appId)}
`)
})

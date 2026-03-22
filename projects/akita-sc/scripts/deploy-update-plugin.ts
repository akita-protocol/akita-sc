#!/usr/bin/env node

/**
 * Deploy Update Plugin Script
 *
 * Deploys a new UpdateAkitaDAO plugin and updates the DAO configuration:
 *   1. Deploy new UpdateAkitaDAO plugin contract
 *   2. Update DAO's Plugin App List (PAL)
 *   3. Remove old plugin from wallet
 *   4. Fund wallet + install new plugin
 *
 * Usage:
 *   npm run deploy:update-plugin -- -n testnet -m "your mnemonic"
 *   npm run deploy:update-plugin -- -n testnet -m "your mnemonic" --old-plugin-id 751972139
 */

import { microAlgo } from '@algorandfoundation/algokit-utils'
import { getAppFundingNeeded, proposeAndExecute } from './utils'
import { parseBaseArgs, setupContext, runScript } from './script-base'
import { ProposalActionEnum } from 'akita-sdk/dao'
import { UpdateAkitaDAOPluginSDK } from 'akita-sdk/wallet'
import { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import { UpdateAkitaDaoPluginFactory } from '../smart_contracts/artifacts/arc58/plugins/update-akita-dao/UpdateAkitaDAOPluginClient'
import {
  DEFAULT_UPDATE_AKITA_DAO_APP_APPROVAL,
  DEFAULT_UPDATE_AKITA_DAO_DURATION,
  DEFAULT_UPDATE_AKITA_DAO_PARTICIPATION,
  DEFAULT_UPDATE_AKITA_DAO_PROPOSAL_CREATION,
  DEFAULT_UPDATE_AKITA_DAO_PROPOSAL_POWER,
} from '../smart_contracts/utils/defaults'

runScript(async () => {
  // Parse --old-plugin-id
  let oldPluginId: bigint | undefined
  const args = process.argv.slice(2)
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--old-plugin-id') {
      oldPluginId = BigInt(args[i + 1])
    }
  }

  const options = parseBaseArgs('deploy-update-plugin.ts', `
  --old-plugin-id <appId>       App ID of the currently installed update plugin (optional, uses network default)`)
  console.log(`\nStarting UpdateAkitaDAO plugin deployment on ${options.network}...\n`)

  const ctx = await setupContext(options, { minBalance: 50_000_000n })
  const resolvedOldId = oldPluginId ?? ctx.appIds.updatePlugin

  console.log(`Old Update Plugin: ${resolvedOldId}\n`)

  if (options.dryRun) {
    console.log('DRY RUN - Steps that would be performed:\n')
    console.log('   1. Deploy new UpdateAkitaDAO plugin contract')
    console.log('   2. Update DAO PAL with new plugin app ID')
    console.log(`   3. Remove old plugin (${resolvedOldId}) from wallet`)
    console.log('   4. Fund wallet + install new plugin (global, useExecutionKey: true)\n')
    return
  }

  // Step 1: Deploy
  console.log('Step 1: Deploying new UpdateAkitaDAO plugin...')
  const factory = ctx.algorand.client.getTypedAppFactory(UpdateAkitaDaoPluginFactory, {
    defaultSender: ctx.sender,
    defaultSigner: ctx.signer,
  })
  const clearProgram = new Uint8Array([0x0b])
  const { appClient: client } = await factory.send.create.create({
    args: { version: options.version, akitaDao: ctx.appIds.dao, clearProgram },
  })
  const newUpdatePlugin = new UpdateAkitaDAOPluginSDK({
    algorand: ctx.algorand,
    factoryParams: {
      appId: client.appId,
      defaultSender: ctx.sender,
      defaultSigner: ctx.signer,
    },
  })
  console.log(`   New plugin deployed: ${newUpdatePlugin.appId}\n`)

  // Step 2: Update PAL
  console.log('Step 2: Updating DAO Plugin App List...')
  const updatePalId = await proposeAndExecute(ctx.algorand, ctx.dao, [
    { type: ProposalActionEnum.UpdateFields, field: 'pal', value: { update: newUpdatePlugin.appId } },
  ])
  console.log(`   PAL updated (Proposal ${updatePalId})\n`)

  // Step 3: Remove old plugin
  console.log('Step 3: Removing old plugin from wallet...')
  const removeId = await proposeAndExecute(ctx.algorand, ctx.dao, [
    { type: ProposalActionEnum.RemovePlugin, plugin: resolvedOldId, caller: ALGORAND_ZERO_ADDRESS_STRING, escrow: '' },
  ])
  console.log(`   Old plugin removed (Proposal ${removeId})\n`)

  // Step 4: Fund + install new
  console.log('Step 4: Funding wallet and installing new plugin...')
  const wallet = await ctx.dao.getWallet()
  const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 2n })
  const funding = await getAppFundingNeeded(ctx.algorand, wallet.client.appAddress.toString(), mbr.plugins + mbr.executions)
  if (funding > 0n) {
    await wallet.client.appClient.fundAppAccount({ amount: microAlgo(funding) })
  }

  const installId = await proposeAndExecute(ctx.algorand, ctx.dao, [
    {
      type: ProposalActionEnum.AddPlugin,
      fee: DEFAULT_UPDATE_AKITA_DAO_PROPOSAL_CREATION,
      power: DEFAULT_UPDATE_AKITA_DAO_PROPOSAL_POWER,
      duration: DEFAULT_UPDATE_AKITA_DAO_DURATION,
      participation: DEFAULT_UPDATE_AKITA_DAO_PARTICIPATION,
      approval: DEFAULT_UPDATE_AKITA_DAO_APP_APPROVAL,
      sourceLink: 'https://github.com/kylebee/akita-sc',
      client: newUpdatePlugin,
      global: true,
      useExecutionKey: true,
    },
  ])
  console.log(`   New plugin installed (Proposal ${installId})\n`)

  console.log('='.repeat(80))
  console.log('UPDATE PLUGIN DEPLOYMENT COMPLETE!')
  console.log('='.repeat(80))
  console.log(`
Summary:
  Network: ${options.network}
  Old Plugin App ID: ${resolvedOldId}
  New Plugin App ID: ${newUpdatePlugin.appId}
  Proposals: PAL=${updatePalId}, Remove=${removeId}, Install=${installId}

IMPORTANT: Update the SDK networks.ts file:
  updatePlugin: ${newUpdatePlugin.appId}n,
`)
})

#!/usr/bin/env node

/**
 * Deploy Revenue Manager Plugin Script
 *
 * Deploys a new RevenueManagerPlugin and replaces the current installation:
 *   1. Deploy new RevenueManagerPlugin contract
 *   2. Update DAO's Plugin App List (PAL)
 *   3. Remove old plugin installations (root + all revenue escrows)
 *   4. Fund wallet for new installations
 *   5. Reinstall on root and all revenue escrows
 *
 * Usage:
 *   npm run deploy:revenue-manager-plugin -- -n testnet -m "your mnemonic" -v "0.0.3"
 */

import { microAlgo } from '@algorandfoundation/algokit-utils'
import { getAppFundingNeeded, proposeAndExecute } from './utils'
import { parseBaseArgs, setupContext, runScript } from './script-base'
import { SDKClient } from 'akita-sdk'
import { ProposalAction, ProposalActionEnum } from 'akita-sdk/dao'
import { RevenueManagerPluginSDK } from 'akita-sdk/wallet'
import { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import { RevenueManagerPluginFactory } from '../smart_contracts/artifacts/arc58/plugins/revenue-manager/RevenueManagerPluginClient'
import {
  DEFAULT_CREATION,
  DEFAULT_UPGRADE_APP_PROPOSAL_POWER,
  DEFAULT_UPGRADE_APP_VOTING_DURATION,
  DEFAULT_UPGRADE_APP_PARTICIPATION,
  DEFAULT_UPGRADE_APP_APPROVAL,
} from '../smart_contracts/utils/defaults'

const REVENUE_ESCROWS = [
  'rev_wallet', 'rev_auction', 'rev_marketplace', 'rev_raffle',
  'rev_social', 'rev_subscriptions', 'rev_pool', 'rev_poll',
]

runScript(async () => {
  // Parse --old-plugin-id
  let oldPluginId: bigint | undefined
  const args = process.argv.slice(2)
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--old-plugin-id') {
      oldPluginId = BigInt(args[i + 1])
    }
  }

  const options = parseBaseArgs('deploy-revenue-manager-plugin.ts', `
  --old-plugin-id <appId>       App ID of the currently installed revenue manager plugin (optional, uses network default)`)
  console.log(`\nStarting RevenueManagerPlugin deployment on ${options.network}...\n`)

  const ctx = await setupContext(options, { minBalance: 50_000_000n })
  const resolvedOldId = oldPluginId ?? ctx.appIds.revenueManagerPlugin

  console.log(`Old Revenue Manager Plugin: ${resolvedOldId}\n`)

  if (options.dryRun) {
    console.log('DRY RUN - Steps that would be performed:\n')
    console.log(`   1. Deploy new RevenueManagerPlugin (version: ${options.version})`)
    console.log('   2. Update DAO PAL with new plugin app ID')
    console.log('   3. Remove old plugin installations:')
    console.log(`      - Root: plugin=${resolvedOldId}, caller=GLOBAL, escrow=""`)
    for (const escrow of REVENUE_ESCROWS) {
      console.log(`      - plugin=${resolvedOldId}, caller=GLOBAL, escrow="${escrow}"`)
    }
    console.log('   4. Fund wallet for new installations')
    console.log('   5. Reinstall plugin on root + all revenue escrows\n')
    return
  }

  // Step 1: Deploy
  console.log(`Step 1: Deploying new RevenueManagerPlugin (version: ${options.version})...`)
  const factory = ctx.algorand.client.getTypedAppFactory(RevenueManagerPluginFactory, {
    defaultSender: ctx.sender,
    defaultSigner: ctx.signer,
  })
  const { appClient: client } = await factory.send.create.create({
    args: { version: options.version, akitaDao: ctx.appIds.dao },
  })
  const newPlugin = new RevenueManagerPluginSDK({
    algorand: ctx.algorand,
    factoryParams: {
      appId: client.appId,
      defaultSender: ctx.sender,
      defaultSigner: ctx.signer,
    },
  })
  console.log(`   New plugin deployed: ${newPlugin.appId}`)

  await ctx.algorand.send.payment({
    sender: ctx.sender,
    signer: ctx.signer,
    receiver: newPlugin.client.appAddress,
    amount: (1).algos(),
  })
  console.log('   Plugin account funded with 1 ALGO\n')

  // Step 2: Update PAL
  console.log('Step 2: Updating DAO Plugin App List...')
  const updatePalId = await proposeAndExecute(ctx.algorand, ctx.dao, [
    { type: ProposalActionEnum.UpdateFields, field: 'pal', value: { revenueManager: newPlugin.appId } },
  ])
  console.log(`   PAL updated (Proposal ${updatePalId})\n`)

  // Step 3: Remove old installations
  console.log('Step 3: Removing old plugin installations...')
  const pluginsToRemove = [
    { plugin: resolvedOldId, caller: ALGORAND_ZERO_ADDRESS_STRING, escrow: '' },
    ...REVENUE_ESCROWS.map(escrow => ({ plugin: resolvedOldId, caller: ALGORAND_ZERO_ADDRESS_STRING, escrow })),
  ]
  for (let i = 0; i < pluginsToRemove.length; i++) {
    const p = pluginsToRemove[i]
    const label = p.escrow === '' ? 'root' : p.escrow
    console.log(`   [${i + 1}/${pluginsToRemove.length}] Removing from ${label}...`)
    await proposeAndExecute(ctx.algorand, ctx.dao, [
      { type: ProposalActionEnum.RemovePlugin, plugin: p.plugin, caller: p.caller, escrow: p.escrow },
    ])
  }
  console.log('   All old installations removed.\n')

  // Step 4: Fund wallet
  console.log('Step 4: Funding wallet for plugin installations...')
  const wallet = await ctx.dao.getWallet()
  const mbr = await wallet.getMbr({ escrow: '', methodCount: 3n, plugin: '', groups: 2n })
  const totalMbr = mbr.plugins + mbr.executions + (mbr.plugins * BigInt(REVENUE_ESCROWS.length))
  const funding = await getAppFundingNeeded(ctx.algorand, wallet.client.appAddress.toString(), totalMbr)
  if (funding > 0n) {
    await wallet.client.appClient.fundAppAccount({ amount: microAlgo(funding) })
    console.log(`   Funded wallet with ${funding} microAlgo\n`)
  } else {
    console.log('   Wallet already has sufficient balance\n')
  }

  // Step 5: Reinstall
  console.log('Step 5: Reinstalling plugin...')
  const revMethods = [
    { name: newPlugin.optIn(), cooldown: 0n },
    { name: newPlugin.startEscrowDisbursement(), cooldown: 0n },
    { name: newPlugin.processEscrowAllocation(), cooldown: 0n },
  ]

  const pluginsToInstall: ProposalAction<SDKClient>[] = [
    {
      type: ProposalActionEnum.AddPlugin,
      client: newPlugin,
      global: true,
      escrow: '',
      sourceLink: 'https://github.com/kylebee/akita-sc',
      useExecutionKey: true,
      fee: DEFAULT_CREATION,
      power: DEFAULT_UPGRADE_APP_PROPOSAL_POWER,
      duration: DEFAULT_UPGRADE_APP_VOTING_DURATION,
      participation: DEFAULT_UPGRADE_APP_PARTICIPATION,
      approval: DEFAULT_UPGRADE_APP_APPROVAL,
    },
    ...REVENUE_ESCROWS.map(escrow => ({
      type: ProposalActionEnum.AddPlugin as const,
      client: newPlugin as SDKClient,
      global: true,
      escrow,
      sourceLink: 'https://github.com/kylebee/akita-sc',
      useExecutionKey: false,
      methods: revMethods,
    })),
  ]

  for (let i = 0; i < pluginsToInstall.length; i++) {
    const p = pluginsToInstall[i]
    const label = 'escrow' in p ? (p.escrow === '' ? 'root' : p.escrow) : `plugin ${i}`
    console.log(`   [${i + 1}/${pluginsToInstall.length}] Installing on ${label}...`)
    await proposeAndExecute(ctx.algorand, ctx.dao, [p])
  }
  console.log('   All installations complete.\n')

  console.log('='.repeat(80))
  console.log('REVENUE MANAGER PLUGIN DEPLOYMENT COMPLETE!')
  console.log('='.repeat(80))
  console.log(`
Summary:
  Network: ${options.network}
  Version: ${options.version}
  Old Plugin App ID: ${resolvedOldId}
  New Plugin App ID: ${newPlugin.appId}

Installations:
  - Root (global, useExecutionKey=true)
${REVENUE_ESCROWS.map(e => `  - ${e} (global, useExecutionKey=false, 3 methods)`).join('\n')}

IMPORTANT: Update the SDK networks.ts file:
  revenueManagerPlugin: ${newPlugin.appId}n,
`)
})

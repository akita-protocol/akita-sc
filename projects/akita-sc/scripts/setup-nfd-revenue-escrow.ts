#!/usr/bin/env node

/**
 * Create the DAO `rev_nfd` escrow and install the revenue-manager + NFD
 * plugins against it for a caller address.
 *
 * Usage:
 *   npm run setup:nfd-revenue-escrow -- -n mainnet -m "MNEMONIC" --caller ADDR
 *   npm run setup:nfd-revenue-escrow -- -n testnet -m "MNEMONIC" --caller ADDR --escrow rev_nfd
 */

import { microAlgo } from '@algorandfoundation/algokit-utils'
import { SDKClient } from 'akita-sdk'
import { ProposalAction, ProposalActionEnum } from 'akita-sdk/dao'
import { CallerType, NFDPluginSDK, RevenueManagerPluginSDK } from 'akita-sdk/wallet'
import algosdk from 'algosdk'
import { parseBaseArgs, runScript, setupContext } from './script-base'
import { getAppFundingNeeded, proposeAndExecute } from './utils'

const DEFAULT_ESCROW = 'rev_nfd'
const DEFAULT_SOURCE_LINK = 'https://github.com/kylebee/akita-sc'
const FUNDING_SAFETY_MARGIN = 1_000_000n

type ExtraArgs = {
  caller?: string
  escrow: string
  sourceLink: string
  revenueManagerPluginAppId?: bigint
  nfdPluginAppId?: bigint
}

function parseExtraArgs(): ExtraArgs {
  const args = process.argv.slice(2)
  const extra: ExtraArgs = {
    escrow: DEFAULT_ESCROW,
    sourceLink: DEFAULT_SOURCE_LINK,
  }

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--caller') {
      extra.caller = args[++i]
    } else if (args[i] === '--escrow') {
      extra.escrow = args[++i]
    } else if (args[i] === '--source-link') {
      extra.sourceLink = args[++i]
    } else if (args[i] === '--revenue-manager-plugin-app-id') {
      extra.revenueManagerPluginAppId = BigInt(args[++i])
    } else if (args[i] === '--nfd-plugin-app-id') {
      extra.nfdPluginAppId = BigInt(args[++i])
    }
  }

  return extra
}

function validateAddress(value: string | undefined, label: string): string {
  if (!value) {
    console.error(`Error: --${label} is required`)
    process.exit(1)
  }

  try {
    algosdk.decodeAddress(value)
    return value
  } catch {
    console.error(`Error: --${label} must be a valid Algorand address`)
    process.exit(1)
  }
}

runScript(async () => {
  const extra = parseExtraArgs()
  const options = parseBaseArgs('setup-nfd-revenue-escrow.ts', `
  --caller <address>                       Address allowed to operate the rev_nfd plugins (required)
  --escrow <name>                          Escrow name. Default: ${DEFAULT_ESCROW}
  --source-link <url>                      Proposal source link. Default: ${DEFAULT_SOURCE_LINK}
  --revenue-manager-plugin-app-id <id>     Override configured revenue-manager plugin app id
  --nfd-plugin-app-id <id>                 Override configured NFD plugin app id`)

  const caller = validateAddress(extra.caller, 'caller')

  console.log(`\nSetting up NFD revenue escrow on ${options.network}...\n`)
  console.log(`  Escrow: ${extra.escrow}`)
  console.log(`  Caller: ${caller}\n`)

  const ctx = await setupContext(options)
  const effectiveSender = options.dryRun ? ctx.dao.client.appAddress.toString() : ctx.sender
  ctx.dao.setSendParams({ sender: effectiveSender, signer: ctx.signer })
  const daoWallet = await ctx.dao.getWallet()

  const revenueManagerPluginAppId = extra.revenueManagerPluginAppId ?? ctx.appIds.revenueManagerPlugin
  const nfdPluginAppId = extra.nfdPluginAppId ?? ctx.appIds.nfdPlugin

  if (revenueManagerPluginAppId === 0n) {
    throw new Error('Revenue-manager plugin app id is 0. Pass --revenue-manager-plugin-app-id or update network config.')
  }
  if (nfdPluginAppId === 0n) {
    throw new Error('NFD plugin app id is 0. Pass --nfd-plugin-app-id or update network config.')
  }

  const revenueManagerPlugin = new RevenueManagerPluginSDK({
    algorand: ctx.algorand,
    factoryParams: {
      appId: revenueManagerPluginAppId,
      defaultSender: effectiveSender,
      defaultSigner: ctx.signer,
    },
  })
  const nfdPlugin = new NFDPluginSDK({
    algorand: ctx.algorand,
    factoryParams: {
      appId: nfdPluginAppId,
      defaultSender: effectiveSender,
      defaultSigner: ctx.signer,
    },
  })

  const actions: ProposalAction<SDKClient>[] = []
  let requiredWalletFunding = 0n

  let escrowExists = false
  try {
    const escrowInfo = await daoWallet.getEscrow(extra.escrow)
    escrowExists = escrowInfo.id > 0n
  } catch {
    escrowExists = false
  }

  if (escrowExists) {
    console.log(`Escrow "${extra.escrow}" already exists`)
  } else {
    const mbr = await daoWallet.getMbr({ escrow: extra.escrow, methodCount: 0n, plugin: '', groups: 0n })
    requiredWalletFunding += mbr.newEscrowMintCost
    actions.push({ type: ProposalActionEnum.NewEscrow, escrow: extra.escrow })
    console.log(`Will create escrow "${extra.escrow}"`)
  }

  async function hasPluginGrant(plugin: bigint): Promise<boolean> {
    try {
      const info = await daoWallet.getPluginByKey({ plugin, caller, escrow: extra.escrow })
      return info.start !== 0n
    } catch {
      return false
    }
  }

  if (await hasPluginGrant(revenueManagerPlugin.appId)) {
    console.log('Revenue-manager plugin grant already exists')
  } else {
    const revenueManagerMethods = [
      { name: revenueManagerPlugin.optIn(), cooldown: 0n },
      { name: revenueManagerPlugin.startEscrowDisbursement(), cooldown: 0n },
      { name: revenueManagerPlugin.processEscrowAllocation(), cooldown: 0n },
    ]
    const mbr = await daoWallet.getMbr({
      escrow: extra.escrow,
      methodCount: BigInt(revenueManagerMethods.length),
      plugin: '',
      groups: 0n,
    })
    requiredWalletFunding += mbr.plugins
    actions.push({
      type: ProposalActionEnum.AddPlugin,
      client: revenueManagerPlugin,
      callerType: CallerType.Other,
      caller,
      escrow: extra.escrow,
      sourceLink: extra.sourceLink,
      useExecutionKey: false,
      methods: revenueManagerMethods,
    })
    console.log('Will install revenue-manager plugin grant')
  }

  if (await hasPluginGrant(nfdPlugin.appId)) {
    console.log('NFD plugin grant already exists')
  } else {
    const mbr = await daoWallet.getMbr({ escrow: extra.escrow, methodCount: 0n, plugin: '', groups: 0n })
    requiredWalletFunding += mbr.plugins
    actions.push({
      type: ProposalActionEnum.AddPlugin,
      client: nfdPlugin,
      callerType: CallerType.Other,
      caller,
      escrow: extra.escrow,
      sourceLink: extra.sourceLink,
      useExecutionKey: false,
    })
    console.log('Will install NFD plugin grant')
  }

  if (actions.length === 0) {
    console.log('\nNothing to do.\n')
    return
  }

  const fundingNeeded = await getAppFundingNeeded(
    ctx.algorand,
    daoWallet.client.appAddress.toString(),
    requiredWalletFunding + FUNDING_SAFETY_MARGIN,
  )

  console.log(`\nWallet MBR needed: ${requiredWalletFunding} microAlgos`)
  if (fundingNeeded > 0n) {
    console.log(`Wallet funding needed: ${fundingNeeded} microAlgos`)
  } else {
    console.log('Wallet already has sufficient spendable balance')
  }

  const proposalCost = await ctx.dao.proposalCost({
    sender: effectiveSender,
    signer: ctx.signer,
    actions,
  })
  console.log(`Proposal cost: total=${proposalCost.total}, fee=${proposalCost.fee}, mbr=${proposalCost.mbr}`)

  if (options.dryRun) {
    console.log('\nDRY RUN - would fund wallet and submit setup proposal.\n')
    return
  }

  if (fundingNeeded > 0n) {
    await ctx.algorand.send.payment({
      sender: ctx.sender,
      signer: ctx.signer,
      receiver: daoWallet.client.appAddress,
      amount: microAlgo(fundingNeeded),
    })
  }

  const proposalId = await proposeAndExecute(ctx.algorand, ctx.dao, actions)

  const escrowInfo = await daoWallet.getEscrow(extra.escrow)
  console.log('\n' + '='.repeat(80))
  console.log('NFD REVENUE ESCROW SETUP COMPLETE')
  console.log('='.repeat(80))
  console.log(`
Summary:
  Network: ${options.network}
  Proposal ID: ${proposalId}
  Escrow: ${extra.escrow}
  Escrow App ID: ${escrowInfo.id}
  Escrow Address: ${algosdk.getApplicationAddress(Number(escrowInfo.id))}
  Caller: ${caller}
  Revenue-manager plugin: ${revenueManagerPlugin.appId}
  NFD plugin: ${nfdPlugin.appId}
`)
})

#!/usr/bin/env node

/**
 * Replace DAO ASA Mint Plugin With ASA Manager Plugin
 *
 * Removes the current global/root asaMint plugin grant from the DAO wallet and
 * installs the AsaManagerPlugin grant in its place.
 *
 * Usage:
 *   npm run replace:dao-asa-manager-plugin -- -n mainnet -m "MNEMONIC" --new-plugin-id 123
 *   npm run replace:dao-asa-manager-plugin -- -n testnet -m "MNEMONIC" --old-plugin-id 111 --new-plugin-id 222
 */

import { microAlgo } from '@algorandfoundation/algokit-utils'
import { SDKClient } from 'akita-sdk'
import { ProposalAction, ProposalActionEnum } from 'akita-sdk/dao'
import { AsaManagerPluginSDK, CallerType } from 'akita-sdk/wallet'
import { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import { parseBaseArgs, runScript, setupContext } from './script-base'
import { getAppFundingNeeded, proposeAndExecute } from './utils'

const SOURCE_LINK = 'https://github.com/kylebee/akita-sc'

type ExtraArgs = {
  oldPluginId?: bigint
  newPluginId?: bigint
  sourceLink: string
}

function parseExtraArgs(): ExtraArgs {
  const args = process.argv.slice(2)
  const extra: ExtraArgs = { sourceLink: SOURCE_LINK }

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--old-plugin-id') {
      extra.oldPluginId = BigInt(args[++i])
    } else if (args[i] === '--new-plugin-id') {
      extra.newPluginId = BigInt(args[++i])
    } else if (args[i] === '--source-link') {
      extra.sourceLink = args[++i]
    }
  }

  return extra
}

runScript(async () => {
  const extra = parseExtraArgs()
  const options = parseBaseArgs('replace-dao-asa-manager-plugin.ts', `
  --old-plugin-id <appId>       Current asaMint plugin app id. Default: network asaMintPlugin
  --new-plugin-id <appId>       New asaManager plugin app id. Default: network asaManagerPlugin
  --source-link <url>           Proposal source link. Default: ${SOURCE_LINK}`)

  console.log(`\nReplacing DAO ASA plugin on ${options.network}...\n`)

  const ctx = await setupContext(options, { minBalance: 20_000_000n })
  const effectiveSender = options.dryRun ? ctx.dao.client.appAddress.toString() : ctx.sender
  ctx.dao.setSendParams({ sender: effectiveSender, signer: ctx.signer })
  const wallet = await ctx.dao.getWallet()

  const oldPluginId = extra.oldPluginId ?? ctx.appIds.asaMintPlugin
  const newPluginId = extra.newPluginId ?? ctx.appIds.asaManagerPlugin

  if (oldPluginId === 0n) {
    throw new Error('Old asaMint plugin app id is 0. Pass --old-plugin-id or update network config.')
  }
  if (newPluginId === 0n) {
    throw new Error('New asaManager plugin app id is 0. Pass --new-plugin-id or update network config.')
  }

  console.log(`Old asaMint plugin: ${oldPluginId}`)
  console.log(`New asaManager plugin: ${newPluginId}\n`)

  const asaManagerPlugin = new AsaManagerPluginSDK({
    algorand: ctx.algorand,
    factoryParams: {
      appId: newPluginId,
      defaultSender: effectiveSender,
      defaultSigner: ctx.signer,
    },
  })

  const actions: ProposalAction<SDKClient>[] = []

  async function hasGlobalGrant(plugin: bigint): Promise<boolean> {
    try {
      const info = await wallet.getPluginByKey({
        plugin,
        caller: ALGORAND_ZERO_ADDRESS_STRING,
        escrow: '',
      })
      return info.start !== 0n
    } catch {
      return false
    }
  }

  const oldGrantExists = await hasGlobalGrant(oldPluginId)
  const newGrantExists = await hasGlobalGrant(newPluginId)

  if (oldGrantExists && oldPluginId !== newPluginId) {
    actions.push({
      type: ProposalActionEnum.RemovePlugin,
      plugin: oldPluginId,
      caller: ALGORAND_ZERO_ADDRESS_STRING,
      escrow: '',
    })
    console.log('Will remove old asaMint global grant')
  } else if (oldPluginId === newPluginId && oldGrantExists) {
    console.log('Old and new plugin ids match; existing global grant is already installed')
  } else {
    console.log('Old asaMint global grant not found; skipping removal')
  }

  if (newGrantExists) {
    console.log('New asaManager global grant already exists; skipping install')
  } else {
    const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n })
    const funding = await getAppFundingNeeded(
      ctx.algorand,
      wallet.client.appAddress.toString(),
      mbr.plugins + 1_000_000n,
    )

    if (funding > 0n) {
      if (options.dryRun) {
        console.log(`DRY RUN - would fund wallet with ${funding} microAlgos`)
      } else {
        await wallet.client.appClient.fundAppAccount({ amount: microAlgo(funding) })
        console.log(`Funded wallet with ${funding} microAlgos`)
      }
    } else {
      console.log('Wallet already has sufficient balance for plugin installation')
    }

    actions.push({
      type: ProposalActionEnum.AddPlugin,
      client: asaManagerPlugin,
      callerType: CallerType.Global,
      escrow: '',
      sourceLink: extra.sourceLink,
      useExecutionKey: false,
    })
    console.log('Will install new asaManager global grant')
  }

  if (actions.length === 0) {
    console.log('\nNothing to do.\n')
    return
  }

  const proposalCost = await ctx.dao.proposalCost({
    sender: effectiveSender,
    signer: ctx.signer,
    actions,
  })
  console.log(`\nProposal cost: total=${proposalCost.total}, fee=${proposalCost.fee}, mbr=${proposalCost.mbr}`)

  if (options.dryRun) {
    console.log('\nDRY RUN - would submit replacement proposal.\n')
    return
  }

  const proposalId = await proposeAndExecute(ctx.algorand, ctx.dao, actions)

  console.log('\n' + '='.repeat(80))
  console.log('DAO ASA MANAGER PLUGIN REPLACEMENT COMPLETE!')
  console.log('='.repeat(80))
  console.log(`
Summary:
  Network: ${options.network}
  Proposal ID: ${proposalId}
  Removed asaMint plugin: ${oldPluginId}
  Installed asaManager plugin: ${newPluginId}
`)
})

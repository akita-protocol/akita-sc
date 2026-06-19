#!/usr/bin/env node

/**
 * Replace DAO ASA Mint Plugin With ASA Manager Plugin
 *
 * Discovers current asaMint plugin grants on the DAO wallet, removes them, and
 * installs AsaManagerPlugin grants with the same caller/escrow keys.
 *
 * Usage:
 *   npm run replace:dao-asa-manager-plugin -- -n mainnet -m "MNEMONIC" --new-plugin-id 123
 *   npm run replace:dao-asa-manager-plugin -- -n testnet -m "MNEMONIC" --old-plugin-id 111 --new-plugin-id 222 --caller ADDR
 */

import { microAlgo } from '@algorandfoundation/algokit-utils'
import { SDKClient } from 'akita-sdk'
import { ProposalAction, ProposalActionEnum } from 'akita-sdk/dao'
import { AsaManagerPluginSDK, CallerType, type PluginInfo } from 'akita-sdk/wallet'
import algosdk, { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import dotenv from 'dotenv'
import { parseBaseArgs, runScript, setupContext } from './script-base'
import { getAppFundingNeeded, proposeAndExecute } from './utils'

const SOURCE_LINK = 'https://github.com/kylebee/akita-sc'

type ExtraArgs = {
  oldPluginId?: bigint
  newPluginId?: bigint
  callers: string[]
  sourceLink: string
}

function parseExtraArgs(): ExtraArgs {
  const args = process.argv.slice(2)
  const extra: ExtraArgs = { callers: [], sourceLink: SOURCE_LINK }

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--old-plugin-id') {
      extra.oldPluginId = BigInt(args[++i])
    } else if (args[i] === '--new-plugin-id') {
      extra.newPluginId = BigInt(args[++i])
    } else if (args[i] === '--caller') {
      const value = args[++i]
      extra.callers.push(...value.split(',').map((x) => x.trim()).filter(Boolean))
    } else if (args[i] === '--source-link') {
      extra.sourceLink = args[++i]
    }
  }

  return extra
}

type GrantTarget = {
  caller: string
  escrow: string
}

const pluginKeyAbi = algosdk.ABIType.from('(uint64,address,string)')

function decodePluginBoxKey(name: Uint8Array): ({ plugin: bigint } & GrantTarget) | undefined {
  if (name.length < 2 || name[0] !== 'p'.charCodeAt(0)) return undefined

  try {
    const decoded = pluginKeyAbi.decode(name.slice(1)) as [bigint, string, string]
    return {
      plugin: BigInt(decoded[0]),
      caller: decoded[1],
      escrow: decoded[2],
    }
  } catch {
    return undefined
  }
}

function grantLabel({ caller, escrow }: GrantTarget): string {
  const callerLabel = caller === ALGORAND_ZERO_ADDRESS_STRING ? 'global' : caller
  return escrow === '' ? callerLabel : `${callerLabel} / escrow "${escrow}"`
}

function envAppId(name: string): bigint | undefined {
  const value = process.env[name]
  if (!value) return undefined

  try {
    const appId = BigInt(value)
    return appId > 0n ? appId : undefined
  } catch {
    return undefined
  }
}

runScript(async () => {
  const extra = parseExtraArgs()
  const options = parseBaseArgs('replace-dao-asa-manager-plugin.ts', `
  --old-plugin-id <appId>       Current asaMint plugin app id. Default: network asaMintPlugin
  --new-plugin-id <appId>       New asaManager plugin app id. Default: network asaManagerPlugin
  --caller <address[,address]>  Optional caller filter. Can be repeated. Defaults to all old-plugin grants.
  --source-link <url>           Proposal source link. Default: ${SOURCE_LINK}`)

  console.log(`\nReplacing DAO ASA plugin on ${options.network}...\n`)
  dotenv.config({ path: `.env.${options.network}` })

  const ctx = await setupContext(options, { minBalance: 20_000_000n })
  const effectiveSender = options.dryRun ? ctx.dao.client.appAddress.toString() : ctx.sender
  ctx.dao.setSendParams({ sender: effectiveSender, signer: ctx.signer })
  const wallet = await ctx.dao.getWallet()

  const oldPluginId = extra.oldPluginId ?? (ctx.appIds as { asaMintPlugin?: bigint }).asaMintPlugin ?? envAppId('ASA_MINT_PLUGIN_APP_ID')
  const newPluginId = extra.newPluginId ?? ctx.appIds.asaManagerPlugin

  if (!oldPluginId || oldPluginId === 0n) {
    throw new Error('Old asaMint plugin app id is not configured. Pass --old-plugin-id or set ASA_MINT_PLUGIN_APP_ID in the network .env file.')
  }
  if (!newPluginId || newPluginId === 0n) {
    throw new Error('New asaManager plugin app id is 0. Pass --new-plugin-id or update network config.')
  }

  console.log(`Old asaMint plugin: ${oldPluginId}`)
  console.log(`New asaManager plugin: ${newPluginId}\n`)

  for (const caller of extra.callers) {
    try {
      algosdk.decodeAddress(caller)
    } catch {
      throw new Error(`Invalid caller address: ${caller}`)
    }
  }
  const callerFilters = new Set(extra.callers)
  const boxes = await ctx.algorand.app.getBoxNames(wallet.appId)
  const targets = boxes
    .map((box) => decodePluginBoxKey(box.nameRaw))
    .filter((key): key is { plugin: bigint } & GrantTarget => {
      if (!key || key.plugin !== oldPluginId) return false
      return callerFilters.size === 0 || callerFilters.has(key.caller)
    })
    .map(({ caller, escrow }) => ({ caller, escrow }))

  if (targets.length === 0) {
    const suffix = callerFilters.size > 0 ? ` matching caller filter: ${[...callerFilters].join(', ')}` : ''
    console.log(`No installed old asaMint grants found${suffix}.`)
  } else {
    console.log(`Discovered ${targets.length} old asaMint grant(s):`)
    for (const target of targets) {
      console.log(`  - ${grantLabel(target)}`)
    }
    console.log('')
  }

  const asaManagerPlugin = new AsaManagerPluginSDK({
    algorand: ctx.algorand,
    factoryParams: {
      appId: newPluginId,
      defaultSender: effectiveSender,
      defaultSigner: ctx.signer,
    },
  })

  const actions: ProposalAction<SDKClient>[] = []
  let installCount = 0n

  async function getGrantInfo(plugin: bigint, { caller, escrow }: GrantTarget): Promise<PluginInfo | undefined> {
    try {
      const info = await wallet.getPluginByKey({ plugin, caller, escrow })
      return info.start !== 0n ? info : undefined
    } catch {
      return undefined
    }
  }

  for (const target of targets) {
    const { caller, escrow } = target
    const label = grantLabel(target)
    const oldGrant = await getGrantInfo(oldPluginId, target)
    const newGrant = await getGrantInfo(newPluginId, target)

    if (oldGrant && oldPluginId !== newPluginId) {
      actions.push({
        type: ProposalActionEnum.RemovePlugin,
        plugin: oldPluginId,
        caller,
        escrow,
      })
      console.log(`Will remove old asaMint grant for ${label}`)
    } else if (oldPluginId === newPluginId && oldGrant) {
      console.log(`Old and new plugin ids match; existing grant for ${label} is already installed`)
    } else {
      console.log(`Old asaMint grant for ${label} not found; skipping removal`)
    }

    if (newGrant) {
      console.log(`New asaManager grant for ${label} already exists; skipping install`)
    } else if (oldGrant) {
      actions.push({
        type: ProposalActionEnum.AddPlugin,
        client: asaManagerPlugin,
        callerType: caller === ALGORAND_ZERO_ADDRESS_STRING ? CallerType.Global : CallerType.Other,
        caller,
        escrow,
        delegationType: oldGrant.delegationType,
        lastValid: oldGrant.lastValid,
        cooldown: oldGrant.cooldown,
        methods: oldGrant.methods.map((method) => ({
          name: [method.name],
          cooldown: method.cooldown,
        })),
        useRounds: oldGrant.useRounds,
        coverFees: oldGrant.coverFees,
        defaultToEscrow: oldGrant.escrow !== 0n,
        sourceLink: extra.sourceLink,
        useExecutionKey: false,
      })
      installCount += 1n
      console.log(`Will install new asaManager grant for ${label}`)
    }
  }

  if (installCount > 0n) {
    const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n })
    const funding = await getAppFundingNeeded(
      ctx.algorand,
      wallet.client.appAddress.toString(),
      (mbr.plugins * installCount) + 1_000_000n,
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
  Grants: ${targets.map(grantLabel).join(', ')}
`)
})

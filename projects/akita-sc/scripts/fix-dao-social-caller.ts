#!/usr/bin/env node

/**
 * Remove incorrect DAO social caller plugin grants and ensure the intended
 * caller grants exist.
 *
 * Cleans up:
 *   - grants for the stale NFD plugin app ID
 *   - global NFD grants
 *
 * Usage:
 *   npm run fix:dao-social-caller -- -n mainnet -m "DAO_MNEMONIC" --caller PERSONAL_ADDRESS
 */

import { ALGORAND_ZERO_ADDRESS_STRING, makeBasicAccountTransactionSigner } from 'algosdk'
import algosdk from 'algosdk'
import type { TransactionSigner } from '@algorandfoundation/algokit-utils/transact'
import { parseBaseArgs, createAlgorandClient, runScript } from './script-base'
import { buildAppIdsFromEnv, getNetworkAppIds, setCurrentNetwork } from 'akita-sdk'
import { AkitaDaoSDK, ProposalAction, ProposalActionEnum } from 'akita-sdk/dao'
import { AsaManagerPluginSDK, NFDPluginSDK, SelfOptInPluginSDK, SocialPluginSDK } from 'akita-sdk/wallet'
import type { SDKClient } from 'akita-sdk'
import dotenv from 'dotenv'
import { installDaoSocialCaller } from './dao-social-caller'
import { proposeAndExecute } from './utils'

const DEFAULT_BAD_NFD_PLUGIN_APP_ID = 3571140978n
const SOURCE_LINK = 'https://github.com/kylebee/akita-sc'

type CallerArgs = {
  caller?: string
  badNfdPluginAppId: bigint
  nfdPluginAppId?: bigint
  sourceLink?: string
}

type RemovalTarget = {
  label: string
  plugin: bigint
  caller: string
  escrow: string
  info?: PluginEntryInfo
}

type PluginEntryInfo = {
  start: bigint
  useExecutionKey: boolean
}

function parseCallerArgs(): CallerArgs {
  const args = process.argv.slice(2)
  let caller: string | undefined
  let badNfdPluginAppId = DEFAULT_BAD_NFD_PLUGIN_APP_ID
  let nfdPluginAppId: bigint | undefined
  let sourceLink: string | undefined

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--caller') {
      caller = args[++i]
    } else if (args[i] === '--bad-nfd-plugin') {
      badNfdPluginAppId = BigInt(args[++i])
    } else if (args[i] === '--nfd-plugin') {
      nfdPluginAppId = BigInt(args[++i])
    } else if (args[i] === '--source-link') {
      sourceLink = args[++i]
    }
  }

  return { caller, badNfdPluginAppId, nfdPluginAppId, sourceLink }
}

function getRequestedNetwork(): string {
  const args = process.argv.slice(2)
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--network' || args[i] === '-n') {
      return args[i + 1] ?? 'localnet'
    }
  }
  return process.env.ALGORAND_NETWORK ?? 'localnet'
}

function addRemovalTarget(targets: RemovalTarget[], target: RemovalTarget): void {
  const key = removalTargetKey(target)
  if (!targets.some((existing) => removalTargetKey(existing) === key)) {
    targets.push(target)
  }
}

function addressToString(address: string | { toString(): string }): string {
  return typeof address === 'string' ? address : address.toString()
}

function removalTargetKey(target: Pick<RemovalTarget, 'plugin' | 'caller' | 'escrow'>): string {
  return `${target.plugin}:${target.caller}:${target.escrow}`
}

runScript(async () => {
  const callerArgs = parseCallerArgs()
  dotenv.config({ path: `.env.${getRequestedNetwork()}` })
  const options = parseBaseArgs('fix-dao-social-caller.ts', `
  --caller <address>             Correct account address to delegate
  --bad-nfd-plugin <app-id>      Incorrect NFD plugin app ID. Default: ${DEFAULT_BAD_NFD_PLUGIN_APP_ID}
  --nfd-plugin <app-id>          Correct NFD plugin app ID override
  --source-link <url>            Proposal source link override`)

  const algorand = createAlgorandClient(options.network, options.algodToken)
  let sender: string
  let signer: TransactionSigner
  let caller = callerArgs.caller

  setCurrentNetwork(options.network)
  const envAppIds = buildAppIdsFromEnv(process.env as Record<string, string | undefined>)
  const networkAppIds = getNetworkAppIds(options.network)
  const daoAppId = envAppIds.dao > 0n ? envAppIds.dao : networkAppIds.dao
  const socialPluginAppId = envAppIds.socialPlugin > 0n ? envAppIds.socialPlugin : networkAppIds.socialPlugin
  const asaManagerPluginAppId = envAppIds.asaManagerPlugin > 0n ? envAppIds.asaManagerPlugin : networkAppIds.asaManagerPlugin
  const selfOptInPluginAppId = envAppIds.selfOptinPlugin > 0n ? envAppIds.selfOptinPlugin : networkAppIds.selfOptinPlugin
  const resolvedNfdPluginAppId = callerArgs.nfdPluginAppId
    ?? (envAppIds.nfdPlugin > 0n ? envAppIds.nfdPlugin : networkAppIds.nfdPlugin)

  if (options.network === 'localnet') {
    const dispenser = await algorand.account.kmd.getLocalNetDispenserAccount()
    const creatorMnemonic = process.env.LOCALNET_DAO_CREATOR_MNEMONIC

    if (creatorMnemonic) {
      const account = algosdk.mnemonicToSecretKey(creatorMnemonic)
      sender = account.addr.toString()
      signer = makeBasicAccountTransactionSigner(account) as unknown as TransactionSigner
    } else {
      const daoApp = await algorand.client.algod.applicationById(daoAppId)
      const creator = daoApp.params.creator
      const creatorAccount = await algorand.account.kmd.getWalletAccount(
        'unencrypted-default-wallet',
        (account) => account.address.equals(creator),
      )
      if (!creatorAccount) {
        throw new Error(
          `DAO creator ${creator.toString()} not found in localnet KMD wallet. ` +
          'Rerun deploy:universe/localnet:setup so .env.localnet includes LOCALNET_DAO_CREATOR_MNEMONIC.',
        )
      }

      sender = creatorAccount.addr.toString()
      signer = creatorAccount.signer
    }

    caller = caller ?? dispenser.addr.toString()
  } else if (options.mnemonic) {
    const account = algosdk.mnemonicToSecretKey(options.mnemonic)
    sender = account.addr.toString()
    signer = makeBasicAccountTransactionSigner(account) as unknown as TransactionSigner
  } else if (options.dryRun) {
    const account = algosdk.generateAccount()
    sender = account.addr.toString()
    signer = makeBasicAccountTransactionSigner(account) as unknown as TransactionSigner
  } else {
    throw new Error('Mnemonic is required for non-localnet networks')
  }

  if (!caller) {
    throw new Error('--caller is required for testnet/mainnet')
  }

  const sourceLink = callerArgs.sourceLink ?? SOURCE_LINK

  const dao = new AkitaDaoSDK({
    algorand,
    factoryParams: { appId: daoAppId, defaultSender: sender, defaultSigner: signer as any },
  })
  dao.setSendParams({ sender, signer })
  const wallet = await dao.getWallet()

  const targets: RemovalTarget[] = []
  const pluginInfoByTarget = new Map<string, PluginEntryInfo>()
  const pluginMap = await wallet.client.state.box.plugins.getMap()
  for (const [key, info] of pluginMap) {
    const grantCaller = addressToString(key.caller)
    const grantEscrow = String(key.escrow)
    pluginInfoByTarget.set(removalTargetKey({ plugin: key.plugin, caller: grantCaller, escrow: grantEscrow }), info)

    if (key.plugin !== callerArgs.badNfdPluginAppId) {
      continue
    }

    if (info.start === 0n) {
      continue
    }

    if (info.useExecutionKey) {
      console.log(`Skipping execution-key protected bad-nfd-plugin grant: plugin=${key.plugin}, caller=${grantCaller}, escrow=${key.escrow}`)
      continue
    }

    addRemovalTarget(targets, {
      label: grantCaller === ALGORAND_ZERO_ADDRESS_STRING ? 'bad-nfd-plugin global' : 'bad-nfd-plugin caller',
      plugin: key.plugin,
      caller: grantCaller,
      escrow: grantEscrow,
      info,
    })
  }

  addRemovalTarget(targets, {
    label: 'bad-nfd-plugin global',
    plugin: callerArgs.badNfdPluginAppId,
    caller: ALGORAND_ZERO_ADDRESS_STRING,
    escrow: '',
    info: pluginInfoByTarget.get(removalTargetKey({
      plugin: callerArgs.badNfdPluginAppId,
      caller: ALGORAND_ZERO_ADDRESS_STRING,
      escrow: '',
    })),
  })
  addRemovalTarget(targets, {
    label: 'nfd-plugin global',
    plugin: resolvedNfdPluginAppId,
    caller: ALGORAND_ZERO_ADDRESS_STRING,
    escrow: '',
    info: pluginInfoByTarget.get(removalTargetKey({
      plugin: resolvedNfdPluginAppId,
      caller: ALGORAND_ZERO_ADDRESS_STRING,
      escrow: '',
    })),
  })

  const existingTargets: RemovalTarget[] = []
  for (const target of targets) {
    const info = target.info
    if (!info || info.start === 0n) {
      console.log(`Skipping missing ${target.label}: plugin=${target.plugin}, caller=${target.caller}, escrow=${target.escrow}`)
      continue
    }
    if (info.useExecutionKey) {
      console.log(`Skipping execution-key protected ${target.label}: plugin=${target.plugin}, caller=${target.caller}, escrow=${target.escrow}`)
      continue
    }
    existingTargets.push(target)
  }

  console.log(`\nFixing DAO social caller grants on ${options.network}`)
  console.log(`DAO: ${dao.appId}`)
  console.log(`Wallet: ${wallet.appId}`)
  console.log(`Correct caller: ${caller}`)
  console.log(`Correct NFD plugin: ${resolvedNfdPluginAppId}`)
  console.log(`Bad NFD plugin: ${callerArgs.badNfdPluginAppId}`)
  console.log(`Existing grants to remove: ${existingTargets.length}\n`)

  if (existingTargets.length > 0) {
    for (const target of existingTargets) {
      console.log(`Remove ${target.label}: plugin=${target.plugin}, caller=${target.caller}, escrow=${target.escrow}`)
    }
  }

  if (options.dryRun) {
    console.log('\nDRY RUN - would remove existing bad grants above, then install any missing correct caller grants.')
    return
  }

  const removalProposalIds: bigint[] = []
  if (existingTargets.length > 0) {
    const actionLimit = Number(await dao.client.state.global.proposalActionLimit() ?? 1n)
    const batchSize = Math.max(1, actionLimit)
    for (let i = 0; i < existingTargets.length; i += batchSize) {
      const actions = existingTargets.slice(i, i + batchSize).map((target): ProposalAction<SDKClient> => ({
        type: ProposalActionEnum.RemovePlugin,
        plugin: target.plugin,
        caller: target.caller,
        escrow: target.escrow,
      }))
      removalProposalIds.push(await proposeAndExecute(algorand, dao, actions))
    }
  }

  const socialPlugin = new SocialPluginSDK({
    algorand,
    factoryParams: { appId: socialPluginAppId, defaultSender: sender, defaultSigner: signer as any },
  })
  const asaManagerPlugin = asaManagerPluginAppId > 0n
    ? new AsaManagerPluginSDK({
      algorand,
      factoryParams: { appId: asaManagerPluginAppId, defaultSender: sender, defaultSigner: signer as any },
    })
    : undefined
  const nfdPlugin = resolvedNfdPluginAppId > 0n
    ? new NFDPluginSDK({
      algorand,
      factoryParams: { appId: resolvedNfdPluginAppId, defaultSender: sender, defaultSigner: signer as any },
    })
    : undefined
  const selfOptInPlugin = selfOptInPluginAppId > 0n
    ? new SelfOptInPluginSDK({
      algorand,
      factoryParams: { appId: selfOptInPluginAppId, defaultSender: sender, defaultSigner: signer as any },
    })
    : undefined

  const installResult = await installDaoSocialCaller({
    algorand,
    dao,
    socialPlugin,
    asaManagerPlugin,
    nfdPlugin,
    selfOptInPlugin,
    sender,
    signer,
    caller,
    sourceLink,
  })

  console.log('\nDAO social caller fix complete')
  if (removalProposalIds.length > 0) {
    console.log(`Removal proposal(s): ${removalProposalIds.join(', ')}`)
  }
  if (installResult.installed) {
    console.log(`Install proposal(s): ${installResult.proposalIds.join(', ')}`)
  } else {
    console.log('Correct caller grants already existed')
  }
})

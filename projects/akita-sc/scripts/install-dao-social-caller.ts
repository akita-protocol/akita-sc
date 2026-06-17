#!/usr/bin/env node

/**
 * Install DAO wallet social-plugin, ASA-mint-plugin, self-opt-in-plugin, and
 * NFD-plugin caller grants.
 *
 * This delegates a specific account to create DAO-authored social posts and use
 * the DAO wallet's ASA manager, self opt-in, and NFD plugins. Localnet defaults to
 * the dispenser account so akita-rn mock posts can be seeded without a user
 * wallet. Testnet/mainnet should pass a personal posting account via --caller.
 *
 * Usage:
 *   npm run install:dao-social-caller -- -n localnet
 *   npm run install:dao-social-caller -- -n testnet -m "DAO_MNEMONIC" --caller PERSONAL_ADDRESS
 *   npm run install:dao-social-caller -- -n mainnet -m "DAO_MNEMONIC" --caller PERSONAL_ADDRESS
 */

import type { TransactionSigner } from '@algorandfoundation/algokit-utils/transact'
import { parseBaseArgs, createAlgorandClient, runScript } from './script-base'
import { buildAppIdsFromEnv, getNetworkAppIds, setCurrentNetwork } from 'akita-sdk'
import { AkitaDaoSDK } from 'akita-sdk/dao'
import { AsaManagerPluginSDK, NFDPluginSDK, SelfOptInPluginSDK, SocialPluginSDK } from 'akita-sdk/wallet'
import algosdk, { makeBasicAccountTransactionSigner } from 'algosdk'
import dotenv from 'dotenv'
import { installDaoSocialCaller } from './dao-social-caller'

function parseCallerArgs(): { caller?: string; sourceLink?: string } {
  const args = process.argv.slice(2)
  let caller: string | undefined
  let sourceLink: string | undefined

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--caller') {
      caller = args[++i]
    } else if (args[i] === '--source-link') {
      sourceLink = args[++i]
    }
  }

  return { caller, sourceLink }
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

runScript(async () => {
  const callerArgs = parseCallerArgs()
  dotenv.config({ path: `.env.${getRequestedNetwork()}` })
  const options = parseBaseArgs('install-dao-social-caller.ts', `
  --caller <address>             Account address to delegate for DAO social/plugin calls
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
  const nfdPluginAppId = envAppIds.nfdPlugin > 0n ? envAppIds.nfdPlugin : networkAppIds.nfdPlugin
  const selfOptInPluginAppId = envAppIds.selfOptinPlugin > 0n ? envAppIds.selfOptinPlugin : networkAppIds.selfOptinPlugin

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

  const dao = new AkitaDaoSDK({
    algorand,
    factoryParams: { appId: daoAppId, defaultSender: sender, defaultSigner: signer as any },
  })
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
  const nfdPlugin = nfdPluginAppId > 0n
    ? new NFDPluginSDK({
      algorand,
      factoryParams: { appId: nfdPluginAppId, defaultSender: sender, defaultSigner: signer as any },
    })
    : undefined
  const selfOptInPlugin = selfOptInPluginAppId > 0n
    ? new SelfOptInPluginSDK({
      algorand,
      factoryParams: { appId: selfOptInPluginAppId, defaultSender: sender, defaultSigner: signer as any },
    })
    : undefined

  console.log(`\nInstalling DAO social caller on ${options.network}`)
  console.log(`DAO: ${dao.appId}`)
  console.log(`Social plugin: ${socialPlugin.appId}`)
  if (asaManagerPlugin) {
    console.log(`ASA manager plugin: ${asaManagerPlugin.appId}`)
  }
  if (nfdPlugin) {
    console.log(`NFD plugin: ${nfdPlugin.appId}`)
  }
  if (selfOptInPlugin) {
    console.log(`Self opt-in plugin: ${selfOptInPlugin.appId}`)
  }
  console.log(`Proposal sender: ${sender}`)
  console.log(`Delegated caller: ${caller}\n`)

  const result = await installDaoSocialCaller({
    algorand,
    dao,
    socialPlugin,
    asaManagerPlugin,
    nfdPlugin,
    selfOptInPlugin,
    sender,
    signer,
    caller,
    sourceLink: callerArgs.sourceLink,
    dryRun: options.dryRun,
  })

  if (options.dryRun) {
    console.log('DRY RUN complete')
  } else if (result.installed) {
    console.log(`DAO social caller installed via proposal(s): ${result.proposalIds.join(', ')}`)
  } else {
    console.log('DAO social caller already installed')
  }
})

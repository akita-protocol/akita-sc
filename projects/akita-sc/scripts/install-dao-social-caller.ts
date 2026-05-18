#!/usr/bin/env node

/**
 * Install a DAO wallet social-plugin caller grant.
 *
 * This delegates a specific account to create DAO-authored social posts through
 * the DAO wallet. Localnet defaults to the dispenser account so akita-rn mock
 * posts can be seeded without a user wallet. Testnet/mainnet should pass a
 * personal posting account via --caller or --caller-mnemonic.
 *
 * Usage:
 *   npm run install:dao-social-caller -- -n localnet
 *   npm run install:dao-social-caller -- -n testnet -m "DAO_MNEMONIC" --caller PERSONAL_ADDRESS
 *   npm run install:dao-social-caller -- -n mainnet -m "DAO_MNEMONIC" --caller-mnemonic "PERSONAL_MNEMONIC"
 */

import type { TransactionSigner } from '@algorandfoundation/algokit-utils/transact'
import { parseBaseArgs, createAlgorandClient, runScript } from './script-base'
import { buildAppIdsFromEnv, getNetworkAppIds, setCurrentNetwork } from 'akita-sdk'
import { AkitaDaoSDK } from 'akita-sdk/dao'
import { SelfOptInPluginSDK, SocialPluginSDK } from 'akita-sdk/wallet'
import algosdk, { makeBasicAccountTransactionSigner } from 'algosdk'
import dotenv from 'dotenv'
import { installDaoSocialCaller } from './dao-social-caller'

function parseCallerArgs(): { caller?: string; callerMnemonic?: string; sourceLink?: string } {
  const args = process.argv.slice(2)
  let caller: string | undefined
  let callerMnemonic: string | undefined
  let sourceLink: string | undefined

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--caller') {
      caller = args[++i]
    } else if (args[i] === '--caller-mnemonic') {
      callerMnemonic = args[++i]
    } else if (args[i] === '--source-link') {
      sourceLink = args[++i]
    }
  }

  return { caller, callerMnemonic, sourceLink }
}

runScript(async () => {
  const callerArgs = parseCallerArgs()
  const options = parseBaseArgs('install-dao-social-caller.ts', `
  --caller <address>             Account address to delegate for DAO social posts
  --caller-mnemonic <mnemonic>   Derive delegated posting account from mnemonic
  --source-link <url>            Proposal source link override`)

  dotenv.config({ path: `.env.${options.network}` })

  const algorand = createAlgorandClient(options.network, options.algodToken)
  let sender: string
  let signer: TransactionSigner
  let caller = callerArgs.caller

  if (callerArgs.callerMnemonic) {
    caller = algosdk.mnemonicToSecretKey(callerArgs.callerMnemonic).addr.toString()
  }

  setCurrentNetwork(options.network)
  const envAppIds = buildAppIdsFromEnv(process.env as Record<string, string | undefined>)
  const networkAppIds = getNetworkAppIds(options.network)
  const daoAppId = envAppIds.dao > 0n ? envAppIds.dao : networkAppIds.dao
  const socialPluginAppId = envAppIds.socialPlugin > 0n ? envAppIds.socialPlugin : networkAppIds.socialPlugin
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
  } else {
    throw new Error('Mnemonic is required for non-localnet networks')
  }

  if (!caller) {
    throw new Error('--caller or --caller-mnemonic is required for testnet/mainnet')
  }

  const dao = new AkitaDaoSDK({
    algorand,
    factoryParams: { appId: daoAppId, defaultSender: sender, defaultSigner: signer as any },
  })
  const socialPlugin = new SocialPluginSDK({
    algorand,
    factoryParams: { appId: socialPluginAppId, defaultSender: sender, defaultSigner: signer as any },
  })
  const selfOptInPlugin = selfOptInPluginAppId > 0n
    ? new SelfOptInPluginSDK({
      algorand,
      factoryParams: { appId: selfOptInPluginAppId, defaultSender: sender, defaultSigner: signer as any },
    })
    : undefined

  console.log(`\nInstalling DAO social caller on ${options.network}`)
  console.log(`DAO: ${dao.appId}`)
  console.log(`Social plugin: ${socialPlugin.appId}`)
  if (selfOptInPlugin) {
    console.log(`Self opt-in plugin: ${selfOptInPlugin.appId}`)
  }
  console.log(`Proposal sender: ${sender}`)
  console.log(`Delegated caller: ${caller}\n`)

  const result = await installDaoSocialCaller({
    algorand,
    dao,
    socialPlugin,
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

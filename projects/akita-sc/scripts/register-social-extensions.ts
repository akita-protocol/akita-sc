#!/usr/bin/env node

/**
 * Register Social Extensions Script
 *
 * Registers extension ref types on the social contract via the DAO wallet's
 * social plugin. Currently registers:
 *
 *   - arc53_collection (RefType 5): NFT collections identified by collection ID
 *
 * Usage:
 *   Called by deploy-universe after setupSubscriptionServices.
 *   Can also be run standalone for testnet/mainnet:
 *     npm run register:social-extensions -- -n testnet -m "your mnemonic"
 */

import { microAlgo } from '@algorandfoundation/algokit-utils'
import { parseBaseArgs, createAlgorandClient, runScript } from './script-base'
import { proposeAndExecute, getAppFundingNeeded } from './utils'
import { sendPrepared, setCurrentNetwork } from 'akita-sdk'
import { AkitaDaoSDK, ProposalActionEnum } from 'akita-sdk/dao'
import { CallerType, SocialPluginSDK } from 'akita-sdk/wallet'
import {
  DEFAULT_CREATION,
  DEFAULT_UPGRADE_APP_PROPOSAL_POWER,
  DEFAULT_UPGRADE_APP_VOTING_DURATION,
  DEFAULT_UPGRADE_APP_PARTICIPATION,
  DEFAULT_UPGRADE_APP_APPROVAL,
} from '../smart_contracts/utils/defaults'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import algosdk, { makeBasicAccountTransactionSigner } from 'algosdk'
import type { AkitaUniverse } from '../tests/fixtures/dao'

// ---------------------------------------------------------------------------
// Extension definitions
// ---------------------------------------------------------------------------

const EXTENSIONS = [
  {
    name: 'arc53_collection',
    schema: new TextEncoder().encode('sha256(nfd_app_id + collection_name)'),
    description: 'NFT collections (ARC-53)',
  },
] as const

// ---------------------------------------------------------------------------
// Exported setup function (used by deploy-universe and standalone CLI)
// ---------------------------------------------------------------------------

interface RegisterSocialExtensionsParams {
  algorand: import('@algorandfoundation/algokit-utils').AlgorandClient
  universe: AkitaUniverse
  sender: string
  signer: algosdk.TransactionSigner
  network: string
}

export async function registerSocialExtensions({
  algorand,
  universe,
  sender,
  signer,
  network,
}: RegisterSocialExtensionsParams): Promise<void> {
  console.log('\n📦 Registering social extensions (ref types)...\n')

  const dao = universe.dao
  dao.setSendParams({ sender, signer })

  const daoWallet = await dao.getWallet()
  const socialPluginSdk = universe.socialPlugin

  for (const ext of EXTENSIONS) {
    console.log(`   Registering ${ext.name} — ${ext.description}...`)

    // Fund the wallet if needed for the MBR payment
    const walletFunding = await getAppFundingNeeded(
      algorand, daoWallet.client.appAddress.toString(), 100_000n, // ref type MBR + buffer
    )
    if (walletFunding > 0n) {
      await daoWallet.client.appClient.fundAppAccount({ amount: microAlgo(walletFunding) })
    }

    // The social plugin was installed with CallerType.Global, so the lookup
    // key in the wallet's `plugins` box is `{plugin, caller: ZeroAddress, escrow: ''}`.
    // Using a non-`Global` caller type here results in a 404 box-not-found from
    // the wallet's plugin map lookup before the txn group is even built.
    const execution = await daoWallet.build.usePlugin({
      sender,
      signer,
      lease: `reg_ref_${ext.name.slice(0, 16)}`,
      windowSize: 2000n,
      callerType: CallerType.Global,
      calls: [
        socialPluginSdk.registerRefType({
          sender,
          signer,
          name: ext.name,
          schema: ext.schema,
        }),
      ],
    })

    await proposeAndExecute(algorand, dao, [
      {
        type: ProposalActionEnum.ExecutePlugin,
        plugin: socialPluginSdk.appId,
        caller: sender,
        escrow: '',
        executionKey: execution.lease,
        groups: execution.ids,
        firstValid: execution.firstValid,
        lastValid: execution.lastValid,
      },
    ])

    for (const window of execution.windows) {
      await sendPrepared(window, algorand.client.algod)
    }

    console.log(`   ✅ Registered ${ext.name}`)
  }

  console.log()
}

// ---------------------------------------------------------------------------
// CLI entry point (for standalone use on testnet/mainnet)
// ---------------------------------------------------------------------------

if (require.main === module) {
  runScript(async () => {
    const options = parseBaseArgs('register-social-extensions.ts')
    console.log(`\nRegistering social extensions on ${options.network}...\n`)

    if (options.dryRun) {
      console.log('DRY RUN - Extensions that would be registered:\n')
      for (const ext of EXTENSIONS) {
        console.log(`   ${ext.name} — ${ext.description}`)
      }
      console.log()
      return
    }

    const algorand = createAlgorandClient(options.network, options.algodToken)
    let sender: string
    let signer: algosdk.TransactionSigner

    if (options.network === 'localnet') {
      const fixture = algorandFixture()
      await fixture.newScope()
      const account = fixture.context.testAccount as algosdk.Account
      sender = account.addr.toString()
      signer = (account as any).signer

      const dispenser = await algorand.account.dispenserFromEnvironment()
      await algorand.account.ensureFunded(sender, dispenser, (500).algos())
    } else if (options.mnemonic) {
      const account = algosdk.mnemonicToSecretKey(options.mnemonic)
      sender = account.addr.toString()
      signer = makeBasicAccountTransactionSigner(account)
    } else {
      throw new Error('Mnemonic is required for non-localnet networks')
    }

    setCurrentNetwork(options.network)

    const dao = new AkitaDaoSDK({
      algorand,
      factoryParams: { defaultSender: sender, defaultSigner: signer },
    })

    const socialPluginSdk = new SocialPluginSDK({
      algorand,
      factoryParams: { defaultSender: sender, defaultSigner: signer },
    })

    const universe = {
      dao,
      socialPlugin: socialPluginSdk,
    } as unknown as AkitaUniverse

    await registerSocialExtensions({ algorand, universe, sender, signer, network: options.network })
  })
}

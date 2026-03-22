#!/usr/bin/env node

/**
 * Update DAO Wallet (AbstractedAccount) Script
 *
 * Updates the DAO's own wallet by creating a ProposalActionTypeUpdateWallet
 * proposal, which calls factory.updateWallet(wallet) using the bytecode
 * already stored in the wallet factory's box.
 *
 * Prerequisites:
 *   - The wallet factory's boxed child contract must already be up to date.
 *     If not, run update:wallet-factory first.
 *
 * Usage:
 *   npm run update:dao-wallet -- -n testnet -m "your mnemonic"
 */

import { parseBaseArgs, setupContext, runScript } from './script-base'
import { AbstractedAccountFactoryClient } from '../smart_contracts/artifacts/arc58/account/AbstractedAccountFactoryClient'
import { ProposalAction, ProposalActionEnum } from 'akita-sdk/dao'
import { SDKClient } from 'akita-sdk'
import { proposeAndExecute } from './utils'

runScript(async () => {
  const options = parseBaseArgs('update-dao-wallet.ts')
  console.log(`\nStarting DAO Wallet update on ${options.network}...\n`)

  const ctx = await setupContext(options)

  const { algorand, sender, signer, appIds, dao } = ctx

  // Read the current childContractVersion from the wallet factory
  const walletFactoryClient = algorand.client.getTypedAppClientById(
    AbstractedAccountFactoryClient,
    {
      appId: appIds.walletFactory,
      defaultSender: sender,
      defaultSigner: signer,
    }
  )
  const version = await walletFactoryClient.state.global.childContractVersion()
  if (!version) {
    throw new Error('Could not read childContractVersion from wallet factory')
  }
  console.log(`Wallet factory childContractVersion: ${version}`)
  console.log(`Wallet App ID: ${appIds.wallet}\n`)

  if (ctx.options.dryRun) {
    console.log('DRY RUN - Would create UpdateWallet proposal')
    console.log(`   Target wallet app: ${appIds.wallet}`)
    console.log(`   Version (from factory): ${version}\n`)
    return
  }

  // Create and execute UpdateWallet proposal
  console.log('Creating UpdateWallet proposal...')
  const updateWalletAction: ProposalAction<SDKClient> = {
    type: ProposalActionEnum.UpdateWallet,
  }

  const proposalId = await proposeAndExecute(algorand, dao, [updateWalletAction])
  console.log(`   Proposal ${proposalId} created and executed\n`)

  // Verify
  await dao.getWallet()
  const newVersion = await dao.wallet.client.state.global.version()
  console.log(`   New wallet version: ${newVersion}\n`)

  console.log('='.repeat(60))
  console.log('DAO WALLET UPDATE COMPLETE!')
  console.log('='.repeat(60))
  console.log(`\n  Network: ${ctx.options.network}`)
  console.log(`  Wallet App ID: ${appIds.wallet}`)
  console.log(`  Version: ${version}`)
  console.log(`  Proposal: ${proposalId}\n`)
})

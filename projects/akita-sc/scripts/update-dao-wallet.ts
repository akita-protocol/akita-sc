#!/usr/bin/env node

/**
 * Update DAO Wallet (AbstractedAccount) Script
 *
 * Updates the DAO's own wallet by creating a ProposalActionTypeUpdateWallet
 * proposal, which calls factory.updateWallet(wallet) using the bytecode
 * already stored in the wallet factory's box.
 *
 * Prerequisites:
 *   - The wallet factory must run this tree's AbstractedAccountFactory with the
 *     AbstractedAccount child staged. Stage both in one group with
 *     `npm run update:wallet-factory -- --update-factory` (or Phase 2
 *     `--target AbstractedAccountFactory`). Never stage the AVM 13 wallet alone
 *     into the deployed AVM 11 factory: every newAccount and updateWallet would
 *     revert (ACCT-3). Once the DAO wallet runs the AVM 13 program it can never
 *     go back to an older version.
 *
 *   - When the staged wallet needs more program pages than the DAO wallet has, the update raises
 *     the wallet factory's minimum balance by 100,000 microAlgos per page. The script reads what
 *     the factory lacks, prints it, and pays it from the sender before the proposal.
 *
 * Usage:
 *   npm run update:dao-wallet -- -n testnet -m "your mnemonic"
 */

import { parseBaseArgs, setupContext, runScript } from './script-base'
import { APP_SPEC as WALLET_SPEC } from '../smart_contracts/artifacts/arc58/account/AbstractedAccountClient'
import { AbstractedAccountFactoryClient } from '../smart_contracts/artifacts/arc58/account/AbstractedAccountFactoryClient'
import {
  approvalProgram,
  clearProgramSize,
  describeTreeGrowth,
  describeWalletGrowth,
  fundWalletGrowth,
  readWalletGrowth,
  stagedWalletProgram,
} from './lib/wallet-page-growth'
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

  // The factory sends the update. If the DAO wallet gains a program page, the factory's minimum
  // balance rises and the factory takes no payment in updateWallet, so it is funded here first.
  const clearSize = clearProgramSize(WALLET_SPEC)
  const tree = approvalProgram(WALLET_SPEC)
  const growth = await readWalletGrowth(algorand, appIds.walletFactory, [appIds.wallet], clearSize)
  for (const line of describeWalletGrowth(growth)) console.log(line)
  const treeGrowth = await readWalletGrowth(algorand, appIds.walletFactory, [appIds.wallet], clearSize, tree.length)
  for (const line of describeTreeGrowth(await stagedWalletProgram(algorand, appIds.walletFactory), tree, treeGrowth)) console.log(line)
  console.log('')

  if (ctx.options.dryRun) {
    console.log('DRY RUN - Would create UpdateWallet proposal')
    console.log(`   Target wallet app: ${appIds.wallet}`)
    console.log(`   Version (from factory): ${version}`)
    if (growth.shortfall > 0n) console.log(`   A real run first pays ${growth.shortfall} µALGO to the wallet factory`)
    console.log('')
    return
  }

  const funded = await fundWalletGrowth(ctx, appIds.walletFactory, growth)
  if (funded > 0n) console.log(`Paid ${funded} µALGO to the wallet factory for the new program page(s)\n`)

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

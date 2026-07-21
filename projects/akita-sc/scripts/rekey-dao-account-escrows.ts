#!/usr/bin/env node

/**
 * Rekey the existing AKTA creator and collections accounts from the deployer
 * to the DAO smart wallet.
 *
 * Before running this script, each target account must already be rekeyed to
 * the deployer address represented by the supplied mnemonic. The target
 * accounts remain the transaction senders and pay their own 0.001 ALGO fees;
 * the deployer is their authorization signer.
 *
 * Usage:
 *   npm run rekey:dao-account-escrows -- --dry-run
 *   npm run rekey:dao-account-escrows -- -m "$MNEMONIC" --confirm-rekey
 */

import { microAlgo } from '@algorandfoundation/algokit-utils'
import { parseBaseArgs, runScript, setupContext } from './script-base'

const TARGET_ACCOUNTS = [
  {
    name: 'akta_creator',
    address: 'QUUQHH4HJ3FHUWMKTKFBUA72XTSW6F7YLLTRI7FWENJBKQYWTESSCZPQLU',
  },
  {
    name: 'collections',
    address: 'AKCTRDK4OWNWHTPH4XPKLNWNLZ333VE35SKQ4FGQK3ZJA4FIHCLTRG3PFI',
  },
] as const

const REKEY_FEE = 1_000n

runScript(async () => {
  const options = parseBaseArgs(
    'rekey-dao-account-escrows.ts',
    `
This script is mainnet-only and atomically rekeys these accounts to the live DAO wallet:
  akta_creator  QUUQHH4HJ3FHUWMKTKFBUA72XTSW6F7YLLTRI7FWENJBKQYWTESSCZPQLU
  collections   AKCTRDK4OWNWHTPH4XPKLNWNLZ333VE35SKQ4FGQK3ZJA4FIHCLTRG3PFI

Additional options:
  --confirm-rekey             Required for a live rekey`,
  )

  if (options.network !== 'mainnet') {
    throw new Error('This script is mainnet-only. Run it through the rekey:dao-account-escrows npm command.')
  }

  const confirmed = process.argv.slice(2).includes('--confirm-rekey')
  const ctx = await setupContext(options, { minBalance: 100_000n })
  const [daoApp, daoState] = await Promise.all([
    ctx.algorand.app.getById(ctx.dao.appId),
    ctx.dao.client.state.global.getAll(),
  ])
  const daoCreator = daoApp.creator.toString()
  const deployer = options.dryRun ? daoCreator : ctx.sender
  const walletAppId = daoState.wallet

  if (walletAppId === undefined || walletAppId === 0n) {
    throw new Error('The DAO does not have a wallet configured')
  }

  const wallet = await ctx.algorand.app.getById(walletAppId)
  const walletAddress = wallet.appAddress.toString()
  const accountsToRekey: (typeof TARGET_ACCOUNTS)[number][] = []
  const blockers: string[] = []

  console.log('DAO regular-account rekey')
  console.log(`  DAO: ${ctx.dao.appId}`)
  console.log(`  Deployer/auth signer: ${deployer}`)
  console.log(`  DAO wallet: ${walletAppId} (${walletAddress})\n`)

  for (const target of TARGET_ACCOUNTS) {
    const account = await ctx.algorand.account.getInformation(target.address)
    const authAddress = account.authAddr?.toString() ?? target.address
    const spendable = account.balance.microAlgos - account.minBalance.microAlgos

    if (authAddress === walletAddress) {
      console.log(`${target.name}: already rekeyed to the DAO wallet; skipping`)
      continue
    }

    if (authAddress !== deployer) {
      blockers.push(`${target.name} currently authorizes ${authAddress}, expected deployer ${deployer}`)
      continue
    }

    if (spendable < REKEY_FEE) {
      blockers.push(`${target.name} has only ${spendable} spendable microAlgos; ${REKEY_FEE} is required`)
      continue
    }

    accountsToRekey.push(target)
    console.log(`${target.name}: ready (${target.address})`)
  }

  if (blockers.length > 0) {
    console.error('\nNot ready to rekey:')
    for (const blocker of blockers) console.error(`  - ${blocker}`)
    if (options.dryRun) {
      console.log('\nDRY RUN - first rekey the blocked accounts to the deployer shown above.')
      return
    }
    throw new Error('Account authorization checks failed; no transactions were submitted')
  }

  if (accountsToRekey.length === 0) {
    console.log('\nNothing to do: both accounts are already rekeyed to the DAO wallet.')
    return
  }

  console.log(`\nTransactions: ${accountsToRekey.length} atomic zero-ALGO self-payment(s)`)
  console.log(`Fee per target account: ${REKEY_FEE} microAlgos`)
  console.log(`New auth address: ${walletAddress}`)

  if (options.dryRun) {
    console.log('\nDRY RUN - authorization checks passed; no rekey transactions were submitted.')
    return
  }

  if (!confirmed) {
    throw new Error('Pass --confirm-rekey to authorize the live rekey after reviewing --dry-run output')
  }

  const group = ctx.algorand.newGroup()
  for (const target of accountsToRekey) {
    group.addPayment({
      sender: target.address,
      signer: ctx.signer as any,
      receiver: target.address,
      amount: microAlgo(0n),
      staticFee: microAlgo(REKEY_FEE),
      rekeyTo: walletAddress,
      note: `Akita DAO escrow rekey: ${target.name}`,
    })
  }

  const result = await group.send()

  for (const target of accountsToRekey) {
    const account = await ctx.algorand.account.getInformation(target.address)
    const authAddress = account.authAddr?.toString() ?? target.address
    if (authAddress !== walletAddress) {
      throw new Error(`${target.name} rekey confirmed, but auth address is ${authAddress}; expected ${walletAddress}`)
    }
  }

  console.log('\n' + '='.repeat(72))
  console.log('DAO ACCOUNT REKEY COMPLETE')
  console.log('='.repeat(72))
  console.log(`  Confirmed round: ${result.confirmations[0]?.confirmedRound ?? 'unknown'}`)
  for (let i = 0; i < accountsToRekey.length; i++) {
    console.log(`  ${accountsToRekey[i].name}: ${result.txIds[i]}`)
  }
  console.log(`  Auth address: ${walletAddress}`)
})

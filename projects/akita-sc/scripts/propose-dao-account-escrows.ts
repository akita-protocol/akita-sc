#!/usr/bin/env node

/**
 * Propose registering the existing AKTA creator and collections accounts as
 * named escrows on the DAO smart wallet.
 *
 * The proposal can be created before the accounts are rekeyed, but it cannot
 * be executed until both accounts' auth addresses are the DAO wallet address.
 *
 * Usage:
 *   npm run propose:dao-account-escrows -- -m "$MNEMONIC"
 *   npm run propose:dao-account-escrows -- -m "$MNEMONIC" --submit
 *   npm run propose:dao-account-escrows -- --dry-run
 */

import { microAlgo } from '@algorandfoundation/algokit-utils'
import { SDKClient } from 'akita-sdk'
import { ProposalAction, ProposalActionEnum } from 'akita-sdk/dao'
import { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import { parseBaseArgs, runScript, setupContext } from './script-base'
import { getAppFundingNeeded } from './utils'

const ACCOUNT_ESCROWS = [
  {
    name: 'akta_creator',
    address: 'QUUQHH4HJ3FHUWMKTKFBUA72XTSW6F7YLLTRI7FWENJBKQYWTESSCZPQLU',
  },
  {
    name: 'collections',
    address: 'AKCTRDK4OWNWHTPH4XPKLNWNLZ333VE35SKQ4FGQK3ZJA4FIHCLTRG3PFI',
  },
] as const

const DAO_STATE_FULLY_INITIALIZED = 2

runScript(async () => {
  const options = parseBaseArgs(
    'propose-dao-account-escrows.ts',
    `
This script is mainnet-only and always proposes these regular-account escrows:
  akta_creator  QUUQHH4HJ3FHUWMKTKFBUA72XTSW6F7YLLTRI7FWENJBKQYWTESSCZPQLU
  collections   AKCTRDK4OWNWHTPH4XPKLNWNLZ333VE35SKQ4FGQK3ZJA4FIHCLTRG3PFI

Additional options:
  --submit                    Submit for voting after creation (fully initialized DAO only)`,
  )

  if (options.network !== 'mainnet') {
    throw new Error('This script is mainnet-only. Run it through the propose:dao-account-escrows npm command.')
  }

  const submit = process.argv.slice(2).includes('--submit')
  const ctx = await setupContext(options)
  const [daoApp, daoState] = await Promise.all([
    ctx.algorand.app.getById(ctx.dao.appId),
    ctx.dao.client.state.global.getAll(),
  ])
  const daoCreator = daoApp.creator.toString()
  const effectiveSender = options.dryRun ? daoCreator : ctx.sender

  if (daoState.state !== DAO_STATE_FULLY_INITIALIZED && effectiveSender !== daoCreator) {
    throw new Error(
      `DAO state is ${daoState.state ?? 'unknown'}; only creator ${daoCreator} can create pre-initialization proposals`,
    )
  }
  if (submit && daoState.state !== DAO_STATE_FULLY_INITIALIZED) {
    throw new Error('Do not use --submit before DAO initialization; creator proposals are approved automatically')
  }

  ctx.dao.setSendParams({ sender: effectiveSender, signer: ctx.signer })
  const wallet = await ctx.dao.getWallet()
  const walletAddress = wallet.client.appAddress.toString()
  const actions: ProposalAction<SDKClient>[] = []
  let requiredWalletMbr = 0n

  console.log('DAO regular-account escrow proposal')
  console.log(`  DAO: ${ctx.dao.appId}`)
  console.log(`  DAO state: ${daoState.state ?? 'unknown'} (creator: ${daoCreator})`)
  console.log(`  DAO wallet: ${wallet.appId} (${walletAddress})\n`)

  for (const escrow of ACCOUNT_ESCROWS) {
    const existing = await wallet.getEscrow(escrow.name)
    if (existing.address !== ALGORAND_ZERO_ADDRESS_STRING) {
      if (existing.address !== escrow.address) {
        throw new Error(`Escrow "${escrow.name}" already points to ${existing.address}, not ${escrow.address}`)
      }
      console.log(`Skipping ${escrow.name}: already registered to ${escrow.address}`)
      continue
    }

    const account = await ctx.algorand.account.getInformation(escrow.address)
    const authAddress = account.authAddr?.toString() ?? escrow.address
    if (authAddress === walletAddress) {
      console.log(`${escrow.name}: account is rekeyed to the DAO wallet`)
    } else {
      console.warn(
        `${escrow.name}: account auth address is ${authAddress}; ` +
          `it must be rekeyed to ${walletAddress} before this proposal can execute`,
      )
    }

    const mbr = await wallet.getMbr({
      escrow: escrow.name,
      methodCount: 0n,
      plugin: '',
      groups: 0n,
    })
    requiredWalletMbr += mbr.escrows
    actions.push({
      type: ProposalActionEnum.NewEscrow,
      escrow: escrow.name,
      address: escrow.address,
    })
  }

  if (actions.length === 0) {
    console.log('\nNothing to propose: both escrows are already registered.')
    return
  }

  const proposalCost = await ctx.dao.proposalCost({
    sender: effectiveSender,
    signer: ctx.signer,
    actions,
  })
  const walletFunding = await getAppFundingNeeded(ctx.algorand, walletAddress, requiredWalletMbr, 0n)

  console.log(`\nActions: ${actions.length}`)
  console.log(`Wallet escrow-box MBR: ${requiredWalletMbr} microAlgos`)
  console.log(`Wallet funding shortfall: ${walletFunding} microAlgos`)
  console.log(`Proposal cost: total=${proposalCost.total}, fee=${proposalCost.fee}, mbr=${proposalCost.mbr}`)

  if (options.dryRun) {
    const proposalResult =
      daoState.state === DAO_STATE_FULLY_INITIALIZED
        ? submit
          ? 'create the proposal and submit it for voting'
          : 'create a draft proposal'
        : 'create an automatically approved proposal'
    console.log(`\nDRY RUN - would${walletFunding > 0n ? ' fund the DAO wallet and' : ''} ${proposalResult}.`)
    return
  }

  if (walletFunding > 0n) {
    await ctx.algorand.send.payment({
      sender: ctx.sender,
      signer: ctx.signer,
      receiver: walletAddress,
      amount: microAlgo(walletFunding),
    })
    console.log(`Funded the DAO wallet with ${walletFunding} microAlgos`)
  }

  const { return: proposalId } = await ctx.dao.newProposal({ actions })
  if (proposalId === undefined) throw new Error('Failed to create the escrow proposal')

  if (submit) {
    await ctx.dao.submitProposal({ proposalId })
  }

  console.log('\n' + '='.repeat(72))
  console.log('DAO ACCOUNT ESCROW PROPOSAL CREATED')
  console.log('='.repeat(72))
  console.log(`  Proposal ID: ${proposalId}`)
  console.log(
    `  Status: ${daoState.state === DAO_STATE_FULLY_INITIALIZED ? (submit ? 'submitted for voting' : 'draft') : 'approved'}`,
  )
  for (const action of actions) {
    if (action.type === ProposalActionEnum.NewEscrow) {
      console.log(`  ${action.escrow}: ${action.address}`)
    }
  }
})

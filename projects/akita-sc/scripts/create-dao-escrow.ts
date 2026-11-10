#!/usr/bin/env node

/**
 * Create a named escrow on the Akita DAO wallet through a DAO proposal.
 *
 * With no --address, the wallet mints a new escrow application. Passing an
 * address registers an existing account that has been rekeyed to the wallet.
 *
 * Usage:
 *   npm run create:dao-escrow -- -n mainnet -m "$MNEMONIC" --escrow operations --submit
 *   npm run create:dao-escrow -- -n mainnet -m "$MNEMONIC" --escrow operations --proposal-id 169 --execute
 *   npm run create:dao-escrow -- -n testnet -m "$MNEMONIC" --escrow operations --execute
 */

import { microAlgo } from '@algorandfoundation/algokit-utils'
import { SDKClient } from 'akita-sdk'
import { ProposalAction, ProposalActionEnum } from 'akita-sdk/dao'
import algosdk, { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import { parseBaseArgs, runScript, setupContext } from './script-base'
import { executeProposal, getAppFundingNeeded } from './utils'

const PROPOSAL_STATUS_DRAFT = 0
const PROPOSAL_STATUS_VOTING = 20
const PROPOSAL_STATUS_REJECTED = 30
const PROPOSAL_STATUS_APPROVED = 40
const PROPOSAL_STATUS_EXECUTED = 50
const MAX_ESCROW_NAME_BYTES = 61

type ExtraArgs = {
  escrow?: string
  address: string
  submit: boolean
  execute: boolean
}

function parseExtraArgs(): ExtraArgs {
  const args = process.argv.slice(2)
  const result: ExtraArgs = {
    address: ALGORAND_ZERO_ADDRESS_STRING,
    submit: false,
    execute: false,
  }

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--escrow') {
      result.escrow = args[++i]
    } else if (args[i] === '--address') {
      result.address = args[++i]
    } else if (args[i] === '--submit') {
      result.submit = true
    } else if (args[i] === '--execute') {
      result.execute = true
    }
  }

  return result
}

function validateEscrowName(value: string | undefined): string {
  if (!value) throw new Error('--escrow is required')

  const byteLength = new TextEncoder().encode(value).length
  if (byteLength > MAX_ESCROW_NAME_BYTES) {
    throw new Error(`--escrow must be at most ${MAX_ESCROW_NAME_BYTES} UTF-8 bytes (got ${byteLength})`)
  }

  return value
}

function validateAddress(value: string): string {
  try {
    return algosdk.encodeAddress(algosdk.decodeAddress(value).publicKey)
  } catch {
    throw new Error('--address must be a valid Algorand address')
  }
}

function statusName(status: number): string {
  switch (status) {
    case PROPOSAL_STATUS_DRAFT:
      return 'draft'
    case PROPOSAL_STATUS_VOTING:
      return 'voting'
    case PROPOSAL_STATUS_REJECTED:
      return 'rejected'
    case PROPOSAL_STATUS_APPROVED:
      return 'approved'
    case PROPOSAL_STATUS_EXECUTED:
      return 'executed'
    default:
      return `unknown (${status})`
  }
}

runScript(async () => {
  const extra = parseExtraArgs()
  const options = parseBaseArgs(
    'create-dao-escrow.ts',
    `
Escrow options:
  --escrow <name>            Escrow name (required; maximum ${MAX_ESCROW_NAME_BYTES} UTF-8 bytes)
  --address <address>        Register an existing account rekeyed to the DAO wallet.
                             Omit to mint a new application escrow.
  --submit                   Submit a new or draft proposal for voting
  --execute                  Execute the proposal if it is approved

Proposal lifecycle examples:
  # Create and submit a mainnet proposal
  npm run create:dao-escrow -- -n mainnet -m "$MNEMONIC" --escrow operations --submit

  # Execute it after approval (the escrow and action are verified first)
  npm run create:dao-escrow -- -n mainnet -m "$MNEMONIC" --escrow operations --proposal-id 169 --execute

  # Pre-initialization/local environments may approve immediately
  npm run create:dao-escrow -- -n testnet -m "$MNEMONIC" --escrow operations --execute`,
  )
  const escrow = validateEscrowName(extra.escrow)
  const address = validateAddress(extra.address)
  const ctx = await setupContext(options)
  const daoApp = await ctx.algorand.app.getById(ctx.dao.appId)
  const effectiveSender = options.dryRun ? daoApp.creator.toString() : ctx.sender
  ctx.dao.setSendParams({ sender: effectiveSender, signer: ctx.signer })
  const wallet = await ctx.dao.getWallet()
  const walletAddress = wallet.client.appAddress.toString()
  const isManagedAppEscrow = address === ALGORAND_ZERO_ADDRESS_STRING

  console.log('DAO escrow creation')
  console.log(`  Network: ${options.network}`)
  console.log(`  DAO: ${ctx.dao.appId}`)
  console.log(`  DAO wallet: ${wallet.appId} (${walletAddress})`)
  console.log(`  Escrow: ${escrow}`)
  console.log(`  Type: ${isManagedAppEscrow ? 'new application escrow' : 'existing rekeyed account'}`)
  if (!isManagedAppEscrow) console.log(`  Address: ${address}`)

  const existing = await wallet.getEscrow(escrow)
  if (existing.address !== ALGORAND_ZERO_ADDRESS_STRING) {
    if (isManagedAppEscrow && existing.id === 0n) {
      throw new Error(`Escrow "${escrow}" already exists as a regular-account escrow at ${existing.address}`)
    }
    if (!isManagedAppEscrow && existing.id !== 0n) {
      throw new Error(`Escrow "${escrow}" already exists as application ${existing.id} at ${existing.address}`)
    }
    if (existing.address !== address && !isManagedAppEscrow) {
      throw new Error(`Escrow "${escrow}" already points to ${existing.address}, not ${address}`)
    }
    if (options.proposalId === undefined) {
      console.log(`\nNothing to do: escrow "${escrow}" already exists.`)
      console.log(`  App ID: ${existing.id}`)
      console.log(`  Address: ${existing.address}`)
      return
    }
  }

  if (!isManagedAppEscrow) {
    const account = await ctx.algorand.account.getInformation(address)
    const authAddress = account.authAddr?.toString() ?? address
    if (authAddress !== walletAddress) {
      const message = `Account ${address} authorizes ${authAddress}; it must authorize DAO wallet ${walletAddress}`
      if (extra.execute) throw new Error(message)
      console.warn(`\nWarning: ${message} before execution.`)
    } else {
      console.log('  Rekey: verified')
    }
  }

  const action: ProposalAction<SDKClient> = {
    type: ProposalActionEnum.NewEscrow,
    escrow,
    address,
  }
  const mbr = await wallet.getMbr({ escrow, methodCount: 0n, plugin: '', groups: 0n })
  const requiredWalletMbr = isManagedAppEscrow ? mbr.newEscrowMintCost : mbr.escrows
  const walletFunding =
    existing.address === ALGORAND_ZERO_ADDRESS_STRING
      ? await getAppFundingNeeded(ctx.algorand, walletAddress, requiredWalletMbr, 0n)
      : 0n

  console.log(`  Wallet MBR: ${requiredWalletMbr} microAlgos`)
  console.log(`  Wallet funding shortfall: ${walletFunding} microAlgos`)

  let proposalId = options.proposalId
  let proposalStatus: number

  if (proposalId !== undefined) {
    const proposal = await ctx.dao.getProposal(proposalId)
    if (proposal.actions.length !== 1) {
      throw new Error(`Proposal ${proposalId} has ${proposal.actions.length} actions; expected exactly one`)
    }

    const proposalAction = proposal.actions[0]
    if (proposalAction.type !== ProposalActionEnum.NewEscrow) {
      throw new Error(`Proposal ${proposalId} is not a NewEscrow proposal`)
    }

    const proposalAddress = proposalAction.address?.toString() ?? ALGORAND_ZERO_ADDRESS_STRING
    if (proposalAction.escrow !== escrow || proposalAddress !== address) {
      throw new Error(
        `Proposal ${proposalId} creates ${proposalAction.escrow} -> ${proposalAddress}; ` +
          `expected ${escrow} -> ${address}`,
      )
    }

    proposalStatus = proposal.status
    console.log(`  Existing proposal: ${proposalId} (${statusName(proposalStatus)})`)
  } else {
    const proposalCost = await ctx.dao.proposalCost({
      sender: effectiveSender,
      signer: ctx.signer,
      actions: [action],
    })
    console.log(`  Proposal cost: total=${proposalCost.total}, fee=${proposalCost.fee}, mbr=${proposalCost.mbr}`)

    if (options.dryRun) {
      console.log(
        `\nDRY RUN - would${walletFunding > 0n ? ' fund the DAO wallet and' : ''} create the NewEscrow proposal` +
          `${extra.submit ? ', submit it' : ''}${extra.execute ? ', and execute it if immediately approved' : ''}.`,
      )
      return
    }

    if (walletFunding > 0n) {
      await ctx.algorand.send.payment({
        sender: ctx.sender,
        signer: ctx.signer,
        receiver: walletAddress,
        amount: microAlgo(walletFunding),
      })
      console.log(`\nFunded the DAO wallet with ${walletFunding} microAlgos`)
    }

    const result = await ctx.dao.newProposal({ actions: [action] })
    if (result.return === undefined) throw new Error('Failed to create the escrow proposal')
    proposalId = result.return
    proposalStatus = (await ctx.dao.getProposal(proposalId)).status
    console.log(`Created proposal ${proposalId} (${statusName(proposalStatus)})`)
  }

  if (options.dryRun) {
    console.log(`\nDRY RUN - proposal ${proposalId} passed payload verification; no transactions were submitted.`)
    return
  }

  if (extra.submit && proposalStatus === PROPOSAL_STATUS_DRAFT) {
    await ctx.dao.submitProposal({ proposalId })
    proposalStatus = (await ctx.dao.getProposal(proposalId)).status
    console.log(`Submitted proposal ${proposalId} (${statusName(proposalStatus)})`)
  }

  if (extra.execute && proposalStatus === PROPOSAL_STATUS_APPROVED) {
    if (walletFunding > 0n && options.proposalId !== undefined) {
      await ctx.algorand.send.payment({
        sender: ctx.sender,
        signer: ctx.signer,
        receiver: walletAddress,
        amount: microAlgo(walletFunding),
      })
      console.log(`Funded the DAO wallet with ${walletFunding} microAlgos`)
    }

    await executeProposal(ctx.dao, proposalId)
    proposalStatus = (await ctx.dao.getProposal(proposalId)).status
    console.log(`Executed proposal ${proposalId} (${statusName(proposalStatus)})`)
  }

  if (proposalStatus === PROPOSAL_STATUS_EXECUTED) {
    const created = await wallet.getEscrow(escrow)
    if (created.address === ALGORAND_ZERO_ADDRESS_STRING) {
      throw new Error(`Proposal ${proposalId} is executed, but escrow "${escrow}" was not found`)
    }
    if (!isManagedAppEscrow && (created.id !== 0n || created.address !== address)) {
      throw new Error(
        `Escrow verification failed: id=${created.id}, address=${created.address}; expected id=0, address=${address}`,
      )
    }
    if (isManagedAppEscrow && created.id === 0n) {
      throw new Error(`Escrow verification failed: expected an application escrow, got ${created.address}`)
    }

    console.log('\n' + '='.repeat(72))
    console.log('DAO ESCROW CREATED')
    console.log('='.repeat(72))
    console.log(`  Proposal ID: ${proposalId}`)
    console.log(`  Escrow: ${escrow}`)
    console.log(`  App ID: ${created.id}`)
    console.log(`  Address: ${created.address}`)
    return
  }

  console.log('\n' + '='.repeat(72))
  console.log('DAO ESCROW PROPOSAL READY')
  console.log('='.repeat(72))
  console.log(`  Proposal ID: ${proposalId}`)
  console.log(`  Status: ${statusName(proposalStatus)}`)
  if (proposalStatus === PROPOSAL_STATUS_DRAFT) {
    console.log('  Next: rerun with --proposal-id, the same --escrow, and --submit')
  } else if (proposalStatus === PROPOSAL_STATUS_VOTING) {
    console.log('  Next: after approval, rerun with --proposal-id, the same --escrow, and --execute')
  } else if (proposalStatus === PROPOSAL_STATUS_APPROVED) {
    console.log('  Next: rerun with --proposal-id, the same --escrow, and --execute')
  } else if (proposalStatus === PROPOSAL_STATUS_REJECTED) {
    console.log('  The proposal was rejected; no escrow was created.')
  }
})

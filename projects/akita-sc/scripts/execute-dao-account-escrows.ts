#!/usr/bin/env node

/**
 * Execute the approved proposal that registers the existing AKTA creator and
 * collections accounts as regular-account escrows on the DAO smart wallet.
 *
 * Usage:
 *   npm run execute:dao-account-escrows -- --dry-run
 *   npm run execute:dao-account-escrows -- -m "$MNEMONIC" --confirm-execute
 */

import { ProposalActionEnum } from 'akita-sdk/dao'
import algosdk, { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import { parseBaseArgs, runScript, setupContext } from './script-base'
import { executeProposal } from './utils'

const EXPECTED_ESCROWS = [
  {
    name: 'akta_creator',
    address: 'QUUQHH4HJ3FHUWMKTKFBUA72XTSW6F7YLLTRI7FWENJBKQYWTESSCZPQLU',
  },
  {
    name: 'collections',
    address: 'AKCTRDK4OWNWHTPH4XPKLNWNLZ333VE35SKQ4FGQK3ZJA4FIHCLTRG3PFI',
  },
] as const

const DEFAULT_PROPOSAL_ID = 168n
const PROPOSAL_STATUS_APPROVED = 40
const PROPOSAL_STATUS_EXECUTED = 50

function decodeNewEscrow(data: Uint8Array): { name: string; address: string } {
  const bytes = Buffer.from(data)

  if (bytes.length < 36) throw new Error(`Invalid NewEscrow action: expected at least 36 bytes, got ${bytes.length}`)
  if (bytes.readUInt16BE(0) !== 34) {
    throw new Error(`Invalid NewEscrow action: string offset is ${bytes.readUInt16BE(0)}, expected 34`)
  }

  const nameLength = bytes.readUInt16BE(34)
  if (bytes.length !== 36 + nameLength) {
    throw new Error(`Invalid NewEscrow action: encoded name length is ${nameLength}, total bytes are ${bytes.length}`)
  }

  return {
    name: bytes.subarray(36).toString('utf8'),
    address: algosdk.encodeAddress(bytes.subarray(2, 34)),
  }
}

runScript(async () => {
  const options = parseBaseArgs(
    'execute-dao-account-escrows.ts',
    `
This script is mainnet-only and executes the approved regular-account escrow proposal.
It defaults to proposal 168 and verifies its complete action payload before submitting.

Additional options:
  --proposal-id <id>         Proposal to verify and execute. Default: 168
  --confirm-execute          Required for live execution`,
  )

  if (options.network !== 'mainnet') {
    throw new Error('This script is mainnet-only. Run it through the execute:dao-account-escrows npm command.')
  }

  const proposalId = options.proposalId ?? DEFAULT_PROPOSAL_ID
  const confirmed = process.argv.slice(2).includes('--confirm-execute')
  const ctx = await setupContext(options, { minBalance: 100_000n })
  const daoApp = await ctx.algorand.app.getById(ctx.dao.appId)
  const effectiveSender = options.dryRun ? daoApp.creator.toString() : ctx.sender

  ctx.dao.setSendParams({ sender: effectiveSender, signer: ctx.signer })
  const wallet = await ctx.dao.getWallet()
  const walletAddress = wallet.client.appAddress.toString()
  const proposal = await ctx.dao.client.getProposal({
    sender: effectiveSender,
    signer: ctx.signer as any,
    args: { proposalId },
  })

  if (!proposal) throw new Error(`Proposal ${proposalId} does not exist`)
  if (proposal.actions.length !== EXPECTED_ESCROWS.length) {
    throw new Error(
      `Proposal ${proposalId} has ${proposal.actions.length} actions; expected exactly ${EXPECTED_ESCROWS.length}`,
    )
  }

  const decodedActions = proposal.actions.map(([type, data], index) => {
    if (type !== ProposalActionEnum.NewEscrow) {
      throw new Error(
        `Proposal ${proposalId} action ${index} has type ${type}; expected NewEscrow (${ProposalActionEnum.NewEscrow})`,
      )
    }
    return decodeNewEscrow(data)
  })

  for (let i = 0; i < EXPECTED_ESCROWS.length; i++) {
    const expected = EXPECTED_ESCROWS[i]
    const actual = decodedActions[i]
    if (actual.name !== expected.name || actual.address !== expected.address) {
      throw new Error(
        `Proposal ${proposalId} action ${i} is ${actual.name} -> ${actual.address}; ` +
          `expected ${expected.name} -> ${expected.address}`,
      )
    }
  }

  console.log('DAO regular-account escrow execution')
  console.log(`  DAO: ${ctx.dao.appId}`)
  console.log(`  DAO wallet: ${wallet.appId} (${walletAddress})`)
  console.log(`  Proposal: ${proposalId}`)
  console.log(`  Status: ${proposal.status}\n`)

  for (const expected of EXPECTED_ESCROWS) {
    const [account, existing] = await Promise.all([
      ctx.algorand.account.getInformation(expected.address),
      wallet.getEscrow(expected.name),
    ])
    const authAddress = account.authAddr?.toString() ?? expected.address

    if (authAddress !== walletAddress) {
      throw new Error(`${expected.name} authorizes ${authAddress}; expected DAO wallet ${walletAddress}`)
    }

    if (proposal.status === PROPOSAL_STATUS_EXECUTED) {
      if (existing.id !== 0n || existing.address !== expected.address) {
        throw new Error(
          `Proposal is executed, but escrow "${expected.name}" is id=${existing.id}, address=${existing.address}; ` +
            `expected regular account ${expected.address}`,
        )
      }
      console.log(`${expected.name}: registered and authorized by the DAO wallet`)
    } else {
      if (existing.address !== ALGORAND_ZERO_ADDRESS_STRING) {
        throw new Error(`Escrow "${expected.name}" is already registered to ${existing.address}`)
      }
      console.log(`${expected.name}: rekey verified; ready to register ${expected.address}`)
    }
  }

  if (proposal.status === PROPOSAL_STATUS_EXECUTED) {
    console.log(
      `\nNothing to do: proposal ${proposalId} is already executed and both escrows are registered correctly.`,
    )
    return
  }
  if (proposal.status !== PROPOSAL_STATUS_APPROVED) {
    throw new Error(
      `Proposal ${proposalId} has status ${proposal.status}; expected Approved (${PROPOSAL_STATUS_APPROVED})`,
    )
  }

  if (options.dryRun) {
    console.log('\nDRY RUN - all checks passed; proposal is ready to execute.')
    return
  }
  if (!confirmed) {
    throw new Error('Pass --confirm-execute to execute the live proposal after reviewing --dry-run output')
  }

  await executeProposal(ctx.dao, proposalId)

  const executedProposal = await ctx.dao.client.getProposal({
    sender: ctx.sender,
    signer: ctx.signer as any,
    args: { proposalId },
  })
  if (!executedProposal || executedProposal.status !== PROPOSAL_STATUS_EXECUTED) {
    throw new Error(`Execution confirmed, but proposal status is ${executedProposal?.status ?? 'missing'}; expected 50`)
  }

  for (const expected of EXPECTED_ESCROWS) {
    const registered = await wallet.getEscrow(expected.name)
    if (registered.id !== 0n || registered.address !== expected.address) {
      throw new Error(
        `Execution confirmed, but escrow "${expected.name}" is id=${registered.id}, address=${registered.address}`,
      )
    }
  }

  console.log('\n' + '='.repeat(72))
  console.log('DAO ACCOUNT ESCROW PROPOSAL EXECUTED')
  console.log('='.repeat(72))
  console.log(`  Proposal ID: ${proposalId}`)
  console.log(`  Status: executed (${PROPOSAL_STATUS_EXECUTED})`)
  for (const expected of EXPECTED_ESCROWS) console.log(`  ${expected.name}: ${expected.address}`)
})

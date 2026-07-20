#!/usr/bin/env node

/**
 * Temporarily update the wallet creation fee through a DAO UpdateFields proposal.
 *
 * The default is 1,000,000 ALGO, expressed as microAlgos in contract state.
 */

import { SDKClient } from 'akita-sdk'
import { ProposalAction, ProposalActionEnum } from 'akita-sdk/dao'
import { parseBaseArgs, setupContext, runScript } from './script-base'
import { proposeAndExecute } from './utils'

const DEFAULT_CREATE_FEE = 1_000_000_000_000n

function argValue(name: string): string | undefined {
  const args = process.argv.slice(2)
  const index = args.indexOf(name)
  return index >= 0 ? args[index + 1] : undefined
}

function parseInteger(value: string, label: string): bigint {
  const normalized = value.replaceAll('_', '').replaceAll(',', '')
  if (!/^\d+$/.test(normalized)) {
    throw new Error(`${label} must be a non-negative integer`)
  }
  return BigInt(normalized)
}

function parseCost(): bigint {
  const microAlgoCost = argValue('--cost') ?? argValue('--microalgos')
  if (microAlgoCost !== undefined) {
    return parseInteger(microAlgoCost, '--cost')
  }

  const algoCost = argValue('--cost-algo') ?? argValue('--algos')
  if (algoCost !== undefined) {
    return parseInteger(algoCost, '--cost-algo') * 1_000_000n
  }

  return DEFAULT_CREATE_FEE
}

runScript(async () => {
  const options = parseBaseArgs('update-wallet-creation-cost.ts', `
Wallet fee options:
  --cost <microAlgos>         New wallet creation fee in microAlgos. Default: 1000000000000
  --cost-algo <algos>         New wallet creation fee in whole Algos

Examples:
  npm run update:wallet-creation-cost -- -n testnet -m "$MNEMONIC"
  npm run update:wallet-creation-cost -- -n testnet -m "$MNEMONIC" --cost-algo 1000000
  npm run update:wallet-creation-cost -- -n testnet -m "$MNEMONIC" --cost 1000000000000
`)
  const createFee = parseCost()

  console.log(`\nStarting wallet creation cost update on ${options.network}...\n`)
  const ctx = await setupContext(options)
  const currentFees = await ctx.dao.client.state.global.walletFees()
  const referrerPercentage = currentFees?.referrerPercentage ?? 0n

  console.log(`Current create fee: ${currentFees?.createFee ?? 0n} microAlgos`)
  console.log(`New create fee:     ${createFee} microAlgos`)
  console.log(`Referrer percent:   ${referrerPercentage}\n`)

  const action: ProposalAction<SDKClient> = {
    type: ProposalActionEnum.UpdateFields,
    field: 'wallet_fees',
    value: {
      createFee,
      referrerPercentage,
    },
  }

  if (options.dryRun) {
    console.log('DRY RUN - Would create and execute wallet_fees UpdateFields proposal')
    return
  }

  const proposalId = await proposeAndExecute(ctx.algorand, ctx.dao, [action])
  const updatedFees = await ctx.dao.client.state.global.walletFees()

  console.log(`Proposal ${proposalId} created and executed`)
  console.log(`Updated create fee: ${updatedFees?.createFee ?? 0n} microAlgos\n`)
})

#!/usr/bin/env node

/**
 * Update the wallet creation fee through a DAO UpdateFields proposal.
 *
 * The fee must be given with --cost (microAlgos) or --cost-algo (whole Algos). There is no default:
 * a run without one stops before it touches the network (readiness audit 2026-11-09, C12).
 */

import { SDKClient } from 'akita-sdk'
import { ProposalAction, ProposalActionEnum } from 'akita-sdk/dao'
import { parseBaseArgs, setupContext, runScript } from './script-base'
import { proposeAndExecute } from './utils'
import { parseCreateFee } from './lib/wallet-creation-cost'

runScript(async () => {
  const options = parseBaseArgs('update-wallet-creation-cost.ts', `
Wallet fee options (one is required, there is no default):
  --cost <microAlgos>         New wallet creation fee in microAlgos
  --cost-algo <algos>         New wallet creation fee in whole Algos

Examples:
  npm run update:wallet-creation-cost -- -n testnet -m "$MNEMONIC" --cost-algo 10
  npm run update:wallet-creation-cost -- -n testnet -m "$MNEMONIC" --cost 10000000
`)
  const createFee = parseCreateFee(process.argv.slice(2))

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

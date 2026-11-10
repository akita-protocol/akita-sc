#!/usr/bin/env node

import { SDKClient } from 'akita-sdk'
import { ProposalAction, ProposalActionEnum } from 'akita-sdk/dao'
import { parseBaseArgs, runScript, setupContext } from './script-base'
import { proposeAndExecute } from './utils'

function argValue(name: string): string | undefined {
  const index = process.argv.indexOf(name)
  return index === -1 ? undefined : process.argv[index + 1]
}

function parseFee(): bigint {
  const raw = (argValue('--cost') ?? '0').replaceAll('_', '').replaceAll(',', '')
  if (!/^\d+$/.test(raw)) throw new Error('--cost must be a non-negative integer in microAlgos')
  return BigInt(raw)
}

runScript(async () => {
  const options = parseBaseArgs(
    'update-guild-creation-cost.ts',
    `
Guild fee options:
  --cost <microAlgos>         Guild creation fee. Default: 0

This is also the required migration that creates guild_fees after upgrading an
existing DAO to the Guild-compatible contract.`,
  )
  const createFee = parseFee()
  const ctx = await setupContext(options)
  const current = await ctx.dao.client.state.global.guildFees()
  console.log(`Current guild creation fee: ${current?.createFee ?? 'unset'} microAlgos`)
  console.log(`New guild creation fee:     ${createFee} microAlgos`)

  const action: ProposalAction<SDKClient> = {
    type: ProposalActionEnum.UpdateFields,
    field: 'guild_fees',
    value: { createFee },
  }
  if (options.dryRun) {
    console.log('DRY RUN - Would create and execute the guild_fees migration proposal')
    return
  }

  const proposalId = await proposeAndExecute(ctx.algorand, ctx.dao, [action])
  const updated = await ctx.dao.client.state.global.guildFees()
  if (updated?.createFee !== createFee) throw new Error('guild_fees verification failed')
  console.log(`Proposal ${proposalId} executed; guild_fees is initialized and verified`)
})

#!/usr/bin/env node
/**
 * Set the DAO's `inference_fees` (runbook, "the inference network, after the rollout", step 5) through
 * one UpdateFields proposal, then read the field back.
 *
 *   --charge-percentage  the DAO's share of an inference charge, in hundredths of a percent (500 = 5%)
 *   --provider-bond      the AKTA a provider bonds to join, in base units (6 decimals)
 *
 * A value left out keeps what the DAO stores (0 while the field is absent).
 *
 * Usage (from projects/akita-sc):
 *   npm run update:inference-fees -- -n testnet --charge-percentage 500 --provider-bond 1679147151726
 *   (the same with --confirm to send)
 */
import type { SDKClient } from 'akita-sdk'
import { ProposalActionEnum, type ProposalAction } from 'akita-sdk/dao'
import { parseBaseArgs, runScript, setupContext } from './script-base'
import { proposeAndExecute } from './utils'

runScript(async () => {
  const args = process.argv.slice(2)
  const whole = (flag: string): bigint | undefined => {
    const at = args.indexOf(flag)
    if (at < 0) return undefined
    const raw = (args[at + 1] ?? '').replaceAll('_', '').replaceAll(',', '')
    if (!/^\d+$/.test(raw)) throw new Error(`${flag} takes a whole number`)
    return BigInt(raw)
  }
  const options = parseBaseArgs('update-inference-fees.ts', `
  --charge-percentage <n>  The DAO's share of a charge, in hundredths of a percent (500 = 5%)
  --provider-bond <n>      The provider bond, in AKTA base units
  --confirm                Create and execute the proposal (plans only without it)`)
  const chargePercentage = whole('--charge-percentage')
  const providerBond = whole('--provider-bond')
  if (chargePercentage === undefined && providerBond === undefined) throw new Error('Name --charge-percentage, --provider-bond or both')
  if (chargePercentage !== undefined && chargePercentage > 10_000n) throw new Error('--charge-percentage is at most 10000 (100%)')

  const ctx = await setupContext(options)
  const before = await ctx.dao.client.state.global.inferenceFees()
  const current = { chargePercentage: BigInt(before?.chargePercentage ?? 0n), providerBond: BigInt(before?.providerBond ?? 0n) }
  const wanted = { chargePercentage: chargePercentage ?? current.chargePercentage, providerBond: providerBond ?? current.providerBond }
  console.log(`inference_fees on ${options.network} (DAO ${ctx.dao.appId})${before ? '' : ' (field absent)'}:
  chargePercentage ${current.chargePercentage} -> ${wanted.chargePercentage}
  providerBond ${current.providerBond} -> ${wanted.providerBond} (${Number(wanted.providerBond) / 1e6} AKTA)`)
  if (before && current.chargePercentage === wanted.chargePercentage && current.providerBond === wanted.providerBond) {
    return console.log('Nothing to change.')
  }
  if (options.dryRun || !args.includes('--confirm')) return console.log('PLAN ONLY: nothing was sent. Pass --confirm to create and execute the proposal.')

  const action = { type: ProposalActionEnum.UpdateFields, field: 'inference_fees', value: wanted } as ProposalAction<SDKClient>
  const proposalId = await proposeAndExecute(ctx.algorand, ctx.dao, [action])
  const after = await ctx.dao.client.state.global.inferenceFees()
  if (!after || BigInt(after.chargePercentage) !== wanted.chargePercentage || BigInt(after.providerBond) !== wanted.providerBond) {
    throw new Error(`Proposal ${proposalId} executed, but inference_fees reads back as ${JSON.stringify(after, (_, v) => typeof v === 'bigint' ? v.toString() : v)}`)
  }
  console.log(`Proposal ${proposalId} executed. inference_fees reads back as chargePercentage ${after.chargePercentage}, providerBond ${after.providerBond}.`)
})

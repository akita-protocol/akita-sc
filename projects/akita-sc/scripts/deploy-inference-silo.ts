#!/usr/bin/env node

/**
 * Mint the inference PaySilo from the DAO wallet. Members install this silo on an `inference` escrow
 * so Akita's billing key can collect pay-as-you-go inference charges in arrears; the silo can only
 * pay its fixed recipient, Akita's inference revenue account (see akita-backend
 * docs/inference-billing.md). See `scripts/lib/inference-silo.ts` for the proposals and refusals.
 *
 * The silo is not recorded in networks.ts: the backend serves its id to apps from
 * GET /agents/inference-billing/:network.
 *
 * Usage (from projects/akita-sc):
 *   npm run deploy:inference-silo -- -n mainnet --recipient <addr> --dry-run --sender "$CREATOR"
 *   npm run deploy:inference-silo -- -n mainnet --recipient <addr> [--keep-grant] [--another]
 * The key comes from DEPLOYER_MNEMONIC (runbook step A0). Runbook step H9.
 */
import dotenv from 'dotenv'
import { parseBaseArgs, runScript, setupContext } from './script-base'
import {
  addFactoryGrantCost,
  describeInferenceSiloPlan,
  planInferenceSilo,
  runInferenceSilo,
} from './lib/inference-silo'

runScript(async () => {
  const args = process.argv.slice(2)
  const value = (key: string) => { const i = args.indexOf(key); return i < 0 ? undefined : args[i + 1] }
  if (!args.includes('--network') && !args.includes('-n')) throw new Error('An explicit --network is required')
  dotenv.config({ path: `.env.${value('--network') ?? value('-n')}` })
  const options = parseBaseArgs('deploy-inference-silo.ts', `
Additional options:
  --recipient <address>      Account the silo pays: Akita's inference revenue account (required)
  --factory-plugin <id>      PaySiloFactoryPlugin app id (default: the SDK's paySiloFactoryPlugin for the network)
  --keep-grant               Keep the narrow factory grant on the DAO wallet afterwards
  --another                  Mint even if the DAO wallet already created a release PaySilo for this recipient`)
  const recipient = value('--recipient')
  if (!recipient) throw new Error('--recipient <address> is required')
  const keepGrant = args.includes('--keep-grant')
  const another = args.includes('--another')

  const ctx = await setupContext(options, { minBalance: 3_000_000n })
  const factoryPluginId = BigInt(value('--factory-plugin') ?? ctx.appIds.paySiloFactoryPlugin ?? 0n)
  if (factoryPluginId <= 0n) throw new Error('--factory-plugin is required (no paySiloFactoryPlugin id configured for this network)')

  if (options.dryRun) {
    const daoCreator = (await ctx.algorand.app.getById(ctx.dao.appId)).creator.toString()
    const sender = options.sender ?? daoCreator
    ctx.dao.setSendParams({ sender, signer: ctx.signer })
    const plan = await planInferenceSilo(ctx, { recipient, factoryPluginId, keepGrant, another, effectiveSender: sender })
    console.log(`Inference silo plan on ${options.network}`)
    for (const line of describeInferenceSiloPlan(plan)) console.log(`  ${line}`)
    if (plan.addGrant) {
      const cost = await addFactoryGrantCost(ctx, plan, sender)
      console.log(`  AddPlugin proposal cost: total=${cost.total}, mbr=${cost.mbr}`)
    }
    console.log('\nDRY RUN: no state was changed.')
    return
  }

  console.log(`Minting the inference silo from the DAO wallet on ${options.network}`)
  const result = await runInferenceSilo(ctx, { recipient, factoryPluginId, keepGrant, another })

  console.log(`
${'='.repeat(80)}
INFERENCE SILO MINTED
${'='.repeat(80)}
  Network:          ${options.network}
  Silo app ID:      ${result.siloAppId}
  Recipient:        ${result.recipient}
  Approval sha256:  ${result.siloApprovalSha256}
  Proposals:        ${result.proposalIds.join(', ')}

Next steps:
  1. Opt the recipient in to the billing asset (USDC) if it isn't already.
  2. Add this entry to the backend's AKITA_INFERENCE_BILLING for ${options.network}:
     "siloAppId": ${result.siloAppId},
     "siloApprovalSha256": "${result.siloApprovalSha256}",
     "recipient": "${result.recipient}"
`)
})

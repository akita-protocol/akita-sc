#!/usr/bin/env node

/**
 * Deploy Social Impact Contract Script
 *
 * One-time deploy needed because the original AkitaSocialImpact extended
 * AkitaBaseContract (not upgradeable). The new version extends
 * UpgradeableAkitaBaseContract, so future updates can be done in-place
 * via update:social --contracts socialImpact.
 *
 * This script:
 *   1. Deploys a new AkitaSocialImpact contract
 *   2. Updates the DAO's Social App List (sal) to point to the new contract
 *
 * After this, all other contracts that reference socialImpact via
 * getAkitaSocialAppList(akitaDAO).impact will automatically use the new one.
 *
 * Usage:
 *   npm run deploy:social-impact -- -n testnet -m "your mnemonic" -v "0.0.2"
 */

import { parseBaseArgs, setupContext, runScript } from './script-base'
import { proposeAndExecute } from './utils'
import { ProposalActionEnum } from 'akita-sdk/dao'
import { AkitaSocialImpactFactory } from '../smart_contracts/artifacts/social/AkitaSocialImpactClient'

runScript(async () => {
  const options = parseBaseArgs('deploy-social-impact.ts')
  console.log(`\nStarting AkitaSocialImpact deployment on ${options.network}...\n`)

  const ctx = await setupContext(options, { minBalance: 10_000_000n })

  if (options.dryRun) {
    console.log('DRY RUN - Steps that would be performed:\n')
    console.log(`   1. Deploy new AkitaSocialImpact contract (version: ${options.version})`)
    console.log(`   2. Update DAO SAL (social app list) to point impact → new app ID`)
    console.log(`   Old socialImpact: ${ctx.appIds.socialImpact}\n`)
    return
  }

  // Step 1: Deploy new SocialImpact
  console.log('Step 1: Deploying new AkitaSocialImpact...')
  const factory = ctx.algorand.client.getTypedAppFactory(AkitaSocialImpactFactory, {
    defaultSender: ctx.sender,
    defaultSigner: ctx.signer,
  })

  const { appClient: client } = await factory.send.create.create({
    args: {
      version: options.version,
      akitaDao: ctx.appIds.dao,
    },
  })
  console.log(`   New AkitaSocialImpact: ${client.appId}`)
  console.log(`   Old AkitaSocialImpact: ${ctx.appIds.socialImpact}\n`)

  // Step 2: Update DAO's SAL
  console.log('Step 2: Updating DAO Social App List (sal)...')
  const proposalId = await proposeAndExecute(ctx.algorand, ctx.dao, [
    {
      type: ProposalActionEnum.UpdateFields,
      field: 'sal',
      value: { impact: client.appId },
    },
  ])
  console.log(`   SAL updated (Proposal ${proposalId})\n`)

  console.log('='.repeat(80))
  console.log('SOCIAL IMPACT DEPLOYMENT COMPLETE!')
  console.log('='.repeat(80))
  console.log(`
Summary:
  Network: ${options.network}
  Old App ID: ${ctx.appIds.socialImpact}
  New App ID: ${client.appId}
  Version: ${options.version}
  SAL Update Proposal: ${proposalId}

  All contracts that reference socialImpact via the DAO's SAL will
  automatically use the new contract.

  Future updates can use: npm run update:social -- --contracts socialImpact

IMPORTANT: Update the SDK networks.ts file:
  socialImpact: ${client.appId}n,
`)
})

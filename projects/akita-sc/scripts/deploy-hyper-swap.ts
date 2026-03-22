#!/usr/bin/env node

/**
 * Deploy HyperSwap Contract Script
 *
 * HyperSwap extends AkitaBaseContract (not UpgradeableAkitaBaseContract),
 * so it CANNOT be updated in place. This script deploys a fresh instance.
 *
 * After deployment, the DAO's hyperSwap app ID must be updated via a
 * DAO proposal (UpdateFields).
 *
 * Usage:
 *   ts-node scripts/deploy-hyper-swap.ts --network testnet --mnemonic "your mnemonic" --version "1.0.1"
 */

import { parseBaseArgs, setupContext, runScript } from './script-base'
import { HyperSwapFactory } from '../smart_contracts/artifacts/hyper-swap/HyperSwapClient'

runScript(async () => {
  const options = parseBaseArgs('deploy-hyper-swap.ts')
  console.log(`\nStarting HyperSwap deployment on ${options.network}...\n`)

  const ctx = await setupContext(options, { minBalance: 10_000_000n })

  if (options.dryRun && !options.mnemonic && options.network !== 'localnet') {
    console.log('DRY RUN - Would deploy new HyperSwap contract\n')
    return
  }

  const factory = ctx.algorand.client.getTypedAppFactory(HyperSwapFactory, {
    defaultSender: ctx.sender,
    defaultSigner: ctx.signer,
  })

  console.log('Deploying new HyperSwap...')
  const { appClient: client } = await factory.send.create.create({
    args: {
      version: options.version,
      akitaDao: ctx.appIds.dao,
    },
  })

  console.log(`   New HyperSwap: ${client.appId}`)
  console.log(`   Old HyperSwap: ${ctx.appIds.hyperSwap}\n`)

  console.log('='.repeat(80))
  console.log('HYPERSWAP DEPLOYMENT COMPLETE!')
  console.log('='.repeat(80))
  console.log(`
Summary:
  Network: ${options.network}
  Old App ID: ${ctx.appIds.hyperSwap}
  New App ID: ${client.appId}
  Version: ${options.version}

IMPORTANT: Update the SDK networks.ts file with the new app ID:
  hyperSwap: ${client.appId}n,

The DAO's hyperSwap configuration may also need updating via a DAO proposal.
`)
})

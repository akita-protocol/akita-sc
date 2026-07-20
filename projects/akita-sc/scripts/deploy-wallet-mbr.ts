#!/usr/bin/env node

/** Deploy a fresh immutable AbstractedAccountMBR application. */

import { AbstractedAccountMbrFactory } from '../smart_contracts/artifacts/arc58/account/AbstractedAccountMBRClient'
import { parseBaseArgs, runScript, setupContext } from './script-base'

runScript(async () => {
  const options = parseBaseArgs('deploy-wallet-mbr.ts')
  console.log(`\nStarting AbstractedAccountMBR deployment on ${options.network}...\n`)

  const ctx = await setupContext(options, { minBalance: 2_000_000n })

  if (options.dryRun) {
    console.log('DRY RUN - Would deploy a fresh immutable AbstractedAccountMBR application\n')
    return
  }

  const factory = ctx.algorand.client.getTypedAppFactory(AbstractedAccountMbrFactory, {
    defaultSender: ctx.sender,
    defaultSigner: ctx.signer,
  })
  const { appClient } = await factory.send.create.bare()

  console.log('='.repeat(80))
  console.log('ABSTRACTED ACCOUNT MBR DEPLOYMENT COMPLETE!')
  console.log('='.repeat(80))
  console.log(`
Network: ${options.network}
New MBR App ID: ${appClient.appId}
Application address: ${appClient.appAddress}
`)
})

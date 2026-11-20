#!/usr/bin/env node

/**
 * Deploy Inference Silo Script
 *
 * Creates the PaySiloPlugin instance members install to pay for Akita-hosted
 * agent inference from an ARC-58 sub-account. The silo pays only its fixed
 * recipient, Akita's inference revenue account. The backend's billing key is
 * the install's caller, and collects charges in arrears up to the allowance
 * the member sets on the escrow (see akita-backend docs/inference-billing.md).
 *
 * This is a separate PaySilo instance from the `paySiloPlugin` in networks.ts,
 * so it is not recorded there: the backend serves its id to apps from
 * GET /agents/inference-billing/:network.
 *
 * Usage:
 *   npm run deploy:inference-silo -- -n localnet --recipient <address>
 *   npm run deploy:inference-silo -- -n testnet -m "your mnemonic" --recipient <address>
 */

import { createHash } from 'node:crypto'
import algosdk from 'algosdk'
import { parseBaseArgs, setupContext, runScript } from './script-base'
import { PaySiloPluginFactory } from '../smart_contracts/artifacts/arc58/plugins/pay-silo/PaySiloPluginClient'

function recipientArg(): string {
  const args = process.argv.slice(2)
  const index = args.indexOf('--recipient')
  const recipient = index >= 0 ? args[index + 1] : undefined
  if (!recipient || !algosdk.isValidAddress(recipient)) {
    console.error('Error: --recipient <address> is required (Akita inference revenue account)')
    process.exit(1)
  }
  return recipient
}

runScript(async () => {
  const options = parseBaseArgs(
    'deploy-inference-silo.ts',
    '  --recipient <address>       Account the silo pays (Akita inference revenue). Required.\n',
  )
  const recipient = recipientArg()
  console.log(`\nStarting inference silo deployment on ${options.network}...\n`)

  const ctx = await setupContext(options, { minBalance: 5_000_000n })

  const factory = ctx.algorand.client.getTypedAppFactory(PaySiloPluginFactory, {
    defaultSender: ctx.sender,
    defaultSigner: ctx.signer,
  })
  const compiled = await factory.appFactory.compile()
  const approvalSha256 = createHash('sha256').update(compiled.approvalProgram).digest('hex')

  if (options.dryRun) {
    console.log(`DRY RUN - would create a PaySiloPlugin paying ${recipient}`)
    console.log(`   approval sha256: ${approvalSha256}\n`)
    return
  }

  const { appClient } = await factory.send.create.create({ args: { recipient } })
  const stored = await appClient.state.global.recipient()
  if (stored !== recipient) {
    throw new Error(`silo ${appClient.appId} stored recipient ${stored}, expected ${recipient}`)
  }

  console.log('='.repeat(80))
  console.log('INFERENCE SILO DEPLOYMENT COMPLETE')
  console.log('='.repeat(80))
  console.log(`
  Network:          ${options.network}
  Silo app ID:      ${appClient.appId}
  Recipient:        ${recipient}
  Approval sha256:  ${approvalSha256}

Next steps:
  1. Opt the recipient in to the billing asset (USDC) if it isn't already.
  2. Add this entry to the backend's AKITA_INFERENCE_BILLING for ${options.network}:
     "siloAppId": ${appClient.appId},
     "siloApprovalSha256": "${approvalSha256}",
     "recipient": "${recipient}"
`)
})

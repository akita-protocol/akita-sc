#!/usr/bin/env node

/**
 * Deploy a fresh immutable AbstractedAccountMBR application: the read-only helper the SDK asks what
 * a wallet's boxes cost (`walletMbr` in akita-sdk/src/networks.ts).
 *
 * The helper has no update path. A release that changes what a wallet stores deploys a new helper
 * and repoints the SDK at it; the old one stays on chain for SDK versions that still name it.
 * `--register` writes the new id into networks.ts and the README. Rebuild the SDK afterwards.
 * A run on a network whose helper already runs this tree's program deploys nothing.
 *
 * Usage:
 *   npm run deploy:wallet-mbr -- -n mainnet --dry-run --sender "$CREATOR"
 *   npm run deploy:wallet-mbr -- -n mainnet --register
 */

import { AbstractedAccountMbrFactory, APP_SPEC } from '../smart_contracts/artifacts/arc58/account/AbstractedAccountMBRClient'
import { parseBaseArgs, recordNetworkAppDeployment, runScript, setupContext } from './script-base'

/** True when app `appId` runs this tree's helper program. */
async function runsTreeProgram(algod: { getApplicationByID(id: bigint): { do(): Promise<{ params?: { approvalProgram: Uint8Array; clearStateProgram: Uint8Array } }> } }, appId: bigint): Promise<boolean> {
  if (!appId) return false
  const live = await algod.getApplicationByID(appId).do().catch(() => undefined)
  if (!live?.params) return false
  const same = (a: Uint8Array, b: string) => Buffer.from(a).equals(Buffer.from(b, 'base64'))
  return same(live.params.approvalProgram, APP_SPEC.byteCode!.approval) && same(live.params.clearStateProgram, APP_SPEC.byteCode!.clear)
}

runScript(async () => {
  const options = parseBaseArgs('deploy-wallet-mbr.ts', `
Wallet storage helper options:
  --register                 Write the new app id into akita-sdk/src/networks.ts and the README
`)
  const register = process.argv.slice(2).includes('--register')
  console.log(`\nStarting AbstractedAccountMBR deployment on ${options.network}...\n`)

  const ctx = await setupContext(options, { minBalance: 2_000_000n })
  const current = (ctx.appIds as unknown as Record<string, bigint | undefined>).walletMbr ?? 0n

  if (await runsTreeProgram(ctx.algorand.client.algod as never, current)) {
    console.log(`The SDK's wallet storage helper ${current} already runs this tree's program. Nothing to deploy.\n`)
    return
  }
  console.log(`The SDK's wallet storage helper ${current || '(unset)'} runs another program than this tree's.`)

  if (options.dryRun) {
    console.log(`DRY RUN - Would deploy a fresh immutable AbstractedAccountMBR application${register ? ' and record it as walletMbr' : ''}\n`)
    return
  }

  const factory = ctx.algorand.client.getTypedAppFactory(AbstractedAccountMbrFactory, {
    defaultSender: ctx.sender,
    defaultSigner: ctx.signer,
  })
  const { appClient } = await factory.send.create.bare()
  if (!(await runsTreeProgram(ctx.algorand.client.algod as never, appClient.appId))) {
    throw new Error(`App ${appClient.appId} was created but does not run this tree's helper program`)
  }
  if (register) await recordNetworkAppDeployment(options.network, 'walletMbr', appClient.appId)

  console.log('='.repeat(80))
  console.log('ABSTRACTED ACCOUNT MBR DEPLOYMENT COMPLETE!')
  console.log('='.repeat(80))
  console.log(`
Network: ${options.network}
New MBR App ID: ${appClient.appId}
Application address: ${appClient.appAddress}
${register
    ? 'Recorded as walletMbr in akita-sdk/src/networks.ts. Rebuild the SDK: (cd ../akita-sdk && npm run build)'
    : `IMPORTANT: set walletMbr to ${appClient.appId}n in akita-sdk/src/networks.ts, or run again with --register`}
`)
})

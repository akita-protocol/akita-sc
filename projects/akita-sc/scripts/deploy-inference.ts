#!/usr/bin/env node
/**
 * Deploy Akita's inference network: InferenceNetwork, with Akita registered and activated as provider 1,
 * and InferencePlugin for wallets. Plans only unless --confirm is passed.
 *
 * The DAO fee and the provider bond are not set here: InferenceNetwork reads them from the Akita DAO's
 * `inference_fees` field, which an UpdateFields proposal sets once the DAO is upgraded to a version
 * that has it. Until then the fee and the bond are zero. The bond asset is the DAO's AKTA.
 *
 * What it sends, in order:
 *   1. create InferenceNetwork (admin = the sender for now, treasury = --treasury)
 *   2. fund the app, opt it in to AKTA (the bond asset) and USDC
 *   3. setSettings: 30-day unbonding, --settle-window seconds (default 3600), registration closed
 *   4. accept ALGO and USDC for tickets
 *   5. register Akita as provider 1 (--claimer, --payout, --metadata) with a zero bond, and activate it
 *   6. create InferencePlugin, reading grant policies from Meta (--registry, default the SDK's meta id)
 *   7. hand the network's admin to --admin, when given (the DAO wallet's address)
 *
 * Usage (from projects/akita-sc):
 *   npm run deploy:inference -- -n testnet --treasury "$TREASURY" --claimer "$CLAIMER" --payout "$PAYOUT" \
 *     --metadata https://inference.akita.community/provider.json --confirm
 */
import algosdk from 'algosdk'
import { microAlgo } from '@algorandfoundation/algokit-utils'
import { InferencePluginFactory } from '../smart_contracts/artifacts/arc58/plugins/inference/InferencePluginClient'
import { InferenceNetworkFactory } from '../smart_contracts/artifacts/inference/InferenceNetworkClient'
import { parseBaseArgs, runScript, setupContext } from './script-base'

const ASSET_MBR = 2_500n + 400n * (9n + 8n + 8n)
// Box MBRs, as in smart_contracts/inference/constants.ts
const PROVIDER_MBR = 2_500n + 400n * (9n + 32n * 3n + 8n * 4n)
const metadataMbr = (uri: string) => 2_500n + 400n * (9n + BigInt(Buffer.byteLength(uri)))

runScript(async () => {
  const args = process.argv.slice(2)
  const value = (key: string) => { const i = args.indexOf(key); return i < 0 ? undefined : args[i + 1] }
  const address = (key: string, fallback?: string) => {
    const v = value(key) ?? fallback
    if (!v || !algosdk.isValidAddress(v)) throw new Error(`${key} must be a valid Algorand address`)
    return v
  }
  const options = parseBaseArgs('deploy-inference.ts', `
  --treasury <address>   Receives swept fees (required outside LocalNet)
  --claimer <address>    Akita's claim account (required outside LocalNet)
  --payout <address>     Akita's payout address (required outside LocalNet)
  --metadata <uri>       Akita's provider metadata URI
  --admin <address>      Hand the network's admin to this address at the end (the DAO wallet)
  --registry <app id>    Meta app for InferencePlugin policies. Default: the SDK's meta id
  --settle-window <s>    Seconds a provider has to settle a ticket before it can be refunded. Default: 3600
  --confirm              Send (plans only without it)`)
  const ctx = await setupContext(options, { minBalance: 10_000_000n })
  const local = options.network === 'localnet'
  const sender = ctx.sender
  const treasury = address('--treasury', local ? sender : undefined)
  const claimer = address('--claimer', local ? sender : undefined)
  const payout = address('--payout', local ? sender : undefined)
  const admin = value('--admin') ? address('--admin') : undefined
  const metadata = value('--metadata') ?? 'https://inference.akita.community/provider.json'
  const registry = BigInt(value('--registry') ?? ctx.appIds.meta ?? 0n)
  const settleWindow = BigInt(value('--settle-window') ?? 3_600)
  const akta = ctx.appIds.akta
  const usdc = ctx.appIds.usdc
  if (registry === 0n) throw new Error('No Meta app for policies: pass --registry or record meta in the SDK first')
  if (!local && (akta === 0n || usdc === 0n)) throw new Error('The SDK records no AKTA or USDC id for this network')

  const settings = { unbondDelay: 30n * 86_400n, settleWindow, openRegistration: false }
  console.log(`InferenceNetwork on ${options.network}
  sender ${sender}, treasury ${treasury}, admin afterwards ${admin ?? sender}
  settings ${JSON.stringify(settings, (_, v) => typeof v === 'bigint' ? v.toString() : v)}
  ticket assets: ALGO${usdc ? `, USDC ${usdc}` : ''}
  provider 1 (Akita): claimer ${claimer}, payout ${payout}, metadata ${metadata}
  InferencePlugin registry: Meta ${registry}`)
  if (options.dryRun || !args.includes('--confirm')) return console.log('\nNothing was sent; pass --confirm to send.')

  const network = (await ctx.algorand.client.getTypedAppFactory(InferenceNetworkFactory, { defaultSender: sender, defaultSigner: ctx.signer })
    .send.create.create({ args: { version: options.version, akitaDao: ctx.appIds.dao, admin: sender, treasury } })).appClient
  console.log(`InferenceNetwork: ${network.appId}`)
  const pay = (amount: bigint) => ctx.algorand.createTransaction.payment({ sender, receiver: network.appAddress, amount: microAlgo(amount) })
  await network.appClient.fundAppAccount({ amount: microAlgo(200_000) })
  for (const asset of [akta, usdc].filter((a) => a !== 0n)) {
    await network.send.optIn({ args: { payment: pay(100_000n), asset }, extraFee: microAlgo(1_000) })
  }
  await network.send.setSettings({ args: { settings } })
  for (const asset of [0n, usdc].filter((a, i) => i === 0 || a !== 0n)) {
    await network.send.setPaymentAsset({ args: { payment: pay(ASSET_MBR), asset, allowed: true } })
  }
  const bond = akta === 0n
    ? pay(0n)
    : ctx.algorand.createTransaction.assetTransfer({ sender, receiver: network.appAddress, assetId: akta, amount: 0n })
  const provider = (await network.send.registerProvider({
    args: { payment: pay(PROVIDER_MBR + metadataMbr(metadata)), bond, claimer, payout, metadata },
  })).return!
  await network.send.setProviderStatus({ args: { provider, status: 1n } })
  console.log(`Akita is provider ${provider}, active`)

  const plugin = (await ctx.algorand.client.getTypedAppFactory(InferencePluginFactory, { defaultSender: sender, defaultSigner: ctx.signer })
    .send.create.create({ args: { registry } })).appClient
  console.log(`InferencePlugin: ${plugin.appId}`)

  if (admin) {
    await network.send.setAdmin({ args: { admin } })
    console.log(`Admin handed to ${admin}`)
  }
  console.log(`
IMPORTANT: record inferenceNetwork ${network.appId} and inferencePlugin ${plugin.appId} for ${options.network}
in akita-sdk/src/networks.ts, and give the backend the network id, provider ${provider} and the claimer's key.`)
})

#!/usr/bin/env node
/**
 * Deploy Akita's inference network: InferenceNetwork, with Akita registered and activated as provider 1,
 * and InferencePlugin for wallets. Plans only unless --confirm is passed.
 *
 * The DAO fee and the provider bond are not set here: InferenceNetwork reads them from the Akita DAO's
 * `inference_fees` field, which an UpdateFields proposal sets once the DAO is upgraded to a version
 * that has it. Until then the fee and the bond are zero. The bond asset is the DAO's AKTA.
 *
 * The Akita DAO runs the network. Its wallet is always an admin, and administers it through
 * InferencePlugin (an execution-key grant, `install:inference-admin-grant`, then one ExecutePlugin
 * proposal per change). The sender is a bootstrap admin until --hand-to-dao gives that up. The DAO's
 * share of each charge goes to the DAO revenue escrow the DAO names for the network (`rev_inference`,
 * see the runbook): until then fees stay in the app.
 *
 * What it does, in order. Every step after the creates reads the chain first and is skipped when it is
 * already done, and the creates are recorded in the --manifest receipt, so a rerun with the same
 * receipt resumes where a failed run stopped instead of creating a second app:
 *   1. create InferenceNetwork (bootstrap admin = the sender)
 *   2. fund the app, opt it in to AKTA (the bond asset) and USDC
 *   3. setSettings: 30-day unbonding, --settle-window seconds (default 3600), registration closed
 *   4. accept ALGO and USDC for tickets
 *   5. register Akita as provider 1 (--claimer, --payout, --metadata) with a zero bond, and activate it
 *   6. create InferencePlugin, reading grant policies from Meta (--registry, default the SDK's meta id)
 *   7. once the DAO has named the network's revenue escrow, opt that escrow (and the DAO's split
 *      receivers) in to USDC through the RevenueManager, so sweepFees can pay it
 *   8. with --hand-to-dao, give up the bootstrap admin: only the DAO's wallet administers it after that
 *   9. with --register, record inferenceNetwork and inferencePlugin in the SDK's networks.ts
 *
 * Before sending anything it checks that Meta exists and takes policies from the SDK's MetaPlugin, and
 * outside LocalNet that --payout is opted in to USDC (settle pays it), and that the DAO's wallet holds
 * its InferencePlugin grant before --hand-to-dao.
 *
 * Usage (from projects/akita-sc):
 *   npm run deploy:inference -- -n testnet --claimer "$CLAIMER" --payout "$PAYOUT" \
 *     --metadata https://inference.akita.community/provider.json --manifest receipts/inference.json --register --confirm
 *   (then the DAO steps in the runbook, and the same command again with --hand-to-dao)
 */
import algosdk from 'algosdk'
import { microAlgo } from '@algorandfoundation/algokit-utils'
import { InferencePluginFactory } from '../smart_contracts/artifacts/arc58/plugins/inference/InferencePluginClient'
import { InferenceNetworkClient, InferenceNetworkFactory } from '../smart_contracts/artifacts/inference/InferenceNetworkClient'
import { parseBaseArgs, recordNetworkAppDeployment, runScript, setupContext, type ScriptContext } from './script-base'
import { openReceipt, sha256 } from './lib/deployment-receipt'

const ASSET_MBR = 2_500n + 400n * (9n + 8n + 8n)
// Box MBRs, as in smart_contracts/inference/constants.ts
const PROVIDER_MBR = 2_500n + 400n * (9n + 32n * 3n + 8n * 4n)
const metadataMbr = (uri: string) => 2_500n + 400n * (9n + BigInt(Buffer.byteLength(uri)))
const ProviderPending = 0n
const ProviderActive = 1n
const ProviderPaused = 2n
const ZERO = algosdk.ALGORAND_ZERO_ADDRESS_STRING

async function globalUint(ctx: ScriptContext, appId: bigint, key: string): Promise<bigint | undefined> {
  const app = await ctx.algorand.client.algod.getApplicationByID(appId).do().catch(() => undefined)
  if (!app) return undefined
  const entry = (app.params?.globalState ?? []).find((kv) => Buffer.from(kv.key).toString() === key)
  return entry ? BigInt(entry.value.uint) : 0n
}

async function optedIn(ctx: ScriptContext, address: string, asset: bigint): Promise<boolean> {
  if (asset === 0n) return true
  return ctx.algorand.client.algod.accountAssetInformation(address, asset).do().then(() => true, () => false)
}

const orUndefined = <T>(promise: Promise<T>) => promise.catch(() => undefined)

runScript(async () => {
  const args = process.argv.slice(2)
  const value = (key: string) => { const i = args.indexOf(key); return i < 0 ? undefined : args[i + 1] }
  const address = (key: string, fallback?: string) => {
    const v = value(key) ?? fallback
    if (!v || !algosdk.isValidAddress(v)) throw new Error(`${key} must be a valid Algorand address`)
    return v
  }
  const options = parseBaseArgs('deploy-inference.ts', `
  --claimer <address>    Akita's claim account (required outside LocalNet)
  --payout <address>     Akita's payout address (required outside LocalNet)
  --metadata <uri>       Akita's provider metadata URI
  --hand-to-dao          Give up the sender's bootstrap admin at the end, leaving only the DAO's wallet
  --registry <app id>    Meta app for InferencePlugin policies. Default: the SDK's meta id
  --settle-window <s>    Seconds a provider has to settle a ticket before it can be refunded. Default: 3600
  --manifest <json>      Durable receipt (required with --confirm); rerun with it to resume
  --register             Record inferenceNetwork and inferencePlugin in the SDK network map
  --confirm              Send (plans only without it)`)
  const ctx = await setupContext(options, { minBalance: 10_000_000n })
  const local = options.network === 'localnet'
  const sender = ctx.sender
  const claimer = address('--claimer', local ? sender : undefined)
  const payout = address('--payout', local ? sender : undefined)
  const handToDao = args.includes('--hand-to-dao')
  if (value('--admin') || value('--treasury')) throw new Error('--admin and --treasury are gone: the DAO is the admin (--hand-to-dao), and fees go to its revenue escrow')
  const metadata = value('--metadata') ?? 'https://inference.akita.community/provider.json'
  const registry = BigInt(value('--registry') ?? ctx.appIds.meta ?? 0n)
  const settleWindow = BigInt(value('--settle-window') ?? 3_600)
  const manifest = value('--manifest')
  const akta = ctx.appIds.akta
  const usdc = ctx.appIds.usdc
  if (registry === 0n) throw new Error('No Meta app for policies: pass --registry or record meta in the SDK first (H1)')
  if (!local && (akta === 0n || usdc === 0n)) throw new Error('The SDK records no AKTA or USDC id for this network')

  // Pre-flight: InferencePlugin's registry can never change, so Meta must already take policies from
  // MetaPlugin; and settle reverts if the payout can't receive USDC.
  const problems: string[] = []
  const writer = await globalUint(ctx, registry, 'policy_writer')
  if (writer === undefined) problems.push(`Meta ${registry} does not exist`)
  else if (!local && (!ctx.appIds.metaPlugin || writer !== ctx.appIds.metaPlugin)) {
    problems.push(`Meta ${registry} takes policies from app ${writer}, not the SDK's MetaPlugin ${ctx.appIds.metaPlugin ?? 0n}`)
  }
  if (!local) {
    if (!(await optedIn(ctx, payout, usdc))) problems.push(`--payout ${payout} is not opted in to USDC ${usdc}`)
  }
  const pluginRecorded = ctx.appIds.inferencePlugin ?? 0n
  if (handToDao && !local) {
    // Without the DAO wallet's grant nothing could administer the network after the hand-over.
    const wallet = await ctx.dao.getWallet()
    const grants = [...await wallet.client.state.box.plugins.getMap()]
    const grant = grants.find(([key]) => key.plugin === pluginRecorded && key.caller === ZERO && key.escrow === '')?.[1]
    if (!pluginRecorded || !grant?.useExecutionKey) {
      problems.push(`The DAO's wallet holds no execution-key grant of InferencePlugin ${pluginRecorded || '(not recorded)'}: run install:inference-admin-grant before --hand-to-dao`)
    }
  }

  const settings = { unbondDelay: 30n * 86_400n, settleWindow, openRegistration: false }
  console.log(`InferenceNetwork on ${options.network}
  sender ${sender}; admin afterwards: the DAO's wallet${handToDao ? ' only' : `, and ${sender} as bootstrap admin until a run with --hand-to-dao`}
  settings ${JSON.stringify(settings, (_, v) => typeof v === 'bigint' ? v.toString() : v)}
  ticket assets: ALGO${usdc ? `, USDC ${usdc}` : ''}
  provider 1 (Akita): claimer ${claimer}, payout ${payout}, metadata ${metadata}
  InferencePlugin registry: Meta ${registry}`)
  if (problems.length) throw new Error(`Pre-flight failed:\n  ${problems.join('\n  ')}`)
  if (options.dryRun || !args.includes('--confirm')) return console.log('\nNothing was sent; pass --confirm to send.')

  const networkFactory = ctx.algorand.client.getTypedAppFactory(InferenceNetworkFactory, { defaultSender: sender, defaultSigner: ctx.signer })
  const pluginFactory = ctx.algorand.client.getTypedAppFactory(InferencePluginFactory, { defaultSender: sender, defaultSigner: ctx.signer })
  const networkCompiled = await networkFactory.appFactory.compile()
  const pluginCompiled = await pluginFactory.appFactory.compile()
  const receipt = await openReceipt(ctx, manifest, {
    contract: 'InferenceNetwork', claimer, payout, metadata, registry, settleWindow,
    network: sha256(networkCompiled.approvalProgram), plugin: sha256(pluginCompiled.approvalProgram),
  })

  const networkId = await receipt.createApp('InferenceNetwork', networkCompiled, async (note) => {
    const { appClient, result } = await networkFactory.send.create.create({
      note, args: { version: options.version, akitaDao: ctx.appIds.dao, admin: sender },
    })
    return { appId: appClient.appId, txId: result.txIds[0] }
  })
  const network = ctx.algorand.client.getTypedAppClientById(InferenceNetworkClient, { appId: networkId, defaultSender: sender, defaultSigner: ctx.signer })
  console.log(`InferenceNetwork: ${networkId}`)
  const pay = (amount: bigint) => ctx.algorand.createTransaction.payment({ sender, receiver: network.appAddress, amount: microAlgo(amount) })
  await ctx.algorand.account.ensureFunded(network.appAddress, sender, microAlgo(200_000))
  for (const asset of [akta, usdc].filter((a) => a !== 0n)) {
    if (await optedIn(ctx, network.appAddress.toString(), asset)) continue
    await network.send.optIn({ args: { payment: pay(100_000n), asset }, extraFee: microAlgo(1_000) })
  }
  const live = await orUndefined(network.state.global.settings())
  if (!live || live.settleWindow !== settings.settleWindow || live.unbondDelay !== settings.unbondDelay || live.openRegistration !== settings.openRegistration) {
    await network.send.setSettings({ args: { settings } })
  }
  for (const asset of [0n, usdc].filter((a, i) => i === 0 || a !== 0n)) {
    const record = await orUndefined(network.state.box.assets.value(asset))
    if (record?.allowed === 1n) continue
    await network.send.setPaymentAsset({ args: { payment: pay(record ? 0n : ASSET_MBR), asset, allowed: true } })
  }
  let provider = 1n
  const registered = await orUndefined(network.state.box.providers.value(provider))
  if (!registered) {
    const bond = akta === 0n
      ? pay(0n)
      : ctx.algorand.createTransaction.assetTransfer({ sender, receiver: network.appAddress, assetId: akta, amount: 0n })
    provider = (await network.send.registerProvider({
      args: { payment: pay(PROVIDER_MBR + metadataMbr(metadata)), bond, claimer, payout, metadata },
    })).return!
  } else if (registered.claimer !== claimer || registered.payout !== payout) {
    throw new Error(`Provider 1 is registered with claimer ${registered.claimer} and payout ${registered.payout}, not the ones given`)
  }
  const status = registered?.status ?? ProviderPending
  if (status === ProviderPending || status === ProviderPaused) {
    await network.send.setProviderStatus({ args: { provider, status: ProviderActive } })
  }
  console.log(`Akita is provider ${provider}, active`)

  const pluginId = await receipt.createApp('InferencePlugin', pluginCompiled, async (note) => {
    const { appClient, result } = await pluginFactory.send.create.create({ note, args: { registry } })
    return { appId: appClient.appId, txId: result.txIds[0] }
  })
  console.log(`InferencePlugin: ${pluginId}`)

  // The DAO names the network's revenue escrow by proposal (runbook); once it has, opt it in to USDC.
  const escrow = await orUndefined(network.state.global.akitaDaoEscrow())
  if (escrow && escrow.app > 0n && usdc !== 0n) {
    const cost = (await network.send.escrowOptInCost({ args: { asset: usdc } })).return ?? 0n
    if (cost > 0n) {
      await network.send.optInDaoEscrow({ args: { payment: pay(cost), asset: usdc }, extraFee: microAlgo(10_000) })
      console.log(`Opted "${escrow.name}" (escrow app ${escrow.app}) and the DAO's split receivers in to USDC ${usdc}`)
    }
    console.log(`Fees go to "${escrow.name}" (escrow app ${escrow.app})`)
  } else {
    console.log('The DAO has not named the revenue escrow for the network yet: fees stay in the app until it does (runbook)')
  }

  const currentAdmin = await orUndefined(network.state.global.admin())
  if (handToDao && currentAdmin !== ZERO) {
    await network.send.setAdmin({ args: { admin: ZERO } })
    console.log('Bootstrap admin given up: only the DAO\'s wallet administers the network now')
  } else if (!handToDao) {
    console.log(`${currentAdmin} is still the bootstrap admin: rerun with --hand-to-dao once the DAO holds its InferencePlugin grant`)
  }
  if (args.includes('--register')) {
    await recordNetworkAppDeployment(options.network, 'inferenceNetwork', networkId)
    await recordNetworkAppDeployment(options.network, 'inferencePlugin', pluginId)
    receipt.receipt.registered = true
    receipt.save()
  }
  console.log(`
Done. ${args.includes('--register') ? 'Recorded' : 'Record (rerun with --register)'} inferenceNetwork ${networkId} and inferencePlugin ${pluginId}
for ${options.network}, then give the backend the network id, provider ${provider} and the claimer's key.`)
})

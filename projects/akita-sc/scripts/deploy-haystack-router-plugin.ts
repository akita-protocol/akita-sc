#!/usr/bin/env node

/**
 * Deploy Haystack Router Plugin Script
 *
 * Fresh-deploys the ARC-58 HaystackRouterPlugin contract using the same
 * router, finalize selector, referrer, and referrer treasury inputs that
 * deploy-universe wires into the DAO universe.
 *
 * Usage:
 *   npm run deploy:haystack-router-plugin -- -n mainnet -m "deployer mnemonic"
 *   npm run deploy:haystack-router-plugin -- -n mainnet -m "..." --referrer YOIP...
 */

import { ABIMethod } from '@algorandfoundation/algokit-utils/abi'
import { HaystackRouterPluginSDK } from 'akita-sdk/wallet'
import algosdk from 'algosdk'
import { HaystackRouterPluginFactory } from '../smart_contracts/artifacts/arc58/plugins/haystack-router/HaystackRouterPluginClient'
import { parseBaseArgs, runScript, setupContext, type Network } from './script-base'

type HaystackRouterOptions = {
  routerAppId?: bigint
  routerMethod?: Uint8Array
  referrerAddress?: string
  referrerTreasuryAppId?: bigint
}

const DEFAULT_REFERRER_ADDRESS = 'S3JIY7ACMZWTTM7C3RAI5TSTW22UFYBW7TPXSJU6PAOHPKNXFN33AWEV2U'
const HAYSTACK_ROUTER_METHOD_SELECTOR = new Uint8Array([0xc8, 0x90, 0xdc, 0x20])

function getMethodSelector(methodSignature: string): Uint8Array {
  return ABIMethod.fromSignature(methodSignature).getSelector()
}

function formatFourByteSelector(value: Uint8Array): string {
  return Buffer.from(value).toString('hex')
}

function validateAddress(value: string, label: string): string {
  if (!algosdk.isValidAddress(value)) {
    throw new Error(`Invalid ${label}: ${value}`)
  }
  return value
}

function getNetworkHaystackRouterDefaults(network: Network): Required<HaystackRouterOptions> {
  const defaults: Record<Network, Required<HaystackRouterOptions>> = {
    localnet: {
      routerAppId: 0n,
      routerMethod: HAYSTACK_ROUTER_METHOD_SELECTOR,
      referrerAddress: DEFAULT_REFERRER_ADDRESS,
      referrerTreasuryAppId: 0n,
    },
    testnet: {
      routerAppId: 0n,
      routerMethod: HAYSTACK_ROUTER_METHOD_SELECTOR,
      referrerAddress: DEFAULT_REFERRER_ADDRESS,
      referrerTreasuryAppId: 0n,
    },
    mainnet: {
      routerAppId: 3172554435n,
      routerMethod: HAYSTACK_ROUTER_METHOD_SELECTOR,
      referrerAddress: DEFAULT_REFERRER_ADDRESS,
      referrerTreasuryAppId: 3041355560n,
    },
  }
  return defaults[network]
}

function parseHaystackArgs(): HaystackRouterOptions {
  const args = process.argv.slice(2)
  const options: HaystackRouterOptions = {}

  if (process.env.HAYSTACK_ROUTER_APP_ID) {
    options.routerAppId = BigInt(process.env.HAYSTACK_ROUTER_APP_ID)
  }
  if (process.env.HAYSTACK_ROUTER_METHOD_SELECTOR) {
    throw new Error('HAYSTACK_ROUTER_METHOD_SELECTOR is deprecated. Use HAYSTACK_ROUTER_METHOD_SIGNATURE instead.')
  }
  if (process.env.HAYSTACK_ROUTER_METHOD_SIGNATURE) {
    options.routerMethod = getMethodSelector(process.env.HAYSTACK_ROUTER_METHOD_SIGNATURE)
  }
  if (process.env.HAYSTACK_REFERRER_ADDRESS) {
    options.referrerAddress = validateAddress(process.env.HAYSTACK_REFERRER_ADDRESS, 'HAYSTACK_REFERRER_ADDRESS')
  }
  if (process.env.HAYSTACK_REFERRER_TREASURY_APP_ID) {
    options.referrerTreasuryAppId = BigInt(process.env.HAYSTACK_REFERRER_TREASURY_APP_ID)
  }

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i]
    const next = args[i + 1]

    if (arg === '--haystack-router' || arg === '--router' || arg === '--router-app-id') {
      if (!next) throw new Error(`${arg} requires an app ID`)
      options.routerAppId = BigInt(next)
      i += 1
    } else if (arg === '--haystack-router-method' || arg === '--haystack-router-method-signature') {
      if (!next) throw new Error(`${arg} requires an ABI method signature`)
      options.routerMethod = getMethodSelector(next)
      i += 1
    } else if (arg === '--referrer') {
      if (!next) throw new Error('--referrer requires an address')
      options.referrerAddress = validateAddress(next, '--referrer')
      i += 1
    } else if (arg === '--haystack-referrer-treasury' || arg === '--referrer-treasury') {
      if (!next) throw new Error(`${arg} requires an app ID`)
      options.referrerTreasuryAppId = BigInt(next)
      i += 1
    }
  }

  return options
}

runScript(async () => {
  const extraHelp = `
  --router, --router-app-id <id>             Haystack Router app ID. Mainnet default: 3172554435
  --haystack-router <id>                    Alias for --router
  --haystack-router-method <signature>      Haystack finalize ABI method signature. Defaults to c890dc20 selector.
  --haystack-router-method-signature <sig>  Alias for --haystack-router-method
  --referrer <address>                      Referrer address. Defaults to ${DEFAULT_REFERRER_ADDRESS}
  --referrer-treasury <id>                  Haystack referrer treasury app ID. Mainnet default: 3041355560
  --haystack-referrer-treasury <id>         Alias for --referrer-treasury`
  const options = parseBaseArgs('deploy-haystack-router-plugin.ts', extraHelp)
  const haystackArgs = parseHaystackArgs()
  const defaults = getNetworkHaystackRouterDefaults(options.network)
  const haystackOptions = {
    ...defaults,
    ...haystackArgs,
  }

  console.log(`\nStarting HaystackRouterPlugin deployment on ${options.network}...\n`)

  const ctx = await setupContext(options, { minBalance: 2_000_000n })
  const deployer = options.network !== 'localnet' && options.mnemonic
    ? ctx.algorand.account.fromMnemonic(options.mnemonic)
    : undefined
  const sender = deployer?.addr.toString() ?? ctx.sender
  const signer = deployer?.signer ?? ctx.signer
  const referrerAddress = haystackOptions.referrerAddress

  console.log('Haystack Router Plugin Configuration:')
  console.log(`   Router:             ${haystackOptions.routerAppId}`)
  console.log(`   Method Selector:    ${formatFourByteSelector(haystackOptions.routerMethod)}`)
  console.log(`   Referrer:           ${referrerAddress}`)
  console.log(`   Referrer Treasury:  ${haystackOptions.referrerTreasuryAppId}\n`)

  if (haystackOptions.routerAppId <= 0n) {
    throw new Error('Haystack router app ID must be greater than 0. Pass --router <appId>.')
  }
  if (haystackOptions.referrerTreasuryAppId <= 0n) {
    throw new Error('Haystack referrer treasury app ID must be greater than 0. Pass --referrer-treasury <appId>.')
  }

  if (options.dryRun && !options.mnemonic && options.network !== 'localnet') {
    console.log('DRY RUN - Would deploy new HaystackRouterPlugin contract\n')
    return
  }

  const factory = ctx.algorand.client.getTypedAppFactory(HaystackRouterPluginFactory, {
    defaultSender: sender,
    defaultSigner: signer as any,
  })

  console.log('Deploying new HaystackRouterPlugin...')
  const { appClient: client } = await factory.send.create.create({
    args: {
      router: haystackOptions.routerAppId,
      routerMethod: haystackOptions.routerMethod,
      referrer: referrerAddress,
      referrerTreasury: haystackOptions.referrerTreasuryAppId,
    },
  })

  const plugin = new HaystackRouterPluginSDK({
    algorand: ctx.algorand,
    factoryParams: {
      appId: client.appId,
      defaultSender: sender,
      defaultSigner: signer as any,
    },
  })

  console.log(`   New plugin deployed: ${plugin.appId}`)
  console.log(`   Plugin address: ${client.appAddress}\n`)

  console.log('='.repeat(80))
  console.log('HAYSTACK ROUTER PLUGIN DEPLOYMENT COMPLETE!')
  console.log('='.repeat(80))
  console.log(`
Summary:
  Network: ${options.network}
  New Plugin App ID: ${plugin.appId}
  Router: ${haystackOptions.routerAppId}
  Router Method Selector: ${formatFourByteSelector(haystackOptions.routerMethod)}
  Referrer: ${referrerAddress}
  Referrer Treasury: ${haystackOptions.referrerTreasuryAppId}

IMPORTANT: Update the SDK networks.ts file with the new plugin app ID:
  haystackRouterPlugin: ${plugin.appId}n,
`)
})

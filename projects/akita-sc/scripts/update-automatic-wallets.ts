#!/usr/bin/env node

/** Update every factory-created wallet that permits automatic factory updates. */

import { microAlgo } from '@algorandfoundation/algokit-utils'
import algosdk from 'algosdk'
import { parseBaseArgs, runScript, setupContext } from './script-base'
import { AbstractedAccountClient } from '../smart_contracts/artifacts/arc58/account/AbstractedAccountClient'
import { AbstractedAccountFactoryClient } from '../smart_contracts/artifacts/arc58/account/AbstractedAccountFactoryClient'

const DEFAULT_MAX_FEE = 100_000n

type WalletStatus = {
  wallet: bigint
  version?: string
  allowed: boolean
  automatic: boolean
}

function argValue(name: string): string | undefined {
  const args = process.argv.slice(2)
  const index = args.indexOf(name)
  return index >= 0 ? args[index + 1] : undefined
}

function hasFlag(name: string): boolean {
  return process.argv.slice(2).includes(name)
}

function parseInteger(value: string, label: string): bigint {
  const normalized = value.replaceAll('_', '').replaceAll(',', '')
  if (!/^\d+$/.test(normalized)) throw new Error(`${label} must be a non-negative integer`)
  return BigInt(normalized)
}

async function searchAppsByCreator(indexer: any, creator: string, limit?: number): Promise<bigint[]> {
  const apps: bigint[] = []
  let next: string | undefined

  while (true) {
    const request = indexer.searchForApplications({ creator, limit: 1000, next })
    let response: any
    if (typeof request?.do === 'function') {
      let legacyRequest = request.creator(creator).limit(1000)
      if (next) legacyRequest = legacyRequest.nextToken(next)
      response = await legacyRequest.do()
    } else {
      response = await request
    }

    for (const app of response.applications ?? []) {
      if (!app.deleted) apps.push(BigInt(app.id ?? app.index))
      if (limit !== undefined && apps.length >= limit) return apps
    }

    next = response.nextToken ?? response['next-token']
    if (!next) break
  }

  return apps
}

runScript(async () => {
  const options = parseBaseArgs('update-automatic-wallets.ts', `
Automatic wallet update options:
  --discover-limit <count>   Stop indexer discovery after count wallets
  --max-fee <microAlgos>     Maximum fee per wallet update. Default: 100000
  --skip-current             Skip wallets already reporting the factory child version

Examples:
  npm run update:automatic-wallets -- -n mainnet --dry-run
  npm run update:automatic-wallets -- -n mainnet -m "$MNEMONIC"
  npm run update:automatic-wallets -- -n mainnet -m "$MNEMONIC" --skip-current
`)

  const ctx = await setupContext(options)
  const discoverLimit = argValue('--discover-limit')
    ? Number(parseInteger(argValue('--discover-limit')!, '--discover-limit'))
    : undefined
  const maxFee = argValue('--max-fee')
    ? parseInteger(argValue('--max-fee')!, '--max-fee')
    : DEFAULT_MAX_FEE
  const skipCurrent = hasFlag('--skip-current')

  const walletFactory = ctx.algorand.client.getTypedAppClientById(AbstractedAccountFactoryClient, {
    appId: ctx.appIds.walletFactory,
    defaultSender: ctx.sender,
    defaultSigner: ctx.signer,
  })
  const targetVersion = await walletFactory.state.global.childContractVersion()
  if (!targetVersion) throw new Error('Could not read childContractVersion from wallet factory')

  const indexer = (ctx.algorand.client as any).indexer
  if (!indexer) throw new Error('No indexer client is configured')

  const factoryAddress = algosdk.getApplicationAddress(Number(ctx.appIds.walletFactory)).toString()
  console.log(`Factory child version: ${targetVersion}`)
  console.log(`Discovering wallets created by ${factoryAddress}...`)
  const walletIds = await searchAppsByCreator(indexer, factoryAddress, discoverLimit)
  console.log(`Inspecting ${walletIds.length} wallet app(s)...\n`)

  const statuses: WalletStatus[] = []
  const unreadable: { wallet: bigint; error: unknown }[] = []

  for (const wallet of walletIds) {
    try {
      const client = ctx.algorand.client.getTypedAppClientById(AbstractedAccountClient, {
        appId: wallet,
        defaultSender: ctx.sender,
        defaultSigner: ctx.signer,
      })
      const [settings, version] = await Promise.all([
        client.state.global.factoryUpdateSettings(),
        client.state.global.version(),
      ])

      statuses.push({
        wallet,
        version,
        allowed: settings?.allowed ?? false,
        automatic: settings?.automatic ?? false,
      })
    } catch (error) {
      unreadable.push({ wallet, error })
    }
  }

  const eligible = statuses.filter((wallet) => wallet.allowed && wallet.automatic)
  const manual = statuses.filter((wallet) => wallet.allowed && !wallet.automatic)
  const disallowed = statuses.filter((wallet) => !wallet.allowed)
  const current = eligible.filter((wallet) => wallet.version === targetVersion)
  const targets = skipCurrent
    ? eligible.filter((wallet) => wallet.version !== targetVersion)
    : eligible

  console.log(`Automatic updates allowed: ${eligible.length}`)
  console.log(`Already reporting ${targetVersion}: ${current.length}`)
  console.log(`Manual update required: ${manual.length}`)
  console.log(`Factory updates disabled: ${disallowed.length}`)
  console.log(`Unreadable wallets: ${unreadable.length}`)
  console.log(`Wallets selected for update: ${targets.length}\n`)

  if (options.dryRun) {
    for (const wallet of targets) {
      console.log(`  ${wallet.wallet}: ${wallet.version ?? '<missing version>'} -> ${targetVersion}`)
    }
    console.log('\nDRY RUN - No wallet updates were submitted')
    return
  }

  const failures: { wallet: bigint; error: unknown }[] = []
  let updated = 0

  for (const target of targets) {
    try {
      console.log(`Updating wallet ${target.wallet} (${target.version ?? '<missing>'} -> ${targetVersion})...`)
      await walletFactory.send.updateWallet({
        sender: ctx.sender,
        signer: ctx.signer,
        args: { wallet: target.wallet },
        coverAppCallInnerTransactionFees: true,
        populateAppCallResources: true,
        maxFee: microAlgo(maxFee),
      })
      updated++
    } catch (error) {
      failures.push({ wallet: target.wallet, error })
      console.warn(`  Update failed for wallet ${target.wallet}`)
    }
  }

  console.log('\nAutomatic wallet update complete')
  console.log(`  Selected: ${targets.length}`)
  console.log(`  Updated: ${updated}`)
  console.log(`  Failed: ${failures.length}`)

  for (const failure of failures) {
    console.log(`  Failed wallet ${failure.wallet}: ${failure.error instanceof Error ? failure.error.message : String(failure.error)}`)
  }

  if (failures.length > 0) process.exitCode = 1
})

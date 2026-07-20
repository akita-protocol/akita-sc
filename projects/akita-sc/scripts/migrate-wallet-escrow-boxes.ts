#!/usr/bin/env node

/**
 * Update wallets that still have old escrow boxes, then migrate those boxes.
 *
 * The script discovers wallet apps created by the wallet factory when an
 * indexer is available. For tighter control, pass --wallets or --wallet-file.
 */

import fs from 'fs'
import { microAlgo } from '@algorandfoundation/algokit-utils'
import algosdk from 'algosdk'
import { parseBaseArgs, setupContext, runScript } from './script-base'
import { AbstractedAccountClient } from '../smart_contracts/artifacts/arc58/account/AbstractedAccountClient'
import { AbstractedAccountFactoryClient } from '../smart_contracts/artifacts/arc58/account/AbstractedAccountFactoryClient'

const ESCROW_PREFIX = 'e'.charCodeAt(0)
const OLD_ESCROW_BOX_LENGTH = 9
const DEFAULT_FUNDING_BUFFER = 100_000n

type WalletEscrowBoxes = {
  wallet: bigint
  escrows: string[]
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

function parseWalletList(value: string): bigint[] {
  return value
    .split(/[,\s]+/)
    .map((v) => v.trim())
    .filter(Boolean)
    .map((v) => parseInteger(v, 'wallet app id'))
}

function parseWalletFile(path: string): bigint[] {
  const text = fs.readFileSync(path, 'utf8')
  const trimmed = text.trim()
  if (!trimmed) return []

  if (trimmed.startsWith('[')) {
    const parsed = JSON.parse(trimmed)
    if (!Array.isArray(parsed)) throw new Error('--wallet-file JSON must be an array')
    return parsed.map((v) => parseInteger(String(v), 'wallet app id'))
  }

  return parseWalletList(trimmed)
}

function boxNameBytes(name: unknown): Uint8Array {
  if (name instanceof Uint8Array) return name
  if (Array.isArray(name)) return new Uint8Array(name)
  if (typeof name === 'string') {
    const base64 = Buffer.from(name, 'base64')
    const isBase64 = base64.length > 0 && Buffer.from(base64).toString('base64').replace(/=+$/, '') === name.replace(/=+$/, '')
    if (isBase64 && base64[0] === ESCROW_PREFIX) {
      return base64
    }
    if (name.charCodeAt(0) === ESCROW_PREFIX) return Buffer.from(name)
    if (isBase64) return base64
    return Buffer.from(name)
  }
  if (name && typeof (name as { bytes?: unknown }).bytes !== 'undefined') {
    return boxNameBytes((name as { bytes?: unknown }).bytes)
  }
  throw new Error(`Unsupported box name shape: ${String(name)}`)
}

function escrowNameFromBox(raw: Uint8Array): string | undefined {
  if (raw[0] !== ESCROW_PREFIX) return undefined
  return Buffer.from(raw.slice(1)).toString('utf8')
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

async function getApplicationBoxes(algod: any, appId: bigint): Promise<Uint8Array[]> {
  if (typeof algod.getApplicationBoxes === 'function') {
    const response = await algod.getApplicationBoxes(Number(appId)).do()
    return (response.boxes ?? []).map((box: { name: unknown }) => boxNameBytes(box.name))
  }

  const response = await algod.applicationBoxes(Number(appId))
  return (response.boxes ?? []).map((box: { name: unknown }) => boxNameBytes(box.name))
}

async function getApplicationBoxLength(algod: any, appId: bigint, name: Uint8Array): Promise<number | undefined> {
  try {
    if (typeof algod.getApplicationBoxByName === 'function') {
      const response = await algod.getApplicationBoxByName(Number(appId), name).do()
      return boxNameBytes(response.value).length
    }

    const response = await algod.applicationBoxByName(Number(appId), name)
    return boxNameBytes(response.value).length
  } catch {
    return undefined
  }
}

async function findWalletsWithOldEscrows(algod: any, walletIds: bigint[]): Promise<WalletEscrowBoxes[]> {
  const matches: WalletEscrowBoxes[] = []

  for (const wallet of walletIds) {
    const boxes = await getApplicationBoxes(algod, wallet)
    const oldEscrows: string[] = []

    for (const box of boxes) {
      const escrow = escrowNameFromBox(box)
      if (escrow === undefined) continue

      const length = await getApplicationBoxLength(algod, wallet, box)
      if (length === OLD_ESCROW_BOX_LENGTH) oldEscrows.push(escrow)
    }

    if (oldEscrows.length > 0) {
      matches.push({ wallet, escrows: oldEscrows })
    }
  }

  return matches
}

runScript(async () => {
  const options = parseBaseArgs('migrate-wallet-escrow-boxes.ts', `
Escrow migration options:
  --wallets <ids>            Comma/space separated wallet app IDs to inspect
  --wallet-file <path>       File containing wallet app IDs, or a JSON array
  --discover-limit <count>   Stop indexer discovery after count wallets
  --funding <microAlgos>     Funding buffer per wallet with old escrow boxes. Default: 100000
  --skip-update              Do not call walletFactory.updateWallet for matching wallets
  --skip-funding             Do not send MBR buffer payments
  --skip-migrate             Do not call migrateEscrow after update/funding

Examples:
  npm run migrate:wallet-escrow-boxes -- -n testnet -m "$MNEMONIC" --dry-run
  npm run migrate:wallet-escrow-boxes -- -n testnet -m "$MNEMONIC" --wallets 123,456
`)

  const ctx = await setupContext(options)
  const manualWallets = [
    ...(argValue('--wallets') ? parseWalletList(argValue('--wallets')!) : []),
    ...(argValue('--wallet-file') ? parseWalletFile(argValue('--wallet-file')!) : []),
  ]
  const discoverLimit = argValue('--discover-limit') ? Number(parseInteger(argValue('--discover-limit')!, '--discover-limit')) : undefined
  const fundingBuffer = argValue('--funding') ? parseInteger(argValue('--funding')!, '--funding') : DEFAULT_FUNDING_BUFFER
  const skipUpdate = hasFlag('--skip-update')
  const skipFunding = hasFlag('--skip-funding')
  const skipMigrate = hasFlag('--skip-migrate')

  let walletIds = [...new Set(manualWallets.map((id) => id.toString()))].map(BigInt)
  if (walletIds.length === 0) {
    const indexer = (ctx.algorand.client as any).indexer
    if (!indexer) throw new Error('No wallet list provided and no indexer client is configured')

    const factoryAddress = algosdk.getApplicationAddress(Number(ctx.appIds.walletFactory)).toString()
    console.log(`Discovering wallets created by wallet factory address ${factoryAddress}...`)
    walletIds = await searchAppsByCreator(indexer, factoryAddress, discoverLimit)
  }

  console.log(`Inspecting ${walletIds.length} wallet app(s)...`)
  const matches = await findWalletsWithOldEscrows((ctx.algorand.client as any).algod, walletIds)
  const escrowCount = matches.reduce((sum, item) => sum + item.escrows.length, 0)

  console.log(`Found ${matches.length} wallet(s) with ${escrowCount} old escrow box(es)\n`)
  for (const item of matches) {
    console.log(`  Wallet ${item.wallet}: ${item.escrows.join(', ')}`)
  }
  if (matches.length > 0) console.log()

  if (options.dryRun) {
    console.log('DRY RUN - No wallet updates, funding payments, or migrations were submitted')
    return
  }

  const walletFactory = ctx.algorand.client.getTypedAppClientById(AbstractedAccountFactoryClient, {
    appId: ctx.appIds.walletFactory,
    defaultSender: ctx.sender,
    defaultSigner: ctx.signer,
  })

  const failed: { wallet: bigint; step: string; error: unknown }[] = []

  for (const item of matches) {
    console.log(`Migrating wallet ${item.wallet} (${item.escrows.length} escrow box(es))...`)

    if (!skipUpdate) {
      try {
        await walletFactory.send.updateWallet({
          sender: ctx.sender,
          signer: ctx.signer,
          args: { wallet: item.wallet },
          coverAppCallInnerTransactionFees: true,
          populateAppCallResources: true,
          maxFee: microAlgo(100_000n),
        })
        console.log('   Wallet updated')
      } catch (error) {
        failed.push({ wallet: item.wallet, step: 'updateWallet', error })
        console.warn(`   Wallet update failed; skipping migrations for ${item.wallet}`)
        continue
      }
    }

    if (!skipFunding && fundingBuffer > 0n) {
      await ctx.algorand.send.payment({
        sender: ctx.sender,
        signer: ctx.signer,
        receiver: algosdk.getApplicationAddress(Number(item.wallet)).toString(),
        amount: microAlgo(fundingBuffer),
      })
      console.log(`   Funded ${fundingBuffer} microAlgos`)
    }

    if (skipMigrate) continue

    const wallet = ctx.algorand.client.getTypedAppClientById(AbstractedAccountClient, {
      appId: item.wallet,
      defaultSender: ctx.sender,
      defaultSigner: ctx.signer,
    })

    for (const escrow of item.escrows) {
      const boxName = Buffer.from(`e${escrow}`)
      try {
        await wallet.send.migrateEscrow({
          sender: ctx.sender,
          signer: ctx.signer,
          args: { escrow },
          boxReferences: [boxName],
          populateAppCallResources: true,
          maxFee: microAlgo(10_000n),
        })
        console.log(`   Migrated ${escrow}`)
      } catch (error) {
        failed.push({ wallet: item.wallet, step: `migrateEscrow(${escrow})`, error })
        console.warn(`   Migration failed for ${escrow}`)
      }
    }
  }

  console.log('\nMigration run complete')
  console.log(`  Wallets matched: ${matches.length}`)
  console.log(`  Escrow boxes matched: ${escrowCount}`)
  console.log(`  Failures: ${failed.length}`)

  for (const item of failed) {
    console.log(`  Failed ${item.step} on wallet ${item.wallet}: ${item.error instanceof Error ? item.error.message : String(item.error)}`)
  }
})

#!/usr/bin/env node

import algosdk from 'algosdk'
import { getNetworkAppIds, setCurrentNetwork, type AkitaNetwork } from 'akita-sdk'

const DEFAULT_DEPLOYER = 'T3XTUCP6XUUTMCYBE243YIKYJ6A7XUU74SVXWT5WPU7E4CLL4AU4B2HT5Q'

type Args = {
  network: AkitaNetwork
  deployer: string
  json: boolean
}

export type AppNode = {
  id: number
  address: string
  creator: string
  depth: number
  parent?: number
  deleted: boolean
  boxes: number
  assetsHeld: AssetHolding[]
}

export type AssetHolding = {
  assetId: number
  amount: string
}

export type AssetNode = {
  id: number
  creator: string
  manager?: string
  name?: string
  unitName?: string
  deleted: boolean
  nonZeroHolders: number
  holderSample: { address: string; amount: string }[]
}

export type EscrowNode = {
  id: number
  address: string
  ownerKind: 'app' | 'address-prefix' | 'unknown'
  owner?: string
  ownerAppId?: number
}

function parseArgs(): Args {
  const args = process.argv.slice(2)
  let network: AkitaNetwork = 'testnet'
  let deployer = DEFAULT_DEPLOYER
  let json = false

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--network' || args[i] === '-n') {
      const value = args[++i] as AkitaNetwork
      if (!['testnet', 'mainnet', 'localnet'].includes(value)) throw new Error(`Invalid network: ${value}`)
      network = value
    } else if (args[i] === '--deployer') {
      deployer = args[++i]
    } else if (args[i] === '--json') {
      json = true
    } else if (args[i] === '--help' || args[i] === '-h') {
      console.log(`
Usage: npm run sunset:plan-deployer -- [options]

Options:
  --network, -n <network>  Network to inspect. Default: testnet
  --deployer <address>     Root deployer account. Default: ${DEFAULT_DEPLOYER}
  --json                   Print full machine-readable inventory
`)
      process.exit(0)
    }
  }

  return { network, deployer, json }
}

export function getIndexer(network: AkitaNetwork): algosdk.Indexer {
  if (network === 'mainnet') return new algosdk.Indexer('', 'https://mainnet-idx.algonode.cloud', 443)
  if (network === 'testnet') return new algosdk.Indexer('', 'https://testnet-idx.algonode.cloud', 443)
  throw new Error('localnet inventory is not supported by this planner')
}

export function getAlgod(network: AkitaNetwork): algosdk.Algodv2 {
  if (network === 'mainnet') return new algosdk.Algodv2('', 'https://mainnet-api.algonode.cloud', 443)
  if (network === 'testnet') return new algosdk.Algodv2('', 'https://testnet-api.algonode.cloud', 443)
  throw new Error('localnet inventory is not supported by this planner')
}

function address(value: unknown): string {
  if (typeof value === 'string') return value
  if (value && typeof (value as { toString: () => string }).toString === 'function') return (value as { toString: () => string }).toString()
  return String(value)
}

function keyString(key: Uint8Array): string {
  return Buffer.from(key).toString('utf8')
}

function bytesValue(value: { bytes?: Uint8Array }): Uint8Array {
  return value.bytes ?? new Uint8Array()
}

function uintValue(value: unknown): number | undefined {
  if (typeof value === 'bigint') return Number(value)
  if (typeof value === 'number') return value
  return undefined
}

async function searchApps(indexer: algosdk.Indexer, creator: string): Promise<algosdk.indexerModels.Application[]> {
  const apps: algosdk.indexerModels.Application[] = []
  let request = indexer.searchForApplications().creator(creator).limit(1000)
  while (true) {
    const response = await request.do()
    apps.push(...(response.applications ?? []))
    const next = response.nextToken ?? response['next-token']
    if (!next) break
    request = indexer.searchForApplications().creator(creator).limit(1000).nextToken(next)
  }
  return apps.filter((app) => !app.deleted)
}

async function searchAssets(indexer: algosdk.Indexer, creator: string): Promise<algosdk.indexerModels.Asset[]> {
  const assets: algosdk.indexerModels.Asset[] = []
  let request = indexer.searchForAssets().creator(creator).limit(1000)
  while (true) {
    const response = await request.do()
    assets.push(...(response.assets ?? []))
    const next = response.nextToken ?? response['next-token']
    if (!next) break
    request = indexer.searchForAssets().creator(creator).limit(1000).nextToken(next)
  }
  return assets.filter((asset) => !asset.deleted)
}

async function countBoxes(algod: algosdk.Algodv2, appId: number): Promise<number> {
  try {
    const response = await algod.getApplicationBoxes(appId).do()
    return response.boxes.length
  } catch {
    return 0
  }
}

async function appHoldings(indexer: algosdk.Indexer, appId: number): Promise<AssetHolding[]> {
  try {
    const appAddress = algosdk.getApplicationAddress(appId).toString()
    const account = (await indexer.lookupAccountByID(appAddress).do()).account
    return (account.assets ?? [])
      .filter((asset) => BigInt(asset.amount) > 0n)
      .map((asset) => ({ assetId: Number(asset.assetId), amount: asset.amount.toString() }))
  } catch {
    return []
  }
}

async function assetInfo(indexer: algosdk.Indexer, asset: algosdk.indexerModels.Asset): Promise<AssetNode> {
  const id = Number(asset.index)
  const holderSample: { address: string; amount: string }[] = []
  let nonZeroHolders = 0
  let request = indexer.lookupAssetBalances(id).limit(1000)
  while (true) {
    const response = await request.do()
    for (const balance of response.balances ?? []) {
      if (BigInt(balance.amount) === 0n) continue
      nonZeroHolders++
      if (holderSample.length < 10) holderSample.push({ address: address(balance.address), amount: balance.amount.toString() })
    }
    const next = response.nextToken ?? response['next-token']
    if (!next) break
    request = indexer.lookupAssetBalances(id).limit(1000).nextToken(next)
  }

  return {
    id,
    creator: address(asset.params.creator),
    manager: asset.params.manager ? address(asset.params.manager) : undefined,
    name: asset.params.name,
    unitName: asset.params.unitName,
    deleted: Boolean(asset.deleted),
    nonZeroHolders,
    holderSample,
  }
}

export async function discoverApps(indexer: algosdk.Indexer, algod: algosdk.Algodv2, deployer: string): Promise<AppNode[]> {
  const creators = [{ address: deployer, depth: 0, parent: undefined as number | undefined }]
  const seenCreators = new Set<string>()
  const seenApps = new Map<number, AppNode>()

  for (let i = 0; i < creators.length; i++) {
    const creator = creators[i]
    if (seenCreators.has(creator.address)) continue
    seenCreators.add(creator.address)

    const apps = await searchApps(indexer, creator.address)
    for (const app of apps) {
      const id = Number(app.id)
      if (seenApps.has(id)) continue
      const appAddress = algosdk.getApplicationAddress(id).toString()
      seenApps.set(id, {
        id,
        address: appAddress,
        creator: creator.address,
        depth: creator.depth,
        parent: creator.parent,
        deleted: Boolean(app.deleted),
        boxes: await countBoxes(algod, id),
        assetsHeld: await appHoldings(indexer, id),
      })
      creators.push({ address: appAddress, depth: creator.depth + 1, parent: id })
    }
  }

  return [...seenApps.values()].sort((a, b) => a.id - b.id)
}

export async function discoverAssets(indexer: algosdk.Indexer, creators: string[]): Promise<AssetNode[]> {
  const seen = new Map<number, AssetNode>()
  for (const creator of creators) {
    for (const asset of await searchAssets(indexer, creator)) {
      if (seen.has(Number(asset.index))) continue
      seen.set(Number(asset.index), await assetInfo(indexer, asset))
    }
  }
  return [...seen.values()].sort((a, b) => a.id - b.id)
}

export async function getEscrowOwner(indexer: algosdk.Indexer, app: AppNode, appIds: ReturnType<typeof getNetworkAppIds>): Promise<EscrowNode | undefined> {
  if (app.creator !== algosdk.getApplicationAddress(appIds.escrowFactory).toString()) return undefined
  const application = (await indexer.lookupApplications(app.id).do()).application
  const creatorState = (application.params.globalState ?? []).find((kv) => keyString(kv.key) === 'creator')
  if (!creatorState) return { id: app.id, address: app.address, ownerKind: 'unknown' }

  const raw = bytesValue(creatorState.value)
  if (raw.length === 8) {
    const ownerAppId = Number(Buffer.from(raw).readBigUInt64BE())
    return { id: app.id, address: app.address, ownerKind: 'app', ownerAppId, owner: algosdk.getApplicationAddress(ownerAppId).toString() }
  }
  if (raw.length === 16) {
    return { id: app.id, address: app.address, ownerKind: 'address-prefix', owner: Buffer.from(raw).toString('hex') }
  }
  return { id: app.id, address: app.address, ownerKind: 'unknown', owner: Buffer.from(raw).toString('hex') }
}

export function getPluginAppIds(appIds: ReturnType<typeof getNetworkAppIds>): Set<number> {
  return new Set<number>(
    Object.entries(appIds)
      .filter(([key, value]) => key.endsWith('Plugin') && typeof value === 'bigint' && value > 0n)
      .map(([, value]) => Number(value)),
  )
}

export function getCriticalAppIds(appIds: ReturnType<typeof getNetworkAppIds>): Set<number> {
  return new Set<number>([
    Number(appIds.dao),
    Number(appIds.wallet),
    Number(appIds.walletFactory),
    Number(appIds.escrowFactory),
  ])
}

export function getSunsetAppTargets(apps: AppNode[], appIds: ReturnType<typeof getNetworkAppIds>): AppNode[] {
  const immovableApps = new Set<number>([...getCriticalAppIds(appIds), ...getPluginAppIds(appIds)])
  return apps
    .filter((app) => !immovableApps.has(app.id))
    .sort((a, b) => b.depth - a.depth || b.id - a.id)
}

export function printPlan(apps: AppNode[], assets: AssetNode[], escrows: EscrowNode[], appIds: ReturnType<typeof getNetworkAppIds>, deployer: string): void {
  const byDepth = apps.reduce<Record<number, number>>((acc, app) => {
    acc[app.depth] = (acc[app.depth] ?? 0) + 1
    return acc
  }, {})
  const pluginIds = getPluginAppIds(appIds)
  const knownCritical = getCriticalAppIds(appIds)
  const immovableApps = new Set<number>([...knownCritical, ...pluginIds])
  const directEscrows = escrows.filter((e) => e.ownerKind === 'address-prefix')
  const appEscrows = escrows.filter((e) => e.ownerKind === 'app')
  const appById = new Map(apps.map((app) => [app.id, app]))
  const assetHoldingEscrows = escrows
    .map((escrow) => ({ escrow, app: appById.get(escrow.id) }))
    .filter((entry): entry is { escrow: EscrowNode; app: AppNode } => Boolean(entry.app?.assetsHeld.length))
  const assetBlockers = assets.filter((a) => a.nonZeroHolders > 1)

  console.log('='.repeat(80))
  console.log('DEPLOYER SUNSET INVENTORY')
  console.log('='.repeat(80))
  console.log(`Root deployer: ${deployer}`)
  console.log(`Related live apps: ${apps.length} (${Object.entries(byDepth).map(([d, c]) => `depth ${d}: ${c}`).join(', ')})`)
  console.log(`Related live assets: ${assets.length}`)
  console.log(`Apps with boxes: ${apps.filter((a) => a.boxes > 0).length}`)
  console.log(`Apps holding assets: ${apps.filter((a) => a.assetsHeld.length > 0).length}`)
  console.log(`Escrow children: ${escrows.length} (${directEscrows.length} direct, ${appEscrows.length} app-owned)`)

  console.log('\nRecommended order:')
  console.log('  1. Keep DAO, DAO wallet, wallet factory, and escrow factory alive as infrastructure.')
  console.log('     Plugin apps are intentionally excluded: they are not upgradable/deletable.')
  console.log('  2. Delete escrow children before their owner apps:')
  console.log('     - if an escrow holds ASAs, reclaim/close those holdings through the owner before factory deletion')
  console.log('     - direct/address-owned escrows: call EscrowFactory.delete(id) from the deployer')
  console.log('     - app-owned escrows: update owner app to SunsetContract, call deleteEscrows(escrowFactory, ids), then continue tearing down owner')
  console.log('  3. For every non-critical app, deepest creator tree first:')
  console.log('     - update to SunsetContract with SUNSET_CALLER pinned to deployer')
  console.log('     - delete boxes')
  console.log('     - close out held ASAs')
  console.log('     - destroy assets managed by that app where supply has been consolidated')
  console.log('     - delete the app, closing ALGO to the deployer')
  console.log('  4. Destroy deployer-managed assets once their only non-zero holder is the deployer.')
  console.log('  5. Final infrastructure order:')
  console.log('     - update DAO to SunsetContract, reclaim DAO-wallet escrow ASAs, then delete DAO')
  console.log('     - update DAO wallet through the special wallet factory sunset approval')
  console.log('     - close/destroy DAO wallet ASAs, delete DAO-wallet escrows, then delete DAO wallet')
  console.log('     - delete escrowFactory after all registered escrows are gone')
  console.log('     - delete walletFactory last')

  const phaseApps = getSunsetAppTargets(apps, appIds)

  const matchedPlugins = apps.filter((app) => pluginIds.has(app.id)).sort((a, b) => a.id - b.id)
  if (matchedPlugins.length > 0) {
    console.log(`\nPlugin apps left in place: ${matchedPlugins.length}`)
    console.log(`  ${matchedPlugins.map((app) => app.id).join(', ')}`)
  }

  console.log('\nFirst 40 app teardown targets:')
  for (const app of phaseApps.slice(0, 40)) {
    const flags = [
      app.boxes ? `${app.boxes} boxes` : undefined,
      app.assetsHeld.length ? `${app.assetsHeld.length} asset holdings` : undefined,
      appEscrows.some((e) => e.ownerAppId === app.id) ? `${appEscrows.filter((e) => e.ownerAppId === app.id).length} owned escrows` : undefined,
    ].filter(Boolean).join(', ')
    console.log(`  ${app.id} depth=${app.depth}${flags ? ` (${flags})` : ''}`)
  }
  if (phaseApps.length > 40) console.log(`  ... ${phaseApps.length - 40} more`)

  if (assetHoldingEscrows.length > 0) {
    console.log('\nEscrow asset prerequisites:')
    for (const { escrow, app } of assetHoldingEscrows) {
      const holdings = app.assetsHeld.map((holding) => `${holding.assetId}:${holding.amount}`).join(', ')
      const owner = escrow.ownerAppId === Number(appIds.wallet)
        ? 'DAO wallet'
        : escrow.ownerAppId !== undefined
          ? `app ${escrow.ownerAppId}`
          : escrow.ownerKind
      console.log(`  escrow ${escrow.id} owner=${owner} holdings=${holdings}`)
    }
  }

  if (assetBlockers.length > 0) {
    console.log('\nAsset destroy blockers:')
    for (const asset of assetBlockers) {
      console.log(`  ${asset.id} ${asset.unitName ?? asset.name ?? ''}: ${asset.nonZeroHolders} non-zero holders`)
      for (const holder of asset.holderSample.slice(0, 5)) console.log(`    ${holder.address}: ${holder.amount}`)
    }
  }
}

export async function discoverDeployerInventory(network: AkitaNetwork, deployer: string): Promise<{
  deployer: string
  apps: AppNode[]
  assets: AssetNode[]
  escrows: EscrowNode[]
}> {
  setCurrentNetwork(network)
  const indexer = getIndexer(network)
  const algod = getAlgod(network)
  const appIds = getNetworkAppIds(network)

  const apps = await discoverApps(indexer, algod, deployer)
  const creatorAddresses = [deployer, ...apps.map((app) => app.address)]
  const assets = await discoverAssets(indexer, creatorAddresses)
  const escrows = (await Promise.all(apps.map((app) => getEscrowOwner(indexer, app, appIds)))).filter((x): x is EscrowNode => Boolean(x))

  return { deployer, apps, assets, escrows }
}

async function main() {
  const args = parseArgs()
  setCurrentNetwork(args.network)
  const appIds = getNetworkAppIds(args.network)
  const { apps, assets, escrows } = await discoverDeployerInventory(args.network, args.deployer)

  if (args.json) {
    console.log(JSON.stringify({ deployer: args.deployer, apps, assets, escrows }, null, 2))
    return
  }

  printPlan(apps, assets, escrows, appIds, args.deployer)
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}

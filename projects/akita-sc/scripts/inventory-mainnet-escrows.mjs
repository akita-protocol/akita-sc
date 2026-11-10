#!/usr/bin/env node
// Read-only inventory: HTTP GET only, no account configuration, signer or transactions.
// Endpoints were discovered through VibeKit get_network(mainnet).
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import algosdk from 'algosdk'

const argv = process.argv.slice(2)
const option = key => { const i = argv.indexOf(key); return i < 0 ? undefined : argv[i + 1] }
if (option('--network') !== 'mainnet' || !option('--output')) {
  throw new Error('Usage: node scripts/inventory-mainnet-escrows.mjs --network mainnet --output SNAPSHOT.json [--factory-id ID] [--dao-id ID]')
}
const factoryId = BigInt(option('--factory-id') ?? '3569555755')
const daoId = BigInt(option('--dao-id') ?? '3569556034')
if (factoryId <= 0n || daoId <= 0n) throw new Error('App IDs must be positive')
const endpoints = { algod: 'https://mainnet-api.4160.nodely.dev', indexer: 'https://mainnet-idx.4160.nodely.dev' }
const output = path.resolve(option('--output'))
if (fs.existsSync(output)) throw new Error('Choose a new output path; snapshots are not overwritten')
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
const walletSpec = JSON.parse(fs.readFileSync(path.join(root, 'projects/akita-sc/smart_contracts/artifacts/arc58/account/AbstractedAccount.arc56.json'), 'utf8'))
const daoSpec = JSON.parse(fs.readFileSync(path.join(root, 'projects/akita-sc/smart_contracts/artifacts/arc58/dao/AkitaDAO.arc56.json'), 'utf8'))
const requests = []
const address = id => algosdk.getApplicationAddress(BigInt(id)).toString()
const bytes = value => Buffer.from(value, 'base64')
const json = value => JSON.stringify(value, (_, v) => typeof v === 'bigint' ? v.toString() : v, 2) + '\n'

async function get(service, route, missingAllowed = false) {
  const url = `${endpoints[service]}${route}`
  for (let attempt = 0; attempt < 4; attempt++) {
    const response = await fetch(url, { method: 'GET', signal: AbortSignal.timeout(30_000) })
    if ((response.status === 429 || response.status >= 500) && attempt < 3) {
      await new Promise(resolve => setTimeout(resolve, 500 * 2 ** attempt)); continue
    }
    const text = await response.text()
    const entry = { url, observedAt: new Date().toISOString(), status: response.status }
    if (response.status === 404 && missingAllowed) { requests.push(entry); return null }
    if (!response.ok) throw new Error(`GET ${url}: ${response.status} ${text.slice(0,150)}`)
    const result = algosdk.parseJSON(text, { intDecoding: algosdk.IntDecoding.BIGINT })
    requests.push({ ...entry, round: result.round ?? result['current-round'] ?? result['last-round'] })
    return result
  }
}
async function batch(items, fn) {
  const results = []
  for (let i = 0; i < items.length; i += 4) {
    const group = await Promise.allSettled(items.slice(i, i + 4).map(fn))
    const errors = group.filter(r => r.status === 'rejected')
    if (errors.length) throw new AggregateError(errors.map(r => r.reason), 'Incomplete inventory')
    results.push(...group.map(r => r.value))
  }
  return results
}
async function pages(route, field) {
  let next; const seen = new Set(); const rows = []
  do {
    const page = await get('indexer', `${route}${next ? `&next=${encodeURIComponent(next)}` : ''}`)
    if (!Array.isArray(page[field])) throw new Error(`Missing ${field}: ${route}`)
    rows.push(...page[field]); next = page['next-token']
    if (next && seen.has(next)) throw new Error(`Repeated pagination token: ${route}`)
    if (next) seen.add(next)
    if (rows.length > 100_000) throw new Error(`Inventory limit reached: ${route}`)
  } while (next)
  return rows
}
function globalState(app) {
  return Object.fromEntries((app.params['global-state'] ?? []).map(e => [bytes(e.key).toString(), Number(e.value.type) === 2 ? e.value.uint : e.value.bytes]))
}
function tupleFields(spec, type, value) {
  const fields = spec.structs[type]
  return Object.fromEntries(fields.map((f, i) => [f.name, value[i]]))
}
function decodeStruct(spec, type, raw) {
  const fields = spec.structs[type]
  // The pinned ABI decoder expects offset-zero Uint8Arrays; Buffer slices can
  // otherwise decode dynamic offsets against the wrong backing-buffer position.
  return tupleFields(spec, type, algosdk.ABIType.from(`(${fields.map(f => f.type).join(',')})`).decode(Uint8Array.from(raw)))
}
async function boxes(appId) {
  const names = await pages(`/v2/applications/${appId}/boxes?limit=1000`, 'boxes')
  return batch(names, async ({ name }) => ({ name, ...(await get('algod', `/v2/applications/${appId}/box?name=${encodeURIComponent(`b64:${name}`)}`)) }))
}
function decodeWalletBox(box) {
  const name = bytes(box.name); const raw = bytes(box.value); const prefix = name.subarray(0,1).toString()
  try {
    if (prefix === 'e') {
      if (![9,41].includes(raw.length)) throw new Error(`Unknown membership length ${raw.length}`)
      const id = raw.readBigUInt64BE()
      return { ...box, kind: 'subAccount', key: name.subarray(1).toString(), valueBytes: raw.length,
        decoded: raw.length === 9 ? { id, address: address(id), locked: raw[8] !== 0, legacy: true }
          : { ...decodeStruct(walletSpec, 'EscrowInfo', raw), legacy: false } }
    }
    const types = { p: ['PluginKey','PluginInfo'], a: ['AllowanceKey','AllowanceInfo'], n: [null,'PluginKey'], x: [null,'ExecutionInfo'] }
    if (types[prefix]) {
      const [keyType,valueType] = types[prefix]
      return { ...box, kind: { p: 'plugin', a: 'allowance', n: 'namedPlugin', x: 'execution' }[prefix],
        key: keyType ? decodeStruct(walletSpec,keyType,name.subarray(1)) : name.subarray(1).toString('base64'), decoded: decodeStruct(walletSpec,valueType,raw) }
    }
    return { ...box, kind: 'other' }
  } catch (error) { return { ...box, kind: 'undecoded', error: error.message } }
}

const startedAt = new Date().toISOString()
const startStatus = await get('algod', '/v2/status')
const indexerHealth = await get('indexer', '/health')
const dao = await get('algod', `/v2/applications/${daoId}`)
const daoGlobals = globalState(dao)
const daoLists = Object.fromEntries([['aal','AkitaAppList'],['oal','OtherAppList'],['pal','PluginAppList'],['sal','AkitaSocialAppList']].map(([key,type]) => [key,decodeStruct(daoSpec,type,bytes(daoGlobals[key]))]))
if (daoLists.oal.escrow !== factoryId) {
  throw new Error(`DAO escrow factory ${daoLists.oal.escrow} does not match the selected factory ${factoryId}`)
}
const children = await pages(`/v2/applications?creator=${address(factoryId)}&include-all=true&limit=100`, 'applications')
console.log(`Found ${children.length} factory children, including deleted applications`)
const escrowAccounts = await batch(children, async app => {
  const id = app.id; const owner = globalState(app).creator; const creatorBytes = owner ? bytes(owner) : undefined
  const deleted = app.deleted === true
  const account = await get('algod', `/v2/accounts/${address(id)}`, deleted)
  const live = deleted ? null : await get('algod', `/v2/applications/${id}`)
  if (live && (live.params.creator !== address(factoryId) || globalState(live).creator !== owner)) {
    throw new Error(`Indexer/algod owner mismatch for escrow ${id}; repeat the snapshot`)
  }
  const registry = await get('algod', `/v2/applications/${factoryId}/box?name=${encodeURIComponent(`b64:${Buffer.from(algosdk.decodeAddress(address(id)).publicKey).subarray(0,16).toString('base64')}`)}`, true)
  return { id, address: address(id), ownerWalletId: creatorBytes?.length === 8 ? creatorBytes.readBigUInt64BE() : null,
    ownerPrefix: creatorBytes?.toString('hex'), deleted, indexedApplication: app, liveApplication: live, account, registry }
})
const ownerIds = [...new Set(escrowAccounts.map(e=>e.ownerWalletId).filter(x=>x !== null))]
const wallets = await batch(ownerIds, async id => {
  const app = await get('algod', `/v2/applications/${id}`)
  return { id, address: address(id), application: app, globalState: globalState(app), account: await get('algod', `/v2/accounts/${address(id)}`), boxes: (await boxes(id)).map(decodeWalletBox) }
})
console.log(`Read ${wallets.length} owner wallets and their complete box inventories`)
const undecoded = wallets.flatMap(w => w.boxes.filter(b => b.kind === 'undecoded').map(b => ({ wallet: w.id, name: b.name, error: b.error })))
if (undecoded.length) throw new Error(`Cannot report a complete migration inventory with undecoded wallet boxes: ${json(undecoded)}`)
const pluginIds = [...new Set(wallets.flatMap(w=>w.boxes.filter(b=>b.kind==='plugin').map(b=>b.key.plugin)))]
const plugins = await batch(pluginIds, async id => ({ id, application: await get('algod', `/v2/applications/${id}`), boxes: await boxes(id) }))
// Account local-state absence does not exclude liabilities stored in service boxes
// or factory children. Scan the related Akita services as a separate dependency set.
const needles = escrowAccounts.flatMap(e => [Buffer.from(algosdk.decodeAddress(e.address).publicKey), Buffer.from(algosdk.encodeUint64(e.id))])
const referencesEscrow = raw => needles.some(needle => raw.includes(needle))
const serviceBoxes = await batch(['staking','subscriptions','rewards'], async field => {
  const id = daoLists.aal[field]; const all = await boxes(id)
  const matches = all.filter(b => referencesEscrow(bytes(b.name)) || referencesEscrow(bytes(b.value)))
  if (field === 'rewards') {
    const ownedIds = new Set(matches.filter(b => bytes(b.name)[0] === 100 && bytes(b.name).length === 9).map(b => bytes(b.name).readBigUInt64BE(1).toString()))
    for (const b of all) {
      const key = bytes(b.name)
      // UserAllocationsKey = address + asset ID + disbursement ID.
      if (key[0] === 117 && key.length === 49 && ownedIds.has(key.readBigUInt64BE(41).toString()) && !matches.includes(b)) matches.push(b)
    }
  }
  return { field, id, application: await get('algod', `/v2/applications/${id}`), scanned: all.length, matches }
})
const factoryDependencies = await batch(['auction','raffle','marketplace','pool','prizeBox','poll'], async field => {
  const id = field === 'poll' ? daoLists.oal.poll : daoLists.aal[field]
  const all = await pages(`/v2/applications?creator=${address(id)}&include-all=true&limit=100`, 'applications')
  return { field, id, application: await get('algod', `/v2/applications/${id}`), scanned: all.length, matches: all.filter(app => (app.params['global-state']??[]).some(e => Number(e.value.type) === 1
    ? referencesEscrow(bytes(e.value.bytes)) : escrowAccounts.some(child => child.id === e.value.uint))) }
})
const otherReferences = await batch([
  { field:'walletFactory', id:daoLists.aal.wallet }, { field:'social', id:daoLists.sal.social },
  { field:'hyperSwap', id:daoLists.aal.hyperSwap }, { field:'akitaNfd', id:daoLists.oal.akitaNfd },
], async item => ({ ...item, application:await get('algod', `/v2/applications/${item.id}`) }))
// Prior RevenueManager generations can contain configuration absent from the
// current installed plugin. IDs come from MAINNET_PLUGIN_DEPLOYMENTS.
const historicalRevenueIds = [3368395771n,3569559335n,3633281195n].filter(id=>!pluginIds.includes(id))
const historicalRevenue = await batch(historicalRevenueIds, async id => {
  const app = await get('algod', `/v2/applications/${id}`, true)
  return { id, application: app, boxes: app ? await boxes(id) : [] }
})
const escrowIdsAtEnd = (await pages(`/v2/applications?creator=${address(factoryId)}&include-all=true&limit=100`, 'applications')).map(app=>app.id.toString()).sort()
if (JSON.stringify(escrowIdsAtEnd) !== JSON.stringify(children.map(app=>app.id.toString()).sort())) throw new Error('Factory child inventory changed during collection; repeat the snapshot')
const assetIds = [...new Set(escrowAccounts.flatMap(e=>[...(e.account?.assets??[]).map(a=>a['asset-id']),...(e.account?.['created-assets']??[]).map(a=>a.index)]))]
const assets = await batch(assetIds, async id => ({ id, asset: await get('algod', `/v2/assets/${id}`, true) }))
const factory = await get('algod', `/v2/applications/${factoryId}`)
const factoryAccount = await get('algod', `/v2/accounts/${address(factoryId)}`)
const endStatus = await get('algod', '/v2/status')
const snapshot = { kind: 'mainnet-legacy-escrow-inventory', startedAt, completedAt: new Date().toISOString(), network: 'mainnet', endpoints,
  factoryId, factoryAddress: address(factoryId), daoId, startStatus, endStatus, indexerHealth,
  consistency: 'Sequential read-only observations, not a single-round ledger snapshot. Recheck all balances, auth addresses, grants and inflows before execution.',
  dao, daoGlobals, daoLists, factory, factoryAccount,
  escrowAccounts, wallets, plugins, historicalRevenue, serviceBoxes, factoryDependencies, otherReferences, assets, requests }
fs.mkdirSync(path.dirname(output), { recursive: true })
fs.writeFileSync(output,json(snapshot),{ flag:'wx' })
console.log(JSON.stringify({output,escrows:children.length,wallets:wallets.length,plugins:plugins.length,assets:assets.length,requests:requests.length}))

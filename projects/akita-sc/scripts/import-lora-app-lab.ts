#!/usr/bin/env node

import { AlgorandClient } from '@algorandfoundation/algokit-utils'
import { ChildProcess, execFile, spawn } from 'child_process'
import { existsSync } from 'fs'
import fs from 'fs/promises'
import net from 'net'
import os from 'os'
import path from 'path'

type Network = 'localnet' | 'testnet' | 'mainnet'

type ContractSummary = {
  appId?: string
  address?: string
}

type DeploymentSummary = {
  network: Network
  contracts: Record<string, unknown>
}

type LoraAppInterface = {
  applicationId: string
  name: string
  appSpecVersions: Array<{
    standard: 'ARC-56'
    appSpec: unknown
  }>
  lastModified: number
}

type ImportOptions = {
  network?: Network
  summaryPath?: string
  loraUrl: string
  cdpUrl?: string
  chromePath?: string
  chromeUserDataDir: string
  chromeProfileDirectory?: string
  relaunchBrowser: boolean
  keepBrowserOpen: boolean
}

const DEFAULT_BRAVE_PATH = '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser'
const DEFAULT_BRAVE_USER_DATA_DIR = path.join(os.homedir(), 'Library/Application Support/BraveSoftware/Brave-Browser')
const DEFAULT_BRAVE_AKITA_PROFILE_DIRECTORY = 'Profile 1'

const CONTRACT_SPEC_BY_SUMMARY_KEY: Record<string, string> = {
  dao: 'AkitaDAO',
  proposalValidator: 'AkitaDAOProposalValidator',
  wallet: 'AbstractedAccount',
  escrowFactory: 'EscrowFactory',
  walletFactory: 'AbstractedAccountFactory',
  rewards: 'Rewards',
  subscriptions: 'Subscriptions',
  stakingPoolFactory: 'StakingPoolFactory',
  staking: 'Staking',
  social: 'AkitaSocial',
  socialGraph: 'AkitaSocialGraph',
  socialImpact: 'AkitaSocialImpact',
  socialModeration: 'AkitaSocialModeration',
  auctionFactory: 'AuctionFactory',
  marketplace: 'Marketplace',
  raffleFactory: 'RaffleFactory',
  pollFactory: 'PollFactory',
  prizeBoxFactory: 'PrizeBoxFactory',
  revenueManagerPlugin: 'RevenueManagerPlugin',
  updatePlugin: 'UpdateAkitaDAOPlugin',
  optInPlugin: 'OptInPlugin',
  selfOptInPlugin: 'SelfOptInPlugin',
  asaMintPlugin: 'AsaMintPlugin',
  payPlugin: 'PayPlugin',
  haystackRouterPlugin: 'HaystackRouterPlugin',
  hyperSwapPlugin: 'HyperSwapPlugin',
  subscriptionsPlugin: 'SubscriptionsPlugin',
  auctionPlugin: 'AuctionPlugin',
  daoPlugin: 'AkitaDAOPlugin',
  dualStakePlugin: 'DualStakePlugin',
  gatePlugin: 'GatePlugin',
  marketplacePlugin: 'MarketplacePlugin',
  nfdPlugin: 'NFDPlugin',
  paySiloPlugin: 'PaySiloPlugin',
  paySiloFactoryPlugin: 'PaySiloFactoryPlugin',
  pollPlugin: 'PollPluginContract',
  rafflePlugin: 'RafflePlugin',
  rewardsPlugin: 'RewardsPlugin',
  socialPlugin: 'AkitaSocialPlugin',
  stakingPlugin: 'StakingPlugin',
  stakingPoolPlugin: 'StakingPoolPlugin',
  gate: 'Gate',
  hyperSwap: 'HyperSwap',
  metaMerkles: 'MetaMerkles',
  akitaReferrerGate: 'AkitaReferrerGate',
  assetGate: 'AssetGate',
  merkleAddressGate: 'MerkleAddressGate',
  merkleAssetGate: 'MerkleAssetGate',
  nfdGate: 'NFDGate',
  nfdRootGate: 'NFDRootGate',
  pollGate: 'PollGate',
  socialActivityGate: 'SocialActivityGate',
  socialFollowerCountGate: 'SocialFollowerCountGate',
  socialFollowerIndexGate: 'SocialFollowerIndexGate',
  socialImpactGate: 'SocialImpactGate',
  socialModeratorGate: 'SocialModeratorGate',
  stakingAmountGate: 'StakingAmountGate',
  stakingPowerGate: 'StakingPowerGate',
  subscriptionGate: 'SubscriptionGate',
  subscriptionStreakGate: 'SubscriptionStreakGate',
}

function parseArgs(): ImportOptions {
  const args = process.argv.slice(2)
  const options: ImportOptions = {
    loraUrl: process.env.LORA_URL ?? 'https://lora.algokit.io',
    cdpUrl: process.env.LORA_CDP_URL,
    chromePath: process.env.LORA_CHROME_PATH ?? DEFAULT_BRAVE_PATH,
    chromeUserDataDir: process.env.LORA_CHROME_USER_DATA_DIR ?? DEFAULT_BRAVE_USER_DATA_DIR,
    chromeProfileDirectory: process.env.LORA_CHROME_PROFILE_DIRECTORY ?? DEFAULT_BRAVE_AKITA_PROFILE_DIRECTORY,
    relaunchBrowser: process.env.LORA_RELAUNCH_BROWSER === '1',
    keepBrowserOpen: process.env.LORA_CLOSE_BROWSER !== '1',
  }

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (arg === '--network' || arg === '-n') {
      options.network = args[++i] as Network
    } else if (arg === '--summary') {
      options.summaryPath = args[++i]
    } else if (arg === '--lora-url') {
      options.loraUrl = args[++i]
    } else if (arg === '--cdp-url') {
      options.cdpUrl = args[++i]
    } else if (arg === '--chrome-path') {
      options.chromePath = args[++i]
    } else if (arg === '--chrome-user-data-dir') {
      options.chromeUserDataDir = args[++i]
    } else if (arg === '--chrome-profile-directory') {
      options.chromeProfileDirectory = args[++i]
    } else if (arg === '--relaunch-browser') {
      options.relaunchBrowser = true
    } else if (arg === '--close-browser') {
      options.keepBrowserOpen = false
    } else if (arg === '--help' || arg === '-h') {
      console.log(`
Usage: ts-node --transpile-only scripts/import-lora-app-lab.ts [options]

Options:
  --network, -n <network>          Network to import for (localnet, testnet, mainnet)
  --summary <path>                 Deployment summary JSON path. Defaults to latest for network
  --lora-url <url>                 Lora URL. Default: https://lora.algokit.io
  --cdp-url <url>                  Existing Chrome DevTools URL, e.g. http://127.0.0.1:9222
  --chrome-path <path>             Chrome/Chromium executable path. Default: Brave
  --chrome-user-data-dir <path>    Browser user data dir. Default: Brave Browser data dir
  --chrome-profile-directory <dir> Browser profile directory. Default: "Profile 1" (Akita)
  --relaunch-browser               Quit Brave first if the profile is already running
  --close-browser                  Close the browser after import
`)
      process.exit(0)
    }
  }

  return options
}

async function latestSummaryPath(network?: Network): Promise<string> {
  const files = await fs.readdir(process.cwd())
  const candidates = files
    .filter((file) => file.startsWith(`deployment-summary-${network ?? ''}`) && file.endsWith('.json'))
    .map((file) => ({
      file,
      timestamp: Number(file.match(/-(\d+)\.json$/)?.[1] ?? 0),
    }))
    .sort((a, b) => b.timestamp - a.timestamp)

  if (candidates.length === 0) {
    throw new Error(`Could not find a deployment-summary${network ? `-${network}` : ''}-*.json file`)
  }
  return candidates[0].file
}

async function readSummary(options: ImportOptions): Promise<{ summary: DeploymentSummary; summaryPath: string }> {
  const summaryPath = options.summaryPath ?? await latestSummaryPath(options.network)
  const summary = JSON.parse(await fs.readFile(summaryPath, 'utf-8')) as DeploymentSummary
  if (options.network && summary.network !== options.network) {
    throw new Error(`Summary network is ${summary.network}, expected ${options.network}`)
  }
  return { summary, summaryPath }
}

function flattenContracts(contracts: Record<string, unknown>): Array<{ key: string; summary: ContractSummary }> {
  const flattened: Array<{ key: string; summary: ContractSummary }> = []
  for (const [key, value] of Object.entries(contracts)) {
    if (!value || typeof value !== 'object') continue
    if ('appId' in value) {
      flattened.push({ key, summary: value as ContractSummary })
      continue
    }
    for (const [nestedKey, nestedValue] of Object.entries(value as Record<string, unknown>)) {
      if (nestedValue && typeof nestedValue === 'object' && 'appId' in nestedValue) {
        flattened.push({ key: nestedKey, summary: nestedValue as ContractSummary })
      }
    }
  }
  return flattened
}

async function findArc56Specs(): Promise<Map<string, string>> {
  const specs = new Map<string, string>()
  const artifactsDir = path.join(process.cwd(), 'smart_contracts/artifacts')

  async function walk(dir: string) {
    const entries = await fs.readdir(dir, { withFileTypes: true })
    for (const entry of entries) {
      const entryPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        await walk(entryPath)
      } else if (entry.isFile() && entry.name.endsWith('.arc56.json')) {
        const appSpec = JSON.parse(await fs.readFile(entryPath, 'utf-8')) as { name?: string }
        if (appSpec.name && !entryPath.includes('/mocks/')) {
          const existing = specs.get(appSpec.name)
          if (!existing || existing.includes('/arc58/plugins/social/')) {
            specs.set(appSpec.name, entryPath)
          }
        }
      }
    }
  }

  await walk(artifactsDir)
  return specs
}

async function buildLoraEntries(summary: DeploymentSummary): Promise<{ entries: LoraAppInterface[]; missing: string[] }> {
  const specsByName = await findArc56Specs()
  const now = Date.now()
  const missing: string[] = []
  const entries: LoraAppInterface[] = []

  for (const { key, summary: contract } of flattenContracts(summary.contracts)) {
    if (!contract.appId || contract.appId === 'N/A' || contract.appId === 'See DAO akitaAppList') continue
    const specName = CONTRACT_SPEC_BY_SUMMARY_KEY[key]
    if (!specName) continue
    const specPath = specsByName.get(specName)
    if (!specPath) {
      missing.push(`${key} (${specName})`)
      continue
    }
    const appSpec = JSON.parse(await fs.readFile(specPath, 'utf-8'))
    entries.push({
      applicationId: contract.appId,
      name: specName,
      appSpecVersions: [{ standard: 'ARC-56', appSpec }],
      lastModified: now,
    })
  }

  return { entries, missing }
}

async function getGenesisHash(network: Network): Promise<string> {
  const algorand = network === 'testnet'
    ? AlgorandClient.testNet()
    : network === 'mainnet'
      ? AlgorandClient.mainNet()
      : AlgorandClient.fromEnvironment()
  const version = await algorand.client.algod.version()
  return Buffer.from(version.genesisHashB64).toString('base64')
}

async function getFreePort(): Promise<number> {
  return await new Promise((resolve, reject) => {
    const server = net.createServer()
    server.listen(0, '127.0.0.1')
    server.on('listening', () => {
      const address = server.address()
      server.close(() => resolve(typeof address === 'object' && address ? address.port : 9222))
    })
    server.on('error', reject)
  })
}

function findChromePath(chromePath?: string): string {
  const candidates = [
    chromePath,
    '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ].filter(Boolean) as string[]
  const found = candidates.find((candidate) => existsSync(candidate))
  if (!found) {
    throw new Error('Could not find Chrome/Chromium. Set LORA_CHROME_PATH or pass --chrome-path.')
  }
  return found
}

function isBrowserProfileLocked(userDataDir: string): boolean {
  return existsSync(path.join(userDataDir, 'SingletonLock'))
    || existsSync(path.join(userDataDir, 'SingletonSocket'))
    || existsSync(path.join(userDataDir, 'SingletonCookie'))
}

async function runCommand(command: string, args: string[]): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    execFile(command, args, (error) => {
      if (error) reject(error)
      else resolve()
    })
  })
}

async function quitBrave(): Promise<void> {
  if (process.platform === 'darwin') {
    await runCommand('osascript', ['-e', 'tell application "Brave Browser" to quit'])
  } else {
    await runCommand('pkill', ['-f', 'Brave Browser'])
  }
}

async function waitForBrowserProfileUnlock(userDataDir: string): Promise<void> {
  const deadline = Date.now() + 15_000
  while (Date.now() < deadline) {
    if (!isBrowserProfileLocked(userDataDir)) return
    await new Promise((resolve) => setTimeout(resolve, 500))
  }
  throw new Error('Brave profile is still locked after requesting Brave to quit.')
}

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init)
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} from ${url}`)
  }
  return await response.json() as T
}

async function waitForCdp(cdpUrl: string): Promise<string> {
  const deadline = Date.now() + 15_000
  while (Date.now() < deadline) {
    try {
      const version = await fetchJson<{ webSocketDebuggerUrl: string }>(`${cdpUrl}/json/version`)
      return version.webSocketDebuggerUrl
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 250))
    }
  }
  throw new Error(`Chrome DevTools did not become available at ${cdpUrl}`)
}

async function openBrowser(options: ImportOptions, url: string): Promise<{ cdpUrl: string; browser?: ChildProcess }> {
  if (options.cdpUrl) {
    return { cdpUrl: options.cdpUrl }
  }

  if (options.relaunchBrowser && isBrowserProfileLocked(options.chromeUserDataDir)) {
    console.log('🧪 Brave profile is already running; quitting Brave before Lora import...')
    await quitBrave()
    await waitForBrowserProfileUnlock(options.chromeUserDataDir)
  }

  const port = await getFreePort()
  const cdpUrl = `http://127.0.0.1:${port}`
  const args = [
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${options.chromeUserDataDir}`,
    ...(options.chromeProfileDirectory ? [`--profile-directory=${options.chromeProfileDirectory}`] : []),
    '--no-first-run',
    '--no-default-browser-check',
    url,
  ]
  const browser = spawn(findChromePath(options.chromePath), args, {
    detached: true,
    stdio: 'ignore',
  })
  browser.unref()
  try {
    await waitForCdp(cdpUrl)
  } catch (error) {
    const profileLocked = isBrowserProfileLocked(options.chromeUserDataDir)
    if (profileLocked) {
      throw new Error(
        `Brave did not open a DevTools port because the profile is already running. ` +
        `Quit Brave completely, then rerun this command. ` +
        `Alternatively start Brave yourself with --remote-debugging-port and pass LORA_CDP_URL.`
      )
    }
    throw error
  }
  return { cdpUrl, browser }
}

type CdpClient = {
  send: <T>(method: string, params?: Record<string, unknown>) => Promise<T>
  close: () => void
}

async function createCdpClient(webSocketUrl: string): Promise<CdpClient> {
  const ws = new WebSocket(webSocketUrl)
  await new Promise<void>((resolve, reject) => {
    ws.addEventListener('open', () => resolve(), { once: true })
    ws.addEventListener('error', () => reject(new Error('Could not connect to Chrome DevTools')), { once: true })
  })

  let id = 0
  const pending = new Map<number, { resolve: (value: unknown) => void; reject: (error: Error) => void }>()
  ws.addEventListener('message', (event) => {
    const message = JSON.parse(String(event.data))
    if (!message.id) return
    const request = pending.get(message.id)
    if (!request) return
    pending.delete(message.id)
    if (message.error) {
      request.reject(new Error(message.error.message))
    } else {
      request.resolve(message.result)
    }
  })

  return {
    send: async <T>(method: string, params: Record<string, unknown> = {}) => {
      const requestId = ++id
      ws.send(JSON.stringify({ id: requestId, method, params }))
      return await new Promise<T>((resolve, reject) => {
        pending.set(requestId, { resolve: resolve as (value: unknown) => void, reject })
      })
    },
    close: () => ws.close(),
  }
}

async function importIntoLora(options: ImportOptions, network: Network, dbName: string, entries: LoraAppInterface[]) {
  const loraStorageUrl = `${options.loraUrl.replace(/\/$/, '')}/robots.txt`
  const appLabUrl = `${options.loraUrl.replace(/\/$/, '')}/${network}/app-lab`
  const { cdpUrl, browser } = await openBrowser(options, loraStorageUrl)
  const target = await fetchJson<{ webSocketDebuggerUrl: string }>(
    `${cdpUrl}/json/new?${encodeURIComponent(loraStorageUrl)}`,
    { method: 'PUT' },
  )
    const client = await createCdpClient(target.webSocketDebuggerUrl)

  try {
    await client.send('Page.enable')
    await client.send('Page.navigate', { url: loraStorageUrl })
    await new Promise((resolve) => setTimeout(resolve, 2_000))

    const payload = { dbName, entries }
    const expression = `
      (async (payload) => {
        const openDb = () => new Promise((resolve, reject) => {
          const request = indexedDB.open(payload.dbName, 3)
          request.onupgradeneeded = () => {
            const db = request.result
            if (!db.objectStoreNames.contains('app-interfaces')) {
              db.createObjectStore('app-interfaces', { keyPath: 'applicationId' })
            }
          }
          request.onsuccess = () => resolve(request.result)
          request.onerror = () => reject(request.error)
        })
        const requestToPromise = (request) => new Promise((resolve, reject) => {
          request.onsuccess = () => resolve(request.result)
          request.onerror = () => reject(request.error)
        })
        const db = await openDb()
        const tx = db.transaction('app-interfaces', 'readwrite')
        const store = tx.objectStore('app-interfaces')
        for (const entry of payload.entries) {
          await requestToPromise(store.put(entry))
        }
        await new Promise((resolve, reject) => {
          tx.oncomplete = () => resolve()
          tx.onerror = () => reject(tx.error)
          tx.onabort = () => reject(tx.error)
        })
        return { count: payload.entries.length, dbName: payload.dbName }
      })(${JSON.stringify(payload)})
    `
    const result = await client.send<{
      result?: { value?: { count: number; dbName: string } }
      exceptionDetails?: { text?: string }
    }>('Runtime.evaluate', {
      expression,
      awaitPromise: true,
      returnByValue: true,
    })

    if (result.exceptionDetails) {
      throw new Error(result.exceptionDetails.text ?? 'Lora import failed')
    }
    console.log(`🧪 Lora App Lab imported ${result.result?.value?.count ?? entries.length} app interface(s) into ${dbName}`)
    console.log(`🔗 Lora App Lab: ${appLabUrl}`)
  } finally {
    client.close()
    if (!options.keepBrowserOpen && browser) {
      browser.kill()
    }
  }
}

export async function importLoraAppLab(options: ImportOptions) {
  const { summary, summaryPath } = await readSummary(options)
  const network = options.network ?? summary.network
  const [{ entries, missing }, genesisHash] = await Promise.all([
    buildLoraEntries(summary),
    getGenesisHash(network),
  ])

  if (entries.length === 0) {
    throw new Error(`No Lora App Lab entries could be built from ${summaryPath}`)
  }

  if (missing.length > 0) {
    console.warn(`⚠️  Missing ARC-56 artifacts for: ${missing.join(', ')}`)
  }

  await importIntoLora(options, network, `${network}-${genesisHash}`, entries)
}

if (require.main === module) {
  importLoraAppLab(parseArgs()).catch((error) => {
    console.error('❌ Lora App Lab import failed:', error instanceof Error ? error.message : error)
    process.exit(1)
  })
}

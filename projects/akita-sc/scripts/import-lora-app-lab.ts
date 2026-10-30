#!/usr/bin/env node

// Imports the ARC-56 specs of a deployed universe into the App Lab of the Akita
// Lora fork (explorer.akita.community). The specs are served from a one-shot
// loopback server and the browser is pointed at the fork's
// /<network>/app-lab/import?source=... page, which stores them in its own
// IndexedDB and POSTs the result back here.

import { execFile, spawn } from 'child_process'
import { existsSync } from 'fs'
import fs from 'fs/promises'
import http from 'http'
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
  appSpec: unknown
}

type LoraImportResult = {
  imported: Array<{ applicationId: string; name: string }>
  failed: Array<{ applicationId: string; name: string; error: string }>
  error?: string
}

export type ImportOptions = {
  network?: Network
  summaryPath?: string
  loraUrl: string
  browserPath?: string
  browserProfileDirectory?: string
  openBrowser: boolean
  timeoutMs: number
}

export const DEFAULT_LORA_URL = 'https://explorer.akita.community'
const DEFAULT_BRAVE_PATH = '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser'
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
  asaManagerPlugin: 'AsaManagerPlugin',
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

export function loraOptionsFromEnv(overrides: Partial<ImportOptions> = {}): ImportOptions {
  return {
    loraUrl: process.env.LORA_URL ?? DEFAULT_LORA_URL,
    browserPath: process.env.LORA_CHROME_PATH ?? DEFAULT_BRAVE_PATH,
    browserProfileDirectory: process.env.LORA_CHROME_PROFILE_DIRECTORY ?? DEFAULT_BRAVE_AKITA_PROFILE_DIRECTORY,
    openBrowser: process.env.LORA_NO_OPEN !== '1',
    timeoutMs: Number(process.env.LORA_IMPORT_TIMEOUT_MS ?? 120_000),
    ...overrides,
  }
}

function parseArgs(): ImportOptions {
  const args = process.argv.slice(2)
  const options = loraOptionsFromEnv()

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (arg === '--network' || arg === '-n') {
      options.network = args[++i] as Network
    } else if (arg === '--summary') {
      options.summaryPath = args[++i]
    } else if (arg === '--lora-url') {
      options.loraUrl = args[++i]
    } else if (arg === '--chrome-path') {
      options.browserPath = args[++i]
    } else if (arg === '--chrome-profile-directory') {
      options.browserProfileDirectory = args[++i]
    } else if (arg === '--no-open') {
      options.openBrowser = false
    } else if (arg === '--timeout') {
      options.timeoutMs = Number(args[++i]) * 1000
    } else if (arg === '--help' || arg === '-h') {
      console.log(`
Usage: ts-node --transpile-only scripts/import-lora-app-lab.ts [options]

Options:
  --network, -n <network>          Network to import for (localnet, testnet, mainnet)
  --summary <path>                 Deployment summary JSON path. Defaults to latest for network
  --lora-url <url>                 Lora URL. Default: ${DEFAULT_LORA_URL} (LORA_URL)
  --chrome-path <path>             Chromium-based browser to open the import in. Default: Brave,
                                   falling back to the system default browser (LORA_CHROME_PATH)
  --chrome-profile-directory <dir> Browser profile to open it in. Default: "Profile 1" (Akita)
                                   (LORA_CHROME_PROFILE_DIRECTORY)
  --no-open                        Only print the import URL (LORA_NO_OPEN=1)
  --timeout <seconds>              How long to wait for Lora to confirm. Default: 120
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
    entries.push({ applicationId: contract.appId, name: specName, appSpec })
  }

  return { entries, missing }
}

function openUrl(options: ImportOptions, url: string) {
  // A Chromium binary hands the URL to the running instance when there is one, in the given profile
  if (options.browserPath && existsSync(options.browserPath)) {
    const args = [
      ...(options.browserProfileDirectory ? [`--profile-directory=${options.browserProfileDirectory}`] : []),
      url,
    ]
    spawn(options.browserPath, args, { detached: true, stdio: 'ignore' }).unref()
    return
  }
  const [command, args] = process.platform === 'darwin'
    ? ['open', [url]]
    : process.platform === 'win32'
      ? ['cmd', ['/c', 'start', '', url]]
      : ['xdg-open', [url]]
  execFile(command, args, () => {})
}

async function serveManifestUntilImported(
  options: ImportOptions,
  network: Network,
  entries: LoraAppInterface[],
): Promise<LoraImportResult> {
  const loraUrl = options.loraUrl.replace(/\/$/, '')
  const loraOrigin = new URL(loraUrl).origin
  const manifest = JSON.stringify({ appInterfaces: entries })
  const corsHeaders = {
    'Access-Control-Allow-Origin': loraOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    // Chrome's Private Network Access preflight for a public origin calling loopback
    'Access-Control-Allow-Private-Network': 'true',
  }

  let settle: (result: LoraImportResult) => void = () => {}
  const imported = new Promise<LoraImportResult>((resolve) => {
    settle = resolve
  })

  const server = http.createServer((req, res) => {
    if (req.url !== '/app-interfaces.json') {
      res.writeHead(404, corsHeaders).end()
    } else if (req.method === 'OPTIONS') {
      res.writeHead(204, corsHeaders).end()
    } else if (req.method === 'GET') {
      res.writeHead(200, { ...corsHeaders, 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }).end(manifest)
    } else if (req.method === 'POST') {
      let body = ''
      req.on('data', (chunk) => {
        body += chunk
      })
      req.on('end', () => {
        res.writeHead(204, corsHeaders).end()
        try {
          settle(JSON.parse(body) as LoraImportResult)
        } catch {
          settle({ imported: [], failed: [], error: 'Lora sent an unreadable import result' })
        }
      })
    } else {
      res.writeHead(405, corsHeaders).end()
    }
  })

  await new Promise<void>((resolve, reject) => {
    server.once('error', reject)
    server.listen(0, '127.0.0.1', () => resolve())
  })

  try {
    const address = server.address()
    const port = typeof address === 'object' && address ? address.port : 0
    const source = `http://127.0.0.1:${port}/app-interfaces.json`
    const importUrl = `${loraUrl}/${network}/app-lab/import?source=${encodeURIComponent(source)}`

    console.log(`🧪 Lora App Lab import: ${importUrl}`)
    if (options.openBrowser) openUrl(options, importUrl)

    let timer: NodeJS.Timeout | undefined
    const timeout = new Promise<never>((_, reject) => {
      timer = setTimeout(
        () => reject(new Error(`Lora did not confirm the import within ${Math.round(options.timeoutMs / 1000)}s. Is ${loraUrl} open in the browser?`)),
        options.timeoutMs,
      )
    })
    try {
      return await Promise.race([imported, timeout])
    } finally {
      clearTimeout(timer)
    }
  } finally {
    server.close()
  }
}

export async function importLoraAppLab(options: ImportOptions) {
  const { summary, summaryPath } = await readSummary(options)
  const network = options.network ?? summary.network
  const { entries, missing } = await buildLoraEntries(summary)

  if (entries.length === 0) {
    throw new Error(`No Lora App Lab entries could be built from ${summaryPath}`)
  }

  if (missing.length > 0) {
    console.warn(`⚠️  Missing ARC-56 artifacts for: ${missing.join(', ')}`)
  }

  const result = await serveManifestUntilImported(options, network, entries)
  if (result.error) {
    throw new Error(result.error)
  }
  for (const failure of result.failed) {
    console.warn(`⚠️  Lora rejected ${failure.name || failure.applicationId}: ${failure.error}`)
  }
  console.log(`🧪 Lora App Lab imported ${result.imported.length}/${entries.length} app interface(s)`)
  console.log(`🔗 Lora App Lab: ${options.loraUrl.replace(/\/$/, '')}/${network}/app-lab`)
}

if (require.main === module) {
  importLoraAppLab(parseArgs()).catch((error) => {
    console.error('❌ Lora App Lab import failed:', error instanceof Error ? error.message : error)
    process.exit(1)
  })
}

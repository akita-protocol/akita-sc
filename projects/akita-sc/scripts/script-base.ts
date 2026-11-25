#!/usr/bin/env node

/**
 * Shared scaffolding for deployment and update scripts.
 *
 * Extracts the boilerplate that every script repeats:
 *   - CLI argument parsing
 *   - Algorand client creation
 *   - Account / signer setup (localnet fixture or mnemonic)
 *   - Balance check
 *   - DAO + UpdateAkitaDAO plugin initialization
 *   - Standard update flow (compile → build execution → propose → execute → verify)
 */

import { AlgorandClient, microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { getNetworkAppIds, SDKClient, setCurrentNetwork, type AkitaNetwork } from 'akita-sdk'
import { AkitaDaoSDK, ProposalAction, ProposalActionEnum } from 'akita-sdk/dao'
import { CallerType, pendingUpgradeBoxBytes, UpdateAkitaDAOPluginSDK, type UpgradeDaoBinding } from 'akita-sdk/wallet'
import algosdk, { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import { executeProposal, getAppFundingNeeded, proposeAndExecute } from './utils'
import { recordedLease } from './lib/execution-lease'
import { ALL_PHASE2_TARGETS, childPushProblems, createSignatures, daoBindingMode, rebuildRecordedExecution } from './lib/principal-rollout'

export type Network = AkitaNetwork

const BLOCKWATCHER_APP_FIELDS: Record<string, string> = {
  social: 'Social',
  socialGraph: 'SocialGraph',
  socialPlugin: 'SocialPlugin',
}

export interface ScriptOptions {
  network: Network
  mnemonic?: string
  version: string
  dryRun?: boolean
  algodToken?: string
  proposalId?: bigint
  sender?: string
  daoAppId?: bigint
}

export interface ScriptContext {
  options: ScriptOptions
  algorand: AlgorandClient
  sender: string
  signer: algosdk.TransactionSigner
  appIds: ReturnType<typeof getNetworkAppIds>
  dao: AkitaDaoSDK
  updatePlugin: UpdateAkitaDAOPluginSDK
}

/** Regenerate the Go selector tables from the compiled ARC-56 artifacts. */
export async function syncIndexerMethodSelectors(): Promise<void> {
  const path = await import('path')
  const { execFile } = await import('child_process')
  const { promisify } = await import('util')
  const execFileAsync = promisify(execFile)
  const rnRoot = path.resolve(__dirname, '../../../../akita-rn')
  const generator = path.join(rnRoot, 'scripts/generate-method-selectors.js')

  const { stdout, stderr } = await execFileAsync(process.execPath, [generator], { cwd: rnRoot })
  if (stdout.trim()) console.log(stdout.trim())
  if (stderr.trim()) console.warn(stderr.trim())
  console.log('Blockwatcher selector mappings synchronized from ARC-56 artifacts\n')
}

/**
 * Fields of akita-backend's contract registry (server/contract_networks.go), keyed by SDK key. A list field
 * keeps every historical id (wallets and old disbursements still reference them); a scalar field is replaced.
 */
const BACKEND_APP_FIELDS: Record<string, { field: string; list: boolean }> = {
  subscriptions: { field: 'SubscriptionsAppID', list: false },
  subscriptionsPlugin: { field: 'SubscriptionsPluginAppIDs', list: true },
  rewards: { field: 'RewardsAppIDs', list: true },
}

/**
 * `source` (akita-backend server/contract_networks.go) with `appId` recorded for `key` on `network`;
 * undefined when nothing changes (unmapped key, or the id is already listed).
 */
export function updateBackendRegistry(source: string, network: Network, key: string, appId: bigint): string | undefined {
  const target = BACKEND_APP_FIELDS[key]
  if (!target || network === 'localnet') return undefined
  const blockStart = source.indexOf(`\t"${network}": {`)
  if (blockStart === -1) throw new Error(`Could not find akita-backend contractNetworks[${network}]`)
  const blockEnd = source.indexOf('\n\t},', blockStart)
  if (blockEnd === -1) throw new Error(`Could not parse akita-backend contractNetworks[${network}]`)

  const block = source.slice(blockStart, blockEnd)
  const pattern = target.list
    ? new RegExp(`(\\b${target.field}:\\s*\\[\\]uint64\\{)([\\d,\\s]*)(\\})`)
    : new RegExp(`(\\b${target.field}:\\s*)(\\d+)()`)
  const match = block.match(pattern)
  if (!match) throw new Error(`Could not find akita-backend contractNetworks[${network}].${target.field}`)

  let value = String(appId)
  if (target.list) {
    const ids = match[2].split(',').map((id) => id.trim()).filter(Boolean)
    if (ids.includes(value)) return undefined
    value = [...ids, value].join(', ')
  } else if (match[2] === value) {
    return undefined
  }
  return source.slice(0, blockStart) + block.replace(pattern, `$1${value}$3`) + source.slice(blockEnd)
}

/** Keep akita-backend's contract registry aligned with SDK deployment metadata. */
async function recordBackendAppID(network: Network, key: string, appId: bigint): Promise<void> {
  if (!BACKEND_APP_FIELDS[key] || network === 'localnet') return
  const fs = await import('fs/promises')
  const path = await import('path')
  const registryPath = path.resolve(__dirname, '../../../../akita-backend/server/contract_networks.go')
  const next = updateBackendRegistry(await fs.readFile(registryPath, 'utf8'), network, key, appId)
  if (next === undefined) return
  await fs.writeFile(registryPath, next, 'utf8')
  console.log(`Recorded akita-backend contractNetworks[${network}].${BACKEND_APP_FIELDS[key].field} += ${appId}`)
}

/** Keep blockwatcher's baked-in network IDs aligned with SDK deployment metadata. */
async function recordBlockwatcherAppID(network: Network, key: string, appId: bigint): Promise<void> {
  const field = BLOCKWATCHER_APP_FIELDS[key]
  if (!field || network === 'localnet') return

  const fs = await import('fs/promises')
  const path = await import('path')
  const networksPath = path.resolve(__dirname, '../../../../blockwatcher/server/networks.go')
  const source = await fs.readFile(networksPath, 'utf8')
  const blockStart = source.indexOf(`\t"${network}": {`)
  if (blockStart === -1) throw new Error(`Could not find blockwatcher ${network} network config`)
  const blockEnd = source.indexOf('\n\t},', blockStart)
  if (blockEnd === -1) throw new Error(`Could not parse blockwatcher ${network} network config`)

  const block = source.slice(blockStart, blockEnd)
  const fieldPattern = new RegExp(`(\\b${field}\\s*:\\s*)\\d+`)
  if (!fieldPattern.test(block)) {
    throw new Error(`Could not find blockwatcher NetworkConfigs[${network}].${field}`)
  }
  const nextBlock = block.replace(fieldPattern, `$1${appId}`)
  if (nextBlock !== block) {
    await fs.writeFile(networksPath, source.slice(0, blockStart) + nextBlock + source.slice(blockEnd), 'utf8')
    console.log(`Recorded blockwatcher NetworkConfigs[${network}].${field}=${appId}`)
  }
}

/**
 * Parse standard CLI arguments shared by all scripts.
 * Returns ScriptOptions with network, mnemonic, version, dryRun.
 */
export function parseBaseArgs(scriptName: string, extraHelp?: string): ScriptOptions {
  const args = process.argv.slice(2)
  let network: Network = 'localnet'
  let mnemonic: string | undefined = process.env.DEPLOYER_MNEMONIC || process.env.MNEMONIC
  let version = '1.0.0'
  let dryRun = false
  let algodToken: string | undefined
  let proposalId: bigint | undefined
  let sender: string | undefined
  let daoAppId: bigint | undefined

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--network' || args[i] === '-n') {
      const v = args[i + 1]
      if (v && ['localnet', 'testnet', 'mainnet'].includes(v)) {
        network = v as Network
        i++
      } else {
        console.error(`Invalid network: ${v}. Must be one of: localnet, testnet, mainnet`)
        process.exit(1)
      }
    } else if (args[i] === '--dao-app-id') {
      daoAppId = BigInt(args[++i])
      if (daoAppId <= 0n) throw new Error('--dao-app-id must be positive')
    } else if (args[i] === '--sender') {
      sender = args[++i]
      if (!sender || !algosdk.isValidAddress(sender)) throw new Error('--sender must be a valid Algorand address')
    } else if (args[i] === '--mnemonic' || args[i] === '-m') {
      mnemonic = args[i + 1]
      i++
    } else if (args[i] === '--version' || args[i] === '-v') {
      version = args[i + 1]
      i++
    } else if (args[i] === '--token' || args[i] === '-t') {
      algodToken = args[i + 1]
      i++
    } else if (args[i] === '--proposal-id') {
      proposalId = BigInt(args[i + 1])
      i++
    } else if (args[i] === '--dry-run') {
      dryRun = true
    } else if (args[i] === '--help' || args[i] === '-h') {
      console.log(`
Usage: ts-node scripts/${scriptName} [options]

Options:
  --network, -n <network>     Network (localnet, testnet, mainnet). Default: localnet
  --mnemonic, -m <mnemonic>   Mnemonic phrase (required for testnet/mainnet)
  --version, -v <version>     New version string. Default: "1.0.0"
  --token, -t <token>         Algod API token (e.g. Nodely API key)
  --proposal-id <id>          Resume an existing upgrade proposal instead of creating one
  --sender <address>          Read-only sender for --dry-run
  --dao-app-id <id>           Explicit DAO ID, e.g. a LocalNet deployment
  --dry-run                   Compile and prepare but don't execute
  --help, -h                  Show this help message
${extraHelp || ''}`)
      process.exit(0)
    }
  }

  if (network !== 'localnet' && !mnemonic && !dryRun) {
    console.error('Error: --mnemonic is required for testnet and mainnet (not required for --dry-run)')
    process.exit(1)
  }

  return { network, mnemonic, version, dryRun, algodToken, proposalId, sender, daoAppId }
}

/** Create an AlgorandClient for the given network. */
export function createAlgorandClient(network: Network, algodToken?: string): AlgorandClient {
  if (algodToken) {
    const servers: Record<string, string> = {
      testnet: 'https://testnet-api.4160.nodely.dev',
      mainnet: 'https://mainnet-api.4160.nodely.dev',
    }
    const indexers: Record<string, string> = {
      testnet: 'https://testnet-idx.4160.nodely.dev',
      mainnet: 'https://mainnet-idx.4160.nodely.dev',
    }
    const server = servers[network]
    if (server) {
      return AlgorandClient.fromConfig({
        algodConfig: { server, port: 443, token: algodToken },
        ...(indexers[network] ? { indexerConfig: { server: indexers[network], port: 443, token: algodToken } } : {}),
      })
    }
  }

  switch (network) {
    case 'testnet': return AlgorandClient.testNet()
    case 'mainnet': return AlgorandClient.mainNet()
    default: return process.env.ALGOD_SERVER ? AlgorandClient.fromEnvironment() : AlgorandClient.defaultLocalNet()
  }
}

/**
 * Set up the full script context: Algorand client, account/signer,
 * network SDK context, DAO SDK, and UpdateAkitaDAO plugin SDK.
 */
export async function setupContext(
  options: ScriptOptions,
  { minBalance = 5_000_000n }: { minBalance?: bigint } = {},
): Promise<ScriptContext> {
  const appIds = { ...getNetworkAppIds(options.network) }
  if (options.daoAppId) appIds.dao = options.daoAppId
  const algorand = createAlgorandClient(options.network, options.algodToken)

  let sender: string
  let signer: algosdk.TransactionSigner

  if (options.dryRun) {
    // Never load a secret or create/fund a fixture account during a dry run.
    sender = options.sender ?? ALGORAND_ZERO_ADDRESS_STRING
    signer = async () => { throw new Error('Dry-run context cannot sign transactions') }
  } else if (options.network === 'localnet') {
    const fixture = algorandFixture()
    await fixture.newScope()
    const account = fixture.context.testAccount as algosdk.Account
    sender = account.addr.toString()
    signer = ((account as any).signer) as algosdk.TransactionSigner
  } else if (options.mnemonic) {
    const account = algorand.account.fromMnemonic(options.mnemonic)
    sender = account.addr.toString()
    signer = (account.signer) as algosdk.TransactionSigner
    console.log(`Using account: ${sender}\n`)
  } else {
    throw new Error('Mnemonic is required for non-localnet networks')
  }
  algorand.setSigner(sender, signer)

  // Check balance
  if (!options.dryRun && (options.mnemonic || options.network === 'localnet')) {
    const info = await algorand.client.algod.accountInformation(sender).do()
    const balance = BigInt(info.amount)
    console.log(`Account balance: ${balance / 1_000_000n} ALGO\n`)
    if (balance < minBalance) {
      console.error(`Insufficient balance. Need at least ${minBalance / 1_000_000n} ALGO.`)
      process.exit(1)
    }
  }

  setCurrentNetwork(options.network)

  // Deploy-only flows do not need DAO/update-plugin clients (LocalNet IDs may be unset).
  let dao: AkitaDaoSDK | undefined
  let updatePlugin: UpdateAkitaDAOPluginSDK | undefined
  const getDao = () => dao ??= new AkitaDaoSDK({
    algorand,
    factoryParams: {
      appId: appIds.dao,
      defaultSender: sender,
      defaultSigner: signer,
    },
  })

  const getUpdatePlugin = () => updatePlugin ??= new UpdateAkitaDAOPluginSDK({
    algorand,
    factoryParams: {
      appId: appIds.updatePlugin,
      defaultSender: sender,
      defaultSigner: signer,
    },
  })

  console.log(`DAO: ${appIds.dao}, Update Plugin: ${appIds.updatePlugin}\n`)

  // The DAO SDK's `wallet` getter throws until getWallet() has resolved. A script that sends resolves
  // it here, before anything is sent, so no step can stop part-way on it (the B2 stop of the TestNet
  // rehearsal, 2026-11-25). Dry runs stay lazy, as they must run offline. LocalNet may have no DAO yet
  // (deploy-only flows), so a read that fails there leaves the SDK lazy, as before.
  if (!options.dryRun && appIds.dao) {
    try {
      await getDao().getWallet()
    } catch (error) {
      if (options.network !== 'localnet') throw error
      dao = undefined
    }
  }

  return { options, algorand, sender, signer, appIds, get dao() { return getDao() }, set dao(value) { dao = value }, get updatePlugin() { return getUpdatePlugin() } }
}

/** Verify that the UpdateAkitaDAO plugin is installed on the DAO wallet. */
export async function verifyUpdatePlugin(ctx: ScriptContext): Promise<void> {
  await ctx.dao.getWallet()
  const pal = await ctx.dao.client.state.global.pluginAppList()
  if (pal?.update !== ctx.updatePlugin.appId || ctx.appIds.updatePlugin !== ctx.updatePlugin.appId) {
    throw new Error('Update plugin does not match the DAO PAL and selected SDK deployment')
  }
  await ctx.dao.wallet.getPlugins()
  const info = ctx.dao.wallet.plugins.get({ plugin: ctx.updatePlugin.appId, caller: ALGORAND_ZERO_ADDRESS_STRING, escrow: '' })
  if (!info) throw new Error('Update plugin has no global DAO-wallet grant')
  console.log(`Update plugin installed globally (${info.methods.length} methods)\n`)
}

// ---------------------------------------------------------------------------
// Standard update flow
// ---------------------------------------------------------------------------

export interface UpdateTarget {
  /** Display name for the contract */
  name: string
  /** Short prefix for the execution lease */
  leasePrefix: string
  /** Key in getNetworkAppIds() result for this contract's app ID */
  appIdKey: string
  /** Factory constructor for compiling the contract (or the factory app itself) */
  createFactory: (p: FactoryParams) => any
  /**
   * For factory+child updates: factory constructor for compiling the child.
   * When provided, `updateFactoryChildContract` is called before `updateApp`.
   */
  childFactory?: (p: FactoryParams) => any
  /** Only upload the child contract bytecode; do not update the factory app itself. */
  skipAppUpdate?: boolean
  /** Explicit ID for an existing child instance; takes precedence over appIdKey. */
  appId?: bigint
  /** Skip sibling repository publication when called by an isolated rehearsal. */
  syncSelectors?: boolean
}

type FactoryParams = {
  algorand: AlgorandClient
  defaultSender: string
  defaultSigner: algosdk.TransactionSigner
}

function groupIdHex(groupId: Uint8Array): string {
  return Buffer.from(groupId).toString('hex')
}

type UpgradeAppAction = Extract<Awaited<ReturnType<ScriptContext['dao']['getProposal']>>['actions'][number], { type: typeof ProposalActionEnum.UpgradeApp }>

/**
 * The lease to build a target's update execution with. A new proposal gets a fresh
 * `${leasePrefix}_${timestamp}` lease. A resumed proposal (`--proposal-id`) must reuse the lease its
 * UpgradeApp action recorded: the wallet's execution box reference ('x' + lease) is part of each hashed
 * group, so a fresh lease rebuilds groups whose ids no longer match the proposal.
 */
export function updateExecutionLease(leasePrefix: string, resumed?: Pick<UpgradeAppAction, 'executionKey'>, now = Date.now()): string {
  return resumed ? recordedLease(resumed.executionKey) : `${leasePrefix}_${now % 1_000_000}`
}

function restampExecutionFromProposal(
  execution: Awaited<ReturnType<ScriptContext['dao']['wallet']['build']['usePlugin']>>,
  upgradeAction: UpgradeAppAction,
): void {
  if (execution.windows.length !== upgradeAction.groups.length) {
    throw new Error(
      `Existing proposal expects ${upgradeAction.groups.length} group(s), ` +
      `but rebuilt execution produced ${execution.windows.length}`,
    )
  }

  execution.lease = upgradeAction.executionKey
  execution.firstValid = upgradeAction.firstValid
  execution.lastValid = upgradeAction.lastValid
  execution.ids = []

  const validityPeriod = 1000n
  for (let i = 0; i < execution.windows.length; i++) {
    const window = execution.windows[i]
    const groupStart = upgradeAction.firstValid + (BigInt(i) * validityPeriod)
    const groupEnd = i === execution.windows.length - 1
      ? upgradeAction.lastValid - 1n
      : groupStart + validityPeriod - 1n

    for (let txnIndex = 0; txnIndex < window.transactions.length; txnIndex++) {
      const txn = window.transactions[txnIndex] as unknown as {
        group?: Uint8Array
        firstValid: bigint
        lastValid: bigint
        lease?: Uint8Array
      }
      txn.group = undefined
      txn.firstValid = groupStart
      txn.lastValid = groupEnd
      if (txnIndex === 0) {
        txn.lease = upgradeAction.executionKey
      }
    }

    algosdk.assignGroupID(window.transactions)
    const rebuiltGroupId = window.transactions[0].group!
    const expectedGroupId = upgradeAction.groups[i]
    if (groupIdHex(rebuiltGroupId) !== groupIdHex(expectedGroupId)) {
      throw new Error(
        `Rebuilt group ${i + 1} does not match proposal group id. ` +
        `expected=${groupIdHex(expectedGroupId)} actual=${groupIdHex(rebuiltGroupId)}`,
      )
    }

    execution.ids.push(rebuiltGroupId)
    window.groupId = Buffer.from(rebuiltGroupId).toString('base64')
  }
}

/**
 * Run a standard contract update flow for one or more targets.
 *
 * For each target:
 *   1. Compile the contract (and child if applicable)
 *   2. Build plugin execution via UpdateAkitaDAO
 *   3. Create and execute a DAO proposal
 *   4. Submit the update transaction(s)
 *   5. Verify the new version
 */
export interface UpdateResult {
  name: string
  appId: bigint
  proposalId?: bigint
  confirmedRound?: bigint
}

export async function runUpdate(ctx: ScriptContext, targets: UpdateTarget[]): Promise<UpdateResult[]> {
  if (ctx.options.proposalId !== undefined && targets.length !== 1) {
    throw new Error('--proposal-id resume mode supports exactly one update target')
  }

  if (!ctx.options.dryRun) {
    await verifyUpdatePlugin(ctx)
    if (targets.some((target) => target.syncSelectors !== false)) await syncIndexerMethodSelectors()
  }

  // ROLLOUT-3: these apps upgrade only through the Phase 2 runner (ABI guard, matching clear program,
  // factory and child in one group, dependency and lockstep plugin checks).
  for (const target of targets) {
    const appId = target.appId ?? (ctx.appIds as any)[target.appIdKey] as bigint | undefined
    const phase2 = ALL_PHASE2_TARGETS.find((t) => {
      const id = (ctx.appIds as unknown as Record<string, bigint | undefined>)[t.appIdKey]
      return t.appIdKey === target.appIdKey || (appId !== undefined && id !== undefined && id > 0n && id === appId)
    })
    if (phase2) {
      throw new Error(`${target.name} (app ${appId}) is the Phase 2 target ${phase2.name}; upgrade it with ` +
        `scripts/principal-phase2-upgrade-targets.ts --target ${phase2.name} (generic runUpdate skips the ABI guard, the clear program and the child checks)`)
    }
  }

  const results: UpdateResult[] = []

  for (const target of targets) {
    const appId = target.appId ?? (ctx.appIds as any)[target.appIdKey] as bigint
    if (!appId || appId <= 0n) throw new Error(`Missing positive app ID for ${target.name}`)

    console.log(`${'─'.repeat(60)}`)

    // Compile child contract if factory+child update
    let childCompiled: { approvalProgram: Uint8Array; clearStateProgram: Uint8Array } | undefined
    let childCreates: string[] = []
    if (target.childFactory) {
      console.log(`Compiling ${target.name} child contract...`)
      const cf = target.childFactory({
        algorand: ctx.algorand,
        defaultSender: ctx.sender,
        defaultSigner: ctx.signer,
      })
      childCompiled = await cf.appFactory.compile()
      if (!childCompiled) throw new Error(`${target.name} child compilation returned no result`)
      childCreates = createSignatures(cf.appFactory.appSpec)
      console.log(`   Child approval: ${childCompiled.approvalProgram.length} bytes`)
    }

    const factory = target.createFactory({
      algorand: ctx.algorand,
      defaultSender: ctx.sender,
      defaultSigner: ctx.signer,
    })

    let compiled: { approvalProgram: Uint8Array } | undefined
    if (!target.skipAppUpdate) {
      console.log(`Compiling ${target.name} contract...`)
      compiled = await factory.appFactory.compile()
      if (!compiled) throw new Error(`${target.name} compilation returned no result`)
      console.log(`   Approval: ${compiled.approvalProgram.length} bytes\n`)
    } else if (!childCompiled) {
      throw new Error(`${target.name} has skipAppUpdate=true but no childFactory`)
    } else {
      console.log(`Skipping ${target.name} app compile; uploading child bytecode only\n`)
    }

    // The factory that receives the child must create it: its create selector and its clear program
    // (ACCT-3: an AVM 13 child staged into a factory that pairs it with an AVM 11 clear stops all creation).
    if (childCompiled) {
      const factoryProgram = compiled?.approvalProgram
        ?? (await ctx.algorand.client.algod.getApplicationByID(appId).do()).params!.approvalProgram
      const problems = childPushProblems(factoryProgram, {
        approval: childCompiled.approvalProgram, clear: childCompiled.clearStateProgram, createSignatures: childCreates,
      })
      if (problems.length > 0) {
        throw new Error(`${target.name}: refusing to stage the child into ${compiled ? 'the new' : `the live (app ${appId})`} factory:\n  ${problems.join('\n  ')}`)
      }
    }

    // Dry-run compile-only exit
    if (ctx.options.dryRun) {
      console.log(`DRY RUN - ${target.name} compiled successfully, target app: ${appId}\n`)
      results.push({ name: target.name, appId })
      continue
    }

    const walletMbr = await ctx.dao.wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 2n })
    const walletFunding = await getAppFundingNeeded(ctx.algorand, ctx.dao.wallet.client.appAddress.toString(), walletMbr.executions + 5_000_000n)
    if (walletFunding > 0n) await ctx.algorand.send.payment({ sender: ctx.sender, signer: ctx.signer,
      receiver: ctx.dao.wallet.client.appAddress, amount: microAlgo(walletFunding) })
    // usePlugin simulates as the wallet admin before the proposal authorizes the
    // real caller. Its temporary maximum fees must not cross the admin's MBR.
    const admin = await ctx.dao.wallet.client.state.global.admin()
    if (!admin) throw new Error('DAO wallet admin is missing')
    const adminFunding = await getAppFundingNeeded(ctx.algorand, admin, 5_000_000n)
    if (adminFunding > 0n) await ctx.algorand.send.payment({ sender: ctx.sender, signer: ctx.signer, receiver: admin, amount: microAlgo(adminFunding) })
    // The temporary upload box must fit the largest program used by this execution.
    const uploadSize = Math.max(compiled?.approvalProgram.length ?? 0, childCompiled?.approvalProgram.length ?? 0)
    await ctx.algorand.account.ensureFunded(ctx.updatePlugin.client.appAddress, ctx.sender, microAlgo(2_500n + 400n * BigInt(2 + uploadSize)))

    const buildCalls = (daoBinding?: UpgradeDaoBinding) => {
      const calls: any[] = []
      if (childCompiled) {
        // Update child contract bytecode in the factory's box storage.
        // Combined child+factory updates keep the spending addr rekeyed for the
        // updateApp call that follows; child-only updates rekey back immediately.
        calls.push(
          ctx.updatePlugin.updateFactoryChildContract({
            sender: ctx.sender,
            signer: ctx.signer,
            factoryAppId: appId,
            version: ctx.options.version,
            data: childCompiled.approvalProgram,
            rekeyBack: Boolean(target.skipAppUpdate),
            daoBinding,
          }),
        )
      }
      if (!target.skipAppUpdate) {
        calls.push(
          ctx.updatePlugin.updateApp({
            sender: ctx.sender,
            signer: ctx.signer,
            appId,
            version: ctx.options.version,
            data: compiled!.approvalProgram,
            daoBinding,
          }),
        )
      }
      return calls
    }

    // --proposal-id: read the recorded UpgradeApp action first, so the rebuild uses its lease.
    let resumed: { proposalId: bigint; status: number; upgradeAction: UpgradeAppAction } | undefined
    if (ctx.options.proposalId !== undefined) {
      const proposalId = ctx.options.proposalId
      console.log(`Resuming existing ${target.name} upgrade proposal ${proposalId}...`)
      const rawProposal = await ctx.dao.client.state.box.proposals.value(proposalId)
      if (!rawProposal) {
        throw new Error(`Proposal ${proposalId} not found`)
      }
      const actions = rawProposal.actions.map(([actionType, actionData]) =>
        (ctx.dao as any).decodeProposalAction(actionType, actionData),
      )
      const upgradeAction = actions.find(
        (action) => action.type === ProposalActionEnum.UpgradeApp && action.app === appId,
      )
      if (!upgradeAction || upgradeAction.type !== ProposalActionEnum.UpgradeApp) {
        throw new Error(`Proposal ${proposalId} does not contain an upgrade action for app ${appId}`)
      }
      resumed = { proposalId, status: rawProposal.status, upgradeAction }
    }

    // A DAO without `isUpgradeLease` (the deployed one) is read through the proposal (K1): the Phase 2a
    // plugin then needs groups that name the proposal id they will get, or every update reverts between
    // Phase 2a and the DAO upgrade. Earlier plugins ignore the binding note and references.
    const bindingMode = daoBindingMode((await ctx.algorand.client.algod.getApplicationByID(ctx.dao.appId).do()).params!.approvalProgram)
    if (bindingMode === undefined) throw new Error(`DAO ${ctx.dao.appId} cannot bind upgrades (no isUpgradeLease, mustGetExecution or getProposal)`)
    const lease = updateExecutionLease(target.leasePrefix, resumed?.upgradeAction)
    const predictedId = !resumed && bindingMode === 'proposal' ? await ctx.dao.client.state.global.proposalId() : undefined
    if (!resumed && bindingMode === 'proposal' && predictedId === undefined) throw new Error('DAO proposal_id is not readable')
    // The group is built before its proposal exists: it gets box read budget for the DAO boxes the
    // proposal writes (2 group ids for the 2,000 round window). A rebuild may need another count.
    const build = (daoBinding?: UpgradeDaoBinding, headroomRefs?: number) => ctx.dao.wallet.build.usePlugin({
      sender: ctx.sender,
      signer: ctx.signer,
      lease,
      windowSize: 2000n,
      callerType: CallerType.Global,
      calls: buildCalls(daoBinding),
      ...(headroomRefs !== undefined
        ? { boxReadHeadroomRefs: headroomRefs }
        : { pendingBoxBytes: pendingUpgradeBoxBytes({ groups: 2, proposalRead: daoBinding !== undefined }) }),
    })

    console.log(`Building ${target.name} update execution...`)
    let execution: Awaited<ReturnType<typeof build>>
    if (resumed) {
      // The groups must be rebuilt in the binding they were proposed with, which can differ from the DAO's
      // current mode (ROLLOUT-4: proposed on the deployed DAO, resumed after the DAO upgrade; or proposed
      // unbound before Phase 2a). Try the current mode first, then the other.
      const bound: UpgradeDaoBinding = { lease, proposalId: resumed.proposalId }
      const candidates = bindingMode === 'proposal' ? [bound, undefined] : [undefined, bound]
      let matched: Awaited<ReturnType<typeof build>> | undefined
      let lastError: unknown
      for (const candidate of candidates) {
        // A build that fails is final. Only a rebuilt group that does not match moves on: first to
        // other box read headroom counts in the same binding, then to the other binding.
        const rebuilt = await build(candidate)
        try {
          matched = await rebuildRecordedExecution(
            (headroomRefs) => headroomRefs === undefined ? Promise.resolve(rebuilt) : build(candidate, headroomRefs),
            (execution) => restampExecutionFromProposal(execution, resumed.upgradeAction))
          break
        } catch (error) {
          lastError = error
        }
      }
      if (!matched) throw lastError
      execution = matched
    } else {
      execution = await build(predictedId !== undefined ? { lease, proposalId: predictedId } : undefined)
    }
    console.log(`   Lease: ${lease}, Groups: ${execution.windows.length}, DAO binding: ${bindingMode}\n`)

    let proposalId: bigint
    if (resumed) {
      proposalId = resumed.proposalId
      console.log(`   Proposal group ids match rebuilt ${target.name} execution`)

      if (resumed.status === 50) {
        console.log(`   Proposal ${proposalId} is already executed`)
      } else {
        console.log(`   Executing proposal ${proposalId}...`)
        await executeProposal(ctx.dao, proposalId)
        console.log(`   Proposal ${proposalId} executed`)
      }
    } else {
      // Create and execute upgrade proposal
      console.log(`Creating and executing ${target.name} upgrade proposal...`)
      const upgradeAction: ProposalAction<SDKClient> = {
        type: ProposalActionEnum.UpgradeApp,
        app: appId,
        executionKey: execution.lease,
        groups: execution.ids,
        firstValid: execution.firstValid,
        lastValid: execution.lastValid,
      }

      proposalId = await proposeAndExecute(ctx.algorand, ctx.dao, [upgradeAction], predictedId)
      console.log(`   Proposal ${proposalId} created and executed`)
    }

    // Submit update transactions
    console.log(`Submitting ${target.name} update transaction${target.skipAppUpdate ? 's' : ''}...`)
    const submission = await execution.send()
    const confirmedRound = BigInt(submission.confirmations[0]?.confirmedRound ?? 0)
    if (confirmedRound === 0n) throw new Error(`${target.name} update did not return a confirmed round`)
    console.log(`   Update confirmed in round ${confirmedRound}\n`)

    const client = factory.getAppClientById({ appId })
    if (target.skipAppUpdate) {
      const childVersion = await client.state.global.childContractVersion()
      console.log(`   New child contract version: ${childVersion}\n`)
    } else {
      const newVersion = await client.state.global.version()
      if (newVersion !== ctx.options.version) throw new Error(`${target.name} version verification failed`)
      const live = (await ctx.algorand.client.algod.getApplicationByID(appId).do()).params
      if (!live || !Buffer.from(live.approvalProgram).equals(Buffer.from(compiled!.approvalProgram))) {
        throw new Error(`${target.name} approval bytecode verification failed`)
      }
      console.log(`   New version: ${newVersion}\n`)
    }

    results.push({ name: target.name, appId, proposalId, confirmedRound })
  }

  // Summary
  console.log('='.repeat(80))
  console.log(ctx.options.dryRun ? 'DRY RUN COMPLETE' : 'UPDATE COMPLETE!')
  console.log('='.repeat(80))
  console.log(`\nNetwork: ${ctx.options.network}, Version: ${ctx.options.version}\n`)
  for (const r of results) {
    console.log(`  ${r.name}: App ID ${r.appId}${r.proposalId !== undefined ? `, Proposal ${r.proposalId}` : ''}`)
  }
  console.log()

  return results
}

/** Wrap a script's main function with standard error handling. */
export function runScript(fn: () => Promise<void>): void {
  fn()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('\nScript failed:', error)
      if (error instanceof Error && error.stack) {
        console.error('Stack trace:', error.stack)
      }
      process.exit(1)
    })
}

export function pluginDeploymentInstructions(
  network: Network,
  key: string,
  appId: bigint,
  version?: string,
): string {
  const catalog = `${network.toUpperCase()}_PLUGIN_DEPLOYMENTS.${key}`
  const fields = [`appId: ${appId}n`]
  if (version) fields.push(`version: '${version}'`)

  return `Recorded in ${catalog}:
  { ${fields.join(', ')} },

Previous deployments were retained and the README latest-deployment table was updated.`
}

/** Record the round where the DAO began encoding NewEscrow as (string,address). */
export async function recordDaoEscrowActionV2Round(network: Network, round: bigint, timestamp: bigint): Promise<void> {
  if (network === 'localnet') {
    console.log(`DAO escrow action v2 became active in localnet round ${round}; not recording ephemeral metadata`)
    return
  }
  if (round <= 0n) throw new Error(`Invalid DAO escrow action v2 round: ${round}`)
  if (timestamp <= 0n) throw new Error(`Invalid DAO escrow action v2 timestamp: ${timestamp}`)

  const fs = await import('fs/promises')
  const path = await import('path')
  const ts = await import('typescript')
  const networksPath = path.join(__dirname, '../../akita-sdk/src/networks.ts')
  const sourceText = await fs.readFile(networksPath, 'utf8')
  const source = ts.createSourceFile('networks.ts', sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  let initializer: import('typescript').Expression | undefined

  source.forEachChild((node) => {
    if (!ts.isVariableStatement(node)) return
    for (const declaration of node.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || declaration.name.text !== 'DAO_ESCROW_ACTION_V2_ROUNDS') continue
      if (!declaration.initializer || !ts.isObjectLiteralExpression(declaration.initializer)) continue
      for (const property of declaration.initializer.properties) {
        if (!ts.isPropertyAssignment(property)) continue
        if (property.name.getText(source).replaceAll(/["']/g, '') === network) initializer = property.initializer
      }
    }
  })

  if (!initializer) throw new Error(`Could not find DAO_ESCROW_ACTION_V2_ROUNDS.${network} in ${networksPath}`)
  const current = initializer.getText(source)
  const replacement = `{ round: ${round}n, timestamp: ${timestamp}n }`
  if (current !== replacement) {
    const next = sourceText.slice(0, initializer.getStart(source)) + replacement + sourceText.slice(initializer.end)
    await fs.writeFile(networksPath, next, 'utf8')
  }
  console.log(`Recorded DAO escrow action v2 round ${round} for ${network}`)
}

const README_PLUGIN_KEYS: Record<string, string> = {
  optinPlugin: 'optInPlugin',
  selfOptinPlugin: 'selfOptInPlugin',
}

/** Record a replacement app ID in the SDK's canonical network map and README. */
/** A README deployment-table row: an explorer link, or `—` for a network not deployed yet. */
function isReadmeDeploymentRow(line: string, key: string): boolean {
  return line.startsWith(`| \`${key}\` |`) && (line.includes('lora.algokit.io/') || line.includes('| — |'))
}

export async function recordNetworkAppDeployment(network: Network, key: string, appId: bigint): Promise<void> {
  if (network === 'localnet') {
    console.log('Skipping baked-in deployment metadata for ephemeral localnet app ID')
    return
  }

  const fs = await import('fs/promises')
  const path = await import('path')
  const ts = await import('typescript')
  const networksPath = path.join(__dirname, '../../akita-sdk/src/networks.ts')
  const readmePath = path.join(__dirname, '../../../README.md')
  const [networkSource, readmeSource] = await Promise.all([
    fs.readFile(networksPath, 'utf8'),
    fs.readFile(readmePath, 'utf8'),
  ])
  const source = ts.createSourceFile('networks.ts', networkSource, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  const declarationName = `${network.toUpperCase()}_APP_IDS`
  let initializer: import('typescript').Expression | undefined

  source.forEachChild((node) => {
    if (!ts.isVariableStatement(node)) return
    for (const declaration of node.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || declaration.name.text !== declarationName) continue
      if (!declaration.initializer || !ts.isObjectLiteralExpression(declaration.initializer)) continue

      for (const property of declaration.initializer.properties) {
        if (!ts.isPropertyAssignment(property)) continue
        if (property.name.getText(source).replaceAll(/["']/g, '') === key) initializer = property.initializer
      }
    }
  })

  if (!initializer) throw new Error(`Could not find ${declarationName}.${key} in ${networksPath}`)

  const appIdLiteral = `${appId}n`
  const current = initializer.getText(source)
  const nextNetworkSource = current === appIdLiteral
    ? networkSource
    : networkSource.slice(0, initializer.getStart(source)) + appIdLiteral + networkSource.slice(initializer.end)

  const readmeLines = readmeSource.split('\n')
  const rowIndex = readmeLines.findIndex((line) => isReadmeDeploymentRow(line, key))
  if (rowIndex === -1) throw new Error(`Could not find README deployment row for ${key}`)

  const columns = readmeLines[rowIndex].split('|')
  if (columns.length < 5) throw new Error(`Malformed README deployment row for ${key}`)
  const networkColumn = network === 'testnet' ? 2 : 3
  columns[networkColumn] = ` [\`${appId}\`](https://lora.algokit.io/${network}/application/${appId}) `
  readmeLines[rowIndex] = columns.join('|')
  const nextReadmeSource = readmeLines.join('\n')

  await Promise.all([
    nextNetworkSource === networkSource ? Promise.resolve() : fs.writeFile(networksPath, nextNetworkSource, 'utf8'),
    nextReadmeSource === readmeSource ? Promise.resolve() : fs.writeFile(readmePath, nextReadmeSource, 'utf8'),
  ])
  await recordBlockwatcherAppID(network, key, appId)
  await recordBackendAppID(network, key, appId)

  console.log(
    current === appIdLiteral
      ? `${declarationName}.${key} already points to ${appId}; README.md verified`
      : `Recorded ${declarationName}.${key}=${appId} and updated README.md`,
  )
}

export async function recordPluginDeployment(
  network: Network,
  key: string,
  appId: bigint,
  version?: string,
): Promise<void> {
  if (network === 'localnet') {
    console.log('Skipping baked-in plugin deployment metadata for ephemeral localnet app ID')
    return
  }

  await syncIndexerMethodSelectors()

  const fs = await import('fs/promises')
  const path = await import('path')
  const ts = await import('typescript')
  const networksPath = path.join(__dirname, '../../akita-sdk/src/networks.ts')
  const readmePath = path.join(__dirname, '../../../README.md')
  const [networkSource, readmeSource] = await Promise.all([
    fs.readFile(networksPath, 'utf8'),
    fs.readFile(readmePath, 'utf8'),
  ])
  const source = ts.createSourceFile('networks.ts', networkSource, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  const declarationName = `${network.toUpperCase()}_PLUGIN_DEPLOYMENTS`
  let deploymentArray: import('typescript').ArrayLiteralExpression | undefined

  source.forEachChild((node) => {
    if (!ts.isVariableStatement(node)) return
    for (const declaration of node.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || declaration.name.text !== declarationName) continue
      if (!declaration.initializer || !ts.isObjectLiteralExpression(declaration.initializer)) continue

      for (const property of declaration.initializer.properties) {
        if (!ts.isPropertyAssignment(property) || property.name.getText(source).replaceAll(/["']/g, '') !== key) continue
        if (ts.isArrayLiteralExpression(property.initializer)) deploymentArray = property.initializer
      }
    }
  })

  if (!deploymentArray) {
    throw new Error(`Could not find ${declarationName}.${key} in ${networksPath}`)
  }

  const appIdLiteral = `${appId}n`
  const existingIndex = deploymentArray.elements.findIndex((element) => {
    if (!ts.isObjectLiteralExpression(element)) return false
    return element.properties.some(
      (property) =>
        ts.isPropertyAssignment(property) &&
        property.name.getText(source).replaceAll(/["']/g, '') === 'appId' &&
        property.initializer.getText(source) === appIdLiteral,
    )
  })
  const latestIndex = deploymentArray.elements.length - 1
  if (existingIndex !== -1 && existingIndex !== latestIndex) {
    throw new Error(`${appId} is already a historical ${declarationName}.${key} deployment, not its latest entry`)
  }

  let nextNetworkSource = networkSource
  if (existingIndex === -1) {
    const fields = [`appId: ${appIdLiteral}`]
    if (version) fields.push(`version: '${version.replaceAll("'", "\\'")}'`)
    fields.push(`deployedAt: '${new Date().toISOString()}'`)
    const deployment = `{ ${fields.join(', ')} }`
    const isMultiline = deploymentArray.getText(source).includes('\n')
    const insertion = isMultiline
      ? `  ${deployment},\n  `
      : `${deploymentArray.elements.hasTrailingComma ? ' ' : ', '}${deployment}`
    const position = deploymentArray.end - 1
    nextNetworkSource = networkSource.slice(0, position) + insertion + networkSource.slice(position)
  }

  const readmeKey = README_PLUGIN_KEYS[key] ?? key
  const readmeLines = readmeSource.split('\n')
  const rowIndex = readmeLines.findIndex((line) => isReadmeDeploymentRow(line, readmeKey))
  if (rowIndex === -1) throw new Error(`Could not find README plugin row for ${readmeKey}`)

  const columns = readmeLines[rowIndex].split('|')
  if (columns.length < 5) throw new Error(`Malformed README plugin row for ${readmeKey}`)
  const networkColumn = network === 'testnet' ? 2 : 3
  columns[networkColumn] = ` [\`${appId}\`](https://lora.algokit.io/${network}/application/${appId}) `
  readmeLines[rowIndex] = columns.join('|')
  const nextReadmeSource = readmeLines.join('\n')

  await Promise.all([
    nextNetworkSource === networkSource ? Promise.resolve() : fs.writeFile(networksPath, nextNetworkSource, 'utf8'),
    nextReadmeSource === readmeSource ? Promise.resolve() : fs.writeFile(readmePath, nextReadmeSource, 'utf8'),
  ])
  await recordBlockwatcherAppID(network, key, appId)
  await recordBackendAppID(network, key, appId)

  console.log(
    existingIndex === -1
      ? `Recorded ${key} ${appId} in ${declarationName} and updated README.md`
      : `${key} ${appId} is already the latest catalog entry; README.md verified`,
  )
}

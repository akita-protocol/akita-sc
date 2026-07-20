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

import { AlgorandClient } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { getNetworkAppIds, SDKClient, setCurrentNetwork, type AkitaNetwork } from 'akita-sdk'
import { AkitaDaoSDK, ProposalAction, ProposalActionEnum } from 'akita-sdk/dao'
import { CallerType, UpdateAkitaDAOPluginSDK } from 'akita-sdk/wallet'
import algosdk, { ALGORAND_ZERO_ADDRESS_STRING, makeBasicAccountTransactionSigner } from 'algosdk'
import { executeProposal, proposeAndExecute, wrapUtils10Signer } from './utils'

export type Network = AkitaNetwork

export interface ScriptOptions {
  network: Network
  mnemonic?: string
  version: string
  dryRun?: boolean
  algodToken?: string
  proposalId?: bigint
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

  return { network, mnemonic, version, dryRun, algodToken, proposalId }
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
    default: return AlgorandClient.fromEnvironment()
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
  const appIds = getNetworkAppIds(options.network)
  const algorand = createAlgorandClient(options.network, options.algodToken)

  let sender: string
  let signer: algosdk.TransactionSigner

  if (options.network === 'localnet') {
    const fixture = algorandFixture()
    await fixture.newScope()
    const account = fixture.context.testAccount as algosdk.Account
    sender = account.addr.toString()
    signer = wrapUtils10Signer((account as any).signer) as algosdk.TransactionSigner
  } else if (options.mnemonic) {
    const account = algorand.account.fromMnemonic(options.mnemonic)
    sender = account.addr.toString()
    signer = wrapUtils10Signer(account.signer) as algosdk.TransactionSigner
    console.log(`Using account: ${sender}\n`)
  } else if (options.dryRun) {
    sender = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ'
    signer = wrapUtils10Signer(makeBasicAccountTransactionSigner({ addr: sender, sk: new Uint8Array(64) } as any)) as algosdk.TransactionSigner
  } else {
    throw new Error('Mnemonic is required for non-localnet networks')
  }

  // Check balance
  if (options.mnemonic || options.network === 'localnet') {
    const info = await algorand.client.algod.accountInformation(sender)
    const balance = BigInt(info.amount)
    console.log(`Account balance: ${balance / 1_000_000n} ALGO\n`)
    if (balance < minBalance) {
      console.error(`Insufficient balance. Need at least ${minBalance / 1_000_000n} ALGO.`)
      process.exit(1)
    }
  }

  setCurrentNetwork(options.network)

  const dao = new AkitaDaoSDK({
    algorand,
    factoryParams: {
      appId: appIds.dao,
      defaultSender: sender,
      defaultSigner: signer,
    },
  })

  const updatePlugin = new UpdateAkitaDAOPluginSDK({
    algorand,
    factoryParams: {
      appId: appIds.updatePlugin,
      defaultSender: sender,
      defaultSigner: signer,
    },
  })

  console.log(`DAO: ${dao.appId}, Update Plugin: ${updatePlugin.appId}\n`)

  return { options, algorand, sender, signer, appIds, dao, updatePlugin }
}

/** Verify that the UpdateAkitaDAO plugin is installed on the DAO wallet. */
export async function verifyUpdatePlugin(ctx: ScriptContext): Promise<void> {
  await ctx.dao.getWallet()
  await ctx.dao.wallet.getPlugins()
  try {
    const info = ctx.dao.wallet.plugins.get({
      plugin: ctx.appIds.updatePlugin,
      caller: ALGORAND_ZERO_ADDRESS_STRING,
      escrow: '',
    })
    if (info) {
      console.log(`Update plugin installed globally (${info.methods.length} methods)\n`)
    } else {
      console.warn('Could not find update plugin\n')
    }
  } catch (e) {
    console.error('Failed to read wallet plugins:', e)
  }
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
}

type FactoryParams = {
  algorand: AlgorandClient
  defaultSender: string
  defaultSigner: algosdk.TransactionSigner
}

function groupIdHex(groupId: Uint8Array): string {
  return Buffer.from(groupId).toString('hex')
}

function restampExecutionFromProposal(
  execution: Awaited<ReturnType<ScriptContext['dao']['wallet']['build']['usePlugin']>>,
  upgradeAction: Extract<Awaited<ReturnType<ScriptContext['dao']['getProposal']>>['actions'][number], { type: typeof ProposalActionEnum.UpgradeApp }>,
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

  await verifyUpdatePlugin(ctx)

  const results: UpdateResult[] = []

  for (const target of targets) {
    const appId = (ctx.appIds as any)[target.appIdKey] as bigint

    console.log(`${'─'.repeat(60)}`)

    // Compile child contract if factory+child update
    let childCompiled: { approvalProgram: Uint8Array } | undefined
    if (target.childFactory) {
      console.log(`Compiling ${target.name} child contract...`)
      const cf = target.childFactory({
        algorand: ctx.algorand,
        defaultSender: ctx.sender,
        defaultSigner: ctx.signer,
      })
      childCompiled = await cf.appFactory.compile()
      console.log(`   Child approval: ${childCompiled!.approvalProgram.length} bytes`)
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
      console.log(`   Approval: ${compiled.approvalProgram.length} bytes\n`)
    } else if (!childCompiled) {
      throw new Error(`${target.name} has skipAppUpdate=true but no childFactory`)
    } else {
      console.log(`Skipping ${target.name} app compile; uploading child bytecode only\n`)
    }

    // Dry-run compile-only exit
    if (ctx.options.dryRun && !ctx.options.mnemonic && ctx.options.network !== 'localnet') {
      console.log(`DRY RUN - ${target.name} compiled successfully, target app: ${appId}\n`)
      results.push({ name: target.name, appId })
      continue
    }

    // Build plugin execution calls
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
        }),
      )
    }

    const shortTimestamp = Date.now() % 1_000_000
    console.log(`Building ${target.name} update execution...`)
    const execution = await ctx.dao.wallet.build.usePlugin({
      sender: ctx.sender,
      signer: ctx.signer,
      lease: `${target.leasePrefix}_${shortTimestamp}`,
      windowSize: 2000n,
      callerType: CallerType.Global,
      calls,
    })
    console.log(`   Lease: ${execution.lease}, Groups: ${execution.windows.length}\n`)

    if (ctx.options.dryRun) {
      console.log(`DRY RUN - ${target.name} update prepared (${execution.windows.length} groups)\n`)
      results.push({ name: target.name, appId })
      continue
    }

    let proposalId: bigint
    if (ctx.options.proposalId !== undefined) {
      proposalId = ctx.options.proposalId
      console.log(`Resuming existing ${target.name} upgrade proposal ${proposalId}...`)
      const rawProposal = await ctx.dao.client.state.box.proposals.value(proposalId)
      if (!rawProposal) {
        throw new Error(`Proposal ${proposalId} not found`)
      }
      const proposal = {
        ...rawProposal,
        actions: rawProposal.actions.map(([actionType, actionData]) =>
          (ctx.dao as any).decodeProposalAction(actionType, actionData),
        ),
      }
      const upgradeAction = proposal.actions.find(
        (action) => action.type === ProposalActionEnum.UpgradeApp && action.app === appId,
      )
      if (!upgradeAction || upgradeAction.type !== ProposalActionEnum.UpgradeApp) {
        throw new Error(`Proposal ${proposalId} does not contain an upgrade action for app ${appId}`)
      }

      restampExecutionFromProposal(execution, upgradeAction)
      console.log(`   Proposal group ids match rebuilt ${target.name} execution`)

      if (proposal.status === 50) {
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

      proposalId = await proposeAndExecute(ctx.algorand, ctx.dao, [upgradeAction])
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
  const rowIndex = readmeLines.findIndex(
    (line) => line.startsWith(`| \`${key}\` |`) && line.includes('lora.algokit.io/testnet/application'),
  )
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
  const rowIndex = readmeLines.findIndex(
    (line) => line.startsWith(`| \`${readmeKey}\` |`) && line.includes('lora.algokit.io/testnet/application'),
  )
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

  console.log(
    existingIndex === -1
      ? `Recorded ${key} ${appId} in ${declarationName} and updated README.md`
      : `${key} ${appId} is already the latest catalog entry; README.md verified`,
  )
}

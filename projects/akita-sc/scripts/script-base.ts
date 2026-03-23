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
import { UpdateAkitaDAOPluginSDK } from 'akita-sdk/wallet'
import algosdk, { ALGORAND_ZERO_ADDRESS_STRING, makeBasicAccountTransactionSigner } from 'algosdk'
import { proposeAndExecute } from './utils'

export type Network = AkitaNetwork

export interface ScriptOptions {
  network: Network
  mnemonic?: string
  version: string
  dryRun?: boolean
  algodToken?: string
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
  let mnemonic: string | undefined
  let version = '1.0.0'
  let dryRun = false
  let algodToken: string | undefined

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

  return { network, mnemonic, version, dryRun, algodToken }
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
    signer = (account as any).signer
  } else if (options.mnemonic) {
    const account = algosdk.mnemonicToSecretKey(options.mnemonic)
    sender = account.addr.toString()
    signer = makeBasicAccountTransactionSigner(account)
    console.log(`Using account: ${sender}\n`)
  } else if (options.dryRun) {
    sender = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ'
    signer = makeBasicAccountTransactionSigner({ addr: sender, sk: new Uint8Array(64) } as any)
  } else {
    throw new Error('Mnemonic is required for non-localnet networks')
  }

  // Check balance
  if (options.mnemonic || options.network === 'localnet') {
    const info = await algorand.client.algod.accountInformation(sender).do()
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
}

type FactoryParams = {
  algorand: AlgorandClient
  defaultSender: string
  defaultSigner: algosdk.TransactionSigner
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
export async function runUpdate(ctx: ScriptContext, targets: UpdateTarget[]): Promise<void> {
  await verifyUpdatePlugin(ctx)

  const results: { name: string; appId: bigint; proposalId?: bigint }[] = []

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

    // Compile the main contract
    console.log(`Compiling ${target.name} contract...`)
    const factory = target.createFactory({
      algorand: ctx.algorand,
      defaultSender: ctx.sender,
      defaultSigner: ctx.signer,
    })
    const compiled = await factory.appFactory.compile()
    console.log(`   Approval: ${compiled.approvalProgram.length} bytes\n`)

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
      // rekeyBack: false keeps the spending addr rekeyed to the plugin for the
      // updateApp call that follows.
      calls.push(
        ctx.updatePlugin.updateFactoryChildContract({
          sender: ctx.sender,
          signer: ctx.signer,
          factoryAppId: appId,
          version: ctx.options.version,
          data: childCompiled.approvalProgram,
          rekeyBack: false,
        }),
      )
    }

    calls.push(
      ctx.updatePlugin.updateApp({
        sender: ctx.sender,
        signer: ctx.signer,
        appId,
        version: ctx.options.version,
        data: compiled.approvalProgram,
      }),
    )

    const shortTimestamp = Date.now() % 1_000_000
    console.log(`Building ${target.name} update execution...`)
    const execution = await ctx.dao.wallet.build.usePlugin({
      sender: ctx.sender,
      signer: ctx.signer,
      lease: `${target.leasePrefix}_${shortTimestamp}`,
      windowSize: 2000n,
      global: true,
      calls,
    })
    console.log(`   Lease: ${execution.lease}, Groups: ${execution.atcs.length}\n`)

    if (ctx.options.dryRun) {
      console.log(`DRY RUN - ${target.name} update prepared (${execution.atcs.length} groups)\n`)
      results.push({ name: target.name, appId })
      continue
    }

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

    const proposalId = await proposeAndExecute(ctx.algorand, ctx.dao, [upgradeAction])
    console.log(`   Proposal ${proposalId} created and executed`)

    // Submit update transactions
    console.log(`Submitting ${target.name} update transaction...`)
    for (let i = 0; i < execution.atcs.length; i++) {
      await execution.atcs[i].submit(ctx.algorand.client.algod)
    }
    console.log('   Update submitted\n')

    // Verify the update
    const client = factory.getAppClientById({ appId })
    const newVersion = await client.state.global.version()
    console.log(`   New version: ${newVersion}\n`)

    results.push({ name: target.name, appId, proposalId })
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

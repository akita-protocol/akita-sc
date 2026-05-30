#!/usr/bin/env node

/**
 * Install the Haystack Router plugin on the DAO's Haystack receiver escrow.
 *
 * The grant is intentionally narrow:
 *   - escrow: rev_haystack by default
 *   - caller: global
 *   - methods: claim only
 *
 * Usage:
 *   npm run install:dao-haystack-claim-plugin -- -n mainnet -m "DAO_MNEMONIC"
 *   npm run install:dao-haystack-claim-plugin -- --dry-run
 */

import { microAlgo } from '@algorandfoundation/algokit-utils'
import type { TransactionSigner } from '@algorandfoundation/algokit-utils/transact'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { buildAppIdsFromEnv, getNetworkAppIds, setCurrentNetwork, type SDKClient } from 'akita-sdk'
import { AkitaDaoSDK, ProposalAction, ProposalActionEnum } from 'akita-sdk/dao'
import { CallerType, HaystackRouterPluginSDK } from 'akita-sdk/wallet'
import algosdk, { ALGORAND_ZERO_ADDRESS_STRING, makeBasicAccountTransactionSigner } from 'algosdk'
import dotenv from 'dotenv'
import { createAlgorandClient, parseBaseArgs, runScript } from './script-base'
import { getAppFundingNeeded, proposeAndExecute } from './utils'

const DEFAULT_ESCROW = 'rev_haystack'
const DEFAULT_SOURCE_LINK = 'https://github.com/kylebee/akita-sc'

type ExtraArgs = {
  escrow: string
  sourceLink: string
}

function parseExtraArgs(): ExtraArgs {
  const args = process.argv.slice(2)
  let escrow = DEFAULT_ESCROW
  let sourceLink = DEFAULT_SOURCE_LINK

  for (let i = 0; i < args.length; i += 1) {
    if (args[i] === '--escrow') {
      escrow = args[++i]
    } else if (args[i] === '--source-link') {
      sourceLink = args[++i]
    }
  }

  if (!escrow) throw new Error('--escrow must not be empty')
  return { escrow, sourceLink }
}

function getRequestedNetwork(): string {
  const args = process.argv.slice(2)
  for (let i = 0; i < args.length; i += 1) {
    if (args[i] === '--network' || args[i] === '-n') {
      return args[i + 1] ?? 'localnet'
    }
  }
  return process.env.ALGORAND_NETWORK ?? 'mainnet'
}

function canCallResultAllowed(result: unknown): boolean {
  if (result === true) return true
  if (result && typeof result === 'object' && 'return' in result) {
    return (result as { return?: unknown }).return === true
  }
  return false
}

runScript(async () => {
  const requestedNetwork = getRequestedNetwork()
  dotenv.config({ path: `.env.${requestedNetwork}` })

  const extra = parseExtraArgs()
  const options = parseBaseArgs('install-dao-haystack-claim-plugin.ts', `
  --escrow <name>               DAO wallet escrow. Defaults to ${DEFAULT_ESCROW}
  --source-link <url>           Proposal source link. Defaults to ${DEFAULT_SOURCE_LINK}`)
  const algorand = createAlgorandClient(options.network, options.algodToken)

  setCurrentNetwork(options.network)
  const envAppIds = buildAppIdsFromEnv(process.env as Record<string, string | undefined>)
  const networkAppIds = getNetworkAppIds(options.network)
  const daoAppId = envAppIds.dao > 0n ? envAppIds.dao : networkAppIds.dao
  const haystackRouterPluginAppId =
    envAppIds.haystackRouterPlugin > 0n ? envAppIds.haystackRouterPlugin : networkAppIds.haystackRouterPlugin

  if (daoAppId <= 0n) throw new Error('DAO app ID is not configured.')
  if (haystackRouterPluginAppId <= 0n) throw new Error('Haystack Router plugin app ID is not configured.')

  let sender: string
  let signer: TransactionSigner

  if (options.network === 'localnet') {
    const fixture = algorandFixture()
    await fixture.newScope()
    const account = fixture.context.testAccount as algosdk.Account
    sender = account.addr.toString()
    signer = (account as any).signer
  } else if (options.mnemonic) {
    const account = algosdk.mnemonicToSecretKey(options.mnemonic)
    sender = account.addr.toString()
    signer = makeBasicAccountTransactionSigner(account) as unknown as TransactionSigner
  } else if (options.dryRun) {
    const account = algosdk.generateAccount()
    sender = account.addr.toString()
    signer = makeBasicAccountTransactionSigner(account) as unknown as TransactionSigner
  } else {
    throw new Error('Mnemonic is required for non-localnet networks.')
  }

  const dao = new AkitaDaoSDK({
    algorand,
    factoryParams: { appId: daoAppId, defaultSender: sender, defaultSigner: signer as any },
  })
  const haystackRouterPlugin = new HaystackRouterPluginSDK({
    algorand,
    factoryParams: { appId: haystackRouterPluginAppId, defaultSender: sender, defaultSigner: signer as any },
  })

  dao.setSendParams({ sender, signer })
  const wallet = await dao.getWallet()
  const claimMethod = haystackRouterPlugin.claim()

  console.log(`\nInstalling DAO Haystack claim plugin grant on ${options.network}`)
  console.log(`DAO:              ${dao.appId}`)
  console.log(`Wallet:           ${wallet.appId}`)
  console.log(`Haystack plugin:  ${haystackRouterPlugin.appId}`)
  console.log(`Escrow:           ${extra.escrow}`)
  console.log(`Caller:           global (${ALGORAND_ZERO_ADDRESS_STRING})`)
  console.log('Allowed method:   claim\n')

  const escrows = await wallet.getEscrows()
  const escrowInfo = escrows.get(extra.escrow)
  if (!escrowInfo || escrowInfo.id === 0n) {
    const haystackEscrows = [...escrows.keys()].filter((name) => name.includes('haystack')).sort()
    const suffix = haystackEscrows.length > 0 ? ` Existing Haystack-like escrows: ${haystackEscrows.join(', ')}.` : ''
    throw new Error(`Escrow "${extra.escrow}" does not exist on the DAO wallet. Refusing to create it implicitly.${suffix}`)
  }
  console.log(`Escrow app ID:    ${escrowInfo.id}`)
  console.log(`Escrow address:   ${algosdk.getApplicationAddress(escrowInfo.id).toString()}\n`)

  if (options.dryRun && !options.mnemonic && options.network !== 'localnet') {
    console.log('DRY RUN - no mnemonic provided, so skipping fee-spending simulation calls.')
    console.log(`DRY RUN - would install global claim-only Haystack plugin grant for escrow "${extra.escrow}".`)
    return
  }

  const canCall = await wallet.canCall({
    sender,
    signer,
    plugin: haystackRouterPlugin.appId,
    type: CallerType.Global,
    address: ALGORAND_ZERO_ADDRESS_STRING,
    escrow: extra.escrow,
    methods: claimMethod,
  })

  if (canCall.every(canCallResultAllowed)) {
    console.log(`Haystack claim plugin grant is already installed for escrow "${extra.escrow}".`)
    return
  }

  const mbr = await wallet.getMbr({
    escrow: extra.escrow,
    methodCount: 1n,
    plugin: '',
    groups: 0n,
  })
  const walletFunding = await getAppFundingNeeded(
    algorand,
    wallet.client.appAddress.toString(),
    mbr.plugins + 1_000_000n,
  )

  const actions: ProposalAction<SDKClient>[] = [{
    type: ProposalActionEnum.AddPlugin,
    client: haystackRouterPlugin,
    callerType: CallerType.Global,
    escrow: extra.escrow,
    sourceLink: extra.sourceLink,
    useExecutionKey: false,
    methods: [{ name: claimMethod, cooldown: 0n }],
  }]

  const proposalCost = await dao.proposalCost({ sender, signer, actions })
  console.log(`Proposal cost:    total=${proposalCost.total}, fee=${proposalCost.fee}, mbr=${proposalCost.mbr}`)
  console.log(`Wallet funding:   ${walletFunding} microAlgos`)

  if (options.dryRun) {
    console.log(`\nDRY RUN - would install global claim-only Haystack plugin grant for escrow "${extra.escrow}".`)
    return
  }

  if (walletFunding > 0n) {
    await algorand.send.payment({
      sender,
      signer,
      receiver: wallet.client.appAddress,
      amount: microAlgo(walletFunding),
    })
  }

  const proposalId = await proposeAndExecute(algorand, dao, actions)
  console.log(`\nInstalled Haystack claim plugin grant via proposal ${proposalId}.`)
})

#!/usr/bin/env node

import { AlgorandClient, encodeLease, microAlgo } from '@algorandfoundation/algokit-utils'
import { getNetworkAppIds, SDKClient, sendPrepared, setCurrentNetwork, type AkitaNetwork } from 'akita-sdk'
import { ProposalAction, ProposalActionEnum } from 'akita-sdk/dao'
import { WalletSDK } from 'akita-sdk/wallet'
import algosdk, { ALGORAND_ZERO_ADDRESS_STRING, makeBasicAccountTransactionSigner, makeEmptyTransactionSigner } from 'algosdk'
import { createAlgorandClient, setupContext, type ScriptContext } from './script-base'
import { proposeAndExecute } from './utils'
import { prepareGroup, type PreparedGroup } from '../../akita-sdk/src/simulate/prepare'
import { executionBoxKey } from '../../akita-sdk/src/wallet/utils'
import {
  discoverDeployerInventory,
  getCriticalAppIds,
  getIndexer,
  getPluginAppIds,
  getSunsetAppTargets,
  printPlan,
  type AppNode,
  type AssetNode,
  type EscrowNode,
} from './plan-deployer-sunset'
import { SunsetContractClient, SunsetContractFactory } from '../smart_contracts/artifacts/sunset/SunsetContractClient'
import {
  WalletFactorySunsetContractClient,
  WalletFactorySunsetContractFactory,
} from '../smart_contracts/artifacts/sunset/WalletFactorySunsetContractClient'

const DEFAULT_DEPLOYER = 'T3XTUCP6XUUTMCYBE243YIKYJ6A7XUU74SVXWT5WPU7E4CLL4AU4B2HT5Q'
const BOX_BATCH_SIZE = 8
const RECLAIM_BATCH_SIZE = 6
const DIRECT_UPDATE_SIGNATURE = 'update(string)void'

type Phase = 'all' | 'apps' | 'final'

type Args = {
  network: AkitaNetwork
  deployer: string
  execute: boolean
  mnemonic?: string
  algodToken?: string
  version: string
  closeTo?: string
  phase: Phase
  limit?: number
}

type CompiledApprovals = {
  sunset: { approvalProgram: Uint8Array; clearStateProgram: Uint8Array }
  walletFactorySunset: { approvalProgram: Uint8Array; clearStateProgram: Uint8Array }
}

type SunsetExecution = {
  lease: Uint8Array
  firstValid: bigint
  lastValid: bigint
  ids: Uint8Array[]
  windows: PreparedGroup[]
}

type EscrowReclaimTarget = {
  name: string
  appId: bigint
  address: string
  holdings: { assetId: bigint; amount: bigint }[]
}

function parseArgs(): Args {
  const args = process.argv.slice(2)
  let network: AkitaNetwork = 'testnet'
  let deployer = DEFAULT_DEPLOYER
  let execute = false
  let mnemonic: string | undefined
  let algodToken: string | undefined
  let version = 'sunset'
  let closeTo: string | undefined
  let phase: Phase = 'all'
  let limit: number | undefined

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (arg === '--network' || arg === '-n') {
      const value = args[++i] as AkitaNetwork
      if (!['testnet', 'mainnet', 'localnet'].includes(value)) throw new Error(`Invalid network: ${value}`)
      network = value
    } else if (arg === '--deployer') {
      deployer = args[++i]
    } else if (arg === '--execute') {
      execute = true
    } else if (arg === '--mnemonic' || arg === '-m') {
      mnemonic = args[++i]
    } else if (arg === '--token' || arg === '-t') {
      algodToken = args[++i]
    } else if (arg === '--version' || arg === '-v') {
      version = args[++i]
    } else if (arg === '--close-to') {
      closeTo = args[++i]
    } else if (arg === '--phase') {
      const value = args[++i] as Phase
      if (!['all', 'apps', 'final'].includes(value)) throw new Error(`Invalid --phase: ${value}`)
      phase = value
    } else if (arg === '--limit') {
      limit = Number(args[++i])
      if (!Number.isInteger(limit) || limit <= 0) throw new Error('--limit must be a positive integer')
    } else if (arg === '--help' || arg === '-h') {
      console.log(`
Usage: npm run sunset:execute-deployer -- [options]

Dry-runs by default. Add --execute to submit transactions.

Options:
  --network, -n <network>          Network. Default: testnet
  --deployer <address>             Root deployer account. Default: ${DEFAULT_DEPLOYER}
  --execute                        Submit transactions
  --mnemonic, -m <mnemonic>        Deployer mnemonic. Required with --execute
  --token, -t <token>              Optional Nodely algod/indexer token
  --version, -v <version>          Version string passed to old update methods. Default: sunset
  --close-to <address>             ALGO close-out receiver. Default: deployer
  --phase <all|apps|final>         Execute only a phase. Default: all
  --limit <n>                      Limit non-critical app teardown count for a test slice
`)
      process.exit(0)
    }
  }

  return { network, deployer, execute, mnemonic, algodToken, version, closeTo, phase, limit }
}

function appAddress(appId: bigint | number): string {
  return algosdk.getApplicationAddress(Number(appId)).toString()
}

function keyString(key: Uint8Array): string {
  return Buffer.from(key).toString('utf8')
}

function bytesAddress(bytes: Uint8Array): string {
  return algosdk.encodeAddress(Buffer.from(bytes))
}

async function walletAdmin(indexer: algosdk.Indexer, walletAppId: bigint): Promise<string> {
  const app = (await indexer.lookupApplications(Number(walletAppId)).do()).application
  const admin = (app.params.globalState ?? []).find((kv) => keyString(kv.key) === 'admin')
  if (!admin?.value.bytes) throw new Error(`Could not read admin for wallet ${walletAppId}`)
  return bytesAddress(admin.value.bytes)
}

async function accountHoldings(indexer: algosdk.Indexer, address: string): Promise<{ assetId: bigint; amount: bigint }[]> {
  const account = (await indexer.lookupAccountByID(address).do()).account
  return (account.assets ?? [])
    .map((asset) => ({ assetId: BigInt(asset.assetId), amount: BigInt(asset.amount) }))
    .filter((asset) => asset.amount > 0n)
}

async function findDaoWalletEscrowReclaims(
  algorand: AlgorandClient,
  indexer: algosdk.Indexer,
  walletAppId: bigint,
): Promise<EscrowReclaimTarget[]> {
  const admin = await walletAdmin(indexer, walletAppId)
  const wallet = new WalletSDK({
    algorand,
    factoryParams: {
      appId: walletAppId,
      defaultSender: admin,
      defaultSigner: makeEmptyTransactionSigner(),
    },
  })
  const escrows = await wallet.getEscrows()
  const targets: EscrowReclaimTarget[] = []

  for (const [name, info] of [...escrows.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    if (info.id === 0n) continue
    const address = appAddress(info.id)
    const holdings = await accountHoldings(indexer, address)
    if (holdings.length > 0) targets.push({ name, appId: info.id, address, holdings })
  }

  return targets
}

function signerFromMnemonic(mnemonic: string): { address: string; signer: algosdk.TransactionSigner } {
  const account = algosdk.mnemonicToSecretKey(mnemonic)
  return {
    address: account.addr.toString(),
    signer: makeBasicAccountTransactionSigner(account),
  }
}

async function submitExecution(
  ctx: ScriptContext,
  app: bigint,
  execution: SunsetExecution,
): Promise<bigint> {
  const action: ProposalAction<SDKClient> = {
    type: ProposalActionEnum.UpgradeApp,
    app,
    executionKey: execution.lease,
    groups: execution.ids,
    firstValid: execution.firstValid,
    lastValid: execution.lastValid,
  }

  const proposalId = await proposeAndExecute(ctx.algorand, ctx.dao, [action])
  for (const window of execution.windows) await sendPrepared(window, ctx.algorand.client.algod)
  return proposalId
}

function addPluginTxn(composer: ReturnType<AlgorandClient['newGroup']>, txn: any): void {
  switch (txn.type) {
    case 'pay': composer.addPayment(txn); break
    case 'assetCreate': composer.addAssetCreate(txn); break
    case 'assetConfig': composer.addAssetConfig(txn); break
    case 'assetFreeze': composer.addAssetFreeze(txn); break
    case 'assetDestroy': composer.addAssetDestroy(txn); break
    case 'assetTransfer': composer.addAssetTransfer(txn); break
    case 'assetOptIn': composer.addAssetOptIn(txn); break
    case 'assetOptOut': composer.addAssetOptOut(txn); break
    case 'appCall':
      if (txn.appId !== undefined && txn.appId !== 0n && txn.approvalProgram !== undefined) composer.addAppUpdate(txn)
      else if (txn.appId !== undefined && txn.appId !== 0n) composer.addAppCall(txn)
      else composer.addAppCreate(txn)
      break
    case 'keyReg':
      if (txn.voteKey !== undefined) composer.addOnlineKeyRegistration(txn)
      else composer.addOfflineKeyRegistration(txn)
      break
    case 'txnWithSigner':
      composer.addTransaction(txn.txn, txn.signer)
      break
    case 'methodCall':
      if (txn.appId !== undefined && txn.appId !== 0n && txn.approvalProgram !== undefined) composer.addAppUpdateMethodCall(txn)
      else if (txn.appId !== undefined && txn.appId !== 0n) composer.addAppCallMethodCall(txn)
      else composer.addAppCreateMethodCall(txn)
      break
    default:
      throw new Error(`Unknown plugin transaction type: ${txn.type}`)
  }
}

async function buildLegacyDaoWalletUsePlugin(
  ctx: ScriptContext,
  lease: string,
  calls: ReturnType<typeof ctx.updatePlugin.updateApp>[],
  windowSize = 2000n,
): Promise<SunsetExecution> {
  const suggestedParams = await ctx.algorand.getSuggestedParams()
  const admin = await ctx.dao.wallet.client.state.global.admin()
  const spendingAddress = (await ctx.dao.wallet.client.state.global.controlledAddress())!

  const legacyRekeyToPlugin = algosdk.ABIMethod.fromSignature(
    'arc58_rekeyToPlugin(uint64,bool,string,uint64[],(uint64,uint64)[])void',
  )
  const verifyAuthAddress = algosdk.ABIMethod.fromSignature('arc58_verifyAuthAddress()void')

  const composer = ctx.algorand.newGroup()
  for (const call of calls) {
    const { appId, getTxns } = call(spendingAddress)
    const txns = await getTxns({ wallet: ctx.dao.wallet.client.appId })
    const key = { plugin: appId, caller: ALGORAND_ZERO_ADDRESS_STRING, escrow: '' }
    const plugin = ctx.dao.wallet.plugins.has(key)
      ? ctx.dao.wallet.plugins.get(key)!
      : await ctx.dao.wallet.getPluginByKey(key)
    const methodSignatures = plugin.methods.map((method) => method.name.toString())
    const methodOffsets = txns
      .filter((txn: any) => txn.type === 'methodCall' && txn.appId === appId && methodSignatures.length > 0)
      .map((txn: any) => {
        const selector = txn.method.getSelector().toString()
        const offset = methodSignatures.indexOf(selector)
        if (offset === -1) throw new Error(`Transaction selector does not match any allowed method signatures`)
        return offset
      })

    composer.addAppCallMethodCall({
      sender: ctx.sender,
      signer: ctx.signer,
      appId: ctx.dao.wallet.client.appId,
      method: legacyRekeyToPlugin,
      args: [appId, true, '', methodOffsets, []],
      extraFee: microAlgo(1_000n),
      boxReferences: [executionBoxKey(lease)],
    })
    for (const txn of txns) addPluginTxn(composer, txn)
    composer.addAppCallMethodCall({
      sender: ctx.sender,
      signer: ctx.signer,
      appId: ctx.dao.wallet.client.appId,
      method: verifyAuthAddress,
      args: [],
    })
  }

  const maxFee = microAlgo(BigInt(suggestedParams.minFee) * 272n)
  for (const ctxn of (composer as unknown as { txns: Array<{ type: string; data: { maxFee?: unknown } }> }).txns) {
    if ((ctxn.type === 'appCall' || ctxn.type === 'methodCall') && ctxn.data.maxFee === undefined) {
      ctxn.data.maxFee = maxFee
    }
  }

  const prepared = await prepareGroup(composer, {
    sender: admin as string,
    signer: makeEmptyTransactionSigner(),
  })

  const validityPeriod = 1000n
  const start = BigInt(suggestedParams.firstValid)
  const roundsNeeded = BigInt(Math.ceil(Number(windowSize) / 2.7))
  const endTarget = start + roundsNeeded
  const numGroupsToBuild = Math.ceil(Number(roundsNeeded) / Number(validityPeriod))
  const baseTotalFees = prepared.transactions.reduce((sum, txn) => sum + BigInt(txn.fee ?? 0n), 0n)
  const encodedLease = encodeLease(lease)!
  const realSenderAddr = algosdk.Address.fromString(ctx.sender)

  const execution: SunsetExecution = {
    lease: encodedLease,
    firstValid: start,
    lastValid: endTarget,
    ids: [],
    windows: [],
  }

  for (let i = 0; i < numGroupsToBuild; i++) {
    const groupStartRound = start + (BigInt(i) * validityPeriod)
    const groupEndRound = i === numGroupsToBuild - 1 ? endTarget - 1n : groupStartRound + validityPeriod - 1n
    console.log(`Building legacy wallet group ${i + 1}/${numGroupsToBuild} with start: ${groupStartRound}, end: ${groupEndRound}`)

    const windowTxns = prepared.transactions.map((txn, idx) => {
      const cloned = algosdk.decodeUnsignedTransaction(algosdk.encodeUnsignedTransaction(txn))
      const mutable = cloned as unknown as {
        sender: algosdk.Address
        firstValid: bigint
        lastValid: bigint
        lease?: Uint8Array
        fee: bigint
        group?: Uint8Array
      }
      mutable.group = undefined
      mutable.sender = realSenderAddr
      mutable.firstValid = groupStartRound
      mutable.lastValid = groupEndRound
      if (idx === 0) mutable.lease = encodedLease
      mutable.fee = idx === 0 ? baseTotalFees : 0n
      return cloned
    })
    algosdk.assignGroupID(windowTxns)
    execution.ids.push(windowTxns[0].group!)
    execution.windows.push({
      transactions: windowTxns,
      signers: windowTxns.map(() => ctx.signer),
      groupId: Buffer.from(windowTxns[0].group!).toString('base64'),
      methodCalls: new Map(prepared.methodCalls),
    })
  }

  return execution
}

async function compileApprovals(ctx: ScriptContext): Promise<CompiledApprovals> {
  const sunsetFactory = ctx.algorand.client.getTypedAppFactory(SunsetContractFactory, {
    defaultSender: ctx.sender,
    defaultSigner: ctx.signer,
  })
  const walletFactorySunsetFactory = ctx.algorand.client.getTypedAppFactory(WalletFactorySunsetContractFactory, {
    defaultSender: ctx.sender,
    defaultSigner: ctx.signer,
  })

  const sunset = await sunsetFactory.appFactory.compile({
    deployTimeParams: {
      SUNSET_CALLER: algosdk.decodeAddress(ctx.sender).publicKey,
    },
  })
  const walletFactorySunset = await walletFactorySunsetFactory.appFactory.compile()
  return { sunset, walletFactorySunset }
}

async function waitForConfirmation(algorand: AlgorandClient, txid: string, rounds = 4): Promise<void> {
  const status = await algorand.client.algod.status()
  const start = BigInt(status.lastRound)
  for (let round = start; round <= start + BigInt(rounds); round++) {
    const pending = await algorand.client.algod.pendingTransactionInformation(txid)
    if (pending.confirmedRound && BigInt(pending.confirmedRound) > 0n) return
    if (pending.poolError) throw new Error(`Transaction ${txid} rejected: ${pending.poolError}`)
    await algorand.client.algod.statusAfterBlock(round + 1n)
  }
  throw new Error(`Transaction ${txid} was not confirmed after ${rounds} rounds`)
}

async function directUpdateToSunset(
  ctx: ScriptContext,
  appId: bigint,
  compiled: CompiledApprovals,
): Promise<void> {
  const sp = await ctx.algorand.client.algod.transactionParams()
  const method = algosdk.ABIMethod.fromSignature(DIRECT_UPDATE_SIGNATURE)
  const versionArg = new algosdk.ABIStringType().encode(ctx.options.version)
  const txn = algosdk.makeApplicationUpdateTxnFromObject({
    sender: ctx.sender,
    suggestedParams: sp,
    appIndex: Number(appId),
    approvalProgram: compiled.sunset.approvalProgram,
    clearProgram: compiled.sunset.clearStateProgram,
    appArgs: [method.getSelector(), versionArg],
  })
  const signed = await ctx.signer([txn], [0])
  const { txid } = await ctx.algorand.client.algod.sendRawTransaction(signed)
  await waitForConfirmation(ctx.algorand, txid, 4)
}

async function updateAppViaDao(ctx: ScriptContext, appId: bigint, compiled: CompiledApprovals, lease: string): Promise<bigint> {
  const execution = await buildLegacyDaoWalletUsePlugin(ctx, lease, [
    ctx.updatePlugin.updateApp({
      sender: ctx.sender,
      signer: ctx.signer,
      appId,
      version: ctx.options.version,
      data: compiled.sunset.approvalProgram,
    }),
  ])
  return submitExecution(ctx, appId, execution)
}

async function updateAppToSunset(ctx: ScriptContext, app: AppNode, compiled: CompiledApprovals): Promise<void> {
  const stamp = Date.now() % 1_000_000
  if (app.creator === ctx.sender) {
    console.log(`  updating app ${app.id} directly as creator`)
    await directUpdateToSunset(ctx, BigInt(app.id), compiled)
    return
  }

  console.log(`  updating app ${app.id} through DAO wallet proposal`)
  const proposal = await updateAppViaDao(ctx, BigInt(app.id), compiled, `sun_app_${app.id}_${stamp}`)
  console.log(`    proposal ${proposal} executed`)
}

async function deleteBoxes(
  algorand: AlgorandClient,
  client: SunsetContractClient | WalletFactorySunsetContractClient,
  appId: bigint,
  sender: string,
  signer: algosdk.TransactionSigner,
): Promise<void> {
  const boxes = await algorand.app.getBoxNames(appId)
  for (let i = 0; i < boxes.length; i += BOX_BATCH_SIZE) {
    const batch = boxes.slice(i, i + BOX_BATCH_SIZE).map((b) => b.nameRaw)
    if (batch.length === 0) continue

    await client.send.deleteBoxes({
      sender,
      signer,
      args: { boxes: batch },
      populateAppCallResources: true,
    })
  }
}

function managedAssetsForApp(assets: AssetNode[], appId: number): bigint[] {
  const address = appAddress(appId)
  return assets
    .filter((asset) => !asset.deleted && asset.manager === address && asset.nonZeroHolders <= 1)
    .map((asset) => BigInt(asset.id))
}

async function cleanupSunsetApp(
  ctx: ScriptContext,
  app: AppNode,
  assets: AssetNode[],
  escrows: EscrowNode[],
  closeTo: string,
): Promise<void> {
  const client = new SunsetContractClient({
    algorand: ctx.algorand,
    appId: BigInt(app.id),
    defaultSender: ctx.sender,
    defaultSigner: ctx.signer,
  })

  const ownedEscrows = escrows
    .filter((escrow) => escrow.ownerAppId === app.id)
    .map((escrow) => escrow.id)
    .sort((a, b) => b - a)
  if (ownedEscrows.length > 0) {
    console.log(`  deleting ${ownedEscrows.length} app-owned escrow(s) for app ${app.id}`)
    await client.send.deleteEscrows({
      sender: ctx.sender,
      signer: ctx.signer,
      args: { escrowFactory: ctx.appIds.escrowFactory, escrowIds: ownedEscrows },
      maxFee: microAlgo(BigInt(ownedEscrows.length) * 4_000n + 2_000n),
      coverAppCallInnerTransactionFees: true,
      populateAppCallResources: true,
    })
  }

  await deleteBoxes(ctx.algorand, client, BigInt(app.id), ctx.sender, ctx.signer)

  if (app.assetsHeld.length > 0) {
    console.log(`  closing ${app.assetsHeld.length} asset holding(s) from app ${app.id}`)
    await client.send.closeOut({
      sender: ctx.sender,
      signer: ctx.signer,
      args: {
        closes: app.assetsHeld.map((holding) => ({
          assetCloseTo: ctx.sender,
          xferAsset: BigInt(holding.assetId),
        })),
      },
      maxFee: microAlgo(BigInt(app.assetsHeld.length) * 2_000n + 2_000n),
      coverAppCallInnerTransactionFees: true,
      populateAppCallResources: true,
    })
  }

  const destroyableAssets = managedAssetsForApp(assets, app.id)
  if (destroyableAssets.length > 0) {
    console.log(`  destroying ${destroyableAssets.length} app-managed asset(s) from app ${app.id}`)
    await client.send.deleteAssets({
      sender: ctx.sender,
      signer: ctx.signer,
      args: { assets: destroyableAssets },
      maxFee: microAlgo(BigInt(destroyableAssets.length) * 2_000n + 2_000n),
      coverAppCallInnerTransactionFees: true,
      populateAppCallResources: true,
    })
  }

  await client.send.delete.delete({
    sender: ctx.sender,
    signer: ctx.signer,
    args: { closeRemainderTo: closeTo },
    maxFee: microAlgo(10_000n),
    coverAppCallInnerTransactionFees: true,
  })
}

async function teardownApps(
  ctx: ScriptContext,
  inventory: { apps: AppNode[]; assets: AssetNode[]; escrows: EscrowNode[] },
  compiled: CompiledApprovals,
  closeTo: string,
  limit?: number,
): Promise<void> {
  const targets = getSunsetAppTargets(inventory.apps, ctx.appIds)
  const selected = limit === undefined ? targets : targets.slice(0, limit)
  console.log(`\nPhase apps: tearing down ${selected.length}/${targets.length} non-plugin, non-critical app(s)\n`)

  for (const app of selected) {
    console.log(`App ${app.id} depth=${app.depth}`)
    await updateAppToSunset(ctx, app, compiled)
    await cleanupSunsetApp(ctx, app, inventory.assets, inventory.escrows, closeTo)
    console.log(`  deleted app ${app.id}\n`)
  }
}

async function reclaimDaoWalletEscrows(
  ctx: ScriptContext,
  indexer: algosdk.Indexer,
): Promise<void> {
  const targets = await findDaoWalletEscrowReclaims(ctx.algorand, indexer, ctx.appIds.wallet)
  const reclaims = targets.flatMap((target) => (
    target.holdings.map((holding) => ({
      escrow: target.name,
      asset: holding.assetId,
      amount: holding.amount,
      closeOut: true,
    }))
  ))
  if (reclaims.length === 0) {
    console.log('  DAO wallet escrows have no ASA balances to reclaim')
    return
  }

  const sunsetDao = new SunsetContractClient({
    algorand: ctx.algorand,
    appId: ctx.appIds.dao,
    defaultSender: ctx.sender,
    defaultSigner: ctx.signer,
  })

  for (let i = 0; i < reclaims.length; i += RECLAIM_BATCH_SIZE) {
    const batch = reclaims.slice(i, i + RECLAIM_BATCH_SIZE)
    console.log(`  reclaiming DAO wallet escrow ASA batch ${i / RECLAIM_BATCH_SIZE + 1}`)
    await sunsetDao.send.reclaimWalletEscrows({
      sender: ctx.sender,
      signer: ctx.signer,
      args: {
        wallet: ctx.appIds.wallet,
        reclaims: batch.map((reclaim) => [reclaim.escrow, reclaim.asset, reclaim.amount, reclaim.closeOut]),
      },
      maxFee: microAlgo(BigInt(batch.length) * 5_000n + 2_000n),
      coverAppCallInnerTransactionFees: true,
      populateAppCallResources: true,
    })
  }
}

async function teardownFinalInfrastructure(
  ctx: ScriptContext,
  inventory: { apps: AppNode[]; assets: AssetNode[]; escrows: EscrowNode[] },
  compiled: CompiledApprovals,
  closeTo: string,
): Promise<void> {
  await ctx.dao.getWallet()
  const stamp = Date.now() % 1_000_000

  console.log('\nPhase final: storing SunsetContract as wallet factory child')
  const childExecution = await buildLegacyDaoWalletUsePlugin(ctx, `sun_child_${stamp}`, [
    ctx.updatePlugin.updateFactoryChildContract({
      sender: ctx.sender,
      signer: ctx.signer,
      factoryAppId: ctx.appIds.walletFactory,
      version: ctx.options.version,
      data: compiled.sunset.approvalProgram,
    }),
  ])
  console.log(`  proposal ${await submitExecution(ctx, ctx.appIds.walletFactory, childExecution)} executed`)

  console.log('Phase final: updating wallet factory to special sunset approval')
  const factoryExecution = await buildLegacyDaoWalletUsePlugin(ctx, `sun_factory_${stamp}`, [
    ctx.updatePlugin.updateApp({
      sender: ctx.sender,
      signer: ctx.signer,
      appId: ctx.appIds.walletFactory,
      version: ctx.options.version,
      data: compiled.walletFactorySunset.approvalProgram,
    }),
  ])
  console.log(`  proposal ${await submitExecution(ctx, ctx.appIds.walletFactory, factoryExecution)} executed`)

  console.log('Phase final: updating DAO to SunsetContract')
  const daoExecution = await buildLegacyDaoWalletUsePlugin(ctx, `sun_dao_${stamp}`, [
    ctx.updatePlugin.updateApp({
      sender: ctx.sender,
      signer: ctx.signer,
      appId: ctx.appIds.dao,
      version: ctx.options.version,
      data: compiled.sunset.approvalProgram,
    }),
  ])
  console.log(`  proposal ${await submitExecution(ctx, ctx.appIds.dao, daoExecution)} executed`)

  const indexer = getIndexer(ctx.options.network)
  console.log('Phase final: reclaiming DAO wallet escrow assets through sunset DAO')
  await reclaimDaoWalletEscrows(ctx, indexer)

  const sunsetDao = new SunsetContractClient({
    algorand: ctx.algorand,
    appId: ctx.appIds.dao,
    defaultSender: ctx.sender,
    defaultSigner: ctx.signer,
  })

  console.log('Phase final: deleting DAO boxes and DAO app')
  await deleteBoxes(ctx.algorand, sunsetDao, ctx.appIds.dao, ctx.sender, ctx.signer)
  await sunsetDao.send.delete.delete({
    sender: ctx.sender,
    signer: ctx.signer,
    args: { closeRemainderTo: closeTo },
    maxFee: microAlgo(10_000n),
    coverAppCallInnerTransactionFees: true,
  })

  const factorySunset = new WalletFactorySunsetContractClient({
    algorand: ctx.algorand,
    appId: ctx.appIds.walletFactory,
    defaultSender: ctx.sender,
    defaultSigner: ctx.signer,
  })

  console.log('Phase final: updating DAO wallet to SunsetContract via special factory')
  await factorySunset.send.updateWallet({
    sender: ctx.sender,
    signer: ctx.signer,
    args: { wallet: ctx.appIds.wallet },
    maxFee: microAlgo(10_000n),
    coverAppCallInnerTransactionFees: true,
  })

  const walletAddress = appAddress(ctx.appIds.wallet)
  const walletHeldAssets = await accountHoldings(indexer, walletAddress)
  if (walletHeldAssets.length > 0) {
    console.log(`Phase final: closing ${walletHeldAssets.length} DAO wallet asset holding(s)`)
    await factorySunset.send.closeOutWallet({
      sender: ctx.sender,
      signer: ctx.signer,
      args: {
        wallet: ctx.appIds.wallet,
        closes: walletHeldAssets.map((holding) => ({
          assetCloseTo: ctx.sender,
          xferAsset: holding.assetId,
        })),
      },
      maxFee: microAlgo(BigInt(walletHeldAssets.length) * 2_000n + 2_000n),
      coverAppCallInnerTransactionFees: true,
      populateAppCallResources: true,
    })
  }

  const walletManagedAssets = inventory.assets
    .filter((asset) => !asset.deleted && asset.manager === walletAddress && asset.nonZeroHolders <= 1)
    .map((asset) => BigInt(asset.id))
  if (walletManagedAssets.length > 0) {
    console.log(`Phase final: destroying ${walletManagedAssets.length} DAO wallet-managed asset(s)`)
    await factorySunset.send.deleteWalletAssets({
      sender: ctx.sender,
      signer: ctx.signer,
      args: { wallet: ctx.appIds.wallet, assets: walletManagedAssets },
      maxFee: microAlgo(BigInt(walletManagedAssets.length) * 2_000n + 2_000n),
      coverAppCallInnerTransactionFees: true,
      populateAppCallResources: true,
    })
  }

  const walletEscrows = inventory.escrows
    .filter((escrow) => escrow.ownerAppId === Number(ctx.appIds.wallet))
    .map((escrow) => escrow.id)
    .sort((a, b) => b - a)
  if (walletEscrows.length > 0) {
    console.log(`Phase final: deleting ${walletEscrows.length} DAO wallet-owned escrow app(s)`)
    await factorySunset.send.deleteWalletEscrows({
      sender: ctx.sender,
      signer: ctx.signer,
      args: {
        wallet: ctx.appIds.wallet,
        escrowFactory: ctx.appIds.escrowFactory,
        escrowIds: walletEscrows,
      },
      maxFee: microAlgo(BigInt(walletEscrows.length) * 5_000n + 2_000n),
      coverAppCallInnerTransactionFees: true,
      populateAppCallResources: true,
    })
  }

  console.log('Phase final: deleting DAO wallet boxes and app')
  const walletBoxes = await ctx.algorand.app.getBoxNames(ctx.appIds.wallet)
  for (let i = 0; i < walletBoxes.length; i += BOX_BATCH_SIZE) {
    await factorySunset.send.deleteWalletBoxes({
      sender: ctx.sender,
      signer: ctx.signer,
      args: {
        wallet: ctx.appIds.wallet,
        boxes: walletBoxes.slice(i, i + BOX_BATCH_SIZE).map((b) => b.nameRaw),
      },
      maxFee: microAlgo(10_000n),
      coverAppCallInnerTransactionFees: true,
      populateAppCallResources: true,
    })
  }
  await factorySunset.send.deleteWallet({
    sender: ctx.sender,
    signer: ctx.signer,
    args: { wallet: ctx.appIds.wallet, closeRemainderTo: closeTo },
    maxFee: microAlgo(10_000n),
    coverAppCallInnerTransactionFees: true,
  })

  console.log('Phase final: deleting escrow factory')
  const escrowFactoryApp = inventory.apps.find((app) => app.id === Number(ctx.appIds.escrowFactory))
  if (!escrowFactoryApp) throw new Error(`Could not find escrow factory ${ctx.appIds.escrowFactory} in inventory`)
  await directUpdateToSunset(ctx, ctx.appIds.escrowFactory, compiled)
  await cleanupSunsetApp(ctx, escrowFactoryApp, inventory.assets, [], closeTo)

  console.log('Phase final: deleting wallet factory')
  await factorySunset.send.deleteBoxedContract({ sender: ctx.sender, signer: ctx.signer })
  await deleteBoxes(ctx.algorand, factorySunset, ctx.appIds.walletFactory, ctx.sender, ctx.signer)
  await factorySunset.send.delete.delete({
    sender: ctx.sender,
    signer: ctx.signer,
    args: { closeRemainderTo: closeTo },
    maxFee: microAlgo(10_000n),
    coverAppCallInnerTransactionFees: true,
  })
}

function printDryRunSummary(
  args: Args,
  inventory: { apps: AppNode[]; assets: AssetNode[]; escrows: EscrowNode[] },
  appIds: ReturnType<typeof getNetworkAppIds>,
  reclaims: EscrowReclaimTarget[],
): void {
  printPlan(inventory.apps, inventory.assets, inventory.escrows, appIds, args.deployer)

  const pluginIds = getPluginAppIds(appIds)
  const criticalIds = getCriticalAppIds(appIds)
  const targets = getSunsetAppTargets(inventory.apps, appIds)
  const selected = args.limit === undefined ? targets : targets.slice(0, args.limit)
  const reclaimHoldings = reclaims.reduce((sum, target) => sum + target.holdings.length, 0)

  console.log('\nExecutable one-command flow:')
  console.log(`  npm run sunset:execute-deployer -- --network ${args.network} --execute --mnemonic "deployer mnemonic"`)
  console.log('\nThis script will:')
  console.log(`  - update/clean/delete ${selected.length}${args.limit ? ` of ${targets.length}` : ''} non-plugin target app(s), deepest first`)
  console.log(`  - leave ${inventory.apps.filter((app) => pluginIds.has(app.id)).length} plugin app(s) in place`)
  console.log(`  - preserve critical infra until final stage: ${[...criticalIds].sort((a, b) => a - b).join(', ')}`)
  console.log(`  - reclaim ${reclaimHoldings} DAO-wallet escrow ASA holding(s) before deleting the DAO`)
  console.log('  - delete DAO-wallet escrow apps before deleting escrowFactory')
  console.log('  - delete DAO, DAO wallet, escrowFactory, and walletFactory in dependency order')
  console.log('\nUse --phase apps or --phase final to resume a specific half, and --limit n for a small first slice.')
}

async function main(): Promise<void> {
  const args = parseArgs()
  setCurrentNetwork(args.network)
  const appIds = getNetworkAppIds(args.network)
  const algorand = createAlgorandClient(args.network, args.algodToken)
  const indexer = getIndexer(args.network)

  const inventory = await discoverDeployerInventory(args.network, args.deployer)
  const reclaims = await findDaoWalletEscrowReclaims(algorand, indexer, appIds.wallet)

  if (!args.execute) {
    printDryRunSummary(args, inventory, appIds, reclaims)
    return
  }

  if (!args.mnemonic) throw new Error('--execute requires --mnemonic for the deployer account')
  const deployerSigner = signerFromMnemonic(args.mnemonic)
  if (deployerSigner.address !== args.deployer) {
    throw new Error(`--mnemonic resolves to ${deployerSigner.address}, expected deployer ${args.deployer}`)
  }

  const ctx = await setupContext({
    network: args.network,
    mnemonic: args.mnemonic,
    version: args.version,
    dryRun: false,
    algodToken: args.algodToken,
  }, { minBalance: 20_000_000n })
  if (ctx.sender !== args.deployer) throw new Error(`Signer ${ctx.sender} does not match deployer ${args.deployer}`)
  const closeTo = args.closeTo ?? args.deployer

  await ctx.dao.getWallet()
  await ctx.dao.wallet.getPlugins()

  console.log('Compiling sunset approvals...')
  const compiled = await compileApprovals(ctx)
  console.log(`  SunsetContract approval: ${compiled.sunset.approvalProgram.length} bytes`)
  console.log(`  WalletFactorySunset approval: ${compiled.walletFactorySunset.approvalProgram.length} bytes\n`)

  if (args.phase === 'all' || args.phase === 'apps') {
    await teardownApps(ctx, inventory, compiled, closeTo, args.limit)
  }
  if (args.phase === 'all' || args.phase === 'final') {
    await teardownFinalInfrastructure(ctx, inventory, compiled, closeTo)
  }

  console.log('='.repeat(80))
  console.log('DEPLOYER SUNSET COMPLETE')
  console.log('='.repeat(80))
  console.log(`Network: ${args.network}`)
  console.log(`Close remainder to: ${closeTo}`)
  console.log('Plugin apps were intentionally left in place.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

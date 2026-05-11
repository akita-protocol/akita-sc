#!/usr/bin/env node

/**
 * Ordered sunset cleanup for the DAO / DAO wallet / wallet factory cycle.
 *
 * The important dependency is:
 * - the DAO wallet can update DAO-owned apps while it is still ARC58;
 * - the wallet factory created the DAO wallet, so a special final factory
 *   approval can update and delete the DAO wallet after the DAO is gone;
 * - the factory itself is deleted last.
 */

import { microAlgo } from '@algorandfoundation/algokit-utils'
import { AlgorandClient } from '@algorandfoundation/algokit-utils'
import { ProposalAction, ProposalActionEnum } from 'akita-sdk/dao'
import { SDKClient, sendPrepared } from 'akita-sdk'
import algosdk from 'algosdk'
import { parseBaseArgs, runScript, setupContext } from './script-base'
import { proposeAndExecute } from './utils'
import { SunsetContractClient, SunsetContractFactory } from '../smart_contracts/artifacts/sunset/SunsetContractClient'
import { WalletFactorySunsetContractClient, WalletFactorySunsetContractFactory } from '../smart_contracts/artifacts/sunset/WalletFactorySunsetContractClient'

const BOX_BATCH_SIZE = 8

function parseCloseTo(defaultCloseTo: string): string {
  const args = process.argv.slice(2)
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--close-to') {
      return args[i + 1]
    }
  }
  return defaultCloseTo
}

async function submitExecution(
  ctx: Awaited<ReturnType<typeof setupContext>>,
  app: bigint,
  execution: Awaited<ReturnType<typeof ctx.dao.wallet.build.usePlugin>>,
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
  for (const window of execution.windows) {
    await sendPrepared(window, ctx.algorand.client.algod)
  }

  return proposalId
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

runScript(async () => {
  const options = parseBaseArgs('sunset-cleanup.ts', `
  --close-to <address>         Account that receives remaining ALGO from deleted apps. Default: sender`)

  console.log(`\nStarting sunset cleanup on ${options.network}...\n`)
  const ctx = await setupContext(options, { minBalance: 20_000_000n })
  const closeTo = parseCloseTo(ctx.sender)

  const sunsetFactory = ctx.algorand.client.getTypedAppFactory(SunsetContractFactory, {
    defaultSender: ctx.sender,
    defaultSigner: ctx.signer,
  })
  const walletFactorySunsetFactory = ctx.algorand.client.getTypedAppFactory(WalletFactorySunsetContractFactory, {
    defaultSender: ctx.sender,
    defaultSigner: ctx.signer,
  })

  console.log('Compiling sunset approvals...')
  const sunsetCompiled = await sunsetFactory.appFactory.compile({
    deployTimeParams: {
      SUNSET_CALLER: algosdk.decodeAddress(ctx.sender).publicKey,
    },
  })
  const factorySunsetCompiled = await walletFactorySunsetFactory.appFactory.compile()
  console.log(`  SunsetContract approval: ${sunsetCompiled.approvalProgram.length} bytes`)
  console.log(`  WalletFactorySunset approval: ${factorySunsetCompiled.approvalProgram.length} bytes\n`)

  if (options.dryRun) {
    console.log('DRY RUN - planned order:')
    console.log('  1. Store SunsetContract as the wallet factory child contract')
    console.log('  2. Update the wallet factory app to WalletFactorySunsetContract')
    console.log('  3. Update the DAO app to SunsetContract and delete it')
    console.log('  4. Use the special factory to update the DAO wallet to SunsetContract')
    console.log('  5. Use the special factory to delete the DAO wallet')
    console.log('  6. Delete the factory boxed child contract and then delete the factory')
    return
  }

  await ctx.dao.getWallet()

  const stamp = Date.now() % 1_000_000

  console.log('Step 1: storing SunsetContract as factory child...')
  const childExecution = await ctx.dao.wallet.build.usePlugin({
    sender: ctx.sender,
    signer: ctx.signer,
    lease: `sun_child_${stamp}`,
    windowSize: 2000n,
    global: true,
    calls: [
      ctx.updatePlugin.updateFactoryChildContract({
        sender: ctx.sender,
        signer: ctx.signer,
        factoryAppId: ctx.appIds.walletFactory,
        version: options.version,
        data: sunsetCompiled.approvalProgram,
      }),
    ],
  })
  const childProposal = await submitExecution(ctx, ctx.appIds.walletFactory, childExecution)
  console.log(`  proposal ${childProposal} executed\n`)

  console.log('Step 2: updating wallet factory to special sunset approval...')
  const factoryExecution = await ctx.dao.wallet.build.usePlugin({
    sender: ctx.sender,
    signer: ctx.signer,
    lease: `sun_factory_${stamp}`,
    windowSize: 2000n,
    global: true,
    calls: [
      ctx.updatePlugin.updateApp({
        sender: ctx.sender,
        signer: ctx.signer,
        appId: ctx.appIds.walletFactory,
        version: options.version,
        data: factorySunsetCompiled.approvalProgram,
      }),
    ],
  })
  const factoryProposal = await submitExecution(ctx, ctx.appIds.walletFactory, factoryExecution)
  console.log(`  proposal ${factoryProposal} executed\n`)

  console.log('Step 3: updating DAO to SunsetContract...')
  const daoExecution = await ctx.dao.wallet.build.usePlugin({
    sender: ctx.sender,
    signer: ctx.signer,
    lease: `sun_dao_${stamp}`,
    windowSize: 2000n,
    global: true,
    calls: [
      ctx.updatePlugin.updateApp({
        sender: ctx.sender,
        signer: ctx.signer,
        appId: ctx.appIds.dao,
        version: options.version,
        data: sunsetCompiled.approvalProgram,
      }),
    ],
  })
  const daoProposal = await submitExecution(ctx, ctx.appIds.dao, daoExecution)
  console.log(`  proposal ${daoProposal} executed\n`)

  const sunsetDao = new SunsetContractClient({
    algorand: ctx.algorand,
    appId: ctx.appIds.dao,
    defaultSender: ctx.sender,
    defaultSigner: ctx.signer,
  })

  console.log('Step 4: deleting DAO boxes and DAO app...')
  await deleteBoxes(ctx.algorand, sunsetDao, ctx.appIds.dao, ctx.sender, ctx.signer)
  await sunsetDao.send.delete.delete({
    sender: ctx.sender,
    signer: ctx.signer,
    args: { closeRemainderTo: closeTo },
    maxFee: microAlgo(10_000n),
    coverAppCallInnerTransactionFees: true,
  })
  console.log('  DAO deleted\n')

  const factorySunset = new WalletFactorySunsetContractClient({
    algorand: ctx.algorand,
    appId: ctx.appIds.walletFactory,
    defaultSender: ctx.sender,
    defaultSigner: ctx.signer,
  })

  console.log('Step 5: updating DAO wallet to SunsetContract via special factory...')
  await factorySunset.send.updateWallet({
    sender: ctx.sender,
    signer: ctx.signer,
    args: { wallet: ctx.appIds.wallet },
    maxFee: microAlgo(10_000n),
    coverAppCallInnerTransactionFees: true,
  })
  console.log('  DAO wallet updated\n')

  console.log('Step 6: deleting DAO wallet boxes and DAO wallet app via special factory...')
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
  console.log('  DAO wallet deleted\n')

  console.log('Step 7: deleting wallet factory...')
  await factorySunset.send.deleteBoxedContract({ sender: ctx.sender, signer: ctx.signer })
  await deleteBoxes(ctx.algorand, factorySunset, ctx.appIds.walletFactory, ctx.sender, ctx.signer)
  await factorySunset.send.delete.delete({
    sender: ctx.sender,
    signer: ctx.signer,
    args: { closeRemainderTo: closeTo },
    maxFee: microAlgo(10_000n),
    coverAppCallInnerTransactionFees: true,
  })

  console.log('='.repeat(80))
  console.log('SUNSET CLEANUP COMPLETE')
  console.log('='.repeat(80))
  console.log(`Network: ${options.network}`)
  console.log(`Close remainder to: ${closeTo}`)
  console.log(`Proposals: child=${childProposal}, factory=${factoryProposal}, dao=${daoProposal}`)
})

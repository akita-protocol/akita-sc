#!/usr/bin/env node

/**
 * Ordered sunset cleanup for the DAO / DAO wallet / wallet factory cycle.
 *
 * The important dependency is:
 * - the DAO wallet can update DAO-owned apps while it is still ARC58;
 * - the wallet factory created the DAO wallet, so a special final factory
 *   approval can update and delete the DAO wallet;
 * - the DAO wallet is sunset and deleted before the DAO (ACCT-1: once the push
 *   is sent the wallet cannot go back, so it is simulated first while the DAO
 *   still governs);
 * - the factory itself is deleted last.
 */

import { microAlgo } from '@algorandfoundation/algokit-utils'
import { AlgorandClient } from '@algorandfoundation/algokit-utils'
import { ProposalAction, ProposalActionEnum } from 'akita-sdk/dao'
import { SDKClient, sendPrepared } from 'akita-sdk'
import { CallerType } from 'akita-sdk/wallet'
import algosdk from 'algosdk'
import { parseBaseArgs, runScript, setupContext } from './script-base'
import { proposeAndExecute } from './utils'
import { daoWalletSunsetSteps, sendDaoWalletSunset, simulateDaoWalletSunset, walletAssetCloses, walletFactorySunsetCalls } from './lib/sunset-steps'
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
  // The factory sunset approval is caller-gated by the same SUNSET_CALLER as SunsetContract.
  const factorySunsetCompiled = await walletFactorySunsetFactory.appFactory.compile({
    deployTimeParams: {
      SUNSET_CALLER: algosdk.decodeAddress(ctx.sender).publicKey,
    },
  })
  console.log(`  SunsetContract approval: ${sunsetCompiled.approvalProgram.length} bytes`)
  console.log(`  WalletFactorySunset approval: ${factorySunsetCompiled.approvalProgram.length} bytes\n`)

  if (options.dryRun) {
    console.log('DRY RUN - planned order:')
    console.log('  1. In ONE execution group: store SunsetContract as the wallet factory child and update the')
    console.log('     wallet factory app to WalletFactorySunsetContract (ACCT-2: no window with SunsetContract staged)')
    console.log('  2. Simulate the DAO wallet sunset (push, asset close-outs, box deletes, delete)')
    console.log('  3. Use the special factory to update the DAO wallet to SunsetContract and delete it')
    console.log('  4. Update the DAO app to SunsetContract and delete it')
    console.log('  5. Delete the factory boxed child contract and then delete the factory')
    return
  }

  await ctx.dao.getWallet()

  const stamp = Date.now() % 1_000_000

  console.log('Step 1: staging SunsetContract and swapping the wallet factory approval (one group)...')
  const factoryExecution = await ctx.dao.wallet.build.usePlugin({
    sender: ctx.sender,
    signer: ctx.signer,
    lease: `sun_factory_${stamp}`,
    windowSize: 2000n,
    callerType: CallerType.Global,
    calls: walletFactorySunsetCalls(ctx.updatePlugin, {
      sender: ctx.sender,
      signer: ctx.signer,
      walletFactory: ctx.appIds.walletFactory,
      version: options.version,
      sunset: sunsetCompiled,
      walletFactorySunset: factorySunsetCompiled,
    }),
  })
  const factoryProposal = await submitExecution(ctx, ctx.appIds.walletFactory, factoryExecution)
  console.log(`  proposal ${factoryProposal} executed\n`)

  const factorySunset = new WalletFactorySunsetContractClient({
    algorand: ctx.algorand,
    appId: ctx.appIds.walletFactory,
    defaultSender: ctx.sender,
    defaultSigner: ctx.signer,
  })

  const walletAddress = algosdk.getApplicationAddress(ctx.appIds.wallet).toString()
  const steps = daoWalletSunsetSteps({
    sender: ctx.sender,
    signer: ctx.signer,
    wallet: ctx.appIds.wallet,
    escrowFactory: ctx.appIds.escrowFactory,
    closeTo,
    inventory: {
      heldAssets: await walletAssetCloses(ctx.algorand, walletAddress, ctx.sender),
      managedAssets: [],
      escrowIds: [],
      boxes: (await ctx.algorand.app.getBoxNames(ctx.appIds.wallet)).map((b) => b.nameRaw),
    },
  })

  // ACCT-1: the DAO wallet push is irreversible; simulate it with every step after it while the DAO is live.
  console.log('Step 2: simulating the DAO wallet sunset...')
  console.log(`  ${await simulateDaoWalletSunset(factorySunset, steps)} step(s) simulated\n`)

  console.log('Step 3: sunsetting and deleting the DAO wallet via special factory...')
  await sendDaoWalletSunset(factorySunset, steps)
  console.log('  DAO wallet deleted\n')

  console.log('Step 4: updating DAO to SunsetContract and deleting it...')
  const daoExecution = await ctx.dao.wallet.build.usePlugin({
    sender: ctx.sender,
    signer: ctx.signer,
    lease: `sun_dao_${stamp}`,
    windowSize: 2000n,
    callerType: CallerType.Global,
    calls: [
      ctx.updatePlugin.updateApp({
        sender: ctx.sender,
        signer: ctx.signer,
        appId: ctx.appIds.dao,
        version: options.version,
        data: sunsetCompiled.approvalProgram,
        clearProgram: sunsetCompiled.clearStateProgram,
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
  await deleteBoxes(ctx.algorand, sunsetDao, ctx.appIds.dao, ctx.sender, ctx.signer)
  await sunsetDao.send.delete.delete({
    sender: ctx.sender,
    signer: ctx.signer,
    args: { closeRemainderTo: closeTo },
    maxFee: microAlgo(10_000n),
    coverAppCallInnerTransactionFees: true,
  })
  console.log('  DAO deleted\n')

  console.log('Step 5: deleting wallet factory...')
  await factorySunset.send.deleteBoxedContract({ sender: ctx.sender, signer: ctx.signer, args: [] })
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
  console.log(`Proposals: factory=${factoryProposal}, dao=${daoProposal}`)
})

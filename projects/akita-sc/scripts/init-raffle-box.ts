#!/usr/bin/env node

/**
 * Initialize Raffle Factory Box Storage (one-time)
 *
 * One-time script to initialize the RaffleFactory's boxedContract
 * with the compiled Raffle approval program. This must be called by the
 * deployer (contract creator) since initBoxedContract requires
 * Txn.sender === Global.creatorAddress when the box doesn't exist.
 *
 * After this, future child contract updates go through the DAO via
 * updateFactoryChildContract (npm run update:raffle).
 *
 * Usage:
 *   npm run init:raffle-box -- -n testnet -m "your mnemonic" -v "0.0.2"
 */

import { microAlgo } from '@algorandfoundation/algokit-utils'
import { parseBaseArgs, createAlgorandClient, runScript } from './script-base'
import { setCurrentNetwork, getNetworkAppIds } from 'akita-sdk'
import algosdk, { makeBasicAccountTransactionSigner } from 'algosdk'
import { RaffleFactoryClient } from '../smart_contracts/artifacts/raffle/RaffleFactoryClient'
import { RaffleFactory } from '../smart_contracts/artifacts/raffle/RaffleClient'

runScript(async () => {
  const options = parseBaseArgs('init-raffle-box.ts')
  console.log(`\nInitializing Raffle Factory box storage on ${options.network}...\n`)

  if (!options.mnemonic && options.network !== 'localnet') {
    console.error('Error: --mnemonic is required (must be the deployer/creator account)')
    process.exit(1)
  }

  setCurrentNetwork(options.network)
  const appIds = getNetworkAppIds(options.network)
  const algorand = createAlgorandClient(options.network)

  let sender: string
  let signer: algosdk.TransactionSigner

  if (options.mnemonic) {
    const account = algosdk.mnemonicToSecretKey(options.mnemonic)
    sender = account.addr.toString()
    signer = makeBasicAccountTransactionSigner(account)
  } else {
    // localnet
    const { algorandFixture } = await import('@algorandfoundation/algokit-utils/testing')
    const fixture = algorandFixture()
    await fixture.newScope()
    const account = fixture.context.testAccount as algosdk.Account
    sender = account.addr.toString()
    signer = (account as any).signer
  }

  console.log(`Deployer account: ${sender}`)
  console.log(`Raffle Factory app: ${appIds.raffleFactory}\n`)

  // Compile the Raffle child contract
  const raffleFactory = new RaffleFactory({
    algorand,
    defaultSender: sender,
    defaultSigner: signer,
  })
  const compiled = await raffleFactory.appFactory.compile()
  const size = compiled.approvalProgram.length
  console.log(`Raffle approval program: ${size} bytes`)

  // Calculate chunking
  const perTxn = 2048 - 4 - 8 - 4 // max args - selector - offset - dynamic byte array header
  const uploadCount = 1 + Math.floor(size / perTxn)
  console.log(`Upload chunks: ${uploadCount}\n`)

  if (options.dryRun) {
    console.log('DRY RUN - Would initialize box and upload Raffle bytecode\n')
    return
  }

  // Fund the raffle factory app account to cover box MBR
  // Box MBR = 2500 + 400 * (key_size + value_size) = 2500 + 400 * (2 + size)
  const boxMbr = 2500n + 400n * (2n + BigInt(size))
  const appAddress = algosdk.getApplicationAddress(appIds.raffleFactory)
  const appInfo = await algorand.account.getInformation(appAddress)
  const surplus = BigInt(appInfo.balance.microAlgos) - BigInt(appInfo.minBalance.microAlgos)
  if (surplus < boxMbr) {
    const needed = boxMbr - surplus + 100_000n // small buffer
    console.log(`Funding raffle factory app with ${needed} microAlgo for box MBR...`)
    await algorand.send.payment({
      sender,
      signer,
      receiver: appAddress,
      amount: microAlgo(needed),
    })
  }

  // Get the raffle factory client
  const client = algorand.client.getTypedAppClientById(RaffleFactoryClient, {
    appId: appIds.raffleFactory,
    defaultSender: sender,
    defaultSigner: signer,
  })

  // Build init + load calls
  const initParams = await client.params.initBoxedContract({
    args: { version: options.version, size },
  })

  const loadParams = []
  for (let i = 0; i < uploadCount; i++) {
    const chunk = compiled.approvalProgram.slice(i * perTxn, (i + 1) * perTxn)
    loadParams.push(
      await client.params.loadBoxedContract({
        args: { offset: i * perTxn, data: chunk },
      }),
    )
  }

  // Send as a single atomic group
  const composer = await client.newGroup().composer()
  composer.addAppCallMethodCall(initParams)
  for (const p of loadParams) {
    composer.addAppCallMethodCall(p)
  }
  await composer.send()

  console.log('Box initialized and Raffle bytecode uploaded.\n')

  console.log('='.repeat(80))
  console.log('RAFFLE FACTORY BOX INITIALIZATION COMPLETE!')
  console.log('='.repeat(80))
  console.log(`
Summary:
  Network: ${options.network}
  Raffle Factory App ID: ${appIds.raffleFactory}
  Raffle bytecode size: ${size} bytes
  Child version: ${options.version}

Future child contract updates can now use:
  npm run update:raffle -- -n ${options.network} -m "..." -v "X.Y.Z"
`)
})

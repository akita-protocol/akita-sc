#!/usr/bin/env node

/**
 * Initialize Marketplace Box Storage (one-time)
 *
 * One-time script to initialize the Marketplace factory's boxedContract
 * with the compiled Listing approval program. This must be called by the
 * deployer (contract creator) since initBoxedContract requires
 * Txn.sender === Global.creatorAddress when the box doesn't exist.
 *
 * After this, future child contract updates go through the DAO via
 * updateFactoryChildContract (npm run update:marketplace).
 *
 * Usage:
 *   npm run init:marketplace-box -- -n testnet -m "your mnemonic" -v "0.0.2"
 */

import { microAlgo } from '@algorandfoundation/algokit-utils'
import { parseBaseArgs, createAlgorandClient, runScript } from './script-base'
import { setCurrentNetwork, getNetworkAppIds } from 'akita-sdk'
import algosdk, { makeBasicAccountTransactionSigner } from 'algosdk'
import { MarketplaceClient } from '../smart_contracts/artifacts/marketplace/MarketplaceClient'
import { ListingFactory } from '../smart_contracts/artifacts/marketplace/ListingClient'

runScript(async () => {
  const options = parseBaseArgs('init-marketplace-box.ts')
  console.log(`\nInitializing Marketplace box storage on ${options.network}...\n`)

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
  console.log(`Marketplace app: ${appIds.marketplace}\n`)

  // Compile the Listing child contract
  const listingFactory = new ListingFactory({
    algorand,
    defaultSender: sender,
    defaultSigner: signer,
  })
  const compiled = await listingFactory.appFactory.compile()
  const size = compiled.approvalProgram.length
  console.log(`Listing approval program: ${size} bytes`)

  // Calculate chunking
  const perTxn = 2048 - 4 - 8 - 4 // max args - selector - offset - dynamic byte array header
  const uploadCount = 1 + Math.floor(size / perTxn)
  console.log(`Upload chunks: ${uploadCount}\n`)

  if (options.dryRun) {
    console.log('DRY RUN - Would initialize box and upload Listing bytecode\n')
    return
  }

  // Fund the marketplace app account to cover box MBR
  // Box MBR = 2500 + 400 * (key_size + value_size) = 2500 + 400 * (2 + size)
  const boxMbr = 2500n + 400n * (2n + BigInt(size))
  const appAddress = algosdk.getApplicationAddress(appIds.marketplace)
  const appInfo = await algorand.account.getInformation(appAddress)
  const surplus = BigInt(appInfo.balance.microAlgos) - BigInt(appInfo.minBalance.microAlgos)
  if (surplus < boxMbr) {
    const needed = boxMbr - surplus + 100_000n // small buffer
    console.log(`Funding marketplace app with ${needed} microAlgo for box MBR...`)
    await algorand.send.payment({
      sender,
      signer,
      receiver: appAddress,
      amount: microAlgo(needed),
    })
  }

  // Get the marketplace client
  const client = algorand.client.getTypedAppClientById(MarketplaceClient, {
    appId: appIds.marketplace,
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

  console.log('Box initialized and Listing bytecode uploaded.\n')

  console.log('='.repeat(80))
  console.log('MARKETPLACE BOX INITIALIZATION COMPLETE!')
  console.log('='.repeat(80))
  console.log(`
Summary:
  Network: ${options.network}
  Marketplace App ID: ${appIds.marketplace}
  Listing bytecode size: ${size} bytes
  Child version: ${options.version}

Future child contract updates can now use:
  npm run update:marketplace -- -n ${options.network} -m "..." -v "X.Y.Z"
`)
})

#!/usr/bin/env node

/**
 * Register the Akita Haystack/Deflex referral escrow.
 *
 * Usage:
 *   ts-node scripts/register-haystack-referrer.ts --network mainnet --mnemonic "..."
 *   ts-node scripts/register-haystack-referrer.ts --dry-run --network mainnet
 */

import algosdk, {
  LogicSigAccount,
  makeApplicationOptInTxnFromObject,
  makePaymentTxnWithSuggestedParamsFromObject,
  signLogicSigTransactionObject,
  waitForConfirmation,
} from 'algosdk'

type Network = 'localnet' | 'testnet' | 'mainnet'

const DEFAULT_NETWORK: Network = 'mainnet'
const DEFAULT_TREASURY_APP_ID = 3041355560n
const DEFAULT_REFERRER_ADDRESS = 'YOIPMYT4NRBL7NGRXGIDILLLGZ7VG2CV3PYVEDSMJKE5TY5BMT7PP7J62Y'
const DEFAULT_ESCROW_MIN_BALANCE = 257_000n
const TEMPLATE_CONFIG_OFFSET = 3

const ESCROW_TEMPLATE_TEAL = `#pragma version 8


// Configuration config = "\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xFF\\xFF\\xFF\\xFF\\xFF\\xFF\\xFF\\xFF" [slot 0]
pushbytes "\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xDD\\xFF\\xFF\\xFF\\xFF\\xFF\\xFF\\xFF\\xFF"
store 0 // config

// compute the address of the provided app
// bytes app_address = sha512_256(concat("appID", itob(config.application_id))) [slot 1]
pushbytes "appID"
load 0 // config
pushint 32
extract_uint64 // application_id
itob
concat
sha512_256
store 1 // app_address

// Only allow calling the register_escrow method on the correct app
// with the correct referrer_address
// assert(Txn.ApplicationID == config.application_id)
txn ApplicationID
load 0 // config
pushint 32
extract_uint64 // application_id
==
assert
// assert(Txn.OnCompletion == OptIn)
txn OnCompletion
pushint 1 // OptIn
==
assert
// assert(Txn.RekeyTo == app_address)
txn RekeyTo
load 1 // app_address
==
assert
// assert(Txn.ApplicationArgs[0] == config.referrer_address)
txna ApplicationArgs 0
load 0 // config
extract 0 32 // referrer_address
==
assert
// exit(1)
pushint 1
return
`

type Options = {
  network: Network
  mnemonic?: string
  algodToken?: string
  dryRun: boolean
  treasuryAppId: bigint
  referrerAddress: string
  escrowMinBalance: bigint
}

function createAlgodClient(network: Network, algodToken?: string): algosdk.Algodv2 {
  if (algodToken) {
    const servers: Record<string, string> = {
      testnet: 'https://testnet-api.4160.nodely.dev',
      mainnet: 'https://mainnet-api.4160.nodely.dev',
    }
    const server = servers[network]
    if (server) return new algosdk.Algodv2(algodToken, server, 443)
  }

  if (network === 'mainnet') return new algosdk.Algodv2('', 'https://mainnet-api.algonode.cloud', 443)
  if (network === 'testnet') return new algosdk.Algodv2('', 'https://testnet-api.algonode.cloud', 443)
  return new algosdk.Algodv2('a'.repeat(64), 'http://localhost', 4001)
}

function parseArgs(): Options {
  const args = process.argv.slice(2)
  let network = DEFAULT_NETWORK
  let mnemonic = process.env.DEPLOYER_MNEMONIC || process.env.MNEMONIC
  let algodToken: string | undefined
  let dryRun = false
  let treasuryAppId = DEFAULT_TREASURY_APP_ID
  let referrerAddress = DEFAULT_REFERRER_ADDRESS
  let escrowMinBalance = DEFAULT_ESCROW_MIN_BALANCE

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i]

    if (arg === '--network' || arg === '-n') {
      const value = args[i + 1]
      if (!value || !['mainnet', 'testnet', 'localnet'].includes(value)) {
        throw new Error(`Invalid network: ${value}. Must be localnet, testnet, or mainnet.`)
      }
      network = value as Network
      i += 1
    } else if (arg === '--mnemonic' || arg === '-m') {
      mnemonic = args[i + 1]
      i += 1
    } else if (arg === '--token' || arg === '-t') {
      algodToken = args[i + 1]
      i += 1
    } else if (arg === '--treasury-app-id') {
      treasuryAppId = BigInt(args[i + 1])
      i += 1
    } else if (arg === '--referrer') {
      referrerAddress = args[i + 1]
      i += 1
    } else if (arg === '--escrow-min-balance') {
      escrowMinBalance = BigInt(args[i + 1])
      i += 1
    } else if (arg === '--dry-run') {
      dryRun = true
    } else if (arg === '--help' || arg === '-h') {
      console.log(`
Usage: ts-node scripts/register-haystack-referrer.ts [options]

Options:
  --network, -n <network>         Network. Defaults to mainnet.
  --mnemonic, -m <mnemonic>       Funding account mnemonic. Required unless --dry-run.
  --token, -t <token>             Algod API token, if using a paid Nodely endpoint.
  --treasury-app-id <id>          Deflex treasury app ID. Defaults to ${DEFAULT_TREASURY_APP_ID}.
  --referrer <address>            Referrer address. Defaults to Akita YOIP address.
  --escrow-min-balance <micro>    Funding target for escrow. Defaults to ${DEFAULT_ESCROW_MIN_BALANCE}.
  --dry-run                       Print the registration plan without sending.
  --help, -h                      Show this help message.
`)
      process.exit(0)
    }
  }

  if (!algosdk.isValidAddress(referrerAddress)) {
    throw new Error(`Invalid referrer address: ${referrerAddress}`)
  }

  if (!mnemonic && !dryRun) {
    throw new Error('A funding account mnemonic is required unless --dry-run is set.')
  }

  return { network, mnemonic, algodToken, dryRun, treasuryAppId, referrerAddress, escrowMinBalance }
}

function replaceBytes(target: Uint8Array, replacement: Uint8Array, offset: number): Uint8Array {
  const next = new Uint8Array(target)
  next.set(replacement, offset)
  return next
}

async function compileEscrowTemplate(algod: algosdk.Algodv2): Promise<Uint8Array> {
  const compiled = await algod.compile(ESCROW_TEMPLATE_TEAL).do()
  return Buffer.from(compiled.result, 'base64')
}

async function createEscrowLogicSig(
  algod: algosdk.Algodv2,
  referrerAddress: string,
  treasuryAppId: bigint,
): Promise<LogicSigAccount> {
  const template = await compileEscrowTemplate(algod)
  const referrer = algosdk.decodeAddress(referrerAddress).publicKey
  const appId = new Uint8Array(8)
  new DataView(appId.buffer).setBigUint64(0, treasuryAppId)
  const program = replaceBytes(template, Buffer.concat([Buffer.from(referrer), Buffer.from(appId)]), TEMPLATE_CONFIG_OFFSET)

  return new LogicSigAccount(program)
}

async function getExpectedEscrowAddress(referrerAddress: string): Promise<string | undefined> {
  if (typeof fetch !== 'function') return undefined

  const response = await fetch(`https://hayrouter.txnlab.dev/api/treasuryAddress?address=${referrerAddress}`)
  if (!response.ok) return undefined

  const body = await response.json() as { address?: string }
  return body.address
}

async function getAccountAmount(algod: algosdk.Algodv2, address: string): Promise<bigint> {
  try {
    const info = await algod.accountInformation(address).do()
    return BigInt(info.amount)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    if (message.includes('account does not exist')) return 0n
    if (message.includes('404')) return 0n
    throw error
  }
}

async function isEscrowRegistered(algod: algosdk.Algodv2, escrowAddress: string, treasuryAppId: bigint): Promise<boolean> {
  try {
    await algod.accountApplicationInformation(escrowAddress, treasuryAppId).do()
    return true
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    if (message.includes('account application info not found')) return false
    if (message.includes('account does not exist')) return false
    if (message.includes('404')) return false
    throw error
  }
}

async function main(): Promise<void> {
  const options = parseArgs()
  const algod = createAlgodClient(options.network, options.algodToken)
  const treasuryAddress = algosdk.getApplicationAddress(options.treasuryAppId).toString()
  const escrow = await createEscrowLogicSig(algod, options.referrerAddress, options.treasuryAppId)
  const escrowAddress = escrow.address().toString()
  const expectedEscrow = await getExpectedEscrowAddress(options.referrerAddress)

  console.log('\nHaystack referrer registration')
  console.log('='.repeat(80))
  console.log(`Network:          ${options.network}`)
  console.log(`Treasury app:     ${options.treasuryAppId}`)
  console.log(`Treasury address: ${treasuryAddress}`)
  console.log(`Referrer:         ${options.referrerAddress}`)
  console.log(`Escrow:           ${escrowAddress}`)
  if (expectedEscrow) console.log(`Haystack API:     ${expectedEscrow}`)
  console.log()

  if (expectedEscrow && expectedEscrow !== escrowAddress) {
    throw new Error(`Derived escrow ${escrowAddress} does not match Haystack API ${expectedEscrow}`)
  }

  const registered = await isEscrowRegistered(algod, escrowAddress, options.treasuryAppId)
  if (registered) {
    console.log('Escrow is already opted into the treasury app. Nothing to do.')
    return
  }

  const currentEscrowBalance = await getAccountAmount(algod, escrowAddress)
  const fundingAmount = currentEscrowBalance >= options.escrowMinBalance
    ? 0n
    : options.escrowMinBalance - currentEscrowBalance

  console.log(`Escrow balance:   ${currentEscrowBalance} microAlgos`)
  console.log(`Funding amount:   ${fundingAmount} microAlgos`)

  if (options.dryRun) {
    console.log('\nDRY RUN - would send:')
    console.log(`  1. Payment to escrow for ${fundingAmount} microAlgos`)
    console.log(`  2. OptIn app call from escrow to ${options.treasuryAppId}, rekeyTo ${treasuryAddress}`)
    return
  }

  const account = algosdk.mnemonicToSecretKey(options.mnemonic!)
  const sender = account.addr.toString()
  const senderBalance = await getAccountAmount(algod, sender)
  if (senderBalance < fundingAmount + 2_000n) {
    throw new Error(`Funding account ${sender} has insufficient balance.`)
  }

  const suggestedParams = await algod.getTransactionParams().do()
  const paymentParams = { ...suggestedParams, flatFee: true, fee: 2_000n }
  const optInParams = { ...suggestedParams, flatFee: true, fee: 1_000n }

  const paymentTxn = makePaymentTxnWithSuggestedParamsFromObject({
    sender,
    receiver: escrowAddress,
    amount: fundingAmount,
    suggestedParams: paymentParams,
  })
  const optInTxn = makeApplicationOptInTxnFromObject({
    sender: escrowAddress,
    appIndex: options.treasuryAppId,
    appArgs: [algosdk.decodeAddress(options.referrerAddress).publicKey],
    rekeyTo: treasuryAddress,
    suggestedParams: optInParams,
  })

  // The funding transaction pays for the group. The escrow LogicSig is rekeyed
  // during this call and should not need to spend additional ALGO for fees.
  ;(optInTxn as unknown as { fee: bigint }).fee = 0n

  algosdk.assignGroupID([paymentTxn, optInTxn])

  const signedPayment = paymentTxn.signTxn(account.sk)
  const signedOptIn = signLogicSigTransactionObject(optInTxn, escrow).blob
  const { txid } = await algod.sendRawTransaction([signedPayment, signedOptIn]).do()

  console.log(`\nSubmitted registration group: ${txid}`)
  const confirmation = await waitForConfirmation(algod, txid, 4)
  console.log(`Confirmed in round ${confirmation.confirmedRound}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('\nScript failed:', error)
    if (error instanceof Error && error.stack) {
      console.error('Stack trace:', error.stack)
    }
    process.exit(1)
  })

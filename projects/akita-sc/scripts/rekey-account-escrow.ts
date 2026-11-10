#!/usr/bin/env node

/**
 * Rekey a regular Algorand account to an ARC-58 wallet so it can be
 * registered as a named regular-account escrow.
 *
 * The account address is derived from the supplied mnemonic. The wallet app
 * address is the new authorization address; the escrow name is checked for
 * availability on the wallet and included in the transaction note.
 *
 * Usage:
 *   npm run rekey:account-escrow -- --network mainnet --wallet-app-id 123 \
 *     --escrow operations -m "$ACCOUNT_MNEMONIC" --dry-run
 *   npm run rekey:account-escrow -- --network mainnet --wallet-app-id 123 \
 *     --escrow operations -m "$ACCOUNT_MNEMONIC" --confirm-rekey
 */

import { AlgorandClient, microAlgo } from '@algorandfoundation/algokit-utils'
import { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import { AbstractedAccountClient } from '../smart_contracts/artifacts/arc58/account/AbstractedAccountClient'

const MAX_ESCROW_NAME_BYTES = 61
const REKEY_FEE = 1_000n
type Network = 'localnet' | 'testnet' | 'mainnet'

interface Options {
  network: Network
  walletAppId: bigint
  escrow: string
  mnemonic: string
  algodToken?: string
  dryRun: boolean
  confirmed: boolean
}

function usage(): string {
  return `
Usage: npm run rekey:account-escrow -- [options]

Required options:
  --wallet-app-id <id>              ARC-58 wallet application ID
  --escrow <name>                   Name used when registering this account as an escrow
  --account-mnemonic, --mnemonic,
  -m <mnemonic>                     Mnemonic for the account to rekey

Other options:
  --network, -n <network>           localnet, testnet, or mainnet (default: localnet)
  --token, -t <token>               Algod API token (for example, a Nodely API key)
  --dry-run                         Validate and print the rekey without submitting it
  --confirm-rekey                   Required to submit the rekey transaction
  --help, -h                        Show this help

The mnemonic can also be supplied through ACCOUNT_MNEMONIC or MNEMONIC.`
}

function readValue(args: string[], index: number, option: string): string {
  const value = args[index + 1]
  if (!value || value.startsWith('-')) throw new Error(`${option} requires a value`)
  return value
}

function parseArgs(): Options {
  const args = process.argv.slice(2)
  let network: Network = 'localnet'
  let walletAppId: bigint | undefined
  let escrow: string | undefined
  let mnemonic = process.env.ACCOUNT_MNEMONIC ?? process.env.MNEMONIC
  let algodToken: string | undefined
  let dryRun = false
  let confirmed = false

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (arg === '--network' || arg === '-n') {
      const value = readValue(args, i, arg)
      if (value !== 'localnet' && value !== 'testnet' && value !== 'mainnet') {
        throw new Error(`${arg} must be one of: localnet, testnet, mainnet`)
      }
      network = value
      i++
    } else if (arg === '--wallet-app-id') {
      const value = readValue(args, i, arg)
      try {
        walletAppId = BigInt(value)
      } catch {
        throw new Error('--wallet-app-id must be a positive integer')
      }
      if (walletAppId <= 0n) throw new Error('--wallet-app-id must be a positive integer')
      i++
    } else if (arg === '--escrow') {
      escrow = readValue(args, i, arg)
      i++
    } else if (arg === '--account-mnemonic' || arg === '--mnemonic' || arg === '-m') {
      mnemonic = readValue(args, i, arg)
      i++
    } else if (arg === '--token' || arg === '-t') {
      algodToken = readValue(args, i, arg)
      i++
    } else if (arg === '--dry-run') {
      dryRun = true
    } else if (arg === '--confirm-rekey') {
      confirmed = true
    } else if (arg === '--help' || arg === '-h') {
      console.log(usage())
      process.exit(0)
    } else {
      throw new Error(`Unknown option: ${arg}\n${usage()}`)
    }
  }

  if (walletAppId === undefined) throw new Error('--wallet-app-id is required')
  if (!escrow) throw new Error('--escrow is required')
  const escrowBytes = new TextEncoder().encode(escrow).length
  if (escrowBytes > MAX_ESCROW_NAME_BYTES) {
    throw new Error(`--escrow must be at most ${MAX_ESCROW_NAME_BYTES} UTF-8 bytes (got ${escrowBytes})`)
  }
  if (!mnemonic) {
    throw new Error('--account-mnemonic is required (or set ACCOUNT_MNEMONIC)')
  }

  return { network, walletAppId, escrow, mnemonic, algodToken, dryRun, confirmed }
}

function createAlgorandClient(network: Network, algodToken?: string): AlgorandClient {
  if (algodToken && network !== 'localnet') {
    const prefix = network === 'mainnet' ? 'mainnet' : 'testnet'
    return AlgorandClient.fromConfig({
      algodConfig: {
        server: `https://${prefix}-api.4160.nodely.dev`,
        port: 443,
        token: algodToken,
      },
      indexerConfig: {
        server: `https://${prefix}-idx.4160.nodely.dev`,
        port: 443,
        token: algodToken,
      },
    })
  }

  switch (network) {
    case 'testnet':
      return AlgorandClient.testNet()
    case 'mainnet':
      return AlgorandClient.mainNet()
    default:
      return AlgorandClient.fromEnvironment()
  }
}

async function main(): Promise<void> {
  const options = parseArgs()
  const algorand = createAlgorandClient(options.network, options.algodToken)

  let account: ReturnType<typeof algorand.account.fromMnemonic>
  try {
    account = algorand.account.fromMnemonic(options.mnemonic)
  } catch {
    throw new Error('The account mnemonic is invalid')
  }

  const accountAddress = account.addr.toString()
  const walletApp = await algorand.app.getById(options.walletAppId)
  const walletAddress = walletApp.appAddress.toString()
  const walletClient = algorand.client.getTypedAppClientById(AbstractedAccountClient, {
    appId: options.walletAppId,
    defaultSender: accountAddress,
    defaultSigner: account.signer,
  })

  let escrowInfo: [bigint, string, boolean]
  try {
    const escrows = await walletClient.arc58GetEscrows({ args: { escrows: [options.escrow] } })
    escrowInfo = escrows[0]
  } catch (error) {
    throw new Error(`App ${options.walletAppId} did not respond as an ARC-58 wallet: ${error}`)
  }

  if (escrowInfo[1] !== ALGORAND_ZERO_ADDRESS_STRING && escrowInfo[1] !== accountAddress) {
    throw new Error(`Escrow "${options.escrow}" is already registered to ${escrowInfo[1]}, not ${accountAddress}`)
  }

  const accountInfo = await algorand.account.getInformation(accountAddress)
  const authAddress = accountInfo.authAddr?.toString() ?? accountAddress
  const spendable = accountInfo.balance.microAlgos - accountInfo.minBalance.microAlgos

  console.log('Regular-account escrow rekey')
  console.log(`  Network: ${options.network}`)
  console.log(`  Wallet app: ${options.walletAppId}`)
  console.log(`  Wallet address: ${walletAddress}`)
  console.log(`  Escrow: ${options.escrow}`)
  console.log(`  Account: ${accountAddress}`)
  console.log(`  Current auth address: ${authAddress}`)
  console.log(
    `  Escrow registration: ${
      escrowInfo[1] === accountAddress ? 'already registered to this account' : 'name is available'
    }`,
  )

  if (authAddress === walletAddress) {
    console.log('\nNothing to do: the account is already rekeyed to the wallet.')
    return
  }
  if (authAddress !== accountAddress) {
    throw new Error(`The account currently authorizes ${authAddress}; its own mnemonic cannot authorize this rekey`)
  }
  if (spendable < REKEY_FEE) {
    throw new Error(
      `The account has only ${spendable} spendable microAlgos; ${REKEY_FEE} is required for the rekey fee`,
    )
  }

  console.log(`  Fee: ${REKEY_FEE} microAlgos`)
  console.log(`  New auth address: ${walletAddress}`)

  if (options.dryRun) {
    console.log('\nDRY RUN - validation passed; no rekey transaction was submitted.')
    return
  }
  if (!options.confirmed) {
    throw new Error('Pass --confirm-rekey to submit after reviewing the --dry-run output')
  }

  const result = await algorand
    .newGroup()
    .addPayment({
      sender: accountAddress,
      signer: account.signer,
      receiver: accountAddress,
      amount: microAlgo(0n),
      staticFee: microAlgo(REKEY_FEE),
      rekeyTo: walletAddress,
      note: `Akita wallet escrow rekey: ${options.escrow}`,
    })
    .send()

  const updatedAccount = await algorand.account.getInformation(accountAddress)
  const updatedAuthAddress = updatedAccount.authAddr?.toString() ?? accountAddress
  if (updatedAuthAddress !== walletAddress) {
    throw new Error(`Rekey confirmed, but the auth address is ${updatedAuthAddress}; expected ${walletAddress}`)
  }

  console.log('\n' + '='.repeat(72))
  console.log('ACCOUNT ESCROW REKEY COMPLETE')
  console.log('='.repeat(72))
  console.log(`  Confirmed round: ${result.confirmations[0]?.confirmedRound ?? 'unknown'}`)
  console.log(`  Transaction ID: ${result.txIds[0]}`)
  console.log(`  Account: ${accountAddress}`)
  console.log(`  Auth address: ${walletAddress}`)
  console.log(`  Escrow name: ${options.escrow}`)
}

main().catch((error) => {
  console.error('\nScript failed:', error)
  process.exit(1)
})

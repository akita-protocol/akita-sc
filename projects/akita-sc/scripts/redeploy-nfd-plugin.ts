#!/usr/bin/env node

import { AlgorandClient } from '@algorandfoundation/algokit-utils'
import { NfdPluginFactory } from '../smart_contracts/artifacts/arc58/plugins/nfd/NFDPluginClient'
import { recordPluginDeployment } from './script-base'

type Network = 'testnet' | 'mainnet'

interface Options {
  network: Network
  mnemonic?: string
  registry: bigint
}

const NETWORK_REGISTRY_DEFAULTS: Record<Network, bigint> = {
  testnet: 84366825n,
  mainnet: 760937186n,
}

function parseArgs(): Options {
  const args = process.argv.slice(2)
  let network: Network = 'mainnet'
  let mnemonic = process.env.DEPLOYER_MNEMONIC || process.env.MNEMONIC
  let registry: bigint | undefined

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (arg === '--network' || arg === '-n') {
      const value = args[++i]
      if (value !== 'testnet' && value !== 'mainnet') {
        throw new Error(`Invalid network: ${value}. Expected testnet or mainnet.`)
      }
      network = value
    } else if (arg === '--mnemonic' || arg === '-m') {
      mnemonic = args[++i]
    } else if (arg === '--registry') {
      registry = BigInt(args[++i])
    } else if (arg === '--help' || arg === '-h') {
      console.log(`
Usage: npm run deploy:nfd-plugin -- [options]

Options:
  --network, -n <network>   Network to deploy to. Default: mainnet
  --mnemonic, -m <phrase>   Deployer mnemonic. Can use DEPLOYER_MNEMONIC.
  --registry <appId>        NFD registry app id. Defaults by network.
  --help, -h                Show this help message
`)
      process.exit(0)
    } else {
      throw new Error(`Unknown argument: ${arg}`)
    }
  }

  if (!mnemonic) {
    throw new Error('Missing deployer mnemonic. Pass --mnemonic or set DEPLOYER_MNEMONIC.')
  }

  return {
    network,
    mnemonic,
    registry: registry ?? NETWORK_REGISTRY_DEFAULTS[network],
  }
}

function createAlgorandClient(network: Network): AlgorandClient {
  return network === 'mainnet' ? AlgorandClient.mainNet() : AlgorandClient.testNet()
}

async function main() {
  const options = parseArgs()
  const algorand = createAlgorandClient(options.network)
  const deployer = algorand.account.fromMnemonic(options.mnemonic!)

  console.log(`Deploying NFDPlugin to ${options.network}`)
  console.log(`Deployer: ${deployer.addr.toString()}`)
  console.log(`NFD registry: ${options.registry.toString()}`)

  const accountInfo = await algorand.client.algod.accountInformation(deployer.addr.toString())
  console.log(`Balance: ${BigInt(accountInfo.amount) / 1_000_000n} ALGO`)

  const factory = algorand.client.getTypedAppFactory(NfdPluginFactory, {
    defaultSender: deployer.addr.toString(),
    defaultSigner: deployer.signer,
  })

  const { appClient } = await factory.send.create.create({
    args: {
      registry: options.registry,
    },
  })

  const deployedRegistry = await appClient.state.global.registry()
  const result = {
    network: options.network,
    appId: appClient.appId.toString(),
    address: appClient.appAddress.toString(),
    registry: deployedRegistry?.toString() ?? '',
  }

  console.log(JSON.stringify(result, null, 2))

  if (deployedRegistry !== options.registry) {
    throw new Error(`Registry mismatch: expected ${options.registry}, got ${deployedRegistry}`)
  }

  await recordPluginDeployment(options.network, 'nfdPlugin', appClient.appId)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

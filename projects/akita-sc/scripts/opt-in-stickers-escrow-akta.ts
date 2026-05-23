#!/usr/bin/env node

/**
 * Opt the DAO wallet's stickers escrow into AKTA.
 *
 * The DAO is the wallet admin, so this does not call arc58_optInEscrow directly.
 * It uses the ARC58 plugin opt-in path, after a DAO proposal unlocks the escrow
 * if needed and installs a self-opt-in plugin grant for the deployer account.
 *
 * Usage:
 *   npm run opt-in:stickers-akta -- -n mainnet -m "your mnemonic"
 *   npm run opt-in:stickers-akta -- -n mainnet --dry-run
 */

import { microAlgo } from '@algorandfoundation/algokit-utils'
import { getNetworkAppIds, SDKClient, type AkitaNetwork } from 'akita-sdk'
import { AkitaDaoSDK, ProposalAction, ProposalActionEnum } from 'akita-sdk/dao'
import { CallerType, SelfOptInPluginSDK } from 'akita-sdk/wallet'
import algosdk from 'algosdk'
import { parseBaseArgs, runScript, setupContext } from './script-base'
import { getAppFundingNeeded, proposeAndExecute } from './utils'

const DEFAULT_ESCROW = 'stickers'
const SOURCE_LINK = 'https://github.com/kylebee/akita-sc'
const ASSET_OPT_IN_MBR = 100_000n
const CONTROLLED_ADDRESS_KEY = 'controlled_address'

type ExtraOptions = {
  escrow: string
  aktaAssetId?: bigint
}

function parseExtraArgs(): ExtraOptions {
  const args = process.argv.slice(2)
  let escrow = DEFAULT_ESCROW
  let aktaAssetId: bigint | undefined

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--escrow') {
      escrow = args[++i]
    } else if (args[i] === '--akta-asset-id' || args[i] === '--akta') {
      aktaAssetId = BigInt(args[++i])
    }
  }

  return { escrow, aktaAssetId }
}

function aktaForNetwork(network: AkitaNetwork, override?: bigint): bigint {
  if (override !== undefined) return override

  const assetId = getNetworkAppIds(network).akta
  if (assetId === 0n) {
    throw new Error(`No AKTA asset ID configured for ${network}; pass --akta-asset-id`)
  }
  return assetId
}

function canCallResultAllowed(result: unknown): boolean {
  if (result === true) return true
  if (result && typeof result === 'object' && 'return' in result) {
    return (result as { return?: unknown }).return === true
  }
  return false
}

async function resolve<T>(value: T | Promise<T> | { do: () => Promise<T> }): Promise<T> {
  if (value && typeof (value as any).do === 'function') {
    return await (value as any).do()
  }
  return await (value as Promise<T>)
}

function uint64FromBytes(value: Uint8Array): bigint {
  return new DataView(value.buffer, value.byteOffset, value.byteLength).getBigUint64(0)
}

async function readEscrow(
  algod: any,
  walletAppId: bigint,
  escrow: string,
): Promise<{ id: bigint; address: string; locked: boolean }> {
  const boxName = new Uint8Array(Buffer.from(`e${escrow}`))
  const boxCall = typeof algod.getApplicationBoxByName === 'function'
    ? algod.getApplicationBoxByName(Number(walletAppId), boxName)
    : algod.applicationBoxByName(Number(walletAppId), boxName)
  const box: any = await resolve(boxCall)
  const value = box.value instanceof Uint8Array ? box.value : new Uint8Array(box.value)
  const id = uint64FromBytes(value)
  return {
    id,
    address: algosdk.getApplicationAddress(id).toString(),
    locked: value[8] !== 0,
  }
}

async function readControlledAddress(algod: any, walletAppId: bigint): Promise<string> {
  const appCall = typeof algod.getApplicationByID === 'function'
    ? algod.getApplicationByID(Number(walletAppId))
    : algod.applicationById(Number(walletAppId))
  const app: any = await resolve(appCall)
  const state = app.params?.globalState ?? app.params?.['global-state'] ?? []
  const entry = state.find((item: any) => {
    const key = Buffer.from(item.key, 'base64').toString()
    return key === CONTROLLED_ADDRESS_KEY
  })
  if (!entry?.value?.bytes) {
    throw new Error(`Could not read ${CONTROLLED_ADDRESS_KEY} from wallet app ${walletAppId}`)
  }
  return algosdk.encodeAddress(new Uint8Array(Buffer.from(entry.value.bytes, 'base64')))
}

async function isAssetOptedIn(
  algod: any,
  address: string,
  assetId: bigint,
): Promise<boolean> {
  try {
    const info: any = await resolve((algod as any).accountInformation(address))
    const assets: any[] = info.assets ?? info.account?.assets ?? []
    return assets.some((asset) => BigInt(asset.assetId ?? asset['asset-id']) === assetId)
  } catch (error) {
    throw new Error(`Failed to read account holdings for ${address}: ${error}`)
  }
}

runScript(async () => {
  const extra = parseExtraArgs()
  const options = parseBaseArgs('opt-in-stickers-escrow-akta.ts', `
  --escrow <name>               DAO wallet escrow to opt in. Default: stickers
  --akta-asset-id, --akta <id>  AKTA asset ID override`)

  if (process.argv.includes('--network') === false && process.argv.includes('-n') === false) {
    options.network = 'mainnet'
  }

  const aktaAssetId = aktaForNetwork(options.network, extra.aktaAssetId)

  console.log(`\nOpting DAO ${extra.escrow} escrow into AKTA on ${options.network}...\n`)
  const ctx = await setupContext(options, { minBalance: 1_000_000n })
  if (options.mnemonic) {
    const account = ctx.algorand.account.fromMnemonic(options.mnemonic)
    ctx.sender = account.addr.toString()
    ctx.signer = account.signer as any
    ctx.dao = new AkitaDaoSDK({
      algorand: ctx.algorand,
      factoryParams: {
        appId: ctx.appIds.dao,
        defaultSender: ctx.sender,
        defaultSigner: ctx.signer as any,
      },
    })
  }

  const selfOptInPlugin = new SelfOptInPluginSDK({
    algorand: ctx.algorand,
    factoryParams: {
      appId: ctx.appIds.selfOptinPlugin,
      defaultSender: ctx.sender,
      defaultSigner: ctx.signer as any,
    },
  })

  await ctx.dao.getWallet()
  const escrowInfo = await readEscrow(ctx.algorand.client.algod, ctx.appIds.wallet, extra.escrow)
  const controlledAddress = await readControlledAddress(ctx.algorand.client.algod, ctx.appIds.wallet)

  console.log(`DAO: ${ctx.dao.appId}`)
  console.log(`Wallet: ${ctx.dao.wallet.appId}`)
  console.log(`Self opt-in plugin: ${selfOptInPlugin.appId}`)
  console.log(`Plugin caller: ${ctx.sender}`)
  console.log(`Escrow: ${extra.escrow} (${escrowInfo.id})`)
  console.log(`Escrow address: ${escrowInfo.address}`)
  console.log(`Escrow locked: ${escrowInfo.locked}`)
  console.log(`AKTA asset: ${aktaAssetId}\n`)

  if (await isAssetOptedIn(ctx.algorand.client.algod as any, escrowInfo.address, aktaAssetId)) {
    console.log('Escrow is already opted into AKTA. Nothing to do.\n')
    return
  }

  let pluginInstalled = true
  if (options.dryRun && !options.mnemonic && options.network !== 'localnet') {
    console.log('DRY RUN - skipping plugin grant lookup because no signing account was provided.\n')
  } else {
    const canCall = await ctx.dao.wallet.canCall({
      sender: ctx.sender,
      signer: ctx.signer as any,
      plugin: selfOptInPlugin.appId,
      type: CallerType.Other,
      address: ctx.sender,
      escrow: extra.escrow,
      methods: selfOptInPlugin.optIn(),
    })
    pluginInstalled = canCall.every(canCallResultAllowed)
    if (!pluginInstalled) {
      console.log(`Self opt-in plugin grant is missing for caller ${ctx.sender} and escrow "${extra.escrow}".`)
    } else {
      console.log(`Self opt-in plugin grant is already installed for caller ${ctx.sender} and escrow "${extra.escrow}".`)
    }

    if (pluginInstalled) {
      await ctx.dao.wallet.getPluginByKey({
        plugin: selfOptInPlugin.appId,
        caller: ctx.sender,
        escrow: extra.escrow,
      })
    }
  }

  if (escrowInfo.locked || !pluginInstalled) {
    const actions: ProposalAction<SDKClient>[] = []
    let walletFunding = 0n

    if (escrowInfo.locked) {
      console.log(`Escrow "${extra.escrow}" is locked; proposal will unlock it first.`)
      actions.push({ type: ProposalActionEnum.ToggleEscrowLock, escrow: extra.escrow } as ProposalAction<SDKClient>)
    }

    if (!pluginInstalled) {
      console.log(`Installing self opt-in plugin grant for caller ${ctx.sender} and escrow "${extra.escrow}"...`)
      const mbr = await ctx.dao.wallet.getMbr({
        escrow: extra.escrow,
        methodCount: 1n,
        plugin: '',
        groups: 0n,
      })
      walletFunding = await getAppFundingNeeded(
        ctx.algorand,
        ctx.dao.wallet.client.appAddress.toString(),
        mbr.plugins + 1_000_000n,
      )

      actions.push({
        type: ProposalActionEnum.AddPlugin,
        client: selfOptInPlugin,
        callerType: CallerType.Other,
        caller: ctx.sender,
        escrow: extra.escrow,
        sourceLink: SOURCE_LINK,
        useExecutionKey: false,
        methods: [{ name: selfOptInPlugin.optIn(), cooldown: 0n }],
      })
    }

    if (options.dryRun) {
      if (escrowInfo.locked) {
        console.log(`DRY RUN - would unlock escrow "${extra.escrow}" as the first DAO proposal action.`)
      }
      if (!pluginInstalled) {
        console.log('DRY RUN - would install self opt-in plugin grant via DAO proposal.')
      }
      console.log('')
    } else {
      if (walletFunding > 0n) {
        await ctx.algorand.send.payment({
          sender: ctx.sender,
          signer: ctx.signer as any,
          receiver: ctx.dao.wallet.client.appAddress,
          amount: microAlgo(walletFunding),
        })
      }

      const proposalId = await proposeAndExecute(ctx.algorand, ctx.dao, actions)
      console.log(`Prepared escrow via proposal ${proposalId}\n`)
    }
  }

  if (options.dryRun) {
    console.log('DRY RUN - would submit arc58_pluginOptInEscrow with:')
    console.log(`  plugin: ${selfOptInPlugin.appId}`)
    console.log(`  caller: ${ctx.sender}`)
    console.log(`  escrow: ${extra.escrow}`)
    console.log(`  assets: [${aktaAssetId}]`)
    console.log(`  mbrPayment: ${ASSET_OPT_IN_MBR} microAlgos to ${controlledAddress}\n`)
    return
  }

  const mbrPayment = await ctx.algorand.createTransaction.payment({
    sender: ctx.sender,
    receiver: controlledAddress,
    amount: microAlgo(ASSET_OPT_IN_MBR),
  })

  const result = await ctx.dao.wallet.client.send.arc58PluginOptInEscrow({
    sender: ctx.sender,
    signer: ctx.signer as any,
    args: {
      plugin: selfOptInPlugin.appId,
      caller: ctx.sender,
      escrow: extra.escrow,
      assets: [aktaAssetId],
      mbrPayment,
    },
    populateAppCallResources: true,
    coverAppCallInnerTransactionFees: true,
    maxFee: microAlgo(100_000n),
  })

  console.log(`Submitted opt-in transaction: ${result.txIds.join(', ')}`)

  if (await isAssetOptedIn(ctx.algorand.client.algod as any, escrowInfo.address, aktaAssetId)) {
    console.log('Escrow is now opted into AKTA.\n')
  } else {
    throw new Error('Opt-in transaction completed, but AKTA holding was not found on the escrow.')
  }
})

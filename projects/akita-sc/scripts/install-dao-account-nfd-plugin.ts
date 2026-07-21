#!/usr/bin/env node

/**
 * Mirror the DAO wallet main account's NFD plugin grant onto the existing
 * akta_creator and collections regular-account escrows via one DAO proposal,
 * then execute that proposal.
 *
 * Usage:
 *   npm run install:dao-account-nfd-plugin -- --dry-run
 *   npm run install:dao-account-nfd-plugin -- -m "$MNEMONIC" --confirm-install
 */

import { microAlgo } from '@algorandfoundation/algokit-utils'
import { SDKClient } from 'akita-sdk'
import { AkitaDaoSDK, ProposalAction, ProposalActionEnum } from 'akita-sdk/dao'
import { CallerType, NFDPluginSDK } from 'akita-sdk/wallet'
import { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import { parseBaseArgs, runScript, setupContext } from './script-base'
import { getAppFundingNeeded, proposeAndExecute } from './utils'

const TARGET_ESCROWS = [
  {
    name: 'akta_creator',
    address: 'QUUQHH4HJ3FHUWMKTKFBUA72XTSW6F7YLLTRI7FWENJBKQYWTESSCZPQLU',
  },
  {
    name: 'collections',
    address: 'AKCTRDK4OWNWHTPH4XPKLNWNLZ333VE35SKQ4FGQK3ZJA4FIHCLTRG3PFI',
  },
] as const

const DAO_STATE_FULLY_INITIALIZED = 2
const SOURCE_LINK = 'https://github.com/kylebee/akita-sc'

type RawPluginEntries = Awaited<ReturnType<AkitaDaoSDK['wallet']['client']['state']['box']['plugins']['getMap']>>
type RawPluginKey = RawPluginEntries extends Map<infer K, unknown> ? K : never
type RawPluginInfo = RawPluginEntries extends Map<unknown, infer V> ? V : never

function selectorsEqual(left: Uint8Array, right: Uint8Array): boolean {
  return Buffer.from(left).equals(Buffer.from(right))
}

function grantsMatch(actual: RawPluginInfo, source: RawPluginInfo): boolean {
  return (
    actual.escrow === source.escrow &&
    actual.delegationType === source.delegationType &&
    actual.lastValid === source.lastValid &&
    actual.cooldown === source.cooldown &&
    actual.admin === source.admin &&
    actual.useRounds === source.useRounds &&
    actual.useExecutionKey === source.useExecutionKey &&
    actual.coverFees === source.coverFees &&
    actual.canReclaim === source.canReclaim &&
    actual.methods.length === source.methods.length &&
    actual.methods.every(
      (method, index) => selectorsEqual(method[0], source.methods[index][0]) && method[1] === source.methods[index][1],
    )
  )
}

function findGrant(entries: RawPluginEntries, expected: RawPluginKey): RawPluginInfo | undefined {
  for (const [key, info] of entries) {
    if (key.plugin === expected.plugin && key.caller === expected.caller && key.escrow === expected.escrow) return info
  }
  return undefined
}

runScript(async () => {
  const options = parseBaseArgs(
    'install-dao-account-nfd-plugin.ts',
    `
This mainnet-only script reads the live main-account NFD grant, mirrors it onto:
  akta_creator
  collections

It creates one DAO proposal containing the missing grants and executes it immediately.

Additional options:
  --confirm-install          Required to create and execute the live proposal`,
  )

  if (options.network !== 'mainnet') {
    throw new Error('This script is mainnet-only. Use the install:dao-account-nfd-plugin npm command.')
  }

  const confirmed = process.argv.slice(2).includes('--confirm-install')
  const ctx = await setupContext(options, { minBalance: 100_000n })
  const [daoApp, daoState] = await Promise.all([
    ctx.algorand.app.getById(ctx.dao.appId),
    ctx.dao.client.state.global.getAll(),
  ])
  const daoCreator = daoApp.creator.toString()
  const effectiveSender = options.dryRun ? daoCreator : ctx.sender

  if (daoState.state === DAO_STATE_FULLY_INITIALIZED) {
    throw new Error('The DAO is fully initialized; a newly created proposal cannot be executed without voting')
  }
  if (effectiveSender !== daoCreator) {
    throw new Error(`Only DAO creator ${daoCreator} can create an automatically approved pre-initialization proposal`)
  }

  ctx.dao.setSendParams({ sender: effectiveSender, signer: ctx.signer })
  const wallet = await ctx.dao.getWallet()
  const walletAddress = wallet.client.appAddress.toString()
  const nfdPlugin = new NFDPluginSDK({
    algorand: ctx.algorand,
    factoryParams: {
      appId: ctx.appIds.nfdPlugin,
      defaultSender: effectiveSender,
      defaultSigner: ctx.signer,
    },
  })

  const pluginEntries = await wallet.client.state.box.plugins.getMap()
  const mainNfdGrants = Array.from(pluginEntries).filter(([key]) => key.plugin === nfdPlugin.appId && key.escrow === '')
  if (mainNfdGrants.length !== 1) {
    throw new Error(`Expected exactly one main-account NFD grant, found ${mainNfdGrants.length}`)
  }

  const [sourceKey, sourceGrant] = mainNfdGrants[0]
  if (sourceGrant.admin || sourceGrant.canReclaim || sourceGrant.useExecutionKey) {
    throw new Error('The main NFD grant contains privileged settings that cannot be mirrored safely by this script')
  }

  console.log('DAO regular-account NFD plugin installation')
  console.log(`  DAO: ${ctx.dao.appId} (state ${daoState.state ?? 'unknown'})`)
  console.log(`  DAO wallet: ${wallet.appId} (${walletAddress})`)
  console.log(`  NFD plugin: ${nfdPlugin.appId}`)
  console.log(`  Mirrored caller: ${sourceKey.caller}`)
  console.log(`  Valid through: ${sourceGrant.lastValid}`)
  console.log(`  Method restrictions: ${sourceGrant.methods.length}\n`)

  const actions: ProposalAction<SDKClient>[] = []
  const pendingEscrows: string[] = []

  for (const target of TARGET_ESCROWS) {
    const [escrow, account] = await Promise.all([
      wallet.getEscrow(target.name),
      ctx.algorand.account.getInformation(target.address),
    ])
    if (escrow.id !== 0n || escrow.address !== target.address) {
      throw new Error(
        `Escrow "${target.name}" is id=${escrow.id}, address=${escrow.address}; expected regular account ${target.address}`,
      )
    }
    if (escrow.locked) throw new Error(`Escrow "${target.name}" is locked`)

    const authAddress = account.authAddr?.toString() ?? target.address
    if (authAddress !== walletAddress) {
      throw new Error(`${target.name} authorizes ${authAddress}; expected DAO wallet ${walletAddress}`)
    }

    const key = { plugin: nfdPlugin.appId, caller: sourceKey.caller, escrow: target.name }
    const existing = findGrant(pluginEntries, key)
    if (existing) {
      if (!grantsMatch(existing, sourceGrant)) {
        throw new Error(`NFD grant for escrow "${target.name}" exists but does not match the main-account grant`)
      }
      console.log(`${target.name}: matching NFD grant already installed; skipping`)
      continue
    }

    actions.push({
      type: ProposalActionEnum.AddPlugin,
      client: nfdPlugin,
      callerType: sourceKey.caller === ALGORAND_ZERO_ADDRESS_STRING ? CallerType.Global : CallerType.Other,
      ...(sourceKey.caller === ALGORAND_ZERO_ADDRESS_STRING ? {} : { caller: sourceKey.caller }),
      escrow: target.name,
      delegationType: BigInt(sourceGrant.delegationType),
      lastValid: sourceGrant.lastValid,
      cooldown: sourceGrant.cooldown,
      methods: sourceGrant.methods.map((method) => ({
        name: [method[0]],
        cooldown: method[1],
      })),
      useRounds: sourceGrant.useRounds,
      useExecutionKey: false,
      coverFees: sourceGrant.coverFees,
      defaultToEscrow: false,
      sourceLink: SOURCE_LINK,
    } as ProposalAction<SDKClient>)
    pendingEscrows.push(target.name)
    console.log(`${target.name}: ready to install matching NFD grant`)
  }

  if (actions.length === 0) {
    console.log('\nNothing to do: both escrow NFD grants already match the main-account grant.')
    return
  }

  const requiredWalletMbr = (
    await Promise.all(
      pendingEscrows.map((escrow) =>
        wallet.getMbr({
          escrow,
          methodCount: sourceGrant.methods.length,
          plugin: '',
          groups: 0n,
        }),
      ),
    )
  ).reduce((total, mbr) => total + mbr.plugins, 0n)
  const walletFunding = await getAppFundingNeeded(ctx.algorand, walletAddress, requiredWalletMbr + 1_000_000n)
  const proposalCost = await ctx.dao.proposalCost({
    sender: effectiveSender,
    signer: ctx.signer,
    actions,
  })

  console.log(`\nProposal actions: ${actions.length}`)
  console.log(`Wallet funding needed: ${walletFunding} microAlgos`)
  console.log(`Proposal cost: total=${proposalCost.total}, fee=${proposalCost.fee}, mbr=${proposalCost.mbr}`)

  if (options.dryRun) {
    console.log('\nDRY RUN - all checks passed; would fund the wallet, create the approved proposal, and execute it.')
    return
  }
  if (!confirmed) {
    throw new Error('Pass --confirm-install after reviewing the --dry-run output')
  }

  if (walletFunding > 0n) {
    await ctx.algorand.send.payment({
      sender: ctx.sender,
      signer: ctx.signer,
      receiver: walletAddress,
      amount: microAlgo(walletFunding),
    })
    console.log(`Funded DAO wallet with ${walletFunding} microAlgos`)
  }

  const proposalId = await proposeAndExecute(ctx.algorand, ctx.dao, actions)
  console.log(`Created and executed proposal ${proposalId}`)

  const updatedEntries = await wallet.client.state.box.plugins.getMap()
  for (const target of TARGET_ESCROWS) {
    const installed = findGrant(updatedEntries, {
      plugin: nfdPlugin.appId,
      caller: sourceKey.caller,
      escrow: target.name,
    })
    if (!installed || !grantsMatch(installed, sourceGrant)) {
      throw new Error(`Proposal executed, but NFD grant verification failed for escrow "${target.name}"`)
    }
  }

  const proposal = await ctx.dao.getProposal(proposalId)
  if (proposal.status !== 50) {
    throw new Error(`Proposal ${proposalId} has status ${proposal.status}; expected Executed (50)`)
  }

  console.log('\n' + '='.repeat(72))
  console.log('DAO ACCOUNT NFD PLUGIN INSTALLATION COMPLETE')
  console.log('='.repeat(72))
  console.log(`  Proposal ID: ${proposalId}`)
  console.log(`  NFD plugin: ${nfdPlugin.appId}`)
  console.log(`  Caller: ${sourceKey.caller}`)
  for (const target of TARGET_ESCROWS) console.log(`  Escrow: ${target.name}`)
})

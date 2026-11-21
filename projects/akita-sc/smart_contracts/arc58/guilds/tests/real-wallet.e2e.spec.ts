import { microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import { assignGroupID as groupTransactions, Transaction } from 'algosdk';
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { TimeWarp } from '../../../../tests/utils/time'
import { deployEscrowFactory } from '../../../../tests/fixtures/escrow'
import { deployOptInPlugin } from '../../../../tests/fixtures/plugins/optin'
import { deployPayPlugin } from '../../../../tests/fixtures/plugins/pay'
import { expectContractError } from '../../../../tests/utils/errors'
import { errAdminOnly } from '../../account/errors'
import { sendPrepared } from 'akita-sdk'
import { deleteEscrowActions } from 'akita-sdk/guild'
import { CallerType, WalletSDK } from 'akita-sdk/wallet'
import {
  AbstractedAccountClient,
  AbstractedAccountFactory as AbstractedAccountProgramFactory,
} from '../../../artifacts/arc58/account/AbstractedAccountClient'
import { MockGuildAkitaDaoClient } from '../../../artifacts/arc58/guilds/tests/MockGuildAkitaDAOClient'
import {
  AbstractedAccountFactoryClient,
  AbstractedAccountFactoryFactory,
} from '../../../artifacts/arc58/account/AbstractedAccountFactoryClient'
import { GuildClient } from '../../../artifacts/arc58/guilds/core/GuildClient'
import { AbstractedAccountMbrFactory } from '../../../artifacts/arc58/account/AbstractedAccountMBRClient'
import {
  action,
  ACTION_UPDATE_WALLET,
  addAllowancesAction,
  addNamedPluginAction,
  addPluginAction,
  APPROVE,
  balanceOf,
  baseConfig,
  changeAdminAction,
  createProposal,
  deployGuildTestEnvironment,
  EMPTY_EVIDENCE,
  encodeAbi,
  endVoting,
  executeProposal,
  EXECUTION_MBR,
  executePluginAction,
  finalizeProposal,
  FIXED_SIGNERS,
  fixedSignerConfig,
  fixedSignerConfiguration,
  MAX_APP_CALL_FEE,
  minBalanceOf,
  mintGuild,
  newEscrowAction,
  proposalSettings,
  reclaimAction,
  removeAllowancesAction,
  removeExecutionAction,
  removeNamedPluginAction,
  removePluginAction,
  newWalletAction,
  submitProposal,
  toggleEscrowAction,
  vote,
  type AbiBytes,
  type GuildAction,
  type GuildTestEnvironment,
} from './test-helpers'

const fixture = algorandFixture()
let environment: GuildTestEnvironment
let walletFactory: AbstractedAccountFactoryClient
let timeWarp: TimeWarp
let previousWalletMbrAppId: string | undefined
const send = { maxFee: MAX_APP_CALL_FEE, populateAppCallResources: true, coverAppCallInnerTransactionFees: true }

const deployRealWalletFactory = async (escrowFactory: bigint): Promise<AbstractedAccountFactoryClient> => {
  const { algorand, creator } = environment
  const factory = new AbstractedAccountFactoryFactory({
    algorand,
    defaultSender: creator.addr,
    defaultSigner: creator.signer,
  })
  const { appClient } = await factory.send.create.create({
    args: {
      akitaDao: environment.akitaDao,
      akitaDaoEscrow: { name: 'guild_revenue', app: environment.revenueEscrow.appId },
      version: 'guild-wallet-test',
      escrowFactory,
      revocation: 0n,
      domain: 'guild.test',
    },
    extraProgramPages: 3,
  })

  const programFactory = new AbstractedAccountProgramFactory({
    algorand,
    defaultSender: creator.addr,
    defaultSigner: creator.signer,
  })
  const program = (await programFactory.appFactory.compile()).approvalProgram
  const boxedProgramMbr = 2_500n + 400n * (2n + BigInt(program.length))
  await appClient.appClient.fundAppAccount({ amount: microAlgo(100_000n + boxedProgramMbr) })

  const chunkSize = 2_032
  const init = await appClient.params.initBoxedContract({
    args: { version: 'guild-wallet-test', size: program.length },
  })
  const composer = await appClient.newGroup().composer()
  composer.addAppCallMethodCall(init)
  for (let offset = 0; offset < program.length; offset += chunkSize) {
    composer.addAppCallMethodCall(
      await appClient.params.loadBoxedContract({
        args: { offset, data: program.slice(offset, offset + chunkSize) },
      }),
    )
  }
  await composer.send()
  return appClient
}

const createRealWalletGuild = async (): Promise<{ guild: GuildClient; wallet: AbstractedAccountClient }> => {
  const settings = proposalSettings()
  const { guild } = await mintGuild(
    environment,
    FIXED_SIGNERS,
    fixedSignerConfig(1n),
    settings,
    environment.creator,
    baseConfig(settings),
  )
  const memberMbr = await environment.algorand.createTransaction.payment({
    sender: environment.creator.addr,
    signer: environment.creator.signer,
    receiver: guild.appAddress,
    amount: microAlgo(31_400n),
  })
  await guild.send.configureConsensus({
    args: { mbrPayment: memberMbr, config: fixedSignerConfiguration(1, [[environment.creator.addr.toString(), 1n]]) },
    ...send,
  })

  const setupCost = await guild.setupCost({ args: {}, staticFee: MAX_APP_CALL_FEE })
  await guild.appClient.fundAppAccount({ amount: microAlgo(setupCost) })
  const setup = await guild
    .newGroup()
    .opUp({ args: {}, note: 'real-wallet-setup-opup-1', maxFee: MAX_APP_CALL_FEE })
    .opUp({ args: {}, note: 'real-wallet-setup-opup-2', maxFee: MAX_APP_CALL_FEE })
    .opUp({ args: {}, note: 'real-wallet-setup-opup-3', maxFee: MAX_APP_CALL_FEE })
    .opUp({ args: {}, note: 'real-wallet-setup-opup-4', maxFee: MAX_APP_CALL_FEE })
    .opUp({ args: {}, note: 'real-wallet-setup-opup-5', maxFee: MAX_APP_CALL_FEE })
    .setup({ args: { nickname: 'Real Guild Wallet', salt: new Uint8Array(32) }, maxFee: MAX_APP_CALL_FEE })
    .send(send)
  const walletId = setup.returns[5]!
  const wallet = new AbstractedAccountClient({
    algorand: environment.algorand,
    appId: walletId,
    defaultSender: environment.creator.addr,
    defaultSigner: environment.creator.signer,
  })

  expect(await wallet.arc58GetAdmin()).toBe(guild.appAddress.toString())
  expect((await guild.state.global.getAll()).wallet).toBe(walletId)
  await guild.send.initialize({ args: {}, ...send })
  return { guild, wallet }
}

/** Create, submit, approve, and finalize a proposal without executing it. */
const approveOnly = async (guild: GuildClient, actions: GuildAction[]) => {
  const proposalId = await createProposal(environment, guild, actions)
  await submitProposal(guild, proposalId)
  await vote(environment, guild, environment.creator, proposalId, APPROVE)
  await endVoting(timeWarp)
  await finalizeProposal(guild, proposalId)
  return proposalId
}

const approve = async (guild: GuildClient, actions: GuildAction[]) => {
  const proposalId = await approveOnly(guild, actions)
  await executeProposal(guild, proposalId)
  return proposalId
}

describe('Guild production ARC-58 wallet integration', () => {
  beforeAll(fixture.newScope, 120_000)
  beforeAll(async () => {
    environment = await deployGuildTestEnvironment(fixture.context.algorand, fixture.context.testAccount)
    previousWalletMbrAppId = process.env.WALLET_MBR_APP_ID
    const mbrFactory = new AbstractedAccountMbrFactory({ algorand: environment.algorand, defaultSender: environment.creator.addr, defaultSigner: environment.creator.signer })
    process.env.WALLET_MBR_APP_ID = (await mbrFactory.send.create.bare()).appClient.appId.toString()
    const escrowFactory = await deployEscrowFactory({
      fixture,
      sender: environment.creator.addr,
      signer: environment.creator.signer,
    })
    walletFactory = await deployRealWalletFactory(escrowFactory.appId)
    // Guilds create their wallets through the DAO's wallet factory, exactly as the Akita DAO does.
    await new MockGuildAkitaDaoClient({
      algorand: environment.algorand,
      appId: environment.akitaDao,
      defaultSender: environment.creator.addr,
      defaultSigner: environment.creator.signer,
    }).send.setWalletFactory({ args: { wallet: walletFactory.appId } })
    timeWarp = new TimeWarp(environment.algorand)
  }, 240_000)
  afterAll(async () => {
    await timeWarp?.resetTimeWarp()
    if (previousWalletMbrAppId === undefined) delete process.env.WALLET_MBR_APP_ID
    else process.env.WALLET_MBR_APP_ID = previousWalletMbrAppId
  })

  test('creates a real Guild-administered wallet and surfaces wallet MBR reverts without consuming the proposal', async () => {
    const { guild, wallet } = await createRealWalletGuild()
    const plugin = environment.revenueEscrow.appId
    const proposalId = await approveOnly(guild, [addPluginAction(plugin, ALGORAND_ZERO_ADDRESS_STRING, '')])

    await expect(executeProposal(guild, proposalId)).rejects.toThrow(/balance .* below min/)
    expect((await guild.getProposal({ args: { proposalId } })).status).toBe(40)

    await wallet.appClient.fundAppAccount({ amount: microAlgo(38_900n) })
    await executeProposal(guild, proposalId)
    expect((await guild.getProposal({ args: { proposalId } })).status).toBe(50)

    const installed = await wallet.arc58GetPlugins({
      args: { keys: [[plugin, ALGORAND_ZERO_ADDRESS_STRING, '']] },
    })
    expect(installed).toHaveLength(1)
    expect(installed[0][11]).toBeGreaterThan(0n)
    const account = await environment.algorand.account.getInformation(wallet.appAddress)
    expect(account.balance.microAlgos).toBeGreaterThanOrEqual(account.minBalance.microAlgos)
  }, 240_000)

  test('executes only approved wallet group hashes and consumes the authorization', async () => {
    const { guild, wallet } = await createRealWalletGuild()
    const { algorand, creator } = environment
    const actual = await deployPayPlugin({ fixture, sender: creator.addr, signer: creator.signer })
    await wallet.appClient.fundAppAccount({ amount: microAlgo(3_000_000n) })
    // Execution preparation simulates as the wallet's Guild admin and needs fee headroom there.
    await guild.appClient.fundAppAccount({ amount: microAlgo(3_000_000n) })
    await approve(guild, [addPluginAction(actual.appId, ALGORAND_ZERO_ADDRESS_STRING, '')])
    const sdk = new WalletSDK({
      algorand, readerAccount: creator.addr.toString(),
      factoryParams: { appId: wallet.appId, defaultSender: creator.addr, defaultSigner: creator.signer },
    })
    const execution = await sdk.build.usePlugin({
      sender: creator.addr, signer: creator.signer, callerType: CallerType.Global,
      lease: 'guild_execution_regression', windowSize: 1000n,
      calls: [actual.pay({ payments: [{ receiver: creator.addr.toString(), amount: 1n, asset: 0n }] })],
    })
    const authorization = (groups: AbiBytes[]) => executePluginAction(actual.appId, '', new Uint8Array(execution.lease), groups, execution.firstValid, execution.lastValid)
    const wrongGroups = [new Uint8Array(32).fill(123)]
    await approve(guild, [authorization(wrongGroups)])
    const before = await algorand.account.getInformation(wallet.appAddress)
    await expectContractError(sendPrepared(execution.windows[0], algorand.client.algod), 'errNgrp')
    expect((await algorand.account.getInformation(wallet.appAddress)).balance.microAlgos).toBe(before.balance.microAlgos)
    expect((await sdk.getExecution(execution.lease)).groups).toEqual(wrongGroups)
    await approve(guild, [removeExecutionAction(new Uint8Array(execution.lease))])
    await approve(guild, [authorization(execution.ids.map(id => new Uint8Array(id)))])
    await sendPrepared(execution.windows[0], algorand.client.algod)
    expect((await wallet.state.box.executions.getMap()).size).toBe(0)
  }, 240_000)

  test('executes only the exact voted Guild update group, consumes its authorization, and refunds its storage', async () => {
    const { guild } = await createRealWalletGuild()
    const { algorand, creator } = environment
    const lease = new Uint8Array(32).fill(91)
    const proposalId = (await guild.state.global.proposalId())!
    const suggested = await algorand.getSuggestedParams()
    const firstValid = BigInt(suggested.firstValid)
    const lastValid = firstValid + 1000n
    const composer = algorand.newGroup()
    composer.addAppCallMethodCall(await guild.params.opUp({ args: {}, firstValidRound: firstValid, lastValidRound: lastValid }))
    composer.addAppUpdateMethodCall(await guild.params.update.update({
      args: { newVersion: 'governed-update' },
      lease, firstValidRound: firstValid, lastValidRound: lastValid, staticFee: microAlgo(10_000n),
      // the empty reference adds read budget for the proposal box
      boxReferences: [new Uint8Array([120, ...lease]), new Uint8Array([108, ...encodeAbi('uint64', proposalId)]), new Uint8Array()],
    }))
    const transactions = groupTransactions((await composer.buildTransactions()).transactions)
    const group = transactions[0].group!
    const submit = async (txns = transactions) => algorand.client.algod.sendRawTransaction(
      await creator.signer(txns, txns.map((_, index) => index)),
    ).do()
    await expect(submit()).rejects.toThrow()
    const createdId = await createProposal(environment, guild, [[10, encodeAbi('(uint64,byte[32],byte[32][],uint64,uint64)', [
      guild.appId, lease, [group], firstValid, lastValid,
    ])]])
    expect(createdId).toBe(proposalId)
    await submitProposal(guild, proposalId)
    await vote(environment, guild, creator, proposalId, APPROVE)
    await endVoting(timeWarp)
    await finalizeProposal(guild, proposalId)
    await executeProposal(guild, proposalId)
    const changedGroup = groupTransactions(transactions.map((txn) => Transaction.fromEncodingData(new Map([...txn.toEncodingData(), ['grp', undefined], ['note', new Uint8Array([1])]]))))
    await expect(submit(changedGroup)).rejects.toThrow()
    expect((await guild.state.box.executions.getMap()).size).toBe(1)
    const guildBalanceBefore = await balanceOf(environment, guild.appAddress)
    const guildMinimumBefore = await minBalanceOf(environment, guild.appAddress)
    await submit()
    expect((await guild.state.global.getAll()).version).toBe('governed-update')
    expect((await guild.state.box.executions.getMap()).size).toBe(0)
    // The consumed execution box's storage goes back to the proposer instead of staying in the Guild.
    expect(guildBalanceBefore - (await balanceOf(environment, guild.appAddress))).toBe(EXECUTION_MBR)
    expect(guildMinimumBefore - (await minBalanceOf(environment, guild.appAddress))).toBe(EXECUTION_MBR)
    await expect(submit()).rejects.toThrow()
  }, 240_000)

  test('creates, locks, unlocks, and reclaims escrows on the production wallet', async () => {
    const { guild, wallet } = await createRealWalletGuild()
    await wallet.appClient.fundAppAccount({ amount: microAlgo(3_000_000n) })

    await approve(guild, [newEscrowAction('ops', ALGORAND_ZERO_ADDRESS_STRING)])
    const escrowInfo = async () => {
      const [info] = await wallet.arc58GetEscrows({ args: { escrows: ['ops'] } })
      const raw = info as unknown as [bigint, string, boolean] | { id: bigint; address: string; locked: boolean }
      return Array.isArray(raw) ? { id: raw[0], address: raw[1], locked: raw[2] } : raw
    }
    const escrow = await escrowInfo()
    expect(escrow.id).toBeGreaterThan(0n)
    expect(escrow.locked).toBe(false)
    const escrowAddress = escrow.address.toString()
    await environment.algorand.send.payment({
      sender: environment.creator.addr,
      signer: environment.creator.signer,
      receiver: escrowAddress,
      amount: microAlgo(500_000n),
    })
    const escrowFunded = await balanceOf(environment, escrowAddress)

    const allowance: [bigint, number, bigint, bigint, bigint, boolean] = [0n, 1, 5n, 5n, 60n, false]
    await approve(guild, [addAllowancesAction('ops', [allowance])])
    await approve(guild, [toggleEscrowAction('ops')])
    expect((await escrowInfo()).locked).toBe(true)

    // The production wallet refuses allowance changes on a locked escrow; the approved proposal waits.
    const blocked = await approveOnly(guild, [removeAllowancesAction('ops', [0n])])
    await expect(executeProposal(guild, blocked)).rejects.toThrow()
    expect((await guild.getProposal({ args: { proposalId: blocked } })).status).toBe(40)
    await approve(guild, [toggleEscrowAction('ops')])
    await executeProposal(guild, blocked)
    expect((await guild.getProposal({ args: { proposalId: blocked } })).status).toBe(50)

    const walletBefore = await balanceOf(environment, wallet.appAddress)
    await approve(guild, [reclaimAction('ops', [[0n, 400_000n, false]])])
    expect((await balanceOf(environment, wallet.appAddress)) - walletBefore).toBe(400_000n)
    expect(await balanceOf(environment, escrowAddress)).toBe(escrowFunded - 400_000n)
  }, 360_000)

  test('installs, names, and removes plugins on the production wallet', async () => {
    const { guild, wallet } = await createRealWalletGuild()
    const { creator } = environment
    await wallet.appClient.fundAppAccount({ amount: microAlgo(2_000_000n) })
    const pay = await deployPayPlugin({ fixture, sender: creator.addr, signer: creator.signer })

    await approve(guild, [addNamedPluginAction('pay', pay.appId, ALGORAND_ZERO_ADDRESS_STRING, '')])
    const named = await wallet.arc58GetNamedPluginKey({ args: { name: 'pay' } })
    expect(named.plugin).toBe(pay.appId)
    expect(await guild.state.box.plugins.value({ plugin: pay.appId, escrow: '' })).toBeDefined()

    await approve(guild, [removeNamedPluginAction('pay', pay.appId, ALGORAND_ZERO_ADDRESS_STRING, '')])
    expect((await wallet.state.box.plugins.getMap()).size).toBe(0)
    expect((await guild.state.box.plugins.getMap()).size).toBe(0)

    // A directly callable plugin has no execution settings and therefore no Guild storage.
    await approve(guild, [addPluginAction(pay.appId, ALGORAND_ZERO_ADDRESS_STRING, '', proposalSettings(), false)])
    expect((await wallet.state.box.plugins.getMap()).size).toBe(1)
    expect((await guild.state.box.plugins.getMap()).size).toBe(0)
    await approve(guild, [removePluginAction(pay.appId, ALGORAND_ZERO_ADDRESS_STRING, '')])
    expect((await wallet.state.box.plugins.getMap()).size).toBe(0)
  }, 360_000)

  test('removes an escrow with its plugins, its allowance and its asset in one proposal, and refuses the delete alone', async () => {
    const { guild, wallet } = await createRealWalletGuild()
    const { creator, algorand } = environment
    await wallet.appClient.fundAppAccount({ amount: microAlgo(6_000_000n) })
    const pay = await deployPayPlugin({ fixture, sender: creator.addr, signer: creator.signer })
    const optIn = await deployOptInPlugin({ fixture, sender: creator.addr, signer: creator.signer })
    const sdk = new WalletSDK({
      algorand, readerAccount: creator.addr.toString(),
      factoryParams: { appId: wallet.appId, defaultSender: creator.addr, defaultSigner: creator.signer },
    })
    const { assetId: asset } = await algorand.send.assetCreate({ sender: creator.addr, signer: creator.signer, total: 1_000n, decimals: 0 })

    // the Guild's wallet holds the asset, so it can take it back from the escrow
    await approve(guild, [addPluginAction(optIn.appId, ALGORAND_ZERO_ADDRESS_STRING, '', proposalSettings(), false)])
    await sdk.usePlugin({ sender: creator.addr, signer: creator.signer, callerType: CallerType.Global, calls: [optIn.optIn({ assets: [asset] })] })

    // an escrow that three grants name: one directly callable, one voted policy with an alias, and one
    // that uses the escrow by default for a named caller
    await approve(guild, [newEscrowAction('ops', ALGORAND_ZERO_ADDRESS_STRING)])
    await approve(guild, [addPluginAction(optIn.appId, ALGORAND_ZERO_ADDRESS_STRING, 'ops', proposalSettings(), false)])
    await approve(guild, [addNamedPluginAction('ops_pay', pay.appId, ALGORAND_ZERO_ADDRESS_STRING, 'ops')])
    await approve(guild, [addPluginAction(pay.appId, creator.addr.toString(), 'ops', proposalSettings(), false, false, true)])
    await approve(guild, [addAllowancesAction('ops', [[0n, 1, 5n, 5n, 60n, false]])])
    await sdk.usePlugin({ sender: creator.addr, signer: creator.signer, callerType: CallerType.Global, escrow: 'ops', calls: [optIn.optIn({ assets: [asset] })] })

    const { id, address } = await sdk.getEscrow('ops')
    await algorand.send.assetTransfer({ sender: creator.addr, signer: creator.signer, receiver: address, assetId: asset, amount: 40n })
    await algorand.send.payment({ sender: creator.addr, signer: creator.signer, receiver: address, amount: microAlgo(300_000n) })
    expect(await sdk.getEscrowRefs('ops')).toBe(4n)
    expect(await guild.state.box.plugins.value({ plugin: pay.appId, escrow: 'ops' })).toBeDefined()

    // The delete by itself is approved, and refused by the wallet when it runs; the proposal waits.
    const alone = await approveOnly(guild, [action(73, encodeAbi('(string)', ['ops']))])
    await expectContractError(executeProposal(guild, alone), 'errEuse')
    expect((await guild.getProposal({ args: { proposalId: alone } })).status).toBe(40)
    expect((await sdk.getEscrow('ops')).id).toBe(id)

    // what the SDK builds from the chain: every removal, the close-out, and the delete last
    const actions = deleteEscrowActions(await sdk.getEscrowTeardown('ops'))
    expect(actions.map(([type]) => Number(type)).sort((a, b) => a - b)).toEqual([40, 40, 41, 60, 72, 73])
    expect(Number(actions[actions.length - 1][0])).toBe(73)

    const walletBefore = await environment.algorand.account.getInformation(wallet.appAddress)
    const escrowHeld = await balanceOf(environment, address)

    await approve(guild, actions.map(([type, data]) => action(Number(type), data as AbiBytes)))

    // the escrow, its app, its record, its count, its grants, its alias and its allowance are gone
    expect((await sdk.getEscrows()).has('ops')).toBe(false)
    await expect(algorand.client.algod.getApplicationByID(id).do()).rejects.toThrow()
    expect(await sdk.getEscrowRefs('ops')).toBeUndefined()
    expect(Array.from((await wallet.state.box.plugins.getMap()).keys()).map((key) => key.plugin)).toEqual([optIn.appId])
    expect((await wallet.state.box.namedPlugins.getMap()).size).toBe(0)
    expect((await wallet.state.box.allowances.getMap()).size).toBe(0)
    // the Guild forgot the voted policy of the removed plugin
    expect((await guild.state.box.plugins.getMap()).size).toBe(0)
    // and the wallet has the asset and the ALGO back: what the escrow held, the 150,000 the factory held
    // for its app, and the storage the Guild held for the voted plugin's policy, which the Guild pays to
    // its wallet when the plugin goes (26,900 and 400 per byte of the escrow's name)
    const walletAfter = await environment.algorand.account.getInformation(wallet.appAddress)
    expect(await balanceOf(environment, address)).toBe(0n)
    expect(walletAfter.assets?.find((holding) => holding.assetId === asset)?.amount).toBe(40n)
    expect(walletAfter.balance.microAlgos - walletBefore.balance.microAlgos).toBe(escrowHeld + 150_000n + 26_900n + 400n * 3n)
  }, 600_000)

  test('removes an escrow that is an outside account rekeyed to the Guild wallet, which the factory has no part in', async () => {
    const { guild, wallet } = await createRealWalletGuild()
    const { creator, algorand } = environment
    await wallet.appClient.fundAppAccount({ amount: microAlgo(3_000_000n) })
    const pay = await deployPayPlugin({ fixture, sender: creator.addr, signer: creator.signer })
    const sdk = new WalletSDK({
      algorand, readerAccount: creator.addr.toString(),
      factoryParams: { appId: wallet.appId, defaultSender: creator.addr, defaultSigner: creator.signer },
    })

    const outside = algorand.account.random()
    await algorand.send.payment({ sender: creator.addr, signer: creator.signer, receiver: outside.addr, amount: microAlgo(2_000_000n) })
    await algorand.send.payment({ sender: outside.addr, signer: outside.signer, receiver: outside.addr, amount: microAlgo(0n), rekeyTo: wallet.appAddress })
    const address = outside.addr.toString()

    // the proposal registers the account under the name: there is no escrow app, so the record's id is 0
    await approve(guild, [newEscrowAction('adopted', address)])
    expect((await sdk.getEscrow('adopted')).id).toBe(0n)
    await approve(guild, [addPluginAction(pay.appId, ALGORAND_ZERO_ADDRESS_STRING, 'adopted', proposalSettings(), false)])
    expect(await sdk.getEscrowRefs('adopted')).toBe(1n)

    // it is counted like any escrow, so the delete alone is refused when it runs
    const alone = await approveOnly(guild, [action(73, encodeAbi('(string)', ['adopted']))])
    await expectContractError(executeProposal(guild, alone), 'errEuse')

    // the plugin's removal, then the delete
    const actions = deleteEscrowActions(await sdk.getEscrowTeardown('adopted'))
    expect(actions.map(([type]) => Number(type))).toEqual([40, 73])

    const walletBefore = await algorand.account.getInformation(wallet.appAddress)
    const held = await balanceOf(environment, address)

    await approve(guild, actions.map(([type, data]) => action(Number(type), data as AbiBytes)))

    expect((await sdk.getEscrows()).has('adopted')).toBe(false)
    expect(await sdk.getEscrowRefs('adopted')).toBeUndefined()
    expect((await wallet.state.box.plugins.getMap()).size).toBe(0)
    // the account is closed out, and closing it ended its rekey to the wallet
    const closed = await algorand.account.getInformation(address)
    expect(closed.balance.microAlgos).toBe(0n)
    expect(closed.authAddr).toBeUndefined()
    // only what the account held comes back: no app and no factory record were involved
    const walletAfter = await algorand.account.getInformation(wallet.appAddress)
    expect(walletAfter.balance.microAlgos - walletBefore.balance.microAlgos).toBe(held)
  }, 600_000)

  test('re-deploys the wallet program through its factory only on governance approval', async () => {
    const { guild, wallet } = await createRealWalletGuild()
    const versionBefore = (await wallet.state.global.getAll()).version
    // GUILD-1: the treasury opts out of automatic updates, so a non-admin cannot push wallet code into it.
    const stranger = environment.algorand.account.random()
    await environment.algorand.send.payment({ sender: environment.creator.addr, signer: environment.creator.signer, receiver: stranger.addr, amount: microAlgo(1_000_000) })
    await expectContractError(
      walletFactory.send.updateWallet({ sender: stranger.addr, signer: stranger.signer, args: { wallet: wallet.appId }, ...send }),
      errAdminOnly,
    )
    await approve(guild, [action(ACTION_UPDATE_WALLET)])
    expect((await wallet.state.global.getAll()).version).toBe(versionBefore)
    expect(await wallet.arc58GetAdmin()).toBe(guild.appAddress.toString())
  }, 240_000)

  test('hands the treasury to a new administrator and creates a fresh successor wallet afterwards', async () => {
    const { guild, wallet } = await createRealWalletGuild()
    const creator = environment.creator.addr.toString()

    await approve(guild, [changeAdminAction(creator)])
    expect(await wallet.arc58GetAdmin()).toBe(creator)
    expect((await guild.state.global.getAll()).wallet).toBeUndefined()
    await expect(createProposal(environment, guild, [toggleEscrowAction('ops')])).rejects.toThrow('ERR:errGwlr')

    // The Guild never re-adopts a wallet, even its own former one; it always creates a fresh one.
    await approve(guild, [newWalletAction('Successor Guild Wallet', new Uint8Array(32).fill(1))])
    const successorId = (await guild.state.global.getAll()).wallet!
    expect(successorId).not.toBe(wallet.appId)
    const successor = new AbstractedAccountClient({
      algorand: environment.algorand,
      appId: successorId,
      defaultSender: environment.creator.addr,
      defaultSigner: environment.creator.signer,
    })
    expect(await successor.arc58GetAdmin()).toBe(guild.appAddress.toString())
    expect((await environment.algorand.app.getById(successorId)).creator.toString()).toBe(walletFactory.appAddress.toString())
  }, 240_000)
})

import { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import { microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { TimeWarp } from '../../../../tests/utils/time'
import {
  action,
  addNamedPluginAction,
  addPluginAction,
  ACTION_FULLY_INITIALIZE,
  ACTION_LOCK_PLUGIN_SET,
  APPROVE,
  approveAndExecute,
  balanceOf,
  changeAdminAction,
  createProposal,
  endVoting,
  executeProposal,
  EXECUTION_MBR,
  minBalanceOf,
  upgradeAppAction,
  deployGuildTestEnvironment,
  setupGuildWallet,
  expectContractError,
  executePluginAction,
  mintLockedGuild,
  newEscrowAction,
  proposalSettings,
  removeAllowancesAction,
  removeExecutionAction,
  removeNamedPluginAction,
  removePluginAction,
  setLimitAction,
  setSettingsAction,
  newWalletAction,
  cancelProposal,
  cleanupProposal,
  finalizeProposal,
  submitProposal,
  setPluginSettingsAction,
  walletClient,
  MOCK_WALLET_COST,
  toggleEscrowAction,
  addAllowancesAction,
  vote,
  ZERO_CID,
  type GuildTestEnvironment,
} from './test-helpers'

const fixture = algorandFixture()
let environment: GuildTestEnvironment
let timeWarp: TimeWarp

describe('Shared Guild lifecycle and action execution', () => {
  beforeAll(fixture.newScope, 120_000)
  beforeAll(async () => {
    environment = await deployGuildTestEnvironment(fixture.context.algorand, fixture.context.testAccount)
    timeWarp = new TimeWarp(environment.algorand)
  }, 180_000)
  afterAll(async () => timeWarp?.resetTimeWarp())

  test('executes creator-approved draft actions immediately and invalidates bootstrap proposals after activation', async () => {
    const { guild } = await mintLockedGuild(environment)
    await guild.appClient.fundAppAccount({ amount: microAlgo(1_000_000n) })
    const updatedSettings = proposalSettings({ duration: 9n, minimumApprovals: 2n })
    const actions = [setLimitAction(4n), setSettingsAction(ACTION_LOCK_PLUGIN_SET, updatedSettings)]
    const zeroPayment = await environment.algorand.createTransaction.payment({
      sender: environment.creator.addr,
      signer: environment.creator.signer,
      receiver: guild.appAddress,
      amount: microAlgo(0n),
    })
    const created = await guild
      .newGroup()
      .opUp({ args: {}, note: 'draft-create-opup-1', maxFee: microAlgo(100_000n) })
      .opUp({ args: {}, note: 'draft-create-opup-2', maxFee: microAlgo(100_000n) })
      .opUp({ args: {}, note: 'draft-create-opup-3', maxFee: microAlgo(100_000n) })
      .opUp({ args: {}, note: 'draft-create-opup-4', maxFee: microAlgo(100_000n) })
      .opUp({ args: {}, note: 'draft-create-opup-5', maxFee: microAlgo(100_000n) })
      .newProposal({
        args: { payment: zeroPayment, cid: ZERO_CID, actions, evidence: new Uint8Array() },
        maxFee: microAlgo(100_000n),
      })
      .send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true })
    const proposalId = created.returns[5]!
    await guild
      .newGroup()
      .opUp({ args: {}, note: 'draft-execute-opup-1', maxFee: microAlgo(100_000n) })
      .opUp({ args: {}, note: 'draft-execute-opup-2', maxFee: microAlgo(100_000n) })
      .opUp({ args: {}, note: 'draft-execute-opup-3', maxFee: microAlgo(100_000n) })
      .opUp({ args: {}, note: 'draft-execute-opup-4', maxFee: microAlgo(100_000n) })
      .opUp({ args: {}, note: 'draft-execute-opup-5', maxFee: microAlgo(100_000n) })
      .executeProposal({ args: { proposalId }, maxFee: microAlgo(100_000n) })
      .send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true })
    const state = await guild.state.global.getAll()
    expect(state.proposalActionLimit).toBe(4n)
    expect(state.updateGuildProposalSettings?.duration).toBe(9n)
    expect((await guild.getProposal({ args: { proposalId } })).status).toBe(50)

    const stalePayment = await environment.algorand.createTransaction.payment({
      sender: environment.creator.addr,
      signer: environment.creator.signer,
      receiver: guild.appAddress,
      amount: microAlgo(0n),
    })
    const stale = await guild
      .newGroup()
      .opUp({ args: {}, maxFee: microAlgo(100_000n) })
      .newProposal({
        args: {
          payment: stalePayment,
          cid: ZERO_CID,
          actions: [action(ACTION_LOCK_PLUGIN_SET)],
          evidence: new Uint8Array(),
        },
        maxFee: microAlgo(100_000n),
      })
      .send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true })
    const staleProposalId = stale.returns[1]!
    await guild.send.partiallyInitialize({
      args: {},
      maxFee: microAlgo(100_000n),
      coverAppCallInnerTransactionFees: true,
    })
    await expect(
      guild
        .newGroup()
        .opUp({ args: {}, maxFee: microAlgo(100_000n) })
        .executeProposal({ args: { proposalId: staleProposalId }, maxFee: microAlgo(100_000n) })
        .send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true }),
    ).rejects.toThrow('ERR:errGdrf')
  }, 120_000)

  test('attaches a wallet and reaches full initialization exclusively through approved proposals', async () => {
    const { guild } = await mintLockedGuild(environment)
    await guild.send.partiallyInitialize({
      args: {},
      maxFee: microAlgo(100_000n),
      coverAppCallInnerTransactionFees: true,
    })

    // Governance creates the wallet through the DAO factory; the proposer prepays its creation cost.
    const newWalletId = await createProposal(environment, guild, [newWalletAction('governed')])
    expect((await guild.getProposal({ args: { proposalId: newWalletId } })).feesPaid).toBeGreaterThan(MOCK_WALLET_COST)
    await guild.send.submitProposal({
      args: { proposalId: newWalletId, evidence: new Uint8Array() },
      maxFee: microAlgo(100_000n),
      coverAppCallInnerTransactionFees: true,
    })
    await vote(environment, guild, environment.creator, newWalletId, APPROVE)
    await endVoting(timeWarp)
    await guild.send.finalizeProposal({
      args: { proposalId: newWalletId },
      maxFee: microAlgo(100_000n),
      coverAppCallInnerTransactionFees: true,
    })
    await guild.send.executeProposal({
      args: { proposalId: newWalletId },
      maxFee: microAlgo(100_000n),
      coverAppCallInnerTransactionFees: true,
    })
    const walletId = (await guild.state.global.getAll()).wallet!
    expect(await walletClient(environment, walletId).arc58GetAdmin({ args: {} })).toBe(guild.appAddress.toString())
    expect(await guild.state.global.reserved()).toBe(0n)

    const initializeId = await createProposal(environment, guild, [action(ACTION_FULLY_INITIALIZE)])
    await guild.send.submitProposal({
      args: { proposalId: initializeId, evidence: new Uint8Array() },
      maxFee: microAlgo(100_000n),
      coverAppCallInnerTransactionFees: true,
    })
    await vote(environment, guild, environment.creator, initializeId, APPROVE)
    await endVoting(timeWarp)
    await guild.send.finalizeProposal({
      args: { proposalId: initializeId },
      maxFee: microAlgo(100_000n),
      coverAppCallInnerTransactionFees: true,
    })
    await guild.send.executeProposal({
      args: { proposalId: initializeId },
      maxFee: microAlgo(100_000n),
      coverAppCallInnerTransactionFees: true,
    })
    expect((await guild.state.global.getAll()).state).toBe(2)
  }, 120_000)

  test('proxies escrow, allowance, and execution-key actions into the ARC-58 wallet', async () => {
    const { guild } = await mintLockedGuild(environment)
    const wallet = await setupGuildWallet(environment, guild)
    await guild.send.initialize({ args: {}, maxFee: microAlgo(100_000n), coverAppCallInnerTransactionFees: true })
    const lease = new Uint8Array(32)
    lease[0] = 7
    const actions = [
      newEscrowAction('ops', environment.creator.addr.toString()),
      toggleEscrowAction('ops'),
      addAllowancesAction('ops', [[0n, 1, 5n, 5n, 60n, false]]),
      removeAllowancesAction('ops', [0n]),
      removeExecutionAction(lease),
    ]
    const proposalId = await createProposal(environment, guild, actions)
    await guild
      .newGroup()
      .opUp({ args: {}, note: 'wallet-submit-opup-1', maxFee: microAlgo(100_000n) })
      .opUp({ args: {}, note: 'wallet-submit-opup-2', maxFee: microAlgo(100_000n) })
      .opUp({ args: {}, note: 'wallet-submit-opup-3', maxFee: microAlgo(100_000n) })
      .opUp({ args: {}, note: 'wallet-submit-opup-4', maxFee: microAlgo(100_000n) })
      .opUp({ args: {}, note: 'wallet-submit-opup-5', maxFee: microAlgo(100_000n) })
      .submitProposal({ args: { proposalId, evidence: new Uint8Array() }, maxFee: microAlgo(100_000n) })
      .send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true })
    await vote(environment, guild, environment.creator, proposalId, APPROVE)
    await endVoting(timeWarp)
    await guild.send.finalizeProposal({
      args: { proposalId },
      maxFee: microAlgo(100_000n),
      coverAppCallInnerTransactionFees: true,
    })
    await guild
      .newGroup()
      .opUp({ args: {}, note: 'wallet-execute-opup-1', maxFee: microAlgo(100_000n) })
      .opUp({ args: {}, note: 'wallet-execute-opup-2', maxFee: microAlgo(100_000n) })
      .opUp({ args: {}, note: 'wallet-execute-opup-3', maxFee: microAlgo(100_000n) })
      .opUp({ args: {}, note: 'wallet-execute-opup-4', maxFee: microAlgo(100_000n) })
      .opUp({ args: {}, note: 'wallet-execute-opup-5', maxFee: microAlgo(100_000n) })
      .executeProposal({ args: { proposalId }, maxFee: microAlgo(100_000n) })
      .send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true })
    const walletState = await wallet.state.global.getAll()
    expect(walletState.actionCount).toBe(5n)
    expect(walletState.lastAction).toBe(31n)
    expect(walletState.escrowLocked).toBe(1n)
  }, 120_000)

  test('validates action lists, payments, proposal ownership, editing, and deletion', async () => {
    const outsider = await fixture.context.generateAccount({ initialFunds: microAlgo(3_000_000n) })
    const { guild } = await mintLockedGuild(environment)
    await guild
      .newGroup()
      .opUp({ args: {}, maxFee: microAlgo(100_000n) })
      .setProposalActionLimit({ args: { limit: 1n }, maxFee: microAlgo(100_000n) })
      .send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true })
    await expect(guild.send.setProposalActionLimit({ args: { limit: 13n } })).rejects.toThrow('ERR:errGmax')
    await guild.send.partiallyInitialize({
      args: {},
      maxFee: microAlgo(100_000n),
      coverAppCallInnerTransactionFees: true,
    })

    await expect(createProposal(environment, guild, [])).rejects.toThrow('ERR:errGacn')
    await expect(
      createProposal(environment, guild, [setLimitAction(2n), action(ACTION_LOCK_PLUGIN_SET)]),
    ).rejects.toThrow('ERR:errGmax')
    const proposalId = await createProposal(environment, guild, [setLimitAction(2n)])
    const outsiderGuild = guild.clone({ defaultSender: outsider.addr, defaultSigner: outsider.signer })
    await expect(
      outsiderGuild
        .newGroup()
        .opUp({ args: {}, maxFee: microAlgo(100_000n) })
        .editProposal({
          args: { id: proposalId, cid: ZERO_CID, actions: [setLimitAction(3n)], evidence: new Uint8Array() },
          maxFee: microAlgo(100_000n),
        })
        .send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true }),
    ).rejects.toThrow('ERR:errGpst')
    await guild
      .newGroup()
      .opUp({ args: {}, maxFee: microAlgo(100_000n) })
      .editProposal({
        args: { id: proposalId, cid: ZERO_CID, actions: [setLimitAction(3n)], evidence: new Uint8Array() },
        maxFee: microAlgo(100_000n),
      })
      .send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true })
    await expect(
      outsiderGuild
        .newGroup()
        .opUp({ args: {}, maxFee: microAlgo(100_000n) })
        .deleteProposal({ args: { proposalId }, maxFee: microAlgo(100_000n) })
        .send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true }),
    ).rejects.toThrow('ERR:errGcrt')
    await guild
      .newGroup()
      .opUp({ args: {}, maxFee: microAlgo(100_000n) })
      .deleteProposal({ args: { proposalId }, maxFee: microAlgo(100_000n) })
      .send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true })
    await expect(guild.getProposal({ args: { proposalId } })).rejects.toThrow('ERR:errGprp')
  }, 120_000)

  test('bounds proposal power and per-action fees in direct and governance-driven settings updates', async () => {
    const maximum = proposalSettings({ power: 1_000n, fee: 1_000_000n })
    const { guild } = await mintLockedGuild(environment)

    await guild.send.setProposalSettings({
      args: { actionType: ACTION_LOCK_PLUGIN_SET, settings: maximum },
      maxFee: microAlgo(100_000n),
      coverAppCallInnerTransactionFees: true,
    })
    await expect(
      guild.send.setProposalSettings({
        args: { actionType: ACTION_LOCK_PLUGIN_SET, settings: proposalSettings({ power: 1_001n }) },
        maxFee: microAlgo(100_000n), coverAppCallInnerTransactionFees: true,
      }),
    ).rejects.toThrow('ERR:errGset')
    await expect(
      guild.send.setProposalSettings({
        args: { actionType: ACTION_LOCK_PLUGIN_SET, settings: proposalSettings({ fee: 1_000_001n }) },
        maxFee: microAlgo(100_000n), coverAppCallInnerTransactionFees: true,
      }),
    ).rejects.toThrow('ERR:errGset')

    const { guild: governedGuild } = await mintLockedGuild(environment)
    await governedGuild.send.partiallyInitialize({
      args: {},
      maxFee: microAlgo(100_000n),
      coverAppCallInnerTransactionFees: true,
    })
    await expect(
      createProposal(environment, governedGuild, [
        setSettingsAction(ACTION_LOCK_PLUGIN_SET, proposalSettings({ power: 1_001n })),
      ]),
    ).rejects.toThrow('ERR:errGset')
    await expect(
      createProposal(environment, governedGuild, [
        setSettingsAction(ACTION_LOCK_PLUGIN_SET, proposalSettings({ fee: 1_000_001n })),
      ]),
    ).rejects.toThrow('ERR:errGset')
  }, 180_000)

  test('funds multiple plugin boxes exactly and charges action fees in addition to MBR', async () => {
    const settings = proposalSettings({ fee: 7_000n })
    const { guild } = await mintLockedGuild(environment, settings)
    const wallet = await setupGuildWallet(environment, guild)
    await guild.send.initialize({ args: {}, maxFee: microAlgo(100_000n), coverAppCallInnerTransactionFees: true })
    const escrow = 'direct'
    const executionAction = addPluginAction(wallet.appId, ALGORAND_ZERO_ADDRESS_STRING, escrow, settings)
    const directAction = addPluginAction(wallet.appId, ALGORAND_ZERO_ADDRESS_STRING, escrow, settings, false)
    const executionCost = await guild
      .newGroup()
      .opUp({ args: {}, note: 'execution-cost-opup-1', maxFee: microAlgo(100_000n) })
      .opUp({ args: {}, note: 'execution-cost-opup-2', maxFee: microAlgo(100_000n) })
      .opUp({ args: {}, note: 'execution-cost-opup-3', maxFee: microAlgo(100_000n) })
      .proposalCost({ args: { actions: [executionAction] }, maxFee: microAlgo(100_000n) })
      .send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true })
    const directCost = await guild
      .newGroup()
      .opUp({ args: {}, note: 'direct-cost-opup-1', maxFee: microAlgo(100_000n) })
      .opUp({ args: {}, note: 'direct-cost-opup-2', maxFee: microAlgo(100_000n) })
      .opUp({ args: {}, note: 'direct-cost-opup-3', maxFee: microAlgo(100_000n) })
      .proposalCost({ args: { actions: [directAction] }, maxFee: microAlgo(100_000n) })
      .send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true })
    expect(executionCost.returns[3]!.mbr - directCost.returns[3]!.mbr).toBe(26_900n + 400n * BigInt(escrow.length))

    const actions = ['alpha', 'beta', 'gamma', 'delta'].map((escrow) =>
      addPluginAction(wallet.appId, ALGORAND_ZERO_ADDRESS_STRING, escrow, settings),
    )
    const cost = await guild
      .newGroup()
      .opUp({ args: {}, note: 'multi-plugin-cost-opup-1', maxFee: microAlgo(100_000n) })
      .opUp({ args: {}, note: 'multi-plugin-cost-opup-2', maxFee: microAlgo(100_000n) })
      .opUp({ args: {}, note: 'multi-plugin-cost-opup-3', maxFee: microAlgo(100_000n) })
      .opUp({ args: {}, note: 'multi-plugin-cost-opup-4', maxFee: microAlgo(100_000n) })
      .opUp({ args: {}, note: 'multi-plugin-cost-opup-5', maxFee: microAlgo(100_000n) })
      .proposalCost({ args: { actions }, maxFee: microAlgo(100_000n) })
      .send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true })
    expect(cost.returns[5]!.fee).toBe(28_000n)
    expect(cost.returns[5]!.total).toBe(cost.returns[5]!.mbr + 28_000n)

    const proposalId = await createProposal(environment, guild, actions)
    await guild
      .newGroup()
      .opUp({ args: {}, note: 'multi-plugin-submit-opup-1', maxFee: microAlgo(100_000n) })
      .opUp({ args: {}, note: 'multi-plugin-submit-opup-2', maxFee: microAlgo(100_000n) })
      .opUp({ args: {}, note: 'multi-plugin-submit-opup-3', maxFee: microAlgo(100_000n) })
      .opUp({ args: {}, note: 'multi-plugin-submit-opup-4', maxFee: microAlgo(100_000n) })
      .opUp({ args: {}, note: 'multi-plugin-submit-opup-5', maxFee: microAlgo(100_000n) })
      .submitProposal({ args: { proposalId, evidence: new Uint8Array() }, maxFee: microAlgo(100_000n) })
      .send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true })
    await vote(environment, guild, environment.creator, proposalId, APPROVE)
    await endVoting(timeWarp)
    await guild.send.finalizeProposal({
      args: { proposalId },
      maxFee: microAlgo(100_000n),
      coverAppCallInnerTransactionFees: true,
    })
    await guild
      .newGroup()
      .opUp({ args: {}, note: 'multi-plugin-execute-opup-1', maxFee: microAlgo(100_000n) })
      .opUp({ args: {}, note: 'multi-plugin-execute-opup-2', maxFee: microAlgo(100_000n) })
      .opUp({ args: {}, note: 'multi-plugin-execute-opup-3', maxFee: microAlgo(100_000n) })
      .opUp({ args: {}, note: 'multi-plugin-execute-opup-4', maxFee: microAlgo(100_000n) })
      .opUp({ args: {}, note: 'multi-plugin-execute-opup-5', maxFee: microAlgo(100_000n) })
      .executeProposal({ args: { proposalId }, maxFee: microAlgo(100_000n) })
      .send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true })
    const account = await environment.algorand.account.getInformation(guild.appAddress)
    expect(account.balance.microAlgos).toBeGreaterThanOrEqual(account.minBalance.microAlgos)
  }, 120_000)

  test('executes named and unnamed plugin variants and permanently closes plugin-set mutation', async () => {
    const { guild } = await mintLockedGuild(environment)
    const wallet = await setupGuildWallet(environment, guild)
    await guild.appClient.fundAppAccount({ amount: microAlgo(3_000_000n) })

    const caller = ALGORAND_ZERO_ADDRESS_STRING
    const plugin = environment.revenueEscrow.appId
    const addActions = [
      addPluginAction(plugin, caller, 'plain'),
      addNamedPluginAction('named-plugin', plugin, caller, 'named'),
    ]
    const addProposalId = await createProposal(environment, guild, addActions)
    await guild
      .newGroup()
      .opUp({ args: {}, note: 'plugin-add-execute-opup-1', maxFee: microAlgo(100_000n) })
      .opUp({ args: {}, note: 'plugin-add-execute-opup-2', maxFee: microAlgo(100_000n) })
      .opUp({ args: {}, note: 'plugin-add-execute-opup-3', maxFee: microAlgo(100_000n) })
      .opUp({ args: {}, note: 'plugin-add-execute-opup-4', maxFee: microAlgo(100_000n) })
      .opUp({ args: {}, note: 'plugin-add-execute-opup-5', maxFee: microAlgo(100_000n) })
      .executeProposal({ args: { proposalId: addProposalId }, maxFee: microAlgo(100_000n) })
      .send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true })
    expect((await wallet.state.global.getAll()).actionCount).toBe(2n)
    expect(await guild.state.box.plugins.value({ plugin, escrow: 'plain' })).toBeDefined()
    expect(await guild.state.box.plugins.value({ plugin, escrow: 'named' })).toBeDefined()

    const executionKey = new Uint8Array(32)
    executionKey[0] = 9
    // Bootstrap proposals may not pre-authorize executions, so only the removals run in draft.
    await expectContractError(
      createProposal(environment, guild, [executePluginAction(plugin, 'plain', executionKey)]),
      'ERR:errGacn',
    )
    const removeActions = [
      removePluginAction(plugin, caller, 'plain'),
      removeNamedPluginAction('named-plugin', plugin, caller, 'named'),
    ]
    const removeProposalId = await createProposal(environment, guild, removeActions)
    await guild
      .newGroup()
      .opUp({ args: {}, note: 'plugin-remove-execute-opup-1', maxFee: microAlgo(100_000n) })
      .opUp({ args: {}, note: 'plugin-remove-execute-opup-2', maxFee: microAlgo(100_000n) })
      .opUp({ args: {}, note: 'plugin-remove-execute-opup-3', maxFee: microAlgo(100_000n) })
      .opUp({ args: {}, note: 'plugin-remove-execute-opup-4', maxFee: microAlgo(100_000n) })
      .opUp({ args: {}, note: 'plugin-remove-execute-opup-5', maxFee: microAlgo(100_000n) })
      .executeProposal({ args: { proposalId: removeProposalId }, maxFee: microAlgo(100_000n) })
      .send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true })
    const walletState = await wallet.state.global.getAll()
    expect(walletState.actionCount).toBe(4n)
    expect(walletState.lastAction).toBe(41n)
    expect((await guild.state.box.plugins.getMap()).size).toBe(0)

    await guild.send.lockPluginSet({ args: {} })
    expect(await guild.canChangePluginSet({ args: {} })).toBe(false)
    await expect(createProposal(environment, guild, [addPluginAction(plugin, caller, 'blocked')])).rejects.toThrow(
      'ERR:errGplk',
    )
    await expect(createProposal(environment, guild, [removePluginAction(plugin, caller, 'plain')])).rejects.toThrow(
      'ERR:errGplk',
    )
  }, 180_000)

  test('enforces proposal transition timing and resolves an empty ballot exactly once', async () => {
    const { guild } = await mintLockedGuild(environment)
    await guild.send.partiallyInitialize({
      args: {},
      maxFee: microAlgo(100_000n),
      coverAppCallInnerTransactionFees: true,
    })

    const getBallot = async (proposalId: bigint) => {
      const result = await guild
        .newGroup()
        .getBallot({ args: { proposalId }, maxFee: microAlgo(100_000n) })
        .send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true })
      return result.returns[0]!
    }

    await expectContractError(getBallot(999n), 'ERR:errGprp')
    const proposalId = await createProposal(environment, guild, [action(ACTION_LOCK_PLUGIN_SET)])
    await expect(vote(environment, guild, environment.creator, proposalId, APPROVE)).rejects.toThrow('ERR:errGpst')
    await expect(guild.send.finalizeProposal({ args: { proposalId } })).rejects.toThrow('ERR:errGpst')

    await guild.send.submitProposal({
      args: { proposalId, evidence: new Uint8Array() },
      maxFee: microAlgo(100_000n),
      coverAppCallInnerTransactionFees: true,
    })
    const openBallot = await getBallot(proposalId)
    expect(openBallot.resolved).toBe(false)
    expect(openBallot.votes).toEqual({ approvals: 0n, rejections: 0n, abstains: 0n })
    await expectContractError(guild.send.submitProposal({ args: { proposalId, evidence: new Uint8Array() }, maxFee: microAlgo(100_000n), coverAppCallInnerTransactionFees: true }), 'ERR:errGpst')
    await expect(
      guild.send.finalizeProposal({
        args: { proposalId },
        maxFee: microAlgo(100_000n),
        coverAppCallInnerTransactionFees: true,
      }),
    ).rejects.toThrow('ERR:errGopn')

    await endVoting(timeWarp)
    await expect(vote(environment, guild, environment.creator, proposalId, APPROVE)).rejects.toThrow('ERR:errGpst')
    await guild.send.finalizeProposal({
      args: { proposalId },
      maxFee: microAlgo(100_000n),
      coverAppCallInnerTransactionFees: true,
    })
    expect((await guild.getProposal({ args: { proposalId } })).status).toBe(30)
    expect((await getBallot(proposalId)).resolved).toBe(true)
    await expect(guild.send.finalizeProposal({ args: { proposalId } })).rejects.toThrow('ERR:errGpst')
    await expect(vote(environment, guild, environment.creator, proposalId, APPROVE)).rejects.toThrow('ERR:errGpst')
    await expect(guild.send.executeProposal({ args: { proposalId } })).rejects.toThrow('ERR:errGpst')

    const cleanup = await guild.send.cleanupProposalConsensus({
      args: { proposalId, voters: [] },
      maxFee: microAlgo(100_000n),
      coverAppCallInnerTransactionFees: true,
      populateAppCallResources: true,
    })
    expect(cleanup.return).toBe(0n)
    await expectContractError(getBallot(proposalId), 'ERR:errGprp')
    expect((await guild.getProposal({ args: { proposalId } })).status).toBe(30)
    await expectContractError(
      guild
        .newGroup()
        .opUp({ args: {}, maxFee: microAlgo(100_000n) })
        .deleteProposal({ args: { proposalId }, maxFee: microAlgo(100_000n) })
        .send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true }),
      'ERR:errGpst',
    )
  }, 120_000)

  test('deletes bootstrap proposals in approved or executed state and refunds their storage', async () => {
    const outsider = await fixture.context.generateAccount({ initialFunds: microAlgo(3_000_000n) })
    const { guild } = await mintLockedGuild(environment)
    await guild.appClient.fundAppAccount({ amount: microAlgo(1_000_000n) })
    const approved = await createProposal(environment, guild, [setLimitAction(4n)])
    const executed = await createProposal(environment, guild, [setLimitAction(5n)])
    await executeProposal(guild, executed)
    expect((await guild.getProposal({ args: { proposalId: approved } })).status).toBe(40)
    expect((await guild.getProposal({ args: { proposalId: executed } })).status).toBe(50)

    const outsiderGuild = guild.clone({ defaultSender: outsider.addr, defaultSigner: outsider.signer })
    await expect(
      outsiderGuild.send.deleteProposal({ args: { proposalId: approved }, maxFee: microAlgo(100_000n), coverAppCallInnerTransactionFees: true }),
    ).rejects.toThrow('ERR:errGcrt')
    for (const proposalId of [approved, executed]) {
      const balanceBefore = await balanceOf(environment, guild.appAddress)
      const minimumBefore = await minBalanceOf(environment, guild.appAddress)
      await guild.send.deleteProposal({ args: { proposalId }, maxFee: microAlgo(100_000n), coverAppCallInnerTransactionFees: true })
      // The creator recovers exactly the storage the deleted box released.
      expect(balanceBefore - (await balanceOf(environment, guild.appAddress))).toBe(
        minimumBefore - (await minBalanceOf(environment, guild.appAddress)),
      )
      await expect(guild.getProposal({ args: { proposalId } })).rejects.toThrow('ERR:errGprp')
    }

    // A bootstrap proposal that outlives draft can never execute, but it can still be cleaned up.
    const stale = await createProposal(environment, guild, [action(ACTION_LOCK_PLUGIN_SET)])
    await guild.send.partiallyInitialize({ args: {}, maxFee: microAlgo(100_000n), coverAppCallInnerTransactionFees: true })
    await expect(executeProposal(guild, stale)).rejects.toThrow('ERR:errGdrf')
    await guild.send.deleteProposal({ args: { proposalId: stale }, maxFee: microAlgo(100_000n), coverAppCallInnerTransactionFees: true })
    await expect(guild.getProposal({ args: { proposalId: stale } })).rejects.toThrow('ERR:errGprp')
  }, 180_000)

  test('refuses bootstrap proposals that would leave executions behind after draft', async () => {
    const { guild } = await mintLockedGuild(environment)
    await setupGuildWallet(environment, guild)
    await guild.appClient.fundAppAccount({ amount: microAlgo(1_000_000n) })
    const lease = new Uint8Array(32)
    lease[0] = 3
    await expectContractError(
      createProposal(environment, guild, [upgradeAppAction(guild.appId, lease, [new Uint8Array(32)], 1n, 2n)]),
      'ERR:errGacn',
    )
    const plugin = environment.revenueEscrow.appId
    await executeProposal(guild, await createProposal(environment, guild, [addPluginAction(plugin, ALGORAND_ZERO_ADDRESS_STRING, 'draft')]))
    await expectContractError(createProposal(environment, guild, [executePluginAction(plugin, 'draft', lease)]), 'ERR:errGacn')
  }, 180_000)

  test('removes a Guild-held execution key without a wallet after the treasury changes hands', async () => {
    const { guild } = await mintLockedGuild(environment)
    const wallet = await setupGuildWallet(environment, guild)
    await guild.send.initialize({ args: {}, maxFee: microAlgo(100_000n), coverAppCallInnerTransactionFees: true })
    const lease = new Uint8Array(32)
    lease[0] = 5
    const suggested = await environment.algorand.getSuggestedParams()
    const firstValid = BigInt(suggested.firstValid)
    await approveAndExecute(environment, timeWarp, guild, [
      upgradeAppAction(guild.appId, lease, [new Uint8Array(32).fill(7)], firstValid, firstValid + 1000n),
    ])
    expect((await guild.state.box.executions.getMap()).size).toBe(1)

    await approveAndExecute(environment, timeWarp, guild, [changeAdminAction(environment.creator.addr.toString())])
    expect((await guild.state.global.getAll()).wallet).toBeUndefined()
    expect((await wallet.state.global.getAll()).admin).toBe(environment.creator.addr.toString())
    await expect(createProposal(environment, guild, [toggleEscrowAction('ops')])).rejects.toThrow('ERR:errGwlr')

    const minimumBefore = await minBalanceOf(environment, guild.appAddress)
    const removal = removeExecutionAction(lease)
    await approveAndExecute(environment, timeWarp, guild, [removal])
    expect((await guild.state.box.executions.getMap()).size).toBe(0)
    // The new proposal box stays as history; the released execution box is the only storage given back.
    const removalProposalMbr = 44_900n + 400n * (7n + BigInt(removal[1].length))
    expect((await minBalanceOf(environment, guild.appAddress)) - minimumBefore).toBe(removalProposalMbr - EXECUTION_MBR)
    expect((await balanceOf(environment, guild.appAddress)) - (await minBalanceOf(environment, guild.appAddress))).toBe(
      (await guild.state.global.reserved()) ?? 0n,
    )

    // The Guild never re-adopts a wallet; governance creates a fresh successor through the DAO factory.
    await approveAndExecute(environment, timeWarp, guild, [newWalletAction('successor')])
    const successor = (await guild.state.global.getAll()).wallet!
    expect(successor).not.toBe(wallet.appId)
    expect(await walletClient(environment, successor).arc58GetAdmin({ args: {} })).toBe(guild.appAddress.toString())
    expect(await guild.state.global.reserved()).toBe(0n)
  }, 300_000)

  test('re-tunes installed plugin execution settings through governance even after the plugin set is locked', async () => {
    const { guild } = await mintLockedGuild(environment)
    await setupGuildWallet(environment, guild)
    await guild.appClient.fundAppAccount({ amount: microAlgo(1_000_000n) })
    const plugin = environment.revenueEscrow.appId
    await executeProposal(guild, await createProposal(environment, guild, [addPluginAction(plugin, ALGORAND_ZERO_ADDRESS_STRING, 'ops')]))
    await guild.send.lockPluginSet({ args: {} })
    await guild.send.initialize({ args: {}, maxFee: microAlgo(100_000n), coverAppCallInnerTransactionFees: true })

    await expectContractError(
      createProposal(environment, guild, [setPluginSettingsAction(plugin, 'missing', proposalSettings())]),
      'ERR:errGacn',
    )
    await expectContractError(
      createProposal(environment, guild, [setPluginSettingsAction(plugin, 'ops', proposalSettings({ duration: 0n }))]),
      'ERR:errGset',
    )
    const retuned = proposalSettings({ minimumApprovals: 3n, approval: 75_000n })
    await approveAndExecute(environment, timeWarp, guild, [setPluginSettingsAction(plugin, 'ops', retuned)])
    expect(await guild.state.box.plugins.value({ plugin, escrow: 'ops' })).toEqual(retuned)
    expect(await guild.canChangePluginSet({ args: {} })).toBe(false)
  }, 300_000)

  test('executes an approved proposal after a later action-limit reduction, and lets a proposer cancel', async () => {
    const { guild } = await mintLockedGuild(environment)
    await guild.send.partiallyInitialize({ args: {}, maxFee: microAlgo(100_000n), coverAppCallInnerTransactionFees: true })
    const wide = await createProposal(environment, guild, [setLimitAction(4n), action(ACTION_LOCK_PLUGIN_SET)])
    const narrow = await createProposal(environment, guild, [setLimitAction(1n)])
    const abandoned = await createProposal(environment, guild, [setLimitAction(2n)])
    for (const proposalId of [wide, narrow, abandoned]) {
      await submitProposal(guild, proposalId)
      await vote(environment, guild, environment.creator, proposalId, APPROVE)
    }
    await endVoting(timeWarp)
    for (const proposalId of [wide, narrow, abandoned]) {
      await finalizeProposal(guild, proposalId)
    }
    await executeProposal(guild, narrow)
    expect(await guild.state.global.proposalActionLimit()).toBe(1n)
    // The count was checked when the proposal was drafted; a later limit change never strands it.
    await executeProposal(guild, wide)
    expect(await guild.state.global.proposalActionLimit()).toBe(4n)

    // Approved ballots stay until the proposal executes or is cancelled.
    await expectContractError(cleanupProposal(guild, abandoned, [environment.creator.addr.toString()]), 'ERR:errGpst')
    const outsider = await fixture.context.generateAccount({ initialFunds: microAlgo(1_000_000n) })
    await expectContractError(
      cancelProposal(guild.clone({ defaultSender: outsider.addr, defaultSigner: outsider.signer }), abandoned),
      'ERR:errGcrt',
    )
    await expectContractError(cancelProposal(guild, wide), 'ERR:errGpst')
    await cancelProposal(guild, abandoned)
    expect((await guild.getProposal({ args: { proposalId: abandoned } })).status).toBe(10)
    await expectContractError(executeProposal(guild, abandoned), 'ERR:errGpst')
    expect(await cleanupProposal(guild, abandoned, [environment.creator.addr.toString()])).toBe(0n)
  }, 300_000)
})

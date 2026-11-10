import { microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { getApplicationAddress } from 'algosdk'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { GuildClient } from '../../../artifacts/arc58/guilds/core/GuildClient'
import { TimeWarp } from '../../../../tests/utils/time'
import {
  action,
  ACTION_LOCK_PLUGIN_SET,
  ACTION_REMOVE_EXECUTION,
  APPROVE,
  REJECT,
  createProposal,
  deployGuildTestEnvironment,
  setupGuildWallet,
  EMPTY_EVIDENCE,
  endVoting,
  FIXED_SIGNERS,
  mintGuild,
  encodeAbi,
  executeProposal,
  expectContractError,
  MAX_APP_CALL_FEE,
  mintLockedGuild,
  proposalSettings,
  removeExecutionAction,
  setLimitAction,
  VOTE_MBR,
  ZERO_CID,
  type GuildAction,
  type GuildTestEnvironment,
} from './test-helpers'

const fixture = algorandFixture()
let environment: GuildTestEnvironment
let timeWarp: TimeWarp

const proposalCost = async (guild: GuildClient, actions: GuildAction[]) => {
  const result = await guild
    .newGroup()
    .opUp({ args: {}, note: 'invariant-cost-opup-1', maxFee: MAX_APP_CALL_FEE })
    .opUp({ args: {}, note: 'invariant-cost-opup-2', maxFee: MAX_APP_CALL_FEE })
    .opUp({ args: {}, note: 'invariant-cost-opup-3', maxFee: MAX_APP_CALL_FEE })
    .opUp({ args: {}, note: 'invariant-cost-opup-4', maxFee: MAX_APP_CALL_FEE })
    .opUp({ args: {}, note: 'invariant-cost-opup-5', maxFee: MAX_APP_CALL_FEE })
    .proposalCost({ args: { actions }, maxFee: MAX_APP_CALL_FEE })
    .send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true })
  return result.returns[5]!
}

const newProposalWithAmount = async (guild: GuildClient, actions: GuildAction[], amount: bigint) => {
  const payment = await environment.algorand.createTransaction.payment({
    sender: environment.creator.addr,
    signer: environment.creator.signer,
    receiver: guild.appAddress,
    amount: microAlgo(amount),
  })
  return guild
    .newGroup()
    .opUp({ args: {}, note: 'invariant-create-opup-1', maxFee: MAX_APP_CALL_FEE })
    .opUp({ args: {}, note: 'invariant-create-opup-2', maxFee: MAX_APP_CALL_FEE })
    .opUp({ args: {}, note: 'invariant-create-opup-3', maxFee: MAX_APP_CALL_FEE })
    .opUp({ args: {}, note: 'invariant-create-opup-4', maxFee: MAX_APP_CALL_FEE })
    .opUp({ args: {}, note: 'invariant-create-opup-5', maxFee: MAX_APP_CALL_FEE })
    .newProposal({
      args: { payment, cid: ZERO_CID, actions, evidence: EMPTY_EVIDENCE },
      maxFee: MAX_APP_CALL_FEE,
    })
    .send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true })
}

describe('Guild cross-cutting invariants', () => {
  beforeAll(fixture.newScope, 120_000)
  beforeAll(async () => {
    environment = await deployGuildTestEnvironment(fixture.context.algorand, fixture.context.testAccount)
    timeWarp = new TimeWarp(environment.algorand)
  }, 180_000)
  afterAll(async () => timeWarp?.resetTimeWarp())

  test('enforces draft authority, wallet validity, and irreversible lifecycle transitions', async () => {
    const outsider = await fixture.context.generateAccount({ initialFunds: microAlgo(3_000_000n) })
    const { guild } = await mintLockedGuild(environment)
    const outsiderGuild = guild.clone({ defaultSender: outsider.addr, defaultSigner: outsider.signer })

    await expect(outsiderGuild.send.setProposalActionLimit({ args: { limit: 2n } })).rejects.toThrow('ERR:errGcrt')
    await expect(guild.send.initialize({ args: {} })).rejects.toThrow('ERR:errGwlr')
    // Only the creator may have the Guild create its wallet, and it is always freshly made by the DAO factory.
    await expectContractError(setupGuildWallet(environment, outsiderGuild), 'ERR:errGcrt')
    const wallet = await setupGuildWallet(environment, guild)
    expect(await wallet.arc58GetAdmin({ args: {} })).toBe(guild.appAddress.toString())
    expect((await environment.algorand.app.getById(wallet.appId)).creator.toString()).toBe(
      getApplicationAddress(environment.walletFactory).toString(),
    )
    await expectContractError(setupGuildWallet(environment, guild), 'ERR:errGwst')
    expect(await guild.canChangePluginSet({ args: {} })).toBe(true)
    await guild.send.lockPluginSet({ args: {} })
    expect(await guild.canChangePluginSet({ args: {} })).toBe(false)

    await guild.send.initialize({
      args: {},
      maxFee: MAX_APP_CALL_FEE,
      coverAppCallInnerTransactionFees: true,
    })
    expect((await guild.state.global.getAll()).state).toBe(2)
    await expect(guild.send.setProposalActionLimit({ args: { limit: 2n } })).rejects.toThrow('ERR:errGdrf')
    await expect(guild.send.partiallyInitialize({ args: {} })).rejects.toThrow('ERR:errGdrf')
    await expect(guild.send.initialize({ args: {} })).rejects.toThrow('ERR:errGdrf')
  }, 120_000)

  test('accepts every proposal-setting boundary and rejects each value just outside it', async () => {
    const { guild } = await mintLockedGuild(environment)
    // Locked-token ballots must end before the longest possible lock (one year by default), so its
    // longest valid duration is one second under MAX_GUILD_VOTING_DURATION (L-1c).
    const validBoundary = proposalSettings({
      duration: 31_535_999n,
      participation: 0n,
      approval: 100_000n,
      minimumApprovals: 0n,
    })
    await guild.send.setProposalSettings({
      args: { actionType: ACTION_LOCK_PLUGIN_SET, settings: validBoundary },
      maxFee: MAX_APP_CALL_FEE,
      coverAppCallInnerTransactionFees: true,
    })

    const invalidSettings = [
      proposalSettings({ duration: 0n }),
      proposalSettings({ duration: 31_536_000n }),
      proposalSettings({ duration: 31_536_001n }),
      proposalSettings({ participation: 1n }),
      proposalSettings({ participation: 100_001n }),
      proposalSettings({ approval: 100_001n }),
      proposalSettings({ approval: 0n, minimumApprovals: 0n }),
    ]
    for (const settings of invalidSettings) {
      await expect(
        guild.send.setProposalSettings({ args: { actionType: ACTION_LOCK_PLUGIN_SET, settings }, maxFee: MAX_APP_CALL_FEE, coverAppCallInnerTransactionFees: true }),
      ).rejects.toThrow('ERR:errGset')
    }
    await expect(
      guild.send.setProposalSettings({ args: { actionType: 255, settings: proposalSettings() }, maxFee: MAX_APP_CALL_FEE, coverAppCallInnerTransactionFees: true }),
    ).rejects.toThrow('ERR:errGacn')
  }, 120_000)

  test('aggregates mixed-action costs using the strictest value of every independent requirement', async () => {
    const outsider = await fixture.context.generateAccount({ initialFunds: microAlgo(3_000_000n) })
    const { guild } = await mintGuild(environment, FIXED_SIGNERS, encodeAbi('(uint64)', [1n]))
    const updateSettings = proposalSettings({
      fee: 7n,
      power: 2n,
      duration: 9n,
      participation: 10_000n,
      approval: 70_000n,
      minimumApprovals: 2n,
    })
    const executionSettings = proposalSettings({
      fee: 11n,
      power: 5n,
      duration: 4n,
      participation: 40_000n,
      approval: 55_000n,
      minimumApprovals: 4n,
    })
    await guild.send.setProposalSettings({
      args: { actionType: ACTION_LOCK_PLUGIN_SET, settings: updateSettings },
      maxFee: MAX_APP_CALL_FEE,
      coverAppCallInnerTransactionFees: true,
    })
    await guild.send.setProposalSettings({
      args: { actionType: ACTION_REMOVE_EXECUTION, settings: executionSettings },
      maxFee: MAX_APP_CALL_FEE,
      coverAppCallInnerTransactionFees: true,
    })

    const lease = new Uint8Array(32)
    lease[0] = 1
    const actions = [action(ACTION_LOCK_PLUGIN_SET), removeExecutionAction(lease)]
    const draftCost = await proposalCost(guild, actions)
    expect(draftCost.total).toBe(0n)
    expect(draftCost.fee).toBe(0n)
    expect(draftCost.mbr).toBeGreaterThan(0n)

    const outsiderGuild = guild.clone({ defaultSender: outsider.addr, defaultSigner: outsider.signer })
    const cost = await proposalCost(outsiderGuild, actions)
    expect(cost).toMatchObject({
      fee: 18n,
      power: 5n,
      duration: 9n,
      participation: 40_000n,
      approval: 70_000n,
      minimumApprovals: 4n,
    })
    expect(cost.total).toBe(cost.mbr + 18n)
    expect(
      await guild.voteMbr({
        args: {},
        staticFee: MAX_APP_CALL_FEE,
      }),
    ).toBe(VOTE_MBR)

    const missingLease = new Uint8Array(32)
    missingLease[0] = 2
    await expect(guild.mustGetExecution({ args: { lease: missingLease } })).rejects.toThrow('ERR:errGacn')
  }, 120_000)

  test('requires exact proposal funding and only the exact positive edit delta', async () => {
    const { guild } = await mintLockedGuild(environment)
    await guild.send.partiallyInitialize({
      args: {},
      maxFee: MAX_APP_CALL_FEE,
      coverAppCallInnerTransactionFees: true,
    })

    const initialActions = [setLimitAction(2n)]
    const initialCost = await proposalCost(guild, initialActions)
    await expectContractError(newProposalWithAmount(guild, initialActions, initialCost.total - 1n), 'ERR:errGpay')
    await expectContractError(newProposalWithAmount(guild, initialActions, initialCost.total + 1n), 'ERR:errGpay')
    expect((await guild.state.global.getAll()).proposalId).toBe(1n)

    const created = await newProposalWithAmount(guild, initialActions, initialCost.total)
    const proposalId = created.returns[5]!
    const expandedActions = [setLimitAction(3n), action(ACTION_LOCK_PLUGIN_SET)]
    const expandedCost = await proposalCost(guild, expandedActions)
    expect(expandedCost.total).toBeGreaterThan(initialCost.total)

    const unfundedEdit = guild
        .newGroup()
        .opUp({ args: {}, note: 'unfunded-edit-opup-1', maxFee: MAX_APP_CALL_FEE })
        .opUp({ args: {}, note: 'unfunded-edit-opup-2', maxFee: MAX_APP_CALL_FEE })
        .opUp({ args: {}, note: 'unfunded-edit-opup-3', maxFee: MAX_APP_CALL_FEE })
        .opUp({ args: {}, note: 'unfunded-edit-opup-4', maxFee: MAX_APP_CALL_FEE })
        .opUp({ args: {}, note: 'unfunded-edit-opup-5', maxFee: MAX_APP_CALL_FEE })
        .editProposal({
          args: { id: proposalId, cid: ZERO_CID, actions: expandedActions, evidence: EMPTY_EVIDENCE },
          maxFee: MAX_APP_CALL_FEE,
        })
        .send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true })
    await expect(unfundedEdit).rejects.toThrow()

    const editWithAmount = async (amount: bigint, actions = expandedActions) => {
      const payment = await environment.algorand.createTransaction.payment({
        sender: environment.creator.addr,
        signer: environment.creator.signer,
        receiver: guild.appAddress,
        amount: microAlgo(amount),
      })
      return guild
        .newGroup()
        .opUp({ args: {}, note: `paid-edit-${amount}-opup-1`, maxFee: MAX_APP_CALL_FEE })
        .opUp({ args: {}, note: `paid-edit-${amount}-opup-2`, maxFee: MAX_APP_CALL_FEE })
        .opUp({ args: {}, note: `paid-edit-${amount}-opup-3`, maxFee: MAX_APP_CALL_FEE })
        .opUp({ args: {}, note: `paid-edit-${amount}-opup-4`, maxFee: MAX_APP_CALL_FEE })
        .opUp({ args: {}, note: `paid-edit-${amount}-opup-5`, maxFee: MAX_APP_CALL_FEE })
        .editProposalWithPayment({
          args: { payment, id: proposalId, cid: ZERO_CID, actions, evidence: EMPTY_EVIDENCE },
          maxFee: MAX_APP_CALL_FEE,
        })
        .send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true })
    }
    const delta = expandedCost.total - initialCost.total
    await expect(editWithAmount(delta - 1n)).rejects.toThrow()
    const unchanged = await guild.getProposal({ args: { proposalId } })
    expect(unchanged.feesPaid).toBe(initialCost.total)
    expect(unchanged.actions).toHaveLength(1)
    await editWithAmount(delta)
    const edited = await guild.getProposal({ args: { proposalId } })
    expect(edited.feesPaid).toBe(expandedCost.total)
    expect(edited.actions).toHaveLength(2)
    await expect(editWithAmount(0n)).rejects.toThrow()
    expect((await guild.getProposal({ args: { proposalId } })).feesPaid).toBe(expandedCost.total)
  }, 180_000)

  test('rejects malformed and duplicate votes and reclaims every consensus receipt exactly once', async () => {
    const outsider = await fixture.context.generateAccount({ initialFunds: microAlgo(3_000_000n) })
    const { guild } = await mintLockedGuild(environment)
    await guild.send.partiallyInitialize({
      args: {},
      maxFee: MAX_APP_CALL_FEE,
      coverAppCallInnerTransactionFees: true,
    })
    const proposalId = await createProposal(environment, guild, [action(ACTION_LOCK_PLUGIN_SET)])
    await guild.send.submitProposal({
      args: { proposalId, evidence: EMPTY_EVIDENCE },
      maxFee: MAX_APP_CALL_FEE,
      coverAppCallInnerTransactionFees: true,
    })

    const voteWith = async (choice: number, amount: bigint) => {
      const payment = await environment.algorand.createTransaction.payment({
        sender: environment.creator.addr,
        signer: environment.creator.signer,
        receiver: guild.appAddress,
        amount: microAlgo(amount),
      })
      return guild
        .newGroup()
        .opUp({ args: {}, maxFee: MAX_APP_CALL_FEE })
        .voteProposal({
          args: { mbrPayment: payment, proposalId, vote: choice, evidence: EMPTY_EVIDENCE },
          maxFee: MAX_APP_CALL_FEE,
        })
        .send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true })
    }
    const getBallot = async () => {
      const result = await guild
        .newGroup()
        .getBallot({ args: { proposalId }, maxFee: MAX_APP_CALL_FEE })
        .send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true })
      return result.returns[0]!
    }
    await expectContractError(voteWith(APPROVE, VOTE_MBR - 1n), 'ERR:errGpay')
    await expectContractError(voteWith(99, VOTE_MBR), 'ERR:errGvot')
    await voteWith(APPROVE, VOTE_MBR)
    const cast = (await getBallot()).votes
    // changing a vote reuses the receipt, so paying for a new one is refused and the change itself is free
    expect(await guild.voteCost({ args: { proposalId, voter: environment.creator.addr.toString() }, staticFee: MAX_APP_CALL_FEE })).toBe(0n)
    await expectContractError(voteWith(REJECT, VOTE_MBR), 'ERR:errGpay')
    await voteWith(REJECT, 0n)
    // the same power moves from approvals to rejections
    expect((await getBallot()).votes).toMatchObject({ approvals: 0n, rejections: cast.approvals })
    await voteWith(APPROVE, 0n)
    expect((await getBallot()).voteCount).toBe(1n)

    await endVoting(timeWarp)
    await guild.send.finalizeProposal({
      args: { proposalId },
      maxFee: MAX_APP_CALL_FEE,
      coverAppCallInnerTransactionFees: true,
    })
    // Approved ballots stay until the proposal executes or is cancelled.
    await executeProposal(guild, proposalId)
    const partialCleanup = await guild.send.cleanupProposalConsensus({
      args: { proposalId, voters: [] },
      maxFee: MAX_APP_CALL_FEE,
      coverAppCallInnerTransactionFees: true,
      populateAppCallResources: true,
    })
    expect(partialCleanup.return).toBe(1n)
    await expectContractError(
      guild.send.cleanupProposalConsensus({
        args: { proposalId, voters: [outsider.addr.toString()] },
        maxFee: MAX_APP_CALL_FEE,
        coverAppCallInnerTransactionFees: true,
        populateAppCallResources: true,
      }),
      'ERR:errGvmg',
    )
    const finalCleanup = await guild.send.cleanupProposalConsensus({
      args: { proposalId, voters: [environment.creator.addr.toString()] },
      maxFee: MAX_APP_CALL_FEE,
      coverAppCallInnerTransactionFees: true,
      populateAppCallResources: true,
    })
    expect(finalCleanup.return).toBe(0n)
    await expectContractError(getBallot(), 'ERR:errGprp')
  }, 180_000)
})

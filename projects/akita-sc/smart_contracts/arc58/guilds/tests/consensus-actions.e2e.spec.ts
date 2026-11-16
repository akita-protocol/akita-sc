import { microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { TimeWarp } from '../../../../tests/utils/time'
import { FixedSignerGuildConsensusClient } from '../../../artifacts/arc58/guilds/consensus/fixed-signers/FixedSignerGuildConsensusClient'
import { SubscriptionGuildConsensusClient } from '../../../artifacts/arc58/guilds/consensus/subscriptions/SubscriptionGuildConsensusClient'
import type { GuildClient } from '../../../artifacts/arc58/guilds/core/GuildClient'
import {
  APPROVE,
  approveAndExecute,
  balanceOf,
  BALLOT_MBR,
  cancelProposal,
  cleanupProposal,
  consensusAction,
  consensusData,
  CONSENSUS_ACTION_SETTINGS_MBR,
  createProposal,
  deployGuildTestEnvironment,
  deployMockSubscriptions,
  encodeAbi,
  endVoting,
  expectContractError,
  finalizeProposal,
  FIXED_SIGNER_ACTION,
  FIXED_SIGNER_SNAPSHOT_MBR,
  FIXED_SIGNERS,
  fixedSigner,
  fixedSignerConfig,
  fixedSignerConfiguration,
  latestTimestamp,
  MAX_APP_CALL_FEE,
  minBalanceOf,
  mintGuild,
  proposalCostOf,
  proposalSettings,
  setConsensusActionSettingsAction,
  submitProposal,
  subscription,
  SUBSCRIPTION_ACTION,
  executeProposal,
  MOCK_SERVICE_COST,
  SUBSCRIPTION_HISTORY_MBR,
  SUBSCRIPTION_OFFERING_MBR,
  SUBSCRIPTION_WEIGHT_SLOT_MBR,
  SUBSCRIPTION_WEIGHTS_BOX_MBR,
  subscriptionConfig,
  subscriptionConfiguration,
  subscriptionEvidence,
  SUBSCRIPTIONS,
  vote,
  type GuildTestEnvironment,
  PROPOSAL_MBR,
} from './test-helpers'

const fixture = algorandFixture()
let environment: GuildTestEnvironment
let timeWarp: TimeWarp
const send = { maxFee: MAX_APP_CALL_FEE, coverAppCallInnerTransactionFees: true, populateAppCallResources: true }

/** Govern one proposal and immediately reclaim its ballot so consensus balances reflect only policy storage. */
const governAndCleanup = async (
  guild: GuildClient,
  actions: Parameters<typeof approveAndExecute>[3],
  options: Parameters<typeof approveAndExecute>[4] = {},
) => {
  const proposalId = await approveAndExecute(environment, timeWarp, guild, actions, options)
  const voters = (options.voters ?? [environment.creator]).map((voter) => voter.addr.toString())
  expect(await cleanupProposal(guild, proposalId, voters)).toBe(0n)
  return proposalId
}

/** Every microALGO above the Guild's own storage must be a proposer reserve; nothing may be stranded. */
const expectNoStrandedBalance = async (guild: GuildClient) => {
  const balance = await balanceOf(environment, guild.appAddress)
  const minimum = await minBalanceOf(environment, guild.appAddress)
  expect(balance - minimum).toBe((await guild.state.global.reserved()) ?? 0n)
}

describe('Guild consensus actions', () => {
  beforeAll(fixture.newScope, 120_000)
  beforeAll(async () => {
    environment = await deployGuildTestEnvironment(fixture.context.algorand, fixture.context.testAccount)
    timeWarp = new TimeWarp(environment.algorand)
  }, 180_000)
  afterAll(async () => timeWarp?.resetTimeWarp())

  test('governs fixed-signer administration with per-code settings that fall back to updateGuild', async () => {
    const member2 = await fixture.context.generateAccount({ initialFunds: microAlgo(5_000_000n) })
    const outsider = await fixture.context.generateAccount({ initialFunds: microAlgo(3_000_000n) })
    const creator = environment.creator.addr.toString()
    const { guild, deployment } = await mintGuild(environment, FIXED_SIGNERS, fixedSignerConfig(1n))
    const mbrPayment = await environment.algorand.createTransaction.payment({
      sender: environment.creator.addr,
      signer: environment.creator.signer,
      receiver: guild.appAddress,
      amount: microAlgo(59_900n),
    })
    await guild.send.configureConsensus({
      args: { mbrPayment, config: fixedSignerConfiguration(2, [[creator, 3n], [member2.addr.toString(), 2n]]) },
      ...send,
    })

    // The kernel never interprets codes; it only validates settings with the policy and stores them per code.
    const strict = proposalSettings({ minimumApprovals: 5n })
    await guild.appClient.fundAppAccount({ amount: microAlgo(CONSENSUS_ACTION_SETTINGS_MBR) })
    await guild.send.setConsensusActionSettings({
      args: { code: BigInt(FIXED_SIGNER_ACTION.SetThreshold), settings: strict },
      ...send,
    })
    await expectContractError(
      guild.send.setConsensusActionSettings({
        args: { code: BigInt(FIXED_SIGNER_ACTION.SetThreshold), settings: proposalSettings({ minimumApprovals: 6n }) },
        ...send,
      }),
      'ERR:errGset',
    )
    await guild.send.partiallyInitialize({ args: {}, ...send })
    expect((await guild.getConsensusActionSettings({ args: { code: BigInt(FIXED_SIGNER_ACTION.SetThreshold) } })).minimumApprovals).toBe(5n)
    expect((await guild.getConsensusActionSettings({ args: { code: BigInt(FIXED_SIGNER_ACTION.RemoveMember) } })).minimumApprovals).toBe(1n)
    await expectNoStrandedBalance(guild)

    const consensus = new FixedSignerGuildConsensusClient({
      algorand: environment.algorand,
      appId: deployment.consensus,
      defaultSender: environment.creator.addr,
      defaultSigner: environment.creator.signer,
    })

    // A threshold change carries the strict per-code requirement: one signer's approval is not enough.
    const thresholdAction = consensusAction(fixedSigner.setThreshold(2n))
    const cost = await proposalCostOf(guild, [thresholdAction])
    expect(cost.minimumApprovals).toBe(5n)
    expect(cost.mbr).toBe(PROPOSAL_MBR + 400n * (7n + BigInt(thresholdAction[1].length)) + BALLOT_MBR + FIXED_SIGNER_SNAPSHOT_MBR)
    const lonely = await createProposal(environment, guild, [thresholdAction])
    await submitProposal(guild, lonely)
    await vote(environment, guild, environment.creator, lonely, APPROVE)
    await endVoting(timeWarp)
    await finalizeProposal(guild, lonely)
    expect((await guild.getProposal({ args: { proposalId: lonely } })).status).toBe(30)
    await governAndCleanup(guild, [thresholdAction], { voters: [environment.creator, member2] })
    expect((await consensus.state.global.getAll()).threshold).toBe(2n)
    await expectNoStrandedBalance(guild)

    // Governance registers per-code settings and pays that storage exactly once.
    const register = setConsensusActionSettingsAction(FIXED_SIGNER_ACTION.LockMembership, proposalSettings({ approval: 100_000n }))
    const firstQuote = await proposalCostOf(guild, [register])
    await governAndCleanup(guild, [register])
    const secondQuote = await proposalCostOf(guild, [register])
    expect(firstQuote.mbr - secondQuote.mbr).toBe(CONSENSUS_ACTION_SETTINGS_MBR)
    expect((await guild.getConsensusActionSettings({ args: { code: BigInt(FIXED_SIGNER_ACTION.LockMembership) } })).approval).toBe(100_000n)
    await expectNoStrandedBalance(guild)

    // Membership administration flows through the same opaque route, including storage refunds.
    await governAndCleanup(guild, [consensusAction(fixedSigner.setMemberWeight(member2.addr.toString(), 3n))])
    expect((await consensus.state.global.getAll()).eligiblePower).toBe(6n)
    await governAndCleanup(guild, [consensusAction(fixedSigner.removeMember(member2.addr.toString()))])
    expect((await consensus.state.global.getAll()).memberCount).toBe(1n)
    await expectNoStrandedBalance(guild)
    // Re-adding reuses the vacated weight slot; the policy refunds the reserve and the Guild forwards it.
    const consensusBefore = await balanceOf(environment, consensus.appAddress)
    await governAndCleanup(guild, [consensusAction(fixedSigner.addMembers(2, [[member2.addr.toString(), 2n]]))])
    expect((await balanceOf(environment, consensus.appAddress)) - consensusBefore).toBe(25_300n)
    await expectNoStrandedBalance(guild)
    expect(await consensus.proposalPower({ args: { account: member2.addr.toString(), evidence: new Uint8Array(), requiredThrough: 0n } })).toBe(2n)

    await governAndCleanup(guild, [consensusAction(fixedSigner.lockMembership())], {
      voters: [environment.creator, member2],
    })
    expect((await consensus.state.global.getAll()).membershipLocked).toBe(1n)
    await expectContractError(
      createProposal(environment, guild, [consensusAction(fixedSigner.addMembers(2, [[outsider.addr.toString(), 1n]]))]),
      'ERR:errGmlk',
    )
    await expectContractError(createProposal(environment, guild, [consensusAction(consensusData(99))]), 'ERR:errGcac')
    const directPayment = await environment.algorand.createTransaction.payment({
      sender: environment.creator.addr,
      signer: environment.creator.signer,
      receiver: consensus.appAddress,
      amount: microAlgo(0n),
    })
    await expectContractError(
      consensus.send.applyConsensusAction({
        args: { mbrPayment: directPayment, proposalId: lonely, data: fixedSigner.setThreshold(1n) },
        ...send,
      }),
      'ERR:errGprp',
    )
  }, 600_000)

  test('governs owned subscription offerings and a self-bounded approval floor through the Guild', async () => {
    const subscriptions = await deployMockSubscriptions(environment)
    const owner = environment.creator.addr.toString()
    const { guild, deployment } = await mintGuild(environment, SUBSCRIPTIONS, subscriptionConfig(subscriptions.appId, 1n))
    const consensus = new SubscriptionGuildConsensusClient({
      algorand: environment.algorand,
      appId: deployment.consensus,
      defaultSender: environment.creator.addr,
      defaultSigner: environment.creator.signer,
    })
    const mbrPayment = await environment.algorand.createTransaction.payment({
      sender: environment.creator.addr,
      signer: environment.creator.signer,
      receiver: guild.appAddress,
      amount: microAlgo(MOCK_SERVICE_COST + SUBSCRIPTION_OFFERING_MBR + SUBSCRIPTION_WEIGHT_SLOT_MBR + SUBSCRIPTION_WEIGHTS_BOX_MBR),
    })
    await guild.send.configureConsensus({ args: { mbrPayment, config: subscriptionConfiguration([{ weight: 3n }]) }, ...send })
    // The policy owns the service it created, and the service pays out to the Guild itself.
    expect((await subscriptions.getService({ args: { address: consensus.appAddress.toString(), id: 1n } })).payoutAddress).toBe(
      guild.appAddress.toString(),
    )
    await guild.send.partiallyInitialize({ args: {}, ...send })
    const now = await latestTimestamp(environment.algorand)
    await subscriptions.send.setSubscription({
      args: {
        account: owner,
        id: 101n,
        recipient: consensus.appAddress.toString(),
        serviceId: 1n,
        interval: 100_000n,
        lastPayment: now,
      },
    })
    const evidence = subscriptionEvidence(101n)
    const govern = (actions: Parameters<typeof approveAndExecute>[3]) =>
      governAndCleanup(guild, actions, { evidence })

    const consensusBefore = await balanceOf(environment, consensus.appAddress)
    await govern([consensusAction(subscription.addOfferings([{ weight: 5n }]))])
    expect((await consensus.state.global.getAll()).offeringCount).toBe(2n)
    expect((await balanceOf(environment, consensus.appAddress)) - consensusBefore).toBe(SUBSCRIPTION_OFFERING_MBR + SUBSCRIPTION_WEIGHT_SLOT_MBR)
    await expectNoStrandedBalance(guild)

    await govern([consensusAction(subscription.setOfferingWeight(2n, 6n))])
    expect((await consensus.state.box.offerings.value(2n))?.weight).toBe(6n)
    expect((await balanceOf(environment, consensus.appAddress)) - consensusBefore).toBe(
      SUBSCRIPTION_OFFERING_MBR + SUBSCRIPTION_WEIGHT_SLOT_MBR + SUBSCRIPTION_HISTORY_MBR,
    )

    await govern([consensusAction(subscription.removeOffering(2n))])
    expect((await consensus.state.global.getAll()).offeringCount).toBe(1n)
    expect((await subscriptions.getService({ args: { address: consensus.appAddress.toString(), id: 2n } })).status).toBe(40)
    expect((await balanceOf(environment, consensus.appAddress)) - consensusBefore).toBe(2n * SUBSCRIPTION_HISTORY_MBR + SUBSCRIPTION_WEIGHT_SLOT_MBR)
    await expectNoStrandedBalance(guild)

    // The last offering is the only way to gain voting weight, so it can never be removed.
    await expectContractError(
      createProposal(environment, guild, [consensusAction(subscription.removeOffering(1n))], evidence),
      'ERR:errGlko',
    )

    // The floor may rise to what the approving ballot demonstrated (3), but never beyond it.
    await govern([consensusAction(subscription.setMinimumApprovals(3n))])
    expect((await consensus.state.global.getAll()).minimumApprovals).toBe(3n)
    expect((await guild.getConsensusActionSettings({ args: { code: BigInt(SUBSCRIPTION_ACTION.SetMinimumApprovals) } })).minimumApprovals).toBe(1n)
    const tooHigh = await createProposal(environment, guild, [consensusAction(subscription.setMinimumApprovals(4n))], evidence)
    await submitProposal(guild, tooHigh, evidence)
    await vote(environment, guild, environment.creator, tooHigh, APPROVE, evidence)
    await endVoting(timeWarp)
    await finalizeProposal(guild, tooHigh)
    await expectContractError(executeProposal(guild, tooHigh), 'ERR:errGlko')
    await cancelProposal(guild, tooHigh)
    expect((await guild.getProposal({ args: { proposalId: tooHigh } })).status).toBe(10)
    expect(await cleanupProposal(guild, tooHigh, [owner])).toBe(0n)
    expect((await consensus.state.global.getAll()).minimumApprovals).toBe(3n)
    await expectNoStrandedBalance(guild)
  }, 600_000)
})

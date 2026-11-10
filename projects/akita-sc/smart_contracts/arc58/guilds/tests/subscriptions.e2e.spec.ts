import { microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { TimeWarp } from '../../../../tests/utils/time'
import { SubscriptionGuildConsensusClient } from '../../../artifacts/arc58/guilds/consensus/subscriptions/SubscriptionGuildConsensusClient'
import {
  APPROVE,
  balanceOf,
  consensusData,
  deployGuildTestEnvironment,
  deployMockSubscriptions,
  deploySubscriptionConsensus,
  endVoting,
  expectContractError,
  latestTimestamp,
  MAX_APP_CALL_FEE,
  mintGuild,
  MOCK_SERVICE_COST,
  proposalSettings,
  REJECT,
  subscription,
  subscriptionConfig,
  subscriptionConfiguration,
  subscriptionEvidence,
  SUBSCRIPTIONS,
  SUBSCRIPTION_HISTORY_MBR,
  SUBSCRIPTION_OFFERING_MBR,
  SUBSCRIPTION_WEIGHT_SLOT_MBR,
  SUBSCRIPTION_WEIGHTS_BOX_MBR,
  VOTING_DURATION,
  type GuildTestEnvironment,
} from './test-helpers'

const fixture = algorandFixture()
let environment: GuildTestEnvironment
let timeWarp: TimeWarp
const send = { maxFee: MAX_APP_CALL_FEE, coverAppCallInnerTransactionFees: true, populateAppCallResources: true }
/** Service, offering box, weight slot, and the slot box itself for a policy's first offering. */
const FIRST_OFFERING_COST = MOCK_SERVICE_COST + SUBSCRIPTION_OFFERING_MBR + SUBSCRIPTION_WEIGHT_SLOT_MBR + SUBSCRIPTION_WEIGHTS_BOX_MBR

type MockSubscriptions = Awaited<ReturnType<typeof deployMockSubscriptions>>

/** Record a subscription paid to `recipient` for `serviceId`, paid through `interval` seconds from now. */
const subscribe = async (
  subscriptions: MockSubscriptions,
  account: string,
  id: bigint,
  recipient: string,
  serviceId: bigint,
  interval = 100n,
) =>
  subscriptions.send.setSubscription({
    args: { account, id, recipient, serviceId, interval, lastPayment: await latestTimestamp(environment.algorand) },
  })

describe('Subscription Guild consensus', () => {
  beforeAll(fixture.newScope, 120_000)
  beforeAll(async () => {
    environment = await deployGuildTestEnvironment(fixture.context.algorand, fixture.context.testAccount)
    timeWarp = new TimeWarp(environment.algorand)
  }, 180_000)
  afterAll(async () => timeWarp?.resetTimeWarp())

  test('creates owned services during draft, activates, and rejects percentage participation', async () => {
    const subscriptions = await deployMockSubscriptions(environment)
    const owner = environment.creator.addr.toString()
    const governanceConfig = subscriptionConfig(subscriptions.appId, 2n)
    const { guild, deployment } = await mintGuild(environment, SUBSCRIPTIONS, governanceConfig)
    const consensus = new SubscriptionGuildConsensusClient({
      algorand: environment.algorand,
      appId: deployment.consensus,
      defaultSender: environment.creator.addr,
      defaultSigner: environment.creator.signer,
    })
    const config = subscriptionConfiguration([{ weight: 3n }])
    expect(await guild.consensusConfigurationMbr({ args: { config }, staticFee: MAX_APP_CALL_FEE })).toBe(FIRST_OFFERING_COST)
    const mbrPayment = await environment.algorand.createTransaction.payment({
      sender: environment.creator.addr,
      signer: environment.creator.signer,
      receiver: guild.appAddress,
      amount: microAlgo(FIRST_OFFERING_COST),
    })
    await guild.send.configureConsensus({ args: { mbrPayment, config }, ...send })
    const service = await subscriptions.getService({ args: { address: consensus.appAddress.toString(), id: 1n } })
    expect(service.status).toBe(20)
    expect(service.payoutAddress).toBe(guild.appAddress.toString())
    await guild.send.partiallyInitialize({ args: {}, ...send })

    await subscribe(subscriptions, owner, 101n, consensus.appAddress.toString(), 1n)
    const now = await latestTimestamp(environment.algorand)
    expect(
      (
        await consensus.send.proposalPower({
          args: { account: owner, evidence: subscriptionEvidence(101n), requiredThrough: now + VOTING_DURATION },
          ...send,
        })
      ).return,
    ).toBe(3n)

    await expectContractError(
      mintGuild(environment, SUBSCRIPTIONS, governanceConfig, proposalSettings({ participation: 1n })),
      'ERR:errGset',
    )
  }, 180_000)

  test('freezes offering weights per ballot so offerings may change while ballots are open', async () => {
    const voter2 = await fixture.context.generateAccount({ initialFunds: microAlgo(3_000_000n) })
    const outsider = await fixture.context.generateAccount({ initialFunds: microAlgo(3_000_000n) })
    const subscriptions = await deployMockSubscriptions(environment)
    const owner = environment.creator.addr.toString()

    const { host, consensus } = await deploySubscriptionConsensus(environment, subscriptions.appId, 4n)
    const policy = consensus.appAddress.toString()
    await host.send.consensusAction({
      args: { proposalId: 0n, data: subscription.addOfferings([{ weight: 3n }, { weight: 5n }]) },
      ...send,
    })
    await host.send.validateActivation({ args: {}, ...send })
    await subscribe(subscriptions, owner, 101n, policy, 1n)
    await subscribe(subscriptions, voter2.addr.toString(), 102n, policy, 2n)
    // A subscription paid to anyone other than this policy's own service grants nothing.
    await subscribe(subscriptions, outsider.addr.toString(), 103n, owner, 1n)

    const now = await latestTimestamp(environment.algorand)
    const power = async (account: string, subscriptionId: bigint, requiredThrough: bigint) =>
      (
        await host.send.proposalPower({
          args: { account, evidence: subscriptionEvidence(subscriptionId), requiredThrough },
          ...send,
        })
      ).return
    expect(await power(owner, 101n, now + VOTING_DURATION)).toBe(3n)
    expect(await power(outsider.addr.toString(), 103n, now + VOTING_DURATION)).toBe(0n)
    expect(await power(owner, 999n, now + VOTING_DURATION)).toBe(0n)
    // Power needs the subscription paid up now; it no longer depends on the ballot deadline (G-1).
    expect(await power(owner, 101n, now + 1_000_000n)).toBe(3n)

    await expectContractError(
      host.send.openProposal({
        args: {
          proposalId: 1n,
          votingEnd: now + VOTING_DURATION,
          requirements: { participation: 1n, approval: 50_000n, minimumApprovals: 0n },
        },
        ...send,
      }),
      'ERR:errGset',
    )
    await host.send.openProposal({
      args: {
        proposalId: 1n,
        votingEnd: now + VOTING_DURATION,
        requirements: { participation: 0n, approval: 60_000n, minimumApprovals: 0n },
      },
      ...send,
    })

    // Offering changes are versioned, so they no longer wait for open ballots to close.
    await host.send.consensusAction({ args: { proposalId: 0n, data: subscription.setOfferingWeight(1n, 9n) }, ...send })
    await host.send.consensusAction({ args: { proposalId: 0n, data: subscription.removeOffering(2n) }, ...send })
    expect((await consensus.state.global.getAll()).offeringCount).toBe(1n)

    const cast = (voter: string, evidence: Uint8Array, choice = APPROVE) =>
      host.send.vote({ args: { voter, proposalId: 1n, vote: choice, evidence }, ...send })
    // The open ballot still weighs each offering as it was when the ballot opened; changed offerings need `since`.
    await expectContractError(cast(owner, subscriptionEvidence(101n)), 'ERR:errGpwr')
    expect(await consensus.subscriberPowerAt({ args: { account: owner, proposalId: 1n, evidence: subscriptionEvidence(101n, 1n) }, staticFee: MAX_APP_CALL_FEE })).toBe(3n)
    await cast(owner, subscriptionEvidence(101n, 1n))
    await cast(voter2.addr.toString(), subscriptionEvidence(102n, 2n))
    await expectContractError(cast(outsider.addr.toString(), subscriptionEvidence(103n), REJECT), 'ERR:errGpwr')
    // a repeat vote replaces the earlier one: the approvals below do not double
    await cast(voter2.addr.toString(), subscriptionEvidence(102n, 2n))
    const ballot = await consensus.getBallot({ args: { proposalId: 1n } })
    expect(ballot.eligiblePower).toBe(0n)
    expect(ballot.requirements).toEqual({ participation: 0n, approval: 60_000n, minimumApprovals: 4n })
    expect(ballot.votes.approvals).toBe(8n)
    // no eligible-power snapshot (eligiblePower 0): the remaining power is unknown, so no early close
    await expectContractError(host.send.resolveProposal({ args: { proposalId: 1n }, ...send }), 'ERR:errGopn')
    await endVoting(timeWarp)
    expect((await host.send.resolveProposal({ args: { proposalId: 1n }, ...send })).return).toEqual({
      approved: true,
      approvals: 8n,
      rejections: 0n,
      abstains: 0n,
      eligiblePower: 0n,
    })

    // Once active, the approval floor may not exceed what the approving ballot demonstrated.
    await expectContractError(
      host.send.consensusAction({ args: { proposalId: 1n, data: subscription.setMinimumApprovals(9n) }, ...send }),
      'ERR:errGlko',
    )
    await host.send.consensusAction({ args: { proposalId: 1n, data: subscription.setMinimumApprovals(8n) }, ...send })
    expect((await consensus.state.global.getAll()).minimumApprovals).toBe(8n)

    // Ballots opened after a change use the new weight with plain evidence.
    await subscribe(subscriptions, owner, 101n, policy, 1n, 1_000n)
    const later = await latestTimestamp(environment.algorand)
    await host.send.openProposal({
      args: {
        proposalId: 2n,
        votingEnd: later + VOTING_DURATION,
        requirements: { participation: 0n, approval: 50_000n, minimumApprovals: 0n },
      },
      ...send,
    })
    expect(await consensus.subscriberPowerAt({ args: { account: owner, proposalId: 2n, evidence: subscriptionEvidence(101n) }, staticFee: MAX_APP_CALL_FEE })).toBe(9n)
  }, 180_000)

  test('rejects a vote that would overflow aggregate power while leaving the ballot resolvable', async () => {
    const voter2 = await fixture.context.generateAccount({ initialFunds: microAlgo(3_000_000n) })
    const subscriptions = await deployMockSubscriptions(environment)
    const owner = environment.creator.addr.toString()

    const { host, consensus } = await deploySubscriptionConsensus(environment, subscriptions.appId, 1n)
    await host.send.consensusAction({
      args: { proposalId: 0n, data: subscription.addOfferings([{ weight: 18_446_744_073_709_551_615n }, { weight: 1n }]) },
      ...send,
    })
    await host.send.validateActivation({ args: {}, ...send })
    await subscribe(subscriptions, owner, 101n, consensus.appAddress.toString(), 1n)
    await subscribe(subscriptions, voter2.addr.toString(), 102n, consensus.appAddress.toString(), 2n)
    const now = await latestTimestamp(environment.algorand)
    await host.send.openProposal({
      args: {
        proposalId: 1n,
        votingEnd: now + VOTING_DURATION,
        requirements: { participation: 0n, approval: 50_000n, minimumApprovals: 0n },
      },
      ...send,
    })
    await host.send.vote({
      args: { voter: owner, proposalId: 1n, vote: APPROVE, evidence: subscriptionEvidence(101n) },
      ...send,
    })
    await expectContractError(
      host.send.vote({
        args: { voter: voter2.addr.toString(), proposalId: 1n, vote: REJECT, evidence: subscriptionEvidence(102n) },
        ...send,
      }),
      'ERR:errGwgt',
    )
    expect((await consensus.getBallot({ args: { proposalId: 1n } })).votes.approvals).toBe(18_446_744_073_709_551_615n)
    await endVoting(timeWarp)
    expect((await host.send.resolveProposal({ args: { proposalId: 1n }, ...send })).return!.approved).toBe(true)
  }, 180_000)

  test('validates offering administration, never removes the last offering, and blocks external callers', async () => {
    const subscriptions = await deployMockSubscriptions(environment)
    const { host, consensus } = await deploySubscriptionConsensus(environment, subscriptions.appId, 1n)
    const apply = (data: Uint8Array) => host.send.consensusAction({ args: { proposalId: 0n, data }, ...send })

    await expectContractError(host.send.validateActivation({ args: {}, ...send }), 'ERR:errGsub')
    await expectContractError(apply(subscription.addOfferings([])), 'ERR:errGsub')
    await expectContractError(apply(subscription.addOfferings([{ weight: 0n }])), 'ERR:errGwgt')
    await apply(subscription.addOfferings([{ weight: 2n }]))
    await expectContractError(apply(subscription.setOfferingWeight(1n, 0n)), 'ERR:errGwgt')
    await expectContractError(apply(subscription.setOfferingWeight(99n, 1n)), 'ERR:errGomi')
    await expectContractError(apply(subscription.removeOffering(99n)), 'ERR:errGomi')
    await expectContractError(apply(subscription.removeOffering(1n)), 'ERR:errGlko')
    await expectContractError(apply(subscription.setMinimumApprovals(0n)), 'ERR:errGsub')
    await expectContractError(apply(consensusData(99)), 'ERR:errGcac')
    await expectContractError(apply(new Uint8Array()), 'ERR:errGcac')

    const directPayment = await environment.algorand.createTransaction.payment({
      sender: environment.creator.addr,
      signer: environment.creator.signer,
      receiver: consensus.appAddress,
      amount: microAlgo(0n),
    })
    await expectContractError(
      consensus.send.applyConsensusAction({
        args: { mbrPayment: directPayment, proposalId: 0n, data: subscription.setOfferingWeight(1n, 3n) },
        ...send,
      }),
      'ERR:errGprp',
    )
    // Quotes are readable by anyone so clients can price a proposal before creating it.
    expect(await consensus.consensusActionMbr({ args: { data: subscription.addOfferings([{ weight: 1n }]) }, staticFee: MAX_APP_CALL_FEE })).toBe(
      MOCK_SERVICE_COST + SUBSCRIPTION_OFFERING_MBR + SUBSCRIPTION_WEIGHT_SLOT_MBR,
    )
    expect(await consensus.consensusActionMbr({ args: { data: subscription.setOfferingWeight(1n, 3n) }, staticFee: MAX_APP_CALL_FEE })).toBe(
      SUBSCRIPTION_HISTORY_MBR,
    )

    await apply(subscription.setOfferingWeight(1n, 3n))
    expect((await consensus.state.box.offerings.value(1n))?.weight).toBe(3n)
    await apply(subscription.addOfferings([{ weight: 4n }]))
    expect(await consensus.consensusActionMbr({ args: { data: subscription.removeOffering(1n) }, staticFee: MAX_APP_CALL_FEE })).toBe(
      SUBSCRIPTION_HISTORY_MBR - SUBSCRIPTION_OFFERING_MBR,
    )
    const consensusBefore = await balanceOf(environment, consensus.appAddress)
    await apply(subscription.removeOffering(1n))
    expect((await balanceOf(environment, consensus.appAddress)) - consensusBefore).toBe(
      SUBSCRIPTION_HISTORY_MBR - SUBSCRIPTION_OFFERING_MBR,
    )
    expect((await subscriptions.getService({ args: { address: consensus.appAddress.toString(), id: 1n } })).status).toBe(40)
    expect((await consensus.state.global.getAll()).offeringCount).toBe(1n)
    await host.send.validateActivation({ args: {}, ...send })
    // Draft configuration ends at activation; later changes are governed.
    await expectContractError(
      host.send.configureConsensus({ args: { config: subscriptionConfiguration([{ weight: 1n }]) }, ...send }),
      'ERR:errGsub',
    )
  }, 180_000)

  test('rejects invalid constructor configuration', async () => {
    await expectContractError(deploySubscriptionConsensus(environment, 0n, 1n), 'ERR:errGsub')
    const subscriptions = await deployMockSubscriptions(environment)
    await expectContractError(deploySubscriptionConsensus(environment, subscriptions.appId, 0n), 'ERR:errGsub')
  }, 180_000)
})

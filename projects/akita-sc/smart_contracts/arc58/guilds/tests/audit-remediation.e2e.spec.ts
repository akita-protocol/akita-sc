import { microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import type { TransactionSignerAccount as AddressWithTransactionSigner } from '@algorandfoundation/algokit-utils/types/account'
import { ALGORAND_ZERO_ADDRESS_STRING, assignGroupID as groupTransactions } from 'algosdk'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { TimeWarp } from '../../../../tests/utils/time'
import { SubscriptionGuildConsensusClient } from '../../../artifacts/arc58/guilds/consensus/subscriptions/SubscriptionGuildConsensusClient'
import type { GuildClient } from '../../../artifacts/arc58/guilds/core/GuildClient'
import {
  action,
  ACTION_LOCK_PLUGIN_SET,
  ACTION_UPGRADE_APP,
  addPluginAction,
  APPROVE,
  balanceOf,
  BALLOT_MBR,
  cleanupProposal,
  CONSENSUS_ACTION_SETTINGS_MBR,
  consensusAction,
  createProposal,
  deployGuildTestEnvironment,
  deployMockSubscriptions,
  EMPTY_EVIDENCE,
  encodeAbi,
  endVoting,
  executeProposal,
  EXECUTION_MBR,
  expectContractError,
  finalizeProposal,
  latestTimestamp,
  MAX_APP_CALL_FEE,
  minBalanceOf,
  mintGuild,
  mintLockedGuild,
  proposalCostOf,
  proposalSettings,
  REJECT,
  removePluginAction,
  setConsensusActionSettingsAction,
  setPluginSettingsAction,
  setSettingsAction,
  setupGuildWallet,
  submitProposal,
  subscription,
  subscriptionConfig,
  subscriptionConfiguration,
  subscriptionEvidence,
  SUBSCRIPTIONS,
  upgradeAppAction,
  vote,
  VOTE_MBR,
  type GuildAction,
  type GuildTestEnvironment,
} from './test-helpers'

/**
 * Regression coverage for the 2026-10-02 Guild audit remediation:
 * L-1a approval-minimum cap, D-2 stronger-class settings changes, L-1b subscription power and weight
 * bounds, L-1c locked-token lockup bound, L-2 closed-account refunds, I-1 plugin storage, I-2 orphan
 * plugin settings, and I-3 creator-only bootstrap execution.
 */
const fixture = algorandFixture()
let environment: GuildTestEnvironment
let timeWarp: TimeWarp
const send = { maxFee: MAX_APP_CALL_FEE, coverAppCallInnerTransactionFees: true, populateAppCallResources: true }
const DAY = 86_400n
const YEAR_LOCK = 366n * DAY

const expectNoStrandedBalance = async (guild: GuildClient) => {
  const balance = await balanceOf(environment, guild.appAddress)
  const minimum = await minBalanceOf(environment, guild.appAddress)
  expect(balance - minimum).toBe((await guild.state.global.reserved()) ?? 0n)
}

const asAccount = (guild: GuildClient, account: AddressWithTransactionSigner) =>
  guild.clone({ defaultSender: account.addr, defaultSigner: account.signer })

/** Create, submit, and approve a proposal as `proposer`, then close voting and finalize. */
const approveOnly = async (
  guild: GuildClient,
  actions: GuildAction[],
  proposer: AddressWithTransactionSigner = environment.creator,
  evidence = EMPTY_EVIDENCE,
) => {
  const proposalId = await createProposal(environment, guild, actions, evidence, proposer)
  await submitProposal(asAccount(guild, proposer), proposalId, evidence)
  await vote(environment, guild, proposer, proposalId, APPROVE, evidence)
  await endVoting(timeWarp)
  await finalizeProposal(guild, proposalId)
  return proposalId
}

/** Close an account entirely, as a voter or proposer leaving the network would. */
const closeAccount = async (account: AddressWithTransactionSigner) =>
  environment.algorand.send.payment({
    sender: account.addr,
    signer: account.signer,
    receiver: environment.creator.addr,
    amount: microAlgo(0n),
    closeRemainderTo: environment.creator.addr,
  })

describe('Guild audit remediation (2026-10-02)', () => {
  beforeAll(fixture.newScope, 120_000)
  beforeAll(async () => {
    environment = await deployGuildTestEnvironment(fixture.context.algorand, fixture.context.testAccount)
    timeWarp = new TimeWarp(environment.algorand)
  }, 180_000)
  afterAll(async () => timeWarp?.resetTimeWarp())

  test('L-1a: a voted change raises an approval minimum only up to the approvals its ballot demonstrated', async () => {
    // Draft configuration is creator-controlled and unbounded by any ballot.
    const draft = await mintLockedGuild(environment)
    await draft.guild.send.setProposalSettings({
      args: { actionType: ACTION_LOCK_PLUGIN_SET, settings: proposalSettings({ minimumApprovals: 1_000_000_000n }) },
      ...send,
    })

    const { guild } = await mintLockedGuild(environment)
    await guild.send.partiallyInitialize({ args: {}, ...send })
    const approvals = async (proposalId: bigint) => (await guild.getBallot({ args: { proposalId }, staticFee: MAX_APP_CALL_FEE })).votes.approvals

    const tooHigh = await approveOnly(guild, [setSettingsAction(ACTION_LOCK_PLUGIN_SET, proposalSettings({ minimumApprovals: 1_000_000n }))])
    expect(await approvals(tooHigh)).toBeLessThan(1_000_000n)
    await expectContractError(executeProposal(guild, tooHigh), 'ERR:errGlko')

    const raised = await approveOnly(guild, [setSettingsAction(ACTION_LOCK_PLUGIN_SET, proposalSettings({ minimumApprovals: 100n }))])
    await executeProposal(guild, raised)
    expect((await guild.state.global.updateGuildProposalSettings())?.minimumApprovals).toBe(100n)

    const unreachable = await approveOnly(guild, [setConsensusActionSettingsAction(1, proposalSettings({ minimumApprovals: 1_000_000n }))])
    await expectContractError(executeProposal(guild, unreachable), 'ERR:errGlko')

    // Keeping or lowering a minimum is always allowed.
    const lowered = await approveOnly(guild, [setSettingsAction(ACTION_LOCK_PLUGIN_SET, proposalSettings({ minimumApprovals: 1n }))])
    await executeProposal(guild, lowered)
    expect((await guild.state.global.updateGuildProposalSettings())?.minimumApprovals).toBe(1n)
    await expectNoStrandedBalance(guild)
  }, 300_000)

  test('D-2: changing a class, consensus code, or plugin policy needs the stronger of both classes', async () => {
    const { guild } = await mintLockedGuild(environment)
    const wallet = await setupGuildWallet(environment, guild)
    await guild.appClient.fundAppAccount({ amount: microAlgo(1_000_000n) })
    const strict = proposalSettings({ fee: 5_000n, minimumApprovals: 7n, approval: 90_000n, duration: 120n })
    await guild.send.setProposalSettings({ args: { actionType: ACTION_UPGRADE_APP, settings: strict }, ...send })
    await guild.send.setConsensusActionSettings({ args: { code: 1n, settings: strict }, ...send })
    const plugin = environment.revenueEscrow.appId
    await executeProposal(guild, await createProposal(environment, guild, [addPluginAction(plugin, ALGORAND_ZERO_ADDRESS_STRING, 'ops', strict)]))
    await guild.send.initialize({ args: {}, ...send })
    expect((await guild.state.global.getAll()).wallet).toBe(wallet.appId)

    for (const changing of [
      setSettingsAction(ACTION_UPGRADE_APP, proposalSettings()),
      setConsensusActionSettingsAction(1, proposalSettings()),
      setPluginSettingsAction(plugin, 'ops', proposalSettings()),
    ]) {
      const cost = await proposalCostOf(guild, [changing])
      expect(cost.fee).toBe(5_000n)
      expect(cost.minimumApprovals).toBe(7n)
      expect(cost.approval).toBe(90_000n)
      expect(cost.duration).toBe(120n)
    }
    // A weaker target leaves the changing action's own class in charge.
    const weak = await proposalCostOf(guild, [setSettingsAction(ACTION_LOCK_PLUGIN_SET, proposalSettings())])
    expect(weak.minimumApprovals).toBe(1n)
    expect(weak.fee).toBe(0n)
    const unregistered = await proposalCostOf(guild, [setConsensusActionSettingsAction(2, proposalSettings())])
    expect(unregistered.minimumApprovals).toBe(1n)
  }, 300_000)

  test('L-1b: subscription power needs a paid-up subscription now, independent of ballot length', async () => {
    const subscriptions = await deployMockSubscriptions(environment)
    const voter2 = await fixture.context.generateAccount({ initialFunds: microAlgo(3_000_000n) })
    const lapsed = await fixture.context.generateAccount({ initialFunds: microAlgo(3_000_000n) })
    // Every ballot lasts longer than the 100-second payment interval of the subscriptions below.
    const { guild, deployment } = await mintGuild(environment, SUBSCRIPTIONS, subscriptionConfig(subscriptions.appId, 1n), proposalSettings({ duration: 300n }))
    const consensus = new SubscriptionGuildConsensusClient({
      algorand: environment.algorand,
      appId: deployment.consensus,
      defaultSender: environment.creator.addr,
      defaultSigner: environment.creator.signer,
    })
    const config = subscriptionConfiguration([{ weight: 3n }])
    const mbrPayment = await environment.algorand.createTransaction.payment({
      sender: environment.creator.addr,
      signer: environment.creator.signer,
      receiver: guild.appAddress,
      amount: microAlgo(await guild.consensusConfigurationMbr({ args: { config }, staticFee: MAX_APP_CALL_FEE })),
    })
    await guild.send.configureConsensus({ args: { mbrPayment, config }, ...send })
    await guild.send.partiallyInitialize({ args: {}, ...send })
    const policy = consensus.appAddress.toString()

    const now = await latestTimestamp(environment.algorand)
    const pay = (account: string, id: bigint, lastPayment: bigint) =>
      subscriptions.send.setSubscription({ args: { account, id, recipient: policy, serviceId: 1n, interval: 100n, lastPayment } })
    await pay(environment.creator.addr.toString(), 101n, now)
    await pay(voter2.addr.toString(), 102n, now)
    await pay(lapsed.addr.toString(), 103n, now - 200n)

    const proposalId = await createProposal(environment, guild, [action(ACTION_LOCK_PLUGIN_SET)], subscriptionEvidence(101n))
    await submitProposal(guild, proposalId, subscriptionEvidence(101n))
    await vote(environment, guild, environment.creator, proposalId, APPROVE, subscriptionEvidence(101n))
    await vote(environment, guild, voter2, proposalId, APPROVE, subscriptionEvidence(102n))
    await expectContractError(vote(environment, guild, lapsed, proposalId, APPROVE, subscriptionEvidence(103n)), 'ERR:errGpwr')
    expect((await guild.getBallot({ args: { proposalId }, staticFee: MAX_APP_CALL_FEE })).votes.approvals).toBe(6n)

    // Once the interval elapses without a new payment, the same subscription stops granting power.
    await timeWarp.timeWarp(400n)
    await finalizeProposal(guild, proposalId)
    expect((await guild.getProposal({ args: { proposalId } })).status).toBe(40)
    const power = await consensus.send.proposalPower({
      args: { account: environment.creator.addr.toString(), evidence: subscriptionEvidence(101n), requiredThrough: 0n },
      ...send,
    })
    expect(power.return).toBe(0n)
  }, 300_000)

  test('L-1b: required proposer power never exceeds the largest offering weight, and offerings are capped at 64', async () => {
    const subscriptions = await deployMockSubscriptions(environment)
    const configure = async (guild: GuildClient, weights: bigint[]) => {
      const config = subscriptionConfiguration(weights.map((weight) => ({ weight, title: '' })))
      const mbrPayment = await environment.algorand.createTransaction.payment({
        sender: environment.creator.addr,
        signer: environment.creator.signer,
        receiver: guild.appAddress,
        amount: microAlgo(await guild.consensusConfigurationMbr({ args: { config }, staticFee: MAX_APP_CALL_FEE })),
      })
      return guild.send.configureConsensus({ args: { mbrPayment, config }, ...send })
    }

    // Activation rejects a class whose proposer power no offering can reach.
    const weak = await mintGuild(environment, SUBSCRIPTIONS, subscriptionConfig(subscriptions.appId, 1n), proposalSettings({ power: 5n }))
    await configure(weak.guild, [3n])
    await expectContractError(weak.guild.send.partiallyInitialize({ args: {}, ...send }), 'ERR:errGset')
    await configure(weak.guild, [5n])
    await weak.guild.send.partiallyInitialize({ args: {}, ...send })
    const weakConsensus = new SubscriptionGuildConsensusClient({
      algorand: environment.algorand,
      appId: weak.deployment.consensus,
      defaultSender: environment.creator.addr,
      defaultSigner: environment.creator.signer,
    })
    expect((await weakConsensus.state.global.getAll()).maximumWeight).toBe(5n)

    // Governance may not lower the only weight-5 offering below the power its classes require.
    const now = await latestTimestamp(environment.algorand)
    await subscriptions.send.setSubscription({
      args: {
        account: environment.creator.addr.toString(),
        id: 201n,
        recipient: weakConsensus.appAddress.toString(),
        serviceId: 2n,
        interval: 100_000n,
        lastPayment: now,
      },
    })
    const lowered = await approveOnly(weak.guild, [consensusAction(subscription.setOfferingWeight(2n, 4n))], environment.creator, subscriptionEvidence(201n))
    await expectContractError(executeProposal(weak.guild, lowered), 'ERR:errGset')

    // At most 64 live offerings.
    const capped = await mintGuild(environment, SUBSCRIPTIONS, subscriptionConfig(subscriptions.appId, 1n))
    const batch = Array.from({ length: 16 }, () => 1n)
    for (let i = 0; i < 4; i += 1) {
      await configure(capped.guild, batch)
    }
    await expectContractError(configure(capped.guild, [1n]), 'ERR:errGsub')
  }, 600_000)

  test('L-1c: locked-token ballots must end before the longest lock the voting asset allows', async () => {
    const { guild, staking, asset } = await mintLockedGuild(environment)
    const settings = (duration: bigint) => ({ args: { actionType: ACTION_LOCK_PLUGIN_SET, settings: proposalSettings({ duration }) }, ...send })
    await expectContractError(guild.send.setProposalSettings(settings(31_536_000n)), 'ERR:errGset')
    await guild.send.setProposalSettings(settings(31_535_999n))

    await staking.send.setSettings({ args: { asset, value: 30n * DAY } })
    await expectContractError(guild.send.setProposalSettings(settings(31n * DAY)), 'ERR:errGset')
    await guild.send.setProposalSettings(settings(29n * DAY))

    // A lockup of a week or less can never carry power, so the Guild cannot activate on it.
    await staking.send.setSettings({ args: { asset, value: 7n * DAY } })
    await guild.send.setProposalSettings(settings(60n))
    await expectContractError(guild.send.partiallyInitialize({ args: {}, ...send }), 'ERR:errGstk')
    await staking.send.setSettings({ args: { asset, value: 30n * DAY } })
    await guild.send.partiallyInitialize({ args: {}, ...send })
  }, 180_000)

  test('L-2: refunds owed to closed accounts go to the treasury instead of blocking finalize or cleanup', async () => {
    const proposer = await fixture.context.generateAccount({ initialFunds: microAlgo(3_000_000n) })
    const outsider = await fixture.context.generateAccount({ initialFunds: microAlgo(3_000_000n) })
    const { guild, staking, asset } = await mintLockedGuild(environment)
    const now = await latestTimestamp(environment.algorand)
    await staking.send.setLock({ args: { account: proposer.addr.toString(), asset, amount: 1_000_000_000n, expiration: now + YEAR_LOCK } })
    const wallet = await setupGuildWallet(environment, guild)
    await guild.send.initialize({ args: {}, ...send })
    const outsiderGuild = asAccount(guild, outsider)

    // The proposer holds an execution reserve smaller than the minimum balance, then closes their account.
    const proposalId = await createProposal(environment, guild, [setConsensusActionSettingsAction(7, proposalSettings())], EMPTY_EVIDENCE, proposer)
    await submitProposal(asAccount(guild, proposer), proposalId)
    await vote(environment, guild, environment.creator, proposalId, REJECT)
    await vote(environment, guild, proposer, proposalId, REJECT)
    await endVoting(timeWarp)
    await closeAccount(proposer)
    expect(await balanceOf(environment, proposer.addr)).toBe(0n)

    const treasuryBefore = await balanceOf(environment, wallet.appAddress)
    await finalizeProposal(outsiderGuild, proposalId)
    expect((await guild.getProposal({ args: { proposalId } })).status).toBe(30)
    expect((await balanceOf(environment, wallet.appAddress)) - treasuryBefore).toBe(CONSENSUS_ACTION_SETTINGS_MBR)

    // The closed proposer's vote receipt and ballot storage go to the treasury; the open voter is refunded.
    const creatorBefore = await balanceOf(environment, environment.creator.addr)
    expect(await cleanupProposal(outsiderGuild, proposalId, [environment.creator.addr.toString(), proposer.addr.toString()])).toBe(0n)
    expect((await balanceOf(environment, environment.creator.addr)) - creatorBefore).toBe(VOTE_MBR)
    expect((await balanceOf(environment, wallet.appAddress)) - treasuryBefore).toBe(CONSENSUS_ACTION_SETTINGS_MBR + VOTE_MBR + BALLOT_MBR)
    expect(await balanceOf(environment, proposer.addr)).toBe(0n)
    await expectNoStrandedBalance(guild)
  }, 300_000)

  test('L-2: a committed self-upgrade still applies after its proposer closes their account', async () => {
    const proposer = await fixture.context.generateAccount({ initialFunds: microAlgo(3_000_000n) })
    const { guild, staking, asset } = await mintLockedGuild(environment)
    const now = await latestTimestamp(environment.algorand)
    await staking.send.setLock({ args: { account: proposer.addr.toString(), asset, amount: 1_000_000_000n, expiration: now + YEAR_LOCK } })
    const wallet = await setupGuildWallet(environment, guild)
    await guild.send.initialize({ args: {}, ...send })

    const { algorand, creator } = environment
    const lease = new Uint8Array(32).fill(92)
    const proposalId = (await guild.state.global.proposalId())!
    const firstValid = BigInt((await algorand.getSuggestedParams()).firstValid)
    const lastValid = firstValid + 1000n
    const composer = algorand.newGroup()
    composer.addAppCallMethodCall(await guild.params.opUp({ args: {}, firstValidRound: firstValid, lastValidRound: lastValid }))
    composer.addAppUpdateMethodCall(await guild.params.update.update({
      args: { newVersion: 'closed-proposer-update' },
      lease,
      firstValidRound: firstValid,
      lastValidRound: lastValid,
      staticFee: microAlgo(10_000n),
      accountReferences: [proposer.addr],
      appReferences: [wallet.appId],
      // the empty reference adds read budget for the proposal box
      boxReferences: [new Uint8Array([120, ...lease]), new Uint8Array([108, ...encodeAbi('uint64', proposalId)]), new Uint8Array()],
    }))
    const transactions = groupTransactions((await composer.buildTransactions()).transactions)
    const upgrade = upgradeAppAction(guild.appId, lease, [transactions[0].group! as Uint8Array<ArrayBuffer>], firstValid, lastValid)
    const createdId = await createProposal(environment, guild, [upgrade], EMPTY_EVIDENCE, proposer)
    expect(createdId).toBe(proposalId)
    await submitProposal(asAccount(guild, proposer), proposalId)
    await vote(environment, guild, proposer, proposalId, APPROVE)
    await endVoting(timeWarp)
    await finalizeProposal(guild, proposalId)
    await executeProposal(guild, proposalId)
    await closeAccount(proposer)

    const treasuryBefore = await balanceOf(environment, wallet.appAddress)
    await algorand.client.algod.sendRawTransaction(await creator.signer(transactions, transactions.map((_, index) => index))).do()
    expect((await guild.state.global.getAll()).version).toBe('closed-proposer-update')
    expect((await guild.state.box.executions.getMap()).size).toBe(0)
    expect((await balanceOf(environment, wallet.appAddress)) - treasuryBefore).toBe(EXECUTION_MBR)
    await expectNoStrandedBalance(guild)
  }, 300_000)

  test('I-1/I-2: plugin removal never re-creates its policy and sends released storage to the treasury', async () => {
    const outsider = await fixture.context.generateAccount({ initialFunds: microAlgo(3_000_000n) })
    const { guild } = await mintLockedGuild(environment)
    const wallet = await setupGuildWallet(environment, guild)
    await guild.appClient.fundAppAccount({ amount: microAlgo(1_000_000n) })
    const plugin = environment.revenueEscrow.appId
    await executeProposal(guild, await createProposal(environment, guild, [addPluginAction(plugin, ALGORAND_ZERO_ADDRESS_STRING, 'ops')]))
    await guild.send.initialize({ args: {}, ...send })
    // Forward the creator's leftover draft funding so the measured window starts with nothing unreserved.
    await guild.send.sweep({ args: {}, ...send })
    const outsiderGuild = asAccount(guild, outsider)
    const remove = removePluginAction(plugin, ALGORAND_ZERO_ADDRESS_STRING, 'ops')
    const retune = setPluginSettingsAction(plugin, 'ops', proposalSettings({ minimumApprovals: 2n }))

    const orphaning = await approveOnly(guild, [remove, retune])
    await expectContractError(executeProposal(outsiderGuild, orphaning), 'ERR:errGacn')
    expect(await guild.state.box.plugins.value({ plugin, escrow: 'ops' })).toEqual(proposalSettings())

    const ordered = await approveOnly(guild, [retune, remove])
    const creatorBefore = await balanceOf(environment, environment.creator.addr)
    const treasuryBefore = await balanceOf(environment, wallet.appAddress)
    await executeProposal(outsiderGuild, ordered)
    expect((await guild.state.box.plugins.getMap()).size).toBe(0)
    // The proposer of the removal funded none of the released storage, so none of it is refunded to them.
    expect(await balanceOf(environment, environment.creator.addr)).toBe(creatorBefore)
    expect((await balanceOf(environment, wallet.appAddress)) - treasuryBefore).toBe(26_900n + 400n * 3n)
    await expectNoStrandedBalance(guild)
  }, 300_000)

  test('I-3: only the creator executes bootstrap proposals', async () => {
    const outsider = await fixture.context.generateAccount({ initialFunds: microAlgo(3_000_000n) })
    const { guild } = await mintLockedGuild(environment)
    // Bootstrap proposal storage is funded from the creator's draft balance.
    await guild.appClient.fundAppAccount({ amount: microAlgo(200_000n) })
    const proposalId = await createProposal(environment, guild, [action(ACTION_LOCK_PLUGIN_SET)])
    await expectContractError(executeProposal(asAccount(guild, outsider), proposalId), 'ERR:errGcrt')
    await executeProposal(guild, proposalId)
    expect(await guild.canChangePluginSet({ args: {} })).toBe(false)
  }, 120_000)
})

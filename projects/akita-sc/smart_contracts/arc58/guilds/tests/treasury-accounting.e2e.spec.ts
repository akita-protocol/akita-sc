import { microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { TimeWarp } from '../../../../tests/utils/time'
import type { GuildClient } from '../../../artifacts/arc58/guilds/core/GuildClient'
import {
  action,
  ACTION_LOCK_PLUGIN_SET,
  ACTION_SET_LIMIT,
  APPROVE,
  approveAndExecute,
  balanceOf,
  BALLOT_MBR,
  cleanupProposal,
  CONSENSUS_ACTION_SETTINGS_MBR,
  createProposal,
  deployGuildTestEnvironment,
  setupGuildWallet,
  endVoting,
  executeProposal,
  expectContractError,
  finalizeProposal,
  latestTimestamp,
  LOCKED_TOKEN_ACTION,
  MAX_APP_CALL_FEE,
  minBalanceOf,
  mintLockedGuild,
  proposalCostOf,
  proposalSettings,
  REJECT,
  setConsensusActionSettingsAction,
  setLimitAction,
  setSettingsAction,
  submitProposal,
  vote,
  VOTE_MBR,
  type GuildAction,
  type GuildTestEnvironment,
} from './test-helpers'

const fixture = algorandFixture()
let environment: GuildTestEnvironment
let timeWarp: TimeWarp
const send = { maxFee: MAX_APP_CALL_FEE, coverAppCallInnerTransactionFees: true, populateAppCallResources: true }

/** Storage of a proposal box: locked as minimum balance, so never part of the free-balance reserve. */
const proposalBoxMbr = (actions: GuildAction[]) =>
  44_900n + actions.reduce((sum, [, data]) => sum + 400n * (7n + BigInt(data.length)), 0n)

/** Every microALGO above the Guild's own storage must be a proposer reserve; nothing may be stranded. */
const expectNoStrandedBalance = async (guild: GuildClient) => {
  const balance = await balanceOf(environment, guild.appAddress)
  const minimum = await minBalanceOf(environment, guild.appAddress)
  expect(balance - minimum).toBe((await guild.state.global.reserved()) ?? 0n)
}

describe('Guild treasury accounting', () => {
  beforeAll(fixture.newScope, 120_000)
  beforeAll(async () => {
    environment = await deployGuildTestEnvironment(fixture.context.algorand, fixture.context.testAccount)
    timeWarp = new TimeWarp(environment.algorand)
  }, 180_000)
  afterAll(async () => timeWarp?.resetTimeWarp())

  test('holds only proposer reserves and refunds deleted drafts in full', async () => {
    const { guild } = await mintLockedGuild(environment)
    await guild.send.partiallyInitialize({ args: {}, ...send })
    await expectNoStrandedBalance(guild)

    const actions = [setLimitAction(3n)]
    const cost = await proposalCostOf(guild, actions)
    const proposalId = await createProposal(environment, guild, actions)
    expect(await guild.state.global.reserved()).toBe(cost.total - proposalBoxMbr(actions))
    expect((await guild.getProposal({ args: { proposalId } })).feesPaid).toBe(cost.total)
    await expectNoStrandedBalance(guild)

    const guildBefore = await balanceOf(environment, guild.appAddress)
    await guild.send.deleteProposal({ args: { proposalId }, ...send })
    expect(guildBefore - (await balanceOf(environment, guild.appAddress))).toBe(cost.total)
    expect(await guild.state.global.reserved()).toBe(0n)
    await expectNoStrandedBalance(guild)
  }, 120_000)

  test('returns vote receipts to voters and ballot storage to the proposer at cleanup', async () => {
    const outsider = await fixture.context.generateAccount({ initialFunds: microAlgo(3_000_000n) })
    const voter2 = await fixture.context.generateAccount({ initialFunds: microAlgo(3_000_000n) })
    const { guild, staking, asset } = await mintLockedGuild(environment)
    const now = await latestTimestamp(environment.algorand)
    await staking.send.setLock({
      args: { account: voter2.addr.toString(), asset, amount: 1_000_000_000n, expiration: now + 366n * 86_400n },
    })
    await guild.send.partiallyInitialize({ args: {}, ...send })

    const proposalId = await createProposal(environment, guild, [action(ACTION_LOCK_PLUGIN_SET)])
    await submitProposal(guild, proposalId)
    await vote(environment, guild, environment.creator, proposalId, APPROVE)
    await vote(environment, guild, voter2, proposalId, APPROVE)
    await endVoting(timeWarp)
    await finalizeProposal(guild, proposalId)
    await executeProposal(guild, proposalId)
    await expectNoStrandedBalance(guild)

    // A third party runs the cleanup so neither refund recipient pays any fee in the measured window.
    const creatorBefore = await balanceOf(environment, environment.creator.addr)
    const voter2Before = await balanceOf(environment, voter2.addr)
    const outsiderGuild = guild.clone({ defaultSender: outsider.addr, defaultSigner: outsider.signer })
    expect(await cleanupProposal(outsiderGuild, proposalId, [environment.creator.addr.toString(), voter2.addr.toString()])).toBe(0n)
    expect((await balanceOf(environment, voter2.addr)) - voter2Before).toBe(VOTE_MBR)
    expect((await balanceOf(environment, environment.creator.addr)) - creatorBefore).toBe(VOTE_MBR + BALLOT_MBR)
    await expectNoStrandedBalance(guild)
  }, 180_000)

  test('forwards action fees to the treasury when a proposal enters voting', async () => {
    const { guild } = await mintLockedGuild(environment, proposalSettings({ fee: 7_000n }))
    const wallet = await setupGuildWallet(environment, guild)
    await guild.send.initialize({ args: {}, ...send })

    const treasuryBefore = await balanceOf(environment, wallet.appAddress)
    const proposalId = await createProposal(environment, guild, [setLimitAction(3n), action(ACTION_LOCK_PLUGIN_SET)])
    expect((await guild.getProposal({ args: { proposalId } })).feesPaid).toBeGreaterThan(14_000n)
    await submitProposal(guild, proposalId)
    expect((await balanceOf(environment, wallet.appAddress)) - treasuryBefore).toBe(14_000n)
    expect((await guild.getProposal({ args: { proposalId } })).feesPaid).toBe(0n)
    expect(await guild.state.global.reserved()).toBe(0n)
    await expectNoStrandedBalance(guild)
  }, 180_000)

  test('refunds unused execution reserve after execution and the whole reserve after rejection', async () => {
    const outsider = await fixture.context.generateAccount({ initialFunds: microAlgo(5_000_000n) })
    const { guild } = await mintLockedGuild(environment)
    await guild.send.partiallyInitialize({ args: {}, ...send })
    const outsiderGuild = guild.clone({ defaultSender: outsider.addr, defaultSigner: outsider.signer })

    // Two proposals are quoted while the same settings box is absent, so both hold its storage in reserve.
    const register = setConsensusActionSettingsAction(LOCKED_TOKEN_ACTION.SetMinimumApprovals, proposalSettings())
    const first = await createProposal(environment, guild, [register])
    const second = await createProposal(environment, guild, [register])
    for (const proposalId of [first, second]) {
      await submitProposal(guild, proposalId)
      await vote(environment, guild, environment.creator, proposalId, APPROVE)
    }
    await endVoting(timeWarp)
    for (const proposalId of [first, second]) {
      await finalizeProposal(outsiderGuild, proposalId)
      expect((await guild.getProposal({ args: { proposalId } })).feesPaid).toBe(CONSENSUS_ACTION_SETTINGS_MBR)
    }
    expect(await guild.state.global.reserved()).toBe(2n * CONSENSUS_ACTION_SETTINGS_MBR)
    await expectNoStrandedBalance(guild)

    const creatorBefore = await balanceOf(environment, environment.creator.addr)
    await executeProposal(outsiderGuild, first)
    expect(await balanceOf(environment, environment.creator.addr)).toBe(creatorBefore)
    // The box already exists, so the second execution consumes nothing and returns the whole reserve.
    await executeProposal(outsiderGuild, second)
    expect((await balanceOf(environment, environment.creator.addr)) - creatorBefore).toBe(CONSENSUS_ACTION_SETTINGS_MBR)
    expect(await guild.state.global.reserved()).toBe(0n)
    await expectNoStrandedBalance(guild)

    const rejected = await createProposal(environment, guild, [setConsensusActionSettingsAction(7, proposalSettings())])
    await submitProposal(guild, rejected)
    await vote(environment, guild, environment.creator, rejected, REJECT)
    await endVoting(timeWarp)
    const beforeRejection = await balanceOf(environment, environment.creator.addr)
    await finalizeProposal(outsiderGuild, rejected)
    expect((await guild.getProposal({ args: { proposalId: rejected } })).status).toBe(30)
    expect((await balanceOf(environment, environment.creator.addr)) - beforeRejection).toBe(CONSENSUS_ACTION_SETTINGS_MBR)
    expect(await guild.state.global.reserved()).toBe(0n)
    await expectNoStrandedBalance(guild)
  }, 300_000)

  test('sweeps only unreserved balance to the treasury and protects draft funding', async () => {
    const outsider = await fixture.context.generateAccount({ initialFunds: microAlgo(3_000_000n) })
    const { guild } = await mintLockedGuild(environment)
    const wallet = await setupGuildWallet(environment, guild)
    await guild.appClient.fundAppAccount({ amount: microAlgo(300_000n) })
    const outsiderGuild = guild.clone({ defaultSender: outsider.addr, defaultSigner: outsider.signer })
    await expectContractError(outsiderGuild.send.sweep({ args: {}, ...send }), 'ERR:errGcrt')

    await guild.send.initialize({ args: {}, ...send })
    const draftActions = [setLimitAction(2n)]
    const cost = await proposalCostOf(guild, draftActions)
    await createProposal(environment, guild, draftActions)
    const draftReserve = cost.total - proposalBoxMbr(draftActions)
    expect(await guild.state.global.reserved()).toBe(draftReserve)
    expect(await guild.sweepable({ args: {} })).toBe(300_000n)

    const treasuryBefore = await balanceOf(environment, wallet.appAddress)
    const swept = await outsiderGuild.send.sweep({ args: {}, ...send })
    expect(swept.return).toBe(300_000n)
    expect((await balanceOf(environment, wallet.appAddress)) - treasuryBefore).toBe(300_000n)
    expect(await guild.state.global.reserved()).toBe(draftReserve)
    await expectNoStrandedBalance(guild)
    expect(await guild.sweepable({ args: {} })).toBe(0n)
    expect((await outsiderGuild.send.sweep({ args: {}, ...send })).return).toBe(0n)
  }, 180_000)

  test('refunds surplus prepayment when settings become cheaper before submission', async () => {
    const { guild } = await mintLockedGuild(environment, proposalSettings({ fee: 7_000n }))
    await guild.send.partiallyInitialize({ args: {}, ...send })

    const actions = [setLimitAction(3n)]
    const originalCost = await proposalCostOf(guild, actions)
    expect(originalCost.fee).toBe(7_000n)
    const proposalId = await createProposal(environment, guild, actions)

    // Governance drops the fee for Guild updates to zero while the draft is still waiting.
    await approveAndExecute(environment, timeWarp, guild, [setSettingsAction(ACTION_SET_LIMIT, proposalSettings({ fee: 0n }))])
    expect((await proposalCostOf(guild, actions)).fee).toBe(0n)

    const guildBefore = await balanceOf(environment, guild.appAddress)
    await submitProposal(guild, proposalId)
    // The ballot is funded and the surplus fee goes back to the proposer.
    expect(guildBefore - (await balanceOf(environment, guild.appAddress))).toBe(7_000n + BALLOT_MBR)
    expect((await guild.getProposal({ args: { proposalId } })).feesPaid).toBe(0n)
    // Without a treasury wallet the fee charged by the settings proposal waits in free balance for sweep().
    expect(await guild.sweepable({ args: {} })).toBe(7_000n)
    expect(await guild.state.global.reserved()).toBe(0n)
  }, 240_000)
})

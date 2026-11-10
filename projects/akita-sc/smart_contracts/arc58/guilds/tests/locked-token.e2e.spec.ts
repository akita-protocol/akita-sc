import { microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { LockedTokenGuildConsensusClient } from '../../../artifacts/arc58/guilds/consensus/locked-token/LockedTokenGuildConsensusClient'
import { TimeWarp } from '../../../../tests/utils/time'
import {
  action,
  ACTION_LOCK_PLUGIN_SET,
  APPROVE,
  approveAndExecute,
  baseConfig,
  cancelProposal,
  consensusAction,
  consensusData,
  createProposal,
  createVotingAsset,
  deployGuildTestEnvironment,
  deployMockStaking,
  endVoting,
  executeProposal,
  expectContractError,
  finalizeProposal,
  latestTimestamp,
  LOCKED_TOKEN,
  lockedToken,
  lockedTokenConfig,
  mintGuild,
  mintLockedGuild,
  proposalSettings,
  REJECT,
  submitProposal,
  vote,
  type GuildTestEnvironment,
} from './test-helpers'

const fixture = algorandFixture()
const DAY = 86_400n
const YEAR = 365n * DAY
let environment: GuildTestEnvironment
let timeWarp: TimeWarp
const send = { maxFee: microAlgo(100_000n), coverAppCallInnerTransactionFees: true, populateAppCallResources: true }

describe('Locked-token Guild consensus', () => {
  beforeAll(fixture.newScope, 120_000)
  beforeAll(async () => {
    environment = await deployGuildTestEnvironment(fixture.context.algorand, fixture.context.testAccount)
    timeWarp = new TimeWarp(environment.algorand)
  }, 180_000)
  afterAll(async () => timeWarp?.resetTimeWarp())

  test('calculates time-weighted lock power and resolves approval without an unsafe aggregate quorum', async () => {
    const voter2 = await fixture.context.generateAccount({ initialFunds: microAlgo(3_000_000n) })
    const staking = await deployMockStaking(environment)
    const asset = await createVotingAsset(environment, 1_000_000_000n)
    const now = await latestTimestamp(environment.algorand)
    await staking.send.setLock({
      args: { account: environment.creator.addr.toString(), asset, amount: 60_000_000n, expiration: now + YEAR + DAY },
    })
    await staking.send.setLock({
      args: { account: voter2.addr.toString(), asset, amount: 30_000_000n, expiration: now + YEAR + DAY },
    })
    await staking.send.setLiveLockedStake({ args: { asset, amount: 100_000_000n } })

    const { guild, deployment } = await mintGuild(
      environment,
      LOCKED_TOKEN,
      lockedTokenConfig(staking.appId, asset),
      proposalSettings({ participation: 0n, approval: 60_000n }),
    )
    await guild.send.partiallyInitialize({ args: {}, ...send })
    const proposalId = await createProposal(environment, guild, [action(ACTION_LOCK_PLUGIN_SET)])
    await submitProposal(guild, proposalId)
    await vote(environment, guild, environment.creator, proposalId, APPROVE)
    await vote(environment, guild, voter2, proposalId, REJECT)

    const consensus = new LockedTokenGuildConsensusClient({
      algorand: environment.algorand,
      appId: deployment.consensus,
      defaultSender: environment.creator.addr,
      defaultSigner: environment.creator.signer,
    })
    const ballot = await consensus.getBallot({ args: { proposalId } })
    expect(ballot.eligiblePower).toBe(0n)
    expect(ballot.votes.approvals).toBeGreaterThanOrEqual(59n)
    expect(ballot.votes.rejections).toBeGreaterThanOrEqual(29n)
    await endVoting(timeWarp)
    await finalizeProposal(guild, proposalId)
    expect((await guild.getProposal({ args: { proposalId } })).status).toBe(40)
  }, 120_000)

  test('measures power in whole-token-years whatever the asset decimals', async () => {
    const now = await latestTimestamp(environment.algorand)
    const powerFor = async (decimals: number, tokens: bigint) => {
      const staking = await deployMockStaking(environment)
      const unit = 10n ** BigInt(decimals)
      const asset = await createVotingAsset(environment, tokens * unit, decimals)
      // Whole tokens locked for a year and a day are worth one unit of power each.
      await staking.send.setLock({
        args: { account: environment.creator.addr.toString(), asset, amount: tokens * unit, expiration: now + YEAR + DAY },
      })
      await staking.send.setLiveLockedStake({ args: { asset, amount: tokens * unit } })
      const { deployment } = await mintGuild(environment, LOCKED_TOKEN, lockedTokenConfig(staking.appId, asset))
      const consensus = new LockedTokenGuildConsensusClient({
        algorand: environment.algorand,
        appId: deployment.consensus,
        defaultSender: environment.creator.addr,
        defaultSigner: environment.creator.signer,
      })
      expect((await consensus.state.global.getAll()).votingUnit).toBe(unit)
      return consensus.proposalPower({
        args: { account: environment.creator.addr.toString(), evidence: new Uint8Array(), requiredThrough: now + 60n },
        staticFee: microAlgo(10_000n),
      })
    }
    for (const decimals of [0, 6, 8]) {
      expect(await powerFor(decimals, 60n)).toBe(60n)
    }
    // Nineteen decimals is the most a uint64 supply can carry: at most one whole token exists.
    expect(await powerFor(19, 1n)).toBe(1n)
  }, 180_000)

  test('requires every counted lock to outlive the ballot deadline', async () => {
    const staking = await deployMockStaking(environment)
    const asset = await createVotingAsset(environment, 1_000_000_000n)
    const now = await latestTimestamp(environment.algorand)
    await staking.send.setLock({
      args: { account: environment.creator.addr.toString(), asset, amount: 50_000_000n, expiration: now + 8n * DAY },
    })
    await staking.send.setLiveLockedStake({ args: { asset, amount: 50_000_000n } })
    const { guild } = await mintGuild(
      environment,
      LOCKED_TOKEN,
      lockedTokenConfig(staking.appId, asset),
      proposalSettings({ duration: 9n * DAY }),
    )
    await guild.send.partiallyInitialize({ args: {}, ...send })
    await expect(createProposal(environment, guild, [action(ACTION_LOCK_PLUGIN_SET)])).rejects.toThrow('ERR:errGpwr')
  }, 120_000)

  test('matches AKITA DAO by rejecting locks with less than one week remaining', async () => {
    const staking = await deployMockStaking(environment)
    const asset = await createVotingAsset(environment, 1_000_000_000n)
    const now = await latestTimestamp(environment.algorand)
    await staking.send.setLock({
      args: { account: environment.creator.addr.toString(), asset, amount: 50_000_000n, expiration: now + 6n * DAY },
    })
    await staking.send.setLiveLockedStake({ args: { asset, amount: 50_000_000n } })
    const { guild } = await mintGuild(
      environment,
      LOCKED_TOKEN,
      lockedTokenConfig(staking.appId, asset),
      proposalSettings({ duration: 10n }),
    )
    await guild.send.partiallyInitialize({ args: {}, ...send })
    await expect(createProposal(environment, guild, [action(ACTION_LOCK_PLUGIN_SET)])).rejects.toThrow('ERR:errGpwr')
  }, 120_000)

  test('does not use mutable aggregate stake as a quorum denominator and reads voter locks at vote time', async () => {
    const staking = await deployMockStaking(environment)
    const asset = await createVotingAsset(environment, 1_000_000_000n)
    const now = await latestTimestamp(environment.algorand)
    await staking.send.setLock({
      args: { account: environment.creator.addr.toString(), asset, amount: 10_000_000n, expiration: now + YEAR + DAY },
    })
    await staking.send.setLiveLockedStake({ args: { asset, amount: 100_000_000n } })
    const { guild, deployment } = await mintGuild(environment, LOCKED_TOKEN, lockedTokenConfig(staking.appId, asset))
    await guild.send.partiallyInitialize({ args: {}, ...send })
    const proposalId = await createProposal(environment, guild, [action(ACTION_LOCK_PLUGIN_SET)])
    await submitProposal(guild, proposalId)
    await staking.send.setLiveLockedStake({ args: { asset, amount: 500_000_000n } })
    await staking.send.setLock({
      args: { account: environment.creator.addr.toString(), asset, amount: 25_000_000n, expiration: now + YEAR + DAY },
    })
    await vote(environment, guild, environment.creator, proposalId, APPROVE)
    const consensus = new LockedTokenGuildConsensusClient({
      algorand: environment.algorand,
      appId: deployment.consensus,
      defaultSender: environment.creator.addr,
      defaultSigner: environment.creator.signer,
    })
    const ballot = await consensus.getBallot({ args: { proposalId } })
    expect(ballot.eligiblePower).toBe(0n)
    expect(ballot.votes.approvals).toBeGreaterThanOrEqual(24n)
  }, 120_000)

  test('allows draft reconfiguration but rejects configuration changes after activation', async () => {
    const staking1 = await deployMockStaking(environment)
    const staking2 = await deployMockStaking(environment)
    const asset1 = await createVotingAsset(environment)
    const asset2 = await createVotingAsset(environment)
    const { guild, deployment } = await mintGuild(environment, LOCKED_TOKEN, lockedTokenConfig(staking1.appId, asset1))
    const zeroPayment = async () =>
      environment.algorand.createTransaction.payment({
        sender: environment.creator.addr,
        signer: environment.creator.signer,
        receiver: guild.appAddress,
        amount: microAlgo(0),
      })
    await expectContractError(
      guild.send.configureConsensus({
        args: { mbrPayment: await zeroPayment(), config: lockedTokenConfig(staking2.appId, asset2, 0n) },
        ...send,
      }),
      'ERR:errGset',
    )
    await guild.send.configureConsensus({
      args: { mbrPayment: await zeroPayment(), config: lockedTokenConfig(staking2.appId, asset2, 3n) },
      ...send,
    })
    const consensus = new LockedTokenGuildConsensusClient({
      algorand: environment.algorand,
      appId: deployment.consensus,
      defaultSender: environment.creator.addr,
      defaultSigner: environment.creator.signer,
    })
    const state = await consensus.state.global.getAll()
    expect(state.staking).toBe(staking2.appId)
    expect(state.votingAsset).toBe(asset2)
    expect(state.minimumApprovals).toBe(3n)
    await staking2.send.setLiveLockedStake({ args: { asset: asset2, amount: 1_000_000n } })
    await guild.send.partiallyInitialize({ args: {}, ...send })
    await expect(
      guild.send.configureConsensus({
        args: { mbrPayment: await zeroPayment(), config: lockedTokenConfig(staking1.appId, asset1) },
      }),
    ).rejects.toThrow('ERR:errGdrf')
  }, 120_000)

  test('rejects zero or unbounded action limits, zero floors, and activation without eligible locked stake', async () => {
    const staking = await deployMockStaking(environment)
    const asset = await createVotingAsset(environment)
    await staking.send.setLiveLockedStake({ args: { asset, amount: 1_000_000n } })
    for (const proposalActionLimit of [0n, 13n]) {
      await expectContractError(
        mintGuild(
          environment,
          LOCKED_TOKEN,
          lockedTokenConfig(staking.appId, asset),
          proposalSettings(),
          environment.creator,
          { ...baseConfig(), proposalActionLimit },
        ),
        'ERR:errGmax',
      )
    }
    await expectContractError(mintGuild(environment, LOCKED_TOKEN, lockedTokenConfig(staking.appId, asset, 0n)), 'ERR:errGset')

    const emptyStaking = await deployMockStaking(environment)
    const emptyAsset = await createVotingAsset(environment)
    const { guild } = await mintGuild(environment, LOCKED_TOKEN, lockedTokenConfig(emptyStaking.appId, emptyAsset))
    await expectContractError(guild.send.partiallyInitialize({ args: {}, ...send }), 'ERR:errGsnp')

    await expectContractError(
      mintGuild(environment, LOCKED_TOKEN, lockedTokenConfig(staking.appId, asset), proposalSettings({ participation: 1n })),
      'ERR:errGset',
    )
  }, 120_000)

  test('revalidates proposer power against the eventual ballot deadline at submission', async () => {
    const staking = await deployMockStaking(environment)
    const asset = await createVotingAsset(environment)
    const now = await latestTimestamp(environment.algorand)
    await staking.send.setLock({
      args: { account: environment.creator.addr.toString(), asset, amount: 10_000_000n, expiration: now + YEAR },
    })
    await staking.send.setLiveLockedStake({ args: { asset, amount: 10_000_000n } })
    const { guild } = await mintGuild(environment, LOCKED_TOKEN, lockedTokenConfig(staking.appId, asset))
    await guild.send.partiallyInitialize({ args: {}, ...send })
    const proposalId = await createProposal(environment, guild, [action(ACTION_LOCK_PLUGIN_SET)])
    await staking.send.setLock({
      args: { account: environment.creator.addr.toString(), asset, amount: 0n, expiration: now + YEAR },
    })
    await expectContractError(submitProposal(guild, proposalId), 'ERR:errGpwr')
  }, 120_000)

  test('applies an absolute approval floor that a lone small lock cannot clear until governance lowers it', async () => {
    const smallVoter = await fixture.context.generateAccount({ initialFunds: microAlgo(5_000_000n) })
    // Guild settings alone would let a single approval pass; the policy floor of two is what protects the room.
    const { guild, deployment, staking, asset } = await mintLockedGuild(
      environment,
      proposalSettings({ minimumApprovals: 0n, approval: 50_000n }),
      environment.creator,
      2n,
    )
    const now = await latestTimestamp(environment.algorand)
    // 60 tokens locked for eight days is worth one unit of governance power.
    await staking.send.setLock({
      args: { account: smallVoter.addr.toString(), asset, amount: 60_000_000n, expiration: now + 8n * DAY },
    })
    await guild.send.partiallyInitialize({ args: {}, ...send })
    const consensus = new LockedTokenGuildConsensusClient({
      algorand: environment.algorand,
      appId: deployment.consensus,
      defaultSender: environment.creator.addr,
      defaultSigner: environment.creator.signer,
    })
    expect(
      await consensus.proposalPower({
        args: { account: smallVoter.addr.toString(), evidence: new Uint8Array(), requiredThrough: now + 60n },
        staticFee: microAlgo(10_000n),
      }),
    ).toBe(1n)

    const lonely = await createProposal(environment, guild, [action(ACTION_LOCK_PLUGIN_SET)])
    await submitProposal(guild, lonely)
    expect((await consensus.getBallot({ args: { proposalId: lonely } })).requirements.minimumApprovals).toBe(2n)
    await vote(environment, guild, smallVoter, lonely, APPROVE)
    await endVoting(timeWarp)
    await finalizeProposal(guild, lonely)
    expect((await guild.getProposal({ args: { proposalId: lonely } })).status).toBe(30)

    // The floor can never rise above the approvals of the proposal that raises it, so it cannot lock the Guild out.
    const creatorPower = await consensus.proposalPower({
      args: { account: environment.creator.addr.toString(), evidence: new Uint8Array(), requiredThrough: 0n },
      staticFee: microAlgo(10_000n),
    })
    const unreachable = await createProposal(environment, guild, [
      consensusAction(lockedToken.setMinimumApprovals(creatorPower + 1_000n)),
    ])
    await submitProposal(guild, unreachable)
    await vote(environment, guild, environment.creator, unreachable, APPROVE)
    await endVoting(timeWarp)
    await finalizeProposal(guild, unreachable)
    await expectContractError(executeProposal(guild, unreachable), 'ERR:errGlko')
    await cancelProposal(guild, unreachable)
    expect((await consensus.state.global.getAll()).minimumApprovals).toBe(2n)

    await approveAndExecute(environment, timeWarp, guild, [consensusAction(lockedToken.setMinimumApprovals(1n))])
    expect((await consensus.state.global.getAll()).minimumApprovals).toBe(1n)

    const passable = await createProposal(environment, guild, [action(ACTION_LOCK_PLUGIN_SET)])
    await submitProposal(guild, passable)
    expect((await consensus.getBallot({ args: { proposalId: passable } })).requirements.minimumApprovals).toBe(1n)
    await vote(environment, guild, smallVoter, passable, APPROVE)
    await endVoting(timeWarp)
    await finalizeProposal(guild, passable)
    expect((await guild.getProposal({ args: { proposalId: passable } })).status).toBe(40)
  }, 240_000)

  test('rejects unsupported consensus actions and zero floors at proposal time', async () => {
    const { guild } = await mintLockedGuild(environment)
    await guild.send.partiallyInitialize({ args: {}, ...send })
    await expectContractError(createProposal(environment, guild, [consensusAction(consensusData(2))]), 'ERR:errGcac')
    await expectContractError(createProposal(environment, guild, [consensusAction(new Uint8Array())]), 'ERR:errGcac')
    await expectContractError(
      createProposal(environment, guild, [consensusAction(lockedToken.setMinimumApprovals(0n))]),
      'ERR:errGset',
    )
  }, 120_000)
})

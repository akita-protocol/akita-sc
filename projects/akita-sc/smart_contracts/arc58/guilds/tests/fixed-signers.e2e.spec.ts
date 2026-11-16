import { microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { TimeWarp } from '../../../../tests/utils/time'
import { FixedSignerGuildConsensusClient } from '../../../artifacts/arc58/guilds/consensus/fixed-signers/FixedSignerGuildConsensusClient'
import { MockGuildUpdateReplacementFactory } from '../../../artifacts/arc58/guilds/tests/MockGuildUpdateReplacementClient'
import {
  ABSTAIN,
  addFixedSignerMembersAction,
  APPROVE,
  balanceOf,
  consensusAction,
  consensusData,
  createProposal,
  deployFixedSignerConsensus,
  deployGuildTestEnvironment,
  setupGuildWallet,
  EMPTY_EVIDENCE,
  encodeAbi,
  endVoting,
  executeProposal,
  expectContractError,
  finalizeProposal,
  FIXED_SIGNERS,
  fixedSigner,
  fixedSignerConfig,
  fixedSignerConfiguration,
  latestTimestamp,
  MAX_APP_CALL_FEE,
  minBalanceOf,
  mintGuild,
  mintLockedGuild,
  proposalCostOf,
  REJECT,
  removeFixedSignerMemberAction,
  setFixedSignerMemberWeightAction,
  submitProposal,
  vote,
  VOTING_DURATION,
  type GuildTestEnvironment,
  PROPOSAL_MBR,
} from './test-helpers'
import type { GuildClient } from '../../../artifacts/arc58/guilds/core/GuildClient'

const fixture = algorandFixture()
let environment: GuildTestEnvironment
let timeWarp: TimeWarp
const send = { maxFee: MAX_APP_CALL_FEE, coverAppCallInnerTransactionFees: true, populateAppCallResources: true }

/** Every microALGO above the Guild's own storage must be a proposer reserve; nothing may be stranded. */
const expectNoStrandedBalance = async (guild: GuildClient) => {
  const balance = await balanceOf(environment, guild.appAddress)
  const minimum = await minBalanceOf(environment, guild.appAddress)
  expect(balance - minimum).toBe((await guild.state.global.reserved()) ?? 0n)
}

describe('Fixed-signer Guild consensus', () => {
  beforeAll(fixture.newScope, 120_000)
  beforeAll(async () => {
    environment = await deployGuildTestEnvironment(fixture.context.algorand, fixture.context.testAccount)
    timeWarp = new TimeWarp(environment.algorand)
  }, 180_000)
  afterAll(async () => timeWarp?.resetTimeWarp())

  test('configures and activates a production factory Guild with assigned signer weights', async () => {
    const member2 = await fixture.context.generateAccount({ initialFunds: microAlgo(3_000_000n) })
    const { guild, deployment } = await mintGuild(environment, FIXED_SIGNERS, fixedSignerConfig(6n))
    const configuration = fixedSignerConfiguration(2, [
      [environment.creator.addr.toString(), 5n],
      [member2.addr.toString(), 2n],
    ])
    const mbrPayment = await environment.algorand.createTransaction.payment({
      sender: environment.creator.addr,
      signer: environment.creator.signer,
      receiver: guild.appAddress,
      amount: microAlgo(59_900n),
    })
    await guild.send.configureConsensus({ args: { mbrPayment, config: configuration }, ...send })
    await guild.send.partiallyInitialize({ args: {}, ...send })

    const consensus = new FixedSignerGuildConsensusClient({
      algorand: environment.algorand,
      appId: deployment.consensus,
      defaultSender: environment.creator.addr,
      defaultSigner: environment.creator.signer,
    })
    const state = await consensus.state.global.getAll()
    expect(state.memberCount).toBe(2n)
    expect(state.eligiblePower).toBe(7n)
    expect(state.weightMode).toBe(2)
    await expectNoStrandedBalance(guild)
    const postActivationMbrPayment = await environment.algorand.createTransaction.payment({
      sender: environment.creator.addr,
      signer: environment.creator.signer,
      receiver: guild.appAddress,
      amount: microAlgo(31_400n),
    })
    await expectContractError(
      guild.send.configureConsensus({
        args: {
          mbrPayment: postActivationMbrPayment,
          config: fixedSignerConfiguration(2, [[member2.addr.toString(), 1n]]),
        },
      }),
      'ERR:errGdrf',
    )
  }, 180_000)

  test('changes assigned fixed-signer membership only through approved Guild actions after activation', async () => {
    const member2 = await fixture.context.generateAccount({ initialFunds: microAlgo(3_000_000n) })
    const { guild, deployment } = await mintGuild(environment, FIXED_SIGNERS, fixedSignerConfig(2n))
    const initialMbrPayment = await environment.algorand.createTransaction.payment({
      sender: environment.creator.addr,
      signer: environment.creator.signer,
      receiver: guild.appAddress,
      amount: microAlgo(31_400n),
    })
    await guild.send.configureConsensus({
      args: { mbrPayment: initialMbrPayment, config: fixedSignerConfiguration(2, [[environment.creator.addr.toString(), 3n]]) },
      ...send,
    })
    await guild.send.partiallyInitialize({ args: {}, ...send })

    const consensus = new FixedSignerGuildConsensusClient({
      algorand: environment.algorand,
      appId: deployment.consensus,
      defaultSender: environment.creator.addr,
      defaultSigner: environment.creator.signer,
    })
    const directPayment = await environment.algorand.createTransaction.payment({
      sender: environment.creator.addr,
      signer: environment.creator.signer,
      receiver: consensus.appAddress,
      amount: microAlgo(0n),
    })
    await expectContractError(
      consensus.send.applyConsensusAction({
        args: { mbrPayment: directPayment, proposalId: 0n, data: fixedSigner.setMemberWeight(environment.creator.addr.toString(), 4n) },
        ...send,
      }),
      'ERR:errGprp',
    )
    const proposalCostFor = (actions: Parameters<typeof createProposal>[2]) => proposalCostOf(guild, actions)
    await expectContractError(
      proposalCostFor([
        addFixedSignerMembersAction(2, [
          [member2.addr.toString(), 2n],
          [member2.addr.toString(), 3n],
        ]),
      ]),
      'ERR:errGmex',
    )
    await expectContractError(
      proposalCostFor([addFixedSignerMembersAction(1, [[member2.addr.toString(), 1n]])]),
      'ERR:errGtyp',
    )
    await expectContractError(proposalCostFor([removeFixedSignerMemberAction(member2.addr.toString())]), 'ERR:errGmmi')
    await expectContractError(
      proposalCostFor([setFixedSignerMemberWeightAction(environment.creator.addr.toString(), 1n)]),
      'ERR:errGthr',
    )
    await expectContractError(
      proposalCostFor([removeFixedSignerMemberAction(environment.creator.addr.toString())]),
      'ERR:errGthr',
    )
    await expectContractError(proposalCostFor([consensusAction(consensusData(42))]), 'ERR:errGcac')

    const approveAndExecute = async (actions: Parameters<typeof createProposal>[2]) => {
      const proposalId = await createProposal(environment, guild, actions)
      await submitProposal(guild, proposalId)
      await vote(environment, guild, environment.creator, proposalId, APPROVE)
      await endVoting(timeWarp)
      await finalizeProposal(guild, proposalId)
      const consensusBalanceBefore = await balanceOf(environment, consensus.appAddress)
      const guildBalanceBefore = await balanceOf(environment, guild.appAddress)
      await executeProposal(guild, proposalId)
      await expectNoStrandedBalance(guild)
      return {
        consensusDelta: (await balanceOf(environment, consensus.appAddress)) - consensusBalanceBefore,
        guildDelta: (await balanceOf(environment, guild.appAddress)) - guildBalanceBefore,
      }
    }

    const addAction = addFixedSignerMembersAction(2, [[member2.addr.toString(), 2n]])
    const costResult = await proposalCostFor([addAction])
    const expectedMbr = PROPOSAL_MBR + 400n * (7n + BigInt(addAction[1].length)) + 45_000n + 28_500n
    expect(costResult.mbr).toBe(expectedMbr)
    expect(costResult.total).toBe(expectedMbr)

    const addBalances = await approveAndExecute([addAction])
    expect(addBalances.consensusDelta).toBe(28_500n)
    // The Guild forwarded exactly the reserve it held for the new member's storage.
    expect(addBalances.guildDelta).toBe(-28_500n)
    expect((await consensus.state.global.getAll()).memberCount).toBe(2n)
    expect(
      await consensus.proposalPower({
        args: { account: member2.addr.toString(), evidence: EMPTY_EVIDENCE, requiredThrough: 0n },
      }),
    ).toBe(2n)

    await approveAndExecute([setFixedSignerMemberWeightAction(member2.addr.toString(), 4n)])
    expect(
      await consensus.proposalPower({
        args: { account: member2.addr.toString(), evidence: EMPTY_EVIDENCE, requiredThrough: 0n },
      }),
    ).toBe(4n)
    expect((await consensus.state.global.getAll()).eligiblePower).toBe(7n)

    // Removal frees exactly the storage the history checkpoint needs, so no funds move at all.
    const removeBalances = await approveAndExecute([removeFixedSignerMemberAction(environment.creator.addr.toString())])
    expect(removeBalances.consensusDelta).toBe(0n)
    expect(removeBalances.guildDelta).toBe(0n)
    const finalState = await consensus.state.global.getAll()
    expect(finalState.memberCount).toBe(1n)
    expect(finalState.eligiblePower).toBe(4n)
    expect(
      await consensus.proposalPower({
        args: { account: environment.creator.addr.toString(), evidence: EMPTY_EVIDENCE, requiredThrough: 0n },
      }),
    ).toBe(0n)
  }, 300_000)

  test('rejects a wallet-originated Guild update without an approved group', async () => {
    const { guild } = await mintLockedGuild(environment)
    const wallet = await setupGuildWallet(environment, guild)
    await guild.send.initialize({ args: {}, ...send })
    const replacementProgram = await new MockGuildUpdateReplacementFactory({
      algorand: environment.algorand,
      defaultSender: environment.creator.addr,
      defaultSigner: environment.creator.signer,
    }).appFactory.compile()
    await expect(wallet.send.updateGuild({
      args: {
        guild: guild.appId,
        approvalProgramFirst: replacementProgram.approvalProgram,
        approvalProgramSecond: new Uint8Array(),
        clearStateProgram: replacementProgram.clearStateProgram,
        version: 'governed-update',
      },
      ...send,
    })).rejects.toThrow()
    expect((await guild.state.global.getAll()).version).toBe('test')
  }, 120_000)

  test('counts equal members once, freezes threshold requirements, and resolves a complete ballot', async () => {
    const member2 = await fixture.context.generateAccount({ initialFunds: microAlgo(3_000_000n) })
    const member3 = await fixture.context.generateAccount({ initialFunds: microAlgo(3_000_000n) })
    const member4 = await fixture.context.generateAccount({ initialFunds: microAlgo(3_000_000n) })
    const outsider = await fixture.context.generateAccount({ initialFunds: microAlgo(3_000_000n) })
    const { host, consensus } = await deployFixedSignerConsensus(environment, 2n)
    const apply = (data: Uint8Array) => host.send.consensusAction({ args: { proposalId: 0n, data }, ...send })

    await apply(
      fixedSigner.addMembers(1, [
        [environment.creator.addr.toString(), 1n],
        [member2.addr.toString(), 1n],
        [member3.addr.toString(), 1n],
        [member4.addr.toString(), 1n],
      ]),
    )
    await host.send.validateActivation({ args: {}, ...send })
    expect(
      await consensus.proposalPower({
        args: { account: environment.creator.addr.toString(), evidence: EMPTY_EVIDENCE, requiredThrough: 0n },
      }),
    ).toBe(1n)
    expect(
      await consensus.proposalPower({
        args: { account: outsider.addr.toString(), evidence: EMPTY_EVIDENCE, requiredThrough: 0n },
      }),
    ).toBe(0n)
    const directPayment = await environment.algorand.createTransaction.payment({
      sender: environment.creator.addr,
      signer: environment.creator.signer,
      receiver: consensus.appAddress,
      amount: microAlgo(0n),
    })
    await expectContractError(
      consensus.send.applyConsensusAction({ args: { mbrPayment: directPayment, proposalId: 0n, data: fixedSigner.setThreshold(1n) }, ...send }),
      'ERR:errGprp',
    )

    const votingEnd = (await latestTimestamp(environment.algorand)) + VOTING_DURATION
    await host.send.openProposal({
      args: {
        proposalId: 1n,
        votingEnd,
        requirements: { participation: 100_000n, approval: 50_000n, minimumApprovals: 0n },
      },
      ...send,
    })
    // Lowering the threshold after a ballot opened must not loosen that ballot's frozen requirements.
    await apply(fixedSigner.setThreshold(1n))
    const cast = (voter: string, choice: number) =>
      host.send.vote({ args: { voter, proposalId: 1n, vote: choice, evidence: EMPTY_EVIDENCE }, ...send })
    await expectContractError(cast(member3.addr.toString(), 99), 'ERR:errGvot')
    for (const [voter, choice] of [
      [environment.creator.addr.toString(), APPROVE],
      [member2.addr.toString(), APPROVE],
      [member3.addr.toString(), REJECT],
      [member4.addr.toString(), ABSTAIN],
    ] as const) {
      await cast(voter, choice)
    }
    // voting again changes the vote: its power moves between columns and the receipt is reused
    const beforeChange = await consensus.getBallot({ args: { proposalId: 1n } })
    await cast(environment.creator.addr.toString(), REJECT)
    const changed = await consensus.getBallot({ args: { proposalId: 1n } })
    expect(changed.votes.approvals).toBe(beforeChange.votes.approvals - 1n)
    expect(changed.votes.rejections).toBe(beforeChange.votes.rejections + 1n)
    expect(changed.voteCount).toBe(beforeChange.voteCount)
    await cast(environment.creator.addr.toString(), APPROVE)
    expect((await consensus.getBallot({ args: { proposalId: 1n } })).votes).toEqual(beforeChange.votes)
    await expectContractError(cast(outsider.addr.toString(), APPROVE), 'ERR:errGpwr')

    const ballot = await consensus.getBallot({ args: { proposalId: 1n } })
    expect(ballot.eligiblePower).toBe(4n)
    expect(ballot.voteCount).toBe(4n)
    expect(ballot.requirements.minimumApprovals).toBe(2n)
    expect(ballot.votes).toEqual({ approvals: 2n, rejections: 1n, abstains: 1n })
    await endVoting(timeWarp)
    const resolved = await host.send.resolveProposal({ args: { proposalId: 1n }, ...send })
    expect(resolved.return).toEqual({
      approved: true,
      approvals: 2n,
      rejections: 1n,
      abstains: 1n,
      eligiblePower: 4n,
    })
    await expectContractError(
      host.send.cleanupBallot({ args: { proposalId: 1n, voters: [outsider.addr.toString()] }, ...send }),
      'ERR:errGvmg',
    )
    expect((await consensus.getBallot({ args: { proposalId: 1n } })).voteCount).toBe(4n)
    const hostBalanceBefore = await balanceOf(environment, host.appAddress)
    const firstCleanup = await host.send.cleanupBallot({
      args: { proposalId: 1n, voters: [environment.creator.addr.toString(), member2.addr.toString()] },
      ...send,
    })
    expect(firstCleanup.return).toBe(2n)
    const hostBalanceAfterFirst = await balanceOf(environment, host.appAddress)
    expect(hostBalanceAfterFirst - hostBalanceBefore).toBe(45_000n)
    expect((await consensus.getBallot({ args: { proposalId: 1n } })).voteCount).toBe(2n)
    const finalCleanup = await host.send.cleanupBallot({
      args: { proposalId: 1n, voters: [member3.addr.toString(), member4.addr.toString()] },
      ...send,
    })
    expect(finalCleanup.return).toBe(0n)
    expect((await balanceOf(environment, host.appAddress)) - hostBalanceAfterFirst).toBe(90_000n)
    await expectContractError(consensus.getBallot({ args: { proposalId: 1n } }), 'ERR:errGprp')
    await apply(fixedSigner.setThreshold(1n))
  }, 180_000)

  test('maintains assigned power across weight and membership changes and can lock configuration permanently', async () => {
    const member2 = await fixture.context.generateAccount({ initialFunds: microAlgo(3_000_000n) })
    const { host, consensus } = await deployFixedSignerConsensus(environment, 6n)
    const apply = (data: Uint8Array) => host.send.consensusAction({ args: { proposalId: 0n, data }, ...send })
    await apply(fixedSigner.setWeightMode(2))
    await apply(
      fixedSigner.addMembers(2, [
        [environment.creator.addr.toString(), 5n],
        [member2.addr.toString(), 2n],
      ]),
    )
    await host.send.validateActivation({ args: {}, ...send })
    expect((await consensus.state.global.getAll()).eligiblePower).toBe(7n)
    expect(
      await consensus.proposalPower({
        args: { account: environment.creator.addr.toString(), evidence: EMPTY_EVIDENCE, requiredThrough: 0n },
      }),
    ).toBe(5n)

    await apply(fixedSigner.setMemberWeight(member2.addr.toString(), 4n))
    expect((await consensus.state.global.getAll()).eligiblePower).toBe(9n)
    await expectContractError(apply(fixedSigner.addMembers(2, [[member2.addr.toString(), 1n]])), 'ERR:errGmex')
    await expectContractError(apply(fixedSigner.setMemberWeight(member2.addr.toString(), 0n)), 'ERR:errGwgt')
    await expectContractError(apply(fixedSigner.removeMember(member2.addr.toString())), 'ERR:errGthr')
    await expectContractError(apply(fixedSigner.setWeightMode(3)), 'ERR:errGwgt')
    await expectContractError(apply(fixedSigner.setWeightMode(1)), 'ERR:errGthr')
    await expectContractError(apply(fixedSigner.setThreshold(10n)), 'ERR:errGthr')
    await expectContractError(apply(fixedSigner.setThreshold(0n)), 'ERR:errGthr')
    await apply(fixedSigner.lockMembership())
    expect((await consensus.state.global.getAll()).membershipLocked).toBe(1n)
    await expectContractError(apply(fixedSigner.setThreshold(5n)), 'ERR:errGmlk')
    await expectContractError(apply(fixedSigner.addMembers(2, [[host.appAddress.toString(), 1n]])), 'ERR:errGmlk')
    // Locking is idempotent once the configuration is valid.
    await apply(fixedSigner.lockMembership())
  }, 180_000)

  test('rejects invalid constructor and activation thresholds', async () => {
    await expectContractError(deployFixedSignerConsensus(environment, 0n), 'ERR:errGthr')
    const { host } = await deployFixedSignerConsensus(environment, 2n)
    await host.send.consensusAction({
      args: { proposalId: 0n, data: fixedSigner.addMembers(1, [[environment.creator.addr.toString(), 1n]]) },
      ...send,
    })
    await expectContractError(host.send.validateActivation({ args: {}, ...send }), 'ERR:errGthr')
  }, 180_000)

  test('preserves ballot power through concurrent removals, additions, reweights, and mode changes', async () => {
    const member2 = await fixture.context.generateAccount({ initialFunds: microAlgo(3_000_000n) })
    const newcomer = await fixture.context.generateAccount({ initialFunds: microAlgo(3_000_000n) })
    const { host, consensus } = await deployFixedSignerConsensus(environment, 1n)
    const apply = (data: Uint8Array) => host.send.consensusAction({ args: { proposalId: 0n, data }, ...send })
    await apply(fixedSigner.setWeightMode(2))
    await apply(fixedSigner.addMembers(2, [[environment.creator.addr.toString(), 5n], [member2.addr.toString(), 2n]]))
    await host.send.validateActivation({ args: {}, ...send })
    const oldCreator = (await consensus.state.box.members.value(environment.creator.addr.toString()))!
    const oldMember = (await consensus.state.box.members.value(member2.addr.toString()))!
    const votingEnd = (await latestTimestamp(environment.algorand)) + 100n
    const open = (proposalId: bigint) => host.send.openProposal({
      args: { proposalId, votingEnd, requirements: { participation: 0n, approval: 50_000n, minimumApprovals: 1n } }, ...send,
    })
    await open(1n)
    expect(await consensus.historyMbr()).toBe(25_300n)
    expect(await consensus.consensusActionMbr({ args: { data: fixedSigner.setMemberWeight(environment.creator.addr.toString(), 9n) } })).toBe(25_300n)
    expect(await consensus.consensusActionMbr({ args: { data: fixedSigner.removeMember(member2.addr.toString()) } })).toBe(0n)
    await apply(fixedSigner.setMemberWeight(environment.creator.addr.toString(), 9n))
    await apply(fixedSigner.removeMember(member2.addr.toString()))
    // Reuse the vacated weight slot; its unused storage reserve must be refunded to the caller.
    const before = await balanceOf(environment, consensus.appAddress)
    await apply(fixedSigner.addMembers(2, [[newcomer.addr.toString(), 3n]]))
    expect((await balanceOf(environment, consensus.appAddress)) - before).toBe(25_300n)
    await apply(fixedSigner.setWeightMode(1))
    await open(2n)
    const cast = (voter: string, proposalId: bigint, evidence = EMPTY_EVIDENCE) => host.send.vote({
      args: { voter, proposalId, vote: APPROVE, evidence }, ...send,
    })
    await expectContractError(cast(newcomer.addr.toString(), 1n), 'ERR:errGpwr')
    await expectContractError(cast(environment.creator.addr.toString(), 1n, encodeAbi('uint64', oldCreator.since + 100n)), 'ERR:errGpwr')
    await cast(environment.creator.addr.toString(), 1n, encodeAbi('uint64', oldCreator.since))
    await cast(member2.addr.toString(), 1n, encodeAbi('uint64', oldMember.since))
    // a repeat vote replaces the earlier one with the same snapshot power: the totals do not double
    await cast(member2.addr.toString(), 1n, encodeAbi('uint64', oldMember.since))
    expect((await consensus.getBallot({ args: { proposalId: 1n } })).votes.approvals).toBe(7n)
    await cast(environment.creator.addr.toString(), 2n)
    await cast(newcomer.addr.toString(), 2n)
    await expectContractError(cast(member2.addr.toString(), 2n, encodeAbi('uint64', oldMember.since)), 'ERR:errGpwr')
    const current = await consensus.getBallot({ args: { proposalId: 2n } })
    expect(current.votes.approvals).toBe(2n)
    expect(current.eligiblePower).toBe(2n)
    expect((await consensus.state.global.getAll()).activeBallots).toBe(2n)
  }, 180_000)
})

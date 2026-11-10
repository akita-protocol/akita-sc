import { microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import type { AddressWithTransactionSigner } from '@algorandfoundation/algokit-utils/types/account'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { TimeWarp } from '../../../../tests/utils/time'
import type { GuildClient } from '../../../artifacts/arc58/guilds/core/GuildClient'
import {
  APPROVE,
  createProposal,
  deployGuildTestEnvironment,
  endVoting,
  executeProposal,
  expectContractError,
  finalizeProposal,
  FIXED_SIGNERS,
  fixedSignerConfig,
  fixedSignerConfiguration,
  MAX_APP_CALL_FEE,
  mintGuild,
  proposalSettings,
  REJECT,
  setLimitAction,
  submitProposal,
  vote,
  type GuildTestEnvironment,
} from './test-helpers'

const fixture = algorandFixture()
let environment: GuildTestEnvironment
let timeWarp: TimeWarp
let member2: AddressWithTransactionSigner
let member3: AddressWithTransactionSigner
const send = { maxFee: MAX_APP_CALL_FEE, coverAppCallInnerTransactionFees: true, populateAppCallResources: true }

const PROPOSAL_APPROVED = 40n
const PROPOSAL_REJECTED = 30n
const PROPOSAL_EXECUTED = 50n

/** An active fixed-signer Guild of three equal members that needs two approvals (and half the decisive votes). */
const threeMemberGuild = async (): Promise<GuildClient> => {
  const { guild } = await mintGuild(environment, FIXED_SIGNERS, fixedSignerConfig(2n), proposalSettings())
  const config = fixedSignerConfiguration(1, [
    [environment.creator.addr.toString(), 1n],
    [member2.addr.toString(), 1n],
    [member3.addr.toString(), 1n],
  ])
  const mbr = await guild.consensusConfigurationMbr({ args: { config }, staticFee: MAX_APP_CALL_FEE })
  const mbrPayment = await environment.algorand.createTransaction.payment({
    sender: environment.creator.addr,
    signer: environment.creator.signer,
    receiver: guild.appAddress,
    amount: microAlgo(mbr),
  })
  await guild.send.configureConsensus({ args: { mbrPayment, config }, ...send })
  await guild.send.partiallyInitialize({ args: {}, ...send })
  return guild
}

const openProposal = async (guild: GuildClient, limit: bigint) => {
  const proposalId = await createProposal(environment, guild, [setLimitAction(limit)])
  await submitProposal(guild, proposalId)
  return proposalId
}

const statusOf = async (guild: GuildClient, proposalId: bigint) =>
  BigInt((await guild.getProposal({ args: { proposalId } })).status)

// A vote may close before its end once the members who have not voted could no longer change the result.
describe('Guild early close and vote changes', () => {
  beforeAll(fixture.newScope, 120_000)
  beforeAll(async () => {
    environment = await deployGuildTestEnvironment(fixture.context.algorand, fixture.context.testAccount)
    timeWarp = new TimeWarp(environment.algorand)
    member2 = await fixture.context.generateAccount({ initialFunds: microAlgo(5_000_000n) })
    member3 = await fixture.context.generateAccount({ initialFunds: microAlgo(5_000_000n) })
  }, 180_000)
  afterAll(async () => timeWarp?.resetTimeWarp())

  test('an approval that the last member cannot overturn closes early and runs', async () => {
    const guild = await threeMemberGuild()
    const proposalId = await openProposal(guild, 11n)

    await vote(environment, guild, environment.creator, proposalId, APPROVE)
    // one of the two approvals needed: the vote stays open
    await expectContractError(finalizeProposal(guild, proposalId), 'ERR:errGopn')

    await vote(environment, guild, member2, proposalId, APPROVE)
    await finalizeProposal(guild, proposalId)
    expect(await statusOf(guild, proposalId)).toBe(PROPOSAL_APPROVED)

    // closing ends the vote: nobody can vote or change a vote after it
    await expectContractError(vote(environment, guild, member3, proposalId, REJECT), 'ERR:errGpst')
    await executeProposal(guild, proposalId)
    expect(await statusOf(guild, proposalId)).toBe(PROPOSAL_EXECUTED)
    expect(await guild.state.global.proposalActionLimit()).toBe(11n)
  })

  test('a rejection that the last member cannot overturn closes early', async () => {
    const guild = await threeMemberGuild()
    const proposalId = await openProposal(guild, 10n)

    await vote(environment, guild, member2, proposalId, REJECT)
    await expectContractError(finalizeProposal(guild, proposalId), 'ERR:errGopn')
    await vote(environment, guild, member3, proposalId, REJECT)
    // even if the creator approves, one approval is short of the two needed
    await finalizeProposal(guild, proposalId)
    expect(await statusOf(guild, proposalId)).toBe(PROPOSAL_REJECTED)
  })

  test('a member changes their vote, and early close counts the vote as it stands', async () => {
    const guild = await threeMemberGuild()
    const proposalId = await openProposal(guild, 9n)

    await vote(environment, guild, environment.creator, proposalId, APPROVE)
    await vote(environment, guild, member2, proposalId, APPROVE)
    // changing a vote is free: the receipt is reused
    expect(await guild.voteCost({ args: { proposalId, voter: member2.addr.toString() }, staticFee: MAX_APP_CALL_FEE })).toBe(0n)
    await vote(environment, guild, member2, proposalId, REJECT)
    const ballot = (await guild.send.getBallot({ args: { proposalId }, ...send })).return!
    expect(ballot.votes).toEqual({ approvals: 1n, rejections: 1n, abstains: 0n })
    expect(ballot.voteCount).toBe(2n)

    // undecided again: member3 could still approve
    await expectContractError(finalizeProposal(guild, proposalId), 'ERR:errGopn')
    await vote(environment, guild, member2, proposalId, APPROVE)
    await finalizeProposal(guild, proposalId)
    expect(await statusOf(guild, proposalId)).toBe(PROPOSAL_APPROVED)
  })

  test('an undecided vote still resolves when its time ends', async () => {
    const guild = await threeMemberGuild()
    const proposalId = await openProposal(guild, 8n)

    await vote(environment, guild, environment.creator, proposalId, APPROVE)
    await expectContractError(finalizeProposal(guild, proposalId), 'ERR:errGopn')
    await endVoting(timeWarp)
    await finalizeProposal(guild, proposalId)
    expect(await statusOf(guild, proposalId)).toBe(PROPOSAL_REJECTED)
  })
})

// Storage and fees paid by someone other than the caller (a sponsor or paymaster). The Guild takes
// the payment from anyone, keeps the authority with the caller, and returns every refund to the
// account that paid: a proposal records its `payer`, and a vote paid by someone else keeps a payer
// record until the receipt is cleaned up (the payer change of 2026-11-15).
import { microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import type { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { TimeWarp } from '../../../../tests/utils/time'
import type { GuildClient } from '../../../artifacts/arc58/guilds/core/GuildClient'
import { FixedSignerGuildConsensusFactory } from '../../../artifacts/arc58/guilds/consensus/fixed-signers/FixedSignerGuildConsensusClient'
import { errGuildCreatorOnly, errGuildInvalidPayment, errGuildPayerOnly } from '../core/errors'
import {
  action,
  ACTION_LOCK_PLUGIN_SET,
  APPROVE,
  balanceOf,
  BALLOT_MBR,
  cleanupProposal,
  CONSENSUS_ACTION_SETTINGS_MBR,
  createProposal,
  deployGuildTestEnvironment,
  EMPTY_EVIDENCE,
  endVoting,
  executeProposal,
  expectContractError,
  finalizeProposal,
  FIXED_SIGNERS,
  fixedSignerConfig,
  fixedSignerConfiguration,
  latestTimestamp,
  LOCKED_TOKEN_ACTION,
  MAX_APP_CALL_FEE,
  minBalanceOf,
  mintGuild,
  mintLockedGuild,
  PAYER_RECORD_MBR,
  proposalCostOf,
  proposalSettings,
  REJECT,
  setConsensusActionSettingsAction,
  setLimitAction,
  submitProposal,
  uploadConsensusProgram,
  vote,
  VOTE_MBR,
  ZERO_CID,
  type GuildTestEnvironment,
} from './test-helpers'

const fixture = algorandFixture()
let environment: GuildTestEnvironment
let timeWarp: TimeWarp
const send = { maxFee: MAX_APP_CALL_FEE, coverAppCallInnerTransactionFees: true, populateAppCallResources: true }
/** The flat fee of the sponsor's own payment transaction; the sponsor pays nothing else. */
const PAYMENT_FEE = 1_000n

/** Every microALGO above the Guild's own storage must be a payer's reserve; nothing may be stranded. */
const expectNoStrandedBalance = async (guild: GuildClient) => {
  const balance = await balanceOf(environment, guild.appAddress)
  const minimum = await minBalanceOf(environment, guild.appAddress)
  expect(balance - minimum).toBe((await guild.state.global.reserved()) ?? 0n)
}

const newSponsor = () => fixture.context.generateAccount({ initialFunds: microAlgo(20_000_000n) })

describe('Guild payments from someone other than the caller', () => {
  beforeAll(fixture.newScope, 120_000)
  beforeAll(async () => {
    environment = await deployGuildTestEnvironment(fixture.context.algorand, fixture.context.testAccount)
    timeWarp = new TimeWarp(environment.algorand)
  }, 180_000)
  afterAll(async () => timeWarp?.resetTimeWarp())

  test('a sponsor funds a draft and gets all of it back when the proposer deletes it', async () => {
    const sponsor = await newSponsor()
    const { guild } = await mintLockedGuild(environment)
    await guild.send.partiallyInitialize({ args: {}, ...send })

    const actions = [setLimitAction(3n)]
    const cost = await proposalCostOf(guild, actions)
    const sponsorStart = await balanceOf(environment, sponsor.addr)
    const proposalId = await createProposal(environment, guild, actions, EMPTY_EVIDENCE, environment.creator, sponsor)
    expect(sponsorStart - (await balanceOf(environment, sponsor.addr))).toBe(cost.total + PAYMENT_FEE)

    const proposal = await guild.getProposal({ args: { proposalId } })
    expect(proposal.creator).toBe(environment.creator.addr.toString())
    expect(proposal.payer).toBe(sponsor.addr.toString())
    expect(proposal.feeTokenPayer).toBe(environment.creator.addr.toString())
    expect(proposal.feesPaid).toBe(cost.total)

    // paying for a draft gives no authority over it
    const sponsorGuild = guild.clone({ defaultSender: sponsor.addr, defaultSigner: sponsor.signer })
    await expectContractError(sponsorGuild.send.deleteProposal({ args: { proposalId }, ...send }), `ERR:${errGuildCreatorOnly}`)

    const sponsorBefore = await balanceOf(environment, sponsor.addr)
    const proposerBefore = await balanceOf(environment, environment.creator.addr)
    await guild.send.deleteProposal({ args: { proposalId }, ...send })
    expect((await balanceOf(environment, sponsor.addr)) - sponsorBefore).toBe(cost.total)
    // the proposer only paid the fee of the delete call
    expect(await balanceOf(environment, environment.creator.addr)).toBeLessThan(proposerBefore)
    expect(await guild.state.global.reserved()).toBe(0n)
    await expectNoStrandedBalance(guild)
  }, 180_000)

  test('a top-up comes from the account that funded the draft, whoever proposed it', async () => {
    const sponsor = await newSponsor()
    const { guild } = await mintLockedGuild(environment)
    await guild.send.partiallyInitialize({ args: {}, ...send })

    const actions = [setLimitAction(3n)]
    const larger = [setLimitAction(3n), action(ACTION_LOCK_PLUGIN_SET)]
    const cost = await proposalCostOf(guild, actions)
    const largerCost = await proposalCostOf(guild, larger)
    expect(largerCost.total).toBeGreaterThan(cost.total)
    const proposalId = await createProposal(environment, guild, actions, EMPTY_EVIDENCE, environment.creator, sponsor)

    const topUp = (from: TransactionSignerAccount) =>
      environment.algorand.createTransaction.payment({
        sender: from.addr,
        signer: from.signer,
        receiver: guild.appAddress,
        amount: microAlgo(largerCost.total - cost.total),
      })
    const edit = async (from: TransactionSignerAccount) =>
      guild
        .newGroup()
        .opUp({ args: {}, note: 'edit-1', maxFee: MAX_APP_CALL_FEE })
        .opUp({ args: {}, note: 'edit-2', maxFee: MAX_APP_CALL_FEE })
        .opUp({ args: {}, note: 'edit-3', maxFee: MAX_APP_CALL_FEE })
        .editProposalWithPayment({
          args: {
            payment: { txn: await topUp(from), signer: from.signer },
            id: proposalId,
            cid: ZERO_CID,
            actions: larger,
            evidence: EMPTY_EVIDENCE,
          },
          maxFee: MAX_APP_CALL_FEE,
        })
        .send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true })

    // the proposer cannot mix their own money into a draft someone else funded
    await expectContractError(edit(environment.creator), `ERR:${errGuildPayerOnly}`)
    await edit(sponsor)
    const proposal = await guild.getProposal({ args: { proposalId } })
    expect(proposal.payer).toBe(sponsor.addr.toString())
    expect(proposal.feesPaid).toBe(largerCost.total)

    const sponsorBefore = await balanceOf(environment, sponsor.addr)
    await guild.send.deleteProposal({ args: { proposalId }, ...send })
    expect((await balanceOf(environment, sponsor.addr)) - sponsorBefore).toBe(largerCost.total)
    await expectNoStrandedBalance(guild)
  }, 180_000)

  test('a rejected sponsored proposal returns its reserve, ballot storage and vote receipt to the sponsor', async () => {
    const sponsor = await newSponsor()
    const outsider = await fixture.context.generateAccount({ initialFunds: microAlgo(3_000_000n) })
    const voter2 = await fixture.context.generateAccount({ initialFunds: microAlgo(3_000_000n) })
    const { guild, staking, asset } = await mintLockedGuild(environment)
    const now = await latestTimestamp(environment.algorand)
    await staking.send.setLock({
      args: { account: voter2.addr.toString(), asset, amount: 1_000_000_000n, expiration: now + 366n * 86_400n },
    })
    await guild.send.partiallyInitialize({ args: {}, ...send })

    // this action reserves storage for its execution, so a rejected proposal has a reserve to return
    const actions = [setConsensusActionSettingsAction(LOCKED_TOKEN_ACTION.SetMinimumApprovals, proposalSettings())]
    const proposalId = await createProposal(environment, guild, actions, EMPTY_EVIDENCE, environment.creator, sponsor)
    await submitProposal(guild, proposalId)
    const held = (await guild.getProposal({ args: { proposalId } })).feesPaid
    expect(held).toBe(CONSENSUS_ACTION_SETTINGS_MBR)

    // the sponsor pays the proposer's vote, with the storage of the record that remembers them
    const sponsorBeforeVote = await balanceOf(environment, sponsor.addr)
    await vote(environment, guild, environment.creator, proposalId, REJECT, EMPTY_EVIDENCE, sponsor)
    expect(sponsorBeforeVote - (await balanceOf(environment, sponsor.addr))).toBe(VOTE_MBR + PAYER_RECORD_MBR + PAYMENT_FEE)
    // a sponsored first vote must carry the payer record's storage
    const bare = await environment.algorand.createTransaction.payment({
      sender: sponsor.addr,
      signer: sponsor.signer,
      receiver: guild.appAddress,
      amount: microAlgo(VOTE_MBR),
    })
    const voter2Guild = guild.clone({ defaultSender: voter2.addr, defaultSigner: voter2.signer })
    await expectContractError(
      voter2Guild
        .newGroup()
        .opUp({ args: {}, maxFee: MAX_APP_CALL_FEE })
        .voteProposal({
          args: { mbrPayment: { txn: bare, signer: sponsor.signer }, proposalId, vote: REJECT, evidence: EMPTY_EVIDENCE },
          maxFee: MAX_APP_CALL_FEE,
        })
        .send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true }),
      `ERR:${errGuildInvalidPayment}`,
    )
    // changing a sponsored vote costs nothing and keeps its payer
    await vote(environment, guild, environment.creator, proposalId, REJECT)
    await vote(environment, guild, voter2, proposalId, REJECT)
    await endVoting(timeWarp)

    const sponsorBeforeFinalize = await balanceOf(environment, sponsor.addr)
    await finalizeProposal(guild, proposalId)
    expect((await balanceOf(environment, sponsor.addr)) - sponsorBeforeFinalize).toBe(held)
    expect(await guild.state.global.reserved()).toBe(0n)

    // A third party runs the cleanup so no refund recipient pays a fee in the measured window.
    const sponsorBefore = await balanceOf(environment, sponsor.addr)
    const proposerBefore = await balanceOf(environment, environment.creator.addr)
    const voter2Before = await balanceOf(environment, voter2.addr)
    const outsiderGuild = guild.clone({ defaultSender: outsider.addr, defaultSigner: outsider.signer })
    expect(await cleanupProposal(outsiderGuild, proposalId, [environment.creator.addr.toString(), voter2.addr.toString()])).toBe(0n)
    expect((await balanceOf(environment, sponsor.addr)) - sponsorBefore).toBe(VOTE_MBR + PAYER_RECORD_MBR + BALLOT_MBR)
    expect((await balanceOf(environment, environment.creator.addr)) - proposerBefore).toBe(0n)
    expect((await balanceOf(environment, voter2.addr)) - voter2Before).toBe(VOTE_MBR)
    await expectNoStrandedBalance(guild)
  }, 240_000)

  test('an executed sponsored proposal settles with the sponsor', async () => {
    const sponsor = await newSponsor()
    const { guild } = await mintLockedGuild(environment)
    await guild.send.partiallyInitialize({ args: {}, ...send })

    const actions = [setConsensusActionSettingsAction(LOCKED_TOKEN_ACTION.SetMinimumApprovals, proposalSettings())]
    const proposalId = await createProposal(environment, guild, actions, EMPTY_EVIDENCE, environment.creator, sponsor)
    await submitProposal(guild, proposalId)
    await vote(environment, guild, environment.creator, proposalId, APPROVE, EMPTY_EVIDENCE, sponsor)
    await endVoting(timeWarp)
    await finalizeProposal(guild, proposalId)

    // execution spends the whole reserve on the settings box, so nothing comes back at this step
    const sponsorBeforeExecute = await balanceOf(environment, sponsor.addr)
    await executeProposal(guild, proposalId)
    expect((await balanceOf(environment, sponsor.addr)) - sponsorBeforeExecute).toBe(0n)
    expect(await guild.state.global.reserved()).toBe(0n)

    const sponsorBefore = await balanceOf(environment, sponsor.addr)
    expect(await cleanupProposal(guild, proposalId, [environment.creator.addr.toString()])).toBe(0n)
    expect((await balanceOf(environment, sponsor.addr)) - sponsorBefore).toBe(VOTE_MBR + PAYER_RECORD_MBR + BALLOT_MBR)
    await expectNoStrandedBalance(guild)
  }, 240_000)

  test('a sponsor can pay for a new Guild, its member list and a consensus program upload', async () => {
    const sponsor = await newSponsor()
    const founder = await fixture.context.generateAccount({ initialFunds: microAlgo(5_000_000n) })
    const settings = proposalSettings()

    const sponsorStart = await balanceOf(environment, sponsor.addr)
    const founderStart = await balanceOf(environment, founder.addr)
    const { guild } = await mintGuild(environment, FIXED_SIGNERS, fixedSignerConfig(1n), settings, founder, undefined, sponsor)
    const mintCost = await environment.factory.cost({ args: { consensusName: FIXED_SIGNERS }, staticFee: MAX_APP_CALL_FEE })
    expect(sponsorStart - (await balanceOf(environment, sponsor.addr))).toBe(mintCost + PAYMENT_FEE)
    // the founder only paid transaction fees, and is the Guild's creator
    expect(founderStart - (await balanceOf(environment, founder.addr))).toBeLessThan(mintCost)
    expect(await guild.state.global.creator()).toBe(founder.addr.toString())

    const memberMbr = await environment.algorand.createTransaction.payment({
      sender: sponsor.addr,
      signer: sponsor.signer,
      receiver: guild.appAddress,
      amount: microAlgo(31_400n),
    })
    const sponsorBeforeMembers = await balanceOf(environment, sponsor.addr)
    await guild.send.configureConsensus({
      args: {
        mbrPayment: { txn: memberMbr, signer: sponsor.signer },
        config: fixedSignerConfiguration(1, [[founder.addr.toString(), 1n]]),
      },
      ...send,
    })
    expect(sponsorBeforeMembers - (await balanceOf(environment, sponsor.addr))).toBe(31_400n + PAYMENT_FEE)
    await guild.send.partiallyInitialize({ args: {}, ...send })
    await expectNoStrandedBalance(guild)

    // anyone may register a consensus program, and anyone may pay for its storage
    const program = (
      await new FixedSignerGuildConsensusFactory({
        algorand: environment.algorand,
        defaultSender: founder.addr,
        defaultSigner: founder.signer,
      }).appFactory.compile()
    ).approvalProgram
    const name = `sponsored-${Date.now()}`
    const funding = await environment.consensusFactory.programFunding({ args: { programName: name, size: program.length } })
    const sponsorBeforeUpload = await balanceOf(environment, sponsor.addr)
    await uploadConsensusProgram(environment, name, program, founder, sponsor)
    expect(sponsorBeforeUpload - (await balanceOf(environment, sponsor.addr))).toBe(funding + PAYMENT_FEE)
  }, 240_000)
})

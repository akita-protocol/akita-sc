import { microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import type { TransactionSignerAccount as AddressWithTransactionSigner } from '@algorandfoundation/algokit-utils/types/account'
import algosdk from 'algosdk'
import { beforeAll, describe, expect, test } from 'vitest'
import { FixedSignerGuildConsensusClient } from '../../../artifacts/arc58/guilds/consensus/fixed-signers/FixedSignerGuildConsensusClient'
import type { GuildClient } from '../../../artifacts/arc58/guilds/core/GuildClient'
import {
  APPROVE,
  BALLOT_MBR,
  CHAT_STEWARD_MBR,
  chatKey,
  createProposal,
  deployGuildTestEnvironment,
  executeProposal,
  expectContractError,
  finalizeProposal,
  FIXED_SIGNER_SNAPSHOT_MBR,
  FIXED_SIGNERS,
  fixedSignerConfig,
  fixedSignerConfiguration,
  MAX_APP_CALL_FEE,
  minBalanceOf,
  mintGuild,
  proposalCostOf,
  proposalSettings,
  setChatStewardAction,
  setupGuildWallet,
  submitProposal,
  upgradeAppAction,
  vote,
  VOTE_MBR,
  type GuildAction,
  type GuildTestEnvironment,
} from './test-helpers'

const fixture = algorandFixture()
let environment: GuildTestEnvironment
let member2: AddressWithTransactionSigner
let member3: AddressWithTransactionSigner
const send = { maxFee: MAX_APP_CALL_FEE, coverAppCallInnerTransactionFees: true, populateAppCallResources: true }

const CHAT = 'group:akita-builders'
const ZERO = algosdk.ALGORAND_ZERO_ADDRESS_STRING
const raw = (address: string) => algosdk.decodeAddress(address).publicKey

/** A fixed-signer Guild of three equal members that needs two approvals; `active` ends creator control. */
const threeMemberGuild = async (active = true) => {
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
  if (active) {
    await setupGuildWallet(environment, guild)
    await guild.send.initialize({ args: {}, ...send })
  }
  const consensus = new FixedSignerGuildConsensusClient({
    algorand: environment.algorand,
    appId: (await guild.state.global.consensus())!,
    defaultSender: environment.creator.addr,
    defaultSigner: environment.creator.signer,
  })
  return { guild, consensus }
}

/** Two of the three members approve, which decides the vote, and the proposal runs. */
const pass = async (guild: GuildClient, actions: GuildAction[]) => {
  const proposalId = await createProposal(environment, guild, actions)
  await submitProposal(guild, proposalId)
  await vote(environment, guild, environment.creator, proposalId, APPROVE)
  await vote(environment, guild, member2, proposalId, APPROVE)
  await finalizeProposal(guild, proposalId)
  await executeProposal(guild, proposalId)
  return proposalId
}

const stewardOf = async (consensus: FixedSignerGuildConsensusClient, groupId = CHAT) =>
  consensus.getChatSteward({ args: { chat: chatKey(groupId) } })

const guard = (consensus: FixedSignerGuildConsensusClient, groupId: string, steward: string) =>
  consensus.send.assertChatStewardAuthority({ args: { chat: chatKey(groupId), steward: raw(steward) }, ...send })

// A chat steward is the agent that acts for a Guild in one chat. The members name it by vote, and the
// first one they name seals the Guild's program for good.
describe('Guild chat steward', () => {
  beforeAll(fixture.newScope, 120_000)
  beforeAll(async () => {
    environment = await deployGuildTestEnvironment(fixture.context.algorand, fixture.context.testAccount)
    member2 = await fixture.context.generateAccount({ initialFunds: microAlgo(5_000_000n) })
    member3 = await fixture.context.generateAccount({ initialFunds: microAlgo(5_000_000n) })
  }, 180_000)

  test('members vote a steward in: the chat gets its box, the Guild is sealed, and the guard passes', async () => {
    const { guild, consensus } = await threeMemberGuild()
    const steward = algosdk.generateAccount().addr.toString()
    const action = setChatStewardAction(CHAT, steward)

    expect(await guild.state.global.chatLock()).toBe(0n)
    expect(await stewardOf(consensus)).toBe(ZERO)
    await expectContractError(guard(consensus, CHAT, steward), 'ERR:errGcst')

    // the first steward of a chat pays for the box that names it; a revocation, the same size on chain, stores nothing
    const withoutBox = await proposalCostOf(guild, [setChatStewardAction(CHAT, ZERO)])
    const cost = await proposalCostOf(guild, [action])
    expect(cost.mbr - withoutBox.mbr).toBe(CHAT_STEWARD_MBR)

    const before = await minBalanceOf(environment, consensus.appAddress)
    await pass(guild, [action])

    expect(await guild.state.global.chatLock()).toBe(1n)
    expect(await stewardOf(consensus)).toBe(steward)
    // the box is the raw address under `c || SHA-256(group ID)`, which is what an off-chain reader checks
    const box = await environment.algorand.app.getBoxValue(consensus.appId, new Uint8Array([0x63, ...chatKey(CHAT)]))
    expect(box).toEqual(raw(steward))
    // beside the box, the proposal stored its own ballot, member snapshot and two votes
    expect((await minBalanceOf(environment, consensus.appAddress)) - before).toBe(
      BALLOT_MBR + FIXED_SIGNER_SNAPSHOT_MBR + 2n * VOTE_MBR + CHAT_STEWARD_MBR,
    )

    await guard(consensus, CHAT, steward)
    await expectContractError(guard(consensus, CHAT, member2.addr.toString()), 'ERR:errGcst')
    await expectContractError(guard(consensus, 'group:another-chat', steward), 'ERR:errGcst')
  }, 300_000)

  test('a sealed Guild refuses every program upgrade', async () => {
    const { guild } = await threeMemberGuild()
    const upgrade = upgradeAppAction(guild.appId, new Uint8Array(32).fill(7), [new Uint8Array(32).fill(9)], 1n, 1_000_000n)

    // before the seal an upgrade can at least be proposed
    await createProposal(environment, guild, [upgrade])

    await pass(guild, [setChatStewardAction(CHAT, algosdk.generateAccount().addr.toString())])
    await expectContractError(createProposal(environment, guild, [upgrade]), 'ERR:errGcsl')
    await expectContractError(
      guild.send.update.update({ args: { newVersion: 'after-seal' }, ...send }),
      'ERR:errGcsl',
    )
  }, 300_000)

  test('a new steward replaces the old one for free, and revoking returns the storage but not the seal', async () => {
    const { guild, consensus } = await threeMemberGuild()
    const first = algosdk.generateAccount().addr.toString()
    const second = algosdk.generateAccount().addr.toString()
    await pass(guild, [setChatStewardAction(CHAT, first)])

    // the box exists already, so a change of steward costs what a revocation does: no new storage
    const withoutBox = await proposalCostOf(guild, [setChatStewardAction(CHAT, ZERO)])
    expect((await proposalCostOf(guild, [setChatStewardAction(CHAT, second)])).mbr).toBe(withoutBox.mbr)
    await pass(guild, [setChatStewardAction(CHAT, second)])
    expect(await stewardOf(consensus)).toBe(second)
    await expectContractError(guard(consensus, CHAT, first), 'ERR:errGcst')
    await guard(consensus, CHAT, second)

    // a second chat is a second box
    expect((await proposalCostOf(guild, [setChatStewardAction('group:other', first)])).mbr - withoutBox.mbr).toBe(CHAT_STEWARD_MBR)

    const stored = await minBalanceOf(environment, consensus.appAddress)
    await pass(guild, [setChatStewardAction(CHAT, ZERO)])
    expect(await stewardOf(consensus)).toBe(ZERO)
    await expectContractError(guard(consensus, CHAT, second), 'ERR:errGcst')
    await expect(
      environment.algorand.app.getBoxValue(consensus.appId, new Uint8Array([0x63, ...chatKey(CHAT)])),
    ).rejects.toThrow()
    // the revoking proposal stored its own ballot, member snapshot and two votes, and the steward's box is gone
    expect((await minBalanceOf(environment, consensus.appAddress)) - stored).toBe(
      BALLOT_MBR + FIXED_SIGNER_SNAPSHOT_MBR + 2n * VOTE_MBR - CHAT_STEWARD_MBR,
    )
    // revoking the last steward does not unseal the Guild
    expect(await guild.state.global.chatLock()).toBe(1n)
  }, 300_000)

  test('only a vote of an active Guild names a steward', async () => {
    const steward = algosdk.generateAccount().addr.toString()
    const action = setChatStewardAction(CHAT, steward)

    // the creator cannot name one during setup, when proposals run without a ballot
    const draft = await threeMemberGuild(false)
    await expectContractError(createProposal(environment, draft.guild, [action]), 'ERR:errGacn')

    // nobody but the paired Guild reaches the consensus app's steward box
    const { guild, consensus } = await threeMemberGuild()
    const mbrPayment = await environment.algorand.createTransaction.payment({
      sender: environment.creator.addr,
      signer: environment.creator.signer,
      receiver: consensus.appAddress,
      amount: microAlgo(CHAT_STEWARD_MBR),
    })
    await expectContractError(consensus.send.applyChatSteward({ args: { mbrPayment, data: action[1] }, ...send }), 'ERR:errGprp')

    // data that is not exactly (byte[32],address) is refused when the proposal is written
    await expectContractError(createProposal(environment, guild, [[action[0], action[1].slice(0, 63)]]), 'ERR:errGcst')
    expect(await guild.state.global.chatLock()).toBe(0n)
  }, 300_000)
})

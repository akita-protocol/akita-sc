import { microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { beforeAll, describe, expect, test } from 'vitest'
import {
  buildGuildExecution,
  CallerType,
  GuildPluginSDK,
  guildExecutionRecord,
  newWallet,
  PayPluginSDK,
  sendGuildExecution,
  WalletSDK,
} from 'akita-sdk/wallet'
import { deployEscrowFactory } from '../../../../tests/fixtures/escrow'
import { deployGuildPlugin } from '../../../../tests/fixtures/plugins/guild'
import { deployPayPlugin } from '../../../../tests/fixtures/plugins/pay'
import { AbstractedAccountFactory as AbstractedAccountProgramFactory } from '../../../artifacts/arc58/account/AbstractedAccountClient'
import {
  AbstractedAccountFactoryClient,
  AbstractedAccountFactoryFactory,
} from '../../../artifacts/arc58/account/AbstractedAccountFactoryClient'
import { AbstractedAccountMbrFactory } from '../../../artifacts/arc58/account/AbstractedAccountMBRClient'
import { GuildClient } from '../../../artifacts/arc58/guilds/core/GuildClient'
import { MockGuildAkitaDaoClient } from '../../../artifacts/arc58/guilds/tests/MockGuildAkitaDAOClient'
import {
  baseConfig,
  deployGuildTestEnvironment,
  encodeAbi,
  FIXED_SIGNERS,
  proposalSettings,
  type GuildTestEnvironment,
} from '../../guilds/tests/test-helpers'
import {
  addVotedPluginAction,
  executePluginAction,
  GUILD_VOTE_MBR,
  setProposalActionLimitAction,
  type GuildProposalAction,
} from '../../../../../akita-sdk/src/guild'

const fixture = algorandFixture()
const APPROVE = 10
const ACTION_ADD_PLUGIN = 20
const MAX_UINT64 = 2n ** 64n - 1n
const FLAT_ALLOWANCE = 1
const ADD_PLUGIN_ABI =
  '(uint64,address,string,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,uint64,uint64,uint64,uint64,uint64,uint64,(uint64,uint8,uint64,uint64,uint64,bool)[])'
const PROPOSAL_EXECUTED = 50

/**
 * Op-up calls the one-group flow carries. A one-action proposal needs none: the five Guild calls and the
 * wallet's own two make 7 of the 16 transactions a group holds, which leaves room for nine op-ups.
 */
const OP_UPS = 0

const deployWalletFactory = async (environment: GuildTestEnvironment, escrowFactory: bigint) => {
  const { algorand, creator } = environment
  const factory = new AbstractedAccountFactoryFactory({ algorand, defaultSender: creator.addr, defaultSigner: creator.signer })
  const { appClient } = await factory.send.create.create({
    args: {
      akitaDao: environment.akitaDao,
      akitaDaoEscrow: { name: 'guild_revenue', app: environment.revenueEscrow.appId },
      version: 'guild-sole-signer-test',
      escrowFactory,
      revocation: 0n,
      domain: 'guild-sole-signer.test',
    },
    extraProgramPages: 3,
  })
  const programFactory = new AbstractedAccountProgramFactory({ algorand, defaultSender: creator.addr, defaultSigner: creator.signer })
  const program = (await programFactory.appFactory.compile()).approvalProgram
  await appClient.appClient.fundAppAccount({ amount: microAlgo(100_000n + 2_500n + 400n * (2n + BigInt(program.length))) })
  const composer = await appClient.newGroup().composer()
  composer.addAppCallMethodCall(await appClient.params.initBoxedContract({ args: { version: 'guild-sole-signer-test', size: program.length } }))
  for (let offset = 0; offset < program.length; offset += 2_032) {
    composer.addAppCallMethodCall(await appClient.params.loadBoxedContract({ args: { offset, data: program.slice(offset, offset + 2_032) } }))
  }
  await composer.send()
  return appClient
}

const members = (addresses: string[]) => encodeAbi('(uint8,(address,uint64)[])', [1, addresses.map((address) => [address, 1n])])

// A fixed-signer Guild where one signer is enough (threshold 1 of 3, no approval percentage). The vote closes
// early once that signer approves, so the signer proposes, submits, votes, closes and runs in one group.
describe('Guild sole signer: propose through execute in one group', () => {
  let environment: GuildTestEnvironment
  let walletFactory: AbstractedAccountFactoryClient
  let plugin: GuildPluginSDK
  let pay: PayPluginSDK
  let alice: WalletSDK
  let bob: WalletSDK
  let carol: WalletSDK

  const walletFor = async (nickname: string) => {
    const wallet = await newWallet({
      algorand: environment.algorand,
      factoryParams: { appId: walletFactory.appId, defaultSender: environment.creator.addr, defaultSigner: environment.creator.signer },
      sender: environment.creator.addr,
      signer: environment.creator.signer,
      readerAccount: environment.creator.addr.toString(),
      nickname,
      extraFunding: 100_000_000n,
    })
    const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n })
    await wallet.client.appClient.fundAppAccount({ amount: microAlgo(mbr.plugins) })
    await wallet.addPlugin({ client: plugin, callerType: CallerType.Global })
    return wallet
  }

  const controlled = async (wallet: WalletSDK) => (await wallet.client.state.global.controlledAddress())!
  const sendAs = { sender: '', signer: undefined as never }

  beforeAll(fixture.newScope, 120_000)
  beforeAll(async () => {
    environment = await deployGuildTestEnvironment(fixture.context.algorand, fixture.context.testAccount)
    const dispenser = await environment.algorand.account.dispenserFromEnvironment()
    await environment.algorand.send.payment({ sender: dispenser.addr, signer: dispenser.signer, receiver: environment.creator.addr, amount: microAlgo(900_000_000n) })
    const walletMbrFactory = environment.algorand.client.getTypedAppFactory(AbstractedAccountMbrFactory, {
      defaultSender: environment.creator.addr,
      defaultSigner: environment.creator.signer,
    })
    process.env.WALLET_MBR_APP_ID = (await walletMbrFactory.send.create.bare()).appClient.appId.toString()
    const escrowFactory = await deployEscrowFactory({ fixture, sender: environment.creator.addr, signer: environment.creator.signer })
    walletFactory = await deployWalletFactory(environment, escrowFactory.appId)
    await new MockGuildAkitaDaoClient({
      algorand: environment.algorand,
      appId: environment.akitaDao,
      defaultSender: environment.creator.addr,
      defaultSigner: environment.creator.signer,
    }).send.setWalletFactory({ args: { wallet: walletFactory.appId } })
    plugin = await deployGuildPlugin({ fixture, sender: environment.creator.addr, signer: environment.creator.signer, factory: environment.factory.appId, guild: 0n })
    pay = await deployPayPlugin({ fixture, sender: environment.creator.addr, signer: environment.creator.signer })
    alice = await walletFor('Alice')
    bob = await walletFor('Bob')
    carol = await walletFor('Carol')
    sendAs.sender = environment.creator.addr.toString()
    sendAs.signer = environment.creator.signer as never
  }, 300_000)

  /** A 3-member fixed-signer Guild that needs `threshold` approvals for every class of action. */
  const signerGuild = async (threshold: bigint, actions: GuildProposalAction[] = []) => {
    const addresses = [await controlled(alice), await controlled(bob), await controlled(carol)]
    // no approval percentage: the approval count alone decides
    const settings = proposalSettings({ approval: 0n, minimumApprovals: threshold })
    const created = await alice.usePlugin({
      callerType: CallerType.Global,
      consolidateFees: true,
      calls: [
        ...Array.from({ length: 6 }, (_, nonce) => plugin.opUp({ rekeyBack: false, nonce: BigInt(nonce) })),
        plugin.createGuild({
          consensusName: FIXED_SIGNERS,
          baseConfig: baseConfig(settings),
          governanceConfig: encodeAbi('(uint64)', [threshold]),
          consensusConfig: members(addresses),
          nickname: `${threshold} signer guild`,
          funding: 10_000_000n,
          actions: actions as never,
        }),
      ],
    })
    const returned: unknown = [...created.returns].reverse().find((value) => value !== undefined && value !== null)
    const value = returned && typeof returned === 'object' && 'returnValue' in returned ? returned.returnValue : returned
    const ids = value as { guild: bigint; wallet: bigint } | [bigint, bigint, bigint]
    const guild = Array.isArray(ids) ? ids[0] : ids.guild
    const treasuryId = Array.isArray(ids) ? ids[2] : ids.wallet
    await alice.usePlugin({ callerType: CallerType.Global, consolidateFees: true, calls: [plugin.initialize({ guild })] })
    return { guild, treasuryId }
  }

  /** One approval is enough, and Pay can run on the treasury by vote. */
  const soleSignerGuild = async () => {
    const settings = proposalSettings({ approval: 0n, minimumApprovals: 1n })
    return signerGuild(1n, [addVotedPluginAction({ plugin: pay.appId, settings })])
  }

  const guildClient = (guild: bigint) =>
    new GuildClient({ algorand: environment.algorand, appId: guild, defaultSender: sendAs.sender, defaultSigner: sendAs.signer })

  const nextProposalId = async (guild: bigint) =>
    BigInt((await environment.algorand.app.getGlobalState(guild)).proposal_id?.value ?? 1n)

  /** Propose, submit, approve, close and run `actions` from one wallet in ONE group. */
  const proposeAndRunAlone = async (wallet: WalletSDK, guild: bigint, actions: GuildProposalAction[]) => {
    const proposalId = await nextProposalId(guild)
    const result = await wallet.usePlugin({
      ...sendAs,
      callerType: CallerType.Global,
      consolidateFees: true,
      calls: [
        ...Array.from({ length: OP_UPS }, (_, nonce) => plugin.opUp({ ...sendAs, rekeyBack: false, nonce: BigInt(nonce) })),
        plugin.newProposal({ ...sendAs, guild, cid: new Uint8Array(36), actions: actions as never, rekeyBack: false }),
        plugin.submitProposal({ ...sendAs, guild, proposalId, rekeyBack: false }),
        // the proposal does not exist when the group is built, so the vote's cost is given, not read
        plugin.voteProposal({ ...sendAs, guild, proposalId, vote: APPROVE as never, rekeyBack: false, maxCost: GUILD_VOTE_MBR }),
        plugin.finalizeProposal({ ...sendAs, guild, proposalId, rekeyBack: false }),
        // only the last call hands the wallet back
        plugin.executeProposal({ ...sendAs, guild, proposalId }),
      ],
    })
    return { proposalId, result }
  }

  const statusOf = async (guild: bigint, proposalId: bigint) =>
    Number((await guildClient(guild).send.getProposal({ args: { proposalId } })).return!.status)

  test('a configuration change runs in one group', async () => {
    const { guild } = await soleSignerGuild()
    const { proposalId, result } = await proposeAndRunAlone(alice, guild, [setProposalActionLimitAction(11n)])
    expect(result.txIds.length).toBe(7 + OP_UPS)
    expect(await statusOf(guild, proposalId)).toBe(PROPOSAL_EXECUTED)
    expect(await guildClient(guild).state.global.proposalActionLimit()).toBe(11n)
  })

  test('a plugin use that needs a vote is approved in one group, then the approved group runs', async () => {
    const { guild, treasuryId } = await soleSignerGuild()
    const receiver = environment.algorand.account.random().addr.toString()
    const treasury = new WalletSDK({
      algorand: environment.algorand,
      readerAccount: sendAs.sender,
      factoryParams: { appId: treasuryId, defaultSender: sendAs.sender, defaultSigner: sendAs.signer },
    })
    const execution = await buildGuildExecution({
      treasury,
      calls: [pay.pay({ ...sendAs, payments: [{ receiver, asset: 0n, amount: 1_000_000n }] })],
      lease: `sole-signer-pay-${guild}`,
      votingSeconds: 0n,
      windows: 4n,
      ...sendAs,
    })
    const { proposalId } = await proposeAndRunAlone(alice, guild, [
      executePluginAction({
        plugin: pay.appId,
        executionKey: execution.lease,
        groups: execution.ids,
        firstValid: execution.firstValid,
        lastValid: execution.lastValid,
      }),
    ])
    expect(await statusOf(guild, proposalId)).toBe(PROPOSAL_EXECUTED)

    await sendGuildExecution({ algod: environment.algorand.client.algod, record: guildExecutionRecord(execution), signer: sendAs.signer })
    expect((await environment.algorand.account.getInformation(receiver)).balance.microAlgo).toBe(1_000_000n)
  })

  test('one group gives one caller a capped budget on a treasury escrow, and only that caller spends it', async () => {
    const { guild, treasuryId } = await soleSignerGuild()
    const treasury = new WalletSDK({
      algorand: environment.algorand,
      readerAccount: sendAs.sender,
      factoryParams: { appId: treasuryId, defaultSender: sendAs.sender, defaultSigner: sendAs.signer },
    })
    const dave = await fixture.context.generateAccount({ initialFunds: microAlgo(5_000_000n) })
    const erin = await fixture.context.generateAccount({ initialFunds: microAlgo(5_000_000n) })
    const receiver = environment.algorand.account.random().addr.toString()
    const escrow = 'inference'

    // Pay on the escrow for dave alone, no vote per use, at most 2 ALGO moved out of the treasury in total
    const grant: GuildProposalAction = [
      ACTION_ADD_PLUGIN,
      encodeAbi(ADD_PLUGIN_ABI, [
        pay.appId, dave.addr.toString(), escrow, 0, MAX_UINT64, 0n, [], false, false, false, false,
        0n, 0n, 0n, 0n, 0n, 0n,
        [[0n, FLAT_ALLOWANCE, 2_000_000n, 0n, 0n, false]],
      ]),
    ]
    const { proposalId } = await proposeAndRunAlone(alice, guild, [grant])
    expect(await statusOf(guild, proposalId)).toBe(PROPOSAL_EXECUTED)

    const spend = (who: typeof dave, amount: bigint) =>
      treasury.usePlugin({
        sender: who.addr.toString(),
        signer: who.signer,
        escrow,
        callerType: CallerType.Other,
        calls: [pay.pay({ sender: who.addr.toString(), signer: who.signer, payments: [{ receiver, amount, asset: 0n }] })],
        fundsRequest: [{ amount, asset: 0n }],
      })

    await spend(dave, 1_500_000n)
    expect((await environment.algorand.account.getInformation(receiver)).balance.microAlgo).toBe(1_500_000n)
    // the budget is spent down: 0.5 ALGO is left
    await expect(spend(dave, 1_000_000n)).rejects.toThrow()
    // a caller without the grant gets nothing
    await expect(spend(erin, 100_000n)).rejects.toThrow()
    await spend(dave, 500_000n)
    expect((await environment.algorand.account.getInformation(receiver)).balance.microAlgo).toBe(2_000_000n)
  })

  test('a signer who cannot decide alone leaves the vote open, and nothing runs', async () => {
    const { guild } = await signerGuild(2n)

    // the whole group fails at the close: one approval of the two needed does not decide the vote
    const proposalId = await nextProposalId(guild)
    await expect(proposeAndRunAlone(alice, guild, [setProposalActionLimitAction(11n)])).rejects.toThrow()
    expect(await nextProposalId(guild)).toBe(proposalId)
    expect(await guildClient(guild).state.global.proposalActionLimit()).toBe(12n)
  })
})

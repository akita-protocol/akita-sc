import { microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import {
  buildGuildExecution,
  CallerType,
  finishGuildProposal,
  GuildPluginSDK,
  guildExecutionRecord,
  newWallet,
  PayPluginSDK,
  proposeToGuild,
  sendGuildExecution,
  voteOnGuildProposal,
  WalletSDK,
} from 'akita-sdk/wallet'
import { deployEscrowFactory } from '../../../../tests/fixtures/escrow'
import { deployGuildPlugin } from '../../../../tests/fixtures/plugins/guild'
import { deployPayPlugin } from '../../../../tests/fixtures/plugins/pay'
import { TimeWarp } from '../../../../tests/utils/time'
import { AbstractedAccountFactory as AbstractedAccountProgramFactory } from '../../../artifacts/arc58/account/AbstractedAccountClient'
import {
  AbstractedAccountFactoryClient,
  AbstractedAccountFactoryFactory,
} from '../../../artifacts/arc58/account/AbstractedAccountFactoryClient'
import { AbstractedAccountMbrFactory } from '../../../artifacts/arc58/account/AbstractedAccountMBRClient'
import { MockGuildAkitaDaoClient } from '../../../artifacts/arc58/guilds/tests/MockGuildAkitaDAOClient'
import {
  baseConfig,
  deployGuildTestEnvironment,
  encodeAbi,
  FIXED_SIGNERS,
  proposalSettings,
  VOTING_DURATION,
  type GuildTestEnvironment,
} from '../../guilds/tests/test-helpers'
import { addVotedPluginAction, executePluginAction } from '../../../../../akita-sdk/src/guild'

const fixture = algorandFixture()
const APPROVE = 10

const deployWalletFactory = async (environment: GuildTestEnvironment, escrowFactory: bigint) => {
  const { algorand, creator } = environment
  const factory = new AbstractedAccountFactoryFactory({ algorand, defaultSender: creator.addr, defaultSigner: creator.signer })
  const { appClient } = await factory.send.create.create({
    args: {
      akitaDao: environment.akitaDao,
      akitaDaoEscrow: { name: 'guild_revenue', app: environment.revenueEscrow.appId },
      version: 'guild-member-test',
      escrowFactory,
      revocation: 0n,
      domain: 'guild-member.test',
    },
    extraProgramPages: 3,
  })
  const programFactory = new AbstractedAccountProgramFactory({ algorand, defaultSender: creator.addr, defaultSigner: creator.signer })
  const program = (await programFactory.appFactory.compile()).approvalProgram
  await appClient.appClient.fundAppAccount({ amount: microAlgo(100_000n + 2_500n + 400n * (2n + BigInt(program.length))) })
  const composer = await appClient.newGroup().composer()
  composer.addAppCallMethodCall(await appClient.params.initBoxedContract({ args: { version: 'guild-member-test', size: program.length } }))
  for (let offset = 0; offset < program.length; offset += 2_032) {
    composer.addAppCallMethodCall(await appClient.params.loadBoxedContract({ args: { offset, data: program.slice(offset, offset + 2_032) } }))
  }
  await composer.send()
  return appClient
}

const members = (addresses: string[]) => encodeAbi('(uint8,(address,uint64)[])', [1, addresses.map((address) => [address, 1n])])

// Once a Guild is active, members change its wallet through proposals: a member proposes a group that uses a
// plugin on the wallet, members vote, and the approved group runs through an execution key.
describe('Guild member proposals', () => {
  let environment: GuildTestEnvironment
  let walletFactory: AbstractedAccountFactoryClient
  let plugin: GuildPluginSDK
  let pay: PayPluginSDK
  let alice: WalletSDK
  let bob: WalletSDK
  let timeWarp: TimeWarp
  let previousWalletMbrAppId: string | undefined

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
    await environment.algorand.send.payment({ sender: dispenser.addr, signer: dispenser.signer, receiver: environment.creator.addr, amount: microAlgo(600_000_000n) })
    previousWalletMbrAppId = process.env.WALLET_MBR_APP_ID
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
    timeWarp = new TimeWarp(environment.algorand)
    sendAs.sender = environment.creator.addr.toString()
    sendAs.signer = environment.creator.signer as never
  }, 300_000)

  afterAll(async () => {
    await timeWarp?.resetTimeWarp()
    if (previousWalletMbrAppId === undefined) delete process.env.WALLET_MBR_APP_ID
    else process.env.WALLET_MBR_APP_ID = previousWalletMbrAppId
  })

  const activeGuild = async () => {
    const [aliceAddress, bobAddress] = [await controlled(alice), await controlled(bob)]
    // both members must approve; Pay can run on the treasury by vote
    const created = await alice.usePlugin({
      callerType: CallerType.Global,
      consolidateFees: true,
      calls: [
        ...Array.from({ length: 6 }, (_, nonce) => plugin.opUp({ rekeyBack: false, nonce: BigInt(nonce) })),
        plugin.createGuild({
          consensusName: FIXED_SIGNERS,
          baseConfig: baseConfig(),
          governanceConfig: encodeAbi('(uint64)', [2n]),
          consensusConfig: members([aliceAddress, bobAddress]),
          nickname: 'Voting guild',
          funding: 10_000_000n,
          actions: [addVotedPluginAction({ plugin: pay.appId, settings: proposalSettings() })] as never,
        }),
      ],
    })
    const returned = [...created.returns].reverse().find((value) => value !== undefined && value !== null) as { returnValue?: unknown }
    const ids = (returned && typeof returned === 'object' && 'returnValue' in returned ? returned.returnValue : returned) as { guild: bigint; wallet: bigint } | [bigint, bigint, bigint]
    const guild = Array.isArray(ids) ? ids[0] : ids.guild
    const treasuryId = Array.isArray(ids) ? ids[2] : ids.wallet

    await alice.usePlugin({ callerType: CallerType.Global, consolidateFees: true, calls: [plugin.initialize({ guild })] })
    return { guild, treasuryId }
  }

  test('a member proposes a payment from the treasury, members vote, and the approved group runs', async () => {
    const { guild, treasuryId } = await activeGuild()
    const receiver = environment.algorand.account.random().addr.toString()
    const treasury = new WalletSDK({
      algorand: environment.algorand,
      readerAccount: sendAs.sender,
      factoryParams: { appId: treasuryId, defaultSender: sendAs.sender, defaultSigner: sendAs.signer },
    })
    const execution = await buildGuildExecution({
      treasury,
      calls: [pay.pay({ ...sendAs, payments: [{ receiver, asset: 0n, amount: 1_000_000n }] })],
      lease: `guild-pay-${guild}`,
      votingSeconds: VOTING_DURATION,
      windows: 4n,
      ...sendAs,
    })
    const record = guildExecutionRecord(execution)

    const proposalId = await proposeToGuild({
      wallet: alice,
      guildPlugin: plugin,
      guild,
      callerType: CallerType.Global,
      actions: [
        executePluginAction({
          plugin: pay.appId,
          executionKey: execution.lease,
          groups: execution.ids,
          firstValid: execution.firstValid,
          lastValid: execution.lastValid,
        }),
      ],
      ...sendAs,
    })
    const guildWallet = { wallet: alice, guildPlugin: plugin, guild, callerType: CallerType.Global, ...sendAs }
    await voteOnGuildProposal({ ...guildWallet, proposalId, vote: APPROVE })
    await voteOnGuildProposal({ ...guildWallet, wallet: bob, proposalId, vote: APPROVE })

    // nothing runs before the vote passes
    await expect(sendGuildExecution({ algod: environment.algorand.client.algod, record, signer: sendAs.signer })).rejects.toThrow()

    await timeWarp.timeWarp(VOTING_DURATION + 5n)
    await finishGuildProposal({ ...guildWallet, wallet: bob, proposalId, execute: true })
    await sendGuildExecution({ algod: environment.algorand.client.algod, record, signer: sendAs.signer })

    expect((await environment.algorand.account.getInformation(receiver)).balance.microAlgo).toBe(1_000_000n)
  })

  test('a member proposes letting members use another plugin by vote', async () => {
    const { guild, treasuryId } = await activeGuild()
    const guildWallet = { wallet: bob, guildPlugin: plugin, guild, callerType: CallerType.Global, ...sendAs }
    const proposalId = await proposeToGuild({
      ...guildWallet,
      actions: [addVotedPluginAction({ plugin: plugin.appId, settings: proposalSettings() })],
    })
    await voteOnGuildProposal({ ...guildWallet, proposalId, vote: APPROVE })
    // one approval of two required: finishing only closes the vote
    await timeWarp.timeWarp(VOTING_DURATION + 5n)
    await expect(finishGuildProposal({ ...guildWallet, proposalId, execute: true })).rejects.toThrow()
    await finishGuildProposal({ ...guildWallet, proposalId, execute: false })

    const treasury = new WalletSDK({ algorand: environment.algorand, readerAccount: sendAs.sender, factoryParams: { appId: treasuryId } })
    const plugins = await treasury.getPlugins()
    expect([...plugins.keys()].some((key) => String(key).startsWith(plugin.appId.toString()))).toBe(false)
  })
})

import { microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { ABIMethod, ABIType, getApplicationAddress } from 'algosdk'
import { beforeAll, describe, expect, test } from 'vitest'
import {
  CallerType,
  GuildPluginSDK,
  newWallet,
  PayPluginSDK,
  WalletSDK,
} from 'akita-sdk/wallet'
import { deployEscrowFactory } from '../../../../tests/fixtures/escrow'
import { deployGuildPlugin } from '../../../../tests/fixtures/plugins/guild'
import { deployTestPayPlugin as deployPayPlugin } from '../../../../tests/fixtures/plugins/pay'
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
  type GuildTestEnvironment,
} from '../../guilds/tests/test-helpers'
import {
  fixedSignerConsensusAction,
  removePluginAction,
  GUILD_VOTE_MBR,
  type GuildProposalAction,
} from '../../../../../akita-sdk/src/guild'

const fixture = algorandFixture()
const APPROVE = 10
const ACTION_ADD_PLUGIN = 20
const MAX_UINT64 = 2n ** 64n - 1n
const FLAT_ALLOWANCE = 1
const ADD_PLUGIN_ABI =
  '(uint64,address,string,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,uint64,uint64,uint64,uint64,uint64,uint64,(uint64,uint8,uint64,uint64,uint64,bool)[])'
const EQUAL_WEIGHTS = 1
const ASSIGNED_WEIGHTS = 2
const PAY = ABIMethod.fromSignature('pay(uint64,bool,(address,uint64,uint64)[])void')

/**
 * The application arguments of one Pay call on `wallet`, the way the consensus sends them. Only the last
 * call of a use hands the wallet back.
 */
const payArgs = (wallet: bigint, receiver: string, amount: bigint, rekeyBack = true): Uint8Array[] => [
  PAY.getSelector(),
  ABIType.from('uint64').encode(wallet),
  ABIType.from('bool').encode(rekeyBack),
  ABIType.from('(address,uint64,uint64)[]').encode([[receiver, 0n, amount]]),
]

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

const members = (addresses: string[], weights?: bigint[]) =>
  encodeAbi('(uint8,(address,uint64)[])', [
    weights ? ASSIGNED_WEIGHTS : EQUAL_WEIGHTS,
    addresses.map((address, index) => [address, weights ? weights[index] : 1n]),
  ])

// Adversarial cases from the audit of the direct route: a deciding signer of a fixed-signer Guild using a
// plugin the Guild granted to its consensus app. Each case tries to get past the signer check or the grant.
describe('Guild sole signer direct route: audit cases', () => {
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
      // each Guild a test creates takes about 14 ALGO from its creator's wallet
      extraFunding: 300_000_000n,
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
    await environment.algorand.send.payment({ sender: dispenser.addr, signer: dispenser.signer, receiver: environment.creator.addr, amount: microAlgo(1_500_000_000n) })
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

  /**
   * A 3-member fixed-signer Guild that needs `threshold` approval power for every class of action. Signers
   * weigh the same unless `weights` gives alice, bob and carol their own.
   */
  const signerGuild = async (threshold: bigint, actions: GuildProposalAction[] = [], weights?: [bigint, bigint, bigint], initialize = true) => {
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
          consensusConfig: members(addresses, weights),
          nickname: `${threshold} signer guild`,
          funding: 10_000_000n,
          actions: actions as never,
        }),
      ],
    })
    const returned: unknown = [...created.returns].reverse().find((value) => value !== undefined && value !== null)
    const value = returned && typeof returned === 'object' && 'returnValue' in returned ? returned.returnValue : returned
    const ids = value as { guild: bigint; consensus: bigint; wallet: bigint } | [bigint, bigint, bigint]
    const guild = Array.isArray(ids) ? ids[0] : ids.guild
    const consensus = Array.isArray(ids) ? ids[1] : ids.consensus
    const treasuryId = Array.isArray(ids) ? ids[2] : ids.wallet
    if (initialize) {
      await alice.usePlugin({ callerType: CallerType.Global, consolidateFees: true, calls: [plugin.initialize({ guild })] })
    }
    return { guild, consensus, treasuryId }
  }

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

  const balanceOf = async (address: string) => (await environment.algorand.account.getInformation(address)).balance.microAlgo
  const appBalance = (app: bigint) => balanceOf(getApplicationAddress(app).toString())
  const randomAddress = () => environment.algorand.account.random().addr.toString()

  type GrantOptions = { escrow?: string; allowance?: bigint; methods?: [Uint8Array, bigint][]; cooldown?: bigint; coverFees?: boolean }
  const grantToConsensus = (consensus: bigint, { escrow = '', allowance = 0n, methods = [], cooldown = 0n, coverFees = false }: GrantOptions = {}): GuildProposalAction => [
    ACTION_ADD_PLUGIN,
    encodeAbi(ADD_PLUGIN_ABI, [
      pay.appId, getApplicationAddress(consensus).toString(), escrow, 0, MAX_UINT64, cooldown, methods, false, false, coverFees, false,
      0n, 0n, 0n, 0n, 0n, 0n,
      allowance > 0n ? [[0n, FLAT_ALLOWANCE, allowance, 0n, 0n, false]] : [],
    ]),
  ]

  const useDirectly = (
    wallet: WalletSDK, guild: bigint, calls: Uint8Array[][],
    { escrow = '', funds = [] as [bigint, bigint][], methodOffsets = [] as bigint[] } = {},
  ) =>
    wallet.usePlugin({
      ...sendAs,
      callerType: CallerType.Global,
      consolidateFees: true,
      calls: [plugin.usePluginAsSigner({ ...sendAs, guild, plugin: pay.appId, escrow, methodOffsets, fundsRequest: funds, calls })],
    })

  test('a call that names another wallet is refused, alone or after a valid call', async () => {
    const { guild, consensus, treasuryId } = await signerGuild(1n)
    await proposeAndRunAlone(alice, guild, [grantToConsensus(consensus)])
    const receiver = randomAddress()
    const bobWallet = bob.client.appId
    const bobBefore = await balanceOf(await controlled(bob))

    await expect(useDirectly(alice, guild, [payArgs(bobWallet, receiver, 100_000n)])).rejects.toThrow()
    await expect(
      useDirectly(alice, guild, [payArgs(treasuryId, receiver, 100_000n, false), payArgs(bobWallet, receiver, 100_000n)]),
    ).rejects.toThrow()
    expect(await balanceOf(receiver)).toBe(0n)
    expect(await balanceOf(await controlled(bob))).toBe(bobBefore)
  })

  test('a use that does not hand the wallet back is refused', async () => {
    const { guild, consensus, treasuryId } = await signerGuild(1n)
    await proposeAndRunAlone(alice, guild, [grantToConsensus(consensus)])
    const receiver = randomAddress()

    await expect(useDirectly(alice, guild, [payArgs(treasuryId, receiver, 100_000n, false)])).rejects.toThrow()
    expect(await balanceOf(receiver)).toBe(0n)
    // the wallet is still its own: a proper use works afterwards
    await useDirectly(alice, guild, [payArgs(treasuryId, receiver, 100_000n)])
    expect(await balanceOf(receiver)).toBe(100_000n)
  })

  test('method restrictions on the grant hold', async () => {
    const other = ABIMethod.fromSignature('other(uint64,bool)void').getSelector()
    const closed = await signerGuild(1n)
    await proposeAndRunAlone(alice, closed.guild, [grantToConsensus(closed.consensus, { methods: [[other, 0n]] })])
    const receiver = randomAddress()
    await expect(useDirectly(alice, closed.guild, [payArgs(closed.treasuryId, receiver, 100_000n)], { methodOffsets: [0n] })).rejects.toThrow()
    await expect(useDirectly(alice, closed.guild, [payArgs(closed.treasuryId, receiver, 100_000n)])).rejects.toThrow()

    const open = await signerGuild(1n)
    await proposeAndRunAlone(alice, open.guild, [grantToConsensus(open.consensus, { methods: [[PAY.getSelector(), 0n]] })])
    // the offsets are required when the grant lists methods
    await expect(useDirectly(alice, open.guild, [payArgs(open.treasuryId, receiver, 100_000n)])).rejects.toThrow()
    await useDirectly(alice, open.guild, [payArgs(open.treasuryId, receiver, 100_000n)], { methodOffsets: [0n] })
    expect(await balanceOf(receiver)).toBe(100_000n)
  })

  test('a cooldown on the grant holds across signers', async () => {
    const { guild, consensus, treasuryId } = await signerGuild(1n)
    await proposeAndRunAlone(alice, guild, [grantToConsensus(consensus, { cooldown: 100_000n })])
    const receiver = randomAddress()

    await useDirectly(alice, guild, [payArgs(treasuryId, receiver, 100_000n)])
    await expect(useDirectly(alice, guild, [payArgs(treasuryId, receiver, 100_000n)])).rejects.toThrow()
    await expect(useDirectly(bob, guild, [payArgs(treasuryId, receiver, 100_000n)])).rejects.toThrow()
    expect(await balanceOf(receiver)).toBe(100_000n)
  })

  test('removing the grant closes the route', async () => {
    const { guild, consensus, treasuryId } = await signerGuild(1n)
    await proposeAndRunAlone(alice, guild, [grantToConsensus(consensus)])
    const receiver = randomAddress()
    await useDirectly(alice, guild, [payArgs(treasuryId, receiver, 100_000n)])

    await proposeAndRunAlone(bob, guild, [removePluginAction({ plugin: pay.appId, caller: getApplicationAddress(consensus).toString() })])

    await expect(useDirectly(alice, guild, [payArgs(treasuryId, receiver, 100_000n)])).rejects.toThrow()
    expect(await balanceOf(receiver)).toBe(100_000n)
  })

  test('a removed signer loses the route at once', async () => {
    const { guild, consensus, treasuryId } = await signerGuild(1n)
    await proposeAndRunAlone(alice, guild, [grantToConsensus(consensus)])
    const receiver = randomAddress()
    await useDirectly(bob, guild, [payArgs(treasuryId, receiver, 100_000n)])

    await proposeAndRunAlone(alice, guild, [fixedSignerConsensusAction.removeMember((await controlled(bob)).toString())])

    await expect(useDirectly(bob, guild, [payArgs(treasuryId, receiver, 100_000n)])).rejects.toThrow(/errGpwr/)
    await useDirectly(alice, guild, [payArgs(treasuryId, receiver, 100_000n)])
    expect(await balanceOf(receiver)).toBe(200_000n)
  })

  test('the consensus app neither gains nor loses ALGO, even when the grant reimburses fees', async () => {
    const { guild, consensus, treasuryId } = await signerGuild(1n)
    await proposeAndRunAlone(alice, guild, [grantToConsensus(consensus, { coverFees: true })])
    const receiver = randomAddress()
    const consensusBefore = await appBalance(consensus)
    const treasuryBefore = await appBalance(treasuryId)

    await useDirectly(alice, guild, [payArgs(treasuryId, receiver, 250_000n)])

    expect(await balanceOf(receiver)).toBe(250_000n)
    expect(await appBalance(consensus)).toBe(consensusBefore)
    expect(await appBalance(treasuryId)).toBe(treasuryBefore - 250_000n)
  })

  test('a draft Guild has no direct route', async () => {
    const { guild, treasuryId } = await signerGuild(1n, [], undefined, false)
    await expect(useDirectly(alice, guild, [payArgs(treasuryId, randomAddress(), 100_000n)])).rejects.toThrow(/errGact/)
  })

  test('ALGO a use sends to the consensus app is forwarded to the Guild, and sweep returns it to the treasury', async () => {
    const { guild, consensus, treasuryId } = await signerGuild(1n)
    await proposeAndRunAlone(alice, guild, [grantToConsensus(consensus)])
    // clear the Guild's own free balance first, so the next sweep moves only what the use forwarded
    await alice.usePlugin({ ...sendAs, callerType: CallerType.Global, consolidateFees: true, calls: [plugin.sweep({ ...sendAs, guild })] })
    const consensusBefore = await appBalance(consensus)
    const guildBefore = await appBalance(guild)
    const treasuryBefore = await appBalance(treasuryId)

    await useDirectly(alice, guild, [payArgs(treasuryId, getApplicationAddress(consensus).toString(), 300_000n)])

    // the consensus app keeps nothing: what it gained during the use now sits with the Guild
    expect(await appBalance(consensus)).toBe(consensusBefore)
    expect(await appBalance(guild)).toBe(guildBefore + 300_000n)
    expect(await appBalance(treasuryId)).toBe(treasuryBefore - 300_000n)

    await alice.usePlugin({ ...sendAs, callerType: CallerType.Global, consolidateFees: true, calls: [plugin.sweep({ ...sendAs, guild })] })
    expect(await appBalance(guild)).toBe(guildBefore)
    expect(await appBalance(treasuryId)).toBe(treasuryBefore)
  })
})

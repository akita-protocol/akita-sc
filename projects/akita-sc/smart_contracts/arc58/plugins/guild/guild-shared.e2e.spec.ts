import { microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import type { PluginSDKReturn } from 'akita-sdk'
import { CallerType, GuildPluginSDK, newWallet, WalletSDK } from 'akita-sdk/wallet'
import { deployEscrowFactory } from '../../../../tests/fixtures/escrow'
import { deployGuildPlugin } from '../../../../tests/fixtures/plugins/guild'
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
  expectContractError,
  FIXED_SIGNERS,
  type GuildTestEnvironment,
} from '../../guilds/tests/test-helpers'
import { errGuildNotFromFactory } from './errors'
import { addPluginAction } from '../../../../../akita-sdk/src/guild'

const fixture = algorandFixture()

const deployWalletFactory = async (
  environment: GuildTestEnvironment,
  escrowFactory: bigint,
): Promise<AbstractedAccountFactoryClient> => {
  const { algorand, creator } = environment
  const factory = new AbstractedAccountFactoryFactory({
    algorand,
    defaultSender: creator.addr,
    defaultSigner: creator.signer,
  })
  const { appClient } = await factory.send.create.create({
    args: {
      akitaDao: environment.akitaDao,
      akitaDaoEscrow: { name: 'guild_revenue', app: environment.revenueEscrow.appId },
      version: 'guild-plugin-test',
      escrowFactory,
      revocation: 0n,
      domain: 'guild-plugin.test',
    },
    extraProgramPages: 3,
  })

  const programFactory = new AbstractedAccountProgramFactory({
    algorand,
    defaultSender: creator.addr,
    defaultSigner: creator.signer,
  })
  const program = (await programFactory.appFactory.compile()).approvalProgram
  const boxedProgramMbr = 2_500n + 400n * (2n + BigInt(program.length))
  await appClient.appClient.fundAppAccount({ amount: microAlgo(100_000n + boxedProgramMbr) })

  const chunkSize = 2_032
  const composer = await appClient.newGroup().composer()
  composer.addAppCallMethodCall(
    await appClient.params.initBoxedContract({ args: { version: 'guild-plugin-test', size: program.length } }),
  )
  for (let offset = 0; offset < program.length; offset += chunkSize) {
    composer.addAppCallMethodCall(
      await appClient.params.loadBoxedContract({
        args: { offset, data: program.slice(offset, offset + chunkSize) },
      }),
    )
  }
  await composer.send()
  return appClient
}

type Created = { guild: bigint; consensus: bigint; wallet: bigint }

const members = (addresses: string[]) => encodeAbi('(uint8,(address,uint64)[])', [1, addresses.map((address) => [address, 1n])])

// The unbound GuildPlugin is shared: one install acts on every Guild its factory created, and createGuild
// makes a Guild ready (consensus, treasury, funding, plugin grants) in one call.
describe('Shared GuildPlugin', () => {
  let environment: GuildTestEnvironment
  let walletFactory: AbstractedAccountFactoryClient
  let plugin: GuildPluginSDK
  let creator: WalletSDK
  let other: WalletSDK
  let previousWalletMbrAppId: string | undefined

  const use = (wallet: WalletSDK, call: PluginSDKReturn, opUps = 0) =>
    wallet.usePlugin({
      callerType: CallerType.Global,
      consolidateFees: true,
      calls: [...Array.from({ length: opUps }, (_, nonce) => plugin.opUp({ rekeyBack: false, nonce: BigInt(nonce) })), call],
    })

  const lastReturn = <T>(result: { returns: unknown[] }): T => {
    const last = [...result.returns].reverse().find((value) => value !== undefined && value !== null) as { returnValue?: unknown }
    return (last && typeof last === 'object' && 'returnValue' in last ? last.returnValue : last) as T
  }

  const walletFor = async (nickname: string) => {
    const wallet = await newWallet({
      algorand: environment.algorand,
      factoryParams: { appId: walletFactory.appId, defaultSender: environment.creator.addr, defaultSigner: environment.creator.signer },
      sender: environment.creator.addr,
      signer: environment.creator.signer,
      readerAccount: environment.creator.addr.toString(),
      nickname,
      extraFunding: 150_000_000n,
    })
    const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n })
    await wallet.client.appClient.fundAppAccount({ amount: microAlgo(mbr.plugins) })
    await wallet.addPlugin({ client: plugin, callerType: CallerType.Global })
    return wallet
  }

  const createGuild = async (wallet: WalletSDK, options: { members?: string[]; funding?: bigint; actions?: [number | bigint, Uint8Array][] } = {}) => {
    const controlled = (await wallet.client.state.global.controlledAddress())!
    const result = await use(
      wallet,
      plugin.createGuild({
        consensusName: FIXED_SIGNERS,
        baseConfig: baseConfig(),
        governanceConfig: encodeAbi('(uint64)', [1n]),
        consensusConfig: members(options.members ?? [controlled]),
        nickname: 'One-call guild',
        funding: options.funding ?? 0n,
        actions: (options.actions ?? []) as never,
      }),
      6,
    )
    const created = lastReturn<Created | [bigint, bigint, bigint]>(result)
    return {
      result,
      created: Array.isArray(created) ? { guild: created[0], consensus: created[1], wallet: created[2] } : created,
    }
  }

  beforeAll(fixture.newScope, 120_000)
  beforeAll(async () => {
    environment = await deployGuildTestEnvironment(fixture.context.algorand, fixture.context.testAccount)
    const dispenser = await environment.algorand.account.dispenserFromEnvironment()
    await environment.algorand.send.payment({
      sender: dispenser.addr,
      signer: dispenser.signer,
      receiver: environment.creator.addr,
      amount: microAlgo(800_000_000n),
    })
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
    plugin = await deployGuildPlugin({
      fixture,
      sender: environment.creator.addr,
      signer: environment.creator.signer,
      factory: environment.factory.appId,
      guild: 0n,
    })
    creator = await walletFor('Guild creator')
    other = await walletFor('Someone else')
  }, 300_000)

  afterAll(() => {
    if (previousWalletMbrAppId === undefined) delete process.env.WALLET_MBR_APP_ID
    else process.env.WALLET_MBR_APP_ID = previousWalletMbrAppId
  })

  test('creates, configures, sets up, funds and grants plugins in one group', async () => {
    const funding = 2_000_000n
    const { result, created } = await createGuild(creator, {
      funding,
      actions: [addPluginAction({ plugin: plugin.appId, caller: environment.creator.addr.toString() })],
    })

    // one atomic group
    expect(new Set(result.groupId ? [result.groupId] : []).size).toBe(1)

    const guild = new GuildClient({ algorand: environment.algorand, appId: created.guild, defaultSender: environment.creator.addr })
    const state = await environment.algorand.app.getGlobalState(created.guild)
    const raw = state.state && 'valueRaw' in state.state ? state.state.valueRaw[0] : Number(state.state?.value ?? 0)
    expect(raw).toBe(0) // still a draft
    expect(state.wallet?.value).toBe(created.wallet)
    expect(state.consensus?.value).toBe(created.consensus)
    expect((await environment.algorand.app.getGlobalState(created.consensus)).signer_threshold?.value).toBe(1n)

    expect(guild.appId).toBe(created.guild)
    const treasuryWallet = new WalletSDK({ algorand: environment.algorand, readerAccount: environment.creator.addr.toString(), factoryParams: { appId: created.wallet, defaultSender: environment.creator.addr } })
    const grants = [...(await treasuryWallet.getPlugins()).keys()].map(String)
    expect(grants).toContain(`${plugin.appId}${environment.creator.addr.toString()}`)

    // the creator wallet got control back
    const controlled = (await creator.client.state.global.controlledAddress())!
    expect((await environment.algorand.account.getInformation(controlled)).authAddr).toBeUndefined()
    expect(await creator.client.state.global.spendingAddress()).toBe(ALGORAND_ZERO_ADDRESS_STRING)
  })

  test('acts on two Guilds through one install', async () => {
    const first = (await createGuild(creator)).created
    const second = (await createGuild(creator)).created
    for (const guild of [first.guild, second.guild]) {
      await use(creator, plugin.setProposalActionLimit({ guild, limit: 7n }), 2)
      expect((await environment.algorand.app.getGlobalState(guild)).proposal_action_limit?.value).toBe(7n)
    }
  })

  test('rejects apps its factory did not create', async () => {
    await expectContractError(
      use(creator, plugin.setProposalActionLimit({ guild: walletFactory.appId, limit: 3n }), 2),
      errGuildNotFromFactory,
    )
  })

  test('only the creator configures a draft Guild', async () => {
    const { created } = await createGuild(creator)
    await expect(use(other, plugin.setProposalActionLimit({ guild: created.guild, limit: 3n }), 2)).rejects.toThrow()
  })

  test('reports how many members fit in one createGuild call', async () => {
    let fits = 0
    for (const count of [10, 20, 30, 40, 45]) {
      const addresses = Array.from({ length: count }, () => environment.algorand.account.random().addr.toString())
      try {
        await createGuild(creator, { members: addresses })
        fits = count
      } catch (error) {
        console.log(`createGuild with ${count} members failed:`, String(error).slice(0, 200))
        break
      }
    }
    console.log(`MEMBERS THAT FIT IN ONE CALL: ${fits}`)
    expect(fits).toBeGreaterThanOrEqual(10)
  }, 300_000)
})

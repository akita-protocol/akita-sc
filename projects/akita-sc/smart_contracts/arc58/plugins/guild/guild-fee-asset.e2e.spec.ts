import { microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { getApplicationAddress } from 'algosdk'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import type { PluginSDKReturn } from 'akita-sdk'
import { CallerType, GuildPluginSDK, newWallet, WalletSDK } from 'akita-sdk/wallet'
import { deployEscrowFactory } from '../../../../tests/fixtures/escrow'
import { deployGuildPlugin } from '../../../../tests/fixtures/plugins/guild'
import { TimeWarp } from '../../../../tests/utils/time'
import { AbstractedAccountFactory as AbstractedAccountProgramFactory } from '../../../artifacts/arc58/account/AbstractedAccountClient'
import {
  AbstractedAccountFactoryClient,
  AbstractedAccountFactoryFactory,
} from '../../../artifacts/arc58/account/AbstractedAccountFactoryClient'
import { AbstractedAccountMbrFactory } from '../../../artifacts/arc58/account/AbstractedAccountMBRClient'
import { GuildClient } from '../../../artifacts/arc58/guilds/core/GuildClient'
import { MockGuildAkitaDaoClient } from '../../../artifacts/arc58/guilds/tests/MockGuildAkitaDAOClient'
import {
  APPROVE,
  baseConfig,
  deployGuildTestEnvironment,
  EMPTY_EVIDENCE,
  encodeAbi,
  endVoting,
  expectContractError,
  FIXED_SIGNERS,
  MAX_APP_CALL_FEE,
  proposalSettings,
  setLimitAction,
  type GuildAction,
  type GuildTestEnvironment,
  ZERO_CID,
} from '../../guilds/tests/test-helpers'
import { errGuildFeeAssetChanged, errGuildInvalidPayment } from '../../guilds/core/errors'
import { errGuildCostLimitExceeded } from './errors'
import { setFeeAssetAction } from '../../../../../akita-sdk/src/guild'

const fixture = algorandFixture()

/** Each proposal action charges this much: microALGO in an ALGO Guild, base units in a fee-asset Guild. */
const FEE = 250_000n
const OPT_IN_MBR = 100_000n
const FEE_TOKEN_RESERVE_MBR = 9_300n
const STATUS_VOTING = 20
const STATUS_APPROVED = 40
const STATUS_EXECUTED = 50
const STATUS_INVALID = 10

const deployWalletFactory = async (environment: GuildTestEnvironment, escrowFactory: bigint) => {
  const { algorand, creator } = environment
  const factory = new AbstractedAccountFactoryFactory({ algorand, defaultSender: creator.addr, defaultSigner: creator.signer })
  const { appClient } = await factory.send.create.create({
    args: {
      akitaDao: environment.akitaDao,
      akitaDaoEscrow: { name: 'guild_revenue', app: environment.revenueEscrow.appId },
      version: 'guild-fee-asset-test',
      escrowFactory,
      revocation: 0n,
      domain: 'guild-fee-asset.test',
    },
    extraProgramPages: 3,
  })
  const programFactory = new AbstractedAccountProgramFactory({ algorand, defaultSender: creator.addr, defaultSigner: creator.signer })
  const program = (await programFactory.appFactory.compile()).approvalProgram
  await appClient.appClient.fundAppAccount({ amount: microAlgo(100_000n + 2_500n + 400n * (2n + BigInt(program.length))) })
  const composer = await appClient.newGroup().composer()
  composer.addAppCallMethodCall(await appClient.params.initBoxedContract({ args: { version: 'guild-fee-asset-test', size: program.length } }))
  for (let offset = 0; offset < program.length; offset += 2_032) {
    composer.addAppCallMethodCall(await appClient.params.loadBoxedContract({ args: { offset, data: program.slice(offset, offset + 2_032) } }))
  }
  await composer.send()
  return appClient
}

describe('Guild proposal fees in a chosen asset', () => {
  let environment: GuildTestEnvironment
  let walletFactory: AbstractedAccountFactoryClient
  let plugin: GuildPluginSDK
  let alice: WalletSDK
  let aliceAddress: string
  let timeWarp: TimeWarp
  let previousWalletMbrAppId: string | undefined
  let feeToken: bigint
  let otherToken: bigint

  const creatorAddress = () => environment.creator.addr.toString()

  const usePlugin = async (call: PluginSDKReturn, opUps = 8) =>
    alice.usePlugin({
      callerType: CallerType.Global,
      consolidateFees: true,
      calls: [...Array.from({ length: opUps }, (_, nonce) => plugin.opUp({ rekeyBack: false, nonce: BigInt(nonce) })), call],
    })

  const lastReturnValue = <T>(result: Awaited<ReturnType<typeof usePlugin>>): T => {
    const returned = [...result.returns].reverse().find((value) => value !== undefined && value !== null) as { returnValue?: unknown }
    return (returned && typeof returned === 'object' && 'returnValue' in returned ? returned.returnValue : returned) as T
  }

  const tokens = async (address: string, asset: bigint) => {
    const info = await environment.algorand.asset.getAccountInformation(address, asset).catch(() => undefined)
    return info?.balance ?? 0n
  }
  const algo = async (address: string) => (await environment.algorand.account.getInformation(address)).balance.microAlgo
  const isOptedIn = async (address: string, asset: bigint) =>
    (await environment.algorand.asset.getAccountInformation(address, asset).then(() => true).catch(() => false))

  /** The wallet's admin briefly holds its account key to opt it in, then hands it back. */
  const optInWallet = async (wallet: WalletSDK, asset: bigint) => {
    const address = (await wallet.client.state.global.controlledAddress())!
    await wallet.rekeyTo({ address: creatorAddress(), flash: false })
    await environment.algorand.send.assetTransfer({
      sender: address,
      signer: environment.creator.signer,
      receiver: address,
      assetId: asset,
      amount: 0n,
      rekeyTo: getApplicationAddress(wallet.client.appId),
    })
  }

  const createToken = async (name: string) =>
    (
      await environment.algorand.send.assetCreate({
        sender: environment.creator.addr,
        signer: environment.creator.signer,
        total: 1_000_000_000_000n,
        decimals: 6,
        assetName: name,
        unitName: name.slice(0, 4).toUpperCase(),
      })
    ).assetId

  /**
   * A Guild whose members are Alice's wallet and the creator's account; either one's approval passes. Its
   * fees are in `feeAsset` when given, set while it is a draft.
   */
  const createGuild = async (feeAsset?: bigint) => {
    const created = await usePlugin(
      plugin.createGuild({
        consensusName: FIXED_SIGNERS,
        baseConfig: baseConfig(proposalSettings({ fee: FEE })),
        governanceConfig: encodeAbi('(uint64)', [1n]),
        consensusConfig: encodeAbi('(uint8,(address,uint64)[])', [1, [[aliceAddress, 1n], [creatorAddress(), 1n]]]),
        nickname: 'Fee asset guild',
        funding: 2_000_000n,
        actions: [] as never,
      }),
      6,
    )
    const ids = lastReturnValue<{ guild: bigint; wallet: bigint } | [bigint, bigint, bigint]>(created)
    const guildId = Array.isArray(ids) ? ids[0] : ids.guild
    const treasuryId = Array.isArray(ids) ? ids[2] : ids.wallet
    const guild = new GuildClient({
      algorand: environment.algorand,
      appId: guildId,
      defaultSender: environment.creator.addr,
      defaultSigner: environment.creator.signer,
    })
    if (feeAsset !== undefined) {
      await usePlugin(plugin.setFeeAsset({ guild: guildId, asset: feeAsset }), 4)
    }
    await usePlugin(plugin.initialize({ guild: guildId }), 3)
    return { guild, treasury: getApplicationAddress(treasuryId).toString() }
  }

  const proposal = (guild: GuildClient, proposalId: bigint) => guild.getProposal({ args: { proposalId } })

  const proposeWithFeeAsset = async (guild: GuildClient, actions: GuildAction[]) =>
    BigInt(lastReturnValue<bigint>(await usePlugin(plugin.newProposalWithFeeAsset({ guild: guild.appId, cid: ZERO_CID, actions }))))

  const voteThrough = async (guild: GuildClient, proposalId: bigint) => {
    await usePlugin(plugin.submitProposal({ guild: guild.appId, proposalId }), 5)
    await usePlugin(plugin.voteProposal({ guild: guild.appId, proposalId, vote: APPROVE }), 4)
    await endVoting(timeWarp)
    await usePlugin(plugin.finalizeProposal({ guild: guild.appId, proposalId }), 4)
  }

  beforeAll(fixture.newScope, 120_000)
  beforeAll(async () => {
    environment = await deployGuildTestEnvironment(fixture.context.algorand, fixture.context.testAccount)
    timeWarp = new TimeWarp(environment.algorand)
    await timeWarp.resetTimeWarp()
    const dispenser = await environment.algorand.account.dispenserFromEnvironment()
    await environment.algorand.send.payment({
      sender: dispenser.addr,
      signer: dispenser.signer,
      receiver: environment.creator.addr,
      amount: microAlgo(600_000_000n),
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
    alice = await newWallet({
      algorand: environment.algorand,
      factoryParams: { appId: walletFactory.appId, defaultSender: environment.creator.addr, defaultSigner: environment.creator.signer },
      sender: environment.creator.addr,
      signer: environment.creator.signer,
      readerAccount: creatorAddress(),
      nickname: 'Alice',
      extraFunding: 200_000_000n,
    })
    aliceAddress = (await alice.client.state.global.controlledAddress())!
    const mbr = await alice.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n })
    await alice.client.appClient.fundAppAccount({ amount: microAlgo(mbr.plugins) })
    await alice.addPlugin({ client: plugin, callerType: CallerType.Global })

    feeToken = await createToken('Fee token')
    otherToken = await createToken('Other token')
    for (const asset of [feeToken, otherToken]) {
      await optInWallet(alice, asset)
      await environment.algorand.send.assetTransfer({
        sender: environment.creator.addr,
        signer: environment.creator.signer,
        receiver: aliceAddress,
        assetId: asset,
        amount: 100_000_000n,
      })
    }
  }, 600_000)

  afterAll(async () => {
    await timeWarp?.resetTimeWarp()
    if (previousWalletMbrAppId === undefined) delete process.env.WALLET_MBR_APP_ID
    else process.env.WALLET_MBR_APP_ID = previousWalletMbrAppId
  })

  test('an ALGO-fee Guild charges and forwards its fee in microALGO exactly as before', async () => {
    const { guild, treasury } = await createGuild()
    const actions = [setLimitAction(9n)]
    const quote = await plugin.proposalQuote(guild.appId, actions, creatorAddress())
    expect(quote.feeAsset).toBe(0n)
    expect(quote.fee).toBe(FEE)
    expect(quote.total).toBe(quote.mbr + FEE)
    expect(await plugin.proposalCost(guild.appId, actions, creatorAddress())).toBe(quote.total)

    const before = await algo(aliceAddress)
    const proposalId = BigInt(lastReturnValue<bigint>(await usePlugin(plugin.newProposal({ guild: guild.appId, cid: ZERO_CID, actions }))))
    const draft = await proposal(guild, proposalId)
    expect(draft.feesPaid).toBe(quote.total)
    expect(draft.feeAsset).toBe(0n)
    expect(draft.feeTokensPaid).toBe(0n)
    expect(before - (await algo(aliceAddress))).toBeGreaterThanOrEqual(quote.total)

    const treasuryBefore = await algo(treasury)
    await usePlugin(plugin.submitProposal({ guild: guild.appId, proposalId }), 5)
    expect((await algo(treasury)) - treasuryBefore).toBe(FEE)
  }, 300_000)

  test('a draft Guild opts itself and its treasury into the fee asset, paid by the creator', async () => {
    const created = await usePlugin(
      plugin.createGuild({
        consensusName: FIXED_SIGNERS,
        baseConfig: baseConfig(proposalSettings({ fee: FEE })),
        governanceConfig: encodeAbi('(uint64)', [1n]),
        consensusConfig: encodeAbi('(uint8,(address,uint64)[])', [1, [[aliceAddress, 1n]]]),
        nickname: 'Draft fee asset guild',
        funding: 1_000_000n,
        actions: [] as never,
      }),
      6,
    )
    const ids = lastReturnValue<{ guild: bigint; wallet: bigint } | [bigint, bigint, bigint]>(created)
    const guildId = Array.isArray(ids) ? ids[0] : ids.guild
    const treasury = getApplicationAddress(Array.isArray(ids) ? ids[2] : ids.wallet).toString()
    const guildAddress = getApplicationAddress(guildId).toString()

    expect(await plugin.feeAssetCost(guildId, feeToken, creatorAddress())).toBe(2n * OPT_IN_MBR + FEE_TOKEN_RESERVE_MBR)
    await expectContractError(usePlugin(plugin.setFeeAsset({ guild: guildId, asset: feeToken, maxCost: 2n * OPT_IN_MBR }), 4), errGuildCostLimitExceeded)
    await usePlugin(plugin.setFeeAsset({ guild: guildId, asset: feeToken }), 4)

    expect(await isOptedIn(guildAddress, feeToken)).toBe(true)
    expect(await isOptedIn(treasury, feeToken)).toBe(true)
    expect(await plugin.feeAssetCost(guildId, feeToken, creatorAddress())).toBe(0n)
    const guild = new GuildClient({ algorand: environment.algorand, appId: guildId, defaultSender: environment.creator.addr, defaultSigner: environment.creator.signer })
    expect((await guild.state.global.getAll()).feeAsset).toBe(feeToken)
    // the treasury's key is back with its wallet
    expect((await environment.algorand.account.getInformation(treasury)).authAddr).toBeUndefined()
  }, 300_000)

  test('the creator chooses the fee asset in the same call that creates the Guild', async () => {
    const create = (actions: GuildAction[], maxCost?: bigint) =>
      usePlugin(
        plugin.createGuild({
          consensusName: FIXED_SIGNERS,
          baseConfig: baseConfig(proposalSettings({ fee: FEE })),
          governanceConfig: encodeAbi('(uint64)', [1n]),
          consensusConfig: encodeAbi('(uint8,(address,uint64)[])', [1, [[aliceAddress, 1n], [creatorAddress(), 1n]]]),
          nickname: 'Born with a fee asset',
          funding: 1_000_000n,
          actions: actions as never,
          ...(maxCost !== undefined ? { maxCost } : {}),
        }),
        8,
      )

    // the opt-ins and the reserve box are part of what the creator's wallet pays, so `maxCost` bounds them
    const feeAssetActions = [setFeeAssetAction(feeToken) as GuildAction]
    await expectContractError(create(feeAssetActions, 2n * OPT_IN_MBR + FEE_TOKEN_RESERVE_MBR), errGuildCostLimitExceeded)

    const tokensBefore = await tokens(aliceAddress, feeToken)
    const ids = lastReturnValue<{ guild: bigint; wallet: bigint } | [bigint, bigint, bigint]>(await create(feeAssetActions))
    const guildId = Array.isArray(ids) ? ids[0] : ids.guild
    const treasury = getApplicationAddress(Array.isArray(ids) ? ids[2] : ids.wallet).toString()
    const guild = new GuildClient({ algorand: environment.algorand, appId: guildId, defaultSender: environment.creator.addr, defaultSigner: environment.creator.signer })

    expect((await guild.state.global.getAll()).feeAsset).toBe(feeToken)
    expect(await isOptedIn(guild.appAddress.toString(), feeToken)).toBe(true)
    expect(await isOptedIn(treasury, feeToken)).toBe(true)
    // the treasury's key is back with its wallet, and nothing is left to pay for the asset
    expect((await environment.algorand.account.getInformation(treasury)).authAddr).toBeUndefined()
    expect(await plugin.feeAssetCost(guildId, feeToken, creatorAddress())).toBe(0n)
    // a draft charges its creator no fee, in ALGO or in the asset
    expect(await tokens(aliceAddress, feeToken)).toBe(tokensBefore)
    // The opt-ins and the reserve box used all of what was paid for them. What the Guild holds above its
    // minimum balance is the ballot storage that every one-call creation with actions pays and a draft's
    // instant proposal never uses: the same amount as for a plain action, and sweep() sends it to the treasury.
    const spare = async (app: bigint) => {
      const account = await environment.algorand.account.getInformation(getApplicationAddress(app))
      return account.balance.microAlgo - account.minBalance.microAlgo
    }
    const plain = lastReturnValue<{ guild: bigint } | [bigint, bigint, bigint]>(await create([setLimitAction(9n)]))
    expect(await spare(guildId)).toBe(await spare(Array.isArray(plain) ? plain[0] : plain.guild))
    expect(await guild.sweepable()).toBe(await spare(guildId))
    expect((await guild.state.global.reserved()) ?? 0n).toBe(0n)

    // once it is live, the first proposal is quoted and charged in the asset
    await usePlugin(plugin.initialize({ guild: guildId }), 3)
    const quote = await plugin.proposalQuote(guildId, [setLimitAction(9n)], creatorAddress())
    expect(quote).toMatchObject({ feeAsset: feeToken, fee: FEE, total: quote.mbr })
    const proposalId = await proposeWithFeeAsset(guild, [setLimitAction(9n)])
    await usePlugin(plugin.submitProposal({ guild: guildId, proposalId }), 5)
    expect(await tokens(treasury, feeToken)).toBe(FEE)
  }, 300_000)

  test('a token fee is paid in the asset beside the ALGO storage, held while drafted, and forwarded on submit', async () => {
    const { guild, treasury } = await createGuild(feeToken)
    const actions = [setLimitAction(9n)]
    const quote = await plugin.proposalQuote(guild.appId, actions, creatorAddress())
    expect(quote.feeAsset).toBe(feeToken)
    expect(quote.fee).toBe(FEE)
    expect(quote.total).toBe(quote.mbr)

    // the ALGO-only path cannot pay a fee that is due in a token
    await expectContractError(usePlugin(plugin.newProposal({ guild: guild.appId, cid: ZERO_CID, actions })), errGuildInvalidPayment)

    const tokensBefore = await tokens(aliceAddress, feeToken)
    const proposalId = await proposeWithFeeAsset(guild, actions)
    expect(tokensBefore - (await tokens(aliceAddress, feeToken))).toBe(FEE)
    const draft = await proposal(guild, proposalId)
    expect(draft.feesPaid).toBe(quote.total)
    expect(draft.feeAsset).toBe(feeToken)
    expect(draft.feeTokensPaid).toBe(FEE)
    expect(await tokens(guild.appAddress.toString(), feeToken)).toBe(FEE)
    expect(await guild.sweepableFeeTokens({ args: { asset: feeToken } })).toBe(0n)

    const treasuryAlgo = await algo(treasury)
    await usePlugin(plugin.submitProposal({ guild: guild.appId, proposalId }), 5)
    expect(await tokens(treasury, feeToken)).toBe(FEE)
    expect(await tokens(guild.appAddress.toString(), feeToken)).toBe(0n)
    expect(await algo(treasury)).toBe(treasuryAlgo)
    const voting = await proposal(guild, proposalId)
    expect(voting.status).toBe(STATUS_VOTING)
    expect(voting.feeTokensPaid).toBe(0n)

    // cancelling the approved proposal returns its ALGO reserve; the fee already belongs to the treasury
    await usePlugin(plugin.voteProposal({ guild: guild.appId, proposalId, vote: APPROVE }), 4)
    await endVoting(timeWarp)
    await usePlugin(plugin.finalizeProposal({ guild: guild.appId, proposalId }), 4)
    expect((await proposal(guild, proposalId)).status).toBe(STATUS_APPROVED)
    const aliceTokens = await tokens(aliceAddress, feeToken)
    await usePlugin(plugin.cancelProposal({ guild: guild.appId, proposalId }), 3)
    expect((await proposal(guild, proposalId)).status).toBe(STATUS_INVALID)
    expect(await tokens(aliceAddress, feeToken)).toBe(aliceTokens)
    expect(await tokens(treasury, feeToken)).toBe(FEE)
  }, 300_000)

  test('rejects a fee transfer in the wrong asset, of the wrong amount, to the wrong receiver, or with a rekey', async () => {
    const { guild } = await createGuild(feeToken)
    const actions = [setLimitAction(7n)]
    const { total } = await plugin.proposalQuote(guild.appId, actions, creatorAddress())
    const { algorand, creator } = environment
    const sendDirect = (feePayment: Parameters<typeof algorand.createTransaction.assetTransfer>[0]) =>
      guild.send.newProposalWithFeeAsset({
        args: {
          payment: algorand.createTransaction.payment({ sender: creator.addr, receiver: guild.appAddress, amount: microAlgo(total) }),
          feePayment: algorand.createTransaction.assetTransfer(feePayment),
          cid: ZERO_CID,
          actions,
          evidence: EMPTY_EVIDENCE,
        },
        maxFee: MAX_APP_CALL_FEE,
        coverAppCallInnerTransactionFees: true,
        populateAppCallResources: true,
      })
    const transfer = { sender: creator.addr, receiver: guild.appAddress, assetId: feeToken, amount: FEE }

    await expectContractError(sendDirect({ ...transfer, amount: FEE - 1n }), errGuildInvalidPayment)
    await expectContractError(sendDirect({ ...transfer, amount: FEE + 1n }), errGuildInvalidPayment)
    await expectContractError(sendDirect({ ...transfer, receiver: creator.addr }), errGuildInvalidPayment)
    await expectContractError(sendDirect({ ...transfer, rekeyTo: algorand.account.random().addr }), errGuildInvalidPayment)

    // a Guild that once charged in another asset still holds it, so a transfer of it reaches the check
    const twoAssets = await createGuildWithFeeAssets([otherToken, feeToken])
    const twoTotal = (await plugin.proposalQuote(twoAssets.appId, actions, creatorAddress())).total
    await expectContractError(
      twoAssets.send.newProposalWithFeeAsset({
        args: {
          payment: algorand.createTransaction.payment({ sender: creator.addr, receiver: twoAssets.appAddress, amount: microAlgo(twoTotal) }),
          feePayment: algorand.createTransaction.assetTransfer({ sender: creator.addr, receiver: twoAssets.appAddress, assetId: otherToken, amount: FEE }),
          cid: ZERO_CID,
          actions,
          evidence: EMPTY_EVIDENCE,
        },
        maxFee: MAX_APP_CALL_FEE,
        coverAppCallInnerTransactionFees: true,
        populateAppCallResources: true,
      }),
      errGuildInvalidPayment,
    )

    // the right transfer passes
    const created = await sendDirect(transfer)
    expect((await proposal(guild, created.return!)).feeTokensPaid).toBe(FEE)

    // the plugin refuses to pay more than quoted, or in an asset other than the one quoted
    await expectContractError(
      usePlugin(plugin.newProposalWithFeeAsset({ guild: guild.appId, cid: ZERO_CID, actions, maxFee: FEE - 1n })),
      errGuildCostLimitExceeded,
    )
    await expectContractError(
      usePlugin(plugin.newProposalWithFeeAsset({ guild: guild.appId, cid: ZERO_CID, actions, feeAsset: otherToken })),
      errGuildCostLimitExceeded,
    )
  }, 300_000)

  test('edits top up and surplus is refunded in tokens; deleting a draft refunds both currencies', async () => {
    const { guild, treasury } = await createGuild(feeToken)
    const one = [setLimitAction(9n)]
    const two = [setLimitAction(9n), setLimitAction(8n)]

    const proposalId = await proposeWithFeeAsset(guild, one)
    const quoteTwo = await plugin.proposalEditQuote(guild.appId, proposalId, two, creatorAddress())
    expect(quoteTwo.fee).toBe(FEE)
    expect(quoteTwo.total).toBeGreaterThan(0n)
    let aliceTokens = await tokens(aliceAddress, feeToken)
    await usePlugin(plugin.editProposalWithFeeAsset({ guild: guild.appId, proposalId, cid: ZERO_CID, actions: two }))
    expect(aliceTokens - (await tokens(aliceAddress, feeToken))).toBe(FEE)
    expect((await proposal(guild, proposalId)).feeTokensPaid).toBe(2n * FEE)

    // shrinking keeps the prepayment until submission, as ALGO fees do
    expect(await plugin.proposalEditQuote(guild.appId, proposalId, one, creatorAddress())).toEqual({ total: 0n, fee: 0n, feeAsset: feeToken })
    await usePlugin(plugin.editProposalWithFeeAsset({ guild: guild.appId, proposalId, cid: ZERO_CID, actions: one }))
    expect((await proposal(guild, proposalId)).feeTokensPaid).toBe(2n * FEE)

    // submission forwards the fee and refunds the surplus in the fee asset
    aliceTokens = await tokens(aliceAddress, feeToken)
    await usePlugin(plugin.submitProposal({ guild: guild.appId, proposalId }), 5)
    expect((await tokens(aliceAddress, feeToken)) - aliceTokens).toBe(FEE)
    expect(await tokens(treasury, feeToken)).toBe(FEE)
    expect(await tokens(guild.appAddress.toString(), feeToken)).toBe(0n)

    // deleting a draft returns the tokens and the ALGO storage
    const deleted = await proposeWithFeeAsset(guild, two)
    const paid = (await proposal(guild, deleted)).feesPaid
    aliceTokens = await tokens(aliceAddress, feeToken)
    const aliceAlgo = await algo(aliceAddress)
    await usePlugin(plugin.deleteProposal({ guild: guild.appId, proposalId: deleted }), 3)
    expect((await tokens(aliceAddress, feeToken)) - aliceTokens).toBe(2n * FEE)
    // the refund arrives in the same group that pays the call's fees
    expect((await algo(aliceAddress)) - aliceAlgo).toBeGreaterThan(paid - 200_000n)
    expect(await tokens(guild.appAddress.toString(), feeToken)).toBe(0n)
    await expect(proposal(guild, deleted)).rejects.toThrow()
  }, 300_000)

  test('governance changes the fee asset; older drafts can only be deleted, refunded in the asset they paid', async () => {
    const { guild, treasury } = await createGuild(feeToken)
    const stale = await proposeWithFeeAsset(guild, [setLimitAction(5n)])

    const change = await proposeWithFeeAsset(guild, [setFeeAssetAction(otherToken) as GuildAction])
    const reserved = (await proposal(guild, change)).feesPaid
    expect(reserved).toBeGreaterThanOrEqual(2n * OPT_IN_MBR + FEE_TOKEN_RESERVE_MBR)
    await voteThrough(guild, change)
    await usePlugin(plugin.executeProposal({ guild: guild.appId, proposalId: change }), 6)
    expect((await proposal(guild, change)).status).toBe(STATUS_EXECUTED)
    expect((await guild.state.global.getAll()).feeAsset).toBe(otherToken)
    expect(await isOptedIn(guild.appAddress.toString(), otherToken)).toBe(true)
    expect(await isOptedIn(treasury, otherToken)).toBe(true)
    expect((await environment.algorand.account.getInformation(treasury)).authAddr).toBeUndefined()

    // the stale draft paid in the old asset: it cannot be edited or submitted, and deleting it refunds that asset
    await expectContractError(
      usePlugin(plugin.editProposalWithFeeAsset({ guild: guild.appId, proposalId: stale, cid: ZERO_CID, actions: [setLimitAction(4n)] })),
      errGuildFeeAssetChanged,
    )
    await expectContractError(usePlugin(plugin.submitProposal({ guild: guild.appId, proposalId: stale }), 5), errGuildFeeAssetChanged)
    const aliceFeeTokens = await tokens(aliceAddress, feeToken)
    await usePlugin(plugin.deleteProposal({ guild: guild.appId, proposalId: stale }), 3)
    expect((await tokens(aliceAddress, feeToken)) - aliceFeeTokens).toBe(FEE)
    expect(await tokens(guild.appAddress.toString(), feeToken)).toBe(0n)

    // new proposals pay in the new asset
    const fresh = await proposeWithFeeAsset(guild, [setLimitAction(6n)])
    expect((await proposal(guild, fresh)).feeAsset).toBe(otherToken)
    expect(await tokens(guild.appAddress.toString(), otherToken)).toBe(FEE)
    await usePlugin(plugin.deleteProposal({ guild: guild.appId, proposalId: fresh }), 3)

    // and governance can return to ALGO fees
    const toAlgo = await proposeWithFeeAsset(guild, [setFeeAssetAction(0n) as GuildAction])
    await voteThrough(guild, toAlgo)
    await usePlugin(plugin.executeProposal({ guild: guild.appId, proposalId: toAlgo }), 6)
    expect((await guild.state.global.getAll()).feeAsset).toBe(0n)
    const quote = await plugin.proposalQuote(guild.appId, [setLimitAction(6n)], creatorAddress())
    expect(quote).toMatchObject({ feeAsset: 0n, fee: FEE, total: quote.mbr + FEE })
  }, 600_000)

  /** A draft Guild that charged in each of `assets` in turn, so it is opted into all of them. */
  const createGuildWithFeeAssets = async (assets: bigint[]) => {
    const created = await usePlugin(
      plugin.createGuild({
        consensusName: FIXED_SIGNERS,
        baseConfig: baseConfig(proposalSettings({ fee: FEE })),
        governanceConfig: encodeAbi('(uint64)', [1n]),
        consensusConfig: encodeAbi('(uint8,(address,uint64)[])', [1, [[aliceAddress, 1n], [creatorAddress(), 1n]]]),
        nickname: 'Multi asset guild',
        funding: 1_000_000n,
        actions: [] as never,
      }),
      6,
    )
    const ids = lastReturnValue<{ guild: bigint } | [bigint, bigint, bigint]>(created)
    const guildId = Array.isArray(ids) ? ids[0] : ids.guild
    for (const asset of assets) {
      await usePlugin(plugin.setFeeAsset({ guild: guildId, asset }), 4)
    }
    await usePlugin(plugin.initialize({ guild: guildId }), 3)
    return new GuildClient({ algorand: environment.algorand, appId: guildId, defaultSender: environment.creator.addr, defaultSigner: environment.creator.signer })
  }
})

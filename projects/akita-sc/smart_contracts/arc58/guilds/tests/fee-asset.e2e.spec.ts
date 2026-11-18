// Fee asset paths that plugins/guild/guild-fee-asset.e2e.spec.ts does not reach, called on the Guild
// directly with the real wallet factory: a Guild without a wallet, sweepFeeTokens, a fee above one
// million base units, a freeze on the fee asset, a proposer who opted out before a refund, and a wallet
// proposal approved before a fee asset was set. The freeze and wallet-proposal tests pin behaviour the
// owner accepted on 2026-11-15 (audit items C19 and C20).
import { microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { getApplicationAddress } from 'algosdk'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { TimeWarp } from '../../../../tests/utils/time'
import { deployEscrowFactory } from '../../../../tests/fixtures/escrow'
import { AbstractedAccountFactory as AbstractedAccountProgramFactory } from '../../../artifacts/arc58/account/AbstractedAccountClient'
import { MockGuildAkitaDaoClient } from '../../../artifacts/arc58/guilds/tests/MockGuildAkitaDAOClient'
import { AbstractedAccountFactoryFactory } from '../../../artifacts/arc58/account/AbstractedAccountFactoryClient'
import { GuildClient } from '../../../artifacts/arc58/guilds/core/GuildClient'
import { AbstractedAccountMbrFactory } from '../../../artifacts/arc58/account/AbstractedAccountMBRClient'
import {
  APPROVE,
  balanceOf,
  baseConfig,
  cancelProposal,
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
  generateGuildTestAccount,
  MAX_APP_CALL_FEE,
  minBalanceOf,
  mintGuild,
  newWalletAction,
  proposalCostOf,
  proposalSettings,
  setLimitAction,
  submitProposal,
  vote,
  ZERO_CID,
  type GuildAction,
  type GuildTestEnvironment,
} from './test-helpers'
import { errGuildInvalidPayment, errGuildWalletRequired } from '../core/errors'
import { setFeeAssetAction } from '../../../../../akita-sdk/src/guild'

const fixture = algorandFixture()
let environment: GuildTestEnvironment
let timeWarp: TimeWarp
let previousWalletMbrAppId: string | undefined
const send = { maxFee: MAX_APP_CALL_FEE, populateAppCallResources: true, coverAppCallInnerTransactionFees: true }
const FEE = 250_000n
const OPT_IN = 100_000n
const RESERVE_BOX = 9_300n

type Env = GuildTestEnvironment

const ops = (guild: GuildClient, prefix: string, count = 5) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- every opUp widens the composer's return tuple
  let group: any = guild.newGroup()
  for (let i = 0; i < count; i += 1) group = group.opUp({ args: {}, note: `${prefix}-op-${i}`, maxFee: MAX_APP_CALL_FEE })
  return group
}

const tokens = async (address: string, asset: bigint) =>
  (await environment.algorand.asset.getAccountInformation(address, asset).catch(() => undefined))?.balance ?? 0n
const optedIn = async (address: string, asset: bigint) =>
  environment.algorand.asset.getAccountInformation(address, asset).then(() => true).catch(() => false)

const deployRealWalletFactory = async (escrowFactory: bigint) => {
  const { algorand, creator } = environment
  const factory = new AbstractedAccountFactoryFactory({ algorand, defaultSender: creator.addr, defaultSigner: creator.signer })
  const { appClient } = await factory.send.create.create({
    args: {
      akitaDao: environment.akitaDao,
      akitaDaoEscrow: { name: 'guild_revenue', app: environment.revenueEscrow.appId },
      version: 'guild-fee-asset-paths',
      escrowFactory,
      revocation: 0n,
      domain: 'guild-fee-asset-paths.test',
    },
    extraProgramPages: 3,
  })
  const programFactory = new AbstractedAccountProgramFactory({ algorand, defaultSender: creator.addr, defaultSigner: creator.signer })
  const program = (await programFactory.appFactory.compile()).approvalProgram
  await appClient.appClient.fundAppAccount({ amount: microAlgo(100_000n + 2_500n + 400n * (2n + BigInt(program.length))) })
  const composer = await appClient.newGroup().composer()
  composer.addAppCallMethodCall(await appClient.params.initBoxedContract({ args: { version: 'guild-fee-asset-paths', size: program.length } }))
  for (let offset = 0; offset < program.length; offset += 2_032) {
    composer.addAppCallMethodCall(await appClient.params.loadBoxedContract({ args: { offset, data: program.slice(offset, offset + 2_032) } }))
  }
  await composer.send()
  return appClient
}

/** A fixed-signer Guild whose only member is `env.creator`. */
const mint = async (env: Env, options: { feeAsset?: bigint; wallet: boolean; fee?: bigint }) => {
  const settings = proposalSettings({ fee: options.fee ?? FEE })
  const { guild } = await mintGuild(env, FIXED_SIGNERS, fixedSignerConfig(1n), settings, env.creator, baseConfig(settings))
  const memberMbr = await env.algorand.createTransaction.payment({
    sender: env.creator.addr,
    signer: env.creator.signer,
    receiver: guild.appAddress,
    amount: microAlgo(31_400n),
  })
  await guild.send.configureConsensus({
    args: { mbrPayment: memberMbr, config: fixedSignerConfiguration(1, [[env.creator.addr.toString(), 1n]]) },
    ...send,
  })
  let treasury: string | undefined
  if (options.wallet) {
    const setupCost = await guild.setupCost({ args: {}, staticFee: MAX_APP_CALL_FEE })
    await guild.appClient.fundAppAccount({ amount: microAlgo(setupCost) })
    const setup = await ops(guild, 'setup').setup({ args: { nickname: 'Guild treasury', salt: new Uint8Array(32) }, maxFee: MAX_APP_CALL_FEE }).send(send)
    treasury = getApplicationAddress(setup.returns[5]!).toString()
  }
  if (options.feeAsset !== undefined) {
    const cost = await guild.feeAssetCost({ args: { asset: options.feeAsset }, staticFee: MAX_APP_CALL_FEE })
    expect(cost).toBe((options.wallet ? 2n : 1n) * OPT_IN + RESERVE_BOX)
    const mbrPayment = await env.algorand.createTransaction.payment({
      sender: env.creator.addr,
      signer: env.creator.signer,
      receiver: guild.appAddress,
      amount: microAlgo(cost),
    })
    await ops(guild, 'fee-asset', 3).setFeeAsset({ args: { mbrPayment, asset: options.feeAsset }, maxFee: MAX_APP_CALL_FEE }).send(send)
  }
  return { guild, treasury }
}

const proposeWithToken = async (env: Env, guild: GuildClient, actions: GuildAction[]) => {
  const cost = await proposalCostOf(guild, actions)
  const payment = await env.algorand.createTransaction.payment({
    sender: env.creator.addr,
    signer: env.creator.signer,
    receiver: guild.appAddress,
    amount: microAlgo(cost.total),
  })
  const feePayment = await env.algorand.createTransaction.assetTransfer({
    sender: env.creator.addr,
    signer: env.creator.signer,
    receiver: guild.appAddress,
    assetId: cost.feeAsset,
    amount: cost.fee,
  })
  const created = await ops(guild, 'token-proposal')
    .newProposalWithFeeAsset({ args: { payment, feePayment, cid: ZERO_CID, actions, evidence: EMPTY_EVIDENCE }, maxFee: MAX_APP_CALL_FEE })
    .send(send)
  return { id: created.returns[5]!, cost }
}

const voteThrough = async (env: Env, guild: GuildClient, proposalId: bigint) => {
  await submitProposal(guild, proposalId)
  await vote(env, guild, env.creator, proposalId, APPROVE)
  await endVoting(timeWarp)
  await finalizeProposal(guild, proposalId)
}

const expectNoStrandedAlgo = async (guild: GuildClient) => {
  const balance = await balanceOf(environment, guild.appAddress)
  const minimum = await minBalanceOf(environment, guild.appAddress)
  expect(balance - minimum).toBe((await guild.state.global.reserved()) ?? 0n)
}

const failure = async (operation: Promise<unknown>): Promise<string> => {
  try {
    await operation
  } catch (error) {
    const messages: string[] = []
    let current: unknown = error
    const seen = new Set<unknown>()
    while (current instanceof Error && !seen.has(current)) {
      seen.add(current)
      messages.push(current.message)
      current = (current as Error & { cause?: unknown }).cause
    }
    return messages.join('\n')
  }
  return ''
}

describe('Guild fee asset: no wallet, sweeps, large fees, freezes and forfeits', () => {
  let feeToken: bigint
  let freezable: bigint

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
    const mbrFactory = new AbstractedAccountMbrFactory({ algorand: environment.algorand, defaultSender: environment.creator.addr, defaultSigner: environment.creator.signer })
    process.env.WALLET_MBR_APP_ID = (await mbrFactory.send.create.bare()).appClient.appId.toString()
    const escrowFactory = await deployEscrowFactory({ fixture, sender: environment.creator.addr, signer: environment.creator.signer })
    const walletFactory = await deployRealWalletFactory(escrowFactory.appId)
    await new MockGuildAkitaDaoClient({
      algorand: environment.algorand,
      appId: environment.akitaDao,
      defaultSender: environment.creator.addr,
      defaultSigner: environment.creator.signer,
    }).send.setWalletFactory({ args: { wallet: walletFactory.appId } })
    const { creator, algorand } = environment
    feeToken = (await algorand.send.assetCreate({ sender: creator.addr, signer: creator.signer, total: 1_000_000_000_000n, decimals: 6, assetName: 'Fee token', unitName: 'FEE' })).assetId
    freezable = (
      await algorand.send.assetCreate({
        sender: creator.addr,
        signer: creator.signer,
        total: 1_000_000_000_000n,
        decimals: 6,
        assetName: 'Freezable fee token',
        unitName: 'FRZ',
        manager: creator.addr,
        freeze: creator.addr,
      })
    ).assetId
  }, 600_000)

  afterAll(async () => {
    await timeWarp?.resetTimeWarp()
    if (previousWalletMbrAppId === undefined) delete process.env.WALLET_MBR_APP_ID
    else process.env.WALLET_MBR_APP_ID = previousWalletMbrAppId
  })

  test('fees wait in a Guild without a wallet, a voted wallet opts in, and sweepFeeTokens forwards them', async () => {
    const { guild } = await mint(environment, { feeAsset: feeToken, wallet: false })
    const guildAddress = guild.appAddress.toString()

    await guild.send.partiallyInitialize({ args: {}, ...send })
    await expectNoStrandedAlgo(guild)

    const first = await proposeWithToken(environment, guild, [setLimitAction(9n)])
    expect(first.cost.fee).toBe(FEE)
    expect(await guild.sweepableFeeTokens({ args: { asset: feeToken } })).toBe(0n)
    await submitProposal(guild, first.id)
    // no wallet: the fee stays in the Guild, outside any draft reserve
    expect(await tokens(guildAddress, feeToken)).toBe(FEE)
    expect(await guild.sweepableFeeTokens({ args: { asset: feeToken } })).toBe(FEE)
    await expectContractError(guild.send.sweepFeeTokens({ args: { asset: feeToken }, ...send }), errGuildWalletRequired)
    await expectNoStrandedAlgo(guild)

    const walletProposal = await proposeWithToken(environment, guild, [newWalletAction('voted wallet')])
    await voteThrough(environment, guild, walletProposal.id)
    await executeProposal(guild, walletProposal.id)
    const walletId = (await guild.state.global.getAll()).wallet!
    const treasury = getApplicationAddress(walletId).toString()
    expect(await optedIn(treasury, feeToken)).toBe(true)
    expect((await environment.algorand.account.getInformation(treasury)).authAddr).toBeUndefined()
    await expectNoStrandedAlgo(guild)

    const outsider = await generateGuildTestAccount(environment, 5_000_000n)
    const outsiderGuild = guild.clone({ defaultSender: outsider.addr, defaultSigner: outsider.signer })
    expect(await guild.sweepableFeeTokens({ args: { asset: feeToken } })).toBe(2n * FEE)
    const swept = await outsiderGuild.send.sweepFeeTokens({ args: { asset: feeToken }, ...send })
    expect(swept.return).toBe(2n * FEE)
    expect(await tokens(treasury, feeToken)).toBe(2n * FEE)
    expect(await tokens(guildAddress, feeToken)).toBe(0n)
    await expectNoStrandedAlgo(guild)
  }, 600_000)

  test('a fee above one million base units is charged, held and forwarded in the asset', async () => {
    // 5,000 whole tokens at 6 decimals: far above the 1,000,000 base units that were the ceiling until 2026-11-15
    const LARGE_FEE = 5_000_000_000n
    const { guild, treasury } = await mint(environment, { feeAsset: feeToken, wallet: true, fee: LARGE_FEE })
    await guild.send.initialize({ args: {}, ...send })
    const creator = environment.creator.addr.toString()

    const before = await tokens(creator, feeToken)
    const draft = await proposeWithToken(environment, guild, [setLimitAction(9n), setLimitAction(8n)])
    expect(draft.cost).toMatchObject({ feeAsset: feeToken, fee: 2n * LARGE_FEE, total: draft.cost.mbr })
    expect(before - (await tokens(creator, feeToken))).toBe(2n * LARGE_FEE)
    expect(await tokens(guild.appAddress.toString(), feeToken)).toBe(2n * LARGE_FEE)

    await submitProposal(guild, draft.id)
    expect(await tokens(treasury!, feeToken)).toBe(2n * LARGE_FEE)
    expect(await tokens(guild.appAddress.toString(), feeToken)).toBe(0n)
    await expectNoStrandedAlgo(guild)
  }, 600_000)

  // Accepted (C20): the Guild cancels and proposes again, or opts the treasury in afterwards.
  test('a wallet proposal approved under ALGO fees cannot execute once a fee asset is set first', async () => {
    const { guild } = await mint(environment, { wallet: false, fee: 0n })
    await guild.send.partiallyInitialize({ args: {}, ...send })

    const walletProposal = await createProposal(environment, guild, [newWalletAction('late wallet')])
    await voteThrough(environment, guild, walletProposal)

    const change = await createProposal(environment, guild, [setFeeAssetAction(feeToken) as GuildAction])
    await voteThrough(environment, guild, change)
    await executeProposal(guild, change)
    expect((await guild.state.global.getAll()).feeAsset).toBe(feeToken)
    await expectNoStrandedAlgo(guild)

    const message = await failure(executeProposal(guild, walletProposal))
    // without other free balance the protocol refuses the payment first; with it the Guild's own check does
    expect(message.includes(errGuildInvalidPayment) || /below min/.test(message)).toBe(true)
    expect((await guild.state.global.getAll()).wallet).toBeUndefined()

    // the proposer's way out: cancel and propose again
    await cancelProposal(guild, walletProposal)
    await expectNoStrandedAlgo(guild)
  }, 600_000)

  // Accepted (C19): which asset to charge in, and the freeze risk that comes with it, is the Guild's choice.
  test('a freeze on the treasury or the Guild stops submissions, refunds and new proposals', async () => {
    const { guild, treasury } = await mint(environment, { feeAsset: freezable, wallet: true })
    await guild.send.initialize({ args: {}, ...send })
    const { algorand, creator } = environment
    const freeze = (account: string, frozen: boolean) =>
      algorand.send.assetFreeze({ sender: creator.addr, signer: creator.signer, assetId: freezable, account, frozen })

    const draft = await proposeWithToken(environment, guild, [setLimitAction(9n)])
    await freeze(treasury!, true)
    const submitMessage = await failure(submitProposal(guild, draft.id))
    expect(submitMessage).toMatch(/frozen/)
    // the draft can still be deleted: the refund goes to the proposer
    await guild.send.deleteProposal({ args: { proposalId: draft.id }, ...send })
    await freeze(treasury!, false)

    const second = await proposeWithToken(environment, guild, [setLimitAction(8n)])
    await freeze(guild.appAddress.toString(), true)
    const deleteMessage = await failure(guild.send.deleteProposal({ args: { proposalId: second.id }, ...send }))
    expect(deleteMessage).toMatch(/frozen/)
    const submitFrozen = await failure(submitProposal(guild, second.id))
    expect(submitFrozen).toMatch(/frozen/)
    const proposeMessage = await failure(proposeWithToken(environment, guild, [setFeeAssetAction(0n) as GuildAction]))
    expect(proposeMessage).toMatch(/frozen/)
    // and the ALGO path cannot stand in for a fee that is due in the token
    await expectContractError(createProposal(environment, guild, [setFeeAssetAction(0n) as GuildAction]), errGuildInvalidPayment)

    await freeze(guild.appAddress.toString(), false)
    await guild.send.deleteProposal({ args: { proposalId: second.id }, ...send })
    expect(await tokens(guild.appAddress.toString(), freezable)).toBe(0n)
  }, 600_000)

  test('a sponsor can pay a draft\'s ALGO and its fee tokens, and gets both back when the proposer deletes it', async () => {
    const sponsor = await generateGuildTestAccount(environment, 80_000_000n)
    const { algorand, creator } = environment
    await algorand.send.assetOptIn({ sender: sponsor.addr, signer: sponsor.signer, assetId: feeToken })
    await algorand.send.assetTransfer({ sender: creator.addr, signer: creator.signer, receiver: sponsor.addr, assetId: feeToken, amount: FEE })

    const { guild } = await mint(environment, { feeAsset: feeToken, wallet: false })
    await guild.send.partiallyInitialize({ args: {}, ...send })
    const actions = [setLimitAction(9n)]
    const cost = await proposalCostOf(guild, actions)
    const creatorTokens = await tokens(creator.addr.toString(), feeToken)
    const sponsorBefore = await balanceOf(environment, sponsor.addr)
    const created = await ops(guild, 'sponsored-token-proposal')
      .newProposalWithFeeAsset({
        args: {
          payment: {
            txn: await algorand.createTransaction.payment({ sender: sponsor.addr, receiver: guild.appAddress, amount: microAlgo(cost.total) }),
            signer: sponsor.signer,
          },
          feePayment: {
            txn: await algorand.createTransaction.assetTransfer({ sender: sponsor.addr, receiver: guild.appAddress, assetId: cost.feeAsset, amount: cost.fee }),
            signer: sponsor.signer,
          },
          cid: ZERO_CID, actions, evidence: EMPTY_EVIDENCE,
        },
        maxFee: MAX_APP_CALL_FEE,
      })
      .send(send)
    const id = created.returns[5]!
    // the proposer paid nothing but network fees: the sponsor's two transfers carried the storage and the fee
    expect(sponsorBefore - (await balanceOf(environment, sponsor.addr))).toBe(cost.total + 2_000n)
    expect(await tokens(sponsor.addr.toString(), feeToken)).toBe(0n)
    expect(await tokens(creator.addr.toString(), feeToken)).toBe(creatorTokens)
    const draft = await guild.getProposal({ args: { proposalId: id } })
    expect(draft.payer).toBe(sponsor.addr.toString())
    expect(draft.feeTokenPayer).toBe(sponsor.addr.toString())

    // the proposer deletes the draft: the ALGO and the tokens go back to the account that paid them
    const held = await balanceOf(environment, sponsor.addr)
    await guild.send.deleteProposal({ args: { proposalId: id }, ...send })
    expect((await balanceOf(environment, sponsor.addr)) - held).toBe(draft.feesPaid)
    expect(await tokens(sponsor.addr.toString(), feeToken)).toBe(FEE)
    expect(await tokens(creator.addr.toString(), feeToken)).toBe(creatorTokens)
    expect(await tokens(guild.appAddress.toString(), feeToken)).toBe(0n)
    await expectNoStrandedAlgo(guild)
  }, 600_000)

  test('a proposer who opted out forfeits the token refund to the treasury and still gets the ALGO back', async () => {
    const bob = await generateGuildTestAccount(environment, 80_000_000n)
    const bobEnv: Env = { ...environment, creator: bob }
    const { algorand, creator } = environment
    await algorand.send.assetOptIn({ sender: bob.addr, signer: bob.signer, assetId: feeToken })
    await algorand.send.assetTransfer({ sender: creator.addr, signer: creator.signer, receiver: bob.addr, assetId: feeToken, amount: FEE })

    const { guild, treasury } = await mint(bobEnv, { feeAsset: feeToken, wallet: true })
    await guild.send.initialize({ args: {}, ...send })
    const draft = await proposeWithToken(bobEnv, guild, [setLimitAction(9n)])
    expect(await tokens(bob.addr.toString(), feeToken)).toBe(0n)
    await algorand.send.assetOptOut({ sender: bob.addr, signer: bob.signer, assetId: feeToken, creator: creator.addr, ensureZeroBalance: true })

    const paid = (await guild.getProposal({ args: { proposalId: draft.id } })).feesPaid
    const before = await balanceOf(environment, bob.addr)
    await guild.send.deleteProposal({ args: { proposalId: draft.id }, ...send })
    expect(await tokens(treasury!, feeToken)).toBe(FEE)
    expect(await tokens(guild.appAddress.toString(), feeToken)).toBe(0n)
    expect((await balanceOf(environment, bob.addr)) - before).toBeGreaterThan(paid - 200_000n)
    await expectNoStrandedAlgo(guild)
  }, 600_000)
})

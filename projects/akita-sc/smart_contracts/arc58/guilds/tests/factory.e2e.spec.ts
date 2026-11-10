import { microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import type { TransactionSignerAccount as AddressWithTransactionSigner } from '@algorandfoundation/algokit-utils/types/account';
import { beforeAll, describe, expect, test } from 'vitest'
import {
  FixedSignerGuildConsensusClient,
  FixedSignerGuildConsensusFactory,
} from '../../../artifacts/arc58/guilds/consensus/fixed-signers/FixedSignerGuildConsensusClient'
import { LockedTokenGuildConsensusClient } from '../../../artifacts/arc58/guilds/consensus/locked-token/LockedTokenGuildConsensusClient'
import { SubscriptionGuildConsensusClient } from '../../../artifacts/arc58/guilds/consensus/subscriptions/SubscriptionGuildConsensusClient'
import { MockGuildAkitaDaoClient } from '../../../artifacts/arc58/guilds/tests/MockGuildAkitaDAOClient'
import {
  baseConfig,
  deployGuildTestEnvironment,
  encodeAbi,
  expectContractError,
  FIXED_SIGNERS,
  generateGuildTestAccount,
  GUILD_PROGRAM,
  LOCKED_TOKEN,
  lockedTokenConfig,
  MAX_APP_CALL_FEE,
  MAX_GUILD_APPROVAL_PROGRAM_SIZE,
  mintGuild,
  mintLockedGuild,
  proposalSettings,
  SUBSCRIPTIONS,
  uploadConsensusProgram,
  type GuildTestEnvironment,
} from './test-helpers'

const fixture = algorandFixture()
const CREATE_FEE = 123_456n
let environment: GuildTestEnvironment

const programPayment = async (
  sender: AddressWithTransactionSigner,
  programName: string,
  size: bigint,
  amount?: bigint,
) =>
  environment.algorand.createTransaction.payment({
    sender: sender.addr,
    signer: sender.signer,
    receiver: programName === GUILD_PROGRAM ? environment.factory.appAddress : environment.consensusFactory.appAddress,
    amount: microAlgo(amount ?? (await environment.factory.programMbr({ args: { programName, size } }))),
  })

const sendNewGuild = async (sender: AddressWithTransactionSigner, amount: bigint) => {
  const factory = environment.factory.clone({ defaultSender: sender.addr, defaultSigner: sender.signer })
  const payment = await environment.algorand.createTransaction.payment({
    sender: sender.addr,
    signer: sender.signer,
    receiver: factory.appAddress,
    amount: microAlgo(amount),
    note: 'guild-factory-payment-validation',
  })
  return factory
    .newGroup()
    .opUp({ args: {}, note: 'factory-payment-opup-1', maxFee: MAX_APP_CALL_FEE })
    .opUp({ args: {}, note: 'factory-payment-opup-2', maxFee: MAX_APP_CALL_FEE })
    .newGuild({
      args: {
        payment,
        consensusName: LOCKED_TOKEN,
        baseConfig: baseConfig(proposalSettings()),
        governanceConfig: lockedTokenConfig(1n, 1n, 1n),
      },
      maxFee: MAX_APP_CALL_FEE,
    })
    .send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true })
}

describe('Guild factory', () => {
  beforeAll(fixture.newScope, 120_000)
  beforeAll(async () => {
    environment = await deployGuildTestEnvironment(fixture.context.algorand, fixture.context.testAccount, CREATE_FEE)
  }, 180_000)

  test('reports deployment costs and rejects unauthorized, malformed, and unsupported factory operations', async () => {
    const outsider = await fixture.context.generateAccount({ initialFunds: microAlgo(3_000_000n) })
    expect(await environment.factory.guildCreateFee({ args: {} })).toBe(CREATE_FEE)
    expect(await environment.factory.programMbr({ args: { programName: GUILD_PROGRAM, size: 0n } })).toBe(4_900n)
    expect(await environment.factory.programMbr({ args: { programName: GUILD_PROGRAM, size: 10n } })).toBe(8_900n)
    expect(await environment.factory.programMbr({ args: { programName: 'x', size: 0n } })).toBe(3_300n)
    expect(await environment.factory.programMbr({ args: { programName: 'x', size: 10n } })).toBe(7_300n)
    const cost = await environment.factory.cost({ args: { consensusName: LOCKED_TOKEN }, staticFee: MAX_APP_CALL_FEE })
    expect(cost).toBeGreaterThan(CREATE_FEE)
    expect(await environment.factory.cost({ args: { consensusName: FIXED_SIGNERS }, staticFee: MAX_APP_CALL_FEE })).toBeGreaterThan(CREATE_FEE)
    expect(await environment.factory.cost({ args: { consensusName: SUBSCRIPTIONS }, staticFee: MAX_APP_CALL_FEE })).toBeGreaterThan(CREATE_FEE)

    await expectContractError(environment.factory.cost({ args: { consensusName: '' }, staticFee: MAX_APP_CALL_FEE }), 'ERR:errGfty')
    await expectContractError(environment.factory.cost({ args: { consensusName: GUILD_PROGRAM }, staticFee: MAX_APP_CALL_FEE }), 'ERR:errGfty')
    await expectContractError(environment.factory.cost({ args: { consensusName: 'not-installed' }, staticFee: MAX_APP_CALL_FEE }), 'ERR:errCnst')
    const emptyNamePayment = await programPayment(outsider, GUILD_PROGRAM, 1n, 0n)
    await expect(
      environment.factory.send.initProgram({
        args: { mbrPayment: emptyNamePayment, programName: '', size: 1n },
      }),
    ).rejects.toThrow('ERR:errGfty')
    const longNamePayment = await programPayment(outsider, GUILD_PROGRAM, 1n, 0n)
    await expect(
      environment.factory.send.initProgram({
        args: { mbrPayment: longNamePayment, programName: 'x'.repeat(64), size: 1n },
      }),
    ).rejects.toThrow('ERR:errGfty')
    const oversizedPayment = await programPayment(outsider, 'oversized', 1n, 0n)
    await expect(
      environment.consensusFactory.send.initProgram({
        args: {
          mbrPayment: oversizedPayment,
          programName: 'oversized',
          size: BigInt(MAX_GUILD_APPROVAL_PROGRAM_SIZE + 1),
        },
      }),
    ).rejects.toThrow('ERR:errGfcf')
    const guildPayment = await programPayment(outsider, GUILD_PROGRAM, 1n, 0n)
    const outsiderFactory = environment.factory.clone({ defaultSender: outsider.addr, defaultSigner: outsider.signer })
    await expect(
      outsiderFactory.send.initProgram({
        args: { mbrPayment: guildPayment, programName: GUILD_PROGRAM, size: 1n },
      }),
    ).rejects.toThrow('ERR:errNdao')
    const outsiderConsensusFactory = environment.consensusFactory.clone({ defaultSender: outsider.addr, defaultSigner: outsider.signer })
    const existingPayment = await programPayment(outsider, SUBSCRIPTIONS, 1n, 0n)
    await expect(
      outsiderConsensusFactory.send.initProgram({
        args: { mbrPayment: existingPayment, programName: SUBSCRIPTIONS, size: 1n },
      }),
    ).rejects.toThrow('ERR:errGfex')
    const zeroSizePayment = await programPayment(outsider, 'future-consensus', 1n, 0n)
    await expect(
      outsiderConsensusFactory.send.initProgram({
        args: { mbrPayment: zeroSizePayment, programName: 'future-consensus', size: 0n },
      }),
    ).rejects.toThrow('ERR:errGfcf')
    const underfundedPayment = await programPayment(outsider, 'underfunded', 1n, 0n)
    await expect(
      outsiderConsensusFactory.send.initProgram({
        args: { mbrPayment: underfundedPayment, programName: 'underfunded', size: 1n },
      }),
    ).rejects.toThrow('ERR:errGfpy')
    await expect(
      environment.factory.send.loadProgram({
        args: { offset: 0n, data: new Uint8Array() },
        maxFee: MAX_APP_CALL_FEE,
      }),
    ).rejects.toThrow('ERR:errIcor')
    await expect(sendNewGuild(environment.creator, cost - 1n)).rejects.toThrow('ERR:errGfpy')
  }, 120_000)

  test('rejects incomplete or mismatched atomic uploads without retaining a program box', async () => {
    const { algorand, consensusFactory, creator } = environment
    const outsider = await fixture.context.generateAccount({ initialFunds: microAlgo(3_000_000n) })
    for (const failure of ['missing', 'offset', 'application', 'sender']) {
      const programName = `invalid-${failure}`
      const mbrPayment = await programPayment(creator, programName, 2_001n)
      const composer = algorand.newGroup()
      composer.addAppCallMethodCall(await consensusFactory.params.initProgram({
        args: { mbrPayment, programName, size: 2_001n }, maxFee: MAX_APP_CALL_FEE,
      }))
      composer.addAppCallMethodCall(await consensusFactory.params.loadProgram({
        args: { offset: 0n, data: new Uint8Array(2_000) }, maxFee: MAX_APP_CALL_FEE,
      }))
      if (failure !== 'missing') {
        const client = failure === 'application' ? environment.factory : consensusFactory
        composer.addAppCallMethodCall(await client.params.loadProgram({
          args: { offset: failure === 'offset' ? 2_001n : 2_000n, data: new Uint8Array(1) },
          sender: failure === 'sender' ? outsider.addr : creator.addr,
          signer: failure === 'sender' ? outsider.signer : creator.signer,
          maxFee: MAX_APP_CALL_FEE,
        }))
      }
      await expect(composer.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true })).rejects.toThrow()
      expect((await consensusFactory.state.box.programs.getMap()).has(programName)).toBe(false)
    }
  }, 120_000)

  test('uploads the maximum AVM 13 program in an atomic group using the standard signer', async () => {
    const programName = 'max-avm13-program'
    const registrar = await generateGuildTestAccount(environment, 10_000_000n)
    const program = Uint8Array.from({ length: MAX_GUILD_APPROVAL_PROGRAM_SIZE }, (_, index) => index % 251)
    const maximumName = 'x'.repeat(63)

    await uploadConsensusProgram(environment, programName, program, registrar)
    await uploadConsensusProgram(environment, maximumName, new Uint8Array([1]), registrar)

    const programs = await environment.consensusFactory.state.box.programs.getMap()
    expect(programs.get(programName)).toEqual(program)
    expect(programs.get(maximumName)).toEqual(new Uint8Array([1]))
  }, 120_000)

  test('deploys and permanently binds fixed-signer and subscription consensus programs', async () => {
    const fixed = await mintGuild(environment, FIXED_SIGNERS, encodeAbi('(uint64)', [1n]))
    const fixedConsensus = new FixedSignerGuildConsensusClient({
      algorand: environment.algorand,
      appId: fixed.deployment.consensus,
      defaultSender: environment.creator.addr,
      defaultSigner: environment.creator.signer,
    })
    expect((await fixedConsensus.state.global.getAll()).guild).toBe(fixed.guild.appId)

    const subscription = await mintGuild(
      environment,
      SUBSCRIPTIONS,
      encodeAbi('(uint64,address,uint64)', [1n, environment.creator.addr.toString(), 1n]),
    )
    const subscriptionConsensus = new SubscriptionGuildConsensusClient({
      algorand: environment.algorand,
      appId: subscription.deployment.consensus,
      defaultSender: environment.creator.addr,
      defaultSigner: environment.creator.signer,
    })
    expect((await subscriptionConsensus.state.global.getAll()).guild).toBe(subscription.guild.appId)
  }, 120_000)

  test('permissionlessly registers an immutable keyed consensus option and deploys it', async () => {
    const consensusName = 'fixed-signers-v2'
    const registrar = await generateGuildTestAccount(environment, 10_000_000n)
    const programFactory = new FixedSignerGuildConsensusFactory({
      algorand: environment.algorand,
      defaultSender: environment.creator.addr,
      defaultSigner: environment.creator.signer,
    })
    const program = (await programFactory.appFactory.compile()).approvalProgram
    await uploadConsensusProgram(environment, consensusName, program, registrar)
    await expect(uploadConsensusProgram(environment, consensusName, program, registrar)).rejects.toThrow('ERR:errGfex')

    expect(await environment.factory.cost({ args: { consensusName }, staticFee: MAX_APP_CALL_FEE })).toBeGreaterThan(CREATE_FEE)
    const deployment = await mintGuild(environment, consensusName, encodeAbi('(uint64)', [1n]))
    const consensus = new FixedSignerGuildConsensusClient({
      algorand: environment.algorand,
      appId: deployment.deployment.consensus,
      defaultSender: environment.creator.addr,
      defaultSigner: environment.creator.signer,
    })
    expect((await consensus.state.global.getAll()).guild).toBe(deployment.guild.appId)
  }, 120_000)

  test('rejects consensus programs compiled for a different AVM version', async () => {
    const consensusName = 'incompatible-version'
    const programFactory = new FixedSignerGuildConsensusFactory({
      algorand: environment.algorand,
      defaultSender: environment.creator.addr,
      defaultSigner: environment.creator.signer,
    })
    const program = new Uint8Array((await programFactory.appFactory.compile()).approvalProgram)
    expect(program[0]).toBe(13)
    program[0] = 11
    await uploadConsensusProgram(environment, consensusName, program, environment.creator)
    await expectContractError(
      environment.factory.cost({ args: { consensusName }, staticFee: MAX_APP_CALL_FEE }),
      'ERR:errGfcf',
    )
  }, 120_000)

  test('allows permissionless deployment, binds both child apps, routes the creation fee, and keeps bootstrap admin closed', async () => {
    const launcher = await fixture.context.generateAccount({ initialFunds: microAlgo(10_000_000n) })
    const escrowBefore = await environment.algorand.account.getInformation(environment.revenueEscrow.appAddress)

    const { guild, deployment } = await mintLockedGuild(environment, proposalSettings(), launcher)

    const factoryState = await environment.factory.state.global.getAll()
    expect(factoryState.version).toBe('test')
    expect(factoryState.childContractVersion).toBe('test')

    // Only the draft Guild's creator may ask the factory to push the registered kernel onto it.
    await expectContractError(
      environment.factory
        .newGroup()
        .opUp({ args: {}, note: 'factory-foreign-guild-update-opup-1', maxFee: MAX_APP_CALL_FEE })
        .opUp({ args: {}, note: 'factory-foreign-guild-update-opup-2', maxFee: MAX_APP_CALL_FEE })
        .updateGuild({ args: { guild: guild.appId }, maxFee: MAX_APP_CALL_FEE })
        .send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true }),
      'ERR:errGcrt',
    )
    const launcherFactory = environment.factory.clone({ defaultSender: launcher.addr, defaultSigner: launcher.signer })
    await launcherFactory
      .newGroup()
      .opUp({ args: {}, note: 'factory-guild-update-opup-1', maxFee: MAX_APP_CALL_FEE })
      .opUp({ args: {}, note: 'factory-guild-update-opup-2', maxFee: MAX_APP_CALL_FEE })
      .updateGuild({ args: { guild: guild.appId }, maxFee: MAX_APP_CALL_FEE })
      .send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true })
    expect((await guild.state.global.getAll()).version).toBe('test')
    await guild.send.partiallyInitialize({
      args: {},
      maxFee: MAX_APP_CALL_FEE,
      populateAppCallResources: true,
      coverAppCallInnerTransactionFees: true,
    })
    await expect(
      launcherFactory
        .newGroup()
        .opUp({ args: {}, note: 'factory-active-guild-update-opup-1', maxFee: MAX_APP_CALL_FEE })
        .opUp({ args: {}, note: 'factory-active-guild-update-opup-2', maxFee: MAX_APP_CALL_FEE })
        .updateGuild({ args: { guild: guild.appId }, maxFee: MAX_APP_CALL_FEE })
        .send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true }),
    ).rejects.toThrow()

    const escrowAfter = await environment.algorand.account.getInformation(environment.revenueEscrow.appAddress)
    expect(Number(escrowAfter.balance) - Number(escrowBefore.balance)).toBe(Number(CREATE_FEE))
    expect(await environment.factory.state.global.getAll()).not.toHaveProperty('deploymentCount')

    const guildState = await guild.state.global.getAll()
    expect(guildState.creator).toBe(launcher.addr.toString())
    expect(guildState.consensus).toBe(deployment.consensus)
    expect(guildState).not.toHaveProperty('factory')
    expect(guildState).not.toHaveProperty('consensusType')
    expect((await environment.algorand.app.getById(guild.appId)).creator.toString()).toBe(
      environment.factory.appAddress.toString(),
    )
    const voteMbr = await guild
      .newGroup()
      .voteMbr({ args: {}, maxFee: MAX_APP_CALL_FEE })
      .send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true })
    expect(voteMbr.returns[0]).toBe(22_500n)
    expect(await guild.canChangePluginSet({ args: {} })).toBe(true)

    const consensus = new LockedTokenGuildConsensusClient({
      algorand: environment.algorand,
      appId: deployment.consensus,
      defaultSender: launcher.addr,
      defaultSigner: launcher.signer,
    })
    const consensusState = await consensus.state.global.getAll()
    expect(consensusState.guild).toBe(guild.appId)
    expect(consensusState.staking).toBeGreaterThan(0n)
    expect(consensusState.votingAsset).toBeGreaterThan(0n)
    expect(consensusState.minimumApprovals).toBe(1n)
    expect(consensusState).not.toHaveProperty('factory')
    expect(consensusState).not.toHaveProperty('consensusType')
    expect((await environment.algorand.app.getById(consensus.appId)).creator.toString()).toBe(
      environment.consensusFactory.appAddress.toString(),
    )

    await expectContractError(environment.factory.cost({ args: { consensusName: GUILD_PROGRAM }, staticFee: MAX_APP_CALL_FEE }), 'ERR:errGfty')
  }, 120_000)

  test('mints only when the DAO lists a wallet factory, which every Guild treasury must come from', async () => {
    const dao = new MockGuildAkitaDaoClient({
      algorand: environment.algorand,
      appId: environment.akitaDao,
      defaultSender: environment.creator.addr,
      defaultSigner: environment.creator.signer,
    })
    await dao.send.setWalletFactory({ args: { wallet: 0n } })
    await expectContractError(mintGuild(environment, FIXED_SIGNERS, encodeAbi('(uint64)', [1n])), 'ERR:errGfcf')
    await dao.send.setWalletFactory({ args: { wallet: environment.walletFactory } })
    const { guild } = await mintGuild(environment, FIXED_SIGNERS, encodeAbi('(uint64)', [1n]))
    expect(await guild.state.global.walletFactory()).toBe(environment.walletFactory)
  }, 120_000)
})

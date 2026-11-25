import { microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import type { PluginSDKReturn } from 'akita-sdk'
import { CallerType, GuildPluginSDK, newWallet, WalletSDK } from 'akita-sdk/wallet'
import { TimeWarp } from '../../../../tests/utils/time'
import { deployEscrowFactory } from '../../../../tests/fixtures/escrow'
import { deployGuildPlugin } from '../../../../tests/fixtures/plugins/guild'
import {
  AbstractedAccountClient,
  AbstractedAccountFactory as AbstractedAccountProgramFactory,
} from '../../../artifacts/arc58/account/AbstractedAccountClient'
import {
  AbstractedAccountFactoryClient,
  AbstractedAccountFactoryFactory,
} from '../../../artifacts/arc58/account/AbstractedAccountFactoryClient'
import { AbstractedAccountMbrFactory } from '../../../artifacts/arc58/account/AbstractedAccountMBRClient'
import { GuildClient } from '../../../artifacts/arc58/guilds/core/GuildClient'
import { MockGuildAkitaDaoClient } from '../../../artifacts/arc58/guilds/tests/MockGuildAkitaDAOClient'
import {
  ACTION_SET_LIMIT,
  APPROVE,
  baseConfig,
  createVotingAsset,
  deployGuildTestEnvironment,
  deployMockStaking,
  deployMockSubscriptions,
  EMPTY_EVIDENCE,
  encodeAbi,
  endVoting,
  expectContractError,
  FIXED_SIGNERS,
  FIXED_SIGNER_ACTION,
  LOCKED_TOKEN,
  lockedTokenConfig,
  MAX_APP_CALL_FEE,
  proposalSettings,
  setLimitAction,
  setSettingsAction,
  subscriptionConfig,
  subscriptionConfiguration,
  SUBSCRIPTIONS,
  type GuildAction,
  type GuildTestEnvironment,
  ZERO_CID,
} from '../../guilds/tests/test-helpers'
import { errGuildCostLimitExceeded, errGuildNotFromFactory } from './errors'
import {
  createGuild,
  defaultGuildBaseConfig,
  GuildPluginSDK as SourceGuildPluginSDK,
  type GuildCreationStep,
} from '../../../../../akita-sdk/src/wallet/plugins/guild'
import { fixedSignerConfiguration, fixedSignerConsensusConfig, FixedSignerWeightMode } from '../../../../../akita-sdk/src/guild'

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

describe('Guild ARC-58 wallet plugin', () => {
  let environment: GuildTestEnvironment
  let walletFactory: AbstractedAccountFactoryClient
  let wallet: WalletSDK
  let creationPlugin: GuildPluginSDK
  let primaryPlugin: GuildPluginSDK
  let plugin: GuildPluginSDK
  let guild: GuildClient
  let guildWallet: AbstractedAccountClient
  let controlledAddress: string
  let timeWarp: TimeWarp
  let previousWalletMbrAppId: string | undefined

  const usePlugin = async (call: PluginSDKReturn, opUps = 0) => {
    const calls = Array.from({ length: opUps }, (_, index) =>
      plugin.opUp({
        rekeyBack: false,
        nonce: BigInt(index),
      }),
    )
    calls.push(call)
    return wallet.usePlugin({ callerType: CallerType.Global, calls, consolidateFees: true })
  }

  const installGuildPlugin = async (guildId: bigint) => {
    plugin = await deployGuildPlugin({
      fixture,
      sender: environment.creator.addr,
      signer: environment.creator.signer,
      factory: environment.factory.appId,
      guild: guildId,
    })
    const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n })
    await wallet.client.appClient.fundAppAccount({ amount: microAlgo(mbr.plugins) })
    await wallet.addPlugin({ client: plugin, callerType: CallerType.Global })
    return plugin
  }

  const lastReturnValue = <T>(result: Awaited<ReturnType<typeof usePlugin>>): T => {
    const abiReturn = [...result.returns]
      .reverse()
      .find(
        (value) =>
          typeof value !== 'object' || value === null || (value as { returnValue?: unknown }).returnValue !== undefined,
      ) as { returnValue?: unknown } | unknown
    return (
      typeof abiReturn === 'object' && abiReturn !== null && 'returnValue' in abiReturn
        ? abiReturn.returnValue
        : abiReturn
    ) as T
  }

  const expectWalletAuthorizationHealthy = async () => {
    const account = await environment.algorand.account.getInformation(controlledAddress)
    expect(account.authAddr).toBeUndefined()
    expect(await wallet.client.state.global.spendingAddress()).toBe(ALGORAND_ZERO_ADDRESS_STRING)
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
      amount: microAlgo(500_000_000n),
    })

    previousWalletMbrAppId = process.env.WALLET_MBR_APP_ID
    const walletMbrFactory = environment.algorand.client.getTypedAppFactory(AbstractedAccountMbrFactory, {
      defaultSender: environment.creator.addr,
      defaultSigner: environment.creator.signer,
    })
    const { appClient: walletMbrClient } = await walletMbrFactory.send.create.bare()
    process.env.WALLET_MBR_APP_ID = walletMbrClient.appId.toString()

    const escrowFactory = await deployEscrowFactory({
      fixture,
      sender: environment.creator.addr,
      signer: environment.creator.signer,
    })
    walletFactory = await deployWalletFactory(environment, escrowFactory.appId)
    // Guilds create their treasuries through the DAO's wallet factory, exactly as the Akita DAO does.
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
    creationPlugin = plugin
    wallet = await newWallet({
      algorand: environment.algorand,
      factoryParams: {
        appId: walletFactory.appId,
        defaultSender: environment.creator.addr,
        defaultSigner: environment.creator.signer,
      },
      sender: environment.creator.addr,
      signer: environment.creator.signer,
      readerAccount: environment.creator.addr.toString(),
      nickname: 'Guild plugin member',
      extraFunding: 150_000_000n,
    })
    controlledAddress = (await wallet.client.state.global.controlledAddress())!

    const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n })
    await wallet.client.appClient.fundAppAccount({ amount: microAlgo(mbr.plugins) })
    await wallet.addPlugin({ client: plugin, callerType: CallerType.Global })

    const newGuild = await usePlugin(
      plugin.newGuild({
        consensusName: FIXED_SIGNERS,
        baseConfig: baseConfig(),
        governanceConfig: encodeAbi('(uint64)', [1n]),
      }),
      5,
    )
    const deployment = lastReturnValue<{ guild: bigint; consensus: bigint } | [bigint, bigint]>(newGuild)
    const guildId = Array.isArray(deployment) ? deployment[0] : deployment.guild
    guild = new GuildClient({
      algorand: environment.algorand,
      appId: guildId,
      defaultSender: environment.creator.addr,
      defaultSigner: environment.creator.signer,
    })

    primaryPlugin = await installGuildPlugin(guild.appId)
    await usePlugin(
      plugin.configureConsensus({
        guild: guild.appId,
        config: encodeAbi('(uint8,(address,uint64)[])', [1, [[controlledAddress, 1n]]]),
      }),
      5,
    )
    await usePlugin(plugin.setProposalActionLimit({ guild: guild.appId, limit: 10n }), 2)
    // Draft-time settings boxes are paid from the Guild's own balance, which the creator funds.
    await guild.appClient.fundAppAccount({ amount: microAlgo(25_300n) })
    await usePlugin(
      plugin.setConsensusActionSettings({
        guild: guild.appId,
        code: BigInt(FIXED_SIGNER_ACTION.SetThreshold),
        settings: proposalSettings({ approval: 100_000n }),
      }),
      2,
    )
    await usePlugin(
      plugin.setProposalSettings({
        guild: guild.appId,
        actionType: ACTION_SET_LIMIT,
        settings: proposalSettings(),
      }),
      2,
    )

    const setup = await usePlugin(
      plugin.setup({ guild: guild.appId, nickname: 'Guild treasury', salt: new Uint8Array(32) }),
      8,
    )
    const guildWalletId = BigInt(lastReturnValue<bigint>(setup))
    guildWallet = new AbstractedAccountClient({
      algorand: environment.algorand,
      appId: guildWalletId,
      defaultSender: environment.creator.addr,
      defaultSigner: environment.creator.signer,
    })
    await usePlugin(plugin.initialize({ guild: guild.appId }), 3)
  }, 360_000)

  afterAll(async () => {
    await timeWarp?.resetTimeWarp()
    if (previousWalletMbrAppId === undefined) delete process.env.WALLET_MBR_APP_ID
    else process.env.WALLET_MBR_APP_ID = previousWalletMbrAppId
  })

  test('installs globally, creates a factory-backed Guild, and configures its treasury wallet', async () => {
    const plugins = await wallet.getPlugins()
    expect(plugins.has({ plugin: plugin.appId, caller: ALGORAND_ZERO_ADDRESS_STRING, escrow: '' })).toBe(true)

    const state = await guild.state.global.getAll()
    expect(state.creator).toBe(controlledAddress)
    expect(state.state).toBe(2)
    expect(state.proposalActionLimit).toBe(10n)
    expect(state.wallet).toBe(guildWallet.appId)
    expect(await guildWallet.arc58GetAdmin()).toBe(guild.appAddress.toString())
    expect(
      (await guild.getConsensusActionSettings({ args: { code: BigInt(FIXED_SIGNER_ACTION.SetThreshold) } })).approval,
    ).toBe(100_000n)
    expect(
      (await guild.getConsensusActionSettings({ args: { code: BigInt(FIXED_SIGNER_ACTION.AddMembers) } })).approval,
    ).toBe(proposalSettings().approval)
    await expectWalletAuthorizationHealthy()
  })

  test('sweeps stray Guild balance into the treasury wallet through the plugin', async () => {
    const treasury = guildWallet.appAddress.toString()
    await guild.appClient.fundAppAccount({ amount: microAlgo(250_000n) })
    expect(await guild.sweepable({ args: {} })).toBeGreaterThanOrEqual(250_000n)
    const before = (await environment.algorand.account.getInformation(treasury)).balance.microAlgos
    const swept = await usePlugin(plugin.sweep({ guild: guild.appId }), 3)
    const amount = BigInt(lastReturnValue<bigint>(swept))
    expect(amount).toBeGreaterThanOrEqual(250_000n)
    expect((await environment.algorand.account.getInformation(treasury)).balance.microAlgos - before).toBe(amount)
    expect(await guild.sweepable({ args: {} })).toBe(0n)
    await expectWalletAuthorizationHealthy()
  }, 120_000)

  test('routes every draft configuration path through the wallet', async () => {
    const createDraftGuild = async (consensusName: string, governanceConfig: Uint8Array) => {
      plugin = creationPlugin
      const result = await usePlugin(
        plugin.newGuild({
          consensusName,
            baseConfig: baseConfig(),
          governanceConfig,
        }),
        5,
      )
      const deployment = lastReturnValue<{ guild: bigint; consensus: bigint } | [bigint, bigint]>(result)
      const guildId = Array.isArray(deployment) ? deployment[0] : deployment.guild
      await installGuildPlugin(guildId)
      return new GuildClient({
        algorand: environment.algorand,
        appId: guildId,
        defaultSender: environment.creator.addr,
        defaultSigner: environment.creator.signer,
      })
    }

    const staking = await deployMockStaking(environment)
    const asset = await createVotingAsset(environment, 1_000_000n)
    await staking.send.setLiveLockedStake({ args: { asset, amount: 1_000_000n } })
    const lockedGuild = await createDraftGuild(LOCKED_TOKEN, lockedTokenConfig(staking.appId, asset))
    await usePlugin(
      plugin.configureConsensus({
        guild: lockedGuild.appId,
        config: lockedTokenConfig(staking.appId, asset),
      }),
      5,
    )
    await usePlugin(plugin.lockPluginSet({ guild: lockedGuild.appId }), 1)
    await usePlugin(plugin.partiallyInitialize({ guild: lockedGuild.appId }), 3)
    const lockedState = await lockedGuild.state.global.getAll()
    expect(lockedState.state).toBe(1)
    expect(lockedState.pluginSetLocked).toBe(1n)

    const subscriptions = await deployMockSubscriptions(environment)
    // The policy creates and owns the services that grant voting weight.
    const subscriptionGuild = await createDraftGuild(SUBSCRIPTIONS, subscriptionConfig(subscriptions.appId, 1n))
    await usePlugin(
      plugin.configureConsensus({
        guild: subscriptionGuild.appId,
        config: subscriptionConfiguration([{ weight: 3n }]),
      }),
      5,
    )
    await usePlugin(plugin.partiallyInitialize({ guild: subscriptionGuild.appId }), 3)
    expect((await subscriptionGuild.state.global.getAll()).state).toBe(1)

    const secondWalletGuild = await createDraftGuild(FIXED_SIGNERS, encodeAbi('(uint64)', [1n]))
    await usePlugin(
      plugin.configureConsensus({
        guild: secondWalletGuild.appId,
        config: encodeAbi('(uint8,(address,uint64)[])', [1, [[controlledAddress, 1n]]]),
      }),
      5,
    )
    // A Guild's treasury is always a fresh wallet from the DAO wallet factory; there is no attach path.
    const secondSetup = await usePlugin(
      plugin.setup({ guild: secondWalletGuild.appId, nickname: 'Second Guild treasury', salt: new Uint8Array(32).fill(2) }),
      5,
    )
    const secondWalletId = BigInt(lastReturnValue<bigint>(secondSetup))
    await usePlugin(plugin.initialize({ guild: secondWalletGuild.appId }), 3)
    const secondState = await secondWalletGuild.state.global.getAll()
    expect(secondState.wallet).toBe(secondWalletId)
    expect(secondState.state).toBe(2)
    expect((await environment.algorand.app.getById(secondWalletId)).creator.toString()).toBe(walletFactory.appAddress.toString())
    plugin = primaryPlugin
    await expectWalletAuthorizationHealthy()
  }, 180_000)

  // The unbound adapter is shared: it may act on any Guild its factory created (the Guild decides who may do
  // what), so only bound adapters are isolated to their Guild. Neither reaches apps the factory did not create.
  test('isolates bound delegations from sibling Guilds and consensus apps', async () => {
    plugin = creationPlugin
    const result = await usePlugin(plugin.newGuild({
      consensusName: FIXED_SIGNERS,
      baseConfig: baseConfig(),
      governanceConfig: encodeAbi('(uint64)', [1n]),
    }), 5)
    const deployment = lastReturnValue<{ guild: bigint; consensus: bigint } | [bigint, bigint]>(result)
    const sibling = Array.isArray(deployment) ? deployment[0] : deployment.guild
    const consensus = Array.isArray(deployment) ? deployment[1] : deployment.consensus
    plugin = primaryPlugin
    const before = await environment.algorand.account.getInformation(controlledAddress)
    // a target that is no Guild has no cost to read, so these calls name their limit
    for (const target of [sibling, consensus]) {
      await expectContractError(usePlugin(plugin.newProposal({
        guild: target, cid: ZERO_CID, actions: [setLimitAction(5n)], maxCost: 0n,
      }), 5), errGuildNotFromFactory)
    }
    await expectContractError(usePlugin(plugin.newGuild({
      consensusName: FIXED_SIGNERS,
      baseConfig: baseConfig(), governanceConfig: encodeAbi('(uint64)', [1n]),
    }), 5), errGuildNotFromFactory)
    plugin = creationPlugin
    await expectContractError(usePlugin(plugin.newProposal({
      guild: consensus, cid: ZERO_CID, actions: [setLimitAction(5n)], maxCost: 0n,
    }), 5), errGuildNotFromFactory)
    plugin = primaryPlugin
    expect((await environment.algorand.account.getInformation(controlledAddress)).balance.microAlgos).toBe(before.balance.microAlgos)
    await expectWalletAuthorizationHealthy()
  }, 120_000)

  test('automates paid and unpaid edits, then submits, votes, finalizes, executes, and cleans up', async () => {
    const originalActions: GuildAction[] = [setLimitAction(9n)]
    const created = await usePlugin(
      plugin.newProposal({ guild: guild.appId, cid: ZERO_CID, actions: originalActions }),
      7,
    )
    const proposalId = BigInt(lastReturnValue<bigint>(created))
    const original = await guild.getProposal({ args: { proposalId } })

    const expandedActions: GuildAction[] = [setLimitAction(9n), setSettingsAction(ACTION_SET_LIMIT, proposalSettings())]
    const editedCid = new Uint8Array(36)
    editedCid[0] = 1
    await usePlugin(
      plugin.editProposal({ guild: guild.appId, proposalId, cid: editedCid, actions: expandedActions }),
      7,
    )
    const expanded = await guild.getProposal({ args: { proposalId } })
    expect(expanded.feesPaid).toBeGreaterThan(original.feesPaid)
    expect(expanded.actions).toHaveLength(2)

    const finalActions: GuildAction[] = [setLimitAction(8n)]
    await usePlugin(plugin.editProposal({ guild: guild.appId, proposalId, cid: ZERO_CID, actions: finalActions }), 7)
    const reduced = await guild.getProposal({ args: { proposalId } })
    expect(reduced.feesPaid).toBe(expanded.feesPaid)
    expect(reduced.actions).toHaveLength(1)

    await usePlugin(plugin.submitProposal({ guild: guild.appId, proposalId }), 5)
    expect((await guild.getProposal({ args: { proposalId } })).status).toBe(20)

    await usePlugin(plugin.voteProposal({ guild: guild.appId, proposalId, vote: APPROVE }), 4)
    const ballot = await guild.getBallot({
      args: { proposalId },
      staticFee: MAX_APP_CALL_FEE,
    })
    expect(ballot.votes.approvals).toBe(1n)
    expect(ballot.voteCount).toBe(1n)

    await endVoting(timeWarp)
    await usePlugin(plugin.finalizeProposal({ guild: guild.appId, proposalId }), 4)
    expect((await guild.getProposal({ args: { proposalId } })).status).toBe(40)

    await usePlugin(plugin.executeProposal({ guild: guild.appId, proposalId }), 6)
    expect((await guild.getProposal({ args: { proposalId } })).status).toBe(50)
    expect((await guild.state.global.getAll()).proposalActionLimit).toBe(8n)

    const cleanup = await usePlugin(
      plugin.cleanupProposalConsensus({ guild: guild.appId, proposalId, voters: [controlledAddress] }),
      4,
    )
    expect(BigInt(lastReturnValue<bigint>(cleanup))).toBe(0n)
    await expectContractError(
      guild.getBallot({
        args: { proposalId },
        staticFee: MAX_APP_CALL_FEE,
      }),
      'ERR:errGprp',
    )
    expect((await guild.getProposal({ args: { proposalId } })).status).toBe(50)
    await expectWalletAuthorizationHealthy()
  }, 240_000)

  // AUD-C3: the plugin reads each cost from the factory or the Guild when the call runs. `maxCost` is the
  // cost quoted when the call was built; a call that would pay more fails before any wallet funds move.
  test('fails a paying call whose cost is above the quoted maximum', async () => {
    const reader = environment.creator.addr
    const balance = async () => (await environment.algorand.account.getInformation(controlledAddress)).balance.microAlgos
    const expectOverQuote = async (call: PluginSDKReturn, opUps: number) => {
      const before = await balance()
      await expectContractError(usePlugin(call, opUps), errGuildCostLimitExceeded)
      expect(await balance()).toBe(before)
      await expectWalletAuthorizationHealthy()
    }

    // a proposal
    const actions: GuildAction[] = [setLimitAction(6n)]
    const proposalCost = await plugin.proposalCost(guild.appId, actions, reader)
    expect(proposalCost).toBeGreaterThan(0n)
    await expectOverQuote(plugin.newProposal({ guild: guild.appId, cid: ZERO_CID, actions, maxCost: proposalCost - 1n }), 7)
    const created = await usePlugin(plugin.newProposal({ guild: guild.appId, cid: ZERO_CID, actions, maxCost: proposalCost }), 7)
    const proposalId = BigInt(lastReturnValue<bigint>(created))

    // an edit is held to its top-up; one that needs no top-up passes with a zero limit
    const larger: GuildAction[] = [setLimitAction(6n), setSettingsAction(ACTION_SET_LIMIT, proposalSettings())]
    const topUp = await plugin.proposalEditCost(guild.appId, proposalId, larger, reader)
    expect(topUp).toBeGreaterThan(0n)
    await expectOverQuote(plugin.editProposal({ guild: guild.appId, proposalId, cid: ZERO_CID, actions: larger, maxCost: topUp - 1n }), 7)
    await usePlugin(plugin.editProposal({ guild: guild.appId, proposalId, cid: ZERO_CID, actions: larger, maxCost: topUp }), 7)
    expect(await plugin.proposalEditCost(guild.appId, proposalId, actions, reader)).toBe(0n)
    await usePlugin(plugin.editProposal({ guild: guild.appId, proposalId, cid: ZERO_CID, actions, maxCost: 0n }), 7)

    // a first vote pays for its receipt; changing the vote is free
    await usePlugin(plugin.submitProposal({ guild: guild.appId, proposalId }), 5)
    const voteCost = await plugin.voteCost(guild.appId, proposalId, controlledAddress, reader)
    expect(voteCost).toBeGreaterThan(0n)
    await expectOverQuote(plugin.voteProposal({ guild: guild.appId, proposalId, vote: APPROVE, maxCost: voteCost - 1n }), 4)
    await usePlugin(plugin.voteProposal({ guild: guild.appId, proposalId, vote: APPROVE, maxCost: voteCost }), 4)
    expect(await plugin.voteCost(guild.appId, proposalId, controlledAddress, reader)).toBe(0n)
    await usePlugin(plugin.voteProposal({ guild: guild.appId, proposalId, vote: APPROVE, maxCost: 0n }), 4)
    await endVoting(timeWarp)
    await usePlugin(plugin.finalizeProposal({ guild: guild.appId, proposalId }), 4)
    await usePlugin(plugin.executeProposal({ guild: guild.appId, proposalId }), 6)

    // creating a Guild and configuring its draft
    plugin = creationPlugin
    const newGuildArgs = { consensusName: FIXED_SIGNERS, baseConfig: baseConfig(), governanceConfig: encodeAbi('(uint64)', [1n]) }
    const creationCost = await plugin.guildCreationCost(FIXED_SIGNERS, reader)
    expect(creationCost).toBeGreaterThan(0n)
    await expectOverQuote(plugin.newGuild({ ...newGuildArgs, maxCost: creationCost - 1n }), 5)
    const deployment = lastReturnValue<{ guild: bigint } | [bigint, bigint]>(
      await usePlugin(plugin.newGuild({ ...newGuildArgs, maxCost: creationCost }), 5),
    )
    const draft = Array.isArray(deployment) ? deployment[0] : deployment.guild
    await installGuildPlugin(draft)

    const config = encodeAbi('(uint8,(address,uint64)[])', [1, [[controlledAddress, 1n]]])
    const configurationCost = await plugin.consensusConfigurationCost(draft, config, reader)
    expect(configurationCost).toBeGreaterThan(0n)
    await expectOverQuote(plugin.configureConsensus({ guild: draft, config, maxCost: configurationCost - 1n }), 5)
    await usePlugin(plugin.configureConsensus({ guild: draft, config, maxCost: configurationCost }), 5)

    const treasury = { guild: draft, nickname: 'Quoted treasury', salt: new Uint8Array(32).fill(3) }
    const setupCost = await plugin.setupCost(draft, reader)
    expect(setupCost).toBeGreaterThan(0n)
    await expectOverQuote(plugin.setup({ ...treasury, maxCost: setupCost - 1n }), 8)
    await usePlugin(plugin.setup({ ...treasury, maxCost: setupCost }), 8)
    plugin = primaryPlugin
  }, 360_000)

  test('deletes wallet-authored drafts and leaves the wallet authorization healthy after a revert', async () => {
    const created = await usePlugin(
      plugin.newProposal({ guild: guild.appId, cid: ZERO_CID, actions: [setLimitAction(7n)] }),
      7,
    )
    const proposalId = BigInt(lastReturnValue<bigint>(created))
    await usePlugin(plugin.deleteProposal({ guild: guild.appId, proposalId }), 3)
    await expect(guild.getProposal({ args: { proposalId } })).rejects.toThrow()
    await expectWalletAuthorizationHealthy()

    await expectContractError(usePlugin(plugin.deleteProposal({ guild: guild.appId, proposalId }), 3), 'ERR:errGprp')
    await expectWalletAuthorizationHealthy()
  }, 120_000)

  test('rejects applications outside the configured Guild factory before spending wallet funds', async () => {
    const before = await environment.algorand.account.getInformation(controlledAddress)
    await expect(
      usePlugin(
        plugin.newProposal({
          guild: environment.akitaDao,
          cid: ZERO_CID,
          actions: [setLimitAction(6n)],
          evidence: EMPTY_EVIDENCE,
          maxCost: 0n,
        }),
        2,
      ),
    ).rejects.toThrow(errGuildNotFromFactory)
    const after = await environment.algorand.account.getInformation(controlledAddress)
    expect(after.balance.microAlgos).toBe(before.balance.microAlgos)
    await expectWalletAuthorizationHealthy()
  }, 120_000)

  test('akita-sdk createGuild: one call creates, configures, sets up and initializes a fixed-signer Guild', async () => {
    const creation = new SourceGuildPluginSDK({
      algorand: environment.algorand,
      factoryParams: { appId: creationPlugin.appId, defaultSender: environment.creator.addr, defaultSigner: environment.creator.signer },
    })
    const steps: GuildCreationStep[] = []
    const created = await createGuild({
      wallet: wallet as never,
      creationPlugin: creation,
      creationCallerType: CallerType.Global,
      consensusName: FIXED_SIGNERS,
      governanceConfig: fixedSignerConsensusConfig(1n),
      consensusConfiguration: fixedSignerConfiguration(FixedSignerWeightMode.Equal, [[controlledAddress, 1n]]),
      baseConfig: defaultGuildBaseConfig(proposalSettings()),
      nickname: 'SDK Guild treasury',
      salt: new Uint8Array(32).fill(7),
      onStep: (step) => steps.push(step),
    })
    expect(steps).toEqual(['newGuild', 'installGuildPlugin', 'configureConsensus', 'setup', 'initialize'])

    const sdkGuild = new GuildClient({
      algorand: environment.algorand,
      appId: created.guild,
      defaultSender: environment.creator.addr,
      defaultSigner: environment.creator.signer,
    })
    const state = await sdkGuild.state.global.getAll()
    expect(state.creator).toBe(controlledAddress)
    expect(state.state).toBe(2)
    expect(state.wallet).toBe(created.guildWallet)
    const treasury = new AbstractedAccountClient({
      algorand: environment.algorand,
      appId: created.guildWallet,
      defaultSender: environment.creator.addr,
      defaultSigner: environment.creator.signer,
    })
    expect(await treasury.arc58GetAdmin()).toBe(sdkGuild.appAddress.toString())
    const plugins = await wallet.getPlugins()
    expect(plugins.has({ plugin: created.guildPlugin.appId, caller: ALGORAND_ZERO_ADDRESS_STRING, escrow: '' })).toBe(false)
    await expectWalletAuthorizationHealthy()
  }, 240_000)
})

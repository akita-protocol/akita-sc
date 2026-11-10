import { uploadGuildProgram } from '../../../../scripts/lib/guild-programs'
import { GuildConsensusFactoryClient, GuildConsensusFactoryFactory } from '../../../artifacts/arc58/guilds/consensus/GuildConsensusFactoryClient'
import { AlgorandClient, Config, microAlgo } from '@algorandfoundation/algokit-utils'
import { ABIType, type ABIValue } from 'algosdk';
import type { TransactionSignerAccount as AddressWithTransactionSigner } from '@algorandfoundation/algokit-utils/types/account';
import type { TimeWarp } from '../../../../tests/utils/time'
import {
  FixedSignerGuildConsensusClient,
  FixedSignerGuildConsensusFactory,
} from '../../../artifacts/arc58/guilds/consensus/fixed-signers/FixedSignerGuildConsensusClient'
import { LockedTokenGuildConsensusFactory } from '../../../artifacts/arc58/guilds/consensus/locked-token/LockedTokenGuildConsensusClient'
import {
  SubscriptionGuildConsensusClient,
  SubscriptionGuildConsensusFactory,
} from '../../../artifacts/arc58/guilds/consensus/subscriptions/SubscriptionGuildConsensusClient'
import { GuildClient, GuildFactory as GuildProgramFactory } from '../../../artifacts/arc58/guilds/core/GuildClient'
import { GuildFactoryClient, GuildFactoryFactory } from '../../../artifacts/arc58/guilds/factory/GuildFactoryClient'
import { MockGuildConsensusHostFactory } from '../../../artifacts/arc58/guilds/tests/MockGuildConsensusHostClient'
import { MockGuildAkitaDaoFactory } from '../../../artifacts/arc58/guilds/tests/MockGuildAkitaDAOClient'
import { MockGuildAccountFactoryFactory } from '../../../artifacts/arc58/guilds/tests/MockGuildAccountFactoryClient'
import { MockGuildStakingFactory } from '../../../artifacts/arc58/guilds/tests/MockGuildStakingClient'
import { MockGuildSubscriptionsFactory } from '../../../artifacts/arc58/guilds/tests/MockGuildSubscriptionsClient'
import {
  MockGuildWalletClient,
  MockGuildWalletFactory,
} from '../../../artifacts/arc58/guilds/tests/MockGuildWalletClient'

Config.configure({ populateAppCallResources: true })

export { expectContractError } from '../../../../tests/utils/errors'

export const FIXED_SIGNERS = 'fixed-signers'
export const LOCKED_TOKEN = 'locked-token'
export const SUBSCRIPTIONS = 'subscription'
export const GUILD_PROGRAM = 'guild'

export const APPROVE = 10
export const REJECT = 20
export const ABSTAIN = 30

export const ACTION_UPGRADE_APP = 10
export const ACTION_ADD_PLUGIN = 20
export const ACTION_ADD_NAMED_PLUGIN = 21
export const ACTION_SET_PLUGIN_SETTINGS = 22
export const ACTION_EXECUTE_PLUGIN = 30
export const ACTION_REMOVE_EXECUTION = 31
export const ACTION_REMOVE_PLUGIN = 40
export const ACTION_REMOVE_NAMED_PLUGIN = 41
export const ACTION_ADD_ALLOWANCES = 50
export const ACTION_REMOVE_ALLOWANCES = 60
export const ACTION_NEW_ESCROW = 70
export const ACTION_TOGGLE_ESCROW = 71
export const ACTION_RECLAIM = 72
export const ACTION_SET_SETTINGS = 80
export const ACTION_SET_LIMIT = 81
export const ACTION_NEW_WALLET = 82
export const ACTION_CONSENSUS = 83
export const ACTION_SET_CONSENSUS_ACTION_SETTINGS = 84
export const ACTION_UPDATE_WALLET = 90
export const ACTION_CHANGE_ADMIN = 91
export const ACTION_FULLY_INITIALIZE = 100
export const ACTION_LOCK_PLUGIN_SET = 110

/** Policy-defined consensus action codes; the Guild only uses them to select settings. */
export const FIXED_SIGNER_ACTION = {
  AddMembers: 1,
  RemoveMember: 2,
  SetMemberWeight: 3,
  SetThreshold: 4,
  SetWeightMode: 5,
  LockMembership: 6,
} as const
export const SUBSCRIPTION_ACTION = {
  AddOfferings: 1,
  SetOfferingWeight: 2,
  RemoveOffering: 3,
  SetMinimumApprovals: 4,
} as const
export const LOCKED_TOKEN_ACTION = { SetMinimumApprovals: 1 } as const

export const VOTE_MBR = 22_500n
export const BALLOT_MBR = 35_300n
export const FIXED_SIGNER_SNAPSHOT_MBR = 9_700n
export const FIXED_SIGNER_MEMBER_MBR = 25_300n
export const FIXED_SIGNER_HISTORY_MBR = 25_300n
export const FIXED_SIGNER_WEIGHT_SLOT_MBR = 3_200n
export const SUBSCRIPTION_OFFERING_MBR = 12_500n
export const SUBSCRIPTION_HISTORY_MBR = 15_700n
export const SUBSCRIPTION_SNAPSHOT_MBR = 12_500n
/** One offering weight slot, quoted per new offering. */
export const SUBSCRIPTION_WEIGHT_SLOT_MBR = 3_200n
/** The offering weight slot box, quoted with the first offering. */
export const SUBSCRIPTION_WEIGHTS_BOX_MBR = 2_900n
/** Flat service creation cost charged by MockGuildSubscriptions. */
export const MOCK_SERVICE_COST = 20_000n
/** Funding the mock wallet factory quotes for one Guild wallet. */
export const MOCK_WALLET_COST = 3_000_000n
/** Funding the mock wallet factory forwards to each new wallet on top of its minimum balance. */
export const MOCK_WALLET_FUNDING = 2_000_000n
export const CONSENSUS_ACTION_SETTINGS_MBR = 25_300n
export const EXECUTION_MBR = 22_100n
export const PROGRAM_CHUNK_SIZE = 1_969
export const GUILD_PROGRAM_UPLOAD_CHUNK_SIZE = 2_000
export const MAX_GUILD_APPROVAL_PROGRAM_SIZE = 16_372
export const MAX_APP_CALL_FEE = microAlgo(100_000n)
export const ZERO_CID = new Uint8Array(36)
export const EMPTY_EVIDENCE = new Uint8Array()

/**
 * Ballot length used by every test proposal. Long enough that a slow LocalNet step can never
 * close a ballot early; tests end voting explicitly with `endVoting`.
 */
export const VOTING_DURATION = 60n
export const endVoting = (timeWarp: TimeWarp) => timeWarp.timeWarp(VOTING_DURATION + 5n)

export const proposalSettings = (
  overrides: Partial<{
    fee: bigint
    power: bigint
    duration: bigint
    participation: bigint
    approval: bigint
    minimumApprovals: bigint
  }> = {},
) => ({
  fee: 0n,
  power: 1n,
  duration: VOTING_DURATION,
  participation: 0n,
  approval: 50_000n,
  minimumApprovals: 1n,
  ...overrides,
})
export type ProposalSettingsInput = ReturnType<typeof proposalSettings>

export const baseConfig = (settings = proposalSettings()) => ({
  proposalActionLimit: 12n,
  proposalSettings: {
    upgradeApp: settings,
    addPlugin: settings,
    removeExecution: settings,
    removePlugin: settings,
    addAllowances: settings,
    removeAllowances: settings,
    newEscrow: settings,
    toggleEscrowLock: settings,
    updateGuild: settings,
  },
})

export type AbiBytes = Uint8Array<ArrayBuffer>
export const encodeAbi = (type: string, value: ABIValue): AbiBytes => ABIType.from(type).encode(value) as AbiBytes
export type GuildAction = [number, AbiBytes]
export const action = (type: number, data = EMPTY_EVIDENCE): GuildAction => [type, data]

const settingsTuple = (settings: ProposalSettingsInput) => [
  settings.fee,
  settings.power,
  settings.duration,
  settings.participation,
  settings.approval,
  settings.minimumApprovals,
]

// CONSENSUS ACTIONS -------------------------------------------------------------------------------
// `uint8 code || ABI payload`; the same bytes are forwarded by the Guild or by the mock host.

export const consensusData = (code: number, abiType?: string, value?: ABIValue): AbiBytes => {
  const payload = abiType === undefined ? new Uint8Array() : encodeAbi(abiType, value as ABIValue)
  const data = new Uint8Array(1 + payload.length)
  data[0] = code
  data.set(payload, 1)
  return data as AbiBytes
}
export const consensusAction = (data: AbiBytes): GuildAction => action(ACTION_CONSENSUS, data)

export const fixedSigner = {
  addMembers: (mode: number, members: [string, bigint][]) =>
    consensusData(FIXED_SIGNER_ACTION.AddMembers, '(uint8,(address,uint64)[])', [mode, members]),
  removeMember: (member: string) => consensusData(FIXED_SIGNER_ACTION.RemoveMember, '(address)', [member]),
  setMemberWeight: (member: string, weight: bigint) =>
    consensusData(FIXED_SIGNER_ACTION.SetMemberWeight, '(address,uint64)', [member, weight]),
  setThreshold: (threshold: bigint) => consensusData(FIXED_SIGNER_ACTION.SetThreshold, '(uint64)', [threshold]),
  setWeightMode: (mode: number) => consensusData(FIXED_SIGNER_ACTION.SetWeightMode, '(uint8)', [mode]),
  lockMembership: () => consensusData(FIXED_SIGNER_ACTION.LockMembership),
}

/** One service the subscription policy creates: interval (s), price (µALGO), and its voting weight. */
export type SubscriptionOfferingInput = { interval?: bigint; amount?: bigint; title?: string; weight: bigint }
const SUBSCRIPTION_OFFERINGS_ABI = '(uint64,uint64,string,byte[36],uint8,byte[3],uint64)[]'
const offeringTuples = (offerings: SubscriptionOfferingInput[]) =>
  offerings.map((offering) => [
    offering.interval ?? 2_592_000n,
    offering.amount ?? 1_000_000n,
    offering.title ?? 'Guild membership',
    ZERO_CID,
    0,
    new Uint8Array(3),
    offering.weight,
  ])

export const subscription = {
  addOfferings: (offerings: SubscriptionOfferingInput[]) =>
    consensusData(SUBSCRIPTION_ACTION.AddOfferings, SUBSCRIPTION_OFFERINGS_ABI, offeringTuples(offerings)),
  setOfferingWeight: (serviceId: bigint, weight: bigint) =>
    consensusData(SUBSCRIPTION_ACTION.SetOfferingWeight, '(uint64,uint64)', [serviceId, weight]),
  removeOffering: (serviceId: bigint) => consensusData(SUBSCRIPTION_ACTION.RemoveOffering, '(uint64)', [serviceId]),
  setMinimumApprovals: (minimumApprovals: bigint) =>
    consensusData(SUBSCRIPTION_ACTION.SetMinimumApprovals, '(uint64)', [minimumApprovals]),
}

export const lockedToken = {
  setMinimumApprovals: (minimumApprovals: bigint) =>
    consensusData(LOCKED_TOKEN_ACTION.SetMinimumApprovals, '(uint64)', [minimumApprovals]),
}

export const addFixedSignerMembersAction = (mode: number, members: [string, bigint][]): GuildAction =>
  consensusAction(fixedSigner.addMembers(mode, members))
export const removeFixedSignerMemberAction = (member: string): GuildAction =>
  consensusAction(fixedSigner.removeMember(member))
export const setFixedSignerMemberWeightAction = (member: string, weight: bigint): GuildAction =>
  consensusAction(fixedSigner.setMemberWeight(member, weight))

// GUILD ACTIONS -----------------------------------------------------------------------------------

export const setLimitAction = (limit: bigint): GuildAction => action(ACTION_SET_LIMIT, encodeAbi('(uint64)', [limit]))
export const newWalletAction = (nickname = 'guild', salt: Uint8Array = new Uint8Array(32)): GuildAction =>
  action(ACTION_NEW_WALLET, encodeAbi('(string,byte[32])', [nickname, salt]))
export const setPluginSettingsAction = (plugin: bigint, escrow: string, settings: ProposalSettingsInput): GuildAction =>
  action(
    ACTION_SET_PLUGIN_SETTINGS,
    encodeAbi('(uint64,string,(uint64,uint64,uint64,uint64,uint64,uint64))', [plugin, escrow, settingsTuple(settings)]),
  )
export const newEscrowAction = (name: string, address: string): GuildAction =>
  action(ACTION_NEW_ESCROW, encodeAbi('(string,address)', [name, address]))
export const toggleEscrowAction = (name: string): GuildAction =>
  action(ACTION_TOGGLE_ESCROW, encodeAbi('(string)', [name]))
export const reclaimAction = (name: string, reclaims: [bigint, bigint, boolean][]): GuildAction =>
  action(ACTION_RECLAIM, encodeAbi('(string,(uint64,uint64,bool)[])', [name, reclaims]))
export const changeAdminAction = (admin: string): GuildAction =>
  action(ACTION_CHANGE_ADMIN, encodeAbi('(address)', [admin]))
export const setSettingsAction = (actionType: number, settings: ProposalSettingsInput): GuildAction =>
  action(
    ACTION_SET_SETTINGS,
    encodeAbi('(uint8,(uint64,uint64,uint64,uint64,uint64,uint64))', [actionType, settingsTuple(settings)]),
  )
export const setConsensusActionSettingsAction = (code: number, settings: ProposalSettingsInput): GuildAction =>
  action(
    ACTION_SET_CONSENSUS_ACTION_SETTINGS,
    encodeAbi('(uint64,(uint64,uint64,uint64,uint64,uint64,uint64))', [BigInt(code), settingsTuple(settings)]),
  )
export const addAllowancesAction = (
  name: string,
  allowances: [bigint, number, bigint, bigint, bigint, boolean][],
): GuildAction =>
  action(ACTION_ADD_ALLOWANCES, encodeAbi('(string,(uint64,uint8,uint64,uint64,uint64,bool)[])', [name, allowances]))
export const removeExecutionAction = (lease: AbiBytes): GuildAction =>
  action(ACTION_REMOVE_EXECUTION, encodeAbi('(byte[32])', [lease]))
export const removeAllowancesAction = (name: string, assets: bigint[]): GuildAction =>
  action(ACTION_REMOVE_ALLOWANCES, encodeAbi('(string,uint64[])', [name, assets]))
export const upgradeAppAction = (
  app: bigint,
  executionKey: AbiBytes,
  groups: AbiBytes[],
  firstValid: bigint,
  lastValid: bigint,
): GuildAction =>
  action(
    ACTION_UPGRADE_APP,
    encodeAbi('(uint64,byte[32],byte[32][],uint64,uint64)', [app, executionKey, groups, firstValid, lastValid]),
  )
export const addPluginAction = (
  plugin: bigint,
  caller: string,
  escrow: string,
  settings = proposalSettings(),
  useExecutionKey = true,
): GuildAction =>
  action(
    ACTION_ADD_PLUGIN,
    encodeAbi(
      '(uint64,address,string,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,uint64,uint64,uint64,uint64,uint64,uint64,(uint64,uint8,uint64,uint64,uint64,bool)[])',
      [
        plugin,
        caller,
        escrow,
        0,
        18_446_744_073_709_551_615n,
        0n,
        [],
        false,
        useExecutionKey,
        false,
        false,
        settings.fee,
        settings.power,
        settings.duration,
        settings.participation,
        settings.approval,
        settings.minimumApprovals,
        [],
      ],
    ),
  )

export const addNamedPluginAction = (
  name: string,
  plugin: bigint,
  caller: string,
  escrow: string,
  settings = proposalSettings(),
  useExecutionKey = true,
): GuildAction =>
  action(
    ACTION_ADD_NAMED_PLUGIN,
    encodeAbi(
      '(string,uint64,address,string,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,uint64,uint64,uint64,uint64,uint64,uint64,(uint64,uint8,uint64,uint64,uint64,bool)[])',
      [
        name,
        plugin,
        caller,
        escrow,
        0,
        18_446_744_073_709_551_615n,
        0n,
        [],
        false,
        useExecutionKey,
        false,
        false,
        settings.fee,
        settings.power,
        settings.duration,
        settings.participation,
        settings.approval,
        settings.minimumApprovals,
        [],
      ],
    ),
  )

export const executePluginAction = (
  plugin: bigint,
  escrow: string,
  executionKey: AbiBytes,
  groups: AbiBytes[] = [],
  firstValid = 0n,
  lastValid = 0n,
): GuildAction =>
  action(
    ACTION_EXECUTE_PLUGIN,
    encodeAbi('(uint64,string,byte[32],byte[32][],uint64,uint64)', [
      plugin,
      escrow,
      executionKey,
      groups,
      firstValid,
      lastValid,
    ]),
  )

export const removePluginAction = (plugin: bigint, caller: string, escrow: string): GuildAction =>
  action(ACTION_REMOVE_PLUGIN, encodeAbi('(uint64,address,string)', [plugin, caller, escrow]))

export const removeNamedPluginAction = (name: string, plugin: bigint, caller: string, escrow: string): GuildAction =>
  action(ACTION_REMOVE_NAMED_PLUGIN, encodeAbi('(string,uint64,address,string)', [name, plugin, caller, escrow]))

// CONSENSUS CONFIGURATION -------------------------------------------------------------------------

export const fixedSignerConfig = (threshold: bigint) => encodeAbi('(uint64)', [threshold])
export const fixedSignerConfiguration = (mode: number, members: [string, bigint][]) =>
  encodeAbi('(uint8,(address,uint64)[])', [mode, members])
export const lockedTokenConfig = (staking: bigint, asset: bigint, minimumApprovals = 1n) =>
  encodeAbi('(uint64,uint64,uint64)', [staking, asset, minimumApprovals])
export const subscriptionConfig = (subscriptions: bigint, minimumApprovals: bigint) =>
  encodeAbi('(uint64,uint64)', [subscriptions, minimumApprovals])
export const subscriptionConfiguration = (offerings: SubscriptionOfferingInput[]) =>
  encodeAbi(SUBSCRIPTION_OFFERINGS_ABI, offeringTuples(offerings))
/** Vote evidence: the subscription ID, plus the offering's `since` epoch once its weight has changed. */
export const subscriptionEvidence = (subscriptionId: bigint, since?: bigint) =>
  since === undefined ? encodeAbi('uint64', subscriptionId) : encodeAbi('(uint64,uint64)', [subscriptionId, since])

export type GuildTestEnvironment = {
  algorand: AlgorandClient
  creator: AddressWithTransactionSigner
  akitaDao: bigint
  factory: GuildFactoryClient
  consensusFactory: GuildConsensusFactoryClient
  revenueEscrow: MockGuildWalletClient
  walletFactory: bigint
}

/** Create a funded account using the normal transaction signer. */
export const generateGuildTestAccount = async (environment: GuildTestEnvironment, initialFunds: bigint) => {
  const account = environment.algorand.account.random()
  await environment.algorand.send.payment({
    sender: environment.creator.addr,
    signer: environment.creator.signer,
    receiver: account.addr,
    amount: microAlgo(initialFunds),
  })
  return account
}

export const balanceOf = async (environment: GuildTestEnvironment, address: string | { toString(): string }) =>
  (await environment.algorand.account.getInformation(address.toString())).balance.microAlgos

export const minBalanceOf = async (environment: GuildTestEnvironment, address: string | { toString(): string }) =>
  (await environment.algorand.account.getInformation(address.toString())).minBalance.microAlgos

const uploadProgram = async (
  algorand: AlgorandClient,
  client: GuildFactoryClient | GuildConsensusFactoryClient,
  sender: AddressWithTransactionSigner,
  programName: string,
  program: Uint8Array,
) => uploadGuildProgram(algorand, client, sender.addr, sender.signer, programName, program)

export const uploadConsensusProgram = async (
  environment: GuildTestEnvironment,
  consensusName: string,
  program: Uint8Array,
  sender = environment.creator,
) => {
  const client = environment.consensusFactory.clone({ defaultSender: sender.addr, defaultSigner: sender.signer })
  await uploadProgram(environment.algorand, client, sender, consensusName, program)
}

const deployConsensusHost = async (environment: GuildTestEnvironment, program: Uint8Array) => {
  const { algorand, creator } = environment
  const factory = new MockGuildConsensusHostFactory({
    algorand,
    defaultSender: creator.addr,
    defaultSigner: creator.signer,
  })
  const { appClient: host } = await factory.send.create.create({ args: {} })
  await host.appClient.fundAppAccount({ amount: microAlgo(20_000_000n) })
  await host.send.initProgram({ args: { size: program.length } })
  for (let offset = 0; offset < program.length; offset += PROGRAM_CHUNK_SIZE) {
    await host.send.loadProgram({
      args: { offset, data: program.slice(offset, offset + PROGRAM_CHUNK_SIZE) },
    })
  }
  return host
}

export const deployFixedSignerConsensus = async (environment: GuildTestEnvironment, threshold: bigint) => {
  const { algorand, creator } = environment
  const policyFactory = new FixedSignerGuildConsensusFactory({
    algorand,
    defaultSender: creator.addr,
    defaultSigner: creator.signer,
  })
  const compiled = await policyFactory.appFactory.compile()
  const host = await deployConsensusHost(environment, compiled.approvalProgram)
  const created = await host.send.createConsensus({
    args: { governanceConfig: fixedSignerConfig(threshold) },
    maxFee: MAX_APP_CALL_FEE,
    coverAppCallInnerTransactionFees: true,
  })
  return {
    host,
    consensus: new FixedSignerGuildConsensusClient({
      algorand,
      appId: created.return!,
      defaultSender: creator.addr,
      defaultSigner: creator.signer,
    }),
  }
}

export const deploySubscriptionConsensus = async (
  environment: GuildTestEnvironment,
  subscriptions: bigint,
  minimumApprovals: bigint,
) => {
  const { algorand, creator } = environment
  const policyFactory = new SubscriptionGuildConsensusFactory({
    algorand,
    defaultSender: creator.addr,
    defaultSigner: creator.signer,
  })
  const compiled = await policyFactory.appFactory.compile()
  const host = await deployConsensusHost(environment, compiled.approvalProgram)
  const created = await host.send.createConsensus({
    args: {
      governanceConfig: subscriptionConfig(subscriptions, minimumApprovals),
    },
    maxFee: MAX_APP_CALL_FEE,
    coverAppCallInnerTransactionFees: true,
  })
  return {
    host,
    consensus: new SubscriptionGuildConsensusClient({
      algorand,
      appId: created.return!,
      defaultSender: creator.addr,
      defaultSigner: creator.signer,
    }),
  }
}

export const deployMockSubscriptions = async (environment: GuildTestEnvironment) => {
  const { algorand, creator } = environment
  const factory = new MockGuildSubscriptionsFactory({
    algorand,
    defaultSender: creator.addr,
    defaultSigner: creator.signer,
  })
  const { appClient } = await factory.send.create.create({ args: {} })
  await appClient.appClient.fundAppAccount({ amount: microAlgo(5_000_000n) })
  return appClient
}

/** Deploy both factories and register the Guild kernel and all official consensus options. */
export const deployGuildTestEnvironment = async (
  algorand: AlgorandClient,
  _testAccount: AddressWithTransactionSigner,
  createFee = 0n,
): Promise<GuildTestEnvironment> => {
  const creator = algorand.account.random()
  const dispenser = await algorand.account.dispenserFromEnvironment()
  await algorand.send.payment({
    sender: dispenser.addr,
    signer: dispenser.signer,
    receiver: creator.addr,
    amount: microAlgo(200_000_000n),
  })

  const daoFactory = new MockGuildAkitaDaoFactory({
    algorand,
    defaultSender: creator.addr,
    defaultSigner: creator.signer,
  })
  const { appClient: dao } = await daoFactory.send.create.create({ args: { createFee } })

  const { appClient: accountFactory } = await new MockGuildAccountFactoryFactory({
    algorand,
    defaultSender: creator.addr,
    defaultSigner: creator.signer,
  }).send.create.create({ args: {} })
  await accountFactory.appClient.fundAppAccount({ amount: microAlgo(1_000_000n) })
  await dao.send.setWalletFactory({ args: { wallet: accountFactory.appId } })

  const walletFactory = new MockGuildWalletFactory({
    algorand,
    defaultSender: creator.addr,
    defaultSigner: creator.signer,
  })
  const { appClient: revenueEscrow } = await walletFactory.send.create.create({
    args: { admin: creator.addr.toString() },
  })

  const { appClient: consensusFactory } = await new GuildConsensusFactoryFactory({
    algorand, defaultSender: creator.addr, defaultSigner: creator.signer,
  }).send.create.create({ args: { version: 'test', akitaDao: dao.appId } })
  await consensusFactory.appClient.fundAppAccount({ amount: microAlgo(100_000n) })

  const factoryFactory = new GuildFactoryFactory({
    algorand,
    defaultSender: creator.addr,
    defaultSigner: creator.signer,
  })
  const { appClient: factory } = await factoryFactory.send.create.create({
    args: {
      version: 'test',
      consensusFactory: consensusFactory.appId,
      akitaDao: dao.appId,
      akitaDaoEscrow: { name: 'guild_revenue', app: revenueEscrow.appId },
    },
  })
  await factory.appClient.fundAppAccount({ amount: microAlgo(100_000n) })

  const guildProgramFactory = new GuildProgramFactory({
    algorand,
    defaultSender: creator.addr,
    defaultSigner: creator.signer,
  })
  await uploadProgram(
    algorand,
    factory,
    creator,
    GUILD_PROGRAM,
    (await guildProgramFactory.appFactory.compile()).approvalProgram,
  )

  const consensusConstructors = [
    [FIXED_SIGNERS, FixedSignerGuildConsensusFactory],
    [LOCKED_TOKEN, LockedTokenGuildConsensusFactory],
    [SUBSCRIPTIONS, SubscriptionGuildConsensusFactory],
  ] as const

  for (const [name, ProgramFactory] of consensusConstructors) {
    const programFactory = new ProgramFactory({
      algorand,
      defaultSender: creator.addr,
      defaultSigner: creator.signer,
    })
    const compiled = await programFactory.appFactory.compile()
    await uploadProgram(algorand, consensusFactory, creator, name, compiled.approvalProgram)
  }

  return {
    algorand,
    creator,
    akitaDao: dao.appId,
    factory,
    consensusFactory,
    revenueEscrow,
    walletFactory: accountFactory.appId,
  }
}

export const mintGuild = async (
  environment: GuildTestEnvironment,
  consensusName: string,
  governanceConfig: Uint8Array,
  settings = proposalSettings(),
  sender = environment.creator,
  config = baseConfig(settings),
) => {
  const { algorand } = environment
  const factory = environment.factory.clone({ defaultSender: sender.addr, defaultSigner: sender.signer })
  const payment = await algorand.createTransaction.payment({
    sender: sender.addr,
    signer: sender.signer,
    receiver: factory.appAddress,
    amount: microAlgo(await factory.cost({ args: { consensusName }, staticFee: MAX_APP_CALL_FEE })),
  })
  const result = await factory
    .newGroup()
    .opUp({ args: {}, note: 'guild-mint-opup-2', maxFee: MAX_APP_CALL_FEE })
    .opUp({ args: {}, maxFee: MAX_APP_CALL_FEE })
    .newGuild({
      args: {
        payment,
        consensusName,
        baseConfig: config,
        governanceConfig,
      },
      maxFee: MAX_APP_CALL_FEE,
    })
    .send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true })
  const deployment = result.returns[2]!
  return {
    deployment,
    guild: new GuildClient({
      algorand,
      appId: deployment.guild,
      defaultSender: sender.addr,
      defaultSigner: sender.signer,
    }),
  }
}

export const deployMockStaking = async (environment: GuildTestEnvironment) => {
  const { algorand, creator } = environment
  const factory = new MockGuildStakingFactory({
    algorand,
    defaultSender: creator.addr,
    defaultSigner: creator.signer,
  })
  const { appClient } = await factory.send.create.create({ args: {} })
  await appClient.appClient.fundAppAccount({ amount: microAlgo(5_000_000n) })
  return appClient
}

/** Client for a Guild wallet created by the mock wallet factory. */
export const walletClient = (environment: GuildTestEnvironment, appId: bigint) =>
  new MockGuildWalletClient({
    algorand: environment.algorand,
    appId,
    defaultSender: environment.creator.addr,
    defaultSigner: environment.creator.signer,
  })

/** Have a draft Guild create its own wallet through the DAO wallet factory, funded by its creator. */
export const setupGuildWallet = async (
  environment: GuildTestEnvironment,
  guild: GuildClient,
  nickname = 'guild',
): Promise<MockGuildWalletClient> => {
  const cost = await guild.setupCost({ args: {}, staticFee: MAX_APP_CALL_FEE })
  const payment = await environment.algorand.createTransaction.payment({
    sender: environment.creator.addr,
    signer: environment.creator.signer,
    receiver: guild.appAddress,
    amount: microAlgo(cost),
  })
  const result = await guild
    .newGroup()
    .addTransaction(payment)
    .setup({ args: { nickname, salt: new Uint8Array(32) }, maxFee: MAX_APP_CALL_FEE })
    .send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true })
  return walletClient(environment, result.returns[0]!)
}

/** Create a voting asset; locked-token power counts whole tokens of 10^decimals base units. */
export const createVotingAsset = async (environment: GuildTestEnvironment, total = 100n, decimals = 6): Promise<bigint> => {
  const { algorand, creator } = environment
  const result = await algorand.send.assetCreate({
    sender: creator.addr,
    signer: creator.signer,
    total,
    decimals,
    assetName: 'Guild Voting Test',
    unitName: 'GVT',
  })
  return result.assetId
}

/** Mint a Guild whose creator has one year of time-decayed lock power. */
export const mintLockedGuild = async (
  environment: GuildTestEnvironment,
  settings = proposalSettings(),
  sender = environment.creator,
  minimumApprovals = 1n,
) => {
  const staking = await deployMockStaking(environment)
  const asset = await createVotingAsset(environment, 1_000_000_000n)
  const amount = 1_000_000_000n
  const now = await latestTimestamp(environment.algorand)
  await staking.send.setLock({
    args: {
      account: sender.addr.toString(),
      asset,
      amount,
      expiration: now + 366n * 86_400n,
    },
  })
  await staking.send.setLiveLockedStake({ args: { asset, amount } })
  const minted = await mintGuild(environment, LOCKED_TOKEN, lockedTokenConfig(staking.appId, asset, minimumApprovals), settings, sender)
  return { ...minted, staking, asset }
}

const OP_UPS = ['1', '2', '3', '4', '5'] as const

const withOpUps = (guild: GuildClient, prefix: string) => {
  let group = guild.newGroup()
  for (const index of OP_UPS) {
    group = group.opUp({ args: {}, note: `${prefix}-opup-${index}`, maxFee: MAX_APP_CALL_FEE })
  }
  return group
}

export const proposalCostOf = async (guild: GuildClient, actions: GuildAction[]) => {
  const result = await withOpUps(guild, 'proposal-cost')
    .proposalCost({ args: { actions }, maxFee: MAX_APP_CALL_FEE })
    .send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true })
  return result.returns[OP_UPS.length]!
}

export const createProposal = async (
  environment: GuildTestEnvironment,
  guild: GuildClient,
  actions: GuildAction[],
  evidence = EMPTY_EVIDENCE,
  proposer = environment.creator,
) => {
  const proposerGuild = guild.clone({ defaultSender: proposer.addr, defaultSigner: proposer.signer })
  const cost = await proposalCostOf(proposerGuild, actions)
  const payment = await environment.algorand.createTransaction.payment({
    sender: proposer.addr,
    signer: proposer.signer,
    receiver: guild.appAddress,
    amount: microAlgo(cost.total),
  })
  const created = await withOpUps(proposerGuild, 'proposal-create')
    .newProposal({
      args: { payment, cid: ZERO_CID, actions, evidence },
      maxFee: MAX_APP_CALL_FEE,
    })
    .send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true })
  return created.returns[OP_UPS.length]!
}

export const submitProposal = async (guild: GuildClient, proposalId: bigint, evidence = EMPTY_EVIDENCE) =>
  withOpUps(guild, 'proposal-submit')
    .submitProposal({ args: { proposalId, evidence }, maxFee: MAX_APP_CALL_FEE })
    .send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true })

export const finalizeProposal = async (guild: GuildClient, proposalId: bigint) =>
  withOpUps(guild, 'proposal-finalize')
    .finalizeProposal({ args: { proposalId }, maxFee: MAX_APP_CALL_FEE })
    .send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true })

export const cancelProposal = async (guild: GuildClient, proposalId: bigint) =>
  guild.send.cancelProposal({
    args: { proposalId },
    maxFee: MAX_APP_CALL_FEE,
    coverAppCallInnerTransactionFees: true,
  })

export const executeProposal = async (guild: GuildClient, proposalId: bigint) =>
  withOpUps(guild, 'proposal-execute')
    .executeProposal({ args: { proposalId }, maxFee: MAX_APP_CALL_FEE })
    .send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true })

export const cleanupProposal = async (guild: GuildClient, proposalId: bigint, voters: string[]) => {
  const result = await withOpUps(guild, 'proposal-cleanup')
    .cleanupProposalConsensus({ args: { proposalId, voters }, maxFee: MAX_APP_CALL_FEE })
    .send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true })
  return result.returns[OP_UPS.length]!
}

/** Create, submit, approve with the creator's vote, end voting, finalize, and execute one proposal. */
export const approveAndExecute = async (
  environment: GuildTestEnvironment,
  timeWarp: TimeWarp,
  guild: GuildClient,
  actions: GuildAction[],
  options: { voters?: AddressWithTransactionSigner[]; evidence?: Uint8Array; voteEvidence?: (voter: AddressWithTransactionSigner) => Uint8Array } = {},
) => {
  const proposalId = await createProposal(environment, guild, actions, options.evidence)
  await submitProposal(guild, proposalId, options.evidence)
  for (const voter of options.voters ?? [environment.creator]) {
    await vote(environment, guild, voter, proposalId, APPROVE, options.voteEvidence?.(voter) ?? options.evidence)
  }
  await endVoting(timeWarp)
  await finalizeProposal(guild, proposalId)
  await executeProposal(guild, proposalId)
  return proposalId
}

export const vote = async (
  environment: GuildTestEnvironment,
  guild: GuildClient,
  voter: AddressWithTransactionSigner,
  proposalId: bigint,
  choice: number,
  evidence = EMPTY_EVIDENCE,
) => {
  const voterGuild = guild.clone({ defaultSender: voter.addr, defaultSigner: voter.signer })
  // a first vote funds its receipt; changing a vote pays nothing
  const cost = await guild.voteCost({ args: { proposalId, voter: voter.addr.toString() }, staticFee: MAX_APP_CALL_FEE })
  const payment = await environment.algorand.createTransaction.payment({
    sender: voter.addr,
    signer: voter.signer,
    receiver: guild.appAddress,
    amount: microAlgo(cost),
  })
  return voterGuild
    .newGroup()
    .opUp({ args: {}, maxFee: MAX_APP_CALL_FEE })
    .voteProposal({
      args: { mbrPayment: payment, proposalId, vote: choice, evidence },
      maxFee: MAX_APP_CALL_FEE,
    })
    .send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true })
}

export const latestTimestamp = async (algorand: AlgorandClient): Promise<bigint> => {
  const status = await algorand.client.algod.status().do()
  return (await algorand.client.algod.block(status.lastRound).do()).block.header.timestamp
}

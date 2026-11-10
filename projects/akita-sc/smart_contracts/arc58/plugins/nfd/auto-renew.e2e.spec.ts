import { Config, microAlgo } from '@algorandfoundation/algokit-utils'
import { registerDebugEventHandlers } from '@algorandfoundation/algokit-utils-debug'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { sendPrepared } from 'akita-sdk'
import { CallerType, isFlatAllowance, NFDPluginSDK } from 'akita-sdk/wallet'
import { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

import {
  Arc58NfdInstanceMockClient,
  Arc58NfdInstanceMockFactory,
} from '../../../artifacts/arc58/plugins/nfd/Arc58NfdInstanceMockClient'
import {
  Arc58NfdRegistryMockClient,
  Arc58NfdRegistryMockFactory,
} from '../../../artifacts/arc58/plugins/nfd/Arc58NfdRegistryMockClient'
import { NfdPluginFactory } from '../../../artifacts/arc58/plugins/nfd/NFDPluginClient'
import {
  Arc58AgentDelegationDeployment,
  Arc58AgentTestAccount,
  Arc58AgentWalletScenario,
  createFreshAgentWallet,
  deployArc58AgentDelegationFixture,
} from '../../../../tests/fixtures/arc58-agent-delegation'
import { TimeWarp } from '../../../../tests/utils/time'
import {
  errAllowanceExceeded,
  errAuthAddrMismatch,
  errMethodOnCooldown,
  errPluginDoesNotExist,
  errPluginExpired,
  errPluginOnCooldown,
} from '../../account/errors'
import { NFDPluginAutoRenewWindow } from './constants'
import { errCannotAutoRenew, errNotAnNfd, errNotNfdOwner, errPriceAboveMax } from './errors'

const MAX_UINT64 = 18_446_744_073_709_551_615n
const AGENT_DELEGATION_TYPE = 2n
const RENEW_PRICE = 250_000n
const DAY = 24n * 60n * 60n
const TEST_TIMEOUT = 180_000

type NfdAuditDeployment = Arc58AgentDelegationDeployment & {
  registry: Arc58NfdRegistryMockClient
  nfdFactory: Arc58NfdInstanceMockFactory
  nfdPlugin: NFDPluginSDK
}

type NfdAuditContext = {
  deployment: NfdAuditDeployment
  scenario: Arc58AgentWalletScenario
  nfd: Arc58NfdInstanceMockClient
  nfdName: string
  namedAccounts: Map<string, string>
}

type GrantOptions = {
  caller?: string
  callerType?: bigint
  escrow?: string
  lastValid?: bigint
  cooldown?: bigint
  methodCooldown?: bigint
  useRounds?: boolean
  useExecutionKey?: boolean
  allowance?: bigint
  bindOwner?: boolean
  method?: 'autoRenew' | 'purchase' | 'renew'
}

const fixture = algorandFixture()
let deployment: NfdAuditDeployment
let scenarioSequence = 0

function addressOf(account: Arc58AgentTestAccount): string {
  return account.addr.toString()
}

async function latestTimestamp(): Promise<bigint> {
  const status = await deployment.algorand.client.algod.status().do()
  const block = await deployment.algorand.client.algod.block(status.lastRound).do()
  return BigInt(block.block.header.timestamp)
}

async function newContext(options: { expiration?: bigint; price?: bigint } = {}): Promise<NfdAuditContext> {
  const scenario = await createFreshAgentWallet(deployment)
  const nfdName = `arc58-auto-${++scenarioSequence}.algo`
  const expiration = options.expiration ?? (await latestTimestamp()) + 10n * DAY
  const price = options.price ?? RENEW_PRICE
  const { appClient: nfd } = await deployment.nfdFactory.send.create.create({
    args: {
      name: nfdName,
      owner: scenario.wallet.client.appAddress.toString(),
      expiration,
      price,
    },
  })

  await deployment.registry.send.configure({
    args: { slot: 0n, name: nfdName, appId: nfd.appId, enabled: true },
  })
  await deployment.registry.send.configure({
    args: { slot: 1n, name: '', appId: 0n, enabled: false },
  })

  return { deployment, scenario, nfd, nfdName, namedAccounts: new Map() }
}

async function installAutoRenewGrant(context: NfdAuditContext, options: GrantOptions = {}): Promise<string> {
  const { wallet, owner, agent } = context.scenario
  const {
    caller = addressOf(agent),
    callerType = CallerType.Other,
    escrow = '',
    lastValid = MAX_UINT64,
    cooldown = 0n,
    methodCooldown = 0n,
    useRounds = true,
    useExecutionKey = false,
    allowance,
    bindOwner = true,
    method = 'autoRenew',
  } = options

  await wallet.addPlugin({
    client: deployment.nfdPlugin,
    sender: owner.addr,
    signer: owner.signer,
    callerType: callerType as typeof CallerType.Other,
    caller,
    escrow,
    delegationType: AGENT_DELEGATION_TYPE,
    lastValid,
    cooldown,
    methods: [{ name: deployment.nfdPlugin[method](), cooldown: methodCooldown }],
    useRounds,
    useExecutionKey,
    allowances: allowance === undefined ? undefined : [{ type: 'flat', asset: 0n, amount: allowance }],
  })

  let spendingAddress = wallet.client.appAddress.toString()
  if (escrow !== '') {
    spendingAddress = (await wallet.getEscrow(escrow)).address.toString()
    context.namedAccounts.set(escrow, spendingAddress)
    const dispenser = await deployment.algorand.account.dispenserFromEnvironment()
    await deployment.algorand.account.ensureFunded(
      spendingAddress,
      dispenser.addr.toString(),
      microAlgo(2_000_000),
    )
  }
  if (bindOwner) {
    await context.nfd.send.setOwner({ args: { owner: spendingAddress } })
  }
  return spendingAddress
}

type InvokeOptions = {
  caller?: Arc58AgentTestAccount
  callerType?: bigint
  escrow?: string
  appId?: bigint
  rekeyBack?: boolean
  maxPrice?: bigint
  fundsRequest?: { asset: bigint; amount: bigint }[]
}

async function invokeAutoRenew(context: NfdAuditContext, options: InvokeOptions = {}): Promise<unknown> {
  return invokePluginWindow(context, options, (caller, args) =>
    deployment.nfdPlugin.client.params.autoRenew({ sender: caller.addr, signer: caller.signer, maxFee: microAlgo(1_000), args }),
  )
}

async function invokePurchase(context: NfdAuditContext, options: InvokeOptions = {}): Promise<unknown> {
  return invokePluginWindow(context, options, (caller, args) =>
    deployment.nfdPlugin.client.params.purchase({ sender: caller.addr, signer: caller.signer, maxFee: microAlgo(1_000), args }),
  )
}

async function invokeRenew(context: NfdAuditContext, years: bigint, options: InvokeOptions = {}): Promise<unknown> {
  return invokePluginWindow(context, options, (caller, args) =>
    deployment.nfdPlugin.client.params.renew({
      sender: caller.addr,
      signer: caller.signer,
      maxFee: microAlgo(1_000),
      args: { ...args, years },
    }),
  )
}

async function invokePluginWindow(
  context: NfdAuditContext,
  options: InvokeOptions,
  buildCall: (
    caller: Arc58AgentTestAccount,
    args: { wallet: bigint; rekeyBack: boolean; appId: bigint; maxPrice: bigint },
  ) => ReturnType<typeof deployment.nfdPlugin.client.params.autoRenew>,
): Promise<unknown> {
  const { wallet, agent } = context.scenario
  const {
    caller = agent,
    callerType = CallerType.Other,
    escrow = '',
    appId = context.nfd.appId,
    rekeyBack = true,
    maxPrice = RENEW_PRICE,
    fundsRequest = [],
  } = options
  const group = wallet.client.newGroup()

  group.arc58RekeyToPlugin({
    sender: caller.addr,
    signer: caller.signer,
    args: {
      plugin: deployment.nfdPlugin.appId,
      type: callerType,
      escrow,
      methodOffsets: [0n],
      fundsRequest: fundsRequest.map(({ asset, amount }) => [asset, amount]),
    },
    extraFee: microAlgo(5_000n + BigInt(fundsRequest.length) * 1_000n),
  })
  const composer = await group.composer()
  composer.addAppCallMethodCall(await buildCall(caller, { wallet: wallet.appId, rekeyBack, appId, maxPrice }))
  group.arc58VerifyAuthAddress({ sender: caller.addr, signer: caller.signer, args: {} })
  return group.send()
}

async function invokeForbiddenMethod(
  context: NfdAuditContext,
  method: 'renew' | 'offerForSale',
): Promise<unknown> {
  const { wallet, agent, outsider } = context.scenario
  const group = wallet.client.newGroup()
  group.arc58RekeyToPlugin({
    sender: agent.addr,
    signer: agent.signer,
    args: {
      plugin: deployment.nfdPlugin.appId,
      type: CallerType.Other,
      escrow: '',
      methodOffsets: [0n],
      fundsRequest: [],
    },
    extraFee: microAlgo(5_000),
  })
  const composer = await group.composer()
  const params =
    method === 'renew'
      ? await deployment.nfdPlugin.client.params.renew({
          sender: agent.addr,
          signer: agent.signer,
          args: { wallet: wallet.appId, rekeyBack: true, appId: context.nfd.appId, years: 2n, maxPrice: 2n * RENEW_PRICE },
        })
      : await deployment.nfdPlugin.client.params.offerForSale({
          sender: agent.addr,
          signer: agent.signer,
          args: {
            wallet: wallet.appId,
            rekeyBack: true,
            appId: context.nfd.appId,
            sellAmount: 1n,
            reservedFor: outsider.addr.toString(),
          },
        })
  composer.addAppCallMethodCall(params)
  group.arc58VerifyAuthAddress({ sender: agent.addr, signer: agent.signer, args: {} })
  return group.send()
}

function normalize(value: unknown): unknown {
  if (typeof value === 'bigint') return value.toString()
  if (value instanceof Uint8Array) return Buffer.from(value).toString('hex')
  if (value instanceof Map) {
    return Array.from(value.entries())
      .map(([key, item]) => [normalize(key), normalize(item)])
      .sort((left, right) => JSON.stringify(left[0]).localeCompare(JSON.stringify(right[0])))
  }
  if (Array.isArray(value)) return value.map(normalize)
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, item]) => [key, normalize(item)]),
    )
  }
  return value
}

async function accountSnapshot(address: string): Promise<unknown> {
  const info = (await deployment.algorand.client.algod.accountInformation(address)) as unknown as Record<
    string,
    unknown
  >
  return {
    address,
    amount: String(info.amount ?? 0),
    minBalance: String(info.minBalance ?? info['min-balance'] ?? 0),
    authAddress: String(info.authAddr ?? info['auth-addr'] ?? address),
  }
}

async function captureState(context: NfdAuditContext): Promise<unknown> {
  const addresses = [
    context.scenario.wallet.client.appAddress.toString(),
    context.nfd.appAddress.toString(),
    ...context.namedAccounts.values(),
  ]
  return normalize({
    accounts: await Promise.all(Array.from(new Set(addresses)).sort().map(accountSnapshot)),
    walletGlobal: await context.scenario.wallet.client.state.global.getAll(),
    plugins: await context.scenario.wallet.client.state.box.plugins.getMap(),
    escrows: await context.scenario.wallet.client.state.box.escrows.getMap(),
    allowances: await context.scenario.wallet.client.state.box.allowances.getMap(),
    executions: await context.scenario.wallet.client.state.box.executions.getMap(),
    nfdGlobal: await context.nfd.state.global.getAll(),
    registryGlobal: await deployment.registry.state.global.getAll(),
  })
}

async function expectAuthorityRestored(context: NfdAuditContext): Promise<void> {
  const walletAddress = context.scenario.wallet.client.appAddress.toString()
  const controlled = [walletAddress, ...context.namedAccounts.values()]
  for (const address of controlled) {
    const info = await deployment.algorand.account.getInformation(address)
    expect(info.authAddr?.toString() ?? address).toBe(walletAddress)
  }
  const global = await context.scenario.wallet.client.state.global.getAll()
  expect(global.spendingAddress).toBe(ALGORAND_ZERO_ADDRESS_STRING)
  expect(global.rekeyIndex).toBe(0n)
  expect(global.currentPlugin?.plugin ?? 0n).toBe(0n)
}

async function expectRejectedWithoutMutation(
  context: NfdAuditContext,
  action: () => Promise<unknown>,
  code?: string,
): Promise<void> {
  const before = await captureState(context)
  if (code === undefined) {
    await expect(action()).rejects.toBeDefined()
  } else {
    await expect(action()).rejects.toThrow(code)
  }
  expect(await captureState(context)).toStrictEqual(before)
  await expectAuthorityRestored(context)
}

beforeAll(async () => {
  Config.configure({ debug: true, populateAppCallResources: true })
  registerDebugEventHandlers()
  const base = await deployArc58AgentDelegationFixture(fixture)
  const registryFactory = base.algorand.client.getTypedAppFactory(Arc58NfdRegistryMockFactory, {
    defaultSender: base.deployer.addr,
    defaultSigner: base.deployer.signer,
  })
  const { appClient: registry } = await registryFactory.send.create.create({ args: {} })
  const nfdFactory = base.algorand.client.getTypedAppFactory(Arc58NfdInstanceMockFactory, {
    defaultSender: base.deployer.addr,
    defaultSigner: base.deployer.signer,
  })
  const pluginFactory = base.algorand.client.getTypedAppFactory(NfdPluginFactory, {
    defaultSender: base.deployer.addr,
    defaultSigner: base.deployer.signer,
  })
  const { appClient: pluginClient } = await pluginFactory.send.create.create({
    args: { registry: registry.appId },
  })
  const nfdPlugin = new NFDPluginSDK({
    algorand: base.algorand,
    factoryParams: {
      appId: pluginClient.appId,
      defaultSender: base.deployer.addr,
      defaultSigner: base.deployer.signer,
    },
  })
  deployment = { ...base, registry, nfdFactory, nfdPlugin }
}, 300_000)

afterAll(async () => {
  deployment?.restoreEnvironment()
  if (deployment) await new TimeWarp(deployment.algorand).resetTimeWarp()
})

describe('NFD auto-renew target, method, and amount scope', () => {
  test(
    'uses the immutable configured registry, exact registered app, autoRenew selector, and one on-chain price',
    async () => {
      const context = await newContext()
      await installAutoRenewGrant(context)
      expect(await deployment.nfdPlugin.client.state.global.registry()).toBe(deployment.registry.appId)
      const method = deployment.nfdPlugin.client.appClient.getABIMethod('autoRenew')
      expect(method.args.map((arg) => arg.type.toString())).toStrictEqual(['uint64', 'bool', 'uint64', 'uint64'])
      const beforeNfd = await deployment.algorand.account.getInformation(context.nfd.appAddress)

      await invokeAutoRenew(context)

      const afterNfd = await deployment.algorand.account.getInformation(context.nfd.appAddress)
      const nfdState = await context.nfd.state.global.getAll()
      expect(afterNfd.balance.microAlgos - beforeNfd.balance.microAlgos).toBe(RENEW_PRICE)
      expect(nfdState.lastPayment).toBe(RENEW_PRICE)
      expect(nfdState.renewCount).toBe(1n)
      expect(nfdState.ownershipCalls).toBe(0n)
      await expectAuthorityRestored(context)
    },
    TEST_TIMEOUT,
  )

  test.each(['renew', 'offerForSale'] as const)(
    'method allowlist rejects NFD plugin %s even for the granted app and caller',
    async (method) => {
      const context = await newContext()
      await installAutoRenewGrant(context)
      await expectRejectedWithoutMutation(context, () => invokeForbiddenMethod(context, method), errMethodOnCooldown)
    },
    TEST_TIMEOUT,
  )

  test(
    'rejects an unregistered app ID and a registry-valid NFD owned by another account',
    async () => {
      const context = await newContext()
      await installAutoRenewGrant(context)
      const foreignName = `foreign-${++scenarioSequence}.algo`
      const { appClient: foreign } = await deployment.nfdFactory.send.create.create({
        args: {
          name: foreignName,
          owner: context.scenario.outsider.addr.toString(),
          expiration: (await latestTimestamp()) + DAY,
          price: RENEW_PRICE,
        },
      })

      await expectRejectedWithoutMutation(context, () => invokeAutoRenew(context, { appId: foreign.appId }), errNotAnNfd)

      await deployment.registry.send.configure({
        args: { slot: 1n, name: foreignName, appId: foreign.appId, enabled: true },
      })
      await expectRejectedWithoutMutation(
        context,
        () => invokeAutoRenew(context, { appId: foreign.appId }),
        errNotNfdOwner,
      )
      expect((await foreign.state.global.getAll()).renewCount).toBe(0n)
    },
    TEST_TIMEOUT,
  )
})

describe('NFD auto-renew window and domain validity', () => {
  test.each([
    ['at the 30-day boundary', BigInt(NFDPluginAutoRenewWindow), true],
    ['one second beyond 30 days', BigInt(NFDPluginAutoRenewWindow) + 1n, false],
    ['already expired', -1n, false],
  ] as const)(
    '%s is enforced',
    async (_label, offset, allowed) => {
      const now = await latestTimestamp()
      const context = await newContext({ expiration: now + offset })
      await installAutoRenewGrant(context)
      if (allowed) {
        await invokeAutoRenew(context)
        expect((await context.nfd.state.global.getAll()).renewCount).toBe(1n)
        await expectAuthorityRestored(context)
      } else {
        await expectRejectedWithoutMutation(context, () => invokeAutoRenew(context), errCannotAutoRenew)
      }
    },
    TEST_TIMEOUT,
  )

  test.each(['registry removal', 'name mutation', 'ownership mutation'] as const)(
    'safe-fails after %s',
    async (mutation) => {
      const context = await newContext()
      await installAutoRenewGrant(context)
      if (mutation === 'registry removal') {
        await deployment.registry.send.configure({
          args: { slot: 0n, name: context.nfdName, appId: context.nfd.appId, enabled: false },
        })
      } else if (mutation === 'name mutation') {
        await context.nfd.send.setName({ args: { name: `changed-${scenarioSequence}.algo` } })
      } else {
        await context.nfd.send.setOwner({ args: { owner: context.scenario.outsider.addr.toString() } })
      }
      await expectRejectedWithoutMutation(
        context,
        () => invokeAutoRenew(context),
        mutation === 'ownership mutation' ? errNotNfdOwner : errNotAnNfd,
      )
    },
    TEST_TIMEOUT,
  )
})

describe('NFD auto-renew ARC-58 permission dimensions', () => {
  test(
    'binds Other caller identity and caller type',
    async () => {
      const context = await newContext()
      await installAutoRenewGrant(context)
      await expectRejectedWithoutMutation(
        context,
        () => invokeAutoRenew(context, { caller: context.scenario.outsider }),
        errPluginDoesNotExist,
      )
      await expectRejectedWithoutMutation(
        context,
        () => invokeAutoRenew(context, { callerType: CallerType.Global }),
        errPluginDoesNotExist,
      )
    },
    TEST_TIMEOUT,
  )

  test.each([
    ['main account', ''],
    ['named subaccount', 'renewal'],
  ] as const)(
    'renews only an NFD owned by the granted %s and restores its auth address',
    async (_label, escrow) => {
      const context = await newContext()
      await installAutoRenewGrant(context, { escrow })
      await invokeAutoRenew(context, { escrow })
      expect((await context.nfd.state.global.getAll()).renewCount).toBe(1n)
      await expectAuthorityRestored(context)
    },
    TEST_TIMEOUT,
  )

  test(
    'rejects crossing from a named grant to main scope without mutation',
    async () => {
      const context = await newContext()
      await installAutoRenewGrant(context, { escrow: 'only-named' })
      await expectRejectedWithoutMutation(context, () => invokeAutoRenew(context), errPluginDoesNotExist)
    },
    TEST_TIMEOUT,
  )

  test(
    'bounds cumulative named-subaccount funding while renewal spends exactly the downstream price',
    async () => {
      const context = await newContext()
      const escrow = 'allowance'
      await installAutoRenewGrant(context, { escrow, allowance: RENEW_PRICE })
      await invokeAutoRenew(context, {
        escrow,
        fundsRequest: [{ asset: 0n, amount: RENEW_PRICE }],
      })
      const allowance = await context.scenario.wallet.getAllowance({ escrow, asset: 0n })
      expect(isFlatAllowance(allowance) && allowance.spent).toBe(RENEW_PRICE)
      expect((await context.nfd.state.global.getAll()).lastPayment).toBe(RENEW_PRICE)
      await expectRejectedWithoutMutation(
        context,
        () =>
          invokeAutoRenew(context, {
            escrow,
            fundsRequest: [{ asset: 0n, amount: 1n }],
          }),
        errAllowanceExceeded,
      )
    },
    TEST_TIMEOUT,
  )

  test.each([
    ['expiry', { lastValid: 0n }, errPluginExpired],
    ['plugin cooldown', { cooldown: 100n }, errPluginOnCooldown],
    ['method cooldown', { methodCooldown: 100n }, errMethodOnCooldown],
  ] as const)(
    'safe-denies grant %s',
    async (kind, grant, code) => {
      const context = await newContext()
      await installAutoRenewGrant(context, grant)
      if (kind !== 'expiry') await invokeAutoRenew(context)
      await expectRejectedWithoutMutation(context, () => invokeAutoRenew(context), code)
    },
    TEST_TIMEOUT,
  )
})

describe('NFD auto-renew revocation, execution keys, and rollback', () => {
  test(
    'admin grant removal and emergency revocation each stop renewal immediately',
    async () => {
      const removed = await newContext()
      await installAutoRenewGrant(removed)
      await removed.scenario.wallet.removePlugin({
        sender: removed.scenario.owner.addr,
        signer: removed.scenario.owner.signer,
        plugin: deployment.nfdPlugin.appId,
        caller: addressOf(removed.scenario.agent),
        escrow: '',
      })
      await expectRejectedWithoutMutation(removed, () => invokeAutoRenew(removed), errPluginDoesNotExist)

      const revoked = await newContext()
      await installAutoRenewGrant(revoked, {
        caller: ALGORAND_ZERO_ADDRESS_STRING,
        callerType: CallerType.Global,
      })
      await deployment.revoker.send.revokePlugin({
        sender: revoked.scenario.outsider.addr,
        signer: revoked.scenario.outsider.signer,
        extraFee: microAlgo(1_000),
        args: {
          wallet: revoked.scenario.wallet.appId,
          plugin: deployment.nfdPlugin.appId,
          caller: ALGORAND_ZERO_ADDRESS_STRING,
          escrow: '',
        },
      })
      await expectRejectedWithoutMutation(
        revoked,
        () => invokeAutoRenew(revoked, { callerType: CallerType.Global }),
        errPluginDoesNotExist,
      )
    },
    TEST_TIMEOUT,
  )

  test(
    'requires and consumes an exact execution-key group',
    async () => {
      const context = await newContext()
      const { wallet, owner, agent } = context.scenario
      await installAutoRenewGrant(context, {
        caller: ALGORAND_ZERO_ADDRESS_STRING,
        callerType: CallerType.Global,
        useExecutionKey: true,
      })
      await expectRejectedWithoutMutation(
        context,
        () => invokeAutoRenew(context, { callerType: CallerType.Global }),
      )

      const lease = `nfd-renew-${++scenarioSequence}`
      const built = await wallet.build.usePlugin({
        sender: agent.addr,
        signer: agent.signer,
        callerType: CallerType.Global,
        lease,
        calls: [
          deployment.nfdPlugin.autoRenew({
            sender: agent.addr,
            signer: agent.signer,
            appId: context.nfd.appId,
            maxPrice: RENEW_PRICE,
          }),
        ],
      })
      const firstValid = built.windows[0].transactions[0].firstValid
      const lastValid = built.windows[0].transactions[0].lastValid
      await wallet.addExecutionKey({
        sender: owner.addr,
        signer: owner.signer,
        lease: built.lease,
        groups: [built.ids[0]],
        firstValid,
        lastValid,
      })
      await sendPrepared(built.windows[0], deployment.algorand.client.algod)
      expect((await context.nfd.state.global.getAll()).renewCount).toBe(1n)
      await expectAuthorityRestored(context)
      await expect(sendPrepared(built.windows[0], deployment.algorand.client.algod)).rejects.toBeDefined()
    },
    TEST_TIMEOUT,
  )

  test(
    'rolls back when the plugin omits rekey-back or downstream renewal fails',
    async () => {
      const authContext = await newContext()
      await installAutoRenewGrant(authContext)
      await expectRejectedWithoutMutation(
        authContext,
        () => invokeAutoRenew(authContext, { rekeyBack: false }),
        errAuthAddrMismatch,
      )

      const downstream = await newContext()
      await installAutoRenewGrant(downstream)
      await downstream.nfd.send.setFailure({ args: { failPrice: false, failRenew: true } })
      await expectRejectedWithoutMutation(downstream, () => invokeAutoRenew(downstream))
      expect((await downstream.nfd.state.global.getAll()).renewCount).toBe(0n)
    },
    TEST_TIMEOUT,
  )
})

describe('NFD auto-renew direct-call bypass resistance', () => {
  test(
    'direct plugin and controlled-account payment attempts cannot spend wallet or escrow funds',
    async () => {
      const context = await newContext()
      await installAutoRenewGrant(context, { escrow: 'direct-bypass' })
      await expectRejectedWithoutMutation(context, () =>
        deployment.nfdPlugin.client.send.autoRenew({
          sender: context.scenario.agent.addr,
          signer: context.scenario.agent.signer,
          staticFee: microAlgo(6_000),
          args: {
            wallet: context.scenario.wallet.appId,
            rekeyBack: true,
            appId: context.nfd.appId,
            maxPrice: RENEW_PRICE,
          },
        }),
      )

      const escrowAddress = context.namedAccounts.get('direct-bypass')!
      await expectRejectedWithoutMutation(context, () =>
        deployment.algorand.send.payment({
          sender: escrowAddress,
          signer: context.scenario.agent.signer,
          receiver: context.nfd.appAddress,
          amount: microAlgo(RENEW_PRICE),
        }),
      )
    },
    TEST_TIMEOUT,
  )
})

describe('NFD plugin caller price bounds (MISC-1, MISC-S1)', () => {
  const LISTED_PRICE = 400_000n

  test(
    'purchase rejects a seller price raised above maxPrice and pays exactly the listed price at the bound',
    async () => {
      const context = await newContext()
      const { outsider } = context.scenario
      const spendingAddress = await installAutoRenewGrant(context, { method: 'purchase', bindOwner: false })
      await context.nfd.send.setOwner({ args: { owner: outsider.addr.toString() } })
      await context.nfd.send.setSaleAmount({ args: { amount: LISTED_PRICE } })

      // The seller reprices after the buyer signed for the listed price.
      await context.nfd.send.setSaleAmount({ args: { amount: 10n * LISTED_PRICE } })
      await expectRejectedWithoutMutation(
        context,
        () => invokePurchase(context, { maxPrice: LISTED_PRICE }),
        errPriceAboveMax,
      )

      await context.nfd.send.setSaleAmount({ args: { amount: LISTED_PRICE } })
      const before = await deployment.algorand.account.getInformation(context.nfd.appAddress)
      await invokePurchase(context, { maxPrice: LISTED_PRICE })
      const after = await deployment.algorand.account.getInformation(context.nfd.appAddress)
      const nfdState = await context.nfd.state.global.getAll()
      expect(after.balance.microAlgos - before.balance.microAlgos).toBe(LISTED_PRICE)
      expect(nfdState.owner).toBe(spendingAddress)
      expect(nfdState.purchaseCount).toBe(1n)
      await expectAuthorityRestored(context)
    },
    TEST_TIMEOUT,
  )

  test(
    'autoRenew rejects an NFD renewal quote raised above maxPrice',
    async () => {
      const context = await newContext()
      await installAutoRenewGrant(context)
      await context.nfd.send.setPrice({ args: { price: RENEW_PRICE + 1n } })
      await expectRejectedWithoutMutation(context, () => invokeAutoRenew(context), errPriceAboveMax)
      expect((await context.nfd.state.global.getAll()).renewCount).toBe(0n)

      await invokeAutoRenew(context, { maxPrice: RENEW_PRICE + 1n })
      expect((await context.nfd.state.global.getAll()).lastPayment).toBe(RENEW_PRICE + 1n)
    },
    TEST_TIMEOUT,
  )

  test(
    'renew bounds the total price for all years',
    async () => {
      const context = await newContext()
      await installAutoRenewGrant(context, { method: 'renew' })
      await expectRejectedWithoutMutation(
        context,
        () => invokeRenew(context, 2n, { maxPrice: 2n * RENEW_PRICE - 1n }),
        errPriceAboveMax,
      )
    },
    TEST_TIMEOUT,
  )
})

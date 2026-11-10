import { Config, microAlgo } from '@algorandfoundation/algokit-utils'
import { registerDebugEventHandlers } from '@algorandfoundation/algokit-utils-debug'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { AppCallMethodCall } from '@algorandfoundation/algokit-utils/types/composer'
import { sendPrepared } from 'akita-sdk'
import { CallerType, isFlatAllowance } from 'akita-sdk/wallet'
import { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

import { EscrowClient } from '../../artifacts/escrow/EscrowClient'
import {
  ARC58_CALLER_TYPE,
  Arc58AgentDelegationConformanceDriver,
  Arc58AgentDelegationRequest,
  Arc58DelegationScope,
  registerArc58AgentDelegationConformanceSuite,
} from '../../../tests/conformance/arc58-agent-delegation'
import {
  Arc58AgentDelegationDeployment,
  Arc58AgentTestAccount,
  Arc58AgentWalletScenario,
  createFreshAgentWallet,
  deployArc58AgentDelegationFixture,
} from '../../../tests/fixtures/arc58-agent-delegation'
import { TimeWarp } from '../../../tests/utils/time'
import {
  errAdminOnly,
  errAllowanceDoesNotExist,
  errAllowanceExceeded,
  errAuthAddrMismatch,
  errCannotCallOtherAppsDuringRekey,
  errGroupNotFound,
  errMethodOnCooldown,
  errPluginDoesNotExist,
  errPluginExpired,
  errPluginOnCooldown,
} from './errors'
import { errOnlyCreatorCanRekey } from '../../escrow/errors'

const MAX_UINT64 = 18_446_744_073_709_551_615n
const AGENT_DELEGATION_TYPE = 2n
const NAMED_ESCROW_FEE = 6_000n
const TEST_TIMEOUT = 180_000

type AgentContext = {
  deployment: Arc58AgentDelegationDeployment
  scenario: Arc58AgentWalletScenario
  namedAccounts: Map<string, string>
}

type AgentRequest = Arc58AgentDelegationRequest<Arc58AgentTestAccount, bigint, Uint8Array>

const fixture = algorandFixture()
let deployment: Arc58AgentDelegationDeployment
let scenarioSequence = 0

function addressOf(account: Arc58AgentTestAccount): string {
  return account.addr.toString()
}

function selector(context: AgentContext, method: 'allowed' | 'forbidden'): Uint8Array {
  return context.deployment.probePlugin.appClient.getABIMethod(method).getSelector()
}

function sameBytes(left: Uint8Array, right: Uint8Array): boolean {
  return Buffer.from(left).equals(Buffer.from(right))
}

function escrowName(scope: Arc58DelegationScope): string {
  return scope.kind === 'main' ? '' : scope.name
}

async function newContext(): Promise<AgentContext> {
  return {
    deployment,
    scenario: await createFreshAgentWallet(deployment),
    namedAccounts: new Map(),
  }
}

async function rememberEscrow(context: AgentContext, name: string): Promise<string> {
  const address = (await context.scenario.wallet.getEscrow(name)).address.toString()
  context.namedAccounts.set(name, address)
  return address
}

type ProbeGrantOptions = {
  caller?: string
  escrow?: string
  delegationType?: bigint
  lastValid?: bigint
  cooldown?: bigint
  methodCooldown?: bigint
  useRounds?: boolean
  useExecutionKey?: boolean
}

async function installProbeGrant(context: AgentContext, options: ProbeGrantOptions = {}): Promise<void> {
  const { wallet, owner, agent } = context.scenario
  const {
    caller = addressOf(agent),
    escrow = '',
    delegationType = AGENT_DELEGATION_TYPE,
    lastValid = MAX_UINT64,
    cooldown = 0n,
    methodCooldown = 0n,
    useRounds = true,
    useExecutionKey = false,
  } = options

  await wallet.client.send.arc58AddPlugin({
    sender: owner.addr,
    signer: owner.signer,
    extraFee: microAlgo(escrow === '' ? 0n : NAMED_ESCROW_FEE),
    args: {
      plugin: context.deployment.probePlugin.appId,
      caller,
      escrow,
      admin: false,
      delegationType,
      lastValid,
      cooldown,
      methods: [[selector(context, 'allowed'), methodCooldown]],
      useRounds,
      useExecutionKey,
      coverFees: false,
      canReclaim: false,
      defaultToEscrow: false,
    },
  })

  if (escrow !== '') await rememberEscrow(context, escrow)
}

async function preflight(context: AgentContext, request: AgentRequest): Promise<boolean> {
  try {
    const result = await context.scenario.wallet.client.send.arc58CanCall({
      sender: request.caller.addr,
      signer: request.caller.signer,
      args: {
        plugin: request.plugin,
        type: request.callerType,
        address: addressOf(request.caller),
        escrow: escrowName(request.scope),
        method: request.method,
      },
    })
    return result.return === true
  } catch {
    return false
  }
}

async function addProbeCall(
  context: AgentContext,
  group: ReturnType<AgentContext['scenario']['wallet']['client']['newGroup']>,
  plugin: bigint,
  method: Uint8Array,
  caller: Arc58AgentTestAccount,
  rekeyBack = true,
): Promise<void> {
  const pluginClient =
    plugin === context.deployment.probePlugin.appId
      ? context.deployment.probePlugin
      : context.deployment.otherProbePlugin
  const methodName = sameBytes(method, selector(context, 'forbidden')) ? 'forbidden' : 'allowed'
  const params =
    methodName === 'forbidden'
      ? await pluginClient.params.forbidden({
          sender: caller.addr,
          signer: caller.signer,
          args: { wallet: context.scenario.wallet.appId, rekeyBack },
          maxFee: microAlgo(1_000),
        })
      : await pluginClient.params.allowed({
          sender: caller.addr,
          signer: caller.signer,
          args: { wallet: context.scenario.wallet.appId, rekeyBack },
          maxFee: microAlgo(1_000),
        })
  const composer = await group.composer()
  composer.addAppCallMethodCall(params)
}

async function getPayMethodCall(
  context: AgentContext,
  caller: Arc58AgentTestAccount,
  amount = 0n,
): Promise<AppCallMethodCall> {
  const { wallet, receiver } = context.scenario
  const call = context.deployment.payPlugin.pay({
    sender: caller.addr,
    signer: caller.signer,
    payments: [{ receiver: addressOf(receiver), amount, asset: 0n }],
  })
  const txns = await call().getTxns({ wallet: wallet.appId })
  return txns[0] as AppCallMethodCall
}

async function invokeRaw(context: AgentContext, request: AgentRequest, rekeyBack = true): Promise<unknown> {
  const { wallet } = context.scenario
  const group = wallet.client.newGroup()

  group.arc58RekeyToPlugin({
    sender: request.caller.addr,
    signer: request.caller.signer,
    args: {
      plugin: request.plugin,
      type: request.callerType,
      escrow: escrowName(request.scope),
      methodOffsets: [0n],
      fundsRequest: [],
    },
    extraFee: microAlgo(2_000),
  })

  await addProbeCall(context, group, request.plugin, request.method, request.caller, rekeyBack)

  group.arc58VerifyAuthAddress({ sender: request.caller.addr, signer: request.caller.signer, args: {} })
  return group.send()
}

async function invokePayRaw(
  context: AgentContext,
  options: {
    caller: Arc58AgentTestAccount
    callerType: bigint
    escrow?: string
    amount?: bigint
    fundsRequest?: { asset: bigint; amount: bigint }[]
  },
): Promise<unknown> {
  const { wallet } = context.scenario
  const { caller, callerType, escrow = '', amount = 0n, fundsRequest = [] } = options
  const group = wallet.client.newGroup()

  group.arc58RekeyToPlugin({
    sender: caller.addr,
    signer: caller.signer,
    args: {
      plugin: context.deployment.payPlugin.appId,
      type: callerType,
      escrow,
      methodOffsets: [],
      fundsRequest: fundsRequest.map(({ asset, amount: requested }) => [asset, requested]),
    },
    extraFee: microAlgo(2_000n + BigInt(fundsRequest.length) * 1_000n),
  })

  const composer = await group.composer()
  composer.addAppCallMethodCall(await getPayMethodCall(context, caller, amount))
  group.arc58VerifyAuthAddress({ sender: caller.addr, signer: caller.signer, args: {} })
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

async function accountSnapshot(context: AgentContext, address: string): Promise<unknown> {
  const info = (await context.deployment.algorand.client.algod.accountInformation(address)) as unknown as Record<
    string,
    unknown
  >
  const holdings = ((info.assets ?? []) as Array<Record<string, unknown>>)
    .map((holding) => ({
      asset: String(holding.assetId ?? holding['asset-id']),
      amount: String(holding.amount ?? 0),
      frozen: Boolean(holding.isFrozen ?? holding['is-frozen'] ?? false),
    }))
    .sort((left, right) => left.asset.localeCompare(right.asset))

  return {
    address,
    amount: String(info.amount ?? 0),
    minBalance: String(info.minBalance ?? info['min-balance'] ?? 0),
    authAddress: String(info.authAddr ?? info['auth-addr'] ?? address),
    holdings,
  }
}

async function captureWalletState(context: AgentContext): Promise<unknown> {
  const { wallet, receiver } = context.scenario
  const accounts = [wallet.client.appAddress.toString(), addressOf(receiver), ...context.namedAccounts.values()]
  const uniqueAccounts = Array.from(new Set(accounts)).sort()

  return normalize({
    accounts: await Promise.all(uniqueAccounts.map((address) => accountSnapshot(context, address))),
    global: await wallet.client.state.global.getAll(),
    plugins: await wallet.client.state.box.plugins.getMap(),
    namedPlugins: await wallet.client.state.box.namedPlugins.getMap(),
    escrows: await wallet.client.state.box.escrows.getMap(),
    allowances: await wallet.client.state.box.allowances.getMap(),
    executions: await wallet.client.state.box.executions.getMap(),
  })
}

async function observeAuthority(context: AgentContext): Promise<{
  restored: boolean
  state: Array<{ address: string; expected: string; effective: string }>
}> {
  const walletAddress = context.scenario.wallet.client.appAddress.toString()
  const expected = [
    { address: walletAddress, expected: walletAddress },
    ...Array.from(context.namedAccounts.values()).map((address) => ({ address, expected: walletAddress })),
  ]
  const state = await Promise.all(
    expected.map(async (entry) => {
      const info = await context.deployment.algorand.account.getInformation(entry.address)
      return { ...entry, effective: info.authAddr?.toString() ?? entry.address }
    }),
  )
  return { restored: state.every((entry) => entry.effective === entry.expected), state }
}

async function expectAuthorityAndTransientStateRestored(context: AgentContext): Promise<void> {
  expect((await observeAuthority(context)).restored).toBe(true)
  const global = await context.scenario.wallet.client.state.global.getAll()
  expect(global.spendingAddress).toBe(ALGORAND_ZERO_ADDRESS_STRING)
  expect(global.rekeyIndex).toBe(0n)
  expect(global.currentPlugin?.plugin ?? 0n).toBe(0n)
}

async function expectRejectedWith(action: () => Promise<unknown>, code: string): Promise<void> {
  await expect(action()).rejects.toThrow(code)
}

async function expectBoxMissing(action: () => Promise<unknown>): Promise<void> {
  try {
    expect(await action()).toBeUndefined()
  } catch (error) {
    expect(String(error)).toContain('box not found')
  }
}

const conformanceDriver: Arc58AgentDelegationConformanceDriver<
  AgentContext,
  Arc58AgentTestAccount,
  bigint,
  Uint8Array,
  unknown,
  Array<{ address: string; expected: string; effective: string }>
> = {
  name: 'Akita ARC-58 agent permission dimensions',
  timeoutMs: TEST_TIMEOUT,
  createScenario: async ({ scope }) => {
    const context = await newContext()
    const name = `agent-scope-${++scenarioSequence}`
    const baselineScope: Arc58DelegationScope = scope === 'main' ? { kind: 'main' } : { kind: 'named', name }
    await installProbeGrant(context, { escrow: escrowName(baselineScope) })

    return {
      context,
      baseline: {
        caller: context.scenario.agent,
        callerType: ARC58_CALLER_TYPE.Other,
        plugin: context.deployment.probePlugin.appId,
        method: selector(context, 'allowed'),
        scope: baselineScope,
      },
      mutationValues: {
        caller: context.scenario.outsider,
        plugin: context.deployment.otherProbePlugin.appId,
        method: selector(context, 'forbidden'),
        scope: scope === 'main' ? { kind: 'named', name: `${name}-ungranted` } : { kind: 'main' },
      },
    }
  },
  preflight,
  invoke: invokeRaw,
  snapshot: captureWalletState,
  authority: observeAuthority,
}

beforeAll(async () => {
  Config.configure({ debug: true, populateAppCallResources: true })
  registerDebugEventHandlers()
  deployment = await deployArc58AgentDelegationFixture(fixture)
}, 300_000)

afterAll(async () => {
  deployment?.restoreEnvironment()
  if (deployment) await new TimeWarp(deployment.algorand).resetTimeWarp()
})

registerArc58AgentDelegationConformanceSuite(conformanceDriver)

describe('ARC-58 caller types and lifecycle', () => {
  test(
    'accepts Global from an agent and Admin only from the wallet owner',
    async () => {
      const globalContext = await newContext()
      await installProbeGrant(globalContext, { caller: ALGORAND_ZERO_ADDRESS_STRING })
      const globalRequest: AgentRequest = {
        caller: globalContext.scenario.agent,
        callerType: CallerType.Global,
        plugin: deployment.probePlugin.appId,
        method: selector(globalContext, 'allowed'),
        scope: { kind: 'main' },
      }
      expect(await preflight(globalContext, globalRequest)).toBe(true)
      await invokeRaw(globalContext, globalRequest)
      await expectAuthorityAndTransientStateRestored(globalContext)

      const adminContext = await newContext()
      const walletAddress = adminContext.scenario.wallet.client.appAddress.toString()
      await installProbeGrant(adminContext, { caller: walletAddress })
      const ownerRequest: AgentRequest = {
        caller: adminContext.scenario.owner,
        callerType: CallerType.Admin,
        plugin: deployment.probePlugin.appId,
        method: selector(adminContext, 'allowed'),
        scope: { kind: 'main' },
      }
      expect(await preflight(adminContext, ownerRequest)).toBe(true)
      await invokeRaw(adminContext, ownerRequest)

      const agentRequest = { ...ownerRequest, caller: adminContext.scenario.agent }
      expect(await preflight(adminContext, agentRequest)).toBe(false)
      const before = await captureWalletState(adminContext)
      await expectRejectedWith(() => invokeRaw(adminContext, agentRequest), errAdminOnly)
      expect(await captureWalletState(adminContext)).toStrictEqual(before)
      await expectAuthorityAndTransientStateRestored(adminContext)
    },
    TEST_TIMEOUT,
  )

  test(
    'stores Agent delegation metadata without recording agent work as user interaction',
    async () => {
      const context = await newContext()
      await installProbeGrant(context)
      const key = {
        plugin: deployment.probePlugin.appId,
        caller: addressOf(context.scenario.agent),
        escrow: '',
      }
      const installed = await context.scenario.wallet.client.state.box.plugins.value(key)
      expect(installed?.delegationType).toBe(Number(AGENT_DELEGATION_TYPE))
      const interactionBefore = await context.scenario.wallet.client.state.global.lastUserInteraction()

      await new TimeWarp(deployment.algorand).timeWarp(2n)
      await invokeRaw(context, {
        caller: context.scenario.agent,
        callerType: CallerType.Other,
        plugin: deployment.probePlugin.appId,
        method: selector(context, 'allowed'),
        scope: { kind: 'main' },
      })

      expect(await context.scenario.wallet.client.state.global.lastUserInteraction()).toBe(interactionBefore)
      await expectAuthorityAndTransientStateRestored(context)
    },
    TEST_TIMEOUT,
  )

  test.each([
    ['expiry', { lastValid: 0n, useRounds: true }, errPluginExpired],
    ['plugin cooldown', { cooldown: 100n, useRounds: true }, errPluginOnCooldown],
    ['method cooldown', { methodCooldown: 100n, useRounds: true }, errMethodOnCooldown],
  ] as const)(
    'safe-denies %s in both preflight and execution',
    async (kind, grant, expectedCode) => {
      const context = await newContext()
      await installProbeGrant(context, grant)
      const request: AgentRequest = {
        caller: context.scenario.agent,
        callerType: CallerType.Other,
        plugin: deployment.probePlugin.appId,
        method: selector(context, 'allowed'),
        scope: { kind: 'main' },
      }

      if (kind !== 'expiry') await invokeRaw(context, request)
      const before = await captureWalletState(context)
      expect(await preflight(context, request)).toBe(false)
      await expectRejectedWith(() => invokeRaw(context, request), expectedCode)
      expect(await captureWalletState(context)).toStrictEqual(before)
      await expectAuthorityAndTransientStateRestored(context)
    },
    TEST_TIMEOUT,
  )

  test(
    'rejects a different app inserted inside an otherwise granted rekey sandwich',
    async () => {
      const context = await newContext()
      await installProbeGrant(context)
      const { wallet, agent } = context.scenario
      const group = wallet.client.newGroup()
      group.arc58RekeyToPlugin({
        sender: agent.addr,
        signer: agent.signer,
        args: {
          plugin: deployment.probePlugin.appId,
          type: CallerType.Other,
          escrow: '',
          methodOffsets: [0n],
          fundsRequest: [],
        },
        extraFee: microAlgo(2_000),
      })
      const composer = await group.composer()
      composer.addAppCallMethodCall(await getPayMethodCall(context, agent))
      group.arc58VerifyAuthAddress({ sender: agent.addr, signer: agent.signer, args: {} })

      const before = await captureWalletState(context)
      await expectRejectedWith(() => group.send(), errCannotCallOtherAppsDuringRekey)
      expect(await captureWalletState(context)).toStrictEqual(before)
      await expectAuthorityAndTransientStateRestored(context)
    },
    TEST_TIMEOUT,
  )
})

describe('ARC-58 cumulative asset and payment allowances', () => {
  test.each([
    ['ALGO', 0n],
    ['ASA', () => deployment.assetId],
  ] as const)(
    'bounds duplicate and cumulative %s funding requests atomically',
    async (_label, assetValue) => {
      const context = await newContext()
      const { wallet, owner, agent, receiver } = context.scenario
      const asset = typeof assetValue === 'function' ? assetValue() : assetValue
      const escrow = `allowance-${++scenarioSequence}`
      const allowance = 1_000_000n

      if (asset !== 0n) {
        await wallet.addPlugin({
          client: deployment.selfOptInPlugin,
          callerType: CallerType.Global,
          delegationType: AGENT_DELEGATION_TYPE,
        })
        await wallet.usePlugin({
          sender: owner.addr,
          signer: owner.signer,
          callerType: CallerType.Global,
          calls: [
            deployment.selfOptInPlugin.optIn({
              sender: owner.addr,
              signer: owner.signer,
              assets: [asset],
            }),
          ],
        })
        await deployment.algorand.send.assetTransfer({
          sender: deployment.deployer.addr,
          signer: deployment.deployer.signer,
          receiver: wallet.client.appAddress,
          assetId: asset,
          amount: allowance + 100n,
        })
      }

      await wallet.addPlugin({
        client: deployment.payPlugin,
        callerType: CallerType.Other,
        caller: addressOf(agent),
        escrow,
        delegationType: AGENT_DELEGATION_TYPE,
        allowances: [{ type: 'flat', asset, amount: allowance }],
      })
      await rememberEscrow(context, escrow)

      if (asset !== 0n) {
        await wallet.client.send.arc58OptInEscrow({
          sender: owner.addr,
          signer: owner.signer,
          extraFee: microAlgo(2_000),
          args: { escrow, assets: [asset] },
        })
      }

      const pay = async (fundsRequest: { asset: bigint; amount: bigint }[], amount: bigint) =>
        wallet.usePlugin({
          sender: agent.addr,
          signer: agent.signer,
          callerType: CallerType.Other,
          escrow,
          fundsRequest,
          calls: [
            deployment.payPlugin.pay({
              sender: agent.addr,
              signer: agent.signer,
              payments: [{ receiver: addressOf(receiver), asset, amount }],
            }),
          ],
        })

      await pay([{ asset, amount: 400_000n }], 400_000n)
      let info = await wallet.getAllowance({ escrow, asset })
      expect(isFlatAllowance(info) && info.spent).toBe(400_000n)

      const beforeOverage = await captureWalletState(context)
      await expectRejectedWith(
        () =>
          pay(
            [
              { asset, amount: 300_000n },
              { asset, amount: 301_000n },
            ],
            601_000n,
          ),
        errAllowanceExceeded,
      )
      expect(await captureWalletState(context)).toStrictEqual(beforeOverage)

      await pay(
        [
          { asset, amount: 250_000n },
          { asset, amount: 350_000n },
        ],
        600_000n,
      )
      info = await wallet.getAllowance({ escrow, asset })
      expect(isFlatAllowance(info) && info.spent).toBe(allowance)

      const beforeExhausted = await captureWalletState(context)
      await expectRejectedWith(() => pay([{ asset, amount: 1n }], 1n), errAllowanceExceeded)
      expect(await captureWalletState(context)).toStrictEqual(beforeExhausted)

      const wrongAsset = asset === 0n ? deployment.assetId : 0n
      await expectRejectedWith(() => pay([{ asset: wrongAsset, amount: 1n }], 0n), errAllowanceDoesNotExist)
      expect(await captureWalletState(context)).toStrictEqual(beforeExhausted)
      await expectAuthorityAndTransientStateRestored(context)
    },
    TEST_TIMEOUT,
  )
})

describe('ARC-58 removal and emergency revocation', () => {
  test(
    'admin removal deletes only the exact caller grant',
    async () => {
      const context = await newContext()
      const { wallet, owner, agent, outsider } = context.scenario
      for (const caller of [agent, outsider]) {
        await wallet.addPlugin({
          client: deployment.payPlugin,
          callerType: CallerType.Other,
          caller: addressOf(caller),
          delegationType: AGENT_DELEGATION_TYPE,
        })
      }

      await wallet.removePlugin({
        sender: owner.addr,
        signer: owner.signer,
        plugin: deployment.payPlugin.appId,
        caller: addressOf(agent),
        escrow: '',
      })

      const paySelector = deployment.payPlugin.pay()().selectors[0]
      expect(
        await preflight(context, {
          caller: agent,
          callerType: CallerType.Other,
          plugin: deployment.payPlugin.appId,
          method: paySelector,
          scope: { kind: 'main' },
        }),
      ).toBe(false)
      await expectRejectedWith(
        () => invokePayRaw(context, { caller: agent, callerType: CallerType.Other }),
        errPluginDoesNotExist,
      )

      expect(
        await preflight(context, {
          caller: outsider,
          callerType: CallerType.Other,
          plugin: deployment.payPlugin.appId,
          method: paySelector,
          scope: { kind: 'main' },
        }),
      ).toBe(true)
      await invokePayRaw(context, { caller: outsider, callerType: CallerType.Other })
      await expectAuthorityAndTransientStateRestored(context)
    },
    TEST_TIMEOUT,
  )

  test(
    'configured emergency app removes a Global grant for every caller',
    async () => {
      const context = await newContext()
      const { wallet, agent, outsider } = context.scenario
      await wallet.addPlugin({
        client: deployment.payPlugin,
        callerType: CallerType.Global,
        delegationType: AGENT_DELEGATION_TYPE,
      })

      await deployment.revoker.send.revokePlugin({
        sender: outsider.addr,
        signer: outsider.signer,
        extraFee: microAlgo(1_000),
        args: {
          wallet: wallet.appId,
          plugin: deployment.payPlugin.appId,
          caller: ALGORAND_ZERO_ADDRESS_STRING,
          escrow: '',
        },
      })

      await expectBoxMissing(() =>
        wallet.client.state.box.plugins.value({
          plugin: deployment.payPlugin.appId,
          caller: ALGORAND_ZERO_ADDRESS_STRING,
          escrow: '',
        }),
      )
      await expectRejectedWith(
        () => invokePayRaw(context, { caller: agent, callerType: CallerType.Global }),
        errPluginDoesNotExist,
      )
      await expectAuthorityAndTransientStateRestored(context)
    },
    TEST_TIMEOUT,
  )
})

describe('ARC-58 execution-key and auth-address invariants', () => {
  test.each([
    ['main account', ''],
    ['named escrow', 'missing-rekey-back'],
  ] as const)(
    'rolls back an approved plugin call that leaves the %s rekeyed',
    async (_label, escrow) => {
      const context = await newContext()
      await installProbeGrant(context, { escrow })
      const request: AgentRequest = {
        caller: context.scenario.agent,
        callerType: CallerType.Other,
        plugin: deployment.probePlugin.appId,
        method: selector(context, 'allowed'),
        scope: escrow === '' ? { kind: 'main' } : { kind: 'named', name: escrow },
      }

      expect(await preflight(context, request)).toBe(true)
      const before = await captureWalletState(context)
      await expectRejectedWith(() => invokeRaw(context, request, false), errAuthAddrMismatch)
      expect(await captureWalletState(context)).toStrictEqual(before)
      await expectAuthorityAndTransientStateRestored(context)
    },
    TEST_TIMEOUT,
  )

  test(
    'safe-denies an unlisted group, consumes all listed alternatives once, and restores authority',
    async () => {
      const context = await newContext()
      const { wallet, owner, agent, outsider, receiver } = context.scenario
      await wallet.addPlugin({
        client: deployment.payPlugin,
        callerType: CallerType.Global,
        delegationType: AGENT_DELEGATION_TYPE,
        useExecutionKey: true,
        useRounds: true,
      })

      const paySelector = deployment.payPlugin.pay()().selectors[0]
      expect(
        await preflight(context, {
          caller: agent,
          callerType: CallerType.Global,
          plugin: deployment.payPlugin.appId,
          method: paySelector,
          scope: { kind: 'main' },
        }),
      ).toBe(false)
      const beforeMissingKey = await captureWalletState(context)
      await expect(
        invokePayRaw(context, { caller: agent, callerType: CallerType.Global, amount: 1n }),
      ).rejects.toBeDefined()
      expect(await captureWalletState(context)).toStrictEqual(beforeMissingKey)
      await expectAuthorityAndTransientStateRestored(context)

      const lease = `agent-execution-${++scenarioSequence}`
      const build = (caller: Arc58AgentTestAccount, amount: bigint, firstValid?: bigint, windowSize = 100n) =>
        wallet.build.usePlugin({
          sender: caller.addr,
          signer: caller.signer,
          lease,
          firstValid,
          windowSize,
          callerType: CallerType.Global,
          calls: [
            deployment.payPlugin.pay({
              sender: caller.addr,
              signer: caller.signer,
              payments: [{ receiver: addressOf(receiver), asset: 0n, amount }],
            }),
          ],
        })

      const allowedA = await build(agent, 1_000n)
      const firstValid = allowedA.windows[0].transactions[0].firstValid
      const lastValid = allowedA.windows[0].transactions[0].lastValid
      const windowSize = lastValid - firstValid + 1n
      const allowedB = await build(outsider, 2_000n, firstValid, windowSize)
      const denied = await build(agent, 3_000n, firstValid, windowSize)

      await wallet.addExecutionKey({
        sender: owner.addr,
        signer: owner.signer,
        lease: allowedA.lease,
        groups: [allowedA.ids[0], allowedB.ids[0]],
        firstValid,
        lastValid,
      })

      const beforeDenied = await captureWalletState(context)
      await expectRejectedWith(
        () => sendPrepared(denied.windows[0], deployment.algorand.client.algod),
        errGroupNotFound,
      )
      expect(await captureWalletState(context)).toStrictEqual(beforeDenied)

      await sendPrepared(allowedA.windows[0], deployment.algorand.client.algod)
      await expectBoxMissing(() => wallet.client.state.box.executions.value(allowedA.lease))
      await expectAuthorityAndTransientStateRestored(context)

      const afterConsumption = await captureWalletState(context)
      await expect(sendPrepared(allowedB.windows[0], deployment.algorand.client.algod)).rejects.toBeDefined()
      expect(await captureWalletState(context)).toStrictEqual(afterConsumption)
      await expectAuthorityAndTransientStateRestored(context)
    },
    TEST_TIMEOUT,
  )
})

describe('ARC-58 direct-call bypass resistance', () => {
  test(
    'a direct PayPlugin call cannot spend from the wallet',
    async () => {
      const context = await newContext()
      const { wallet, agent, receiver } = context.scenario
      await wallet.addPlugin({
        client: deployment.payPlugin,
        callerType: CallerType.Other,
        caller: addressOf(agent),
        delegationType: AGENT_DELEGATION_TYPE,
      })

      const before = await captureWalletState(context)
      await expect(
        deployment.payPlugin.client.send.pay({
          sender: agent.addr,
          signer: agent.signer,
          staticFee: microAlgo(2_000),
          args: {
            wallet: wallet.appId,
            rekeyBack: true,
            payments: [[addressOf(receiver), 0n, 1_000_000n]],
          },
        }),
      ).rejects.toBeDefined()
      expect(await captureWalletState(context)).toStrictEqual(before)
      await expectAuthorityAndTransientStateRestored(context)
    },
    TEST_TIMEOUT,
  )

  test.each([
    ['main account', ''],
    ['named escrow', 'direct-auth-bypass'],
  ] as const)(
    'an agent signature cannot directly spend from the %s',
    async (_label, escrow) => {
      const context = await newContext()
      const { wallet, agent } = context.scenario
      let spendingAddress = wallet.client.appAddress.toString()

      if (escrow !== '') {
        await wallet.addPlugin({
          client: deployment.payPlugin,
          callerType: CallerType.Other,
          caller: addressOf(agent),
          escrow,
          delegationType: AGENT_DELEGATION_TYPE,
        })
        spendingAddress = await rememberEscrow(context, escrow)
      }

      const before = await captureWalletState(context)
      await expect(
        deployment.algorand.send.payment({
          sender: spendingAddress,
          signer: agent.signer,
          receiver: addressOf(agent),
          amount: microAlgo(1),
        }),
      ).rejects.toBeDefined()
      expect(await captureWalletState(context)).toStrictEqual(before)
      await expectAuthorityAndTransientStateRestored(context)
    },
    TEST_TIMEOUT,
  )

  test(
    'an EOA cannot directly rekey a wallet-created escrow',
    async () => {
      const context = await newContext()
      const { wallet, agent } = context.scenario
      const escrow = `escrow-bypass-${++scenarioSequence}`
      await wallet.addPlugin({
        client: deployment.payPlugin,
        callerType: CallerType.Other,
        caller: addressOf(agent),
        escrow,
        delegationType: AGENT_DELEGATION_TYPE,
      })
      const escrowInfo = await wallet.getEscrow(escrow)
      context.namedAccounts.set(escrow, escrowInfo.address.toString())
      expect(escrowInfo.id).toBeGreaterThan(0n)

      const escrowClient = deployment.algorand.client.getTypedAppClientById(EscrowClient, {
        appId: escrowInfo.id,
        defaultSender: agent.addr,
        defaultSigner: agent.signer,
      })
      const before = await captureWalletState(context)
      await expectRejectedWith(
        () =>
          escrowClient.send.rekey({
            extraFee: microAlgo(1_000),
            args: { rekeyTo: addressOf(agent) },
          }),
        errOnlyCreatorCanRekey,
      )
      expect(await captureWalletState(context)).toStrictEqual(before)
      await expectAuthorityAndTransientStateRestored(context)
    },
    TEST_TIMEOUT,
  )
})

describe('ARC-58 invalid caller enum regression', () => {
  test(
    'unknown caller types cannot alias an Other grant',
    async () => {
      const context = await newContext()
      await installProbeGrant(context)
      const request: AgentRequest = {
        caller: context.scenario.agent,
        callerType: 99n,
        plugin: deployment.probePlugin.appId,
        method: selector(context, 'allowed'),
        scope: { kind: 'main' },
      }
      expect(await preflight(context, request)).toBe(false)
      const before = await captureWalletState(context)
      await expect(invokeRaw(context, request)).rejects.toBeDefined()
      expect(await captureWalletState(context)).toStrictEqual(before)
      await expectAuthorityAndTransientStateRestored(context)
    },
    TEST_TIMEOUT,
  )
})

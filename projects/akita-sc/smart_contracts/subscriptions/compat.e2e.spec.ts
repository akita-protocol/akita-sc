/**
 * Principal resolution, Phase 2 compatibility suite for Subscriptions (PHASE-0-SPEC.md §7.1 "Compatibility
 * baseline = deployed bytecode", §7.2, §7.5 P2-CMP-01 / P2-SUB-01, Q13).
 *
 * The May 2026 Subscriptions plugin is installed from its DEPLOYED MainNet approval/clear programs
 * (`compat/mainnet-programs.json`, app 3569561107, byte-identical to the HEAD artifact) — never from the
 * working tree. It calls the pre-hint selectors, so every flow below runs through the legacy shims of the
 * upgraded singleton: registry referral, registry gate origin with a plain `Gate.mustCheck`, no stored pair,
 * and the legacy `gatedTriggerPayment` (no `errInvalidSequence`). Its wallet is registered in the
 * EscrowFactory (SDK `newWallet`), as live MainNet wallets are.
 *
 * The December 2025 plugin (3368399152) is covered statically only (`principal-shims.test.ts`): its
 * `newService` selector is already absent from the deployed singleton, so its flows are not a baseline.
 */
import * as algokit from '@algorandfoundation/algokit-utils'
import { microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import type { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import { GateSDK, LogicalOperator, Operator } from 'akita-sdk/gates'
import { SUBSCRIPTION_PRINCIPAL_MBR, SubscriptionsSDK } from 'akita-sdk/subscriptions'
import { CallerType, newWallet, SubscriptionsPluginSDK, WalletSDK } from 'akita-sdk/wallet'
import algosdk from 'algosdk'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { afterEach, beforeAll, describe, expect, test } from 'vitest'
import { AkitaUniverse, buildAkitaUniverse } from '../../tests/fixtures/dao'
import { expectContractError } from '../../tests/utils/errors'
import { TimeWarp } from '../../tests/utils/time'
import { errPrincipalExists } from './errors'

algokit.Config.configure({ populateAppCallResources: true })

type DeployedApp = {
  approval: string
  clear: string
  extraProgramPages: number
  globalSchema: { numUint: number; numByteSlice: number }
  localSchema: { numUint: number; numByteSlice: number }
}
const programs = JSON.parse(readFileSync(path.join(__dirname, 'compat/mainnet-programs.json'), 'utf8')) as { apps: Record<string, DeployedApp> }

const fixture = algorandFixture()
const EMPTY_CID = new Uint8Array(36).fill(120)
const INTERVAL = 3_600n
const AMOUNT = 100_000n
const SUBSCRIPTIONS_MBR = 60_500n
const GATE_MIN_BALANCE = 50_000_000n
const NO_ARGS = [new Uint8Array()]
const MAY_2026_PLUGIN = '3569561107'

describe('Subscriptions: deployed May 2026 plugin against the upgraded singleton (P2-CMP-01)', () => {
  let algorand: algokit.AlgorandClient
  let universe: AkitaUniverse
  let subscriptions: SubscriptionsSDK
  let gate: GateSDK
  let timeWarp: TimeWarp

  let deployer: TransactionSignerAccount
  let user: TransactionSignerAccount
  let merchant: TransactionSignerAccount
  let keeper: TransactionSignerAccount
  let R1: TransactionSignerAccount

  let oldPlugin: SubscriptionsPluginSDK
  /** registered (SDK newWallet), referrer R1, with the deployed plugin and the new one */
  let Wr: WalletSDK
  let gateAlgo: bigint
  let svcPlain: bigint
  let svcAlgo: bigint

  const addr = (w: WalletSDK) => w.client.appAddress.toString()
  const send = (a: TransactionSignerAccount) => ({ sender: a.addr, signer: a.signer })
  type PluginCalls = Parameters<WalletSDK['usePlugin']>[0]['calls']
  const use = (calls: PluginCalls) => Wr.usePlugin({ ...send(user), callerType: CallerType.Admin, calls })

  const balance = async (address: string): Promise<bigint> => (await algorand.account.getInformation(address)).balance.microAlgos

  const allocationsFor = async (address: string, assetId = 0n): Promise<bigint> => {
    const prefix = Buffer.concat([Buffer.from('u'), Buffer.from(algosdk.decodeAddress(address).publicKey), Buffer.from(algosdk.encodeUint64(assetId))])
    let sum = 0n
    for (const box of await algorand.app.getBoxNames(universe.rewards.appId)) {
      const name = Buffer.from(box.nameRaw)
      if (name.length === prefix.length + 8 && name.subarray(0, prefix.length).equals(prefix)) {
        sum += algosdk.decodeUint64(await algorand.app.getBoxValue(universe.rewards.appId, box.nameRaw), 'bigint')
      }
    }
    return sum
  }

  /** Create an app from a vendored deployed program and call its `create(uint64,string)void`. */
  const deployDeployedPlugin = async (id: string): Promise<bigint> => {
    const app = programs.apps[id]
    const result = await algorand.send.appCreateMethodCall({
      ...send(deployer),
      method: algosdk.ABIMethod.fromSignature('create(uint64,string)void'),
      args: [universe.dao.appId, `mainnet-${id}`],
      approvalProgram: Buffer.from(app.approval, 'base64'),
      clearStateProgram: Buffer.from(app.clear, 'base64'),
      schema: {
        globalInts: app.globalSchema.numUint,
        globalByteSlices: app.globalSchema.numByteSlice,
        localInts: app.localSchema.numUint,
        localByteSlices: app.localSchema.numByteSlice,
      },
      extraProgramPages: app.extraProgramPages,
    })
    return result.appId
  }

  const newService = (gateId: bigint, title: string) => subscriptions.newService({
    sender: merchant.addr.toString(), signer: merchant.signer, interval: INTERVAL, asset: 0n, amount: AMOUNT, passes: 0n, gateId,
    payoutAddress: merchant.addr.toString(), title, description: title, bannerImage: EMPTY_CID, highlightMessage: 0, highlightColor: '#445566',
  })

  const lastSubscription = async () => (await subscriptions.getSubscriptionList({ address: addr(Wr) })) - 1n

  beforeAll(async () => {
    await fixture.newScope()
    algorand = fixture.context.algorand
    timeWarp = new TimeWarp(algorand)
    const dispenser = await algorand.account.dispenserFromEnvironment()

    deployer = await fixture.context.generateAccount({ initialFunds: (2_000).algo() })
    user = await fixture.context.generateAccount({ initialFunds: (1_000).algo() })
    merchant = await fixture.context.generateAccount({ initialFunds: (500).algo() })
    keeper = await fixture.context.generateAccount({ initialFunds: (5).algo() })
    R1 = await fixture.context.generateAccount({ initialFunds: (1).algo() })
    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (2_000).algo())

    universe = await buildAkitaUniverse({ fixture, sender: deployer.addr, signer: deployer.signer, apps: {} })
    subscriptions = universe.subscriptions

    gate = new GateSDK({
      algorand,
      factoryParams: { appId: universe.gate.appId, defaultSender: deployer.addr, defaultSigner: deployer.signer },
      gateRegistry: { asset: universe.subgates.assetGate.appId },
    })
    await algorand.send.payment({ ...send(deployer), receiver: universe.subgates.assetGate.client.appAddress, amount: microAlgo(200_000) })
    gateAlgo = (await gate.register({
      sender: deployer.addr.toString(),
      signer: deployer.signer,
      args: [{ type: 'asset', appId: universe.subgates.assetGate.appId, layer: 0n, logicalOperator: LogicalOperator.None, asset: 0n, op: Operator.GreaterThanOrEqualTo, value: GATE_MIN_BALANCE }],
    })).return!
    svcPlain = await newService(0n, 'compat-plain')
    svcAlgo = await newService(gateAlgo, 'compat-gated')

    const oldPluginId = await deployDeployedPlugin(MAY_2026_PLUGIN)
    oldPlugin = new SubscriptionsPluginSDK({ algorand, factoryParams: { appId: oldPluginId, defaultSender: user.addr, defaultSigner: user.signer } })
    for (const p of [oldPluginId, universe.subscriptionsPlugin.appId]) {
      await algorand.send.payment({ ...send(deployer), receiver: algosdk.getApplicationAddress(p), amount: microAlgo(10_000_000) })
    }

    Wr = await newWallet({
      algorand,
      factoryParams: { appId: universe.walletFactory.appId, defaultSender: user.addr, defaultSigner: user.signer },
      sender: user.addr,
      signer: user.signer,
      nickname: 'compat',
      referrer: R1.addr.toString(),
      // legacy shims pay the REGISTRY referrer (legacyWalletOf), so Wr must be in the EscrowFactory registry
      register: true,
    })
    const mbr = await Wr.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n })
    await Wr.client.appClient.fundAppAccount({ ...send(user), amount: microAlgo(mbr.plugins * 2n + 300_000_000n) })
    await Wr.addPlugin({ ...send(user), client: oldPlugin, callerType: CallerType.Admin })
    await Wr.addPlugin({ ...send(user), client: universe.subscriptionsPlugin, callerType: CallerType.Admin })
  })

  afterEach(async () => {
    await timeWarp.resetTimeWarp()
  })

  test('the deployed program was installed unchanged', async () => {
    const info = await algorand.client.algod.getApplicationByID(oldPlugin.appId).do()
    expect(Buffer.from(info.params!.approvalProgram).toString('base64')).toBe(programs.apps[MAY_2026_PLUGIN].approval)
  })

  test('newService through the legacy newServiceCost / newService shims pays the registry referrer', async () => {
    const before = await allocationsFor(R1.addr.toString())
    await use(oldPlugin.newServiceWithDescription({
      interval: INTERVAL, asset: 0n, amount: AMOUNT, passes: 0n, gate: 0n, payoutAddress: addr(Wr),
      title: 'old plugin service', description: 'legacy shim', bannerImage: EMPTY_CID, highlightMessage: 0, highlightColor: new Uint8Array([7, 8, 9]),
    }))
    const id = (await subscriptions.getServiceList({ address: addr(Wr) })) - 1n
    expect((await subscriptions.getService({ address: addr(Wr), id: Number(id) })).title).toBe('old plugin service')
    expect(await allocationsFor(R1.addr.toString())).toBeGreaterThan(before)
  })

  test('ungated subscribe through the legacy subscribe / newSubscriptionCost shims charges the quote exactly', async () => {
    await use([oldPlugin.subscribe({ recipient: merchant.addr.toString(), amount: AMOUNT, interval: INTERVAL, index: svcPlain })])
    const id = await lastSubscription()
    expect((await subscriptions.getSubscription({ address: addr(Wr), id })).escrowed).toBe(0n)
    expect(await subscriptions.getStoredPrincipal({ address: addr(Wr), id })).toBeUndefined()
  })

  describe('legacy gated subscription', () => {
    let id: bigint

    beforeAll(async () => {
      // the deployed plugin builds Gate.mustCheck(raw origin) and calls the legacy gatedSubscribe
      await use([oldPlugin.subscribe({ recipient: merchant.addr.toString(), amount: AMOUNT, interval: INTERVAL, index: svcAlgo, args: NO_ARGS })])
      id = await lastSubscription()
    })

    test('the legacy gatedSubscribe shim stores no principal pair', async () => {
      expect((await subscriptions.getSubscription({ address: addr(Wr), id })).gateId).toBe(gateAlgo)
      expect(await subscriptions.getStoredPrincipal({ address: addr(Wr), id })).toBeUndefined()
    })

    test('P2-SUB-01: gated triggerPayment through the deployed plugin (legacy gatedTriggerPayment shim, no errIseq)', async () => {
      await timeWarp.timeWarp(INTERVAL + 60n)
      await use([oldPlugin.fundTriggerPayment({ id })])
      await use([oldPlugin.triggerPayment({ address: addr(Wr), id, args: NO_ARGS })])
      expect((await subscriptions.getSubscription({ address: addr(Wr), id })).streak).toBe(2n)
    })

    test('P2-SUB-03 (c): a keeper on the hinted selector uses the registry derivation for a subscription with no pair', async () => {
      expect(await subscriptions.triggerGateCtx({ sender: keeper.addr.toString(), address: addr(Wr), id }))
        .toEqual({ principal: addr(Wr), wallet: Wr.client.appId, spender: addr(Wr) })
      await timeWarp.timeWarp(INTERVAL)
      await use([oldPlugin.fundTriggerPayment({ id })])
      await subscriptions.triggerPayment({
        sender: keeper.addr.toString(),
        signer: keeper.signer,
        address: addr(Wr),
        id,
        gateTxn: (ctx) => gate.build.mustCheckFor({ sender: keeper.addr.toString(), signer: keeper.signer, ctx, gateId: gateAlgo, args: [{ type: 'asset' }] }),
      })
    })

    test('Q13: adoptPrincipal copies the registry answer once (exact payment), and unsubscribe refunds it to the subscriber', async () => {
      // wrong amount
      const short = await algorand.createTransaction.payment({ ...send(keeper), receiver: subscriptions.client.appAddress, amount: microAlgo(SUBSCRIPTION_PRINCIPAL_MBR - 1n) })
      await expectContractError(subscriptions.client.send.adoptPrincipal({
        ...send(keeper), args: { payment: short, key: { address: addr(Wr), id } }, extraFee: microAlgo(5_000),
      }), 'errIpma')

      await subscriptions.adoptPrincipal({ sender: keeper.addr.toString(), signer: keeper.signer, address: addr(Wr), id })
      expect(await subscriptions.getStoredPrincipal({ address: addr(Wr), id })).toEqual({ wallet: Wr.client.appId, principal: addr(Wr) })
      await expectContractError(subscriptions.adoptPrincipal({ sender: keeper.addr.toString(), signer: keeper.signer, address: addr(Wr), id }), errPrincipalExists)

      // the keeper path now reads the stored pair (case 2): same subject, no registry
      expect(await subscriptions.triggerGateCtx({ sender: keeper.addr.toString(), address: addr(Wr), id }))
        .toEqual({ principal: addr(Wr), wallet: Wr.client.appId, spender: addr(Wr) })

      // the deployed plugin keeps working on an adopted subscription (legacy shim ignores the pair)
      await timeWarp.timeWarp(INTERVAL)
      await use([oldPlugin.fundTriggerPayment({ id })])
      await use([oldPlugin.triggerPayment({ address: addr(Wr), id, args: NO_ARGS })])

      // the new plugin unsubscribes: the box MBR and the stored pair's MBR go back to the subscriber
      const sub = await subscriptions.getSubscription({ address: addr(Wr), id })
      const before = await balance(addr(Wr))
      await use([universe.subscriptionsPlugin.unsubscribe({ id })])
      expect((await balance(addr(Wr))) - before).toBe(sub.escrowed + SUBSCRIPTIONS_MBR + SUBSCRIPTION_PRINCIPAL_MBR)
      expect(await subscriptions.getStoredPrincipal({ address: addr(Wr), id })).toBeUndefined()
    })
  })
})

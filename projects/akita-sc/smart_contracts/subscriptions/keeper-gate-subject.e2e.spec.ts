/**
 * Regression for audit 07 (Subscriptions), SUB-01: the gate of a renewal is checked for the subscriber,
 * whoever the keeper is.
 *
 * A subscription made through the pre-hint selectors has no stored principal pair, so its gate subject
 * comes from the registry wallet of the subscriber. That derivation used to accept the wallet's declared
 * `controlled_address` whenever it was the transaction sender. On a trigger the sender is the keeper, and
 * a wallet's admin can make a genuine wallet name any account, so a subscriber who no longer passed the
 * gate could name a keeper who did and be renewed on the keeper's eligibility. The derivation now counts a
 * declared address only when the wallet owns it at rest (`legacyOriginAtRestOr`).
 *
 * Steps
 *   1. A registered wallet W subscribes to a gated service while it passes the gate (it holds 50 ALGO),
 *      through the deployed May 2026 plugin: no pair is stored.
 *   2. W stops passing the gate. A keeper that passes the gate itself cannot renew it.
 *   3. W's admin installs a forged program in W that names that keeper as `controlled_address`.
 *      The subject stays W for every keeper, and no keeper can renew, on the hinted selector or the legacy one.
 *   4. `adoptPrincipal` pins the pair; nothing changes for either selector.
 */
import * as algokit from '@algorandfoundation/algokit-utils'
import { microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import type { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import { GateSDK, LogicalOperator, Operator } from 'akita-sdk/gates'
import { SubscriptionsSDK } from 'akita-sdk/subscriptions'
import { CallerType, newWallet, SubscriptionsPluginSDK, WalletSDK } from 'akita-sdk/wallet'
import algosdk from 'algosdk'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { afterEach, beforeAll, describe, expect, test } from 'vitest'
import { AkitaUniverse, buildAkitaUniverse } from '../../tests/fixtures/dao'
import { TimeWarp } from '../../tests/utils/time'
import { APP_SPEC as ForgedWalletSpec, MockForgedWalletClient } from '../artifacts/mocks/forged-wallet/MockForgedWalletClient'
import { errFailedGate } from './errors'

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
const GATE_MIN_BALANCE = 50_000_000n
const NO_ARGS = [new Uint8Array()]
const MAY_2026_PLUGIN = '3569561107'

describe('SUB-01: a gated renewal is checked for the subscriber, never for the keeper', () => {
  let algorand: algokit.AlgorandClient
  let universe: AkitaUniverse
  let subscriptions: SubscriptionsSDK
  let gate: GateSDK
  let timeWarp: TimeWarp

  let deployer: TransactionSignerAccount
  /** admin of the subscribing wallet */
  let admin: TransactionSignerAccount
  let merchant: TransactionSignerAccount
  /** a keeper that passes the gate itself and is named by the forged wallet */
  let keeperNamed: TransactionSignerAccount
  /** a second keeper that passes the gate itself and is not named */
  let keeperOther: TransactionSignerAccount

  let oldPlugin: SubscriptionsPluginSDK
  let W: WalletSDK
  let gateAlgo: bigint
  let id: bigint

  const addr = (w: WalletSDK) => w.client.appAddress.toString()
  const send = (a: TransactionSignerAccount) => ({ sender: a.addr, signer: a.signer })
  type PluginCalls = Parameters<WalletSDK['usePlugin']>[0]['calls']
  const use = (calls: PluginCalls) => W.usePlugin({ ...send(admin), callerType: CallerType.Global, calls })
  const balance = async (address: string): Promise<bigint> => (await algorand.account.getInformation(address)).balance.microAlgos
  const sub = () => subscriptions.getSubscription({ address: addr(W), id })
  /** the subject every keeper must be told: the subscriber's wallet */
  const subscriberCtx = () => ({ principal: addr(W), wallet: W.client.appId, spender: addr(W) })

  /** What an SDK keeper does: ask the contract which context it will assert, and build the gate call from it. */
  const hintedTrigger = (keeper: TransactionSignerAccount) => subscriptions.triggerPayment({
    sender: keeper.addr.toString(),
    signer: keeper.signer,
    address: addr(W),
    id,
    gateTxn: (ctx) => gate.build.mustCheckFor({ sender: keeper.addr.toString(), signer: keeper.signer, ctx, gateId: gateAlgo, args: [{ type: 'asset' }] }),
  })
  /** The pre-hint selector, with a plain `Gate.mustCheck` for `subject`. */
  const legacyTrigger = async (keeper: TransactionSignerAccount, subject: string) => subscriptions.triggerPayment({
    sender: keeper.addr.toString(), signer: keeper.signer, address: addr(W), id, legacy: true,
    gateTxn: await gate.build.mustCheck({ sender: keeper.addr.toString(), signer: keeper.signer, caller: subject, gateId: gateAlgo, args: [{ type: 'asset' }] }),
  })
  /** No route renews the subscription while the subscriber fails the gate, whichever keeper sends it. */
  const expectNoRenewal = async () => {
    const before = await sub()
    for (const keeper of [keeperNamed, keeperOther]) {
      const k = keeper.addr.toString()
      expect(await subscriptions.triggerGateCtx({ sender: k, address: addr(W), id })).toEqual(subscriberCtx())
      // the gate is evaluated on the subscriber, who does not pass it
      await expect(hintedTrigger(keeper)).rejects.toThrow()
      await expect(legacyTrigger(keeper, addr(W))).rejects.toThrow()
      // a gate check that passed for the keeper itself is not the subscriber's gate check
      await expect(legacyTrigger(keeper, k)).rejects.toThrow(new RegExp(errFailedGate))
    }
    expect((await sub()).lastPayment).toBe(before.lastPayment)
    expect((await sub()).escrowed).toBe(before.escrowed)
  }

  beforeAll(async () => {
    await fixture.newScope()
    algorand = fixture.context.algorand
    timeWarp = new TimeWarp(algorand)
    const dispenser = await algorand.account.dispenserFromEnvironment()

    deployer = await fixture.context.generateAccount({ initialFunds: (2_000).algo() })
    admin = await fixture.context.generateAccount({ initialFunds: (1_000).algo() })
    merchant = await fixture.context.generateAccount({ initialFunds: (500).algo() })
    keeperNamed = await fixture.context.generateAccount({ initialFunds: (200).algo() })
    keeperOther = await fixture.context.generateAccount({ initialFunds: (200).algo() })
    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (2_000).algo())

    universe = await buildAkitaUniverse({ fixture, sender: deployer.addr, signer: deployer.signer, apps: {} })
    subscriptions = universe.subscriptions

    gate = new GateSDK({
      algorand,
      factoryParams: { appId: universe.gate.appId, defaultSender: deployer.addr, defaultSigner: deployer.signer },
      gateRegistry: { asset: universe.subgates.assetGate.appId },
    })
    await algorand.send.payment({ ...send(deployer), receiver: universe.subgates.assetGate.client.appAddress, amount: microAlgo(200_000) })
    // the service's gate: the subject must hold at least 50 ALGO
    gateAlgo = (await gate.register({
      sender: deployer.addr.toString(),
      signer: deployer.signer,
      args: [{ type: 'asset', appId: universe.subgates.assetGate.appId, layer: 0n, logicalOperator: LogicalOperator.None, asset: 0n, op: Operator.GreaterThanOrEqualTo, value: GATE_MIN_BALANCE }],
    })).return!

    const service = await subscriptions.newService({
      sender: merchant.addr.toString(), signer: merchant.signer, interval: INTERVAL, asset: 0n, amount: AMOUNT, passes: 0n, gateId: gateAlgo,
      payoutAddress: merchant.addr.toString(), title: 'gated', description: 'gated', bannerImage: EMPTY_CID, highlightMessage: 0, highlightColor: '#445566',
    })

    // the plugin live on MainNet (pre-hint selectors), installed from its deployed bytes, and the new plugin
    const app = programs.apps[MAY_2026_PLUGIN]
    const created = await algorand.send.appCreateMethodCall({
      ...send(deployer),
      method: algosdk.ABIMethod.fromSignature('create(uint64,string)void'),
      args: [universe.dao.appId, `mainnet-${MAY_2026_PLUGIN}`],
      approvalProgram: Buffer.from(app.approval, 'base64'),
      clearStateProgram: Buffer.from(app.clear, 'base64'),
      schema: { globalInts: app.globalSchema.numUint, globalByteSlices: app.globalSchema.numByteSlice, localInts: 0, localByteSlices: 0 },
      extraProgramPages: app.extraProgramPages,
    })
    oldPlugin = new SubscriptionsPluginSDK({ algorand, factoryParams: { appId: created.appId, defaultSender: admin.addr, defaultSigner: admin.signer } })
    for (const p of [created.appId, universe.subscriptionsPlugin.appId]) {
      await algorand.send.payment({ ...send(deployer), receiver: algosdk.getApplicationAddress(p), amount: microAlgo(10_000_000) })
    }

    // the subscribing wallet, registered in the EscrowFactory as live MainNet wallets are
    W = await newWallet({
      algorand,
      factoryParams: { appId: universe.walletFactory.appId, defaultSender: admin.addr, defaultSigner: admin.signer },
      sender: admin.addr,
      signer: admin.signer,
      nickname: 'sub-01',
      register: true,
    })
    const mbr = await W.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n })
    await W.client.appClient.fundAppAccount({ ...send(admin), amount: microAlgo(mbr.plugins * 2n + 100_000_000n) })
    await W.addPlugin({ ...send(admin), client: oldPlugin, callerType: CallerType.Global })
    await W.addPlugin({ ...send(admin), client: universe.subscriptionsPlugin, callerType: CallerType.Global })

    // 1. W subscribes while it passes the gate, through the pre-hint selector: no pair is stored
    expect(await balance(addr(W))).toBeGreaterThanOrEqual(GATE_MIN_BALANCE)
    await use([oldPlugin.subscribe({ recipient: merchant.addr.toString(), amount: AMOUNT, interval: INTERVAL, index: service, args: NO_ARGS })])
    id = (await subscriptions.getSubscriptionList({ address: addr(W) })) - 1n
    expect((await sub()).gateId).toBe(gateAlgo)
    expect(await subscriptions.getStoredPrincipal({ address: addr(W), id })).toBeUndefined()

    // 2. W moves its ALGO into its own subscription escrow: renewals are funded, and W now holds less than 50 ALGO
    const toEscrow = (await balance(addr(W))) - 20_000_000n
    await use([universe.subscriptionsPlugin.deposit({ asset: 0n, id, amount: toEscrow })])
    expect(await balance(addr(W))).toBeLessThan(GATE_MIN_BALANCE)
    for (const keeper of [keeperNamed, keeperOther]) {
      expect(await balance(keeper.addr.toString())).toBeGreaterThanOrEqual(GATE_MIN_BALANCE)
    }
  })

  afterEach(async () => {
    await timeWarp.resetTimeWarp()
  })

  test('a keeper that passes the gate itself cannot renew a subscriber that does not', async () => {
    await timeWarp.timeWarp(INTERVAL + 60n)
    await expectNoRenewal()
  })

  test('a wallet that names the keeper as its controlled address does not make the keeper the subject', async () => {
    // the admin installs arbitrary code in the genuine, registered wallet (it keeps its factory creator)
    await algorand.send.appUpdateMethodCall({
      ...send(admin),
      appId: W.appId,
      method: W.client.appClient.getABIMethod('update'),
      args: ['forged'],
      approvalProgram: Buffer.from(ForgedWalletSpec.byteCode!.approval, 'base64'),
      clearStateProgram: Buffer.from(ForgedWalletSpec.byteCode!.clear, 'base64'),
    })
    const forged = algorand.client.getTypedAppClientById(MockForgedWalletClient, { appId: W.appId, defaultSender: admin.addr, defaultSigner: admin.signer })
    await forged.send.setBytes({ args: { key: new TextEncoder().encode('controlled_address'), value: keeperNamed.addr.publicKey } })

    // W does not control the keeper in any way
    expect((await algorand.account.getInformation(keeperNamed.addr)).authAddr).toBeUndefined()
    expect(await balance(addr(W))).toBeLessThan(GATE_MIN_BALANCE)

    await timeWarp.timeWarp(INTERVAL + 60n)
    await expectNoRenewal()
  })

  test('pinning the pair changes nothing: both selectors still check the subscriber', async () => {
    // anyone may pin the pair; here the merchant does
    await subscriptions.adoptPrincipal({ sender: merchant.addr.toString(), signer: merchant.signer, address: addr(W), id })
    // the forged wallet names an account it does not own at rest, so the pair holds the subscriber itself
    expect(await subscriptions.getStoredPrincipal({ address: addr(W), id })).toEqual({ wallet: W.client.appId, principal: addr(W) })

    await timeWarp.timeWarp(INTERVAL + 60n)
    await expectNoRenewal()
  })
})

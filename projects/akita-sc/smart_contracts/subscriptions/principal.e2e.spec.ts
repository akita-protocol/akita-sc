/**
 * Principal resolution, Phase 2: Subscriptions + the new Subscriptions plugin version
 * (docs/principal-resolution/PHASE-0-SPEC.md §6.4, §6.11, §7.2, §7.5; Q11, Q13).
 *
 * - Hinted methods take the caller's wallet hint last (`principalOf`, strict). The referral cut goes to the
 *   verified wallet's referrer, so wallets that were never registered in the EscrowFactory earn their
 *   referrer a cut. Gated subscribes assert `Gate.mustCheckFor(gateCtx(p))` (`gateCheckCtx`).
 * - A gated subscription made through a verified wallet stores the pair `(W, principal)` in box 'i'
 *   (34,900 µA, quoted by `newSubscriptionCost(..., wallet)`, refunded by `unsubscribe`) — P2-SUB-02.
 * - Hinted `gatedTriggerPayment(gateTxn, key, wallet)`: `wallet` is the CALLER's own hint; the subject is
 *   always the subscriber (SG-05) — P2-SUB-03 (a) keeper, (b) the subscriber's own wallet from its window,
 *   (c) legacy subscription (registry), plus a forged-wallet subscriber that cannot make keeper triggers panic.
 * - `adoptPrincipal` (Q13) backfills 'i' for legacy gated subscriptions from the registry.
 * - P2-SUB-04: the stored pair keyed by an account other than its principal (escrow-window subscribers,
 *   named and arbitrary-address; external-C subscribers): `atRestPrincipal`'s `stored != account` branch,
 *   `ownsAtRest(W, E)` for an escrow, case (1) with `key.address != p.spender`, plugin-side vs target-side
 *   ctx equality in an escrow window, and the at-rest degradation once the wallet no longer owns the account.
 *
 * The deployed-bytecode checks (May 2026 plugin against the upgraded singleton, P2-SUB-01) are in
 * `compat.e2e.spec.ts`; the static selector checks are in `principal-shims.test.ts`.
 */
import * as algokit from '@algorandfoundation/algokit-utils'
import { microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import type { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import { GateSDK, LogicalOperator, Operator } from 'akita-sdk/gates'
import { directGateCtx, SUBSCRIPTION_PRINCIPAL_MBR, SubscriptionsSDK } from 'akita-sdk/subscriptions'
import { CallerType, WalletSDK } from 'akita-sdk/wallet'
import algosdk, { Address } from 'algosdk'
import { afterEach, beforeAll, describe, expect, test } from 'vitest'
import { AkitaUniverse, buildAkitaUniverse } from '../../tests/fixtures/dao'
import { addRawEscrow, addRawPlugin, assertUnregistered, newUnregisteredWallet, rekeyToWallet } from '../../tests/fixtures/unregistered-wallet'
import { expectContractError } from '../../tests/utils/errors'
import { TimeWarp } from '../../tests/utils/time'
import { APP_SPEC as ForgedWalletSpec, MockForgedWalletClient } from '../artifacts/mocks/forged-wallet/MockForgedWalletClient'
import { errHintTopLevel } from '../utils/errors'
import {
  errCannotTrigger,
  errFailedGate,
  errInvalidSequence,
  errNoLegacyWallet,
  errNotGated,
  errPrincipalExists,
  errSubscriptionDoesNotExist,
} from './errors'

algokit.Config.configure({ populateAppCallResources: true })

const fixture = algorandFixture()
const EMPTY_CID = new Uint8Array(36).fill(120)
/** long interval so LocalNet block-time drift cannot skip a window */
const INTERVAL = 3_600n
const AMOUNT = 100_000n
const SUBSCRIPTIONS_MBR = 60_500n
/** ALGO-balance gate threshold: wallets/subscribers hold more, keepers less */
const GATE_MIN_BALANCE = 50_000_000n
const REFERRER_ARGS = [algosdk.encodeUint64(0)]
const NO_ARGS = [new Uint8Array()]

describe('Subscriptions principal resolution (§6.4)', () => {
  let algorand: algokit.AlgorandClient
  let universe: AkitaUniverse
  let subscriptions: SubscriptionsSDK
  let gate: GateSDK
  let timeWarp: TimeWarp

  let deployer: TransactionSignerAccount
  let admin: TransactionSignerAccount
  let merchant: TransactionSignerAccount
  let keeper: TransactionSignerAccount
  /** referrer of the R1 wallets (an EOA: referrers need not be Akita wallets) */
  let R1: TransactionSignerAccount
  let R2: TransactionSignerAccount

  /** ALGO balance >= GATE_MIN_BALANCE (plain sub-gate: evaluated on ctx.principal) */
  let gateAlgo: bigint
  /** AkitaReferrerGate(R1) (context-aware: needs ctx.wallet with referrer R1) */
  let gateRef: bigint
  let svcPlain: bigint
  let svcAlgo: bigint
  let svcRef: bigint

  const addr = (w: WalletSDK) => w.client.appAddress.toString()
  const send = (a: TransactionSignerAccount) => ({ sender: a.addr, signer: a.signer })
  const plugin = () => universe.subscriptionsPlugin

  const freeBalance = async (address: string | Address): Promise<bigint> => {
    const info = await algorand.account.getInformation(address)
    return info.balance.microAlgos - info.minBalance.microAlgos
  }

  const balance = async (address: string | Address): Promise<bigint> =>
    (await algorand.account.getInformation(address)).balance.microAlgos

  /** Sum of the Rewards allocations held for `address` (where a referral cut lands). */
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

  const newService = async (gateId: bigint, title: string, asset = 0n): Promise<bigint> => subscriptions.newService({
    sender: merchant.addr.toString(),
    signer: merchant.signer,
    interval: INTERVAL,
    asset,
    amount: AMOUNT,
    passes: 0n,
    gateId,
    payoutAddress: merchant.addr.toString(),
    title,
    description: title,
    bannerImage: EMPTY_CID,
    highlightMessage: 0,
    highlightColor: '#112233',
  })

  /** A genuine wallet NEVER registered in the EscrowFactory, with the new subscriptions plugin (default grant). */
  const pluginWallet = async (referrer: TransactionSignerAccount = R1, fund = 150n): Promise<WalletSDK> => {
    const w = await newUnregisteredWallet({
      walletFactory: universe.walletFactory, ...send(admin), referrer: referrer.addr.toString(), nickname: 'subs-principal', fund: (Number(fund)).algo(),
    })
    // a default grant: the SDK registers nothing (it only registers NEW escrows), so the wallet stays unregistered
    await w.addPlugin({ ...send(admin), client: plugin(), callerType: CallerType.Admin })
    return w
  }

  type PluginCalls = Parameters<WalletSDK['usePlugin']>[0]['calls']
  const use = (w: WalletSDK, calls: PluginCalls) => w.usePlugin({ ...send(admin), callerType: CallerType.Admin, calls })

  /** Subscribe `w.address` through the NEW plugin (hint = windowHint(wallet)); returns the subscription id. */
  const pluginSubscribe = async (w: WalletSDK, serviceId: bigint, args: Uint8Array[] = [], asset = 0n): Promise<bigint> => {
    await use(w, [plugin().subscribe({ recipient: merchant.addr.toString(), asset, amount: AMOUNT, interval: INTERVAL, index: serviceId, args })])
    return (await subscriptions.getSubscriptionList({ address: addr(w) })) - 1n
  }

  const pluginDeposit = (w: WalletSDK, id: bigint, amount: bigint) => use(w, [plugin().deposit({ asset: 0n, id, amount })])

  /** A gated trigger through the NEW plugin from `w`'s window (hint = w). */
  const pluginTrigger = (w: WalletSDK, address: string, id: bigint, args: Uint8Array[]) =>
    use(w, [plugin().triggerPayment({ address, id, args })])

  /** A keeper EOA (hint 0) triggers with the context the contract asserts (`triggerGateCtx`). */
  const keeperTrigger = (address: string, id: bigint, gateId: bigint, filter: 'asset' | 'akita_referrer') =>
    subscriptions.triggerPayment({
      sender: keeper.addr.toString(),
      signer: keeper.signer,
      address,
      id,
      gateTxn: (ctx) => gate.build.mustCheckFor({
        sender: keeper.addr.toString(),
        signer: keeper.signer,
        ctx,
        gateId,
        args: [filter === 'asset' ? { type: 'asset' } : { type: 'akita_referrer', wallet: 0n }],
      }),
    })

  const storedPrincipal = (address: string, id: bigint) => subscriptions.getStoredPrincipal({ address, id })

  beforeAll(async () => {
    await fixture.newScope()
    algorand = fixture.context.algorand
    timeWarp = new TimeWarp(algorand)
    const dispenser = await algorand.account.dispenserFromEnvironment()

    deployer = await fixture.context.generateAccount({ initialFunds: (2_000).algo() })
    admin = await fixture.context.generateAccount({ initialFunds: (5_000).algo() })
    merchant = await fixture.context.generateAccount({ initialFunds: (500).algo() })
    keeper = await fixture.context.generateAccount({ initialFunds: (5).algo() })
    R1 = await fixture.context.generateAccount({ initialFunds: (1).algo() })
    R2 = await fixture.context.generateAccount({ initialFunds: (1).algo() })
    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (2_000).algo())

    universe = await buildAkitaUniverse({ fixture, sender: deployer.addr, signer: deployer.signer, apps: {} })
    subscriptions = universe.subscriptions

    gate = new GateSDK({
      algorand,
      factoryParams: { appId: universe.gate.appId, defaultSender: deployer.addr, defaultSigner: deployer.signer },
      gateRegistry: { asset: universe.subgates.assetGate.appId, akita_referrer: universe.subgates.akitaReferrerGate.appId },
    })
    for (const subGate of [universe.subgates.assetGate.client.appAddress, universe.subgates.akitaReferrerGate.client.appAddress]) {
      await algorand.send.payment({ ...send(deployer), receiver: subGate, amount: microAlgo(200_000) })
    }
    gateAlgo = (await gate.register({
      sender: deployer.addr.toString(),
      signer: deployer.signer,
      args: [{ type: 'asset', appId: universe.subgates.assetGate.appId, layer: 0n, logicalOperator: LogicalOperator.None, asset: 0n, op: Operator.GreaterThanOrEqualTo, value: GATE_MIN_BALANCE }],
    })).return!
    gateRef = (await gate.register({
      sender: deployer.addr.toString(),
      signer: deployer.signer,
      args: [{ type: 'akita_referrer', appId: universe.subgates.akitaReferrerGate.appId, layer: 0n, logicalOperator: LogicalOperator.None, referrer: R1.addr.toString() }],
    })).return!

    svcPlain = await newService(0n, 'plain')
    svcAlgo = await newService(gateAlgo, 'algo-gated')
    svcRef = await newService(gateRef, 'referrer-gated')

    await algorand.send.payment({ ...send(deployer), receiver: plugin().client.appAddress, amount: microAlgo(10_000_000) })
  })

  afterEach(async () => {
    await timeWarp.resetTimeWarp()
  })

  describe('P2-ABI-01: both selectors of every overloaded name are callable', () => {
    test('legacy and hinted cost quotes agree for a plain caller (no wallet, no registry entry)', async () => {
      const sender = deployer.addr.toString()
      // the legacy selector keeps the deployed registry read (one inner EscrowFactory.get), so the simulated
      // call must carry that inner fee; the hinted selector makes no inner call
      const legacyService = await subscriptions.client.newServiceCostUint64Uint64({ sender, args: { asset: 0n }, extraFee: microAlgo(1_000) })
      const hintedService = await subscriptions.client.newServiceCostUint64Uint64Uint64({ sender, args: { asset: 0n, wallet: 0n } })
      expect(hintedService).toBe(legacyService)

      for (const serviceId of [0n, svcPlain, svcAlgo]) {
        const legacy = await subscriptions.newSubscriptionCost({ sender, recipient: merchant.addr.toString(), serviceId, legacy: true })
        const hinted = await subscriptions.newSubscriptionCost({ sender, recipient: merchant.addr.toString(), serviceId })
        expect(hinted).toBe(legacy)
      }
    })

    test('the SDK wrappers send the hinted selector; a top-level non-zero hint is refused (errHtop)', async () => {
      const w = await pluginWallet()
      // the SDK refuses it locally ...
      await expect(subscriptions.subscribe({
        sender: deployer.addr.toString(), signer: deployer.signer, asset: 0n, amount: AMOUNT, interval: INTERVAL,
        recipient: merchant.addr.toString(), serviceId: svcPlain, wallet: w.client.appId,
      })).rejects.toThrow(/errHtop/)
      // ... and the contract refuses it on chain
      const payment = await algorand.createTransaction.payment({ ...send(deployer), receiver: subscriptions.client.appAddress, amount: microAlgo(AMOUNT + SUBSCRIPTIONS_MBR + 18_900n) })
      await expectContractError(subscriptions.client.send.subscribePayAddressUint64Uint64Uint64Uint64Uint64({
        ...send(deployer),
        args: { payment, recipient: merchant.addr.toString(), amount: AMOUNT, interval: INTERVAL, serviceId: svcPlain, wallet: w.client.appId },
        extraFee: microAlgo(5_000),
      }), errHintTopLevel)
    })
  })

  describe('direct (EOA) gated subscribes and triggers', () => {
    test('hinted gatedSubscribe needs Gate.mustCheckFor(sender, 0, sender); a plain mustCheck txn no longer satisfies it', async () => {
      const subscriber = await fixture.context.generateAccount({ initialFunds: (100).algo() })
      const sender = subscriber.addr.toString()
      const base = { sender, signer: subscriber.signer, asset: 0n, amount: AMOUNT, interval: INTERVAL, recipient: merchant.addr.toString(), serviceId: svcAlgo, initialDepositAmount: AMOUNT }

      await expectContractError(subscriptions.subscribe({
        ...base,
        gateTxn: await gate.build.mustCheck({ sender, signer: subscriber.signer, caller: sender, gateId: gateAlgo, args: [{ type: 'asset' }] }),
      }), errFailedGate)

      // the context of a different account is rejected by gateCheckCtx
      await expectContractError(subscriptions.subscribe({
        ...base,
        gateTxn: (ctx) => gate.build.mustCheckFor({ sender, signer: subscriber.signer, ctx: { ...ctx, principal: keeper.addr.toString() }, gateId: gateAlgo, args: [{ type: 'asset' }] }),
      }), errFailedGate)

      const id = await subscriptions.subscribe({
        ...base,
        gateTxn: (ctx) => {
          expect(ctx).toEqual(directGateCtx(sender))
          return gate.build.mustCheckFor({ sender, signer: subscriber.signer, ctx, gateId: gateAlgo, args: [{ type: 'asset' }] })
        },
      })
      // a plain caller (wallet 0) stores no principal pair
      expect(await storedPrincipal(sender, id)).toBeUndefined()
    })

    test('SG-05 (hinted): a keeper triggers with the SUBSCRIBER as subject; its own context fails; an ineligible subscriber stops paying', async () => {
      const subscriber = await fixture.context.generateAccount({ initialFunds: (100).algo() })
      const sender = subscriber.addr.toString()
      const id = await subscriptions.subscribe({
        sender, signer: subscriber.signer, asset: 0n, amount: AMOUNT, interval: INTERVAL, recipient: merchant.addr.toString(),
        serviceId: svcAlgo, initialDepositAmount: AMOUNT * 3n,
        gateTxn: (ctx) => gate.build.mustCheckFor({ sender, signer: subscriber.signer, ctx, gateId: gateAlgo, args: [{ type: 'asset' }] }),
      })

      // legacy subscription path (3): no pair, the registry has no wallet for an EOA
      expect(await subscriptions.triggerGateCtx({ sender: keeper.addr.toString(), address: sender, id })).toEqual(directGateCtx(sender))

      await timeWarp.timeWarp(INTERVAL + 60n)
      // the keeper's own context is not what the target asserts
      await expectContractError(subscriptions.triggerPayment({
        sender: keeper.addr.toString(), signer: keeper.signer, address: sender, id,
        gateTxn: await gate.build.mustCheckFor({ sender: keeper.addr.toString(), signer: keeper.signer, ctx: directGateCtx(keeper.addr.toString()), gateId: gateAlgo, args: [{ type: 'asset' }] }),
      }), errFailedGate)
      // an ungated trigger of a gated subscription is refused
      await expectContractError(subscriptions.triggerPayment({ sender: keeper.addr.toString(), signer: keeper.signer, address: sender, id }), errInvalidSequence)

      await keeperTrigger(sender, id, gateAlgo, 'asset')
      expect((await subscriptions.getSubscription({ address: sender, id })).streak).toBe(2n)

      // the subscriber drops below the gate threshold
      await algorand.send.payment({ ...send(subscriber), receiver: deployer.addr, amount: microAlgo((await freeBalance(sender)) - 1_000_000n) })
      await timeWarp.timeWarp(INTERVAL)
      await expectContractError(keeperTrigger(sender, id, gateAlgo, 'asset'), errFailedGate)
    })
  })

  describe('new plugin version: referral to the verified wallet\'s referrer (no registry)', () => {
    test('an unregistered wallet\'s service creation pays its referrer; the quote matches the charge exactly', async () => {
      const w = await pluginWallet(R2, 300n)
      const before = await allocationsFor(R2.addr.toString())

      const quotePlain = await subscriptions.newServiceCost({ sender: deployer.addr.toString(), asset: 0n })
      const quoteHinted = await subscriptions.newServiceCost({ sender: deployer.addr.toString(), asset: 0n, wallet: w.client.appId })
      expect(quoteHinted).toBeGreaterThan(quotePlain) // + one instant-disbursement MBR

      await use(w, plugin().newServiceWithDescription({
        interval: INTERVAL, asset: 0n, amount: AMOUNT, passes: 0n, gate: 0n, payoutAddress: addr(w),
        title: 'wallet service', description: 'referred', bannerImage: EMPTY_CID, highlightMessage: 0, highlightColor: new Uint8Array([1, 2, 3]),
      }))

      expect(await allocationsFor(R2.addr.toString())).toBeGreaterThan(before)
      await assertUnregistered(universe.escrowFactory, [addr(w)])
    })

    test('an unregistered wallet\'s subscription pays its referrer', async () => {
      const w = await pluginWallet(R2)
      const before = await allocationsFor(R2.addr.toString())
      const id = await pluginSubscribe(w, svcPlain)
      expect((await subscriptions.getSubscription({ address: addr(w), id })).escrowed).toBe(0n)
      expect(await allocationsFor(R2.addr.toString())).toBeGreaterThan(before)
      // ungated service: no stored pair
      expect(await storedPrincipal(addr(w), id)).toBeUndefined()
      await assertUnregistered(universe.escrowFactory, [addr(w)])
    })
  })

  describe('P2-SUB-02: stored pair charge and refund', () => {
    test('newSubscriptionCost adds exactly SUBSCRIPTION_PRINCIPAL_MBR for a wallet on a gated service', async () => {
      const w = await pluginWallet()
      const quote = (serviceId: bigint, wallet: bigint) => subscriptions.newSubscriptionCost({ sender: addr(w), recipient: merchant.addr.toString(), serviceId, wallet })
      expect((await quote(svcRef, w.client.appId)) - (await quote(svcPlain, w.client.appId))).toBe(SUBSCRIPTION_PRINCIPAL_MBR)
      expect((await quote(svcRef, 0n)) - (await quote(svcPlain, 0n))).toBe(0n)
      expect(SUBSCRIPTION_PRINCIPAL_MBR).toBe(34_900n)
    })

    test('gated subscribe through the plugin stores (W, W.address), charges the quote exactly and unsubscribe refunds it', async () => {
      const w = await pluginWallet()
      const id = await pluginSubscribe(w, svcRef, REFERRER_ARGS)

      // the plugin paid amount + quote: an exact charge leaves nothing escrowed
      expect((await subscriptions.getSubscription({ address: addr(w), id })).escrowed).toBe(0n)
      expect(await storedPrincipal(addr(w), id)).toEqual({ wallet: w.client.appId, principal: addr(w) })

      const before = await balance(addr(w))
      await use(w, [plugin().unsubscribe({ id })])
      expect((await balance(addr(w))) - before).toBe(SUBSCRIPTIONS_MBR + SUBSCRIPTION_PRINCIPAL_MBR)
      expect(await storedPrincipal(addr(w), id)).toBeUndefined()
      await assertUnregistered(universe.escrowFactory, [addr(w)])
    })

    test('gated ASA subscribe (exact MBR payment path) stores the pair too', async () => {
      const akta = universe.aktaAssetId
      if (!(await subscriptions.isOptedInToAsset(akta))) {
        await subscriptions.optIn({ sender: deployer.addr.toString(), signer: deployer.signer, asset: akta })
      }
      const svcAsa = await newService(gateRef, 'asa-referrer-gated', akta)
      // the payout is an asset transfer to the merchant, which must hold the asset (contract semantics unchanged)
      await algorand.send.assetOptIn({ ...send(merchant), assetId: akta })

      const w = await pluginWallet()
      await w.addPlugin({ ...send(admin), client: universe.optInPlugin, callerType: CallerType.Global })
      await use(w, [universe.optInPlugin.optIn({ assets: [akta] })])
      await algorand.send.assetTransfer({ ...send(deployer), receiver: addr(w), assetId: akta, amount: AMOUNT * 2n })

      const id = await pluginSubscribe(w, svcAsa, REFERRER_ARGS, akta)
      const sub = await subscriptions.getSubscription({ address: addr(w), id })
      expect(sub.asset).toBe(akta)
      expect(await storedPrincipal(addr(w), id)).toEqual({ wallet: w.client.appId, principal: addr(w) })
    })

    test('a wallet whose referrer does not match cannot subscribe to the referrer-gated service', async () => {
      const w = await pluginWallet(R2)
      await expectContractError(pluginSubscribe(w, svcRef, REFERRER_ARGS), errFailedGate)
    })
  })

  describe('P2-SUB-03: gated trigger subjects', () => {
    let W: WalletSDK
    let id: bigint

    beforeAll(async () => {
      W = await pluginWallet()
      id = await pluginSubscribe(W, svcRef, REFERRER_ARGS)
      await pluginDeposit(W, id, AMOUNT * 5n)
    })

    test('(a) a third-party keeper (hint 0): subject = the stored pair re-checked at rest', async () => {
      expect(await subscriptions.triggerGateCtx({ sender: keeper.addr.toString(), address: addr(W), id }))
        .toEqual({ principal: addr(W), wallet: W.client.appId, spender: addr(W) })
      await timeWarp.timeWarp(INTERVAL + 60n)
      await keeperTrigger(addr(W), id, gateRef, 'akita_referrer')
      expect((await subscriptions.getSubscription({ address: addr(W), id })).streak).toBe(2n)
    })

    test('(b) the subscriber\'s own wallet from its default window (hint = W): its live context passes the context-aware gate', async () => {
      // inside W's default window W.address is rekeyed to the plugin, so W does not own it at rest (E23):
      // only case (1) of triggerCtx (the caller is the stored wallet) keeps ctx.wallet = W
      const before = (await subscriptions.getSubscription({ address: addr(W), id })).lastPayment
      await timeWarp.timeWarp(INTERVAL)
      await pluginTrigger(W, addr(W), id, REFERRER_ARGS)
      expect((await subscriptions.getSubscription({ address: addr(W), id })).lastPayment).toBeGreaterThan(before)
    })

    test('another wallet as keeper (its own hint, referrer R2) triggers for the subscriber, never for itself', async () => {
      const K = await pluginWallet(R2)
      await timeWarp.timeWarp(INTERVAL)
      // the subject is W's stored pair (referrer R1), not K (referrer R2)
      await pluginTrigger(K, addr(W), id, REFERRER_ARGS)
      await expectContractError(pluginTrigger(K, addr(W), id, REFERRER_ARGS), errCannotTrigger) // same window
    })

    test('(c) a keeper on a subscription with no stored pair uses the registry derivation', async () => {
      const subscriber = await fixture.context.generateAccount({ initialFunds: (100).algo() })
      const sender = subscriber.addr.toString()
      const legacyId = await subscriptions.subscribe({
        sender, signer: subscriber.signer, asset: 0n, amount: AMOUNT, interval: INTERVAL, recipient: merchant.addr.toString(),
        serviceId: svcAlgo, initialDepositAmount: AMOUNT * 2n, legacy: true,
        gateTxn: await gate.build.mustCheck({ sender, signer: subscriber.signer, caller: sender, gateId: gateAlgo, args: [{ type: 'asset' }] }),
      })
      expect(await storedPrincipal(sender, legacyId)).toBeUndefined()
      expect(await subscriptions.triggerGateCtx({ address: sender, id: legacyId })).toEqual(directGateCtx(sender))
      await timeWarp.timeWarp(INTERVAL + 60n)
      await keeperTrigger(sender, legacyId, gateAlgo, 'asset')
    })

    test('a forged-wallet subscriber that sets uint64 globals cannot make the keeper trigger panic', async () => {
      const forger = admin
      const Wf = await pluginWallet()
      const fid = await pluginSubscribe(Wf, svcAlgo, NO_ARGS)
      await pluginDeposit(Wf, fid, AMOUNT * 2n)
      expect(await storedPrincipal(addr(Wf), fid)).toEqual({ wallet: Wf.client.appId, principal: addr(Wf) })

      // the admin installs arbitrary code into the genuine wallet and type-confuses every global
      await algorand.send.appUpdateMethodCall({
        ...send(forger),
        appId: Wf.appId,
        method: Wf.client.appClient.getABIMethod('update'),
        args: ['forged'],
        approvalProgram: Buffer.from(ForgedWalletSpec.byteCode!.approval, 'base64'),
        clearStateProgram: Buffer.from(ForgedWalletSpec.byteCode!.clear, 'base64'),
      })
      const forged = algorand.client.getTypedAppClientById(MockForgedWalletClient, { appId: Wf.appId, defaultSender: forger.addr, defaultSigner: forger.signer })
      for (const key of ['controlled_address', 'referrer', 'spending_address']) {
        await forged.send.setUint({ args: { key: new TextEncoder().encode(key), value: 7n } })
      }

      // no wallet-global read: the pair (Wf, Wf.address) re-checked with AppCreator / AuthAddr only
      expect(await subscriptions.triggerGateCtx({ sender: keeper.addr.toString(), address: addr(Wf), id: fid }))
        .toEqual({ principal: addr(Wf), wallet: Wf.client.appId, spender: addr(Wf) })
      await timeWarp.timeWarp(INTERVAL + 60n)
      await keeperTrigger(addr(Wf), fid, gateAlgo, 'asset')
      expect((await subscriptions.getSubscription({ address: addr(Wf), id: fid })).streak).toBe(2n)
    })
  })

  describe('P2-SUB-04: escrow and external-C subscribers (stored pair keyed by an account other than its principal)', () => {
    /** default grant + escrow grants 'e' (named, EscrowFactory app) and 'x' (arbitrary address Ax rekeyed to W) */
    let W: WalletSDK
    /** W's named escrow 'e' and arbitrary-address escrow 'x' (both hold < GATE_MIN_BALANCE; W.address holds more) */
    let E: string
    let Ax: string
    const escrows = () => [{ name: 'e', S: E }, { name: 'x', S: Ax }]

    /**
     * per escrow: referrer-gated subscription id, the quotes (same hint W on the gated and on the ungated
     * service) and the measured charge of the subscribe
     */
    const ref: Record<string, { id: bigint; quoteHinted: bigint; quoteUngated: bigint; charged: bigint; escrowedAtSubscribe: bigint }> = {}
    /** E's subscription to the ALGO-balance-gated service (plain sub-gate: subject = ctx.principal) */
    let algoId: bigint

    const useIn = (w: WalletSDK, escrow: string, calls: PluginCalls) =>
      w.usePlugin({ ...send(admin), callerType: CallerType.Admin, escrow, calls })

    /** Subscribe the escrow `S` through the NEW plugin from `w`'s escrow window (hint = windowHint(w)). */
    const escrowSubscribe = async (w: WalletSDK, escrow: string, S: string, serviceId: bigint, args: Uint8Array[]): Promise<bigint> => {
      await useIn(w, escrow, [plugin().subscribe({ recipient: merchant.addr.toString(), asset: 0n, amount: AMOUNT, interval: INTERVAL, index: serviceId, args })])
      return (await subscriptions.getSubscriptionList({ address: S })) - 1n
    }

    const escrowAddress = async (w: WalletSDK, name: string) => (await w.client.state.box.escrows.value(name))!.address

    beforeAll(async () => {
      W = await pluginWallet()
      // named escrow 'e' (created by the grant; LocalNet: the SDK does not register it)
      await W.addPlugin({ ...send(admin), client: plugin(), callerType: CallerType.Admin, escrow: 'e' })
      E = await escrowAddress(W, 'e')
      await algorand.send.payment({ ...send(deployer), receiver: E, amount: (5).algo() })
      // arbitrary-address escrow 'x' (E5): an EOA rekeyed to W.address, recorded raw (never registered)
      const x = await fixture.context.generateAccount({ initialFunds: (5).algo() })
      Ax = x.addr.toString()
      await rekeyToWallet(algorand, W, send(x))
      await addRawEscrow(W, 'x', { ...send(admin), address: Ax })
      await addRawPlugin(W, { plugin: plugin().appId, ownerOnly: true, escrow: 'x' }, send(admin))
      await W.getEscrows()

      for (const { name, S } of escrows()) {
        const quote = (serviceId: bigint) => subscriptions.newSubscriptionCost({ sender: S, recipient: merchant.addr.toString(), serviceId, wallet: W.client.appId })
        // same hint on both services, so the referral term (W's referrer R1) cancels and only the pair MBR remains
        const quoteHinted = await quote(svcRef)
        const quoteUngated = await quote(svcPlain)
        const before = await balance(S)
        const id = await escrowSubscribe(W, name, S, svcRef, REFERRER_ARGS)
        const charged = before - (await balance(S))
        // read before the deposit below, which escrows AMOUNT * 5 for the trigger tests
        const escrowedAtSubscribe = (await subscriptions.getSubscription({ address: S, id })).escrowed
        ref[name] = { id, quoteHinted, quoteUngated, charged, escrowedAtSubscribe }
        await useIn(W, name, [plugin().deposit({ asset: 0n, id, amount: AMOUNT * 5n })])
      }
      algoId = await escrowSubscribe(W, 'e', E, svcAlgo, NO_ARGS)
      await useIn(W, 'e', [plugin().deposit({ asset: 0n, id: algoId, amount: AMOUNT * 5n })])
    })

    test('escrow-window gated subscribe stores (W, W.address) keyed by the escrow and charges exactly amount + quote (+34,900)', async () => {
      for (const { name, S } of escrows()) {
        const r = ref[name]
        expect(r.quoteHinted - r.quoteUngated, name).toBe(SUBSCRIPTION_PRINCIPAL_MBR)
        // plugin paid amount + newSubscriptionCost(..., windowHint(W)) from the escrow; nothing escrowed, nothing else spent
        expect(r.charged, name).toBe(AMOUNT + r.quoteHinted)
        expect(r.escrowedAtSubscribe, name).toBe(0n)
        // the pair names the verified wallet and its principal (W.address), not the escrow that subscribed
        expect(await storedPrincipal(S, r.id), name).toEqual({ wallet: W.client.appId, principal: addr(W) })
      }
      // the gated subscribe itself proves the plugin-side ctx (pluginPrincipalOf, before the gate txn) equals the
      // target-side ctx (principalOf after the window's RekeyTo): gateCheckCtx compares them byte for byte
      expect(await storedPrincipal(E, algoId)).toEqual({ wallet: W.client.appId, principal: addr(W) })
      await assertUnregistered(universe.escrowFactory, [addr(W), E, Ax])
    })

    test('keeper (hint 0): triggerGateCtx = (W.address, W, escrow) and the payment passes the context-aware referrer gate', async () => {
      for (const { name, S } of escrows()) {
        // case (2): atRestPrincipal(S, W, W.address) takes the stored != account branch; ownsAtRest(W, S) via auth(S) == W.address
        expect(await subscriptions.triggerGateCtx({ sender: keeper.addr.toString(), address: S, id: ref[name].id }), name)
          .toEqual({ principal: addr(W), wallet: W.client.appId, spender: S })
      }
      await timeWarp.timeWarp(INTERVAL + 60n)
      for (const { name, S } of escrows()) {
        // ctx.wallet = W (referrer R1): a zeroed wallet for escrow subscribers would fail here (errFgte)
        await keeperTrigger(S, ref[name].id, gateRef, 'akita_referrer')
        expect((await subscriptions.getSubscription({ address: S, id: ref[name].id })).streak, name).toBe(2n)
      }
    })

    test('keeper on the ALGO-gated escrow subscription: the plain sub-gate sees ctx.principal = W.address, not the escrow', async () => {
      expect(await balance(E)).toBeLessThan(GATE_MIN_BALANCE)
      expect(await balance(addr(W))).toBeGreaterThanOrEqual(GATE_MIN_BALANCE)
      expect(await subscriptions.triggerGateCtx({ sender: keeper.addr.toString(), address: E, id: algoId }))
        .toEqual({ principal: addr(W), wallet: W.client.appId, spender: E })
      const before = (await subscriptions.getSubscription({ address: E, id: algoId })).lastPayment
      await timeWarp.timeWarp(INTERVAL + 60n)
      await keeperTrigger(E, algoId, gateAlgo, 'asset')
      // lastPayment, not streak: earlier tests' warps may have skipped a window of this subscription
      expect((await subscriptions.getSubscription({ address: E, id: algoId })).lastPayment).toBeGreaterThan(before)
    })

    test('case (1): W\'s DEFAULT window triggers the escrow\'s subscription (key.address = E != p.spender = W.address)', async () => {
      // Inside W's default window W.address is rekeyed to the plugin, so case (2) would give
      // atRestPrincipal(E, W, W.address) = E (auth(W.address) != 0), and E holds less than the gate threshold:
      // only case (1) (hint W == stored wallet → gateCtx(p) = (W.address, W, W.address)) passes the ALGO gate.
      const before = (await subscriptions.getSubscription({ address: E, id: algoId })).lastPayment
      await timeWarp.timeWarp(INTERVAL + 60n)
      await pluginTrigger(W, E, algoId, NO_ARGS)
      expect((await subscriptions.getSubscription({ address: E, id: algoId })).lastPayment).toBeGreaterThan(before)
      // ... and from the escrow window of the referrer-gated subscription (p.spender = E): case (1) as well
      const r = ref.e
      const beforeRef = (await subscriptions.getSubscription({ address: E, id: r.id })).lastPayment
      await useIn(W, 'e', [plugin().triggerPayment({ address: E, id: r.id, args: REFERRER_ARGS })])
      expect((await subscriptions.getSubscription({ address: E, id: r.id })).lastPayment).toBeGreaterThan(beforeRef)
    })

    test('external C: subscriber C stores (Wx, C); Wx\'s escrow stores (Wx, C); after C is rekeyed away the keeper ctx degrades', async () => {
      const C = await fixture.context.generateAccount({ initialFunds: (20).algo() })
      const Cx = C.addr.toString()
      const Wx = await newUnregisteredWallet({
        walletFactory: universe.walletFactory, ...send(admin), referrer: R1.addr.toString(), nickname: 'subs-principal-x',
        controlledAddress: Cx, controlledSigner: C.signer, fund: (2).algo(),
      })
      await Wx.addPlugin({ ...send(admin), client: plugin(), callerType: CallerType.Admin })
      await Wx.addPlugin({ ...send(admin), client: plugin(), callerType: CallerType.Admin, escrow: 'e' })
      const WxE = await escrowAddress(Wx, 'e')
      await algorand.send.payment({ ...send(deployer), receiver: WxE, amount: (5).algo() })

      // default window spends from C: subscriber = principal = C
      const idC = await (async () => {
        await use(Wx, [plugin().subscribe({ recipient: merchant.addr.toString(), asset: 0n, amount: AMOUNT, interval: INTERVAL, index: svcRef, args: REFERRER_ARGS })])
        return (await subscriptions.getSubscriptionList({ address: Cx })) - 1n
      })()
      await use(Wx, [plugin().deposit({ asset: 0n, id: idC, amount: AMOUNT * 5n })])
      // escrow window: subscriber = WxE, principal = C (live, rekeyed to Wx.address)
      const idE = await escrowSubscribe(Wx, 'e', WxE, svcRef, REFERRER_ARGS)
      await useIn(Wx, 'e', [plugin().deposit({ asset: 0n, id: idE, amount: AMOUNT * 5n })])

      expect(await storedPrincipal(Cx, idC)).toEqual({ wallet: Wx.client.appId, principal: Cx })
      expect(await storedPrincipal(WxE, idE)).toEqual({ wallet: Wx.client.appId, principal: Cx })
      const ctxOf = (address: string, id: bigint) => subscriptions.triggerGateCtx({ sender: keeper.addr.toString(), address, id })
      expect(await ctxOf(Cx, idC)).toEqual({ principal: Cx, wallet: Wx.client.appId, spender: Cx })
      expect(await ctxOf(WxE, idE)).toEqual({ principal: Cx, wallet: Wx.client.appId, spender: WxE })

      // the admin rekeys C away from Wx (not a flash rekey)
      const away = await fixture.context.generateAccount({ initialFunds: (1).algo() })
      await Wx.client.send.arc58RekeyTo({ ...send(admin), args: { address: away.addr.toString(), flash: false }, extraFee: microAlgo(1_000) })

      // C is no longer owned at rest: (C, 0, C)
      expect(await ctxOf(Cx, idC)).toEqual({ principal: Cx, wallet: 0n, spender: Cx })
      // the escrow is still owned (auth(WxE) == Wx.address) but the stored principal C is not live: (WxE, Wx, WxE)
      expect(await ctxOf(WxE, idE)).toEqual({ principal: WxE, wallet: Wx.client.appId, spender: WxE })

      await timeWarp.timeWarp(INTERVAL + 60n)
      // a context-aware gate fails without a wallet: C's renewals stop
      await expectContractError(keeperTrigger(Cx, idC, gateRef, 'akita_referrer'), errFailedGate)
      // the escrow keeps Wx as ctx.wallet (referrer R1): its renewals continue
      await keeperTrigger(WxE, idE, gateRef, 'akita_referrer')
      expect((await subscriptions.getSubscription({ address: WxE, id: idE })).streak).toBe(2n)
      await assertUnregistered(universe.escrowFactory, [addr(Wx), Cx, WxE])
    })

    test('an escrow no longer owned by its wallet degrades to (E, 0, E): the wallet is forged and deleted', async () => {
      // A genuine wallet cannot leave its escrow rekeyed away (the window must rekey back, errAuam / T14b), so the
      // reachable way for an escrow to stop being owned at rest is losing W itself (isGenuineWallet fails).
      const Wg = await pluginWallet()
      await Wg.addPlugin({ ...send(admin), client: plugin(), callerType: CallerType.Admin, escrow: 'e' })
      const Eg = await escrowAddress(Wg, 'e')
      await algorand.send.payment({ ...send(deployer), receiver: Eg, amount: (5).algo() })
      const id = await escrowSubscribe(Wg, 'e', Eg, svcRef, REFERRER_ARGS)
      await useIn(Wg, 'e', [plugin().deposit({ asset: 0n, id, amount: AMOUNT * 5n })])
      expect(await subscriptions.triggerGateCtx({ sender: keeper.addr.toString(), address: Eg, id }))
        .toEqual({ principal: addr(Wg), wallet: Wg.client.appId, spender: Eg })

      await algorand.send.appUpdateMethodCall({
        ...send(admin),
        appId: Wg.appId,
        method: Wg.client.appClient.getABIMethod('update'),
        args: ['forged'],
        approvalProgram: Buffer.from(ForgedWalletSpec.byteCode!.approval, 'base64'),
        clearStateProgram: Buffer.from(ForgedWalletSpec.byteCode!.clear, 'base64'),
      })
      const forged = algorand.client.getTypedAppClientById(MockForgedWalletClient, { appId: Wg.appId, defaultSender: admin.addr, defaultSigner: admin.signer })
      await forged.send.delete.destroy({ args: {} })

      // the stored pair still names Wg, but nothing is owned any more
      expect(await storedPrincipal(Eg, id)).toEqual({ wallet: Wg.client.appId, principal: addr(Wg) })
      expect(await subscriptions.triggerGateCtx({ sender: keeper.addr.toString(), address: Eg, id }))
        .toEqual({ principal: Eg, wallet: 0n, spender: Eg })
      await timeWarp.timeWarp(INTERVAL + 60n)
      await expectContractError(keeperTrigger(Eg, id, gateRef, 'akita_referrer'), errFailedGate)
    })
  })

  describe('Q13 adoptPrincipal backfill', () => {
    test('rejects missing, ungated, already-adopted and registry-less subscriptions; the payment must be exact', async () => {
      const subscriber = await fixture.context.generateAccount({ initialFunds: (100).algo() })
      const sender = subscriber.addr.toString()
      const adopt = (address: string, id: bigint) => subscriptions.adoptPrincipal({ sender: keeper.addr.toString(), signer: keeper.signer, address, id })

      await expectContractError(adopt(sender, 99n), errSubscriptionDoesNotExist)

      const ungated = await subscriptions.subscribe({
        sender, signer: subscriber.signer, asset: 0n, amount: AMOUNT, interval: INTERVAL, recipient: merchant.addr.toString(), serviceId: svcPlain,
      })
      await expectContractError(adopt(sender, ungated), errNotGated)

      // a plain EOA has no registry wallet: nothing to adopt, and nobody can pin `key.address` for it
      const gated = await subscriptions.subscribe({
        sender, signer: subscriber.signer, asset: 0n, amount: AMOUNT, interval: INTERVAL, recipient: merchant.addr.toString(), serviceId: svcAlgo, legacy: true,
        gateTxn: await gate.build.mustCheck({ sender, signer: subscriber.signer, caller: sender, gateId: gateAlgo, args: [{ type: 'asset' }] }),
      })
      await expectContractError(adopt(sender, gated), errNoLegacyWallet)

      // a hinted wallet subscription already has its pair
      const w = await pluginWallet()
      const wid = await pluginSubscribe(w, svcRef, REFERRER_ARGS)
      await expectContractError(adopt(addr(w), wid), errPrincipalExists)
      // the successful backfill of a registered wallet's legacy subscription is in compat.e2e.spec.ts
    })
  })
})

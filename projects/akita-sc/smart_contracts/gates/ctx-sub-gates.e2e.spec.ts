import { Config, microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import type { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import algosdk, { ABIType, TransactionSigner } from 'algosdk'
import { beforeAll, describe, expect, test } from 'vitest'
import { GateSDK, LogicalOperator, Operator } from 'akita-sdk/gates'
import { newWallet, WalletSDK } from 'akita-sdk/wallet'
import { SubscriptionsSDK } from 'akita-sdk/subscriptions'
import { AkitaUniverse, buildAkitaUniverse } from '../../tests/fixtures/dao'
import { assertUnregistered, newUnregisteredWallet, rekeyToWallet } from '../../tests/fixtures/unregistered-wallet'
import type { GateCtx } from '../artifacts/gates/GateClient'
import { APP_SPEC as ForgedWalletSpec, MockForgedWalletClient } from '../artifacts/mocks/forged-wallet/MockForgedWalletClient'

/**
 * Context-aware sub-gates (principal-resolution spec §3.5, §6.9, Q12).
 *
 * `SubscriptionGate` / `SubscriptionStreakGate` `checkFor(ctx, ...)`: the subscriber must be
 * `ctxOwns(ctx, subscriber)` = the verified principal, the spender, or an account the verified wallet
 * owns at rest. No registry read. `AkitaReferrerGate.checkFor(ctx, ...)`: `ctx.wallet` (verified by the
 * first hop) is a genuine wallet whose referrer is the registered one. The plain `check(caller, ...)`
 * keeps the legacy registry rule; the referrer gate's plain check now returns false instead of reverting
 * for an unregistered caller.
 *
 * `ctx` values here are synthetic: `Gate.checkFor` is a pure predicate; the trust comes from the target's
 * `gateCheckCtx` (covered in gate-ctx.e2e.spec.ts P2-GATE-03 and utils/principal.e2e.spec.ts T38–T40, T49).
 */

Config.configure({ populateAppCallResources: true })

const EMPTY_CID = new Uint8Array(36).fill(120)
const INTERVAL = 3_600n
const checkArgs = (subscriber: string, id: bigint) => ABIType.from('(address,uint64)').encode([subscriber, id])
const plain = (a: string): GateCtx => ({ principal: a, wallet: 0n, spender: a })

describe('Context-aware sub-gates (Q12)', () => {
  const localnet = algorandFixture()

  let universe: AkitaUniverse
  let subscriptions: SubscriptionsSDK
  let gate: GateSDK
  let deployer: string
  let deployerSigner: TransactionSigner

  let merchant: TransactionSignerAccount
  let attacker: TransactionSignerAccount
  let referrer1: string
  let referrer2: string

  /** default wallet (C = W.address), never registered, referrer R1 */
  let Wd: WalletSDK
  /** external controlled address Cx, never registered, referrer R2 */
  let Wx: WalletSDK
  let Cx: TransactionSignerAccount
  /** registered through the SDK's newWallet (legacy referrer-gate path), referrer R1 */
  let Wr: WalletSDK

  let serviceId: bigint
  /** subscriber A: subscribed as an EOA, then rekeyed to Wd.address (owned by Wd at rest) */
  let A: string
  let subA: bigint
  /** subscriber B: subscribed, then rekeyed to a non-wallet app's address */
  let B: string
  let subB: bigint

  const checkFor = async (gateId: bigint, ctx: GateCtx, args: Uint8Array): Promise<boolean> =>
    (await universe.gate.client.send.checkFor({
      sender: deployer,
      signer: deployerSigner,
      args: { ctx, gateId, args: [args] },
      extraFee: microAlgo(10_000),
    })).return!

  const check = async (gateId: bigint, caller: string, args: Uint8Array): Promise<boolean> =>
    (await universe.gate.client.send.check({
      sender: deployer,
      signer: deployerSigner,
      args: { caller, gateId, args: [args] },
      extraFee: microAlgo(10_000),
    })).return!

  const subscribeAs = async (account: TransactionSignerAccount): Promise<bigint> => subscriptions.subscribe({
    sender: account.addr.toString(),
    signer: account.signer,
    asset: 0n,
    amount: 1_000_000n,
    interval: INTERVAL,
    recipient: merchant.addr.toString(),
    serviceId,
    initialDepositAmount: 3_000_000n,
  })

  const walletCtx = (w: WalletSDK, principal = w.client.appAddress.toString()): GateCtx =>
    ({ principal, wallet: w.client.appId, spender: principal })

  beforeAll(async () => {
    await localnet.newScope()
    const { algorand, context: { testAccount } } = localnet
    deployer = testAccount.toString()
    deployerSigner = testAccount.signer

    universe = await buildAkitaUniverse({ fixture: localnet, sender: deployer, signer: deployerSigner, apps: {} })
    subscriptions = universe.subscriptions

    const dispenser = await algorand.account.dispenserFromEnvironment()
    await algorand.account.ensureFunded(deployer, dispenser.addr, (500).algos())

    gate = new GateSDK({
      algorand,
      factoryParams: { appId: universe.gate.appId, defaultSender: deployer, defaultSigner: deployerSigner },
      gateRegistry: {
        subscription: universe.subgates.subscriptionGate.appId,
        subscription_streak: universe.subgates.subscriptionStreakGate.appId,
        akita_referrer: universe.subgates.akitaReferrerGate.appId,
      },
    })

    merchant = await localnet.context.generateAccount({ initialFunds: (300).algos() })
    attacker = await localnet.context.generateAccount({ initialFunds: (20).algos() })
    referrer1 = (await localnet.context.generateAccount({ initialFunds: (1).algos() })).addr.toString()
    referrer2 = (await localnet.context.generateAccount({ initialFunds: (1).algos() })).addr.toString()
    Cx = await localnet.context.generateAccount({ initialFunds: (5).algos() })

    Wd = await newUnregisteredWallet({ walletFactory: universe.walletFactory, sender: deployer, signer: deployerSigner, referrer: referrer1, nickname: 'ctx-wd' })
    Wx = await newUnregisteredWallet({
      walletFactory: universe.walletFactory, sender: deployer, signer: deployerSigner, referrer: referrer2, nickname: 'ctx-wx',
      controlledAddress: Cx.addr.toString(), controlledSigner: Cx.signer,
    })
    Wr = await newWallet({
      algorand,
      factoryParams: { appId: universe.walletFactory.appId, defaultSender: deployer, defaultSigner: deployerSigner },
      sender: deployer,
      signer: deployerSigner,
      nickname: 'ctx-wr',
      referrer: referrer1,
      // the legacy referrer-gate `check` reads EscrowFactory.mustGet(caller); newWallet registers only on request
      register: true,
    })

    serviceId = await subscriptions.newService({
      sender: merchant.addr.toString(),
      signer: merchant.signer,
      interval: INTERVAL,
      asset: 0n,
      amount: 1_000_000n,
      passes: 0n,
      gateId: 0n,
      payoutAddress: merchant.addr.toString(),
      title: 'Ctx',
      description: 'ctx tier',
      bannerImage: EMPTY_CID,
      highlightMessage: 0,
      highlightColor: '#112233',
    })

    const a = await localnet.context.generateAccount({ initialFunds: (20).algos() })
    subA = await subscribeAs(a)
    await rekeyToWallet(algorand, Wd, { sender: a.addr, signer: a.signer })
    A = a.addr.toString()

    const b = await localnet.context.generateAccount({ initialFunds: (20).algos() })
    subB = await subscribeAs(b)
    // rekeyed to an app that is not a factory-created wallet (the Gate itself)
    await algorand.send.payment({ sender: b.addr, signer: b.signer, receiver: b.addr, amount: microAlgo(0), rekeyTo: universe.gate.client.appAddress })
    B = b.addr.toString()
  })

  test('the universe allowlists exactly the sub-gates with checkFor as context-aware', async () => {
    const flagged = async (app: bigint) => gate.isCtxSubGate({ app })
    expect(await flagged(universe.subgates.subscriptionGate.appId)).toBe(true)
    expect(await flagged(universe.subgates.subscriptionStreakGate.appId)).toBe(true)
    expect(await flagged(universe.subgates.akitaReferrerGate.appId)).toBe(true)
    expect(await flagged(universe.subgates.assetGate.appId)).toBe(false)
    expect(await flagged(universe.subgates.socialActivityGate.appId)).toBe(false)
    expect(await gate.isSubGate({ app: universe.subgates.assetGate.appId })).toBe(true)
  })

  describe('SubscriptionGate.checkFor: subject = ctxOwns(ctx, subscriber)', () => {
    let gateId: bigint

    beforeAll(async () => {
      gateId = (await gate.register({
        sender: deployer,
        signer: deployerSigner,
        args: [{ type: 'subscription', appId: universe.subgates.subscriptionGate.appId, layer: 0n, logicalOperator: LogicalOperator.None, merchant: merchant.addr.toString(), serviceId }],
      })).return!
    })

    test('subscriber owned at rest by the verified wallet passes, with no registry entry anywhere', async () => {
      expect(await checkFor(gateId, walletCtx(Wd), checkArgs(A, subA))).toBe(true)
      // the same subscriber through the legacy path: A is not in the registry, so the plain check fails
      expect(await check(gateId, Wd.client.appAddress.toString(), checkArgs(A, subA))).toBe(false)
      await assertUnregistered(universe.escrowFactory, [A, Wd.client.appAddress])
    })

    test('subscriber == principal or == spender passes', async () => {
      expect(await checkFor(gateId, plain(A), checkArgs(A, subA))).toBe(true)
      expect(await checkFor(gateId, { principal: attacker.addr.toString(), wallet: 0n, spender: A }, checkArgs(A, subA))).toBe(true)
    })

    test('no gifting: another actor, another genuine wallet, or a non-wallet app does not own the subscriber', async () => {
      expect(await checkFor(gateId, plain(attacker.addr.toString()), checkArgs(A, subA))).toBe(false)
      // Wx is genuine but A is not rekeyed to it
      expect(await checkFor(gateId, walletCtx(Wx, Cx.addr.toString()), checkArgs(A, subA))).toBe(false)
      // B is rekeyed to the Gate app, which is not a factory-created wallet
      const fake: GateCtx = { principal: attacker.addr.toString(), wallet: universe.gate.appId, spender: attacker.addr.toString() }
      expect(await checkFor(gateId, fake, checkArgs(B, subB))).toBe(false)
    })

    test('a wrong subscription id or args length still fails the same way as check', async () => {
      expect(await checkFor(gateId, walletCtx(Wd), checkArgs(A, 9_999n))).toBe(false)
      await expect(checkFor(gateId, walletCtx(Wd), new Uint8Array(39))).rejects.toThrow('errIarg')
    })

    test('GateSDK.checkFor encodes the subscription args and forwards the ctx', async () => {
      expect(await gate.checkFor({ ctx: walletCtx(Wd), gateId, args: [{ type: 'subscription', subscriber: A, id: subA }] })).toBe(true)
      expect(await gate.checkFor({ ctx: plain(attacker.addr.toString()), gateId, args: [{ type: 'subscription', subscriber: A, id: subA }] })).toBe(false)
    })
  })

  describe('SubscriptionStreakGate.checkFor', () => {
    test('same subject rule; the streak operator still applies', async () => {
      const register = async (streak: bigint) => (await gate.register({
        sender: deployer,
        signer: deployerSigner,
        args: [{
          type: 'subscription_streak', appId: universe.subgates.subscriptionStreakGate.appId, layer: 0n, logicalOperator: LogicalOperator.None,
          merchant: merchant.addr.toString(), serviceId, op: Operator.GreaterThanOrEqualTo, streak,
        }],
      })).return!
      const low = await register(0n)
      const high = await register(50n)
      expect(await checkFor(low, walletCtx(Wd), checkArgs(A, subA))).toBe(true)
      expect(await checkFor(low, plain(attacker.addr.toString()), checkArgs(A, subA))).toBe(false)
      expect(await checkFor(high, walletCtx(Wd), checkArgs(A, subA))).toBe(false)
      expect(await check(low, Wd.client.appAddress.toString(), checkArgs(A, subA))).toBe(false)
    })
  })

  describe('AkitaReferrerGate', () => {
    let gateR1: bigint
    let gateR2: bigint
    const walletIdArg = (w: WalletSDK) => algosdk.encodeUint64(w.client.appId)

    beforeAll(async () => {
      const register = async (referrer: string) => (await gate.register({
        sender: deployer,
        signer: deployerSigner,
        args: [{ type: 'akita_referrer', appId: universe.subgates.akitaReferrerGate.appId, layer: 0n, logicalOperator: LogicalOperator.None, referrer }],
      })).return!
      gateR1 = await register(referrer1)
      gateR2 = await register(referrer2)
    })

    test('checkFor: the verified wallet referred by the registered referrer passes (no registry)', async () => {
      expect(await checkFor(gateR1, walletCtx(Wd), new Uint8Array())).toBe(true)
      expect(await checkFor(gateR2, walletCtx(Wd), new Uint8Array())).toBe(false)
      await assertUnregistered(universe.escrowFactory, [Wd.client.appAddress])
    })

    test('P2-GATE-02 equivalent: an external controlled address (never in the registry) passes through ctx.wallet', async () => {
      const ctx = walletCtx(Wx, Cx.addr.toString())
      expect(await checkFor(gateR2, ctx, new Uint8Array())).toBe(true)
      // args are ignored by checkFor (legacy 8-byte wallet id shape still accepted)
      expect(await checkFor(gateR2, ctx, walletIdArg(Wx))).toBe(true)
      // legacy path: Cx is not in the registry; returns false (was a revert with errAccountNotFound)
      expect(await check(gateR2, Cx.addr.toString(), walletIdArg(Wx))).toBe(false)
    })

    test('checkFor: no wallet, or a non-wallet app, never passes', async () => {
      expect(await checkFor(gateR1, plain(Wd.client.appAddress.toString()), new Uint8Array())).toBe(false)
      const fake: GateCtx = { principal: attacker.addr.toString(), wallet: universe.gate.appId, spender: attacker.addr.toString() }
      expect(await checkFor(gateR1, fake, new Uint8Array())).toBe(false)
    })

    test('legacy check: registered wallet passes; an unregistered or mismatched caller returns false instead of reverting', async () => {
      expect(await check(gateR1, Wr.client.appAddress.toString(), walletIdArg(Wr))).toBe(true)
      expect(await check(gateR1, attacker.addr.toString(), walletIdArg(Wr))).toBe(false)
      expect(await check(gateR1, Wr.client.appAddress.toString(), walletIdArg(Wd))).toBe(false)
      // OR group: a false referrer filter no longer aborts the whole evaluation
      const orGate = (await gate.register({
        sender: deployer,
        signer: deployerSigner,
        args: [
          { type: 'akita_referrer', appId: universe.subgates.akitaReferrerGate.appId, layer: 0n, logicalOperator: LogicalOperator.Or, referrer: referrer1 },
          { type: 'subscription', appId: universe.subgates.subscriptionGate.appId, layer: 0n, logicalOperator: LogicalOperator.None, merchant: merchant.addr.toString(), serviceId },
        ],
      })).return!
      const { return: passed } = await universe.gate.client.send.check({
        sender: deployer,
        signer: deployerSigner,
        args: { caller: A, gateId: orGate, args: [walletIdArg(Wd), checkArgs(A, subA)] },
        extraFee: microAlgo(12_000),
      })
      expect(passed).toBe(true)
    })

    test('audit 11 GAT-02: a `referrer` that is not an address reads as no referrer instead of failing the check', async () => {
      const { algorand } = localnet
      const forger = await localnet.context.generateAccount({ initialFunds: (20).algos() })
      const Wf = await newWallet({
        algorand,
        factoryParams: { appId: universe.walletFactory.appId, defaultSender: forger.addr, defaultSigner: forger.signer },
        sender: forger.addr,
        signer: forger.signer,
        nickname: 'ctx-wf',
        referrer: referrer1,
        register: true,
      })
      const ctx = walletCtx(Wf)
      // checkFor ignores its args, so a counter keeps otherwise identical calls apart
      let calls = 0
      const passes = (gateId: bigint) => checkFor(gateId, ctx, Uint8Array.from([++calls]))
      expect(await passes(gateR1)).toBe(true)

      // The wallet's admin installs its own program (the app stays factory-created) and stores a uint64
      // where an address is expected. Reading its length used to fail the sub-gate, and with it every
      // re-check of a gate with a referrer filter by a third party (StakingPool.gateCheck).
      await algorand.send.appUpdateMethodCall({
        sender: forger.addr,
        signer: forger.signer,
        appId: Wf.client.appId,
        method: Wf.client.appClient.getABIMethod('update'),
        args: ['forged'],
        approvalProgram: Buffer.from(ForgedWalletSpec.byteCode!.approval, 'base64'),
        clearStateProgram: Buffer.from(ForgedWalletSpec.byteCode!.clear, 'base64'),
      })
      const forged = algorand.client.getTypedAppClientById(MockForgedWalletClient, {
        appId: Wf.client.appId, defaultSender: forger.addr, defaultSigner: forger.signer,
      })
      const key = Buffer.from('referrer')
      await forged.send.setUint({ args: { key, value: 7n } })
      expect(await passes(gateR1)).toBe(false)
      expect(await passes(gateR2)).toBe(false)
      // the legacy check reads the same global through the registry
      expect(await check(gateR1, Wf.client.appAddress.toString(), walletIdArg(Wf))).toBe(false)

      // byte strings that are not an address read the same way, whatever their length
      for (const value of [new Uint8Array(0), new Uint8Array(8).fill(255), new Uint8Array(31).fill(1), new Uint8Array(33).fill(1)]) {
        await forged.send.setBytes({ args: { key, value } })
        expect(await passes(gateR1)).toBe(false)
      }

      // and a full address is still read as the referrer
      await forged.send.setBytes({ args: { key, value: algosdk.decodeAddress(referrer2).publicKey } })
      expect(await passes(gateR2)).toBe(true)
      expect(await passes(gateR1)).toBe(false)
    })
  })
})

/**
 * Principal resolution, Phase 0 adversarial suite (docs/principal-resolution/PHASE-0-SPEC.md §5.2).
 *
 * V0.1–V0.4 check the AVM facts the standard rests on; T01–T50 check the resolution matrix, the
 * spoof attempts, the at-rest / gate-context helpers and the functions.ts wrappers (tipWallet,
 * gateCheckCtx, pluginPrincipal error paths). Every wallet and escrow used by T06–T14,
 * T28–T30 and T38–T40 is built WITHOUT the EscrowFactory reverse registry
 * (tests/fixtures/unregistered-wallet.ts), and those tests end with `assertUnregistered`.
 */
import * as algokit from '@algorandfoundation/algokit-utils'
import { microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import type { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import type { AppCallMethodCall } from '@algorandfoundation/algokit-utils/types/composer'
import { prepareGroup, sendPrepared } from 'akita-sdk'
import { CallerType, WalletSDK } from 'akita-sdk/wallet'
import algosdk from 'algosdk'
import { beforeAll, describe, expect, test } from 'vitest'
import { AkitaUniverse, buildAkitaUniverse } from '../../tests/fixtures/dao'
import {
  addRawEscrow,
  addRawPlugin,
  assertUnregistered,
  newUnregisteredWallet,
  rekeyToWallet,
} from '../../tests/fixtures/unregistered-wallet'
import { expectContractError } from '../../tests/utils/errors'
import { errAuthAddrMismatch, errInvalidSenderValue, errMissingRekeyBack } from '../arc58/account/errors'
import { MockFakeDaoClient, MockFakeDaoFactory } from '../artifacts/mocks/fake-dao/MockFakeDAOClient'
import { MockFakeWalletClient, MockFakeWalletFactory } from '../artifacts/mocks/fake-wallet/MockFakeWalletClient'
import { APP_SPEC as ForgedWalletSpec, MockForgedWalletClient } from '../artifacts/mocks/forged-wallet/MockForgedWalletClient'
import { MockPrincipalComposerClient, MockPrincipalComposerFactory } from '../artifacts/mocks/principal-composer/MockPrincipalComposerClient'
import { MockCustodyPluginClient, MockCustodyPluginFactory } from '../artifacts/mocks/principal-custody/MockCustodyPluginClient'
import { APP_SPEC as OverloadSpec, MockPrincipalOverloadFactory } from '../artifacts/mocks/principal-overload/MockPrincipalOverloadClient'
import { TestPrincipalPluginClient, TestPrincipalPluginFactory } from '../artifacts/mocks/principal-plugin/TestPrincipalPluginClient'
import { MockPrincipalProbeClient, MockPrincipalProbeFactory } from '../artifacts/mocks/principal-probe/MockPrincipalProbeClient'
import { MockCompliantProxyClient, MockCompliantProxyFactory } from '../artifacts/mocks/principal-proxy/MockCompliantProxyClient'
import { MockPrincipalProxyClient, MockPrincipalProxyFactory } from '../artifacts/mocks/principal-proxy/MockPrincipalProxyClient'
import { MockPrincipalReenterClient, MockPrincipalReenterFactory } from '../artifacts/mocks/principal-reenter/MockPrincipalReenterClient'
import { MockYClient, MockYFactory } from '../artifacts/mocks/principal-y/MockYClient'
import {
  errHintNotBound,
  errHintNotWallet,
  errHintTopLevel,
  errInvalidWallet,
  errPluginNotAuthAddr,
} from './errors'

algokit.Config.configure({ populateAppCallResources: true })

/**
 * Q2 (R-STALE wallet fix, PHASE-0-SPEC §8) landed in the wallet track (AbstractedAccount:
 * `assertValidGroup` accepts only `arc58_verifyAuthAddress` as a window close). T25 therefore expects
 * both constructions to fail with errNrkb, and T13/T44 must keep passing. Set this back to `false` only
 * to document the pre-Q2 residual against an old wallet program. See docs/principal-resolution/IMPLEMENTATION-LOG.md.
 */
const Q2_WALLET_FIX_LANDED = true

const fixture = algorandFixture()
const ZERO = algosdk.ALGORAND_ZERO_ADDRESS_STRING
const NONEXISTENT_APP = 999_999_999n
const REGISTER_MBR = 12_100n
const FEE = microAlgo(10_000)
const ADDRESS_BYTES = (address: string) => algosdk.decodeAddress(address).publicKey
const KEY = (key: string) => new TextEncoder().encode(key)
/**
 * An AVM type panic on a uint64-typed global (go-algorand logic/eval.go: "len arg 0 wanted []byte but
 * got uint64", or "cannot compare (...)"), never an ARC-65 contract code.
 */
const PANIC = /wanted \[\]byte but got uint64|cannot compare/

type P = {
  wallet: bigint
  principal: string
  origin: string
  spender: string
  referrer: string
  viaPlugin: boolean
}

/** Normalize an ABI `(uint64,address,address,address,address,bool)` return (tuple array or struct). */
function asPrincipal(value: unknown): P {
  if (Array.isArray(value)) {
    const [wallet, principal, origin, spender, referrer, viaPlugin] = value as [bigint, string, string, string, string, boolean]
    return { wallet: BigInt(wallet), principal: String(principal), origin: String(origin), spender: String(spender), referrer: String(referrer), viaPlugin: Boolean(viaPlugin) }
  }
  const v = value as P
  return { wallet: BigInt(v.wallet), principal: String(v.principal), origin: String(v.origin), spender: String(v.spender), referrer: String(v.referrer), viaPlugin: Boolean(v.viaPlugin) }
}

type Ctx = { principal: string; wallet: bigint; spender: string }
function asCtxOwns(value: unknown): { ctx: Ctx; owns: boolean; thirdParty: string } {
  if (Array.isArray(value)) {
    const [[principal, wallet, spender], owns, thirdParty] = value as [[string, bigint, string], boolean, string]
    return { ctx: { principal: String(principal), wallet: BigInt(wallet), spender: String(spender) }, owns: Boolean(owns), thirdParty: String(thirdParty) }
  }
  const v = value as { ctx: Ctx; owns: boolean; thirdParty: string }
  return { ctx: { ...v.ctx, wallet: BigInt(v.ctx.wallet) }, owns: v.owns, thirdParty: String(v.thirdParty) }
}

describe('Principal resolution (Phase 0 adversarial suite)', () => {
  let algorand: algokit.AlgorandClient
  let deployer: TransactionSignerAccount
  let universe: AkitaUniverse
  let daoId: bigint

  // actors
  let adminD: TransactionSignerAccount
  let adminX: TransactionSignerAccount
  let adminE: TransactionSignerAccount
  let forger: TransactionSignerAccount
  let attacker: TransactionSignerAccount
  let victim: TransactionSignerAccount
  let friend: TransactionSignerAccount
  let dCaller: TransactionSignerAccount
  let flashE: TransactionSignerAccount
  let R1: string
  let R2: string

  // apps
  let probe: MockPrincipalProbeClient
  let probe2: MockPrincipalProbeClient
  let plugin: TestPrincipalPluginClient
  let composer: MockPrincipalComposerClient
  let reenter: MockPrincipalReenterClient
  let proxyNC: MockPrincipalProxyClient
  let proxyC: MockCompliantProxyClient
  let mockY: MockYClient
  let custody: MockCustodyPluginClient
  let fakeDAO: MockFakeDaoClient
  let fake: MockFakeWalletClient
  let fakeRegistered: MockFakeWalletClient
  let deletedApp: bigint
  // a once-genuine wallet (factory-created) that its forger updated and then DELETED (T34, T45, T48, T50)
  let deletedWallet: bigint
  let deletedWalletAddress: string
  let AdW: TransactionSignerAccount // rekeyed to deletedWallet's address before the deletion

  // wallets (all unregistered)
  let Wd: WalletSDK
  let WdE: string // Wd escrow "e"
  let WdD: string // Wd escrow "d" (defaultToEscrow grant)
  let Wx: WalletSDK
  let Cx: TransactionSignerAccount
  let WxE: string
  let We: WalletSDK
  let Ax: TransactionSignerAccount // arbitrary-address escrow "x" of We
  let Wf: MockForgedWalletClient // forged wallet shared by the read-only forged cases

  const addr = (w: WalletSDK) => w.client.appAddress.toString()
  const send = (a: TransactionSignerAccount) => ({ sender: a.addr, signer: a.signer })

  // ---------------------------------------------------------------------------------------------
  // helpers

  /** A genuine, unregistered default wallet (C == W.address). */
  async function makeWd(admin: TransactionSignerAccount, referrer = ZERO, grants: { escrow?: string }[] = [{}]) {
    const w = await newUnregisteredWallet({
      walletFactory: universe.walletFactory, ...send(admin), referrer, nickname: 'Wd', fund: (10).algo(),
    })
    for (const g of grants) await addRawPlugin(w, { plugin: plugin.appId, escrow: g.escrow }, send(admin))
    return w
  }

  /** A genuine, unregistered wallet with an external controlled address C (rekeyed to W at creation). */
  async function makeWx(admin: TransactionSignerAccount, referrer = ZERO, grants: { escrow?: string }[] = [{}]) {
    const C = await fixture.context.generateAccount({ initialFunds: (20).algo() })
    const w = await newUnregisteredWallet({
      walletFactory: universe.walletFactory, ...send(admin), referrer, nickname: 'Wx',
      controlledAddress: C.addr.toString(), controlledSigner: C.signer, fund: (2).algo(),
    })
    expect((await algorand.account.getInformation(C.addr)).authAddr?.toString()).toBe(addr(w))
    for (const g of grants) await addRawPlugin(w, { plugin: plugin.appId, escrow: g.escrow }, send(admin))
    return { w, C }
  }

  /** A genuine factory-created wallet whose admin installed `MockForgedWallet` (admin UpdateApplication). */
  async function makeForged(): Promise<MockForgedWalletClient> {
    const w = await newUnregisteredWallet({ walletFactory: universe.walletFactory, ...send(forger), nickname: 'forged', fund: (5).algo() })
    return forge(w)
  }

  /** The forger (admin of `w`) installs `MockForgedWallet` into the genuine wallet `w`. */
  async function forge(w: WalletSDK): Promise<MockForgedWalletClient> {
    await algorand.send.appUpdateMethodCall({
      ...send(forger),
      appId: w.appId,
      method: w.client.appClient.getABIMethod('update'),
      args: ['forged'],
      approvalProgram: Buffer.from(ForgedWalletSpec.byteCode!.approval, 'base64'),
      clearStateProgram: Buffer.from(ForgedWalletSpec.byteCode!.clear, 'base64'),
    })
    const forged = algorand.client.getTypedAppClientById(MockForgedWalletClient, {
      appId: w.appId, defaultSender: forger.addr, defaultSigner: forger.signer,
    })
    // still created by the DAO-registered wallet factory
    expect(await probe.genuineFor({ args: { wallet: w.appId, factory: universe.walletFactory.appId } })).toBe(true)
    return forged
  }

  /** Account rekeyed to `target` (returns the account; funded). */
  async function accountRekeyedTo(target: string) {
    const a = await fixture.context.generateAccount({ initialFunds: (1).algo() })
    await algorand.send.payment({ ...send(a), receiver: a.addr, amount: microAlgo(0), rekeyTo: target })
    return a
  }

  type Window = {
    wallet: WalletSDK
    escrow?: string
    type?: bigint
    by?: TransactionSignerAccount
  }

  /**
   * Run `calls` inside a plugin window of `win.wallet`:
   * [wallet.arc58_rekeyToPlugin(plugin, type, escrow), ...calls, wallet.arc58_verifyAuthAddress].
   * Returns the decoded ABI returns of `calls` (index-aligned).
   */
  async function inWindow(win: Window, calls: AppCallMethodCall[]): Promise<unknown[]> {
    const by = win.by ?? deployer
    const group = algorand.newGroup()
    group.addAppCallMethodCall(await win.wallet.client.params.arc58RekeyToPlugin({
      ...send(by),
      args: { plugin: plugin.appId, type: win.type ?? CallerType.Global, escrow: win.escrow ?? '', methodOffsets: [], fundsRequest: [] },
      extraFee: microAlgo(2_000),
    }))
    for (const call of calls) group.addAppCallMethodCall(call)
    group.addAppCallMethodCall(await win.wallet.client.params.arc58VerifyAuthAddress({ ...send(by), args: {} }))
    const result = await group.send({ populateAppCallResources: true })
    return result.returns!.slice(1, 1 + calls.length).map((r) => r.returnValue)
  }

  const callProbe = (w: WalletSDK, hint: bigint, rekeyBack = true) =>
    plugin.params.callProbe({ ...send(deployer), args: { wallet: w.appId, rekeyBack, probe: probe.appId, hint }, extraFee: FEE })
  const callTryProbe = (w: WalletSDK, hint: bigint, rekeyBack = true) =>
    plugin.params.callTryProbe({ ...send(deployer), args: { wallet: w.appId, rekeyBack, probe: probe.appId, hint }, extraFee: FEE })
  const pluginPrincipal = (w: WalletSDK) =>
    plugin.params.principal({ ...send(deployer), args: { wallet: w.appId }, extraFee: FEE })
  const done = (w: WalletSDK) => plugin.params.done({ ...send(deployer), args: { wallet: w.appId }, extraFee: FEE })

  /** Resolve `hint` from inside `win` (and the plugin-side answer in the same group, T30 parity). */
  async function resolveIn(win: Window, hint: bigint, rekeyBack = true): Promise<P> {
    const calls = [await pluginPrincipal(win.wallet), await callProbe(win.wallet, hint, rekeyBack)]
    if (!rekeyBack) calls.push(await done(win.wallet))
    const [pluginSide, targetSide] = await inWindow(win, calls)
    const target = asPrincipal(targetSide)
    if (hint === win.wallet.appId) {
      // T30: pluginPrincipal(wallet) == the first-hop target's answer in the same call
      expect(asPrincipal(pluginSide)).toEqual(target)
    }
    return target
  }

  // ---------------------------------------------------------------------------------------------
  // setup

  beforeAll(async () => {
    await fixture.newScope()
    algorand = fixture.context.algorand
    const dispenser = await algorand.account.dispenserFromEnvironment()
    deployer = await fixture.context.generateAccount({ initialFunds: (3_000).algo() })
    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (3_000).algo())
    const gen = (algo: number) => fixture.context.generateAccount({ initialFunds: algo.algo() })
    adminD = await gen(200)
    adminX = await gen(200)
    adminE = await gen(200)
    forger = await gen(500)
    attacker = await gen(20)
    victim = await gen(5)
    friend = await gen(50) // T40 creates a genuine wallet for the friend (funds it with 10 ALGO)
    dCaller = await gen(5)
    flashE = await gen(5)
    R1 = (await gen(1)).addr.toString()
    R2 = (await gen(1)).addr.toString()

    universe = await buildAkitaUniverse({ fixture, sender: deployer.addr, signer: deployer.signer, apps: {} })
    daoId = universe.dao.appId

    const defaults = { defaultSender: deployer.addr, defaultSigner: deployer.signer }
    const probeFactory = algorand.client.getTypedAppFactory(MockPrincipalProbeFactory, defaults)
    probe = (await probeFactory.send.create.create({ args: { akitaDao: daoId } })).appClient
    probe2 = (await probeFactory.send.create.create({ args: { akitaDao: daoId } })).appClient
    plugin = (await algorand.client.getTypedAppFactory(TestPrincipalPluginFactory, defaults).send.create.create({ args: { akitaDao: daoId } })).appClient
    composer = (await algorand.client.getTypedAppFactory(MockPrincipalComposerFactory, defaults).send.create.bare()).appClient
    reenter = (await algorand.client.getTypedAppFactory(MockPrincipalReenterFactory, defaults).send.create.bare()).appClient
    proxyNC = (await algorand.client.getTypedAppFactory(MockPrincipalProxyFactory, defaults).send.create.bare()).appClient
    proxyC = (await algorand.client.getTypedAppFactory(MockCompliantProxyFactory, defaults).send.create.bare()).appClient
    mockY = (await algorand.client.getTypedAppFactory(MockYFactory, defaults).send.create.bare()).appClient
    custody = (await algorand.client.getTypedAppFactory(MockCustodyPluginFactory, defaults).send.create.bare()).appClient
    fakeDAO = (await algorand.client.getTypedAppFactory(MockFakeDaoFactory, defaults).send.create.create({ args: {} })).appClient
    for (const app of [probe, probe2, plugin, composer, reenter, proxyNC, proxyC, mockY, custody, fakeDAO]) {
      await app.appClient.fundAppAccount({ amount: (1).algo() })
    }

    // Fake wallets (creator != factory): one unregistered, one self-registered in the EscrowFactory.
    const fakeFactory = algorand.client.getTypedAppFactory(MockFakeWalletFactory, { defaultSender: attacker.addr, defaultSigner: attacker.signer })
    fake = (await fakeFactory.send.create.create({ args: { controlledAddress: victim.addr.toString(), referrer: attacker.addr.toString(), spendingAddress: ZERO } })).appClient
    fakeRegistered = (await fakeFactory.send.create.create({ args: { controlledAddress: victim.addr.toString(), referrer: attacker.addr.toString(), spendingAddress: ZERO } })).appClient
    await fakeRegistered.appClient.fundAppAccount({ amount: (5).algo() })
    await fakeRegistered.send.registerSelf({ args: { escrowFactory: universe.escrowFactory.appId, mbr: REGISTER_MBR }, extraFee: microAlgo(2_000) })
    expect(await universe.escrowFactory.exists({ args: { address: fakeRegistered.appAddress.toString() } })).toBe(true)

    // A deleted app (T34/T45).
    const program = await algorand.app.compileTeal('#pragma version 10\npushint 1\nreturn')
    const created = await algorand.send.appCreate({ ...send(deployer), approvalProgram: program.compiledBase64ToBytes, clearStateProgram: program.compiledBase64ToBytes })
    deletedApp = created.appId
    await algorand.send.appDelete({ ...send(deployer), appId: deletedApp })

    // Wd: default wallet (C == W.address), referrer R1, grants: default, escrow "e", defaultToEscrow "d"
    // (caller dCaller), and a composer grant (caller = MockPrincipalComposer).
    Wd = await makeWd(adminD, R1, [{}, { escrow: 'e' }])
    await addRawPlugin(Wd, { plugin: plugin.appId, caller: dCaller.addr.toString(), escrow: 'd', defaultToEscrow: true }, send(adminD))
    await addRawPlugin(Wd, { plugin: plugin.appId, caller: composer.appAddress.toString() }, send(adminD))
    WdE = (await Wd.client.state.box.escrows.value('e'))!.address
    WdD = (await Wd.client.state.box.escrows.value('d'))!.address

    // Wx: external controlled Cx, referrer R2, grants: default and escrow "e".
    ;({ w: Wx, C: Cx } = await makeWx(adminX, R2, [{}, { escrow: 'e' }]))
    WxE = (await Wx.client.state.box.escrows.value('e'))!.address

    // We: named escrow "e" and an arbitrary-address escrow "x" (Ax rekeyed to We), no referrer.
    We = await makeWd(adminE, ZERO, [{ escrow: 'e' }])
    Ax = await fixture.context.generateAccount({ initialFunds: (1).algo() })
    await rekeyToWallet(algorand, We, send(Ax))
    await addRawEscrow(We, 'x', { ...send(adminE), address: Ax.addr.toString() })
    await addRawPlugin(We, { plugin: plugin.appId, escrow: 'x' }, send(adminE))

    Wf = await makeForged()

    // A once-genuine wallet that its forger deletes (T34/T45/T46/T48/T50). Record the stored pair
    // (W, W.address) for an account the wallet owns while W is still honest, then update and delete W.
    {
      const honest = await newUnregisteredWallet({ walletFactory: universe.walletFactory, ...send(forger), nickname: 'doomed', fund: (1).algo() })
      deletedWallet = honest.appId
      deletedWalletAddress = addr(honest)
      AdW = await accountRekeyedTo(deletedWalletAddress)
      expect(await probe.owns({ args: { wallet: deletedWallet, account: AdW.addr.toString() } })).toBe(true)
      expect(await probe.atRest({ args: { account: AdW.addr.toString(), wallet: deletedWallet, stored: deletedWalletAddress } })).toBe(deletedWalletAddress)
      const doomed = await forge(honest)
      await doomed.send.delete.destroy({ args: {} })
      expect(await probe.genuineFor({ args: { wallet: deletedWallet, factory: universe.walletFactory.appId } })).toBe(false)
    }

    await assertUnregistered(universe.escrowFactory, [addr(Wd), WdE, WdD, addr(Wx), Cx.addr, WxE, addr(We), Ax.addr])
  }, 1_200_000)

  // ---------------------------------------------------------------------------------------------
  describe('V0: AVM facts', () => {
    test('V0.1 the callee already sees the RekeyTo applied: S.auth == W.address (escrow window), zero (default window)', async () => {
      const [auth] = await inWindow({ wallet: Wx, escrow: 'e' }, [
        await plugin.params.callProbeAuth({ ...send(deployer), args: { wallet: Wx.appId, rekeyBack: true, probe: probe.appId, hint: Wx.appId }, extraFee: FEE }),
      ])
      expect(String(auth)).toBe(addr(Wx))
      const [authD] = await inWindow({ wallet: Wd }, [
        await plugin.params.callProbeAuth({ ...send(deployer), args: { wallet: Wd.appId, rekeyBack: true, probe: probe.appId, hint: Wd.appId }, extraFee: FEE }),
      ])
      expect(String(authD)).toBe(ZERO)
    })

    test('V0.2 / T23 a mid-window call-out cannot re-enter the plugin with a forged wallet', async () => {
      await expect(inWindow({ wallet: Wd }, [
        await plugin.params.callReenter({ ...send(deployer), args: { wallet: Wd.appId, reenter: reenter.appId, forgedWallet: Wf.appId, probe: probe.appId }, extraFee: FEE }),
      ])).rejects.toThrow(/re-enter/)
    })

    test('V0.3 / T24 an outer plugin call carrying another wallet inside the window is rejected (errIsvl)', async () => {
      await expectContractError(inWindow({ wallet: Wd }, [
        await plugin.params.callProbe({ ...send(deployer), args: { wallet: Wf.appId, rekeyBack: true, probe: probe.appId, hint: Wf.appId }, extraFee: FEE }),
      ]), errInvalidSenderValue)
    })

    test('V0.4 / T24 an inner-composed window carrying another wallet is rejected (errIsvl)', async () => {
      await expectContractError(composer.send.compose({
        args: { wallet: Wd.appId, plugin: plugin.appId, probe: probe.appId, hintInWindow: Wf.appId },
        extraFee: microAlgo(20_000),
      }), errInvalidSenderValue)
    })
  })

  // ---------------------------------------------------------------------------------------------
  describe('Resolution matrix', () => {
    test('T01 hint 0 at top level resolves to the sender', async () => {
      const p = asPrincipal((await probe.send.probe({ ...send(attacker), args: { wallet: 0n } })).return)
      expect(p).toEqual({ wallet: 0n, principal: attacker.addr.toString(), origin: ZERO, spender: attacker.addr.toString(), referrer: ZERO, viaPlugin: false })
    })

    test('T02 hint 0 inside a window resolves to the spender, no wallet', async () => {
      const p = await resolveIn({ wallet: Wd }, 0n)
      expect(p).toEqual({ wallet: 0n, principal: addr(Wd), origin: ZERO, spender: addr(Wd), referrer: ZERO, viaPlugin: false })
      await assertUnregistered(universe.escrowFactory, [addr(Wd)])
    })

    test('T03 a wallet hint on a top-level call reverts (errHtop)', async () => {
      await expectContractError(probe.send.probe({ ...send(adminD), args: { wallet: Wd.appId } }), errHintTopLevel)
    })

    test('T04 a nonexistent app as hint reverts (errHnwl)', async () => {
      await expectContractError(inWindow({ wallet: Wd }, [await callProbe(Wd, NONEXISTENT_APP)]), errHintNotWallet)
    })

    test('T05 a fake wallet (creator != factory) as hint reverts (errHnwl)', async () => {
      await expectContractError(inWindow({ wallet: Wd }, [await callProbe(Wd, fake.appId)]), errHintNotWallet)
    })

    test.each([true, false])('T06 default grant, rekeyBack=%s: principal W.address via the plugin arm, referrer R1', async (rekeyBack) => {
      const p = await resolveIn({ wallet: Wd }, Wd.appId, rekeyBack)
      expect(p).toEqual({ wallet: Wd.appId, principal: addr(Wd), origin: addr(Wd), spender: addr(Wd), referrer: R1, viaPlugin: true })
      await assertUnregistered(universe.escrowFactory, [addr(Wd)])
    })

    test('T07 external controlled default grant: principal Cx', async () => {
      const p = await resolveIn({ wallet: Wx }, Wx.appId)
      expect(p).toEqual({ wallet: Wx.appId, principal: Cx.addr.toString(), origin: Cx.addr.toString(), spender: Cx.addr.toString(), referrer: R2, viaPlugin: true })
      await assertUnregistered(universe.escrowFactory, [addr(Wx), Cx.addr])
    })

    test('T08 named-escrow window: principal W.address, spender the escrow', async () => {
      const p = await resolveIn({ wallet: Wd, escrow: 'e' }, Wd.appId)
      expect(p).toEqual({ wallet: Wd.appId, principal: addr(Wd), origin: addr(Wd), spender: WdE, referrer: R1, viaPlugin: true })
      await assertUnregistered(universe.escrowFactory, [addr(Wd), WdE])
    })

    test('T09 defaultToEscrow grant: same as T08 on the default escrow', async () => {
      const p = await resolveIn({ wallet: Wd, type: CallerType.Other, by: dCaller }, Wd.appId)
      expect(p).toEqual({ wallet: Wd.appId, principal: addr(Wd), origin: addr(Wd), spender: WdD, referrer: R1, viaPlugin: true })
      await assertUnregistered(universe.escrowFactory, [addr(Wd), WdD])
    })

    test('T10 arbitrary-address escrow window, no registration anywhere: principal C', async () => {
      const p = await resolveIn({ wallet: We, escrow: 'x' }, We.appId)
      expect(p).toEqual({ wallet: We.appId, principal: addr(We), origin: addr(We), spender: Ax.addr.toString(), referrer: ZERO, viaPlugin: true })
      await assertUnregistered(universe.escrowFactory, [addr(We), Ax.addr])
    })

    test('T11 controlled account rekeyed away: principal = escrow, origin zero, referrer still R2', async () => {
      const { w, C } = await makeWx(adminX, R2, [{ escrow: 'e' }])
      const escrow = (await w.client.state.box.escrows.value('e'))!.address
      await w.client.send.arc58RekeyTo({ ...send(adminX), args: { address: flashE.addr.toString(), flash: false }, extraFee: microAlgo(1_000) })
      const p = await resolveIn({ wallet: w, escrow: 'e' }, w.appId)
      expect(p).toEqual({ wallet: w.appId, principal: escrow, origin: ZERO, spender: escrow, referrer: R2, viaPlugin: true })
      // T29 (T11 state): the stored pair (W, C) no longer yields C; both read-later variants agree.
      expect(await probe.atRest({ args: { account: escrow, wallet: w.appId, stored: C.addr.toString() } })).toBe(escrow)
      expect(await probe.thirdParty({ args: { account: escrow, wallet: w.appId } })).toBe(escrow)
      await assertUnregistered(universe.escrowFactory, [addr(w), C.addr, escrow])
    })

    test('T12 W.address rekeyed away: escrow windows resolve to the escrow; default windows cannot open', async () => {
      const w = await makeWd(adminD, R1, [{}, { escrow: 'e' }])
      const escrow = (await w.client.state.box.escrows.value('e'))!.address
      // the stored pair a target records at a T08-style interaction BEFORE the rekey: (w, W.address)
      const before = await resolveIn({ wallet: w, escrow: 'e' }, w.appId)
      expect(before.principal).toBe(addr(w))
      expect(await probe.atRest({ args: { account: escrow, wallet: w.appId, stored: before.principal } })).toBe(addr(w))
      await w.client.send.arc58RekeyTo({ ...send(adminD), args: { address: flashE.addr.toString(), flash: false }, extraFee: microAlgo(1_000) })
      const p = await resolveIn({ wallet: w, escrow: 'e' }, w.appId)
      expect(p).toEqual({ wallet: w.appId, principal: escrow, origin: ZERO, spender: escrow, referrer: R1, viaPlugin: true })
      // the wallet app can no longer sign for W.address (AVM: "app N ... unauthorized")
      await expect(resolveIn({ wallet: w }, w.appId)).rejects.toThrow(/unauthorized/)
      // T28 row 6: W.address is no longer owned at rest
      expect(await probe.owns({ args: { wallet: w.appId, account: addr(w) } })).toBe(false)
      // T29 (T12 state): the stored pair (w, W.address) no longer yields W.address (the
      // `stored == W.address => auth(W.address) == 0` branch); both read-later variants agree.
      expect(await probe.atRest({ args: { account: escrow, wallet: w.appId, stored: before.principal } })).toBe(escrow)
      expect(await probe.thirdParty({ args: { account: escrow, wallet: w.appId } })).toBe(escrow)
      await assertUnregistered(universe.escrowFactory, [addr(w), escrow])
    })

    test('T13 flash rekey to an EOA: the EOA signing as C with a hint gets errHtop; with hint 0 the principal is C', async () => {
      const { w, C } = await makeWx(adminX, R2)
      const flashGroup = async (hint: bigint) => {
        const group = algorand.newGroup()
        group.addAppCallMethodCall(await w.client.params.arc58RekeyTo({ ...send(adminX), args: { address: flashE.addr.toString(), flash: true }, extraFee: microAlgo(1_000) }))
        group.addAppCallMethodCall(await probe.params.probe({ sender: C.addr, signer: flashE.signer, args: { wallet: hint } }))
        group.addPayment({ sender: C.addr, signer: flashE.signer, receiver: C.addr, amount: microAlgo(0), rekeyTo: w.client.appAddress })
        return group.send({ populateAppCallResources: true })
      }
      await expectContractError(flashGroup(w.appId), errHintTopLevel)
      const result = await flashGroup(0n)
      expect(asPrincipal(result.returns![1].returnValue).principal).toBe(C.addr.toString())
      expect((await algorand.account.getInformation(C.addr)).authAddr?.toString()).toBe(addr(w))
      await assertUnregistered(universe.escrowFactory, [addr(w), C.addr])
    })

    test.each([true, false])('T14 compliant proxy chain (rekeyBack=%s): passes, S handed back', async (rekeyBack) => {
      for (const win of [{ wallet: Wd }, { wallet: Wd, escrow: 'e' }] as Window[]) {
        const calls = [await plugin.params.proxyProbe({ ...send(deployer), args: { wallet: Wd.appId, rekeyBack, proxy: proxyC.appId, probe: probe.appId, hint: Wd.appId }, extraFee: FEE })]
        if (!rekeyBack) calls.push(await done(Wd))
        const [ret] = await inWindow(win, calls)
        const p = asPrincipal(ret)
        expect(p.principal).toBe(addr(Wd))
        expect(p.spender).toBe(win.escrow ? WdE : addr(Wd))
        expect(p.viaPlugin).toBe(true)
      }
      // the window closed with verifyAuthAddress, so S is back with W
      expect((await algorand.account.getInformation(WdE)).authAddr?.toString()).toBe(addr(Wd))
      await assertUnregistered(universe.escrowFactory, [addr(Wd), WdE])
    })

    test('T14b a non-compliant proxy that keeps S cannot close a genuine window (errAuam)', async () => {
      await expectContractError(inWindow({ wallet: Wd, escrow: 'e' }, [
        await plugin.params.proxyProbeKeep({ ...send(deployer), args: { wallet: Wd.appId, proxy: proxyNC.appId, probe: probe.appId, hint: Wd.appId }, extraFee: FEE }),
      ]), errAuthAddrMismatch)
    })

    test('T15 a different genuine wallet than the open window: errHnbd', async () => {
      await expectContractError(inWindow({ wallet: Wd }, [await callProbe(Wd, Wx.appId)]), errHintNotBound)
    })

    test('T16 the plugin sending as itself with hint W: errHnbd', async () => {
      await expectContractError(inWindow({ wallet: Wd }, [
        await plugin.params.callProbeAsSelf({ ...send(deployer), args: { wallet: Wd.appId, probe: probe.appId, hint: Wd.appId }, extraFee: FEE }),
      ]), errHintNotBound)
    })

    test('T16b E11: an app sending as itself with a forged spending_address = its own address: errHnbd (only `sender != callerAddr` rejects it)', async () => {
      const f = await makeForged()
      await f.send.setBytes({ args: { key: KEY('spending_address'), value: ADDRESS_BYTES(probe.appAddress.toString()) } })
      // probe -> probe2 as probe.address: sender == spending_address == callerApplicationAddress
      await expectContractError(probe.send.relay({ ...send(attacker), args: { target: probe2.appId, wallet: f.appId }, extraFee: FEE }), errHintNotBound)
      const relayed = asPrincipal((await probe.send.tryRelay({ ...send(attacker), args: { target: probe2.appId, wallet: f.appId }, extraFee: FEE })).return)
      const self = probe.appAddress.toString()
      expect(relayed).toEqual({ wallet: 0n, principal: self, origin: ZERO, spender: self, referrer: ZERO, viaPlugin: false })
    })

    test('T17 a nested call (plugin -> probe -> probe2) evaluated at the second hop: errHnbd', async () => {
      await expectContractError(inWindow({ wallet: Wd }, [
        await plugin.params.callRelay({ ...send(deployer), args: { wallet: Wd.appId, rekeyBack: true, probe: probe.appId, probe2: probe2.appId, hint: Wd.appId }, extraFee: FEE }),
      ]), errHintNotBound)
    })
  })

  // ---------------------------------------------------------------------------------------------
  describe('Forged (admin-updated) wallets', () => {
    test('T18 direct arm is bounded to the forger\'s own custody; another wallet as hint gives errHnbd', async () => {
      const p = asPrincipal((await Wf.send.callProbeAs({ args: { probe: probe.appId, hint: Wf.appId, sender: Wf.appAddress.toString() }, extraFee: FEE })).return)
      expect(p).toEqual({ wallet: Wf.appId, principal: Wf.appAddress.toString(), origin: Wf.appAddress.toString(), spender: Wf.appAddress.toString(), referrer: ZERO, viaPlugin: false })
      await expectContractError(Wf.send.callProbeAs({ args: { probe: probe.appId, hint: Wd.appId, sender: Wf.appAddress.toString() }, extraFee: FEE }), errHintNotBound)
    })

    test('T19 forged spending_address = attacker EOA, attacker calls top-level: errHtop', async () => {
      const f = await makeForged()
      await f.send.setBytes({ args: { key: KEY('spending_address'), value: ADDRESS_BYTES(attacker.addr.toString()) } })
      await expectContractError(probe.send.probe({ ...send(attacker), args: { wallet: f.appId } }), errHintTopLevel)
    })

    test('T20 forged spending_address = Wd.address: the forged wallet cannot send as Wd.address (F1)', async () => {
      const f = await makeForged()
      await f.send.setBytes({ args: { key: KEY('spending_address'), value: ADDRESS_BYTES(addr(Wd)) } })
      await expect(f.send.callProbeAs({ args: { probe: probe.appId, hint: f.appId, sender: addr(Wd) }, extraFee: FEE }))
        .rejects.toThrow(/authoriz/i)
    })

    test('T21 forged controlled_address = victim (not rekeyed to W): principal stays W.address, never the victim', async () => {
      const f = await makeForged()
      await f.send.setBytes({ args: { key: KEY('controlled_address'), value: ADDRESS_BYTES(victim.addr.toString()) } })
      const p = asPrincipal((await f.send.callProbeAs({ args: { probe: probe.appId, hint: f.appId, sender: f.appAddress.toString() }, extraFee: FEE })).return)
      expect(p.principal).toBe(f.appAddress.toString())
      expect(p.principal).not.toBe(victim.addr.toString())
      expect(p.origin).toBe(ZERO)
    })

    test('T22 forged referrer is returned as is (R-REFERRER: self-asserted)', async () => {
      const f = await makeForged()
      await f.send.setBytes({ args: { key: KEY('referrer'), value: ADDRESS_BYTES(attacker.addr.toString()) } })
      const p = asPrincipal((await f.send.callProbeAs({ args: { probe: probe.appId, hint: f.appId, sender: f.appAddress.toString() }, extraFee: FEE })).return)
      expect(p.referrer).toBe(attacker.addr.toString())
    })
  })

  // ---------------------------------------------------------------------------------------------
  describe('Residuals and quotes', () => {
    test(`T25 R-STALE, both constructions (${Q2_WALLET_FIX_LANDED ? 'Q2 fix: both fail' : 'pre-Q2: residual passes'})`, async () => {
      // (a) Cx rekeyed to an EOA earlier; an escrow window ended by the controlled-address shortcut.
      {
        const { w, C } = await makeWx(adminX, R2, [{ escrow: 'e' }])
        await w.client.send.arc58RekeyTo({ ...send(adminX), args: { address: flashE.addr.toString(), flash: false }, extraFee: microAlgo(1_000) })
        const group = algorand.newGroup()
        group.addAppCallMethodCall(await w.client.params.arc58RekeyToPlugin({ ...send(deployer), args: { plugin: plugin.appId, type: CallerType.Global, escrow: 'e', methodOffsets: [], fundsRequest: [] }, extraFee: microAlgo(2_000) }))
        group.addAppCallMethodCall(await callProbe(w, 0n, false))
        group.addPayment({ sender: C.addr, signer: flashE.signer, receiver: C.addr, amount: microAlgo(0), rekeyTo: w.client.appAddress })
        if (Q2_WALLET_FIX_LANDED) {
          await expectContractError(group.send({ populateAppCallResources: true }), errMissingRekeyBack)
        } else {
          await group.send({ populateAppCallResources: true })
          // a LATER group: the plugin arm still passes for P with the stale spending_address
          const later = await plugin.send.callProbe({ ...send(attacker), args: { wallet: w.appId, rekeyBack: true, probe: probe.appId, hint: w.appId }, extraFee: FEE })
          const p = asPrincipal(later.return)
          expect(p.viaPlugin).toBe(true)
          expect(p.wallet).toBe(w.appId)
          await w.client.send.arc58VerifyAuthAddress({ ...send(deployer), args: {} })
        }
      }
      // (b) one admin group: [rekeyTo(E, true), rekeyToPlugin(P, escrow), P.m(W, false), pay C->C rekeyTo W].
      {
        const { w, C } = await makeWx(adminX, R2, [{ escrow: 'e' }])
        const group = algorand.newGroup()
        group.addAppCallMethodCall(await w.client.params.arc58RekeyTo({ ...send(adminX), args: { address: flashE.addr.toString(), flash: true }, extraFee: microAlgo(1_000) }))
        group.addAppCallMethodCall(await w.client.params.arc58RekeyToPlugin({ ...send(deployer), args: { plugin: plugin.appId, type: CallerType.Global, escrow: 'e', methodOffsets: [], fundsRequest: [] }, extraFee: microAlgo(2_000) }))
        group.addAppCallMethodCall(await callProbe(w, 0n, false))
        group.addPayment({ sender: C.addr, signer: flashE.signer, receiver: C.addr, amount: microAlgo(0), rekeyTo: w.client.appAddress })
        if (Q2_WALLET_FIX_LANDED) {
          // the flash rekeyTo accepts the C->C shortcut txn itself, but rekeyToPlugin's
          // assertValidGroup no longer does and reaches the end of the group without a rekey back
          await expectContractError(group.send({ populateAppCallResources: true }), errMissingRekeyBack)
        } else {
          await group.send({ populateAppCallResources: true })
          const later = await plugin.send.callProbe({ ...send(attacker), args: { wallet: w.appId, rekeyBack: true, probe: probe.appId, hint: w.appId }, extraFee: FEE })
          expect(asPrincipal(later.return).viaPlugin).toBe(true)
          await w.client.send.arc58VerifyAuthAddress({ ...send(deployer), args: {} })
        }
      }
    })

    test('T26 readonly quote at top level: {0, Wd, Wx, fake, nonexistent} -> {zero, R1, R2, zero, zero}', async () => {
      const quote = (wallet: bigint) => probe.quote({ args: { wallet } })
      expect(await quote(0n)).toBe(ZERO)
      expect(await quote(Wd.appId)).toBe(R1)
      expect(await quote(Wx.appId)).toBe(R2)
      expect(await quote(fake.appId)).toBe(ZERO)
      expect(await quote(NONEXISTENT_APP)).toBe(ZERO)
    })

    test('T27 tryProbe never reverts for the invalid hints of T03–T05 and T15–T17: plain result', async () => {
      const plain = (who: string) => ({ wallet: 0n, principal: who, origin: ZERO, spender: who, referrer: ZERO, viaPlugin: false })
      // T03
      expect(asPrincipal((await probe.send.tryProbe({ ...send(adminD), args: { wallet: Wd.appId } })).return)).toEqual(plain(adminD.addr.toString()))
      // T04, T05, T15
      for (const hint of [NONEXISTENT_APP, fake.appId, Wx.appId]) {
        const [ret] = await inWindow({ wallet: Wd }, [await callTryProbe(Wd, hint)])
        expect(asPrincipal(ret)).toEqual(plain(addr(Wd)))
      }
      // T16
      const [self] = await inWindow({ wallet: Wd }, [
        await plugin.params.callTryProbeAsSelf({ ...send(deployer), args: { wallet: Wd.appId, probe: probe.appId, hint: Wd.appId }, extraFee: FEE }),
      ])
      expect(asPrincipal(self)).toEqual(plain(plugin.appAddress.toString()))
      // T17 (second hop)
      const relayed = asPrincipal((await probe.send.tryRelay({ ...send(adminD), args: { target: probe2.appId, wallet: Wd.appId }, extraFee: FEE })).return)
      expect(relayed).toEqual(plain(probe.appAddress.toString()))
    })
  })

  // ---------------------------------------------------------------------------------------------
  describe('At-rest ownership and read-later principals', () => {
    test('T28 owns(W, A) matrix', async () => {
      const owns = (wallet: bigint, account: string) => probe.owns({ args: { wallet, account } })
      expect(await owns(Wd.appId, addr(Wd))).toBe(true) // W.address
      expect(await owns(Wd.appId, WdE)).toBe(true) // idle escrow
      expect(await owns(We.appId, Ax.addr.toString())).toBe(true) // arbitrary-address escrow
      expect(await owns(Wx.appId, Cx.addr.toString())).toBe(true) // external C
      // escrow mid-window (rekeyed to P)
      const [mid] = await inWindow({ wallet: Wd, escrow: 'e' }, [
        await plugin.params.callOwns({ ...send(deployer), args: { wallet: Wd.appId, rekeyBack: true, probe: probe.appId, account: WdE }, extraFee: FEE }),
      ])
      expect(mid).toBe(false)
      // (row 6, W.address after T12: asserted in T12)
      // Wf claiming spending_address = A: no static ownership through a forgeable global
      const f = await makeForged()
      const A = await fixture.context.generateAccount({ initialFunds: (1).algo() })
      await f.send.setBytes({ args: { key: KEY('spending_address'), value: ADDRESS_BYTES(A.addr.toString()) } })
      expect(await owns(f.appId, A.addr.toString())).toBe(false)
      expect(await owns(fake.appId, victim.addr.toString())).toBe(false) // fake
      // ACC-01 on the at-rest path: an account really rekeyed to a NON-wallet app is not owned by it
      // (only isGenuineWallet rejects this row: auth(Af) == fake.address holds)
      const Af = await accountRekeyedTo(fake.appAddress.toString())
      expect(await owns(fake.appId, Af.addr.toString())).toBe(false)
      expect(await owns(deletedWallet, AdW.addr.toString())).toBe(false) // once-genuine, deleted
      await assertUnregistered(universe.escrowFactory, [addr(Wd), WdE, addr(We), Ax.addr, addr(Wx), Cx.addr])
    })

    test('T29 atRest and thirdParty over the owned rows: stored principal where owned and live, else A; both agree', async () => {
      const rows: { account: string; wallet: bigint; stored: string; expected: string }[] = [
        { account: addr(Wd), wallet: Wd.appId, stored: addr(Wd), expected: addr(Wd) },
        { account: WdE, wallet: Wd.appId, stored: addr(Wd), expected: addr(Wd) },
        { account: WdD, wallet: Wd.appId, stored: addr(Wd), expected: addr(Wd) },
        { account: Ax.addr.toString(), wallet: We.appId, stored: addr(We), expected: addr(We) },
        { account: Cx.addr.toString(), wallet: Wx.appId, stored: Cx.addr.toString(), expected: Cx.addr.toString() },
        { account: WxE, wallet: Wx.appId, stored: Cx.addr.toString(), expected: Cx.addr.toString() },
        // not owned: the account itself
        { account: victim.addr.toString(), wallet: Wd.appId, stored: addr(Wd), expected: victim.addr.toString() },
        { account: victim.addr.toString(), wallet: fake.appId, stored: victim.addr.toString(), expected: victim.addr.toString() },
        { account: WxE, wallet: fake.appId, stored: victim.addr.toString(), expected: WxE },
      ]
      // JSON.stringify throws on bigint (`wallet`), so the failure label serializes it as a string.
      const label = (row: object) => JSON.stringify(row, (_, v) => (typeof v === 'bigint' ? v.toString() : v))
      for (const row of rows) {
        expect(await probe.atRest({ args: row }), label(row)).toBe(row.expected)
        expect(await probe.thirdParty({ args: { account: row.account, wallet: row.wallet } }), label(row)).toBe(row.expected)
      }
      // a stored principal the wallet no longer controls is not returned
      expect(await probe.atRest({ args: { account: WdE, wallet: Wd.appId, stored: victim.addr.toString() } })).toBe(WdE)
      await assertUnregistered(universe.escrowFactory, [addr(Wd), WdE, WdD, addr(We), Ax.addr, addr(Wx), Cx.addr, WxE])
    })

    test('T30 pluginPrincipal(W) equals the first-hop target result in the same group, for every window kind', async () => {
      // resolveIn() puts TestPrincipalPlugin.principal(W) before the target call in the same group and
      // asserts equality (it also runs inside T06–T12 and T43).
      // parity alone cannot catch a bug shared by both sides, so every row also pins the values
      const rows: { win: Window; principal: string; spender: string }[] = [
        { win: { wallet: Wd }, principal: addr(Wd), spender: addr(Wd) },
        { win: { wallet: Wd, escrow: 'e' }, principal: addr(Wd), spender: WdE },
        { win: { wallet: Wd, type: CallerType.Other, by: dCaller }, principal: addr(Wd), spender: WdD },
        { win: { wallet: Wx }, principal: Cx.addr.toString(), spender: Cx.addr.toString() },
        // strict external-C live branch with S != C: authAddr(Cx) == Wx.address
        { win: { wallet: Wx, escrow: 'e' }, principal: Cx.addr.toString(), spender: WxE },
        { win: { wallet: We, escrow: 'x' }, principal: addr(We), spender: Ax.addr.toString() },
      ]
      for (const { win, principal, spender } of rows) {
        const p = await resolveIn(win, win.wallet.appId)
        expect(p, JSON.stringify({ wallet: win.wallet.appId.toString(), escrow: win.escrow })).toMatchObject({
          wallet: win.wallet.appId, principal, origin: principal, spender, viaPlugin: true,
        })
      }
      await assertUnregistered(universe.escrowFactory, [addr(Wd), WdE, WdD, addr(Wx), Cx.addr, WxE, addr(We), Ax.addr])
    })
  })

  // ---------------------------------------------------------------------------------------------
  describe('Resources and cost', () => {
    test('T31 Access-list preparer: T08 and T11 succeed; stripping A(W.address) / A(C) is recorded', async () => {
      // The default send path of this suite already runs through the SDK's central preparer
      // (akita-sdk installs it on import). Repeat explicitly through prepareGroup/sendPrepared.
      let nonce = 0
      const build = async (w: WalletSDK, escrow: string) => {
        nonce += 1
        const group = algorand.newGroup()
        group.addAppCallMethodCall(await w.client.params.arc58RekeyToPlugin({ ...send(deployer), args: { plugin: plugin.appId, type: CallerType.Global, escrow, methodOffsets: [], fundsRequest: [] }, extraFee: microAlgo(2_000) }))
        group.addAppCallMethodCall(await callProbe(w, w.appId))
        group.addAppCallMethodCall(await w.client.params.arc58VerifyAuthAddress({ ...send(deployer), args: {}, note: `t31-${nonce}` }))
        return group
      }
      type Ref = { address?: algosdk.Address; holding?: { address: algosdk.Address }; locals?: { address: algosdk.Address } }
      const strip = (prepared: Awaited<ReturnType<typeof prepareGroup>>, address: string) => {
        let removed = 0
        let stillReferenced = 0
        const transactions = prepared.transactions.map((txn) => {
          const copy = algosdk.decodeUnsignedTransaction(algosdk.encodeUnsignedTransaction(txn))
          copy.group = undefined
          const call = (copy as unknown as { applicationCall?: { access?: Ref[]; accounts?: algosdk.Address[] } }).applicationCall
          if (call?.access) {
            const before = call.access.length
            call.access = call.access.filter((ref) => ref.address?.toString() !== address)
            removed += before - call.access.length
            // a holding/locals entry naming the address would re-add it or make the encoding invalid
            stillReferenced += call.access.filter((ref) =>
              ref.holding?.address.toString() === address || ref.locals?.address.toString() === address).length
          }
          if (call?.accounts) {
            const before = call.accounts.length
            call.accounts = call.accounts.filter((a) => a.toString() !== address)
            removed += before - call.accounts.length
          }
          return copy
        })
        algosdk.assignGroupID(transactions)
        return { prepared: { ...prepared, transactions }, removed, stillReferenced }
      }
      const observe = async (label: string, w: WalletSDK, escrow: string, address: string) => {
        const prepared = await prepareGroup(await build(w, escrow))
        await sendPrepared(prepared, algorand.client.algod)
        const stripped = strip(await prepareGroup(await build(w, escrow)), address)
        // a 'success' with nothing stripped (or with the address still named elsewhere) would be meaningless
        expect(stripped.removed, `${label}: the preparer listed no A(${address}) entry to strip`).toBeGreaterThan(0)
        expect(stripped.stillReferenced, `${label}: a holding/locals entry still names ${address}`).toBe(0)
        let outcome = 'success'
        try {
          await sendPrepared(stripped.prepared, algorand.client.algod)
        } catch (error) {
          outcome = `rejected: ${(error as Error).message.slice(0, 300)}`
          expect((error as Error).message).toMatch(/unavailable|logic eval error|invalid/i)
        }
        // Observed behaviour, to be written back into PHASE-0-SPEC §3.6.
        console.info(`[T31] ${label}: removed ${stripped.removed} A(${address}) entries -> ${outcome}`)
      }
      await observe('T08 Wd escrow window', Wd, 'e', addr(Wd))
      const { w, C } = await makeWx(adminX, R2, [{ escrow: 'e' }])
      await w.client.send.arc58RekeyTo({ ...send(adminX), args: { address: flashE.addr.toString(), flash: false }, extraFee: microAlgo(1_000) })
      await observe('T11 Wx escrow window, C rekeyed away', w, 'e', C.addr.toString())
    })

    test('T32 opcode cost of strict resolution in the target is <= 210 (Kyle, 2026-10-04: measured 184-196)', async () => {
      const cost = async (win: Window) => {
        const [ret] = await inWindow(win, [
          await plugin.params.callProbeCost({ ...send(deployer), args: { wallet: win.wallet.appId, rekeyBack: true, probe: probe.appId, hint: win.wallet.appId }, extraFee: FEE }),
        ])
        return BigInt(ret as bigint)
      }
      const t06 = await cost({ wallet: Wd })
      const t08 = await cost({ wallet: Wd, escrow: 'e' })
      const { w } = await makeWx(adminX, R2, [{ escrow: 'e' }])
      await w.client.send.arc58RekeyTo({ ...send(adminX), args: { address: flashE.addr.toString(), flash: false }, extraFee: microAlgo(1_000) })
      const t11 = await cost({ wallet: w, escrow: 'e' })
      console.info(`[T32] principalOf opcode cost (incl. AkitaAppList read): T06=${t06} T08=${t08} T11=${t11}`)
      for (const c of [t06, t08, t11]) expect(c).toBeLessThanOrEqual(210n)
    })
  })

  // ---------------------------------------------------------------------------------------------
  describe('Non-wallet hints and type confusion', () => {
    test('T33 the origin-spoofing fake wallet, registered in the EscrowFactory, as hint: errHnwl', async () => {
      await expectContractError(inWindow({ wallet: Wd }, [await callProbe(Wd, fakeRegistered.appId)]), errHintNotWallet)
    })

    test('T34 a deleted app as hint (plain app, and a once-genuine wallet its forger deleted): errHnwl', async () => {
      for (const hint of [deletedApp, deletedWallet]) {
        await expectContractError(inWindow({ wallet: Wd }, [await callProbe(Wd, hint)]), errHintNotWallet)
      }
      expect(await probe.quote({ args: { wallet: deletedWallet } })).toBe(ZERO)
    })

    test('T35 forged globals: strict codes for missing/short values; uint64-typed values panic (caller-only harm)', async () => {
      const f = await makeForged()
      const A2 = await accountRekeyedTo(f.appAddress.toString())
      const direct = (method: 'callProbeAs' | 'callTryProbeAs') =>
        f.send[method]({ args: { probe: probe.appId, hint: f.appId, sender: f.appAddress.toString() }, extraFee: FEE })
      // plugin arm via a second hop: probe -> probe2 with hint f (callerApp = probe != f)
      const relay = () => probe.send.relay({ ...send(attacker), args: { target: probe2.appId, wallet: f.appId }, extraFee: FEE })
      const restore = async () => {
        await f.send.setBytes({ args: { key: KEY('controlled_address'), value: ADDRESS_BYTES(f.appAddress.toString()) } })
        await f.send.setBytes({ args: { key: KEY('referrer'), value: ADDRESS_BYTES(ZERO) } })
        await f.send.setBytes({ args: { key: KEY('spending_address'), value: ADDRESS_BYTES(ZERO) } })
      }

      await f.send.del({ args: { key: KEY('controlled_address') } })
      await expectContractError(direct('callProbeAs'), errInvalidWallet)
      expect(asPrincipal((await direct('callTryProbeAs')).return).wallet).toBe(0n)
      await restore()

      await f.send.setBytes({ args: { key: KEY('spending_address'), value: new Uint8Array(31) } })
      await expectContractError(relay(), errHintNotBound)
      await restore()

      await f.send.setUint({ args: { key: KEY('controlled_address'), value: 7n } })
      await expect(direct('callProbeAs')).rejects.toThrow(PANIC)
      await expect(direct('callTryProbeAs')).rejects.toThrow(PANIC)
      await expect(probe.thirdParty({ args: { account: A2.addr.toString(), wallet: f.appId } })).rejects.toThrow(PANIC)
      expect(await probe.quote({ args: { wallet: f.appId } })).toBe(ZERO) // quote does not read controlled_address
      await restore()

      await f.send.setUint({ args: { key: KEY('referrer'), value: 7n } })
      await expect(direct('callProbeAs')).rejects.toThrow(PANIC)
      await expect(probe.quote({ args: { wallet: f.appId } })).rejects.toThrow(PANIC)
      await restore()

      await f.send.setUint({ args: { key: KEY('spending_address'), value: 7n } })
      await expect(relay()).rejects.toThrow(PANIC)
      // the direct arm never reads spending_address
      expect(asPrincipal((await direct('callProbeAs')).return).principal).toBe(f.appAddress.toString())
    })

    test('T36 overloaded ARC-4 name (legacy-shim pattern): both selectors listed and callable', async () => {
      const methods = OverloadSpec.methods.filter((m) => m.name === 'm').map((m) => `${m.name}(${m.args.map((a) => a.type).join(',')})${m.returns.type}`)
      expect(methods.sort()).toEqual(['m(uint64)uint64', 'm(uint64,uint64)uint64'])
      const { appClient: overload } = await algorand.client.getTypedAppFactory(MockPrincipalOverloadFactory, { defaultSender: deployer.addr, defaultSigner: deployer.signer }).send.create.bare()
      expect((await overload.send.mUint64Uint64Uint64({ args: { value: 1n, wallet: 2n } })).return).toBe(3n)
      expect((await overload.send.mUint64Uint64({ args: { value: 5n } })).return).toBe(5n)
    })

    test('T37 a legitimate inner-composed window (composer is Wd\'s allowed caller) resolves as T06', async () => {
      const p = asPrincipal((await composer.send.compose({
        args: { wallet: Wd.appId, plugin: plugin.appId, probe: probe.appId, hintInWindow: Wd.appId },
        extraFee: microAlgo(20_000),
      })).return)
      expect(p).toEqual({ wallet: Wd.appId, principal: addr(Wd), origin: addr(Wd), spender: addr(Wd), referrer: R1, viaPlugin: true })
      await assertUnregistered(universe.escrowFactory, [addr(Wd)])
    })
  })

  // ---------------------------------------------------------------------------------------------
  describe('Gate context (ctx) forwarding', () => {
    const ctxOwnsIn = async (win: Window, hint: bigint, account: string, alsoThirdParty: boolean) => {
      const [ret] = await inWindow(win, [
        await plugin.params.callCtxOwns({ ...send(deployer), args: { wallet: win.wallet.appId, rekeyBack: true, probe: probe.appId, hint, account, alsoThirdParty }, extraFee: FEE }),
      ])
      return asCtxOwns(ret)
    }

    test('T38 E23: in Wd\'s default window its idle escrow is owned via ctx, while the at-rest liveness test fails', async () => {
      const r = await ctxOwnsIn({ wallet: Wd }, Wd.appId, WdE, true)
      expect(r.ctx).toEqual({ principal: addr(Wd), wallet: Wd.appId, spender: addr(Wd) })
      expect(r.owns).toBe(true)
      expect(r.thirdParty).toBe(WdE) // thirdParty(E, Wd) evaluated at the same point: NOT Wd.address
      await assertUnregistered(universe.escrowFactory, [addr(Wd), WdE])
    })

    test('T39 Wx default window: ctx owns Cx, ctx.wallet == Wx, quote(ctx.wallet) == R2', async () => {
      const r = await ctxOwnsIn({ wallet: Wx }, Wx.appId, Cx.addr.toString(), false)
      expect(r.owns).toBe(true)
      expect(r.ctx.wallet).toBe(Wx.appId)
      expect(await probe.quote({ args: { wallet: r.ctx.wallet } })).toBe(R2)
      await assertUnregistered(universe.escrowFactory, [addr(Wx), Cx.addr])
    })

    test('T40 escrow window: ctx owns the spender, not another wallet\'s account; a forged wallet cannot gift via a friend\'s ctx', async () => {
      const own = await ctxOwnsIn({ wallet: Wd, escrow: 'e' }, Wd.appId, WdE, false)
      expect(own.owns).toBe(true) // E == ctx.spender (E is rekeyed to P, not owned at rest)
      const other = await ctxOwnsIn({ wallet: Wd, escrow: 'e' }, Wd.appId, WxE, false)
      expect(other.owns).toBe(false)

      // Gifting attempt: the forger points f.controlled_address at the friend and owns A2 at rest.
      const f = await makeForged()
      await f.send.setBytes({ args: { key: KEY('controlled_address'), value: ADDRESS_BYTES(friend.addr.toString()) } })
      const A2 = await accountRekeyedTo(f.appAddress.toString())
      expect(await probe.owns({ args: { wallet: f.appId, account: A2.addr.toString() } })).toBe(true) // f owns A2 at rest
      // The friend acts through their OWN genuine wallet window (non-zero ctx.wallet): its ctx does not
      // own A2, because ctxOwns asks whether ctx.wallet (Wfr) owns A2, never what f's globals claim.
      const Wfr = await makeWd(friend)
      const fromFriend = await ctxOwnsIn({ wallet: Wfr }, Wfr.appId, A2.addr.toString(), true)
      expect(fromFriend.ctx).toEqual({ principal: addr(Wfr), wallet: Wfr.appId, spender: addr(Wfr) })
      expect(fromFriend.owns).toBe(false)
      expect(fromFriend.thirdParty).toBe(A2.addr.toString())
      // nor does the read-later path hand A2's identity to the friend
      expect(await probe.thirdParty({ args: { account: A2.addr.toString(), wallet: f.appId } })).toBe(A2.addr.toString())
      // and the forger's own verified ctx (direct arm) owns A2 but not the friend
      const forged = asPrincipal((await f.send.callProbeAs({ args: { probe: probe.appId, hint: f.appId, sender: f.appAddress.toString() }, extraFee: FEE })).return)
      expect(forged.principal).toBe(f.appAddress.toString()) // friend is not rekeyed to f: not live
      const forgerCtx = { principal: forged.principal, wallet: forged.wallet, spender: forged.spender }
      expect(await probe.ctxOwns({ args: { ctx: forgerCtx, account: A2.addr.toString() } })).toBe(true)
      expect(await probe.ctxOwns({ args: { ctx: forgerCtx, account: friend.addr.toString() } })).toBe(false)
      await assertUnregistered(universe.escrowFactory, [addr(Wd), WdE, WxE, addr(Wfr)])
    })
  })

  // ---------------------------------------------------------------------------------------------
  describe('Custody (E25) and factory pinning (E26)', () => {
    test('T41 negative control for §3.8 rule 3(b): a proxy left holding S lets any app attribute S to a forged wallet', async () => {
      // negative control: S41 is held by the NON-compliant proxy (as if left there after P returned)
      const S41 = await accountRekeyedTo(proxyNC.appAddress.toString())
      const f = await makeForged()
      await f.send.setBytes({ args: { key: KEY('spending_address'), value: ADDRESS_BYTES(S41.addr.toString()) } })
      const p = asPrincipal((await mockY.send.callProxy({ ...send(attacker), args: { proxy: proxyNC.appId, forgedWallet: f.appId, probe: probe.appId }, extraFee: FEE })).return)
      expect(p).toMatchObject({ wallet: f.appId, spender: S41.addr.toString(), principal: f.appAddress.toString(), viaPlugin: true })

      // AVM fact, NOT a property of MockCompliantProxy: a genuine window can only close through
      // verifyAuthAddress, which needs S back with W (T14b), so after it no proxy can send as S. The
      // same call through the NON-compliant proxy fails identically. The compliant proxy's own
      // guarantee is covered by T14 (S handed back) and T14b (keeping S cannot close the window).
      await inWindow({ wallet: Wd, escrow: 'e' }, [
        await plugin.params.proxyProbe({ ...send(deployer), args: { wallet: Wd.appId, rekeyBack: true, proxy: proxyC.appId, probe: probe.appId, hint: Wd.appId }, extraFee: FEE }),
      ])
      const g = await makeForged()
      await g.send.setBytes({ args: { key: KEY('spending_address'), value: ADDRESS_BYTES(WdE) } })
      for (const proxy of [proxyC.appId, proxyNC.appId]) {
        await expect(mockY.send.callProxy({ ...send(attacker), args: { proxy, forgedWallet: g.appId, probe: probe.appId }, extraFee: FEE }))
          .rejects.toThrow(/authoriz/i)
      }
    })

    test('T42 standing custody: the compliant guard rejects a forged wallet naming H; the unsafe variant does not', async () => {
      const H = await accountRekeyedTo(custody.appAddress.toString())
      await custody.send.init({ args: { held: H.addr.toString() } })
      const f = await makeForged()
      await f.send.setBytes({ args: { key: KEY('spending_address'), value: ADDRESS_BYTES(H.addr.toString()) } })
      await expectContractError(custody.send.act({ ...send(attacker), args: { wallet: f.appId, probe: probe.appId, hint: f.appId }, extraFee: FEE }), 'errCsgd')
      const p = asPrincipal((await custody.send.actUnsafe({ ...send(attacker), args: { wallet: f.appId, probe: probe.appId, hint: f.appId }, extraFee: FEE })).return)
      expect(p).toMatchObject({ wallet: f.appId, spender: H.addr.toString(), viaPlugin: true })
    })

    test('T43 a wallet admin repointing akita_dao at a fake DAO changes nothing for a pinned consumer', async () => {
      const w = await makeWd(adminD, R1)
      await w.client.send.setAkitaDao({ ...send(adminD), args: { akitaDao: fakeDAO.appId } })
      // the probe pins F from its own DAO: the wallet still resolves
      const p = await resolveIn({ wallet: w }, w.appId)
      expect(p.principal).toBe(addr(w))
      // a rogue-factory child is not genuine for the pinned factory
      const rogue = (await fakeDAO.send.spawn({ args: { controlledAddress: victim.addr.toString(), referrer: attacker.addr.toString(), spendingAddress: ZERO }, extraFee: microAlgo(1_000) })).return!
      await expectContractError(probe.send.pinnedFactoryProbe({ ...send(attacker), args: { wallet: rogue } }), errHintNotWallet)
      // negative control: taking F from W.akita_dao would accept the rogue child
      const unpinned = await probe.unpinnedFactory({ args: { wallet: w.appId } })
      expect(unpinned).toBe(fakeDAO.appId)
      expect(await probe.genuineFor({ args: { wallet: rogue, factory: unpinned } })).toBe(true)
      expect(await probe.pinnedFactory()).toBe(universe.walletFactory.appId)
    })

    test('T44 flash rekeyTo(E, true) returned by pay C->C rekeyTo W.address passes (Q2 regression guard)', async () => {
      const { w, C } = await makeWx(adminX, R2)
      const group = algorand.newGroup()
      group.addAppCallMethodCall(await w.client.params.arc58RekeyTo({ ...send(adminX), args: { address: flashE.addr.toString(), flash: true }, extraFee: microAlgo(1_000) }))
      group.addPayment({ sender: C.addr, signer: flashE.signer, receiver: C.addr, amount: microAlgo(0), rekeyTo: w.client.appAddress })
      await group.send({ populateAppCallResources: true })
      expect((await algorand.account.getInformation(C.addr)).authAddr?.toString()).toBe(addr(w))
    })

    test('T45 ctxOwns / atRest with a deleted, fake or nonexistent wallet: false / A, no panic', async () => {
      const A = victim.addr.toString()
      const attackerCtx = (wallet: bigint) => ({ principal: attacker.addr.toString(), wallet, spender: attacker.addr.toString() })
      for (const wallet of [deletedApp, deletedWallet, fake.appId, NONEXISTENT_APP]) {
        expect(await probe.ctxOwns({ args: { ctx: attackerCtx(wallet), account: A } })).toBe(false)
        expect(await probe.atRest({ args: { account: A, wallet, stored: attacker.addr.toString() } })).toBe(A)
        expect(await probe.owns({ args: { wallet, account: A } })).toBe(false)
      }
      // Accounts REALLY rekeyed to the non-wallet / deleted app: only the genuineness check rejects these.
      const Af = await accountRekeyedTo(fake.appAddress.toString())
      const rekeyed: { wallet: bigint; account: string; walletAddress: string }[] = [
        { wallet: fake.appId, account: Af.addr.toString(), walletAddress: fake.appAddress.toString() },
        { wallet: deletedWallet, account: AdW.addr.toString(), walletAddress: deletedWalletAddress },
      ]
      for (const { wallet, account, walletAddress } of rekeyed) {
        expect(await probe.owns({ args: { wallet, account } })).toBe(false)
        // the stored pair (W, W.address) recorded while W was honest no longer yields W.address
        expect(await probe.atRest({ args: { account, wallet, stored: walletAddress } })).toBe(account)
        expect(await probe.ctxOwns({ args: { ctx: attackerCtx(wallet), account } })).toBe(false)
        expect(await probe.thirdParty({ args: { account, wallet } })).toBe(account)
      }
    })

    test('T46 a stored pair survives forged type confusion: atRest and ctxOwns read no wallet globals', async () => {
      const f = await makeForged()
      const stored = asPrincipal((await f.send.callProbeAs({ args: { probe: probe.appId, hint: f.appId, sender: f.appAddress.toString() }, extraFee: FEE })).return)
      expect(stored.principal).toBe(f.appAddress.toString())
      const A2 = await accountRekeyedTo(f.appAddress.toString())
      await f.send.setUint({ args: { key: KEY('controlled_address'), value: 7n } })
      await f.send.del({ args: { key: KEY('referrer') } })
      await f.send.setBytes({ args: { key: KEY('spending_address'), value: new Uint8Array(31) } })
      expect(await probe.atRest({ args: { account: A2.addr.toString(), wallet: f.appId, stored: stored.principal } })).toBe(f.appAddress.toString())
      expect(await probe.ctxOwns({ args: { ctx: { principal: stored.principal, wallet: f.appId, spender: stored.spender }, account: A2.addr.toString() } })).toBe(true)
      expect(await probe.owns({ args: { wallet: f.appId, account: A2.addr.toString() } })).toBe(true)
      // ... until the forger deletes f: the pair then degrades to the account itself, still without a panic
      await f.send.delete.destroy({ args: {} })
      expect(await probe.atRest({ args: { account: A2.addr.toString(), wallet: f.appId, stored: stored.principal } })).toBe(A2.addr.toString())
      expect(await probe.ctxOwns({ args: { ctx: { principal: stored.principal, wallet: f.appId, spender: stored.spender }, account: A2.addr.toString() } })).toBe(false)
      expect(await probe.owns({ args: { wallet: f.appId, account: A2.addr.toString() } })).toBe(false)
      await expectContractError(inWindow({ wallet: Wd }, [await callProbe(Wd, f.appId)]), errHintNotWallet)
    })

    test('T47 negative control for §3.8 rule 6: a plugin that forwards a caller-chosen hint lets a forged wallet claim an honest window', async () => {
      // Wf claims Wd's spending account and an attacker account A it really controls (A rekeyed to Wf).
      const f = await makeForged()
      const A = await accountRekeyedTo(f.appAddress.toString())
      await f.send.setBytes({ args: { key: KEY('spending_address'), value: ADDRESS_BYTES(addr(Wd)) } })
      await f.send.setBytes({ args: { key: KEY('controlled_address'), value: ADDRESS_BYTES(A.addr.toString()) } })
      await f.send.setBytes({ args: { key: KEY('referrer'), value: ADDRESS_BYTES(attacker.addr.toString()) } })
      // NON-compliant plugin method (callProbe forwards the caller's hint) inside Wd's honest default
      // window: the target attributes Wd.address's action to A, with the forger's referrer.
      const [stolen] = await inWindow({ wallet: Wd }, [await callProbe(Wd, f.appId)])
      expect(asPrincipal(stolen)).toEqual({
        wallet: f.appId, principal: A.addr.toString(), origin: A.addr.toString(), spender: addr(Wd), referrer: attacker.addr.toString(), viaPlugin: true,
      })
      // the same in an escrow window (spending_address = the open escrow)
      await f.send.setBytes({ args: { key: KEY('spending_address'), value: ADDRESS_BYTES(WdE) } })
      const [stolenE] = await inWindow({ wallet: Wd, escrow: 'e' }, [await callProbe(Wd, f.appId)])
      expect(asPrincipal(stolenE)).toMatchObject({ wallet: f.appId, principal: A.addr.toString(), spender: WdE, viaPlugin: true })
      // COMPLIANT plugin method: the hint is windowHint(wallet) == Wd, so no caller can redirect it.
      for (const win of [{ wallet: Wd }, { wallet: Wd, escrow: 'e' }] as Window[]) {
        const [own] = await inWindow(win, [
          await plugin.params.callProbeWindow({ ...send(attacker), args: { wallet: Wd.appId, rekeyBack: true, probe: probe.appId }, extraFee: FEE }),
        ])
        expect(asPrincipal(own)).toEqual({
          wallet: Wd.appId, principal: addr(Wd), origin: addr(Wd), spender: win.escrow ? WdE : addr(Wd), referrer: R1, viaPlugin: true,
        })
      }
    })
  })

  // ---------------------------------------------------------------------------------------------
  describe('functions.ts wrappers: tipWallet, gateCheckCtx, pluginPrincipal error paths', () => {
    test('T48 tipWallet: live honest wallets route tips; held, unowned, rekeyed-away, forged, fake and deleted cases give 0', async () => {
      const tip = async (creator: string, stored: bigint) => BigInt(await probe.tipWalletOf({ args: { creator, stored } }))
      expect(await tip(addr(Wd), Wd.appId)).toBe(Wd.appId) // C == W.address == creator
      expect(await tip(WdE, Wd.appId)).toBe(Wd.appId) // idle escrow creator, C = W.address un-rekeyed
      expect(await tip(Cx.addr.toString(), Wx.appId)).toBe(Wx.appId) // external C == creator
      expect(await tip(addr(Wd), 0n)).toBe(0n)
      expect(await tip(victim.addr.toString(), Wd.appId)).toBe(0n) // not owned at rest
      expect(await tip(victim.addr.toString(), fake.appId)).toBe(0n)
      const Af = await accountRekeyedTo(fake.appAddress.toString())
      expect(await tip(Af.addr.toString(), fake.appId)).toBe(0n) // owned by a NON-wallet app
      expect(await tip(AdW.addr.toString(), deletedWallet)).toBe(0n) // deleted once-genuine wallet
      // E23: inside Wd's own default window, Wd.address is held by the plugin: direct tip
      const [held] = await inWindow({ wallet: Wd }, [
        await plugin.params.callTipWallet({ ...send(deployer), args: { wallet: Wd.appId, rekeyBack: true, probe: probe.appId, creator: addr(Wd), stored: Wd.appId }, extraFee: FEE }),
      ])
      expect(BigInt(held as bigint)).toBe(0n)
      // T11 state: C rekeyed away, the creator is the (still owned) escrow: not live, direct tip
      const { w } = await makeWx(adminX, R2, [{ escrow: 'e' }])
      const escrow = (await w.client.state.box.escrows.value('e'))!.address
      expect(await tip(escrow, w.appId)).toBe(w.appId)
      await w.client.send.arc58RekeyTo({ ...send(adminX), args: { address: flashE.addr.toString(), flash: false }, extraFee: microAlgo(1_000) })
      expect(await tip(escrow, w.appId)).toBe(0n)
      // forged creator wallets: short, missing, or a controlled_address it does not control
      const f = await makeForged()
      const creator = f.appAddress.toString()
      expect(await tip(creator, f.appId)).toBe(f.appId)
      await f.send.setBytes({ args: { key: KEY('controlled_address'), value: new Uint8Array(31) } })
      expect(await tip(creator, f.appId)).toBe(0n)
      await f.send.del({ args: { key: KEY('controlled_address') } })
      expect(await tip(creator, f.appId)).toBe(0n)
      await f.send.setBytes({ args: { key: KEY('controlled_address'), value: ADDRESS_BYTES(victim.addr.toString()) } })
      expect(await tip(creator, f.appId)).toBe(0n)
      // R-CREATOR (documented): a uint64-typed controlled_address panics, harming only the creator
      await f.send.setUint({ args: { key: KEY('controlled_address'), value: 7n } })
      await expect(tip(creator, f.appId)).rejects.toThrow(PANIC)
    })

    test('T49 gateCheckCtx accepts exactly [selector(mustCheckFor), encode(ctx), itob(id), args] as a NoOp call to the DAO gate', async () => {
      // A probe whose DAO names an approve-all stand-in gate (Gate v2 mustCheckFor lands in the Gate track).
      const approveAll = await algorand.app.compileTeal('#pragma version 10\npushint 1\nreturn')
      const createApp = async () => (await algorand.send.appCreate({
        ...send(deployer), approvalProgram: approveAll.compiledBase64ToBytes, clearStateProgram: approveAll.compiledBase64ToBytes,
      })).appId
      const gate = await createApp()
      const otherApp = await createApp()
      const gateDAO = (await algorand.client.getTypedAppFactory(MockFakeDaoFactory, { defaultSender: deployer.addr, defaultSigner: deployer.signer }).send.create.create({ args: {} })).appClient
      await gateDAO.send.setGate({ args: { gate } })
      const probeG = (await algorand.client.getTypedAppFactory(MockPrincipalProbeFactory, { defaultSender: deployer.addr, defaultSigner: deployer.signer })
        .send.create.create({ args: { akitaDao: gateDAO.appId } })).appClient

      const ctxType = algosdk.ABIType.from('(address,uint64,address)')
      const encodeCtx = (c: Ctx) => ctxType.encode([c.principal, c.wallet, c.spender])
      const selector = (signature: string) => algosdk.ABIMethod.fromSignature(signature).getSelector()
      const MUST_CHECK_FOR = 'mustCheckFor((address,uint64,address),uint64,byte[][])void'
      const noArgs = algosdk.ABIType.from('byte[][]').encode([])
      const ctx: Ctx = { principal: attacker.addr.toString(), wallet: 0n, spender: attacker.addr.toString() }
      const id = 7n
      let nonce = 0
      const check = async (opts: { app?: bigint; appArgs?: Uint8Array[]; onComplete?: algosdk.OnApplicationComplete.NoOpOC | algosdk.OnApplicationComplete.OptInOC }) => {
        nonce += 1
        const gateTxn = await algorand.createTransaction.appCall({
          sender: attacker.addr, appId: opts.app ?? gate, onComplete: opts.onComplete ?? algosdk.OnApplicationComplete.NoOpOC,
          args: opts.appArgs ?? [selector(MUST_CHECK_FOR), encodeCtx(ctx), algosdk.encodeUint64(id), noArgs], note: `t49-${nonce}`,
        })
        return (await probeG.send.gateCheckCtxOf({ ...send(attacker), args: { gateTxn: { txn: gateTxn, signer: attacker.signer }, ctx, id } })).return
      }
      expect(await check({})).toBe(true)
      const other: Ctx = { ...ctx, principal: victim.addr.toString() }
      const rows: [string, Parameters<typeof check>[0]][] = [
        ['ctx of another principal', { appArgs: [selector(MUST_CHECK_FOR), encodeCtx(other), algosdk.encodeUint64(id), noArgs] }],
        ['ctx with a wallet', { appArgs: [selector(MUST_CHECK_FOR), encodeCtx({ ...ctx, wallet: Wd.appId }), algosdk.encodeUint64(id), noArgs] }],
        ['another gate id', { appArgs: [selector(MUST_CHECK_FOR), encodeCtx(ctx), algosdk.encodeUint64(id + 1n), noArgs] }],
        ['legacy mustCheck selector', { appArgs: [selector('mustCheck(address,uint64,byte[][])void'), encodeCtx(ctx), algosdk.encodeUint64(id), noArgs] }],
        ['3 app args', { appArgs: [selector(MUST_CHECK_FOR), encodeCtx(ctx), algosdk.encodeUint64(id)] }],
        ['5 app args', { appArgs: [selector(MUST_CHECK_FOR), encodeCtx(ctx), algosdk.encodeUint64(id), noArgs, noArgs] }],
        ['another app', { app: otherApp }],
        ['OptIn', { onComplete: algosdk.OnApplicationComplete.OptInOC }],
      ]
      for (const [label, opts] of rows) expect(await check(opts), label).toBe(false)
    })

    test('T50 pluginPrincipal error paths: fake / deleted wallet errHnwl, short spending errHnbd, S not held by the plugin errNath', async () => {
      const principalOf = (wallet: bigint) => plugin.send.principal({ ...send(attacker), args: { wallet } })
      await expectContractError(principalOf(fake.appId), errHintNotWallet)
      await expectContractError(principalOf(deletedWallet), errHintNotWallet)
      // outside any window: spending_address is the zero address, which the plugin does not hold
      await expectContractError(principalOf(Wd.appId), errPluginNotAuthAddr)
      const f = await makeForged()
      await f.send.setBytes({ args: { key: KEY('spending_address'), value: ADDRESS_BYTES(victim.addr.toString()) } })
      await expectContractError(principalOf(f.appId), errPluginNotAuthAddr)
      await f.send.setBytes({ args: { key: KEY('spending_address'), value: new Uint8Array(31) } })
      await expectContractError(principalOf(f.appId), errHintNotBound)
      await f.send.del({ args: { key: KEY('spending_address') } })
      await expectContractError(principalOf(f.appId), errHintNotBound)
    })
  })
})

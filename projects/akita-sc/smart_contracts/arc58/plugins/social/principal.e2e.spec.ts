/**
 * Principal resolution, social track: the NEW social plugin version in wallet windows
 * (docs/principal-resolution/PHASE-0-SPEC.md §6.2, §6.3, §6.11; Q4, Q5; P2-SOC-03, P2-SOC-04,
 * P2-GATE-01, P2-GATE-02).
 *
 * Every wallet here is factory-created and NEVER registered in the EscrowFactory (tests/fixtures/
 * unregistered-wallet.ts), so each passing case proves the path needs no registry:
 * - initMeta stores the VERIFIED wallet (`principalOf(dao, windowHint(wallet)).wallet`) for default,
 *   escrow and external-controlled windows;
 * - referrals reach the wallet's referrer (the legacy registry lookup found none for these wallets);
 * - gate subjects are the verified context (`Gate.mustCheckFor` + `gateCheckCtx`), so context-aware
 *   sub-gates see the window's wallet even inside its own default window (E23);
 * - social state stays keyed by the spender (Q5), so a social sub-gate evaluates the principal's own
 *   activity, not the escrow's (E28);
 * - creator tips route through `tipWallet`, so a meta whose wallet lost the creator no longer blocks tips.
 */
import * as algokit from '@algorandfoundation/algokit-utils'
import { microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import type { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import type { PluginSDKReturn } from 'akita-sdk'
import { GateSDK, LogicalOperator, Operator } from 'akita-sdk/gates'
import { RefType, SocialSDK } from 'akita-sdk/social'
import { CallerType, SocialPluginSDK, WalletSDK } from 'akita-sdk/wallet'
import algosdk, { ABIType } from 'algosdk'
import { beforeAll, describe, expect, test } from 'vitest'
import { AkitaUniverse, buildAkitaUniverse } from '../../../../tests/fixtures/dao'
import { addRawPlugin, assertUnregistered, newUnregisteredWallet, rekeyToWallet } from '../../../../tests/fixtures/unregistered-wallet'
import { errFailedGate, errInvalidPayment } from '../../../social/errors'
import { deployDeployedSocialPlugin } from './deployed/deploy'

algokit.Config.configure({ populateAppCallResources: true })

const fixture = algorandFixture()
const INTERVAL = 3_600n

describe('Social plugin (principal-resolution version) in unregistered wallets', () => {
  let algorand: algokit.AlgorandClient
  let deployer: TransactionSignerAccount
  let poster: TransactionSignerAccount
  let universe: AkitaUniverse
  let plugin: SocialPluginSDK
  let posterSdk: SocialSDK
  let gate: GateSDK
  let akta: bigint
  let postFee: bigint
  let reactFee: bigint
  let daoEscrow: string
  let R1: string
  let R2: string

  const send = (a: TransactionSignerAccount) => ({ sender: a.addr, signer: a.signer })
  const addr = (w: WalletSDK) => w.client.appAddress.toString()
  let seed = 40
  const bytes = (length: number) => new Uint8Array(length).fill(seed++ % 250)
  const chainTime = async () => {
    const status = await algorand.client.algod.status().do()
    return BigInt((await algorand.client.algod.block(status.lastRound).do()).block.header.timestamp)
  }
  const aktaOf = async (a: string) => (await algorand.asset.getAccountInformation(a, akta)).balance
  const metaWallet = async (user: string) => (await posterSdk.getMeta({ user })).wallet

  type Opts = { referrer?: string; escrow?: string; controlled?: TransactionSignerAccount; aktaForMain?: boolean; extraPlugins?: bigint[] }
  /** Unregistered wallet with the admin's own default grant of the new social plugin (+ an escrow grant). */
  async function makeWallet(nickname: string, opts: Opts = {}): Promise<{ w: WalletSDK; escrow?: string }> {
    const w = await newUnregisteredWallet({
      walletFactory: universe.walletFactory, ...send(deployer), nickname, referrer: opts.referrer, fund: (20).algo(),
      ...(opts.controlled ? { controlledAddress: opts.controlled.addr.toString(), controlledSigner: opts.controlled.signer } : {}),
    })
    await addRawPlugin(w, { plugin: plugin.appId, ownerOnly: true }, send(deployer))
    for (const extra of opts.extraPlugins ?? []) await addRawPlugin(w, { plugin: extra, ownerOnly: true }, send(deployer))
    let escrow: string | undefined
    if (opts.escrow) {
      await addRawPlugin(w, { plugin: plugin.appId, ownerOnly: true, escrow: opts.escrow }, send(deployer))
      escrow = (await w.client.state.box.escrows.value(opts.escrow))!.address
      await w.client.send.arc58OptInEscrow({ ...send(deployer), args: { escrow: opts.escrow, assets: [akta] }, extraFee: microAlgo(5_000), populateAppCallResources: true })
      await algorand.send.payment({ ...send(deployer), receiver: escrow, amount: (5).algo() })
      await algorand.send.assetTransfer({ ...send(deployer), receiver: escrow, assetId: akta, amount: postFee * 5n + reactFee * 10n })
    }
    if (opts.aktaForMain) {
      await addRawPlugin(w, { plugin: universe.selfOptInPlugin.appId, ownerOnly: true }, send(deployer))
      await w.usePlugin({ callerType: CallerType.Admin, calls: [universe.selfOptInPlugin.optIn({ assets: [akta] })] })
      await algorand.send.assetTransfer({ ...send(deployer), receiver: addr(w), assetId: akta, amount: postFee * 5n + reactFee * 10n })
    }
    return { w, escrow }
  }

  const inWindow = (w: WalletSDK, call: PluginSDKReturn, escrow = '') => w.usePlugin({ escrow, callerType: CallerType.Admin, calls: [call] })
  const initMeta = (user: string) => plugin.initMeta({ user, automated: false, subscriptionIndex: 0n, nfd: 0n, akitaNft: 0n })
  const post = async (gateId = 0n) => plugin.post({ timestamp: await chainTime(), nonce: bytes(24), cid: bytes(36), gateId, usePayWall: false, payWallId: 0n, creatorFlags: 0n })
  const gatedReply = async (ref: Uint8Array, args: Uint8Array[]) => plugin.gatedReply({
    timestamp: await chainTime(), nonce: bytes(24), cid: bytes(36), ref, type: RefType.Post, gateId: 0n, args,
    usePayWall: false, payWallId: 0n, creatorFlags: 0n,
  })
  /** `SocialPluginSDK.setMetaWallet` (its send params carry the SDK's default maxFee, which covers the inner call). */
  const setMetaWallet = (p: SocialPluginSDK): PluginSDKReturn => p.setMetaWallet({})
  const postWithGate = async (gateId: bigint) => (await posterSdk.post({ cid: bytes(36), gateId })).postKey

  beforeAll(async () => {
    await fixture.newScope()
    algorand = fixture.context.algorand
    const dispenser = await algorand.account.dispenserFromEnvironment()
    deployer = await fixture.context.generateAccount({ initialFunds: microAlgo(2_000_000_000) })
    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (3_000).algo())
    poster = await fixture.context.generateAccount({ initialFunds: (200).algo() })
    // referrers may be any address; they are opted into AKTA only so the disbursement checks stay simple
    const referrer1 = await fixture.context.generateAccount({ initialFunds: (1).algo() })
    const referrer2 = await fixture.context.generateAccount({ initialFunds: (1).algo() })
    R1 = referrer1.addr.toString()
    R2 = referrer2.addr.toString()

    universe = await buildAkitaUniverse({ fixture, sender: deployer.addr, signer: deployer.signer, apps: {} })
    plugin = universe.socialPlugin
    akta = universe.aktaAssetId
    try {
      await universe.social.init()
    } catch {
      // already opted in by the universe
    }
    ;({ postFee, reactFee } = await universe.social.getSocialFees())
    const escrowConfig = (await universe.social.socialClient.state.global.akitaDaoEscrow())!
    daoEscrow = algosdk.getApplicationAddress(escrowConfig.app).toString()

    for (const who of [poster, referrer1, referrer2]) await algorand.send.assetOptIn({ ...send(who), assetId: akta })
    await algorand.send.assetTransfer({ ...send(deployer), receiver: poster.addr, assetId: akta, amount: postFee * 20n + reactFee * 20n })
    posterSdk = new SocialSDK({
      algorand,
      daoAppId: universe.dao.client.appId,
      socialFactoryParams: { appId: universe.social.socialAppId, defaultSender: poster.addr, defaultSigner: poster.signer },
      graphFactoryParams: { appId: universe.social.graphAppId, defaultSender: poster.addr, defaultSigner: poster.signer },
      impactFactoryParams: { appId: universe.social.impactAppId, defaultSender: poster.addr, defaultSigner: poster.signer },
      moderationFactoryParams: { appId: universe.social.moderationAppId, defaultSender: poster.addr, defaultSigner: poster.signer },
    })
    await posterSdk.initMeta({})

    gate = new GateSDK({
      algorand,
      factoryParams: { appId: universe.gate.appId, defaultSender: deployer.addr, defaultSigner: deployer.signer },
      gateRegistry: {
        akita_referrer: universe.subgates.akitaReferrerGate.appId,
        subscription: universe.subgates.subscriptionGate.appId,
        social_activity: universe.subgates.socialActivityGate.appId,
      },
    })
  }, 900_000)

  test('initMeta stores the verified wallet for default, escrow and external-controlled windows (no registry)', async () => {
    const { w: Wd, escrow: E } = await makeWallet('meta-wd', { escrow: 'e' })
    const Cx = await fixture.context.generateAccount({ initialFunds: (10).algo() })
    const { w: Wx } = await makeWallet('meta-wx', { controlled: Cx })

    await inWindow(Wd, initMeta(addr(Wd)))
    await inWindow(Wd, initMeta(E!), 'e')
    await inWindow(Wx, initMeta(Cx.addr.toString()))

    // S-02: the meta is keyed by the spender of each window
    expect(await metaWallet(addr(Wd))).toBe(Wd.client.appId)
    expect(await metaWallet(E!)).toBe(Wd.client.appId)
    expect(await metaWallet(Cx.addr.toString())).toBe(Wx.client.appId)
    await assertUnregistered(universe.escrowFactory, [addr(Wd), E!, addr(Wx), Cx.addr])
  })

  test('referrals reach the wallet referrer without the registry; the post stays keyed by the spender (Q5)', async () => {
    const { w: Wr, escrow: E } = await makeWallet('ref-wr', { referrer: R1, escrow: 'e', aktaForMain: true })
    const { w: Wn } = await makeWallet('ref-wn', { aktaForMain: true })
    await inWindow(Wr, initMeta(addr(Wr)))
    await inWindow(Wr, initMeta(E!), 'e')
    await inWindow(Wn, initMeta(addr(Wn)))

    // no referrer: the whole post fee reaches the DAO escrow
    let before = await aktaOf(daoEscrow)
    await inWindow(Wn, await post())
    expect((await aktaOf(daoEscrow)) - before).toBe(postFee)

    // referred default window: the referral cut is taken (exact MBR quote, or the call would revert)
    before = await aktaOf(daoEscrow)
    await inWindow(Wr, await post())
    const referred = (await aktaOf(daoEscrow)) - before
    expect(referred).toBeLessThan(postFee)

    // referred ESCROW window: same verified referrer; the post's creator is the escrow (spender)
    before = await aktaOf(daoEscrow)
    const timestamp = await chainTime()
    const nonce = bytes(24)
    await inWindow(Wr, plugin.post({ timestamp, nonce, cid: bytes(36), gateId: 0n, usePayWall: false, payWallId: 0n, creatorFlags: 0n }), 'e')
    expect((await aktaOf(daoEscrow)) - before).toBe(referred)
    expect((await posterSdk.getPost({ ref: posterSdk.computePostKey(E!, timestamp, nonce) })).creator).toBe(E!)

    // reply, up-vote and react through the referred window: the plugin's referral quotes match the target exactly
    const { postKey } = await posterSdk.post({ cid: bytes(36) })
    await inWindow(Wr, plugin.reply({ timestamp: await chainTime(), nonce: bytes(24), cid: bytes(36), ref: postKey, type: RefType.Post, gateId: 0n, usePayWall: false, payWallId: 0n, creatorFlags: 0n }))
    await inWindow(Wr, plugin.vote({ ref: postKey, type: RefType.Post, isUp: true }))
    expect((await posterSdk.getVote({ account: addr(Wr), ref: postKey })).isUp).toBe(true)
    await assertUnregistered(universe.escrowFactory, [addr(Wr), E!, addr(Wn)])
  })

  test('P2-SOC-03: setMetaWallet through the new plugin rebinds a meta the legacy path stored with wallet 0', async () => {
    const legacyPlugin = await deployDeployedSocialPlugin({ algorand, ...send(deployer), akitaDao: universe.dao.client.appId })
    const { w: Wb } = await makeWallet('backfill-wb', { extraPlugins: [legacyPlugin.appId] })

    // the deployed plugin calls the legacy initMeta shim, which asks the registry: unregistered -> 0
    await inWindow(Wb, legacyPlugin.initMeta({ user: addr(Wb), automated: false, subscriptionIndex: 0n, nfd: 0n, akitaNft: 0n }))
    expect(await metaWallet(addr(Wb))).toBe(0n)

    await inWindow(Wb, setMetaWallet(plugin))
    expect(await metaWallet(addr(Wb))).toBe(Wb.client.appId)
    await assertUnregistered(universe.escrowFactory, [addr(Wb)])
  })

  describe('gate subject = verified context (Q4)', () => {
    test('P2-GATE-02: an external controlled address passes a referrer gate through ctx.wallet; another wallet does not', async () => {
      const referrerGate = (await gate.register({
        ...send(deployer),
        args: [{ type: 'akita_referrer', appId: universe.subgates.akitaReferrerGate.appId, layer: 0n, logicalOperator: LogicalOperator.None, referrer: R2 }],
      })).return!
      const parent = await postWithGate(referrerGate)

      const Cx = await fixture.context.generateAccount({ initialFunds: (20).algo() })
      await algorand.send.assetOptIn({ ...send(Cx), assetId: akta })
      await algorand.send.assetTransfer({ ...send(deployer), receiver: Cx.addr, assetId: akta, amount: reactFee * 10n })
      const { w: Wx } = await makeWallet('gate-wx', { referrer: R2, controlled: Cx })
      await inWindow(Wx, initMeta(Cx.addr.toString()))
      await inWindow(Wx, await gatedReply(parent, [new Uint8Array()]))

      const { w: Wd } = await makeWallet('gate-wd-r1', { referrer: R1, aktaForMain: true })
      await inWindow(Wd, initMeta(addr(Wd)))
      await expect(inWindow(Wd, await gatedReply(parent, [new Uint8Array()]))).rejects.toThrow(new RegExp(errFailedGate))
      await assertUnregistered(universe.escrowFactory, [addr(Wx), Cx.addr, addr(Wd)])
    })

    test("P2-GATE-01: a subscription held by an account Wd owns at rest passes inside Wd's own default window (E23)", async () => {
      const merchant = await fixture.context.generateAccount({ initialFunds: (300).algo() })
      const serviceId = await universe.subscriptions.newService({
        ...send(merchant), interval: INTERVAL, asset: 0n, amount: 1_000_000n, passes: 0n, gateId: 0n,
        payoutAddress: merchant.addr.toString(), title: 'Principal', description: 'principal tier',
        bannerImage: new Uint8Array(36).fill(120), highlightMessage: 0, highlightColor: '#112233',
      })
      const subscriptionGate = (await gate.register({
        ...send(deployer),
        args: [{ type: 'subscription', appId: universe.subgates.subscriptionGate.appId, layer: 0n, logicalOperator: LogicalOperator.None, merchant: merchant.addr.toString(), serviceId }],
      })).return!
      const parent = await postWithGate(subscriptionGate)

      const { w: Wd } = await makeWallet('gate-wd-sub', { aktaForMain: true })
      await inWindow(Wd, initMeta(addr(Wd)))
      // subscriber A subscribes as an EOA, then is rekeyed to Wd.address (an account Wd owns at rest)
      const a = await fixture.context.generateAccount({ initialFunds: (20).algo() })
      const subA = await universe.subscriptions.subscribe({
        ...send(a), asset: 0n, amount: 1_000_000n, interval: INTERVAL, recipient: merchant.addr.toString(), serviceId, initialDepositAmount: 3_000_000n,
      })
      await rekeyToWallet(algorand, Wd, send(a))
      const subArgs = ABIType.from('(address,uint64)').encode([a.addr.toString(), subA])

      // the gate runs while Wd.address is still rekeyed to the plugin: only the forwarded ctx can see A
      await inWindow(Wd, await gatedReply(parent, [subArgs]))

      // another genuine wallet presenting the same subscription does not own A
      const { w: Wz } = await makeWallet('gate-wz-sub', { aktaForMain: true })
      await inWindow(Wz, initMeta(addr(Wz)))
      await expect(inWindow(Wz, await gatedReply(parent, [subArgs]))).rejects.toThrow(new RegExp(errFailedGate))
      await assertUnregistered(universe.escrowFactory, [addr(Wd), a.addr, addr(Wz)])
    })

    test("P2-SOC-04 (E28): a social-activity gate reads the principal's activity, not the escrow's (Q4 + Q5)", async () => {
      const activityGate = (await gate.register({
        ...send(deployer),
        args: [{ type: 'social_activity', appId: universe.subgates.socialActivityGate.appId, layer: 0n, logicalOperator: LogicalOperator.None, op: Operator.GreaterThanOrEqualTo, value: 86_400n }],
      })).return!
      const parent = await postWithGate(activityGate)

      const { w: Wa, escrow: E } = await makeWallet('activity-wa', { escrow: 'e' })
      // all activity happens on the escrow E (its own meta, keyed by the spender)
      await inWindow(Wa, initMeta(E!), 'e')
      await inWindow(Wa, await post(), 'e')

      // the gate subject is the principal Wa.address, which has no social meta: the gate cannot pass
      await expect(inWindow(Wa, await gatedReply(parent, [new Uint8Array()]), 'e')).rejects.toThrow()

      // once the principal itself is active, the escrow window passes the same gate
      await inWindow(Wa, initMeta(addr(Wa)))
      await inWindow(Wa, await gatedReply(parent, [new Uint8Array()]), 'e')
      await assertUnregistered(universe.escrowFactory, [addr(Wa), E!])
    })
  })

  test('SOCIAL-1 tip route: an escrow creator is tipped at the wallet origin; only an origin without AKTA costs the tipper an opt-in', async () => {
    const admin = await fixture.context.generateAccount({ initialFunds: (50).algo() })
    const w = await newUnregisteredWallet({ walletFactory: universe.walletFactory, ...send(admin), nickname: 'tip-escrow', fund: (20).algo() })
    await addRawPlugin(w, { plugin: plugin.appId, ownerOnly: true }, send(admin))
    await addRawPlugin(w, { plugin: universe.optInPlugin.appId }, send(admin))
    await addRawPlugin(w, { plugin: plugin.appId, ownerOnly: true, escrow: 'e' }, send(admin))
    const E = (await w.client.state.box.escrows.value('e'))!.address
    await algorand.send.payment({ ...send(admin), receiver: E, amount: (2).algo() })
    await inWindow(w, initMeta(E), 'e')
    expect(await metaWallet(E)).toBe(w.client.appId)

    // the creator E holds no AKTA, and neither does the origin (w's own address) yet
    const origin = addr(w)
    const aktaOrZero = (a: string) => aktaOf(a).catch(() => 0n)
    expect(await aktaOrZero(origin)).toBe(0n)
    const wall = algosdk.decodeAddress(E).publicKey
    const socialAddress = universe.social.socialClient.appAddress
    const hintedVote = (voter: TransactionSignerAccount, amount: bigint) => universe.social.socialClient.send.votePayAxferByteUint64BoolUint64Void({
      ...send(voter), populateAppCallResources: true, coverAppCallInnerTransactionFees: true, maxFee: microAlgo(100_000),
      args: {
        mbrPayment: algorand.createTransaction.payment({ ...send(voter), receiver: socialAddress, amount: microAlgo(amount) }),
        tip: algorand.createTransaction.assetTransfer({ ...send(voter), receiver: socialAddress, assetId: akta, amount: reactFee }),
        ref: wall, type: RefType.Address, isUp: true, wallet: 0n,
      },
    })

    // first tip: the origin is opted in through the wallet, and the tipper funds that opt-in
    await hintedVote(poster, posterSdk.calculateVoteMBR(true) + 100_000n)
    const firstTip = await aktaOf(origin)
    expect(firstTip).toBeGreaterThan(0n)

    // second tip: the origin already holds AKTA, so it is tipped directly with no opt-in charge
    // (the route used to be decided on E, so it re-ran the opt-in and reverted errAlreadyOptedIn)
    const voter = await fixture.context.generateAccount({ initialFunds: (10).algo() })
    await algorand.send.assetOptIn({ ...send(voter), assetId: akta })
    await algorand.send.assetTransfer({ ...send(deployer), receiver: voter.addr, assetId: akta, amount: reactFee * 2n })
    await new SocialSDK({
      algorand,
      daoAppId: universe.dao.client.appId,
      socialFactoryParams: { appId: universe.social.socialAppId, defaultSender: voter.addr, defaultSigner: voter.signer },
      graphFactoryParams: { appId: universe.social.graphAppId, defaultSender: voter.addr, defaultSigner: voter.signer },
      impactFactoryParams: { appId: universe.social.impactAppId, defaultSender: voter.addr, defaultSigner: voter.signer },
      moderationFactoryParams: { appId: universe.social.moderationAppId, defaultSender: voter.addr, defaultSigner: voter.signer },
    }).initMeta({})
    await expect(hintedVote(voter, posterSdk.calculateVoteMBR(false) + 100_000n)).rejects.toThrow(new RegExp(errInvalidPayment))
    await hintedVote(voter, posterSdk.calculateVoteMBR(false))
    expect(await aktaOf(origin)).toBeGreaterThan(firstTip)
  })

  test("§6.2 tip route: a creator whose meta wallet lost it at rest is tipped directly (the legacy route reverts)", async () => {
    // the admin pays the wallet creation and the 20 ALGO funding, so it needs more than 20 ALGO
    const admin = await fixture.context.generateAccount({ initialFunds: (50).algo() })
    const w = await newUnregisteredWallet({ walletFactory: universe.walletFactory, ...send(admin), nickname: 'tip-wt', fund: (20).algo() })
    await addRawPlugin(w, { plugin: plugin.appId, ownerOnly: true }, send(admin))
    await addRawPlugin(w, { plugin: universe.optInPlugin.appId }, send(admin))
    const creator = addr(w)
    await inWindow(w, initMeta(creator))
    expect(await metaWallet(creator)).toBe(w.client.appId)

    // the admin rekeys the wallet's own address (its controlled address) to an EOA: W no longer owns it
    const away = await fixture.context.generateAccount({ initialFunds: (1).algo() })
    await w.client.send.arc58RekeyTo({ ...send(admin), args: { address: away.addr.toString(), flash: false }, extraFee: microAlgo(1_000), populateAppCallResources: true })
    const wall = algosdk.decodeAddress(creator).publicKey

    // legacy shim (deployed semantics): routes on the raw meta.wallet -> ARC-58 opt-in route -> reverts
    const socialAddress = universe.social.socialClient.appAddress
    await expect(universe.social.socialClient.send.votePayAxferByteUint64BoolVoid({
      ...send(poster), populateAppCallResources: true, coverAppCallInnerTransactionFees: true, maxFee: microAlgo(100_000),
      args: {
        mbrPayment: algorand.createTransaction.payment({ ...send(poster), receiver: socialAddress, amount: microAlgo(19_300n + 46_500n + 100_000n) }),
        tip: algorand.createTransaction.assetTransfer({ ...send(poster), receiver: socialAddress, assetId: akta, amount: reactFee }),
        ref: wall, type: RefType.Address, isUp: true,
      },
    })).rejects.toThrow()

    // hinted method: tipWallet() == 0, so the tip goes directly; the creator holds no AKTA, so the DAO keeps it all
    const before = await aktaOf(daoEscrow)
    await posterSdk.vote({ ref: wall, refType: RefType.Address, isUp: true })
    expect((await aktaOf(daoEscrow)) - before).toBe(reactFee)
  })
})

/**
 * Principal resolution, social track: direct (non-plugin) calls on AkitaSocial / AkitaSocialGraph
 * (docs/principal-resolution/PHASE-0-SPEC.md §6.2, §6.3, §7.2; Q4, Q5).
 *
 * - Hinted methods (trailing `wallet: uint64`) verify the hint first: a non-wallet hint reverts with
 *   errHnwl, any wallet hint on a top-level call with errHtop; hint 0 acts as the sender.
 * - Legacy shims (old selectors) keep the deployed semantics. The payment terms the deployed social
 *   plugin quotes (MinPostsMBR 46_500, no reply parent-ref or never-voted votes MBR, the 18_900 reaction
 *   list) are honoured only for the deployed plugin programs; a top-level sender of an old selector pays
 *   the corrected MBR, like the hinted methods.
 * - initMeta stores the VERIFIED wallet; setMetaWallet rebinds it.
 * - gatedFollow checks the gate against the verified context (Gate.mustCheckFor); the shim keeps
 *   Gate.mustCheck on Txn.sender.
 *
 * Wallet-window cases (plugin arm, registry-free wallets, ctx sub-gates) are in
 * arc58/plugins/social/principal.e2e.spec.ts; the deployed plugin bytecode in
 * arc58/plugins/social/deployed-compat.e2e.spec.ts.
 */
import * as algokit from '@algorandfoundation/algokit-utils'
import { microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import type { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import { GateSDK, LogicalOperator, Operator } from 'akita-sdk/gates'
import { RefType, SocialSDK } from 'akita-sdk/social'
import type { WalletSDK } from 'akita-sdk/wallet'
import algosdk from 'algosdk'
import { beforeAll, describe, expect, test } from 'vitest'
import { AkitaUniverse, buildAkitaUniverse } from '../../tests/fixtures/dao'
import { newUnregisteredWallet } from '../../tests/fixtures/unregistered-wallet'
import { errHintNotWallet, errHintTopLevel } from '../utils/errors'
import { errFailedGate, errInvalidPayment, errMetaDoesntExist } from './errors'

algokit.Config.configure({ populateAppCallResources: true })

const fixture = algorandFixture()

// MBR terms (social/constants.ts; legacy = what the deployed social plugin 3643581007 quotes)
const MIN_POSTS = 47_300n
const LEGACY_MIN_POSTS = 46_500n
const PER_BYTE = 400n
const VOTES = 19_300n
const VOTELIST = 19_300n
const REACTIONS = 22_100n
const REACTION_RECORD = 15_700n
const LEGACY_REACTION_LIST = 18_900n
const REPLY_PARENT_REF = 12_800n
const CID = 36n

const NONNEGATIVE_SEND = { populateAppCallResources: true, coverAppCallInnerTransactionFees: true, maxFee: microAlgo(100_000) } as const

describe('AkitaSocial principal resolution: direct calls', () => {
  let algorand: algokit.AlgorandClient
  let deployer: TransactionSignerAccount
  let user1: TransactionSignerAccount
  let user2: TransactionSignerAccount
  let user3: TransactionSignerAccount
  let universe: AkitaUniverse
  let akta: bigint
  let postFee: bigint
  let reactFee: bigint
  let sdk1: SocialSDK
  let sdk2: SocialSDK
  let sdk3: SocialSDK
  let Wd: WalletSDK

  const sdkFor = (who: TransactionSignerAccount) => new SocialSDK({
    algorand,
    daoAppId: universe.dao.client.appId,
    socialFactoryParams: { appId: universe.social.socialAppId, defaultSender: who.addr, defaultSigner: who.signer },
    graphFactoryParams: { appId: universe.social.graphAppId, defaultSender: who.addr, defaultSigner: who.signer },
    impactFactoryParams: { appId: universe.social.impactAppId, defaultSender: who.addr, defaultSigner: who.signer },
    moderationFactoryParams: { appId: universe.social.moderationAppId, defaultSender: who.addr, defaultSigner: who.signer },
  })

  const socialAddress = () => universe.social.socialClient.appAddress
  const freeBalance = async (): Promise<bigint> => {
    const info = await algorand.account.getInformation(socialAddress())
    return BigInt(info.balance.microAlgos) - BigInt(info.minBalance.microAlgos)
  }
  let nonceSeed = 1
  const nonce = () => new Uint8Array(24).fill(nonceSeed++)
  const pay = (who: TransactionSignerAccount, amount: bigint) =>
    algorand.createTransaction.payment({ sender: who.addr, receiver: socialAddress(), amount: microAlgo(amount) })
  const tip = (who: TransactionSignerAccount, amount: bigint) =>
    algorand.createTransaction.assetTransfer({ sender: who.addr, receiver: socialAddress(), assetId: akta, amount })

  // Legacy shims called with the old selectors, as the deployed plugin / an old SDK does.
  const legacyPost = async (who: TransactionSignerAccount, cid: Uint8Array, amount: bigint) => {
    const n = nonce()
    const timestamp = await sdk1.getBlockchainTimestamp()
    await universe.social.socialClient.send.postPayAxferUint64Byte_24Byte_36Uint64BoolUint64Uint64Void({
      sender: who.addr, signer: who.signer, ...NONNEGATIVE_SEND,
      args: { mbrPayment: pay(who, amount), tip: tip(who, postFee), timestamp, nonce: n, cid, gateId: 0n, usePayWall: false, payWallId: 0n, creatorFlags: 0n },
    })
    return sdk1.computePostKey(who.addr.toString(), timestamp, n)
  }
  const hintedPostManual = async (who: TransactionSignerAccount, cid: Uint8Array, amount: bigint) => {
    const timestamp = await sdk1.getBlockchainTimestamp()
    await universe.social.socialClient.send.postPayAxferUint64Byte_24Byte_36Uint64BoolUint64Uint64Uint64Void({
      sender: who.addr, signer: who.signer, ...NONNEGATIVE_SEND,
      args: { mbrPayment: pay(who, amount), tip: tip(who, postFee), timestamp, nonce: nonce(), cid, gateId: 0n, usePayWall: false, payWallId: 0n, creatorFlags: 0n, wallet: 0n },
    })
  }
  const legacyReply = async (who: TransactionSignerAccount, ref: Uint8Array, amount: bigint) => {
    const timestamp = await sdk1.getBlockchainTimestamp()
    await universe.social.socialClient.send.replyPayAxferUint64Byte_24Byte_36ByteUint64Uint64BoolUint64Uint64Void({
      sender: who.addr, signer: who.signer, ...NONNEGATIVE_SEND,
      args: {
        mbrPayment: pay(who, amount), tip: tip(who, reactFee), timestamp, nonce: nonce(), cid: new Uint8Array(36).fill(9),
        ref, type: RefType.Post, gateId: 0n, usePayWall: false, payWallId: 0n, creatorFlags: 0n,
      },
    })
  }
  const legacyVote = async (who: TransactionSignerAccount, ref: Uint8Array, type: RefType, amount: bigint) => {
    await universe.social.socialClient.send.votePayAxferByteUint64BoolVoid({
      sender: who.addr, signer: who.signer, ...NONNEGATIVE_SEND,
      args: { mbrPayment: pay(who, amount), tip: tip(who, reactFee), ref, type, isUp: false },
    })
  }
  const legacyReact = async (who: TransactionSignerAccount, ref: Uint8Array, nft: bigint, amount: bigint) => {
    await universe.social.socialClient.send.reactPayAxferByteUint64Uint64Void({
      sender: who.addr, signer: who.signer, ...NONNEGATIVE_SEND,
      args: { mbrPayment: pay(who, amount), tip: tip(who, reactFee), ref, type: RefType.Post, nft },
    })
  }

  const createNft = async (owner: TransactionSignerAccount): Promise<bigint> =>
    (await algorand.send.assetCreate({ sender: owner.addr, signer: owner.signer, total: 1n, decimals: 0, assetName: 'Principal NFT', unitName: 'PNFT' })).confirmation.assetIndex!

  beforeAll(async () => {
    await fixture.newScope()
    algorand = fixture.context.algorand
    const dispenser = await algorand.account.dispenserFromEnvironment()
    deployer = await fixture.context.generateAccount({ initialFunds: microAlgo(2_000_000_000) })
    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (2_000).algo())
    user1 = await fixture.context.generateAccount({ initialFunds: (200).algo() })
    user2 = await fixture.context.generateAccount({ initialFunds: (200).algo() })
    user3 = await fixture.context.generateAccount({ initialFunds: (200).algo() })

    universe = await buildAkitaUniverse({ fixture, sender: deployer.addr, signer: deployer.signer, apps: {} })
    akta = universe.aktaAssetId
    try {
      await universe.social.init()
    } catch {
      // already opted in by the universe
    }
    ;({ postFee, reactFee } = await universe.social.getSocialFees())

    for (const who of [user1, user2, user3]) {
      await algorand.send.assetOptIn({ sender: who.addr, signer: who.signer, assetId: akta })
      await algorand.send.assetTransfer({ sender: deployer.addr, signer: deployer.signer, receiver: who.addr, assetId: akta, amount: postFee * 20n + reactFee * 40n })
    }
    sdk1 = sdkFor(user1)
    sdk2 = sdkFor(user2)
    sdk3 = sdkFor(user3)

    Wd = await newUnregisteredWallet({ walletFactory: universe.walletFactory, sender: deployer.addr, signer: deployer.signer, nickname: 'direct-wd' })
  }, 600_000)

  describe('hint verification at the first hop', () => {
    test('a hint that is not a factory-created wallet reverts (errHnwl); the call is not applied', async () => {
      await expect(sdk1.initMeta({ wallet: 999_999_999n })).rejects.toThrow(new RegExp(errHintNotWallet))
      await expect(sdk1.initMeta({ wallet: universe.gate.appId })).rejects.toThrow(new RegExp(errHintNotWallet))
      expect(await universe.social.socialClient.getMetaExists({ args: { user: user1.addr.toString() } })).toBe(false)
    })

    test('initMeta with hint 0 stores wallet 0 for a plain account', async () => {
      await sdk1.initMeta({})
      expect((await sdk1.getMeta({ user: user1.addr.toString() })).wallet).toBe(0n)
    })

    test('a genuine wallet hint on a top-level call reverts (errHtop): no one can claim a wallet from outside it', async () => {
      await expect(sdk1.post({ cid: new Uint8Array(36).fill(1), wallet: Wd.client.appId })).rejects.toThrow(new RegExp(errHintTopLevel))
      await expect(sdk1.setMetaWallet({ wallet: Wd.client.appId })).rejects.toThrow(new RegExp(errHintTopLevel))
      await expect(sdk2.initMeta({ wallet: Wd.client.appId })).rejects.toThrow(new RegExp(errHintTopLevel))
    })

    test('setMetaWallet needs an existing meta (errNmta) and accepts hint 0 (unbind)', async () => {
      const stranger = await fixture.context.generateAccount({ initialFunds: (5).algo() })
      await expect(sdkFor(stranger).setMetaWallet({ wallet: 0n })).rejects.toThrow(new RegExp(errMetaDoesntExist))
      await sdk1.setMetaWallet({ wallet: 0n })
      expect((await sdk1.getMeta({ user: user1.addr.toString() })).wallet).toBe(0n)
    })

    test('legacy initMeta shim (old selector) still works and stores the registry wallet (0 for an EOA)', async () => {
      await universe.social.socialClient.send.initMetaPayAddressBoolUint64Uint64Uint64Uint64({
        sender: user2.addr, signer: user2.signer, ...NONNEGATIVE_SEND,
        args: { mbrPayment: pay(user2, sdk2.calculateMetaMBR()), user: user2.addr.toString(), automated: false, subscriptionIndex: 0n, nfd: 0n, akitaNft: 0n },
      })
      expect((await sdk2.getMeta({ user: user2.addr.toString() })).wallet).toBe(0n)
      await sdk3.initMeta({})
    })
  })

  // Review fix (2026-10-04): the legacy payment terms (the deployed plugin's quote) are honoured only for
  // the deployed social plugin programs (MainNet: the four pinned ids; LocalNet/TestNet: any app caller,
  // see `AkitaSocial.legacyTerms`). A TOP-LEVEL sender of an old selector pays the corrected terms, so
  // an EOA cannot use the shims to under-pay box MBR. The legacy terms themselves are covered through
  // the deployed plugin program in arc58/plugins/social/deployed-compat.e2e.spec.ts (P2-SOC-01).
  describe('§7.2 legacy shim payment terms: top-level senders of the old selectors pay the corrected MBR', () => {
    const cid = (seed: number) => new Uint8Array(Number(CID)).fill(seed)
    const hintedPost = MIN_POSTS + PER_BYTE * CID + VOTES + VOTELIST
    const legacyPostAmount = LEGACY_MIN_POSTS + PER_BYTE * CID + VOTES + VOTELIST
    const legacyVoteDelete = async (who: TransactionSignerAccount, ref: Uint8Array) => {
      await universe.social.socialClient.send.editVotePayAxferByte_32BoolVoid({
        sender: who.addr, signer: who.signer, ...NONNEGATIVE_SEND,
        args: { mbrPayment: pay(who, 0n), tip: tip(who, 0n), ref, flip: false },
      })
    }

    test('post: the deployed quote (800 µA short) is refused at top level; the corrected MBR passes, as on the hinted method', async () => {
      await expect(legacyPost(user1, cid(31), legacyPostAmount)).rejects.toThrow(new RegExp(errInvalidPayment))
      await expect(hintedPostManual(user1, cid(32), legacyPostAmount)).rejects.toThrow(new RegExp(errInvalidPayment))

      const beforeLegacy = await freeBalance()
      const key = await legacyPost(user1, cid(33), hintedPost)
      const legacyDelta = (await freeBalance()) - beforeLegacy
      expect((await sdk1.getPost({ ref: key })).creator).toBe(user1.addr.toString())

      const beforeHinted = await freeBalance()
      await sdk1.post({ cid: cid(34) })
      const hintedDelta = (await freeBalance()) - beforeHinted
      // no under-charge through the old selector: the app keeps exactly what the hinted path keeps
      expect(legacyDelta).toBe(hintedDelta)
    })

    test('reply: the old selector at top level charges the 32-byte parent ref MBR too', async () => {
      const { postKey } = await sdk1.post({ cid: cid(35) })
      const legacyAmount = LEGACY_MIN_POSTS + PER_BYTE * CID + VOTES + VOTELIST
      const correctedAmount = hintedPost + REPLY_PARENT_REF
      await expect(legacyReply(user2, postKey, legacyAmount)).rejects.toThrow(new RegExp(errInvalidPayment))

      const before = await freeBalance()
      await legacyReply(user2, postKey, correctedAmount)
      const legacyDelta = (await freeBalance()) - before

      const beforeHinted = await freeBalance()
      await sdk2.reply({ cid: cid(36), ref: postKey, refType: RefType.Post })
      const hintedDelta = (await freeBalance()) - beforeHinted
      expect(legacyDelta).toBe(hintedDelta)
    })

    test('vote that materializes a ref: top level pays posts + votes boxes; vote then delete leaves no drain (review scenario)', async () => {
      const fresh = () => algorand.account.random().addr.publicKey
      // the deployed quote that drained 20,100 µA per materialized ref through an EOA
      await expect(legacyVote(user2, fresh(), RefType.Address, VOTELIST + LEGACY_MIN_POSTS)).rejects.toThrow(new RegExp(errInvalidPayment))

      const ref = fresh()
      const before = await freeBalance()
      await legacyVote(user2, ref, RefType.Address, VOTELIST + MIN_POSTS + VOTES)
      const legacyDelta = (await freeBalance()) - before
      // the refund path returns the votelist MBR only; the boxes the vote materialized stay paid for
      await legacyVoteDelete(user2, ref)
      const afterDelete = (await freeBalance()) - before

      const beforeHinted = await freeBalance()
      await sdk2.vote({ ref: fresh(), refType: RefType.Address, isUp: false })
      const hintedDelta = (await freeBalance()) - beforeHinted
      expect(legacyDelta).toBe(hintedDelta)
      expect(afterDelete).toBe(legacyDelta)
    })

    test('react: top level pays the 15_700 record MBR; the deployed 18_900 quote is refused', async () => {
      const { postKey } = await sdk1.post({ cid: cid(37) })
      const nftA = await createNft(user2)
      const nftB = await createNft(user3)
      await expect(legacyReact(user2, postKey, nftA, REACTIONS + LEGACY_REACTION_LIST)).rejects.toThrow(new RegExp(errInvalidPayment))

      const before = await freeBalance()
      await legacyReact(user2, postKey, nftA, REACTIONS + REACTION_RECORD)
      const legacyDelta = (await freeBalance()) - before

      const beforeHinted = await freeBalance()
      await sdk3.react({ ref: postKey, refType: RefType.Post, nft: nftB })
      const hintedDelta = (await freeBalance()) - beforeHinted
      expect(legacyDelta).toBe(hintedDelta)
    })

    test('hinted methods with wallet 0 behave like the old direct path for plain accounts (no referral)', async () => {
      const escrow = await universe.social.socialClient.state.global.akitaDaoEscrow()
      const escrowAddress = algosdk.getApplicationAddress(escrow!.app).toString()
      const aktaOf = async (a: string) => (await algorand.asset.getAccountInformation(a, akta)).balance
      const before = await aktaOf(escrowAddress)
      await sdk1.post({ cid: cid(38) })
      expect((await aktaOf(escrowAddress)) - before).toBe(postFee)
    })
  })

  describe('AkitaSocialGraph.gatedFollow: gate subject = verified context (§6.3, Q4)', () => {
    let gate: GateSDK
    let gateId: bigint

    beforeAll(async () => {
      gate = new GateSDK({
        algorand,
        factoryParams: { appId: universe.gate.appId, defaultSender: deployer.addr, defaultSigner: deployer.signer },
        gateRegistry: { social_activity: universe.subgates.socialActivityGate.appId },
      })
      // "active within the last day": evaluated on ctx.principal (a plain sub-gate)
      gateId = (await gate.register({
        sender: deployer.addr, signer: deployer.signer,
        args: [{ type: 'social_activity', appId: universe.subgates.socialActivityGate.appId, layer: 0n, logicalOperator: LogicalOperator.None, op: Operator.GreaterThanOrEqualTo, value: 86_400n }],
      })).return!
      await sdk1.updateMeta({ followGateId: gateId })
    })

    const mustCheckFor = (who: TransactionSignerAccount, ctx = SocialSDK.directGateCtx(who.addr.toString())) =>
      gate.build.mustCheckFor({ sender: who.addr, signer: who.signer, ctx, gateId, args: [{ type: 'social_activity' }] })
    const mustCheck = (who: TransactionSignerAccount) =>
      gate.build.mustCheck({ sender: who.addr, signer: who.signer, caller: who.addr.toString(), gateId, args: [{ type: 'social_activity' }] })
    const followPayment = (who: TransactionSignerAccount) =>
      algorand.createTransaction.payment({ sender: who.addr, receiver: universe.social.graphClient.appAddress, amount: microAlgo(31_700n) })

    test('hinted gatedFollow passes with Gate.mustCheckFor(ctx = (sender, 0, sender))', async () => {
      await sdk2.follow({ address: user1.addr.toString(), gateTxn: await mustCheckFor(user2) })
      expect(await sdk2.isFollowing({ follower: user2.addr.toString(), user: user1.addr.toString() })).toBe(true)
    })

    test('P2-GATE-03 (graph): the hinted target rejects a legacy mustCheck txn and a ctx that is not its own', async () => {
      await expect(sdk3.follow({ address: user1.addr.toString(), gateTxn: await mustCheck(user3) })).rejects.toThrow(new RegExp(errFailedGate))
      const foreign = { principal: user2.addr.toString(), wallet: 0n, spender: user2.addr.toString() }
      await expect(sdk3.follow({ address: user1.addr.toString(), gateTxn: await mustCheckFor(user3, foreign) })).rejects.toThrow(new RegExp(errFailedGate))
    })

    test('legacy gatedFollow shim keeps Gate.mustCheck on Txn.sender and rejects mustCheckFor', async () => {
      await expect(universe.social.graphClient.send.gatedFollowPayApplAddressVoid({
        sender: user3.addr, signer: user3.signer, ...NONNEGATIVE_SEND,
        args: { mbrPayment: followPayment(user3), gateTxn: await mustCheckFor(user3), address: user1.addr.toString() },
      })).rejects.toThrow(new RegExp(errFailedGate))

      await universe.social.graphClient.send.gatedFollowPayApplAddressVoid({
        sender: user3.addr, signer: user3.signer, ...NONNEGATIVE_SEND,
        args: { mbrPayment: followPayment(user3), gateTxn: await mustCheck(user3), address: user1.addr.toString() },
      })
      expect(await sdk3.isFollowing({ follower: user3.addr.toString(), user: user1.addr.toString() })).toBe(true)
    })
  })
})

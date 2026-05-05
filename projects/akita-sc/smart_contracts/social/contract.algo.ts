import { Account, Application, Asset, BoxMap, Bytes, bytes, clone, contract, Global, GlobalState, gtxn, itxn, itxnCompose, loggedAssert, match, op, Txn, uint64 } from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod } from '@algorandfoundation/algorand-typescript/arc4'
import { AssetHolding, btoi, itob } from '@algorandfoundation/algorand-typescript/op'
import { classes } from 'polytype'
import { FactoryGlobalStateMaxBytes, FactoryGlobalStateMaxUints } from '../utils/constants'
import { akitaSocialFee, calcPercent, gateCheck, getAkitaAssets, getAkitaSocialAppList, getOriginAccount, getPluginAppList, getSocialFees, getWalletIDUsingAkitaDAO, impactRange, referralFee, sendReferralPayment } from '../utils/functions'
import { CallerTypeGlobal } from '../arc58/account/types'
import { CID } from '../utils/types/base'
import { AkitaSocialBoxPrefixMeta, AkitaSocialboxPrefixPayWall, AkitaSocialBoxPrefixPosts, AkitaSocialBoxPrefixReactionList, AkitaSocialBoxPrefixReactions, AkitaSocialBoxPrefixRefTypes, AkitaSocialBoxPrefixVoteList, AkitaSocialBoxPrefixVotes, AkitaSocialGlobalStateKeysPaywallID, AkitaSocialGlobalStateKeysRefTypeCounter, AmendmentMBR, BuiltInRefTypeCount, EditBackRefMBR, ImpactMetaMBR, MAX_TIMESTAMP_DRIFT, ONE_DAY, PostTypeEditPost, PostTypeEditReply, PostTypePost, PostTypeReply, RefTypeAddress, RefTypeApp, RefTypeAsset, RefTypePost, TipActionPost, TipActionReact, TipSendTypeARC58 } from './constants'
import { ERR_ALREADY_OPTED_IN, ERR_ALREADY_REACTED, ERR_ALREADY_VOTED, ERR_AUTOMATED_ACCOUNT, ERR_BANNED, ERR_BLOCKED, ERR_FAILED_GATE, ERR_HAS_GATE, ERR_HAVENT_VOTED, ERR_INVALID_APP, ERR_INVALID_ASSET, ERR_INVALID_PAYMENT, ERR_INVALID_PAYWALL, ERR_INVALID_REF_LENGTH, ERR_INVALID_TRANSFER, ERR_IS_A_REPLY, ERR_IS_ALREADY_AMENDED, ERR_META_ALREADY_EXISTS, ERR_META_DOESNT_EXIST, ERR_NO_SELF_VOTE, ERR_NOT_A_REPLY, ERR_NOT_AKITA_DAO, ERR_NOT_GRAPH, ERR_NOT_MODERATION, ERR_NOT_YOUR_POST_TO_EDIT, ERR_PAYWALL_NOT_FOUND, ERR_POST_EXISTS, ERR_POST_NOT_FOUND, ERR_REF_TYPE_NOT_FOUND, ERR_REPLY_NOT_FOUND, ERR_TIMESTAMP_TOO_OLD, ERR_USER_DOES_NOT_OWN_NFT } from './errors'
import { MetaValue, PostType, PostValue, ReactionListKey, ReactionsKey, RefTypeValue, SocialImpactInputs, TipAction, ViewPayWallValue, VoteListKey, VoteListValue, VotesValue } from './types'

// CONTRACT IMPORTS
import type { AbstractedAccount } from '../arc58/account/contract.algo'
import type { OptInPlugin } from '../arc58/plugins/optin/contract.algo'
import { AkitaBaseFeeGeneratorContractWithoutAkitaOptIn, EscrowConfig } from '../utils/base-contracts/base'
import { BaseSocial } from './base'
import type { AkitaSocialGraph } from './graph.algo'
import type { AkitaSocialImpact } from './impact.algo'
import type { AkitaSocialModeration } from './moderation.algo'

export function b16(b: bytes): bytes<16> {
  return b.slice(0, 16).toFixed({ length: 16 })
}

@contract({
  stateTotals: {
    globalBytes: FactoryGlobalStateMaxBytes,
    globalUints: FactoryGlobalStateMaxUints
  }
})
export class AkitaSocial extends classes(BaseSocial, AkitaBaseFeeGeneratorContractWithoutAkitaOptIn) {

  // GLOBAL STATE ---------------------------------------------------------------------------------

  payWallId = GlobalState<uint64>({ key: AkitaSocialGlobalStateKeysPaywallID, initialValue: 1 })
  
  refTypeCounter = GlobalState<uint64>({ key: AkitaSocialGlobalStateKeysRefTypeCounter, initialValue: BuiltInRefTypeCount })

  // BOXES ----------------------------------------------------------------------------------------

  /** All the posts on the network */
  posts = BoxMap<bytes<32>, PostValue>({ keyPrefix: AkitaSocialBoxPrefixPosts })
  /** Pay wall information for posts */
  paywall = BoxMap<uint64, ViewPayWallValue>({ keyPrefix: AkitaSocialboxPrefixPayWall })
  /** Counters for each post to track votes */
  votes = BoxMap<bytes<32>, VotesValue>({ keyPrefix: AkitaSocialBoxPrefixVotes })
  /** User votes and their impact */
  votelist = BoxMap<VoteListKey, VoteListValue>({ keyPrefix: AkitaSocialBoxPrefixVoteList })
  /** Counters for each post to track reactions */
  reactions = BoxMap<ReactionsKey, uint64>({ keyPrefix: AkitaSocialBoxPrefixReactions })
  /** Who has reacted to what */
  reactionlist = BoxMap<ReactionListKey, bytes<0>>({ keyPrefix: AkitaSocialBoxPrefixReactionList })
  /** The meta data for each user */
  meta = BoxMap<Account, MetaValue>({ keyPrefix: AkitaSocialBoxPrefixMeta })
  /** Registered ref types (key = uint64 ID, value = name + external flag + schema) */
  refTypes = BoxMap<uint64, RefTypeValue>({ keyPrefix: AkitaSocialBoxPrefixRefTypes })

  // PRIVATE METHODS ------------------------------------------------------------------------------

  private isCreator(creator: Account, sender: Account): boolean {
    return creator === sender
  }

  private isReply(postType: PostType): boolean {
    return postType === PostTypeReply || postType === PostTypeEditReply
  }

  private getBaseRefLength(postType: PostType): uint64 {
    // Returns the base ref length before any 'a' + nextKey amendment marker
    // Post:      CID(36)
    // Reply:     CID(36) + parentRef(32) = 68
    // EditPost:  CID(36) + originalKey(32) = 68
    // EditReply: CID(36) + parentRef(32) + originalKey(32) = 100
    switch (postType) {
      case PostTypePost:
        return 36
      case PostTypeReply:
        return 68
      case PostTypeEditPost:
        return 68
      case PostTypeEditReply:
        return 100
      default:
        return 36
    }
  }

  private isAmended(ref: bytes, postType: PostType): boolean {
    // A post is amended if ref length exceeds base length (has 'a' + nextKey appended)
    const baseLength = this.getBaseRefLength(postType)
    return ref.length > baseLength
  }

  private toBytes32(type: uint64, ref: bytes): { refBytes: bytes<32>, creator: Account } {
    let refBytes: bytes<32>
    let creator: Account = Global.zeroAddress
    switch (type) {
      case RefTypePost:
        loggedAssert(ref.length === 32, ERR_INVALID_REF_LENGTH)
        refBytes = ref.toFixed({ length: 32 })
        break
      case RefTypeAsset:
        loggedAssert(ref.length === 8, ERR_INVALID_REF_LENGTH)
        loggedAssert(Asset(btoi(ref)).total > 0, ERR_INVALID_ASSET)
        refBytes = ref.concat(op.bzero(24)).toFixed({ length: 32 })
        creator = Asset(btoi(ref)).creator
        break
      case RefTypeAddress:
        loggedAssert(ref.length === 32, ERR_INVALID_REF_LENGTH)
        refBytes = ref.toFixed({ length: 32 })
        creator = Account(refBytes)

        if (this.meta(creator).exists) {
          const { addressGateID } = this.meta(creator).value
          loggedAssert(addressGateID === 0, ERR_HAS_GATE)
        }

        break
      case RefTypeApp:
        loggedAssert(ref.length === 8, ERR_INVALID_REF_LENGTH)
        loggedAssert(Application(btoi(ref)).approvalProgram.length > 0, ERR_INVALID_APP)
        refBytes = ref.concat(op.bzero(24)).toFixed({ length: 32 })
        creator = Application(btoi(ref)).creator
        break
      default:
        // For any non-built-in type, verify it's registered
        loggedAssert(this.refTypes(type).exists, ERR_REF_TYPE_NOT_FOUND)
        // Derive storage key from type ID + ref to prevent collisions across types
        refBytes = op.sha256(itob(type).concat(ref))
        creator = Global.zeroAddress
        break
    }

    return { refBytes, creator }
  }

  private isBlocked(user: Account, blocked: Account): boolean {
    return abiCall<typeof AkitaSocialGraph.prototype.isBlocked>({
      appId: getAkitaSocialAppList(this.akitaDAO.value).graph,
      args: [user, blocked]
    }).returnValue
  }

  // Shared prologue for vote / react / delete-reaction flows. Verifies the
  // caller isn't banned, the target post exists, and the post creator hasn't
  // blocked the caller. Returns the creator so callers don't re-read the box.
  private loadPostWithAccessCheck(ref: bytes<32>): Account {
    loggedAssert(!this.isBanned(Txn.sender), ERR_BANNED)
    loggedAssert(this.posts(ref).exists, ERR_POST_NOT_FOUND)
    const { creator } = this.posts(ref).value
    loggedAssert(!this.isBlocked(creator, Txn.sender), ERR_BLOCKED)
    return creator
  }

  // Derives the deterministic post/reply key from the sender, timestamp, and
  // nonce. Also asserts the timestamp is recent (within MAX_TIMESTAMP_DRIFT
  // seconds) so each caller (`post`, `reply`, `gatedReply`) doesn't have to
  // repeat the boilerplate.
  private computePostKey(timestamp: uint64, nonce: bytes<24>): bytes<32> {
    loggedAssert(Global.latestTimestamp - timestamp <= MAX_TIMESTAMP_DRIFT, ERR_TIMESTAMP_TOO_OLD)
    return op.sha256(Txn.sender.bytes.concat(itob(timestamp)).concat(nonce))
  }

  // Shared prologue for `reply` / `gatedReply` / `react` / `gatedReact`.
  // Resolves the raw ref into its `bytes<32>` key (materializing an empty
  // parent post if the ref is a fallback-typed ref that hasn't been posted
  // against yet), and returns the parent's `gateID` so the caller can run
  // whichever gate check differentiates its entrypoint (non-gated asserts
  // `gateID === 0`; gated calls `gateCheck`). `addedMbr` is the MBR that
  // had to be routed into the parent-post box when materializing it.
  private resolveParentContext(
    type: uint64,
    ref: bytes,
  ): { refBytes: bytes<32>, addedMbr: uint64, postGateID: uint64 } {
    const { refBytes, creator: fallback } = this.toBytes32(type, ref)

    loggedAssert(this.posts(refBytes).exists, ERR_POST_NOT_FOUND)
    const { creator, gateID: postGateID } = this.posts(refBytes).value

    const c = (fallback === Global.zeroAddress) ? creator : fallback
    const addedMbr = this.createEmptyPostIfNecessary(refBytes, c)

    return { refBytes, addedMbr, postGateID }
  }

  // Shared prologue for editPost / editReply / gatedEditReply. Given an
  // amendment box that the caller has already asserted exists, validates
  // ownership + not-already-amended, computes the deterministic `editKey`,
  // and stamps it into the amendment's `ref` field. The existence check is
  // intentionally left to each caller so `editPost` can emit
  // `ERR_POST_NOT_FOUND` and the reply-edit paths can emit
  // `ERR_REPLY_NOT_FOUND`. The is-reply vs. is-post check is likewise the
  // caller's job so each path reports the right code.
  private verifyEditAmendment(amendment: bytes<32>, cid: CID): {
    ref: bytes,
    gateID: uint64,
    usePayWall: boolean,
    payWallID: uint64,
    postType: PostType,
    editKey: bytes<32>,
  } {
    const { creator, ref, gateID, usePayWall, payWallID, postType } = this.posts(amendment).value
    loggedAssert(this.isCreator(creator, Txn.sender), ERR_NOT_YOUR_POST_TO_EDIT)
    loggedAssert(!this.isAmended(ref, postType), ERR_IS_ALREADY_AMENDED)

    const editKey = op.sha256(Txn.sender.bytes.concat(amendment).concat(Bytes(cid)))
    this.posts(amendment).value.ref = ref.concat(Bytes('a').concat(editKey))

    return { ref, gateID, usePayWall, payWallID, postType, editKey }
  }

  // Reply-specific follow-up to `verifyEditAmendment`. Asserts the amendment
  // is a reply (not a top-level post), then looks up the parent post's gateID
  // so the caller can run its gate check.
  private prepareReplyEdit(amendment: bytes<32>, cid: CID): {
    parentPostRef: bytes<32>,
    ogPostGateID: uint64,
    gateID: uint64,
    usePayWall: boolean,
    payWallID: uint64,
    editKey: bytes<32>,
  } {
    loggedAssert(this.posts(amendment).exists, ERR_REPLY_NOT_FOUND)
    const { ref, gateID, usePayWall, payWallID, postType, editKey } = this.verifyEditAmendment(amendment, cid)
    loggedAssert(this.isReply(postType), ERR_NOT_A_REPLY)

    const parentPostRef = ref.slice(36, 68).toFixed({ length: 32 })
    const { gateID: ogPostGateID } = this.posts(parentPostRef).value

    return { parentPostRef, ogPostGateID, gateID, usePayWall, payWallID, editKey }
  }

  // Reads the raw inputs the social-impact calculation needs from local state.
  // The actual scoring math lives on `AkitaSocialImpact.calculateSocialImpact`.
  private readSocialImpactInputs(account: Account): SocialImpactInputs {
    let hasMeta = false
    let streak: uint64 = 0
    let startDate: uint64 = 0

    if (this.meta(account).exists) {
      const m = clone(this.meta(account).value)
      hasMeta = true
      streak = m.streak
      startDate = m.startDate
    }

    let voteCount: uint64 = 0
    let isNegative = false

    if (this.votes(account.bytes).exists) {
      const v = clone(this.votes(account.bytes).value)
      voteCount = v.voteCount
      isNegative = v.isNegative
    }

    return { hasMeta, streak, startDate, voteCount, isNegative }
  }

  // Computes the user's full impact score by delegating to the impact contract,
  // but passes the social inputs directly so impact doesn't have to call back
  // here — keeping the inner-txn count identical to the previous architecture.
  private getUserImpact(account: Account): uint64 {
    const inputs = this.readSocialImpactInputs(account)

    return abiCall<typeof AkitaSocialImpact.prototype.getUserImpactWithInputs>({
      appId: getAkitaSocialAppList(this.akitaDAO.value).impact,
      args: [account, inputs]
    }).returnValue
  }

  private sendPostPayment() {
    const akta = getAkitaAssets(this.akitaDAO.value).akta
    const { postFee } = getSocialFees(this.akitaDAO.value)
    const { leftover } = sendReferralPayment(this.akitaDAO.value, akta, postFee)

    itxn
      .assetTransfer({
        assetReceiver: this.akitaDAOEscrow.value.app.address,
        assetAmount: leftover,
        xferAsset: akta
      })
      .submit()
  }

  private arc58SendReactionPayments(wallet: Application, asset: uint64, tax: uint64, remainder: uint64): void {
    const origin = getOriginAccount(wallet)
    const optin = getPluginAppList(this.akitaDAO.value).optin

    itxnCompose.begin<typeof AbstractedAccount.prototype.arc58_rekeyToPlugin>({
      appId: wallet,
      args: [
        optin,
        CallerTypeGlobal,
        '', // default account
        [], // no method offsets
        [] // no funds request
      ]
    })

    itxnCompose.next<typeof OptInPlugin.prototype.optIn>({
      appId: optin,
      args: [
        wallet,
        true, // rekey back immediately
        [asset],
        itxn.payment({
          amount: Global.assetOptInMinBalance,
          receiver: origin
        })
      ],
    })

    itxnCompose.next<typeof AbstractedAccount.prototype.arc58_verifyAuthAddress>({
      appId: wallet
    })

    itxnCompose.next(
      itxn.assetTransfer({
        assetReceiver: this.akitaDAOEscrow.value.app.address,
        assetAmount: tax,
        xferAsset: asset
      })
    )

    itxnCompose.next(
      itxn.assetTransfer({
        assetReceiver: origin,
        assetAmount: remainder,
        xferAsset: asset
      })
    )

    itxnCompose.submit()
  }

  private sendDirectReactionPayments(creator: Account, asset: uint64, tax: uint64, remainder: uint64): void {

    const taxTxn = itxn.assetTransfer({
      assetReceiver: this.akitaDAOEscrow.value.app.address,
      assetAmount: tax,
      xferAsset: asset
    })

    if (remainder > 0 && creator.isOptedIn(Asset(asset))) {
      const xferTxn = itxn.assetTransfer({
        assetReceiver: creator,
        assetAmount: remainder,
        xferAsset: asset
      })

      itxn.submitGroup(taxTxn, xferTxn)
    } else {
      taxTxn.set({
        assetAmount: tax + remainder
      })
      taxTxn.submit()
    }
  }

  private tipCreator(creator: Account, fee: uint64, tax: uint64): uint64 {
    if (creator === Global.zeroAddress) {
      const akta = Asset(getAkitaAssets(this.akitaDAO.value).akta)
      itxn
        .assetTransfer({
          assetReceiver: this.akitaDAOEscrow.value.app.address,
          assetAmount: fee,
          xferAsset: akta
        })
        .submit()
      return 0
    }

    let wallet: uint64 = 0
    if (this.meta(creator).exists) {
      wallet = this.meta(creator).value.wallet
    }

    const { type, arc58 } = this.checkTipMbrRequirements(this.akitaDAO.value, creator, Application(wallet))
    const akta = getAkitaAssets(this.akitaDAO.value).akta
    const { leftover } = sendReferralPayment(this.akitaDAO.value, akta, tax)
    const { reactFee } = getSocialFees(this.akitaDAO.value)
    
    if (type === TipSendTypeARC58) {
      this.arc58SendReactionPayments(Application(wallet), akta, leftover, (reactFee - tax))
      return arc58
    }

    this.sendDirectReactionPayments(creator, akta, leftover, (reactFee - tax))
    return 0
  }

  private createEmptyPostIfNecessary(key: bytes<32>, creator: Account): uint64 {
    if (!this.posts(key).exists) {
      this.posts(key).value = {
        ref: op.bzero(0),
        /**
         * when a user reacts to content other than posts
         * we set the creator to the following:
         * - AssetID: Asset Creator
         * - Address: Account
         * -   AppID: Application Creator
         */
        creator,
        timestamp: Global.latestTimestamp,
        gateID: 0,
        usePayWall: false,
        payWallID: 0,
        againstContentPolicy: false,
        postType: PostTypePost,
        creatorFlags: 0,
        moderatorFlags: 0,
      }

      return this.mbr(Bytes(''), '', Bytes('')).posts
    }
    return 0
  }

  private updateStreak(account: Account): void {
    loggedAssert(this.meta(account).exists, ERR_META_DOESNT_EXIST)

    const { startDate, lastActive } = this.meta(account).value

    const thisWindowStart: uint64 = Global.latestTimestamp - ((Global.latestTimestamp - startDate) % ONE_DAY)
    const lastWindowStart: uint64 = thisWindowStart - ONE_DAY

    this.meta(account).value.lastActive = Global.latestTimestamp
    // if they haven't interacted in up to the last 48 hours (depending on the current window)
    // reset their streak
    if (lastWindowStart > lastActive) {
      this.meta(account).value.streak = 1
      return
    }

    // if they have interacted after the last window
    // but have not yet interacted in this window, increment their streak
    if (lastActive < thisWindowStart) {
      this.meta(account).value.streak += 1
    }

    // otherwise do nothing, streak can only increment once per window (24 hours)
  }

  private calcVotes(ref: bytes<32>, isUp: boolean, impact: uint64): { newCount: uint64; isNegative: boolean } {
    if (!this.votes(ref).exists) {
      return { newCount: impact, isNegative: !isUp }
    }

    const { isNegative, voteCount } = this.votes(ref).value
    // differingDirections means that the direction this vote will move the vote count
    // is the opposite of the current vote count
    const differingDirections = (isUp && isNegative) || (!isUp && !isNegative)

    if (voteCount === 0) {
      return { newCount: impact, isNegative: !isUp }
    }

    if (impact === voteCount && differingDirections) {
      return { newCount: 0, isNegative: false }
    }

    // flip indicates that this vote will move the vote count from negative to positive
    // or vice versa
    const flip = impact > voteCount && differingDirections
    if (flip) {
      const newCount: uint64 = impact - voteCount
      return { newCount, isNegative: !isNegative }
    }

    const newCount: uint64 = differingDirections ? voteCount - impact : voteCount + impact
    return { newCount, isNegative }
  }

  private updateVotes(ref: bytes<32>, isUp: boolean, impact: uint64): void {
    const { newCount: voteCount, isNegative } = this.calcVotes(ref, isUp, impact)
    this.votes(ref).value = { voteCount, isNegative }
  }

  private createVoteList(ref: bytes<32>, isUp: boolean, account: Account, impact: uint64): void {
    const voteListKey: VoteListKey = { user: b16(account.bytes), ref: b16(ref) }
    this.votelist(voteListKey).value = { impact, isUp }
  }

  private createPost(
    postKey: bytes<32>,
    mbrPayment: gtxn.PaymentTxn,
    cid: CID,
    gateID: uint64,
    usePayWall: boolean,
    payWallID: uint64,
    postType: PostType,
    // `amendmentOf` is only consumed when `postType === PostTypeEditPost`;
    // non-edit callers pass `Bytes('')` so the compiler can substitute the
    // already-bytecblocked empty-bytes constant (1 byte) for an explicit
    // `pushint 32; bzero` sequence (3 bytes) at each call site.
    amendmentOf: bytes,
    creatorFlags: uint64,
  ): void {
    loggedAssert(!this.isBanned(Txn.sender), ERR_BANNED)
    loggedAssert(
      (!usePayWall && payWallID === 0) || (
        usePayWall && (
          payWallID !== 0 && this.paywall(payWallID).exists ||
          payWallID === 0 && this.paywall(this.meta(Txn.sender).value.defaultPayWallID).exists
        )
      ),
      ERR_INVALID_PAYWALL
    )

    const isEditPost = postType === PostTypeEditPost
    // For edits, we need extra MBR for the back-reference (originalKey)
    const editExtraMbr: uint64 = isEditPost ? EditBackRefMBR : 0
    this.validatePostPayment(mbrPayment, cid, isEditPost, editExtraMbr)

    // update streak before we measure impact
    // this way we guarantee the box exists
    this.updateStreak(Txn.sender)

    const impact = this.getUserImpact(Txn.sender)

    loggedAssert(!this.posts(postKey).exists, ERR_POST_EXISTS)

    // Ref structure based on postType:
    // Post:     CID
    // EditPost: CID + originalKey
    const postRef: bytes = isEditPost
      ? Bytes(cid).concat(amendmentOf)
      : Bytes(cid)

    this.posts(postKey).value = {
      ref: postRef,
      creator: Txn.sender,
      timestamp: Global.latestTimestamp,
      gateID: gateID,
      usePayWall,
      payWallID,
      againstContentPolicy: false,
      postType: postType,
      creatorFlags,
      moderatorFlags: 0,
    }
    this.updateVotes(postKey, true, impact)
    this.createVoteList(postKey, true, Txn.sender, impact)
    this.sendPostPayment()
  }

  private createReply(
    replyKey: bytes<32>,
    mbrPayment: gtxn.PaymentTxn,
    mbrNeeded: uint64,
    cid: CID,
    parentRef: bytes<32>,
    gateID: uint64,
    usePayWall: boolean,
    payWallID: uint64,
    postType: PostType,
    // `amendmentOf` is only consumed when `postType === PostTypeEditReply`;
    // non-edit callers pass `Bytes('')` — see note on `createPost`.
    amendmentOf: bytes,
    creatorFlags: uint64,
  ): void {
    loggedAssert(!this.isBanned(Txn.sender), ERR_BANNED)
    const { creator } = this.posts(parentRef).value
    loggedAssert(!this.isBlocked(creator, Txn.sender), ERR_BLOCKED)

    // update streak before we measure impact
    // this way we guarantee the box exists
    this.updateStreak(Txn.sender)

    const { reactFee } = getSocialFees(this.akitaDAO.value)
    const creatorImpact = this.getUserImpact(creator)
    const taxPercentage = akitaSocialFee(this.akitaDAO.value, creatorImpact)
    const tax = calcPercent(reactFee, taxPercentage)

    const isEditReply = postType === PostTypeEditReply
    // For edits, we need extra MBR for the back-reference (originalKey)
    let extra = mbrNeeded
    extra += this.tipCreator(creator, reactFee, tax)

    if (isEditReply) {
      extra += EditBackRefMBR
    }
    // validate after we send payments, annoying but saves us compute
    this.validatePostPayment(mbrPayment, cid, isEditReply, extra)

    loggedAssert(!this.posts(replyKey).exists, ERR_POST_EXISTS)

    // Reply ref structure based on postType:
    // Reply:     CID + parentRef
    // EditReply: CID + parentRef + originalKey
    const replyRef: bytes = isEditReply
      ? Bytes(cid).concat(parentRef).concat(amendmentOf)
      : Bytes(cid).concat(parentRef)

    this.posts(replyKey).value = {
      ref: replyRef,
      creator: Txn.sender,
      timestamp: Global.latestTimestamp,
      gateID,
      usePayWall,
      payWallID,
      againstContentPolicy: false,
      postType: postType,
      creatorFlags,
      moderatorFlags: 0,
    }

    const senderImpact = this.getUserImpact(Txn.sender)
    this.updateVotes(replyKey, true, senderImpact)
    this.createVoteList(replyKey, true, Txn.sender, senderImpact)
  }

  private createVote(
    mbrPayment: gtxn.PaymentTxn,
    mbrNeeded: uint64,
    ref: bytes<32>,
    isUp: boolean
  ): void {
    const creator = this.loadPostWithAccessCheck(ref)

    const voteListKey: VoteListKey = { user: b16(Txn.sender.bytes), ref: b16(ref) }
    loggedAssert(!this.votelist(voteListKey).exists, ERR_ALREADY_VOTED)
    loggedAssert(Txn.sender !== creator, ERR_NO_SELF_VOTE)

    const senderIsAutomated = this.meta(Txn.sender).value.automated
    loggedAssert(!senderIsAutomated, ERR_AUTOMATED_ACCOUNT)

    const akta = getAkitaAssets(this.akitaDAO.value).akta

    // update streak before we measure impact
    // this way we guarantee the box exists
    this.updateStreak(Txn.sender)
    const { reactFee, impactTaxMin, impactTaxMax } = getSocialFees(this.akitaDAO.value)

    if (isUp) {
      // calls a transaction
      const recipientImpact = this.getUserImpact(creator)
      const taxPercentage = impactRange(recipientImpact, impactTaxMin, impactTaxMax)
      const tax = calcPercent(reactFee, taxPercentage)

      const extra = this.tipCreator(creator, reactFee, tax)
      // validate after we send payments, annoying but saves us compute
      loggedAssert(
        match(
          mbrPayment,
          {
            receiver: Global.currentApplicationAddress,
            amount: mbrNeeded + extra
          }
        ),
        ERR_INVALID_PAYMENT
      )
    } else {
      loggedAssert(
        match(
          mbrPayment,
          {
            receiver: Global.currentApplicationAddress,
            amount: mbrNeeded
          }
        ),
        ERR_INVALID_PAYMENT
      )

      itxn
        .assetTransfer({
          assetReceiver: this.akitaDAOEscrow.value.app.address,
          assetAmount: reactFee,
          xferAsset: akta
        })
        .submit()
    }

    // calls a transaction
    const senderImpact = this.getUserImpact(Txn.sender)
    this.updateVotes(ref, isUp, senderImpact)
    this.createVoteList(ref, isUp, Txn.sender, senderImpact)
  }

  private createReaction(
    mbrPayment: gtxn.PaymentTxn,
    mbrNeeded: uint64,
    ref: bytes<32>,
    NFT: uint64
  ): void {
    const creator = this.loadPostWithAccessCheck(ref)
    // sender has NFT
    loggedAssert(AssetHolding.assetBalance(Txn.sender, NFT)[0] > 0, ERR_USER_DOES_NOT_OWN_NFT)

    const reactionListKey: ReactionListKey = { user: b16(Txn.sender.bytes), ref: b16(ref), NFT }

    loggedAssert(!this.reactionlist(reactionListKey).exists, ERR_ALREADY_REACTED)

    // update streak before we measure impact
    // this way we guarantee the box exists
    this.updateStreak(Txn.sender)

    const { reactFee, impactTaxMin, impactTaxMax } = getSocialFees(this.akitaDAO.value)
    const recipientImpact = this.getUserImpact(creator)
    const tax = impactRange(recipientImpact, impactTaxMin, impactTaxMax)

    const reactionKey: ReactionsKey = { ref, NFT }
    const reactionExists = this.reactions(reactionKey).exists

    let extra = mbrNeeded
    extra += this.tipCreator(creator, reactFee, tax)

    // validate after we send payments, annoying but saves us compute
    this.validateReactPayment(mbrPayment, reactionExists, extra)

    if (reactionExists) {
      this.reactions(reactionKey).value += 1
    } else {
      this.reactions(reactionKey).value = 1
    }

    this.reactionlist(reactionListKey).create()
  }

  private validateTip(tip: gtxn.AssetTransferTxn, action: TipAction) {
    const akta = Asset(getAkitaAssets(this.akitaDAO.value).akta)
    const { postFee, reactFee } = getSocialFees(this.akitaDAO.value)
    loggedAssert(
      match(
        tip,
        {
          assetReceiver: Global.currentApplicationAddress,
          xferAsset: akta,
          assetAmount: (action === TipActionPost) ? postFee : reactFee
        }
      ),
      ERR_INVALID_TRANSFER
    )
  }

  private validatePostPayment(
    mbrPayment: gtxn.PaymentTxn,
    cid: CID,
    isAmendment: boolean,
    extraAmount: uint64
  ): void {
    const { posts, votes, votelist } = this.mbr(cid, '', Bytes(''))
    const akta = getAkitaAssets(this.akitaDAO.value).akta
    const referralFeeAmount = referralFee(this.akitaDAO.value, akta)
    let amount: uint64 = posts + votes + votelist + referralFeeAmount + extraAmount
    if (isAmendment) {
      amount += AmendmentMBR
    }

    loggedAssert(
      match(
        mbrPayment,
        {
          receiver: Global.currentApplicationAddress,
          amount
        }
      ),
      ERR_INVALID_PAYMENT
    )
  }

  private validateReactPayment(mbrPayment: gtxn.PaymentTxn, reactionExists: boolean, extra: uint64): void {
    const { reactionlist, reactions } = this.mbr(Bytes(''), '', Bytes(''))
    const mbrAmount: uint64 = reactionExists
      ? reactionlist
      : reactions + reactionlist

    loggedAssert(
      match(
        mbrPayment,
        {
          receiver: Global.currentApplicationAddress,
          amount: mbrAmount + extra
        }
      ),
      ERR_INVALID_PAYMENT
    )
  }

  private createDefaultMeta(origin: Account, initialized: boolean, wallet: uint64, automated: boolean): void {
    this.meta(origin).value = {
      initialized,
      wallet,
      streak: 1,
      startDate: Global.latestTimestamp,
      lastActive: Global.latestTimestamp,
      followerIndex: 0,
      followerCount: 0,
      automated,
      followGateID: 0,
      addressGateID: 0,
      defaultPayWallID: 0
    }
  }

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  create(version: string, akitaDAO: Application, akitaDAOEscrow: EscrowConfig): void {
    this.version.value = version
    this.akitaDAO.value = akitaDAO
    this.akitaDAOEscrow.value = clone(akitaDAOEscrow)
  }

  init(): void {
    const akta = Asset(getAkitaAssets(this.akitaDAO.value).akta)
    loggedAssert(!Global.currentApplicationAddress.isOptedIn(akta), ERR_ALREADY_OPTED_IN)

    itxn
      .assetTransfer({
        assetReceiver: Global.currentApplicationAddress,
        assetAmount: 0,
        xferAsset: akta
      })
      .submit()
  }

  // AKITA SOCIAL PLUGIN METHODS ------------------------------------------------------------------

  post(
    mbrPayment: gtxn.PaymentTxn,
    tip: gtxn.AssetTransferTxn,
    timestamp: uint64,
    nonce: bytes<24>,
    cid: CID,
    gateID: uint64,
    usePayWall: boolean,
    payWallID: uint64,
    creatorFlags: uint64
  ): void {
    const postKey = this.computePostKey(timestamp, nonce)

    this.validateTip(tip, TipActionPost)
    this.createPost(postKey, mbrPayment, cid, gateID, usePayWall, payWallID, PostTypePost, Bytes(''), creatorFlags)
  }

  editPost(
    mbrPayment: gtxn.PaymentTxn,
    tip: gtxn.AssetTransferTxn,
    cid: CID,
    amendment: bytes<32>,
    creatorFlags: uint64
  ): void {
    loggedAssert(this.posts(amendment).exists, ERR_POST_NOT_FOUND)
    const { gateID, usePayWall, payWallID, postType, editKey } = this.verifyEditAmendment(amendment, cid)
    loggedAssert(!this.isReply(postType), ERR_IS_A_REPLY)

    this.validateTip(tip, TipActionPost)
    this.createPost(editKey, mbrPayment, cid, gateID, usePayWall, payWallID, PostTypeEditPost, amendment, creatorFlags)
  }

  gatedReply(
    mbrPayment: gtxn.PaymentTxn,
    tip: gtxn.AssetTransferTxn,
    gateTxn: gtxn.ApplicationCallTxn,
    timestamp: uint64,
    nonce: bytes<24>,
    cid: CID,
    ref: bytes,
    type: uint64,
    gateID: uint64,
    usePayWall: boolean,
    payWallID: uint64,
    creatorFlags: uint64
  ): void {
    const replyKey = this.computePostKey(timestamp, nonce)

    const { refBytes, addedMbr, postGateID } = this.resolveParentContext(type, ref)
    loggedAssert(gateCheck(gateTxn, this.akitaDAO.value, Txn.sender, postGateID), ERR_FAILED_GATE)

    this.validateTip(tip, TipActionReact)
    this.createReply(replyKey, mbrPayment, addedMbr, cid, refBytes, gateID, usePayWall, payWallID, PostTypeReply, Bytes(''), creatorFlags)
  }

  reply(
    mbrPayment: gtxn.PaymentTxn,
    tip: gtxn.AssetTransferTxn,
    timestamp: uint64,
    nonce: bytes<24>,
    cid: CID,
    ref: bytes,
    type: uint64,
    gateID: uint64,
    usePayWall: boolean,
    payWallID: uint64,
    creatorFlags: uint64
  ): void {
    const replyKey = this.computePostKey(timestamp, nonce)

    const { refBytes, addedMbr, postGateID } = this.resolveParentContext(type, ref)
    loggedAssert(postGateID === 0, ERR_HAS_GATE)

    this.validateTip(tip, TipActionReact)
    this.createReply(replyKey, mbrPayment, addedMbr, cid, refBytes, gateID, usePayWall, payWallID, PostTypeReply, Bytes(''), creatorFlags)
  }

  gatedEditReply(
    mbrPayment: gtxn.PaymentTxn,
    tip: gtxn.AssetTransferTxn,
    gateTxn: gtxn.ApplicationCallTxn,
    cid: CID,
    amendment: bytes<32>,
    creatorFlags: uint64
  ): void {
    const { parentPostRef, ogPostGateID, gateID, usePayWall, payWallID, editKey } = this.prepareReplyEdit(amendment, cid)
    loggedAssert(gateCheck(gateTxn, this.akitaDAO.value, Txn.sender, ogPostGateID), ERR_FAILED_GATE)

    this.validateTip(tip, TipActionReact)
    this.createReply(editKey, mbrPayment, 0, cid, parentPostRef, gateID, usePayWall, payWallID, PostTypeEditReply, amendment, creatorFlags)
  }

  editReply(
    mbrPayment: gtxn.PaymentTxn,
    tip: gtxn.AssetTransferTxn,
    cid: CID,
    amendment: bytes<32>,
    creatorFlags: uint64
  ): void {
    const { parentPostRef, ogPostGateID, gateID, usePayWall, payWallID, editKey } = this.prepareReplyEdit(amendment, cid)
    loggedAssert(ogPostGateID === 0, ERR_HAS_GATE)

    this.validateTip(tip, TipActionReact)
    this.createReply(editKey, mbrPayment, 0, cid, parentPostRef, gateID, usePayWall, payWallID, PostTypeEditReply, amendment, creatorFlags)
  }

  vote(
    mbrPayment: gtxn.PaymentTxn,
    tip: gtxn.AssetTransferTxn,
    ref: bytes,
    type: uint64,
    isUp: boolean
  ): void {
    let { refBytes, creator } = this.toBytes32(type, ref)
    if (type === RefTypePost) {
      loggedAssert(this.posts(refBytes).exists, ERR_POST_NOT_FOUND);
      ({ creator } = this.posts(refBytes).value);
    }

    const addedMbr = this.createEmptyPostIfNecessary(refBytes, creator)

    this.validateTip(tip, TipActionReact)
    const mbrNeeded: uint64 = this.mbr(Bytes(''), '', Bytes('')).votelist + addedMbr
    this.createVote(mbrPayment, mbrNeeded, refBytes, isUp)
  }

  editVote(
    mbrPayment: gtxn.PaymentTxn,
    tip: gtxn.AssetTransferTxn,
    ref: bytes<32>,
    flip: boolean
  ): void {
    const voteListKey: VoteListKey = { user: b16(Txn.sender.bytes), ref: b16(ref) }
    loggedAssert(this.votelist(voteListKey).exists, ERR_HAVENT_VOTED)

    const { impact, isUp } = this.votelist(voteListKey).value

    // undo user vote
    this.updateVotes(ref, !isUp, impact)

    // delete votelist
    this.votelist(voteListKey).delete()

    // if the user doesn't want to flip their vote, delete the votelist and refund
    if (!flip) {
      // refund user
      itxn
        .payment({
          receiver: Txn.sender,
          amount: this.mbr(Bytes(''), '', Bytes('')).votelist
        })
        .submit()

      return
    }

    // if the user wants to flip their vote, vote again but the opposite way
    this.validateTip(tip, TipActionReact)
    this.createVote(mbrPayment, 0, ref, !isUp)
  }

  gatedReact(
    mbrPayment: gtxn.PaymentTxn,
    tip: gtxn.AssetTransferTxn,
    gateTxn: gtxn.ApplicationCallTxn,
    ref: bytes,
    type: uint64,
    NFT: uint64
  ): void {
    const { refBytes, addedMbr, postGateID } = this.resolveParentContext(type, ref)
    loggedAssert(gateCheck(gateTxn, this.akitaDAO.value, Txn.sender, postGateID), ERR_FAILED_GATE)

    this.validateTip(tip, TipActionReact)
    this.createReaction(mbrPayment, addedMbr, refBytes, NFT)
  }

  react(
    mbrPayment: gtxn.PaymentTxn,
    tip: gtxn.AssetTransferTxn,
    ref: bytes,
    type: uint64,
    NFT: uint64
  ): void {
    const { refBytes, addedMbr, postGateID } = this.resolveParentContext(type, ref)
    loggedAssert(postGateID === 0, ERR_HAS_GATE)

    this.validateTip(tip, TipActionReact)
    this.createReaction(mbrPayment, addedMbr, refBytes, NFT)
  }

  deleteReaction(ref: bytes<32>, NFT: uint64): void {
    this.loadPostWithAccessCheck(ref)

    const reactionListKey: ReactionListKey = { user: b16(Txn.sender.bytes), ref: b16(ref), NFT }

    loggedAssert(this.reactionlist(reactionListKey).exists, ERR_ALREADY_REACTED)

    this.reactions({ ref, NFT }).value -= 1
    this.reactionlist(reactionListKey).delete()

    itxn
      .payment({
        receiver: Txn.sender,
        amount: this.mbr(Bytes(''), '', Bytes('')).reactionlist,

      })
      .submit()
  }

  // Unified moderation-write endpoint. Replaces the pre-existing
  // `setPostFlag` / `setModeratorContentFlags` pair: callers in
  // `AkitaSocialModeration` now read the post once (via `getPost`) and
  // forward both the updated value and the preserved value in a single
  // write, saving a full method dispatch on this (size-constrained)
  // contract.
  setPostModeration(ref: bytes<32>, againstContentPolicy: boolean, moderatorFlags: uint64): void {
    // Only the moderation contract can call this
    loggedAssert(Txn.sender === Application(getAkitaSocialAppList(this.akitaDAO.value).moderation).address, ERR_NOT_MODERATION)
    loggedAssert(this.posts(ref).exists, ERR_POST_NOT_FOUND)
    this.posts(ref).value.againstContentPolicy = againstContentPolicy
    this.posts(ref).value.moderatorFlags = moderatorFlags
  }

  initMeta(
    mbrPayment: gtxn.PaymentTxn,
    user: Account,
    automated: boolean,
    subscriptionIndex: uint64,
    NFD: uint64,
    akitaNFT: uint64,
  ): uint64 {
    const wallet = getWalletIDUsingAkitaDAO(this.akitaDAO.value, user)
    const userIsSender = (Txn.sender === user)

    loggedAssert(!this.meta(Txn.sender).exists, ERR_META_ALREADY_EXISTS)

    loggedAssert(
      match(
        mbrPayment,
        {
          receiver: Global.currentApplicationAddress,
          amount: this.mbr(Bytes(''), '', Bytes('')).meta + ImpactMetaMBR
        }
      ),
      ERR_INVALID_PAYMENT
    )

    const impact = getAkitaSocialAppList(this.akitaDAO.value).impact

    itxn
      .payment({
        receiver: Application(impact).address,
        amount: ImpactMetaMBR
      })
      .submit()

    if (automated) {
      this.createDefaultMeta(Txn.sender, userIsSender, wallet.id, true)

      abiCall<typeof AkitaSocialImpact.prototype.cacheMeta>({
        appId: impact,
        args: [
          Txn.sender,
          0,
          0,
          0
        ]
      })

      return 0
    }

    this.createDefaultMeta(Txn.sender, userIsSender, wallet.id, false)

    // Reuse the `impact` local captured above; re-calling
    // `getAkitaSocialAppList(this.akitaDAO.value).impact` here would fully
    // re-inline the struct lookup, wasting ~10 program bytes on an already
    // size-constrained contract.
    const impactScore = abiCall<typeof AkitaSocialImpact.prototype.cacheMeta>({
      appId: impact,
      args: [
        Txn.sender,
        subscriptionIndex,
        NFD,
        akitaNFT
      ]
    }).returnValue

    // Meta was just created with streak=1, startDate=now, no votes.
    // Running `calculateSocialImpact` on those inputs produces exactly 1
    // ((1 * 100) / 60 = 1; age=0 contributes 0; no vote component), so we skip
    // the extra inner-txn call to impact and return the known value.
    return impactScore + 1
  }

  createPayWall(mbrPayment: gtxn.PaymentTxn, payWall: ViewPayWallValue): uint64 {
    loggedAssert(
      match(
        mbrPayment,
        {
          receiver: Global.currentApplicationAddress,
          amount: {
            greaterThanEq: this.payWallMbr(payWall)
          }
        }
      ),
      ERR_INVALID_PAYMENT
    )

    const id = this.payWallId.value
    this.payWallId.value++

    this.paywall(id).value = clone(payWall)

    return id
  }

  updateMeta(
    followGateID: uint64,
    addressGateID: uint64,
    subscriptionIndex: uint64,
    NFD: uint64,
    akitaNFT: uint64,
    defaultPayWallID: uint64
  ): void {
    loggedAssert(this.meta(Txn.sender).exists, ERR_META_DOESNT_EXIST)
    loggedAssert(this.paywall(defaultPayWallID).exists, ERR_PAYWALL_NOT_FOUND)

    // Fold the three field writes into a single read-modify-write against the
    // meta box. The previous layout issued three separate `box_replace`s, each
    // of which rebuilt the `"m" + Txn.sender` key — roughly a dozen bytes of
    // redundant key construction on a contract that sits inside the 8192-byte
    // program-size ceiling.
    const m = clone(this.meta(Txn.sender).value)
    m.followGateID = followGateID
    m.addressGateID = addressGateID
    m.defaultPayWallID = defaultPayWallID
    this.meta(Txn.sender).value = clone(m)

    const impact = getAkitaSocialAppList(this.akitaDAO.value).impact
    abiCall<typeof AkitaSocialImpact.prototype.cacheMeta>({
      appId: impact,
      args: [
        Txn.sender,
        subscriptionIndex,
        NFD,
        akitaNFT
      ]
    })
  }

  updateFollowerMeta(address: Account, newFollowerIndex: uint64, newFollowerCount: uint64): void {
    loggedAssert(Txn.sender === Application(getAkitaSocialAppList(this.akitaDAO.value).graph).address, ERR_NOT_GRAPH)
    this.meta(address).value.followerIndex = newFollowerIndex
    this.meta(address).value.followerCount = newFollowerCount
  }

  // REF TYPE REGISTRY (DAO-GATED) -----------------------------------------------------------------

  registerRefType(mbrPayment: gtxn.PaymentTxn, name: string, schema: bytes): uint64 {
    loggedAssert(Txn.sender === this.getAkitaDAOWallet().address, ERR_NOT_AKITA_DAO)

    loggedAssert(
      match(
        mbrPayment,
        {
          receiver: Global.currentApplicationAddress,
          amount: this.mbr(Bytes(''), name, schema).refTypes
        }
      ),
      ERR_INVALID_PAYMENT
    )

    this.refTypeCounter.value += 1
    const id = this.refTypeCounter.value

    this.refTypes(id).value = { name, schema }

    return id
  }

  // READ ONLY METHODS ----------------------------------------------------------------------------

  // NOTE: `getRefType` was removed to keep the main contract under its
  // program-size budget. The `refTypes` box is still readable directly via
  // `getApplicationBoxByName` off-chain; `registerRefType` remains on-contract
  // since it also handles MBR + DAO-auth.

  // Delegates to `AkitaSocialModeration.isBanned`. Intentionally not an
  // @abimethod — external callers should go directly to the moderation
  // contract. Internal callers (`loadPostWithAccessCheck`, etc.) use this as
  // a subroutine so they don't each have to re-derive the moderation appId.
  private isBanned(account: Account): boolean {
    return abiCall<typeof AkitaSocialModeration.prototype.isBanned>({
      appId: getAkitaSocialAppList(this.akitaDAO.value).moderation,
      args: [account]
    }).returnValue
  }

  // Exposes the raw inputs needed by `AkitaSocialImpact` to compute a user's
  // social-activity score. Calling this is cheaper than recomputing the score
  // here because the math now lives entirely on the impact contract.
  @abimethod({ readonly: true })
  getSocialImpactInputs(user: Account): SocialImpactInputs {
    return this.readSocialImpactInputs(user)
  }

  @abimethod({ readonly: true })
  getMetaExists(user: Account): boolean {
    return this.meta(user).exists
  }

  @abimethod({ readonly: true })
  getMeta(user: Account): MetaValue {
    return this.meta(user).value
  }


  @abimethod({ readonly: true })
  getPostExists(ref: bytes<32>): boolean {
    return this.posts(ref).exists
  }

  @abimethod({ readonly: true })
  getPost(ref: bytes<32>): PostValue {
    loggedAssert(this.posts(ref).exists, ERR_POST_NOT_FOUND)
    return this.posts(ref).value
  }

  @abimethod({ readonly: true })
  getVote(account: Account, ref: bytes<32>): VoteListValue {
    const voteListKey: VoteListKey = { user: b16(account.bytes), ref: b16(ref) }
    loggedAssert(this.votelist(voteListKey).exists, ERR_HAVENT_VOTED)

    return this.votelist(voteListKey).value
  }

  @abimethod({ readonly: true })
  getVotes(keys: { user: Account, ref: bytes<32> }[]): VoteListValue[] {
    const votes: VoteListValue[] = []
    for (const { user, ref } of clone(keys)) {
      const voteListKey: VoteListKey = { user: b16(user.bytes), ref: b16(ref) }
      if (this.votelist(voteListKey).exists) {
        votes.push(this.votelist(voteListKey).value)
      } else {
        votes.push({ impact: 0, isUp: false })
      }
    }

    return votes
  }

  @abimethod({ readonly: true })
  getReactionExists(ref: bytes<32>, NFT: uint64): boolean {
    return this.reactions({ ref, NFT }).exists
  }
}

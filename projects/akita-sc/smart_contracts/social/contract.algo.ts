import { Account, Application, Asset, BoxMap, Bytes, bytes, clone, contract, Global, GlobalState, gtxn, itxn, itxnCompose, loggedAssert, match, op, Txn, uint64 } from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod } from '@algorandfoundation/algorand-typescript/arc4'
import { AssetHolding, btoi, itob } from '@algorandfoundation/algorand-typescript/op'
import { classes } from 'polytype'
import { FactoryGlobalStateMaxBytes, FactoryGlobalStateMaxUints } from '../utils/constants'
import { calcPercent, gateCheck, gateCheckCtx, getAkitaAssets, getAkitaSocialAppList, getOriginAccount, getPluginAppList, getSocialFees, impactRange, legacyWalletOf, principalOf, recordPayer, referrerOrZeroAddress, releaseDeposit, sendReferralPaymentTo, sponsorCost, tipWallet } from '../utils/functions'
import { gateCtx } from '../utils/principal'
import { CallerTypeGlobal } from '../arc58/account/types'
import { CID } from '../utils/types/base'
import { AkitaSocialBoxPrefixMeta, AkitaSocialboxPrefixPayWall, AkitaSocialBoxPrefixPosts, AkitaSocialBoxPrefixReactionList, AkitaSocialBoxPrefixReactionRecords, AkitaSocialBoxPrefixReactions, AkitaSocialBoxPrefixRefTypes, AkitaSocialBoxPrefixVoteList, AkitaSocialBoxPrefixVoteRecords, AkitaSocialBoxPrefixVotes, AkitaSocialGlobalStateKeysLegacyListCutoff, AkitaSocialGlobalStateKeysPaywallID, AkitaSocialGlobalStateKeysRefTypeCounter, AmendmentMBR, BuiltInRefTypeCount, EditBackRefMBR, ImpactMetaMBR, LegacyMinPostsMBR, LegacySocialPluginDecember, LegacySocialPluginMay, LegacySocialPluginV002, LegacySocialPluginV003, MainNetGenesisHash, MAX_TIMESTAMP_DRIFT, MinPostsMBR, ONE_DAY, PostTypeEditPost, PostTypeEditReply, PostTypePost, PostTypeReply, ReactionlistMBR, ReactionRecordMBR, RefTypeAddress, RefTypeApp, RefTypeAsset, RefTypePost, ReplyParentRefMBR, TipActionPost, TipActionReact, TipSendTypeARC58, TipSendTypeDirect, VotelistMBR, VotesMBR } from './constants'
import { errAlreadyOptedIn, errAlreadyReacted, errAlreadyVoted, errAutomatedAccount, errBanned, errBlocked, errFailedGate, errHasGate, errHaventVoted, errInvalidApp, errInvalidAsset, errInvalidPayment, errInvalidPaywall, errInvalidRefLength, errInvalidTransfer, errIsAReply, errIsAlreadyAmended, errLegacyRef, errMetaAlreadyExists, errMetaDoesntExist, errNoSelfVote, errNotAReply, errNotAkitaDao, errNotGraph, errNotModeration, errNotSelfMeta, errNotYourPostToEdit, errPaywallNotFound, errPostExists, errPostNotFound, errRefTypeNotFound, errReplyNotFound, errReservedRef, errTimestampTooOld, errUserDoesNotOwnNft } from './errors'
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

  /**
   * Timestamp of the first post box created by this version. Posts created before it may still
   * have legacy 16-byte-keyed vote/reaction entries; posts created after it never do. Set lazily
   * (no initial value) so an upgraded app stamps it on its first post, and a fresh app has no
   * legacy posts at all.
   */
  legacyListCutoff = GlobalState<uint64>({ key: AkitaSocialGlobalStateKeysLegacyListCutoff })

  // BOXES ----------------------------------------------------------------------------------------

  /** All the posts on the network */
  posts = BoxMap<bytes<32>, PostValue>({ keyPrefix: AkitaSocialBoxPrefixPosts })
  /** Pay wall information for posts */
  paywall = BoxMap<uint64, ViewPayWallValue>({ keyPrefix: AkitaSocialboxPrefixPayWall })
  /** Counters for each post to track votes */
  votes = BoxMap<bytes<32>, VotesValue>({ keyPrefix: AkitaSocialBoxPrefixVotes })
  /** Legacy user votes keyed by 16-byte prefixes. Read and deleted only; new votes go to `voteRecords`. */
  votelist = BoxMap<VoteListKey, VoteListValue>({ keyPrefix: AkitaSocialBoxPrefixVoteList })
  /** User votes and their impact, keyed by sha256(user || ref) */
  voteRecords = BoxMap<bytes<32>, VoteListValue>({ keyPrefix: AkitaSocialBoxPrefixVoteRecords })
  /** Counters for each post to track reactions */
  reactions = BoxMap<ReactionsKey, uint64>({ keyPrefix: AkitaSocialBoxPrefixReactions })
  /** Legacy reactions keyed by 16-byte prefixes. Read and deleted only; new reactions go to `reactionRecords`. */
  reactionlist = BoxMap<ReactionListKey, bytes<0>>({ keyPrefix: AkitaSocialBoxPrefixReactionList })
  /** Who has reacted to what, keyed by sha256(user || ref || NFT) */
  reactionRecords = BoxMap<bytes<32>, bytes<0>>({ keyPrefix: AkitaSocialBoxPrefixReactionRecords })
  /** The meta data for each user */
  meta = BoxMap<Account, MetaValue>({ keyPrefix: AkitaSocialBoxPrefixMeta })
  /** Registered ref types (key = uint64 ID, value = name + external flag + schema) */
  refTypes = BoxMap<uint64, RefTypeValue>({ keyPrefix: AkitaSocialBoxPrefixRefTypes })

  // PRIVATE METHODS ------------------------------------------------------------------------------

  private isCreator(creator: Account, sender: Account): boolean {
    return creator === sender
  }

  private voteKey(user: Account, ref: bytes<32>): bytes<32> {
    return op.sha256(user.bytes.concat(ref))
  }

  private reactionKey(user: Account, ref: bytes<32>, NFT: uint64): bytes<32> {
    return op.sha256(user.bytes.concat(ref).concat(itob(NFT)))
  }

  private legacyVoteKey(user: Account, ref: bytes<32>): VoteListKey {
    return { user: b16(user.bytes), ref: b16(ref) }
  }

  private legacyReactionKey(user: Account, ref: bytes<32>, NFT: uint64): ReactionListKey {
    return { user: b16(user.bytes), ref: b16(ref), NFT }
  }

  // Called wherever a posts box is created, so every post made by this version is at or
  // after the cutoff and can never match a legacy 16-byte entry.
  private stampLegacyCutoff(): void {
    if (!this.legacyListCutoff.hasValue) {
      this.legacyListCutoff.value = Global.latestTimestamp
    }
  }

  // Legacy 16-byte entries may only be consumed against a ref that existed before the
  // cutoff, so a lookalike ref (same first 16 bytes) minted after the upgrade can't match.
  private assertLegacyRef(ref: bytes<32>): void {
    loggedAssert(
      this.posts(ref).exists && (
        !this.legacyListCutoff.hasValue ||
        this.posts(ref).value.timestamp < this.legacyListCutoff.value
      ),
      errLegacyRef
    )
  }

  // A box keyed by an account's own address is that account's wall, gated by its addressGateID.
  private wallGateID(refBytes: bytes<32>, creator: Account): uint64 {
    if (refBytes === creator.bytes && this.meta(creator).exists) {
      return this.meta(creator).value.addressGateID
    }
    return 0
  }

  private assertPayWall(usePayWall: boolean, payWallID: uint64): void {
    loggedAssert(
      (!usePayWall && payWallID === 0) || (
        usePayWall && (
          payWallID !== 0 && this.paywall(payWallID).exists ||
          payWallID === 0 && this.paywall(this.meta(Txn.sender).value.defaultPayWallID).exists
        )
      ),
      errInvalidPaywall
    )
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
        loggedAssert(ref.length === 32, errInvalidRefLength)
        refBytes = ref.toFixed({ length: 32 })
        break
      case RefTypeAsset:
        loggedAssert(ref.length === 8, errInvalidRefLength)
        loggedAssert(Asset(btoi(ref)).total > 0, errInvalidAsset)
        refBytes = ref.concat(op.bzero(24)).toFixed({ length: 32 })
        creator = Asset(btoi(ref)).creator
        break
      case RefTypeAddress:
        loggedAssert(ref.length === 32, errInvalidRefLength)
        refBytes = ref.toFixed({ length: 32 })
        creator = Account(refBytes)
        // Every ref type shares one key space, and the key of an asset or app ref is its ID followed by
        // 24 zero bytes. An "address" of that shape would materialize the asset's or app's ref with a
        // creator nobody controls, and every later tip on it would miss its real creator (audit 08,
        // SOC-02). No account address has that shape, so walls of real addresses are unaffected.
        // The zero address stays a valid ref (no creator, the whole fee goes to the DAO): an ID is
        // never zero, so it is the key of no asset or app a client references.
        loggedAssert(ref.slice(8) !== op.bzero(24) || ref.slice(0, 8) === op.bzero(8), errReservedRef)
        // the wall's addressGateID is enforced by the callers (see wallGateID)
        break
      case RefTypeApp:
        loggedAssert(ref.length === 8, errInvalidRefLength)
        loggedAssert(Application(btoi(ref)).approvalProgram.length > 0, errInvalidApp)
        refBytes = ref.concat(op.bzero(24)).toFixed({ length: 32 })
        creator = Application(btoi(ref)).creator
        break
      default:
        // For any non-built-in type, verify it's registered
        loggedAssert(this.refTypes(type).exists, errRefTypeNotFound)
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
    loggedAssert(!this.isBanned(Txn.sender), errBanned)
    loggedAssert(this.posts(ref).exists, errPostNotFound)
    const { creator } = this.posts(ref).value
    loggedAssert(!this.isBlocked(creator, Txn.sender), errBlocked)
    return creator
  }

  // Derives the deterministic post/reply key from the sender, timestamp, and
  // nonce. Also asserts the timestamp is recent (within MAX_TIMESTAMP_DRIFT
  // seconds) so each caller (`post`, `reply`, `gatedReply`) doesn't have to
  // repeat the boilerplate.
  private computePostKey(timestamp: uint64, nonce: bytes<24>): bytes<32> {
    loggedAssert(Global.latestTimestamp - timestamp <= MAX_TIMESTAMP_DRIFT, errTimestampTooOld)
    return op.sha256(Txn.sender.bytes.concat(itob(timestamp)).concat(nonce))
  }

  // Shared prologue for `reply` / `gatedReply` / `react` / `gatedReact`.
  // Resolves the raw ref into its `bytes<32>` key and returns the gate that
  // applies: the wall owner's addressGateID for an address wall, otherwise the
  // parent post's gateID. The caller runs whichever gate check differentiates
  // its entrypoint (non-gated asserts `postGateID === 0`). A post has to exist
  // to be replied or reacted to; anything else (an asset, an address, an app,
  // or a registered type such as a link) gets an empty post the first time
  // someone comments or reacts, as a first vote does. `addedMbr` is that box's MBR.
  private resolveParentContext(
    type: uint64,
    ref: bytes,
  ): { refBytes: bytes<32>, addedMbr: uint64, postGateID: uint64 } {
    const { refBytes, creator: fallback } = this.toBytes32(type, ref)

    if (type === RefTypePost) {
      loggedAssert(this.posts(refBytes).exists, errPostNotFound)
    }
    const addedMbr = this.createEmptyPostIfNecessary(refBytes, fallback)
    const { creator, gateID } = this.posts(refBytes).value
    const wallGate = this.wallGateID(refBytes, creator)

    return { refBytes, addedMbr, postGateID: wallGate !== 0 ? wallGate : gateID }
  }

  // MBR of a parent box materialized for this call (see `resolveParentContext`). The legacy terms
  // accept the deployed plugin's posts quote (LegacyMinPostsMBR).
  private materializedMbr(addedMbr: uint64, legacyTerms: boolean): uint64 {
    if (legacyTerms && addedMbr > 0) {
      return addedMbr - (MinPostsMBR - LegacyMinPostsMBR)
    }
    return addedMbr
  }

  // Shared prologue for editPost / editReply / gatedEditReply. Given an
  // amendment box that the caller has already asserted exists, validates
  // ownership + not-already-amended, computes the deterministic `editKey`,
  // and stamps it into the amendment's `ref` field. The existence check is
  // intentionally left to each caller so `editPost` can emit
  // `errPostNotFound` and the reply-edit paths can emit
  // `errReplyNotFound`. The is-reply vs. is-post check is likewise the
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
    loggedAssert(this.isCreator(creator, Txn.sender), errNotYourPostToEdit)
    loggedAssert(!this.isAmended(ref, postType), errIsAlreadyAmended)

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
    loggedAssert(this.posts(amendment).exists, errReplyNotFound)
    const { ref, gateID, usePayWall, payWallID, postType, editKey } = this.verifyEditAmendment(amendment, cid)
    loggedAssert(this.isReply(postType), errNotAReply)

    const parentPostRef = ref.slice(36, 68).toFixed({ length: 32 })
    const { gateID: parentGateID, creator: parentCreator } = this.posts(parentPostRef).value
    // A wall is gated by its owner's addressGateID, not by the wall box's own gateID (always 0). Apply
    // it to edits as resolveParentContext does to new replies (audit 08, SOC-09).
    const wallGate = this.wallGateID(parentPostRef, parentCreator)
    const ogPostGateID: uint64 = wallGate !== 0 ? wallGate : parentGateID

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

  // Referrer of a fee paid by Txn.sender. Hinted entry points pass the verified principal's
  // referrer (`principalOf(dao, wallet).referrer`). Legacy shims (`legacy`) pass the zero address and
  // resolve the deployed registry referrer here, lazily, at the same sites the deployed contract did.
  private feeReferrer(referrer: Account, legacy: boolean): Account {
    if (legacy) {
      return referrerOrZeroAddress(legacyWalletOf(this.akitaDAO.value, Txn.sender))
    }
    return referrer
  }

  // Whether an old-selector call gets the legacy payment terms (the deployed plugin's quote: 46,500
  // posts base, no reply parent-ref or never-voted votes-box charge, 18,900 reaction record, absorbed
  // up-vote/react referral MBR). Only callers that quote those terms get them: on MainNet the four
  // deployed social plugin programs, on any other network (TestNet, LocalNet: their deployed-plugin
  // copies have other ids) any app caller. A top-level sender always pays the corrected terms, so the
  // under-charges are not open to every account. Hinted calls (`legacy` false) never get them.
  private legacyTerms(legacy: boolean): boolean {
    if (!legacy) {
      return false
    }
    const caller = Global.callerApplicationId
    if (caller === 0) {
      return false
    }
    if (Global.genesisHash !== MainNetGenesisHash) {
      return true
    }
    return caller === LegacySocialPluginV003 ||
      caller === LegacySocialPluginV002 ||
      caller === LegacySocialPluginMay ||
      caller === LegacySocialPluginDecember
  }

  // Returns the referral disbursement MBR the app just spent, so the caller can charge it.
  private sendPostPayment(referrer: Account, legacy: boolean): uint64 {
    const akta = getAkitaAssets(this.akitaDAO.value).akta
    const { postFee } = getSocialFees(this.akitaDAO.value)
    const { leftover, referralMbr } = sendReferralPaymentTo(this.akitaDAO.value, this.feeReferrer(referrer, legacy), akta, postFee, this.akitaDAOEscrow.value.app.address)

    itxn
      .assetTransfer({
        assetReceiver: this.akitaDAOEscrow.value.app.address,
        assetAmount: leftover,
        xferAsset: akta
      })
      .submit()

    return referralMbr
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

  // Tips `creator` the react fee (minus the impact tax, which goes to the DAO after the cut for
  // `referrer`, already resolved by `feeReferrer`) and returns the MBR the app spent doing so: `arc58`
  // (the creator-wallet opt-in route) and `referralMbr` (the referral disbursement).
  //
  // Routing wallet (§6.2): hinted entry points route only to a wallet that still owns the creator at
  // rest and controls its origin live (`tipWallet`), on the account that receives the remainder
  // (`tipRoute`). Legacy shims (`legacy`) route on the RAW stored `meta(creator).wallet`, decided on
  // `creator`, exactly as the deployed contract did and as deployed social plugins quote it
  // (`checkTipMbrRequirements` on the raw value), so their exact payments still match.
  private tipCreator(creator: Account, referrer: Account, legacy: boolean): { arc58: uint64, referralMbr: uint64 } {
    const { reactFee, impactTaxMin, impactTaxMax } = getSocialFees(this.akitaDAO.value)

    if (creator === Global.zeroAddress) {
      const akta = Asset(getAkitaAssets(this.akitaDAO.value).akta)
      itxn
        .assetTransfer({
          assetReceiver: this.akitaDAOEscrow.value.app.address,
          assetAmount: reactFee,
          xferAsset: akta
        })
        .submit()
      return { arc58: 0, referralMbr: 0 }
    }

    const creatorImpact = this.getUserImpact(creator)
    const tax = calcPercent(reactFee, impactRange(creatorImpact, impactTaxMin, impactTaxMax))

    let wallet: uint64 = 0
    if (this.meta(creator).exists) {
      wallet = this.meta(creator).value.wallet
    }

    let type = TipSendTypeDirect
    let arc58: uint64 = 0
    let receiver = creator
    if (legacy) {
      ({ type, arc58 } = this.checkTipMbrRequirements(this.akitaDAO.value, creator, Application(wallet)))
    } else {
      wallet = tipWallet(this.akitaDAO.value, creator, wallet)
      ;({ type, arc58, receiver } = this.tipRoute(this.akitaDAO.value, creator, Application(wallet)))
    }

    const akta = getAkitaAssets(this.akitaDAO.value).akta
    const { leftover, referralMbr } = sendReferralPaymentTo(this.akitaDAO.value, referrer, akta, tax, this.akitaDAOEscrow.value.app.address)

    if (type === TipSendTypeARC58) {
      this.arc58SendReactionPayments(Application(wallet), akta, leftover, (reactFee - tax))
      return { arc58, referralMbr }
    }

    this.sendDirectReactionPayments(receiver, akta, leftover, (reactFee - tax))
    return { arc58: 0, referralMbr }
  }

  private createEmptyPostIfNecessary(key: bytes<32>, creator: Account): uint64 {
    if (!this.posts(key).exists) {
      this.stampLegacyCutoff()
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
    loggedAssert(this.meta(account).exists, errMetaDoesntExist)

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
    this.voteRecords(this.voteKey(account, ref)).value = { impact, isUp }
  }

  /**
   * The caller's vote record on `ref` carries a refundable deposit. When someone else paid it, remember
   * them, so un-voting returns it to whoever paid (see "SPONSORED STORAGE" in utils/functions.ts).
   */
  private recordVotePayer(mbrPayment: gtxn.PaymentTxn, ref: bytes<32>): void {
    recordPayer(this.voteRecords(this.voteKey(Txn.sender, ref)).key, mbrPayment.sender, Txn.sender)
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
    referrer: Account,
    legacy: boolean,
  ): void {
    loggedAssert(!this.isBanned(Txn.sender), errBanned)
    this.assertPayWall(usePayWall, payWallID)

    const isEditPost = postType === PostTypeEditPost
    // For edits, we need extra MBR for the back-reference (originalKey)
    const editExtraMbr: uint64 = isEditPost ? EditBackRefMBR : 0
    // pay the post fee first so the exact referral MBR it spent can be charged
    const referralMbr = this.sendPostPayment(referrer, legacy)
    this.validatePostPayment(mbrPayment, cid, isEditPost, editExtraMbr + referralMbr, this.legacyTerms(legacy))

    // update streak before we measure impact
    // this way we guarantee the box exists
    this.updateStreak(Txn.sender)

    const impact = this.getUserImpact(Txn.sender)

    loggedAssert(!this.posts(postKey).exists, errPostExists)

    // Ref structure based on postType:
    // Post:     CID
    // EditPost: CID + originalKey
    const postRef: bytes = isEditPost
      ? Bytes(cid).concat(amendmentOf)
      : Bytes(cid)

    this.stampLegacyCutoff()
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
    this.recordVotePayer(mbrPayment, postKey)
  }

  private createReply(
    replyKey: bytes<32>,
    mbrPayment: gtxn.PaymentTxn,
    addedMbr: uint64,
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
    referrer: Account,
    legacy: boolean,
  ): void {
    loggedAssert(!this.isBanned(Txn.sender), errBanned)
    this.assertPayWall(usePayWall, payWallID)
    const { creator } = this.posts(parentRef).value
    loggedAssert(!this.isBlocked(creator, Txn.sender), errBlocked)

    // update streak before we measure impact
    // this way we guarantee the box exists
    this.updateStreak(Txn.sender)

    const isEditReply = postType === PostTypeEditReply
    // tipCreator returns the referral (and ARC-58 opt-in) MBR it spent; replies charge both
    const tip = this.tipCreator(creator, this.feeReferrer(referrer, legacy), legacy)
    let extra: uint64 = tip.arc58 + tip.referralMbr
    // every reply ref carries the 32-byte parentRef (the deployed contract did not charge it, so the
    // legacy terms don't either: old plugins never quote it)
    const legacyTerms = this.legacyTerms(legacy)
    if (!legacyTerms) {
      extra += ReplyParentRefMBR
    }
    extra += this.materializedMbr(addedMbr, legacyTerms)

    if (isEditReply) {
      extra += EditBackRefMBR
    }
    // validate after we send payments, annoying but saves us compute
    this.validatePostPayment(mbrPayment, cid, isEditReply, extra, legacyTerms)

    loggedAssert(!this.posts(replyKey).exists, errPostExists)

    // Reply ref structure based on postType:
    // Reply:     CID + parentRef
    // EditReply: CID + parentRef + originalKey
    const replyRef: bytes = isEditReply
      ? Bytes(cid).concat(parentRef).concat(amendmentOf)
      : Bytes(cid).concat(parentRef)

    this.stampLegacyCutoff()
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
    this.recordVotePayer(mbrPayment, replyKey)
  }

  private createVote(
    mbrPayment: gtxn.PaymentTxn,
    mbrNeeded: uint64,
    ref: bytes<32>,
    isUp: boolean,
    referrer: Account,
    legacy: boolean,
  ): void {
    const creator = this.loadPostWithAccessCheck(ref)

    loggedAssert(
      !this.voteRecords(this.voteKey(Txn.sender, ref)).exists &&
      !this.votelist(this.legacyVoteKey(Txn.sender, ref)).exists,
      errAlreadyVoted
    )
    loggedAssert(Txn.sender !== creator, errNoSelfVote)
    // A gated wall can't be up-voted. A down-vote is always accepted: the wall owner sets and clears the
    // gate at will, even inside one group, and would otherwise decide who may lower the vote total that
    // feeds the owner's own impact (audit 08, SOC-06).
    loggedAssert(!isUp || this.wallGateID(ref, creator) === 0, errHasGate)

    const senderIsAutomated = this.meta(Txn.sender).value.automated
    loggedAssert(!senderIsAutomated, errAutomatedAccount)

    // update streak before we measure impact
    // this way we guarantee the box exists
    this.updateStreak(Txn.sender)
    let extra: uint64 = 0

    if (isUp) {
      // old plugins never quote the up-vote referral MBR, so their up-votes pay no referral
      const tipReferrer = this.legacyTerms(legacy) ? Global.zeroAddress : this.feeReferrer(referrer, legacy)
      const tip = this.tipCreator(creator, tipReferrer, legacy)
      extra = tip.arc58 + tip.referralMbr
    } else {
      const { reactFee } = getSocialFees(this.akitaDAO.value)
      const akta = getAkitaAssets(this.akitaDAO.value).akta

      itxn
        .assetTransfer({
          assetReceiver: this.akitaDAOEscrow.value.app.address,
          assetAmount: reactFee,
          xferAsset: akta
        })
        .submit()
    }

    // a new vote record carries a deposit (a flipped vote keeps the one it has); a payer other than
    // the voter funds the record that remembers them
    const sponsor: uint64 = mbrNeeded > 0 ? sponsorCost(mbrPayment.sender, Txn.sender) : 0

    // validate after we send payments, annoying but saves us compute
    loggedAssert(
      match(
        mbrPayment,
        {
          receiver: Global.currentApplicationAddress,
          amount: mbrNeeded + extra + sponsor
        }
      ),
      errInvalidPayment
    )

    // calls a transaction
    const senderImpact = this.getUserImpact(Txn.sender)
    this.updateVotes(ref, isUp, senderImpact)
    this.createVoteList(ref, isUp, Txn.sender, senderImpact)
    if (sponsor > 0) {
      this.recordVotePayer(mbrPayment, ref)
    }
  }

  private createReaction(
    mbrPayment: gtxn.PaymentTxn,
    addedMbr: uint64,
    ref: bytes<32>,
    NFT: uint64,
    referrer: Account,
    legacy: boolean,
  ): void {
    const creator = this.loadPostWithAccessCheck(ref)
    // sender has NFT
    loggedAssert(AssetHolding.assetBalance(Txn.sender, NFT)[0] > 0, errUserDoesNotOwnNft)

    const recordKey = this.reactionKey(Txn.sender, ref, NFT)
    loggedAssert(
      !this.reactionRecords(recordKey).exists &&
      !this.reactionlist(this.legacyReactionKey(Txn.sender, ref, NFT)).exists,
      errAlreadyReacted
    )

    // update streak before we measure impact
    // this way we guarantee the box exists
    this.updateStreak(Txn.sender)

    const reactionKey: ReactionsKey = { ref, NFT }
    const reactionExists = this.reactions(reactionKey).exists

    // old plugins never quote the react referral MBR, so their reactions pay no referral
    const legacyTerms = this.legacyTerms(legacy)
    const tip = this.tipCreator(creator, legacyTerms ? Global.zeroAddress : this.feeReferrer(referrer, legacy), legacy)
    const extra: uint64 = tip.arc58 + tip.referralMbr + this.materializedMbr(addedMbr, legacyTerms)

    // validate after we send payments, annoying but saves us compute
    this.validateReactPayment(mbrPayment, reactionExists, extra, legacyTerms)

    if (reactionExists) {
      this.reactions(reactionKey).value += 1
    } else {
      this.reactions(reactionKey).value = 1
    }

    this.reactionRecords(recordKey).create()
    recordPayer(this.reactionRecords(recordKey).key, mbrPayment.sender, Txn.sender)
  }

  private validateTip(tip: gtxn.AssetTransferTxn, action: TipAction) {
    const akta = Asset(getAkitaAssets(this.akitaDAO.value).akta)
    const { postFee, reactFee } = getSocialFees(this.akitaDAO.value)
    loggedAssert(
      match(
        tip,
        {
          // anyone may pay the fee, but a clawback-sourced transfer would spend someone else's AKTA
          assetSender: Global.zeroAddress,
          assetReceiver: Global.currentApplicationAddress,
          xferAsset: akta,
          assetAmount: (action === TipActionPost) ? postFee : reactFee
        }
      ),
      errInvalidTransfer
    )
  }

  private validatePostPayment(
    mbrPayment: gtxn.PaymentTxn,
    cid: CID,
    isAmendment: boolean,
    extraAmount: uint64,
    legacyTerms: boolean,
  ): void {
    // any referral MBR is passed in through extraAmount (the exact amount spent); a payer other than
    // the author funds the record that remembers them for the author's refundable vote deposit
    const { posts, votes, votelist } = this.mbr(cid, '', Bytes(''))
    let amount: uint64 = posts + votes + votelist + extraAmount + sponsorCost(mbrPayment.sender, Txn.sender)
    if (isAmendment) {
      amount += AmendmentMBR
    }
    // the legacy terms accept the deployed plugin's posts quote (LegacyMinPostsMBR)
    if (legacyTerms) {
      amount -= MinPostsMBR - LegacyMinPostsMBR
    }

    loggedAssert(
      match(
        mbrPayment,
        {
          receiver: Global.currentApplicationAddress,
          amount
        }
      ),
      errInvalidPayment
    )
  }

  private validateReactPayment(mbrPayment: gtxn.PaymentTxn, reactionExists: boolean, extra: uint64, legacyTerms: boolean): void {
    const { reactions } = this.mbr(Bytes(''), '', Bytes(''))
    // the legacy terms accept the deployed plugin's reaction-list quote (ReactionlistMBR) for the new record
    const reactionlist: uint64 = legacyTerms ? ReactionlistMBR : ReactionRecordMBR
    const mbrAmount: uint64 = reactionExists
      ? reactionlist
      : reactions + reactionlist

    loggedAssert(
      match(
        mbrPayment,
        {
          receiver: Global.currentApplicationAddress,
          // a payer other than the reactor funds the record that remembers them
          amount: mbrAmount + extra + sponsorCost(mbrPayment.sender, Txn.sender)
        }
      ),
      errInvalidPayment
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
    loggedAssert(!Global.currentApplicationAddress.isOptedIn(akta), errAlreadyOptedIn)

    itxn
      .assetTransfer({
        assetReceiver: Global.currentApplicationAddress,
        assetAmount: 0,
        xferAsset: akta
      })
      .submit()
  }

  // AKITA SOCIAL PLUGIN METHODS ------------------------------------------------------------------
  //
  // Principal resolution (docs/principal-resolution/PHASE-0-SPEC.md §6.2, §7.2). Every write method
  // that pays a referral, tips a creator, checks a gate or stores a wallet exists twice:
  //  - the HINTED method keeps the canonical name and takes `wallet: uint64` as its LAST argument. It
  //    verifies the hint first (`principalOf`, strict: a wrong hint reverts, 0 = act as the sender),
  //    pays the referral to the verified referrer, routes creator tips through `tipWallet`, and checks
  //    gates against the verified context (`Gate.mustCheckFor`, `gateCheckCtx`; Q4).
  //  - the LEGACY shim (`legacyX`, `@abimethod({ name: 'x' })`) keeps the old selector and the deployed
  //    semantics: registry referrer, raw `meta.wallet` tip route, gate subject `Txn.sender`, and the
  //    payment terms the deployed social plugin quotes, but those terms only for the deployed plugins
  //    (`legacyTerms`: other callers pay the corrected terms). Shims are removed in Phase 4 (§7.4).
  // Social state stays keyed by the spender (`Txn.sender`) in both (Q5).

  post(
    mbrPayment: gtxn.PaymentTxn,
    tip: gtxn.AssetTransferTxn,
    timestamp: uint64,
    nonce: bytes<24>,
    cid: CID,
    gateID: uint64,
    usePayWall: boolean,
    payWallID: uint64,
    creatorFlags: uint64,
    wallet: uint64
  ): void {
    const p = principalOf(this.akitaDAO.value, wallet)
    this.assertPrincipalNotBanned(p.principal)
    const postKey = this.computePostKey(timestamp, nonce)

    this.validateTip(tip, TipActionPost)
    this.createPost(postKey, mbrPayment, cid, gateID, usePayWall, payWallID, PostTypePost, Bytes(''), creatorFlags, p.referrer, false)
  }

  /** LEGACY shim (pre-hint selector, deployed semantics). */
  @abimethod({ name: 'post' })
  legacyPost(
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
    this.createPost(postKey, mbrPayment, cid, gateID, usePayWall, payWallID, PostTypePost, Bytes(''), creatorFlags, Global.zeroAddress, true)
  }

  editPost(
    mbrPayment: gtxn.PaymentTxn,
    tip: gtxn.AssetTransferTxn,
    cid: CID,
    amendment: bytes<32>,
    creatorFlags: uint64,
    wallet: uint64
  ): void {
    const p = principalOf(this.akitaDAO.value, wallet)
    this.assertPrincipalNotBanned(p.principal)
    this.editPostImpl(mbrPayment, tip, cid, amendment, creatorFlags, p.referrer, false)
  }

  /** LEGACY shim (pre-hint selector, deployed semantics). */
  @abimethod({ name: 'editPost' })
  legacyEditPost(
    mbrPayment: gtxn.PaymentTxn,
    tip: gtxn.AssetTransferTxn,
    cid: CID,
    amendment: bytes<32>,
    creatorFlags: uint64
  ): void {
    this.editPostImpl(mbrPayment, tip, cid, amendment, creatorFlags, Global.zeroAddress, true)
  }

  private editPostImpl(
    mbrPayment: gtxn.PaymentTxn,
    tip: gtxn.AssetTransferTxn,
    cid: CID,
    amendment: bytes<32>,
    creatorFlags: uint64,
    referrer: Account,
    legacy: boolean
  ): void {
    loggedAssert(this.posts(amendment).exists, errPostNotFound)
    const { gateID, usePayWall, payWallID, postType, editKey } = this.verifyEditAmendment(amendment, cid)
    loggedAssert(!this.isReply(postType), errIsAReply)

    this.validateTip(tip, TipActionPost)
    this.createPost(editKey, mbrPayment, cid, gateID, usePayWall, payWallID, PostTypeEditPost, amendment, creatorFlags, referrer, legacy)
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
    creatorFlags: uint64,
    wallet: uint64
  ): void {
    const p = principalOf(this.akitaDAO.value, wallet)
    this.assertPrincipalNotBanned(p.principal)
    const replyKey = this.computePostKey(timestamp, nonce)

    const { refBytes, addedMbr, postGateID } = this.resolveParentContext(type, ref)
    // the gate subject is the verified context (principal, wallet, spender), not the spender (Q4)
    loggedAssert(gateCheckCtx(gateTxn, this.akitaDAO.value, gateCtx(p), postGateID), errFailedGate)

    this.validateTip(tip, TipActionReact)
    this.createReply(replyKey, mbrPayment, addedMbr, cid, refBytes, gateID, usePayWall, payWallID, PostTypeReply, Bytes(''), creatorFlags, p.referrer, false)
  }

  /** LEGACY shim (pre-hint selector, deployed semantics: Gate.mustCheck on Txn.sender). */
  @abimethod({ name: 'gatedReply' })
  legacyGatedReply(
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
    loggedAssert(gateCheck(gateTxn, this.akitaDAO.value, Txn.sender, postGateID), errFailedGate)

    this.validateTip(tip, TipActionReact)
    this.createReply(replyKey, mbrPayment, addedMbr, cid, refBytes, gateID, usePayWall, payWallID, PostTypeReply, Bytes(''), creatorFlags, Global.zeroAddress, true)
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
    creatorFlags: uint64,
    wallet: uint64
  ): void {
    const p = principalOf(this.akitaDAO.value, wallet)
    this.assertPrincipalNotBanned(p.principal)
    this.replyImpl(mbrPayment, tip, timestamp, nonce, cid, ref, type, gateID, usePayWall, payWallID, creatorFlags, p.referrer, false)
  }

  /** LEGACY shim (pre-hint selector, deployed semantics). */
  @abimethod({ name: 'reply' })
  legacyReply(
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
    this.replyImpl(mbrPayment, tip, timestamp, nonce, cid, ref, type, gateID, usePayWall, payWallID, creatorFlags, Global.zeroAddress, true)
  }

  private replyImpl(
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
    creatorFlags: uint64,
    referrer: Account,
    legacy: boolean
  ): void {
    const replyKey = this.computePostKey(timestamp, nonce)

    const { refBytes, addedMbr, postGateID } = this.resolveParentContext(type, ref)
    loggedAssert(postGateID === 0, errHasGate)

    this.validateTip(tip, TipActionReact)
    this.createReply(replyKey, mbrPayment, addedMbr, cid, refBytes, gateID, usePayWall, payWallID, PostTypeReply, Bytes(''), creatorFlags, referrer, legacy)
  }

  gatedEditReply(
    mbrPayment: gtxn.PaymentTxn,
    tip: gtxn.AssetTransferTxn,
    gateTxn: gtxn.ApplicationCallTxn,
    cid: CID,
    amendment: bytes<32>,
    creatorFlags: uint64,
    wallet: uint64
  ): void {
    const p = principalOf(this.akitaDAO.value, wallet)
    this.assertPrincipalNotBanned(p.principal)
    const { parentPostRef, ogPostGateID, gateID, usePayWall, payWallID, editKey } = this.prepareReplyEdit(amendment, cid)
    loggedAssert(gateCheckCtx(gateTxn, this.akitaDAO.value, gateCtx(p), ogPostGateID), errFailedGate)

    this.validateTip(tip, TipActionReact)
    this.createReply(editKey, mbrPayment, 0, cid, parentPostRef, gateID, usePayWall, payWallID, PostTypeEditReply, amendment, creatorFlags, p.referrer, false)
  }

  /** LEGACY shim (pre-hint selector, deployed semantics: Gate.mustCheck on Txn.sender). */
  @abimethod({ name: 'gatedEditReply' })
  legacyGatedEditReply(
    mbrPayment: gtxn.PaymentTxn,
    tip: gtxn.AssetTransferTxn,
    gateTxn: gtxn.ApplicationCallTxn,
    cid: CID,
    amendment: bytes<32>,
    creatorFlags: uint64
  ): void {
    const { parentPostRef, ogPostGateID, gateID, usePayWall, payWallID, editKey } = this.prepareReplyEdit(amendment, cid)
    loggedAssert(gateCheck(gateTxn, this.akitaDAO.value, Txn.sender, ogPostGateID), errFailedGate)

    this.validateTip(tip, TipActionReact)
    this.createReply(editKey, mbrPayment, 0, cid, parentPostRef, gateID, usePayWall, payWallID, PostTypeEditReply, amendment, creatorFlags, Global.zeroAddress, true)
  }

  editReply(
    mbrPayment: gtxn.PaymentTxn,
    tip: gtxn.AssetTransferTxn,
    cid: CID,
    amendment: bytes<32>,
    creatorFlags: uint64,
    wallet: uint64
  ): void {
    const p = principalOf(this.akitaDAO.value, wallet)
    this.assertPrincipalNotBanned(p.principal)
    this.editReplyImpl(mbrPayment, tip, cid, amendment, creatorFlags, p.referrer, false)
  }

  /** LEGACY shim (pre-hint selector, deployed semantics). */
  @abimethod({ name: 'editReply' })
  legacyEditReply(
    mbrPayment: gtxn.PaymentTxn,
    tip: gtxn.AssetTransferTxn,
    cid: CID,
    amendment: bytes<32>,
    creatorFlags: uint64
  ): void {
    this.editReplyImpl(mbrPayment, tip, cid, amendment, creatorFlags, Global.zeroAddress, true)
  }

  private editReplyImpl(
    mbrPayment: gtxn.PaymentTxn,
    tip: gtxn.AssetTransferTxn,
    cid: CID,
    amendment: bytes<32>,
    creatorFlags: uint64,
    referrer: Account,
    legacy: boolean
  ): void {
    const { parentPostRef, ogPostGateID, gateID, usePayWall, payWallID, editKey } = this.prepareReplyEdit(amendment, cid)
    loggedAssert(ogPostGateID === 0, errHasGate)

    this.validateTip(tip, TipActionReact)
    this.createReply(editKey, mbrPayment, 0, cid, parentPostRef, gateID, usePayWall, payWallID, PostTypeEditReply, amendment, creatorFlags, referrer, legacy)
  }

  vote(
    mbrPayment: gtxn.PaymentTxn,
    tip: gtxn.AssetTransferTxn,
    ref: bytes,
    type: uint64,
    isUp: boolean,
    wallet: uint64
  ): void {
    const p = principalOf(this.akitaDAO.value, wallet)
    this.assertPrincipalNotBanned(p.principal)
    this.voteImpl(mbrPayment, tip, ref, type, isUp, p.referrer, false)
  }

  /** LEGACY shim (pre-hint selector, deployed semantics). */
  @abimethod({ name: 'vote' })
  legacyVote(
    mbrPayment: gtxn.PaymentTxn,
    tip: gtxn.AssetTransferTxn,
    ref: bytes,
    type: uint64,
    isUp: boolean
  ): void {
    this.voteImpl(mbrPayment, tip, ref, type, isUp, Global.zeroAddress, true)
  }

  private voteImpl(
    mbrPayment: gtxn.PaymentTxn,
    tip: gtxn.AssetTransferTxn,
    ref: bytes,
    type: uint64,
    isUp: boolean,
    referrer: Account,
    legacy: boolean
  ): void {
    let { refBytes, creator } = this.toBytes32(type, ref)
    if (type === RefTypePost) {
      loggedAssert(this.posts(refBytes).exists, errPostNotFound);
      ({ creator } = this.posts(refBytes).value);
    }

    // the votes box for a never-voted ref is created by this call, so charge it too (the deployed
    // contract did not, so the legacy terms don't: old plugins never quote it)
    const legacyTerms = this.legacyTerms(legacy)
    const votesMbr: uint64 = (legacyTerms || this.votes(refBytes).exists) ? 0 : VotesMBR
    let addedMbr = this.createEmptyPostIfNecessary(refBytes, creator)
    // the legacy terms accept the deployed plugin's posts quote (LegacyMinPostsMBR) for a materialized ref
    if (legacyTerms && addedMbr > 0) {
      addedMbr -= MinPostsMBR - LegacyMinPostsMBR
    }

    this.validateTip(tip, TipActionReact)
    const mbrNeeded: uint64 = this.mbr(Bytes(''), '', Bytes('')).votelist + addedMbr + votesMbr
    this.createVote(mbrPayment, mbrNeeded, refBytes, isUp, referrer, legacy)
  }

  editVote(
    mbrPayment: gtxn.PaymentTxn,
    tip: gtxn.AssetTransferTxn,
    ref: bytes<32>,
    flip: boolean,
    wallet: uint64
  ): void {
    const p = principalOf(this.akitaDAO.value, wallet)
    this.editVoteImpl(mbrPayment, tip, ref, flip, p.referrer, false)
  }

  /** LEGACY shim (pre-hint selector, deployed semantics). */
  @abimethod({ name: 'editVote' })
  legacyEditVote(
    mbrPayment: gtxn.PaymentTxn,
    tip: gtxn.AssetTransferTxn,
    ref: bytes<32>,
    flip: boolean
  ): void {
    this.editVoteImpl(mbrPayment, tip, ref, flip, Global.zeroAddress, true)
  }

  private editVoteImpl(
    mbrPayment: gtxn.PaymentTxn,
    tip: gtxn.AssetTransferTxn,
    ref: bytes<32>,
    flip: boolean,
    referrer: Account,
    legacy: boolean
  ): void {
    const key = this.voteKey(Txn.sender, ref)
    let impact: uint64 = 0
    let isUp = false
    if (this.voteRecords(key).exists) {
      const record = clone(this.voteRecords(key).value)
      impact = record.impact
      isUp = record.isUp
      this.voteRecords(key).delete()
    } else {
      // a legacy entry can only be undone against the exact pre-cutoff ref it was cast on
      const legacyKey = this.legacyVoteKey(Txn.sender, ref)
      loggedAssert(this.votelist(legacyKey).exists, errHaventVoted)
      this.assertLegacyRef(ref)
      const record = clone(this.votelist(legacyKey).value)
      impact = record.impact
      isUp = record.isUp
      this.votelist(legacyKey).delete()
    }

    // undo user vote
    this.updateVotes(ref, !isUp, impact)

    // if the user doesn't want to flip their vote, refund the vote box to whoever paid for it
    // (legacy and new vote boxes have the same MBR; a legacy box never has a recorded payer)
    if (!flip) {
      const [receiver, amount] = releaseDeposit(this.voteRecords(key).key, Txn.sender, VotelistMBR)
      itxn.payment({ receiver, amount }).submit()

      return
    }

    // if the user wants to flip their vote, vote again but the opposite way
    this.validateTip(tip, TipActionReact)
    this.createVote(mbrPayment, 0, ref, !isUp, referrer, legacy)
  }

  gatedReact(
    mbrPayment: gtxn.PaymentTxn,
    tip: gtxn.AssetTransferTxn,
    gateTxn: gtxn.ApplicationCallTxn,
    ref: bytes,
    type: uint64,
    NFT: uint64,
    wallet: uint64
  ): void {
    const p = principalOf(this.akitaDAO.value, wallet)
    this.assertPrincipalNotBanned(p.principal)
    const { refBytes, addedMbr, postGateID } = this.resolveParentContext(type, ref)
    loggedAssert(gateCheckCtx(gateTxn, this.akitaDAO.value, gateCtx(p), postGateID), errFailedGate)

    this.validateTip(tip, TipActionReact)
    this.createReaction(mbrPayment, addedMbr, refBytes, NFT, p.referrer, false)
  }

  /** LEGACY shim (pre-hint selector, deployed semantics: Gate.mustCheck on Txn.sender). */
  @abimethod({ name: 'gatedReact' })
  legacyGatedReact(
    mbrPayment: gtxn.PaymentTxn,
    tip: gtxn.AssetTransferTxn,
    gateTxn: gtxn.ApplicationCallTxn,
    ref: bytes,
    type: uint64,
    NFT: uint64
  ): void {
    const { refBytes, addedMbr, postGateID } = this.resolveParentContext(type, ref)
    loggedAssert(gateCheck(gateTxn, this.akitaDAO.value, Txn.sender, postGateID), errFailedGate)

    this.validateTip(tip, TipActionReact)
    this.createReaction(mbrPayment, addedMbr, refBytes, NFT, Global.zeroAddress, true)
  }

  react(
    mbrPayment: gtxn.PaymentTxn,
    tip: gtxn.AssetTransferTxn,
    ref: bytes,
    type: uint64,
    NFT: uint64,
    wallet: uint64
  ): void {
    const p = principalOf(this.akitaDAO.value, wallet)
    this.assertPrincipalNotBanned(p.principal)
    this.reactImpl(mbrPayment, tip, ref, type, NFT, p.referrer, false)
  }

  /** LEGACY shim (pre-hint selector, deployed semantics). */
  @abimethod({ name: 'react' })
  legacyReact(
    mbrPayment: gtxn.PaymentTxn,
    tip: gtxn.AssetTransferTxn,
    ref: bytes,
    type: uint64,
    NFT: uint64
  ): void {
    this.reactImpl(mbrPayment, tip, ref, type, NFT, Global.zeroAddress, true)
  }

  private reactImpl(
    mbrPayment: gtxn.PaymentTxn,
    tip: gtxn.AssetTransferTxn,
    ref: bytes,
    type: uint64,
    NFT: uint64,
    referrer: Account,
    legacy: boolean
  ): void {
    const { refBytes, addedMbr, postGateID } = this.resolveParentContext(type, ref)
    loggedAssert(postGateID === 0, errHasGate)

    this.validateTip(tip, TipActionReact)
    this.createReaction(mbrPayment, addedMbr, refBytes, NFT, referrer, legacy)
  }

  // Refund path: no ban/block checks, so a reactor can always reclaim their MBR.
  deleteReaction(ref: bytes<32>, NFT: uint64): void {
    const recordKey = this.reactionKey(Txn.sender, ref, NFT)
    let refund: uint64 = ReactionRecordMBR
    if (this.reactionRecords(recordKey).exists) {
      this.reactionRecords(recordKey).delete()
    } else {
      // a legacy entry can only be undone against the exact pre-cutoff ref it was made on
      const legacyKey = this.legacyReactionKey(Txn.sender, ref, NFT)
      loggedAssert(this.reactionlist(legacyKey).exists, errAlreadyReacted)
      this.assertLegacyRef(ref)
      this.reactionlist(legacyKey).delete()
      refund = ReactionlistMBR
    }

    this.reactions({ ref, NFT }).value -= 1

    // back to whoever paid for the record (a legacy entry never has a recorded payer)
    const [receiver, amount] = releaseDeposit(this.reactionRecords(recordKey).key, Txn.sender, refund)
    itxn.payment({ receiver, amount }).submit()
  }

  // Unified moderation-write endpoint. Replaces the pre-existing
  // `setPostFlag` / `setModeratorContentFlags` pair: callers in
  // `AkitaSocialModeration` now read the post once (via `getPost`) and
  // forward both the updated value and the preserved value in a single
  // write, saving a full method dispatch on this (size-constrained)
  // contract.
  setPostModeration(ref: bytes<32>, againstContentPolicy: boolean, moderatorFlags: uint64): void {
    // Only the moderation contract can call this
    loggedAssert(Txn.sender === Application(getAkitaSocialAppList(this.akitaDAO.value).moderation).address, errNotModeration)
    loggedAssert(this.posts(ref).exists, errPostNotFound)
    this.posts(ref).value.againstContentPolicy = againstContentPolicy
    this.posts(ref).value.moderatorFlags = moderatorFlags
  }

  /**
   * Create the sender's social meta. `user` must be the sender (S-02; it stays in the ABI for
   * compatibility). The meta stores the VERIFIED wallet `principalOf(dao, wallet).wallet` (0 for a
   * plain account), which later routes creator tips (re-checked at read time by `tipWallet`).
   */
  initMeta(
    mbrPayment: gtxn.PaymentTxn,
    user: Account,
    automated: boolean,
    subscriptionIndex: uint64,
    NFD: uint64,
    akitaNFT: uint64,
    wallet: uint64,
  ): uint64 {
    const p = principalOf(this.akitaDAO.value, wallet)
    this.assertPrincipalNotBanned(p.principal)
    // meta can only be created for yourself; `user` stays in the ABI for compatibility
    loggedAssert(user === Txn.sender, errNotSelfMeta)
    return this.initMetaImpl(mbrPayment, automated, subscriptionIndex, NFD, akitaNFT, p.wallet)
  }

  /** LEGACY shim (pre-hint selector, deployed semantics: stores the registry wallet of the sender). */
  @abimethod({ name: 'initMeta' })
  legacyInitMeta(
    mbrPayment: gtxn.PaymentTxn,
    user: Account,
    automated: boolean,
    subscriptionIndex: uint64,
    NFD: uint64,
    akitaNFT: uint64,
  ): uint64 {
    // meta can only be created for yourself; `user` stays in the ABI for compatibility
    loggedAssert(user === Txn.sender, errNotSelfMeta)
    const wallet = legacyWalletOf(this.akitaDAO.value, Txn.sender)
    return this.initMetaImpl(mbrPayment, automated, subscriptionIndex, NFD, akitaNFT, wallet.id)
  }

  /**
   * Rebind the sender's meta wallet to the verified hint (`principalOf(dao, wallet).wallet`; 0 unbinds).
   * Backfill for metas stored with 0 or a registry wallet. ARC-58 wallets reach it through the social
   * plugin's `setMetaWallet(wallet, rekeyBack)` (spec §6.2, §6.11).
   */
  setMetaWallet(wallet: uint64): void {
    const p = principalOf(this.akitaDAO.value, wallet)
    loggedAssert(this.meta(Txn.sender).exists, errMetaDoesntExist)
    this.meta(Txn.sender).value.wallet = p.wallet
  }

  // Body of both initMeta entry points. The caller has already asserted `user === Txn.sender`
  // (S-02: meta is self-only, keyed by the spender) and passes the wallet id to store in it.
  private initMetaImpl(
    mbrPayment: gtxn.PaymentTxn,
    automated: boolean,
    subscriptionIndex: uint64,
    NFD: uint64,
    akitaNFT: uint64,
    wallet: uint64,
  ): uint64 {
    loggedAssert(!this.meta(Txn.sender).exists, errMetaAlreadyExists)

    loggedAssert(
      match(
        mbrPayment,
        {
          receiver: Global.currentApplicationAddress,
          amount: this.mbr(Bytes(''), '', Bytes('')).meta + ImpactMetaMBR
        }
      ),
      errInvalidPayment
    )

    const impact = getAkitaSocialAppList(this.akitaDAO.value).impact

    itxn
      .payment({
        receiver: Application(impact).address,
        amount: ImpactMetaMBR
      })
      .submit()

    if (automated) {
      this.createDefaultMeta(Txn.sender, true, wallet, true)

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

    this.createDefaultMeta(Txn.sender, true, wallet, false)

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
          amount: this.payWallMbr(payWall)
        }
      ),
      errInvalidPayment
    )

    const id = this.payWallId.value
    this.payWallId.value++

    this.paywall(id).value = clone(payWall)

    return id
  }

  updateMeta(
    mbrPayment: gtxn.PaymentTxn,
    followGateID: uint64,
    addressGateID: uint64,
    subscriptionIndex: uint64,
    NFD: uint64,
    akitaNFT: uint64,
    defaultPayWallID: uint64
  ): void {
    // a wall gate is checked against the wall's posts box, so setting one creates the box
    let wallMbr: uint64 = 0
    if (addressGateID !== 0) {
      wallMbr = this.createEmptyPostIfNecessary(Txn.sender.bytes, Txn.sender)
    }
    loggedAssert(
      match(mbrPayment, { receiver: Global.currentApplicationAddress, amount: wallMbr }),
      errInvalidPayment
    )
    this.updateMetaImpl(followGateID, addressGateID, subscriptionIndex, NFD, akitaNFT, defaultPayWallID)
  }

  /** LEGACY shim (pre-payment selector, deployed semantics: setting a wall gate creates no wall box). */
  @abimethod({ name: 'updateMeta' })
  legacyUpdateMeta(
    followGateID: uint64,
    addressGateID: uint64,
    subscriptionIndex: uint64,
    NFD: uint64,
    akitaNFT: uint64,
    defaultPayWallID: uint64
  ): void {
    this.updateMetaImpl(followGateID, addressGateID, subscriptionIndex, NFD, akitaNFT, defaultPayWallID)
  }

  private updateMetaImpl(
    followGateID: uint64,
    addressGateID: uint64,
    subscriptionIndex: uint64,
    NFD: uint64,
    akitaNFT: uint64,
    defaultPayWallID: uint64
  ): void {
    loggedAssert(this.meta(Txn.sender).exists, errMetaDoesntExist)
    // 0 clears the default paywall
    loggedAssert(defaultPayWallID === 0 || this.paywall(defaultPayWallID).exists, errPaywallNotFound)

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
    loggedAssert(Txn.sender === Application(getAkitaSocialAppList(this.akitaDAO.value).graph).address, errNotGraph)
    this.meta(address).value.followerIndex = newFollowerIndex
    this.meta(address).value.followerCount = newFollowerCount
  }

  // REF TYPE REGISTRY (DAO-GATED) -----------------------------------------------------------------

  registerRefType(mbrPayment: gtxn.PaymentTxn, name: string, schema: bytes): uint64 {
    loggedAssert(Txn.sender === this.getAkitaDAOWallet().address, errNotAkitaDao)

    loggedAssert(
      match(
        mbrPayment,
        {
          receiver: Global.currentApplicationAddress,
          amount: this.mbr(Bytes(''), name, schema).refTypes
        }
      ),
      errInvalidPayment
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

  // A ban on a wallet's main account also stops that wallet's escrows (audit 08, SOC-03). The spender
  // itself is still checked where it always was (`isBanned(Txn.sender)`); this adds the verified principal
  // of a hinted write (`principalOf(...).principal`: the wallet's origin in a window, else the sender).
  private assertPrincipalNotBanned(principal: Account): void {
    if (principal !== Txn.sender) {
      loggedAssert(!this.isBanned(principal), errBanned)
    }
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

  /**
   * A ref materialized by a reply, a reaction or `updateMeta` has a posts box but no votes box, and the
   * first vote on it pays for the votes box. Callers that quote a vote need to see that (audit 08, SOC-04).
   */
  @abimethod({ readonly: true })
  getVotesExist(ref: bytes<32>): boolean {
    return this.votes(ref).exists
  }

  @abimethod({ readonly: true })
  getPost(ref: bytes<32>): PostValue {
    loggedAssert(this.posts(ref).exists, errPostNotFound)
    return this.posts(ref).value
  }

  @abimethod({ readonly: true })
  getVote(account: Account, ref: bytes<32>): VoteListValue {
    const key = this.voteKey(account, ref)
    if (this.voteRecords(key).exists) {
      return this.voteRecords(key).value
    }

    const legacyKey = this.legacyVoteKey(account, ref)
    loggedAssert(this.votelist(legacyKey).exists, errHaventVoted)
    return this.votelist(legacyKey).value
  }

  @abimethod({ readonly: true })
  getVotes(keys: { user: Account, ref: bytes<32> }[]): VoteListValue[] {
    const votes: VoteListValue[] = []
    for (const { user, ref } of clone(keys)) {
      const key = this.voteKey(user, ref)
      const legacyKey = this.legacyVoteKey(user, ref)
      if (this.voteRecords(key).exists) {
        votes.push(this.voteRecords(key).value)
      } else if (this.votelist(legacyKey).exists) {
        votes.push(this.votelist(legacyKey).value)
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

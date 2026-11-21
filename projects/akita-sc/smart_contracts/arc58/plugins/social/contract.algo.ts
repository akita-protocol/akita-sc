import { Account, Application, Asset, Bytes, bytes, Global, itxn, loggedAssert, op, uint64 } from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod, encodeArc4, methodSelector } from '@algorandfoundation/algorand-typescript/arc4'
import { classes } from 'polytype'
import { GateArgs } from '../../../gates/types'
import { AmendmentMBR, EditBackRefMBR, ImpactMetaMBR, RefTypeAddress, RefTypeApp, RefTypeAsset, RefTypePost, ReplyParentRefMBR, SubscriptionStateModifierMBR } from '../../../social/constants'
import { getControlledSpendingAccount, rekeyAddress } from "@akita-protocol/plugin/functions"
import { GateMustCheckForAbiMethod, getAkitaAppList, getAkitaAssets, getAkitaSocialAppList, getSocialFees, pluginPrincipalOf, quoteReferrerOf, referralFeeTo, tipWallet } from '../../../utils/functions'
import { gateCtx, windowHint } from '../../../utils/principal'
import { CID } from '../../../utils/types/base'

// CONTRACT IMPORTS
import { BaseSocial } from '../../../social/base'
import type { AkitaSocial } from '../../../social/contract.algo'
import { AkitaSocialGraph } from '../../../social/graph.algo'
import type { AkitaSocialImpact } from '../../../social/impact.algo'
import type { AkitaSocialModeration } from '../../../social/moderation.algo'
import { AkitaBaseContract } from '../../../utils/base-contracts/upgradeable'
import { errHasGate, errInvalidAsset, errInvalidRefLength } from '../../../social/errors'
import { btoi, itob } from '@algorandfoundation/algorand-typescript/op'
import { errInvalidApp } from './errors'


/**
 * ARC-58 plugin for AkitaSocial. Principal-resolution version (docs/principal-resolution/PHASE-0-SPEC.md
 * §6.11): every target that verifies a wallet hint is called with `windowHint(wallet)` as its LAST
 * argument (invariant 6: only the wallet whose window this call serves), gated targets receive a
 * `Gate.mustCheckFor` txn built from `pluginPrincipalOf(dao, wallet)` (the context the target
 * recomputes), referral quotes use the window wallet's referrer, and creator-tip quotes use
 * `tipWallet` and `tipRoute` exactly as the target does. Existing method ABIs are unchanged; `setMetaWallet` is new.
 */
export class AkitaSocialPlugin extends classes(BaseSocial, AkitaBaseContract) {

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  create(version: string, akitaDAO: uint64): void {
    this.version.value = version
    this.akitaDAO.value = Application(akitaDAO)
  }

  // PRIVATE METHODS ------------------------------------------------------------------------------

  /**
   * The 32-byte key the social contract stores a target under, from the ref a caller passes
   * (matches `toBytes32` in the social contract). Posts and addresses are their own key, assets
   * and apps are their id padded to 32 bytes, and registered ref types (collections, links) are
   * `sha256(itob(type) || ref)`, so their refs can be any length.
   */
  private refKey(type: uint64, ref: bytes): bytes<32> {
    let refBytes: bytes<32>
    switch (type) {
      case RefTypePost:
        loggedAssert(ref.length === 32, errInvalidRefLength)
        refBytes = ref.toFixed({ length: 32 })
        break
      case RefTypeAsset:
        loggedAssert(ref.length === 8, errInvalidRefLength)
        loggedAssert(Asset(btoi(ref)).total > 0, errInvalidAsset)
        refBytes = ref.concat(op.bzero(24)).toFixed({ length: 32 })
        break
      case RefTypeAddress:
        loggedAssert(ref.length === 32, errInvalidRefLength)
        refBytes = ref.toFixed({ length: 32 })
        break
      case RefTypeApp:
        loggedAssert(ref.length === 8, errInvalidRefLength)
        loggedAssert(Application(btoi(ref)).approvalProgram.length > 0, errInvalidApp)
        refBytes = ref.concat(op.bzero(24)).toFixed({ length: 32 })
        break
      default:
        // Non-built-in ref types — derive storage key deterministically.
        // The core social contract validates the ref type is registered.
        refBytes = op.sha256(itob(type).concat(ref))
    }
    return refBytes
  }

  private getCreatorDetails(type: uint64, sender: Account, ref: bytes<32>): { postExists: boolean, creator: Account, creatorWallet: uint64, gateID: uint64 } {
    const { social } = getAkitaSocialAppList(this.akitaDAO.value)

    let creator = Global.zeroAddress
    let creatorWallet: uint64 = 0
    let gateID: uint64 = 0
    // we can assume the post exists if the type is a post
    let postMustExist = type === RefTypePost
    let postExists = postMustExist

    // if the type is not a post, we need to check if the post exists
    if (!postMustExist) {
      postExists = abiCall<typeof AkitaSocial.prototype.getPostExists>({
        sender,
        appId: social,
        args: [ref.toFixed({ length: 32 })]
      }).returnValue
    }

    if (postExists) {
      ({ creator, gateID } = abiCall<typeof AkitaSocial.prototype.getPost>({
        sender,
        appId: social,
        args: [ref],
      }).returnValue);
    } else {
      // Derive creator from ref type (matches toBytes32 in social contract)
      if (type === RefTypeAddress) {
        creator = Account(ref)
      } else if (type === RefTypeAsset) {
        creator = Asset(op.btoi(ref.slice(0, 8))).creator
      } else if (type === RefTypeApp) {
        creator = Application(op.btoi(ref.slice(0, 8))).creator
      }
    }

    const metaExists = abiCall<typeof AkitaSocial.prototype.getMetaExists>({
      sender,
      appId: social,
      args: [creator]
    }).returnValue

    if (!metaExists) {
      return { postExists, creator, creatorWallet, gateID };
    }

    const meta = abiCall<typeof AkitaSocial.prototype.getMeta>({
      sender,
      appId: social,
      args: [creator],
    }).returnValue
    // the same routing wallet AkitaSocial's hinted tipCreator uses, so the tip MBR quote matches
    creatorWallet = tipWallet(this.akitaDAO.value, creator, meta.wallet)

    // a box keyed by the creator's own address is their wall, gated by addressGateID
    if (postExists && ref === creator.bytes && meta.addressGateID !== 0) {
      gateID = meta.addressGateID
    }

    return { postExists, creator, creatorWallet, gateID };
  }

  // Referral disbursement MBR that AkitaSocial charges for a fee paid in `wallet`'s window: the
  // hinted target pays the verified principal's referrer (`principalOf(dao, windowHint(wallet))`),
  // which for this plugin's own window is `wallet`'s referrer (spec §6.11).
  private referralQuote(wallet: Application): uint64 {
    return referralFeeTo(this.akitaDAO.value, quoteReferrerOf(this.akitaDAO.value, wallet.id), getAkitaAssets(this.akitaDAO.value).akta)
  }

  // Referral MBR charged when the window tips a creator (reply, react, upvote). Tipping no one
  // (zero creator) pays the DAO directly with no referral.
  private tipReferralQuote(wallet: Application, creator: Account): uint64 {
    if (creator === Global.zeroAddress) {
      return 0
    }
    return this.referralQuote(wallet)
  }

  // `Gate.mustCheckFor` ctx argument for the hinted gated targets: the verified context the target
  // recomputes (`gateCtx(principalOf(dao, windowHint(wallet)))`) and asserts with `gateCheckCtx` (Q4).
  private gateCtxArg(wallet: Application): bytes {
    return encodeArc4(gateCtx(pluginPrincipalOf(this.akitaDAO.value, wallet)))
  }

  // AKITA SOCIAL PLUGIN METHODS ------------------------------------------------------------------

  post(
    wallet: Application,
    rekeyBack: boolean,
    timestamp: uint64,
    nonce: bytes<24>,
    cid: CID,
    gateID: uint64,
    usePayWall: boolean,
    payWallID: uint64,
    creatorFlags: uint64
  ): void {
    const sender = getControlledSpendingAccount(wallet)

    const akitaSocial = Application(getAkitaSocialAppList(this.akitaDAO.value).social)
    const { posts, votes, votelist } = this.mbr(cid, '', Bytes(''))
    // AkitaSocial.validatePostPayment also charges the referral disbursement MBR for the sender
    const mbrAmount: uint64 = posts + votes + votelist + this.referralQuote(wallet)
    const mbrPayment = itxn.payment({
      sender,
      receiver: akitaSocial.address,
      amount: mbrAmount
    })

    const akta = Asset(getAkitaAssets(this.akitaDAO.value).akta)
    const { postFee } = getSocialFees(this.akitaDAO.value)
    const tip = itxn.assetTransfer({
      sender,
      assetReceiver: akitaSocial.address,
      xferAsset: akta,
      assetAmount: postFee
    })

    abiCall<typeof AkitaSocial.prototype.post>({
      sender,
      appId: akitaSocial,
      args: [
        mbrPayment,
        tip,
        timestamp,
        nonce,
        cid,
        gateID,
        usePayWall,
        payWallID,
        creatorFlags,
        windowHint(wallet)
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  editPost(
    wallet: Application,
    rekeyBack: boolean,
    cid: CID,
    amendment: bytes<32>,
    creatorFlags: uint64
  ): void {
    const sender = getControlledSpendingAccount(wallet)

    const { social } = getAkitaSocialAppList(this.akitaDAO.value)
    const { posts, votes, votelist } = this.mbr(cid, '', Bytes(''))
    const mbrAmount: uint64 = posts + votes + votelist + AmendmentMBR + EditBackRefMBR + this.referralQuote(wallet)
    const mbrPayment = itxn.payment({
      sender,
      receiver: Application(social).address,
      amount: mbrAmount
    })

    const akta = Asset(getAkitaAssets(this.akitaDAO.value).akta)
    const { postFee } = getSocialFees(this.akitaDAO.value)
    const tip = itxn.assetTransfer({
      sender,
      assetReceiver: Application(social).address,
      xferAsset: akta,
      assetAmount: postFee
    })

    // Edit key is derived internally by contract: sha256(creator + originalKey + newCID)
    abiCall<typeof AkitaSocial.prototype.editPost>({
      sender,
      appId: social,
      args: [
        mbrPayment,
        tip,
        cid,
        amendment,
        creatorFlags,
        windowHint(wallet)
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  gatedReply(
    wallet: Application,
    rekeyBack: boolean,
    timestamp: uint64,
    nonce: bytes<24>,
    cid: CID,
    ref: bytes,
    type: uint64,
    gateID: uint64,
    args: GateArgs,
    usePayWall: boolean,
    payWallID: uint64,
    creatorFlags: uint64
  ): void {
    const sender = getControlledSpendingAccount(wallet)

    const { social } = getAkitaSocialAppList(this.akitaDAO.value)
    const { posts, votes, votelist } = this.mbr(cid, '', Bytes(''))
    const { postExists, creator, creatorWallet, gateID: postGateID } = this.getCreatorDetails(type, sender, this.refKey(type, ref))
    // replies fund the 32-byte parentRef and, through the creator tip, the sender's referral MBR
    let mbrAmount: uint64 = posts + votes + votelist + ReplyParentRefMBR + this.tipReferralQuote(wallet, creator)
    // a parent that isn't a post gets an empty posts box on its first reply
    if (!postExists) {
      mbrAmount += this.mbr(op.bzero(0), '', Bytes('')).posts
    }

    mbrAmount += this.tipRoute(this.akitaDAO.value, creator, Application(creatorWallet)).arc58

    const mbrPayment = itxn.payment({
      sender,
      receiver: Application(social).address,
      amount: mbrAmount
    })

    const akta = Asset(getAkitaAssets(this.akitaDAO.value).akta)
    const { reactFee } = getSocialFees(this.akitaDAO.value)
    const tip = itxn.assetTransfer({
      sender,
      assetReceiver: Application(social).address,
      xferAsset: akta,
      assetAmount: reactFee
    })

    // We're forced to manually construct an app call here because the abiCall<typeof Gate.prototype.mustCheckFor>
    // method immediately invokes & is not passable as an arg to the other call
    const gateTxn = itxn.applicationCall({
      sender,
      appId: getAkitaAppList(this.akitaDAO.value).gate,
      appArgs: [
        methodSelector(GateMustCheckForAbiMethod),
        this.gateCtxArg(wallet),
        postGateID,
        encodeArc4(args)
      ]
    })

    abiCall<typeof AkitaSocial.prototype.gatedReply>({
      sender,
      appId: social,
      args: [
        mbrPayment,
        tip,
        gateTxn,
        timestamp,
        nonce,
        cid,
        ref,
        type,
        gateID,
        usePayWall,
        payWallID,
        creatorFlags,
        windowHint(wallet)
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  reply(
    wallet: Application,
    rekeyBack: boolean,
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
    const sender = getControlledSpendingAccount(wallet)

    const { social } = getAkitaSocialAppList(this.akitaDAO.value)
    const { posts, votes, votelist } = this.mbr(cid, '', Bytes(''))
    const { postExists, creator, creatorWallet } = this.getCreatorDetails(type, sender, this.refKey(type, ref))
    // replies fund the 32-byte parentRef and, through the creator tip, the sender's referral MBR
    let mbrAmount: uint64 = posts + votes + votelist + ReplyParentRefMBR + this.tipReferralQuote(wallet, creator)
    // a parent that isn't a post gets an empty posts box on its first reply
    if (!postExists) {
      mbrAmount += this.mbr(op.bzero(0), '', Bytes('')).posts
    }

    mbrAmount += this.tipRoute(this.akitaDAO.value, creator, Application(creatorWallet)).arc58

    const mbrPayment = itxn.payment({
      sender,
      receiver: Application(social).address,
      amount: mbrAmount
    })

    const akta = Asset(getAkitaAssets(this.akitaDAO.value).akta)
    const { reactFee } = getSocialFees(this.akitaDAO.value)
    const tip = itxn.assetTransfer({
      sender,
      assetReceiver: Application(social).address,
      xferAsset: akta,
      assetAmount: reactFee
    })

    abiCall<typeof AkitaSocial.prototype.reply>({
      sender,
      appId: social,
      args: [
        mbrPayment,
        tip,
        timestamp,
        nonce,
        cid,
        ref,
        type,
        gateID,
        usePayWall,
        payWallID,
        creatorFlags,
        windowHint(wallet)
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  gatedEditReply(
    wallet: Application,
    rekeyBack: boolean,
    cid: CID,
    amendment: bytes<32>,
    args: GateArgs,
    creatorFlags: uint64
  ): void {
    const sender = getControlledSpendingAccount(wallet)

    const { social } = getAkitaSocialAppList(this.akitaDAO.value)
    const { posts, votes, votelist } = this.mbr(cid, '', Bytes(''))
    // edit replies also fund the amendment marker on the original and the back-ref on the edit
    let mbrAmount: uint64 = posts + votes + votelist + AmendmentMBR + EditBackRefMBR + ReplyParentRefMBR

    const postBeingAmended = abiCall<typeof AkitaSocial.prototype.getPost>({
      sender,
      appId: social,
      args: [amendment]
    }).returnValue

    // reply ref layout: CID(36) + parentRef(32) [+ originalKey(32)]
    const originalPostRef = postBeingAmended.ref.slice(36, 68).toFixed({ length: 32 })

    const { creator, creatorWallet, gateID: postGateID } = this.getCreatorDetails(RefTypePost, sender, originalPostRef)
    mbrAmount += this.tipReferralQuote(wallet, creator)
    mbrAmount += this.tipRoute(this.akitaDAO.value, creator, Application(creatorWallet)).arc58

    const mbrPayment = itxn.payment({
      sender,
      receiver: Application(social).address,
      amount: mbrAmount
    })

    const akta = Asset(getAkitaAssets(this.akitaDAO.value).akta)
    const { reactFee } = getSocialFees(this.akitaDAO.value)
    const tip = itxn.assetTransfer({
      sender,
      assetReceiver: Application(social).address,
      xferAsset: akta,
      assetAmount: reactFee
    })

    // inner transactions cannot cross a subroutine boundary, so the gate txn is built inline
    const gateTxn = itxn.applicationCall({
      sender,
      appId: getAkitaAppList(this.akitaDAO.value).gate,
      appArgs: [
        methodSelector(GateMustCheckForAbiMethod),
        this.gateCtxArg(wallet),
        postGateID,
        encodeArc4(args)
      ]
    })

    abiCall<typeof AkitaSocial.prototype.gatedEditReply>({
      sender,
      appId: social,
      args: [
        mbrPayment,
        tip,
        gateTxn,
        cid,
        amendment,
        creatorFlags,
        windowHint(wallet)
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  editReply(
    wallet: Application,
    rekeyBack: boolean,
    cid: CID,
    amendment: bytes<32>,
    creatorFlags: uint64
  ): void {
    const sender = getControlledSpendingAccount(wallet)

    const { social } = getAkitaSocialAppList(this.akitaDAO.value)
    const { posts, votes, votelist } = this.mbr(cid, '', Bytes(''))
    // edit replies also fund the amendment marker on the original and the back-ref on the edit
    let mbrAmount: uint64 = posts + votes + votelist + AmendmentMBR + EditBackRefMBR + ReplyParentRefMBR

    const postBeingAmended = abiCall<typeof AkitaSocial.prototype.getPost>({
      sender,
      appId: social,
      args: [amendment]
    }).returnValue

    // reply ref layout: CID(36) + parentRef(32) [+ originalKey(32)]
    const originalPostRef = postBeingAmended.ref.slice(36, 68).toFixed({ length: 32 })

    const { creator, creatorWallet } = this.getCreatorDetails(RefTypePost, sender, originalPostRef)
    mbrAmount += this.tipReferralQuote(wallet, creator)
    mbrAmount += this.tipRoute(this.akitaDAO.value, creator, Application(creatorWallet)).arc58

    const mbrPayment = itxn.payment({
      sender,
      receiver: Application(social).address,
      amount: mbrAmount
    })

    const akta = Asset(getAkitaAssets(this.akitaDAO.value).akta)
    const { reactFee } = getSocialFees(this.akitaDAO.value)
    const tip = itxn.assetTransfer({
      sender,
      assetReceiver: Application(social).address,
      xferAsset: akta,
      assetAmount: reactFee
    })

    abiCall<typeof AkitaSocial.prototype.editReply>({
      sender,
      appId: social,
      args: [
        mbrPayment,
        tip,
        cid,
        amendment,
        creatorFlags,
        windowHint(wallet)
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  vote(
    wallet: Application,
    rekeyBack: boolean,
    ref: bytes,
    type: uint64,
    isUp: boolean
  ): void {
    const sender = getControlledSpendingAccount(wallet)

    const { social } = getAkitaSocialAppList(this.akitaDAO.value)
    const { votelist, posts, votes } = this.mbr(op.bzero(0), '', Bytes(''))
    let mbrAmount: uint64 = votelist

    const refBytes = this.refKey(type, ref)

    const { postExists, creator, creatorWallet } = this.getCreatorDetails(type, sender, refBytes)

    // materializing a ref creates both its posts box and its votes box
    if (!postExists) {
      mbrAmount += posts + votes
    }

    if (isUp) {
      mbrAmount += this.tipReferralQuote(wallet, creator)
      mbrAmount += this.tipRoute(this.akitaDAO.value, creator, Application(creatorWallet)).arc58
    }

    const mbrPayment = itxn.payment({
      sender,
      receiver: Application(social).address,
      amount: mbrAmount
    })

    const akta = Asset(getAkitaAssets(this.akitaDAO.value).akta)
    const { reactFee } = getSocialFees(this.akitaDAO.value)
    const tip = itxn.assetTransfer({
      sender,
      assetReceiver: Application(social).address,
      xferAsset: akta,
      assetAmount: reactFee
    })

    abiCall<typeof AkitaSocial.prototype.vote>({
      sender,
      appId: social,
      args: [
        mbrPayment,
        tip,
        ref,
        type,
        isUp,
        windowHint(wallet)
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  editVote(
    wallet: Application,
    rekeyBack: boolean,
    ref: bytes<32>,
    flip: boolean
  ): void {
    const sender = getControlledSpendingAccount(wallet)

    const { social } = getAkitaSocialAppList(this.akitaDAO.value)

    const { isUp: wasUp } = abiCall<typeof AkitaSocial.prototype.getVote>({
      sender,
      appId: social,
      args: [sender, ref],
    }).returnValue

    const mbrPayment = itxn.payment({
      sender,
      receiver: Application(social).address,
      amount: 0,
    })

    const akta = Asset(getAkitaAssets(this.akitaDAO.value).akta)

    const tip = itxn.assetTransfer({
      sender,
      assetReceiver: Application(social).address,
      xferAsset: akta,
      assetAmount: 0,
    })

    if (flip) {
      const { reactFee } = getSocialFees(this.akitaDAO.value)
      tip.set({ assetAmount: reactFee })

      // check if the change is going to make us pay the post creator
      // !wasUp means we are flipping from downvote to upvote
      if (!wasUp) {
        // this is kind of gross but internally RefTypePost just enforces a trust assumption that the post exists
        const { creator, creatorWallet } = this.getCreatorDetails(RefTypePost, sender, ref.toFixed({ length: 32 }))
        const flipMbr: uint64 = this.tipReferralQuote(wallet, creator) + this.tipRoute(this.akitaDAO.value, creator, Application(creatorWallet)).arc58
        mbrPayment.set({ amount: flipMbr })
      }
    }

    abiCall<typeof AkitaSocial.prototype.editVote>({
      sender,
      appId: social,
      args: [
        mbrPayment,
        tip,
        ref,
        flip,
        windowHint(wallet)
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  gatedReact(
    wallet: Application,
    rekeyBack: boolean,
    ref: bytes,
    type: uint64,
    NFT: uint64,
    args: GateArgs
  ): void {
    const sender = getControlledSpendingAccount(wallet)
    const refBytes = this.refKey(type, ref)

    const { social } = getAkitaSocialAppList(this.akitaDAO.value)

    const reactionExists = abiCall<typeof AkitaSocial.prototype.getReactionExists>({
      sender,
      appId: social,
      args: [refBytes, NFT]
    }).returnValue

    const { reactions, reactionlist, posts } = this.mbr(op.bzero(0), '', Bytes(''))

    let mbrAmount: uint64 = reactionExists
      ? reactionlist
      : reactions + reactionlist

    // a target that isn't a post gets an empty posts box on its first reaction; the creator tip
    // carries the sender's referral MBR
    const { postExists, creator, creatorWallet, gateID: postGateID } = this.getCreatorDetails(type, sender, refBytes)
    if (!postExists) {
      mbrAmount += posts
    }
    mbrAmount += this.tipReferralQuote(wallet, creator)

    mbrAmount += this.tipRoute(this.akitaDAO.value, creator, Application(creatorWallet)).arc58

    const mbrPayment = itxn.payment({
      sender,
      receiver: Application(social).address,
      amount: mbrAmount
    })

    const akta = Asset(getAkitaAssets(this.akitaDAO.value).akta)
    const { reactFee } = getSocialFees(this.akitaDAO.value)
    const tip = itxn.assetTransfer({
      sender,
      assetReceiver: Application(social).address,
      xferAsset: akta,
      assetAmount: reactFee
    })

    // inner transactions cannot cross a subroutine boundary, so the gate txn is built inline
    const gateTxn = itxn.applicationCall({
      sender,
      appId: getAkitaAppList(this.akitaDAO.value).gate,
      appArgs: [
        methodSelector(GateMustCheckForAbiMethod),
        this.gateCtxArg(wallet),
        postGateID,
        encodeArc4(args)
      ]
    })

    abiCall<typeof AkitaSocial.prototype.gatedReact>({
      sender,
      appId: social,
      args: [
        mbrPayment,
        tip,
        gateTxn,
        ref,
        type,
        NFT,
        windowHint(wallet)
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  react(
    wallet: Application,
    rekeyBack: boolean,
    ref: bytes,
    type: uint64,
    NFT: uint64
  ): void {
    const sender = getControlledSpendingAccount(wallet)
    const refBytes = this.refKey(type, ref)

    const { social } = getAkitaSocialAppList(this.akitaDAO.value)

    const reactionExists = abiCall<typeof AkitaSocial.prototype.getReactionExists>({
      sender,
      appId: social,
      args: [refBytes, NFT]
    }).returnValue

    const { reactions, reactionlist, posts } = this.mbr(op.bzero(0), '', Bytes(''))

    let mbrAmount: uint64 = reactionExists
      ? reactionlist
      : reactions + reactionlist

    // a target that isn't a post gets an empty posts box on its first reaction; the creator tip
    // carries the sender's referral MBR
    const { postExists, creator, creatorWallet } = this.getCreatorDetails(type, sender, refBytes)
    if (!postExists) {
      mbrAmount += posts
    }
    mbrAmount += this.tipReferralQuote(wallet, creator)

    mbrAmount += this.tipRoute(this.akitaDAO.value, creator, Application(creatorWallet)).arc58

    const mbrPayment = itxn.payment({
      sender,
      receiver: Application(social).address,
      amount: mbrAmount
    })

    const akta = Asset(getAkitaAssets(this.akitaDAO.value).akta)
    const { reactFee } = getSocialFees(this.akitaDAO.value)
    const tip = itxn.assetTransfer({
      sender,
      assetReceiver: Application(social).address,
      xferAsset: akta,
      assetAmount: reactFee
    })

    abiCall<typeof AkitaSocial.prototype.react>({
      sender,
      appId: social,
      args: [
        mbrPayment,
        tip,
        ref,
        type,
        NFT,
        windowHint(wallet)
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  deleteReaction(
    wallet: Application,
    rekeyBack: boolean,
    ref: bytes<32>,
    NFT: uint64
  ): void {
    const sender = getControlledSpendingAccount(wallet)

    const { social } = getAkitaSocialAppList(this.akitaDAO.value)

    abiCall<typeof AkitaSocial.prototype.deleteReaction>({
      sender,
      appId: social,
      args: [ref, NFT],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  gatedFollow(
    wallet: Application,
    rekeyBack: boolean,
    address: Account,
    args: GateArgs
  ): void {
    const sender = getControlledSpendingAccount(wallet)

    const { social, graph } = getAkitaSocialAppList(this.akitaDAO.value)

    const { followGateID } = abiCall<typeof AkitaSocial.prototype.getMeta>({
      sender,
      appId: social,
      args: [address]
    }).returnValue

    const mbrPayment = itxn.payment({
      sender,
      receiver: Application(graph).address,
      amount: this.mbr(op.bzero(0), '', Bytes('')).follows
    })

    // inner transactions cannot cross a subroutine boundary, so the gate txn is built inline
    const gateTxn = itxn.applicationCall({
      sender,
      appId: getAkitaAppList(this.akitaDAO.value).gate,
      appArgs: [
        methodSelector(GateMustCheckForAbiMethod),
        this.gateCtxArg(wallet),
        followGateID,
        encodeArc4(args)
      ]
    })

    abiCall<typeof AkitaSocialGraph.prototype.gatedFollow>({
      sender,
      appId: graph,
      args: [
        mbrPayment,
        gateTxn,
        address,
        windowHint(wallet)
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  follow(
    wallet: Application,
    rekeyBack: boolean,
    address: Account
  ): void {
    const sender = getControlledSpendingAccount(wallet)

    const { graph } = getAkitaSocialAppList(this.akitaDAO.value)

    const mbrPayment = itxn.payment({
      sender,
      receiver: Application(graph).address,
      amount: this.mbr(op.bzero(0), '', Bytes('')).follows
    })

    abiCall<typeof AkitaSocialGraph.prototype.follow>({
      sender,
      appId: graph,
      args: [
        mbrPayment,
        address
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  unfollow(
    wallet: Application,
    rekeyBack: boolean,
    address: Account
  ): void {
    const sender = getControlledSpendingAccount(wallet)

    const { graph } = getAkitaSocialAppList(this.akitaDAO.value)

    abiCall<typeof AkitaSocialGraph.prototype.unfollow>({
      sender,
      appId: graph,
      args: [address],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  // we dont remove followers because that requires us to know the index
  // instead, blocking supersedes following
  block(
    wallet: Application,
    rekeyBack: boolean,
    address: Account
  ): void {
    const sender = getControlledSpendingAccount(wallet)

    const { graph } = getAkitaSocialAppList(this.akitaDAO.value)

    const mbrPayment = itxn.payment({
      sender,
      receiver: Application(graph).address,
      amount: this.mbr(op.bzero(0), '', Bytes('')).blocks
    })

    abiCall<typeof AkitaSocialGraph.prototype.block>({
      sender,
      appId: graph,
      args: [mbrPayment, address],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  unblock(
    wallet: Application,
    rekeyBack: boolean,
    address: Account
  ): void {
    const sender = getControlledSpendingAccount(wallet)

    const { graph } = getAkitaSocialAppList(this.akitaDAO.value)

    abiCall<typeof AkitaSocialGraph.prototype.unblock>({
      sender,
      appId: graph,
      args: [address],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  addModerator(
    wallet: Application,
    rekeyBack: boolean,
    address: Account
  ): void {
    const sender = getControlledSpendingAccount(wallet)

    const { moderation } = getAkitaSocialAppList(this.akitaDAO.value)

    abiCall<typeof AkitaSocialModeration.prototype.addModerator>({
      sender,
      appId: moderation,
      args: [address],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })

  }

  removeModerator(
    wallet: Application,
    rekeyBack: boolean,
    address: Account
  ): void {
    const sender = getControlledSpendingAccount(wallet)

    const { moderation } = getAkitaSocialAppList(this.akitaDAO.value)

    abiCall<typeof AkitaSocialModeration.prototype.removeModerator>({
      sender,
      appId: moderation,
      args: [address],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  ban(
    wallet: Application,
    rekeyBack: boolean,
    address: Account,
    expiration: uint64
  ): void {
    const sender = getControlledSpendingAccount(wallet)

    const { moderation } = getAkitaSocialAppList(this.akitaDAO.value)

    abiCall<typeof AkitaSocialModeration.prototype.ban>({
      sender,
      appId: moderation,
      args: [address, expiration],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  flagPost(
    wallet: Application,
    rekeyBack: boolean,
    ref: bytes<32>
  ): void {
    const sender = getControlledSpendingAccount(wallet)

    const { moderation } = getAkitaSocialAppList(this.akitaDAO.value)

    abiCall<typeof AkitaSocialModeration.prototype.flagPost>({
      sender,
      appId: moderation,
      args: [ref],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  unflagPost(
    wallet: Application,
    rekeyBack: boolean,
    ref: bytes<32>
  ): void {
    const sender = getControlledSpendingAccount(wallet)

    const { moderation } = getAkitaSocialAppList(this.akitaDAO.value)

    abiCall<typeof AkitaSocialModeration.prototype.unflagPost>({
      sender,
      appId: moderation,
      args: [ref],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  unban(
    wallet: Application,
    rekeyBack: boolean,
    address: Account
  ): void {
    const sender = getControlledSpendingAccount(wallet)

    const { moderation } = getAkitaSocialAppList(this.akitaDAO.value)

    abiCall<typeof AkitaSocialModeration.prototype.unban>({
      sender,
      appId: moderation,
      args: [address],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  addAction(
    wallet: Application,
    rekeyBack: boolean,
    actionAppID: uint64,
    content: CID
  ): void {
    const sender = getControlledSpendingAccount(wallet)

    const { moderation } = getAkitaSocialAppList(this.akitaDAO.value)

    abiCall<typeof AkitaSocialModeration.prototype.addAction>({
      sender,
      appId: moderation,
      args: [
        actionAppID,
        content
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  removeAction(
    wallet: Application,
    rekeyBack: boolean,
    actionAppID: uint64
  ): void {
    const sender = getControlledSpendingAccount(wallet)

    const { moderation } = getAkitaSocialAppList(this.akitaDAO.value)

    abiCall<typeof AkitaSocialModeration.prototype.removeAction>({
      sender,
      appId: moderation,
      args: [actionAppID],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  initMeta(
    wallet: Application,
    rekeyBack: boolean,
    user: Account,
    automated: boolean,
    subscriptionIndex: uint64,
    NFD: uint64,
    akitaNFT: uint64
  ): uint64 {
    const sender = getControlledSpendingAccount(wallet)

    const { social } = getAkitaSocialAppList(this.akitaDAO.value)

    const impact = abiCall<typeof AkitaSocial.prototype.initMeta>({
      sender,
      appId: social,
      args: [
        itxn.payment({
          sender,
          receiver: Application(social).address,
          amount: this.mbr(op.bzero(0), '', Bytes('')).meta + ImpactMetaMBR
        }),
        user,
        automated,
        subscriptionIndex,
        NFD,
        akitaNFT,
        windowHint(wallet)
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    }).returnValue

    return impact
  }

  /**
   * Rebind the window's social meta (`meta(spending account)`) to this wallet: AkitaSocial verifies
   * the hint (`windowHint(wallet)`) and stores it. Backfill for metas created with wallet 0 (e.g.
   * through the registry-based legacy `initMeta` by a wallet that never registered). Spec §6.2, §6.11.
   */
  setMetaWallet(
    wallet: Application,
    rekeyBack: boolean
  ): void {
    const sender = getControlledSpendingAccount(wallet)

    const { social } = getAkitaSocialAppList(this.akitaDAO.value)

    abiCall<typeof AkitaSocial.prototype.setMetaWallet>({
      sender,
      appId: social,
      args: [windowHint(wallet)],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  updateMeta(
    wallet: Application,
    rekeyBack: boolean,
    followGateID: uint64,
    addressGateID: uint64,
    subscriptionIndex: uint64,
    NFD: uint64,
    akitaNFT: uint64,
    defaultPayWallID: uint64
  ): void {

    const sender = getControlledSpendingAccount(wallet)

    const { social } = getAkitaSocialAppList(this.akitaDAO.value)

    // setting a wall gate creates the wall's posts box if it isn't there yet
    let wallMbr: uint64 = 0
    if (addressGateID !== 0) {
      const wallExists = abiCall<typeof AkitaSocial.prototype.getPostExists>({
        sender,
        appId: social,
        args: [sender.bytes]
      }).returnValue
      if (!wallExists) {
        wallMbr = this.mbr(op.bzero(0), '', Bytes('')).posts
      }
    }

    abiCall<typeof AkitaSocial.prototype.updateMeta>({
      sender,
      appId: social,
      args: [
        itxn.payment({
          sender,
          receiver: Application(social).address,
          amount: wallMbr
        }),
        followGateID,
        addressGateID,
        subscriptionIndex,
        NFD,
        akitaNFT,
        defaultPayWallID
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  updateSubscriptionStateModifier(
    wallet: Application,
    rekeyBack: boolean,
    subscriptionIndex: uint64,
    newModifier: uint64
  ): void {
    const sender = getControlledSpendingAccount(wallet)
    const { impact } = getAkitaSocialAppList(this.akitaDAO.value)

    abiCall<typeof AkitaSocialImpact.prototype.updateSubscriptionStateModifier>({
      sender,
      appId: impact,
      args: [
        itxn.payment({
          sender,
          receiver: Application(impact).address,
          amount: SubscriptionStateModifierMBR
        }),
        subscriptionIndex,
        newModifier
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  commitStakingImpact(
    wallet: Application,
    rekeyBack: boolean,
    amount: uint64,
    inheritRoot: boolean
  ): void {
    const sender = getControlledSpendingAccount(wallet)
    const { impact } = getAkitaSocialAppList(this.akitaDAO.value)
    const impactApp = Application(impact)

    const cost = abiCall<typeof AkitaSocialImpact.prototype.stakingImpactCost>({
      sender,
      appId: impactApp,
      args: [sender]
    }).returnValue

    abiCall<typeof AkitaSocialImpact.prototype.commitStakingImpact>({
      sender,
      appId: impactApp,
      args: [
        itxn.payment({
          sender,
          receiver: impactApp.address,
          amount: cost
        }),
        amount,
        inheritRoot
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  registerRefType(
    wallet: Application,
    rekeyBack: boolean,
    name: string,
    schema: bytes
  ): uint64 {
    const sender = getControlledSpendingAccount(wallet)
    const { social } = getAkitaSocialAppList(this.akitaDAO.value)

    return abiCall<typeof AkitaSocial.prototype.registerRefType>({
      sender,
      appId: social,
      args: [
        itxn.payment({
          sender,
          receiver: Application(social).address,
          amount: this.mbr(Bytes(''), name, schema).refTypes
        }),
        name,
        schema
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    }).returnValue
  }
}

import {
  Account, Application, Asset, BoxMap, Bytes, bytes, clone, Contract, emit, ensureBudget, Global, GlobalState,
  gtxn, itxn, loggedAssert, match, OnCompleteAction, op, OpUpFeeSource, Txn, uint64,
} from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod, decodeArc4, methodSelector } from '@algorandfoundation/algorand-typescript/arc4'
import { btoi, itob } from '@algorandfoundation/algorand-typescript/op'
import { isAkitaWallet } from '../../utils/functions'
import { AbstractAccountGlobalStateKeysControlledAddress } from '../account/constants'
import type { AbstractedAccount } from '../account/contract.algo'
import type { PayPlugin } from '../plugins/pay/contract.algo'
import { PayParams } from '../plugins/pay/types'
import type { WelcomePlugin } from '../plugins/welcome/contract.algo'
import {
  SOCIAL_CLAIM_ATTESTATION_DOMAIN, SOCIAL_CLAIM_GIFT_MBR, SOCIAL_CLAIM_MAX_TTL, SOCIAL_CLAIM_MIN_TTL,
  SOCIAL_CLAIM_SUBJECT_MBR, SOCIAL_CLAIM_VERIFY_BUDGET,
} from './constants'
import {
  Gift, GiftKey, SocialClaimBound, SocialClaimClaimed, SocialClaimContributed, SocialClaimDropped,
  SocialClaimRefunded,
} from './types'

/**
 * Holds admin of "send to anyone" wallets until a platform identity claims them.
 *
 * A subject (hashed platform identity) has at most one gift wallet. Its state is the boxes:
 * NONE (no box), PENDING (`pending[subject]` = wallet id), CLAIMED (`directory[subject]` = wallet id).
 * The first gift creates the wallet through WelcomePlugin.sendToAnyone with this app as admin and
 * `bind` moves the subject to PENDING. Later gifts pay the pending wallet through PayPlugin.pay and
 * `contribute` records them. Each (subject, senderWallet, asset) has one gift box that sums the
 * sender's top-ups, so one sender can only ever hold one box per asset.
 *
 * The sender wallet of every gift must be an ARC-58 wallet created by the factory WelcomePlugin uses,
 * so its controlled address is a funded account that a refund can reach.
 *
 * `claim` hands admin to the recipient on an attestor signature and moves the subject to CLAIMED.
 * `refund` returns one expired gift to its sender's wallet; the gift wallet stays PENDING forever.
 * When the refund cannot be delivered (the sender wallet was deleted, or its controlled address
 * left the ASA), `refund` drops the gift box instead and the funds stay for the recipient.
 * `prune` frees a gift box once the subject is CLAIMED. Akita never holds funds; the attestor key
 * is the only trust point and the manager can rotate it.
 *
 * Whoever sends a gift pays for its storage: `bind` and `contribute` take a payment to this app for
 * the boxes they create (18,900 for the subject entry, 28,500 per gift box), so this app needs no
 * balance beyond its own minimum and nobody can use up storage someone else paid for. The subject
 * entry is permanent. A gift box's deposit goes back to its sender's wallet when the box is deleted
 * (refund or prune); when that wallet cannot take it, it goes to the gift wallet.
 *
 * Immutable: no update or delete routes.
 */
export class SocialClaim extends Contract {
  welcome = GlobalState<Application>({ key: 'welcome' })
  pay = GlobalState<Application>({ key: 'pay' })
  attestor = GlobalState<bytes<32>>({ key: 'attestor' })
  manager = GlobalState<Account>({ key: 'manager' })

  /** subject -> gift wallet, while unclaimed */
  pending = BoxMap<bytes<32>, uint64>({ keyPrefix: 'p' })
  /** subject -> gift wallet, once claimed */
  directory = BoxMap<bytes<32>, uint64>({ keyPrefix: 'd' })
  gifts = BoxMap<GiftKey, Gift>({ keyPrefix: 'g' })

  @abimethod({ onCreate: 'require' })
  create(welcome: Application, pay: Application, attestor: bytes<32>, manager: Account): void {
    loggedAssert(welcome.id !== 0, 'socialClaimInvalidWelcome')
    loggedAssert(pay.id !== 0, 'socialClaimInvalidPay')
    loggedAssert(manager !== Global.zeroAddress, 'socialClaimInvalidManager')
    this.welcome.value = welcome
    this.pay.value = pay
    this.attestor.value = attestor
    this.manager.value = manager
  }

  setAttestor(attestor: bytes<32>): void {
    this.requireManager()
    this.attestor.value = attestor
  }

  setManager(manager: Account): void {
    this.requireManager()
    loggedAssert(manager !== Global.zeroAddress, 'socialClaimInvalidManager')
    this.manager.value = manager
  }

  /**
   * First gift: record the wallet WelcomePlugin.sendToAnyone just created for `subject`.
   * The welcome call must sit at `welcomeCallIndex` = this index - 3, so this call and its storage
   * payment close the sponsor's usePlugin group [rekeyToPlugin, sendToAnyone, verifyAuthAddress] and
   * no other call can consume the same sendToAnyone. Returns the new wallet id read from that call's
   * ABI return.
   *
   * `mbrPayment` pays this app for the subject entry and the gift box.
   */
  bind(mbrPayment: gtxn.PaymentTxn, welcomeCallIndex: uint64, subject: bytes<32>, ttl: uint64): uint64 {
    this.requirePosition(welcomeCallIndex)
    this.requireStorage(mbrPayment, SOCIAL_CLAIM_SUBJECT_MBR + SOCIAL_CLAIM_GIFT_MBR)
    const welcomeCall = gtxn.ApplicationCallTxn(welcomeCallIndex)
    loggedAssert(welcomeCall.appId === this.welcome.value, 'socialClaimNotWelcome')
    loggedAssert(welcomeCall.onCompletion === OnCompleteAction.NoOp, 'socialClaimNotNoOp')
    loggedAssert(
      welcomeCall.appArgs(0) === methodSelector<typeof WelcomePlugin.prototype.sendToAnyone>(),
      'socialClaimNotSendToAnyone',
    )
    loggedAssert(welcomeCall.appArgs(3) === Global.currentApplicationAddress.bytes, 'socialClaimAdminNotThisApp')
    loggedAssert(!this.pending(subject).exists, 'socialClaimAlreadyPending')
    loggedAssert(!this.directory(subject).exists, 'socialClaimAlreadyClaimed')
    this.requireTtl(ttl)

    const wallet = decodeArc4<uint64>(welcomeCall.lastLog, 'log')
    const key: GiftKey = { subject, senderWallet: btoi(welcomeCall.appArgs(1)), asset: btoi(welcomeCall.appArgs(7)) }
    this.requireAkitaWallet(key.senderWallet)
    const gift: Gift = { amount: btoi(welcomeCall.appArgs(8)), expiry: Global.latestTimestamp + ttl }
    this.pending(subject).value = wallet
    this.gifts(key).value = clone(gift)
    emit<SocialClaimBound>({
      subject, wallet, senderWallet: key.senderWallet, asset: key.asset, amount: gift.amount, expiry: gift.expiry,
    })
    return wallet
  }

  /**
   * Top-up: record a PayPlugin.pay call that paid the pending wallet of `subject`. Same position
   * rule as `bind`. The pay call must carry exactly one payment, to the pending wallet's address.
   * The sender's gift box for that asset sums the amount and keeps the later expiry.
   *
   * `mbrPayment` pays this app for a new gift box, and is a zero payment when the sender already has
   * one for this subject and asset.
   */
  contribute(mbrPayment: gtxn.PaymentTxn, payCallIndex: uint64, subject: bytes<32>, ttl: uint64): void {
    this.requirePosition(payCallIndex)
    const payCall = gtxn.ApplicationCallTxn(payCallIndex)
    loggedAssert(payCall.appId === this.pay.value, 'socialClaimNotPay')
    loggedAssert(payCall.onCompletion === OnCompleteAction.NoOp, 'socialClaimNotNoOp')
    loggedAssert(payCall.appArgs(0) === methodSelector<typeof PayPlugin.prototype.pay>(), 'socialClaimNotPay')
    loggedAssert(this.pending(subject).exists, 'socialClaimNotPending')
    this.requireTtl(ttl)

    const payments = decodeArc4<PayParams[]>(payCall.appArgs(3))
    loggedAssert(payments.length === 1, 'socialClaimNotOnePayment')
    const payment = clone(payments[0])
    const wallet = this.pending(subject).value
    loggedAssert(payment.receiver === Application(wallet).address, 'socialClaimWrongReceiver')
    loggedAssert(payment.amount > 0, 'socialClaimEmptyGift')

    const key: GiftKey = { subject, senderWallet: btoi(payCall.appArgs(1)), asset: payment.asset }
    // PayPlugin trusts the wallet app's own spending_address, so any app can pose as a wallet there.
    // Only a factory wallet has a controlled address a refund can always reach.
    this.requireAkitaWallet(key.senderWallet)
    let gift: Gift = { amount: 0, expiry: 0 }
    if (this.gifts(key).exists) {
      gift = clone(this.gifts(key).value)
      this.requireStorage(mbrPayment, 0)
    } else {
      this.requireStorage(mbrPayment, SOCIAL_CLAIM_GIFT_MBR)
    }
    gift.amount += payment.amount
    const expiry: uint64 = Global.latestTimestamp + ttl
    if (expiry > gift.expiry) gift.expiry = expiry
    this.gifts(key).value = clone(gift)
    emit<SocialClaimContributed>({
      subject, wallet, senderWallet: key.senderWallet, asset: key.asset, amount: gift.amount, expiry: gift.expiry,
    })
  }

  /**
   * Hand the pending wallet to `newAdmin` on an attestor signature over
   * concat('akita/social-claim/v1', itob(thisAppId), subject, newAdmin, itob(expires)).
   * Anyone may relay it. Gift boxes stay until pruned.
   */
  claim(subject: bytes<32>, newAdmin: Account, expires: uint64, signature: bytes<64>): void {
    loggedAssert(this.pending(subject).exists, 'socialClaimNotPending')
    loggedAssert(Global.latestTimestamp <= expires, 'socialClaimAttestationExpired')
    loggedAssert(newAdmin !== Global.zeroAddress, 'socialClaimInvalidNewAdmin')
    loggedAssert(newAdmin !== Global.currentApplicationAddress, 'socialClaimInvalidNewAdmin')
    const wallet = this.pending(subject).value

    const message = Bytes(SOCIAL_CLAIM_ATTESTATION_DOMAIN)
      .concat(itob(Global.currentApplicationId.id))
      .concat(subject)
      .concat(newAdmin.bytes)
      .concat(itob(expires))
    ensureBudget(SOCIAL_CLAIM_VERIFY_BUDGET, OpUpFeeSource.GroupCredit)
    loggedAssert(op.ed25519verifyBare(message, signature, this.attestor.value), 'socialClaimBadAttestation')

    abiCall<typeof AbstractedAccount.prototype.arc58_changeAdmin>({
      appId: Application(wallet),
      args: [newAdmin],
      fee: 0,
    })
    this.pending(subject).delete()
    this.directory(subject).value = wallet
    emit<SocialClaimClaimed>({ subject, wallet, newAdmin })
  }

  /**
   * After expiry, move one sender's gift from the pending wallet back to that sender's wallet
   * (its controlled address). Anyone may call. The wallet stays PENDING for its subject.
   *
   * When the refund cannot be delivered, the gift box is dropped instead: the funds stay in the
   * gift wallet for its recipient. That is the case when the sender wallet no longer exists, its
   * controlled address is not opted into the ASA, or an ALGO refund would leave an empty controlled
   * address below the minimum balance.
   *
   * Either way the gift box's storage deposit is returned (see `returnGiftStorage`).
   *
   * This app is the gift wallet's admin, so arc58_rekeyTo lends it the wallet account for this
   * group. The transfer itself rekeys the account back to its own address, which clears auth-addr.
   */
  refund(subject: bytes<32>, senderWallet: uint64, asset: uint64): void {
    loggedAssert(this.pending(subject).exists, 'socialClaimNotPending')
    const key: GiftKey = { subject, senderWallet, asset }
    loggedAssert(this.gifts(key).exists, 'socialClaimNoGift')
    const { amount, expiry } = this.gifts(key).value
    loggedAssert(Global.latestTimestamp > expiry, 'socialClaimNotExpired')

    const wallet = Application(this.pending(subject).value)
    const [controlledBytes, exists] = op.AppGlobal.getExBytes(
      Application(senderWallet), Bytes(AbstractAccountGlobalStateKeysControlledAddress),
    )
    const refundedTo = Account(controlledBytes)
    if (!exists || !this.canReceive(refundedTo, asset, amount)) {
      this.gifts(key).delete()
      this.returnGiftStorage(senderWallet, wallet)
      emit<SocialClaimDropped>({ subject, wallet: wallet.id, senderWallet, asset, amount })
      return
    }

    abiCall<typeof AbstractedAccount.prototype.arc58_rekeyTo>({
      appId: wallet,
      args: [Global.currentApplicationAddress, false],
      fee: 0,
    })
    if (asset === 0) {
      itxn.payment({
        sender: wallet.address, receiver: refundedTo, amount, rekeyTo: wallet.address, fee: 0,
      }).submit()
    } else {
      itxn.assetTransfer({
        sender: wallet.address, assetReceiver: refundedTo, xferAsset: Asset(asset), assetAmount: amount,
        rekeyTo: wallet.address, fee: 0,
      }).submit()
    }

    this.gifts(key).delete()
    this.returnGiftStorage(senderWallet, wallet)
    emit<SocialClaimRefunded>({ subject, wallet: wallet.id, senderWallet, asset, amount, refundedTo })
  }

  /**
   * Free an absorbed gift box once its subject is no longer PENDING, returning its storage deposit.
   * Anyone may call. A missing box is not an error: the portal appends prunes to the claim group,
   * and a refund that lands first must not fail the claim.
   */
  prune(subject: bytes<32>, senderWallet: uint64, asset: uint64): void {
    loggedAssert(!this.pending(subject).exists, 'socialClaimStillPending')
    const key: GiftKey = { subject, senderWallet, asset }
    if (this.gifts(key).exists) {
      this.gifts(key).delete()
      // a gift box only ever exists for a subject that was bound, so a subject that is not PENDING is CLAIMED
      this.returnGiftStorage(senderWallet, Application(this.directory(subject).value))
    }
  }

  @abimethod({ readonly: true })
  getPending(subject: bytes<32>): uint64 {
    loggedAssert(this.pending(subject).exists, 'socialClaimNotPending')
    return this.pending(subject).value
  }

  @abimethod({ readonly: true })
  getGift(subject: bytes<32>, senderWallet: uint64, asset: uint64): Gift {
    const key: GiftKey = { subject, senderWallet, asset }
    loggedAssert(this.gifts(key).exists, 'socialClaimNoGift')
    return this.gifts(key).value
  }

  /** True when `receiver` can take `amount` of `asset` (0 = ALGO) without the transfer failing. */
  private canReceive(receiver: Account, asset: uint64, amount: uint64): boolean {
    if (asset === 0) {
      return receiver.balance > 0 || amount >= Global.minBalance
    }
    const [, optedIn] = op.AssetHolding.assetBalance(receiver, asset)
    return optedIn
  }

  /** The storage payment that sits right before a bind or contribute call. */
  private requireStorage(mbrPayment: gtxn.PaymentTxn, amount: uint64): void {
    loggedAssert(
      match(mbrPayment, { receiver: Global.currentApplicationAddress, amount }),
      'socialClaimInvalidStoragePayment',
    )
  }

  /**
   * Return a deleted gift box's storage deposit to the wallet that sent the gift (its controlled
   * address). When that wallet is gone or its account is empty the deposit goes to the gift wallet,
   * and when neither can take it, it stays here. A deposit can therefore never make a refund, a
   * drop or a prune fail.
   */
  private returnGiftStorage(senderWallet: uint64, giftWallet: Application): void {
    const [controlledBytes, exists] = op.AppGlobal.getExBytes(
      Application(senderWallet), Bytes(AbstractAccountGlobalStateKeysControlledAddress),
    )
    if (exists && this.canReceive(Account(controlledBytes), 0, SOCIAL_CLAIM_GIFT_MBR)) {
      itxn.payment({ receiver: Account(controlledBytes), amount: SOCIAL_CLAIM_GIFT_MBR, fee: 0 }).submit()
    } else if (this.canReceive(giftWallet.address, 0, SOCIAL_CLAIM_GIFT_MBR)) {
      itxn.payment({ receiver: giftWallet.address, amount: SOCIAL_CLAIM_GIFT_MBR, fee: 0 }).submit()
    }
  }

  /** `senderWallet` must be an ARC-58 wallet created by the factory WelcomePlugin uses. */
  private requireAkitaWallet(senderWallet: uint64): void {
    const [factory, exists] = op.AppGlobal.getExUint64(this.welcome.value, Bytes('factory'))
    loggedAssert(exists && isAkitaWallet(senderWallet, factory), 'socialClaimSenderNotWallet')
  }

  /**
   * The recorded plugin call sits three before this call:
   * [rekeyToPlugin, plugin call, verifyAuthAddress, storage payment, this].
   */
  private requirePosition(pluginCallIndex: uint64): void {
    loggedAssert(pluginCallIndex + 3 === Txn.groupIndex, 'socialClaimBadPosition')
  }

  private requireTtl(ttl: uint64): void {
    loggedAssert(ttl >= SOCIAL_CLAIM_MIN_TTL && ttl <= SOCIAL_CLAIM_MAX_TTL, 'socialClaimInvalidTtl')
  }

  private requireManager(): void {
    loggedAssert(Txn.sender === this.manager.value, 'socialClaimManagerOnly')
  }
}

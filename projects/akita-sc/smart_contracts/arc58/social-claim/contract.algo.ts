import {
  Account, Application, Asset, BoxMap, Bytes, bytes, clone, Contract, emit, ensureBudget, Global, GlobalState,
  gtxn, itxn, loggedAssert, OnCompleteAction, op, OpUpFeeSource, Txn, uint64,
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
  SOCIAL_CLAIM_ATTESTATION_DOMAIN, SOCIAL_CLAIM_MAX_TTL, SOCIAL_CLAIM_MIN_TTL, SOCIAL_CLAIM_VERIFY_BUDGET,
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
 * Box MBR comes from this app's own balance (18,900 per pending or directory entry, 28,500 per gift).
 * Akita prefunds it; a bind or contribute fails when the balance runs out. Every gift box can be
 * freed once its gift expires, by refund or drop, or once the subject is CLAIMED, by prune.
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
   * The welcome call must sit at `welcomeCallIndex` = this index - 2, so this call closes the
   * sponsor's usePlugin group [rekeyToPlugin, sendToAnyone, verifyAuthAddress] and no other call
   * can consume the same sendToAnyone. Returns the new wallet id read from that call's ABI return.
   */
  bind(welcomeCallIndex: uint64, subject: bytes<32>, ttl: uint64): uint64 {
    this.requirePosition(welcomeCallIndex)
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
   */
  contribute(payCallIndex: uint64, subject: bytes<32>, ttl: uint64): void {
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
    if (this.gifts(key).exists) gift = clone(this.gifts(key).value)
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
   * gift wallet for its recipient and the box MBR is freed. That is the case when the sender wallet
   * no longer exists, its controlled address is not opted into the ASA, or an ALGO refund would
   * leave an empty controlled address below the minimum balance.
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
    emit<SocialClaimRefunded>({ subject, wallet: wallet.id, senderWallet, asset, amount, refundedTo })
  }

  /**
   * Free an absorbed gift box once its subject is no longer PENDING. Anyone may call. A missing
   * box is not an error: the portal appends prunes to the claim group, and a refund that lands
   * first must not fail the claim.
   */
  prune(subject: bytes<32>, senderWallet: uint64, asset: uint64): void {
    loggedAssert(!this.pending(subject).exists, 'socialClaimStillPending')
    const key: GiftKey = { subject, senderWallet, asset }
    if (this.gifts(key).exists) this.gifts(key).delete()
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

  /** `senderWallet` must be an ARC-58 wallet created by the factory WelcomePlugin uses. */
  private requireAkitaWallet(senderWallet: uint64): void {
    const [factory, exists] = op.AppGlobal.getExUint64(this.welcome.value, Bytes('factory'))
    loggedAssert(exists && isAkitaWallet(senderWallet, factory), 'socialClaimSenderNotWallet')
  }

  /** The recorded plugin call sits two before this call: [rekeyToPlugin, plugin call, verifyAuthAddress, this]. */
  private requirePosition(pluginCallIndex: uint64): void {
    loggedAssert(pluginCallIndex + 2 === Txn.groupIndex, 'socialClaimBadPosition')
  }

  private requireTtl(ttl: uint64): void {
    loggedAssert(ttl >= SOCIAL_CLAIM_MIN_TTL && ttl <= SOCIAL_CLAIM_MAX_TTL, 'socialClaimInvalidTtl')
  }

  private requireManager(): void {
    loggedAssert(Txn.sender === this.manager.value, 'socialClaimManagerOnly')
  }
}

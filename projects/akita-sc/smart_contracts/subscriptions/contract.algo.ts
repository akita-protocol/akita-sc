import {
  abimethod,
  Account,
  Application,
  Asset,
  BoxMap,
  Bytes,
  bytes,
  clone,
  contract,
  Global,
  GlobalState,
  gtxn,
  itxn,
  loggedAssert,
  OnCompleteAction,
  op,
  TransactionType,
  uint64,
} from '@algorandfoundation/algorand-typescript'
import { methodSelector, Uint8 } from '@algorandfoundation/algorand-typescript/arc4'
import { Txn } from '@algorandfoundation/algorand-typescript/op'
import { classes } from 'polytype'
import { errHasGate } from '../social/errors'
import { FactoryGlobalStateMaxBytes, FactoryGlobalStateMaxUints } from '../utils/constants'
import {
  assertBoundPayment,
  assertSafeAssetTransfer,
  assertSafePayment,
  atRestPrincipalOf,
  calcPercent,
  gateCheck,
  gateCheckCtx,
  getSubscriptionFees,
  legacyOriginOr,
  legacyOriginOrTxnSender,
  legacyWalletOf,
  ownsAtRestOf,
  principalOf,
  quoteReferrerOf,
  referralFeeTo,
  referrerOrZeroAddress,
  sendReferralPaymentTo,
} from '../utils/functions'
import { GateCtx, gateCtx, Principal } from '../utils/principal'
import { CID } from '../utils/types/base'
import {
  HighlightMessageNone,
  LegacyPassesMBR,
  MAX_DESCRIPTION_LENGTH,
  MAX_PASSES,
  MAX_TITLE_LENGTH,
  MIN_AMOUNT,
  MIN_INTERVAL,
  SubscriptionsBoxPrefixBlocks,
  SubscriptionsBoxPrefixPasses,
  SubscriptionsBoxPrefixPrincipals,
  SubscriptionsBoxPrefixServices,
  SubscriptionsBoxPrefixServicesList,
  SubscriptionsBoxPrefixSubscriptions,
  SubscriptionsBoxPrefixSubscriptionsList,
  SubscriptionsGlobalStateKeyPassesRepricedAt,
  SubscriptionPrincipalMBR,
} from './constants'
import {
  errAsaMismatch,
  errBadDescriptionLength,
  errBadOffset,
  errBlocked,
  errCannotTrigger,
  errFailedGate,
  errInvalidAssetReceiver,
  errInvalidPayment,
  errInvalidSequence,
  errInvalidTransfer,
  errMaxPassesIsFive,
  errMinAmountIsThree,
  errMinIntervalIsSixty,
  errNoDonations,
  errNoLegacyWallet,
  errNotAService,
  errNotGated,
  errNotEnoughFunds,
  errNotOptedIn,
  errPassCountOverflow,
  errPrincipalExists,
  errServiceDoesNotExist,
  errServiceIsNotActive,
  errServiceIsNotDraft,
  errServiceIsNotPaused,
  errServiceIsShutdown,
  errServiceNotActivated,
  errSubscriptionDoesNotExist,
  errTitleTooLong,
  errUserAlreadyBlocked,
  errUserNotBlocked,
} from './errors'
import {
  Amounts,
  BlockListKey,
  Service,
  ServiceID,
  ServicesKey,
  ServiceStatus,
  ServiceStatusActive,
  ServiceStatusDraft,
  ServiceStatusNone,
  ServiceStatusPaused,
  ServiceStatusShutdown,
  SubscriptionID,
  SubscriptionInfo,
  SubscriptionInfoWithDetails,
  SubscriptionInfoWithExistence,
  SubscriptionKey,
  SubscriptionPrincipal,
  TriggerListRequest
} from './types'

// CONTRACT IMPORTS
import { AkitaFeeGeneratorContractWithOptIn, EscrowConfig } from '../utils/base-contracts/base'
import { BaseSubscriptions } from './base'

@contract({
  stateTotals: {
    globalBytes: FactoryGlobalStateMaxBytes,
    globalUints: FactoryGlobalStateMaxUints
  }
})
export class Subscriptions extends classes(BaseSubscriptions, AkitaFeeGeneratorContractWithOptIn) {

  // GLOBAL STATE ---------------------------------------------------------------------------------

  /**
   * Subscriptions that started before this timestamp paid the legacy pass MBR
   * (`LegacyPassesMBR`) and get it back on unsubscribe (audit SG-08 / decision SG-K).
   * Set once, lazily, by the first subscribe / unsubscribe after the upgrade.
   */
  passesRepricedAt = GlobalState<uint64>({ key: SubscriptionsGlobalStateKeyPassesRepricedAt })

  // BOXES ----------------------------------------------------------------------------------------

  subscriptions = BoxMap<SubscriptionKey, SubscriptionInfo>({
    keyPrefix: SubscriptionsBoxPrefixSubscriptions,
  })

  /** A counter for each addresses subscription id */
  subscriptionslist = BoxMap<Account, uint64>({ keyPrefix: SubscriptionsBoxPrefixSubscriptionsList })

  /**
   * services is a map of services a specific merchant has
   * denoted by the merchant address + index of the offer as a key
   * 32 + 8 = 40 bytes
   * 120 bytes total -> (2500 + (400 * 121)) = 0.050500
   */
  services = BoxMap<ServicesKey, Service>({ keyPrefix: SubscriptionsBoxPrefixServices })

  serviceslist = BoxMap<Account, uint64>({ keyPrefix: SubscriptionsBoxPrefixServicesList })

  /**
   * blocks allow merchants to specify which addresses cannot subscribe
   * key will be merchant address + blocked address
   * 32 + 32 = 64 bytes
   * 65 bytes total -> (2500 + (400 * 64)) = 0.028500
   */
  blocks = BoxMap<BlockListKey, bytes<0>>({ keyPrefix: SubscriptionsBoxPrefixBlocks })

  passes = BoxMap<SubscriptionKey, Account[]>({ keyPrefix: SubscriptionsBoxPrefixPasses })

  /**
   * Stored principal pair `(W, principal)` of a gated subscription made through a verified wallet
   * (principal resolution §6.4, Q11). Written by the hinted gated subscribe methods (or backfilled by
   * `adoptPrincipal`), re-checked at trigger time without reading any wallet global, deleted and
   * refunded by `unsubscribe`. 'i' + 32 + 8 = 41 byte key, 40 byte value → `SubscriptionPrincipalMBR`.
   */
  principals = BoxMap<SubscriptionKey, SubscriptionPrincipal>({ keyPrefix: SubscriptionsBoxPrefixPrincipals })

  // PRIVATE METHODS ------------------------------------------------------------------------------

  private getLatestWindowStart(startDate: uint64, interval: uint64): uint64 {
    return Global.latestTimestamp - ((Global.latestTimestamp - startDate) % interval)
  }

  private getBlockKey(address: Account, blocked: Account): BlockListKey {
    return {
      address: address.bytes.slice(0, 16).toFixed({ length: 16 }),
      blocked: blocked.bytes.slice(0, 16).toFixed({ length: 16 }),
    }
  }

  /** start of the previous payment window (0 if the subscription is still in its first one) */
  private getPreviousWindowStart(currentWindowStart: uint64, interval: uint64): uint64 {
    return currentWindowStart >= interval ? currentWindowStart - interval : 0
  }

  /**
   * Streak bookkeeping for a payment. Only called from `triggerPayment`, which `canTrigger`
   * limits to once per window, so the streak can grow by at most one per window.
   */
  private incrementStreakOnPayment(key: SubscriptionKey): void {
    const sub = clone(this.subscriptions(key).value)

    const currentWindowStart: uint64 = this.getLatestWindowStart(sub.startDate, sub.interval)
    const lastWindowStart: uint64 = this.getPreviousWindowStart(currentWindowStart, sub.interval)

    if (sub.lastPayment < lastWindowStart) {
      // a window was missed: restart the streak with this payment
      this.subscriptions(key).value.streak = 1
      return
    }

    // paid in the previous window but not yet in this one
    if (sub.lastPayment < currentWindowStart) {
      this.subscriptions(key).value.streak += 1
    }
  }

  /** pass MBR that was charged for a subscription that started at `startDate` */
  private passesCharged(startDate: uint64): uint64 {
    if (this.passesRepricedAt.hasValue && startDate < this.passesRepricedAt.value) {
      return LegacyPassesMBR
    }
    return this.mbr().passes
  }

  /** sets the pass repricing cut-over on the first subscribe / unsubscribe after deployment */
  private ensurePassesRepriced(): void {
    // the key is absent on apps created before this version (state added by an upgrade)
    if (!this.passesRepricedAt.hasValue) {
      this.passesRepricedAt.value = Global.latestTimestamp
    }
  }

  private getAmounts(amount: uint64): Amounts {
    const fees = getSubscriptionFees(this.akitaDAO.value)

    let akitaFee: uint64 = 0
    if (fees.paymentPercentage > 0) {
      akitaFee = calcPercent(amount, fees.paymentPercentage)
      if (akitaFee === 0 && amount > 0) {
        akitaFee = 2
      }
    }

    let triggerFee: uint64 = 0
    if (fees.triggerPercentage > 0) {
      triggerFee = calcPercent(amount, fees.triggerPercentage)
      if (triggerFee === 0 && amount > 0) {
        triggerFee = 1
      }
    }

    const leftOver: uint64 = amount - (akitaFee + triggerFee)

    return {
      akitaFee: akitaFee,
      triggerFee: triggerFee,
      leftOver: leftOver,
    }
  }

  private newServiceID(address: Account): ServiceID {
    const id: uint64 = this.serviceslist(address).exists
      ? this.serviceslist(address).value
      : 1
    this.serviceslist(address).value = id + 1
    return id
  }

  private newSubscriptionID(address: Account): SubscriptionID {
    const id: uint64 = this.subscriptionslist(address).exists
      ? this.subscriptionslist(address).value
      : 1
    this.subscriptionslist(address).value = id + 1
    return id
  }

  /**
   * Shared body of every subscribe entry point (ALGO and ASA, hinted and legacy shims). Same checks,
   * transfers and state as the deployed `createSubscription` / `createAsaSubscription` pair.
   * @param payment ALGO: the subscription payment (amount + MBR + referral MBR, any surplus is escrowed);
   *   ASA: the exact MBR + referral MBR payment
   * @param asa true for an ASA subscription, whose asset transfer is the group txn at `xfer`
   * @param referrer who receives the referral cut: the verified principal's referrer (hinted methods) or
   *   the registry referrer of `Txn.sender` (legacy shims)
   * @param wallet the verified wallet (0 for legacy shims or plain callers); with a gated service, the pair
   *   `(wallet, principal)` is stored in `principals` and its MBR is charged
   */
  private createSubscription(
    payment: gtxn.PaymentTxn,
    asa: boolean,
    xfer: uint64,
    recipient: Account,
    amount: uint64,
    interval: uint64,
    serviceID: ServiceID,
    referrer: Account,
    wallet: uint64,
    principal: Account
  ): uint64 {
    this.ensurePassesRepriced()
    const blocksKey = this.getBlockKey(recipient, Txn.sender)
    // ensure they aren't blocked
    loggedAssert(!this.blocks(blocksKey).exists, errBlocked)
    // gate is zero unless the service has a gate
    let gateID: uint64 = 0
    const asset: uint64 = asa ? gtxn.AssetTransferTxn(xfer).xferAsset.id : 0

    const costs = this.mbr()
    let mbrAmount = costs.subscriptions
    // index zero is always reserved for donations
    let payoutTarget = recipient
    if (serviceID !== 0) {
      const boxKey: ServicesKey = { address: recipient, id: serviceID }
      // ensure the service exists
      loggedAssert(this.services(boxKey).exists, errServiceDoesNotExist)
      // get the service details
      const service = clone(this.services(boxKey).value)
      // ensure the service is active
      loggedAssert(service.status === ServiceStatusActive, errServiceIsNotActive)
      // ensure the subscription pays in the service's asset (0 = ALGO)
      loggedAssert(service.asset === asset, errAsaMismatch)
      // overwrite the details for the subscription
      amount = service.amount
      interval = service.interval
      gateID = service.gateID

      if (service.payoutAddress !== Global.zeroAddress) {
        payoutTarget = service.payoutAddress
      }

      if (service.passes > 0) {
        mbrAmount += costs.passes
      }
    }

    const needsSubscriptionsListBoxMbr = !this.subscriptionslist(Txn.sender).exists
    const subscriptionID = this.newSubscriptionID(Txn.sender)
    const subscriptionKey: SubscriptionKey = { address: Txn.sender, id: subscriptionID }
    if (needsSubscriptionsListBoxMbr) {
      mbrAmount += costs.subscriptionslist
    }
    // principal resolution §6.4: a gated subscription by a verified wallet stores (W, principal)
    const storesPrincipal = wallet !== 0 && gateID !== 0
    if (storesPrincipal) {
      mbrAmount += SubscriptionPrincipalMBR
    }

    const amounts = this.getAmounts(amount)
    const akitaFees: uint64 = amounts.akitaFee + amounts.triggerFee
    const { leftover, referralMbr } = sendReferralPaymentTo(this.akitaDAO.value, referrer, asset, akitaFees, this.akitaDAOEscrow.value.app.address)
    const required: uint64 = mbrAmount + referralMbr

    // amounts.leftOver is the send amount after fees; any surplus (ALGO payment or asset transfer) is
    // escrowed for future payments
    let escrowed: uint64
    if (asa) {
      const assetXfer = gtxn.AssetTransferTxn(xfer)
      // The revenue escrow is opted in to this asset eagerly at `optIn`
      // time (see `AkitaFeeGeneratorContractWithOptIn.optIn`). The service's
      // `asset === assetXfer.xferAsset.id` check above already guarantees
      // subscribers use the same asset the service — and therefore the
      // escrow — were configured with, so this assert is defensive.
      loggedAssert(this.akitaDAOEscrow.value.app.address.isOptedIn(assetXfer.xferAsset), errNotOptedIn)
      itxn
        .assetTransfer({
          assetReceiver: this.akitaDAOEscrow.value.app.address,
          xferAsset: asset,
          assetAmount: leftover
        })
        .submit()

      // mbr payment checks
      assertBoundPayment(payment, Txn.sender, Global.currentApplicationAddress, required)

      // asset transfer checks (no clawback-sourced, close-out or rekeying transfers)
      assertSafeAssetTransfer(assetXfer, Txn.sender)
      loggedAssert(assetXfer.assetReceiver === Global.currentApplicationAddress, errInvalidTransfer)
      loggedAssert(assetXfer.assetAmount >= amount, errInvalidTransfer)

      itxn
        .assetTransfer({
          assetReceiver: payoutTarget,
          xferAsset: asset,
          assetAmount: amounts.leftOver
        })
        .submit()

      escrowed = assetXfer.assetAmount - amount
    } else {
      assertSafePayment(payment, Txn.sender)
      loggedAssert(payment.receiver === Global.currentApplicationAddress, errInvalidPayment)
      loggedAssert(payment.amount >= (amount + required), errInvalidPayment)

      itxn
        .payment({
          receiver: this.akitaDAOEscrow.value.app.address,
          amount: leftover,
        })
        .submit()

      itxn
        .payment({
          receiver: payoutTarget,
          amount: amounts.leftOver
        })
        .submit()

      escrowed = payment.amount - (amount + required)
    }

    this.subscriptions(subscriptionKey).value = {
      recipient: recipient,
      serviceID,
      startDate: Global.latestTimestamp,
      amount,
      interval,
      asset,
      gateID,
      lastPayment: Global.latestTimestamp,
      streak: 1,
      escrowed,
    }

    if (storesPrincipal) {
      this.principals(subscriptionKey).value = { wallet, principal }
    }

    return subscriptionID
  }

  private canTrigger(key: SubscriptionKey): boolean {
    if (!this.subscriptions(key).exists) {
      return false
    }

    const {
      recipient,
      serviceID,
      lastPayment,
      startDate,
      interval,
      escrowed,
      amount
    } = this.subscriptions(key).value

    const blocksKey = this.getBlockKey(recipient, key.address)

    // ensure they are not blocked
    if (this.blocks(blocksKey).exists) {
      return false
    }

    // ensure the service exists & isn't shutdown
    if (
      serviceID > 0 &&
      (
        !this.services({ address: recipient, id: serviceID }).exists ||
        this.services({ address: recipient, id: serviceID }).value.status === ServiceStatusShutdown
      )
    ) {
      return false
    }

    // ensure that the current window has not already had a payment
    if (lastPayment >= this.getLatestWindowStart(startDate, interval)) {
      return false
    }

    if (amount > escrowed) {
      return false
    }

    return true
  }

  private verifyServiceActivation(): void {
    let activated = false
    for (let i: uint64 = (Txn.groupIndex + 1); i < Global.groupSize; i += 1) {
      const txn = gtxn.Transaction(i)

      if (txn.type !== TransactionType.ApplicationCall) {
        continue
      }

      loggedAssert(txn.appId === Global.currentApplicationId, errInvalidSequence)
      loggedAssert(txn.onCompletion === OnCompleteAction.NoOp, errInvalidSequence)
      // audit SG-12: only the same merchant may activate the new service
      loggedAssert(txn.sender === Txn.sender, errInvalidSequence)

      if (txn.appArgs(0) === methodSelector(this.activateService)) {
        activated = true
        break
      }

    }

    loggedAssert(activated, errServiceNotActivated)
  }

  /**
   * LEGACY (registry semantics; legacy shims only, delete in Phase 4): the referrer the deployed
   * contract paid, i.e. the registry wallet of `Txn.sender`'s referrer. `sendReferralPaymentTo` /
   * `referralFeeTo` with this referrer are exactly `legacySendReferralPayment` / `legacyReferralFee`.
   */
  private legacyReferrer(): Account {
    return referrerOrZeroAddress(legacyWalletOf(this.akitaDAO.value, Txn.sender))
  }

  /**
   * Argument checks shared by every subscribe entry point. Returns the service's gate id: required
   * (any value) on the gated paths, asserted 0 on the ungated ones.
   */
  private checkSubscribe(recipient: Account, amount: uint64, interval: uint64, serviceID: ServiceID, gated: boolean): uint64 {
    // ensure the amount is enough to take fees on
    loggedAssert(amount >= MIN_AMOUNT, errMinAmountIsThree)
    // ensure payouts cant be too fast
    loggedAssert(interval >= MIN_INTERVAL, errMinIntervalIsSixty)

    if (gated) {
      loggedAssert(serviceID !== 0, errNotAService)
    }

    if (serviceID === 0) {
      return 0
    }

    loggedAssert(this.services({ address: recipient, id: serviceID }).exists, errServiceDoesNotExist)
    const gateID = this.services({ address: recipient, id: serviceID }).value.gateID
    if (!gated) {
      loggedAssert(gateID === 0, errHasGate)
    }
    return gateID
  }

  /**
   * Every subscribe entry point: argument checks, the caller's identity, the gate (gated paths) and
   * `createSubscription`.
   * - hinted (`legacy` false): `p = principalOf(dao, wallet)` (strict); the gate txn at group index `gate`
   *   must be `Gate.mustCheckFor(gateCtx(p), gateID, args)`; referral to `p.referrer`; the pair
   *   `(p.wallet, p.principal)` is stored for a gated service.
   * - legacy shims (`legacy` true, `wallet` ignored): registry wallet of `Txn.sender`; the gate txn must be
   *   `Gate.mustCheck(registry origin, gateID, args)`; registry referral; nothing stored.
   */
  private subscribeImpl(
    payment: gtxn.PaymentTxn,
    asa: boolean,
    xfer: uint64,
    gated: boolean,
    gate: uint64,
    recipient: Account,
    amount: uint64,
    interval: uint64,
    serviceID: ServiceID,
    wallet: uint64,
    legacy: boolean
  ): uint64 {
    const gateID = this.checkSubscribe(recipient, amount, interval, serviceID, gated)

    if (legacy) {
      const legacyWallet = legacyWalletOf(this.akitaDAO.value, Txn.sender)
      if (gated) {
        loggedAssert(gateCheck(gtxn.ApplicationCallTxn(gate), this.akitaDAO.value, legacyOriginOrTxnSender(legacyWallet), gateID), errFailedGate)
      }
      return this.createSubscription(payment, asa, xfer, recipient, amount, interval, serviceID, referrerOrZeroAddress(legacyWallet), 0, Global.zeroAddress)
    }

    const p = principalOf(this.akitaDAO.value, wallet)
    if (gated) {
      loggedAssert(gateCheckCtx(gtxn.ApplicationCallTxn(gate), this.akitaDAO.value, gateCtx(p), gateID), errFailedGate)
    }
    return this.createSubscription(payment, asa, xfer, recipient, amount, interval, serviceID, p.referrer, p.wallet, p.principal)
  }

  /** gate id a gated trigger of `key` must pass (the service's gate) */
  private triggerGateID(key: SubscriptionKey): uint64 {
    // ensure a subscription exists
    loggedAssert(this.subscriptions(key).exists, errSubscriptionDoesNotExist)

    const { serviceID, recipient } = this.subscriptions(key).value

    loggedAssert(serviceID !== 0, errNotAService)
    loggedAssert(this.services({ address: recipient, id: serviceID }).exists, errServiceDoesNotExist)
    return this.services({ address: recipient, id: serviceID }).value.gateID
  }

  /**
   * Gate subject of a hinted gated trigger (principal resolution §6.4). `p` is the CALLER's own verified
   * principal; it never names the subscriber.
   *  (1) a stored pair exists and the caller is the subscriber's own wallet → the caller's live context
   *      (avoids E23: inside its own window the subscriber is not owned at rest);
   *  (2) a stored pair exists, any other caller → the pair re-checked at rest (no wallet-global reads, so
   *      the subscriber cannot make keeper triggers panic);
   *  (3) no stored pair (legacy subscription) → the registry derivation the deployed contract used, with
   *      the wallet kept only if it owns the subscriber at rest.
   */
  private triggerCtx(key: SubscriptionKey, p: Principal): GateCtx {
    let wallet: uint64
    let principal: Account
    if (this.principals(key).exists) {
      const stored = clone(this.principals(key).value)
      if (p.wallet !== 0 && p.wallet === stored.wallet) {
        return gateCtx(p)
      }
      wallet = stored.wallet
      principal = atRestPrincipalOf(this.akitaDAO.value, key.address, stored.wallet, stored.principal)
    } else {
      // LEGACY (registry; Phase 4 replaces it with `key.address` after the adoptPrincipal backfill, Q13)
      const legacyWallet = legacyWalletOf(this.akitaDAO.value, key.address)
      wallet = legacyWallet.id
      principal = legacyOriginOr(legacyWallet, key.address)
    }

    return {
      principal,
      // the wallet only counts while it owns the subscriber at rest (no wallet-global reads)
      wallet: ownsAtRestOf(this.akitaDAO.value, wallet, key.address) ? wallet : 0,
      spender: key.address,
    }
  }

  /**
   * Shared body of `triggerPayment` and both `gatedTriggerPayment` selectors. Replaces the old
   * `Txn.applicationArgs(0) === methodSelector(this.gatedTriggerPayment)` check, which would reject the
   * legacy shim (spec §6 conventions): a gated subscription can only be paid through a gated entry point.
   */
  private triggerImpl(key: SubscriptionKey, gated: boolean): void {

    loggedAssert(this.canTrigger(key), errCannotTrigger)

    const {
      recipient,
      serviceID,
      amount,
      asset,
      gateID
    } = this.subscriptions(key).value

    if (gateID !== 0) {
      loggedAssert(gated, errInvalidSequence)
    }

    let payoutTarget = recipient
    if (serviceID !== 0) {
      const serviceKey: ServicesKey = { address: recipient, id: serviceID }
      if (this.services(serviceKey).exists) {
        const payoutAddress = this.services(serviceKey).value.payoutAddress
        if (payoutAddress !== Global.zeroAddress) {
          payoutTarget = payoutAddress
        }
      }
    }

    const isAsa = asset !== 0
    const amounts = this.getAmounts(amount)

    if (isAsa) {
      // we know the escrow will be opted in because it would be opted in
      // when the subscription was created
      itxn
        .assetTransfer({
          assetReceiver: this.akitaDAOEscrow.value.app.address,
          xferAsset: asset,
          assetAmount: amounts.akitaFee
        })
        .submit()

      itxn
        .assetTransfer({
          assetReceiver: Txn.sender,
          xferAsset: asset,
          assetAmount: amounts.triggerFee
        })
        .submit()

      itxn
        .assetTransfer({
          assetReceiver: payoutTarget,
          xferAsset: asset,
          assetAmount: amounts.leftOver
        })
        .submit()
    } else {
      // mbr payment for subscriptions & subscriptionslist boxes
      itxn
        .payment({
          receiver: this.akitaDAOEscrow.value.app.address,
          amount: amounts.akitaFee
        })
        .submit()

      itxn
        .payment({
          receiver: Txn.sender,
          amount: amounts.triggerFee
        })
        .submit()

      itxn
        .payment({
          receiver: payoutTarget,
          amount: amounts.leftOver
        })
        .submit()
    }

    this.incrementStreakOnPayment(key)

    this.subscriptions(key).value.escrowed -= amount
    this.subscriptions(key).value.lastPayment = Global.latestTimestamp
  }

  /** Shared body of both `newService` selectors; `referrer` as in `createSubscription`. */
  private newServiceImpl(
    payment: gtxn.PaymentTxn,
    interval: uint64,
    asset: uint64,
    amount: uint64,
    passes: uint64,
    gateID: uint64,
    payoutAddress: Account,
    title: string,
    bannerImage: CID,
    highlightMessage: Uint8,
    highlightColor: bytes<3>,
    referrer: Account
  ): uint64 {
    const needsServicesListBoxMbr = !this.serviceslist(Txn.sender).exists
    const id = this.newServiceID(Txn.sender)
    const boxKey: ServicesKey = { address: Txn.sender, id }

    // ensure the amount is enough to take fees on
    loggedAssert(amount >= MIN_AMOUNT, errMinAmountIsThree)
    // ensure payouts cant be too fast
    loggedAssert(interval >= MIN_INTERVAL, errMinIntervalIsSixty)
    // family passes have a max of 5
    loggedAssert(passes <= MAX_PASSES, errMaxPassesIsFive)
    loggedAssert(Bytes(title).length <= MAX_TITLE_LENGTH, errTitleTooLong)

    const serviceCreationFee = getSubscriptionFees(this.akitaDAO.value).serviceCreationFee
    const costs = this.mbr()

    let requiredAmount: uint64 = serviceCreationFee + costs.services
    if (needsServicesListBoxMbr) {
      requiredAmount += costs.serviceslist
    }
    if (asset !== 0) {
      // Both the contract and the dedicated revenue escrow are opted in
      // eagerly at `optIn` time. `newService` keeps a predictable MBR
      // profile by asserting that up-front rather than paying for a
      // revenue-manager opt-in flow on the first service created.
      loggedAssert(Global.currentApplicationAddress.isOptedIn(Asset(asset)), errNotOptedIn)
      loggedAssert(this.akitaDAOEscrow.value.app.address.isOptedIn(Asset(asset)), errNotOptedIn)
    }

    // audit SG-01: the creation fee is ALGO, so its referral cut is paid in ALGO too
    // (never out of the ASA balances escrowed for subscribers)
    const { leftover, referralMbr } = sendReferralPaymentTo(this.akitaDAO.value, referrer, 0, serviceCreationFee, this.akitaDAOEscrow.value.app.address)

    assertBoundPayment(payment, Txn.sender, Global.currentApplicationAddress, requiredAmount + referralMbr)

    itxn
      .payment({
        receiver: this.akitaDAOEscrow.value.app.address,
        amount: leftover
      })
      .submit()

    this.services(boxKey).value = {
      status: ServiceStatusDraft,
      interval,
      asset,
      amount,
      passes,
      gateID,
      payoutAddress,
      title,
      description: '',
      bannerImage,
      highlightMessage,
      highlightColor
    }

    this.verifyServiceActivation()

    return id
  }

  /** `newServiceCost` without the referral term (the caller of `Txn.sender` decides the referrer) */
  private serviceCost(referrer: Account): uint64 {
    const serviceCreationFee = getSubscriptionFees(this.akitaDAO.value).serviceCreationFee
    const costs = this.mbr()

    let requiredAmount: uint64 = serviceCreationFee + costs.services
    if (!this.serviceslist(Txn.sender).exists) {
      requiredAmount += costs.serviceslist
    }

    // audit SG-01: the creation fee (and so its referral) is always ALGO; `asset` is kept for ABI compatibility
    return requiredAmount + referralFeeTo(this.akitaDAO.value, referrer, 0)
  }

  /** box MBR of a new subscription by `Txn.sender` (without the stored pair and the referral term); returns the gate id too */
  private subscriptionMbr(recipient: Account, serviceID: ServiceID): [uint64, uint64] {
    const costs = this.mbr()
    let mbrAmount = costs.subscriptions
    let gateID: uint64 = 0
    // index zero is always reserved for donations
    if (serviceID !== 0) {
      const boxKey: ServicesKey = { address: recipient, id: serviceID }
      // ensure the service exists
      loggedAssert(this.services(boxKey).exists, errServiceDoesNotExist)
      // get the service details
      const service = clone(this.services(boxKey).value)
      gateID = service.gateID

      if (service.passes > 0) {
        mbrAmount += costs.passes
      }
    }

    if (!this.subscriptionslist(Txn.sender).exists) {
      mbrAmount += costs.subscriptionslist
    }

    // Note: Escrow opt-in costs are NOT included here because they are paid
    // via inner transactions from the contract's balance in createSubscription()
    return [mbrAmount, gateID]
  }

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  create(version: string, akitaDAO: Application, akitaDAOEscrow: EscrowConfig): void {
    this.version.value = version
    this.akitaDAO.value = akitaDAO
    this.akitaDAOEscrow.value = clone(akitaDAOEscrow)
  }

  // SUBSCRIPTION METHODS -------------------------------------------------------------------------

  /**
   * newService creates a new service for a merchant
   * @param payment The payment for the service creation
   * @param interval The interval in seconds
   * @param asset The asa to be used for the subscription
   * @param amount The amount of the asa to be used for the subscription
   * @param passes The number of accounts the subscription can be shared with
   * @param gateID The gate to be used for the subscription
   * @param wallet Principal-resolution hint (last arg): the caller's ARC-58 wallet, 0 for a plain account.
   * The referral cut goes to the verified wallet's referrer (no registry lookup).
   */
  newService(
    payment: gtxn.PaymentTxn,
    interval: uint64,
    asset: uint64,
    amount: uint64,
    passes: uint64,
    gateID: uint64,
    payoutAddress: Account,
    title: string,
    bannerImage: CID,
    highlightMessage: Uint8,
    highlightColor: bytes<3>,
    wallet: uint64
  ): uint64 {
    const p = principalOf(this.akitaDAO.value, wallet)
    return this.newServiceImpl(payment, interval, asset, amount, passes, gateID, payoutAddress, title, bannerImage, highlightMessage, highlightColor, p.referrer)
  }

  /** LEGACY shim (pre-hint selector, registry referral); delete in Phase 4. */
  @abimethod({ name: 'newService' })
  legacyNewService(
    payment: gtxn.PaymentTxn,
    interval: uint64,
    asset: uint64,
    amount: uint64,
    passes: uint64,
    gateID: uint64,
    payoutAddress: Account,
    title: string,
    bannerImage: CID,
    highlightMessage: Uint8,
    highlightColor: bytes<3>
  ): uint64 {
    return this.newServiceImpl(payment, interval, asset, amount, passes, gateID, payoutAddress, title, bannerImage, highlightMessage, highlightColor, this.legacyReferrer())
  }

  setServiceDescription(id: ServiceID, offset: uint64, data: bytes): void {
    const key: ServicesKey = { address: Txn.sender, id }

    loggedAssert(this.services(key).exists, errServiceDoesNotExist)
    loggedAssert(offset + data.length <= MAX_DESCRIPTION_LENGTH, errBadDescriptionLength)

    let descBytes = Bytes(this.services(key).value.description)

    loggedAssert(offset <= descBytes.length, errBadOffset)

    if (offset < descBytes.length) {
      descBytes = descBytes.slice(0, offset)
    }

    this.services(key).value.description = String(descBytes.concat(data))
  }

  updateServiceTitle(id: ServiceID, title: string): void {
    const key: ServicesKey = { address: Txn.sender, id }

    loggedAssert(this.services(key).exists, errServiceDoesNotExist)
    loggedAssert(Bytes(title).length <= MAX_TITLE_LENGTH, errTitleTooLong)

    this.services(key).value.title = title
  }

  /**
   * activateService activates an service for a merchant
   */
  activateService(): void {
    const id: uint64 = this.serviceslist(Txn.sender).value - 1

    const boxKey: ServicesKey = { address: Txn.sender, id }

    loggedAssert(this.services(boxKey).exists, errServiceDoesNotExist)
    loggedAssert(this.services(boxKey).value.status === ServiceStatusDraft, errServiceIsNotDraft)

    this.services(boxKey).value.status = ServiceStatusActive
  }

  /**
   * pauseService pauses a service for a merchant
   * it does not shutdown pre-existing subscriptions
   * it simply prevents new subscriptions from being created
   * for a specific service
   * @param index The index of the box to be used for the subscription
   */
  pauseService(id: ServiceID): void {
    const boxKey: ServicesKey = { address: Txn.sender, id }
    // ensure the box exists
    loggedAssert(this.services(boxKey).exists, errServiceDoesNotExist)
    // ensure the service is active
    loggedAssert(this.services(boxKey).value.status === ServiceStatusActive, errServiceIsNotActive)

    this.services(boxKey).value.status = ServiceStatusPaused
  }

  /**
   * unpauseService activates an service for a merchant
   *
   * @param index The index of the box to be used for the subscription
   */
  unpauseService(id: ServiceID): void {
    const boxKey: ServicesKey = { address: Txn.sender, id }

    // ensure the box exists
    loggedAssert(this.services(boxKey).exists, errServiceDoesNotExist)
    // ensure the service is currently paused
    loggedAssert(this.services(boxKey).value.status === ServiceStatusPaused, errServiceIsNotPaused)

    this.services(boxKey).value.status = ServiceStatusActive
  }

  /**
   * shutdownService permanently shuts down an service for a merchant
   * it also shutsdown pre-existing subscriptions
   * @param index The index of the box to be used for the subscription
   */
  shutdownService(id: ServiceID): void {
    const boxKey: ServicesKey = { address: Txn.sender, id }
    // ensure the box exists
    loggedAssert(this.services(boxKey).exists, errServiceDoesNotExist)
    // ensure the service isn't already shutdown
    loggedAssert(this.services(boxKey).value.status !== ServiceStatusShutdown, errServiceIsShutdown)

    this.services(boxKey).value.status = ServiceStatusShutdown
  }

  /**
   * block blacklists an address for a merchant
   * @param payment The payment to cover mbr for blocking
   * @param blocked The address to be blocked
   */
  block(payment: gtxn.PaymentTxn, blocked: Account): void {
    // const origin = getOrigin(spending)
    const boxKey = this.getBlockKey(Txn.sender, blocked)

    // ensure the address is not already blocked
    loggedAssert(!this.blocks(boxKey).exists, errUserAlreadyBlocked)
    // ensure the payment is correct
    const costs = this.mbr()
    assertBoundPayment(payment, Txn.sender, Global.currentApplicationAddress, costs.blocks)

    this.blocks(boxKey).create()
  }

  /**
   * unblock removes an address from a merchants blocks
   * @param blocked The address to be unblocked
   */
  unblock(blocked: Account): void {
    const boxKey = this.getBlockKey(Txn.sender, blocked)

    // ensure that the address is currently blocked
    loggedAssert(this.blocks(boxKey).exists, errUserNotBlocked)

    this.blocks(boxKey).delete()

    const costs = this.mbr()

    itxn.payment({
      receiver: Txn.sender,
      amount: costs.blocks
    }).submit()
  }

  /**
   * Subscribe to a gated ALGO service. The gate is checked for the caller's verified context through
   * `Gate.mustCheckFor(gateCtx(p), gateID, args)` (`gateTxn`). A subscriber acting through a verified
   * wallet stores the pair `(W, principal)` (+`SubscriptionPrincipalMBR`, quoted by `newSubscriptionCost`).
   * @param wallet Principal-resolution hint (last arg): the caller's ARC-58 wallet, 0 for a plain account
   */
  gatedSubscribe(
    payment: gtxn.PaymentTxn,
    gateTxn: gtxn.ApplicationCallTxn,
    recipient: Account,
    amount: uint64,
    interval: uint64,
    serviceID: ServiceID,
    wallet: uint64
  ): uint64 {
    return this.subscribeImpl(payment, false, 0, true, gateTxn.groupIndex, recipient, amount, interval, serviceID, wallet, false)
  }

  /** LEGACY shim (pre-hint selector): registry gate origin and referral, no stored pair; delete in Phase 4. */
  @abimethod({ name: 'gatedSubscribe' })
  legacyGatedSubscribe(
    payment: gtxn.PaymentTxn,
    gateTxn: gtxn.ApplicationCallTxn,
    recipient: Account,
    amount: uint64,
    interval: uint64,
    serviceID: ServiceID,
  ): uint64 {
    return this.subscribeImpl(payment, false, 0, true, gateTxn.groupIndex, recipient, amount, interval, serviceID, 0, true)
  }

  /**
   * Subscribe to an ungated ALGO service (or donate with `serviceID` 0).
   * @param wallet Principal-resolution hint (last arg): the referral cut goes to the verified wallet's referrer
   */
  subscribe(
    payment: gtxn.PaymentTxn,
    recipient: Account,
    amount: uint64,
    interval: uint64,
    serviceID: ServiceID,
    wallet: uint64
  ): uint64 {
    return this.subscribeImpl(payment, false, 0, false, 0, recipient, amount, interval, serviceID, wallet, false)
  }

  /** LEGACY shim (pre-hint selector, registry referral); delete in Phase 4. */
  @abimethod({ name: 'subscribe' })
  legacySubscribe(
    payment: gtxn.PaymentTxn,
    recipient: Account,
    amount: uint64,
    interval: uint64,
    serviceID: ServiceID,
  ): uint64 {
    return this.subscribeImpl(payment, false, 0, false, 0, recipient, amount, interval, serviceID, 0, true)
  }

  /** `gatedSubscribe` for an ASA service (`payment` covers the MBR exactly). */
  gatedSubscribeAsa(
    payment: gtxn.PaymentTxn,
    assetXfer: gtxn.AssetTransferTxn,
    gateTxn: gtxn.ApplicationCallTxn,
    recipient: Account,
    amount: uint64,
    interval: uint64,
    serviceID: ServiceID,
    wallet: uint64
  ): uint64 {
    return this.subscribeImpl(payment, true, assetXfer.groupIndex, true, gateTxn.groupIndex, recipient, amount, interval, serviceID, wallet, false)
  }

  /** LEGACY shim (pre-hint selector): registry gate origin and referral, no stored pair; delete in Phase 4. */
  @abimethod({ name: 'gatedSubscribeAsa' })
  legacyGatedSubscribeAsa(
    payment: gtxn.PaymentTxn,
    assetXfer: gtxn.AssetTransferTxn,
    gateTxn: gtxn.ApplicationCallTxn,
    recipient: Account,
    amount: uint64,
    interval: uint64,
    serviceID: ServiceID,
  ): uint64 {
    return this.subscribeImpl(payment, true, assetXfer.groupIndex, true, gateTxn.groupIndex, recipient, amount, interval, serviceID, 0, true)
  }

  /** `subscribe` for an ASA service (`payment` covers the MBR exactly). */
  subscribeAsa(
    payment: gtxn.PaymentTxn,
    assetXfer: gtxn.AssetTransferTxn,
    recipient: Account,
    amount: uint64,
    interval: uint64,
    serviceID: ServiceID,
    wallet: uint64
  ): uint64 {
    return this.subscribeImpl(payment, true, assetXfer.groupIndex, false, 0, recipient, amount, interval, serviceID, wallet, false)
  }

  /** LEGACY shim (pre-hint selector, registry referral); delete in Phase 4. */
  @abimethod({ name: 'subscribeAsa' })
  legacySubscribeAsa(
    payment: gtxn.PaymentTxn,
    assetXfer: gtxn.AssetTransferTxn,
    recipient: Account,
    amount: uint64,
    interval: uint64,
    serviceID: ServiceID,
  ): uint64 {
    return this.subscribeImpl(payment, true, assetXfer.groupIndex, false, 0, recipient, amount, interval, serviceID, 0, true)
  }

  deposit(payment: gtxn.PaymentTxn, id: SubscriptionID): void {
    const subKey = { address: Txn.sender, id }

    loggedAssert(this.subscriptions(subKey).exists, errSubscriptionDoesNotExist)

    const sub = clone(this.subscriptions(subKey).value)

    loggedAssert(sub.asset === 0, errAsaMismatch)

    assertSafePayment(payment, Txn.sender)
    loggedAssert(payment.receiver === Global.currentApplicationAddress, errInvalidPayment)

    this.subscriptions(subKey).value.escrowed += payment.amount
  }

  depositAsa(assetXfer: gtxn.AssetTransferTxn, id: SubscriptionID): void {
    const subKey: SubscriptionKey = { address: Txn.sender, id }

    loggedAssert(this.subscriptions(subKey).exists, errSubscriptionDoesNotExist)

    const { asset } = this.subscriptions(subKey).value

    loggedAssert(asset === assetXfer.xferAsset.id, errAsaMismatch)

    assertSafeAssetTransfer(assetXfer, Txn.sender)
    loggedAssert(assetXfer.assetReceiver === Global.currentApplicationAddress, errInvalidAssetReceiver)

    this.subscriptions(subKey).value.escrowed += assetXfer.assetAmount
  }

  withdraw(id: SubscriptionID, amount: uint64): void {
    const subKey: SubscriptionKey = { address: Txn.sender, id }

    loggedAssert(this.subscriptions(subKey).exists, errSubscriptionDoesNotExist)

    const sub = clone(this.subscriptions(subKey).value)

    loggedAssert(sub.escrowed >= amount, errNotEnoughFunds)

    if (sub.asset !== 0) {
      itxn
        .assetTransfer({
          assetReceiver: Txn.sender,
          xferAsset: sub.asset,
          assetAmount: amount
        })
        .submit()
    } else {
      itxn
        .payment({
          receiver: Txn.sender,
          amount: amount
        })
        .submit()
    }

    this.subscriptions(subKey).value.escrowed -= amount
  }

  unsubscribe(id: SubscriptionID): void {
    const subKey: SubscriptionKey = { address: Txn.sender, id }

    loggedAssert(this.subscriptions(subKey).exists, errSubscriptionDoesNotExist)

    const sub = clone(this.subscriptions(subKey).value)

    this.ensurePassesRepriced()
    const costs = this.mbr()
    let mbrRefund: uint64 = costs.subscriptions
    if (sub.serviceID > 0) {
      const { passes } = this.services({ address: sub.recipient, id: sub.serviceID }).value
      // audit SG-08: the pass MBR was charged at subscribe time whenever the service offers
      // passes, so it is always refunded; the pass box is keyed by the subscription id
      if (passes > 0) {
        this.passes(subKey).delete()
        mbrRefund += this.passesCharged(sub.startDate)
      }
    }
    // principal resolution §6.4: the stored pair's MBR goes back with the subscription
    if (this.principals(subKey).delete()) {
      mbrRefund += SubscriptionPrincipalMBR
    }

    if (sub.asset !== 0) {
      if (sub.escrowed > 0) {
        itxn
          .assetTransfer({
            assetReceiver: Txn.sender,
            xferAsset: sub.asset,
            assetAmount: sub.escrowed
          })
          .submit()
      }

      itxn
        .payment({
          receiver: Txn.sender,
          amount: mbrRefund
        })
        .submit()
    } else {
      itxn
        .payment({
          receiver: Txn.sender,
          amount: sub.escrowed + mbrRefund
        })
        .submit()
    }

    this.subscriptions(subKey).delete()
  }

  /**
   * Pay a gated subscription. The gate is re-checked for the SUBSCRIBER (audit SG-05), never for the
   * caller: `wallet` is the caller's OWN hint (strict; keepers acting as themselves pass 0) and only
   * selects case (1) of `triggerCtx` when the caller is the subscriber's own stored wallet. `gateTxn` must
   * be `Gate.mustCheckFor(triggerGateCtx(key, wallet), gateID, args)`.
   */
  gatedTriggerPayment(gateTxn: gtxn.ApplicationCallTxn, key: SubscriptionKey, wallet: uint64): void {
    const gateID = this.triggerGateID(key)
    const ctx = this.triggerCtx(key, principalOf(this.akitaDAO.value, wallet))
    loggedAssert(gateCheckCtx(gateTxn, this.akitaDAO.value, ctx, gateID), errFailedGate)

    this.triggerImpl(key, true)
  }

  /**
   * LEGACY shim (pre-hint selector, used by the deployed Subscriptions plugin): the gate subject is the
   * subscriber's registry origin, checked with a plain `Gate.mustCheck`; delete in Phase 4.
   */
  @abimethod({ name: 'gatedTriggerPayment' })
  legacyGatedTriggerPayment(gateTxn: gtxn.ApplicationCallTxn, key: SubscriptionKey): void {
    const gateID = this.triggerGateID(key)
    // audit SG-05: eligibility is re-checked for the subscriber, never for the keeper
    const wallet = legacyWalletOf(this.akitaDAO.value, key.address)
    const origin = legacyOriginOr(wallet, key.address)
    loggedAssert(gateCheck(gateTxn, this.akitaDAO.value, origin, gateID), errFailedGate)

    this.triggerImpl(key, true)
  }

  /** Pay an ungated subscription (a gated one needs `gatedTriggerPayment`: errInvalidSequence). */
  triggerPayment(key: SubscriptionKey): void {
    this.triggerImpl(key, false)
  }

  /**
   * Q13 backfill for a gated subscription made before principal resolution (no stored pair): copies the
   * registry answer `(legacyWalletOf(key.address), legacyOriginOr(...))` into `principals` once, so the
   * Phase 4 contract can drop the registry read. Permissionless and caller-funded: `payment` is exactly
   * `SubscriptionPrincipalMBR` from `Txn.sender` (refunded to the subscriber by `unsubscribe`).
   */
  adoptPrincipal(payment: gtxn.PaymentTxn, key: SubscriptionKey): void {
    loggedAssert(this.subscriptions(key).exists, errSubscriptionDoesNotExist)
    loggedAssert(this.subscriptions(key).value.gateID !== 0, errNotGated)
    loggedAssert(!this.principals(key).exists, errPrincipalExists)

    const wallet = legacyWalletOf(this.akitaDAO.value, key.address)
    // nothing to adopt: a plain subscriber keeps `key.address` (and nobody can pin it for them)
    loggedAssert(wallet.id !== 0, errNoLegacyWallet)

    assertBoundPayment(payment, Txn.sender, Global.currentApplicationAddress, SubscriptionPrincipalMBR)

    this.principals(key).value = { wallet: wallet.id, principal: legacyOriginOr(wallet, key.address) }
  }

  /**
   * Resets the streak of a subscription that missed a payment window. Never increments it
   * (audit SG-02): only payments grow a streak.
   */
  streakCheck(key: SubscriptionKey): void {
    loggedAssert(this.subscriptions(key).exists, errSubscriptionDoesNotExist)
    const sub = clone(this.subscriptions(key).value)
    const currentWindowStart: uint64 = this.getLatestWindowStart(sub.startDate, sub.interval)
    if (sub.lastPayment < this.getPreviousWindowStart(currentWindowStart, sub.interval)) {
      this.subscriptions(key).value.streak = 0
    }
  }

  setPasses(id: SubscriptionID, addresses: Account[]): void {
    const subscriptionsKey: SubscriptionKey = { address: Txn.sender, id }

    loggedAssert(this.subscriptions(subscriptionsKey).exists, errSubscriptionDoesNotExist)

    const { serviceID, recipient } = clone(this.subscriptions(subscriptionsKey).value)

    loggedAssert(serviceID > 0, errNoDonations)

    const serviceKey: ServicesKey = { address: recipient, id: serviceID }

    loggedAssert(this.services(serviceKey).exists, errServiceDoesNotExist)

    const { status, passes } = this.services(serviceKey).value

    loggedAssert(status !== ServiceStatusShutdown, errServiceIsShutdown)
    // audit SG-08: services without passes never paid for a pass box
    loggedAssert(passes > 0 && passes >= addresses.length, errPassCountOverflow)

    for (let i: uint64 = 0; i < addresses.length; i += 1) {
      loggedAssert(!this.blocks(this.getBlockKey(recipient, addresses[i])).exists, errBlocked)
    }

    this.passes({ address: Txn.sender, id }).value = clone(addresses)
  }

  /**
   * Deletes a pass box left behind by a subscription that was cancelled before the SG-08
   * fix (legacy `unsubscribe` deleted the wrong key). The freed MBR stays in the contract:
   * whether the owner was already refunded cannot be determined on-chain.
   */
  clearOrphanPasses(key: SubscriptionKey): void {
    loggedAssert(!this.subscriptions(key).exists, errSubscriptionDoesNotExist)
    loggedAssert(this.passes(key).delete(), errSubscriptionDoesNotExist)
  }

  // READ ONLY METHODS ----------------------------------------------------------------------------

  @abimethod({ readonly: true })
  triggerList(req: TriggerListRequest[]): boolean[] {
    const results: boolean[] = []
    for (let i: uint64 = 0; i < req.length; i += 1) {
      for (let j: uint64 = 0; j < req[i].ids.length; j += 1) {
        const key: SubscriptionKey = { address: req[i].address, id: req[i].ids[j] }
        results.push(this.canTrigger(key))
      }
    }
    return results
  }

  /**
   * isBlocked checks if an address is blocked for a merchant
   * @param merchant The merchant address to be checked
   * @param address The address to be checked
   */
  @abimethod({ readonly: true })
  isBlocked(address: Account, blocked: Account): boolean {
    return this.blocks(this.getBlockKey(address, blocked)).exists
  }

  /**
   * serviceIsActive checks if an service is shutdown
   */
  @abimethod({ readonly: true })
  isShutdown(address: Account, id: uint64): boolean {
    return (
      this.services({ address, id }).exists &&
      this.services({ address, id }).value.status === ServiceStatusShutdown
    )
  }

  @abimethod({ readonly: true })
  newServiceCost(asset: uint64, wallet: uint64): uint64 {
    // the referrer `newService(..., wallet)` will pay (genuine wallet → its referrer; never reverts for valid hints)
    return this.serviceCost(quoteReferrerOf(this.akitaDAO.value, wallet))
  }

  /** LEGACY shim (pre-hint selector, registry referral); delete in Phase 4. */
  @abimethod({ readonly: true, name: 'newServiceCost' })
  legacyNewServiceCost(asset: uint64): uint64 {
    return this.serviceCost(this.legacyReferrer())
  }

  /**
   * Exact cost (excluding `amount`) of a subscribe by `Txn.sender` with hint `wallet`: box MBR, plus the
   * stored pair (`SubscriptionPrincipalMBR`) when `wallet != 0` and the service is gated, plus the referral
   * disbursement MBR when the wallet has a referrer.
   */
  @abimethod({ readonly: true })
  newSubscriptionCost(
    recipient: Account,
    asset: uint64,
    serviceID: ServiceID,
    wallet: uint64
  ): uint64 {
    const [mbrAmount, gateID] = this.subscriptionMbr(recipient, serviceID)
    const principalMbr: uint64 = wallet !== 0 && gateID !== 0 ? SubscriptionPrincipalMBR : 0
    return mbrAmount + principalMbr + referralFeeTo(this.akitaDAO.value, quoteReferrerOf(this.akitaDAO.value, wallet), asset)
  }

  /** LEGACY shim (pre-hint selector, registry referral, no stored pair); delete in Phase 4. */
  @abimethod({ readonly: true, name: 'newSubscriptionCost' })
  legacyNewSubscriptionCost(
    recipient: Account,
    asset: uint64,
    serviceID: ServiceID
  ): uint64 {
    const [mbrAmount] = this.subscriptionMbr(recipient, serviceID)
    return mbrAmount + referralFeeTo(this.akitaDAO.value, this.legacyReferrer(), asset)
  }

  /**
   * The `GateCtx` `gatedTriggerPayment(gateTxn, key, wallet)` will assert, computed by the same code
   * (`triggerCtx`). A plugin calls it from inside its window (same `Txn.sender` / caller app as the
   * following target call) to build `Gate.mustCheckFor`; a keeper acting as itself passes `wallet = 0`.
   */
  @abimethod({ readonly: true })
  triggerGateCtx(key: SubscriptionKey, wallet: uint64): GateCtx {
    return this.triggerCtx(key, principalOf(this.akitaDAO.value, wallet))
  }

  @abimethod({ readonly: true })
  blockCost(): uint64 {
    return this.mbr().blocks
  }

  @abimethod({ readonly: true })
  getService(address: Account, id: uint64): Service {
    const key: ServicesKey = { address, id }
    loggedAssert(this.services(key).exists, errServiceDoesNotExist)
    return this.services(key).value
  }

  @abimethod({ readonly: true })
  getServicesByAddress(address: Account, start: uint64, windowSize: uint64): Service[] {
    const services: Service[] = []
    for (let i: uint64 = start; i < start + windowSize; i += 1) {
      const key: ServicesKey = { address, id: i }
      if (this.services(key).exists) {
        services.push(this.services(key).value)
      } else {
        break
      }
    }
    return services
  }

  @abimethod({ readonly: true })
  getSubscription(key: SubscriptionKey): SubscriptionInfoWithExistence {
    if (!this.subscriptions(key).exists) {
      return {
        exists: false,
        recipient: Global.zeroAddress,
        serviceID: 0,
        startDate: 0,
        amount: 0,
        interval: 0,
        asset: 0,
        gateID: 0,
        lastPayment: 0,
        streak: 0,
        escrowed: 0,
      }
    }

    return {
      exists: true,
      ...this.subscriptions(key).value,
    }
  }

  @abimethod({ readonly: true })
  mustGetSubscription(key: SubscriptionKey): SubscriptionInfo {
    loggedAssert(this.subscriptions(key).exists, errSubscriptionDoesNotExist)
    return this.subscriptions(key).value
  }

  @abimethod({ readonly: true })
  getSubscriptionWithDetails(key: SubscriptionKey): SubscriptionInfoWithDetails {
    loggedAssert(this.subscriptions(key).exists, errSubscriptionDoesNotExist)

    const sub = clone(this.subscriptions(key).value)

    let status: ServiceStatus = ServiceStatusNone
    let payoutAddress: Account = sub.recipient
    let title: string = ''
    let description: string = ''
    let bannerImage: CID = op.bzero(36)
    let highlightMessage: Uint8 = HighlightMessageNone
    let highlightColor: bytes<3> = Bytes('000').toFixed({ length: 3 })
    if (sub.serviceID !== 0) {
      const serviceKey: ServicesKey = { address: sub.recipient, id: sub.serviceID }
      loggedAssert(this.services(serviceKey).exists, errServiceDoesNotExist);
      ({ status, payoutAddress, title, description, bannerImage, highlightMessage, highlightColor } = clone(this.services(serviceKey).value))
      if (payoutAddress === Global.zeroAddress) {
        payoutAddress = sub.recipient
      }
    }

    let passes: Account[] = []
    if (this.passes(key).exists) {
      passes = [...passes, ...this.passes(key).value]
    }

    return {
      ...sub,
      status,
      payoutAddress,
      title,
      description,
      bannerImage,
      highlightMessage,
      highlightColor,
      passes
    }
  }

  @abimethod({ readonly: true })
  isFirstSubscription(address: Account): boolean {
    return !this.subscriptionslist(address).exists
  }

  @abimethod({ readonly: true })
  getServiceList(address: Account): uint64 {
    return this.serviceslist(address).exists ? this.serviceslist(address).value : 0
  }

  @abimethod({ readonly: true })
  getSubscriptionList(address: Account): uint64 {
    return this.subscriptionslist(address).exists ? this.subscriptionslist(address).value : 0
  }
}

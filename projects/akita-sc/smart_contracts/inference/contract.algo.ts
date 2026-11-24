import {
  Account, Application, Asset, BoxMap, Bytes, bytes, clone, emit, Global, GlobalState, gtxn, itxn,
  loggedAssert, op, Txn, uint64,
} from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod } from '@algorandfoundation/algorand-typescript/arc4'
import { UpgradeableAkitaBaseContract } from '../utils/base-contracts/upgradeable'
import { subscriptionPaidUp } from '../gates/sub-gates/subscription/utils'
import type { Subscriptions } from '../subscriptions/contract.algo'
import { SubscriptionKey } from '../subscriptions/types'
import { ctxOwnsOf, getAkitaAppList, getAkitaAssets, getInferenceFees, ownsAtRestOf, principalOf } from '../utils/functions'
import { GateCtx, Principal } from '../utils/principal'
import {
  INFERENCE_ASSET_MBR, INFERENCE_ATTESTATION_MBR, INFERENCE_FEE_DIVISOR, INFERENCE_MAX_FEE_PERCENTAGE,
  INFERENCE_MAX_SETTLE_WINDOW, INFERENCE_MAX_UNBOND_DELAY, INFERENCE_METADATA_BASE_MBR, INFERENCE_METADATA_MAX_BYTES,
  INFERENCE_MIN_SETTLE_WINDOW, INFERENCE_MIN_UNBOND_DELAY, INFERENCE_POOL_MBR, INFERENCE_PROVIDER_MBR, INFERENCE_TICKET_MBR,
  INFERENCE_USAGE_MBR,
  ProviderActive, ProviderExited, ProviderPaused, ProviderPending, ProviderUnbonding,
} from './constants'
import {
  errInferenceAssetNotAllowed, errInferenceBadMetadata, errInferenceBadStatus, errInferenceBadStoragePayment,
  errInferenceBadTransfer, errInferenceBadWindow, errInferenceBondTooLow,
  errInferenceNoProvider, errInferenceNotAdmin, errInferenceNotOptedIn, errInferenceNotOwner,
  errInferenceProviderInactive, errInferenceSlashTooHigh, errInferenceUnbonding, errInferenceZeroAddress, errInferenceExpired, errInferenceNoTicket, errInferenceNotClaimer, errInferenceNotExpired, errInferenceOverLock,
  errInferenceZeroLock, errInferenceBadService, errInferenceNoPool, errInferenceNoWallet, errInferenceTicketExists, errInferenceNotSubscribed, errInferenceNotSponsor, errInferencePoolDenied,
  errInferencePoolExhausted,
} from './errors'
import {
  Attestation, InferenceProviderRegistered, InferenceProviderStatus, InferenceSettings, InferenceSlashed,
  InferenceTicketOpened, InferenceTicketSettled, PaymentAsset, Pool, Provider, Ticket, Usage,
  UsageKey,
} from './types'

/**
 * Akita's inference network: a registry of inference providers, and the ledger of what wallets pay them.
 *
 * Providers register with an AKTA bond of at least the DAO's `providerBond` and, while registration is
 * closed, wait as Pending until the admin activates them. A provider's box names its owner, the claim
 * account that settles its tickets, and the payout address. The metadata box holds a URI for its models and
 * prices, and the attestation box is where a provider running in a TEE publishes its measurement and
 * encryption key, for private inference later.
 *
 * Members pay per request, straight from their wallets, the way ZeroSignal's escrow works. For each
 * request the caller (the member's app, or the key that runs their routines and triggers) opens a
 * ticket through InferencePlugin that locks the request's max price from the member's spending account.
 * The provider serves at once, without waiting for the ticket to confirm, then settles it at the actual
 * cost: the provider gets the cost less the DAO's `chargePercentage`, and the rest comes back to the
 * member. A ticket left unsettled past the settle window is refunded in full. A provider whose ticket
 * never lands cuts the member off, losing at most that request.
 *
 * Only Akita wallets open tickets. Every ticket is attributed to the wallet's account (the principal its
 * wallet hint resolves to, the wallet's controlled address), whichever
 * delegated key opened it, and the opened and settled events carry that account.
 *
 * A sponsor (such as Akita, for usage included with a subscription) can fund a pool instead. Each
 * payment of a subscription to the pool's service gives its subscriber the pool's `perPayment` until
 * the next payment. The subscriber opens tickets paid from the pool, or the pool's allocator opens them
 * on the subscriber's behalf; what a ticket does not spend goes back to the pool and to the
 * subscriber's allowance.
 *
 * The provider never opens tickets and can never take more than a ticket locked. A provider that
 * settles for usage it did not serve is paused, its bond slashed to whoever the admin names (such as
 * the members it overcharged), and it is banned.
 */
export class InferenceNetwork extends UpgradeableAkitaBaseContract {

  /** Sets the network's settings, payment assets and provider status, and slashes. Meant to be the DAO wallet. */
  admin = GlobalState<Account>({ key: 'admin' })
  /** Receives swept fees. */
  treasury = GlobalState<Account>({ key: 'treasury' })
  settings = GlobalState<InferenceSettings>({ key: 'settings' })
  providerCount = GlobalState<uint64>({ key: 'providers' })
  ticketCount = GlobalState<uint64>({ key: 'tickets' })
  poolCount = GlobalState<uint64>({ key: 'pools' })

  providers = BoxMap<uint64, Provider>({ keyPrefix: 'p' })
  metadata = BoxMap<uint64, string>({ keyPrefix: 'm' })
  attestations = BoxMap<uint64, Attestation>({ keyPrefix: 'a' })
  tickets = BoxMap<bytes<32>, Ticket>({ keyPrefix: 't' })
  pools = BoxMap<uint64, Pool>({ keyPrefix: 'o' })
  usage = BoxMap<UsageKey, Usage>({ keyPrefix: 'u' })
  assets = BoxMap<uint64, PaymentAsset>({ keyPrefix: 'x' })

  // LIFE CYCLE -----------------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  create(version: string, akitaDAO: Application, admin: Account, treasury: Account): void {
    loggedAssert(admin !== Global.zeroAddress && treasury !== Global.zeroAddress, errInferenceZeroAddress)
    this.version.value = version
    this.akitaDAO.value = akitaDAO
    this.admin.value = admin
    this.treasury.value = treasury
    this.settings.value = {
      unbondDelay: INFERENCE_MIN_UNBOND_DELAY * 2,
      settleWindow: 3_600,
      openRegistration: false,
    }
    this.providerCount.value = 0
    this.ticketCount.value = 0
    this.poolCount.value = 0
  }

  // ADMIN ----------------------------------------------------------------------------------------

  setAdmin(admin: Account): void {
    this.requireAdmin()
    loggedAssert(admin !== Global.zeroAddress, errInferenceZeroAddress)
    this.admin.value = admin
  }

  setTreasury(treasury: Account): void {
    this.requireAdmin()
    loggedAssert(treasury !== Global.zeroAddress, errInferenceZeroAddress)
    this.treasury.value = treasury
  }

  /**
   * Replaces the settings. The settle window stays between 5 minutes and 7 days, and the unbonding
   * delay between 14 days and a year, so a provider that overcharged and then leaves can still be
   * slashed once it is caught. Open tickets keep the expiry they opened with.
   */
  setSettings(settings: InferenceSettings): void {
    this.requireAdmin()
    loggedAssert(
      settings.settleWindow >= INFERENCE_MIN_SETTLE_WINDOW && settings.settleWindow <= INFERENCE_MAX_SETTLE_WINDOW,
      errInferenceBadWindow,
    )
    loggedAssert(
      settings.unbondDelay >= INFERENCE_MIN_UNBOND_DELAY && settings.unbondDelay <= INFERENCE_MAX_UNBOND_DELAY,
      errInferenceBadWindow,
    )
    this.settings.value = clone(settings)
  }

  /**
   * Accepts or stops accepting `asset` for new tickets. The first call for an asset creates its box, paid by
   * `payment` (INFERENCE_ASSET_MBR); later calls take a zero payment.
   */
  setPaymentAsset(payment: gtxn.PaymentTxn, asset: uint64, allowed: boolean): void {
    this.requireAdmin()
    this.requireHolds(asset)
    if (this.assets(asset).exists) {
      this.requireStoragePayment(payment, 0)
      this.assets(asset).value.allowed = allowed ? 1 : 0
    } else {
      this.requireStoragePayment(payment, INFERENCE_ASSET_MBR)
      this.assets(asset).value = { allowed: allowed ? 1 : 0, fees: 0 }
    }
  }

  /**
   * Activates a Pending or Paused provider, or pauses a Pending or Active one. A paused provider takes no new tickets but can settle open ones.
   */
  setProviderStatus(provider: uint64, status: uint64): void {
    this.requireAdmin()
    const current = this.mustGetProvider(provider).status
    loggedAssert(
      (status === ProviderActive && (current === ProviderPending || current === ProviderPaused)) ||
      (status === ProviderPaused && (current === ProviderPending || current === ProviderActive)),
      errInferenceBadStatus,
    )
    this.providers(provider).value.status = status
    emit<InferenceProviderStatus>({ provider, status })
  }

  /** Takes up to the provider's whole bond and sends it to `receiver`. */
  slash(provider: uint64, amount: uint64, receiver: Account): void {
    this.requireAdmin()
    const info = this.mustGetProvider(provider)
    loggedAssert(amount <= info.bond, errInferenceSlashTooHigh)
    this.providers(provider).value.bond = info.bond - amount
    this.send(receiver, info.bondAsset, amount)
    emit<InferenceSlashed>({ provider, asset: info.bondAsset, amount, receiver })
  }

  // ANYONE ---------------------------------------------------------------------------------------

  /** Opts this app in to `asset`; `payment` covers the opt-in minimum balance. */
  optIn(payment: gtxn.PaymentTxn, asset: Asset): void {
    this.requireStoragePayment(payment, Global.assetOptInMinBalance)
    itxn.assetTransfer({ assetReceiver: Global.currentApplicationAddress, xferAsset: asset, assetAmount: 0 }).submit()
  }

  /** Sends the fees accrued in `asset` to the treasury. */
  sweepFees(asset: uint64): uint64 {
    const fees = this.assets(asset).value.fees
    this.assets(asset).value.fees = 0
    this.send(this.treasury.value, asset, fees)
    return fees
  }

  // PROVIDERS ------------------------------------------------------------------------------------

  /**
   * Registers the sender as a provider's owner. `payment` pays for the provider and metadata boxes
   * (providerCost); `bond` transfers at least the DAO's provider bond in AKTA. While registration is
   * closed the provider starts Pending until the admin activates it.
   */
  registerProvider(
    payment: gtxn.PaymentTxn,
    bond: gtxn.Transaction,
    claimer: Account,
    payout: Account,
    metadata: string,
  ): uint64 {
    const settings = clone(this.settings.value)
    const bondAsset = getAkitaAssets(this.akitaDAO.value).akta
    loggedAssert(claimer !== Global.zeroAddress && payout !== Global.zeroAddress, errInferenceZeroAddress)
    this.requireStoragePayment(payment, INFERENCE_PROVIDER_MBR + this.metadataCost(metadata))
    const amount = this.receive(bond, bondAsset)
    loggedAssert(amount >= getInferenceFees(this.akitaDAO.value).providerBond, errInferenceBondTooLow)

    const id: uint64 = this.providerCount.value + 1
    this.providerCount.value = id
    const status = settings.openRegistration ? ProviderActive : ProviderPending
    this.providers(id).value = {
      owner: Txn.sender,
      claimer,
      payout,
      bond: amount,
      bondAsset,
      status,
      unbondAt: 0,
    }
    this.metadata(id).value = metadata
    emit<InferenceProviderRegistered>({ provider: id, owner: Txn.sender, status, bond: amount })
    return id
  }

  updateProvider(provider: uint64, claimer: Account, payout: Account): void {
    this.requireOwner(provider)
    loggedAssert(claimer !== Global.zeroAddress && payout !== Global.zeroAddress, errInferenceZeroAddress)
    this.providers(provider).value.claimer = claimer
    this.providers(provider).value.payout = payout
  }

  /**
   * Replaces the metadata URI. `payment` pays the new box in full (metadataCost) and the old box's
   * deposit goes back to the owner.
   */
  setMetadata(payment: gtxn.PaymentTxn, provider: uint64, metadata: string): void {
    const owner = this.requireOwner(provider)
    this.requireStoragePayment(payment, this.metadataCost(metadata))
    const refund = this.metadataCost(this.metadata(provider).value)
    this.metadata(provider).delete()
    this.metadata(provider).value = metadata
    itxn.payment({ receiver: owner, amount: refund }).submit()
  }

  /** Publishes or replaces the provider's attestation. The first one takes INFERENCE_ATTESTATION_MBR, later ones zero. */
  setAttestation(payment: gtxn.PaymentTxn, provider: uint64, attestation: Attestation): void {
    this.requireOwner(provider)
    this.requireStoragePayment(payment, this.attestations(provider).exists ? 0 : INFERENCE_ATTESTATION_MBR)
    this.attestations(provider).value = clone(attestation)
  }

  /** Adds to a provider's bond, in its bond asset. Anyone may add. */
  addBond(provider: uint64, bond: gtxn.Transaction): void {
    const info = this.mustGetProvider(provider)
    loggedAssert(info.status !== ProviderUnbonding && info.status !== ProviderExited, errInferenceUnbonding)
    const amount = this.receive(bond, info.bondAsset)
    this.providers(provider).value.bond = info.bond + amount
  }

  /**
   * Starts leaving the network: no new tickets (open ones can still be settled), and the bond can be withdrawn after the unbonding delay.
   */
  beginUnbond(provider: uint64): void {
    this.requireOwner(provider)
    const status = this.providers(provider).value.status
    loggedAssert(status !== ProviderUnbonding && status !== ProviderExited, errInferenceUnbonding)
    this.providers(provider).value.status = ProviderUnbonding
    this.providers(provider).value.unbondAt = Global.latestTimestamp + this.settings.value.unbondDelay
    emit<InferenceProviderStatus>({ provider, status: ProviderUnbonding })
  }

  /** After the unbonding delay, returns what is left of the bond to the owner. */
  withdrawBond(provider: uint64): void {
    const owner = this.requireOwner(provider)
    const info = clone(this.providers(provider).value)
    loggedAssert(info.status === ProviderUnbonding && Global.latestTimestamp >= info.unbondAt, errInferenceUnbonding)
    this.providers(provider).value.bond = 0
    this.providers(provider).value.status = ProviderExited
    this.send(owner, info.bondAsset, info.bond)
    emit<InferenceProviderStatus>({ provider, status: ProviderExited })
  }

  // TICKETS --------------------------------------------------------------------------------------

  /**
   * Opens a ticket for one request: `payment` pays the ticket box (INFERENCE_TICKET_MBR), `lock`
   * moves the request's max price in `asset` from the sender (the payer) to this app, and `request` is
   * the caller's id for the request, which the provider sees in the same request. The ticket's id is
   * sha256(principal, request) (see `ticketId`), so the caller knows it before the call lands and
   * tickets for different requests never collide. The ticket must be settled before the settle window
   * ends, or anyone can refund it. Returns the ticket id.
   *
   * `wallet` is the Akita wallet the call is for; tickets are only for Akita wallets. Through
   * InferencePlugin it is the wallet whose window sent the call, so the ticket is attributed to that
   * wallet's controlled address whichever delegated key (the member's app, a routine, a trigger)
   * opened it.
   *
   * Providers serve without waiting for this to confirm: a provider whose ticket never lands cuts the
   * payer off, losing at most that request.
   */
  open(payment: gtxn.PaymentTxn, lock: gtxn.Transaction, provider: uint64, asset: uint64, request: bytes<32>, wallet: uint64): bytes<32> {
    const who = this.walletPrincipal(wallet)
    this.requireStoragePayment(payment, INFERENCE_TICKET_MBR)
    const amount = this.receive(lock, asset)
    return this.newTicket(Txn.sender, who.principal, who.wallet, provider, asset, amount, request, 0, 0, 0)
  }

  // SPONSOR POOLS --------------------------------------------------------------------------------

  /**
   * Creates a sponsor pool in `asset` for subscribers of `merchant`'s subscription service
   * `serviceID`, owned by the sender. Each subscription payment gives its subscriber `perPayment` to
   * use until the next payment. `payment` pays the pool box (INFERENCE_POOL_MBR) and anything above it
   * becomes the pool's credit for ticket and usage boxes. Fund it with `fundPool`. Returns the pool id.
   */
  createPool(
    payment: gtxn.PaymentTxn, asset: uint64, allocator: Account, merchant: Account, serviceID: uint64, perPayment: uint64,
  ): uint64 {
    loggedAssert(this.assets(asset).exists && this.assets(asset).value.allowed === 1, errInferenceAssetNotAllowed)
    loggedAssert(serviceID !== 0 && merchant !== Global.zeroAddress, errInferenceBadService)
    loggedAssert(
      payment.receiver === Global.currentApplicationAddress &&
      payment.amount >= INFERENCE_POOL_MBR &&
      payment.closeRemainderTo === Global.zeroAddress &&
      payment.rekeyTo === Global.zeroAddress,
      errInferenceBadStoragePayment,
    )
    const id: uint64 = this.poolCount.value + 1
    this.poolCount.value = id
    this.pools(id).value = {
      sponsor: Txn.sender,
      allocator,
      merchant,
      asset,
      balance: 0,
      serviceID,
      perPayment,
      credit: payment.amount - INFERENCE_POOL_MBR,
    }
    return id
  }

  /** Adds to a pool's balance, in its asset. Anyone may fund a pool. */
  fundPool(pool: uint64, transfer: gtxn.Transaction): void {
    const info = this.mustGetPool(pool)
    this.pools(pool).value.balance = info.balance + this.receive(transfer, info.asset)
  }

  /** Adds ALGO to a pool's credit for ticket and usage boxes. Anyone may add. */
  addPoolCredit(pool: uint64, payment: gtxn.Transaction): void {
    const info = this.mustGetPool(pool)
    this.pools(pool).value.credit = info.credit + this.receive(payment, 0)
  }

  /** The sponsor changes the allocator and how much each subscription payment gives. */
  updatePool(pool: uint64, allocator: Account, perPayment: uint64): void {
    this.requireSponsor(pool)
    this.pools(pool).value.allocator = allocator
    this.pools(pool).value.perPayment = perPayment
  }

  /** The sponsor takes back up to the pool's unlocked balance and unused credit. */
  withdrawPool(pool: uint64, amount: uint64, credit: uint64): void {
    const info = this.requireSponsor(pool)
    loggedAssert(amount <= info.balance && credit <= info.credit, errInferencePoolExhausted)
    this.pools(pool).value.balance = info.balance - amount
    this.pools(pool).value.credit = info.credit - credit
    this.send(info.sponsor, info.asset, amount)
    this.send(info.sponsor, 0, credit)
  }

  /**
   * A subscriber opens a ticket paid from the pool, within what their latest subscription payment
   * gives. `subscription` must be a paid-up subscription to the pool's service, owned by the caller's
   * principal (`wallet` is the principal-resolution hint, as for `open`), whichever delegated key sends
   * the call. The allowance is counted per subscription and starts over with each payment; the ticket
   * is attributed to the principal. Returns the ticket id.
   */
  openPooled(pool: uint64, provider: uint64, maxPrice: uint64, request: bytes<32>, subscription: SubscriptionKey, wallet: uint64): bytes<32> {
    const info = this.mustGetPool(pool)
    const who = this.walletPrincipal(wallet)
    const ctx: GateCtx = { principal: who.principal, wallet: who.wallet, spender: who.spender }
    loggedAssert(ctxOwnsOf(this.akitaDAO.value, ctx, subscription.address), errInferencePoolDenied)
    return this.poolTicket(pool, info, who.principal, who.wallet, subscription, provider, maxPrice, request)
  }

  /**
   * The pool's allocator (such as Akita's backend) opens a pool ticket for `member`, the controlled
   * address of Akita wallet `memberWallet`, against a paid-up subscription that `member` or another
   * account of that wallet holds. Returns the ticket id.
   */
  openSponsored(
    pool: uint64, member: Account, memberWallet: uint64, provider: uint64, maxPrice: uint64, request: bytes<32>,
    subscription: SubscriptionKey,
  ): bytes<32> {
    const info = this.mustGetPool(pool)
    loggedAssert(info.allocator !== Global.zeroAddress && Txn.sender === info.allocator, errInferencePoolDenied)
    loggedAssert(memberWallet !== 0 && ownsAtRestOf(this.akitaDAO.value, memberWallet, member), errInferenceNoWallet)
    loggedAssert(
      subscription.address === member || ownsAtRestOf(this.akitaDAO.value, memberWallet, subscription.address),
      errInferencePoolDenied,
    )
    return this.poolTicket(pool, info, member, memberWallet, subscription, provider, maxPrice, request)
  }

  /**
   * The provider's claim account settles a ticket at the request's actual `cost`, at most what was
   * locked: the cost less the DAO fee (taken at the rate when the ticket opened) goes to the provider,
   * and the rest of the lock and the storage deposit go back to the payer. Returns what the provider got.
   */
  settle(ticket: bytes<32>, cost: uint64): uint64 {
    const info = this.mustGetTicket(ticket)
    const provider = this.mustGetProvider(info.provider)
    loggedAssert(Txn.sender === provider.claimer, errInferenceNotClaimer)
    loggedAssert(Global.latestTimestamp < info.expiresAt, errInferenceExpired)
    loggedAssert(cost <= info.amount, errInferenceOverLock)

    const fee = op.divw(...op.mulw(cost, info.feePercentage), INFERENCE_FEE_DIVISOR)
    const paid: uint64 = cost - fee
    if (fee > 0) {
      this.assets(info.asset).value.fees = this.assets(info.asset).value.fees + fee
    }
    this.tickets(ticket).delete()
    this.send(provider.payout, info.asset, paid)
    this.refund(info, info.amount - cost)
    emit<InferenceTicketSettled>({ ticket, principal: info.principal, wallet: info.wallet, provider: info.provider, cost, paid, fee })
    return paid
  }

  /** After a ticket's settle window, anyone may return the whole lock and the storage deposit to the payer. */
  refundExpired(ticket: bytes<32>): void {
    const info = this.mustGetTicket(ticket)
    loggedAssert(Global.latestTimestamp >= info.expiresAt, errInferenceNotExpired)
    this.tickets(ticket).delete()
    this.refund(info, info.amount)
    emit<InferenceTicketSettled>({ ticket, principal: info.principal, wallet: info.wallet, provider: info.provider, cost: 0, paid: 0, fee: 0 })
  }

  // READ ONLY ------------------------------------------------------------------------------------

  @abimethod({ readonly: true })
  getProvider(provider: uint64): Provider {
    return this.mustGetProvider(provider)
  }

  /** A ticket's id: sha256 of the principal's address and the caller's request id. */
  @abimethod({ readonly: true })
  ticketId(principal: Account, request: bytes<32>): bytes<32> {
    return this.idOf(principal, request)
  }

  @abimethod({ readonly: true })
  getTicket(ticket: bytes<32>): Ticket {
    return this.mustGetTicket(ticket)
  }

  @abimethod({ readonly: true })
  getPool(pool: uint64): Pool {
    return this.mustGetPool(pool)
  }

  /** What `subscription` has used of `pool` since its last payment (`lastPayment` in the result). */
  @abimethod({ readonly: true })
  poolUsage(pool: uint64, subscription: SubscriptionKey): Usage {
    const key: UsageKey = { pool, subscriber: subscription.address, subscription: subscription.id }
    if (!this.usage(key).exists) return { lastPayment: 0, used: 0 }
    return clone(this.usage(key).value)
  }

  /** What `registerProvider` charges for storage with this metadata URI. */
  @abimethod({ readonly: true })
  providerCost(metadata: string): uint64 {
    return INFERENCE_PROVIDER_MBR + this.metadataCost(metadata)
  }

  // PRIVATE --------------------------------------------------------------------------------------

  /**
   * The amount `txn` moves to this app in `asset`: a plain payment (asset 0) or asset transfer from the
   * sender of this call, with no close-out, clawback or rekey.
   */
  private receive(txn: gtxn.Transaction, asset: uint64): uint64 {
    if (asset === 0) {
      const pay = gtxn.PaymentTxn(txn.groupIndex)
      loggedAssert(
        pay.sender === Txn.sender &&
        pay.receiver === Global.currentApplicationAddress &&
        pay.closeRemainderTo === Global.zeroAddress &&
        pay.rekeyTo === Global.zeroAddress,
        errInferenceBadTransfer,
      )
      return pay.amount
    }
    const xfer = gtxn.AssetTransferTxn(txn.groupIndex)
    loggedAssert(
      xfer.sender === Txn.sender &&
      xfer.assetReceiver === Global.currentApplicationAddress &&
      xfer.xferAsset.id === asset &&
      xfer.assetSender === Global.zeroAddress &&
      xfer.assetCloseTo === Global.zeroAddress &&
      xfer.rekeyTo === Global.zeroAddress,
      errInferenceBadTransfer,
    )
    return xfer.assetAmount
  }

  private send(receiver: Account, asset: uint64, amount: uint64): void {
    if (amount === 0) return
    if (asset === 0) {
      itxn.payment({ receiver, amount }).submit()
    } else {
      itxn.assetTransfer({ assetReceiver: receiver, xferAsset: asset, assetAmount: amount }).submit()
    }
  }

  private metadataCost(metadata: string): uint64 {
    const length = Bytes(metadata).length
    loggedAssert(length > 0 && length <= INFERENCE_METADATA_MAX_BYTES, errInferenceBadMetadata)
    return INFERENCE_METADATA_BASE_MBR + 400 * length
  }

  private requireAdmin(): void {
    loggedAssert(Txn.sender === this.admin.value, errInferenceNotAdmin)
  }

  /** The provider's owner, after checking it sent this call. */
  private requireOwner(provider: uint64): Account {
    const owner = this.mustGetProvider(provider).owner
    loggedAssert(Txn.sender === owner, errInferenceNotOwner)
    return owner
  }

  private requireHolds(asset: uint64): void {
    loggedAssert(asset === 0 || Global.currentApplicationAddress.isOptedIn(Asset(asset)), errInferenceNotOptedIn)
  }

  private requireStoragePayment(payment: gtxn.PaymentTxn, amount: uint64): void {
    loggedAssert(
      payment.receiver === Global.currentApplicationAddress &&
      payment.amount === amount &&
      payment.closeRemainderTo === Global.zeroAddress &&
      payment.rekeyTo === Global.zeroAddress,
      errInferenceBadStoragePayment,
    )
  }

  /**
   * The caller's Akita account. Tickets are only for Akita wallets: the hint must be a genuine wallet
   * the caller acts for (an invalid hint reverts in `principalOf`), and the wallet must control its
   * controlled address now.
   */
  private walletPrincipal(wallet: uint64): Principal {
    const who = principalOf(this.akitaDAO.value, wallet)
    loggedAssert(who.wallet !== 0 && who.origin !== Global.zeroAddress, errInferenceNoWallet)
    return who
  }

  private newTicket(
    payer: Account, principal: Account, wallet: uint64, provider: uint64, asset: uint64, amount: uint64, request: bytes<32>,
    pool: uint64, subscription: uint64, lastPayment: uint64,
  ): bytes<32> {
    loggedAssert(this.mustGetProvider(provider).status === ProviderActive, errInferenceProviderInactive)
    loggedAssert(this.assets(asset).exists && this.assets(asset).value.allowed === 1, errInferenceAssetNotAllowed)
    loggedAssert(amount > 0, errInferenceZeroLock)
    let percentage = getInferenceFees(this.akitaDAO.value).chargePercentage
    if (percentage > INFERENCE_MAX_FEE_PERCENTAGE) percentage = INFERENCE_MAX_FEE_PERCENTAGE
    const id = this.idOf(principal, request)
    loggedAssert(!this.tickets(id).exists, errInferenceTicketExists)
    this.ticketCount.value = this.ticketCount.value + 1
    const expiresAt: uint64 = Global.latestTimestamp + this.settings.value.settleWindow
    this.tickets(id).value = {
      payer, principal, wallet, provider, asset, amount, feePercentage: percentage, expiresAt, pool, subscription, lastPayment,
    }
    emit<InferenceTicketOpened>({ ticket: id, payer, principal, wallet, provider, asset, amount, request, expiresAt, pool })
    return id
  }

  /**
   * Locks `maxPrice` from a pool for `member`, against what `subscription`'s latest payment gives.
   * The subscription must be to the pool's service, not shut down, and paid up.
   */
  private poolTicket(
    pool: uint64, info: Pool, member: Account, wallet: uint64, subscription: SubscriptionKey, provider: uint64,
    maxPrice: uint64, request: bytes<32>,
  ): bytes<32> {
    const lastPayment = this.paidSubscription(info, subscription)
    const key: UsageKey = { pool, subscriber: subscription.address, subscription: subscription.id }
    let credit = info.credit
    let used: uint64 = 0
    if (this.usage(key).exists) {
      if (this.usage(key).value.lastPayment === lastPayment) used = this.usage(key).value.used
    } else {
      loggedAssert(credit >= INFERENCE_USAGE_MBR, errInferencePoolExhausted)
      credit = credit - INFERENCE_USAGE_MBR
    }
    loggedAssert(credit >= INFERENCE_TICKET_MBR, errInferencePoolExhausted)
    loggedAssert(maxPrice <= info.balance && used + maxPrice <= info.perPayment, errInferencePoolExhausted)
    this.usage(key).value = { lastPayment, used: used + maxPrice }
    this.pools(pool).value.credit = credit - INFERENCE_TICKET_MBR
    this.pools(pool).value.balance = info.balance - maxPrice
    return this.newTicket(
      subscription.address, member, wallet, provider, info.asset, maxPrice, request, pool, subscription.id, lastPayment,
    )
  }

  /** The subscription's last payment time, after checking it is a paid-up subscription to the pool's service. */
  private paidSubscription(info: Pool, subscription: SubscriptionKey): uint64 {
    const subscriptions = getAkitaAppList(this.akitaDAO.value).subscriptions
    const sub = abiCall<typeof Subscriptions.prototype.getSubscription>({ appId: subscriptions, args: [subscription], fee: 0 }).returnValue
    loggedAssert(
      sub.exists && sub.serviceID === info.serviceID && sub.recipient === info.merchant && sub.interval !== 0 &&
      sub.startDate <= Global.latestTimestamp,
      errInferenceNotSubscribed,
    )
    const shutdown = abiCall<typeof Subscriptions.prototype.isShutdown>({ appId: subscriptions, args: [info.merchant, info.serviceID], fee: 0 }).returnValue
    loggedAssert(!shutdown && subscriptionPaidUp(sub.startDate, sub.interval, sub.lastPayment), errInferenceNotSubscribed)
    return sub.lastPayment
  }

  /**
   * Returns what a ticket did not spend, and its storage deposit, to whoever paid them: the payer, or
   * the pool (which also gives the subscription back that part of its use, if no payment came since).
   */
  private refund(info: Ticket, amount: uint64): void {
    if (info.pool === 0) {
      this.send(info.payer, info.asset, amount)
      itxn.payment({ receiver: info.payer, amount: INFERENCE_TICKET_MBR }).submit()
      return
    }
    this.pools(info.pool).value.balance = this.pools(info.pool).value.balance + amount
    this.pools(info.pool).value.credit = this.pools(info.pool).value.credit + INFERENCE_TICKET_MBR
    const key: UsageKey = { pool: info.pool, subscriber: info.payer, subscription: info.subscription }
    if (this.usage(key).value.lastPayment === info.lastPayment) {
      const used = this.usage(key).value.used
      this.usage(key).value.used = used > amount ? used - amount : 0
    }
  }

  private mustGetPool(pool: uint64): Pool {
    loggedAssert(this.pools(pool).exists, errInferenceNoPool)
    return clone(this.pools(pool).value)
  }

  private requireSponsor(pool: uint64): Pool {
    const info = this.mustGetPool(pool)
    loggedAssert(Txn.sender === info.sponsor, errInferenceNotSponsor)
    return info
  }

  private idOf(principal: Account, request: bytes<32>): bytes<32> {
    return op.sha256(principal.bytes.concat(request)).toFixed({ length: 32 })
  }

  private mustGetTicket(ticket: bytes<32>): Ticket {
    loggedAssert(this.tickets(ticket).exists, errInferenceNoTicket)
    return clone(this.tickets(ticket).value)
  }

  private mustGetProvider(provider: uint64): Provider {
    loggedAssert(this.providers(provider).exists, errInferenceNoProvider)
    return clone(this.providers(provider).value)
  }
}

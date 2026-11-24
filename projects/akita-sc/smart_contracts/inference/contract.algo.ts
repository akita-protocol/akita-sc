import {
  Account, Application, Asset, BoxMap, Bytes, bytes, clone, emit, Global, GlobalState, gtxn, itxn,
  loggedAssert, op, Txn, uint64,
} from '@algorandfoundation/algorand-typescript'
import { abimethod } from '@algorandfoundation/algorand-typescript/arc4'
import { UpgradeableAkitaBaseContract } from '../utils/base-contracts/upgradeable'
import { getAkitaAssets, getInferenceFees } from '../utils/functions'
import {
  INFERENCE_ASSET_MBR, INFERENCE_ATTESTATION_MBR, INFERENCE_FEE_DIVISOR, INFERENCE_MAX_FEE_PERCENTAGE,
  INFERENCE_MAX_SETTLE_WINDOW, INFERENCE_MAX_UNBOND_DELAY, INFERENCE_METADATA_BASE_MBR, INFERENCE_METADATA_MAX_BYTES,
  INFERENCE_MIN_SETTLE_WINDOW, INFERENCE_MIN_UNBOND_DELAY, INFERENCE_PROVIDER_MBR, INFERENCE_TICKET_MBR,
  ProviderActive, ProviderExited, ProviderPaused, ProviderPending, ProviderUnbonding,
} from './constants'
import {
  errInferenceAssetNotAllowed, errInferenceBadMetadata, errInferenceBadStatus, errInferenceBadStoragePayment,
  errInferenceBadTransfer, errInferenceBadWindow, errInferenceBondTooLow,
  errInferenceNoProvider, errInferenceNotAdmin, errInferenceNotOptedIn, errInferenceNotOwner,
  errInferenceProviderInactive, errInferenceSlashTooHigh, errInferenceUnbonding, errInferenceZeroAddress, errInferenceExpired, errInferenceNoTicket, errInferenceNotClaimer, errInferenceNotExpired, errInferenceOverLock,
  errInferenceZeroLock,
} from './errors'
import {
  Attestation, InferenceProviderRegistered, InferenceProviderStatus, InferenceSettings, InferenceSlashed,
  InferenceTicketOpened, InferenceTicketSettled, PaymentAsset, Provider, Ticket,
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

  providers = BoxMap<uint64, Provider>({ keyPrefix: 'p' })
  metadata = BoxMap<uint64, string>({ keyPrefix: 'm' })
  attestations = BoxMap<uint64, Attestation>({ keyPrefix: 'a' })
  tickets = BoxMap<uint64, Ticket>({ keyPrefix: 't' })
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
   * the caller's id for the request, which the provider sees in the same request. The ticket must be
   * settled before the settle window ends, or anyone can refund it. Returns the ticket id.
   *
   * Providers serve without waiting for this to confirm: a provider whose ticket never lands cuts the
   * payer off, losing at most that request.
   */
  open(payment: gtxn.PaymentTxn, lock: gtxn.Transaction, provider: uint64, asset: uint64, request: bytes<32>): uint64 {
    loggedAssert(this.mustGetProvider(provider).status === ProviderActive, errInferenceProviderInactive)
    loggedAssert(this.assets(asset).exists && this.assets(asset).value.allowed === 1, errInferenceAssetNotAllowed)
    this.requireStoragePayment(payment, INFERENCE_TICKET_MBR)
    const amount = this.receive(lock, asset)
    loggedAssert(amount > 0, errInferenceZeroLock)

    let percentage = getInferenceFees(this.akitaDAO.value).chargePercentage
    if (percentage > INFERENCE_MAX_FEE_PERCENTAGE) percentage = INFERENCE_MAX_FEE_PERCENTAGE
    const id: uint64 = this.ticketCount.value + 1
    this.ticketCount.value = id
    const expiresAt: uint64 = Global.latestTimestamp + this.settings.value.settleWindow
    this.tickets(id).value = { payer: Txn.sender, provider, asset, amount, feePercentage: percentage, expiresAt }
    emit<InferenceTicketOpened>({ ticket: id, payer: Txn.sender, provider, asset, amount, request, expiresAt })
    return id
  }

  /**
   * The provider's claim account settles a ticket at the request's actual `cost`, at most what was
   * locked: the cost less the DAO fee (taken at the rate when the ticket opened) goes to the provider,
   * and the rest of the lock and the storage deposit go back to the payer. Returns what the provider got.
   */
  settle(ticket: uint64, cost: uint64): uint64 {
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
    emit<InferenceTicketSettled>({ ticket, cost, paid, fee })
    return paid
  }

  /** After a ticket's settle window, anyone may return the whole lock and the storage deposit to the payer. */
  refundExpired(ticket: uint64): void {
    const info = this.mustGetTicket(ticket)
    loggedAssert(Global.latestTimestamp >= info.expiresAt, errInferenceNotExpired)
    this.tickets(ticket).delete()
    this.refund(info, info.amount)
    emit<InferenceTicketSettled>({ ticket, cost: 0, paid: 0, fee: 0 })
  }

  // READ ONLY ------------------------------------------------------------------------------------

  @abimethod({ readonly: true })
  getProvider(provider: uint64): Provider {
    return this.mustGetProvider(provider)
  }

  @abimethod({ readonly: true })
  getTicket(ticket: uint64): Ticket {
    return this.mustGetTicket(ticket)
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

  private refund(info: Ticket, amount: uint64): void {
    this.send(info.payer, info.asset, amount)
    itxn.payment({ receiver: info.payer, amount: INFERENCE_TICKET_MBR }).submit()
  }

  private mustGetTicket(ticket: uint64): Ticket {
    loggedAssert(this.tickets(ticket).exists, errInferenceNoTicket)
    return clone(this.tickets(ticket).value)
  }

  private mustGetProvider(provider: uint64): Provider {
    loggedAssert(this.providers(provider).exists, errInferenceNoProvider)
    return clone(this.providers(provider).value)
  }
}

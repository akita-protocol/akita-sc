import {
  Account, Application, Asset, BoxMap, Bytes, bytes, clone, emit, ensureBudget, Global, GlobalState, gtxn, itxn,
  loggedAssert, op, OpUpFeeSource, Txn, uint64,
} from '@algorandfoundation/algorand-typescript'
import { abimethod } from '@algorandfoundation/algorand-typescript/arc4'
import { itob } from '@algorandfoundation/algorand-typescript/op'
import { UpgradeableAkitaBaseContract } from '../utils/base-contracts/upgradeable'
import {
  INFERENCE_ASSET_MBR, INFERENCE_ATTESTATION_MBR, INFERENCE_BPS, INFERENCE_CHANNEL_MBR, INFERENCE_MAX_CLOSE_WINDOW,
  INFERENCE_MAX_FEE_BPS, INFERENCE_MAX_UNBOND_DELAY, INFERENCE_METADATA_BASE_MBR, INFERENCE_METADATA_MAX_BYTES,
  INFERENCE_MIN_CLOSE_WINDOW, INFERENCE_PROVIDER_MBR, INFERENCE_RECEIPT_DOMAIN, INFERENCE_VERIFY_BUDGET,
  ProviderActive, ProviderExited, ProviderPaused, ProviderPending, ProviderUnbonding,
} from './constants'
import {
  errInferenceAssetNotAllowed, errInferenceBadDeposit, errInferenceBadMetadata, errInferenceBadSignature,
  errInferenceBadStatus, errInferenceBadStoragePayment, errInferenceBadWindow, errInferenceBondTooLow,
  errInferenceClosing, errInferenceFeeTooHigh, errInferenceNoChannel, errInferenceNoProvider,
  errInferenceNoSessionKey, errInferenceNotAdmin, errInferenceNotClaimer, errInferenceNotClosable,
  errInferenceNotOptedIn, errInferenceNotOwner, errInferenceNotPayer, errInferenceOverDeposit,
  errInferenceProviderInactive, errInferenceSlashTooHigh, errInferenceStaleReceipt, errInferenceUnbonding,
  errInferenceZeroAddress, errInferenceZeroDeposit,
} from './errors'
import {
  Attestation, Channel, InferenceChannelClosed, InferenceChannelFunded, InferenceChannelOpened, InferenceClaimed,
  InferenceCloseRequested, InferenceProviderRegistered, InferenceProviderStatus, InferenceSettings, PaymentAsset,
  Provider,
} from './types'

/**
 * Akita's inference network: a registry of inference providers and the prepaid payment channels
 * members use to pay them.
 *
 * Providers register with a bond (AKTA) and, while registration is closed, wait as Pending until the
 * admin activates them. A provider's box names its owner, the claim account that collects payments and
 * the payout address. The metadata box holds a URI for its models and prices, and the attestation box
 * is where a provider running in a TEE will publish its measurement and encryption key.
 *
 * A payer (any account, including an ARC-58 escrow through InferencePlugin) opens a channel to one
 * provider with a deposit and an ed25519 session key. With each request the payer's app signs a
 * receipt: the session key's signature over
 *   concat(INFERENCE_RECEIPT_DOMAIN, itob(this app id), itob(channel id), itob(total owed)).
 * The total only grows, so the provider keeps only the latest receipt and claims it whenever it likes.
 * A claim pays the provider the increase less the channel's protocol fee, which accrues here until
 * anyone sweeps it to the treasury.
 *
 * To leave, the payer asks to close. The provider then has the close window to claim its last
 * receipt, after which anyone can finalize and the rest goes back to the payer. The provider can also
 * settle and close at once. Nothing here moves a channel's deposit except a receipt the payer signed or
 * the refund to the payer; the admin can pause providers and slash bonds, but never touch deposits.
 */
export class InferenceNetwork extends UpgradeableAkitaBaseContract {

  /** Sets the network's settings, payment assets and provider status. Meant to be the DAO wallet. */
  admin = GlobalState<Account>({ key: 'admin' })
  /** Receives swept fees and slashed bonds. */
  treasury = GlobalState<Account>({ key: 'treasury' })
  settings = GlobalState<InferenceSettings>({ key: 'settings' })
  providerCount = GlobalState<uint64>({ key: 'providers' })
  channelCount = GlobalState<uint64>({ key: 'channels' })

  providers = BoxMap<uint64, Provider>({ keyPrefix: 'p' })
  metadata = BoxMap<uint64, string>({ keyPrefix: 'm' })
  attestations = BoxMap<uint64, Attestation>({ keyPrefix: 'a' })
  channels = BoxMap<uint64, Channel>({ keyPrefix: 'c' })
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
      feeBps: 0,
      bondAsset: 0,
      minBond: 0,
      unbondDelay: INFERENCE_MAX_CLOSE_WINDOW,
      closeWindow: 86_400,
      openRegistration: false,
    }
    this.providerCount.value = 0
    this.channelCount.value = 0
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
   * Replaces the settings. The fee can never pass INFERENCE_MAX_FEE_BPS, the close window stays
   * between one hour and 30 days, and the unbonding delay is never shorter than the close window, so a
   * provider's bond outlasts every claim it can still make. This app must hold the bond asset.
   */
  setSettings(settings: InferenceSettings): void {
    this.requireAdmin()
    loggedAssert(settings.feeBps <= INFERENCE_MAX_FEE_BPS, errInferenceFeeTooHigh)
    loggedAssert(
      settings.closeWindow >= INFERENCE_MIN_CLOSE_WINDOW && settings.closeWindow <= INFERENCE_MAX_CLOSE_WINDOW,
      errInferenceBadWindow,
    )
    loggedAssert(
      settings.unbondDelay >= INFERENCE_MAX_CLOSE_WINDOW && settings.unbondDelay <= INFERENCE_MAX_UNBOND_DELAY,
      errInferenceBadWindow,
    )
    this.requireHolds(settings.bondAsset)
    this.settings.value = clone(settings)
  }

  /**
   * Accepts or stops accepting `asset` for new channels. The first call for an asset creates its box,
   * paid by `payment` (INFERENCE_ASSET_MBR); later calls take a zero payment. Open channels keep their
   * asset either way.
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

  /** Activates a Pending or Paused provider, or pauses an Active one. Paused providers take no new deposits. */
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

  /** Takes up to the provider's whole bond, for misbehaviour proven to the admin, and sends it to the treasury. */
  slash(provider: uint64, amount: uint64): void {
    this.requireAdmin()
    const info = this.mustGetProvider(provider)
    loggedAssert(amount <= info.bond, errInferenceSlashTooHigh)
    this.providers(provider).value.bond = info.bond - amount
    this.send(this.treasury.value, info.bondAsset, amount)
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
   * (providerCost); `bond` transfers at least the minimum bond in the bond asset. While registration is
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
    loggedAssert(claimer !== Global.zeroAddress && payout !== Global.zeroAddress, errInferenceZeroAddress)
    this.requireStoragePayment(payment, INFERENCE_PROVIDER_MBR + this.metadataCost(metadata))
    const amount = this.receive(bond, settings.bondAsset)
    loggedAssert(amount >= settings.minBond, errInferenceBondTooLow)

    const id: uint64 = this.providerCount.value + 1
    this.providerCount.value = id
    const status = settings.openRegistration ? ProviderActive : ProviderPending
    this.providers(id).value = {
      owner: Txn.sender,
      claimer,
      payout,
      bond: amount,
      bondAsset: settings.bondAsset,
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
   * Starts leaving the network: no new channels or deposits, existing channels can still be claimed and
   * closed, and the bond can be withdrawn after the unbonding delay.
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

  // CHANNELS -------------------------------------------------------------------------------------

  /**
   * Opens a channel from the sender to an active provider. `payment` pays the channel box
   * (INFERENCE_CHANNEL_MBR), `deposit` transfers the opening balance of `asset` from the sender, and
   * `sessionKey` is the ed25519 key that will sign this channel's receipts.
   */
  open(
    payment: gtxn.PaymentTxn,
    deposit: gtxn.Transaction,
    provider: uint64,
    asset: uint64,
    sessionKey: bytes<32>,
  ): uint64 {
    loggedAssert(this.mustGetProvider(provider).status === ProviderActive, errInferenceProviderInactive)
    loggedAssert(this.assets(asset).exists && this.assets(asset).value.allowed === 1, errInferenceAssetNotAllowed)
    loggedAssert(sessionKey !== op.bzero(32).toFixed({ length: 32 }), errInferenceNoSessionKey)
    this.requireStoragePayment(payment, INFERENCE_CHANNEL_MBR)
    const amount = this.receive(deposit, asset)
    loggedAssert(amount > 0, errInferenceZeroDeposit)

    const id: uint64 = this.channelCount.value + 1
    this.channelCount.value = id
    this.channels(id).value = {
      payer: Txn.sender,
      sessionKey,
      provider,
      asset,
      deposit: amount,
      claimed: 0,
      feeBps: this.settings.value.feeBps,
      closeAt: 0,
    }
    emit<InferenceChannelOpened>({ channel: id, payer: Txn.sender, provider, asset, deposit: amount })
    return id
  }

  /** Adds to an open channel's deposit. Anyone may top up; the remainder still goes to the payer. */
  topUp(channel: uint64, deposit: gtxn.Transaction): void {
    const info = this.mustGetChannel(channel)
    loggedAssert(info.closeAt === 0, errInferenceClosing)
    loggedAssert(this.mustGetProvider(info.provider).status === ProviderActive, errInferenceProviderInactive)
    const amount = this.receive(deposit, info.asset)
    loggedAssert(amount > 0, errInferenceZeroDeposit)
    this.channels(channel).value.deposit = info.deposit + amount
    emit<InferenceChannelFunded>({ channel, deposit: info.deposit + amount })
  }

  /**
   * Claims a receipt: pays the provider what `total` adds over the last claim, less the channel's fee.
   * Only the provider's claim account may claim, and not after a requested close's window has ended.
   */
  claim(channel: uint64, total: uint64, signature: bytes<64>): uint64 {
    const info = this.mustGetChannel(channel)
    loggedAssert(info.closeAt === 0 || Global.latestTimestamp < info.closeAt, errInferenceClosing)
    return this.settle(channel, info, total, signature)
  }

  /** The payer asks to close. The provider has the close window to claim its last receipt. */
  requestClose(channel: uint64): void {
    const info = this.mustGetChannel(channel)
    loggedAssert(Txn.sender === info.payer, errInferenceNotPayer)
    loggedAssert(info.closeAt === 0, errInferenceClosing)
    const closeAt: uint64 = Global.latestTimestamp + this.settings.value.closeWindow
    this.channels(channel).value.closeAt = closeAt
    emit<InferenceCloseRequested>({ channel, closeAt })
  }

  /** After a requested close's window, anyone may return the remainder and the storage deposit to the payer. */
  finalizeClose(channel: uint64): void {
    const info = this.mustGetChannel(channel)
    loggedAssert(info.closeAt !== 0 && Global.latestTimestamp >= info.closeAt, errInferenceNotClosable)
    this.close(channel, info)
  }

  /**
   * The provider's claim account claims `total` (when it is above what was claimed) and closes the
   * channel at once, returning the remainder to the payer. Pass the last claimed total and an empty
   * signature to close without a new claim.
   */
  settleAndClose(channel: uint64, total: uint64, signature: bytes<64>): void {
    const info = this.mustGetChannel(channel)
    loggedAssert(Txn.sender === this.mustGetProvider(info.provider).claimer, errInferenceNotClaimer)
    if (total !== info.claimed) {
      loggedAssert(info.closeAt === 0 || Global.latestTimestamp < info.closeAt, errInferenceClosing)
      this.settle(channel, info, total, signature)
    }
    this.close(channel, this.channels(channel).value)
  }

  // READ ONLY ------------------------------------------------------------------------------------

  /** The message a session key signs for `channel` owing `total`. */
  @abimethod({ readonly: true })
  receiptMessage(channel: uint64, total: uint64): bytes {
    return this.receipt(channel, total)
  }

  @abimethod({ readonly: true })
  getProvider(provider: uint64): Provider {
    return this.mustGetProvider(provider)
  }

  @abimethod({ readonly: true })
  getChannel(channel: uint64): Channel {
    return this.mustGetChannel(channel)
  }

  /** What `registerProvider` charges for storage with this metadata URI. */
  @abimethod({ readonly: true })
  providerCost(metadata: string): uint64 {
    return INFERENCE_PROVIDER_MBR + this.metadataCost(metadata)
  }

  // PRIVATE --------------------------------------------------------------------------------------

  private receipt(channel: uint64, total: uint64): bytes {
    return Bytes(INFERENCE_RECEIPT_DOMAIN)
      .concat(itob(Global.currentApplicationId.id))
      .concat(itob(channel))
      .concat(itob(total))
  }

  private settle(channel: uint64, info: Channel, total: uint64, signature: bytes<64>): uint64 {
    const provider = this.mustGetProvider(info.provider)
    loggedAssert(Txn.sender === provider.claimer, errInferenceNotClaimer)
    loggedAssert(total > info.claimed, errInferenceStaleReceipt)
    loggedAssert(total <= info.deposit, errInferenceOverDeposit)
    ensureBudget(INFERENCE_VERIFY_BUDGET, OpUpFeeSource.GroupCredit)
    loggedAssert(op.ed25519verifyBare(this.receipt(channel, total), signature, info.sessionKey), errInferenceBadSignature)

    const amount: uint64 = total - info.claimed
    const fee = op.divw(...op.mulw(amount, info.feeBps), INFERENCE_BPS)
    const paid: uint64 = amount - fee
    this.channels(channel).value.claimed = total
    if (fee > 0) {
      this.assets(info.asset).value.fees = this.assets(info.asset).value.fees + fee
    }
    this.send(provider.payout, info.asset, paid)
    emit<InferenceClaimed>({ channel, provider: info.provider, total, paid, fee })
    return paid
  }

  private close(channel: uint64, info: Channel): void {
    const refund: uint64 = info.deposit - info.claimed
    this.channels(channel).delete()
    this.send(info.payer, info.asset, refund)
    itxn.payment({ receiver: info.payer, amount: INFERENCE_CHANNEL_MBR }).submit()
    emit<InferenceChannelClosed>({ channel, claimed: info.claimed, refunded: refund })
  }

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
        errInferenceBadDeposit,
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
      errInferenceBadDeposit,
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

  private mustGetProvider(provider: uint64): Provider {
    loggedAssert(this.providers(provider).exists, errInferenceNoProvider)
    return clone(this.providers(provider).value)
  }

  private mustGetChannel(channel: uint64): Channel {
    loggedAssert(this.channels(channel).exists, errInferenceNoChannel)
    return clone(this.channels(channel).value)
  }
}

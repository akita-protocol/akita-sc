import { Account, Application, bytes, clone, contract, itxn, loggedAssert, uint64 } from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod, decodeArc4, encodeArc4 } from '@algorandfoundation/algorand-typescript/arc4'
import { INFERENCE_ASSET_MBR, INFERENCE_TICKET_MBR } from '../../../inference/constants'
import { getControlledSpendingAccount, rekeyAddress } from '@akita-protocol/plugin/functions'
import type { InferenceNetwork } from '../../../inference/contract.algo'
import { InferenceSettings } from '../../../inference/types'
import { errInvalidRegistry } from '../../../meta/errors'
import { SubscriptionKey } from '../../../subscriptions/types'
import { GrantPolicyPlugin } from '../../../utils/base-contracts/grant-policy'
import { windowHint } from '../../../utils/principal'
import {
  errInferencePolicyCap, errInferencePolicyDenied, errInferencePolicyEncoding,
  errInferencePolicyFields,
} from './errors'
import { InferencePolicy } from './types'

const MaxPolicyEntries: uint64 = 8

/**
 * Lets a wallet's spending account (its main account or an escrow such as `inference`) pay for
 * inference per request through InferenceNetwork: each call opens a ticket that locks the request's
 * max price, which the provider settles at the actual cost and the rest comes back to the spending
 * account. The ticket's payer is the spending account itself.
 *
 * The caller is whoever sends the request: the member's own app key, or a key Akita holds to run the
 * member's routines and triggers while no client is open. Each gets its own grant, with its own
 * allowance, which caps what its tickets lock over time. Under a delegated grant the policy in Meta
 * (see GrantPolicyPlugin) must name the network, the provider and the asset, and no ticket may lock
 * more than the policy's cap. An admin execution is not limited by a policy.
 *
 * It is also how the Akita DAO administers InferenceNetwork: the DAO's wallet holds a grant of this
 * plugin that needs an execution key, and each admin call below is one ExecutePlugin proposal. The
 * calls run only in a window the wallet's admin approved (never under a delegated grant), are sent
 * from the wallet's spending account, and the network accepts them only from the DAO's wallet (or its
 * bootstrap admin), so the same calls from any other wallet are refused there.
 */
@contract({ avmVersion: 13 })
export class InferencePlugin extends GrantPolicyPlugin {

  @abimethod({ onCreate: 'require' })
  public create(registry: Application): void {
    loggedAssert(registry.id > 0, errInvalidRegistry)
    this.registry.value = registry
  }

  /**
   * Opens a ticket from the spending account to `provider`, paying the ticket's storage deposit and
   * locking `maxPrice` of `asset`, for the request `request`. Returns the ticket id,
   * sha256(the wallet's controlled address, request).
   */
  open(
    wallet: Application,
    rekeyBack: boolean,
    network: Application,
    provider: uint64,
    asset: uint64,
    maxPrice: uint64,
    request: bytes<32>,
  ): bytes<32> {
    const grant = this.grant(wallet)
    if (!this.isAdminWindow(wallet, grant)) {
      const policy = decodeArc4<InferencePolicy>(this.policy(wallet, grant))
      loggedAssert(policy.network === network.id, errInferencePolicyDenied)
      const providerAllowed = this.listed(clone(policy.providers), provider)
      let assetAllowed = false
      for (const allowed of clone(policy.assets)) {
        if (allowed === asset) assetAllowed = true
      }
      loggedAssert(providerAllowed && assetAllowed, errInferencePolicyDenied)
      loggedAssert(maxPrice <= policy.maxPrice, errInferencePolicyCap)
    }
    const sender = getControlledSpendingAccount(wallet)
    const payment = itxn.payment({ sender, receiver: network.address, amount: INFERENCE_TICKET_MBR })
    if (asset === 0) {
      return abiCall<typeof InferenceNetwork.prototype.open>({
        sender,
        appId: network,
        args: [payment, itxn.payment({ sender, receiver: network.address, amount: maxPrice }), provider, asset, request, windowHint(wallet)],
        rekeyTo: rekeyAddress(rekeyBack, wallet),
      }).returnValue
    }
    return abiCall<typeof InferenceNetwork.prototype.open>({
      sender,
      appId: network,
      args: [
        payment,
        itxn.assetTransfer({ sender, assetReceiver: network.address, xferAsset: asset, assetAmount: maxPrice }),
        provider,
        asset,
        request,
        windowHint(wallet),
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    }).returnValue
  }

  /**
   * Opens a ticket paid from sponsor pool `pool`, against the wallet's paid-up `subscription` to the
   * pool's service, for the request `request`. The pool pays the lock; the spending account pays the
   * ticket's storage deposit, which comes back when the ticket closes. The ticket and the pool's allowance are counted for the wallet's account,
   * whichever key sends the call. Under a delegated grant the policy must name the network and the
   * provider; the per-ticket cap still applies. Returns the ticket id.
   */
  openPooled(
    wallet: Application,
    rekeyBack: boolean,
    network: Application,
    pool: uint64,
    provider: uint64,
    maxPrice: uint64,
    request: bytes<32>,
    subscription: SubscriptionKey,
  ): bytes<32> {
    const grant = this.grant(wallet)
    if (!this.isAdminWindow(wallet, grant)) {
      const policy = decodeArc4<InferencePolicy>(this.policy(wallet, grant))
      loggedAssert(policy.network === network.id, errInferencePolicyDenied)
      loggedAssert(this.listed(clone(policy.providers), provider), errInferencePolicyDenied)
      loggedAssert(maxPrice <= policy.maxPrice, errInferencePolicyCap)
    }
    const sender = getControlledSpendingAccount(wallet)
    return abiCall<typeof InferenceNetwork.prototype.openPooled>({
      sender,
      appId: network,
      args: [
        itxn.payment({ sender, receiver: network.address, amount: INFERENCE_TICKET_MBR }),
        pool, provider, maxPrice, request, subscription, windowHint(wallet),
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    }).returnValue
  }

  // DAO ADMINISTRATION -----------------------------------------------------------------------------

  /** InferenceNetwork.setSettings, sent from the wallet's spending account. */
  setSettings(wallet: Application, rekeyBack: boolean, network: Application, settings: InferenceSettings): void {
    this.requireAdminWindow(wallet)
    abiCall<typeof InferenceNetwork.prototype.setSettings>({
      sender: getControlledSpendingAccount(wallet),
      appId: network,
      args: [clone(settings)],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  /**
   * InferenceNetwork.setPaymentAsset, sent from the wallet's spending account, which pays the asset's
   * box (INFERENCE_ASSET_MBR) when `newBox` is true: the first call for an asset.
   */
  setPaymentAsset(wallet: Application, rekeyBack: boolean, network: Application, asset: uint64, allowed: boolean, newBox: boolean): void {
    this.requireAdminWindow(wallet)
    const sender = getControlledSpendingAccount(wallet)
    const deposit: uint64 = newBox ? INFERENCE_ASSET_MBR : 0
    abiCall<typeof InferenceNetwork.prototype.setPaymentAsset>({
      sender,
      appId: network,
      args: [itxn.payment({ sender, receiver: network.address, amount: deposit }), asset, allowed],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  /** InferenceNetwork.setProviderStatus, sent from the wallet's spending account. */
  setProviderStatus(wallet: Application, rekeyBack: boolean, network: Application, provider: uint64, status: uint64): void {
    this.requireAdminWindow(wallet)
    abiCall<typeof InferenceNetwork.prototype.setProviderStatus>({
      sender: getControlledSpendingAccount(wallet),
      appId: network,
      args: [provider, status],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  /** InferenceNetwork.slash, sent from the wallet's spending account. */
  slash(wallet: Application, rekeyBack: boolean, network: Application, provider: uint64, amount: uint64, receiver: Account): void {
    this.requireAdminWindow(wallet)
    abiCall<typeof InferenceNetwork.prototype.slash>({
      sender: getControlledSpendingAccount(wallet),
      appId: network,
      args: [provider, amount, receiver],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  /** InferenceNetwork.setAdmin, sent from the wallet's spending account. */
  setAdmin(wallet: Application, rekeyBack: boolean, network: Application, admin: Account): void {
    this.requireAdminWindow(wallet)
    abiCall<typeof InferenceNetwork.prototype.setAdmin>({
      sender: getControlledSpendingAccount(wallet),
      appId: network,
      args: [admin],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  /**
   * The admin pass-throughs run only in a window the wallet's admin approved: an admin execution, or a
   * global grant that needs an execution key (how the DAO holds this plugin). A delegated key has no
   * policy for them, so it is refused, whatever methods its grant lists.
   */
  private requireAdminWindow(wallet: Application): void {
    loggedAssert(this.isAdminWindow(wallet, this.grant(wallet)), errInferencePolicyDenied)
  }

  private listed(list: uint64[], value: uint64): boolean {
    for (const entry of list) {
      if (entry === value) return true
    }
    return false
  }

  /**
   * Policy body format: an ARC-4 `(uint64,uint64[],uint64[],uint64)` InferencePolicy, canonically
   * encoded, with 1 to 8 providers and assets each, both ascending, and a per-ticket cap above zero.
   */
  @abimethod({ readonly: true })
  public validatePolicy(body: bytes): void {
    const policy = decodeArc4<InferencePolicy>(body)
    loggedAssert(encodeArc4(policy) === body, errInferencePolicyEncoding)
    loggedAssert(policy.network !== 0 && policy.maxPrice > 0, errInferencePolicyFields)
    loggedAssert(policy.providers.length > 0 && policy.providers.length <= MaxPolicyEntries, errInferencePolicyFields)
    loggedAssert(policy.assets.length > 0 && policy.assets.length <= MaxPolicyEntries, errInferencePolicyFields)
    for (let i: uint64 = 1; i < policy.providers.length; i++) {
      loggedAssert(policy.providers[i] > policy.providers[i - 1], errInferencePolicyFields)
    }
    for (let i: uint64 = 1; i < policy.assets.length; i++) {
      loggedAssert(policy.assets[i] > policy.assets[i - 1], errInferencePolicyFields)
    }
  }

}

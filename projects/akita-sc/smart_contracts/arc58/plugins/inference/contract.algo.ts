import { Application, bytes, clone, contract, itxn, loggedAssert, uint64 } from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod, decodeArc4, encodeArc4 } from '@algorandfoundation/algorand-typescript/arc4'
import { INFERENCE_TICKET_MBR } from '../../../inference/constants'
import { getControlledSpendingAccount, rekeyAddress } from '@akita-protocol/plugin/functions'
import type { InferenceNetwork } from '../../../inference/contract.algo'
import { errInvalidRegistry } from '../../../meta/errors'
import { GrantPolicyPlugin } from '../../../utils/base-contracts/grant-policy'
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
   * locking `maxPrice` of `asset`, for the request `request`. Returns the ticket id.
   */
  open(
    wallet: Application,
    rekeyBack: boolean,
    network: Application,
    provider: uint64,
    asset: uint64,
    maxPrice: uint64,
    request: bytes<32>,
  ): uint64 {
    const grant = this.grant(wallet)
    if (!this.isAdminWindow(wallet, grant)) {
      const policy = decodeArc4<InferencePolicy>(this.policy(wallet, grant))
      loggedAssert(policy.network === network.id, errInferencePolicyDenied)
      let providerAllowed = false
      for (const allowed of clone(policy.providers)) {
        if (allowed === provider) providerAllowed = true
      }
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
        args: [payment, itxn.payment({ sender, receiver: network.address, amount: maxPrice }), provider, asset, request],
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
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    }).returnValue
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

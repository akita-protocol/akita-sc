import { Application, bytes, clone, contract, itxn, loggedAssert, uint64 } from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod, decodeArc4, encodeArc4 } from '@algorandfoundation/algorand-typescript/arc4'
import { getControlledSpendingAccount, rekeyAddress } from '@akita-protocol/plugin/functions'
import { INFERENCE_CHANNEL_MBR } from '../../../inference/constants'
import type { InferenceNetwork } from '../../../inference/contract.algo'
import { errInvalidRegistry } from '../../../meta/errors'
import { GrantPolicyPlugin } from '../../../utils/base-contracts/grant-policy'
import {
  errInferenceNotOwnChannel, errInferencePolicyCap, errInferencePolicyDenied, errInferencePolicyEncoding,
  errInferencePolicyFields,
} from './errors'
import { InferencePolicy } from './types'

const MaxPolicyEntries: uint64 = 8

/**
 * Lets a wallet's spending account (its main account or an escrow such as `inference`) pay for
 * inference through InferenceNetwork: open a channel, top it up, and ask to close it. The channel's
 * payer is the spending account itself, so refunds come back to it.
 *
 * An admin execution is never limited. Every other grant needs a policy in Meta (see
 * GrantPolicyPlugin) naming the network, the providers and assets it may use, and the most a channel
 * may hold. A delegated key can then keep the member's channel funded without a prompt, while the
 * wallet's allowance caps what it moves over time. Asking to close needs no policy: it only ever
 * returns money to the wallet.
 */
@contract({ avmVersion: 13 })
export class InferencePlugin extends GrantPolicyPlugin {

  @abimethod({ onCreate: 'require' })
  public create(registry: Application): void {
    loggedAssert(registry.id > 0, errInvalidRegistry)
    this.registry.value = registry
  }

  /**
   * Opens a channel from the spending account to `provider`, paying the channel's storage deposit
   * and `amount` of `asset`, with `sessionKey` signing its receipts. Returns the channel id.
   */
  open(
    wallet: Application,
    rekeyBack: boolean,
    network: Application,
    provider: uint64,
    asset: uint64,
    amount: uint64,
    sessionKey: bytes<32>,
  ): uint64 {
    this.check(wallet, network, provider, asset, amount)
    const sender = getControlledSpendingAccount(wallet)
    const payment = itxn.payment({ sender, receiver: network.address, amount: INFERENCE_CHANNEL_MBR })
    if (asset === 0) {
      return abiCall<typeof InferenceNetwork.prototype.open>({
        sender,
        appId: network,
        args: [payment, itxn.payment({ sender, receiver: network.address, amount }), provider, asset, sessionKey],
        rekeyTo: rekeyAddress(rekeyBack, wallet),
      }).returnValue
    }
    return abiCall<typeof InferenceNetwork.prototype.open>({
      sender,
      appId: network,
      args: [
        payment,
        itxn.assetTransfer({ sender, assetReceiver: network.address, xferAsset: asset, assetAmount: amount }),
        provider,
        asset,
        sessionKey,
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    }).returnValue
  }

  /** Adds `amount` to a channel this spending account opened. */
  topUp(wallet: Application, rekeyBack: boolean, network: Application, channel: uint64, amount: uint64): void {
    const sender = getControlledSpendingAccount(wallet)
    const info = abiCall<typeof InferenceNetwork.prototype.getChannel>({ appId: network, args: [channel], fee: 0 }).returnValue
    loggedAssert(info.payer === sender, errInferenceNotOwnChannel)
    this.check(wallet, network, info.provider, info.asset, info.deposit + amount)
    if (info.asset === 0) {
      abiCall<typeof InferenceNetwork.prototype.topUp>({
        sender,
        appId: network,
        args: [channel, itxn.payment({ sender, receiver: network.address, amount })],
        rekeyTo: rekeyAddress(rekeyBack, wallet),
      })
      return
    }
    abiCall<typeof InferenceNetwork.prototype.topUp>({
      sender,
      appId: network,
      args: [channel, itxn.assetTransfer({ sender, assetReceiver: network.address, xferAsset: info.asset, assetAmount: amount })],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  /** Asks to close a channel this spending account opened; the rest comes back once the close window ends. */
  requestClose(wallet: Application, rekeyBack: boolean, network: Application, channel: uint64): void {
    const sender = getControlledSpendingAccount(wallet)
    abiCall<typeof InferenceNetwork.prototype.requestClose>({
      sender,
      appId: network,
      args: [channel],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  /**
   * Policy body format: an ARC-4 `(uint64,uint64[],uint64[],uint64)` InferencePolicy, canonically
   * encoded, with 1 to 8 providers and assets each, both ascending, and a cap above zero.
   */
  @abimethod({ readonly: true })
  public validatePolicy(body: bytes): void {
    const policy = decodeArc4<InferencePolicy>(body)
    loggedAssert(encodeArc4(policy) === body, errInferencePolicyEncoding)
    loggedAssert(policy.network !== 0 && policy.maxDeposit > 0, errInferencePolicyFields)
    loggedAssert(policy.providers.length > 0 && policy.providers.length <= MaxPolicyEntries, errInferencePolicyFields)
    loggedAssert(policy.assets.length > 0 && policy.assets.length <= MaxPolicyEntries, errInferencePolicyFields)
    for (let i: uint64 = 1; i < policy.providers.length; i++) {
      loggedAssert(policy.providers[i] > policy.providers[i - 1], errInferencePolicyFields)
    }
    for (let i: uint64 = 1; i < policy.assets.length; i++) {
      loggedAssert(policy.assets[i] > policy.assets[i - 1], errInferencePolicyFields)
    }
  }

  /**
   * Under any grant but an admin window, the grant's policy must allow `network`, `provider` and
   * `asset`, and the channel may hold at most the policy's cap once `total` is deposited.
   */
  private check(wallet: Application, network: Application, provider: uint64, asset: uint64, total: uint64): void {
    const grant = this.grant(wallet)
    if (this.isAdminWindow(wallet, grant)) return
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
    loggedAssert(total <= policy.maxDeposit, errInferencePolicyCap)
  }
}


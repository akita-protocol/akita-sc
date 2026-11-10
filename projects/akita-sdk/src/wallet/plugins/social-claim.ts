import { sha256 } from '@noble/hashes/sha2.js'
import { microAlgo } from '@algorandfoundation/algokit-utils'
import type { TransactionComposer } from '@algorandfoundation/algokit-utils/types/composer'
import { ABITupleType, ABIUintType, decodeAddress, decodeUint64, encodeUint64, getApplicationAddress } from 'algosdk'
import { BaseSDK } from '../../base'
import { Gift, SocialClaimClient, SocialClaimFactory } from '../../generated/SocialClaimClient'
import { GroupReturn, MaybeSigner, NewContractSDKParams } from '../../types'
import { assertByteArrayLength } from '../../utils'
import type { WalletSDK } from '../index'
import type { WalletUsePluginParams } from '../types'
import { applyDefaultAppCallMaxFees } from '../utils'
import type { PayPluginSDK } from './pay'
import type { WelcomePluginSDK, WelcomeSendParams } from './welcome'

export type { Gift as SocialClaimGift, GiftKey as SocialClaimGiftKey } from '../../generated/SocialClaimClient'

export type SocialClaimPlatform = 'x' | 'telegram' | 'discord'

/** Must match SOCIAL_CLAIM_ATTESTATION_DOMAIN in the contract. */
export const SOCIAL_CLAIM_ATTESTATION_DOMAIN = 'akita/social-claim/v1'
export const SOCIAL_CLAIM_MIN_TTL = 86_400n
export const SOCIAL_CLAIM_MAX_TTL = 365n * 86_400n
/** Storage deposit for a subject's entry, paid with the first gift and never returned. Must match the contract. */
export const SOCIAL_CLAIM_SUBJECT_MBR = 18_900n
/** Storage deposit for one gift box, returned to the sender's wallet when the box is deleted. Must match the contract. */
export const SOCIAL_CLAIM_GIFT_MBR = 28_500n

const GIFT_PREFIX = 'g'
const GIFT_VALUE_TYPE = new ABITupleType([new ABIUintType(64), new ABIUintType(64)])

const utf8 = (text: string) => new TextEncoder().encode(text)

const concat = (...parts: Uint8Array[]): Uint8Array => {
  const out = new Uint8Array(parts.reduce((n, p) => n + p.length, 0))
  let offset = 0
  for (const part of parts) {
    out.set(part, offset)
    offset += part.length
  }
  return out
}

// claim, refund and prune issue inner txns with fee 0; a caller that replaced the SDK send params
// (setSendParams) must still get pooled-fee coverage, so these ride along explicitly.
const INNER_FEE_SEND_PARAMS = { populateAppCallResources: true, coverAppCallInnerTransactionFees: true }

const startsWith = (bytes: Uint8Array, prefix: Uint8Array) =>
  bytes.length >= prefix.length && prefix.every((v, i) => v === bytes[i])

/**
 * The on-chain subject for a platform identity. Use the platform's stable numeric user id,
 * never a handle: handles change hands.
 */
export function socialClaimSubject(platform: SocialClaimPlatform, userId: string): Uint8Array {
  return sha256(utf8(`${platform}:${userId}`))
}

/**
 * The exact bytes the attestor signs and the contract verifies with ed25519verifyBare:
 * concat('akita/social-claim/v1', itob(appId), subject, newAdmin public key, itob(expires)).
 * No wallet id: the subject has one wallet, so the attestation names only the subject.
 */
export function socialClaimAttestationMessage({ appId, subject, newAdmin, expires }: {
  appId: bigint
  subject: Uint8Array
  newAdmin: string
  expires: bigint
}): Uint8Array {
  assertByteArrayLength(subject, 'subject', 32)
  return concat(
    utf8(SOCIAL_CLAIM_ATTESTATION_DOMAIN),
    encodeUint64(appId),
    subject,
    decodeAddress(newAdmin).publicKey,
    encodeUint64(expires),
  )
}

/** Box name of one gift record: 'g' + subject + uint64be(senderWallet) + uint64be(asset). */
export function socialClaimGiftBoxName(subject: Uint8Array, senderWallet: bigint, asset: bigint): Uint8Array {
  assertByteArrayLength(subject, 'subject', 32)
  return concat(utf8(GIFT_PREFIX), subject, encodeUint64(senderWallet), encodeUint64(asset))
}

export type SocialClaimGiftRef = { subject: Uint8Array; senderWallet: bigint; asset: bigint }

export type SocialClaimGiftRecord = SocialClaimGiftRef & { gift: Gift }

export type SocialClaimSendParams = {
  /** The sponsoring ARC-58 wallet; it pays for the new wallet and the gift. */
  wallet: WalletSDK
  welcome: WelcomePluginSDK
  /** Gift arguments; `admin` is always this app. */
  gift: Omit<WelcomeSendParams, 'admin'>
  subject: Uint8Array
  /** Seconds until anyone may refund. The contract bounds it to [1 day, 365 days]. */
  ttl: bigint
  /** How the sponsor wallet invokes the welcome plugin (callerType, escrow, fundsRequest, ...). */
  usePlugin?: Omit<WalletUsePluginParams, 'calls'>
}

export type SocialClaimTopUpParams = {
  /** The sponsoring ARC-58 wallet; it pays the top-up. */
  wallet: WalletSDK
  pay: PayPluginSDK
  subject: Uint8Array
  /** 0 for ALGO, else an ASA the pending wallet is opted into. */
  asset: bigint
  amount: bigint
  /** Seconds until anyone may refund this sender's gift; only ever extends the existing expiry. */
  ttl: bigint
  usePlugin?: Omit<WalletUsePluginParams, 'calls'>
}

export type SocialClaimClaimParams = MaybeSigner & {
  subject: Uint8Array
  newAdmin: string
  expires: bigint
  signature: Uint8Array
  /** Also delete the subject's gift boxes in the same group, returning each storage deposit to its sender's wallet. */
  prune?: boolean
}

/**
 * Escrow-free admin for "send to anyone" wallets. A subject (platform identity) has at most one
 * gift wallet. Its admin is this app until the attestor (Akita's claim portal) signs for the
 * recipient. Each sender's gift per asset is one box; after its expiry anyone may refund it to the
 * sender's wallet. Whoever sends a gift pays its storage deposit in the same group: the subject's
 * entry with the first gift, and each new gift box. A gift box's deposit comes back to the sender's
 * wallet when the box is deleted.
 */
export class SocialClaimSDK extends BaseSDK<SocialClaimClient> {
  constructor(params: NewContractSDKParams) {
    super({ factory: SocialClaimFactory, ...params }, 'SOCIAL_CLAIM_APP_ID')
  }

  /** The admin address every gift wallet starts with. */
  get address(): string {
    return getApplicationAddress(this.appId).toString()
  }

  /**
   * First gift, one atomic group: the sponsor wallet's usePlugin txns for welcome.sendToAnyone
   * with this app as admin, then the storage payment and `bind` pointing at that call. Returns the
   * new wallet id. The account that sends the group pays the deposit.
   *
   * The wallet's usePlugin group is [arc58_rekeyToPlugin, sendToAnyone, arc58_verifyAuthAddress];
   * the wallet only inspects txns between the rekey and the verify, so `bind` rides after it.
   */
  async sendToAnyone({ wallet, welcome, gift, subject, ttl, usePlugin = {} }: SocialClaimSendParams): Promise<{ wallet: bigint; result: GroupReturn }> {
    assertByteArrayLength(subject, 'subject', 32)
    const { group, length, sendParams } = await wallet.prepareUsePlugin({
      ...usePlugin,
      calls: [welcome.sendToAnyone({ ...gift, admin: this.address })],
    })
    const composer = await group.composer()
    const welcomeCallIndex = this.pluginCallIndex(composer, welcome.appId, length)
    composer.addAppCallMethodCall(await this.client.params.bind({
      ...sendParams,
      args: {
        mbrPayment: await this.storagePayment(sendParams.sender, SOCIAL_CLAIM_SUBJECT_MBR + SOCIAL_CLAIM_GIFT_MBR),
        welcomeCallIndex,
        subject,
        ttl,
      },
    }))
    await this.capPluginFees(composer)
    const result = await group.send({ ...sendParams }) as unknown as GroupReturn
    const ids = (result.returns as unknown[]).filter((r): r is bigint => typeof r === 'bigint')
    if (ids.length === 0) throw new Error('sendToAnyone returned no wallet id')
    return { wallet: ids[ids.length - 1], result }
  }

  /**
   * Top-up of a pending wallet, one atomic group: the sponsor wallet's usePlugin txns for one
   * pay.pay payment to the pending wallet, then the storage payment and `contribute` pointing at
   * that call. The deposit is due only for this wallet's first gift to the subject in this asset.
   */
  async topUp({ wallet, pay, subject, asset, amount, ttl, usePlugin = {} }: SocialClaimTopUpParams): Promise<GroupReturn> {
    assertByteArrayLength(subject, 'subject', 32)
    const pending = await this.getPending(subject)
    if (pending === undefined) throw new Error('subject has no pending gift wallet')
    const { group, length, sendParams } = await wallet.prepareUsePlugin({
      ...usePlugin,
      calls: [pay.pay({ payments: [{ receiver: getApplicationAddress(pending).toString(), asset, amount }] })],
    })
    const composer = await group.composer()
    const payCallIndex = this.pluginCallIndex(composer, pay.appId, length)
    const existing = await this.getGift({ subject, senderWallet: wallet.appId, asset })
    composer.addAppCallMethodCall(await this.client.params.contribute({
      ...sendParams,
      args: {
        mbrPayment: await this.storagePayment(sendParams.sender, existing === undefined ? SOCIAL_CLAIM_GIFT_MBR : 0n),
        payCallIndex,
        subject,
        ttl,
      },
    }))
    await this.capPluginFees(composer)
    return await group.send({ ...sendParams }) as unknown as GroupReturn
  }

  /** Relay one attestation for the subject's pending wallet. Anyone may send it. */
  async claim({ subject, newAdmin, expires, signature, prune = false, ...params }: SocialClaimClaimParams): Promise<GroupReturn> {
    assertByteArrayLength(subject, 'subject', 32)
    assertByteArrayLength(signature, 'signature', 64)
    const sendParams = this.getRequiredSendParams(params)
    const maxFee = await this.innerFeeLimit()
    const group = this.client.newGroup()
    group.claim({ ...sendParams, args: { subject, newAdmin, expires, signature }, maxFee })
    if (prune) {
      for (const { senderWallet, asset } of await this.listGifts(subject)) {
        group.prune({ ...sendParams, args: { subject, senderWallet, asset }, maxFee })
      }
    }
    return await group.send({ ...sendParams, ...INNER_FEE_SEND_PARAMS }) as unknown as GroupReturn
  }

  /** After expiry, return one sender's gift to that sender's wallet. Anyone may send it. */
  async refund({ subject, senderWallet, asset, ...params }: MaybeSigner & SocialClaimGiftRef): Promise<GroupReturn> {
    assertByteArrayLength(subject, 'subject', 32)
    const sendParams = this.getRequiredSendParams(params)
    return await this.client.send.refund({
      ...sendParams,
      ...INNER_FEE_SEND_PARAMS,
      args: { subject, senderWallet, asset },
      maxFee: await this.innerFeeLimit(),
    }) as unknown as GroupReturn
  }

  /** Delete an absorbed gift box once its subject is claimed. Anyone may send it. */
  async prune({ subject, senderWallet, asset, ...params }: MaybeSigner & SocialClaimGiftRef): Promise<GroupReturn> {
    assertByteArrayLength(subject, 'subject', 32)
    return await this.client.send.prune({
      ...this.getRequiredSendParams(params),
      ...INNER_FEE_SEND_PARAMS,
      args: { subject, senderWallet, asset },
      maxFee: await this.innerFeeLimit(),
    }) as unknown as GroupReturn
  }

  async setAttestor({ attestor, ...params }: MaybeSigner & { attestor: Uint8Array }): Promise<void> {
    assertByteArrayLength(attestor, 'attestor', 32)
    await this.client.send.setAttestor({ ...this.getRequiredSendParams(params), args: { attestor } })
  }

  async setManager({ manager, ...params }: MaybeSigner & { manager: string }): Promise<void> {
    await this.client.send.setManager({ ...this.getRequiredSendParams(params), args: { manager } })
  }

  /** The subject's gift wallet while unclaimed, or undefined. */
  async getPending(subject: Uint8Array): Promise<bigint | undefined> {
    assertByteArrayLength(subject, 'subject', 32)
    return this.readBox(() => this.client.state.box.pending.value(subject))
  }

  /** The subject's gift wallet once claimed, or undefined. */
  async getDirectory(subject: Uint8Array): Promise<bigint | undefined> {
    assertByteArrayLength(subject, 'subject', 32)
    return this.readBox(() => this.client.state.box.directory.value(subject))
  }

  /** One sender's open or absorbed gift for a subject in one asset, or undefined. */
  async getGift({ subject, senderWallet, asset }: SocialClaimGiftRef): Promise<Gift | undefined> {
    assertByteArrayLength(subject, 'subject', 32)
    return this.readBox(() => this.client.state.box.gifts.value({ subject, senderWallet, asset }))
  }

  /** Every gift box for a subject, read by box-name prefix. */
  async listGifts(subject: Uint8Array): Promise<SocialClaimGiftRecord[]> {
    assertByteArrayLength(subject, 'subject', 32)
    const prefix = concat(utf8(GIFT_PREFIX), subject)
    const boxes = await this.client.appClient.getBoxValuesFromABIType(
      GIFT_VALUE_TYPE,
      (name) => name.nameRaw.length === prefix.length + 16 && startsWith(name.nameRaw, prefix),
    )
    return boxes.map(({ name, value }) => {
      const [amount, expiry] = value as [bigint, bigint]
      return {
        subject,
        senderWallet: decodeUint64(name.nameRaw.subarray(prefix.length, prefix.length + 8), 'bigint'),
        asset: decodeUint64(name.nameRaw.subarray(prefix.length + 8, prefix.length + 16), 'bigint'),
        gift: { amount, expiry },
      }
    })
  }

  /** The storage deposit a bind or contribute call takes as its payment argument. */
  private storagePayment(sender: WalletUsePluginParams['sender'], amount: bigint) {
    return this.algorand.createTransaction.payment({ sender: sender!, receiver: this.address, amount: microAlgo(amount) })
  }

  /**
   * The contract reads the plugin call three txns before bind/contribute, so the group must end
   * [plugin call, verifyAuthAddress] right before our storage payment and call. Options that append txns after the
   * verify (seedPrincipalResources) break that shape; fail here with a reason instead of on chain.
   */
  private pluginCallIndex(composer: TransactionComposer, plugin: bigint, groupLength: number): bigint {
    const txns = (composer as unknown as { txns: { type: string; appId?: bigint }[] }).txns
    const index = txns.findIndex((txn) => txn.type === 'methodCall' && txn.appId === plugin)
    if (index === -1 || index !== groupLength - 2 || txns.length !== groupLength) {
      throw new Error('usePlugin group must end with the plugin call then arc58_verifyAuthAddress; drop options that add txns')
    }
    return BigInt(index)
  }

  // The pay plugin's call carries no maxFee of its own, so its inner transfer could not be
  // fee-pooled; give every app call without a ceiling the same one wallet.usePlugin would.
  private async capPluginFees(composer: TransactionComposer): Promise<void> {
    const { minFee } = await this.algorand.getSuggestedParams()
    applyDefaultAppCallMaxFees(
      (composer as unknown as { txns: { type: string; maxFee?: ReturnType<typeof microAlgo> }[] }).txns,
      microAlgo(BigInt(minFee) * 16n),
    )
  }

  private async readBox<T>(read: () => Promise<T | undefined>): Promise<T | undefined> {
    try {
      return await read()
    } catch (error) {
      if (String(error).includes('box not found')) return undefined
      throw error
    }
  }

  /**
   * claim: one inner changeAdmin plus opcode budget. refund: rekeyTo (with its nested payment), the
   * transfer and the deposit's return. prune: the deposit's return.
   */
  private async innerFeeLimit() {
    const { minFee } = await this.algorand.getSuggestedParams()
    return microAlgo(BigInt(minFee) * 8n)
  }
}

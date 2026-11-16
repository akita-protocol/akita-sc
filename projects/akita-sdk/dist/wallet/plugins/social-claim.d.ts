import { BaseSDK } from '../../base';
import { Gift, SocialClaimClient } from '../../generated/SocialClaimClient';
import { GroupReturn, MaybeSigner, NewContractSDKParams } from '../../types';
import type { WalletSDK } from '../index';
import type { WalletUsePluginParams } from '../types';
import type { PayPluginSDK } from './pay';
import type { WelcomePluginSDK, WelcomeSendParams } from './welcome';
export type { Gift as SocialClaimGift, GiftKey as SocialClaimGiftKey } from '../../generated/SocialClaimClient';
export type SocialClaimPlatform = 'x' | 'telegram' | 'discord';
/** Must match SOCIAL_CLAIM_ATTESTATION_DOMAIN in the contract. */
export declare const SOCIAL_CLAIM_ATTESTATION_DOMAIN = "akita/social-claim/v1";
export declare const SOCIAL_CLAIM_MIN_TTL = 86400n;
export declare const SOCIAL_CLAIM_MAX_TTL: bigint;
/** Storage deposit for a subject's entry, paid with the first gift and never returned. Must match the contract. */
export declare const SOCIAL_CLAIM_SUBJECT_MBR = 18900n;
/**
 * Storage deposit for one gift box, returned to the account that paid it (the storage payment's
 * sender) when the box is deleted. Must match the contract.
 */
export declare const SOCIAL_CLAIM_GIFT_MBR = 41300n;
/**
 * The on-chain subject for a platform identity. Use the platform's stable numeric user id,
 * never a handle: handles change hands.
 */
export declare function socialClaimSubject(platform: SocialClaimPlatform, userId: string): Uint8Array;
/**
 * The exact bytes the attestor signs and the contract verifies with ed25519verifyBare:
 * concat('akita/social-claim/v1', itob(appId), subject, newAdmin public key, itob(expires)).
 * No wallet id: the subject has one wallet, so the attestation names only the subject.
 */
export declare function socialClaimAttestationMessage({ appId, subject, newAdmin, expires }: {
    appId: bigint;
    subject: Uint8Array;
    newAdmin: string;
    expires: bigint;
}): Uint8Array;
/** Box name of one gift record: 'g' + subject + uint64be(senderWallet) + uint64be(asset). */
export declare function socialClaimGiftBoxName(subject: Uint8Array, senderWallet: bigint, asset: bigint): Uint8Array;
export type SocialClaimGiftRef = {
    subject: Uint8Array;
    senderWallet: bigint;
    asset: bigint;
};
export type SocialClaimGiftRecord = SocialClaimGiftRef & {
    gift: Gift;
};
export type SocialClaimSendParams = {
    /** The sponsoring ARC-58 wallet; it pays for the new wallet and the gift. */
    wallet: WalletSDK;
    welcome: WelcomePluginSDK;
    /** Gift arguments; `admin` is always this app. */
    gift: Omit<WelcomeSendParams, 'admin'>;
    subject: Uint8Array;
    /** Seconds until anyone may refund. The contract bounds it to [1 day, 365 days]. */
    ttl: bigint;
    /** How the sponsor wallet invokes the welcome plugin (callerType, escrow, fundsRequest, ...). */
    usePlugin?: Omit<WalletUsePluginParams, 'calls'>;
};
export type SocialClaimTopUpParams = {
    /** The sponsoring ARC-58 wallet; it pays the top-up. */
    wallet: WalletSDK;
    pay: PayPluginSDK;
    subject: Uint8Array;
    /** 0 for ALGO, else an ASA the pending wallet is opted into. */
    asset: bigint;
    amount: bigint;
    /** Seconds until anyone may refund this sender's gift; only ever extends the existing expiry. */
    ttl: bigint;
    usePlugin?: Omit<WalletUsePluginParams, 'calls'>;
};
export type SocialClaimClaimParams = MaybeSigner & {
    subject: Uint8Array;
    newAdmin: string;
    expires: bigint;
    signature: Uint8Array;
    /** Also delete the subject's gift boxes in the same group, returning each storage deposit to the account that paid it. */
    prune?: boolean;
};
/**
 * Escrow-free admin for "send to anyone" wallets. A subject (platform identity) has at most one
 * gift wallet. Its admin is this app until the attestor (Akita's claim portal) signs for the
 * recipient. Each sender's gift per asset is one box; after its expiry anyone may refund it to the
 * sender's wallet. Each gift pays its storage deposit in the same group: the subject's entry with
 * the first gift, and each new gift box. A gift box records the account that paid for it (`payer`),
 * and its deposit goes back to that account when the box is deleted. These methods pay from the
 * account that sends the group, so that account gets the deposit back, not the sponsor wallet.
 */
export declare class SocialClaimSDK extends BaseSDK<SocialClaimClient> {
    constructor(params: NewContractSDKParams);
    /** The admin address every gift wallet starts with. */
    get address(): string;
    /**
     * First gift, one atomic group: the sponsor wallet's usePlugin txns for welcome.sendToAnyone
     * with this app as admin, then the storage payment and `bind` pointing at that call. Returns the
     * new wallet id. The account that sends the group pays the deposit and gets the gift box's part
     * back when the box is deleted.
     *
     * The wallet's usePlugin group is [arc58_rekeyToPlugin, sendToAnyone, arc58_verifyAuthAddress];
     * the wallet only inspects txns between the rekey and the verify, so `bind` rides after it.
     */
    sendToAnyone({ wallet, welcome, gift, subject, ttl, usePlugin }: SocialClaimSendParams): Promise<{
        wallet: bigint;
        result: GroupReturn;
    }>;
    /**
     * Top-up of a pending wallet, one atomic group: the sponsor wallet's usePlugin txns for one
     * pay.pay payment to the pending wallet, then the storage payment and `contribute` pointing at
     * that call. The deposit is due only for this wallet's first gift to the subject in this asset.
     */
    topUp({ wallet, pay, subject, asset, amount, ttl, usePlugin }: SocialClaimTopUpParams): Promise<GroupReturn>;
    /** Relay one attestation for the subject's pending wallet. Anyone may send it. */
    claim({ subject, newAdmin, expires, signature, prune, ...params }: SocialClaimClaimParams): Promise<GroupReturn>;
    /** After expiry, return one sender's gift to that sender's wallet. Anyone may send it. */
    refund({ subject, senderWallet, asset, ...params }: MaybeSigner & SocialClaimGiftRef): Promise<GroupReturn>;
    /** Delete an absorbed gift box once its subject is claimed. Anyone may send it. */
    prune({ subject, senderWallet, asset, ...params }: MaybeSigner & SocialClaimGiftRef): Promise<GroupReturn>;
    setAttestor({ attestor, ...params }: MaybeSigner & {
        attestor: Uint8Array;
    }): Promise<void>;
    setManager({ manager, ...params }: MaybeSigner & {
        manager: string;
    }): Promise<void>;
    /** The subject's gift wallet while unclaimed, or undefined. */
    getPending(subject: Uint8Array): Promise<bigint | undefined>;
    /** The subject's gift wallet once claimed, or undefined. */
    getDirectory(subject: Uint8Array): Promise<bigint | undefined>;
    /** One sender's open or absorbed gift for a subject in one asset, or undefined. */
    getGift({ subject, senderWallet, asset }: SocialClaimGiftRef): Promise<Gift | undefined>;
    /** Every gift box for a subject, read by box-name prefix. */
    listGifts(subject: Uint8Array): Promise<SocialClaimGiftRecord[]>;
    /** The storage deposit a bind or contribute call takes as its payment argument. */
    private storagePayment;
    /**
     * The contract reads the plugin call three txns before bind/contribute, so the group must end
     * [plugin call, verifyAuthAddress] right before our storage payment and call. Options that append txns after the
     * verify (seedPrincipalResources) break that shape; fail here with a reason instead of on chain.
     */
    private pluginCallIndex;
    private capPluginFees;
    private readBox;
    /**
     * claim: one inner changeAdmin plus opcode budget. refund: rekeyTo (with its nested payment), the
     * transfer and the deposit's return. prune: the deposit's return.
     */
    private innerFeeLimit;
}

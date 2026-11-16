import { uint64 } from '@algorandfoundation/algorand-typescript'

/** Prefix of every attestation message. Bump the version when the message layout changes. */
export const SOCIAL_CLAIM_ATTESTATION_DOMAIN = 'akita/social-claim/v1'

export const SOCIAL_CLAIM_MIN_TTL: uint64 = 86_400
export const SOCIAL_CLAIM_MAX_TTL: uint64 = 365 * 86_400

/**
 * Opcode budget claim() needs before ed25519verifyBare (1900) plus the inner changeAdmin
 * call and box writes that follow it.
 */
export const SOCIAL_CLAIM_VERIFY_BUDGET: uint64 = 2_400

/**
 * Storage deposits, paid by whoever sends the gift. Box MBR = 2_500 + 400 * (key bytes + value bytes).
 *
 * A subject entry is the `pending` box and, after a claim, the `directory` box that replaces it
 * (1 + 32 key bytes, 8 value bytes). It is never deleted, so its deposit is never returned.
 */
export const SOCIAL_CLAIM_SUBJECT_MBR: uint64 = 18_900
/**
 * One gift box (1 + 32 + 8 + 8 key bytes; 8 + 8 + 32 value bytes, the last 32 its payer). Returned to
 * the payer when the box is deleted.
 */
export const SOCIAL_CLAIM_GIFT_MBR: uint64 = 41_300

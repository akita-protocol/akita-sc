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

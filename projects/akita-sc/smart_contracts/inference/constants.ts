import { uint64 } from '@algorandfoundation/algorand-typescript'

/** Prefix of every receipt a session key signs. Bump the version when the message layout changes. */
export const INFERENCE_RECEIPT_DOMAIN = 'akita/inference/v1'

/** The protocol fee can never be set above 20% (basis points). */
export const INFERENCE_MAX_FEE_BPS: uint64 = 2_000
export const INFERENCE_BPS: uint64 = 10_000

/** A channel's close window: at least one hour so a provider can always claim, at most 30 days. */
export const INFERENCE_MIN_CLOSE_WINDOW: uint64 = 3_600
export const INFERENCE_MAX_CLOSE_WINDOW: uint64 = 30 * 86_400
/** A provider's unbonding delay: at least the longest close window, at most one year. */
export const INFERENCE_MAX_UNBOND_DELAY: uint64 = 365 * 86_400

/** Opcode budget for a claim: ed25519verifyBare (1,900) plus the box reads and payouts around it. */
export const INFERENCE_VERIFY_BUDGET: uint64 = 2_600

/** Provider status. Pending providers wait for the admin while registration is closed. */
export const ProviderPending: uint64 = 0
export const ProviderActive: uint64 = 1
export const ProviderPaused: uint64 = 2
export const ProviderUnbonding: uint64 = 3
export const ProviderExited: uint64 = 4

/**
 * Storage deposits. Box MBR = 2_500 + 400 * (key bytes + value bytes); every key is a 1-byte prefix
 * and a uint64 id.
 */
/** Provider box: three addresses and four uint64s. */
export const INFERENCE_PROVIDER_MBR: uint64 = 2_500 + 400 * (9 + 32 * 3 + 8 * 4)
/** Attestation box: a uint64 kind, a 32-byte measurement and a 32-byte encryption key. */
export const INFERENCE_ATTESTATION_MBR: uint64 = 2_500 + 400 * (9 + 8 + 32 + 32)
/** Channel box: payer, session key and six uint64s. */
export const INFERENCE_CHANNEL_MBR: uint64 = 2_500 + 400 * (9 + 32 + 32 + 8 * 6)
/** Payment asset box: allowed flag and accrued fees. */
export const INFERENCE_ASSET_MBR: uint64 = 2_500 + 400 * (9 + 8 + 8)
/** Metadata box, before the URI's own bytes (stored as is, without a length prefix). */
export const INFERENCE_METADATA_BASE_MBR: uint64 = 2_500 + 400 * 9
export const INFERENCE_METADATA_MAX_BYTES: uint64 = 512

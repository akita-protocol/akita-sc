import { uint64 } from '@algorandfoundation/algorand-typescript'

/** The DAO's inference fee is a whole-number percentage out of 10_000 (3.5% is 350), and never above 20%. */
export const INFERENCE_FEE_DIVISOR: uint64 = 10_000
export const INFERENCE_MAX_FEE_PERCENTAGE: uint64 = 2_000

/** How long a provider has to settle a ticket before anyone can refund it: 5 minutes to 7 days. */
export const INFERENCE_MIN_SETTLE_WINDOW: uint64 = 300
export const INFERENCE_MAX_SETTLE_WINDOW: uint64 = 7 * 86_400

/**
 * A provider's unbonding delay: at least 14 days, so a provider caught overcharging can still be
 * slashed after it starts to leave, and at most one year.
 */
export const INFERENCE_MIN_UNBOND_DELAY: uint64 = 14 * 86_400
export const INFERENCE_MAX_UNBOND_DELAY: uint64 = 365 * 86_400

/** Provider status. Pending providers wait for the admin while registration is closed. */
export const ProviderPending: uint64 = 0
export const ProviderActive: uint64 = 1
export const ProviderPaused: uint64 = 2
export const ProviderUnbonding: uint64 = 3
export const ProviderExited: uint64 = 4

/**
 * Storage deposits. Box MBR = 2_500 + 400 * (key bytes + value bytes); id-keyed boxes have a 1-byte
 * prefix and a uint64 id.
 */
/** Provider box: three addresses and four uint64s. */
export const INFERENCE_PROVIDER_MBR: uint64 = 2_500 + 400 * (9 + 32 * 3 + 8 * 4)
/** Attestation box: a uint64 kind, a 32-byte measurement and a 32-byte encryption key. */
export const INFERENCE_ATTESTATION_MBR: uint64 = 2_500 + 400 * (9 + 8 + 32 + 32)
/** Ticket box: the payer, the principal and nine uint64s. Refunded to whoever paid it when the ticket is settled or refunded. */
export const INFERENCE_TICKET_MBR: uint64 = 2_500 + 400 * (9 + 32 * 2 + 8 * 9)
/** Pool box: three addresses and five uint64s. */
export const INFERENCE_POOL_MBR: uint64 = 2_500 + 400 * (9 + 32 * 3 + 8 * 5)
/** Usage box: key (pool, subscriber, subscription id), value (last payment, used). Paid from the pool's credit. */
export const INFERENCE_USAGE_MBR: uint64 = 2_500 + 400 * (1 + 8 + 32 + 8 + 16)
/** Payment asset box: allowed flag and accrued fees. */
export const INFERENCE_ASSET_MBR: uint64 = 2_500 + 400 * (9 + 8 + 8)
/** Metadata box, before the URI's own bytes (stored as is, without a length prefix). */
export const INFERENCE_METADATA_BASE_MBR: uint64 = 2_500 + 400 * 9
export const INFERENCE_METADATA_MAX_BYTES: uint64 = 512

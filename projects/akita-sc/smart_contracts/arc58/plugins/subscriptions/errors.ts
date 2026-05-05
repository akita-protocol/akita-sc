/**
 * ARC-65 short error codes for the SubscriptionsPlugin (arc58) contract.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * Constant NAMES are preserved from the pre-ARC-65 layout so call sites don't
 * change. Codes shared with the main subscriptions contracts are re-exported
 * from `smart_contracts/subscriptions/errors.ts` so any translator can decode
 * errors bubbling up from either layer.
 */

// --- Shared codes mirrored for ergonomic imports ---------------------------

// PuyaTs doesn't support `export { X } from` re-export syntax, so the
// constants are redeclared here with the same values as the subscriptions
// contract and the utils errors layer.
export const ERR_BAD_DESCRIPTION_LENGTH = 'BDLN'
export const ERR_INVALID_CALL_ORDER = 'ICOR'

// --- Plugin-specific codes -------------------------------------------------

export const ERR_DESCRIPTION_NOT_INITIALIZED = 'DNIT'

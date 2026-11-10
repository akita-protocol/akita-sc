/**
 * ARC-65 short error codes for the SubscriptionsPlugin (arc58) contract.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * Constant names and values use camelCase. The `err` prefix avoids 8-byte logs. Codes shared with the main subscriptions contracts are re-exported
 * from `smart_contracts/subscriptions/errors.ts` so any translator can decode
 * errors bubbling up from either layer.
 */

// --- Shared codes mirrored for ergonomic imports ---------------------------

// PuyaTs doesn't support `export { X } from` re-export syntax, so the
// constants are redeclared here with the same values as the subscriptions
// contract and the utils errors layer.
export const errBadDescriptionLength = 'errBdln'
export const errInvalidCallOrder = 'errIcor'

// --- Plugin-specific codes -------------------------------------------------

export const errDescriptionNotInitialized = 'errDnit'

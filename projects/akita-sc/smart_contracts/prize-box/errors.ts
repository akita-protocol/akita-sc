/**
 * ARC-65 short error codes for the PrizeBox contracts.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * The human-readable mapping lives in `akita-sdk/src/prize-box/errors.ts` —
 * keep the two files in sync when adding or changing a code. Constant names and values use
 * camelCase. Logged values use an `err` prefix to avoid 8-byte ARC-65 messages.
 */

// Mirror common codes used by prize-box so domain call sites keep their
// previous names but share the wire format with the top-level `errors.ts`.
// PuyaTs doesn't support `export { X } from` re-export syntax, so the
// constants are redeclared here with identical values.
export const errInvalidAsset = 'errIast'
export const errInvalidPayment = 'errIpay'
export const errAlreadyOptedIn = 'errAopt'

// --- PrizeBox ownership / lifecycle ----------------------------------------

export const errNotOwner = 'errNown'
export const errNotEmpty = 'errNemt'
/** Clawback-enabled assets cannot be put in a prize box (contents must be unseizable) */
export const errClawbackAsset = 'errClwa'
export const errMustBeCalledFromFactory = 'errMbff'

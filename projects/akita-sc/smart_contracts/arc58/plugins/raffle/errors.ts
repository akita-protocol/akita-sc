/**
 * ARC-65 short error codes for the RafflePlugin (arc58) contract.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * Constant names and values use camelCase. The `err` prefix avoids 8-byte logs. Codes shared with the main raffle contracts are re-exported from
 * `smart_contracts/raffle/errors.ts` so any translator can decode errors
 * bubbling up from either layer.
 */

// --- Shared codes mirrored for ergonomic imports ---------------------------

// PuyaTs doesn't support `export { X } from` re-export syntax, so the
// constants are redeclared here with the same values as the main raffle
// contracts.
export const errMustBeCalledFromFactory = 'errMbff'
export const errInvalidPayment = 'errIpay'
export const errInvalidTransfer = 'errIxfr'
export const errInvalidAsset = 'errIast'
export const errFailedGate = 'errFgte'

// --- Plugin-specific codes -------------------------------------------------

export const errNotEnoughAsset = 'errNena'
export const errCreatorNotRaffleFactory = 'errCnrf'

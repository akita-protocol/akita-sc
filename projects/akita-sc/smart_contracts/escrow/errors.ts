/**
 * ARC-65 short error codes for the Escrow contracts.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * The human-readable mapping lives in `akita-sdk/src/escrow/errors.ts` —
 * keep the two files in sync when adding or changing a code. Constant names and values use
 * camelCase. Logged values use an `err` prefix to avoid 8-byte ARC-65 messages.
 *
 * Several codes here (`errOccr`, `errOapp`, `errOwop`, `errOfcd`) intentionally match the
 * codes in `arc58/account/errors.ts` so cross-contract errors round-trip
 * through any translator.
 */

// Mirror common codes used by escrow so domain call sites keep their previous
// names but share the wire format with the top-level `errors.ts`. PuyaTs
// doesn't support `export { X } from` re-export syntax, so the constants are
// redeclared here with identical values.
export const errForbidden = 'errForb'
export const errInvalidApp = 'errIapp'
export const errInvalidPayment = 'errIpay'

// --- Escrow lifecycle -------------------------------------------------------

export const errOnlyCreatorCanRekey = 'errOccr'
export const errOnlyApps = 'errOapp'
export const errOnlyWalletOrPlugin = 'errOwop'
export const errOnlyFactoryCanDelete = 'errOfcd'

// --- Registry ---------------------------------------------------------------

export const errDoesntExist = 'errNreg'
export const errAlreadyRegistered = 'errEreg'
export const errInvalidCreator = 'errIcre'
export const errAccountNotFound = 'errNact'

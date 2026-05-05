/**
 * ARC-65 short error codes for the Escrow contracts.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * The human-readable mapping lives in `akita-sdk/src/escrow/errors.ts` —
 * keep the two files in sync when adding or changing a code. Constant NAMES
 * are preserved from the pre-ARC-65 layout so call sites don't change.
 *
 * Several codes here (`OCCR`, `OAPP`, `OWOP`, `OFCD`) intentionally match the
 * codes in `arc58/account/errors.ts` so cross-contract errors round-trip
 * through any translator.
 */

// Mirror common codes used by escrow so domain call sites keep their previous
// names but share the wire format with the top-level `errors.ts`. PuyaTs
// doesn't support `export { X } from` re-export syntax, so the constants are
// redeclared here with identical values.
export const ERR_FORBIDDEN = 'FORB'
export const ERR_INVALID_APP = 'IAPP'
export const ERR_INVALID_PAYMENT = 'IPAY'

// --- Escrow lifecycle -------------------------------------------------------

export const ERR_ONLY_CREATOR_CAN_REKEY = 'OCCR'
export const ERR_ONLY_APPS = 'OAPP'
export const ERR_ONLY_WALLET_OR_PLUGIN = 'OWOP'
export const ERR_ONLY_FACTORY_CAN_DELETE = 'OFCD'

// --- Registry ---------------------------------------------------------------

export const ERR_DOESNT_EXIST = 'NREG'
export const ERR_ALREADY_REGISTERED = 'EREG'
export const ERR_INVALID_CREATOR = 'ICRE'
export const ERR_ACCOUNT_NOT_FOUND = 'NACT'

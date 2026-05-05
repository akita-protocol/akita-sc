/**
 * ARC-65 short error codes for the PrizeBox contracts.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * The human-readable mapping lives in `akita-sdk/src/prize-box/errors.ts` —
 * keep the two files in sync when adding or changing a code. Constant NAMES
 * are preserved from the pre-ARC-65 layout so call sites don't change.
 */

// Mirror common codes used by prize-box so domain call sites keep their
// previous names but share the wire format with the top-level `errors.ts`.
// PuyaTs doesn't support `export { X } from` re-export syntax, so the
// constants are redeclared here with identical values.
export const ERR_INVALID_ASSET = 'IAST'
export const ERR_INVALID_PAYMENT = 'IPAY'
export const ERR_ALREADY_OPTED_IN = 'AOPT'

// --- PrizeBox ownership / lifecycle ----------------------------------------

export const ERR_NOT_OWNER = 'NOWN'
export const ERR_NOT_EMPTY = 'NEMT'

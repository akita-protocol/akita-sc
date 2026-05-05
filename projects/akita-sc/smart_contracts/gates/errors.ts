/**
 * ARC-65 short error codes for the Gate contract + sub-gates.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * The human-readable mapping lives in `akita-sdk/src/gates/errors.ts` —
 * keep the two files in sync when adding or changing a code. Constant NAMES
 * are preserved from the pre-ARC-65 layout so call sites don't change.
 */

// Mirror common codes used by gates so domain call sites keep their previous
// names but share the wire format with the top-level `errors.ts`. PuyaTs
// doesn't support `export { X } from` re-export syntax, so the constants are
// redeclared here with identical values. `ERR_GATE_FAILED` is the gates-layer
// alias of the top-level `ERR_FAILED_GATE` (same `FGTE` code).
export const ERR_GATE_FAILED = 'FGTE'
export const ERR_INVALID_PAYMENT = 'IPAY'
export const ERR_NOT_AKITA_DAO = 'NDAO'

// --- Gate registry lifecycle ------------------------------------------------

export const ERR_INVALID_ARG_COUNT = 'IARG'
export const ERR_INVALID_REGISTRY_ARG = 'IRGA'
export const ERR_APP_ALREADY_EXISTS = 'EAPP'
export const ERR_BAD_OPERATION = 'BOPR'

// --- Filter / evaluation ---------------------------------------------------

export const ERR_GATE_NOT_FOUND = 'NGAT'
export const ERR_INVALID_LAYER = 'ILYR'

// --- Sub-gate specific -----------------------------------------------------

export const ERR_INVALID_WALLET_ID = 'IWID'

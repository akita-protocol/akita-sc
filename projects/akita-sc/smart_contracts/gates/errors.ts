/**
 * ARC-65 short error codes for the Gate contract + sub-gates.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * The human-readable mapping lives in `akita-sdk/src/gates/errors.ts` —
 * keep the two files in sync when adding or changing a code. Constant names and values use
 * camelCase. Logged values use an `err` prefix to avoid 8-byte ARC-65 messages.
 */

// Mirror common codes used by gates so domain call sites keep their previous
// names but share the wire format with the top-level `errors.ts`. PuyaTs
// doesn't support `export { X } from` re-export syntax, so the constants are
// redeclared here with identical values. `errGateFailed` is the gates-layer
// alias of the top-level `errFailedGate` (same `errFgte` code).
export const errGateFailed = 'errFgte'
export const errInvalidPayment = 'errIpay'
export const errNotAkitaDao = 'errNdao'

// --- Gate registry lifecycle ------------------------------------------------

export const errInvalidArgCount = 'errIarg'
export const errInvalidRegistryArg = 'errIrga'
export const errAppAlreadyExists = 'errEapp'
export const errBadOperation = 'errBopr'

// --- Filter / evaluation ---------------------------------------------------

export const errGateNotFound = 'errNgat'
export const errInvalidLayer = 'errIlyr'

// --- Sub-gate specific -----------------------------------------------------

export const errInvalidWalletId = 'errIwid'

// --- Gate v2 (audit SG-06 / SG-16 / SG-A) -----------------------------------

/** Filter references a sub-gate app that is not on the Gate's allowlist. */
export const errInvalidSubGate = 'errIsgt'
/** A sub-gate quoted a registration cost above `MAX_SUB_GATE_COST`. */
export const errSubGateCostTooHigh = 'errScst'
/** Legacy gate imports are sealed (or the caller is not the migrator). */
export const errImportsClosed = 'errIcls'
/** Gate id outside the allowed range for this operation. */
export const errInvalidGateID = 'errIgid'

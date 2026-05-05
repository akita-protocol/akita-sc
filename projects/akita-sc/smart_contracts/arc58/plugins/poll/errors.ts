/**
 * ARC-65 short error codes for the PollPlugin (arc58) contract.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * Constant NAMES are preserved from the pre-ARC-65 layout so call sites don't
 * change. Where a name matches one used by the main poll contracts
 * (`smart_contracts/poll/errors.ts`), the SAME short code is used here so the
 * same translator can decode errors bubbling up from either layer.
 *
 * The human-readable mapping is shared with the main poll contracts via
 * `akita-sdk/src/poll/errors.ts` — no new SDK file is required.
 */

// Mirror shared codes so plugin call sites keep their previous names but share
// the wire format with the top-level `errors.ts`. PuyaTs doesn't support
// `export { X } from` re-export syntax, so the constant is redeclared here
// with an identical value.
export const ERR_INVALID_PAYMENT = 'IPAY'

// --- Plugin-specific codes --------------------------------------------------

export const ERR_CREATOR_NOT_POLL_FACTORY = 'NPLF'

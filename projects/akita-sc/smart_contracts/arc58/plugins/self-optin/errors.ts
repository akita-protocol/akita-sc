/**
 * ARC-65 short error codes for the SelfOptInPlugin (arc58) contract.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * The human-readable mapping is shared via `akita-sdk/src/errors.ts` — no new
 * SDK file is required for this plugin.
 */

// Mirror shared codes so plugin call sites keep their previous names but share
// the wire format with the top-level `errors.ts`. PuyaTs doesn't support
// `export { X } from` re-export syntax, so the constant is redeclared here
// with an identical value.
export const ERR_ALREADY_OPTED_IN = 'AOPT'

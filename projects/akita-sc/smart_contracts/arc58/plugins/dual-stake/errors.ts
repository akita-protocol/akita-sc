/**
 * ARC-65 short error codes for the DualStakePlugin (arc58) contract.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * Constant names and values use camelCase. The `err` prefix avoids 8-byte logs. The human-readable mapping lives alongside the shared SDK translator
 * via `akita-sdk/src/wallet/errors.ts`.
 */

// --- Dual stake validation -------------------------------------------------

export const errNotADualstakeApp = 'errNdsa'
export const errNotEnoughOfAsa = 'errNeoa'

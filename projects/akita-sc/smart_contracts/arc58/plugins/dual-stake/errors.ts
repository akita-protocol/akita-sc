/**
 * ARC-65 short error codes for the DualStakePlugin (arc58) contract.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * Constant NAMES are preserved from the pre-ARC-65 layout so call sites don't
 * change. The human-readable mapping lives alongside the shared SDK translator
 * via `akita-sdk/src/wallet/errors.ts`.
 */

// --- Dual stake validation -------------------------------------------------

export const ERR_NOT_A_DUALSTAKE_APP = 'NDSA'
export const ERR_NOT_ENOUGH_OF_ASA = 'NEOA'

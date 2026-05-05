/**
 * ARC-65 short error codes for the StakingPoolPlugin (arc58) contract.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * Constant NAMES are preserved from the pre-ARC-65 layout so call sites don't
 * change. Plugin-specific codes have no equivalent in the main staking-pool
 * domain; they still round-trip through the common translator via the shared
 * error table.
 */

// --- Plugin-specific codes -------------------------------------------------

export const ERR_NOT_A_VALID_POOL = 'NVPL'

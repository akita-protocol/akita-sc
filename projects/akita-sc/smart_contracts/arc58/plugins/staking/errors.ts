/**
 * ARC-65 short error codes for the StakingPlugin (arc58) contract.
 * Logged as `ERR:{code}` by `loggedAssert`.
 */

/** A batch method was called with no entries (it would never rekey back). */
export const errEmptyBatch = 'errEbat'

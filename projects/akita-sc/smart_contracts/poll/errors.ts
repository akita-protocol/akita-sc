/**
 * ARC-65 short error codes for the Poll contracts.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * The human-readable mapping lives in `akita-sdk/src/poll/errors.ts` — keep
 * the two files in sync when adding or changing a code. Constant NAMES are
 * preserved from the pre-ARC-65 layout so call sites don't change.
 */

// Mirror common codes used by poll so domain call sites keep their previous
// names but share the wire format with the top-level `errors.ts`. PuyaTs
// doesn't support `export { X } from` re-export syntax, so the constants are
// redeclared here with identical values.
export const ERR_BAD_DEPLOYER = 'BDEP'
export const ERR_INVALID_PAYMENT = 'IPAY'
export const ERR_PLUGIN_NOT_AUTH_ADDR = 'NATH'
export const ERR_FAILED_GATE = 'FGTE'

// --- Poll configuration -----------------------------------------------------

export const ERR_INVALID_END_TIME = 'IETM'
export const ERR_INVALID_POLL_TYPE = 'IPTY'
export const ERR_INVALID_OPTION_COUNT = 'IOPC'
export const ERR_INVALID_MAX_SELECTION = 'IMXS'

// --- Poll lifecycle ---------------------------------------------------------

export const ERR_POLL_ENDED = 'PEND'
export const ERR_POLL_ACTIVE = 'PACT'

// --- Voting -----------------------------------------------------------------

export const ERR_ALREADY_VOTED = 'AVOT'
export const ERR_INVALID_VOTE = 'IVOT'
export const ERR_INVALID_VOTE_COUNT = 'IVCT'
export const ERR_INVALID_VOTE_OPTION = 'IVOP'
export const ERR_NOT_VOTED = 'NVOT'

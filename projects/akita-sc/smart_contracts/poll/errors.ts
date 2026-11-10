/**
 * ARC-65 short error codes for the Poll contracts.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * The human-readable mapping lives in `akita-sdk/src/poll/errors.ts` — keep
 * the two files in sync when adding or changing a code. Constant names and values use
 * camelCase. Logged values use an `err` prefix to avoid 8-byte ARC-65 messages.
 */

// Mirror common codes used by poll so domain call sites keep their previous
// names but share the wire format with the top-level `errors.ts`. PuyaTs
// doesn't support `export { X } from` re-export syntax, so the constants are
// redeclared here with identical values.
export const errBadDeployer = 'errBdep'
export const errInvalidPayment = 'errIpay'
export const errPluginNotAuthAddr = 'errNath'
export const errFailedGate = 'errFgte'
export const errNotCreator = 'errNcre'

// --- Poll configuration -----------------------------------------------------

export const errInvalidEndTime = 'errIetm'
export const errInvalidPollType = 'errIpty'
export const errInvalidOptionCount = 'errIopc'
export const errInvalidMaxSelection = 'errImxs'

// --- Poll lifecycle ---------------------------------------------------------

export const errPollEnded = 'errPend'
export const errPollActive = 'errPact'
export const errNotAPoll = 'errNapl'
export const errStillHasVoteBoxes = 'errShvb'
export const errMustBeCalledFromFactory = 'errMcff'

// --- Voting -----------------------------------------------------------------

export const errAlreadyVoted = 'errAvot'
export const errInvalidVote = 'errIvot'
export const errInvalidVoteCount = 'errIvct'
export const errInvalidVoteOption = 'errIvop'
export const errNotVoted = 'errNvot'

/**
 * ARC-65 short error codes for the Auction contracts.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * The human-readable mapping lives in `akita-sdk/src/auction/errors.ts` —
 * keep the two files in sync when adding or changing a code. Constant NAMES
 * are preserved from the pre-ARC-65 layout so call sites don't change.
 */

// Mirror common codes used by auction so domain call sites keep their
// previous names but share the wire format with the top-level `errors.ts`.
// PuyaTs doesn't support `export { X } from` re-export syntax, so the
// constants are redeclared here with identical values.
export const ERR_MUST_BE_CALLED_FROM_FACTORY = 'MBFF'
export const ERR_INVALID_PAYMENT = 'IPAY'
export const ERR_INVALID_TRANSFER = 'IXFR'
export const ERR_INVALID_ASSET = 'IAST'
export const ERR_INVALID_APP = 'IAPP'
export const ERR_FAILED_GATE = 'FGTE'
export const ERR_NOT_OPTED_IN = 'NOPT'

// --- Factory setup validation ----------------------------------------------

export const ERR_BIDS_MUST_ALWAYS_INCREASE = 'BINC'
export const ERR_MARKETPLACE_NOT_OPTED_INTO_PAYMENT_ASSET = 'MNOP'
export const ERR_END_MUST_BE_ATLEAST_FIVE_MINUTES_AFTER_START = 'EMFM'
export const ERR_APP_CREATOR_NOT_FOUND = 'ACNF'
export const ERR_NOT_AN_AUCTION = 'NAUC'

// --- Auction setup ---------------------------------------------------------

export const ERR_NOT_APPLICABLE_TO_THIS_AUCTION = 'NAPP'
export const ERR_MUST_ALLOCATE_AT_LEAST_THREE_HIGHEST_BIDS_CHUNKS = 'M3HB'

// --- Auction lifecycle -----------------------------------------------------

export const ERR_AUCTION_NOT_LIVE = 'ANLV'
export const ERR_AUCTION_HAS_NOT_ENDED = 'AHNE'
export const ERR_AUCTION_ALREADY_STARTED = 'AAST'
export const ERR_NOT_ENOUGH_TIME = 'NETM'

// --- Prize claim -----------------------------------------------------------

export const ERR_PRIZE_ALREADY_CLAIMED = 'PACL'
export const ERR_PRIZE_NOT_CLAIMED = 'PZNC'

// --- Highest bid gathering -------------------------------------------------

export const ERR_HIGHEST_BIDS_ALREADY_GATHERED = 'HBAG'
export const ERR_HIGHEST_BIDS_NOT_GATHERED = 'HBNG'

// --- Bids ------------------------------------------------------------------

export const ERR_CANNOT_REFUND_MOST_RECENT_BID = 'CRMR'
export const ERR_BID_NOT_FOUND = 'BNFD'
export const ERR_BID_ALREADY_EXISTS = 'BEXS'
export const ERR_BID_ALREADY_REFUNDED = 'BARF'
export const ERR_TOO_MANY_PARTICIPANTS = 'TMPT'

// --- Raffle winner ---------------------------------------------------------

export const ERR_WINNER_ALREADY_DRAWN = 'WADR'
export const ERR_WINNING_NUMBER_NOT_FOUND = 'WNNF'
export const ERR_WINNER_ALREADY_FOUND = 'WAFD'
export const ERR_WINNER_NOT_FOUND = 'WNFD'
export const ERR_RAFFLE_NOT_PRIZE_CLAIMED = 'RNPC'
export const ERR_RAFFLE_ALREADY_PRIZE_CLAIMED = 'RAPC'
export const ERR_RAFFLE_WINNER_NOT_FOUND = 'RWNF'
export const ERR_RAFFLE_WINNER_HAS_NOT_CLAIMED = 'RWHC'

// --- Refunds / cleanup -----------------------------------------------------

export const ERR_ALL_REFUNDS_COMPLETE = 'ARFC'
export const ERR_NOT_ALL_REFUNDS_COMPLETE = 'NARC'
export const ERR_STILL_HAS_HIGHEST_BIDS_BOXES = 'SHBB'

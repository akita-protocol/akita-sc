/**
 * ARC-65 short error codes for the Raffle contract.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * The human-readable mapping lives in `akita-sdk/src/raffle/errors.ts` —
 * keep the two files in sync when adding or changing a code. Constant NAMES
 * are preserved from the pre-ARC-65 layout so call sites don't change.
 */

// Mirror common codes used by raffle so domain call sites keep their previous
// names but share the wire format with the top-level `errors.ts`. PuyaTs
// doesn't support `export { X } from` re-export syntax, so the constants are
// redeclared here with identical values.
export const ERR_MUST_BE_CALLED_FROM_FACTORY = 'MBFF'
export const ERR_INVALID_PAYMENT = 'IPAY'
export const ERR_INVALID_TRANSFER = 'IXFR'
export const ERR_INVALID_ASSET = 'IAST'
export const ERR_FAILED_GATE = 'FGTE'

// --- Raffle lifecycle -------------------------------------------------------

export const ERR_INVALID_ENDING_ROUND = 'IENR'
export const ERR_NOT_LIVE = 'NLIV'
export const ERR_RAFFLE_HAS_NOT_ENDED = 'RHNE'
export const ERR_NOT_ENDED = 'NEND'
export const ERR_NOT_ENOUGH_TIME = 'NETM'

// --- Ticket asset / amounts -------------------------------------------------

export const ERR_TICKET_ASSET_NOT_ALGO = 'TANA'
export const ERR_TICKET_ASSET_ALGO = 'TAAL'
export const ERR_BELOW_MIN = 'BMIN'
export const ERR_ABOVE_MAX = 'AMAX'
export const ERR_INVALID_RECEIVER = 'IRCV'
export const ERR_INVALID_MBR_AMOUNT = 'IMBA'
export const ERR_INVALID_MBR_RECIPIENT = 'IMBR'

// --- Gate / method enforcement ---------------------------------------------

export const ERR_BAD_METHOD_GATE_NEEDED = 'BMGN'

// --- Entries ----------------------------------------------------------------

export const ERR_ALREADY_ENTERED = 'AENT'
export const ERR_ENTRY_DOES_NOT_EXIST = 'EDNE'

// --- Winner / draw ----------------------------------------------------------

export const ERR_FAILED_TO_GET_SEED = 'FTGS'
export const ERR_WINNER_ALREADY_FOUND = 'WAFD'
export const ERR_WINNER_ALREADY_DRAWN = 'WADR'
export const ERR_WINNER_NOT_FOUND = 'WNFD'
export const ERR_NO_WINNING_TICKET_YET = 'NWTY'

// --- Prize / refunds --------------------------------------------------------

export const ERR_PRIZE_ALREADY_CLAIMED = 'PACL'
export const ERR_PRIZE_NOT_CLAIMED = 'PNCL'
export const ERR_ALL_REFUNDS_COMPLETE = 'ARFC'
export const ERR_REFUNDS_NOT_COMPLETE = 'RFNC'
export const ERR_TICKETS_NOT_RECLAIMED = 'TNRC'
export const ERR_BOXES_ARENT_CLEARED = 'BNCL'
export const ERR_STILL_HAS_WEIGHTS_BOXES = 'SHWB'

// --- Weights allocation -----------------------------------------------------

export const ERR_MUST_ALLOCATE_AT_LEAST_FOUR_HIGHEST_BIDS_CHUNKS = 'MALF'
export const ERR_MUST_ALLOCATE_AT_MOST_FIFTEEN_HIGHEST_BIDS_CHUNKS = 'MAMF'

// --- Factory / misc ---------------------------------------------------------

export const MARKETPLACE_NOT_OPTED_INTO_TICKET_ASSET = 'MNOT'
export const APP_CREATOR_NOT_FOUND = 'ACNF'
export const ERR_APP_CREATOR_NOT_FOUND = 'ACNF'
export const ERR_NOT_A_RAFFLE = 'NRAF'

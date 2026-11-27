/**
 * ARC-65 short error codes for the Raffle contract.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * The human-readable mapping lives in `akita-sdk/src/raffle/errors.ts` —
 * keep the two files in sync when adding or changing a code. Constant names and values use
 * camelCase. Logged values use an `err` prefix to avoid 8-byte ARC-65 messages.
 */

// Mirror common codes used by raffle so domain call sites keep their previous
// names but share the wire format with the top-level `errors.ts`. PuyaTs
// doesn't support `export { X } from` re-export syntax, so the constants are
// redeclared here with identical values.
export const errMustBeCalledFromFactory = 'errMbff'
export const errInvalidPayment = 'errIpay'
export const errInvalidTransfer = 'errIxfr'
export const errInvalidAsset = 'errIast'
export const errFailedGate = 'errFgte'

// --- Raffle lifecycle -------------------------------------------------------

export const errInvalidEndingRound = 'errIenr'
export const errNotLive = 'errNliv'
export const errRaffleHasNotEnded = 'errRhne'
export const errNotEnded = 'errNend'
export const errNotEnoughTime = 'errNetm'

// --- Ticket asset / amounts -------------------------------------------------

export const errTicketAssetNotAlgo = 'errTana'
export const errTicketAssetAlgo = 'errTaal'
export const errBelowMin = 'errBmin'
export const errAboveMax = 'errAmax'
export const errInvalidReceiver = 'errIrcv'
export const errInvalidMbrAmount = 'errImba'
export const errInvalidMbrRecipient = 'errImbr'

// --- Gate / method enforcement ---------------------------------------------

export const errBadMethodGateNeeded = 'errBmgn'

// --- Entries ----------------------------------------------------------------

export const errAlreadyEntered = 'errAent'
export const errEntryDoesNotExist = 'errEdne'

// --- Winner / draw ----------------------------------------------------------

export const errFailedToGetSeed = 'errFtgs'
export const errWinnerAlreadyFound = 'errWafd'
export const errWinnerAlreadyDrawn = 'errWadr'
export const errWinnerNotFound = 'errWnfd'
export const errNoWinningTicketYet = 'errNwty'

// --- Prize / refunds --------------------------------------------------------

export const errPrizeAlreadyClaimed = 'errPacl'
export const errPrizeNotClaimed = 'errPncl'
export const errAllRefundsComplete = 'errArfc'
export const errRefundsNotComplete = 'errRfnc'
export const errTicketsNotReclaimed = 'errTnrc'
export const errBoxesArentCleared = 'errBncl'
export const errStillHasWeightsBoxes = 'errShwb'

// --- Weights allocation -----------------------------------------------------

/** no longer raised: weights boxes are not reserved at creation (kept for children created before) */
export const errMustAllocateAtLeastFourHighestBidsChunks = 'errMalf'
/** no longer raised: weights boxes are not reserved at creation (kept for children created before) */
export const errMustAllocateAtMostFifteenHighestBidsChunks = 'errMamf'
/** the totals box is full: 4096 weights boxes of 4096 entries each */
export const errRaffleFull = 'errRful'

// --- Factory / misc ---------------------------------------------------------

export const MARKETPLACE_NOT_OPTED_INTO_TICKET_ASSET = 'MNOT'
export const APP_CREATOR_NOT_FOUND = 'errAcnf'
export const errAppCreatorNotFound = 'errAcnf'
export const errNotARaffle = 'errNraf'

// --- Audit 2026-10 fixes ----------------------------------------------------

export const errInvalidTicketBounds = 'errItbd'
export const errPrizeIsTicketAsset = 'errPita'
export const errNotOptedIn = 'errNopt'
export const errNotSeller = 'errNslr'
/** prize ASAs with a clawback or freeze address could be seized or frozen after entries arrive */
export const errPrizeSeizable = 'errPszb'
/** the committed beacon round has no value yet; the commitment stands until BEACON_MAX_WAIT_ROUNDS */
export const errBeaconNotReady = 'errBnrd'

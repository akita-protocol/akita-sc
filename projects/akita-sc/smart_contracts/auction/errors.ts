/**
 * ARC-65 short error codes for the Auction contracts.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * The human-readable mapping lives in `akita-sdk/src/auction/errors.ts` —
 * keep the two files in sync when adding or changing a code. Constant names and values use
 * camelCase. Logged values use an `err` prefix to avoid 8-byte ARC-65 messages.
 */

// Mirror common codes used by auction so domain call sites keep their
// previous names but share the wire format with the top-level `errors.ts`.
// PuyaTs doesn't support `export { X } from` re-export syntax, so the
// constants are redeclared here with identical values.
export const errMustBeCalledFromFactory = 'errMbff'
export const errInvalidPayment = 'errIpay'
export const errInvalidTransfer = 'errIxfr'
export const errInvalidAsset = 'errIast'
export const errInvalidApp = 'errIapp'
export const errFailedGate = 'errFgte'
export const errNotOptedIn = 'errNopt'

// --- Factory setup validation ----------------------------------------------

export const errBidsMustAlwaysIncrease = 'errBinc'
export const errMarketplaceNotOptedIntoPaymentAsset = 'errMnop'
export const errEndMustBeAtleastFiveMinutesAfterStart = 'errEmfm'
export const errAppCreatorNotFound = 'errAcnf'
export const errNotAnAuction = 'errNauc'

// --- Auction setup ---------------------------------------------------------

export const errNotApplicableToThisAuction = 'errNapp'
export const errMustAllocateAtLeastThreeHighestBidsChunks = 'errM3hb'

// --- Auction lifecycle -----------------------------------------------------

export const errAuctionNotLive = 'errAnlv'
export const errAuctionHasNotEnded = 'errAhne'
export const errAuctionAlreadyStarted = 'errAast'
export const errNotEnoughTime = 'errNetm'

// --- Prize claim -----------------------------------------------------------

export const errPrizeAlreadyClaimed = 'errPacl'
export const errPrizeNotClaimed = 'errPznc'

// --- Highest bid gathering -------------------------------------------------

export const errHighestBidsAlreadyGathered = 'errHbag'
export const errHighestBidsNotGathered = 'errHbng'

// --- Bids ------------------------------------------------------------------

export const errCannotRefundMostRecentBid = 'errCrmr'
export const errBidNotFound = 'errBnfd'
export const errBidAlreadyExists = 'errBexs'
export const errBidAlreadyRefunded = 'errBarf'
export const errTooManyParticipants = 'errTmpt'

// --- Raffle winner ---------------------------------------------------------

export const errWinnerAlreadyDrawn = 'errWadr'
export const errWinningNumberNotFound = 'errWnnf'
export const errWinnerAlreadyFound = 'errWafd'
export const errWinnerNotFound = 'errWnfd'
export const errRaffleNotPrizeClaimed = 'errRnpc'
export const errRaffleAlreadyPrizeClaimed = 'errRapc'
export const errRaffleWinnerNotFound = 'errRwnf'
export const errRaffleWinnerHasNotClaimed = 'errRwhc'

// --- Refunds / cleanup -----------------------------------------------------

export const errAllRefundsComplete = 'errArfc'
export const errNotAllRefundsComplete = 'errNarc'
export const errStillHasHighestBidsBoxes = 'errShbb'

// --- Audit 2026-10 fixes ----------------------------------------------------

export const errCannotOutbidSelf = 'errCobs'
export const errStartingBidRequired = 'errSbrq'
export const errTooManyWeightsBoxes = 'errTmwb'
export const errPrizeIsBidAsset = 'errPiba'
/** prize ASAs with a clawback or freeze address could be seized or frozen after bids arrive */
export const errPrizeSeizable = 'errPszb'
/** weights boxes only exist for fee auctions (they hold the loser-raffle weights) */
export const errWeightsNeedBidFee = 'errWnbf'
/** the committed beacon round has no value yet; the commitment stands until BEACON_MAX_WAIT_ROUNDS */
export const errBeaconNotReady = 'errBnrd'

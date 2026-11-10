/**
 * ARC-65 short error codes for the StakingPool contracts.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * The human-readable mapping lives in `akita-sdk/src/staking-pool/errors.ts` —
 * keep the two files in sync when adding or changing a code. Constant names and values use
 * camelCase. Logged values use an `err` prefix to avoid 8-byte ARC-65 messages.
 */

// Mirror common codes used by staking-pool so domain call sites keep their
// previous names but share the wire format with the top-level `errors.ts`.
// PuyaTs doesn't support `export { X } from` re-export syntax, so the
// constants are redeclared here with identical values.
export const errFailedGate = 'errFgte'
export const errForbidden = 'errForb'
export const errInvalidPayment = 'errIpay'
export const errInvalidTransfer = 'errIxfr'
export const errNotCreator = 'errNcre'

// --- Reward validation ------------------------------------------------------

export const errStakeKeyRequired = 'errSkyr'
export const errRateMustBeGreaterThanZero = 'errRmgz'
export const errRateMustBeGreaterThanWinnerCount = 'errRmgw'
export const errMaxEntriesCannotBeGreaterThanRate = 'errMegr'

// --- Disbursement state -----------------------------------------------------

export const errNotEnoughFunds = 'errNefd'
export const errNotReadyToDisburse = 'errNrtd'
export const errInvalidDisbursementPhase = 'errIdph'
export const errWinningTicketsAlreadyExist = 'errWtae'
export const errInvalidPoolTypeForCheck = 'errIptc'
export const errDisbursementNotReadyForFinalization = 'errDnrf'
export const errRewardNotFound = 'errRnfd'
export const errRewardAlreadyInDisbursement = 'errRaid'
export const errDistributionWindowNotOpen = 'errDwno'
export const errUnknownRewardRateType = 'errUrrt'

// --- Pool lifecycle ---------------------------------------------------------

export const errPoolMustBeDraft = 'errPmbd'
export const errPoolNotDraftOrEnded = 'errPnde'
export const errPoolNotLive = 'errPnlv'
export const errSignupsNotOpen = 'errSuno'
export const errPoolMaxEntriesReached = 'errPmer'
export const errFactoryOnlyInit = 'errFoin'
export const errFactoryOnlyDelete = 'errFode'
export const errCreatorOnlyDelete = 'errCode'
export const errCreatorOnlyFinalize = 'errCofz'

// --- Finalize timestamps ----------------------------------------------------

export const errInvalidSignupTimestamp = 'errIsut'
export const errInvalidStartTimestamp = 'errIstt'
export const errInvalidStartZeroRequiresLate = 'errIszl'
export const errInvalidEndTimestamp = 'errIett'

// --- Asset / opt-in ---------------------------------------------------------

export const errNotAlgo = 'errNalg'
export const errMustBeAsa = 'errMbas'
export const errDaoNotOptedIn = 'errDnoi'

// --- Entry validation -------------------------------------------------------

export const errQuantityBelowMinStake = 'errQbms'
export const errEntryAlreadyExists = 'errEexs'
export const errFailedStakeVerify = 'errFsvf'
export const errUserBalanceTooLow = 'errUblo'
export const errUserStakeTooLow = 'errUslo'

// --- Gate -------------------------------------------------------------------

export const errGateIdNotSet = 'errGins'
export const errGateIdSet = 'errGist'

// --- 2026-10 audit fixes ----------------------------------------------------

export const errNotAkitaDao = 'errNdao'
/** A reward round is open: entries, checks and removals are frozen until it closes (H-4). */
export const errRoundOpen = 'errRopn'
/** Reward budget too small for the round or the requested withdrawal (M-5). */
export const errRewardBudget = 'errRbud'
/** The pool must be in draft or past its end for this operation (M-5). */
export const errPoolNotEnded = 'errPnen'
/** Only the creator or the DAO wallet may abort a round (M-1). */
export const errAbortForbidden = 'errAbrt'
/** Typed pools need an asset merkle stake key (H-2). */
export const errTypedPoolNeedsStakeKey = 'errTyrq'
/** Staked quantity must be positive in a typed pool (H-2). */
export const errInvalidQuantity = 'errIqty'
/** Unknown pool staking type (L-3). */
export const errInvalidPoolType = 'errIvtp'
/** Reward interval must be positive and expiration at least one hour (L-1). */
export const errInvalidRewardTiming = 'errIrtm'
/** Shuffle cursor ran past the last entry without placing every ticket (H-6). */
export const errShuffleExhausted = 'errShfx'
/** Raffle only applies to shuffle rewards (H-6). */
export const errNotShuffle = 'errNshf'
/** Only the entrant may remove an entry before the pool ends (M-5). */
export const errNotEntrant = 'errNent'
/** Asset still has reward budgets assigned (M-5). */
export const errAssetCommitted = 'errAcmt'
/** No entry for that address and asset. */
export const errEntryNotFound = 'errEnfd'
/** SOFT stakes are not escrowed, so SOFT pools cannot weigh rewards by stake (STAKE-2). */
export const errSoftValueWeighted = 'errSvwt'
/** The committed beacon round has no value yet; the commitment stands until BEACON_MAX_WAIT_ROUNDS (TRADE-3). */
export const errBeaconNotReady = 'errBnrd'

/**
 * ARC-65 short error codes for the AkitaSocialPlugin (arc58) contract.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * Constant names and values use camelCase. The `err` prefix avoids 8-byte logs. Where a name matches one used by the main social contracts
 * (`smart_contracts/social/errors.ts`), the SAME short code is used here so
 * the same translator can decode errors bubbling up from either layer.
 *
 * The human-readable mapping is shared with the main social contracts via
 * `akita-sdk/src/social/errors.ts` — no new SDK file is required.
 */

// --- Shared top-level codes mirrored for ergonomic imports -----------------

// PuyaTs doesn't support `export { X } from` re-export syntax, so the
// constants are redeclared here with identical values to the top-level
// `smart_contracts/errors.ts`.
export const errNotAkitaDao = 'errNdao'
export const errForbidden = 'errForb'
export const errInvalidPayment = 'errIpay'
export const errPluginNotAuthAddr = 'errNath'
export const errFailedGate = 'errFgte'
export const errBlocked = 'errBlkd'
export const errInvalidAsset = 'errIast'
export const errInvalidApp = 'errIapp'
export const errAlreadyOptedIn = 'errAopt'
export const errNotOptedIn = 'errNopt'

// --- Moderation (match main social contracts) ------------------------------

export const errBanned = 'errBand'
export const errNotAModerator = 'errNmod'
export const errAlreadyAModerator = 'errEmod'
export const errAlreadyBanned = 'errEban'
export const errAlreadyFlagged = 'errEflg'
export const errAlreadyAnAction = 'errEact'

// --- Content (match main social contracts) ---------------------------------

export const errBadCid = 'errIcid'
export const errPostNotFound = 'errNpst'
export const errReplyNotFound = 'errNrpl'
export const errAlreadyVoted = 'errAvot'
export const errHaventVoted = 'errNvot'
export const errMetaDoesntExist = 'errNmta'
export const errMetaAlreadyExists = 'errEmta'
export const errNotYourPostToEdit = 'errNedt'
export const errIsAReply = 'errIsrp'
export const errNotAReply = 'errNarp'
export const errIsAlreadyAmended = 'errEamd'
export const errNoSelfVote = 'errSvot'
export const errAlreadyReacted = 'errArct'
export const errFeeTooSmall = 'errFtsm'

// --- Identity / assets (match main social contracts) -----------------------

export const errInvalidNfd = 'errInfd'
export const errNotAnNfd = 'errNnfd'
export const errUserDoesNotOwnNfd = 'errNonf'
export const errNfdChanged = 'errCnfd'
export const errNotAnAkitaNft = 'errNant'
export const errUserDoesNotOwnNft = 'errNont'
export const errNotASubscription = 'errNsub'
export const errAutomatedAccount = 'errAuto'

// --- Graph (match main social contracts) -----------------------------------

export const errWrongFollowerKey = 'errWflk'
export const errHasGate = 'errHgte'

// --- Plugin-specific codes (no equivalent in main social) ------------------

export const errNotDao = 'errNtdo'

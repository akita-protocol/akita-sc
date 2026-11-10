/**
 * ARC-65 short error codes for the AkitaSocial contracts.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * The human-readable mapping lives in `akita-sdk/src/social/errors.ts` — keep
 * the two files in sync when adding or changing a code. Constant names and values use
 * camelCase. Logged values use an `err` prefix to avoid 8-byte ARC-65 messages.
 *
 * Duplicates of shared/top-level errors are intentionally re-declared here
 * (rather than imported) so the social contracts can own short codes without
 * forcing a migration of the shared `utils/errors.ts`, top-level `errors.ts`,
 * `subscriptions/errors.ts`, or `arc58/plugins/optin/errors.ts`.
 */

// --- Top-level / shared aliases (social-scoped copies of shared errors) -----

export const errNotAkitaDao = 'errNdao'
export const errInvalidPayment = 'errIpay'
export const errInvalidTransfer = 'errIxfr'
export const errFailedGate = 'errFgte'

// --- Plugin aliases (social-scoped copy of optin plugin error) --------------

export const errAlreadyOptedIn = 'errAopt'

// --- Subscriptions alias (social-scoped copy of subscriptions error) --------

export const errUserNotBlocked = 'errUnbk'

// --- Moderation errors ------------------------------------------------------

export const errNotAModerator = 'errNmod'
export const errAlreadyAModerator = 'errEmod'
export const errAlreadyBanned = 'errEban'
export const errUserNotBanned = 'errNban'
export const errBanned = 'errBand'
export const errAlreadyAnAction = 'errEact'
export const errAlreadyFlagged = 'errEflg'
export const errNotFlagged = 'errNflg'

// --- Graph errors -----------------------------------------------------------

export const errBlocked = 'errBlkd'
export const errSelfFollow = 'errSflw'
export const errSelfBlock = 'errSblk'
export const errAlreadyFollowing = 'errAflw'
export const errNotFollowing = 'errNflw'
export const errWrongFollowerKey = 'errWflk'
export const errHasGate = 'errHgte'
export const errAutomatedAccount = 'errAuto'

// --- Main social errors -----------------------------------------------------

export const errInvalidPaywall = 'errIpwl'
export const errPaywallNotFound = 'errNpwl'
export const errBadCid = 'errIcid'
export const errPostNotFound = 'errNpst'
export const errPostExists = 'errEpst'
export const errReplyNotFound = 'errNrpl'
export const errAlreadyVoted = 'errAvot'
export const errHaventVoted = 'errNvot'
export const errMetaDoesntExist = 'errNmta'
export const errMetaAlreadyExists = 'errEmta'
export const errNotGraph = 'errNgrf'
export const errNotModeration = 'errNmdx'
export const errPluginNotAuthAddr = 'errNath'
export const errInvalidAsset = 'errIast'
export const errInvalidApp = 'errIapp'
export const errInvalidReplyType = 'errIrty'
export const errNotYourPostToEdit = 'errNedt'
export const errIsAReply = 'errIsrp'
export const errNotAReply = 'errNarp'
export const errIsAlreadyAmended = 'errEamd'
export const errNoSelfVote = 'errSvot'
export const errAlreadyReacted = 'errArct'
export const errFeeTooSmall = 'errFtsm'
export const errInvalidRefLength = 'errIrfl'
export const errTimestampTooOld = 'errTsol'
export const errRefTypeNotFound = 'errNrtp'
export const errUserDoesNotOwnNft = 'errNont'

// --- Impact errors ----------------------------------------------------------

export const errInvalidNfd = 'errInfd'
export const errNotAnNfd = 'errNnfd'
export const errUserDoesNotOwnNfd = 'errNonf'
export const errNfdChanged = 'errCnfd'
export const errNotAnAkitaNft = 'errNant'
export const errNotASubscription = 'errNsub'
export const errNotSocial = 'errNsoc'

// --- Remediation (2026-10 audit) -------------------------------------------

export const errLegacyRef = 'errLref'
export const errNotSelfMeta = 'errNsme'
export const errNotInitialized = 'errNini'
export const errAlreadyBlocked = 'errEblk'
export const errInvalidModifier = 'errImod'

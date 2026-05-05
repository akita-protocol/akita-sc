/**
 * ARC-65 short error codes for the AkitaSocial contracts.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * The human-readable mapping lives in `akita-sdk/src/social/errors.ts` — keep
 * the two files in sync when adding or changing a code. Constant NAMES are
 * preserved from the pre-ARC-65 layout so call sites don't change.
 *
 * Duplicates of shared/top-level errors are intentionally re-declared here
 * (rather than imported) so the social contracts can own short codes without
 * forcing a migration of the shared `utils/errors.ts`, top-level `errors.ts`,
 * `subscriptions/errors.ts`, or `arc58/plugins/optin/errors.ts`.
 */

// --- Top-level / shared aliases (social-scoped copies of shared errors) -----

export const ERR_NOT_AKITA_DAO = 'NDAO'
export const ERR_INVALID_PAYMENT = 'IPAY'
export const ERR_INVALID_TRANSFER = 'IXFR'
export const ERR_FAILED_GATE = 'FGTE'

// --- Plugin aliases (social-scoped copy of optin plugin error) --------------

export const ERR_ALREADY_OPTED_IN = 'AOPT'

// --- Subscriptions alias (social-scoped copy of subscriptions error) --------

export const ERR_USER_NOT_BLOCKED = 'UNBK'

// --- Moderation errors ------------------------------------------------------

export const ERR_NOT_A_MODERATOR = 'NMOD'
export const ERR_ALREADY_A_MODERATOR = 'EMOD'
export const ERR_ALREADY_BANNED = 'EBAN'
export const ERR_USER_NOT_BANNED = 'NBAN'
export const ERR_BANNED = 'BAND'
export const ERR_ALREADY_AN_ACTION = 'EACT'
export const ERR_ALREADY_FLAGGED = 'EFLG'
export const ERR_NOT_FLAGGED = 'NFLG'

// --- Graph errors -----------------------------------------------------------

export const ERR_BLOCKED = 'BLKD'
export const ERR_SELF_FOLLOW = 'SFLW'
export const ERR_SELF_BLOCK = 'SBLK'
export const ERR_ALREADY_FOLLOWING = 'AFLW'
export const ERR_NOT_FOLLOWING = 'NFLW'
export const ERR_WRONG_FOLLOWER_KEY = 'WFLK'
export const ERR_HAS_GATE = 'HGTE'
export const ERR_AUTOMATED_ACCOUNT = 'AUTO'

// --- Main social errors -----------------------------------------------------

export const ERR_INVALID_PAYWALL = 'IPWL'
export const ERR_PAYWALL_NOT_FOUND = 'NPWL'
export const ERR_BAD_CID = 'ICID'
export const ERR_POST_NOT_FOUND = 'NPST'
export const ERR_POST_EXISTS = 'EPST'
export const ERR_REPLY_NOT_FOUND = 'NRPL'
export const ERR_ALREADY_VOTED = 'AVOT'
export const ERR_HAVENT_VOTED = 'NVOT'
export const ERR_META_DOESNT_EXIST = 'NMTA'
export const ERR_META_ALREADY_EXISTS = 'EMTA'
export const ERR_NOT_GRAPH = 'NGRF'
export const ERR_NOT_MODERATION = 'NMDX'
export const ERR_PLUGIN_NOT_AUTH_ADDR = 'NATH'
export const ERR_INVALID_ASSET = 'IAST'
export const ERR_INVALID_APP = 'IAPP'
export const ERR_INVALID_REPLY_TYPE = 'IRTY'
export const ERR_NOT_YOUR_POST_TO_EDIT = 'NEDT'
export const ERR_IS_A_REPLY = 'ISRP'
export const ERR_NOT_A_REPLY = 'NARP'
export const ERR_IS_ALREADY_AMENDED = 'EAMD'
export const ERR_NO_SELF_VOTE = 'SVOT'
export const ERR_ALREADY_REACTED = 'ARCT'
export const ERR_FEE_TOO_SMALL = 'FTSM'
export const ERR_INVALID_REF_LENGTH = 'IRFL'
export const ERR_TIMESTAMP_TOO_OLD = 'TSOL'
export const ERR_REF_TYPE_NOT_FOUND = 'NRTP'
export const ERR_USER_DOES_NOT_OWN_NFT = 'NONT'

// --- Impact errors ----------------------------------------------------------

export const ERR_INVALID_NFD = 'INFD'
export const ERR_NOT_AN_NFD = 'NNFD'
export const ERR_USER_DOES_NOT_OWN_NFD = 'NONF'
export const ERR_NFD_CHANGED = 'CNFD'
export const ERR_NOT_AN_AKITA_NFT = 'NANT'
export const ERR_NOT_A_SUBSCRIPTION = 'NSUB'
export const ERR_NOT_SOCIAL = 'NSOC'

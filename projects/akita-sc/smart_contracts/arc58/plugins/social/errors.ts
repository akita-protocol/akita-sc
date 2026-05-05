/**
 * ARC-65 short error codes for the AkitaSocialPlugin (arc58) contract.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * Constant NAMES are preserved from the pre-ARC-65 layout so call sites don't
 * change. Where a name matches one used by the main social contracts
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
export const ERR_NOT_AKITA_DAO = 'NDAO'
export const ERR_FORBIDDEN = 'FORB'
export const ERR_INVALID_PAYMENT = 'IPAY'
export const ERR_PLUGIN_NOT_AUTH_ADDR = 'NATH'
export const ERR_FAILED_GATE = 'FGTE'
export const ERR_BLOCKED = 'BLKD'
export const ERR_INVALID_ASSET = 'IAST'
export const ERR_INVALID_APP = 'IAPP'
export const ERR_ALREADY_OPTED_IN = 'AOPT'
export const ERR_NOT_OPTED_IN = 'NOPT'

// --- Moderation (match main social contracts) ------------------------------

export const ERR_BANNED = 'BAND'
export const ERR_NOT_A_MODERATOR = 'NMOD'
export const ERR_ALREADY_A_MODERATOR = 'EMOD'
export const ERR_ALREADY_BANNED = 'EBAN'
export const ERR_ALREADY_FLAGGED = 'EFLG'
export const ERR_ALREADY_AN_ACTION = 'EACT'

// --- Content (match main social contracts) ---------------------------------

export const ERR_BAD_CID = 'ICID'
export const ERR_POST_NOT_FOUND = 'NPST'
export const ERR_REPLY_NOT_FOUND = 'NRPL'
export const ERR_ALREADY_VOTED = 'AVOT'
export const ERR_HAVENT_VOTED = 'NVOT'
export const ERR_META_DOESNT_EXIST = 'NMTA'
export const ERR_META_ALREADY_EXISTS = 'EMTA'
export const ERR_NOT_YOUR_POST_TO_EDIT = 'NEDT'
export const ERR_IS_A_REPLY = 'ISRP'
export const ERR_NOT_A_REPLY = 'NARP'
export const ERR_IS_ALREADY_AMENDED = 'EAMD'
export const ERR_NO_SELF_VOTE = 'SVOT'
export const ERR_ALREADY_REACTED = 'ARCT'
export const ERR_FEE_TOO_SMALL = 'FTSM'

// --- Identity / assets (match main social contracts) -----------------------

export const ERR_INVALID_NFD = 'INFD'
export const ERR_NOT_AN_NFD = 'NNFD'
export const ERR_USER_DOES_NOT_OWN_NFD = 'NONF'
export const ERR_NFD_CHANGED = 'CNFD'
export const ERR_NOT_AN_AKITA_NFT = 'NANT'
export const ERR_USER_DOES_NOT_OWN_NFT = 'NONT'
export const ERR_NOT_A_SUBSCRIPTION = 'NSUB'
export const ERR_AUTOMATED_ACCOUNT = 'AUTO'

// --- Graph (match main social contracts) -----------------------------------

export const ERR_WRONG_FOLLOWER_KEY = 'WFLK'
export const ERR_HAS_GATE = 'HGTE'

// --- Plugin-specific codes (no equivalent in main social) ------------------

export const ERR_NOT_DAO = 'NTDO'

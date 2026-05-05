/**
 * ARC-65 short error codes SHARED across Akita smart contracts.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * The human-readable mapping lives in `akita-sdk/src/errors.ts` — keep
 * the two files in sync when adding or changing a code. Constant NAMES are
 * preserved from the pre-ARC-65 layout so call sites don't change.
 *
 * Codes defined here are SHARED across multiple domains. Domain-specific
 * codes live in each domain's own `errors.ts`. When a domain needs a code
 * that already exists here, import it from this file rather than re-declaring
 * it, so the same short code round-trips through every translator.
 *
 * The pre-existing per-contract ARC-65 files (`arc58/account/errors.ts`,
 * `arc58/dao/errors.ts`, `social/errors.ts`) intentionally mirror these
 * codes locally for historical reasons — the short codes agree so that any
 * translator (common, wallet, dao, social) can decode them.
 */

// --- Admin / authorization --------------------------------------------------

export const ERR_NOT_AKITA_DAO = 'NDAO'
export const ERR_INVALID_CALLER = 'ICAL'
export const ERR_FORBIDDEN = 'FORB'
export const ERR_MUST_BE_CALLED_FROM_FACTORY = 'MBFF'
export const ERR_NOT_CREATOR = 'NCRE'

// --- Lifecycle --------------------------------------------------------------

export const ERR_INVALID_UPGRADE = 'IUPG'
export const ERR_BAD_DEPLOYER = 'BDEP'

// --- Payments / transfers --------------------------------------------------

export const ERR_INVALID_PAYMENT = 'IPAY'
export const ERR_INVALID_PAYMENT_AMOUNT = 'IPMA'
export const ERR_INVALID_PAYMENT_RECEIVER = 'IPMR'
export const ERR_INVALID_TRANSFER = 'IXFR'
export const ERR_INVALID_ASSET_AMOUNT = 'IAAM'
export const ERR_INVALID_ASSET_RECEIVER = 'IARE'

// --- Asset / app validation ------------------------------------------------

export const ERR_INVALID_ASSET = 'IAST'
export const ERR_INVALID_APP = 'IAPP'
export const ERR_ASA_MISMATCH = 'ASAM'
export const ERR_NOT_ASSET_CREATOR = 'NACR'

// --- Plugin / wallet --------------------------------------------------------

export const ERR_PLUGIN_NOT_AUTH_ADDR = 'NATH'

// --- Gates ------------------------------------------------------------------

export const ERR_FAILED_GATE = 'FGTE'

// --- Opt-in -----------------------------------------------------------------

export const ERR_ALREADY_OPTED_IN = 'AOPT'
export const ERR_NOT_OPTED_IN = 'NOPT'

// --- Blocking (shared with social graph) -----------------------------------

export const ERR_BLOCKED = 'BLKD'

/**
 * ARC-65 short error codes for the Subscriptions contract.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * The human-readable mapping lives in `akita-sdk/src/subscriptions/errors.ts` —
 * keep the two files in sync when adding or changing a code. Constant NAMES
 * are preserved from the pre-ARC-65 layout so call sites don't change.
 */

// Mirror common codes used by subscriptions so domain call sites keep their
// previous names but share the wire format with the top-level `errors.ts`.
// PuyaTs doesn't support `export { X } from` re-export syntax, so the
// constants are redeclared here with identical values.
export const ERR_PLUGIN_NOT_AUTH_ADDR = 'NATH'
export const ERR_ALREADY_OPTED_IN = 'AOPT'
export const ERR_BLOCKED = 'BLKD'
export const ERR_ASA_MISMATCH = 'ASAM'
export const ERR_FAILED_GATE = 'FGTE'
export const ERR_INVALID_ASSET_AMOUNT = 'IAAM'
export const ERR_INVALID_ASSET_RECEIVER = 'IARE'
export const ERR_NOT_OPTED_IN = 'NOPT'
export const ERR_INVALID_PAYMENT = 'IPAY'
export const ERR_INVALID_TRANSFER = 'IXFR'

// --- Input validation -------------------------------------------------------

export const ERR_MIN_AMOUNT_IS_THREE = 'MAMT'
export const ERR_MIN_INTERVAL_IS_SIXTY = 'MINV'
export const ERR_MAX_PASSES_IS_FIVE = 'MXPS'
export const ERR_TITLE_TOO_LONG = 'TTLG'
export const ERR_BAD_DESCRIPTION_LENGTH = 'BDLN'
export const ERR_BAD_OFFSET = 'BOFS'
export const ERR_BAD_WINDOW = 'BWIN'

// --- Services ---------------------------------------------------------------

export const ERR_SERVICE_INDEX_MUST_BE_ABOVE_ZERO = 'SIAZ'
export const ERR_SERVICE_DOES_NOT_EXIST = 'SDNE'
export const ERR_SERVICE_IS_NOT_DRAFT = 'SNDR'
export const ERR_SERVICE_IS_NOT_ACTIVE = 'SNAC'
export const ERR_SERVICE_IS_NOT_PAUSED = 'SNPA'
export const ERR_SERVICE_IS_SHUTDOWN = 'SSHD'
export const ERR_SERVICE_NOT_ACTIVATED = 'SNAV'
export const ERR_NOT_A_SERVICE = 'NSVC'

// --- Subscriptions ----------------------------------------------------------

export const ERR_SUBSCRIPTION_DOES_NOT_EXIST = 'UDNE'
export const ERR_CANNOT_TRIGGER = 'CTRG'
export const ERR_NOT_ENOUGH_FUNDS = 'NEFN'
export const ERR_NO_DONATIONS = 'NODN'
export const ERR_PASS_COUNT_OVERFLOW = 'PCOF'

// --- Blocking ---------------------------------------------------------------

export const ERR_USER_ALREADY_BLOCKED = 'UABL'
export const ERR_USER_NOT_BLOCKED = 'UNBL'

// --- Group / call-order -----------------------------------------------------

export const ERR_GROUP_INDEX_OUT_OF_BOUNDS = 'GIOB'
export const ERR_INVALID_SEQUENCE = 'ISEQ'

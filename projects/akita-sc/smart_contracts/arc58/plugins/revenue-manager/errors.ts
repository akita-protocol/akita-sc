/**
 * ARC-65 short error codes for the RevenueManagerPlugin (arc58) contract.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * Constant NAMES are preserved from the pre-ARC-65 layout so call sites don't
 * change.
 *
 * The human-readable mapping is shared via `akita-sdk/src/wallet/errors.ts`
 * (the wallet/plugin translator) — no new SDK file is required.
 */

// Mirror shared codes used by revenue-manager so domain call sites keep their
// previous names but share the wire format with the top-level `errors.ts`.
// PuyaTs doesn't support `export { X } from` re-export syntax, so the
// constants are redeclared here with identical values.
export const ERR_INVALID_PAYMENT = 'IPAY'
export const ERR_INVALID_PAYMENT_AMOUNT = 'IPMA'
export const ERR_INVALID_PAYMENT_RECEIVER = 'IPMR'
export const ERR_INVALID_ASSET = 'IAST'
export const ERR_ALREADY_OPTED_IN = 'AOPT'

// --- Escrow lookup ----------------------------------------------------------

export const ERR_RECEIVE_ESCROW_DOES_NOT_EXIST = 'NRES'
export const ERR_RECEIVE_ESCROW_ALREADY_EXISTS = 'ERES'
export const ERR_ESCROW_NOT_ALLOWED_TO_OPTIN = 'NESO'
export const ERR_ESCROW_NAME_TOO_LONG = 'ENLG'

// --- Splits configuration ---------------------------------------------------

export const ERR_SPLITS_CANNOT_BE_EMPTY = 'SPEM'
export const ERR_SPLITS_CANNOT_BE_MORE_THAN_10 = 'SPGT'
export const ERR_SPLIT_VALUE_MUST_BE_POSITIVE_OR_REMAINDER = 'SPVR'
export const ERR_SPLITS_OR_REF_REQUIRED = 'SPOR'
export const ERR_SPLIT_REF_NOT_FOUND = 'NSRF'
export const ERR_INVALID_SPLIT_REF = 'ISRF'
export const ERR_REMAINDER_MUST_BE_LAST = 'RMLT'
export const ERR_REMAINDER_VALUE_MUST_BE_ZERO = 'RMVZ'
export const ERR_PERCENTAGE_EXCEEDS_100 = 'PCGT'
export const ERR_PERCENTAGE_MUST_BE_NOT_BE_100_WITH_REMAINDER = 'PCRM'
export const ERR_FLAT_WITH_PERCENTAGE_REQUIRES_REMAINDER = 'FPRM'
export const ERR_SPLITS_MUST_TOTAL_100_OR_HAVE_REMAINDER = 'SPTR'
export const ERR_INVALID_SPLIT_TYPE = 'ISPT'
export const ERR_INVALID_WALLET = 'IWAL'
export const ERR_RECEIVER_ESCROW_DOES_NOT_EXIST = 'RNES'

// --- Escrow phase -----------------------------------------------------------

export const ERR_ESCROW_NOT_IDLE = 'ENID'
export const ERR_ESCROW_NOT_ALLOCATABLE = 'ENAL'
export const ERR_ESCROW_NOT_READY_FOR_DISBURSEMENT = 'ENRD'
export const ERR_ESCROW_NOT_IN_ALLOCATION_PHASE = 'ENAP'
export const ERR_ESCROW_NOT_IN_FINALIZATION_PHASE = 'ENFP'

// --- Asset allocation -------------------------------------------------------

export const ERR_ASSET_NOT_ALLOCATED = 'ANAL'
export const ERR_ASSET_ALREADY_ALLOCATED = 'AALA'
export const ERR_ESCROW_NOT_OPTED_IN = 'ENOI'
export const ERR_ASSET_NOT_REGISTERED = 'ANRG'
export const ERR_ASSET_ALREADY_REGISTERED = 'AARG'
export const ERR_ASSET_LIST_CANNOT_BE_EMPTY = 'ALEM'
export const ERR_TOO_MANY_ASSETS = 'TMAS'
export const ERR_MIGRATION_ASSET_COUNT_MISMATCH = 'MACM'
export const ERR_INVALID_MIGRATION_METADATA = 'IMMD'

// --- Disbursement -----------------------------------------------------------

export const ERR_OVER_ALLOCATION = 'OVAL'
export const ERR_CONTROLLED_ADDRESS_MUST_BE_ESCROW = 'CAME'

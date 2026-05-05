/**
 * ARC-65 short error codes for the MetaMerkles contracts.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * The human-readable mapping lives in `akita-sdk/src/meta-merkles/errors.ts` —
 * keep the two files in sync when adding or changing a code. Constant NAMES
 * are preserved from the pre-ARC-65 layout so call sites don't change.
 */

// --- Box key / data validation ---------------------------------------------

export const ERR_KEY_TOO_LONG = 'KTL'
export const ERR_DATA_TOO_LONG = 'DTL'
export const ERR_RESERVED_KEY_PREFIX = 'RKP'
export const ERR_NAME_TOO_LONG = 'NTL'

// --- Root lifecycle ---------------------------------------------------------

export const ERR_NAME_TAKEN = 'NTKN'
export const ERR_NO_NAME = 'NNAM'
export const ERR_NO_ROOT = 'NROT'
export const ERR_NO_ROOT_FOR_DATA = 'NRFD'
export const ERR_ROOT_ALREADY_EXISTS = 'EROT'

// --- Verification -----------------------------------------------------------

export const ERR_FAILED_TO_VERIFY_INCLUSION = 'FVRI'

// --- Data / schema ----------------------------------------------------------

export const ERR_SCHEMA_MISMATCH = 'SCHM'
export const ERR_TYPE_MISMATCH = 'TMIS'
export const ERR_NO_DATA = 'NDTA'
export const ERR_NEW_DATA_ALREADY_EXISTS = 'EDTA'

// --- Tree types -------------------------------------------------------------

export const ERR_NO_TREE_TYPE = 'NTRT'
export const ERR_TREE_TYPE_KEY_ALREADY_EXISTS = 'ETRK'

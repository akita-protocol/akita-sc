/**
 * ARC-65 short error codes for shared utility base contracts.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * The human-readable mapping lives in `akita-sdk/src/errors.ts` — keep
 * the two files in sync when adding or changing a code. Constant NAMES are
 * preserved from the pre-ARC-65 layout so call sites don't change.
 *
 * Codes shared with the top-level `smart_contracts/errors.ts` are re-exported
 * from there so utility base contracts and domain contracts decode the same
 * short code the same way.
 */

// Mirror truly shared codes from the top-level `errors.ts` so the utils layer
// uses the exact same short codes. PuyaTs doesn't support `export { X } from`
// re-export syntax, so the constants are redeclared here with identical values.
export const ERR_INVALID_PAYMENT = 'IPAY'
export const ERR_INVALID_PAYMENT_AMOUNT = 'IPMA'
export const ERR_INVALID_PAYMENT_RECEIVER = 'IPMR'
export const ERR_INVALID_TRANSFER = 'IXFR'
export const ERR_INVALID_ASSET_AMOUNT = 'IAAM'
export const ERR_INVALID_ASSET_RECEIVER = 'IARE'
export const ERR_INVALID_APP = 'IAPP'
export const ERR_INVALID_ASSET = 'IAST'
export const ERR_ASA_MISMATCH = 'ASAM'
export const ERR_NOT_OPTED_IN = 'NOPT'
export const ERR_FAILED_GATE = 'FGTE'

// --- Factory helpers --------------------------------------------------------

export const ERR_CONTRACT_NOT_SET = 'CNST'
export const ERR_INVALID_CALL_ORDER = 'ICOR'

// --- App call shape ---------------------------------------------------------

export const ERR_INVALID_APP_ID = 'IAID'
export const ERR_INVALID_ON_COMPLETE = 'IONC'
export const ERR_INVALID_NUMBER_OF_APP_ARGS = 'INAA'
export const ERR_INVALID_ABI_METHOD = 'IABI'

// --- Prize-box helpers ------------------------------------------------------

export const ERR_BAD_METHOD_PRIZE_BOX_TRANSFER_NEEDED = 'BMPT'
export const ERR_NOT_A_PRIZE_BOX = 'NAPB'
export const ERR_NOT_PRIZE_BOX_OWNER = 'NPBO'

// --- Revenue split ----------------------------------------------------------

export const ERR_INVALID_PERCENTAGE = 'IPCT'
export const ERR_INVALID_PERCENTAGE_OF_ARGS = 'IPOA'
export const ERR_ASSETS_AND_AMOUNTS_MISMATCH = 'AAMM'

// --- Close-out guard --------------------------------------------------------

export const ERR_CANNOT_CLOSE_OUT_OF_ALGO_FORBIDDEN = 'NCCA'

// --- Random utility ---------------------------------------------------------

export const ERR_INVALID_RANDOM_SEED = 'IRSD'
export const ERR_INVALID_RANDOM_LENGTH = 'IRLN'
export const ERR_INVALID_RANDOM_BIT_SIZE = 'IRBS'
export const ERR_INVALID_RANDOM_BOUNDS = 'IRBD'

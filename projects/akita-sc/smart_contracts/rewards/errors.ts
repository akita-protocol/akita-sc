/**
 * ARC-65 short error codes for the Rewards contract.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * The human-readable mapping lives in `akita-sdk/src/rewards/errors.ts` —
 * keep the two files in sync when adding or changing a code. Constant NAMES
 * are preserved from the pre-ARC-65 layout so call sites don't change.
 */

// Mirror common codes used by rewards so domain call sites keep their previous
// names but share the wire format with the top-level `errors.ts`. PuyaTs
// doesn't support `export { X } from` re-export syntax, so the constants are
// redeclared here with identical values.
export const ERR_INVALID_PAYMENT = 'IPAY'
export const ERR_INVALID_TRANSFER = 'IXFR'

// --- Plugin / wallet --------------------------------------------------------

export const ERR_PLUGIN_DOES_NOT_CONTROL_WALLET = 'PNCW'

// --- Token allocation boxes -------------------------------------------------

export const ERR_TOKEN_ALLOCATION_BOX_ALREADY_EXISTS = 'TABE'
export const ERR_TOKEN_ALLOCATION_BOX_DOES_NOT_EXIST = 'TBNE'

// --- Disbursement authorization --------------------------------------------

export const ERR_YOU_ARE_NOT_THE_CREATOR = 'YNCR'

// --- Asset opt-in -----------------------------------------------------------

export const ERR_APP_NOT_OPTED_INTO_ASSET = 'ANOI'

// --- Disbursement lifecycle -------------------------------------------------

export const ERR_DISBURSEMENT_DOES_NOT_EXIST = 'DBNE'
export const ERR_DISBURSEMENT_ALREADY_FINAL = 'DBAF'
export const ERR_DISBURSEMENT_LOCKED = 'DBLK'
export const ERR_DISBURSEMENT_FULLY_DISTRIBUTED = 'DBFD'
export const ERR_DISBURSEMENT_NOT_EXPIRED = 'DBNX'

// --- Disbursement validation ------------------------------------------------

export const ERR_INVALID_DISBURSEMENT_UNLOCK_TIME = 'IDUT'
export const ERR_INVALID_DISBURSEMENT_EXPIRATION_TIME = 'IDXT'
export const ERR_DISBURSEMENTS_CANNOT_BE_EMPTY = 'DBEM'
export const ERR_DISBURSEMENTS_MUST_HAVE_ALLOCATIONS = 'DBMA'

// --- Allocations ------------------------------------------------------------

export const ERR_ALLOCATION_ALREADY_EXISTS = 'ALAE'
export const ERR_ALLOCATION_DOES_NOT_EXIST = 'ALNE'

// --- Totals -----------------------------------------------------------------

export const ERR_INVALID_SUM = 'ISUM'
export const ERR_INVALID_MBR_AMOUNT = 'IMBR'

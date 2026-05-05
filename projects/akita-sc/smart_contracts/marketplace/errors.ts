/**
 * ARC-65 short error codes for the Marketplace + Listing contracts.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * The human-readable mapping lives in `akita-sdk/src/marketplace/errors.ts` —
 * keep the two files in sync when adding or changing a code. Constant NAMES
 * are preserved from the pre-ARC-65 layout so call sites don't change.
 */

// Mirror common codes used by marketplace so domain call sites keep their
// previous names but share the wire format with the top-level `errors.ts`.
// PuyaTs doesn't support `export { X } from` re-export syntax, so the
// constants are redeclared here with identical values.
export const ERR_NOT_AKITA_DAO = 'NDAO'
export const ERR_MUST_BE_CALLED_FROM_FACTORY = 'MBFF'
export const ERR_INVALID_PAYMENT = 'IPAY'
export const ERR_INVALID_TRANSFER = 'IXFR'
export const ERR_FAILED_GATE = 'FGTE'

// --- Listing validation -----------------------------------------------------

export const ERR_PRICE_TOO_LOW = 'PRLO'
export const ERR_MARKETPLACE_NOT_OPTED_INTO_PAYMENT_ASSET = 'MNOP'
export const ERR_NOT_A_LISTING = 'NALS'
export const ERR_INVALID_EXPIRATION = 'IEXP'
export const ERR_LISTING_EXPIRED = 'LEXP'

// --- Payment asset ----------------------------------------------------------

export const ERR_PAYMENT_ASSET_MUST_BE_ALGO = 'PAMA'
export const ERR_PAYMENT_ASSET_MUST_NOT_BE_ALGO = 'PANA'

// --- Access / delist --------------------------------------------------------

export const ERR_ONLY_SELLER_CAN_DELIST = 'OSCD'
export const ERR_RESERVED_FOR_DIFFERENT_ADDRESS = 'RFDA'
export const ERR_MUST_BE_SELLER = 'MBSL'

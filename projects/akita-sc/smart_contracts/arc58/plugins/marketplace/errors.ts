/**
 * ARC-65 short error codes for the MarketplacePlugin (arc58) contract.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * Constant NAMES are preserved from the pre-ARC-65 layout so call sites don't
 * change. Codes shared with the main marketplace contracts are re-exported
 * from `smart_contracts/marketplace/errors.ts` so any translator can decode
 * errors bubbling up from either layer.
 */

// --- Shared codes mirrored for ergonomic imports ---------------------------

// PuyaTs doesn't support `export { X } from` re-export syntax, so the
// constants are redeclared here with the same values as the main marketplace
// contracts.
export const ERR_NOT_AKITA_DAO = 'NDAO'
export const ERR_MUST_BE_CALLED_FROM_FACTORY = 'MBFF'
export const ERR_INVALID_PAYMENT = 'IPAY'
export const ERR_INVALID_TRANSFER = 'IXFR'
export const ERR_FAILED_GATE = 'FGTE'

// --- Plugin-specific codes -------------------------------------------------

export const ERR_NOT_ENOUGH_ASSET = 'NENA'
export const ERR_LISTING_CREATOR_NOT_MARKETPLACE = 'LCNM'

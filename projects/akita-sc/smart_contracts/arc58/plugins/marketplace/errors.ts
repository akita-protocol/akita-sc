/**
 * ARC-65 short error codes for the MarketplacePlugin (arc58) contract.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * Constant names and values use camelCase. The `err` prefix avoids 8-byte logs. Codes shared with the main marketplace contracts are re-exported
 * from `smart_contracts/marketplace/errors.ts` so any translator can decode
 * errors bubbling up from either layer.
 */

// --- Shared codes mirrored for ergonomic imports ---------------------------

// PuyaTs doesn't support `export { X } from` re-export syntax, so the
// constants are redeclared here with the same values as the main marketplace
// contracts.
export const errNotAkitaDao = 'errNdao'
export const errMustBeCalledFromFactory = 'errMbff'
export const errInvalidPayment = 'errIpay'
export const errInvalidTransfer = 'errIxfr'
export const errFailedGate = 'errFgte'

// --- Plugin-specific codes -------------------------------------------------

export const errNotEnoughAsset = 'errNena'
export const errListingCreatorNotMarketplace = 'errLcnm'
/** The listing price is above the buyer's `maxPrice` */
export const errPriceAboveMax = 'errPamx'

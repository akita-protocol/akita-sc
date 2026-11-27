/**
 * ARC-65 short error codes for the Marketplace + Listing contracts.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * The human-readable mapping lives in `akita-sdk/src/marketplace/errors.ts` —
 * keep the two files in sync when adding or changing a code. Constant names and values use
 * camelCase. Logged values use an `err` prefix to avoid 8-byte ARC-65 messages.
 */

// Mirror common codes used by marketplace so domain call sites keep their
// previous names but share the wire format with the top-level `errors.ts`.
// PuyaTs doesn't support `export { X } from` re-export syntax, so the
// constants are redeclared here with identical values.
export const errNotAkitaDao = 'errNdao'
export const errMustBeCalledFromFactory = 'errMbff'
export const errInvalidPayment = 'errIpay'
export const errInvalidTransfer = 'errIxfr'
export const errFailedGate = 'errFgte'

// --- Listing validation -----------------------------------------------------

export const errPriceTooLow = 'errPrlo'
export const errMarketplaceNotOptedIntoPaymentAsset = 'errMnop'
export const errNotAListing = 'errNals'
export const errInvalidExpiration = 'errIexp'
export const errListingExpired = 'errLexp'

// --- Payment asset ----------------------------------------------------------

export const errPaymentAssetMustBeAlgo = 'errPama'
export const errPaymentAssetMustNotBeAlgo = 'errPana'

// --- Access / delist --------------------------------------------------------

export const errOnlySellerCanDelist = 'errOscd'
export const errReservedForDifferentAddress = 'errRfda'
export const errMustBeSeller = 'errMbsl'

// --- Settlement safety (audit MKT-01/02/04/06) -------------------------------

/** Legacy (pre-revision) listing: ASA settlement unsupported, seller must delist + relist */
export const errLegacyListing = 'errLgcy'
/** The listing's prize balance no longer matches the listed amount (clawback/partial removal) */
export const errPrizeChanged = 'errPchg'
/** The price changed within the purchase cooldown window */
export const errPriceRecentlyChanged = 'errPrcd'
/** The payment asset cannot be the prize asset */
export const errPrizeIsPaymentAsset = 'errPbdl'
/** A legacy-paid listing would take the factory's free balance below `LegacyFloatReserve` */
export const errLegacyFloatReserve = 'errLflt'
/** The creator royalty resolved when the listing is created is above the seller's `maxCreatorRoyalty` */
export const errRoyaltyAboveMax = 'errRamx'

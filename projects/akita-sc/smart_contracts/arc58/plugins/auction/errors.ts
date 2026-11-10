/**
 * ARC-65 short error codes for the AuctionPlugin (arc58) contract.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * Constant names and values use camelCase. The `err` prefix avoids 8-byte logs. Plugin-specific codes have no equivalent in the main auction domain;
 * they still round-trip through the common translator via the shared error
 * table.
 */

// --- Plugin-specific codes -------------------------------------------------

export const errAuctionPrizeCannotBeAlgo = 'errPcba'
export const errNotEnoughAsset = 'errNena'
export const errCreatorNotAuctionFactory = 'errCnaf'

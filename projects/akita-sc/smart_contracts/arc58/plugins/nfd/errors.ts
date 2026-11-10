/**
 * ARC-65 short error codes for the NFDPlugin (arc58) contract.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * Constant names and values use camelCase. The `err` prefix avoids 8-byte logs. The human-readable mapping lives alongside the shared SDK translator
 * via `akita-sdk/src/wallet/errors.ts`.
 */

// --- NFD validation --------------------------------------------------------

export const errNotAnNfd = 'errNnfd'
export const errNoSaleAmount = 'errNsla'
export const errCannotAutoRenew = 'errNarn'
export const errNotNfdOwner = 'errNnow'
/** The NFD's sale or renewal price is above the caller's `maxPrice` */
export const errPriceAboveMax = 'errNpmx'

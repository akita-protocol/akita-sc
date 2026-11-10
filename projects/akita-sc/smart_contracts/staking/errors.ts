/**
 * ARC-65 short error codes for the Staking contract.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * The human-readable mapping lives in `akita-sdk/src/staking/errors.ts` —
 * keep the two files in sync when adding or changing a code. Constant names and values use
 * camelCase. Logged values use an `err` prefix to avoid 8-byte ARC-65 messages.
 */

// Mirror common codes used by staking so domain call sites keep their previous
// names but share the wire format with the top-level `errors.ts`. PuyaTs
// doesn't support `export { X } from` re-export syntax, so the constants are
// redeclared here with identical values.
export const errNotAkitaDao = 'errNdao'
export const errInvalidPayment = 'errIpay'
export const errInvalidPaymentAmount = 'errIpma'
export const errInvalidPaymentReceiver = 'errIpmr'
export const errInvalidAssetAmount = 'errIaam'
export const errNotOptedIn = 'errNopt'
export const errAlreadyOptedIn = 'errAopt'
export const errNotAssetCreator = 'errNacr'
export const errPluginNotAuthAddr = 'errNath'

// --- Lock lifecycle ---------------------------------------------------------

export const errNoLock = 'errNlck'
export const errLocked = 'errLock'
export const errBadExpiration = 'errBexp'
export const errBadExpirationUpdate = 'errBexu'

// --- Stake lifecycle --------------------------------------------------------

export const errAlreadyInitialized = 'errInit'
export const errStakeNotFound = 'errSnfd'
export const errStakeDoesntExist = 'errSnex'
export const errBadAmountHeld = 'errBamh'
export const errInsufficientBalance = 'errIbal'
export const errAppCallRequired = 'errAcrq'
export const errWithdrawIsOnlyForHardOrLock = 'errWhol'

// --- Heartbeat --------------------------------------------------------------

export const errHeartbeatCannotUpdate = 'errHbcu'
export const errNotHeartbeatManager = 'errNhbm'
export const errHearbeatNotFound = 'errHbnf'

// --- 2026-10 audit fixes ----------------------------------------------------

export const errNotCreator = 'errNcre'
/** Stake type is not one of HEARTBEAT / SOFT / HARD / LOCK (L-3). */
export const errInvalidStakeType = 'errIstp'
/** Max-lockup setting outside [2 weeks, 4 years] (DAO-05). */
export const errInvalidLockupSetting = 'errIlks'
/** Max-lockup setting may never decrease (G-5). */
export const errLockupDecrease = 'errLkdc'
/** App-scoped stake can only be released by its app, or by its owner once the app is gone (L-2). */
export const errAppStakeInUse = 'errAsiu'

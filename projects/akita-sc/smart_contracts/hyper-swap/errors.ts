/**
 * ARC-65 short error codes for the HyperSwap contract.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * The human-readable mapping lives in `akita-sdk/src/hyper-swap/errors.ts` —
 * keep the two files in sync when adding or changing a code. Constant names and values use
 * camelCase. Logged values use an `err` prefix to avoid 8-byte ARC-65 messages.
 */

// Mirror common codes used by hyper-swap so domain call sites keep their
// previous names but share the wire format with the top-level `errors.ts`.
// PuyaTs doesn't support `export { X } from` re-export syntax, so the
// constants are redeclared here with identical values.
export const errInvalidPayment = 'errIpay'
export const errInvalidTransfer = 'errIxfr'

// --- Offer validation -------------------------------------------------------

export const errBadRoots = 'errBrot'
export const errOfferExpired = 'errOfex'
export const errOfferNotFound = 'errNofr'
export const errOfferTooLong = 'errOtlg'
export const errTermsMismatch = 'errTmis'

// --- Participants -----------------------------------------------------------

export const errNotAParticipant = 'errNprt'
export const errAlreadyAccepted = 'errEacc'
export const errParticipantNotFound = 'errNpfd'
export const errParticipantsNotCleaned = 'errPncl'

// --- State machine ----------------------------------------------------------

export const errInvalidState = 'errIste'
export const errNotAccepted = 'errNacp'

// --- Escrow / leaves --------------------------------------------------------

export const errCantVerifyLeaf = 'errCvlf'
export const errLeafAlreadyEscrowed = 'errLaes'
export const errLeafNotEscrowed = 'errLnes'
export const errNothingToWithdraw = 'errNtwd'

// --- Disbursal --------------------------------------------------------------

export const errReceiverNotOptedIn = 'errRnoi'
export const errReceiverWalletMismatch = 'errRwmm'

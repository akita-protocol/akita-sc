/**
 * ARC-65 short error codes for the HyperSwap contract.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * The human-readable mapping lives in `akita-sdk/src/hyper-swap/errors.ts` —
 * keep the two files in sync when adding or changing a code. Constant NAMES
 * are preserved from the pre-ARC-65 layout so call sites don't change.
 */

// Mirror common codes used by hyper-swap so domain call sites keep their
// previous names but share the wire format with the top-level `errors.ts`.
// PuyaTs doesn't support `export { X } from` re-export syntax, so the
// constants are redeclared here with identical values.
export const ERR_INVALID_PAYMENT = 'IPAY'
export const ERR_INVALID_TRANSFER = 'IXFR'

// --- Offer validation -------------------------------------------------------

export const ERR_BAD_ROOTS = 'BROT'
export const ERR_OFFER_EXPIRED = 'OFEX'
export const ERR_OFFER_NOT_FOUND = 'NOFR'

// --- Participants -----------------------------------------------------------

export const ERR_NOT_A_PARTICIPANT = 'NPRT'
export const ERR_ALREADY_ACCEPTED = 'EACC'
export const ERR_PARTICIPANT_NOT_FOUND = 'NPFD'
export const ERR_PARTICIPANTS_NOT_CLEANED = 'PNCL'

// --- State machine ----------------------------------------------------------

export const ERR_INVALID_STATE = 'ISTE'
export const ERR_NOT_ACCEPTED = 'NACP'

// --- Escrow / leaves --------------------------------------------------------

export const ERR_CANT_VERIFY_LEAF = 'CVLF'
export const ERR_LEAF_ALREADY_ESCROWED = 'LAES'
export const ERR_LEAF_NOT_ESCROWED = 'LNES'
export const ERR_NOTHING_TO_WITHDRAW = 'NTWD'

// --- Disbursal --------------------------------------------------------------

export const ERR_RECEIVER_NOT_OPTED_IN = 'RNOI'
export const ERR_RECEIVER_WALLET_MISMATCH = 'RWMM'

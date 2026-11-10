/**
 * ARC-65 short error codes for the Rewards contract.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * The human-readable mapping lives in `akita-sdk/src/rewards/errors.ts` —
 * keep the two files in sync when adding or changing a code. Constant names and values use
 * camelCase. Logged values use an `err` prefix to avoid 8-byte ARC-65 messages.
 */

// Mirror common codes used by rewards so domain call sites keep their previous
// names but share the wire format with the top-level `errors.ts`. PuyaTs
// doesn't support `export { X } from` re-export syntax, so the constants are
// redeclared here with identical values.
export const errInvalidPayment = 'errIpay'
export const errInvalidTransfer = 'errIxfr'

// --- Plugin / wallet --------------------------------------------------------

export const errPluginDoesNotControlWallet = 'errPncw'

// --- Token allocation boxes -------------------------------------------------

export const errTokenAllocationBoxAlreadyExists = 'errTabe'
export const errTokenAllocationBoxDoesNotExist = 'errTbne'

// --- Disbursement authorization --------------------------------------------

export const errYouAreNotTheCreator = 'errYncr'

// --- Asset opt-in -----------------------------------------------------------

export const errAppNotOptedIntoAsset = 'errAnoi'

// --- Disbursement lifecycle -------------------------------------------------

export const errDisbursementDoesNotExist = 'errDbne'
export const errDisbursementAlreadyFinal = 'errDbaf'
export const errDisbursementLocked = 'errDblk'
export const errDisbursementFullyDistributed = 'errDbfd'
export const errDisbursementNotExpired = 'errDbnx'

// --- Disbursement validation ------------------------------------------------

export const errInvalidDisbursementUnlockTime = 'errIdut'
export const errInvalidDisbursementExpirationTime = 'errIdxt'
export const errDisbursementsCannotBeEmpty = 'errDbem'
export const errDisbursementsMustHaveAllocations = 'errDbma'

// --- Allocations ------------------------------------------------------------

export const errAllocationAlreadyExists = 'errAlae'
export const errAllocationDoesNotExist = 'errAlne'

// --- Totals -----------------------------------------------------------------

export const errInvalidSum = 'errIsum'
export const errInvalidMbrAmount = 'errImbr'

// --- Rewards v2 (2026-10 audit) ---------------------------------------------

/** Claim attempted before the disbursement was finalized (M-4). */
export const errDisbursementNotFinal = 'errDbnl'
/** Close/cancel attempted while allocations or used MBR credits remain. */
export const errDisbursementNotEmpty = 'errDbny'
/** Group-indexed funding txns are not the slots immediately before the call (C-1). */
export const errInvalidGroupIndex = 'errIgix'
/** A grouped asset transfer closes out to someone other than this app. */
export const errInvalidCloseTo = 'errIcto'
/** Sweep of a disbursement created without a reclaim target. */
export const errDisbursementNotSweepable = 'errDbns'
/** Sweep of an ASA allocation to a reclaim target that is not opted into the asset. */
export const errReclaimTargetNotOptedIn = 'errRcoi'

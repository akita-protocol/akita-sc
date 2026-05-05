/**
 * ARC-65 short error codes for the Staking contract.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * The human-readable mapping lives in `akita-sdk/src/staking/errors.ts` —
 * keep the two files in sync when adding or changing a code. Constant NAMES
 * are preserved from the pre-ARC-65 layout so call sites don't change.
 */

// Mirror common codes used by staking so domain call sites keep their previous
// names but share the wire format with the top-level `errors.ts`. PuyaTs
// doesn't support `export { X } from` re-export syntax, so the constants are
// redeclared here with identical values.
export const ERR_NOT_AKITA_DAO = 'NDAO'
export const ERR_INVALID_PAYMENT = 'IPAY'
export const ERR_INVALID_PAYMENT_AMOUNT = 'IPMA'
export const ERR_INVALID_PAYMENT_RECEIVER = 'IPMR'
export const ERR_INVALID_ASSET_AMOUNT = 'IAAM'
export const ERR_NOT_OPTED_IN = 'NOPT'
export const ERR_ALREADY_OPTED_IN = 'AOPT'
export const ERR_NOT_ASSET_CREATOR = 'NACR'
export const ERR_PLUGIN_NOT_AUTH_ADDR = 'NATH'

// --- Lock lifecycle ---------------------------------------------------------

export const ERR_NO_LOCK = 'NLCK'
export const ERR_LOCKED = 'LOCK'
export const ERR_BAD_EXPIRATION = 'BEXP'
export const ERR_BAD_EXPIRATION_UPDATE = 'BEXU'

// --- Stake lifecycle --------------------------------------------------------

export const ERR_STAKE_NOT_FOUND = 'SNFD'
export const ERR_STAKE_DOESNT_EXIST = 'SNEX'
export const ERR_BAD_AMOUNT_HELD = 'BAMH'
export const ERR_INSUFFICIENT_BALANCE = 'IBAL'
export const ERR_WITHDRAW_IS_ONLY_FOR_HARD_OR_LOCK = 'WHOL'

// --- Heartbeat --------------------------------------------------------------

export const ERR_HEARTBEAT_CANNOT_UPDATE = 'HBCU'
export const ERR_NOT_HEARTBEAT_MANAGER = 'NHBM'
export const ERR_HEARBEAT_NOT_FOUND = 'HBNF'

/**
 * ARC-65 short error codes for the DAO contracts.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * The human-readable mapping lives in `akita-sdk/src/dao/errors.ts` — keep
 * the two files in sync when adding or changing a code. Constant NAMES are
 * preserved from the pre-ARC-65 layout so call sites don't change.
 *
 * Duplicates of account/top-level errors are intentionally re-declared here
 * (rather than imported) so the DAO can own short codes without forcing a
 * migration of the shared `account/errors.ts` or top-level `errors.ts`.
 */

// --- Top-level aliases (DAO-scoped copies of shared errors) ------------------

export const ERR_NOT_AKITA_DAO = 'NDAO'
export const ERR_INVALID_PAYMENT = 'IPAY'

// --- Account-scoped aliases (DAO-scoped copies of account errors) ------------

export const ERR_FORBIDDEN = 'FORB'
export const ERR_INVALID_UPGRADE = 'IUPG'
export const ERR_WALLET_ALREADY_SETUP = 'WSUP'
export const ERR_EXECUTION_KEY_NOT_FOUND = 'NEXK'
export const ERR_ALLOWANCE_ALREADY_EXISTS = 'EALW'
export const ERR_ALLOWANCE_DOES_NOT_EXIST = 'NALW'
export const ERR_ESCROW_ALREADY_EXISTS = 'EESC'
export const ERR_ESCROW_DOES_NOT_EXIST = 'NESC'

// --- DAO errors --------------------------------------------------------------

export const ERR_DAO_NOT_INITIALIZED = 'NINIT'
export const ERR_EMPTY_ACTION_LIST = 'NACT'
export const ERR_INCORRECT_SENDER = 'ISND'
export const ERR_INSUFFICIENT_PROPOSAL_THRESHOLD = 'LPOW'
export const ERR_INVALID_PROPOSAL_ACTION = 'IACT'
export const ERR_INVALID_PROPOSAL_STATE = 'IPST'
export const ERR_PAYMENT_NOT_REQUIRED = 'NPAY'
export const ERR_PAYMENT_REQUIRED = 'RPAY'
export const ERR_PROPOSAL_DOES_NOT_EXIST = 'NPRP'
export const ERR_PROPOSAL_VOTE_NOT_FOUND = 'NPVT'
export const ERR_TOO_MANY_ACTIONS = 'MXAC'
export const ERR_VOTING_DURATION_NOT_MET = 'VDUR'
export const ERR_VOTING_PARTICIPATION_NOT_MET = 'VPRT'
export const ERR_ALREADY_INITIALIZED = 'INIT'
export const ERR_VERSION_CANNOT_BE_EMPTY = 'IVER'

// --- Validator errors --------------------------------------------------------

export const ERR_ACTION_LIMIT_MUST_BE_GREATER_THAN_ZERO = 'ALZ0'
export const ERR_ALLOWANCE_LIST_EMPTY = 'LEMP'
export const ERR_INVALID_CID = 'ICID'
export const ERR_INVALID_DURATION = 'IDUR'
export const ERR_INVALID_MAX_APPROVAL = 'IMXA'
export const ERR_INVALID_MAX_PARTICIPATION = 'IMXP'
export const ERR_INVALID_MIN_PARTICIPATION = 'IMNP'
export const ERR_INVALID_MAX_POWER = 'IMXW'
export const ERR_INVALID_MIN_APPROVAL = 'IMNA'
export const ERR_INVALID_MIN_POWER = 'IMNW'
export const ERR_INVALID_MINIMUM_REWARDS_IMPACT = 'IMRI'
export const ERR_INVALID_PROPOSAL_ACTION_LIMIT = 'IPAL'
export const ERR_MIN_REWARDS_IMPACT_MUST_BE_GREATER_THAN_ZERO = 'MRI0'
export const ERR_MIN_REWARDS_IMPACT_MUST_BE_LESS_THAN_OR_EQUAL_TO_1000s = 'MRI1K'
export const ERR_NOT_EXECUTABLE_PLUGIN = 'NEXE'
export const ERR_PLUGIN_ALREADY_EXISTS = 'EPLG'
export const ERR_PLUGIN_DOES_NOT_EXIST = 'NPLG'
export const ERR_PLUGIN_EXPIRED = 'PEXP'

// --- Validator inline-string constants (previously inline literals) ---------

export const ERR_UPGRADE_NO_GROUPS = 'NGRP'
export const ERR_INVALID_FIRST_VALID = 'IFV'
export const ERR_INVALID_LAST_VALID = 'ILV'
export const ERR_UNKNOWN_FIELD = 'UFLD'

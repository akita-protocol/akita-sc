/**
 * ARC-65 short error codes for the StakingPool contracts.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * The human-readable mapping lives in `akita-sdk/src/staking-pool/errors.ts` —
 * keep the two files in sync when adding or changing a code. Constant NAMES
 * are preserved from the pre-ARC-65 layout so call sites don't change.
 */

// Mirror common codes used by staking-pool so domain call sites keep their
// previous names but share the wire format with the top-level `errors.ts`.
// PuyaTs doesn't support `export { X } from` re-export syntax, so the
// constants are redeclared here with identical values.
export const ERR_FAILED_GATE = 'FGTE'
export const ERR_FORBIDDEN = 'FORB'
export const ERR_INVALID_PAYMENT = 'IPAY'
export const ERR_INVALID_TRANSFER = 'IXFR'
export const ERR_NOT_CREATOR = 'NCRE'

// --- Reward validation ------------------------------------------------------

export const ERR_STAKE_KEY_REQUIRED = 'SKYR'
export const ERR_RATE_MUST_BE_GREATER_THAN_ZERO = 'RMGZ'
export const ERR_RATE_MUST_BE_GREATER_THAN_WINNER_COUNT = 'RMGW'
export const ERR_MAX_ENTRIES_CANNOT_BE_GREATER_THAN_RATE = 'MEGR'

// --- Disbursement state -----------------------------------------------------

export const ERR_NOT_ENOUGH_FUNDS = 'NEFD'
export const ERR_NOT_READY_TO_DISBURSE = 'NRTD'
export const ERR_INVALID_DISBURSEMENT_PHASE = 'IDPH'
export const ERR_WINNING_TICKETS_ALREADY_EXIST = 'WTAE'
export const ERR_INVALID_POOL_TYPE_FOR_CHECK = 'IPTC'
export const ERR_DISBURSEMENT_NOT_READY_FOR_FINALIZATION = 'DNRF'
export const ERR_REWARD_NOT_FOUND = 'RNFD'
export const ERR_REWARD_ALREADY_IN_DISBURSEMENT = 'RAID'
export const ERR_DISTRIBUTION_WINDOW_NOT_OPEN = 'DWNO'
export const ERR_UNKNOWN_REWARD_RATE_TYPE = 'URRT'

// --- Pool lifecycle ---------------------------------------------------------

export const ERR_POOL_MUST_BE_DRAFT = 'PMBD'
export const ERR_POOL_NOT_DRAFT_OR_ENDED = 'PNDE'
export const ERR_POOL_NOT_LIVE = 'PNLV'
export const ERR_SIGNUPS_NOT_OPEN = 'SUNO'
export const ERR_POOL_MAX_ENTRIES_REACHED = 'PMER'
export const ERR_FACTORY_ONLY_INIT = 'FOIN'
export const ERR_FACTORY_ONLY_DELETE = 'FODE'
export const ERR_CREATOR_ONLY_DELETE = 'CODE'
export const ERR_CREATOR_ONLY_FINALIZE = 'COFZ'

// --- Finalize timestamps ----------------------------------------------------

export const ERR_INVALID_SIGNUP_TIMESTAMP = 'ISUT'
export const ERR_INVALID_START_TIMESTAMP = 'ISTT'
export const ERR_INVALID_START_ZERO_REQUIRES_LATE = 'ISZL'
export const ERR_INVALID_END_TIMESTAMP = 'IETT'

// --- Asset / opt-in ---------------------------------------------------------

export const ERR_NOT_ALGO = 'NALG'
export const ERR_MUST_BE_ASA = 'MBAS'
export const ERR_DAO_NOT_OPTED_IN = 'DNOI'

// --- Entry validation -------------------------------------------------------

export const ERR_QUANTITY_BELOW_MIN_STAKE = 'QBMS'
export const ERR_FAILED_STAKE_VERIFY = 'FSVF'
export const ERR_USER_BALANCE_TOO_LOW = 'UBLO'
export const ERR_USER_STAKE_TOO_LOW = 'USLO'

// --- Gate -------------------------------------------------------------------

export const ERR_GATE_ID_NOT_SET = 'GINS'
export const ERR_GATE_ID_SET = 'GIST'

/**
 * ARC-65 short error codes for the AbstractedAccount contracts.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * The human-readable mapping lives in `akita-sdk/src/wallet/errors.ts` — keep
 * the two files in sync when adding or changing a code. Constant NAMES are
 * preserved from the pre-ARC-65 layout so call sites don't change.
 *
 * Codes that also appear in `arc58/dao/errors.ts` or `social/errors.ts`
 * (e.g. `IPAY`, `FORB`, `IUPG`, `NEXK`, `EALW`, `NALW`, `EESC`, `NESC`,
 * `NPLG`, `EPLG`, `PEXP`, `WSUP`) use the same short code intentionally so
 * cross-contract errors round-trip through any translator.
 */

// --- Admin / authorization --------------------------------------------------

export const ERR_ADMIN_ONLY = 'ADMN'
export const ERR_FORBIDDEN = 'FORB'
export const ERR_ADMIN_CANNOT_BE_CONTROLLED = 'ACBC'
export const ERR_SENDER_MUST_BE_ADMIN_OR_CONTROLLED_ADDRESS = 'SADM'
export const ERR_SENDER_MUST_BE_ADMIN_PLUGIN = 'SMAP'
export const ERR_ONLY_CREATOR_CAN_REKEY = 'OCCR'
export const ERR_ONLY_APPS = 'OAPP'
export const ERR_ONLY_WALLET_OR_PLUGIN = 'OWOP'
export const ERR_ONLY_FACTORY_CAN_DELETE = 'OFCD'
export const ERR_FACTORY_UPDATES_NOT_ALLOWED = 'FUNA'

// --- Admin-gated setters ----------------------------------------------------
// Setters that route through `_requireAdmin()` use the generic
// ERR_ADMIN_ONLY ('ADMN') code — no dedicated code here to save bytecode.
// That covers: setDomain, setRevocationApp, setAkitaDAO,
// setFactoryUpdateSettings, arc58_changeAdmin, and the profile setters
// (setNickname, setAvatar, setBanner, setBio).

export const ERR_ONLY_ADMIN_CAN_UPDATE = 'OACU'
export const ERR_ONLY_ADMIN_CAN_REKEY = 'OACK'
export const ERR_ONLY_ADMIN_CAN_ADD_PLUGIN = 'OAAP'
export const ERR_ONLY_ADMIN_CAN_ADD_METHOD_RESTRICTION = 'OAMR'
export const ERR_ONLY_ADMIN_OR_REVOCATION_APP_CAN_REMOVE_PLUGIN = 'OARP'
export const ERR_ONLY_ADMIN_OR_REVOCATION_APP_CAN_REMOVE_METHOD_RESTRICTION = 'OARM'
export const ERR_ONLY_ADMIN_OR_REVOCATION_APP_CAN_REMOVE_ALLOWANCE = 'OARA'

// --- Deployment / lifecycle -------------------------------------------------

export const ERR_BAD_DEPLOYER = 'BDEP'
export const ERR_INVALID_UPGRADE = 'IUPG'
export const ERR_WALLET_ALREADY_SETUP = 'WSUP'

// --- Plugins ----------------------------------------------------------------

export const ERR_PLUGIN_DOES_NOT_EXIST = 'NPLG'
export const ERR_PLUGIN_ALREADY_EXISTS = 'EPLG'
export const ERR_NAMED_PLUGIN_ALREADY_EXISTS = 'ENPL'
export const ERR_PLUGIN_EXPIRED = 'PEXP'
export const ERR_PLUGIN_ON_COOLDOWN = 'PCLD'
export const ERR_INVALID_PLUGIN_CALL = 'IPCL'
export const ERR_SENDER_NOT_ALLOWED_TO_CALL_PLUGIN = 'SNAP'
export const ERR_PLUGIN_DOES_NOT_CONTROL_WALLET = 'PDCW'
export const ERR_PLUGIN_DOES_NOT_HAVE_ADMIN_PRIVILEGES = 'PDAP'
export const ERR_ADMIN_PLUGINS_CANNOT_USE_ESCROWS = 'APNE'
export const ERR_ZERO_ADDRESS_DELEGATION_TYPE = 'ZADT'
export const ERR_USING_EXECUTION_KEY_REQUIRES_GLOBAL = 'UEKG'

// --- Methods ----------------------------------------------------------------

export const ERR_METHOD_DOES_NOT_EXIST = 'NMTH'
export const ERR_METHOD_ALREADY_EXISTS = 'EMTH'
export const ERR_METHOD_ON_COOLDOWN = 'MCLD'
export const ERR_INVALID_METHOD_SIGNATURE_LENGTH = 'IMSL'
export const ERR_MALFORMED_OFFSETS = 'MOFF'

// --- Rekey sandwich ---------------------------------------------------------

export const ERR_MISSING_REKEY_BACK = 'NRKB'
export const ERR_CANNOT_CALL_OTHER_APPS_DURING_REKEY = 'CCOR'
export const ERR_INVALID_ONCOMPLETE = 'IOCN'
export const ERR_INVALID_SENDER_ARG = 'ISAG'
export const ERR_INVALID_SENDER_VALUE = 'ISVL'
export const ERR_AUTH_ADDR_MISMATCH = 'AUAM'

// --- Execution keys ---------------------------------------------------------

export const ERR_EXECUTION_KEY_NOT_FOUND = 'NEXK'
export const ERR_EXECUTION_NOT_READY = 'EXNR'
export const ERR_EXECUTION_EXPIRED = 'EXXP'
export const ERR_GROUP_NOT_FOUND = 'NGRP'
export const ERR_EXECUTION_KEY_UPDATE_MUST_MATCH_FIRST_VALID = 'EKFV'
export const ERR_EXECUTION_KEY_UPDATE_MUST_MATCH_LAST_VALID = 'EKLV'

// --- Escrows ----------------------------------------------------------------

export const ERR_ESCROW_LOCKED = 'ESCL'
export const ERR_ESCROW_ALREADY_EXISTS = 'EESC'
export const ERR_ESCROW_NAME_REQUIRED = 'ENRQ'
export const ERR_ESCROW_DOES_NOT_EXIST = 'NESC'
export const ERR_WRONG_ESCROW_FOR_OPERATION = 'WESC'
export const ERR_ESCROW_REQUIRED_TO_BE_SET_AS_DEFAULT = 'ERSD'

// --- Allowances -------------------------------------------------------------

export const ERR_ALLOWANCE_ALREADY_EXISTS = 'EALW'
export const ERR_ALLOWANCE_DOES_NOT_EXIST = 'NALW'
export const ERR_ALLOWANCE_EXCEEDED = 'ALEX'

// --- Domain keys ------------------------------------------------------------

export const ERR_DOMAIN_MUST_BE_LONGER_THAN_ZERO = 'DML0'
export const ERR_DOMAIN_KEY_DOES_NOT_EXIST = 'NDMK'

// --- Payments ---------------------------------------------------------------

export const ERR_INVALID_PAYMENT = 'IPAY'

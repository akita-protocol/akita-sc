/**
 * ARC-65 short error codes for the Meta contracts.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * The human-readable mapping lives in `akita-sdk/src/meta/errors.ts` —
 * keep the two files in sync when adding or changing a code. Constant names and values use
 * camelCase. Logged values use an `err` prefix to avoid 8-byte ARC-65 messages.
 */

// --- Box key / data validation ---------------------------------------------

export const errKeyTooLong = 'errKtl'
export const errDataTooLong = 'errDtl'
export const errReservedKeyPrefix = 'errRkp'
export const errNameTooLong = 'errNtl'

// --- Root lifecycle ---------------------------------------------------------

export const errNameTaken = 'errNtkn'
export const errNoName = 'errNnam'
export const errNoRoot = 'errNrot'
export const errNoRootForData = 'errNrfd'
export const errRootAlreadyExists = 'errErot'

// --- Verification -----------------------------------------------------------

export const errFailedToVerifyInclusion = 'errFvri'

// --- Data / schema ----------------------------------------------------------

export const errSchemaMismatch = 'errSchm'
export const errTypeMismatch = 'errTmis'
export const errNoData = 'errNdta'
export const errNewDataAlreadyExists = 'errEdta'

// --- Tree types -------------------------------------------------------------

export const errNoTreeType = 'errNtrt'
export const errTreeTypeKeyAlreadyExists = 'errEtrk'
export const errInvalidSchemaPart = 'errMsch'

// --- Plain records and plugin scopes -------------------------------

export const errInvalidName = 'errMnam'
export const errInvalidNamespace = 'errMnsp'
export const errInvalidKey = 'errMkey'
export const errRecordNamesTooLong = 'errMnms'
export const errInvalidRecordPayment = 'errMpmt'
export const errRecordNotFound = 'errMrnf'
export const errRecordRevisionMismatch = 'errMrev'
export const errRecordRange = 'errMrng'
export const errRecordValueTooLarge = 'errMvsz'
export const errRecordPartTooLarge = 'errMprt'
export const errRecordRequiresSlice = 'errMrsl'
export const errInvalidRegistry = 'errMreg'
export const errKeysRequireNamespace = 'errMkns'
export const errScopeTooLarge = 'errMsiz'
export const errDuplicateScopeKey = 'errMdky'
export const errNamespaceScope = 'errMnss'
export const errKeyScope = 'errMksc'
export const errRootScope = 'errMrsc'
export const errTypeScope = 'errMtsc'
/** setRecord / removeRecord on a key in the reserved grant-policy prefix. */
export const errPolicyKey = 'errMpky'
/** setPolicy / removePolicy on a key outside the grant-policy prefix. */
export const errNotPolicyKey = 'errMnpk'
/** The calling app is not the registered policy writer. */
export const errPolicyWriter = 'errMpwr'
/** The write is not inside an admin window that the policy writer holds on the wallet. */
export const errPolicyWindow = 'errMpwn'

/**
 * ARC-65 short error codes SHARED across Akita smart contracts.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * The human-readable mapping lives in `akita-sdk/src/errors.ts` — keep
 * the two files in sync when adding or changing a code. Constant names and values use
 * camelCase. Logged values use an `err` prefix to avoid 8-byte ARC-65 messages.
 *
 * Codes defined here are SHARED across multiple domains. Domain-specific
 * codes live in each domain's own `errors.ts`. When a domain needs a code
 * that already exists here, import it from this file rather than re-declaring
 * it, so the same short code round-trips through every translator.
 *
 * The pre-existing per-contract ARC-65 files (`arc58/account/errors.ts`,
 * `arc58/dao/errors.ts`, `social/errors.ts`) intentionally mirror these
 * codes locally for historical reasons — the short codes agree so that any
 * translator (common, wallet, dao, social) can decode them.
 */

// --- Admin / authorization --------------------------------------------------

export const errNotAkitaDao = 'errNdao'
export const errInvalidCaller = 'errIcal'
export const errForbidden = 'errForb'
export const errMustBeCalledFromFactory = 'errMbff'
export const errNotCreator = 'errNcre'

// --- Lifecycle --------------------------------------------------------------

export const errInvalidUpgrade = 'errIupg'
export const errBadDeployer = 'errBdep'

// --- Payments / transfers --------------------------------------------------

export const errInvalidPayment = 'errIpay'
export const errInvalidPaymentAmount = 'errIpma'
export const errInvalidPaymentReceiver = 'errIpmr'
export const errInvalidTransfer = 'errIxfr'
export const errInvalidAssetAmount = 'errIaam'
export const errInvalidAssetReceiver = 'errIare'
/** A grouped payment/transfer was not sent by the expected account. */
export const errInvalidPaymentSender = 'errIpms'
/** A grouped asset transfer used clawback (`assetSender` set). */
export const errClawbackForbidden = 'errNclw'
/** A grouped transfer closes the sender out (`closeRemainderTo` / `assetCloseTo`). */
export const errCloseForbidden = 'errNcls'
/** A grouped transfer rekeys its sender. */
export const errRekeyForbidden = 'errNrky'

// --- Asset / app validation ------------------------------------------------

export const errInvalidAsset = 'errIast'
export const errInvalidApp = 'errIapp'
export const errAsaMismatch = 'errAsam'
export const errNotAssetCreator = 'errNacr'

// --- Plugin / wallet --------------------------------------------------------

export const errPluginNotAuthAddr = 'errNath'
/** A registered wallet app lacks a 32-byte `controlled_address` global. */
export const errInvalidWallet = 'errIwlt'

// --- Gates ------------------------------------------------------------------

export const errFailedGate = 'errFgte'

// --- Opt-in -----------------------------------------------------------------

export const errAlreadyOptedIn = 'errAopt'
export const errNotOptedIn = 'errNopt'

// --- Blocking (shared with social graph) -----------------------------------

export const errBlocked = 'errBlkd'

/**
 * ARC-65 short error codes for shared utility base contracts.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * The human-readable mapping lives in `akita-sdk/src/errors.ts` — keep
 * the two files in sync when adding or changing a code. Constant names and values use
 * camelCase. Logged values use an `err` prefix to avoid 8-byte ARC-65 messages.
 *
 * Codes shared with the top-level `smart_contracts/errors.ts` are re-exported
 * from there so utility base contracts and domain contracts decode the same
 * short code the same way.
 */

// Mirror truly shared codes from the top-level `errors.ts` so the utils layer
// uses the exact same short codes. PuyaTs doesn't support `export { X } from`
// re-export syntax, so the constants are redeclared here with identical values.
export const errInvalidPayment = 'errIpay'
export const errInvalidPaymentAmount = 'errIpma'
export const errInvalidPaymentReceiver = 'errIpmr'
export const errInvalidTransfer = 'errIxfr'
export const errInvalidAssetAmount = 'errIaam'
export const errInvalidAssetReceiver = 'errIare'
export const errInvalidApp = 'errIapp'
export const errInvalidAsset = 'errIast'
export const errAsaMismatch = 'errAsam'
export const errNotOptedIn = 'errNopt'
export const errFailedGate = 'errFgte'
export const errPluginNotAuthAddr = 'errNath'
export const errInvalidWallet = 'errIwlt'
export const errInvalidPaymentSender = 'errIpms'
export const errClawbackForbidden = 'errNclw'
export const errCloseForbidden = 'errNcls'
export const errRekeyForbidden = 'errNrky'

// --- Factory helpers --------------------------------------------------------

export const errContractNotSet = 'errCnst'
export const errInvalidCallOrder = 'errIcor'
/** Approval + clear program exceed the AVM 13 limit of 8 pages (16 KB). */
export const errProgramTooLarge = 'errPtlg'

// --- App call shape ---------------------------------------------------------

export const errInvalidAppId = 'errIaid'
export const errInvalidOnComplete = 'errIonc'
export const errInvalidNumberOfAppArgs = 'errInaa'
export const errInvalidAbiMethod = 'errIabi'

// --- Prize-box helpers ------------------------------------------------------

export const errBadMethodPrizeBoxTransferNeeded = 'errBmpt'
export const errNotAPrizeBox = 'errNapb'
export const errNotPrizeBoxOwner = 'errNpbo'

// --- Revenue split ----------------------------------------------------------

export const errInvalidPercentage = 'errIpct'
export const errInvalidPercentageOfArgs = 'errIpoa'
export const errAssetsAndAmountsMismatch = 'errAamm'

// --- Close-out guard --------------------------------------------------------

export const errCannotCloseOutOfAlgoForbidden = 'errNcca'

// --- Random utility ---------------------------------------------------------

export const errInvalidRandomSeed = 'errIrsd'
export const errInvalidRandomLength = 'errIrln'
export const errInvalidRandomBitSize = 'errIrbs'
export const errInvalidRandomBounds = 'errIrbd'

// --- Principal resolution (utils/principal.ts) -------------------------------
// Values are inlined in principal.ts (it is copied verbatim into @akta/plugin and
// may not import this file); keep both in sync.

/** Wallet hint is not an app created by the DAO-registered wallet factory (or does not exist). */
export const errHintNotWallet = 'errHnwl'
/** Wallet hint on a top-level call (callerApplicationId == 0). */
export const errHintTopLevel = 'errHtop'
/** Wallet hint is neither the calling wallet nor a wallet whose plugin window holds the sender. */
export const errHintNotBound = 'errHnbd'
/** Third-party write: the hinted wallet does not own the account at rest. */
export const errHintNotOwner = 'errHnow'

/**
 * ARC-65 short error codes for the Subscriptions contract.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * The human-readable mapping lives in `akita-sdk/src/subscriptions/errors.ts` —
 * keep the two files in sync when adding or changing a code. Constant names and values use
 * camelCase. Logged values use an `err` prefix to avoid 8-byte ARC-65 messages.
 */

// Mirror common codes used by subscriptions so domain call sites keep their
// previous names but share the wire format with the top-level `errors.ts`.
// PuyaTs doesn't support `export { X } from` re-export syntax, so the
// constants are redeclared here with identical values.
export const errPluginNotAuthAddr = 'errNath'
export const errAlreadyOptedIn = 'errAopt'
export const errBlocked = 'errBlkd'
export const errAsaMismatch = 'errAsam'
export const errFailedGate = 'errFgte'
export const errInvalidAssetAmount = 'errIaam'
export const errInvalidAssetReceiver = 'errIare'
export const errNotOptedIn = 'errNopt'
export const errInvalidPayment = 'errIpay'
export const errInvalidTransfer = 'errIxfr'

// --- Input validation -------------------------------------------------------

export const errMinAmountIsThree = 'errMamt'
export const errMinIntervalIsSixty = 'errMinv'
export const errMaxPassesIsFive = 'errMxps'
export const errTitleTooLong = 'errTtlg'
export const errBadDescriptionLength = 'errBdln'
export const errBadOffset = 'errBofs'
export const errBadWindow = 'errBwin'

// --- Services ---------------------------------------------------------------

export const errServiceIndexMustBeAboveZero = 'errSiaz'
export const errServiceDoesNotExist = 'errSdne'
export const errServiceIsNotDraft = 'errSndr'
export const errServiceIsNotActive = 'errSnac'
export const errServiceIsNotPaused = 'errSnpa'
export const errServiceIsShutdown = 'errSshd'
export const errServiceNotActivated = 'errSnav'
export const errNotAService = 'errNsvc'

// --- Subscriptions ----------------------------------------------------------

export const errSubscriptionDoesNotExist = 'errUdne'
export const errCannotTrigger = 'errCtrg'
export const errNotEnoughFunds = 'errNefn'
export const errNoDonations = 'errNodn'
export const errPassCountOverflow = 'errPcof'

// --- Principal resolution (stored pair 'i', adoptPrincipal backfill) -------

/** adoptPrincipal: the subscription already has a stored principal pair */
export const errPrincipalExists = 'errPexs'
/** adoptPrincipal: the registry has no genuine wallet for the subscriber */
export const errNoLegacyWallet = 'errNlwl'
/** adoptPrincipal: the subscription has no gate, so it never needs a principal */
export const errNotGated = 'errNgtd'

// --- Featured service -------------------------------------------------------

/** clearFeaturedService: the creator has no featured service */
export const errNoFeaturedService = 'errNfsv'
/** setFeaturedService: a shut down service cannot be featured */
export const errFeaturedShutdown = 'errFshd'

// --- Blocking ---------------------------------------------------------------

export const errUserAlreadyBlocked = 'errUabl'
export const errUserNotBlocked = 'errUnbl'

// --- Group / call-order -----------------------------------------------------

export const errGroupIndexOutOfBounds = 'errGiob'
export const errInvalidSequence = 'errIseq'

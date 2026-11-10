/**
 * ARC-65 short error codes for the RevenueManagerPlugin (arc58) contract.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * Constant names and values use camelCase. The `err` prefix avoids 8-byte logs.
 *
 * The human-readable mapping is shared via `akita-sdk/src/wallet/errors.ts`
 * (the wallet/plugin translator) — no new SDK file is required.
 */

// Mirror shared codes used by revenue-manager so domain call sites keep their
// previous names but share the wire format with the top-level `errors.ts`.
// PuyaTs doesn't support `export { X } from` re-export syntax, so the
// constants are redeclared here with identical values.
export const errInvalidPayment = 'errIpay'
export const errInvalidPaymentAmount = 'errIpma'
export const errInvalidPaymentReceiver = 'errIpmr'
export const errInvalidAsset = 'errIast'
export const errAlreadyOptedIn = 'errAopt'

// --- Escrow lookup ----------------------------------------------------------

export const errReceiveEscrowDoesNotExist = 'errNres'
export const errReceiveEscrowAlreadyExists = 'errEres'
export const errEscrowNotAllowedToOptin = 'errNeso'
export const errEscrowNameTooLong = 'errEnlg'

// --- Splits configuration ---------------------------------------------------

export const errSplitsCannotBeEmpty = 'errSpem'
export const errSplitsCannotBeMoreThan10 = 'errSpgt'
export const errSplitValueMustBePositiveOrRemainder = 'errSpvr'
export const errSplitsOrRefRequired = 'errSpor'
export const errSplitRefNotFound = 'errNsrf'
export const errInvalidSplitRef = 'errIsrf'
export const errRemainderMustBeLast = 'errRmlt'
export const errRemainderValueMustBeZero = 'errRmvz'
export const errPercentageExceeds100 = 'errPcgt'
export const errPercentageMustBeNotBe100WithRemainder = 'errPcrm'
export const errFlatWithPercentageRequiresRemainder = 'errFprm'
export const errSplitsMustTotal100OrHaveRemainder = 'errSptr'
export const errInvalidSplitType = 'errIspt'
export const errInvalidWallet = 'errIwal'
export const errReceiverEscrowDoesNotExist = 'errRnes'

// --- Escrow phase -----------------------------------------------------------

export const errEscrowNotIdle = 'errEnid'
export const errEscrowNotAllocatable = 'errEnal'
export const errEscrowNotReadyForDisbursement = 'errEnrd'
export const errEscrowNotInAllocationPhase = 'errEnap'
export const errEscrowNotInFinalizationPhase = 'errEnfp'

// --- Asset allocation -------------------------------------------------------

export const errAssetNotAllocated = 'errAnal'
export const errAssetAlreadyAllocated = 'errAala'
export const errEscrowNotOptedIn = 'errEnoi'
export const errAssetNotRegistered = 'errAnrg'
export const errAssetAlreadyRegistered = 'errAarg'
export const errAssetListCannotBeEmpty = 'errAlem'
export const errTooManyAssets = 'errTmas'
export const errMigrationAssetCountMismatch = 'errMacm'
export const errInvalidMigrationMetadata = 'errImmd'

// --- Disbursement -----------------------------------------------------------

export const errOverAllocation = 'errOval'
export const errControlledAddressMustBeEscrow = 'errCame'

/**
 * ARC-65 codes for InferenceNetwork. Keep in sync with akita-sdk/src/errors.ts.
 */

/** Only the network admin may do this. */
export const errInferenceNotAdmin = 'errInad'
/** Only the provider's owner may do this. */
export const errInferenceNotOwner = 'errInow'
/** The unbonding delay is outside the allowed range. */
export const errInferenceBadWindow = 'errInbw'
/** The address must not be the zero address. */
export const errInferenceZeroAddress = 'errInza'
/** The asset is not accepted for tickets. */
export const errInferenceAssetNotAllowed = 'errInxa'
/** This app is not opted in to the asset. */
export const errInferenceNotOptedIn = 'errInoi'
/** No provider with this id. */
export const errInferenceNoProvider = 'errInnp'
/** The provider is not active. */
export const errInferenceProviderInactive = 'errInpi'
/** The provider's status cannot change this way. */
export const errInferenceBadStatus = 'errInbs'
/** The bond is below the DAO's provider bond. */
export const errInferenceBondTooLow = 'errInbl'
/** The bond is still unbonding, or unbonding has not started. */
export const errInferenceUnbonding = 'errInub'
/** More than the provider's bond. */
export const errInferenceSlashTooHigh = 'errInsh'
/** A ticket must lock more than zero. */
export const errInferenceZeroLock = 'errInzc'
/** Only the provider's claim account may do this. */
export const errInferenceNotClaimer = 'errIncl'
/** No ticket with this id. */
export const errInferenceNoTicket = 'errInnt'
/** The ticket's settle window has ended. */
export const errInferenceExpired = 'errInex'
/** The ticket's settle window has not ended. */
export const errInferenceNotExpired = 'errInnx'
/** The cost is above what the ticket locked. */
export const errInferenceOverLock = 'errInol'
/** The transfer is not a plain transfer of the asset to this app from the caller. */
export const errInferenceBadTransfer = 'errInbd'
/** The storage payment is not the exact amount to this app. */
export const errInferenceBadStoragePayment = 'errInbp'
/** The metadata URI is empty or longer than 512 bytes. */
export const errInferenceBadMetadata = 'errInbm'

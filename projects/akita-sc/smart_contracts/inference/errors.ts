/**
 * ARC-65 codes for InferenceNetwork. Keep in sync with akita-sdk/src/errors.ts.
 */

/** Only the network admin may do this. */
export const errInferenceNotAdmin = 'errInad'
/** Only the provider's owner may do this. */
export const errInferenceNotOwner = 'errInow'
/** Only the provider's claim account may do this. */
export const errInferenceNotClaimer = 'errIncl'
/** Only the channel's payer may do this. */
export const errInferenceNotPayer = 'errInpy'
/** The fee is above the network's ceiling. */
export const errInferenceFeeTooHigh = 'errInfh'
/** The close window or unbonding delay is outside the allowed range. */
export const errInferenceBadWindow = 'errInbw'
/** The address must not be the zero address. */
export const errInferenceZeroAddress = 'errInza'
/** The asset is not accepted for channels. */
export const errInferenceAssetNotAllowed = 'errInxa'
/** This app is not opted in to the asset. */
export const errInferenceNotOptedIn = 'errInoi'
/** No provider with this id. */
export const errInferenceNoProvider = 'errInnp'
/** The provider is not active. */
export const errInferenceProviderInactive = 'errInpi'
/** The provider's status cannot change this way. */
export const errInferenceBadStatus = 'errInbs'
/** The bond is below the network's minimum. */
export const errInferenceBondTooLow = 'errInbl'
/** The bond is still unbonding, or unbonding has not started. */
export const errInferenceUnbonding = 'errInub'
/** More than the provider's bond. */
export const errInferenceSlashTooHigh = 'errInsh'
/** No channel with this id. */
export const errInferenceNoChannel = 'errInnc'
/** The session key must not be empty. */
export const errInferenceNoSessionKey = 'errInsk'
/** A deposit must be more than zero. */
export const errInferenceZeroDeposit = 'errInzd'
/** The deposit transaction is not a plain transfer of the channel's asset to this app from the caller. */
export const errInferenceBadDeposit = 'errInbd'
/** The channel is closing, so it takes no more deposits or claims. */
export const errInferenceClosing = 'errIncg'
/** The channel's close window has not ended. */
export const errInferenceNotClosable = 'errInnz'
/** The receipt's total is not above what was already claimed. */
export const errInferenceStaleReceipt = 'errInsr'
/** The receipt's total is above the channel's deposit. */
export const errInferenceOverDeposit = 'errInod'
/** The receipt's signature does not match the channel's session key. */
export const errInferenceBadSignature = 'errInbg'
/** The storage payment is not the exact amount to this app. */
export const errInferenceBadStoragePayment = 'errInbp'
/** The metadata URI is empty or longer than 512 bytes. */
export const errInferenceBadMetadata = 'errInbm'

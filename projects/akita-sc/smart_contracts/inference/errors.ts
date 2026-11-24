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
/** No sponsor pool with this id. */
export const errInferenceNoPool = 'errInno'
/** Only the pool's sponsor may do this. */
export const errInferenceNotSponsor = 'errInsp'
/** Only the pool's allocator, or a subscriber for their own subscription, may open a pool ticket. */
export const errInferencePoolDenied = 'errInpd'
/** The member's use since their last subscription payment, or the pool's balance or credit, cannot cover this ticket. */
export const errInferencePoolExhausted = 'errInpx'
/** A pool needs a merchant and a subscription service. */
export const errInferenceBadService = 'errInpe'
/** The subscription is not a paid-up subscription to the pool's service. */
export const errInferenceNotSubscribed = 'errInns'
/** Inference tickets are only for Akita wallets: the call must come through a wallet that controls its account. */
export const errInferenceNoWallet = 'errInwl'

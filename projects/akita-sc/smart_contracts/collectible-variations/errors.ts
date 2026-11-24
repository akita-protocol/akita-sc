/**
 * ARC-65 short error codes for the Collectible Variations registry, logged as `ERR:{code}`.
 * The SDK maps them to messages in akita-sdk/src/collectible-variations/errors.ts.
 */

export const errAssetMissing = 'errCvAm'
export const errAssetExists = 'errCvAe'
export const errBadArgument = 'errCvBa'
export const errTooLarge = 'errCvTl'
export const errNotAuthorized = 'errCvNa'
export const errNotHolder = 'errCvNh'
export const errNotCreator = 'errCvNc'
export const errLocked = 'errCvLk'
export const errPreconditionFailed = 'errCvPf'
export const errSourceMissing = 'errCvSm'
export const errSourceChanged = 'errCvSc'
export const errSourceNotAllowed = 'errCvSn'
export const errNotSingleUnit = 'errCvSu'
export const errDepositMismatch = 'errCvDm'
export const errBadSmartAsa = 'errCvBs'
export const errBadPurge = 'errCvBp'

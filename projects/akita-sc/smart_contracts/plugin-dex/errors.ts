// FROZEN INTERFACE (PluginDex v2, FINAL-SPEC §3.3). Every v1 code is unchanged.

export const errAdminOnly = 'errPdao'
export const errInvalidPayment = 'errPdip'
export const errInvalidPool = 'errPdpl'
export const errPoolNotFound = 'errPdpn'
export const errPoolPaused = 'errPdpp'
export const errPoolNotPaused = 'errPdnp'
export const errInvalidHookConfig = 'errPdhc'
export const errHookNotApproved = 'errPdha'
export const errTooManyHooks = 'errPdth'
export const errTooManyPools = 'errPdtp'
export const errMissingRekeyBack = 'errPdrb'
/** every custody guard failure: k check, L2, both sides negative, curve Settle rejection */
export const errCustodyInvariant = 'errPdki'
export const errHookPermission = 'errPdhm'
export const errInvalidFee = 'errPdfe'
export const errHookFeeTooHigh = 'errPdhf'
export const errInvalidInput = 'errPdin'
export const errAssetNotInPool = 'errPdan'
export const errSlippage = 'errPdsl'
export const errInsufficientLiquidity = 'errPdil'
/** invalid route, including a route that repeats a pool id */
export const errInvalidRoute = 'errPdrt'

// v2 additions
/** curve result violates a Vault check (conservation, band, cross-check, fee bounds, LP mint bound) */
export const errCurveViolation = 'errPdcv'
/** curve not approved, wrong lpMode, or not allowed with this config */
export const errCurveNotApproved = 'errPdty'
/** the app's current version ≠ the approved version at createPool */
export const errVersionMismatch = 'errPdvr'
/** external slot config invalid or unsupported for this pool */
export const errExternalConfig = 'errPdex'
/** external cap exceeded */
export const errExternalCap = 'errPdec'
/** valuator returned 0 (unavailable) where a mark is required */
export const errValuatorUnavailable = 'errPdva'
/** operation not allowed in the pool's launch state (bonding / not initialized) */
export const errLaunchState = 'errPdlb'
/** graduation not allowed (threshold not reached, or not a bonding pool) */
export const errGraduation = 'errPdgr'
/** wrong entrypoint for the pool's lpMode */
export const errLpMode = 'errPdlm'

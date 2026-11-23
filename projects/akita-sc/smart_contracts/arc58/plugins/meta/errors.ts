// Grant-policy codes, shared with every GrantPolicyPlugin (utils/errors.ts); kept here under their Meta names.
export const errScopeMissing = 'errGpms'
export const errScopeAdmin = 'errGpad'
export const errWalletContext = 'errGctx'
export const errScopeStale = 'errGpst'
export const errScopeGrantMissing = 'errGnog'
/** A MetaPlugin policy body is not the canonical ARC-4 encoding of its scope. */
export const errScopeEncoding = 'errMsen'

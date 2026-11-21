/** A PayPlugin policy body is not the canonical ARC-4 encoding of its recipients and assets. */
export const errPayPolicyEncoding = 'errPpen'
/** A PayPlugin policy must list 1 to 8 recipients, sorted by address and without repeats. */
export const errPayPolicyRecipients = 'errPprc'
/** A PayPlugin policy must list 1 to 8 assets (0 is ALGO), ascending and without repeats. */
export const errPayPolicyAssets = 'errPpas'
/** The payment's receiver is not in the grant's policy. */
export const errPayRecipient = 'errPpnr'
/** The payment's asset is not in the grant's policy. */
export const errPayAsset = 'errPpna'

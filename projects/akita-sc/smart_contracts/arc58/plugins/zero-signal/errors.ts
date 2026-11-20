/**
 * ARC-65 short error codes for the ZeroSignalPlugin (arc58) contract.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 */

/** The plugin was created with escrow app id 0, which would resolve to the plugin itself */
export const errNoEscrowApp = 'errZesc'
/** A payment names a receiver other than the escrow app's address */
export const errReceiverNotEscrow = 'errZrcv'

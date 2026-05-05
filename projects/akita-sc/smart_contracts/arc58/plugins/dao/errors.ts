/**
 * ARC-65 short error codes for the AkitaDAOPlugin (arc58) contract.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * The human-readable mapping is shared with the main DAO contracts via
 * `akita-sdk/src/dao/errors.ts` — no new SDK file is required.
 */

// Mirror codes from the main DAO errors so plugin call sites keep their
// previous names but share the wire format with the DAO contract. PuyaTs
// doesn't support `export { X } from` re-export syntax, so the constant is
// redeclared here with an identical value.
export const ERR_PROPOSAL_DOES_NOT_EXIST = 'NPRP'

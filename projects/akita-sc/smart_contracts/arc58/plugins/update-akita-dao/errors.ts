/**
 * ARC-65 short error codes for the UpdateAkitaDAOPlugin (arc58) contract.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * The human-readable mapping is shared via `akita-sdk/src/errors.ts` — no new
 * SDK file is required for this plugin.
 */

// Mirror shared codes so plugin call sites keep their previous names but share
// the wire format with the top-level `errors.ts` / `utils/errors.ts`. PuyaTs
// doesn't support `export { X } from` re-export syntax, so the constants are
// redeclared here with identical values.
export const ERR_NOT_AKITA_DAO = 'NDAO'
export const ERR_CONTRACT_NOT_SET = 'CNST'
export const ERR_INVALID_CALL_ORDER = 'ICOR'

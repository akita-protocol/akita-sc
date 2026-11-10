/**
 * ARC-65 short error codes for the OptInPlugin (arc58) contract.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * Constant names and values use camelCase. The `err` prefix avoids 8-byte logs. The codes used here are shared across multiple domains, so they are
 * re-exported from the top-level `smart_contracts/errors.ts` to keep a single
 * source of truth. Downstream plugins (e.g. self-optin, revenue-manager) that
 * already import from this file continue to work without changes.
 *
 * The human-readable mapping is shared with the common translator via
 * `akita-sdk/src/errors.ts` — no new SDK file is required.
 */

// --- Shared top-level codes mirrored for ergonomic imports ----------------

// PuyaTs doesn't support `export { X } from` re-export syntax, so the
// constants are redeclared here with identical values to the top-level
// `smart_contracts/errors.ts`.
export const errAlreadyOptedIn = 'errAopt'
export const errInvalidPayment = 'errIpay'
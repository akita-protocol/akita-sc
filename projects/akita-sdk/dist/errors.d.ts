/**
 * ARC-65 error codes SHARED across all Akita contracts.
 *
 * The contracts log `ERR:{code}` via `loggedAssert` / `loggedErr` before
 * failing, where `code` is one of the short alphanumeric tags in this file.
 * Keep this in sync with `akita-sc/smart_contracts/errors.ts` — the short
 * codes are the shared wire format between contract and SDK.
 *
 * Domain-specific codes live alongside each SDK domain (e.g.
 * `akita-sdk/src/auction/errors.ts`). Every domain translator falls back to
 * this map first so that cross-domain codes round-trip through any
 * contract that emits them.
 *
 * Use `translateCommonError(code)` to turn a code back into a human-readable
 * message for display in a UI or log.
 */
/**
 * Short code → human-readable message for errors that can be emitted from
 * multiple contract domains. Kept stable so cross-domain errors decode the
 * same way no matter which translator is asked.
 */
export declare const COMMON_ERROR_MESSAGES: Record<string, string>;
/** Prefix the contracts write to the log ahead of the code (ARC-65). */
export declare const ARC65_PREFIX = "ERR:";
/** Alternate prefix ARC-65 allows for application errors. */
export declare const ARC65_ALT_PREFIX = "AER:";
/**
 * Extracts the short code from an ARC-65 log entry.
 *
 * Accepts either the raw code (`FORB`), a full ARC-65 log line
 * (`ERR:FORB` / `AER:FORB`), or an entry with an appended message
 * (`ERR:FORB:Forbidden`).
 *
 * Returns `undefined` if the input does not look like an ARC-65 code.
 */
export declare function parseArc65Code(input: string): string | undefined;
/**
 * Translates a short error code (or raw ARC-65 log entry) against the common
 * message table. Unknown codes pass through as-is so the caller still sees
 * *something* useful.
 */
export declare function translateCommonError(input: string): string;
/**
 * Build a translator for a per-domain error table that falls back to the
 * common table when the code is not domain-specific.
 *
 * Each domain exports its own `translate{Domain}Error` built from this.
 */
export declare function makeErrorTranslator(domainTable: Record<string, string>): (input: string) => string;

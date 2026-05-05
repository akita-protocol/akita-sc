/**
 * ARC-65 error codes emitted by the DAO contracts.
 *
 * The contracts log `ERR:{code}` via `loggedAssert` / `loggedErr` before
 * failing, where `code` is one of the short alphanumeric tags in this file.
 * Keep this in sync with `akita-sc/smart_contracts/arc58/dao/errors.ts` — the
 * short codes are the shared wire format between contract and SDK.
 *
 * Use `translateDaoError(code)` to turn a code back into a human-readable
 * message for display in a UI or log.
 */
/**
 * Short code → human-readable message for every error the DAO contracts can
 * emit. Ordered roughly the same way as the contract-side file.
 */
export declare const DAO_ERROR_MESSAGES: Record<string, string>;
/**
 * Extracts the short code from an ARC-65 log entry.
 *
 * Accepts either the raw code (`NPRP`), a full ARC-65 log line
 * (`ERR:NPRP` / `AER:NPRP`), or an entry with an appended message
 * (`ERR:NPRP:Proposal does not exist`).
 *
 * Returns `undefined` if the input isn't a recognizable ARC-65 error string.
 */
export declare function parseDaoErrorCode(input: string): string | undefined;
/**
 * Translates a short DAO error code (or raw ARC-65 log entry) into a
 * human-readable message. Unknown codes pass through as-is so the caller
 * still sees *something* useful.
 */
export declare function translateDaoError(input: string): string;

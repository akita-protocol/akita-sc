/**
 * ARC-65 error codes emitted by the MetaMerkles contracts.
 *
 * The contracts log `ERR:{code}` via `loggedAssert` / `loggedErr` before
 * failing, where `code` is one of the short alphanumeric tags in this file.
 * Keep this in sync with `akita-sc/smart_contracts/meta-merkles/errors.ts` —
 * the short codes are the shared wire format between contract and SDK.
 *
 * Use `translateMetaMerklesError(code)` to turn a code back into a
 * human-readable message for display in a UI or log.
 */
/**
 * Short code → human-readable message for every error the MetaMerkles
 * contracts can emit. Ordered roughly the same way as the contract-side file.
 */
export declare const META_MERKLES_ERROR_MESSAGES: Record<string, string>;
/**
 * Translates a short MetaMerkles error code (or raw ARC-65 log entry) into a
 * human-readable message. Falls back to the common error table when the code
 * isn't domain-specific. Unknown codes pass through as-is.
 */
export declare const translateMetaMerklesError: (input: string) => string;

/**
 * ARC-65 error codes emitted by the Raffle contract (and factory).
 *
 * The contract logs `ERR:{code}` via `loggedAssert` / `loggedErr` before
 * failing, where `code` is one of the short alphanumeric tags in this file.
 * Keep this in sync with `akita-sc/smart_contracts/raffle/errors.ts` —
 * the short codes are the shared wire format between contract and SDK.
 *
 * Use `translateRaffleError(code)` to turn a code back into a human-readable
 * message for display in a UI or log.
 */
/**
 * Short code → human-readable message for every error the Raffle contract
 * (and factory) can emit. Ordered roughly the same way as the contract-side file.
 */
export declare const RAFFLE_ERROR_MESSAGES: Record<string, string>;
/**
 * Translates a short Raffle error code (or raw ARC-65 log entry) into a
 * human-readable message. Falls back to the common error table when the code
 * isn't domain-specific. Unknown codes pass through as-is.
 */
export declare const translateRaffleError: (input: string) => string;

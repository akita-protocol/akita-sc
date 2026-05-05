/**
 * ARC-65 error codes emitted by the HyperSwap contract.
 *
 * The contract logs `ERR:{code}` via `loggedAssert` / `loggedErr` before
 * failing, where `code` is one of the short alphanumeric tags in this file.
 * Keep this in sync with `akita-sc/smart_contracts/hyper-swap/errors.ts` —
 * the short codes are the shared wire format between contract and SDK.
 *
 * Use `translateHyperSwapError(code)` to turn a code back into a
 * human-readable message for display in a UI or log.
 */
/**
 * Short code → human-readable message for every error the HyperSwap contract
 * can emit. Ordered roughly the same way as the contract-side file.
 */
export declare const HYPER_SWAP_ERROR_MESSAGES: Record<string, string>;
/**
 * Translates a short HyperSwap error code (or raw ARC-65 log entry) into a
 * human-readable message. Falls back to the common error table when the code
 * isn't domain-specific. Unknown codes pass through as-is.
 */
export declare const translateHyperSwapError: (input: string) => string;

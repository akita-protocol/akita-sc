/**
 * ARC-65 error codes emitted by the Rewards contract.
 *
 * The contract logs `ERR:{code}` via `loggedAssert` / `loggedErr` before
 * failing, where `code` is one of the short alphanumeric tags in this file.
 * Keep this in sync with `akita-sc/smart_contracts/rewards/errors.ts` —
 * the short codes are the shared wire format between contract and SDK.
 *
 * Use `translateRewardsError(code)` to turn a code back into a
 * human-readable message for display in a UI or log.
 */
/**
 * Short code → human-readable message for every error the Rewards contract
 * can emit. Ordered roughly the same way as the contract-side file.
 */
export declare const REWARDS_ERROR_MESSAGES: Record<string, string>;
/**
 * Translates a short Rewards error code (or raw ARC-65 log entry) into a
 * human-readable message. Falls back to the common error table when the code
 * isn't domain-specific. Unknown codes pass through as-is.
 */
export declare const translateRewardsError: (input: string) => string;

/**
 * ARC-65 error codes emitted by InferenceNetwork and InferencePlugin.
 *
 * Keep this in sync with `akita-sc/smart_contracts/inference/errors.ts` and
 * `akita-sc/smart_contracts/arc58/plugins/inference/errors.ts`: the short codes
 * are the shared wire format between contract and SDK.
 *
 * Use `translateInferenceError(code)` to turn a code back into a
 * human-readable message for display in a UI or log.
 */
export declare const INFERENCE_ERROR_MESSAGES: Record<string, string>;
/**
 * Translates an InferenceNetwork or InferencePlugin error code (or raw ARC-65
 * log entry) into a human-readable message. Falls back to the common error
 * table; unknown codes pass through as-is.
 */
export declare const translateInferenceError: (input: string) => string;

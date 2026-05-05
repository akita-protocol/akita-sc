/**
 * ARC-65 error codes emitted by the Gate contract and every sub-gate.
 *
 * The contracts log `ERR:{code}` via `loggedAssert` / `loggedErr` before
 * failing, where `code` is one of the short alphanumeric tags in this file.
 * Keep this in sync with `akita-sc/smart_contracts/gates/errors.ts` —
 * the short codes are the shared wire format between contract and SDK.
 *
 * Use `translateGateError(code)` to turn a code back into a human-readable
 * message for display in a UI or log.
 */

import { makeErrorTranslator } from '../errors'

/**
 * Short code → human-readable message for every error the Gate contract and
 * sub-gates can emit. Ordered roughly the same way as the contract-side file.
 */
export const GATES_ERROR_MESSAGES: Record<string, string> = {
  // --- Gate registry lifecycle --------------------------------------------
  IARG: 'Invalid number of arguments',
  IRGA: 'Invalid registry ID for this gate',
  EAPP: 'App already registered',
  BOPR: 'Bad operation',

  // --- Filter / evaluation ------------------------------------------------
  NGAT: 'Gate not found',
  ILYR: 'Gate filter layers must be monotonically non-decreasing',

  // --- Sub-gate specific --------------------------------------------------
  IWID: 'Invalid wallet ID provided',
}

/**
 * Translates a short Gate error code (or raw ARC-65 log entry) into a
 * human-readable message. Falls back to the common error table when the code
 * isn't domain-specific. Unknown codes pass through as-is.
 */
export const translateGateError = makeErrorTranslator(GATES_ERROR_MESSAGES)

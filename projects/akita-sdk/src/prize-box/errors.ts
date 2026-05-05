/**
 * ARC-65 error codes emitted by the PrizeBox contracts.
 *
 * The contracts log `ERR:{code}` via `loggedAssert` / `loggedErr` before
 * failing, where `code` is one of the short alphanumeric tags in this file.
 * Keep this in sync with `akita-sc/smart_contracts/prize-box/errors.ts` —
 * the short codes are the shared wire format between contract and SDK.
 *
 * Use `translatePrizeBoxError(code)` to turn a code back into a
 * human-readable message for display in a UI or log.
 */

import { makeErrorTranslator } from '../errors'

/**
 * Short code → human-readable message for every error the PrizeBox contracts
 * can emit. Ordered roughly the same way as the contract-side file.
 */
export const PRIZE_BOX_ERROR_MESSAGES: Record<string, string> = {
  // --- PrizeBox ownership / lifecycle -------------------------------------
  NOWN: 'Only the owner can perform this action',
  NEMT: 'Cannot delete application with prizes',
}

/**
 * Translates a short PrizeBox error code (or raw ARC-65 log entry) into a
 * human-readable message. Falls back to the common error table when the code
 * isn't domain-specific. Unknown codes pass through as-is.
 */
export const translatePrizeBoxError = makeErrorTranslator(PRIZE_BOX_ERROR_MESSAGES)

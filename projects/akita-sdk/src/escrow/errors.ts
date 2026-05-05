/**
 * ARC-65 error codes emitted by the Escrow contracts.
 *
 * The contracts log `ERR:{code}` via `loggedAssert` / `loggedErr` before
 * failing, where `code` is one of the short alphanumeric tags in this file.
 * Keep this in sync with `akita-sc/smart_contracts/escrow/errors.ts` — the
 * short codes are the shared wire format between contract and SDK.
 *
 * Use `translateEscrowError(code)` to turn a code back into a human-readable
 * message for display in a UI or log.
 */

import { makeErrorTranslator } from '../errors'

/**
 * Short code → human-readable message for every error the Escrow contracts
 * can emit. Ordered roughly the same way as the contract-side file.
 */
export const ESCROW_ERROR_MESSAGES: Record<string, string> = {
  // --- Escrow lifecycle ---------------------------------------------------
  OCCR: 'Only the creator can rekey a spend contract',
  OAPP: 'Only applications can create spending accounts',
  OWOP: 'Only the wallet or plugin can opt in',
  OFCD: 'Only the factory can delete the application',

  // --- Registry -----------------------------------------------------------
  NREG: 'Escrow is not registered',
  EREG: 'Escrow is already registered',
  ICRE: 'Invalid creator',
  NACT: 'Account not found',
}

/**
 * Translates a short Escrow error code (or raw ARC-65 log entry) into a
 * human-readable message. Falls back to the common error table when the code
 * isn't domain-specific. Unknown codes pass through as-is.
 */
export const translateEscrowError = makeErrorTranslator(ESCROW_ERROR_MESSAGES)

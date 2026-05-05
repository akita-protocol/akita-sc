/**
 * ARC-65 error codes emitted by the Marketplace + Listing contracts.
 *
 * The contracts log `ERR:{code}` via `loggedAssert` / `loggedErr` before
 * failing, where `code` is one of the short alphanumeric tags in this file.
 * Keep this in sync with `akita-sc/smart_contracts/marketplace/errors.ts` —
 * the short codes are the shared wire format between contract and SDK.
 *
 * Use `translateMarketplaceError(code)` to turn a code back into a
 * human-readable message for display in a UI or log.
 */

import { makeErrorTranslator } from '../errors'

/**
 * Short code → human-readable message for every error the Marketplace and
 * Listing contracts can emit. Ordered roughly the same way as the
 * contract-side file.
 */
export const MARKETPLACE_ERROR_MESSAGES: Record<string, string> = {
  // --- Listing validation -------------------------------------------------
  PRLO: 'Lowest price is 4 units for divisibility',
  MNOP: 'Marketplace must be opted into payment asset',
  NALS: 'Not a listing contract',
  IEXP: 'Invalid expiration',
  LEXP: 'Listing expired',

  // --- Payment asset ------------------------------------------------------
  PAMA: 'Payment asset must be ALGO',
  PANA: 'Payment asset must not be ALGO',

  // --- Access / delist ----------------------------------------------------
  OSCD: 'Only the seller can delist',
  RFDA: 'Reserved for a different address',
  MBSL: 'Must be the seller',

  // --- Marketplace plugin -------------------------------------------------
  NENA: 'Not enough of the asset',
  LCNM: 'Listing creator is not the marketplace',
}

/**
 * Translates a short Marketplace error code (or raw ARC-65 log entry) into a
 * human-readable message. Falls back to the common error table when the code
 * isn't domain-specific. Unknown codes pass through as-is.
 */
export const translateMarketplaceError = makeErrorTranslator(MARKETPLACE_ERROR_MESSAGES)

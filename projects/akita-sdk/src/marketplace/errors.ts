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

import { makeErrorTranslator, withErrorCodeAliases } from '../errors'

/**
 * Short code → human-readable message for every error the Marketplace and
 * Listing contracts can emit. Ordered roughly the same way as the
 * contract-side file.
 */
export const MARKETPLACE_ERROR_MESSAGES: Record<string, string> = withErrorCodeAliases({
  // --- Listing validation -------------------------------------------------
  PRLO: 'Price is too low: the lowest is 4 units, and the fee and royalty shares must fit inside it',
  RAMX: 'The creator royalty is above the highest royalty the seller accepted',
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

  // --- Legacy-payment float (principal resolution) -------------------------
  LFLT: 'Marketplace float reserve too low for a legacy-paid listing; pay the full listCost',

  // --- Marketplace plugin -------------------------------------------------
  NENA: 'Not enough of the asset',
  LCNM: 'Listing creator is not the marketplace',
  PAMX: 'Listing price is above the buyer maxPrice',
})

/**
 * Translates a short Marketplace error code (or raw ARC-65 log entry) into a
 * human-readable message. Falls back to the common error table when the code
 * isn't domain-specific. Unknown codes pass through as-is.
 */
export const translateMarketplaceError = makeErrorTranslator(MARKETPLACE_ERROR_MESSAGES)

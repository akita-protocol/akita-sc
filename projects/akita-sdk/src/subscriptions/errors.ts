/**
 * ARC-65 error codes emitted by the Subscriptions contract.
 *
 * The contract logs `ERR:{code}` via `loggedAssert` / `loggedErr` before
 * failing, where `code` is one of the short alphanumeric tags in this file.
 * Keep this in sync with `akita-sc/smart_contracts/subscriptions/errors.ts` —
 * the short codes are the shared wire format between contract and SDK.
 *
 * Use `translateSubscriptionsError(code)` to turn a code back into a
 * human-readable message for display in a UI or log.
 */

import { makeErrorTranslator } from '../errors'

/**
 * Short code → human-readable message for every error the Subscriptions
 * contract can emit. Ordered roughly the same way as the contract-side file.
 */
export const SUBSCRIPTIONS_ERROR_MESSAGES: Record<string, string> = {
  // --- Input validation ---------------------------------------------------
  MAMT: 'Minimum amount is 3 base units',
  MINV: 'Minimum interval is 60 seconds',
  MXPS: 'Maximum number of passes is five',
  TTLG: 'Title exceeds maximum length',
  BDLN: 'Description length exceeds maximum',
  BOFS: 'Invalid description offset',
  BWIN: 'Invalid payment window',

  // --- Services -----------------------------------------------------------
  SIAZ: 'Service indexes are always above zero',
  SDNE: 'Service does not exist',
  SNDR: 'Service offering is not in draft status',
  SNAC: 'Service offering is not active',
  SNPA: 'Service offering is not paused',
  SSHD: 'Service offering is shutdown',
  SNAV: 'Service not activated',
  NSVC: 'Not a service',

  // --- Subscriptions ------------------------------------------------------
  UDNE: 'Subscription does not exist',
  CTRG: 'Cannot trigger payment at this time',
  NEFN: 'Not enough funds in escrow',
  NODN: "Donations aren't applicable to passes",
  PCOF: 'More addresses than available passes',

  // --- Blocking -----------------------------------------------------------
  UABL: 'User is already blocked',
  UNBL: 'User is not blocked',

  // --- Group / call-order -------------------------------------------------
  GIOB: 'Group index out of bounds',
  ISEQ: 'Invalid sequence of calls in group',

  // --- Subscriptions plugin -----------------------------------------------
  DNIT: 'Description has not been initialized',
}

/**
 * Translates a short Subscriptions error code (or raw ARC-65 log entry) into
 * a human-readable message. Falls back to the common error table when the
 * code isn't domain-specific. Unknown codes pass through as-is.
 */
export const translateSubscriptionsError = makeErrorTranslator(SUBSCRIPTIONS_ERROR_MESSAGES)

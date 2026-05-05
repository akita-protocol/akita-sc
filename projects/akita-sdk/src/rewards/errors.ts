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

import { makeErrorTranslator } from '../errors'

/**
 * Short code → human-readable message for every error the Rewards contract
 * can emit. Ordered roughly the same way as the contract-side file.
 */
export const REWARDS_ERROR_MESSAGES: Record<string, string> = {
  // --- Plugin / wallet ----------------------------------------------------
  PNCW: 'Plugin does not control wallet',

  // --- Token allocation boxes --------------------------------------------
  TABE: 'Token allocation box already exists',
  TBNE: 'Token allocation box does not exist',

  // --- Disbursement authorization ----------------------------------------
  YNCR: 'You are not the creator of this disbursement',

  // --- Asset opt-in -------------------------------------------------------
  ANOI: 'App is not opted into asset',

  // --- Disbursement lifecycle --------------------------------------------
  DBNE: 'Disbursement does not exist',
  DBAF: 'Disbursement already final',
  DBLK: 'Disbursement is locked',
  DBFD: 'Disbursement is fully distributed',
  DBNX: 'Disbursement has not expired',

  // --- Disbursement validation -------------------------------------------
  IDUT: 'Invalid disbursement unlock time',
  IDXT: 'Invalid disbursement expiration time',
  DBEM: 'Disbursements cannot be empty',
  DBMA: 'Disbursements must have allocations',

  // --- Allocations --------------------------------------------------------
  ALAE: 'Allocation already exists',
  ALNE: 'Allocation does not exist',

  // --- Totals -------------------------------------------------------------
  ISUM: 'Invalid sum',
  IMBR: 'Invalid MBR amount',
}

/**
 * Translates a short Rewards error code (or raw ARC-65 log entry) into a
 * human-readable message. Falls back to the common error table when the code
 * isn't domain-specific. Unknown codes pass through as-is.
 */
export const translateRewardsError = makeErrorTranslator(REWARDS_ERROR_MESSAGES)

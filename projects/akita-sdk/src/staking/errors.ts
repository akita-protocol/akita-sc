/**
 * ARC-65 error codes emitted by the Staking contract.
 *
 * The contract logs `ERR:{code}` via `loggedAssert` / `loggedErr` before
 * failing, where `code` is one of the short alphanumeric tags in this file.
 * Keep this in sync with `akita-sc/smart_contracts/staking/errors.ts` —
 * the short codes are the shared wire format between contract and SDK.
 *
 * Use `translateStakingError(code)` to turn a code back into a human-readable
 * message for display in a UI or log.
 */

import { makeErrorTranslator } from '../errors'

/**
 * Short code → human-readable message for every error the Staking contract
 * can emit. Ordered roughly the same way as the contract-side file.
 */
export const STAKING_ERROR_MESSAGES: Record<string, string> = {
  // --- Lock lifecycle -----------------------------------------------------
  NLCK: 'Lock not found',
  LOCK: 'This asset is still locked',
  BEXP: 'Expiration must be in the future or hardlock disabled',
  BEXU: 'Expiration must be greater than or equal to the current unlock time or hardlock disabled',

  // --- Stake lifecycle ----------------------------------------------------
  SNFD: 'Stake not found',
  SNEX: 'Stake does not exist',
  BAMH: 'Insufficient amount held',
  IBAL: 'Insufficient balance',
  WHOL: 'Withdraw is only for hard or lock',

  // --- Heartbeat ----------------------------------------------------------
  HBCU: 'Heartbeat stakes cannot be updated',
  NHBM: 'Only the heartbeat manager can call this method',
  HBNF: 'Heartbeat not found',
}

/**
 * Translates a short Staking error code (or raw ARC-65 log entry) into a
 * human-readable message. Falls back to the common error table when the code
 * isn't domain-specific. Unknown codes pass through as-is.
 */
export const translateStakingError = makeErrorTranslator(STAKING_ERROR_MESSAGES)

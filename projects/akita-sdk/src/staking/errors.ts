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

import { makeErrorTranslator, withErrorCodeAliases } from '../errors'

/**
 * Short code → human-readable message for every error the Staking contract
 * can emit. Ordered roughly the same way as the contract-side file.
 */
export const STAKING_ERROR_MESSAGES: Record<string, string> = withErrorCodeAliases({
  // --- Lock lifecycle -----------------------------------------------------
  NLCK: 'Lock not found',
  LOCK: 'This asset is still locked',
  BEXP: 'Expiration must be in the future or hardlock disabled',
  BEXU: 'Expiration must be greater than or equal to the current unlock time or hardlock disabled',

  // --- Stake lifecycle ----------------------------------------------------
  INIT: 'Staking is already initialized',
  SNFD: 'Stake not found',
  SNEX: 'Stake does not exist',
  BAMH: 'Insufficient amount held',
  IBAL: 'Insufficient balance',
  ACRQ: 'App commitment must be created by an app call',
  WHOL: 'Withdraw is only for hard or lock',

  // --- Heartbeat ----------------------------------------------------------
  HBCU: 'Heartbeat stakes cannot be updated',
  NHBM: 'Only the heartbeat manager can call this method',
  HBNF: 'Heartbeat not found',

  // --- 2026-10 audit fixes ------------------------------------------------
  NCRE: 'Only the creator can call this method',
  ISTP: 'Invalid stake type',
  ILKS: 'Max-lockup setting must be between 2 weeks and 4 years',
  LKDC: 'Max-lockup setting cannot decrease',
  ASIU: 'App commitment can only be released by its app, or by its owner once the app is deleted',
})

/**
 * Translates a short Staking error code (or raw ARC-65 log entry) into a
 * human-readable message. Falls back to the common error table when the code
 * isn't domain-specific. Unknown codes pass through as-is.
 */
export const translateStakingError = makeErrorTranslator(STAKING_ERROR_MESSAGES)

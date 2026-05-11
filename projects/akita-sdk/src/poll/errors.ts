/**
 * ARC-65 error codes emitted by the Poll contracts.
 *
 * The contract logs `ERR:{code}` via `loggedAssert` / `loggedErr` before
 * failing, where `code` is one of the short alphanumeric tags in this file.
 * Keep this in sync with `akita-sc/smart_contracts/poll/errors.ts` —
 * the short codes are the shared wire format between contract and SDK.
 *
 * Use `translatePollError(code)` to turn a code back into a human-readable
 * message for display in a UI or log.
 */

import { makeErrorTranslator } from '../errors'

/**
 * Short code → human-readable message for every error the Poll contracts
 * can emit. Ordered roughly the same way as the contract-side file.
 */
export const POLL_ERROR_MESSAGES: Record<string, string> = {
  // --- Poll configuration -------------------------------------------------
  IETM: 'End time must be in the future',
  IPTY: 'Invalid poll type',
  IOPC: 'Invalid number of options, must be between 2 and 5',
  IMXS: 'Invalid maximum selection',

  // --- Poll lifecycle -----------------------------------------------------
  PEND: 'Poll has ended',
  PACT: 'Poll is still active',
  NAPL: 'App is not a poll created by this factory',
  SHVB: 'Poll still has vote boxes',
  MCFF: 'Method must be called from poll factory',

  // --- Voting -------------------------------------------------------------
  AVOT: 'User has already voted',
  IVOT: 'Invalid vote args',
  IVCT: 'Invalid number of vote args',
  IVOP: 'Invalid vote option',
  NVOT: 'User has not voted',

  // --- Poll plugin --------------------------------------------------------
  NPLF: 'Creator is not the poll factory',
}

/**
 * Translates a short Poll error code (or raw ARC-65 log entry) into a
 * human-readable message. Falls back to the common error table when the code
 * isn't domain-specific. Unknown codes pass through as-is.
 */
export const translatePollError = makeErrorTranslator(POLL_ERROR_MESSAGES)

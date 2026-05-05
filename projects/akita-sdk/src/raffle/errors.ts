/**
 * ARC-65 error codes emitted by the Raffle contract (and factory).
 *
 * The contract logs `ERR:{code}` via `loggedAssert` / `loggedErr` before
 * failing, where `code` is one of the short alphanumeric tags in this file.
 * Keep this in sync with `akita-sc/smart_contracts/raffle/errors.ts` —
 * the short codes are the shared wire format between contract and SDK.
 *
 * Use `translateRaffleError(code)` to turn a code back into a human-readable
 * message for display in a UI or log.
 */

import { makeErrorTranslator } from '../errors'

/**
 * Short code → human-readable message for every error the Raffle contract
 * (and factory) can emit. Ordered roughly the same way as the contract-side file.
 */
export const RAFFLE_ERROR_MESSAGES: Record<string, string> = {
  // --- Raffle lifecycle ---------------------------------------------------
  IENR: 'Ending round must be in the future',
  NLIV: 'Raffle is not live',
  RHNE: 'Raffle has not ended',
  NEND: 'Raffle has not ended',
  NETM: 'Not enough time has passed since the raffle ended',

  // --- Ticket asset / amounts --------------------------------------------
  TANA: 'Ticket asset is not ALGO',
  TAAL: 'Ticket asset is ALGO',
  BMIN: 'Amount is below minimum',
  AMAX: 'Amount is above maximum',
  IRCV: 'Invalid receiver',
  IMBA: 'Invalid MBR amount',
  IMBR: 'Invalid MBR recipient',

  // --- Gate / method enforcement -----------------------------------------
  BMGN: 'Bad method; gate needed',

  // --- Entries -----------------------------------------------------------
  AENT: 'You have already entered the raffle',
  EDNE: 'Entry does not exist',

  // --- Winner / draw -----------------------------------------------------
  FTGS: 'Failed to get seed',
  WAFD: 'Winner has already been found',
  WADR: 'Winning ticket has already been drawn',
  WNFD: 'Winner not found',
  NWTY: 'No winning ticket yet',

  // --- Prize / refunds ---------------------------------------------------
  PACL: 'Prize has already been claimed',
  PNCL: 'Prize has not been claimed',
  ARFC: 'All refunds have been completed',
  RFNC: 'Refunds have not been completed',
  TNRC: 'Tickets have not been reclaimed',
  BNCL: 'Boxes are not cleared',
  SHWB: 'Still has weights boxes',

  // --- Weights allocation ------------------------------------------------
  MALF: 'Must allocate at least four weights chunks',
  MAMF: 'Must allocate at most fifteen weights chunks',

  // --- Factory / misc ----------------------------------------------------
  MNOT: 'Factory not opted into ticket asset',
  ACNF: 'App creator not found',
  NRAF: 'Not a raffle',

  // --- Raffle plugin -----------------------------------------------------
  NENA: 'Not enough of the asset',
  CNRF: 'Creator is not the raffle factory',
}

/**
 * Translates a short Raffle error code (or raw ARC-65 log entry) into a
 * human-readable message. Falls back to the common error table when the code
 * isn't domain-specific. Unknown codes pass through as-is.
 */
export const translateRaffleError = makeErrorTranslator(RAFFLE_ERROR_MESSAGES)

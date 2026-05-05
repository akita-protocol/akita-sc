/**
 * ARC-65 error codes emitted by the Auction contracts.
 *
 * The contracts log `ERR:{code}` via `loggedAssert` / `loggedErr` before
 * failing, where `code` is one of the short alphanumeric tags in this file.
 * Keep this in sync with `akita-sc/smart_contracts/auction/errors.ts` —
 * the short codes are the shared wire format between contract and SDK.
 *
 * Use `translateAuctionError(code)` to turn a code back into a
 * human-readable message for display in a UI or log.
 */

import { makeErrorTranslator } from '../errors'

/**
 * Short code → human-readable message for every error the Auction contracts
 * can emit. Ordered roughly the same way as the contract-side file.
 */
export const AUCTION_ERROR_MESSAGES: Record<string, string> = {
  // --- Factory setup validation -------------------------------------------
  BINC: 'Bids must always increase',
  MNOP: 'Marketplace must be opted into payment asset',
  EMFM: 'Ending round must be at least 100 rounds after starting',
  ACNF: 'App creator not found',
  NAUC: 'Not an auction',

  // --- Auction setup ------------------------------------------------------
  NAPP: 'Not applicable to this auction',
  M3HB: 'Must allocate at least three highest bids chunks',

  // --- Auction lifecycle --------------------------------------------------
  ANLV: 'Auction is not live',
  AHNE: 'Auction has not ended',
  AAST: 'Auction has already started',
  NETM: 'Not enough time has passed',

  // --- Prize claim --------------------------------------------------------
  PACL: 'Prize already claimed',
  PZNC: 'Prize not claimed',

  // --- Highest bid gathering ----------------------------------------------
  HBAG: 'Highest bids already gathered',
  HBNG: 'Highest bids not gathered',

  // --- Bids ---------------------------------------------------------------
  CRMR: 'Cannot refund most recent bid',
  BNFD: 'Bid not found',
  BEXS: 'Bid already exists',
  BARF: 'Bid already refunded',
  TMPT: 'Too many participants',

  // --- Raffle winner ------------------------------------------------------
  WADR: 'Winner already drawn',
  WNNF: 'Winning number not found',
  WAFD: 'Winner already found',
  WNFD: 'Winner not found',
  RNPC: 'Raffle not prize claimed',
  RAPC: 'Raffle prize already claimed',
  RWNF: 'Raffle winner not found',
  RWHC: 'Raffle winner has not claimed',

  // --- Refunds / cleanup --------------------------------------------------
  ARFC: 'All refunds complete',
  NARC: 'Not all refunds complete',
  SHBB: 'Still has highest bids boxes',

  // --- Auction plugin -----------------------------------------------------
  NENA: 'Not enough of the asset',
  PCBA: 'Auction prize cannot be ALGO',
  CNAF: 'Creator is not the auction factory',
}

/**
 * Translates a short Auction error code (or raw ARC-65 log entry) into a
 * human-readable message. Falls back to the common error table when the code
 * isn't domain-specific. Unknown codes pass through as-is.
 */
export const translateAuctionError = makeErrorTranslator(AUCTION_ERROR_MESSAGES)

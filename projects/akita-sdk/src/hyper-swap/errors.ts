/**
 * ARC-65 error codes emitted by the HyperSwap contract.
 *
 * The contract logs `ERR:{code}` via `loggedAssert` / `loggedErr` before
 * failing, where `code` is one of the short alphanumeric tags in this file.
 * Keep this in sync with `akita-sc/smart_contracts/hyper-swap/errors.ts` —
 * the short codes are the shared wire format between contract and SDK.
 *
 * Use `translateHyperSwapError(code)` to turn a code back into a
 * human-readable message for display in a UI or log.
 */

import { makeErrorTranslator } from '../errors'

/**
 * Short code → human-readable message for every error the HyperSwap contract
 * can emit. Ordered roughly the same way as the contract-side file.
 */
export const HYPER_SWAP_ERROR_MESSAGES: Record<string, string> = {
  // --- Offer validation ---------------------------------------------------
  BROT: 'Offer and participants roots cannot be the same',
  OFEX: 'Offer has expired',
  NOFR: 'Offer not found',

  // --- Participants -------------------------------------------------------
  NPRT: 'Not a participant in this swap',
  EACC: 'Already accepted this offer',
  NPFD: 'Participant not found',
  PNCL: 'All participants must be cleaned up first',

  // --- State machine ------------------------------------------------------
  ISTE: 'Offer is in the wrong state for this action',
  NACP: 'Must have accepted to cancel',

  // --- Escrow / leaves ----------------------------------------------------
  CVLF: 'Cannot verify leaf',
  LAES: 'Leaf is already escrowed',
  LNES: 'Leaf is not escrowed',
  NTWD: 'Nothing to withdraw',

  // --- Disbursal ----------------------------------------------------------
  RNOI: 'Receiver is not opted into asset',
  RWMM: 'Receiver wallet address does not match receiver',
}

/**
 * Translates a short HyperSwap error code (or raw ARC-65 log entry) into a
 * human-readable message. Falls back to the common error table when the code
 * isn't domain-specific. Unknown codes pass through as-is.
 */
export const translateHyperSwapError = makeErrorTranslator(HYPER_SWAP_ERROR_MESSAGES)

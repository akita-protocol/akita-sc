/**
 * ARC-65 error codes emitted by the DAO contracts.
 *
 * The contracts log `ERR:{code}` via `loggedAssert` / `loggedErr` before
 * failing, where `code` is one of the short alphanumeric tags in this file.
 * Keep this in sync with `akita-sc/smart_contracts/arc58/dao/errors.ts` — the
 * short codes are the shared wire format between contract and SDK.
 *
 * Use `translateDaoError(code)` to turn a code back into a human-readable
 * message for display in a UI or log.
 */

/**
 * Short code → human-readable message for every error the DAO contracts can
 * emit. Ordered roughly the same way as the contract-side file.
 */
export const DAO_ERROR_MESSAGES: Record<string, string> = {
  // --- Top-level aliases ---------------------------------------------------
  NDAO: 'Not the Akita DAO',
  IPAY: 'Invalid payment',

  // --- Account-scoped aliases ---------------------------------------------
  FORB: 'Forbidden',
  IUPG: 'Invalid upgrade',
  WSUP: 'Wallet already set up',
  NEXK: 'Execution key not found',
  EALW: 'Allowance already exists',
  NALW: 'Allowance does not exist',
  EESC: 'Escrow already exists',
  NESC: 'Escrow does not exist',

  // --- DAO errors ----------------------------------------------------------
  NINIT: 'DAO is not initialized',
  NACT: 'Action list cannot be empty',
  ISND: 'Incorrect sender',
  LPOW: 'Insufficient proposal threshold',
  IACT: 'Invalid proposal action',
  IPST: 'Invalid proposal state',
  NPAY: 'Payment not required',
  RPAY: 'Payment required',
  NPRP: 'Proposal does not exist',
  NPVT: 'Proposal vote not found',
  MXAC: 'Too many actions in the proposal',
  VDUR: 'Voting duration not met',
  VPRT: 'Voting participation not met',
  INIT: 'Already initialized',
  IVER: 'Version cannot be empty',

  // --- Validator errors ----------------------------------------------------
  ALZ0: 'Action limit must be greater than zero',
  LEMP: 'Allowance list cannot be empty',
  ICID: 'Invalid CID',
  IDUR: 'Invalid duration',
  IMXA: 'Invalid maximum approval percentage',
  IMXP: 'Invalid maximum participation percentage',
  IMXW: 'Invalid maximum power',
  IMNA: 'Invalid minimum approval percentage',
  IMNP: 'Invalid minimum participation percentage',
  IMNW: 'Invalid minimum power',
  IMRI: 'Invalid minimum rewards impact',
  IPAL: 'Invalid proposal action limit',
  MRI0: 'Minimum rewards impact must be greater than zero',
  MRI1K: 'Minimum rewards impact must be less than or equal to 1000',
  NEXE: 'Plugin is not executable',
  EPLG: 'Plugin already exists',
  NPLG: 'Plugin does not exist',
  PEXP: 'Plugin has expired',

  // --- Validator inline-string constants ----------------------------------
  NGRP: 'Upgrade app action must have at least one group',
  IFV: 'First valid round must be greater than zero',
  ILV: 'Last valid round must be greater than first valid',
  UFLD: 'Unknown field in update fields proposal action',
}

/** Prefix the contracts write to the log ahead of the code (ARC-65). */
const ARC65_PREFIX = 'ERR:'
/** Alternate prefix ARC-65 allows for application errors. */
const ARC65_ALT_PREFIX = 'AER:'

/**
 * Extracts the short code from an ARC-65 log entry.
 *
 * Accepts either the raw code (`NPRP`), a full ARC-65 log line
 * (`ERR:NPRP` / `AER:NPRP`), or an entry with an appended message
 * (`ERR:NPRP:Proposal does not exist`).
 *
 * Returns `undefined` if the input isn't a recognizable ARC-65 error string.
 */
export function parseDaoErrorCode(input: string): string | undefined {
  if (!input) return undefined

  let rest = input
  if (rest.startsWith(ARC65_PREFIX)) rest = rest.slice(ARC65_PREFIX.length)
  else if (rest.startsWith(ARC65_ALT_PREFIX)) rest = rest.slice(ARC65_ALT_PREFIX.length)

  const code = rest.split(':', 1)[0]?.trim()
  if (!code) return undefined
  return code in DAO_ERROR_MESSAGES ? code : undefined
}

/**
 * Translates a short DAO error code (or raw ARC-65 log entry) into a
 * human-readable message. Unknown codes pass through as-is so the caller
 * still sees *something* useful.
 */
export function translateDaoError(input: string): string {
  const code = parseDaoErrorCode(input)
  if (code !== undefined) return DAO_ERROR_MESSAGES[code]
  return input
}

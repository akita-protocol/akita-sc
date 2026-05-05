/**
 * ARC-65 error codes emitted by the AbstractedAccount (wallet) contracts.
 *
 * The contracts log `ERR:{code}` via `loggedAssert` / `loggedErr` before
 * failing, where `code` is one of the short alphanumeric tags in this file.
 * Keep this in sync with `akita-sc/smart_contracts/arc58/account/errors.ts` —
 * the short codes are the shared wire format between contract and SDK.
 *
 * Use `translateWalletError(code)` to turn a code back into a human-readable
 * message for display in a UI or log.
 */

/**
 * Short code → human-readable message for every error the AbstractedAccount
 * contracts can emit. Ordered roughly the same way as the contract-side file.
 */
export const WALLET_ERROR_MESSAGES: Record<string, string> = {
  // --- Admin / authorization ---------------------------------------------
  ADMN: 'Admin only',
  FORB: 'Forbidden',
  ACBC: 'Admin and controlled address cannot be the same',
  SADM: 'Sender must be either controlledAddress or admin',
  SMAP: 'Sender must be admin plugin',
  OCCR: 'Only the creator can rekey a spend contract',
  OAPP: 'Only applications can create spending accounts',
  OWOP: 'Only the wallet or plugin can opt in',
  OFCD: 'Only the factory can delete the application',

  // --- Admin-gated setters -----------------------------------------------
  OACU: 'Only an admin can update the application',
  OACR: 'Only an admin can change the revocation app',
  OACD: 'Only an admin can change the Akita DAO',
  OACA: 'Only an admin can change the admin account',
  OACK: 'Only an admin can rekey the account',
  OAAP: 'Only an admin can add a plugin',
  OAMR: 'Only an admin can add a method restriction',
  OACN: 'Only an admin can change the nickname',
  OARP: 'Only an admin or revocation app can remove plugins',
  OARM: 'Only an admin or revocation app can remove method restrictions',
  OARA: 'Only an admin or revocation app can remove allowances',

  // --- Deployment / lifecycle --------------------------------------------
  BDEP: 'This contract must be deployed from a factory',
  IUPG: 'Invalid upgrade',
  WSUP: 'Wallet already set up',

  // --- Plugins ------------------------------------------------------------
  NPLG: 'Plugin does not exist',
  EPLG: 'Plugin already exists',
  ENPL: 'A plugin with this name already exists',
  PEXP: 'Plugin has expired',
  PCLD: 'Plugin is on cooldown',
  IPCL: 'Invalid plugin call',
  SNAP: 'This sender is not allowed to trigger this plugin',
  PDCW: 'This plugin is not in control of the account',
  PDAP: 'This plugin does not have admin privileges',
  APNE: 'Admin plugins cannot use escrows',
  ZADT: 'Delegation type must not be self for global plugins',
  UEKG: 'Using an execution key requires a global plugin',

  // --- Methods ------------------------------------------------------------
  NMTH: 'Method does not exist',
  EMTH: 'Method already exists',
  MCLD: 'Method is on cooldown',
  IMSL: 'Invalid method signature length',
  MOFF: 'Malformed method offsets',

  // --- Rekey sandwich -----------------------------------------------------
  NRKB: 'Missing rekey back',
  CCOR: 'Cannot call other apps during rekey',
  IOCN: 'Invalid on-completion, must be NoOp',
  ISAG: 'Invalid sender arg, must be this app ID',
  ISVL: 'Invalid sender value, wrong app ID',
  AUAM: 'Auth address does not match this app',

  // --- Execution keys -----------------------------------------------------
  NEXK: 'Execution key not found',
  EXNR: 'Execution key not ready',
  EXXP: 'Execution key expired',
  NGRP: 'Group not found',
  EKFV: 'Execution key update must match first valid',
  EKLV: 'Execution key update must match last valid',

  // --- Escrows ------------------------------------------------------------
  ESCL: 'Escrow is locked',
  EESC: 'Escrow already exists',
  ENRQ: 'Escrow name is required',
  NESC: 'Escrow does not exist',
  WESC: 'Wrong escrow for this operation',
  ERSD: 'Escrow must be set if defaultToEscrow is true',

  // --- Allowances ---------------------------------------------------------
  EALW: 'Allowance already exists',
  NALW: 'Allowance does not exist',
  ALEX: 'Allowance exceeded',

  // --- Domain keys --------------------------------------------------------
  DML0: 'Domain must not be length 0',
  NDMK: 'Domain key does not exist',

  // --- Payments -----------------------------------------------------------
  IPAY: 'Invalid payment',
}

/** Prefix the contracts write to the log ahead of the code (ARC-65). */
const ARC65_PREFIX = 'ERR:'
/** Alternate prefix ARC-65 allows for application errors. */
const ARC65_ALT_PREFIX = 'AER:'

/**
 * Extracts the short code from an ARC-65 log entry.
 *
 * Accepts either the raw code (`NPLG`), a full ARC-65 log line
 * (`ERR:NPLG` / `AER:NPLG`), or an entry with an appended message
 * (`ERR:NPLG:Plugin does not exist`).
 *
 * Returns `undefined` if the input isn't a recognizable ARC-65 error string.
 */
export function parseWalletErrorCode(input: string): string | undefined {
  if (!input) return undefined

  let rest = input
  if (rest.startsWith(ARC65_PREFIX)) rest = rest.slice(ARC65_PREFIX.length)
  else if (rest.startsWith(ARC65_ALT_PREFIX)) rest = rest.slice(ARC65_ALT_PREFIX.length)

  const code = rest.split(':', 1)[0]?.trim()
  if (!code) return undefined
  return code in WALLET_ERROR_MESSAGES ? code : undefined
}

/**
 * Translates a short wallet error code (or raw ARC-65 log entry) into a
 * human-readable message. Unknown codes pass through as-is so the caller
 * still sees *something* useful.
 */
export function translateWalletError(input: string): string {
  const code = parseWalletErrorCode(input)
  if (code !== undefined) return WALLET_ERROR_MESSAGES[code]
  return input
}

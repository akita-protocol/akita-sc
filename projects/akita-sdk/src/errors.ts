/**
 * ARC-65 error codes SHARED across all Akita contracts.
 *
 * The contracts log `ERR:{code}` via `loggedAssert` / `loggedErr` before
 * failing, where `code` is one of the short alphanumeric tags in this file.
 * Keep this in sync with `akita-sc/smart_contracts/errors.ts` — the short
 * codes are the shared wire format between contract and SDK.
 * Tables include both current camelCase codes and legacy uppercase aliases.
 *
 * Domain-specific codes live alongside each SDK domain (e.g.
 * `akita-sdk/src/auction/errors.ts`). Every domain translator falls back to
 * this map first so that cross-domain codes round-trip through any
 * contract that emits them.
 *
 * Use `translateCommonError(code)` to turn a code back into a human-readable
 * message for display in a UI or log.
 */

/**
 * Add current camelCase codes alongside the legacy uppercase codes.
 * The `err` prefix keeps short codes away from 8-byte ARC-65 log messages.
 * Existing table keys and explicit aliases are preserved for older deployments.
 */
export function withErrorCodeAliases(messages: Record<string, string>): Record<string, string> {
  const result = { ...messages }
  for (const [code, message] of Object.entries(messages)) {
    if (/^[A-Z][A-Z0-9]+$/.test(code)) {
      const alias = `err${code[0]}${code.slice(1).toLowerCase()}`
      result[alias] ??= message
    }
  }
  return result
}

/**
 * Short code → human-readable message for errors that can be emitted from
 * multiple contract domains. Kept stable so cross-domain errors decode the
 * same way no matter which translator is asked.
 */
export const COMMON_ERROR_MESSAGES: Record<string, string> = withErrorCodeAliases({
  // --- Admin / authorization ----------------------------------------------
  NDAO: 'Not the Akita DAO',
  ICAL: 'Invalid caller',
  FORB: 'Forbidden',
  MBFF: 'Must be called from the factory',
  NCRE: 'Not the creator',
  GNFF: 'Guild was not created by the configured factory',
  GCLE: 'The cost is above the limit set when this was prepared',

  // --- Lifecycle -----------------------------------------------------------
  IUPG: 'Invalid upgrade',
  BDEP: 'Bad deployer; must be called from a factory',

  // --- Payments / transfers ----------------------------------------------
  IPAY: 'Invalid payment',
  IPMA: 'Invalid payment amount',
  IPMR: 'Invalid payment receiver',
  IXFR: 'Invalid transfer',
  IAAM: 'Invalid asset amount',
  IARE: 'Invalid asset receiver',
  IPMS: 'Payment or transfer was not sent by the expected account',
  IPYR: 'This record was funded by another account; top-ups must come from that same account',
  GPYR: 'This proposal was funded by another account; top-ups must come from that same account',
  NCLW: 'Clawback transfers are not accepted',
  NCLS: 'Transfers that close out the sender are not accepted',
  NRKY: 'Transfers that rekey the sender are not accepted',

  // --- Asset / app validation --------------------------------------------
  IAST: 'Invalid asset',
  IAPP: 'Invalid app',
  ASAM: 'Asset mismatch',
  NACR: 'Not the asset creator',

  // --- Plugin / wallet ----------------------------------------------------
  NATH: 'This plugin does not have control of the account',
  IWLT: 'Wallet app is missing a valid controlled address',

  // --- Principal resolution (wallet hints) -------------------------------
  HNWL: 'Wallet hint is not a genuine Akita wallet',
  HTOP: 'A wallet hint cannot be used on a top-level call',
  HNBD: 'Wallet hint is neither the calling wallet nor the wallet whose plugin window holds the sender',
  HNOW: 'Wallet hint does not own this account',

  // --- Gates --------------------------------------------------------------
  FGTE: 'Gate check failed',

  // --- Program loading ------------------------------------------------------
  PTLG: 'Program exceeds the 8-page (16 KB) AVM limit',

  // --- Opt-in -------------------------------------------------------------
  AOPT: 'Already opted in',
  NOPT: 'Not opted in',

  // --- Blocking (shared with social graph) --------------------------------
  BLKD: 'Blocked',

  // --- Random utility ------------------------------------------------------
  IRSD: 'Invalid random seed',
  IRLN: 'Invalid random length',
  IRBS: 'Invalid random bit size',
  IRBD: 'Invalid random bounds',
})

/** Prefix the contracts write to the log ahead of the code (ARC-65). */
export const ARC65_PREFIX = 'ERR:'
/** Alternate prefix ARC-65 allows for application errors. */
export const ARC65_ALT_PREFIX = 'AER:'

/**
 * Extracts the short code from an ARC-65 log entry.
 *
 * Accepts either the raw code (`FORB`), a full ARC-65 log line
 * (`ERR:FORB` / `AER:FORB`), or an entry with an appended message
 * (`ERR:FORB:Forbidden`).
 *
 * Returns `undefined` if the input does not look like an ARC-65 code.
 */
export function parseArc65Code(input: string): string | undefined {
  if (!input) return undefined

  let rest = input
  if (rest.startsWith(ARC65_PREFIX)) rest = rest.slice(ARC65_PREFIX.length)
  else if (rest.startsWith(ARC65_ALT_PREFIX)) rest = rest.slice(ARC65_ALT_PREFIX.length)

  const code = rest.split(':', 1)[0]?.trim()
  if (!code) return undefined
  return code
}

/**
 * Translates a short error code (or raw ARC-65 log entry) against the common
 * message table. Unknown codes pass through as-is so the caller still sees
 * *something* useful.
 */
export function translateCommonError(input: string): string {
  const code = parseArc65Code(input)
  if (code !== undefined && code in COMMON_ERROR_MESSAGES) return COMMON_ERROR_MESSAGES[code]
  return input
}

/**
 * Build a translator for a per-domain error table that falls back to the
 * common table when the code is not domain-specific.
 *
 * Each domain exports its own `translate{Domain}Error` built from this.
 */
export function makeErrorTranslator(
  domainTable: Record<string, string>,
): (input: string) => string {
  return (input: string): string => {
    const code = parseArc65Code(input)
    if (code !== undefined) {
      if (code in domainTable) return domainTable[code]
      if (code in COMMON_ERROR_MESSAGES) return COMMON_ERROR_MESSAGES[code]
    }
    return input
  }
}

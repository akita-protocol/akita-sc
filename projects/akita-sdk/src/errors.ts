/**
 * ARC-65 error codes SHARED across all Akita contracts.
 *
 * The contracts log `ERR:{code}` via `loggedAssert` / `loggedErr` before
 * failing, where `code` is one of the short alphanumeric tags in this file.
 * Keep this in sync with `akita-sc/smart_contracts/errors.ts` — the short
 * codes are the shared wire format between contract and SDK.
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
 * Short code → human-readable message for errors that can be emitted from
 * multiple contract domains. Kept stable so cross-domain errors decode the
 * same way no matter which translator is asked.
 */
export const COMMON_ERROR_MESSAGES: Record<string, string> = {
  // --- Admin / authorization ----------------------------------------------
  NDAO: 'Not the Akita DAO',
  ICAL: 'Invalid caller',
  FORB: 'Forbidden',
  MBFF: 'Must be called from the factory',
  NCRE: 'Not the creator',

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

  // --- Asset / app validation --------------------------------------------
  IAST: 'Invalid asset',
  IAPP: 'Invalid app',
  ASAM: 'Asset mismatch',
  NACR: 'Not the asset creator',

  // --- Plugin / wallet ----------------------------------------------------
  NATH: 'This plugin does not have control of the account',

  // --- Gates --------------------------------------------------------------
  FGTE: 'Gate check failed',

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
}

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

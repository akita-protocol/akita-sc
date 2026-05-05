/**
 * ARC-65 error codes emitted by the AkitaSocial contracts.
 *
 * The contracts log `ERR:{code}` via `loggedAssert` / `loggedErr` before
 * failing, where `code` is one of the short alphanumeric tags in this file.
 * Keep this in sync with `akita-sc/smart_contracts/social/errors.ts` — the
 * short codes are the shared wire format between contract and SDK.
 *
 * Use `translateSocialError(code)` to turn a code back into a human-readable
 * message for display in a UI or log.
 */

/**
 * Short code → human-readable message for every error the AkitaSocial
 * contracts can emit. Ordered roughly the same way as the contract-side file.
 */
export const SOCIAL_ERROR_MESSAGES: Record<string, string> = {
  // --- Top-level / shared aliases -----------------------------------------
  NDAO: 'Not the Akita DAO',
  IPAY: 'Invalid payment',
  IXFR: 'Invalid transfer',
  FGTE: 'Failed gate',

  // --- Plugin aliases ------------------------------------------------------
  AOPT: 'Already opted in',

  // --- Subscriptions alias -------------------------------------------------
  UNBK: 'User not blocked',

  // --- Moderation errors ---------------------------------------------------
  NMOD: 'Not a moderator',
  EMOD: 'Already a moderator',
  EBAN: 'Already banned',
  NBAN: 'User not banned',
  BAND: 'Account is banned',
  EACT: 'Action already exists',
  EFLG: 'Already flagged',
  NFLG: 'Not flagged',

  // --- Graph errors --------------------------------------------------------
  BLKD: 'Blocked',
  SFLW: 'Cannot follow yourself',
  SBLK: 'Cannot block yourself',
  AFLW: 'Already following',
  NFLW: 'Not following',
  WFLK: 'Wrong follower key',
  HGTE: 'Account has a follow gate',
  AUTO: 'Automated accounts cannot follow',

  // --- Main social errors --------------------------------------------------
  IPWL: 'Invalid paywall',
  NPWL: 'Paywall not found',
  ICID: 'Invalid CID',
  NPST: 'Post not found',
  EPST: 'Post already exists',
  NRPL: 'Reply not found',
  AVOT: 'Already voted',
  NVOT: "Haven't voted",
  NMTA: "Meta doesn't exist",
  EMTA: 'Meta already exists',
  NGRF: 'Not the graph contract',
  NMDX: 'Not the moderation contract',
  NATH: 'Plugin not auth address',
  IAST: 'Invalid asset',
  IAPP: 'Invalid app',
  IRTY: 'Invalid reply type',
  NEDT: 'Not your post to edit',
  ISRP: 'Is a reply',
  NARP: 'Not a reply',
  EAMD: 'Already amended',
  SVOT: 'Cannot self-vote',
  ARCT: 'Already reacted',
  FTSM: 'Fee too small',
  IRFL: 'Invalid ref length',
  TSOL: 'Timestamp too old',
  NRTP: 'Ref type not found',
  NONT: 'User does not own the NFT',

  // --- Impact errors -------------------------------------------------------
  INFD: 'Invalid NFD',
  NNFD: 'Not an NFD',
  NONF: 'User does not own the NFD',
  CNFD: 'NFD has changed',
  NANT: 'Not an Akita NFT',
  NSUB: 'Not a subscription',
  NSOC: 'Not the social contract',

  // --- Social plugin -------------------------------------------------------
  NTDO: 'Not the DAO',
}

/** Prefix the contracts write to the log ahead of the code (ARC-65). */
const ARC65_PREFIX = 'ERR:'
/** Alternate prefix ARC-65 allows for application errors. */
const ARC65_ALT_PREFIX = 'AER:'

/**
 * Extracts the short code from an ARC-65 log entry.
 *
 * Accepts either the raw code (`NPST`), a full ARC-65 log line
 * (`ERR:NPST` / `AER:NPST`), or an entry with an appended message
 * (`ERR:NPST:Post not found`).
 *
 * Returns `undefined` if the input isn't a recognizable ARC-65 error string.
 */
export function parseSocialErrorCode(input: string): string | undefined {
  if (!input) return undefined

  let rest = input
  if (rest.startsWith(ARC65_PREFIX)) rest = rest.slice(ARC65_PREFIX.length)
  else if (rest.startsWith(ARC65_ALT_PREFIX)) rest = rest.slice(ARC65_ALT_PREFIX.length)

  const code = rest.split(':', 1)[0]?.trim()
  if (!code) return undefined
  return code in SOCIAL_ERROR_MESSAGES ? code : undefined
}

/**
 * Translates a short AkitaSocial error code (or raw ARC-65 log entry) into a
 * human-readable message. Unknown codes pass through as-is so the caller
 * still sees *something* useful.
 */
export function translateSocialError(input: string): string {
  const code = parseSocialErrorCode(input)
  if (code !== undefined) return SOCIAL_ERROR_MESSAGES[code]
  return input
}

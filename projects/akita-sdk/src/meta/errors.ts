/**
 * ARC-65 error codes emitted by the Meta contracts.
 *
 * The contracts log `ERR:{code}` via `loggedAssert` / `loggedErr` before
 * failing, where `code` is one of the short alphanumeric tags in this file.
 * Keep this in sync with `akita-sc/smart_contracts/meta/errors.ts` —
 * the short codes are the shared wire format between contract and SDK.
 *
 * Use `translateMetaError(code)` to turn a code back into a
 * human-readable message for display in a UI or log.
 */

import { makeErrorTranslator, withErrorCodeAliases } from "../errors";

/**
 * Short code → human-readable message for every error the Meta
 * contracts can emit. Ordered roughly the same way as the contract-side file.
 */
export const META_MERKLES_ERROR_MESSAGES: Record<string, string> = withErrorCodeAliases({
  // --- Box key / data validation -----------------------------------------
  KTL: "Max rooted-data key length is 15 bytes",
  DTL: "Max data length is 1024 bytes",
  RKP: '"l." key prefix is reserved for internals',
  NTL: "Root name cannot be longer than 27 bytes",

  // --- Root lifecycle -----------------------------------------------------
  NTKN: "This name is already in use",
  NNAM: "A root with this name does not exist",
  NROT: "The root does not exist in box storage",
  NRFD: "There must be a root to associate the data to",
  EROT: "This root already exists",

  // --- Verification -------------------------------------------------------
  FVRI: "Failed to verify inclusion",

  // --- Data / schema ------------------------------------------------------
  SCHM: "List schema does not match",
  MSCH: "Unknown Merkle leaf schema part",
  TMIS: "List type does not match",
  NDTA: "Data does not exist",
  EDTA: "New data already exists",

  // --- Tree types ---------------------------------------------------------
  NTRT: "Tree type does not exist",
  ETRK: "Tree type key already exists for this root",

  // --- Plain records and plugin scopes ---------------------------
  MNAM: "Root name must be nonempty",
  MSPM: "This wallet grant has no metadata policy",
  MSPA: "Only an admin wallet execution can change metadata policies",
  MWCTX: "Metadata calls require an active wallet grant",
  MNSP: "Namespace must be nonempty and within its byte limit",
  MKEY: "Key must be nonempty and within its byte limit",
  MNMS: "Record namespace and key must fit 30 UTF-8 bytes combined",
  MPMT: "Record payment must be adjacent, from the author, for the exact storage cost, with no close or rekey",
  MRNF: "Record does not exist",
  MREV: "Record revision changed; read the current revision before retrying",
  MRNG: "Record slice is outside the allowed range",
  MVSZ: "Record data exceeds the app-call argument budget",
  MPRT: "Metadata part exceeds its encoded AVM byte-value limit",
  MRSL: "Values larger than 1024 bytes require slice reads",
  MREG: "Meta registry application ID must be nonzero",
  MKNS: "A key-restricted scope requires a namespace",
  MSIZ: "Encoded scope keys must fit 124 bytes",
  MDKY: "Scope keys must be unique",
  MNSS: "Namespace is outside this plugin scope",
  MKSC: "Key is outside this plugin scope",
  MRSC: "A key-restricted plugin cannot modify roots",
  MTSC: "Only an unrestricted plugin can register tree types",
});

/**
 * Translates a short Meta error code (or raw ARC-65 log entry) into a
 * human-readable message. Falls back to the common error table when the code
 * isn't domain-specific. Unknown codes pass through as-is.
 */
export const translateMetaError = makeErrorTranslator(META_MERKLES_ERROR_MESSAGES);

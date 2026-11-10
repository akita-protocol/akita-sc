"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/errors.ts
function withErrorCodeAliases(messages) {
  const result = { ...messages };
  for (const [code, message] of Object.entries(messages)) {
    if (/^[A-Z][A-Z0-9]+$/.test(code)) {
      const alias = `err${code[0]}${code.slice(1).toLowerCase()}`;
      result[alias] ??= message;
    }
  }
  return result;
}
var COMMON_ERROR_MESSAGES = withErrorCodeAliases({
  // --- Admin / authorization ----------------------------------------------
  NDAO: "Not the Akita DAO",
  ICAL: "Invalid caller",
  FORB: "Forbidden",
  MBFF: "Must be called from the factory",
  NCRE: "Not the creator",
  GNFF: "Guild was not created by the configured factory",
  GCLE: "The cost is above the limit set when this was prepared",
  // --- Lifecycle -----------------------------------------------------------
  IUPG: "Invalid upgrade",
  BDEP: "Bad deployer; must be called from a factory",
  // --- Payments / transfers ----------------------------------------------
  IPAY: "Invalid payment",
  IPMA: "Invalid payment amount",
  IPMR: "Invalid payment receiver",
  IXFR: "Invalid transfer",
  IAAM: "Invalid asset amount",
  IARE: "Invalid asset receiver",
  IPMS: "Payment or transfer was not sent by the expected account",
  NCLW: "Clawback transfers are not accepted",
  NCLS: "Transfers that close out the sender are not accepted",
  NRKY: "Transfers that rekey the sender are not accepted",
  // --- Asset / app validation --------------------------------------------
  IAST: "Invalid asset",
  IAPP: "Invalid app",
  ASAM: "Asset mismatch",
  NACR: "Not the asset creator",
  // --- Plugin / wallet ----------------------------------------------------
  NATH: "This plugin does not have control of the account",
  IWLT: "Wallet app is missing a valid controlled address",
  // --- Principal resolution (wallet hints) -------------------------------
  HNWL: "Wallet hint is not a genuine Akita wallet",
  HTOP: "A wallet hint cannot be used on a top-level call",
  HNBD: "Wallet hint is neither the calling wallet nor the wallet whose plugin window holds the sender",
  HNOW: "Wallet hint does not own this account",
  // --- Gates --------------------------------------------------------------
  FGTE: "Gate check failed",
  // --- Program loading ------------------------------------------------------
  PTLG: "Program exceeds the 8-page (16 KB) AVM limit",
  // --- Opt-in -------------------------------------------------------------
  AOPT: "Already opted in",
  NOPT: "Not opted in",
  // --- Blocking (shared with social graph) --------------------------------
  BLKD: "Blocked",
  // --- Random utility ------------------------------------------------------
  IRSD: "Invalid random seed",
  IRLN: "Invalid random length",
  IRBS: "Invalid random bit size",
  IRBD: "Invalid random bounds"
});
var ARC65_PREFIX = "ERR:";
var ARC65_ALT_PREFIX = "AER:";
function parseArc65Code(input) {
  var _a;
  if (!input) return void 0;
  let rest = input;
  if (rest.startsWith(ARC65_PREFIX)) rest = rest.slice(ARC65_PREFIX.length);
  else if (rest.startsWith(ARC65_ALT_PREFIX)) rest = rest.slice(ARC65_ALT_PREFIX.length);
  const code = (_a = rest.split(":", 1)[0]) == null ? void 0 : _a.trim();
  if (!code) return void 0;
  return code;
}
function translateCommonError(input) {
  const code = parseArc65Code(input);
  if (code !== void 0 && code in COMMON_ERROR_MESSAGES) return COMMON_ERROR_MESSAGES[code];
  return input;
}
function makeErrorTranslator(domainTable) {
  return (input) => {
    const code = parseArc65Code(input);
    if (code !== void 0) {
      if (code in domainTable) return domainTable[code];
      if (code in COMMON_ERROR_MESSAGES) return COMMON_ERROR_MESSAGES[code];
    }
    return input;
  };
}









exports.withErrorCodeAliases = withErrorCodeAliases; exports.COMMON_ERROR_MESSAGES = COMMON_ERROR_MESSAGES; exports.ARC65_PREFIX = ARC65_PREFIX; exports.ARC65_ALT_PREFIX = ARC65_ALT_PREFIX; exports.parseArc65Code = parseArc65Code; exports.translateCommonError = translateCommonError; exports.makeErrorTranslator = makeErrorTranslator;
//# sourceMappingURL=chunk-Q5IKYOZS.js.map
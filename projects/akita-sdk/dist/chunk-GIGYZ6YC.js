"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/errors.ts
var COMMON_ERROR_MESSAGES = {
  // --- Admin / authorization ----------------------------------------------
  NDAO: "Not the Akita DAO",
  ICAL: "Invalid caller",
  FORB: "Forbidden",
  MBFF: "Must be called from the factory",
  NCRE: "Not the creator",
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
  // --- Asset / app validation --------------------------------------------
  IAST: "Invalid asset",
  IAPP: "Invalid app",
  ASAM: "Asset mismatch",
  NACR: "Not the asset creator",
  // --- Plugin / wallet ----------------------------------------------------
  NATH: "This plugin does not have control of the account",
  // --- Gates --------------------------------------------------------------
  FGTE: "Gate check failed",
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
};
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








exports.COMMON_ERROR_MESSAGES = COMMON_ERROR_MESSAGES; exports.ARC65_PREFIX = ARC65_PREFIX; exports.ARC65_ALT_PREFIX = ARC65_ALT_PREFIX; exports.parseArc65Code = parseArc65Code; exports.translateCommonError = translateCommonError; exports.makeErrorTranslator = makeErrorTranslator;
//# sourceMappingURL=chunk-GIGYZ6YC.js.map
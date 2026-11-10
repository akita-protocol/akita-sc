"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }// src/connect/uri.ts
function encodeConnectUri({ origin, requestId, v, secret }) {
  const params = [`requestId=${encodeURIComponent(requestId)}`];
  if (v !== void 0) params.push(`v=${encodeURIComponent(String(v))}`);
  if (secret !== void 0) params.push(`secret=${encodeURIComponent(secret)}`);
  return `liquid://${origin}?${params.join("&")}`;
}
function decodeConnectUri(uri) {
  const trimmed = uri.trim();
  if (!trimmed.toLowerCase().startsWith("liquid://")) {
    throw new Error(`Invalid connect URI: expected liquid:// scheme, got "${trimmed}"`);
  }
  const asHttps = "https://" + trimmed.slice("liquid://".length);
  const parsed = new URL(asHttps);
  const origin = parsed.host;
  if (!origin) {
    throw new Error(`Invalid connect URI: missing host in "${trimmed}"`);
  }
  const requestId = parsed.searchParams.get("requestId") || parsed.searchParams.get("request_id");
  if (!requestId) {
    throw new Error(`Invalid connect URI: missing requestId parameter in "${trimmed}"`);
  }
  const versionValue = parsed.searchParams.get("v");
  const v = versionValue === null ? void 0 : Number(versionValue);
  if (v !== void 0 && (!Number.isInteger(v) || v < 1)) {
    throw new Error(`Invalid connect URI: invalid protocol version in "${trimmed}"`);
  }
  const secret = _nullishCoalesce(parsed.searchParams.get("secret"), () => ( void 0));
  if (v !== void 0 && v >= 3 && !secret) {
    throw new Error(`Invalid connect URI: v${v} requires an authentication secret`);
  }
  return { origin, requestId, ...v !== void 0 && { v }, ...secret && { secret } };
}

// src/connect/protocol.ts
var _hmacjs = require('@noble/hashes/hmac.js');
var _sha2js = require('@noble/hashes/sha2.js');
var _utilsjs = require('@noble/hashes/utils.js');

// src/connect/session-key.ts
var _algosdk = require('algosdk'); var _algosdk2 = _interopRequireDefault(_algosdk);
function getSessionKeyMultisig(browserKey, serverKey) {
  if (browserKey === serverKey) throw new Error("The browser and server session keys must differ");
  for (const key of [browserKey, serverKey]) _algosdk2.default.Address.fromString(key);
  const params = { version: 1, threshold: 2, addrs: [browserKey, serverKey] };
  return { params, address: _algosdk2.default.multisigAddress(params).toString() };
}

// src/connect/protocol.ts
var encoder = new TextEncoder();
function base64UrlEncode(value) {
  let binary = "";
  for (const byte of value) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}
function base64UrlDecode(value) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  const binary = atob(padded);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}
function canonicalize(value) {
  if (value === void 0) return "null";
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalize).join(",")}]`;
  const object = value;
  return `{${Object.keys(object).filter((key) => object[key] !== void 0).sort().map((key) => `${JSON.stringify(key)}:${canonicalize(object[key])}`).join(",")}}`;
}
function envelopeSigningValue(envelope) {
  return encoder.encode(canonicalize(envelope));
}
function constantTimeEqual(left, right) {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index++) difference |= left[index] ^ right[index];
  return difference === 0;
}
function createConnectSecret() {
  return base64UrlEncode(_utilsjs.randomBytes.call(void 0, 32));
}
function createConnectNonce() {
  return base64UrlEncode(_utilsjs.randomBytes.call(void 0, 16));
}
function authenticateConnectMessage(params) {
  const issuedAt = _nullishCoalesce(params.issuedAt, () => ( Math.floor(Date.now() / 1e3)));
  const unsigned = {
    v: 3,
    requestId: params.requestId,
    nonce: _nullishCoalesce(params.nonce, () => ( createConnectNonce())),
    issuedAt,
    expiresAt: _nullishCoalesce(params.expiresAt, () => ( issuedAt + 120)),
    payload: params.payload
  };
  const mac = _hmacjs.hmac.call(void 0, _sha2js.sha256, base64UrlDecode(params.secret), envelopeSigningValue(unsigned));
  return { ...unsigned, mac: base64UrlEncode(mac) };
}
function verifyConnectMessage(params) {
  const { envelope } = params;
  if (envelope.v !== 3 || envelope.requestId !== params.requestId) {
    throw new Error("Connect message does not match the scanned request");
  }
  const now = _nullishCoalesce(params.now, () => ( Math.floor(Date.now() / 1e3)));
  if (envelope.issuedAt > now + 30 || envelope.expiresAt < now || envelope.expiresAt <= envelope.issuedAt) {
    throw new Error("Connect message is expired or has an invalid validity window");
  }
  const { mac, ...unsigned } = envelope;
  const expected = _hmacjs.hmac.call(void 0, _sha2js.sha256, base64UrlDecode(params.secret), envelopeSigningValue(unsigned));
  if (!constantTimeEqual(base64UrlDecode(mac), expected)) {
    throw new Error("Connect message authentication failed");
  }
  if (params.consumeNonce && !params.consumeNonce(envelope.nonce)) {
    throw new Error("Connect message nonce was already used");
  }
  validateConnectPayload(envelope.payload);
  return envelope.payload;
}
function validateConnectPayload(payload) {
  if (!payload || typeof payload !== "object" || typeof payload.type !== "string") {
    throw new Error("Invalid connect payload");
  }
  if (payload.type === "wallet-connect") validateWalletConnectRequest(payload);
  if (payload.type === "wallet-connect-finalize") validateWalletConnectFinalizeRequest(payload);
  if (payload.type === "wallet-connect-revoke") {
    if (payload.v !== 3 || !payload.sessionId) throw new Error("Invalid wallet-connect revocation request");
  }
  if (payload.type === "wallet-connect-ready") validateWalletConnectSession(payload.session);
  if (payload.type === "wallet-connect-revoked" && !payload.sessionId) {
    throw new Error("Invalid wallet-connect revocation response");
  }
  if (payload.type === "session-key-connect") validateSessionKeyConnectRequest(payload);
  if (payload.type === "session-key-revoke") {
    if (payload.v !== 1 || !payload.sessionId) throw new Error("Invalid session key revocation request");
  }
  if (payload.type === "session-key-connected") validateSessionKeySession(payload.session);
  if (payload.type === "session-key-revoked" && !payload.sessionId) {
    throw new Error("Invalid session key revocation response");
  }
}
function isBase64Url(value, minimumBytes = 1) {
  if (!/^[A-Za-z0-9_-]+$/.test(value)) return false;
  try {
    return base64UrlDecode(value).length >= minimumBytes;
  } catch (e) {
    return false;
  }
}
function dappOrigin(dapp) {
  const origin = new URL(dapp.origin);
  if (origin.protocol !== "https:" && origin.hostname !== "localhost") {
    throw new Error("Wallet connections require an HTTPS dApp origin");
  }
  return origin;
}
function validatePluginRequests(plugins) {
  const identities = /* @__PURE__ */ new Set();
  for (const plugin of plugins) {
    if (!plugin.id || !/^\d+$/.test(plugin.appId) || plugin.appId === "0") {
      throw new Error(`Invalid plugin deployment for ${plugin.id || "unknown plugin"}`);
    }
    const identity = `${plugin.id}:${plugin.appId}`;
    if (identities.has(identity)) throw new Error(`Duplicate plugin request: ${identity}`);
    identities.add(identity);
    const selectors = /* @__PURE__ */ new Set();
    for (const method of _nullishCoalesce(plugin.methods, () => ( []))) {
      const selector = method.name.toLowerCase();
      if (!/^[0-9a-f]{8}$/.test(selector) || !/^\d+$/.test(method.cooldown) || selectors.has(selector)) {
        throw new Error(`Invalid or duplicate plugin method for ${plugin.id}`);
      }
      selectors.add(selector);
    }
    if (plugin.lastValid !== void 0 && !/^\d+$/.test(plugin.lastValid)) {
      throw new Error(`Invalid plugin validity for ${plugin.id}`);
    }
  }
}
function validateAllowances(allowances) {
  const assets = /* @__PURE__ */ new Set();
  const amounts = (allowance) => {
    switch (allowance.type) {
      case "flat":
        return [allowance.amount];
      case "window":
        return [allowance.amount, allowance.interval];
      case "drip":
        return [allowance.rate, allowance.max, allowance.interval];
      default:
        throw new Error("Unknown allowance type");
    }
  };
  for (const allowance of allowances) {
    if (!/^\d+$/.test(allowance.asset) || assets.has(allowance.asset)) {
      throw new Error(`Invalid or duplicate allowance asset: ${allowance.asset}`);
    }
    assets.add(allowance.asset);
    if (!amounts(allowance).every((value) => /^\d+$/.test(value))) {
      throw new Error(`Invalid allowance amounts for asset ${allowance.asset}`);
    }
  }
}
var ADDRESS_PATTERN = /^[A-Z2-7]{58}$/;
function validateWalletConnectRequest(request) {
  if (request.v !== 3) throw new Error("Unsupported wallet-connect protocol version");
  const origin = dappOrigin(request.dapp);
  const rpId = request.passkey.rpId.toLowerCase();
  const host = origin.hostname.toLowerCase();
  if (host !== rpId && !host.endsWith(`.${rpId}`)) {
    throw new Error("Passkey rpId does not match the dApp origin");
  }
  if (request.passkey.provider !== "akita-hyperspace" || request.passkey.required !== true) {
    throw new Error("Akita Hyperspace passkeys are required");
  }
  if (!isBase64Url(request.passkey.userHandle, 16) || !isBase64Url(request.passkey.challenge, 16)) {
    throw new Error("Passkey user handle and challenge must be strong base64url values");
  }
  if (request.expiresAt <= Math.floor(Date.now() / 1e3)) {
    throw new Error("Requested session has already expired");
  }
  validatePluginRequests(request.plugins);
}
function validateSessionKeyConnectRequest(request) {
  if (request.v !== 1) throw new Error("Unsupported session key protocol version");
  dappOrigin(request.dapp);
  if (!ADDRESS_PATTERN.test(request.browserKey) || !ADDRESS_PATTERN.test(request.serverKey)) {
    throw new Error("Session keys must be Algorand addresses");
  }
  if (request.browserKey === request.serverKey) {
    throw new Error("The browser and server session keys must differ");
  }
  getSessionKeyMultisig(request.browserKey, request.serverKey);
  if (!request.escrowName || request.escrowName.length > 64) {
    throw new Error("Session keys need an escrow name of at most 64 characters");
  }
  if (request.expiresAt <= Math.floor(Date.now() / 1e3)) {
    throw new Error("Requested session has already expired");
  }
  if (request.plugins.length === 0) throw new Error("Session keys must request at least one plugin");
  validatePluginRequests(request.plugins);
  validateAllowances(_nullishCoalesce(request.allowances, () => ( [])));
}
function validateSessionKeySession(session) {
  if (session.v !== 1 || session.kind !== "session-key" || !session.sessionId) {
    throw new Error("Invalid Akita session key");
  }
  if (!/^\d+$/.test(session.account.walletAppId) || session.account.walletAppId === "0") {
    throw new Error("Invalid wallet application ID");
  }
  if (!ADDRESS_PATTERN.test(session.account.address)) throw new Error("Invalid Akita wallet session address");
  dappOrigin(session.dapp);
  if (getSessionKeyMultisig(session.browserKey, session.serverKey).address !== session.caller) {
    throw new Error("Session key caller is not the multisig of its keys");
  }
  if (!session.escrowName) throw new Error("Session key escrow is missing");
  if (session.expiresAt <= session.createdAt || session.expiresAt <= Math.floor(Date.now() / 1e3)) {
    throw new Error("Akita session key is expired");
  }
  validatePluginRequests(session.plugins);
  validateAllowances(session.allowances);
}
function validateWalletConnectFinalizeRequest(request) {
  if (request.v !== 3 || !request.sessionId || !request.account) {
    throw new Error("Invalid wallet-connect finalization request");
  }
  if (request.credential.provider !== "akita-hyperspace") {
    throw new Error("Credential was not created by Akita Hyperspace");
  }
  if (!request.credential.rpId) throw new Error("Passkey rpId is required");
  if (!isBase64Url(request.credential.id, 16)) throw new Error("Invalid passkey credential ID");
  if (!/^[0-9a-fA-F]{64}$/.test(request.credential.publicKeyX) || !/^[0-9a-fA-F]{64}$/.test(request.credential.publicKeyY)) {
    throw new Error("Invalid P-256 public key coordinates");
  }
}
function validateWalletConnectSession(session) {
  if (session.v !== 3 || !session.sessionId || !session.account.address || !session.account.walletAppId) {
    throw new Error("Invalid Akita wallet session");
  }
  if (!/^\d+$/.test(session.account.walletAppId) || session.account.walletAppId === "0") {
    throw new Error("Invalid wallet application ID");
  }
  if (!/^[A-Z2-7]{58}$/.test(session.account.address) || !/^[A-Z2-7]{58}$/.test(session.credential.caller)) {
    throw new Error("Invalid Akita wallet session address");
  }
  const origin = new URL(session.dapp.origin);
  const rpId = session.credential.rpId.toLowerCase();
  const host = origin.hostname.toLowerCase();
  if (origin.protocol !== "https:" && origin.hostname !== "localhost" || host !== rpId && !host.endsWith(`.${rpId}`)) {
    throw new Error("Akita session passkey does not match its dApp origin");
  }
  if (session.expiresAt <= session.createdAt || session.expiresAt <= Math.floor(Date.now() / 1e3)) {
    throw new Error("Akita wallet session is expired");
  }
  if (session.credential.provider !== "akita-hyperspace" || !isBase64Url(session.credential.id, 16) || !/^[0-9a-fA-F]{64}$/.test(session.credential.publicKeyX) || !/^[0-9a-fA-F]{64}$/.test(session.credential.publicKeyY)) {
    throw new Error("Invalid Akita wallet session credential");
  }
  const pluginKeys = /* @__PURE__ */ new Set();
  for (const plugin of session.plugins) {
    const key = `${plugin.id}:${plugin.appId}`;
    if (!plugin.id || !/^\d+$/.test(plugin.appId) || plugin.appId === "0" || pluginKeys.has(key)) {
      throw new Error("Invalid Akita wallet session plugin");
    }
    if ((_nullishCoalesce(plugin.methods, () => ( []))).some(
      (method) => !/^[0-9a-fA-F]{8}$/.test(method.name) || !/^\d+$/.test(method.cooldown)
    )) throw new Error("Invalid Akita wallet session plugin method");
    pluginKeys.add(key);
  }
  if (session.transactionPreview === "required") {
    if (!session.nativePreview || !isBase64Url(session.nativePreview.token, 32)) {
      throw new Error("Required native transaction preview authorization is missing");
    }
    const endpoint = new URL(session.nativePreview.endpoint);
    if (endpoint.protocol !== "https:" && endpoint.hostname !== "localhost") {
      throw new Error("Native transaction preview endpoint must use HTTPS");
    }
  }
}
function createNonceTracker() {
  const seen = /* @__PURE__ */ new Set();
  return (nonce) => {
    if (seen.has(nonce)) return false;
    seen.add(nonce);
    return true;
  };
}

// src/connect/passkey.ts

var PASSKEY_TEAL_TEMPLATE = `#pragma version 11
b route_logic
route_logic:
arg 5
dup
len
pushint 32
==
assert
arg 4
dup
len
pushint 32
==
assert
arg_3
arg_2
arg_1
arg_0
callsub logic
pushint 1
return
logic:
proto 6 0
byte 0x
dup
frame_dig -2
frame_dig -3
concat
frame_dig -4
concat
sha256
frame_bury 0
frame_dig -1
frame_dig 0
concat
sha256
frame_bury 1
global GroupSize
pushint 1
>
bz if0_else
global GroupID
frame_dig -3
base64_decode URLEncoding
==
assert
b if0_end
if0_else:
txn TxID
frame_dig -3
base64_decode URLEncoding
==
assert
if0_end:
frame_dig 1
frame_dig -5
frame_dig -6
pushbytes TMPL_X
pushbytes TMPL_Y
ecdsa_verify Secp256r1
assert
retsub`;
function normalizeCoordinate(value, name) {
  const coordinate = value.startsWith("0x") ? value.slice(2) : value;
  if (!/^[0-9a-fA-F]{64}$/.test(coordinate)) throw new Error(`Invalid P-256 ${name} coordinate`);
  return coordinate.toLowerCase();
}
function decodeBase64(value) {
  const binary = atob(value);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}
function toBase64Url(value) {
  let binary = "";
  for (const byte of value) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}
function getP256PasskeyTeal({ publicKeyX, publicKeyY }) {
  const x = normalizeCoordinate(publicKeyX, "X");
  const y = normalizeCoordinate(publicKeyY, "Y");
  return PASSKEY_TEAL_TEMPLATE.replace("TMPL_X", `0x${x}`).replace("TMPL_Y", `0x${y}`);
}
function extractP256PublicKeyCoordinates(publicKey) {
  let point;
  if (publicKey.length === 65 && publicKey[0] === 4) {
    point = publicKey;
  } else {
    for (let index = 0; index <= publicKey.length - 65; index++) {
      if (publicKey[index] === 4) {
        const candidate = publicKey.slice(index, index + 65);
        if (candidate.length === 65) point = candidate;
      }
    }
  }
  if (!point) throw new Error("Unable to find an uncompressed P-256 public key");
  const hex = (value) => Array.from(value, (byte) => byte.toString(16).padStart(2, "0")).join("");
  return { publicKeyX: hex(point.slice(1, 33)), publicKeyY: hex(point.slice(33, 65)) };
}
async function compileP256PasskeyLogicSig(compiler, coordinates) {
  const result = await compiler.compile(getP256PasskeyTeal(coordinates)).do();
  return new _algosdk2.default.LogicSig(decodeBase64(result.result));
}
function getP256PasskeyCaller(logicSig) {
  return logicSig.address().toString();
}
function parseDerLength(value, offset) {
  const first = value[offset];
  if (first === void 0) throw new Error("Invalid DER signature length");
  if ((first & 128) === 0) return { length: first, next: offset + 1 };
  const bytes = first & 127;
  if (bytes === 0 || bytes > 2 || offset + bytes >= value.length) {
    throw new Error("Unsupported DER signature length");
  }
  let length = 0;
  for (let index = 0; index < bytes; index++) length = length << 8 | value[offset + 1 + index];
  return { length, next: offset + 1 + bytes };
}
function parseP256DerSignature(signature) {
  if (signature[0] !== 48) throw new Error("Invalid DER signature sequence");
  const sequence = parseDerLength(signature, 1);
  if (sequence.next + sequence.length !== signature.length) throw new Error("Invalid DER signature size");
  let offset = sequence.next;
  const readInteger = (name) => {
    if (signature[offset++] !== 2) throw new Error(`Invalid DER signature ${name}`);
    const encodedLength = parseDerLength(signature, offset);
    offset = encodedLength.next;
    const end = offset + encodedLength.length;
    if (end > signature.length || encodedLength.length === 0) throw new Error(`Invalid DER signature ${name} length`);
    let integer = signature.slice(offset, end);
    offset = end;
    if (integer[0] === 0) integer = integer.slice(1);
    if (integer.length > 32) throw new Error(`Invalid DER signature ${name} size`);
    const padded = new Uint8Array(32);
    padded.set(integer, 32 - integer.length);
    return padded;
  };
  const r = readInteger("R");
  const s = readInteger("S");
  if (offset !== signature.length) throw new Error("Invalid trailing DER signature data");
  return { r, s };
}
function createP256PasskeyLogicSigArgs(assertion, challengeBase64Url) {
  const clientData = new TextDecoder().decode(assertion.clientDataJSON);
  const challengeIndex = clientData.indexOf(challengeBase64Url);
  if (challengeIndex < 0 || clientData.indexOf(challengeBase64Url, challengeIndex + 1) >= 0) {
    throw new Error("Passkey challenge is missing or ambiguous in clientDataJSON");
  }
  const { r, s } = parseP256DerSignature(assertion.signature);
  const encode = (value) => new TextEncoder().encode(value);
  return [
    assertion.authenticatorData,
    encode(clientData.slice(0, challengeIndex)),
    encode(challengeBase64Url),
    encode(clientData.slice(challengeIndex + challengeBase64Url.length)),
    r,
    s
  ];
}
function getPasskeyTransactionChallenge(transaction, grouped) {
  if (grouped) {
    if (!transaction.group) throw new Error("Grouped transaction is missing its group ID");
    return toBase64Url(transaction.group);
  }
  return toBase64Url(transaction.rawTxID());
}
function signTransactionsWithP256Passkey(params) {
  if (params.indexesToSign.length === 0) return [];
  const grouped = params.transactions.length > 1;
  const challenge = getPasskeyTransactionChallenge(params.transactions[params.indexesToSign[0]], grouped);
  const signedLogicSig = new _algosdk2.default.LogicSig(
    params.logicSig.logic,
    createP256PasskeyLogicSigArgs(params.assertion, challenge)
  );
  return params.indexesToSign.map(
    (index) => _algosdk2.default.signLogicSigTransactionObject(params.transactions[index], signedLogicSig).blob
  );
}
























exports.encodeConnectUri = encodeConnectUri; exports.decodeConnectUri = decodeConnectUri; exports.getSessionKeyMultisig = getSessionKeyMultisig; exports.createConnectSecret = createConnectSecret; exports.createConnectNonce = createConnectNonce; exports.authenticateConnectMessage = authenticateConnectMessage; exports.verifyConnectMessage = verifyConnectMessage; exports.validateConnectPayload = validateConnectPayload; exports.validateWalletConnectRequest = validateWalletConnectRequest; exports.validateSessionKeyConnectRequest = validateSessionKeyConnectRequest; exports.validateSessionKeySession = validateSessionKeySession; exports.validateWalletConnectFinalizeRequest = validateWalletConnectFinalizeRequest; exports.validateWalletConnectSession = validateWalletConnectSession; exports.createNonceTracker = createNonceTracker; exports.getP256PasskeyTeal = getP256PasskeyTeal; exports.extractP256PublicKeyCoordinates = extractP256PublicKeyCoordinates; exports.compileP256PasskeyLogicSig = compileP256PasskeyLogicSig; exports.getP256PasskeyCaller = getP256PasskeyCaller; exports.parseP256DerSignature = parseP256DerSignature; exports.createP256PasskeyLogicSigArgs = createP256PasskeyLogicSigArgs; exports.getPasskeyTransactionChallenge = getPasskeyTransactionChallenge; exports.signTransactionsWithP256Passkey = signTransactionsWithP256Passkey;
//# sourceMappingURL=chunk-EE7CGCAL.js.map
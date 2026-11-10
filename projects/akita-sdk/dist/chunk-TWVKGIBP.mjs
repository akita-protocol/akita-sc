import {
  __export
} from "./chunk-J5LGTIGS.mjs";

// src/principal.ts
var principal_exports = {};
__export(principal_exports, {
  GATE_CTX_ABI_TYPE: () => GATE_CTX_ABI_TYPE,
  GATE_MUST_CHECK_FOR_SIGNATURE: () => GATE_MUST_CHECK_FOR_SIGNATURE,
  PRINCIPAL_KEY_CONTROLLED: () => PRINCIPAL_KEY_CONTROLLED,
  PRINCIPAL_KEY_REFERRER: () => PRINCIPAL_KEY_REFERRER,
  PRINCIPAL_KEY_SPENDING: () => PRINCIPAL_KEY_SPENDING,
  PrincipalErrorCode: () => PrincipalErrorCode,
  PrincipalPanicError: () => PrincipalPanicError,
  PrincipalResolutionError: () => PrincipalResolutionError,
  ZERO_ADDRESS: () => ZERO_ADDRESS,
  algodPrincipalReader: () => algodPrincipalReader,
  appAddress: () => appAddress,
  atRestPrincipal: () => atRestPrincipal,
  atRestResources: () => atRestResources,
  ctxOwns: () => ctxOwns,
  encodeGateCtx: () => encodeGateCtx,
  gateCtx: () => gateCtx,
  gateMustCheckForMethod: () => gateMustCheckForMethod,
  isGenuineWallet: () => isGenuineWallet,
  ownsAtRest: () => ownsAtRest,
  predictPrincipal: () => predictPrincipal,
  predictWindowPrincipal: () => predictWindowPrincipal,
  principalResources: () => principalResources,
  quoteReferrer: () => quoteReferrer,
  thirdPartyPrincipal: () => thirdPartyPrincipal,
  tipWallet: () => tipWallet,
  windowHint: () => windowHint,
  windowPrincipalResources: () => windowPrincipalResources
});
import algosdk, { Address, getApplicationAddress } from "algosdk";
var PRINCIPAL_KEY_CONTROLLED = "controlled_address";
var PRINCIPAL_KEY_SPENDING = "spending_address";
var PRINCIPAL_KEY_REFERRER = "referrer";
var PrincipalErrorCode = {
  /** W != 0 and not created by the wallet factory (or does not exist). */
  NotWallet: "errHnwl",
  /** W != 0 on a top-level call (callerApplicationId == 0). */
  TopLevel: "errHtop",
  /** Neither a direct wallet call nor a plugin window that holds the sender. */
  NotBound: "errHnbd",
  /** Third-party write: W does not own the account at rest. */
  NotOwner: "errHnow",
  /** Malformed controlled_address. */
  BadWallet: "errIwlt",
  /** The calling plugin does not hold the wallet's spending account. */
  PluginNotAuth: "errNath"
};
var ZERO_ADDRESS = Address.zeroAddress().toString();
var GATE_CTX_ABI_TYPE = "(address,uint64,address)";
var GATE_MUST_CHECK_FOR_SIGNATURE = "mustCheckFor((address,uint64,address),uint64,byte[][])void";
var PrincipalPanicError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "PrincipalPanicError";
  }
};
var PrincipalResolutionError = class extends Error {
  code;
  constructor(code, message) {
    super(`${code}: ${message}`);
    this.name = "PrincipalResolutionError";
    this.code = code;
  }
};
function addressString(address) {
  return typeof address === "string" ? address : address.toString();
}
function appAddress(appId) {
  return getApplicationAddress(BigInt(appId)).toString();
}
function plainPrincipal(sender) {
  return { wallet: 0n, principal: sender, origin: ZERO_ADDRESS, spender: sender, referrer: ZERO_ADDRESS, viaPlugin: false };
}
async function addressGlobal(reader, appId, key) {
  const value = await reader.appGlobal(appId, key);
  if (value === void 0) return void 0;
  if (value.type === "uint") {
    throw new PrincipalPanicError(`app ${appId} stores a uint64 under the bytes key '${key}' (len would fail on chain)`);
  }
  return value.value.length === 32 ? new Address(value.value).toString() : void 0;
}
async function isGenuineWallet(reader, wallet, walletFactory) {
  if (wallet === 0n || walletFactory === 0n) return false;
  const creator = await reader.appCreator(wallet);
  return creator !== void 0 && creator === appAddress(walletFactory);
}
async function walletControlsLive(reader, wallet, controlled, spender) {
  if (controlled === spender) return true;
  if (await reader.appCreator(wallet) === void 0) return false;
  const walletAddress = appAddress(wallet);
  if (controlled === walletAddress) return await reader.authAddr(walletAddress) === ZERO_ADDRESS;
  return await reader.authAddr(controlled) === walletAddress;
}
async function predictPrincipal(reader, context) {
  const { walletFactory, hint, callerApp, strict } = context;
  const sender = addressString(context.sender);
  const callerAddr = context.callerAddr !== void 0 ? addressString(context.callerAddr) : callerApp === 0n ? ZERO_ADDRESS : appAddress(callerApp);
  const fail = (code, message) => {
    if (strict) throw new PrincipalResolutionError(code, message);
    return plainPrincipal(sender);
  };
  if (hint === 0n) return plainPrincipal(sender);
  if (!await isGenuineWallet(reader, hint, walletFactory)) {
    return fail(PrincipalErrorCode.NotWallet, `app ${hint} is not a wallet created by factory ${walletFactory}`);
  }
  if (callerApp === 0n) return fail(PrincipalErrorCode.TopLevel, "a wallet hint needs an app caller");
  let viaPlugin = false;
  if (callerApp !== hint) {
    const spending = context.spendingOverride !== void 0 ? addressString(context.spendingOverride) : await addressGlobal(reader, hint, PRINCIPAL_KEY_SPENDING);
    if (!(spending !== void 0 && spending === sender && sender !== callerAddr)) {
      return fail(PrincipalErrorCode.NotBound, `wallet ${hint} does not hold ${sender} for caller ${callerApp}`);
    }
    viaPlugin = true;
  }
  const controlled = await addressGlobal(reader, hint, PRINCIPAL_KEY_CONTROLLED);
  if (controlled === void 0) return fail(PrincipalErrorCode.BadWallet, `wallet ${hint} has no 32-byte controlled_address`);
  const live = await walletControlsLive(reader, hint, controlled, sender);
  const referrer = await addressGlobal(reader, hint, PRINCIPAL_KEY_REFERRER) ?? ZERO_ADDRESS;
  return {
    wallet: hint,
    principal: live ? controlled : sender,
    origin: live ? controlled : ZERO_ADDRESS,
    spender: sender,
    referrer,
    viaPlugin
  };
}
async function predictWindowPrincipal(reader, walletFactory, wallet, spender, plugin) {
  return predictPrincipal(reader, {
    walletFactory,
    hint: wallet,
    sender: spender,
    callerApp: plugin,
    spendingOverride: spender,
    strict: true
  });
}
async function quoteReferrer(reader, walletFactory, hint) {
  if (!await isGenuineWallet(reader, hint, walletFactory)) return ZERO_ADDRESS;
  return await addressGlobal(reader, hint, PRINCIPAL_KEY_REFERRER) ?? ZERO_ADDRESS;
}
async function ownsAtRest(reader, walletFactory, wallet, account) {
  if (!await isGenuineWallet(reader, wallet, walletFactory)) return false;
  const target = addressString(account);
  const walletAddress = appAddress(wallet);
  if (target === walletAddress) return await reader.authAddr(walletAddress) === ZERO_ADDRESS;
  return await reader.authAddr(target) === walletAddress;
}
async function atRestPrincipal(reader, walletFactory, account, wallet, stored) {
  const target = addressString(account);
  const storedAddress = addressString(stored);
  if (storedAddress === target) return target;
  if (!await ownsAtRest(reader, walletFactory, wallet, target)) return target;
  const walletAddress = appAddress(wallet);
  if (storedAddress === walletAddress) {
    return await reader.authAddr(walletAddress) === ZERO_ADDRESS ? storedAddress : target;
  }
  return await reader.authAddr(storedAddress) === walletAddress ? storedAddress : target;
}
async function thirdPartyPrincipal(reader, walletFactory, account, wallet) {
  const target = addressString(account);
  if (!await ownsAtRest(reader, walletFactory, wallet, target)) return target;
  const controlled = await addressGlobal(reader, wallet, PRINCIPAL_KEY_CONTROLLED);
  if (controlled === void 0) return target;
  return await walletControlsLive(reader, wallet, controlled, target) ? controlled : target;
}
async function tipWallet(reader, walletFactory, creator, stored) {
  const target = addressString(creator);
  if (stored === 0n || !await ownsAtRest(reader, walletFactory, stored, target)) return 0n;
  const controlled = await addressGlobal(reader, stored, PRINCIPAL_KEY_CONTROLLED);
  if (controlled === void 0) return 0n;
  return await walletControlsLive(reader, stored, controlled, target) ? stored : 0n;
}
function gateCtx(p) {
  return { principal: p.principal, wallet: p.wallet, spender: p.spender };
}
async function ctxOwns(reader, walletFactory, ctx, account) {
  const target = addressString(account);
  if (target === ctx.principal || target === ctx.spender) return true;
  return ctx.wallet !== 0n && ownsAtRest(reader, walletFactory, ctx.wallet, target);
}
function windowHint(wallet) {
  return BigInt(wallet);
}
function encodeGateCtx(ctx) {
  return algosdk.ABIType.from(GATE_CTX_ABI_TYPE).encode([ctx.principal, ctx.wallet, ctx.spender]);
}
function gateMustCheckForMethod() {
  return algosdk.ABIMethod.fromSignature(GATE_MUST_CHECK_FOR_SIGNATURE);
}
function accountRef(address) {
  return { address: Address.fromString(address) };
}
function dedupe(references) {
  const seen = /* @__PURE__ */ new Set();
  return references.filter((reference) => {
    const key = reference.address ? `d:${reference.address.toString()}` : `p:${reference.appIndex}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
function principalResources({ wallet, controlled, spender }) {
  if (wallet === 0n) return [];
  const references = [{ appIndex: wallet }];
  const controlledAddress = addressString(controlled);
  if (controlledAddress === addressString(spender) || controlledAddress === ZERO_ADDRESS) return references;
  const walletAddress = appAddress(wallet);
  references.push(accountRef(controlledAddress === walletAddress ? walletAddress : controlledAddress));
  return dedupe(references);
}
function atRestResources({ wallet, account, stored }) {
  if (wallet === 0n) return [];
  const walletAddress = appAddress(wallet);
  const references = [{ appIndex: wallet }, accountRef(addressString(account))];
  if (addressString(account) === walletAddress) references.push(accountRef(walletAddress));
  if (stored !== void 0 && addressString(stored) !== addressString(account)) references.push(accountRef(addressString(stored)));
  return dedupe(references);
}
async function windowPrincipalResources(reader, wallet, spender) {
  if (wallet === 0n) return [];
  const controlled = await addressGlobal(reader, wallet, PRINCIPAL_KEY_CONTROLLED);
  if (controlled === void 0) return [{ appIndex: wallet }];
  return principalResources({ wallet, controlled, spender });
}
function isNotFound(error) {
  var _a;
  const status = (error == null ? void 0 : error.status) ?? ((_a = error == null ? void 0 : error.response) == null ? void 0 : _a.status);
  return status === 404 || /application does not exist|404/i.test(String((error == null ? void 0 : error.message) ?? ""));
}
function algodPrincipalReader(algod) {
  const apps = /* @__PURE__ */ new Map();
  const auths = /* @__PURE__ */ new Map();
  const app = (appId) => {
    const key = appId.toString();
    if (!apps.has(key)) {
      apps.set(key, algod.getApplicationByID(appId).do().catch((error) => {
        if (isNotFound(error)) return void 0;
        throw error;
      }));
    }
    return apps.get(key);
  };
  return {
    async appCreator(appId) {
      var _a;
      const info = await app(appId);
      return ((_a = info == null ? void 0 : info.params) == null ? void 0 : _a.creator) ? addressString(info.params.creator) : void 0;
    },
    async appGlobal(appId, key) {
      var _a, _b;
      const info = await app(appId);
      const wanted = new TextEncoder().encode(key);
      const entry = (_b = (_a = info == null ? void 0 : info.params) == null ? void 0 : _a.globalState) == null ? void 0 : _b.find(({ key: entryKey }) => entryKey.length === wanted.length && entryKey.every((byte, index) => byte === wanted[index]));
      if (!entry) return void 0;
      return entry.value.type === 1 ? { type: "bytes", value: entry.value.bytes } : { type: "uint", value: BigInt(entry.value.uint) };
    },
    async authAddr(address) {
      if (!auths.has(address)) {
        auths.set(address, algod.accountInformation(address).exclude("all").do().then(
          (info) => info.authAddr ? addressString(info.authAddr) : ZERO_ADDRESS,
          (error) => {
            if (isNotFound(error)) return ZERO_ADDRESS;
            throw error;
          }
        ));
      }
      return auths.get(address);
    }
  };
}

export {
  PRINCIPAL_KEY_CONTROLLED,
  PRINCIPAL_KEY_SPENDING,
  PRINCIPAL_KEY_REFERRER,
  PrincipalErrorCode,
  ZERO_ADDRESS,
  GATE_CTX_ABI_TYPE,
  GATE_MUST_CHECK_FOR_SIGNATURE,
  PrincipalPanicError,
  PrincipalResolutionError,
  appAddress,
  isGenuineWallet,
  predictPrincipal,
  predictWindowPrincipal,
  quoteReferrer,
  ownsAtRest,
  atRestPrincipal,
  thirdPartyPrincipal,
  tipWallet,
  gateCtx,
  ctxOwns,
  windowHint,
  encodeGateCtx,
  gateMustCheckForMethod,
  principalResources,
  atRestResources,
  windowPrincipalResources,
  algodPrincipalReader,
  principal_exports
};
//# sourceMappingURL=chunk-TWVKGIBP.mjs.map
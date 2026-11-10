"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } async function _asyncNullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return await rhsFn(); } } var _class;




var _chunkMY4J3UZTjs = require('./chunk-MY4J3UZT.js');



var _chunkWXNDITZIjs = require('./chunk-WXNDITZI.js');

// src/simulate/access-list.ts
var _algosdk = require('algosdk'); var _algosdk2 = _interopRequireDefault(_algosdk);
var _composer = require('@algorandfoundation/algokit-utils/types/composer');
var _algorandclienttransactionsender = require('@algorandfoundation/algokit-utils/types/algorand-client-transaction-sender');
var _algokitutils = require('@algorandfoundation/algokit-utils');

// src/simulate/usage.ts
async function simulateWithUsage(client, request) {
  return client.simulateTransactions(request).do();
}
function usageFeeSurcharge(group, minFee) {
  if ((group == null ? void 0 : group.groupUsage) === void 0 || !group.txnResults) return 0n;
  const count = (transaction) => 1n + (_nullishCoalesce(transaction.innerTxns, () => ( []))).reduce((sum, child) => sum + count(child), 0n);
  const transactionCount = group.txnResults.reduce((sum, result) => sum + count(_nullishCoalesce(result.txnResult, () => ( {}))), 0n);
  const required = (BigInt(group.groupUsage) * minFee + 999999n) / 1000000n;
  const baseline = transactionCount * minFee;
  return required > baseline ? required - baseline : 0n;
}

// src/simulate/access-list.ts
var MAX_ACCESS_LIST_ENTRIES = 16;
var ACCESS_DISCOVERY_OPCODE_BUDGET = 32e4;
var OP_UP_SELECTOR = new Uint8Array([133, 77, 237, 224]);
var ARC58_GET_ADMIN_SELECTOR = new Uint8Array([19, 188, 68, 228]);
var DEFAULT_CARRIER_MAX_FEE = _algokitutils.microAlgo.call(void 0, 257000n);
var ACCESS_LIST_PATCH = /* @__PURE__ */ Symbol.for("@akta/sdk/access-list-resource-populator");
var SINGLE_SEND_RESULT_PATCH = /* @__PURE__ */ Symbol.for("@akta/sdk/access-list-single-send-result");
var ACCESS_CARRIER_REGISTRY = /* @__PURE__ */ Symbol.for("@akta/sdk/access-list-carrier-registry");
var accessListRepairs = /* @__PURE__ */ new WeakMap();
var accessListRepairKeys = /* @__PURE__ */ new WeakMap();
function registeredAccessCarrierApps(algod) {
  return _nullishCoalesce(algod[ACCESS_CARRIER_REGISTRY], () => ( /* @__PURE__ */ new Map()));
}
function isAutomaticCarrierTransaction(transaction) {
  const note = transaction.note;
  return Boolean(
    transaction.type === _algosdk.TransactionType.appl && note && new TextDecoder().decode(note).startsWith("akta-access-carrier-")
  );
}
function installSingleSendResultCompatibility() {
  const prototype = _algorandclienttransactionsender.AlgorandClientTransactionSender.prototype;
  if (prototype[SINGLE_SEND_RESULT_PATCH]) return;
  const originalSend = prototype._send;
  prototype._send = function patchedSingleSend(composerCall, log) {
    const send = originalSend.call(this, composerCall, log);
    return async (params) => {
      const result = await send(params);
      let selectedIndex = -1;
      for (let index = result.transactions.length - 1; index >= 0; index -= 1) {
        if (!isAutomaticCarrierTransaction(result.transactions[index])) {
          selectedIndex = index;
          break;
        }
      }
      if (selectedIndex < 0 || selectedIndex === result.transactions.length - 1) return result;
      return {
        ...result,
        transaction: result.transactions[selectedIndex],
        confirmation: result.confirmations[selectedIndex],
        txId: result.txIds[selectedIndex]
      };
    };
  };
  prototype[SINGLE_SEND_RESULT_PATCH] = true;
}
var AccessListCapacityError = class extends Error {
  constructor(message, requiredCarrierCount) {
    super(message);
    this.requiredCarrierCount = requiredCarrierCount;
    this.name = "AccessListCapacityError";
  }
  
};
function registerAccessListResourceCarrier(appId, appSpec, algod) {
  if (appId <= 0n || !algod) return;
  const methods = _nullishCoalesce((appSpec == null ? void 0 : appSpec.methods), () => ( []));
  const selector = methods.some(
    (method) => {
      var _a, _b;
      return method.name === "opUp" && ((_a = method.args) == null ? void 0 : _a.length) === 0 && ((_b = method.returns) == null ? void 0 : _b.type) === "void";
    }
  ) ? OP_UP_SELECTOR : methods.some(
    (method) => {
      var _a, _b;
      return method.name === "arc58_getAdmin" && ((_a = method.args) == null ? void 0 : _a.length) === 0 && ((_b = method.returns) == null ? void 0 : _b.type) === "address" && method.readonly === true;
    }
  ) ? ARC58_GET_ADMIN_SELECTOR : void 0;
  if (!selector) return;
  const host = algod;
  host[ACCESS_CARRIER_REGISTRY] ??= /* @__PURE__ */ new Map();
  host[ACCESS_CARRIER_REGISTRY].set(appId.toString(), selector);
}
function bytesKey(value) {
  return Array.from(value, (byte) => byte.toString(16).padStart(2, "0")).join("");
}
function isZeroAddress(address) {
  return address.equals(_algosdk.Address.zeroAddress());
}
function isLiteralZeroAddressReference(reference) {
  return reference.address !== void 0 && isZeroAddress(reference.address);
}
function effectiveAddress(address, transaction) {
  return isZeroAddress(address) ? transaction.sender : address;
}
function effectiveAppId(appId, transaction) {
  return appId === 0n ? transaction.applicationCall.appIndex : appId;
}
function normalizeReference(reference, transaction) {
  const appCall = transaction.applicationCall;
  if (reference.address) {
    if (reference.address.equals(transaction.sender)) return void 0;
    return { address: reference.address };
  }
  if (reference.assetIndex !== void 0) return { assetIndex: reference.assetIndex };
  if (reference.appIndex !== void 0) {
    if (reference.appIndex === 0n || reference.appIndex === appCall.appIndex) return void 0;
    return { appIndex: reference.appIndex };
  }
  if (reference.holding) {
    return {
      holding: {
        address: reference.holding.address.equals(transaction.sender) ? _algosdk.Address.zeroAddress() : reference.holding.address,
        assetIndex: reference.holding.assetIndex
      }
    };
  }
  if (reference.locals) {
    const address = reference.locals.address.equals(transaction.sender) ? _algosdk.Address.zeroAddress() : reference.locals.address;
    const appId = reference.locals.appIndex === appCall.appIndex ? 0n : reference.locals.appIndex;
    if (isZeroAddress(address) && appId === 0n) return void 0;
    return { locals: { address, appIndex: appId } };
  }
  if (reference.box) {
    return {
      box: {
        appIndex: reference.box.appIndex === 0n || reference.box.appIndex === appCall.appIndex ? 0n : reference.box.appIndex,
        name: reference.box.name
      }
    };
  }
  return void 0;
}
function referenceKey(reference, transaction) {
  if (reference.address) return `d:${reference.address.toString()}`;
  if (reference.assetIndex !== void 0) return `s:${reference.assetIndex}`;
  if (reference.appIndex !== void 0) return `p:${effectiveAppId(reference.appIndex, transaction)}`;
  if (reference.holding) {
    return `h:${effectiveAddress(reference.holding.address, transaction).toString()}:${reference.holding.assetIndex}`;
  }
  if (reference.locals) {
    return `l:${effectiveAddress(reference.locals.address, transaction).toString()}:${effectiveAppId(reference.locals.appIndex, transaction)}`;
  }
  if (reference.box) {
    return `b:${effectiveAppId(reference.box.appIndex, transaction)}:${bytesKey(reference.box.name)}`;
  }
  return void 0;
}
function accessListEntryCount(transaction, references) {
  const primitiveEntries = /* @__PURE__ */ new Set();
  let compositeEntries = 0;
  const ensureLiteralAddress = (address) => {
    if (!address.equals(transaction.sender)) primitiveEntries.add(`d:${address.toString()}`);
  };
  const ensureCompositeAddress = (address) => {
    const actual = effectiveAddress(address, transaction);
    if (!actual.equals(transaction.sender)) primitiveEntries.add(`d:${actual.toString()}`);
  };
  const ensureAsset = (assetId) => primitiveEntries.add(`s:${assetId}`);
  const ensureApp = (appId) => {
    const actual = effectiveAppId(appId, transaction);
    if (actual !== transaction.applicationCall.appIndex) primitiveEntries.add(`p:${actual}`);
  };
  for (const rawReference of references) {
    const reference = normalizeReference(rawReference, transaction);
    if (!reference) continue;
    if (isLiteralZeroAddressReference(reference)) continue;
    if (reference.address) ensureLiteralAddress(reference.address);
    else if (reference.assetIndex !== void 0) ensureAsset(reference.assetIndex);
    else if (reference.appIndex !== void 0) ensureApp(reference.appIndex);
    else if (reference.holding) {
      ensureCompositeAddress(reference.holding.address);
      ensureAsset(reference.holding.assetIndex);
      compositeEntries += 1;
    } else if (reference.locals) {
      ensureCompositeAddress(reference.locals.address);
      ensureApp(reference.locals.appIndex);
      compositeEntries += 1;
    } else if (reference.box) {
      ensureApp(reference.box.appIndex);
      compositeEntries += 1;
    }
  }
  return primitiveEntries.size + compositeEntries;
}
function providedResourceKeys(plan) {
  const result = /* @__PURE__ */ new Set();
  for (const rawReference of plan.references) {
    const reference = normalizeReference(rawReference, plan.transaction);
    if (!reference) continue;
    if (isLiteralZeroAddressReference(reference)) continue;
    const key = referenceKey(reference, plan.transaction);
    if (key) result.add(key);
    if (reference.holding) {
      const address = effectiveAddress(reference.holding.address, plan.transaction);
      result.add(`d:${address.toString()}`);
      result.add(`s:${reference.holding.assetIndex}`);
    } else if (reference.locals) {
      const address = effectiveAddress(reference.locals.address, plan.transaction);
      const appId = effectiveAppId(reference.locals.appIndex, plan.transaction);
      result.add(`d:${address.toString()}`);
      result.add(`p:${appId}`);
    } else if (reference.box) {
      result.add(`p:${effectiveAppId(reference.box.appIndex, plan.transaction)}`);
    }
  }
  result.add(`d:${plan.transaction.sender.toString()}`);
  result.add(`p:${plan.transaction.applicationCall.appIndex}`);
  return result;
}
function hasResource(plans, reference) {
  for (const plan of plans) {
    const normalized = normalizeReference(reference, plan.transaction);
    if (!normalized) return true;
    const key = referenceKey(normalized, plan.transaction);
    if (key && providedResourceKeys(plan).has(key)) return true;
  }
  return false;
}
function addToTransaction(plan, reference, allowDuplicate = false) {
  const normalized = normalizeReference(reference, plan.transaction);
  if (!normalized) return true;
  if (normalized.locals && !effectiveAddress(normalized.locals.address, plan.transaction).equals(plan.transaction.sender) && effectiveAppId(normalized.locals.appIndex, plan.transaction) === plan.transaction.applicationCall.appIndex) {
    return false;
  }
  const key = referenceKey(normalized, plan.transaction);
  if (!allowDuplicate && key && providedResourceKeys(plan).has(key)) return true;
  const proposed = [...plan.references, normalized];
  if (accessListEntryCount(plan.transaction, proposed) > MAX_ACCESS_LIST_ENTRIES) return false;
  plan.references = proposed;
  return true;
}
function hasLegacyIndexedReferences(transaction) {
  var _a, _b, _c;
  return transaction.type === _algosdk.TransactionType.appl && transaction.applicationCall !== void 0 && ((_nullishCoalesce(((_a = transaction.applicationCall.accounts) == null ? void 0 : _a.length), () => ( 0))) > 0 || (_nullishCoalesce(((_b = transaction.applicationCall.foreignAssets) == null ? void 0 : _b.length), () => ( 0))) > 0 || (_nullishCoalesce(((_c = transaction.applicationCall.foreignApps) == null ? void 0 : _c.length), () => ( 0))) > 0);
}
function legacyReferenceCount(transaction) {
  var _a, _b, _c, _d;
  const appCall = transaction.applicationCall;
  return (_nullishCoalesce(((_a = appCall.accounts) == null ? void 0 : _a.length), () => ( 0))) + (_nullishCoalesce(((_b = appCall.foreignAssets) == null ? void 0 : _b.length), () => ( 0))) + (_nullishCoalesce(((_c = appCall.foreignApps) == null ? void 0 : _c.length), () => ( 0))) + (_nullishCoalesce(((_d = appCall.boxes) == null ? void 0 : _d.length), () => ( 0)));
}
function provideLiteralZeroAddress(transactions) {
  var _a, _b;
  const zeroAddress = _algosdk.Address.zeroAddress();
  const appTransactions = transactions.filter(
    (transaction) => transaction.type === _algosdk.TransactionType.appl && transaction.applicationCall !== void 0
  );
  for (const transaction of appTransactions) {
    const appCall = transaction.applicationCall;
    appCall.access = (_a = appCall.access) == null ? void 0 : _a.filter(
      (reference) => !isLiteralZeroAddressReference(reference)
    );
    if (((_b = appCall.access) == null ? void 0 : _b.length) === 0) appCall.access = [];
  }
  if (appTransactions.some(
    (transaction) => {
      var _a2;
      return (_a2 = transaction.applicationCall.accounts) == null ? void 0 : _a2.some((address) => isZeroAddress(address));
    }
  )) {
    return;
  }
  const candidate = appTransactions.filter((transaction) => {
    var _a2, _b2;
    const appCall = transaction.applicationCall;
    return (_nullishCoalesce(((_a2 = appCall.access) == null ? void 0 : _a2.length), () => ( 0))) === 0 && (_nullishCoalesce(((_b2 = appCall.accounts) == null ? void 0 : _b2.length), () => ( 0))) < 4 && legacyReferenceCount(transaction) < 8;
  }).sort((first, second) => {
    const firstCarrier = isAutomaticCarrierTransaction(first) ? 0 : 1;
    const secondCarrier = isAutomaticCarrierTransaction(second) ? 0 : 1;
    const firstLegacy = hasLegacyIndexedReferences(first) ? 0 : 1;
    const secondLegacy = hasLegacyIndexedReferences(second) ? 0 : 1;
    return firstCarrier - secondCarrier || firstLegacy - secondLegacy;
  })[0];
  if (!candidate) {
    throw new AccessListCapacityError(
      "A literal zero-address account requires one legacy resource-carrier call.",
      1
    );
  }
  candidate.applicationCall.accounts = [
    ..._nullishCoalesce(candidate.applicationCall.accounts, () => ( [])),
    zeroAddress
  ];
}
function addToBestTransaction(plans, reference, allowDuplicate = false) {
  if (!allowDuplicate && hasResource(plans, reference)) return true;
  const candidates = plans.map((plan, index) => {
    const normalized = normalizeReference(reference, plan.transaction);
    if (!normalized) return { index, incremental: 0, total: accessListEntryCount(plan.transaction, plan.references) };
    if (normalized.locals && !effectiveAddress(normalized.locals.address, plan.transaction).equals(plan.transaction.sender) && effectiveAppId(normalized.locals.appIndex, plan.transaction) === plan.transaction.applicationCall.appIndex) {
      return { index, incremental: Number.POSITIVE_INFINITY, total: Number.POSITIVE_INFINITY };
    }
    const before = accessListEntryCount(plan.transaction, plan.references);
    const after = accessListEntryCount(plan.transaction, [...plan.references, normalized]);
    return { index, incremental: after - before, total: after };
  }).filter(({ total }) => total <= MAX_ACCESS_LIST_ENTRIES).sort((a, b) => a.incremental - b.incremental || a.total - b.total || a.index - b.index);
  const candidate = candidates[0];
  return Boolean(candidate && addToTransaction(plans[candidate.index], reference, allowDuplicate));
}
function virtualCarrier(template) {
  const { transaction } = template;
  return {
    groupIndex: -1,
    references: [],
    transaction: new _algosdk2.default.Transaction({
      type: _algosdk2.default.TransactionType.appl,
      sender: transaction.sender,
      suggestedParams: { fee: 0, minFee: 1e3, firstValid: transaction.firstValid, lastValid: transaction.lastValid },
      appCallParams: { appIndex: transaction.applicationCall.appIndex, onComplete: transaction.applicationCall.onComplete }
    })
  };
}
function transactionResources(resources, createdAppIds = /* @__PURE__ */ new Set()) {
  if (!resources) return [];
  const createdAppAddresses = new Set(
    Array.from(createdAppIds, (appId) => _algosdk.getApplicationAddress.call(void 0, appId).toString())
  );
  return [
    ...(_nullishCoalesce(resources.accounts, () => ( []))).filter((address) => !isZeroAddress(address)).filter((address) => !createdAppAddresses.has(address.toString())).map((address) => ({ address })),
    ...(_nullishCoalesce(resources.assets, () => ( []))).map((assetId) => ({ assetIndex: assetId })),
    ...(_nullishCoalesce(resources.apps, () => ( []))).filter((appId) => !createdAppIds.has(appId)).map((appId) => ({ appIndex: appId })),
    ...(_nullishCoalesce(resources.assetHoldings, () => ( []))).map((holding) => ({ holding })),
    ...(_nullishCoalesce(resources.appLocals, () => ( []))).map((locals) => ({ locals })),
    ...(_nullishCoalesce(resources.boxes, () => ( []))).filter((box) => !createdAppIds.has(box.appIndex)).map((box) => ({ box }))
  ];
}
function groupResources(resources, createdAppIds = /* @__PURE__ */ new Set()) {
  if (!resources) return [];
  const createdAppAddresses = new Set(
    Array.from(createdAppIds, (appId) => _algosdk.getApplicationAddress.call(void 0, appId).toString())
  );
  return [
    ...(_nullishCoalesce(resources.appLocals, () => ( []))).map((locals) => ({ locals })),
    ...(_nullishCoalesce(resources.assetHoldings, () => ( []))).map((holding) => ({ holding })),
    ...(_nullishCoalesce(resources.boxes, () => ( []))).filter((box) => !createdAppIds.has(box.appIndex)).map((box) => ({ box })),
    ...(_nullishCoalesce(resources.accounts, () => ( []))).filter((address) => !isZeroAddress(address)).filter((address) => !createdAppAddresses.has(address.toString())).map((address) => ({ address })),
    ...(_nullishCoalesce(resources.assets, () => ( []))).map((assetId) => ({ assetIndex: assetId })),
    ...(_nullishCoalesce(resources.apps, () => ( []))).filter((appId) => !createdAppIds.has(appId)).map((appId) => ({ appIndex: appId }))
  ];
}
function hasUnnamedResources(resources) {
  var _a, _b, _c, _d, _e, _f;
  return Boolean(
    resources && ((_nullishCoalesce(((_a = resources.accounts) == null ? void 0 : _a.length), () => ( 0))) > 0 || (_nullishCoalesce(((_b = resources.assets) == null ? void 0 : _b.length), () => ( 0))) > 0 || (_nullishCoalesce(((_c = resources.apps) == null ? void 0 : _c.length), () => ( 0))) > 0 || (_nullishCoalesce(((_d = resources.assetHoldings) == null ? void 0 : _d.length), () => ( 0))) > 0 || (_nullishCoalesce(((_e = resources.appLocals) == null ? void 0 : _e.length), () => ( 0))) > 0 || (_nullishCoalesce(((_f = resources.boxes) == null ? void 0 : _f.length), () => ( 0))) > 0 || (_nullishCoalesce(resources.extraBoxRefs, () => ( 0))) > 0)
  );
}
function mergeUnnamedResources(first, second) {
  if (!hasUnnamedResources(first) && !hasUnnamedResources(second)) return void 0;
  const merged = {
    accounts: [..._nullishCoalesce((first == null ? void 0 : first.accounts), () => ( [])), ..._nullishCoalesce((second == null ? void 0 : second.accounts), () => ( []))],
    assets: [..._nullishCoalesce((first == null ? void 0 : first.assets), () => ( [])), ..._nullishCoalesce((second == null ? void 0 : second.assets), () => ( []))],
    apps: [..._nullishCoalesce((first == null ? void 0 : first.apps), () => ( [])), ..._nullishCoalesce((second == null ? void 0 : second.apps), () => ( []))],
    assetHoldings: [..._nullishCoalesce((first == null ? void 0 : first.assetHoldings), () => ( [])), ..._nullishCoalesce((second == null ? void 0 : second.assetHoldings), () => ( []))],
    appLocals: [..._nullishCoalesce((first == null ? void 0 : first.appLocals), () => ( [])), ..._nullishCoalesce((second == null ? void 0 : second.appLocals), () => ( []))],
    boxes: [..._nullishCoalesce((first == null ? void 0 : first.boxes), () => ( [])), ..._nullishCoalesce((second == null ? void 0 : second.boxes), () => ( []))],
    extraBoxRefs: (_nullishCoalesce((first == null ? void 0 : first.extraBoxRefs), () => ( 0))) + (_nullishCoalesce((second == null ? void 0 : second.extraBoxRefs), () => ( 0)))
  };
  return merged;
}
function mergeGroupAnalysis(original, repairs, transactionCount) {
  if (!original && !repairs) return void 0;
  return {
    transactions: Array.from({ length: transactionCount }, (_, index) => {
      var _a, _b;
      return {
        ..._nullishCoalesce((original == null ? void 0 : original.transactions[index]), () => ( {})),
        unnamedResourcesAccessed: mergeUnnamedResources(
          (_a = original == null ? void 0 : original.transactions[index]) == null ? void 0 : _a.unnamedResourcesAccessed,
          (_b = repairs == null ? void 0 : repairs.transactions[index]) == null ? void 0 : _b.unnamedResourcesAccessed
        )
      };
    }),
    unnamedResourcesAccessed: mergeUnnamedResources(
      original == null ? void 0 : original.unnamedResourcesAccessed,
      repairs == null ? void 0 : repairs.unnamedResourcesAccessed
    ),
    requiredOpcodeCarriers: original == null ? void 0 : original.requiredOpcodeCarriers,
    accessListFeeParams: original == null ? void 0 : original.accessListFeeParams,
    createdAppIds: [
      .../* @__PURE__ */ new Set([..._nullishCoalesce((original == null ? void 0 : original.createdAppIds), () => ( [])), ..._nullishCoalesce((repairs == null ? void 0 : repairs.createdAppIds), () => ( []))])
    ]
  };
}
function filterNewRepairResources(composer, scope, resources) {
  if (!hasUnnamedResources(resources)) return void 0;
  let keys = accessListRepairKeys.get(composer);
  if (!keys) {
    keys = /* @__PURE__ */ new Set();
    accessListRepairKeys.set(composer, keys);
  }
  const filtered = {};
  const add = (field, key, value) => {
    const scopedKey = `${scope}:${key}`;
    if (keys.has(scopedKey)) return;
    keys.add(scopedKey);
    const values = _nullishCoalesce(filtered[field], () => ( []));
    values.push(value);
    filtered[field] = values;
  };
  for (const value of _nullishCoalesce((resources == null ? void 0 : resources.accounts), () => ( []))) add("accounts", `d:${value.toString()}`, value);
  for (const value of _nullishCoalesce((resources == null ? void 0 : resources.assets), () => ( []))) add("assets", `s:${value}`, value);
  for (const value of _nullishCoalesce((resources == null ? void 0 : resources.apps), () => ( []))) add("apps", `p:${value}`, value);
  for (const value of _nullishCoalesce((resources == null ? void 0 : resources.assetHoldings), () => ( []))) {
    add("assetHoldings", `h:${value.address.toString()}:${value.assetIndex}`, value);
  }
  for (const value of _nullishCoalesce((resources == null ? void 0 : resources.appLocals), () => ( []))) {
    add("appLocals", `l:${value.address.toString()}:${value.appIndex}`, value);
  }
  for (const value of _nullishCoalesce((resources == null ? void 0 : resources.boxes), () => ( []))) {
    add("boxes", `b:${value.appIndex}:${bytesKey(value.name)}`, value);
  }
  if ((_nullishCoalesce((resources == null ? void 0 : resources.extraBoxRefs), () => ( 0))) > 0) filtered.extraBoxRefs = resources.extraBoxRefs;
  return hasUnnamedResources(filtered) ? filtered : void 0;
}
function unavailableResourceFromFailure(message) {
  var _a, _b, _c;
  const locals = /unavailable Local State (\d+)\+([A-Z2-7]{58})/.exec(message);
  if (locals) return { appLocals: [{ appIndex: BigInt(locals[1]), address: _algosdk.Address.fromString(locals[2]) }] };
  const holding = /unavailable Holding (?:(\d+)\+([A-Z2-7]{58})|([A-Z2-7]{58})\+(\d+))/.exec(message);
  if (holding) {
    return {
      assetHoldings: [{
        assetIndex: BigInt(_nullishCoalesce(holding[1], () => ( holding[4]))),
        address: _algosdk.Address.fromString(_nullishCoalesce(holding[2], () => ( holding[3])))
      }]
    };
  }
  const account = (_a = /unavailable Account ([A-Z2-7]{58})/.exec(message)) == null ? void 0 : _a[1];
  if (account) return { accounts: [_algosdk.Address.fromString(account)] };
  const app = (_b = /unavailable App(?:lication)? (\d+)/i.exec(message)) == null ? void 0 : _b[1];
  if (app) return { apps: [BigInt(app)] };
  const asset = (_c = /unavailable Asset (\d+)/i.exec(message)) == null ? void 0 : _c[1];
  if (asset) return { assets: [BigInt(asset)] };
  return void 0;
}
function providedExtraBoxReferences(transactions) {
  const uniqueNamedBoxes = /* @__PURE__ */ new Set();
  let namedBoxReferenceCount = 0;
  let emptyBoxReferenceCount = 0;
  const count = (appId, name, transaction) => {
    if (appId === 0n && name.length === 0) {
      emptyBoxReferenceCount += 1;
      return;
    }
    namedBoxReferenceCount += 1;
    uniqueNamedBoxes.add(`b:${effectiveAppId(appId, transaction)}:${bytesKey(name)}`);
  };
  for (const transaction of transactions) {
    if (transaction.type !== _algosdk.TransactionType.appl || !transaction.applicationCall) continue;
    for (const reference of _nullishCoalesce(transaction.applicationCall.access, () => ( []))) {
      if (!reference.box) continue;
      count(reference.box.appIndex, reference.box.name, transaction);
    }
    for (const box of _nullishCoalesce(transaction.applicationCall.boxes, () => ( []))) {
      count(box.appIndex, box.name, transaction);
    }
  }
  return emptyBoxReferenceCount + Math.max(0, namedBoxReferenceCount - uniqueNamedBoxes.size);
}
function recordAccessListRepairs(composer, relaxedGroup, transactions, failureMessage) {
  const transactionCount = transactions.length;
  const previous = accessListRepairs.get(composer);
  const reportedGroupResources = relaxedGroup.unnamedResourcesAccessed;
  const incrementalGroupResources = reportedGroupResources ? {
    ...reportedGroupResources,
    extraBoxRefs: Math.max(
      0,
      (_nullishCoalesce(reportedGroupResources.extraBoxRefs, () => ( 0))) - providedExtraBoxReferences(transactions)
    )
  } : void 0;
  const groupRepair = filterNewRepairResources(composer, "group", incrementalGroupResources);
  const transactionRepairs = Array.from({ length: transactionCount }, (_, index) => {
    var _a, _b;
    return {
      unnamedResourcesAccessed: filterNewRepairResources(
        composer,
        `transaction:${index}`,
        (_b = (_a = relaxedGroup.txnResults) == null ? void 0 : _a[index]) == null ? void 0 : _b.unnamedResourcesAccessed
      )
    };
  });
  const fallbackRepair = filterNewRepairResources(
    composer,
    "group",
    unavailableResourceFromFailure(failureMessage)
  );
  const changed = hasUnnamedResources(groupRepair) || hasUnnamedResources(fallbackRepair) || transactionRepairs.some((repair) => hasUnnamedResources(repair.unnamedResourcesAccessed));
  if (!changed) return false;
  const additions = {
    transactions: transactionRepairs,
    unnamedResourcesAccessed: mergeUnnamedResources(groupRepair, fallbackRepair),
    createdAppIds: collectCreatedAppIds(relaxedGroup)
  };
  accessListRepairs.set(composer, mergeGroupAnalysis(previous, additions, transactionCount));
  return true;
}
function collectCreatedAppIds(group) {
  const result = /* @__PURE__ */ new Set();
  const visit = (pending) => {
    if (!pending) return;
    if (pending.appIndex && pending.appIndex > 0n) result.add(pending.appIndex);
    for (const inner of _nullishCoalesce(pending.innerTxns, () => ( []))) visit(inner);
  };
  for (const transaction of _nullishCoalesce((group == null ? void 0 : group.txnResults), () => ( []))) visit(transaction.txnResult);
  return [...result];
}
function populateAccessListResources(input, groupAnalysis, seeds = []) {
  var _a, _b, _c, _d;
  const transactions = input;
  const appTransactions = transactions.map((transaction, groupIndex) => ({ transaction, groupIndex })).filter(({ transaction }) => transaction.type === _algosdk.TransactionType.appl && transaction.applicationCall !== void 0);
  if (appTransactions.length === 0) return;
  const createdAppIds = new Set(_nullishCoalesce((groupAnalysis == null ? void 0 : groupAnalysis.createdAppIds), () => ( [])));
  const needsLiteralZeroAddress = Boolean(
    ((_b = (_a = groupAnalysis == null ? void 0 : groupAnalysis.unnamedResourcesAccessed) == null ? void 0 : _a.accounts) == null ? void 0 : _b.some(isZeroAddress)) || (groupAnalysis == null ? void 0 : groupAnalysis.transactions.some(
      (analysis) => {
        var _a2, _b2;
        return (_b2 = (_a2 = analysis.unnamedResourcesAccessed) == null ? void 0 : _a2.accounts) == null ? void 0 : _b2.some(isZeroAddress);
      }
    )) || appTransactions.some(
      ({ transaction }) => {
        var _a2;
        return (_a2 = transaction.applicationCall.access) == null ? void 0 : _a2.some(isLiteralZeroAddressReference);
      }
    )
  );
  if (needsLiteralZeroAddress) provideLiteralZeroAddress(transactions);
  const plans = appTransactions.filter(({ transaction }) => !hasLegacyIndexedReferences(transaction)).map(({ transaction, groupIndex }) => {
    const appCall = transaction.applicationCall;
    const references = [
      ..._nullishCoalesce(appCall.access, () => ( [])),
      ...(_nullishCoalesce(appCall.boxes, () => ( []))).map((box) => ({ box }))
    ].map((reference) => normalizeReference(reference, transaction)).filter((reference) => reference !== void 0);
    return { transaction, references, groupIndex };
  });
  const groupResourcesToAdd = groupResources(groupAnalysis == null ? void 0 : groupAnalysis.unnamedResourcesAccessed, createdAppIds);
  const extraBoxReferences = _nullishCoalesce(((_c = groupAnalysis == null ? void 0 : groupAnalysis.unnamedResourcesAccessed) == null ? void 0 : _c.extraBoxRefs), () => ( 0));
  const planningPlans = [...plans];
  let requiredResourceCarriers = 0;
  const carrierTemplate = _nullishCoalesce(plans[0], () => ( {
    groupIndex: appTransactions[0].groupIndex,
    references: [],
    transaction: appTransactions[0].transaction
  }));
  const addGroupReference = (reference, allowDuplicate = false) => {
    if (addToBestTransaction(planningPlans, reference, allowDuplicate)) return;
    const carrier = virtualCarrier(carrierTemplate);
    planningPlans.push(carrier);
    requiredResourceCarriers += 1;
    if (!addToBestTransaction(planningPlans, reference, allowDuplicate)) {
      throw new Error(
        `A single access resource cannot fit within the ${MAX_ACCESS_LIST_ENTRIES}-entry Access limit.`
      );
    }
  };
  for (const plan of plans) {
    const { groupIndex } = plan;
    for (const reference of transactionResources(
      (_d = groupAnalysis == null ? void 0 : groupAnalysis.transactions[groupIndex]) == null ? void 0 : _d.unnamedResourcesAccessed,
      createdAppIds
    )) {
      if (!addToTransaction(plan, reference)) {
        throw new Error(`Transaction ${groupIndex} requires more than ${MAX_ACCESS_LIST_ENTRIES} non-shareable access-list entries.`);
      }
    }
  }
  for (const reference of groupResourcesToAdd) {
    addGroupReference(reference);
  }
  for (const reference of seeds) {
    if (isLiteralZeroAddressReference(reference)) continue;
    if (reference.appIndex !== void 0 && createdAppIds.has(reference.appIndex)) continue;
    addGroupReference(reference);
  }
  for (let index = 0; index < extraBoxReferences; index += 1) {
    addGroupReference({ box: { appIndex: 0n, name: new Uint8Array(0) } }, true);
  }
  const requiredCarrierCount = Math.max(requiredResourceCarriers, _nullishCoalesce((groupAnalysis == null ? void 0 : groupAnalysis.requiredOpcodeCarriers), () => ( 0)));
  if (requiredCarrierCount > 0) {
    const used = plans.map((plan) => accessListEntryCount(plan.transaction, plan.references)).join(", ") || "none";
    const reason = requiredResourceCarriers > 0 ? "Access capacity" : "pooled opcode budget";
    throw new AccessListCapacityError(
      `${reason} requires ${requiredCarrierCount} additional safe resource-carrier call(s) (current encoded entries by eligible app call: ${used}; max ${MAX_ACCESS_LIST_ENTRIES} each).`,
      requiredCarrierCount
    );
  }
  for (const plan of plans) {
    const appCall = plan.transaction.applicationCall;
    const size = accessListEntryCount(plan.transaction, plan.references);
    if (size > MAX_ACCESS_LIST_ENTRIES) {
      throw new Error(`Access list contains ${size} entries; maximum is ${MAX_ACCESS_LIST_ENTRIES}.`);
    }
    appCall.access = plan.references;
    appCall.boxes = [];
  }
}
var configuredComposers = /* @__PURE__ */ new WeakMap();
var preparedComposers = /* @__PURE__ */ new WeakMap();
var seededComposers = /* @__PURE__ */ new WeakMap();
function seedAccessResources(composer, references) {
  if (references.length === 0) return composer;
  seededComposers.set(composer, [..._nullishCoalesce(seededComposers.get(composer), () => ( [])), ...references]);
  preparedComposers.delete(composer);
  return composer;
}
function seededAccessResources(composer) {
  return _nullishCoalesce(seededComposers.get(composer), () => ( []));
}
var nativeBuild = _composer.TransactionComposer.prototype.build;
function normalizedResources(resources) {
  var _a, _b, _c, _d;
  if (!resources) return void 0;
  return canonicalResources({
    accounts: (_a = resources.accounts) == null ? void 0 : _a.map((account) => account),
    apps: resources.apps,
    assets: resources.assets,
    boxes: (_b = resources.boxes) == null ? void 0 : _b.map(({ app, name }) => ({ appIndex: app, name })),
    appLocals: (_c = resources.appLocals) == null ? void 0 : _c.map(({ app, account }) => ({ appIndex: app, address: account })),
    assetHoldings: (_d = resources.assetHoldings) == null ? void 0 : _d.map(({ asset, account }) => ({ assetIndex: asset, address: account })),
    extraBoxRefs: resources.extraBoxRefs
  });
}
var compareIds = (a, b) => a < b ? -1 : a > b ? 1 : 0;
var compareBytes = (a, b) => {
  for (let i = 0; i < Math.min(a.length, b.length); i++) if (a[i] !== b[i]) return a[i] - b[i];
  return a.length - b.length;
};
var compareAddresses = (a, b) => compareBytes(a.publicKey, b.publicKey);
function canonicalResources(resources) {
  return {
    ...resources,
    accounts: resources.accounts && [...resources.accounts].sort(compareAddresses),
    apps: resources.apps && [...resources.apps].sort(compareIds),
    assets: resources.assets && [...resources.assets].sort(compareIds),
    boxes: resources.boxes && [...resources.boxes].sort((a, b) => compareIds(a.appIndex, b.appIndex) || compareBytes(a.name, b.name)),
    appLocals: resources.appLocals && [...resources.appLocals].sort((a, b) => compareAddresses(a.address, b.address) || compareIds(a.appIndex, b.appIndex)),
    assetHoldings: resources.assetHoldings && [...resources.assetHoldings].sort((a, b) => compareAddresses(a.address, b.address) || compareIds(a.assetIndex, b.assetIndex))
  };
}
function normalizedGroup(group) {
  const pending = (txn) => {
    var _a;
    return {
      appIndex: txn.applicationIndex,
      innerTxns: (_a = txn.innerTxns) == null ? void 0 : _a.map(pending)
    };
  };
  return {
    ...group,
    groupUsage: group.groupUsage === void 0 ? void 0 : BigInt(group.groupUsage),
    unnamedResourcesAccessed: normalizedResources(group.unnamedResourcesAccessed),
    txnResults: group.txnResults.map((txn) => ({ txnResult: pending(txn.txnResult), unnamedResourcesAccessed: normalizedResources(txn.unnamedResourcesAccessed) }))
  };
}
function compose(transactions, methods) {
  const atc = new _algosdk2.default.AtomicTransactionComposer();
  for (const { txn, signer } of transactions) {
    const copy = _algosdk2.default.decodeUnsignedTransaction(_algosdk2.default.encodeUnsignedTransaction(txn));
    copy.group = void 0;
    atc.addTransaction({ txn: copy, signer });
  }
  atc.methodCalls = methods;
  return atc;
}
async function discoverGroup(simulate) {
  var _a;
  const realBudget = await simulate(false);
  if (!((_a = realBudget.txnGroups[0]) == null ? void 0 : _a.failureMessage)) return { discovery: realBudget, extraBudget: false };
  return { discovery: await simulate(true), extraBudget: true };
}
function requiredOpcodeCarriers(group, appCount, extraBudget) {
  if (!extraBudget) return 0;
  const added = _nullishCoalesce(group.appBudgetAdded, () => ( 0));
  const available = Math.max(appCount * 700, added - ACCESS_DISCOVERY_OPCODE_BUDGET);
  return Math.max(0, Math.ceil(((_nullishCoalesce(group.appBudgetConsumed, () => ( 0))) - available) / 700));
}
async function buildAccessListGroup(composer, options = {}, transform) {
  var _a, _b;
  const context = composer;
  const raw = await nativeBuild.call(composer);
  const methods = raw.methodCalls;
  let original = raw.atc.clone().buildGroup();
  transform == null ? void 0 : transform(original);
  const coversFees = _nullishCoalesce(options.coverAppCallInnerTransactionFees, () => ( false));
  const populates = _nullishCoalesce(options.populateAppCallResources, () => ( false));
  const hasApps = original.some(({ txn }) => txn.type === _algosdk.TransactionType.appl);
  if (!hasApps || !coversFees && !populates) {
    const atc = compose(original, methods);
    return { atc, transactions: atc.buildGroup(), methodCalls: methods, simulateResponse: void 0 };
  }
  const suggestedParams = await context.getSuggestedParams();
  const maxFees = new Map(context.txnMaxFees);
  const minFee = BigInt(suggestedParams.minFee);
  const repairs = {};
  for (let pass = 0; pass < 32; pass++) {
    const discoveryTxns = compose(original, methods).buildGroup();
    for (const [i, { txn }] of discoveryTxns.entries()) {
      if (txn.type !== _algosdk.TransactionType.appl) continue;
      if (!maxFees.has(i)) maxFees.set(i, _algokitutils.microAlgo.call(void 0, txn.fee));
      if (coversFees) txn.fee = maxFees.get(i).microAlgo;
    }
    const simulate = async (txns2, strict, extraBudget2 = !strict) => {
      const grouped = compose(txns2, methods).buildGroup();
      return simulateWithUsage(context.algod, new _algosdk2.default.modelsv2.SimulateRequest({
        txnGroups: [new _algosdk2.default.modelsv2.SimulateRequestTransactionGroup({
          txns: grouped.map(({ txn }) => new _algosdk2.default.SignedTransaction({ txn }))
        })],
        allowEmptySignatures: true,
        fixSigners: true,
        allowMoreLogging: true,
        allowUnnamedResources: !strict,
        ...extraBudget2 ? { extraOpcodeBudget: ACCESS_DISCOVERY_OPCODE_BUDGET } : {}
      }));
    };
    const { discovery, extraBudget } = await discoverGroup(
      (budgeted) => simulate(discoveryTxns, false, budgeted)
    );
    const group = discovery.txnGroups[0];
    if (group.failureMessage) throw new Error(`Resource discovery failed: ${group.failureMessage}`);
    const normalized = normalizedGroup(group);
    const candidates = compose(original, methods).buildGroup();
    const txns = candidates.map(({ txn }) => txn);
    const appCount = txns.filter((txn) => txn.type === _algosdk.TransactionType.appl).length;
    const analysis = mergeGroupAnalysis({
      transactions: _nullishCoalesce(((_a = normalized.txnResults) == null ? void 0 : _a.map((txn) => ({ unnamedResourcesAccessed: txn.unnamedResourcesAccessed }))), () => ( [])),
      unnamedResourcesAccessed: normalized.unnamedResourcesAccessed,
      createdAppIds: collectCreatedAppIds(normalized),
      requiredOpcodeCarriers: requiredOpcodeCarriers(group, appCount, extraBudget)
    }, accessListRepairs.get(repairs), txns.length);
    try {
      const byteFee = (txn) => {
        const required = BigInt(txn.toByte().length + 75) * BigInt(suggestedParams.fee);
        return required > minFee ? required : minFee;
      };
      const beforeBytes = candidates.map(({ txn }) => byteFee(txn));
      if (populates) populateAccessListResources(candidates.map(({ txn }) => txn), analysis, seededComposers.get(composer));
      const grew = candidates.some(({ txn }, index) => byteFee(txn) > beforeBytes[index]);
      let atc = compose(candidates, methods);
      if (coversFees || grew) {
        atc.buildGroup();
        const { prepareGroupForSending } = await Promise.resolve().then(() => _interopRequireWildcard(require("@algorandfoundation/algokit-utils")));
        const cachedAlgod = new Proxy(context.algod, { get(target, property, receiver) {
          if (property === "simulateTransactions") return () => ({ do: async () => coversFees ? discovery : { ...discovery, txnGroups: discovery.txnGroups.map((group2) => ({ ...group2, txnResults: group2.txnResults.map((result) => ({ ...result, txnResult: { ...result.txnResult, innerTxns: [] } })) })) } });
          return Reflect.get(target, property, receiver);
        } });
        atc = await prepareGroupForSending(atc, cachedAlgod, { coverAppCallInnerTransactionFees: true, populateAppCallResources: false }, { maxFees, suggestedParams });
        const extra = coversFees ? usageFeeSurcharge(group, minFee) : 0n;
        if (extra > 0n) {
          const index = atc.buildGroup().findIndex(({ txn: txn2 }) => txn2.type === _algosdk.TransactionType.appl);
          const txn = atc.buildGroup()[index].txn;
          if (txn.fee + extra > maxFees.get(index).microAlgo) throw new Error("Protocol usage exceeds app-call maxFee");
          txn.fee += extra;
          atc = compose(atc.buildGroup(), methods);
        }
      }
      const transactions = atc.buildGroup();
      const validation = await simulate(transactions, true);
      const failure = (_b = validation.txnGroups[0]) == null ? void 0 : _b.failureMessage;
      if (failure) {
        if (/(?:dynamic cost|static cost|opcode) budget exceeded|group fee .* too small \(needs? [1-9]/i.test(failure)) {
          throw new AccessListCapacityError("Strict simulation requires another pooled opcode-budget carrier.", 1);
        }
        const { discovery: relaxed } = await discoverGroup((budgeted) => simulate(transactions, false, budgeted));
        if (recordAccessListRepairs(repairs, normalizedGroup(relaxed.txnGroups[0]), transactions.map(({ txn }) => txn), failure)) continue;
        throw new Error(`Strict resource validation failed: ${failure}`);
      }
      return { atc, transactions, methodCalls: methods, simulateResponse: validation };
    } catch (error) {
      if (!(error instanceof AccessListCapacityError) || !populates) throw error;
      if (original.length + error.requiredCarrierCount > 16) throw error;
      const registry = registeredAccessCarrierApps(context.algod);
      const deleted = new Set(original.filter(({ txn }) => {
        var _a2;
        return ((_a2 = txn.applicationCall) == null ? void 0 : _a2.onComplete) === _algosdk2.default.OnApplicationComplete.DeleteApplicationOC;
      }).map(({ txn }) => txn.applicationCall.appIndex.toString()));
      const anchor = _nullishCoalesce(original.find(({ txn }) => txn.applicationCall && !deleted.has(txn.applicationCall.appIndex.toString()) && registry.has(txn.applicationCall.appIndex.toString())), () => ( original.find(({ txn }) => txn.applicationCall)));
      const targetAppId = (anchor == null ? void 0 : anchor.txn.applicationCall) && !deleted.has(anchor.txn.applicationCall.appIndex.toString()) && registry.has(anchor.txn.applicationCall.appIndex.toString()) ? anchor.txn.applicationCall.appIndex : [...registry.keys()].filter((id) => !deleted.has(id)).map(BigInt)[0];
      if (!anchor || targetAppId === void 0) throw new Error(error.message + " None of its usable app IDs has a registered safe resource carrier.");
      const sender = _nullishCoalesce([...original].reverse().find(({ txn }) => !isAutomaticCarrierTransaction(txn)), () => ( anchor));
      for (let i = 0; i < error.requiredCarrierCount; i++) {
        const index = original.length;
        const txn = _algosdk2.default.makeApplicationNoOpTxnFromObject({
          sender: sender.txn.sender,
          appIndex: targetAppId,
          appArgs: [registry.get(targetAppId.toString())],
          note: new TextEncoder().encode(`akta-access-carrier-${index + 1}`),
          suggestedParams: { ...suggestedParams, flatFee: true, fee: minFee, firstValid: anchor.txn.firstValid, lastValid: anchor.txn.lastValid }
        });
        original.push({ txn, signer: sender.signer });
        maxFees.set(index, DEFAULT_CARRIER_MAX_FEE);
      }
    }
  }
  throw new Error("Access resource repair did not converge");
}
function installAccessListResourcePopulator() {
  const prototype = _composer.TransactionComposer.prototype;
  if (prototype[ACCESS_LIST_PATCH]) return;
  prototype[ACCESS_LIST_PATCH] = true;
  installSingleSendResultCompatibility();
  const nativeSend = prototype.send;
  prototype.build = async function() {
    const options = configuredComposers.get(this);
    if (!options) return nativeBuild.call(this);
    const cached = preparedComposers.get(this);
    if (cached) return cached;
    const result = await buildAccessListGroup(this, options);
    this.atc = result.atc;
    preparedComposers.set(this, result);
    return result;
  };
  prototype.send = async function(params = {}) {
    const options = { ...params, populateAppCallResources: _nullishCoalesce(params.populateAppCallResources, () => ( _algokitutils.Config.populateAppCallResources)) };
    if (options.populateAppCallResources || options.coverAppCallInnerTransactionFees) {
      const result = await _asyncNullishCoalesce(preparedComposers.get(this), async () => ( await buildAccessListGroup(this, options)));
      this.atc = result.atc;
      preparedComposers.set(this, result);
    }
    return nativeSend.call(this, { ...params, populateAppCallResources: false, coverAppCallInnerTransactionFees: false });
  };
  const nativeRebuild = prototype.rebuild;
  prototype.rebuild = async function() {
    preparedComposers.delete(this);
    return nativeRebuild.call(this);
  };
}

// src/base.ts

installAccessListResourcePopulator();
var BaseSDK = (_class = class {
  
  
  
  __init() {this.readerAccount = _chunkMY4J3UZTjs.DEFAULT_READER}
  
  /** The detected network for this SDK instance */
  
  /**
   * Override this in subclasses to specify the environment variable name for the app ID
   */
  static __initStatic() {this.envVarName = ""}
  constructor({ factoryParams, algorand, factory, readerAccount, sendParams }, envVarName) {;_class.prototype.__init.call(this);
    var _a;
    this.network = _chunkMY4J3UZTjs.detectNetworkFromClient.call(void 0, algorand);
    const resolvedAppId = _chunkMY4J3UZTjs.resolveAppIdWithClient.call(void 0, 
      algorand,
      factoryParams.appId,
      envVarName || this.constructor.envVarName || "",
      this.constructor.name
    );
    this.appId = resolvedAppId;
    this.algorand = algorand;
    if (readerAccount) {
      this.readerAccount = readerAccount;
    }
    this.sendParams = { ..._nullishCoalesce(sendParams, () => ( _chunkMY4J3UZTjs.DEFAULT_SEND_PARAMS)) };
    if (!!factoryParams.defaultSender) {
      this.sendParams.sender = factoryParams.defaultSender;
    }
    if (!!factoryParams.defaultSigner) {
      this.sendParams.signer = _chunkWXNDITZIjs.normalizeSigner.call(void 0, factoryParams.defaultSigner);
    }
    this.client = new factory({ algorand }).getAppClientById({
      ...factoryParams,
      appId: resolvedAppId
    });
    registerAccessListResourceCarrier(
      resolvedAppId,
      this.client.appSpec,
      (_a = this.algorand.client) == null ? void 0 : _a.algod
    );
  }
  setReaderAccount(readerAccount) {
    this.readerAccount = readerAccount;
  }
  setSendParams(sendParams) {
    this.sendParams = { ...sendParams };
  }
  getSendParams({ sender, signer } = {}) {
    return {
      ...this.sendParams,
      ...sender !== void 0 && { sender },
      ...signer !== void 0 && { signer: _chunkWXNDITZIjs.normalizeSigner.call(void 0, signer) }
    };
  }
  getRequiredSendParams(params = {}) {
    const sendParams = this.getSendParams(params);
    if (!_chunkWXNDITZIjs.hasSenderSigner.call(void 0, sendParams)) {
      throw new Error("Sender and signer must be provided either explicitly or through defaults at SDK instantiation");
    }
    return sendParams;
  }
  getReaderSendParams({ sender } = {}) {
    return {
      ...this.sendParams,
      ...sender !== void 0 ? { sender } : { sender: this.readerAccount },
      signer: _algosdk.makeEmptyTransactionSigner.call(void 0, )
    };
  }
}, _class.__initStatic(), _class);








exports.registerAccessListResourceCarrier = registerAccessListResourceCarrier; exports.seedAccessResources = seedAccessResources; exports.seededAccessResources = seededAccessResources; exports.buildAccessListGroup = buildAccessListGroup; exports.installAccessListResourcePopulator = installAccessListResourcePopulator; exports.BaseSDK = BaseSDK;
//# sourceMappingURL=chunk-3QW7XUAW.js.map
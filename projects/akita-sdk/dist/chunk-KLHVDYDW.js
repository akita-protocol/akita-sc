"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } var _class;




var _chunkHFHM5QOFjs = require('./chunk-HFHM5QOF.js');



var _chunkL3SAIW4Gjs = require('./chunk-L3SAIW4G.js');

// src/base.ts
var _transact = require('@algorandfoundation/algokit-utils/transact');

// src/simulate/access-list.ts
var _composer = require('@algorandfoundation/algokit-utils/composer');
var _common = require('@algorandfoundation/algokit-utils/common');







var _algokitutils = require('@algorandfoundation/algokit-utils');
var MAX_ACCESS_LIST_ENTRIES = 16;
var ACCESS_DISCOVERY_OPCODE_BUDGET = 32e4;
var OP_UP_SELECTOR = new Uint8Array([133, 77, 237, 224]);
var ARC58_GET_ADMIN_SELECTOR = new Uint8Array([19, 188, 68, 228]);
var DEFAULT_CARRIER_MAX_FEE = _algokitutils.microAlgo.call(void 0, 257000n);
var ACCESS_LIST_PATCH = /* @__PURE__ */ Symbol.for("@akta/sdk/access-list-resource-populator");
var ACCESS_LIST_BUILD_PATCH = /* @__PURE__ */ Symbol.for("@akta/sdk/access-list-build-populator");
var ACCESS_LIST_ANALYSIS_PATCH = /* @__PURE__ */ Symbol.for("@akta/sdk/access-list-analysis-populator");
var ACCESS_LIST_RESET_PATCH = /* @__PURE__ */ Symbol.for("@akta/sdk/access-list-reset-populator");
var EMPTY_ACCESS_BOX_DECODER_PATCH = /* @__PURE__ */ Symbol.for("@akta/sdk/empty-access-box-decoder");
var SINGLE_SEND_RESULT_PATCH = /* @__PURE__ */ Symbol.for("@akta/sdk/access-list-single-send-result");
var ACCESS_CARRIER_REGISTRY = /* @__PURE__ */ Symbol.for("@akta/sdk/access-list-carrier-registry");
var validatedComposers = /* @__PURE__ */ new WeakSet();
var accessListRepairs = /* @__PURE__ */ new WeakMap();
var accessListRepairKeys = /* @__PURE__ */ new WeakMap();
var internalRetryResets = /* @__PURE__ */ new WeakSet();
function registeredAccessCarrierApps(algod) {
  return _nullishCoalesce(algod[ACCESS_CARRIER_REGISTRY], () => ( /* @__PURE__ */ new Map()));
}
function wireKey(value) {
  return value instanceof Uint8Array ? new TextDecoder().decode(value) : String(value);
}
function wireValue(object, key) {
  if (object instanceof Map) {
    for (const [candidate, value] of object) {
      if (wireKey(candidate) === key) return value;
    }
    return void 0;
  }
  return object[key];
}
function wireWithValue(object, key, value) {
  if (object instanceof Map) {
    const copy = new Map(object);
    const existingKey = _nullishCoalesce([...copy.keys()].find((candidate) => wireKey(candidate) === key), () => ( key));
    copy.set(existingKey, value);
    return copy;
  }
  return { ...object, [key]: value };
}
function installEmptyAccessBoxDecoderCompatibility() {
  var _a;
  const appCallCodec = (_a = _transact.TransactionParamsMeta.fields.find((field) => field.name === "appCall")) == null ? void 0 : _a.codec;
  if (!appCallCodec) return;
  const prototype = Object.getPrototypeOf(appCallCodec);
  if (prototype[EMPTY_ACCESS_BOX_DECODER_PATCH] || !prototype.encodeResourceReferences || !prototype.decodeResourceReferences) {
    return;
  }
  const originalEncode = prototype.encodeResourceReferences;
  const originalDecode = prototype.decodeResourceReferences;
  prototype.encodeResourceReferences = function patchedEncodeResourceReferences(appId, references, format) {
    var _a2;
    const encoded = _nullishCoalesce(((_a2 = originalEncode.call(this, appId, references, format)) == null ? void 0 : _a2.map((reference) => {
      const box = wireValue(reference, "b");
      if (!box || typeof box !== "object") return reference;
      const boxObject = box;
      if (wireValue(boxObject, "i") !== void 0 || wireValue(boxObject, "n") !== void 0) return reference;
      return {};
    })), () => ( []));
    return encoded.length > 0 ? encoded : void 0;
  };
  prototype.decodeResourceReferences = function patchedDecodeResourceReferences(references, format) {
    const normalized = references == null ? void 0 : references.map((reference) => {
      const box = wireValue(reference, "b");
      if (box === void 0 && ["d", "s", "p", "h", "l"].every((key) => wireValue(reference, key) === void 0)) {
        return { b: { n: new Uint8Array(0) } };
      }
      if (!box || typeof box !== "object") return reference;
      const boxObject = box;
      if (wireValue(boxObject, "n") !== void 0) return reference;
      return wireWithValue(reference, "b", wireWithValue(boxObject, "n", new Uint8Array(0)));
    });
    return originalDecode.call(this, normalized, format);
  };
  prototype[EMPTY_ACCESS_BOX_DECODER_PATCH] = true;
}
function algoAmountMicroAlgos(value) {
  if (typeof value === "bigint") return value;
  if (!value || typeof value !== "object" || !("microAlgos" in value)) return void 0;
  const microAlgos = value.microAlgos;
  return typeof microAlgos === "bigint" ? microAlgos : void 0;
}
function addFeeDeficit(delta, additionalDeficit) {
  const current = delta && typeof delta === "object" && "type" in delta && "data" in delta && typeof delta.data === "bigint" ? delta.type === 0 ? delta.data : -delta.data : 0n;
  const combined = current + additionalDeficit;
  if (combined > 0n) return { type: 0, data: combined };
  if (combined < 0n) return { type: 1, data: -combined };
  return void 0;
}
function byteFeeRequirement(transaction, feeParams, assumedFee, grouped) {
  const atFee = new (0, _transact.Transaction)({
    ...transaction,
    fee: assumedFee,
    group: grouped ? new Uint8Array(32).fill(1) : void 0
  });
  return _transact.calculateFee.call(void 0, atFee, feeParams);
}
function isAutomaticCarrierTransaction(transaction) {
  const note = transaction.note;
  return Boolean(
    transaction.type === _transact.TransactionType.AppCall && note && new TextDecoder().decode(note).startsWith("akta-access-carrier-")
  );
}
function installSingleSendResultCompatibility() {
  const prototype = _algokitutils.AlgorandClientTransactionSender.prototype;
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
  return address.equals(_common.Address.zeroAddress());
}
function isLiteralZeroAddressReference(reference) {
  return reference.address !== void 0 && isZeroAddress(reference.address);
}
function effectiveAddress(address, transaction) {
  return isZeroAddress(address) ? transaction.sender : address;
}
function effectiveAppId(appId, transaction) {
  return appId === 0n ? transaction.appCall.appId : appId;
}
function normalizeReference(reference, transaction) {
  const appCall = transaction.appCall;
  if (reference.address) {
    if (reference.address.equals(transaction.sender)) return void 0;
    return { address: reference.address };
  }
  if (reference.assetId !== void 0) return { assetId: reference.assetId };
  if (reference.appId !== void 0) {
    if (reference.appId === 0n || reference.appId === appCall.appId) return void 0;
    return { appId: reference.appId };
  }
  if (reference.holding) {
    return {
      holding: {
        address: reference.holding.address.equals(transaction.sender) ? _common.Address.zeroAddress() : reference.holding.address,
        assetId: reference.holding.assetId
      }
    };
  }
  if (reference.locals) {
    const address = reference.locals.address.equals(transaction.sender) ? _common.Address.zeroAddress() : reference.locals.address;
    const appId = reference.locals.appId === appCall.appId ? 0n : reference.locals.appId;
    if (isZeroAddress(address) && appId === 0n) return void 0;
    return { locals: { address, appId } };
  }
  if (reference.box) {
    return {
      box: {
        appId: reference.box.appId === 0n || reference.box.appId === appCall.appId ? 0n : reference.box.appId,
        name: reference.box.name
      }
    };
  }
  return void 0;
}
function referenceKey(reference, transaction) {
  if (reference.address) return `d:${reference.address.toString()}`;
  if (reference.assetId !== void 0) return `s:${reference.assetId}`;
  if (reference.appId !== void 0) return `p:${effectiveAppId(reference.appId, transaction)}`;
  if (reference.holding) {
    return `h:${effectiveAddress(reference.holding.address, transaction).toString()}:${reference.holding.assetId}`;
  }
  if (reference.locals) {
    return `l:${effectiveAddress(reference.locals.address, transaction).toString()}:${effectiveAppId(reference.locals.appId, transaction)}`;
  }
  if (reference.box) {
    return `b:${effectiveAppId(reference.box.appId, transaction)}:${bytesKey(reference.box.name)}`;
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
    if (actual !== transaction.appCall.appId) primitiveEntries.add(`p:${actual}`);
  };
  for (const rawReference of references) {
    const reference = normalizeReference(rawReference, transaction);
    if (!reference) continue;
    if (isLiteralZeroAddressReference(reference)) continue;
    if (reference.address) ensureLiteralAddress(reference.address);
    else if (reference.assetId !== void 0) ensureAsset(reference.assetId);
    else if (reference.appId !== void 0) ensureApp(reference.appId);
    else if (reference.holding) {
      ensureCompositeAddress(reference.holding.address);
      ensureAsset(reference.holding.assetId);
      compositeEntries += 1;
    } else if (reference.locals) {
      ensureCompositeAddress(reference.locals.address);
      ensureApp(reference.locals.appId);
      compositeEntries += 1;
    } else if (reference.box) {
      ensureApp(reference.box.appId);
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
      result.add(`s:${reference.holding.assetId}`);
    } else if (reference.locals) {
      const address = effectiveAddress(reference.locals.address, plan.transaction);
      const appId = effectiveAppId(reference.locals.appId, plan.transaction);
      result.add(`d:${address.toString()}`);
      result.add(`p:${appId}`);
    } else if (reference.box) {
      result.add(`p:${effectiveAppId(reference.box.appId, plan.transaction)}`);
    }
  }
  result.add(`d:${plan.transaction.sender.toString()}`);
  result.add(`p:${plan.transaction.appCall.appId}`);
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
  if (normalized.locals && !effectiveAddress(normalized.locals.address, plan.transaction).equals(plan.transaction.sender) && effectiveAppId(normalized.locals.appId, plan.transaction) === plan.transaction.appCall.appId) {
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
  return transaction.type === _transact.TransactionType.AppCall && transaction.appCall !== void 0 && ((_nullishCoalesce(((_a = transaction.appCall.accountReferences) == null ? void 0 : _a.length), () => ( 0))) > 0 || (_nullishCoalesce(((_b = transaction.appCall.assetReferences) == null ? void 0 : _b.length), () => ( 0))) > 0 || (_nullishCoalesce(((_c = transaction.appCall.appReferences) == null ? void 0 : _c.length), () => ( 0))) > 0);
}
function legacyReferenceCount(transaction) {
  var _a, _b, _c, _d;
  const appCall = transaction.appCall;
  return (_nullishCoalesce(((_a = appCall.accountReferences) == null ? void 0 : _a.length), () => ( 0))) + (_nullishCoalesce(((_b = appCall.assetReferences) == null ? void 0 : _b.length), () => ( 0))) + (_nullishCoalesce(((_c = appCall.appReferences) == null ? void 0 : _c.length), () => ( 0))) + (_nullishCoalesce(((_d = appCall.boxReferences) == null ? void 0 : _d.length), () => ( 0)));
}
function provideLiteralZeroAddress(transactions) {
  var _a, _b;
  const zeroAddress = _common.Address.zeroAddress();
  const appTransactions = transactions.filter(
    (transaction) => transaction.type === _transact.TransactionType.AppCall && transaction.appCall !== void 0
  );
  for (const transaction of appTransactions) {
    const appCall = transaction.appCall;
    appCall.accessReferences = (_a = appCall.accessReferences) == null ? void 0 : _a.filter(
      (reference) => !isLiteralZeroAddressReference(reference)
    );
    if (((_b = appCall.accessReferences) == null ? void 0 : _b.length) === 0) appCall.accessReferences = void 0;
  }
  if (appTransactions.some(
    (transaction) => {
      var _a2;
      return (_a2 = transaction.appCall.accountReferences) == null ? void 0 : _a2.some((address) => isZeroAddress(address));
    }
  )) {
    return;
  }
  const candidate = appTransactions.filter((transaction) => {
    var _a2, _b2;
    const appCall = transaction.appCall;
    return (_nullishCoalesce(((_a2 = appCall.accessReferences) == null ? void 0 : _a2.length), () => ( 0))) === 0 && (_nullishCoalesce(((_b2 = appCall.accountReferences) == null ? void 0 : _b2.length), () => ( 0))) < 4 && legacyReferenceCount(transaction) < 8;
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
  candidate.appCall.accountReferences = [
    ..._nullishCoalesce(candidate.appCall.accountReferences, () => ( [])),
    zeroAddress
  ];
}
function addToBestTransaction(plans, reference, allowDuplicate = false) {
  if (!allowDuplicate && hasResource(plans, reference)) return true;
  const candidates = plans.map((plan, index) => {
    const normalized = normalizeReference(reference, plan.transaction);
    if (!normalized) return { index, incremental: 0, total: accessListEntryCount(plan.transaction, plan.references) };
    if (normalized.locals && !effectiveAddress(normalized.locals.address, plan.transaction).equals(plan.transaction.sender) && effectiveAppId(normalized.locals.appId, plan.transaction) === plan.transaction.appCall.appId) {
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
    transaction: new (0, _transact.Transaction)({
      type: _transact.TransactionType.AppCall,
      sender: transaction.sender,
      firstValid: transaction.firstValid,
      lastValid: transaction.lastValid,
      appCall: {
        appId: transaction.appCall.appId,
        onComplete: transaction.appCall.onComplete
      }
    })
  };
}
function transactionResources(resources, createdAppIds = /* @__PURE__ */ new Set()) {
  if (!resources) return [];
  const createdAppAddresses = new Set(
    Array.from(createdAppIds, (appId) => _common.getApplicationAddress.call(void 0, appId).toString())
  );
  return [
    ...(_nullishCoalesce(resources.accounts, () => ( []))).filter((address) => !isZeroAddress(address)).filter((address) => !createdAppAddresses.has(address.toString())).map((address) => ({ address })),
    ...(_nullishCoalesce(resources.assets, () => ( []))).map((assetId) => ({ assetId })),
    ...(_nullishCoalesce(resources.apps, () => ( []))).filter((appId) => !createdAppIds.has(appId)).map((appId) => ({ appId })),
    ...(_nullishCoalesce(resources.assetHoldings, () => ( []))).map((holding) => ({ holding })),
    ...(_nullishCoalesce(resources.appLocals, () => ( []))).map((locals) => ({ locals })),
    ...(_nullishCoalesce(resources.boxes, () => ( []))).filter((box) => !createdAppIds.has(box.appId)).map((box) => ({ box }))
  ];
}
function groupResources(resources, createdAppIds = /* @__PURE__ */ new Set()) {
  if (!resources) return [];
  const createdAppAddresses = new Set(
    Array.from(createdAppIds, (appId) => _common.getApplicationAddress.call(void 0, appId).toString())
  );
  return [
    ...(_nullishCoalesce(resources.appLocals, () => ( []))).map((locals) => ({ locals })),
    ...(_nullishCoalesce(resources.assetHoldings, () => ( []))).map((holding) => ({ holding })),
    ...(_nullishCoalesce(resources.boxes, () => ( []))).filter((box) => !createdAppIds.has(box.appId)).map((box) => ({ box })),
    ...(_nullishCoalesce(resources.accounts, () => ( []))).filter((address) => !isZeroAddress(address)).filter((address) => !createdAppAddresses.has(address.toString())).map((address) => ({ address })),
    ...(_nullishCoalesce(resources.assets, () => ( []))).map((assetId) => ({ assetId })),
    ...(_nullishCoalesce(resources.apps, () => ( []))).filter((appId) => !createdAppIds.has(appId)).map((appId) => ({ appId }))
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
    add("assetHoldings", `h:${value.address.toString()}:${value.assetId}`, value);
  }
  for (const value of _nullishCoalesce((resources == null ? void 0 : resources.appLocals), () => ( []))) {
    add("appLocals", `l:${value.address.toString()}:${value.appId}`, value);
  }
  for (const value of _nullishCoalesce((resources == null ? void 0 : resources.boxes), () => ( []))) {
    add("boxes", `b:${value.appId}:${bytesKey(value.name)}`, value);
  }
  if ((_nullishCoalesce((resources == null ? void 0 : resources.extraBoxRefs), () => ( 0))) > 0) filtered.extraBoxRefs = resources.extraBoxRefs;
  return hasUnnamedResources(filtered) ? filtered : void 0;
}
function unavailableResourceFromFailure(message) {
  var _a, _b, _c;
  const account = (_a = /unavailable Account ([A-Z2-7]{58})/.exec(message)) == null ? void 0 : _a[1];
  if (account) return { accounts: [_common.Address.fromString(account)] };
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
    if (transaction.type !== _transact.TransactionType.AppCall || !transaction.appCall) continue;
    for (const reference of _nullishCoalesce(transaction.appCall.accessReferences, () => ( []))) {
      if (!reference.box) continue;
      count(reference.box.appId, reference.box.name, transaction);
    }
    for (const box of _nullishCoalesce(transaction.appCall.boxReferences, () => ( []))) {
      count(box.appId, box.name, transaction);
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
function resetComposerForRetry(composer) {
  internalRetryResets.add(composer);
  try {
    composer.reset();
  } finally {
    internalRetryResets.delete(composer);
  }
  const visited = /* @__PURE__ */ new WeakSet();
  const clearGroup = (value) => {
    if (!value || typeof value !== "object" || visited.has(value)) return;
    visited.add(value);
    if (value instanceof _transact.Transaction) {
      value.group = void 0;
      return;
    }
    if (Array.isArray(value)) {
      for (const item of value) clearGroup(item);
      return;
    }
    if (Object.getPrototypeOf(value) !== Object.prototype) return;
    for (const item of Object.values(value)) clearGroup(item);
  };
  for (const transaction of composer.txns) {
    const maybePromise = transaction.data.txn;
    if (transaction.type === "asyncTxn" && maybePromise instanceof Promise) {
      transaction.data.txn = maybePromise.then((resolved) => {
        const clone = new (0, _transact.Transaction)({ ...resolved });
        clone.group = void 0;
        return clone;
      });
    } else {
      clearGroup(transaction.data);
    }
  }
}
function collectCreatedAppIds(group) {
  const result = /* @__PURE__ */ new Set();
  const visit = (pending) => {
    if (!pending) return;
    if (pending.appId && pending.appId > 0n) result.add(pending.appId);
    for (const inner of _nullishCoalesce(pending.innerTxns, () => ( []))) visit(inner);
  };
  for (const transaction of _nullishCoalesce((group == null ? void 0 : group.txnResults), () => ( []))) visit(transaction.txnResult);
  return [...result];
}
function populateAccessListResources(transactions, groupAnalysis) {
  var _a, _b, _c, _d;
  const appTransactions = transactions.map((transaction, groupIndex) => ({ transaction, groupIndex })).filter(({ transaction }) => transaction.type === _transact.TransactionType.AppCall && transaction.appCall !== void 0);
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
        return (_a2 = transaction.appCall.accessReferences) == null ? void 0 : _a2.some(isLiteralZeroAddressReference);
      }
    )
  );
  if (needsLiteralZeroAddress) provideLiteralZeroAddress(transactions);
  const plans = appTransactions.filter(({ transaction }) => !hasLegacyIndexedReferences(transaction)).map(({ transaction, groupIndex }) => {
    const appCall = transaction.appCall;
    const references = [
      ..._nullishCoalesce(appCall.accessReferences, () => ( [])),
      ...(_nullishCoalesce(appCall.boxReferences, () => ( []))).map((box) => ({ box }))
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
  for (let index = 0; index < extraBoxReferences; index += 1) {
    addGroupReference({ box: { appId: 0n, name: new Uint8Array(0) } }, true);
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
    const appCall = plan.transaction.appCall;
    const size = accessListEntryCount(plan.transaction, plan.references);
    if (size > MAX_ACCESS_LIST_ENTRIES) {
      throw new Error(`Access list contains ${size} entries; maximum is ${MAX_ACCESS_LIST_ENTRIES}.`);
    }
    appCall.accessReferences = plan.references.length > 0 ? plan.references : void 0;
    appCall.boxReferences = void 0;
  }
}
function installAccessListResourcePopulator() {
  installEmptyAccessBoxDecoderCompatibility();
  installSingleSendResultCompatibility();
  const prototype = _composer.TransactionComposer.prototype;
  if (!prototype[ACCESS_LIST_RESET_PATCH]) {
    const originalReset = prototype.reset;
    prototype.reset = function patchedReset() {
      originalReset.call(this);
      validatedComposers.delete(this);
      if (!internalRetryResets.has(this)) {
        accessListRepairs.delete(this);
        accessListRepairKeys.delete(this);
      }
    };
    prototype[ACCESS_LIST_RESET_PATCH] = true;
  }
  if (!prototype[ACCESS_LIST_ANALYSIS_PATCH]) {
    const originalAnalyze = prototype.analyzeGroupRequirements;
    prototype.analyzeGroupRequirements = async function patchedAnalyze(transactions, suggestedParams, analysisParams) {
      const originalAlgod = this.algod;
      let capturedGroup;
      this.algod = new Proxy(originalAlgod, {
        get(target, property, receiver) {
          if (property !== "simulateTransactions") return Reflect.get(target, property, receiver);
          return async (request) => {
            const response = await target.simulateTransactions({
              ...request,
              extraOpcodeBudget: ACCESS_DISCOVERY_OPCODE_BUDGET
            });
            capturedGroup = response.txnGroups[0];
            return response;
          };
        }
      });
      try {
        const result = await originalAnalyze.call(this, transactions, suggestedParams, analysisParams);
        const feeParams = suggestedParams;
        if (feeParams.fee !== void 0 && feeParams.minFee !== void 0) {
          result.accessListFeeParams = {
            feePerByte: feeParams.fee,
            minFee: feeParams.minFee
          };
        }
        result.createdAppIds = collectCreatedAppIds(capturedGroup);
        return result;
      } finally {
        this.algod = originalAlgod;
      }
    };
    prototype[ACCESS_LIST_ANALYSIS_PATCH] = true;
  }
  if (!prototype[ACCESS_LIST_BUILD_PATCH]) {
    const originalBuild = prototype.build;
    prototype.build = async function patchedBuild() {
      var _a, _b;
      let repairPasses = 0;
      while (true) {
        try {
          const result = await originalBuild.call(this);
          if (!validatedComposers.has(this) && this.composerConfig.populateAppCallResources && result.transactions.some(({ txn }) => txn.type === _transact.TransactionType.AppCall)) {
            const unsignedGroup = {
              txnGroups: [
                {
                  txns: result.transactions.map(({ txn }) => ({
                    txn,
                    sig: new Uint8Array(64)
                  }))
                }
              ],
              allowEmptySignatures: true,
              fixSigners: true,
              allowMoreLogging: true
            };
            const validation = await this.algod.simulateTransactions({
              ...unsignedGroup,
              allowUnnamedResources: false
            });
            const group = validation.txnGroups[0];
            if (group == null ? void 0 : group.failureMessage) {
              if (/(?:dynamic cost|static cost|opcode) budget exceeded/i.test(group.failureMessage) || /group fee .* too small \(need [1-9]/i.test(group.failureMessage)) {
                throw new AccessListCapacityError(
                  "Strict simulation requires another pooled opcode-budget carrier.",
                  1
                );
              }
              const relaxedValidation = await this.algod.simulateTransactions({
                ...unsignedGroup,
                allowUnnamedResources: true,
                extraOpcodeBudget: ACCESS_DISCOVERY_OPCODE_BUDGET
              });
              const relaxedGroup = _nullishCoalesce(relaxedValidation.txnGroups[0], () => ( {}));
              const repaired = recordAccessListRepairs(
                this,
                relaxedGroup,
                result.transactions.map(({ txn }) => txn),
                group.failureMessage
              );
              if (repaired) {
                repairPasses += 1;
                if (repairPasses > 32) {
                  throw new Error("Access-list repair did not converge after 32 strict simulation passes.");
                }
                resetComposerForRetry(this);
                continue;
              }
              throw new Error(
                `Final Access-list validation failed in transaction ${_nullishCoalesce(((_a = group.failedAt) == null ? void 0 : _a.join(", ")), () => ( "unknown"))}: ` + group.failureMessage
              );
            }
            validatedComposers.add(this);
          }
          return result;
        } catch (error) {
          if (!(error instanceof AccessListCapacityError)) throw error;
          const currentCount = this.txns.length;
          if (currentCount + error.requiredCarrierCount > 16) {
            throw new Error(
              `This atomic path needs ${error.requiredCarrierCount} additional Access/opcode carrier call(s), but only ${16 - currentCount} group slot(s) remain. Split or batch the operation; Algorand groups are limited to 16 transactions.`
            );
          }
          const builtTransactions = _nullishCoalesce(this.rawBuildTransactions, () => ( []));
          const registeredApps = registeredAccessCarrierApps(this.algod);
          const anchorIndex = builtTransactions.findIndex(
            (transaction) => transaction.type === _transact.TransactionType.AppCall && transaction.appCall !== void 0 && transaction.appCall.appId > 0n && transaction.appCall.onComplete !== _transact.OnApplicationComplete.DeleteApplication && registeredApps.has(transaction.appCall.appId.toString())
          );
          const deletingRegisteredApps = new Set(
            builtTransactions.filter(
              (transaction) => {
                var _a2;
                return transaction.type === _transact.TransactionType.AppCall && ((_a2 = transaction.appCall) == null ? void 0 : _a2.onComplete) === _transact.OnApplicationComplete.DeleteApplication && registeredApps.has(transaction.appCall.appId.toString());
              }
            ).map((transaction) => transaction.appCall.appId.toString())
          );
          const externalTarget = [...registeredApps.keys()].find((appId) => !deletingRegisteredApps.has(appId));
          const targetAppId = anchorIndex >= 0 ? builtTransactions[anchorIndex].appCall.appId : externalTarget ? BigInt(externalTarget) : void 0;
          if (targetAppId === void 0) {
            const appIds = builtTransactions.filter((transaction) => {
              var _a2;
              return transaction.type === _transact.TransactionType.AppCall && ((_a2 = transaction.appCall) == null ? void 0 : _a2.appId);
            }).map((transaction) => transaction.appCall.appId.toString()).join(", ");
            throw new Error(
              `The group needs ${error.requiredCarrierCount} additional Access/opcode carrier call(s), but none of its usable app IDs (${appIds || "none"}) is registered with a safe carrier method. Construct the call through an Akita SDK, upgrade the target contract, or include another carrier-capable app; a carrier cannot execute after its own app is deleted.`
            );
          }
          const targetSelector = registeredApps.get(targetAppId.toString());
          if (!targetSelector) {
            throw new Error(`No safe Access-list carrier selector is registered for application ${targetAppId}.`);
          }
          const anchorTransaction = builtTransactions[anchorIndex >= 0 ? anchorIndex : 0];
          let senderContextIndex = anchorIndex;
          for (let index = builtTransactions.length - 1; index >= 0; index -= 1) {
            if (!isAutomaticCarrierTransaction(builtTransactions[index])) {
              senderContextIndex = index;
              break;
            }
          }
          const senderTransaction = builtTransactions[senderContextIndex];
          const senderContext = _nullishCoalesce(((_b = this.txns[senderContextIndex]) == null ? void 0 : _b.data), () => ( {}));
          const signer = senderContext.signer;
          const sender = _nullishCoalesce(senderContext.sender, () => ( senderTransaction.sender));
          const maxFee = _nullishCoalesce(senderContext.maxFee, () => ( DEFAULT_CARRIER_MAX_FEE));
          resetComposerForRetry(this);
          for (let index = 0; index < error.requiredCarrierCount; index += 1) {
            this.addAppCall({
              appId: targetAppId,
              sender,
              ...signer !== void 0 ? { signer } : {},
              args: [targetSelector],
              maxFee,
              // The note is part of the transaction ID. Include the absolute
              // group position so one-at-a-time opcode retries never append
              // duplicate carrier transactions.
              note: `akta-access-carrier-${currentCount + index + 1}`,
              firstValidRound: anchorTransaction.firstValid,
              lastValidRound: anchorTransaction.lastValid
            });
          }
        }
      }
    };
    prototype[ACCESS_LIST_BUILD_PATCH] = true;
  }
  if (prototype[ACCESS_LIST_PATCH]) return;
  const originalPopulate = prototype.populateTransactionAndGroupResources;
  prototype.populateTransactionAndGroupResources = function patchedPopulate(transactions, groupAnalysis) {
    var _a;
    const effectiveAnalysis = mergeGroupAnalysis(groupAnalysis, accessListRepairs.get(this), transactions.length);
    const feeParams = effectiveAnalysis == null ? void 0 : effectiveAnalysis.accessListFeeParams;
    const assumedFees = transactions.map(
      (transaction, groupIndex) => {
        var _a2;
        return _nullishCoalesce(_nullishCoalesce(algoAmountMicroAlgos((_a2 = this.txns[groupIndex]) == null ? void 0 : _a2.data.maxFee), () => ( transaction.fee)), () => ( 0n));
      }
    );
    const feesBeforeAccess = feeParams ? transactions.map(
      (transaction) => byteFeeRequirement(transaction, feeParams, _nullishCoalesce(transaction.fee, () => ( 0n)), false)
    ) : [];
    populateAccessListResources(transactions, effectiveAnalysis);
    const feesAfterAccess = feeParams ? transactions.map(
      (transaction, groupIndex) => byteFeeRequirement(transaction, feeParams, assumedFees[groupIndex], transactions.length > 1)
    ) : [];
    const hasAccessFeeGrowth = feesAfterAccess.some(
      (requiredFee, groupIndex) => requiredFee > feesBeforeAccess[groupIndex]
    );
    const coversInnerFees = _nullishCoalesce(((_a = this.composerConfig) == null ? void 0 : _a.coverAppCallInnerTransactionFees), () => ( false));
    const resourcesStripped = effectiveAnalysis ? {
      ...effectiveAnalysis,
      transactions: effectiveAnalysis.transactions.map((analysis, groupIndex) => {
        const feeAdjustment = feeParams ? coversInnerFees ? feesAfterAccess[groupIndex] - feesBeforeAccess[groupIndex] : hasAccessFeeGrowth ? feesAfterAccess[groupIndex] - (_nullishCoalesce(transactions[groupIndex].fee, () => ( 0n))) : 0n : 0n;
        const feeAdjusted = {
          ...analysis,
          requiredFeeDelta: addFeeDeficit(
            coversInnerFees || !hasAccessFeeGrowth ? analysis.requiredFeeDelta : void 0,
            feeAdjustment
          )
        };
        if (hasLegacyIndexedReferences(transactions[groupIndex])) return feeAdjusted;
        return { ...feeAdjusted, unnamedResourcesAccessed: void 0 };
      }),
      unnamedResourcesAccessed: void 0
    } : void 0;
    return originalPopulate.call(this, transactions, resourcesStripped);
  };
  prototype[ACCESS_LIST_PATCH] = true;
}

// src/base.ts
installAccessListResourcePopulator();
var BaseSDK = (_class = class {
  
  
  
  __init() {this.readerAccount = _chunkHFHM5QOFjs.DEFAULT_READER}
  
  /** The detected network for this SDK instance */
  
  /**
   * Override this in subclasses to specify the environment variable name for the app ID
   */
  static __initStatic() {this.envVarName = ""}
  constructor({ factoryParams, algorand, factory, readerAccount, sendParams }, envVarName) {;_class.prototype.__init.call(this);
    var _a;
    this.network = _chunkHFHM5QOFjs.detectNetworkFromClient.call(void 0, algorand);
    const resolvedAppId = _chunkHFHM5QOFjs.resolveAppIdWithClient.call(void 0, 
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
    this.sendParams = { ..._nullishCoalesce(sendParams, () => ( _chunkHFHM5QOFjs.DEFAULT_SEND_PARAMS)) };
    if (!!factoryParams.defaultSender) {
      this.sendParams.sender = factoryParams.defaultSender;
    }
    if (!!factoryParams.defaultSigner) {
      this.sendParams.signer = _chunkL3SAIW4Gjs.normalizeSigner.call(void 0, factoryParams.defaultSigner);
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
      ...signer !== void 0 && { signer: _chunkL3SAIW4Gjs.normalizeSigner.call(void 0, signer) }
    };
  }
  getRequiredSendParams(params = {}) {
    const sendParams = this.getSendParams(params);
    if (!_chunkL3SAIW4Gjs.hasSenderSigner.call(void 0, sendParams)) {
      throw new Error("Sender and signer must be provided either explicitly or through defaults at SDK instantiation");
    }
    return sendParams;
  }
  getReaderSendParams({ sender } = {}) {
    return {
      ...this.sendParams,
      ...sender !== void 0 ? { sender } : { sender: this.readerAccount },
      signer: _transact.makeEmptyTransactionSigner.call(void 0, )
    };
  }
}, _class.__initStatic(), _class);



exports.BaseSDK = BaseSDK;
//# sourceMappingURL=chunk-KLHVDYDW.js.map
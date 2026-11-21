"use strict";Object.defineProperty(exports, "__esModule", {value: true}); var _class;// src/wallet/utils.ts
var _algosdk = require('algosdk');
var _algokitutils = require('@algorandfoundation/algokit-utils');
function escrowDeleteWarnings(id, address) {
  if (id === 0n) {
    return [{
      code: "address-returns-to-its-key",
      message: `Deleting this escrow closes the account ${address} and ends its rekey to the wallet. From then on the address is controlled by whoever holds its private key, and no longer by this wallet. Anything sent to it afterwards goes to that key holder. This cannot be undone.`
    }];
  }
  return [{
    code: "address-under-nobodys-control",
    message: `After this delete nobody controls the escrow's address ${address}. ALGO sent to it afterwards is lost for good. An asset can no longer be sent to it, because the address cannot opt in to one again. This cannot be undone.`
  }];
}
function assertEscrowCanBeDeleted(plan, unlock) {
  if (plan.blockers.length > 0) {
    throw new Error(`Escrow '${plan.escrow}' cannot be deleted: ${plan.blockers.join("; ")}`);
  }
  if (plan.locked && !unlock) {
    throw new Error(`Escrow '${plan.escrow}' is locked: unlock it first, or pass unlock`);
  }
}
function applyDefaultAppCallMaxFees(transactions, maxFee) {
  for (const transaction of transactions) {
    if ((transaction.type === "appCall" || transaction.type === "methodCall") && transaction.maxFee === void 0) {
      transaction.maxFee = maxFee;
    }
  }
}
function SpendAllowanceTypeFromString(type) {
  switch (type) {
    case "flat": {
      return 1n;
    }
    case "window": {
      return 2n;
    }
    case "drip": {
      return 3n;
    }
    default: {
      throw new Error(`Invalid allowance type: ${type}`);
    }
  }
}
function AllowancesToTuple(allowances) {
  return allowances.map(({ asset, type, useRounds = false, ...rest }) => {
    const max = "max" in rest ? rest.max : 0n;
    const interval = "interval" in rest ? rest.interval : 0n;
    const amount = "amount" in rest ? rest.amount : "rate" in rest ? rest.rate : 0n;
    return [asset, SpendAllowanceTypeFromString(type), amount, max, interval, useRounds];
  });
}
function AllowanceInfoTranslate(info) {
  const commonFields = {
    last: info.last,
    start: info.start,
    useRounds: info.useRounds
  };
  switch (info.type) {
    case 1:
      return {
        type: "flat",
        amount: info.amount,
        spent: info.spent,
        ...commonFields
      };
    case 2:
      return {
        type: "window",
        amount: info.amount,
        spent: info.spent,
        interval: info.interval,
        ...commonFields
      };
    case 3:
      return {
        type: "drip",
        lastLeftover: info.spent,
        max: info.max,
        rate: info.amount,
        interval: info.interval,
        ...commonFields
      };
    default:
      throw new Error(`Unknown allowance type ${info.type}`);
  }
}
function executionBoxKey(lease) {
  const prefix = new Uint8Array(Buffer.from("x"));
  const encodedLease = _algokitutils.encodeLease.call(void 0, lease);
  const result = new Uint8Array(prefix.length + encodedLease.length);
  result.set(prefix, 0);
  result.set(encodedLease, prefix.length);
  return result;
}
function domainBoxKey(address) {
  return new Uint8Array(
    Buffer.concat([
      Buffer.from("d"),
      typeof address === "string" ? _algosdk.decodeAddress.call(void 0, address).publicKey : address.publicKey
    ])
  );
}
var ValueMap = (_class = class {
  __init() {this.map = /* @__PURE__ */ new Map()}
  
  constructor(keyGenerator, iterable) {;_class.prototype.__init.call(this);
    this.keyGenerator = keyGenerator;
    if (iterable) {
      for (const [key, value] of iterable) {
        this.set(key, value);
      }
    }
  }
  generateKey(key) {
    if (typeof key === "string") {
      return key;
    }
    return this.keyGenerator(key);
  }
  set(key, value) {
    const stringKey = this.generateKey(key);
    this.map.set(stringKey, value);
    return this;
  }
  get(key) {
    const stringKey = this.generateKey(key);
    return this.map.get(stringKey);
  }
  has(key) {
    const stringKey = this.generateKey(key);
    return this.map.has(stringKey);
  }
  delete(key) {
    const stringKey = this.generateKey(key);
    return this.map.delete(stringKey);
  }
  clear() {
    this.map.clear();
  }
  get size() {
    return this.map.size;
  }
  keys() {
    return this.map.keys();
  }
  values() {
    return this.map.values();
  }
  entries() {
    return this.map.entries();
  }
  forEach(callbackfn) {
    this.map.forEach(callbackfn);
  }
  [Symbol.iterator]() {
    return this.map[Symbol.iterator]();
  }
}, _class);
var getTxns = async ({}) => [];











exports.escrowDeleteWarnings = escrowDeleteWarnings; exports.assertEscrowCanBeDeleted = assertEscrowCanBeDeleted; exports.applyDefaultAppCallMaxFees = applyDefaultAppCallMaxFees; exports.AllowancesToTuple = AllowancesToTuple; exports.AllowanceInfoTranslate = AllowanceInfoTranslate; exports.executionBoxKey = executionBoxKey; exports.domainBoxKey = domainBoxKey; exports.ValueMap = ValueMap; exports.getTxns = getTxns;
//# sourceMappingURL=chunk-MZHAP7IA.js.map
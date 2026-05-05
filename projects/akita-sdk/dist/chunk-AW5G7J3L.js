"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// src/utils.ts
var _algosdk = require('algosdk'); var _algosdk2 = _interopRequireDefault(_algosdk);
var _utils = require('@noble/hashes/utils');






var _abi = require('@algorandfoundation/algokit-utils/abi');
var _transact = require('@algorandfoundation/algokit-utils/transact');
function convertToUnixTimestamp(timestamp) {
  return timestamp * 1000n;
}
function assertByteArrayLength(value, name, length) {
  if (!(value instanceof Uint8Array) || value.length !== length) {
    throw new Error(`${name} must be ${length} bytes`);
  }
}
function randomByteArray(length) {
  return _utils.randomBytes.call(void 0, length);
}
function reorderStructValue(value, fields, structs) {
  const ordered = {};
  for (const field of fields) {
    const fieldValue = value[field.name];
    if (typeof field.type === "string" && field.type in structs && fieldValue !== void 0 && fieldValue !== null && typeof fieldValue === "object" && !Array.isArray(fieldValue) && !(fieldValue instanceof Uint8Array)) {
      ordered[field.name] = reorderStructValue(
        fieldValue,
        structs[field.type],
        structs
      );
    } else {
      ordered[field.name] = fieldValue;
    }
  }
  return ordered;
}
var AVM_TYPE_NAMES = /* @__PURE__ */ new Set(["AVMString", "AVMBytes", "AVMUint64"]);
function encodeABIValue(value, typeName, structs) {
  if (typeName in structs) {
    const structType = _abi.ABIStructType.fromStruct(typeName, structs);
    const orderedValue = reorderStructValue(
      value,
      structs[typeName],
      structs
    );
    const tupleValue = _abi.getTupleValueFromStructValue.call(void 0, structType, orderedValue);
    return _abi.getABIEncodedValue.call(void 0, structType, tupleValue);
  }
  if (AVM_TYPE_NAMES.has(typeName)) {
    return _abi.getABIEncodedValue.call(void 0, typeName, value);
  }
  const abiType = _abi.ABIType.from(typeName);
  return _abi.getABIEncodedValue.call(void 0, abiType, value);
}
function decodeABIValue(bytes, typeName, structs) {
  if (typeName in structs) {
    const structType = _abi.ABIStructType.fromStruct(typeName, structs);
    return _abi.getABIDecodedValue.call(void 0, structType, bytes);
  }
  if (AVM_TYPE_NAMES.has(typeName)) {
    return _abi.getABIDecodedValue.call(void 0, typeName, bytes);
  }
  const abiType = _abi.ABIType.from(typeName);
  return _abi.getABIDecodedValue.call(void 0, abiType, bytes);
}
function wrapUtils10Signer(utils10Signer) {
  return async (txnGroup, indexesToSign) => {
    const utils10Group = txnGroup.map((t) => {
      if (typeof t.getEncodingSchema === "function") {
        const bytes = _algosdk2.default.encodeUnsignedTransaction(t);
        return _transact.decodeTransaction.call(void 0, bytes);
      }
      return t;
    });
    return utils10Signer(
      utils10Group,
      indexesToSign
    );
  };
}








exports.convertToUnixTimestamp = convertToUnixTimestamp; exports.assertByteArrayLength = assertByteArrayLength; exports.randomByteArray = randomByteArray; exports.encodeABIValue = encodeABIValue; exports.decodeABIValue = decodeABIValue; exports.wrapUtils10Signer = wrapUtils10Signer;
//# sourceMappingURL=chunk-AW5G7J3L.js.map
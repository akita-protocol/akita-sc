// src/utils.ts
import algosdk from "algosdk";
import { randomBytes as nobleRandomBytes } from "@noble/hashes/utils";
import {
  ABIStructType,
  ABIType,
  getABIDecodedValue as getABIDecodedValueRaw,
  getABIEncodedValue as getABIEncodedValueRaw,
  getTupleValueFromStructValue
} from "@algorandfoundation/algokit-utils/abi";
import { decodeTransaction } from "@algorandfoundation/algokit-utils/transact";
function convertToUnixTimestamp(timestamp) {
  return timestamp * 1000n;
}
function assertByteArrayLength(value, name, length) {
  if (!(value instanceof Uint8Array) || value.length !== length) {
    throw new Error(`${name} must be ${length} bytes`);
  }
}
function randomByteArray(length) {
  return nobleRandomBytes(length);
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
    const structType = ABIStructType.fromStruct(typeName, structs);
    const orderedValue = reorderStructValue(
      value,
      structs[typeName],
      structs
    );
    const tupleValue = getTupleValueFromStructValue(structType, orderedValue);
    return getABIEncodedValueRaw(structType, tupleValue);
  }
  if (AVM_TYPE_NAMES.has(typeName)) {
    return getABIEncodedValueRaw(typeName, value);
  }
  const abiType = ABIType.from(typeName);
  return getABIEncodedValueRaw(abiType, value);
}
function decodeABIValue(bytes, typeName, structs) {
  if (typeName in structs) {
    const structType = ABIStructType.fromStruct(typeName, structs);
    return getABIDecodedValueRaw(structType, bytes);
  }
  if (AVM_TYPE_NAMES.has(typeName)) {
    return getABIDecodedValueRaw(typeName, bytes);
  }
  const abiType = ABIType.from(typeName);
  return getABIDecodedValueRaw(abiType, bytes);
}
function wrapUtils10Signer(utils10Signer) {
  return async (txnGroup, indexesToSign) => {
    const utils10Group = txnGroup.map((t) => {
      if (typeof t.getEncodingSchema === "function") {
        const bytes = algosdk.encodeUnsignedTransaction(t);
        return decodeTransaction(bytes);
      }
      return t;
    });
    return utils10Signer(
      utils10Group,
      indexesToSign
    );
  };
}

export {
  convertToUnixTimestamp,
  assertByteArrayLength,
  randomByteArray,
  encodeABIValue,
  decodeABIValue,
  wrapUtils10Signer
};
//# sourceMappingURL=chunk-5F555WJV.mjs.map
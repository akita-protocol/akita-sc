// src/utils.ts
import { randomBytes as nobleRandomBytes } from "@noble/hashes/utils.js";
import { getABIEncodedValue, getABIDecodedValue } from "@algorandfoundation/algokit-utils/types/app-arc56";
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
function encodeABIValue(value, typeName, structs) {
  return getABIEncodedValue(value, typeName, structs);
}
function decodeABIValue(bytes, typeName, structs) {
  return getABIDecodedValue(bytes, typeName, structs);
}

export {
  convertToUnixTimestamp,
  assertByteArrayLength,
  randomByteArray,
  encodeABIValue,
  decodeABIValue
};
//# sourceMappingURL=chunk-XN5GRW52.mjs.map
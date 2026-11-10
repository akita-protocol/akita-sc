"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/utils.ts
var _utilsjs = require('@noble/hashes/utils.js');
var _apparc56 = require('@algorandfoundation/algokit-utils/types/app-arc56');
function convertToUnixTimestamp(timestamp) {
  return timestamp * 1000n;
}
function assertByteArrayLength(value, name, length) {
  if (!(value instanceof Uint8Array) || value.length !== length) {
    throw new Error(`${name} must be ${length} bytes`);
  }
}
function randomByteArray(length) {
  return _utilsjs.randomBytes.call(void 0, length);
}
function encodeABIValue(value, typeName, structs) {
  return _apparc56.getABIEncodedValue.call(void 0, value, typeName, structs);
}
function decodeABIValue(bytes, typeName, structs) {
  return _apparc56.getABIDecodedValue.call(void 0, bytes, typeName, structs);
}







exports.convertToUnixTimestamp = convertToUnixTimestamp; exports.assertByteArrayLength = assertByteArrayLength; exports.randomByteArray = randomByteArray; exports.encodeABIValue = encodeABIValue; exports.decodeABIValue = decodeABIValue;
//# sourceMappingURL=chunk-AP6ZTMST.js.map
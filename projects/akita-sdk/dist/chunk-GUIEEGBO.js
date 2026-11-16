"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } async function _asyncNullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return await rhsFn(); } } var _class; var _class2;


var _chunkZGCVKZRLjs = require('./chunk-ZGCVKZRL.js');


var _chunkLDSU2NENjs = require('./chunk-LDSU2NEN.js');


var _chunkQFFBRC6Ojs = require('./chunk-QFFBRC6O.js');

// src/meta/records.ts
var _algosdk = require('algosdk');
var METADATA_MAX_NAME_BYTES = 31;
var METADATA_MAX_KEY_BYTES = 31;
var METADATA_RECORD_HEADER_BYTES = 12;
var METADATA_MAX_APP_ARGS_BYTES = 16384;
var RECORD_ARGUMENT_BYTES = 22;
var PLUGIN_RECORD_ARGUMENT_BYTES = 33;
var METADATA_MAX_VALUE_BYTES = METADATA_MAX_APP_ARGS_BYTES - RECORD_ARGUMENT_BYTES - 1;
var METADATA_FINAL_PART_BYTES = 4084;
var METADATA_PART_BYTES = 4094;
var METADATA_INLINE_BYTES = 1024;
var METADATA_CHUNK_BYTES = 1024;
var encoder = new TextEncoder();
var recordType = _algosdk.ABIType.from("(uint64,byte[])");
function validateMetadataName(value) {
  if (!value || encoder.encode(value).length > METADATA_MAX_NAME_BYTES)
    throw new Error("Metadata names must contain 1\u201331 UTF-8 bytes.");
}
function metadataKeyBytes(key) {
  const bytes = typeof key === "string" ? encoder.encode(key) : key;
  if (!bytes.length || bytes.length > METADATA_MAX_KEY_BYTES)
    throw new Error("Metadata keys must contain 1\u201331 bytes.");
  return bytes;
}
function validateMetadataRecordKey(key) {
  metadataKeyBytes(key);
}
function metadataDataKey(name, key) {
  const namespace = encoder.encode(name), field = encoder.encode(key);
  if (namespace.length + field.length >= METADATA_MAX_KEY_BYTES)
    throw new Error("Metadata namespace and key must fit 30 UTF-8 bytes together.");
  return metadataKeyBytes(new Uint8Array([namespace.length, ...namespace, ...field]));
}
function metadataOwnerKey(account, key) {
  return new Uint8Array([..._algosdk.decodeAddress.call(void 0, account).publicKey, ...metadataKeyBytes(key)]);
}
function metadataBoxName(account, key) {
  return new Uint8Array([109, ...metadataOwnerKey(account, key)]);
}
function decodeMetadataBoxName(name) {
  if (name.length < 34 || name.length > 64 || name[0] !== 109)
    throw new Error("Invalid metadata box name.");
  return { account: _algosdk.encodeAddress.call(void 0, name.slice(1, 33)), key: name.slice(33) };
}
function decodeMetadataRecord(value) {
  if (value.length < METADATA_RECORD_HEADER_BYTES) throw new Error("Invalid metadata record.");
  const [revision, data] = recordType.decode(value);
  return { exists: true, revision, data: Uint8Array.from(data) };
}
function metadataValueLimit(key) {
  return METADATA_MAX_APP_ARGS_BYTES - RECORD_ARGUMENT_BYTES - metadataKeyBytes(key).length;
}
function metadataPluginValueLimit(namespace, key) {
  const recordKey = metadataDataKey(namespace, key);
  return METADATA_MAX_APP_ARGS_BYTES - PLUGIN_RECORD_ARGUMENT_BYTES - (recordKey.length - 1);
}
function validateMetadataValueSize(size, limit = METADATA_MAX_VALUE_BYTES) {
  if (!Number.isInteger(size) || size < 0 || size > limit)
    throw new Error(`Metadata values must contain at most ${limit} bytes for this call.`);
}
function metadataDataParts(data) {
  validateMetadataValueSize(data.length);
  const part = METADATA_PART_BYTES;
  return {
    data0: data.slice(0, part),
    data1: data.slice(part, 2 * part),
    data2: data.slice(2 * part, 3 * part),
    data3: data.slice(3 * part)
  };
}
function metadataStorageCost(size, key) {
  validateMetadataValueSize(size, metadataValueLimit(key));
  return 2500n + 400n * BigInt(33 + metadataKeyBytes(key).length + METADATA_RECORD_HEADER_BYTES + size);
}
var RECEIVE_QR_RECORD = { key: metadataDataKey("akita.receive-qr", "style") };
var ACCOUNT_IMAGE_RECORD = { key: metadataDataKey("akita.account", "image") };
function encodeMetadataJson(value) {
  const json = JSON.stringify(value);
  if (json === void 0) throw new Error("A JSON value is required.");
  const bytes = encoder.encode(json);
  validateMetadataValueSize(bytes.length);
  return bytes;
}

// src/meta/index.ts

var _algokitutils = require('@algorandfoundation/algokit-utils');

// src/generated/MetaClient.ts
var _apparc56 = require('@algorandfoundation/algokit-utils/types/app-arc56');


var _appclient = require('@algorandfoundation/algokit-utils/types/app-client');
var _appfactory = require('@algorandfoundation/algokit-utils/types/app-factory');
var APP_SPEC = { "name": "Meta", "structs": { "MetaRecordInfo": [{ "name": "exists", "type": "bool" }, { "name": "revision", "type": "uint64" }, { "name": "size", "type": "uint64" }], "MetaRecordRead": [{ "name": "exists", "type": "bool" }, { "name": "revision", "type": "uint64" }, { "name": "data", "type": "byte[]" }], "MetaRecordValue": [{ "name": "revision", "type": "uint64" }, { "name": "data", "type": "byte[]" }], "RootValue": [{ "name": "root", "type": "byte[32]" }, { "name": "type", "type": "uint64" }], "TypesValue": [{ "name": "schema", "type": "string" }, { "name": "description", "type": "string" }], "EscrowConfig": [{ "name": "name", "type": "string" }, { "name": "app", "type": "uint64" }] }, "methods": [{ "name": "create", "args": [{ "type": "string", "name": "version" }, { "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "Read-only resource carrier for box access.", "events": [], "recommendations": {} }, { "name": "addRoot", "args": [{ "type": "pay", "name": "payment" }, { "type": "string", "name": "name", "desc": "the name alias of the root being added" }, { "type": "byte[32]", "name": "root", "desc": "a merkle tree root" }, { "type": "uint64", "name": "type", "desc": "an index of the tree type enum from box storage" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Stores a Merkle root and its schema type together. Attached values\nuse the shared record store and may exist before or after the root.", "events": [], "recommendations": {} }, { "name": "deleteRoot", "args": [{ "type": "string", "name": "name", "desc": "the name of the merkle tree root" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Deletes the merkle root from the root box map", "events": [], "recommendations": {} }, { "name": "updateRoot", "args": [{ "type": "string", "name": "name", "desc": "the name of the merkle group data" }, { "type": "byte[32]", "name": "newRoot", "desc": "the new 32 byte merkle tree root" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Replaces the merkle root with another", "events": [], "recommendations": {} }, { "name": "addData", "args": [{ "type": "pay", "name": "payment" }, { "type": "string", "name": "name", "desc": "the name of the merkle tree root" }, { "type": "string", "name": "key", "desc": "the metadata key eg. `Royalty`" }, { "type": "string", "name": "value", "desc": "the metadata value eg. `5` encoded as a bytestring for 5%" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Publishes a value in the shared record store for an existing Merkle root.", "events": [], "recommendations": {} }, { "name": "deleteData", "args": [{ "type": "string", "name": "name", "desc": "the name of the merkle tree root" }, { "type": "string", "name": "key", "desc": "the metadata key you want to remove" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Removes the shared record for a Merkle data key.", "events": [], "recommendations": {} }, { "name": "verify", "args": [{ "type": "address", "name": "address", "desc": "the address of the merkle tree root creator" }, { "type": "string", "name": "name", "desc": "The name alias of the root" }, { "type": "byte[32]", "name": "leaf", "desc": "The hashed leaf to verify" }, { "type": "byte[32][]", "name": "proof", "desc": "The merkle proof" }, { "type": "uint64", "name": "type", "desc": "The type check for the lists purpose" }], "returns": { "type": "bool", "desc": "a boolean indicating whether the proof is valid" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "verify an inclusion in a double sha256 based merkle tree", "events": [], "recommendations": {} }, { "name": "read", "args": [{ "type": "address", "name": "address", "desc": "the address of the merkle tree root creator" }, { "type": "string", "name": "name", "desc": "the name of the merkle tree root" }, { "type": "string", "name": "key", "desc": "the metadata key eg. `Royalty`" }], "returns": { "type": "string", "desc": "the value set eg. `5` encoded as a bytestring for 5%" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "Fetch a metadata properties", "events": [], "recommendations": {} }, { "name": "verifiedRead", "args": [{ "type": "address", "name": "address", "desc": "the address of the merkle tree root creator" }, { "type": "string", "name": "name", "desc": "the name of the root" }, { "type": "byte[32]", "name": "leaf", "desc": "the leaf node to be verified" }, { "type": "byte[32][]", "name": "proof", "desc": "the proof the hash is included" }, { "type": "uint64", "name": "type", "desc": "the list type that helps contracts ensure\nthe lists purpose isn't being misused ( 0 if the caller doesnt care )" }, { "type": "string", "name": "key", "desc": "the metadata key eg. `Royalty`" }], "returns": { "type": "string", "desc": "a string of metadata" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Read metadata from box storage and verify the data provided is included\nin the merkle tree given a sha256'd 32 byte merkle tree root & a proof\nthats pre-computed off chain.\n\nverify an inclusion in a merkle tree\n& read an associated key value pair\n& check against the underlying data's schema\n& check against the underlying data's list type or purpose", "events": [], "recommendations": {} }, { "name": "verifiedMustRead", "args": [{ "type": "address", "name": "address", "desc": "the address of the merkle tree root creator" }, { "type": "string", "name": "name", "desc": "the name of the root" }, { "type": "byte[32]", "name": "leaf", "desc": "the leaf node to be verified" }, { "type": "byte[32][]", "name": "proof", "desc": "the proof the hash is included" }, { "type": "uint64", "name": "type", "desc": "the list type that helps contracts ensure\nthe lists purpose isn't being misused ( 0 if the caller doesnt care )" }, { "type": "string", "name": "key", "desc": "the metadata key eg. `Royalty`" }], "returns": { "type": "string", "desc": "a string of metadata" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Read metadata from box storage and verify the data provided is included\nin the merkle tree given a sha256'd 32 byte merkle tree root & a proof\nthats pre-computed off chain.\n\nverify an inclusion in a merkle tree\n& read an associated key value pair\n& check against the underlying data's schema\n& check against the underlying data's list type or purpose", "events": [], "recommendations": {} }, { "name": "addType", "args": [{ "type": "pay", "name": "payment" }, { "type": "string", "name": "description" }, { "type": "uint8[]", "name": "schemaList" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "collectTypeFees", "args": [], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Sends the type fees collected so far to the DAO's revenue escrow and returns the amount sent.\nAnyone may call it: the receiver and the amount both come from this app's state. It fails until\nthe DAO has named the escrow with `updateAkitaDAOEscrow`. The payment never takes the app below\nits minimum balance; whatever cannot be sent yet stays owed for a later call.", "events": [], "recommendations": {} }, { "name": "rootCosts", "args": [{ "type": "string", "name": "name" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "dataCosts", "args": [{ "type": "string", "name": "name" }, { "type": "string", "name": "key" }, { "type": "string", "name": "value" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "recordInfo", "args": [{ "type": "address", "name": "account" }, { "type": "byte[]", "name": "key" }], "returns": { "type": "(bool,uint64,uint64)", "struct": "MetaRecordInfo" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "readRecord", "args": [{ "type": "address", "name": "account" }, { "type": "byte[]", "name": "key" }], "returns": { "type": "(bool,uint64,byte[])", "struct": "MetaRecordRead" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "readRecordSlice", "args": [{ "type": "address", "name": "account" }, { "type": "byte[]", "name": "key" }, { "type": "uint64", "name": "offset" }, { "type": "uint64", "name": "length" }, { "type": "uint64", "name": "expectedRevision" }], "returns": { "type": "byte[]" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "recordCost", "args": [{ "type": "address", "name": "account" }, { "type": "byte[]", "name": "key" }, { "type": "uint64", "name": "size" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "setRecord", "args": [{ "type": "pay", "name": "payment" }, { "type": "byte[]", "name": "key" }, { "type": "byte[]", "name": "data0" }, { "type": "byte[]", "name": "data1" }, { "type": "byte[]", "name": "data2" }, { "type": "byte[]", "name": "data3" }, { "type": "uint64", "name": "expectedRevision" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "All four parts are published in this call; no intermediate record is observable.", "events": [], "recommendations": {} }, { "name": "removeRecord", "args": [{ "type": "byte[]", "name": "key" }, { "type": "uint64", "name": "expectedRevision" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAOEscrow", "args": [{ "type": "(string,uint64)", "struct": "EscrowConfig", "name": "config" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "update", "args": [{ "type": "string", "name": "newVersion" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["UpdateApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 3, "bytes": 2 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "typesID": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "dHlwZXNfaWQ=" }, "typeFees": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "dHlwZV9mZWVz", "desc": "Type fees collected and not yet sent to the DAO's revenue escrow (AUD-C7). Each fee is counted\nless the storage its type occupies, so this is never more than what the app can spare." }, "akitaDAOEscrow": { "keyType": "AVMString", "valueType": "EscrowConfig", "key": "YWtpdGFfZXNjcm93", "desc": "the named DAO escrow this contract routes fees to (name + app)" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" } }, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": { "types": { "keyType": "uint64", "valueType": "TypesValue", "desc": "the types (intents) of merkle trees that exist", "prefix": "dA==" }, "roots": { "keyType": "AVMBytes", "valueType": "RootValue", "desc": "the merkle roots we want to attach data to", "prefix": "cg==" }, "records": { "keyType": "AVMBytes", "valueType": "MetaRecordValue", "desc": "One value store for arbitrary keys and Merkle-attached metadata.", "prefix": "bQ==" } } } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [1240, 2940, 3226, 3999, 4120, 4160, 4247, 4417], "errorMessage": "Box must have value" }, { "pc": [1082, 1865], "errorMessage": "ERR:errDtl" }, { "pc": [1761], "errorMessage": "ERR:errFvri" }, { "pc": [823, 1210, 1849], "errorMessage": "ERR:errIpma" }, { "pc": [786, 1174, 1836], "errorMessage": "ERR:errIpmr" }, { "pc": [3556], "errorMessage": "ERR:errIpyr" }, { "pc": [3727], "errorMessage": "ERR:errIupg" }, { "pc": [1053, 1068, 3823], "errorMessage": "ERR:errKtl" }, { "pc": [1030, 3793], "errorMessage": "ERR:errMkey" }, { "pc": [687, 1020], "errorMessage": "ERR:errMnam" }, { "pc": [3353], "errorMessage": "ERR:errMpmt" }, { "pc": [3151], "errorMessage": "ERR:errMprt" }, { "pc": [2766, 3206, 4414], "errorMessage": "ERR:errMrev" }, { "pc": [2755, 4401], "errorMessage": "ERR:errMrnf" }, { "pc": [2814], "errorMessage": "ERR:errMrng" }, { "pc": [4316], "errorMessage": "ERR:errMrsl" }, { "pc": [2281], "errorMessage": "ERR:errMsch" }, { "pc": [2906, 3193], "errorMessage": "ERR:errMvsz" }, { "pc": [3649, 3692, 3764], "errorMessage": "ERR:errNdao" }, { "pc": [1411, 4186], "errorMessage": "ERR:errNdta" }, { "pc": [2418], "errorMessage": "ERR:errNesc" }, { "pc": [879, 941], "errorMessage": "ERR:errNnam" }, { "pc": [1154], "errorMessage": "ERR:errNrfd" }, { "pc": [773], "errorMessage": "ERR:errNtkn" }, { "pc": [712], "errorMessage": "ERR:errNtl" }, { "pc": [739], "errorMessage": "ERR:errNtrt" }, { "pc": [1129, 1388], "errorMessage": "ERR:errRkp" }, { "pc": [2302, 2364, 2425, 2429, 2437, 2441], "errorMessage": "account funded" }, { "pc": [2489, 3642, 3685, 3757], "errorMessage": "application exists" }, { "pc": [2290, 2370, 2395, 2446, 2456, 2472, 2484, 3635, 3678, 3697, 3750], "errorMessage": "check GlobalState exists" }, { "pc": [1888, 4089], "errorMessage": "index access is out of bounds" }, { "pc": [945, 3916, 4331], "errorMessage": "index out of bounds" }, { "pc": [597, 647, 848, 901, 966, 983, 1001, 1313, 1329, 1437, 1461, 1511, 1527, 1569, 1596, 1621, 1676, 1703, 1728, 1796, 1816, 2521, 2551, 2567, 2583, 2624, 2657, 2692, 2865, 2991, 3008, 3027, 3045, 3063, 3570, 3623, 3661, 4026], "errorMessage": "invalid array length header" }, { "pc": [604, 654, 855, 908, 973, 990, 1008, 1320, 1336, 1444, 1518, 1534, 1576, 1628, 1683, 1735, 1803, 1825, 2528, 2558, 2574, 2590, 2631, 2664, 2699, 2872, 2998, 3015, 3034, 3052, 3070, 3577, 3668], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [1470, 1605, 1712], "errorMessage": "invalid number of bytes for arc4.dynamic_array<bytes[32]>" }, { "pc": [668, 921, 1431, 1455, 1505, 1563, 1590, 1670, 1697, 2618, 2651, 2686, 2859], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [616, 677, 1479, 1614, 1721, 2714, 2726, 2738, 2887, 3084, 3589, 3742], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [3628], "errorMessage": "invalid number of bytes for smart_contracts/utils/base-contracts/base.ts::EscrowConfig" }, { "pc": [3615], "errorMessage": "invalid tail pointer at index 0 of ((len+utf8[]),uint64)" }, { "pc": [3610], "errorMessage": "invalid tuple encoding" }, { "pc": [3409, 3830], "errorMessage": "overflow" }, { "pc": [641, 960, 1790, 2985], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDEzCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCiNwcmFnbWEgYXV0b3NhbHQgZmFsc2UKCi8vIEBhbGdvcmFuZGZvdW5kYXRpb24vYWxnb3JhbmQtdHlwZXNjcmlwdC9hcmM0L2luZGV4LmQudHM6OkNvbnRyYWN0LmFwcHJvdmFsUHJvZ3JhbSgpIC0+IHVpbnQ2NDoKbWFpbjoKICAgIGludGNibG9jayAwIDEgMiAzMiAyODUwMCA0MDAgMzE3MDAgMTAyNCA0MDk0IDEwMDAwMDAwMCAxNjM4NAogICAgYnl0ZWNibG9jayAweDE1MWY3Yzc1ICIiICJtIiAidHlwZV9mZWVzIiAiYWtpdGFfZGFvIiAiciIgImFraXRhX2VzY3JvdyIgInR5cGVzX2lkIiAiJCIgIkVSUjplcnJJcG1yIiAiRVJSOmVycklwbWEiICJFUlI6ZXJyS3RsIiAiRVJSOmVyck1yZXYiICJ3YWxsZXQiICJFUlI6ZXJyTmRhbyIgInZlcnNpb24iICJFUlI6ZXJyTW5hbSIgIkVSUjplcnJObmFtIiAiRVJSOmVyck1rZXkiICJFUlI6ZXJyRHRsIiAibC4iICJFUlI6ZXJyUmtwIiAiRVJSOmVyck5kdGEiICJFUlI6ZXJyTXJuZiIgIkVSUjplcnJNdnN6IiAweDA2ODEwMQogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgIGJueiBtYWluX2FmdGVyX2lmX2Vsc2VAMgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxMjAKICAgIC8vIHR5cGVzSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IE1ldGFHbG9iYWxTdGF0ZUtleVR5cGVzSUQgfSkKICAgIGJ5dGVjIDcgLy8gInR5cGVzX2lkIgogICAgaW50Y18wIC8vIDAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjEyNQogICAgLy8gdHlwZUZlZXMgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IE1ldGFHbG9iYWxTdGF0ZUtleVR5cGVGZWVzIH0pCiAgICBieXRlY18zIC8vICJ0eXBlX2ZlZXMiCiAgICBpbnRjXzAgLy8gMAogICAgYXBwX2dsb2JhbF9wdXQKCm1haW5fYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxMTItMTEzCiAgICAvLyBAY29udHJhY3QoeyBhdm1WZXJzaW9uOiAxMyB9KQogICAgLy8gZXhwb3J0IGNsYXNzIE1ldGEgZXh0ZW5kcyBBa2l0YUJhc2VGZWVHZW5lcmF0b3JDb250cmFjdFdpdGhvdXRBa2l0YU9wdEluIHsKICAgIHB1c2hieXRlcyAweGVhOTE4MGRkIC8vIG1ldGhvZCAidXBkYXRlKHN0cmluZyl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggbWFpbl91cGRhdGVfcm91dGVANAoKbWFpbl9zd2l0Y2hfY2FzZV9uZXh0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjExMi0xMTMKICAgIC8vIEBjb250cmFjdCh7IGF2bVZlcnNpb246IDEzIH0pCiAgICAvLyBleHBvcnQgY2xhc3MgTWV0YSBleHRlbmRzIEFraXRhQmFzZUZlZUdlbmVyYXRvckNvbnRyYWN0V2l0aG91dEFraXRhT3B0SW4gewogICAgdHhuIE9uQ29tcGxldGlvbgogICAgIQogICAgYXNzZXJ0CiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgYnogbWFpbl9jcmVhdGVfTm9PcEAzMAogICAgcHVzaGJ5dGVzcyAweDg1NGRlZGUwIDB4YTI0YzA2N2MgMHhkZjI4N2E3ZCAweGM2ZDNkNzA0IDB4NDJmYzcyMDIgMHgwNmQzODkwNCAweDJiZjNjYzVhIDB4NTBjMzZlNDEgMHgwY2YxYjljZiAweDFmZjdjNzRjIDB4MzljMTdkZWQgMHhhMDNmOWQ5ZCAweDcyYjI1OTgxIDB4NzY4M2NkMjUgMHg5YTQ2MDYxZCAweDUwMWQzZWIyIDB4NTg2YWIzNGUgMHhkMGI2MjgwMiAweGIxZTZkNGZiIDB4MTdkM2QwNWIgMHhhZTg0Y2JkOCAweDMzZTkyYzk0IC8vIG1ldGhvZCAib3BVcCgpdm9pZCIsIG1ldGhvZCAiYWRkUm9vdChwYXksc3RyaW5nLGJ5dGVbMzJdLHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJkZWxldGVSb290KHN0cmluZyl2b2lkIiwgbWV0aG9kICJ1cGRhdGVSb290KHN0cmluZyxieXRlWzMyXSl2b2lkIiwgbWV0aG9kICJhZGREYXRhKHBheSxzdHJpbmcsc3RyaW5nLHN0cmluZyl2b2lkIiwgbWV0aG9kICJkZWxldGVEYXRhKHN0cmluZyxzdHJpbmcpdm9pZCIsIG1ldGhvZCAidmVyaWZ5KGFkZHJlc3Msc3RyaW5nLGJ5dGVbMzJdLGJ5dGVbMzJdW10sdWludDY0KWJvb2wiLCBtZXRob2QgInJlYWQoYWRkcmVzcyxzdHJpbmcsc3RyaW5nKXN0cmluZyIsIG1ldGhvZCAidmVyaWZpZWRSZWFkKGFkZHJlc3Msc3RyaW5nLGJ5dGVbMzJdLGJ5dGVbMzJdW10sdWludDY0LHN0cmluZylzdHJpbmciLCBtZXRob2QgInZlcmlmaWVkTXVzdFJlYWQoYWRkcmVzcyxzdHJpbmcsYnl0ZVszMl0sYnl0ZVszMl1bXSx1aW50NjQsc3RyaW5nKXN0cmluZyIsIG1ldGhvZCAiYWRkVHlwZShwYXksc3RyaW5nLHVpbnQ4W10pdm9pZCIsIG1ldGhvZCAiY29sbGVjdFR5cGVGZWVzKCl1aW50NjQiLCBtZXRob2QgInJvb3RDb3N0cyhzdHJpbmcpdWludDY0IiwgbWV0aG9kICJkYXRhQ29zdHMoc3RyaW5nLHN0cmluZyxzdHJpbmcpdWludDY0IiwgbWV0aG9kICJyZWNvcmRJbmZvKGFkZHJlc3MsYnl0ZVtdKShib29sLHVpbnQ2NCx1aW50NjQpIiwgbWV0aG9kICJyZWFkUmVjb3JkKGFkZHJlc3MsYnl0ZVtdKShib29sLHVpbnQ2NCxieXRlW10pIiwgbWV0aG9kICJyZWFkUmVjb3JkU2xpY2UoYWRkcmVzcyxieXRlW10sdWludDY0LHVpbnQ2NCx1aW50NjQpYnl0ZVtdIiwgbWV0aG9kICJyZWNvcmRDb3N0KGFkZHJlc3MsYnl0ZVtdLHVpbnQ2NCl1aW50NjQiLCBtZXRob2QgInNldFJlY29yZChwYXksYnl0ZVtdLGJ5dGVbXSxieXRlW10sYnl0ZVtdLGJ5dGVbXSx1aW50NjQpdWludDY0IiwgbWV0aG9kICJyZW1vdmVSZWNvcmQoYnl0ZVtdLHVpbnQ2NCl1aW50NjQiLCBtZXRob2QgInVwZGF0ZUFraXRhREFPRXNjcm93KChzdHJpbmcsdWludDY0KSl2b2lkIiwgbWV0aG9kICJ1cGRhdGVBa2l0YURBTyh1aW50NjQpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIG1haW5fb3BVcF9yb3V0ZUA3IGFkZFJvb3QgZGVsZXRlUm9vdCB1cGRhdGVSb290IGFkZERhdGEgZGVsZXRlRGF0YSB2ZXJpZnkgcmVhZCB2ZXJpZmllZFJlYWQgdmVyaWZpZWRNdXN0UmVhZCBhZGRUeXBlIGNvbGxlY3RUeXBlRmVlcyByb290Q29zdHMgZGF0YUNvc3RzIHJlY29yZEluZm8gcmVhZFJlY29yZCByZWFkUmVjb3JkU2xpY2UgcmVjb3JkQ29zdCBzZXRSZWNvcmQgcmVtb3ZlUmVjb3JkIHVwZGF0ZUFraXRhREFPRXNjcm93IHVwZGF0ZUFraXRhREFPCiAgICBlcnIKCm1haW5fb3BVcF9yb3V0ZUA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyMTYKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKbWFpbl9jcmVhdGVfTm9PcEAzMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTEyLTExMwogICAgLy8gQGNvbnRyYWN0KHsgYXZtVmVyc2lvbjogMTMgfSkKICAgIC8vIGV4cG9ydCBjbGFzcyBNZXRhIGV4dGVuZHMgQWtpdGFCYXNlRmVlR2VuZXJhdG9yQ29udHJhY3RXaXRob3V0QWtpdGFPcHRJbiB7CiAgICBwdXNoYnl0ZXMgMHhjZDlhZDY3ZSAvLyBtZXRob2QgImNyZWF0ZShzdHJpbmcsdWludDY0KXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBjcmVhdGUKICAgIGVycgoKbWFpbl91cGRhdGVfcm91dGVANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozNQogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICB0eG4gT25Db21wbGV0aW9uCiAgICBwdXNoaW50IDQgLy8gVXBkYXRlQXBwbGljYXRpb24KICAgID09CiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgJiYKICAgIGFzc2VydAogICAgYiB1cGRhdGUKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpyZWNvcmRQYXllcihyZWNvcmQ6IGJ5dGVzLCBwYXllcjogYnl0ZXMsIG93bmVyOiBieXRlcykgLT4gdm9pZDoKcmVjb3JkUGF5ZXI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwNQogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIHJlY29yZFBheWVyKHJlY29yZDogYnl0ZXMsIHBheWVyOiBBY2NvdW50LCBvd25lcjogQWNjb3VudCk6IHZvaWQgewogICAgcHJvdG8gMyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwNgogICAgLy8gaWYgKHBheWVyICE9PSBvd25lcikgewogICAgZnJhbWVfZGlnIC0yCiAgICBmcmFtZV9kaWcgLTEKICAgICE9CiAgICBieiByZWNvcmRQYXllcl9hZnRlcl9pZl9lbHNlQDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTYKICAgIC8vIHJldHVybiBCeXRlcyhQYXllckJveFByZWZpeCkuY29uY2F0KHNoYTI1NihyZWNvcmQpKQogICAgZnJhbWVfZGlnIC0zCiAgICBzaGEyNTYKICAgIGJ5dGVjIDggLy8gIiQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA3CiAgICAvLyBvcC5Cb3gucHV0KHBheWVyUmVjb3JkS2V5KHJlY29yZCksIHBheWVyLmJ5dGVzKQogICAgZnJhbWVfZGlnIC0yCiAgICBib3hfcHV0CgpyZWNvcmRQYXllcl9hZnRlcl9pZl9lbHNlQDI6CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpwYXllck9mKHJlY29yZDogYnl0ZXMsIG93bmVyOiBieXRlcykgLT4gYnl0ZXM6CnBheWVyT2Y6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjExMgogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIHBheWVyT2YocmVjb3JkOiBieXRlcywgb3duZXI6IEFjY291bnQpOiBBY2NvdW50IHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5NgogICAgLy8gcmV0dXJuIEJ5dGVzKFBheWVyQm94UHJlZml4KS5jb25jYXQoc2hhMjU2KHJlY29yZCkpCiAgICBmcmFtZV9kaWcgLTIKICAgIHNoYTI1NgogICAgYnl0ZWMgOCAvLyAiJCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMTMKICAgIC8vIGNvbnN0IFtwYXllciwgc3BvbnNvcmVkXSA9IG9wLkJveC5nZXQocGF5ZXJSZWNvcmRLZXkocmVjb3JkKSkKICAgIGJveF9nZXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTE0CiAgICAvLyByZXR1cm4gc3BvbnNvcmVkID8gQWNjb3VudChwYXllcikgOiBvd25lcgogICAgYnogcGF5ZXJPZl90ZXJuYXJ5X2ZhbHNlQDIKICAgIHJldHN1YgoKcGF5ZXJPZl90ZXJuYXJ5X2ZhbHNlQDI6CiAgICBwb3AKICAgIGZyYW1lX2RpZyAtMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMTQKICAgIC8vIHJldHVybiBzcG9uc29yZWQgPyBBY2NvdW50KHBheWVyKSA6IG93bmVyCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpjYW5SZWNlaXZlQWxnbyhyZWNlaXZlcjogYnl0ZXMsIGFtb3VudDogdWludDY0KSAtPiB1aW50NjQ6CmNhblJlY2VpdmVBbGdvOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMjkKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiBjYW5SZWNlaXZlQWxnbyhyZWNlaXZlcjogQWNjb3VudCwgYW1vdW50OiB1aW50NjQpOiBib29sZWFuIHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMzAKICAgIC8vIGNvbnN0IFssIGZ1bmRlZF0gPSBvcC5BY2N0UGFyYW1zLmFjY3RCYWxhbmNlKHJlY2VpdmVyKQogICAgZnJhbWVfZGlnIC0yCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdEJhbGFuY2UKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMzEKICAgIC8vIHJldHVybiBmdW5kZWQgfHwgYW1vdW50ID49IEdsb2JhbC5taW5CYWxhbmNlCiAgICBibnogY2FuUmVjZWl2ZUFsZ29fYm9vbF90cnVlQDIKICAgIGZyYW1lX2RpZyAtMQogICAgZ2xvYmFsIE1pbkJhbGFuY2UKICAgID49CiAgICBieiBjYW5SZWNlaXZlQWxnb19ib29sX2ZhbHNlQDMKCmNhblJlY2VpdmVBbGdvX2Jvb2xfdHJ1ZUAyOgogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTMxCiAgICAvLyByZXR1cm4gZnVuZGVkIHx8IGFtb3VudCA+PSBHbG9iYWwubWluQmFsYW5jZQogICAgcmV0c3ViCgpjYW5SZWNlaXZlQWxnb19ib29sX2ZhbHNlQDM6CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMzEKICAgIC8vIHJldHVybiBmdW5kZWQgfHwgYW1vdW50ID49IEdsb2JhbC5taW5CYWxhbmNlCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpyZWxlYXNlRGVwb3NpdChyZWNvcmQ6IGJ5dGVzLCBvd25lcjogYnl0ZXMsIGFtb3VudDogdWludDY0KSAtPiBieXRlczoKcmVsZWFzZURlcG9zaXQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE0MAogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIHJlbGVhc2VEZXBvc2l0KHJlY29yZDogYnl0ZXMsIG93bmVyOiBBY2NvdW50LCBhbW91bnQ6IHVpbnQ2NCk6IFtBY2NvdW50LCB1aW50NjRdIHsKICAgIHByb3RvIDMgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5NgogICAgLy8gcmV0dXJuIEJ5dGVzKFBheWVyQm94UHJlZml4KS5jb25jYXQoc2hhMjU2KHJlY29yZCkpCiAgICBmcmFtZV9kaWcgLTMKICAgIHNoYTI1NgogICAgYnl0ZWMgOCAvLyAiJCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE0MgogICAgLy8gY29uc3QgW3BheWVyLCBzcG9uc29yZWRdID0gb3AuQm94LmdldChrZXkpCiAgICBib3hfZ2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE0MwogICAgLy8gaWYgKCFzcG9uc29yZWQpIHsKICAgIGJueiByZWxlYXNlRGVwb3NpdF9hZnRlcl9pZl9lbHNlQDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTQ0CiAgICAvLyByZXR1cm4gW293bmVyLCBhbW91bnRdCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0b2IKICAgIGZyYW1lX2RpZyAtMgogICAgc3dhcAogICAgY29uY2F0CiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKcmVsZWFzZURlcG9zaXRfYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNDYKICAgIC8vIG9wLkJveC5kZWxldGUoa2V5KQogICAgc3dhcAogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE0NwogICAgLy8gY29uc3QgdG90YWw6IHVpbnQ2NCA9IGFtb3VudCArIFBheWVyUmVjb3JkTUJSCiAgICBmcmFtZV9kaWcgLTEKICAgIGludGMgNCAvLyAyODUwMAogICAgKwogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE0OAogICAgLy8gcmV0dXJuIFtjYW5SZWNlaXZlQWxnbyhBY2NvdW50KHBheWVyKSwgdG90YWwpID8gQWNjb3VudChwYXllcikgOiBvd25lciwgdG90YWxdCiAgICBkaWcgMgogICAgc3dhcAogICAgY2FsbHN1YiBjYW5SZWNlaXZlQWxnbwogICAgYnogcmVsZWFzZURlcG9zaXRfdGVybmFyeV9mYWxzZUA0CiAgICBzd2FwCgpyZWxlYXNlRGVwb3NpdF90ZXJuYXJ5X21lcmdlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE0OAogICAgLy8gcmV0dXJuIFtjYW5SZWNlaXZlQWxnbyhBY2NvdW50KHBheWVyKSwgdG90YWwpID8gQWNjb3VudChwYXllcikgOiBvd25lciwgdG90YWxdCiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHJldHN1YgoKcmVsZWFzZURlcG9zaXRfdGVybmFyeV9mYWxzZUA0OgogICAgYnVyeSAxCiAgICBmcmFtZV9kaWcgLTIKICAgIGIgcmVsZWFzZURlcG9zaXRfdGVybmFyeV9tZXJnZUA1CgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5jcmVhdGVbcm91dGluZ10oKSAtPiB2b2lkOgpjcmVhdGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjIwOAogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE0CiAgICAvLyB2ZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogR2xvYmFsU3RhdGVLZXlWZXJzaW9uIH0pCiAgICBieXRlYyAxNSAvLyAidmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MjEwCiAgICAvLyB0aGlzLnZlcnNpb24udmFsdWUgPSB2ZXJzaW9uCiAgICB1bmNvdmVyIDIKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlYyA0IC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjIxMQogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSA9IGFraXRhREFPCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyMTIKICAgIC8vIG9wLkFwcFBhcmFtc1NldC5hcHBGb3JlaWduQm94UmVhZHModHJ1ZSkKICAgIGludGNfMSAvLyAxCiAgICBhcHBfcGFyYW1zX3NldCBBcHBGb3JlaWduQm94UmVhZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MjA4CiAgICAvLyBAYWJpbWV0aG9kKHsgb25DcmVhdGU6ICdyZXF1aXJlJyB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEuYWRkUm9vdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmFkZFJvb3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjIzMAogICAgLy8gYWRkUm9vdChwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIG5hbWU6IHN0cmluZywgcm9vdDogYnl0ZXM8MzI+LCB0eXBlOiB1aW50NjQpOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIGR1cAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyMzEKICAgIC8vIGxvZ2dlZEFzc2VydChuYW1lICE9PSAnJywgZXJySW52YWxpZE5hbWUpCiAgICBieXRlY18xIC8vICIiCiAgICAhPQogICAgYm56IGFkZFJvb3RfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDE2IC8vICJFUlI6ZXJyTW5hbSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJNbmFtCgphZGRSb290X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyMzIKICAgIC8vIGxvZ2dlZEFzc2VydChCeXRlcyhuYW1lKS5sZW5ndGggPD0gTWF4UmVjb3JkS2V5Qnl0ZXMsIGVyck5hbWVUb29Mb25nKQogICAgZGlnIDIKICAgIGxlbgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBwdXNoaW50IDMxCiAgICA8PQogICAgYm56IGFkZFJvb3RfYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOmVyck50bCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOdGwKCmFkZFJvb3RfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjIzMwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMudHlwZXModHlwZSkuZXhpc3RzLCBlcnJOb1RyZWVUeXBlKQogICAgaXRvYgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjEzMAogICAgLy8gdHlwZXMgPSBCb3hNYXA8dWludDY0LCBUeXBlc1ZhbHVlPih7IGtleVByZWZpeDogTWV0YUJveFByZWZpeFR5cGVzIH0pCiAgICBwdXNoYnl0ZXMgInQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MjMzCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy50eXBlcyh0eXBlKS5leGlzdHMsIGVyck5vVHJlZVR5cGUpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBhZGRSb290X2FmdGVyX2Fzc2VydEA3CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJOdHJ0IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck50cnQKCmFkZFJvb3RfYWZ0ZXJfYXNzZXJ0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjIzNQogICAgLy8gY29uc3Qgcm9vdEtleSA9IHRoaXMucmVjb3JkS2V5KFR4bi5zZW5kZXIsIEJ5dGVzKG5hbWUpKQogICAgdHhuIFNlbmRlcgogICAgdW5jb3ZlciA0CiAgICBjYWxsc3ViIHJlY29yZEtleQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxMzIKICAgIC8vIHJvb3RzID0gQm94TWFwPGJ5dGVzLCBSb290VmFsdWU+KHsga2V5UHJlZml4OiBNZXRhQm94UHJlZml4Um9vdHMgfSkKICAgIGJ5dGVjIDUgLy8gInIiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgY292ZXIgNAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyMzYKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5yb290cyhyb290S2V5KS5leGlzdHMsIGVyck5hbWVUYWtlbikKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogYWRkUm9vdF9hZnRlcl9hc3NlcnRAOQogICAgcHVzaGJ5dGVzICJFUlI6ZXJyTnRrbiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOdGtuCgphZGRSb290X2FmdGVyX2Fzc2VydEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyMzcKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJySW52YWxpZFBheW1lbnRSZWNlaXZlcikKICAgIGRpZyA0CiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogYWRkUm9vdF9hZnRlcl9hc3NlcnRAMTEKICAgIGJ5dGVjIDkgLy8gIkVSUjplcnJJcG1yIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwbXIKCmFkZFJvb3RfYWZ0ZXJfYXNzZXJ0QDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyMzkKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LmFtb3VudCA9PT0gdGhpcy5yb290Q29zdHMobmFtZSkgKyBzcG9uc29yQ29zdChwYXltZW50LnNlbmRlciwgVHhuLnNlbmRlciksIGVyckludmFsaWRQYXltZW50QW1vdW50KQogICAgdW5jb3ZlciA0CiAgICBkdXAKICAgIGd0eG5zIEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1MzIKICAgIC8vIHJldHVybiAzMV83MDAgKyA0MDAgKiBCeXRlcyhuYW1lKS5sZW5ndGgKICAgIGludGMgNSAvLyA0MDAKICAgIHVuY292ZXIgNAogICAgKgogICAgaW50YyA2IC8vIDMxNzAwCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjIzOQogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSB0aGlzLnJvb3RDb3N0cyhuYW1lKSArIHNwb25zb3JDb3N0KHBheW1lbnQuc2VuZGVyLCBUeG4uc2VuZGVyKSwgZXJySW52YWxpZFBheW1lbnRBbW91bnQpCiAgICB1bmNvdmVyIDIKICAgIGd0eG5zIFNlbmRlcgogICAgZHVwCiAgICBjb3ZlciAzCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwMQogICAgLy8gcmV0dXJuIHBheWVyID09PSBvd25lciA/IDAgOiBQYXllclJlY29yZE1CUgogICAgPT0KICAgIGludGMgNCAvLyAyODUwMAogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjIzOQogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSB0aGlzLnJvb3RDb3N0cyhuYW1lKSArIHNwb25zb3JDb3N0KHBheW1lbnQuc2VuZGVyLCBUeG4uc2VuZGVyKSwgZXJySW52YWxpZFBheW1lbnRBbW91bnQpCiAgICArCiAgICA9PQogICAgYm56IGFkZFJvb3RfYWZ0ZXJfYXNzZXJ0QDEzCiAgICBieXRlYyAxMCAvLyAiRVJSOmVycklwbWEiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBtYQoKYWRkUm9vdF9hZnRlcl9hc3NlcnRAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjI0MAogICAgLy8gdGhpcy5yb290cyhyb290S2V5KS52YWx1ZSA9IHsgcm9vdCwgdHlwZSB9CiAgICBjb3ZlciAyCiAgICBjb25jYXQKICAgIHVuY292ZXIgMgogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MjQxCiAgICAvLyByZWNvcmRQYXllcih0aGlzLnJvb3RzKHJvb3RLZXkpLmtleSwgcGF5bWVudC5zZW5kZXIsIFR4bi5zZW5kZXIpCiAgICB0eG4gU2VuZGVyCiAgICBzd2FwCiAgICBjb3ZlciAyCiAgICBjYWxsc3ViIHJlY29yZFBheWVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjIzMAogICAgLy8gYWRkUm9vdChwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIG5hbWU6IHN0cmluZywgcm9vdDogYnl0ZXM8MzI+LCB0eXBlOiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLmRlbGV0ZVJvb3Rbcm91dGluZ10oKSAtPiB2b2lkOgpkZWxldGVSb290OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyNDkKICAgIC8vIGRlbGV0ZVJvb3QobmFtZTogc3RyaW5nKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjI1MAogICAgLy8gY29uc3Qgcm9vdEtleSA9IHRoaXMucmVjb3JkS2V5KFR4bi5zZW5kZXIsIEJ5dGVzKG5hbWUpKQogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgY2FsbHN1YiByZWNvcmRLZXkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTMyCiAgICAvLyByb290cyA9IEJveE1hcDxieXRlcywgUm9vdFZhbHVlPih7IGtleVByZWZpeDogTWV0YUJveFByZWZpeFJvb3RzIH0pCiAgICBieXRlYyA1IC8vICJyIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MjUxCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5yb290cyhyb290S2V5KS5leGlzdHMsIGVyck5vTmFtZSkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGRlbGV0ZVJvb3RfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDE3IC8vICJFUlI6ZXJyTm5hbSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJObmFtCgpkZWxldGVSb290X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyNTIKICAgIC8vIHRoaXMucm9vdHMocm9vdEtleSkuZGVsZXRlKCkKICAgIGR1cAogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjUzMgogICAgLy8gcmV0dXJuIDMxXzcwMCArIDQwMCAqIEJ5dGVzKG5hbWUpLmxlbmd0aAogICAgc3dhcAogICAgbGVuCiAgICBpbnRjIDUgLy8gNDAwCiAgICAqCiAgICBpbnRjIDYgLy8gMzE3MDAKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MjUzCiAgICAvLyB0aGlzLnJlbGVhc2VSZWNvcmQodGhpcy5yb290cyhyb290S2V5KS5rZXksIHRoaXMucm9vdENvc3RzKG5hbWUpKQogICAgY2FsbHN1YiByZWxlYXNlUmVjb3JkCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjI0OQogICAgLy8gZGVsZXRlUm9vdChuYW1lOiBzdHJpbmcpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnVwZGF0ZVJvb3Rbcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGVSb290OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyNjIKICAgIC8vIHVwZGF0ZVJvb3QobmFtZTogc3RyaW5nLCBuZXdSb290OiBieXRlczwzMj4pOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MjYzCiAgICAvLyBjb25zdCBrZXkgPSB0aGlzLnJlY29yZEtleShUeG4uc2VuZGVyLCBCeXRlcyhuYW1lKSkKICAgIHR4biBTZW5kZXIKICAgIHN3YXAKICAgIGNhbGxzdWIgcmVjb3JkS2V5CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjEzMgogICAgLy8gcm9vdHMgPSBCb3hNYXA8Ynl0ZXMsIFJvb3RWYWx1ZT4oeyBrZXlQcmVmaXg6IE1ldGFCb3hQcmVmaXhSb290cyB9KQogICAgYnl0ZWMgNSAvLyAiciIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjI2NAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucm9vdHMoa2V5KS5leGlzdHMsIGVyck5vTmFtZSkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHVwZGF0ZVJvb3RfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDE3IC8vICJFUlI6ZXJyTm5hbSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJObmFtCgp1cGRhdGVSb290X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyNjUKICAgIC8vIHRoaXMucm9vdHMoa2V5KS52YWx1ZS5yb290ID0gbmV3Um9vdAogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMgogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MjYyCiAgICAvLyB1cGRhdGVSb290KG5hbWU6IHN0cmluZywgbmV3Um9vdDogYnl0ZXM8MzI+KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5hZGREYXRhW3JvdXRpbmddKCkgLT4gdm9pZDoKYWRkRGF0YToKICAgIGludGNfMCAvLyAwCiAgICBieXRlY18xIC8vICIiCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Mjc2CiAgICAvLyBhZGREYXRhKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgbmFtZTogc3RyaW5nLCBrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IHZvaWQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgZHVwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgY292ZXIgMgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Mjc3CiAgICAvLyBsb2dnZWRBc3NlcnQobmFtZSAhPT0gJycsIGVyckludmFsaWROYW1lKQogICAgYnl0ZWNfMSAvLyAiIgogICAgIT0KICAgIGJueiBhZGREYXRhX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAxNiAvLyAiRVJSOmVyck1uYW0iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTW5hbQoKYWRkRGF0YV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Mjc4CiAgICAvLyBsb2dnZWRBc3NlcnQoa2V5ICE9PSAnJywgZXJySW52YWxpZEtleSkKICAgIGRpZyAyCiAgICBieXRlY18xIC8vICIiCiAgICAhPQogICAgYm56IGFkZERhdGFfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjIDE4IC8vICJFUlI6ZXJyTWtleSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJNa2V5CgphZGREYXRhX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyNzkKICAgIC8vIGNvbnN0IHJvb3RLZXkgPSB0aGlzLnJlY29yZEtleShUeG4uc2VuZGVyLCBCeXRlcyhuYW1lKSkKICAgIHR4biBTZW5kZXIKICAgIGRpZyAyCiAgICBjYWxsc3ViIHJlY29yZEtleQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyODIKICAgIC8vIGxvZ2dlZEFzc2VydChrZXlCeXRlcy5sZW5ndGggPD0gbWF4RGF0YUtleUxlbmd0aCwgZXJyS2V5VG9vTG9uZykKICAgIGRpZyAzCiAgICBsZW4KICAgIGR1cAogICAgYnVyeSA3CiAgICBwdXNoaW50IDE1CiAgICA8PQogICAgYm56IGFkZERhdGFfYWZ0ZXJfYXNzZXJ0QDcKICAgIGJ5dGVjIDExIC8vICJFUlI6ZXJyS3RsIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckt0bAoKYWRkRGF0YV9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MjgzCiAgICAvLyBsb2dnZWRBc3NlcnQoQnl0ZXMobmFtZSkubGVuZ3RoICsga2V5Qnl0ZXMubGVuZ3RoIDwgTWF4UmVjb3JkS2V5Qnl0ZXMsIGVycktleVRvb0xvbmcpCiAgICBkaWcgMgogICAgbGVuCiAgICBkaWcgNgogICAgKwogICAgcHVzaGludCAzMQogICAgPAogICAgYm56IGFkZERhdGFfYWZ0ZXJfYXNzZXJ0QDkKICAgIGJ5dGVjIDExIC8vICJFUlI6ZXJyS3RsIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckt0bAoKYWRkRGF0YV9hZnRlcl9hc3NlcnRAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Mjg0CiAgICAvLyBsb2dnZWRBc3NlcnQoQnl0ZXModmFsdWUpLmxlbmd0aCA8PSBtYXhEYXRhTGVuZ3RoLCBlcnJEYXRhVG9vTG9uZykKICAgIGR1cAogICAgbGVuCiAgICBkdXAKICAgIGNvdmVyIDUKICAgIGludGMgNyAvLyAxMDI0CiAgICA8PQogICAgYm56IGFkZERhdGFfYWZ0ZXJfYXNzZXJ0QDExCiAgICBieXRlYyAxOSAvLyAiRVJSOmVyckR0bCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJEdGwKCmFkZERhdGFfYWZ0ZXJfYXNzZXJ0QDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyODYKICAgIC8vIGtleUJ5dGVzLmxlbmd0aCA8IDIgfHwgIShrZXlCeXRlcy5zbGljZSgwLCAyKSA9PT0gQnl0ZXMocmVzZXJ2ZWREYXRhS2V5UHJlZml4KSksCiAgICBkaWcgNgogICAgaW50Y18yIC8vIDIKICAgIDwKICAgIGJueiBhZGREYXRhX2Jvb2xfdHJ1ZUAxMwogICAgaW50Y18wIC8vIDAKICAgIGRpZyA3CiAgICBkdXAKICAgIGNvdmVyIDIKICAgID49CiAgICBpbnRjXzAgLy8gMAogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBpbnRjXzIgLy8gMgogICAgZGlnIDIKICAgID49CiAgICBpbnRjXzIgLy8gMgogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgZGlnIDUKICAgIGNvdmVyIDIKICAgIHN1YnN0cmluZzMKICAgIGJ5dGVjIDIwIC8vICJsLiIKICAgID09CiAgICBibnogYWRkRGF0YV9ib29sX2ZhbHNlQDE0CgphZGREYXRhX2Jvb2xfdHJ1ZUAxMzoKICAgIGludGNfMSAvLyAxCgphZGREYXRhX2Jvb2xfbWVyZ2VAMTU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjI4NS0yODgKICAgIC8vIGxvZ2dlZEFzc2VydCgKICAgIC8vICAga2V5Qnl0ZXMubGVuZ3RoIDwgMiB8fCAhKGtleUJ5dGVzLnNsaWNlKDAsIDIpID09PSBCeXRlcyhyZXNlcnZlZERhdGFLZXlQcmVmaXgpKSwKICAgIC8vICAgZXJyUmVzZXJ2ZWRLZXlQcmVmaXgsCiAgICAvLyApCiAgICBibnogYWRkRGF0YV9hZnRlcl9hc3NlcnRAMTcKICAgIGJ5dGVjIDIxIC8vICJFUlI6ZXJyUmtwIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclJrcAoKYWRkRGF0YV9hZnRlcl9hc3NlcnRAMTc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjEzMgogICAgLy8gcm9vdHMgPSBCb3hNYXA8Ynl0ZXMsIFJvb3RWYWx1ZT4oeyBrZXlQcmVmaXg6IE1ldGFCb3hQcmVmaXhSb290cyB9KQogICAgYnl0ZWMgNSAvLyAiciIKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjI4OQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucm9vdHMocm9vdEtleSkuZXhpc3RzLCBlcnJOb1Jvb3RGb3JEYXRhKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogYWRkRGF0YV9hZnRlcl9hc3NlcnRAMTkKICAgIHB1c2hieXRlcyAiRVJSOmVyck5yZmQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTnJmZAoKYWRkRGF0YV9hZnRlcl9hc3NlcnRAMTk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjI5MQogICAgLy8gY29uc3QgcmVjb3JkS2V5ID0gdGhpcy5kYXRhS2V5KG5hbWUsIGtleSkKICAgIHN3YXAKICAgIHVuY292ZXIgMgogICAgY2FsbHN1YiBkYXRhS2V5CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjI5NAogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBlcnJJbnZhbGlkUGF5bWVudFJlY2VpdmVyKQogICAgZGlnIDMKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBhZGREYXRhX2FmdGVyX2Fzc2VydEAyMQogICAgYnl0ZWMgOSAvLyAiRVJSOmVycklwbXIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBtcgoKYWRkRGF0YV9hZnRlcl9hc3NlcnRAMjE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjI5NgogICAgLy8gcGF5bWVudC5hbW91bnQgPT09IHRoaXMucmVjb3JkU3RvcmFnZUNvc3QocmVjb3JkS2V5LCBCeXRlcyh2YWx1ZSkubGVuZ3RoKSArIHNwb25zb3JDb3N0KHBheW1lbnQuc2VuZGVyLCBUeG4uc2VuZGVyKSwKICAgIHVuY292ZXIgMwogICAgZHVwCiAgICBndHhucyBBbW91bnQKICAgIGRpZyAzCiAgICB1bmNvdmVyIDUKICAgIGNhbGxzdWIgcmVjb3JkU3RvcmFnZUNvc3QKICAgIHVuY292ZXIgMgogICAgZ3R4bnMgU2VuZGVyCiAgICBkdXAKICAgIGNvdmVyIDUKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTAxCiAgICAvLyByZXR1cm4gcGF5ZXIgPT09IG93bmVyID8gMCA6IFBheWVyUmVjb3JkTUJSCiAgICA9PQogICAgaW50YyA0IC8vIDI4NTAwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Mjk2CiAgICAvLyBwYXltZW50LmFtb3VudCA9PT0gdGhpcy5yZWNvcmRTdG9yYWdlQ29zdChyZWNvcmRLZXksIEJ5dGVzKHZhbHVlKS5sZW5ndGgpICsgc3BvbnNvckNvc3QocGF5bWVudC5zZW5kZXIsIFR4bi5zZW5kZXIpLAogICAgKwogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Mjk1LTI5OAogICAgLy8gbG9nZ2VkQXNzZXJ0KAogICAgLy8gICBwYXltZW50LmFtb3VudCA9PT0gdGhpcy5yZWNvcmRTdG9yYWdlQ29zdChyZWNvcmRLZXksIEJ5dGVzKHZhbHVlKS5sZW5ndGgpICsgc3BvbnNvckNvc3QocGF5bWVudC5zZW5kZXIsIFR4bi5zZW5kZXIpLAogICAgLy8gICBlcnJJbnZhbGlkUGF5bWVudEFtb3VudCwKICAgIC8vICkKICAgIGJueiBhZGREYXRhX2FmdGVyX2Fzc2VydEAyMwogICAgYnl0ZWMgMTAgLy8gIkVSUjplcnJJcG1hIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwbWEKCmFkZERhdGFfYWZ0ZXJfYXNzZXJ0QDIzOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyOTkKICAgIC8vIGNvbnN0IGlkID0gdGhpcy5yZWNvcmRLZXkoVHhuLnNlbmRlciwgcmVjb3JkS2V5KQogICAgdHhuIFNlbmRlcgogICAgZGlnIDIKICAgIGNhbGxzdWIgcmVjb3JkS2V5CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjMwMAogICAgLy8gbGV0IHByZXZpb3VzUGF5ZXIgPSBUeG4uc2VuZGVyCiAgICB0eG4gU2VuZGVyCiAgICBidXJ5IDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MzAxCiAgICAvLyBsZXQgcHJldmlvdXNDb3N0OiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgYnVyeSA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjEzNAogICAgLy8gcmVjb3JkcyA9IEJveE1hcDxieXRlcywgTWV0YVJlY29yZFZhbHVlPih7IGtleVByZWZpeDogUmVjb3JkUHJlZml4IH0pCiAgICBieXRlY18yIC8vICJtIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MzAyCiAgICAvLyBpZiAodGhpcy5yZWNvcmRzKGlkKS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogYWRkRGF0YV9hZnRlcl9pZl9lbHNlQDI1CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjMwNQogICAgLy8gVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MzA2CiAgICAvLyB0aGlzLnJlY29yZFN0b3JhZ2VDb3N0KHJlY29yZEtleSwgdGhpcy5yZWNvcmRzKGlkKS5sZW5ndGggLSBSZWNvcmRIZWFkZXJCeXRlcyksCiAgICBkaWcgMQogICAgZHVwCiAgICBib3hfbGVuCiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgcHVzaGludCAxMgogICAgLQogICAgZGlnIDUKICAgIHN3YXAKICAgIGNhbGxzdWIgcmVjb3JkU3RvcmFnZUNvc3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MzAzLTMwNwogICAgLy8gY29uc3QgW3JlY2VpdmVyLCB0b3RhbF0gPSByZWxlYXNlRGVwb3NpdCgKICAgIC8vICAgdGhpcy5yZWNvcmRzKGlkKS5rZXksCiAgICAvLyAgIFR4bi5zZW5kZXIsCiAgICAvLyAgIHRoaXMucmVjb3JkU3RvcmFnZUNvc3QocmVjb3JkS2V5LCB0aGlzLnJlY29yZHMoaWQpLmxlbmd0aCAtIFJlY29yZEhlYWRlckJ5dGVzKSwKICAgIC8vICkKICAgIHN3YXAKICAgIGNvdmVyIDIKICAgIGNhbGxzdWIgcmVsZWFzZURlcG9zaXQKICAgIGR1cAogICAgZXh0cmFjdCAwIDMyCiAgICBzd2FwCiAgICBpbnRjXzMgLy8gMzIKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICBidXJ5IDgKICAgIGJ1cnkgNgoKYWRkRGF0YV9hZnRlcl9pZl9lbHNlQDI1OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czozMTEKICAgIC8vIHRoaXMud3JpdGVSZWNvcmQocmVjb3JkS2V5LCBCeXRlcyh2YWx1ZSkpCiAgICBjb3ZlciAyCiAgICBjYWxsc3ViIHdyaXRlUmVjb3JkCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MzEyCiAgICAvLyByZWNvcmRQYXllcih0aGlzLnJlY29yZHMoaWQpLmtleSwgcGF5bWVudC5zZW5kZXIsIFR4bi5zZW5kZXIpCiAgICB0eG4gU2VuZGVyCiAgICBzd2FwCiAgICBjb3ZlciAyCiAgICBjYWxsc3ViIHJlY29yZFBheWVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjMxNAogICAgLy8gaWYgKHByZXZpb3VzQ29zdCA+IDApIGl0eG4ucGF5bWVudCh7IHJlY2VpdmVyOiBwcmV2aW91c1BheWVyLCBhbW91bnQ6IHByZXZpb3VzQ29zdCwgZmVlOiAwIH0pLnN1Ym1pdCgpCiAgICBkaWcgMQogICAgYnogYWRkRGF0YV9hZnRlcl9pZl9lbHNlQDI4CiAgICBpdHhuX2JlZ2luCiAgICBkaWcgMQogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGRpZyAyCiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAoKYWRkRGF0YV9hZnRlcl9pZl9lbHNlQDI4OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyNzYKICAgIC8vIGFkZERhdGEocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBuYW1lOiBzdHJpbmcsIGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgphZGREYXRhX2Jvb2xfZmFsc2VAMTQ6CiAgICBpbnRjXzAgLy8gMAogICAgYiBhZGREYXRhX2Jvb2xfbWVyZ2VAMTUKCgovLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLmRlbGV0ZURhdGFbcm91dGluZ10oKSAtPiB2b2lkOgpkZWxldGVEYXRhOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czozMjMKICAgIC8vIGRlbGV0ZURhdGEobmFtZTogc3RyaW5nLCBrZXk6IHN0cmluZyk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MzI1CiAgICAvLyBsb2dnZWRBc3NlcnQoa2V5Qnl0ZXMubGVuZ3RoIDwgMiB8fCBrZXlCeXRlcy5zbGljZSgwLCAyKSAhPT0gQnl0ZXMocmVzZXJ2ZWREYXRhS2V5UHJlZml4KSwgZXJyUmVzZXJ2ZWRLZXlQcmVmaXgpCiAgICBsZW4KICAgIGR1cAogICAgY292ZXIgMwogICAgaW50Y18yIC8vIDIKICAgIDwKICAgIGJueiBkZWxldGVEYXRhX2Jvb2xfdHJ1ZUAzCiAgICBpbnRjXzAgLy8gMAogICAgZGlnIDMKICAgIGR1cAogICAgY292ZXIgMgogICAgPj0KICAgIGludGNfMCAvLyAwCiAgICBkaWcgMgogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIGludGNfMiAvLyAyCiAgICBkaWcgMgogICAgPj0KICAgIGludGNfMiAvLyAyCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBkaWcgMgogICAgY292ZXIgMgogICAgc3Vic3RyaW5nMwogICAgYnl0ZWMgMjAgLy8gImwuIgogICAgIT0KICAgIGJ6IGRlbGV0ZURhdGFfYm9vbF9mYWxzZUA0CgpkZWxldGVEYXRhX2Jvb2xfdHJ1ZUAzOgogICAgaW50Y18xIC8vIDEKCmRlbGV0ZURhdGFfYm9vbF9tZXJnZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czozMjUKICAgIC8vIGxvZ2dlZEFzc2VydChrZXlCeXRlcy5sZW5ndGggPCAyIHx8IGtleUJ5dGVzLnNsaWNlKDAsIDIpICE9PSBCeXRlcyhyZXNlcnZlZERhdGFLZXlQcmVmaXgpLCBlcnJSZXNlcnZlZEtleVByZWZpeCkKICAgIGJueiBkZWxldGVEYXRhX2FmdGVyX2Fzc2VydEA3CiAgICBieXRlYyAyMSAvLyAiRVJSOmVyclJrcCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJSa3AKCmRlbGV0ZURhdGFfYWZ0ZXJfYXNzZXJ0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjMyNgogICAgLy8gY29uc3QgcmVjb3JkS2V5ID0gdGhpcy5kYXRhS2V5KG5hbWUsIGtleSkKICAgIGNhbGxzdWIgZGF0YUtleQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjMyNwogICAgLy8gY29uc3QgaWQgPSB0aGlzLnJlY29yZEtleShUeG4uc2VuZGVyLCByZWNvcmRLZXkpCiAgICB0eG4gU2VuZGVyCiAgICBzd2FwCiAgICBjYWxsc3ViIHJlY29yZEtleQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjEzNAogICAgLy8gcmVjb3JkcyA9IEJveE1hcDxieXRlcywgTWV0YVJlY29yZFZhbHVlPih7IGtleVByZWZpeDogUmVjb3JkUHJlZml4IH0pCiAgICBieXRlY18yIC8vICJtIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjMyOAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucmVjb3JkcyhpZCkuZXhpc3RzLCBlcnJOb0RhdGEpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBkZWxldGVEYXRhX2FmdGVyX2Fzc2VydEA5CiAgICBieXRlYyAyMiAvLyAiRVJSOmVyck5kdGEiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmR0YQoKZGVsZXRlRGF0YV9hZnRlcl9hc3NlcnRAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MzI5CiAgICAvLyB0aGlzLnJlbW92ZVJlY29yZChyZWNvcmRLZXksIHRoaXMuY3VycmVudFJlY29yZFJldmlzaW9uKGlkKSkKICAgIGNhbGxzdWIgY3VycmVudFJlY29yZFJldmlzaW9uCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEucmVtb3ZlUmVjb3JkCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MzIzCiAgICAvLyBkZWxldGVEYXRhKG5hbWU6IHN0cmluZywga2V5OiBzdHJpbmcpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmRlbGV0ZURhdGFfYm9vbF9mYWxzZUA0OgogICAgaW50Y18wIC8vIDAKICAgIGIgZGVsZXRlRGF0YV9ib29sX21lcmdlQDUKCgovLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnZlcmlmeVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnZlcmlmeToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MzQzCiAgICAvLyB2ZXJpZnkoYWRkcmVzczogQWNjb3VudCwgbmFtZTogc3RyaW5nLCBsZWFmOiBMZWFmLCBwcm9vZjogUHJvb2YsIHR5cGU6IHVpbnQ2NCk6IGJvb2xlYW4gewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMzIKICAgICoKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8Ynl0ZXNbMzJdPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS52ZXJpZnkKICAgIHBvcAogICAgcHVzaGJ5dGVzIDB4MDAKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDIKICAgIHNldGJpdAogICAgYnl0ZWNfMCAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEucmVhZFtyb3V0aW5nXSgpIC0+IHZvaWQ6CnJlYWQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjM2NwogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnJlYWQKICAgIGR1cAogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgc3dhcAogICAgY29uY2F0CiAgICBieXRlY18wIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS52ZXJpZmllZFJlYWRbcm91dGluZ10oKSAtPiB2b2lkOgp2ZXJpZmllZFJlYWQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjM5NAogICAgLy8gdmVyaWZpZWRSZWFkKGFkZHJlc3M6IEFjY291bnQsIG5hbWU6IHN0cmluZywgbGVhZjogTGVhZiwgcHJvb2Y6IFByb29mLCB0eXBlOiB1aW50NjQsIGtleTogc3RyaW5nKTogc3RyaW5nIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cG4gMgogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIGR1cAogICAgY292ZXIgMgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMzIKICAgICoKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8Ynl0ZXNbMzJdPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDYKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBjb3ZlciA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjM5NQogICAgLy8gY29uc3QgdmVyaWZpZWQgPSB0aGlzLnZlcmlmeShhZGRyZXNzLCBuYW1lLCBsZWFmLCBwcm9vZiwgdHlwZSkKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS52ZXJpZnkKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czozOTYKICAgIC8vIGlmICghdmVyaWZpZWQpIHsKICAgIGJueiB2ZXJpZmllZFJlYWRfYWZ0ZXJfaWZfZWxzZUAzCiAgICBwb3BuIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Mzk3CiAgICAvLyByZXR1cm4gJycKICAgIGJ5dGVjXzEgLy8gIiIKCnZlcmlmaWVkUmVhZF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEudmVyaWZpZWRSZWFkQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjM5NAogICAgLy8gdmVyaWZpZWRSZWFkKGFkZHJlc3M6IEFjY291bnQsIG5hbWU6IHN0cmluZywgbGVhZjogTGVhZiwgcHJvb2Y6IFByb29mLCB0eXBlOiB1aW50NjQsIGtleTogc3RyaW5nKTogc3RyaW5nIHsKICAgIGR1cAogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgc3dhcAogICAgY29uY2F0CiAgICBieXRlY18wIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgp2ZXJpZmllZFJlYWRfYWZ0ZXJfaWZfZWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czozOTkKICAgIC8vIHJldHVybiB0aGlzLnJlYWQoYWRkcmVzcywgbmFtZSwga2V5KQogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnJlYWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Mzk0CiAgICAvLyB2ZXJpZmllZFJlYWQoYWRkcmVzczogQWNjb3VudCwgbmFtZTogc3RyaW5nLCBsZWFmOiBMZWFmLCBwcm9vZjogUHJvb2YsIHR5cGU6IHVpbnQ2NCwga2V5OiBzdHJpbmcpOiBzdHJpbmcgewogICAgYiB2ZXJpZmllZFJlYWRfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnZlcmlmaWVkUmVhZEA0CgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS52ZXJpZmllZE11c3RSZWFkW3JvdXRpbmddKCkgLT4gdm9pZDoKdmVyaWZpZWRNdXN0UmVhZDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDIxCiAgICAvLyB2ZXJpZmllZE11c3RSZWFkKGFkZHJlc3M6IEFjY291bnQsIG5hbWU6IHN0cmluZywgbGVhZjogTGVhZiwgcHJvb2Y6IFByb29mLCB0eXBlOiB1aW50NjQsIGtleTogc3RyaW5nKTogc3RyaW5nIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cG4gMgogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIGR1cAogICAgY292ZXIgMgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMzIKICAgICoKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8Ynl0ZXNbMzJdPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDYKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBjb3ZlciA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQyMgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMudmVyaWZ5KGFkZHJlc3MsIG5hbWUsIGxlYWYsIHByb29mLCB0eXBlKSwgZXJyRmFpbGVkVG9WZXJpZnlJbmNsdXNpb24pCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEudmVyaWZ5CiAgICBwb3AKICAgIGJueiB2ZXJpZmllZE11c3RSZWFkX2FmdGVyX2Fzc2VydEAzCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJGdnJpIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckZ2cmkKCnZlcmlmaWVkTXVzdFJlYWRfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQyMwogICAgLy8gcmV0dXJuIHRoaXMucmVhZChhZGRyZXNzLCBuYW1lLCBrZXkpCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEucmVhZAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0MjEKICAgIC8vIHZlcmlmaWVkTXVzdFJlYWQoYWRkcmVzczogQWNjb3VudCwgbmFtZTogc3RyaW5nLCBsZWFmOiBMZWFmLCBwcm9vZjogUHJvb2YsIHR5cGU6IHVpbnQ2NCwga2V5OiBzdHJpbmcpOiBzdHJpbmcgewogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLmFkZFR5cGVbcm91dGluZ10oKSAtPiB2b2lkOgphZGRUeXBlOgogICAgYnl0ZWNfMSAvLyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0MjYKICAgIC8vIGFkZFR5cGUocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBkZXNjcmlwdGlvbjogc3RyaW5nLCBzY2hlbWFMaXN0OiBTY2hlbWFMaXN0KTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cG4gMgogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBzd2FwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGNvdmVyIDQKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGR1cAogICAgY292ZXIgMwogICAgaW50Y18yIC8vIDIKICAgICsKICAgIHN3YXAKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQyNwogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBlcnJJbnZhbGlkUGF5bWVudFJlY2VpdmVyKQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IGFkZFR5cGVfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDkgLy8gIkVSUjplcnJJcG1yIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwbXIKCmFkZFR5cGVfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQyOAogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSBNZXRhVHlwZUZlZSwgZXJySW52YWxpZFBheW1lbnRBbW91bnQpCiAgICB1bmNvdmVyIDIKICAgIGd0eG5zIEFtb3VudAogICAgaW50YyA5IC8vIDEwMDAwMDAwMAogICAgPT0KICAgIGJueiBhZGRUeXBlX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyAxMCAvLyAiRVJSOmVycklwbWEiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBtYQoKYWRkVHlwZV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDI5CiAgICAvLyBsb2dnZWRBc3NlcnQoQnl0ZXMoZGVzY3JpcHRpb24pLmxlbmd0aCA8PSA4MDAsIGVyckRhdGFUb29Mb25nKQogICAgZGlnIDEKICAgIGxlbgogICAgZHVwCiAgICBidXJ5IDUKICAgIHB1c2hpbnQgODAwCiAgICA8PQogICAgYm56IGFkZFR5cGVfYWZ0ZXJfYXNzZXJ0QDcKICAgIGJ5dGVjIDE5IC8vICJFUlI6ZXJyRHRsIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckR0bAoKYWRkVHlwZV9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDMxCiAgICAvLyBsZXQgc2NoZW1hOiBzdHJpbmcgPSAnKCcKICAgIHB1c2hieXRlcyAiKCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDMyCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgc2NoZW1hTGlzdC5sZW5ndGg7IGkgKz0gMSkgewogICAgaW50Y18wIC8vIDAKICAgIGNvdmVyIDIKCmFkZFR5cGVfd2hpbGVfdG9wQDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQzMgogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IHNjaGVtYUxpc3QubGVuZ3RoOyBpICs9IDEpIHsKICAgIGRpZyAyCiAgICBkaWcgMgogICAgPAogICAgYnogYWRkVHlwZV9hZnRlcl93aGlsZUA2NgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0MzMKICAgIC8vIHN3aXRjaCAoc2NoZW1hTGlzdFtpXSkgewogICAgZGlnIDQKICAgIGV4dHJhY3QgMiAwCiAgICBkaWcgMwogICAgaW50Y18xIC8vIDEKICAgIGV4dHJhY3QzIC8vIG9uIGVycm9yOiBpbmRleCBhY2Nlc3MgaXMgb3V0IG9mIGJvdW5kcwogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQzNAogICAgLy8gY2FzZSBTY2hlbWFQYXJ0VWludDg6CiAgICBwdXNoYnl0ZXMgMHgwYQogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDM0LTQzNgogICAgLy8gY2FzZSBTY2hlbWFQYXJ0VWludDg6CiAgICAvLyAgIHNjaGVtYSArPSBTY2hlbWFQYXJ0VWludDhTdHJpbmcKICAgIC8vICAgYnJlYWsKICAgIGJ6IGFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUAxMgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQzNQogICAgLy8gc2NoZW1hICs9IFNjaGVtYVBhcnRVaW50OFN0cmluZwogICAgcHVzaGJ5dGVzICJ1aW50OCIKICAgIGNvbmNhdAoKYWRkVHlwZV9ibG9ja0A2MjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDg5CiAgICAvLyBpZiAoc2NoZW1hTGlzdC5sZW5ndGggPiAwICYmIGkgIT09IHNjaGVtYUxpc3QubGVuZ3RoIC0gMSkgewogICAgZGlnIDEKICAgIGJ6IGFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUA2NQogICAgZGlnIDEKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkaWcgMwogICAgIT0KICAgIGJ6IGFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUA2NQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0OTAKICAgIC8vIHNjaGVtYSArPSAnLCcKICAgIHB1c2hieXRlcyAiLCIKICAgIGNvbmNhdAoKYWRkVHlwZV9hZnRlcl9pZl9lbHNlQDY1OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0MzIKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBzY2hlbWFMaXN0Lmxlbmd0aDsgaSArPSAxKSB7CiAgICB1bmNvdmVyIDIKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBjb3ZlciAyCiAgICBiIGFkZFR5cGVfd2hpbGVfdG9wQDgKCmFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDM3CiAgICAvLyBjYXNlIFNjaGVtYVBhcnRVaW50MTY6CiAgICBkdXAKICAgIHB1c2hieXRlcyAweDBiCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0MzctNDM5CiAgICAvLyBjYXNlIFNjaGVtYVBhcnRVaW50MTY6CiAgICAvLyAgIHNjaGVtYSArPSBTY2hlbWFQYXJ0VWludDE2U3RyaW5nCiAgICAvLyAgIGJyZWFrCiAgICBieiBhZGRUeXBlX2FmdGVyX2lmX2Vsc2VAMTUKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0MzgKICAgIC8vIHNjaGVtYSArPSBTY2hlbWFQYXJ0VWludDE2U3RyaW5nCiAgICBwdXNoYnl0ZXMgInVpbnQxNiIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0MzkKICAgIC8vIGJyZWFrCiAgICBiIGFkZFR5cGVfYmxvY2tANjIKCmFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUAxNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDQwCiAgICAvLyBjYXNlIFNjaGVtYVBhcnRVaW50MzI6CiAgICBkdXAKICAgIHB1c2hieXRlcyAweDBjCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NDAtNDQyCiAgICAvLyBjYXNlIFNjaGVtYVBhcnRVaW50MzI6CiAgICAvLyAgIHNjaGVtYSArPSBTY2hlbWFQYXJ0VWludDMyU3RyaW5nCiAgICAvLyAgIGJyZWFrCiAgICBieiBhZGRUeXBlX2FmdGVyX2lmX2Vsc2VAMTgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NDEKICAgIC8vIHNjaGVtYSArPSBTY2hlbWFQYXJ0VWludDMyU3RyaW5nCiAgICBwdXNoYnl0ZXMgInVpbnQzMiIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NDIKICAgIC8vIGJyZWFrCiAgICBiIGFkZFR5cGVfYmxvY2tANjIKCmFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUAxODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDQzCiAgICAvLyBjYXNlIFNjaGVtYVBhcnRVaW50NjQ6CiAgICBkdXAKICAgIHB1c2hieXRlcyAweDBkCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NDMtNDQ1CiAgICAvLyBjYXNlIFNjaGVtYVBhcnRVaW50NjQ6CiAgICAvLyAgIHNjaGVtYSArPSBTY2hlbWFQYXJ0VWludDY0U3RyaW5nCiAgICAvLyAgIGJyZWFrCiAgICBieiBhZGRUeXBlX2FmdGVyX2lmX2Vsc2VAMjEKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NDQKICAgIC8vIHNjaGVtYSArPSBTY2hlbWFQYXJ0VWludDY0U3RyaW5nCiAgICBwdXNoYnl0ZXMgInVpbnQ2NCIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NDUKICAgIC8vIGJyZWFrCiAgICBiIGFkZFR5cGVfYmxvY2tANjIKCmFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUAyMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDQ2CiAgICAvLyBjYXNlIFNjaGVtYVBhcnRVaW50MTI4OgogICAgZHVwCiAgICBwdXNoYnl0ZXMgMHgwZQogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDQ2LTQ0OAogICAgLy8gY2FzZSBTY2hlbWFQYXJ0VWludDEyODoKICAgIC8vICAgc2NoZW1hICs9IFNjaGVtYVBhcnRVaW50MTI4U3RyaW5nCiAgICAvLyAgIGJyZWFrCiAgICBieiBhZGRUeXBlX2FmdGVyX2lmX2Vsc2VAMjQKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NDcKICAgIC8vIHNjaGVtYSArPSBTY2hlbWFQYXJ0VWludDEyOFN0cmluZwogICAgcHVzaGJ5dGVzICJ1aW50MTI4IgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ0OAogICAgLy8gYnJlYWsKICAgIGIgYWRkVHlwZV9ibG9ja0A2MgoKYWRkVHlwZV9hZnRlcl9pZl9lbHNlQDI0OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NDkKICAgIC8vIGNhc2UgU2NoZW1hUGFydFVpbnQyNTY6CiAgICBkdXAKICAgIHB1c2hieXRlcyAweDBmCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NDktNDUxCiAgICAvLyBjYXNlIFNjaGVtYVBhcnRVaW50MjU2OgogICAgLy8gICBzY2hlbWEgKz0gU2NoZW1hUGFydFVpbnQyNTZTdHJpbmcKICAgIC8vICAgYnJlYWsKICAgIGJ6IGFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUAyNwogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ1MAogICAgLy8gc2NoZW1hICs9IFNjaGVtYVBhcnRVaW50MjU2U3RyaW5nCiAgICBwdXNoYnl0ZXMgInVpbnQyNTYiCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDUxCiAgICAvLyBicmVhawogICAgYiBhZGRUeXBlX2Jsb2NrQDYyCgphZGRUeXBlX2FmdGVyX2lmX2Vsc2VAMjc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ1MgogICAgLy8gY2FzZSBTY2hlbWFQYXJ0VWludDUxMjoKICAgIGR1cAogICAgcHVzaGJ5dGVzIDB4MTAKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ1Mi00NTQKICAgIC8vIGNhc2UgU2NoZW1hUGFydFVpbnQ1MTI6CiAgICAvLyAgIHNjaGVtYSArPSBTY2hlbWFQYXJ0VWludDUxMlN0cmluZwogICAgLy8gICBicmVhawogICAgYnogYWRkVHlwZV9hZnRlcl9pZl9lbHNlQDMwCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDUzCiAgICAvLyBzY2hlbWEgKz0gU2NoZW1hUGFydFVpbnQ1MTJTdHJpbmcKICAgIHB1c2hieXRlcyAidWludDUxMiIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NTQKICAgIC8vIGJyZWFrCiAgICBiIGFkZFR5cGVfYmxvY2tANjIKCmFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUAzMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDU1CiAgICAvLyBjYXNlIFNjaGVtYVBhcnRCeXRlczQ6CiAgICBkdXAKICAgIHB1c2hieXRlcyAweDE0CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NTUtNDU3CiAgICAvLyBjYXNlIFNjaGVtYVBhcnRCeXRlczQ6CiAgICAvLyAgIHNjaGVtYSArPSBTY2hlbWFQYXJ0Qnl0ZXM0U3RyaW5nCiAgICAvLyAgIGJyZWFrCiAgICBieiBhZGRUeXBlX2FmdGVyX2lmX2Vsc2VAMzMKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NTYKICAgIC8vIHNjaGVtYSArPSBTY2hlbWFQYXJ0Qnl0ZXM0U3RyaW5nCiAgICBwdXNoYnl0ZXMgImJ5dGVbNF0iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDU3CiAgICAvLyBicmVhawogICAgYiBhZGRUeXBlX2Jsb2NrQDYyCgphZGRUeXBlX2FmdGVyX2lmX2Vsc2VAMzM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ1OAogICAgLy8gY2FzZSBTY2hlbWFQYXJ0Qnl0ZXM4OgogICAgZHVwCiAgICBwdXNoYnl0ZXMgMHgxNQogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDU4LTQ2MAogICAgLy8gY2FzZSBTY2hlbWFQYXJ0Qnl0ZXM4OgogICAgLy8gICBzY2hlbWEgKz0gU2NoZW1hUGFydEJ5dGVzOFN0cmluZwogICAgLy8gICBicmVhawogICAgYnogYWRkVHlwZV9hZnRlcl9pZl9lbHNlQDM2CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDU5CiAgICAvLyBzY2hlbWEgKz0gU2NoZW1hUGFydEJ5dGVzOFN0cmluZwogICAgcHVzaGJ5dGVzICJieXRlWzhdIgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ2MAogICAgLy8gYnJlYWsKICAgIGIgYWRkVHlwZV9ibG9ja0A2MgoKYWRkVHlwZV9hZnRlcl9pZl9lbHNlQDM2OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NjEKICAgIC8vIGNhc2UgU2NoZW1hUGFydEJ5dGVzMTY6CiAgICBkdXAKICAgIHB1c2hieXRlcyAweDE2CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NjEtNDYzCiAgICAvLyBjYXNlIFNjaGVtYVBhcnRCeXRlczE2OgogICAgLy8gICBzY2hlbWEgKz0gU2NoZW1hUGFydEJ5dGVzMTZTdHJpbmcKICAgIC8vICAgYnJlYWsKICAgIGJ6IGFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUAzOQogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ2MgogICAgLy8gc2NoZW1hICs9IFNjaGVtYVBhcnRCeXRlczE2U3RyaW5nCiAgICBwdXNoYnl0ZXMgImJ5dGVbMTZdIgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ2MwogICAgLy8gYnJlYWsKICAgIGIgYWRkVHlwZV9ibG9ja0A2MgoKYWRkVHlwZV9hZnRlcl9pZl9lbHNlQDM5OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NjQKICAgIC8vIGNhc2UgU2NoZW1hUGFydEJ5dGVzMzI6CiAgICBkdXAKICAgIHB1c2hieXRlcyAweDE3CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NjQtNDY2CiAgICAvLyBjYXNlIFNjaGVtYVBhcnRCeXRlczMyOgogICAgLy8gICBzY2hlbWEgKz0gU2NoZW1hUGFydEJ5dGVzMzJTdHJpbmcKICAgIC8vICAgYnJlYWsKICAgIGJ6IGFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUA0MgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ2NQogICAgLy8gc2NoZW1hICs9IFNjaGVtYVBhcnRCeXRlczMyU3RyaW5nCiAgICBwdXNoYnl0ZXMgImJ5dGVbMzJdIgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ2NgogICAgLy8gYnJlYWsKICAgIGIgYWRkVHlwZV9ibG9ja0A2MgoKYWRkVHlwZV9hZnRlcl9pZl9lbHNlQDQyOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NjcKICAgIC8vIGNhc2UgU2NoZW1hUGFydEJ5dGVzNjQ6CiAgICBkdXAKICAgIHB1c2hieXRlcyAweDE4CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NjctNDY5CiAgICAvLyBjYXNlIFNjaGVtYVBhcnRCeXRlczY0OgogICAgLy8gICBzY2hlbWEgKz0gU2NoZW1hUGFydEJ5dGVzNjRTdHJpbmcKICAgIC8vICAgYnJlYWsKICAgIGJ6IGFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUA0NQogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ2OAogICAgLy8gc2NoZW1hICs9IFNjaGVtYVBhcnRCeXRlczY0U3RyaW5nCiAgICBwdXNoYnl0ZXMgImJ5dGVbNjRdIgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ2OQogICAgLy8gYnJlYWsKICAgIGIgYWRkVHlwZV9ibG9ja0A2MgoKYWRkVHlwZV9hZnRlcl9pZl9lbHNlQDQ1OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NzAKICAgIC8vIGNhc2UgU2NoZW1hUGFydEJ5dGVzMTI4OgogICAgZHVwCiAgICBwdXNoYnl0ZXMgMHgxOQogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDcwLTQ3MgogICAgLy8gY2FzZSBTY2hlbWFQYXJ0Qnl0ZXMxMjg6CiAgICAvLyAgIHNjaGVtYSArPSBTY2hlbWFQYXJ0Qnl0ZXMxMjhTdHJpbmcKICAgIC8vICAgYnJlYWsKICAgIGJ6IGFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUA0OAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ3MQogICAgLy8gc2NoZW1hICs9IFNjaGVtYVBhcnRCeXRlczEyOFN0cmluZwogICAgcHVzaGJ5dGVzICJieXRlWzEyOF0iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDcyCiAgICAvLyBicmVhawogICAgYiBhZGRUeXBlX2Jsb2NrQDYyCgphZGRUeXBlX2FmdGVyX2lmX2Vsc2VANDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ3MwogICAgLy8gY2FzZSBTY2hlbWFQYXJ0Qnl0ZXMyNTY6CiAgICBkdXAKICAgIHB1c2hieXRlcyAweDFhCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NzMtNDc1CiAgICAvLyBjYXNlIFNjaGVtYVBhcnRCeXRlczI1NjoKICAgIC8vICAgc2NoZW1hICs9IFNjaGVtYVBhcnRCeXRlczI1NlN0cmluZwogICAgLy8gICBicmVhawogICAgYnogYWRkVHlwZV9hZnRlcl9pZl9lbHNlQDUxCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDc0CiAgICAvLyBzY2hlbWEgKz0gU2NoZW1hUGFydEJ5dGVzMjU2U3RyaW5nCiAgICBwdXNoYnl0ZXMgImJ5dGVbMjU2XSIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NzUKICAgIC8vIGJyZWFrCiAgICBiIGFkZFR5cGVfYmxvY2tANjIKCmFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUA1MToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDc2CiAgICAvLyBjYXNlIFNjaGVtYVBhcnRCeXRlczUxMjoKICAgIGR1cAogICAgcHVzaGJ5dGVzIDB4MWIKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ3Ni00NzgKICAgIC8vIGNhc2UgU2NoZW1hUGFydEJ5dGVzNTEyOgogICAgLy8gICBzY2hlbWEgKz0gU2NoZW1hUGFydEJ5dGVzNTEyU3RyaW5nCiAgICAvLyAgIGJyZWFrCiAgICBieiBhZGRUeXBlX2FmdGVyX2lmX2Vsc2VANTQKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NzcKICAgIC8vIHNjaGVtYSArPSBTY2hlbWFQYXJ0Qnl0ZXM1MTJTdHJpbmcKICAgIHB1c2hieXRlcyAiYnl0ZVs1MTJdIgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ3OAogICAgLy8gYnJlYWsKICAgIGIgYWRkVHlwZV9ibG9ja0A2MgoKYWRkVHlwZV9hZnRlcl9pZl9lbHNlQDU0OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NzkKICAgIC8vIGNhc2UgU2NoZW1hUGFydFN0cmluZzoKICAgIGR1cAogICAgcHVzaGJ5dGVzIDB4MWUKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ3OS00ODEKICAgIC8vIGNhc2UgU2NoZW1hUGFydFN0cmluZzoKICAgIC8vICAgc2NoZW1hICs9IFNjaGVtYVBhcnRTdHJpbmdTdHJpbmcKICAgIC8vICAgYnJlYWsKICAgIGJ6IGFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUA1NwogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ4MAogICAgLy8gc2NoZW1hICs9IFNjaGVtYVBhcnRTdHJpbmdTdHJpbmcKICAgIHB1c2hieXRlcyAic3RyaW5nIgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ4MQogICAgLy8gYnJlYWsKICAgIGIgYWRkVHlwZV9ibG9ja0A2MgoKYWRkVHlwZV9hZnRlcl9pZl9lbHNlQDU3OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0ODIKICAgIC8vIGNhc2UgU2NoZW1hUGFydEFkZHJlc3M6CiAgICBwdXNoYnl0ZXMgMHgyOAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDgyLTQ4NAogICAgLy8gY2FzZSBTY2hlbWFQYXJ0QWRkcmVzczoKICAgIC8vICAgc2NoZW1hICs9IFNjaGVtYVBhcnRBZGRyZXNzU3RyaW5nCiAgICAvLyAgIGJyZWFrCiAgICBieiBhZGRUeXBlX2FmdGVyX2lmX2Vsc2VANjAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDgzCiAgICAvLyBzY2hlbWEgKz0gU2NoZW1hUGFydEFkZHJlc3NTdHJpbmcKICAgIHB1c2hieXRlcyAiYWRkcmVzcyIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0ODQKICAgIC8vIGJyZWFrCiAgICBiIGFkZFR5cGVfYmxvY2tANjIKCmFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUA2MDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDg2CiAgICAvLyBsb2dnZWRBc3NlcnQoZmFsc2UsIGVyckludmFsaWRTY2hlbWFQYXJ0KQogICAgcHVzaGJ5dGVzICJFUlI6ZXJyTXNjaCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJNc2NoCgphZGRUeXBlX2FmdGVyX3doaWxlQDY2OgogICAgYnVyeSAxCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTM5CiAgICAvLyBjb25zdCBpZCA9IHRoaXMudHlwZXNJRC52YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTIwCiAgICAvLyB0eXBlc0lEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBNZXRhR2xvYmFsU3RhdGVLZXlUeXBlc0lEIH0pCiAgICBieXRlYyA3IC8vICJ0eXBlc19pZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTM5CiAgICAvLyBjb25zdCBpZCA9IHRoaXMudHlwZXNJRC52YWx1ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTQwCiAgICAvLyB0aGlzLnR5cGVzSUQudmFsdWUgKz0gMQogICAgZHVwCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxMjAKICAgIC8vIHR5cGVzSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IE1ldGFHbG9iYWxTdGF0ZUtleVR5cGVzSUQgfSkKICAgIGJ5dGVjIDcgLy8gInR5cGVzX2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxNDAKICAgIC8vIHRoaXMudHlwZXNJRC52YWx1ZSArPSAxCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0OTYKICAgIC8vIGNvbnN0IG1pbkJhbGFuY2VCZWZvcmU6IHVpbnQ2NCA9IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLm1pbkJhbGFuY2UKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdE1pbkJhbGFuY2UKICAgIGFzc2VydCAvLyBhY2NvdW50IGZ1bmRlZAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0OTkKICAgIC8vIHNjaGVtYTogc2NoZW1hICsgJyknLAogICAgdW5jb3ZlciAyCiAgICBwdXNoYnl0ZXMgIikiCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDk3LTUwMAogICAgLy8gdGhpcy50eXBlcyhpZCkudmFsdWUgPSB7CiAgICAvLyAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbiwKICAgIC8vICAgc2NoZW1hOiBzY2hlbWEgKyAnKScsCiAgICAvLyB9CiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgNAogICAgKwogICAgZGlnIDYKICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICB1bmNvdmVyIDUKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHB1c2hieXRlcyAweDAwMDQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0OTcKICAgIC8vIHRoaXMudHlwZXMoaWQpLnZhbHVlID0gewogICAgdW5jb3ZlciAyCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjEzMAogICAgLy8gdHlwZXMgPSBCb3hNYXA8dWludDY0LCBUeXBlc1ZhbHVlPih7IGtleVByZWZpeDogTWV0YUJveFByZWZpeFR5cGVzIH0pCiAgICBwdXNoYnl0ZXMgInQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDk3LTUwMAogICAgLy8gdGhpcy50eXBlcyhpZCkudmFsdWUgPSB7CiAgICAvLyAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbiwKICAgIC8vICAgc2NoZW1hOiBzY2hlbWEgKyAnKScsCiAgICAvLyB9CiAgICBkdXAKICAgIGJveF9kZWwKICAgIHBvcAogICAgc3dhcAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1MDIKICAgIC8vIGNvbnN0IHN0b3JhZ2U6IHVpbnQ2NCA9IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLm1pbkJhbGFuY2UgLSBtaW5CYWxhbmNlQmVmb3JlCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RNaW5CYWxhbmNlCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIHN3YXAKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTAzCiAgICAvLyB0aGlzLnR5cGVGZWVzLnZhbHVlICs9IE1ldGFUeXBlRmVlIC0gc3RvcmFnZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTI1CiAgICAvLyB0eXBlRmVlcyA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogTWV0YUdsb2JhbFN0YXRlS2V5VHlwZUZlZXMgfSkKICAgIGJ5dGVjXzMgLy8gInR5cGVfZmVlcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTAzCiAgICAvLyB0aGlzLnR5cGVGZWVzLnZhbHVlICs9IE1ldGFUeXBlRmVlIC0gc3RvcmFnZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGMgOSAvLyAxMDAwMDAwMDAKICAgIHVuY292ZXIgMgogICAgLQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxMjUKICAgIC8vIHR5cGVGZWVzID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBNZXRhR2xvYmFsU3RhdGVLZXlUeXBlRmVlcyB9KQogICAgYnl0ZWNfMyAvLyAidHlwZV9mZWVzIgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1MDMKICAgIC8vIHRoaXMudHlwZUZlZXMudmFsdWUgKz0gTWV0YVR5cGVGZWUgLSBzdG9yYWdlCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0MjYKICAgIC8vIGFkZFR5cGUocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBkZXNjcmlwdGlvbjogc3RyaW5nLCBzY2hlbWFMaXN0OiBTY2hlbWFMaXN0KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5jb2xsZWN0VHlwZUZlZXNbcm91dGluZ10oKSAtPiB2b2lkOgpjb2xsZWN0VHlwZUZlZXM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjUxMwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYWtpdGFEQU9Fc2Nyb3cuaGFzVmFsdWUgJiYgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuaWQgIT09IDAsIGVyckVzY3Jvd0RvZXNOb3RFeGlzdCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyA2IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjUxMwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYWtpdGFEQU9Fc2Nyb3cuaGFzVmFsdWUgJiYgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuaWQgIT09IDAsIGVyckVzY3Jvd0RvZXNOb3RFeGlzdCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBidXJ5IDEKICAgIGJ6IGNvbGxlY3RUeXBlRmVlc19ib29sX2ZhbHNlQDQKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyA2IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjUxMwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYWtpdGFEQU9Fc2Nyb3cuaGFzVmFsdWUgJiYgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuaWQgIT09IDAsIGVyckVzY3Jvd0RvZXNOb3RFeGlzdCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzIgLy8gMgogICAgZXh0cmFjdF91aW50NjQKICAgIGJ6IGNvbGxlY3RUeXBlRmVlc19ib29sX2ZhbHNlQDQKICAgIGludGNfMSAvLyAxCgpjb2xsZWN0VHlwZUZlZXNfYm9vbF9tZXJnZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1MTMKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmFraXRhREFPRXNjcm93Lmhhc1ZhbHVlICYmIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmlkICE9PSAwLCBlcnJFc2Nyb3dEb2VzTm90RXhpc3QpCiAgICBibnogY29sbGVjdFR5cGVGZWVzX2FmdGVyX2Fzc2VydEA3CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJOZXNjIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5lc2MKCmNvbGxlY3RUeXBlRmVlc19hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTE1CiAgICAvLyBjb25zdCBhcHAgPSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTE1LTUxNgogICAgLy8gY29uc3QgYXBwID0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIC8vIGNvbnN0IHNwYXJlOiB1aW50NjQgPSBhcHAuYmFsYW5jZSA+IGFwcC5taW5CYWxhbmNlID8gYXBwLmJhbGFuY2UgLSBhcHAubWluQmFsYW5jZSA6IDAKICAgIGR1cG4gMgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1MTYKICAgIC8vIGNvbnN0IHNwYXJlOiB1aW50NjQgPSBhcHAuYmFsYW5jZSA+IGFwcC5taW5CYWxhbmNlID8gYXBwLmJhbGFuY2UgLSBhcHAubWluQmFsYW5jZSA6IDAKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0QmFsYW5jZQogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICBzd2FwCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdE1pbkJhbGFuY2UKICAgIGFzc2VydCAvLyBhY2NvdW50IGZ1bmRlZAogICAgPgogICAgYnogY29sbGVjdFR5cGVGZWVzX3Rlcm5hcnlfZmFsc2VAOQogICAgZHVwCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdEJhbGFuY2UKICAgIGFzc2VydCAvLyBhY2NvdW50IGZ1bmRlZAogICAgc3dhcAogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RNaW5CYWxhbmNlCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIC0KCmNvbGxlY3RUeXBlRmVlc190ZXJuYXJ5X21lcmdlQDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1MTcKICAgIC8vIGNvbnN0IGFtb3VudDogdWludDY0ID0gdGhpcy50eXBlRmVlcy52YWx1ZSA8IHNwYXJlID8gdGhpcy50eXBlRmVlcy52YWx1ZSA6IHNwYXJlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxMjUKICAgIC8vIHR5cGVGZWVzID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBNZXRhR2xvYmFsU3RhdGVLZXlUeXBlRmVlcyB9KQogICAgYnl0ZWNfMyAvLyAidHlwZV9mZWVzIgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1MTcKICAgIC8vIGNvbnN0IGFtb3VudDogdWludDY0ID0gdGhpcy50eXBlRmVlcy52YWx1ZSA8IHNwYXJlID8gdGhpcy50eXBlRmVlcy52YWx1ZSA6IHNwYXJlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDEKICAgIDwKICAgIGJ6IGNvbGxlY3RUeXBlRmVlc190ZXJuYXJ5X2ZhbHNlQDEyCiAgICBwb3AKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjEyNQogICAgLy8gdHlwZUZlZXMgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IE1ldGFHbG9iYWxTdGF0ZUtleVR5cGVGZWVzIH0pCiAgICBieXRlY18zIC8vICJ0eXBlX2ZlZXMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjUxNwogICAgLy8gY29uc3QgYW1vdW50OiB1aW50NjQgPSB0aGlzLnR5cGVGZWVzLnZhbHVlIDwgc3BhcmUgPyB0aGlzLnR5cGVGZWVzLnZhbHVlIDogc3BhcmUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCgpjb2xsZWN0VHlwZUZlZXNfdGVybmFyeV9tZXJnZUAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTE4CiAgICAvLyBpZiAoYW1vdW50ID09PSAwKSB7CiAgICBkdXAKICAgIGJueiBjb2xsZWN0VHlwZUZlZXNfYWZ0ZXJfaWZfZWxzZUAxNQogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjUxOQogICAgLy8gcmV0dXJuIDAKICAgIGludGNfMCAvLyAwCgpjb2xsZWN0VHlwZUZlZXNfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLmNvbGxlY3RUeXBlRmVlc0AxNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTEyCiAgICAvLyBjb2xsZWN0VHlwZUZlZXMoKTogdWludDY0IHsKICAgIGl0b2IKICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmNvbGxlY3RUeXBlRmVlc19hZnRlcl9pZl9lbHNlQDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1MjIKICAgIC8vIHRoaXMudHlwZUZlZXMudmFsdWUgLT0gYW1vdW50CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxMjUKICAgIC8vIHR5cGVGZWVzID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBNZXRhR2xvYmFsU3RhdGVLZXlUeXBlRmVlcyB9KQogICAgYnl0ZWNfMyAvLyAidHlwZV9mZWVzIgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1MjIKICAgIC8vIHRoaXMudHlwZUZlZXMudmFsdWUgLT0gYW1vdW50CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDEKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTI1CiAgICAvLyB0eXBlRmVlcyA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogTWV0YUdsb2JhbFN0YXRlS2V5VHlwZUZlZXMgfSkKICAgIGJ5dGVjXzMgLy8gInR5cGVfZmVlcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTIyCiAgICAvLyB0aGlzLnR5cGVGZWVzLnZhbHVlIC09IGFtb3VudAogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTIzCiAgICAvLyBpdHhuLnBheW1lbnQoeyByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywgYW1vdW50LCBmZWU6IDAgfSkuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyA2IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjUyMwogICAgLy8gaXR4bi5wYXltZW50KHsgcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsIGFtb3VudCwgZmVlOiAwIH0pLnN1Ym1pdCgpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18yIC8vIDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBkaWcgMQogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjUxMgogICAgLy8gY29sbGVjdFR5cGVGZWVzKCk6IHVpbnQ2NCB7CiAgICBiIGNvbGxlY3RUeXBlRmVlc19hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEuY29sbGVjdFR5cGVGZWVzQDE3Cgpjb2xsZWN0VHlwZUZlZXNfdGVybmFyeV9mYWxzZUAxMjoKICAgIGIgY29sbGVjdFR5cGVGZWVzX3Rlcm5hcnlfbWVyZ2VAMTMKCmNvbGxlY3RUeXBlRmVlc190ZXJuYXJ5X2ZhbHNlQDk6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTE2CiAgICAvLyBjb25zdCBzcGFyZTogdWludDY0ID0gYXBwLmJhbGFuY2UgPiBhcHAubWluQmFsYW5jZSA/IGFwcC5iYWxhbmNlIC0gYXBwLm1pbkJhbGFuY2UgOiAwCiAgICBpbnRjXzAgLy8gMAogICAgYiBjb2xsZWN0VHlwZUZlZXNfdGVybmFyeV9tZXJnZUAxMAoKY29sbGVjdFR5cGVGZWVzX2Jvb2xfZmFsc2VANDoKICAgIGludGNfMCAvLyAwCiAgICBiIGNvbGxlY3RUeXBlRmVlc19ib29sX21lcmdlQDUKCgovLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnJvb3RDb3N0c1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnJvb3RDb3N0czoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTI5CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjUzMgogICAgLy8gcmV0dXJuIDMxXzcwMCArIDQwMCAqIEJ5dGVzKG5hbWUpLmxlbmd0aAogICAgbGVuCiAgICBpbnRjIDUgLy8gNDAwCiAgICAqCiAgICBpbnRjIDYgLy8gMzE3MDAKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTI5CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGl0b2IKICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLmRhdGFDb3N0c1tyb3V0aW5nXSgpIC0+IHZvaWQ6CmRhdGFDb3N0czoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTM1CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTM3CiAgICAvLyByZXR1cm4gdGhpcy5yZWNvcmRTdG9yYWdlQ29zdCh0aGlzLmRhdGFLZXkobmFtZSwga2V5KSwgQnl0ZXModmFsdWUpLmxlbmd0aCkKICAgIGNvdmVyIDIKICAgIGNhbGxzdWIgZGF0YUtleQogICAgc3dhcAogICAgbGVuCiAgICBjYWxsc3ViIHJlY29yZFN0b3JhZ2VDb3N0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjUzNQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBpdG9iCiAgICBieXRlY18wIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZWNvcmRJbmZvW3JvdXRpbmddKCkgLT4gdm9pZDoKcmVjb3JkSW5mbzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTQwCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZWNvcmRJbmZvCiAgICBieXRlY18wIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZWFkUmVjb3JkW3JvdXRpbmddKCkgLT4gdm9pZDoKcmVhZFJlY29yZDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTQ3CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZWFkUmVjb3JkCiAgICBieXRlY18wIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZWFkUmVjb3JkU2xpY2Vbcm91dGluZ10oKSAtPiB2b2lkOgpyZWFkUmVjb3JkU2xpY2U6CiAgICBieXRlY18xIC8vICIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjU1NgogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXBuIDIKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciAyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgMgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTU4CiAgICAvLyBjb25zdCBpbmZvID0gdGhpcy5yZWNvcmRJbmZvKGFjY291bnQsIGtleSkKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZWNvcmRJbmZvCiAgICBkdXAKICAgIGNvdmVyIDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTU5CiAgICAvLyBsb2dnZWRBc3NlcnQoaW5mby5leGlzdHMsIGVyclJlY29yZE5vdEZvdW5kKQogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgYm56IHJlYWRSZWNvcmRTbGljZV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMjMgLy8gIkVSUjplcnJNcm5mIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck1ybmYKCnJlYWRSZWNvcmRTbGljZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTYwCiAgICAvLyBsb2dnZWRBc3NlcnQoaW5mby5yZXZpc2lvbiA9PT0gZXhwZWN0ZWRSZXZpc2lvbiwgZXJyUmVjb3JkUmV2aXNpb25NaXNtYXRjaCkKICAgIGRpZyA1CiAgICBpbnRjXzEgLy8gMQogICAgZXh0cmFjdF91aW50NjQKICAgID09CiAgICBibnogcmVhZFJlY29yZFNsaWNlX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyAxMiAvLyAiRVJSOmVyck1yZXYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTXJldgoKcmVhZFJlY29yZFNsaWNlX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1NjEKICAgIC8vIGxvZ2dlZEFzc2VydChsZW5ndGggPD0gTWF4UmVjb3JkQ2h1bmtCeXRlcyAmJiBvZmZzZXQgPD0gaW5mby5zaXplICYmIGxlbmd0aCA8PSBpbmZvLnNpemUgLSBvZmZzZXQsIGVyclJlY29yZFJhbmdlKQogICAgZHVwCiAgICBpbnRjIDcgLy8gMTAyNAogICAgPD0KICAgIGJ6IHJlYWRSZWNvcmRTbGljZV9ib29sX2ZhbHNlQDkKICAgIGRpZyA0CiAgICBwdXNoaW50IDkKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGJ1cnkgNwogICAgZGlnIDIKICAgID49CiAgICBieiByZWFkUmVjb3JkU2xpY2VfYm9vbF9mYWxzZUA5CiAgICBkaWcgNQogICAgZGlnIDIKICAgIC0KICAgIGRpZyAxCiAgICA+PQogICAgYnogcmVhZFJlY29yZFNsaWNlX2Jvb2xfZmFsc2VAOQogICAgaW50Y18xIC8vIDEKCnJlYWRSZWNvcmRTbGljZV9ib29sX21lcmdlQDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1NjEKICAgIC8vIGxvZ2dlZEFzc2VydChsZW5ndGggPD0gTWF4UmVjb3JkQ2h1bmtCeXRlcyAmJiBvZmZzZXQgPD0gaW5mby5zaXplICYmIGxlbmd0aCA8PSBpbmZvLnNpemUgLSBvZmZzZXQsIGVyclJlY29yZFJhbmdlKQogICAgYm56IHJlYWRSZWNvcmRTbGljZV9hZnRlcl9hc3NlcnRAMTIKICAgIHB1c2hieXRlcyAiRVJSOmVyck1ybmciCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTXJuZwoKcmVhZFJlY29yZFNsaWNlX2FmdGVyX2Fzc2VydEAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTYyCiAgICAvLyByZXR1cm4gdGhpcy5yZWNvcmRzKHRoaXMucmVjb3JkS2V5KGFjY291bnQsIGtleSkpLmV4dHJhY3QoUmVjb3JkSGVhZGVyQnl0ZXMgKyBvZmZzZXQsIGxlbmd0aCkKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAzCiAgICBjYWxsc3ViIHJlY29yZEtleQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxMzQKICAgIC8vIHJlY29yZHMgPSBCb3hNYXA8Ynl0ZXMsIE1ldGFSZWNvcmRWYWx1ZT4oeyBrZXlQcmVmaXg6IFJlY29yZFByZWZpeCB9KQogICAgYnl0ZWNfMiAvLyAibSIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1NjIKICAgIC8vIHJldHVybiB0aGlzLnJlY29yZHModGhpcy5yZWNvcmRLZXkoYWNjb3VudCwga2V5KSkuZXh0cmFjdChSZWNvcmRIZWFkZXJCeXRlcyArIG9mZnNldCwgbGVuZ3RoKQogICAgcHVzaGludCAxMgogICAgdW5jb3ZlciAzCiAgICArCiAgICB1bmNvdmVyIDIKICAgIGJveF9leHRyYWN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjU1NgogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYnl0ZWNfMCAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKcmVhZFJlY29yZFNsaWNlX2Jvb2xfZmFsc2VAOToKICAgIGludGNfMCAvLyAwCiAgICBiIHJlYWRSZWNvcmRTbGljZV9ib29sX21lcmdlQDEwCgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZWNvcmRDb3N0W3JvdXRpbmddKCkgLT4gdm9pZDoKcmVjb3JkQ29zdDoKICAgIGludGNfMCAvLyAwCiAgICBieXRlY18xIC8vICIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjU2NQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTY3CiAgICAvLyBsb2dnZWRBc3NlcnQoc2l6ZSArIFJlY29yZEFyZ3VtZW50Qnl0ZXMgKyBrZXkubGVuZ3RoIDw9IE1heEFwcENhbGxBcmd1bWVudEJ5dGVzLCBlcnJSZWNvcmRWYWx1ZVRvb0xhcmdlKQogICAgcHVzaGludCAyMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICArCiAgICBpbnRjIDEwIC8vIDE2Mzg0CiAgICA8PQogICAgYm56IHJlY29yZENvc3RfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDI0IC8vICJFUlI6ZXJyTXZzeiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJNdnN6CgpyZWNvcmRDb3N0X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1NjgKICAgIC8vIGNvbnN0IGlkID0gdGhpcy5yZWNvcmRLZXkoYWNjb3VudCwga2V5KQogICAgc3dhcAogICAgZGlnIDIKICAgIGR1cAogICAgY292ZXIgMgogICAgY2FsbHN1YiByZWNvcmRLZXkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTY5CiAgICAvLyBjb25zdCBuZXh0ID0gdGhpcy5yZWNvcmRTdG9yYWdlQ29zdChrZXksIHNpemUpCiAgICBzd2FwCiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgcmVjb3JkU3RvcmFnZUNvc3QKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTcwCiAgICAvLyBsZXQgcHJldmlvdXM6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBidXJ5IDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTM0CiAgICAvLyByZWNvcmRzID0gQm94TWFwPGJ5dGVzLCBNZXRhUmVjb3JkVmFsdWU+KHsga2V5UHJlZml4OiBSZWNvcmRQcmVmaXggfSkKICAgIGJ5dGVjXzIgLy8gIm0iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgYnVyeSA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjU3MQogICAgLy8gaWYgKHRoaXMucmVjb3JkcyhpZCkuZXhpc3RzKSBwcmV2aW91cyA9IHRoaXMucmVjb3JkU3RvcmFnZUNvc3Qoa2V5LCB0aGlzLnJlY29yZHMoaWQpLmxlbmd0aCAtIFJlY29yZEhlYWRlckJ5dGVzKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiByZWNvcmRDb3N0X2FmdGVyX2lmX2Vsc2VANQogICAgZGlnIDMKICAgIGJveF9sZW4KICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBwdXNoaW50IDEyCiAgICAtCiAgICBkaWcgMgogICAgc3dhcAogICAgY2FsbHN1YiByZWNvcmRTdG9yYWdlQ29zdAogICAgYnVyeSAzCgpyZWNvcmRDb3N0X2FmdGVyX2lmX2Vsc2VANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTcyCiAgICAvLyByZXR1cm4gbmV4dCA+IHByZXZpb3VzID8gbmV4dCAtIHByZXZpb3VzIDogMAogICAgZHVwCiAgICBkaWcgMwogICAgPgogICAgYnogcmVjb3JkQ29zdF90ZXJuYXJ5X2ZhbHNlQDcKICAgIGRpZyAyCiAgICAtCgpyZWNvcmRDb3N0X3Rlcm5hcnlfbWVyZ2VAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTY1CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGl0b2IKICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCnJlY29yZENvc3RfdGVybmFyeV9mYWxzZUA3OgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjU3MgogICAgLy8gcmV0dXJuIG5leHQgPiBwcmV2aW91cyA/IG5leHQgLSBwcmV2aW91cyA6IDAKICAgIGludGNfMCAvLyAwCiAgICBiIHJlY29yZENvc3RfdGVybmFyeV9tZXJnZUA4CgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5zZXRSZWNvcmRbcm91dGluZ10oKSAtPiB2b2lkOgpzZXRSZWNvcmQ6CiAgICBpbnRjXzAgLy8gMAogICAgYnl0ZWNfMSAvLyAiIgogICAgZHVwbiA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjU3Ni01ODAKICAgIC8vIHNldFJlY29yZCgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBrZXk6IGJ5dGVzLAogICAgLy8gICBkYXRhMDogYnl0ZXMsIGRhdGExOiBieXRlcywgZGF0YTI6IGJ5dGVzLCBkYXRhMzogYnl0ZXMsCiAgICAvLyAgIGV4cGVjdGVkUmV2aXNpb246IHVpbnQ2NCwKICAgIC8vICk6IHVpbnQ2NCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBkdXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBjb3ZlciAzCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgY292ZXIgMwogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIGNvdmVyIDIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDYKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjU4MQogICAgLy8gY29uc3QgaWQgPSB0aGlzLnJlY29yZEtleShUeG4uc2VuZGVyLCBrZXkpCiAgICB0eG4gU2VuZGVyCiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgcmVjb3JkS2V5CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjU4MgogICAgLy8gbG9nZ2VkQXNzZXJ0KGRhdGEwLmxlbmd0aCA8PSBNYXhSZWNvcmRQYXJ0Qnl0ZXMgJiYgZGF0YTEubGVuZ3RoIDw9IE1heFJlY29yZFBhcnRCeXRlcyAmJgogICAgbGVuCiAgICBkdXAKICAgIGNvdmVyIDUKICAgIGludGMgOCAvLyA0MDk0CiAgICA8PQogICAgYnogc2V0UmVjb3JkX2Jvb2xfZmFsc2VANgogICAgZGlnIDYKICAgIGxlbgogICAgaW50YyA4IC8vIDQwOTQKICAgIDw9CiAgICBieiBzZXRSZWNvcmRfYm9vbF9mYWxzZUA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjU4MwogICAgLy8gZGF0YTIubGVuZ3RoIDw9IE1heFJlY29yZFBhcnRCeXRlcyAmJiBkYXRhMy5sZW5ndGggPD0gTWF4RmluYWxSZWNvcmRQYXJ0Qnl0ZXMsIGVyclJlY29yZFBhcnRUb29MYXJnZSkKICAgIGRpZyA1CiAgICBsZW4KICAgIGludGMgOCAvLyA0MDk0CiAgICA8PQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1ODItNTgzCiAgICAvLyBsb2dnZWRBc3NlcnQoZGF0YTAubGVuZ3RoIDw9IE1heFJlY29yZFBhcnRCeXRlcyAmJiBkYXRhMS5sZW5ndGggPD0gTWF4UmVjb3JkUGFydEJ5dGVzICYmCiAgICAvLyAgIGRhdGEyLmxlbmd0aCA8PSBNYXhSZWNvcmRQYXJ0Qnl0ZXMgJiYgZGF0YTMubGVuZ3RoIDw9IE1heEZpbmFsUmVjb3JkUGFydEJ5dGVzLCBlcnJSZWNvcmRQYXJ0VG9vTGFyZ2UpCiAgICBieiBzZXRSZWNvcmRfYm9vbF9mYWxzZUA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjU4MwogICAgLy8gZGF0YTIubGVuZ3RoIDw9IE1heFJlY29yZFBhcnRCeXRlcyAmJiBkYXRhMy5sZW5ndGggPD0gTWF4RmluYWxSZWNvcmRQYXJ0Qnl0ZXMsIGVyclJlY29yZFBhcnRUb29MYXJnZSkKICAgIGRpZyAyCiAgICBsZW4KICAgIHB1c2hpbnQgNDA4NAogICAgPD0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTgyLTU4MwogICAgLy8gbG9nZ2VkQXNzZXJ0KGRhdGEwLmxlbmd0aCA8PSBNYXhSZWNvcmRQYXJ0Qnl0ZXMgJiYgZGF0YTEubGVuZ3RoIDw9IE1heFJlY29yZFBhcnRCeXRlcyAmJgogICAgLy8gICBkYXRhMi5sZW5ndGggPD0gTWF4UmVjb3JkUGFydEJ5dGVzICYmIGRhdGEzLmxlbmd0aCA8PSBNYXhGaW5hbFJlY29yZFBhcnRCeXRlcywgZXJyUmVjb3JkUGFydFRvb0xhcmdlKQogICAgYnogc2V0UmVjb3JkX2Jvb2xfZmFsc2VANgogICAgaW50Y18xIC8vIDEKCnNldFJlY29yZF9ib29sX21lcmdlQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjU4Mi01ODMKICAgIC8vIGxvZ2dlZEFzc2VydChkYXRhMC5sZW5ndGggPD0gTWF4UmVjb3JkUGFydEJ5dGVzICYmIGRhdGExLmxlbmd0aCA8PSBNYXhSZWNvcmRQYXJ0Qnl0ZXMgJiYKICAgIC8vICAgZGF0YTIubGVuZ3RoIDw9IE1heFJlY29yZFBhcnRCeXRlcyAmJiBkYXRhMy5sZW5ndGggPD0gTWF4RmluYWxSZWNvcmRQYXJ0Qnl0ZXMsIGVyclJlY29yZFBhcnRUb29MYXJnZSkKICAgIGJueiBzZXRSZWNvcmRfYWZ0ZXJfYXNzZXJ0QDkKICAgIHB1c2hieXRlcyAiRVJSOmVyck1wcnQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTXBydAoKc2V0UmVjb3JkX2FmdGVyX2Fzc2VydEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1ODQKICAgIC8vIGNvbnN0IHNpemU6IHVpbnQ2NCA9IGRhdGEwLmxlbmd0aCArIGRhdGExLmxlbmd0aCArIGRhdGEyLmxlbmd0aCArIGRhdGEzLmxlbmd0aAogICAgZGlnIDYKICAgIGxlbgogICAgZHVwCiAgICBidXJ5IDEyCiAgICBkaWcgNQogICAgKwogICAgZGlnIDYKICAgIGxlbgogICAgZHVwCiAgICBidXJ5IDEyCiAgICArCiAgICBkaWcgMwogICAgbGVuCiAgICBkdXAKICAgIGNvdmVyIDMKICAgICsKICAgIGR1cAogICAgYnVyeSAxNQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1ODUKICAgIC8vIGxvZ2dlZEFzc2VydChzaXplICsgUmVjb3JkQXJndW1lbnRCeXRlcyArIGtleS5sZW5ndGggPD0gTWF4QXBwQ2FsbEFyZ3VtZW50Qnl0ZXMsIGVyclJlY29yZFZhbHVlVG9vTGFyZ2UpCiAgICBwdXNoaW50IDIyCiAgICArCiAgICBkaWcgNQogICAgbGVuCiAgICArCiAgICBpbnRjIDEwIC8vIDE2Mzg0CiAgICA8PQogICAgYm56IHNldFJlY29yZF9hZnRlcl9hc3NlcnRAMTEKICAgIGJ5dGVjIDI0IC8vICJFUlI6ZXJyTXZzeiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJNdnN6CgpzZXRSZWNvcmRfYWZ0ZXJfYXNzZXJ0QDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1ODYKICAgIC8vIGxvZ2dlZEFzc2VydChleHBlY3RlZFJldmlzaW9uID09PSB0aGlzLmN1cnJlbnRSZWNvcmRSZXZpc2lvbihpZCksIGVyclJlY29yZFJldmlzaW9uTWlzbWF0Y2gpCiAgICBkdXAKICAgIGNhbGxzdWIgY3VycmVudFJlY29yZFJldmlzaW9uCiAgICB1bmNvdmVyIDMKICAgID09CiAgICBibnogc2V0UmVjb3JkX2FmdGVyX2Fzc2VydEAxMwogICAgYnl0ZWMgMTIgLy8gIkVSUjplcnJNcmV2IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck1yZXYKCnNldFJlY29yZF9hZnRlcl9hc3NlcnRAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjEzNAogICAgLy8gcmVjb3JkcyA9IEJveE1hcDxieXRlcywgTWV0YVJlY29yZFZhbHVlPih7IGtleVByZWZpeDogUmVjb3JkUHJlZml4IH0pCiAgICBieXRlY18yIC8vICJtIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGJ1cnkgMTcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTg3CiAgICAvLyBjb25zdCBleGlzdHMgPSB0aGlzLnJlY29yZHMoaWQpLmV4aXN0cwogICAgYm94X2xlbgogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1ODgKICAgIC8vIGxldCBwcmV2aW91c0Nvc3Q6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBidXJ5IDE2CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjU4OQogICAgLy8gaWYgKGV4aXN0cykgcHJldmlvdXNDb3N0ID0gdGhpcy5yZWNvcmRTdG9yYWdlQ29zdChrZXksIHRoaXMucmVjb3JkcyhpZCkubGVuZ3RoIC0gUmVjb3JkSGVhZGVyQnl0ZXMpCiAgICBieiBzZXRSZWNvcmRfYWZ0ZXJfaWZfZWxzZUAxNQogICAgZGlnIDE2CiAgICBib3hfbGVuCiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgcHVzaGludCAxMgogICAgLQogICAgZGlnIDQKICAgIHN3YXAKICAgIGNhbGxzdWIgcmVjb3JkU3RvcmFnZUNvc3QKICAgIGJ1cnkgMTUKCnNldFJlY29yZF9hZnRlcl9pZl9lbHNlQDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1OTAKICAgIC8vIGNvbnN0IG5leHRDb3N0ID0gdGhpcy5yZWNvcmRTdG9yYWdlQ29zdChrZXksIHNpemUpCiAgICBkaWcgMwogICAgZGlnIDEzCiAgICBjYWxsc3ViIHJlY29yZFN0b3JhZ2VDb3N0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTkxCiAgICAvLyBjb25zdCBkdWU6IHVpbnQ2NCA9IG5leHRDb3N0ID4gcHJldmlvdXNDb3N0ID8gbmV4dENvc3QgLSBwcmV2aW91c0Nvc3QgOiAwCiAgICBkaWcgMTYKICAgID4KICAgIGJ6IHNldFJlY29yZF90ZXJuYXJ5X2ZhbHNlQDE3CiAgICBkdXAKICAgIGRpZyAxNgogICAgLQoKc2V0UmVjb3JkX3Rlcm5hcnlfbWVyZ2VAMTg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjU5NAogICAgLy8gbGV0IHNwb25zb3I6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBidXJ5IDE0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjU5NQogICAgLy8gaWYgKCFleGlzdHMpIHsKICAgIHVuY292ZXIgMgogICAgYm56IHNldFJlY29yZF9lbHNlX2JvZHlAMjAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTk2CiAgICAvLyBzcG9uc29yID0gc3BvbnNvckNvc3QocGF5bWVudC5zZW5kZXIsIFR4bi5zZW5kZXIpCiAgICBkaWcgOQogICAgZ3R4bnMgU2VuZGVyCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwMQogICAgLy8gcmV0dXJuIHBheWVyID09PSBvd25lciA/IDAgOiBQYXllclJlY29yZE1CUgogICAgPT0KICAgIGludGMgNCAvLyAyODUwMAogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBidXJ5IDEzCgpzZXRSZWNvcmRfYWZ0ZXJfaWZfZWxzZUAyNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NjAwCiAgICAvLyB0aGlzLnJlcXVpcmVSZWNvcmRQYXltZW50KHBheW1lbnQsIGR1ZSArIHNwb25zb3IpCiAgICBkaWcgMTIKICAgICsKICAgIGJ1cnkgMTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTg2CiAgICAvLyBwYXltZW50Lmdyb3VwSW5kZXggKyAxID09PSBUeG4uZ3JvdXBJbmRleCAmJgogICAgZGlnIDgKICAgIGd0eG5zIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICArCiAgICB0eG4gR3JvdXBJbmRleAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTg2LTE4NwogICAgLy8gcGF5bWVudC5ncm91cEluZGV4ICsgMSA9PT0gVHhuLmdyb3VwSW5kZXggJiYKICAgIC8vICAgcGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MgJiYKICAgIGJ6IHNldFJlY29yZF9ib29sX2ZhbHNlQDUyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjE4NwogICAgLy8gcGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MgJiYKICAgIGRpZyA4CiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjE4Ni0xODcKICAgIC8vIHBheW1lbnQuZ3JvdXBJbmRleCArIDEgPT09IFR4bi5ncm91cEluZGV4ICYmCiAgICAvLyAgIHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzICYmCiAgICBieiBzZXRSZWNvcmRfYm9vbF9mYWxzZUA1MgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxODgKICAgIC8vIHBheW1lbnQuYW1vdW50ID09PSBhbW91bnQgJiYKICAgIGRpZyA4CiAgICBndHhucyBBbW91bnQKICAgIGRpZyAxNgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTg2LTE4OAogICAgLy8gcGF5bWVudC5ncm91cEluZGV4ICsgMSA9PT0gVHhuLmdyb3VwSW5kZXggJiYKICAgIC8vICAgcGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MgJiYKICAgIC8vICAgcGF5bWVudC5hbW91bnQgPT09IGFtb3VudCAmJgogICAgYnogc2V0UmVjb3JkX2Jvb2xfZmFsc2VANTIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTg5CiAgICAvLyBwYXltZW50LmNsb3NlUmVtYWluZGVyVG8gPT09IEdsb2JhbC56ZXJvQWRkcmVzcyAmJgogICAgZGlnIDgKICAgIGd0eG5zIENsb3NlUmVtYWluZGVyVG8KICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTg2LTE4OQogICAgLy8gcGF5bWVudC5ncm91cEluZGV4ICsgMSA9PT0gVHhuLmdyb3VwSW5kZXggJiYKICAgIC8vICAgcGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MgJiYKICAgIC8vICAgcGF5bWVudC5hbW91bnQgPT09IGFtb3VudCAmJgogICAgLy8gICBwYXltZW50LmNsb3NlUmVtYWluZGVyVG8gPT09IEdsb2JhbC56ZXJvQWRkcmVzcyAmJgogICAgYnogc2V0UmVjb3JkX2Jvb2xfZmFsc2VANTIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTkwCiAgICAvLyBwYXltZW50LnJla2V5VG8gPT09IEdsb2JhbC56ZXJvQWRkcmVzcywKICAgIGRpZyA4CiAgICBndHhucyBSZWtleVRvCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjE4Ni0xOTAKICAgIC8vIHBheW1lbnQuZ3JvdXBJbmRleCArIDEgPT09IFR4bi5ncm91cEluZGV4ICYmCiAgICAvLyAgIHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzICYmCiAgICAvLyAgIHBheW1lbnQuYW1vdW50ID09PSBhbW91bnQgJiYKICAgIC8vICAgcGF5bWVudC5jbG9zZVJlbWFpbmRlclRvID09PSBHbG9iYWwuemVyb0FkZHJlc3MgJiYKICAgIC8vICAgcGF5bWVudC5yZWtleVRvID09PSBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICBieiBzZXRSZWNvcmRfYm9vbF9mYWxzZUA1MgogICAgaW50Y18xIC8vIDEKCnNldFJlY29yZF9ib29sX21lcmdlQDUzOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxODUtMTkyCiAgICAvLyBsb2dnZWRBc3NlcnQoCiAgICAvLyAgIHBheW1lbnQuZ3JvdXBJbmRleCArIDEgPT09IFR4bi5ncm91cEluZGV4ICYmCiAgICAvLyAgICAgcGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MgJiYKICAgIC8vICAgICBwYXltZW50LmFtb3VudCA9PT0gYW1vdW50ICYmCiAgICAvLyAgICAgcGF5bWVudC5jbG9zZVJlbWFpbmRlclRvID09PSBHbG9iYWwuemVyb0FkZHJlc3MgJiYKICAgIC8vICAgICBwYXltZW50LnJla2V5VG8gPT09IEdsb2JhbC56ZXJvQWRkcmVzcywKICAgIC8vICAgZXJySW52YWxpZFJlY29yZFBheW1lbnQsCiAgICAvLyApCiAgICBibnogc2V0UmVjb3JkX2FmdGVyX2Fzc2VydEA1NQogICAgcHVzaGJ5dGVzICJFUlI6ZXJyTXBtdCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJNcG10CgpzZXRSZWNvcmRfYWZ0ZXJfYXNzZXJ0QDU1OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2MDEKICAgIC8vIGNvbnN0IHJldmlzaW9uID0gdGhpcy53cml0ZVJlY29yZChrZXksIGRhdGEzKQogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDMKICAgIGNhbGxzdWIgd3JpdGVSZWNvcmQKICAgIGJ1cnkgMTIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NjAyCiAgICAvLyBpZiAoc3BvbnNvciA+IDApIHJlY29yZFBheWVyKHRoaXMucmVjb3JkcyhpZCkua2V5LCBwYXltZW50LnNlbmRlciwgVHhuLnNlbmRlcikKICAgIGRpZyA5CiAgICBieiBzZXRSZWNvcmRfYWZ0ZXJfaWZfZWxzZUAyNwogICAgZGlnIDYKICAgIGd0eG5zIFNlbmRlcgogICAgdHhuIFNlbmRlcgogICAgZGlnIDE2CiAgICBjb3ZlciAyCiAgICBjYWxsc3ViIHJlY29yZFBheWVyCgpzZXRSZWNvcmRfYWZ0ZXJfaWZfZWxzZUAyNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NjAzCiAgICAvLyBpZiAoc2l6ZSA+IGRhdGEzLmxlbmd0aCkgewogICAgZGlnIDEwCiAgICB1bmNvdmVyIDIKICAgID4KICAgIGJ6IHNldFJlY29yZF9hZnRlcl9pZl9lbHNlQDM1CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjYwNAogICAgLy8gdGhpcy5yZWNvcmRzKGlkKS5yZXNpemUoUmVjb3JkSGVhZGVyQnl0ZXMgKyBzaXplKQogICAgcHVzaGludCAxMgogICAgZGlnIDEwCiAgICBkdXAKICAgIGNvdmVyIDIKICAgICsKICAgIGRpZyAxNQogICAgZHVwCiAgICBjb3ZlciAzCiAgICBzd2FwCiAgICBib3hfcmVzaXplCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjYwNwogICAgLy8gdGhpcy5yZWNvcmRzKGlkKS5yZXBsYWNlKFJlY29yZEhlYWRlckJ5dGVzIC0gMiwgbmV3IFVpbnQxNihzaXplKS5ieXRlcykKICAgIGl0b2IKICAgIGR1cAogICAgYml0bGVuCiAgICBwdXNoaW50IDE2CiAgICA8PQogICAgYXNzZXJ0IC8vIG92ZXJmbG93CiAgICBleHRyYWN0IDYgMgogICAgcHVzaGludCAxMAogICAgc3dhcAogICAgYm94X3JlcGxhY2UKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NjA4CiAgICAvLyBpZiAoZGF0YTIubGVuZ3RoID4gMCkgdGhpcy5yZWNvcmRzKGlkKS5zcGxpY2UoUmVjb3JkSGVhZGVyQnl0ZXMsIDAsIGRhdGEyKQogICAgZGlnIDYKICAgIGJ6IHNldFJlY29yZF9hZnRlcl9pZl9lbHNlQDMwCiAgICBkaWcgMTMKICAgIHB1c2hpbnQgMTIKICAgIGludGNfMCAvLyAwCiAgICBkaWcgNQogICAgYm94X3NwbGljZQoKc2V0UmVjb3JkX2FmdGVyX2lmX2Vsc2VAMzA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjYwOQogICAgLy8gaWYgKGRhdGExLmxlbmd0aCA+IDApIHRoaXMucmVjb3JkcyhpZCkuc3BsaWNlKFJlY29yZEhlYWRlckJ5dGVzLCAwLCBkYXRhMSkKICAgIGRpZyA3CiAgICBieiBzZXRSZWNvcmRfYWZ0ZXJfaWZfZWxzZUAzMgogICAgZGlnIDEzCiAgICBwdXNoaW50IDEyCiAgICBpbnRjXzAgLy8gMAogICAgZGlnIDYKICAgIGJveF9zcGxpY2UKCnNldFJlY29yZF9hZnRlcl9pZl9lbHNlQDMyOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2MTAKICAgIC8vIGlmIChkYXRhMC5sZW5ndGggPiAwKSB0aGlzLnJlY29yZHMoaWQpLnNwbGljZShSZWNvcmRIZWFkZXJCeXRlcywgMCwgZGF0YTApCiAgICBkaWcgMQogICAgYnogc2V0UmVjb3JkX2FmdGVyX2lmX2Vsc2VAMzUKICAgIGRpZyAxMwogICAgcHVzaGludCAxMgogICAgaW50Y18wIC8vIDAKICAgIGRpZyA3CiAgICBib3hfc3BsaWNlCgpzZXRSZWNvcmRfYWZ0ZXJfaWZfZWxzZUAzNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NjEyCiAgICAvLyB0aGlzLnJlZnVuZFJlY29yZCh0aGlzLnJlY29yZHMoaWQpLmtleSwgcHJldmlvdXNDb3N0ID4gbmV4dENvc3QgPyBwcmV2aW91c0Nvc3QgLSBuZXh0Q29zdCA6IDApCiAgICBkaWcgMTEKICAgIGRpZyAxCiAgICA+CiAgICBieiBzZXRSZWNvcmRfdGVybmFyeV9mYWxzZUAzNwogICAgZGlnIDExCiAgICBzd2FwCiAgICAtCiAgICBidXJ5IDEyCgpzZXRSZWNvcmRfdGVybmFyeV9tZXJnZUAzODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTcyCiAgICAvLyBpZiAoYW1vdW50ID09PSAwKSByZXR1cm4KICAgIGRpZyAxMQogICAgYnogc2V0UmVjb3JkX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZWZ1bmRSZWNvcmRANDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTczCiAgICAvLyBjb25zdCBwYXllciA9IHBheWVyT2YoYm94LCBUeG4uc2VuZGVyKQogICAgZGlnIDEyCiAgICB0eG4gU2VuZGVyCiAgICBjYWxsc3ViIHBheWVyT2YKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxNzUKICAgIC8vIGl0eG4ucGF5bWVudCh7IHJlY2VpdmVyOiBjYW5SZWNlaXZlQWxnbyhwYXllciwgYW1vdW50KSA/IHBheWVyIDogVHhuLnNlbmRlciwgYW1vdW50LCBmZWU6IDAgfSkuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIGRpZyAxMwogICAgY2FsbHN1YiBjYW5SZWNlaXZlQWxnbwogICAgYnogc2V0UmVjb3JkX3Rlcm5hcnlfZmFsc2VANDMKCnNldFJlY29yZF90ZXJuYXJ5X21lcmdlQDQ0OgogICAgZGlnIDEyCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxNzUKICAgIC8vIGl0eG4ucGF5bWVudCh7IHJlY2VpdmVyOiBjYW5SZWNlaXZlQWxnbyhwYXllciwgYW1vdW50KSA/IHBheWVyIDogVHhuLnNlbmRlciwgYW1vdW50LCBmZWU6IDAgfSkuc3VibWl0KCkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CgpzZXRSZWNvcmRfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnJlZnVuZFJlY29yZEA0NToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTc2LTU4MAogICAgLy8gc2V0UmVjb3JkKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGtleTogYnl0ZXMsCiAgICAvLyAgIGRhdGEwOiBieXRlcywgZGF0YTE6IGJ5dGVzLCBkYXRhMjogYnl0ZXMsIGRhdGEzOiBieXRlcywKICAgIC8vICAgZXhwZWN0ZWRSZXZpc2lvbjogdWludDY0LAogICAgLy8gKTogdWludDY0IHsKICAgIGRpZyA5CiAgICBpdG9iCiAgICBieXRlY18wIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpzZXRSZWNvcmRfdGVybmFyeV9mYWxzZUA0MzoKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxNzUKICAgIC8vIGl0eG4ucGF5bWVudCh7IHJlY2VpdmVyOiBjYW5SZWNlaXZlQWxnbyhwYXllciwgYW1vdW50KSA/IHBheWVyIDogVHhuLnNlbmRlciwgYW1vdW50LCBmZWU6IDAgfSkuc3VibWl0KCkKICAgIHR4biBTZW5kZXIKICAgIGIgc2V0UmVjb3JkX3Rlcm5hcnlfbWVyZ2VANDQKCnNldFJlY29yZF90ZXJuYXJ5X2ZhbHNlQDM3OgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjYxMgogICAgLy8gdGhpcy5yZWZ1bmRSZWNvcmQodGhpcy5yZWNvcmRzKGlkKS5rZXksIHByZXZpb3VzQ29zdCA+IG5leHRDb3N0ID8gcHJldmlvdXNDb3N0IC0gbmV4dENvc3QgOiAwKQogICAgaW50Y18wIC8vIDAKICAgIGJ1cnkgMTIKICAgIGIgc2V0UmVjb3JkX3Rlcm5hcnlfbWVyZ2VAMzgKCnNldFJlY29yZF9ib29sX2ZhbHNlQDUyOgogICAgaW50Y18wIC8vIDAKICAgIGIgc2V0UmVjb3JkX2Jvb2xfbWVyZ2VANTMKCnNldFJlY29yZF9lbHNlX2JvZHlAMjA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjU5NwogICAgLy8gfSBlbHNlIGlmIChkdWUgPiAwKSB7CiAgICBkdXAKICAgIGJ6IHNldFJlY29yZF9hZnRlcl9pZl9lbHNlQDI1CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjU5OAogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuc2VuZGVyID09PSBwYXllck9mKHRoaXMucmVjb3JkcyhpZCkua2V5LCBUeG4uc2VuZGVyKSwgZXJyUGF5ZXJPbmx5KQogICAgZGlnIDkKICAgIGd0eG5zIFNlbmRlcgogICAgZGlnIDE4CiAgICB0eG4gU2VuZGVyCiAgICBjYWxsc3ViIHBheWVyT2YKICAgID09CiAgICBibnogc2V0UmVjb3JkX2FmdGVyX2lmX2Vsc2VAMjUKICAgIHB1c2hieXRlcyAiRVJSOmVycklweXIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXB5cgoKc2V0UmVjb3JkX3Rlcm5hcnlfZmFsc2VAMTc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjU5MQogICAgLy8gY29uc3QgZHVlOiB1aW50NjQgPSBuZXh0Q29zdCA+IHByZXZpb3VzQ29zdCA/IG5leHRDb3N0IC0gcHJldmlvdXNDb3N0IDogMAogICAgaW50Y18wIC8vIDAKICAgIGIgc2V0UmVjb3JkX3Rlcm5hcnlfbWVyZ2VAMTgKCnNldFJlY29yZF9ib29sX2ZhbHNlQDY6CiAgICBpbnRjXzAgLy8gMAogICAgYiBzZXRSZWNvcmRfYm9vbF9tZXJnZUA3CgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZW1vdmVSZWNvcmRbcm91dGluZ10oKSAtPiB2b2lkOgpyZW1vdmVSZWNvcmQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjYxNgogICAgLy8gcmVtb3ZlUmVjb3JkKGtleTogYnl0ZXMsIGV4cGVjdGVkUmV2aXNpb246IHVpbnQ2NCk6IHVpbnQ2NCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZW1vdmVSZWNvcmQKICAgIGl0b2IKICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6QWtpdGFCYXNlRmVlR2VuZXJhdG9yQ29udHJhY3RXaXRob3V0QWtpdGFPcHRJbi51cGRhdGVBa2l0YURBT0VzY3Jvd1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZUFraXRhREFPRXNjcm93OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTAKICAgIC8vIHVwZGF0ZUFraXRhREFPRXNjcm93KGNvbmZpZzogRXNjcm93Q29uZmlnKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXBuIDIKICAgIGxlbgogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBwdXNoaW50IDEwCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDAgb2YgKChsZW4rdXRmOFtdKSx1aW50NjQpCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGRpZyAyCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAxMgogICAgKwogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkVzY3Jvd0NvbmZpZwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTEKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjIDQgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWMgMTMgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUxCiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIGVyck5vdEFraXRhRGFvKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGJueiB1cGRhdGVBa2l0YURBT0VzY3Jvd19hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMTQgLy8gIkVSUjplcnJOZGFvIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5kYW8KCnVwZGF0ZUFraXRhREFPRXNjcm93X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgNiAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTIKICAgIC8vIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgPSBjbG9uZShjb25maWcpCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTAKICAgIC8vIHVwZGF0ZUFraXRhREFPRXNjcm93KGNvbmZpZzogRXNjcm93Q29uZmlnKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjpVcGdyYWRlYWJsZUFraXRhQmFzZUNvbnRyYWN0LnVwZGF0ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozNQogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM3CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIGVyck5vdEFraXRhRGFvKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlYyA0IC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjIDEzIC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzcKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IHVwZGF0ZV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMTQgLy8gIkVSUjplcnJOZGFvIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5kYW8KCnVwZGF0ZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozOAogICAgLy8gY29uc3QgW3BsdWdpbnNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXModGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNQbHVnaW5BcHBMaXN0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlYyA0IC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzgKICAgIC8vIGNvbnN0IFtwbHVnaW5zXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzUGx1Z2luQXBwTGlzdCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgcHVzaGJ5dGVzICJwYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzkKICAgIC8vIGNvbnN0IHVwZGF0ZVBsdWdpbiA9IGRlY29kZUFyYzQ8UGx1Z2luQXBwTGlzdD4ocGx1Z2lucykudXBkYXRlCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjQwCiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uSWQgPT09IHVwZGF0ZVBsdWdpbiwgZXJySW52YWxpZFVwZ3JhZGUpCiAgICBnbG9iYWwgQ2FsbGVyQXBwbGljYXRpb25JRAogICAgPT0KICAgIGJueiB1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOmVyckl1cGciCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXVwZwoKdXBkYXRlX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE0CiAgICAvLyB2ZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogR2xvYmFsU3RhdGVLZXlWZXJzaW9uIH0pCiAgICBieXRlYyAxNSAvLyAidmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czo0MQogICAgLy8gdGhpcy52ZXJzaW9uLnZhbHVlID0gbmV3VmVyc2lvbgogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozNQogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjpBa2l0YUJhc2VDb250cmFjdC51cGRhdGVBa2l0YURBT1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZUFraXRhREFPOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjI1CiAgICAvLyB1cGRhdGVBa2l0YURBTyhha2l0YURBTzogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MjYKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjIDQgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWMgMTMgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNgogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogdXBkYXRlQWtpdGFEQU9fYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDE0IC8vICJFUlI6ZXJyTmRhbyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOZGFvCgp1cGRhdGVBa2l0YURBT19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjIDQgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNwogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSA9IGFraXRhREFPCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjI1CiAgICAvLyB1cGRhdGVBa2l0YURBTyhha2l0YURBTzogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnJlY29yZEtleShhY2NvdW50OiBieXRlcywga2V5OiBieXRlcykgLT4gYnl0ZXM6CnJlY29yZEtleToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTUyCiAgICAvLyBwcml2YXRlIHJlY29yZEtleShhY2NvdW50OiBBY2NvdW50LCBrZXk6IGJ5dGVzKTogYnl0ZXMgewogICAgcHJvdG8gMiAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjE1MwogICAgLy8gbG9nZ2VkQXNzZXJ0KGtleS5sZW5ndGggPiAwICYmIGtleS5sZW5ndGggPD0gTWF4UmVjb3JkS2V5Qnl0ZXMsIGVyckludmFsaWRLZXkpCiAgICBmcmFtZV9kaWcgLTEKICAgIGxlbgogICAgZHVwCiAgICBieiByZWNvcmRLZXlfYm9vbF9mYWxzZUAzCiAgICBmcmFtZV9kaWcgMAogICAgcHVzaGludCAzMQogICAgPD0KICAgIGJ6IHJlY29yZEtleV9ib29sX2ZhbHNlQDMKICAgIGludGNfMSAvLyAxCgpyZWNvcmRLZXlfYm9vbF9tZXJnZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxNTMKICAgIC8vIGxvZ2dlZEFzc2VydChrZXkubGVuZ3RoID4gMCAmJiBrZXkubGVuZ3RoIDw9IE1heFJlY29yZEtleUJ5dGVzLCBlcnJJbnZhbGlkS2V5KQogICAgYm56IHJlY29yZEtleV9hZnRlcl9hc3NlcnRANgogICAgYnl0ZWMgMTggLy8gIkVSUjplcnJNa2V5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck1rZXkKCnJlY29yZEtleV9hZnRlcl9hc3NlcnRANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTU0CiAgICAvLyByZXR1cm4gYWNjb3VudC5ieXRlcy5jb25jYXQoa2V5KQogICAgZnJhbWVfZGlnIC0yCiAgICBmcmFtZV9kaWcgLTEKICAgIGNvbmNhdAogICAgc3dhcAogICAgcmV0c3ViCgpyZWNvcmRLZXlfYm9vbF9mYWxzZUAzOgogICAgaW50Y18wIC8vIDAKICAgIGIgcmVjb3JkS2V5X2Jvb2xfbWVyZ2VANAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEuZGF0YUtleShuYW1lOiBieXRlcywga2V5OiBieXRlcykgLT4gYnl0ZXM6CmRhdGFLZXk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjE1OAogICAgLy8gcHJpdmF0ZSBkYXRhS2V5KG5hbWU6IHN0cmluZywga2V5OiBzdHJpbmcpOiBieXRlcyB7CiAgICBwcm90byAyIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTU5CiAgICAvLyBsb2dnZWRBc3NlcnQoQnl0ZXMobmFtZSkubGVuZ3RoICsgQnl0ZXMoa2V5KS5sZW5ndGggPCBNYXhSZWNvcmRLZXlCeXRlcywgZXJyS2V5VG9vTG9uZykKICAgIGZyYW1lX2RpZyAtMgogICAgbGVuCiAgICBkdXAKICAgIGZyYW1lX2RpZyAtMQogICAgbGVuCiAgICArCiAgICBwdXNoaW50IDMxCiAgICA8CiAgICBibnogZGF0YUtleV9hZnRlcl9hc3NlcnRAMgogICAgYnl0ZWMgMTEgLy8gIkVSUjplcnJLdGwiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyS3RsCgpkYXRhS2V5X2FmdGVyX2Fzc2VydEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxNjAKICAgIC8vIHJldHVybiBuZXcgVWludDgoQnl0ZXMobmFtZSkubGVuZ3RoKS5ieXRlcy5jb25jYXQoQnl0ZXMobmFtZSkpLmNvbmNhdChCeXRlcyhrZXkpKQogICAgaXRvYgogICAgZHVwCiAgICBiaXRsZW4KICAgIHB1c2hpbnQgOAogICAgPD0KICAgIGFzc2VydCAvLyBvdmVyZmxvdwogICAgZXh0cmFjdCA3IDEKICAgIGZyYW1lX2RpZyAtMgogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgLTEKICAgIGNvbmNhdAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZWNvcmRTdG9yYWdlQ29zdChrZXk6IGJ5dGVzLCBzaXplOiB1aW50NjQpIC0+IHVpbnQ2NDoKcmVjb3JkU3RvcmFnZUNvc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjE2MwogICAgLy8gcHJpdmF0ZSByZWNvcmRTdG9yYWdlQ29zdChrZXk6IGJ5dGVzLCBzaXplOiB1aW50NjQpOiB1aW50NjQgewogICAgcHJvdG8gMiAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjE2NAogICAgLy8gcmV0dXJuIDI1MDAgKyA0MDAgKiAoMzMgKyBrZXkubGVuZ3RoICsgUmVjb3JkSGVhZGVyQnl0ZXMgKyBzaXplKQogICAgZnJhbWVfZGlnIC0yCiAgICBsZW4KICAgIHB1c2hpbnQgNDUKICAgICsKICAgIGZyYW1lX2RpZyAtMQogICAgKwogICAgaW50YyA1IC8vIDQwMAogICAgKgogICAgcHVzaGludCAyNTAwCiAgICArCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnJlbGVhc2VSZWNvcmQoYm94OiBieXRlcywgYW1vdW50OiB1aW50NjQpIC0+IHZvaWQ6CnJlbGVhc2VSZWNvcmQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjE3OQogICAgLy8gcHJpdmF0ZSByZWxlYXNlUmVjb3JkKGJveDogYnl0ZXMsIGFtb3VudDogdWludDY0KTogdm9pZCB7CiAgICBwcm90byAyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTgwCiAgICAvLyBjb25zdCBbcmVjZWl2ZXIsIHRvdGFsXSA9IHJlbGVhc2VEZXBvc2l0KGJveCwgVHhuLnNlbmRlciwgYW1vdW50KQogICAgZnJhbWVfZGlnIC0yCiAgICB0eG4gU2VuZGVyCiAgICBmcmFtZV9kaWcgLTEKICAgIGNhbGxzdWIgcmVsZWFzZURlcG9zaXQKICAgIGR1cAogICAgZXh0cmFjdCAwIDMyCiAgICBzd2FwCiAgICBpbnRjXzMgLy8gMzIKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTgxCiAgICAvLyBpZiAodG90YWwgPiAwKSBpdHhuLnBheW1lbnQoeyByZWNlaXZlciwgYW1vdW50OiB0b3RhbCwgZmVlOiAwIH0pLnN1Ym1pdCgpCiAgICBieiByZWxlYXNlUmVjb3JkX2FmdGVyX2lmX2Vsc2VAMwogICAgaXR4bl9iZWdpbgogICAgZnJhbWVfZGlnIDEKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBmcmFtZV9kaWcgMAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKCnJlbGVhc2VSZWNvcmRfYWZ0ZXJfaWZfZWxzZUAzOgogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5jdXJyZW50UmVjb3JkUmV2aXNpb24oaWQ6IGJ5dGVzKSAtPiB1aW50NjQ6CmN1cnJlbnRSZWNvcmRSZXZpc2lvbjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTk1CiAgICAvLyBwcml2YXRlIGN1cnJlbnRSZWNvcmRSZXZpc2lvbihpZDogYnl0ZXMpOiB1aW50NjQgewogICAgcHJvdG8gMSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjEzNAogICAgLy8gcmVjb3JkcyA9IEJveE1hcDxieXRlcywgTWV0YVJlY29yZFZhbHVlPih7IGtleVByZWZpeDogUmVjb3JkUHJlZml4IH0pCiAgICBieXRlY18yIC8vICJtIgogICAgZnJhbWVfZGlnIC0xCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxOTYKICAgIC8vIHJldHVybiB0aGlzLnJlY29yZHMoaWQpLmV4aXN0cyA/IHRoaXMucmVjb3JkcyhpZCkudmFsdWUucmV2aXNpb24gOiAwCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGN1cnJlbnRSZWNvcmRSZXZpc2lvbl90ZXJuYXJ5X2ZhbHNlQDIKICAgIGludGNfMCAvLyAwCiAgICBwdXNoaW50IDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICByZXRzdWIKCmN1cnJlbnRSZWNvcmRSZXZpc2lvbl90ZXJuYXJ5X2ZhbHNlQDI6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTk2CiAgICAvLyByZXR1cm4gdGhpcy5yZWNvcmRzKGlkKS5leGlzdHMgPyB0aGlzLnJlY29yZHMoaWQpLnZhbHVlLnJldmlzaW9uIDogMAogICAgaW50Y18wIC8vIDAKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEud3JpdGVSZWNvcmQoa2V5OiBieXRlcywgZGF0YTogYnl0ZXMpIC0+IHVpbnQ2NDoKd3JpdGVSZWNvcmQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjE5OQogICAgLy8gcHJpdmF0ZSB3cml0ZVJlY29yZChrZXk6IGJ5dGVzLCBkYXRhOiBieXRlcyk6IHVpbnQ2NCB7CiAgICBwcm90byAyIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MjAwCiAgICAvLyBjb25zdCBpZCA9IHRoaXMucmVjb3JkS2V5KFR4bi5zZW5kZXIsIGtleSkKICAgIHR4biBTZW5kZXIKICAgIGZyYW1lX2RpZyAtMgogICAgY2FsbHN1YiByZWNvcmRLZXkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MjAxCiAgICAvLyBjb25zdCByZXZpc2lvbjogdWludDY0ID0gdGhpcy5jdXJyZW50UmVjb3JkUmV2aXNpb24oaWQpICsgMQogICAgZHVwCiAgICBjYWxsc3ViIGN1cnJlbnRSZWNvcmRSZXZpc2lvbgogICAgaW50Y18xIC8vIDEKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MjAyCiAgICAvLyB0aGlzLnJlY29yZHMoaWQpLnZhbHVlID0geyByZXZpc2lvbiwgZGF0YSB9CiAgICBkdXAKICAgIGl0b2IKICAgIGZyYW1lX2RpZyAtMQogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgZnJhbWVfZGlnIC0xCiAgICBjb25jYXQKICAgIHN3YXAKICAgIHB1c2hieXRlcyAweDAwMGEKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjEzNAogICAgLy8gcmVjb3JkcyA9IEJveE1hcDxieXRlcywgTWV0YVJlY29yZFZhbHVlPih7IGtleVByZWZpeDogUmVjb3JkUHJlZml4IH0pCiAgICBieXRlY18yIC8vICJtIgogICAgdW5jb3ZlciAzCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MjAyCiAgICAvLyB0aGlzLnJlY29yZHMoaWQpLnZhbHVlID0geyByZXZpc2lvbiwgZGF0YSB9CiAgICBkdXAKICAgIGJveF9kZWwKICAgIHBvcAogICAgc3dhcAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyMDMKICAgIC8vIHJldHVybiByZXZpc2lvbgogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS52ZXJpZnkoYWRkcmVzczogYnl0ZXMsIG5hbWU6IGJ5dGVzLCBsZWFmOiBieXRlcywgcHJvb2Y6IGJ5dGVzLCB0eXBlOiB1aW50NjQpIC0+IHVpbnQ2NCwgYnl0ZXM6CnNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEudmVyaWZ5OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czozNDMKICAgIC8vIHZlcmlmeShhZGRyZXNzOiBBY2NvdW50LCBuYW1lOiBzdHJpbmcsIGxlYWY6IExlYWYsIHByb29mOiBQcm9vZiwgdHlwZTogdWludDY0KTogYm9vbGVhbiB7CiAgICBwcm90byA1IDIKICAgIGJ5dGVjXzEgLy8gIiIKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czozNDQKICAgIC8vIGNvbnN0IHJvb3RLZXkgPSB0aGlzLnJlY29yZEtleShhZGRyZXNzLCBCeXRlcyhuYW1lKSkKICAgIGZyYW1lX2RpZyAtNQogICAgZnJhbWVfZGlnIC00CiAgICBjYWxsc3ViIHJlY29yZEtleQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxMzIKICAgIC8vIHJvb3RzID0gQm94TWFwPGJ5dGVzLCBSb290VmFsdWU+KHsga2V5UHJlZml4OiBNZXRhQm94UHJlZml4Um9vdHMgfSkKICAgIGJ5dGVjIDUgLy8gInIiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czozNDUKICAgIC8vIGlmICghdGhpcy5yb290cyhyb290S2V5KS5leGlzdHMpIHJldHVybiBmYWxzZQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS52ZXJpZnlfYWZ0ZXJfaWZfZWxzZUAyCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfZGlnIC0yCiAgICBmcmFtZV9idXJ5IDEKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnZlcmlmeV9hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjM0NgogICAgLy8gY29uc3QgdHJlZVR5cGUgPSB0aGlzLnJvb3RzKHJvb3RLZXkpLnZhbHVlLnR5cGUKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGludGNfMyAvLyAzMgogICAgZXh0cmFjdF91aW50NjQKICAgIGZyYW1lX2J1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czozNDcKICAgIC8vIGlmICh0eXBlICE9PSBNZXJrbGVUcmVlVHlwZVVuc3BlY2lmaWVkICYmIHRyZWVUeXBlICE9PSB0eXBlKSByZXR1cm4gZmFsc2UKICAgIGZyYW1lX2RpZyAtMQogICAgYnogc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS52ZXJpZnlfYWZ0ZXJfaWZfZWxzZUA1CiAgICBmcmFtZV9kaWcgMQogICAgZnJhbWVfZGlnIC0xCiAgICAhPQogICAgYnogc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS52ZXJpZnlfYWZ0ZXJfaWZfZWxzZUA1CiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfZGlnIC0yCiAgICBmcmFtZV9idXJ5IDEKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnZlcmlmeV9hZnRlcl9pZl9lbHNlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjM0OQogICAgLy8gZW5zdXJlQnVkZ2V0KHByb29mLmxlbmd0aCAqIDUwKQogICAgZnJhbWVfZGlnIC0yCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgZHVwCiAgICBmcmFtZV9idXJ5IDAKICAgIHB1c2hpbnQgNTAKICAgICoKICAgIHB1c2hpbnQgMTAKICAgICsKCnNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEudmVyaWZ5X3doaWxlX3RvcEAxNDoKICAgIGR1cAogICAgZ2xvYmFsIE9wY29kZUJ1ZGdldAogICAgPgogICAgYnogc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS52ZXJpZnlfYWZ0ZXJfd2hpbGVAMTkKICAgIGl0eG5fYmVnaW4KICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBwdXNoaW50IDUgLy8gRGVsZXRlQXBwbGljYXRpb24KICAgIGl0eG5fZmllbGQgT25Db21wbGV0aW9uCiAgICBieXRlYyAyNSAvLyAweDA2ODEwMQogICAgaXR4bl9maWVsZCBBcHByb3ZhbFByb2dyYW0KICAgIGJ5dGVjIDI1IC8vIDB4MDY4MTAxCiAgICBpdHhuX2ZpZWxkIENsZWFyU3RhdGVQcm9ncmFtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBiIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEudmVyaWZ5X3doaWxlX3RvcEAxNAoKc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS52ZXJpZnlfYWZ0ZXJfd2hpbGVAMTk6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MzUyCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgcHJvb2YubGVuZ3RoOyBpICs9IDEpIHsKICAgIGludGNfMCAvLyAwCiAgICBzd2FwCiAgICBmcmFtZV9kaWcgLTMKICAgIGNvdmVyIDIKCnNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEudmVyaWZ5X3doaWxlX3RvcEA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czozNTIKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBwcm9vZi5sZW5ndGg7IGkgKz0gMSkgewogICAgZGlnIDEKICAgIGZyYW1lX2RpZyAwCiAgICA8CiAgICBieiBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnZlcmlmeV9hZnRlcl93aGlsZUA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjM1MwogICAgLy8gaGFzaCA9IHRoaXMuaGFzaChwcm9vZltpXSwgaGFzaCkKICAgIGZyYW1lX2RpZyAtMgogICAgZXh0cmFjdCAyIDAKICAgIGRpZyAyCiAgICBpbnRjXzMgLy8gMzIKICAgICoKICAgIGludGNfMyAvLyAzMgogICAgZXh0cmFjdDMgLy8gb24gZXJyb3I6IGluZGV4IGFjY2VzcyBpcyBvdXQgb2YgYm91bmRzCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTQ1CiAgICAvLyBpZiAoQmlnVWludChhKSA+IEJpZ1VpbnQoYikpIHsKICAgIGRpZyA0CiAgICBiPgogICAgYnogc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS52ZXJpZnlfYWZ0ZXJfaWZfZWxzZUAxMQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxNDYKICAgIC8vIHJldHVybiBzaGEyNTYoYi5jb25jYXQoYSkpCiAgICB1bmNvdmVyIDMKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc2hhMjU2CiAgICBjb3ZlciAyCgpzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnZlcmlmeV9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEuaGFzaEAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MzUyCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgcHJvb2YubGVuZ3RoOyBpICs9IDEpIHsKICAgIHN3YXAKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBzd2FwCiAgICBiIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEudmVyaWZ5X3doaWxlX3RvcEA2CgpzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnZlcmlmeV9hZnRlcl9pZl9lbHNlQDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxNDgKICAgIC8vIHJldHVybiBzaGEyNTYoYS5jb25jYXQoYikpCiAgICB1bmNvdmVyIDMKICAgIGNvbmNhdAogICAgc2hhMjU2CiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjM1MwogICAgLy8gaGFzaCA9IHRoaXMuaGFzaChwcm9vZltpXSwgaGFzaCkKICAgIGIgc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS52ZXJpZnlfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLmhhc2hAMTIKCnNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEudmVyaWZ5X2FmdGVyX3doaWxlQDg6CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MzU2CiAgICAvLyByZXR1cm4gaGFzaCA9PT0gdGhpcy5yb290cyhyb290S2V5KS52YWx1ZS5yb290CiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZXh0cmFjdCAwIDMyCiAgICA9PQogICAgZnJhbWVfZGlnIC0yCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMwogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZWFkKGFkZHJlc3M6IGJ5dGVzLCBuYW1lOiBieXRlcywga2V5OiBieXRlcykgLT4gYnl0ZXM6CnNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEucmVhZDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MzY3LTM2OAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICAvLyByZWFkKGFkZHJlc3M6IEFjY291bnQsIG5hbWU6IHN0cmluZywga2V5OiBzdHJpbmcpOiBzdHJpbmcgewogICAgcHJvdG8gMyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjM2OQogICAgLy8gaWYgKGtleSA9PT0gdHJlZVR5cGVLZXkpIHJldHVybiBTdHJpbmcoaXRvYih0aGlzLnJvb3RzKHRoaXMucmVjb3JkS2V5KGFkZHJlc3MsIEJ5dGVzKG5hbWUpKSkudmFsdWUudHlwZSkpCiAgICBmcmFtZV9kaWcgLTEKICAgIHB1c2hieXRlcyAibC50eXBlIgogICAgPT0KICAgIGJ6IHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEucmVhZF9hZnRlcl9pZl9lbHNlQDIKICAgIGZyYW1lX2RpZyAtMwogICAgZnJhbWVfZGlnIC0yCiAgICBjYWxsc3ViIHJlY29yZEtleQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxMzIKICAgIC8vIHJvb3RzID0gQm94TWFwPGJ5dGVzLCBSb290VmFsdWU+KHsga2V5UHJlZml4OiBNZXRhQm94UHJlZml4Um9vdHMgfSkKICAgIGJ5dGVjIDUgLy8gInIiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MzY5CiAgICAvLyBpZiAoa2V5ID09PSB0cmVlVHlwZUtleSkgcmV0dXJuIFN0cmluZyhpdG9iKHRoaXMucm9vdHModGhpcy5yZWNvcmRLZXkoYWRkcmVzcywgQnl0ZXMobmFtZSkpKS52YWx1ZS50eXBlKSkKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBleHRyYWN0IDMyIDgKICAgIHJldHN1YgoKc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZWFkX2FmdGVyX2lmX2Vsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MzcwCiAgICAvLyBjb25zdCByZWNvcmQgPSB0aGlzLnJlYWRSZWNvcmQoYWRkcmVzcywgdGhpcy5kYXRhS2V5KG5hbWUsIGtleSkpCiAgICBmcmFtZV9kaWcgLTIKICAgIGZyYW1lX2RpZyAtMQogICAgY2FsbHN1YiBkYXRhS2V5CiAgICBmcmFtZV9kaWcgLTMKICAgIHN3YXAKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZWFkUmVjb3JkCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MzcxCiAgICAvLyBsb2dnZWRBc3NlcnQocmVjb3JkLmV4aXN0cywgZXJyTm9EYXRhKQogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgYm56IHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEucmVhZF9hZnRlcl9hc3NlcnRANAogICAgYnl0ZWMgMjIgLy8gIkVSUjplcnJOZHRhIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5kdGEKCnNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEucmVhZF9hZnRlcl9hc3NlcnRANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MzcyCiAgICAvLyByZXR1cm4gU3RyaW5nKHJlY29yZC5kYXRhKQogICAgZHVwCiAgICBwdXNoaW50IDkKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMQogICAgbGVuCiAgICBzdWJzdHJpbmczCiAgICBleHRyYWN0IDIgMAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZWNvcmRJbmZvKGFjY291bnQ6IGJ5dGVzLCBrZXk6IGJ5dGVzKSAtPiBieXRlczoKc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZWNvcmRJbmZvOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1NDAtNTQxCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIC8vIHJlY29yZEluZm8oYWNjb3VudDogQWNjb3VudCwga2V5OiBieXRlcyk6IE1ldGFSZWNvcmRJbmZvIHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1NDIKICAgIC8vIGNvbnN0IGlkID0gdGhpcy5yZWNvcmRLZXkoYWNjb3VudCwga2V5KQogICAgZnJhbWVfZGlnIC0yCiAgICBmcmFtZV9kaWcgLTEKICAgIGNhbGxzdWIgcmVjb3JkS2V5CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTM0CiAgICAvLyByZWNvcmRzID0gQm94TWFwPGJ5dGVzLCBNZXRhUmVjb3JkVmFsdWU+KHsga2V5UHJlZml4OiBSZWNvcmRQcmVmaXggfSkKICAgIGJ5dGVjXzIgLy8gIm0iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1NDMKICAgIC8vIGlmICghdGhpcy5yZWNvcmRzKGlkKS5leGlzdHMpIHJldHVybiB7IGV4aXN0czogZmFsc2UsIHJldmlzaW9uOiAwLCBzaXplOiAwIH0KICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEucmVjb3JkSW5mb19hZnRlcl9pZl9lbHNlQDIKICAgIHB1c2hieXRlcyAweDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnJlY29yZEluZm9fYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1NDQKICAgIC8vIHJldHVybiB7IGV4aXN0czogdHJ1ZSwgcmV2aXNpb246IHRoaXMuY3VycmVudFJlY29yZFJldmlzaW9uKGlkKSwgc2l6ZTogdGhpcy5yZWNvcmRzKGlkKS5sZW5ndGggLSBSZWNvcmRIZWFkZXJCeXRlcyB9CiAgICBzd2FwCiAgICBjYWxsc3ViIGN1cnJlbnRSZWNvcmRSZXZpc2lvbgogICAgc3dhcAogICAgYm94X2xlbgogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIHB1c2hpbnQgMTIKICAgIC0KICAgIHN3YXAKICAgIGl0b2IKICAgIHB1c2hieXRlcyAweDgwCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZWFkUmVjb3JkKGFjY291bnQ6IGJ5dGVzLCBrZXk6IGJ5dGVzKSAtPiBieXRlczoKc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZWFkUmVjb3JkOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1NDctNTQ4CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIC8vIHJlYWRSZWNvcmQoYWNjb3VudDogQWNjb3VudCwga2V5OiBieXRlcyk6IE1ldGFSZWNvcmRSZWFkIHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1NDkKICAgIC8vIGNvbnN0IGluZm8gPSB0aGlzLnJlY29yZEluZm8oYWNjb3VudCwga2V5KQogICAgZnJhbWVfZGlnIC0yCiAgICBmcmFtZV9kaWcgLTEKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZWNvcmRJbmZvCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTUwCiAgICAvLyBpZiAoIWluZm8uZXhpc3RzKSByZXR1cm4geyBleGlzdHM6IGZhbHNlLCByZXZpc2lvbjogMCwgZGF0YTogQnl0ZXMoJycpIH0KICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIGJueiBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnJlYWRSZWNvcmRfYWZ0ZXJfaWZfZWxzZUAyCiAgICBwdXNoYnl0ZXMgMHgwMDAwMDAwMDAwMDAwMDAwMDAwMDBiMDAwMAogICAgc3dhcAogICAgcmV0c3ViCgpzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnJlYWRSZWNvcmRfYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1NTEKICAgIC8vIGxvZ2dlZEFzc2VydChpbmZvLnNpemUgPD0gTWF4SW5saW5lUmVjb3JkQnl0ZXMsIGVyclJlY29yZFJlcXVpcmVzU2xpY2UpCiAgICBwdXNoaW50IDkKICAgIGV4dHJhY3RfdWludDY0CiAgICBpbnRjIDcgLy8gMTAyNAogICAgPD0KICAgIGJueiBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnJlYWRSZWNvcmRfYWZ0ZXJfYXNzZXJ0QDQKICAgIHB1c2hieXRlcyAiRVJSOmVyck1yc2wiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTXJzbAoKc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZWFkUmVjb3JkX2FmdGVyX2Fzc2VydEA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1NTIKICAgIC8vIGNvbnN0IHJlY29yZCA9IGNsb25lKHRoaXMucmVjb3Jkcyh0aGlzLnJlY29yZEtleShhY2NvdW50LCBrZXkpKS52YWx1ZSkKICAgIGZyYW1lX2RpZyAtMgogICAgZnJhbWVfZGlnIC0xCiAgICBjYWxsc3ViIHJlY29yZEtleQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxMzQKICAgIC8vIHJlY29yZHMgPSBCb3hNYXA8Ynl0ZXMsIE1ldGFSZWNvcmRWYWx1ZT4oeyBrZXlQcmVmaXg6IFJlY29yZFByZWZpeCB9KQogICAgYnl0ZWNfMiAvLyAibSIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1NTItNTUzCiAgICAvLyBjb25zdCByZWNvcmQgPSBjbG9uZSh0aGlzLnJlY29yZHModGhpcy5yZWNvcmRLZXkoYWNjb3VudCwga2V5KSkudmFsdWUpCiAgICAvLyByZXR1cm4geyBleGlzdHM6IHRydWUsIHJldmlzaW9uOiByZWNvcmQucmV2aXNpb24sIGRhdGE6IHJlY29yZC5kYXRhIH0KICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIHB1c2hpbnQgOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTUzCiAgICAvLyByZXR1cm4geyBleGlzdHM6IHRydWUsIHJldmlzaW9uOiByZWNvcmQucmV2aXNpb24sIGRhdGE6IHJlY29yZC5kYXRhIH0KICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTUyLTU1MwogICAgLy8gY29uc3QgcmVjb3JkID0gY2xvbmUodGhpcy5yZWNvcmRzKHRoaXMucmVjb3JkS2V5KGFjY291bnQsIGtleSkpLnZhbHVlKQogICAgLy8gcmV0dXJuIHsgZXhpc3RzOiB0cnVlLCByZXZpc2lvbjogcmVjb3JkLnJldmlzaW9uLCBkYXRhOiByZWNvcmQuZGF0YSB9CiAgICBkaWcgMQogICAgcHVzaGludCAxMAogICAgaW50Y18yIC8vIDIKICAgIGJveF9leHRyYWN0CiAgICBidG9pCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgdW5jb3ZlciAyCiAgICBwdXNoaW50IDEwCiAgICB1bmNvdmVyIDIKICAgIGJveF9leHRyYWN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjU1MwogICAgLy8gcmV0dXJuIHsgZXhpc3RzOiB0cnVlLCByZXZpc2lvbjogcmVjb3JkLnJldmlzaW9uLCBkYXRhOiByZWNvcmQuZGF0YSB9CiAgICBleHRyYWN0IDIgMAogICAgc3dhcAogICAgaXRvYgogICAgcHVzaGJ5dGVzIDB4ODAKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICBzd2FwCiAgICBwdXNoYnl0ZXMgMHgwMDBiCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZW1vdmVSZWNvcmQoa2V5OiBieXRlcywgZXhwZWN0ZWRSZXZpc2lvbjogdWludDY0KSAtPiB1aW50NjQ6CnNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEucmVtb3ZlUmVjb3JkOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2MTYKICAgIC8vIHJlbW92ZVJlY29yZChrZXk6IGJ5dGVzLCBleHBlY3RlZFJldmlzaW9uOiB1aW50NjQpOiB1aW50NjQgewogICAgcHJvdG8gMiAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjYxNwogICAgLy8gY29uc3QgaWQgPSB0aGlzLnJlY29yZEtleShUeG4uc2VuZGVyLCBrZXkpCiAgICB0eG4gU2VuZGVyCiAgICBmcmFtZV9kaWcgLTIKICAgIGNhbGxzdWIgcmVjb3JkS2V5CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTM0CiAgICAvLyByZWNvcmRzID0gQm94TWFwPGJ5dGVzLCBNZXRhUmVjb3JkVmFsdWU+KHsga2V5UHJlZml4OiBSZWNvcmRQcmVmaXggfSkKICAgIGJ5dGVjXzIgLy8gIm0iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2MTgKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnJlY29yZHMoaWQpLmV4aXN0cywgZXJyUmVjb3JkTm90Rm91bmQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnJlbW92ZVJlY29yZF9hZnRlcl9hc3NlcnRAMgogICAgYnl0ZWMgMjMgLy8gIkVSUjplcnJNcm5mIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck1ybmYKCnNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEucmVtb3ZlUmVjb3JkX2FmdGVyX2Fzc2VydEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2MTkKICAgIC8vIGxvZ2dlZEFzc2VydChleHBlY3RlZFJldmlzaW9uID09PSB0aGlzLmN1cnJlbnRSZWNvcmRSZXZpc2lvbihpZCksIGVyclJlY29yZFJldmlzaW9uTWlzbWF0Y2gpCiAgICBzd2FwCiAgICBjYWxsc3ViIGN1cnJlbnRSZWNvcmRSZXZpc2lvbgogICAgZnJhbWVfZGlnIC0xCiAgICA9PQogICAgYm56IHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEucmVtb3ZlUmVjb3JkX2FmdGVyX2Fzc2VydEA0CiAgICBieXRlYyAxMiAvLyAiRVJSOmVyck1yZXYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTXJldgoKc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZW1vdmVSZWNvcmRfYWZ0ZXJfYXNzZXJ0QDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjYyMAogICAgLy8gY29uc3QgcmVmdW5kID0gdGhpcy5yZWNvcmRTdG9yYWdlQ29zdChrZXksIHRoaXMucmVjb3JkcyhpZCkubGVuZ3RoIC0gUmVjb3JkSGVhZGVyQnl0ZXMpCiAgICBkdXAKICAgIGJveF9sZW4KICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBwdXNoaW50IDEyCiAgICAtCiAgICBmcmFtZV9kaWcgLTIKICAgIHN3YXAKICAgIGNhbGxzdWIgcmVjb3JkU3RvcmFnZUNvc3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NjIxCiAgICAvLyB0aGlzLnJlY29yZHMoaWQpLmRlbGV0ZSgpCiAgICBkaWcgMQogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjYyMgogICAgLy8gdGhpcy5yZWxlYXNlUmVjb3JkKHRoaXMucmVjb3JkcyhpZCkua2V5LCByZWZ1bmQpCiAgICBjYWxsc3ViIHJlbGVhc2VSZWNvcmQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NjIzCiAgICAvLyByZXR1cm4gMAogICAgaW50Y18wIC8vIDAKICAgIHJldHN1Ygo=", "clear": "I3ByYWdtYSB2ZXJzaW9uIDEzCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCiNwcmFnbWEgYXV0b3NhbHQgZmFsc2UKCi8vIEBhbGdvcmFuZGZvdW5kYXRpb24vYWxnb3JhbmQtdHlwZXNjcmlwdC9iYXNlLWNvbnRyYWN0LmQudHM6OkJhc2VDb250cmFjdC5jbGVhclN0YXRlUHJvZ3JhbSgpIC0+IHVpbnQ2NDoKbWFpbjoKICAgIHB1c2hpbnQgMQogICAgcmV0dXJuCg==" }, "byteCode": { "approval": "DSALAAECINTeAZAD1PcBgAj+H4DC1y+AgAEmGgQVH3x1AAFtCXR5cGVfZmVlcwlha2l0YV9kYW8Bcgxha2l0YV9lc2Nyb3cIdHlwZXNfaWQBJAtFUlI6ZXJySXBtcgtFUlI6ZXJySXBtYQpFUlI6ZXJyS3RsC0VSUjplcnJNcmV2BndhbGxldAtFUlI6ZXJyTmRhbwd2ZXJzaW9uC0VSUjplcnJNbmFtC0VSUjplcnJObmFtC0VSUjplcnJNa2V5CkVSUjplcnJEdGwCbC4KRVJSOmVyclJrcAtFUlI6ZXJyTmR0YQtFUlI6ZXJyTXJuZgtFUlI6ZXJyTXZzegMGgQExGEAOJwciZysiZ4AE6pGA3TYaAI4BALsxGRREMRhByAKCFgSFTe3gBKJMBnwE3yh6fQTG09cEBEL8cgIEBtOJBAQr88xaBFDDbkEEDPG5zwQf98dMBDnBfe0EoD+dnQRyslmBBHaDzSUEmkYGHQRQHT6yBFhqs04E0LYoAgSx5tT7BBfT0FsEroTL2AQz6SyUNhoAjhYAAQC1AYgBvQHxA1kDzQQXBFAEuwUwB4sIEQgvCHAIkQiyCV8J2QwqDE4M0wAjQ4AEzZrWfjYaAI4BAH0AMRmBBBIxGBBEQtAxigMAi/6L/xNBFIv9AScITFCL/r+JigIBi/4BJwhMUL5BAolIi/+JigIBi/5zAEUBQA6L/zIBD0EEI4kiiYoDAYv9AScITFBJvkAUi/8Wi/5MUIwAiUy8SIv/IQQISUsCTIhzQQpMTBZQiUUBi/5CDzYaAUkiWSQISwEVEkRXAgA2GgJJFYEIEkQXJw9PAmcnBExnI3YLI0MxFiMJSTgQIxJENhoBSSJZJAhLARUSRFcCAEk2GgJJTgIVJRJENhoDSRWBCBJEF0wpE0AIJxCwAEsCFUlOAoEfDkAcgApFUlI6ZXJyTnRssAAWSYABdExQvUUBQB6AC0VSUjplcnJOdHJ0sAAxAE8EiKAvJwVMUElOBL1FAUEegAtFUlI6ZXJyTnRrbrAASwQ4BzIKEkAIJwmwAE8ESTgIIQVPBAshBghPAjgASU4DMQASIQQiTwJNCBJACCcKsABOAlBPAklPAr8xAExOAojLBSNDNhoBSSJZJAhLARUSRFcCAEkxAEyIsi0nBUxQSb1FAUAIJxGwAEm8SEwVIQULIQYIiK4uI0M2GgFJIlkkCEsBFRJEVwIANhoCSU4CFSUSRDEATIi2LCcFTFBJvUUBQAgnEbAAIk8CuyNDIilJMRYjCUk4ECMSRDYaAUkiWSQISwEVEkRXAgBJNhoCSSJZJAhLARUSRFcCAE4CNhoDSSJZJAhLARUSRFcCAEwpE0AIJxCwAEsCKRNACCcSsAAxAEsCiNoqTEsDFUlFB4EPDkAIJwuwAEsCFUsGCIEfDEAIJwuwAEkVSU4FIQcOQAgnE7AASwYkDEBEIksHSU4CDyJLAk8CTSRLAg8kTwNPAk1LBU4CUicUEkDqAiNACCcVsAAnBU8CUL1FAUAegAtFUlI6ZXJyTnJmZLAATE8CiKYpTEsDOAcyChJACCcJsABPA0k4CEsDTwWIvClPAjgASU4FMQASIQQiTwJNCBJACCcKsAAxAEsCiPInMQBFByJFBipMUEm9RQFBRDEASwFJvUSBDAlLBUyIvihMTgKIjwtJVwAgTCVbTEUIRQZOAoiyKUgxAExOAoi9DEsBQSCxSwGyCEsCsgcjshAisgGzI0MiQukCNhoBSSJZJAhLARUSRFcCADYaAkkiWSQISwEVEkRXAgBJFUlOAyQMQEIiSwNJTgIPIksCTwJNJEsCDyRPA08CTUsCTgJSJxQTQU4jQAgnFbAAiNglSTEATIiIJUkqTFC9RQFACCcWsACI6iaIoC5II0MiQk02GgFJFSUSRDYaAkkiWSQISwEVEkRXAgA2GgNJFSUSRDYaBEkiWSULJAhLARUSRDYaBUkVgQgSRBeI5iZIgAEAIk8CVChMULAjQzYaAUkVJRJENhoCSSJZJAhLARUSRFcCADYaA0kiWSQISwEVEkRXAgCIvihJFRZXBgJMUChMULAjQzYaAUcCFSUSRDYaAkkiWSQISwEVEkRXAgBJTgI2GgNJFSUSRDYaBEkiWSULJAhLARUSRDYaBUkVgQgSRBc2GgZJIlkkCEsBFRJEVwIATgWItCRIQCJGAylJFRZXBgJMUChMULAjQ4jQJkIhNhoBRwIVJRJENhoCSSJZJAhLARUSRFcCAElOAjYaA0kVJRJENhoESSJZJQskCEsBFRJENhoFSRWBCBJEFzYaBkkiWSQISwEVEkRXAgBOBYjeIkhAHoALRVJSOmVyckZ2cmmwAIj+JEkVFlcGAkxQKExQsCNDKTEWIwlHAjgQIxJENhoBSSJZJAhLARUSRFcCAEw2GgJJTgRJIllJTgMkCEwVEkQ4BzIKEkAIJwmwAE8COAghCRJACCcKsABLARVJRQWBoAYOQAgnE7AAgAEoIk4CSwJLAgxBpAZLBFcCAEsDI1hJgAEKEkFESIAFdWludDhQSwFBGksBIwlLAxNBCIABLFBPAiMITgJCb0mAAQsSQRhIgAZ1aW50MTZQQlNJgAEMEkEYSIAGdWludDMyUEJ5SYABDRJBGkiABnVpbnQ2NFBCnwFJgAEOEkEcSIAHdWludDEyOFBCyQFJgAEPEkEcSIAHdWludDI1NlBC8wFJgAEQEkEcSIAHdWludDUxMlBCnQJJgAEUEkEcSIAHYnl0ZVs0XVBCxwJJgAEVEkEcSIAHYnl0ZVs4XVBC8QJJgAEWEkEeSIAIYnl0ZVsxNl1QQp0DSYABFxJBHkiACGJ5dGVbMzJdUELJA0mAARgSQR5IgAhieXRlWzY0XVBC9QNJgAEZEkEgSIAJYnl0ZVsxMjhdUEKjBEmAARoSQSBIgAlieXRlWzI1Nl1QQtEESYABGxJBIEiACWJ5dGVbNTEyXVBC/wRJgAEeEkEaSIAGc3RyaW5nUEKnBYABKBJBGoAHYWRkcmVzc1BCzQWAC0VSUjplcnJNc2NosABFAUUBIicHZURJIwgnB0xnMgpzAURPAoABKVBJFRZXBgJMUEkVgQQISwYWVwYCTwVQTBZXBgKAAgAETFBPAlBMUE8CFoABdExQSbxITL8yCnMBREwJIitlRCEJTwIJCCtMZyNDIicGZUUBQfIBIicGZUQkW0HeASNAHoALRVJSOmVyck5lc2OwADIKRwJzAERMcwFEDUGSAUlzAERMcwFECSIrZURLAQxBakgiK2VESUASSCIWKExQsCNDIitlREsBCStMZ7EiJwZlRCRbcghESwGyCLIHI7IQIrIBs0JRQl9IIkKDASJC3QE2GgFJIlkkCEsBFRJEVwIAFSEFCyEGCBYoTFCwI0M2GgFJIlkkCEsBFRJEVwIANhoCSSJZJAhLARUSRFcCADYaA0kiWSQISwEVEkRXAgBOAojqEkwViKoTFihMULAjQzYaAUkVJRJENhoCSSJZJAhLARUSRFcCAIiyGChMULAjQzYaAUkVJRJENhoCSSJZJAhLARUSRFcCAIjuGChMULAjQyk2GgFHAhUlEkQ2GgJJIlkkCEsBFRJEVwIASU4CNhoDSRWBCBJEF04CNhoESRWBCBJEF04CNhoFSRWBCBJEF04CiNwWSU4GIlNACCcXsABLBSNbEkAIJwywAEkhBw5BkgFLBIEJW0lFB0sCD0F4SwVLAglLAQ9BZCNAHoALRVJSOmVyck1ybmewAE8DTwOI6g4qTFCBDE8DCE8CukkVFlcGAkxQKExQsCNDIkJjIik2GgFJFSUSRDYaAkkiWSQISwEVEkRXAgBJTgI2GgNJFYEIEkQXSU4CgRYITBUIIQoOQAgnGLAATEsCSU4CiK4NTE8CiK4OTCJFBCpMUElFBb1FAUEeSwO9RIEMCUsCTIj2DUUDSUsDDUEUSwIJFihMULAjQ0giQhEiKUcGMRYjCUk4ECMSRDYaAUkiWSQISwEVEkRXAgBJNhoCSSJZJAhLARUSRFcCAElOAzYaA0kiWSQISwEVEkRXAgBOAzYaBEkiWSQISwEVEkRXAgBOAzYaBUkiWSQISwEVEkRXAgBOAjYaBkkVgQgSRBdOAjEATwKIyApMFUlOBSEIDkGOB0sGFSEIDkH8BksFFSEIDkHqBksCFYH0Hw5B1gYjQB6AC0VSUjplcnJNcHJ0sABLBhVJRQxLBQhLBhVJRQwISwMVSU4DCElFD4EWCEsFFQghCg5ACCcYsABJiPwKTwMSQAgnDLAAKkxQSUURvUlPAkgiRRBBHksQvUSBDAlLBEyIuglFD0sDSw2IqAlJSxANQeIESUsQCSJFDk8CQIYESwk4ADEAEiEEIk8CTUUNSwwIRRBLCDgWIwgxFhJBvgNLCDgHMgoSQaoDSwg4CEsQEkGWA0sIOAkyAxJBggNLCDggMgMSQe4CI0AegAtFUlI6ZXJyTXBtdLAATwNPA4jiCEUMSwlBGksGOAAxAEsQTgKIoS1LCk8CDUGCAYEMSwpJTgIISw9JTgNM0xZJk4EQDkRXBgKBCky7SwZBEEsNgQwiSwXSSwdBEEsNgQwiSwbSSwFBEEsNgQwiSwfSSwtLAQ1BaksLTAlFDEsLQTpLDDEAiLkuSbFLDYijLkEsSwyyCLIHI7IQIrIBs0sJFihMULAjQ0gxAEIxSCJFDEJlIkLtAklB6QNLCTgASxIxAIizLxJAhwSAC0VSUjplcnJJcHlysAAiQtsEIkLVBjYaAUkiWSQISwEVEkRXAgA2GgJJFYEIEkQXiKAMFihMULAjQzYaAUcCFUsBIllJgQoSRE8CTEsCUiJZgQwIEkQxACInBGVEJw1lSHIIRBJACCcOsAAnBkxnI0M2GgFJIlkkCEsBFRJEVwIAMQAiJwRlRCcNZUhyCEQSQAgnDrAAIicEZUSAA3BhbGVIgRBbMg0SQB6AC0VSUjplcnJJdXBnsAAnD0xnI0M2GgFJFYEIEkQXMQAiJwRlRCcNZUhyCEQSQAgnDrAAJwRMZyNDigIBi/8VSUEqiwCBHw5BHCNACCcSsACL/ov/UEyJIkIbigIBi/4VSYv/FQiBHwxACCcLsAAWSZOBCA5EVwcBi/5Qi/9QiYoCAYv+FYEtCIv/CCEFC4HEEwiJigIAi/4xAIv/iIE0SVcAIEwlW0lBILGLAbIIiwCyByOyECKyAbOJigEBKov/UEm9RQFBDCKBCLoXiUgiiYoCATEAi/6IuwJJiEEjCEkWi/8VFlcGAov/UEyAAgAKUExQKk8DUEm8SEy/iYoFAilJi/uL/IiZAycFTFBJvUUBQBAii/6MAYwAiUm+RCVbjAGL/0EeiwGL/xNBECKL/owBjACJi/4iWUmMAIEyC4EKCEkyDA1BLrGBBrIQgQWyGScZsh4nGbIfIrIBs0I1SCJMi/1OAksBiwAMQUyL/lcCAEsCJQslWElLBKVBGk8DTFABTgJMIwhMQkVPA1ABTgJCF0UBvkRXACASi/5PA08DiYoDAYv/gAZsLnR5cGUSQSKL/Yv+iPkFJwVMUL5EVyAIiYv+i/+I2QWL/UyIqAFJIlNACCcWsABJgQlZSwEVUlcCAImKAgGL/ov/iOUGSSpMUEm9RQFALIARAAAAAAAAAAAAAAAAAAAAAACMAIlMiKsFTL1EgQwJTBaAAYBMUEwWUImKAgGL/ov/iIsBSSJTQCKADQAAAAAAAAAAAAALAABMiYEJWyEHDkAegAtFUlI6ZXJyTXJzbLAAi/6L/4jLCCpMUEkigQi6F0sBgQokuhckCE8CgQpPArpXAgBMFoABgExQSwEVFlcGAk8CUEyAAgALUExQiYoCATEAi/6IywlJKkxQSb1FAUAIJxewAEyI7QeL/xJACCcMsABJvUSBDAmL/kyIjQlLAbxIiPMIIok=", "clear": "DYEBQw==" }, "events": [], "templateVariables": {} };
var MetaParamsFactory = class _MetaParamsFactory {
  /**
   * Gets available create ABI call param factories
   */
  static get create() {
    return {
      _resolveByMethod(params) {
        switch (params.method) {
          case "create":
          case "create(string,uint64)void":
            return _MetaParamsFactory.create.create(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs create ABI call params for the Meta smart contract using the create(string,uint64)void ABI method
       *
       * @param params Parameters for the call
       * @returns An `AppClientMethodCallParams` object for the call
       */
      create(params) {
        return {
          ...params,
          method: "create(string,uint64)void",
          args: Array.isArray(params.args) ? params.args : [params.args.version, params.args.akitaDao]
        };
      }
    };
  }
  /**
   * Gets available update ABI call param factories
   */
  static get update() {
    return {
      _resolveByMethod(params) {
        switch (params.method) {
          case "update":
          case "update(string)void":
            return _MetaParamsFactory.update.update(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs update ABI call params for the Meta smart contract using the update(string)void ABI method
       *
       * @param params Parameters for the call
       * @returns An `AppClientMethodCallParams` object for the call
       */
      update(params) {
        return {
          ...params,
          method: "update(string)void",
          args: Array.isArray(params.args) ? params.args : [params.args.newVersion]
        };
      }
    };
  }
  /**
   * Constructs a no op call for the opUp()void ABI method
   *
   * Read-only resource carrier for box access.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static opUp(params) {
    return {
      ...params,
      method: "opUp()void",
      args: Array.isArray(params.args) ? params.args : []
    };
  }
  /**
     * Constructs a no op call for the addRoot(pay,string,byte[32],uint64)void ABI method
     *
    * Stores a Merkle root and its schema type together. Attached values
    use the shared record store and may exist before or after the root.
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static addRoot(params) {
    return {
      ...params,
      method: "addRoot(pay,string,byte[32],uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.name, params.args.root, params.args.type]
    };
  }
  /**
   * Constructs a no op call for the deleteRoot(string)void ABI method
   *
   * Deletes the merkle root from the root box map
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static deleteRoot(params) {
    return {
      ...params,
      method: "deleteRoot(string)void",
      args: Array.isArray(params.args) ? params.args : [params.args.name]
    };
  }
  /**
   * Constructs a no op call for the updateRoot(string,byte[32])void ABI method
   *
   * Replaces the merkle root with another
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static updateRoot(params) {
    return {
      ...params,
      method: "updateRoot(string,byte[32])void",
      args: Array.isArray(params.args) ? params.args : [params.args.name, params.args.newRoot]
    };
  }
  /**
   * Constructs a no op call for the addData(pay,string,string,string)void ABI method
   *
   * Publishes a value in the shared record store for an existing Merkle root.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static addData(params) {
    return {
      ...params,
      method: "addData(pay,string,string,string)void",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.name, params.args.key, params.args.value]
    };
  }
  /**
   * Constructs a no op call for the deleteData(string,string)void ABI method
   *
   * Removes the shared record for a Merkle data key.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static deleteData(params) {
    return {
      ...params,
      method: "deleteData(string,string)void",
      args: Array.isArray(params.args) ? params.args : [params.args.name, params.args.key]
    };
  }
  /**
   * Constructs a no op call for the verify(address,string,byte[32],byte[32][],uint64)bool ABI method
   *
   * verify an inclusion in a double sha256 based merkle tree
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static verify(params) {
    return {
      ...params,
      method: "verify(address,string,byte[32],byte[32][],uint64)bool",
      args: Array.isArray(params.args) ? params.args : [params.args.address, params.args.name, params.args.leaf, params.args.proof, params.args.type]
    };
  }
  /**
   * Constructs a no op call for the read(address,string,string)string ABI method
   *
   * Fetch a metadata properties
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static read(params) {
    return {
      ...params,
      method: "read(address,string,string)string",
      args: Array.isArray(params.args) ? params.args : [params.args.address, params.args.name, params.args.key]
    };
  }
  /**
     * Constructs a no op call for the verifiedRead(address,string,byte[32],byte[32][],uint64,string)string ABI method
     *
    * Read metadata from box storage and verify the data provided is included
    in the merkle tree given a sha256'd 32 byte merkle tree root & a proof
    thats pre-computed off chain.
  
    verify an inclusion in a merkle tree
    & read an associated key value pair
    & check against the underlying data's schema
    & check against the underlying data's list type or purpose
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static verifiedRead(params) {
    return {
      ...params,
      method: "verifiedRead(address,string,byte[32],byte[32][],uint64,string)string",
      args: Array.isArray(params.args) ? params.args : [params.args.address, params.args.name, params.args.leaf, params.args.proof, params.args.type, params.args.key]
    };
  }
  /**
     * Constructs a no op call for the verifiedMustRead(address,string,byte[32],byte[32][],uint64,string)string ABI method
     *
    * Read metadata from box storage and verify the data provided is included
    in the merkle tree given a sha256'd 32 byte merkle tree root & a proof
    thats pre-computed off chain.
  
    verify an inclusion in a merkle tree
    & read an associated key value pair
    & check against the underlying data's schema
    & check against the underlying data's list type or purpose
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static verifiedMustRead(params) {
    return {
      ...params,
      method: "verifiedMustRead(address,string,byte[32],byte[32][],uint64,string)string",
      args: Array.isArray(params.args) ? params.args : [params.args.address, params.args.name, params.args.leaf, params.args.proof, params.args.type, params.args.key]
    };
  }
  /**
   * Constructs a no op call for the addType(pay,string,uint8[])void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static addType(params) {
    return {
      ...params,
      method: "addType(pay,string,uint8[])void",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.description, params.args.schemaList]
    };
  }
  /**
     * Constructs a no op call for the collectTypeFees()uint64 ABI method
     *
    * Sends the type fees collected so far to the DAO's revenue escrow and returns the amount sent.
    Anyone may call it: the receiver and the amount both come from this app's state. It fails until
    the DAO has named the escrow with `updateAkitaDAOEscrow`. The payment never takes the app below
    its minimum balance; whatever cannot be sent yet stays owed for a later call.
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static collectTypeFees(params) {
    return {
      ...params,
      method: "collectTypeFees()uint64",
      args: Array.isArray(params.args) ? params.args : []
    };
  }
  /**
   * Constructs a no op call for the rootCosts(string)uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static rootCosts(params) {
    return {
      ...params,
      method: "rootCosts(string)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.name]
    };
  }
  /**
   * Constructs a no op call for the dataCosts(string,string,string)uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static dataCosts(params) {
    return {
      ...params,
      method: "dataCosts(string,string,string)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.name, params.args.key, params.args.value]
    };
  }
  /**
   * Constructs a no op call for the recordInfo(address,byte[])(bool,uint64,uint64) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static recordInfo(params) {
    return {
      ...params,
      method: "recordInfo(address,byte[])(bool,uint64,uint64)",
      args: Array.isArray(params.args) ? params.args : [params.args.account, params.args.key]
    };
  }
  /**
   * Constructs a no op call for the readRecord(address,byte[])(bool,uint64,byte[]) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static readRecord(params) {
    return {
      ...params,
      method: "readRecord(address,byte[])(bool,uint64,byte[])",
      args: Array.isArray(params.args) ? params.args : [params.args.account, params.args.key]
    };
  }
  /**
   * Constructs a no op call for the readRecordSlice(address,byte[],uint64,uint64,uint64)byte[] ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static readRecordSlice(params) {
    return {
      ...params,
      method: "readRecordSlice(address,byte[],uint64,uint64,uint64)byte[]",
      args: Array.isArray(params.args) ? params.args : [params.args.account, params.args.key, params.args.offset, params.args.length, params.args.expectedRevision]
    };
  }
  /**
   * Constructs a no op call for the recordCost(address,byte[],uint64)uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static recordCost(params) {
    return {
      ...params,
      method: "recordCost(address,byte[],uint64)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.account, params.args.key, params.args.size]
    };
  }
  /**
   * Constructs a no op call for the setRecord(pay,byte[],byte[],byte[],byte[],byte[],uint64)uint64 ABI method
   *
   * All four parts are published in this call; no intermediate record is observable.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static setRecord(params) {
    return {
      ...params,
      method: "setRecord(pay,byte[],byte[],byte[],byte[],byte[],uint64)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.key, params.args.data0, params.args.data1, params.args.data2, params.args.data3, params.args.expectedRevision]
    };
  }
  /**
   * Constructs a no op call for the removeRecord(byte[],uint64)uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static removeRecord(params) {
    return {
      ...params,
      method: "removeRecord(byte[],uint64)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.key, params.args.expectedRevision]
    };
  }
  /**
   * Constructs a no op call for the updateAkitaDAOEscrow((string,uint64))void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static updateAkitaDaoEscrow(params) {
    return {
      ...params,
      method: "updateAkitaDAOEscrow((string,uint64))void",
      args: Array.isArray(params.args) ? params.args : [params.args.config]
    };
  }
  /**
   * Constructs a no op call for the updateAkitaDAO(uint64)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static updateAkitaDao(params) {
    return {
      ...params,
      method: "updateAkitaDAO(uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.akitaDao]
    };
  }
};
var MetaFactory = (_class = class {
  /**
   * The underlying `AppFactory` for when you want to have more flexibility
   */
  
  /**
   * Creates a new instance of `MetaFactory`
   *
   * @param params The parameters to initialise the app factory with
   */
  constructor(params) {;_class.prototype.__init.call(this);_class.prototype.__init2.call(this);_class.prototype.__init3.call(this);
    this.appFactory = new (0, _appfactory.AppFactory)({
      ...params,
      appSpec: APP_SPEC
    });
  }
  /** The name of the app (from the ARC-32 / ARC-56 app spec or override). */
  get appName() {
    return this.appFactory.appName;
  }
  /** The ARC-56 app spec being used */
  get appSpec() {
    return APP_SPEC;
  }
  /** A reference to the underlying `AlgorandClient` this app factory is using. */
  get algorand() {
    return this.appFactory.algorand;
  }
  /**
   * Returns a new `AppClient` client for an app instance of the given ID.
   *
   * Automatically populates appName, defaultSender and source maps from the factory
   * if not specified in the params.
   * @param params The parameters to create the app client
   * @returns The `AppClient`
   */
  getAppClientById(params) {
    return new MetaClient(this.appFactory.getAppClientById(params));
  }
  /**
   * Returns a new `AppClient` client, resolving the app by creator address and name
   * using AlgoKit app deployment semantics (i.e. looking for the app creation transaction note).
   *
   * Automatically populates appName, defaultSender and source maps from the factory
   * if not specified in the params.
   * @param params The parameters to create the app client
   * @returns The `AppClient`
   */
  async getAppClientByCreatorAndName(params) {
    return new MetaClient(await this.appFactory.getAppClientByCreatorAndName(params));
  }
  /**
   * Idempotently deploys the Meta smart contract.
   *
   * @param params The arguments for the contract calls and any additional parameters for the call
   * @returns The deployment result
   */
  async deploy(params = {}) {
    var _a, _b;
    const result = await this.appFactory.deploy({
      ...params,
      createParams: ((_a = params.createParams) == null ? void 0 : _a.method) ? MetaParamsFactory.create._resolveByMethod(params.createParams) : params.createParams ? params.createParams : void 0,
      updateParams: ((_b = params.updateParams) == null ? void 0 : _b.method) ? MetaParamsFactory.update._resolveByMethod(params.updateParams) : params.updateParams ? params.updateParams : void 0
    });
    return { result: result.result, appClient: new MetaClient(result.appClient) };
  }
  /**
   * Get parameters to create transactions (create and deploy related calls) for the current app. A good mental model for this is that these parameters represent a deferred transaction creation.
   */
  __init() {this.params = {
    /**
     * Gets available create methods
     */
    create: {
      /**
       * Creates a new instance of the Meta smart contract using the create(string,uint64)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create params
       */
      create: (params) => {
        return this.appFactory.params.create(MetaParamsFactory.create.create(params));
      }
    },
    /**
     * Gets available deployUpdate methods
     */
    deployUpdate: {
      /**
       * Updates an existing instance of the Meta smart contract using the update(string)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The deployUpdate params
       */
      update: (params) => {
        return this.appFactory.params.deployUpdate(MetaParamsFactory.update.update(params));
      }
    }
  }}
  /**
   * Create transactions for the current app
   */
  __init2() {this.createTransaction = {
    /**
     * Gets available create methods
     */
    create: {
      /**
       * Creates a new instance of the Meta smart contract using the create(string,uint64)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create transaction
       */
      create: (params) => {
        return this.appFactory.createTransaction.create(MetaParamsFactory.create.create(params));
      }
    }
  }}
  /**
   * Send calls to the current app
   */
  __init3() {this.send = {
    /**
     * Gets available create methods
     */
    create: {
      /**
       * Creates a new instance of the Meta smart contract using an ABI method call using the create(string,uint64)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create result
       */
      create: async (params) => {
        const result = await this.appFactory.send.create(MetaParamsFactory.create.create(params));
        return { result: { ...result.result, return: result.result.return }, appClient: new MetaClient(result.appClient) };
      }
    }
  }}
}, _class);
var MetaClient = (_class2 = class _MetaClient {
  /**
   * The underlying `AppClient` for when you want to have more flexibility
   */
  
  constructor(appClientOrParams) {;_class2.prototype.__init4.call(this);_class2.prototype.__init5.call(this);_class2.prototype.__init6.call(this);_class2.prototype.__init7.call(this);
    this.appClient = appClientOrParams instanceof _appclient.AppClient ? appClientOrParams : new (0, _appclient.AppClient)({
      ...appClientOrParams,
      appSpec: APP_SPEC
    });
  }
  /**
   * Checks for decode errors on the given return value and maps the return value to the return type for the given method
   * @returns The typed return value or undefined if there was no value
   */
  decodeReturnValue(method, returnValue) {
    return returnValue !== void 0 ? _apparc56.getArc56ReturnValue.call(void 0, returnValue, this.appClient.getABIMethod(method), APP_SPEC.structs) : void 0;
  }
  /**
   * Returns a new `MetaClient` client, resolving the app by creator address and name
   * using AlgoKit app deployment semantics (i.e. looking for the app creation transaction note).
   * @param params The parameters to create the app client
   */
  static async fromCreatorAndName(params) {
    return new _MetaClient(await _appclient.AppClient.fromCreatorAndName({ ...params, appSpec: APP_SPEC }));
  }
  /**
   * Returns an `MetaClient` instance for the current network based on
   * pre-determined network-specific app IDs specified in the ARC-56 app spec.
   *
   * If no IDs are in the app spec or the network isn't recognised, an error is thrown.
   * @param params The parameters to create the app client
   */
  static async fromNetwork(params) {
    return new _MetaClient(await _appclient.AppClient.fromNetwork({ ...params, appSpec: APP_SPEC }));
  }
  /** The ID of the app instance this client is linked to. */
  get appId() {
    return this.appClient.appId;
  }
  /** The app address of the app instance this client is linked to. */
  get appAddress() {
    return this.appClient.appAddress;
  }
  /** The name of the app. */
  get appName() {
    return this.appClient.appName;
  }
  /** The ARC-56 app spec being used */
  get appSpec() {
    return this.appClient.appSpec;
  }
  /** A reference to the underlying `AlgorandClient` this app client is using. */
  get algorand() {
    return this.appClient.algorand;
  }
  /**
   * Get parameters to create transactions for the current app. A good mental model for this is that these parameters represent a deferred transaction creation.
   */
  __init4() {this.params = {
    /**
     * Gets available update methods
     */
    update: {
      /**
       * Updates an existing instance of the Meta smart contract using the `update(string)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The update params
       */
      update: (params) => {
        return this.appClient.params.update(MetaParamsFactory.update.update(params));
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the Meta smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.params.bare.clearState(params);
    },
    /**
     * Makes a call to the Meta smart contract using the `opUp()void` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * Read-only resource carrier for box access.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    opUp: (params = { args: [] }) => {
      return this.appClient.params.call(MetaParamsFactory.opUp(params));
    },
    /**
         * Makes a call to the Meta smart contract using the `addRoot(pay,string,byte[32],uint64)void` ABI method.
         *
        * Stores a Merkle root and its schema type together. Attached values
        use the shared record store and may exist before or after the root.
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    addRoot: (params) => {
      return this.appClient.params.call(MetaParamsFactory.addRoot(params));
    },
    /**
     * Makes a call to the Meta smart contract using the `deleteRoot(string)void` ABI method.
     *
     * Deletes the merkle root from the root box map
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    deleteRoot: (params) => {
      return this.appClient.params.call(MetaParamsFactory.deleteRoot(params));
    },
    /**
     * Makes a call to the Meta smart contract using the `updateRoot(string,byte[32])void` ABI method.
     *
     * Replaces the merkle root with another
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    updateRoot: (params) => {
      return this.appClient.params.call(MetaParamsFactory.updateRoot(params));
    },
    /**
     * Makes a call to the Meta smart contract using the `addData(pay,string,string,string)void` ABI method.
     *
     * Publishes a value in the shared record store for an existing Merkle root.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    addData: (params) => {
      return this.appClient.params.call(MetaParamsFactory.addData(params));
    },
    /**
     * Makes a call to the Meta smart contract using the `deleteData(string,string)void` ABI method.
     *
     * Removes the shared record for a Merkle data key.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    deleteData: (params) => {
      return this.appClient.params.call(MetaParamsFactory.deleteData(params));
    },
    /**
     * Makes a call to the Meta smart contract using the `verify(address,string,byte[32],byte[32][],uint64)bool` ABI method.
     *
     * verify an inclusion in a double sha256 based merkle tree
     *
     * @param params The params for the smart contract call
     * @returns The call params: a boolean indicating whether the proof is valid
     */
    verify: (params) => {
      return this.appClient.params.call(MetaParamsFactory.verify(params));
    },
    /**
     * Makes a call to the Meta smart contract using the `read(address,string,string)string` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * Fetch a metadata properties
     *
     * @param params The params for the smart contract call
     * @returns The call params: the value set eg. `5` encoded as a bytestring for 5%
     */
    read: (params) => {
      return this.appClient.params.call(MetaParamsFactory.read(params));
    },
    /**
         * Makes a call to the Meta smart contract using the `verifiedRead(address,string,byte[32],byte[32][],uint64,string)string` ABI method.
         *
        * Read metadata from box storage and verify the data provided is included
        in the merkle tree given a sha256'd 32 byte merkle tree root & a proof
        thats pre-computed off chain.
    
        verify an inclusion in a merkle tree
        & read an associated key value pair
        & check against the underlying data's schema
        & check against the underlying data's list type or purpose
    
         *
         * @param params The params for the smart contract call
         * @returns The call params: a string of metadata
         */
    verifiedRead: (params) => {
      return this.appClient.params.call(MetaParamsFactory.verifiedRead(params));
    },
    /**
         * Makes a call to the Meta smart contract using the `verifiedMustRead(address,string,byte[32],byte[32][],uint64,string)string` ABI method.
         *
        * Read metadata from box storage and verify the data provided is included
        in the merkle tree given a sha256'd 32 byte merkle tree root & a proof
        thats pre-computed off chain.
    
        verify an inclusion in a merkle tree
        & read an associated key value pair
        & check against the underlying data's schema
        & check against the underlying data's list type or purpose
    
         *
         * @param params The params for the smart contract call
         * @returns The call params: a string of metadata
         */
    verifiedMustRead: (params) => {
      return this.appClient.params.call(MetaParamsFactory.verifiedMustRead(params));
    },
    /**
     * Makes a call to the Meta smart contract using the `addType(pay,string,uint8[])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    addType: (params) => {
      return this.appClient.params.call(MetaParamsFactory.addType(params));
    },
    /**
         * Makes a call to the Meta smart contract using the `collectTypeFees()uint64` ABI method.
         *
        * Sends the type fees collected so far to the DAO's revenue escrow and returns the amount sent.
        Anyone may call it: the receiver and the amount both come from this app's state. It fails until
        the DAO has named the escrow with `updateAkitaDAOEscrow`. The payment never takes the app below
        its minimum balance; whatever cannot be sent yet stays owed for a later call.
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    collectTypeFees: (params = { args: [] }) => {
      return this.appClient.params.call(MetaParamsFactory.collectTypeFees(params));
    },
    /**
     * Makes a call to the Meta smart contract using the `rootCosts(string)uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    rootCosts: (params) => {
      return this.appClient.params.call(MetaParamsFactory.rootCosts(params));
    },
    /**
     * Makes a call to the Meta smart contract using the `dataCosts(string,string,string)uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    dataCosts: (params) => {
      return this.appClient.params.call(MetaParamsFactory.dataCosts(params));
    },
    /**
     * Makes a call to the Meta smart contract using the `recordInfo(address,byte[])(bool,uint64,uint64)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    recordInfo: (params) => {
      return this.appClient.params.call(MetaParamsFactory.recordInfo(params));
    },
    /**
     * Makes a call to the Meta smart contract using the `readRecord(address,byte[])(bool,uint64,byte[])` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    readRecord: (params) => {
      return this.appClient.params.call(MetaParamsFactory.readRecord(params));
    },
    /**
     * Makes a call to the Meta smart contract using the `readRecordSlice(address,byte[],uint64,uint64,uint64)byte[]` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    readRecordSlice: (params) => {
      return this.appClient.params.call(MetaParamsFactory.readRecordSlice(params));
    },
    /**
     * Makes a call to the Meta smart contract using the `recordCost(address,byte[],uint64)uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    recordCost: (params) => {
      return this.appClient.params.call(MetaParamsFactory.recordCost(params));
    },
    /**
     * Makes a call to the Meta smart contract using the `setRecord(pay,byte[],byte[],byte[],byte[],byte[],uint64)uint64` ABI method.
     *
     * All four parts are published in this call; no intermediate record is observable.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    setRecord: (params) => {
      return this.appClient.params.call(MetaParamsFactory.setRecord(params));
    },
    /**
     * Makes a call to the Meta smart contract using the `removeRecord(byte[],uint64)uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    removeRecord: (params) => {
      return this.appClient.params.call(MetaParamsFactory.removeRecord(params));
    },
    /**
     * Makes a call to the Meta smart contract using the `updateAkitaDAOEscrow((string,uint64))void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    updateAkitaDaoEscrow: (params) => {
      return this.appClient.params.call(MetaParamsFactory.updateAkitaDaoEscrow(params));
    },
    /**
     * Makes a call to the Meta smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    updateAkitaDao: (params) => {
      return this.appClient.params.call(MetaParamsFactory.updateAkitaDao(params));
    }
  }}
  /**
   * Create transactions for the current app
   */
  __init5() {this.createTransaction = {
    /**
     * Gets available update methods
     */
    update: {
      /**
       * Updates an existing instance of the Meta smart contract using the `update(string)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The update transaction
       */
      update: (params) => {
        return this.appClient.createTransaction.update(MetaParamsFactory.update.update(params));
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the Meta smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.createTransaction.bare.clearState(params);
    },
    /**
     * Makes a call to the Meta smart contract using the `opUp()void` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * Read-only resource carrier for box access.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    opUp: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(MetaParamsFactory.opUp(params));
    },
    /**
         * Makes a call to the Meta smart contract using the `addRoot(pay,string,byte[32],uint64)void` ABI method.
         *
        * Stores a Merkle root and its schema type together. Attached values
        use the shared record store and may exist before or after the root.
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    addRoot: (params) => {
      return this.appClient.createTransaction.call(MetaParamsFactory.addRoot(params));
    },
    /**
     * Makes a call to the Meta smart contract using the `deleteRoot(string)void` ABI method.
     *
     * Deletes the merkle root from the root box map
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    deleteRoot: (params) => {
      return this.appClient.createTransaction.call(MetaParamsFactory.deleteRoot(params));
    },
    /**
     * Makes a call to the Meta smart contract using the `updateRoot(string,byte[32])void` ABI method.
     *
     * Replaces the merkle root with another
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    updateRoot: (params) => {
      return this.appClient.createTransaction.call(MetaParamsFactory.updateRoot(params));
    },
    /**
     * Makes a call to the Meta smart contract using the `addData(pay,string,string,string)void` ABI method.
     *
     * Publishes a value in the shared record store for an existing Merkle root.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    addData: (params) => {
      return this.appClient.createTransaction.call(MetaParamsFactory.addData(params));
    },
    /**
     * Makes a call to the Meta smart contract using the `deleteData(string,string)void` ABI method.
     *
     * Removes the shared record for a Merkle data key.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    deleteData: (params) => {
      return this.appClient.createTransaction.call(MetaParamsFactory.deleteData(params));
    },
    /**
     * Makes a call to the Meta smart contract using the `verify(address,string,byte[32],byte[32][],uint64)bool` ABI method.
     *
     * verify an inclusion in a double sha256 based merkle tree
     *
     * @param params The params for the smart contract call
     * @returns The call transaction: a boolean indicating whether the proof is valid
     */
    verify: (params) => {
      return this.appClient.createTransaction.call(MetaParamsFactory.verify(params));
    },
    /**
     * Makes a call to the Meta smart contract using the `read(address,string,string)string` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * Fetch a metadata properties
     *
     * @param params The params for the smart contract call
     * @returns The call transaction: the value set eg. `5` encoded as a bytestring for 5%
     */
    read: (params) => {
      return this.appClient.createTransaction.call(MetaParamsFactory.read(params));
    },
    /**
         * Makes a call to the Meta smart contract using the `verifiedRead(address,string,byte[32],byte[32][],uint64,string)string` ABI method.
         *
        * Read metadata from box storage and verify the data provided is included
        in the merkle tree given a sha256'd 32 byte merkle tree root & a proof
        thats pre-computed off chain.
    
        verify an inclusion in a merkle tree
        & read an associated key value pair
        & check against the underlying data's schema
        & check against the underlying data's list type or purpose
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction: a string of metadata
         */
    verifiedRead: (params) => {
      return this.appClient.createTransaction.call(MetaParamsFactory.verifiedRead(params));
    },
    /**
         * Makes a call to the Meta smart contract using the `verifiedMustRead(address,string,byte[32],byte[32][],uint64,string)string` ABI method.
         *
        * Read metadata from box storage and verify the data provided is included
        in the merkle tree given a sha256'd 32 byte merkle tree root & a proof
        thats pre-computed off chain.
    
        verify an inclusion in a merkle tree
        & read an associated key value pair
        & check against the underlying data's schema
        & check against the underlying data's list type or purpose
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction: a string of metadata
         */
    verifiedMustRead: (params) => {
      return this.appClient.createTransaction.call(MetaParamsFactory.verifiedMustRead(params));
    },
    /**
     * Makes a call to the Meta smart contract using the `addType(pay,string,uint8[])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    addType: (params) => {
      return this.appClient.createTransaction.call(MetaParamsFactory.addType(params));
    },
    /**
         * Makes a call to the Meta smart contract using the `collectTypeFees()uint64` ABI method.
         *
        * Sends the type fees collected so far to the DAO's revenue escrow and returns the amount sent.
        Anyone may call it: the receiver and the amount both come from this app's state. It fails until
        the DAO has named the escrow with `updateAkitaDAOEscrow`. The payment never takes the app below
        its minimum balance; whatever cannot be sent yet stays owed for a later call.
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    collectTypeFees: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(MetaParamsFactory.collectTypeFees(params));
    },
    /**
     * Makes a call to the Meta smart contract using the `rootCosts(string)uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    rootCosts: (params) => {
      return this.appClient.createTransaction.call(MetaParamsFactory.rootCosts(params));
    },
    /**
     * Makes a call to the Meta smart contract using the `dataCosts(string,string,string)uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    dataCosts: (params) => {
      return this.appClient.createTransaction.call(MetaParamsFactory.dataCosts(params));
    },
    /**
     * Makes a call to the Meta smart contract using the `recordInfo(address,byte[])(bool,uint64,uint64)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    recordInfo: (params) => {
      return this.appClient.createTransaction.call(MetaParamsFactory.recordInfo(params));
    },
    /**
     * Makes a call to the Meta smart contract using the `readRecord(address,byte[])(bool,uint64,byte[])` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    readRecord: (params) => {
      return this.appClient.createTransaction.call(MetaParamsFactory.readRecord(params));
    },
    /**
     * Makes a call to the Meta smart contract using the `readRecordSlice(address,byte[],uint64,uint64,uint64)byte[]` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    readRecordSlice: (params) => {
      return this.appClient.createTransaction.call(MetaParamsFactory.readRecordSlice(params));
    },
    /**
     * Makes a call to the Meta smart contract using the `recordCost(address,byte[],uint64)uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    recordCost: (params) => {
      return this.appClient.createTransaction.call(MetaParamsFactory.recordCost(params));
    },
    /**
     * Makes a call to the Meta smart contract using the `setRecord(pay,byte[],byte[],byte[],byte[],byte[],uint64)uint64` ABI method.
     *
     * All four parts are published in this call; no intermediate record is observable.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    setRecord: (params) => {
      return this.appClient.createTransaction.call(MetaParamsFactory.setRecord(params));
    },
    /**
     * Makes a call to the Meta smart contract using the `removeRecord(byte[],uint64)uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    removeRecord: (params) => {
      return this.appClient.createTransaction.call(MetaParamsFactory.removeRecord(params));
    },
    /**
     * Makes a call to the Meta smart contract using the `updateAkitaDAOEscrow((string,uint64))void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    updateAkitaDaoEscrow: (params) => {
      return this.appClient.createTransaction.call(MetaParamsFactory.updateAkitaDaoEscrow(params));
    },
    /**
     * Makes a call to the Meta smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    updateAkitaDao: (params) => {
      return this.appClient.createTransaction.call(MetaParamsFactory.updateAkitaDao(params));
    }
  }}
  /**
   * Send calls to the current app
   */
  __init6() {this.send = {
    /**
     * Gets available update methods
     */
    update: {
      /**
       * Updates an existing instance of the Meta smart contract using the `update(string)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The update result
       */
      update: async (params) => {
        const result = await this.appClient.send.update(MetaParamsFactory.update.update(params));
        return { ...result, return: result.return };
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the Meta smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.send.bare.clearState(params);
    },
    /**
     * Makes a call to the Meta smart contract using the `opUp()void` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * Read-only resource carrier for box access.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    opUp: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(MetaParamsFactory.opUp(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the Meta smart contract using the `addRoot(pay,string,byte[32],uint64)void` ABI method.
         *
        * Stores a Merkle root and its schema type together. Attached values
        use the shared record store and may exist before or after the root.
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    addRoot: async (params) => {
      const result = await this.appClient.send.call(MetaParamsFactory.addRoot(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Meta smart contract using the `deleteRoot(string)void` ABI method.
     *
     * Deletes the merkle root from the root box map
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    deleteRoot: async (params) => {
      const result = await this.appClient.send.call(MetaParamsFactory.deleteRoot(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Meta smart contract using the `updateRoot(string,byte[32])void` ABI method.
     *
     * Replaces the merkle root with another
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    updateRoot: async (params) => {
      const result = await this.appClient.send.call(MetaParamsFactory.updateRoot(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Meta smart contract using the `addData(pay,string,string,string)void` ABI method.
     *
     * Publishes a value in the shared record store for an existing Merkle root.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    addData: async (params) => {
      const result = await this.appClient.send.call(MetaParamsFactory.addData(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Meta smart contract using the `deleteData(string,string)void` ABI method.
     *
     * Removes the shared record for a Merkle data key.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    deleteData: async (params) => {
      const result = await this.appClient.send.call(MetaParamsFactory.deleteData(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Meta smart contract using the `verify(address,string,byte[32],byte[32][],uint64)bool` ABI method.
     *
     * verify an inclusion in a double sha256 based merkle tree
     *
     * @param params The params for the smart contract call
     * @returns The call result: a boolean indicating whether the proof is valid
     */
    verify: async (params) => {
      const result = await this.appClient.send.call(MetaParamsFactory.verify(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Meta smart contract using the `read(address,string,string)string` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * Fetch a metadata properties
     *
     * @param params The params for the smart contract call
     * @returns The call result: the value set eg. `5` encoded as a bytestring for 5%
     */
    read: async (params) => {
      const result = await this.appClient.send.call(MetaParamsFactory.read(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the Meta smart contract using the `verifiedRead(address,string,byte[32],byte[32][],uint64,string)string` ABI method.
         *
        * Read metadata from box storage and verify the data provided is included
        in the merkle tree given a sha256'd 32 byte merkle tree root & a proof
        thats pre-computed off chain.
    
        verify an inclusion in a merkle tree
        & read an associated key value pair
        & check against the underlying data's schema
        & check against the underlying data's list type or purpose
    
         *
         * @param params The params for the smart contract call
         * @returns The call result: a string of metadata
         */
    verifiedRead: async (params) => {
      const result = await this.appClient.send.call(MetaParamsFactory.verifiedRead(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the Meta smart contract using the `verifiedMustRead(address,string,byte[32],byte[32][],uint64,string)string` ABI method.
         *
        * Read metadata from box storage and verify the data provided is included
        in the merkle tree given a sha256'd 32 byte merkle tree root & a proof
        thats pre-computed off chain.
    
        verify an inclusion in a merkle tree
        & read an associated key value pair
        & check against the underlying data's schema
        & check against the underlying data's list type or purpose
    
         *
         * @param params The params for the smart contract call
         * @returns The call result: a string of metadata
         */
    verifiedMustRead: async (params) => {
      const result = await this.appClient.send.call(MetaParamsFactory.verifiedMustRead(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Meta smart contract using the `addType(pay,string,uint8[])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    addType: async (params) => {
      const result = await this.appClient.send.call(MetaParamsFactory.addType(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the Meta smart contract using the `collectTypeFees()uint64` ABI method.
         *
        * Sends the type fees collected so far to the DAO's revenue escrow and returns the amount sent.
        Anyone may call it: the receiver and the amount both come from this app's state. It fails until
        the DAO has named the escrow with `updateAkitaDAOEscrow`. The payment never takes the app below
        its minimum balance; whatever cannot be sent yet stays owed for a later call.
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    collectTypeFees: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(MetaParamsFactory.collectTypeFees(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Meta smart contract using the `rootCosts(string)uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    rootCosts: async (params) => {
      const result = await this.appClient.send.call(MetaParamsFactory.rootCosts(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Meta smart contract using the `dataCosts(string,string,string)uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    dataCosts: async (params) => {
      const result = await this.appClient.send.call(MetaParamsFactory.dataCosts(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Meta smart contract using the `recordInfo(address,byte[])(bool,uint64,uint64)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    recordInfo: async (params) => {
      const result = await this.appClient.send.call(MetaParamsFactory.recordInfo(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Meta smart contract using the `readRecord(address,byte[])(bool,uint64,byte[])` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    readRecord: async (params) => {
      const result = await this.appClient.send.call(MetaParamsFactory.readRecord(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Meta smart contract using the `readRecordSlice(address,byte[],uint64,uint64,uint64)byte[]` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    readRecordSlice: async (params) => {
      const result = await this.appClient.send.call(MetaParamsFactory.readRecordSlice(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Meta smart contract using the `recordCost(address,byte[],uint64)uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    recordCost: async (params) => {
      const result = await this.appClient.send.call(MetaParamsFactory.recordCost(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Meta smart contract using the `setRecord(pay,byte[],byte[],byte[],byte[],byte[],uint64)uint64` ABI method.
     *
     * All four parts are published in this call; no intermediate record is observable.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    setRecord: async (params) => {
      const result = await this.appClient.send.call(MetaParamsFactory.setRecord(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Meta smart contract using the `removeRecord(byte[],uint64)uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    removeRecord: async (params) => {
      const result = await this.appClient.send.call(MetaParamsFactory.removeRecord(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Meta smart contract using the `updateAkitaDAOEscrow((string,uint64))void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    updateAkitaDaoEscrow: async (params) => {
      const result = await this.appClient.send.call(MetaParamsFactory.updateAkitaDaoEscrow(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Meta smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    updateAkitaDao: async (params) => {
      const result = await this.appClient.send.call(MetaParamsFactory.updateAkitaDao(params));
      return { ...result, return: result.return };
    }
  }}
  /**
   * Clone this app client with different params
   *
   * @param params The params to use for the the cloned app client. Omit a param to keep the original value. Set a param to override the original value. Setting to undefined will clear the original value.
   * @returns A new app client with the altered params
   */
  clone(params) {
    return new _MetaClient(this.appClient.clone(params));
  }
  /**
   * Makes a readonly (simulated) call to the Meta smart contract using the `opUp()void` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * Read-only resource carrier for box access.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async opUp(params = { args: [] }) {
    const result = await this.appClient.send.call(MetaParamsFactory.opUp(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Meta smart contract using the `read(address,string,string)string` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * Fetch a metadata properties
   *
   * @param params The params for the smart contract call
   * @returns The call result: the value set eg. `5` encoded as a bytestring for 5%
   */
  async read(params) {
    const result = await this.appClient.send.call(MetaParamsFactory.read(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Meta smart contract using the `rootCosts(string)uint64` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async rootCosts(params) {
    const result = await this.appClient.send.call(MetaParamsFactory.rootCosts(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Meta smart contract using the `dataCosts(string,string,string)uint64` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async dataCosts(params) {
    const result = await this.appClient.send.call(MetaParamsFactory.dataCosts(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Meta smart contract using the `recordInfo(address,byte[])(bool,uint64,uint64)` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async recordInfo(params) {
    const result = await this.appClient.send.call(MetaParamsFactory.recordInfo(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Meta smart contract using the `readRecord(address,byte[])(bool,uint64,byte[])` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async readRecord(params) {
    const result = await this.appClient.send.call(MetaParamsFactory.readRecord(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Meta smart contract using the `readRecordSlice(address,byte[],uint64,uint64,uint64)byte[]` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async readRecordSlice(params) {
    const result = await this.appClient.send.call(MetaParamsFactory.readRecordSlice(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Meta smart contract using the `recordCost(address,byte[],uint64)uint64` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async recordCost(params) {
    const result = await this.appClient.send.call(MetaParamsFactory.recordCost(params));
    return result.return;
  }
  /**
   * Methods to access state for the current Meta app
   */
  __init7() {this.state = {
    /**
     * Methods to access global state for the current Meta app
     */
    global: {
      /**
       * Get all current keyed values from global state
       */
      getAll: async () => {
        const result = await this.appClient.state.global.getAll();
        return {
          typesId: result.typesID,
          typeFees: result.typeFees,
          akitaDaoEscrow: result.akitaDAOEscrow,
          version: result.version,
          akitaDao: result.akitaDAO
        };
      },
      /**
       * Get the current value of the typesID key in global state
       */
      typesId: async () => {
        return await this.appClient.state.global.getValue("typesID");
      },
      /**
       * Get the current value of the typeFees key in global state
       */
      typeFees: async () => {
        return await this.appClient.state.global.getValue("typeFees");
      },
      /**
       * Get the current value of the akitaDAOEscrow key in global state
       */
      akitaDaoEscrow: async () => {
        return await this.appClient.state.global.getValue("akitaDAOEscrow");
      },
      /**
       * Get the current value of the version key in global state
       */
      version: async () => {
        return await this.appClient.state.global.getValue("version");
      },
      /**
       * Get the current value of the akitaDAO key in global state
       */
      akitaDao: async () => {
        return await this.appClient.state.global.getValue("akitaDAO");
      }
    },
    /**
     * Methods to access box state for the current Meta app
     */
    box: {
      /**
       * Get all current keyed values from box state
       */
      getAll: async () => {
        const result = await this.appClient.state.box.getAll();
        return {};
      },
      /**
       * Get values from the types map in box state
       */
      types: {
        /**
         * Get all current values of the types map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("types");
        },
        /**
         * Get a current value of the types map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("types", key);
        }
      },
      /**
       * Get values from the roots map in box state
       */
      roots: {
        /**
         * Get all current values of the roots map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("roots");
        },
        /**
         * Get a current value of the roots map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("roots", key);
        }
      },
      /**
       * Get values from the records map in box state
       */
      records: {
        /**
         * Get all current values of the records map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("records");
        },
        /**
         * Get a current value of the records map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("records", key);
        }
      }
    }
  }}
  newGroup() {
    const client = this;
    const composer = this.algorand.newGroup();
    let promiseChain = Promise.resolve();
    const resultMappers = [];
    return {
      /**
       * Add a opUp()void method call against the Meta contract
       */
      opUp(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.opUp(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a addRoot(pay,string,byte[32],uint64)void method call against the Meta contract
       */
      addRoot(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.addRoot(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a deleteRoot(string)void method call against the Meta contract
       */
      deleteRoot(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.deleteRoot(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a updateRoot(string,byte[32])void method call against the Meta contract
       */
      updateRoot(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateRoot(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a addData(pay,string,string,string)void method call against the Meta contract
       */
      addData(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.addData(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a deleteData(string,string)void method call against the Meta contract
       */
      deleteData(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.deleteData(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a verify(address,string,byte[32],byte[32][],uint64)bool method call against the Meta contract
       */
      verify(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.verify(params)));
        resultMappers.push((v) => client.decodeReturnValue("verify(address,string,byte[32],byte[32][],uint64)bool", v));
        return this;
      },
      /**
       * Add a read(address,string,string)string method call against the Meta contract
       */
      read(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.read(params)));
        resultMappers.push((v) => client.decodeReturnValue("read(address,string,string)string", v));
        return this;
      },
      /**
       * Add a verifiedRead(address,string,byte[32],byte[32][],uint64,string)string method call against the Meta contract
       */
      verifiedRead(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.verifiedRead(params)));
        resultMappers.push((v) => client.decodeReturnValue("verifiedRead(address,string,byte[32],byte[32][],uint64,string)string", v));
        return this;
      },
      /**
       * Add a verifiedMustRead(address,string,byte[32],byte[32][],uint64,string)string method call against the Meta contract
       */
      verifiedMustRead(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.verifiedMustRead(params)));
        resultMappers.push((v) => client.decodeReturnValue("verifiedMustRead(address,string,byte[32],byte[32][],uint64,string)string", v));
        return this;
      },
      /**
       * Add a addType(pay,string,uint8[])void method call against the Meta contract
       */
      addType(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.addType(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a collectTypeFees()uint64 method call against the Meta contract
       */
      collectTypeFees(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.collectTypeFees(params)));
        resultMappers.push((v) => client.decodeReturnValue("collectTypeFees()uint64", v));
        return this;
      },
      /**
       * Add a rootCosts(string)uint64 method call against the Meta contract
       */
      rootCosts(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.rootCosts(params)));
        resultMappers.push((v) => client.decodeReturnValue("rootCosts(string)uint64", v));
        return this;
      },
      /**
       * Add a dataCosts(string,string,string)uint64 method call against the Meta contract
       */
      dataCosts(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.dataCosts(params)));
        resultMappers.push((v) => client.decodeReturnValue("dataCosts(string,string,string)uint64", v));
        return this;
      },
      /**
       * Add a recordInfo(address,byte[])(bool,uint64,uint64) method call against the Meta contract
       */
      recordInfo(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.recordInfo(params)));
        resultMappers.push((v) => client.decodeReturnValue("recordInfo(address,byte[])(bool,uint64,uint64)", v));
        return this;
      },
      /**
       * Add a readRecord(address,byte[])(bool,uint64,byte[]) method call against the Meta contract
       */
      readRecord(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.readRecord(params)));
        resultMappers.push((v) => client.decodeReturnValue("readRecord(address,byte[])(bool,uint64,byte[])", v));
        return this;
      },
      /**
       * Add a readRecordSlice(address,byte[],uint64,uint64,uint64)byte[] method call against the Meta contract
       */
      readRecordSlice(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.readRecordSlice(params)));
        resultMappers.push((v) => client.decodeReturnValue("readRecordSlice(address,byte[],uint64,uint64,uint64)byte[]", v));
        return this;
      },
      /**
       * Add a recordCost(address,byte[],uint64)uint64 method call against the Meta contract
       */
      recordCost(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.recordCost(params)));
        resultMappers.push((v) => client.decodeReturnValue("recordCost(address,byte[],uint64)uint64", v));
        return this;
      },
      /**
       * Add a setRecord(pay,byte[],byte[],byte[],byte[],byte[],uint64)uint64 method call against the Meta contract
       */
      setRecord(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.setRecord(params)));
        resultMappers.push((v) => client.decodeReturnValue("setRecord(pay,byte[],byte[],byte[],byte[],byte[],uint64)uint64", v));
        return this;
      },
      /**
       * Add a removeRecord(byte[],uint64)uint64 method call against the Meta contract
       */
      removeRecord(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.removeRecord(params)));
        resultMappers.push((v) => client.decodeReturnValue("removeRecord(byte[],uint64)uint64", v));
        return this;
      },
      /**
       * Add a updateAkitaDAOEscrow((string,uint64))void method call against the Meta contract
       */
      updateAkitaDaoEscrow(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateAkitaDaoEscrow(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a updateAkitaDAO(uint64)void method call against the Meta contract
       */
      updateAkitaDao(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateAkitaDao(params)));
        resultMappers.push(void 0);
        return this;
      },
      get update() {
        return {
          update: (params) => {
            promiseChain = promiseChain.then(async () => composer.addAppUpdateMethodCall(await client.params.update.update(params)));
            resultMappers.push(void 0);
            return this;
          }
        };
      },
      /**
       * Add a clear state call to the Meta contract
       */
      clearState(params) {
        promiseChain = promiseChain.then(() => composer.addAppCall(client.params.clearState(params)));
        return this;
      },
      addTransaction(txn, signer) {
        promiseChain = promiseChain.then(() => composer.addTransaction(txn, signer));
        return this;
      },
      async composer() {
        await promiseChain;
        return composer;
      },
      async simulate(options) {
        var _a;
        await promiseChain;
        const result = await (!options ? composer.simulate() : composer.simulate(options));
        return {
          ...result,
          returns: (_a = result.returns) == null ? void 0 : _a.map((val, i) => resultMappers[i] !== void 0 ? resultMappers[i](val) : val.returnValue)
        };
      },
      async send(params) {
        var _a;
        await promiseChain;
        const result = await composer.send(params);
        return {
          ...result,
          returns: (_a = result.returns) == null ? void 0 : _a.map((val, i) => resultMappers[i] !== void 0 ? resultMappers[i](val) : val.returnValue)
        };
      }
    };
  }
}, _class2);

// src/meta/errors.ts
var META_MERKLES_ERROR_MESSAGES = _chunkZGCVKZRLjs.withErrorCodeAliases.call(void 0, {
  // --- Box key / data validation -----------------------------------------
  KTL: "Max rooted-data key length is 15 bytes",
  DTL: "Max data length is 1024 bytes",
  RKP: '"l." key prefix is reserved for internals',
  NTL: "Root name cannot be longer than 27 bytes",
  // --- Root lifecycle -----------------------------------------------------
  NTKN: "This name is already in use",
  NNAM: "A root with this name does not exist",
  NROT: "The root does not exist in box storage",
  NRFD: "There must be a root to associate the data to",
  EROT: "This root already exists",
  // --- Verification -------------------------------------------------------
  FVRI: "Failed to verify inclusion",
  // --- Data / schema ------------------------------------------------------
  SCHM: "List schema does not match",
  MSCH: "Unknown Merkle leaf schema part",
  TMIS: "List type does not match",
  NDTA: "Data does not exist",
  EDTA: "New data already exists",
  // --- Tree types ---------------------------------------------------------
  NTRT: "Tree type does not exist",
  ETRK: "Tree type key already exists for this root",
  // --- Plain records and plugin scopes ---------------------------
  MNAM: "Root name must be nonempty",
  MSPM: "This wallet grant has no metadata policy",
  MSPA: "Only an admin wallet execution can change metadata policies",
  MWCTX: "Metadata calls require an active wallet grant",
  MNSP: "Namespace must be nonempty and within its byte limit",
  MKEY: "Key must be nonempty and within its byte limit",
  MNMS: "Record namespace and key must fit 30 UTF-8 bytes combined",
  MPMT: "Record payment must be adjacent, from the author, for the exact storage cost, with no close or rekey",
  MRNF: "Record does not exist",
  MREV: "Record revision changed; read the current revision before retrying",
  MRNG: "Record slice is outside the allowed range",
  MVSZ: "Record data exceeds the app-call argument budget",
  MPRT: "Metadata part exceeds its encoded AVM byte-value limit",
  MRSL: "Values larger than 1024 bytes require slice reads",
  MREG: "Meta registry application ID must be nonzero",
  MKNS: "A key-restricted scope requires a namespace",
  MSIZ: "Encoded scope keys must fit 124 bytes",
  MDKY: "Scope keys must be unique",
  MNSS: "Namespace is outside this plugin scope",
  MKSC: "Key is outside this plugin scope",
  MRSC: "A key-restricted plugin cannot modify roots",
  MTSC: "Only an unrestricted plugin can register tree types"
});
var translateMetaError = _chunkZGCVKZRLjs.makeErrorTranslator.call(void 0, META_MERKLES_ERROR_MESSAGES);

// src/meta/schemas.ts

var color = /^#[0-9a-fA-F]{6}$/;
var uint64 = /^[1-9][0-9]{0,19}$/;
function object(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function hasOnly(value, keys) {
  return Object.keys(value).every((key) => keys.includes(key));
}
function roundness(value) {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 && value <= 1;
}
function isReceiveQrStyleV1(value) {
  return object(value) && hasOnly(value, ["version", "background", "foreground", "moduleRoundness", "finderRoundness", "showAvatar"]) && value.version === 1 && typeof value.background === "string" && color.test(value.background) && typeof value.foreground === "string" && (value.foreground === "auto" || color.test(value.foreground)) && roundness(value.moduleRoundness) && roundness(value.finderRoundness) && typeof value.showAvatar === "boolean";
}
function isAccountImageReferenceV1(value) {
  if (!object(value) || !hasOnly(value, ["version", "source"]) || value.version !== 1 || !object(value.source)) return false;
  const source = value.source;
  if (source.type === "uri") {
    return hasOnly(source, ["type", "uri", "sha256"]) && typeof source.uri === "string" && /^(https:\/\/[^/?#\s]+|ipfs:\/\/[^/?#\s]+|ar:\/\/[^/?#\s]+)([^\s]*)$/.test(source.uri) && (source.sha256 === void 0 || typeof source.sha256 === "string" && /^[0-9a-fA-F]{64}$/.test(source.sha256));
  }
  if (source.type === "asset") {
    return hasOnly(source, ["type", "assetId"]) && typeof source.assetId === "string" && uint64.test(source.assetId) && BigInt(source.assetId) <= 0xffffffffffffffffn;
  }
  return source.type === "account" && hasOnly(source, ["type", "address"]) && typeof source.address === "string" && _algosdk.isValidAddress.call(void 0, source.address);
}
function parse(data, valid) {
  if (data.length > METADATA_MAX_VALUE_BYTES) return void 0;
  try {
    const value = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(data));
    return valid(value) ? value : void 0;
  } catch (e) {
    return void 0;
  }
}
var parseReceiveQrStyle = (data) => parse(data, isReceiveQrStyleV1);
var parseAccountImageReference = (data) => parse(data, isAccountImageReferenceV1);
function encodeReceiveQrStyle(value) {
  if (!isReceiveQrStyleV1(value)) throw new Error("Invalid receive QR style v1.");
  return encodeMetadataJson(value);
}
function encodeAccountImageReference(value) {
  if (!isAccountImageReferenceV1(value)) throw new Error("Invalid account image reference v1.");
  return encodeMetadataJson(value);
}

// src/meta/index.ts
var ADD_TYPE_COST = 100000000n;
var MetaSDK = class extends _chunkLDSU2NENjs.BaseSDK {
  constructor(params) {
    super({ factory: MetaFactory, ...params }, _chunkQFFBRC6Ojs.ENV_VAR_NAMES.META_APP_ID);
  }
  // ========== Read Methods ==========
  /**
   * Gets the current global state of the Meta contract.
   */
  async getState() {
    const state = await this.client.state.global.getAll();
    return {
      typesId: _nullishCoalesce(state.typesId, () => ( 0n))
    };
  }
  /**
   * Gets a merkle root by address and name.
   * @returns The 32-byte merkle root or undefined if not found
   */
  async getRoot({ address, name }) {
    var _a;
    const rootKey = metadataOwnerKey(address, name);
    try {
      return (_a = await this.client.state.box.roots.value(rootKey)) == null ? void 0 : _a.root;
    } catch (error) {
      if (error instanceof Error && error.message.includes("box not found")) {
        return void 0;
      }
      throw error;
    }
  }
  /**
   * Checks if a merkle root exists.
   */
  async hasRoot({ address, name }) {
    const root = await this.getRoot({ address, name });
    return root !== void 0;
  }
  /**
   * Gets all merkle roots as a map.
   */
  async getRoots() {
    return new Map([...await this.client.state.box.roots.getMap()].map(([key, value]) => [{ address: _algosdk.encodeAddress.call(void 0, key.slice(0, 32)), name: new TextDecoder().decode(key.slice(32)) }, value.root]));
  }
  /**
   * Gets metadata associated with a merkle root.
   * @returns The metadata value or undefined if not found
   */
  async getData({ address, name, key }) {
    if (key === "l.type") {
      try {
        const root = await this.client.state.box.roots.value(metadataOwnerKey(address, name));
        if (!root) return void 0;
        const value = new Uint8Array(8);
        new DataView(value.buffer).setBigUint64(0, root.type);
        return new TextDecoder().decode(value);
      } catch (error) {
        if (error instanceof Error && error.message.includes("box not found")) return void 0;
        throw error;
      }
    }
    const record = await this.readRecord(address, metadataDataKey(name, key));
    return record.exists ? new TextDecoder().decode(record.data) : void 0;
  }
  /**
   * Gets a tree type by ID.
   * @returns The type value (schema and description) or undefined if not found
   */
  async getType({ id }) {
    return await this.client.state.box.types.value(id);
  }
  /**
   * Gets all tree types as a map.
   */
  async getTypes() {
    return await this.client.state.box.types.getMap();
  }
  /**
   * Gets the cost in microAlgo for creating a merkle root with the given name.
   */
  async rootCosts({ name }) {
    return await this.client.rootCosts({ args: { name } });
  }
  /**
   * Gets the cost in microAlgo for adding data with the given parameters.
   */
  async dataCosts({ name, key, value }) {
    return await this.client.dataCosts({ args: { name, key, value } });
  }
  // ========== Verify Methods ==========
  /**
   * Verifies a leaf is included in a merkle tree.
   * @returns true if the proof is valid
   */
  async verify({ address, name, leaf, proof, type }) {
    const formattedProof = proof.map((p) => {
      if (p.length !== 32) {
        throw new Error("Each proof element must be exactly 32 bytes");
      }
      return p;
    });
    const { return: result } = await this.client.send.verify({
      args: {
        address,
        name,
        leaf,
        proof: formattedProof,
        type
      }
    });
    return _nullishCoalesce(result, () => ( false));
  }
  /**
   * Reads metadata from a merkle root.
   */
  async read({ address, name, key }) {
    return await this.client.read({
      args: { address, name, key }
    });
  }
  /**
   * Verifies inclusion and reads metadata if verified.
   * @returns The metadata value, or empty string if verification fails
   */
  async verifiedRead({ address, name, leaf, proof, type, key }) {
    const formattedProof = proof.map((p) => {
      if (p.length !== 32) {
        throw new Error("Each proof element must be exactly 32 bytes");
      }
      return p;
    });
    const { return: result } = await this.client.send.verifiedRead({
      args: {
        address,
        name,
        leaf,
        proof: formattedProof,
        type,
        key
      }
    });
    return _nullishCoalesce(result, () => ( ""));
  }
  /**
   * Verifies inclusion and reads metadata. Throws if verification fails.
   * @returns The metadata value
   */
  async verifiedMustRead({ address, name, leaf, proof, type, key }) {
    const formattedProof = proof.map((p) => {
      if (p.length !== 32) {
        throw new Error("Each proof element must be exactly 32 bytes");
      }
      return p;
    });
    const { return: result } = await this.client.send.verifiedMustRead({
      args: {
        address,
        name,
        leaf,
        proof: formattedProof,
        type,
        key
      }
    });
    if (result === void 0) {
      throw new Error("Failed to read verified data");
    }
    return result;
  }
  // ========== Write Methods ==========
  /**
   * Adds a new merkle root.
   * @param name - The name alias of the root (max 27 UTF-8 bytes)
   * @param root - The 32-byte merkle tree root
   * @param type - The index of the tree type from box storage
   */
  async addRoot({ sender, signer, name, root, type }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    if (root.length !== 32) {
      throw new Error("Root must be exactly 32 bytes");
    }
    const cost = await this.rootCosts({ name });
    const payment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: _algokitutils.microAlgo.call(void 0, cost),
      receiver: this.client.appAddress
    });
    await this.client.send.addRoot({
      ...sendParams,
      args: {
        payment,
        name,
        root,
        type
      }
    });
  }
  /**
   * Updates an existing merkle root.
   * @param name - The name of the merkle group data
   * @param newRoot - The new 32-byte merkle tree root
   */
  async updateRoot({ sender, signer, name, newRoot }) {
    const sendParams = this.getSendParams({ sender, signer });
    if (newRoot.length !== 32) {
      throw new Error("New root must be exactly 32 bytes");
    }
    await this.client.send.updateRoot({
      ...sendParams,
      args: {
        name,
        newRoot
      }
    });
  }
  /**
   * Deletes a merkle root and returns the MBR to the sender.
   * Only the original creator can delete the root.
   */
  async deleteRoot({ sender, signer, name }) {
    const sendParams = this.getSendParams({ sender, signer });
    await this.client.send.deleteRoot({
      ...sendParams,
      // Extra fee for inner payment to return MBR
      extraFee: _algokitutils.microAlgo.call(void 0, 1e3),
      args: { name }
    });
  }
  /**
   * Adds metadata to an existing merkle root.
   * @param name - The name of the merkle tree root
   * @param key - The metadata key (max 15 bytes, cannot start with "l.")
   * @param value - The metadata value (max 1024 bytes)
   */
  async addData({ sender, signer, name, key, value }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const cost = await this.dataCosts({ name, key, value });
    const payment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: _algokitutils.microAlgo.call(void 0, cost),
      receiver: this.client.appAddress
    });
    await this.client.send.addData({
      ...sendParams,
      args: {
        payment,
        name,
        key,
        value
      }
    });
  }
  /**
   * Deletes metadata from a merkle root and returns the MBR to the sender.
   * Only the original creator can delete data.
   */
  async deleteData({ sender, signer, name, key }) {
    const sendParams = this.getSendParams({ sender, signer });
    await this.client.send.deleteData({
      ...sendParams,
      // Extra fee for inner payment to return MBR
      extraFee: _algokitutils.microAlgo.call(void 0, 1e3),
      args: { name, key }
    });
  }
  /**
   * Adds a new tree type definition.
   * Requires a 100 ALGO payment.
   * @param description - Description of the tree type (max 800 bytes)
   * @param schemaList - The schema parts defining the leaf structure
   */
  async addType({ sender, signer, description, schemaList }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const payment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: _algokitutils.microAlgo.call(void 0, ADD_TYPE_COST),
      receiver: this.client.appAddress
    });
    const schemaListNumbers = schemaList.map((part) => part);
    await this.client.send.addType({
      ...sendParams,
      args: {
        payment,
        description,
        schemaList: schemaListNumbers
      }
    });
  }
  /**
   * Type fees collected and not yet sent to the DAO's revenue escrow: each 100 ALGO fee less the
   * storage its type occupies.
   */
  async typeFees() {
    return await _asyncNullishCoalesce(await this.client.state.global.typeFees(), async () => ( 0n));
  }
  /**
   * Sends the collected type fees to the DAO's revenue escrow and returns the amount sent. Anyone may
   * call it. It fails until the DAO has named the escrow (`updateAkitaDAOEscrow`), and it never takes
   * the app below its minimum balance: whatever cannot be sent yet stays owed for a later call.
   */
  async collectTypeFees({ sender, signer } = {}) {
    const sendParams = this.getSendParams({ sender, signer });
    const { return: amount } = await this.client.send.collectTypeFees({
      ...sendParams,
      // Extra fee for the inner payment to the escrow
      extraFee: _algokitutils.microAlgo.call(void 0, 1e3),
      args: {}
    });
    return _nullishCoalesce(amount, () => ( 0n));
  }
  // ========== High-Level Merkle Tree Methods ==========
  /**
   * Adds a merkle root from a MerkleTree instance.
   * This is a convenience method that extracts the root from the tree.
   *
   * @example
   * ```ts
   * const tree = MerkleTree.ofSimple([1n, 2n, 3n], SchemaPart.Uint64);
   * await sdk.addRootFromTree({ name: 'my-tree', tree, type: 1n });
   * ```
   */
  async addRootFromTree({
    sender,
    signer,
    name,
    tree,
    type
  }) {
    return this.addRoot({
      sender,
      signer,
      name,
      root: tree.root,
      type
    });
  }
  /**
   * Verifies a leaf from a MerkleTree instance.
   * This is a convenience method that extracts the leaf hash and proof from the tree.
   *
   * @example
   * ```ts
   * const tree = MerkleTree.ofSimple([1n, 2n, 3n], SchemaPart.Uint64);
   * const isValid = await sdk.verifyFromTree({
   *   address: creatorAddress,
   *   name: 'my-tree',
   *   tree,
   *   index: 0, // verify the first leaf
   *   type: 1n,
   * });
   * ```
   */
  async verifyFromTree({
    address,
    name,
    tree,
    index,
    type
  }) {
    return this.verify({
      address,
      name,
      leaf: tree.getLeafHash(index),
      proof: tree.getProof(index),
      type
    });
  }
  /**
   * Verifies and reads metadata using a MerkleTree instance.
   *
   * @example
   * ```ts
   * const tree = MerkleTree.ofSimple([1n, 2n, 3n], SchemaPart.Uint64);
   * const royalty = await sdk.verifiedReadFromTree({
   *   address: creatorAddress,
   *   name: 'my-tree',
   *   tree,
   *   index: 0,
   *   type: 1n,
   *   key: 'royalty',
   * });
   * ```
   */
  async verifiedReadFromTree({
    address,
    name,
    tree,
    index,
    type,
    key
  }) {
    return this.verifiedRead({
      address,
      name,
      leaf: tree.getLeafHash(index),
      proof: tree.getProof(index),
      type,
      key
    });
  }
  /**
   * Verifies inclusion and reads metadata using a MerkleTree instance.
   * Throws if verification fails.
   */
  async verifiedMustReadFromTree({
    address,
    name,
    tree,
    index,
    type,
    key
  }) {
    return this.verifiedMustRead({
      address,
      name,
      leaf: tree.getLeafHash(index),
      proof: tree.getProof(index),
      type,
      key
    });
  }
  /** One box fetch returns the published revision and data together. */
  async readRecord(account, recordKey) {
    const name = metadataBoxName(account, recordKey);
    try {
      return decodeMetadataRecord(await this.algorand.app.getBoxValue(this.appId, name));
    } catch (error) {
      if (error instanceof Error && error.message.includes("box not found"))
        return { exists: false, revision: 0n, data: new Uint8Array() };
      throw error;
    }
  }
  async setRecord(args) {
    const { data, expectedRevision } = args;
    const key = metadataKeyBytes(args.key);
    metadataStorageCost(data.length, key);
    const sendParams = this.getRequiredSendParams(args);
    const cost = await this.client.recordCost({
      ...this.getReaderSendParams({}),
      args: { account: sendParams.sender.toString(), key, size: data.length }
    });
    return this.client.send.setRecord({
      ...sendParams,
      args: {
        payment: this.algorand.createTransaction.payment({
          sender: sendParams.sender,
          signer: sendParams.signer,
          receiver: this.client.appAddress,
          amount: _algokitutils.microAlgo.call(void 0, cost)
        }),
        key,
        ...metadataDataParts(data),
        expectedRevision
      },
      extraFee: _algokitutils.microAlgo.call(void 0, 1e3)
    });
  }
  async removeRecord(args) {
    const { expectedRevision } = args;
    const key = metadataKeyBytes(args.key);
    validateMetadataRecordKey(key);
    return this.client.send.removeRecord({
      ...this.getRequiredSendParams(args),
      args: { key, expectedRevision },
      extraFee: _algokitutils.microAlgo.call(void 0, 1e3)
    });
  }
  /** Discover complete owners and keys directly from box names. */
  async listRecordKeys(filter = {}) {
    const records = [];
    const prefix = filter.account === void 0 ? new Uint8Array([109]) : new Uint8Array([109, ..._algosdk.decodeAddress.call(void 0, filter.account).publicKey, ..._nullishCoalesce(filter.keyPrefix, () => ( []))]);
    let next;
    let round;
    do {
      const request = this.algorand.client.algod.getApplicationBoxes(this.appId).prefix(prefix).limit(1e3).next(next);
      if (round !== void 0) request.round(round);
      const page = await request.do();
      round ??= page.round;
      for (const box of page.boxes) {
        const record = decodeMetadataBoxName(box.name);
        if ((filter.account === void 0 || record.account === filter.account) && (filter.keyPrefix === void 0 || filter.keyPrefix.every((byte, i) => record.key[i] === byte))) records.push(record);
      }
      next = page.nextToken;
    } while (next);
    return records;
  }
};






































exports.METADATA_MAX_NAME_BYTES = METADATA_MAX_NAME_BYTES; exports.METADATA_MAX_KEY_BYTES = METADATA_MAX_KEY_BYTES; exports.METADATA_RECORD_HEADER_BYTES = METADATA_RECORD_HEADER_BYTES; exports.METADATA_MAX_APP_ARGS_BYTES = METADATA_MAX_APP_ARGS_BYTES; exports.METADATA_MAX_VALUE_BYTES = METADATA_MAX_VALUE_BYTES; exports.METADATA_FINAL_PART_BYTES = METADATA_FINAL_PART_BYTES; exports.METADATA_PART_BYTES = METADATA_PART_BYTES; exports.METADATA_INLINE_BYTES = METADATA_INLINE_BYTES; exports.METADATA_CHUNK_BYTES = METADATA_CHUNK_BYTES; exports.validateMetadataName = validateMetadataName; exports.metadataKeyBytes = metadataKeyBytes; exports.validateMetadataRecordKey = validateMetadataRecordKey; exports.metadataDataKey = metadataDataKey; exports.metadataOwnerKey = metadataOwnerKey; exports.metadataBoxName = metadataBoxName; exports.decodeMetadataBoxName = decodeMetadataBoxName; exports.decodeMetadataRecord = decodeMetadataRecord; exports.metadataValueLimit = metadataValueLimit; exports.metadataPluginValueLimit = metadataPluginValueLimit; exports.validateMetadataValueSize = validateMetadataValueSize; exports.metadataDataParts = metadataDataParts; exports.metadataStorageCost = metadataStorageCost; exports.RECEIVE_QR_RECORD = RECEIVE_QR_RECORD; exports.ACCOUNT_IMAGE_RECORD = ACCOUNT_IMAGE_RECORD; exports.encodeMetadataJson = encodeMetadataJson; exports.MetaFactory = MetaFactory; exports.MetaClient = MetaClient; exports.META_MERKLES_ERROR_MESSAGES = META_MERKLES_ERROR_MESSAGES; exports.translateMetaError = translateMetaError; exports.isReceiveQrStyleV1 = isReceiveQrStyleV1; exports.isAccountImageReferenceV1 = isAccountImageReferenceV1; exports.parseReceiveQrStyle = parseReceiveQrStyle; exports.parseAccountImageReference = parseAccountImageReference; exports.encodeReceiveQrStyle = encodeReceiveQrStyle; exports.encodeAccountImageReference = encodeAccountImageReference; exports.MetaSDK = MetaSDK;
//# sourceMappingURL=chunk-GUIEEGBO.js.map
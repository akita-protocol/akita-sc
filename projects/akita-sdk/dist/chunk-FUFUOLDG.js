"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } async function _asyncNullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return await rhsFn(); } } var _class; var _class2;


var _chunkZGCVKZRLjs = require('./chunk-ZGCVKZRL.js');


var _chunk7VSUJWG7js = require('./chunk-7VSUJWG7.js');


var _chunkLNVZHCCXjs = require('./chunk-LNVZHCCX.js');

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
var APP_SPEC = { "name": "Meta", "structs": { "MetaRecordInfo": [{ "name": "exists", "type": "bool" }, { "name": "revision", "type": "uint64" }, { "name": "size", "type": "uint64" }], "MetaRecordRead": [{ "name": "exists", "type": "bool" }, { "name": "revision", "type": "uint64" }, { "name": "data", "type": "byte[]" }], "MetaRecordValue": [{ "name": "revision", "type": "uint64" }, { "name": "data", "type": "byte[]" }], "RootValue": [{ "name": "root", "type": "byte[32]" }, { "name": "type", "type": "uint64" }], "TypesValue": [{ "name": "schema", "type": "string" }, { "name": "description", "type": "string" }], "EscrowConfig": [{ "name": "name", "type": "string" }, { "name": "app", "type": "uint64" }] }, "methods": [{ "name": "create", "args": [{ "type": "string", "name": "version" }, { "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "Read-only resource carrier for box access.", "events": [], "recommendations": {} }, { "name": "addRoot", "args": [{ "type": "pay", "name": "payment" }, { "type": "string", "name": "name", "desc": "the name alias of the root being added" }, { "type": "byte[32]", "name": "root", "desc": "a merkle tree root" }, { "type": "uint64", "name": "type", "desc": "an index of the tree type enum from box storage" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Stores a Merkle root and its schema type together. Attached values\nuse the shared record store and may exist before or after the root.", "events": [], "recommendations": {} }, { "name": "deleteRoot", "args": [{ "type": "string", "name": "name", "desc": "the name of the merkle tree root" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Deletes the merkle root from the root box map", "events": [], "recommendations": {} }, { "name": "updateRoot", "args": [{ "type": "string", "name": "name", "desc": "the name of the merkle group data" }, { "type": "byte[32]", "name": "newRoot", "desc": "the new 32 byte merkle tree root" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Replaces the merkle root with another", "events": [], "recommendations": {} }, { "name": "addData", "args": [{ "type": "pay", "name": "payment" }, { "type": "string", "name": "name", "desc": "the name of the merkle tree root" }, { "type": "string", "name": "key", "desc": "the metadata key eg. `Royalty`" }, { "type": "string", "name": "value", "desc": "the metadata value eg. `5` encoded as a bytestring for 5%" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Publishes a value in the shared record store for an existing Merkle root.", "events": [], "recommendations": {} }, { "name": "deleteData", "args": [{ "type": "string", "name": "name", "desc": "the name of the merkle tree root" }, { "type": "string", "name": "key", "desc": "the metadata key you want to remove" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Removes the shared record for a Merkle data key.", "events": [], "recommendations": {} }, { "name": "verify", "args": [{ "type": "address", "name": "address", "desc": "the address of the merkle tree root creator" }, { "type": "string", "name": "name", "desc": "The name alias of the root" }, { "type": "byte[32]", "name": "leaf", "desc": "The hashed leaf to verify" }, { "type": "byte[32][]", "name": "proof", "desc": "The merkle proof" }, { "type": "uint64", "name": "type", "desc": "The type check for the lists purpose" }], "returns": { "type": "bool", "desc": "a boolean indicating whether the proof is valid" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "verify an inclusion in a double sha256 based merkle tree", "events": [], "recommendations": {} }, { "name": "read", "args": [{ "type": "address", "name": "address", "desc": "the address of the merkle tree root creator" }, { "type": "string", "name": "name", "desc": "the name of the merkle tree root" }, { "type": "string", "name": "key", "desc": "the metadata key eg. `Royalty`" }], "returns": { "type": "string", "desc": "the value set eg. `5` encoded as a bytestring for 5%" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "Fetch a metadata properties", "events": [], "recommendations": {} }, { "name": "verifiedRead", "args": [{ "type": "address", "name": "address", "desc": "the address of the merkle tree root creator" }, { "type": "string", "name": "name", "desc": "the name of the root" }, { "type": "byte[32]", "name": "leaf", "desc": "the leaf node to be verified" }, { "type": "byte[32][]", "name": "proof", "desc": "the proof the hash is included" }, { "type": "uint64", "name": "type", "desc": "the list type that helps contracts ensure\nthe lists purpose isn't being misused ( 0 if the caller doesnt care )" }, { "type": "string", "name": "key", "desc": "the metadata key eg. `Royalty`" }], "returns": { "type": "string", "desc": "a string of metadata" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Read metadata from box storage and verify the data provided is included\nin the merkle tree given a sha256'd 32 byte merkle tree root & a proof\nthats pre-computed off chain.\n\nverify an inclusion in a merkle tree\n& read an associated key value pair\n& check against the underlying data's schema\n& check against the underlying data's list type or purpose", "events": [], "recommendations": {} }, { "name": "verifiedMustRead", "args": [{ "type": "address", "name": "address", "desc": "the address of the merkle tree root creator" }, { "type": "string", "name": "name", "desc": "the name of the root" }, { "type": "byte[32]", "name": "leaf", "desc": "the leaf node to be verified" }, { "type": "byte[32][]", "name": "proof", "desc": "the proof the hash is included" }, { "type": "uint64", "name": "type", "desc": "the list type that helps contracts ensure\nthe lists purpose isn't being misused ( 0 if the caller doesnt care )" }, { "type": "string", "name": "key", "desc": "the metadata key eg. `Royalty`" }], "returns": { "type": "string", "desc": "a string of metadata" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Read metadata from box storage and verify the data provided is included\nin the merkle tree given a sha256'd 32 byte merkle tree root & a proof\nthats pre-computed off chain.\n\nverify an inclusion in a merkle tree\n& read an associated key value pair\n& check against the underlying data's schema\n& check against the underlying data's list type or purpose", "events": [], "recommendations": {} }, { "name": "addType", "args": [{ "type": "pay", "name": "payment" }, { "type": "string", "name": "description" }, { "type": "uint8[]", "name": "schemaList" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "collectTypeFees", "args": [], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Sends the type fees collected so far to the DAO's revenue escrow and returns the amount sent.\nAnyone may call it: the receiver and the amount both come from this app's state. It fails until\nthe DAO has named the escrow with `updateAkitaDAOEscrow`. The payment never takes the app below\nits minimum balance; whatever cannot be sent yet stays owed for a later call.", "events": [], "recommendations": {} }, { "name": "rootCosts", "args": [{ "type": "string", "name": "name" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "dataCosts", "args": [{ "type": "string", "name": "name" }, { "type": "string", "name": "key" }, { "type": "string", "name": "value" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "recordInfo", "args": [{ "type": "address", "name": "account" }, { "type": "byte[]", "name": "key" }], "returns": { "type": "(bool,uint64,uint64)", "struct": "MetaRecordInfo" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "readRecord", "args": [{ "type": "address", "name": "account" }, { "type": "byte[]", "name": "key" }], "returns": { "type": "(bool,uint64,byte[])", "struct": "MetaRecordRead" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "readRecordSlice", "args": [{ "type": "address", "name": "account" }, { "type": "byte[]", "name": "key" }, { "type": "uint64", "name": "offset" }, { "type": "uint64", "name": "length" }, { "type": "uint64", "name": "expectedRevision" }], "returns": { "type": "byte[]" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "recordCost", "args": [{ "type": "address", "name": "account" }, { "type": "byte[]", "name": "key" }, { "type": "uint64", "name": "size" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "setRecord", "args": [{ "type": "pay", "name": "payment" }, { "type": "byte[]", "name": "key" }, { "type": "byte[]", "name": "data0" }, { "type": "byte[]", "name": "data1" }, { "type": "byte[]", "name": "data2" }, { "type": "byte[]", "name": "data3" }, { "type": "uint64", "name": "expectedRevision" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "All four parts are published in this call; no intermediate record is observable.", "events": [], "recommendations": {} }, { "name": "removeRecord", "args": [{ "type": "byte[]", "name": "key" }, { "type": "uint64", "name": "expectedRevision" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "setPolicyWriter", "args": [{ "type": "uint64", "name": "writer" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Set the MetaPlugin allowed to write grant policies. The DAO wallet sets it; before the DAO has a\nwallet (initial deployment), the creator may.", "events": [], "recommendations": {} }, { "name": "setPolicy", "args": [{ "type": "pay", "name": "payment" }, { "type": "uint64", "name": "wallet" }, { "type": "byte[]", "name": "key" }, { "type": "byte[]", "name": "data" }, { "type": "uint64", "name": "expectedRevision" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Create or replace a grant policy owned by `wallet`'s controlled address. Only the registered\nwriter may call it, inside an admin window on `wallet` (see requirePolicyWindow).", "events": [], "recommendations": {} }, { "name": "removePolicy", "args": [{ "type": "uint64", "name": "wallet" }, { "type": "byte[]", "name": "key" }, { "type": "uint64", "name": "expectedRevision" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Remove a grant policy owned by `wallet`'s controlled address; its storage goes back to its payer.", "events": [], "recommendations": {} }, { "name": "updateAkitaDAOEscrow", "args": [{ "type": "(string,uint64)", "struct": "EscrowConfig", "name": "config" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "update", "args": [{ "type": "string", "name": "newVersion" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["UpdateApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 4, "bytes": 2 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "typesID": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "dHlwZXNfaWQ=" }, "typeFees": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "dHlwZV9mZWVz", "desc": "Type fees collected and not yet sent to the DAO's revenue escrow (AUD-C7). Each fee is counted\nless the storage its type occupies, so this is never more than what the app can spare." }, "policyWriter": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cG9saWN5X3dyaXRlcg==", "desc": "The one MetaPlugin allowed to write grant policies, set by the DAO wallet. Policies are owned by\neach wallet's controlled address, so rotating the writer keeps them readable and editable." }, "akitaDAOEscrow": { "keyType": "AVMString", "valueType": "EscrowConfig", "key": "YWtpdGFfZXNjcm93", "desc": "the named DAO escrow this contract routes fees to (name + app)" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" } }, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": { "types": { "keyType": "uint64", "valueType": "TypesValue", "desc": "the types (intents) of merkle trees that exist", "prefix": "dA==" }, "roots": { "keyType": "AVMBytes", "valueType": "RootValue", "desc": "the merkle roots we want to attach data to", "prefix": "cg==" }, "records": { "keyType": "AVMBytes", "valueType": "MetaRecordValue", "desc": "One value store for arbitrary keys and Merkle-attached metadata.", "prefix": "bQ==" } } } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [1299, 2999, 3792, 3913, 3953, 4040, 4317, 4713], "errorMessage": "Box must have value" }, { "pc": [1141, 1924], "errorMessage": "ERR:errDtl" }, { "pc": [1820], "errorMessage": "ERR:errFvri" }, { "pc": [882, 1269, 1908], "errorMessage": "ERR:errIpma" }, { "pc": [845, 1233, 1895], "errorMessage": "ERR:errIpmr" }, { "pc": [4643], "errorMessage": "ERR:errIpyr" }, { "pc": [3520], "errorMessage": "ERR:errIupg" }, { "pc": [1112, 1127, 3616], "errorMessage": "ERR:errKtl" }, { "pc": [1089, 3586], "errorMessage": "ERR:errMkey" }, { "pc": [746, 1079], "errorMessage": "ERR:errMnam" }, { "pc": [4775], "errorMessage": "ERR:errMnpk" }, { "pc": [3145, 4665], "errorMessage": "ERR:errMpky" }, { "pc": [4444], "errorMessage": "ERR:errMpmt" }, { "pc": [4242], "errorMessage": "ERR:errMprt" }, { "pc": [4909, 4953], "errorMessage": "ERR:errMpwn" }, { "pc": [4813], "errorMessage": "ERR:errMpwr" }, { "pc": [2825, 4297, 4710], "errorMessage": "ERR:errMrev" }, { "pc": [2814, 4697], "errorMessage": "ERR:errMrnf" }, { "pc": [2873], "errorMessage": "ERR:errMrng" }, { "pc": [4109], "errorMessage": "ERR:errMrsl" }, { "pc": [2340], "errorMessage": "ERR:errMsch" }, { "pc": [2965, 4284], "errorMessage": "ERR:errMvsz" }, { "pc": [3225, 3442, 3485, 3557], "errorMessage": "ERR:errNdao" }, { "pc": [1470, 3979], "errorMessage": "ERR:errNdta" }, { "pc": [2477], "errorMessage": "ERR:errNesc" }, { "pc": [938, 1e3], "errorMessage": "ERR:errNnam" }, { "pc": [1213], "errorMessage": "ERR:errNrfd" }, { "pc": [832], "errorMessage": "ERR:errNtkn" }, { "pc": [771], "errorMessage": "ERR:errNtl" }, { "pc": [798], "errorMessage": "ERR:errNtrt" }, { "pc": [1188, 1447], "errorMessage": "ERR:errRkp" }, { "pc": [2361, 2423, 2484, 2488, 2496, 2500], "errorMessage": "account funded" }, { "pc": [2548, 3237, 3435, 3478, 3550, 4926], "errorMessage": "application exists" }, { "pc": [2349, 2429, 2454, 2505, 2515, 2531, 2543, 3206, 3428, 3471, 3490, 3543, 4784], "errorMessage": "check GlobalState exists" }, { "pc": [1947, 3882], "errorMessage": "index access is out of bounds" }, { "pc": [1004, 3709, 4124], "errorMessage": "index out of bounds" }, { "pc": [656, 706, 907, 960, 1025, 1042, 1060, 1372, 1388, 1496, 1520, 1570, 1586, 1628, 1655, 1680, 1735, 1762, 1787, 1855, 1875, 2580, 2610, 2626, 2642, 2683, 2716, 2751, 2924, 3046, 3063, 3080, 3097, 3114, 3161, 3266, 3282, 3346, 3416, 3454, 3819], "errorMessage": "invalid array length header" }, { "pc": [663, 713, 914, 967, 1032, 1049, 1067, 1379, 1395, 1503, 1577, 1593, 1635, 1687, 1742, 1794, 1862, 1884, 2587, 2617, 2633, 2649, 2690, 2723, 2758, 2931, 3053, 3070, 3087, 3104, 3121, 3168, 3273, 3289, 3353, 3461], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [1529, 1664, 1771], "errorMessage": "invalid number of bytes for arc4.dynamic_array<bytes[32]>" }, { "pc": [727, 980, 1490, 1514, 1564, 1622, 1649, 1729, 1756, 2677, 2710, 2745, 2918], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [675, 736, 1538, 1673, 1780, 2773, 2785, 2797, 2946, 3134, 3180, 3200, 3259, 3301, 3339, 3365, 3535], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [3421], "errorMessage": "invalid number of bytes for smart_contracts/utils/base-contracts/base.ts::EscrowConfig" }, { "pc": [3408], "errorMessage": "invalid tail pointer at index 0 of ((len+utf8[]),uint64)" }, { "pc": [3403], "errorMessage": "invalid tuple encoding" }, { "pc": [3623, 4500], "errorMessage": "overflow" }, { "pc": [700, 1019, 1849, 3040, 3250], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDEzCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCiNwcmFnbWEgYXV0b3NhbHQgZmFsc2UKCi8vIEBhbGdvcmFuZGZvdW5kYXRpb24vYWxnb3JhbmQtdHlwZXNjcmlwdC9hcmM0L2luZGV4LmQudHM6OkNvbnRyYWN0LmFwcHJvdmFsUHJvZ3JhbSgpIC0+IHVpbnQ2NDoKbWFpbjoKICAgIGludGNibG9jayAwIDEgMiAzMiAyODUwMCA0MDAgMzE3MDAgMTAyNCA0MDk0IDEwMDAwMDAwMCAxNjM4NAogICAgYnl0ZWNibG9jayAweDE1MWY3Yzc1ICIiICJtIiAidHlwZV9mZWVzIiAiYWtpdGFfZGFvIiAiciIgImFraXRhX2VzY3JvdyIgIndhbGxldCIgIkVSUjplcnJOZGFvIiAidHlwZXNfaWQiICIkIiAiRVJSOmVycklwbXIiICJFUlI6ZXJySXBtYSIgIkVSUjplcnJLdGwiICJFUlI6ZXJyTXJldiIgInZlcnNpb24iICJFUlI6ZXJyTW5hbSIgIkVSUjplcnJObmFtIiAiRVJSOmVyck1rZXkiICJFUlI6ZXJyRHRsIiAibC4iICJFUlI6ZXJyUmtwIiAiRVJSOmVyck5kdGEiICJFUlI6ZXJyTXJuZiIgIkVSUjplcnJNdnN6IiAiRVJSOmVyck1wa3kiICJwb2xpY3lfd3JpdGVyIiAweDA2ODEwMSAiRVJSOmVyck1wd24iCiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgYm56IG1haW5fYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjEzMwogICAgLy8gdHlwZXNJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogTWV0YUdsb2JhbFN0YXRlS2V5VHlwZXNJRCB9KQogICAgYnl0ZWMgOSAvLyAidHlwZXNfaWQiCiAgICBpbnRjXzAgLy8gMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTM4CiAgICAvLyB0eXBlRmVlcyA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogTWV0YUdsb2JhbFN0YXRlS2V5VHlwZUZlZXMgfSkKICAgIGJ5dGVjXzMgLy8gInR5cGVfZmVlcyIKICAgIGludGNfMCAvLyAwCiAgICBhcHBfZ2xvYmFsX3B1dAoKbWFpbl9hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjEyNS0xMjYKICAgIC8vIEBjb250cmFjdCh7IGF2bVZlcnNpb246IDEzIH0pCiAgICAvLyBleHBvcnQgY2xhc3MgTWV0YSBleHRlbmRzIEFraXRhQmFzZUZlZUdlbmVyYXRvckNvbnRyYWN0V2l0aG91dEFraXRhT3B0SW4gewogICAgcHVzaGJ5dGVzIDB4ZWE5MTgwZGQgLy8gbWV0aG9kICJ1cGRhdGUoc3RyaW5nKXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBtYWluX3VwZGF0ZV9yb3V0ZUA0CgptYWluX3N3aXRjaF9jYXNlX25leHRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTI1LTEyNgogICAgLy8gQGNvbnRyYWN0KHsgYXZtVmVyc2lvbjogMTMgfSkKICAgIC8vIGV4cG9ydCBjbGFzcyBNZXRhIGV4dGVuZHMgQWtpdGFCYXNlRmVlR2VuZXJhdG9yQ29udHJhY3RXaXRob3V0QWtpdGFPcHRJbiB7CiAgICB0eG4gT25Db21wbGV0aW9uCiAgICAhCiAgICBhc3NlcnQKICAgIHR4biBBcHBsaWNhdGlvbklECiAgICBieiBtYWluX2NyZWF0ZV9Ob09wQDMzCiAgICBwdXNoYnl0ZXNzIDB4ODU0ZGVkZTAgMHhhMjRjMDY3YyAweGRmMjg3YTdkIDB4YzZkM2Q3MDQgMHg0MmZjNzIwMiAweDA2ZDM4OTA0IDB4MmJmM2NjNWEgMHg1MGMzNmU0MSAweDBjZjFiOWNmIDB4MWZmN2M3NGMgMHgzOWMxN2RlZCAweGEwM2Y5ZDlkIDB4NzJiMjU5ODEgMHg3NjgzY2QyNSAweDlhNDYwNjFkIDB4NTAxZDNlYjIgMHg1ODZhYjM0ZSAweGQwYjYyODAyIDB4YjFlNmQ0ZmIgMHgxN2QzZDA1YiAweDQyZWQ2YTFhIDB4NjdmZjQwY2EgMHg3NWM2NDA0MiAweGFlODRjYmQ4IDB4MzNlOTJjOTQgLy8gbWV0aG9kICJvcFVwKCl2b2lkIiwgbWV0aG9kICJhZGRSb290KHBheSxzdHJpbmcsYnl0ZVszMl0sdWludDY0KXZvaWQiLCBtZXRob2QgImRlbGV0ZVJvb3Qoc3RyaW5nKXZvaWQiLCBtZXRob2QgInVwZGF0ZVJvb3Qoc3RyaW5nLGJ5dGVbMzJdKXZvaWQiLCBtZXRob2QgImFkZERhdGEocGF5LHN0cmluZyxzdHJpbmcsc3RyaW5nKXZvaWQiLCBtZXRob2QgImRlbGV0ZURhdGEoc3RyaW5nLHN0cmluZyl2b2lkIiwgbWV0aG9kICJ2ZXJpZnkoYWRkcmVzcyxzdHJpbmcsYnl0ZVszMl0sYnl0ZVszMl1bXSx1aW50NjQpYm9vbCIsIG1ldGhvZCAicmVhZChhZGRyZXNzLHN0cmluZyxzdHJpbmcpc3RyaW5nIiwgbWV0aG9kICJ2ZXJpZmllZFJlYWQoYWRkcmVzcyxzdHJpbmcsYnl0ZVszMl0sYnl0ZVszMl1bXSx1aW50NjQsc3RyaW5nKXN0cmluZyIsIG1ldGhvZCAidmVyaWZpZWRNdXN0UmVhZChhZGRyZXNzLHN0cmluZyxieXRlWzMyXSxieXRlWzMyXVtdLHVpbnQ2NCxzdHJpbmcpc3RyaW5nIiwgbWV0aG9kICJhZGRUeXBlKHBheSxzdHJpbmcsdWludDhbXSl2b2lkIiwgbWV0aG9kICJjb2xsZWN0VHlwZUZlZXMoKXVpbnQ2NCIsIG1ldGhvZCAicm9vdENvc3RzKHN0cmluZyl1aW50NjQiLCBtZXRob2QgImRhdGFDb3N0cyhzdHJpbmcsc3RyaW5nLHN0cmluZyl1aW50NjQiLCBtZXRob2QgInJlY29yZEluZm8oYWRkcmVzcyxieXRlW10pKGJvb2wsdWludDY0LHVpbnQ2NCkiLCBtZXRob2QgInJlYWRSZWNvcmQoYWRkcmVzcyxieXRlW10pKGJvb2wsdWludDY0LGJ5dGVbXSkiLCBtZXRob2QgInJlYWRSZWNvcmRTbGljZShhZGRyZXNzLGJ5dGVbXSx1aW50NjQsdWludDY0LHVpbnQ2NClieXRlW10iLCBtZXRob2QgInJlY29yZENvc3QoYWRkcmVzcyxieXRlW10sdWludDY0KXVpbnQ2NCIsIG1ldGhvZCAic2V0UmVjb3JkKHBheSxieXRlW10sYnl0ZVtdLGJ5dGVbXSxieXRlW10sYnl0ZVtdLHVpbnQ2NCl1aW50NjQiLCBtZXRob2QgInJlbW92ZVJlY29yZChieXRlW10sdWludDY0KXVpbnQ2NCIsIG1ldGhvZCAic2V0UG9saWN5V3JpdGVyKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJzZXRQb2xpY3kocGF5LHVpbnQ2NCxieXRlW10sYnl0ZVtdLHVpbnQ2NCl1aW50NjQiLCBtZXRob2QgInJlbW92ZVBvbGljeSh1aW50NjQsYnl0ZVtdLHVpbnQ2NCl1aW50NjQiLCBtZXRob2QgInVwZGF0ZUFraXRhREFPRXNjcm93KChzdHJpbmcsdWludDY0KSl2b2lkIiwgbWV0aG9kICJ1cGRhdGVBa2l0YURBTyh1aW50NjQpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIG1haW5fb3BVcF9yb3V0ZUA3IGFkZFJvb3QgZGVsZXRlUm9vdCB1cGRhdGVSb290IGFkZERhdGEgZGVsZXRlRGF0YSB2ZXJpZnkgcmVhZCB2ZXJpZmllZFJlYWQgdmVyaWZpZWRNdXN0UmVhZCBhZGRUeXBlIGNvbGxlY3RUeXBlRmVlcyByb290Q29zdHMgZGF0YUNvc3RzIHJlY29yZEluZm8gcmVhZFJlY29yZCByZWFkUmVjb3JkU2xpY2UgcmVjb3JkQ29zdCBzZXRSZWNvcmQgcmVtb3ZlUmVjb3JkIHNldFBvbGljeVdyaXRlciBzZXRQb2xpY3kgcmVtb3ZlUG9saWN5IHVwZGF0ZUFraXRhREFPRXNjcm93IHVwZGF0ZUFraXRhREFPCiAgICBlcnIKCm1haW5fb3BVcF9yb3V0ZUA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyMzQKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKbWFpbl9jcmVhdGVfTm9PcEAzMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTI1LTEyNgogICAgLy8gQGNvbnRyYWN0KHsgYXZtVmVyc2lvbjogMTMgfSkKICAgIC8vIGV4cG9ydCBjbGFzcyBNZXRhIGV4dGVuZHMgQWtpdGFCYXNlRmVlR2VuZXJhdG9yQ29udHJhY3RXaXRob3V0QWtpdGFPcHRJbiB7CiAgICBwdXNoYnl0ZXMgMHhjZDlhZDY3ZSAvLyBtZXRob2QgImNyZWF0ZShzdHJpbmcsdWludDY0KXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBjcmVhdGUKICAgIGVycgoKbWFpbl91cGRhdGVfcm91dGVANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozNQogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICB0eG4gT25Db21wbGV0aW9uCiAgICBwdXNoaW50IDQgLy8gVXBkYXRlQXBwbGljYXRpb24KICAgID09CiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgJiYKICAgIGFzc2VydAogICAgYiB1cGRhdGUKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpyZWNvcmRQYXllcihyZWNvcmQ6IGJ5dGVzLCBwYXllcjogYnl0ZXMsIG93bmVyOiBieXRlcykgLT4gdm9pZDoKcmVjb3JkUGF5ZXI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwNQogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIHJlY29yZFBheWVyKHJlY29yZDogYnl0ZXMsIHBheWVyOiBBY2NvdW50LCBvd25lcjogQWNjb3VudCk6IHZvaWQgewogICAgcHJvdG8gMyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwNgogICAgLy8gaWYgKHBheWVyICE9PSBvd25lcikgewogICAgZnJhbWVfZGlnIC0yCiAgICBmcmFtZV9kaWcgLTEKICAgICE9CiAgICBieiByZWNvcmRQYXllcl9hZnRlcl9pZl9lbHNlQDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTYKICAgIC8vIHJldHVybiBCeXRlcyhQYXllckJveFByZWZpeCkuY29uY2F0KHNoYTI1NihyZWNvcmQpKQogICAgZnJhbWVfZGlnIC0zCiAgICBzaGEyNTYKICAgIGJ5dGVjIDEwIC8vICIkIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwNwogICAgLy8gb3AuQm94LnB1dChwYXllclJlY29yZEtleShyZWNvcmQpLCBwYXllci5ieXRlcykKICAgIGZyYW1lX2RpZyAtMgogICAgYm94X3B1dAoKcmVjb3JkUGF5ZXJfYWZ0ZXJfaWZfZWxzZUAyOgogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6cGF5ZXJPZihyZWNvcmQ6IGJ5dGVzLCBvd25lcjogYnl0ZXMpIC0+IGJ5dGVzOgpwYXllck9mOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMTIKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiBwYXllck9mKHJlY29yZDogYnl0ZXMsIG93bmVyOiBBY2NvdW50KTogQWNjb3VudCB7CiAgICBwcm90byAyIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTYKICAgIC8vIHJldHVybiBCeXRlcyhQYXllckJveFByZWZpeCkuY29uY2F0KHNoYTI1NihyZWNvcmQpKQogICAgZnJhbWVfZGlnIC0yCiAgICBzaGEyNTYKICAgIGJ5dGVjIDEwIC8vICIkIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjExMwogICAgLy8gY29uc3QgW3BheWVyLCBzcG9uc29yZWRdID0gb3AuQm94LmdldChwYXllclJlY29yZEtleShyZWNvcmQpKQogICAgYm94X2dldAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMTQKICAgIC8vIHJldHVybiBzcG9uc29yZWQgPyBBY2NvdW50KHBheWVyKSA6IG93bmVyCiAgICBieiBwYXllck9mX3Rlcm5hcnlfZmFsc2VAMgogICAgcmV0c3ViCgpwYXllck9mX3Rlcm5hcnlfZmFsc2VAMjoKICAgIHBvcAogICAgZnJhbWVfZGlnIC0xCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjExNAogICAgLy8gcmV0dXJuIHNwb25zb3JlZCA/IEFjY291bnQocGF5ZXIpIDogb3duZXIKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmNhblJlY2VpdmVBbGdvKHJlY2VpdmVyOiBieXRlcywgYW1vdW50OiB1aW50NjQpIC0+IHVpbnQ2NDoKY2FuUmVjZWl2ZUFsZ286CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEyOQogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIGNhblJlY2VpdmVBbGdvKHJlY2VpdmVyOiBBY2NvdW50LCBhbW91bnQ6IHVpbnQ2NCk6IGJvb2xlYW4gewogICAgcHJvdG8gMiAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEzMAogICAgLy8gY29uc3QgWywgZnVuZGVkXSA9IG9wLkFjY3RQYXJhbXMuYWNjdEJhbGFuY2UocmVjZWl2ZXIpCiAgICBmcmFtZV9kaWcgLTIKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0QmFsYW5jZQogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEzMQogICAgLy8gcmV0dXJuIGZ1bmRlZCB8fCBhbW91bnQgPj0gR2xvYmFsLm1pbkJhbGFuY2UKICAgIGJueiBjYW5SZWNlaXZlQWxnb19ib29sX3RydWVAMgogICAgZnJhbWVfZGlnIC0xCiAgICBnbG9iYWwgTWluQmFsYW5jZQogICAgPj0KICAgIGJ6IGNhblJlY2VpdmVBbGdvX2Jvb2xfZmFsc2VAMwoKY2FuUmVjZWl2ZUFsZ29fYm9vbF90cnVlQDI6CiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMzEKICAgIC8vIHJldHVybiBmdW5kZWQgfHwgYW1vdW50ID49IEdsb2JhbC5taW5CYWxhbmNlCiAgICByZXRzdWIKCmNhblJlY2VpdmVBbGdvX2Jvb2xfZmFsc2VAMzoKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEzMQogICAgLy8gcmV0dXJuIGZ1bmRlZCB8fCBhbW91bnQgPj0gR2xvYmFsLm1pbkJhbGFuY2UKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnJlbGVhc2VEZXBvc2l0KHJlY29yZDogYnl0ZXMsIG93bmVyOiBieXRlcywgYW1vdW50OiB1aW50NjQpIC0+IGJ5dGVzOgpyZWxlYXNlRGVwb3NpdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTQwCiAgICAvLyBleHBvcnQgZnVuY3Rpb24gcmVsZWFzZURlcG9zaXQocmVjb3JkOiBieXRlcywgb3duZXI6IEFjY291bnQsIGFtb3VudDogdWludDY0KTogW0FjY291bnQsIHVpbnQ2NF0gewogICAgcHJvdG8gMyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk2CiAgICAvLyByZXR1cm4gQnl0ZXMoUGF5ZXJCb3hQcmVmaXgpLmNvbmNhdChzaGEyNTYocmVjb3JkKSkKICAgIGZyYW1lX2RpZyAtMwogICAgc2hhMjU2CiAgICBieXRlYyAxMCAvLyAiJCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE0MgogICAgLy8gY29uc3QgW3BheWVyLCBzcG9uc29yZWRdID0gb3AuQm94LmdldChrZXkpCiAgICBib3hfZ2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE0MwogICAgLy8gaWYgKCFzcG9uc29yZWQpIHsKICAgIGJueiByZWxlYXNlRGVwb3NpdF9hZnRlcl9pZl9lbHNlQDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTQ0CiAgICAvLyByZXR1cm4gW293bmVyLCBhbW91bnRdCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0b2IKICAgIGZyYW1lX2RpZyAtMgogICAgc3dhcAogICAgY29uY2F0CiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKcmVsZWFzZURlcG9zaXRfYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNDYKICAgIC8vIG9wLkJveC5kZWxldGUoa2V5KQogICAgc3dhcAogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE0NwogICAgLy8gY29uc3QgdG90YWw6IHVpbnQ2NCA9IGFtb3VudCArIFBheWVyUmVjb3JkTUJSCiAgICBmcmFtZV9kaWcgLTEKICAgIGludGMgNCAvLyAyODUwMAogICAgKwogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE0OAogICAgLy8gcmV0dXJuIFtjYW5SZWNlaXZlQWxnbyhBY2NvdW50KHBheWVyKSwgdG90YWwpID8gQWNjb3VudChwYXllcikgOiBvd25lciwgdG90YWxdCiAgICBkaWcgMgogICAgc3dhcAogICAgY2FsbHN1YiBjYW5SZWNlaXZlQWxnbwogICAgYnogcmVsZWFzZURlcG9zaXRfdGVybmFyeV9mYWxzZUA0CiAgICBzd2FwCgpyZWxlYXNlRGVwb3NpdF90ZXJuYXJ5X21lcmdlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE0OAogICAgLy8gcmV0dXJuIFtjYW5SZWNlaXZlQWxnbyhBY2NvdW50KHBheWVyKSwgdG90YWwpID8gQWNjb3VudChwYXllcikgOiBvd25lciwgdG90YWxdCiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHJldHN1YgoKcmVsZWFzZURlcG9zaXRfdGVybmFyeV9mYWxzZUA0OgogICAgYnVyeSAxCiAgICBmcmFtZV9kaWcgLTIKICAgIGIgcmVsZWFzZURlcG9zaXRfdGVybmFyeV9tZXJnZUA1CgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5jcmVhdGVbcm91dGluZ10oKSAtPiB2b2lkOgpjcmVhdGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjIyNgogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE0CiAgICAvLyB2ZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogR2xvYmFsU3RhdGVLZXlWZXJzaW9uIH0pCiAgICBieXRlYyAxNSAvLyAidmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MjI4CiAgICAvLyB0aGlzLnZlcnNpb24udmFsdWUgPSB2ZXJzaW9uCiAgICB1bmNvdmVyIDIKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlYyA0IC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjIyOQogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSA9IGFraXRhREFPCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyMzAKICAgIC8vIG9wLkFwcFBhcmFtc1NldC5hcHBGb3JlaWduQm94UmVhZHModHJ1ZSkKICAgIGludGNfMSAvLyAxCiAgICBhcHBfcGFyYW1zX3NldCBBcHBGb3JlaWduQm94UmVhZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MjI2CiAgICAvLyBAYWJpbWV0aG9kKHsgb25DcmVhdGU6ICdyZXF1aXJlJyB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEuYWRkUm9vdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmFkZFJvb3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjI0OAogICAgLy8gYWRkUm9vdChwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIG5hbWU6IHN0cmluZywgcm9vdDogYnl0ZXM8MzI+LCB0eXBlOiB1aW50NjQpOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIGR1cAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyNDkKICAgIC8vIGxvZ2dlZEFzc2VydChuYW1lICE9PSAnJywgZXJySW52YWxpZE5hbWUpCiAgICBieXRlY18xIC8vICIiCiAgICAhPQogICAgYm56IGFkZFJvb3RfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDE2IC8vICJFUlI6ZXJyTW5hbSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJNbmFtCgphZGRSb290X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyNTAKICAgIC8vIGxvZ2dlZEFzc2VydChCeXRlcyhuYW1lKS5sZW5ndGggPD0gTWF4UmVjb3JkS2V5Qnl0ZXMsIGVyck5hbWVUb29Mb25nKQogICAgZGlnIDIKICAgIGxlbgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBwdXNoaW50IDMxCiAgICA8PQogICAgYm56IGFkZFJvb3RfYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOmVyck50bCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOdGwKCmFkZFJvb3RfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjI1MQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMudHlwZXModHlwZSkuZXhpc3RzLCBlcnJOb1RyZWVUeXBlKQogICAgaXRvYgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjE0OAogICAgLy8gdHlwZXMgPSBCb3hNYXA8dWludDY0LCBUeXBlc1ZhbHVlPih7IGtleVByZWZpeDogTWV0YUJveFByZWZpeFR5cGVzIH0pCiAgICBwdXNoYnl0ZXMgInQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MjUxCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy50eXBlcyh0eXBlKS5leGlzdHMsIGVyck5vVHJlZVR5cGUpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBhZGRSb290X2FmdGVyX2Fzc2VydEA3CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJOdHJ0IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck50cnQKCmFkZFJvb3RfYWZ0ZXJfYXNzZXJ0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjI1MwogICAgLy8gY29uc3Qgcm9vdEtleSA9IHRoaXMucmVjb3JkS2V5KFR4bi5zZW5kZXIsIEJ5dGVzKG5hbWUpKQogICAgdHhuIFNlbmRlcgogICAgdW5jb3ZlciA0CiAgICBjYWxsc3ViIHJlY29yZEtleQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxNTAKICAgIC8vIHJvb3RzID0gQm94TWFwPGJ5dGVzLCBSb290VmFsdWU+KHsga2V5UHJlZml4OiBNZXRhQm94UHJlZml4Um9vdHMgfSkKICAgIGJ5dGVjIDUgLy8gInIiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgY292ZXIgNAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyNTQKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5yb290cyhyb290S2V5KS5leGlzdHMsIGVyck5hbWVUYWtlbikKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogYWRkUm9vdF9hZnRlcl9hc3NlcnRAOQogICAgcHVzaGJ5dGVzICJFUlI6ZXJyTnRrbiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOdGtuCgphZGRSb290X2FmdGVyX2Fzc2VydEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyNTUKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJySW52YWxpZFBheW1lbnRSZWNlaXZlcikKICAgIGRpZyA0CiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogYWRkUm9vdF9hZnRlcl9hc3NlcnRAMTEKICAgIGJ5dGVjIDExIC8vICJFUlI6ZXJySXBtciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcG1yCgphZGRSb290X2FmdGVyX2Fzc2VydEAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MjU3CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IHRoaXMucm9vdENvc3RzKG5hbWUpICsgc3BvbnNvckNvc3QocGF5bWVudC5zZW5kZXIsIFR4bi5zZW5kZXIpLCBlcnJJbnZhbGlkUGF5bWVudEFtb3VudCkKICAgIHVuY292ZXIgNAogICAgZHVwCiAgICBndHhucyBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTUwCiAgICAvLyByZXR1cm4gMzFfNzAwICsgNDAwICogQnl0ZXMobmFtZSkubGVuZ3RoCiAgICBpbnRjIDUgLy8gNDAwCiAgICB1bmNvdmVyIDQKICAgICoKICAgIGludGMgNiAvLyAzMTcwMAogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyNTcKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LmFtb3VudCA9PT0gdGhpcy5yb290Q29zdHMobmFtZSkgKyBzcG9uc29yQ29zdChwYXltZW50LnNlbmRlciwgVHhuLnNlbmRlciksIGVyckludmFsaWRQYXltZW50QW1vdW50KQogICAgdW5jb3ZlciAyCiAgICBndHhucyBTZW5kZXIKICAgIGR1cAogICAgY292ZXIgMwogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDEKICAgIC8vIHJldHVybiBwYXllciA9PT0gb3duZXIgPyAwIDogUGF5ZXJSZWNvcmRNQlIKICAgID09CiAgICBpbnRjIDQgLy8gMjg1MDAKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyNTcKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LmFtb3VudCA9PT0gdGhpcy5yb290Q29zdHMobmFtZSkgKyBzcG9uc29yQ29zdChwYXltZW50LnNlbmRlciwgVHhuLnNlbmRlciksIGVyckludmFsaWRQYXltZW50QW1vdW50KQogICAgKwogICAgPT0KICAgIGJueiBhZGRSb290X2FmdGVyX2Fzc2VydEAxMwogICAgYnl0ZWMgMTIgLy8gIkVSUjplcnJJcG1hIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwbWEKCmFkZFJvb3RfYWZ0ZXJfYXNzZXJ0QDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyNTgKICAgIC8vIHRoaXMucm9vdHMocm9vdEtleSkudmFsdWUgPSB7IHJvb3QsIHR5cGUgfQogICAgY292ZXIgMgogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjI1OQogICAgLy8gcmVjb3JkUGF5ZXIodGhpcy5yb290cyhyb290S2V5KS5rZXksIHBheW1lbnQuc2VuZGVyLCBUeG4uc2VuZGVyKQogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgY292ZXIgMgogICAgY2FsbHN1YiByZWNvcmRQYXllcgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyNDgKICAgIC8vIGFkZFJvb3QocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBuYW1lOiBzdHJpbmcsIHJvb3Q6IGJ5dGVzPDMyPiwgdHlwZTogdWludDY0KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5kZWxldGVSb290W3JvdXRpbmddKCkgLT4gdm9pZDoKZGVsZXRlUm9vdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MjY3CiAgICAvLyBkZWxldGVSb290KG5hbWU6IHN0cmluZyk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyNjgKICAgIC8vIGNvbnN0IHJvb3RLZXkgPSB0aGlzLnJlY29yZEtleShUeG4uc2VuZGVyLCBCeXRlcyhuYW1lKSkKICAgIHR4biBTZW5kZXIKICAgIHN3YXAKICAgIGNhbGxzdWIgcmVjb3JkS2V5CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjE1MAogICAgLy8gcm9vdHMgPSBCb3hNYXA8Ynl0ZXMsIFJvb3RWYWx1ZT4oeyBrZXlQcmVmaXg6IE1ldGFCb3hQcmVmaXhSb290cyB9KQogICAgYnl0ZWMgNSAvLyAiciIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjI2OQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucm9vdHMocm9vdEtleSkuZXhpc3RzLCBlcnJOb05hbWUpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBkZWxldGVSb290X2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAxNyAvLyAiRVJSOmVyck5uYW0iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTm5hbQoKZGVsZXRlUm9vdF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MjcwCiAgICAvLyB0aGlzLnJvb3RzKHJvb3RLZXkpLmRlbGV0ZSgpCiAgICBkdXAKICAgIGJveF9kZWwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1NTAKICAgIC8vIHJldHVybiAzMV83MDAgKyA0MDAgKiBCeXRlcyhuYW1lKS5sZW5ndGgKICAgIHN3YXAKICAgIGxlbgogICAgaW50YyA1IC8vIDQwMAogICAgKgogICAgaW50YyA2IC8vIDMxNzAwCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjI3MQogICAgLy8gdGhpcy5yZWxlYXNlUmVjb3JkKHRoaXMucm9vdHMocm9vdEtleSkua2V5LCB0aGlzLnJvb3RDb3N0cyhuYW1lKSkKICAgIGNhbGxzdWIgcmVsZWFzZVJlY29yZAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyNjcKICAgIC8vIGRlbGV0ZVJvb3QobmFtZTogc3RyaW5nKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS51cGRhdGVSb290W3JvdXRpbmddKCkgLT4gdm9pZDoKdXBkYXRlUm9vdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MjgwCiAgICAvLyB1cGRhdGVSb290KG5hbWU6IHN0cmluZywgbmV3Um9vdDogYnl0ZXM8MzI+KTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjI4MQogICAgLy8gY29uc3Qga2V5ID0gdGhpcy5yZWNvcmRLZXkoVHhuLnNlbmRlciwgQnl0ZXMobmFtZSkpCiAgICB0eG4gU2VuZGVyCiAgICBzd2FwCiAgICBjYWxsc3ViIHJlY29yZEtleQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxNTAKICAgIC8vIHJvb3RzID0gQm94TWFwPGJ5dGVzLCBSb290VmFsdWU+KHsga2V5UHJlZml4OiBNZXRhQm94UHJlZml4Um9vdHMgfSkKICAgIGJ5dGVjIDUgLy8gInIiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyODIKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnJvb3RzKGtleSkuZXhpc3RzLCBlcnJOb05hbWUpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiB1cGRhdGVSb290X2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAxNyAvLyAiRVJSOmVyck5uYW0iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTm5hbQoKdXBkYXRlUm9vdF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MjgzCiAgICAvLyB0aGlzLnJvb3RzKGtleSkudmFsdWUucm9vdCA9IG5ld1Jvb3QKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDIKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjI4MAogICAgLy8gdXBkYXRlUm9vdChuYW1lOiBzdHJpbmcsIG5ld1Jvb3Q6IGJ5dGVzPDMyPik6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEuYWRkRGF0YVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmFkZERhdGE6CiAgICBpbnRjXzAgLy8gMAogICAgYnl0ZWNfMSAvLyAiIgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjI5NAogICAgLy8gYWRkRGF0YShwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIG5hbWU6IHN0cmluZywga2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIGR1cAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIGNvdmVyIDIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjI5NQogICAgLy8gbG9nZ2VkQXNzZXJ0KG5hbWUgIT09ICcnLCBlcnJJbnZhbGlkTmFtZSkKICAgIGJ5dGVjXzEgLy8gIiIKICAgICE9CiAgICBibnogYWRkRGF0YV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMTYgLy8gIkVSUjplcnJNbmFtIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck1uYW0KCmFkZERhdGFfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjI5NgogICAgLy8gbG9nZ2VkQXNzZXJ0KGtleSAhPT0gJycsIGVyckludmFsaWRLZXkpCiAgICBkaWcgMgogICAgYnl0ZWNfMSAvLyAiIgogICAgIT0KICAgIGJueiBhZGREYXRhX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyAxOCAvLyAiRVJSOmVyck1rZXkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTWtleQoKYWRkRGF0YV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Mjk3CiAgICAvLyBjb25zdCByb290S2V5ID0gdGhpcy5yZWNvcmRLZXkoVHhuLnNlbmRlciwgQnl0ZXMobmFtZSkpCiAgICB0eG4gU2VuZGVyCiAgICBkaWcgMgogICAgY2FsbHN1YiByZWNvcmRLZXkKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MzAwCiAgICAvLyBsb2dnZWRBc3NlcnQoa2V5Qnl0ZXMubGVuZ3RoIDw9IG1heERhdGFLZXlMZW5ndGgsIGVycktleVRvb0xvbmcpCiAgICBkaWcgMwogICAgbGVuCiAgICBkdXAKICAgIGJ1cnkgNwogICAgcHVzaGludCAxNQogICAgPD0KICAgIGJueiBhZGREYXRhX2FmdGVyX2Fzc2VydEA3CiAgICBieXRlYyAxMyAvLyAiRVJSOmVyckt0bCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJLdGwKCmFkZERhdGFfYWZ0ZXJfYXNzZXJ0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjMwMQogICAgLy8gbG9nZ2VkQXNzZXJ0KEJ5dGVzKG5hbWUpLmxlbmd0aCArIGtleUJ5dGVzLmxlbmd0aCA8IE1heFJlY29yZEtleUJ5dGVzLCBlcnJLZXlUb29Mb25nKQogICAgZGlnIDIKICAgIGxlbgogICAgZGlnIDYKICAgICsKICAgIHB1c2hpbnQgMzEKICAgIDwKICAgIGJueiBhZGREYXRhX2FmdGVyX2Fzc2VydEA5CiAgICBieXRlYyAxMyAvLyAiRVJSOmVyckt0bCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJLdGwKCmFkZERhdGFfYWZ0ZXJfYXNzZXJ0QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjMwMgogICAgLy8gbG9nZ2VkQXNzZXJ0KEJ5dGVzKHZhbHVlKS5sZW5ndGggPD0gbWF4RGF0YUxlbmd0aCwgZXJyRGF0YVRvb0xvbmcpCiAgICBkdXAKICAgIGxlbgogICAgZHVwCiAgICBjb3ZlciA1CiAgICBpbnRjIDcgLy8gMTAyNAogICAgPD0KICAgIGJueiBhZGREYXRhX2FmdGVyX2Fzc2VydEAxMQogICAgYnl0ZWMgMTkgLy8gIkVSUjplcnJEdGwiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyRHRsCgphZGREYXRhX2FmdGVyX2Fzc2VydEAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MzA0CiAgICAvLyBrZXlCeXRlcy5sZW5ndGggPCAyIHx8ICEoa2V5Qnl0ZXMuc2xpY2UoMCwgMikgPT09IEJ5dGVzKHJlc2VydmVkRGF0YUtleVByZWZpeCkpLAogICAgZGlnIDYKICAgIGludGNfMiAvLyAyCiAgICA8CiAgICBibnogYWRkRGF0YV9ib29sX3RydWVAMTMKICAgIGludGNfMCAvLyAwCiAgICBkaWcgNwogICAgZHVwCiAgICBjb3ZlciAyCiAgICA+PQogICAgaW50Y18wIC8vIDAKICAgIGRpZyAyCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgaW50Y18yIC8vIDIKICAgIGRpZyAyCiAgICA+PQogICAgaW50Y18yIC8vIDIKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIGRpZyA1CiAgICBjb3ZlciAyCiAgICBzdWJzdHJpbmczCiAgICBieXRlYyAyMCAvLyAibC4iCiAgICA9PQogICAgYm56IGFkZERhdGFfYm9vbF9mYWxzZUAxNAoKYWRkRGF0YV9ib29sX3RydWVAMTM6CiAgICBpbnRjXzEgLy8gMQoKYWRkRGF0YV9ib29sX21lcmdlQDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czozMDMtMzA2CiAgICAvLyBsb2dnZWRBc3NlcnQoCiAgICAvLyAgIGtleUJ5dGVzLmxlbmd0aCA8IDIgfHwgIShrZXlCeXRlcy5zbGljZSgwLCAyKSA9PT0gQnl0ZXMocmVzZXJ2ZWREYXRhS2V5UHJlZml4KSksCiAgICAvLyAgIGVyclJlc2VydmVkS2V5UHJlZml4LAogICAgLy8gKQogICAgYm56IGFkZERhdGFfYWZ0ZXJfYXNzZXJ0QDE3CiAgICBieXRlYyAyMSAvLyAiRVJSOmVyclJrcCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJSa3AKCmFkZERhdGFfYWZ0ZXJfYXNzZXJ0QDE3OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxNTAKICAgIC8vIHJvb3RzID0gQm94TWFwPGJ5dGVzLCBSb290VmFsdWU+KHsga2V5UHJlZml4OiBNZXRhQm94UHJlZml4Um9vdHMgfSkKICAgIGJ5dGVjIDUgLy8gInIiCiAgICB1bmNvdmVyIDIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czozMDcKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnJvb3RzKHJvb3RLZXkpLmV4aXN0cywgZXJyTm9Sb290Rm9yRGF0YSkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGFkZERhdGFfYWZ0ZXJfYXNzZXJ0QDE5CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJOcmZkIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5yZmQKCmFkZERhdGFfYWZ0ZXJfYXNzZXJ0QDE5OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czozMDkKICAgIC8vIGNvbnN0IHJlY29yZEtleSA9IHRoaXMuZGF0YUtleShuYW1lLCBrZXkpCiAgICBzd2FwCiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgZGF0YUtleQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czozMTIKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJySW52YWxpZFBheW1lbnRSZWNlaXZlcikKICAgIGRpZyAzCiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogYWRkRGF0YV9hZnRlcl9hc3NlcnRAMjEKICAgIGJ5dGVjIDExIC8vICJFUlI6ZXJySXBtciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcG1yCgphZGREYXRhX2FmdGVyX2Fzc2VydEAyMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MzE0CiAgICAvLyBwYXltZW50LmFtb3VudCA9PT0gdGhpcy5yZWNvcmRTdG9yYWdlQ29zdChyZWNvcmRLZXksIEJ5dGVzKHZhbHVlKS5sZW5ndGgpICsgc3BvbnNvckNvc3QocGF5bWVudC5zZW5kZXIsIFR4bi5zZW5kZXIpLAogICAgdW5jb3ZlciAzCiAgICBkdXAKICAgIGd0eG5zIEFtb3VudAogICAgZGlnIDMKICAgIHVuY292ZXIgNQogICAgY2FsbHN1YiByZWNvcmRTdG9yYWdlQ29zdAogICAgdW5jb3ZlciAyCiAgICBndHhucyBTZW5kZXIKICAgIGR1cAogICAgY292ZXIgNQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDEKICAgIC8vIHJldHVybiBwYXllciA9PT0gb3duZXIgPyAwIDogUGF5ZXJSZWNvcmRNQlIKICAgID09CiAgICBpbnRjIDQgLy8gMjg1MDAKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czozMTQKICAgIC8vIHBheW1lbnQuYW1vdW50ID09PSB0aGlzLnJlY29yZFN0b3JhZ2VDb3N0KHJlY29yZEtleSwgQnl0ZXModmFsdWUpLmxlbmd0aCkgKyBzcG9uc29yQ29zdChwYXltZW50LnNlbmRlciwgVHhuLnNlbmRlciksCiAgICArCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czozMTMtMzE2CiAgICAvLyBsb2dnZWRBc3NlcnQoCiAgICAvLyAgIHBheW1lbnQuYW1vdW50ID09PSB0aGlzLnJlY29yZFN0b3JhZ2VDb3N0KHJlY29yZEtleSwgQnl0ZXModmFsdWUpLmxlbmd0aCkgKyBzcG9uc29yQ29zdChwYXltZW50LnNlbmRlciwgVHhuLnNlbmRlciksCiAgICAvLyAgIGVyckludmFsaWRQYXltZW50QW1vdW50LAogICAgLy8gKQogICAgYm56IGFkZERhdGFfYWZ0ZXJfYXNzZXJ0QDIzCiAgICBieXRlYyAxMiAvLyAiRVJSOmVycklwbWEiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBtYQoKYWRkRGF0YV9hZnRlcl9hc3NlcnRAMjM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjMxNwogICAgLy8gY29uc3QgaWQgPSB0aGlzLnJlY29yZEtleShUeG4uc2VuZGVyLCByZWNvcmRLZXkpCiAgICB0eG4gU2VuZGVyCiAgICBkaWcgMgogICAgY2FsbHN1YiByZWNvcmRLZXkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MzE4CiAgICAvLyBsZXQgcHJldmlvdXNQYXllciA9IFR4bi5zZW5kZXIKICAgIHR4biBTZW5kZXIKICAgIGJ1cnkgNwogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czozMTkKICAgIC8vIGxldCBwcmV2aW91c0Nvc3Q6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBidXJ5IDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTUyCiAgICAvLyByZWNvcmRzID0gQm94TWFwPGJ5dGVzLCBNZXRhUmVjb3JkVmFsdWU+KHsga2V5UHJlZml4OiBSZWNvcmRQcmVmaXggfSkKICAgIGJ5dGVjXzIgLy8gIm0iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czozMjAKICAgIC8vIGlmICh0aGlzLnJlY29yZHMoaWQpLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBhZGREYXRhX2FmdGVyX2lmX2Vsc2VAMjUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MzIzCiAgICAvLyBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czozMjQKICAgIC8vIHRoaXMucmVjb3JkU3RvcmFnZUNvc3QocmVjb3JkS2V5LCB0aGlzLnJlY29yZHMoaWQpLmxlbmd0aCAtIFJlY29yZEhlYWRlckJ5dGVzKSwKICAgIGRpZyAxCiAgICBkdXAKICAgIGJveF9sZW4KICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBwdXNoaW50IDEyCiAgICAtCiAgICBkaWcgNQogICAgc3dhcAogICAgY2FsbHN1YiByZWNvcmRTdG9yYWdlQ29zdAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czozMjEtMzI1CiAgICAvLyBjb25zdCBbcmVjZWl2ZXIsIHRvdGFsXSA9IHJlbGVhc2VEZXBvc2l0KAogICAgLy8gICB0aGlzLnJlY29yZHMoaWQpLmtleSwKICAgIC8vICAgVHhuLnNlbmRlciwKICAgIC8vICAgdGhpcy5yZWNvcmRTdG9yYWdlQ29zdChyZWNvcmRLZXksIHRoaXMucmVjb3JkcyhpZCkubGVuZ3RoIC0gUmVjb3JkSGVhZGVyQnl0ZXMpLAogICAgLy8gKQogICAgc3dhcAogICAgY292ZXIgMgogICAgY2FsbHN1YiByZWxlYXNlRGVwb3NpdAogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIHN3YXAKICAgIGludGNfMyAvLyAzMgogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIGJ1cnkgOAogICAgYnVyeSA2CgphZGREYXRhX2FmdGVyX2lmX2Vsc2VAMjU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjMyOQogICAgLy8gdGhpcy53cml0ZVJlY29yZChyZWNvcmRLZXksIEJ5dGVzKHZhbHVlKSkKICAgIGNvdmVyIDIKICAgIGNhbGxzdWIgd3JpdGVSZWNvcmQKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czozMzAKICAgIC8vIHJlY29yZFBheWVyKHRoaXMucmVjb3JkcyhpZCkua2V5LCBwYXltZW50LnNlbmRlciwgVHhuLnNlbmRlcikKICAgIHR4biBTZW5kZXIKICAgIHN3YXAKICAgIGNvdmVyIDIKICAgIGNhbGxzdWIgcmVjb3JkUGF5ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MzMyCiAgICAvLyBpZiAocHJldmlvdXNDb3N0ID4gMCkgaXR4bi5wYXltZW50KHsgcmVjZWl2ZXI6IHByZXZpb3VzUGF5ZXIsIGFtb3VudDogcHJldmlvdXNDb3N0LCBmZWU6IDAgfSkuc3VibWl0KCkKICAgIGRpZyAxCiAgICBieiBhZGREYXRhX2FmdGVyX2lmX2Vsc2VAMjgKICAgIGl0eG5fYmVnaW4KICAgIGRpZyAxCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgZGlnIDIKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CgphZGREYXRhX2FmdGVyX2lmX2Vsc2VAMjg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjI5NAogICAgLy8gYWRkRGF0YShwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIG5hbWU6IHN0cmluZywga2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmFkZERhdGFfYm9vbF9mYWxzZUAxNDoKICAgIGludGNfMCAvLyAwCiAgICBiIGFkZERhdGFfYm9vbF9tZXJnZUAxNQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEuZGVsZXRlRGF0YVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmRlbGV0ZURhdGE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjM0MQogICAgLy8gZGVsZXRlRGF0YShuYW1lOiBzdHJpbmcsIGtleTogc3RyaW5nKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czozNDMKICAgIC8vIGxvZ2dlZEFzc2VydChrZXlCeXRlcy5sZW5ndGggPCAyIHx8IGtleUJ5dGVzLnNsaWNlKDAsIDIpICE9PSBCeXRlcyhyZXNlcnZlZERhdGFLZXlQcmVmaXgpLCBlcnJSZXNlcnZlZEtleVByZWZpeCkKICAgIGxlbgogICAgZHVwCiAgICBjb3ZlciAzCiAgICBpbnRjXzIgLy8gMgogICAgPAogICAgYm56IGRlbGV0ZURhdGFfYm9vbF90cnVlQDMKICAgIGludGNfMCAvLyAwCiAgICBkaWcgMwogICAgZHVwCiAgICBjb3ZlciAyCiAgICA+PQogICAgaW50Y18wIC8vIDAKICAgIGRpZyAyCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgaW50Y18yIC8vIDIKICAgIGRpZyAyCiAgICA+PQogICAgaW50Y18yIC8vIDIKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIGRpZyAyCiAgICBjb3ZlciAyCiAgICBzdWJzdHJpbmczCiAgICBieXRlYyAyMCAvLyAibC4iCiAgICAhPQogICAgYnogZGVsZXRlRGF0YV9ib29sX2ZhbHNlQDQKCmRlbGV0ZURhdGFfYm9vbF90cnVlQDM6CiAgICBpbnRjXzEgLy8gMQoKZGVsZXRlRGF0YV9ib29sX21lcmdlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjM0MwogICAgLy8gbG9nZ2VkQXNzZXJ0KGtleUJ5dGVzLmxlbmd0aCA8IDIgfHwga2V5Qnl0ZXMuc2xpY2UoMCwgMikgIT09IEJ5dGVzKHJlc2VydmVkRGF0YUtleVByZWZpeCksIGVyclJlc2VydmVkS2V5UHJlZml4KQogICAgYm56IGRlbGV0ZURhdGFfYWZ0ZXJfYXNzZXJ0QDcKICAgIGJ5dGVjIDIxIC8vICJFUlI6ZXJyUmtwIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclJrcAoKZGVsZXRlRGF0YV9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MzQ0CiAgICAvLyBjb25zdCByZWNvcmRLZXkgPSB0aGlzLmRhdGFLZXkobmFtZSwga2V5KQogICAgY2FsbHN1YiBkYXRhS2V5CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MzQ1CiAgICAvLyBjb25zdCBpZCA9IHRoaXMucmVjb3JkS2V5KFR4bi5zZW5kZXIsIHJlY29yZEtleSkKICAgIHR4biBTZW5kZXIKICAgIHN3YXAKICAgIGNhbGxzdWIgcmVjb3JkS2V5CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTUyCiAgICAvLyByZWNvcmRzID0gQm94TWFwPGJ5dGVzLCBNZXRhUmVjb3JkVmFsdWU+KHsga2V5UHJlZml4OiBSZWNvcmRQcmVmaXggfSkKICAgIGJ5dGVjXzIgLy8gIm0iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MzQ2CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5yZWNvcmRzKGlkKS5leGlzdHMsIGVyck5vRGF0YSkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGRlbGV0ZURhdGFfYWZ0ZXJfYXNzZXJ0QDkKICAgIGJ5dGVjIDIyIC8vICJFUlI6ZXJyTmR0YSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOZHRhCgpkZWxldGVEYXRhX2FmdGVyX2Fzc2VydEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czozNDcKICAgIC8vIHRoaXMucmVtb3ZlUmVjb3JkKHJlY29yZEtleSwgdGhpcy5jdXJyZW50UmVjb3JkUmV2aXNpb24oaWQpKQogICAgY2FsbHN1YiBjdXJyZW50UmVjb3JkUmV2aXNpb24KICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZW1vdmVSZWNvcmQKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czozNDEKICAgIC8vIGRlbGV0ZURhdGEobmFtZTogc3RyaW5nLCBrZXk6IHN0cmluZyk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKZGVsZXRlRGF0YV9ib29sX2ZhbHNlQDQ6CiAgICBpbnRjXzAgLy8gMAogICAgYiBkZWxldGVEYXRhX2Jvb2xfbWVyZ2VANQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEudmVyaWZ5W3JvdXRpbmddKCkgLT4gdm9pZDoKdmVyaWZ5OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czozNjEKICAgIC8vIHZlcmlmeShhZGRyZXNzOiBBY2NvdW50LCBuYW1lOiBzdHJpbmcsIGxlYWY6IExlYWYsIHByb29mOiBQcm9vZiwgdHlwZTogdWludDY0KTogYm9vbGVhbiB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAzMgogICAgKgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxieXRlc1szMl0+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA1CiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnZlcmlmeQogICAgcG9wCiAgICBwdXNoYnl0ZXMgMHgwMAogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMgogICAgc2V0Yml0CiAgICBieXRlY18wIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZWFkW3JvdXRpbmddKCkgLT4gdm9pZDoKcmVhZDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Mzg1CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEucmVhZAogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnZlcmlmaWVkUmVhZFtyb3V0aW5nXSgpIC0+IHZvaWQ6CnZlcmlmaWVkUmVhZDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDEyCiAgICAvLyB2ZXJpZmllZFJlYWQoYWRkcmVzczogQWNjb3VudCwgbmFtZTogc3RyaW5nLCBsZWFmOiBMZWFmLCBwcm9vZjogUHJvb2YsIHR5cGU6IHVpbnQ2NCwga2V5OiBzdHJpbmcpOiBzdHJpbmcgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwbiAyCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgZHVwCiAgICBjb3ZlciAyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAzMgogICAgKgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxieXRlc1szMl0+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA1CiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIGNvdmVyIDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDEzCiAgICAvLyBjb25zdCB2ZXJpZmllZCA9IHRoaXMudmVyaWZ5KGFkZHJlc3MsIG5hbWUsIGxlYWYsIHByb29mLCB0eXBlKQogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnZlcmlmeQogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQxNAogICAgLy8gaWYgKCF2ZXJpZmllZCkgewogICAgYm56IHZlcmlmaWVkUmVhZF9hZnRlcl9pZl9lbHNlQDMKICAgIHBvcG4gMwogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0MTUKICAgIC8vIHJldHVybiAnJwogICAgYnl0ZWNfMSAvLyAiIgoKdmVyaWZpZWRSZWFkX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS52ZXJpZmllZFJlYWRANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDEyCiAgICAvLyB2ZXJpZmllZFJlYWQoYWRkcmVzczogQWNjb3VudCwgbmFtZTogc3RyaW5nLCBsZWFmOiBMZWFmLCBwcm9vZjogUHJvb2YsIHR5cGU6IHVpbnQ2NCwga2V5OiBzdHJpbmcpOiBzdHJpbmcgewogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCnZlcmlmaWVkUmVhZF9hZnRlcl9pZl9lbHNlQDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQxNwogICAgLy8gcmV0dXJuIHRoaXMucmVhZChhZGRyZXNzLCBuYW1lLCBrZXkpCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEucmVhZAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0MTIKICAgIC8vIHZlcmlmaWVkUmVhZChhZGRyZXNzOiBBY2NvdW50LCBuYW1lOiBzdHJpbmcsIGxlYWY6IExlYWYsIHByb29mOiBQcm9vZiwgdHlwZTogdWludDY0LCBrZXk6IHN0cmluZyk6IHN0cmluZyB7CiAgICBiIHZlcmlmaWVkUmVhZF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEudmVyaWZpZWRSZWFkQDQKCgovLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnZlcmlmaWVkTXVzdFJlYWRbcm91dGluZ10oKSAtPiB2b2lkOgp2ZXJpZmllZE11c3RSZWFkOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0MzkKICAgIC8vIHZlcmlmaWVkTXVzdFJlYWQoYWRkcmVzczogQWNjb3VudCwgbmFtZTogc3RyaW5nLCBsZWFmOiBMZWFmLCBwcm9vZjogUHJvb2YsIHR5cGU6IHVpbnQ2NCwga2V5OiBzdHJpbmcpOiBzdHJpbmcgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwbiAyCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgZHVwCiAgICBjb3ZlciAyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAzMgogICAgKgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxieXRlc1szMl0+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA1CiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIGNvdmVyIDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDQwCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy52ZXJpZnkoYWRkcmVzcywgbmFtZSwgbGVhZiwgcHJvb2YsIHR5cGUpLCBlcnJGYWlsZWRUb1ZlcmlmeUluY2x1c2lvbikKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS52ZXJpZnkKICAgIHBvcAogICAgYm56IHZlcmlmaWVkTXVzdFJlYWRfYWZ0ZXJfYXNzZXJ0QDMKICAgIHB1c2hieXRlcyAiRVJSOmVyckZ2cmkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyRnZyaQoKdmVyaWZpZWRNdXN0UmVhZF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDQxCiAgICAvLyByZXR1cm4gdGhpcy5yZWFkKGFkZHJlc3MsIG5hbWUsIGtleSkKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZWFkCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQzOQogICAgLy8gdmVyaWZpZWRNdXN0UmVhZChhZGRyZXNzOiBBY2NvdW50LCBuYW1lOiBzdHJpbmcsIGxlYWY6IExlYWYsIHByb29mOiBQcm9vZiwgdHlwZTogdWludDY0LCBrZXk6IHN0cmluZyk6IHN0cmluZyB7CiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYnl0ZWNfMCAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEuYWRkVHlwZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmFkZFR5cGU6CiAgICBieXRlY18xIC8vICIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ0NAogICAgLy8gYWRkVHlwZShwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGRlc2NyaXB0aW9uOiBzdHJpbmcsIHNjaGVtYUxpc3Q6IFNjaGVtYUxpc3QpOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwbiAyCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHN3YXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgY292ZXIgNAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgZHVwCiAgICBjb3ZlciAzCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDQ1CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRQYXltZW50UmVjZWl2ZXIpCiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogYWRkVHlwZV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMTEgLy8gIkVSUjplcnJJcG1yIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwbXIKCmFkZFR5cGVfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ0NgogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSBNZXRhVHlwZUZlZSwgZXJySW52YWxpZFBheW1lbnRBbW91bnQpCiAgICB1bmNvdmVyIDIKICAgIGd0eG5zIEFtb3VudAogICAgaW50YyA5IC8vIDEwMDAwMDAwMAogICAgPT0KICAgIGJueiBhZGRUeXBlX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyAxMiAvLyAiRVJSOmVycklwbWEiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBtYQoKYWRkVHlwZV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDQ3CiAgICAvLyBsb2dnZWRBc3NlcnQoQnl0ZXMoZGVzY3JpcHRpb24pLmxlbmd0aCA8PSA4MDAsIGVyckRhdGFUb29Mb25nKQogICAgZGlnIDEKICAgIGxlbgogICAgZHVwCiAgICBidXJ5IDUKICAgIHB1c2hpbnQgODAwCiAgICA8PQogICAgYm56IGFkZFR5cGVfYWZ0ZXJfYXNzZXJ0QDcKICAgIGJ5dGVjIDE5IC8vICJFUlI6ZXJyRHRsIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckR0bAoKYWRkVHlwZV9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDQ5CiAgICAvLyBsZXQgc2NoZW1hOiBzdHJpbmcgPSAnKCcKICAgIHB1c2hieXRlcyAiKCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDUwCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgc2NoZW1hTGlzdC5sZW5ndGg7IGkgKz0gMSkgewogICAgaW50Y18wIC8vIDAKICAgIGNvdmVyIDIKCmFkZFR5cGVfd2hpbGVfdG9wQDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ1MAogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IHNjaGVtYUxpc3QubGVuZ3RoOyBpICs9IDEpIHsKICAgIGRpZyAyCiAgICBkaWcgMgogICAgPAogICAgYnogYWRkVHlwZV9hZnRlcl93aGlsZUA2NgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NTEKICAgIC8vIHN3aXRjaCAoc2NoZW1hTGlzdFtpXSkgewogICAgZGlnIDQKICAgIGV4dHJhY3QgMiAwCiAgICBkaWcgMwogICAgaW50Y18xIC8vIDEKICAgIGV4dHJhY3QzIC8vIG9uIGVycm9yOiBpbmRleCBhY2Nlc3MgaXMgb3V0IG9mIGJvdW5kcwogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ1MgogICAgLy8gY2FzZSBTY2hlbWFQYXJ0VWludDg6CiAgICBwdXNoYnl0ZXMgMHgwYQogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDUyLTQ1NAogICAgLy8gY2FzZSBTY2hlbWFQYXJ0VWludDg6CiAgICAvLyAgIHNjaGVtYSArPSBTY2hlbWFQYXJ0VWludDhTdHJpbmcKICAgIC8vICAgYnJlYWsKICAgIGJ6IGFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUAxMgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ1MwogICAgLy8gc2NoZW1hICs9IFNjaGVtYVBhcnRVaW50OFN0cmluZwogICAgcHVzaGJ5dGVzICJ1aW50OCIKICAgIGNvbmNhdAoKYWRkVHlwZV9ibG9ja0A2MjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTA3CiAgICAvLyBpZiAoc2NoZW1hTGlzdC5sZW5ndGggPiAwICYmIGkgIT09IHNjaGVtYUxpc3QubGVuZ3RoIC0gMSkgewogICAgZGlnIDEKICAgIGJ6IGFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUA2NQogICAgZGlnIDEKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkaWcgMwogICAgIT0KICAgIGJ6IGFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUA2NQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1MDgKICAgIC8vIHNjaGVtYSArPSAnLCcKICAgIHB1c2hieXRlcyAiLCIKICAgIGNvbmNhdAoKYWRkVHlwZV9hZnRlcl9pZl9lbHNlQDY1OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NTAKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBzY2hlbWFMaXN0Lmxlbmd0aDsgaSArPSAxKSB7CiAgICB1bmNvdmVyIDIKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBjb3ZlciAyCiAgICBiIGFkZFR5cGVfd2hpbGVfdG9wQDgKCmFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDU1CiAgICAvLyBjYXNlIFNjaGVtYVBhcnRVaW50MTY6CiAgICBkdXAKICAgIHB1c2hieXRlcyAweDBiCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NTUtNDU3CiAgICAvLyBjYXNlIFNjaGVtYVBhcnRVaW50MTY6CiAgICAvLyAgIHNjaGVtYSArPSBTY2hlbWFQYXJ0VWludDE2U3RyaW5nCiAgICAvLyAgIGJyZWFrCiAgICBieiBhZGRUeXBlX2FmdGVyX2lmX2Vsc2VAMTUKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NTYKICAgIC8vIHNjaGVtYSArPSBTY2hlbWFQYXJ0VWludDE2U3RyaW5nCiAgICBwdXNoYnl0ZXMgInVpbnQxNiIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NTcKICAgIC8vIGJyZWFrCiAgICBiIGFkZFR5cGVfYmxvY2tANjIKCmFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUAxNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDU4CiAgICAvLyBjYXNlIFNjaGVtYVBhcnRVaW50MzI6CiAgICBkdXAKICAgIHB1c2hieXRlcyAweDBjCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NTgtNDYwCiAgICAvLyBjYXNlIFNjaGVtYVBhcnRVaW50MzI6CiAgICAvLyAgIHNjaGVtYSArPSBTY2hlbWFQYXJ0VWludDMyU3RyaW5nCiAgICAvLyAgIGJyZWFrCiAgICBieiBhZGRUeXBlX2FmdGVyX2lmX2Vsc2VAMTgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NTkKICAgIC8vIHNjaGVtYSArPSBTY2hlbWFQYXJ0VWludDMyU3RyaW5nCiAgICBwdXNoYnl0ZXMgInVpbnQzMiIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NjAKICAgIC8vIGJyZWFrCiAgICBiIGFkZFR5cGVfYmxvY2tANjIKCmFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUAxODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDYxCiAgICAvLyBjYXNlIFNjaGVtYVBhcnRVaW50NjQ6CiAgICBkdXAKICAgIHB1c2hieXRlcyAweDBkCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NjEtNDYzCiAgICAvLyBjYXNlIFNjaGVtYVBhcnRVaW50NjQ6CiAgICAvLyAgIHNjaGVtYSArPSBTY2hlbWFQYXJ0VWludDY0U3RyaW5nCiAgICAvLyAgIGJyZWFrCiAgICBieiBhZGRUeXBlX2FmdGVyX2lmX2Vsc2VAMjEKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NjIKICAgIC8vIHNjaGVtYSArPSBTY2hlbWFQYXJ0VWludDY0U3RyaW5nCiAgICBwdXNoYnl0ZXMgInVpbnQ2NCIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NjMKICAgIC8vIGJyZWFrCiAgICBiIGFkZFR5cGVfYmxvY2tANjIKCmFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUAyMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDY0CiAgICAvLyBjYXNlIFNjaGVtYVBhcnRVaW50MTI4OgogICAgZHVwCiAgICBwdXNoYnl0ZXMgMHgwZQogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDY0LTQ2NgogICAgLy8gY2FzZSBTY2hlbWFQYXJ0VWludDEyODoKICAgIC8vICAgc2NoZW1hICs9IFNjaGVtYVBhcnRVaW50MTI4U3RyaW5nCiAgICAvLyAgIGJyZWFrCiAgICBieiBhZGRUeXBlX2FmdGVyX2lmX2Vsc2VAMjQKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NjUKICAgIC8vIHNjaGVtYSArPSBTY2hlbWFQYXJ0VWludDEyOFN0cmluZwogICAgcHVzaGJ5dGVzICJ1aW50MTI4IgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ2NgogICAgLy8gYnJlYWsKICAgIGIgYWRkVHlwZV9ibG9ja0A2MgoKYWRkVHlwZV9hZnRlcl9pZl9lbHNlQDI0OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NjcKICAgIC8vIGNhc2UgU2NoZW1hUGFydFVpbnQyNTY6CiAgICBkdXAKICAgIHB1c2hieXRlcyAweDBmCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NjctNDY5CiAgICAvLyBjYXNlIFNjaGVtYVBhcnRVaW50MjU2OgogICAgLy8gICBzY2hlbWEgKz0gU2NoZW1hUGFydFVpbnQyNTZTdHJpbmcKICAgIC8vICAgYnJlYWsKICAgIGJ6IGFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUAyNwogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ2OAogICAgLy8gc2NoZW1hICs9IFNjaGVtYVBhcnRVaW50MjU2U3RyaW5nCiAgICBwdXNoYnl0ZXMgInVpbnQyNTYiCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDY5CiAgICAvLyBicmVhawogICAgYiBhZGRUeXBlX2Jsb2NrQDYyCgphZGRUeXBlX2FmdGVyX2lmX2Vsc2VAMjc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ3MAogICAgLy8gY2FzZSBTY2hlbWFQYXJ0VWludDUxMjoKICAgIGR1cAogICAgcHVzaGJ5dGVzIDB4MTAKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ3MC00NzIKICAgIC8vIGNhc2UgU2NoZW1hUGFydFVpbnQ1MTI6CiAgICAvLyAgIHNjaGVtYSArPSBTY2hlbWFQYXJ0VWludDUxMlN0cmluZwogICAgLy8gICBicmVhawogICAgYnogYWRkVHlwZV9hZnRlcl9pZl9lbHNlQDMwCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDcxCiAgICAvLyBzY2hlbWEgKz0gU2NoZW1hUGFydFVpbnQ1MTJTdHJpbmcKICAgIHB1c2hieXRlcyAidWludDUxMiIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NzIKICAgIC8vIGJyZWFrCiAgICBiIGFkZFR5cGVfYmxvY2tANjIKCmFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUAzMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDczCiAgICAvLyBjYXNlIFNjaGVtYVBhcnRCeXRlczQ6CiAgICBkdXAKICAgIHB1c2hieXRlcyAweDE0CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NzMtNDc1CiAgICAvLyBjYXNlIFNjaGVtYVBhcnRCeXRlczQ6CiAgICAvLyAgIHNjaGVtYSArPSBTY2hlbWFQYXJ0Qnl0ZXM0U3RyaW5nCiAgICAvLyAgIGJyZWFrCiAgICBieiBhZGRUeXBlX2FmdGVyX2lmX2Vsc2VAMzMKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NzQKICAgIC8vIHNjaGVtYSArPSBTY2hlbWFQYXJ0Qnl0ZXM0U3RyaW5nCiAgICBwdXNoYnl0ZXMgImJ5dGVbNF0iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDc1CiAgICAvLyBicmVhawogICAgYiBhZGRUeXBlX2Jsb2NrQDYyCgphZGRUeXBlX2FmdGVyX2lmX2Vsc2VAMzM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ3NgogICAgLy8gY2FzZSBTY2hlbWFQYXJ0Qnl0ZXM4OgogICAgZHVwCiAgICBwdXNoYnl0ZXMgMHgxNQogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDc2LTQ3OAogICAgLy8gY2FzZSBTY2hlbWFQYXJ0Qnl0ZXM4OgogICAgLy8gICBzY2hlbWEgKz0gU2NoZW1hUGFydEJ5dGVzOFN0cmluZwogICAgLy8gICBicmVhawogICAgYnogYWRkVHlwZV9hZnRlcl9pZl9lbHNlQDM2CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDc3CiAgICAvLyBzY2hlbWEgKz0gU2NoZW1hUGFydEJ5dGVzOFN0cmluZwogICAgcHVzaGJ5dGVzICJieXRlWzhdIgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ3OAogICAgLy8gYnJlYWsKICAgIGIgYWRkVHlwZV9ibG9ja0A2MgoKYWRkVHlwZV9hZnRlcl9pZl9lbHNlQDM2OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NzkKICAgIC8vIGNhc2UgU2NoZW1hUGFydEJ5dGVzMTY6CiAgICBkdXAKICAgIHB1c2hieXRlcyAweDE2CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NzktNDgxCiAgICAvLyBjYXNlIFNjaGVtYVBhcnRCeXRlczE2OgogICAgLy8gICBzY2hlbWEgKz0gU2NoZW1hUGFydEJ5dGVzMTZTdHJpbmcKICAgIC8vICAgYnJlYWsKICAgIGJ6IGFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUAzOQogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ4MAogICAgLy8gc2NoZW1hICs9IFNjaGVtYVBhcnRCeXRlczE2U3RyaW5nCiAgICBwdXNoYnl0ZXMgImJ5dGVbMTZdIgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ4MQogICAgLy8gYnJlYWsKICAgIGIgYWRkVHlwZV9ibG9ja0A2MgoKYWRkVHlwZV9hZnRlcl9pZl9lbHNlQDM5OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0ODIKICAgIC8vIGNhc2UgU2NoZW1hUGFydEJ5dGVzMzI6CiAgICBkdXAKICAgIHB1c2hieXRlcyAweDE3CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0ODItNDg0CiAgICAvLyBjYXNlIFNjaGVtYVBhcnRCeXRlczMyOgogICAgLy8gICBzY2hlbWEgKz0gU2NoZW1hUGFydEJ5dGVzMzJTdHJpbmcKICAgIC8vICAgYnJlYWsKICAgIGJ6IGFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUA0MgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ4MwogICAgLy8gc2NoZW1hICs9IFNjaGVtYVBhcnRCeXRlczMyU3RyaW5nCiAgICBwdXNoYnl0ZXMgImJ5dGVbMzJdIgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ4NAogICAgLy8gYnJlYWsKICAgIGIgYWRkVHlwZV9ibG9ja0A2MgoKYWRkVHlwZV9hZnRlcl9pZl9lbHNlQDQyOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0ODUKICAgIC8vIGNhc2UgU2NoZW1hUGFydEJ5dGVzNjQ6CiAgICBkdXAKICAgIHB1c2hieXRlcyAweDE4CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0ODUtNDg3CiAgICAvLyBjYXNlIFNjaGVtYVBhcnRCeXRlczY0OgogICAgLy8gICBzY2hlbWEgKz0gU2NoZW1hUGFydEJ5dGVzNjRTdHJpbmcKICAgIC8vICAgYnJlYWsKICAgIGJ6IGFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUA0NQogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ4NgogICAgLy8gc2NoZW1hICs9IFNjaGVtYVBhcnRCeXRlczY0U3RyaW5nCiAgICBwdXNoYnl0ZXMgImJ5dGVbNjRdIgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ4NwogICAgLy8gYnJlYWsKICAgIGIgYWRkVHlwZV9ibG9ja0A2MgoKYWRkVHlwZV9hZnRlcl9pZl9lbHNlQDQ1OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0ODgKICAgIC8vIGNhc2UgU2NoZW1hUGFydEJ5dGVzMTI4OgogICAgZHVwCiAgICBwdXNoYnl0ZXMgMHgxOQogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDg4LTQ5MAogICAgLy8gY2FzZSBTY2hlbWFQYXJ0Qnl0ZXMxMjg6CiAgICAvLyAgIHNjaGVtYSArPSBTY2hlbWFQYXJ0Qnl0ZXMxMjhTdHJpbmcKICAgIC8vICAgYnJlYWsKICAgIGJ6IGFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUA0OAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ4OQogICAgLy8gc2NoZW1hICs9IFNjaGVtYVBhcnRCeXRlczEyOFN0cmluZwogICAgcHVzaGJ5dGVzICJieXRlWzEyOF0iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDkwCiAgICAvLyBicmVhawogICAgYiBhZGRUeXBlX2Jsb2NrQDYyCgphZGRUeXBlX2FmdGVyX2lmX2Vsc2VANDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ5MQogICAgLy8gY2FzZSBTY2hlbWFQYXJ0Qnl0ZXMyNTY6CiAgICBkdXAKICAgIHB1c2hieXRlcyAweDFhCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0OTEtNDkzCiAgICAvLyBjYXNlIFNjaGVtYVBhcnRCeXRlczI1NjoKICAgIC8vICAgc2NoZW1hICs9IFNjaGVtYVBhcnRCeXRlczI1NlN0cmluZwogICAgLy8gICBicmVhawogICAgYnogYWRkVHlwZV9hZnRlcl9pZl9lbHNlQDUxCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDkyCiAgICAvLyBzY2hlbWEgKz0gU2NoZW1hUGFydEJ5dGVzMjU2U3RyaW5nCiAgICBwdXNoYnl0ZXMgImJ5dGVbMjU2XSIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0OTMKICAgIC8vIGJyZWFrCiAgICBiIGFkZFR5cGVfYmxvY2tANjIKCmFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUA1MToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDk0CiAgICAvLyBjYXNlIFNjaGVtYVBhcnRCeXRlczUxMjoKICAgIGR1cAogICAgcHVzaGJ5dGVzIDB4MWIKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ5NC00OTYKICAgIC8vIGNhc2UgU2NoZW1hUGFydEJ5dGVzNTEyOgogICAgLy8gICBzY2hlbWEgKz0gU2NoZW1hUGFydEJ5dGVzNTEyU3RyaW5nCiAgICAvLyAgIGJyZWFrCiAgICBieiBhZGRUeXBlX2FmdGVyX2lmX2Vsc2VANTQKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0OTUKICAgIC8vIHNjaGVtYSArPSBTY2hlbWFQYXJ0Qnl0ZXM1MTJTdHJpbmcKICAgIHB1c2hieXRlcyAiYnl0ZVs1MTJdIgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ5NgogICAgLy8gYnJlYWsKICAgIGIgYWRkVHlwZV9ibG9ja0A2MgoKYWRkVHlwZV9hZnRlcl9pZl9lbHNlQDU0OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0OTcKICAgIC8vIGNhc2UgU2NoZW1hUGFydFN0cmluZzoKICAgIGR1cAogICAgcHVzaGJ5dGVzIDB4MWUKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ5Ny00OTkKICAgIC8vIGNhc2UgU2NoZW1hUGFydFN0cmluZzoKICAgIC8vICAgc2NoZW1hICs9IFNjaGVtYVBhcnRTdHJpbmdTdHJpbmcKICAgIC8vICAgYnJlYWsKICAgIGJ6IGFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUA1NwogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ5OAogICAgLy8gc2NoZW1hICs9IFNjaGVtYVBhcnRTdHJpbmdTdHJpbmcKICAgIHB1c2hieXRlcyAic3RyaW5nIgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ5OQogICAgLy8gYnJlYWsKICAgIGIgYWRkVHlwZV9ibG9ja0A2MgoKYWRkVHlwZV9hZnRlcl9pZl9lbHNlQDU3OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1MDAKICAgIC8vIGNhc2UgU2NoZW1hUGFydEFkZHJlc3M6CiAgICBwdXNoYnl0ZXMgMHgyOAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTAwLTUwMgogICAgLy8gY2FzZSBTY2hlbWFQYXJ0QWRkcmVzczoKICAgIC8vICAgc2NoZW1hICs9IFNjaGVtYVBhcnRBZGRyZXNzU3RyaW5nCiAgICAvLyAgIGJyZWFrCiAgICBieiBhZGRUeXBlX2FmdGVyX2lmX2Vsc2VANjAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTAxCiAgICAvLyBzY2hlbWEgKz0gU2NoZW1hUGFydEFkZHJlc3NTdHJpbmcKICAgIHB1c2hieXRlcyAiYWRkcmVzcyIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1MDIKICAgIC8vIGJyZWFrCiAgICBiIGFkZFR5cGVfYmxvY2tANjIKCmFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUA2MDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTA0CiAgICAvLyBsb2dnZWRBc3NlcnQoZmFsc2UsIGVyckludmFsaWRTY2hlbWFQYXJ0KQogICAgcHVzaGJ5dGVzICJFUlI6ZXJyTXNjaCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJNc2NoCgphZGRUeXBlX2FmdGVyX3doaWxlQDY2OgogICAgYnVyeSAxCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTU3CiAgICAvLyBjb25zdCBpZCA9IHRoaXMudHlwZXNJRC52YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTMzCiAgICAvLyB0eXBlc0lEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBNZXRhR2xvYmFsU3RhdGVLZXlUeXBlc0lEIH0pCiAgICBieXRlYyA5IC8vICJ0eXBlc19pZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTU3CiAgICAvLyBjb25zdCBpZCA9IHRoaXMudHlwZXNJRC52YWx1ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTU4CiAgICAvLyB0aGlzLnR5cGVzSUQudmFsdWUgKz0gMQogICAgZHVwCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxMzMKICAgIC8vIHR5cGVzSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IE1ldGFHbG9iYWxTdGF0ZUtleVR5cGVzSUQgfSkKICAgIGJ5dGVjIDkgLy8gInR5cGVzX2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxNTgKICAgIC8vIHRoaXMudHlwZXNJRC52YWx1ZSArPSAxCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1MTQKICAgIC8vIGNvbnN0IG1pbkJhbGFuY2VCZWZvcmU6IHVpbnQ2NCA9IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLm1pbkJhbGFuY2UKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdE1pbkJhbGFuY2UKICAgIGFzc2VydCAvLyBhY2NvdW50IGZ1bmRlZAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1MTcKICAgIC8vIHNjaGVtYTogc2NoZW1hICsgJyknLAogICAgdW5jb3ZlciAyCiAgICBwdXNoYnl0ZXMgIikiCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTE1LTUxOAogICAgLy8gdGhpcy50eXBlcyhpZCkudmFsdWUgPSB7CiAgICAvLyAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbiwKICAgIC8vICAgc2NoZW1hOiBzY2hlbWEgKyAnKScsCiAgICAvLyB9CiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgNAogICAgKwogICAgZGlnIDYKICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICB1bmNvdmVyIDUKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHB1c2hieXRlcyAweDAwMDQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1MTUKICAgIC8vIHRoaXMudHlwZXMoaWQpLnZhbHVlID0gewogICAgdW5jb3ZlciAyCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjE0OAogICAgLy8gdHlwZXMgPSBCb3hNYXA8dWludDY0LCBUeXBlc1ZhbHVlPih7IGtleVByZWZpeDogTWV0YUJveFByZWZpeFR5cGVzIH0pCiAgICBwdXNoYnl0ZXMgInQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTE1LTUxOAogICAgLy8gdGhpcy50eXBlcyhpZCkudmFsdWUgPSB7CiAgICAvLyAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbiwKICAgIC8vICAgc2NoZW1hOiBzY2hlbWEgKyAnKScsCiAgICAvLyB9CiAgICBkdXAKICAgIGJveF9kZWwKICAgIHBvcAogICAgc3dhcAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1MjAKICAgIC8vIGNvbnN0IHN0b3JhZ2U6IHVpbnQ2NCA9IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLm1pbkJhbGFuY2UgLSBtaW5CYWxhbmNlQmVmb3JlCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RNaW5CYWxhbmNlCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIHN3YXAKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTIxCiAgICAvLyB0aGlzLnR5cGVGZWVzLnZhbHVlICs9IE1ldGFUeXBlRmVlIC0gc3RvcmFnZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTM4CiAgICAvLyB0eXBlRmVlcyA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogTWV0YUdsb2JhbFN0YXRlS2V5VHlwZUZlZXMgfSkKICAgIGJ5dGVjXzMgLy8gInR5cGVfZmVlcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTIxCiAgICAvLyB0aGlzLnR5cGVGZWVzLnZhbHVlICs9IE1ldGFUeXBlRmVlIC0gc3RvcmFnZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGMgOSAvLyAxMDAwMDAwMDAKICAgIHVuY292ZXIgMgogICAgLQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxMzgKICAgIC8vIHR5cGVGZWVzID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBNZXRhR2xvYmFsU3RhdGVLZXlUeXBlRmVlcyB9KQogICAgYnl0ZWNfMyAvLyAidHlwZV9mZWVzIgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1MjEKICAgIC8vIHRoaXMudHlwZUZlZXMudmFsdWUgKz0gTWV0YVR5cGVGZWUgLSBzdG9yYWdlCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NDQKICAgIC8vIGFkZFR5cGUocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBkZXNjcmlwdGlvbjogc3RyaW5nLCBzY2hlbWFMaXN0OiBTY2hlbWFMaXN0KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5jb2xsZWN0VHlwZUZlZXNbcm91dGluZ10oKSAtPiB2b2lkOgpjb2xsZWN0VHlwZUZlZXM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjUzMQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYWtpdGFEQU9Fc2Nyb3cuaGFzVmFsdWUgJiYgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuaWQgIT09IDAsIGVyckVzY3Jvd0RvZXNOb3RFeGlzdCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyA2IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjUzMQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYWtpdGFEQU9Fc2Nyb3cuaGFzVmFsdWUgJiYgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuaWQgIT09IDAsIGVyckVzY3Jvd0RvZXNOb3RFeGlzdCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBidXJ5IDEKICAgIGJ6IGNvbGxlY3RUeXBlRmVlc19ib29sX2ZhbHNlQDQKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyA2IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjUzMQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYWtpdGFEQU9Fc2Nyb3cuaGFzVmFsdWUgJiYgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuaWQgIT09IDAsIGVyckVzY3Jvd0RvZXNOb3RFeGlzdCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzIgLy8gMgogICAgZXh0cmFjdF91aW50NjQKICAgIGJ6IGNvbGxlY3RUeXBlRmVlc19ib29sX2ZhbHNlQDQKICAgIGludGNfMSAvLyAxCgpjb2xsZWN0VHlwZUZlZXNfYm9vbF9tZXJnZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1MzEKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmFraXRhREFPRXNjcm93Lmhhc1ZhbHVlICYmIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmlkICE9PSAwLCBlcnJFc2Nyb3dEb2VzTm90RXhpc3QpCiAgICBibnogY29sbGVjdFR5cGVGZWVzX2FmdGVyX2Fzc2VydEA3CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJOZXNjIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5lc2MKCmNvbGxlY3RUeXBlRmVlc19hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTMzCiAgICAvLyBjb25zdCBhcHAgPSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTMzLTUzNAogICAgLy8gY29uc3QgYXBwID0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIC8vIGNvbnN0IHNwYXJlOiB1aW50NjQgPSBhcHAuYmFsYW5jZSA+IGFwcC5taW5CYWxhbmNlID8gYXBwLmJhbGFuY2UgLSBhcHAubWluQmFsYW5jZSA6IDAKICAgIGR1cG4gMgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1MzQKICAgIC8vIGNvbnN0IHNwYXJlOiB1aW50NjQgPSBhcHAuYmFsYW5jZSA+IGFwcC5taW5CYWxhbmNlID8gYXBwLmJhbGFuY2UgLSBhcHAubWluQmFsYW5jZSA6IDAKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0QmFsYW5jZQogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICBzd2FwCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdE1pbkJhbGFuY2UKICAgIGFzc2VydCAvLyBhY2NvdW50IGZ1bmRlZAogICAgPgogICAgYnogY29sbGVjdFR5cGVGZWVzX3Rlcm5hcnlfZmFsc2VAOQogICAgZHVwCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdEJhbGFuY2UKICAgIGFzc2VydCAvLyBhY2NvdW50IGZ1bmRlZAogICAgc3dhcAogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RNaW5CYWxhbmNlCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIC0KCmNvbGxlY3RUeXBlRmVlc190ZXJuYXJ5X21lcmdlQDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1MzUKICAgIC8vIGNvbnN0IGFtb3VudDogdWludDY0ID0gdGhpcy50eXBlRmVlcy52YWx1ZSA8IHNwYXJlID8gdGhpcy50eXBlRmVlcy52YWx1ZSA6IHNwYXJlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxMzgKICAgIC8vIHR5cGVGZWVzID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBNZXRhR2xvYmFsU3RhdGVLZXlUeXBlRmVlcyB9KQogICAgYnl0ZWNfMyAvLyAidHlwZV9mZWVzIgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1MzUKICAgIC8vIGNvbnN0IGFtb3VudDogdWludDY0ID0gdGhpcy50eXBlRmVlcy52YWx1ZSA8IHNwYXJlID8gdGhpcy50eXBlRmVlcy52YWx1ZSA6IHNwYXJlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDEKICAgIDwKICAgIGJ6IGNvbGxlY3RUeXBlRmVlc190ZXJuYXJ5X2ZhbHNlQDEyCiAgICBwb3AKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjEzOAogICAgLy8gdHlwZUZlZXMgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IE1ldGFHbG9iYWxTdGF0ZUtleVR5cGVGZWVzIH0pCiAgICBieXRlY18zIC8vICJ0eXBlX2ZlZXMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjUzNQogICAgLy8gY29uc3QgYW1vdW50OiB1aW50NjQgPSB0aGlzLnR5cGVGZWVzLnZhbHVlIDwgc3BhcmUgPyB0aGlzLnR5cGVGZWVzLnZhbHVlIDogc3BhcmUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCgpjb2xsZWN0VHlwZUZlZXNfdGVybmFyeV9tZXJnZUAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTM2CiAgICAvLyBpZiAoYW1vdW50ID09PSAwKSB7CiAgICBkdXAKICAgIGJueiBjb2xsZWN0VHlwZUZlZXNfYWZ0ZXJfaWZfZWxzZUAxNQogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjUzNwogICAgLy8gcmV0dXJuIDAKICAgIGludGNfMCAvLyAwCgpjb2xsZWN0VHlwZUZlZXNfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLmNvbGxlY3RUeXBlRmVlc0AxNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTMwCiAgICAvLyBjb2xsZWN0VHlwZUZlZXMoKTogdWludDY0IHsKICAgIGl0b2IKICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmNvbGxlY3RUeXBlRmVlc19hZnRlcl9pZl9lbHNlQDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1NDAKICAgIC8vIHRoaXMudHlwZUZlZXMudmFsdWUgLT0gYW1vdW50CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxMzgKICAgIC8vIHR5cGVGZWVzID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBNZXRhR2xvYmFsU3RhdGVLZXlUeXBlRmVlcyB9KQogICAgYnl0ZWNfMyAvLyAidHlwZV9mZWVzIgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1NDAKICAgIC8vIHRoaXMudHlwZUZlZXMudmFsdWUgLT0gYW1vdW50CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDEKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTM4CiAgICAvLyB0eXBlRmVlcyA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogTWV0YUdsb2JhbFN0YXRlS2V5VHlwZUZlZXMgfSkKICAgIGJ5dGVjXzMgLy8gInR5cGVfZmVlcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTQwCiAgICAvLyB0aGlzLnR5cGVGZWVzLnZhbHVlIC09IGFtb3VudAogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTQxCiAgICAvLyBpdHhuLnBheW1lbnQoeyByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywgYW1vdW50LCBmZWU6IDAgfSkuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyA2IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjU0MQogICAgLy8gaXR4bi5wYXltZW50KHsgcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsIGFtb3VudCwgZmVlOiAwIH0pLnN1Ym1pdCgpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18yIC8vIDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBkaWcgMQogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjUzMAogICAgLy8gY29sbGVjdFR5cGVGZWVzKCk6IHVpbnQ2NCB7CiAgICBiIGNvbGxlY3RUeXBlRmVlc19hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEuY29sbGVjdFR5cGVGZWVzQDE3Cgpjb2xsZWN0VHlwZUZlZXNfdGVybmFyeV9mYWxzZUAxMjoKICAgIGIgY29sbGVjdFR5cGVGZWVzX3Rlcm5hcnlfbWVyZ2VAMTMKCmNvbGxlY3RUeXBlRmVlc190ZXJuYXJ5X2ZhbHNlQDk6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTM0CiAgICAvLyBjb25zdCBzcGFyZTogdWludDY0ID0gYXBwLmJhbGFuY2UgPiBhcHAubWluQmFsYW5jZSA/IGFwcC5iYWxhbmNlIC0gYXBwLm1pbkJhbGFuY2UgOiAwCiAgICBpbnRjXzAgLy8gMAogICAgYiBjb2xsZWN0VHlwZUZlZXNfdGVybmFyeV9tZXJnZUAxMAoKY29sbGVjdFR5cGVGZWVzX2Jvb2xfZmFsc2VANDoKICAgIGludGNfMCAvLyAwCiAgICBiIGNvbGxlY3RUeXBlRmVlc19ib29sX21lcmdlQDUKCgovLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnJvb3RDb3N0c1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnJvb3RDb3N0czoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTQ3CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjU1MAogICAgLy8gcmV0dXJuIDMxXzcwMCArIDQwMCAqIEJ5dGVzKG5hbWUpLmxlbmd0aAogICAgbGVuCiAgICBpbnRjIDUgLy8gNDAwCiAgICAqCiAgICBpbnRjIDYgLy8gMzE3MDAKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTQ3CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGl0b2IKICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLmRhdGFDb3N0c1tyb3V0aW5nXSgpIC0+IHZvaWQ6CmRhdGFDb3N0czoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTUzCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTU1CiAgICAvLyByZXR1cm4gdGhpcy5yZWNvcmRTdG9yYWdlQ29zdCh0aGlzLmRhdGFLZXkobmFtZSwga2V5KSwgQnl0ZXModmFsdWUpLmxlbmd0aCkKICAgIGNvdmVyIDIKICAgIGNhbGxzdWIgZGF0YUtleQogICAgc3dhcAogICAgbGVuCiAgICBjYWxsc3ViIHJlY29yZFN0b3JhZ2VDb3N0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjU1MwogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBpdG9iCiAgICBieXRlY18wIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZWNvcmRJbmZvW3JvdXRpbmddKCkgLT4gdm9pZDoKcmVjb3JkSW5mbzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTU4CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZWNvcmRJbmZvCiAgICBieXRlY18wIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZWFkUmVjb3JkW3JvdXRpbmddKCkgLT4gdm9pZDoKcmVhZFJlY29yZDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTY1CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZWFkUmVjb3JkCiAgICBieXRlY18wIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZWFkUmVjb3JkU2xpY2Vbcm91dGluZ10oKSAtPiB2b2lkOgpyZWFkUmVjb3JkU2xpY2U6CiAgICBieXRlY18xIC8vICIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjU3NAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXBuIDIKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciAyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgMgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTc2CiAgICAvLyBjb25zdCBpbmZvID0gdGhpcy5yZWNvcmRJbmZvKGFjY291bnQsIGtleSkKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZWNvcmRJbmZvCiAgICBkdXAKICAgIGNvdmVyIDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTc3CiAgICAvLyBsb2dnZWRBc3NlcnQoaW5mby5leGlzdHMsIGVyclJlY29yZE5vdEZvdW5kKQogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgYm56IHJlYWRSZWNvcmRTbGljZV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMjMgLy8gIkVSUjplcnJNcm5mIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck1ybmYKCnJlYWRSZWNvcmRTbGljZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTc4CiAgICAvLyBsb2dnZWRBc3NlcnQoaW5mby5yZXZpc2lvbiA9PT0gZXhwZWN0ZWRSZXZpc2lvbiwgZXJyUmVjb3JkUmV2aXNpb25NaXNtYXRjaCkKICAgIGRpZyA1CiAgICBpbnRjXzEgLy8gMQogICAgZXh0cmFjdF91aW50NjQKICAgID09CiAgICBibnogcmVhZFJlY29yZFNsaWNlX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyAxNCAvLyAiRVJSOmVyck1yZXYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTXJldgoKcmVhZFJlY29yZFNsaWNlX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1NzkKICAgIC8vIGxvZ2dlZEFzc2VydChsZW5ndGggPD0gTWF4UmVjb3JkQ2h1bmtCeXRlcyAmJiBvZmZzZXQgPD0gaW5mby5zaXplICYmIGxlbmd0aCA8PSBpbmZvLnNpemUgLSBvZmZzZXQsIGVyclJlY29yZFJhbmdlKQogICAgZHVwCiAgICBpbnRjIDcgLy8gMTAyNAogICAgPD0KICAgIGJ6IHJlYWRSZWNvcmRTbGljZV9ib29sX2ZhbHNlQDkKICAgIGRpZyA0CiAgICBwdXNoaW50IDkKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGJ1cnkgNwogICAgZGlnIDIKICAgID49CiAgICBieiByZWFkUmVjb3JkU2xpY2VfYm9vbF9mYWxzZUA5CiAgICBkaWcgNQogICAgZGlnIDIKICAgIC0KICAgIGRpZyAxCiAgICA+PQogICAgYnogcmVhZFJlY29yZFNsaWNlX2Jvb2xfZmFsc2VAOQogICAgaW50Y18xIC8vIDEKCnJlYWRSZWNvcmRTbGljZV9ib29sX21lcmdlQDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1NzkKICAgIC8vIGxvZ2dlZEFzc2VydChsZW5ndGggPD0gTWF4UmVjb3JkQ2h1bmtCeXRlcyAmJiBvZmZzZXQgPD0gaW5mby5zaXplICYmIGxlbmd0aCA8PSBpbmZvLnNpemUgLSBvZmZzZXQsIGVyclJlY29yZFJhbmdlKQogICAgYm56IHJlYWRSZWNvcmRTbGljZV9hZnRlcl9hc3NlcnRAMTIKICAgIHB1c2hieXRlcyAiRVJSOmVyck1ybmciCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTXJuZwoKcmVhZFJlY29yZFNsaWNlX2FmdGVyX2Fzc2VydEAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTgwCiAgICAvLyByZXR1cm4gdGhpcy5yZWNvcmRzKHRoaXMucmVjb3JkS2V5KGFjY291bnQsIGtleSkpLmV4dHJhY3QoUmVjb3JkSGVhZGVyQnl0ZXMgKyBvZmZzZXQsIGxlbmd0aCkKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAzCiAgICBjYWxsc3ViIHJlY29yZEtleQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxNTIKICAgIC8vIHJlY29yZHMgPSBCb3hNYXA8Ynl0ZXMsIE1ldGFSZWNvcmRWYWx1ZT4oeyBrZXlQcmVmaXg6IFJlY29yZFByZWZpeCB9KQogICAgYnl0ZWNfMiAvLyAibSIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1ODAKICAgIC8vIHJldHVybiB0aGlzLnJlY29yZHModGhpcy5yZWNvcmRLZXkoYWNjb3VudCwga2V5KSkuZXh0cmFjdChSZWNvcmRIZWFkZXJCeXRlcyArIG9mZnNldCwgbGVuZ3RoKQogICAgcHVzaGludCAxMgogICAgdW5jb3ZlciAzCiAgICArCiAgICB1bmNvdmVyIDIKICAgIGJveF9leHRyYWN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjU3NAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYnl0ZWNfMCAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKcmVhZFJlY29yZFNsaWNlX2Jvb2xfZmFsc2VAOToKICAgIGludGNfMCAvLyAwCiAgICBiIHJlYWRSZWNvcmRTbGljZV9ib29sX21lcmdlQDEwCgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZWNvcmRDb3N0W3JvdXRpbmddKCkgLT4gdm9pZDoKcmVjb3JkQ29zdDoKICAgIGludGNfMCAvLyAwCiAgICBieXRlY18xIC8vICIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjU4MwogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTg1CiAgICAvLyBsb2dnZWRBc3NlcnQoc2l6ZSArIFJlY29yZEFyZ3VtZW50Qnl0ZXMgKyBrZXkubGVuZ3RoIDw9IE1heEFwcENhbGxBcmd1bWVudEJ5dGVzLCBlcnJSZWNvcmRWYWx1ZVRvb0xhcmdlKQogICAgcHVzaGludCAyMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICArCiAgICBpbnRjIDEwIC8vIDE2Mzg0CiAgICA8PQogICAgYm56IHJlY29yZENvc3RfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDI0IC8vICJFUlI6ZXJyTXZzeiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJNdnN6CgpyZWNvcmRDb3N0X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1ODYKICAgIC8vIGNvbnN0IGlkID0gdGhpcy5yZWNvcmRLZXkoYWNjb3VudCwga2V5KQogICAgc3dhcAogICAgZGlnIDIKICAgIGR1cAogICAgY292ZXIgMgogICAgY2FsbHN1YiByZWNvcmRLZXkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTg3CiAgICAvLyBjb25zdCBuZXh0ID0gdGhpcy5yZWNvcmRTdG9yYWdlQ29zdChrZXksIHNpemUpCiAgICBzd2FwCiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgcmVjb3JkU3RvcmFnZUNvc3QKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTg4CiAgICAvLyBsZXQgcHJldmlvdXM6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBidXJ5IDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTUyCiAgICAvLyByZWNvcmRzID0gQm94TWFwPGJ5dGVzLCBNZXRhUmVjb3JkVmFsdWU+KHsga2V5UHJlZml4OiBSZWNvcmRQcmVmaXggfSkKICAgIGJ5dGVjXzIgLy8gIm0iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgYnVyeSA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjU4OQogICAgLy8gaWYgKHRoaXMucmVjb3JkcyhpZCkuZXhpc3RzKSBwcmV2aW91cyA9IHRoaXMucmVjb3JkU3RvcmFnZUNvc3Qoa2V5LCB0aGlzLnJlY29yZHMoaWQpLmxlbmd0aCAtIFJlY29yZEhlYWRlckJ5dGVzKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiByZWNvcmRDb3N0X2FmdGVyX2lmX2Vsc2VANQogICAgZGlnIDMKICAgIGJveF9sZW4KICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBwdXNoaW50IDEyCiAgICAtCiAgICBkaWcgMgogICAgc3dhcAogICAgY2FsbHN1YiByZWNvcmRTdG9yYWdlQ29zdAogICAgYnVyeSAzCgpyZWNvcmRDb3N0X2FmdGVyX2lmX2Vsc2VANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTkwCiAgICAvLyByZXR1cm4gbmV4dCA+IHByZXZpb3VzID8gbmV4dCAtIHByZXZpb3VzIDogMAogICAgZHVwCiAgICBkaWcgMwogICAgPgogICAgYnogcmVjb3JkQ29zdF90ZXJuYXJ5X2ZhbHNlQDcKICAgIGRpZyAyCiAgICAtCgpyZWNvcmRDb3N0X3Rlcm5hcnlfbWVyZ2VAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTgzCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGl0b2IKICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCnJlY29yZENvc3RfdGVybmFyeV9mYWxzZUA3OgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjU5MAogICAgLy8gcmV0dXJuIG5leHQgPiBwcmV2aW91cyA/IG5leHQgLSBwcmV2aW91cyA6IDAKICAgIGludGNfMCAvLyAwCiAgICBiIHJlY29yZENvc3RfdGVybmFyeV9tZXJnZUA4CgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5zZXRSZWNvcmRbcm91dGluZ10oKSAtPiB2b2lkOgpzZXRSZWNvcmQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjU5NC01OTgKICAgIC8vIHNldFJlY29yZCgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBrZXk6IGJ5dGVzLAogICAgLy8gICBkYXRhMDogYnl0ZXMsIGRhdGExOiBieXRlcywgZGF0YTI6IGJ5dGVzLCBkYXRhMzogYnl0ZXMsCiAgICAvLyAgIGV4cGVjdGVkUmV2aXNpb246IHVpbnQ2NCwKICAgIC8vICk6IHVpbnQ2NCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBkdXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBzd2FwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgc3dhcAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHN3YXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDUKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBzd2FwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA2CiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1OTkKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5pc1BvbGljeUtleShrZXkpLCBlcnJQb2xpY3lLZXkpCiAgICBjYWxsc3ViIGlzUG9saWN5S2V5CiAgICBieiBzZXRSZWNvcmRfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDI1IC8vICJFUlI6ZXJyTXBreSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJNcGt5CgpzZXRSZWNvcmRfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjYwMAogICAgLy8gcmV0dXJuIHRoaXMuc3RvcmVSZWNvcmQocGF5bWVudCwga2V5LCBkYXRhMCwgZGF0YTEsIGRhdGEyLCBkYXRhMywgZXhwZWN0ZWRSZXZpc2lvbikKICAgIGNhbGxzdWIgc3RvcmVSZWNvcmQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTk0LTU5OAogICAgLy8gc2V0UmVjb3JkKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGtleTogYnl0ZXMsCiAgICAvLyAgIGRhdGEwOiBieXRlcywgZGF0YTE6IGJ5dGVzLCBkYXRhMjogYnl0ZXMsIGRhdGEzOiBieXRlcywKICAgIC8vICAgZXhwZWN0ZWRSZXZpc2lvbjogdWludDY0LAogICAgLy8gKTogdWludDY0IHsKICAgIGl0b2IKICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnJlbW92ZVJlY29yZFtyb3V0aW5nXSgpIC0+IHZvaWQ6CnJlbW92ZVJlY29yZDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NjQzCiAgICAvLyByZW1vdmVSZWNvcmQoa2V5OiBieXRlcywgZXhwZWN0ZWRSZXZpc2lvbjogdWludDY0KTogdWludDY0IHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnJlbW92ZVJlY29yZAogICAgaXRvYgogICAgYnl0ZWNfMCAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEuc2V0UG9saWN5V3JpdGVyW3JvdXRpbmddKCkgLT4gdm9pZDoKc2V0UG9saWN5V3JpdGVyOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2ODYKICAgIC8vIHNldFBvbGljeVdyaXRlcih3cml0ZXI6IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlYyA0IC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjIDcgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2ODkKICAgIC8vIGRhby5pZCA9PT0gMCA/IFR4bi5zZW5kZXIgPT09IEdsb2JhbC5jcmVhdG9yQWRkcmVzcyA6IFR4bi5zZW5kZXIgPT09IGRhby5hZGRyZXNzLAogICAgYm56IHNldFBvbGljeVdyaXRlcl90ZXJuYXJ5X2ZhbHNlQDMKICAgIHBvcAogICAgdHhuIFNlbmRlcgogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICA9PQoKc2V0UG9saWN5V3JpdGVyX3Rlcm5hcnlfbWVyZ2VANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Njg4LTY5MQogICAgLy8gbG9nZ2VkQXNzZXJ0KAogICAgLy8gICBkYW8uaWQgPT09IDAgPyBUeG4uc2VuZGVyID09PSBHbG9iYWwuY3JlYXRvckFkZHJlc3MgOiBUeG4uc2VuZGVyID09PSBkYW8uYWRkcmVzcywKICAgIC8vICAgZXJyTm90QWtpdGFEYW8sCiAgICAvLyApCiAgICBibnogc2V0UG9saWN5V3JpdGVyX2FmdGVyX2Fzc2VydEA2CiAgICBieXRlYyA4IC8vICJFUlI6ZXJyTmRhbyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOZGFvCgpzZXRQb2xpY3lXcml0ZXJfYWZ0ZXJfYXNzZXJ0QDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjE0MwogICAgLy8gcG9saWN5V3JpdGVyID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBNZXRhR2xvYmFsU3RhdGVLZXlQb2xpY3lXcml0ZXIgfSkKICAgIGJ5dGVjIDI2IC8vICJwb2xpY3lfd3JpdGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2OTIKICAgIC8vIHRoaXMucG9saWN5V3JpdGVyLnZhbHVlID0gd3JpdGVyCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2ODYKICAgIC8vIHNldFBvbGljeVdyaXRlcih3cml0ZXI6IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpzZXRQb2xpY3lXcml0ZXJfdGVybmFyeV9mYWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2ODkKICAgIC8vIGRhby5pZCA9PT0gMCA/IFR4bi5zZW5kZXIgPT09IEdsb2JhbC5jcmVhdG9yQWRkcmVzcyA6IFR4bi5zZW5kZXIgPT09IGRhby5hZGRyZXNzLAogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGIgc2V0UG9saWN5V3JpdGVyX3Rlcm5hcnlfbWVyZ2VANAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEuc2V0UG9saWN5W3JvdXRpbmddKCkgLT4gdm9pZDoKc2V0UG9saWN5OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2OTkKICAgIC8vIHNldFBvbGljeShwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIHdhbGxldDogQXBwbGljYXRpb24sIGtleTogYnl0ZXMsIGRhdGE6IGJ5dGVzLCBleHBlY3RlZFJldmlzaW9uOiB1aW50NjQpOiB1aW50NjQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo3MDAKICAgIC8vIHRoaXMucmVxdWlyZVBvbGljeVdpbmRvdyh3YWxsZXQsIGtleSkKICAgIHVuY292ZXIgMwogICAgZGlnIDMKICAgIGNhbGxzdWIgcmVxdWlyZVBvbGljeVdpbmRvdwogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo3MDEKICAgIC8vIHJldHVybiB0aGlzLnN0b3JlUmVjb3JkKHBheW1lbnQsIGtleSwgQnl0ZXMoJycpLCBCeXRlcygnJyksIEJ5dGVzKCcnKSwgZGF0YSwgZXhwZWN0ZWRSZXZpc2lvbikKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAzCiAgICBieXRlY18xIC8vICIiCiAgICBkdXBuIDIKICAgIHVuY292ZXIgNgogICAgdW5jb3ZlciA2CiAgICBjYWxsc3ViIHN0b3JlUmVjb3JkCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjY5OQogICAgLy8gc2V0UG9saWN5KHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgd2FsbGV0OiBBcHBsaWNhdGlvbiwga2V5OiBieXRlcywgZGF0YTogYnl0ZXMsIGV4cGVjdGVkUmV2aXNpb246IHVpbnQ2NCk6IHVpbnQ2NCB7CiAgICBpdG9iCiAgICBieXRlY18wIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZW1vdmVQb2xpY3lbcm91dGluZ10oKSAtPiB2b2lkOgpyZW1vdmVQb2xpY3k6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjcwNQogICAgLy8gcmVtb3ZlUG9saWN5KHdhbGxldDogQXBwbGljYXRpb24sIGtleTogYnl0ZXMsIGV4cGVjdGVkUmV2aXNpb246IHVpbnQ2NCk6IHVpbnQ2NCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjcwNgogICAgLy8gdGhpcy5yZXF1aXJlUG9saWN5V2luZG93KHdhbGxldCwga2V5KQogICAgdW5jb3ZlciAyCiAgICBkaWcgMgogICAgY2FsbHN1YiByZXF1aXJlUG9saWN5V2luZG93CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjcwNwogICAgLy8gdGhpcy5kcm9wUmVjb3JkKGtleSwgZXhwZWN0ZWRSZXZpc2lvbikKICAgIGNhbGxzdWIgZHJvcFJlY29yZAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo3MDUKICAgIC8vIHJlbW92ZVBvbGljeSh3YWxsZXQ6IEFwcGxpY2F0aW9uLCBrZXk6IGJ5dGVzLCBleHBlY3RlZFJldmlzaW9uOiB1aW50NjQpOiB1aW50NjQgewogICAgcHVzaGJ5dGVzIDB4MTUxZjdjNzUwMDAwMDAwMDAwMDAwMDAwCiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6QWtpdGFCYXNlRmVlR2VuZXJhdG9yQ29udHJhY3RXaXRob3V0QWtpdGFPcHRJbi51cGRhdGVBa2l0YURBT0VzY3Jvd1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZUFraXRhREFPRXNjcm93OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTAKICAgIC8vIHVwZGF0ZUFraXRhREFPRXNjcm93KGNvbmZpZzogRXNjcm93Q29uZmlnKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXBuIDIKICAgIGxlbgogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBwdXNoaW50IDEwCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDAgb2YgKChsZW4rdXRmOFtdKSx1aW50NjQpCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGRpZyAyCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAxMgogICAgKwogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkVzY3Jvd0NvbmZpZwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTEKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjIDQgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWMgNyAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTEKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IHVwZGF0ZUFraXRhREFPRXNjcm93X2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA4IC8vICJFUlI6ZXJyTmRhbyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOZGFvCgp1cGRhdGVBa2l0YURBT0VzY3Jvd19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjIDYgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUyCiAgICAvLyB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlID0gY2xvbmUoY29uZmlnKQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUwCiAgICAvLyB1cGRhdGVBa2l0YURBT0VzY3Jvdyhjb25maWc6IEVzY3Jvd0NvbmZpZyk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czo6VXBncmFkZWFibGVBa2l0YUJhc2VDb250cmFjdC51cGRhdGVbcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzUKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozNwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWMgNCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyA3IC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzcKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IHVwZGF0ZV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgOCAvLyAiRVJSOmVyck5kYW8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmRhbwoKdXBkYXRlX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM4CiAgICAvLyBjb25zdCBbcGx1Z2luc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1BsdWdpbkFwcExpc3QpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjIDQgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozOAogICAgLy8gY29uc3QgW3BsdWdpbnNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXModGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNQbHVnaW5BcHBMaXN0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBwdXNoYnl0ZXMgInBhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozOQogICAgLy8gY29uc3QgdXBkYXRlUGx1Z2luID0gZGVjb2RlQXJjNDxQbHVnaW5BcHBMaXN0PihwbHVnaW5zKS51cGRhdGUKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6NDAKICAgIC8vIGxvZ2dlZEFzc2VydChHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25JZCA9PT0gdXBkYXRlUGx1Z2luLCBlcnJJbnZhbGlkVXBncmFkZSkKICAgIGdsb2JhbCBDYWxsZXJBcHBsaWNhdGlvbklECiAgICA9PQogICAgYm56IHVwZGF0ZV9hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6ZXJySXVwZyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJdXBnCgp1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTQKICAgIC8vIHZlcnNpb24gPSBHbG9iYWxTdGF0ZTxzdHJpbmc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleVZlcnNpb24gfSkKICAgIGJ5dGVjIDE1IC8vICJ2ZXJzaW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjQxCiAgICAvLyB0aGlzLnZlcnNpb24udmFsdWUgPSBuZXdWZXJzaW9uCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM1CiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiBbJ1VwZGF0ZUFwcGxpY2F0aW9uJ10gfSkKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6OkFraXRhQmFzZUNvbnRyYWN0LnVwZGF0ZUFraXRhREFPW3JvdXRpbmddKCkgLT4gdm9pZDoKdXBkYXRlQWtpdGFEQU86CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MjUKICAgIC8vIHVwZGF0ZUFraXRhREFPKGFraXRhREFPOiBBcHBsaWNhdGlvbik6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNgogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWMgNCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyA3IC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MjYKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IHVwZGF0ZUFraXRhREFPX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA4IC8vICJFUlI6ZXJyTmRhbyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOZGFvCgp1cGRhdGVBa2l0YURBT19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjIDQgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNwogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSA9IGFraXRhREFPCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjI1CiAgICAvLyB1cGRhdGVBa2l0YURBTyhha2l0YURBTzogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnJlY29yZEtleShhY2NvdW50OiBieXRlcywga2V5OiBieXRlcykgLT4gYnl0ZXM6CnJlY29yZEtleToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTcwCiAgICAvLyBwcml2YXRlIHJlY29yZEtleShhY2NvdW50OiBBY2NvdW50LCBrZXk6IGJ5dGVzKTogYnl0ZXMgewogICAgcHJvdG8gMiAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjE3MQogICAgLy8gbG9nZ2VkQXNzZXJ0KGtleS5sZW5ndGggPiAwICYmIGtleS5sZW5ndGggPD0gTWF4UmVjb3JkS2V5Qnl0ZXMsIGVyckludmFsaWRLZXkpCiAgICBmcmFtZV9kaWcgLTEKICAgIGxlbgogICAgZHVwCiAgICBieiByZWNvcmRLZXlfYm9vbF9mYWxzZUAzCiAgICBmcmFtZV9kaWcgMAogICAgcHVzaGludCAzMQogICAgPD0KICAgIGJ6IHJlY29yZEtleV9ib29sX2ZhbHNlQDMKICAgIGludGNfMSAvLyAxCgpyZWNvcmRLZXlfYm9vbF9tZXJnZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxNzEKICAgIC8vIGxvZ2dlZEFzc2VydChrZXkubGVuZ3RoID4gMCAmJiBrZXkubGVuZ3RoIDw9IE1heFJlY29yZEtleUJ5dGVzLCBlcnJJbnZhbGlkS2V5KQogICAgYm56IHJlY29yZEtleV9hZnRlcl9hc3NlcnRANgogICAgYnl0ZWMgMTggLy8gIkVSUjplcnJNa2V5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck1rZXkKCnJlY29yZEtleV9hZnRlcl9hc3NlcnRANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTcyCiAgICAvLyByZXR1cm4gYWNjb3VudC5ieXRlcy5jb25jYXQoa2V5KQogICAgZnJhbWVfZGlnIC0yCiAgICBmcmFtZV9kaWcgLTEKICAgIGNvbmNhdAogICAgc3dhcAogICAgcmV0c3ViCgpyZWNvcmRLZXlfYm9vbF9mYWxzZUAzOgogICAgaW50Y18wIC8vIDAKICAgIGIgcmVjb3JkS2V5X2Jvb2xfbWVyZ2VANAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEuZGF0YUtleShuYW1lOiBieXRlcywga2V5OiBieXRlcykgLT4gYnl0ZXM6CmRhdGFLZXk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjE3NgogICAgLy8gcHJpdmF0ZSBkYXRhS2V5KG5hbWU6IHN0cmluZywga2V5OiBzdHJpbmcpOiBieXRlcyB7CiAgICBwcm90byAyIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTc3CiAgICAvLyBsb2dnZWRBc3NlcnQoQnl0ZXMobmFtZSkubGVuZ3RoICsgQnl0ZXMoa2V5KS5sZW5ndGggPCBNYXhSZWNvcmRLZXlCeXRlcywgZXJyS2V5VG9vTG9uZykKICAgIGZyYW1lX2RpZyAtMgogICAgbGVuCiAgICBkdXAKICAgIGZyYW1lX2RpZyAtMQogICAgbGVuCiAgICArCiAgICBwdXNoaW50IDMxCiAgICA8CiAgICBibnogZGF0YUtleV9hZnRlcl9hc3NlcnRAMgogICAgYnl0ZWMgMTMgLy8gIkVSUjplcnJLdGwiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyS3RsCgpkYXRhS2V5X2FmdGVyX2Fzc2VydEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxNzgKICAgIC8vIHJldHVybiBuZXcgVWludDgoQnl0ZXMobmFtZSkubGVuZ3RoKS5ieXRlcy5jb25jYXQoQnl0ZXMobmFtZSkpLmNvbmNhdChCeXRlcyhrZXkpKQogICAgaXRvYgogICAgZHVwCiAgICBiaXRsZW4KICAgIHB1c2hpbnQgOAogICAgPD0KICAgIGFzc2VydCAvLyBvdmVyZmxvdwogICAgZXh0cmFjdCA3IDEKICAgIGZyYW1lX2RpZyAtMgogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgLTEKICAgIGNvbmNhdAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZWNvcmRTdG9yYWdlQ29zdChrZXk6IGJ5dGVzLCBzaXplOiB1aW50NjQpIC0+IHVpbnQ2NDoKcmVjb3JkU3RvcmFnZUNvc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjE4MQogICAgLy8gcHJpdmF0ZSByZWNvcmRTdG9yYWdlQ29zdChrZXk6IGJ5dGVzLCBzaXplOiB1aW50NjQpOiB1aW50NjQgewogICAgcHJvdG8gMiAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjE4MgogICAgLy8gcmV0dXJuIDI1MDAgKyA0MDAgKiAoMzMgKyBrZXkubGVuZ3RoICsgUmVjb3JkSGVhZGVyQnl0ZXMgKyBzaXplKQogICAgZnJhbWVfZGlnIC0yCiAgICBsZW4KICAgIHB1c2hpbnQgNDUKICAgICsKICAgIGZyYW1lX2RpZyAtMQogICAgKwogICAgaW50YyA1IC8vIDQwMAogICAgKgogICAgcHVzaGludCAyNTAwCiAgICArCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnJlbGVhc2VSZWNvcmQoYm94OiBieXRlcywgYW1vdW50OiB1aW50NjQpIC0+IHZvaWQ6CnJlbGVhc2VSZWNvcmQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjE5NwogICAgLy8gcHJpdmF0ZSByZWxlYXNlUmVjb3JkKGJveDogYnl0ZXMsIGFtb3VudDogdWludDY0KTogdm9pZCB7CiAgICBwcm90byAyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTk4CiAgICAvLyBjb25zdCBbcmVjZWl2ZXIsIHRvdGFsXSA9IHJlbGVhc2VEZXBvc2l0KGJveCwgVHhuLnNlbmRlciwgYW1vdW50KQogICAgZnJhbWVfZGlnIC0yCiAgICB0eG4gU2VuZGVyCiAgICBmcmFtZV9kaWcgLTEKICAgIGNhbGxzdWIgcmVsZWFzZURlcG9zaXQKICAgIGR1cAogICAgZXh0cmFjdCAwIDMyCiAgICBzd2FwCiAgICBpbnRjXzMgLy8gMzIKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTk5CiAgICAvLyBpZiAodG90YWwgPiAwKSBpdHhuLnBheW1lbnQoeyByZWNlaXZlciwgYW1vdW50OiB0b3RhbCwgZmVlOiAwIH0pLnN1Ym1pdCgpCiAgICBieiByZWxlYXNlUmVjb3JkX2FmdGVyX2lmX2Vsc2VAMwogICAgaXR4bl9iZWdpbgogICAgZnJhbWVfZGlnIDEKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBmcmFtZV9kaWcgMAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKCnJlbGVhc2VSZWNvcmRfYWZ0ZXJfaWZfZWxzZUAzOgogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5jdXJyZW50UmVjb3JkUmV2aXNpb24oaWQ6IGJ5dGVzKSAtPiB1aW50NjQ6CmN1cnJlbnRSZWNvcmRSZXZpc2lvbjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MjEzCiAgICAvLyBwcml2YXRlIGN1cnJlbnRSZWNvcmRSZXZpc2lvbihpZDogYnl0ZXMpOiB1aW50NjQgewogICAgcHJvdG8gMSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjE1MgogICAgLy8gcmVjb3JkcyA9IEJveE1hcDxieXRlcywgTWV0YVJlY29yZFZhbHVlPih7IGtleVByZWZpeDogUmVjb3JkUHJlZml4IH0pCiAgICBieXRlY18yIC8vICJtIgogICAgZnJhbWVfZGlnIC0xCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyMTQKICAgIC8vIHJldHVybiB0aGlzLnJlY29yZHMoaWQpLmV4aXN0cyA/IHRoaXMucmVjb3JkcyhpZCkudmFsdWUucmV2aXNpb24gOiAwCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGN1cnJlbnRSZWNvcmRSZXZpc2lvbl90ZXJuYXJ5X2ZhbHNlQDIKICAgIGludGNfMCAvLyAwCiAgICBwdXNoaW50IDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICByZXRzdWIKCmN1cnJlbnRSZWNvcmRSZXZpc2lvbl90ZXJuYXJ5X2ZhbHNlQDI6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MjE0CiAgICAvLyByZXR1cm4gdGhpcy5yZWNvcmRzKGlkKS5leGlzdHMgPyB0aGlzLnJlY29yZHMoaWQpLnZhbHVlLnJldmlzaW9uIDogMAogICAgaW50Y18wIC8vIDAKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEud3JpdGVSZWNvcmQoa2V5OiBieXRlcywgZGF0YTogYnl0ZXMpIC0+IHVpbnQ2NDoKd3JpdGVSZWNvcmQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjIxNwogICAgLy8gcHJpdmF0ZSB3cml0ZVJlY29yZChrZXk6IGJ5dGVzLCBkYXRhOiBieXRlcyk6IHVpbnQ2NCB7CiAgICBwcm90byAyIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MjE4CiAgICAvLyBjb25zdCBpZCA9IHRoaXMucmVjb3JkS2V5KFR4bi5zZW5kZXIsIGtleSkKICAgIHR4biBTZW5kZXIKICAgIGZyYW1lX2RpZyAtMgogICAgY2FsbHN1YiByZWNvcmRLZXkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MjE5CiAgICAvLyBjb25zdCByZXZpc2lvbjogdWludDY0ID0gdGhpcy5jdXJyZW50UmVjb3JkUmV2aXNpb24oaWQpICsgMQogICAgZHVwCiAgICBjYWxsc3ViIGN1cnJlbnRSZWNvcmRSZXZpc2lvbgogICAgaW50Y18xIC8vIDEKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MjIwCiAgICAvLyB0aGlzLnJlY29yZHMoaWQpLnZhbHVlID0geyByZXZpc2lvbiwgZGF0YSB9CiAgICBkdXAKICAgIGl0b2IKICAgIGZyYW1lX2RpZyAtMQogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgZnJhbWVfZGlnIC0xCiAgICBjb25jYXQKICAgIHN3YXAKICAgIHB1c2hieXRlcyAweDAwMGEKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjE1MgogICAgLy8gcmVjb3JkcyA9IEJveE1hcDxieXRlcywgTWV0YVJlY29yZFZhbHVlPih7IGtleVByZWZpeDogUmVjb3JkUHJlZml4IH0pCiAgICBieXRlY18yIC8vICJtIgogICAgdW5jb3ZlciAzCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MjIwCiAgICAvLyB0aGlzLnJlY29yZHMoaWQpLnZhbHVlID0geyByZXZpc2lvbiwgZGF0YSB9CiAgICBkdXAKICAgIGJveF9kZWwKICAgIHBvcAogICAgc3dhcAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyMjEKICAgIC8vIHJldHVybiByZXZpc2lvbgogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS52ZXJpZnkoYWRkcmVzczogYnl0ZXMsIG5hbWU6IGJ5dGVzLCBsZWFmOiBieXRlcywgcHJvb2Y6IGJ5dGVzLCB0eXBlOiB1aW50NjQpIC0+IHVpbnQ2NCwgYnl0ZXM6CnNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEudmVyaWZ5OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czozNjEKICAgIC8vIHZlcmlmeShhZGRyZXNzOiBBY2NvdW50LCBuYW1lOiBzdHJpbmcsIGxlYWY6IExlYWYsIHByb29mOiBQcm9vZiwgdHlwZTogdWludDY0KTogYm9vbGVhbiB7CiAgICBwcm90byA1IDIKICAgIGJ5dGVjXzEgLy8gIiIKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czozNjIKICAgIC8vIGNvbnN0IHJvb3RLZXkgPSB0aGlzLnJlY29yZEtleShhZGRyZXNzLCBCeXRlcyhuYW1lKSkKICAgIGZyYW1lX2RpZyAtNQogICAgZnJhbWVfZGlnIC00CiAgICBjYWxsc3ViIHJlY29yZEtleQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxNTAKICAgIC8vIHJvb3RzID0gQm94TWFwPGJ5dGVzLCBSb290VmFsdWU+KHsga2V5UHJlZml4OiBNZXRhQm94UHJlZml4Um9vdHMgfSkKICAgIGJ5dGVjIDUgLy8gInIiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czozNjMKICAgIC8vIGlmICghdGhpcy5yb290cyhyb290S2V5KS5leGlzdHMpIHJldHVybiBmYWxzZQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS52ZXJpZnlfYWZ0ZXJfaWZfZWxzZUAyCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfZGlnIC0yCiAgICBmcmFtZV9idXJ5IDEKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnZlcmlmeV9hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjM2NAogICAgLy8gY29uc3QgdHJlZVR5cGUgPSB0aGlzLnJvb3RzKHJvb3RLZXkpLnZhbHVlLnR5cGUKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGludGNfMyAvLyAzMgogICAgZXh0cmFjdF91aW50NjQKICAgIGZyYW1lX2J1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czozNjUKICAgIC8vIGlmICh0eXBlICE9PSBNZXJrbGVUcmVlVHlwZVVuc3BlY2lmaWVkICYmIHRyZWVUeXBlICE9PSB0eXBlKSByZXR1cm4gZmFsc2UKICAgIGZyYW1lX2RpZyAtMQogICAgYnogc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS52ZXJpZnlfYWZ0ZXJfaWZfZWxzZUA1CiAgICBmcmFtZV9kaWcgMQogICAgZnJhbWVfZGlnIC0xCiAgICAhPQogICAgYnogc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS52ZXJpZnlfYWZ0ZXJfaWZfZWxzZUA1CiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfZGlnIC0yCiAgICBmcmFtZV9idXJ5IDEKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnZlcmlmeV9hZnRlcl9pZl9lbHNlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjM2NwogICAgLy8gZW5zdXJlQnVkZ2V0KHByb29mLmxlbmd0aCAqIDUwKQogICAgZnJhbWVfZGlnIC0yCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgZHVwCiAgICBmcmFtZV9idXJ5IDAKICAgIHB1c2hpbnQgNTAKICAgICoKICAgIHB1c2hpbnQgMTAKICAgICsKCnNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEudmVyaWZ5X3doaWxlX3RvcEAxNDoKICAgIGR1cAogICAgZ2xvYmFsIE9wY29kZUJ1ZGdldAogICAgPgogICAgYnogc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS52ZXJpZnlfYWZ0ZXJfd2hpbGVAMTkKICAgIGl0eG5fYmVnaW4KICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBwdXNoaW50IDUgLy8gRGVsZXRlQXBwbGljYXRpb24KICAgIGl0eG5fZmllbGQgT25Db21wbGV0aW9uCiAgICBieXRlYyAyNyAvLyAweDA2ODEwMQogICAgaXR4bl9maWVsZCBBcHByb3ZhbFByb2dyYW0KICAgIGJ5dGVjIDI3IC8vIDB4MDY4MTAxCiAgICBpdHhuX2ZpZWxkIENsZWFyU3RhdGVQcm9ncmFtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBiIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEudmVyaWZ5X3doaWxlX3RvcEAxNAoKc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS52ZXJpZnlfYWZ0ZXJfd2hpbGVAMTk6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MzcwCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgcHJvb2YubGVuZ3RoOyBpICs9IDEpIHsKICAgIGludGNfMCAvLyAwCiAgICBzd2FwCiAgICBmcmFtZV9kaWcgLTMKICAgIGNvdmVyIDIKCnNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEudmVyaWZ5X3doaWxlX3RvcEA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czozNzAKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBwcm9vZi5sZW5ndGg7IGkgKz0gMSkgewogICAgZGlnIDEKICAgIGZyYW1lX2RpZyAwCiAgICA8CiAgICBieiBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnZlcmlmeV9hZnRlcl93aGlsZUA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjM3MQogICAgLy8gaGFzaCA9IHRoaXMuaGFzaChwcm9vZltpXSwgaGFzaCkKICAgIGZyYW1lX2RpZyAtMgogICAgZXh0cmFjdCAyIDAKICAgIGRpZyAyCiAgICBpbnRjXzMgLy8gMzIKICAgICoKICAgIGludGNfMyAvLyAzMgogICAgZXh0cmFjdDMgLy8gb24gZXJyb3I6IGluZGV4IGFjY2VzcyBpcyBvdXQgb2YgYm91bmRzCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTYzCiAgICAvLyBpZiAoQmlnVWludChhKSA+IEJpZ1VpbnQoYikpIHsKICAgIGRpZyA0CiAgICBiPgogICAgYnogc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS52ZXJpZnlfYWZ0ZXJfaWZfZWxzZUAxMQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxNjQKICAgIC8vIHJldHVybiBzaGEyNTYoYi5jb25jYXQoYSkpCiAgICB1bmNvdmVyIDMKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc2hhMjU2CiAgICBjb3ZlciAyCgpzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnZlcmlmeV9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEuaGFzaEAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MzcwCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgcHJvb2YubGVuZ3RoOyBpICs9IDEpIHsKICAgIHN3YXAKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBzd2FwCiAgICBiIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEudmVyaWZ5X3doaWxlX3RvcEA2CgpzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnZlcmlmeV9hZnRlcl9pZl9lbHNlQDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxNjYKICAgIC8vIHJldHVybiBzaGEyNTYoYS5jb25jYXQoYikpCiAgICB1bmNvdmVyIDMKICAgIGNvbmNhdAogICAgc2hhMjU2CiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjM3MQogICAgLy8gaGFzaCA9IHRoaXMuaGFzaChwcm9vZltpXSwgaGFzaCkKICAgIGIgc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS52ZXJpZnlfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLmhhc2hAMTIKCnNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEudmVyaWZ5X2FmdGVyX3doaWxlQDg6CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Mzc0CiAgICAvLyByZXR1cm4gaGFzaCA9PT0gdGhpcy5yb290cyhyb290S2V5KS52YWx1ZS5yb290CiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZXh0cmFjdCAwIDMyCiAgICA9PQogICAgZnJhbWVfZGlnIC0yCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMwogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZWFkKGFkZHJlc3M6IGJ5dGVzLCBuYW1lOiBieXRlcywga2V5OiBieXRlcykgLT4gYnl0ZXM6CnNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEucmVhZDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Mzg1LTM4NgogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICAvLyByZWFkKGFkZHJlc3M6IEFjY291bnQsIG5hbWU6IHN0cmluZywga2V5OiBzdHJpbmcpOiBzdHJpbmcgewogICAgcHJvdG8gMyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjM4NwogICAgLy8gaWYgKGtleSA9PT0gdHJlZVR5cGVLZXkpIHJldHVybiBTdHJpbmcoaXRvYih0aGlzLnJvb3RzKHRoaXMucmVjb3JkS2V5KGFkZHJlc3MsIEJ5dGVzKG5hbWUpKSkudmFsdWUudHlwZSkpCiAgICBmcmFtZV9kaWcgLTEKICAgIHB1c2hieXRlcyAibC50eXBlIgogICAgPT0KICAgIGJ6IHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEucmVhZF9hZnRlcl9pZl9lbHNlQDIKICAgIGZyYW1lX2RpZyAtMwogICAgZnJhbWVfZGlnIC0yCiAgICBjYWxsc3ViIHJlY29yZEtleQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxNTAKICAgIC8vIHJvb3RzID0gQm94TWFwPGJ5dGVzLCBSb290VmFsdWU+KHsga2V5UHJlZml4OiBNZXRhQm94UHJlZml4Um9vdHMgfSkKICAgIGJ5dGVjIDUgLy8gInIiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Mzg3CiAgICAvLyBpZiAoa2V5ID09PSB0cmVlVHlwZUtleSkgcmV0dXJuIFN0cmluZyhpdG9iKHRoaXMucm9vdHModGhpcy5yZWNvcmRLZXkoYWRkcmVzcywgQnl0ZXMobmFtZSkpKS52YWx1ZS50eXBlKSkKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBleHRyYWN0IDMyIDgKICAgIHJldHN1YgoKc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZWFkX2FmdGVyX2lmX2Vsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Mzg4CiAgICAvLyBjb25zdCByZWNvcmQgPSB0aGlzLnJlYWRSZWNvcmQoYWRkcmVzcywgdGhpcy5kYXRhS2V5KG5hbWUsIGtleSkpCiAgICBmcmFtZV9kaWcgLTIKICAgIGZyYW1lX2RpZyAtMQogICAgY2FsbHN1YiBkYXRhS2V5CiAgICBmcmFtZV9kaWcgLTMKICAgIHN3YXAKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZWFkUmVjb3JkCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Mzg5CiAgICAvLyBsb2dnZWRBc3NlcnQocmVjb3JkLmV4aXN0cywgZXJyTm9EYXRhKQogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgYm56IHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEucmVhZF9hZnRlcl9hc3NlcnRANAogICAgYnl0ZWMgMjIgLy8gIkVSUjplcnJOZHRhIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5kdGEKCnNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEucmVhZF9hZnRlcl9hc3NlcnRANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MzkwCiAgICAvLyByZXR1cm4gU3RyaW5nKHJlY29yZC5kYXRhKQogICAgZHVwCiAgICBwdXNoaW50IDkKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMQogICAgbGVuCiAgICBzdWJzdHJpbmczCiAgICBleHRyYWN0IDIgMAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZWNvcmRJbmZvKGFjY291bnQ6IGJ5dGVzLCBrZXk6IGJ5dGVzKSAtPiBieXRlczoKc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZWNvcmRJbmZvOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1NTgtNTU5CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIC8vIHJlY29yZEluZm8oYWNjb3VudDogQWNjb3VudCwga2V5OiBieXRlcyk6IE1ldGFSZWNvcmRJbmZvIHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1NjAKICAgIC8vIGNvbnN0IGlkID0gdGhpcy5yZWNvcmRLZXkoYWNjb3VudCwga2V5KQogICAgZnJhbWVfZGlnIC0yCiAgICBmcmFtZV9kaWcgLTEKICAgIGNhbGxzdWIgcmVjb3JkS2V5CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTUyCiAgICAvLyByZWNvcmRzID0gQm94TWFwPGJ5dGVzLCBNZXRhUmVjb3JkVmFsdWU+KHsga2V5UHJlZml4OiBSZWNvcmRQcmVmaXggfSkKICAgIGJ5dGVjXzIgLy8gIm0iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1NjEKICAgIC8vIGlmICghdGhpcy5yZWNvcmRzKGlkKS5leGlzdHMpIHJldHVybiB7IGV4aXN0czogZmFsc2UsIHJldmlzaW9uOiAwLCBzaXplOiAwIH0KICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEucmVjb3JkSW5mb19hZnRlcl9pZl9lbHNlQDIKICAgIHB1c2hieXRlcyAweDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnJlY29yZEluZm9fYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1NjIKICAgIC8vIHJldHVybiB7IGV4aXN0czogdHJ1ZSwgcmV2aXNpb246IHRoaXMuY3VycmVudFJlY29yZFJldmlzaW9uKGlkKSwgc2l6ZTogdGhpcy5yZWNvcmRzKGlkKS5sZW5ndGggLSBSZWNvcmRIZWFkZXJCeXRlcyB9CiAgICBzd2FwCiAgICBjYWxsc3ViIGN1cnJlbnRSZWNvcmRSZXZpc2lvbgogICAgc3dhcAogICAgYm94X2xlbgogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIHB1c2hpbnQgMTIKICAgIC0KICAgIHN3YXAKICAgIGl0b2IKICAgIHB1c2hieXRlcyAweDgwCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZWFkUmVjb3JkKGFjY291bnQ6IGJ5dGVzLCBrZXk6IGJ5dGVzKSAtPiBieXRlczoKc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZWFkUmVjb3JkOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1NjUtNTY2CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIC8vIHJlYWRSZWNvcmQoYWNjb3VudDogQWNjb3VudCwga2V5OiBieXRlcyk6IE1ldGFSZWNvcmRSZWFkIHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1NjcKICAgIC8vIGNvbnN0IGluZm8gPSB0aGlzLnJlY29yZEluZm8oYWNjb3VudCwga2V5KQogICAgZnJhbWVfZGlnIC0yCiAgICBmcmFtZV9kaWcgLTEKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZWNvcmRJbmZvCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTY4CiAgICAvLyBpZiAoIWluZm8uZXhpc3RzKSByZXR1cm4geyBleGlzdHM6IGZhbHNlLCByZXZpc2lvbjogMCwgZGF0YTogQnl0ZXMoJycpIH0KICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIGJueiBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnJlYWRSZWNvcmRfYWZ0ZXJfaWZfZWxzZUAyCiAgICBwdXNoYnl0ZXMgMHgwMDAwMDAwMDAwMDAwMDAwMDAwMDBiMDAwMAogICAgc3dhcAogICAgcmV0c3ViCgpzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnJlYWRSZWNvcmRfYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1NjkKICAgIC8vIGxvZ2dlZEFzc2VydChpbmZvLnNpemUgPD0gTWF4SW5saW5lUmVjb3JkQnl0ZXMsIGVyclJlY29yZFJlcXVpcmVzU2xpY2UpCiAgICBwdXNoaW50IDkKICAgIGV4dHJhY3RfdWludDY0CiAgICBpbnRjIDcgLy8gMTAyNAogICAgPD0KICAgIGJueiBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnJlYWRSZWNvcmRfYWZ0ZXJfYXNzZXJ0QDQKICAgIHB1c2hieXRlcyAiRVJSOmVyck1yc2wiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTXJzbAoKc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZWFkUmVjb3JkX2FmdGVyX2Fzc2VydEA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1NzAKICAgIC8vIGNvbnN0IHJlY29yZCA9IGNsb25lKHRoaXMucmVjb3Jkcyh0aGlzLnJlY29yZEtleShhY2NvdW50LCBrZXkpKS52YWx1ZSkKICAgIGZyYW1lX2RpZyAtMgogICAgZnJhbWVfZGlnIC0xCiAgICBjYWxsc3ViIHJlY29yZEtleQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxNTIKICAgIC8vIHJlY29yZHMgPSBCb3hNYXA8Ynl0ZXMsIE1ldGFSZWNvcmRWYWx1ZT4oeyBrZXlQcmVmaXg6IFJlY29yZFByZWZpeCB9KQogICAgYnl0ZWNfMiAvLyAibSIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1NzAtNTcxCiAgICAvLyBjb25zdCByZWNvcmQgPSBjbG9uZSh0aGlzLnJlY29yZHModGhpcy5yZWNvcmRLZXkoYWNjb3VudCwga2V5KSkudmFsdWUpCiAgICAvLyByZXR1cm4geyBleGlzdHM6IHRydWUsIHJldmlzaW9uOiByZWNvcmQucmV2aXNpb24sIGRhdGE6IHJlY29yZC5kYXRhIH0KICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIHB1c2hpbnQgOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTcxCiAgICAvLyByZXR1cm4geyBleGlzdHM6IHRydWUsIHJldmlzaW9uOiByZWNvcmQucmV2aXNpb24sIGRhdGE6IHJlY29yZC5kYXRhIH0KICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTcwLTU3MQogICAgLy8gY29uc3QgcmVjb3JkID0gY2xvbmUodGhpcy5yZWNvcmRzKHRoaXMucmVjb3JkS2V5KGFjY291bnQsIGtleSkpLnZhbHVlKQogICAgLy8gcmV0dXJuIHsgZXhpc3RzOiB0cnVlLCByZXZpc2lvbjogcmVjb3JkLnJldmlzaW9uLCBkYXRhOiByZWNvcmQuZGF0YSB9CiAgICBkaWcgMQogICAgcHVzaGludCAxMAogICAgaW50Y18yIC8vIDIKICAgIGJveF9leHRyYWN0CiAgICBidG9pCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgdW5jb3ZlciAyCiAgICBwdXNoaW50IDEwCiAgICB1bmNvdmVyIDIKICAgIGJveF9leHRyYWN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjU3MQogICAgLy8gcmV0dXJuIHsgZXhpc3RzOiB0cnVlLCByZXZpc2lvbjogcmVjb3JkLnJldmlzaW9uLCBkYXRhOiByZWNvcmQuZGF0YSB9CiAgICBleHRyYWN0IDIgMAogICAgc3dhcAogICAgaXRvYgogICAgcHVzaGJ5dGVzIDB4ODAKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICBzd2FwCiAgICBwdXNoYnl0ZXMgMHgwMDBiCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5zdG9yZVJlY29yZChwYXltZW50OiB1aW50NjQsIGtleTogYnl0ZXMsIGRhdGEwOiBieXRlcywgZGF0YTE6IGJ5dGVzLCBkYXRhMjogYnl0ZXMsIGRhdGEzOiBieXRlcywgZXhwZWN0ZWRSZXZpc2lvbjogdWludDY0KSAtPiB1aW50NjQ6CnN0b3JlUmVjb3JkOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2MDMtNjA3CiAgICAvLyBwcml2YXRlIHN0b3JlUmVjb3JkKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGtleTogYnl0ZXMsCiAgICAvLyAgIGRhdGEwOiBieXRlcywgZGF0YTE6IGJ5dGVzLCBkYXRhMjogYnl0ZXMsIGRhdGEzOiBieXRlcywKICAgIC8vICAgZXhwZWN0ZWRSZXZpc2lvbjogdWludDY0LAogICAgLy8gKTogdWludDY0IHsKICAgIHByb3RvIDcgMQogICAgaW50Y18wIC8vIDAKICAgIGJ5dGVjXzEgLy8gIiIKICAgIGR1cG4gNgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2MDgKICAgIC8vIGNvbnN0IGlkID0gdGhpcy5yZWNvcmRLZXkoVHhuLnNlbmRlciwga2V5KQogICAgdHhuIFNlbmRlcgogICAgZnJhbWVfZGlnIC02CiAgICBjYWxsc3ViIHJlY29yZEtleQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2MDkKICAgIC8vIGxvZ2dlZEFzc2VydChkYXRhMC5sZW5ndGggPD0gTWF4UmVjb3JkUGFydEJ5dGVzICYmIGRhdGExLmxlbmd0aCA8PSBNYXhSZWNvcmRQYXJ0Qnl0ZXMgJiYKICAgIGZyYW1lX2RpZyAtNQogICAgbGVuCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGludGMgOCAvLyA0MDk0CiAgICA8PQogICAgYnogc3RvcmVSZWNvcmRfYm9vbF9mYWxzZUA1CiAgICBmcmFtZV9kaWcgLTQKICAgIGxlbgogICAgaW50YyA4IC8vIDQwOTQKICAgIDw9CiAgICBieiBzdG9yZVJlY29yZF9ib29sX2ZhbHNlQDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NjEwCiAgICAvLyBkYXRhMi5sZW5ndGggPD0gTWF4UmVjb3JkUGFydEJ5dGVzICYmIGRhdGEzLmxlbmd0aCA8PSBNYXhGaW5hbFJlY29yZFBhcnRCeXRlcywgZXJyUmVjb3JkUGFydFRvb0xhcmdlKQogICAgZnJhbWVfZGlnIC0zCiAgICBsZW4KICAgIGludGMgOCAvLyA0MDk0CiAgICA8PQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2MDktNjEwCiAgICAvLyBsb2dnZWRBc3NlcnQoZGF0YTAubGVuZ3RoIDw9IE1heFJlY29yZFBhcnRCeXRlcyAmJiBkYXRhMS5sZW5ndGggPD0gTWF4UmVjb3JkUGFydEJ5dGVzICYmCiAgICAvLyAgIGRhdGEyLmxlbmd0aCA8PSBNYXhSZWNvcmRQYXJ0Qnl0ZXMgJiYgZGF0YTMubGVuZ3RoIDw9IE1heEZpbmFsUmVjb3JkUGFydEJ5dGVzLCBlcnJSZWNvcmRQYXJ0VG9vTGFyZ2UpCiAgICBieiBzdG9yZVJlY29yZF9ib29sX2ZhbHNlQDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NjEwCiAgICAvLyBkYXRhMi5sZW5ndGggPD0gTWF4UmVjb3JkUGFydEJ5dGVzICYmIGRhdGEzLmxlbmd0aCA8PSBNYXhGaW5hbFJlY29yZFBhcnRCeXRlcywgZXJyUmVjb3JkUGFydFRvb0xhcmdlKQogICAgZnJhbWVfZGlnIC0yCiAgICBsZW4KICAgIHB1c2hpbnQgNDA4NAogICAgPD0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NjA5LTYxMAogICAgLy8gbG9nZ2VkQXNzZXJ0KGRhdGEwLmxlbmd0aCA8PSBNYXhSZWNvcmRQYXJ0Qnl0ZXMgJiYgZGF0YTEubGVuZ3RoIDw9IE1heFJlY29yZFBhcnRCeXRlcyAmJgogICAgLy8gICBkYXRhMi5sZW5ndGggPD0gTWF4UmVjb3JkUGFydEJ5dGVzICYmIGRhdGEzLmxlbmd0aCA8PSBNYXhGaW5hbFJlY29yZFBhcnRCeXRlcywgZXJyUmVjb3JkUGFydFRvb0xhcmdlKQogICAgYnogc3RvcmVSZWNvcmRfYm9vbF9mYWxzZUA1CiAgICBpbnRjXzEgLy8gMQoKc3RvcmVSZWNvcmRfYm9vbF9tZXJnZUA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2MDktNjEwCiAgICAvLyBsb2dnZWRBc3NlcnQoZGF0YTAubGVuZ3RoIDw9IE1heFJlY29yZFBhcnRCeXRlcyAmJiBkYXRhMS5sZW5ndGggPD0gTWF4UmVjb3JkUGFydEJ5dGVzICYmCiAgICAvLyAgIGRhdGEyLmxlbmd0aCA8PSBNYXhSZWNvcmRQYXJ0Qnl0ZXMgJiYgZGF0YTMubGVuZ3RoIDw9IE1heEZpbmFsUmVjb3JkUGFydEJ5dGVzLCBlcnJSZWNvcmRQYXJ0VG9vTGFyZ2UpCiAgICBibnogc3RvcmVSZWNvcmRfYWZ0ZXJfYXNzZXJ0QDgKICAgIHB1c2hieXRlcyAiRVJSOmVyck1wcnQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTXBydAoKc3RvcmVSZWNvcmRfYWZ0ZXJfYXNzZXJ0QDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjYxMQogICAgLy8gY29uc3Qgc2l6ZTogdWludDY0ID0gZGF0YTAubGVuZ3RoICsgZGF0YTEubGVuZ3RoICsgZGF0YTIubGVuZ3RoICsgZGF0YTMubGVuZ3RoCiAgICBmcmFtZV9kaWcgLTQKICAgIGxlbgogICAgZHVwCiAgICBmcmFtZV9idXJ5IDYKICAgIGZyYW1lX2RpZyA4CiAgICArCiAgICBmcmFtZV9kaWcgLTMKICAgIGxlbgogICAgZHVwCiAgICBmcmFtZV9idXJ5IDcKICAgICsKICAgIGZyYW1lX2RpZyAtMgogICAgbGVuCiAgICBkdXAKICAgIGNvdmVyIDMKICAgICsKICAgIGR1cAogICAgZnJhbWVfYnVyeSA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjYxMgogICAgLy8gbG9nZ2VkQXNzZXJ0KHNpemUgKyBSZWNvcmRBcmd1bWVudEJ5dGVzICsga2V5Lmxlbmd0aCA8PSBNYXhBcHBDYWxsQXJndW1lbnRCeXRlcywgZXJyUmVjb3JkVmFsdWVUb29MYXJnZSkKICAgIHB1c2hpbnQgMjIKICAgICsKICAgIGZyYW1lX2RpZyAtNgogICAgbGVuCiAgICArCiAgICBpbnRjIDEwIC8vIDE2Mzg0CiAgICA8PQogICAgYm56IHN0b3JlUmVjb3JkX2FmdGVyX2Fzc2VydEAxMAogICAgYnl0ZWMgMjQgLy8gIkVSUjplcnJNdnN6IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck12c3oKCnN0b3JlUmVjb3JkX2FmdGVyX2Fzc2VydEAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NjEzCiAgICAvLyBsb2dnZWRBc3NlcnQoZXhwZWN0ZWRSZXZpc2lvbiA9PT0gdGhpcy5jdXJyZW50UmVjb3JkUmV2aXNpb24oaWQpLCBlcnJSZWNvcmRSZXZpc2lvbk1pc21hdGNoKQogICAgZHVwCiAgICBjYWxsc3ViIGN1cnJlbnRSZWNvcmRSZXZpc2lvbgogICAgZnJhbWVfZGlnIC0xCiAgICA9PQogICAgYm56IHN0b3JlUmVjb3JkX2FmdGVyX2Fzc2VydEAxMgogICAgYnl0ZWMgMTQgLy8gIkVSUjplcnJNcmV2IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck1yZXYKCnN0b3JlUmVjb3JkX2FmdGVyX2Fzc2VydEAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTUyCiAgICAvLyByZWNvcmRzID0gQm94TWFwPGJ5dGVzLCBNZXRhUmVjb3JkVmFsdWU+KHsga2V5UHJlZml4OiBSZWNvcmRQcmVmaXggfSkKICAgIGJ5dGVjXzIgLy8gIm0iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgZnJhbWVfYnVyeSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjYxNAogICAgLy8gY29uc3QgZXhpc3RzID0gdGhpcy5yZWNvcmRzKGlkKS5leGlzdHMKICAgIGJveF9sZW4KICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NjE1CiAgICAvLyBsZXQgcHJldmlvdXNDb3N0OiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfYnVyeSAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjYxNgogICAgLy8gaWYgKGV4aXN0cykgcHJldmlvdXNDb3N0ID0gdGhpcy5yZWNvcmRTdG9yYWdlQ29zdChrZXksIHRoaXMucmVjb3JkcyhpZCkubGVuZ3RoIC0gUmVjb3JkSGVhZGVyQnl0ZXMpCiAgICBieiBzdG9yZVJlY29yZF9hZnRlcl9pZl9lbHNlQDE0CiAgICBmcmFtZV9kaWcgMAogICAgYm94X2xlbgogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIHB1c2hpbnQgMTIKICAgIC0KICAgIGZyYW1lX2RpZyAtNgogICAgc3dhcAogICAgY2FsbHN1YiByZWNvcmRTdG9yYWdlQ29zdAogICAgZnJhbWVfYnVyeSAyCgpzdG9yZVJlY29yZF9hZnRlcl9pZl9lbHNlQDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2MTcKICAgIC8vIGNvbnN0IG5leHRDb3N0ID0gdGhpcy5yZWNvcmRTdG9yYWdlQ29zdChrZXksIHNpemUpCiAgICBmcmFtZV9kaWcgLTYKICAgIGZyYW1lX2RpZyA0CiAgICBjYWxsc3ViIHJlY29yZFN0b3JhZ2VDb3N0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NjE4CiAgICAvLyBjb25zdCBkdWU6IHVpbnQ2NCA9IG5leHRDb3N0ID4gcHJldmlvdXNDb3N0ID8gbmV4dENvc3QgLSBwcmV2aW91c0Nvc3QgOiAwCiAgICBmcmFtZV9kaWcgMgogICAgPgogICAgYnogc3RvcmVSZWNvcmRfdGVybmFyeV9mYWxzZUAxNgogICAgZHVwCiAgICBmcmFtZV9kaWcgMgogICAgLQoKc3RvcmVSZWNvcmRfdGVybmFyeV9tZXJnZUAxNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NjIxCiAgICAvLyBsZXQgc3BvbnNvcjogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2J1cnkgNQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2MjIKICAgIC8vIGlmICghZXhpc3RzKSB7CiAgICB1bmNvdmVyIDIKICAgIGJueiBzdG9yZVJlY29yZF9lbHNlX2JvZHlAMTkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NjIzCiAgICAvLyBzcG9uc29yID0gc3BvbnNvckNvc3QocGF5bWVudC5zZW5kZXIsIFR4bi5zZW5kZXIpCiAgICBmcmFtZV9kaWcgLTcKICAgIGd0eG5zIFNlbmRlcgogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDEKICAgIC8vIHJldHVybiBwYXllciA9PT0gb3duZXIgPyAwIDogUGF5ZXJSZWNvcmRNQlIKICAgID09CiAgICBpbnRjIDQgLy8gMjg1MDAKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgZnJhbWVfYnVyeSA1CgpzdG9yZVJlY29yZF9hZnRlcl9pZl9lbHNlQDI0OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2MjcKICAgIC8vIHRoaXMucmVxdWlyZVJlY29yZFBheW1lbnQocGF5bWVudCwgZHVlICsgc3BvbnNvcikKICAgIGZyYW1lX2RpZyA1CiAgICArCiAgICBmcmFtZV9idXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MjA0CiAgICAvLyBwYXltZW50Lmdyb3VwSW5kZXggKyAxID09PSBUeG4uZ3JvdXBJbmRleCAmJgogICAgZnJhbWVfZGlnIC03CiAgICBndHhucyBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgdHhuIEdyb3VwSW5kZXgKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjIwNC0yMDUKICAgIC8vIHBheW1lbnQuZ3JvdXBJbmRleCArIDEgPT09IFR4bi5ncm91cEluZGV4ICYmCiAgICAvLyAgIHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzICYmCiAgICBieiBzdG9yZVJlY29yZF9ib29sX2ZhbHNlQDUxCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjIwNQogICAgLy8gcGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MgJiYKICAgIGZyYW1lX2RpZyAtNwogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyMDQtMjA1CiAgICAvLyBwYXltZW50Lmdyb3VwSW5kZXggKyAxID09PSBUeG4uZ3JvdXBJbmRleCAmJgogICAgLy8gICBwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcyAmJgogICAgYnogc3RvcmVSZWNvcmRfYm9vbF9mYWxzZUA1MQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyMDYKICAgIC8vIHBheW1lbnQuYW1vdW50ID09PSBhbW91bnQgJiYKICAgIGZyYW1lX2RpZyAtNwogICAgZ3R4bnMgQW1vdW50CiAgICBmcmFtZV9kaWcgMQogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MjA0LTIwNgogICAgLy8gcGF5bWVudC5ncm91cEluZGV4ICsgMSA9PT0gVHhuLmdyb3VwSW5kZXggJiYKICAgIC8vICAgcGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MgJiYKICAgIC8vICAgcGF5bWVudC5hbW91bnQgPT09IGFtb3VudCAmJgogICAgYnogc3RvcmVSZWNvcmRfYm9vbF9mYWxzZUA1MQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyMDcKICAgIC8vIHBheW1lbnQuY2xvc2VSZW1haW5kZXJUbyA9PT0gR2xvYmFsLnplcm9BZGRyZXNzICYmCiAgICBmcmFtZV9kaWcgLTcKICAgIGd0eG5zIENsb3NlUmVtYWluZGVyVG8KICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MjA0LTIwNwogICAgLy8gcGF5bWVudC5ncm91cEluZGV4ICsgMSA9PT0gVHhuLmdyb3VwSW5kZXggJiYKICAgIC8vICAgcGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MgJiYKICAgIC8vICAgcGF5bWVudC5hbW91bnQgPT09IGFtb3VudCAmJgogICAgLy8gICBwYXltZW50LmNsb3NlUmVtYWluZGVyVG8gPT09IEdsb2JhbC56ZXJvQWRkcmVzcyAmJgogICAgYnogc3RvcmVSZWNvcmRfYm9vbF9mYWxzZUA1MQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyMDgKICAgIC8vIHBheW1lbnQucmVrZXlUbyA9PT0gR2xvYmFsLnplcm9BZGRyZXNzLAogICAgZnJhbWVfZGlnIC03CiAgICBndHhucyBSZWtleVRvCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjIwNC0yMDgKICAgIC8vIHBheW1lbnQuZ3JvdXBJbmRleCArIDEgPT09IFR4bi5ncm91cEluZGV4ICYmCiAgICAvLyAgIHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzICYmCiAgICAvLyAgIHBheW1lbnQuYW1vdW50ID09PSBhbW91bnQgJiYKICAgIC8vICAgcGF5bWVudC5jbG9zZVJlbWFpbmRlclRvID09PSBHbG9iYWwuemVyb0FkZHJlc3MgJiYKICAgIC8vICAgcGF5bWVudC5yZWtleVRvID09PSBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICBieiBzdG9yZVJlY29yZF9ib29sX2ZhbHNlQDUxCiAgICBpbnRjXzEgLy8gMQoKc3RvcmVSZWNvcmRfYm9vbF9tZXJnZUA1MjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MjAzLTIxMAogICAgLy8gbG9nZ2VkQXNzZXJ0KAogICAgLy8gICBwYXltZW50Lmdyb3VwSW5kZXggKyAxID09PSBUeG4uZ3JvdXBJbmRleCAmJgogICAgLy8gICAgIHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzICYmCiAgICAvLyAgICAgcGF5bWVudC5hbW91bnQgPT09IGFtb3VudCAmJgogICAgLy8gICAgIHBheW1lbnQuY2xvc2VSZW1haW5kZXJUbyA9PT0gR2xvYmFsLnplcm9BZGRyZXNzICYmCiAgICAvLyAgICAgcGF5bWVudC5yZWtleVRvID09PSBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICAvLyAgIGVyckludmFsaWRSZWNvcmRQYXltZW50LAogICAgLy8gKQogICAgYm56IHN0b3JlUmVjb3JkX2FmdGVyX2Fzc2VydEA1NAogICAgcHVzaGJ5dGVzICJFUlI6ZXJyTXBtdCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJNcG10CgpzdG9yZVJlY29yZF9hZnRlcl9hc3NlcnRANTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjYyOAogICAgLy8gY29uc3QgcmV2aXNpb24gPSB0aGlzLndyaXRlUmVjb3JkKGtleSwgZGF0YTMpCiAgICBmcmFtZV9kaWcgLTYKICAgIGZyYW1lX2RpZyAtMgogICAgY2FsbHN1YiB3cml0ZVJlY29yZAogICAgZnJhbWVfYnVyeSAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjYyOQogICAgLy8gaWYgKHNwb25zb3IgPiAwKSByZWNvcmRQYXllcih0aGlzLnJlY29yZHMoaWQpLmtleSwgcGF5bWVudC5zZW5kZXIsIFR4bi5zZW5kZXIpCiAgICBmcmFtZV9kaWcgNQogICAgYnogc3RvcmVSZWNvcmRfYWZ0ZXJfaWZfZWxzZUAyNgogICAgZnJhbWVfZGlnIC03CiAgICBndHhucyBTZW5kZXIKICAgIHR4biBTZW5kZXIKICAgIGZyYW1lX2RpZyAwCiAgICBjb3ZlciAyCiAgICBjYWxsc3ViIHJlY29yZFBheWVyCgpzdG9yZVJlY29yZF9hZnRlcl9pZl9lbHNlQDI2OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2MzAKICAgIC8vIGlmIChzaXplID4gZGF0YTMubGVuZ3RoKSB7CiAgICBmcmFtZV9kaWcgNAogICAgdW5jb3ZlciAyCiAgICA+CiAgICBieiBzdG9yZVJlY29yZF9hZnRlcl9pZl9lbHNlQDM0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjYzMQogICAgLy8gdGhpcy5yZWNvcmRzKGlkKS5yZXNpemUoUmVjb3JkSGVhZGVyQnl0ZXMgKyBzaXplKQogICAgcHVzaGludCAxMgogICAgZnJhbWVfZGlnIDQKICAgIGR1cAogICAgY292ZXIgMgogICAgKwogICAgZnJhbWVfZGlnIDAKICAgIGR1cAogICAgY292ZXIgMwogICAgc3dhcAogICAgYm94X3Jlc2l6ZQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2MzQKICAgIC8vIHRoaXMucmVjb3JkcyhpZCkucmVwbGFjZShSZWNvcmRIZWFkZXJCeXRlcyAtIDIsIG5ldyBVaW50MTYoc2l6ZSkuYnl0ZXMpCiAgICBpdG9iCiAgICBkdXAKICAgIGJpdGxlbgogICAgcHVzaGludCAxNgogICAgPD0KICAgIGFzc2VydCAvLyBvdmVyZmxvdwogICAgZXh0cmFjdCA2IDIKICAgIHB1c2hpbnQgMTAKICAgIHN3YXAKICAgIGJveF9yZXBsYWNlCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjYzNQogICAgLy8gaWYgKGRhdGEyLmxlbmd0aCA+IDApIHRoaXMucmVjb3JkcyhpZCkuc3BsaWNlKFJlY29yZEhlYWRlckJ5dGVzLCAwLCBkYXRhMikKICAgIGZyYW1lX2RpZyA3CiAgICBieiBzdG9yZVJlY29yZF9hZnRlcl9pZl9lbHNlQDI5CiAgICBmcmFtZV9kaWcgMAogICAgcHVzaGludCAxMgogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2RpZyAtMwogICAgYm94X3NwbGljZQoKc3RvcmVSZWNvcmRfYWZ0ZXJfaWZfZWxzZUAyOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NjM2CiAgICAvLyBpZiAoZGF0YTEubGVuZ3RoID4gMCkgdGhpcy5yZWNvcmRzKGlkKS5zcGxpY2UoUmVjb3JkSGVhZGVyQnl0ZXMsIDAsIGRhdGExKQogICAgZnJhbWVfZGlnIDYKICAgIGJ6IHN0b3JlUmVjb3JkX2FmdGVyX2lmX2Vsc2VAMzEKICAgIGZyYW1lX2RpZyAwCiAgICBwdXNoaW50IDEyCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfZGlnIC00CiAgICBib3hfc3BsaWNlCgpzdG9yZVJlY29yZF9hZnRlcl9pZl9lbHNlQDMxOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2MzcKICAgIC8vIGlmIChkYXRhMC5sZW5ndGggPiAwKSB0aGlzLnJlY29yZHMoaWQpLnNwbGljZShSZWNvcmRIZWFkZXJCeXRlcywgMCwgZGF0YTApCiAgICBmcmFtZV9kaWcgOAogICAgYnogc3RvcmVSZWNvcmRfYWZ0ZXJfaWZfZWxzZUAzNAogICAgZnJhbWVfZGlnIDAKICAgIHB1c2hpbnQgMTIKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9kaWcgLTUKICAgIGJveF9zcGxpY2UKCnN0b3JlUmVjb3JkX2FmdGVyX2lmX2Vsc2VAMzQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjYzOQogICAgLy8gdGhpcy5yZWZ1bmRSZWNvcmQodGhpcy5yZWNvcmRzKGlkKS5rZXksIHByZXZpb3VzQ29zdCA+IG5leHRDb3N0ID8gcHJldmlvdXNDb3N0IC0gbmV4dENvc3QgOiAwKQogICAgZnJhbWVfZGlnIDIKICAgIGRpZyAxCiAgICA+CiAgICBieiBzdG9yZVJlY29yZF90ZXJuYXJ5X2ZhbHNlQDM2CiAgICBmcmFtZV9kaWcgMgogICAgc3dhcAogICAgLQogICAgZnJhbWVfYnVyeSAxCgpzdG9yZVJlY29yZF90ZXJuYXJ5X21lcmdlQDM3OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxOTAKICAgIC8vIGlmIChhbW91bnQgPT09IDApIHJldHVybgogICAgZnJhbWVfZGlnIDEKICAgIGJ6IHN0b3JlUmVjb3JkX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZWZ1bmRSZWNvcmRANDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTkxCiAgICAvLyBjb25zdCBwYXllciA9IHBheWVyT2YoYm94LCBUeG4uc2VuZGVyKQogICAgZnJhbWVfZGlnIDAKICAgIHR4biBTZW5kZXIKICAgIGNhbGxzdWIgcGF5ZXJPZgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjE5MwogICAgLy8gaXR4bi5wYXltZW50KHsgcmVjZWl2ZXI6IGNhblJlY2VpdmVBbGdvKHBheWVyLCBhbW91bnQpID8gcGF5ZXIgOiBUeG4uc2VuZGVyLCBhbW91bnQsIGZlZTogMCB9KS5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgZnJhbWVfZGlnIDEKICAgIGNhbGxzdWIgY2FuUmVjZWl2ZUFsZ28KICAgIGJ6IHN0b3JlUmVjb3JkX3Rlcm5hcnlfZmFsc2VANDIKCnN0b3JlUmVjb3JkX3Rlcm5hcnlfbWVyZ2VANDM6CiAgICBmcmFtZV9kaWcgMQogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTkzCiAgICAvLyBpdHhuLnBheW1lbnQoeyByZWNlaXZlcjogY2FuUmVjZWl2ZUFsZ28ocGF5ZXIsIGFtb3VudCkgPyBwYXllciA6IFR4bi5zZW5kZXIsIGFtb3VudCwgZmVlOiAwIH0pLnN1Ym1pdCgpCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAoKc3RvcmVSZWNvcmRfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnJlZnVuZFJlY29yZEA0NDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NjQwCiAgICAvLyByZXR1cm4gcmV2aXNpb24KICAgIGZyYW1lX2RpZyAzCiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKc3RvcmVSZWNvcmRfdGVybmFyeV9mYWxzZUA0MjoKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxOTMKICAgIC8vIGl0eG4ucGF5bWVudCh7IHJlY2VpdmVyOiBjYW5SZWNlaXZlQWxnbyhwYXllciwgYW1vdW50KSA/IHBheWVyIDogVHhuLnNlbmRlciwgYW1vdW50LCBmZWU6IDAgfSkuc3VibWl0KCkKICAgIHR4biBTZW5kZXIKICAgIGIgc3RvcmVSZWNvcmRfdGVybmFyeV9tZXJnZUA0MwoKc3RvcmVSZWNvcmRfdGVybmFyeV9mYWxzZUAzNjoKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2MzkKICAgIC8vIHRoaXMucmVmdW5kUmVjb3JkKHRoaXMucmVjb3JkcyhpZCkua2V5LCBwcmV2aW91c0Nvc3QgPiBuZXh0Q29zdCA/IHByZXZpb3VzQ29zdCAtIG5leHRDb3N0IDogMCkKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9idXJ5IDEKICAgIGIgc3RvcmVSZWNvcmRfdGVybmFyeV9tZXJnZUAzNwoKc3RvcmVSZWNvcmRfYm9vbF9mYWxzZUA1MToKICAgIGludGNfMCAvLyAwCiAgICBiIHN0b3JlUmVjb3JkX2Jvb2xfbWVyZ2VANTIKCnN0b3JlUmVjb3JkX2Vsc2VfYm9keUAxOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NjI0CiAgICAvLyB9IGVsc2UgaWYgKGR1ZSA+IDApIHsKICAgIGR1cAogICAgYnogc3RvcmVSZWNvcmRfYWZ0ZXJfaWZfZWxzZUAyNAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2MjUKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnNlbmRlciA9PT0gcGF5ZXJPZih0aGlzLnJlY29yZHMoaWQpLmtleSwgVHhuLnNlbmRlciksIGVyclBheWVyT25seSkKICAgIGZyYW1lX2RpZyAtNwogICAgZ3R4bnMgU2VuZGVyCiAgICBmcmFtZV9kaWcgMAogICAgdHhuIFNlbmRlcgogICAgY2FsbHN1YiBwYXllck9mCiAgICA9PQogICAgYm56IHN0b3JlUmVjb3JkX2FmdGVyX2lmX2Vsc2VAMjQKICAgIHB1c2hieXRlcyAiRVJSOmVycklweXIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXB5cgoKc3RvcmVSZWNvcmRfdGVybmFyeV9mYWxzZUAxNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NjE4CiAgICAvLyBjb25zdCBkdWU6IHVpbnQ2NCA9IG5leHRDb3N0ID4gcHJldmlvdXNDb3N0ID8gbmV4dENvc3QgLSBwcmV2aW91c0Nvc3QgOiAwCiAgICBpbnRjXzAgLy8gMAogICAgYiBzdG9yZVJlY29yZF90ZXJuYXJ5X21lcmdlQDE3CgpzdG9yZVJlY29yZF9ib29sX2ZhbHNlQDU6CiAgICBpbnRjXzAgLy8gMAogICAgYiBzdG9yZVJlY29yZF9ib29sX21lcmdlQDYKCgovLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnJlbW92ZVJlY29yZChrZXk6IGJ5dGVzLCBleHBlY3RlZFJldmlzaW9uOiB1aW50NjQpIC0+IHVpbnQ2NDoKc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZW1vdmVSZWNvcmQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjY0MwogICAgLy8gcmVtb3ZlUmVjb3JkKGtleTogYnl0ZXMsIGV4cGVjdGVkUmV2aXNpb246IHVpbnQ2NCk6IHVpbnQ2NCB7CiAgICBwcm90byAyIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NjQ0CiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMuaXNQb2xpY3lLZXkoa2V5KSwgZXJyUG9saWN5S2V5KQogICAgZnJhbWVfZGlnIC0yCiAgICBjYWxsc3ViIGlzUG9saWN5S2V5CiAgICBieiBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnJlbW92ZVJlY29yZF9hZnRlcl9hc3NlcnRAMgogICAgYnl0ZWMgMjUgLy8gIkVSUjplcnJNcGt5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck1wa3kKCnNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEucmVtb3ZlUmVjb3JkX2FmdGVyX2Fzc2VydEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2NDUKICAgIC8vIHRoaXMuZHJvcFJlY29yZChrZXksIGV4cGVjdGVkUmV2aXNpb24pCiAgICBmcmFtZV9kaWcgLTIKICAgIGZyYW1lX2RpZyAtMQogICAgY2FsbHN1YiBkcm9wUmVjb3JkCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjY0NgogICAgLy8gcmV0dXJuIDAKICAgIGludGNfMCAvLyAwCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLmRyb3BSZWNvcmQoa2V5OiBieXRlcywgZXhwZWN0ZWRSZXZpc2lvbjogdWludDY0KSAtPiB2b2lkOgpkcm9wUmVjb3JkOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2NDkKICAgIC8vIHByaXZhdGUgZHJvcFJlY29yZChrZXk6IGJ5dGVzLCBleHBlY3RlZFJldmlzaW9uOiB1aW50NjQpOiB2b2lkIHsKICAgIHByb3RvIDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2NTAKICAgIC8vIGNvbnN0IGlkID0gdGhpcy5yZWNvcmRLZXkoVHhuLnNlbmRlciwga2V5KQogICAgdHhuIFNlbmRlcgogICAgZnJhbWVfZGlnIC0yCiAgICBjYWxsc3ViIHJlY29yZEtleQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjE1MgogICAgLy8gcmVjb3JkcyA9IEJveE1hcDxieXRlcywgTWV0YVJlY29yZFZhbHVlPih7IGtleVByZWZpeDogUmVjb3JkUHJlZml4IH0pCiAgICBieXRlY18yIC8vICJtIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NjUxCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5yZWNvcmRzKGlkKS5leGlzdHMsIGVyclJlY29yZE5vdEZvdW5kKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogZHJvcFJlY29yZF9hZnRlcl9hc3NlcnRAMgogICAgYnl0ZWMgMjMgLy8gIkVSUjplcnJNcm5mIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck1ybmYKCmRyb3BSZWNvcmRfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjY1MgogICAgLy8gbG9nZ2VkQXNzZXJ0KGV4cGVjdGVkUmV2aXNpb24gPT09IHRoaXMuY3VycmVudFJlY29yZFJldmlzaW9uKGlkKSwgZXJyUmVjb3JkUmV2aXNpb25NaXNtYXRjaCkKICAgIHN3YXAKICAgIGNhbGxzdWIgY3VycmVudFJlY29yZFJldmlzaW9uCiAgICBmcmFtZV9kaWcgLTEKICAgID09CiAgICBibnogZHJvcFJlY29yZF9hZnRlcl9hc3NlcnRANAogICAgYnl0ZWMgMTQgLy8gIkVSUjplcnJNcmV2IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck1yZXYKCmRyb3BSZWNvcmRfYWZ0ZXJfYXNzZXJ0QDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjY1MwogICAgLy8gY29uc3QgcmVmdW5kID0gdGhpcy5yZWNvcmRTdG9yYWdlQ29zdChrZXksIHRoaXMucmVjb3JkcyhpZCkubGVuZ3RoIC0gUmVjb3JkSGVhZGVyQnl0ZXMpCiAgICBkdXAKICAgIGJveF9sZW4KICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBwdXNoaW50IDEyCiAgICAtCiAgICBmcmFtZV9kaWcgLTIKICAgIHN3YXAKICAgIGNhbGxzdWIgcmVjb3JkU3RvcmFnZUNvc3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NjU0CiAgICAvLyB0aGlzLnJlY29yZHMoaWQpLmRlbGV0ZSgpCiAgICBkaWcgMQogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjY1NQogICAgLy8gdGhpcy5yZWxlYXNlUmVjb3JkKHRoaXMucmVjb3JkcyhpZCkua2V5LCByZWZ1bmQpCiAgICBjYWxsc3ViIHJlbGVhc2VSZWNvcmQKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEuaXNQb2xpY3lLZXkoa2V5OiBieXRlcykgLT4gdWludDY0Ogppc1BvbGljeUtleToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NjYwCiAgICAvLyBwcml2YXRlIGlzUG9saWN5S2V5KGtleTogYnl0ZXMpOiBib29sZWFuIHsKICAgIHByb3RvIDEgMQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2NjEKICAgIC8vIHJldHVybiBrZXkubGVuZ3RoID4gMCAmJiBvcC5nZXRCeXRlKGtleSwgMCkgPT09IFBvbGljeVJlY29yZEtleVByZWZpeAogICAgZnJhbWVfZGlnIC0xCiAgICBsZW4KICAgIGJ6IGlzUG9saWN5S2V5X2Jvb2xfZmFsc2VAMwogICAgZnJhbWVfZGlnIC0xCiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Ynl0ZQogICAgYm56IGlzUG9saWN5S2V5X2Jvb2xfZmFsc2VAMwogICAgaW50Y18xIC8vIDEKICAgIHJldHN1YgoKaXNQb2xpY3lLZXlfYm9vbF9mYWxzZUAzOgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NjYxCiAgICAvLyByZXR1cm4ga2V5Lmxlbmd0aCA+IDAgJiYgb3AuZ2V0Qnl0ZShrZXksIDApID09PSBQb2xpY3lSZWNvcmRLZXlQcmVmaXgKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEucmVxdWlyZVBvbGljeVdpbmRvdyh3YWxsZXQ6IHVpbnQ2NCwga2V5OiBieXRlcykgLT4gdm9pZDoKcmVxdWlyZVBvbGljeVdpbmRvdzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NjcwCiAgICAvLyBwcml2YXRlIHJlcXVpcmVQb2xpY3lXaW5kb3cod2FsbGV0OiBBcHBsaWNhdGlvbiwga2V5OiBieXRlcyk6IHZvaWQgewogICAgcHJvdG8gMiAwCiAgICBpbnRjXzAgLy8gMAogICAgZHVwbiAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjY3MQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuaXNQb2xpY3lLZXkoa2V5KSwgZXJyTm90UG9saWN5S2V5KQogICAgZnJhbWVfZGlnIC0xCiAgICBjYWxsc3ViIGlzUG9saWN5S2V5CiAgICBibnogcmVxdWlyZVBvbGljeVdpbmRvd19hZnRlcl9hc3NlcnRAMgogICAgcHVzaGJ5dGVzICJFUlI6ZXJyTW5wayIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJNbnBrCgpyZXF1aXJlUG9saWN5V2luZG93X2FmdGVyX2Fzc2VydEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2NzIKICAgIC8vIGNvbnN0IHdyaXRlciA9IHRoaXMucG9saWN5V3JpdGVyLnZhbHVlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxNDMKICAgIC8vIHBvbGljeVdyaXRlciA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogTWV0YUdsb2JhbFN0YXRlS2V5UG9saWN5V3JpdGVyIH0pCiAgICBieXRlYyAyNiAvLyAicG9saWN5X3dyaXRlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NjcyCiAgICAvLyBjb25zdCB3cml0ZXIgPSB0aGlzLnBvbGljeVdyaXRlci52YWx1ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjY3MwogICAgLy8gbG9nZ2VkQXNzZXJ0KHdyaXRlci5pZCAhPT0gMCAmJiBHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25JZCA9PT0gd3JpdGVyLmlkLCBlcnJQb2xpY3lXcml0ZXIpCiAgICBieiByZXF1aXJlUG9saWN5V2luZG93X2Jvb2xfZmFsc2VANQogICAgZ2xvYmFsIENhbGxlckFwcGxpY2F0aW9uSUQKICAgIGRpZyAxCiAgICA9PQogICAgYnogcmVxdWlyZVBvbGljeVdpbmRvd19ib29sX2ZhbHNlQDUKICAgIGludGNfMSAvLyAxCgpyZXF1aXJlUG9saWN5V2luZG93X2Jvb2xfbWVyZ2VANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NjczCiAgICAvLyBsb2dnZWRBc3NlcnQod3JpdGVyLmlkICE9PSAwICYmIEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbklkID09PSB3cml0ZXIuaWQsIGVyclBvbGljeVdyaXRlcikKICAgIGJueiByZXF1aXJlUG9saWN5V2luZG93X2FmdGVyX2Fzc2VydEA4CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJNcHdyIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck1wd3IKCnJlcXVpcmVQb2xpY3lXaW5kb3dfYWZ0ZXJfYXNzZXJ0QDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjY3NAogICAgLy8gY29uc3QgW2NvbnRyb2xsZWRdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMod2FsbGV0LCBCeXRlcyhBYnN0cmFjdEFjY291bnRHbG9iYWxTdGF0ZUtleXNDb250cm9sbGVkQWRkcmVzcykpCiAgICBmcmFtZV9kaWcgLTIKICAgIHB1c2hieXRlcyAiY29udHJvbGxlZF9hZGRyZXNzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgZnJhbWVfYnVyeSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjY3NQogICAgLy8gY29uc3QgW3NwZW5kaW5nXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKHdhbGxldCwgQnl0ZXMoQWJzdHJhY3RBY2NvdW50R2xvYmFsU3RhdGVLZXlzU3BlbmRpbmdBZGRyZXNzKSkKICAgIGZyYW1lX2RpZyAtMgogICAgcHVzaGJ5dGVzICJzcGVuZGluZ19hZGRyZXNzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgZnJhbWVfYnVyeSAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjY3NgogICAgLy8gY29uc3QgW2N1cnJlbnQsIGV4aXN0c10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyh3YWxsZXQsIEJ5dGVzKEFic3RyYWN0QWNjb3VudEdsb2JhbFN0YXRlS2V5c0N1cnJlbnRQbHVnaW4pKQogICAgZnJhbWVfZGlnIC0yCiAgICBwdXNoYnl0ZXMgImN1cnJlbnRfcGx1Z2luIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGZyYW1lX2J1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2NzcKICAgIC8vIGxvZ2dlZEFzc2VydChleGlzdHMgJiYgVHhuLnNlbmRlci5ieXRlcyA9PT0gY29udHJvbGxlZCAmJiBUeG4uc2VuZGVyLmJ5dGVzID09PSBzcGVuZGluZywgZXJyUG9saWN5V2luZG93KQogICAgYnogcmVxdWlyZVBvbGljeVdpbmRvd19ib29sX2ZhbHNlQDEyCiAgICB0eG4gU2VuZGVyCiAgICBmcmFtZV9kaWcgMAogICAgPT0KICAgIGJ6IHJlcXVpcmVQb2xpY3lXaW5kb3dfYm9vbF9mYWxzZUAxMgogICAgdHhuIFNlbmRlcgogICAgZnJhbWVfZGlnIDIKICAgID09CiAgICBieiByZXF1aXJlUG9saWN5V2luZG93X2Jvb2xfZmFsc2VAMTIKICAgIGludGNfMSAvLyAxCgpyZXF1aXJlUG9saWN5V2luZG93X2Jvb2xfbWVyZ2VAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjY3NwogICAgLy8gbG9nZ2VkQXNzZXJ0KGV4aXN0cyAmJiBUeG4uc2VuZGVyLmJ5dGVzID09PSBjb250cm9sbGVkICYmIFR4bi5zZW5kZXIuYnl0ZXMgPT09IHNwZW5kaW5nLCBlcnJQb2xpY3lXaW5kb3cpCiAgICBibnogcmVxdWlyZVBvbGljeVdpbmRvd19hZnRlcl9hc3NlcnRAMTUKICAgIGJ5dGVjIDI4IC8vICJFUlI6ZXJyTXB3biIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJNcHduCgpyZXF1aXJlUG9saWN5V2luZG93X2FmdGVyX2Fzc2VydEAxNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Njc5CiAgICAvLyBsb2dnZWRBc3NlcnQoZ3JhbnQucGx1Z2luID09PSB3cml0ZXIuaWQgJiYgZ3JhbnQuY2FsbGVyID09PSB3YWxsZXQuYWRkcmVzcyAmJiBncmFudC5lc2Nyb3cgPT09ICcnLCBlcnJQb2xpY3lXaW5kb3cpCiAgICBmcmFtZV9kaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICA9PQogICAgYnogcmVxdWlyZVBvbGljeVdpbmRvd19ib29sX2ZhbHNlQDE5CiAgICBmcmFtZV9kaWcgMQogICAgZXh0cmFjdCA4IDMyCiAgICBmcmFtZV9kaWcgLTIKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBieiByZXF1aXJlUG9saWN5V2luZG93X2Jvb2xfZmFsc2VAMTkKICAgIGZyYW1lX2RpZyAxCiAgICBkdXAKICAgIHB1c2hpbnQgNDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMQogICAgbGVuCiAgICBzdWJzdHJpbmczCiAgICBleHRyYWN0IDIgMAogICAgYnl0ZWNfMSAvLyAiIgogICAgPT0KICAgIGJ6IHJlcXVpcmVQb2xpY3lXaW5kb3dfYm9vbF9mYWxzZUAxOQogICAgaW50Y18xIC8vIDEKCnJlcXVpcmVQb2xpY3lXaW5kb3dfYm9vbF9tZXJnZUAyMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Njc5CiAgICAvLyBsb2dnZWRBc3NlcnQoZ3JhbnQucGx1Z2luID09PSB3cml0ZXIuaWQgJiYgZ3JhbnQuY2FsbGVyID09PSB3YWxsZXQuYWRkcmVzcyAmJiBncmFudC5lc2Nyb3cgPT09ICcnLCBlcnJQb2xpY3lXaW5kb3cpCiAgICBibnogcmVxdWlyZVBvbGljeVdpbmRvd19hZnRlcl9hc3NlcnRAMjIKICAgIGJ5dGVjIDI4IC8vICJFUlI6ZXJyTXB3biIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJNcHduCgpyZXF1aXJlUG9saWN5V2luZG93X2FmdGVyX2Fzc2VydEAyMjoKICAgIHJldHN1YgoKcmVxdWlyZVBvbGljeVdpbmRvd19ib29sX2ZhbHNlQDE5OgogICAgaW50Y18wIC8vIDAKICAgIGIgcmVxdWlyZVBvbGljeVdpbmRvd19ib29sX21lcmdlQDIwCgpyZXF1aXJlUG9saWN5V2luZG93X2Jvb2xfZmFsc2VAMTI6CiAgICBpbnRjXzAgLy8gMAogICAgYiByZXF1aXJlUG9saWN5V2luZG93X2Jvb2xfbWVyZ2VAMTMKCnJlcXVpcmVQb2xpY3lXaW5kb3dfYm9vbF9mYWxzZUA1OgogICAgaW50Y18wIC8vIDAKICAgIGIgcmVxdWlyZVBvbGljeVdpbmRvd19ib29sX21lcmdlQDYK", "clear": "I3ByYWdtYSB2ZXJzaW9uIDEzCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCiNwcmFnbWEgYXV0b3NhbHQgZmFsc2UKCi8vIEBhbGdvcmFuZGZvdW5kYXRpb24vYWxnb3JhbmQtdHlwZXNjcmlwdC9iYXNlLWNvbnRyYWN0LmQudHM6OkJhc2VDb250cmFjdC5jbGVhclN0YXRlUHJvZ3JhbSgpIC0+IHVpbnQ2NDoKbWFpbjoKICAgIHB1c2hpbnQgMQogICAgcmV0dXJuCg==" }, "byteCode": { "approval": "DSALAAECINTeAZAD1PcBgAj+H4DC1y+AgAEmHQQVH3x1AAFtCXR5cGVfZmVlcwlha2l0YV9kYW8Bcgxha2l0YV9lc2Nyb3cGd2FsbGV0C0VSUjplcnJOZGFvCHR5cGVzX2lkASQLRVJSOmVycklwbXILRVJSOmVycklwbWEKRVJSOmVyckt0bAtFUlI6ZXJyTXJldgd2ZXJzaW9uC0VSUjplcnJNbmFtC0VSUjplcnJObmFtC0VSUjplcnJNa2V5CkVSUjplcnJEdGwCbC4KRVJSOmVyclJrcAtFUlI6ZXJyTmR0YQtFUlI6ZXJyTXJuZgtFUlI6ZXJyTXZzegtFUlI6ZXJyTXBreQ1wb2xpY3lfd3JpdGVyAwaBAQtFUlI6ZXJyTXB3bjEYQA4nCSJnKyJngATqkYDdNhoAjgEA0DEZFEQxGEHyAoIZBIVN7eAEokwGfATfKHp9BMbT1wQEQvxyAgQG04kEBCvzzFoEUMNuQQQM8bnPBB/3x0wEOcF97QSgP52dBHKyWYEEdoPNJQSaRgYdBFAdPrIEWGqzTgTQtigCBLHm1PsEF9PQWwRC7WoaBGf/QMoEdcZAQgSuhMvYBDPpLJQ2GgCOGQABALUBiAG9AfEDWQPNBBcEUAS7BTAHiwgRCC8IcAiRCLIJXwnZClYKegqrCwULRAvJACNDgATNmtZ+NhoAjgEAfQAxGYEEEjEYEERCvC2KAwCL/ov/E0EUi/0BJwpMUIv+v4mKAgGL/gEnCkxQvkECiUiL/4mKAgGL/nMARQFADov/MgEPQQQjiSKJigMBi/0BJwpMUEm+QBSL/xaL/kxQjACJTLxIi/8hBAhJSwJMiHNBCkxMFlCJRQGL/kIPNhoBSSJZJAhLARUSRFcCADYaAkkVgQgSRBcnD08CZycETGcjdgsjQzEWIwlJOBAjEkQ2GgFJIlkkCEsBFRJEVwIASTYaAklOAhUlEkQ2GgNJFYEIEkQXTCkTQAgnELAASwIVSU4CgR8OQByACkVSUjplcnJOdGywABZJgAF0TFC9RQFAHoALRVJSOmVyck50cnSwADEATwSIjCsnBUxQSU4EvUUBQR6AC0VSUjplcnJOdGtusABLBDgHMgoSQAgnC7AATwRJOAghBU8ECyEGCE8COABJTgMxABIhBCJPAk0IEkAIJwywAE4CUE8CSU8CvzEATE4CiMsFI0M2GgFJIlkkCEsBFRJEVwIASTEATIieKScFTFBJvUUBQAgnEbAASbxITBUhBQshBgiImiojQzYaAUkiWSQISwEVEkRXAgA2GgJJTgIVJRJEMQBMiKIoJwVMUEm9RQFACCcRsAAiTwK7I0MiKUkxFiMJSTgQIxJENhoBSSJZJAhLARUSRFcCAEk2GgJJIlkkCEsBFRJEVwIATgI2GgNJIlkkCEsBFRJEVwIATCkTQAgnELAASwIpE0AIJxKwADEASwKIxiZMSwMVSUUHgQ8OQAgnDbAASwIVSwYIgR8MQAgnDbAASRVJTgUhBw5ACCcTsABLBiQMQEQiSwdJTgIPIksCTwJNJEsCDyRPA08CTUsFTgJSJxQSQOoCI0AIJxWwACcFTwJQvUUBQB6AC0VSUjplcnJOcmZksABMTwKIkiVMSwM4BzIKEkAIJwuwAE8DSTgISwNPBYioJU8COABJTgUxABIhBCJPAk0IEkAIJwywADEASwKI3iMxAEUHIkUGKkxQSb1FAUFEMQBLAUm9RIEMCUsFTIiqJExOAoiPC0lXACBMJVtMRQhFBk4CiJ4lSDEATE4CiL0MSwFBILFLAbIISwKyByOyECKyAbMjQyJC6QI2GgFJIlkkCEsBFRJEVwIANhoCSSJZJAhLARUSRFcCAEkVSU4DJAxAQiJLA0lOAg8iSwJPAk0kSwIPJE8DTwJNSwJOAlInFBNBTiNACCcVsACIxCFJMQBMiPQgSSpMUL1FAUAIJxawAIjWIojOMUgjQyJCTTYaAUkVJRJENhoCSSJZJAhLARUSRFcCADYaA0kVJRJENhoESSJZJQskCEsBFRJENhoFSRWBCBJEF4jSIkiAAQAiTwJUKExQsCNDNhoBSRUlEkQ2GgJJIlkkCEsBFRJEVwIANhoDSSJZJAhLARUSRFcCAIiqJEkVFlcGAkxQKExQsCNDNhoBRwIVJRJENhoCSSJZJAhLARUSRFcCAElOAjYaA0kVJRJENhoESSJZJQskCEsBFRJENhoFSRWBCBJEFzYaBkkiWSQISwEVEkRXAgBOBYigIEhAIkYDKUkVFlcGAkxQKExQsCNDiLwiQiE2GgFHAhUlEkQ2GgJJIlkkCEsBFRJEVwIASU4CNhoDSRUlEkQ2GgRJIlklCyQISwEVEkQ2GgVJFYEIEkQXNhoGSSJZJAhLARUSRFcCAE4FiMoeSEAegAtFUlI6ZXJyRnZyabAAiOogSRUWVwYCTFAoTFCwI0MpMRYjCUcCOBAjEkQ2GgFJIlkkCEsBFRJEVwIATDYaAklOBEkiWUlOAyQITBUSRDgHMgoSQAgnC7AATwI4CCEJEkAIJwywAEsBFUlFBYGgBg5ACCcTsACAASgiTgJLAksCDEGkBksEVwIASwMjWEmAAQoSQURIgAV1aW50OFBLAUEaSwEjCUsDE0EIgAEsUE8CIwhOAkJvSYABCxJBGEiABnVpbnQxNlBCU0mAAQwSQRhIgAZ1aW50MzJQQnlJgAENEkEaSIAGdWludDY0UEKfAUmAAQ4SQRxIgAd1aW50MTI4UELJAUmAAQ8SQRxIgAd1aW50MjU2UELzAUmAARASQRxIgAd1aW50NTEyUEKdAkmAARQSQRxIgAdieXRlWzRdUELHAkmAARUSQRxIgAdieXRlWzhdUELxAkmAARYSQR5IgAhieXRlWzE2XVBCnQNJgAEXEkEeSIAIYnl0ZVszMl1QQskDSYABGBJBHkiACGJ5dGVbNjRdUEL1A0mAARkSQSBIgAlieXRlWzEyOF1QQqMESYABGhJBIEiACWJ5dGVbMjU2XVBC0QRJgAEbEkEgSIAJYnl0ZVs1MTJdUEL/BEmAAR4SQRpIgAZzdHJpbmdQQqcFgAEoEkEagAdhZGRyZXNzUELNBYALRVJSOmVyck1zY2iwAEUBRQEiJwllREkjCCcJTGcyCnMBRE8CgAEpUEkVFlcGAkxQSRWBBAhLBhZXBgJPBVBMFlcGAoACAARMUE8CUExQTwIWgAF0TFBJvEhMvzIKcwFETAkiK2VEIQlPAgkIK0xnI0MiJwZlRQFB8gEiJwZlRCRbQd4BI0AegAtFUlI6ZXJyTmVzY7AAMgpHAnMARExzAUQNQZIBSXMARExzAUQJIitlREsBDEFqSCIrZURJQBJIIhYoTFCwI0MiK2VESwEJK0xnsSInBmVEJFtyCERLAbIIsgcjshAisgGzQlFCX0giQoMBIkLdATYaAUkiWSQISwEVEkRXAgAVIQULIQYIFihMULAjQzYaAUkiWSQISwEVEkRXAgA2GgJJIlkkCEsBFRJEVwIANhoDSSJZJAhLARUSRFcCAE4CiNYOTBWIlg8WKExQsCNDNhoBSRUlEkQ2GgJJIlkkCEsBFRJEVwIAiJ4UKExQsCNDNhoBSRUlEkQ2GgJJIlkkCEsBFRJEVwIAiNoUKExQsCNDKTYaAUcCFSUSRDYaAkkiWSQISwEVEkRXAgBJTgI2GgNJFYEIEkQXTgI2GgRJFYEIEkQXTgI2GgVJFYEIEkQXTgKIyBJJTgYiU0AIJxewAEsFI1sSQAgnDrAASSEHDkGSAUsEgQlbSUUHSwIPQXhLBUsCCUsBD0FkI0AegAtFUlI6ZXJyTXJuZ7AATwNPA4jWCipMUIEMTwMITwK6SRUWVwYCTFAoTFCwI0MiQmMiKTYaAUkVJRJENhoCSSJZJAhLARUSRFcCAElOAjYaA0kVgQgSRBdJTgKBFghMFQghCg5ACCcYsABMSwJJTgKImglMTwKImgpMIkUEKkxQSUUFvUUBQR5LA71EgQwJSwJMiOIJRQNJSwMNQRRLAgkWKExQsCNDSCJCETEWIwlJOBAjEkQ2GgFJIlkkCEsBFRJEVwIASTYaAkkiWSQISwEVEkRXAgBMNhoDSSJZJAhLARUSRFcCAEw2GgRJIlkkCEsBFRJEVwIATDYaBUkiWSQISwEVEkRXAgBMNhoGSRWBCBJEF0yI7hhBCCcZsACI/A8WKExQsCNDNhoBSSJZJAhLARUSRFcCADYaAkkVgQgSRBeI9hYWKExQsCNDNhoBSRWBCBJEFyInBGVEJwdlSElAJEgxADIJEkAIJwiwACcaTGcjQzEATHIIRBJCJTEWIwlJOBAjEkQ2GgFJFYEIEkQXNhoCSSJZJAhLARUSRFcCADYaA0kiWSQISwEVEkRXAgA2GgRJFYEIEkQXTwNLA4i+Fk8DTwMpRwJPBk8GiJ4NFihMULAjQzYaAUkVgQgSRBc2GgJJIlkkCEsBFRJEVwIANhoDSRWBCBJEF08CSwKIvhWIohSADBUffHUAAAAAAAAAALAjQzYaAUcCFUsBIllJgQoSRE8CTEsCUiJZgQwIEkQxACInBGVEJwdlSHIIRBJACCcIsAAnBkxnI0M2GgFJIlkkCEsBFRJEVwIAMQAiJwRlRCcHZUhyCEQSQAgnCLAAIicEZUSAA3BhbGVIgRBbMg0SQB6AC0VSUjplcnJJdXBnsAAnD0xnI0M2GgFJFYEIEkQXMQAiJwRlRCcHZUhyCEQSQAgnCLAAJwRMZyNDigIBi/8VSUEqiwCBHw5BHCNACCcSsACL/ov/UEyJIkIbigIBi/4VSYv/FQiBHwxACCcNsAAWSZOBCA5EVwcBi/5Qi/9QiYoCAYv+FYEtCIv/CCEFC4HEEwiJigIAi/4xAIv/iO0vSVcAIEwlW0lBILGLAbIIiwCyByOyECKyAbOJigEBKov/UEm9RQFBDCKBCLoXiUgiiYoCATEAi/6IuwJJiEEjCEkWi/8VFlcGAov/UEyAAgAKUExQKk8DUEm8SEy/iYoFAilJi/uL/IiZAycFTFBJvUUBQBAii/6MAYwAiUm+RCVbjAGL/0EeiwGL/xNBECKL/owBjACJi/4iWUmMAIEyC4EKCEkyDA1BLrGBBrIQgQWyGScbsh4nG7IfIrIBs0I1SCJMi/1OAksBiwAMQUyL/lcCAEsCJQslWElLBKVBGk8DTFABTgJMIwhMQkVPA1ABTgJCF0UBvkRXACASi/5PA08DiYoDAYv/gAZsLnR5cGUSQSKL/Yv+iPkFJwVMUL5EVyAIiYv+i/+I2QWL/UyIqAFJIlNACCcWsABJgQlZSwEVUlcCAImKAgGL/ov/iOUGSSpMUEm9RQFALIARAAAAAAAAAAAAAAAAAAAAAACMAIlMiKsFTL1EgQwJTBaAAYBMUEwWUImKAgGL/ov/iIsBSSJTQCKADQAAAAAAAAAAAAALAABMiYEJWyEHDkAegAtFUlI6ZXJyTXJzbLAAi/6L/4jLCCpMUEkigQi6F0sBgQokuhckCE8CgQpPArpXAgBMFoABgExQSwEVFlcGAk8CUEyAAgALUExQiYoHASIpRwYxAIv6iNMJi/sVSU4CIQgOQYYHi/wVIQgOQfQGi/0VIQgOQeIGi/4VgfQfDkHOBiNAHoALRVJSOmVyck1wcnSwAIv8FUmMBosICIv9FUmMBwiL/hVJTgMISYwEgRYIi/oVCCEKDkAIJxiwAEmIoQmL/xJACCcOsAAqTFBJjAC9SU8CSCKMAkEeiwC9RIEMCYv6TIjjCowCi/qLBIj1CkmLAg1B2gRJiwIJIowFTwJA/gOL+TgAMQASIQQiTwJNjAWLBQiMAYv5OBYjCDEWEkG2A4v5OAcyChJBogOL+TgIiwESQY4Di/k4CTIDEkH6Aov5OCAyAxJB5gIjQB6AC0VSUjplcnJNcG10sACL+ov+iLsLjAOLBUEai/k4ADEAiwBOAoixPYsETwINQYIBgQyLBElOAgiLAElOA0zTFkmTgRAORFcGAoEKTLuLB0EQiwCBDCKL/dKLBkEQiwCBDCKL/NKLCEEQiwCBDCKL+9KLAksBDUFiiwJMCYwBiwFBOosAMQCIyT5JsYsBiLM+QSSLAbIIsgcjshAisgGziwOMAIlIMQBCKUgijAFCXSJC5QJJQeEDi/k4AIsAMQCIuz8SQP8DgAtFUlI6ZXJySXB5crAAIkLTBCJCzQaKAgGL/oiOAUEIJxmwAIv+i/+IBCKJigIAMQCL/oi5EUkqTFBJvUUBQAgnF7AATIjbD4v/EkAIJw6wAEm9RIEMCYv+TIj7EEsBvEiI4RCJigEBi/8VQRCL/yJVQAQjiSKJigIAIkcCi/+IM0AegAtFUlI6ZXJyTW5wa7AAIicaZUxJTwJEQdoCMg1LARJBygIjQB6AC0VSUjplcnJNcHdysACL/oASY29udHJvbGxlZF9hZGRyZXNzZUiMAIv+gBBzcGVuZGluZ19hZGRyZXNzZUiMAov+gA5jdXJyZW50X3BsdWdpbmVMjAFBigExAIsAEkF8MQCLAhJBbiNACCccsACLASJbEkFMiwFXCCCL/nIIRBJBMosBSYEoWUsBFVJXAgApEkEQI0AIJxywAIkiQg8iQm0iQskC", "clear": "DYEBQw==" }, "events": [], "templateVariables": {} };
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
     * Constructs a no op call for the setPolicyWriter(uint64)void ABI method
     *
    * Set the MetaPlugin allowed to write grant policies. The DAO wallet sets it; before the DAO has a
    wallet (initial deployment), the creator may.
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static setPolicyWriter(params) {
    return {
      ...params,
      method: "setPolicyWriter(uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.writer]
    };
  }
  /**
     * Constructs a no op call for the setPolicy(pay,uint64,byte[],byte[],uint64)uint64 ABI method
     *
    * Create or replace a grant policy owned by `wallet`'s controlled address. Only the registered
    writer may call it, inside an admin window on `wallet` (see requirePolicyWindow).
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static setPolicy(params) {
    return {
      ...params,
      method: "setPolicy(pay,uint64,byte[],byte[],uint64)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.wallet, params.args.key, params.args.data, params.args.expectedRevision]
    };
  }
  /**
   * Constructs a no op call for the removePolicy(uint64,byte[],uint64)uint64 ABI method
   *
   * Remove a grant policy owned by `wallet`'s controlled address; its storage goes back to its payer.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static removePolicy(params) {
    return {
      ...params,
      method: "removePolicy(uint64,byte[],uint64)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.wallet, params.args.key, params.args.expectedRevision]
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
         * Makes a call to the Meta smart contract using the `setPolicyWriter(uint64)void` ABI method.
         *
        * Set the MetaPlugin allowed to write grant policies. The DAO wallet sets it; before the DAO has a
        wallet (initial deployment), the creator may.
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    setPolicyWriter: (params) => {
      return this.appClient.params.call(MetaParamsFactory.setPolicyWriter(params));
    },
    /**
         * Makes a call to the Meta smart contract using the `setPolicy(pay,uint64,byte[],byte[],uint64)uint64` ABI method.
         *
        * Create or replace a grant policy owned by `wallet`'s controlled address. Only the registered
        writer may call it, inside an admin window on `wallet` (see requirePolicyWindow).
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    setPolicy: (params) => {
      return this.appClient.params.call(MetaParamsFactory.setPolicy(params));
    },
    /**
     * Makes a call to the Meta smart contract using the `removePolicy(uint64,byte[],uint64)uint64` ABI method.
     *
     * Remove a grant policy owned by `wallet`'s controlled address; its storage goes back to its payer.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    removePolicy: (params) => {
      return this.appClient.params.call(MetaParamsFactory.removePolicy(params));
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
         * Makes a call to the Meta smart contract using the `setPolicyWriter(uint64)void` ABI method.
         *
        * Set the MetaPlugin allowed to write grant policies. The DAO wallet sets it; before the DAO has a
        wallet (initial deployment), the creator may.
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    setPolicyWriter: (params) => {
      return this.appClient.createTransaction.call(MetaParamsFactory.setPolicyWriter(params));
    },
    /**
         * Makes a call to the Meta smart contract using the `setPolicy(pay,uint64,byte[],byte[],uint64)uint64` ABI method.
         *
        * Create or replace a grant policy owned by `wallet`'s controlled address. Only the registered
        writer may call it, inside an admin window on `wallet` (see requirePolicyWindow).
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    setPolicy: (params) => {
      return this.appClient.createTransaction.call(MetaParamsFactory.setPolicy(params));
    },
    /**
     * Makes a call to the Meta smart contract using the `removePolicy(uint64,byte[],uint64)uint64` ABI method.
     *
     * Remove a grant policy owned by `wallet`'s controlled address; its storage goes back to its payer.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    removePolicy: (params) => {
      return this.appClient.createTransaction.call(MetaParamsFactory.removePolicy(params));
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
         * Makes a call to the Meta smart contract using the `setPolicyWriter(uint64)void` ABI method.
         *
        * Set the MetaPlugin allowed to write grant policies. The DAO wallet sets it; before the DAO has a
        wallet (initial deployment), the creator may.
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    setPolicyWriter: async (params) => {
      const result = await this.appClient.send.call(MetaParamsFactory.setPolicyWriter(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the Meta smart contract using the `setPolicy(pay,uint64,byte[],byte[],uint64)uint64` ABI method.
         *
        * Create or replace a grant policy owned by `wallet`'s controlled address. Only the registered
        writer may call it, inside an admin window on `wallet` (see requirePolicyWindow).
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    setPolicy: async (params) => {
      const result = await this.appClient.send.call(MetaParamsFactory.setPolicy(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Meta smart contract using the `removePolicy(uint64,byte[],uint64)uint64` ABI method.
     *
     * Remove a grant policy owned by `wallet`'s controlled address; its storage goes back to its payer.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    removePolicy: async (params) => {
      const result = await this.appClient.send.call(MetaParamsFactory.removePolicy(params));
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
          policyWriter: result.policyWriter,
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
       * Get the current value of the policyWriter key in global state
       */
      policyWriter: async () => {
        return await this.appClient.state.global.getValue("policyWriter");
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
       * Add a setPolicyWriter(uint64)void method call against the Meta contract
       */
      setPolicyWriter(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.setPolicyWriter(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a setPolicy(pay,uint64,byte[],byte[],uint64)uint64 method call against the Meta contract
       */
      setPolicy(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.setPolicy(params)));
        resultMappers.push((v) => client.decodeReturnValue("setPolicy(pay,uint64,byte[],byte[],uint64)uint64", v));
        return this;
      },
      /**
       * Add a removePolicy(uint64,byte[],uint64)uint64 method call against the Meta contract
       */
      removePolicy(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.removePolicy(params)));
        resultMappers.push((v) => client.decodeReturnValue("removePolicy(uint64,byte[],uint64)uint64", v));
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
var MetaSDK = class extends _chunk7VSUJWG7js.BaseSDK {
  constructor(params) {
    super({ factory: MetaFactory, ...params }, _chunkLNVZHCCXjs.ENV_VAR_NAMES.META_APP_ID);
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
//# sourceMappingURL=chunk-FUFUOLDG.js.map
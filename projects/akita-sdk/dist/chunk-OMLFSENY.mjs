import {
  makeErrorTranslator,
  withErrorCodeAliases
} from "./chunk-GOQ4H3PG.mjs";
import {
  BaseSDK
} from "./chunk-QHL4DXI3.mjs";
import {
  ENV_VAR_NAMES
} from "./chunk-XUT7CZHC.mjs";

// src/meta/records.ts
import { ABIType, decodeAddress, encodeAddress } from "algosdk";
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
var recordType = ABIType.from("(uint64,byte[])");
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
  return new Uint8Array([...decodeAddress(account).publicKey, ...metadataKeyBytes(key)]);
}
function metadataBoxName(account, key) {
  return new Uint8Array([109, ...metadataOwnerKey(account, key)]);
}
function decodeMetadataBoxName(name) {
  if (name.length < 34 || name.length > 64 || name[0] !== 109)
    throw new Error("Invalid metadata box name.");
  return { account: encodeAddress(name.slice(1, 33)), key: name.slice(33) };
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
import { decodeAddress as decodeAddress2, encodeAddress as encodeAddress2 } from "algosdk";
import { microAlgo } from "@algorandfoundation/algokit-utils";

// src/generated/MetaClient.ts
import { getArc56ReturnValue, getABIStructFromABITuple } from "@algorandfoundation/algokit-utils/types/app-arc56";
import {
  AppClient as _AppClient
} from "@algorandfoundation/algokit-utils/types/app-client";
import { AppFactory as _AppFactory } from "@algorandfoundation/algokit-utils/types/app-factory";
var APP_SPEC = { "name": "Meta", "structs": { "MetaRecordInfo": [{ "name": "exists", "type": "bool" }, { "name": "revision", "type": "uint64" }, { "name": "size", "type": "uint64" }], "MetaRecordRead": [{ "name": "exists", "type": "bool" }, { "name": "revision", "type": "uint64" }, { "name": "data", "type": "byte[]" }], "MetaRecordValue": [{ "name": "revision", "type": "uint64" }, { "name": "data", "type": "byte[]" }], "RootValue": [{ "name": "root", "type": "byte[32]" }, { "name": "type", "type": "uint64" }], "TypesValue": [{ "name": "schema", "type": "string" }, { "name": "description", "type": "string" }], "EscrowConfig": [{ "name": "name", "type": "string" }, { "name": "app", "type": "uint64" }] }, "methods": [{ "name": "create", "args": [{ "type": "string", "name": "version" }, { "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "Read-only resource carrier for box access.", "events": [], "recommendations": {} }, { "name": "addRoot", "args": [{ "type": "pay", "name": "payment" }, { "type": "string", "name": "name", "desc": "the name alias of the root being added" }, { "type": "byte[32]", "name": "root", "desc": "a merkle tree root" }, { "type": "uint64", "name": "type", "desc": "an index of the tree type enum from box storage" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Stores a Merkle root and its schema type together. Attached values\nuse the shared record store and may exist before or after the root.", "events": [], "recommendations": {} }, { "name": "deleteRoot", "args": [{ "type": "string", "name": "name", "desc": "the name of the merkle tree root" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Deletes the merkle root from the root box map", "events": [], "recommendations": {} }, { "name": "updateRoot", "args": [{ "type": "string", "name": "name", "desc": "the name of the merkle group data" }, { "type": "byte[32]", "name": "newRoot", "desc": "the new 32 byte merkle tree root" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Replaces the merkle root with another", "events": [], "recommendations": {} }, { "name": "addData", "args": [{ "type": "pay", "name": "payment" }, { "type": "string", "name": "name", "desc": "the name of the merkle tree root" }, { "type": "string", "name": "key", "desc": "the metadata key eg. `Royalty`" }, { "type": "string", "name": "value", "desc": "the metadata value eg. `5` encoded as a bytestring for 5%" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Publishes a value in the shared record store for an existing Merkle root.", "events": [], "recommendations": {} }, { "name": "deleteData", "args": [{ "type": "string", "name": "name", "desc": "the name of the merkle tree root" }, { "type": "string", "name": "key", "desc": "the metadata key you want to remove" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Removes the shared record for a Merkle data key.", "events": [], "recommendations": {} }, { "name": "verify", "args": [{ "type": "address", "name": "address", "desc": "the address of the merkle tree root creator" }, { "type": "string", "name": "name", "desc": "The name alias of the root" }, { "type": "byte[32]", "name": "leaf", "desc": "The hashed leaf to verify" }, { "type": "byte[32][]", "name": "proof", "desc": "The merkle proof" }, { "type": "uint64", "name": "type", "desc": "The type check for the lists purpose" }], "returns": { "type": "bool", "desc": "a boolean indicating whether the proof is valid" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "verify an inclusion in a double sha256 based merkle tree", "events": [], "recommendations": {} }, { "name": "read", "args": [{ "type": "address", "name": "address", "desc": "the address of the merkle tree root creator" }, { "type": "string", "name": "name", "desc": "the name of the merkle tree root" }, { "type": "string", "name": "key", "desc": "the metadata key eg. `Royalty`" }], "returns": { "type": "string", "desc": "the value set eg. `5` encoded as a bytestring for 5%" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "Fetch a metadata properties", "events": [], "recommendations": {} }, { "name": "verifiedRead", "args": [{ "type": "address", "name": "address", "desc": "the address of the merkle tree root creator" }, { "type": "string", "name": "name", "desc": "the name of the root" }, { "type": "byte[32]", "name": "leaf", "desc": "the leaf node to be verified" }, { "type": "byte[32][]", "name": "proof", "desc": "the proof the hash is included" }, { "type": "uint64", "name": "type", "desc": "the list type that helps contracts ensure\nthe lists purpose isn't being misused ( 0 if the caller doesnt care )" }, { "type": "string", "name": "key", "desc": "the metadata key eg. `Royalty`" }], "returns": { "type": "string", "desc": "a string of metadata" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Read metadata from box storage and verify the data provided is included\nin the merkle tree given a sha256'd 32 byte merkle tree root & a proof\nthats pre-computed off chain.\n\nverify an inclusion in a merkle tree\n& read an associated key value pair\n& check against the underlying data's schema\n& check against the underlying data's list type or purpose", "events": [], "recommendations": {} }, { "name": "verifiedMustRead", "args": [{ "type": "address", "name": "address", "desc": "the address of the merkle tree root creator" }, { "type": "string", "name": "name", "desc": "the name of the root" }, { "type": "byte[32]", "name": "leaf", "desc": "the leaf node to be verified" }, { "type": "byte[32][]", "name": "proof", "desc": "the proof the hash is included" }, { "type": "uint64", "name": "type", "desc": "the list type that helps contracts ensure\nthe lists purpose isn't being misused ( 0 if the caller doesnt care )" }, { "type": "string", "name": "key", "desc": "the metadata key eg. `Royalty`" }], "returns": { "type": "string", "desc": "a string of metadata" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Read metadata from box storage and verify the data provided is included\nin the merkle tree given a sha256'd 32 byte merkle tree root & a proof\nthats pre-computed off chain.\n\nverify an inclusion in a merkle tree\n& read an associated key value pair\n& check against the underlying data's schema\n& check against the underlying data's list type or purpose", "events": [], "recommendations": {} }, { "name": "addType", "args": [{ "type": "pay", "name": "payment" }, { "type": "string", "name": "description" }, { "type": "uint8[]", "name": "schemaList" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "collectTypeFees", "args": [], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Sends the type fees collected so far to the DAO's revenue escrow and returns the amount sent.\nAnyone may call it: the receiver and the amount both come from this app's state. It fails until\nthe DAO has named the escrow with `updateAkitaDAOEscrow`. The payment never takes the app below\nits minimum balance; whatever cannot be sent yet stays owed for a later call.", "events": [], "recommendations": {} }, { "name": "rootCosts", "args": [{ "type": "string", "name": "name" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "dataCosts", "args": [{ "type": "string", "name": "name" }, { "type": "string", "name": "key" }, { "type": "string", "name": "value" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "recordInfo", "args": [{ "type": "address", "name": "account" }, { "type": "byte[]", "name": "key" }], "returns": { "type": "(bool,uint64,uint64)", "struct": "MetaRecordInfo" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "readRecord", "args": [{ "type": "address", "name": "account" }, { "type": "byte[]", "name": "key" }], "returns": { "type": "(bool,uint64,byte[])", "struct": "MetaRecordRead" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "readRecordSlice", "args": [{ "type": "address", "name": "account" }, { "type": "byte[]", "name": "key" }, { "type": "uint64", "name": "offset" }, { "type": "uint64", "name": "length" }, { "type": "uint64", "name": "expectedRevision" }], "returns": { "type": "byte[]" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "recordCost", "args": [{ "type": "address", "name": "account" }, { "type": "byte[]", "name": "key" }, { "type": "uint64", "name": "size" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "setRecord", "args": [{ "type": "pay", "name": "payment" }, { "type": "byte[]", "name": "key" }, { "type": "byte[]", "name": "data0" }, { "type": "byte[]", "name": "data1" }, { "type": "byte[]", "name": "data2" }, { "type": "byte[]", "name": "data3" }, { "type": "uint64", "name": "expectedRevision" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "All four parts are published in this call; no intermediate record is observable.", "events": [], "recommendations": {} }, { "name": "removeRecord", "args": [{ "type": "byte[]", "name": "key" }, { "type": "uint64", "name": "expectedRevision" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "setPolicyWriter", "args": [{ "type": "uint64", "name": "writer" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Set the MetaPlugin allowed to write grant policies. The creator sets it once, at deployment, while\nit is unset; after that only the DAO wallet can change it.", "events": [], "recommendations": {} }, { "name": "setPolicy", "args": [{ "type": "pay", "name": "payment" }, { "type": "uint64", "name": "wallet" }, { "type": "byte[]", "name": "key" }, { "type": "byte[]", "name": "data" }, { "type": "uint64", "name": "expectedRevision" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Create or replace a grant policy owned by `wallet`'s controlled address. Only the registered\nwriter may call it, inside an admin window on `wallet` (see requirePolicyWindow).", "events": [], "recommendations": {} }, { "name": "removePolicy", "args": [{ "type": "uint64", "name": "wallet" }, { "type": "byte[]", "name": "key" }, { "type": "uint64", "name": "expectedRevision" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Remove a grant policy owned by `wallet`'s controlled address; its storage goes back to its payer.", "events": [], "recommendations": {} }, { "name": "updateAkitaDAOEscrow", "args": [{ "type": "(string,uint64)", "struct": "EscrowConfig", "name": "config" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "update", "args": [{ "type": "string", "name": "newVersion" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["UpdateApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 4, "bytes": 2 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "typesID": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "dHlwZXNfaWQ=" }, "typeFees": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "dHlwZV9mZWVz", "desc": "Type fees collected and not yet sent to the DAO's revenue escrow (AUD-C7). Each fee is counted\nless the storage its type occupies, so this is never more than what the app can spare." }, "policyWriter": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cG9saWN5X3dyaXRlcg==", "desc": "The one MetaPlugin allowed to write grant policies, set by the DAO wallet. Policies are owned by\neach wallet's controlled address, so rotating the writer keeps them readable and editable." }, "akitaDAOEscrow": { "keyType": "AVMString", "valueType": "EscrowConfig", "key": "YWtpdGFfZXNjcm93", "desc": "the named DAO escrow this contract routes fees to (name + app)" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" } }, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": { "types": { "keyType": "uint64", "valueType": "TypesValue", "desc": "the types (intents) of merkle trees that exist", "prefix": "dA==" }, "roots": { "keyType": "AVMBytes", "valueType": "RootValue", "desc": "the merkle roots we want to attach data to", "prefix": "cg==" }, "records": { "keyType": "AVMBytes", "valueType": "MetaRecordValue", "desc": "One value store for arbitrary keys and Merkle-attached metadata.", "prefix": "bQ==" } } } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [1303, 3003, 3811, 3932, 3972, 4059, 4336, 4732], "errorMessage": "Box must have value" }, { "pc": [5081], "errorMessage": "Bytes has valid prefix" }, { "pc": [1145, 1928], "errorMessage": "ERR:errDtl" }, { "pc": [1824], "errorMessage": "ERR:errFvri" }, { "pc": [886, 1273, 1912], "errorMessage": "ERR:errIpma" }, { "pc": [849, 1237, 1899], "errorMessage": "ERR:errIpmr" }, { "pc": [4662], "errorMessage": "ERR:errIpyr" }, { "pc": [3539], "errorMessage": "ERR:errIupg" }, { "pc": [1116, 1131, 3635], "errorMessage": "ERR:errKtl" }, { "pc": [1093, 3605], "errorMessage": "ERR:errMkey" }, { "pc": [750, 1083], "errorMessage": "ERR:errMnam" }, { "pc": [4805], "errorMessage": "ERR:errMnpk" }, { "pc": [3149, 4684], "errorMessage": "ERR:errMpky" }, { "pc": [4463], "errorMessage": "ERR:errMpmt" }, { "pc": [4261], "errorMessage": "ERR:errMprt" }, { "pc": [4941, 4981], "errorMessage": "ERR:errMpwn" }, { "pc": [4843], "errorMessage": "ERR:errMpwr" }, { "pc": [2829, 4316, 4729], "errorMessage": "ERR:errMrev" }, { "pc": [2818, 4716], "errorMessage": "ERR:errMrnf" }, { "pc": [2877], "errorMessage": "ERR:errMrng" }, { "pc": [4128], "errorMessage": "ERR:errMrsl" }, { "pc": [2344], "errorMessage": "ERR:errMsch" }, { "pc": [2969, 4303], "errorMessage": "ERR:errMvsz" }, { "pc": [3250, 3461, 3504, 3576], "errorMessage": "ERR:errNdao" }, { "pc": [1474, 3998], "errorMessage": "ERR:errNdta" }, { "pc": [2481], "errorMessage": "ERR:errNesc" }, { "pc": [942, 1004], "errorMessage": "ERR:errNnam" }, { "pc": [1217], "errorMessage": "ERR:errNrfd" }, { "pc": [836], "errorMessage": "ERR:errNtkn" }, { "pc": [775], "errorMessage": "ERR:errNtl" }, { "pc": [802], "errorMessage": "ERR:errNtrt" }, { "pc": [1192, 1451], "errorMessage": "ERR:errRkp" }, { "pc": [2365, 2427, 2488, 2492, 2500, 2504], "errorMessage": "account funded" }, { "pc": [2552, 3240, 3454, 3497, 3569, 4998], "errorMessage": "application exists" }, { "pc": [2353, 2433, 2458, 2509, 2519, 2535, 2547, 3210, 3220, 3447, 3490, 3509, 3562, 4814], "errorMessage": "check GlobalState exists" }, { "pc": [1951, 3901], "errorMessage": "index access is out of bounds" }, { "pc": [1008, 3728, 4143], "errorMessage": "index out of bounds" }, { "pc": [5113], "errorMessage": "invalid array encoding" }, { "pc": [656, 710, 911, 964, 1029, 1046, 1064, 1376, 1392, 1500, 1524, 1574, 1590, 1632, 1659, 1684, 1739, 1766, 1791, 1859, 1879, 2584, 2614, 2630, 2646, 2687, 2720, 2755, 2928, 3050, 3067, 3084, 3101, 3118, 3165, 3285, 3301, 3365, 3435, 3473, 3838, 5084, 5141], "errorMessage": "invalid array length header" }, { "pc": [663, 717, 918, 971, 1036, 1053, 1071, 1383, 1399, 1507, 1581, 1597, 1639, 1691, 1746, 1798, 1866, 1888, 2591, 2621, 2637, 2653, 2694, 2727, 2762, 2935, 3057, 3074, 3091, 3108, 3125, 3172, 3292, 3308, 3372, 3480], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [1533, 1668, 1775], "errorMessage": "invalid number of bytes for arc4.dynamic_array<bytes[32]>" }, { "pc": [5162], "errorMessage": "invalid number of bytes for arc4.dynamic_array<smart_contracts/arc58/account/types.ts::PluginInfo>" }, { "pc": [731, 984, 1494, 1518, 1568, 1626, 1653, 1733, 1760, 2681, 2714, 2749, 2922], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [675, 740, 1542, 1677, 1784, 2777, 2789, 2801, 2950, 3138, 3184, 3204, 3278, 3320, 3358, 3384, 3554], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [3440], "errorMessage": "invalid number of bytes for smart_contracts/utils/base-contracts/base.ts::EscrowConfig" }, { "pc": [3427], "errorMessage": "invalid tail pointer at index 0 of ((len+utf8[]),uint64)" }, { "pc": [5137], "errorMessage": "invalid tail pointer at index 4 of (uint64,uint8,uint64,uint64,(len+(uint8[4],uint64,uint64)[]),bool1,bool1,bool1,bool1,bool1,uint64,uint64)" }, { "pc": [5121], "errorMessage": "invalid tail pointer for (len+(uint64,uint8,uint64,uint64,(len+(uint8[4],uint64,uint64)[]),bool1,bool1,bool1,bool1,bool1,uint64,uint64)[])" }, { "pc": [3422, 5132], "errorMessage": "invalid tuple encoding" }, { "pc": [3642, 4519], "errorMessage": "overflow" }, { "pc": [704, 1023, 1853, 3044, 3269], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDEzCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCiNwcmFnbWEgYXV0b3NhbHQgZmFsc2UKCi8vIEBhbGdvcmFuZGZvdW5kYXRpb24vYWxnb3JhbmQtdHlwZXNjcmlwdC9hcmM0L2luZGV4LmQudHM6OkNvbnRyYWN0LmFwcHJvdmFsUHJvZ3JhbSgpIC0+IHVpbnQ2NDoKbWFpbjoKICAgIGludGNibG9jayAwIDEgMiAzMiAyODUwMCA0MDAgMzE3MDAgMTAyNCA0MDk0IDEwMDAwMDAwMCAxNjM4NAogICAgYnl0ZWNibG9jayAweDE1MWY3Yzc1ICIiICJtIiAidHlwZV9mZWVzIiAiYWtpdGFfZGFvIiAiciIgInBvbGljeV93cml0ZXIiICJha2l0YV9lc2Nyb3ciICJ3YWxsZXQiICJFUlI6ZXJyTmRhbyIgInR5cGVzX2lkIiAiJCIgIkVSUjplcnJJcG1yIiAiRVJSOmVycklwbWEiICJFUlI6ZXJyS3RsIiAiRVJSOmVyck1yZXYiICJ2ZXJzaW9uIiAiRVJSOmVyck1uYW0iICJFUlI6ZXJyTm5hbSIgIkVSUjplcnJNa2V5IiAiRVJSOmVyckR0bCIgImwuIiAiRVJSOmVyclJrcCIgIkVSUjplcnJOZHRhIiAiRVJSOmVyck1ybmYiICJFUlI6ZXJyTXZzeiIgIkVSUjplcnJNcGt5IiAweDA2ODEwMSAiRVJSOmVyck1wd24iCiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgYm56IG1haW5fYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjEzNAogICAgLy8gdHlwZXNJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogTWV0YUdsb2JhbFN0YXRlS2V5VHlwZXNJRCB9KQogICAgYnl0ZWMgMTAgLy8gInR5cGVzX2lkIgogICAgaW50Y18wIC8vIDAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjEzOQogICAgLy8gdHlwZUZlZXMgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IE1ldGFHbG9iYWxTdGF0ZUtleVR5cGVGZWVzIH0pCiAgICBieXRlY18zIC8vICJ0eXBlX2ZlZXMiCiAgICBpbnRjXzAgLy8gMAogICAgYXBwX2dsb2JhbF9wdXQKCm1haW5fYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxMjYtMTI3CiAgICAvLyBAY29udHJhY3QoeyBhdm1WZXJzaW9uOiAxMyB9KQogICAgLy8gZXhwb3J0IGNsYXNzIE1ldGEgZXh0ZW5kcyBBa2l0YUJhc2VGZWVHZW5lcmF0b3JDb250cmFjdFdpdGhvdXRBa2l0YU9wdEluIHsKICAgIHB1c2hieXRlcyAweGVhOTE4MGRkIC8vIG1ldGhvZCAidXBkYXRlKHN0cmluZyl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggbWFpbl91cGRhdGVfcm91dGVANAoKbWFpbl9zd2l0Y2hfY2FzZV9uZXh0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjEyNi0xMjcKICAgIC8vIEBjb250cmFjdCh7IGF2bVZlcnNpb246IDEzIH0pCiAgICAvLyBleHBvcnQgY2xhc3MgTWV0YSBleHRlbmRzIEFraXRhQmFzZUZlZUdlbmVyYXRvckNvbnRyYWN0V2l0aG91dEFraXRhT3B0SW4gewogICAgdHhuIE9uQ29tcGxldGlvbgogICAgIQogICAgYXNzZXJ0CiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgYnogbWFpbl9jcmVhdGVfTm9PcEAzMwogICAgcHVzaGJ5dGVzcyAweDg1NGRlZGUwIDB4YTI0YzA2N2MgMHhkZjI4N2E3ZCAweGM2ZDNkNzA0IDB4NDJmYzcyMDIgMHgwNmQzODkwNCAweDJiZjNjYzVhIDB4NTBjMzZlNDEgMHgwY2YxYjljZiAweDFmZjdjNzRjIDB4MzljMTdkZWQgMHhhMDNmOWQ5ZCAweDcyYjI1OTgxIDB4NzY4M2NkMjUgMHg5YTQ2MDYxZCAweDUwMWQzZWIyIDB4NTg2YWIzNGUgMHhkMGI2MjgwMiAweGIxZTZkNGZiIDB4MTdkM2QwNWIgMHg0MmVkNmExYSAweDY3ZmY0MGNhIDB4NzVjNjQwNDIgMHhhZTg0Y2JkOCAweDMzZTkyYzk0IC8vIG1ldGhvZCAib3BVcCgpdm9pZCIsIG1ldGhvZCAiYWRkUm9vdChwYXksc3RyaW5nLGJ5dGVbMzJdLHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJkZWxldGVSb290KHN0cmluZyl2b2lkIiwgbWV0aG9kICJ1cGRhdGVSb290KHN0cmluZyxieXRlWzMyXSl2b2lkIiwgbWV0aG9kICJhZGREYXRhKHBheSxzdHJpbmcsc3RyaW5nLHN0cmluZyl2b2lkIiwgbWV0aG9kICJkZWxldGVEYXRhKHN0cmluZyxzdHJpbmcpdm9pZCIsIG1ldGhvZCAidmVyaWZ5KGFkZHJlc3Msc3RyaW5nLGJ5dGVbMzJdLGJ5dGVbMzJdW10sdWludDY0KWJvb2wiLCBtZXRob2QgInJlYWQoYWRkcmVzcyxzdHJpbmcsc3RyaW5nKXN0cmluZyIsIG1ldGhvZCAidmVyaWZpZWRSZWFkKGFkZHJlc3Msc3RyaW5nLGJ5dGVbMzJdLGJ5dGVbMzJdW10sdWludDY0LHN0cmluZylzdHJpbmciLCBtZXRob2QgInZlcmlmaWVkTXVzdFJlYWQoYWRkcmVzcyxzdHJpbmcsYnl0ZVszMl0sYnl0ZVszMl1bXSx1aW50NjQsc3RyaW5nKXN0cmluZyIsIG1ldGhvZCAiYWRkVHlwZShwYXksc3RyaW5nLHVpbnQ4W10pdm9pZCIsIG1ldGhvZCAiY29sbGVjdFR5cGVGZWVzKCl1aW50NjQiLCBtZXRob2QgInJvb3RDb3N0cyhzdHJpbmcpdWludDY0IiwgbWV0aG9kICJkYXRhQ29zdHMoc3RyaW5nLHN0cmluZyxzdHJpbmcpdWludDY0IiwgbWV0aG9kICJyZWNvcmRJbmZvKGFkZHJlc3MsYnl0ZVtdKShib29sLHVpbnQ2NCx1aW50NjQpIiwgbWV0aG9kICJyZWFkUmVjb3JkKGFkZHJlc3MsYnl0ZVtdKShib29sLHVpbnQ2NCxieXRlW10pIiwgbWV0aG9kICJyZWFkUmVjb3JkU2xpY2UoYWRkcmVzcyxieXRlW10sdWludDY0LHVpbnQ2NCx1aW50NjQpYnl0ZVtdIiwgbWV0aG9kICJyZWNvcmRDb3N0KGFkZHJlc3MsYnl0ZVtdLHVpbnQ2NCl1aW50NjQiLCBtZXRob2QgInNldFJlY29yZChwYXksYnl0ZVtdLGJ5dGVbXSxieXRlW10sYnl0ZVtdLGJ5dGVbXSx1aW50NjQpdWludDY0IiwgbWV0aG9kICJyZW1vdmVSZWNvcmQoYnl0ZVtdLHVpbnQ2NCl1aW50NjQiLCBtZXRob2QgInNldFBvbGljeVdyaXRlcih1aW50NjQpdm9pZCIsIG1ldGhvZCAic2V0UG9saWN5KHBheSx1aW50NjQsYnl0ZVtdLGJ5dGVbXSx1aW50NjQpdWludDY0IiwgbWV0aG9kICJyZW1vdmVQb2xpY3kodWludDY0LGJ5dGVbXSx1aW50NjQpdWludDY0IiwgbWV0aG9kICJ1cGRhdGVBa2l0YURBT0VzY3Jvdygoc3RyaW5nLHVpbnQ2NCkpdm9pZCIsIG1ldGhvZCAidXBkYXRlQWtpdGFEQU8odWludDY0KXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBtYWluX29wVXBfcm91dGVANyBhZGRSb290IGRlbGV0ZVJvb3QgdXBkYXRlUm9vdCBhZGREYXRhIGRlbGV0ZURhdGEgdmVyaWZ5IHJlYWQgdmVyaWZpZWRSZWFkIHZlcmlmaWVkTXVzdFJlYWQgYWRkVHlwZSBjb2xsZWN0VHlwZUZlZXMgcm9vdENvc3RzIGRhdGFDb3N0cyByZWNvcmRJbmZvIHJlYWRSZWNvcmQgcmVhZFJlY29yZFNsaWNlIHJlY29yZENvc3Qgc2V0UmVjb3JkIHJlbW92ZVJlY29yZCBzZXRQb2xpY3lXcml0ZXIgc2V0UG9saWN5IHJlbW92ZVBvbGljeSB1cGRhdGVBa2l0YURBT0VzY3JvdyB1cGRhdGVBa2l0YURBTwogICAgZXJyCgptYWluX29wVXBfcm91dGVANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MjM3CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCm1haW5fY3JlYXRlX05vT3BAMzM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjEyNi0xMjcKICAgIC8vIEBjb250cmFjdCh7IGF2bVZlcnNpb246IDEzIH0pCiAgICAvLyBleHBvcnQgY2xhc3MgTWV0YSBleHRlbmRzIEFraXRhQmFzZUZlZUdlbmVyYXRvckNvbnRyYWN0V2l0aG91dEFraXRhT3B0SW4gewogICAgcHVzaGJ5dGVzIDB4Y2Q5YWQ2N2UgLy8gbWV0aG9kICJjcmVhdGUoc3RyaW5nLHVpbnQ2NCl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggY3JlYXRlCiAgICBlcnIKCm1haW5fdXBkYXRlX3JvdXRlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzUKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgdHhuIE9uQ29tcGxldGlvbgogICAgcHVzaGludCA0IC8vIFVwZGF0ZUFwcGxpY2F0aW9uCiAgICA9PQogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgICYmCiAgICBhc3NlcnQKICAgIGIgdXBkYXRlCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6cmVjb3JkUGF5ZXIocmVjb3JkOiBieXRlcywgcGF5ZXI6IGJ5dGVzLCBvd25lcjogYnl0ZXMpIC0+IHZvaWQ6CnJlY29yZFBheWVyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDUKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiByZWNvcmRQYXllcihyZWNvcmQ6IGJ5dGVzLCBwYXllcjogQWNjb3VudCwgb3duZXI6IEFjY291bnQpOiB2b2lkIHsKICAgIHByb3RvIDMgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDYKICAgIC8vIGlmIChwYXllciAhPT0gb3duZXIpIHsKICAgIGZyYW1lX2RpZyAtMgogICAgZnJhbWVfZGlnIC0xCiAgICAhPQogICAgYnogcmVjb3JkUGF5ZXJfYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk2CiAgICAvLyByZXR1cm4gQnl0ZXMoUGF5ZXJCb3hQcmVmaXgpLmNvbmNhdChzaGEyNTYocmVjb3JkKSkKICAgIGZyYW1lX2RpZyAtMwogICAgc2hhMjU2CiAgICBieXRlYyAxMSAvLyAiJCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDcKICAgIC8vIG9wLkJveC5wdXQocGF5ZXJSZWNvcmRLZXkocmVjb3JkKSwgcGF5ZXIuYnl0ZXMpCiAgICBmcmFtZV9kaWcgLTIKICAgIGJveF9wdXQKCnJlY29yZFBheWVyX2FmdGVyX2lmX2Vsc2VAMjoKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnBheWVyT2YocmVjb3JkOiBieXRlcywgb3duZXI6IGJ5dGVzKSAtPiBieXRlczoKcGF5ZXJPZjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTEyCiAgICAvLyBleHBvcnQgZnVuY3Rpb24gcGF5ZXJPZihyZWNvcmQ6IGJ5dGVzLCBvd25lcjogQWNjb3VudCk6IEFjY291bnQgewogICAgcHJvdG8gMiAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk2CiAgICAvLyByZXR1cm4gQnl0ZXMoUGF5ZXJCb3hQcmVmaXgpLmNvbmNhdChzaGEyNTYocmVjb3JkKSkKICAgIGZyYW1lX2RpZyAtMgogICAgc2hhMjU2CiAgICBieXRlYyAxMSAvLyAiJCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMTMKICAgIC8vIGNvbnN0IFtwYXllciwgc3BvbnNvcmVkXSA9IG9wLkJveC5nZXQocGF5ZXJSZWNvcmRLZXkocmVjb3JkKSkKICAgIGJveF9nZXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTE0CiAgICAvLyByZXR1cm4gc3BvbnNvcmVkID8gQWNjb3VudChwYXllcikgOiBvd25lcgogICAgYnogcGF5ZXJPZl90ZXJuYXJ5X2ZhbHNlQDIKICAgIHJldHN1YgoKcGF5ZXJPZl90ZXJuYXJ5X2ZhbHNlQDI6CiAgICBwb3AKICAgIGZyYW1lX2RpZyAtMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMTQKICAgIC8vIHJldHVybiBzcG9uc29yZWQgPyBBY2NvdW50KHBheWVyKSA6IG93bmVyCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpjYW5SZWNlaXZlQWxnbyhyZWNlaXZlcjogYnl0ZXMsIGFtb3VudDogdWludDY0KSAtPiB1aW50NjQ6CmNhblJlY2VpdmVBbGdvOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMjkKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiBjYW5SZWNlaXZlQWxnbyhyZWNlaXZlcjogQWNjb3VudCwgYW1vdW50OiB1aW50NjQpOiBib29sZWFuIHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMzAKICAgIC8vIGNvbnN0IFssIGZ1bmRlZF0gPSBvcC5BY2N0UGFyYW1zLmFjY3RCYWxhbmNlKHJlY2VpdmVyKQogICAgZnJhbWVfZGlnIC0yCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdEJhbGFuY2UKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMzEKICAgIC8vIHJldHVybiBmdW5kZWQgfHwgYW1vdW50ID49IEdsb2JhbC5taW5CYWxhbmNlCiAgICBibnogY2FuUmVjZWl2ZUFsZ29fYm9vbF90cnVlQDIKICAgIGZyYW1lX2RpZyAtMQogICAgZ2xvYmFsIE1pbkJhbGFuY2UKICAgID49CiAgICBieiBjYW5SZWNlaXZlQWxnb19ib29sX2ZhbHNlQDMKCmNhblJlY2VpdmVBbGdvX2Jvb2xfdHJ1ZUAyOgogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTMxCiAgICAvLyByZXR1cm4gZnVuZGVkIHx8IGFtb3VudCA+PSBHbG9iYWwubWluQmFsYW5jZQogICAgcmV0c3ViCgpjYW5SZWNlaXZlQWxnb19ib29sX2ZhbHNlQDM6CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMzEKICAgIC8vIHJldHVybiBmdW5kZWQgfHwgYW1vdW50ID49IEdsb2JhbC5taW5CYWxhbmNlCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpyZWxlYXNlRGVwb3NpdChyZWNvcmQ6IGJ5dGVzLCBvd25lcjogYnl0ZXMsIGFtb3VudDogdWludDY0KSAtPiBieXRlczoKcmVsZWFzZURlcG9zaXQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE0MAogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIHJlbGVhc2VEZXBvc2l0KHJlY29yZDogYnl0ZXMsIG93bmVyOiBBY2NvdW50LCBhbW91bnQ6IHVpbnQ2NCk6IFtBY2NvdW50LCB1aW50NjRdIHsKICAgIHByb3RvIDMgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5NgogICAgLy8gcmV0dXJuIEJ5dGVzKFBheWVyQm94UHJlZml4KS5jb25jYXQoc2hhMjU2KHJlY29yZCkpCiAgICBmcmFtZV9kaWcgLTMKICAgIHNoYTI1NgogICAgYnl0ZWMgMTEgLy8gIiQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNDIKICAgIC8vIGNvbnN0IFtwYXllciwgc3BvbnNvcmVkXSA9IG9wLkJveC5nZXQoa2V5KQogICAgYm94X2dldAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNDMKICAgIC8vIGlmICghc3BvbnNvcmVkKSB7CiAgICBibnogcmVsZWFzZURlcG9zaXRfYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE0NAogICAgLy8gcmV0dXJuIFtvd25lciwgYW1vdW50XQogICAgZnJhbWVfZGlnIC0xCiAgICBpdG9iCiAgICBmcmFtZV9kaWcgLTIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCnJlbGVhc2VEZXBvc2l0X2FmdGVyX2lmX2Vsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTQ2CiAgICAvLyBvcC5Cb3guZGVsZXRlKGtleSkKICAgIHN3YXAKICAgIGJveF9kZWwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNDcKICAgIC8vIGNvbnN0IHRvdGFsOiB1aW50NjQgPSBhbW91bnQgKyBQYXllclJlY29yZE1CUgogICAgZnJhbWVfZGlnIC0xCiAgICBpbnRjIDQgLy8gMjg1MDAKICAgICsKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNDgKICAgIC8vIHJldHVybiBbY2FuUmVjZWl2ZUFsZ28oQWNjb3VudChwYXllciksIHRvdGFsKSA/IEFjY291bnQocGF5ZXIpIDogb3duZXIsIHRvdGFsXQogICAgZGlnIDIKICAgIHN3YXAKICAgIGNhbGxzdWIgY2FuUmVjZWl2ZUFsZ28KICAgIGJ6IHJlbGVhc2VEZXBvc2l0X3Rlcm5hcnlfZmFsc2VANAogICAgc3dhcAoKcmVsZWFzZURlcG9zaXRfdGVybmFyeV9tZXJnZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNDgKICAgIC8vIHJldHVybiBbY2FuUmVjZWl2ZUFsZ28oQWNjb3VudChwYXllciksIHRvdGFsKSA/IEFjY291bnQocGF5ZXIpIDogb3duZXIsIHRvdGFsXQogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICByZXRzdWIKCnJlbGVhc2VEZXBvc2l0X3Rlcm5hcnlfZmFsc2VANDoKICAgIGJ1cnkgMQogICAgZnJhbWVfZGlnIC0yCiAgICBiIHJlbGVhc2VEZXBvc2l0X3Rlcm5hcnlfbWVyZ2VANQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEuY3JlYXRlW3JvdXRpbmddKCkgLT4gdm9pZDoKY3JlYXRlOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyMjcKICAgIC8vIEBhYmltZXRob2QoeyBvbkNyZWF0ZTogJ3JlcXVpcmUnIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNAogICAgLy8gdmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5VmVyc2lvbiB9KQogICAgYnl0ZWMgMTYgLy8gInZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjIyOQogICAgLy8gdGhpcy52ZXJzaW9uLnZhbHVlID0gdmVyc2lvbgogICAgdW5jb3ZlciAyCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWMgNCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyMzAKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUgPSBha2l0YURBTwogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTQ0CiAgICAvLyBwb2xpY3lXcml0ZXIgPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IE1ldGFHbG9iYWxTdGF0ZUtleVBvbGljeVdyaXRlciB9KQogICAgYnl0ZWMgNiAvLyAicG9saWN5X3dyaXRlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MjMyCiAgICAvLyB0aGlzLnBvbGljeVdyaXRlci52YWx1ZSA9IEFwcGxpY2F0aW9uKDApCiAgICBpbnRjXzAgLy8gMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MjMzCiAgICAvLyBvcC5BcHBQYXJhbXNTZXQuYXBwRm9yZWlnbkJveFJlYWRzKHRydWUpCiAgICBpbnRjXzEgLy8gMQogICAgYXBwX3BhcmFtc19zZXQgQXBwRm9yZWlnbkJveFJlYWRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjIyNwogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLmFkZFJvb3Rbcm91dGluZ10oKSAtPiB2b2lkOgphZGRSb290OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyNTEKICAgIC8vIGFkZFJvb3QocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBuYW1lOiBzdHJpbmcsIHJvb3Q6IGJ5dGVzPDMyPiwgdHlwZTogdWludDY0KTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBkdXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgY292ZXIgMgogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MjUyCiAgICAvLyBsb2dnZWRBc3NlcnQobmFtZSAhPT0gJycsIGVyckludmFsaWROYW1lKQogICAgYnl0ZWNfMSAvLyAiIgogICAgIT0KICAgIGJueiBhZGRSb290X2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAxNyAvLyAiRVJSOmVyck1uYW0iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTW5hbQoKYWRkUm9vdF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MjUzCiAgICAvLyBsb2dnZWRBc3NlcnQoQnl0ZXMobmFtZSkubGVuZ3RoIDw9IE1heFJlY29yZEtleUJ5dGVzLCBlcnJOYW1lVG9vTG9uZykKICAgIGRpZyAyCiAgICBsZW4KICAgIGR1cAogICAgY292ZXIgMgogICAgcHVzaGludCAzMQogICAgPD0KICAgIGJueiBhZGRSb290X2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJOdGwiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTnRsCgphZGRSb290X2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyNTQKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnR5cGVzKHR5cGUpLmV4aXN0cywgZXJyTm9UcmVlVHlwZSkKICAgIGl0b2IKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxNDkKICAgIC8vIHR5cGVzID0gQm94TWFwPHVpbnQ2NCwgVHlwZXNWYWx1ZT4oeyBrZXlQcmVmaXg6IE1ldGFCb3hQcmVmaXhUeXBlcyB9KQogICAgcHVzaGJ5dGVzICJ0IgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjI1NAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMudHlwZXModHlwZSkuZXhpc3RzLCBlcnJOb1RyZWVUeXBlKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogYWRkUm9vdF9hZnRlcl9hc3NlcnRANwogICAgcHVzaGJ5dGVzICJFUlI6ZXJyTnRydCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOdHJ0CgphZGRSb290X2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyNTYKICAgIC8vIGNvbnN0IHJvb3RLZXkgPSB0aGlzLnJlY29yZEtleShUeG4uc2VuZGVyLCBCeXRlcyhuYW1lKSkKICAgIHR4biBTZW5kZXIKICAgIHVuY292ZXIgNAogICAgY2FsbHN1YiByZWNvcmRLZXkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTUxCiAgICAvLyByb290cyA9IEJveE1hcDxieXRlcywgUm9vdFZhbHVlPih7IGtleVByZWZpeDogTWV0YUJveFByZWZpeFJvb3RzIH0pCiAgICBieXRlYyA1IC8vICJyIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGNvdmVyIDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MjU3CiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMucm9vdHMocm9vdEtleSkuZXhpc3RzLCBlcnJOYW1lVGFrZW4pCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGFkZFJvb3RfYWZ0ZXJfYXNzZXJ0QDkKICAgIHB1c2hieXRlcyAiRVJSOmVyck50a24iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTnRrbgoKYWRkUm9vdF9hZnRlcl9hc3NlcnRAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MjU4CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRQYXltZW50UmVjZWl2ZXIpCiAgICBkaWcgNAogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IGFkZFJvb3RfYWZ0ZXJfYXNzZXJ0QDExCiAgICBieXRlYyAxMiAvLyAiRVJSOmVycklwbXIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBtcgoKYWRkUm9vdF9hZnRlcl9hc3NlcnRAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjI2MAogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSB0aGlzLnJvb3RDb3N0cyhuYW1lKSArIHNwb25zb3JDb3N0KHBheW1lbnQuc2VuZGVyLCBUeG4uc2VuZGVyKSwgZXJySW52YWxpZFBheW1lbnRBbW91bnQpCiAgICB1bmNvdmVyIDQKICAgIGR1cAogICAgZ3R4bnMgQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjU1MwogICAgLy8gcmV0dXJuIDMxXzcwMCArIDQwMCAqIEJ5dGVzKG5hbWUpLmxlbmd0aAogICAgaW50YyA1IC8vIDQwMAogICAgdW5jb3ZlciA0CiAgICAqCiAgICBpbnRjIDYgLy8gMzE3MDAKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MjYwCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IHRoaXMucm9vdENvc3RzKG5hbWUpICsgc3BvbnNvckNvc3QocGF5bWVudC5zZW5kZXIsIFR4bi5zZW5kZXIpLCBlcnJJbnZhbGlkUGF5bWVudEFtb3VudCkKICAgIHVuY292ZXIgMgogICAgZ3R4bnMgU2VuZGVyCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTAxCiAgICAvLyByZXR1cm4gcGF5ZXIgPT09IG93bmVyID8gMCA6IFBheWVyUmVjb3JkTUJSCiAgICA9PQogICAgaW50YyA0IC8vIDI4NTAwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MjYwCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IHRoaXMucm9vdENvc3RzKG5hbWUpICsgc3BvbnNvckNvc3QocGF5bWVudC5zZW5kZXIsIFR4bi5zZW5kZXIpLCBlcnJJbnZhbGlkUGF5bWVudEFtb3VudCkKICAgICsKICAgID09CiAgICBibnogYWRkUm9vdF9hZnRlcl9hc3NlcnRAMTMKICAgIGJ5dGVjIDEzIC8vICJFUlI6ZXJySXBtYSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcG1hCgphZGRSb290X2FmdGVyX2Fzc2VydEAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MjYxCiAgICAvLyB0aGlzLnJvb3RzKHJvb3RLZXkpLnZhbHVlID0geyByb290LCB0eXBlIH0KICAgIGNvdmVyIDIKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyNjIKICAgIC8vIHJlY29yZFBheWVyKHRoaXMucm9vdHMocm9vdEtleSkua2V5LCBwYXltZW50LnNlbmRlciwgVHhuLnNlbmRlcikKICAgIHR4biBTZW5kZXIKICAgIHN3YXAKICAgIGNvdmVyIDIKICAgIGNhbGxzdWIgcmVjb3JkUGF5ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MjUxCiAgICAvLyBhZGRSb290KHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgbmFtZTogc3RyaW5nLCByb290OiBieXRlczwzMj4sIHR5cGU6IHVpbnQ2NCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEuZGVsZXRlUm9vdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmRlbGV0ZVJvb3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjI3MAogICAgLy8gZGVsZXRlUm9vdChuYW1lOiBzdHJpbmcpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MjcxCiAgICAvLyBjb25zdCByb290S2V5ID0gdGhpcy5yZWNvcmRLZXkoVHhuLnNlbmRlciwgQnl0ZXMobmFtZSkpCiAgICB0eG4gU2VuZGVyCiAgICBzd2FwCiAgICBjYWxsc3ViIHJlY29yZEtleQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxNTEKICAgIC8vIHJvb3RzID0gQm94TWFwPGJ5dGVzLCBSb290VmFsdWU+KHsga2V5UHJlZml4OiBNZXRhQm94UHJlZml4Um9vdHMgfSkKICAgIGJ5dGVjIDUgLy8gInIiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyNzIKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnJvb3RzKHJvb3RLZXkpLmV4aXN0cywgZXJyTm9OYW1lKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogZGVsZXRlUm9vdF9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMTggLy8gIkVSUjplcnJObmFtIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5uYW0KCmRlbGV0ZVJvb3RfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjI3MwogICAgLy8gdGhpcy5yb290cyhyb290S2V5KS5kZWxldGUoKQogICAgZHVwCiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTUzCiAgICAvLyByZXR1cm4gMzFfNzAwICsgNDAwICogQnl0ZXMobmFtZSkubGVuZ3RoCiAgICBzd2FwCiAgICBsZW4KICAgIGludGMgNSAvLyA0MDAKICAgICoKICAgIGludGMgNiAvLyAzMTcwMAogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyNzQKICAgIC8vIHRoaXMucmVsZWFzZVJlY29yZCh0aGlzLnJvb3RzKHJvb3RLZXkpLmtleSwgdGhpcy5yb290Q29zdHMobmFtZSkpCiAgICBjYWxsc3ViIHJlbGVhc2VSZWNvcmQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MjcwCiAgICAvLyBkZWxldGVSb290KG5hbWU6IHN0cmluZyk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEudXBkYXRlUm9vdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZVJvb3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjI4MwogICAgLy8gdXBkYXRlUm9vdChuYW1lOiBzdHJpbmcsIG5ld1Jvb3Q6IGJ5dGVzPDMyPik6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgY292ZXIgMgogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyODQKICAgIC8vIGNvbnN0IGtleSA9IHRoaXMucmVjb3JkS2V5KFR4bi5zZW5kZXIsIEJ5dGVzKG5hbWUpKQogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgY2FsbHN1YiByZWNvcmRLZXkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTUxCiAgICAvLyByb290cyA9IEJveE1hcDxieXRlcywgUm9vdFZhbHVlPih7IGtleVByZWZpeDogTWV0YUJveFByZWZpeFJvb3RzIH0pCiAgICBieXRlYyA1IC8vICJyIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Mjg1CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5yb290cyhrZXkpLmV4aXN0cywgZXJyTm9OYW1lKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogdXBkYXRlUm9vdF9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMTggLy8gIkVSUjplcnJObmFtIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5uYW0KCnVwZGF0ZVJvb3RfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjI4NgogICAgLy8gdGhpcy5yb290cyhrZXkpLnZhbHVlLnJvb3QgPSBuZXdSb290CiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyODMKICAgIC8vIHVwZGF0ZVJvb3QobmFtZTogc3RyaW5nLCBuZXdSb290OiBieXRlczwzMj4pOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLmFkZERhdGFbcm91dGluZ10oKSAtPiB2b2lkOgphZGREYXRhOgogICAgaW50Y18wIC8vIDAKICAgIGJ5dGVjXzEgLy8gIiIKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyOTcKICAgIC8vIGFkZERhdGEocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBuYW1lOiBzdHJpbmcsIGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBkdXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBjb3ZlciAyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyOTgKICAgIC8vIGxvZ2dlZEFzc2VydChuYW1lICE9PSAnJywgZXJySW52YWxpZE5hbWUpCiAgICBieXRlY18xIC8vICIiCiAgICAhPQogICAgYm56IGFkZERhdGFfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDE3IC8vICJFUlI6ZXJyTW5hbSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJNbmFtCgphZGREYXRhX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyOTkKICAgIC8vIGxvZ2dlZEFzc2VydChrZXkgIT09ICcnLCBlcnJJbnZhbGlkS2V5KQogICAgZGlnIDIKICAgIGJ5dGVjXzEgLy8gIiIKICAgICE9CiAgICBibnogYWRkRGF0YV9hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgMTkgLy8gIkVSUjplcnJNa2V5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck1rZXkKCmFkZERhdGFfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjMwMAogICAgLy8gY29uc3Qgcm9vdEtleSA9IHRoaXMucmVjb3JkS2V5KFR4bi5zZW5kZXIsIEJ5dGVzKG5hbWUpKQogICAgdHhuIFNlbmRlcgogICAgZGlnIDIKICAgIGNhbGxzdWIgcmVjb3JkS2V5CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjMwMwogICAgLy8gbG9nZ2VkQXNzZXJ0KGtleUJ5dGVzLmxlbmd0aCA8PSBtYXhEYXRhS2V5TGVuZ3RoLCBlcnJLZXlUb29Mb25nKQogICAgZGlnIDMKICAgIGxlbgogICAgZHVwCiAgICBidXJ5IDcKICAgIHB1c2hpbnQgMTUKICAgIDw9CiAgICBibnogYWRkRGF0YV9hZnRlcl9hc3NlcnRANwogICAgYnl0ZWMgMTQgLy8gIkVSUjplcnJLdGwiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyS3RsCgphZGREYXRhX2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czozMDQKICAgIC8vIGxvZ2dlZEFzc2VydChCeXRlcyhuYW1lKS5sZW5ndGggKyBrZXlCeXRlcy5sZW5ndGggPCBNYXhSZWNvcmRLZXlCeXRlcywgZXJyS2V5VG9vTG9uZykKICAgIGRpZyAyCiAgICBsZW4KICAgIGRpZyA2CiAgICArCiAgICBwdXNoaW50IDMxCiAgICA8CiAgICBibnogYWRkRGF0YV9hZnRlcl9hc3NlcnRAOQogICAgYnl0ZWMgMTQgLy8gIkVSUjplcnJLdGwiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyS3RsCgphZGREYXRhX2FmdGVyX2Fzc2VydEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czozMDUKICAgIC8vIGxvZ2dlZEFzc2VydChCeXRlcyh2YWx1ZSkubGVuZ3RoIDw9IG1heERhdGFMZW5ndGgsIGVyckRhdGFUb29Mb25nKQogICAgZHVwCiAgICBsZW4KICAgIGR1cAogICAgY292ZXIgNQogICAgaW50YyA3IC8vIDEwMjQKICAgIDw9CiAgICBibnogYWRkRGF0YV9hZnRlcl9hc3NlcnRAMTEKICAgIGJ5dGVjIDIwIC8vICJFUlI6ZXJyRHRsIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckR0bAoKYWRkRGF0YV9hZnRlcl9hc3NlcnRAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjMwNwogICAgLy8ga2V5Qnl0ZXMubGVuZ3RoIDwgMiB8fCAhKGtleUJ5dGVzLnNsaWNlKDAsIDIpID09PSBCeXRlcyhyZXNlcnZlZERhdGFLZXlQcmVmaXgpKSwKICAgIGRpZyA2CiAgICBpbnRjXzIgLy8gMgogICAgPAogICAgYm56IGFkZERhdGFfYm9vbF90cnVlQDEzCiAgICBpbnRjXzAgLy8gMAogICAgZGlnIDcKICAgIGR1cAogICAgY292ZXIgMgogICAgPj0KICAgIGludGNfMCAvLyAwCiAgICBkaWcgMgogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIGludGNfMiAvLyAyCiAgICBkaWcgMgogICAgPj0KICAgIGludGNfMiAvLyAyCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBkaWcgNQogICAgY292ZXIgMgogICAgc3Vic3RyaW5nMwogICAgYnl0ZWMgMjEgLy8gImwuIgogICAgPT0KICAgIGJueiBhZGREYXRhX2Jvb2xfZmFsc2VAMTQKCmFkZERhdGFfYm9vbF90cnVlQDEzOgogICAgaW50Y18xIC8vIDEKCmFkZERhdGFfYm9vbF9tZXJnZUAxNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MzA2LTMwOQogICAgLy8gbG9nZ2VkQXNzZXJ0KAogICAgLy8gICBrZXlCeXRlcy5sZW5ndGggPCAyIHx8ICEoa2V5Qnl0ZXMuc2xpY2UoMCwgMikgPT09IEJ5dGVzKHJlc2VydmVkRGF0YUtleVByZWZpeCkpLAogICAgLy8gICBlcnJSZXNlcnZlZEtleVByZWZpeCwKICAgIC8vICkKICAgIGJueiBhZGREYXRhX2FmdGVyX2Fzc2VydEAxNwogICAgYnl0ZWMgMjIgLy8gIkVSUjplcnJSa3AiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyUmtwCgphZGREYXRhX2FmdGVyX2Fzc2VydEAxNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTUxCiAgICAvLyByb290cyA9IEJveE1hcDxieXRlcywgUm9vdFZhbHVlPih7IGtleVByZWZpeDogTWV0YUJveFByZWZpeFJvb3RzIH0pCiAgICBieXRlYyA1IC8vICJyIgogICAgdW5jb3ZlciAyCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MzEwCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5yb290cyhyb290S2V5KS5leGlzdHMsIGVyck5vUm9vdEZvckRhdGEpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBhZGREYXRhX2FmdGVyX2Fzc2VydEAxOQogICAgcHVzaGJ5dGVzICJFUlI6ZXJyTnJmZCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOcmZkCgphZGREYXRhX2FmdGVyX2Fzc2VydEAxOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MzEyCiAgICAvLyBjb25zdCByZWNvcmRLZXkgPSB0aGlzLmRhdGFLZXkobmFtZSwga2V5KQogICAgc3dhcAogICAgdW5jb3ZlciAyCiAgICBjYWxsc3ViIGRhdGFLZXkKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MzE1CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRQYXltZW50UmVjZWl2ZXIpCiAgICBkaWcgMwogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IGFkZERhdGFfYWZ0ZXJfYXNzZXJ0QDIxCiAgICBieXRlYyAxMiAvLyAiRVJSOmVycklwbXIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBtcgoKYWRkRGF0YV9hZnRlcl9hc3NlcnRAMjE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjMxNwogICAgLy8gcGF5bWVudC5hbW91bnQgPT09IHRoaXMucmVjb3JkU3RvcmFnZUNvc3QocmVjb3JkS2V5LCBCeXRlcyh2YWx1ZSkubGVuZ3RoKSArIHNwb25zb3JDb3N0KHBheW1lbnQuc2VuZGVyLCBUeG4uc2VuZGVyKSwKICAgIHVuY292ZXIgMwogICAgZHVwCiAgICBndHhucyBBbW91bnQKICAgIGRpZyAzCiAgICB1bmNvdmVyIDUKICAgIGNhbGxzdWIgcmVjb3JkU3RvcmFnZUNvc3QKICAgIHVuY292ZXIgMgogICAgZ3R4bnMgU2VuZGVyCiAgICBkdXAKICAgIGNvdmVyIDUKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTAxCiAgICAvLyByZXR1cm4gcGF5ZXIgPT09IG93bmVyID8gMCA6IFBheWVyUmVjb3JkTUJSCiAgICA9PQogICAgaW50YyA0IC8vIDI4NTAwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MzE3CiAgICAvLyBwYXltZW50LmFtb3VudCA9PT0gdGhpcy5yZWNvcmRTdG9yYWdlQ29zdChyZWNvcmRLZXksIEJ5dGVzKHZhbHVlKS5sZW5ndGgpICsgc3BvbnNvckNvc3QocGF5bWVudC5zZW5kZXIsIFR4bi5zZW5kZXIpLAogICAgKwogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MzE2LTMxOQogICAgLy8gbG9nZ2VkQXNzZXJ0KAogICAgLy8gICBwYXltZW50LmFtb3VudCA9PT0gdGhpcy5yZWNvcmRTdG9yYWdlQ29zdChyZWNvcmRLZXksIEJ5dGVzKHZhbHVlKS5sZW5ndGgpICsgc3BvbnNvckNvc3QocGF5bWVudC5zZW5kZXIsIFR4bi5zZW5kZXIpLAogICAgLy8gICBlcnJJbnZhbGlkUGF5bWVudEFtb3VudCwKICAgIC8vICkKICAgIGJueiBhZGREYXRhX2FmdGVyX2Fzc2VydEAyMwogICAgYnl0ZWMgMTMgLy8gIkVSUjplcnJJcG1hIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwbWEKCmFkZERhdGFfYWZ0ZXJfYXNzZXJ0QDIzOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czozMjAKICAgIC8vIGNvbnN0IGlkID0gdGhpcy5yZWNvcmRLZXkoVHhuLnNlbmRlciwgcmVjb3JkS2V5KQogICAgdHhuIFNlbmRlcgogICAgZGlnIDIKICAgIGNhbGxzdWIgcmVjb3JkS2V5CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjMyMQogICAgLy8gbGV0IHByZXZpb3VzUGF5ZXIgPSBUeG4uc2VuZGVyCiAgICB0eG4gU2VuZGVyCiAgICBidXJ5IDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MzIyCiAgICAvLyBsZXQgcHJldmlvdXNDb3N0OiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgYnVyeSA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjE1MwogICAgLy8gcmVjb3JkcyA9IEJveE1hcDxieXRlcywgTWV0YVJlY29yZFZhbHVlPih7IGtleVByZWZpeDogUmVjb3JkUHJlZml4IH0pCiAgICBieXRlY18yIC8vICJtIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MzIzCiAgICAvLyBpZiAodGhpcy5yZWNvcmRzKGlkKS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogYWRkRGF0YV9hZnRlcl9pZl9lbHNlQDI1CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjMyNgogICAgLy8gVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MzI3CiAgICAvLyB0aGlzLnJlY29yZFN0b3JhZ2VDb3N0KHJlY29yZEtleSwgdGhpcy5yZWNvcmRzKGlkKS5sZW5ndGggLSBSZWNvcmRIZWFkZXJCeXRlcyksCiAgICBkaWcgMQogICAgZHVwCiAgICBib3hfbGVuCiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgcHVzaGludCAxMgogICAgLQogICAgZGlnIDUKICAgIHN3YXAKICAgIGNhbGxzdWIgcmVjb3JkU3RvcmFnZUNvc3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MzI0LTMyOAogICAgLy8gY29uc3QgW3JlY2VpdmVyLCB0b3RhbF0gPSByZWxlYXNlRGVwb3NpdCgKICAgIC8vICAgdGhpcy5yZWNvcmRzKGlkKS5rZXksCiAgICAvLyAgIFR4bi5zZW5kZXIsCiAgICAvLyAgIHRoaXMucmVjb3JkU3RvcmFnZUNvc3QocmVjb3JkS2V5LCB0aGlzLnJlY29yZHMoaWQpLmxlbmd0aCAtIFJlY29yZEhlYWRlckJ5dGVzKSwKICAgIC8vICkKICAgIHN3YXAKICAgIGNvdmVyIDIKICAgIGNhbGxzdWIgcmVsZWFzZURlcG9zaXQKICAgIGR1cAogICAgZXh0cmFjdCAwIDMyCiAgICBzd2FwCiAgICBpbnRjXzMgLy8gMzIKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICBidXJ5IDgKICAgIGJ1cnkgNgoKYWRkRGF0YV9hZnRlcl9pZl9lbHNlQDI1OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czozMzIKICAgIC8vIHRoaXMud3JpdGVSZWNvcmQocmVjb3JkS2V5LCBCeXRlcyh2YWx1ZSkpCiAgICBjb3ZlciAyCiAgICBjYWxsc3ViIHdyaXRlUmVjb3JkCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MzMzCiAgICAvLyByZWNvcmRQYXllcih0aGlzLnJlY29yZHMoaWQpLmtleSwgcGF5bWVudC5zZW5kZXIsIFR4bi5zZW5kZXIpCiAgICB0eG4gU2VuZGVyCiAgICBzd2FwCiAgICBjb3ZlciAyCiAgICBjYWxsc3ViIHJlY29yZFBheWVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjMzNQogICAgLy8gaWYgKHByZXZpb3VzQ29zdCA+IDApIGl0eG4ucGF5bWVudCh7IHJlY2VpdmVyOiBwcmV2aW91c1BheWVyLCBhbW91bnQ6IHByZXZpb3VzQ29zdCwgZmVlOiAwIH0pLnN1Ym1pdCgpCiAgICBkaWcgMQogICAgYnogYWRkRGF0YV9hZnRlcl9pZl9lbHNlQDI4CiAgICBpdHhuX2JlZ2luCiAgICBkaWcgMQogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGRpZyAyCiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAoKYWRkRGF0YV9hZnRlcl9pZl9lbHNlQDI4OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyOTcKICAgIC8vIGFkZERhdGEocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBuYW1lOiBzdHJpbmcsIGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgphZGREYXRhX2Jvb2xfZmFsc2VAMTQ6CiAgICBpbnRjXzAgLy8gMAogICAgYiBhZGREYXRhX2Jvb2xfbWVyZ2VAMTUKCgovLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLmRlbGV0ZURhdGFbcm91dGluZ10oKSAtPiB2b2lkOgpkZWxldGVEYXRhOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czozNDQKICAgIC8vIGRlbGV0ZURhdGEobmFtZTogc3RyaW5nLCBrZXk6IHN0cmluZyk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MzQ2CiAgICAvLyBsb2dnZWRBc3NlcnQoa2V5Qnl0ZXMubGVuZ3RoIDwgMiB8fCBrZXlCeXRlcy5zbGljZSgwLCAyKSAhPT0gQnl0ZXMocmVzZXJ2ZWREYXRhS2V5UHJlZml4KSwgZXJyUmVzZXJ2ZWRLZXlQcmVmaXgpCiAgICBsZW4KICAgIGR1cAogICAgY292ZXIgMwogICAgaW50Y18yIC8vIDIKICAgIDwKICAgIGJueiBkZWxldGVEYXRhX2Jvb2xfdHJ1ZUAzCiAgICBpbnRjXzAgLy8gMAogICAgZGlnIDMKICAgIGR1cAogICAgY292ZXIgMgogICAgPj0KICAgIGludGNfMCAvLyAwCiAgICBkaWcgMgogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIGludGNfMiAvLyAyCiAgICBkaWcgMgogICAgPj0KICAgIGludGNfMiAvLyAyCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBkaWcgMgogICAgY292ZXIgMgogICAgc3Vic3RyaW5nMwogICAgYnl0ZWMgMjEgLy8gImwuIgogICAgIT0KICAgIGJ6IGRlbGV0ZURhdGFfYm9vbF9mYWxzZUA0CgpkZWxldGVEYXRhX2Jvb2xfdHJ1ZUAzOgogICAgaW50Y18xIC8vIDEKCmRlbGV0ZURhdGFfYm9vbF9tZXJnZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czozNDYKICAgIC8vIGxvZ2dlZEFzc2VydChrZXlCeXRlcy5sZW5ndGggPCAyIHx8IGtleUJ5dGVzLnNsaWNlKDAsIDIpICE9PSBCeXRlcyhyZXNlcnZlZERhdGFLZXlQcmVmaXgpLCBlcnJSZXNlcnZlZEtleVByZWZpeCkKICAgIGJueiBkZWxldGVEYXRhX2FmdGVyX2Fzc2VydEA3CiAgICBieXRlYyAyMiAvLyAiRVJSOmVyclJrcCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJSa3AKCmRlbGV0ZURhdGFfYWZ0ZXJfYXNzZXJ0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjM0NwogICAgLy8gY29uc3QgcmVjb3JkS2V5ID0gdGhpcy5kYXRhS2V5KG5hbWUsIGtleSkKICAgIGNhbGxzdWIgZGF0YUtleQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjM0OAogICAgLy8gY29uc3QgaWQgPSB0aGlzLnJlY29yZEtleShUeG4uc2VuZGVyLCByZWNvcmRLZXkpCiAgICB0eG4gU2VuZGVyCiAgICBzd2FwCiAgICBjYWxsc3ViIHJlY29yZEtleQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjE1MwogICAgLy8gcmVjb3JkcyA9IEJveE1hcDxieXRlcywgTWV0YVJlY29yZFZhbHVlPih7IGtleVByZWZpeDogUmVjb3JkUHJlZml4IH0pCiAgICBieXRlY18yIC8vICJtIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjM0OQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucmVjb3JkcyhpZCkuZXhpc3RzLCBlcnJOb0RhdGEpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBkZWxldGVEYXRhX2FmdGVyX2Fzc2VydEA5CiAgICBieXRlYyAyMyAvLyAiRVJSOmVyck5kdGEiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmR0YQoKZGVsZXRlRGF0YV9hZnRlcl9hc3NlcnRAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MzUwCiAgICAvLyB0aGlzLnJlbW92ZVJlY29yZChyZWNvcmRLZXksIHRoaXMuY3VycmVudFJlY29yZFJldmlzaW9uKGlkKSkKICAgIGNhbGxzdWIgY3VycmVudFJlY29yZFJldmlzaW9uCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEucmVtb3ZlUmVjb3JkCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MzQ0CiAgICAvLyBkZWxldGVEYXRhKG5hbWU6IHN0cmluZywga2V5OiBzdHJpbmcpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmRlbGV0ZURhdGFfYm9vbF9mYWxzZUA0OgogICAgaW50Y18wIC8vIDAKICAgIGIgZGVsZXRlRGF0YV9ib29sX21lcmdlQDUKCgovLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnZlcmlmeVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnZlcmlmeToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MzY0CiAgICAvLyB2ZXJpZnkoYWRkcmVzczogQWNjb3VudCwgbmFtZTogc3RyaW5nLCBsZWFmOiBMZWFmLCBwcm9vZjogUHJvb2YsIHR5cGU6IHVpbnQ2NCk6IGJvb2xlYW4gewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMzIKICAgICoKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8Ynl0ZXNbMzJdPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS52ZXJpZnkKICAgIHBvcAogICAgcHVzaGJ5dGVzIDB4MDAKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDIKICAgIHNldGJpdAogICAgYnl0ZWNfMCAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEucmVhZFtyb3V0aW5nXSgpIC0+IHZvaWQ6CnJlYWQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjM4OAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnJlYWQKICAgIGR1cAogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgc3dhcAogICAgY29uY2F0CiAgICBieXRlY18wIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS52ZXJpZmllZFJlYWRbcm91dGluZ10oKSAtPiB2b2lkOgp2ZXJpZmllZFJlYWQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQxNQogICAgLy8gdmVyaWZpZWRSZWFkKGFkZHJlc3M6IEFjY291bnQsIG5hbWU6IHN0cmluZywgbGVhZjogTGVhZiwgcHJvb2Y6IFByb29mLCB0eXBlOiB1aW50NjQsIGtleTogc3RyaW5nKTogc3RyaW5nIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cG4gMgogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIGR1cAogICAgY292ZXIgMgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMzIKICAgICoKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8Ynl0ZXNbMzJdPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDYKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBjb3ZlciA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQxNgogICAgLy8gY29uc3QgdmVyaWZpZWQgPSB0aGlzLnZlcmlmeShhZGRyZXNzLCBuYW1lLCBsZWFmLCBwcm9vZiwgdHlwZSkKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS52ZXJpZnkKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0MTcKICAgIC8vIGlmICghdmVyaWZpZWQpIHsKICAgIGJueiB2ZXJpZmllZFJlYWRfYWZ0ZXJfaWZfZWxzZUAzCiAgICBwb3BuIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDE4CiAgICAvLyByZXR1cm4gJycKICAgIGJ5dGVjXzEgLy8gIiIKCnZlcmlmaWVkUmVhZF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEudmVyaWZpZWRSZWFkQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQxNQogICAgLy8gdmVyaWZpZWRSZWFkKGFkZHJlc3M6IEFjY291bnQsIG5hbWU6IHN0cmluZywgbGVhZjogTGVhZiwgcHJvb2Y6IFByb29mLCB0eXBlOiB1aW50NjQsIGtleTogc3RyaW5nKTogc3RyaW5nIHsKICAgIGR1cAogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgc3dhcAogICAgY29uY2F0CiAgICBieXRlY18wIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgp2ZXJpZmllZFJlYWRfYWZ0ZXJfaWZfZWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0MjAKICAgIC8vIHJldHVybiB0aGlzLnJlYWQoYWRkcmVzcywgbmFtZSwga2V5KQogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnJlYWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDE1CiAgICAvLyB2ZXJpZmllZFJlYWQoYWRkcmVzczogQWNjb3VudCwgbmFtZTogc3RyaW5nLCBsZWFmOiBMZWFmLCBwcm9vZjogUHJvb2YsIHR5cGU6IHVpbnQ2NCwga2V5OiBzdHJpbmcpOiBzdHJpbmcgewogICAgYiB2ZXJpZmllZFJlYWRfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnZlcmlmaWVkUmVhZEA0CgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS52ZXJpZmllZE11c3RSZWFkW3JvdXRpbmddKCkgLT4gdm9pZDoKdmVyaWZpZWRNdXN0UmVhZDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDQyCiAgICAvLyB2ZXJpZmllZE11c3RSZWFkKGFkZHJlc3M6IEFjY291bnQsIG5hbWU6IHN0cmluZywgbGVhZjogTGVhZiwgcHJvb2Y6IFByb29mLCB0eXBlOiB1aW50NjQsIGtleTogc3RyaW5nKTogc3RyaW5nIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cG4gMgogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIGR1cAogICAgY292ZXIgMgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMzIKICAgICoKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8Ynl0ZXNbMzJdPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDYKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBjb3ZlciA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ0MwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMudmVyaWZ5KGFkZHJlc3MsIG5hbWUsIGxlYWYsIHByb29mLCB0eXBlKSwgZXJyRmFpbGVkVG9WZXJpZnlJbmNsdXNpb24pCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEudmVyaWZ5CiAgICBwb3AKICAgIGJueiB2ZXJpZmllZE11c3RSZWFkX2FmdGVyX2Fzc2VydEAzCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJGdnJpIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckZ2cmkKCnZlcmlmaWVkTXVzdFJlYWRfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ0NAogICAgLy8gcmV0dXJuIHRoaXMucmVhZChhZGRyZXNzLCBuYW1lLCBrZXkpCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEucmVhZAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NDIKICAgIC8vIHZlcmlmaWVkTXVzdFJlYWQoYWRkcmVzczogQWNjb3VudCwgbmFtZTogc3RyaW5nLCBsZWFmOiBMZWFmLCBwcm9vZjogUHJvb2YsIHR5cGU6IHVpbnQ2NCwga2V5OiBzdHJpbmcpOiBzdHJpbmcgewogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLmFkZFR5cGVbcm91dGluZ10oKSAtPiB2b2lkOgphZGRUeXBlOgogICAgYnl0ZWNfMSAvLyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NDcKICAgIC8vIGFkZFR5cGUocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBkZXNjcmlwdGlvbjogc3RyaW5nLCBzY2hlbWFMaXN0OiBTY2hlbWFMaXN0KTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cG4gMgogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBzd2FwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGNvdmVyIDQKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGR1cAogICAgY292ZXIgMwogICAgaW50Y18yIC8vIDIKICAgICsKICAgIHN3YXAKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ0OAogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBlcnJJbnZhbGlkUGF5bWVudFJlY2VpdmVyKQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IGFkZFR5cGVfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDEyIC8vICJFUlI6ZXJySXBtciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcG1yCgphZGRUeXBlX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NDkKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LmFtb3VudCA9PT0gTWV0YVR5cGVGZWUsIGVyckludmFsaWRQYXltZW50QW1vdW50KQogICAgdW5jb3ZlciAyCiAgICBndHhucyBBbW91bnQKICAgIGludGMgOSAvLyAxMDAwMDAwMDAKICAgID09CiAgICBibnogYWRkVHlwZV9hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgMTMgLy8gIkVSUjplcnJJcG1hIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwbWEKCmFkZFR5cGVfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ1MAogICAgLy8gbG9nZ2VkQXNzZXJ0KEJ5dGVzKGRlc2NyaXB0aW9uKS5sZW5ndGggPD0gODAwLCBlcnJEYXRhVG9vTG9uZykKICAgIGRpZyAxCiAgICBsZW4KICAgIGR1cAogICAgYnVyeSA1CiAgICBwdXNoaW50IDgwMAogICAgPD0KICAgIGJueiBhZGRUeXBlX2FmdGVyX2Fzc2VydEA3CiAgICBieXRlYyAyMCAvLyAiRVJSOmVyckR0bCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJEdGwKCmFkZFR5cGVfYWZ0ZXJfYXNzZXJ0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ1MgogICAgLy8gbGV0IHNjaGVtYTogc3RyaW5nID0gJygnCiAgICBwdXNoYnl0ZXMgIigiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ1MwogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IHNjaGVtYUxpc3QubGVuZ3RoOyBpICs9IDEpIHsKICAgIGludGNfMCAvLyAwCiAgICBjb3ZlciAyCgphZGRUeXBlX3doaWxlX3RvcEA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NTMKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBzY2hlbWFMaXN0Lmxlbmd0aDsgaSArPSAxKSB7CiAgICBkaWcgMgogICAgZGlnIDIKICAgIDwKICAgIGJ6IGFkZFR5cGVfYWZ0ZXJfd2hpbGVANjYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDU0CiAgICAvLyBzd2l0Y2ggKHNjaGVtYUxpc3RbaV0pIHsKICAgIGRpZyA0CiAgICBleHRyYWN0IDIgMAogICAgZGlnIDMKICAgIGludGNfMSAvLyAxCiAgICBleHRyYWN0MyAvLyBvbiBlcnJvcjogaW5kZXggYWNjZXNzIGlzIG91dCBvZiBib3VuZHMKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NTUKICAgIC8vIGNhc2UgU2NoZW1hUGFydFVpbnQ4OgogICAgcHVzaGJ5dGVzIDB4MGEKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ1NS00NTcKICAgIC8vIGNhc2UgU2NoZW1hUGFydFVpbnQ4OgogICAgLy8gICBzY2hlbWEgKz0gU2NoZW1hUGFydFVpbnQ4U3RyaW5nCiAgICAvLyAgIGJyZWFrCiAgICBieiBhZGRUeXBlX2FmdGVyX2lmX2Vsc2VAMTIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NTYKICAgIC8vIHNjaGVtYSArPSBTY2hlbWFQYXJ0VWludDhTdHJpbmcKICAgIHB1c2hieXRlcyAidWludDgiCiAgICBjb25jYXQKCmFkZFR5cGVfYmxvY2tANjI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjUxMAogICAgLy8gaWYgKHNjaGVtYUxpc3QubGVuZ3RoID4gMCAmJiBpICE9PSBzY2hlbWFMaXN0Lmxlbmd0aCAtIDEpIHsKICAgIGRpZyAxCiAgICBieiBhZGRUeXBlX2FmdGVyX2lmX2Vsc2VANjUKICAgIGRpZyAxCiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZGlnIDMKICAgICE9CiAgICBieiBhZGRUeXBlX2FmdGVyX2lmX2Vsc2VANjUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTExCiAgICAvLyBzY2hlbWEgKz0gJywnCiAgICBwdXNoYnl0ZXMgIiwiCiAgICBjb25jYXQKCmFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUA2NToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDUzCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgc2NoZW1hTGlzdC5sZW5ndGg7IGkgKz0gMSkgewogICAgdW5jb3ZlciAyCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgY292ZXIgMgogICAgYiBhZGRUeXBlX3doaWxlX3RvcEA4CgphZGRUeXBlX2FmdGVyX2lmX2Vsc2VAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ1OAogICAgLy8gY2FzZSBTY2hlbWFQYXJ0VWludDE2OgogICAgZHVwCiAgICBwdXNoYnl0ZXMgMHgwYgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDU4LTQ2MAogICAgLy8gY2FzZSBTY2hlbWFQYXJ0VWludDE2OgogICAgLy8gICBzY2hlbWEgKz0gU2NoZW1hUGFydFVpbnQxNlN0cmluZwogICAgLy8gICBicmVhawogICAgYnogYWRkVHlwZV9hZnRlcl9pZl9lbHNlQDE1CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDU5CiAgICAvLyBzY2hlbWEgKz0gU2NoZW1hUGFydFVpbnQxNlN0cmluZwogICAgcHVzaGJ5dGVzICJ1aW50MTYiCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDYwCiAgICAvLyBicmVhawogICAgYiBhZGRUeXBlX2Jsb2NrQDYyCgphZGRUeXBlX2FmdGVyX2lmX2Vsc2VAMTU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ2MQogICAgLy8gY2FzZSBTY2hlbWFQYXJ0VWludDMyOgogICAgZHVwCiAgICBwdXNoYnl0ZXMgMHgwYwogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDYxLTQ2MwogICAgLy8gY2FzZSBTY2hlbWFQYXJ0VWludDMyOgogICAgLy8gICBzY2hlbWEgKz0gU2NoZW1hUGFydFVpbnQzMlN0cmluZwogICAgLy8gICBicmVhawogICAgYnogYWRkVHlwZV9hZnRlcl9pZl9lbHNlQDE4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDYyCiAgICAvLyBzY2hlbWEgKz0gU2NoZW1hUGFydFVpbnQzMlN0cmluZwogICAgcHVzaGJ5dGVzICJ1aW50MzIiCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDYzCiAgICAvLyBicmVhawogICAgYiBhZGRUeXBlX2Jsb2NrQDYyCgphZGRUeXBlX2FmdGVyX2lmX2Vsc2VAMTg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ2NAogICAgLy8gY2FzZSBTY2hlbWFQYXJ0VWludDY0OgogICAgZHVwCiAgICBwdXNoYnl0ZXMgMHgwZAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDY0LTQ2NgogICAgLy8gY2FzZSBTY2hlbWFQYXJ0VWludDY0OgogICAgLy8gICBzY2hlbWEgKz0gU2NoZW1hUGFydFVpbnQ2NFN0cmluZwogICAgLy8gICBicmVhawogICAgYnogYWRkVHlwZV9hZnRlcl9pZl9lbHNlQDIxCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDY1CiAgICAvLyBzY2hlbWEgKz0gU2NoZW1hUGFydFVpbnQ2NFN0cmluZwogICAgcHVzaGJ5dGVzICJ1aW50NjQiCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDY2CiAgICAvLyBicmVhawogICAgYiBhZGRUeXBlX2Jsb2NrQDYyCgphZGRUeXBlX2FmdGVyX2lmX2Vsc2VAMjE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ2NwogICAgLy8gY2FzZSBTY2hlbWFQYXJ0VWludDEyODoKICAgIGR1cAogICAgcHVzaGJ5dGVzIDB4MGUKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ2Ny00NjkKICAgIC8vIGNhc2UgU2NoZW1hUGFydFVpbnQxMjg6CiAgICAvLyAgIHNjaGVtYSArPSBTY2hlbWFQYXJ0VWludDEyOFN0cmluZwogICAgLy8gICBicmVhawogICAgYnogYWRkVHlwZV9hZnRlcl9pZl9lbHNlQDI0CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDY4CiAgICAvLyBzY2hlbWEgKz0gU2NoZW1hUGFydFVpbnQxMjhTdHJpbmcKICAgIHB1c2hieXRlcyAidWludDEyOCIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NjkKICAgIC8vIGJyZWFrCiAgICBiIGFkZFR5cGVfYmxvY2tANjIKCmFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUAyNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDcwCiAgICAvLyBjYXNlIFNjaGVtYVBhcnRVaW50MjU2OgogICAgZHVwCiAgICBwdXNoYnl0ZXMgMHgwZgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDcwLTQ3MgogICAgLy8gY2FzZSBTY2hlbWFQYXJ0VWludDI1NjoKICAgIC8vICAgc2NoZW1hICs9IFNjaGVtYVBhcnRVaW50MjU2U3RyaW5nCiAgICAvLyAgIGJyZWFrCiAgICBieiBhZGRUeXBlX2FmdGVyX2lmX2Vsc2VAMjcKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NzEKICAgIC8vIHNjaGVtYSArPSBTY2hlbWFQYXJ0VWludDI1NlN0cmluZwogICAgcHVzaGJ5dGVzICJ1aW50MjU2IgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ3MgogICAgLy8gYnJlYWsKICAgIGIgYWRkVHlwZV9ibG9ja0A2MgoKYWRkVHlwZV9hZnRlcl9pZl9lbHNlQDI3OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NzMKICAgIC8vIGNhc2UgU2NoZW1hUGFydFVpbnQ1MTI6CiAgICBkdXAKICAgIHB1c2hieXRlcyAweDEwCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NzMtNDc1CiAgICAvLyBjYXNlIFNjaGVtYVBhcnRVaW50NTEyOgogICAgLy8gICBzY2hlbWEgKz0gU2NoZW1hUGFydFVpbnQ1MTJTdHJpbmcKICAgIC8vICAgYnJlYWsKICAgIGJ6IGFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUAzMAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ3NAogICAgLy8gc2NoZW1hICs9IFNjaGVtYVBhcnRVaW50NTEyU3RyaW5nCiAgICBwdXNoYnl0ZXMgInVpbnQ1MTIiCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDc1CiAgICAvLyBicmVhawogICAgYiBhZGRUeXBlX2Jsb2NrQDYyCgphZGRUeXBlX2FmdGVyX2lmX2Vsc2VAMzA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ3NgogICAgLy8gY2FzZSBTY2hlbWFQYXJ0Qnl0ZXM0OgogICAgZHVwCiAgICBwdXNoYnl0ZXMgMHgxNAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDc2LTQ3OAogICAgLy8gY2FzZSBTY2hlbWFQYXJ0Qnl0ZXM0OgogICAgLy8gICBzY2hlbWEgKz0gU2NoZW1hUGFydEJ5dGVzNFN0cmluZwogICAgLy8gICBicmVhawogICAgYnogYWRkVHlwZV9hZnRlcl9pZl9lbHNlQDMzCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDc3CiAgICAvLyBzY2hlbWEgKz0gU2NoZW1hUGFydEJ5dGVzNFN0cmluZwogICAgcHVzaGJ5dGVzICJieXRlWzRdIgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ3OAogICAgLy8gYnJlYWsKICAgIGIgYWRkVHlwZV9ibG9ja0A2MgoKYWRkVHlwZV9hZnRlcl9pZl9lbHNlQDMzOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NzkKICAgIC8vIGNhc2UgU2NoZW1hUGFydEJ5dGVzODoKICAgIGR1cAogICAgcHVzaGJ5dGVzIDB4MTUKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ3OS00ODEKICAgIC8vIGNhc2UgU2NoZW1hUGFydEJ5dGVzODoKICAgIC8vICAgc2NoZW1hICs9IFNjaGVtYVBhcnRCeXRlczhTdHJpbmcKICAgIC8vICAgYnJlYWsKICAgIGJ6IGFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUAzNgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ4MAogICAgLy8gc2NoZW1hICs9IFNjaGVtYVBhcnRCeXRlczhTdHJpbmcKICAgIHB1c2hieXRlcyAiYnl0ZVs4XSIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0ODEKICAgIC8vIGJyZWFrCiAgICBiIGFkZFR5cGVfYmxvY2tANjIKCmFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUAzNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDgyCiAgICAvLyBjYXNlIFNjaGVtYVBhcnRCeXRlczE2OgogICAgZHVwCiAgICBwdXNoYnl0ZXMgMHgxNgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDgyLTQ4NAogICAgLy8gY2FzZSBTY2hlbWFQYXJ0Qnl0ZXMxNjoKICAgIC8vICAgc2NoZW1hICs9IFNjaGVtYVBhcnRCeXRlczE2U3RyaW5nCiAgICAvLyAgIGJyZWFrCiAgICBieiBhZGRUeXBlX2FmdGVyX2lmX2Vsc2VAMzkKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0ODMKICAgIC8vIHNjaGVtYSArPSBTY2hlbWFQYXJ0Qnl0ZXMxNlN0cmluZwogICAgcHVzaGJ5dGVzICJieXRlWzE2XSIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0ODQKICAgIC8vIGJyZWFrCiAgICBiIGFkZFR5cGVfYmxvY2tANjIKCmFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUAzOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDg1CiAgICAvLyBjYXNlIFNjaGVtYVBhcnRCeXRlczMyOgogICAgZHVwCiAgICBwdXNoYnl0ZXMgMHgxNwogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDg1LTQ4NwogICAgLy8gY2FzZSBTY2hlbWFQYXJ0Qnl0ZXMzMjoKICAgIC8vICAgc2NoZW1hICs9IFNjaGVtYVBhcnRCeXRlczMyU3RyaW5nCiAgICAvLyAgIGJyZWFrCiAgICBieiBhZGRUeXBlX2FmdGVyX2lmX2Vsc2VANDIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0ODYKICAgIC8vIHNjaGVtYSArPSBTY2hlbWFQYXJ0Qnl0ZXMzMlN0cmluZwogICAgcHVzaGJ5dGVzICJieXRlWzMyXSIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0ODcKICAgIC8vIGJyZWFrCiAgICBiIGFkZFR5cGVfYmxvY2tANjIKCmFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUA0MjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDg4CiAgICAvLyBjYXNlIFNjaGVtYVBhcnRCeXRlczY0OgogICAgZHVwCiAgICBwdXNoYnl0ZXMgMHgxOAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDg4LTQ5MAogICAgLy8gY2FzZSBTY2hlbWFQYXJ0Qnl0ZXM2NDoKICAgIC8vICAgc2NoZW1hICs9IFNjaGVtYVBhcnRCeXRlczY0U3RyaW5nCiAgICAvLyAgIGJyZWFrCiAgICBieiBhZGRUeXBlX2FmdGVyX2lmX2Vsc2VANDUKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0ODkKICAgIC8vIHNjaGVtYSArPSBTY2hlbWFQYXJ0Qnl0ZXM2NFN0cmluZwogICAgcHVzaGJ5dGVzICJieXRlWzY0XSIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0OTAKICAgIC8vIGJyZWFrCiAgICBiIGFkZFR5cGVfYmxvY2tANjIKCmFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUA0NToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDkxCiAgICAvLyBjYXNlIFNjaGVtYVBhcnRCeXRlczEyODoKICAgIGR1cAogICAgcHVzaGJ5dGVzIDB4MTkKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ5MS00OTMKICAgIC8vIGNhc2UgU2NoZW1hUGFydEJ5dGVzMTI4OgogICAgLy8gICBzY2hlbWEgKz0gU2NoZW1hUGFydEJ5dGVzMTI4U3RyaW5nCiAgICAvLyAgIGJyZWFrCiAgICBieiBhZGRUeXBlX2FmdGVyX2lmX2Vsc2VANDgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0OTIKICAgIC8vIHNjaGVtYSArPSBTY2hlbWFQYXJ0Qnl0ZXMxMjhTdHJpbmcKICAgIHB1c2hieXRlcyAiYnl0ZVsxMjhdIgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ5MwogICAgLy8gYnJlYWsKICAgIGIgYWRkVHlwZV9ibG9ja0A2MgoKYWRkVHlwZV9hZnRlcl9pZl9lbHNlQDQ4OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0OTQKICAgIC8vIGNhc2UgU2NoZW1hUGFydEJ5dGVzMjU2OgogICAgZHVwCiAgICBwdXNoYnl0ZXMgMHgxYQogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDk0LTQ5NgogICAgLy8gY2FzZSBTY2hlbWFQYXJ0Qnl0ZXMyNTY6CiAgICAvLyAgIHNjaGVtYSArPSBTY2hlbWFQYXJ0Qnl0ZXMyNTZTdHJpbmcKICAgIC8vICAgYnJlYWsKICAgIGJ6IGFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUA1MQogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ5NQogICAgLy8gc2NoZW1hICs9IFNjaGVtYVBhcnRCeXRlczI1NlN0cmluZwogICAgcHVzaGJ5dGVzICJieXRlWzI1Nl0iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDk2CiAgICAvLyBicmVhawogICAgYiBhZGRUeXBlX2Jsb2NrQDYyCgphZGRUeXBlX2FmdGVyX2lmX2Vsc2VANTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjQ5NwogICAgLy8gY2FzZSBTY2hlbWFQYXJ0Qnl0ZXM1MTI6CiAgICBkdXAKICAgIHB1c2hieXRlcyAweDFiCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0OTctNDk5CiAgICAvLyBjYXNlIFNjaGVtYVBhcnRCeXRlczUxMjoKICAgIC8vICAgc2NoZW1hICs9IFNjaGVtYVBhcnRCeXRlczUxMlN0cmluZwogICAgLy8gICBicmVhawogICAgYnogYWRkVHlwZV9hZnRlcl9pZl9lbHNlQDU0CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NDk4CiAgICAvLyBzY2hlbWEgKz0gU2NoZW1hUGFydEJ5dGVzNTEyU3RyaW5nCiAgICBwdXNoYnl0ZXMgImJ5dGVbNTEyXSIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0OTkKICAgIC8vIGJyZWFrCiAgICBiIGFkZFR5cGVfYmxvY2tANjIKCmFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUA1NDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTAwCiAgICAvLyBjYXNlIFNjaGVtYVBhcnRTdHJpbmc6CiAgICBkdXAKICAgIHB1c2hieXRlcyAweDFlCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1MDAtNTAyCiAgICAvLyBjYXNlIFNjaGVtYVBhcnRTdHJpbmc6CiAgICAvLyAgIHNjaGVtYSArPSBTY2hlbWFQYXJ0U3RyaW5nU3RyaW5nCiAgICAvLyAgIGJyZWFrCiAgICBieiBhZGRUeXBlX2FmdGVyX2lmX2Vsc2VANTcKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1MDEKICAgIC8vIHNjaGVtYSArPSBTY2hlbWFQYXJ0U3RyaW5nU3RyaW5nCiAgICBwdXNoYnl0ZXMgInN0cmluZyIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1MDIKICAgIC8vIGJyZWFrCiAgICBiIGFkZFR5cGVfYmxvY2tANjIKCmFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUA1NzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTAzCiAgICAvLyBjYXNlIFNjaGVtYVBhcnRBZGRyZXNzOgogICAgcHVzaGJ5dGVzIDB4MjgKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjUwMy01MDUKICAgIC8vIGNhc2UgU2NoZW1hUGFydEFkZHJlc3M6CiAgICAvLyAgIHNjaGVtYSArPSBTY2hlbWFQYXJ0QWRkcmVzc1N0cmluZwogICAgLy8gICBicmVhawogICAgYnogYWRkVHlwZV9hZnRlcl9pZl9lbHNlQDYwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjUwNAogICAgLy8gc2NoZW1hICs9IFNjaGVtYVBhcnRBZGRyZXNzU3RyaW5nCiAgICBwdXNoYnl0ZXMgImFkZHJlc3MiCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTA1CiAgICAvLyBicmVhawogICAgYiBhZGRUeXBlX2Jsb2NrQDYyCgphZGRUeXBlX2FmdGVyX2lmX2Vsc2VANjA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjUwNwogICAgLy8gbG9nZ2VkQXNzZXJ0KGZhbHNlLCBlcnJJbnZhbGlkU2NoZW1hUGFydCkKICAgIHB1c2hieXRlcyAiRVJSOmVyck1zY2giCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTXNjaAoKYWRkVHlwZV9hZnRlcl93aGlsZUA2NjoKICAgIGJ1cnkgMQogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjE1OAogICAgLy8gY29uc3QgaWQgPSB0aGlzLnR5cGVzSUQudmFsdWUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjEzNAogICAgLy8gdHlwZXNJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogTWV0YUdsb2JhbFN0YXRlS2V5VHlwZXNJRCB9KQogICAgYnl0ZWMgMTAgLy8gInR5cGVzX2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxNTgKICAgIC8vIGNvbnN0IGlkID0gdGhpcy50eXBlc0lELnZhbHVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxNTkKICAgIC8vIHRoaXMudHlwZXNJRC52YWx1ZSArPSAxCiAgICBkdXAKICAgIGludGNfMSAvLyAxCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjEzNAogICAgLy8gdHlwZXNJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogTWV0YUdsb2JhbFN0YXRlS2V5VHlwZXNJRCB9KQogICAgYnl0ZWMgMTAgLy8gInR5cGVzX2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxNTkKICAgIC8vIHRoaXMudHlwZXNJRC52YWx1ZSArPSAxCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1MTcKICAgIC8vIGNvbnN0IG1pbkJhbGFuY2VCZWZvcmU6IHVpbnQ2NCA9IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLm1pbkJhbGFuY2UKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdE1pbkJhbGFuY2UKICAgIGFzc2VydCAvLyBhY2NvdW50IGZ1bmRlZAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1MjAKICAgIC8vIHNjaGVtYTogc2NoZW1hICsgJyknLAogICAgdW5jb3ZlciAyCiAgICBwdXNoYnl0ZXMgIikiCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTE4LTUyMQogICAgLy8gdGhpcy50eXBlcyhpZCkudmFsdWUgPSB7CiAgICAvLyAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbiwKICAgIC8vICAgc2NoZW1hOiBzY2hlbWEgKyAnKScsCiAgICAvLyB9CiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgNAogICAgKwogICAgZGlnIDYKICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICB1bmNvdmVyIDUKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHB1c2hieXRlcyAweDAwMDQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1MTgKICAgIC8vIHRoaXMudHlwZXMoaWQpLnZhbHVlID0gewogICAgdW5jb3ZlciAyCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjE0OQogICAgLy8gdHlwZXMgPSBCb3hNYXA8dWludDY0LCBUeXBlc1ZhbHVlPih7IGtleVByZWZpeDogTWV0YUJveFByZWZpeFR5cGVzIH0pCiAgICBwdXNoYnl0ZXMgInQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTE4LTUyMQogICAgLy8gdGhpcy50eXBlcyhpZCkudmFsdWUgPSB7CiAgICAvLyAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbiwKICAgIC8vICAgc2NoZW1hOiBzY2hlbWEgKyAnKScsCiAgICAvLyB9CiAgICBkdXAKICAgIGJveF9kZWwKICAgIHBvcAogICAgc3dhcAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1MjMKICAgIC8vIGNvbnN0IHN0b3JhZ2U6IHVpbnQ2NCA9IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLm1pbkJhbGFuY2UgLSBtaW5CYWxhbmNlQmVmb3JlCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RNaW5CYWxhbmNlCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIHN3YXAKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTI0CiAgICAvLyB0aGlzLnR5cGVGZWVzLnZhbHVlICs9IE1ldGFUeXBlRmVlIC0gc3RvcmFnZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTM5CiAgICAvLyB0eXBlRmVlcyA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogTWV0YUdsb2JhbFN0YXRlS2V5VHlwZUZlZXMgfSkKICAgIGJ5dGVjXzMgLy8gInR5cGVfZmVlcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTI0CiAgICAvLyB0aGlzLnR5cGVGZWVzLnZhbHVlICs9IE1ldGFUeXBlRmVlIC0gc3RvcmFnZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGMgOSAvLyAxMDAwMDAwMDAKICAgIHVuY292ZXIgMgogICAgLQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxMzkKICAgIC8vIHR5cGVGZWVzID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBNZXRhR2xvYmFsU3RhdGVLZXlUeXBlRmVlcyB9KQogICAgYnl0ZWNfMyAvLyAidHlwZV9mZWVzIgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1MjQKICAgIC8vIHRoaXMudHlwZUZlZXMudmFsdWUgKz0gTWV0YVR5cGVGZWUgLSBzdG9yYWdlCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo0NDcKICAgIC8vIGFkZFR5cGUocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBkZXNjcmlwdGlvbjogc3RyaW5nLCBzY2hlbWFMaXN0OiBTY2hlbWFMaXN0KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5jb2xsZWN0VHlwZUZlZXNbcm91dGluZ10oKSAtPiB2b2lkOgpjb2xsZWN0VHlwZUZlZXM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjUzNAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYWtpdGFEQU9Fc2Nyb3cuaGFzVmFsdWUgJiYgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuaWQgIT09IDAsIGVyckVzY3Jvd0RvZXNOb3RFeGlzdCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyA3IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjUzNAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYWtpdGFEQU9Fc2Nyb3cuaGFzVmFsdWUgJiYgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuaWQgIT09IDAsIGVyckVzY3Jvd0RvZXNOb3RFeGlzdCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBidXJ5IDEKICAgIGJ6IGNvbGxlY3RUeXBlRmVlc19ib29sX2ZhbHNlQDQKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyA3IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjUzNAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYWtpdGFEQU9Fc2Nyb3cuaGFzVmFsdWUgJiYgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuaWQgIT09IDAsIGVyckVzY3Jvd0RvZXNOb3RFeGlzdCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzIgLy8gMgogICAgZXh0cmFjdF91aW50NjQKICAgIGJ6IGNvbGxlY3RUeXBlRmVlc19ib29sX2ZhbHNlQDQKICAgIGludGNfMSAvLyAxCgpjb2xsZWN0VHlwZUZlZXNfYm9vbF9tZXJnZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1MzQKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmFraXRhREFPRXNjcm93Lmhhc1ZhbHVlICYmIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmlkICE9PSAwLCBlcnJFc2Nyb3dEb2VzTm90RXhpc3QpCiAgICBibnogY29sbGVjdFR5cGVGZWVzX2FmdGVyX2Fzc2VydEA3CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJOZXNjIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5lc2MKCmNvbGxlY3RUeXBlRmVlc19hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTM2CiAgICAvLyBjb25zdCBhcHAgPSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTM2LTUzNwogICAgLy8gY29uc3QgYXBwID0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIC8vIGNvbnN0IHNwYXJlOiB1aW50NjQgPSBhcHAuYmFsYW5jZSA+IGFwcC5taW5CYWxhbmNlID8gYXBwLmJhbGFuY2UgLSBhcHAubWluQmFsYW5jZSA6IDAKICAgIGR1cG4gMgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1MzcKICAgIC8vIGNvbnN0IHNwYXJlOiB1aW50NjQgPSBhcHAuYmFsYW5jZSA+IGFwcC5taW5CYWxhbmNlID8gYXBwLmJhbGFuY2UgLSBhcHAubWluQmFsYW5jZSA6IDAKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0QmFsYW5jZQogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICBzd2FwCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdE1pbkJhbGFuY2UKICAgIGFzc2VydCAvLyBhY2NvdW50IGZ1bmRlZAogICAgPgogICAgYnogY29sbGVjdFR5cGVGZWVzX3Rlcm5hcnlfZmFsc2VAOQogICAgZHVwCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdEJhbGFuY2UKICAgIGFzc2VydCAvLyBhY2NvdW50IGZ1bmRlZAogICAgc3dhcAogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RNaW5CYWxhbmNlCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIC0KCmNvbGxlY3RUeXBlRmVlc190ZXJuYXJ5X21lcmdlQDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1MzgKICAgIC8vIGNvbnN0IGFtb3VudDogdWludDY0ID0gdGhpcy50eXBlRmVlcy52YWx1ZSA8IHNwYXJlID8gdGhpcy50eXBlRmVlcy52YWx1ZSA6IHNwYXJlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxMzkKICAgIC8vIHR5cGVGZWVzID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBNZXRhR2xvYmFsU3RhdGVLZXlUeXBlRmVlcyB9KQogICAgYnl0ZWNfMyAvLyAidHlwZV9mZWVzIgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1MzgKICAgIC8vIGNvbnN0IGFtb3VudDogdWludDY0ID0gdGhpcy50eXBlRmVlcy52YWx1ZSA8IHNwYXJlID8gdGhpcy50eXBlRmVlcy52YWx1ZSA6IHNwYXJlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDEKICAgIDwKICAgIGJ6IGNvbGxlY3RUeXBlRmVlc190ZXJuYXJ5X2ZhbHNlQDEyCiAgICBwb3AKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjEzOQogICAgLy8gdHlwZUZlZXMgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IE1ldGFHbG9iYWxTdGF0ZUtleVR5cGVGZWVzIH0pCiAgICBieXRlY18zIC8vICJ0eXBlX2ZlZXMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjUzOAogICAgLy8gY29uc3QgYW1vdW50OiB1aW50NjQgPSB0aGlzLnR5cGVGZWVzLnZhbHVlIDwgc3BhcmUgPyB0aGlzLnR5cGVGZWVzLnZhbHVlIDogc3BhcmUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCgpjb2xsZWN0VHlwZUZlZXNfdGVybmFyeV9tZXJnZUAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTM5CiAgICAvLyBpZiAoYW1vdW50ID09PSAwKSB7CiAgICBkdXAKICAgIGJueiBjb2xsZWN0VHlwZUZlZXNfYWZ0ZXJfaWZfZWxzZUAxNQogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjU0MAogICAgLy8gcmV0dXJuIDAKICAgIGludGNfMCAvLyAwCgpjb2xsZWN0VHlwZUZlZXNfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLmNvbGxlY3RUeXBlRmVlc0AxNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTMzCiAgICAvLyBjb2xsZWN0VHlwZUZlZXMoKTogdWludDY0IHsKICAgIGl0b2IKICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmNvbGxlY3RUeXBlRmVlc19hZnRlcl9pZl9lbHNlQDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1NDMKICAgIC8vIHRoaXMudHlwZUZlZXMudmFsdWUgLT0gYW1vdW50CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxMzkKICAgIC8vIHR5cGVGZWVzID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBNZXRhR2xvYmFsU3RhdGVLZXlUeXBlRmVlcyB9KQogICAgYnl0ZWNfMyAvLyAidHlwZV9mZWVzIgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1NDMKICAgIC8vIHRoaXMudHlwZUZlZXMudmFsdWUgLT0gYW1vdW50CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDEKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTM5CiAgICAvLyB0eXBlRmVlcyA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogTWV0YUdsb2JhbFN0YXRlS2V5VHlwZUZlZXMgfSkKICAgIGJ5dGVjXzMgLy8gInR5cGVfZmVlcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTQzCiAgICAvLyB0aGlzLnR5cGVGZWVzLnZhbHVlIC09IGFtb3VudAogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTQ0CiAgICAvLyBpdHhuLnBheW1lbnQoeyByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywgYW1vdW50LCBmZWU6IDAgfSkuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyA3IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjU0NAogICAgLy8gaXR4bi5wYXltZW50KHsgcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsIGFtb3VudCwgZmVlOiAwIH0pLnN1Ym1pdCgpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18yIC8vIDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBkaWcgMQogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjUzMwogICAgLy8gY29sbGVjdFR5cGVGZWVzKCk6IHVpbnQ2NCB7CiAgICBiIGNvbGxlY3RUeXBlRmVlc19hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEuY29sbGVjdFR5cGVGZWVzQDE3Cgpjb2xsZWN0VHlwZUZlZXNfdGVybmFyeV9mYWxzZUAxMjoKICAgIGIgY29sbGVjdFR5cGVGZWVzX3Rlcm5hcnlfbWVyZ2VAMTMKCmNvbGxlY3RUeXBlRmVlc190ZXJuYXJ5X2ZhbHNlQDk6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTM3CiAgICAvLyBjb25zdCBzcGFyZTogdWludDY0ID0gYXBwLmJhbGFuY2UgPiBhcHAubWluQmFsYW5jZSA/IGFwcC5iYWxhbmNlIC0gYXBwLm1pbkJhbGFuY2UgOiAwCiAgICBpbnRjXzAgLy8gMAogICAgYiBjb2xsZWN0VHlwZUZlZXNfdGVybmFyeV9tZXJnZUAxMAoKY29sbGVjdFR5cGVGZWVzX2Jvb2xfZmFsc2VANDoKICAgIGludGNfMCAvLyAwCiAgICBiIGNvbGxlY3RUeXBlRmVlc19ib29sX21lcmdlQDUKCgovLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnJvb3RDb3N0c1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnJvb3RDb3N0czoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTUwCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjU1MwogICAgLy8gcmV0dXJuIDMxXzcwMCArIDQwMCAqIEJ5dGVzKG5hbWUpLmxlbmd0aAogICAgbGVuCiAgICBpbnRjIDUgLy8gNDAwCiAgICAqCiAgICBpbnRjIDYgLy8gMzE3MDAKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTUwCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGl0b2IKICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLmRhdGFDb3N0c1tyb3V0aW5nXSgpIC0+IHZvaWQ6CmRhdGFDb3N0czoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTU2CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTU4CiAgICAvLyByZXR1cm4gdGhpcy5yZWNvcmRTdG9yYWdlQ29zdCh0aGlzLmRhdGFLZXkobmFtZSwga2V5KSwgQnl0ZXModmFsdWUpLmxlbmd0aCkKICAgIGNvdmVyIDIKICAgIGNhbGxzdWIgZGF0YUtleQogICAgc3dhcAogICAgbGVuCiAgICBjYWxsc3ViIHJlY29yZFN0b3JhZ2VDb3N0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjU1NgogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBpdG9iCiAgICBieXRlY18wIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZWNvcmRJbmZvW3JvdXRpbmddKCkgLT4gdm9pZDoKcmVjb3JkSW5mbzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTYxCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZWNvcmRJbmZvCiAgICBieXRlY18wIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZWFkUmVjb3JkW3JvdXRpbmddKCkgLT4gdm9pZDoKcmVhZFJlY29yZDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTY4CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZWFkUmVjb3JkCiAgICBieXRlY18wIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZWFkUmVjb3JkU2xpY2Vbcm91dGluZ10oKSAtPiB2b2lkOgpyZWFkUmVjb3JkU2xpY2U6CiAgICBieXRlY18xIC8vICIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjU3NwogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXBuIDIKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciAyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgMgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTc5CiAgICAvLyBjb25zdCBpbmZvID0gdGhpcy5yZWNvcmRJbmZvKGFjY291bnQsIGtleSkKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZWNvcmRJbmZvCiAgICBkdXAKICAgIGNvdmVyIDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTgwCiAgICAvLyBsb2dnZWRBc3NlcnQoaW5mby5leGlzdHMsIGVyclJlY29yZE5vdEZvdW5kKQogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgYm56IHJlYWRSZWNvcmRTbGljZV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMjQgLy8gIkVSUjplcnJNcm5mIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck1ybmYKCnJlYWRSZWNvcmRTbGljZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTgxCiAgICAvLyBsb2dnZWRBc3NlcnQoaW5mby5yZXZpc2lvbiA9PT0gZXhwZWN0ZWRSZXZpc2lvbiwgZXJyUmVjb3JkUmV2aXNpb25NaXNtYXRjaCkKICAgIGRpZyA1CiAgICBpbnRjXzEgLy8gMQogICAgZXh0cmFjdF91aW50NjQKICAgID09CiAgICBibnogcmVhZFJlY29yZFNsaWNlX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyAxNSAvLyAiRVJSOmVyck1yZXYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTXJldgoKcmVhZFJlY29yZFNsaWNlX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1ODIKICAgIC8vIGxvZ2dlZEFzc2VydChsZW5ndGggPD0gTWF4UmVjb3JkQ2h1bmtCeXRlcyAmJiBvZmZzZXQgPD0gaW5mby5zaXplICYmIGxlbmd0aCA8PSBpbmZvLnNpemUgLSBvZmZzZXQsIGVyclJlY29yZFJhbmdlKQogICAgZHVwCiAgICBpbnRjIDcgLy8gMTAyNAogICAgPD0KICAgIGJ6IHJlYWRSZWNvcmRTbGljZV9ib29sX2ZhbHNlQDkKICAgIGRpZyA0CiAgICBwdXNoaW50IDkKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGJ1cnkgNwogICAgZGlnIDIKICAgID49CiAgICBieiByZWFkUmVjb3JkU2xpY2VfYm9vbF9mYWxzZUA5CiAgICBkaWcgNQogICAgZGlnIDIKICAgIC0KICAgIGRpZyAxCiAgICA+PQogICAgYnogcmVhZFJlY29yZFNsaWNlX2Jvb2xfZmFsc2VAOQogICAgaW50Y18xIC8vIDEKCnJlYWRSZWNvcmRTbGljZV9ib29sX21lcmdlQDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1ODIKICAgIC8vIGxvZ2dlZEFzc2VydChsZW5ndGggPD0gTWF4UmVjb3JkQ2h1bmtCeXRlcyAmJiBvZmZzZXQgPD0gaW5mby5zaXplICYmIGxlbmd0aCA8PSBpbmZvLnNpemUgLSBvZmZzZXQsIGVyclJlY29yZFJhbmdlKQogICAgYm56IHJlYWRSZWNvcmRTbGljZV9hZnRlcl9hc3NlcnRAMTIKICAgIHB1c2hieXRlcyAiRVJSOmVyck1ybmciCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTXJuZwoKcmVhZFJlY29yZFNsaWNlX2FmdGVyX2Fzc2VydEAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTgzCiAgICAvLyByZXR1cm4gdGhpcy5yZWNvcmRzKHRoaXMucmVjb3JkS2V5KGFjY291bnQsIGtleSkpLmV4dHJhY3QoUmVjb3JkSGVhZGVyQnl0ZXMgKyBvZmZzZXQsIGxlbmd0aCkKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAzCiAgICBjYWxsc3ViIHJlY29yZEtleQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxNTMKICAgIC8vIHJlY29yZHMgPSBCb3hNYXA8Ynl0ZXMsIE1ldGFSZWNvcmRWYWx1ZT4oeyBrZXlQcmVmaXg6IFJlY29yZFByZWZpeCB9KQogICAgYnl0ZWNfMiAvLyAibSIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1ODMKICAgIC8vIHJldHVybiB0aGlzLnJlY29yZHModGhpcy5yZWNvcmRLZXkoYWNjb3VudCwga2V5KSkuZXh0cmFjdChSZWNvcmRIZWFkZXJCeXRlcyArIG9mZnNldCwgbGVuZ3RoKQogICAgcHVzaGludCAxMgogICAgdW5jb3ZlciAzCiAgICArCiAgICB1bmNvdmVyIDIKICAgIGJveF9leHRyYWN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjU3NwogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYnl0ZWNfMCAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKcmVhZFJlY29yZFNsaWNlX2Jvb2xfZmFsc2VAOToKICAgIGludGNfMCAvLyAwCiAgICBiIHJlYWRSZWNvcmRTbGljZV9ib29sX21lcmdlQDEwCgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZWNvcmRDb3N0W3JvdXRpbmddKCkgLT4gdm9pZDoKcmVjb3JkQ29zdDoKICAgIGludGNfMCAvLyAwCiAgICBieXRlY18xIC8vICIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjU4NgogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTg4CiAgICAvLyBsb2dnZWRBc3NlcnQoc2l6ZSArIFJlY29yZEFyZ3VtZW50Qnl0ZXMgKyBrZXkubGVuZ3RoIDw9IE1heEFwcENhbGxBcmd1bWVudEJ5dGVzLCBlcnJSZWNvcmRWYWx1ZVRvb0xhcmdlKQogICAgcHVzaGludCAyMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICArCiAgICBpbnRjIDEwIC8vIDE2Mzg0CiAgICA8PQogICAgYm56IHJlY29yZENvc3RfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDI1IC8vICJFUlI6ZXJyTXZzeiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJNdnN6CgpyZWNvcmRDb3N0X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1ODkKICAgIC8vIGNvbnN0IGlkID0gdGhpcy5yZWNvcmRLZXkoYWNjb3VudCwga2V5KQogICAgc3dhcAogICAgZGlnIDIKICAgIGR1cAogICAgY292ZXIgMgogICAgY2FsbHN1YiByZWNvcmRLZXkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTkwCiAgICAvLyBjb25zdCBuZXh0ID0gdGhpcy5yZWNvcmRTdG9yYWdlQ29zdChrZXksIHNpemUpCiAgICBzd2FwCiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgcmVjb3JkU3RvcmFnZUNvc3QKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTkxCiAgICAvLyBsZXQgcHJldmlvdXM6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBidXJ5IDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTUzCiAgICAvLyByZWNvcmRzID0gQm94TWFwPGJ5dGVzLCBNZXRhUmVjb3JkVmFsdWU+KHsga2V5UHJlZml4OiBSZWNvcmRQcmVmaXggfSkKICAgIGJ5dGVjXzIgLy8gIm0iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgYnVyeSA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjU5MgogICAgLy8gaWYgKHRoaXMucmVjb3JkcyhpZCkuZXhpc3RzKSBwcmV2aW91cyA9IHRoaXMucmVjb3JkU3RvcmFnZUNvc3Qoa2V5LCB0aGlzLnJlY29yZHMoaWQpLmxlbmd0aCAtIFJlY29yZEhlYWRlckJ5dGVzKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiByZWNvcmRDb3N0X2FmdGVyX2lmX2Vsc2VANQogICAgZGlnIDMKICAgIGJveF9sZW4KICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBwdXNoaW50IDEyCiAgICAtCiAgICBkaWcgMgogICAgc3dhcAogICAgY2FsbHN1YiByZWNvcmRTdG9yYWdlQ29zdAogICAgYnVyeSAzCgpyZWNvcmRDb3N0X2FmdGVyX2lmX2Vsc2VANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTkzCiAgICAvLyByZXR1cm4gbmV4dCA+IHByZXZpb3VzID8gbmV4dCAtIHByZXZpb3VzIDogMAogICAgZHVwCiAgICBkaWcgMwogICAgPgogICAgYnogcmVjb3JkQ29zdF90ZXJuYXJ5X2ZhbHNlQDcKICAgIGRpZyAyCiAgICAtCgpyZWNvcmRDb3N0X3Rlcm5hcnlfbWVyZ2VAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTg2CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGl0b2IKICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCnJlY29yZENvc3RfdGVybmFyeV9mYWxzZUA3OgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjU5MwogICAgLy8gcmV0dXJuIG5leHQgPiBwcmV2aW91cyA/IG5leHQgLSBwcmV2aW91cyA6IDAKICAgIGludGNfMCAvLyAwCiAgICBiIHJlY29yZENvc3RfdGVybmFyeV9tZXJnZUA4CgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5zZXRSZWNvcmRbcm91dGluZ10oKSAtPiB2b2lkOgpzZXRSZWNvcmQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjU5Ny02MDEKICAgIC8vIHNldFJlY29yZCgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBrZXk6IGJ5dGVzLAogICAgLy8gICBkYXRhMDogYnl0ZXMsIGRhdGExOiBieXRlcywgZGF0YTI6IGJ5dGVzLCBkYXRhMzogYnl0ZXMsCiAgICAvLyAgIGV4cGVjdGVkUmV2aXNpb246IHVpbnQ2NCwKICAgIC8vICk6IHVpbnQ2NCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBkdXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBzd2FwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgc3dhcAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHN3YXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDUKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBzd2FwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA2CiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2MDIKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5pc1BvbGljeUtleShrZXkpLCBlcnJQb2xpY3lLZXkpCiAgICBjYWxsc3ViIGlzUG9saWN5S2V5CiAgICBieiBzZXRSZWNvcmRfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDI2IC8vICJFUlI6ZXJyTXBreSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJNcGt5CgpzZXRSZWNvcmRfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjYwMwogICAgLy8gcmV0dXJuIHRoaXMuc3RvcmVSZWNvcmQocGF5bWVudCwga2V5LCBkYXRhMCwgZGF0YTEsIGRhdGEyLCBkYXRhMywgZXhwZWN0ZWRSZXZpc2lvbikKICAgIGNhbGxzdWIgc3RvcmVSZWNvcmQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTk3LTYwMQogICAgLy8gc2V0UmVjb3JkKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGtleTogYnl0ZXMsCiAgICAvLyAgIGRhdGEwOiBieXRlcywgZGF0YTE6IGJ5dGVzLCBkYXRhMjogYnl0ZXMsIGRhdGEzOiBieXRlcywKICAgIC8vICAgZXhwZWN0ZWRSZXZpc2lvbjogdWludDY0LAogICAgLy8gKTogdWludDY0IHsKICAgIGl0b2IKICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnJlbW92ZVJlY29yZFtyb3V0aW5nXSgpIC0+IHZvaWQ6CnJlbW92ZVJlY29yZDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NjQ2CiAgICAvLyByZW1vdmVSZWNvcmQoa2V5OiBieXRlcywgZXhwZWN0ZWRSZXZpc2lvbjogdWludDY0KTogdWludDY0IHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnJlbW92ZVJlY29yZAogICAgaXRvYgogICAgYnl0ZWNfMCAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEuc2V0UG9saWN5V3JpdGVyW3JvdXRpbmddKCkgLT4gdm9pZDoKc2V0UG9saWN5V3JpdGVyOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2OTAKICAgIC8vIHNldFBvbGljeVdyaXRlcih3cml0ZXI6IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlYyA0IC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjIDggLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NjkzCiAgICAvLyAodGhpcy5wb2xpY3lXcml0ZXIudmFsdWUuaWQgPT09IDAgJiYgVHhuLnNlbmRlciA9PT0gR2xvYmFsLmNyZWF0b3JBZGRyZXNzKSB8fAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTQ0CiAgICAvLyBwb2xpY3lXcml0ZXIgPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IE1ldGFHbG9iYWxTdGF0ZUtleVBvbGljeVdyaXRlciB9KQogICAgYnl0ZWMgNiAvLyAicG9saWN5X3dyaXRlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NjkzCiAgICAvLyAodGhpcy5wb2xpY3lXcml0ZXIudmFsdWUuaWQgPT09IDAgJiYgVHhuLnNlbmRlciA9PT0gR2xvYmFsLmNyZWF0b3JBZGRyZXNzKSB8fAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJueiBzZXRQb2xpY3lXcml0ZXJfb3JfY29udGRAMwogICAgdHhuIFNlbmRlcgogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICA9PQogICAgYm56IHNldFBvbGljeVdyaXRlcl9ib29sX3RydWVANQoKc2V0UG9saWN5V3JpdGVyX29yX2NvbnRkQDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjY5NAogICAgLy8gKGRhby5pZCAhPT0gMCAmJiBUeG4uc2VuZGVyID09PSBkYW8uYWRkcmVzcyksCiAgICBkaWcgMQogICAgYnogc2V0UG9saWN5V3JpdGVyX2Jvb2xfZmFsc2VANgogICAgdHhuIFNlbmRlcgogICAgZGlnIDIKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBieiBzZXRQb2xpY3lXcml0ZXJfYm9vbF9mYWxzZUA2CgpzZXRQb2xpY3lXcml0ZXJfYm9vbF90cnVlQDU6CiAgICBpbnRjXzEgLy8gMQoKc2V0UG9saWN5V3JpdGVyX2Jvb2xfbWVyZ2VANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NjkyLTY5NgogICAgLy8gbG9nZ2VkQXNzZXJ0KAogICAgLy8gICAodGhpcy5wb2xpY3lXcml0ZXIudmFsdWUuaWQgPT09IDAgJiYgVHhuLnNlbmRlciA9PT0gR2xvYmFsLmNyZWF0b3JBZGRyZXNzKSB8fAogICAgLy8gICAoZGFvLmlkICE9PSAwICYmIFR4bi5zZW5kZXIgPT09IGRhby5hZGRyZXNzKSwKICAgIC8vICAgZXJyTm90QWtpdGFEYW8sCiAgICAvLyApCiAgICBibnogc2V0UG9saWN5V3JpdGVyX2FmdGVyX2Fzc2VydEA5CiAgICBieXRlYyA5IC8vICJFUlI6ZXJyTmRhbyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOZGFvCgpzZXRQb2xpY3lXcml0ZXJfYWZ0ZXJfYXNzZXJ0QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjE0NAogICAgLy8gcG9saWN5V3JpdGVyID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBNZXRhR2xvYmFsU3RhdGVLZXlQb2xpY3lXcml0ZXIgfSkKICAgIGJ5dGVjIDYgLy8gInBvbGljeV93cml0ZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjY5NwogICAgLy8gdGhpcy5wb2xpY3lXcml0ZXIudmFsdWUgPSB3cml0ZXIKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjY5MAogICAgLy8gc2V0UG9saWN5V3JpdGVyKHdyaXRlcjogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCnNldFBvbGljeVdyaXRlcl9ib29sX2ZhbHNlQDY6CiAgICBpbnRjXzAgLy8gMAogICAgYiBzZXRQb2xpY3lXcml0ZXJfYm9vbF9tZXJnZUA3CgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5zZXRQb2xpY3lbcm91dGluZ10oKSAtPiB2b2lkOgpzZXRQb2xpY3k6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjcwNAogICAgLy8gc2V0UG9saWN5KHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgd2FsbGV0OiBBcHBsaWNhdGlvbiwga2V5OiBieXRlcywgZGF0YTogYnl0ZXMsIGV4cGVjdGVkUmV2aXNpb246IHVpbnQ2NCk6IHVpbnQ2NCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjcwNQogICAgLy8gdGhpcy5yZXF1aXJlUG9saWN5V2luZG93KHdhbGxldCwga2V5KQogICAgdW5jb3ZlciAzCiAgICBkaWcgMwogICAgY2FsbHN1YiByZXF1aXJlUG9saWN5V2luZG93CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjcwNgogICAgLy8gcmV0dXJuIHRoaXMuc3RvcmVSZWNvcmQocGF5bWVudCwga2V5LCBCeXRlcygnJyksIEJ5dGVzKCcnKSwgQnl0ZXMoJycpLCBkYXRhLCBleHBlY3RlZFJldmlzaW9uKQogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDMKICAgIGJ5dGVjXzEgLy8gIiIKICAgIGR1cG4gMgogICAgdW5jb3ZlciA2CiAgICB1bmNvdmVyIDYKICAgIGNhbGxzdWIgc3RvcmVSZWNvcmQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NzA0CiAgICAvLyBzZXRQb2xpY3kocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCB3YWxsZXQ6IEFwcGxpY2F0aW9uLCBrZXk6IGJ5dGVzLCBkYXRhOiBieXRlcywgZXhwZWN0ZWRSZXZpc2lvbjogdWludDY0KTogdWludDY0IHsKICAgIGl0b2IKICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnJlbW92ZVBvbGljeVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnJlbW92ZVBvbGljeToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NzEwCiAgICAvLyByZW1vdmVQb2xpY3kod2FsbGV0OiBBcHBsaWNhdGlvbiwga2V5OiBieXRlcywgZXhwZWN0ZWRSZXZpc2lvbjogdWludDY0KTogdWludDY0IHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NzExCiAgICAvLyB0aGlzLnJlcXVpcmVQb2xpY3lXaW5kb3cod2FsbGV0LCBrZXkpCiAgICB1bmNvdmVyIDIKICAgIGRpZyAyCiAgICBjYWxsc3ViIHJlcXVpcmVQb2xpY3lXaW5kb3cKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NzEyCiAgICAvLyB0aGlzLmRyb3BSZWNvcmQoa2V5LCBleHBlY3RlZFJldmlzaW9uKQogICAgY2FsbHN1YiBkcm9wUmVjb3JkCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjcxMAogICAgLy8gcmVtb3ZlUG9saWN5KHdhbGxldDogQXBwbGljYXRpb24sIGtleTogYnl0ZXMsIGV4cGVjdGVkUmV2aXNpb246IHVpbnQ2NCk6IHVpbnQ2NCB7CiAgICBwdXNoYnl0ZXMgMHgxNTFmN2M3NTAwMDAwMDAwMDAwMDAwMDAKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpBa2l0YUJhc2VGZWVHZW5lcmF0b3JDb250cmFjdFdpdGhvdXRBa2l0YU9wdEluLnVwZGF0ZUFraXRhREFPRXNjcm93W3JvdXRpbmddKCkgLT4gdm9pZDoKdXBkYXRlQWtpdGFEQU9Fc2Nyb3c6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo1MAogICAgLy8gdXBkYXRlQWtpdGFEQU9Fc2Nyb3coY29uZmlnOiBFc2Nyb3dDb25maWcpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cG4gMgogICAgbGVuCiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIHB1c2hpbnQgMTAKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCB0YWlsIHBvaW50ZXIgYXQgaW5kZXggMCBvZiAoKGxlbit1dGY4W10pLHVpbnQ2NCkKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgZGlnIDIKICAgIHN1YnN0cmluZzMKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDEyCiAgICArCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6RXNjcm93Q29uZmlnCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo1MQogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWMgNCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyA4IC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo1MQogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogdXBkYXRlQWtpdGFEQU9Fc2Nyb3dfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDkgLy8gIkVSUjplcnJOZGFvIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5kYW8KCnVwZGF0ZUFraXRhREFPRXNjcm93X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgNyAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTIKICAgIC8vIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgPSBjbG9uZShjb25maWcpCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTAKICAgIC8vIHVwZGF0ZUFraXRhREFPRXNjcm93KGNvbmZpZzogRXNjcm93Q29uZmlnKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjpVcGdyYWRlYWJsZUFraXRhQmFzZUNvbnRyYWN0LnVwZGF0ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozNQogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM3CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIGVyck5vdEFraXRhRGFvKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlYyA0IC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjIDggLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozNwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogdXBkYXRlX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA5IC8vICJFUlI6ZXJyTmRhbyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOZGFvCgp1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzgKICAgIC8vIGNvbnN0IFtwbHVnaW5zXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzUGx1Z2luQXBwTGlzdCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWMgNCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM4CiAgICAvLyBjb25zdCBbcGx1Z2luc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1BsdWdpbkFwcExpc3QpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHB1c2hieXRlcyAicGFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM5CiAgICAvLyBjb25zdCB1cGRhdGVQbHVnaW4gPSBkZWNvZGVBcmM0PFBsdWdpbkFwcExpc3Q+KHBsdWdpbnMpLnVwZGF0ZQogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czo0MAogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbklkID09PSB1cGRhdGVQbHVnaW4sIGVyckludmFsaWRVcGdyYWRlKQogICAgZ2xvYmFsIENhbGxlckFwcGxpY2F0aW9uSUQKICAgID09CiAgICBibnogdXBkYXRlX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJJdXBnIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckl1cGcKCnVwZGF0ZV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNAogICAgLy8gdmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5VmVyc2lvbiB9KQogICAgYnl0ZWMgMTYgLy8gInZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6NDEKICAgIC8vIHRoaXMudmVyc2lvbi52YWx1ZSA9IG5ld1ZlcnNpb24KICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzUKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czo6QWtpdGFCYXNlQ29udHJhY3QudXBkYXRlQWtpdGFEQU9bcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGVBa2l0YURBTzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNQogICAgLy8gdXBkYXRlQWtpdGFEQU8oYWtpdGFEQU86IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjI2CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIGVyck5vdEFraXRhRGFvKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlYyA0IC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjIDggLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNgogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogdXBkYXRlQWtpdGFEQU9fYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDkgLy8gIkVSUjplcnJOZGFvIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5kYW8KCnVwZGF0ZUFraXRhREFPX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWMgNCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjI3CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlID0gYWtpdGFEQU8KICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MjUKICAgIC8vIHVwZGF0ZUFraXRhREFPKGFraXRhREFPOiBBcHBsaWNhdGlvbik6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEucmVjb3JkS2V5KGFjY291bnQ6IGJ5dGVzLCBrZXk6IGJ5dGVzKSAtPiBieXRlczoKcmVjb3JkS2V5OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxNzEKICAgIC8vIHByaXZhdGUgcmVjb3JkS2V5KGFjY291bnQ6IEFjY291bnQsIGtleTogYnl0ZXMpOiBieXRlcyB7CiAgICBwcm90byAyIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTcyCiAgICAvLyBsb2dnZWRBc3NlcnQoa2V5Lmxlbmd0aCA+IDAgJiYga2V5Lmxlbmd0aCA8PSBNYXhSZWNvcmRLZXlCeXRlcywgZXJySW52YWxpZEtleSkKICAgIGZyYW1lX2RpZyAtMQogICAgbGVuCiAgICBkdXAKICAgIGJ6IHJlY29yZEtleV9ib29sX2ZhbHNlQDMKICAgIGZyYW1lX2RpZyAwCiAgICBwdXNoaW50IDMxCiAgICA8PQogICAgYnogcmVjb3JkS2V5X2Jvb2xfZmFsc2VAMwogICAgaW50Y18xIC8vIDEKCnJlY29yZEtleV9ib29sX21lcmdlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjE3MgogICAgLy8gbG9nZ2VkQXNzZXJ0KGtleS5sZW5ndGggPiAwICYmIGtleS5sZW5ndGggPD0gTWF4UmVjb3JkS2V5Qnl0ZXMsIGVyckludmFsaWRLZXkpCiAgICBibnogcmVjb3JkS2V5X2FmdGVyX2Fzc2VydEA2CiAgICBieXRlYyAxOSAvLyAiRVJSOmVyck1rZXkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTWtleQoKcmVjb3JkS2V5X2FmdGVyX2Fzc2VydEA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxNzMKICAgIC8vIHJldHVybiBhY2NvdW50LmJ5dGVzLmNvbmNhdChrZXkpCiAgICBmcmFtZV9kaWcgLTIKICAgIGZyYW1lX2RpZyAtMQogICAgY29uY2F0CiAgICBzd2FwCiAgICByZXRzdWIKCnJlY29yZEtleV9ib29sX2ZhbHNlQDM6CiAgICBpbnRjXzAgLy8gMAogICAgYiByZWNvcmRLZXlfYm9vbF9tZXJnZUA0CgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5kYXRhS2V5KG5hbWU6IGJ5dGVzLCBrZXk6IGJ5dGVzKSAtPiBieXRlczoKZGF0YUtleToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTc3CiAgICAvLyBwcml2YXRlIGRhdGFLZXkobmFtZTogc3RyaW5nLCBrZXk6IHN0cmluZyk6IGJ5dGVzIHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxNzgKICAgIC8vIGxvZ2dlZEFzc2VydChCeXRlcyhuYW1lKS5sZW5ndGggKyBCeXRlcyhrZXkpLmxlbmd0aCA8IE1heFJlY29yZEtleUJ5dGVzLCBlcnJLZXlUb29Mb25nKQogICAgZnJhbWVfZGlnIC0yCiAgICBsZW4KICAgIGR1cAogICAgZnJhbWVfZGlnIC0xCiAgICBsZW4KICAgICsKICAgIHB1c2hpbnQgMzEKICAgIDwKICAgIGJueiBkYXRhS2V5X2FmdGVyX2Fzc2VydEAyCiAgICBieXRlYyAxNCAvLyAiRVJSOmVyckt0bCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJLdGwKCmRhdGFLZXlfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjE3OQogICAgLy8gcmV0dXJuIG5ldyBVaW50OChCeXRlcyhuYW1lKS5sZW5ndGgpLmJ5dGVzLmNvbmNhdChCeXRlcyhuYW1lKSkuY29uY2F0KEJ5dGVzKGtleSkpCiAgICBpdG9iCiAgICBkdXAKICAgIGJpdGxlbgogICAgcHVzaGludCA4CiAgICA8PQogICAgYXNzZXJ0IC8vIG92ZXJmbG93CiAgICBleHRyYWN0IDcgMQogICAgZnJhbWVfZGlnIC0yCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtMQogICAgY29uY2F0CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnJlY29yZFN0b3JhZ2VDb3N0KGtleTogYnl0ZXMsIHNpemU6IHVpbnQ2NCkgLT4gdWludDY0OgpyZWNvcmRTdG9yYWdlQ29zdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTgyCiAgICAvLyBwcml2YXRlIHJlY29yZFN0b3JhZ2VDb3N0KGtleTogYnl0ZXMsIHNpemU6IHVpbnQ2NCk6IHVpbnQ2NCB7CiAgICBwcm90byAyIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTgzCiAgICAvLyByZXR1cm4gMjUwMCArIDQwMCAqICgzMyArIGtleS5sZW5ndGggKyBSZWNvcmRIZWFkZXJCeXRlcyArIHNpemUpCiAgICBmcmFtZV9kaWcgLTIKICAgIGxlbgogICAgcHVzaGludCA0NQogICAgKwogICAgZnJhbWVfZGlnIC0xCiAgICArCiAgICBpbnRjIDUgLy8gNDAwCiAgICAqCiAgICBwdXNoaW50IDI1MDAKICAgICsKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEucmVsZWFzZVJlY29yZChib3g6IGJ5dGVzLCBhbW91bnQ6IHVpbnQ2NCkgLT4gdm9pZDoKcmVsZWFzZVJlY29yZDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTk4CiAgICAvLyBwcml2YXRlIHJlbGVhc2VSZWNvcmQoYm94OiBieXRlcywgYW1vdW50OiB1aW50NjQpOiB2b2lkIHsKICAgIHByb3RvIDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxOTkKICAgIC8vIGNvbnN0IFtyZWNlaXZlciwgdG90YWxdID0gcmVsZWFzZURlcG9zaXQoYm94LCBUeG4uc2VuZGVyLCBhbW91bnQpCiAgICBmcmFtZV9kaWcgLTIKICAgIHR4biBTZW5kZXIKICAgIGZyYW1lX2RpZyAtMQogICAgY2FsbHN1YiByZWxlYXNlRGVwb3NpdAogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIHN3YXAKICAgIGludGNfMyAvLyAzMgogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyMDAKICAgIC8vIGlmICh0b3RhbCA+IDApIGl0eG4ucGF5bWVudCh7IHJlY2VpdmVyLCBhbW91bnQ6IHRvdGFsLCBmZWU6IDAgfSkuc3VibWl0KCkKICAgIGJ6IHJlbGVhc2VSZWNvcmRfYWZ0ZXJfaWZfZWxzZUAzCiAgICBpdHhuX2JlZ2luCiAgICBmcmFtZV9kaWcgMQogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGZyYW1lX2RpZyAwCiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAoKcmVsZWFzZVJlY29yZF9hZnRlcl9pZl9lbHNlQDM6CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLmN1cnJlbnRSZWNvcmRSZXZpc2lvbihpZDogYnl0ZXMpIC0+IHVpbnQ2NDoKY3VycmVudFJlY29yZFJldmlzaW9uOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyMTQKICAgIC8vIHByaXZhdGUgY3VycmVudFJlY29yZFJldmlzaW9uKGlkOiBieXRlcyk6IHVpbnQ2NCB7CiAgICBwcm90byAxIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTUzCiAgICAvLyByZWNvcmRzID0gQm94TWFwPGJ5dGVzLCBNZXRhUmVjb3JkVmFsdWU+KHsga2V5UHJlZml4OiBSZWNvcmRQcmVmaXggfSkKICAgIGJ5dGVjXzIgLy8gIm0iCiAgICBmcmFtZV9kaWcgLTEKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjIxNQogICAgLy8gcmV0dXJuIHRoaXMucmVjb3JkcyhpZCkuZXhpc3RzID8gdGhpcy5yZWNvcmRzKGlkKS52YWx1ZS5yZXZpc2lvbiA6IDAKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogY3VycmVudFJlY29yZFJldmlzaW9uX3Rlcm5hcnlfZmFsc2VAMgogICAgaW50Y18wIC8vIDAKICAgIHB1c2hpbnQgOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIHJldHN1YgoKY3VycmVudFJlY29yZFJldmlzaW9uX3Rlcm5hcnlfZmFsc2VAMjoKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyMTUKICAgIC8vIHJldHVybiB0aGlzLnJlY29yZHMoaWQpLmV4aXN0cyA/IHRoaXMucmVjb3JkcyhpZCkudmFsdWUucmV2aXNpb24gOiAwCiAgICBpbnRjXzAgLy8gMAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS53cml0ZVJlY29yZChrZXk6IGJ5dGVzLCBkYXRhOiBieXRlcykgLT4gdWludDY0Ogp3cml0ZVJlY29yZDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MjE4CiAgICAvLyBwcml2YXRlIHdyaXRlUmVjb3JkKGtleTogYnl0ZXMsIGRhdGE6IGJ5dGVzKTogdWludDY0IHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyMTkKICAgIC8vIGNvbnN0IGlkID0gdGhpcy5yZWNvcmRLZXkoVHhuLnNlbmRlciwga2V5KQogICAgdHhuIFNlbmRlcgogICAgZnJhbWVfZGlnIC0yCiAgICBjYWxsc3ViIHJlY29yZEtleQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyMjAKICAgIC8vIGNvbnN0IHJldmlzaW9uOiB1aW50NjQgPSB0aGlzLmN1cnJlbnRSZWNvcmRSZXZpc2lvbihpZCkgKyAxCiAgICBkdXAKICAgIGNhbGxzdWIgY3VycmVudFJlY29yZFJldmlzaW9uCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyMjEKICAgIC8vIHRoaXMucmVjb3JkcyhpZCkudmFsdWUgPSB7IHJldmlzaW9uLCBkYXRhIH0KICAgIGR1cAogICAgaXRvYgogICAgZnJhbWVfZGlnIC0xCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBmcmFtZV9kaWcgLTEKICAgIGNvbmNhdAogICAgc3dhcAogICAgcHVzaGJ5dGVzIDB4MDAwYQogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTUzCiAgICAvLyByZWNvcmRzID0gQm94TWFwPGJ5dGVzLCBNZXRhUmVjb3JkVmFsdWU+KHsga2V5UHJlZml4OiBSZWNvcmRQcmVmaXggfSkKICAgIGJ5dGVjXzIgLy8gIm0iCiAgICB1bmNvdmVyIDMKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyMjEKICAgIC8vIHRoaXMucmVjb3JkcyhpZCkudmFsdWUgPSB7IHJldmlzaW9uLCBkYXRhIH0KICAgIGR1cAogICAgYm94X2RlbAogICAgcG9wCiAgICBzd2FwCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjIyMgogICAgLy8gcmV0dXJuIHJldmlzaW9uCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnZlcmlmeShhZGRyZXNzOiBieXRlcywgbmFtZTogYnl0ZXMsIGxlYWY6IGJ5dGVzLCBwcm9vZjogYnl0ZXMsIHR5cGU6IHVpbnQ2NCkgLT4gdWludDY0LCBieXRlczoKc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS52ZXJpZnk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjM2NAogICAgLy8gdmVyaWZ5KGFkZHJlc3M6IEFjY291bnQsIG5hbWU6IHN0cmluZywgbGVhZjogTGVhZiwgcHJvb2Y6IFByb29mLCB0eXBlOiB1aW50NjQpOiBib29sZWFuIHsKICAgIHByb3RvIDUgMgogICAgYnl0ZWNfMSAvLyAiIgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjM2NQogICAgLy8gY29uc3Qgcm9vdEtleSA9IHRoaXMucmVjb3JkS2V5KGFkZHJlc3MsIEJ5dGVzKG5hbWUpKQogICAgZnJhbWVfZGlnIC01CiAgICBmcmFtZV9kaWcgLTQKICAgIGNhbGxzdWIgcmVjb3JkS2V5CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjE1MQogICAgLy8gcm9vdHMgPSBCb3hNYXA8Ynl0ZXMsIFJvb3RWYWx1ZT4oeyBrZXlQcmVmaXg6IE1ldGFCb3hQcmVmaXhSb290cyB9KQogICAgYnl0ZWMgNSAvLyAiciIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjM2NgogICAgLy8gaWYgKCF0aGlzLnJvb3RzKHJvb3RLZXkpLmV4aXN0cykgcmV0dXJuIGZhbHNlCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnZlcmlmeV9hZnRlcl9pZl9lbHNlQDIKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9kaWcgLTIKICAgIGZyYW1lX2J1cnkgMQogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCnNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEudmVyaWZ5X2FmdGVyX2lmX2Vsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MzY3CiAgICAvLyBjb25zdCB0cmVlVHlwZSA9IHRoaXMucm9vdHMocm9vdEtleSkudmFsdWUudHlwZQogICAgZHVwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgaW50Y18zIC8vIDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZnJhbWVfYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjM2OAogICAgLy8gaWYgKHR5cGUgIT09IE1lcmtsZVRyZWVUeXBlVW5zcGVjaWZpZWQgJiYgdHJlZVR5cGUgIT09IHR5cGUpIHJldHVybiBmYWxzZQogICAgZnJhbWVfZGlnIC0xCiAgICBieiBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnZlcmlmeV9hZnRlcl9pZl9lbHNlQDUKICAgIGZyYW1lX2RpZyAxCiAgICBmcmFtZV9kaWcgLTEKICAgICE9CiAgICBieiBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnZlcmlmeV9hZnRlcl9pZl9lbHNlQDUKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9kaWcgLTIKICAgIGZyYW1lX2J1cnkgMQogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCnNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEudmVyaWZ5X2FmdGVyX2lmX2Vsc2VANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MzcwCiAgICAvLyBlbnN1cmVCdWRnZXQocHJvb2YubGVuZ3RoICogNTApCiAgICBmcmFtZV9kaWcgLTIKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMAogICAgcHVzaGludCA1MAogICAgKgogICAgcHVzaGludCAxMAogICAgKwoKc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS52ZXJpZnlfd2hpbGVfdG9wQDE0OgogICAgZHVwCiAgICBnbG9iYWwgT3Bjb2RlQnVkZ2V0CiAgICA+CiAgICBieiBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnZlcmlmeV9hZnRlcl93aGlsZUAxOQogICAgaXR4bl9iZWdpbgogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIHB1c2hpbnQgNSAvLyBEZWxldGVBcHBsaWNhdGlvbgogICAgaXR4bl9maWVsZCBPbkNvbXBsZXRpb24KICAgIGJ5dGVjIDI3IC8vIDB4MDY4MTAxCiAgICBpdHhuX2ZpZWxkIEFwcHJvdmFsUHJvZ3JhbQogICAgYnl0ZWMgMjcgLy8gMHgwNjgxMDEKICAgIGl0eG5fZmllbGQgQ2xlYXJTdGF0ZVByb2dyYW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGIgc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS52ZXJpZnlfd2hpbGVfdG9wQDE0CgpzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnZlcmlmeV9hZnRlcl93aGlsZUAxOToKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czozNzMKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBwcm9vZi5sZW5ndGg7IGkgKz0gMSkgewogICAgaW50Y18wIC8vIDAKICAgIHN3YXAKICAgIGZyYW1lX2RpZyAtMwogICAgY292ZXIgMgoKc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS52ZXJpZnlfd2hpbGVfdG9wQDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjM3MwogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IHByb29mLmxlbmd0aDsgaSArPSAxKSB7CiAgICBkaWcgMQogICAgZnJhbWVfZGlnIDAKICAgIDwKICAgIGJ6IHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEudmVyaWZ5X2FmdGVyX3doaWxlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Mzc0CiAgICAvLyBoYXNoID0gdGhpcy5oYXNoKHByb29mW2ldLCBoYXNoKQogICAgZnJhbWVfZGlnIC0yCiAgICBleHRyYWN0IDIgMAogICAgZGlnIDIKICAgIGludGNfMyAvLyAzMgogICAgKgogICAgaW50Y18zIC8vIDMyCiAgICBleHRyYWN0MyAvLyBvbiBlcnJvcjogaW5kZXggYWNjZXNzIGlzIG91dCBvZiBib3VuZHMKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxNjQKICAgIC8vIGlmIChCaWdVaW50KGEpID4gQmlnVWludChiKSkgewogICAgZGlnIDQKICAgIGI+CiAgICBieiBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnZlcmlmeV9hZnRlcl9pZl9lbHNlQDExCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjE2NQogICAgLy8gcmV0dXJuIHNoYTI1NihiLmNvbmNhdChhKSkKICAgIHVuY292ZXIgMwogICAgc3dhcAogICAgY29uY2F0CiAgICBzaGEyNTYKICAgIGNvdmVyIDIKCnNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEudmVyaWZ5X2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5oYXNoQDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czozNzMKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBwcm9vZi5sZW5ndGg7IGkgKz0gMSkgewogICAgc3dhcAogICAgaW50Y18xIC8vIDEKICAgICsKICAgIHN3YXAKICAgIGIgc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS52ZXJpZnlfd2hpbGVfdG9wQDYKCnNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEudmVyaWZ5X2FmdGVyX2lmX2Vsc2VAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjE2NwogICAgLy8gcmV0dXJuIHNoYTI1NihhLmNvbmNhdChiKSkKICAgIHVuY292ZXIgMwogICAgY29uY2F0CiAgICBzaGEyNTYKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Mzc0CiAgICAvLyBoYXNoID0gdGhpcy5oYXNoKHByb29mW2ldLCBoYXNoKQogICAgYiBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnZlcmlmeV9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEuaGFzaEAxMgoKc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS52ZXJpZnlfYWZ0ZXJfd2hpbGVAODoKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czozNzcKICAgIC8vIHJldHVybiBoYXNoID09PSB0aGlzLnJvb3RzKHJvb3RLZXkpLnZhbHVlLnJvb3QKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBleHRyYWN0IDAgMzIKICAgID09CiAgICBmcmFtZV9kaWcgLTIKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAzCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnJlYWQoYWRkcmVzczogYnl0ZXMsIG5hbWU6IGJ5dGVzLCBrZXk6IGJ5dGVzKSAtPiBieXRlczoKc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZWFkOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czozODgtMzg5CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIC8vIHJlYWQoYWRkcmVzczogQWNjb3VudCwgbmFtZTogc3RyaW5nLCBrZXk6IHN0cmluZyk6IHN0cmluZyB7CiAgICBwcm90byAzIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MzkwCiAgICAvLyBpZiAoa2V5ID09PSB0cmVlVHlwZUtleSkgcmV0dXJuIFN0cmluZyhpdG9iKHRoaXMucm9vdHModGhpcy5yZWNvcmRLZXkoYWRkcmVzcywgQnl0ZXMobmFtZSkpKS52YWx1ZS50eXBlKSkKICAgIGZyYW1lX2RpZyAtMQogICAgcHVzaGJ5dGVzICJsLnR5cGUiCiAgICA9PQogICAgYnogc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZWFkX2FmdGVyX2lmX2Vsc2VAMgogICAgZnJhbWVfZGlnIC0zCiAgICBmcmFtZV9kaWcgLTIKICAgIGNhbGxzdWIgcmVjb3JkS2V5CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjE1MQogICAgLy8gcm9vdHMgPSBCb3hNYXA8Ynl0ZXMsIFJvb3RWYWx1ZT4oeyBrZXlQcmVmaXg6IE1ldGFCb3hQcmVmaXhSb290cyB9KQogICAgYnl0ZWMgNSAvLyAiciIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czozOTAKICAgIC8vIGlmIChrZXkgPT09IHRyZWVUeXBlS2V5KSByZXR1cm4gU3RyaW5nKGl0b2IodGhpcy5yb290cyh0aGlzLnJlY29yZEtleShhZGRyZXNzLCBCeXRlcyhuYW1lKSkpLnZhbHVlLnR5cGUpKQogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGV4dHJhY3QgMzIgOAogICAgcmV0c3ViCgpzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnJlYWRfYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czozOTEKICAgIC8vIGNvbnN0IHJlY29yZCA9IHRoaXMucmVhZFJlY29yZChhZGRyZXNzLCB0aGlzLmRhdGFLZXkobmFtZSwga2V5KSkKICAgIGZyYW1lX2RpZyAtMgogICAgZnJhbWVfZGlnIC0xCiAgICBjYWxsc3ViIGRhdGFLZXkKICAgIGZyYW1lX2RpZyAtMwogICAgc3dhcAogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnJlYWRSZWNvcmQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czozOTIKICAgIC8vIGxvZ2dlZEFzc2VydChyZWNvcmQuZXhpc3RzLCBlcnJOb0RhdGEpCiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Yml0CiAgICBibnogc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZWFkX2FmdGVyX2Fzc2VydEA0CiAgICBieXRlYyAyMyAvLyAiRVJSOmVyck5kdGEiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmR0YQoKc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZWFkX2FmdGVyX2Fzc2VydEA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czozOTMKICAgIC8vIHJldHVybiBTdHJpbmcocmVjb3JkLmRhdGEpCiAgICBkdXAKICAgIHB1c2hpbnQgOQogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyAxCiAgICBsZW4KICAgIHN1YnN0cmluZzMKICAgIGV4dHJhY3QgMiAwCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnJlY29yZEluZm8oYWNjb3VudDogYnl0ZXMsIGtleTogYnl0ZXMpIC0+IGJ5dGVzOgpzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnJlY29yZEluZm86CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjU2MS01NjIKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgLy8gcmVjb3JkSW5mbyhhY2NvdW50OiBBY2NvdW50LCBrZXk6IGJ5dGVzKTogTWV0YVJlY29yZEluZm8gewogICAgcHJvdG8gMiAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjU2MwogICAgLy8gY29uc3QgaWQgPSB0aGlzLnJlY29yZEtleShhY2NvdW50LCBrZXkpCiAgICBmcmFtZV9kaWcgLTIKICAgIGZyYW1lX2RpZyAtMQogICAgY2FsbHN1YiByZWNvcmRLZXkKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxNTMKICAgIC8vIHJlY29yZHMgPSBCb3hNYXA8Ynl0ZXMsIE1ldGFSZWNvcmRWYWx1ZT4oeyBrZXlQcmVmaXg6IFJlY29yZFByZWZpeCB9KQogICAgYnl0ZWNfMiAvLyAibSIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjU2NAogICAgLy8gaWYgKCF0aGlzLnJlY29yZHMoaWQpLmV4aXN0cykgcmV0dXJuIHsgZXhpc3RzOiBmYWxzZSwgcmV2aXNpb246IDAsIHNpemU6IDAgfQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZWNvcmRJbmZvX2FmdGVyX2lmX2Vsc2VAMgogICAgcHVzaGJ5dGVzIDB4MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCnNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEucmVjb3JkSW5mb19hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjU2NQogICAgLy8gcmV0dXJuIHsgZXhpc3RzOiB0cnVlLCByZXZpc2lvbjogdGhpcy5jdXJyZW50UmVjb3JkUmV2aXNpb24oaWQpLCBzaXplOiB0aGlzLnJlY29yZHMoaWQpLmxlbmd0aCAtIFJlY29yZEhlYWRlckJ5dGVzIH0KICAgIHN3YXAKICAgIGNhbGxzdWIgY3VycmVudFJlY29yZFJldmlzaW9uCiAgICBzd2FwCiAgICBib3hfbGVuCiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgcHVzaGludCAxMgogICAgLQogICAgc3dhcAogICAgaXRvYgogICAgcHVzaGJ5dGVzIDB4ODAKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnJlYWRSZWNvcmQoYWNjb3VudDogYnl0ZXMsIGtleTogYnl0ZXMpIC0+IGJ5dGVzOgpzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnJlYWRSZWNvcmQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjU2OC01NjkKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgLy8gcmVhZFJlY29yZChhY2NvdW50OiBBY2NvdW50LCBrZXk6IGJ5dGVzKTogTWV0YVJlY29yZFJlYWQgewogICAgcHJvdG8gMiAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjU3MAogICAgLy8gY29uc3QgaW5mbyA9IHRoaXMucmVjb3JkSW5mbyhhY2NvdW50LCBrZXkpCiAgICBmcmFtZV9kaWcgLTIKICAgIGZyYW1lX2RpZyAtMQogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnJlY29yZEluZm8KICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1NzEKICAgIC8vIGlmICghaW5mby5leGlzdHMpIHJldHVybiB7IGV4aXN0czogZmFsc2UsIHJldmlzaW9uOiAwLCBkYXRhOiBCeXRlcygnJykgfQogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgYm56IHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEucmVhZFJlY29yZF9hZnRlcl9pZl9lbHNlQDIKICAgIHB1c2hieXRlcyAweDAwMDAwMDAwMDAwMDAwMDAwMDAwMGIwMDAwCiAgICBzd2FwCiAgICByZXRzdWIKCnNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEucmVhZFJlY29yZF9hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjU3MgogICAgLy8gbG9nZ2VkQXNzZXJ0KGluZm8uc2l6ZSA8PSBNYXhJbmxpbmVSZWNvcmRCeXRlcywgZXJyUmVjb3JkUmVxdWlyZXNTbGljZSkKICAgIHB1c2hpbnQgOQogICAgZXh0cmFjdF91aW50NjQKICAgIGludGMgNyAvLyAxMDI0CiAgICA8PQogICAgYm56IHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEucmVhZFJlY29yZF9hZnRlcl9hc3NlcnRANAogICAgcHVzaGJ5dGVzICJFUlI6ZXJyTXJzbCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJNcnNsCgpzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnJlYWRSZWNvcmRfYWZ0ZXJfYXNzZXJ0QDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjU3MwogICAgLy8gY29uc3QgcmVjb3JkID0gY2xvbmUodGhpcy5yZWNvcmRzKHRoaXMucmVjb3JkS2V5KGFjY291bnQsIGtleSkpLnZhbHVlKQogICAgZnJhbWVfZGlnIC0yCiAgICBmcmFtZV9kaWcgLTEKICAgIGNhbGxzdWIgcmVjb3JkS2V5CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjE1MwogICAgLy8gcmVjb3JkcyA9IEJveE1hcDxieXRlcywgTWV0YVJlY29yZFZhbHVlPih7IGtleVByZWZpeDogUmVjb3JkUHJlZml4IH0pCiAgICBieXRlY18yIC8vICJtIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjU3My01NzQKICAgIC8vIGNvbnN0IHJlY29yZCA9IGNsb25lKHRoaXMucmVjb3Jkcyh0aGlzLnJlY29yZEtleShhY2NvdW50LCBrZXkpKS52YWx1ZSkKICAgIC8vIHJldHVybiB7IGV4aXN0czogdHJ1ZSwgcmV2aXNpb246IHJlY29yZC5yZXZpc2lvbiwgZGF0YTogcmVjb3JkLmRhdGEgfQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgcHVzaGludCA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1NzQKICAgIC8vIHJldHVybiB7IGV4aXN0czogdHJ1ZSwgcmV2aXNpb246IHJlY29yZC5yZXZpc2lvbiwgZGF0YTogcmVjb3JkLmRhdGEgfQogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo1NzMtNTc0CiAgICAvLyBjb25zdCByZWNvcmQgPSBjbG9uZSh0aGlzLnJlY29yZHModGhpcy5yZWNvcmRLZXkoYWNjb3VudCwga2V5KSkudmFsdWUpCiAgICAvLyByZXR1cm4geyBleGlzdHM6IHRydWUsIHJldmlzaW9uOiByZWNvcmQucmV2aXNpb24sIGRhdGE6IHJlY29yZC5kYXRhIH0KICAgIGRpZyAxCiAgICBwdXNoaW50IDEwCiAgICBpbnRjXzIgLy8gMgogICAgYm94X2V4dHJhY3QKICAgIGJ0b2kKICAgIGludGNfMiAvLyAyCiAgICArCiAgICB1bmNvdmVyIDIKICAgIHB1c2hpbnQgMTAKICAgIHVuY292ZXIgMgogICAgYm94X2V4dHJhY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NTc0CiAgICAvLyByZXR1cm4geyBleGlzdHM6IHRydWUsIHJldmlzaW9uOiByZWNvcmQucmV2aXNpb24sIGRhdGE6IHJlY29yZC5kYXRhIH0KICAgIGV4dHJhY3QgMiAwCiAgICBzd2FwCiAgICBpdG9iCiAgICBwdXNoYnl0ZXMgMHg4MAogICAgc3dhcAogICAgY29uY2F0CiAgICBkaWcgMQogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgdW5jb3ZlciAyCiAgICBjb25jYXQKICAgIHN3YXAKICAgIHB1c2hieXRlcyAweDAwMGIKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnN0b3JlUmVjb3JkKHBheW1lbnQ6IHVpbnQ2NCwga2V5OiBieXRlcywgZGF0YTA6IGJ5dGVzLCBkYXRhMTogYnl0ZXMsIGRhdGEyOiBieXRlcywgZGF0YTM6IGJ5dGVzLCBleHBlY3RlZFJldmlzaW9uOiB1aW50NjQpIC0+IHVpbnQ2NDoKc3RvcmVSZWNvcmQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjYwNi02MTAKICAgIC8vIHByaXZhdGUgc3RvcmVSZWNvcmQoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwga2V5OiBieXRlcywKICAgIC8vICAgZGF0YTA6IGJ5dGVzLCBkYXRhMTogYnl0ZXMsIGRhdGEyOiBieXRlcywgZGF0YTM6IGJ5dGVzLAogICAgLy8gICBleHBlY3RlZFJldmlzaW9uOiB1aW50NjQsCiAgICAvLyApOiB1aW50NjQgewogICAgcHJvdG8gNyAxCiAgICBpbnRjXzAgLy8gMAogICAgYnl0ZWNfMSAvLyAiIgogICAgZHVwbiA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjYxMQogICAgLy8gY29uc3QgaWQgPSB0aGlzLnJlY29yZEtleShUeG4uc2VuZGVyLCBrZXkpCiAgICB0eG4gU2VuZGVyCiAgICBmcmFtZV9kaWcgLTYKICAgIGNhbGxzdWIgcmVjb3JkS2V5CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjYxMgogICAgLy8gbG9nZ2VkQXNzZXJ0KGRhdGEwLmxlbmd0aCA8PSBNYXhSZWNvcmRQYXJ0Qnl0ZXMgJiYgZGF0YTEubGVuZ3RoIDw9IE1heFJlY29yZFBhcnRCeXRlcyAmJgogICAgZnJhbWVfZGlnIC01CiAgICBsZW4KICAgIGR1cAogICAgY292ZXIgMgogICAgaW50YyA4IC8vIDQwOTQKICAgIDw9CiAgICBieiBzdG9yZVJlY29yZF9ib29sX2ZhbHNlQDUKICAgIGZyYW1lX2RpZyAtNAogICAgbGVuCiAgICBpbnRjIDggLy8gNDA5NAogICAgPD0KICAgIGJ6IHN0b3JlUmVjb3JkX2Jvb2xfZmFsc2VANQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2MTMKICAgIC8vIGRhdGEyLmxlbmd0aCA8PSBNYXhSZWNvcmRQYXJ0Qnl0ZXMgJiYgZGF0YTMubGVuZ3RoIDw9IE1heEZpbmFsUmVjb3JkUGFydEJ5dGVzLCBlcnJSZWNvcmRQYXJ0VG9vTGFyZ2UpCiAgICBmcmFtZV9kaWcgLTMKICAgIGxlbgogICAgaW50YyA4IC8vIDQwOTQKICAgIDw9CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjYxMi02MTMKICAgIC8vIGxvZ2dlZEFzc2VydChkYXRhMC5sZW5ndGggPD0gTWF4UmVjb3JkUGFydEJ5dGVzICYmIGRhdGExLmxlbmd0aCA8PSBNYXhSZWNvcmRQYXJ0Qnl0ZXMgJiYKICAgIC8vICAgZGF0YTIubGVuZ3RoIDw9IE1heFJlY29yZFBhcnRCeXRlcyAmJiBkYXRhMy5sZW5ndGggPD0gTWF4RmluYWxSZWNvcmRQYXJ0Qnl0ZXMsIGVyclJlY29yZFBhcnRUb29MYXJnZSkKICAgIGJ6IHN0b3JlUmVjb3JkX2Jvb2xfZmFsc2VANQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2MTMKICAgIC8vIGRhdGEyLmxlbmd0aCA8PSBNYXhSZWNvcmRQYXJ0Qnl0ZXMgJiYgZGF0YTMubGVuZ3RoIDw9IE1heEZpbmFsUmVjb3JkUGFydEJ5dGVzLCBlcnJSZWNvcmRQYXJ0VG9vTGFyZ2UpCiAgICBmcmFtZV9kaWcgLTIKICAgIGxlbgogICAgcHVzaGludCA0MDg0CiAgICA8PQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2MTItNjEzCiAgICAvLyBsb2dnZWRBc3NlcnQoZGF0YTAubGVuZ3RoIDw9IE1heFJlY29yZFBhcnRCeXRlcyAmJiBkYXRhMS5sZW5ndGggPD0gTWF4UmVjb3JkUGFydEJ5dGVzICYmCiAgICAvLyAgIGRhdGEyLmxlbmd0aCA8PSBNYXhSZWNvcmRQYXJ0Qnl0ZXMgJiYgZGF0YTMubGVuZ3RoIDw9IE1heEZpbmFsUmVjb3JkUGFydEJ5dGVzLCBlcnJSZWNvcmRQYXJ0VG9vTGFyZ2UpCiAgICBieiBzdG9yZVJlY29yZF9ib29sX2ZhbHNlQDUKICAgIGludGNfMSAvLyAxCgpzdG9yZVJlY29yZF9ib29sX21lcmdlQDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjYxMi02MTMKICAgIC8vIGxvZ2dlZEFzc2VydChkYXRhMC5sZW5ndGggPD0gTWF4UmVjb3JkUGFydEJ5dGVzICYmIGRhdGExLmxlbmd0aCA8PSBNYXhSZWNvcmRQYXJ0Qnl0ZXMgJiYKICAgIC8vICAgZGF0YTIubGVuZ3RoIDw9IE1heFJlY29yZFBhcnRCeXRlcyAmJiBkYXRhMy5sZW5ndGggPD0gTWF4RmluYWxSZWNvcmRQYXJ0Qnl0ZXMsIGVyclJlY29yZFBhcnRUb29MYXJnZSkKICAgIGJueiBzdG9yZVJlY29yZF9hZnRlcl9hc3NlcnRAOAogICAgcHVzaGJ5dGVzICJFUlI6ZXJyTXBydCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJNcHJ0CgpzdG9yZVJlY29yZF9hZnRlcl9hc3NlcnRAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NjE0CiAgICAvLyBjb25zdCBzaXplOiB1aW50NjQgPSBkYXRhMC5sZW5ndGggKyBkYXRhMS5sZW5ndGggKyBkYXRhMi5sZW5ndGggKyBkYXRhMy5sZW5ndGgKICAgIGZyYW1lX2RpZyAtNAogICAgbGVuCiAgICBkdXAKICAgIGZyYW1lX2J1cnkgNgogICAgZnJhbWVfZGlnIDgKICAgICsKICAgIGZyYW1lX2RpZyAtMwogICAgbGVuCiAgICBkdXAKICAgIGZyYW1lX2J1cnkgNwogICAgKwogICAgZnJhbWVfZGlnIC0yCiAgICBsZW4KICAgIGR1cAogICAgY292ZXIgMwogICAgKwogICAgZHVwCiAgICBmcmFtZV9idXJ5IDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NjE1CiAgICAvLyBsb2dnZWRBc3NlcnQoc2l6ZSArIFJlY29yZEFyZ3VtZW50Qnl0ZXMgKyBrZXkubGVuZ3RoIDw9IE1heEFwcENhbGxBcmd1bWVudEJ5dGVzLCBlcnJSZWNvcmRWYWx1ZVRvb0xhcmdlKQogICAgcHVzaGludCAyMgogICAgKwogICAgZnJhbWVfZGlnIC02CiAgICBsZW4KICAgICsKICAgIGludGMgMTAgLy8gMTYzODQKICAgIDw9CiAgICBibnogc3RvcmVSZWNvcmRfYWZ0ZXJfYXNzZXJ0QDEwCiAgICBieXRlYyAyNSAvLyAiRVJSOmVyck12c3oiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTXZzegoKc3RvcmVSZWNvcmRfYWZ0ZXJfYXNzZXJ0QDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2MTYKICAgIC8vIGxvZ2dlZEFzc2VydChleHBlY3RlZFJldmlzaW9uID09PSB0aGlzLmN1cnJlbnRSZWNvcmRSZXZpc2lvbihpZCksIGVyclJlY29yZFJldmlzaW9uTWlzbWF0Y2gpCiAgICBkdXAKICAgIGNhbGxzdWIgY3VycmVudFJlY29yZFJldmlzaW9uCiAgICBmcmFtZV9kaWcgLTEKICAgID09CiAgICBibnogc3RvcmVSZWNvcmRfYWZ0ZXJfYXNzZXJ0QDEyCiAgICBieXRlYyAxNSAvLyAiRVJSOmVyck1yZXYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTXJldgoKc3RvcmVSZWNvcmRfYWZ0ZXJfYXNzZXJ0QDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxNTMKICAgIC8vIHJlY29yZHMgPSBCb3hNYXA8Ynl0ZXMsIE1ldGFSZWNvcmRWYWx1ZT4oeyBrZXlQcmVmaXg6IFJlY29yZFByZWZpeCB9KQogICAgYnl0ZWNfMiAvLyAibSIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NjE3CiAgICAvLyBjb25zdCBleGlzdHMgPSB0aGlzLnJlY29yZHMoaWQpLmV4aXN0cwogICAgYm94X2xlbgogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2MTgKICAgIC8vIGxldCBwcmV2aW91c0Nvc3Q6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9idXJ5IDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NjE5CiAgICAvLyBpZiAoZXhpc3RzKSBwcmV2aW91c0Nvc3QgPSB0aGlzLnJlY29yZFN0b3JhZ2VDb3N0KGtleSwgdGhpcy5yZWNvcmRzKGlkKS5sZW5ndGggLSBSZWNvcmRIZWFkZXJCeXRlcykKICAgIGJ6IHN0b3JlUmVjb3JkX2FmdGVyX2lmX2Vsc2VAMTQKICAgIGZyYW1lX2RpZyAwCiAgICBib3hfbGVuCiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgcHVzaGludCAxMgogICAgLQogICAgZnJhbWVfZGlnIC02CiAgICBzd2FwCiAgICBjYWxsc3ViIHJlY29yZFN0b3JhZ2VDb3N0CiAgICBmcmFtZV9idXJ5IDIKCnN0b3JlUmVjb3JkX2FmdGVyX2lmX2Vsc2VAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjYyMAogICAgLy8gY29uc3QgbmV4dENvc3QgPSB0aGlzLnJlY29yZFN0b3JhZ2VDb3N0KGtleSwgc2l6ZSkKICAgIGZyYW1lX2RpZyAtNgogICAgZnJhbWVfZGlnIDQKICAgIGNhbGxzdWIgcmVjb3JkU3RvcmFnZUNvc3QKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2MjEKICAgIC8vIGNvbnN0IGR1ZTogdWludDY0ID0gbmV4dENvc3QgPiBwcmV2aW91c0Nvc3QgPyBuZXh0Q29zdCAtIHByZXZpb3VzQ29zdCA6IDAKICAgIGZyYW1lX2RpZyAyCiAgICA+CiAgICBieiBzdG9yZVJlY29yZF90ZXJuYXJ5X2ZhbHNlQDE2CiAgICBkdXAKICAgIGZyYW1lX2RpZyAyCiAgICAtCgpzdG9yZVJlY29yZF90ZXJuYXJ5X21lcmdlQDE3OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2MjQKICAgIC8vIGxldCBzcG9uc29yOiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfYnVyeSA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjYyNQogICAgLy8gaWYgKCFleGlzdHMpIHsKICAgIHVuY292ZXIgMgogICAgYm56IHN0b3JlUmVjb3JkX2Vsc2VfYm9keUAxOQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2MjYKICAgIC8vIHNwb25zb3IgPSBzcG9uc29yQ29zdChwYXltZW50LnNlbmRlciwgVHhuLnNlbmRlcikKICAgIGZyYW1lX2RpZyAtNwogICAgZ3R4bnMgU2VuZGVyCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwMQogICAgLy8gcmV0dXJuIHBheWVyID09PSBvd25lciA/IDAgOiBQYXllclJlY29yZE1CUgogICAgPT0KICAgIGludGMgNCAvLyAyODUwMAogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBmcmFtZV9idXJ5IDUKCnN0b3JlUmVjb3JkX2FmdGVyX2lmX2Vsc2VAMjQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjYzMAogICAgLy8gdGhpcy5yZXF1aXJlUmVjb3JkUGF5bWVudChwYXltZW50LCBkdWUgKyBzcG9uc29yKQogICAgZnJhbWVfZGlnIDUKICAgICsKICAgIGZyYW1lX2J1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyMDUKICAgIC8vIHBheW1lbnQuZ3JvdXBJbmRleCArIDEgPT09IFR4bi5ncm91cEluZGV4ICYmCiAgICBmcmFtZV9kaWcgLTcKICAgIGd0eG5zIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICArCiAgICB0eG4gR3JvdXBJbmRleAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MjA1LTIwNgogICAgLy8gcGF5bWVudC5ncm91cEluZGV4ICsgMSA9PT0gVHhuLmdyb3VwSW5kZXggJiYKICAgIC8vICAgcGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MgJiYKICAgIGJ6IHN0b3JlUmVjb3JkX2Jvb2xfZmFsc2VANTEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MjA2CiAgICAvLyBwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcyAmJgogICAgZnJhbWVfZGlnIC03CiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjIwNS0yMDYKICAgIC8vIHBheW1lbnQuZ3JvdXBJbmRleCArIDEgPT09IFR4bi5ncm91cEluZGV4ICYmCiAgICAvLyAgIHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzICYmCiAgICBieiBzdG9yZVJlY29yZF9ib29sX2ZhbHNlQDUxCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjIwNwogICAgLy8gcGF5bWVudC5hbW91bnQgPT09IGFtb3VudCAmJgogICAgZnJhbWVfZGlnIC03CiAgICBndHhucyBBbW91bnQKICAgIGZyYW1lX2RpZyAxCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyMDUtMjA3CiAgICAvLyBwYXltZW50Lmdyb3VwSW5kZXggKyAxID09PSBUeG4uZ3JvdXBJbmRleCAmJgogICAgLy8gICBwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcyAmJgogICAgLy8gICBwYXltZW50LmFtb3VudCA9PT0gYW1vdW50ICYmCiAgICBieiBzdG9yZVJlY29yZF9ib29sX2ZhbHNlQDUxCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjIwOAogICAgLy8gcGF5bWVudC5jbG9zZVJlbWFpbmRlclRvID09PSBHbG9iYWwuemVyb0FkZHJlc3MgJiYKICAgIGZyYW1lX2RpZyAtNwogICAgZ3R4bnMgQ2xvc2VSZW1haW5kZXJUbwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyMDUtMjA4CiAgICAvLyBwYXltZW50Lmdyb3VwSW5kZXggKyAxID09PSBUeG4uZ3JvdXBJbmRleCAmJgogICAgLy8gICBwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcyAmJgogICAgLy8gICBwYXltZW50LmFtb3VudCA9PT0gYW1vdW50ICYmCiAgICAvLyAgIHBheW1lbnQuY2xvc2VSZW1haW5kZXJUbyA9PT0gR2xvYmFsLnplcm9BZGRyZXNzICYmCiAgICBieiBzdG9yZVJlY29yZF9ib29sX2ZhbHNlQDUxCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjIwOQogICAgLy8gcGF5bWVudC5yZWtleVRvID09PSBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICBmcmFtZV9kaWcgLTcKICAgIGd0eG5zIFJla2V5VG8KICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MjA1LTIwOQogICAgLy8gcGF5bWVudC5ncm91cEluZGV4ICsgMSA9PT0gVHhuLmdyb3VwSW5kZXggJiYKICAgIC8vICAgcGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MgJiYKICAgIC8vICAgcGF5bWVudC5hbW91bnQgPT09IGFtb3VudCAmJgogICAgLy8gICBwYXltZW50LmNsb3NlUmVtYWluZGVyVG8gPT09IEdsb2JhbC56ZXJvQWRkcmVzcyAmJgogICAgLy8gICBwYXltZW50LnJla2V5VG8gPT09IEdsb2JhbC56ZXJvQWRkcmVzcywKICAgIGJ6IHN0b3JlUmVjb3JkX2Jvb2xfZmFsc2VANTEKICAgIGludGNfMSAvLyAxCgpzdG9yZVJlY29yZF9ib29sX21lcmdlQDUyOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoyMDQtMjExCiAgICAvLyBsb2dnZWRBc3NlcnQoCiAgICAvLyAgIHBheW1lbnQuZ3JvdXBJbmRleCArIDEgPT09IFR4bi5ncm91cEluZGV4ICYmCiAgICAvLyAgICAgcGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MgJiYKICAgIC8vICAgICBwYXltZW50LmFtb3VudCA9PT0gYW1vdW50ICYmCiAgICAvLyAgICAgcGF5bWVudC5jbG9zZVJlbWFpbmRlclRvID09PSBHbG9iYWwuemVyb0FkZHJlc3MgJiYKICAgIC8vICAgICBwYXltZW50LnJla2V5VG8gPT09IEdsb2JhbC56ZXJvQWRkcmVzcywKICAgIC8vICAgZXJySW52YWxpZFJlY29yZFBheW1lbnQsCiAgICAvLyApCiAgICBibnogc3RvcmVSZWNvcmRfYWZ0ZXJfYXNzZXJ0QDU0CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJNcG10IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck1wbXQKCnN0b3JlUmVjb3JkX2FmdGVyX2Fzc2VydEA1NDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NjMxCiAgICAvLyBjb25zdCByZXZpc2lvbiA9IHRoaXMud3JpdGVSZWNvcmQoa2V5LCBkYXRhMykKICAgIGZyYW1lX2RpZyAtNgogICAgZnJhbWVfZGlnIC0yCiAgICBjYWxsc3ViIHdyaXRlUmVjb3JkCiAgICBmcmFtZV9idXJ5IDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NjMyCiAgICAvLyBpZiAoc3BvbnNvciA+IDApIHJlY29yZFBheWVyKHRoaXMucmVjb3JkcyhpZCkua2V5LCBwYXltZW50LnNlbmRlciwgVHhuLnNlbmRlcikKICAgIGZyYW1lX2RpZyA1CiAgICBieiBzdG9yZVJlY29yZF9hZnRlcl9pZl9lbHNlQDI2CiAgICBmcmFtZV9kaWcgLTcKICAgIGd0eG5zIFNlbmRlcgogICAgdHhuIFNlbmRlcgogICAgZnJhbWVfZGlnIDAKICAgIGNvdmVyIDIKICAgIGNhbGxzdWIgcmVjb3JkUGF5ZXIKCnN0b3JlUmVjb3JkX2FmdGVyX2lmX2Vsc2VAMjY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjYzMwogICAgLy8gaWYgKHNpemUgPiBkYXRhMy5sZW5ndGgpIHsKICAgIGZyYW1lX2RpZyA0CiAgICB1bmNvdmVyIDIKICAgID4KICAgIGJ6IHN0b3JlUmVjb3JkX2FmdGVyX2lmX2Vsc2VAMzQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NjM0CiAgICAvLyB0aGlzLnJlY29yZHMoaWQpLnJlc2l6ZShSZWNvcmRIZWFkZXJCeXRlcyArIHNpemUpCiAgICBwdXNoaW50IDEyCiAgICBmcmFtZV9kaWcgNAogICAgZHVwCiAgICBjb3ZlciAyCiAgICArCiAgICBmcmFtZV9kaWcgMAogICAgZHVwCiAgICBjb3ZlciAzCiAgICBzd2FwCiAgICBib3hfcmVzaXplCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjYzNwogICAgLy8gdGhpcy5yZWNvcmRzKGlkKS5yZXBsYWNlKFJlY29yZEhlYWRlckJ5dGVzIC0gMiwgbmV3IFVpbnQxNihzaXplKS5ieXRlcykKICAgIGl0b2IKICAgIGR1cAogICAgYml0bGVuCiAgICBwdXNoaW50IDE2CiAgICA8PQogICAgYXNzZXJ0IC8vIG92ZXJmbG93CiAgICBleHRyYWN0IDYgMgogICAgcHVzaGludCAxMAogICAgc3dhcAogICAgYm94X3JlcGxhY2UKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NjM4CiAgICAvLyBpZiAoZGF0YTIubGVuZ3RoID4gMCkgdGhpcy5yZWNvcmRzKGlkKS5zcGxpY2UoUmVjb3JkSGVhZGVyQnl0ZXMsIDAsIGRhdGEyKQogICAgZnJhbWVfZGlnIDcKICAgIGJ6IHN0b3JlUmVjb3JkX2FmdGVyX2lmX2Vsc2VAMjkKICAgIGZyYW1lX2RpZyAwCiAgICBwdXNoaW50IDEyCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfZGlnIC0zCiAgICBib3hfc3BsaWNlCgpzdG9yZVJlY29yZF9hZnRlcl9pZl9lbHNlQDI5OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2MzkKICAgIC8vIGlmIChkYXRhMS5sZW5ndGggPiAwKSB0aGlzLnJlY29yZHMoaWQpLnNwbGljZShSZWNvcmRIZWFkZXJCeXRlcywgMCwgZGF0YTEpCiAgICBmcmFtZV9kaWcgNgogICAgYnogc3RvcmVSZWNvcmRfYWZ0ZXJfaWZfZWxzZUAzMQogICAgZnJhbWVfZGlnIDAKICAgIHB1c2hpbnQgMTIKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9kaWcgLTQKICAgIGJveF9zcGxpY2UKCnN0b3JlUmVjb3JkX2FmdGVyX2lmX2Vsc2VAMzE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjY0MAogICAgLy8gaWYgKGRhdGEwLmxlbmd0aCA+IDApIHRoaXMucmVjb3JkcyhpZCkuc3BsaWNlKFJlY29yZEhlYWRlckJ5dGVzLCAwLCBkYXRhMCkKICAgIGZyYW1lX2RpZyA4CiAgICBieiBzdG9yZVJlY29yZF9hZnRlcl9pZl9lbHNlQDM0CiAgICBmcmFtZV9kaWcgMAogICAgcHVzaGludCAxMgogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2RpZyAtNQogICAgYm94X3NwbGljZQoKc3RvcmVSZWNvcmRfYWZ0ZXJfaWZfZWxzZUAzNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NjQyCiAgICAvLyB0aGlzLnJlZnVuZFJlY29yZCh0aGlzLnJlY29yZHMoaWQpLmtleSwgcHJldmlvdXNDb3N0ID4gbmV4dENvc3QgPyBwcmV2aW91c0Nvc3QgLSBuZXh0Q29zdCA6IDApCiAgICBmcmFtZV9kaWcgMgogICAgZGlnIDEKICAgID4KICAgIGJ6IHN0b3JlUmVjb3JkX3Rlcm5hcnlfZmFsc2VAMzYKICAgIGZyYW1lX2RpZyAyCiAgICBzd2FwCiAgICAtCiAgICBmcmFtZV9idXJ5IDEKCnN0b3JlUmVjb3JkX3Rlcm5hcnlfbWVyZ2VAMzc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjE5MQogICAgLy8gaWYgKGFtb3VudCA9PT0gMCkgcmV0dXJuCiAgICBmcmFtZV9kaWcgMQogICAgYnogc3RvcmVSZWNvcmRfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnJlZnVuZFJlY29yZEA0NAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxOTIKICAgIC8vIGNvbnN0IHBheWVyID0gcGF5ZXJPZihib3gsIFR4bi5zZW5kZXIpCiAgICBmcmFtZV9kaWcgMAogICAgdHhuIFNlbmRlcgogICAgY2FsbHN1YiBwYXllck9mCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTk0CiAgICAvLyBpdHhuLnBheW1lbnQoeyByZWNlaXZlcjogY2FuUmVjZWl2ZUFsZ28ocGF5ZXIsIGFtb3VudCkgPyBwYXllciA6IFR4bi5zZW5kZXIsIGFtb3VudCwgZmVlOiAwIH0pLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICBmcmFtZV9kaWcgMQogICAgY2FsbHN1YiBjYW5SZWNlaXZlQWxnbwogICAgYnogc3RvcmVSZWNvcmRfdGVybmFyeV9mYWxzZUA0MgoKc3RvcmVSZWNvcmRfdGVybmFyeV9tZXJnZUA0MzoKICAgIGZyYW1lX2RpZyAxCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czoxOTQKICAgIC8vIGl0eG4ucGF5bWVudCh7IHJlY2VpdmVyOiBjYW5SZWNlaXZlQWxnbyhwYXllciwgYW1vdW50KSA/IHBheWVyIDogVHhuLnNlbmRlciwgYW1vdW50LCBmZWU6IDAgfSkuc3VibWl0KCkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CgpzdG9yZVJlY29yZF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEucmVmdW5kUmVjb3JkQDQ0OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2NDMKICAgIC8vIHJldHVybiByZXZpc2lvbgogICAgZnJhbWVfZGlnIDMKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpzdG9yZVJlY29yZF90ZXJuYXJ5X2ZhbHNlQDQyOgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjE5NAogICAgLy8gaXR4bi5wYXltZW50KHsgcmVjZWl2ZXI6IGNhblJlY2VpdmVBbGdvKHBheWVyLCBhbW91bnQpID8gcGF5ZXIgOiBUeG4uc2VuZGVyLCBhbW91bnQsIGZlZTogMCB9KS5zdWJtaXQoKQogICAgdHhuIFNlbmRlcgogICAgYiBzdG9yZVJlY29yZF90ZXJuYXJ5X21lcmdlQDQzCgpzdG9yZVJlY29yZF90ZXJuYXJ5X2ZhbHNlQDM2OgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjY0MgogICAgLy8gdGhpcy5yZWZ1bmRSZWNvcmQodGhpcy5yZWNvcmRzKGlkKS5rZXksIHByZXZpb3VzQ29zdCA+IG5leHRDb3N0ID8gcHJldmlvdXNDb3N0IC0gbmV4dENvc3QgOiAwKQogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2J1cnkgMQogICAgYiBzdG9yZVJlY29yZF90ZXJuYXJ5X21lcmdlQDM3CgpzdG9yZVJlY29yZF9ib29sX2ZhbHNlQDUxOgogICAgaW50Y18wIC8vIDAKICAgIGIgc3RvcmVSZWNvcmRfYm9vbF9tZXJnZUA1MgoKc3RvcmVSZWNvcmRfZWxzZV9ib2R5QDE5OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2MjcKICAgIC8vIH0gZWxzZSBpZiAoZHVlID4gMCkgewogICAgZHVwCiAgICBieiBzdG9yZVJlY29yZF9hZnRlcl9pZl9lbHNlQDI0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjYyOAogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuc2VuZGVyID09PSBwYXllck9mKHRoaXMucmVjb3JkcyhpZCkua2V5LCBUeG4uc2VuZGVyKSwgZXJyUGF5ZXJPbmx5KQogICAgZnJhbWVfZGlnIC03CiAgICBndHhucyBTZW5kZXIKICAgIGZyYW1lX2RpZyAwCiAgICB0eG4gU2VuZGVyCiAgICBjYWxsc3ViIHBheWVyT2YKICAgID09CiAgICBibnogc3RvcmVSZWNvcmRfYWZ0ZXJfaWZfZWxzZUAyNAogICAgcHVzaGJ5dGVzICJFUlI6ZXJySXB5ciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcHlyCgpzdG9yZVJlY29yZF90ZXJuYXJ5X2ZhbHNlQDE2OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2MjEKICAgIC8vIGNvbnN0IGR1ZTogdWludDY0ID0gbmV4dENvc3QgPiBwcmV2aW91c0Nvc3QgPyBuZXh0Q29zdCAtIHByZXZpb3VzQ29zdCA6IDAKICAgIGludGNfMCAvLyAwCiAgICBiIHN0b3JlUmVjb3JkX3Rlcm5hcnlfbWVyZ2VAMTcKCnN0b3JlUmVjb3JkX2Jvb2xfZmFsc2VANToKICAgIGludGNfMCAvLyAwCiAgICBiIHN0b3JlUmVjb3JkX2Jvb2xfbWVyZ2VANgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEucmVtb3ZlUmVjb3JkKGtleTogYnl0ZXMsIGV4cGVjdGVkUmV2aXNpb246IHVpbnQ2NCkgLT4gdWludDY0OgpzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjpNZXRhLnJlbW92ZVJlY29yZDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NjQ2CiAgICAvLyByZW1vdmVSZWNvcmQoa2V5OiBieXRlcywgZXhwZWN0ZWRSZXZpc2lvbjogdWludDY0KTogdWludDY0IHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2NDcKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5pc1BvbGljeUtleShrZXkpLCBlcnJQb2xpY3lLZXkpCiAgICBmcmFtZV9kaWcgLTIKICAgIGNhbGxzdWIgaXNQb2xpY3lLZXkKICAgIGJ6IHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEucmVtb3ZlUmVjb3JkX2FmdGVyX2Fzc2VydEAyCiAgICBieXRlYyAyNiAvLyAiRVJSOmVyck1wa3kiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTXBreQoKc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZW1vdmVSZWNvcmRfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjY0OAogICAgLy8gdGhpcy5kcm9wUmVjb3JkKGtleSwgZXhwZWN0ZWRSZXZpc2lvbikKICAgIGZyYW1lX2RpZyAtMgogICAgZnJhbWVfZGlnIC0xCiAgICBjYWxsc3ViIGRyb3BSZWNvcmQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NjQ5CiAgICAvLyByZXR1cm4gMAogICAgaW50Y18wIC8vIDAKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGEuZHJvcFJlY29yZChrZXk6IGJ5dGVzLCBleHBlY3RlZFJldmlzaW9uOiB1aW50NjQpIC0+IHZvaWQ6CmRyb3BSZWNvcmQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjY1MgogICAgLy8gcHJpdmF0ZSBkcm9wUmVjb3JkKGtleTogYnl0ZXMsIGV4cGVjdGVkUmV2aXNpb246IHVpbnQ2NCk6IHZvaWQgewogICAgcHJvdG8gMiAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjY1MwogICAgLy8gY29uc3QgaWQgPSB0aGlzLnJlY29yZEtleShUeG4uc2VuZGVyLCBrZXkpCiAgICB0eG4gU2VuZGVyCiAgICBmcmFtZV9kaWcgLTIKICAgIGNhbGxzdWIgcmVjb3JkS2V5CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6MTUzCiAgICAvLyByZWNvcmRzID0gQm94TWFwPGJ5dGVzLCBNZXRhUmVjb3JkVmFsdWU+KHsga2V5UHJlZml4OiBSZWNvcmRQcmVmaXggfSkKICAgIGJ5dGVjXzIgLy8gIm0iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2NTQKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnJlY29yZHMoaWQpLmV4aXN0cywgZXJyUmVjb3JkTm90Rm91bmQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBkcm9wUmVjb3JkX2FmdGVyX2Fzc2VydEAyCiAgICBieXRlYyAyNCAvLyAiRVJSOmVyck1ybmYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTXJuZgoKZHJvcFJlY29yZF9hZnRlcl9hc3NlcnRAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NjU1CiAgICAvLyBsb2dnZWRBc3NlcnQoZXhwZWN0ZWRSZXZpc2lvbiA9PT0gdGhpcy5jdXJyZW50UmVjb3JkUmV2aXNpb24oaWQpLCBlcnJSZWNvcmRSZXZpc2lvbk1pc21hdGNoKQogICAgc3dhcAogICAgY2FsbHN1YiBjdXJyZW50UmVjb3JkUmV2aXNpb24KICAgIGZyYW1lX2RpZyAtMQogICAgPT0KICAgIGJueiBkcm9wUmVjb3JkX2FmdGVyX2Fzc2VydEA0CiAgICBieXRlYyAxNSAvLyAiRVJSOmVyck1yZXYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTXJldgoKZHJvcFJlY29yZF9hZnRlcl9hc3NlcnRANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NjU2CiAgICAvLyBjb25zdCByZWZ1bmQgPSB0aGlzLnJlY29yZFN0b3JhZ2VDb3N0KGtleSwgdGhpcy5yZWNvcmRzKGlkKS5sZW5ndGggLSBSZWNvcmRIZWFkZXJCeXRlcykKICAgIGR1cAogICAgYm94X2xlbgogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIHB1c2hpbnQgMTIKICAgIC0KICAgIGZyYW1lX2RpZyAtMgogICAgc3dhcAogICAgY2FsbHN1YiByZWNvcmRTdG9yYWdlQ29zdAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2NTcKICAgIC8vIHRoaXMucmVjb3JkcyhpZCkuZGVsZXRlKCkKICAgIGRpZyAxCiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NjU4CiAgICAvLyB0aGlzLnJlbGVhc2VSZWNvcmQodGhpcy5yZWNvcmRzKGlkKS5rZXksIHJlZnVuZCkKICAgIGNhbGxzdWIgcmVsZWFzZVJlY29yZAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5pc1BvbGljeUtleShrZXk6IGJ5dGVzKSAtPiB1aW50NjQ6CmlzUG9saWN5S2V5OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2NjMKICAgIC8vIHByaXZhdGUgaXNQb2xpY3lLZXkoa2V5OiBieXRlcyk6IGJvb2xlYW4gewogICAgcHJvdG8gMSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjY2NAogICAgLy8gcmV0dXJuIGtleS5sZW5ndGggPiAwICYmIGtleS5sZW5ndGggPD0gTWF4UmVjb3JkS2V5Qnl0ZXMgJiYgb3AuZ2V0Qnl0ZShrZXksIDApID09PSBQb2xpY3lSZWNvcmRLZXlQcmVmaXgKICAgIGZyYW1lX2RpZyAtMQogICAgbGVuCiAgICBkdXAKICAgIGJ6IGlzUG9saWN5S2V5X2Jvb2xfZmFsc2VANAogICAgZnJhbWVfZGlnIDAKICAgIHB1c2hpbnQgMzEKICAgIDw9CiAgICBieiBpc1BvbGljeUtleV9ib29sX2ZhbHNlQDQKICAgIGZyYW1lX2RpZyAtMQogICAgaW50Y18wIC8vIDAKICAgIGdldGJ5dGUKICAgIGJueiBpc1BvbGljeUtleV9ib29sX2ZhbHNlQDQKICAgIGludGNfMSAvLyAxCgppc1BvbGljeUtleV9ib29sX21lcmdlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjY2NAogICAgLy8gcmV0dXJuIGtleS5sZW5ndGggPiAwICYmIGtleS5sZW5ndGggPD0gTWF4UmVjb3JkS2V5Qnl0ZXMgJiYgb3AuZ2V0Qnl0ZShrZXksIDApID09PSBQb2xpY3lSZWNvcmRLZXlQcmVmaXgKICAgIHN3YXAKICAgIHJldHN1YgoKaXNQb2xpY3lLZXlfYm9vbF9mYWxzZUA0OgogICAgaW50Y18wIC8vIDAKICAgIGIgaXNQb2xpY3lLZXlfYm9vbF9tZXJnZUA1CgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo6TWV0YS5yZXF1aXJlUG9saWN5V2luZG93KHdhbGxldDogdWludDY0LCBrZXk6IGJ5dGVzKSAtPiB2b2lkOgpyZXF1aXJlUG9saWN5V2luZG93OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2NzQKICAgIC8vIHByaXZhdGUgcmVxdWlyZVBvbGljeVdpbmRvdyh3YWxsZXQ6IEFwcGxpY2F0aW9uLCBrZXk6IGJ5dGVzKTogdm9pZCB7CiAgICBwcm90byAyIDAKICAgIGludGNfMCAvLyAwCiAgICBkdXBuIDQKICAgIGJ5dGVjXzEgLy8gIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6Njc1CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5pc1BvbGljeUtleShrZXkpLCBlcnJOb3RQb2xpY3lLZXkpCiAgICBmcmFtZV9kaWcgLTEKICAgIGNhbGxzdWIgaXNQb2xpY3lLZXkKICAgIGJueiByZXF1aXJlUG9saWN5V2luZG93X2FmdGVyX2Fzc2VydEAyCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJNbnBrIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck1ucGsKCnJlcXVpcmVQb2xpY3lXaW5kb3dfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjY3NgogICAgLy8gY29uc3Qgd3JpdGVyID0gdGhpcy5wb2xpY3lXcml0ZXIudmFsdWUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjE0NAogICAgLy8gcG9saWN5V3JpdGVyID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBNZXRhR2xvYmFsU3RhdGVLZXlQb2xpY3lXcml0ZXIgfSkKICAgIGJ5dGVjIDYgLy8gInBvbGljeV93cml0ZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjY3NgogICAgLy8gY29uc3Qgd3JpdGVyID0gdGhpcy5wb2xpY3lXcml0ZXIudmFsdWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBzd2FwCiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2NzcKICAgIC8vIGxvZ2dlZEFzc2VydCh3cml0ZXIuaWQgIT09IDAgJiYgR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uSWQgPT09IHdyaXRlci5pZCwgZXJyUG9saWN5V3JpdGVyKQogICAgYnogcmVxdWlyZVBvbGljeVdpbmRvd19ib29sX2ZhbHNlQDUKICAgIGdsb2JhbCBDYWxsZXJBcHBsaWNhdGlvbklECiAgICBkaWcgMQogICAgPT0KICAgIGJ6IHJlcXVpcmVQb2xpY3lXaW5kb3dfYm9vbF9mYWxzZUA1CiAgICBpbnRjXzEgLy8gMQoKcmVxdWlyZVBvbGljeVdpbmRvd19ib29sX21lcmdlQDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjY3NwogICAgLy8gbG9nZ2VkQXNzZXJ0KHdyaXRlci5pZCAhPT0gMCAmJiBHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25JZCA9PT0gd3JpdGVyLmlkLCBlcnJQb2xpY3lXcml0ZXIpCiAgICBibnogcmVxdWlyZVBvbGljeVdpbmRvd19hZnRlcl9hc3NlcnRAOAogICAgcHVzaGJ5dGVzICJFUlI6ZXJyTXB3ciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJNcHdyCgpyZXF1aXJlUG9saWN5V2luZG93X2FmdGVyX2Fzc2VydEA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2NzgKICAgIC8vIGNvbnN0IFtjb250cm9sbGVkXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKHdhbGxldCwgQnl0ZXMoQWJzdHJhY3RBY2NvdW50R2xvYmFsU3RhdGVLZXlzQ29udHJvbGxlZEFkZHJlc3MpKQogICAgZnJhbWVfZGlnIC0yCiAgICBwdXNoYnl0ZXMgImNvbnRyb2xsZWRfYWRkcmVzcyIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIGZyYW1lX2J1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2NzkKICAgIC8vIGNvbnN0IFtzcGVuZGluZ10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyh3YWxsZXQsIEJ5dGVzKEFic3RyYWN0QWNjb3VudEdsb2JhbFN0YXRlS2V5c1NwZW5kaW5nQWRkcmVzcykpCiAgICBmcmFtZV9kaWcgLTIKICAgIHB1c2hieXRlcyAic3BlbmRpbmdfYWRkcmVzcyIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIGZyYW1lX2J1cnkgNAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2ODAKICAgIC8vIGNvbnN0IFtjdXJyZW50LCBleGlzdHNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMod2FsbGV0LCBCeXRlcyhBYnN0cmFjdEFjY291bnRHbG9iYWxTdGF0ZUtleXNDdXJyZW50UGx1Z2luKSkKICAgIGZyYW1lX2RpZyAtMgogICAgcHVzaGJ5dGVzICJjdXJyZW50X3BsdWdpbiIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBzd2FwCiAgICBmcmFtZV9idXJ5IDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NjgxCiAgICAvLyBsb2dnZWRBc3NlcnQoZXhpc3RzICYmIFR4bi5zZW5kZXIuYnl0ZXMgPT09IGNvbnRyb2xsZWQgJiYgVHhuLnNlbmRlci5ieXRlcyA9PT0gc3BlbmRpbmcsIGVyclBvbGljeVdpbmRvdykKICAgIGJ6IHJlcXVpcmVQb2xpY3lXaW5kb3dfYm9vbF9mYWxzZUAxMgogICAgdHhuIFNlbmRlcgogICAgZnJhbWVfZGlnIDEKICAgID09CiAgICBieiByZXF1aXJlUG9saWN5V2luZG93X2Jvb2xfZmFsc2VAMTIKICAgIHR4biBTZW5kZXIKICAgIGZyYW1lX2RpZyA0CiAgICA9PQogICAgYnogcmVxdWlyZVBvbGljeVdpbmRvd19ib29sX2ZhbHNlQDEyCiAgICBpbnRjXzEgLy8gMQoKcmVxdWlyZVBvbGljeVdpbmRvd19ib29sX21lcmdlQDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEvY29udHJhY3QuYWxnby50czo2ODEKICAgIC8vIGxvZ2dlZEFzc2VydChleGlzdHMgJiYgVHhuLnNlbmRlci5ieXRlcyA9PT0gY29udHJvbGxlZCAmJiBUeG4uc2VuZGVyLmJ5dGVzID09PSBzcGVuZGluZywgZXJyUG9saWN5V2luZG93KQogICAgYm56IHJlcXVpcmVQb2xpY3lXaW5kb3dfYWZ0ZXJfYXNzZXJ0QDE1CiAgICBieXRlYyAyOCAvLyAiRVJSOmVyck1wd24iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTXB3bgoKcmVxdWlyZVBvbGljeVdpbmRvd19hZnRlcl9hc3NlcnRAMTU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjY4MwogICAgLy8gbG9nZ2VkQXNzZXJ0KGdyYW50LnBsdWdpbiA9PT0gd3JpdGVyLmlkICYmIGlzQWRtaW5BcHByb3ZlZCh3YWxsZXQsIGdyYW50KSwgZXJyUG9saWN5V2luZG93KQogICAgZnJhbWVfZGlnIDIKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBmcmFtZV9idXJ5IDUKICAgID09CiAgICBieiByZXF1aXJlUG9saWN5V2luZG93X2Jvb2xfZmFsc2VAMTgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9ncmFudC1wb2xpY3kudHM6NjAKICAgIC8vIGlmIChrZXkuZXNjcm93ICE9PSAnJykgcmV0dXJuIGZhbHNlCiAgICBmcmFtZV9kaWcgMgogICAgZHVwCiAgICBwdXNoaW50IDQwCiAgICBleHRyYWN0X3VpbnQxNgogICAgZGlnIDEKICAgIGxlbgogICAgc3Vic3RyaW5nMwogICAgZXh0cmFjdCAyIDAKICAgIGR1cAogICAgZnJhbWVfYnVyeSAzCiAgICBieXRlY18xIC8vICIiCiAgICAhPQogICAgYnogcmVxdWlyZVBvbGljeVdpbmRvd19hZnRlcl9pZl9lbHNlQDI0CiAgICBpbnRjXzAgLy8gMAoKcmVxdWlyZVBvbGljeVdpbmRvd19hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9ncmFudC1wb2xpY3kudHM6OmlzQWRtaW5BcHByb3ZlZEAzNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NjgzCiAgICAvLyBsb2dnZWRBc3NlcnQoZ3JhbnQucGx1Z2luID09PSB3cml0ZXIuaWQgJiYgaXNBZG1pbkFwcHJvdmVkKHdhbGxldCwgZ3JhbnQpLCBlcnJQb2xpY3lXaW5kb3cpCiAgICBieiByZXF1aXJlUG9saWN5V2luZG93X2Jvb2xfZmFsc2VAMTgKICAgIGludGNfMSAvLyAxCgpyZXF1aXJlUG9saWN5V2luZG93X2Jvb2xfbWVyZ2VAMTk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjY4MwogICAgLy8gbG9nZ2VkQXNzZXJ0KGdyYW50LnBsdWdpbiA9PT0gd3JpdGVyLmlkICYmIGlzQWRtaW5BcHByb3ZlZCh3YWxsZXQsIGdyYW50KSwgZXJyUG9saWN5V2luZG93KQogICAgYm56IHJlcXVpcmVQb2xpY3lXaW5kb3dfYWZ0ZXJfYXNzZXJ0QDIxCiAgICBieXRlYyAyOCAvLyAiRVJSOmVyck1wd24iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTXB3bgoKcmVxdWlyZVBvbGljeVdpbmRvd19hZnRlcl9hc3NlcnRAMjE6CiAgICByZXRzdWIKCnJlcXVpcmVQb2xpY3lXaW5kb3dfYm9vbF9mYWxzZUAxODoKICAgIGludGNfMCAvLyAwCiAgICBiIHJlcXVpcmVQb2xpY3lXaW5kb3dfYm9vbF9tZXJnZUAxOQoKcmVxdWlyZVBvbGljeVdpbmRvd19hZnRlcl9pZl9lbHNlQDI0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2dyYW50LXBvbGljeS50czo2MQogICAgLy8gaWYgKGtleS5jYWxsZXIgPT09IHdhbGxldC5hZGRyZXNzKSByZXR1cm4gdHJ1ZQogICAgZnJhbWVfZGlnIDIKICAgIGV4dHJhY3QgOCAzMgogICAgZHVwCiAgICBmcmFtZV9idXJ5IDAKICAgIGZyYW1lX2RpZyAtMgogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGJ6IHJlcXVpcmVQb2xpY3lXaW5kb3dfYWZ0ZXJfaWZfZWxzZUAyNgogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NjgzCiAgICAvLyBsb2dnZWRBc3NlcnQoZ3JhbnQucGx1Z2luID09PSB3cml0ZXIuaWQgJiYgaXNBZG1pbkFwcHJvdmVkKHdhbGxldCwgZ3JhbnQpLCBlcnJQb2xpY3lXaW5kb3cpCiAgICBiIHJlcXVpcmVQb2xpY3lXaW5kb3dfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZ3JhbnQtcG9saWN5LnRzOjppc0FkbWluQXBwcm92ZWRAMzQKCnJlcXVpcmVQb2xpY3lXaW5kb3dfYWZ0ZXJfaWZfZWxzZUAyNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9ncmFudC1wb2xpY3kudHM6NjIKICAgIC8vIHJldHVybiBrZXkuY2FsbGVyID09PSBHbG9iYWwuemVyb0FkZHJlc3MgJiYgZ3JhbnRJbmZvKHdhbGxldCwga2V5LnBsdWdpbiwga2V5LmNhbGxlciwga2V5LmVzY3JvdykudXNlRXhlY3V0aW9uS2V5CiAgICBmcmFtZV9kaWcgMAogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYnogcmVxdWlyZVBvbGljeVdpbmRvd19ib29sX2ZhbHNlQDMyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZ3JhbnQtcG9saWN5LnRzOjM4LTQyCiAgICAvLyBjb25zdCBpbmZvcyA9IGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9nZXRQbHVnaW5zPih7CiAgICAvLyAgIGFwcElkOiB3YWxsZXQsCiAgICAvLyAgIGFyZ3M6IFtbeyBwbHVnaW4sIGNhbGxlciwgZXNjcm93IH1dXSwKICAgIC8vICAgZmVlOiAwLAogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9ncmFudC1wb2xpY3kudHM6NDAKICAgIC8vIGFyZ3M6IFtbeyBwbHVnaW4sIGNhbGxlciwgZXNjcm93IH1dXSwKICAgIGZyYW1lX2RpZyA1CiAgICBpdG9iCiAgICBmcmFtZV9kaWcgMAogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgMwogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIHB1c2hieXRlcyAweDAwMmEKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICBwdXNoYnl0ZXMgMHgwMDAxMDAwMgogICAgc3dhcAogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgLTIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2dyYW50LXBvbGljeS50czozOC00MgogICAgLy8gY29uc3QgaW5mb3MgPSBhYmlDYWxsPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfZ2V0UGx1Z2lucz4oewogICAgLy8gICBhcHBJZDogd2FsbGV0LAogICAgLy8gICBhcmdzOiBbW3sgcGx1Z2luLCBjYWxsZXIsIGVzY3JvdyB9XV0sCiAgICAvLyAgIGZlZTogMCwKICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBwdXNoYnl0ZXMgMHg4OWE3NjgyNiAvLyBtZXRob2QgImFyYzU4X2dldFBsdWdpbnMoKHVpbnQ2NCxhZGRyZXNzLHN0cmluZylbXSkodWludDY0LHVpbnQ4LHVpbnQ2NCx1aW50NjQsKGJ5dGVbNF0sdWludDY0LHVpbnQ2NClbXSxib29sLGJvb2wsYm9vbCxib29sLGJvb2wsdWludDY0LHVpbnQ2NClbXSIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9ncmFudC1wb2xpY3kudHM6NDEKICAgIC8vIGZlZTogMCwKICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2dyYW50LXBvbGljeS50czozOC00MgogICAgLy8gY29uc3QgaW5mb3MgPSBhYmlDYWxsPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfZ2V0UGx1Z2lucz4oewogICAgLy8gICBhcHBJZDogd2FsbGV0LAogICAgLy8gICBhcmdzOiBbW3sgcGx1Z2luLCBjYWxsZXIsIGVzY3JvdyB9XV0sCiAgICAvLyAgIGZlZTogMCwKICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBkaWcgMQogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGludGNfMiAvLyAyCiAgICAqCiAgICBjb3ZlciAyCiAgICBsZW4KICAgIGNvdmVyIDIKICAgIGV4dHJhY3QgNiAwCiAgICBpbnRjXzAgLy8gMAoKcmVxdWlyZVBvbGljeVdpbmRvd19mb3JfaGVhZGVyQDI4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2dyYW50LXBvbGljeS50czozOC00MgogICAgLy8gY29uc3QgaW5mb3MgPSBhYmlDYWxsPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfZ2V0UGx1Z2lucz4oewogICAgLy8gICBhcHBJZDogd2FsbGV0LAogICAgLy8gICBhcmdzOiBbW3sgcGx1Z2luLCBjYWxsZXIsIGVzY3JvdyB9XV0sCiAgICAvLyAgIGZlZTogMCwKICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBkdXAKICAgIGRpZyA1CiAgICA8CiAgICBieiByZXF1aXJlUG9saWN5V2luZG93X2FmdGVyX2ZvckAzMAogICAgZHVwCiAgICBpbnRjXzIgLy8gMgogICAgKgogICAgZGlnIDIKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBlbmNvZGluZwogICAgZHVwCiAgICB1bmNvdmVyIDUKICAgIGR1cAogICAgY292ZXIgNAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBmb3IgKGxlbisodWludDY0LHVpbnQ4LHVpbnQ2NCx1aW50NjQsKGxlbisodWludDhbNF0sdWludDY0LHVpbnQ2NClbXSksYm9vbDEsYm9vbDEsYm9vbDEsYm9vbDEsYm9vbDEsdWludDY0LHVpbnQ2NClbXSkKICAgIGRpZyAxCiAgICBsZW4KICAgIHN1YnN0cmluZzMKICAgIGR1cAogICAgbGVuCiAgICBkaWcgMQogICAgcHVzaGludCAyNQogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgcHVzaGludCA0NAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBhdCBpbmRleCA0IG9mICh1aW50NjQsdWludDgsdWludDY0LHVpbnQ2NCwobGVuKyh1aW50OFs0XSx1aW50NjQsdWludDY0KVtdKSxib29sMSxib29sMSxib29sMSxib29sMSxib29sMSx1aW50NjQsdWludDY0KQogICAgc3dhcAogICAgc3Vic3RyaW5nMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMjAKICAgICoKICAgIHB1c2hpbnQgNDYKICAgICsKICAgICsKICAgIGNvdmVyIDIKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBiIHJlcXVpcmVQb2xpY3lXaW5kb3dfZm9yX2hlYWRlckAyOAoKcmVxdWlyZVBvbGljeVdpbmRvd19hZnRlcl9mb3JAMzA6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9ncmFudC1wb2xpY3kudHM6MzgtNDIKICAgIC8vIGNvbnN0IGluZm9zID0gYWJpQ2FsbDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X2dldFBsdWdpbnM+KHsKICAgIC8vICAgYXBwSWQ6IHdhbGxldCwKICAgIC8vICAgYXJnczogW1t7IHBsdWdpbiwgY2FsbGVyLCBlc2Nyb3cgfV1dLAogICAgLy8gICBmZWU6IDAsCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgc3dhcAogICAgaW50Y18yIC8vIDIKICAgICsKICAgIHVuY292ZXIgMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9hY2NvdW50L3R5cGVzLnRzOjpQbHVnaW5JbmZvPgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyAxCiAgICBsZW4KICAgIGRpZyAyCiAgICBpbnRjXzIgLy8gMgogICAgZXh0cmFjdF91aW50MTYKICAgIHVuY292ZXIgNAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIHNlbGVjdAogICAgc3Vic3RyaW5nMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2dyYW50LXBvbGljeS50czo2MgogICAgLy8gcmV0dXJuIGtleS5jYWxsZXIgPT09IEdsb2JhbC56ZXJvQWRkcmVzcyAmJiBncmFudEluZm8od2FsbGV0LCBrZXkucGx1Z2luLCBrZXkuY2FsbGVyLCBrZXkuZXNjcm93KS51c2VFeGVjdXRpb25LZXkKICAgIHB1c2hpbnQgMjE4CiAgICBnZXRiaXQKICAgIGJ6IHJlcXVpcmVQb2xpY3lXaW5kb3dfYm9vbF9mYWxzZUAzMgogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhL2NvbnRyYWN0LmFsZ28udHM6NjgzCiAgICAvLyBsb2dnZWRBc3NlcnQoZ3JhbnQucGx1Z2luID09PSB3cml0ZXIuaWQgJiYgaXNBZG1pbkFwcHJvdmVkKHdhbGxldCwgZ3JhbnQpLCBlcnJQb2xpY3lXaW5kb3cpCiAgICBiIHJlcXVpcmVQb2xpY3lXaW5kb3dfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZ3JhbnQtcG9saWN5LnRzOjppc0FkbWluQXBwcm92ZWRAMzQKCnJlcXVpcmVQb2xpY3lXaW5kb3dfYm9vbF9mYWxzZUAzMjoKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS9jb250cmFjdC5hbGdvLnRzOjY4MwogICAgLy8gbG9nZ2VkQXNzZXJ0KGdyYW50LnBsdWdpbiA9PT0gd3JpdGVyLmlkICYmIGlzQWRtaW5BcHByb3ZlZCh3YWxsZXQsIGdyYW50KSwgZXJyUG9saWN5V2luZG93KQogICAgYiByZXF1aXJlUG9saWN5V2luZG93X2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2dyYW50LXBvbGljeS50czo6aXNBZG1pbkFwcHJvdmVkQDM0CgpyZXF1aXJlUG9saWN5V2luZG93X2Jvb2xfZmFsc2VAMTI6CiAgICBpbnRjXzAgLy8gMAogICAgYiByZXF1aXJlUG9saWN5V2luZG93X2Jvb2xfbWVyZ2VAMTMKCnJlcXVpcmVQb2xpY3lXaW5kb3dfYm9vbF9mYWxzZUA1OgogICAgaW50Y18wIC8vIDAKICAgIGIgcmVxdWlyZVBvbGljeVdpbmRvd19ib29sX21lcmdlQDYK", "clear": "I3ByYWdtYSB2ZXJzaW9uIDEzCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCiNwcmFnbWEgYXV0b3NhbHQgZmFsc2UKCi8vIEBhbGdvcmFuZGZvdW5kYXRpb24vYWxnb3JhbmQtdHlwZXNjcmlwdC9iYXNlLWNvbnRyYWN0LmQudHM6OkJhc2VDb250cmFjdC5jbGVhclN0YXRlUHJvZ3JhbSgpIC0+IHVpbnQ2NDoKbWFpbjoKICAgIHB1c2hpbnQgMQogICAgcmV0dXJuCg==" }, "byteCode": { "approval": "DSALAAECINTeAZAD1PcBgAj+H4DC1y+AgAEmHQQVH3x1AAFtCXR5cGVfZmVlcwlha2l0YV9kYW8Bcg1wb2xpY3lfd3JpdGVyDGFraXRhX2VzY3JvdwZ3YWxsZXQLRVJSOmVyck5kYW8IdHlwZXNfaWQBJAtFUlI6ZXJySXBtcgtFUlI6ZXJySXBtYQpFUlI6ZXJyS3RsC0VSUjplcnJNcmV2B3ZlcnNpb24LRVJSOmVyck1uYW0LRVJSOmVyck5uYW0LRVJSOmVyck1rZXkKRVJSOmVyckR0bAJsLgpFUlI6ZXJyUmtwC0VSUjplcnJOZHRhC0VSUjplcnJNcm5mC0VSUjplcnJNdnN6C0VSUjplcnJNcGt5AwaBAQtFUlI6ZXJyTXB3bjEYQA4nCiJnKyJngATqkYDdNhoAjgEA0DEZFEQxGEHyAoIZBIVN7eAEokwGfATfKHp9BMbT1wQEQvxyAgQG04kEBCvzzFoEUMNuQQQM8bnPBB/3x0wEOcF97QSgP52dBHKyWYEEdoPNJQSaRgYdBFAdPrIEWGqzTgTQtigCBLHm1PsEF9PQWwRC7WoaBGf/QMoEdcZAQgSuhMvYBDPpLJQ2GgCOGQABALkBjAHBAfUDXQPRBBsEVAS/BTQHjwgVCDMIdAiVCLYJYwndCloKfgq+CxgLVwvcACNDgATNmtZ+NhoAjgEAfQAxGYEEEjEYEERC4i2KAwCL/ov/E0EUi/0BJwtMUIv+v4mKAgGL/gEnC0xQvkECiUiL/4mKAgGL/nMARQFADov/MgEPQQQjiSKJigMBi/0BJwtMUEm+QBSL/xaL/kxQjACJTLxIi/8hBAhJSwJMiHNBCkxMFlCJRQGL/kIPNhoBSSJZJAhLARUSRFcCADYaAkkVgQgSRBcnEE8CZycETGcnBiJnI3YLI0MxFiMJSTgQIxJENhoBSSJZJAhLARUSRFcCAEk2GgJJTgIVJRJENhoDSRWBCBJEF0wpE0AIJxGwAEsCFUlOAoEfDkAcgApFUlI6ZXJyTnRssAAWSYABdExQvUUBQB6AC0VSUjplcnJOdHJ0sAAxAE8EiKorJwVMUElOBL1FAUEegAtFUlI6ZXJyTnRrbrAASwQ4BzIKEkAIJwywAE8ESTgIIQVPBAshBghPAjgASU4DMQASIQQiTwJNCBJACCcNsABOAlBPAklPAr8xAExOAojTBSNDNhoBSSJZJAhLARUSRFcCAEkxAEyIvCknBUxQSb1FAUAIJxKwAEm8SEwVIQULIQYIiLgqI0M2GgFJIlkkCEsBFRJEVwIANhoCSU4CFSUSRDEATIjAKCcFTFBJvUUBQAgnErAAIk8CuyNDIilJMRYjCUk4ECMSRDYaAUkiWSQISwEVEkRXAgBJNhoCSSJZJAhLARUSRFcCAE4CNhoDSSJZJAhLARUSRFcCAEwpE0AIJxGwAEsCKRNACCcTsAAxAEsCiOQmTEsDFUlFB4EPDkAIJw6wAEsCFUsGCIEfDEAIJw6wAEkVSU4FIQcOQAgnFLAASwYkDEBEIksHSU4CDyJLAk8CTSRLAg8kTwNPAk1LBU4CUicVEkDqAiNACCcWsAAnBU8CUL1FAUAegAtFUlI6ZXJyTnJmZLAATE8CiLAlTEsDOAcyChJACCcMsABPA0k4CEsDTwWIxiVPAjgASU4FMQASIQQiTwJNCBJACCcNsAAxAEsCiPwjMQBFByJFBipMUEm9RQFBRDEASwFJvUSBDAlLBUyIyCRMTgKIlwtJVwAgTCVbTEUIRQZOAoi8JUgxAExOAojFDEsBQSCxSwGyCEsCsgcjshAisgGzI0MiQukCNhoBSSJZJAhLARUSRFcCADYaAkkiWSQISwEVEkRXAgBJFUlOAyQMQEIiSwNJTgIPIksCTwJNJEsCDyRPA08CTUsCTgJSJxUTQU4jQAgnFrAAiOIhSTEATIiSIUkqTFC9RQFACCcXsACI9CKI7DFII0MiQk02GgFJFSUSRDYaAkkiWSQISwEVEkRXAgA2GgNJFSUSRDYaBEkiWSULJAhLARUSRDYaBUkVgQgSRBeI8CJIgAEAIk8CVChMULAjQzYaAUkVJRJENhoCSSJZJAhLARUSRFcCADYaA0kiWSQISwEVEkRXAgCIyCRJFRZXBgJMUChMULAjQzYaAUcCFSUSRDYaAkkiWSQISwEVEkRXAgBJTgI2GgNJFSUSRDYaBEkiWSULJAhLARUSRDYaBUkVgQgSRBc2GgZJIlkkCEsBFRJEVwIATgWIviBIQCJGAylJFRZXBgJMUChMULAjQ4jaIkIhNhoBRwIVJRJENhoCSSJZJAhLARUSRFcCAElOAjYaA0kVJRJENhoESSJZJQskCEsBFRJENhoFSRWBCBJEFzYaBkkiWSQISwEVEkRXAgBOBYjoHkhAHoALRVJSOmVyckZ2cmmwAIiIIUkVFlcGAkxQKExQsCNDKTEWIwlHAjgQIxJENhoBSSJZJAhLARUSRFcCAEw2GgJJTgRJIllJTgMkCEwVEkQ4BzIKEkAIJwywAE8COAghCRJACCcNsABLARVJRQWBoAYOQAgnFLAAgAEoIk4CSwJLAgxBpAZLBFcCAEsDI1hJgAEKEkFESIAFdWludDhQSwFBGksBIwlLAxNBCIABLFBPAiMITgJCb0mAAQsSQRhIgAZ1aW50MTZQQlNJgAEMEkEYSIAGdWludDMyUEJ5SYABDRJBGkiABnVpbnQ2NFBCnwFJgAEOEkEcSIAHdWludDEyOFBCyQFJgAEPEkEcSIAHdWludDI1NlBC8wFJgAEQEkEcSIAHdWludDUxMlBCnQJJgAEUEkEcSIAHYnl0ZVs0XVBCxwJJgAEVEkEcSIAHYnl0ZVs4XVBC8QJJgAEWEkEeSIAIYnl0ZVsxNl1QQp0DSYABFxJBHkiACGJ5dGVbMzJdUELJA0mAARgSQR5IgAhieXRlWzY0XVBC9QNJgAEZEkEgSIAJYnl0ZVsxMjhdUEKjBEmAARoSQSBIgAlieXRlWzI1Nl1QQtEESYABGxJBIEiACWJ5dGVbNTEyXVBC/wRJgAEeEkEaSIAGc3RyaW5nUEKnBYABKBJBGoAHYWRkcmVzc1BCzQWAC0VSUjplcnJNc2NosABFAUUBIicKZURJIwgnCkxnMgpzAURPAoABKVBJFRZXBgJMUEkVgQQISwYWVwYCTwVQTBZXBgKAAgAETFBPAlBMUE8CFoABdExQSbxITL8yCnMBREwJIitlRCEJTwIJCCtMZyNDIicHZUUBQfIBIicHZUQkW0HeASNAHoALRVJSOmVyck5lc2OwADIKRwJzAERMcwFEDUGSAUlzAERMcwFECSIrZURLAQxBakgiK2VESUASSCIWKExQsCNDIitlREsBCStMZ7EiJwdlRCRbcghESwGyCLIHI7IQIrIBs0JRQl9IIkKDASJC3QE2GgFJIlkkCEsBFRJEVwIAFSEFCyEGCBYoTFCwI0M2GgFJIlkkCEsBFRJEVwIANhoCSSJZJAhLARUSRFcCADYaA0kiWSQISwEVEkRXAgBOAoj0DkwViLQPFihMULAjQzYaAUkVJRJENhoCSSJZJAhLARUSRFcCAIi8FChMULAjQzYaAUkVJRJENhoCSSJZJAhLARUSRFcCAIj4FChMULAjQyk2GgFHAhUlEkQ2GgJJIlkkCEsBFRJEVwIASU4CNhoDSRWBCBJEF04CNhoESRWBCBJEF04CNhoFSRWBCBJEF04CiOYSSU4GIlNACCcYsABLBSNbEkAIJw+wAEkhBw5BkgFLBIEJW0lFB0sCD0F4SwVLAglLAQ9BZCNAHoALRVJSOmVyck1ybmewAE8DTwOI9AoqTFCBDE8DCE8CukkVFlcGAkxQKExQsCNDIkJjIik2GgFJFSUSRDYaAkkiWSQISwEVEkRXAgBJTgI2GgNJFYEIEkQXSU4CgRYITBUIIQoOQAgnGbAATEsCSU4CiLgJTE8CiLgKTCJFBCpMUElFBb1FAUEeSwO9RIEMCUsCTIiACkUDSUsDDUEUSwIJFihMULAjQ0giQhExFiMJSTgQIxJENhoBSSJZJAhLARUSRFcCAEk2GgJJIlkkCEsBFRJEVwIATDYaA0kiWSQISwEVEkRXAgBMNhoESSJZJAhLARUSRFcCAEw2GgVJIlkkCEsBFRJEVwIATDYaBkkVgQgSRBdMiIwZQQgnGrAAiJoQFihMULAjQzYaAUkiWSQISwEVEkRXAgA2GgJJFYEIEkQXiJQXFihMULAjQzYaAUkVgQgSRBciJwRlRCcIZUhMIicGZURADjEAMgkSQBxLAUEuMQBLAnIIRBJBGiNACCcJsAAnBkxnI0MiQhkxFiMJSTgQIxJENhoBSRWBCBJEFzYaAkkiWSQISwEVEkRXAgA2GgNJIlkkCEsBFRJEVwIANhoESRWBCBJEF08DSwOI0hZPA08DKUcCTwZPBoieDRYoTFCwI0M2GgFJFYEIEkQXNhoCSSJZJAhLARUSRFcCADYaA0kVgQgSRBdPAksCiNIViKIUgAwVH3x1AAAAAAAAAACwI0M2GgFHAhVLASJZSYEKEkRPAkxLAlIiWYEMCBJEMQAiJwRlRCcIZUhyCEQSQAgnCbAAJwdMZyNDNhoBSSJZJAhLARUSRFcCADEAIicEZUQnCGVIcghEEkAIJwmwACInBGVEgANwYWxlSIEQWzINEkAegAtFUlI6ZXJySXVwZ7AAJxBMZyNDNhoBSRWBCBJEFzEAIicEZUQnCGVIcghEEkAIJwmwACcETGcjQ4oCAYv/FUlBKosAgR8OQRwjQAgnE7AAi/6L/1BMiSJCG4oCAYv+FUmL/xUIgR8MQAgnDrAAFkmTgQgORFcHAYv+UIv/UImKAgGL/hWBLQiL/wghBQuBxBMIiYoCAIv+MQCL/4iTMElXACBMJVtJQSCxiwGyCIsAsgcjshAisgGziYoBASqL/1BJvUUBQQwigQi6F4lIIomKAgExAIv+iLsCSYhBIwhJFov/FRZXBgKL/1BMgAIAClBMUCpPA1BJvEhMv4mKBQIpSYv7i/yImQMnBUxQSb1FAUAQIov+jAGMAIlJvkQlW4wBi/9BHosBi/8TQRAii/6MAYwAiYv+IllJjACBMguBCghJMgwNQS6xgQayEIEFshknG7IeJxuyHyKyAbNCNUgiTIv9TgJLAYsADEFMi/5XAgBLAiULJVhJSwSlQRpPA0xQAU4CTCMITEJFTwNQAU4CQhdFAb5EVwAgEov+TwNPA4mKAwGL/4AGbC50eXBlEkEii/2L/oj5BScFTFC+RFcgCImL/ov/iNkFi/1MiKgBSSJTQAgnF7AASYEJWUsBFVJXAgCJigIBi/6L/4jlBkkqTFBJvUUBQCyAEQAAAAAAAAAAAAAAAAAAAAAAjACJTIirBUy9RIEMCUwWgAGATFBMFlCJigIBi/6L/4iLAUkiU0AigA0AAAAAAAAAAAAACwAATImBCVshBw5AHoALRVJSOmVyck1yc2ywAIv+i/+IywgqTFBJIoEIuhdLAYEKJLoXJAhPAoEKTwK6VwIATBaAAYBMUEsBFRZXBgJPAlBMgAIAC1BMUImKBwEiKUcGMQCL+ojTCYv7FUlOAiEIDkGGB4v8FSEIDkH0Bov9FSEIDkHiBov+FYH0Hw5BzgYjQB6AC0VSUjplcnJNcHJ0sACL/BVJjAaLCAiL/RVJjAcIi/4VSU4DCEmMBIEWCIv6FQghCg5ACCcZsABJiKEJi/8SQAgnD7AAKkxQSYwAvUlPAkgijAJBHosAvUSBDAmL+kyI4wqMAov6iwSI9QpJiwINQdoESYsCCSKMBU8CQP4Di/k4ADEAEiEEIk8CTYwFiwUIjAGL+TgWIwgxFhJBtgOL+TgHMgoSQaIDi/k4CIsBEkGOA4v5OAkyAxJB+gKL+TggMgMSQeYCI0AegAtFUlI6ZXJyTXBtdLAAi/qL/oi7C4wDiwVBGov5OAAxAIsATgKI1z2LBE8CDUGCAYEMiwRJTgIIiwBJTgNM0xZJk4EQDkRXBgKBCky7iwdBEIsAgQwii/3SiwZBEIsAgQwii/zSiwhBEIsAgQwii/vSiwJLAQ1BYosCTAmMAYsBQTqLADEAiO8+SbGLAYjZPkEkiwGyCLIHI7IQIrIBs4sDjACJSDEAQilIIowBQl0iQuUCSUHhA4v5OACLADEAiOE/EkD/A4ALRVJSOmVycklweXKwACJC0wQiQs0GigIBi/6IjgFBCCcasACL/ov/iAQiiYoCADEAi/6IuRFJKkxQSb1FAUAIJxiwAEyI2w+L/xJACCcPsABJvUSBDAmL/kyI+xBLAbxIiOEQiYoBAYv/FUlBIIsAgR8OQRKL/yJVQAYjTIkiQgWKAgAiRwQpi/+ISUAegAtFUlI6ZXJyTW5wa7AAIicGZUxJTwJEQfYFMg1LARJB5gUjQB6AC0VSUjplcnJNcHdysACL/oASY29udHJvbGxlZF9hZGRyZXNzZUiMAYv+gBBzcGVuZGluZ19hZGRyZXNzZUiMBIv+gA5jdXJyZW50X3BsdWdpbmVMjAJBpAQxAIsBEkGUBDEAiwQSQYQEI0AIJxywAIsCIltJjAUSQT6LAkmBKFlLARVSVwIASYwDKRNBHCJBECNACCccsACJIkIPiwJXCCBJjACL/nIIRBJBBiNCO4sAMgMSQeACsYsFFosAUIsDSRUWVwYCTFBMgAIAKlBMUIAEAAEAAkxQi/6yGIAEiadoJrIashqBBrIQIrIBs7Q+SVcEAEsBVwAEKBJESSJZSU4DJAtOAhVOAlcGACJJSwUMQWRJJAtLAklPAllJTwVJTgQSREsBFVJJFUsBgRlZSYEsEkRMUiJZgRQLgS4ICE4CIwhCa0hMJAhPAhJESSJZSwEVSwIkWU8EIwlNUoHaAVNBCCNCqQMiQrEDIkKDBCJC5QU=", "clear": "DYEBQw==" }, "events": [], "templateVariables": {} };
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
    * Set the MetaPlugin allowed to write grant policies. The creator sets it once, at deployment, while
    it is unset; after that only the DAO wallet can change it.
  
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
var MetaFactory = class {
  /**
   * The underlying `AppFactory` for when you want to have more flexibility
   */
  appFactory;
  /**
   * Creates a new instance of `MetaFactory`
   *
   * @param params The parameters to initialise the app factory with
   */
  constructor(params) {
    this.appFactory = new _AppFactory({
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
  params = {
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
  };
  /**
   * Create transactions for the current app
   */
  createTransaction = {
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
  };
  /**
   * Send calls to the current app
   */
  send = {
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
  };
};
var MetaClient = class _MetaClient {
  /**
   * The underlying `AppClient` for when you want to have more flexibility
   */
  appClient;
  constructor(appClientOrParams) {
    this.appClient = appClientOrParams instanceof _AppClient ? appClientOrParams : new _AppClient({
      ...appClientOrParams,
      appSpec: APP_SPEC
    });
  }
  /**
   * Checks for decode errors on the given return value and maps the return value to the return type for the given method
   * @returns The typed return value or undefined if there was no value
   */
  decodeReturnValue(method, returnValue) {
    return returnValue !== void 0 ? getArc56ReturnValue(returnValue, this.appClient.getABIMethod(method), APP_SPEC.structs) : void 0;
  }
  /**
   * Returns a new `MetaClient` client, resolving the app by creator address and name
   * using AlgoKit app deployment semantics (i.e. looking for the app creation transaction note).
   * @param params The parameters to create the app client
   */
  static async fromCreatorAndName(params) {
    return new _MetaClient(await _AppClient.fromCreatorAndName({ ...params, appSpec: APP_SPEC }));
  }
  /**
   * Returns an `MetaClient` instance for the current network based on
   * pre-determined network-specific app IDs specified in the ARC-56 app spec.
   *
   * If no IDs are in the app spec or the network isn't recognised, an error is thrown.
   * @param params The parameters to create the app client
   */
  static async fromNetwork(params) {
    return new _MetaClient(await _AppClient.fromNetwork({ ...params, appSpec: APP_SPEC }));
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
  params = {
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
        * Set the MetaPlugin allowed to write grant policies. The creator sets it once, at deployment, while
        it is unset; after that only the DAO wallet can change it.
    
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
  };
  /**
   * Create transactions for the current app
   */
  createTransaction = {
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
        * Set the MetaPlugin allowed to write grant policies. The creator sets it once, at deployment, while
        it is unset; after that only the DAO wallet can change it.
    
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
  };
  /**
   * Send calls to the current app
   */
  send = {
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
        * Set the MetaPlugin allowed to write grant policies. The creator sets it once, at deployment, while
        it is unset; after that only the DAO wallet can change it.
    
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
  };
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
  state = {
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
  };
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
};

// src/meta/errors.ts
var META_MERKLES_ERROR_MESSAGES = withErrorCodeAliases({
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
var translateMetaError = makeErrorTranslator(META_MERKLES_ERROR_MESSAGES);

// src/meta/schemas.ts
import { isValidAddress } from "algosdk";
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
  return source.type === "account" && hasOnly(source, ["type", "address"]) && typeof source.address === "string" && isValidAddress(source.address);
}
function parse(data, valid) {
  if (data.length > METADATA_MAX_VALUE_BYTES) return void 0;
  try {
    const value = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(data));
    return valid(value) ? value : void 0;
  } catch {
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
var MetaSDK = class extends BaseSDK {
  constructor(params) {
    super({ factory: MetaFactory, ...params }, ENV_VAR_NAMES.META_APP_ID);
  }
  // ========== Read Methods ==========
  /**
   * Gets the current global state of the Meta contract.
   */
  async getState() {
    const state = await this.client.state.global.getAll();
    return {
      typesId: state.typesId ?? 0n
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
    return new Map([...await this.client.state.box.roots.getMap()].map(([key, value]) => [{ address: encodeAddress2(key.slice(0, 32)), name: new TextDecoder().decode(key.slice(32)) }, value.root]));
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
    return result ?? false;
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
    return result ?? "";
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
      amount: microAlgo(cost),
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
      extraFee: microAlgo(1e3),
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
      amount: microAlgo(cost),
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
      extraFee: microAlgo(1e3),
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
      amount: microAlgo(ADD_TYPE_COST),
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
    return await this.client.state.global.typeFees() ?? 0n;
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
      extraFee: microAlgo(1e3),
      args: {}
    });
    return amount ?? 0n;
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
          amount: microAlgo(cost)
        }),
        key,
        ...metadataDataParts(data),
        expectedRevision
      },
      extraFee: microAlgo(1e3)
    });
  }
  async removeRecord(args) {
    const { expectedRevision } = args;
    const key = metadataKeyBytes(args.key);
    validateMetadataRecordKey(key);
    return this.client.send.removeRecord({
      ...this.getRequiredSendParams(args),
      args: { key, expectedRevision },
      extraFee: microAlgo(1e3)
    });
  }
  /** Discover complete owners and keys directly from box names. */
  async listRecordKeys(filter = {}) {
    const records = [];
    const prefix = filter.account === void 0 ? new Uint8Array([109]) : new Uint8Array([109, ...decodeAddress2(filter.account).publicKey, ...filter.keyPrefix ?? []]);
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

export {
  METADATA_MAX_NAME_BYTES,
  METADATA_MAX_KEY_BYTES,
  METADATA_RECORD_HEADER_BYTES,
  METADATA_MAX_APP_ARGS_BYTES,
  METADATA_MAX_VALUE_BYTES,
  METADATA_FINAL_PART_BYTES,
  METADATA_PART_BYTES,
  METADATA_INLINE_BYTES,
  METADATA_CHUNK_BYTES,
  validateMetadataName,
  metadataKeyBytes,
  validateMetadataRecordKey,
  metadataDataKey,
  metadataOwnerKey,
  metadataBoxName,
  decodeMetadataBoxName,
  decodeMetadataRecord,
  metadataValueLimit,
  metadataPluginValueLimit,
  validateMetadataValueSize,
  metadataDataParts,
  metadataStorageCost,
  RECEIVE_QR_RECORD,
  ACCOUNT_IMAGE_RECORD,
  encodeMetadataJson,
  MetaFactory,
  MetaClient,
  META_MERKLES_ERROR_MESSAGES,
  translateMetaError,
  isReceiveQrStyleV1,
  isAccountImageReferenceV1,
  parseReceiveQrStyle,
  parseAccountImageReference,
  encodeReceiveQrStyle,
  encodeAccountImageReference,
  MetaSDK
};
//# sourceMappingURL=chunk-OMLFSENY.mjs.map
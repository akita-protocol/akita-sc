"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } var _class; var _class2;

var _chunkGIGYZ6YCjs = require('./chunk-GIGYZ6YC.js');


var _chunkA73G7K3Bjs = require('./chunk-A73G7K3B.js');


var _chunkYA4OODI3js = require('./chunk-YA4OODI3.js');

// src/meta-merkles/index.ts
var _algokitutils = require('@algorandfoundation/algokit-utils');

// src/generated/MetaMerklesClient.ts
var _abi = require('@algorandfoundation/algokit-utils/abi');
var _appclient = require('@algorandfoundation/algokit-utils/app-client');
var _appfactory = require('@algorandfoundation/algokit-utils/app-factory');
var APP_SPEC = { "name": "MetaMerkles", "structs": { "DataKey": [{ "name": "address", "type": "byte[16]" }, { "name": "name", "type": "string" }, { "name": "key", "type": "string" }], "RootKey": [{ "name": "address", "type": "address" }, { "name": "name", "type": "string" }], "TypesValue": [{ "name": "schema", "type": "string" }, { "name": "description", "type": "string" }] }, "methods": [{ "name": "create", "args": [], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "addRoot", "args": [{ "type": "pay", "name": "payment" }, { "type": "string", "name": "name", "desc": "the name alias of the root being added" }, { "type": "byte[32]", "name": "root", "desc": "a merkle tree root" }, { "type": "uint64", "name": "type", "desc": "an index of the tree type enum from box storage" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Creates two boxes and adds a merkle root\nusing a `RootKey` to the root box map and also a list type to the\nmetadata attached to the root in the data box map", "events": [], "recommendations": {} }, { "name": "deleteRoot", "args": [{ "type": "string", "name": "name", "desc": "the name of the merkle tree root" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Deletes the merkle root from the root box map", "events": [], "recommendations": {} }, { "name": "updateRoot", "args": [{ "type": "string", "name": "name", "desc": "the name of the merkle group data" }, { "type": "byte[32]", "name": "newRoot", "desc": "the new 32 byte merkle tree root" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Replaces the merkle root with another", "events": [], "recommendations": {} }, { "name": "addData", "args": [{ "type": "pay", "name": "payment" }, { "type": "string", "name": "name", "desc": "the name of the merkle tree root" }, { "type": "string", "name": "key", "desc": "the metadata key eg. `Royalty`" }, { "type": "string", "name": "value", "desc": "the metadata value eg. `5` encoded as a bytestring for 5%" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Registers a key & value in the data box map that\ncorresponds to a merkle root in the root box map", "events": [], "recommendations": {} }, { "name": "deleteData", "args": [{ "type": "string", "name": "name", "desc": "the name of the merkle tree root" }, { "type": "string", "name": "key", "desc": "the metadata key you want to remove" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Deletes a metadata key & value pair from the data box map", "events": [], "recommendations": {} }, { "name": "verify", "args": [{ "type": "address", "name": "address", "desc": "the address of the merkle tree root creator" }, { "type": "string", "name": "name", "desc": "The name alias of the root" }, { "type": "byte[32]", "name": "leaf", "desc": "The hashed leaf to verify" }, { "type": "byte[32][]", "name": "proof", "desc": "The merkle proof" }, { "type": "uint64", "name": "type", "desc": "The type check for the lists purpose" }], "returns": { "type": "bool", "desc": "a boolean indicating whether the proof is valid" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "verify an inclusion in a double sha256 based merkle tree", "events": [], "recommendations": {} }, { "name": "read", "args": [{ "type": "address", "name": "address", "desc": "the address of the merkle tree root creator" }, { "type": "string", "name": "name", "desc": "the name of the merkle tree root" }, { "type": "string", "name": "key", "desc": "the metadata key eg. `Royalty`" }], "returns": { "type": "string", "desc": "the value set eg. `5` encoded as a bytestring for 5%" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "Fetch a metadata properties", "events": [], "recommendations": {} }, { "name": "verifiedRead", "args": [{ "type": "address", "name": "address", "desc": "the address of the merkle tree root creator" }, { "type": "string", "name": "name", "desc": "the name of the root" }, { "type": "byte[32]", "name": "leaf", "desc": "the leaf node to be verified" }, { "type": "byte[32][]", "name": "proof", "desc": "the proof the hash is included" }, { "type": "uint64", "name": "type", "desc": "the list type that helps contracts ensure\nthe lists purpose isn't being misused ( 0 if the caller doesnt care )" }, { "type": "string", "name": "key", "desc": "the metadata key eg. `Royalty`" }], "returns": { "type": "string", "desc": "a string of metadata" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Read metadata from box storage and verify the data provided is included\nin the merkle tree given a sha256'd 32 byte merkle tree root & a proof\nthats pre-computed off chain.\n\nverify an inclusion in a merkle tree\n& read an associated key value pair\n& check against the underlying data's schema\n& check against the underlying data's list type or purpose", "events": [], "recommendations": {} }, { "name": "verifiedMustRead", "args": [{ "type": "address", "name": "address", "desc": "the address of the merkle tree root creator" }, { "type": "string", "name": "name", "desc": "the name of the root" }, { "type": "byte[32]", "name": "leaf", "desc": "the leaf node to be verified" }, { "type": "byte[32][]", "name": "proof", "desc": "the proof the hash is included" }, { "type": "uint64", "name": "type", "desc": "the list type that helps contracts ensure\nthe lists purpose isn't being misused ( 0 if the caller doesnt care )" }, { "type": "string", "name": "key", "desc": "the metadata key eg. `Royalty`" }], "returns": { "type": "string", "desc": "a string of metadata" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Read metadata from box storage and verify the data provided is included\nin the merkle tree given a sha256'd 32 byte merkle tree root & a proof\nthats pre-computed off chain.\n\nverify an inclusion in a merkle tree\n& read an associated key value pair\n& check against the underlying data's schema\n& check against the underlying data's list type or purpose", "events": [], "recommendations": {} }, { "name": "addType", "args": [{ "type": "pay", "name": "payment" }, { "type": "string", "name": "description" }, { "type": "uint8[]", "name": "schemaList" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "rootCosts", "args": [{ "type": "string", "name": "name" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "dataCosts", "args": [{ "type": "string", "name": "name" }, { "type": "string", "name": "key" }, { "type": "string", "name": "value" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 1, "bytes": 0 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "typesID": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "dHlwZXNfaWQ=" } }, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": { "types": { "keyType": "uint64", "valueType": "TypesValue", "desc": "the types (intents) of merkle trees that exist", "prefix": "dA==" }, "roots": { "keyType": "RootKey", "valueType": "AVMBytes", "desc": "the merkle roots we want to attach data to", "prefix": "cg==" }, "data": { "keyType": "DataKey", "valueType": "AVMString", "desc": "rootData is the box map for managing the data associated with a group", "prefix": "ZA==" } } } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [1066, 2360, 2493, 2559], "errorMessage": "Box must have value" }, { "pc": [778, 1561], "errorMessage": "ERR:DTL" }, { "pc": [439], "errorMessage": "ERR:ETRK" }, { "pc": [1442], "errorMessage": "ERR:FVRI" }, { "pc": [470, 902, 1544], "errorMessage": "ERR:IPMA" }, { "pc": [453, 885, 1527], "errorMessage": "ERR:IPMR" }, { "pc": [764], "errorMessage": "ERR:KTL" }, { "pc": [1062], "errorMessage": "ERR:NDTA" }, { "pc": [563, 652], "errorMessage": "ERR:NNAM" }, { "pc": [858], "errorMessage": "ERR:NRFD" }, { "pc": [414], "errorMessage": "ERR:NTKN" }, { "pc": [314], "errorMessage": "ERR:NTL" }, { "pc": [343], "errorMessage": "ERR:NTRT" }, { "pc": [835], "errorMessage": "ERR:RKP" }, { "pc": [243], "errorMessage": "Length must be 16" }, { "pc": [2054], "errorMessage": "check GlobalState exists" }, { "pc": [1584, 2457], "errorMessage": "index access is out of bounds" }, { "pc": [263, 491, 599, 675, 692, 711, 962, 979, 1114, 1138, 1188, 1204, 1246, 1273, 1298, 1359, 1386, 1411, 1486, 1506, 2121, 2147, 2160, 2173, 2388], "errorMessage": "invalid array length header" }, { "pc": [270, 498, 606, 682, 699, 718, 969, 986, 1121, 1195, 1211, 1253, 1305, 1366, 1418, 1493, 1515, 2128, 2154, 2167, 2180], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [1147, 1282, 1395], "errorMessage": "invalid number of bytes for arc4.dynamic_array<bytes[32]>" }, { "pc": [284, 619, 1108, 1132, 1182, 1240, 1267, 1353, 1380], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [293, 1156, 1291, 1404], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [257, 669, 1480], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDIgMzIgNDAwCiAgICBieXRlY2Jsb2NrICIiIDB4MDAxNCAiZCIgMHgxNTFmN2M3NSAweDAwMjIgInIiICJ0eXBlc19pZCIgMHgwMDA2NmMyZTc0Nzk3MDY1ICJFUlI6SVBNUiIgIkVSUjpJUE1BIiAiRVJSOk5OQU0iICJFUlI6RFRMIiAweDA2ODEwMQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjg3CiAgICAvLyBleHBvcnQgY2xhc3MgTWV0YU1lcmtsZXMgZXh0ZW5kcyBDb250cmFjdCB7CiAgICB0eG4gT25Db21wbGV0aW9uCiAgICAhCiAgICBhc3NlcnQKICAgIHR4biBBcHBsaWNhdGlvbklECiAgICBieiBtYWluX2NyZWF0ZV9Ob09wQDE2CiAgICBwdXNoYnl0ZXNzIDB4YTI0YzA2N2MgMHhkZjI4N2E3ZCAweGM2ZDNkNzA0IDB4NDJmYzcyMDIgMHgwNmQzODkwNCAweDJiZjNjYzVhIDB4NTBjMzZlNDEgMHgwY2YxYjljZiAweDFmZjdjNzRjIDB4MzljMTdkZWQgMHg3MmIyNTk4MSAweDc2ODNjZDI1IC8vIG1ldGhvZCAiYWRkUm9vdChwYXksc3RyaW5nLGJ5dGVbMzJdLHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJkZWxldGVSb290KHN0cmluZyl2b2lkIiwgbWV0aG9kICJ1cGRhdGVSb290KHN0cmluZyxieXRlWzMyXSl2b2lkIiwgbWV0aG9kICJhZGREYXRhKHBheSxzdHJpbmcsc3RyaW5nLHN0cmluZyl2b2lkIiwgbWV0aG9kICJkZWxldGVEYXRhKHN0cmluZyxzdHJpbmcpdm9pZCIsIG1ldGhvZCAidmVyaWZ5KGFkZHJlc3Msc3RyaW5nLGJ5dGVbMzJdLGJ5dGVbMzJdW10sdWludDY0KWJvb2wiLCBtZXRob2QgInJlYWQoYWRkcmVzcyxzdHJpbmcsc3RyaW5nKXN0cmluZyIsIG1ldGhvZCAidmVyaWZpZWRSZWFkKGFkZHJlc3Msc3RyaW5nLGJ5dGVbMzJdLGJ5dGVbMzJdW10sdWludDY0LHN0cmluZylzdHJpbmciLCBtZXRob2QgInZlcmlmaWVkTXVzdFJlYWQoYWRkcmVzcyxzdHJpbmcsYnl0ZVszMl0sYnl0ZVszMl1bXSx1aW50NjQsc3RyaW5nKXN0cmluZyIsIG1ldGhvZCAiYWRkVHlwZShwYXksc3RyaW5nLHVpbnQ4W10pdm9pZCIsIG1ldGhvZCAicm9vdENvc3RzKHN0cmluZyl1aW50NjQiLCBtZXRob2QgImRhdGFDb3N0cyhzdHJpbmcsc3RyaW5nLHN0cmluZyl1aW50NjQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBhZGRSb290IGRlbGV0ZVJvb3QgdXBkYXRlUm9vdCBhZGREYXRhIGRlbGV0ZURhdGEgdmVyaWZ5IHJlYWQgdmVyaWZpZWRSZWFkIHZlcmlmaWVkTXVzdFJlYWQgYWRkVHlwZSByb290Q29zdHMgZGF0YUNvc3RzCiAgICBlcnIKCm1haW5fY3JlYXRlX05vT3BAMTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6ODcKICAgIC8vIGV4cG9ydCBjbGFzcyBNZXRhTWVya2xlcyBleHRlbmRzIENvbnRyYWN0IHsKICAgIHB1c2hieXRlcyAweDRjNWM2MWJhIC8vIG1ldGhvZCAiY3JlYXRlKCl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggbWFpbl9jcmVhdGVfcm91dGVAMTcKICAgIGVycgoKbWFpbl9jcmVhdGVfcm91dGVAMTc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6OTUKICAgIC8vIHR5cGVzSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBNZXRhTWVya2xlc0dsb2JhbFN0YXRlS2V5VHlwZXNJRCB9KQogICAgYnl0ZWMgNiAvLyAidHlwZXNfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6MTQwCiAgICAvLyB0aGlzLnR5cGVzSUQudmFsdWUgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czoxMzgKICAgIC8vIEBhYmltZXRob2QoeyBvbkNyZWF0ZTogJ3JlcXVpcmUnIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2Jhc2UudHM6OmJ5dGVzMTYodjogYnl0ZXMpIC0+IGJ5dGVzOgpieXRlczE2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2Jhc2UudHM6NwogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIGJ5dGVzMTYodjogYnl0ZXMpIHsKICAgIHByb3RvIDEgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2Jhc2UudHM6OAogICAgLy8gcmV0dXJuIHYuc2xpY2UoMCwgMTYpLnRvRml4ZWQoeyBsZW5ndGg6IDE2IH0pCiAgICBmcmFtZV9kaWcgLTEKICAgIGxlbgogICAgaW50Y18wIC8vIDAKICAgIGRpZyAxCiAgICA+PQogICAgaW50Y18wIC8vIDAKICAgIGRpZyAyCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgcHVzaGludCAxNgogICAgZGlnIDIKICAgID49CiAgICBwdXNoaW50IDE2CiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBmcmFtZV9kaWcgLTEKICAgIGNvdmVyIDIKICAgIHN1YnN0cmluZzMKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDE2CiAgICA9PQogICAgYXNzZXJ0IC8vIExlbmd0aCBtdXN0IGJlIDE2CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGFNZXJrbGVzLmFkZFJvb3Rbcm91dGluZ10oKSAtPiB2b2lkOgphZGRSb290OgogICAgaW50Y18wIC8vIDAKICAgIGR1cG4gMwogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjE1NS0xNjAKICAgIC8vIGFkZFJvb3QoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgbmFtZTogc3RyaW5nLAogICAgLy8gICByb290OiBieXRlczwzMj4sCiAgICAvLyAgIHR5cGU6IHVpbnQ2NAogICAgLy8gKTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBkdXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgY292ZXIgMgogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czoxNjEKICAgIC8vIGxvZ2dlZEFzc2VydChCeXRlcyhuYW1lKS5sZW5ndGggPD0gMzEsIEVSUl9OQU1FX1RPT19MT05HKQogICAgbGVuCiAgICBkdXAKICAgIHB1c2hpbnQgMzEKICAgIDw9CiAgICBibnogYWRkUm9vdF9hZnRlcl9hc3NlcnRAMwogICAgcHVzaGJ5dGVzICJFUlI6TlRMIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5UTAoKYWRkUm9vdF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czoxNjIKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnR5cGVzKHR5cGUpLmV4aXN0cywgRVJSX05PX1RSRUVfVFlQRSkKICAgIGRpZyAxCiAgICBpdG9iCiAgICBkdXAKICAgIGJ1cnkgMTAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czoxMDAKICAgIC8vIHR5cGVzID0gQm94TWFwPHVpbnQ2NCwgVHlwZXNWYWx1ZT4oeyBrZXlQcmVmaXg6IE1ldGFNZXJrbGVzQm94UHJlZml4VHlwZXMgfSkKICAgIHB1c2hieXRlcyAidCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjE2MgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMudHlwZXModHlwZSkuZXhpc3RzLCBFUlJfTk9fVFJFRV9UWVBFKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogYWRkUm9vdF9hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6TlRSVCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOVFJUCgphZGRSb290X2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjE2NAogICAgLy8gY29uc3QgdHJ1bmNhdGVkQWRkcmVzcyA9IGJ5dGVzMTYoVHhuLnNlbmRlci5ieXRlcykKICAgIHR4biBTZW5kZXIKICAgIGNhbGxzdWIgYnl0ZXMxNgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjE2NgogICAgLy8gY29uc3Qgcm9vdEtleTogUm9vdEtleSA9IHsgYWRkcmVzczogVHhuLnNlbmRlciwgbmFtZSB9CiAgICB0eG4gU2VuZGVyCiAgICBkaWcgMgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIGRpZyA2CiAgICBjb25jYXQKICAgIHN3YXAKICAgIGJ5dGVjIDQgLy8gMHgwMDIyCiAgICBjb25jYXQKICAgIGRpZyAxCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czoxNjcKICAgIC8vIGNvbnN0IHR5cGVLZXk6IERhdGFLZXkgPSB7IGFkZHJlc3M6IHRydW5jYXRlZEFkZHJlc3MsIG5hbWUsIGtleTogdHJlZVR5cGVLZXkgfQogICAgdW5jb3ZlciAyCiAgICBieXRlY18xIC8vIDB4MDAxNAogICAgY29uY2F0CiAgICBkaWcgMgogICAgbGVuCiAgICBwdXNoaW50IDIwCiAgICArCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGNvbmNhdAogICAgYnl0ZWMgNyAvLyAweDAwMDY2YzJlNzQ3OTcwNjUKICAgIGNvbmNhdAogICAgYnVyeSA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6MTAyCiAgICAvLyByb290cyA9IEJveE1hcDxSb290S2V5LCBieXRlczwzMj4+KHsga2V5UHJlZml4OiBNZXRhTWVya2xlc0JveFByZWZpeFJvb3RzIH0pCiAgICBieXRlYyA1IC8vICJyIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGJ1cnkgOQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjE2OQogICAgLy8gbG9nZ2VkQXNzZXJ0KCF0aGlzLnJvb3RzKHJvb3RLZXkpLmV4aXN0cywgRVJSX05BTUVfVEFLRU4pCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGFkZFJvb3RfYWZ0ZXJfYXNzZXJ0QDcKICAgIHB1c2hieXRlcyAiRVJSOk5US04iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TlRLTgoKYWRkUm9vdF9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czoxMDQKICAgIC8vIGRhdGEgPSBCb3hNYXA8RGF0YUtleSwgc3RyaW5nPih7IGtleVByZWZpeDogTWV0YU1lcmtsZXNCb3hQcmVmaXhEYXRhIH0pCiAgICBieXRlY18yIC8vICJkIgogICAgZGlnIDYKICAgIGNvbmNhdAogICAgZHVwCiAgICBidXJ5IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czoxNzAKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5kYXRhKHR5cGVLZXkpLmV4aXN0cywgRVJSX1RSRUVfVFlQRV9LRVlfQUxSRUFEWV9FWElTVFMpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGFkZFJvb3RfYWZ0ZXJfYXNzZXJ0QDkKICAgIHB1c2hieXRlcyAiRVJSOkVUUksiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6RVRSSwoKYWRkUm9vdF9hZnRlcl9hc3NlcnRAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czoxNzIKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgRVJSX0lOVkFMSURfUEFZTUVOVF9SRUNFSVZFUikKICAgIGRpZyA0CiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogYWRkUm9vdF9hZnRlcl9hc3NlcnRAMTEKICAgIGJ5dGVjIDggLy8gIkVSUjpJUE1SIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQTVIKCmFkZFJvb3RfYWZ0ZXJfYXNzZXJ0QDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjE3MwogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSB0aGlzLnJvb3RDb3N0cyhuYW1lKSwgRVJSX0lOVkFMSURfUEFZTUVOVF9BTU9VTlQpCiAgICBkaWcgNAogICAgZ3R4bnMgQW1vdW50CiAgICBkaWcgNAogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGFNZXJrbGVzLnJvb3RDb3N0cwogICAgPT0KICAgIGJueiBhZGRSb290X2FmdGVyX2Fzc2VydEAxMwogICAgYnl0ZWMgOSAvLyAiRVJSOklQTUEiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBNQQoKYWRkUm9vdF9hZnRlcl9hc3NlcnRAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6MTc1CiAgICAvLyB0aGlzLnJvb3RzKHJvb3RLZXkpLnZhbHVlID0gcm9vdAogICAgZGlnIDcKICAgIGRpZyAzCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6MTc2CiAgICAvLyB0aGlzLmRhdGEodHlwZUtleSkudmFsdWUgPSBTdHJpbmcoaXRvYih0eXBlKSkKICAgIGRpZyA2CiAgICBkdXAKICAgIGJveF9kZWwKICAgIHBvcAogICAgZGlnIDkKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czoxNTUtMTYwCiAgICAvLyBhZGRSb290KAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIG5hbWU6IHN0cmluZywKICAgIC8vICAgcm9vdDogYnl0ZXM8MzI+LAogICAgLy8gICB0eXBlOiB1aW50NjQKICAgIC8vICk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czo6TWV0YU1lcmtsZXMuZGVsZXRlUm9vdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmRlbGV0ZVJvb3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6MTg0CiAgICAvLyBkZWxldGVSb290KG5hbWU6IHN0cmluZyk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjE4NQogICAgLy8gY29uc3QgdHJ1bmNhdGVkQWRkcmVzcyA9IGJ5dGVzMTYoVHhuLnNlbmRlci5ieXRlcykKICAgIHR4biBTZW5kZXIKICAgIGNhbGxzdWIgYnl0ZXMxNgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjE4NwogICAgLy8gY29uc3Qgcm9vdEtleTogUm9vdEtleSA9IHsgYWRkcmVzczogVHhuLnNlbmRlciwgbmFtZSB9CiAgICB0eG4gU2VuZGVyCiAgICBkaWcgMgogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgdW5jb3ZlciAzCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGJ5dGVjIDQgLy8gMHgwMDIyCiAgICBjb25jYXQKICAgIGRpZyAxCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czoxODgKICAgIC8vIGNvbnN0IHR5cGVLZXk6IERhdGFLZXkgPSB7IGFkZHJlc3M6IHRydW5jYXRlZEFkZHJlc3MsIG5hbWUsIGtleTogdHJlZVR5cGVLZXkgfQogICAgdW5jb3ZlciAyCiAgICBieXRlY18xIC8vIDB4MDAxNAogICAgY29uY2F0CiAgICBkaWcgMgogICAgbGVuCiAgICBwdXNoaW50IDIwCiAgICArCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGNvbmNhdAogICAgYnl0ZWMgNyAvLyAweDAwMDY2YzJlNzQ3OTcwNjUKICAgIGNvbmNhdAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjEwMgogICAgLy8gcm9vdHMgPSBCb3hNYXA8Um9vdEtleSwgYnl0ZXM8MzI+Pih7IGtleVByZWZpeDogTWV0YU1lcmtsZXNCb3hQcmVmaXhSb290cyB9KQogICAgYnl0ZWMgNSAvLyAiciIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6MTkwCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5yb290cyhyb290S2V5KS5leGlzdHMsIEVSUl9OT19OQU1FKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogZGVsZXRlUm9vdF9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMTAgLy8gIkVSUjpOTkFNIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5OQU0KCmRlbGV0ZVJvb3RfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6MTkyCiAgICAvLyB0aGlzLnJvb3RzKHJvb3RLZXkpLmRlbGV0ZSgpCiAgICBkdXAKICAgIGJveF9kZWwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjEwNAogICAgLy8gZGF0YSA9IEJveE1hcDxEYXRhS2V5LCBzdHJpbmc+KHsga2V5UHJlZml4OiBNZXRhTWVya2xlc0JveFByZWZpeERhdGEgfSkKICAgIGJ5dGVjXzIgLy8gImQiCiAgICBkaWcgMgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6MTkzCiAgICAvLyB0aGlzLmRhdGEodHlwZUtleSkuZGVsZXRlKCkKICAgIGJveF9kZWwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjE5Ni0yMDEKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIGFtb3VudDogdGhpcy5yb290Q29zdHMobmFtZSksCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjE5OAogICAgLy8gcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6MTk5CiAgICAvLyBhbW91bnQ6IHRoaXMucm9vdENvc3RzKG5hbWUpLAogICAgZGlnIDMKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjpNZXRhTWVya2xlcy5yb290Q29zdHMKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6MTk2LTIwMAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgYW1vdW50OiB0aGlzLnJvb3RDb3N0cyhuYW1lKSwKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czoxOTYtMjAxCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICBhbW91bnQ6IHRoaXMucm9vdENvc3RzKG5hbWUpLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6MTg0CiAgICAvLyBkZWxldGVSb290KG5hbWU6IHN0cmluZyk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czo6TWV0YU1lcmtsZXMudXBkYXRlUm9vdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZVJvb3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6MjEwCiAgICAvLyB1cGRhdGVSb290KG5hbWU6IHN0cmluZywgbmV3Um9vdDogYnl0ZXM8MzI+KTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6MjExCiAgICAvLyBjb25zdCBrZXk6IFJvb3RLZXkgPSB7IGFkZHJlc3M6IFR4bi5zZW5kZXIsIG5hbWUgfQogICAgdHhuIFNlbmRlcgogICAgZGlnIDEKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICBzd2FwCiAgICBieXRlYyA0IC8vIDB4MDAyMgogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czoxMDIKICAgIC8vIHJvb3RzID0gQm94TWFwPFJvb3RLZXksIGJ5dGVzPDMyPj4oeyBrZXlQcmVmaXg6IE1ldGFNZXJrbGVzQm94UHJlZml4Um9vdHMgfSkKICAgIGJ5dGVjIDUgLy8gInIiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjIxMgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucm9vdHMoa2V5KS5leGlzdHMsIEVSUl9OT19OQU1FKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogdXBkYXRlUm9vdF9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMTAgLy8gIkVSUjpOTkFNIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5OQU0KCnVwZGF0ZVJvb3RfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6MjEzCiAgICAvLyB0aGlzLnJvb3RzKGtleSkudmFsdWUgPSBuZXdSb290CiAgICBkdXAKICAgIGRpZyAyCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6MjEwCiAgICAvLyB1cGRhdGVSb290KG5hbWU6IHN0cmluZywgbmV3Um9vdDogYnl0ZXM8MzI+KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjpNZXRhTWVya2xlcy5hZGREYXRhW3JvdXRpbmddKCkgLT4gdm9pZDoKYWRkRGF0YToKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6MjI1CiAgICAvLyBhZGREYXRhKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgbmFtZTogc3RyaW5nLCBrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IHZvaWQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgZHVwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgZHVwCiAgICBjb3ZlciAyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjIyNgogICAgLy8gY29uc3Qgcm9vdEtleTogUm9vdEtleSA9IHsgYWRkcmVzczogVHhuLnNlbmRlciwgbmFtZSB9CiAgICB0eG4gU2VuZGVyCiAgICBkaWcgMgogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgdW5jb3ZlciAzCiAgICBjb25jYXQKICAgIGR1cAogICAgY292ZXIgMwogICAgc3dhcAogICAgYnl0ZWMgNCAvLyAweDAwMjIKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6MjI5CiAgICAvLyBsb2dnZWRBc3NlcnQoa2V5Qnl0ZXMubGVuZ3RoIDw9IG1heERhdGFLZXlMZW5ndGgsIEVSUl9LRVlfVE9PX0xPTkcpCiAgICBsZW4KICAgIGR1cAogICAgcHVzaGludCAxNQogICAgPD0KICAgIGJueiBhZGREYXRhX2FmdGVyX2Fzc2VydEAzCiAgICBwdXNoYnl0ZXMgIkVSUjpLVEwiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6S1RMCgphZGREYXRhX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjIzMAogICAgLy8gbG9nZ2VkQXNzZXJ0KEJ5dGVzKHZhbHVlKS5sZW5ndGggPD0gbWF4RGF0YUxlbmd0aCwgRVJSX0RBVEFfVE9PX0xPTkcpCiAgICBkaWcgMwogICAgbGVuCiAgICBwdXNoaW50IDEwMjQKICAgIDw9CiAgICBibnogYWRkRGF0YV9hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgMTEgLy8gIkVSUjpEVEwiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6RFRMCgphZGREYXRhX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjIzMgogICAgLy8ga2V5Qnl0ZXMubGVuZ3RoIDwgMiB8fCAhKGtleUJ5dGVzLnNsaWNlKDAsIDIpID09PSBCeXRlcyhyZXNlcnZlZERhdGFLZXlQcmVmaXgpKSwKICAgIGR1cAogICAgaW50Y18yIC8vIDIKICAgIDwKICAgIGJueiBhZGREYXRhX2Jvb2xfdHJ1ZUA3CiAgICBpbnRjXzAgLy8gMAogICAgZGlnIDEKICAgIGR1cAogICAgY292ZXIgMgogICAgPj0KICAgIGludGNfMCAvLyAwCiAgICBkaWcgMgogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIGludGNfMiAvLyAyCiAgICBkaWcgMgogICAgPj0KICAgIGludGNfMiAvLyAyCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBkaWcgNgogICAgY292ZXIgMgogICAgc3Vic3RyaW5nMwogICAgcHVzaGJ5dGVzICJsLiIKICAgID09CiAgICBibnogYWRkRGF0YV9ib29sX2ZhbHNlQDgKCmFkZERhdGFfYm9vbF90cnVlQDc6CiAgICBpbnRjXzEgLy8gMQoKYWRkRGF0YV9ib29sX21lcmdlQDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6MjMxLTIzNAogICAgLy8gbG9nZ2VkQXNzZXJ0KAogICAgLy8gICBrZXlCeXRlcy5sZW5ndGggPCAyIHx8ICEoa2V5Qnl0ZXMuc2xpY2UoMCwgMikgPT09IEJ5dGVzKHJlc2VydmVkRGF0YUtleVByZWZpeCkpLAogICAgLy8gICBFUlJfUkVTRVJWRURfS0VZX1BSRUZJWAogICAgLy8gKQogICAgYm56IGFkZERhdGFfYWZ0ZXJfYXNzZXJ0QDExCiAgICBwdXNoYnl0ZXMgIkVSUjpSS1AiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6UktQCgphZGREYXRhX2FmdGVyX2Fzc2VydEAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czoxMDIKICAgIC8vIHJvb3RzID0gQm94TWFwPFJvb3RLZXksIGJ5dGVzPDMyPj4oeyBrZXlQcmVmaXg6IE1ldGFNZXJrbGVzQm94UHJlZml4Um9vdHMgfSkKICAgIGJ5dGVjIDUgLy8gInIiCiAgICBkaWcgMgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6MjM1CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5yb290cyhyb290S2V5KS5leGlzdHMsIEVSUl9OT19ST09UX0ZPUl9EQVRBKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogYWRkRGF0YV9hZnRlcl9hc3NlcnRAMTMKICAgIHB1c2hieXRlcyAiRVJSOk5SRkQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TlJGRAoKYWRkRGF0YV9hZnRlcl9hc3NlcnRAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6MjM3CiAgICAvLyBjb25zdCBjb3N0cyA9IHRoaXMubWJyKCcnLCAnJywgbmFtZSwga2V5LCB2YWx1ZSkKICAgIGJ5dGVjXzAgLy8gIiIKICAgIGR1cAogICAgZGlnIDcKICAgIGRpZyA3CiAgICBkaWcgNwogICAgY2FsbHN1YiBtYnIKICAgIGJ1cnkgOAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjIzOQogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfSU5WQUxJRF9QQVlNRU5UX1JFQ0VJVkVSKQogICAgZGlnIDYKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBhZGREYXRhX2FmdGVyX2Fzc2VydEAxNQogICAgYnl0ZWMgOCAvLyAiRVJSOklQTVIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBNUgoKYWRkRGF0YV9hZnRlcl9hc3NlcnRAMTU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6MjQwCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IGNvc3RzLmRhdGEsIEVSUl9JTlZBTElEX1BBWU1FTlRfQU1PVU5UKQogICAgZGlnIDYKICAgIGd0eG5zIEFtb3VudAogICAgZGlnIDgKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICA9PQogICAgYm56IGFkZERhdGFfYWZ0ZXJfYXNzZXJ0QDE3CiAgICBieXRlYyA5IC8vICJFUlI6SVBNQSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUE1BCgphZGREYXRhX2FmdGVyX2Fzc2VydEAxNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czoyNDIKICAgIC8vIGNvbnN0IHRydW5jYXRlZEFkZHJlc3MgPSBieXRlczE2KFR4bi5zZW5kZXIuYnl0ZXMpCiAgICB0eG4gU2VuZGVyCiAgICBjYWxsc3ViIGJ5dGVzMTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czoyNDMKICAgIC8vIGNvbnN0IGRhdGFLZXk6IERhdGFLZXkgPSB7IGFkZHJlc3M6IHRydW5jYXRlZEFkZHJlc3MsIG5hbWUsIGtleSB9CiAgICBieXRlY18xIC8vIDB4MDAxNAogICAgY29uY2F0CiAgICBkaWcgMwogICAgZHVwCiAgICBjb3ZlciAyCiAgICBsZW4KICAgIHB1c2hpbnQgMjAKICAgICsKICAgIGRpZyAzCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgZGlnIDgKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6MTA0CiAgICAvLyBkYXRhID0gQm94TWFwPERhdGFLZXksIHN0cmluZz4oeyBrZXlQcmVmaXg6IE1ldGFNZXJrbGVzQm94UHJlZml4RGF0YSB9KQogICAgYnl0ZWNfMiAvLyAiZCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjI0NQogICAgLy8gdGhpcy5kYXRhKGRhdGFLZXkpLnZhbHVlID0gdmFsdWUKICAgIGR1cAogICAgYm94X2RlbAogICAgcG9wCiAgICBkaWcgNAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjIyNQogICAgLy8gYWRkRGF0YShwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIG5hbWU6IHN0cmluZywga2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmFkZERhdGFfYm9vbF9mYWxzZUA4OgogICAgaW50Y18wIC8vIDAKICAgIGIgYWRkRGF0YV9ib29sX21lcmdlQDkKCgovLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGFNZXJrbGVzLmRlbGV0ZURhdGFbcm91dGluZ10oKSAtPiB2b2lkOgpkZWxldGVEYXRhOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjI1NAogICAgLy8gZGVsZXRlRGF0YShuYW1lOiBzdHJpbmcsIGtleTogc3RyaW5nKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgZHVwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czoyNTUKICAgIC8vIGNvbnN0IHRydW5jYXRlZEFkZHJlc3MgPSBieXRlczE2KFR4bi5zZW5kZXIuYnl0ZXMpCiAgICB0eG4gU2VuZGVyCiAgICBjYWxsc3ViIGJ5dGVzMTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czoyNTYKICAgIC8vIGNvbnN0IGRhdGFLZXk6IERhdGFLZXkgPSB7IGFkZHJlc3M6IHRydW5jYXRlZEFkZHJlc3MsIG5hbWUsIGtleSB9CiAgICBkaWcgMQogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgdW5jb3ZlciAyCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGJ5dGVjXzEgLy8gMHgwMDE0CiAgICBjb25jYXQKICAgIGRpZyAxCiAgICBsZW4KICAgIHB1c2hpbnQgMjAKICAgICsKICAgIGRpZyAzCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICB1bmNvdmVyIDQKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6MTA0CiAgICAvLyBkYXRhID0gQm94TWFwPERhdGFLZXksIHN0cmluZz4oeyBrZXlQcmVmaXg6IE1ldGFNZXJrbGVzQm94UHJlZml4RGF0YSB9KQogICAgYnl0ZWNfMiAvLyAiZCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6MjU4CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5kYXRhKGRhdGFLZXkpLmV4aXN0cywgRVJSX05PX0RBVEEpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBkZWxldGVEYXRhX2FmdGVyX2Fzc2VydEAzCiAgICBwdXNoYnl0ZXMgIkVSUjpORFRBIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5EVEEKCmRlbGV0ZURhdGFfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6MjYxCiAgICAvLyBjb25zdCBjb3N0cyA9IHRoaXMubWJyKCcnLCAnJywgbmFtZSwga2V5LCB0aGlzLmRhdGEoZGF0YUtleSkudmFsdWUpCiAgICBkdXBuIDIKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBieXRlY18wIC8vICIiCiAgICBkdXAKICAgIGRpZyA2CiAgICBkaWcgNgogICAgdW5jb3ZlciA0CiAgICBjYWxsc3ViIG1icgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjI2MwogICAgLy8gdGhpcy5kYXRhKGRhdGFLZXkpLmRlbGV0ZSgpCiAgICBzd2FwCiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czoyNjUtMjcwCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICBhbW91bnQ6IGNvc3RzLmRhdGEsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjI2NwogICAgLy8gcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6MjY4CiAgICAvLyBhbW91bnQ6IGNvc3RzLmRhdGEsCiAgICBzd2FwCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czoyNjUtMjY5CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICBhbW91bnQ6IGNvc3RzLmRhdGEsCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6MjY1LTI3MAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgYW1vdW50OiBjb3N0cy5kYXRhLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6MjU0CiAgICAvLyBkZWxldGVEYXRhKG5hbWU6IHN0cmluZywga2V5OiBzdHJpbmcpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGFNZXJrbGVzLnZlcmlmeVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnZlcmlmeToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czoyODQKICAgIC8vIHZlcmlmeShhZGRyZXNzOiBBY2NvdW50LCBuYW1lOiBzdHJpbmcsIGxlYWY6IExlYWYsIHByb29mOiBQcm9vZiwgdHlwZTogdWludDY0KTogYm9vbGVhbiB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAzMgogICAgKgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxieXRlc1szMl0+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA1CiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGFNZXJrbGVzLnZlcmlmeQogICAgcG9wCiAgICBwdXNoYnl0ZXMgMHgwMAogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMgogICAgc2V0Yml0CiAgICBieXRlY18zIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjpNZXRhTWVya2xlcy5yZWFkW3JvdXRpbmddKCkgLT4gdm9pZDoKcmVhZDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czozMTcKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjpNZXRhTWVya2xlcy5yZWFkCiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYnl0ZWNfMyAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czo6TWV0YU1lcmtsZXMudmVyaWZpZWRSZWFkW3JvdXRpbmddKCkgLT4gdm9pZDoKdmVyaWZpZWRSZWFkOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjM0MgogICAgLy8gdmVyaWZpZWRSZWFkKGFkZHJlc3M6IEFjY291bnQsIG5hbWU6IHN0cmluZywgbGVhZjogTGVhZiwgcHJvb2Y6IFByb29mLCB0eXBlOiB1aW50NjQsIGtleTogc3RyaW5nKTogc3RyaW5nIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cG4gMgogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIGR1cAogICAgY292ZXIgMgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMzIKICAgICoKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8Ynl0ZXNbMzJdPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDYKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBjb3ZlciA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6MzQzCiAgICAvLyBjb25zdCB2ZXJpZmllZCA9IHRoaXMudmVyaWZ5KGFkZHJlc3MsIG5hbWUsIGxlYWYsIHByb29mLCB0eXBlKQogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGFNZXJrbGVzLnZlcmlmeQogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6MzQ0CiAgICAvLyBpZiAoIXZlcmlmaWVkKSB7CiAgICBibnogdmVyaWZpZWRSZWFkX2FmdGVyX2lmX2Vsc2VAMwogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjM0NQogICAgLy8gcmV0dXJuICcnCiAgICBieXRlY18wIC8vICIiCgp2ZXJpZmllZFJlYWRfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGFNZXJrbGVzLnZlcmlmaWVkUmVhZEA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjM0MgogICAgLy8gdmVyaWZpZWRSZWFkKGFkZHJlc3M6IEFjY291bnQsIG5hbWU6IHN0cmluZywgbGVhZjogTGVhZiwgcHJvb2Y6IFByb29mLCB0eXBlOiB1aW50NjQsIGtleTogc3RyaW5nKTogc3RyaW5nIHsKICAgIGR1cAogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgc3dhcAogICAgY29uY2F0CiAgICBieXRlY18zIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgp2ZXJpZmllZFJlYWRfYWZ0ZXJfaWZfZWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjM0NwogICAgLy8gcmV0dXJuIHRoaXMucmVhZChhZGRyZXNzLCBuYW1lLCBrZXkpCiAgICBkaWcgMgogICAgZGlnIDIKICAgIGRpZyAyCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czo6TWV0YU1lcmtsZXMucmVhZAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjM0MgogICAgLy8gdmVyaWZpZWRSZWFkKGFkZHJlc3M6IEFjY291bnQsIG5hbWU6IHN0cmluZywgbGVhZjogTGVhZiwgcHJvb2Y6IFByb29mLCB0eXBlOiB1aW50NjQsIGtleTogc3RyaW5nKTogc3RyaW5nIHsKICAgIGIgdmVyaWZpZWRSZWFkX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjpNZXRhTWVya2xlcy52ZXJpZmllZFJlYWRANAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czo6TWV0YU1lcmtsZXMudmVyaWZpZWRNdXN0UmVhZFtyb3V0aW5nXSgpIC0+IHZvaWQ6CnZlcmlmaWVkTXVzdFJlYWQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6MzY5LTM3NgogICAgLy8gdmVyaWZpZWRNdXN0UmVhZCgKICAgIC8vICAgYWRkcmVzczogQWNjb3VudCwKICAgIC8vICAgbmFtZTogc3RyaW5nLAogICAgLy8gICBsZWFmOiBMZWFmLAogICAgLy8gICBwcm9vZjogUHJvb2YsCiAgICAvLyAgIHR5cGU6IHVpbnQ2NCwKICAgIC8vICAga2V5OiBzdHJpbmcKICAgIC8vICk6IHN0cmluZyB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXBuIDIKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDMyCiAgICAqCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGJ5dGVzWzMyXT4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDUKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA2CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgY292ZXIgNQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjM3NwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMudmVyaWZ5KGFkZHJlc3MsIG5hbWUsIGxlYWYsIHByb29mLCB0eXBlKSwgRVJSX0ZBSUxFRF9UT19WRVJJRllfSU5DTFVTSU9OKQogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGFNZXJrbGVzLnZlcmlmeQogICAgcG9wCiAgICBibnogdmVyaWZpZWRNdXN0UmVhZF9hZnRlcl9hc3NlcnRAMwogICAgcHVzaGJ5dGVzICJFUlI6RlZSSSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpGVlJJCgp2ZXJpZmllZE11c3RSZWFkX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjM3OAogICAgLy8gcmV0dXJuIHRoaXMucmVhZChhZGRyZXNzLCBuYW1lLCBrZXkpCiAgICBkaWcgMgogICAgZGlnIDIKICAgIGRpZyAyCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czo6TWV0YU1lcmtsZXMucmVhZAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjM2OS0zNzYKICAgIC8vIHZlcmlmaWVkTXVzdFJlYWQoCiAgICAvLyAgIGFkZHJlc3M6IEFjY291bnQsCiAgICAvLyAgIG5hbWU6IHN0cmluZywKICAgIC8vICAgbGVhZjogTGVhZiwKICAgIC8vICAgcHJvb2Y6IFByb29mLAogICAgLy8gICB0eXBlOiB1aW50NjQsCiAgICAvLyAgIGtleTogc3RyaW5nCiAgICAvLyApOiBzdHJpbmcgewogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJ5dGVjXzMgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGFNZXJrbGVzLmFkZFR5cGVbcm91dGluZ10oKSAtPiB2b2lkOgphZGRUeXBlOgogICAgaW50Y18wIC8vIDAKICAgIGR1cAogICAgYnl0ZWNfMCAvLyAiIgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6MzgxCiAgICAvLyBhZGRUeXBlKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgZGVzY3JpcHRpb246IHN0cmluZywgc2NoZW1hTGlzdDogU2NoZW1hTGlzdCk6IHZvaWQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXBuIDIKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgc3dhcAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjM4MgogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfSU5WQUxJRF9QQVlNRU5UX1JFQ0VJVkVSKQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IGFkZFR5cGVfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDggLy8gIkVSUjpJUE1SIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQTVIKCmFkZFR5cGVfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6MzgzCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IDEwMF8wMDBfMDAwLCBFUlJfSU5WQUxJRF9QQVlNRU5UX0FNT1VOVCkKICAgIGRpZyAzCiAgICBndHhucyBBbW91bnQKICAgIHB1c2hpbnQgMTAwMDAwMDAwCiAgICA9PQogICAgYm56IGFkZFR5cGVfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjIDkgLy8gIkVSUjpJUE1BIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQTUEKCmFkZFR5cGVfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6Mzg0CiAgICAvLyBsb2dnZWRBc3NlcnQoQnl0ZXMoZGVzY3JpcHRpb24pLmxlbmd0aCA8PSA4MDAsIEVSUl9EQVRBX1RPT19MT05HKQogICAgZGlnIDIKICAgIGxlbgogICAgZHVwCiAgICBidXJ5IDYKICAgIHB1c2hpbnQgODAwCiAgICA8PQogICAgYm56IGFkZFR5cGVfYWZ0ZXJfYXNzZXJ0QDcKICAgIGJ5dGVjIDExIC8vICJFUlI6RFRMIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkRUTAoKYWRkVHlwZV9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czozODYKICAgIC8vIGxldCBzY2hlbWE6IHN0cmluZyA9ICcnCiAgICBieXRlY18wIC8vICIiCiAgICBidXJ5IDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czozODcKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBzY2hlbWFMaXN0Lmxlbmd0aDsgaSArPSAxKSB7CiAgICBpbnRjXzAgLy8gMAogICAgYnVyeSA2CgphZGRUeXBlX3doaWxlX3RvcEA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjM4NwogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IHNjaGVtYUxpc3QubGVuZ3RoOyBpICs9IDEpIHsKICAgIGRpZyA1CiAgICBkaWcgMQogICAgPAogICAgYnogYWRkVHlwZV9hZnRlcl93aGlsZUA2NQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjM4OAogICAgLy8gc3dpdGNoIChzY2hlbWFMaXN0W2ldKSB7CiAgICBkaWcgMQogICAgZXh0cmFjdCAyIDAKICAgIGRpZyA2CiAgICBpbnRjXzEgLy8gMQogICAgZXh0cmFjdDMgLy8gb24gZXJyb3I6IGluZGV4IGFjY2VzcyBpcyBvdXQgb2YgYm91bmRzCiAgICBkdXAKICAgIGJ1cnkgOQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjM4OQogICAgLy8gY2FzZSBTY2hlbWFQYXJ0VWludDg6CiAgICBwdXNoYnl0ZXMgMHgwYQogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czozODktMzkxCiAgICAvLyBjYXNlIFNjaGVtYVBhcnRVaW50ODoKICAgIC8vICAgc2NoZW1hICs9IFNjaGVtYVBhcnRVaW50OFN0cmluZwogICAgLy8gICBicmVhawogICAgYnogYWRkVHlwZV9hZnRlcl9pZl9lbHNlQDEyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6MzkwCiAgICAvLyBzY2hlbWEgKz0gU2NoZW1hUGFydFVpbnQ4U3RyaW5nCiAgICBkaWcgNgogICAgcHVzaGJ5dGVzICJ1aW50OCIKICAgIGNvbmNhdAogICAgYnVyeSA3CgphZGRUeXBlX2Jsb2NrQDYxOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjQ0MgogICAgLy8gaWYgKHNjaGVtYUxpc3QubGVuZ3RoID4gMCAmJiBpICE9PSBzY2hlbWFMaXN0Lmxlbmd0aCAtIDEpIHsKICAgIGR1cAogICAgYnogYWRkVHlwZV9hZnRlcl9pZl9lbHNlQDY0CiAgICBkdXAKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkaWcgNgogICAgIT0KICAgIGJ6IGFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUA2NAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjQ0MwogICAgLy8gc2NoZW1hICs9ICcsJwogICAgZGlnIDYKICAgIHB1c2hieXRlcyAiLCIKICAgIGNvbmNhdAogICAgYnVyeSA3CgphZGRUeXBlX2FmdGVyX2lmX2Vsc2VANjQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6Mzg3CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgc2NoZW1hTGlzdC5sZW5ndGg7IGkgKz0gMSkgewogICAgZGlnIDUKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBidXJ5IDYKICAgIGIgYWRkVHlwZV93aGlsZV90b3BAOAoKYWRkVHlwZV9hZnRlcl9pZl9lbHNlQDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjM5MgogICAgLy8gY2FzZSBTY2hlbWFQYXJ0VWludDE2OgogICAgZGlnIDcKICAgIHB1c2hieXRlcyAweDBiCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjM5Mi0zOTQKICAgIC8vIGNhc2UgU2NoZW1hUGFydFVpbnQxNjoKICAgIC8vICAgc2NoZW1hICs9IFNjaGVtYVBhcnRVaW50MTZTdHJpbmcKICAgIC8vICAgYnJlYWsKICAgIGJ6IGFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUAxNQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjM5MwogICAgLy8gc2NoZW1hICs9IFNjaGVtYVBhcnRVaW50MTZTdHJpbmcKICAgIGRpZyA2CiAgICBwdXNoYnl0ZXMgInVpbnQxNiIKICAgIGNvbmNhdAogICAgYnVyeSA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6Mzk0CiAgICAvLyBicmVhawogICAgYiBhZGRUeXBlX2Jsb2NrQDYxCgphZGRUeXBlX2FmdGVyX2lmX2Vsc2VAMTU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6Mzk1CiAgICAvLyBjYXNlIFNjaGVtYVBhcnRVaW50MzI6CiAgICBkaWcgNwogICAgcHVzaGJ5dGVzIDB4MGMKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6Mzk1LTM5NwogICAgLy8gY2FzZSBTY2hlbWFQYXJ0VWludDMyOgogICAgLy8gICBzY2hlbWEgKz0gU2NoZW1hUGFydFVpbnQzMlN0cmluZwogICAgLy8gICBicmVhawogICAgYnogYWRkVHlwZV9hZnRlcl9pZl9lbHNlQDE4CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6Mzk2CiAgICAvLyBzY2hlbWEgKz0gU2NoZW1hUGFydFVpbnQzMlN0cmluZwogICAgZGlnIDYKICAgIHB1c2hieXRlcyAidWludDMyIgogICAgY29uY2F0CiAgICBidXJ5IDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czozOTcKICAgIC8vIGJyZWFrCiAgICBiIGFkZFR5cGVfYmxvY2tANjEKCmFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUAxODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czozOTgKICAgIC8vIGNhc2UgU2NoZW1hUGFydFVpbnQ2NDoKICAgIGRpZyA3CiAgICBwdXNoYnl0ZXMgMHgwZAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czozOTgtNDAwCiAgICAvLyBjYXNlIFNjaGVtYVBhcnRVaW50NjQ6CiAgICAvLyAgIHNjaGVtYSArPSBTY2hlbWFQYXJ0VWludDY0U3RyaW5nCiAgICAvLyAgIGJyZWFrCiAgICBieiBhZGRUeXBlX2FmdGVyX2lmX2Vsc2VAMjEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czozOTkKICAgIC8vIHNjaGVtYSArPSBTY2hlbWFQYXJ0VWludDY0U3RyaW5nCiAgICBkaWcgNgogICAgcHVzaGJ5dGVzICJ1aW50NjQiCiAgICBjb25jYXQKICAgIGJ1cnkgNwogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjQwMAogICAgLy8gYnJlYWsKICAgIGIgYWRkVHlwZV9ibG9ja0A2MQoKYWRkVHlwZV9hZnRlcl9pZl9lbHNlQDIxOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjQwMQogICAgLy8gY2FzZSBTY2hlbWFQYXJ0VWludDEyODoKICAgIGRpZyA3CiAgICBwdXNoYnl0ZXMgMHgwZQogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czo0MDEtNDAzCiAgICAvLyBjYXNlIFNjaGVtYVBhcnRVaW50MTI4OgogICAgLy8gICBzY2hlbWEgKz0gU2NoZW1hUGFydFVpbnQxMjhTdHJpbmcKICAgIC8vICAgYnJlYWsKICAgIGJ6IGFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUAyNAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjQwMgogICAgLy8gc2NoZW1hICs9IFNjaGVtYVBhcnRVaW50MTI4U3RyaW5nCiAgICBkaWcgNgogICAgcHVzaGJ5dGVzICJ1aW50MTI4IgogICAgY29uY2F0CiAgICBidXJ5IDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czo0MDMKICAgIC8vIGJyZWFrCiAgICBiIGFkZFR5cGVfYmxvY2tANjEKCmFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUAyNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czo0MDQKICAgIC8vIGNhc2UgU2NoZW1hUGFydFVpbnQyNTY6CiAgICBkaWcgNwogICAgcHVzaGJ5dGVzIDB4MGYKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6NDA0LTQwNgogICAgLy8gY2FzZSBTY2hlbWFQYXJ0VWludDI1NjoKICAgIC8vICAgc2NoZW1hICs9IFNjaGVtYVBhcnRVaW50MjU2U3RyaW5nCiAgICAvLyAgIGJyZWFrCiAgICBieiBhZGRUeXBlX2FmdGVyX2lmX2Vsc2VAMjcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czo0MDUKICAgIC8vIHNjaGVtYSArPSBTY2hlbWFQYXJ0VWludDI1NlN0cmluZwogICAgZGlnIDYKICAgIHB1c2hieXRlcyAidWludDI1NiIKICAgIGNvbmNhdAogICAgYnVyeSA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6NDA2CiAgICAvLyBicmVhawogICAgYiBhZGRUeXBlX2Jsb2NrQDYxCgphZGRUeXBlX2FmdGVyX2lmX2Vsc2VAMjc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6NDA3CiAgICAvLyBjYXNlIFNjaGVtYVBhcnRVaW50NTEyOgogICAgZGlnIDcKICAgIHB1c2hieXRlcyAweDEwCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjQwNy00MDkKICAgIC8vIGNhc2UgU2NoZW1hUGFydFVpbnQ1MTI6CiAgICAvLyAgIHNjaGVtYSArPSBTY2hlbWFQYXJ0VWludDUxMlN0cmluZwogICAgLy8gICBicmVhawogICAgYnogYWRkVHlwZV9hZnRlcl9pZl9lbHNlQDMwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6NDA4CiAgICAvLyBzY2hlbWEgKz0gU2NoZW1hUGFydFVpbnQ1MTJTdHJpbmcKICAgIGRpZyA2CiAgICBwdXNoYnl0ZXMgInVpbnQ1MTIiCiAgICBjb25jYXQKICAgIGJ1cnkgNwogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjQwOQogICAgLy8gYnJlYWsKICAgIGIgYWRkVHlwZV9ibG9ja0A2MQoKYWRkVHlwZV9hZnRlcl9pZl9lbHNlQDMwOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjQxMAogICAgLy8gY2FzZSBTY2hlbWFQYXJ0Qnl0ZXM0OgogICAgZGlnIDcKICAgIHB1c2hieXRlcyAweDE0CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjQxMC00MTIKICAgIC8vIGNhc2UgU2NoZW1hUGFydEJ5dGVzNDoKICAgIC8vICAgc2NoZW1hICs9IFNjaGVtYVBhcnRCeXRlczRTdHJpbmcKICAgIC8vICAgYnJlYWsKICAgIGJ6IGFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUAzMwogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjQxMQogICAgLy8gc2NoZW1hICs9IFNjaGVtYVBhcnRCeXRlczRTdHJpbmcKICAgIGRpZyA2CiAgICBwdXNoYnl0ZXMgImJ5dGVzNCIKICAgIGNvbmNhdAogICAgYnVyeSA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6NDEyCiAgICAvLyBicmVhawogICAgYiBhZGRUeXBlX2Jsb2NrQDYxCgphZGRUeXBlX2FmdGVyX2lmX2Vsc2VAMzM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6NDEzCiAgICAvLyBjYXNlIFNjaGVtYVBhcnRCeXRlczg6CiAgICBkaWcgNwogICAgcHVzaGJ5dGVzIDB4MTUKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6NDEzLTQxNQogICAgLy8gY2FzZSBTY2hlbWFQYXJ0Qnl0ZXM4OgogICAgLy8gICBzY2hlbWEgKz0gU2NoZW1hUGFydEJ5dGVzOFN0cmluZwogICAgLy8gICBicmVhawogICAgYnogYWRkVHlwZV9hZnRlcl9pZl9lbHNlQDM2CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6NDE0CiAgICAvLyBzY2hlbWEgKz0gU2NoZW1hUGFydEJ5dGVzOFN0cmluZwogICAgZGlnIDYKICAgIHB1c2hieXRlcyAiYnl0ZXM4IgogICAgY29uY2F0CiAgICBidXJ5IDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czo0MTUKICAgIC8vIGJyZWFrCiAgICBiIGFkZFR5cGVfYmxvY2tANjEKCmFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUAzNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czo0MTYKICAgIC8vIGNhc2UgU2NoZW1hUGFydEJ5dGVzMTY6CiAgICBkaWcgNwogICAgcHVzaGJ5dGVzIDB4MTYKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6NDE2LTQxOAogICAgLy8gY2FzZSBTY2hlbWFQYXJ0Qnl0ZXMxNjoKICAgIC8vICAgc2NoZW1hICs9IFNjaGVtYVBhcnRCeXRlczE2U3RyaW5nCiAgICAvLyAgIGJyZWFrCiAgICBieiBhZGRUeXBlX2FmdGVyX2lmX2Vsc2VAMzkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czo0MTcKICAgIC8vIHNjaGVtYSArPSBTY2hlbWFQYXJ0Qnl0ZXMxNlN0cmluZwogICAgZGlnIDYKICAgIHB1c2hieXRlcyAiYnl0ZXMxNiIKICAgIGNvbmNhdAogICAgYnVyeSA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6NDE4CiAgICAvLyBicmVhawogICAgYiBhZGRUeXBlX2Jsb2NrQDYxCgphZGRUeXBlX2FmdGVyX2lmX2Vsc2VAMzk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6NDE5CiAgICAvLyBjYXNlIFNjaGVtYVBhcnRCeXRlczMyOgogICAgZGlnIDcKICAgIHB1c2hieXRlcyAweDE3CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjQxOS00MjEKICAgIC8vIGNhc2UgU2NoZW1hUGFydEJ5dGVzMzI6CiAgICAvLyAgIHNjaGVtYSArPSBTY2hlbWFQYXJ0Qnl0ZXMzMlN0cmluZwogICAgLy8gICBicmVhawogICAgYnogYWRkVHlwZV9hZnRlcl9pZl9lbHNlQDQyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6NDIwCiAgICAvLyBzY2hlbWEgKz0gU2NoZW1hUGFydEJ5dGVzMzJTdHJpbmcKICAgIGRpZyA2CiAgICBwdXNoYnl0ZXMgImJ5dGVzMzIiCiAgICBjb25jYXQKICAgIGJ1cnkgNwogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjQyMQogICAgLy8gYnJlYWsKICAgIGIgYWRkVHlwZV9ibG9ja0A2MQoKYWRkVHlwZV9hZnRlcl9pZl9lbHNlQDQyOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjQyMgogICAgLy8gY2FzZSBTY2hlbWFQYXJ0Qnl0ZXM2NDoKICAgIGRpZyA3CiAgICBwdXNoYnl0ZXMgMHgxOAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czo0MjItNDI0CiAgICAvLyBjYXNlIFNjaGVtYVBhcnRCeXRlczY0OgogICAgLy8gICBzY2hlbWEgKz0gU2NoZW1hUGFydEJ5dGVzNjRTdHJpbmcKICAgIC8vICAgYnJlYWsKICAgIGJ6IGFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUA0NQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjQyMwogICAgLy8gc2NoZW1hICs9IFNjaGVtYVBhcnRCeXRlczY0U3RyaW5nCiAgICBkaWcgNgogICAgcHVzaGJ5dGVzICJieXRlczY0IgogICAgY29uY2F0CiAgICBidXJ5IDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czo0MjQKICAgIC8vIGJyZWFrCiAgICBiIGFkZFR5cGVfYmxvY2tANjEKCmFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUA0NToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czo0MjUKICAgIC8vIGNhc2UgU2NoZW1hUGFydEJ5dGVzMTI4OgogICAgZGlnIDcKICAgIHB1c2hieXRlcyAweDE5CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjQyNS00MjcKICAgIC8vIGNhc2UgU2NoZW1hUGFydEJ5dGVzMTI4OgogICAgLy8gICBzY2hlbWEgKz0gU2NoZW1hUGFydEJ5dGVzMTI4U3RyaW5nCiAgICAvLyAgIGJyZWFrCiAgICBieiBhZGRUeXBlX2FmdGVyX2lmX2Vsc2VANDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czo0MjYKICAgIC8vIHNjaGVtYSArPSBTY2hlbWFQYXJ0Qnl0ZXMxMjhTdHJpbmcKICAgIGRpZyA2CiAgICBwdXNoYnl0ZXMgImJ5dGVzMTI4IgogICAgY29uY2F0CiAgICBidXJ5IDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czo0MjcKICAgIC8vIGJyZWFrCiAgICBiIGFkZFR5cGVfYmxvY2tANjEKCmFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUA0ODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czo0MjgKICAgIC8vIGNhc2UgU2NoZW1hUGFydEJ5dGVzMjU2OgogICAgZGlnIDcKICAgIHB1c2hieXRlcyAweDFhCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjQyOC00MzAKICAgIC8vIGNhc2UgU2NoZW1hUGFydEJ5dGVzMjU2OgogICAgLy8gICBzY2hlbWEgKz0gU2NoZW1hUGFydEJ5dGVzMjU2U3RyaW5nCiAgICAvLyAgIGJyZWFrCiAgICBieiBhZGRUeXBlX2FmdGVyX2lmX2Vsc2VANTEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czo0MjkKICAgIC8vIHNjaGVtYSArPSBTY2hlbWFQYXJ0Qnl0ZXMyNTZTdHJpbmcKICAgIGRpZyA2CiAgICBwdXNoYnl0ZXMgImJ5dGVzMjU2IgogICAgY29uY2F0CiAgICBidXJ5IDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czo0MzAKICAgIC8vIGJyZWFrCiAgICBiIGFkZFR5cGVfYmxvY2tANjEKCmFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUA1MToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czo0MzEKICAgIC8vIGNhc2UgU2NoZW1hUGFydEJ5dGVzNTEyOgogICAgZGlnIDcKICAgIHB1c2hieXRlcyAweDFiCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjQzMS00MzMKICAgIC8vIGNhc2UgU2NoZW1hUGFydEJ5dGVzNTEyOgogICAgLy8gICBzY2hlbWEgKz0gU2NoZW1hUGFydEJ5dGVzNTEyU3RyaW5nCiAgICAvLyAgIGJyZWFrCiAgICBieiBhZGRUeXBlX2FmdGVyX2lmX2Vsc2VANTQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czo0MzIKICAgIC8vIHNjaGVtYSArPSBTY2hlbWFQYXJ0Qnl0ZXM1MTJTdHJpbmcKICAgIGRpZyA2CiAgICBwdXNoYnl0ZXMgImJ5dGVzNTEyIgogICAgY29uY2F0CiAgICBidXJ5IDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czo0MzMKICAgIC8vIGJyZWFrCiAgICBiIGFkZFR5cGVfYmxvY2tANjEKCmFkZFR5cGVfYWZ0ZXJfaWZfZWxzZUA1NDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czo0MzQKICAgIC8vIGNhc2UgU2NoZW1hUGFydFN0cmluZzoKICAgIGRpZyA3CiAgICBwdXNoYnl0ZXMgMHgxZQogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czo0MzQtNDM2CiAgICAvLyBjYXNlIFNjaGVtYVBhcnRTdHJpbmc6CiAgICAvLyAgIHNjaGVtYSArPSBTY2hlbWFQYXJ0U3RyaW5nU3RyaW5nCiAgICAvLyAgIGJyZWFrCiAgICBieiBhZGRUeXBlX2FmdGVyX2lmX2Vsc2VANTcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czo0MzUKICAgIC8vIHNjaGVtYSArPSBTY2hlbWFQYXJ0U3RyaW5nU3RyaW5nCiAgICBkaWcgNgogICAgcHVzaGJ5dGVzICJzdHJpbmciCiAgICBjb25jYXQKICAgIGJ1cnkgNwogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjQzNgogICAgLy8gYnJlYWsKICAgIGIgYWRkVHlwZV9ibG9ja0A2MQoKYWRkVHlwZV9hZnRlcl9pZl9lbHNlQDU3OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjQzNwogICAgLy8gY2FzZSBTY2hlbWFQYXJ0QWRkcmVzczoKICAgIGRpZyA3CiAgICBwdXNoYnl0ZXMgMHgyOAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czo0MzctNDM5CiAgICAvLyBjYXNlIFNjaGVtYVBhcnRBZGRyZXNzOgogICAgLy8gICBzY2hlbWEgKz0gU2NoZW1hUGFydEFkZHJlc3NTdHJpbmcKICAgIC8vICAgYnJlYWsKICAgIGJ6IGFkZFR5cGVfYmxvY2tANjEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czo0MzgKICAgIC8vIHNjaGVtYSArPSBTY2hlbWFQYXJ0QWRkcmVzc1N0cmluZwogICAgZGlnIDYKICAgIHB1c2hieXRlcyAiYWRkcmVzcyIKICAgIGNvbmNhdAogICAgYnVyeSA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6NDM5CiAgICAvLyBicmVhawogICAgYiBhZGRUeXBlX2Jsb2NrQDYxCgphZGRUeXBlX2FmdGVyX3doaWxlQDY1OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjEyNAogICAgLy8gY29uc3QgaWQgPSB0aGlzLnR5cGVzSUQudmFsdWUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6OTUKICAgIC8vIHR5cGVzSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBNZXRhTWVya2xlc0dsb2JhbFN0YXRlS2V5VHlwZXNJRCB9KQogICAgYnl0ZWMgNiAvLyAidHlwZXNfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6MTI0CiAgICAvLyBjb25zdCBpZCA9IHRoaXMudHlwZXNJRC52YWx1ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czoxMjUKICAgIC8vIHRoaXMudHlwZXNJRC52YWx1ZSArPSAxCiAgICBkdXAKICAgIGludGNfMSAvLyAxCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6OTUKICAgIC8vIHR5cGVzSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBNZXRhTWVya2xlc0dsb2JhbFN0YXRlS2V5VHlwZXNJRCB9KQogICAgYnl0ZWMgNiAvLyAidHlwZXNfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6MTI1CiAgICAvLyB0aGlzLnR5cGVzSUQudmFsdWUgKz0gMQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czo0NDktNDUyCiAgICAvLyB0aGlzLnR5cGVzKGlkKS52YWx1ZSA9IHsKICAgIC8vICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uLAogICAgLy8gICBzY2hlbWEsCiAgICAvLyB9CiAgICBkaWcgNwogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDQKICAgICsKICAgIGRpZyA3CiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgZGlnIDYKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHB1c2hieXRlcyAweDAwMDQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjQ0OQogICAgLy8gdGhpcy50eXBlcyhpZCkudmFsdWUgPSB7CiAgICBzd2FwCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6MTAwCiAgICAvLyB0eXBlcyA9IEJveE1hcDx1aW50NjQsIFR5cGVzVmFsdWU+KHsga2V5UHJlZml4OiBNZXRhTWVya2xlc0JveFByZWZpeFR5cGVzIH0pCiAgICBwdXNoYnl0ZXMgInQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czo0NDktNDUyCiAgICAvLyB0aGlzLnR5cGVzKGlkKS52YWx1ZSA9IHsKICAgIC8vICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uLAogICAgLy8gICBzY2hlbWEsCiAgICAvLyB9CiAgICBkdXAKICAgIGJveF9kZWwKICAgIHBvcAogICAgc3dhcAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjM4MQogICAgLy8gYWRkVHlwZShwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGRlc2NyaXB0aW9uOiBzdHJpbmcsIHNjaGVtYUxpc3Q6IFNjaGVtYUxpc3QpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGFNZXJrbGVzLnJvb3RDb3N0c1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnJvb3RDb3N0czoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czo0NTcKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjpNZXRhTWVya2xlcy5yb290Q29zdHMKICAgIGl0b2IKICAgIGJ5dGVjXzMgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGFNZXJrbGVzLmRhdGFDb3N0c1tyb3V0aW5nXSgpIC0+IHZvaWQ6CmRhdGFDb3N0czoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czo0NjMKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjQ2NQogICAgLy8gY29uc3QgY29zdHMgPSB0aGlzLm1icignJywgJycsIG5hbWUubmF0aXZlLCBrZXkubmF0aXZlLCB2YWx1ZS5uYXRpdmUpCiAgICB1bmNvdmVyIDIKICAgIGV4dHJhY3QgMiAwCiAgICB1bmNvdmVyIDIKICAgIGV4dHJhY3QgMiAwCiAgICB1bmNvdmVyIDIKICAgIGV4dHJhY3QgMiAwCiAgICBieXRlY18wIC8vICIiCiAgICBkdXAKICAgIGNvdmVyIDQKICAgIGNvdmVyIDQKICAgIGNhbGxzdWIgbWJyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6NDY2CiAgICAvLyByZXR1cm4gY29zdHMuZGF0YQogICAgZXh0cmFjdCAxNiA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6NDYzCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjXzMgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGFNZXJrbGVzLm1icih0eXBlRGVzY3JpcHRpb246IGJ5dGVzLCBzY2hlbWE6IGJ5dGVzLCByb290TmFtZTogYnl0ZXMsIGRhdGFLZXk6IGJ5dGVzLCBkYXRhVmFsdWU6IGJ5dGVzKSAtPiBieXRlczoKbWJyOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjEwOS0xMTUKICAgIC8vIHByaXZhdGUgbWJyKAogICAgLy8gICB0eXBlRGVzY3JpcHRpb246IHN0cmluZywKICAgIC8vICAgc2NoZW1hOiBzdHJpbmcsCiAgICAvLyAgIHJvb3ROYW1lOiBzdHJpbmcsCiAgICAvLyAgIGRhdGFLZXk6IHN0cmluZywKICAgIC8vICAgZGF0YVZhbHVlOiBzdHJpbmcKICAgIC8vICk6IE1ldGFNZXJrbGVzTUJSRGF0YSB7CiAgICBwcm90byA1IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czoxMTcKICAgIC8vIHR5cGVzOiBNaW5UeXBlc01CUiArIChCb3hDb3N0UGVyQnl0ZSAqIEJ5dGVzKHR5cGVEZXNjcmlwdGlvbikubGVuZ3RoICsgQnl0ZXMoc2NoZW1hKS5sZW5ndGgpLAogICAgZnJhbWVfZGlnIC01CiAgICBsZW4KICAgIGludGMgNCAvLyA0MDAKICAgICoKICAgIGZyYW1lX2RpZyAtNAogICAgbGVuCiAgICArCiAgICBwdXNoaW50IDkzMDAKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czoxMTgKICAgIC8vIHJvb3RzOiBNaW5Sb290c01CUiArIChCb3hDb3N0UGVyQnl0ZSAqIEJ5dGVzKHJvb3ROYW1lKS5sZW5ndGgpLAogICAgZnJhbWVfZGlnIC0zCiAgICBsZW4KICAgIGludGMgNCAvLyA0MDAKICAgIGRpZyAxCiAgICAqCiAgICBwdXNoaW50IDMwMTAwCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6MTE5CiAgICAvLyBkYXRhOiBNaW5EYXRhTUJSICsgKEJveENvc3RQZXJCeXRlICogKEJ5dGVzKHJvb3ROYW1lKS5sZW5ndGggKyBCeXRlcyhkYXRhS2V5KS5sZW5ndGggKyBCeXRlcyhkYXRhVmFsdWUpLmxlbmd0aCkpLAogICAgZnJhbWVfZGlnIC0yCiAgICBsZW4KICAgIHVuY292ZXIgMgogICAgKwogICAgZnJhbWVfZGlnIC0xCiAgICBsZW4KICAgICsKICAgIGludGMgNCAvLyA0MDAKICAgICoKICAgIHB1c2hpbnQgMTI1MDAKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czoxMTYtMTIwCiAgICAvLyByZXR1cm4gewogICAgLy8gICB0eXBlczogTWluVHlwZXNNQlIgKyAoQm94Q29zdFBlckJ5dGUgKiBCeXRlcyh0eXBlRGVzY3JpcHRpb24pLmxlbmd0aCArIEJ5dGVzKHNjaGVtYSkubGVuZ3RoKSwKICAgIC8vICAgcm9vdHM6IE1pblJvb3RzTUJSICsgKEJveENvc3RQZXJCeXRlICogQnl0ZXMocm9vdE5hbWUpLmxlbmd0aCksCiAgICAvLyAgIGRhdGE6IE1pbkRhdGFNQlIgKyAoQm94Q29zdFBlckJ5dGUgKiAoQnl0ZXMocm9vdE5hbWUpLmxlbmd0aCArIEJ5dGVzKGRhdGFLZXkpLmxlbmd0aCArIEJ5dGVzKGRhdGFWYWx1ZSkubGVuZ3RoKSksCiAgICAvLyB9CiAgICB1bmNvdmVyIDIKICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgaXRvYgogICAgY29uY2F0CiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czo6TWV0YU1lcmtsZXMudmVyaWZ5KGFkZHJlc3M6IGJ5dGVzLCBuYW1lOiBieXRlcywgbGVhZjogYnl0ZXMsIHByb29mOiBieXRlcywgdHlwZTogdWludDY0KSAtPiB1aW50NjQsIGJ5dGVzOgpzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGFNZXJrbGVzLnZlcmlmeToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czoyODQKICAgIC8vIHZlcmlmeShhZGRyZXNzOiBBY2NvdW50LCBuYW1lOiBzdHJpbmcsIGxlYWY6IExlYWYsIHByb29mOiBQcm9vZiwgdHlwZTogdWludDY0KTogYm9vbGVhbiB7CiAgICBwcm90byA1IDIKICAgIGludGNfMCAvLyAwCiAgICBkdXAKICAgIGJ5dGVjXzAgLy8gIiIKICAgIGR1cG4gMwogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjI4NQogICAgLy8gY29uc3QgdHJ1bmNhdGVkQWRkcmVzcyA9IGJ5dGVzMTYoYWRkcmVzcy5ieXRlcykKICAgIGZyYW1lX2RpZyAtNQogICAgY2FsbHN1YiBieXRlczE2CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6Mjg3CiAgICAvLyBjb25zdCByb290S2V5OiBSb290S2V5ID0geyBhZGRyZXNzLCBuYW1lIH0KICAgIGZyYW1lX2RpZyAtNAogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgZnJhbWVfZGlnIC00CiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtNQogICAgYnl0ZWMgNCAvLyAweDAwMjIKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjI4OAogICAgLy8gY29uc3QgdHlwZUtleTogRGF0YUtleSA9IHsgYWRkcmVzczogdHJ1bmNhdGVkQWRkcmVzcywgbmFtZSwga2V5OiB0cmVlVHlwZUtleSB9CiAgICB1bmNvdmVyIDIKICAgIGJ5dGVjXzEgLy8gMHgwMDE0CiAgICBjb25jYXQKICAgIGRpZyAyCiAgICBsZW4KICAgIHB1c2hpbnQgMjAKICAgICsKICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBjb25jYXQKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICBieXRlYyA3IC8vIDB4MDAwNjZjMmU3NDc5NzA2NQogICAgY29uY2F0CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6MTAyCiAgICAvLyByb290cyA9IEJveE1hcDxSb290S2V5LCBieXRlczwzMj4+KHsga2V5UHJlZml4OiBNZXRhTWVya2xlc0JveFByZWZpeFJvb3RzIH0pCiAgICBieXRlYyA1IC8vICJyIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czoyOTAKICAgIC8vIGlmICghdGhpcy5yb290cyhyb290S2V5KS5leGlzdHMgfHwgIXRoaXMuZGF0YSh0eXBlS2V5KS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjpNZXRhTWVya2xlcy52ZXJpZnlfaWZfYm9keUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6MTA0CiAgICAvLyBkYXRhID0gQm94TWFwPERhdGFLZXksIHN0cmluZz4oeyBrZXlQcmVmaXg6IE1ldGFNZXJrbGVzQm94UHJlZml4RGF0YSB9KQogICAgYnl0ZWNfMiAvLyAiZCIKICAgIGZyYW1lX2RpZyA2CiAgICBjb25jYXQKICAgIGR1cAogICAgZnJhbWVfYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6MjkwCiAgICAvLyBpZiAoIXRoaXMucm9vdHMocm9vdEtleSkuZXhpc3RzIHx8ICF0aGlzLmRhdGEodHlwZUtleSkuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGFNZXJrbGVzLnZlcmlmeV9hZnRlcl9pZl9lbHNlQDMKCnNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czo6TWV0YU1lcmtsZXMudmVyaWZ5X2lmX2JvZHlAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czoyOTEKICAgIC8vIHJldHVybiBmYWxzZQogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2RpZyAtMgogICAgZnJhbWVfYnVyeSAxCiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjpNZXRhTWVya2xlcy52ZXJpZnlfYWZ0ZXJfaWZfZWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjI5NAogICAgLy8gY29uc3QgdHJlZVR5cGUgPSBidG9pKEJ5dGVzKHRoaXMuZGF0YSh0eXBlS2V5KS52YWx1ZSkpCiAgICBmcmFtZV9kaWcgMQogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGJ0b2kKICAgIGZyYW1lX2J1cnkgNQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjI5NQogICAgLy8gaWYgKHR5cGUgIT09IE1lcmtsZVRyZWVUeXBlVW5zcGVjaWZpZWQgJiYgdHJlZVR5cGUgIT09IHR5cGUpIHsKICAgIGZyYW1lX2RpZyAtMQogICAgYnogc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjpNZXRhTWVya2xlcy52ZXJpZnlfYWZ0ZXJfaWZfZWxzZUA2CiAgICBmcmFtZV9kaWcgNQogICAgZnJhbWVfZGlnIC0xCiAgICAhPQogICAgYnogc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjpNZXRhTWVya2xlcy52ZXJpZnlfYWZ0ZXJfaWZfZWxzZUA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6Mjk2CiAgICAvLyByZXR1cm4gZmFsc2UKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9kaWcgLTIKICAgIGZyYW1lX2J1cnkgMQogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCnNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czo6TWV0YU1lcmtsZXMudmVyaWZ5X2FmdGVyX2lmX2Vsc2VANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czoyOTkKICAgIC8vIGVuc3VyZUJ1ZGdldChwcm9vZi5sZW5ndGggKiA1MCkKICAgIGZyYW1lX2RpZyAtMgogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGR1cAogICAgZnJhbWVfYnVyeSAyCiAgICBwdXNoaW50IDUwCiAgICAqCiAgICBwdXNoaW50IDEwCiAgICArCiAgICBmcmFtZV9idXJ5IDQKCnNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czo6TWV0YU1lcmtsZXMudmVyaWZ5X3doaWxlX3RvcEAxNToKICAgIGZyYW1lX2RpZyA0CiAgICBnbG9iYWwgT3Bjb2RlQnVkZ2V0CiAgICA+CiAgICBieiBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGFNZXJrbGVzLnZlcmlmeV9hZnRlcl93aGlsZUAyMAogICAgaXR4bl9iZWdpbgogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIHB1c2hpbnQgNSAvLyBEZWxldGVBcHBsaWNhdGlvbgogICAgaXR4bl9maWVsZCBPbkNvbXBsZXRpb24KICAgIGJ5dGVjIDEyIC8vIDB4MDY4MTAxCiAgICBpdHhuX2ZpZWxkIEFwcHJvdmFsUHJvZ3JhbQogICAgYnl0ZWMgMTIgLy8gMHgwNjgxMDEKICAgIGl0eG5fZmllbGQgQ2xlYXJTdGF0ZVByb2dyYW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGIgc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjpNZXRhTWVya2xlcy52ZXJpZnlfd2hpbGVfdG9wQDE1CgpzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGFNZXJrbGVzLnZlcmlmeV9hZnRlcl93aGlsZUAyMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czozMDIKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBwcm9vZi5sZW5ndGg7IGkgKz0gMSkgewogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2J1cnkgMwogICAgZnJhbWVfZGlnIC0zCiAgICBmcmFtZV9idXJ5IDAKCnNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czo6TWV0YU1lcmtsZXMudmVyaWZ5X3doaWxlX3RvcEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjMwMgogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IHByb29mLmxlbmd0aDsgaSArPSAxKSB7CiAgICBmcmFtZV9kaWcgMwogICAgZnJhbWVfZGlnIDIKICAgIDwKICAgIGJ6IHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czo6TWV0YU1lcmtsZXMudmVyaWZ5X2FmdGVyX3doaWxlQDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czozMDMKICAgIC8vIGhhc2ggPSB0aGlzLmhhc2gocHJvb2ZbaV0sIGhhc2gpCiAgICBmcmFtZV9kaWcgLTIKICAgIGV4dHJhY3QgMiAwCiAgICBmcmFtZV9kaWcgMwogICAgaW50Y18zIC8vIDMyCiAgICAqCiAgICBpbnRjXzMgLy8gMzIKICAgIGV4dHJhY3QzIC8vIG9uIGVycm9yOiBpbmRleCBhY2Nlc3MgaXMgb3V0IG9mIGJvdW5kcwogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6MTMwCiAgICAvLyBpZiAoQmlnVWludChhKSA+IEJpZ1VpbnQoYikpIHsKICAgIGZyYW1lX2RpZyAwCiAgICBiPgogICAgYnogc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjpNZXRhTWVya2xlcy52ZXJpZnlfYWZ0ZXJfaWZfZWxzZUAxMgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjEzMQogICAgLy8gcmV0dXJuIHNoYTI1NihiLmNvbmNhdChhKSkKICAgIGZyYW1lX2RpZyAwCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHNoYTI1NgogICAgZnJhbWVfYnVyeSAwCgpzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGFNZXJrbGVzLnZlcmlmeV9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czo6TWV0YU1lcmtsZXMuaGFzaEAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czozMDIKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBwcm9vZi5sZW5ndGg7IGkgKz0gMSkgewogICAgZnJhbWVfZGlnIDMKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBmcmFtZV9idXJ5IDMKICAgIGIgc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjpNZXRhTWVya2xlcy52ZXJpZnlfd2hpbGVfdG9wQDcKCnNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czo6TWV0YU1lcmtsZXMudmVyaWZ5X2FmdGVyX2lmX2Vsc2VAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6MTMzCiAgICAvLyByZXR1cm4gc2hhMjU2KGEuY29uY2F0KGIpKQogICAgZnJhbWVfZGlnIDAKICAgIGNvbmNhdAogICAgc2hhMjU2CiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czozMDMKICAgIC8vIGhhc2ggPSB0aGlzLmhhc2gocHJvb2ZbaV0sIGhhc2gpCiAgICBiIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czo6TWV0YU1lcmtsZXMudmVyaWZ5X2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjpNZXRhTWVya2xlcy5oYXNoQDEzCgpzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGFNZXJrbGVzLnZlcmlmeV9hZnRlcl93aGlsZUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjMwNgogICAgLy8gcmV0dXJuIGhhc2ggPT09IHRoaXMucm9vdHMocm9vdEtleSkudmFsdWUKICAgIGZyYW1lX2RpZyA3CiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZnJhbWVfZGlnIDAKICAgID09CiAgICBmcmFtZV9kaWcgLTIKICAgIGZyYW1lX2J1cnkgMQogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6Ok1ldGFNZXJrbGVzLnJlYWQoYWRkcmVzczogYnl0ZXMsIG5hbWU6IGJ5dGVzLCBrZXk6IGJ5dGVzKSAtPiBieXRlczoKc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjpNZXRhTWVya2xlcy5yZWFkOgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjMxNy0zMTgKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgLy8gcmVhZChhZGRyZXNzOiBBY2NvdW50LCBuYW1lOiBzdHJpbmcsIGtleTogc3RyaW5nKTogc3RyaW5nIHsKICAgIHByb3RvIDMgMQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjMxOQogICAgLy8gY29uc3QgdHJ1bmNhdGVkQWRkcmVzcyA9IGJ5dGVzMTYoYWRkcmVzcy5ieXRlcykKICAgIGZyYW1lX2RpZyAtMwogICAgY2FsbHN1YiBieXRlczE2CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6MzIwCiAgICAvLyByZXR1cm4gdGhpcy5kYXRhKHsgYWRkcmVzczogdHJ1bmNhdGVkQWRkcmVzcywgbmFtZSwga2V5IH0pLnZhbHVlCiAgICBmcmFtZV9kaWcgLTIKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIGZyYW1lX2RpZyAtMgogICAgY29uY2F0CiAgICBzd2FwCiAgICBieXRlY18xIC8vIDB4MDAxNAogICAgY29uY2F0CiAgICBkaWcgMQogICAgbGVuCiAgICBwdXNoaW50IDIwCiAgICArCiAgICBmcmFtZV9kaWcgLTEKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIGZyYW1lX2RpZyAtMQogICAgY29uY2F0CiAgICBzd2FwCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvY29udHJhY3QuYWxnby50czoxMDQKICAgIC8vIGRhdGEgPSBCb3hNYXA8RGF0YUtleSwgc3RyaW5nPih7IGtleVByZWZpeDogTWV0YU1lcmtsZXNCb3hQcmVmaXhEYXRhIH0pCiAgICBieXRlY18yIC8vICJkIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6MzIwCiAgICAvLyByZXR1cm4gdGhpcy5kYXRhKHsgYWRkcmVzczogdHJ1bmNhdGVkQWRkcmVzcywgbmFtZSwga2V5IH0pLnZhbHVlCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjpNZXRhTWVya2xlcy5yb290Q29zdHMobmFtZTogYnl0ZXMpIC0+IHVpbnQ2NDoKc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjpNZXRhTWVya2xlcy5yb290Q29zdHM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL2NvbnRyYWN0LmFsZ28udHM6NDU3LTQ1OAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICAvLyByb290Q29zdHMobmFtZTogc3RyaW5nKTogdWludDY0IHsKICAgIHByb3RvIDEgMQogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjQ1OQogICAgLy8gY29uc3QgY29zdHMgPSB0aGlzLm1icignJywgJycsIG5hbWUsIHRyZWVUeXBlS2V5LCBTdHJpbmcoaXRvYigwKSkpCiAgICBpbnRjXzAgLy8gMAogICAgaXRvYgogICAgYnl0ZWNfMCAvLyAiIgogICAgZHVwCiAgICBmcmFtZV9kaWcgLTEKICAgIHB1c2hieXRlcyAibC50eXBlIgogICAgdW5jb3ZlciA0CiAgICBjYWxsc3ViIG1icgogICAgLy8gc21hcnRfY29udHJhY3RzL21ldGEtbWVya2xlcy9jb250cmFjdC5hbGdvLnRzOjQ2MAogICAgLy8gcmV0dXJuIGNvc3RzLnJvb3RzICsgY29zdHMuZGF0YQogICAgZHVwCiAgICBwdXNoaW50IDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgKwogICAgcmV0c3ViCg==", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyAFAAECIJADJg0AAgAUAWQEFR98dQIAIgFyCHR5cGVzX2lkCAAGbC50eXBlCEVSUjpJUE1SCEVSUjpJUE1BCEVSUjpOTkFNB0VSUjpEVEwDBoEBMRkURDEYQQBcggwEokwGfATfKHp9BMbT1wQEQvxyAgQG04kEBCvzzFoEUMNuQQQM8bnPBB/3x0wEOcF97QRyslmBBHaDzSU2GgCODAA9AS4BmgHbAwUDlQPfBBgEiQUCB4wHpgCABExcYbo2GgCOAQABACcGImcjQ4oBAYv/FSJLAQ8iSwJPAk2BEEsCD4EQTwNPAk2L/04CUkkVgRASRIkiRwMxFiMJSTgQIxJENhoBSSJZJAhLARUSRFcCAEk2GgJJTgIVJRJENhoDSRWBCBJEF0wVSYEfDkAAC4AHRVJSOk5UTLAASwEWSUUKgAF0TFC9RQFAAAyACEVSUjpOVFJUsAAxAIj/cDEASwIWVwYCSwZQTCcEUEsBUE8CKVBLAhWBFAgWVwYCUE8CUCcHUEUHJwVMUElFCb1FAUEADIAIRVJSOk5US06wACpLBlBJRQi9RQFBAAyACEVSUjpFVFJLsABLBDgHMgoSQAAEJwiwAEsEOAhLBIgIMhJAAAQnCbAASwdLA79LBkm8SEsJvyNDNhoBSSJZJAhLARUSRFcCAEkxAIj+0TEASwIVFlcGAk8DUEwnBFBLAVBPAilQSwIVgRQIFlcGAlBPAlAnB1BMJwVMUEm9RQFAAAQnCrAASbxIKksCULxIsTEASwOIB7yyCLIHI7IQIrIBsyNDNhoBSSJZJAhLARUSRFcCADYaAklOAhUlEkQxAEsBFRZXBgJPAlBMJwRQTFAnBUxQSb1FAUAABCcKsABJSwK/I0MiMRYjCUk4ECMSRDYaAUkiWSQISwEVEkRXAgBJNhoCSSJZJAhLARUSRFcCAElOAjYaA0kiWSQISwEVEkRXAgBOAjEASwIVFlcGAk8DUElOA0wnBFBMUEwVSYEPDkAAC4AHRVJSOktUTLAASwMVgYAIDkAABCcLsABJJAxAACQiSwFJTgIPIksCTwJNJEsCDyRPA08CTUsGTgJSgAJsLhJAAIQjQAALgAdFUlI6UktQsAAnBUsCUL1FAUAADIAIRVJSOk5SRkSwAChJSwdLB0sHiAVARQhLBjgHMgoSQAAEJwiwAEsGOAhLCIEQWxJAAAQnCbAAMQCI/UEpUEsDSU4CFYEUCEsDFlcGAksIUEwWVwYCTwJMUE8CUExQKkxQSbxISwS/I0MiQv95NhoBSSJZJAhLARUSRFcCAEk2GgJJIlkkCEsBFRJEVwIASU8CMQCI/OdLARUWVwYCTwJQTClQSwEVgRQISwMVFlcGAk8EUEwWVwYCTwJMUE8CUExQKkxQSb1FAUAADIAIRVJSOk5EVEGwAEcCvkQoSUsGSwZPBIgEcEy8SLExAEyBEFuyCLIHI7IQIrIBsyNDNhoBSRUlEkQ2GgJJIlkkCEsBFRJEVwIANhoDSRUlEkQ2GgRJIlklCyQISwEVEkQ2GgVJFYEIEkQXiARXSIABACJPAlQrTFCwI0M2GgFJFSUSRDYaAkkiWSQISwEVEkRXAgA2GgNJIlkkCEsBFRJEVwIAiAUGSRUWVwYCTFArTFCwI0M2GgFHAhUlEkQ2GgJJIlkkCEsBFRJEVwIASU4CNhoDSRUlEkQ2GgRJIlklCyQISwEVEkQ2GgVJFYEIEkQXNhoGSSJZJAhLARUSRFcCAE4FiAO+SEAADyhJFRZXBgJMUCtMULAjQ0sCSwJLAogEikL/5jYaAUcCFSUSRDYaAkkiWSQISwEVEkRXAgBJTgI2GgNJFSUSRDYaBEkiWSULJAhLARUSRDYaBUkVgQgSRBc2GgZJIlkkCEsBFRJEVwIATgWIA01IQAAMgAhFUlI6RlZSSbAASwJLAksCiAQcSRUWVwYCTFArTFCwI0MiSShJMRYjCUcCOBAjEkQ2GgFJIlkkCEsBFRJEVwIATDYaAklOAkkiWUlOAyQITBUSRDgHMgoSQAAEJwiwAEsDOAiBgMLXLxJAAAQnCbAASwIVSUUGgaAGDkAABCcLsAAoRQciRQZLBUsBDEEB2ksBVwIASwYjWElFCYABChJBACpLBoAFdWludDhQRQdJQQARSSMJSwYTQQAISwaAASxQRQdLBSMIRQZC/7tLB4ABCxJBABBLBoAGdWludDE2UEUHQv/JSweAAQwSQQAQSwaABnVpbnQzMlBFB0L/sEsHgAENEkEAEEsGgAZ1aW50NjRQRQdC/5dLB4ABDhJBABFLBoAHdWludDEyOFBFB0L/fUsHgAEPEkEAEUsGgAd1aW50MjU2UEUHQv9jSweAARASQQARSwaAB3VpbnQ1MTJQRQdC/0lLB4ABFBJBABBLBoAGYnl0ZXM0UEUHQv8wSweAARUSQQAQSwaABmJ5dGVzOFBFB0L/F0sHgAEWEkEAEUsGgAdieXRlczE2UEUHQv79SweAARcSQQARSwaAB2J5dGVzMzJQRQdC/uNLB4ABGBJBABFLBoAHYnl0ZXM2NFBFB0L+yUsHgAEZEkEAEksGgAhieXRlczEyOFBFB0L+rksHgAEaEkEAEksGgAhieXRlczI1NlBFB0L+k0sHgAEbEkEAEksGgAhieXRlczUxMlBFB0L+eEsHgAEeEkEAEEsGgAZzdHJpbmdQRQdC/l9LB4ABKBJB/lZLBoAHYWRkcmVzc1BFB0L+RSInBmVESSMIJwZMZ0sHSRUWVwYCTFBJFYEECEsHFlcGAksGUEwWVwYCgAIABExQTwJQTFBMFoABdExQSbxITL8jQzYaAUkiWSQISwEVEkRXAgCIAaoWK0xQsCNDNhoBSSJZJAhLARUSRDYaAkkiWSQISwEVEkQ2GgNJIlkkCEsBFRJETwJXAgBPAlcCAE8CVwIAKElOBE4EiAAJVxAIK0xQsCNDigUBi/sVIQQLi/wVCIHUSAiL/RUhBEsBC4GU6wEIi/4VTwIIi/8VCCEEC4HUYQhPAhZPAhZQTBZQiYoFAiJJKEcDi/uI9+CL/BUWVwYCi/xQi/snBFBLAVBPAilQSwIVgRQIFlcGAlBPAlAnB1BMJwVMUEm9RQFBAA0qiwZQSYwBvUUBQAAIIov+jAGMAImLAb5EF4wFi/9BABCLBYv/E0EACCKL/owBjACJi/4iWUmMAoEyC4EKCIwEiwQyDA1BABixgQayEIEFshknDLIeJwyyHyKyAbNC/+AijAOL/YwAiwOLAgxBACuL/lcCAIsDJQslWEmLAKVBABCLAExQAYwAiwMjCIwDQv/WiwBQAYwAQv/uiwe+RIsAEov+jAGMAImKAwGL/Yj2/Yv+FRZXBgKL/lBMKVBLARWBFAiL/xUWVwYCi/9QTBZXBgJPAkxQTwJQTFAqTFC+RImKAQEiFihJi/+ABmwudHlwZU8EiP6PSYEIW0yBEFsIiQ==", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
var MetaMerklesParamsFactory = class _MetaMerklesParamsFactory {
  /**
   * Gets available create ABI call param factories
   */
  static get create() {
    return {
      _resolveByMethod(params) {
        switch (params.method) {
          case "create":
          case "create()void":
            return _MetaMerklesParamsFactory.create.create(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs create ABI call params for the MetaMerkles smart contract using the create()void ABI method
       *
       * @param params Parameters for the call
       * @returns An `AppClientMethodCallParams` object for the call
       */
      create(params) {
        return {
          ...params,
          method: "create()void",
          args: Array.isArray(params.args) ? params.args : []
        };
      }
    };
  }
  /**
     * Constructs a no op call for the addRoot(pay,string,byte[32],uint64)void ABI method
     *
    * Creates two boxes and adds a merkle root
    using a `RootKey` to the root box map and also a list type to the
    metadata attached to the root in the data box map
  
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
    * Registers a key & value in the data box map that
    corresponds to a merkle root in the root box map
  
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
   * Deletes a metadata key & value pair from the data box map
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
};
var MetaMerklesFactory = (_class = class {
  /**
   * The underlying `AppFactory` for when you want to have more flexibility
   */
  
  /**
   * Creates a new instance of `MetaMerklesFactory`
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
    return new MetaMerklesClient(this.appFactory.getAppClientById(params));
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
    return new MetaMerklesClient(await this.appFactory.getAppClientByCreatorAndName(params));
  }
  /**
   * Idempotently deploys the MetaMerkles smart contract.
   *
   * @param params The arguments for the contract calls and any additional parameters for the call
   * @returns The deployment result
   */
  async deploy(params = {}) {
    var _a;
    const result = await this.appFactory.deploy({
      ...params,
      createParams: ((_a = params.createParams) == null ? void 0 : _a.method) ? MetaMerklesParamsFactory.create._resolveByMethod(params.createParams) : params.createParams ? params.createParams : void 0
    });
    return { result: result.result, appClient: new MetaMerklesClient(result.appClient) };
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
       * Creates a new instance of the MetaMerkles smart contract using the create()void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create params
       */
      create: (params = { args: [] }) => {
        return this.appFactory.params.create(MetaMerklesParamsFactory.create.create(params));
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
       * Creates a new instance of the MetaMerkles smart contract using the create()void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create transaction
       */
      create: (params = { args: [] }) => {
        return this.appFactory.createTransaction.create(MetaMerklesParamsFactory.create.create(params));
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
       * Creates a new instance of the MetaMerkles smart contract using an ABI method call using the create()void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create result
       */
      create: async (params = { args: [] }) => {
        const result = await this.appFactory.send.create(MetaMerklesParamsFactory.create.create(params));
        return { result: { ...result.result, return: result.result.return }, appClient: new MetaMerklesClient(result.appClient) };
      }
    }
  }}
}, _class);
var MetaMerklesClient = (_class2 = class _MetaMerklesClient {
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
   * Returns a new `MetaMerklesClient` client, resolving the app by creator address and name
   * using AlgoKit app deployment semantics (i.e. looking for the app creation transaction note).
   * @param params The parameters to create the app client
   */
  static async fromCreatorAndName(params) {
    return new _MetaMerklesClient(await _appclient.AppClient.fromCreatorAndName({ ...params, appSpec: APP_SPEC }));
  }
  /**
   * Returns an `MetaMerklesClient` instance for the current network based on
   * pre-determined network-specific app IDs specified in the ARC-56 app spec.
   *
   * If no IDs are in the app spec or the network isn't recognised, an error is thrown.
   * @param params The parameters to create the app client
   */
  static async fromNetwork(params) {
    return new _MetaMerklesClient(await _appclient.AppClient.fromNetwork({ ...params, appSpec: APP_SPEC }));
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
     * Makes a clear_state call to an existing instance of the MetaMerkles smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.params.bare.clearState(params);
    },
    /**
         * Makes a call to the MetaMerkles smart contract using the `addRoot(pay,string,byte[32],uint64)void` ABI method.
         *
        * Creates two boxes and adds a merkle root
        using a `RootKey` to the root box map and also a list type to the
        metadata attached to the root in the data box map
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    addRoot: (params) => {
      return this.appClient.params.call(MetaMerklesParamsFactory.addRoot(params));
    },
    /**
     * Makes a call to the MetaMerkles smart contract using the `deleteRoot(string)void` ABI method.
     *
     * Deletes the merkle root from the root box map
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    deleteRoot: (params) => {
      return this.appClient.params.call(MetaMerklesParamsFactory.deleteRoot(params));
    },
    /**
     * Makes a call to the MetaMerkles smart contract using the `updateRoot(string,byte[32])void` ABI method.
     *
     * Replaces the merkle root with another
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    updateRoot: (params) => {
      return this.appClient.params.call(MetaMerklesParamsFactory.updateRoot(params));
    },
    /**
         * Makes a call to the MetaMerkles smart contract using the `addData(pay,string,string,string)void` ABI method.
         *
        * Registers a key & value in the data box map that
        corresponds to a merkle root in the root box map
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    addData: (params) => {
      return this.appClient.params.call(MetaMerklesParamsFactory.addData(params));
    },
    /**
     * Makes a call to the MetaMerkles smart contract using the `deleteData(string,string)void` ABI method.
     *
     * Deletes a metadata key & value pair from the data box map
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    deleteData: (params) => {
      return this.appClient.params.call(MetaMerklesParamsFactory.deleteData(params));
    },
    /**
     * Makes a call to the MetaMerkles smart contract using the `verify(address,string,byte[32],byte[32][],uint64)bool` ABI method.
     *
     * verify an inclusion in a double sha256 based merkle tree
     *
     * @param params The params for the smart contract call
     * @returns The call params: a boolean indicating whether the proof is valid
     */
    verify: (params) => {
      return this.appClient.params.call(MetaMerklesParamsFactory.verify(params));
    },
    /**
     * Makes a call to the MetaMerkles smart contract using the `read(address,string,string)string` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * Fetch a metadata properties
     *
     * @param params The params for the smart contract call
     * @returns The call params: the value set eg. `5` encoded as a bytestring for 5%
     */
    read: (params) => {
      return this.appClient.params.call(MetaMerklesParamsFactory.read(params));
    },
    /**
         * Makes a call to the MetaMerkles smart contract using the `verifiedRead(address,string,byte[32],byte[32][],uint64,string)string` ABI method.
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
      return this.appClient.params.call(MetaMerklesParamsFactory.verifiedRead(params));
    },
    /**
         * Makes a call to the MetaMerkles smart contract using the `verifiedMustRead(address,string,byte[32],byte[32][],uint64,string)string` ABI method.
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
      return this.appClient.params.call(MetaMerklesParamsFactory.verifiedMustRead(params));
    },
    /**
     * Makes a call to the MetaMerkles smart contract using the `addType(pay,string,uint8[])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    addType: (params) => {
      return this.appClient.params.call(MetaMerklesParamsFactory.addType(params));
    },
    /**
     * Makes a call to the MetaMerkles smart contract using the `rootCosts(string)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    rootCosts: (params) => {
      return this.appClient.params.call(MetaMerklesParamsFactory.rootCosts(params));
    },
    /**
     * Makes a call to the MetaMerkles smart contract using the `dataCosts(string,string,string)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    dataCosts: (params) => {
      return this.appClient.params.call(MetaMerklesParamsFactory.dataCosts(params));
    }
  }}
  /**
   * Create transactions for the current app
   */
  __init5() {this.createTransaction = {
    /**
     * Makes a clear_state call to an existing instance of the MetaMerkles smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.createTransaction.bare.clearState(params);
    },
    /**
         * Makes a call to the MetaMerkles smart contract using the `addRoot(pay,string,byte[32],uint64)void` ABI method.
         *
        * Creates two boxes and adds a merkle root
        using a `RootKey` to the root box map and also a list type to the
        metadata attached to the root in the data box map
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    addRoot: (params) => {
      return this.appClient.createTransaction.call(MetaMerklesParamsFactory.addRoot(params));
    },
    /**
     * Makes a call to the MetaMerkles smart contract using the `deleteRoot(string)void` ABI method.
     *
     * Deletes the merkle root from the root box map
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    deleteRoot: (params) => {
      return this.appClient.createTransaction.call(MetaMerklesParamsFactory.deleteRoot(params));
    },
    /**
     * Makes a call to the MetaMerkles smart contract using the `updateRoot(string,byte[32])void` ABI method.
     *
     * Replaces the merkle root with another
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    updateRoot: (params) => {
      return this.appClient.createTransaction.call(MetaMerklesParamsFactory.updateRoot(params));
    },
    /**
         * Makes a call to the MetaMerkles smart contract using the `addData(pay,string,string,string)void` ABI method.
         *
        * Registers a key & value in the data box map that
        corresponds to a merkle root in the root box map
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    addData: (params) => {
      return this.appClient.createTransaction.call(MetaMerklesParamsFactory.addData(params));
    },
    /**
     * Makes a call to the MetaMerkles smart contract using the `deleteData(string,string)void` ABI method.
     *
     * Deletes a metadata key & value pair from the data box map
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    deleteData: (params) => {
      return this.appClient.createTransaction.call(MetaMerklesParamsFactory.deleteData(params));
    },
    /**
     * Makes a call to the MetaMerkles smart contract using the `verify(address,string,byte[32],byte[32][],uint64)bool` ABI method.
     *
     * verify an inclusion in a double sha256 based merkle tree
     *
     * @param params The params for the smart contract call
     * @returns The call transaction: a boolean indicating whether the proof is valid
     */
    verify: (params) => {
      return this.appClient.createTransaction.call(MetaMerklesParamsFactory.verify(params));
    },
    /**
     * Makes a call to the MetaMerkles smart contract using the `read(address,string,string)string` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * Fetch a metadata properties
     *
     * @param params The params for the smart contract call
     * @returns The call transaction: the value set eg. `5` encoded as a bytestring for 5%
     */
    read: (params) => {
      return this.appClient.createTransaction.call(MetaMerklesParamsFactory.read(params));
    },
    /**
         * Makes a call to the MetaMerkles smart contract using the `verifiedRead(address,string,byte[32],byte[32][],uint64,string)string` ABI method.
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
      return this.appClient.createTransaction.call(MetaMerklesParamsFactory.verifiedRead(params));
    },
    /**
         * Makes a call to the MetaMerkles smart contract using the `verifiedMustRead(address,string,byte[32],byte[32][],uint64,string)string` ABI method.
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
      return this.appClient.createTransaction.call(MetaMerklesParamsFactory.verifiedMustRead(params));
    },
    /**
     * Makes a call to the MetaMerkles smart contract using the `addType(pay,string,uint8[])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    addType: (params) => {
      return this.appClient.createTransaction.call(MetaMerklesParamsFactory.addType(params));
    },
    /**
     * Makes a call to the MetaMerkles smart contract using the `rootCosts(string)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    rootCosts: (params) => {
      return this.appClient.createTransaction.call(MetaMerklesParamsFactory.rootCosts(params));
    },
    /**
     * Makes a call to the MetaMerkles smart contract using the `dataCosts(string,string,string)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    dataCosts: (params) => {
      return this.appClient.createTransaction.call(MetaMerklesParamsFactory.dataCosts(params));
    }
  }}
  /**
   * Send calls to the current app
   */
  __init6() {this.send = {
    /**
     * Makes a clear_state call to an existing instance of the MetaMerkles smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.send.bare.clearState(params);
    },
    /**
         * Makes a call to the MetaMerkles smart contract using the `addRoot(pay,string,byte[32],uint64)void` ABI method.
         *
        * Creates two boxes and adds a merkle root
        using a `RootKey` to the root box map and also a list type to the
        metadata attached to the root in the data box map
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    addRoot: async (params) => {
      const result = await this.appClient.send.call(MetaMerklesParamsFactory.addRoot(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the MetaMerkles smart contract using the `deleteRoot(string)void` ABI method.
     *
     * Deletes the merkle root from the root box map
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    deleteRoot: async (params) => {
      const result = await this.appClient.send.call(MetaMerklesParamsFactory.deleteRoot(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the MetaMerkles smart contract using the `updateRoot(string,byte[32])void` ABI method.
     *
     * Replaces the merkle root with another
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    updateRoot: async (params) => {
      const result = await this.appClient.send.call(MetaMerklesParamsFactory.updateRoot(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the MetaMerkles smart contract using the `addData(pay,string,string,string)void` ABI method.
         *
        * Registers a key & value in the data box map that
        corresponds to a merkle root in the root box map
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    addData: async (params) => {
      const result = await this.appClient.send.call(MetaMerklesParamsFactory.addData(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the MetaMerkles smart contract using the `deleteData(string,string)void` ABI method.
     *
     * Deletes a metadata key & value pair from the data box map
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    deleteData: async (params) => {
      const result = await this.appClient.send.call(MetaMerklesParamsFactory.deleteData(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the MetaMerkles smart contract using the `verify(address,string,byte[32],byte[32][],uint64)bool` ABI method.
     *
     * verify an inclusion in a double sha256 based merkle tree
     *
     * @param params The params for the smart contract call
     * @returns The call result: a boolean indicating whether the proof is valid
     */
    verify: async (params) => {
      const result = await this.appClient.send.call(MetaMerklesParamsFactory.verify(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the MetaMerkles smart contract using the `read(address,string,string)string` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * Fetch a metadata properties
     *
     * @param params The params for the smart contract call
     * @returns The call result: the value set eg. `5` encoded as a bytestring for 5%
     */
    read: async (params) => {
      const result = await this.appClient.send.call(MetaMerklesParamsFactory.read(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the MetaMerkles smart contract using the `verifiedRead(address,string,byte[32],byte[32][],uint64,string)string` ABI method.
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
      const result = await this.appClient.send.call(MetaMerklesParamsFactory.verifiedRead(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the MetaMerkles smart contract using the `verifiedMustRead(address,string,byte[32],byte[32][],uint64,string)string` ABI method.
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
      const result = await this.appClient.send.call(MetaMerklesParamsFactory.verifiedMustRead(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the MetaMerkles smart contract using the `addType(pay,string,uint8[])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    addType: async (params) => {
      const result = await this.appClient.send.call(MetaMerklesParamsFactory.addType(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the MetaMerkles smart contract using the `rootCosts(string)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    rootCosts: async (params) => {
      const result = await this.appClient.send.call(MetaMerklesParamsFactory.rootCosts(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the MetaMerkles smart contract using the `dataCosts(string,string,string)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    dataCosts: async (params) => {
      const result = await this.appClient.send.call(MetaMerklesParamsFactory.dataCosts(params));
      return { ...result, return: result.return };
    }
  }}
  /**
   * Clone this app client with different params
   *
   * @param params The params to use for the cloned app client. Omit a param to keep the original value. Set a param to override the original value. Setting to undefined will clear the original value.
   * @returns A new app client with the altered params
   */
  clone(params) {
    return new _MetaMerklesClient(this.appClient.clone(params));
  }
  /**
   * Makes a readonly (simulated) call to the MetaMerkles smart contract using the `read(address,string,string)string` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * Fetch a metadata properties
   *
   * @param params The params for the smart contract call
   * @returns The call result: the value set eg. `5` encoded as a bytestring for 5%
   */
  async read(params) {
    const result = await this.appClient.send.call(MetaMerklesParamsFactory.read(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the MetaMerkles smart contract using the `rootCosts(string)uint64` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async rootCosts(params) {
    const result = await this.appClient.send.call(MetaMerklesParamsFactory.rootCosts(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the MetaMerkles smart contract using the `dataCosts(string,string,string)uint64` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async dataCosts(params) {
    const result = await this.appClient.send.call(MetaMerklesParamsFactory.dataCosts(params));
    return result.return;
  }
  /**
   * Methods to access state for the current MetaMerkles app
   */
  __init7() {this.state = {
    /**
     * Methods to access global state for the current MetaMerkles app
     */
    global: {
      /**
       * Get all current keyed values from global state
       */
      getAll: async () => {
        const result = await this.appClient.state.global.getAll();
        return {
          typesId: result.typesID
        };
      },
      /**
       * Get the current value of the typesID key in global state
       */
      typesId: async () => {
        return await this.appClient.state.global.getValue("typesID");
      }
    },
    /**
     * Methods to access box state for the current MetaMerkles app
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
       * Get values from the data map in box state
       */
      data: {
        /**
         * Get all current values of the data map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("data");
        },
        /**
         * Get a current value of the data map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("data", key);
        }
      }
    }
  }}
  newGroup(composerConfig) {
    const client = this;
    const composer = this.algorand.newGroup(composerConfig);
    let promiseChain = Promise.resolve();
    return {
      /**
       * Add a addRoot(pay,string,byte[32],uint64)void method call against the MetaMerkles contract
       */
      addRoot(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.addRoot(params)));
        return this;
      },
      /**
       * Add a deleteRoot(string)void method call against the MetaMerkles contract
       */
      deleteRoot(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.deleteRoot(params)));
        return this;
      },
      /**
       * Add a updateRoot(string,byte[32])void method call against the MetaMerkles contract
       */
      updateRoot(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateRoot(params)));
        return this;
      },
      /**
       * Add a addData(pay,string,string,string)void method call against the MetaMerkles contract
       */
      addData(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.addData(params)));
        return this;
      },
      /**
       * Add a deleteData(string,string)void method call against the MetaMerkles contract
       */
      deleteData(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.deleteData(params)));
        return this;
      },
      /**
       * Add a verify(address,string,byte[32],byte[32][],uint64)bool method call against the MetaMerkles contract
       */
      verify(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.verify(params)));
        return this;
      },
      /**
       * Add a read(address,string,string)string method call against the MetaMerkles contract
       */
      read(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.read(params)));
        return this;
      },
      /**
       * Add a verifiedRead(address,string,byte[32],byte[32][],uint64,string)string method call against the MetaMerkles contract
       */
      verifiedRead(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.verifiedRead(params)));
        return this;
      },
      /**
       * Add a verifiedMustRead(address,string,byte[32],byte[32][],uint64,string)string method call against the MetaMerkles contract
       */
      verifiedMustRead(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.verifiedMustRead(params)));
        return this;
      },
      /**
       * Add a addType(pay,string,uint8[])void method call against the MetaMerkles contract
       */
      addType(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.addType(params)));
        return this;
      },
      /**
       * Add a rootCosts(string)uint64 method call against the MetaMerkles contract
       */
      rootCosts(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.rootCosts(params)));
        return this;
      },
      /**
       * Add a dataCosts(string,string,string)uint64 method call against the MetaMerkles contract
       */
      dataCosts(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.dataCosts(params)));
        return this;
      },
      /**
       * Add a clear state call to the MetaMerkles contract
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
          returns: (_a = result.returns) == null ? void 0 : _a.map((val) => val.returnValue)
        };
      },
      async send(params) {
        var _a;
        await promiseChain;
        const result = await composer.send(params);
        return {
          ...result,
          returns: (_a = result.returns) == null ? void 0 : _a.map((val) => val.returnValue)
        };
      }
    };
  }
}, _class2);

// src/meta-merkles/types.ts
var SchemaPart = /* @__PURE__ */ ((SchemaPart2) => {
  SchemaPart2[SchemaPart2["Uint8"] = 10] = "Uint8";
  SchemaPart2[SchemaPart2["Uint16"] = 11] = "Uint16";
  SchemaPart2[SchemaPart2["Uint32"] = 12] = "Uint32";
  SchemaPart2[SchemaPart2["Uint64"] = 13] = "Uint64";
  SchemaPart2[SchemaPart2["Uint128"] = 14] = "Uint128";
  SchemaPart2[SchemaPart2["Uint256"] = 15] = "Uint256";
  SchemaPart2[SchemaPart2["Uint512"] = 16] = "Uint512";
  SchemaPart2[SchemaPart2["Bytes4"] = 20] = "Bytes4";
  SchemaPart2[SchemaPart2["Bytes8"] = 21] = "Bytes8";
  SchemaPart2[SchemaPart2["Bytes16"] = 22] = "Bytes16";
  SchemaPart2[SchemaPart2["Bytes32"] = 23] = "Bytes32";
  SchemaPart2[SchemaPart2["Bytes64"] = 24] = "Bytes64";
  SchemaPart2[SchemaPart2["Bytes128"] = 25] = "Bytes128";
  SchemaPart2[SchemaPart2["Bytes256"] = 26] = "Bytes256";
  SchemaPart2[SchemaPart2["Bytes512"] = 27] = "Bytes512";
  SchemaPart2[SchemaPart2["String"] = 30] = "String";
  SchemaPart2[SchemaPart2["Address"] = 40] = "Address";
  return SchemaPart2;
})(SchemaPart || {});
var MerkleTreeType = /* @__PURE__ */ ((MerkleTreeType2) => {
  MerkleTreeType2[MerkleTreeType2["Unspecified"] = 0] = "Unspecified";
  MerkleTreeType2[MerkleTreeType2["Collection"] = 1] = "Collection";
  MerkleTreeType2[MerkleTreeType2["Trait"] = 2] = "Trait";
  MerkleTreeType2[MerkleTreeType2["Trade"] = 3] = "Trade";
  MerkleTreeType2[MerkleTreeType2["Whitelist"] = 4] = "Whitelist";
  MerkleTreeType2[MerkleTreeType2["Addresses"] = 5] = "Addresses";
  return MerkleTreeType2;
})(MerkleTreeType || {});

// src/meta-merkles/tree.ts
var _sha256 = require('@noble/hashes/sha256');
function bytesToHex(bytes) {
  return `0x${Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("")}`;
}
function hexToBytes(hex) {
  const cleanHex = hex.startsWith("0x") ? hex.slice(2) : hex;
  const bytes = new Uint8Array(cleanHex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(cleanHex.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}
function compareBytes(a, b) {
  const len = Math.min(a.length, b.length);
  for (let i = 0; i < len; i++) {
    if (a[i] !== b[i]) {
      return a[i] - b[i];
    }
  }
  return a.length - b.length;
}
function hashPair(a, b) {
  if (compareBytes(a, b) > 0) {
    return _sha256.sha256.call(void 0, new Uint8Array([...b, ...a]));
  }
  return _sha256.sha256.call(void 0, new Uint8Array([...a, ...b]));
}
function encodeValue(value, schemaPart) {
  switch (schemaPart) {
    case 10 /* Uint8 */: {
      const buf = new Uint8Array(1);
      buf[0] = Number(value) & 255;
      return buf;
    }
    case 11 /* Uint16 */: {
      const buf = new Uint8Array(2);
      const view = new DataView(buf.buffer);
      view.setUint16(0, Number(value), false);
      return buf;
    }
    case 12 /* Uint32 */: {
      const buf = new Uint8Array(4);
      const view = new DataView(buf.buffer);
      view.setUint32(0, Number(value), false);
      return buf;
    }
    case 13 /* Uint64 */: {
      const buf = new Uint8Array(8);
      const view = new DataView(buf.buffer);
      view.setBigUint64(0, BigInt(value), false);
      return buf;
    }
    case 14 /* Uint128 */: {
      const buf = new Uint8Array(16);
      let n = BigInt(value);
      for (let i = 15; i >= 0; i--) {
        buf[i] = Number(n & 0xffn);
        n >>= 8n;
      }
      return buf;
    }
    case 15 /* Uint256 */: {
      const buf = new Uint8Array(32);
      let n = BigInt(value);
      for (let i = 31; i >= 0; i--) {
        buf[i] = Number(n & 0xffn);
        n >>= 8n;
      }
      return buf;
    }
    case 16 /* Uint512 */: {
      const buf = new Uint8Array(64);
      let n = BigInt(value);
      for (let i = 63; i >= 0; i--) {
        buf[i] = Number(n & 0xffn);
        n >>= 8n;
      }
      return buf;
    }
    case 20 /* Bytes4 */:
    case 21 /* Bytes8 */:
    case 22 /* Bytes16 */:
    case 23 /* Bytes32 */:
    case 24 /* Bytes64 */:
    case 25 /* Bytes128 */:
    case 26 /* Bytes256 */:
    case 27 /* Bytes512 */: {
      const sizes = {
        [20 /* Bytes4 */]: 4,
        [21 /* Bytes8 */]: 8,
        [22 /* Bytes16 */]: 16,
        [23 /* Bytes32 */]: 32,
        [24 /* Bytes64 */]: 64,
        [25 /* Bytes128 */]: 128,
        [26 /* Bytes256 */]: 256,
        [27 /* Bytes512 */]: 512
      };
      const size = sizes[schemaPart];
      if (value instanceof Uint8Array) {
        if (value.length !== size) {
          throw new Error(`Expected ${size} bytes, got ${value.length}`);
        }
        return value;
      }
      const bytes = hexToBytes(value);
      if (bytes.length !== size) {
        throw new Error(`Expected ${size} bytes, got ${bytes.length}`);
      }
      return bytes;
    }
    case 30 /* String */: {
      return new TextEncoder().encode(value);
    }
    case 40 /* Address */: {
      const addr = value;
      if (addr.length === 58) {
        throw new Error("Please provide address as Uint8Array (32 bytes) or use decodeAlgorandAddress helper");
      }
      if (value instanceof Uint8Array && value.length === 32) {
        return value;
      }
      throw new Error("Address must be 32 bytes");
    }
    default:
      throw new Error(`Unknown schema part: ${schemaPart}`);
  }
}
function encodeLeaf(values, schema) {
  if (values.length !== schema.length) {
    throw new Error(`Values length (${values.length}) must match schema length (${schema.length})`);
  }
  const encoded = values.map((v, i) => encodeValue(v, schema[i]));
  const totalLength = encoded.reduce((sum, arr) => sum + arr.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const arr of encoded) {
    result.set(arr, offset);
    offset += arr.length;
  }
  return result;
}
function hashLeaf(encodedLeaf) {
  return _sha256.sha256.call(void 0, _sha256.sha256.call(void 0, encodedLeaf));
}
var MerkleTree = class _MerkleTree {
  
  
  
  
  // value index -> tree index
  constructor(values, schema) {
    this.values = values;
    this.schema = schema;
    this.leafIndices = /* @__PURE__ */ new Map();
    this.tree = this.buildTree();
  }
  /**
   * Creates a new merkle tree from an array of values.
   * 
   * For single-value leaves (e.g., uint64[]), pass each value as an array: [[1n], [2n], [3n]]
   * Or use the convenience form with a single-element schema.
   * 
   * @param values - Array of leaf values (each value is an array matching the schema)
   * @param schema - The schema defining how to encode each leaf
   */
  static of(values, schema) {
    if (values.length === 0) {
      throw new Error("Cannot create merkle tree with no values");
    }
    return new _MerkleTree(values, schema);
  }
  /**
   * Creates a merkle tree for simple single-type values.
   * 
   * @example
   * ```ts
   * // Tree of addresses
   * const tree = MerkleTree.ofSimple(addresses, SchemaPart.Address);
   * 
   * // Tree of uint64 values
   * const tree = MerkleTree.ofSimple([1n, 2n, 3n], SchemaPart.Uint64);
   * ```
   */
  static ofSimple(values, schemaPart) {
    return _MerkleTree.of(values.map((v) => [v]), [schemaPart]);
  }
  /**
   * Loads a merkle tree from a dump (useful for persistence).
   */
  static load(dump, schema) {
    const values = dump.values.map((v) => v.value);
    return _MerkleTree.of(values, schema);
  }
  buildTree() {
    const leaves = this.values.map((v) => hashLeaf(encodeLeaf(v, this.schema)));
    const n = leaves.length;
    const treeSize = 2 * n - 1;
    const tree = new Array(treeSize);
    for (let i = 0; i < n; i++) {
      tree[treeSize - n + i] = leaves[i];
      this.leafIndices.set(i, treeSize - n + i);
    }
    for (let i = treeSize - n - 1; i >= 0; i--) {
      const left = tree[2 * i + 1];
      const right = tree[2 * i + 2];
      tree[i] = right ? hashPair(left, right) : left;
    }
    return tree;
  }
  /**
   * The merkle root as a 32-byte Uint8Array.
   */
  get root() {
    return this.tree[0];
  }
  /**
   * The merkle root as a hex string (0x prefixed).
   */
  get rootHex() {
    return bytesToHex(this.root);
  }
  /**
   * Number of leaves in the tree.
   */
  get length() {
    return this.values.length;
  }
  /**
   * Gets the proof for a leaf at the given index.
   * @param index - The index of the leaf value
   * @returns Array of 32-byte proof elements
   */
  getProof(index) {
    if (index < 0 || index >= this.values.length) {
      throw new Error(`Index ${index} out of bounds [0, ${this.values.length})`);
    }
    const proof = [];
    let treeIndex = this.leafIndices.get(index);
    while (treeIndex > 0) {
      const siblingIndex = treeIndex % 2 === 0 ? treeIndex - 1 : treeIndex + 1;
      if (siblingIndex < this.tree.length && this.tree[siblingIndex]) {
        proof.push(this.tree[siblingIndex]);
      }
      treeIndex = Math.floor((treeIndex - 1) / 2);
    }
    return proof;
  }
  /**
   * Gets the proof for a leaf at the given index as hex strings.
   */
  getProofHex(index) {
    return this.getProof(index).map(bytesToHex);
  }
  /**
   * Gets the leaf hash at the given index.
   */
  getLeafHash(index) {
    if (index < 0 || index >= this.values.length) {
      throw new Error(`Index ${index} out of bounds [0, ${this.values.length})`);
    }
    const treeIndex = this.leafIndices.get(index);
    return this.tree[treeIndex];
  }
  /**
   * Gets the leaf hash at the given index as a hex string.
   */
  getLeafHashHex(index) {
    return bytesToHex(this.getLeafHash(index));
  }
  /**
   * Verifies a proof locally (without calling the contract).
   * @param index - The index of the leaf value to verify
   * @param proof - The proof array (optional, will be computed if not provided)
   * @returns true if the proof is valid
   */
  verify(index, proof) {
    const actualProof = _nullishCoalesce(proof, () => ( this.getProof(index)));
    let hash = this.getLeafHash(index);
    for (const sibling of actualProof) {
      hash = hashPair(hash, sibling);
    }
    return this.compareBytes(hash, this.root);
  }
  compareBytes(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  /**
   * Iterates over all values with their indices.
   */
  *entries() {
    for (let i = 0; i < this.values.length; i++) {
      yield [i, this.values[i]];
    }
  }
  /**
   * Gets the value at the given index.
   */
  getValue(index) {
    if (index < 0 || index >= this.values.length) {
      throw new Error(`Index ${index} out of bounds [0, ${this.values.length})`);
    }
    return this.values[index];
  }
  /**
   * Finds the index of a value in the tree.
   * @param predicate - Function to test each value
   * @returns The index of the first matching value, or -1 if not found
   */
  findIndex(predicate) {
    for (let i = 0; i < this.values.length; i++) {
      if (predicate(this.values[i], i)) {
        return i;
      }
    }
    return -1;
  }
  /**
   * Gets proof for a value matching the predicate.
   */
  getProofFor(predicate) {
    const index = this.findIndex(predicate);
    if (index === -1) return null;
    return { index, proof: this.getProof(index) };
  }
  /**
   * Renders the tree as a string for debugging.
   */
  render() {
    const lines = ["Merkle Tree:"];
    lines.push(`  Root: ${this.rootHex}`);
    lines.push(`  Leaves: ${this.values.length}`);
    lines.push("  Values:");
    for (let i = 0; i < this.values.length; i++) {
      lines.push(`    [${i}] ${JSON.stringify(this.values[i])} -> ${this.getLeafHashHex(i)}`);
    }
    return lines.join("\n");
  }
  /**
   * Dumps the tree to a JSON-serializable format.
   */
  dump() {
    return {
      format: "standard-v1",
      tree: this.tree.map(bytesToHex),
      values: this.values.map((value, i) => ({
        value,
        treeIndex: this.leafIndices.get(i)
      })),
      leafEncoding: this.schema.map((s) => SchemaPart[s]).join(",")
    };
  }
};
function createAddressTree(addresses) {
  return MerkleTree.ofSimple(addresses, 40 /* Address */);
}
function createUint64Tree(values) {
  return MerkleTree.ofSimple(values, 13 /* Uint64 */);
}
function createAssetTree(assetIds) {
  return createUint64Tree(assetIds);
}
function verifyProof(root, leaf, proof) {
  let hash = leaf;
  for (const sibling of proof) {
    hash = hashPair(hash, sibling);
  }
  if (root.length !== hash.length) return false;
  for (let i = 0; i < root.length; i++) {
    if (root[i] !== hash[i]) return false;
  }
  return true;
}

// src/meta-merkles/errors.ts
var META_MERKLES_ERROR_MESSAGES = {
  // --- Box key / data validation -----------------------------------------
  KTL: "Max key length is 32 bytes",
  DTL: "Max data length is 1024 bytes",
  RKP: '"l." key prefix is reserved for internals',
  NTL: "Root name cannot be longer than 31 bytes",
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
  TMIS: "List type does not match",
  NDTA: "Data does not exist",
  EDTA: "New data already exists",
  // --- Tree types ---------------------------------------------------------
  NTRT: "Tree type does not exist",
  ETRK: "Tree type key already exists for this root"
};
var translateMetaMerklesError = _chunkGIGYZ6YCjs.makeErrorTranslator.call(void 0, META_MERKLES_ERROR_MESSAGES);

// src/meta-merkles/index.ts
var ADD_TYPE_COST = 100000000n;
var MetaMerklesSDK = class extends _chunkA73G7K3Bjs.BaseSDK {
  constructor(params) {
    super({ factory: MetaMerklesFactory, ...params }, _chunkYA4OODI3js.ENV_VAR_NAMES.META_MERKLES_APP_ID);
  }
  // ========== Read Methods ==========
  /**
   * Gets the current global state of the MetaMerkles contract.
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
    const rootKey = { address, name };
    try {
      return await this.client.state.box.roots.value(rootKey);
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
    return await this.client.state.box.roots.getMap();
  }
  /**
   * Gets metadata associated with a merkle root.
   * @returns The metadata value or undefined if not found
   */
  async getData({ address, name, key }) {
    const addressBytes = Uint8Array.from(Buffer.from(address.slice(0, 32), "base64"));
    const truncatedAddress = addressBytes.slice(0, 16);
    try {
      return await this.client.state.box.data.value({
        address: truncatedAddress,
        name,
        key
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes("box not found")) {
        return void 0;
      }
      throw error;
    }
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
   * @param name - The name alias of the root (max 31 bytes)
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
};

















exports.SchemaPart = SchemaPart; exports.MerkleTreeType = MerkleTreeType; exports.bytesToHex = bytesToHex; exports.hexToBytes = hexToBytes; exports.encodeValue = encodeValue; exports.encodeLeaf = encodeLeaf; exports.hashLeaf = hashLeaf; exports.MerkleTree = MerkleTree; exports.createAddressTree = createAddressTree; exports.createUint64Tree = createUint64Tree; exports.createAssetTree = createAssetTree; exports.verifyProof = verifyProof; exports.META_MERKLES_ERROR_MESSAGES = META_MERKLES_ERROR_MESSAGES; exports.translateMetaMerklesError = translateMetaMerklesError; exports.MetaMerklesSDK = MetaMerklesSDK;
//# sourceMappingURL=chunk-F5EFDUR5.js.map
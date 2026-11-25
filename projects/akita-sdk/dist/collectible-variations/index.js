"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } var _class; var _class2;

var _chunkJ43IZCZCjs = require('../chunk-J43IZCZC.js');


var _chunkZGCVKZRLjs = require('../chunk-ZGCVKZRL.js');


var _chunkN5J2GB5Wjs = require('../chunk-N5J2GB5W.js');
require('../chunk-H2KYIJ7K.js');
require('../chunk-WXNDITZI.js');


var _chunkPZ5AY32Cjs = require('../chunk-PZ5AY32C.js');

// src/collectible-variations/index.ts
var _algokitutils = require('@algorandfoundation/algokit-utils');
var _algosdk = require('algosdk'); var _algosdk2 = _interopRequireDefault(_algosdk);

// src/generated/CollectibleVariationsClient.ts
var _apparc56 = require('@algorandfoundation/algokit-utils/types/app-arc56');


var _appclient = require('@algorandfoundation/algokit-utils/types/app-client');
var _appfactory = require('@algorandfoundation/algokit-utils/types/app-factory');
var APP_SPEC = { "name": "CollectibleVariations", "structs": { "MainView": [{ "name": "role", "type": "uint8" }, { "name": "pin", "type": "byte[]" }], "MbrDelta": [{ "name": "sign", "type": "uint8" }, { "name": "amount", "type": "uint64" }], "RemoveResult": [{ "name": "removed", "type": "bool" }, { "name": "reason", "type": "uint8" }, { "name": "refund", "type": "uint64" }], "WriteResult": [{ "name": "revision", "type": "uint64" }, { "name": "changed", "type": "bool" }, { "name": "mbr", "type": "MbrDelta" }] }, "methods": [{ "name": "create", "args": [{ "type": "uint64", "name": "metaApp" }, { "type": "uint64", "name": "metaTreeType" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "arcTBD_write_variation", "args": [{ "type": "uint64", "name": "asset" }, { "type": "uint64", "name": "controllingApp" }, { "type": "byte[]", "name": "slot" }, { "type": "address", "name": "holder" }, { "type": "uint8", "name": "kind" }, { "type": "uint8", "name": "sub" }, { "type": "bool", "name": "lock" }, { "type": "byte[]", "name": "flat" }, { "type": "byte[]", "name": "body" }, { "type": "uint64", "name": "ifRevision" }, { "type": "byte[32][]", "name": "proof" }], "returns": { "type": "(uint64,bool,(uint8,uint64))", "struct": "WriteResult" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Create or replace the sender's variation (asset, sender, slot). `holder` zero means\ncollectible scope, otherwise holder scope bound to `holder`. `proof` is used only by meta\nwriter sets.", "events": [{ "name": "VariationWritten", "args": [{ "type": "uint64", "name": "asset" }, { "type": "address", "name": "writer" }, { "type": "byte[]", "name": "slot" }, { "type": "uint64", "name": "revision" }, { "type": "uint8", "name": "flags" }, { "type": "uint8", "name": "kind" }, { "type": "uint64", "name": "round" }, { "type": "uint64", "name": "timestamp" }] }], "recommendations": {} }, { "name": "arcTBD_delete_variation", "args": [{ "type": "uint64", "name": "asset" }, { "type": "uint64", "name": "controllingApp" }, { "type": "address", "name": "writer" }, { "type": "byte[]", "name": "slot" }], "returns": { "type": "(bool,uint8,uint64)", "struct": "RemoveResult" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Delete variation (asset, writer, slot) of an existing asset. The first authority that applies\nis used and reported: writer (unlocked), void, holder, creator (unlocked policy).\nThe refund goes to the writer.", "events": [{ "name": "VariationDeleted", "args": [{ "type": "uint64", "name": "asset" }, { "type": "address", "name": "writer" }, { "type": "byte[]", "name": "slot" }, { "type": "uint64", "name": "lastRevision" }, { "type": "uint8", "name": "reason" }, { "type": "uint64", "name": "round" }, { "type": "uint64", "name": "timestamp" }] }], "recommendations": {} }, { "name": "arcTBD_pin_main_creator", "args": [{ "type": "uint64", "name": "asset" }, { "type": "uint64", "name": "controllingApp" }, { "type": "address", "name": "writer" }, { "type": "byte[]", "name": "slot" }, { "type": "uint64", "name": "sourceRevision" }, { "type": "bool", "name": "lock" }], "returns": { "type": "(uint64,bool,(uint8,uint64))", "struct": "WriteResult" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Pin a collectible-scope variation as the creator's main image. The pin is a snapshot of its flat image.", "events": [{ "name": "MainChanged", "args": [{ "type": "uint64", "name": "asset" }, { "type": "uint64", "name": "revision" }, { "type": "uint8", "name": "role" }, { "type": "bool", "name": "cleared" }, { "type": "uint64", "name": "round" }, { "type": "uint64", "name": "timestamp" }] }], "recommendations": {} }, { "name": "arcTBD_pin_main_holder", "args": [{ "type": "uint64", "name": "asset" }, { "type": "address", "name": "writer" }, { "type": "byte[]", "name": "slot" }, { "type": "uint64", "name": "sourceRevision" }], "returns": { "type": "(uint64,bool,(uint8,uint64))", "struct": "WriteResult" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Pin a variation as the holder's main image. Only single-unit assets. The next transfer voids it.", "events": [{ "name": "MainChanged", "args": [{ "type": "uint64", "name": "asset" }, { "type": "uint64", "name": "revision" }, { "type": "uint8", "name": "role" }, { "type": "bool", "name": "cleared" }, { "type": "uint64", "name": "round" }, { "type": "uint64", "name": "timestamp" }] }], "recommendations": {} }, { "name": "arcTBD_unpin_main_creator", "args": [{ "type": "uint64", "name": "asset" }, { "type": "uint64", "name": "controllingApp" }], "returns": { "type": "(bool,uint8,uint64)", "struct": "RemoveResult" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Clear the creator section. The resolved creator, or the AssetCreator when none resolves (I12).", "events": [{ "name": "MainChanged", "args": [{ "type": "uint64", "name": "asset" }, { "type": "uint64", "name": "revision" }, { "type": "uint8", "name": "role" }, { "type": "bool", "name": "cleared" }, { "type": "uint64", "name": "round" }, { "type": "uint64", "name": "timestamp" }] }], "recommendations": {} }, { "name": "arcTBD_unpin_main_holder", "args": [{ "type": "uint64", "name": "asset" }], "returns": { "type": "(bool,uint8,uint64)", "struct": "RemoveResult" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Clear the holder section. Its holder, or anyone once it is void. Refunded to the holder in it.", "events": [{ "name": "MainChanged", "args": [{ "type": "uint64", "name": "asset" }, { "type": "uint64", "name": "revision" }, { "type": "uint8", "name": "role" }, { "type": "bool", "name": "cleared" }, { "type": "uint64", "name": "round" }, { "type": "uint64", "name": "timestamp" }] }], "recommendations": {} }, { "name": "arcTBD_set_asset_policy", "args": [{ "type": "uint64", "name": "asset" }, { "type": "uint64", "name": "controllingApp" }, { "type": "byte[]", "name": "collectible" }, { "type": "byte[]", "name": "holder" }, { "type": "bool", "name": "managerWrites" }, { "type": "bool", "name": "holderPinsCollectibleOnly" }, { "type": "bool", "name": "lock" }], "returns": { "type": "(uint64,bool,(uint8,uint64))", "struct": "WriteResult" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Set the policy of one asset. It overrides the manager policy. `lock` is one way.", "events": [{ "name": "PolicyChanged", "args": [{ "type": "uint64", "name": "asset" }, { "type": "address", "name": "manager" }, { "type": "uint64", "name": "revision" }, { "type": "uint8", "name": "flags" }, { "type": "bool", "name": "deleted" }, { "type": "uint64", "name": "round" }, { "type": "uint64", "name": "timestamp" }] }], "recommendations": {} }, { "name": "arcTBD_set_manager_policy", "args": [{ "type": "byte[]", "name": "collectible" }, { "type": "byte[]", "name": "holder" }, { "type": "bool", "name": "managerWrites" }, { "type": "bool", "name": "holderPinsCollectibleOnly" }], "returns": { "type": "(uint64,bool,(uint8,uint64))", "struct": "WriteResult" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Set the policy of every asset whose ASA manager field is the sender. It has no lock.", "events": [{ "name": "PolicyChanged", "args": [{ "type": "uint64", "name": "asset" }, { "type": "address", "name": "manager" }, { "type": "uint64", "name": "revision" }, { "type": "uint8", "name": "flags" }, { "type": "bool", "name": "deleted" }, { "type": "uint64", "name": "round" }, { "type": "uint64", "name": "timestamp" }] }], "recommendations": {} }, { "name": "arcTBD_delete_asset_policy", "args": [{ "type": "uint64", "name": "asset" }, { "type": "uint64", "name": "controllingApp" }], "returns": { "type": "(bool,uint8,uint64)", "struct": "RemoveResult" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Delete an unlocked asset policy. The resolved creator, or the AssetCreator when none resolves (I12).", "events": [{ "name": "PolicyChanged", "args": [{ "type": "uint64", "name": "asset" }, { "type": "address", "name": "manager" }, { "type": "uint64", "name": "revision" }, { "type": "uint8", "name": "flags" }, { "type": "bool", "name": "deleted" }, { "type": "uint64", "name": "round" }, { "type": "uint64", "name": "timestamp" }] }], "recommendations": {} }, { "name": "arcTBD_delete_manager_policy", "args": [], "returns": { "type": "(bool,uint8,uint64)", "struct": "RemoveResult" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Delete the sender's manager policy.", "events": [{ "name": "PolicyChanged", "args": [{ "type": "uint64", "name": "asset" }, { "type": "address", "name": "manager" }, { "type": "uint64", "name": "revision" }, { "type": "uint8", "name": "flags" }, { "type": "bool", "name": "deleted" }, { "type": "uint64", "name": "round" }, { "type": "uint64", "name": "timestamp" }] }], "recommendations": {} }, { "name": "arcTBD_set_grant", "args": [{ "type": "byte[]", "name": "writers" }], "returns": { "type": "(uint64,bool,(uint8,uint64))", "struct": "WriteResult" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Writers the sender admits for holder-scope entries bound to the sender, on anything the sender holds.", "events": [{ "name": "GrantChanged", "args": [{ "type": "address", "name": "holder" }, { "type": "uint64", "name": "revision" }, { "type": "bool", "name": "deleted" }, { "type": "uint64", "name": "round" }, { "type": "uint64", "name": "timestamp" }] }], "recommendations": {} }, { "name": "arcTBD_delete_grant", "args": [], "returns": { "type": "(bool,uint8,uint64)", "struct": "RemoveResult" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Delete the sender's grant. Entries it admitted stay; the holder removes them separately.", "events": [{ "name": "GrantChanged", "args": [{ "type": "address", "name": "holder" }, { "type": "uint64", "name": "revision" }, { "type": "bool", "name": "deleted" }, { "type": "uint64", "name": "round" }, { "type": "uint64", "name": "timestamp" }] }], "recommendations": {} }, { "name": "arcTBD_purge", "args": [{ "type": "byte[]", "name": "name" }], "returns": { "type": "(bool,uint8,uint64)", "struct": "RemoveResult" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Delete one `v`, `m` or `p` box of a destroyed asset (I11). Anyone may call. `v` refunds the\nwriter in the name; `m` refunds the holder section's deposit to its holder and the rest to the\ncaller; `p` refunds the caller (no creator resolves after destroy, as in ARC-89).", "events": [{ "name": "VariationDeleted", "args": [{ "type": "uint64", "name": "asset" }, { "type": "address", "name": "writer" }, { "type": "byte[]", "name": "slot" }, { "type": "uint64", "name": "lastRevision" }, { "type": "uint8", "name": "reason" }, { "type": "uint64", "name": "round" }, { "type": "uint64", "name": "timestamp" }] }, { "name": "MainChanged", "args": [{ "type": "uint64", "name": "asset" }, { "type": "uint64", "name": "revision" }, { "type": "uint8", "name": "role" }, { "type": "bool", "name": "cleared" }, { "type": "uint64", "name": "round" }, { "type": "uint64", "name": "timestamp" }] }, { "name": "PolicyChanged", "args": [{ "type": "uint64", "name": "asset" }, { "type": "address", "name": "manager" }, { "type": "uint64", "name": "revision" }, { "type": "uint8", "name": "flags" }, { "type": "bool", "name": "deleted" }, { "type": "uint64", "name": "round" }, { "type": "uint64", "name": "timestamp" }] }], "recommendations": {} }, { "name": "arcTBD_get_main", "args": [{ "type": "uint64", "name": "asset" }], "returns": { "type": "(uint8,byte[])", "struct": "MainView" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "The pin that applies: a valid holder pin, else the creator pin, else role 0. `pin` is the\nsection's PinCore followed by its flat image (the holder's address is dropped).", "events": [], "recommendations": {} }], "arcs": [22, 28], "desc": "Collectible Variations registry. A singleton that can never be updated or deleted: no method\naccepts UpdateApplication or DeleteApplication.\n\nInvariants, each enforced in one place:\n I1  Every box deposit has one owner who gets its refund (`refund` sends every Algo out). The\n     owner is a role, not the payer: the sender of the write (a separate payer is never\n     refunded); for a `p` box and the creator section of `m`, whoever is creator when it is\n     removed (the purger after destroy, the AssetCreator under I12); the `m` base goes to the\n     section cleared last. A refund to a closed account below the minimum balance goes to the\n     sender instead.\n I2  Deposits are measured from the registry's own minimum balance, never computed from a rate\n     (`settle`). A positive deposit is a payment to the registry immediately before the call; a\n     zero deposit allows no such payment.\n I3  A locked entry cannot be changed by its writer. The creator can still evict a locked\n     collectible-scope entry while the effective policy is unlocked.\n I5  The writer in a `v` name is always the sender of the write.\n I6  Holder pins exist only for single-unit assets (total == 10^decimals).\n I7  Revisions come from one global counter, never 0, never repeating (`nextRevision`).\n I8  A write whose bytes equal the stored bytes is a no-op, decided before the lock check.\n I9  The creator is `resolveCreator` and nothing else.\n I10 The `m` box exists while it has a section; its two recorded deposits sum to its MBR.\n I11 After an asset is destroyed, only `purge` touches its boxes.\n I12 With no creator, the original AssetCreator may delete unlocked creator-side boxes.\n I13 Admission: local rules, then meta sets, then delegates (`admitsCollectible`, `admitsHolder`).\n I14 The registry is the only owner of every Meta root it checks (`syncMetaRoot`).\n\nPins are snapshots: a pin keeps its copy of the source's flat image after the source changes or\nis evicted, and policy flags are not retroactive (holderPinsCollectibleOnly does not void an\nexisting holder pin). The creator cannot clear a holder pin. Clients that care compare the\nPinCore source with the live variation.\n\nMeta dependency: changing or leaving a `meta` writer set, deleting such a policy or grant, and\npurging a `p` box call Meta's addRoot, updateRoot, deleteRoot, rootCosts and verify. Meta is\nDAO-upgradable while this app is not, so those five methods must keep their ABI and behaviour;\nthe registry's LocalNet suite is the guard.\n\nSize: a variation value is at most MaxValueBytes (4096) including its header, and the whole\nvalue is sent in one call. The network caps each app argument at 4096 bytes and all of them at\n16384, so the largest body argument (4084 bytes with its length prefix) fits.", "networks": {}, "state": { "schema": { "global": { "ints": 3, "bytes": 0 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "revision": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cg==" }, "metaApp": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YQ==", "desc": "The Meta app that stores and verifies `meta` writer-set roots. Fixed at create." }, "metaTreeType": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "dA==", "desc": 'The "collectible writer list" Meta tree type every `meta` root uses. Fixed at create.' } }, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": {} } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [4998, 6235], "errorMessage": "Bytes has valid prefix" }, { "pc": [3565], "errorMessage": "ERR:errCvAe" }, { "pc": [564, 1585, 1912, 2196, 2480, 2581, 2801, 3026], "errorMessage": "ERR:errCvAm" }, { "pc": [377, 641, 5679, 5693, 5729, 5743, 5786, 5831], "errorMessage": "ERR:errCvBa" }, { "pc": [3454, 3541, 3876], "errorMessage": "ERR:errCvBp" }, { "pc": [4308, 4320, 4401], "errorMessage": "ERR:errCvBs" }, { "pc": [7725, 7766], "errorMessage": "ERR:errCvDm" }, { "pc": [861, 2098, 2531, 5297, 5538], "errorMessage": "ERR:errCvLk" }, { "pc": [915, 1392, 1657, 2698], "errorMessage": "ERR:errCvNa" }, { "pc": [1947, 2835, 4461, 4481], "errorMessage": "ERR:errCvNc" }, { "pc": [898, 2264], "errorMessage": "ERR:errCvNh" }, { "pc": [960], "errorMessage": "ERR:errCvPf" }, { "pc": [6474], "errorMessage": "ERR:errCvSc" }, { "pc": [6425], "errorMessage": "ERR:errCvSm" }, { "pc": [1969, 2295, 2327, 6484], "errorMessage": "ERR:errCvSn" }, { "pc": [2242], "errorMessage": "ERR:errCvSu" }, { "pc": [688], "errorMessage": "ERR:errCvTl" }, { "pc": [6152, 6296], "errorMessage": "Length must be 32" }, { "pc": [998, 1662, 1670, 3212, 3344, 3589, 3604, 3717, 3816, 5305, 5543, 6343, 6381, 6963, 6999, 7217, 7230, 7350, 7555], "errorMessage": "account funded" }, { "pc": [4296, 6247], "errorMessage": "application exists" }, { "pc": [4944, 4950, 6088, 6301, 7539], "errorMessage": "check GlobalState exists" }, { "pc": [427, 488, 506, 538, 1559, 1864, 2159, 2726, 2744, 2905, 2921, 3113, 3432], "errorMessage": "invalid array length header" }, { "pc": [478, 1895, 2764, 2775, 2786, 2939, 2949], "errorMessage": "invalid number of bytes for arc4.bool" }, { "pc": [434, 495, 513, 1566, 1871, 2166, 2733, 2751, 2912, 2928, 3120, 3439], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [550], "errorMessage": "invalid number of bytes for arc4.dynamic_array<bytes[32]>" }, { "pc": [450, 1553, 1858, 2153], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [353, 363, 408, 418, 526, 1529, 1539, 1834, 1844, 1884, 2140, 2179, 2455, 2465, 2568, 2708, 2718, 3002, 3012, 3890], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [460, 470], "errorMessage": "invalid number of bytes for arc4.uint8" }, { "pc": [5003], "errorMessage": "invalid number of bytes for bool" }, { "pc": [6240], "errorMessage": "invalid number of bytes for uint64" }, { "pc": [1025, 1706, 2548, 2675, 5567, 7858, 7925, 7977], "errorMessage": "overflow" }, { "pc": [7659, 7755], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDEzCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCiNwcmFnbWEgYXV0b3NhbHQgZmFsc2UKCi8vIEBhbGdvcmFuZGZvdW5kYXRpb24vYWxnb3JhbmQtdHlwZXNjcmlwdC9hcmM0L2luZGV4LmQudHM6OkNvbnRyYWN0LmFwcHJvdmFsUHJvZ3JhbSgpIC0+IHVpbnQ2NDoKbWFpbjoKICAgIGludGNibG9jayAwIDEgMiA4IDEyOAogICAgYnl0ZWNibG9jayAiIiAweDE1MWY3Yzc1IDB4MDAwMDAwMDAwMDAwMDAwMDAwMDAgMHg4MCAweDAwICJtIiAiRVJSOmVyckN2QmEiICJFUlI6ZXJyQ3ZBbSIgMHgwMSAiZyIgIkVSUjplcnJDdkxrIiAidiIgIkVSUjplcnJDdk5hIiAiRVJSOmVyckN2TmMiICJFUlI6ZXJyQ3ZTbiIgInAiICJyIiAiYSIgInQiIDB4MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAgImgiICJjIiAiUCIgIkVSUjplcnJDdkJwIiAiRVJSOmVyckN2QnMiIDB4MDAwNCAiRVJSOmVyckN2TmgiIDB4NDQxNjU5MTQgMHgwMDAwMDAwMDAwMDAwMDAwMDAgIkVSUjplcnJDdkRtIgogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgIGJueiBtYWluX2FmdGVyX2lmX2Vsc2VAMgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoyMDYKICAgIC8vIHJldmlzaW9uID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogR2xvYmFsU3RhdGVLZXlSZXZpc2lvbiwgaW5pdGlhbFZhbHVlOiAwIH0pCiAgICBieXRlYyAxNiAvLyAiciIKICAgIGludGNfMCAvLyAwCiAgICBhcHBfZ2xvYmFsX3B1dAoKbWFpbl9hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjIwNC0yMDUKICAgIC8vIEBjb250cmFjdCh7IGF2bVZlcnNpb246IDEzIH0pCiAgICAvLyBleHBvcnQgY2xhc3MgQ29sbGVjdGlibGVWYXJpYXRpb25zIGV4dGVuZHMgQ29udHJhY3QgewogICAgdHhuIE9uQ29tcGxldGlvbgogICAgIQogICAgYXNzZXJ0CiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgYnogbWFpbl9jcmVhdGVfTm9PcEAyMAogICAgcHVzaGJ5dGVzcyAweGIxOGMzZjliIDB4ZTZlMjNiY2UgMHg1Y2VjNDYyYSAweGQyZTdmYzFiIDB4NTdiYjU0ZjQgMHhjZmQ2YzI2NiAweDQ3MDBjNzc0IDB4OTk2ZGZlMTIgMHg2MTBhOWEzNiAweDU0NTVhMzkyIDB4YTQ1NzQyYWEgMHgzZTM4MzFiMyAweDQ4NWI2YmMyIDB4M2NjOTIxZmEgLy8gbWV0aG9kICJhcmNUQkRfd3JpdGVfdmFyaWF0aW9uKHVpbnQ2NCx1aW50NjQsYnl0ZVtdLGFkZHJlc3MsdWludDgsdWludDgsYm9vbCxieXRlW10sYnl0ZVtdLHVpbnQ2NCxieXRlWzMyXVtdKSh1aW50NjQsYm9vbCwodWludDgsdWludDY0KSkiLCBtZXRob2QgImFyY1RCRF9kZWxldGVfdmFyaWF0aW9uKHVpbnQ2NCx1aW50NjQsYWRkcmVzcyxieXRlW10pKGJvb2wsdWludDgsdWludDY0KSIsIG1ldGhvZCAiYXJjVEJEX3Bpbl9tYWluX2NyZWF0b3IodWludDY0LHVpbnQ2NCxhZGRyZXNzLGJ5dGVbXSx1aW50NjQsYm9vbCkodWludDY0LGJvb2wsKHVpbnQ4LHVpbnQ2NCkpIiwgbWV0aG9kICJhcmNUQkRfcGluX21haW5faG9sZGVyKHVpbnQ2NCxhZGRyZXNzLGJ5dGVbXSx1aW50NjQpKHVpbnQ2NCxib29sLCh1aW50OCx1aW50NjQpKSIsIG1ldGhvZCAiYXJjVEJEX3VucGluX21haW5fY3JlYXRvcih1aW50NjQsdWludDY0KShib29sLHVpbnQ4LHVpbnQ2NCkiLCBtZXRob2QgImFyY1RCRF91bnBpbl9tYWluX2hvbGRlcih1aW50NjQpKGJvb2wsdWludDgsdWludDY0KSIsIG1ldGhvZCAiYXJjVEJEX3NldF9hc3NldF9wb2xpY3kodWludDY0LHVpbnQ2NCxieXRlW10sYnl0ZVtdLGJvb2wsYm9vbCxib29sKSh1aW50NjQsYm9vbCwodWludDgsdWludDY0KSkiLCBtZXRob2QgImFyY1RCRF9zZXRfbWFuYWdlcl9wb2xpY3koYnl0ZVtdLGJ5dGVbXSxib29sLGJvb2wpKHVpbnQ2NCxib29sLCh1aW50OCx1aW50NjQpKSIsIG1ldGhvZCAiYXJjVEJEX2RlbGV0ZV9hc3NldF9wb2xpY3kodWludDY0LHVpbnQ2NCkoYm9vbCx1aW50OCx1aW50NjQpIiwgbWV0aG9kICJhcmNUQkRfZGVsZXRlX21hbmFnZXJfcG9saWN5KCkoYm9vbCx1aW50OCx1aW50NjQpIiwgbWV0aG9kICJhcmNUQkRfc2V0X2dyYW50KGJ5dGVbXSkodWludDY0LGJvb2wsKHVpbnQ4LHVpbnQ2NCkpIiwgbWV0aG9kICJhcmNUQkRfZGVsZXRlX2dyYW50KCkoYm9vbCx1aW50OCx1aW50NjQpIiwgbWV0aG9kICJhcmNUQkRfcHVyZ2UoYnl0ZVtdKShib29sLHVpbnQ4LHVpbnQ2NCkiLCBtZXRob2QgImFyY1RCRF9nZXRfbWFpbih1aW50NjQpKHVpbnQ4LGJ5dGVbXSkiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCB3cml0ZVZhcmlhdGlvbiBkZWxldGVWYXJpYXRpb24gcGluTWFpbkNyZWF0b3IgcGluTWFpbkhvbGRlciB1bnBpbk1haW5DcmVhdG9yIHVucGluTWFpbkhvbGRlciBzZXRBc3NldFBvbGljeSBzZXRNYW5hZ2VyUG9saWN5IGRlbGV0ZUFzc2V0UG9saWN5IGRlbGV0ZU1hbmFnZXJQb2xpY3kgc2V0R3JhbnQgZGVsZXRlR3JhbnQgcHVyZ2UgZ2V0TWFpbgogICAgZXJyCgptYWluX2NyZWF0ZV9Ob09wQDIwOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoyMDQtMjA1CiAgICAvLyBAY29udHJhY3QoeyBhdm1WZXJzaW9uOiAxMyB9KQogICAgLy8gZXhwb3J0IGNsYXNzIENvbGxlY3RpYmxlVmFyaWF0aW9ucyBleHRlbmRzIENvbnRyYWN0IHsKICAgIHB1c2hieXRlcyAweDk0NzlmZjYzIC8vIG1ldGhvZCAiY3JlYXRlKHVpbnQ2NCx1aW50NjQpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIGNyZWF0ZQogICAgZXJyCgoKLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo6Q29sbGVjdGlibGVWYXJpYXRpb25zLmNyZWF0ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNyZWF0ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjE0CiAgICAvLyBAYWJpbWV0aG9kKHsgb25DcmVhdGU6ICdyZXF1aXJlJyB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjIxNwogICAgLy8gbG9nZ2VkQXNzZXJ0KG1ldGFBcHAgIT09IDAgJiYgbWV0YVRyZWVUeXBlICE9PSAwLCBlcnJCYWRBcmd1bWVudCkKICAgIGJ6IGNyZWF0ZV9ib29sX2ZhbHNlQDQKICAgIGR1cAogICAgYnogY3JlYXRlX2Jvb2xfZmFsc2VANAogICAgaW50Y18xIC8vIDEKCmNyZWF0ZV9ib29sX21lcmdlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjIxNwogICAgLy8gbG9nZ2VkQXNzZXJ0KG1ldGFBcHAgIT09IDAgJiYgbWV0YVRyZWVUeXBlICE9PSAwLCBlcnJCYWRBcmd1bWVudCkKICAgIGJueiBjcmVhdGVfYWZ0ZXJfYXNzZXJ0QDcKICAgIGJ5dGVjIDYgLy8gIkVSUjplcnJDdkJhIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckN2QmEKCmNyZWF0ZV9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjA4CiAgICAvLyBtZXRhQXBwID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogR2xvYmFsU3RhdGVLZXlNZXRhQXBwIH0pCiAgICBieXRlYyAxNyAvLyAiYSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjE4CiAgICAvLyB0aGlzLm1ldGFBcHAudmFsdWUgPSBtZXRhQXBwCiAgICB1bmNvdmVyIDIKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjIxMAogICAgLy8gbWV0YVRyZWVUeXBlID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogR2xvYmFsU3RhdGVLZXlNZXRhVHJlZVR5cGUgfSkKICAgIGJ5dGVjIDE4IC8vICJ0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoyMTkKICAgIC8vIHRoaXMubWV0YVRyZWVUeXBlLnZhbHVlID0gbWV0YVRyZWVUeXBlCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoyMjAKICAgIC8vIG9wLkFwcFBhcmFtc1NldC5hcHBGb3JlaWduQm94UmVhZHModHJ1ZSkKICAgIGludGNfMSAvLyAxCiAgICBhcHBfcGFyYW1zX3NldCBBcHBGb3JlaWduQm94UmVhZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjE0CiAgICAvLyBAYWJpbWV0aG9kKHsgb25DcmVhdGU6ICdyZXF1aXJlJyB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKY3JlYXRlX2Jvb2xfZmFsc2VANDoKICAgIGludGNfMCAvLyAwCiAgICBiIGNyZWF0ZV9ib29sX21lcmdlQDUKCgovLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMud3JpdGVWYXJpYXRpb25bcm91dGluZ10oKSAtPiB2b2lkOgp3cml0ZVZhcmlhdGlvbjoKICAgIGludGNfMCAvLyAwCiAgICBkdXBuIDUKICAgIGJ5dGVjXzAgLy8gIiIKICAgIGR1cG4gOAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoyMzAKICAgIC8vIEBhYmltZXRob2QoeyBuYW1lOiAnYXJjVEJEX3dyaXRlX3ZhcmlhdGlvbicgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgMgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIGNvdmVyIDIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgY292ZXIgMwogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDUKICAgIGR1cAogICAgY292ZXIgMwogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50OAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNgogICAgZHVwCiAgICBjb3ZlciAzCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ4CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA3CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18xIC8vIDEKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuYm9vbAogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgY292ZXIgMgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgOAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIGNvdmVyIDMKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDkKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBjb3ZlciAzCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxMAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgMwogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTEKICAgIGR1cAogICAgY292ZXIgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgZHVwCiAgICBjb3ZlciA2CiAgICBwdXNoaW50IDMyCiAgICAqCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8Ynl0ZXNbMzJdPgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoyNDQKICAgIC8vIGNvbnN0IGZhY3RzID0gdGhpcy5hc3NldEZhY3RzKGFzc2V0KQogICAgY2FsbHN1YiBhc3NldEZhY3RzCiAgICBkdXAKICAgIGNvdmVyIDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjQ1CiAgICAvLyBsb2dnZWRBc3NlcnQoZmFjdHMuZXhpc3RzLCBlcnJBc3NldE1pc3NpbmcpCiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Yml0CiAgICBibnogd3JpdGVWYXJpYXRpb25fYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDcgLy8gIkVSUjplcnJDdkFtIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckN2QW0KCndyaXRlVmFyaWF0aW9uX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoyNDYKICAgIC8vIGNvbnN0IGhvbGRlclNjb3BlID0gaG9sZGVyICE9PSBHbG9iYWwuemVyb0FkZHJlc3MKICAgIGRpZyAxMAogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICAhPQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI0NwogICAgLy8gY29uc3QgaGVhZGVyOiB1aW50NjQgPSBob2xkZXJTY29wZSA/IFZGbGF0SG9sZGVyIDogVkZsYXRDb2xsZWN0aWJsZQogICAgcHVzaGludHMgMTQgNDcKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBidXJ5IDIwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI0OAogICAgLy8gY29uc3QgbmVlZHNGbGF0ID0ga2luZC5hc1VpbnQ2NCgpID09PSBLaW5kSW1hZ2UgfHwga2luZC5hc1VpbnQ2NCgpID09PSBLaW5kUmVuZGVyQnVuZGxlCiAgICBkaWcgMTAKICAgIGJ0b2kKICAgIGR1cAogICAgaW50Y18xIC8vIDEKICAgID09CiAgICBibnogd3JpdGVWYXJpYXRpb25fYm9vbF90cnVlQDUKICAgIGR1cAogICAgaW50Y18yIC8vIDIKICAgID09CiAgICBieiB3cml0ZVZhcmlhdGlvbl9ib29sX2ZhbHNlQDYKCndyaXRlVmFyaWF0aW9uX2Jvb2xfdHJ1ZUA1OgogICAgaW50Y18xIC8vIDEKICAgIGJ1cnkgMjAKCndyaXRlVmFyaWF0aW9uX2Jvb2xfbWVyZ2VANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjUwLTI1MQogICAgLy8ga2luZC5hc1VpbnQ2NCgpICE9PSAwICYmCiAgICAvLyAgIHNsb3QubGVuZ3RoID49IDEgJiYKICAgIGJ6IHdyaXRlVmFyaWF0aW9uX2Jvb2xfZmFsc2VAMTQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjUxCiAgICAvLyBzbG90Lmxlbmd0aCA+PSAxICYmCiAgICBkaWcgMTIKICAgIGxlbgogICAgZHVwCiAgICBidXJ5IDE4CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI1MC0yNTEKICAgIC8vIGtpbmQuYXNVaW50NjQoKSAhPT0gMCAmJgogICAgLy8gICBzbG90Lmxlbmd0aCA+PSAxICYmCiAgICBieiB3cml0ZVZhcmlhdGlvbl9ib29sX2ZhbHNlQDE0CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI1MgogICAgLy8gc2xvdC5sZW5ndGggPD0gTWF4U2xvdEJ5dGVzICYmCiAgICBkaWcgMTYKICAgIHB1c2hpbnQgMjMKICAgIDw9CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI1MC0yNTIKICAgIC8vIGtpbmQuYXNVaW50NjQoKSAhPT0gMCAmJgogICAgLy8gICBzbG90Lmxlbmd0aCA+PSAxICYmCiAgICAvLyAgIHNsb3QubGVuZ3RoIDw9IE1heFNsb3RCeXRlcyAmJgogICAgYnogd3JpdGVWYXJpYXRpb25fYm9vbF9mYWxzZUAxNAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoyNTMKICAgIC8vIHByb29mLmxlbmd0aCA8PSBNYXhQcm9vZkxldmVscyAmJgogICAgZGlnIDUKICAgIHB1c2hpbnQgMjQKICAgIDw9CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI1MC0yNTMKICAgIC8vIGtpbmQuYXNVaW50NjQoKSAhPT0gMCAmJgogICAgLy8gICBzbG90Lmxlbmd0aCA+PSAxICYmCiAgICAvLyAgIHNsb3QubGVuZ3RoIDw9IE1heFNsb3RCeXRlcyAmJgogICAgLy8gICBwcm9vZi5sZW5ndGggPD0gTWF4UHJvb2ZMZXZlbHMgJiYKICAgIGJ6IHdyaXRlVmFyaWF0aW9uX2Jvb2xfZmFsc2VAMTQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjU0CiAgICAvLyAoIW5lZWRzRmxhdCB8fCBmbGF0Lmxlbmd0aCA+IDApLAogICAgZGlnIDE4CiAgICBieiB3cml0ZVZhcmlhdGlvbl9ib29sX3RydWVAMTMKICAgIGRpZyA4CiAgICBsZW4KICAgIGJ6IHdyaXRlVmFyaWF0aW9uX2Jvb2xfZmFsc2VAMTQKCndyaXRlVmFyaWF0aW9uX2Jvb2xfdHJ1ZUAxMzoKICAgIGludGNfMSAvLyAxCgp3cml0ZVZhcmlhdGlvbl9ib29sX21lcmdlQDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoyNDktMjU2CiAgICAvLyBsb2dnZWRBc3NlcnQoCiAgICAvLyAgIGtpbmQuYXNVaW50NjQoKSAhPT0gMCAmJgogICAgLy8gICAgIHNsb3QubGVuZ3RoID49IDEgJiYKICAgIC8vICAgICBzbG90Lmxlbmd0aCA8PSBNYXhTbG90Qnl0ZXMgJiYKICAgIC8vICAgICBwcm9vZi5sZW5ndGggPD0gTWF4UHJvb2ZMZXZlbHMgJiYKICAgIC8vICAgICAoIW5lZWRzRmxhdCB8fCBmbGF0Lmxlbmd0aCA+IDApLAogICAgLy8gICBlcnJCYWRBcmd1bWVudCwKICAgIC8vICkKICAgIGJueiB3cml0ZVZhcmlhdGlvbl9hZnRlcl9hc3NlcnRAMTcKICAgIGJ5dGVjIDYgLy8gIkVSUjplcnJDdkJhIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckN2QmEKCndyaXRlVmFyaWF0aW9uX2FmdGVyX2Fzc2VydEAxNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjU3CiAgICAvLyBsb2dnZWRBc3NlcnQoZmxhdC5sZW5ndGggPD0gTWF4RmxhdEJ5dGVzICYmIGhlYWRlciArIGZsYXQubGVuZ3RoICsgYm9keS5sZW5ndGggPD0gTWF4VmFsdWVCeXRlcywgZXJyVG9vTGFyZ2UpCiAgICBkaWcgOAogICAgbGVuCiAgICBkdXAKICAgIGJ1cnkgMTcKICAgIHB1c2hpbnQgNzY4CiAgICA8PQogICAgYnogd3JpdGVWYXJpYXRpb25fYm9vbF9mYWxzZUAyMAogICAgZGlnIDE5CiAgICBkaWcgMTYKICAgICsKICAgIGRpZyA4CiAgICBsZW4KICAgICsKICAgIHB1c2hpbnQgNDA5NgogICAgPD0KICAgIGJ6IHdyaXRlVmFyaWF0aW9uX2Jvb2xfZmFsc2VAMjAKICAgIGludGNfMSAvLyAxCgp3cml0ZVZhcmlhdGlvbl9ib29sX21lcmdlQDIxOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoyNTcKICAgIC8vIGxvZ2dlZEFzc2VydChmbGF0Lmxlbmd0aCA8PSBNYXhGbGF0Qnl0ZXMgJiYgaGVhZGVyICsgZmxhdC5sZW5ndGggKyBib2R5Lmxlbmd0aCA8PSBNYXhWYWx1ZUJ5dGVzLCBlcnJUb29MYXJnZSkKICAgIGJueiB3cml0ZVZhcmlhdGlvbl9hZnRlcl9hc3NlcnRAMjMKICAgIHB1c2hieXRlcyAiRVJSOmVyckN2VGwiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQ3ZUbAoKd3JpdGVWYXJpYXRpb25fYWZ0ZXJfYXNzZXJ0QDIzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoyNjAKICAgIC8vIGlmIChsb2NrKSBmbGFncyA9IGZsYWdzIHwgRmxhZ0xvY2tlZAogICAgdW5jb3ZlciAzCiAgICBibnogd3JpdGVWYXJpYXRpb25faWZfYm9keUAyNAogICAgZHVwCiAgICBidXJ5IDIxCgp3cml0ZVZhcmlhdGlvbl9hZnRlcl9pZl9lbHNlQDI1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoyNjEKICAgIC8vIGNvbnN0IG5hbWUgPSB0aGlzLnZhcmlhdGlvbk5hbWUoYXNzZXQsIFR4bi5zZW5kZXIsIHNsb3QpCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNjAKICAgIC8vIHJldHVybiBQcmVmaXhWYXJpYXRpb24uY29uY2F0KGl0b2IoYXNzZXQpKS5jb25jYXQod3JpdGVyLmJ5dGVzKS5jb25jYXQoc2xvdCkKICAgIGRpZyAzCiAgICBpdG9iCiAgICBkdXAKICAgIGJ1cnkgMjUKICAgIGJ5dGVjIDExIC8vICJ2IgogICAgc3dhcAogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGRpZyAxMgogICAgY29uY2F0CiAgICBkdXAKICAgIGJ1cnkgMjYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjYyCiAgICAvLyBjb25zdCBbc3RvcmVkLCBleGlzdHNdID0gb3AuQm94LmdldChuYW1lKQogICAgYm94X2dldAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBidXJ5IDI0CiAgICBidXJ5IDI1CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI2MwogICAgLy8gY29uc3Qgc3RvcmVkUmV2aXNpb246IHVpbnQ2NCA9IGV4aXN0cyA/IGJ0b2koc3RvcmVkLnNsaWNlKFZSZXZpc2lvbiwgVlJldmlzaW9uICsgOCkpIDogMAogICAgYnogd3JpdGVWYXJpYXRpb25fdGVybmFyeV9mYWxzZUAyNwogICAgZGlnIDIzCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA0CiAgICBkaWcgMQogICAgPj0KICAgIHB1c2hpbnQgNAogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBwdXNoaW50IDEyCiAgICBkaWcgMgogICAgPj0KICAgIHB1c2hpbnQgMTIKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIHN1YnN0cmluZzMKICAgIGJ0b2kKICAgIGJ1cnkgMTcKCndyaXRlVmFyaWF0aW9uX3Rlcm5hcnlfbWVyZ2VAMjg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI2NgogICAgLy8gY29uc3QgY2FuZGlkYXRlID0gdGhpcy52YXJpYXRpb25WYWx1ZShmbGFncywga2luZCwgc3ViLCBzdG9yZWRSZXZpc2lvbiwgaG9sZGVyLCBmYWN0cy5kZWNpbWFscywgZmxhdCwgYm9keSkKICAgIGRpZyAzCiAgICBwdXNoaW50IDEwNQogICAgZXh0cmFjdF91aW50NjQKICAgIGRpZyAyMQogICAgZGlnIDExCiAgICBkaWcgMTEKICAgIGRpZyAyMAogICAgZGlnIDE1CiAgICB1bmNvdmVyIDUKICAgIGRpZyAxMwogICAgZGlnIDEzCiAgICBjYWxsc3ViIHZhcmlhdGlvblZhbHVlCiAgICBidXJ5IDI4CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI2NwogICAgLy8gaWYgKGV4aXN0cyAmJiBjYW5kaWRhdGUgPT09IHN0b3JlZCkgewogICAgZGlnIDIxCiAgICBieiB3cml0ZVZhcmlhdGlvbl9hZnRlcl9pZl9lbHNlQDMxCiAgICBkaWcgMjcKICAgIGRpZyAyNAogICAgPT0KICAgIGJ6IHdyaXRlVmFyaWF0aW9uX2FmdGVyX2lmX2Vsc2VAMzEKICAgIHBvcG4gMwogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoyNjgKICAgIC8vIHRoaXMuZXhwZWN0Tm9QYXltZW50KCkKICAgIGNhbGxzdWIgZXhwZWN0Tm9QYXltZW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI2OQogICAgLy8gcmV0dXJuIHsgcmV2aXNpb246IHN0b3JlZFJldmlzaW9uLCBjaGFuZ2VkOiBmYWxzZSwgbWJyOiB7IHNpZ246IG5ldyBVaW50OChNYnJOdWxsKSwgYW1vdW50OiAwIH0gfQogICAgZGlnIDEzCiAgICBpdG9iCiAgICBieXRlY18yIC8vIDB4MDAwMDAwMDAwMDAwMDAwMDAwMDAKICAgIGNvbmNhdAoKd3JpdGVWYXJpYXRpb25fYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMud3JpdGVWYXJpYXRpb25ANjc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjIzMAogICAgLy8gQGFiaW1ldGhvZCh7IG5hbWU6ICdhcmNUQkRfd3JpdGVfdmFyaWF0aW9uJyB9KQogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKd3JpdGVWYXJpYXRpb25fYWZ0ZXJfaWZfZWxzZUAzMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjczCiAgICAvLyBpZiAoZXhpc3RzICYmIChnZXRCeXRlKHN0b3JlZCwgVkZsYWdzKSAmIEZsYWdMb2NrZWQpICE9PSAwKSB7CiAgICBkaWcgMjEKICAgIGJ6IHdyaXRlVmFyaWF0aW9uX2FmdGVyX2lmX2Vsc2VANDAKICAgIGRpZyAyMwogICAgaW50Y18xIC8vIDEKICAgIGdldGJ5dGUKICAgIGR1cAogICAgYnVyeSAxNQogICAgaW50YyA0IC8vIDEyOAogICAgJgogICAgYnogd3JpdGVWYXJpYXRpb25fYWZ0ZXJfaWZfZWxzZUA0MAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoyNzUKICAgIC8vIChnZXRCeXRlKHN0b3JlZCwgVkZsYWdzKSAmIEZsYWdIb2xkZXJTY29wZSkgIT09IDAgJiYKICAgIGRpZyAxMwogICAgaW50Y18xIC8vIDEKICAgICYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mjc1LTI3NgogICAgLy8gKGdldEJ5dGUoc3RvcmVkLCBWRmxhZ3MpICYgRmxhZ0hvbGRlclNjb3BlKSAhPT0gMCAmJgogICAgLy8gICAhdGhpcy5ob2xkcyh0aGlzLnN0b3JlZEhvbGRlcihzdG9yZWQpLCBhc3NldCwgZ2V0Qnl0ZShzdG9yZWQsIFZEZWNpbWFscykpLAogICAgYnogd3JpdGVWYXJpYXRpb25fYm9vbF9mYWxzZUAzNgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoyNzYKICAgIC8vICF0aGlzLmhvbGRzKHRoaXMuc3RvcmVkSG9sZGVyKHN0b3JlZCksIGFzc2V0LCBnZXRCeXRlKHN0b3JlZCwgVkRlY2ltYWxzKSksCiAgICBkaWcgMjMKICAgIGR1cAogICAgY2FsbHN1YiBzdG9yZWRIb2xkZXIKICAgIHN3YXAKICAgIHB1c2hpbnQgNDYKICAgIGdldGJ5dGUKICAgIGRpZyA0CiAgICBzd2FwCiAgICBjYWxsc3ViIGhvbGRzCiAgICBibnogd3JpdGVWYXJpYXRpb25fYm9vbF9mYWxzZUAzNgogICAgaW50Y18xIC8vIDEKCndyaXRlVmFyaWF0aW9uX2Jvb2xfbWVyZ2VAMzc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI3NC0yNzgKICAgIC8vIGxvZ2dlZEFzc2VydCgKICAgIC8vICAgKGdldEJ5dGUoc3RvcmVkLCBWRmxhZ3MpICYgRmxhZ0hvbGRlclNjb3BlKSAhPT0gMCAmJgogICAgLy8gICAgICF0aGlzLmhvbGRzKHRoaXMuc3RvcmVkSG9sZGVyKHN0b3JlZCksIGFzc2V0LCBnZXRCeXRlKHN0b3JlZCwgVkRlY2ltYWxzKSksCiAgICAvLyAgIGVyckxvY2tlZCwKICAgIC8vICkKICAgIGJueiB3cml0ZVZhcmlhdGlvbl9hZnRlcl9pZl9lbHNlQDQwCiAgICBieXRlYyAxMCAvLyAiRVJSOmVyckN2TGsiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQ3ZMawoKd3JpdGVWYXJpYXRpb25fYWZ0ZXJfaWZfZWxzZUA0MDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjgyCiAgICAvLyBpZiAoaG9sZGVyU2NvcGUpIHsKICAgIGJ6IHdyaXRlVmFyaWF0aW9uX2Vsc2VfYm9keUA1MAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoyODMKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmlzVW5pdEFzc2V0KGZhY3RzKSAmJiB0aGlzLmhvbGRzKGhvbGRlciwgYXNzZXQsIGZhY3RzLmRlY2ltYWxzKSwgZXJyTm90SG9sZGVyKQogICAgZGlnIDIKICAgIGNhbGxzdWIgaXNVbml0QXNzZXQKICAgIGJ1cnkgNAogICAgYnogd3JpdGVWYXJpYXRpb25fYm9vbF9mYWxzZUA0NAogICAgZGlnIDIKICAgIHB1c2hpbnQgMTA1CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZGlnIDEwCiAgICBkaWcgMwogICAgdW5jb3ZlciAyCiAgICBjYWxsc3ViIGhvbGRzCiAgICBieiB3cml0ZVZhcmlhdGlvbl9ib29sX2ZhbHNlQDQ0CiAgICBpbnRjXzEgLy8gMQoKd3JpdGVWYXJpYXRpb25fYm9vbF9tZXJnZUA0NToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjgzCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5pc1VuaXRBc3NldChmYWN0cykgJiYgdGhpcy5ob2xkcyhob2xkZXIsIGFzc2V0LCBmYWN0cy5kZWNpbWFscyksIGVyck5vdEhvbGRlcikKICAgIGJueiB3cml0ZVZhcmlhdGlvbl9hZnRlcl9hc3NlcnRANDcKICAgIGJ5dGVjIDI2IC8vICJFUlI6ZXJyQ3ZOaCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJDdk5oCgp3cml0ZVZhcmlhdGlvbl9hZnRlcl9hc3NlcnRANDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc4OQogICAgLy8gaWYgKFR4bi5zZW5kZXIgPT09IGhvbGRlcikgcmV0dXJuIHRydWUKICAgIHR4biBTZW5kZXIKICAgIGRpZyAxMAogICAgPT0KICAgIGJ6IHdyaXRlVmFyaWF0aW9uX2FmdGVyX2lmX2Vsc2VAODEKICAgIHBvcG4gMgogICAgaW50Y18xIC8vIDEKCndyaXRlVmFyaWF0aW9uX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo6Q29sbGVjdGlibGVWYXJpYXRpb25zLmFkbWl0c0hvbGRlckA5NjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mjg0CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5hZG1pdHNIb2xkZXIoYXNzZXQsIGZhY3RzLCBzbG90LCBob2xkZXIsIHByb29mKSwgZXJyTm90QXV0aG9yaXplZCkKICAgIGJueiB3cml0ZVZhcmlhdGlvbl9hZnRlcl9pZl9lbHNlQDUzCiAgICBieXRlYyAxMiAvLyAiRVJSOmVyckN2TmEiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQ3ZOYQoKd3JpdGVWYXJpYXRpb25fYWZ0ZXJfaWZfZWxzZUA1MzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjkwCiAgICAvLyBpZlJldmlzaW9uID09PSBJZkFueSB8fCAoaWZSZXZpc2lvbiA9PT0gSWZBYnNlbnQgPyAhZXhpc3RzIDogZXhpc3RzICYmIHN0b3JlZFJldmlzaW9uID09PSBpZlJldmlzaW9uKSwKICAgIGRpZyAyCiAgICBwdXNoaW50IDE4NDQ2NzQ0MDczNzA5NTUxNjE1CiAgICA9PQogICAgYm56IHdyaXRlVmFyaWF0aW9uX2Jvb2xfdHJ1ZUA2MgogICAgZGlnIDIKICAgIGJueiB3cml0ZVZhcmlhdGlvbl90ZXJuYXJ5X2ZhbHNlQDU2CiAgICBkaWcgMTgKICAgICEKCndyaXRlVmFyaWF0aW9uX3Rlcm5hcnlfbWVyZ2VANjE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI5MAogICAgLy8gaWZSZXZpc2lvbiA9PT0gSWZBbnkgfHwgKGlmUmV2aXNpb24gPT09IElmQWJzZW50ID8gIWV4aXN0cyA6IGV4aXN0cyAmJiBzdG9yZWRSZXZpc2lvbiA9PT0gaWZSZXZpc2lvbiksCiAgICBieiB3cml0ZVZhcmlhdGlvbl9ib29sX2ZhbHNlQDYzCgp3cml0ZVZhcmlhdGlvbl9ib29sX3RydWVANjI6CiAgICBpbnRjXzEgLy8gMQoKd3JpdGVWYXJpYXRpb25fYm9vbF9tZXJnZUA2NDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mjg5LTI5MgogICAgLy8gbG9nZ2VkQXNzZXJ0KAogICAgLy8gICBpZlJldmlzaW9uID09PSBJZkFueSB8fCAoaWZSZXZpc2lvbiA9PT0gSWZBYnNlbnQgPyAhZXhpc3RzIDogZXhpc3RzICYmIHN0b3JlZFJldmlzaW9uID09PSBpZlJldmlzaW9uKSwKICAgIC8vICAgZXJyUHJlY29uZGl0aW9uRmFpbGVkLAogICAgLy8gKQogICAgYm56IHdyaXRlVmFyaWF0aW9uX2FmdGVyX2Fzc2VydEA2NgogICAgcHVzaGJ5dGVzICJFUlI6ZXJyQ3ZQZiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJDdlBmCgp3cml0ZVZhcmlhdGlvbl9hZnRlcl9hc3NlcnRANjY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI5NAogICAgLy8gY29uc3QgcmV2aXNpb24gPSB0aGlzLm5leHRSZXZpc2lvbigpCiAgICBjYWxsc3ViIG5leHRSZXZpc2lvbgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoyOTUKICAgIC8vIGNvbnN0IHZhbHVlID0gdGhpcy52YXJpYXRpb25WYWx1ZShmbGFncywga2luZCwgc3ViLCByZXZpc2lvbiwgaG9sZGVyLCBmYWN0cy5kZWNpbWFscywgZmxhdCwgYm9keSkKICAgIGRpZyAxCiAgICBwdXNoaW50IDEwNQogICAgZXh0cmFjdF91aW50NjQKICAgIGRpZyAxOQogICAgZHVwCiAgICBjb3ZlciAzCiAgICBkaWcgMTAKICAgIGR1cAogICAgY292ZXIgNQogICAgZGlnIDExCiAgICBkaWcgNAogICAgZGlnIDE1CiAgICB1bmNvdmVyIDUKICAgIGRpZyAxMwogICAgZGlnIDEzCiAgICBjYWxsc3ViIHZhcmlhdGlvblZhbHVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMDgKICAgIC8vIHJldHVybiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcy5taW5CYWxhbmNlCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RNaW5CYWxhbmNlCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mjk3CiAgICAvLyB0aGlzLnB1dEJveChuYW1lLCB2YWx1ZSkKICAgIGRpZyAyNgogICAgdW5jb3ZlciAyCiAgICBjYWxsc3ViIHB1dEJveAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoyOTgKICAgIC8vIGNvbnN0IG1iciA9IHRoaXMuc2V0dGxlKGJlZm9yZSwgeyBwYWlkOiAwLCByZWZ1bmRlZDogMCB9LCBUeG4uc2VuZGVyKQogICAgYnl0ZWMgMTkgLy8gMHgwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAogICAgdHhuIFNlbmRlcgogICAgY2FsbHN1YiBzZXR0bGUKICAgIHBvcAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czozMDIKICAgIC8vIHdyaXRlcjogVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzA1CiAgICAvLyBmbGFnczogbmV3IFVpbnQ4KGZsYWdzKSwKICAgIHVuY292ZXIgMgogICAgaXRvYgogICAgZHVwCiAgICBiaXRsZW4KICAgIGludGNfMyAvLyA4CiAgICA8PQogICAgYXNzZXJ0IC8vIG92ZXJmbG93CiAgICBleHRyYWN0IDcgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czozMDcKICAgIC8vIHJvdW5kOiBHbG9iYWwucm91bmQsCiAgICBnbG9iYWwgUm91bmQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzA4CiAgICAvLyB0aW1lc3RhbXA6IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjMwMC0zMDkKICAgIC8vIGVtaXQ8VmFyaWF0aW9uV3JpdHRlbj4oewogICAgLy8gICBhc3NldCwKICAgIC8vICAgd3JpdGVyOiBUeG4uc2VuZGVyLAogICAgLy8gICBzbG90LAogICAgLy8gICByZXZpc2lvbiwKICAgIC8vICAgZmxhZ3M6IG5ldyBVaW50OChmbGFncyksCiAgICAvLyAgIGtpbmQsCiAgICAvLyAgIHJvdW5kOiBHbG9iYWwucm91bmQsCiAgICAvLyAgIHRpbWVzdGFtcDogR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIC8vIH0pCiAgICBkaWcgMjYKICAgIHVuY292ZXIgNAogICAgY29uY2F0CiAgICBkaWcgMTUKICAgIGR1cAogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgc3dhcAogICAgY29uY2F0CiAgICBzd2FwCiAgICBwdXNoYnl0ZXMgMHgwMDQ0CiAgICBjb25jYXQKICAgIHVuY292ZXIgNQogICAgaXRvYgogICAgc3dhcAogICAgZGlnIDEKICAgIGNvbmNhdAogICAgdW5jb3ZlciA1CiAgICBjb25jYXQKICAgIHVuY292ZXIgNQogICAgY29uY2F0CiAgICB1bmNvdmVyIDQKICAgIGl0b2IKICAgIGNvbmNhdAogICAgdW5jb3ZlciAzCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICBwdXNoYnl0ZXMgMHg2NzY0ODUxYiAvLyBtZXRob2QgIlZhcmlhdGlvbldyaXR0ZW4odWludDY0LGFkZHJlc3MsYnl0ZVtdLHVpbnQ2NCx1aW50OCx1aW50OCx1aW50NjQsdWludDY0KSIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjMxMAogICAgLy8gcmV0dXJuIHsgcmV2aXNpb24sIGNoYW5nZWQ6IHRydWUsIG1iciB9CiAgICBieXRlY18zIC8vIDB4ODAKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjIzMAogICAgLy8gQGFiaW1ldGhvZCh7IG5hbWU6ICdhcmNUQkRfd3JpdGVfdmFyaWF0aW9uJyB9KQogICAgYiB3cml0ZVZhcmlhdGlvbl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy53cml0ZVZhcmlhdGlvbkA2NwoKd3JpdGVWYXJpYXRpb25fYm9vbF9mYWxzZUA2MzoKICAgIGludGNfMCAvLyAwCiAgICBiIHdyaXRlVmFyaWF0aW9uX2Jvb2xfbWVyZ2VANjQKCndyaXRlVmFyaWF0aW9uX3Rlcm5hcnlfZmFsc2VANTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI5MAogICAgLy8gaWZSZXZpc2lvbiA9PT0gSWZBbnkgfHwgKGlmUmV2aXNpb24gPT09IElmQWJzZW50ID8gIWV4aXN0cyA6IGV4aXN0cyAmJiBzdG9yZWRSZXZpc2lvbiA9PT0gaWZSZXZpc2lvbiksCiAgICBkaWcgMTgKICAgIGJ6IHdyaXRlVmFyaWF0aW9uX2Jvb2xfZmFsc2VANTkKICAgIGRpZyAxMwogICAgZGlnIDMKICAgID09CiAgICBieiB3cml0ZVZhcmlhdGlvbl9ib29sX2ZhbHNlQDU5CiAgICBpbnRjXzEgLy8gMQogICAgYiB3cml0ZVZhcmlhdGlvbl90ZXJuYXJ5X21lcmdlQDYxCgp3cml0ZVZhcmlhdGlvbl9ib29sX2ZhbHNlQDU5OgogICAgaW50Y18wIC8vIDAKICAgIGIgd3JpdGVWYXJpYXRpb25fdGVybmFyeV9tZXJnZUA2MQoKd3JpdGVWYXJpYXRpb25fYWZ0ZXJfaWZfZWxzZUA4MToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzkwCiAgICAvLyBjb25zdCBncmFudE5hbWUgPSBQcmVmaXhHcmFudC5jb25jYXQoaG9sZGVyLmJ5dGVzKQogICAgYnl0ZWMgOSAvLyAiZyIKICAgIGRpZyAxMAogICAgY29uY2F0CiAgICBkdXAKICAgIGJ1cnkgMjYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzkxCiAgICAvLyBjb25zdCBbZ3JhbnRWYWx1ZSwgZ3JhbnRFeGlzdHNdID0gb3AuQm94LmdldChncmFudE5hbWUpCiAgICBib3hfZ2V0CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGJ1cnkgMjEKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzkyCiAgICAvLyBjb25zdCBncmFudCA9IGdyYW50RXhpc3RzID8gZ3JhbnRWYWx1ZS5zbGljZShHU2V0KSA6IEJ5dGVzLmZyb21IZXgoJzAwJykKICAgIGJ6IHdyaXRlVmFyaWF0aW9uX3Rlcm5hcnlfZmFsc2VAODMKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDkKICAgIGRpZyAxCiAgICA+PQogICAgcHVzaGludCA5CiAgICBkaWcgMgogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIHN3YXAKICAgIHN1YnN0cmluZzMKCndyaXRlVmFyaWF0aW9uX3Rlcm5hcnlfbWVyZ2VAODQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc5MwogICAgLy8gY29uc3QgcG9saWN5ID0gdGhpcy5lZmZlY3RpdmVQb2xpY3koYXNzZXQsIGZhY3RzLm1hbmFnZXIpCiAgICBkaWcgMwogICAgZXh0cmFjdCAzMyAzMgogICAgZGlnIDMKICAgIHN3YXAKICAgIGNhbGxzdWIgZWZmZWN0aXZlUG9saWN5CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6Nzk0CiAgICAvLyBjb25zdCBbLCBob2xkZXJTZXRdID0gdGhpcy5wb2xpY3lTZXRzKHBvbGljeS52YWx1ZSkKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMQogICAgaW50Y18yIC8vIDIKICAgIGV4dHJhY3RfdWludDE2CiAgICBkdXAKICAgIGNvdmVyIDQKICAgIHN1YnN0cmluZzMKICAgIGV4dHJhY3QgMiAwCiAgICBjYWxsc3ViIHBvbGljeVNldHMKICAgIGR1cAogICAgaW50Y18yIC8vIDIKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMQogICAgbGVuCiAgICBzdWJzdHJpbmczCiAgICBleHRyYWN0IDIgMAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo3OTUKICAgIC8vIGlmICh0aGlzLmFkbWl0c0xvY2FsbHkoZ3JhbnQsIFR4bi5zZW5kZXIpKSByZXR1cm4gdHJ1ZQogICAgZHVwCiAgICB0eG4gU2VuZGVyCiAgICBjYWxsc3ViIGFkbWl0c0xvY2FsbHkKICAgIGJ6IHdyaXRlVmFyaWF0aW9uX2FmdGVyX2lmX2Vsc2VAODYKICAgIHBvcG4gNgogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mjg0CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5hZG1pdHNIb2xkZXIoYXNzZXQsIGZhY3RzLCBzbG90LCBob2xkZXIsIHByb29mKSwgZXJyTm90QXV0aG9yaXplZCkKICAgIGIgd3JpdGVWYXJpYXRpb25fYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMuYWRtaXRzSG9sZGVyQDk2Cgp3cml0ZVZhcmlhdGlvbl9hZnRlcl9pZl9lbHNlQDg2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo3OTYKICAgIC8vIGlmICh0aGlzLmFkbWl0c0xvY2FsbHkoaG9sZGVyU2V0LCBUeG4uc2VuZGVyKSkgcmV0dXJuIHRydWUKICAgIGRpZyAxCiAgICB0eG4gU2VuZGVyCiAgICBjYWxsc3ViIGFkbWl0c0xvY2FsbHkKICAgIGJ6IHdyaXRlVmFyaWF0aW9uX2FmdGVyX2lmX2Vsc2VAODgKICAgIHBvcG4gNgogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mjg0CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5hZG1pdHNIb2xkZXIoYXNzZXQsIGZhY3RzLCBzbG90LCBob2xkZXIsIHByb29mKSwgZXJyTm90QXV0aG9yaXplZCkKICAgIGIgd3JpdGVWYXJpYXRpb25fYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMuYWRtaXRzSG9sZGVyQDk2Cgp3cml0ZVZhcmlhdGlvbl9hZnRlcl9pZl9lbHNlQDg4OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo3OTcKICAgIC8vIGlmIChncmFudEV4aXN0cyAmJiB0aGlzLmFkbWl0c0J5TWV0YShncmFudCwgTWV0YVRhZ0dyYW50LCBncmFudE5hbWUsIFR4bi5zZW5kZXIsIHByb29mKSkgcmV0dXJuIHRydWUKICAgIGRpZyAyMgogICAgYnogd3JpdGVWYXJpYXRpb25fYWZ0ZXJfaWZfZWxzZUA5MQogICAgdHhuIFNlbmRlcgogICAgZGlnIDEKICAgIGJ5dGVjIDkgLy8gImciCiAgICBkaWcgMzEKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciA4CiAgICBjYWxsc3ViIGFkbWl0c0J5TWV0YQogICAgY292ZXIgNQogICAgYnogd3JpdGVWYXJpYXRpb25fYWZ0ZXJfaWZfZWxzZUA5MQogICAgcG9wbiA2CiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoyODQKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmFkbWl0c0hvbGRlcihhc3NldCwgZmFjdHMsIHNsb3QsIGhvbGRlciwgcHJvb2YpLCBlcnJOb3RBdXRob3JpemVkKQogICAgYiB3cml0ZVZhcmlhdGlvbl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy5hZG1pdHNIb2xkZXJAOTYKCndyaXRlVmFyaWF0aW9uX2FmdGVyX2lmX2Vsc2VAOTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc5OAogICAgLy8gaWYgKHRoaXMuYWRtaXRzQnlNZXRhKGhvbGRlclNldCwgTWV0YVRhZ0hvbGRlciwgcG9saWN5Lm5hbWUsIFR4bi5zZW5kZXIsIHByb29mKSkgcmV0dXJuIHRydWUKICAgIHVuY292ZXIgMwogICAgZHVwCiAgICBsZW4KICAgIHN3YXAKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciAyCiAgICBzdWJzdHJpbmczCiAgICBleHRyYWN0IDIgMAogICAgdHhuIFNlbmRlcgogICAgZGlnIDMKICAgIGJ5dGVjIDIwIC8vICJoIgogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgNgogICAgY2FsbHN1YiBhZG1pdHNCeU1ldGEKICAgIHBvcAogICAgYnogd3JpdGVWYXJpYXRpb25fYWZ0ZXJfaWZfZWxzZUA5MwogICAgcG9wbiAzCiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoyODQKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmFkbWl0c0hvbGRlcihhc3NldCwgZmFjdHMsIHNsb3QsIGhvbGRlciwgcHJvb2YpLCBlcnJOb3RBdXRob3JpemVkKQogICAgYiB3cml0ZVZhcmlhdGlvbl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy5hZG1pdHNIb2xkZXJAOTYKCndyaXRlVmFyaWF0aW9uX2FmdGVyX2lmX2Vsc2VAOTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc5OQogICAgLy8gaWYgKHRoaXMuYWRtaXRzQnlEZWxlZ2F0ZShncmFudCwgYXNzZXQsIFR4bi5zZW5kZXIsIHNsb3QsIGhvbGRlcikpIHJldHVybiB0cnVlCiAgICBkaWcgMgogICAgdHhuIFNlbmRlcgogICAgZGlnIDEzCiAgICBkaWcgMTMKICAgIGNhbGxzdWIgYWRtaXRzQnlEZWxlZ2F0ZQogICAgYnogd3JpdGVWYXJpYXRpb25fYWZ0ZXJfaWZfZWxzZUA5NQogICAgcG9wbiAyCiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoyODQKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmFkbWl0c0hvbGRlcihhc3NldCwgZmFjdHMsIHNsb3QsIGhvbGRlciwgcHJvb2YpLCBlcnJOb3RBdXRob3JpemVkKQogICAgYiB3cml0ZVZhcmlhdGlvbl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy5hZG1pdHNIb2xkZXJAOTYKCndyaXRlVmFyaWF0aW9uX2FmdGVyX2lmX2Vsc2VAOTU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgwMAogICAgLy8gcmV0dXJuIHRoaXMuYWRtaXRzQnlEZWxlZ2F0ZShob2xkZXJTZXQsIGFzc2V0LCBUeG4uc2VuZGVyLCBzbG90LCBob2xkZXIpCiAgICB0eG4gU2VuZGVyCiAgICBzd2FwCiAgICBjb3ZlciAyCiAgICBkaWcgMTEKICAgIGRpZyAxMQogICAgY2FsbHN1YiBhZG1pdHNCeURlbGVnYXRlCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI4NAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYWRtaXRzSG9sZGVyKGFzc2V0LCBmYWN0cywgc2xvdCwgaG9sZGVyLCBwcm9vZiksIGVyck5vdEF1dGhvcml6ZWQpCiAgICBiIHdyaXRlVmFyaWF0aW9uX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo6Q29sbGVjdGlibGVWYXJpYXRpb25zLmFkbWl0c0hvbGRlckA5NgoKd3JpdGVWYXJpYXRpb25fdGVybmFyeV9mYWxzZUA4MzoKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo3OTIKICAgIC8vIGNvbnN0IGdyYW50ID0gZ3JhbnRFeGlzdHMgPyBncmFudFZhbHVlLnNsaWNlKEdTZXQpIDogQnl0ZXMuZnJvbUhleCgnMDAnKQogICAgYnl0ZWMgNCAvLyAweDAwCiAgICBiIHdyaXRlVmFyaWF0aW9uX3Rlcm5hcnlfbWVyZ2VAODQKCndyaXRlVmFyaWF0aW9uX2Jvb2xfZmFsc2VANDQ6CiAgICBpbnRjXzAgLy8gMAogICAgYiB3cml0ZVZhcmlhdGlvbl9ib29sX21lcmdlQDQ1Cgp3cml0ZVZhcmlhdGlvbl9lbHNlX2JvZHlANTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc3NgogICAgLy8gY29uc3QgcG9saWN5ID0gdGhpcy5lZmZlY3RpdmVQb2xpY3koYXNzZXQsIGZhY3RzLm1hbmFnZXIpCiAgICBkaWcgMgogICAgZXh0cmFjdCAzMyAzMgogICAgZGlnIDIKICAgIHN3YXAKICAgIGNhbGxzdWIgZWZmZWN0aXZlUG9saWN5CiAgICBkdXBuIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6Nzc3CiAgICAvLyBjb25zdCBbY29sbGVjdGlibGVdID0gdGhpcy5wb2xpY3lTZXRzKHBvbGljeS52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgZGlnIDEKICAgIGludGNfMiAvLyAyCiAgICBleHRyYWN0X3VpbnQxNgogICAgZHVwCiAgICBjb3ZlciA0CiAgICBzdWJzdHJpbmczCiAgICBleHRyYWN0IDIgMAogICAgZHVwCiAgICBjYWxsc3ViIHBvbGljeVNldHMKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMQogICAgaW50Y18yIC8vIDIKICAgIGV4dHJhY3RfdWludDE2CiAgICBzdWJzdHJpbmczCiAgICBleHRyYWN0IDIgMAogICAgZHVwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc3OAogICAgLy8gaWYgKHRoaXMuYWRtaXRzTG9jYWxseShjb2xsZWN0aWJsZSwgVHhuLnNlbmRlcikpIHJldHVybiB0cnVlCiAgICB0eG4gU2VuZGVyCiAgICBjYWxsc3ViIGFkbWl0c0xvY2FsbHkKICAgIGJ6IHdyaXRlVmFyaWF0aW9uX2FmdGVyX2lmX2Vsc2VANzAKICAgIHBvcG4gNgogICAgaW50Y18xIC8vIDEKCndyaXRlVmFyaWF0aW9uX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo6Q29sbGVjdGlibGVWYXJpYXRpb25zLmFkbWl0c0NvbGxlY3RpYmxlQDc4OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoyODYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmFkbWl0c0NvbGxlY3RpYmxlKGFzc2V0LCBjb250cm9sbGluZ0FwcCwgZmFjdHMsIHNsb3QsIHByb29mKSwgZXJyTm90QXV0aG9yaXplZCkKICAgIGJueiB3cml0ZVZhcmlhdGlvbl9hZnRlcl9pZl9lbHNlQDUzCiAgICBieXRlYyAxMiAvLyAiRVJSOmVyckN2TmEiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQ3ZOYQoKd3JpdGVWYXJpYXRpb25fYWZ0ZXJfaWZfZWxzZUA3MDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6Nzc5CiAgICAvLyBpZiAoKGdldEJ5dGUocG9saWN5LnZhbHVlLCBQRmxhZ3MpICYgUG9saWN5TWFuYWdlcldyaXRlcykgIT09IDApIHsKICAgIGludGNfMSAvLyAxCiAgICBnZXRieXRlCiAgICBpbnRjXzEgLy8gMQogICAgJgogICAgYnogd3JpdGVWYXJpYXRpb25fYWZ0ZXJfaWZfZWxzZUA3NQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo3ODAKICAgIC8vIGNvbnN0IGNyZWF0b3IgPSB0aGlzLnJlc29sdmVDcmVhdG9yKGFzc2V0LCBjb250cm9sbGluZ0FwcCwgZmFjdHMpCiAgICBkaWcgNAogICAgZGlnIDE1CiAgICBkaWcgNwogICAgY2FsbHN1YiByZXNvbHZlQ3JlYXRvcgogICAgYnVyeSA3CiAgICBkdXAKICAgIGJ1cnkgMzAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzgxCiAgICAvLyBpZiAoY3JlYXRvciAhPT0gR2xvYmFsLnplcm9BZGRyZXNzICYmIGNyZWF0b3IgPT09IFR4bi5zZW5kZXIpIHJldHVybiB0cnVlCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgICE9CiAgICBieiB3cml0ZVZhcmlhdGlvbl9hZnRlcl9pZl9lbHNlQDc1CiAgICBkaWcgMjgKICAgIHR4biBTZW5kZXIKICAgID09CiAgICBieiB3cml0ZVZhcmlhdGlvbl9hZnRlcl9pZl9lbHNlQDc1CiAgICBwb3BuIDUKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI4NgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYWRtaXRzQ29sbGVjdGlibGUoYXNzZXQsIGNvbnRyb2xsaW5nQXBwLCBmYWN0cywgc2xvdCwgcHJvb2YpLCBlcnJOb3RBdXRob3JpemVkKQogICAgYiB3cml0ZVZhcmlhdGlvbl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy5hZG1pdHNDb2xsZWN0aWJsZUA3OAoKd3JpdGVWYXJpYXRpb25fYWZ0ZXJfaWZfZWxzZUA3NToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzgzCiAgICAvLyBpZiAodGhpcy5hZG1pdHNCeU1ldGEoY29sbGVjdGlibGUsIE1ldGFUYWdDb2xsZWN0aWJsZSwgcG9saWN5Lm5hbWUsIFR4bi5zZW5kZXIsIHByb29mKSkgcmV0dXJuIHRydWUKICAgIHN3YXAKICAgIGR1cAogICAgbGVuCiAgICBzd2FwCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMgogICAgc3Vic3RyaW5nMwogICAgZXh0cmFjdCAyIDAKICAgIHR4biBTZW5kZXIKICAgIGRpZyAyCiAgICBieXRlYyAyMSAvLyAiYyIKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDUKICAgIGNhbGxzdWIgYWRtaXRzQnlNZXRhCiAgICBwb3AKICAgIGJ6IHdyaXRlVmFyaWF0aW9uX2FmdGVyX2lmX2Vsc2VANzcKICAgIHBvcG4gMgogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mjg2CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5hZG1pdHNDb2xsZWN0aWJsZShhc3NldCwgY29udHJvbGxpbmdBcHAsIGZhY3RzLCBzbG90LCBwcm9vZiksIGVyck5vdEF1dGhvcml6ZWQpCiAgICBiIHdyaXRlVmFyaWF0aW9uX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo6Q29sbGVjdGlibGVWYXJpYXRpb25zLmFkbWl0c0NvbGxlY3RpYmxlQDc4Cgp3cml0ZVZhcmlhdGlvbl9hZnRlcl9pZl9lbHNlQDc3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo3ODQKICAgIC8vIHJldHVybiB0aGlzLmFkbWl0c0J5RGVsZWdhdGUoY29sbGVjdGlibGUsIGFzc2V0LCBUeG4uc2VuZGVyLCBzbG90LCBHbG9iYWwuemVyb0FkZHJlc3MpCiAgICB0eG4gU2VuZGVyCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgIHVuY292ZXIgMgogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDMKICAgIGRpZyAxMgogICAgdW5jb3ZlciA0CiAgICBjYWxsc3ViIGFkbWl0c0J5RGVsZWdhdGUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mjg2CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5hZG1pdHNDb2xsZWN0aWJsZShhc3NldCwgY29udHJvbGxpbmdBcHAsIGZhY3RzLCBzbG90LCBwcm9vZiksIGVyck5vdEF1dGhvcml6ZWQpCiAgICBiIHdyaXRlVmFyaWF0aW9uX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo6Q29sbGVjdGlibGVWYXJpYXRpb25zLmFkbWl0c0NvbGxlY3RpYmxlQDc4Cgp3cml0ZVZhcmlhdGlvbl9ib29sX2ZhbHNlQDM2OgogICAgaW50Y18wIC8vIDAKICAgIGIgd3JpdGVWYXJpYXRpb25fYm9vbF9tZXJnZUAzNwoKd3JpdGVWYXJpYXRpb25fdGVybmFyeV9mYWxzZUAyNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjYzCiAgICAvLyBjb25zdCBzdG9yZWRSZXZpc2lvbjogdWludDY0ID0gZXhpc3RzID8gYnRvaShzdG9yZWQuc2xpY2UoVlJldmlzaW9uLCBWUmV2aXNpb24gKyA4KSkgOiAwCiAgICBpbnRjXzAgLy8gMAogICAgYnVyeSAxNwogICAgYiB3cml0ZVZhcmlhdGlvbl90ZXJuYXJ5X21lcmdlQDI4Cgp3cml0ZVZhcmlhdGlvbl9pZl9ib2R5QDI0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoyNjAKICAgIC8vIGlmIChsb2NrKSBmbGFncyA9IGZsYWdzIHwgRmxhZ0xvY2tlZAogICAgZHVwCiAgICBpbnRjIDQgLy8gMTI4CiAgICB8CiAgICBidXJ5IDIxCiAgICBiIHdyaXRlVmFyaWF0aW9uX2FmdGVyX2lmX2Vsc2VAMjUKCndyaXRlVmFyaWF0aW9uX2Jvb2xfZmFsc2VAMjA6CiAgICBpbnRjXzAgLy8gMAogICAgYiB3cml0ZVZhcmlhdGlvbl9ib29sX21lcmdlQDIxCgp3cml0ZVZhcmlhdGlvbl9ib29sX2ZhbHNlQDE0OgogICAgaW50Y18wIC8vIDAKICAgIGIgd3JpdGVWYXJpYXRpb25fYm9vbF9tZXJnZUAxNQoKd3JpdGVWYXJpYXRpb25fYm9vbF9mYWxzZUA2OgogICAgaW50Y18wIC8vIDAKICAgIGJ1cnkgMjAKICAgIGIgd3JpdGVWYXJpYXRpb25fYm9vbF9tZXJnZUA3CgoKLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo6Q29sbGVjdGlibGVWYXJpYXRpb25zLmRlbGV0ZVZhcmlhdGlvbltyb3V0aW5nXSgpIC0+IHZvaWQ6CmRlbGV0ZVZhcmlhdGlvbjoKICAgIGludGNfMCAvLyAwCiAgICBieXRlY18wIC8vICIiCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzE4CiAgICAvLyBAYWJpbWV0aG9kKHsgbmFtZTogJ2FyY1RCRF9kZWxldGVfdmFyaWF0aW9uJyB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciAyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czozMjAKICAgIC8vIGNvbnN0IGZhY3RzID0gdGhpcy5hc3NldEZhY3RzKGFzc2V0KQogICAgY2FsbHN1YiBhc3NldEZhY3RzCiAgICBkdXAKICAgIGNvdmVyIDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzIxCiAgICAvLyBsb2dnZWRBc3NlcnQoZmFjdHMuZXhpc3RzLCBlcnJBc3NldE1pc3NpbmcpCiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Yml0CiAgICBibnogZGVsZXRlVmFyaWF0aW9uX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA3IC8vICJFUlI6ZXJyQ3ZBbSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJDdkFtCgpkZWxldGVWYXJpYXRpb25fYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNjAKICAgIC8vIHJldHVybiBQcmVmaXhWYXJpYXRpb24uY29uY2F0KGl0b2IoYXNzZXQpKS5jb25jYXQod3JpdGVyLmJ5dGVzKS5jb25jYXQoc2xvdCkKICAgIGRpZyAxCiAgICBpdG9iCiAgICBieXRlYyAxMSAvLyAidiIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIGNvbmNhdAogICAgZGlnIDMKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjMyMwogICAgLy8gY29uc3QgW3N0b3JlZCwgZXhpc3RzXSA9IG9wLkJveC5nZXQobmFtZSkKICAgIGJveF9nZXQKICAgIHN3YXAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzI0CiAgICAvLyBpZiAoIWV4aXN0cykgewogICAgYm56IGRlbGV0ZVZhcmlhdGlvbl9hZnRlcl9pZl9lbHNlQDUKICAgIHBvcG4gNQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czozMjUKICAgIC8vIHRoaXMuZXhwZWN0Tm9QYXltZW50KCkKICAgIGNhbGxzdWIgZXhwZWN0Tm9QYXltZW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjMyNgogICAgLy8gcmV0dXJuIHsgcmVtb3ZlZDogZmFsc2UsIHJlYXNvbjogbmV3IFVpbnQ4KFJlbW92ZWROb25lKSwgcmVmdW5kOiAwIH0KICAgIGJ5dGVjXzIgLy8gMHgwMDAwMDAwMDAwMDAwMDAwMDAwMAoKZGVsZXRlVmFyaWF0aW9uX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo6Q29sbGVjdGlibGVWYXJpYXRpb25zLmRlbGV0ZVZhcmlhdGlvbkAyNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzE4CiAgICAvLyBAYWJpbWV0aG9kKHsgbmFtZTogJ2FyY1RCRF9kZWxldGVfdmFyaWF0aW9uJyB9KQogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKZGVsZXRlVmFyaWF0aW9uX2FmdGVyX2lmX2Vsc2VANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzI5CiAgICAvLyBjb25zdCBmbGFncyA9IGdldEJ5dGUoc3RvcmVkLCBWRmxhZ3MpCiAgICBkaWcgMQogICAgaW50Y18xIC8vIDEKICAgIGdldGJ5dGUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzMwCiAgICAvLyBjb25zdCBsb2NrZWQgPSAoZmxhZ3MgJiBGbGFnTG9ja2VkKSAhPT0gMAogICAgZHVwCiAgICBpbnRjIDQgLy8gMTI4CiAgICAmCiAgICBidXJ5IDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzMxCiAgICAvLyBjb25zdCBob2xkZXJTY29wZSA9IChmbGFncyAmIEZsYWdIb2xkZXJTY29wZSkgIT09IDAKICAgIGludGNfMSAvLyAxCiAgICAmCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjMzMgogICAgLy8gbGV0IHJlYXNvbjogdWludDY0ID0gUmVtb3ZlZE5vbmUKICAgIGludGNfMCAvLyAwCiAgICBidXJ5IDEwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjMzMwogICAgLy8gaWYgKFR4bi5zZW5kZXIgPT09IHdyaXRlciAmJiAhbG9ja2VkKSB7CiAgICB0eG4gU2VuZGVyCiAgICBkaWcgNAogICAgPT0KICAgIGJ6IGRlbGV0ZVZhcmlhdGlvbl9lbHNlX2JvZHlAOAogICAgZGlnIDgKICAgIGJueiBkZWxldGVWYXJpYXRpb25fZWxzZV9ib2R5QDgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czozMzQKICAgIC8vIHJlYXNvbiA9IFJlbW92ZWRCeVdyaXRlcgogICAgaW50Y18yIC8vIDIKICAgIGJ1cnkgOQoKZGVsZXRlVmFyaWF0aW9uX2FmdGVyX2lmX2Vsc2VAMjI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM0OAogICAgLy8gbG9nZ2VkQXNzZXJ0KHJlYXNvbiAhPT0gUmVtb3ZlZE5vbmUsIGVyck5vdEF1dGhvcml6ZWQpCiAgICBkaWcgOAogICAgYm56IGRlbGV0ZVZhcmlhdGlvbl9hZnRlcl9hc3NlcnRAMjQKICAgIGJ5dGVjIDEyIC8vICJFUlI6ZXJyQ3ZOYSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJDdk5hCgpkZWxldGVWYXJpYXRpb25fYWZ0ZXJfYXNzZXJ0QDI0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMTA4CiAgICAvLyByZXR1cm4gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MubWluQmFsYW5jZQogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0TWluQmFsYW5jZQogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM1MQogICAgLy8gb3AuQm94LmRlbGV0ZShuYW1lKQogICAgc3dhcAogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMDgKICAgIC8vIHJldHVybiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcy5taW5CYWxhbmNlCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RNaW5CYWxhbmNlCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzUyCiAgICAvLyBjb25zdCByZWZ1bmQ6IHVpbnQ2NCA9IGJlZm9yZSAtIHRoaXMuYXBwTWluQmFsYW5jZSgpCiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM1MwogICAgLy8gdGhpcy5leHBlY3ROb1BheW1lbnQoKQogICAgY2FsbHN1YiBleHBlY3ROb1BheW1lbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzU0CiAgICAvLyB0aGlzLnJlZnVuZCh3cml0ZXIsIHJlZnVuZCkKICAgIHVuY292ZXIgMgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBkaWcgMQogICAgY2FsbHN1YiByZWZ1bmQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzU2CiAgICAvLyB0aGlzLmVtaXREZWxldGVkKGFzc2V0LCB3cml0ZXIsIHNsb3QsIHN0b3JlZCwgcmVhc29uKQogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciA0CiAgICBkaWcgOAogICAgZHVwCiAgICBjb3ZlciA1CiAgICBjYWxsc3ViIGVtaXREZWxldGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM1NwogICAgLy8gcmV0dXJuIHsgcmVtb3ZlZDogdHJ1ZSwgcmVhc29uOiBuZXcgVWludDgocmVhc29uKSwgcmVmdW5kIH0KICAgIGl0b2IKICAgIGR1cAogICAgYml0bGVuCiAgICBpbnRjXzMgLy8gOAogICAgPD0KICAgIGFzc2VydCAvLyBvdmVyZmxvdwogICAgZXh0cmFjdCA3IDEKICAgIGJ5dGVjXzMgLy8gMHg4MAogICAgc3dhcAogICAgY29uY2F0CiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzE4CiAgICAvLyBAYWJpbWV0aG9kKHsgbmFtZTogJ2FyY1RCRF9kZWxldGVfdmFyaWF0aW9uJyB9KQogICAgYiBkZWxldGVWYXJpYXRpb25fYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMuZGVsZXRlVmFyaWF0aW9uQDI1CgpkZWxldGVWYXJpYXRpb25fZWxzZV9ib2R5QDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjMzNQogICAgLy8gfSBlbHNlIGlmIChob2xkZXJTY29wZSkgewogICAgYnogZGVsZXRlVmFyaWF0aW9uX2Vsc2VfYm9keUAxNQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czozMzYKICAgIC8vIGNvbnN0IGJvdW5kID0gdGhpcy5zdG9yZWRIb2xkZXIoc3RvcmVkKQogICAgZGlnIDEKICAgIGR1cAogICAgY2FsbHN1YiBzdG9yZWRIb2xkZXIKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjMzNwogICAgLy8gaWYgKCF0aGlzLmhvbGRzKGJvdW5kLCBhc3NldCwgZ2V0Qnl0ZShzdG9yZWQsIFZEZWNpbWFscykpKSB7CiAgICBwdXNoaW50IDQ2CiAgICBnZXRieXRlCiAgICBkaWcgNgogICAgc3dhcAogICAgY2FsbHN1YiBob2xkcwogICAgYm56IGRlbGV0ZVZhcmlhdGlvbl9lbHNlX2JvZHlAMTEKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czozMzgKICAgIC8vIHJlYXNvbiA9IFJlbW92ZWRWb2lkCiAgICBwdXNoaW50IDMKICAgIGJ1cnkgOQogICAgYiBkZWxldGVWYXJpYXRpb25fYWZ0ZXJfaWZfZWxzZUAyMgoKZGVsZXRlVmFyaWF0aW9uX2Vsc2VfYm9keUAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzM5CiAgICAvLyB9IGVsc2UgaWYgKFR4bi5zZW5kZXIgPT09IGJvdW5kKSB7CiAgICB0eG4gU2VuZGVyCiAgICA9PQogICAgYnogZGVsZXRlVmFyaWF0aW9uX2FmdGVyX2lmX2Vsc2VAMjIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzQwCiAgICAvLyByZWFzb24gPSBSZW1vdmVkQnlIb2xkZXIKICAgIHB1c2hpbnQgNAogICAgYnVyeSA5CiAgICBiIGRlbGV0ZVZhcmlhdGlvbl9hZnRlcl9pZl9lbHNlQDIyCgpkZWxldGVWYXJpYXRpb25fZWxzZV9ib2R5QDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czozNDIKICAgIC8vIH0gZWxzZSBpZiAoKGdldEJ5dGUodGhpcy5lZmZlY3RpdmVQb2xpY3koYXNzZXQsIGZhY3RzLm1hbmFnZXIpLnZhbHVlLCBQRmxhZ3MpICYgUG9saWN5TG9ja2VkKSA9PT0gMCkgewogICAgZGlnIDUKICAgIGV4dHJhY3QgMzMgMzIKICAgIGRpZyA0CiAgICBzd2FwCiAgICBjYWxsc3ViIGVmZmVjdGl2ZVBvbGljeQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyAxCiAgICBpbnRjXzIgLy8gMgogICAgZXh0cmFjdF91aW50MTYKICAgIHN1YnN0cmluZzMKICAgIGV4dHJhY3QgMiAwCiAgICBpbnRjXzEgLy8gMQogICAgZ2V0Ynl0ZQogICAgaW50YyA0IC8vIDEyOAogICAgJgogICAgYm56IGRlbGV0ZVZhcmlhdGlvbl9hZnRlcl9pZl9lbHNlQDIyCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM0MwogICAgLy8gY29uc3QgY3JlYXRvciA9IHRoaXMucmVzb2x2ZUNyZWF0b3IoYXNzZXQsIGNvbnRyb2xsaW5nQXBwLCBmYWN0cykKICAgIGRpZyAzCiAgICBkaWcgNwogICAgZGlnIDcKICAgIGNhbGxzdWIgcmVzb2x2ZUNyZWF0b3IKICAgIHBvcAogICAgZHVwCiAgICBidXJ5IDExCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM0NAogICAgLy8gaWYgKGNyZWF0b3IgIT09IEdsb2JhbC56ZXJvQWRkcmVzcyAmJiBUeG4uc2VuZGVyID09PSBjcmVhdG9yKSB7CiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgICE9CiAgICBieiBkZWxldGVWYXJpYXRpb25fYWZ0ZXJfaWZfZWxzZUAyMgogICAgdHhuIFNlbmRlcgogICAgZGlnIDEwCiAgICA9PQogICAgYnogZGVsZXRlVmFyaWF0aW9uX2FmdGVyX2lmX2Vsc2VAMjIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzQ1CiAgICAvLyByZWFzb24gPSBSZW1vdmVkQnlDcmVhdG9yCiAgICBwdXNoaW50IDUKICAgIGJ1cnkgOQogICAgYiBkZWxldGVWYXJpYXRpb25fYWZ0ZXJfaWZfZWxzZUAyMgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy5waW5NYWluQ3JlYXRvcltyb3V0aW5nXSgpIC0+IHZvaWQ6CnBpbk1haW5DcmVhdG9yOgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzYzCiAgICAvLyBAYWJpbWV0aG9kKHsgbmFtZTogJ2FyY1RCRF9waW5fbWFpbl9jcmVhdG9yJyB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciAyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgY292ZXIgMgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgNAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmJvb2wKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzcyCiAgICAvLyBjb25zdCBmYWN0cyA9IHRoaXMuYXNzZXRGYWN0cyhhc3NldCkKICAgIGNhbGxzdWIgYXNzZXRGYWN0cwogICAgZHVwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM3MwogICAgLy8gbG9nZ2VkQXNzZXJ0KGZhY3RzLmV4aXN0cywgZXJyQXNzZXRNaXNzaW5nKQogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgYm56IHBpbk1haW5DcmVhdG9yX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA3IC8vICJFUlI6ZXJyQ3ZBbSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJDdkFtCgpwaW5NYWluQ3JlYXRvcl9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mzc0CiAgICAvLyBjb25zdCBjcmVhdG9yID0gdGhpcy5yZXNvbHZlQ3JlYXRvcihhc3NldCwgY29udHJvbGxpbmdBcHAsIGZhY3RzKQogICAgZGlnIDQKICAgIHVuY292ZXIgNwogICAgdW5jb3ZlciAzCiAgICBjYWxsc3ViIHJlc29sdmVDcmVhdG9yCiAgICBjb3ZlciAyCiAgICBkdXAKICAgIGJ1cnkgOAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czozNzUKICAgIC8vIGxvZ2dlZEFzc2VydChjcmVhdG9yICE9PSBHbG9iYWwuemVyb0FkZHJlc3MgJiYgVHhuLnNlbmRlciA9PT0gY3JlYXRvciwgZXJyTm90Q3JlYXRvcikKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgIT0KICAgIGJ6IHBpbk1haW5DcmVhdG9yX2Jvb2xfZmFsc2VANgogICAgdHhuIFNlbmRlcgogICAgZGlnIDcKICAgID09CiAgICBieiBwaW5NYWluQ3JlYXRvcl9ib29sX2ZhbHNlQDYKICAgIGludGNfMSAvLyAxCgpwaW5NYWluQ3JlYXRvcl9ib29sX21lcmdlQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM3NQogICAgLy8gbG9nZ2VkQXNzZXJ0KGNyZWF0b3IgIT09IEdsb2JhbC56ZXJvQWRkcmVzcyAmJiBUeG4uc2VuZGVyID09PSBjcmVhdG9yLCBlcnJOb3RDcmVhdG9yKQogICAgYm56IHBpbk1haW5DcmVhdG9yX2FmdGVyX2Fzc2VydEA5CiAgICBieXRlYyAxMyAvLyAiRVJSOmVyckN2TmMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQ3ZOYwoKcGluTWFpbkNyZWF0b3JfYWZ0ZXJfYXNzZXJ0QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM3NwogICAgLy8gY29uc3Qgc291cmNlID0gdGhpcy5waW5Tb3VyY2UoYXNzZXQsIHdyaXRlciwgc2xvdCwgc291cmNlUmV2aXNpb24pCiAgICBkaWcgNAogICAgZGlnIDMKICAgIGRpZyA1CiAgICB1bmNvdmVyIDgKICAgIGNhbGxzdWIgcGluU291cmNlCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mzc4CiAgICAvLyBsb2dnZWRBc3NlcnQoKGdldEJ5dGUoc291cmNlLCBWRmxhZ3MpICYgRmxhZ0hvbGRlclNjb3BlKSA9PT0gMCwgZXJyU291cmNlTm90QWxsb3dlZCkKICAgIGludGNfMSAvLyAxCiAgICBnZXRieXRlCiAgICBpbnRjXzEgLy8gMQogICAgJgogICAgYnogcGluTWFpbkNyZWF0b3JfYWZ0ZXJfYXNzZXJ0QDExCiAgICBieXRlYyAxNCAvLyAiRVJSOmVyckN2U24iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQ3ZTbgoKcGluTWFpbkNyZWF0b3JfYWZ0ZXJfYXNzZXJ0QDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czozNzkKICAgIC8vIGNvbnN0IHNlY3Rpb24gPSB0aGlzLnBpbkNvcmUod3JpdGVyLCBzbG90LCBzb3VyY2UpLmNvbmNhdCh0aGlzLnNvdXJjZUZsYXQoc291cmNlKSkKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciA0CiAgICBkaWcgMgogICAgY2FsbHN1YiBwaW5Db3JlCiAgICBzd2FwCiAgICBjYWxsc3ViIHNvdXJjZUZsYXQKICAgIGNvbmNhdAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMDY0CiAgICAvLyByZXR1cm4gUHJlZml4TWFpbi5jb25jYXQoaXRvYihhc3NldCkpCiAgICBkaWcgMwogICAgaXRvYgogICAgYnl0ZWMgNSAvLyAibSIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czozODEKICAgIC8vIGNvbnN0IFttYWluLCBleGlzdHNdID0gb3AuQm94LmdldCh0aGlzLm1haW5OYW1lKGFzc2V0KSkKICAgIGJveF9nZXQKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM4MgogICAgLy8gY29uc3Qgc3RvcmVkRmxhZ3M6IHVpbnQ2NCA9IGV4aXN0cyA/IGdldEJ5dGUobWFpbiwgTUZsYWdzKSA6IDAKICAgIGJ6IHBpbk1haW5DcmVhdG9yX3Rlcm5hcnlfZmFsc2VAMTMKICAgIGR1cAogICAgaW50Y18xIC8vIDEKICAgIGdldGJ5dGUKICAgIHN3YXAKCnBpbk1haW5DcmVhdG9yX3Rlcm5hcnlfbWVyZ2VAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM4MwogICAgLy8gY29uc3QgZmxhZ3M6IHVpbnQ2NCA9IGxvY2sgPyBzdG9yZWRGbGFncyB8IE1haW5DcmVhdG9yTG9ja2VkIDogc3RvcmVkRmxhZ3MKICAgIHVuY292ZXIgMwogICAgYnogcGluTWFpbkNyZWF0b3JfdGVybmFyeV9mYWxzZUAxNgogICAgZGlnIDEKICAgIGludGMgNCAvLyAxMjgKICAgIHwKICAgIGNvdmVyIDMKCnBpbk1haW5DcmVhdG9yX3Rlcm5hcnlfbWVyZ2VAMTc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM4NAogICAgLy8gaWYgKGV4aXN0cyAmJiBmbGFncyA9PT0gc3RvcmVkRmxhZ3MgJiYgdGhpcy5zZWN0aW9uKG1haW4sIFJvbGVDcmVhdG9yKSA9PT0gc2VjdGlvbikgewogICAgdW5jb3ZlciAyCiAgICBieiBwaW5NYWluQ3JlYXRvcl9hZnRlcl9pZl9lbHNlQDIxCiAgICBkaWcgMgogICAgZGlnIDIKICAgID09CiAgICBieiBwaW5NYWluQ3JlYXRvcl9hZnRlcl9pZl9lbHNlQDIxCiAgICBkdXAKICAgIGludGNfMSAvLyAxCiAgICBjYWxsc3ViIHNlY3Rpb24KICAgIGRpZyA1CiAgICA9PQogICAgYnogcGluTWFpbkNyZWF0b3JfYWZ0ZXJfaWZfZWxzZUAyMQogICAgYnVyeSAxCiAgICBidXJ5IDEKICAgIGJ1cnkgMQogICAgYnVyeSAxCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mzg1CiAgICAvLyB0aGlzLmV4cGVjdE5vUGF5bWVudCgpCiAgICBjYWxsc3ViIGV4cGVjdE5vUGF5bWVudAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czozODYKICAgIC8vIHJldHVybiB7IHJldmlzaW9uOiBidG9pKG1haW4uc2xpY2UoTVJldmlzaW9uLCBNUmV2aXNpb24gKyA4KSksIGNoYW5nZWQ6IGZhbHNlLCBtYnI6IHRoaXMubWJyTm9uZSgpIH0KICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMKICAgIGRpZyAxCiAgICA+PQogICAgcHVzaGludCAzCiAgICBkaWcgMgogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIHB1c2hpbnQgMTEKICAgIGRpZyAyCiAgICA+PQogICAgcHVzaGludCAxMQogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgc3Vic3RyaW5nMwogICAgYnRvaQogICAgaXRvYgogICAgYnl0ZWNfMiAvLyAweDAwMDAwMDAwMDAwMDAwMDAwMDAwCiAgICBjb25jYXQKCnBpbk1haW5DcmVhdG9yX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo6Q29sbGVjdGlibGVWYXJpYXRpb25zLnBpbk1haW5DcmVhdG9yQDI0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czozNjMKICAgIC8vIEBhYmltZXRob2QoeyBuYW1lOiAnYXJjVEJEX3Bpbl9tYWluX2NyZWF0b3InIH0pCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpwaW5NYWluQ3JlYXRvcl9hZnRlcl9pZl9lbHNlQDIxOgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM4OAogICAgLy8gbG9nZ2VkQXNzZXJ0KChzdG9yZWRGbGFncyAmIE1haW5DcmVhdG9yTG9ja2VkKSA9PT0gMCwgZXJyTG9ja2VkKQogICAgaW50YyA0IC8vIDEyOAogICAgJgogICAgYnogcGluTWFpbkNyZWF0b3JfYWZ0ZXJfYXNzZXJ0QDIzCiAgICBieXRlYyAxMCAvLyAiRVJSOmVyckN2TGsiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQ3ZMawoKcGluTWFpbkNyZWF0b3JfYWZ0ZXJfYXNzZXJ0QDIzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czozOTAKICAgIC8vIHJldHVybiB0aGlzLndyaXRlU2VjdGlvbihhc3NldCwgUm9sZUNyZWF0b3IsIHNlY3Rpb24sIGZsYWdzLCBmYWN0cy5kZWNpbWFscywgVHhuLnNlbmRlcikKICAgIHN3YXAKICAgIHB1c2hpbnQgMTA1CiAgICBleHRyYWN0X3VpbnQ2NAogICAgdHhuIFNlbmRlcgogICAgdW5jb3ZlciA0CiAgICBpbnRjXzEgLy8gMQogICAgY292ZXIgNQogICAgY292ZXIgNQogICAgY2FsbHN1YiB3cml0ZVNlY3Rpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzYzCiAgICAvLyBAYWJpbWV0aG9kKHsgbmFtZTogJ2FyY1RCRF9waW5fbWFpbl9jcmVhdG9yJyB9KQogICAgYiBwaW5NYWluQ3JlYXRvcl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy5waW5NYWluQ3JlYXRvckAyNAoKcGluTWFpbkNyZWF0b3JfdGVybmFyeV9mYWxzZUAxNjoKICAgIGRpZyAxCiAgICBjb3ZlciAzCiAgICBiIHBpbk1haW5DcmVhdG9yX3Rlcm5hcnlfbWVyZ2VAMTcKCnBpbk1haW5DcmVhdG9yX3Rlcm5hcnlfZmFsc2VAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM4MgogICAgLy8gY29uc3Qgc3RvcmVkRmxhZ3M6IHVpbnQ2NCA9IGV4aXN0cyA/IGdldEJ5dGUobWFpbiwgTUZsYWdzKSA6IDAKICAgIGludGNfMCAvLyAwCiAgICBzd2FwCiAgICBiIHBpbk1haW5DcmVhdG9yX3Rlcm5hcnlfbWVyZ2VAMTQKCnBpbk1haW5DcmVhdG9yX2Jvb2xfZmFsc2VANjoKICAgIGludGNfMCAvLyAwCiAgICBiIHBpbk1haW5DcmVhdG9yX2Jvb2xfbWVyZ2VANwoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy5waW5NYWluSG9sZGVyW3JvdXRpbmddKCkgLT4gdm9pZDoKcGluTWFpbkhvbGRlcjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mzk0CiAgICAvLyBAYWJpbWV0aG9kKHsgbmFtZTogJ2FyY1RCRF9waW5fbWFpbl9ob2xkZXInIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgY292ZXIgMgogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBjb3ZlciAzCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM5NgogICAgLy8gY29uc3QgZmFjdHMgPSB0aGlzLmFzc2V0RmFjdHMoYXNzZXQpCiAgICBjYWxsc3ViIGFzc2V0RmFjdHMKICAgIGR1cAogICAgY292ZXIgNQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czozOTcKICAgIC8vIGxvZ2dlZEFzc2VydChmYWN0cy5leGlzdHMsIGVyckFzc2V0TWlzc2luZykKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIGJueiBwaW5NYWluSG9sZGVyX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA3IC8vICJFUlI6ZXJyQ3ZBbSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJDdkFtCgpwaW5NYWluSG9sZGVyX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czozOTgKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmlzVW5pdEFzc2V0KGZhY3RzKSAmJiBmYWN0cy50b3RhbCA9PT0gdGhpcy51bml0KGZhY3RzLmRlY2ltYWxzKSwgZXJyTm90U2luZ2xlVW5pdCkKICAgIGRpZyA0CiAgICBjYWxsc3ViIGlzVW5pdEFzc2V0CiAgICBidXJ5IDYKICAgIGJ6IHBpbk1haW5Ib2xkZXJfYm9vbF9mYWxzZUA2CiAgICBkaWcgNAogICAgZHVwCiAgICBwdXNoaW50IDk3CiAgICBleHRyYWN0X3VpbnQ2NAogICAgc3dhcAogICAgcHVzaGludCAxMDUKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY1MAogICAgLy8gcmV0dXJuIDEwICoqIGRlY2ltYWxzCiAgICBwdXNoaW50IDEwCiAgICBzd2FwCiAgICBleHAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mzk4CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5pc1VuaXRBc3NldChmYWN0cykgJiYgZmFjdHMudG90YWwgPT09IHRoaXMudW5pdChmYWN0cy5kZWNpbWFscyksIGVyck5vdFNpbmdsZVVuaXQpCiAgICA9PQogICAgYnogcGluTWFpbkhvbGRlcl9ib29sX2ZhbHNlQDYKICAgIGludGNfMSAvLyAxCgpwaW5NYWluSG9sZGVyX2Jvb2xfbWVyZ2VANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mzk4CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5pc1VuaXRBc3NldChmYWN0cykgJiYgZmFjdHMudG90YWwgPT09IHRoaXMudW5pdChmYWN0cy5kZWNpbWFscyksIGVyck5vdFNpbmdsZVVuaXQpCiAgICBibnogcGluTWFpbkhvbGRlcl9hZnRlcl9hc3NlcnRAOQogICAgcHVzaGJ5dGVzICJFUlI6ZXJyQ3ZTdSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJDdlN1CgpwaW5NYWluSG9sZGVyX2FmdGVyX2Fzc2VydEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czozOTkKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmhvbGRzKFR4bi5zZW5kZXIsIGFzc2V0LCBmYWN0cy5kZWNpbWFscyksIGVyck5vdEhvbGRlcikKICAgIHR4biBTZW5kZXIKICAgIGRpZyA1CiAgICBwdXNoaW50IDEwNQogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgY292ZXIgMwogICAgZGlnIDQKICAgIHN3YXAKICAgIGNhbGxzdWIgaG9sZHMKICAgIGJueiBwaW5NYWluSG9sZGVyX2FmdGVyX2Fzc2VydEAxMQogICAgYnl0ZWMgMjYgLy8gIkVSUjplcnJDdk5oIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckN2TmgKCnBpbk1haW5Ib2xkZXJfYWZ0ZXJfYXNzZXJ0QDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo0MDEKICAgIC8vIGNvbnN0IHNvdXJjZSA9IHRoaXMucGluU291cmNlKGFzc2V0LCB3cml0ZXIsIHNsb3QsIHNvdXJjZVJldmlzaW9uKQogICAgZGlnIDIKICAgIGRpZyAxCiAgICBkaWcgNQogICAgdW5jb3ZlciA3CiAgICBjYWxsc3ViIHBpblNvdXJjZQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQwMgogICAgLy8gaWYgKChnZXRCeXRlKHNvdXJjZSwgVkZsYWdzKSAmIEZsYWdIb2xkZXJTY29wZSkgIT09IDApIHsKICAgIGludGNfMSAvLyAxCiAgICBnZXRieXRlCiAgICBpbnRjXzEgLy8gMQogICAgJgogICAgYnogcGluTWFpbkhvbGRlcl9hZnRlcl9pZl9lbHNlQDE3CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQwMwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc3RvcmVkSG9sZGVyKHNvdXJjZSkgPT09IFR4bi5zZW5kZXIsIGVyclNvdXJjZU5vdEFsbG93ZWQpCiAgICBkdXAKICAgIGNhbGxzdWIgc3RvcmVkSG9sZGVyCiAgICB0eG4gU2VuZGVyCiAgICA9PQogICAgYm56IHBpbk1haW5Ib2xkZXJfYWZ0ZXJfYXNzZXJ0QDE0CiAgICBieXRlYyAxNCAvLyAiRVJSOmVyckN2U24iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQ3ZTbgoKcGluTWFpbkhvbGRlcl9hZnRlcl9hc3NlcnRAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQwNAogICAgLy8gY29uc3QgZmxhZ3MgPSBnZXRCeXRlKHRoaXMuZWZmZWN0aXZlUG9saWN5KGFzc2V0LCBmYWN0cy5tYW5hZ2VyKS52YWx1ZSwgUEZsYWdzKQogICAgZGlnIDUKICAgIGV4dHJhY3QgMzMgMzIKICAgIGRpZyA0CiAgICBzd2FwCiAgICBjYWxsc3ViIGVmZmVjdGl2ZVBvbGljeQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyAxCiAgICBpbnRjXzIgLy8gMgogICAgZXh0cmFjdF91aW50MTYKICAgIHN1YnN0cmluZzMKICAgIGV4dHJhY3QgMiAwCiAgICBpbnRjXzEgLy8gMQogICAgZ2V0Ynl0ZQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo0MDUKICAgIC8vIGxvZ2dlZEFzc2VydCgoZmxhZ3MgJiBQb2xpY3lIb2xkZXJQaW5zQ29sbGVjdGlibGVPbmx5KSA9PT0gMCwgZXJyU291cmNlTm90QWxsb3dlZCkKICAgIGludGNfMiAvLyAyCiAgICAmCiAgICBieiBwaW5NYWluSG9sZGVyX2FmdGVyX2lmX2Vsc2VAMTcKICAgIGJ5dGVjIDE0IC8vICJFUlI6ZXJyQ3ZTbiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJDdlNuCgpwaW5NYWluSG9sZGVyX2FmdGVyX2lmX2Vsc2VAMTc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQwNwogICAgLy8gY29uc3Qgc2VjdGlvbiA9IFR4bi5zZW5kZXIuYnl0ZXMuY29uY2F0KHRoaXMucGluQ29yZSh3cml0ZXIsIHNsb3QsIHNvdXJjZSkpLmNvbmNhdCh0aGlzLnNvdXJjZUZsYXQoc291cmNlKSkKICAgIHR4biBTZW5kZXIKICAgIHVuY292ZXIgMgogICAgdW5jb3ZlciA1CiAgICBkaWcgMwogICAgY2FsbHN1YiBwaW5Db3JlCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNhbGxzdWIgc291cmNlRmxhdAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNjQKICAgIC8vIHJldHVybiBQcmVmaXhNYWluLmNvbmNhdChpdG9iKGFzc2V0KSkKICAgIGRpZyAyCiAgICBpdG9iCiAgICBieXRlYyA1IC8vICJtIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQwOQogICAgLy8gY29uc3QgW21haW4sIGV4aXN0c10gPSBvcC5Cb3guZ2V0KHRoaXMubWFpbk5hbWUoYXNzZXQpKQogICAgYm94X2dldAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDEwCiAgICAvLyBpZiAoZXhpc3RzICYmIHRoaXMuc2VjdGlvbihtYWluLCBSb2xlSG9sZGVyKSA9PT0gc2VjdGlvbikgewogICAgYnogcGluTWFpbkhvbGRlcl9hZnRlcl9pZl9lbHNlQDIwCiAgICBkdXAKICAgIGludGNfMiAvLyAyCiAgICBjYWxsc3ViIHNlY3Rpb24KICAgIGRpZyAzCiAgICA9PQogICAgYnogcGluTWFpbkhvbGRlcl9hZnRlcl9pZl9lbHNlQDIwCiAgICBidXJ5IDEKICAgIGJ1cnkgMQogICAgYnVyeSAxCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDExCiAgICAvLyB0aGlzLmV4cGVjdE5vUGF5bWVudCgpCiAgICBjYWxsc3ViIGV4cGVjdE5vUGF5bWVudAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo0MTIKICAgIC8vIHJldHVybiB7IHJldmlzaW9uOiBidG9pKG1haW4uc2xpY2UoTVJldmlzaW9uLCBNUmV2aXNpb24gKyA4KSksIGNoYW5nZWQ6IGZhbHNlLCBtYnI6IHRoaXMubWJyTm9uZSgpIH0KICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMKICAgIGRpZyAxCiAgICA+PQogICAgcHVzaGludCAzCiAgICBkaWcgMgogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIHB1c2hpbnQgMTEKICAgIGRpZyAyCiAgICA+PQogICAgcHVzaGludCAxMQogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgc3Vic3RyaW5nMwogICAgYnRvaQogICAgaXRvYgogICAgYnl0ZWNfMiAvLyAweDAwMDAwMDAwMDAwMDAwMDAwMDAwCiAgICBjb25jYXQKCnBpbk1haW5Ib2xkZXJfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMucGluTWFpbkhvbGRlckAyNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mzk0CiAgICAvLyBAYWJpbWV0aG9kKHsgbmFtZTogJ2FyY1RCRF9waW5fbWFpbl9ob2xkZXInIH0pCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpwaW5NYWluSG9sZGVyX2FmdGVyX2lmX2Vsc2VAMjA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQxNAogICAgLy8gY29uc3QgZmxhZ3M6IHVpbnQ2NCA9IGV4aXN0cyA/IGdldEJ5dGUobWFpbiwgTUZsYWdzKSA6IDAKICAgIHN3YXAKICAgIGJ6IHBpbk1haW5Ib2xkZXJfdGVybmFyeV9mYWxzZUAyMgogICAgaW50Y18xIC8vIDEKICAgIGdldGJ5dGUKCnBpbk1haW5Ib2xkZXJfdGVybmFyeV9tZXJnZUAyMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDE1CiAgICAvLyByZXR1cm4gdGhpcy53cml0ZVNlY3Rpb24oYXNzZXQsIFJvbGVIb2xkZXIsIHNlY3Rpb24sIGZsYWdzLCBmYWN0cy5kZWNpbWFscywgVHhuLnNlbmRlcikKICAgIHR4biBTZW5kZXIKICAgIHVuY292ZXIgNAogICAgaW50Y18yIC8vIDIKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciA0CiAgICB1bmNvdmVyIDUKICAgIHVuY292ZXIgNQogICAgY2FsbHN1YiB3cml0ZVNlY3Rpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mzk0CiAgICAvLyBAYWJpbWV0aG9kKHsgbmFtZTogJ2FyY1RCRF9waW5fbWFpbl9ob2xkZXInIH0pCiAgICBiIHBpbk1haW5Ib2xkZXJfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMucGluTWFpbkhvbGRlckAyNAoKcGluTWFpbkhvbGRlcl90ZXJuYXJ5X2ZhbHNlQDIyOgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQxNAogICAgLy8gY29uc3QgZmxhZ3M6IHVpbnQ2NCA9IGV4aXN0cyA/IGdldEJ5dGUobWFpbiwgTUZsYWdzKSA6IDAKICAgIGludGNfMCAvLyAwCiAgICBiIHBpbk1haW5Ib2xkZXJfdGVybmFyeV9tZXJnZUAyMwoKcGluTWFpbkhvbGRlcl9ib29sX2ZhbHNlQDY6CiAgICBpbnRjXzAgLy8gMAogICAgYiBwaW5NYWluSG9sZGVyX2Jvb2xfbWVyZ2VANwoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy51bnBpbk1haW5DcmVhdG9yW3JvdXRpbmddKCkgLT4gdm9pZDoKdW5waW5NYWluQ3JlYXRvcjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDE5CiAgICAvLyBAYWJpbWV0aG9kKHsgbmFtZTogJ2FyY1RCRF91bnBpbl9tYWluX2NyZWF0b3InIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDIxCiAgICAvLyBjb25zdCBmYWN0cyA9IHRoaXMuYXNzZXRGYWN0cyhhc3NldCkKICAgIGNhbGxzdWIgYXNzZXRGYWN0cwogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQyMgogICAgLy8gbG9nZ2VkQXNzZXJ0KGZhY3RzLmV4aXN0cywgZXJyQXNzZXRNaXNzaW5nKQogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgYm56IHVucGluTWFpbkNyZWF0b3JfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDcgLy8gIkVSUjplcnJDdkFtIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckN2QW0KCnVucGluTWFpbkNyZWF0b3JfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQyMwogICAgLy8gY29uc3QgcmVhc29uID0gdGhpcy5jcmVhdG9yU2lkZVJlbW92ZXIoYXNzZXQsIGNvbnRyb2xsaW5nQXBwLCBmYWN0cykKICAgIGRpZyAxCiAgICBkdXAKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciAzCiAgICBjYWxsc3ViIGNyZWF0b3JTaWRlUmVtb3ZlcgogICAgcG9wCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNjQKICAgIC8vIHJldHVybiBQcmVmaXhNYWluLmNvbmNhdChpdG9iKGFzc2V0KSkKICAgIGl0b2IKICAgIGJ5dGVjIDUgLy8gIm0iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDI0CiAgICAvLyBjb25zdCBbbWFpbiwgZXhpc3RzXSA9IG9wLkJveC5nZXQodGhpcy5tYWluTmFtZShhc3NldCkpCiAgICBib3hfZ2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQyNQogICAgLy8gaWYgKCFleGlzdHMgfHwgZXh0cmFjdFVpbnQxNihtYWluLCBNQ3JlYXRvckxlbikgPT09IDApIHsKICAgIGJ6IHVucGluTWFpbkNyZWF0b3JfaWZfYm9keUA1CiAgICBkdXAKICAgIHB1c2hpbnQgMTEKICAgIGV4dHJhY3RfdWludDE2CiAgICBibnogdW5waW5NYWluQ3JlYXRvcl9hZnRlcl9pZl9lbHNlQDYKCnVucGluTWFpbkNyZWF0b3JfaWZfYm9keUA1OgogICAgcG9wbiAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQyNgogICAgLy8gdGhpcy5leHBlY3ROb1BheW1lbnQoKQogICAgY2FsbHN1YiBleHBlY3ROb1BheW1lbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDI3CiAgICAvLyByZXR1cm4geyByZW1vdmVkOiBmYWxzZSwgcmVhc29uOiBuZXcgVWludDgoUmVtb3ZlZE5vbmUpLCByZWZ1bmQ6IDAgfQogICAgYnl0ZWNfMiAvLyAweDAwMDAwMDAwMDAwMDAwMDAwMDAwCgp1bnBpbk1haW5DcmVhdG9yX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo6Q29sbGVjdGlibGVWYXJpYXRpb25zLnVucGluTWFpbkNyZWF0b3JAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDE5CiAgICAvLyBAYWJpbWV0aG9kKHsgbmFtZTogJ2FyY1RCRF91bnBpbl9tYWluX2NyZWF0b3InIH0pCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgp1bnBpbk1haW5DcmVhdG9yX2FmdGVyX2lmX2Vsc2VANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDI5CiAgICAvLyBsb2dnZWRBc3NlcnQoKGdldEJ5dGUobWFpbiwgTUZsYWdzKSAmIE1haW5DcmVhdG9yTG9ja2VkKSA9PT0gMCwgZXJyTG9ja2VkKQogICAgZHVwCiAgICBpbnRjXzEgLy8gMQogICAgZ2V0Ynl0ZQogICAgaW50YyA0IC8vIDEyOAogICAgJgogICAgYnogdW5waW5NYWluQ3JlYXRvcl9hZnRlcl9hc3NlcnRAOAogICAgYnl0ZWMgMTAgLy8gIkVSUjplcnJDdkxrIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckN2TGsKCnVucGluTWFpbkNyZWF0b3JfYWZ0ZXJfYXNzZXJ0QDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQzMAogICAgLy8gY29uc3QgcmVmdW5kID0gdGhpcy5jbGVhclNlY3Rpb24oYXNzZXQsIG1haW4sIFJvbGVDcmVhdG9yLCBUeG4uc2VuZGVyKQogICAgdHhuIFNlbmRlcgogICAgY292ZXIgMgogICAgaW50Y18xIC8vIDEKICAgIHVuY292ZXIgMwogICAgY2FsbHN1YiBjbGVhclNlY3Rpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDMxCiAgICAvLyByZXR1cm4geyByZW1vdmVkOiB0cnVlLCByZWFzb246IG5ldyBVaW50OChyZWFzb24pLCByZWZ1bmQgfQogICAgc3dhcAogICAgaXRvYgogICAgZHVwCiAgICBiaXRsZW4KICAgIGludGNfMyAvLyA4CiAgICA8PQogICAgYXNzZXJ0IC8vIG92ZXJmbG93CiAgICBleHRyYWN0IDcgMQogICAgYnl0ZWNfMyAvLyAweDgwCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo0MTkKICAgIC8vIEBhYmltZXRob2QoeyBuYW1lOiAnYXJjVEJEX3VucGluX21haW5fY3JlYXRvcicgfSkKICAgIGIgdW5waW5NYWluQ3JlYXRvcl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy51bnBpbk1haW5DcmVhdG9yQDkKCgovLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMudW5waW5NYWluSG9sZGVyW3JvdXRpbmddKCkgLT4gdm9pZDoKdW5waW5NYWluSG9sZGVyOgogICAgYnl0ZWNfMCAvLyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo0MzUKICAgIC8vIEBhYmltZXRob2QoeyBuYW1lOiAnYXJjVEJEX3VucGluX21haW5faG9sZGVyJyB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQzNwogICAgLy8gY29uc3QgZmFjdHMgPSB0aGlzLmFzc2V0RmFjdHMoYXNzZXQpCiAgICBjYWxsc3ViIGFzc2V0RmFjdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDM4CiAgICAvLyBsb2dnZWRBc3NlcnQoZmFjdHMuZXhpc3RzLCBlcnJBc3NldE1pc3NpbmcpCiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Yml0CiAgICBibnogdW5waW5NYWluSG9sZGVyX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA3IC8vICJFUlI6ZXJyQ3ZBbSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJDdkFtCgp1bnBpbk1haW5Ib2xkZXJfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNjQKICAgIC8vIHJldHVybiBQcmVmaXhNYWluLmNvbmNhdChpdG9iKGFzc2V0KSkKICAgIGR1cAogICAgaXRvYgogICAgYnl0ZWMgNSAvLyAibSIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo0MzkKICAgIC8vIGNvbnN0IFttYWluLCBleGlzdHNdID0gb3AuQm94LmdldCh0aGlzLm1haW5OYW1lKGFzc2V0KSkKICAgIGJveF9nZXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDQwCiAgICAvLyBpZiAoIWV4aXN0cyB8fCBleHRyYWN0VWludDE2KG1haW4sIE1Ib2xkZXJMZW4pID09PSAwKSB7CiAgICBieiB1bnBpbk1haW5Ib2xkZXJfaWZfYm9keUA1CiAgICBkdXAKICAgIHB1c2hpbnQgMTMKICAgIGV4dHJhY3RfdWludDE2CiAgICBibnogdW5waW5NYWluSG9sZGVyX2FmdGVyX2lmX2Vsc2VANgoKdW5waW5NYWluSG9sZGVyX2lmX2JvZHlANToKICAgIHBvcG4gMgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo0NDEKICAgIC8vIHRoaXMuZXhwZWN0Tm9QYXltZW50KCkKICAgIGNhbGxzdWIgZXhwZWN0Tm9QYXltZW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ0MgogICAgLy8gcmV0dXJuIHsgcmVtb3ZlZDogZmFsc2UsIHJlYXNvbjogbmV3IFVpbnQ4KFJlbW92ZWROb25lKSwgcmVmdW5kOiAwIH0KICAgIGJ5dGVjXzIgLy8gMHgwMDAwMDAwMDAwMDAwMDAwMDAwMAoKdW5waW5NYWluSG9sZGVyX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo6Q29sbGVjdGlibGVWYXJpYXRpb25zLnVucGluTWFpbkhvbGRlckAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDM1CiAgICAvLyBAYWJpbWV0aG9kKHsgbmFtZTogJ2FyY1RCRF91bnBpbl9tYWluX2hvbGRlcicgfSkKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCnVucGluTWFpbkhvbGRlcl9hZnRlcl9pZl9lbHNlQDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ0NAogICAgLy8gY29uc3QgcGlubmVkID0gQWNjb3VudCh0aGlzLnNlY3Rpb24obWFpbiwgUm9sZUhvbGRlcikuc2xpY2UoMCwgMzIpKQogICAgZHVwbiAyCiAgICBpbnRjXzIgLy8gMgogICAgY2FsbHN1YiBzZWN0aW9uCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18wIC8vIDAKICAgIGRpZyAxCiAgICA+PQogICAgaW50Y18wIC8vIDAKICAgIGRpZyAyCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgcHVzaGludCAzMgogICAgZGlnIDIKICAgID49CiAgICBwdXNoaW50IDMyCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBzdWJzdHJpbmczCiAgICBkdXAKICAgIGNvdmVyIDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDQ1CiAgICAvLyBsZXQgcmVhc29uOiB1aW50NjQgPSBSZW1vdmVkQnlIb2xkZXIKICAgIHB1c2hpbnQgNAogICAgYnVyeSA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ0NgogICAgLy8gaWYgKCF0aGlzLmhvbGRzKHBpbm5lZCwgYXNzZXQsIGdldEJ5dGUobWFpbiwgTURlY2ltYWxzKSkpIHsKICAgIHN3YXAKICAgIGludGNfMiAvLyAyCiAgICBnZXRieXRlCiAgICBkaWcgMwogICAgc3dhcAogICAgY2FsbHN1YiBob2xkcwogICAgYm56IHVucGluTWFpbkhvbGRlcl9lbHNlX2JvZHlAOAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo0NDcKICAgIC8vIHJlYXNvbiA9IFJlbW92ZWRWb2lkCiAgICBwdXNoaW50IDMKICAgIGJ1cnkgNAoKdW5waW5NYWluSG9sZGVyX2FmdGVyX2lmX2Vsc2VAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ1MQogICAgLy8gY29uc3QgcmVmdW5kID0gdGhpcy5jbGVhclNlY3Rpb24oYXNzZXQsIG1haW4sIFJvbGVIb2xkZXIsIHBpbm5lZCkKICAgIGludGNfMiAvLyAyCiAgICB1bmNvdmVyIDMKICAgIGNhbGxzdWIgY2xlYXJTZWN0aW9uCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ1MgogICAgLy8gcmV0dXJuIHsgcmVtb3ZlZDogdHJ1ZSwgcmVhc29uOiBuZXcgVWludDgocmVhc29uKSwgcmVmdW5kIH0KICAgIGRpZyAxCiAgICBpdG9iCiAgICBkdXAKICAgIGJpdGxlbgogICAgaW50Y18zIC8vIDgKICAgIDw9CiAgICBhc3NlcnQgLy8gb3ZlcmZsb3cKICAgIGV4dHJhY3QgNyAxCiAgICBieXRlY18zIC8vIDB4ODAKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQzNQogICAgLy8gQGFiaW1ldGhvZCh7IG5hbWU6ICdhcmNUQkRfdW5waW5fbWFpbl9ob2xkZXInIH0pCiAgICBiIHVucGluTWFpbkhvbGRlcl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy51bnBpbk1haW5Ib2xkZXJAMTIKCnVucGluTWFpbkhvbGRlcl9lbHNlX2JvZHlAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDQ5CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gcGlubmVkLCBlcnJOb3RBdXRob3JpemVkKQogICAgdHhuIFNlbmRlcgogICAgZGlnIDMKICAgID09CiAgICBibnogdW5waW5NYWluSG9sZGVyX2FmdGVyX2lmX2Vsc2VAMTEKICAgIGJ5dGVjIDEyIC8vICJFUlI6ZXJyQ3ZOYSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJDdk5hCgoKLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo6Q29sbGVjdGlibGVWYXJpYXRpb25zLnNldEFzc2V0UG9saWN5W3JvdXRpbmddKCkgLT4gdm9pZDoKc2V0QXNzZXRQb2xpY3k6CiAgICBpbnRjXzAgLy8gMAogICAgYnl0ZWNfMCAvLyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo0NTgKICAgIC8vIEBhYmltZXRob2QoeyBuYW1lOiAnYXJjVEJEX3NldF9hc3NldF9wb2xpY3knIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBjb3ZlciAyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgY292ZXIgMgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmJvb2wKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIHN3YXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDYKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5ib29sCiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Yml0CiAgICBzd2FwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA3CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18xIC8vIDEKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuYm9vbAogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo0NjgKICAgIC8vIGNvbnN0IGZhY3RzID0gdGhpcy5hc3NldEZhY3RzKGFzc2V0KQogICAgY2FsbHN1YiBhc3NldEZhY3RzCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDY5CiAgICAvLyBsb2dnZWRBc3NlcnQoZmFjdHMuZXhpc3RzLCBlcnJBc3NldE1pc3NpbmcpCiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Yml0CiAgICBibnogc2V0QXNzZXRQb2xpY3lfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDcgLy8gIkVSUjplcnJDdkFtIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckN2QW0KCnNldEFzc2V0UG9saWN5X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo0NzAKICAgIC8vIGNvbnN0IGNyZWF0b3IgPSB0aGlzLnJlc29sdmVDcmVhdG9yKGFzc2V0LCBjb250cm9sbGluZ0FwcCwgZmFjdHMpCiAgICBkaWcgNwogICAgdW5jb3ZlciA1CiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgcmVzb2x2ZUNyZWF0b3IKICAgIHBvcAogICAgZHVwCiAgICBidXJ5IDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDcxCiAgICAvLyBsb2dnZWRBc3NlcnQoY3JlYXRvciAhPT0gR2xvYmFsLnplcm9BZGRyZXNzICYmIFR4bi5zZW5kZXIgPT09IGNyZWF0b3IsIGVyck5vdENyZWF0b3IpCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgICE9CiAgICBieiBzZXRBc3NldFBvbGljeV9ib29sX2ZhbHNlQDYKICAgIHR4biBTZW5kZXIKICAgIGRpZyA4CiAgICA9PQogICAgYnogc2V0QXNzZXRQb2xpY3lfYm9vbF9mYWxzZUA2CiAgICBpbnRjXzEgLy8gMQoKc2V0QXNzZXRQb2xpY3lfYm9vbF9tZXJnZUA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo0NzEKICAgIC8vIGxvZ2dlZEFzc2VydChjcmVhdG9yICE9PSBHbG9iYWwuemVyb0FkZHJlc3MgJiYgVHhuLnNlbmRlciA9PT0gY3JlYXRvciwgZXJyTm90Q3JlYXRvcikKICAgIGJueiBzZXRBc3NldFBvbGljeV9hZnRlcl9hc3NlcnRAOQogICAgYnl0ZWMgMTMgLy8gIkVSUjplcnJDdk5jIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckN2TmMKCnNldEFzc2V0UG9saWN5X2FmdGVyX2Fzc2VydEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo0NzIKICAgIC8vIGxldCBmbGFncyA9IHRoaXMucG9saWN5RmxhZ3MobWFuYWdlcldyaXRlcywgaG9sZGVyUGluc0NvbGxlY3RpYmxlT25seSkKICAgIGNvdmVyIDIKICAgIGNhbGxzdWIgcG9saWN5RmxhZ3MKICAgIGJ1cnkgNQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo0NzMKICAgIC8vIGlmIChsb2NrKSBmbGFncyA9IGZsYWdzIHwgUG9saWN5TG9ja2VkCiAgICBieiBzZXRBc3NldFBvbGljeV9hZnRlcl9pZl9lbHNlQDExCiAgICBkaWcgMwogICAgaW50YyA0IC8vIDEyOAogICAgfAogICAgYnVyeSA0CgpzZXRBc3NldFBvbGljeV9hZnRlcl9pZl9lbHNlQDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo0NzQKICAgIC8vIGNvbnN0IHJlc3VsdCA9IHRoaXMuc2V0UG9saWN5KFByZWZpeEFzc2V0UG9saWN5LmNvbmNhdChpdG9iKGFzc2V0KSksIGNvbGxlY3RpYmxlLCBob2xkZXIsIGZsYWdzKQogICAgZGlnIDIKICAgIGl0b2IKICAgIGJ5dGVjIDE1IC8vICJwIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkaWcgMgogICAgZGlnIDIKICAgIGRpZyA2CiAgICBjYWxsc3ViIHNldFBvbGljeQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ3NQogICAgLy8gaWYgKHJlc3VsdC5jaGFuZ2VkKSB0aGlzLmVtaXRQb2xpY3koYXNzZXQsIEdsb2JhbC56ZXJvQWRkcmVzcywgcmVzdWx0LnJldmlzaW9uLCBmbGFncywgZmFsc2UpCiAgICBwdXNoaW50IDY0CiAgICBnZXRiaXQKICAgIGJ6IHNldEFzc2V0UG9saWN5X2FmdGVyX2lmX2Vsc2VAMTMKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZGlnIDUKICAgIGNvdmVyIDIKICAgIGRpZyA3CiAgICBpbnRjXzAgLy8gMAogICAgY2FsbHN1YiBlbWl0UG9saWN5CgpzZXRBc3NldFBvbGljeV9hZnRlcl9pZl9lbHNlQDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo0NTgKICAgIC8vIEBhYmltZXRob2QoeyBuYW1lOiAnYXJjVEJEX3NldF9hc3NldF9wb2xpY3knIH0pCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpzZXRBc3NldFBvbGljeV9ib29sX2ZhbHNlQDY6CiAgICBpbnRjXzAgLy8gMAogICAgYiBzZXRBc3NldFBvbGljeV9ib29sX21lcmdlQDcKCgovLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMuc2V0TWFuYWdlclBvbGljeVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnNldE1hbmFnZXJQb2xpY3k6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ4MAogICAgLy8gQGFiaW1ldGhvZCh7IG5hbWU6ICdhcmNUQkRfc2V0X21hbmFnZXJfcG9saWN5JyB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18xIC8vIDEKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuYm9vbAogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmJvb2wKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDg3CiAgICAvLyBjb25zdCBmbGFncyA9IHRoaXMucG9saWN5RmxhZ3MobWFuYWdlcldyaXRlcywgaG9sZGVyUGluc0NvbGxlY3RpYmxlT25seSkKICAgIGNhbGxzdWIgcG9saWN5RmxhZ3MKICAgIGR1cAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo0ODgKICAgIC8vIGNvbnN0IHJlc3VsdCA9IHRoaXMuc2V0UG9saWN5KFByZWZpeE1hbmFnZXJQb2xpY3kuY29uY2F0KFR4bi5zZW5kZXIuYnl0ZXMpLCBjb2xsZWN0aWJsZSwgaG9sZGVyLCBmbGFncykKICAgIGJ5dGVjIDIyIC8vICJQIgogICAgdHhuIFNlbmRlcgogICAgY29uY2F0CiAgICBjb3ZlciAzCiAgICBjYWxsc3ViIHNldFBvbGljeQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ4OQogICAgLy8gaWYgKHJlc3VsdC5jaGFuZ2VkKSB0aGlzLmVtaXRQb2xpY3koMCwgVHhuLnNlbmRlciwgcmVzdWx0LnJldmlzaW9uLCBmbGFncywgZmFsc2UpCiAgICBwdXNoaW50IDY0CiAgICBnZXRiaXQKICAgIGJ6IHNldE1hbmFnZXJQb2xpY3lfYWZ0ZXJfaWZfZWxzZUAzCiAgICB0eG4gU2VuZGVyCiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBpbnRjXzAgLy8gMAogICAgY292ZXIgMgogICAgZGlnIDQKICAgIGludGNfMCAvLyAwCiAgICBjYWxsc3ViIGVtaXRQb2xpY3kKCnNldE1hbmFnZXJQb2xpY3lfYWZ0ZXJfaWZfZWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo0ODAKICAgIC8vIEBhYmltZXRob2QoeyBuYW1lOiAnYXJjVEJEX3NldF9tYW5hZ2VyX3BvbGljeScgfSkKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMuZGVsZXRlQXNzZXRQb2xpY3lbcm91dGluZ10oKSAtPiB2b2lkOgpkZWxldGVBc3NldFBvbGljeToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDk0CiAgICAvLyBAYWJpbWV0aG9kKHsgbmFtZTogJ2FyY1RCRF9kZWxldGVfYXNzZXRfcG9saWN5JyB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ5NgogICAgLy8gY29uc3QgZmFjdHMgPSB0aGlzLmFzc2V0RmFjdHMoYXNzZXQpCiAgICBjYWxsc3ViIGFzc2V0RmFjdHMKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo0OTcKICAgIC8vIGxvZ2dlZEFzc2VydChmYWN0cy5leGlzdHMsIGVyckFzc2V0TWlzc2luZykKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIGJueiBkZWxldGVBc3NldFBvbGljeV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNyAvLyAiRVJSOmVyckN2QW0iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQ3ZBbQoKZGVsZXRlQXNzZXRQb2xpY3lfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ5OAogICAgLy8gY29uc3QgcmVhc29uID0gdGhpcy5jcmVhdG9yU2lkZVJlbW92ZXIoYXNzZXQsIGNvbnRyb2xsaW5nQXBwLCBmYWN0cykKICAgIGRpZyAyCiAgICBkdXAKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAzCiAgICBjYWxsc3ViIGNyZWF0b3JTaWRlUmVtb3ZlcgogICAgcG9wCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ5OQogICAgLy8gY29uc3QgcmVzdWx0ID0gdGhpcy5kZWxldGVQb2xpY3koUHJlZml4QXNzZXRQb2xpY3kuY29uY2F0KGl0b2IoYXNzZXQpKSwgVHhuLnNlbmRlciwgcmVhc29uLCB0cnVlKQogICAgaXRvYgogICAgYnl0ZWMgMTUgLy8gInAiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHR4biBTZW5kZXIKICAgIHVuY292ZXIgMgogICAgaW50Y18xIC8vIDEKICAgIGNhbGxzdWIgZGVsZXRlUG9saWN5CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTAwCiAgICAvLyBpZiAocmVzdWx0LnJlbW92ZWQpIHRoaXMuZW1pdFBvbGljeShhc3NldCwgR2xvYmFsLnplcm9BZGRyZXNzLCAwLCAwLCB0cnVlKQogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgYnogZGVsZXRlQXNzZXRQb2xpY3lfYWZ0ZXJfaWZfZWxzZUA1CiAgICBkaWcgMQogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICBpbnRjXzAgLy8gMAogICAgZHVwCiAgICBpbnRjXzEgLy8gMQogICAgY2FsbHN1YiBlbWl0UG9saWN5CgpkZWxldGVBc3NldFBvbGljeV9hZnRlcl9pZl9lbHNlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ5NAogICAgLy8gQGFiaW1ldGhvZCh7IG5hbWU6ICdhcmNUQkRfZGVsZXRlX2Fzc2V0X3BvbGljeScgfSkKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMuZGVsZXRlTWFuYWdlclBvbGljeVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmRlbGV0ZU1hbmFnZXJQb2xpY3k6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjUwNwogICAgLy8gY29uc3QgcmVzdWx0ID0gdGhpcy5kZWxldGVQb2xpY3koUHJlZml4TWFuYWdlclBvbGljeS5jb25jYXQoVHhuLnNlbmRlci5ieXRlcyksIFR4bi5zZW5kZXIsIFJlbW92ZWRCeUNyZWF0b3IsIHRydWUpCiAgICBieXRlYyAyMiAvLyAiUCIKICAgIHR4biBTZW5kZXIKICAgIGNvbmNhdAogICAgdHhuIFNlbmRlcgogICAgcHVzaGludCA1CiAgICBpbnRjXzEgLy8gMQogICAgY2FsbHN1YiBkZWxldGVQb2xpY3kKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1MDgKICAgIC8vIGlmIChyZXN1bHQucmVtb3ZlZCkgdGhpcy5lbWl0UG9saWN5KDAsIFR4bi5zZW5kZXIsIDAsIDAsIHRydWUpCiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Yml0CiAgICBieiBkZWxldGVNYW5hZ2VyUG9saWN5X2FmdGVyX2lmX2Vsc2VAMwogICAgaW50Y18wIC8vIDAKICAgIHR4biBTZW5kZXIKICAgIGludGNfMCAvLyAwCiAgICBkdXAKICAgIGludGNfMSAvLyAxCiAgICBjYWxsc3ViIGVtaXRQb2xpY3kKCmRlbGV0ZU1hbmFnZXJQb2xpY3lfYWZ0ZXJfaWZfZWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1MDUKICAgIC8vIEBhYmltZXRob2QoeyBuYW1lOiAnYXJjVEJEX2RlbGV0ZV9tYW5hZ2VyX3BvbGljeScgfSkKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMuc2V0R3JhbnRbcm91dGluZ10oKSAtPiB2b2lkOgpzZXRHcmFudDoKICAgIGJ5dGVjXzAgLy8gIiIKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1MTUKICAgIC8vIEBhYmltZXRob2QoeyBuYW1lOiAnYXJjVEJEX3NldF9ncmFudCcgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjUxNwogICAgLy8gY29uc3QgbmFtZSA9IFByZWZpeEdyYW50LmNvbmNhdChUeG4uc2VuZGVyLmJ5dGVzKQogICAgYnl0ZWMgOSAvLyAiZyIKICAgIHR4biBTZW5kZXIKICAgIGNvbmNhdAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTE4CiAgICAvLyBjb25zdCBzZXQgPSB0aGlzLmNoZWNrV3JpdGVyU2V0KHdyaXRlcnMpCiAgICBjYWxsc3ViIGNoZWNrV3JpdGVyU2V0CiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjUxOQogICAgLy8gY29uc3QgW3N0b3JlZCwgZXhpc3RzXSA9IG9wLkJveC5nZXQobmFtZSkKICAgIGJveF9nZXQKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjUyMAogICAgLy8gaWYgKGV4aXN0cyAmJiBzdG9yZWQuc2xpY2UoR1NldCkgPT09IHNldCkgewogICAgYnogc2V0R3JhbnRfYWZ0ZXJfaWZfZWxzZUA0CiAgICBkdXBuIDIKICAgIGxlbgogICAgZHVwCiAgICBidXJ5IDcKICAgIHB1c2hpbnQgOQogICAgZGlnIDEKICAgID49CiAgICBwdXNoaW50IDkKICAgIGRpZyAyCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgZHVwCiAgICBidXJ5IDkKICAgIHN3YXAKICAgIHN1YnN0cmluZzMKICAgIGRpZyA0CiAgICA9PQogICAgYnogc2V0R3JhbnRfYWZ0ZXJfaWZfZWxzZUA0CiAgICBidXJ5IDEKICAgIGJ1cnkgMQogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjUyMQogICAgLy8gdGhpcy5leHBlY3ROb1BheW1lbnQoKQogICAgY2FsbHN1YiBleHBlY3ROb1BheW1lbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTIyCiAgICAvLyByZXR1cm4geyByZXZpc2lvbjogYnRvaShzdG9yZWQuc2xpY2UoR1JldmlzaW9uLCBHUmV2aXNpb24gKyA4KSksIGNoYW5nZWQ6IGZhbHNlLCBtYnI6IHRoaXMubWJyTm9uZSgpIH0KICAgIGludGNfMSAvLyAxCiAgICBkaWcgMgogICAgZHVwCiAgICBjb3ZlciAyCiAgICA+PQogICAgaW50Y18xIC8vIDEKICAgIGNvdmVyIDIKICAgIHNlbGVjdAogICAgZGlnIDMKICAgIHN1YnN0cmluZzMKICAgIGJ0b2kKICAgIGl0b2IKICAgIGJ5dGVjXzIgLy8gMHgwMDAwMDAwMDAwMDAwMDAwMDAwMAogICAgY29uY2F0CgpzZXRHcmFudF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy5zZXRHcmFudEA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1MTUKICAgIC8vIEBhYmltZXRob2QoeyBuYW1lOiAnYXJjVEJEX3NldF9ncmFudCcgfSkKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCnNldEdyYW50X2FmdGVyX2lmX2Vsc2VANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTEwOAogICAgLy8gcmV0dXJuIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLm1pbkJhbGFuY2UKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdE1pbkJhbGFuY2UKICAgIHN3YXAKICAgIGNvdmVyIDIKICAgIGFzc2VydCAvLyBhY2NvdW50IGZ1bmRlZAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1MjUKICAgIC8vIGNvbnN0IGZsb3cgPSB0aGlzLnN5bmNNZXRhUm9vdChNZXRhVGFnR3JhbnQsIG5hbWUsIGV4aXN0cyA/IHN0b3JlZC5zbGljZShHU2V0KSA6IEJ5dGVzLmZyb21IZXgoJzAwJyksIHNldCkKICAgIHVuY292ZXIgMgogICAgYnogc2V0R3JhbnRfdGVybmFyeV9mYWxzZUA2CiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA5CiAgICBkaWcgMQogICAgPj0KICAgIHB1c2hpbnQgOQogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBzd2FwCiAgICBzdWJzdHJpbmczCgpzZXRHcmFudF90ZXJuYXJ5X21lcmdlQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjUyNQogICAgLy8gY29uc3QgZmxvdyA9IHRoaXMuc3luY01ldGFSb290KE1ldGFUYWdHcmFudCwgbmFtZSwgZXhpc3RzID8gc3RvcmVkLnNsaWNlKEdTZXQpIDogQnl0ZXMuZnJvbUhleCgnMDAnKSwgc2V0KQogICAgYnl0ZWMgOSAvLyAiZyIKICAgIHVuY292ZXIgMwogICAgZHVwCiAgICBjb3ZlciAyCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgNQogICAgZHVwCiAgICBjb3ZlciA0CiAgICBjYWxsc3ViIHN5bmNNZXRhUm9vdAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1MjYKICAgIC8vIGNvbnN0IHJldmlzaW9uID0gdGhpcy5uZXh0UmV2aXNpb24oKQogICAgY2FsbHN1YiBuZXh0UmV2aXNpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTI3CiAgICAvLyB0aGlzLnB1dEJveChuYW1lLCBCeXRlcy5mcm9tSGV4KCcwMScpLmNvbmNhdChpdG9iKHJldmlzaW9uKSkuY29uY2F0KHNldCkpCiAgICBpdG9iCiAgICBieXRlYyA4IC8vIDB4MDEKICAgIGRpZyAxCiAgICBjb25jYXQKICAgIHVuY292ZXIgMwogICAgY29uY2F0CiAgICB1bmNvdmVyIDMKICAgIHN3YXAKICAgIGNhbGxzdWIgcHV0Qm94CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjUyOAogICAgLy8gY29uc3QgbWJyID0gdGhpcy5zZXR0bGUoYmVmb3JlLCBmbG93LCBUeG4uc2VuZGVyKQogICAgdHhuIFNlbmRlcgogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMgogICAgY2FsbHN1YiBzZXR0bGUKICAgIHBvcAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1MjkKICAgIC8vIGVtaXQ8R3JhbnRDaGFuZ2VkPih7IGhvbGRlcjogVHhuLnNlbmRlciwgcmV2aXNpb24sIGRlbGV0ZWQ6IGZhbHNlLCByb3VuZDogR2xvYmFsLnJvdW5kLCB0aW1lc3RhbXA6IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgfSkKICAgIGdsb2JhbCBSb3VuZAogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgdHhuIFNlbmRlcgogICAgZGlnIDMKICAgIGNvbmNhdAogICAgYnl0ZWMgNCAvLyAweDAwCiAgICBjb25jYXQKICAgIHVuY292ZXIgMgogICAgaXRvYgogICAgY29uY2F0CiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIGJ5dGVjIDI3IC8vIG1ldGhvZCAiR3JhbnRDaGFuZ2VkKGFkZHJlc3MsdWludDY0LGJvb2wsdWludDY0LHVpbnQ2NCkiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1MzAKICAgIC8vIHJldHVybiB7IHJldmlzaW9uLCBjaGFuZ2VkOiB0cnVlLCBtYnIgfQogICAgYnl0ZWNfMyAvLyAweDgwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1MTUKICAgIC8vIEBhYmltZXRob2QoeyBuYW1lOiAnYXJjVEJEX3NldF9ncmFudCcgfSkKICAgIGIgc2V0R3JhbnRfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMuc2V0R3JhbnRAOAoKc2V0R3JhbnRfdGVybmFyeV9mYWxzZUA2OgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjUyNQogICAgLy8gY29uc3QgZmxvdyA9IHRoaXMuc3luY01ldGFSb290KE1ldGFUYWdHcmFudCwgbmFtZSwgZXhpc3RzID8gc3RvcmVkLnNsaWNlKEdTZXQpIDogQnl0ZXMuZnJvbUhleCgnMDAnKSwgc2V0KQogICAgYnl0ZWMgNCAvLyAweDAwCiAgICBiIHNldEdyYW50X3Rlcm5hcnlfbWVyZ2VANwoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy5kZWxldGVHcmFudFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmRlbGV0ZUdyYW50OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1MzYKICAgIC8vIGNvbnN0IG5hbWUgPSBQcmVmaXhHcmFudC5jb25jYXQoVHhuLnNlbmRlci5ieXRlcykKICAgIGJ5dGVjIDkgLy8gImciCiAgICB0eG4gU2VuZGVyCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1MzcKICAgIC8vIGNvbnN0IFtzdG9yZWQsIGV4aXN0c10gPSBvcC5Cb3guZ2V0KG5hbWUpCiAgICBib3hfZ2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjUzOAogICAgLy8gaWYgKCFleGlzdHMpIHsKICAgIGJueiBkZWxldGVHcmFudF9hZnRlcl9pZl9lbHNlQDMKICAgIHBvcG4gMgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1MzkKICAgIC8vIHRoaXMuZXhwZWN0Tm9QYXltZW50KCkKICAgIGNhbGxzdWIgZXhwZWN0Tm9QYXltZW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU0MAogICAgLy8gcmV0dXJuIHsgcmVtb3ZlZDogZmFsc2UsIHJlYXNvbjogbmV3IFVpbnQ4KFJlbW92ZWROb25lKSwgcmVmdW5kOiAwIH0KICAgIGJ5dGVjXzIgLy8gMHgwMDAwMDAwMDAwMDAwMDAwMDAwMAoKZGVsZXRlR3JhbnRfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMuZGVsZXRlR3JhbnRANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTM0CiAgICAvLyBAYWJpbWV0aG9kKHsgbmFtZTogJ2FyY1RCRF9kZWxldGVfZ3JhbnQnIH0pCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpkZWxldGVHcmFudF9hZnRlcl9pZl9lbHNlQDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMDgKICAgIC8vIHJldHVybiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcy5taW5CYWxhbmNlCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RNaW5CYWxhbmNlCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTQzCiAgICAvLyBjb25zdCBmbG93ID0gdGhpcy5zeW5jTWV0YVJvb3QoTWV0YVRhZ0dyYW50LCBuYW1lLCBzdG9yZWQuc2xpY2UoR1NldCksIEJ5dGVzLmZyb21IZXgoJzAwJykpCiAgICBzd2FwCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA5CiAgICBkaWcgMQogICAgPj0KICAgIHB1c2hpbnQgOQogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBzd2FwCiAgICBzdWJzdHJpbmczCiAgICBieXRlYyA5IC8vICJnIgogICAgdW5jb3ZlciAzCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIHVuY292ZXIgMgogICAgYnl0ZWMgNCAvLyAweDAwCiAgICBjYWxsc3ViIHN5bmNNZXRhUm9vdAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1NDQKICAgIC8vIG9wLkJveC5kZWxldGUobmFtZSkKICAgIHN3YXAKICAgIGJveF9kZWwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1NDUKICAgIC8vIGNvbnN0IG1iciA9IHRoaXMuc2V0dGxlKGJlZm9yZSwgZmxvdywgVHhuLnNlbmRlcikKICAgIHR4biBTZW5kZXIKICAgIGNhbGxzdWIgc2V0dGxlCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTQ2CiAgICAvLyBlbWl0PEdyYW50Q2hhbmdlZD4oeyBob2xkZXI6IFR4bi5zZW5kZXIsIHJldmlzaW9uOiAwLCBkZWxldGVkOiB0cnVlLCByb3VuZDogR2xvYmFsLnJvdW5kLCB0aW1lc3RhbXA6IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgfSkKICAgIHR4biBTZW5kZXIKICAgIGdsb2JhbCBSb3VuZAogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgaW50Y18wIC8vIDAKICAgIGl0b2IKICAgIHVuY292ZXIgMwogICAgc3dhcAogICAgY29uY2F0CiAgICBieXRlY18zIC8vIDB4ODAKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgYnl0ZWMgMjcgLy8gbWV0aG9kICJHcmFudENoYW5nZWQoYWRkcmVzcyx1aW50NjQsYm9vbCx1aW50NjQsdWludDY0KSIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU0NwogICAgLy8gcmV0dXJuIHsgcmVtb3ZlZDogdHJ1ZSwgcmVhc29uOiBuZXcgVWludDgoUmVtb3ZlZEJ5SG9sZGVyKSwgcmVmdW5kOiBtYnIuYW1vdW50IH0KICAgIGV4dHJhY3QgMSA4CiAgICBwdXNoYnl0ZXMgMHg4MDA0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTM0CiAgICAvLyBAYWJpbWV0aG9kKHsgbmFtZTogJ2FyY1RCRF9kZWxldGVfZ3JhbnQnIH0pCiAgICBiIGRlbGV0ZUdyYW50X2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo6Q29sbGVjdGlibGVWYXJpYXRpb25zLmRlbGV0ZUdyYW50QDQKCgovLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMucHVyZ2Vbcm91dGluZ10oKSAtPiB2b2lkOgpwdXJnZToKICAgIGludGNfMCAvLyAwCiAgICBieXRlY18wIC8vICIiCiAgICBkdXBuIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTU3CiAgICAvLyBAYWJpbWV0aG9kKHsgbmFtZTogJ2FyY1RCRF9wdXJnZScgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTU5CiAgICAvLyBsb2dnZWRBc3NlcnQobmFtZS5sZW5ndGggPj0gQXNzZXROYW1lTGVuZ3RoLCBlcnJCYWRQdXJnZSkKICAgIGxlbgogICAgZHVwCiAgICBwdXNoaW50IDkKICAgID49CiAgICBibnogcHVyZ2VfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDIzIC8vICJFUlI6ZXJyQ3ZCcCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJDdkJwCgpwdXJnZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTYwCiAgICAvLyBjb25zdCBmYW1pbHkgPSBuYW1lLnNsaWNlKDAsIDEpCiAgICBpbnRjXzAgLy8gMAogICAgZGlnIDEKICAgIGR1cAogICAgY292ZXIgMgogICAgPj0KICAgIGludGNfMCAvLyAwCiAgICBkaWcgMgogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIGludGNfMSAvLyAxCiAgICBkaWcgMgogICAgPj0KICAgIGludGNfMSAvLyAxCiAgICBkaWcgMwogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIGRpZyA0CiAgICBkdXAKICAgIGNvdmVyIDQKICAgIHVuY292ZXIgMgogICAgZGlnIDIKICAgIHN1YnN0cmluZzMKICAgIGR1cAogICAgY292ZXIgNAogICAgYnVyeSAxMAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1NjEKICAgIC8vIGNvbnN0IGFzc2V0ID0gYnRvaShuYW1lLnNsaWNlKDEsIDkpKQogICAgcHVzaGludCA5CiAgICBkaWcgMgogICAgPj0KICAgIHB1c2hpbnQgOQogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgZHVwCiAgICBidXJ5IDgKICAgIHN1YnN0cmluZzMKICAgIGJ0b2kKICAgIGJ1cnkgNgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1NjIKICAgIC8vIGlmIChmYW1pbHkgPT09IFByZWZpeFZhcmlhdGlvbikgewogICAgYnl0ZWMgMTEgLy8gInYiCiAgICA9PQogICAgZHVwCiAgICBidXJ5IDQKICAgIGJ6IHB1cmdlX2Vsc2VfYm9keUAxMQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1NjMKICAgIC8vIGxvZ2dlZEFzc2VydChuYW1lLmxlbmd0aCA+IE5hbWVTbG90ICYmIG5hbWUubGVuZ3RoIDw9IE5hbWVTbG90ICsgTWF4U2xvdEJ5dGVzLCBlcnJCYWRQdXJnZSkKICAgIGR1cAogICAgcHVzaGludCA0MQogICAgPgogICAgYnogcHVyZ2VfYm9vbF9mYWxzZUA3CiAgICBkdXAKICAgIHB1c2hpbnQgNjQKICAgIDw9CiAgICBieiBwdXJnZV9ib29sX2ZhbHNlQDcKICAgIGludGNfMSAvLyAxCgpwdXJnZV9ib29sX21lcmdlQDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU2MwogICAgLy8gbG9nZ2VkQXNzZXJ0KG5hbWUubGVuZ3RoID4gTmFtZVNsb3QgJiYgbmFtZS5sZW5ndGggPD0gTmFtZVNsb3QgKyBNYXhTbG90Qnl0ZXMsIGVyckJhZFB1cmdlKQogICAgYm56IHB1cmdlX2FmdGVyX2lmX2Vsc2VAMTkKICAgIGJ5dGVjIDIzIC8vICJFUlI6ZXJyQ3ZCcCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJDdkJwCgpwdXJnZV9hZnRlcl9pZl9lbHNlQDE5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1NjcKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5hc3NldEZhY3RzKGFzc2V0KS5leGlzdHMsIGVyckFzc2V0RXhpc3RzKQogICAgZGlnIDQKICAgIGNhbGxzdWIgYXNzZXRGYWN0cwogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgYnogcHVyZ2VfYWZ0ZXJfYXNzZXJ0QDIxCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJDdkFlIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckN2QWUKCnB1cmdlX2FmdGVyX2Fzc2VydEAyMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTY4CiAgICAvLyB0aGlzLmV4cGVjdE5vUGF5bWVudCgpCiAgICBjYWxsc3ViIGV4cGVjdE5vUGF5bWVudAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1NzAKICAgIC8vIGNvbnN0IFtzdG9yZWQsIGV4aXN0c10gPSBvcC5Cb3guZ2V0KG5hbWUpCiAgICBkaWcgMQogICAgYm94X2dldAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1NzEKICAgIC8vIGlmICghZXhpc3RzKSB7CiAgICBibnogcHVyZ2VfYWZ0ZXJfaWZfZWxzZUAyMwogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU3MgogICAgLy8gcmV0dXJuIHsgcmVtb3ZlZDogZmFsc2UsIHJlYXNvbjogbmV3IFVpbnQ4KFJlbW92ZWROb25lKSwgcmVmdW5kOiAwIH0KICAgIGJ5dGVjXzIgLy8gMHgwMDAwMDAwMDAwMDAwMDAwMDAwMAoKcHVyZ2VfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMucHVyZ2VAMzM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU1NwogICAgLy8gQGFiaW1ldGhvZCh7IG5hbWU6ICdhcmNUQkRfcHVyZ2UnIH0pCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpwdXJnZV9hZnRlcl9pZl9lbHNlQDIzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMTA4CiAgICAvLyByZXR1cm4gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MubWluQmFsYW5jZQogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0TWluQmFsYW5jZQogICAgc3dhcAogICAgY292ZXIgMgogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU3NwogICAgLy8gaWYgKGZhbWlseSA9PT0gUHJlZml4VmFyaWF0aW9uKSB7CiAgICBkaWcgNAogICAgYnogcHVyZ2VfZWxzZV9ib2R5QDI1CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU3OAogICAgLy8gb3AuQm94LmRlbGV0ZShuYW1lKQogICAgZGlnIDMKICAgIGR1cAogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMDgKICAgIC8vIHJldHVybiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcy5taW5CYWxhbmNlCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RNaW5CYWxhbmNlCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTc5CiAgICAvLyB0b3RhbCA9IGJlZm9yZSAtIHRoaXMuYXBwTWluQmFsYW5jZSgpCiAgICB1bmNvdmVyIDMKICAgIHN3YXAKICAgIC0KICAgIGR1cAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1ODAKICAgIC8vIGNvbnN0IHdyaXRlciA9IEFjY291bnQobmFtZS5zbGljZShOYW1lV3JpdGVyLCBOYW1lU2xvdCkpCiAgICBwdXNoaW50IDQxCiAgICBkaWcgNQogICAgZHVwCiAgICBjb3ZlciAyCiAgICA+PQogICAgcHVzaGludCA0MQogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBkaWcgMwogICAgZGlnIDEwCiAgICBkaWcgMgogICAgc3Vic3RyaW5nMwogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1ODEKICAgIC8vIHRoaXMucmVmdW5kKHdyaXRlciwgdG90YWwpCiAgICBkdXAKICAgIHVuY292ZXIgNAogICAgY2FsbHN1YiByZWZ1bmQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTgyCiAgICAvLyB0aGlzLmVtaXREZWxldGVkKGFzc2V0LCB3cml0ZXIsIG5hbWUuc2xpY2UoTmFtZVNsb3QpLCBzdG9yZWQsIFJlbW92ZWRQdXJnZWQpCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMgogICAgdW5jb3ZlciAzCiAgICBzdWJzdHJpbmczCiAgICBkaWcgOAogICAgY292ZXIgMgogICAgdW5jb3ZlciA0CiAgICBpbnRjXzEgLy8gMQogICAgY2FsbHN1YiBlbWl0RGVsZXRlZAoKcHVyZ2VfYWZ0ZXJfaWZfZWxzZUAzMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjAxCiAgICAvLyByZXR1cm4geyByZW1vdmVkOiB0cnVlLCByZWFzb246IG5ldyBVaW50OChSZW1vdmVkUHVyZ2VkKSwgcmVmdW5kOiB0b3RhbCB9CiAgICBpdG9iCiAgICBwdXNoYnl0ZXMgMHg4MDAxCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTU3CiAgICAvLyBAYWJpbWV0aG9kKHsgbmFtZTogJ2FyY1RCRF9wdXJnZScgfSkKICAgIGIgcHVyZ2VfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMucHVyZ2VAMzMKCnB1cmdlX2Vsc2VfYm9keUAyNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTgzCiAgICAvLyB9IGVsc2UgaWYgKGZhbWlseSA9PT0gUHJlZml4TWFpbikgewogICAgZGlnIDcKICAgIGJ5dGVjIDUgLy8gIm0iCiAgICA9PQogICAgYnogcHVyZ2VfZWxzZV9ib2R5QDMwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU4NAogICAgLy8gY29uc3QgaG9sZGVyRGVwb3NpdCA9IGJ0b2koc3RvcmVkLnNsaWNlKE1Ib2xkZXJEZXBvc2l0LCBNSG9sZGVyRGVwb3NpdCArIDgpKQogICAgZHVwbiAyCiAgICBsZW4KICAgIHB1c2hpbnQgMjMKICAgIGRpZyAxCiAgICA+PQogICAgcHVzaGludCAyMwogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBwdXNoaW50IDMxCiAgICBkaWcgMgogICAgPj0KICAgIHB1c2hpbnQgMzEKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIGRpZyAyCiAgICBjb3ZlciAyCiAgICBzdWJzdHJpbmczCiAgICBidG9pCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU4NQogICAgLy8gb3AuQm94LmRlbGV0ZShuYW1lKQogICAgZGlnIDUKICAgIGJveF9kZWwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMTA4CiAgICAvLyByZXR1cm4gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MubWluQmFsYW5jZQogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0TWluQmFsYW5jZQogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU4NgogICAgLy8gdG90YWwgPSBiZWZvcmUgLSB0aGlzLmFwcE1pbkJhbGFuY2UoKQogICAgdW5jb3ZlciA0CiAgICBzd2FwCiAgICAtCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU4NwogICAgLy8gaWYgKGV4dHJhY3RVaW50MTYoc3RvcmVkLCBNSG9sZGVyTGVuKSA+IDApIHsKICAgIHB1c2hpbnQgMTMKICAgIGV4dHJhY3RfdWludDE2CiAgICBieiBwdXJnZV9lbHNlX2JvZHlAMjgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTg4CiAgICAvLyB0aGlzLnJlZnVuZChBY2NvdW50KHRoaXMuc2VjdGlvbihzdG9yZWQsIFJvbGVIb2xkZXIpLnNsaWNlKDAsIDMyKSksIGhvbGRlckRlcG9zaXQpCiAgICB1bmNvdmVyIDIKICAgIGludGNfMiAvLyAyCiAgICBjYWxsc3ViIHNlY3Rpb24KICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzAgLy8gMAogICAgZGlnIDEKICAgID49CiAgICBpbnRjXzAgLy8gMAogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBwdXNoaW50IDMyCiAgICBkaWcgMgogICAgPj0KICAgIHB1c2hpbnQgMzIKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIHN1YnN0cmluZzMKICAgIHVuY292ZXIgMgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBjYWxsc3ViIHJlZnVuZAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1ODkKICAgIC8vIHRoaXMucmVmdW5kKFR4bi5zZW5kZXIsIHRvdGFsIC0gaG9sZGVyRGVwb3NpdCkKICAgIHR4biBTZW5kZXIKICAgIGRpZyAyCiAgICB1bmNvdmVyIDIKICAgIC0KICAgIGNhbGxzdWIgcmVmdW5kCgpwdXJnZV9hZnRlcl9pZl9lbHNlQDI5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1OTMKICAgIC8vIHRoaXMuZW1pdE1haW4oYXNzZXQsIDAsIFJvbGVOb25lLCB0cnVlKQogICAgZGlnIDUKICAgIGludGNfMCAvLyAwCiAgICBkdXAKICAgIGludGNfMSAvLyAxCiAgICBjYWxsc3ViIGVtaXRNYWluCiAgICBiIHB1cmdlX2FmdGVyX2lmX2Vsc2VAMzIKCnB1cmdlX2Vsc2VfYm9keUAyODoKICAgIGJ1cnkgMQogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU5MQogICAgLy8gdGhpcy5yZWZ1bmQoVHhuLnNlbmRlciwgdG90YWwpCiAgICB0eG4gU2VuZGVyCiAgICBkaWcgMQogICAgY2FsbHN1YiByZWZ1bmQKICAgIGIgcHVyZ2VfYWZ0ZXJfaWZfZWxzZUAyOQoKcHVyZ2VfZWxzZV9ib2R5QDMwOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1OTUKICAgIC8vIGNvbnN0IGZsb3cgPSB0aGlzLmRyb3BQb2xpY3lSb290cyhuYW1lLCBzdG9yZWQpCiAgICBkaWcgMwogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgZHJvcFBvbGljeVJvb3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU5NgogICAgLy8gb3AuQm94LmRlbGV0ZShuYW1lKQogICAgc3dhcAogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMDgKICAgIC8vIHJldHVybiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcy5taW5CYWxhbmNlCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RNaW5CYWxhbmNlCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTk3CiAgICAvLyB0b3RhbCA9IGJlZm9yZSAtIHRoaXMuYXBwTWluQmFsYW5jZSgpICsgZmxvdy5yZWZ1bmRlZAogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICAtCiAgICBzd2FwCiAgICBpbnRjXzMgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgICsKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1OTgKICAgIC8vIHRoaXMucmVmdW5kKFR4bi5zZW5kZXIsIHRvdGFsKQogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgY2FsbHN1YiByZWZ1bmQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTk5CiAgICAvLyB0aGlzLmVtaXRQb2xpY3koYXNzZXQsIEdsb2JhbC56ZXJvQWRkcmVzcywgMCwgMCwgdHJ1ZSkKICAgIGRpZyA1CiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgIGludGNfMCAvLyAwCiAgICBkdXAKICAgIGludGNfMSAvLyAxCiAgICBjYWxsc3ViIGVtaXRQb2xpY3kKICAgIGIgcHVyZ2VfYWZ0ZXJfaWZfZWxzZUAzMgoKcHVyZ2VfYm9vbF9mYWxzZUA3OgogICAgaW50Y18wIC8vIDAKICAgIGIgcHVyZ2VfYm9vbF9tZXJnZUA4CgpwdXJnZV9lbHNlX2JvZHlAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU2NQogICAgLy8gbG9nZ2VkQXNzZXJ0KChmYW1pbHkgPT09IFByZWZpeE1haW4gfHwgZmFtaWx5ID09PSBQcmVmaXhBc3NldFBvbGljeSkgJiYgbmFtZS5sZW5ndGggPT09IEFzc2V0TmFtZUxlbmd0aCwgZXJyQmFkUHVyZ2UpCiAgICBkaWcgNQogICAgYnl0ZWMgNSAvLyAibSIKICAgID09CiAgICBibnogcHVyZ2VfYW5kX2NvbnRkQDEzCiAgICBkaWcgNQogICAgYnl0ZWMgMTUgLy8gInAiCiAgICA9PQogICAgYnogcHVyZ2VfYm9vbF9mYWxzZUAxNQoKcHVyZ2VfYW5kX2NvbnRkQDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1NjUKICAgIC8vIGxvZ2dlZEFzc2VydCgoZmFtaWx5ID09PSBQcmVmaXhNYWluIHx8IGZhbWlseSA9PT0gUHJlZml4QXNzZXRQb2xpY3kpICYmIG5hbWUubGVuZ3RoID09PSBBc3NldE5hbWVMZW5ndGgsIGVyckJhZFB1cmdlKQogICAgZHVwCiAgICBwdXNoaW50IDkKICAgID09CiAgICBieiBwdXJnZV9ib29sX2ZhbHNlQDE1CiAgICBpbnRjXzEgLy8gMQoKcHVyZ2VfYm9vbF9tZXJnZUAxNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTY1CiAgICAvLyBsb2dnZWRBc3NlcnQoKGZhbWlseSA9PT0gUHJlZml4TWFpbiB8fCBmYW1pbHkgPT09IFByZWZpeEFzc2V0UG9saWN5KSAmJiBuYW1lLmxlbmd0aCA9PT0gQXNzZXROYW1lTGVuZ3RoLCBlcnJCYWRQdXJnZSkKICAgIGJueiBwdXJnZV9hZnRlcl9pZl9lbHNlQDE5CiAgICBieXRlYyAyMyAvLyAiRVJSOmVyckN2QnAiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQ3ZCcAoKcHVyZ2VfYm9vbF9mYWxzZUAxNToKICAgIGludGNfMCAvLyAwCiAgICBiIHB1cmdlX2Jvb2xfbWVyZ2VAMTYKCgovLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMuZ2V0TWFpbltyb3V0aW5nXSgpIC0+IHZvaWQ6CmdldE1haW46CiAgICBpbnRjXzAgLy8gMAogICAgYnl0ZWNfMCAvLyAiIgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjYxMAogICAgLy8gQGFiaW1ldGhvZCh7IG5hbWU6ICdhcmNUQkRfZ2V0X21haW4nLCByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNjQKICAgIC8vIHJldHVybiBQcmVmaXhNYWluLmNvbmNhdChpdG9iKGFzc2V0KSkKICAgIGl0b2IKICAgIGJ5dGVjIDUgLy8gIm0iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjEyCiAgICAvLyBjb25zdCBbbWFpbiwgZXhpc3RzXSA9IG9wLkJveC5nZXQodGhpcy5tYWluTmFtZShhc3NldCkpCiAgICBib3hfZ2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjYxMwogICAgLy8gaWYgKGV4aXN0cykgewogICAgYnogZ2V0TWFpbl9hZnRlcl9pZl9lbHNlQDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjE0CiAgICAvLyBpZiAoZXh0cmFjdFVpbnQxNihtYWluLCBNSG9sZGVyTGVuKSA+IDApIHsKICAgIGR1cAogICAgcHVzaGludCAxMwogICAgZXh0cmFjdF91aW50MTYKICAgIGJ6IGdldE1haW5fYWZ0ZXJfaWZfZWxzZUA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjYxNQogICAgLy8gY29uc3QgaG9sZGVyU2VjdGlvbiA9IHRoaXMuc2VjdGlvbihtYWluLCBSb2xlSG9sZGVyKQogICAgZHVwbiAyCiAgICBpbnRjXzIgLy8gMgogICAgY2FsbHN1YiBzZWN0aW9uCiAgICBkdXAKICAgIGJ1cnkgNwogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo2MTYKICAgIC8vIGlmICh0aGlzLmhvbGRzKEFjY291bnQoaG9sZGVyU2VjdGlvbi5zbGljZSgwLCAzMikpLCBhc3NldCwgZ2V0Qnl0ZShtYWluLCBNRGVjaW1hbHMpKSkgewogICAgZHVwCiAgICBsZW4KICAgIGR1cAogICAgYnVyeSA2CiAgICBpbnRjXzAgLy8gMAogICAgZGlnIDEKICAgID49CiAgICBpbnRjXzAgLy8gMAogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBwdXNoaW50IDMyCiAgICBkaWcgMgogICAgPj0KICAgIHB1c2hpbnQgMzIKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIGR1cAogICAgYnVyeSA4CiAgICBzdWJzdHJpbmczCiAgICBzd2FwCiAgICBpbnRjXzIgLy8gMgogICAgZ2V0Ynl0ZQogICAgZGlnIDMKICAgIHN3YXAKICAgIGNhbGxzdWIgaG9sZHMKICAgIGJ6IGdldE1haW5fYWZ0ZXJfaWZfZWxzZUA2CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjE3CiAgICAvLyByZXR1cm4geyByb2xlOiBuZXcgVWludDgoUm9sZUhvbGRlciksIHBpbjogaG9sZGVyU2VjdGlvbi5zbGljZShIb2xkZXJTZWN0aW9uUHJlZml4KSB9CiAgICBkaWcgMwogICAgZGlnIDMKICAgIGRpZyAzCiAgICBzdWJzdHJpbmczCiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgcHVzaGJ5dGVzIDB4MDIwMDAzCiAgICBzd2FwCiAgICBjb25jYXQKCmdldE1haW5fYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMuZ2V0TWFpbkAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjEwCiAgICAvLyBAYWJpbWV0aG9kKHsgbmFtZTogJ2FyY1RCRF9nZXRfbWFpbicsIHJlYWRvbmx5OiB0cnVlIH0pCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpnZXRNYWluX2FmdGVyX2lmX2Vsc2VANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjIwCiAgICAvLyBpZiAoZXh0cmFjdFVpbnQxNihtYWluLCBNQ3JlYXRvckxlbikgPiAwKSB7CiAgICBkdXAKICAgIHB1c2hpbnQgMTEKICAgIGV4dHJhY3RfdWludDE2CiAgICBieiBnZXRNYWluX2FmdGVyX2lmX2Vsc2VAOQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo2MjEKICAgIC8vIHJldHVybiB7IHJvbGU6IG5ldyBVaW50OChSb2xlQ3JlYXRvciksIHBpbjogdGhpcy5zZWN0aW9uKG1haW4sIFJvbGVDcmVhdG9yKSB9CiAgICBpbnRjXzEgLy8gMQogICAgY2FsbHN1YiBzZWN0aW9uCiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgcHVzaGJ5dGVzIDB4MDEwMDAzCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjEwCiAgICAvLyBAYWJpbWV0aG9kKHsgbmFtZTogJ2FyY1RCRF9nZXRfbWFpbicsIHJlYWRvbmx5OiB0cnVlIH0pCiAgICBiIGdldE1haW5fYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMuZ2V0TWFpbkAxMAoKZ2V0TWFpbl9hZnRlcl9pZl9lbHNlQDk6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjI0CiAgICAvLyByZXR1cm4geyByb2xlOiBuZXcgVWludDgoUm9sZU5vbmUpLCBwaW46IEJ5dGVzKCcnKSB9CiAgICBwdXNoYnl0ZXMgMHgwMDAwMDMwMDAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjYxMAogICAgLy8gQGFiaW1ldGhvZCh7IG5hbWU6ICdhcmNUQkRfZ2V0X21haW4nLCByZWFkb25seTogdHJ1ZSB9KQogICAgYiBnZXRNYWluX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo6Q29sbGVjdGlibGVWYXJpYXRpb25zLmdldE1haW5AMTAKCgovLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMuYXNzZXRGYWN0cyhhc3NldDogdWludDY0KSAtPiBieXRlczoKYXNzZXRGYWN0czoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjI5CiAgICAvLyBwcml2YXRlIGFzc2V0RmFjdHMoYXNzZXQ6IHVpbnQ2NCk6IEFzc2V0RmFjdHMgewogICAgcHJvdG8gMSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjYzMQogICAgLy8gY29uc3QgW3RvdGFsLCBleGlzdHNdID0gb3AuQXNzZXRQYXJhbXMuYXNzZXRUb3RhbChhKQogICAgZnJhbWVfZGlnIC0xCiAgICBhc3NldF9wYXJhbXNfZ2V0IEFzc2V0VG90YWwKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjMyCiAgICAvLyBpZiAoIWV4aXN0cykgewogICAgYm56IGFzc2V0RmFjdHNfYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjYzMy02NDAKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIGV4aXN0czogZmFsc2UsCiAgICAvLyAgIGNyZWF0b3I6IEdsb2JhbC56ZXJvQWRkcmVzcywKICAgIC8vICAgbWFuYWdlcjogR2xvYmFsLnplcm9BZGRyZXNzLAogICAgLy8gICBjbGF3YmFjazogR2xvYmFsLnplcm9BZGRyZXNzLAogICAgLy8gICB0b3RhbDogMCwKICAgIC8vICAgZGVjaW1hbHM6IDAsCiAgICAvLyB9CiAgICBwdXNoYnl0ZXMgYmFzZTMyKEFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUEpCiAgICBzd2FwCiAgICByZXRzdWIKCmFzc2V0RmFjdHNfYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo2NDIKICAgIC8vIGNvbnN0IFtkZWNpbWFsc10gPSBvcC5Bc3NldFBhcmFtcy5hc3NldERlY2ltYWxzKGEpCiAgICBmcmFtZV9kaWcgLTEKICAgIGFzc2V0X3BhcmFtc19nZXQgQXNzZXREZWNpbWFscwogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY0MwogICAgLy8gY29uc3QgW21hbmFnZXJdID0gb3AuQXNzZXRQYXJhbXMuYXNzZXRNYW5hZ2VyKGEpCiAgICBmcmFtZV9kaWcgLTEKICAgIGFzc2V0X3BhcmFtc19nZXQgQXNzZXRNYW5hZ2VyCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjQ0CiAgICAvLyBjb25zdCBbY2xhd2JhY2tdID0gb3AuQXNzZXRQYXJhbXMuYXNzZXRDbGF3YmFjayhhKQogICAgZnJhbWVfZGlnIC0xCiAgICBhc3NldF9wYXJhbXNfZ2V0IEFzc2V0Q2xhd2JhY2sKICAgIHBvcAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo2NDUKICAgIC8vIGNvbnN0IFtjcmVhdG9yXSA9IG9wLkFzc2V0UGFyYW1zLmFzc2V0Q3JlYXRvcihhKQogICAgZnJhbWVfZGlnIC0xCiAgICBhc3NldF9wYXJhbXNfZ2V0IEFzc2V0Q3JlYXRvcgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY0NgogICAgLy8gcmV0dXJuIHsgZXhpc3RzOiB0cnVlLCBjcmVhdG9yLCBtYW5hZ2VyLCBjbGF3YmFjaywgdG90YWwsIGRlY2ltYWxzIH0KICAgIGJ5dGVjXzMgLy8gMHg4MAogICAgc3dhcAogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo6Q29sbGVjdGlibGVWYXJpYXRpb25zLmlzVW5pdEFzc2V0KGZhY3RzOiBieXRlcykgLT4gdWludDY0LCBieXRlczoKaXNVbml0QXNzZXQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY1NAogICAgLy8gcHJpdmF0ZSBpc1VuaXRBc3NldChmYWN0czogQXNzZXRGYWN0cyk6IGJvb2xlYW4gewogICAgcHJvdG8gMSAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY1NQogICAgLy8gcmV0dXJuIGZhY3RzLmRlY2ltYWxzIDw9IDE5ICYmIGZhY3RzLnRvdGFsID49IHRoaXMudW5pdChmYWN0cy5kZWNpbWFscykKICAgIGZyYW1lX2RpZyAtMQogICAgcHVzaGludCAxMDUKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIHB1c2hpbnQgMTkKICAgIDw9CiAgICBieiBpc1VuaXRBc3NldF9ib29sX2ZhbHNlQDMKICAgIGZyYW1lX2RpZyAtMQogICAgcHVzaGludCA5NwogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjUwCiAgICAvLyByZXR1cm4gMTAgKiogZGVjaW1hbHMKICAgIHB1c2hpbnQgMTAKICAgIGZyYW1lX2RpZyAwCiAgICBleHAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjU1CiAgICAvLyByZXR1cm4gZmFjdHMuZGVjaW1hbHMgPD0gMTkgJiYgZmFjdHMudG90YWwgPj0gdGhpcy51bml0KGZhY3RzLmRlY2ltYWxzKQogICAgPj0KICAgIGJ6IGlzVW5pdEFzc2V0X2Jvb2xfZmFsc2VAMwogICAgaW50Y18xIC8vIDEKCmlzVW5pdEFzc2V0X2Jvb2xfbWVyZ2VANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjU1CiAgICAvLyByZXR1cm4gZmFjdHMuZGVjaW1hbHMgPD0gMTkgJiYgZmFjdHMudG90YWwgPj0gdGhpcy51bml0KGZhY3RzLmRlY2ltYWxzKQogICAgZnJhbWVfZGlnIC0xCiAgICB1bmNvdmVyIDIKICAgIHJldHN1YgoKaXNVbml0QXNzZXRfYm9vbF9mYWxzZUAzOgogICAgaW50Y18wIC8vIDAKICAgIGIgaXNVbml0QXNzZXRfYm9vbF9tZXJnZUA0CgoKLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo6Q29sbGVjdGlibGVWYXJpYXRpb25zLmhvbGRzKGFjY291bnQ6IGJ5dGVzLCBhc3NldDogdWludDY0LCBkZWNpbWFsczogdWludDY0KSAtPiB1aW50NjQ6CmhvbGRzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo2NTkKICAgIC8vIHByaXZhdGUgaG9sZHMoYWNjb3VudDogQWNjb3VudCwgYXNzZXQ6IHVpbnQ2NCwgZGVjaW1hbHM6IHVpbnQ2NCk6IGJvb2xlYW4gewogICAgcHJvdG8gMyAxCiAgICBieXRlY18wIC8vICIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY2MAogICAgLy8gaWYgKGFjY291bnQgPT09IEdsb2JhbC56ZXJvQWRkcmVzcyB8fCBkZWNpbWFscyA+IDE5KSByZXR1cm4gZmFsc2UKICAgIGZyYW1lX2RpZyAtMwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYm56IGhvbGRzX2lmX2JvZHlAMgogICAgZnJhbWVfZGlnIC0xCiAgICBwdXNoaW50IDE5CiAgICA+CiAgICBieiBob2xkc19hZnRlcl9pZl9lbHNlQDMKCmhvbGRzX2lmX2JvZHlAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjYwCiAgICAvLyBpZiAoYWNjb3VudCA9PT0gR2xvYmFsLnplcm9BZGRyZXNzIHx8IGRlY2ltYWxzID4gMTkpIHJldHVybiBmYWxzZQogICAgaW50Y18wIC8vIDAKICAgIHN3YXAKICAgIHJldHN1YgoKaG9sZHNfYWZ0ZXJfaWZfZWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo2NjEKICAgIC8vIGNvbnN0IFthbW91bnQsIG9wdGVkSW5dID0gb3AuQXNzZXRIb2xkaW5nLmFzc2V0QmFsYW5jZShhY2NvdW50LCBBc3NldChhc3NldCkpCiAgICBmcmFtZV9kaWcgLTMKICAgIGZyYW1lX2RpZyAtMgogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBzd2FwCiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjYyCiAgICAvLyByZXR1cm4gb3B0ZWRJbiAmJiBhbW91bnQgPj0gdGhpcy51bml0KGRlY2ltYWxzKQogICAgYnogaG9sZHNfYm9vbF9mYWxzZUA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY1MAogICAgLy8gcmV0dXJuIDEwICoqIGRlY2ltYWxzCiAgICBwdXNoaW50IDEwCiAgICBmcmFtZV9kaWcgLTEKICAgIGV4cAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo2NjIKICAgIC8vIHJldHVybiBvcHRlZEluICYmIGFtb3VudCA+PSB0aGlzLnVuaXQoZGVjaW1hbHMpCiAgICBmcmFtZV9kaWcgMAogICAgPD0KICAgIGJ6IGhvbGRzX2Jvb2xfZmFsc2VANgogICAgaW50Y18xIC8vIDEKCmhvbGRzX2Jvb2xfbWVyZ2VANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjYyCiAgICAvLyByZXR1cm4gb3B0ZWRJbiAmJiBhbW91bnQgPj0gdGhpcy51bml0KGRlY2ltYWxzKQogICAgc3dhcAogICAgcmV0c3ViCgpob2xkc19ib29sX2ZhbHNlQDY6CiAgICBpbnRjXzAgLy8gMAogICAgYiBob2xkc19ib29sX21lcmdlQDcKCgovLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMucmVzb2x2ZUNyZWF0b3IoYXNzZXQ6IHVpbnQ2NCwgY29udHJvbGxpbmdBcHA6IHVpbnQ2NCwgZmFjdHM6IGJ5dGVzKSAtPiBieXRlcywgYnl0ZXM6CnJlc29sdmVDcmVhdG9yOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo2NzAKICAgIC8vIHByaXZhdGUgcmVzb2x2ZUNyZWF0b3IoYXNzZXQ6IHVpbnQ2NCwgY29udHJvbGxpbmdBcHA6IHVpbnQ2NCwgZmFjdHM6IEFzc2V0RmFjdHMpOiBBY2NvdW50IHsKICAgIHByb3RvIDMgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo2NzEKICAgIC8vIGlmIChjb250cm9sbGluZ0FwcCA9PT0gUGxhaW5Bc2EpIHJldHVybiBmYWN0cy5tYW5hZ2VyCiAgICBmcmFtZV9kaWcgLTIKICAgIGJueiByZXNvbHZlQ3JlYXRvcl9hZnRlcl9pZl9lbHNlQDIKICAgIGZyYW1lX2RpZyAtMQogICAgZXh0cmFjdCAzMyAzMgogICAgZnJhbWVfZGlnIC0xCiAgICByZXRzdWIKCnJlc29sdmVDcmVhdG9yX2FmdGVyX2lmX2Vsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjcyCiAgICAvLyBjb25zdCBhcHBBZGRyZXNzID0gQXBwbGljYXRpb24oY29udHJvbGxpbmdBcHApLmFkZHJlc3MKICAgIGZyYW1lX2RpZyAtMgogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgc3dhcAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjczCiAgICAvLyBsb2dnZWRBc3NlcnQoZmFjdHMuY2xhd2JhY2sgPT09IGFwcEFkZHJlc3MsIGVyckJhZFNtYXJ0QXNhKQogICAgZnJhbWVfZGlnIC0xCiAgICBleHRyYWN0IDY1IDMyCiAgICA9PQogICAgYm56IHJlc29sdmVDcmVhdG9yX2FmdGVyX2Fzc2VydEA0CiAgICBieXRlYyAyNCAvLyAiRVJSOmVyckN2QnMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQ3ZCcwoKcmVzb2x2ZUNyZWF0b3JfYWZ0ZXJfYXNzZXJ0QDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY3NgogICAgLy8gbG9nZ2VkQXNzZXJ0KGZhY3RzLm1hbmFnZXIgPT09IGFwcEFkZHJlc3MsIGVyckJhZFNtYXJ0QXNhKQogICAgZnJhbWVfZGlnIC0xCiAgICBleHRyYWN0IDMzIDMyCiAgICA9PQogICAgYm56IHJlc29sdmVDcmVhdG9yX2FmdGVyX2Fzc2VydEA2CiAgICBieXRlYyAyNCAvLyAiRVJSOmVyckN2QnMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQ3ZCcwoKcmVzb2x2ZUNyZWF0b3JfYWZ0ZXJfYXNzZXJ0QDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY3Ny02ODQKICAgIC8vIGNvbnN0IGNhbGwgPSBpdHhuCiAgICAvLyAgIC5hcHBsaWNhdGlvbkNhbGwoewogICAgLy8gICAgIGFwcElkOiBjb250cm9sbGluZ0FwcCwKICAgIC8vICAgICBhcHBBcmdzOiBbbWV0aG9kU2VsZWN0b3IoQXJjMjBHZXRBc3NldENvbmZpZyksIEJ5dGVzLmZyb21IZXgoJzAwJyldLAogICAgLy8gICAgIGFzc2V0czogW0Fzc2V0KGFzc2V0KV0sCiAgICAvLyAgICAgZmVlOiAwLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIGZyYW1lX2RpZyAtMwogICAgaXR4bl9maWVsZCBBc3NldHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjgwCiAgICAvLyBhcHBBcmdzOiBbbWV0aG9kU2VsZWN0b3IoQXJjMjBHZXRBc3NldENvbmZpZyksIEJ5dGVzLmZyb21IZXgoJzAwJyldLAogICAgcHVzaGJ5dGVzIDB4Y2UyZjA1ZjMgLy8gbWV0aG9kICJnZXRfYXNzZXRfY29uZmlnKGFzc2V0KSh1aW50NjQsdWludDMyLGJvb2wsc3RyaW5nLHN0cmluZyxzdHJpbmcsYnl0ZVtdLGFkZHJlc3MsYWRkcmVzcyxhZGRyZXNzLGFkZHJlc3MpIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGJ5dGVjIDQgLy8gMHgwMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGZyYW1lX2RpZyAtMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY3Ny02ODMKICAgIC8vIGNvbnN0IGNhbGwgPSBpdHhuCiAgICAvLyAgIC5hcHBsaWNhdGlvbkNhbGwoewogICAgLy8gICAgIGFwcElkOiBjb250cm9sbGluZ0FwcCwKICAgIC8vICAgICBhcHBBcmdzOiBbbWV0aG9kU2VsZWN0b3IoQXJjMjBHZXRBc3NldENvbmZpZyksIEJ5dGVzLmZyb21IZXgoJzAwJyldLAogICAgLy8gICAgIGFzc2V0czogW0Fzc2V0KGFzc2V0KV0sCiAgICAvLyAgICAgZmVlOiAwLAogICAgLy8gICB9KQogICAgcHVzaGludCA2CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY4MgogICAgLy8gZmVlOiAwLAogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY3Ny02ODQKICAgIC8vIGNvbnN0IGNhbGwgPSBpdHhuCiAgICAvLyAgIC5hcHBsaWNhdGlvbkNhbGwoewogICAgLy8gICAgIGFwcElkOiBjb250cm9sbGluZ0FwcCwKICAgIC8vICAgICBhcHBBcmdzOiBbbWV0aG9kU2VsZWN0b3IoQXJjMjBHZXRBc3NldENvbmZpZyksIEJ5dGVzLmZyb21IZXgoJzAwJyldLAogICAgLy8gICAgIGFzc2V0czogW0Fzc2V0KGFzc2V0KV0sCiAgICAvLyAgICAgZmVlOiAwLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo2ODYKICAgIC8vIGxvZ2dlZEFzc2VydChyZXN1bHQubGVuZ3RoID49IEFyYzIwTWFuYWdlck9mZnNldCArIDMyICYmIHJlc3VsdC5zbGljZSgwLCA0KSA9PT0gQXJjNFJldHVyblByZWZpeCwgZXJyQmFkU21hcnRBc2EpCiAgICBsZW4KICAgIGR1cAogICAgcHVzaGludCA1NwogICAgPj0KICAgIGJ6IHJlc29sdmVDcmVhdG9yX2Jvb2xfZmFsc2VAMTAKICAgIGludGNfMCAvLyAwCiAgICBkaWcgMQogICAgZHVwCiAgICBjb3ZlciAyCiAgICA+PQogICAgaW50Y18wIC8vIDAKICAgIGRpZyAyCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgcHVzaGludCA0CiAgICBkaWcgMgogICAgPj0KICAgIHB1c2hpbnQgNAogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgZGlnIDMKICAgIGNvdmVyIDIKICAgIHN1YnN0cmluZzMKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGJ6IHJlc29sdmVDcmVhdG9yX2Jvb2xfZmFsc2VAMTAKICAgIGludGNfMSAvLyAxCgpyZXNvbHZlQ3JlYXRvcl9ib29sX21lcmdlQDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo2ODYKICAgIC8vIGxvZ2dlZEFzc2VydChyZXN1bHQubGVuZ3RoID49IEFyYzIwTWFuYWdlck9mZnNldCArIDMyICYmIHJlc3VsdC5zbGljZSgwLCA0KSA9PT0gQXJjNFJldHVyblByZWZpeCwgZXJyQmFkU21hcnRBc2EpCiAgICBibnogcmVzb2x2ZUNyZWF0b3JfYWZ0ZXJfYXNzZXJ0QDEzCiAgICBieXRlYyAyNCAvLyAiRVJSOmVyckN2QnMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQ3ZCcwoKcmVzb2x2ZUNyZWF0b3JfYWZ0ZXJfYXNzZXJ0QDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo2ODcKICAgIC8vIHJldHVybiBBY2NvdW50KHJlc3VsdC5zbGljZShBcmMyME1hbmFnZXJPZmZzZXQsIEFyYzIwTWFuYWdlck9mZnNldCArIDMyKSkKICAgIHB1c2hpbnQgMjUKICAgIGRpZyAxCiAgICA+PQogICAgcHVzaGludCAyNQogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBwdXNoaW50IDU3CiAgICBkaWcgMgogICAgPj0KICAgIHB1c2hpbnQgNTcKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIHN1YnN0cmluZzMKICAgIGZyYW1lX2RpZyAtMQogICAgcmV0c3ViCgpyZXNvbHZlQ3JlYXRvcl9ib29sX2ZhbHNlQDEwOgogICAgaW50Y18wIC8vIDAKICAgIGIgcmVzb2x2ZUNyZWF0b3JfYm9vbF9tZXJnZUAxMQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy5jcmVhdG9yU2lkZVJlbW92ZXIoYXNzZXQ6IHVpbnQ2NCwgY29udHJvbGxpbmdBcHA6IHVpbnQ2NCwgZmFjdHM6IGJ5dGVzKSAtPiB1aW50NjQsIGJ5dGVzOgpjcmVhdG9yU2lkZVJlbW92ZXI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY5MQogICAgLy8gcHJpdmF0ZSBjcmVhdG9yU2lkZVJlbW92ZXIoYXNzZXQ6IHVpbnQ2NCwgY29udHJvbGxpbmdBcHA6IHVpbnQ2NCwgZmFjdHM6IEFzc2V0RmFjdHMpOiB1aW50NjQgewogICAgcHJvdG8gMyAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY5MgogICAgLy8gY29uc3QgY3JlYXRvciA9IHRoaXMucmVzb2x2ZUNyZWF0b3IoYXNzZXQsIGNvbnRyb2xsaW5nQXBwLCBmYWN0cykKICAgIGZyYW1lX2RpZyAtMwogICAgZnJhbWVfZGlnIC0yCiAgICBmcmFtZV9kaWcgLTEKICAgIGNhbGxzdWIgcmVzb2x2ZUNyZWF0b3IKICAgIGZyYW1lX2J1cnkgLTEKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo2OTMKICAgIC8vIGlmIChjcmVhdG9yICE9PSBHbG9iYWwuemVyb0FkZHJlc3MpIHsKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgIT0KICAgIGJ6IGNyZWF0b3JTaWRlUmVtb3Zlcl9hZnRlcl9pZl9lbHNlQDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6Njk0CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gY3JlYXRvciwgZXJyTm90Q3JlYXRvcikKICAgIHR4biBTZW5kZXIKICAgID09CiAgICBibnogY3JlYXRvclNpZGVSZW1vdmVyX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyAxMyAvLyAiRVJSOmVyckN2TmMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQ3ZOYwoKY3JlYXRvclNpZGVSZW1vdmVyX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo2OTUKICAgIC8vIHJldHVybiBSZW1vdmVkQnlDcmVhdG9yCiAgICBwdXNoaW50IDUKICAgIGZyYW1lX2RpZyAtMQogICAgcmV0c3ViCgpjcmVhdG9yU2lkZVJlbW92ZXJfYWZ0ZXJfaWZfZWxzZUA2OgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY5NwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IGZhY3RzLmNyZWF0b3IsIGVyck5vdENyZWF0b3IpCiAgICB0eG4gU2VuZGVyCiAgICBmcmFtZV9kaWcgLTEKICAgIGV4dHJhY3QgMSAzMgogICAgPT0KICAgIGJueiBjcmVhdG9yU2lkZVJlbW92ZXJfYWZ0ZXJfYXNzZXJ0QDgKICAgIGJ5dGVjIDEzIC8vICJFUlI6ZXJyQ3ZOYyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJDdk5jCgpjcmVhdG9yU2lkZVJlbW92ZXJfYWZ0ZXJfYXNzZXJ0QDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY5OAogICAgLy8gcmV0dXJuIFJlbW92ZWRCeUFzc2V0Q3JlYXRvcgogICAgcHVzaGludCA2CiAgICBmcmFtZV9kaWcgLTEKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy5lZmZlY3RpdmVQb2xpY3koYXNzZXQ6IHVpbnQ2NCwgbWFuYWdlcjogYnl0ZXMpIC0+IGJ5dGVzOgplZmZlY3RpdmVQb2xpY3k6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjcwNAogICAgLy8gcHJpdmF0ZSBlZmZlY3RpdmVQb2xpY3koYXNzZXQ6IHVpbnQ2NCwgbWFuYWdlcjogQWNjb3VudCk6IFBvbGljeSB7CiAgICBwcm90byAyIDEKICAgIGludGNfMCAvLyAwCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzA1CiAgICAvLyBjb25zdCBhc3NldE5hbWUgPSBQcmVmaXhBc3NldFBvbGljeS5jb25jYXQoaXRvYihhc3NldCkpCiAgICBmcmFtZV9kaWcgLTIKICAgIGl0b2IKICAgIGJ5dGVjIDE1IC8vICJwIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzA2CiAgICAvLyBjb25zdCBbYXNzZXRWYWx1ZSwgYXNzZXRFeGlzdHNdID0gb3AuQm94LmdldChhc3NldE5hbWUpCiAgICBib3hfZ2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjcwNwogICAgLy8gaWYgKGFzc2V0RXhpc3RzKSByZXR1cm4geyB2YWx1ZTogYXNzZXRWYWx1ZSwgbmFtZTogYXNzZXROYW1lIH0KICAgIGJ6IGVmZmVjdGl2ZVBvbGljeV9hZnRlcl9pZl9lbHNlQDIKICAgIGR1cAogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA0CiAgICArCiAgICB1bmNvdmVyIDIKICAgIGR1cAogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgc3dhcAogICAgY29uY2F0CiAgICBzd2FwCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgYnl0ZWMgMjUgLy8gMHgwMDA0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgplZmZlY3RpdmVQb2xpY3lfYWZ0ZXJfaWZfZWxzZUAyOgogICAgcG9wbiAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjcwOAogICAgLy8gaWYgKG1hbmFnZXIgIT09IEdsb2JhbC56ZXJvQWRkcmVzcykgewogICAgZnJhbWVfZGlnIC0xCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgICE9CiAgICBieiBlZmZlY3RpdmVQb2xpY3lfYWZ0ZXJfaWZfZWxzZUA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjcwOQogICAgLy8gY29uc3QgbWFuYWdlck5hbWUgPSBQcmVmaXhNYW5hZ2VyUG9saWN5LmNvbmNhdChtYW5hZ2VyLmJ5dGVzKQogICAgYnl0ZWMgMjIgLy8gIlAiCiAgICBmcmFtZV9kaWcgLTEKICAgIGNvbmNhdAogICAgZHVwCiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzEwCiAgICAvLyBjb25zdCBbbWFuYWdlclZhbHVlLCBtYW5hZ2VyRXhpc3RzXSA9IG9wLkJveC5nZXQobWFuYWdlck5hbWUpCiAgICBib3hfZ2V0CiAgICBzd2FwCiAgICBmcmFtZV9idXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzExCiAgICAvLyBpZiAobWFuYWdlckV4aXN0cykgcmV0dXJuIHsgdmFsdWU6IG1hbmFnZXJWYWx1ZSwgbmFtZTogbWFuYWdlck5hbWUgfQogICAgYnogZWZmZWN0aXZlUG9saWN5X2FmdGVyX2lmX2Vsc2VANgogICAgZnJhbWVfZGlnIDEKICAgIGR1cAogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA0CiAgICArCiAgICBmcmFtZV9kaWcgMAogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBieXRlYyAyNSAvLyAweDAwMDQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCmVmZmVjdGl2ZVBvbGljeV9hZnRlcl9pZl9lbHNlQDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjcxNAogICAgLy8gcmV0dXJuIHsgdmFsdWU6IEJ5dGVzLmZyb21IZXgoJzAxMDEnKS5jb25jYXQoaXRvYigwKSkuY29uY2F0KEJ5dGVzLmZyb21IZXgoJzAwMDAnKSksIG5hbWU6IEJ5dGVzKCcnKSB9CiAgICBwdXNoYnl0ZXMgMHgwMDA0MDAxMjAwMGMwMTAxMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwCiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy5wb2xpY3lTZXRzKHZhbHVlOiBieXRlcykgLT4gYnl0ZXM6CnBvbGljeVNldHM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjcxOAogICAgLy8gcHJpdmF0ZSBwb2xpY3lTZXRzKHZhbHVlOiBieXRlcyk6IFtieXRlcywgYnl0ZXNdIHsKICAgIHByb3RvIDEgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo3MTkKICAgIC8vIGNvbnN0IHJlc3QgPSB2YWx1ZS5zbGljZShQU2V0cykKICAgIGZyYW1lX2RpZyAtMQogICAgbGVuCiAgICBwdXNoaW50IDEwCiAgICBkaWcgMQogICAgPj0KICAgIHB1c2hpbnQgMTAKICAgIGRpZyAyCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgZnJhbWVfZGlnIC0xCiAgICBzd2FwCiAgICB1bmNvdmVyIDIKICAgIHN1YnN0cmluZzMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzIwCiAgICAvLyBjb25zdCBmaXJzdCA9IHJlc3Quc2xpY2UoMCwgdGhpcy53cml0ZXJTZXRMZW5ndGgocmVzdCkpCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18wIC8vIDAKICAgIGRpZyAxCiAgICA+PQogICAgaW50Y18wIC8vIDAKICAgIGRpZyAyCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgZGlnIDIKICAgIGNhbGxzdWIgd3JpdGVyU2V0TGVuZ3RoCiAgICBkdXAKICAgIGRpZyAzCiAgICA+PQogICAgZGlnIDMKICAgIHN3YXAKICAgIHNlbGVjdAogICAgZGlnIDMKICAgIGNvdmVyIDIKICAgIHN1YnN0cmluZzMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzIxCiAgICAvLyByZXR1cm4gW2ZpcnN0LCByZXN0LnNsaWNlKGZpcnN0Lmxlbmd0aCldCiAgICBkdXAKICAgIGxlbgogICAgZHVwCiAgICBkaWcgMwogICAgPj0KICAgIGRpZyAxCiAgICBkaWcgNAogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIHVuY292ZXIgNAogICAgc3dhcAogICAgdW5jb3ZlciA0CiAgICBzdWJzdHJpbmczCiAgICBzd2FwCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgdW5jb3ZlciAyCiAgICBjb25jYXQKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDQKICAgICsKICAgIGRpZyAyCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICB1bmNvdmVyIDMKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIGJ5dGVjIDI1IC8vIDB4MDAwNAogICAgc3dhcAogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMud3JpdGVyU2V0TGVuZ3RoKHNldDogYnl0ZXMpIC0+IHVpbnQ2NDoKd3JpdGVyU2V0TGVuZ3RoOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo3MjQKICAgIC8vIHByaXZhdGUgd3JpdGVyU2V0TGVuZ3RoKHNldDogYnl0ZXMpOiB1aW50NjQgewogICAgcHJvdG8gMSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjcyNQogICAgLy8gY29uc3QgbW9kZSA9IGdldEJ5dGUoc2V0LCAwKQogICAgZnJhbWVfZGlnIC0xCiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Ynl0ZQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjcyNgogICAgLy8gaWYgKG1vZGUgPT09IFdyaXRlclNldEFsbG93KSByZXR1cm4gMiArIDMyICogZ2V0Qnl0ZShzZXQsIDEpCiAgICBpbnRjXzIgLy8gMgogICAgPT0KICAgIGJ6IHdyaXRlclNldExlbmd0aF9hZnRlcl9pZl9lbHNlQDIKICAgIGZyYW1lX2RpZyAtMQogICAgaW50Y18xIC8vIDEKICAgIGdldGJ5dGUKICAgIHB1c2hpbnQgMzIKICAgICoKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBzd2FwCiAgICByZXRzdWIKCndyaXRlclNldExlbmd0aF9hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjcyNwogICAgLy8gaWYgKG1vZGUgPT09IFdyaXRlclNldERlbGVnYXRlKSByZXR1cm4gOQogICAgZHVwCiAgICBwdXNoaW50IDMKICAgID09CiAgICBieiB3cml0ZXJTZXRMZW5ndGhfYWZ0ZXJfaWZfZWxzZUA0CiAgICBwdXNoaW50IDkKICAgIHN3YXAKICAgIHJldHN1YgoKd3JpdGVyU2V0TGVuZ3RoX2FmdGVyX2lmX2Vsc2VANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzI4CiAgICAvLyBpZiAobW9kZSA9PT0gV3JpdGVyU2V0TWV0YSkgcmV0dXJuIDMzCiAgICBwdXNoaW50IDQKICAgID09CiAgICBieiB3cml0ZXJTZXRMZW5ndGhfYWZ0ZXJfaWZfZWxzZUA2CiAgICBwdXNoaW50IDMzCiAgICByZXRzdWIKCndyaXRlclNldExlbmd0aF9hZnRlcl9pZl9lbHNlQDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjcyOQogICAgLy8gcmV0dXJuIDEKICAgIGludGNfMSAvLyAxCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMuYWRtaXRzTG9jYWxseShzZXQ6IGJ5dGVzLCB3cml0ZXI6IGJ5dGVzKSAtPiB1aW50NjQ6CmFkbWl0c0xvY2FsbHk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjczMwogICAgLy8gcHJpdmF0ZSBhZG1pdHNMb2NhbGx5KHNldDogYnl0ZXMsIHdyaXRlcjogQWNjb3VudCk6IGJvb2xlYW4gewogICAgcHJvdG8gMiAxCiAgICBieXRlY18wIC8vICIiCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzM0CiAgICAvLyBjb25zdCBtb2RlID0gZ2V0Qnl0ZShzZXQsIDApCiAgICBmcmFtZV9kaWcgLTIKICAgIGludGNfMCAvLyAwCiAgICBnZXRieXRlCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzM1CiAgICAvLyBpZiAobW9kZSA9PT0gV3JpdGVyU2V0T3BlbikgcmV0dXJuIHRydWUKICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYnogYWRtaXRzTG9jYWxseV9hZnRlcl9pZl9lbHNlQDIKICAgIGludGNfMSAvLyAxCiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKYWRtaXRzTG9jYWxseV9hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjczNgogICAgLy8gaWYgKG1vZGUgPT09IFdyaXRlclNldEFsbG93KSB7CiAgICBpbnRjXzIgLy8gMgogICAgPT0KICAgIGJ6IGFkbWl0c0xvY2FsbHlfYWZ0ZXJfaWZfZWxzZUA5CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjczNwogICAgLy8gY29uc3QgbiA9IGdldEJ5dGUoc2V0LCAxKQogICAgZnJhbWVfZGlnIC0yCiAgICBpbnRjXzEgLy8gMQogICAgZ2V0Ynl0ZQogICAgZnJhbWVfYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjczOAogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IG47IGkgKz0gMSkgewogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2J1cnkgMAoKYWRtaXRzTG9jYWxseV93aGlsZV90b3BANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzM4CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgbjsgaSArPSAxKSB7CiAgICBmcmFtZV9kaWcgMAogICAgZnJhbWVfZGlnIDEKICAgIDwKICAgIGJ6IGFkbWl0c0xvY2FsbHlfYWZ0ZXJfaWZfZWxzZUA5CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjczOQogICAgLy8gaWYgKHNldC5zbGljZSgyICsgMzIgKiBpLCAzNCArIDMyICogaSkgPT09IHdyaXRlci5ieXRlcykgcmV0dXJuIHRydWUKICAgIGZyYW1lX2RpZyAtMgogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICBmcmFtZV9kaWcgMAogICAgKgogICAgaW50Y18yIC8vIDIKICAgIGRpZyAxCiAgICArCiAgICBkdXAKICAgIGRpZyAzCiAgICA+PQogICAgZGlnIDMKICAgIHN3YXAKICAgIHNlbGVjdAogICAgcHVzaGludCAzNAogICAgdW5jb3ZlciAyCiAgICArCiAgICBkdXAKICAgIGRpZyAzCiAgICA+PQogICAgc3dhcAogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgZHVwCiAgICBkaWcgMgogICAgPAogICAgZGlnIDIKICAgIHN3YXAKICAgIHNlbGVjdAogICAgZnJhbWVfZGlnIC0yCiAgICBjb3ZlciAyCiAgICBzdWJzdHJpbmczCiAgICBmcmFtZV9kaWcgLTEKICAgID09CiAgICBieiBhZG1pdHNMb2NhbGx5X2FmdGVyX2lmX2Vsc2VANwogICAgaW50Y18xIC8vIDEKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgphZG1pdHNMb2NhbGx5X2FmdGVyX2lmX2Vsc2VANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzM4CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgbjsgaSArPSAxKSB7CiAgICBmcmFtZV9kaWcgMAogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGZyYW1lX2J1cnkgMAogICAgYiBhZG1pdHNMb2NhbGx5X3doaWxlX3RvcEA0CgphZG1pdHNMb2NhbGx5X2FmdGVyX2lmX2Vsc2VAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzQyCiAgICAvLyByZXR1cm4gZmFsc2UKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy5hZG1pdHNCeU1ldGEoc2V0OiBieXRlcywgdGFnOiBieXRlcywgYm94TmFtZTogYnl0ZXMsIHdyaXRlcjogYnl0ZXMsIHByb29mOiBieXRlcykgLT4gdWludDY0LCBieXRlczoKYWRtaXRzQnlNZXRhOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo3NDUKICAgIC8vIHByaXZhdGUgYWRtaXRzQnlNZXRhKHNldDogYnl0ZXMsIHRhZzogc3RyaW5nLCBib3hOYW1lOiBieXRlcywgd3JpdGVyOiBBY2NvdW50LCBwcm9vZjogYnl0ZXM8MzI+W10pOiBib29sZWFuIHsKICAgIHByb3RvIDUgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo3NDYKICAgIC8vIGlmIChnZXRCeXRlKHNldCwgMCkgIT09IFdyaXRlclNldE1ldGEgfHwgYm94TmFtZS5sZW5ndGggPT09IDApIHJldHVybiBmYWxzZQogICAgZnJhbWVfZGlnIC01CiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Ynl0ZQogICAgcHVzaGludCA0CiAgICAhPQogICAgYm56IGFkbWl0c0J5TWV0YV9pZl9ib2R5QDIKICAgIGZyYW1lX2RpZyAtMwogICAgbGVuCiAgICBibnogYWRtaXRzQnlNZXRhX2FmdGVyX2lmX2Vsc2VAMwoKYWRtaXRzQnlNZXRhX2lmX2JvZHlAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzQ2CiAgICAvLyBpZiAoZ2V0Qnl0ZShzZXQsIDApICE9PSBXcml0ZXJTZXRNZXRhIHx8IGJveE5hbWUubGVuZ3RoID09PSAwKSByZXR1cm4gZmFsc2UKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9kaWcgLTEKICAgIHJldHN1YgoKYWRtaXRzQnlNZXRhX2FmdGVyX2lmX2Vsc2VAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzQ3LTc1MQogICAgLy8gcmV0dXJuIGFiaUNhbGw8dHlwZW9mIE1ldGEucHJvdG90eXBlLnZlcmlmeT4oewogICAgLy8gICBhcHBJZDogdGhpcy5tZXRhQXBwLnZhbHVlLAogICAgLy8gICBhcmdzOiBbR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIHRoaXMubWV0YVJvb3ROYW1lKHRhZywgYm94TmFtZSksIHNoYTI1NihzaGEyNTYod3JpdGVyLmJ5dGVzKSksIHByb29mLCB0aGlzLm1ldGFUcmVlVHlwZS52YWx1ZV0sCiAgICAvLyAgIGZlZTogMCwKICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc0OQogICAgLy8gYXJnczogW0dsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCB0aGlzLm1ldGFSb290TmFtZSh0YWcsIGJveE5hbWUpLCBzaGEyNTYoc2hhMjU2KHdyaXRlci5ieXRlcykpLCBwcm9vZiwgdGhpcy5tZXRhVHJlZVR5cGUudmFsdWVdLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGZyYW1lX2RpZyAtNAogICAgZnJhbWVfZGlnIC0zCiAgICBjYWxsc3ViIG1ldGFSb290TmFtZQogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtMgogICAgc2hhMjU2CiAgICBzaGEyNTYKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjIxMAogICAgLy8gbWV0YVRyZWVUeXBlID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogR2xvYmFsU3RhdGVLZXlNZXRhVHJlZVR5cGUgfSkKICAgIGJ5dGVjIDE4IC8vICJ0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo3NDkKICAgIC8vIGFyZ3M6IFtHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgdGhpcy5tZXRhUm9vdE5hbWUodGFnLCBib3hOYW1lKSwgc2hhMjU2KHNoYTI1Nih3cml0ZXIuYnl0ZXMpKSwgcHJvb2YsIHRoaXMubWV0YVRyZWVUeXBlLnZhbHVlXSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc0OAogICAgLy8gYXBwSWQ6IHRoaXMubWV0YUFwcC52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjIwOAogICAgLy8gbWV0YUFwcCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5TWV0YUFwcCB9KQogICAgYnl0ZWMgMTcgLy8gImEiCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc0OAogICAgLy8gYXBwSWQ6IHRoaXMubWV0YUFwcC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzQ3LTc1MQogICAgLy8gcmV0dXJuIGFiaUNhbGw8dHlwZW9mIE1ldGEucHJvdG90eXBlLnZlcmlmeT4oewogICAgLy8gICBhcHBJZDogdGhpcy5tZXRhQXBwLnZhbHVlLAogICAgLy8gICBhcmdzOiBbR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIHRoaXMubWV0YVJvb3ROYW1lKHRhZywgYm94TmFtZSksIHNoYTI1NihzaGEyNTYod3JpdGVyLmJ5dGVzKSksIHByb29mLCB0aGlzLm1ldGFUcmVlVHlwZS52YWx1ZV0sCiAgICAvLyAgIGZlZTogMCwKICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBwdXNoYnl0ZXMgMHgyYmYzY2M1YSAvLyBtZXRob2QgInZlcmlmeShhZGRyZXNzLHN0cmluZyxieXRlWzMyXSxieXRlWzMyXVtdLHVpbnQ2NClib29sIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzUwCiAgICAvLyBmZWU6IDAsCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzQ3LTc1MQogICAgLy8gcmV0dXJuIGFiaUNhbGw8dHlwZW9mIE1ldGEucHJvdG90eXBlLnZlcmlmeT4oewogICAgLy8gICBhcHBJZDogdGhpcy5tZXRhQXBwLnZhbHVlLAogICAgLy8gICBhcmdzOiBbR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIHRoaXMubWV0YVJvb3ROYW1lKHRhZywgYm94TmFtZSksIHNoYTI1NihzaGEyNTYod3JpdGVyLmJ5dGVzKSksIHByb29mLCB0aGlzLm1ldGFUcmVlVHlwZS52YWx1ZV0sCiAgICAvLyAgIGZlZTogMCwKICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBzd2FwCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYm9vbAogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgZnJhbWVfZGlnIC0xCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMuYWRtaXRzQnlEZWxlZ2F0ZShzZXQ6IGJ5dGVzLCBhc3NldDogdWludDY0LCB3cml0ZXI6IGJ5dGVzLCBzbG90OiBieXRlcywgaG9sZGVyOiBieXRlcykgLT4gdWludDY0OgphZG1pdHNCeURlbGVnYXRlOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo3NTUKICAgIC8vIHByaXZhdGUgYWRtaXRzQnlEZWxlZ2F0ZShzZXQ6IGJ5dGVzLCBhc3NldDogdWludDY0LCB3cml0ZXI6IEFjY291bnQsIHNsb3Q6IGJ5dGVzLCBob2xkZXI6IEFjY291bnQpOiBib29sZWFuIHsKICAgIHByb3RvIDUgMQogICAgaW50Y18wIC8vIDAKICAgIGJ5dGVjXzAgLy8gIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzU2CiAgICAvLyBpZiAoZ2V0Qnl0ZShzZXQsIDApICE9PSBXcml0ZXJTZXREZWxlZ2F0ZSkgcmV0dXJuIGZhbHNlCiAgICBmcmFtZV9kaWcgLTUKICAgIGludGNfMCAvLyAwCiAgICBnZXRieXRlCiAgICBwdXNoaW50IDMKICAgICE9CiAgICBieiBhZG1pdHNCeURlbGVnYXRlX2FmdGVyX2lmX2Vsc2VAMgogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgphZG1pdHNCeURlbGVnYXRlX2FmdGVyX2lmX2Vsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzU3LTc2OQogICAgLy8gY29uc3QgY2FsbCA9IGl0eG4KICAgIC8vICAgLmFwcGxpY2F0aW9uQ2FsbCh7CiAgICAvLyAgICAgYXBwSWQ6IGJ0b2koc2V0LnNsaWNlKDEsIDkpKSwKICAgIC8vICAgICBhcHBBcmdzOiBbCiAgICAvLyAgICAgICBtZXRob2RTZWxlY3RvcihEZWxlZ2F0ZUFkbWl0KSwKICAgIC8vICAgICAgIGl0b2IoYXNzZXQpLAogICAgLy8gICAgICAgd3JpdGVyLmJ5dGVzLAogICAgLy8gICAgICAgaXRvYihzbG90Lmxlbmd0aCkuc2xpY2UoNiwgOCkuY29uY2F0KHNsb3QpLAogICAgLy8gICAgICAgaG9sZGVyLmJ5dGVzLAogICAgLy8gICAgIF0sCiAgICAvLyAgICAgZmVlOiAwLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzU5CiAgICAvLyBhcHBJZDogYnRvaShzZXQuc2xpY2UoMSwgOSkpLAogICAgZnJhbWVfZGlnIC01CiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICBkaWcgMQogICAgPj0KICAgIGludGNfMSAvLyAxCiAgICBkaWcgMgogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIHB1c2hpbnQgOQogICAgZGlnIDIKICAgID49CiAgICBwdXNoaW50IDkKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIGZyYW1lX2RpZyAtNQogICAgY292ZXIgMgogICAgc3Vic3RyaW5nMwogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo3NjIKICAgIC8vIGl0b2IoYXNzZXQpLAogICAgZnJhbWVfZGlnIC00CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc2NAogICAgLy8gaXRvYihzbG90Lmxlbmd0aCkuc2xpY2UoNiwgOCkuY29uY2F0KHNsb3QpLAogICAgZnJhbWVfZGlnIC0yCiAgICBsZW4KICAgIGl0b2IKICAgIHN1YnN0cmluZyA2IDgKICAgIGZyYW1lX2RpZyAtMgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc2MQogICAgLy8gbWV0aG9kU2VsZWN0b3IoRGVsZWdhdGVBZG1pdCksCiAgICBwdXNoYnl0ZXMgMHg3MTczNzY4MSAvLyBtZXRob2QgImFyY1RCRF9hZG1pdCh1aW50NjQsYWRkcmVzcyxieXRlW10sYWRkcmVzcylib29sIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC0xCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc1Ny03NjgKICAgIC8vIGNvbnN0IGNhbGwgPSBpdHhuCiAgICAvLyAgIC5hcHBsaWNhdGlvbkNhbGwoewogICAgLy8gICAgIGFwcElkOiBidG9pKHNldC5zbGljZSgxLCA5KSksCiAgICAvLyAgICAgYXBwQXJnczogWwogICAgLy8gICAgICAgbWV0aG9kU2VsZWN0b3IoRGVsZWdhdGVBZG1pdCksCiAgICAvLyAgICAgICBpdG9iKGFzc2V0KSwKICAgIC8vICAgICAgIHdyaXRlci5ieXRlcywKICAgIC8vICAgICAgIGl0b2Ioc2xvdC5sZW5ndGgpLnNsaWNlKDYsIDgpLmNvbmNhdChzbG90KSwKICAgIC8vICAgICAgIGhvbGRlci5ieXRlcywKICAgIC8vICAgICBdLAogICAgLy8gICAgIGZlZTogMCwKICAgIC8vICAgfSkKICAgIHB1c2hpbnQgNgogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo3NjcKICAgIC8vIGZlZTogMCwKICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo3NTctNzY5CiAgICAvLyBjb25zdCBjYWxsID0gaXR4bgogICAgLy8gICAuYXBwbGljYXRpb25DYWxsKHsKICAgIC8vICAgICBhcHBJZDogYnRvaShzZXQuc2xpY2UoMSwgOSkpLAogICAgLy8gICAgIGFwcEFyZ3M6IFsKICAgIC8vICAgICAgIG1ldGhvZFNlbGVjdG9yKERlbGVnYXRlQWRtaXQpLAogICAgLy8gICAgICAgaXRvYihhc3NldCksCiAgICAvLyAgICAgICB3cml0ZXIuYnl0ZXMsCiAgICAvLyAgICAgICBpdG9iKHNsb3QubGVuZ3RoKS5zbGljZSg2LCA4KS5jb25jYXQoc2xvdCksCiAgICAvLyAgICAgICBob2xkZXIuYnl0ZXMsCiAgICAvLyAgICAgXSwKICAgIC8vICAgICBmZWU6IDAsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzcxCiAgICAvLyByZXR1cm4gcmVzdWx0Lmxlbmd0aCA9PT0gNSAmJiByZXN1bHQuc2xpY2UoMCwgNCkgPT09IEFyYzRSZXR1cm5QcmVmaXggJiYgZ2V0Qnl0ZShyZXN1bHQsIDQpID09PSAweDgwCiAgICBsZW4KICAgIGR1cAogICAgZnJhbWVfYnVyeSAxCiAgICBwdXNoaW50IDUKICAgID09CiAgICBieiBhZG1pdHNCeURlbGVnYXRlX2Jvb2xfZmFsc2VANwogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2RpZyAxCiAgICBkdXAKICAgIGNvdmVyIDIKICAgID49CiAgICBpbnRjXzAgLy8gMAogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBwdXNoaW50IDQKICAgIGRpZyAyCiAgICA+PQogICAgcHVzaGludCA0CiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBmcmFtZV9kaWcgMAogICAgY292ZXIgMgogICAgc3Vic3RyaW5nMwogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYnogYWRtaXRzQnlEZWxlZ2F0ZV9ib29sX2ZhbHNlQDcKICAgIGZyYW1lX2RpZyAwCiAgICBwdXNoaW50IDQKICAgIGdldGJ5dGUKICAgIGludGMgNCAvLyAxMjgKICAgID09CiAgICBieiBhZG1pdHNCeURlbGVnYXRlX2Jvb2xfZmFsc2VANwogICAgaW50Y18xIC8vIDEKCmFkbWl0c0J5RGVsZWdhdGVfYm9vbF9tZXJnZUA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo3NzEKICAgIC8vIHJldHVybiByZXN1bHQubGVuZ3RoID09PSA1ICYmIHJlc3VsdC5zbGljZSgwLCA0KSA9PT0gQXJjNFJldHVyblByZWZpeCAmJiBnZXRCeXRlKHJlc3VsdCwgNCkgPT09IDB4ODAKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgphZG1pdHNCeURlbGVnYXRlX2Jvb2xfZmFsc2VANzoKICAgIGludGNfMCAvLyAwCiAgICBiIGFkbWl0c0J5RGVsZWdhdGVfYm9vbF9tZXJnZUA4CgoKLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo6Q29sbGVjdGlibGVWYXJpYXRpb25zLnBvbGljeUZsYWdzKG1hbmFnZXJXcml0ZXM6IHVpbnQ2NCwgaG9sZGVyUGluc0NvbGxlY3RpYmxlT25seTogdWludDY0KSAtPiB1aW50NjQ6CnBvbGljeUZsYWdzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo4MDMKICAgIC8vIHByaXZhdGUgcG9saWN5RmxhZ3MobWFuYWdlcldyaXRlczogYm9vbGVhbiwgaG9sZGVyUGluc0NvbGxlY3RpYmxlT25seTogYm9vbGVhbik6IHVpbnQ2NCB7CiAgICBwcm90byAyIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODA0CiAgICAvLyBsZXQgZmxhZ3M6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgwNQogICAgLy8gaWYgKG1hbmFnZXJXcml0ZXMpIGZsYWdzID0gZmxhZ3MgfCBQb2xpY3lNYW5hZ2VyV3JpdGVzCiAgICBmcmFtZV9kaWcgLTIKICAgIGJ6IHBvbGljeUZsYWdzX2FmdGVyX2lmX2Vsc2VAMgogICAgaW50Y18xIC8vIDEKICAgIGZyYW1lX2J1cnkgMAoKcG9saWN5RmxhZ3NfYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo4MDYKICAgIC8vIGlmIChob2xkZXJQaW5zQ29sbGVjdGlibGVPbmx5KSBmbGFncyA9IGZsYWdzIHwgUG9saWN5SG9sZGVyUGluc0NvbGxlY3RpYmxlT25seQogICAgZnJhbWVfZGlnIC0xCiAgICBieiBwb2xpY3lGbGFnc19hZnRlcl9pZl9lbHNlQDQKICAgIGZyYW1lX2RpZyAwCiAgICBpbnRjXzIgLy8gMgogICAgfAogICAgZnJhbWVfYnVyeSAwCgpwb2xpY3lGbGFnc19hZnRlcl9pZl9lbHNlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgwNwogICAgLy8gcmV0dXJuIGZsYWdzCiAgICBmcmFtZV9kaWcgMAogICAgc3dhcAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo6Q29sbGVjdGlibGVWYXJpYXRpb25zLnNldFBvbGljeShuYW1lOiBieXRlcywgY29sbGVjdGlibGU6IGJ5dGVzLCBob2xkZXI6IGJ5dGVzLCBmbGFnczogdWludDY0KSAtPiBieXRlczoKc2V0UG9saWN5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo4MTEKICAgIC8vIHByaXZhdGUgc2V0UG9saWN5KG5hbWU6IGJ5dGVzLCBjb2xsZWN0aWJsZTogYnl0ZXMsIGhvbGRlcjogYnl0ZXMsIGZsYWdzOiB1aW50NjQpOiBXcml0ZVJlc3VsdCB7CiAgICBwcm90byA0IDEKICAgIGJ5dGVjXzAgLy8gIiIKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo4MTIKICAgIC8vIGNvbnN0IHNldHMgPSB0aGlzLmNoZWNrV3JpdGVyU2V0KGNvbGxlY3RpYmxlKS5jb25jYXQodGhpcy5jaGVja1dyaXRlclNldChob2xkZXIpKQogICAgZnJhbWVfZGlnIC0zCiAgICBjYWxsc3ViIGNoZWNrV3JpdGVyU2V0CiAgICBmcmFtZV9kaWcgLTIKICAgIGNhbGxzdWIgY2hlY2tXcml0ZXJTZXQKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo4MTMKICAgIC8vIGNvbnN0IFtzdG9yZWQsIGV4aXN0c10gPSBvcC5Cb3guZ2V0KG5hbWUpCiAgICBmcmFtZV9kaWcgLTQKICAgIGJveF9nZXQKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgxNAogICAgLy8gaWYgKGV4aXN0cyAmJiBnZXRCeXRlKHN0b3JlZCwgUEZsYWdzKSA9PT0gZmxhZ3MgJiYgc3RvcmVkLnNsaWNlKFBTZXRzKSA9PT0gc2V0cykgewogICAgYnogc2V0UG9saWN5X2FmdGVyX2lmX2Vsc2VANAogICAgZHVwCiAgICBpbnRjXzEgLy8gMQogICAgZ2V0Ynl0ZQogICAgZnJhbWVfZGlnIC0xCiAgICA9PQogICAgYnogc2V0UG9saWN5X2FmdGVyX2lmX2Vsc2VANAogICAgZHVwbiAyCiAgICBsZW4KICAgIGR1cAogICAgZnJhbWVfYnVyeSAxCiAgICBwdXNoaW50IDEwCiAgICBkaWcgMQogICAgPj0KICAgIHB1c2hpbnQgMTAKICAgIGRpZyAyCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgZHVwCiAgICBmcmFtZV9idXJ5IDAKICAgIHN3YXAKICAgIHN1YnN0cmluZzMKICAgIGRpZyAzCiAgICA9PQogICAgYnogc2V0UG9saWN5X2FmdGVyX2lmX2Vsc2VANAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo4MTUKICAgIC8vIHRoaXMuZXhwZWN0Tm9QYXltZW50KCkKICAgIGNhbGxzdWIgZXhwZWN0Tm9QYXltZW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgxNgogICAgLy8gcmV0dXJuIHsgcmV2aXNpb246IGJ0b2koc3RvcmVkLnNsaWNlKFBSZXZpc2lvbiwgUFJldmlzaW9uICsgOCkpLCBjaGFuZ2VkOiBmYWxzZSwgbWJyOiB0aGlzLm1ick5vbmUoKSB9CiAgICBpbnRjXzIgLy8gMgogICAgZnJhbWVfZGlnIDEKICAgIGR1cAogICAgY292ZXIgMgogICAgPj0KICAgIGludGNfMiAvLyAyCiAgICBjb3ZlciAyCiAgICBzZWxlY3QKICAgIGZyYW1lX2RpZyAwCiAgICBzdWJzdHJpbmczCiAgICBidG9pCiAgICBpdG9iCiAgICBieXRlY18yIC8vIDB4MDAwMDAwMDAwMDAwMDAwMDAwMDAKICAgIGNvbmNhdAogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCnNldFBvbGljeV9hZnRlcl9pZl9lbHNlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgxOAogICAgLy8gbG9nZ2VkQXNzZXJ0KCFleGlzdHMgfHwgKGdldEJ5dGUoc3RvcmVkLCBQRmxhZ3MpICYgUG9saWN5TG9ja2VkKSA9PT0gMCwgZXJyTG9ja2VkKQogICAgZGlnIDEKICAgIGJ6IHNldFBvbGljeV9ib29sX3RydWVANgogICAgZHVwCiAgICBpbnRjXzEgLy8gMQogICAgZ2V0Ynl0ZQogICAgaW50YyA0IC8vIDEyOAogICAgJgogICAgYm56IHNldFBvbGljeV9ib29sX2ZhbHNlQDcKCnNldFBvbGljeV9ib29sX3RydWVANjoKICAgIGludGNfMSAvLyAxCgpzZXRQb2xpY3lfYm9vbF9tZXJnZUA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo4MTgKICAgIC8vIGxvZ2dlZEFzc2VydCghZXhpc3RzIHx8IChnZXRCeXRlKHN0b3JlZCwgUEZsYWdzKSAmIFBvbGljeUxvY2tlZCkgPT09IDAsIGVyckxvY2tlZCkKICAgIGJueiBzZXRQb2xpY3lfYWZ0ZXJfYXNzZXJ0QDEwCiAgICBieXRlYyAxMCAvLyAiRVJSOmVyckN2TGsiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQ3ZMawoKc2V0UG9saWN5X2FmdGVyX2Fzc2VydEAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTEwOAogICAgLy8gcmV0dXJuIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLm1pbkJhbGFuY2UKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdE1pbkJhbGFuY2UKICAgIHN3YXAKICAgIGNvdmVyIDIKICAgIGFzc2VydCAvLyBhY2NvdW50IGZ1bmRlZAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo4MjEKICAgIC8vIGNvbnN0IG9sZCA9IGV4aXN0cyA/IHRoaXMucG9saWN5U2V0cyhzdG9yZWQpIDogKFtCeXRlcy5mcm9tSGV4KCcwMCcpLCBCeXRlcy5mcm9tSGV4KCcwMCcpXSBhcyBbYnl0ZXMsIGJ5dGVzXSkKICAgIHVuY292ZXIgMgogICAgYnogc2V0UG9saWN5X3Rlcm5hcnlfZmFsc2VAMTIKICAgIGNhbGxzdWIgcG9saWN5U2V0cwoKc2V0UG9saWN5X3Rlcm5hcnlfbWVyZ2VAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgyMgogICAgLy8gY29uc3QgbmV4dCA9IHRoaXMucG9saWN5U2V0cyhCeXRlcy5mcm9tSGV4KCcwMScpLmNvbmNhdChCeXRlcy5mcm9tSGV4KCcwMCcpKS5jb25jYXQoaXRvYigwKSkuY29uY2F0KHNldHMpKQogICAgcHVzaGJ5dGVzIDB4MDEwMDAwMDAwMDAwMDAwMDAwMDAKICAgIHVuY292ZXIgMwogICAgZHVwCiAgICBjb3ZlciAyCiAgICBjb25jYXQKICAgIGNhbGxzdWIgcG9saWN5U2V0cwogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo4MjMKICAgIC8vIGNvbnN0IGZpcnN0ID0gdGhpcy5zeW5jTWV0YVJvb3QoTWV0YVRhZ0NvbGxlY3RpYmxlLCBuYW1lLCBvbGRbMF0sIG5leHRbMF0pCiAgICB1bmNvdmVyIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMQogICAgaW50Y18yIC8vIDIKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMgogICAgdW5jb3ZlciAyCiAgICBkaWcgMgogICAgc3Vic3RyaW5nMwogICAgZXh0cmFjdCAyIDAKICAgIGRpZyAzCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyA0CiAgICBpbnRjXzIgLy8gMgogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyA1CiAgICB1bmNvdmVyIDIKICAgIGRpZyAyCiAgICBzdWJzdHJpbmczCiAgICBleHRyYWN0IDIgMAogICAgYnl0ZWMgMjEgLy8gImMiCiAgICBmcmFtZV9kaWcgLTQKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciAzCiAgICBjYWxsc3ViIHN5bmNNZXRhUm9vdAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo4MjQKICAgIC8vIGNvbnN0IHNlY29uZCA9IHRoaXMuc3luY01ldGFSb290KE1ldGFUYWdIb2xkZXIsIG5hbWUsIG9sZFsxXSwgbmV4dFsxXSkKICAgIGRpZyAzCiAgICBsZW4KICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciA0CiAgICB1bmNvdmVyIDIKICAgIHN1YnN0cmluZzMKICAgIGV4dHJhY3QgMiAwCiAgICBkaWcgMwogICAgbGVuCiAgICB1bmNvdmVyIDQKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciAyCiAgICBzdWJzdHJpbmczCiAgICBleHRyYWN0IDIgMAogICAgYnl0ZWMgMjAgLy8gImgiCiAgICBmcmFtZV9kaWcgLTQKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAzCiAgICBjYWxsc3ViIHN5bmNNZXRhUm9vdAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo4MjUKICAgIC8vIGNvbnN0IHJldmlzaW9uID0gdGhpcy5uZXh0UmV2aXNpb24oKQogICAgY2FsbHN1YiBuZXh0UmV2aXNpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODI2CiAgICAvLyBjb25zdCB2YWx1ZSA9IEJ5dGVzLmZyb21IZXgoJzAxJykuY29uY2F0KGl0b2IoZmxhZ3MpLnNsaWNlKDcsIDgpKS5jb25jYXQoaXRvYihyZXZpc2lvbikpLmNvbmNhdChzZXRzKQogICAgZnJhbWVfZGlnIC0xCiAgICBpdG9iCiAgICBzdWJzdHJpbmcgNyA4CiAgICBieXRlYyA4IC8vIDB4MDEKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXRvYgogICAgc3dhcAogICAgZGlnIDEKICAgIGNvbmNhdAogICAgdW5jb3ZlciA0CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODI3CiAgICAvLyB0aGlzLnB1dEJveChuYW1lLCB2YWx1ZSkKICAgIGZyYW1lX2RpZyAtNAogICAgc3dhcAogICAgY2FsbHN1YiBwdXRCb3gKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODI4CiAgICAvLyBjb25zdCBtYnIgPSB0aGlzLnNldHRsZShiZWZvcmUsIHsgcGFpZDogZmlyc3QucGFpZCArIHNlY29uZC5wYWlkLCByZWZ1bmRlZDogZmlyc3QucmVmdW5kZWQgKyBzZWNvbmQucmVmdW5kZWQgfSwgVHhuLnNlbmRlcikKICAgIGRpZyAyCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGRpZyAyCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgICsKICAgIHVuY292ZXIgMwogICAgaW50Y18zIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICB1bmNvdmVyIDMKICAgIGludGNfMyAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgKwogICAgc3dhcAogICAgaXRvYgogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICB0eG4gU2VuZGVyCiAgICB1bmNvdmVyIDMKICAgIGNvdmVyIDIKICAgIGNhbGxzdWIgc2V0dGxlCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODI5CiAgICAvLyByZXR1cm4geyByZXZpc2lvbiwgY2hhbmdlZDogdHJ1ZSwgbWJyIH0KICAgIHN3YXAKICAgIGJ5dGVjXzMgLy8gMHg4MAogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpzZXRQb2xpY3lfdGVybmFyeV9mYWxzZUAxMjoKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo4MjEKICAgIC8vIGNvbnN0IG9sZCA9IGV4aXN0cyA/IHRoaXMucG9saWN5U2V0cyhzdG9yZWQpIDogKFtCeXRlcy5mcm9tSGV4KCcwMCcpLCBCeXRlcy5mcm9tSGV4KCcwMCcpXSBhcyBbYnl0ZXMsIGJ5dGVzXSkKICAgIHB1c2hieXRlcyAweDAwMDQwMDA3MDAwMTAwMDAwMTAwCiAgICBiIHNldFBvbGljeV90ZXJuYXJ5X21lcmdlQDEzCgpzZXRQb2xpY3lfYm9vbF9mYWxzZUA3OgogICAgaW50Y18wIC8vIDAKICAgIGIgc2V0UG9saWN5X2Jvb2xfbWVyZ2VAOAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy5kZWxldGVQb2xpY3kobmFtZTogYnl0ZXMsIG93bmVyOiBieXRlcywgcmVhc29uOiB1aW50NjQsIHJlcXVpcmVVbmxvY2tlZDogdWludDY0KSAtPiBieXRlczoKZGVsZXRlUG9saWN5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo4MzMKICAgIC8vIHByaXZhdGUgZGVsZXRlUG9saWN5KG5hbWU6IGJ5dGVzLCBvd25lcjogQWNjb3VudCwgcmVhc29uOiB1aW50NjQsIHJlcXVpcmVVbmxvY2tlZDogYm9vbGVhbik6IFJlbW92ZVJlc3VsdCB7CiAgICBwcm90byA0IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODM0CiAgICAvLyBjb25zdCBbc3RvcmVkLCBleGlzdHNdID0gb3AuQm94LmdldChuYW1lKQogICAgZnJhbWVfZGlnIC00CiAgICBib3hfZ2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgzNQogICAgLy8gaWYgKCFleGlzdHMpIHsKICAgIGJueiBkZWxldGVQb2xpY3lfYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgzNgogICAgLy8gdGhpcy5leHBlY3ROb1BheW1lbnQoKQogICAgY2FsbHN1YiBleHBlY3ROb1BheW1lbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODM3CiAgICAvLyByZXR1cm4geyByZW1vdmVkOiBmYWxzZSwgcmVhc29uOiBuZXcgVWludDgoUmVtb3ZlZE5vbmUpLCByZWZ1bmQ6IDAgfQogICAgYnl0ZWNfMiAvLyAweDAwMDAwMDAwMDAwMDAwMDAwMDAwCiAgICBzd2FwCiAgICByZXRzdWIKCmRlbGV0ZVBvbGljeV9hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgzOQogICAgLy8gaWYgKHJlcXVpcmVVbmxvY2tlZCkgbG9nZ2VkQXNzZXJ0KChnZXRCeXRlKHN0b3JlZCwgUEZsYWdzKSAmIFBvbGljeUxvY2tlZCkgPT09IDAsIGVyckxvY2tlZCkKICAgIGZyYW1lX2RpZyAtMQogICAgYnogZGVsZXRlUG9saWN5X2FmdGVyX2lmX2Vsc2VANgogICAgZHVwCiAgICBpbnRjXzEgLy8gMQogICAgZ2V0Ynl0ZQogICAgaW50YyA0IC8vIDEyOAogICAgJgogICAgYnogZGVsZXRlUG9saWN5X2FmdGVyX2lmX2Vsc2VANgogICAgYnl0ZWMgMTAgLy8gIkVSUjplcnJDdkxrIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckN2TGsKCmRlbGV0ZVBvbGljeV9hZnRlcl9pZl9lbHNlQDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMDgKICAgIC8vIHJldHVybiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcy5taW5CYWxhbmNlCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RNaW5CYWxhbmNlCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODQxCiAgICAvLyBjb25zdCBmbG93ID0gdGhpcy5kcm9wUG9saWN5Um9vdHMobmFtZSwgc3RvcmVkKQogICAgZnJhbWVfZGlnIC00CiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgZHJvcFBvbGljeVJvb3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg0MgogICAgLy8gb3AuQm94LmRlbGV0ZShuYW1lKQogICAgZnJhbWVfZGlnIC00CiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODQzCiAgICAvLyBjb25zdCBtYnIgPSB0aGlzLnNldHRsZShiZWZvcmUsIGZsb3csIG93bmVyKQogICAgZnJhbWVfZGlnIC0zCiAgICBjYWxsc3ViIHNldHRsZQogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg0NAogICAgLy8gcmV0dXJuIHsgcmVtb3ZlZDogdHJ1ZSwgcmVhc29uOiBuZXcgVWludDgocmVhc29uKSwgcmVmdW5kOiBtYnIuYW1vdW50IH0KICAgIGZyYW1lX2RpZyAtMgogICAgaXRvYgogICAgZHVwCiAgICBiaXRsZW4KICAgIGludGNfMyAvLyA4CiAgICA8PQogICAgYXNzZXJ0IC8vIG92ZXJmbG93CiAgICBleHRyYWN0IDcgMQogICAgc3dhcAogICAgZXh0cmFjdCAxIDgKICAgIGJ5dGVjXzMgLy8gMHg4MAogICAgdW5jb3ZlciAyCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo6Q29sbGVjdGlibGVWYXJpYXRpb25zLmRyb3BQb2xpY3lSb290cyhuYW1lOiBieXRlcywgc3RvcmVkOiBieXRlcykgLT4gYnl0ZXM6CmRyb3BQb2xpY3lSb290czoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODQ3CiAgICAvLyBwcml2YXRlIGRyb3BQb2xpY3lSb290cyhuYW1lOiBieXRlcywgc3RvcmVkOiBieXRlcyk6IE1ldGFGbG93IHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo4NDgKICAgIC8vIGNvbnN0IFtjb2xsZWN0aWJsZSwgaG9sZGVyXSA9IHRoaXMucG9saWN5U2V0cyhzdG9yZWQpCiAgICBmcmFtZV9kaWcgLTEKICAgIGNhbGxzdWIgcG9saWN5U2V0cwogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyAxCiAgICBpbnRjXzIgLy8gMgogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyAyCiAgICB1bmNvdmVyIDIKICAgIGRpZyAyCiAgICBzdWJzdHJpbmczCiAgICBleHRyYWN0IDIgMAogICAgZGlnIDIKICAgIGxlbgogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMgogICAgc3Vic3RyaW5nMwogICAgZXh0cmFjdCAyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODQ5CiAgICAvLyBjb25zdCBmaXJzdCA9IHRoaXMuc3luY01ldGFSb290KE1ldGFUYWdDb2xsZWN0aWJsZSwgbmFtZSwgY29sbGVjdGlibGUsIEJ5dGVzLmZyb21IZXgoJzAwJykpCiAgICBieXRlYyAyMSAvLyAiYyIKICAgIGZyYW1lX2RpZyAtMgogICAgdW5jb3ZlciAzCiAgICBieXRlYyA0IC8vIDB4MDAKICAgIGNhbGxzdWIgc3luY01ldGFSb290CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg1MAogICAgLy8gY29uc3Qgc2Vjb25kID0gdGhpcy5zeW5jTWV0YVJvb3QoTWV0YVRhZ0hvbGRlciwgbmFtZSwgaG9sZGVyLCBCeXRlcy5mcm9tSGV4KCcwMCcpKQogICAgYnl0ZWMgMjAgLy8gImgiCiAgICBmcmFtZV9kaWcgLTIKICAgIHVuY292ZXIgMwogICAgYnl0ZWMgNCAvLyAweDAwCiAgICBjYWxsc3ViIHN5bmNNZXRhUm9vdAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo4NTEKICAgIC8vIHJldHVybiB7IHBhaWQ6IGZpcnN0LnBhaWQgKyBzZWNvbmQucGFpZCwgcmVmdW5kZWQ6IGZpcnN0LnJlZnVuZGVkICsgc2Vjb25kLnJlZnVuZGVkIH0KICAgIGRpZyAxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGRpZyAxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgICsKICAgIHVuY292ZXIgMgogICAgaW50Y18zIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICB1bmNvdmVyIDIKICAgIGludGNfMyAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgKwogICAgc3dhcAogICAgaXRvYgogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMuY2hlY2tXcml0ZXJTZXQoc2V0OiBieXRlcykgLT4gYnl0ZXM6CmNoZWNrV3JpdGVyU2V0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo4NTgKICAgIC8vIHByaXZhdGUgY2hlY2tXcml0ZXJTZXQoc2V0OiBieXRlcyk6IGJ5dGVzIHsKICAgIHByb3RvIDEgMQogICAgYnl0ZWNfMCAvLyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo4NTkKICAgIC8vIGxvZ2dlZEFzc2VydChzZXQubGVuZ3RoID49IDEsIGVyckJhZEFyZ3VtZW50KQogICAgZnJhbWVfZGlnIC0xCiAgICBsZW4KICAgIGR1cAogICAgYm56IGNoZWNrV3JpdGVyU2V0X2FmdGVyX2Fzc2VydEAyCiAgICBieXRlYyA2IC8vICJFUlI6ZXJyQ3ZCYSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJDdkJhCgpjaGVja1dyaXRlclNldF9hZnRlcl9hc3NlcnRAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODYwCiAgICAvLyBjb25zdCBtb2RlID0gZ2V0Qnl0ZShzZXQsIDApCiAgICBmcmFtZV9kaWcgLTEKICAgIGludGNfMCAvLyAwCiAgICBnZXRieXRlCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODYxCiAgICAvLyBsb2dnZWRBc3NlcnQobW9kZSA8PSBXcml0ZXJTZXRNZXRhLCBlcnJCYWRBcmd1bWVudCkKICAgIHB1c2hpbnQgNAogICAgPD0KICAgIGJueiBjaGVja1dyaXRlclNldF9hZnRlcl9hc3NlcnRANAogICAgYnl0ZWMgNiAvLyAiRVJSOmVyckN2QmEiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQ3ZCYQoKY2hlY2tXcml0ZXJTZXRfYWZ0ZXJfYXNzZXJ0QDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg2MgogICAgLy8gaWYgKG1vZGUgPT09IFdyaXRlclNldEFsbG93KSB7CiAgICBkdXAKICAgIGludGNfMiAvLyAyCiAgICA9PQogICAgYnogY2hlY2tXcml0ZXJTZXRfYWZ0ZXJfaWZfZWxzZUAxMwogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo4NjMKICAgIC8vIGxvZ2dlZEFzc2VydChzZXQubGVuZ3RoID49IDIgJiYgZ2V0Qnl0ZShzZXQsIDEpID49IDEgJiYgZ2V0Qnl0ZShzZXQsIDEpIDw9IE1heEFsbG93V3JpdGVycywgZXJyQmFkQXJndW1lbnQpCiAgICBmcmFtZV9kaWcgMQogICAgaW50Y18yIC8vIDIKICAgID49CiAgICBieiBjaGVja1dyaXRlclNldF9ib29sX2ZhbHNlQDkKICAgIGZyYW1lX2RpZyAtMQogICAgaW50Y18xIC8vIDEKICAgIGdldGJ5dGUKICAgIGR1cAogICAgZnJhbWVfYnVyeSAwCiAgICBieiBjaGVja1dyaXRlclNldF9ib29sX2ZhbHNlQDkKICAgIGZyYW1lX2RpZyAwCiAgICBpbnRjXzMgLy8gOAogICAgPD0KICAgIGJ6IGNoZWNrV3JpdGVyU2V0X2Jvb2xfZmFsc2VAOQogICAgaW50Y18xIC8vIDEKCmNoZWNrV3JpdGVyU2V0X2Jvb2xfbWVyZ2VAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg2MwogICAgLy8gbG9nZ2VkQXNzZXJ0KHNldC5sZW5ndGggPj0gMiAmJiBnZXRCeXRlKHNldCwgMSkgPj0gMSAmJiBnZXRCeXRlKHNldCwgMSkgPD0gTWF4QWxsb3dXcml0ZXJzLCBlcnJCYWRBcmd1bWVudCkKICAgIGJueiBjaGVja1dyaXRlclNldF9hZnRlcl9pZl9lbHNlQDEzCiAgICBieXRlYyA2IC8vICJFUlI6ZXJyQ3ZCYSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJDdkJhCgpjaGVja1dyaXRlclNldF9hZnRlcl9pZl9lbHNlQDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo4NjUKICAgIC8vIGxvZ2dlZEFzc2VydChzZXQubGVuZ3RoID09PSB0aGlzLndyaXRlclNldExlbmd0aChzZXQpLCBlcnJCYWRBcmd1bWVudCkKICAgIGZyYW1lX2RpZyAtMQogICAgY2FsbHN1YiB3cml0ZXJTZXRMZW5ndGgKICAgIGZyYW1lX2RpZyAxCiAgICA9PQogICAgYm56IGNoZWNrV3JpdGVyU2V0X2FmdGVyX2Fzc2VydEAxNQogICAgYnl0ZWMgNiAvLyAiRVJSOmVyckN2QmEiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQ3ZCYQoKY2hlY2tXcml0ZXJTZXRfYWZ0ZXJfYXNzZXJ0QDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo4NjYKICAgIC8vIGlmIChtb2RlID09PSBXcml0ZXJTZXREZWxlZ2F0ZSkgbG9nZ2VkQXNzZXJ0KGJ0b2koc2V0LnNsaWNlKDEsIDkpKSAhPT0gMCwgZXJyQmFkQXJndW1lbnQpCiAgICBkdXAKICAgIHB1c2hpbnQgMwogICAgPT0KICAgIGJ6IGNoZWNrV3JpdGVyU2V0X2FmdGVyX2lmX2Vsc2VAMTkKICAgIGludGNfMSAvLyAxCiAgICBmcmFtZV9kaWcgMQogICAgZHVwCiAgICBjb3ZlciAyCiAgICA+PQogICAgaW50Y18xIC8vIDEKICAgIGRpZyAyCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgcHVzaGludCA5CiAgICBkaWcgMgogICAgPj0KICAgIHB1c2hpbnQgOQogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgZnJhbWVfZGlnIC0xCiAgICBjb3ZlciAyCiAgICBzdWJzdHJpbmczCiAgICBidG9pCiAgICBibnogY2hlY2tXcml0ZXJTZXRfYWZ0ZXJfaWZfZWxzZUAxOQogICAgYnl0ZWMgNiAvLyAiRVJSOmVyckN2QmEiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQ3ZCYQoKY2hlY2tXcml0ZXJTZXRfYWZ0ZXJfaWZfZWxzZUAxOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODY3CiAgICAvLyBpZiAobW9kZSA9PT0gV3JpdGVyU2V0TWV0YSkgbG9nZ2VkQXNzZXJ0KHNldC5zbGljZSgxLCAzMykgIT09IG9wLmJ6ZXJvKDMyKSwgZXJyQmFkQXJndW1lbnQpCiAgICBwdXNoaW50IDQKICAgID09CiAgICBieiBjaGVja1dyaXRlclNldF9hZnRlcl9pZl9lbHNlQDIzCiAgICBpbnRjXzEgLy8gMQogICAgZnJhbWVfZGlnIDEKICAgIGR1cAogICAgY292ZXIgMgogICAgPj0KICAgIGludGNfMSAvLyAxCiAgICBkaWcgMgogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIHB1c2hpbnQgMzMKICAgIGRpZyAyCiAgICA+PQogICAgcHVzaGludCAzMwogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgZnJhbWVfZGlnIC0xCiAgICBjb3ZlciAyCiAgICBzdWJzdHJpbmczCiAgICBwdXNoaW50IDMyCiAgICBiemVybwogICAgIT0KICAgIGJueiBjaGVja1dyaXRlclNldF9hZnRlcl9pZl9lbHNlQDIzCiAgICBieXRlYyA2IC8vICJFUlI6ZXJyQ3ZCYSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJDdkJhCgpjaGVja1dyaXRlclNldF9hZnRlcl9pZl9lbHNlQDIzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo4NjgKICAgIC8vIHJldHVybiBzZXQKICAgIGZyYW1lX2RpZyAtMQogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCmNoZWNrV3JpdGVyU2V0X2Jvb2xfZmFsc2VAOToKICAgIGludGNfMCAvLyAwCiAgICBiIGNoZWNrV3JpdGVyU2V0X2Jvb2xfbWVyZ2VAMTAKCgovLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMubWV0YVJvb3ROYW1lKHRhZzogYnl0ZXMsIGJveE5hbWU6IGJ5dGVzKSAtPiBieXRlczoKbWV0YVJvb3ROYW1lOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo4NzQKICAgIC8vIHByaXZhdGUgbWV0YVJvb3ROYW1lKHRhZzogc3RyaW5nLCBib3hOYW1lOiBieXRlcyk6IHN0cmluZyB7CiAgICBwcm90byAyIDEKICAgIGJ5dGVjXzAgLy8gIiIKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo4NzUKICAgIC8vIGNvbnN0IGhhc2ggPSBzaGEyNTYoYm94TmFtZSkuc2xpY2UoMCwgTWV0YU5hbWVIYXNoQnl0ZXMpCiAgICBmcmFtZV9kaWcgLTEKICAgIHNoYTI1NgogICAgc3Vic3RyaW5nIDAgMTgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODc3CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgTWV0YU5hbWVIYXNoQnl0ZXM7IGkgKz0gMykgewogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2RpZyAtMgoKbWV0YVJvb3ROYW1lX3doaWxlX3RvcEAxOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo4NzcKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBNZXRhTmFtZUhhc2hCeXRlczsgaSArPSAzKSB7CiAgICBkaWcgMQogICAgcHVzaGludCAxOAogICAgPAogICAgYnogbWV0YVJvb3ROYW1lX2FmdGVyX3doaWxlQDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODc4CiAgICAvLyBjb25zdCBuID0gYnRvaShoYXNoLnNsaWNlKGksIGkgKyAzKSkKICAgIGRpZyAyCiAgICBkdXAKICAgIGxlbgogICAgdW5jb3ZlciAzCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGRpZyAxCiAgICA+PQogICAgZGlnIDIKICAgIGRpZyAyCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgdW5jb3ZlciAyCiAgICBwdXNoaW50IDMKICAgICsKICAgIGR1cAogICAgY292ZXIgNQogICAgZHVwCiAgICBkaWcgMwogICAgPj0KICAgIHN3YXAKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIGR1cAogICAgZGlnIDIKICAgIDwKICAgIGRpZyAyCiAgICBzd2FwCiAgICBzZWxlY3QKICAgIHN1YnN0cmluZzMKICAgIGJ0b2kKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo4NzkKICAgIC8vIGZvciAobGV0IHNoaWZ0OiB1aW50NjQgPSAyNDsgc2hpZnQgPiAwOyBzaGlmdCAtPSA2KSB7CiAgICBwdXNoaW50IDI0CiAgICBmcmFtZV9idXJ5IDEKCm1ldGFSb290TmFtZV93aGlsZV90b3BAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODc5CiAgICAvLyBmb3IgKGxldCBzaGlmdDogdWludDY0ID0gMjQ7IHNoaWZ0ID4gMDsgc2hpZnQgLT0gNikgewogICAgZnJhbWVfZGlnIDEKICAgIGJ6IG1ldGFSb290TmFtZV93aGlsZV90b3BAMQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo4ODAKICAgIC8vIGNvbnN0IGluZGV4OiB1aW50NjQgPSAobiA+PiAoc2hpZnQgLSA2KSkgJiA2MwogICAgZnJhbWVfZGlnIDEKICAgIHB1c2hpbnQgNgogICAgLQogICAgZHVwCiAgICBmcmFtZV9idXJ5IDEKICAgIGZyYW1lX2RpZyAwCiAgICBzd2FwCiAgICBzaHIKICAgIHB1c2hpbnQgNjMKICAgICYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODgxCiAgICAvLyBvdXQgPSBvdXQuY29uY2F0KEJhc2U2NFVybEFscGhhYmV0LnNsaWNlKGluZGV4LCBpbmRleCArIDEpKQogICAgZHVwCiAgICBwdXNoaW50IDY0CiAgICA+PQogICAgZGlnIDEKICAgIHB1c2hpbnQgNjQKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBzd2FwCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgZHVwCiAgICBwdXNoaW50IDY0CiAgICA+PQogICAgcHVzaGludCA2NAogICAgc3dhcAogICAgc2VsZWN0CiAgICBkdXAKICAgIGRpZyAyCiAgICA8CiAgICBkaWcgMgogICAgc3dhcAogICAgc2VsZWN0CiAgICBwdXNoYnl0ZXMgIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5LV8iCiAgICBjb3ZlciAyCiAgICBzdWJzdHJpbmczCiAgICBjb25jYXQKICAgIGIgbWV0YVJvb3ROYW1lX3doaWxlX3RvcEAzCgptZXRhUm9vdE5hbWVfYWZ0ZXJfd2hpbGVANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODg0CiAgICAvLyByZXR1cm4gU3RyaW5nKG91dCkKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo6Q29sbGVjdGlibGVWYXJpYXRpb25zLnN5bmNNZXRhUm9vdCh0YWc6IGJ5dGVzLCBib3hOYW1lOiBieXRlcywgYmVmb3JlOiBieXRlcywgYWZ0ZXI6IGJ5dGVzKSAtPiBieXRlczoKc3luY01ldGFSb290OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo4OTEKICAgIC8vIHByaXZhdGUgc3luY01ldGFSb290KHRhZzogc3RyaW5nLCBib3hOYW1lOiBieXRlcywgYmVmb3JlOiBieXRlcywgYWZ0ZXI6IGJ5dGVzKTogTWV0YUZsb3cgewogICAgcHJvdG8gNCAxCiAgICBpbnRjXzAgLy8gMAogICAgYnl0ZWNfMCAvLyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo4OTIKICAgIC8vIGNvbnN0IHdhc01ldGEgPSBnZXRCeXRlKGJlZm9yZSwgMCkgPT09IFdyaXRlclNldE1ldGEKICAgIGZyYW1lX2RpZyAtMgogICAgaW50Y18wIC8vIDAKICAgIGdldGJ5dGUKICAgIHB1c2hpbnQgNAogICAgPT0KICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo4OTMKICAgIC8vIGNvbnN0IGlzTWV0YSA9IGdldEJ5dGUoYWZ0ZXIsIDApID09PSBXcml0ZXJTZXRNZXRhCiAgICBmcmFtZV9kaWcgLTEKICAgIGludGNfMCAvLyAwCiAgICBnZXRieXRlCiAgICBwdXNoaW50IDQKICAgID09CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg5NAogICAgLy8gaWYgKCF3YXNNZXRhICYmICFpc01ldGEpIHJldHVybiB7IHBhaWQ6IDAsIHJlZnVuZGVkOiAwIH0KICAgIGJueiBzeW5jTWV0YVJvb3RfYWZ0ZXJfaWZfZWxzZUAzCiAgICBkdXAKICAgIGJueiBzeW5jTWV0YVJvb3RfYWZ0ZXJfaWZfZWxzZUAzCiAgICBieXRlYyAxOSAvLyAweDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwCiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKc3luY01ldGFSb290X2FmdGVyX2lmX2Vsc2VAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODk1CiAgICAvLyBjb25zdCBuYW1lID0gdGhpcy5tZXRhUm9vdE5hbWUodGFnLCBib3hOYW1lKQogICAgZnJhbWVfZGlnIC00CiAgICBmcmFtZV9kaWcgLTMKICAgIGNhbGxzdWIgbWV0YVJvb3ROYW1lCiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODk2CiAgICAvLyBjb25zdCBtZXRhID0gQXBwbGljYXRpb24odGhpcy5tZXRhQXBwLnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjA4CiAgICAvLyBtZXRhQXBwID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogR2xvYmFsU3RhdGVLZXlNZXRhQXBwIH0pCiAgICBieXRlYyAxNyAvLyAiYSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODk2CiAgICAvLyBjb25zdCBtZXRhID0gQXBwbGljYXRpb24odGhpcy5tZXRhQXBwLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGZyYW1lX2J1cnkgMQogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo4OTgKICAgIC8vIGlmICh3YXNNZXRhICYmIGlzTWV0YSkgewogICAgc3dhcAogICAgYnogc3luY01ldGFSb290X2FmdGVyX2lmX2Vsc2VAOQogICAgZHVwCiAgICBieiBzeW5jTWV0YVJvb3RfYWZ0ZXJfaWZfZWxzZUA5CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODk5CiAgICAvLyBpZiAoYmVmb3JlICE9PSBhZnRlcikgewogICAgZnJhbWVfZGlnIC0yCiAgICBmcmFtZV9kaWcgLTEKICAgICE9CiAgICBieiBzeW5jTWV0YVJvb3RfYWZ0ZXJfaWZfZWxzZUA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkwMC05MDQKICAgIC8vIGFiaUNhbGw8dHlwZW9mIE1ldGEucHJvdG90eXBlLnVwZGF0ZVJvb3Q+KHsKICAgIC8vICAgYXBwSWQ6IG1ldGEsCiAgICAvLyAgIGFyZ3M6IFtuYW1lLCBhZnRlci5zbGljZSgxLCAzMykudG9GaXhlZCh7IGxlbmd0aDogMzIgfSldLAogICAgLy8gICBmZWU6IDAsCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo5MDIKICAgIC8vIGFyZ3M6IFtuYW1lLCBhZnRlci5zbGljZSgxLCAzMykudG9GaXhlZCh7IGxlbmd0aDogMzIgfSldLAogICAgZnJhbWVfZGlnIDAKICAgIGR1cAogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgc3dhcAogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgLTEKICAgIGxlbgogICAgaW50Y18xIC8vIDEKICAgIGRpZyAxCiAgICA+PQogICAgaW50Y18xIC8vIDEKICAgIGRpZyAyCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgcHVzaGludCAzMwogICAgZGlnIDIKICAgID49CiAgICBwdXNoaW50IDMzCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBmcmFtZV9kaWcgLTEKICAgIGNvdmVyIDIKICAgIHN1YnN0cmluZzMKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIExlbmd0aCBtdXN0IGJlIDMyCiAgICBmcmFtZV9kaWcgMQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkwMC05MDQKICAgIC8vIGFiaUNhbGw8dHlwZW9mIE1ldGEucHJvdG90eXBlLnVwZGF0ZVJvb3Q+KHsKICAgIC8vICAgYXBwSWQ6IG1ldGEsCiAgICAvLyAgIGFyZ3M6IFtuYW1lLCBhZnRlci5zbGljZSgxLCAzMykudG9GaXhlZCh7IGxlbmd0aDogMzIgfSldLAogICAgLy8gICBmZWU6IDAsCiAgICAvLyB9KQogICAgcHVzaGJ5dGVzIDB4YzZkM2Q3MDQgLy8gbWV0aG9kICJ1cGRhdGVSb290KHN0cmluZyxieXRlWzMyXSl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTAzCiAgICAvLyBmZWU6IDAsCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTAwLTkwNAogICAgLy8gYWJpQ2FsbDx0eXBlb2YgTWV0YS5wcm90b3R5cGUudXBkYXRlUm9vdD4oewogICAgLy8gICBhcHBJZDogbWV0YSwKICAgIC8vICAgYXJnczogW25hbWUsIGFmdGVyLnNsaWNlKDEsIDMzKS50b0ZpeGVkKHsgbGVuZ3RoOiAzMiB9KV0sCiAgICAvLyAgIGZlZTogMCwKICAgIC8vIH0pCiAgICBpdHhuX3N1Ym1pdAoKc3luY01ldGFSb290X2FmdGVyX2lmX2Vsc2VAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTA2CiAgICAvLyByZXR1cm4geyBwYWlkOiAwLCByZWZ1bmRlZDogMCB9CiAgICBieXRlYyAxOSAvLyAweDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwCiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKc3luY01ldGFSb290X2FmdGVyX2lmX2Vsc2VAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTA4CiAgICAvLyBpZiAoaXNNZXRhKSB7CiAgICBieiBzeW5jTWV0YVJvb3RfYWZ0ZXJfaWZfZWxzZUAxNAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo5MDkKICAgIC8vIGNvbnN0IGNvc3QgPSBhYmlDYWxsPHR5cGVvZiBNZXRhLnByb3RvdHlwZS5yb290Q29zdHM+KHsgYXBwSWQ6IG1ldGEsIGFyZ3M6IFtuYW1lXSwgZmVlOiAwIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICBmcmFtZV9kaWcgMAogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAxCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgcHVzaGJ5dGVzIDB4NzJiMjU5ODEgLy8gbWV0aG9kICJyb290Q29zdHMoc3RyaW5nKXVpbnQ2NCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkdXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBzd2FwCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkxMC05MTkKICAgIC8vIGFiaUNhbGw8dHlwZW9mIE1ldGEucHJvdG90eXBlLmFkZFJvb3Q+KHsKICAgIC8vICAgYXBwSWQ6IG1ldGEsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoeyByZWNlaXZlcjogbWV0YS5hZGRyZXNzLCBhbW91bnQ6IGNvc3QsIGZlZTogMCB9KSwKICAgIC8vICAgICBuYW1lLAogICAgLy8gICAgIGFmdGVyLnNsaWNlKDEsIDMzKS50b0ZpeGVkKHsgbGVuZ3RoOiAzMiB9KSwKICAgIC8vICAgICB0aGlzLm1ldGFUcmVlVHlwZS52YWx1ZSwKICAgIC8vICAgXSwKICAgIC8vICAgZmVlOiAwLAogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTEzCiAgICAvLyBpdHhuLnBheW1lbnQoeyByZWNlaXZlcjogbWV0YS5hZGRyZXNzLCBhbW91bnQ6IGNvc3QsIGZlZTogMCB9KSwKICAgIGRpZyAyCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBkaWcgMQogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTEwLTkxOQogICAgLy8gYWJpQ2FsbDx0eXBlb2YgTWV0YS5wcm90b3R5cGUuYWRkUm9vdD4oewogICAgLy8gICBhcHBJZDogbWV0YSwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7IHJlY2VpdmVyOiBtZXRhLmFkZHJlc3MsIGFtb3VudDogY29zdCwgZmVlOiAwIH0pLAogICAgLy8gICAgIG5hbWUsCiAgICAvLyAgICAgYWZ0ZXIuc2xpY2UoMSwgMzMpLnRvRml4ZWQoeyBsZW5ndGg6IDMyIH0pLAogICAgLy8gICAgIHRoaXMubWV0YVRyZWVUeXBlLnZhbHVlLAogICAgLy8gICBdLAogICAgLy8gICBmZWU6IDAsCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkxNQogICAgLy8gYWZ0ZXIuc2xpY2UoMSwgMzMpLnRvRml4ZWQoeyBsZW5ndGg6IDMyIH0pLAogICAgZnJhbWVfZGlnIC0xCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICBkaWcgMQogICAgPj0KICAgIGludGNfMSAvLyAxCiAgICBkaWcgMgogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIHB1c2hpbnQgMzMKICAgIGRpZyAyCiAgICA+PQogICAgcHVzaGludCAzMwogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgZnJhbWVfZGlnIC0xCiAgICBjb3ZlciAyCiAgICBzdWJzdHJpbmczCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBMZW5ndGggbXVzdCBiZSAzMgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo5MTYKICAgIC8vIHRoaXMubWV0YVRyZWVUeXBlLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjEwCiAgICAvLyBtZXRhVHJlZVR5cGUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBHbG9iYWxTdGF0ZUtleU1ldGFUcmVlVHlwZSB9KQogICAgYnl0ZWMgMTggLy8gInQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkxNgogICAgLy8gdGhpcy5tZXRhVHJlZVR5cGUudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXRvYgogICAgdW5jb3ZlciA0CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTEwLTkxOQogICAgLy8gYWJpQ2FsbDx0eXBlb2YgTWV0YS5wcm90b3R5cGUuYWRkUm9vdD4oewogICAgLy8gICBhcHBJZDogbWV0YSwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7IHJlY2VpdmVyOiBtZXRhLmFkZHJlc3MsIGFtb3VudDogY29zdCwgZmVlOiAwIH0pLAogICAgLy8gICAgIG5hbWUsCiAgICAvLyAgICAgYWZ0ZXIuc2xpY2UoMSwgMzMpLnRvRml4ZWQoeyBsZW5ndGg6IDMyIH0pLAogICAgLy8gICAgIHRoaXMubWV0YVRyZWVUeXBlLnZhbHVlLAogICAgLy8gICBdLAogICAgLy8gICBmZWU6IDAsCiAgICAvLyB9KQogICAgcHVzaGJ5dGVzIDB4YTI0YzA2N2MgLy8gbWV0aG9kICJhZGRSb290KHBheSxzdHJpbmcsYnl0ZVszMl0sdWludDY0KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo5MTgKICAgIC8vIGZlZTogMCwKICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo5MTAtOTE5CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBNZXRhLnByb3RvdHlwZS5hZGRSb290Pih7CiAgICAvLyAgIGFwcElkOiBtZXRhLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsgcmVjZWl2ZXI6IG1ldGEuYWRkcmVzcywgYW1vdW50OiBjb3N0LCBmZWU6IDAgfSksCiAgICAvLyAgICAgbmFtZSwKICAgIC8vICAgICBhZnRlci5zbGljZSgxLCAzMykudG9GaXhlZCh7IGxlbmd0aDogMzIgfSksCiAgICAvLyAgICAgdGhpcy5tZXRhVHJlZVR5cGUudmFsdWUsCiAgICAvLyAgIF0sCiAgICAvLyAgIGZlZTogMCwKICAgIC8vIH0pCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo5MjAKICAgIC8vIHJldHVybiB7IHBhaWQ6IGNvc3QsIHJlZnVuZGVkOiAwIH0KICAgIGl0b2IKICAgIGludGNfMCAvLyAwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpzeW5jTWV0YVJvb3RfYWZ0ZXJfaWZfZWxzZUAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTIyCiAgICAvLyBjb25zdCBiYWxhbmNlQmVmb3JlID0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MuYmFsYW5jZQogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0QmFsYW5jZQogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkyMwogICAgLy8gYWJpQ2FsbDx0eXBlb2YgTWV0YS5wcm90b3R5cGUuZGVsZXRlUm9vdD4oeyBhcHBJZDogbWV0YSwgYXJnczogW25hbWVdLCBmZWU6IDAgfSkKICAgIGl0eG5fYmVnaW4KICAgIGZyYW1lX2RpZyAwCiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIDEKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgcHVzaGJ5dGVzIDB4ZGYyODdhN2QgLy8gbWV0aG9kICJkZWxldGVSb290KHN0cmluZyl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo5MjQKICAgIC8vIHJldHVybiB7IHBhaWQ6IDAsIHJlZnVuZGVkOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcy5iYWxhbmNlIC0gYmFsYW5jZUJlZm9yZSB9CiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RCYWxhbmNlCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIHN3YXAKICAgIC0KICAgIGludGNfMCAvLyAwCiAgICBpdG9iCiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo6Q29sbGVjdGlibGVWYXJpYXRpb25zLnBpblNvdXJjZShhc3NldDogdWludDY0LCB3cml0ZXI6IGJ5dGVzLCBzbG90OiBieXRlcywgc291cmNlUmV2aXNpb246IHVpbnQ2NCkgLT4gYnl0ZXM6CnBpblNvdXJjZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTI5CiAgICAvLyBwcml2YXRlIHBpblNvdXJjZShhc3NldDogdWludDY0LCB3cml0ZXI6IEFjY291bnQsIHNsb3Q6IGJ5dGVzLCBzb3VyY2VSZXZpc2lvbjogdWludDY0KTogYnl0ZXMgewogICAgcHJvdG8gNCAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNjAKICAgIC8vIHJldHVybiBQcmVmaXhWYXJpYXRpb24uY29uY2F0KGl0b2IoYXNzZXQpKS5jb25jYXQod3JpdGVyLmJ5dGVzKS5jb25jYXQoc2xvdCkKICAgIGZyYW1lX2RpZyAtNAogICAgaXRvYgogICAgYnl0ZWMgMTEgLy8gInYiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtMwogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgLTIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo5MzAKICAgIC8vIGNvbnN0IFtzb3VyY2UsIGV4aXN0c10gPSBvcC5Cb3guZ2V0KHRoaXMudmFyaWF0aW9uTmFtZShhc3NldCwgd3JpdGVyLCBzbG90KSkKICAgIGJveF9nZXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTMxCiAgICAvLyBsb2dnZWRBc3NlcnQoZXhpc3RzLCBlcnJTb3VyY2VNaXNzaW5nKQogICAgYm56IHBpblNvdXJjZV9hZnRlcl9hc3NlcnRAMgogICAgcHVzaGJ5dGVzICJFUlI6ZXJyQ3ZTbSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJDdlNtCgpwaW5Tb3VyY2VfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkzMgogICAgLy8gbG9nZ2VkQXNzZXJ0KGJ0b2koc291cmNlLnNsaWNlKFZSZXZpc2lvbiwgVlJldmlzaW9uICsgOCkpID09PSBzb3VyY2VSZXZpc2lvbiwgZXJyU291cmNlQ2hhbmdlZCkKICAgIGR1cG4gMgogICAgbGVuCiAgICBwdXNoaW50IDQKICAgIGRpZyAxCiAgICA+PQogICAgcHVzaGludCA0CiAgICBkaWcgMgogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIHB1c2hpbnQgMTIKICAgIGRpZyAyCiAgICA+PQogICAgcHVzaGludCAxMgogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgc3Vic3RyaW5nMwogICAgYnRvaQogICAgZnJhbWVfZGlnIC0xCiAgICA9PQogICAgYm56IHBpblNvdXJjZV9hZnRlcl9hc3NlcnRANAogICAgcHVzaGJ5dGVzICJFUlI6ZXJyQ3ZTYyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJDdlNjCgpwaW5Tb3VyY2VfYWZ0ZXJfYXNzZXJ0QDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkzMwogICAgLy8gbG9nZ2VkQXNzZXJ0KGV4dHJhY3RVaW50MTYoc291cmNlLCBWRmxhdExlbikgPiAwLCBlcnJTb3VyY2VOb3RBbGxvd2VkKQogICAgZHVwCiAgICBwdXNoaW50IDEyCiAgICBleHRyYWN0X3VpbnQxNgogICAgYm56IHBpblNvdXJjZV9hZnRlcl9hc3NlcnRANgogICAgYnl0ZWMgMTQgLy8gIkVSUjplcnJDdlNuIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckN2U24KCnBpblNvdXJjZV9hZnRlcl9hc3NlcnRANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTM0CiAgICAvLyByZXR1cm4gc291cmNlCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMuc291cmNlRmxhdChzb3VyY2U6IGJ5dGVzKSAtPiBieXRlczoKc291cmNlRmxhdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTM3CiAgICAvLyBwcml2YXRlIHNvdXJjZUZsYXQoc291cmNlOiBieXRlcyk6IGJ5dGVzIHsKICAgIHByb3RvIDEgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo5MzgKICAgIC8vIGNvbnN0IHN0YXJ0OiB1aW50NjQgPSAoZ2V0Qnl0ZShzb3VyY2UsIFZGbGFncykgJiBGbGFnSG9sZGVyU2NvcGUpICE9PSAwID8gVkZsYXRIb2xkZXIgOiBWRmxhdENvbGxlY3RpYmxlCiAgICBmcmFtZV9kaWcgLTEKICAgIGludGNfMSAvLyAxCiAgICBnZXRieXRlCiAgICBpbnRjXzEgLy8gMQogICAgJgogICAgcHVzaGludHMgMTQgNDcKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkzOQogICAgLy8gcmV0dXJuIHNvdXJjZS5zbGljZShzdGFydCwgc3RhcnQgKyBleHRyYWN0VWludDE2KHNvdXJjZSwgVkZsYXRMZW4pKQogICAgZnJhbWVfZGlnIC0xCiAgICBsZW4KICAgIGR1cDIKICAgID49CiAgICBkaWcgMgogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBmcmFtZV9kaWcgLTEKICAgIHB1c2hpbnQgMTIKICAgIGV4dHJhY3RfdWludDE2CiAgICB1bmNvdmVyIDMKICAgICsKICAgIGR1cAogICAgZGlnIDMKICAgID49CiAgICBzd2FwCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBkdXAKICAgIGRpZyAyCiAgICA8CiAgICBkaWcgMgogICAgc3dhcAogICAgc2VsZWN0CiAgICBmcmFtZV9kaWcgLTEKICAgIGNvdmVyIDIKICAgIHN1YnN0cmluZzMKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy5waW5Db3JlKHdyaXRlcjogYnl0ZXMsIHNsb3Q6IGJ5dGVzLCBzb3VyY2U6IGJ5dGVzKSAtPiBieXRlczoKcGluQ29yZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTQzCiAgICAvLyBwcml2YXRlIHBpbkNvcmUod3JpdGVyOiBBY2NvdW50LCBzbG90OiBieXRlcywgc291cmNlOiBieXRlcyk6IGJ5dGVzIHsKICAgIHByb3RvIDMgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo5NDUKICAgIC8vIC5jb25jYXQoaXRvYihzbG90Lmxlbmd0aCkuc2xpY2UoNywgOCkpCiAgICBmcmFtZV9kaWcgLTIKICAgIGxlbgogICAgZHVwCiAgICBpdG9iCiAgICBzdWJzdHJpbmcgNyA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk0NC05NDUKICAgIC8vIHJldHVybiB3cml0ZXIuYnl0ZXMKICAgIC8vICAgLmNvbmNhdChpdG9iKHNsb3QubGVuZ3RoKS5zbGljZSg3LCA4KSkKICAgIGZyYW1lX2RpZyAtMwogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk0NgogICAgLy8gLmNvbmNhdChzbG90LmNvbmNhdChvcC5iemVybyhNYXhTbG90Qnl0ZXMgLSBzbG90Lmxlbmd0aCkpKQogICAgcHVzaGludCAyMwogICAgdW5jb3ZlciAyCiAgICAtCiAgICBiemVybwogICAgZnJhbWVfZGlnIC0yCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTQ0LTk0NgogICAgLy8gcmV0dXJuIHdyaXRlci5ieXRlcwogICAgLy8gICAuY29uY2F0KGl0b2Ioc2xvdC5sZW5ndGgpLnNsaWNlKDcsIDgpKQogICAgLy8gICAuY29uY2F0KHNsb3QuY29uY2F0KG9wLmJ6ZXJvKE1heFNsb3RCeXRlcyAtIHNsb3QubGVuZ3RoKSkpCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTQ3CiAgICAvLyAuY29uY2F0KHNvdXJjZS5zbGljZShWUmV2aXNpb24sIFZSZXZpc2lvbiArIDgpKQogICAgZnJhbWVfZGlnIC0xCiAgICBsZW4KICAgIHB1c2hpbnQgNAogICAgZGlnIDEKICAgID49CiAgICBwdXNoaW50IDQKICAgIGRpZyAyCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgcHVzaGludCAxMgogICAgZGlnIDIKICAgID49CiAgICBwdXNoaW50IDEyCiAgICBkaWcgMwogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIGZyYW1lX2RpZyAtMQogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgc3Vic3RyaW5nMwogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo5NDQtOTQ3CiAgICAvLyByZXR1cm4gd3JpdGVyLmJ5dGVzCiAgICAvLyAgIC5jb25jYXQoaXRvYihzbG90Lmxlbmd0aCkuc2xpY2UoNywgOCkpCiAgICAvLyAgIC5jb25jYXQoc2xvdC5jb25jYXQob3AuYnplcm8oTWF4U2xvdEJ5dGVzIC0gc2xvdC5sZW5ndGgpKSkKICAgIC8vICAgLmNvbmNhdChzb3VyY2Uuc2xpY2UoVlJldmlzaW9uLCBWUmV2aXNpb24gKyA4KSkKICAgIHVuY292ZXIgMwogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk0OAogICAgLy8gLmNvbmNhdChzb3VyY2Uuc2xpY2UoVktpbmQsIFZLaW5kICsgMSkpCiAgICBpbnRjXzIgLy8gMgogICAgZGlnIDMKICAgID49CiAgICBpbnRjXzIgLy8gMgogICAgZGlnIDQKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBwdXNoaW50IDMKICAgIGRpZyA0CiAgICA+PQogICAgcHVzaGludCAzCiAgICB1bmNvdmVyIDUKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBmcmFtZV9kaWcgLTEKICAgIHVuY292ZXIgMgogICAgZGlnIDIKICAgIHN1YnN0cmluZzMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTQ0LTk0OAogICAgLy8gcmV0dXJuIHdyaXRlci5ieXRlcwogICAgLy8gICAuY29uY2F0KGl0b2Ioc2xvdC5sZW5ndGgpLnNsaWNlKDcsIDgpKQogICAgLy8gICAuY29uY2F0KHNsb3QuY29uY2F0KG9wLmJ6ZXJvKE1heFNsb3RCeXRlcyAtIHNsb3QubGVuZ3RoKSkpCiAgICAvLyAgIC5jb25jYXQoc291cmNlLnNsaWNlKFZSZXZpc2lvbiwgVlJldmlzaW9uICsgOCkpCiAgICAvLyAgIC5jb25jYXQoc291cmNlLnNsaWNlKFZLaW5kLCBWS2luZCArIDEpKQogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTQ5CiAgICAvLyAuY29uY2F0KHNvdXJjZS5zbGljZShWU3ViLCBWU3ViICsgMSkpCiAgICBmcmFtZV9kaWcgLTEKICAgIHVuY292ZXIgMgogICAgdW5jb3ZlciAzCiAgICBzdWJzdHJpbmczCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk0NC05NDkKICAgIC8vIHJldHVybiB3cml0ZXIuYnl0ZXMKICAgIC8vICAgLmNvbmNhdChpdG9iKHNsb3QubGVuZ3RoKS5zbGljZSg3LCA4KSkKICAgIC8vICAgLmNvbmNhdChzbG90LmNvbmNhdChvcC5iemVybyhNYXhTbG90Qnl0ZXMgLSBzbG90Lmxlbmd0aCkpKQogICAgLy8gICAuY29uY2F0KHNvdXJjZS5zbGljZShWUmV2aXNpb24sIFZSZXZpc2lvbiArIDgpKQogICAgLy8gICAuY29uY2F0KHNvdXJjZS5zbGljZShWS2luZCwgVktpbmQgKyAxKSkKICAgIC8vICAgLmNvbmNhdChzb3VyY2Uuc2xpY2UoVlN1YiwgVlN1YiArIDEpKQogICAgY29uY2F0CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMuc2VjdGlvbihtYWluOiBieXRlcywgcm9sZTogdWludDY0KSAtPiBieXRlczoKc2VjdGlvbjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTUyCiAgICAvLyBwcml2YXRlIHNlY3Rpb24obWFpbjogYnl0ZXMsIHJvbGU6IHVpbnQ2NCk6IGJ5dGVzIHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo5NTMKICAgIC8vIGNvbnN0IGNyZWF0b3JMZW4gPSBleHRyYWN0VWludDE2KG1haW4sIE1DcmVhdG9yTGVuKQogICAgZnJhbWVfZGlnIC0yCiAgICBwdXNoaW50IDExCiAgICBleHRyYWN0X3VpbnQxNgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo5NTQKICAgIC8vIGlmIChyb2xlID09PSBSb2xlQ3JlYXRvcikgcmV0dXJuIG1haW4uc2xpY2UoTVNlY3Rpb25zLCBNU2VjdGlvbnMgKyBjcmVhdG9yTGVuKQogICAgZnJhbWVfZGlnIC0xCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGJ6IHNlY3Rpb25fYWZ0ZXJfaWZfZWxzZUAyCiAgICBmcmFtZV9kaWcgLTIKICAgIGxlbgogICAgcHVzaGludCAzMQogICAgZGlnIDEKICAgID49CiAgICBwdXNoaW50IDMxCiAgICBkaWcgMgogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIHB1c2hpbnQgMzEKICAgIHVuY292ZXIgMwogICAgKwogICAgZHVwCiAgICBkaWcgMwogICAgPj0KICAgIHN3YXAKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIGR1cAogICAgZGlnIDIKICAgIDwKICAgIGRpZyAyCiAgICBzd2FwCiAgICBzZWxlY3QKICAgIGZyYW1lX2RpZyAtMgogICAgY292ZXIgMgogICAgc3Vic3RyaW5nMwogICAgcmV0c3ViCgpzZWN0aW9uX2FmdGVyX2lmX2Vsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTU1CiAgICAvLyByZXR1cm4gbWFpbi5zbGljZShNU2VjdGlvbnMgKyBjcmVhdG9yTGVuLCBNU2VjdGlvbnMgKyBjcmVhdG9yTGVuICsgZXh0cmFjdFVpbnQxNihtYWluLCBNSG9sZGVyTGVuKSkKICAgIGZyYW1lX2RpZyAtMgogICAgbGVuCiAgICBwdXNoaW50IDMxCiAgICB1bmNvdmVyIDIKICAgICsKICAgIGR1cAogICAgZGlnIDIKICAgID49CiAgICBkaWcgMQogICAgZGlnIDMKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBmcmFtZV9kaWcgLTIKICAgIHB1c2hpbnQgMTMKICAgIGV4dHJhY3RfdWludDE2CiAgICB1bmNvdmVyIDIKICAgICsKICAgIGR1cAogICAgZGlnIDMKICAgID49CiAgICBzd2FwCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBkdXAKICAgIGRpZyAyCiAgICA8CiAgICBkaWcgMgogICAgc3dhcAogICAgc2VsZWN0CiAgICBmcmFtZV9kaWcgLTIKICAgIGNvdmVyIDIKICAgIHN1YnN0cmluZzMKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy5tYWluVmFsdWUoZmxhZ3M6IHVpbnQ2NCwgZGVjaW1hbHM6IHVpbnQ2NCwgcmV2aXNpb246IHVpbnQ2NCwgY3JlYXRvcjogYnl0ZXMsIGhvbGRlcjogYnl0ZXMsIGNyZWF0b3JEZXBvc2l0OiB1aW50NjQsIGhvbGRlckRlcG9zaXQ6IHVpbnQ2NCkgLT4gYnl0ZXM6Cm1haW5WYWx1ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTU4CiAgICAvLyBwcml2YXRlIG1haW5WYWx1ZShmbGFnczogdWludDY0LCBkZWNpbWFsczogdWludDY0LCByZXZpc2lvbjogdWludDY0LCBjcmVhdG9yOiBieXRlcywgaG9sZGVyOiBieXRlcywgY3JlYXRvckRlcG9zaXQ6IHVpbnQ2NCwgaG9sZGVyRGVwb3NpdDogdWludDY0KTogYnl0ZXMgewogICAgcHJvdG8gNyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk2MAogICAgLy8gLmNvbmNhdChpdG9iKGZsYWdzKS5zbGljZSg3LCA4KSkKICAgIGZyYW1lX2RpZyAtNwogICAgaXRvYgogICAgc3Vic3RyaW5nIDcgOAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo5NTkKICAgIC8vIHJldHVybiBCeXRlcy5mcm9tSGV4KCcwMScpCiAgICBieXRlYyA4IC8vIDB4MDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTU5LTk2MAogICAgLy8gcmV0dXJuIEJ5dGVzLmZyb21IZXgoJzAxJykKICAgIC8vICAgLmNvbmNhdChpdG9iKGZsYWdzKS5zbGljZSg3LCA4KSkKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo5NjEKICAgIC8vIC5jb25jYXQoaXRvYihkZWNpbWFscykuc2xpY2UoNywgOCkpCiAgICBmcmFtZV9kaWcgLTYKICAgIGl0b2IKICAgIHN1YnN0cmluZyA3IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTU5LTk2MQogICAgLy8gcmV0dXJuIEJ5dGVzLmZyb21IZXgoJzAxJykKICAgIC8vICAgLmNvbmNhdChpdG9iKGZsYWdzKS5zbGljZSg3LCA4KSkKICAgIC8vICAgLmNvbmNhdChpdG9iKGRlY2ltYWxzKS5zbGljZSg3LCA4KSkKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo5NjIKICAgIC8vIC5jb25jYXQoaXRvYihyZXZpc2lvbikpCiAgICBmcmFtZV9kaWcgLTUKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTU5LTk2MgogICAgLy8gcmV0dXJuIEJ5dGVzLmZyb21IZXgoJzAxJykKICAgIC8vICAgLmNvbmNhdChpdG9iKGZsYWdzKS5zbGljZSg3LCA4KSkKICAgIC8vICAgLmNvbmNhdChpdG9iKGRlY2ltYWxzKS5zbGljZSg3LCA4KSkKICAgIC8vICAgLmNvbmNhdChpdG9iKHJldmlzaW9uKSkKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo5NjMKICAgIC8vIC5jb25jYXQoaXRvYihjcmVhdG9yLmxlbmd0aCkuc2xpY2UoNiwgOCkpCiAgICBmcmFtZV9kaWcgLTQKICAgIGxlbgogICAgaXRvYgogICAgc3Vic3RyaW5nIDYgOAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo5NTktOTYzCiAgICAvLyByZXR1cm4gQnl0ZXMuZnJvbUhleCgnMDEnKQogICAgLy8gICAuY29uY2F0KGl0b2IoZmxhZ3MpLnNsaWNlKDcsIDgpKQogICAgLy8gICAuY29uY2F0KGl0b2IoZGVjaW1hbHMpLnNsaWNlKDcsIDgpKQogICAgLy8gICAuY29uY2F0KGl0b2IocmV2aXNpb24pKQogICAgLy8gICAuY29uY2F0KGl0b2IoY3JlYXRvci5sZW5ndGgpLnNsaWNlKDYsIDgpKQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk2NAogICAgLy8gLmNvbmNhdChpdG9iKGhvbGRlci5sZW5ndGgpLnNsaWNlKDYsIDgpKQogICAgZnJhbWVfZGlnIC0zCiAgICBsZW4KICAgIGl0b2IKICAgIHN1YnN0cmluZyA2IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTU5LTk2NAogICAgLy8gcmV0dXJuIEJ5dGVzLmZyb21IZXgoJzAxJykKICAgIC8vICAgLmNvbmNhdChpdG9iKGZsYWdzKS5zbGljZSg3LCA4KSkKICAgIC8vICAgLmNvbmNhdChpdG9iKGRlY2ltYWxzKS5zbGljZSg3LCA4KSkKICAgIC8vICAgLmNvbmNhdChpdG9iKHJldmlzaW9uKSkKICAgIC8vICAgLmNvbmNhdChpdG9iKGNyZWF0b3IubGVuZ3RoKS5zbGljZSg2LCA4KSkKICAgIC8vICAgLmNvbmNhdChpdG9iKGhvbGRlci5sZW5ndGgpLnNsaWNlKDYsIDgpKQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk2NQogICAgLy8gLmNvbmNhdChpdG9iKGNyZWF0b3JEZXBvc2l0KSkKICAgIGZyYW1lX2RpZyAtMgogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo5NTktOTY1CiAgICAvLyByZXR1cm4gQnl0ZXMuZnJvbUhleCgnMDEnKQogICAgLy8gICAuY29uY2F0KGl0b2IoZmxhZ3MpLnNsaWNlKDcsIDgpKQogICAgLy8gICAuY29uY2F0KGl0b2IoZGVjaW1hbHMpLnNsaWNlKDcsIDgpKQogICAgLy8gICAuY29uY2F0KGl0b2IocmV2aXNpb24pKQogICAgLy8gICAuY29uY2F0KGl0b2IoY3JlYXRvci5sZW5ndGgpLnNsaWNlKDYsIDgpKQogICAgLy8gICAuY29uY2F0KGl0b2IoaG9sZGVyLmxlbmd0aCkuc2xpY2UoNiwgOCkpCiAgICAvLyAgIC5jb25jYXQoaXRvYihjcmVhdG9yRGVwb3NpdCkpCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTY2CiAgICAvLyAuY29uY2F0KGl0b2IoaG9sZGVyRGVwb3NpdCkpCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTU5LTk2NgogICAgLy8gcmV0dXJuIEJ5dGVzLmZyb21IZXgoJzAxJykKICAgIC8vICAgLmNvbmNhdChpdG9iKGZsYWdzKS5zbGljZSg3LCA4KSkKICAgIC8vICAgLmNvbmNhdChpdG9iKGRlY2ltYWxzKS5zbGljZSg3LCA4KSkKICAgIC8vICAgLmNvbmNhdChpdG9iKHJldmlzaW9uKSkKICAgIC8vICAgLmNvbmNhdChpdG9iKGNyZWF0b3IubGVuZ3RoKS5zbGljZSg2LCA4KSkKICAgIC8vICAgLmNvbmNhdChpdG9iKGhvbGRlci5sZW5ndGgpLnNsaWNlKDYsIDgpKQogICAgLy8gICAuY29uY2F0KGl0b2IoY3JlYXRvckRlcG9zaXQpKQogICAgLy8gICAuY29uY2F0KGl0b2IoaG9sZGVyRGVwb3NpdCkpCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTU5LTk2NwogICAgLy8gcmV0dXJuIEJ5dGVzLmZyb21IZXgoJzAxJykKICAgIC8vICAgLmNvbmNhdChpdG9iKGZsYWdzKS5zbGljZSg3LCA4KSkKICAgIC8vICAgLmNvbmNhdChpdG9iKGRlY2ltYWxzKS5zbGljZSg3LCA4KSkKICAgIC8vICAgLmNvbmNhdChpdG9iKHJldmlzaW9uKSkKICAgIC8vICAgLmNvbmNhdChpdG9iKGNyZWF0b3IubGVuZ3RoKS5zbGljZSg2LCA4KSkKICAgIC8vICAgLmNvbmNhdChpdG9iKGhvbGRlci5sZW5ndGgpLnNsaWNlKDYsIDgpKQogICAgLy8gICAuY29uY2F0KGl0b2IoY3JlYXRvckRlcG9zaXQpKQogICAgLy8gICAuY29uY2F0KGl0b2IoaG9sZGVyRGVwb3NpdCkpCiAgICAvLyAgIC5jb25jYXQoY3JlYXRvcikKICAgIGZyYW1lX2RpZyAtNAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk1OS05NjgKICAgIC8vIHJldHVybiBCeXRlcy5mcm9tSGV4KCcwMScpCiAgICAvLyAgIC5jb25jYXQoaXRvYihmbGFncykuc2xpY2UoNywgOCkpCiAgICAvLyAgIC5jb25jYXQoaXRvYihkZWNpbWFscykuc2xpY2UoNywgOCkpCiAgICAvLyAgIC5jb25jYXQoaXRvYihyZXZpc2lvbikpCiAgICAvLyAgIC5jb25jYXQoaXRvYihjcmVhdG9yLmxlbmd0aCkuc2xpY2UoNiwgOCkpCiAgICAvLyAgIC5jb25jYXQoaXRvYihob2xkZXIubGVuZ3RoKS5zbGljZSg2LCA4KSkKICAgIC8vICAgLmNvbmNhdChpdG9iKGNyZWF0b3JEZXBvc2l0KSkKICAgIC8vICAgLmNvbmNhdChpdG9iKGhvbGRlckRlcG9zaXQpKQogICAgLy8gICAuY29uY2F0KGNyZWF0b3IpCiAgICAvLyAgIC5jb25jYXQoaG9sZGVyKQogICAgZnJhbWVfZGlnIC0zCiAgICBjb25jYXQKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy53cml0ZVNlY3Rpb24oYXNzZXQ6IHVpbnQ2NCwgcm9sZTogdWludDY0LCBzZWN0aW9uOiBieXRlcywgZmxhZ3M6IHVpbnQ2NCwgZGVjaW1hbHM6IHVpbnQ2NCwgb3duZXI6IGJ5dGVzKSAtPiBieXRlczoKd3JpdGVTZWN0aW9uOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo5NzYKICAgIC8vIHByaXZhdGUgd3JpdGVTZWN0aW9uKGFzc2V0OiB1aW50NjQsIHJvbGU6IHVpbnQ2NCwgc2VjdGlvbjogYnl0ZXMsIGZsYWdzOiB1aW50NjQsIGRlY2ltYWxzOiB1aW50NjQsIG93bmVyOiBBY2NvdW50KTogV3JpdGVSZXN1bHQgewogICAgcHJvdG8gNiAxCiAgICBpbnRjXzAgLy8gMAogICAgYnl0ZWNfMCAvLyAiIgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNjQKICAgIC8vIHJldHVybiBQcmVmaXhNYWluLmNvbmNhdChpdG9iKGFzc2V0KSkKICAgIGZyYW1lX2RpZyAtNgogICAgaXRvYgogICAgYnl0ZWMgNSAvLyAibSIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk3OAogICAgLy8gY29uc3QgW21haW4sIGV4aXN0c10gPSBvcC5Cb3guZ2V0KG5hbWUpCiAgICBib3hfZ2V0CiAgICBzd2FwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk3OQogICAgLy8gbGV0IGNyZWF0b3JTZWN0aW9uID0gQnl0ZXMoJycpCiAgICBieXRlY18wIC8vICIiCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk4MAogICAgLy8gbGV0IGhvbGRlclNlY3Rpb24gPSBCeXRlcygnJykKICAgIGJ5dGVjXzAgLy8gIiIKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTgxCiAgICAvLyBsZXQgY3JlYXRvckRlcG9zaXQ6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk4MgogICAgLy8gbGV0IGhvbGRlckRlcG9zaXQ6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk4MwogICAgLy8gaWYgKGV4aXN0cykgewogICAgYnogd3JpdGVTZWN0aW9uX2FmdGVyX2lmX2Vsc2VAMgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo5ODQKICAgIC8vIGNyZWF0b3JTZWN0aW9uID0gdGhpcy5zZWN0aW9uKG1haW4sIFJvbGVDcmVhdG9yKQogICAgZnJhbWVfZGlnIDMKICAgIGR1cAogICAgaW50Y18xIC8vIDEKICAgIGNhbGxzdWIgc2VjdGlvbgogICAgZnJhbWVfYnVyeSA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk4NQogICAgLy8gaG9sZGVyU2VjdGlvbiA9IHRoaXMuc2VjdGlvbihtYWluLCBSb2xlSG9sZGVyKQogICAgZHVwCiAgICBpbnRjXzIgLy8gMgogICAgY2FsbHN1YiBzZWN0aW9uCiAgICBmcmFtZV9idXJ5IDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTg2CiAgICAvLyBjcmVhdG9yRGVwb3NpdCA9IGJ0b2kobWFpbi5zbGljZShNQ3JlYXRvckRlcG9zaXQsIE1DcmVhdG9yRGVwb3NpdCArIDgpKQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMTUKICAgIGRpZyAxCiAgICA+PQogICAgcHVzaGludCAxNQogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBwdXNoaW50IDIzCiAgICBkaWcgMgogICAgPj0KICAgIHB1c2hpbnQgMjMKICAgIGRpZyAzCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgZGlnIDMKICAgIHVuY292ZXIgMgogICAgZGlnIDIKICAgIHN1YnN0cmluZzMKICAgIGJ0b2kKICAgIGZyYW1lX2J1cnkgNgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo5ODcKICAgIC8vIGhvbGRlckRlcG9zaXQgPSBidG9pKG1haW4uc2xpY2UoTUhvbGRlckRlcG9zaXQsIE1Ib2xkZXJEZXBvc2l0ICsgOCkpCiAgICBwdXNoaW50IDMxCiAgICBkaWcgMgogICAgPj0KICAgIHB1c2hpbnQgMzEKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIHN1YnN0cmluZzMKICAgIGJ0b2kKICAgIGZyYW1lX2J1cnkgNwoKd3JpdGVTZWN0aW9uX2FmdGVyX2lmX2Vsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTg5CiAgICAvLyBjb25zdCBzdG9yZWQ6IHVpbnQ2NCA9IHJvbGUgPT09IFJvbGVDcmVhdG9yID8gY3JlYXRvckRlcG9zaXQgOiBob2xkZXJEZXBvc2l0CiAgICBmcmFtZV9kaWcgLTUKICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgZHVwCiAgICBmcmFtZV9kaWcgNwogICAgZnJhbWVfZGlnIDYKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk5MQogICAgLy8gaWYgKHJvbGUgPT09IFJvbGVIb2xkZXIgJiYgaG9sZGVyU2VjdGlvbi5sZW5ndGggPiAwKSBwcmV2aW91c093bmVyID0gQWNjb3VudChob2xkZXJTZWN0aW9uLnNsaWNlKDAsIDMyKSkKICAgIGZyYW1lX2RpZyAtNQogICAgaW50Y18yIC8vIDIKICAgID09CiAgICBibnogd3JpdGVTZWN0aW9uX2FuZF9jb250ZEAzCiAgICBmcmFtZV9kaWcgLTEKCndyaXRlU2VjdGlvbl9hZnRlcl9pZl9lbHNlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk5MgogICAgLy8gaWYgKHJvbGUgPT09IFJvbGVDcmVhdG9yKSB7CiAgICBkaWcgMgogICAgYnogd3JpdGVTZWN0aW9uX2Vsc2VfYm9keUA3CiAgICBmcmFtZV9kaWcgLTQKICAgIGZyYW1lX2J1cnkgNAoKd3JpdGVTZWN0aW9uX2FmdGVyX2lmX2Vsc2VAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTk4CiAgICAvLyBjb25zdCByZXZpc2lvbiA9IHRoaXMubmV4dFJldmlzaW9uKCkKICAgIGNhbGxzdWIgbmV4dFJldmlzaW9uCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTEwOAogICAgLy8gcmV0dXJuIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLm1pbkJhbGFuY2UKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdE1pbkJhbGFuY2UKICAgIHN3YXAKICAgIGR1cAogICAgY292ZXIgMwogICAgZnJhbWVfYnVyeSAyCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAwMAogICAgLy8gdGhpcy5wdXRCb3gobmFtZSwgdGhpcy5tYWluVmFsdWUoZmxhZ3MsIGRlY2ltYWxzLCByZXZpc2lvbiwgY3JlYXRvclNlY3Rpb24sIGhvbGRlclNlY3Rpb24sIGNyZWF0b3JEZXBvc2l0LCBob2xkZXJEZXBvc2l0KSkKICAgIGZyYW1lX2RpZyAtMwogICAgZnJhbWVfZGlnIC0yCiAgICB1bmNvdmVyIDIKICAgIGZyYW1lX2RpZyA0CiAgICBmcmFtZV9kaWcgNQogICAgZnJhbWVfZGlnIDYKICAgIGZyYW1lX2RpZyA3CiAgICBjYWxsc3ViIG1haW5WYWx1ZQogICAgdW5jb3ZlciA2CiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgY2FsbHN1YiBwdXRCb3gKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTEwOAogICAgLy8gcmV0dXJuIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLm1pbkJhbGFuY2UKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdE1pbkJhbGFuY2UKICAgIHN3YXAKICAgIGR1cAogICAgY292ZXIgMgogICAgZnJhbWVfYnVyeSAxCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAwMgogICAgLy8gY29uc3QgZGVwb3NpdDogdWludDY0ID0gc3RvcmVkICsgYWZ0ZXIgLSBiZWZvcmUKICAgIGRpZyA0CiAgICArCiAgICB1bmNvdmVyIDIKICAgIC0KICAgIGR1cAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMDAzCiAgICAvLyBvcC5Cb3gucmVwbGFjZShuYW1lLCByb2xlID09PSBSb2xlQ3JlYXRvciA/IE1DcmVhdG9yRGVwb3NpdCA6IE1Ib2xkZXJEZXBvc2l0LCBpdG9iKGRlcG9zaXQpKQogICAgcHVzaGludHMgMjMgMTUKICAgIHVuY292ZXIgOAogICAgc2VsZWN0CiAgICBzd2FwCiAgICBpdG9iCiAgICBkdXAKICAgIGNvdmVyIDQKICAgIGJveF9yZXBsYWNlCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMTIKICAgIC8vIHJldHVybiB7IHNpZ246IG5ldyBVaW50OChNYnJOdWxsKSwgYW1vdW50OiAwIH0KICAgIGJ5dGVjIDI4IC8vIDB4MDAwMDAwMDAwMDAwMDAwMDAwCiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAwNgogICAgLy8gaWYgKHByZXZpb3VzT3duZXIgIT09IG93bmVyKSB7CiAgICBkdXAKICAgIGZyYW1lX2RpZyAtMQogICAgIT0KICAgIGJ6IHdyaXRlU2VjdGlvbl9lbHNlX2JvZHlAMTAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAwNwogICAgLy8gdGhpcy5yZWZ1bmQocHJldmlvdXNPd25lciwgc3RvcmVkKQogICAgdW5jb3ZlciAzCiAgICBjYWxsc3ViIHJlZnVuZAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMDA4CiAgICAvLyB0aGlzLmV4cGVjdFBheW1lbnQoZGVwb3NpdCkKICAgIHN3YXAKICAgIGNhbGxzdWIgZXhwZWN0UGF5bWVudAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMDA5CiAgICAvLyBtYnIgPSB7IHNpZ246IG5ldyBVaW50OChNYnJQb3NpdGl2ZSksIGFtb3VudDogZGVwb3NpdCB9CiAgICBieXRlYyA4IC8vIDB4MDEKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZnJhbWVfYnVyeSAwCgp3cml0ZVNlY3Rpb25fYWZ0ZXJfaWZfZWxzZUAxNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAyMAogICAgLy8gdGhpcy5lbWl0TWFpbihhc3NldCwgcmV2aXNpb24sIHJvbGUsIGZhbHNlKQogICAgZnJhbWVfZGlnIC02CiAgICBkaWcgMQogICAgZnJhbWVfZGlnIC01CiAgICBpbnRjXzAgLy8gMAogICAgY2FsbHN1YiBlbWl0TWFpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMDIxCiAgICAvLyByZXR1cm4geyByZXZpc2lvbiwgY2hhbmdlZDogdHJ1ZSwgbWJyIH0KICAgIGl0b2IKICAgIGJ5dGVjXzMgLy8gMHg4MAogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgMAogICAgY29uY2F0CiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKd3JpdGVTZWN0aW9uX2Vsc2VfYm9keUAxMDoKICAgIHBvcG4gNAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMDEwCiAgICAvLyB9IGVsc2UgaWYgKGFmdGVyID4gYmVmb3JlKSB7CiAgICBmcmFtZV9kaWcgMQogICAgZnJhbWVfZGlnIDIKICAgID4KICAgIGJ6IHdyaXRlU2VjdGlvbl9lbHNlX2JvZHlAMTIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAxMQogICAgLy8gdGhpcy5leHBlY3RQYXltZW50KGFmdGVyIC0gYmVmb3JlKQogICAgZnJhbWVfZGlnIDEKICAgIGZyYW1lX2RpZyAyCiAgICAtCiAgICBkdXAKICAgIGNhbGxzdWIgZXhwZWN0UGF5bWVudAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMDEyCiAgICAvLyBtYnIgPSB7IHNpZ246IG5ldyBVaW50OChNYnJQb3NpdGl2ZSksIGFtb3VudDogYWZ0ZXIgLSBiZWZvcmUgfQogICAgaXRvYgogICAgYnl0ZWMgOCAvLyAweDAxCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGZyYW1lX2J1cnkgMAogICAgYiB3cml0ZVNlY3Rpb25fYWZ0ZXJfaWZfZWxzZUAxNgoKd3JpdGVTZWN0aW9uX2Vsc2VfYm9keUAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAxNAogICAgLy8gdGhpcy5leHBlY3ROb1BheW1lbnQoKQogICAgY2FsbHN1YiBleHBlY3ROb1BheW1lbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAxNQogICAgLy8gaWYgKGJlZm9yZSA+IGFmdGVyKSB7CiAgICBmcmFtZV9kaWcgMgogICAgZnJhbWVfZGlnIDEKICAgID4KICAgIGJ6IHdyaXRlU2VjdGlvbl9hZnRlcl9pZl9lbHNlQDE2CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwMTYKICAgIC8vIHRoaXMucmVmdW5kKG93bmVyLCBiZWZvcmUgLSBhZnRlcikKICAgIGZyYW1lX2RpZyAyCiAgICBmcmFtZV9kaWcgMQogICAgLQogICAgZnJhbWVfZGlnIC0xCiAgICBkaWcgMQogICAgY2FsbHN1YiByZWZ1bmQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAxNwogICAgLy8gbWJyID0geyBzaWduOiBuZXcgVWludDgoTWJyTmVnYXRpdmUpLCBhbW91bnQ6IGJlZm9yZSAtIGFmdGVyIH0KICAgIGl0b2IKICAgIHB1c2hieXRlcyAweGZmCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGZyYW1lX2J1cnkgMAogICAgYiB3cml0ZVNlY3Rpb25fYWZ0ZXJfaWZfZWxzZUAxNgoKd3JpdGVTZWN0aW9uX2Vsc2VfYm9keUA3OgogICAgZnJhbWVfZGlnIC00CiAgICBmcmFtZV9idXJ5IDUKICAgIGIgd3JpdGVTZWN0aW9uX2FmdGVyX2lmX2Vsc2VAOAoKd3JpdGVTZWN0aW9uX2FuZF9jb250ZEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo5OTEKICAgIC8vIGlmIChyb2xlID09PSBSb2xlSG9sZGVyICYmIGhvbGRlclNlY3Rpb24ubGVuZ3RoID4gMCkgcHJldmlvdXNPd25lciA9IEFjY291bnQoaG9sZGVyU2VjdGlvbi5zbGljZSgwLCAzMikpCiAgICBmcmFtZV9kaWcgNQogICAgbGVuCiAgICBkdXAKICAgIGJueiB3cml0ZVNlY3Rpb25faWZfYm9keUA0CiAgICBwb3AKICAgIGZyYW1lX2RpZyAtMQogICAgYiB3cml0ZVNlY3Rpb25fYWZ0ZXJfaWZfZWxzZUA1Cgp3cml0ZVNlY3Rpb25faWZfYm9keUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo5OTEKICAgIC8vIGlmIChyb2xlID09PSBSb2xlSG9sZGVyICYmIGhvbGRlclNlY3Rpb24ubGVuZ3RoID4gMCkgcHJldmlvdXNPd25lciA9IEFjY291bnQoaG9sZGVyU2VjdGlvbi5zbGljZSgwLCAzMikpCiAgICBpbnRjXzAgLy8gMAogICAgZGlnIDEKICAgID49CiAgICBpbnRjXzAgLy8gMAogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBwdXNoaW50IDMyCiAgICBkaWcgMgogICAgPj0KICAgIHB1c2hpbnQgMzIKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIGZyYW1lX2RpZyA1CiAgICBjb3ZlciAyCiAgICBzdWJzdHJpbmczCiAgICBiIHdyaXRlU2VjdGlvbl9hZnRlcl9pZl9lbHNlQDUKCgovLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMuY2xlYXJTZWN0aW9uKGFzc2V0OiB1aW50NjQsIG1haW46IGJ5dGVzLCByb2xlOiB1aW50NjQsIG93bmVyOiBieXRlcykgLT4gdWludDY0OgpjbGVhclNlY3Rpb246CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwMjgKICAgIC8vIHByaXZhdGUgY2xlYXJTZWN0aW9uKGFzc2V0OiB1aW50NjQsIG1haW46IGJ5dGVzLCByb2xlOiB1aW50NjQsIG93bmVyOiBBY2NvdW50KTogdWludDY0IHsKICAgIHByb3RvIDQgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMDY0CiAgICAvLyByZXR1cm4gUHJlZml4TWFpbi5jb25jYXQoaXRvYihhc3NldCkpCiAgICBmcmFtZV9kaWcgLTQKICAgIGl0b2IKICAgIGJ5dGVjIDUgLy8gIm0iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAzMAogICAgLy8gY29uc3Qgb3RoZXJSb2xlOiB1aW50NjQgPSByb2xlID09PSBSb2xlQ3JlYXRvciA/IFJvbGVIb2xkZXIgOiBSb2xlQ3JlYXRvcgogICAgZnJhbWVfZGlnIC0yCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGR1cAogICAgaW50Y18xIC8vIDEKICAgIGludGNfMiAvLyAyCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgZHVwCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwMzEKICAgIC8vIGNvbnN0IG90aGVyID0gdGhpcy5zZWN0aW9uKG1haW4sIG90aGVyUm9sZSkKICAgIGZyYW1lX2RpZyAtMwogICAgc3dhcAogICAgY2FsbHN1YiBzZWN0aW9uCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAzMgogICAgLy8gdGhpcy5leHBlY3ROb1BheW1lbnQoKQogICAgY2FsbHN1YiBleHBlY3ROb1BheW1lbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTEwOAogICAgLy8gcmV0dXJuIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLm1pbkJhbGFuY2UKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdE1pbkJhbGFuY2UKICAgIHN3YXAKICAgIGNvdmVyIDIKICAgIGFzc2VydCAvLyBhY2NvdW50IGZ1bmRlZAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMDM0CiAgICAvLyBpZiAob3RoZXIubGVuZ3RoID09PSAwKSB7CiAgICBsZW4KICAgIGJueiBjbGVhclNlY3Rpb25fYWZ0ZXJfaWZfZWxzZUAyCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAzNQogICAgLy8gb3AuQm94LmRlbGV0ZShuYW1lKQogICAgc3dhcAogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMDgKICAgIC8vIHJldHVybiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcy5taW5CYWxhbmNlCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RNaW5CYWxhbmNlCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAzNgogICAgLy8gY29uc3QgcmVmdW5kOiB1aW50NjQgPSBiZWZvcmUgLSB0aGlzLmFwcE1pbkJhbGFuY2UoKQogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMDM3CiAgICAvLyB0aGlzLnJlZnVuZChvd25lciwgcmVmdW5kKQogICAgZnJhbWVfZGlnIC0xCiAgICBkaWcgMQogICAgY2FsbHN1YiByZWZ1bmQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAzOAogICAgLy8gdGhpcy5lbWl0TWFpbihhc3NldCwgMCwgUm9sZU5vbmUsIHRydWUpCiAgICBmcmFtZV9kaWcgLTQKICAgIGludGNfMCAvLyAwCiAgICBkdXAKICAgIGludGNfMSAvLyAxCiAgICBjYWxsc3ViIGVtaXRNYWluCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwMzkKICAgIC8vIHJldHVybiByZWZ1bmQKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpjbGVhclNlY3Rpb25fYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMDQyCiAgICAvLyBidG9pKG1haW4uc2xpY2UoTUNyZWF0b3JEZXBvc2l0LCBNQ3JlYXRvckRlcG9zaXQgKyA4KSkgKyBidG9pKG1haW4uc2xpY2UoTUhvbGRlckRlcG9zaXQsIE1Ib2xkZXJEZXBvc2l0ICsgOCkpCiAgICBmcmFtZV9kaWcgLTMKICAgIGxlbgogICAgcHVzaGludCAxNQogICAgZGlnIDEKICAgID49CiAgICBwdXNoaW50IDE1CiAgICBkaWcgMgogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIHB1c2hpbnQgMjMKICAgIGRpZyAyCiAgICA+PQogICAgcHVzaGludCAyMwogICAgZGlnIDMKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBmcmFtZV9kaWcgLTMKICAgIHVuY292ZXIgMgogICAgZGlnIDIKICAgIHN1YnN0cmluZzMKICAgIGJ0b2kKICAgIHB1c2hpbnQgMzEKICAgIGRpZyAzCiAgICA+PQogICAgcHVzaGludCAzMQogICAgdW5jb3ZlciA0CiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgZnJhbWVfZGlnIC0zCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMgogICAgc3Vic3RyaW5nMwogICAgYnRvaQogICAgKwogICAgY292ZXIgNAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMDQzCiAgICAvLyBjb25zdCByZXZpc2lvbiA9IHRoaXMubmV4dFJldmlzaW9uKCkKICAgIGNhbGxzdWIgbmV4dFJldmlzaW9uCiAgICBjb3ZlciA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNDQKICAgIC8vIGNvbnN0IGZsYWdzOiB1aW50NjQgPSByb2xlID09PSBSb2xlQ3JlYXRvciA/IDAgOiBnZXRCeXRlKG1haW4sIE1GbGFncykKICAgIGRpZyAxCiAgICBieiBjbGVhclNlY3Rpb25fdGVybmFyeV9mYWxzZUA0CiAgICBpbnRjXzAgLy8gMAoKY2xlYXJTZWN0aW9uX3Rlcm5hcnlfbWVyZ2VANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA0Ni0xMDQ4CiAgICAvLyByb2xlID09PSBSb2xlQ3JlYXRvcgogICAgLy8gICA/IHRoaXMubWFpblZhbHVlKGZsYWdzLCBnZXRCeXRlKG1haW4sIE1EZWNpbWFscyksIHJldmlzaW9uLCBCeXRlcygnJyksIG90aGVyLCAwLCAwKQogICAgLy8gICA6IHRoaXMubWFpblZhbHVlKGZsYWdzLCBnZXRCeXRlKG1haW4sIE1EZWNpbWFscyksIHJldmlzaW9uLCBvdGhlciwgQnl0ZXMoJycpLCAwLCAwKQogICAgdW5jb3ZlciAyCiAgICBieiBjbGVhclNlY3Rpb25fdGVybmFyeV9mYWxzZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNDcKICAgIC8vID8gdGhpcy5tYWluVmFsdWUoZmxhZ3MsIGdldEJ5dGUobWFpbiwgTURlY2ltYWxzKSwgcmV2aXNpb24sIEJ5dGVzKCcnKSwgb3RoZXIsIDAsIDApCiAgICBmcmFtZV9kaWcgLTMKICAgIGludGNfMiAvLyAyCiAgICBnZXRieXRlCiAgICBkaWcgNQogICAgYnl0ZWNfMCAvLyAiIgogICAgdW5jb3ZlciA2CiAgICBpbnRjXzAgLy8gMAogICAgZHVwCiAgICBjYWxsc3ViIG1haW5WYWx1ZQoKY2xlYXJTZWN0aW9uX3Rlcm5hcnlfbWVyZ2VAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA0OQogICAgLy8gdGhpcy5wdXRCb3gobmFtZSwgdmFsdWUpCiAgICB1bmNvdmVyIDIKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICBjYWxsc3ViIHB1dEJveAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMTA4CiAgICAvLyByZXR1cm4gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MubWluQmFsYW5jZQogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0TWluQmFsYW5jZQogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNTAKICAgIC8vIGNvbnN0IHJlZnVuZDogdWludDY0ID0gYmVmb3JlIC0gdGhpcy5hcHBNaW5CYWxhbmNlKCkKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMDUxCiAgICAvLyBvcC5Cb3gucmVwbGFjZShuYW1lLCBvdGhlclJvbGUgPT09IFJvbGVDcmVhdG9yID8gTUNyZWF0b3JEZXBvc2l0IDogTUhvbGRlckRlcG9zaXQsIGl0b2IodG90YWwgLSByZWZ1bmQpKQogICAgdW5jb3ZlciA0CiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIHB1c2hpbnRzIDIzIDE1CiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgdW5jb3ZlciA0CiAgICBkaWcgMgogICAgLQogICAgaXRvYgogICAgdW5jb3ZlciAzCiAgICBjb3ZlciAyCiAgICBib3hfcmVwbGFjZQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMDUyCiAgICAvLyB0aGlzLnJlZnVuZChvd25lciwgcmVmdW5kKQogICAgZnJhbWVfZGlnIC0xCiAgICBkaWcgMQogICAgY2FsbHN1YiByZWZ1bmQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA1MwogICAgLy8gdGhpcy5lbWl0TWFpbihhc3NldCwgcmV2aXNpb24sIHJvbGUsIHRydWUpCiAgICBmcmFtZV9kaWcgLTQKICAgIHVuY292ZXIgMgogICAgZnJhbWVfZGlnIC0yCiAgICBpbnRjXzEgLy8gMQogICAgY2FsbHN1YiBlbWl0TWFpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMDU0CiAgICAvLyByZXR1cm4gcmVmdW5kCiAgICByZXRzdWIKCmNsZWFyU2VjdGlvbl90ZXJuYXJ5X2ZhbHNlQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNDgKICAgIC8vIDogdGhpcy5tYWluVmFsdWUoZmxhZ3MsIGdldEJ5dGUobWFpbiwgTURlY2ltYWxzKSwgcmV2aXNpb24sIG90aGVyLCBCeXRlcygnJyksIDAsIDApCiAgICBmcmFtZV9kaWcgLTMKICAgIGludGNfMiAvLyAyCiAgICBnZXRieXRlCiAgICBkaWcgNQogICAgdW5jb3ZlciA1CiAgICBieXRlY18wIC8vICIiCiAgICBpbnRjXzAgLy8gMAogICAgZHVwCiAgICBjYWxsc3ViIG1haW5WYWx1ZQogICAgYiBjbGVhclNlY3Rpb25fdGVybmFyeV9tZXJnZUA4CgpjbGVhclNlY3Rpb25fdGVybmFyeV9mYWxzZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMDQ0CiAgICAvLyBjb25zdCBmbGFnczogdWludDY0ID0gcm9sZSA9PT0gUm9sZUNyZWF0b3IgPyAwIDogZ2V0Qnl0ZShtYWluLCBNRmxhZ3MpCiAgICBmcmFtZV9kaWcgLTMKICAgIGludGNfMSAvLyAxCiAgICBnZXRieXRlCiAgICBiIGNsZWFyU2VjdGlvbl90ZXJuYXJ5X21lcmdlQDUKCgovLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMudmFyaWF0aW9uVmFsdWUoZmxhZ3M6IHVpbnQ2NCwga2luZDogYnl0ZXMsIHN1YjogYnl0ZXMsIHJldmlzaW9uOiB1aW50NjQsIGhvbGRlcjogYnl0ZXMsIGRlY2ltYWxzOiB1aW50NjQsIGZsYXQ6IGJ5dGVzLCBib2R5OiBieXRlcykgLT4gYnl0ZXM6CnZhcmlhdGlvblZhbHVlOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMDY3LTEwNzYKICAgIC8vIHByaXZhdGUgdmFyaWF0aW9uVmFsdWUoCiAgICAvLyAgIGZsYWdzOiB1aW50NjQsCiAgICAvLyAgIGtpbmQ6IFVpbnQ4LAogICAgLy8gICBzdWI6IFVpbnQ4LAogICAgLy8gICByZXZpc2lvbjogdWludDY0LAogICAgLy8gICBob2xkZXI6IEFjY291bnQsCiAgICAvLyAgIGRlY2ltYWxzOiB1aW50NjQsCiAgICAvLyAgIGZsYXQ6IGJ5dGVzLAogICAgLy8gICBib2R5OiBieXRlcywKICAgIC8vICk6IGJ5dGVzIHsKICAgIHByb3RvIDggMQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMDc4CiAgICAvLyAuY29uY2F0KGl0b2IoZmxhZ3MpLnNsaWNlKDcsIDgpKQogICAgZnJhbWVfZGlnIC04CiAgICBpdG9iCiAgICBzdWJzdHJpbmcgNyA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNzcKICAgIC8vIGxldCB2YWx1ZSA9IEJ5dGVzLmZyb21IZXgoJzAxJykKICAgIGJ5dGVjIDggLy8gMHgwMQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMDc3LTEwNzgKICAgIC8vIGxldCB2YWx1ZSA9IEJ5dGVzLmZyb21IZXgoJzAxJykKICAgIC8vICAgLmNvbmNhdChpdG9iKGZsYWdzKS5zbGljZSg3LCA4KSkKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMDc3LTEwNzkKICAgIC8vIGxldCB2YWx1ZSA9IEJ5dGVzLmZyb21IZXgoJzAxJykKICAgIC8vICAgLmNvbmNhdChpdG9iKGZsYWdzKS5zbGljZSg3LCA4KSkKICAgIC8vICAgLmNvbmNhdChraW5kLmJ5dGVzKQogICAgZnJhbWVfZGlnIC03CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA3Ny0xMDgwCiAgICAvLyBsZXQgdmFsdWUgPSBCeXRlcy5mcm9tSGV4KCcwMScpCiAgICAvLyAgIC5jb25jYXQoaXRvYihmbGFncykuc2xpY2UoNywgOCkpCiAgICAvLyAgIC5jb25jYXQoa2luZC5ieXRlcykKICAgIC8vICAgLmNvbmNhdChzdWIuYnl0ZXMpCiAgICBmcmFtZV9kaWcgLTYKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMDgxCiAgICAvLyAuY29uY2F0KGl0b2IocmV2aXNpb24pKQogICAgZnJhbWVfZGlnIC01CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNzctMTA4MQogICAgLy8gbGV0IHZhbHVlID0gQnl0ZXMuZnJvbUhleCgnMDEnKQogICAgLy8gICAuY29uY2F0KGl0b2IoZmxhZ3MpLnNsaWNlKDcsIDgpKQogICAgLy8gICAuY29uY2F0KGtpbmQuYnl0ZXMpCiAgICAvLyAgIC5jb25jYXQoc3ViLmJ5dGVzKQogICAgLy8gICAuY29uY2F0KGl0b2IocmV2aXNpb24pKQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwODIKICAgIC8vIC5jb25jYXQoaXRvYihmbGF0Lmxlbmd0aCkuc2xpY2UoNiwgOCkpCiAgICBmcmFtZV9kaWcgLTIKICAgIGxlbgogICAgaXRvYgogICAgc3Vic3RyaW5nIDYgOAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMDc3LTEwODIKICAgIC8vIGxldCB2YWx1ZSA9IEJ5dGVzLmZyb21IZXgoJzAxJykKICAgIC8vICAgLmNvbmNhdChpdG9iKGZsYWdzKS5zbGljZSg3LCA4KSkKICAgIC8vICAgLmNvbmNhdChraW5kLmJ5dGVzKQogICAgLy8gICAuY29uY2F0KHN1Yi5ieXRlcykKICAgIC8vICAgLmNvbmNhdChpdG9iKHJldmlzaW9uKSkKICAgIC8vICAgLmNvbmNhdChpdG9iKGZsYXQubGVuZ3RoKS5zbGljZSg2LCA4KSkKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMDgzCiAgICAvLyBpZiAoKGZsYWdzICYgRmxhZ0hvbGRlclNjb3BlKSAhPT0gMCkgewogICAgZnJhbWVfZGlnIC04CiAgICBpbnRjXzEgLy8gMQogICAgJgogICAgYnogdmFyaWF0aW9uVmFsdWVfYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwODQKICAgIC8vIHZhbHVlID0gdmFsdWUuY29uY2F0KGhvbGRlci5ieXRlcykuY29uY2F0KGl0b2IoZGVjaW1hbHMpLnNsaWNlKDcsIDgpKQogICAgZnJhbWVfZGlnIC00CiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtMwogICAgaXRvYgogICAgc3Vic3RyaW5nIDcgOAogICAgY29uY2F0Cgp2YXJpYXRpb25WYWx1ZV9hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwODYKICAgIC8vIHJldHVybiB2YWx1ZS5jb25jYXQoZmxhdCkuY29uY2F0KGJvZHkpCiAgICBmcmFtZV9kaWcgLTIKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC0xCiAgICBjb25jYXQKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy5zdG9yZWRIb2xkZXIodmFsdWU6IGJ5dGVzKSAtPiBieXRlczoKc3RvcmVkSG9sZGVyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMDg5CiAgICAvLyBwcml2YXRlIHN0b3JlZEhvbGRlcih2YWx1ZTogYnl0ZXMpOiBBY2NvdW50IHsKICAgIHByb3RvIDEgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMDkwCiAgICAvLyByZXR1cm4gQWNjb3VudCh2YWx1ZS5zbGljZShWSG9sZGVyLCBWSG9sZGVyICsgMzIpKQogICAgZnJhbWVfZGlnIC0xCiAgICBsZW4KICAgIHB1c2hpbnQgMTQKICAgIGRpZyAxCiAgICA+PQogICAgcHVzaGludCAxNAogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBwdXNoaW50IDQ2CiAgICBkaWcgMgogICAgPj0KICAgIHB1c2hpbnQgNDYKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIGZyYW1lX2RpZyAtMQogICAgY292ZXIgMgogICAgc3Vic3RyaW5nMwogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo6Q29sbGVjdGlibGVWYXJpYXRpb25zLnB1dEJveChuYW1lOiBieXRlcywgdmFsdWU6IGJ5dGVzKSAtPiB2b2lkOgpwdXRCb3g6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwOTQKICAgIC8vIHByaXZhdGUgcHV0Qm94KG5hbWU6IGJ5dGVzLCB2YWx1ZTogYnl0ZXMpOiB2b2lkIHsKICAgIHByb3RvIDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMDk1CiAgICAvLyBjb25zdCBbbGVuZ3RoLCBleGlzdHNdID0gb3AuQm94Lmxlbmd0aChuYW1lKQogICAgZnJhbWVfZGlnIC0yCiAgICBib3hfbGVuCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwOTYKICAgIC8vIGlmIChleGlzdHMgJiYgbGVuZ3RoICE9PSB2YWx1ZS5sZW5ndGgpIG9wLkJveC5kZWxldGUobmFtZSkKICAgIGJ6IHB1dEJveF9hZnRlcl9pZl9lbHNlQDMKICAgIGZyYW1lX2RpZyAtMQogICAgbGVuCiAgICBmcmFtZV9kaWcgMAogICAgIT0KICAgIGJ6IHB1dEJveF9hZnRlcl9pZl9lbHNlQDMKICAgIGZyYW1lX2RpZyAtMgogICAgYm94X2RlbAogICAgcG9wCgpwdXRCb3hfYWZ0ZXJfaWZfZWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMDk3CiAgICAvLyBvcC5Cb3gucHV0KG5hbWUsIHZhbHVlKQogICAgZnJhbWVfZGlnIC0yCiAgICBmcmFtZV9kaWcgLTEKICAgIGJveF9wdXQKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy5uZXh0UmV2aXNpb24oKSAtPiB1aW50NjQ6Cm5leHRSZXZpc2lvbjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTEwMwogICAgLy8gdGhpcy5yZXZpc2lvbi52YWx1ZSA9IHRoaXMucmV2aXNpb24udmFsdWUgKyAxCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoyMDYKICAgIC8vIHJldmlzaW9uID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogR2xvYmFsU3RhdGVLZXlSZXZpc2lvbiwgaW5pdGlhbFZhbHVlOiAwIH0pCiAgICBieXRlYyAxNiAvLyAiciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTEwMwogICAgLy8gdGhpcy5yZXZpc2lvbi52YWx1ZSA9IHRoaXMucmV2aXNpb24udmFsdWUgKyAxCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18xIC8vIDEKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjA2CiAgICAvLyByZXZpc2lvbiA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5UmV2aXNpb24sIGluaXRpYWxWYWx1ZTogMCB9KQogICAgYnl0ZWMgMTYgLy8gInIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMDMKICAgIC8vIHRoaXMucmV2aXNpb24udmFsdWUgPSB0aGlzLnJldmlzaW9uLnZhbHVlICsgMQogICAgZGlnIDEKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMDQKICAgIC8vIHJldHVybiB0aGlzLnJldmlzaW9uLnZhbHVlCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMuc2V0dGxlKGJlZm9yZTogdWludDY0LCBmbG93OiBieXRlcywgb3duZXI6IGJ5dGVzKSAtPiBieXRlcywgYnl0ZXM6CnNldHRsZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTEyMAogICAgLy8gcHJpdmF0ZSBzZXR0bGUoYmVmb3JlOiB1aW50NjQsIGZsb3c6IE1ldGFGbG93LCBvd25lcjogQWNjb3VudCk6IE1ickRlbHRhIHsKICAgIHByb3RvIDMgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMTA4CiAgICAvLyByZXR1cm4gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MubWluQmFsYW5jZQogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0TWluQmFsYW5jZQogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMjIKICAgIC8vIGNvbnN0IGluZmxvdzogdWludDY0ID0gYWZ0ZXIgKyBmbG93LnBhaWQKICAgIGZyYW1lX2RpZyAtMgogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICArCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTEyMwogICAgLy8gY29uc3Qgb3V0ZmxvdzogdWludDY0ID0gYmVmb3JlICsgZmxvdy5yZWZ1bmRlZAogICAgZnJhbWVfZGlnIC0yCiAgICBpbnRjXzMgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIGZyYW1lX2RpZyAtMwogICAgKwogICAgZHVwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMjQKICAgIC8vIGlmIChpbmZsb3cgPiBvdXRmbG93KSB7CiAgICA+CiAgICBieiBzZXR0bGVfYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMjUKICAgIC8vIHRoaXMuZXhwZWN0UGF5bWVudChpbmZsb3cgLSBvdXRmbG93KQogICAgLQogICAgZHVwCiAgICBjYWxsc3ViIGV4cGVjdFBheW1lbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTEyNgogICAgLy8gcmV0dXJuIHsgc2lnbjogbmV3IFVpbnQ4KE1iclBvc2l0aXZlKSwgYW1vdW50OiBpbmZsb3cgLSBvdXRmbG93IH0KICAgIGl0b2IKICAgIGJ5dGVjIDggLy8gMHgwMQogICAgc3dhcAogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgLTIKICAgIHJldHN1YgoKc2V0dGxlX2FmdGVyX2lmX2Vsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTEyOAogICAgLy8gdGhpcy5leHBlY3ROb1BheW1lbnQoKQogICAgY2FsbHN1YiBleHBlY3ROb1BheW1lbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTEyOQogICAgLy8gaWYgKG91dGZsb3cgPiBpbmZsb3cpIHsKICAgIGR1cAogICAgZGlnIDIKICAgID4KICAgIGJ6IHNldHRsZV9hZnRlcl9pZl9lbHNlQDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTEzMAogICAgLy8gdGhpcy5yZWZ1bmQob3duZXIsIG91dGZsb3cgLSBpbmZsb3cpCiAgICBzd2FwCiAgICAtCiAgICBmcmFtZV9kaWcgLTEKICAgIGRpZyAxCiAgICBjYWxsc3ViIHJlZnVuZAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMTMxCiAgICAvLyByZXR1cm4geyBzaWduOiBuZXcgVWludDgoTWJyTmVnYXRpdmUpLCBhbW91bnQ6IG91dGZsb3cgLSBpbmZsb3cgfQogICAgaXRvYgogICAgcHVzaGJ5dGVzIDB4ZmYKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC0yCiAgICByZXRzdWIKCnNldHRsZV9hZnRlcl9pZl9lbHNlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMTIKICAgIC8vIHJldHVybiB7IHNpZ246IG5ldyBVaW50OChNYnJOdWxsKSwgYW1vdW50OiAwIH0KICAgIGJ5dGVjIDI4IC8vIDB4MDAwMDAwMDAwMDAwMDAwMDAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMzMKICAgIC8vIHJldHVybiB0aGlzLm1ick5vbmUoKQogICAgZnJhbWVfZGlnIC0yCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMwogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo6Q29sbGVjdGlibGVWYXJpYXRpb25zLmV4cGVjdFBheW1lbnQoYW1vdW50OiB1aW50NjQpIC0+IHZvaWQ6CmV4cGVjdFBheW1lbnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExNDEKICAgIC8vIHByaXZhdGUgZXhwZWN0UGF5bWVudChhbW91bnQ6IHVpbnQ2NCk6IHZvaWQgewogICAgcHJvdG8gMSAwCiAgICBieXRlY18wIC8vICIiCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE0MgogICAgLy8gbGV0IG9rID0gVHhuLmdyb3VwSW5kZXggPiAwCiAgICB0eG4gR3JvdXBJbmRleAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgPgogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMTQzCiAgICAvLyBpZiAob2spIHsKICAgIGJ6IGV4cGVjdFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUAxMAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMTQ0CiAgICAvLyBjb25zdCBpbmRleDogdWludDY0ID0gVHhuLmdyb3VwSW5kZXggLSAxCiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZnJhbWVfYnVyeSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExNDUKICAgIC8vIG9rID0gZ3R4bi5UcmFuc2FjdGlvbihpbmRleCkudHlwZSA9PT0gVHJhbnNhY3Rpb25UeXBlLlBheW1lbnQKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMQogICAgaW50Y18xIC8vIDEKICAgID09CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMTQ2CiAgICAvLyBpZiAob2spIHsKICAgIGJ6IGV4cGVjdFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUAxMAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMTQ3CiAgICAvLyBjb25zdCBwYXltZW50ID0gZ3R4bi5QYXltZW50VHhuKGluZGV4KQogICAgZnJhbWVfZGlnIDEKICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE0OQogICAgLy8gcGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MgJiYKICAgIGZyYW1lX2RpZyAwCiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExNDktMTE1MAogICAgLy8gcGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MgJiYKICAgIC8vIHBheW1lbnQuYW1vdW50ID09PSBhbW91bnQgJiYKICAgIGJ6IGV4cGVjdFBheW1lbnRfYm9vbF9mYWxzZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExNTAKICAgIC8vIHBheW1lbnQuYW1vdW50ID09PSBhbW91bnQgJiYKICAgIGZyYW1lX2RpZyAwCiAgICBndHhucyBBbW91bnQKICAgIGZyYW1lX2RpZyAtMQogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE0OS0xMTUwCiAgICAvLyBwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcyAmJgogICAgLy8gcGF5bWVudC5hbW91bnQgPT09IGFtb3VudCAmJgogICAgYnogZXhwZWN0UGF5bWVudF9ib29sX2ZhbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE1MQogICAgLy8gcGF5bWVudC5jbG9zZVJlbWFpbmRlclRvID09PSBHbG9iYWwuemVyb0FkZHJlc3MgJiYKICAgIGZyYW1lX2RpZyAwCiAgICBndHhucyBDbG9zZVJlbWFpbmRlclRvCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExNDktMTE1MQogICAgLy8gcGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MgJiYKICAgIC8vIHBheW1lbnQuYW1vdW50ID09PSBhbW91bnQgJiYKICAgIC8vIHBheW1lbnQuY2xvc2VSZW1haW5kZXJUbyA9PT0gR2xvYmFsLnplcm9BZGRyZXNzICYmCiAgICBieiBleHBlY3RQYXltZW50X2Jvb2xfZmFsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMTUyCiAgICAvLyBwYXltZW50LnJla2V5VG8gPT09IEdsb2JhbC56ZXJvQWRkcmVzcwogICAgZnJhbWVfZGlnIDAKICAgIGd0eG5zIFJla2V5VG8KICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE0OS0xMTUyCiAgICAvLyBwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcyAmJgogICAgLy8gcGF5bWVudC5hbW91bnQgPT09IGFtb3VudCAmJgogICAgLy8gcGF5bWVudC5jbG9zZVJlbWFpbmRlclRvID09PSBHbG9iYWwuemVyb0FkZHJlc3MgJiYKICAgIC8vIHBheW1lbnQucmVrZXlUbyA9PT0gR2xvYmFsLnplcm9BZGRyZXNzCiAgICBieiBleHBlY3RQYXltZW50X2Jvb2xfZmFsc2VANwogICAgaW50Y18xIC8vIDEKICAgIGZyYW1lX2J1cnkgMgoKZXhwZWN0UGF5bWVudF9hZnRlcl9pZl9lbHNlQDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMTU1CiAgICAvLyBpZiAoIW9rKSB7CiAgICBmcmFtZV9kaWcgMgogICAgYm56IGV4cGVjdFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUAxMgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMTU2CiAgICAvLyBsb2coRGVwb3NpdExvZ1ByZWZpeC5jb25jYXQoaXRvYihhbW91bnQpKSkKICAgIGZyYW1lX2RpZyAtMQogICAgaXRvYgogICAgcHVzaGJ5dGVzICJjdjpkZXBvc2l0OiIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExNTcKICAgIC8vIGxvZ2dlZEVycihlcnJEZXBvc2l0TWlzbWF0Y2gpCiAgICBieXRlYyAyOSAvLyAiRVJSOmVyckN2RG0iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQ3ZEbQoKZXhwZWN0UGF5bWVudF9hZnRlcl9pZl9lbHNlQDEyOgogICAgcmV0c3ViCgpleHBlY3RQYXltZW50X2Jvb2xfZmFsc2VANzoKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9idXJ5IDIKICAgIGIgZXhwZWN0UGF5bWVudF9hZnRlcl9pZl9lbHNlQDEwCgoKLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo6Q29sbGVjdGlibGVWYXJpYXRpb25zLmV4cGVjdE5vUGF5bWVudCgpIC0+IHZvaWQ6CmV4cGVjdE5vUGF5bWVudDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE2MQogICAgLy8gcHJpdmF0ZSBleHBlY3ROb1BheW1lbnQoKTogdm9pZCB7CiAgICBwcm90byAwIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE2MgogICAgLy8gaWYgKFR4bi5ncm91cEluZGV4ID09PSAwKSByZXR1cm4KICAgIHR4biBHcm91cEluZGV4CiAgICBibnogZXhwZWN0Tm9QYXltZW50X2FmdGVyX2lmX2Vsc2VAMgogICAgcmV0c3ViCgpleHBlY3ROb1BheW1lbnRfYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMTYzCiAgICAvLyBjb25zdCBpbmRleDogdWludDY0ID0gVHhuLmdyb3VwSW5kZXggLSAxCiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMTY0CiAgICAvLyBpZiAoZ3R4bi5UcmFuc2FjdGlvbihpbmRleCkudHlwZSAhPT0gVHJhbnNhY3Rpb25UeXBlLlBheW1lbnQpIHJldHVybgogICAgZ3R4bnMgVHlwZUVudW0KICAgIGR1cAogICAgaW50Y18xIC8vIDEKICAgICE9CiAgICBieiBleHBlY3ROb1BheW1lbnRfYWZ0ZXJfaWZfZWxzZUA0CiAgICByZXRzdWIKCmV4cGVjdE5vUGF5bWVudF9hZnRlcl9pZl9lbHNlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExNjUKICAgIC8vIGxvZ2dlZEFzc2VydChndHhuLlBheW1lbnRUeG4oaW5kZXgpLnJlY2VpdmVyICE9PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJyRGVwb3NpdE1pc21hdGNoKQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICAhPQogICAgYm56IGV4cGVjdE5vUGF5bWVudF9hZnRlcl9hc3NlcnRANgogICAgYnl0ZWMgMjkgLy8gIkVSUjplcnJDdkRtIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckN2RG0KCmV4cGVjdE5vUGF5bWVudF9hZnRlcl9hc3NlcnRANjoKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy5yZWZ1bmQodG86IGJ5dGVzLCBhbW91bnQ6IHVpbnQ2NCkgLT4gdm9pZDoKcmVmdW5kOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMTcyCiAgICAvLyBwcml2YXRlIHJlZnVuZCh0bzogQWNjb3VudCwgYW1vdW50OiB1aW50NjQpOiB2b2lkIHsKICAgIHByb3RvIDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMTczCiAgICAvLyBpZiAoYW1vdW50ID09PSAwKSByZXR1cm4KICAgIGZyYW1lX2RpZyAtMQogICAgYm56IHJlZnVuZF9hZnRlcl9pZl9lbHNlQDIKICAgIHJldHN1YgoKcmVmdW5kX2FmdGVyX2lmX2Vsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE3NQogICAgLy8gY29uc3QgW2JhbGFuY2VdID0gb3AuQWNjdFBhcmFtcy5hY2N0QmFsYW5jZSh0bykKICAgIGZyYW1lX2RpZyAtMgogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RCYWxhbmNlCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE3NgogICAgLy8gaWYgKGJhbGFuY2UgPT09IDAgJiYgYW1vdW50IDwgR2xvYmFsLm1pbkJhbGFuY2UpIHJlY2VpdmVyID0gVHhuLnNlbmRlcgogICAgYnogcmVmdW5kX2FuZF9jb250ZEAzCiAgICBmcmFtZV9kaWcgLTIKCnJlZnVuZF9hZnRlcl9pZl9lbHNlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExNzcKICAgIC8vIGl0eG4ucGF5bWVudCh7IHJlY2VpdmVyLCBhbW91bnQsIGZlZTogMCB9KS5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgZnJhbWVfZGlnIC0xCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIHJldHN1YgoKcmVmdW5kX2FuZF9jb250ZEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMTc2CiAgICAvLyBpZiAoYmFsYW5jZSA9PT0gMCAmJiBhbW91bnQgPCBHbG9iYWwubWluQmFsYW5jZSkgcmVjZWl2ZXIgPSBUeG4uc2VuZGVyCiAgICBmcmFtZV9kaWcgLTEKICAgIGdsb2JhbCBNaW5CYWxhbmNlCiAgICA8CiAgICBibnogcmVmdW5kX2lmX2JvZHlANAogICAgZnJhbWVfZGlnIC0yCiAgICBiIHJlZnVuZF9hZnRlcl9pZl9lbHNlQDUKCnJlZnVuZF9pZl9ib2R5QDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExNzYKICAgIC8vIGlmIChiYWxhbmNlID09PSAwICYmIGFtb3VudCA8IEdsb2JhbC5taW5CYWxhbmNlKSByZWNlaXZlciA9IFR4bi5zZW5kZXIKICAgIHR4biBTZW5kZXIKICAgIGIgcmVmdW5kX2FmdGVyX2lmX2Vsc2VANQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy5lbWl0RGVsZXRlZChhc3NldDogdWludDY0LCB3cml0ZXI6IGJ5dGVzLCBzbG90OiBieXRlcywgc3RvcmVkOiBieXRlcywgcmVhc29uOiB1aW50NjQpIC0+IHZvaWQ6CmVtaXREZWxldGVkOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMTgyCiAgICAvLyBwcml2YXRlIGVtaXREZWxldGVkKGFzc2V0OiB1aW50NjQsIHdyaXRlcjogQWNjb3VudCwgc2xvdDogYnl0ZXMsIHN0b3JlZDogYnl0ZXMsIHJlYXNvbjogdWludDY0KTogdm9pZCB7CiAgICBwcm90byA1IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE4NwogICAgLy8gbGFzdFJldmlzaW9uOiBidG9pKHN0b3JlZC5zbGljZShWUmV2aXNpb24sIFZSZXZpc2lvbiArIDgpKSwKICAgIGZyYW1lX2RpZyAtMgogICAgbGVuCiAgICBwdXNoaW50IDQKICAgIGRpZyAxCiAgICA+PQogICAgcHVzaGludCA0CiAgICBkaWcgMgogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIHB1c2hpbnQgMTIKICAgIGRpZyAyCiAgICA+PQogICAgcHVzaGludCAxMgogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgZnJhbWVfZGlnIC0yCiAgICBjb3ZlciAyCiAgICBzdWJzdHJpbmczCiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExODgKICAgIC8vIHJlYXNvbjogbmV3IFVpbnQ4KHJlYXNvbiksCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0b2IKICAgIGR1cAogICAgYml0bGVuCiAgICBpbnRjXzMgLy8gOAogICAgPD0KICAgIGFzc2VydCAvLyBvdmVyZmxvdwogICAgZXh0cmFjdCA3IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE4OQogICAgLy8gcm91bmQ6IEdsb2JhbC5yb3VuZCwKICAgIGdsb2JhbCBSb3VuZAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMTkwCiAgICAvLyB0aW1lc3RhbXA6IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExODMtMTE5MQogICAgLy8gZW1pdDxWYXJpYXRpb25EZWxldGVkPih7CiAgICAvLyAgIGFzc2V0LAogICAgLy8gICB3cml0ZXIsCiAgICAvLyAgIHNsb3QsCiAgICAvLyAgIGxhc3RSZXZpc2lvbjogYnRvaShzdG9yZWQuc2xpY2UoVlJldmlzaW9uLCBWUmV2aXNpb24gKyA4KSksCiAgICAvLyAgIHJlYXNvbjogbmV3IFVpbnQ4KHJlYXNvbiksCiAgICAvLyAgIHJvdW5kOiBHbG9iYWwucm91bmQsCiAgICAvLyAgIHRpbWVzdGFtcDogR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIC8vIH0pCiAgICBmcmFtZV9kaWcgLTUKICAgIGl0b2IKICAgIGZyYW1lX2RpZyAtNAogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgLTMKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIGZyYW1lX2RpZyAtMwogICAgY29uY2F0CiAgICBzd2FwCiAgICBwdXNoYnl0ZXMgMHgwMDQzCiAgICBjb25jYXQKICAgIHVuY292ZXIgNQogICAgaXRvYgogICAgY29uY2F0CiAgICB1bmNvdmVyIDQKICAgIGNvbmNhdAogICAgdW5jb3ZlciAzCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHVuY292ZXIgMgogICAgaXRvYgogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIHB1c2hieXRlcyAweGI0YTRlZGJiIC8vIG1ldGhvZCAiVmFyaWF0aW9uRGVsZXRlZCh1aW50NjQsYWRkcmVzcyxieXRlW10sdWludDY0LHVpbnQ4LHVpbnQ2NCx1aW50NjQpIgogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy5lbWl0TWFpbihhc3NldDogdWludDY0LCByZXZpc2lvbjogdWludDY0LCByb2xlOiB1aW50NjQsIGNsZWFyZWQ6IHVpbnQ2NCkgLT4gdm9pZDoKZW1pdE1haW46CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExOTQKICAgIC8vIHByaXZhdGUgZW1pdE1haW4oYXNzZXQ6IHVpbnQ2NCwgcmV2aXNpb246IHVpbnQ2NCwgcm9sZTogdWludDY0LCBjbGVhcmVkOiBib29sZWFuKTogdm9pZCB7CiAgICBwcm90byA0IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE5OAogICAgLy8gcm9sZTogbmV3IFVpbnQ4KHJvbGUpLAogICAgZnJhbWVfZGlnIC0yCiAgICBpdG9iCiAgICBkdXAKICAgIGJpdGxlbgogICAgaW50Y18zIC8vIDgKICAgIDw9CiAgICBhc3NlcnQgLy8gb3ZlcmZsb3cKICAgIGV4dHJhY3QgNyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMDAKICAgIC8vIHJvdW5kOiBHbG9iYWwucm91bmQsCiAgICBnbG9iYWwgUm91bmQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIwMQogICAgLy8gdGltZXN0YW1wOiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMTk1LTEyMDIKICAgIC8vIGVtaXQ8TWFpbkNoYW5nZWQ+KHsKICAgIC8vICAgYXNzZXQsCiAgICAvLyAgIHJldmlzaW9uLAogICAgLy8gICByb2xlOiBuZXcgVWludDgocm9sZSksCiAgICAvLyAgIGNsZWFyZWQsCiAgICAvLyAgIHJvdW5kOiBHbG9iYWwucm91bmQsCiAgICAvLyAgIHRpbWVzdGFtcDogR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIC8vIH0pCiAgICBmcmFtZV9kaWcgLTQKICAgIGl0b2IKICAgIGZyYW1lX2RpZyAtMwogICAgaXRvYgogICAgY29uY2F0CiAgICB1bmNvdmVyIDMKICAgIGNvbmNhdAogICAgYnl0ZWMgNCAvLyAweDAwCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfZGlnIC0xCiAgICBzZXRiaXQKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgcHVzaGJ5dGVzIDB4OGNhMDViZDkgLy8gbWV0aG9kICJNYWluQ2hhbmdlZCh1aW50NjQsdWludDY0LHVpbnQ4LGJvb2wsdWludDY0LHVpbnQ2NCkiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo6Q29sbGVjdGlibGVWYXJpYXRpb25zLmVtaXRQb2xpY3koYXNzZXQ6IHVpbnQ2NCwgbWFuYWdlcjogYnl0ZXMsIHJldmlzaW9uOiB1aW50NjQsIGZsYWdzOiB1aW50NjQsIGRlbGV0ZWQ6IHVpbnQ2NCkgLT4gdm9pZDoKZW1pdFBvbGljeToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIwNQogICAgLy8gcHJpdmF0ZSBlbWl0UG9saWN5KGFzc2V0OiB1aW50NjQsIG1hbmFnZXI6IEFjY291bnQsIHJldmlzaW9uOiB1aW50NjQsIGZsYWdzOiB1aW50NjQsIGRlbGV0ZWQ6IGJvb2xlYW4pOiB2b2lkIHsKICAgIHByb3RvIDUgMAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMjEwCiAgICAvLyBmbGFnczogbmV3IFVpbnQ4KGZsYWdzKSwKICAgIGZyYW1lX2RpZyAtMgogICAgaXRvYgogICAgZHVwCiAgICBiaXRsZW4KICAgIGludGNfMyAvLyA4CiAgICA8PQogICAgYXNzZXJ0IC8vIG92ZXJmbG93CiAgICBleHRyYWN0IDcgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMjEyCiAgICAvLyByb3VuZDogR2xvYmFsLnJvdW5kLAogICAgZ2xvYmFsIFJvdW5kCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMTMKICAgIC8vIHRpbWVzdGFtcDogR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIwNi0xMjE0CiAgICAvLyBlbWl0PFBvbGljeUNoYW5nZWQ+KHsKICAgIC8vICAgYXNzZXQsCiAgICAvLyAgIG1hbmFnZXIsCiAgICAvLyAgIHJldmlzaW9uLAogICAgLy8gICBmbGFnczogbmV3IFVpbnQ4KGZsYWdzKSwKICAgIC8vICAgZGVsZXRlZCwKICAgIC8vICAgcm91bmQ6IEdsb2JhbC5yb3VuZCwKICAgIC8vICAgdGltZXN0YW1wOiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgLy8gfSkKICAgIGZyYW1lX2RpZyAtNQogICAgaXRvYgogICAgZnJhbWVfZGlnIC00CiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtMwogICAgaXRvYgogICAgY29uY2F0CiAgICB1bmNvdmVyIDMKICAgIGNvbmNhdAogICAgYnl0ZWMgNCAvLyAweDAwCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfZGlnIC0xCiAgICBzZXRiaXQKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgcHVzaGJ5dGVzIDB4YzczNDVjNDIgLy8gbWV0aG9kICJQb2xpY3lDaGFuZ2VkKHVpbnQ2NCxhZGRyZXNzLHVpbnQ2NCx1aW50OCxib29sLHVpbnQ2NCx1aW50NjQpIgogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIHJldHN1Ygo=", "clear": "I3ByYWdtYSB2ZXJzaW9uIDEzCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCiNwcmFnbWEgYXV0b3NhbHQgZmFsc2UKCi8vIEBhbGdvcmFuZGZvdW5kYXRpb24vYWxnb3JhbmQtdHlwZXNjcmlwdC9iYXNlLWNvbnRyYWN0LmQudHM6OkJhc2VDb250cmFjdC5jbGVhclN0YXRlUHJvZ3JhbSgpIC0+IHVpbnQ2NDoKbWFpbjoKICAgIHB1c2hpbnQgMQogICAgcmV0dXJuCg==" }, "byteCode": { "approval": "DSAFAAECCIABJh4ABBUffHUKAAAAAAAAAAAAAAGAAQABbQtFUlI6ZXJyQ3ZCYQtFUlI6ZXJyQ3ZBbQEBAWcLRVJSOmVyckN2TGsBdgtFUlI6ZXJyQ3ZOYQtFUlI6ZXJyQ3ZOYwtFUlI6ZXJyQ3ZTbgFwAXIBYQF0EAAAAAAAAAAAAAAAAAAAAAABaAFjAVALRVJSOmVyckN2QnALRVJSOmVyckN2QnMCAAQLRVJSOmVyckN2TmgERBZZFAkAAAAAAAAAAAALRVJSOmVyckN2RG0xGEAIJxAiZzEZFEQxGEHUAYIOBLGMP5sE5uI7zgRc7EYqBNLn/BsEV7tU9ATP1sJmBEcAx3QEmW3+EgRhCpo2BFRVo5IEpFdCqgQ+ODGzBEhba8IEPMkh+jYaAI4OAEAEpAXXBwoIRQi1CUAKCQpoCrYK1wusDBQN3QCABJR5/2M2GgCOAQABADYaAUkVJRJEF0k2GgJJFSUSRBdMQTBJQSojQAgnBrAAJxFPAmcnEkxnI3YLI0MiQikiRwUoRwg2GgFJFSUSRBdJNhoCSRUlEkQXTgI2GgNJIlkkCEsBFRJEVwIATgI2GgRJTgMVgSASRDYaBUlOAxUjEkQ2GgZJTgMVIxJENhoHSRUjEkQiU04CNhoISSJZJAhLARUSRFcCAE4DNhoJSSJZJAhLARUSRFcCAE4DNhoKSRUlEkQXTgM2GgtJTgJJIllJTgaBIAskCEwVEkSIoDZJTgQiU0AIJwewAEsKMgMTSYMCDi9PAk1FFEsKF0kjEkAMSSQSQa4OI0UUQZoOSwwVSUUSQYgOSxCBFw5B+A1LBYEYDkHoDUsSQQxLCBVB1A0jQAgnBrAASwgVSUURgYAGDkGkDUsTSxAISwgVCIGAIA5BhA0jQB6AC0VSUjplcnJDdlRssABPA0DEDElFFTEASwMWSUUZJwtMUExQSwxQSUUavklOAkUYRRlB9AtLF0kVgQRLAQ+BBEsCTwJNgQxLAg+BDE8DTwJNUhdFEUsDgWlbSxVLC0sLSxRLD08FSw1LDYjWZ0UcSxVBLksbSxgSQSBGA4ikbEsNFipQKUxQsCNDSxVBWksXI1VJRQ8hBBpBQksNIxpBlApLF0mIzmdMgS5VSwRMiNo0QO4JI0AIJwqwAEGmB0sCiO4zRQRBigdLAoFpW0sKSwNPAoiQNEHoBiNACCcasAAxAEsKEkGkA0YCI0AIJwywAEsCgf///////////wESQBZLAkDCAksSFEGuAiNAHoALRVJSOmVyckN2UGawAIjWZksBgWlbSxNJTgNLCklOBUsLSwRLD08FSw1LDYiyZDIKcwFESxpPAojOZScTMQCIjmZITgMxAE8CFkmTJQ5EVwcBMgYyB0saTwRQSw9JFRZXBgJMUEyAAgBEUE8FFkxLAVBPBVBPBVBPBBZQTwMWUE8CUIAEZ2SFG0xQsCtQTFBCtwQiQq0CSxJBFksNSwMSQQgjQtMCIkLbAicJSwpQSUUavklOAkUVTEH2AkkVgQlLAQ+BCUsCTwJNTFJLA1chIEsDTIj6M0lOAkkiWUsBJFlJTgRSVwIAiPY1SSRZSwEVUlcCAExJMQCIiDhBDEYGI0LLBEsBMQCI6jdBDEYGI0LpBEsWQTIxAEsBJwlLH08DTwiIkDlOBUEMRgYjQqMFTwNJFUxPBE8CUlcCADEASwMnFE8DTwNPBojEOEhBDEYDI0LtBUsCMQBLDUsNiPw5QQxGAiNCkwYxAExOAksLSwuI1DlCsQZIJwRC2wIiQucGSwJXISBLAkyIkDFHAiJZSwEkWUlOBFJXAgBJiI4zSSJZSwEkWVJXAgBJTgIxAIicNUEURgYjQKsHJwywACNVIxpBPksESw9LB4jiLEUHSUUeMgMTQRhLHDEAEkEKRgUjQlNMSRVMTwNPAlJXAgAxAEsCJxVPA08DTwWI4DVIQQxGAiNCmQExADIDTwJPA08DSwxPBIiMN0LBASJC7QkiRRFCuQtJIQQZRRVCyQwiQoMNIkLTDSJFFEKtDiIoSTYaAUkVJRJEF0k2GgJJFSUSRBdOAjYaA0lOAhWBIBJENhoESSJZJAhLARUSRFcCAE4DiKYmSU4EIlNACCcHsABLARYnC0xQSwFQSwNQSb5MTgJAGEYFiNJfKilMULAjQ0sBI1VJIQQaRQkjGiJFCjEASwQSQZwBSwhAkgFIJEUJSwhACCcMsAAyCnMBREy8SDIKcwFECYjSXk8CSU4CSwGIhl9PA08CTwRPBEsISU4FiMRfFkmTJQ5EVwcBK0xQTBZQQs8BQVJLAUmI5FlJTwKBLlVLBkyI7CZAEEiBA0UJQr8BMQASQcsBgQRFCULZAUsFVyEgSwRMiLQqSSJZSwEkWVJXAgAjVSEEGkCVAksDSwdLB4jQJkhJRQsyAxNBuwIxAEsKEkHLAoEFRQlC2QIiNhoBSRUlEkQXSTYaAkkVJRJEF04CNhoDSU4CFYEgEkQ2GgRJIlkkCEsBFRJEVwIATgI2GgVJFSUSRBdOBDYaBkkVIxJEIlNMiJghSU4CIlNACCcHsABLBE8HTwOI3iROAklFCDIDE0GIAzEASwcSQfgCI0AIJw2wAEsESwNLBU8IiKJFSSNVIxpBCCcOsABPA08ESwKIrkdMiK5GUE4CSwMWJwVMUL5JTwJMQfYBSSNVTE8DQdYBSwEhBBlOA08CQYYBSwJLAhJBeEkjiJRISwUSQWRFAUUBRQFFAUUBiOBYSRWBA0sBD4EDSwJPAk2BC0sCD4ELTwNPAk1SFxYqUClMULAjQ0ghBBpBCCcKsABMgWlbMQBPBCNOBU4FiLpJQj9LAU4DQs8BIkxC8QEiQvcCNhoBSRUlEkQXSTYaAklOAhWBIBJENhoDSSJZJAhLARUSRFcCAE4DNhoESRUlEkQXTgSI4BxJTgUiU0AIJwewAEsEiIYfRQZB2gNLBEmBYVtMgWlbgQpMlBJBtgMjQB6AC0VSUjplcnJDdlN1sAAxAEsFgWlbSU4DSwRMiNweQAgnGrAASwJLAUsFTweIqEBJI1UjGkFaSYiEUTEAEkAIJw6wAEsFVyEgSwRMiIgiSSJZSwEkWVJXAgAjVSQaQQgnDrAAMQBPAk8FSwOI3kFQTIjcQFBLAhYnBUxQvklPAkxBdEkkiIBDSwMSQWBFAUUBRQFFAYjQU0kVgQNLAQ+BA0sCTwJNgQtLAg+BC08DTwJNUhcWKlApTFCwI0NMQSgjVTEATwQkTwRPBE8FTwWItERCNUgiQiciQrUDNhoBSRUlEkQXSTYaAkkVJRJEF04CiKQYSSJTQAgnB7AASwFJTwRPA4isHkhOAhYnBUxQvkEMSYELWUAYRgOIxlEqKUxQsCNDSSNVIQQaQQgnCrAAMQBOAiNPA4iySEwWSZMlDkRXBwErTFBMFlBCVyg2GgFJFSUSRBdJiNgWIlNACCcHsABJFicFTFC+QQxJgQ1ZQBhGAoiUUCopTFCwI0NHAiSIij9JFSJLAQ8iSwJPAk2BIEsCD4EgTwNPAk1SSU4EgQRFBkwkVUsDTIjCGEA8gQNFBCRPA4i2RksBFkmTJQ5EVwcBK0xQTBZQQqMBMQBLAxJAPScMsAAiKDYaAUkVJRJEF0k2GgJJFSUSRBdMNhoDSSJZJAhLARUSRFcCAE4CNhoESSJZJAhLARUSRFcCAE4CNhoFSRUjEkQiU0w2GgZJFSMSRCJTTDYaB0kVIxJEIlNMiKITSSJTQAgnB7AASwdPBU8CiOwWSElFCTIDE0GWATEASwgSQYYBI0AIJw2wAE4CiK4kRQVBDksDIQQZRQRLAhYnD0xQSwJLAksGiKokSYFAU0EgMgNLASJbSwVOAksHIoiqTylMULAjQyJChQE2GgFJIlkkCEsBFRJEVwIANhoCSSJZJAhLARUSRFcCADYaA0kVIxJEIlM2GgRJFSMSRCJTiMoiSU4DJxYxAFBOA4jiIkmBQFNBHjEASwEiWyJOAksEIojkTSlMULAjQzYaAUkVJRJEF0k2GgJJFSUSRBdMiOAPSSJTQAgnB7AASwJJTwNPA4joFUhMFicPTFAxAE8CI4iyJkkiU0EUSwEyAyJJI4jITClMULAjQycWMQBQMQCBBSOI7iVJIlNBEiIxACJJI4iGTClMULAjQyhJNhoBSSJZJAhLARUSRFcCACcJMQBQSU8CiMYnTgK+SU8CTEF6RwIVSUUHgQlLAQ+BCUsCTwJNSUUJTFJLBBJBQkUBRQFFAYiORyNLAklOAg8jTgJNSwNSFxYqUClMULAjQzIKcwFMTgJETwJBvgFJFYEJSwEPgQlLAk8CTUxSJwlPA0lOAk8DTwVJTgSIzCuI8kIWJwhLAVBPA1BPA0yIoEIxAE8DTwNPAojYQkhMMgYyBzEASwNQJwRQTwIWUEwWUCcbTFCwK1BMUELdAUgnBEKjAScJMQBQSb5AGEYCiN5EKilMULAjQzIKcwFETEkVgQlLAQ+BCUsCTwJNTFInCU8DSU4DTwInBIjSKUy8SDEAiIhBSDEAMgYyByIWTwNMUCtQTwIWUEwWUCcbTFCwVwEIgAKABExQQqsBIihHAjYaAUkiWSQISwEVEkRXAgBJFUmBCQ9ACCcXsAAiSwFJTgIPIksCTwJNI0sCDyNLA08CTUsESU4ETwJLAlJJTgRFCoEJSwIPgQlPA08CTUlFCFIXRQYnCxJJRQRBkAVJgSkNQfoESYFADkHsBCNACCcXsABLBIi+ByJTQR6AC0VSUjplcnJDdkFlsACIhkFLAb5AEEgqKUxQsCNDMgpzAUxOAkRLBEGQAUsDSbxIMgpzAURPA0wJSU4CgSlLBUlOAg+BKUsCTwJNSwNLCksCUklPBIjAQE8DTwJPA1JLCE4CTwQjiPxAFoACgAFMUEKvAUsHJwUSQfwBRwIVgRdLAQ+BF0sCTwJNgR9LAg+BH08DTwJNSwJOAlIXTEsFvEgyCnMBRE8ETAlMgQ1ZQXhPAiSIzC1JFSJLAQ8iSwJPAk2BIEsCD4EgTwNPAk1STwJJTgKIwj4xAEsCTwIJiK4+SwUiSSOIxEBC/wFFAUUBMQBLAYiCPkIrSwNJTwKI2htMvEgyCnMBRE8CTAlMJVsISTEATIjAPUsFMgMiSSOIukBC8QIiQusESwUnBRJADksFJw8SQRxJgQkSQRAjQI8FJxewACJCDyIoSTYaAUkVJRJEF0kWJwVMUL5B5AFJgQ1ZQaABRwIkiOIqSUUHSRVJRQYiSwEPIksCTwJNgSBLAg+BIE8DTwJNSUUIUkwkVUsDTIiWBEE6SEsDSwNLA1JJFRZXBgJMUIADAgADTFApTFCwI0NJgQtZQSojiLopSRUWVwYCTFCAAwEAA0xQQj1IgAUAAAMAAEJRigEBi/9xAEDqAYBxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABMiYv/cQFIi/9xB0iL/3EKSEyL/3ELSCtMUExQTFBPAhZQTBZQiYoBAov/gWlbSYETDkEmi/+BYVuBCosAlA9BDCOL/08CiSJCC4oDASiL/TIDEkAOi/+BEw1BBiJMiYv9i/5wAEyMAEEagQqL/5SLAA5BBiNMiSJCBYoDAov+QBCL/1chIIv/iYv+cghMSU8CRIv/V0EgEkAIJxiwAIv/VyEgEkAIJxiwALGL/bIwgATOLwXzshonBLIai/6yGIEGshAisgGztD5JFUmBOQ9BigEiSwFJTgIPIksCTwJNgQRLAg+BBE8DTwJNSwNOAlIpEkFGI0AIJxiwAIEZSwEPgRlLAk8CTYE5SwIPgTlPA08CTVKL/4kiQkWKAwKL/Yv+i/+I0QKM/0kyAxNBHDEAEkAIJw2wAIEFi/+JSDEAi/9XASASQAgnDbAAgQaL/4mKAgEiSYv+FicPTFBJvkFQSRUWVwYCTFBJFYEECE8CSRUWVwYCTFBMFlcGAicZTFBPAlBMUIwAiUYCi/8yAxNBcCcWi/9QSYwAvkyMAUFUiwFJFRZXBgJMUEkVgQQIiwBJFRZXBgJMUEwWVwYCJxlMUE8CUExQjACJgBQABAASAAwBAQAAAAAAAAAAAAAAAIwAiYoBAYv/FYEKSwEPgQpLAk8CTYv/TE8CUkkVIksBDyJLAk8CTUsCiIwBSUsDD0sDTE1LA04CUkkVSUsDD0sBSwRPAk1PBExPBFJMFlcGAk8CUEkVgQQISwIVFlcGAk8DUEwWVwYCJxlMUE8CUExQiYoBAYv/IlVJJBJBFov/I1WBIAskCEyJSYEDEkEIgQlMiYEEEkEGgSGJI4mKAgEoSYv+IlVJIxJBCCOMAIkkEkGmAYv+I1WMASKMAIsAiwEMQYQBi/4VgSCLAAskSwEISUsDD0sDTE2BIk8CCElLAw9MTwNPAk1JSwIMSwJMTYv+TgJSi/8SQQgjjACJiwAjCIwAQo0BIowAiYoFAov7IlWBBBNACov9FUAIIov/ibEyCov8i/2Iog5JFRZXBgJMUIv+AQEiJxJlRBYiJxFlRLIYgAQr88xashpPA7IaTwKyGkyyGov/shqyGoEGshAisgGztD5JVwQATFcABCkSREkVIxJEIlOL/4mKBQEiKIv7IlWBAxNBCCKMAImxi/sVI0sBDyNLAk8CTYEJSwIPgQlPA08CTYv7TgJSF4v8Fov+FRZRBgiL/lCABHFzdoGyGkyyGov9shqyGov/shqyGIEGshAisgGztD5JjAAVSYwBgQUSQWAiiwFJTgIPIksCTwJNgQRLAg+BBE8DTwJNiwBOAlIpEkEciwCBBFUhBBJBCCOMAIkiQgeKAgEii/5BBiOMAIv/QQyLACQZjACLAEyJigQBKEmL/YieB4v+iJQHUIv8vklPAkxBeEkjVYv/EkFoRwIVSYwBgQpLAQ+BCksCTwJNSYwATFJLAxJBMIjWJiSLAUlOAg8kTgJNiwBSFxYqUIwAiUsBQRJJI1UhBBpArAMjQAgnCrAAMgpzAUxOAkRPAkHkAojLCoAKAQAAAAAAAAAAAE8DSU4CUIj1Ck8CSSJZSwEkWUsCTwJLAlJXAgBLAyJZSwQkWUsFTwJLAlJXAgAnFYv8TwRPA4ikCksDFU8ETwRPAlJXAgBLAxVPBE8ETwJSVwIAJxSL/E8DTwOI2gmIgCGL/xZRBwgnCExQTBZMSwFQTwRQi/xMiJogSwIiW0sCIlsITwMlW08DJVsITBZMFlAxAE8DTgKIqCBITCtQTFCMAIlIgAoABAAHAAEAAAEAQvcCIkKrA4oEAYv8vkAMiMgiKkyJi/9BGEkjVSEEGkEIJwqwADIKcwFEi/xPAohAi/y8SIv9iIofSIv+FkmTJQ5EVwcBTFcBCCtPAlBMUImKAgGL/4jzDkkiWUsBJFlLAk8CSwJSVwIASwIVTwNPA08CUlcCACcVi/5PAycEiLQGJxSL/k8DJwSIngZLASJbSwEiWwhPAiVbTwIlWwhMFkwWUImKAQEoi/8VSUAIJwawAIv/IlVJgQQOQAgnBrAASSQSQT6LASQPQYYCi/8jVUmMAEHyAYsAJQ5B5AEjQAgnBrAAi/+Itw+LARJACCcGsABJgQMSQUojiwFJTgIPI0sCTwJNgQlLAg+BCU8DTwJNi/9OAlIXQAgnBrAAgQQSQVAjiwFJTgIPI0sCTwJNgSFLAg+BIU8DTwJNi/9OAlKBIK8TQAgnBrAAi/+MAIkiQuMBigIBKEmL/wFRABIii/5LAYESDEHeAksCSRVPA0lOAksBD0sCSwJPAk1PAoEDCElOBUlLAw9MTwNPAk1JSwIMSwJMTVIXjACBGIwBiwFBfYsBgQYJSYwBiwBMkYE/GkmBQA9LAYFATwJNTCMISYFAD4FATE1JSwIMSwJMTYBAQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODktX04CUlBC7QGMAImKBAEiKIv+IlWBBBJJi/8iVYEEEkxAEElACicTjACJi/yL/YjVA4wAIicRZUyMAURMQbQBSUGsAUiL/ov/E0GQAbGLAEkVFlcGAkxQi/8VI0sBDyNLAk8CTYEhSwIPgSFPA08CTYv/TgJSSRWBIBJEiwGyGIAExtPXBLIaTLIashqBBrIQIrIBsycTjACJQbICsYsASRUWVwYCTFCLAUlOArIYgARyslmBshpJshqBBrIQIrIBs7Q+SVcEAExXAAQpEkRJFSUSRBexSwJyCERLAbIIsgcjshAisgG2i/8VI0sBDyNLAk8CTYEhSwIPgSFPA08CTYv/TgJSSRWBIBJEIicSZUQWTwSyGIAEokwGfLIaTwOyGkyyGrIagQayECKyAbMWIhZQjACJMgpzAESxiwBJFRZXBgJMUIsBshiABN8oen2yGrIagQayECKyAbMyCnMAREwJIhZMFlCMAImKBAGL/BYnC0xQi/1Qi/5QvkAegAtFUlI6ZXJyQ3ZTbbAARwIVgQRLAQ+BBEsCTwJNgQxLAg+BDE8DTwJNUheL/xJAHoALRVJSOmVyckN2U2OwAEmBDFlACCcOsACJigEBi/8jVSMagwIOL08CTYv/FUoPSwJLAk8CTYv/gQxZTwMISUsDD0xPA08CTUlLAgxLAkxNi/9OAlKJigMBi/4VSRZRBwiL/UxQgRdPAgmvi/5MUFCL/xWBBEsBD4EESwJPAk2BDEsCD4EMSwNPAk2L/0sCTwJSTwNMUCRLAw8kSwRPAk2BA0sED4EDTwVPAk2L/08CSwJSTwJMUIv/TwJPA1JQiYoCAYv+gQtZi/8jEkFYi/4VgR9LAQ+BH0sCTwJNgR9PAwhJSwMPTE8DTwJNSUsCDEsCTE2L/k4CUomL/hWBH08CCElLAg9LAUsDTwJNi/6BDVlPAghJSwMPTE8DTwJNSUsCDEsCTE2L/k4CUomKBwGL+RZRBwgnCExQi/oWUQcIUIv7FlCL/BUWUQYIUIv9FRZRBghQi/4WUIv/FlCL/FCL/VCJigYBIihJi/oWJwVMUEm+TE4CKE4CKE4CIk4CIk4CQYgBiwNJI4iRA4wESSSInwOMBUkVgQ9LAQ+BD0sCTwJNgRdLAg+BF0sDTwJNSwNPAksCUheMBoEfSwIPgR9PA08CTVIXjAeL+yMSSYsHiwZPAk2L+yQSQIoDi/9LAkHuAov8jASIkglJTgMyCnMBTElOA4wCRIv9i/5PAosEiwWLBosHiLEDTwZJTwKIkAgyCnMBTElOAowBREsECE8CCUlOA4MCFw9PCE1MFklOBLsnHIwASYv/E0FETwOItgtMiIwJJwhMUIwAi/pLAYv7Ioi0DRYrUIsAUIwAiUYEiwGLAg1BJIsBiwIJSYi2CBYnCExQjABCV4j4CYsCiwENQWuLAosBCYv/SwGImgoWgAH/TFCMAEKXAYv8jAVC7QKLBRVJQAxIi/9ClwMiSwEPIksCTwJNgSBLAg+BIE8DTwJNiwVOAlJC0wOKBAGL/BYnBUxQi/4jEkkjJE8CTUlOA4v9TIjJCElOA4iUCDIKcwFMTgJEFUA6RQFMvEgyCnMBRAmL/0sBiKIIi/wiSSOIuAqMAImL/RWBD0sBD4EPSwJPAk2BF0sCD4EXSwNPAk2L/U8CSwJSF4EfSwMPgR9PBE8CTYv9TwNPAlIXCE4EiMADTgRLAUG8ASJPAkGOAYv9JFVLBShPBiJJiPsITwJJTwKIxgIyCnMBRE8CTAlPBCMSgwIXD08CTU8ESwIJFk8DTgK7i/9LAYiABov8TwKL/iOIkgiJi/0kVUsFTwUoIkmIiQpCjQGL/SNVQsEBiggBi/gWUQcIJwhMUIv5UIv6UIv7FlCL/hUWUQYIUIv4IxpBFIv8UIv9FlEHCFCL/lCL/1CJigEBi/8VgQ5LAQ+BDksCTwJNgS5LAg+BLk8DTwJNi/9OAlKJigIAi/69QRiL/xWLABNBCIv+vEiL/ov/v4kiJxBlRCMIJxBLAWeJigMCMgpzAUSL/iJbCEmL/iVbi/0ISU4CDUEYCUmIWBYnCExQi/6JiJwCSUsCDUEkTAmL/0sBiMYCFoAB/0xQi/6JJxyL/k8DTwOJigEAKEkxFkkiDUxBfjEWIwlJjAA4EEmMASMSSYwCQViLASMSRIsAOAcyChJBdIsAOAiL/xJBYosAOAkyAxJBUIsAOCAyAxJBPiOMAosCQC6L/xaAC2N2OmRlcG9zaXQ6TFCwJx2wAIkijAJCPYoAADEWQAKJMRYjCUk4EEkjE0ECiSMSRDgHMgoTQAgnHbAAiYoCAIv/QAKJi/5zAEhBIov+sYv/sgiyByOyECKyAbOJi/8yAQxACIv+Qi8xAEI3igUAi/4VgQRLAQ+BBEsCTwJNgQxLAg+BDE8DTwJNi/5OAlIXi/8WSZMlDkRXBwEyBjIHi/sWi/xQi/0VFlcGAov9UEyAAgBDUE8FFlBPBFBPAxZQTwIWUExQgAS0pO27TFCwiYoEAIv+FkmTJQ5EVwcBMgYyB4v8Fov9FlBPA1AnBCKL/1RQTwIWUEwWUIAEjKBb2UxQsImKBQCL/hZJkyUORFcHATIGMgeL+xaL/FCL/RZQTwNQJwQii/9UUE8CFlBMFlCABMc0XEJMULCJ", "clear": "DYEBQw==" }, "events": [{ "name": "VariationWritten", "args": [{ "type": "uint64", "name": "asset" }, { "type": "address", "name": "writer" }, { "type": "byte[]", "name": "slot" }, { "type": "uint64", "name": "revision" }, { "type": "uint8", "name": "flags" }, { "type": "uint8", "name": "kind" }, { "type": "uint64", "name": "round" }, { "type": "uint64", "name": "timestamp" }] }, { "name": "VariationDeleted", "args": [{ "type": "uint64", "name": "asset" }, { "type": "address", "name": "writer" }, { "type": "byte[]", "name": "slot" }, { "type": "uint64", "name": "lastRevision" }, { "type": "uint8", "name": "reason" }, { "type": "uint64", "name": "round" }, { "type": "uint64", "name": "timestamp" }] }, { "name": "MainChanged", "args": [{ "type": "uint64", "name": "asset" }, { "type": "uint64", "name": "revision" }, { "type": "uint8", "name": "role" }, { "type": "bool", "name": "cleared" }, { "type": "uint64", "name": "round" }, { "type": "uint64", "name": "timestamp" }] }, { "name": "PolicyChanged", "args": [{ "type": "uint64", "name": "asset" }, { "type": "address", "name": "manager" }, { "type": "uint64", "name": "revision" }, { "type": "uint8", "name": "flags" }, { "type": "bool", "name": "deleted" }, { "type": "uint64", "name": "round" }, { "type": "uint64", "name": "timestamp" }] }, { "name": "GrantChanged", "args": [{ "type": "address", "name": "holder" }, { "type": "uint64", "name": "revision" }, { "type": "bool", "name": "deleted" }, { "type": "uint64", "name": "round" }, { "type": "uint64", "name": "timestamp" }] }], "templateVariables": {} };
var CollectibleVariationsParamsFactory = class _CollectibleVariationsParamsFactory {
  /**
   * Gets available create ABI call param factories
   */
  static get create() {
    return {
      _resolveByMethod(params) {
        switch (params.method) {
          case "create":
          case "create(uint64,uint64)void":
            return _CollectibleVariationsParamsFactory.create.create(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs create ABI call params for the CollectibleVariations smart contract using the create(uint64,uint64)void ABI method
       *
       * @param params Parameters for the call
       * @returns An `AppClientMethodCallParams` object for the call
       */
      create(params) {
        return {
          ...params,
          method: "create(uint64,uint64)void",
          args: Array.isArray(params.args) ? params.args : [params.args.metaApp, params.args.metaTreeType]
        };
      }
    };
  }
  /**
     * Constructs a no op call for the arcTBD_write_variation(uint64,uint64,byte[],address,uint8,uint8,bool,byte[],byte[],uint64,byte[32][])(uint64,bool,(uint8,uint64)) ABI method
     *
    * Create or replace the sender's variation (asset, sender, slot). `holder` zero means
    collectible scope, otherwise holder scope bound to `holder`. `proof` is used only by meta
    writer sets.
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static arcTbdWriteVariation(params) {
    return {
      ...params,
      method: "arcTBD_write_variation(uint64,uint64,byte[],address,uint8,uint8,bool,byte[],byte[],uint64,byte[32][])(uint64,bool,(uint8,uint64))",
      args: Array.isArray(params.args) ? params.args : [params.args.asset, params.args.controllingApp, params.args.slot, params.args.holder, params.args.kind, params.args.sub, params.args.lock, params.args.flat, params.args.body, params.args.ifRevision, params.args.proof]
    };
  }
  /**
     * Constructs a no op call for the arcTBD_delete_variation(uint64,uint64,address,byte[])(bool,uint8,uint64) ABI method
     *
    * Delete variation (asset, writer, slot) of an existing asset. The first authority that applies
    is used and reported: writer (unlocked), void, holder, creator (unlocked policy).
    The refund goes to the writer.
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static arcTbdDeleteVariation(params) {
    return {
      ...params,
      method: "arcTBD_delete_variation(uint64,uint64,address,byte[])(bool,uint8,uint64)",
      args: Array.isArray(params.args) ? params.args : [params.args.asset, params.args.controllingApp, params.args.writer, params.args.slot]
    };
  }
  /**
   * Constructs a no op call for the arcTBD_pin_main_creator(uint64,uint64,address,byte[],uint64,bool)(uint64,bool,(uint8,uint64)) ABI method
   *
   * Pin a collectible-scope variation as the creator's main image. The pin is a snapshot of its flat image.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static arcTbdPinMainCreator(params) {
    return {
      ...params,
      method: "arcTBD_pin_main_creator(uint64,uint64,address,byte[],uint64,bool)(uint64,bool,(uint8,uint64))",
      args: Array.isArray(params.args) ? params.args : [params.args.asset, params.args.controllingApp, params.args.writer, params.args.slot, params.args.sourceRevision, params.args.lock]
    };
  }
  /**
   * Constructs a no op call for the arcTBD_pin_main_holder(uint64,address,byte[],uint64)(uint64,bool,(uint8,uint64)) ABI method
   *
   * Pin a variation as the holder's main image. Only single-unit assets. The next transfer voids it.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static arcTbdPinMainHolder(params) {
    return {
      ...params,
      method: "arcTBD_pin_main_holder(uint64,address,byte[],uint64)(uint64,bool,(uint8,uint64))",
      args: Array.isArray(params.args) ? params.args : [params.args.asset, params.args.writer, params.args.slot, params.args.sourceRevision]
    };
  }
  /**
   * Constructs a no op call for the arcTBD_unpin_main_creator(uint64,uint64)(bool,uint8,uint64) ABI method
   *
   * Clear the creator section. The resolved creator, or the AssetCreator when none resolves (I12).
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static arcTbdUnpinMainCreator(params) {
    return {
      ...params,
      method: "arcTBD_unpin_main_creator(uint64,uint64)(bool,uint8,uint64)",
      args: Array.isArray(params.args) ? params.args : [params.args.asset, params.args.controllingApp]
    };
  }
  /**
   * Constructs a no op call for the arcTBD_unpin_main_holder(uint64)(bool,uint8,uint64) ABI method
   *
   * Clear the holder section. Its holder, or anyone once it is void. Refunded to the holder in it.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static arcTbdUnpinMainHolder(params) {
    return {
      ...params,
      method: "arcTBD_unpin_main_holder(uint64)(bool,uint8,uint64)",
      args: Array.isArray(params.args) ? params.args : [params.args.asset]
    };
  }
  /**
   * Constructs a no op call for the arcTBD_set_asset_policy(uint64,uint64,byte[],byte[],bool,bool,bool)(uint64,bool,(uint8,uint64)) ABI method
   *
   * Set the policy of one asset. It overrides the manager policy. `lock` is one way.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static arcTbdSetAssetPolicy(params) {
    return {
      ...params,
      method: "arcTBD_set_asset_policy(uint64,uint64,byte[],byte[],bool,bool,bool)(uint64,bool,(uint8,uint64))",
      args: Array.isArray(params.args) ? params.args : [params.args.asset, params.args.controllingApp, params.args.collectible, params.args.holder, params.args.managerWrites, params.args.holderPinsCollectibleOnly, params.args.lock]
    };
  }
  /**
   * Constructs a no op call for the arcTBD_set_manager_policy(byte[],byte[],bool,bool)(uint64,bool,(uint8,uint64)) ABI method
   *
   * Set the policy of every asset whose ASA manager field is the sender. It has no lock.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static arcTbdSetManagerPolicy(params) {
    return {
      ...params,
      method: "arcTBD_set_manager_policy(byte[],byte[],bool,bool)(uint64,bool,(uint8,uint64))",
      args: Array.isArray(params.args) ? params.args : [params.args.collectible, params.args.holder, params.args.managerWrites, params.args.holderPinsCollectibleOnly]
    };
  }
  /**
   * Constructs a no op call for the arcTBD_delete_asset_policy(uint64,uint64)(bool,uint8,uint64) ABI method
   *
   * Delete an unlocked asset policy. The resolved creator, or the AssetCreator when none resolves (I12).
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static arcTbdDeleteAssetPolicy(params) {
    return {
      ...params,
      method: "arcTBD_delete_asset_policy(uint64,uint64)(bool,uint8,uint64)",
      args: Array.isArray(params.args) ? params.args : [params.args.asset, params.args.controllingApp]
    };
  }
  /**
   * Constructs a no op call for the arcTBD_delete_manager_policy()(bool,uint8,uint64) ABI method
   *
   * Delete the sender's manager policy.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static arcTbdDeleteManagerPolicy(params) {
    return {
      ...params,
      method: "arcTBD_delete_manager_policy()(bool,uint8,uint64)",
      args: Array.isArray(params.args) ? params.args : []
    };
  }
  /**
   * Constructs a no op call for the arcTBD_set_grant(byte[])(uint64,bool,(uint8,uint64)) ABI method
   *
   * Writers the sender admits for holder-scope entries bound to the sender, on anything the sender holds.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static arcTbdSetGrant(params) {
    return {
      ...params,
      method: "arcTBD_set_grant(byte[])(uint64,bool,(uint8,uint64))",
      args: Array.isArray(params.args) ? params.args : [params.args.writers]
    };
  }
  /**
   * Constructs a no op call for the arcTBD_delete_grant()(bool,uint8,uint64) ABI method
   *
   * Delete the sender's grant. Entries it admitted stay; the holder removes them separately.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static arcTbdDeleteGrant(params) {
    return {
      ...params,
      method: "arcTBD_delete_grant()(bool,uint8,uint64)",
      args: Array.isArray(params.args) ? params.args : []
    };
  }
  /**
     * Constructs a no op call for the arcTBD_purge(byte[])(bool,uint8,uint64) ABI method
     *
    * Delete one `v`, `m` or `p` box of a destroyed asset (I11). Anyone may call. `v` refunds the
    writer in the name; `m` refunds the holder section's deposit to its holder and the rest to the
    caller; `p` refunds the caller (no creator resolves after destroy, as in ARC-89).
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static arcTbdPurge(params) {
    return {
      ...params,
      method: "arcTBD_purge(byte[])(bool,uint8,uint64)",
      args: Array.isArray(params.args) ? params.args : [params.args.name]
    };
  }
  /**
     * Constructs a no op call for the arcTBD_get_main(uint64)(uint8,byte[]) ABI method
     *
    * The pin that applies: a valid holder pin, else the creator pin, else role 0. `pin` is the
    section's PinCore followed by its flat image (the holder's address is dropped).
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static arcTbdGetMain(params) {
    return {
      ...params,
      method: "arcTBD_get_main(uint64)(uint8,byte[])",
      args: Array.isArray(params.args) ? params.args : [params.args.asset]
    };
  }
};
var CollectibleVariationsFactory = (_class = class {
  /**
   * The underlying `AppFactory` for when you want to have more flexibility
   */
  
  /**
   * Creates a new instance of `CollectibleVariationsFactory`
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
    return new CollectibleVariationsClient(this.appFactory.getAppClientById(params));
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
    return new CollectibleVariationsClient(await this.appFactory.getAppClientByCreatorAndName(params));
  }
  /**
   * Idempotently deploys the CollectibleVariations smart contract.
   *
   * @param params The arguments for the contract calls and any additional parameters for the call
   * @returns The deployment result
   */
  async deploy(params = {}) {
    var _a;
    const result = await this.appFactory.deploy({
      ...params,
      createParams: ((_a = params.createParams) == null ? void 0 : _a.method) ? CollectibleVariationsParamsFactory.create._resolveByMethod(params.createParams) : params.createParams ? params.createParams : void 0
    });
    return { result: result.result, appClient: new CollectibleVariationsClient(result.appClient) };
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
       * Creates a new instance of the CollectibleVariations smart contract using the create(uint64,uint64)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create params
       */
      create: (params) => {
        return this.appFactory.params.create(CollectibleVariationsParamsFactory.create.create(params));
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
       * Creates a new instance of the CollectibleVariations smart contract using the create(uint64,uint64)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create transaction
       */
      create: (params) => {
        return this.appFactory.createTransaction.create(CollectibleVariationsParamsFactory.create.create(params));
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
       * Creates a new instance of the CollectibleVariations smart contract using an ABI method call using the create(uint64,uint64)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create result
       */
      create: async (params) => {
        const result = await this.appFactory.send.create(CollectibleVariationsParamsFactory.create.create(params));
        return { result: { ...result.result, return: result.result.return }, appClient: new CollectibleVariationsClient(result.appClient) };
      }
    }
  }}
}, _class);
var CollectibleVariationsClient = (_class2 = class _CollectibleVariationsClient {
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
   * Returns a new `CollectibleVariationsClient` client, resolving the app by creator address and name
   * using AlgoKit app deployment semantics (i.e. looking for the app creation transaction note).
   * @param params The parameters to create the app client
   */
  static async fromCreatorAndName(params) {
    return new _CollectibleVariationsClient(await _appclient.AppClient.fromCreatorAndName({ ...params, appSpec: APP_SPEC }));
  }
  /**
   * Returns an `CollectibleVariationsClient` instance for the current network based on
   * pre-determined network-specific app IDs specified in the ARC-56 app spec.
   *
   * If no IDs are in the app spec or the network isn't recognised, an error is thrown.
   * @param params The parameters to create the app client
   */
  static async fromNetwork(params) {
    return new _CollectibleVariationsClient(await _appclient.AppClient.fromNetwork({ ...params, appSpec: APP_SPEC }));
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
     * Makes a clear_state call to an existing instance of the CollectibleVariations smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.params.bare.clearState(params);
    },
    /**
         * Makes a call to the CollectibleVariations smart contract using the `arcTBD_write_variation(uint64,uint64,byte[],address,uint8,uint8,bool,byte[],byte[],uint64,byte[32][])(uint64,bool,(uint8,uint64))` ABI method.
         *
        * Create or replace the sender's variation (asset, sender, slot). `holder` zero means
        collectible scope, otherwise holder scope bound to `holder`. `proof` is used only by meta
        writer sets.
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    arcTbdWriteVariation: (params) => {
      return this.appClient.params.call(CollectibleVariationsParamsFactory.arcTbdWriteVariation(params));
    },
    /**
         * Makes a call to the CollectibleVariations smart contract using the `arcTBD_delete_variation(uint64,uint64,address,byte[])(bool,uint8,uint64)` ABI method.
         *
        * Delete variation (asset, writer, slot) of an existing asset. The first authority that applies
        is used and reported: writer (unlocked), void, holder, creator (unlocked policy).
        The refund goes to the writer.
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    arcTbdDeleteVariation: (params) => {
      return this.appClient.params.call(CollectibleVariationsParamsFactory.arcTbdDeleteVariation(params));
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `arcTBD_pin_main_creator(uint64,uint64,address,byte[],uint64,bool)(uint64,bool,(uint8,uint64))` ABI method.
     *
     * Pin a collectible-scope variation as the creator's main image. The pin is a snapshot of its flat image.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    arcTbdPinMainCreator: (params) => {
      return this.appClient.params.call(CollectibleVariationsParamsFactory.arcTbdPinMainCreator(params));
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `arcTBD_pin_main_holder(uint64,address,byte[],uint64)(uint64,bool,(uint8,uint64))` ABI method.
     *
     * Pin a variation as the holder's main image. Only single-unit assets. The next transfer voids it.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    arcTbdPinMainHolder: (params) => {
      return this.appClient.params.call(CollectibleVariationsParamsFactory.arcTbdPinMainHolder(params));
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `arcTBD_unpin_main_creator(uint64,uint64)(bool,uint8,uint64)` ABI method.
     *
     * Clear the creator section. The resolved creator, or the AssetCreator when none resolves (I12).
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    arcTbdUnpinMainCreator: (params) => {
      return this.appClient.params.call(CollectibleVariationsParamsFactory.arcTbdUnpinMainCreator(params));
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `arcTBD_unpin_main_holder(uint64)(bool,uint8,uint64)` ABI method.
     *
     * Clear the holder section. Its holder, or anyone once it is void. Refunded to the holder in it.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    arcTbdUnpinMainHolder: (params) => {
      return this.appClient.params.call(CollectibleVariationsParamsFactory.arcTbdUnpinMainHolder(params));
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `arcTBD_set_asset_policy(uint64,uint64,byte[],byte[],bool,bool,bool)(uint64,bool,(uint8,uint64))` ABI method.
     *
     * Set the policy of one asset. It overrides the manager policy. `lock` is one way.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    arcTbdSetAssetPolicy: (params) => {
      return this.appClient.params.call(CollectibleVariationsParamsFactory.arcTbdSetAssetPolicy(params));
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `arcTBD_set_manager_policy(byte[],byte[],bool,bool)(uint64,bool,(uint8,uint64))` ABI method.
     *
     * Set the policy of every asset whose ASA manager field is the sender. It has no lock.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    arcTbdSetManagerPolicy: (params) => {
      return this.appClient.params.call(CollectibleVariationsParamsFactory.arcTbdSetManagerPolicy(params));
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `arcTBD_delete_asset_policy(uint64,uint64)(bool,uint8,uint64)` ABI method.
     *
     * Delete an unlocked asset policy. The resolved creator, or the AssetCreator when none resolves (I12).
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    arcTbdDeleteAssetPolicy: (params) => {
      return this.appClient.params.call(CollectibleVariationsParamsFactory.arcTbdDeleteAssetPolicy(params));
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `arcTBD_delete_manager_policy()(bool,uint8,uint64)` ABI method.
     *
     * Delete the sender's manager policy.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    arcTbdDeleteManagerPolicy: (params = { args: [] }) => {
      return this.appClient.params.call(CollectibleVariationsParamsFactory.arcTbdDeleteManagerPolicy(params));
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `arcTBD_set_grant(byte[])(uint64,bool,(uint8,uint64))` ABI method.
     *
     * Writers the sender admits for holder-scope entries bound to the sender, on anything the sender holds.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    arcTbdSetGrant: (params) => {
      return this.appClient.params.call(CollectibleVariationsParamsFactory.arcTbdSetGrant(params));
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `arcTBD_delete_grant()(bool,uint8,uint64)` ABI method.
     *
     * Delete the sender's grant. Entries it admitted stay; the holder removes them separately.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    arcTbdDeleteGrant: (params = { args: [] }) => {
      return this.appClient.params.call(CollectibleVariationsParamsFactory.arcTbdDeleteGrant(params));
    },
    /**
         * Makes a call to the CollectibleVariations smart contract using the `arcTBD_purge(byte[])(bool,uint8,uint64)` ABI method.
         *
        * Delete one `v`, `m` or `p` box of a destroyed asset (I11). Anyone may call. `v` refunds the
        writer in the name; `m` refunds the holder section's deposit to its holder and the rest to the
        caller; `p` refunds the caller (no creator resolves after destroy, as in ARC-89).
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    arcTbdPurge: (params) => {
      return this.appClient.params.call(CollectibleVariationsParamsFactory.arcTbdPurge(params));
    },
    /**
         * Makes a call to the CollectibleVariations smart contract using the `arcTBD_get_main(uint64)(uint8,byte[])` ABI method.
         *
         * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
         *
        * The pin that applies: a valid holder pin, else the creator pin, else role 0. `pin` is the
        section's PinCore followed by its flat image (the holder's address is dropped).
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    arcTbdGetMain: (params) => {
      return this.appClient.params.call(CollectibleVariationsParamsFactory.arcTbdGetMain(params));
    }
  }}
  /**
   * Create transactions for the current app
   */
  __init5() {this.createTransaction = {
    /**
     * Makes a clear_state call to an existing instance of the CollectibleVariations smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.createTransaction.bare.clearState(params);
    },
    /**
         * Makes a call to the CollectibleVariations smart contract using the `arcTBD_write_variation(uint64,uint64,byte[],address,uint8,uint8,bool,byte[],byte[],uint64,byte[32][])(uint64,bool,(uint8,uint64))` ABI method.
         *
        * Create or replace the sender's variation (asset, sender, slot). `holder` zero means
        collectible scope, otherwise holder scope bound to `holder`. `proof` is used only by meta
        writer sets.
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    arcTbdWriteVariation: (params) => {
      return this.appClient.createTransaction.call(CollectibleVariationsParamsFactory.arcTbdWriteVariation(params));
    },
    /**
         * Makes a call to the CollectibleVariations smart contract using the `arcTBD_delete_variation(uint64,uint64,address,byte[])(bool,uint8,uint64)` ABI method.
         *
        * Delete variation (asset, writer, slot) of an existing asset. The first authority that applies
        is used and reported: writer (unlocked), void, holder, creator (unlocked policy).
        The refund goes to the writer.
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    arcTbdDeleteVariation: (params) => {
      return this.appClient.createTransaction.call(CollectibleVariationsParamsFactory.arcTbdDeleteVariation(params));
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `arcTBD_pin_main_creator(uint64,uint64,address,byte[],uint64,bool)(uint64,bool,(uint8,uint64))` ABI method.
     *
     * Pin a collectible-scope variation as the creator's main image. The pin is a snapshot of its flat image.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    arcTbdPinMainCreator: (params) => {
      return this.appClient.createTransaction.call(CollectibleVariationsParamsFactory.arcTbdPinMainCreator(params));
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `arcTBD_pin_main_holder(uint64,address,byte[],uint64)(uint64,bool,(uint8,uint64))` ABI method.
     *
     * Pin a variation as the holder's main image. Only single-unit assets. The next transfer voids it.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    arcTbdPinMainHolder: (params) => {
      return this.appClient.createTransaction.call(CollectibleVariationsParamsFactory.arcTbdPinMainHolder(params));
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `arcTBD_unpin_main_creator(uint64,uint64)(bool,uint8,uint64)` ABI method.
     *
     * Clear the creator section. The resolved creator, or the AssetCreator when none resolves (I12).
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    arcTbdUnpinMainCreator: (params) => {
      return this.appClient.createTransaction.call(CollectibleVariationsParamsFactory.arcTbdUnpinMainCreator(params));
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `arcTBD_unpin_main_holder(uint64)(bool,uint8,uint64)` ABI method.
     *
     * Clear the holder section. Its holder, or anyone once it is void. Refunded to the holder in it.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    arcTbdUnpinMainHolder: (params) => {
      return this.appClient.createTransaction.call(CollectibleVariationsParamsFactory.arcTbdUnpinMainHolder(params));
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `arcTBD_set_asset_policy(uint64,uint64,byte[],byte[],bool,bool,bool)(uint64,bool,(uint8,uint64))` ABI method.
     *
     * Set the policy of one asset. It overrides the manager policy. `lock` is one way.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    arcTbdSetAssetPolicy: (params) => {
      return this.appClient.createTransaction.call(CollectibleVariationsParamsFactory.arcTbdSetAssetPolicy(params));
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `arcTBD_set_manager_policy(byte[],byte[],bool,bool)(uint64,bool,(uint8,uint64))` ABI method.
     *
     * Set the policy of every asset whose ASA manager field is the sender. It has no lock.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    arcTbdSetManagerPolicy: (params) => {
      return this.appClient.createTransaction.call(CollectibleVariationsParamsFactory.arcTbdSetManagerPolicy(params));
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `arcTBD_delete_asset_policy(uint64,uint64)(bool,uint8,uint64)` ABI method.
     *
     * Delete an unlocked asset policy. The resolved creator, or the AssetCreator when none resolves (I12).
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    arcTbdDeleteAssetPolicy: (params) => {
      return this.appClient.createTransaction.call(CollectibleVariationsParamsFactory.arcTbdDeleteAssetPolicy(params));
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `arcTBD_delete_manager_policy()(bool,uint8,uint64)` ABI method.
     *
     * Delete the sender's manager policy.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    arcTbdDeleteManagerPolicy: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(CollectibleVariationsParamsFactory.arcTbdDeleteManagerPolicy(params));
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `arcTBD_set_grant(byte[])(uint64,bool,(uint8,uint64))` ABI method.
     *
     * Writers the sender admits for holder-scope entries bound to the sender, on anything the sender holds.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    arcTbdSetGrant: (params) => {
      return this.appClient.createTransaction.call(CollectibleVariationsParamsFactory.arcTbdSetGrant(params));
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `arcTBD_delete_grant()(bool,uint8,uint64)` ABI method.
     *
     * Delete the sender's grant. Entries it admitted stay; the holder removes them separately.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    arcTbdDeleteGrant: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(CollectibleVariationsParamsFactory.arcTbdDeleteGrant(params));
    },
    /**
         * Makes a call to the CollectibleVariations smart contract using the `arcTBD_purge(byte[])(bool,uint8,uint64)` ABI method.
         *
        * Delete one `v`, `m` or `p` box of a destroyed asset (I11). Anyone may call. `v` refunds the
        writer in the name; `m` refunds the holder section's deposit to its holder and the rest to the
        caller; `p` refunds the caller (no creator resolves after destroy, as in ARC-89).
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    arcTbdPurge: (params) => {
      return this.appClient.createTransaction.call(CollectibleVariationsParamsFactory.arcTbdPurge(params));
    },
    /**
         * Makes a call to the CollectibleVariations smart contract using the `arcTBD_get_main(uint64)(uint8,byte[])` ABI method.
         *
         * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
         *
        * The pin that applies: a valid holder pin, else the creator pin, else role 0. `pin` is the
        section's PinCore followed by its flat image (the holder's address is dropped).
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    arcTbdGetMain: (params) => {
      return this.appClient.createTransaction.call(CollectibleVariationsParamsFactory.arcTbdGetMain(params));
    }
  }}
  /**
   * Send calls to the current app
   */
  __init6() {this.send = {
    /**
     * Makes a clear_state call to an existing instance of the CollectibleVariations smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.send.bare.clearState(params);
    },
    /**
         * Makes a call to the CollectibleVariations smart contract using the `arcTBD_write_variation(uint64,uint64,byte[],address,uint8,uint8,bool,byte[],byte[],uint64,byte[32][])(uint64,bool,(uint8,uint64))` ABI method.
         *
        * Create or replace the sender's variation (asset, sender, slot). `holder` zero means
        collectible scope, otherwise holder scope bound to `holder`. `proof` is used only by meta
        writer sets.
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    arcTbdWriteVariation: async (params) => {
      const result = await this.appClient.send.call(CollectibleVariationsParamsFactory.arcTbdWriteVariation(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the CollectibleVariations smart contract using the `arcTBD_delete_variation(uint64,uint64,address,byte[])(bool,uint8,uint64)` ABI method.
         *
        * Delete variation (asset, writer, slot) of an existing asset. The first authority that applies
        is used and reported: writer (unlocked), void, holder, creator (unlocked policy).
        The refund goes to the writer.
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    arcTbdDeleteVariation: async (params) => {
      const result = await this.appClient.send.call(CollectibleVariationsParamsFactory.arcTbdDeleteVariation(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `arcTBD_pin_main_creator(uint64,uint64,address,byte[],uint64,bool)(uint64,bool,(uint8,uint64))` ABI method.
     *
     * Pin a collectible-scope variation as the creator's main image. The pin is a snapshot of its flat image.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    arcTbdPinMainCreator: async (params) => {
      const result = await this.appClient.send.call(CollectibleVariationsParamsFactory.arcTbdPinMainCreator(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `arcTBD_pin_main_holder(uint64,address,byte[],uint64)(uint64,bool,(uint8,uint64))` ABI method.
     *
     * Pin a variation as the holder's main image. Only single-unit assets. The next transfer voids it.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    arcTbdPinMainHolder: async (params) => {
      const result = await this.appClient.send.call(CollectibleVariationsParamsFactory.arcTbdPinMainHolder(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `arcTBD_unpin_main_creator(uint64,uint64)(bool,uint8,uint64)` ABI method.
     *
     * Clear the creator section. The resolved creator, or the AssetCreator when none resolves (I12).
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    arcTbdUnpinMainCreator: async (params) => {
      const result = await this.appClient.send.call(CollectibleVariationsParamsFactory.arcTbdUnpinMainCreator(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `arcTBD_unpin_main_holder(uint64)(bool,uint8,uint64)` ABI method.
     *
     * Clear the holder section. Its holder, or anyone once it is void. Refunded to the holder in it.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    arcTbdUnpinMainHolder: async (params) => {
      const result = await this.appClient.send.call(CollectibleVariationsParamsFactory.arcTbdUnpinMainHolder(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `arcTBD_set_asset_policy(uint64,uint64,byte[],byte[],bool,bool,bool)(uint64,bool,(uint8,uint64))` ABI method.
     *
     * Set the policy of one asset. It overrides the manager policy. `lock` is one way.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    arcTbdSetAssetPolicy: async (params) => {
      const result = await this.appClient.send.call(CollectibleVariationsParamsFactory.arcTbdSetAssetPolicy(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `arcTBD_set_manager_policy(byte[],byte[],bool,bool)(uint64,bool,(uint8,uint64))` ABI method.
     *
     * Set the policy of every asset whose ASA manager field is the sender. It has no lock.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    arcTbdSetManagerPolicy: async (params) => {
      const result = await this.appClient.send.call(CollectibleVariationsParamsFactory.arcTbdSetManagerPolicy(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `arcTBD_delete_asset_policy(uint64,uint64)(bool,uint8,uint64)` ABI method.
     *
     * Delete an unlocked asset policy. The resolved creator, or the AssetCreator when none resolves (I12).
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    arcTbdDeleteAssetPolicy: async (params) => {
      const result = await this.appClient.send.call(CollectibleVariationsParamsFactory.arcTbdDeleteAssetPolicy(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `arcTBD_delete_manager_policy()(bool,uint8,uint64)` ABI method.
     *
     * Delete the sender's manager policy.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    arcTbdDeleteManagerPolicy: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(CollectibleVariationsParamsFactory.arcTbdDeleteManagerPolicy(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `arcTBD_set_grant(byte[])(uint64,bool,(uint8,uint64))` ABI method.
     *
     * Writers the sender admits for holder-scope entries bound to the sender, on anything the sender holds.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    arcTbdSetGrant: async (params) => {
      const result = await this.appClient.send.call(CollectibleVariationsParamsFactory.arcTbdSetGrant(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `arcTBD_delete_grant()(bool,uint8,uint64)` ABI method.
     *
     * Delete the sender's grant. Entries it admitted stay; the holder removes them separately.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    arcTbdDeleteGrant: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(CollectibleVariationsParamsFactory.arcTbdDeleteGrant(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the CollectibleVariations smart contract using the `arcTBD_purge(byte[])(bool,uint8,uint64)` ABI method.
         *
        * Delete one `v`, `m` or `p` box of a destroyed asset (I11). Anyone may call. `v` refunds the
        writer in the name; `m` refunds the holder section's deposit to its holder and the rest to the
        caller; `p` refunds the caller (no creator resolves after destroy, as in ARC-89).
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    arcTbdPurge: async (params) => {
      const result = await this.appClient.send.call(CollectibleVariationsParamsFactory.arcTbdPurge(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the CollectibleVariations smart contract using the `arcTBD_get_main(uint64)(uint8,byte[])` ABI method.
         *
         * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
         *
        * The pin that applies: a valid holder pin, else the creator pin, else role 0. `pin` is the
        section's PinCore followed by its flat image (the holder's address is dropped).
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    arcTbdGetMain: async (params) => {
      const result = await this.appClient.send.call(CollectibleVariationsParamsFactory.arcTbdGetMain(params));
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
    return new _CollectibleVariationsClient(this.appClient.clone(params));
  }
  /**
     * Makes a readonly (simulated) call to the CollectibleVariations smart contract using the `arcTBD_get_main(uint64)(uint8,byte[])` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
    * The pin that applies: a valid holder pin, else the creator pin, else role 0. `pin` is the
    section's PinCore followed by its flat image (the holder's address is dropped).
  
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
  async arcTbdGetMain(params) {
    const result = await this.appClient.send.call(CollectibleVariationsParamsFactory.arcTbdGetMain(params));
    return result.return;
  }
  /**
   * Methods to access state for the current CollectibleVariations app
   */
  __init7() {this.state = {
    /**
     * Methods to access global state for the current CollectibleVariations app
     */
    global: {
      /**
       * Get all current keyed values from global state
       */
      getAll: async () => {
        const result = await this.appClient.state.global.getAll();
        return {
          revision: result.revision,
          metaApp: result.metaApp,
          metaTreeType: result.metaTreeType
        };
      },
      /**
       * Get the current value of the revision key in global state
       */
      revision: async () => {
        return await this.appClient.state.global.getValue("revision");
      },
      /**
       * Get the current value of the metaApp key in global state
       */
      metaApp: async () => {
        return await this.appClient.state.global.getValue("metaApp");
      },
      /**
       * Get the current value of the metaTreeType key in global state
       */
      metaTreeType: async () => {
        return await this.appClient.state.global.getValue("metaTreeType");
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
       * Add a arcTBD_write_variation(uint64,uint64,byte[],address,uint8,uint8,bool,byte[],byte[],uint64,byte[32][])(uint64,bool,(uint8,uint64)) method call against the CollectibleVariations contract
       */
      arcTbdWriteVariation(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.arcTbdWriteVariation(params)));
        resultMappers.push((v) => client.decodeReturnValue("arcTBD_write_variation(uint64,uint64,byte[],address,uint8,uint8,bool,byte[],byte[],uint64,byte[32][])(uint64,bool,(uint8,uint64))", v));
        return this;
      },
      /**
       * Add a arcTBD_delete_variation(uint64,uint64,address,byte[])(bool,uint8,uint64) method call against the CollectibleVariations contract
       */
      arcTbdDeleteVariation(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.arcTbdDeleteVariation(params)));
        resultMappers.push((v) => client.decodeReturnValue("arcTBD_delete_variation(uint64,uint64,address,byte[])(bool,uint8,uint64)", v));
        return this;
      },
      /**
       * Add a arcTBD_pin_main_creator(uint64,uint64,address,byte[],uint64,bool)(uint64,bool,(uint8,uint64)) method call against the CollectibleVariations contract
       */
      arcTbdPinMainCreator(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.arcTbdPinMainCreator(params)));
        resultMappers.push((v) => client.decodeReturnValue("arcTBD_pin_main_creator(uint64,uint64,address,byte[],uint64,bool)(uint64,bool,(uint8,uint64))", v));
        return this;
      },
      /**
       * Add a arcTBD_pin_main_holder(uint64,address,byte[],uint64)(uint64,bool,(uint8,uint64)) method call against the CollectibleVariations contract
       */
      arcTbdPinMainHolder(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.arcTbdPinMainHolder(params)));
        resultMappers.push((v) => client.decodeReturnValue("arcTBD_pin_main_holder(uint64,address,byte[],uint64)(uint64,bool,(uint8,uint64))", v));
        return this;
      },
      /**
       * Add a arcTBD_unpin_main_creator(uint64,uint64)(bool,uint8,uint64) method call against the CollectibleVariations contract
       */
      arcTbdUnpinMainCreator(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.arcTbdUnpinMainCreator(params)));
        resultMappers.push((v) => client.decodeReturnValue("arcTBD_unpin_main_creator(uint64,uint64)(bool,uint8,uint64)", v));
        return this;
      },
      /**
       * Add a arcTBD_unpin_main_holder(uint64)(bool,uint8,uint64) method call against the CollectibleVariations contract
       */
      arcTbdUnpinMainHolder(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.arcTbdUnpinMainHolder(params)));
        resultMappers.push((v) => client.decodeReturnValue("arcTBD_unpin_main_holder(uint64)(bool,uint8,uint64)", v));
        return this;
      },
      /**
       * Add a arcTBD_set_asset_policy(uint64,uint64,byte[],byte[],bool,bool,bool)(uint64,bool,(uint8,uint64)) method call against the CollectibleVariations contract
       */
      arcTbdSetAssetPolicy(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.arcTbdSetAssetPolicy(params)));
        resultMappers.push((v) => client.decodeReturnValue("arcTBD_set_asset_policy(uint64,uint64,byte[],byte[],bool,bool,bool)(uint64,bool,(uint8,uint64))", v));
        return this;
      },
      /**
       * Add a arcTBD_set_manager_policy(byte[],byte[],bool,bool)(uint64,bool,(uint8,uint64)) method call against the CollectibleVariations contract
       */
      arcTbdSetManagerPolicy(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.arcTbdSetManagerPolicy(params)));
        resultMappers.push((v) => client.decodeReturnValue("arcTBD_set_manager_policy(byte[],byte[],bool,bool)(uint64,bool,(uint8,uint64))", v));
        return this;
      },
      /**
       * Add a arcTBD_delete_asset_policy(uint64,uint64)(bool,uint8,uint64) method call against the CollectibleVariations contract
       */
      arcTbdDeleteAssetPolicy(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.arcTbdDeleteAssetPolicy(params)));
        resultMappers.push((v) => client.decodeReturnValue("arcTBD_delete_asset_policy(uint64,uint64)(bool,uint8,uint64)", v));
        return this;
      },
      /**
       * Add a arcTBD_delete_manager_policy()(bool,uint8,uint64) method call against the CollectibleVariations contract
       */
      arcTbdDeleteManagerPolicy(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.arcTbdDeleteManagerPolicy(params)));
        resultMappers.push((v) => client.decodeReturnValue("arcTBD_delete_manager_policy()(bool,uint8,uint64)", v));
        return this;
      },
      /**
       * Add a arcTBD_set_grant(byte[])(uint64,bool,(uint8,uint64)) method call against the CollectibleVariations contract
       */
      arcTbdSetGrant(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.arcTbdSetGrant(params)));
        resultMappers.push((v) => client.decodeReturnValue("arcTBD_set_grant(byte[])(uint64,bool,(uint8,uint64))", v));
        return this;
      },
      /**
       * Add a arcTBD_delete_grant()(bool,uint8,uint64) method call against the CollectibleVariations contract
       */
      arcTbdDeleteGrant(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.arcTbdDeleteGrant(params)));
        resultMappers.push((v) => client.decodeReturnValue("arcTBD_delete_grant()(bool,uint8,uint64)", v));
        return this;
      },
      /**
       * Add a arcTBD_purge(byte[])(bool,uint8,uint64) method call against the CollectibleVariations contract
       */
      arcTbdPurge(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.arcTbdPurge(params)));
        resultMappers.push((v) => client.decodeReturnValue("arcTBD_purge(byte[])(bool,uint8,uint64)", v));
        return this;
      },
      /**
       * Add a arcTBD_get_main(uint64)(uint8,byte[]) method call against the CollectibleVariations contract
       */
      arcTbdGetMain(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.arcTbdGetMain(params)));
        resultMappers.push((v) => client.decodeReturnValue("arcTBD_get_main(uint64)(uint8,byte[])", v));
        return this;
      },
      /**
       * Add a clear state call to the CollectibleVariations contract
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

// src/collectible-variations/codec.ts
var _sha2js = require('@noble/hashes/sha2.js');


// src/collectible-variations/layout.ts
var layout_exports = {};
_chunkPZ5AY32Cjs.__export.call(void 0, layout_exports, {
  Arc20GetAssetConfig: () => Arc20GetAssetConfig,
  Arc20ManagerOffset: () => Arc20ManagerOffset,
  AssetNameLength: () => AssetNameLength,
  DefaultPolicyFlags: () => DefaultPolicyFlags,
  DelegateAdmit: () => DelegateAdmit,
  DepositLogPrefix: () => DepositLogPrefix,
  FlagHolderScope: () => FlagHolderScope,
  FlagLocked: () => FlagLocked,
  FormatV1: () => FormatV1,
  GRevision: () => GRevision,
  GSet: () => GSet,
  GlobalStateKeyMetaApp: () => GlobalStateKeyMetaApp,
  GlobalStateKeyMetaTreeType: () => GlobalStateKeyMetaTreeType,
  GlobalStateKeyRevision: () => GlobalStateKeyRevision,
  HolderSectionPrefix: () => HolderSectionPrefix,
  IfAbsent: () => IfAbsent,
  IfAny: () => IfAny,
  KindData: () => KindData,
  KindImage: () => KindImage,
  KindLink: () => KindLink,
  KindRenderBundle: () => KindRenderBundle,
  MCreatorDeposit: () => MCreatorDeposit,
  MCreatorLen: () => MCreatorLen,
  MDecimals: () => MDecimals,
  MFlags: () => MFlags,
  MHolderDeposit: () => MHolderDeposit,
  MHolderLen: () => MHolderLen,
  MRevision: () => MRevision,
  MSections: () => MSections,
  MainCreatorLocked: () => MainCreatorLocked,
  MaxAllowWriters: () => MaxAllowWriters,
  MaxFlatBytes: () => MaxFlatBytes,
  MaxProofLevels: () => MaxProofLevels,
  MaxSlotBytes: () => MaxSlotBytes,
  MaxValueBytes: () => MaxValueBytes,
  MbrNegative: () => MbrNegative,
  MbrNull: () => MbrNull,
  MbrPositive: () => MbrPositive,
  MetaNameHashBytes: () => MetaNameHashBytes,
  MetaTagCollectible: () => MetaTagCollectible,
  MetaTagGrant: () => MetaTagGrant,
  MetaTagHolder: () => MetaTagHolder,
  NameAsset: () => NameAsset,
  NameSlot: () => NameSlot,
  NameWriter: () => NameWriter,
  PFlags: () => PFlags,
  PRevision: () => PRevision,
  PSets: () => PSets,
  PinFlat: () => PinFlat,
  PinSourceKind: () => PinSourceKind,
  PinSourceRevision: () => PinSourceRevision,
  PinSourceSlot: () => PinSourceSlot,
  PinSourceSlotLen: () => PinSourceSlotLen,
  PinSourceSub: () => PinSourceSub,
  PinSourceWriter: () => PinSourceWriter,
  PlainAsa: () => PlainAsa,
  PolicyHolderPinsCollectibleOnly: () => PolicyHolderPinsCollectibleOnly,
  PolicyLocked: () => PolicyLocked,
  PolicyManagerWrites: () => PolicyManagerWrites,
  PrefixAssetPolicy: () => PrefixAssetPolicy,
  PrefixGrant: () => PrefixGrant,
  PrefixMain: () => PrefixMain,
  PrefixManagerPolicy: () => PrefixManagerPolicy,
  PrefixVariation: () => PrefixVariation,
  RemovedByAssetCreator: () => RemovedByAssetCreator,
  RemovedByCreator: () => RemovedByCreator,
  RemovedByHolder: () => RemovedByHolder,
  RemovedByWriter: () => RemovedByWriter,
  RemovedNone: () => RemovedNone,
  RemovedPurged: () => RemovedPurged,
  RemovedVoid: () => RemovedVoid,
  RoleCreator: () => RoleCreator,
  RoleHolder: () => RoleHolder,
  RoleNone: () => RoleNone,
  VDecimals: () => VDecimals,
  VFlags: () => VFlags,
  VFlatCollectible: () => VFlatCollectible,
  VFlatHolder: () => VFlatHolder,
  VFlatLen: () => VFlatLen,
  VHolder: () => VHolder,
  VKind: () => VKind,
  VRevision: () => VRevision,
  VSub: () => VSub,
  WriterSetAllow: () => WriterSetAllow,
  WriterSetClosed: () => WriterSetClosed,
  WriterSetDelegate: () => WriterSetDelegate,
  WriterSetMeta: () => WriterSetMeta,
  WriterSetOpen: () => WriterSetOpen,
  boxMbr: () => boxMbr
});
var PrefixVariation = "v";
var PrefixMain = "m";
var PrefixAssetPolicy = "p";
var PrefixManagerPolicy = "P";
var PrefixGrant = "g";
var MaxSlotBytes = 23;
var NameAsset = 1;
var NameWriter = 9;
var NameSlot = 41;
var AssetNameLength = 9;
var MaxValueBytes = 4096;
var FormatV1 = 1;
var VFlags = 1;
var VKind = 2;
var VSub = 3;
var VRevision = 4;
var VFlatLen = 12;
var VHolder = 14;
var VDecimals = 46;
var VFlatCollectible = 14;
var VFlatHolder = 47;
var FlagLocked = 128;
var FlagHolderScope = 1;
var KindImage = 1;
var KindRenderBundle = 2;
var KindData = 3;
var KindLink = 4;
var MaxFlatBytes = 768;
var MFlags = 1;
var MDecimals = 2;
var MRevision = 3;
var MCreatorLen = 11;
var MHolderLen = 13;
var MCreatorDeposit = 15;
var MHolderDeposit = 23;
var MSections = 31;
var MainCreatorLocked = 128;
var PinSourceWriter = 0;
var PinSourceSlotLen = 32;
var PinSourceSlot = 33;
var PinSourceRevision = 56;
var PinSourceKind = 64;
var PinSourceSub = 65;
var PinFlat = 66;
var HolderSectionPrefix = 32;
var RoleNone = 0;
var RoleCreator = 1;
var RoleHolder = 2;
var PFlags = 1;
var PRevision = 2;
var PSets = 10;
var GRevision = 1;
var GSet = 9;
var PolicyLocked = 128;
var PolicyHolderPinsCollectibleOnly = 2;
var PolicyManagerWrites = 1;
var DefaultPolicyFlags = 1;
var WriterSetClosed = 0;
var WriterSetOpen = 1;
var WriterSetAllow = 2;
var WriterSetDelegate = 3;
var WriterSetMeta = 4;
var MaxAllowWriters = 8;
var MetaTagCollectible = "c";
var MetaTagHolder = "h";
var MetaTagGrant = "g";
var MetaNameHashBytes = 18;
var MaxProofLevels = 24;
var PlainAsa = 0;
var Arc20GetAssetConfig = "get_asset_config(asset)(uint64,uint32,bool,string,string,string,byte[],address,address,address,address)";
var Arc20ManagerOffset = 25;
var DelegateAdmit = "arcTBD_admit(uint64,address,byte[],address)bool";
var DepositLogPrefix = "cv:deposit:";
var IfAbsent = 0n;
var IfAny = 18446744073709551615n;
var RemovedNone = 0;
var RemovedPurged = 1;
var RemovedByWriter = 2;
var RemovedVoid = 3;
var RemovedByHolder = 4;
var RemovedByCreator = 5;
var RemovedByAssetCreator = 6;
var MbrNull = 0;
var MbrPositive = 1;
var MbrNegative = 255;
var GlobalStateKeyRevision = "r";
var GlobalStateKeyMetaApp = "a";
var GlobalStateKeyMetaTreeType = "t";
var boxMbr = (nameLength, valueLength) => 2500n + 400n * BigInt(nameLength + valueLength);

// src/collectible-variations/codec.ts
var text = new TextEncoder();
var slotBytes = (slot) => typeof slot === "string" ? text.encode(slot) : slot;
function concatBytes(...parts) {
  const out = new Uint8Array(parts.reduce((n, p) => n + p.length, 0));
  let at = 0;
  for (const p of parts) {
    out.set(p, at);
    at += p.length;
  }
  return out;
}
function uint64Bytes(value) {
  const out = new Uint8Array(8);
  new DataView(out.buffer).setBigUint64(0, BigInt(value));
  return out;
}
var view = (b) => new DataView(b.buffer, b.byteOffset, b.byteLength);
var u16 = (b, at) => view(b).getUint16(at);
var u64 = (b, at) => view(b).getBigUint64(at);
var addressAt = (b, at) => _algosdk.encodeAddress.call(void 0, b.slice(at, at + 32));
var publicKey = (address) => _algosdk.decodeAddress.call(void 0, address).publicKey;
function checkSlot(slot) {
  if (slot.length < 1 || slot.length > MaxSlotBytes) throw new Error(`Slot must be 1..${MaxSlotBytes} bytes`);
}
function variationBoxName(asset, writer, slot) {
  const s = slotBytes(slot);
  checkSlot(s);
  return concatBytes(text.encode(PrefixVariation), uint64Bytes(asset), publicKey(writer), s);
}
var mainBoxName = (asset) => concatBytes(text.encode(PrefixMain), uint64Bytes(asset));
var assetPolicyBoxName = (asset) => concatBytes(text.encode(PrefixAssetPolicy), uint64Bytes(asset));
var managerPolicyBoxName = (manager) => concatBytes(text.encode(PrefixManagerPolicy), publicKey(manager));
var grantBoxName = (holder) => concatBytes(text.encode(PrefixGrant), publicKey(holder));
var CLOSED = { mode: "closed" };
var OPEN = { mode: "open" };
function encodeWriterSet(set) {
  switch (set.mode) {
    case "closed":
      return new Uint8Array([WriterSetClosed]);
    case "open":
      return new Uint8Array([WriterSetOpen]);
    case "allow":
      if (set.writers.length < 1 || set.writers.length > MaxAllowWriters) {
        throw new Error(`An allow set has 1..${MaxAllowWriters} writers; use a meta set for more`);
      }
      return concatBytes(new Uint8Array([WriterSetAllow, set.writers.length]), ...set.writers.map(publicKey));
    case "delegate":
      if (set.app <= 0n) throw new Error("Delegate app must be nonzero");
      return concatBytes(new Uint8Array([WriterSetDelegate]), uint64Bytes(set.app));
    case "meta":
      if (set.root.length !== 32 || set.root.every((b) => b === 0)) throw new Error("Meta root must be 32 nonzero bytes");
      return concatBytes(new Uint8Array([WriterSetMeta]), set.root);
  }
}
function decodeWriterSet(bytes, at = 0) {
  const mode = bytes[at];
  switch (mode) {
    case WriterSetClosed:
      return { set: CLOSED, length: 1 };
    case WriterSetOpen:
      return { set: OPEN, length: 1 };
    case WriterSetAllow: {
      const n = bytes[at + 1];
      const writers = Array.from({ length: n }, (_, i) => addressAt(bytes, at + 2 + 32 * i));
      return { set: { mode: "allow", writers }, length: 2 + 32 * n };
    }
    case WriterSetDelegate:
      return { set: { mode: "delegate", app: u64(bytes, at + 1) }, length: 9 };
    case WriterSetMeta:
      return { set: { mode: "meta", root: bytes.slice(at + 1, at + 33) }, length: 33 };
    default:
      throw new Error(`Unknown writer set mode ${mode}`);
  }
}
var BASE64URL = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
function metaRootName(tag, boxName) {
  const hash = _sha2js.sha256.call(void 0, boxName).slice(0, MetaNameHashBytes);
  let out = tag;
  for (let i = 0; i < hash.length; i += 3) {
    const n = hash[i] << 16 | hash[i + 1] << 8 | hash[i + 2];
    out += BASE64URL[n >> 18 & 63] + BASE64URL[n >> 12 & 63] + BASE64URL[n >> 6 & 63] + BASE64URL[n & 63];
  }
  return out;
}
function decodeVariation(value) {
  const flags = value[VFlags];
  const holderScope = (flags & FlagHolderScope) !== 0;
  const flatLength = u16(value, VFlatLen);
  const start = holderScope ? VFlatHolder : VFlatCollectible;
  return {
    format: value[0],
    locked: (flags & FlagLocked) !== 0,
    holderScope,
    kind: value[VKind],
    sub: value[VSub],
    revision: u64(value, VRevision),
    ...holderScope && { holder: addressAt(value, VHolder), decimals: value[VDecimals] },
    flat: value.slice(start, start + flatLength),
    body: value.slice(start + flatLength)
  };
}
function decodePin(pin) {
  const slotLength = pin[PinSourceSlotLen];
  return {
    writer: addressAt(pin, PinSourceWriter),
    slot: pin.slice(PinSourceSlot, PinSourceSlot + slotLength),
    sourceRevision: u64(pin, PinSourceRevision),
    kind: pin[PinSourceKind],
    sub: pin[PinSourceSub],
    flat: pin.slice(PinFlat)
  };
}
function decodeMain(value) {
  const creatorLength = u16(value, MCreatorLen);
  const holderLength = u16(value, MHolderLen);
  const creator = value.slice(MSections, MSections + creatorLength);
  const holder = value.slice(MSections + creatorLength, MSections + creatorLength + holderLength);
  return {
    creatorLocked: (value[MFlags] & MainCreatorLocked) !== 0,
    decimals: value[MDecimals],
    revision: u64(value, MRevision),
    creatorDeposit: u64(value, MCreatorDeposit),
    holderDeposit: u64(value, MHolderDeposit),
    ...creatorLength > 0 && { creator: decodePin(creator) },
    ...holderLength > 0 && {
      holder: { holder: addressAt(holder, 0), ...decodePin(holder.slice(HolderSectionPrefix)) }
    }
  };
}
var DEFAULT_POLICY = {
  locked: false,
  managerWrites: true,
  holderPinsCollectibleOnly: false,
  revision: 0n,
  collectible: CLOSED,
  holder: CLOSED
};
function decodePolicy(value) {
  const flags = value[PFlags];
  const first = decodeWriterSet(value, PSets);
  const second = decodeWriterSet(value, PSets + first.length);
  return {
    locked: (flags & PolicyLocked) !== 0,
    managerWrites: (flags & PolicyManagerWrites) !== 0,
    holderPinsCollectibleOnly: (flags & PolicyHolderPinsCollectibleOnly) !== 0,
    revision: u64(value, PRevision),
    collectible: first.set,
    holder: second.set
  };
}
function decodeGrant(value) {
  return { revision: u64(value, GRevision), writers: decodeWriterSet(value, GSet).set };
}
var depositPrefix = text.encode(DepositLogPrefix);
function parseDepositLog(logs) {
  for (const log of logs) {
    if (log.length !== depositPrefix.length + 8) continue;
    if (depositPrefix.every((b, i) => log[i] === b)) return u64(log, depositPrefix.length);
  }
  return void 0;
}

// src/collectible-variations/errors.ts
var COLLECTIBLE_VARIATIONS_ERROR_MESSAGES = {
  errCvAm: "Asset does not exist",
  errCvAe: "Asset still exists; only a destroyed asset can be purged",
  errCvBa: "Invalid argument",
  errCvTl: "Value too large (flat image over 768 bytes or box value over 4096 bytes)",
  errCvNa: "Sender is not admitted by the writer rules that apply",
  errCvNh: "Account does not hold one whole unit of the asset",
  errCvNc: "Sender is not the creator of the asset",
  errCvLk: "Entry or policy is locked",
  errCvPf: "ifRevision precondition failed",
  errCvSm: "Pin source variation does not exist",
  errCvSc: "Pin source revision changed",
  errCvSn: "Pin source not allowed",
  errCvSu: "Holder pins need a single-unit asset",
  errCvDm: "Deposit payment missing or wrong amount",
  errCvBs: "Controlling app is not a valid ARC-20 Smart ASA for this asset",
  errCvBp: "Invalid purge box name"
};
var translateCollectibleVariationsError = _chunkZGCVKZRLjs.makeErrorTranslator.call(void 0, COLLECTIBLE_VARIATIONS_ERROR_MESSAGES);

// src/collectible-variations/index.ts
var DISCOVERY_FEE = 60000n;
var CollectibleVariationsSDK = class extends _chunkN5J2GB5Wjs.BaseSDK {
  constructor(params) {
    super({ factory: CollectibleVariationsFactory, ...params }, "COLLECTIBLE_VARIATIONS_APP_ID");
  }
  // ========== Writes ==========
  async writeVariation({
    sender,
    signer,
    asset,
    slot,
    holder,
    kind,
    sub = 0,
    lock = false,
    flat = new Uint8Array(),
    body = new Uint8Array(),
    ifRevision = IfAny,
    proof = [],
    controllingApp = BigInt(PlainAsa)
  }) {
    return this.call(
      "arcTbdWriteVariation",
      {
        asset,
        controllingApp,
        slot: slotBytes(slot),
        holder: _nullishCoalesce(holder, () => ( _algosdk2.default.ALGORAND_ZERO_ADDRESS_STRING)),
        kind,
        sub,
        lock,
        flat,
        body,
        ifRevision,
        proof
      },
      { sender, signer }
    );
  }
  async deleteVariation({ sender, signer, asset, writer, slot, controllingApp = 0n }) {
    return this.call("arcTbdDeleteVariation", { asset, controllingApp, writer, slot: slotBytes(slot) }, { sender, signer });
  }
  /** Pin a collectible-scope variation as the creator's main image. */
  async pinMainCreator({
    sender,
    signer,
    asset,
    writer,
    slot,
    sourceRevision,
    lock = false,
    controllingApp = 0n
  }) {
    return this.call(
      "arcTbdPinMainCreator",
      { asset, controllingApp, writer, slot: slotBytes(slot), sourceRevision, lock },
      { sender, signer }
    );
  }
  /** Pin a variation as the holder's main image (single-unit assets only). */
  async pinMainHolder({ sender, signer, asset, writer, slot, sourceRevision }) {
    return this.call("arcTbdPinMainHolder", { asset, writer, slot: slotBytes(slot), sourceRevision }, { sender, signer });
  }
  async unpinMainCreator({ sender, signer, asset, controllingApp = 0n }) {
    return this.call("arcTbdUnpinMainCreator", { asset, controllingApp }, { sender, signer });
  }
  async unpinMainHolder({ sender, signer, asset }) {
    return this.call("arcTbdUnpinMainHolder", { asset }, { sender, signer });
  }
  /** Set one asset's policy (overrides the manager policy). `lock` is permanent. */
  async setAssetPolicy({ sender, signer, asset, controllingApp = 0n, lock = false, ...policy }) {
    return this.call("arcTbdSetAssetPolicy", { asset, controllingApp, ...this.policyArgs(policy), lock }, { sender, signer });
  }
  /** Set the policy of every asset whose ASA manager is the sender. */
  async setManagerPolicy({ sender, signer, ...policy }) {
    return this.call("arcTbdSetManagerPolicy", this.policyArgs(policy), { sender, signer });
  }
  async deleteAssetPolicy({ sender, signer, asset, controllingApp = 0n }) {
    return this.call("arcTbdDeleteAssetPolicy", { asset, controllingApp }, { sender, signer });
  }
  async deleteManagerPolicy(params = {}) {
    return this.call("arcTbdDeleteManagerPolicy", {}, params);
  }
  /** Writers the sender admits for holder-scope entries bound to it. */
  async setGrant({ sender, signer, writers }) {
    return this.call("arcTbdSetGrant", { writers: encodeWriterSet(writers) }, { sender, signer });
  }
  async deleteGrant(params = {}) {
    return this.call("arcTbdDeleteGrant", {}, params);
  }
  /** Delete a `v`, `m` or `p` box of a destroyed asset. Anyone may call. */
  async purge({ sender, signer, name }) {
    return this.call("arcTbdPurge", { name }, { sender, signer });
  }
  // ========== Reads ==========
  async getVariation({ asset, writer, slot }) {
    const value = await this.box(variationBoxName(asset, writer, slot));
    return value && decodeVariation(value);
  }
  async getMainBox({ asset }) {
    const value = await this.box(mainBoxName(asset));
    return value && decodeMain(value);
  }
  async getAssetPolicy({ asset }) {
    const value = await this.box(assetPolicyBoxName(asset));
    return value && decodePolicy(value);
  }
  async getManagerPolicy({ manager }) {
    const value = await this.box(managerPolicyBoxName(manager));
    return value && decodePolicy(value);
  }
  async getGrant({ holder }) {
    const value = await this.box(grantBoxName(holder));
    return value && decodeGrant(value);
  }
  /** The policy that applies to an asset: `p`, else `P` of its ASA manager, else the default. */
  async getEffectivePolicy({ asset }) {
    const own = await this.getAssetPolicy({ asset });
    if (own) return { policy: own, source: "asset" };
    const { manager } = await this.algorand.asset.getById(asset);
    if (manager && manager !== _algosdk2.default.ALGORAND_ZERO_ADDRESS_STRING) {
      const managed = await this.getManagerPolicy({ manager: manager.toString() });
      if (managed) return { policy: managed, source: "manager" };
    }
    return { policy: DEFAULT_POLICY, source: "default" };
  }
  /**
   * The pin that applies, as arcTBD_get_main computes it: a holder pin whose
   * holder still holds one whole unit, else the creator pin, else role 0.
   * Read from the box and the holder's balance, so it needs no funded reader.
   */
  async getMain({ asset }) {
    const main = await this.getMainBox({ asset });
    if ((main == null ? void 0 : main.holder) && await this.holds(main.holder.holder, asset, main.decimals)) {
      const { holder: _holder, ...pin } = main.holder;
      return { role: RoleHolder, pin };
    }
    if (main == null ? void 0 : main.creator) return { role: RoleCreator, pin: main.creator };
    return { role: RoleNone };
  }
  /** holding(account).amount >= 10^decimals; false when not opted in. */
  async holds(account, asset, decimals) {
    if (account === _algosdk2.default.ALGORAND_ZERO_ADDRESS_STRING || decimals > 19) return false;
    try {
      const info = await this.algorand.asset.getAccountInformation(account, asset);
      return info.balance >= 10n ** BigInt(decimals);
    } catch (e) {
      return false;
    }
  }
  // ========== Deposits ==========
  /**
   * The deposit a call needs, learned by simulating it without a payment: the
   * registry logs `cv:deposit:` || amount before it rejects. 0 when the call
   * needs no deposit or fails for another reason (sending it then reports that
   * reason).
   */
  async depositFor(method, args, params = {}) {
    const { sender } = this.getSendParams(params);
    if (!sender) throw new Error("A sender is needed to measure a deposit");
    const create = this.client.createTransaction;
    const { transactions } = await create[method]({ sender, args, staticFee: _algokitutils.microAlgo.call(void 0, DISCOVERY_FEE) });
    const grouped = _algosdk2.default.assignGroupID(transactions);
    const response = await this.algorand.client.algod.simulateTransactions(
      new _algosdk2.default.modelsv2.SimulateRequest({
        txnGroups: [
          new _algosdk2.default.modelsv2.SimulateRequestTransactionGroup({
            txns: grouped.map((txn) => new _algosdk2.default.SignedTransaction({ txn }))
          })
        ],
        allowEmptySignatures: true,
        allowUnnamedResources: true,
        allowMoreLogging: true,
        extraOpcodeBudget: 2e4
      })
    ).do();
    const logs = response.txnGroups[0].txnResults.flatMap((r) => _nullishCoalesce(r.txnResult.logs, () => ( [])));
    return _nullishCoalesce(parseDepositLog(logs), () => ( 0n));
  }
  /** A `meta` writer set's Merkle tree over writer addresses (leaf = sha256(sha256(address))). */
  static writerListTree(writers) {
    return _chunkJ43IZCZCjs.createAddressTree.call(void 0, writers.map((w) => _algosdk.decodeAddress.call(void 0, w).publicKey));
  }
  /** The proof that `writer` is in `tree`, for `writeVariation({ proof })`. */
  static writerProof(tree, writer) {
    const key = _algosdk.decodeAddress.call(void 0, writer).publicKey;
    const found = tree.getProofFor(([value]) => value.length === 32 && value.every((b, i) => b === key[i]));
    if (!found) throw new Error(`${writer} is not in the writer list`);
    return found.proof;
  }
  // ========== Internals ==========
  policyArgs({ collectible, holder, managerWrites = true, holderPinsCollectibleOnly = false }) {
    return {
      collectible: encodeWriterSet(_nullishCoalesce(collectible, () => ( { mode: "closed" }))),
      holder: encodeWriterSet(_nullishCoalesce(holder, () => ( { mode: "closed" }))),
      managerWrites,
      holderPinsCollectibleOnly
    };
  }
  async call(method, args, params) {
    const sendParams = this.getRequiredSendParams(params);
    const deposit = await this.depositFor(method, args, params);
    const group = this.client.newGroup();
    if (deposit > 0n) {
      const payment = await this.algorand.createTransaction.payment({
        sender: sendParams.sender,
        receiver: this.client.appAddress,
        amount: _algokitutils.microAlgo.call(void 0, deposit)
      });
      group.addTransaction(payment, sendParams.signer);
    }
    group[method]({ ...sendParams, args });
    const sent = await group.send({ ...sendParams });
    return { result: sent.returns[sent.returns.length - 1], deposit };
  }
  async box(name) {
    try {
      return await this.algorand.app.getBoxValue(this.appId, name);
    } catch (e2) {
      return void 0;
    }
  }
};

























exports.CLOSED = CLOSED; exports.COLLECTIBLE_VARIATIONS_ERROR_MESSAGES = COLLECTIBLE_VARIATIONS_ERROR_MESSAGES; exports.CollectibleVariationsSDK = CollectibleVariationsSDK; exports.DEFAULT_POLICY = DEFAULT_POLICY; exports.OPEN = OPEN; exports.assetPolicyBoxName = assetPolicyBoxName; exports.concatBytes = concatBytes; exports.decodeGrant = decodeGrant; exports.decodeMain = decodeMain; exports.decodePin = decodePin; exports.decodePolicy = decodePolicy; exports.decodeVariation = decodeVariation; exports.decodeWriterSet = decodeWriterSet; exports.encodeWriterSet = encodeWriterSet; exports.grantBoxName = grantBoxName; exports.layout = layout_exports; exports.mainBoxName = mainBoxName; exports.managerPolicyBoxName = managerPolicyBoxName; exports.metaRootName = metaRootName; exports.parseDepositLog = parseDepositLog; exports.slotBytes = slotBytes; exports.translateCollectibleVariationsError = translateCollectibleVariationsError; exports.uint64Bytes = uint64Bytes; exports.variationBoxName = variationBoxName;
//# sourceMappingURL=index.js.map
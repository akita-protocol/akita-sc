import {
  createAddressTree
} from "../chunk-RUHR54B7.mjs";
import {
  makeErrorTranslator
} from "../chunk-GOQ4H3PG.mjs";
import {
  BaseSDK
} from "../chunk-JJ5F3L3N.mjs";
import "../chunk-D2HIJZDZ.mjs";
import "../chunk-JZMSW77U.mjs";
import {
  __export
} from "../chunk-J5LGTIGS.mjs";

// src/collectible-variations/index.ts
import { microAlgo } from "@algorandfoundation/algokit-utils";
import algosdk, { decodeAddress as decodeAddress2 } from "algosdk";

// src/generated/CollectibleVariationsClient.ts
import { getArc56ReturnValue, getABIStructFromABITuple } from "@algorandfoundation/algokit-utils/types/app-arc56";
import {
  AppClient as _AppClient
} from "@algorandfoundation/algokit-utils/types/app-client";
import { AppFactory as _AppFactory } from "@algorandfoundation/algokit-utils/types/app-factory";
var APP_SPEC = { "name": "CollectibleVariations", "structs": { "MainView": [{ "name": "role", "type": "uint8" }, { "name": "pin", "type": "byte[]" }], "MbrDelta": [{ "name": "sign", "type": "uint8" }, { "name": "amount", "type": "uint64" }], "RemoveResult": [{ "name": "removed", "type": "bool" }, { "name": "reason", "type": "uint8" }, { "name": "refund", "type": "uint64" }], "WriteResult": [{ "name": "revision", "type": "uint64" }, { "name": "changed", "type": "bool" }, { "name": "mbr", "type": "MbrDelta" }] }, "methods": [{ "name": "create", "args": [{ "type": "uint64", "name": "metaApp" }, { "type": "uint64", "name": "metaTreeType" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "writeVariation", "args": [{ "type": "uint64", "name": "asset" }, { "type": "uint64", "name": "controllingApp" }, { "type": "byte[]", "name": "slot" }, { "type": "address", "name": "holder" }, { "type": "uint8", "name": "kind" }, { "type": "uint8", "name": "sub" }, { "type": "bool", "name": "lock" }, { "type": "byte[]", "name": "flat" }, { "type": "byte[]", "name": "body" }, { "type": "uint64", "name": "ifRevision" }, { "type": "byte[32][]", "name": "proof" }], "returns": { "type": "(uint64,bool,(uint8,uint64))", "struct": "WriteResult" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Create or replace the sender's variation (asset, sender, slot). `holder` zero means\ncollectible scope, otherwise holder scope bound to `holder`. `proof` is used only by meta\nwriter sets.", "events": [{ "name": "VariationWritten", "args": [{ "type": "uint64", "name": "asset" }, { "type": "address", "name": "writer" }, { "type": "byte[]", "name": "slot" }, { "type": "uint64", "name": "revision" }, { "type": "uint8", "name": "flags" }, { "type": "uint8", "name": "kind" }, { "type": "uint64", "name": "round" }, { "type": "uint64", "name": "timestamp" }] }], "recommendations": {} }, { "name": "deleteVariation", "args": [{ "type": "uint64", "name": "asset" }, { "type": "uint64", "name": "controllingApp" }, { "type": "address", "name": "writer" }, { "type": "byte[]", "name": "slot" }], "returns": { "type": "(bool,uint8,uint64)", "struct": "RemoveResult" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Delete variation (asset, writer, slot) of an existing asset. The first authority that applies\nis used and reported: writer (unlocked), void, holder, creator (unlocked policy).\nThe refund goes to the writer.", "events": [{ "name": "VariationDeleted", "args": [{ "type": "uint64", "name": "asset" }, { "type": "address", "name": "writer" }, { "type": "byte[]", "name": "slot" }, { "type": "uint64", "name": "lastRevision" }, { "type": "uint8", "name": "reason" }, { "type": "uint64", "name": "round" }, { "type": "uint64", "name": "timestamp" }] }], "recommendations": {} }, { "name": "pinMainCreator", "args": [{ "type": "uint64", "name": "asset" }, { "type": "uint64", "name": "controllingApp" }, { "type": "address", "name": "writer" }, { "type": "byte[]", "name": "slot" }, { "type": "uint64", "name": "sourceRevision" }, { "type": "bool", "name": "lock" }], "returns": { "type": "(uint64,bool,(uint8,uint64))", "struct": "WriteResult" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Pin a collectible-scope variation as the creator's main image. The pin is a snapshot of its flat image.", "events": [{ "name": "MainChanged", "args": [{ "type": "uint64", "name": "asset" }, { "type": "uint64", "name": "revision" }, { "type": "uint8", "name": "role" }, { "type": "bool", "name": "cleared" }, { "type": "uint64", "name": "round" }, { "type": "uint64", "name": "timestamp" }] }], "recommendations": {} }, { "name": "pinMainHolder", "args": [{ "type": "uint64", "name": "asset" }, { "type": "address", "name": "writer" }, { "type": "byte[]", "name": "slot" }, { "type": "uint64", "name": "sourceRevision" }], "returns": { "type": "(uint64,bool,(uint8,uint64))", "struct": "WriteResult" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Pin a variation as the holder's main image. Only single-unit assets. The next transfer voids it.", "events": [{ "name": "MainChanged", "args": [{ "type": "uint64", "name": "asset" }, { "type": "uint64", "name": "revision" }, { "type": "uint8", "name": "role" }, { "type": "bool", "name": "cleared" }, { "type": "uint64", "name": "round" }, { "type": "uint64", "name": "timestamp" }] }], "recommendations": {} }, { "name": "unpinMainCreator", "args": [{ "type": "uint64", "name": "asset" }, { "type": "uint64", "name": "controllingApp" }], "returns": { "type": "(bool,uint8,uint64)", "struct": "RemoveResult" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Clear the creator section. The resolved creator, or the AssetCreator when none resolves (I12).", "events": [{ "name": "MainChanged", "args": [{ "type": "uint64", "name": "asset" }, { "type": "uint64", "name": "revision" }, { "type": "uint8", "name": "role" }, { "type": "bool", "name": "cleared" }, { "type": "uint64", "name": "round" }, { "type": "uint64", "name": "timestamp" }] }], "recommendations": {} }, { "name": "unpinMainHolder", "args": [{ "type": "uint64", "name": "asset" }], "returns": { "type": "(bool,uint8,uint64)", "struct": "RemoveResult" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Clear the holder section. Its holder, or anyone once it is void. Refunded to the holder in it.", "events": [{ "name": "MainChanged", "args": [{ "type": "uint64", "name": "asset" }, { "type": "uint64", "name": "revision" }, { "type": "uint8", "name": "role" }, { "type": "bool", "name": "cleared" }, { "type": "uint64", "name": "round" }, { "type": "uint64", "name": "timestamp" }] }], "recommendations": {} }, { "name": "setAssetPolicy", "args": [{ "type": "uint64", "name": "asset" }, { "type": "uint64", "name": "controllingApp" }, { "type": "byte[]", "name": "collectible" }, { "type": "byte[]", "name": "holder" }, { "type": "bool", "name": "managerWrites" }, { "type": "bool", "name": "holderPinsCollectibleOnly" }, { "type": "bool", "name": "lock" }], "returns": { "type": "(uint64,bool,(uint8,uint64))", "struct": "WriteResult" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Set the policy of one asset. It overrides the manager policy. `lock` is one way.", "events": [{ "name": "PolicyChanged", "args": [{ "type": "uint64", "name": "asset" }, { "type": "address", "name": "manager" }, { "type": "uint64", "name": "revision" }, { "type": "uint8", "name": "flags" }, { "type": "bool", "name": "deleted" }, { "type": "uint64", "name": "round" }, { "type": "uint64", "name": "timestamp" }] }], "recommendations": {} }, { "name": "setManagerPolicy", "args": [{ "type": "byte[]", "name": "collectible" }, { "type": "byte[]", "name": "holder" }, { "type": "bool", "name": "managerWrites" }, { "type": "bool", "name": "holderPinsCollectibleOnly" }], "returns": { "type": "(uint64,bool,(uint8,uint64))", "struct": "WriteResult" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Set the policy of every asset whose ASA manager field is the sender. It has no lock.", "events": [{ "name": "PolicyChanged", "args": [{ "type": "uint64", "name": "asset" }, { "type": "address", "name": "manager" }, { "type": "uint64", "name": "revision" }, { "type": "uint8", "name": "flags" }, { "type": "bool", "name": "deleted" }, { "type": "uint64", "name": "round" }, { "type": "uint64", "name": "timestamp" }] }], "recommendations": {} }, { "name": "deleteAssetPolicy", "args": [{ "type": "uint64", "name": "asset" }, { "type": "uint64", "name": "controllingApp" }], "returns": { "type": "(bool,uint8,uint64)", "struct": "RemoveResult" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Delete an unlocked asset policy. The resolved creator, or the AssetCreator when none resolves (I12).", "events": [{ "name": "PolicyChanged", "args": [{ "type": "uint64", "name": "asset" }, { "type": "address", "name": "manager" }, { "type": "uint64", "name": "revision" }, { "type": "uint8", "name": "flags" }, { "type": "bool", "name": "deleted" }, { "type": "uint64", "name": "round" }, { "type": "uint64", "name": "timestamp" }] }], "recommendations": {} }, { "name": "deleteManagerPolicy", "args": [], "returns": { "type": "(bool,uint8,uint64)", "struct": "RemoveResult" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Delete the sender's manager policy.", "events": [{ "name": "PolicyChanged", "args": [{ "type": "uint64", "name": "asset" }, { "type": "address", "name": "manager" }, { "type": "uint64", "name": "revision" }, { "type": "uint8", "name": "flags" }, { "type": "bool", "name": "deleted" }, { "type": "uint64", "name": "round" }, { "type": "uint64", "name": "timestamp" }] }], "recommendations": {} }, { "name": "setGrant", "args": [{ "type": "byte[]", "name": "writers" }], "returns": { "type": "(uint64,bool,(uint8,uint64))", "struct": "WriteResult" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Writers the sender admits for holder-scope entries bound to the sender, on anything the sender holds.", "events": [{ "name": "GrantChanged", "args": [{ "type": "address", "name": "holder" }, { "type": "uint64", "name": "revision" }, { "type": "bool", "name": "deleted" }, { "type": "uint64", "name": "round" }, { "type": "uint64", "name": "timestamp" }] }], "recommendations": {} }, { "name": "deleteGrant", "args": [], "returns": { "type": "(bool,uint8,uint64)", "struct": "RemoveResult" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Delete the sender's grant. Entries it admitted stay; the holder removes them separately.", "events": [{ "name": "GrantChanged", "args": [{ "type": "address", "name": "holder" }, { "type": "uint64", "name": "revision" }, { "type": "bool", "name": "deleted" }, { "type": "uint64", "name": "round" }, { "type": "uint64", "name": "timestamp" }] }], "recommendations": {} }, { "name": "purge", "args": [{ "type": "byte[]", "name": "name" }], "returns": { "type": "(bool,uint8,uint64)", "struct": "RemoveResult" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Delete one `v`, `m` or `p` box of a destroyed asset (I11). Anyone may call. `v` refunds the\nwriter in the name; `m` refunds the holder section's deposit to its holder and the rest to the\ncaller; `p` refunds the caller (no creator resolves after destroy, as in ARC-89).", "events": [{ "name": "VariationDeleted", "args": [{ "type": "uint64", "name": "asset" }, { "type": "address", "name": "writer" }, { "type": "byte[]", "name": "slot" }, { "type": "uint64", "name": "lastRevision" }, { "type": "uint8", "name": "reason" }, { "type": "uint64", "name": "round" }, { "type": "uint64", "name": "timestamp" }] }, { "name": "MainChanged", "args": [{ "type": "uint64", "name": "asset" }, { "type": "uint64", "name": "revision" }, { "type": "uint8", "name": "role" }, { "type": "bool", "name": "cleared" }, { "type": "uint64", "name": "round" }, { "type": "uint64", "name": "timestamp" }] }, { "name": "PolicyChanged", "args": [{ "type": "uint64", "name": "asset" }, { "type": "address", "name": "manager" }, { "type": "uint64", "name": "revision" }, { "type": "uint8", "name": "flags" }, { "type": "bool", "name": "deleted" }, { "type": "uint64", "name": "round" }, { "type": "uint64", "name": "timestamp" }] }], "recommendations": {} }, { "name": "getMain", "args": [{ "type": "uint64", "name": "asset" }], "returns": { "type": "(uint8,byte[])", "struct": "MainView" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "The pin that applies: a valid holder pin, else the creator pin, else role 0. `pin` is the\nsection's PinCore followed by its flat image (the holder's address is dropped).", "events": [], "recommendations": {} }], "arcs": [22, 28], "desc": "Collectible Variations registry. A singleton that can never be updated or deleted: no method\naccepts UpdateApplication or DeleteApplication.\n\nInvariants, each enforced in one place:\n I1  Every box deposit has one owner who gets its refund (`refund` sends every Algo out). The\n     owner is a role, not the payer: the sender of the write (a separate payer is never\n     refunded); for a `p` box and the creator section of `m`, whoever is creator when it is\n     removed (the purger after destroy, the AssetCreator under I12); the `m` base goes to the\n     section cleared last. A refund to a closed account below the minimum balance goes to the\n     sender instead.\n I2  Deposits are measured from the registry's own minimum balance, never computed from a rate\n     (`settle`). A positive deposit is a payment to the registry immediately before the call; a\n     zero deposit allows no such payment.\n I3  A locked entry cannot be changed by its writer. The creator can still evict a locked\n     collectible-scope entry while the effective policy is unlocked.\n I5  The writer in a `v` name is always the sender of the write.\n I6  Holder pins exist only for single-unit assets (total == 10^decimals).\n I7  Revisions come from one global counter, never 0, never repeating (`nextRevision`).\n I8  A write whose bytes equal the stored bytes is a no-op, decided before the lock check.\n I9  The creator is `resolveCreator` and nothing else.\n I10 The `m` box exists while it has a section; its two recorded deposits sum to its MBR.\n I11 After an asset is destroyed, only `purge` touches its boxes.\n I12 With no creator, the original AssetCreator may delete unlocked creator-side boxes.\n I13 Admission: local rules, then meta sets, then delegates (`admitsCollectible`, `admitsHolder`).\n I14 The registry is the only owner of every Meta root it checks (`syncMetaRoot`).\n\nPins are snapshots: a pin keeps its copy of the source's flat image after the source changes or\nis evicted, and policy flags are not retroactive (holderPinsCollectibleOnly does not void an\nexisting holder pin). The creator cannot clear a holder pin. Clients that care compare the\nPinCore source with the live variation.\n\nMeta dependency: changing or leaving a `meta` writer set, deleting such a policy or grant, and\npurging a `p` box call Meta's addRoot, updateRoot, deleteRoot, rootCosts and verify. Meta is\nDAO-upgradable while this app is not, so those five methods must keep their ABI and behaviour;\nthe registry's LocalNet suite is the guard.\n\nSize: a variation value is at most MaxValueBytes (4096) including its header, and the whole\nvalue is sent in one call. The network caps each app argument at 4096 bytes and all of them at\n16384, so the largest body argument (4084 bytes with its length prefix) fits.", "networks": {}, "state": { "schema": { "global": { "ints": 3, "bytes": 0 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "revision": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cg==" }, "metaApp": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YQ==", "desc": "The Meta app that stores and verifies `meta` writer-set roots. Fixed at create." }, "metaTreeType": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "dA==", "desc": 'The "collectible writer list" Meta tree type every `meta` root uses. Fixed at create.' } }, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": {} } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [4998, 6235], "errorMessage": "Bytes has valid prefix" }, { "pc": [3565], "errorMessage": "ERR:errCvAe" }, { "pc": [564, 1585, 1912, 2196, 2480, 2581, 2801, 3026], "errorMessage": "ERR:errCvAm" }, { "pc": [377, 641, 5679, 5693, 5729, 5743, 5786, 5831], "errorMessage": "ERR:errCvBa" }, { "pc": [3454, 3541, 3876], "errorMessage": "ERR:errCvBp" }, { "pc": [4308, 4320, 4401], "errorMessage": "ERR:errCvBs" }, { "pc": [7725, 7766], "errorMessage": "ERR:errCvDm" }, { "pc": [861, 2098, 2531, 5297, 5538], "errorMessage": "ERR:errCvLk" }, { "pc": [915, 1392, 1657, 2698], "errorMessage": "ERR:errCvNa" }, { "pc": [1947, 2835, 4461, 4481], "errorMessage": "ERR:errCvNc" }, { "pc": [898, 2264], "errorMessage": "ERR:errCvNh" }, { "pc": [960], "errorMessage": "ERR:errCvPf" }, { "pc": [6474], "errorMessage": "ERR:errCvSc" }, { "pc": [6425], "errorMessage": "ERR:errCvSm" }, { "pc": [1969, 2295, 2327, 6484], "errorMessage": "ERR:errCvSn" }, { "pc": [2242], "errorMessage": "ERR:errCvSu" }, { "pc": [688], "errorMessage": "ERR:errCvTl" }, { "pc": [6152, 6296], "errorMessage": "Length must be 32" }, { "pc": [998, 1662, 1670, 3212, 3344, 3589, 3604, 3717, 3816, 5305, 5543, 6343, 6381, 6963, 6999, 7217, 7230, 7350, 7555], "errorMessage": "account funded" }, { "pc": [4296, 6247], "errorMessage": "application exists" }, { "pc": [4944, 4950, 6088, 6301, 7539], "errorMessage": "check GlobalState exists" }, { "pc": [427, 488, 506, 538, 1559, 1864, 2159, 2726, 2744, 2905, 2921, 3113, 3432], "errorMessage": "invalid array length header" }, { "pc": [478, 1895, 2764, 2775, 2786, 2939, 2949], "errorMessage": "invalid number of bytes for arc4.bool" }, { "pc": [434, 495, 513, 1566, 1871, 2166, 2733, 2751, 2912, 2928, 3120, 3439], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [550], "errorMessage": "invalid number of bytes for arc4.dynamic_array<bytes[32]>" }, { "pc": [450, 1553, 1858, 2153], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [353, 363, 408, 418, 526, 1529, 1539, 1834, 1844, 1884, 2140, 2179, 2455, 2465, 2568, 2708, 2718, 3002, 3012, 3890], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [460, 470], "errorMessage": "invalid number of bytes for arc4.uint8" }, { "pc": [5003], "errorMessage": "invalid number of bytes for bool" }, { "pc": [6240], "errorMessage": "invalid number of bytes for uint64" }, { "pc": [1025, 1706, 2548, 2675, 5567, 7858, 7925, 7977], "errorMessage": "overflow" }, { "pc": [7659, 7755], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDEzCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCiNwcmFnbWEgYXV0b3NhbHQgZmFsc2UKCi8vIEBhbGdvcmFuZGZvdW5kYXRpb24vYWxnb3JhbmQtdHlwZXNjcmlwdC9hcmM0L2luZGV4LmQudHM6OkNvbnRyYWN0LmFwcHJvdmFsUHJvZ3JhbSgpIC0+IHVpbnQ2NDoKbWFpbjoKICAgIGludGNibG9jayAwIDEgMiA4IDEyOAogICAgYnl0ZWNibG9jayAiIiAweDE1MWY3Yzc1IDB4MDAwMDAwMDAwMDAwMDAwMDAwMDAgMHg4MCAweDAwICJtIiAiRVJSOmVyckN2QmEiICJFUlI6ZXJyQ3ZBbSIgMHgwMSAiZyIgIkVSUjplcnJDdkxrIiAidiIgIkVSUjplcnJDdk5hIiAiRVJSOmVyckN2TmMiICJFUlI6ZXJyQ3ZTbiIgInAiICJyIiAiYSIgInQiIDB4MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAgImgiICJjIiAiUCIgIkVSUjplcnJDdkJwIiAiRVJSOmVyckN2QnMiIDB4MDAwNCAiRVJSOmVyckN2TmgiIDB4NDQxNjU5MTQgMHgwMDAwMDAwMDAwMDAwMDAwMDAgIkVSUjplcnJDdkRtIgogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgIGJueiBtYWluX2FmdGVyX2lmX2Vsc2VAMgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoyMDYKICAgIC8vIHJldmlzaW9uID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogR2xvYmFsU3RhdGVLZXlSZXZpc2lvbiwgaW5pdGlhbFZhbHVlOiAwIH0pCiAgICBieXRlYyAxNiAvLyAiciIKICAgIGludGNfMCAvLyAwCiAgICBhcHBfZ2xvYmFsX3B1dAoKbWFpbl9hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjIwNC0yMDUKICAgIC8vIEBjb250cmFjdCh7IGF2bVZlcnNpb246IDEzIH0pCiAgICAvLyBleHBvcnQgY2xhc3MgQ29sbGVjdGlibGVWYXJpYXRpb25zIGV4dGVuZHMgQ29udHJhY3QgewogICAgdHhuIE9uQ29tcGxldGlvbgogICAgIQogICAgYXNzZXJ0CiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgYnogbWFpbl9jcmVhdGVfTm9PcEAyMAogICAgcHVzaGJ5dGVzcyAweDBiMDIwMThiIDB4MWIzOWJhNGIgMHgzMjM1MjY2YiAweGFhMzhiNGJlIDB4ZjczMDUwM2IgMHg3NTk2OWE1OSAweGIyMmVhMjliIDB4ZGQ1M2I1Y2YgMHhjNmEyMDU0OSAweDY1ZGM5YTY4IDB4YjNjMDI5NTggMHgyOGZmNWI3NCAweGQ5MmZiY2Y2IDB4OTUwOGNiNjEgLy8gbWV0aG9kICJ3cml0ZVZhcmlhdGlvbih1aW50NjQsdWludDY0LGJ5dGVbXSxhZGRyZXNzLHVpbnQ4LHVpbnQ4LGJvb2wsYnl0ZVtdLGJ5dGVbXSx1aW50NjQsYnl0ZVszMl1bXSkodWludDY0LGJvb2wsKHVpbnQ4LHVpbnQ2NCkpIiwgbWV0aG9kICJkZWxldGVWYXJpYXRpb24odWludDY0LHVpbnQ2NCxhZGRyZXNzLGJ5dGVbXSkoYm9vbCx1aW50OCx1aW50NjQpIiwgbWV0aG9kICJwaW5NYWluQ3JlYXRvcih1aW50NjQsdWludDY0LGFkZHJlc3MsYnl0ZVtdLHVpbnQ2NCxib29sKSh1aW50NjQsYm9vbCwodWludDgsdWludDY0KSkiLCBtZXRob2QgInBpbk1haW5Ib2xkZXIodWludDY0LGFkZHJlc3MsYnl0ZVtdLHVpbnQ2NCkodWludDY0LGJvb2wsKHVpbnQ4LHVpbnQ2NCkpIiwgbWV0aG9kICJ1bnBpbk1haW5DcmVhdG9yKHVpbnQ2NCx1aW50NjQpKGJvb2wsdWludDgsdWludDY0KSIsIG1ldGhvZCAidW5waW5NYWluSG9sZGVyKHVpbnQ2NCkoYm9vbCx1aW50OCx1aW50NjQpIiwgbWV0aG9kICJzZXRBc3NldFBvbGljeSh1aW50NjQsdWludDY0LGJ5dGVbXSxieXRlW10sYm9vbCxib29sLGJvb2wpKHVpbnQ2NCxib29sLCh1aW50OCx1aW50NjQpKSIsIG1ldGhvZCAic2V0TWFuYWdlclBvbGljeShieXRlW10sYnl0ZVtdLGJvb2wsYm9vbCkodWludDY0LGJvb2wsKHVpbnQ4LHVpbnQ2NCkpIiwgbWV0aG9kICJkZWxldGVBc3NldFBvbGljeSh1aW50NjQsdWludDY0KShib29sLHVpbnQ4LHVpbnQ2NCkiLCBtZXRob2QgImRlbGV0ZU1hbmFnZXJQb2xpY3koKShib29sLHVpbnQ4LHVpbnQ2NCkiLCBtZXRob2QgInNldEdyYW50KGJ5dGVbXSkodWludDY0LGJvb2wsKHVpbnQ4LHVpbnQ2NCkpIiwgbWV0aG9kICJkZWxldGVHcmFudCgpKGJvb2wsdWludDgsdWludDY0KSIsIG1ldGhvZCAicHVyZ2UoYnl0ZVtdKShib29sLHVpbnQ4LHVpbnQ2NCkiLCBtZXRob2QgImdldE1haW4odWludDY0KSh1aW50OCxieXRlW10pIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggd3JpdGVWYXJpYXRpb24gZGVsZXRlVmFyaWF0aW9uIHBpbk1haW5DcmVhdG9yIHBpbk1haW5Ib2xkZXIgdW5waW5NYWluQ3JlYXRvciB1bnBpbk1haW5Ib2xkZXIgc2V0QXNzZXRQb2xpY3kgc2V0TWFuYWdlclBvbGljeSBkZWxldGVBc3NldFBvbGljeSBkZWxldGVNYW5hZ2VyUG9saWN5IHNldEdyYW50IGRlbGV0ZUdyYW50IHB1cmdlIGdldE1haW4KICAgIGVycgoKbWFpbl9jcmVhdGVfTm9PcEAyMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjA0LTIwNQogICAgLy8gQGNvbnRyYWN0KHsgYXZtVmVyc2lvbjogMTMgfSkKICAgIC8vIGV4cG9ydCBjbGFzcyBDb2xsZWN0aWJsZVZhcmlhdGlvbnMgZXh0ZW5kcyBDb250cmFjdCB7CiAgICBwdXNoYnl0ZXMgMHg5NDc5ZmY2MyAvLyBtZXRob2QgImNyZWF0ZSh1aW50NjQsdWludDY0KXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBjcmVhdGUKICAgIGVycgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy5jcmVhdGVbcm91dGluZ10oKSAtPiB2b2lkOgpjcmVhdGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjIxNAogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoyMTcKICAgIC8vIGxvZ2dlZEFzc2VydChtZXRhQXBwICE9PSAwICYmIG1ldGFUcmVlVHlwZSAhPT0gMCwgZXJyQmFkQXJndW1lbnQpCiAgICBieiBjcmVhdGVfYm9vbF9mYWxzZUA0CiAgICBkdXAKICAgIGJ6IGNyZWF0ZV9ib29sX2ZhbHNlQDQKICAgIGludGNfMSAvLyAxCgpjcmVhdGVfYm9vbF9tZXJnZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoyMTcKICAgIC8vIGxvZ2dlZEFzc2VydChtZXRhQXBwICE9PSAwICYmIG1ldGFUcmVlVHlwZSAhPT0gMCwgZXJyQmFkQXJndW1lbnQpCiAgICBibnogY3JlYXRlX2FmdGVyX2Fzc2VydEA3CiAgICBieXRlYyA2IC8vICJFUlI6ZXJyQ3ZCYSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJDdkJhCgpjcmVhdGVfYWZ0ZXJfYXNzZXJ0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjIwOAogICAgLy8gbWV0YUFwcCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5TWV0YUFwcCB9KQogICAgYnl0ZWMgMTcgLy8gImEiCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjIxOAogICAgLy8gdGhpcy5tZXRhQXBwLnZhbHVlID0gbWV0YUFwcAogICAgdW5jb3ZlciAyCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoyMTAKICAgIC8vIG1ldGFUcmVlVHlwZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5TWV0YVRyZWVUeXBlIH0pCiAgICBieXRlYyAxOCAvLyAidCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjE5CiAgICAvLyB0aGlzLm1ldGFUcmVlVHlwZS52YWx1ZSA9IG1ldGFUcmVlVHlwZQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjIwCiAgICAvLyBvcC5BcHBQYXJhbXNTZXQuYXBwRm9yZWlnbkJveFJlYWRzKHRydWUpCiAgICBpbnRjXzEgLy8gMQogICAgYXBwX3BhcmFtc19zZXQgQXBwRm9yZWlnbkJveFJlYWRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjIxNAogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmNyZWF0ZV9ib29sX2ZhbHNlQDQ6CiAgICBpbnRjXzAgLy8gMAogICAgYiBjcmVhdGVfYm9vbF9tZXJnZUA1CgoKLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo6Q29sbGVjdGlibGVWYXJpYXRpb25zLndyaXRlVmFyaWF0aW9uW3JvdXRpbmddKCkgLT4gdm9pZDoKd3JpdGVWYXJpYXRpb246CiAgICBpbnRjXzAgLy8gMAogICAgZHVwbiA1CiAgICBieXRlY18wIC8vICIiCiAgICBkdXBuIDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjMwCiAgICAvLyBAYWJpbWV0aG9kKCkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgMgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIGNvdmVyIDIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgY292ZXIgMwogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDUKICAgIGR1cAogICAgY292ZXIgMwogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50OAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNgogICAgZHVwCiAgICBjb3ZlciAzCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ4CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA3CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18xIC8vIDEKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuYm9vbAogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgY292ZXIgMgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgOAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIGNvdmVyIDMKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDkKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBjb3ZlciAzCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxMAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgMwogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTEKICAgIGR1cAogICAgY292ZXIgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgZHVwCiAgICBjb3ZlciA2CiAgICBwdXNoaW50IDMyCiAgICAqCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8Ynl0ZXNbMzJdPgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoyNDQKICAgIC8vIGNvbnN0IGZhY3RzID0gdGhpcy5hc3NldEZhY3RzKGFzc2V0KQogICAgY2FsbHN1YiBhc3NldEZhY3RzCiAgICBkdXAKICAgIGNvdmVyIDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjQ1CiAgICAvLyBsb2dnZWRBc3NlcnQoZmFjdHMuZXhpc3RzLCBlcnJBc3NldE1pc3NpbmcpCiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Yml0CiAgICBibnogd3JpdGVWYXJpYXRpb25fYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDcgLy8gIkVSUjplcnJDdkFtIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckN2QW0KCndyaXRlVmFyaWF0aW9uX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoyNDYKICAgIC8vIGNvbnN0IGhvbGRlclNjb3BlID0gaG9sZGVyICE9PSBHbG9iYWwuemVyb0FkZHJlc3MKICAgIGRpZyAxMAogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICAhPQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI0NwogICAgLy8gY29uc3QgaGVhZGVyOiB1aW50NjQgPSBob2xkZXJTY29wZSA/IFZGbGF0SG9sZGVyIDogVkZsYXRDb2xsZWN0aWJsZQogICAgcHVzaGludHMgMTQgNDcKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBidXJ5IDIwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI0OAogICAgLy8gY29uc3QgbmVlZHNGbGF0ID0ga2luZC5hc1VpbnQ2NCgpID09PSBLaW5kSW1hZ2UgfHwga2luZC5hc1VpbnQ2NCgpID09PSBLaW5kUmVuZGVyQnVuZGxlCiAgICBkaWcgMTAKICAgIGJ0b2kKICAgIGR1cAogICAgaW50Y18xIC8vIDEKICAgID09CiAgICBibnogd3JpdGVWYXJpYXRpb25fYm9vbF90cnVlQDUKICAgIGR1cAogICAgaW50Y18yIC8vIDIKICAgID09CiAgICBieiB3cml0ZVZhcmlhdGlvbl9ib29sX2ZhbHNlQDYKCndyaXRlVmFyaWF0aW9uX2Jvb2xfdHJ1ZUA1OgogICAgaW50Y18xIC8vIDEKICAgIGJ1cnkgMjAKCndyaXRlVmFyaWF0aW9uX2Jvb2xfbWVyZ2VANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjUwLTI1MQogICAgLy8ga2luZC5hc1VpbnQ2NCgpICE9PSAwICYmCiAgICAvLyAgIHNsb3QubGVuZ3RoID49IDEgJiYKICAgIGJ6IHdyaXRlVmFyaWF0aW9uX2Jvb2xfZmFsc2VAMTQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjUxCiAgICAvLyBzbG90Lmxlbmd0aCA+PSAxICYmCiAgICBkaWcgMTIKICAgIGxlbgogICAgZHVwCiAgICBidXJ5IDE4CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI1MC0yNTEKICAgIC8vIGtpbmQuYXNVaW50NjQoKSAhPT0gMCAmJgogICAgLy8gICBzbG90Lmxlbmd0aCA+PSAxICYmCiAgICBieiB3cml0ZVZhcmlhdGlvbl9ib29sX2ZhbHNlQDE0CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI1MgogICAgLy8gc2xvdC5sZW5ndGggPD0gTWF4U2xvdEJ5dGVzICYmCiAgICBkaWcgMTYKICAgIHB1c2hpbnQgMjMKICAgIDw9CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI1MC0yNTIKICAgIC8vIGtpbmQuYXNVaW50NjQoKSAhPT0gMCAmJgogICAgLy8gICBzbG90Lmxlbmd0aCA+PSAxICYmCiAgICAvLyAgIHNsb3QubGVuZ3RoIDw9IE1heFNsb3RCeXRlcyAmJgogICAgYnogd3JpdGVWYXJpYXRpb25fYm9vbF9mYWxzZUAxNAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoyNTMKICAgIC8vIHByb29mLmxlbmd0aCA8PSBNYXhQcm9vZkxldmVscyAmJgogICAgZGlnIDUKICAgIHB1c2hpbnQgMjQKICAgIDw9CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI1MC0yNTMKICAgIC8vIGtpbmQuYXNVaW50NjQoKSAhPT0gMCAmJgogICAgLy8gICBzbG90Lmxlbmd0aCA+PSAxICYmCiAgICAvLyAgIHNsb3QubGVuZ3RoIDw9IE1heFNsb3RCeXRlcyAmJgogICAgLy8gICBwcm9vZi5sZW5ndGggPD0gTWF4UHJvb2ZMZXZlbHMgJiYKICAgIGJ6IHdyaXRlVmFyaWF0aW9uX2Jvb2xfZmFsc2VAMTQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjU0CiAgICAvLyAoIW5lZWRzRmxhdCB8fCBmbGF0Lmxlbmd0aCA+IDApLAogICAgZGlnIDE4CiAgICBieiB3cml0ZVZhcmlhdGlvbl9ib29sX3RydWVAMTMKICAgIGRpZyA4CiAgICBsZW4KICAgIGJ6IHdyaXRlVmFyaWF0aW9uX2Jvb2xfZmFsc2VAMTQKCndyaXRlVmFyaWF0aW9uX2Jvb2xfdHJ1ZUAxMzoKICAgIGludGNfMSAvLyAxCgp3cml0ZVZhcmlhdGlvbl9ib29sX21lcmdlQDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoyNDktMjU2CiAgICAvLyBsb2dnZWRBc3NlcnQoCiAgICAvLyAgIGtpbmQuYXNVaW50NjQoKSAhPT0gMCAmJgogICAgLy8gICAgIHNsb3QubGVuZ3RoID49IDEgJiYKICAgIC8vICAgICBzbG90Lmxlbmd0aCA8PSBNYXhTbG90Qnl0ZXMgJiYKICAgIC8vICAgICBwcm9vZi5sZW5ndGggPD0gTWF4UHJvb2ZMZXZlbHMgJiYKICAgIC8vICAgICAoIW5lZWRzRmxhdCB8fCBmbGF0Lmxlbmd0aCA+IDApLAogICAgLy8gICBlcnJCYWRBcmd1bWVudCwKICAgIC8vICkKICAgIGJueiB3cml0ZVZhcmlhdGlvbl9hZnRlcl9hc3NlcnRAMTcKICAgIGJ5dGVjIDYgLy8gIkVSUjplcnJDdkJhIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckN2QmEKCndyaXRlVmFyaWF0aW9uX2FmdGVyX2Fzc2VydEAxNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjU3CiAgICAvLyBsb2dnZWRBc3NlcnQoZmxhdC5sZW5ndGggPD0gTWF4RmxhdEJ5dGVzICYmIGhlYWRlciArIGZsYXQubGVuZ3RoICsgYm9keS5sZW5ndGggPD0gTWF4VmFsdWVCeXRlcywgZXJyVG9vTGFyZ2UpCiAgICBkaWcgOAogICAgbGVuCiAgICBkdXAKICAgIGJ1cnkgMTcKICAgIHB1c2hpbnQgNzY4CiAgICA8PQogICAgYnogd3JpdGVWYXJpYXRpb25fYm9vbF9mYWxzZUAyMAogICAgZGlnIDE5CiAgICBkaWcgMTYKICAgICsKICAgIGRpZyA4CiAgICBsZW4KICAgICsKICAgIHB1c2hpbnQgNDA5NgogICAgPD0KICAgIGJ6IHdyaXRlVmFyaWF0aW9uX2Jvb2xfZmFsc2VAMjAKICAgIGludGNfMSAvLyAxCgp3cml0ZVZhcmlhdGlvbl9ib29sX21lcmdlQDIxOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoyNTcKICAgIC8vIGxvZ2dlZEFzc2VydChmbGF0Lmxlbmd0aCA8PSBNYXhGbGF0Qnl0ZXMgJiYgaGVhZGVyICsgZmxhdC5sZW5ndGggKyBib2R5Lmxlbmd0aCA8PSBNYXhWYWx1ZUJ5dGVzLCBlcnJUb29MYXJnZSkKICAgIGJueiB3cml0ZVZhcmlhdGlvbl9hZnRlcl9hc3NlcnRAMjMKICAgIHB1c2hieXRlcyAiRVJSOmVyckN2VGwiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQ3ZUbAoKd3JpdGVWYXJpYXRpb25fYWZ0ZXJfYXNzZXJ0QDIzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoyNjAKICAgIC8vIGlmIChsb2NrKSBmbGFncyA9IGZsYWdzIHwgRmxhZ0xvY2tlZAogICAgdW5jb3ZlciAzCiAgICBibnogd3JpdGVWYXJpYXRpb25faWZfYm9keUAyNAogICAgZHVwCiAgICBidXJ5IDIxCgp3cml0ZVZhcmlhdGlvbl9hZnRlcl9pZl9lbHNlQDI1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoyNjEKICAgIC8vIGNvbnN0IG5hbWUgPSB0aGlzLnZhcmlhdGlvbk5hbWUoYXNzZXQsIFR4bi5zZW5kZXIsIHNsb3QpCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNjAKICAgIC8vIHJldHVybiBQcmVmaXhWYXJpYXRpb24uY29uY2F0KGl0b2IoYXNzZXQpKS5jb25jYXQod3JpdGVyLmJ5dGVzKS5jb25jYXQoc2xvdCkKICAgIGRpZyAzCiAgICBpdG9iCiAgICBkdXAKICAgIGJ1cnkgMjUKICAgIGJ5dGVjIDExIC8vICJ2IgogICAgc3dhcAogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGRpZyAxMgogICAgY29uY2F0CiAgICBkdXAKICAgIGJ1cnkgMjYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjYyCiAgICAvLyBjb25zdCBbc3RvcmVkLCBleGlzdHNdID0gb3AuQm94LmdldChuYW1lKQogICAgYm94X2dldAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBidXJ5IDI0CiAgICBidXJ5IDI1CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI2MwogICAgLy8gY29uc3Qgc3RvcmVkUmV2aXNpb246IHVpbnQ2NCA9IGV4aXN0cyA/IGJ0b2koc3RvcmVkLnNsaWNlKFZSZXZpc2lvbiwgVlJldmlzaW9uICsgOCkpIDogMAogICAgYnogd3JpdGVWYXJpYXRpb25fdGVybmFyeV9mYWxzZUAyNwogICAgZGlnIDIzCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA0CiAgICBkaWcgMQogICAgPj0KICAgIHB1c2hpbnQgNAogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBwdXNoaW50IDEyCiAgICBkaWcgMgogICAgPj0KICAgIHB1c2hpbnQgMTIKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIHN1YnN0cmluZzMKICAgIGJ0b2kKICAgIGJ1cnkgMTcKCndyaXRlVmFyaWF0aW9uX3Rlcm5hcnlfbWVyZ2VAMjg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI2NgogICAgLy8gY29uc3QgY2FuZGlkYXRlID0gdGhpcy52YXJpYXRpb25WYWx1ZShmbGFncywga2luZCwgc3ViLCBzdG9yZWRSZXZpc2lvbiwgaG9sZGVyLCBmYWN0cy5kZWNpbWFscywgZmxhdCwgYm9keSkKICAgIGRpZyAzCiAgICBwdXNoaW50IDEwNQogICAgZXh0cmFjdF91aW50NjQKICAgIGRpZyAyMQogICAgZGlnIDExCiAgICBkaWcgMTEKICAgIGRpZyAyMAogICAgZGlnIDE1CiAgICB1bmNvdmVyIDUKICAgIGRpZyAxMwogICAgZGlnIDEzCiAgICBjYWxsc3ViIHZhcmlhdGlvblZhbHVlCiAgICBidXJ5IDI4CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI2NwogICAgLy8gaWYgKGV4aXN0cyAmJiBjYW5kaWRhdGUgPT09IHN0b3JlZCkgewogICAgZGlnIDIxCiAgICBieiB3cml0ZVZhcmlhdGlvbl9hZnRlcl9pZl9lbHNlQDMxCiAgICBkaWcgMjcKICAgIGRpZyAyNAogICAgPT0KICAgIGJ6IHdyaXRlVmFyaWF0aW9uX2FmdGVyX2lmX2Vsc2VAMzEKICAgIHBvcG4gMwogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoyNjgKICAgIC8vIHRoaXMuZXhwZWN0Tm9QYXltZW50KCkKICAgIGNhbGxzdWIgZXhwZWN0Tm9QYXltZW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI2OQogICAgLy8gcmV0dXJuIHsgcmV2aXNpb246IHN0b3JlZFJldmlzaW9uLCBjaGFuZ2VkOiBmYWxzZSwgbWJyOiB7IHNpZ246IG5ldyBVaW50OChNYnJOdWxsKSwgYW1vdW50OiAwIH0gfQogICAgZGlnIDEzCiAgICBpdG9iCiAgICBieXRlY18yIC8vIDB4MDAwMDAwMDAwMDAwMDAwMDAwMDAKICAgIGNvbmNhdAoKd3JpdGVWYXJpYXRpb25fYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMud3JpdGVWYXJpYXRpb25ANjc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjIzMAogICAgLy8gQGFiaW1ldGhvZCgpCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgp3cml0ZVZhcmlhdGlvbl9hZnRlcl9pZl9lbHNlQDMxOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoyNzMKICAgIC8vIGlmIChleGlzdHMgJiYgKGdldEJ5dGUoc3RvcmVkLCBWRmxhZ3MpICYgRmxhZ0xvY2tlZCkgIT09IDApIHsKICAgIGRpZyAyMQogICAgYnogd3JpdGVWYXJpYXRpb25fYWZ0ZXJfaWZfZWxzZUA0MAogICAgZGlnIDIzCiAgICBpbnRjXzEgLy8gMQogICAgZ2V0Ynl0ZQogICAgZHVwCiAgICBidXJ5IDE1CiAgICBpbnRjIDQgLy8gMTI4CiAgICAmCiAgICBieiB3cml0ZVZhcmlhdGlvbl9hZnRlcl9pZl9lbHNlQDQwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI3NQogICAgLy8gKGdldEJ5dGUoc3RvcmVkLCBWRmxhZ3MpICYgRmxhZ0hvbGRlclNjb3BlKSAhPT0gMCAmJgogICAgZGlnIDEzCiAgICBpbnRjXzEgLy8gMQogICAgJgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoyNzUtMjc2CiAgICAvLyAoZ2V0Qnl0ZShzdG9yZWQsIFZGbGFncykgJiBGbGFnSG9sZGVyU2NvcGUpICE9PSAwICYmCiAgICAvLyAgICF0aGlzLmhvbGRzKHRoaXMuc3RvcmVkSG9sZGVyKHN0b3JlZCksIGFzc2V0LCBnZXRCeXRlKHN0b3JlZCwgVkRlY2ltYWxzKSksCiAgICBieiB3cml0ZVZhcmlhdGlvbl9ib29sX2ZhbHNlQDM2CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI3NgogICAgLy8gIXRoaXMuaG9sZHModGhpcy5zdG9yZWRIb2xkZXIoc3RvcmVkKSwgYXNzZXQsIGdldEJ5dGUoc3RvcmVkLCBWRGVjaW1hbHMpKSwKICAgIGRpZyAyMwogICAgZHVwCiAgICBjYWxsc3ViIHN0b3JlZEhvbGRlcgogICAgc3dhcAogICAgcHVzaGludCA0NgogICAgZ2V0Ynl0ZQogICAgZGlnIDQKICAgIHN3YXAKICAgIGNhbGxzdWIgaG9sZHMKICAgIGJueiB3cml0ZVZhcmlhdGlvbl9ib29sX2ZhbHNlQDM2CiAgICBpbnRjXzEgLy8gMQoKd3JpdGVWYXJpYXRpb25fYm9vbF9tZXJnZUAzNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mjc0LTI3OAogICAgLy8gbG9nZ2VkQXNzZXJ0KAogICAgLy8gICAoZ2V0Qnl0ZShzdG9yZWQsIFZGbGFncykgJiBGbGFnSG9sZGVyU2NvcGUpICE9PSAwICYmCiAgICAvLyAgICAgIXRoaXMuaG9sZHModGhpcy5zdG9yZWRIb2xkZXIoc3RvcmVkKSwgYXNzZXQsIGdldEJ5dGUoc3RvcmVkLCBWRGVjaW1hbHMpKSwKICAgIC8vICAgZXJyTG9ja2VkLAogICAgLy8gKQogICAgYm56IHdyaXRlVmFyaWF0aW9uX2FmdGVyX2lmX2Vsc2VANDAKICAgIGJ5dGVjIDEwIC8vICJFUlI6ZXJyQ3ZMayIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJDdkxrCgp3cml0ZVZhcmlhdGlvbl9hZnRlcl9pZl9lbHNlQDQwOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoyODIKICAgIC8vIGlmIChob2xkZXJTY29wZSkgewogICAgYnogd3JpdGVWYXJpYXRpb25fZWxzZV9ib2R5QDUwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI4MwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuaXNVbml0QXNzZXQoZmFjdHMpICYmIHRoaXMuaG9sZHMoaG9sZGVyLCBhc3NldCwgZmFjdHMuZGVjaW1hbHMpLCBlcnJOb3RIb2xkZXIpCiAgICBkaWcgMgogICAgY2FsbHN1YiBpc1VuaXRBc3NldAogICAgYnVyeSA0CiAgICBieiB3cml0ZVZhcmlhdGlvbl9ib29sX2ZhbHNlQDQ0CiAgICBkaWcgMgogICAgcHVzaGludCAxMDUKICAgIGV4dHJhY3RfdWludDY0CiAgICBkaWcgMTAKICAgIGRpZyAzCiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgaG9sZHMKICAgIGJ6IHdyaXRlVmFyaWF0aW9uX2Jvb2xfZmFsc2VANDQKICAgIGludGNfMSAvLyAxCgp3cml0ZVZhcmlhdGlvbl9ib29sX21lcmdlQDQ1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoyODMKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmlzVW5pdEFzc2V0KGZhY3RzKSAmJiB0aGlzLmhvbGRzKGhvbGRlciwgYXNzZXQsIGZhY3RzLmRlY2ltYWxzKSwgZXJyTm90SG9sZGVyKQogICAgYm56IHdyaXRlVmFyaWF0aW9uX2FmdGVyX2Fzc2VydEA0NwogICAgYnl0ZWMgMjYgLy8gIkVSUjplcnJDdk5oIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckN2TmgKCndyaXRlVmFyaWF0aW9uX2FmdGVyX2Fzc2VydEA0NzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6Nzg5CiAgICAvLyBpZiAoVHhuLnNlbmRlciA9PT0gaG9sZGVyKSByZXR1cm4gdHJ1ZQogICAgdHhuIFNlbmRlcgogICAgZGlnIDEwCiAgICA9PQogICAgYnogd3JpdGVWYXJpYXRpb25fYWZ0ZXJfaWZfZWxzZUA4MQogICAgcG9wbiAyCiAgICBpbnRjXzEgLy8gMQoKd3JpdGVWYXJpYXRpb25fYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMuYWRtaXRzSG9sZGVyQDk2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoyODQKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmFkbWl0c0hvbGRlcihhc3NldCwgZmFjdHMsIHNsb3QsIGhvbGRlciwgcHJvb2YpLCBlcnJOb3RBdXRob3JpemVkKQogICAgYm56IHdyaXRlVmFyaWF0aW9uX2FmdGVyX2lmX2Vsc2VANTMKICAgIGJ5dGVjIDEyIC8vICJFUlI6ZXJyQ3ZOYSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJDdk5hCgp3cml0ZVZhcmlhdGlvbl9hZnRlcl9pZl9lbHNlQDUzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoyOTAKICAgIC8vIGlmUmV2aXNpb24gPT09IElmQW55IHx8IChpZlJldmlzaW9uID09PSBJZkFic2VudCA/ICFleGlzdHMgOiBleGlzdHMgJiYgc3RvcmVkUmV2aXNpb24gPT09IGlmUmV2aXNpb24pLAogICAgZGlnIDIKICAgIHB1c2hpbnQgMTg0NDY3NDQwNzM3MDk1NTE2MTUKICAgID09CiAgICBibnogd3JpdGVWYXJpYXRpb25fYm9vbF90cnVlQDYyCiAgICBkaWcgMgogICAgYm56IHdyaXRlVmFyaWF0aW9uX3Rlcm5hcnlfZmFsc2VANTYKICAgIGRpZyAxOAogICAgIQoKd3JpdGVWYXJpYXRpb25fdGVybmFyeV9tZXJnZUA2MToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjkwCiAgICAvLyBpZlJldmlzaW9uID09PSBJZkFueSB8fCAoaWZSZXZpc2lvbiA9PT0gSWZBYnNlbnQgPyAhZXhpc3RzIDogZXhpc3RzICYmIHN0b3JlZFJldmlzaW9uID09PSBpZlJldmlzaW9uKSwKICAgIGJ6IHdyaXRlVmFyaWF0aW9uX2Jvb2xfZmFsc2VANjMKCndyaXRlVmFyaWF0aW9uX2Jvb2xfdHJ1ZUA2MjoKICAgIGludGNfMSAvLyAxCgp3cml0ZVZhcmlhdGlvbl9ib29sX21lcmdlQDY0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoyODktMjkyCiAgICAvLyBsb2dnZWRBc3NlcnQoCiAgICAvLyAgIGlmUmV2aXNpb24gPT09IElmQW55IHx8IChpZlJldmlzaW9uID09PSBJZkFic2VudCA/ICFleGlzdHMgOiBleGlzdHMgJiYgc3RvcmVkUmV2aXNpb24gPT09IGlmUmV2aXNpb24pLAogICAgLy8gICBlcnJQcmVjb25kaXRpb25GYWlsZWQsCiAgICAvLyApCiAgICBibnogd3JpdGVWYXJpYXRpb25fYWZ0ZXJfYXNzZXJ0QDY2CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJDdlBmIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckN2UGYKCndyaXRlVmFyaWF0aW9uX2FmdGVyX2Fzc2VydEA2NjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mjk0CiAgICAvLyBjb25zdCByZXZpc2lvbiA9IHRoaXMubmV4dFJldmlzaW9uKCkKICAgIGNhbGxzdWIgbmV4dFJldmlzaW9uCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI5NQogICAgLy8gY29uc3QgdmFsdWUgPSB0aGlzLnZhcmlhdGlvblZhbHVlKGZsYWdzLCBraW5kLCBzdWIsIHJldmlzaW9uLCBob2xkZXIsIGZhY3RzLmRlY2ltYWxzLCBmbGF0LCBib2R5KQogICAgZGlnIDEKICAgIHB1c2hpbnQgMTA1CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZGlnIDE5CiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGRpZyAxMAogICAgZHVwCiAgICBjb3ZlciA1CiAgICBkaWcgMTEKICAgIGRpZyA0CiAgICBkaWcgMTUKICAgIHVuY292ZXIgNQogICAgZGlnIDEzCiAgICBkaWcgMTMKICAgIGNhbGxzdWIgdmFyaWF0aW9uVmFsdWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTEwOAogICAgLy8gcmV0dXJuIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLm1pbkJhbGFuY2UKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdE1pbkJhbGFuY2UKICAgIGFzc2VydCAvLyBhY2NvdW50IGZ1bmRlZAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoyOTcKICAgIC8vIHRoaXMucHV0Qm94KG5hbWUsIHZhbHVlKQogICAgZGlnIDI2CiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgcHV0Qm94CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI5OAogICAgLy8gY29uc3QgbWJyID0gdGhpcy5zZXR0bGUoYmVmb3JlLCB7IHBhaWQ6IDAsIHJlZnVuZGVkOiAwIH0sIFR4bi5zZW5kZXIpCiAgICBieXRlYyAxOSAvLyAweDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwCiAgICB0eG4gU2VuZGVyCiAgICBjYWxsc3ViIHNldHRsZQogICAgcG9wCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjMwMgogICAgLy8gd3JpdGVyOiBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czozMDUKICAgIC8vIGZsYWdzOiBuZXcgVWludDgoZmxhZ3MpLAogICAgdW5jb3ZlciAyCiAgICBpdG9iCiAgICBkdXAKICAgIGJpdGxlbgogICAgaW50Y18zIC8vIDgKICAgIDw9CiAgICBhc3NlcnQgLy8gb3ZlcmZsb3cKICAgIGV4dHJhY3QgNyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjMwNwogICAgLy8gcm91bmQ6IEdsb2JhbC5yb3VuZCwKICAgIGdsb2JhbCBSb3VuZAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czozMDgKICAgIC8vIHRpbWVzdGFtcDogR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzAwLTMwOQogICAgLy8gZW1pdDxWYXJpYXRpb25Xcml0dGVuPih7CiAgICAvLyAgIGFzc2V0LAogICAgLy8gICB3cml0ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgIHNsb3QsCiAgICAvLyAgIHJldmlzaW9uLAogICAgLy8gICBmbGFnczogbmV3IFVpbnQ4KGZsYWdzKSwKICAgIC8vICAga2luZCwKICAgIC8vICAgcm91bmQ6IEdsb2JhbC5yb3VuZCwKICAgIC8vICAgdGltZXN0YW1wOiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgLy8gfSkKICAgIGRpZyAyNgogICAgdW5jb3ZlciA0CiAgICBjb25jYXQKICAgIGRpZyAxNQogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIHB1c2hieXRlcyAweDAwNDQKICAgIGNvbmNhdAogICAgdW5jb3ZlciA1CiAgICBpdG9iCiAgICBzd2FwCiAgICBkaWcgMQogICAgY29uY2F0CiAgICB1bmNvdmVyIDUKICAgIGNvbmNhdAogICAgdW5jb3ZlciA1CiAgICBjb25jYXQKICAgIHVuY292ZXIgNAogICAgaXRvYgogICAgY29uY2F0CiAgICB1bmNvdmVyIDMKICAgIGl0b2IKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBjb25jYXQKICAgIHB1c2hieXRlcyAweDY3NjQ4NTFiIC8vIG1ldGhvZCAiVmFyaWF0aW9uV3JpdHRlbih1aW50NjQsYWRkcmVzcyxieXRlW10sdWludDY0LHVpbnQ4LHVpbnQ4LHVpbnQ2NCx1aW50NjQpIgogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzEwCiAgICAvLyByZXR1cm4geyByZXZpc2lvbiwgY2hhbmdlZDogdHJ1ZSwgbWJyIH0KICAgIGJ5dGVjXzMgLy8gMHg4MAogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjMwCiAgICAvLyBAYWJpbWV0aG9kKCkKICAgIGIgd3JpdGVWYXJpYXRpb25fYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMud3JpdGVWYXJpYXRpb25ANjcKCndyaXRlVmFyaWF0aW9uX2Jvb2xfZmFsc2VANjM6CiAgICBpbnRjXzAgLy8gMAogICAgYiB3cml0ZVZhcmlhdGlvbl9ib29sX21lcmdlQDY0Cgp3cml0ZVZhcmlhdGlvbl90ZXJuYXJ5X2ZhbHNlQDU2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoyOTAKICAgIC8vIGlmUmV2aXNpb24gPT09IElmQW55IHx8IChpZlJldmlzaW9uID09PSBJZkFic2VudCA/ICFleGlzdHMgOiBleGlzdHMgJiYgc3RvcmVkUmV2aXNpb24gPT09IGlmUmV2aXNpb24pLAogICAgZGlnIDE4CiAgICBieiB3cml0ZVZhcmlhdGlvbl9ib29sX2ZhbHNlQDU5CiAgICBkaWcgMTMKICAgIGRpZyAzCiAgICA9PQogICAgYnogd3JpdGVWYXJpYXRpb25fYm9vbF9mYWxzZUA1OQogICAgaW50Y18xIC8vIDEKICAgIGIgd3JpdGVWYXJpYXRpb25fdGVybmFyeV9tZXJnZUA2MQoKd3JpdGVWYXJpYXRpb25fYm9vbF9mYWxzZUA1OToKICAgIGludGNfMCAvLyAwCiAgICBiIHdyaXRlVmFyaWF0aW9uX3Rlcm5hcnlfbWVyZ2VANjEKCndyaXRlVmFyaWF0aW9uX2FmdGVyX2lmX2Vsc2VAODE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc5MAogICAgLy8gY29uc3QgZ3JhbnROYW1lID0gUHJlZml4R3JhbnQuY29uY2F0KGhvbGRlci5ieXRlcykKICAgIGJ5dGVjIDkgLy8gImciCiAgICBkaWcgMTAKICAgIGNvbmNhdAogICAgZHVwCiAgICBidXJ5IDI2CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc5MQogICAgLy8gY29uc3QgW2dyYW50VmFsdWUsIGdyYW50RXhpc3RzXSA9IG9wLkJveC5nZXQoZ3JhbnROYW1lKQogICAgYm94X2dldAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBidXJ5IDIxCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc5MgogICAgLy8gY29uc3QgZ3JhbnQgPSBncmFudEV4aXN0cyA/IGdyYW50VmFsdWUuc2xpY2UoR1NldCkgOiBCeXRlcy5mcm9tSGV4KCcwMCcpCiAgICBieiB3cml0ZVZhcmlhdGlvbl90ZXJuYXJ5X2ZhbHNlQDgzCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA5CiAgICBkaWcgMQogICAgPj0KICAgIHB1c2hpbnQgOQogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBzd2FwCiAgICBzdWJzdHJpbmczCgp3cml0ZVZhcmlhdGlvbl90ZXJuYXJ5X21lcmdlQDg0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo3OTMKICAgIC8vIGNvbnN0IHBvbGljeSA9IHRoaXMuZWZmZWN0aXZlUG9saWN5KGFzc2V0LCBmYWN0cy5tYW5hZ2VyKQogICAgZGlnIDMKICAgIGV4dHJhY3QgMzMgMzIKICAgIGRpZyAzCiAgICBzd2FwCiAgICBjYWxsc3ViIGVmZmVjdGl2ZVBvbGljeQogICAgZHVwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc5NAogICAgLy8gY29uc3QgWywgaG9sZGVyU2V0XSA9IHRoaXMucG9saWN5U2V0cyhwb2xpY3kudmFsdWUpCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgZGlnIDEKICAgIGludGNfMiAvLyAyCiAgICBleHRyYWN0X3VpbnQxNgogICAgZHVwCiAgICBjb3ZlciA0CiAgICBzdWJzdHJpbmczCiAgICBleHRyYWN0IDIgMAogICAgY2FsbHN1YiBwb2xpY3lTZXRzCiAgICBkdXAKICAgIGludGNfMiAvLyAyCiAgICBleHRyYWN0X3VpbnQxNgogICAgZGlnIDEKICAgIGxlbgogICAgc3Vic3RyaW5nMwogICAgZXh0cmFjdCAyIDAKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6Nzk1CiAgICAvLyBpZiAodGhpcy5hZG1pdHNMb2NhbGx5KGdyYW50LCBUeG4uc2VuZGVyKSkgcmV0dXJuIHRydWUKICAgIGR1cAogICAgdHhuIFNlbmRlcgogICAgY2FsbHN1YiBhZG1pdHNMb2NhbGx5CiAgICBieiB3cml0ZVZhcmlhdGlvbl9hZnRlcl9pZl9lbHNlQDg2CiAgICBwb3BuIDYKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI4NAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYWRtaXRzSG9sZGVyKGFzc2V0LCBmYWN0cywgc2xvdCwgaG9sZGVyLCBwcm9vZiksIGVyck5vdEF1dGhvcml6ZWQpCiAgICBiIHdyaXRlVmFyaWF0aW9uX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo6Q29sbGVjdGlibGVWYXJpYXRpb25zLmFkbWl0c0hvbGRlckA5NgoKd3JpdGVWYXJpYXRpb25fYWZ0ZXJfaWZfZWxzZUA4NjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6Nzk2CiAgICAvLyBpZiAodGhpcy5hZG1pdHNMb2NhbGx5KGhvbGRlclNldCwgVHhuLnNlbmRlcikpIHJldHVybiB0cnVlCiAgICBkaWcgMQogICAgdHhuIFNlbmRlcgogICAgY2FsbHN1YiBhZG1pdHNMb2NhbGx5CiAgICBieiB3cml0ZVZhcmlhdGlvbl9hZnRlcl9pZl9lbHNlQDg4CiAgICBwb3BuIDYKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI4NAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYWRtaXRzSG9sZGVyKGFzc2V0LCBmYWN0cywgc2xvdCwgaG9sZGVyLCBwcm9vZiksIGVyck5vdEF1dGhvcml6ZWQpCiAgICBiIHdyaXRlVmFyaWF0aW9uX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo6Q29sbGVjdGlibGVWYXJpYXRpb25zLmFkbWl0c0hvbGRlckA5NgoKd3JpdGVWYXJpYXRpb25fYWZ0ZXJfaWZfZWxzZUA4ODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6Nzk3CiAgICAvLyBpZiAoZ3JhbnRFeGlzdHMgJiYgdGhpcy5hZG1pdHNCeU1ldGEoZ3JhbnQsIE1ldGFUYWdHcmFudCwgZ3JhbnROYW1lLCBUeG4uc2VuZGVyLCBwcm9vZikpIHJldHVybiB0cnVlCiAgICBkaWcgMjIKICAgIGJ6IHdyaXRlVmFyaWF0aW9uX2FmdGVyX2lmX2Vsc2VAOTEKICAgIHR4biBTZW5kZXIKICAgIGRpZyAxCiAgICBieXRlYyA5IC8vICJnIgogICAgZGlnIDMxCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgOAogICAgY2FsbHN1YiBhZG1pdHNCeU1ldGEKICAgIGNvdmVyIDUKICAgIGJ6IHdyaXRlVmFyaWF0aW9uX2FmdGVyX2lmX2Vsc2VAOTEKICAgIHBvcG4gNgogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mjg0CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5hZG1pdHNIb2xkZXIoYXNzZXQsIGZhY3RzLCBzbG90LCBob2xkZXIsIHByb29mKSwgZXJyTm90QXV0aG9yaXplZCkKICAgIGIgd3JpdGVWYXJpYXRpb25fYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMuYWRtaXRzSG9sZGVyQDk2Cgp3cml0ZVZhcmlhdGlvbl9hZnRlcl9pZl9lbHNlQDkxOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo3OTgKICAgIC8vIGlmICh0aGlzLmFkbWl0c0J5TWV0YShob2xkZXJTZXQsIE1ldGFUYWdIb2xkZXIsIHBvbGljeS5uYW1lLCBUeG4uc2VuZGVyLCBwcm9vZikpIHJldHVybiB0cnVlCiAgICB1bmNvdmVyIDMKICAgIGR1cAogICAgbGVuCiAgICBzd2FwCiAgICB1bmNvdmVyIDQKICAgIHVuY292ZXIgMgogICAgc3Vic3RyaW5nMwogICAgZXh0cmFjdCAyIDAKICAgIHR4biBTZW5kZXIKICAgIGRpZyAzCiAgICBieXRlYyAyMCAvLyAiaCIKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDYKICAgIGNhbGxzdWIgYWRtaXRzQnlNZXRhCiAgICBwb3AKICAgIGJ6IHdyaXRlVmFyaWF0aW9uX2FmdGVyX2lmX2Vsc2VAOTMKICAgIHBvcG4gMwogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mjg0CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5hZG1pdHNIb2xkZXIoYXNzZXQsIGZhY3RzLCBzbG90LCBob2xkZXIsIHByb29mKSwgZXJyTm90QXV0aG9yaXplZCkKICAgIGIgd3JpdGVWYXJpYXRpb25fYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMuYWRtaXRzSG9sZGVyQDk2Cgp3cml0ZVZhcmlhdGlvbl9hZnRlcl9pZl9lbHNlQDkzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo3OTkKICAgIC8vIGlmICh0aGlzLmFkbWl0c0J5RGVsZWdhdGUoZ3JhbnQsIGFzc2V0LCBUeG4uc2VuZGVyLCBzbG90LCBob2xkZXIpKSByZXR1cm4gdHJ1ZQogICAgZGlnIDIKICAgIHR4biBTZW5kZXIKICAgIGRpZyAxMwogICAgZGlnIDEzCiAgICBjYWxsc3ViIGFkbWl0c0J5RGVsZWdhdGUKICAgIGJ6IHdyaXRlVmFyaWF0aW9uX2FmdGVyX2lmX2Vsc2VAOTUKICAgIHBvcG4gMgogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mjg0CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5hZG1pdHNIb2xkZXIoYXNzZXQsIGZhY3RzLCBzbG90LCBob2xkZXIsIHByb29mKSwgZXJyTm90QXV0aG9yaXplZCkKICAgIGIgd3JpdGVWYXJpYXRpb25fYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMuYWRtaXRzSG9sZGVyQDk2Cgp3cml0ZVZhcmlhdGlvbl9hZnRlcl9pZl9lbHNlQDk1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo4MDAKICAgIC8vIHJldHVybiB0aGlzLmFkbWl0c0J5RGVsZWdhdGUoaG9sZGVyU2V0LCBhc3NldCwgVHhuLnNlbmRlciwgc2xvdCwgaG9sZGVyKQogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgY292ZXIgMgogICAgZGlnIDExCiAgICBkaWcgMTEKICAgIGNhbGxzdWIgYWRtaXRzQnlEZWxlZ2F0ZQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoyODQKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmFkbWl0c0hvbGRlcihhc3NldCwgZmFjdHMsIHNsb3QsIGhvbGRlciwgcHJvb2YpLCBlcnJOb3RBdXRob3JpemVkKQogICAgYiB3cml0ZVZhcmlhdGlvbl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy5hZG1pdHNIb2xkZXJAOTYKCndyaXRlVmFyaWF0aW9uX3Rlcm5hcnlfZmFsc2VAODM6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzkyCiAgICAvLyBjb25zdCBncmFudCA9IGdyYW50RXhpc3RzID8gZ3JhbnRWYWx1ZS5zbGljZShHU2V0KSA6IEJ5dGVzLmZyb21IZXgoJzAwJykKICAgIGJ5dGVjIDQgLy8gMHgwMAogICAgYiB3cml0ZVZhcmlhdGlvbl90ZXJuYXJ5X21lcmdlQDg0Cgp3cml0ZVZhcmlhdGlvbl9ib29sX2ZhbHNlQDQ0OgogICAgaW50Y18wIC8vIDAKICAgIGIgd3JpdGVWYXJpYXRpb25fYm9vbF9tZXJnZUA0NQoKd3JpdGVWYXJpYXRpb25fZWxzZV9ib2R5QDUwOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo3NzYKICAgIC8vIGNvbnN0IHBvbGljeSA9IHRoaXMuZWZmZWN0aXZlUG9saWN5KGFzc2V0LCBmYWN0cy5tYW5hZ2VyKQogICAgZGlnIDIKICAgIGV4dHJhY3QgMzMgMzIKICAgIGRpZyAyCiAgICBzd2FwCiAgICBjYWxsc3ViIGVmZmVjdGl2ZVBvbGljeQogICAgZHVwbiAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc3NwogICAgLy8gY29uc3QgW2NvbGxlY3RpYmxlXSA9IHRoaXMucG9saWN5U2V0cyhwb2xpY3kudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyAxCiAgICBpbnRjXzIgLy8gMgogICAgZXh0cmFjdF91aW50MTYKICAgIGR1cAogICAgY292ZXIgNAogICAgc3Vic3RyaW5nMwogICAgZXh0cmFjdCAyIDAKICAgIGR1cAogICAgY2FsbHN1YiBwb2xpY3lTZXRzCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgZGlnIDEKICAgIGludGNfMiAvLyAyCiAgICBleHRyYWN0X3VpbnQxNgogICAgc3Vic3RyaW5nMwogICAgZXh0cmFjdCAyIDAKICAgIGR1cAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo3NzgKICAgIC8vIGlmICh0aGlzLmFkbWl0c0xvY2FsbHkoY29sbGVjdGlibGUsIFR4bi5zZW5kZXIpKSByZXR1cm4gdHJ1ZQogICAgdHhuIFNlbmRlcgogICAgY2FsbHN1YiBhZG1pdHNMb2NhbGx5CiAgICBieiB3cml0ZVZhcmlhdGlvbl9hZnRlcl9pZl9lbHNlQDcwCiAgICBwb3BuIDYKICAgIGludGNfMSAvLyAxCgp3cml0ZVZhcmlhdGlvbl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy5hZG1pdHNDb2xsZWN0aWJsZUA3ODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mjg2CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5hZG1pdHNDb2xsZWN0aWJsZShhc3NldCwgY29udHJvbGxpbmdBcHAsIGZhY3RzLCBzbG90LCBwcm9vZiksIGVyck5vdEF1dGhvcml6ZWQpCiAgICBibnogd3JpdGVWYXJpYXRpb25fYWZ0ZXJfaWZfZWxzZUA1MwogICAgYnl0ZWMgMTIgLy8gIkVSUjplcnJDdk5hIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckN2TmEKCndyaXRlVmFyaWF0aW9uX2FmdGVyX2lmX2Vsc2VANzA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc3OQogICAgLy8gaWYgKChnZXRCeXRlKHBvbGljeS52YWx1ZSwgUEZsYWdzKSAmIFBvbGljeU1hbmFnZXJXcml0ZXMpICE9PSAwKSB7CiAgICBpbnRjXzEgLy8gMQogICAgZ2V0Ynl0ZQogICAgaW50Y18xIC8vIDEKICAgICYKICAgIGJ6IHdyaXRlVmFyaWF0aW9uX2FmdGVyX2lmX2Vsc2VANzUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzgwCiAgICAvLyBjb25zdCBjcmVhdG9yID0gdGhpcy5yZXNvbHZlQ3JlYXRvcihhc3NldCwgY29udHJvbGxpbmdBcHAsIGZhY3RzKQogICAgZGlnIDQKICAgIGRpZyAxNQogICAgZGlnIDcKICAgIGNhbGxzdWIgcmVzb2x2ZUNyZWF0b3IKICAgIGJ1cnkgNwogICAgZHVwCiAgICBidXJ5IDMwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc4MQogICAgLy8gaWYgKGNyZWF0b3IgIT09IEdsb2JhbC56ZXJvQWRkcmVzcyAmJiBjcmVhdG9yID09PSBUeG4uc2VuZGVyKSByZXR1cm4gdHJ1ZQogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICAhPQogICAgYnogd3JpdGVWYXJpYXRpb25fYWZ0ZXJfaWZfZWxzZUA3NQogICAgZGlnIDI4CiAgICB0eG4gU2VuZGVyCiAgICA9PQogICAgYnogd3JpdGVWYXJpYXRpb25fYWZ0ZXJfaWZfZWxzZUA3NQogICAgcG9wbiA1CiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoyODYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmFkbWl0c0NvbGxlY3RpYmxlKGFzc2V0LCBjb250cm9sbGluZ0FwcCwgZmFjdHMsIHNsb3QsIHByb29mKSwgZXJyTm90QXV0aG9yaXplZCkKICAgIGIgd3JpdGVWYXJpYXRpb25fYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMuYWRtaXRzQ29sbGVjdGlibGVANzgKCndyaXRlVmFyaWF0aW9uX2FmdGVyX2lmX2Vsc2VANzU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc4MwogICAgLy8gaWYgKHRoaXMuYWRtaXRzQnlNZXRhKGNvbGxlY3RpYmxlLCBNZXRhVGFnQ29sbGVjdGlibGUsIHBvbGljeS5uYW1lLCBUeG4uc2VuZGVyLCBwcm9vZikpIHJldHVybiB0cnVlCiAgICBzd2FwCiAgICBkdXAKICAgIGxlbgogICAgc3dhcAogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIHN1YnN0cmluZzMKICAgIGV4dHJhY3QgMiAwCiAgICB0eG4gU2VuZGVyCiAgICBkaWcgMgogICAgYnl0ZWMgMjEgLy8gImMiCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciA1CiAgICBjYWxsc3ViIGFkbWl0c0J5TWV0YQogICAgcG9wCiAgICBieiB3cml0ZVZhcmlhdGlvbl9hZnRlcl9pZl9lbHNlQDc3CiAgICBwb3BuIDIKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI4NgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYWRtaXRzQ29sbGVjdGlibGUoYXNzZXQsIGNvbnRyb2xsaW5nQXBwLCBmYWN0cywgc2xvdCwgcHJvb2YpLCBlcnJOb3RBdXRob3JpemVkKQogICAgYiB3cml0ZVZhcmlhdGlvbl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy5hZG1pdHNDb2xsZWN0aWJsZUA3OAoKd3JpdGVWYXJpYXRpb25fYWZ0ZXJfaWZfZWxzZUA3NzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6Nzg0CiAgICAvLyByZXR1cm4gdGhpcy5hZG1pdHNCeURlbGVnYXRlKGNvbGxlY3RpYmxlLCBhc3NldCwgVHhuLnNlbmRlciwgc2xvdCwgR2xvYmFsLnplcm9BZGRyZXNzKQogICAgdHhuIFNlbmRlcgogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICB1bmNvdmVyIDIKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAzCiAgICBkaWcgMTIKICAgIHVuY292ZXIgNAogICAgY2FsbHN1YiBhZG1pdHNCeURlbGVnYXRlCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI4NgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYWRtaXRzQ29sbGVjdGlibGUoYXNzZXQsIGNvbnRyb2xsaW5nQXBwLCBmYWN0cywgc2xvdCwgcHJvb2YpLCBlcnJOb3RBdXRob3JpemVkKQogICAgYiB3cml0ZVZhcmlhdGlvbl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy5hZG1pdHNDb2xsZWN0aWJsZUA3OAoKd3JpdGVWYXJpYXRpb25fYm9vbF9mYWxzZUAzNjoKICAgIGludGNfMCAvLyAwCiAgICBiIHdyaXRlVmFyaWF0aW9uX2Jvb2xfbWVyZ2VAMzcKCndyaXRlVmFyaWF0aW9uX3Rlcm5hcnlfZmFsc2VAMjc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI2MwogICAgLy8gY29uc3Qgc3RvcmVkUmV2aXNpb246IHVpbnQ2NCA9IGV4aXN0cyA/IGJ0b2koc3RvcmVkLnNsaWNlKFZSZXZpc2lvbiwgVlJldmlzaW9uICsgOCkpIDogMAogICAgaW50Y18wIC8vIDAKICAgIGJ1cnkgMTcKICAgIGIgd3JpdGVWYXJpYXRpb25fdGVybmFyeV9tZXJnZUAyOAoKd3JpdGVWYXJpYXRpb25faWZfYm9keUAyNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjYwCiAgICAvLyBpZiAobG9jaykgZmxhZ3MgPSBmbGFncyB8IEZsYWdMb2NrZWQKICAgIGR1cAogICAgaW50YyA0IC8vIDEyOAogICAgfAogICAgYnVyeSAyMQogICAgYiB3cml0ZVZhcmlhdGlvbl9hZnRlcl9pZl9lbHNlQDI1Cgp3cml0ZVZhcmlhdGlvbl9ib29sX2ZhbHNlQDIwOgogICAgaW50Y18wIC8vIDAKICAgIGIgd3JpdGVWYXJpYXRpb25fYm9vbF9tZXJnZUAyMQoKd3JpdGVWYXJpYXRpb25fYm9vbF9mYWxzZUAxNDoKICAgIGludGNfMCAvLyAwCiAgICBiIHdyaXRlVmFyaWF0aW9uX2Jvb2xfbWVyZ2VAMTUKCndyaXRlVmFyaWF0aW9uX2Jvb2xfZmFsc2VANjoKICAgIGludGNfMCAvLyAwCiAgICBidXJ5IDIwCiAgICBiIHdyaXRlVmFyaWF0aW9uX2Jvb2xfbWVyZ2VANwoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy5kZWxldGVWYXJpYXRpb25bcm91dGluZ10oKSAtPiB2b2lkOgpkZWxldGVWYXJpYXRpb246CiAgICBpbnRjXzAgLy8gMAogICAgYnl0ZWNfMCAvLyAiIgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjMxOAogICAgLy8gQGFiaW1ldGhvZCgpCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgY292ZXIgMgogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjMyMAogICAgLy8gY29uc3QgZmFjdHMgPSB0aGlzLmFzc2V0RmFjdHMoYXNzZXQpCiAgICBjYWxsc3ViIGFzc2V0RmFjdHMKICAgIGR1cAogICAgY292ZXIgNAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czozMjEKICAgIC8vIGxvZ2dlZEFzc2VydChmYWN0cy5leGlzdHMsIGVyckFzc2V0TWlzc2luZykKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIGJueiBkZWxldGVWYXJpYXRpb25fYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDcgLy8gIkVSUjplcnJDdkFtIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckN2QW0KCmRlbGV0ZVZhcmlhdGlvbl9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA2MAogICAgLy8gcmV0dXJuIFByZWZpeFZhcmlhdGlvbi5jb25jYXQoaXRvYihhc3NldCkpLmNvbmNhdCh3cml0ZXIuYnl0ZXMpLmNvbmNhdChzbG90KQogICAgZGlnIDEKICAgIGl0b2IKICAgIGJ5dGVjIDExIC8vICJ2IgogICAgc3dhcAogICAgY29uY2F0CiAgICBkaWcgMQogICAgY29uY2F0CiAgICBkaWcgMwogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzIzCiAgICAvLyBjb25zdCBbc3RvcmVkLCBleGlzdHNdID0gb3AuQm94LmdldChuYW1lKQogICAgYm94X2dldAogICAgc3dhcAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czozMjQKICAgIC8vIGlmICghZXhpc3RzKSB7CiAgICBibnogZGVsZXRlVmFyaWF0aW9uX2FmdGVyX2lmX2Vsc2VANQogICAgcG9wbiA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjMyNQogICAgLy8gdGhpcy5leHBlY3ROb1BheW1lbnQoKQogICAgY2FsbHN1YiBleHBlY3ROb1BheW1lbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzI2CiAgICAvLyByZXR1cm4geyByZW1vdmVkOiBmYWxzZSwgcmVhc29uOiBuZXcgVWludDgoUmVtb3ZlZE5vbmUpLCByZWZ1bmQ6IDAgfQogICAgYnl0ZWNfMiAvLyAweDAwMDAwMDAwMDAwMDAwMDAwMDAwCgpkZWxldGVWYXJpYXRpb25fYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMuZGVsZXRlVmFyaWF0aW9uQDI1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czozMTgKICAgIC8vIEBhYmltZXRob2QoKQogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKZGVsZXRlVmFyaWF0aW9uX2FmdGVyX2lmX2Vsc2VANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzI5CiAgICAvLyBjb25zdCBmbGFncyA9IGdldEJ5dGUoc3RvcmVkLCBWRmxhZ3MpCiAgICBkaWcgMQogICAgaW50Y18xIC8vIDEKICAgIGdldGJ5dGUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzMwCiAgICAvLyBjb25zdCBsb2NrZWQgPSAoZmxhZ3MgJiBGbGFnTG9ja2VkKSAhPT0gMAogICAgZHVwCiAgICBpbnRjIDQgLy8gMTI4CiAgICAmCiAgICBidXJ5IDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzMxCiAgICAvLyBjb25zdCBob2xkZXJTY29wZSA9IChmbGFncyAmIEZsYWdIb2xkZXJTY29wZSkgIT09IDAKICAgIGludGNfMSAvLyAxCiAgICAmCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjMzMgogICAgLy8gbGV0IHJlYXNvbjogdWludDY0ID0gUmVtb3ZlZE5vbmUKICAgIGludGNfMCAvLyAwCiAgICBidXJ5IDEwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjMzMwogICAgLy8gaWYgKFR4bi5zZW5kZXIgPT09IHdyaXRlciAmJiAhbG9ja2VkKSB7CiAgICB0eG4gU2VuZGVyCiAgICBkaWcgNAogICAgPT0KICAgIGJ6IGRlbGV0ZVZhcmlhdGlvbl9lbHNlX2JvZHlAOAogICAgZGlnIDgKICAgIGJueiBkZWxldGVWYXJpYXRpb25fZWxzZV9ib2R5QDgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czozMzQKICAgIC8vIHJlYXNvbiA9IFJlbW92ZWRCeVdyaXRlcgogICAgaW50Y18yIC8vIDIKICAgIGJ1cnkgOQoKZGVsZXRlVmFyaWF0aW9uX2FmdGVyX2lmX2Vsc2VAMjI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM0OAogICAgLy8gbG9nZ2VkQXNzZXJ0KHJlYXNvbiAhPT0gUmVtb3ZlZE5vbmUsIGVyck5vdEF1dGhvcml6ZWQpCiAgICBkaWcgOAogICAgYm56IGRlbGV0ZVZhcmlhdGlvbl9hZnRlcl9hc3NlcnRAMjQKICAgIGJ5dGVjIDEyIC8vICJFUlI6ZXJyQ3ZOYSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJDdk5hCgpkZWxldGVWYXJpYXRpb25fYWZ0ZXJfYXNzZXJ0QDI0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMTA4CiAgICAvLyByZXR1cm4gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MubWluQmFsYW5jZQogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0TWluQmFsYW5jZQogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM1MQogICAgLy8gb3AuQm94LmRlbGV0ZShuYW1lKQogICAgc3dhcAogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMDgKICAgIC8vIHJldHVybiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcy5taW5CYWxhbmNlCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RNaW5CYWxhbmNlCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzUyCiAgICAvLyBjb25zdCByZWZ1bmQ6IHVpbnQ2NCA9IGJlZm9yZSAtIHRoaXMuYXBwTWluQmFsYW5jZSgpCiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM1MwogICAgLy8gdGhpcy5leHBlY3ROb1BheW1lbnQoKQogICAgY2FsbHN1YiBleHBlY3ROb1BheW1lbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzU0CiAgICAvLyB0aGlzLnJlZnVuZCh3cml0ZXIsIHJlZnVuZCkKICAgIHVuY292ZXIgMgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBkaWcgMQogICAgY2FsbHN1YiByZWZ1bmQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzU2CiAgICAvLyB0aGlzLmVtaXREZWxldGVkKGFzc2V0LCB3cml0ZXIsIHNsb3QsIHN0b3JlZCwgcmVhc29uKQogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciA0CiAgICBkaWcgOAogICAgZHVwCiAgICBjb3ZlciA1CiAgICBjYWxsc3ViIGVtaXREZWxldGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM1NwogICAgLy8gcmV0dXJuIHsgcmVtb3ZlZDogdHJ1ZSwgcmVhc29uOiBuZXcgVWludDgocmVhc29uKSwgcmVmdW5kIH0KICAgIGl0b2IKICAgIGR1cAogICAgYml0bGVuCiAgICBpbnRjXzMgLy8gOAogICAgPD0KICAgIGFzc2VydCAvLyBvdmVyZmxvdwogICAgZXh0cmFjdCA3IDEKICAgIGJ5dGVjXzMgLy8gMHg4MAogICAgc3dhcAogICAgY29uY2F0CiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzE4CiAgICAvLyBAYWJpbWV0aG9kKCkKICAgIGIgZGVsZXRlVmFyaWF0aW9uX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo6Q29sbGVjdGlibGVWYXJpYXRpb25zLmRlbGV0ZVZhcmlhdGlvbkAyNQoKZGVsZXRlVmFyaWF0aW9uX2Vsc2VfYm9keUA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czozMzUKICAgIC8vIH0gZWxzZSBpZiAoaG9sZGVyU2NvcGUpIHsKICAgIGJ6IGRlbGV0ZVZhcmlhdGlvbl9lbHNlX2JvZHlAMTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzM2CiAgICAvLyBjb25zdCBib3VuZCA9IHRoaXMuc3RvcmVkSG9sZGVyKHN0b3JlZCkKICAgIGRpZyAxCiAgICBkdXAKICAgIGNhbGxzdWIgc3RvcmVkSG9sZGVyCiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czozMzcKICAgIC8vIGlmICghdGhpcy5ob2xkcyhib3VuZCwgYXNzZXQsIGdldEJ5dGUoc3RvcmVkLCBWRGVjaW1hbHMpKSkgewogICAgcHVzaGludCA0NgogICAgZ2V0Ynl0ZQogICAgZGlnIDYKICAgIHN3YXAKICAgIGNhbGxzdWIgaG9sZHMKICAgIGJueiBkZWxldGVWYXJpYXRpb25fZWxzZV9ib2R5QDExCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzM4CiAgICAvLyByZWFzb24gPSBSZW1vdmVkVm9pZAogICAgcHVzaGludCAzCiAgICBidXJ5IDkKICAgIGIgZGVsZXRlVmFyaWF0aW9uX2FmdGVyX2lmX2Vsc2VAMjIKCmRlbGV0ZVZhcmlhdGlvbl9lbHNlX2JvZHlAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjMzOQogICAgLy8gfSBlbHNlIGlmIChUeG4uc2VuZGVyID09PSBib3VuZCkgewogICAgdHhuIFNlbmRlcgogICAgPT0KICAgIGJ6IGRlbGV0ZVZhcmlhdGlvbl9hZnRlcl9pZl9lbHNlQDIyCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM0MAogICAgLy8gcmVhc29uID0gUmVtb3ZlZEJ5SG9sZGVyCiAgICBwdXNoaW50IDQKICAgIGJ1cnkgOQogICAgYiBkZWxldGVWYXJpYXRpb25fYWZ0ZXJfaWZfZWxzZUAyMgoKZGVsZXRlVmFyaWF0aW9uX2Vsc2VfYm9keUAxNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzQyCiAgICAvLyB9IGVsc2UgaWYgKChnZXRCeXRlKHRoaXMuZWZmZWN0aXZlUG9saWN5KGFzc2V0LCBmYWN0cy5tYW5hZ2VyKS52YWx1ZSwgUEZsYWdzKSAmIFBvbGljeUxvY2tlZCkgPT09IDApIHsKICAgIGRpZyA1CiAgICBleHRyYWN0IDMzIDMyCiAgICBkaWcgNAogICAgc3dhcAogICAgY2FsbHN1YiBlZmZlY3RpdmVQb2xpY3kKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMQogICAgaW50Y18yIC8vIDIKICAgIGV4dHJhY3RfdWludDE2CiAgICBzdWJzdHJpbmczCiAgICBleHRyYWN0IDIgMAogICAgaW50Y18xIC8vIDEKICAgIGdldGJ5dGUKICAgIGludGMgNCAvLyAxMjgKICAgICYKICAgIGJueiBkZWxldGVWYXJpYXRpb25fYWZ0ZXJfaWZfZWxzZUAyMgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czozNDMKICAgIC8vIGNvbnN0IGNyZWF0b3IgPSB0aGlzLnJlc29sdmVDcmVhdG9yKGFzc2V0LCBjb250cm9sbGluZ0FwcCwgZmFjdHMpCiAgICBkaWcgMwogICAgZGlnIDcKICAgIGRpZyA3CiAgICBjYWxsc3ViIHJlc29sdmVDcmVhdG9yCiAgICBwb3AKICAgIGR1cAogICAgYnVyeSAxMQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czozNDQKICAgIC8vIGlmIChjcmVhdG9yICE9PSBHbG9iYWwuemVyb0FkZHJlc3MgJiYgVHhuLnNlbmRlciA9PT0gY3JlYXRvcikgewogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICAhPQogICAgYnogZGVsZXRlVmFyaWF0aW9uX2FmdGVyX2lmX2Vsc2VAMjIKICAgIHR4biBTZW5kZXIKICAgIGRpZyAxMAogICAgPT0KICAgIGJ6IGRlbGV0ZVZhcmlhdGlvbl9hZnRlcl9pZl9lbHNlQDIyCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM0NQogICAgLy8gcmVhc29uID0gUmVtb3ZlZEJ5Q3JlYXRvcgogICAgcHVzaGludCA1CiAgICBidXJ5IDkKICAgIGIgZGVsZXRlVmFyaWF0aW9uX2FmdGVyX2lmX2Vsc2VAMjIKCgovLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMucGluTWFpbkNyZWF0b3Jbcm91dGluZ10oKSAtPiB2b2lkOgpwaW5NYWluQ3JlYXRvcjoKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM2MwogICAgLy8gQGFiaW1ldGhvZCgpCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgY292ZXIgMgogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBjb3ZlciAyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA1CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciA0CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA2CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18xIC8vIDEKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuYm9vbAogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czozNzIKICAgIC8vIGNvbnN0IGZhY3RzID0gdGhpcy5hc3NldEZhY3RzKGFzc2V0KQogICAgY2FsbHN1YiBhc3NldEZhY3RzCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzczCiAgICAvLyBsb2dnZWRBc3NlcnQoZmFjdHMuZXhpc3RzLCBlcnJBc3NldE1pc3NpbmcpCiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Yml0CiAgICBibnogcGluTWFpbkNyZWF0b3JfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDcgLy8gIkVSUjplcnJDdkFtIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckN2QW0KCnBpbk1haW5DcmVhdG9yX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czozNzQKICAgIC8vIGNvbnN0IGNyZWF0b3IgPSB0aGlzLnJlc29sdmVDcmVhdG9yKGFzc2V0LCBjb250cm9sbGluZ0FwcCwgZmFjdHMpCiAgICBkaWcgNAogICAgdW5jb3ZlciA3CiAgICB1bmNvdmVyIDMKICAgIGNhbGxzdWIgcmVzb2x2ZUNyZWF0b3IKICAgIGNvdmVyIDIKICAgIGR1cAogICAgYnVyeSA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM3NQogICAgLy8gbG9nZ2VkQXNzZXJ0KGNyZWF0b3IgIT09IEdsb2JhbC56ZXJvQWRkcmVzcyAmJiBUeG4uc2VuZGVyID09PSBjcmVhdG9yLCBlcnJOb3RDcmVhdG9yKQogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICAhPQogICAgYnogcGluTWFpbkNyZWF0b3JfYm9vbF9mYWxzZUA2CiAgICB0eG4gU2VuZGVyCiAgICBkaWcgNwogICAgPT0KICAgIGJ6IHBpbk1haW5DcmVhdG9yX2Jvb2xfZmFsc2VANgogICAgaW50Y18xIC8vIDEKCnBpbk1haW5DcmVhdG9yX2Jvb2xfbWVyZ2VANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mzc1CiAgICAvLyBsb2dnZWRBc3NlcnQoY3JlYXRvciAhPT0gR2xvYmFsLnplcm9BZGRyZXNzICYmIFR4bi5zZW5kZXIgPT09IGNyZWF0b3IsIGVyck5vdENyZWF0b3IpCiAgICBibnogcGluTWFpbkNyZWF0b3JfYWZ0ZXJfYXNzZXJ0QDkKICAgIGJ5dGVjIDEzIC8vICJFUlI6ZXJyQ3ZOYyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJDdk5jCgpwaW5NYWluQ3JlYXRvcl9hZnRlcl9hc3NlcnRAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mzc3CiAgICAvLyBjb25zdCBzb3VyY2UgPSB0aGlzLnBpblNvdXJjZShhc3NldCwgd3JpdGVyLCBzbG90LCBzb3VyY2VSZXZpc2lvbikKICAgIGRpZyA0CiAgICBkaWcgMwogICAgZGlnIDUKICAgIHVuY292ZXIgOAogICAgY2FsbHN1YiBwaW5Tb3VyY2UKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czozNzgKICAgIC8vIGxvZ2dlZEFzc2VydCgoZ2V0Qnl0ZShzb3VyY2UsIFZGbGFncykgJiBGbGFnSG9sZGVyU2NvcGUpID09PSAwLCBlcnJTb3VyY2VOb3RBbGxvd2VkKQogICAgaW50Y18xIC8vIDEKICAgIGdldGJ5dGUKICAgIGludGNfMSAvLyAxCiAgICAmCiAgICBieiBwaW5NYWluQ3JlYXRvcl9hZnRlcl9hc3NlcnRAMTEKICAgIGJ5dGVjIDE0IC8vICJFUlI6ZXJyQ3ZTbiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJDdlNuCgpwaW5NYWluQ3JlYXRvcl9hZnRlcl9hc3NlcnRAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM3OQogICAgLy8gY29uc3Qgc2VjdGlvbiA9IHRoaXMucGluQ29yZSh3cml0ZXIsIHNsb3QsIHNvdXJjZSkuY29uY2F0KHRoaXMuc291cmNlRmxhdChzb3VyY2UpKQogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDQKICAgIGRpZyAyCiAgICBjYWxsc3ViIHBpbkNvcmUKICAgIHN3YXAKICAgIGNhbGxzdWIgc291cmNlRmxhdAogICAgY29uY2F0CiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNjQKICAgIC8vIHJldHVybiBQcmVmaXhNYWluLmNvbmNhdChpdG9iKGFzc2V0KSkKICAgIGRpZyAzCiAgICBpdG9iCiAgICBieXRlYyA1IC8vICJtIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM4MQogICAgLy8gY29uc3QgW21haW4sIGV4aXN0c10gPSBvcC5Cb3guZ2V0KHRoaXMubWFpbk5hbWUoYXNzZXQpKQogICAgYm94X2dldAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzgyCiAgICAvLyBjb25zdCBzdG9yZWRGbGFnczogdWludDY0ID0gZXhpc3RzID8gZ2V0Qnl0ZShtYWluLCBNRmxhZ3MpIDogMAogICAgYnogcGluTWFpbkNyZWF0b3JfdGVybmFyeV9mYWxzZUAxMwogICAgZHVwCiAgICBpbnRjXzEgLy8gMQogICAgZ2V0Ynl0ZQogICAgc3dhcAoKcGluTWFpbkNyZWF0b3JfdGVybmFyeV9tZXJnZUAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzgzCiAgICAvLyBjb25zdCBmbGFnczogdWludDY0ID0gbG9jayA/IHN0b3JlZEZsYWdzIHwgTWFpbkNyZWF0b3JMb2NrZWQgOiBzdG9yZWRGbGFncwogICAgdW5jb3ZlciAzCiAgICBieiBwaW5NYWluQ3JlYXRvcl90ZXJuYXJ5X2ZhbHNlQDE2CiAgICBkaWcgMQogICAgaW50YyA0IC8vIDEyOAogICAgfAogICAgY292ZXIgMwoKcGluTWFpbkNyZWF0b3JfdGVybmFyeV9tZXJnZUAxNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mzg0CiAgICAvLyBpZiAoZXhpc3RzICYmIGZsYWdzID09PSBzdG9yZWRGbGFncyAmJiB0aGlzLnNlY3Rpb24obWFpbiwgUm9sZUNyZWF0b3IpID09PSBzZWN0aW9uKSB7CiAgICB1bmNvdmVyIDIKICAgIGJ6IHBpbk1haW5DcmVhdG9yX2FmdGVyX2lmX2Vsc2VAMjEKICAgIGRpZyAyCiAgICBkaWcgMgogICAgPT0KICAgIGJ6IHBpbk1haW5DcmVhdG9yX2FmdGVyX2lmX2Vsc2VAMjEKICAgIGR1cAogICAgaW50Y18xIC8vIDEKICAgIGNhbGxzdWIgc2VjdGlvbgogICAgZGlnIDUKICAgID09CiAgICBieiBwaW5NYWluQ3JlYXRvcl9hZnRlcl9pZl9lbHNlQDIxCiAgICBidXJ5IDEKICAgIGJ1cnkgMQogICAgYnVyeSAxCiAgICBidXJ5IDEKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czozODUKICAgIC8vIHRoaXMuZXhwZWN0Tm9QYXltZW50KCkKICAgIGNhbGxzdWIgZXhwZWN0Tm9QYXltZW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM4NgogICAgLy8gcmV0dXJuIHsgcmV2aXNpb246IGJ0b2kobWFpbi5zbGljZShNUmV2aXNpb24sIE1SZXZpc2lvbiArIDgpKSwgY2hhbmdlZDogZmFsc2UsIG1icjogdGhpcy5tYnJOb25lKCkgfQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMwogICAgZGlnIDEKICAgID49CiAgICBwdXNoaW50IDMKICAgIGRpZyAyCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgcHVzaGludCAxMQogICAgZGlnIDIKICAgID49CiAgICBwdXNoaW50IDExCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBzdWJzdHJpbmczCiAgICBidG9pCiAgICBpdG9iCiAgICBieXRlY18yIC8vIDB4MDAwMDAwMDAwMDAwMDAwMDAwMDAKICAgIGNvbmNhdAoKcGluTWFpbkNyZWF0b3JfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMucGluTWFpbkNyZWF0b3JAMjQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM2MwogICAgLy8gQGFiaW1ldGhvZCgpCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpwaW5NYWluQ3JlYXRvcl9hZnRlcl9pZl9lbHNlQDIxOgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM4OAogICAgLy8gbG9nZ2VkQXNzZXJ0KChzdG9yZWRGbGFncyAmIE1haW5DcmVhdG9yTG9ja2VkKSA9PT0gMCwgZXJyTG9ja2VkKQogICAgaW50YyA0IC8vIDEyOAogICAgJgogICAgYnogcGluTWFpbkNyZWF0b3JfYWZ0ZXJfYXNzZXJ0QDIzCiAgICBieXRlYyAxMCAvLyAiRVJSOmVyckN2TGsiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQ3ZMawoKcGluTWFpbkNyZWF0b3JfYWZ0ZXJfYXNzZXJ0QDIzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czozOTAKICAgIC8vIHJldHVybiB0aGlzLndyaXRlU2VjdGlvbihhc3NldCwgUm9sZUNyZWF0b3IsIHNlY3Rpb24sIGZsYWdzLCBmYWN0cy5kZWNpbWFscywgVHhuLnNlbmRlcikKICAgIHN3YXAKICAgIHB1c2hpbnQgMTA1CiAgICBleHRyYWN0X3VpbnQ2NAogICAgdHhuIFNlbmRlcgogICAgdW5jb3ZlciA0CiAgICBpbnRjXzEgLy8gMQogICAgY292ZXIgNQogICAgY292ZXIgNQogICAgY2FsbHN1YiB3cml0ZVNlY3Rpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzYzCiAgICAvLyBAYWJpbWV0aG9kKCkKICAgIGIgcGluTWFpbkNyZWF0b3JfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMucGluTWFpbkNyZWF0b3JAMjQKCnBpbk1haW5DcmVhdG9yX3Rlcm5hcnlfZmFsc2VAMTY6CiAgICBkaWcgMQogICAgY292ZXIgMwogICAgYiBwaW5NYWluQ3JlYXRvcl90ZXJuYXJ5X21lcmdlQDE3CgpwaW5NYWluQ3JlYXRvcl90ZXJuYXJ5X2ZhbHNlQDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czozODIKICAgIC8vIGNvbnN0IHN0b3JlZEZsYWdzOiB1aW50NjQgPSBleGlzdHMgPyBnZXRCeXRlKG1haW4sIE1GbGFncykgOiAwCiAgICBpbnRjXzAgLy8gMAogICAgc3dhcAogICAgYiBwaW5NYWluQ3JlYXRvcl90ZXJuYXJ5X21lcmdlQDE0CgpwaW5NYWluQ3JlYXRvcl9ib29sX2ZhbHNlQDY6CiAgICBpbnRjXzAgLy8gMAogICAgYiBwaW5NYWluQ3JlYXRvcl9ib29sX21lcmdlQDcKCgovLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMucGluTWFpbkhvbGRlcltyb3V0aW5nXSgpIC0+IHZvaWQ6CnBpbk1haW5Ib2xkZXI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM5NAogICAgLy8gQGFiaW1ldGhvZCgpCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgY292ZXIgMgogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBjb3ZlciAzCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM5NgogICAgLy8gY29uc3QgZmFjdHMgPSB0aGlzLmFzc2V0RmFjdHMoYXNzZXQpCiAgICBjYWxsc3ViIGFzc2V0RmFjdHMKICAgIGR1cAogICAgY292ZXIgNQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czozOTcKICAgIC8vIGxvZ2dlZEFzc2VydChmYWN0cy5leGlzdHMsIGVyckFzc2V0TWlzc2luZykKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIGJueiBwaW5NYWluSG9sZGVyX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA3IC8vICJFUlI6ZXJyQ3ZBbSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJDdkFtCgpwaW5NYWluSG9sZGVyX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czozOTgKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmlzVW5pdEFzc2V0KGZhY3RzKSAmJiBmYWN0cy50b3RhbCA9PT0gdGhpcy51bml0KGZhY3RzLmRlY2ltYWxzKSwgZXJyTm90U2luZ2xlVW5pdCkKICAgIGRpZyA0CiAgICBjYWxsc3ViIGlzVW5pdEFzc2V0CiAgICBidXJ5IDYKICAgIGJ6IHBpbk1haW5Ib2xkZXJfYm9vbF9mYWxzZUA2CiAgICBkaWcgNAogICAgZHVwCiAgICBwdXNoaW50IDk3CiAgICBleHRyYWN0X3VpbnQ2NAogICAgc3dhcAogICAgcHVzaGludCAxMDUKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY1MAogICAgLy8gcmV0dXJuIDEwICoqIGRlY2ltYWxzCiAgICBwdXNoaW50IDEwCiAgICBzd2FwCiAgICBleHAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mzk4CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5pc1VuaXRBc3NldChmYWN0cykgJiYgZmFjdHMudG90YWwgPT09IHRoaXMudW5pdChmYWN0cy5kZWNpbWFscyksIGVyck5vdFNpbmdsZVVuaXQpCiAgICA9PQogICAgYnogcGluTWFpbkhvbGRlcl9ib29sX2ZhbHNlQDYKICAgIGludGNfMSAvLyAxCgpwaW5NYWluSG9sZGVyX2Jvb2xfbWVyZ2VANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mzk4CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5pc1VuaXRBc3NldChmYWN0cykgJiYgZmFjdHMudG90YWwgPT09IHRoaXMudW5pdChmYWN0cy5kZWNpbWFscyksIGVyck5vdFNpbmdsZVVuaXQpCiAgICBibnogcGluTWFpbkhvbGRlcl9hZnRlcl9hc3NlcnRAOQogICAgcHVzaGJ5dGVzICJFUlI6ZXJyQ3ZTdSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJDdlN1CgpwaW5NYWluSG9sZGVyX2FmdGVyX2Fzc2VydEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czozOTkKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmhvbGRzKFR4bi5zZW5kZXIsIGFzc2V0LCBmYWN0cy5kZWNpbWFscyksIGVyck5vdEhvbGRlcikKICAgIHR4biBTZW5kZXIKICAgIGRpZyA1CiAgICBwdXNoaW50IDEwNQogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgY292ZXIgMwogICAgZGlnIDQKICAgIHN3YXAKICAgIGNhbGxzdWIgaG9sZHMKICAgIGJueiBwaW5NYWluSG9sZGVyX2FmdGVyX2Fzc2VydEAxMQogICAgYnl0ZWMgMjYgLy8gIkVSUjplcnJDdk5oIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckN2TmgKCnBpbk1haW5Ib2xkZXJfYWZ0ZXJfYXNzZXJ0QDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo0MDEKICAgIC8vIGNvbnN0IHNvdXJjZSA9IHRoaXMucGluU291cmNlKGFzc2V0LCB3cml0ZXIsIHNsb3QsIHNvdXJjZVJldmlzaW9uKQogICAgZGlnIDIKICAgIGRpZyAxCiAgICBkaWcgNQogICAgdW5jb3ZlciA3CiAgICBjYWxsc3ViIHBpblNvdXJjZQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQwMgogICAgLy8gaWYgKChnZXRCeXRlKHNvdXJjZSwgVkZsYWdzKSAmIEZsYWdIb2xkZXJTY29wZSkgIT09IDApIHsKICAgIGludGNfMSAvLyAxCiAgICBnZXRieXRlCiAgICBpbnRjXzEgLy8gMQogICAgJgogICAgYnogcGluTWFpbkhvbGRlcl9hZnRlcl9pZl9lbHNlQDE3CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQwMwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc3RvcmVkSG9sZGVyKHNvdXJjZSkgPT09IFR4bi5zZW5kZXIsIGVyclNvdXJjZU5vdEFsbG93ZWQpCiAgICBkdXAKICAgIGNhbGxzdWIgc3RvcmVkSG9sZGVyCiAgICB0eG4gU2VuZGVyCiAgICA9PQogICAgYm56IHBpbk1haW5Ib2xkZXJfYWZ0ZXJfYXNzZXJ0QDE0CiAgICBieXRlYyAxNCAvLyAiRVJSOmVyckN2U24iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQ3ZTbgoKcGluTWFpbkhvbGRlcl9hZnRlcl9hc3NlcnRAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQwNAogICAgLy8gY29uc3QgZmxhZ3MgPSBnZXRCeXRlKHRoaXMuZWZmZWN0aXZlUG9saWN5KGFzc2V0LCBmYWN0cy5tYW5hZ2VyKS52YWx1ZSwgUEZsYWdzKQogICAgZGlnIDUKICAgIGV4dHJhY3QgMzMgMzIKICAgIGRpZyA0CiAgICBzd2FwCiAgICBjYWxsc3ViIGVmZmVjdGl2ZVBvbGljeQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyAxCiAgICBpbnRjXzIgLy8gMgogICAgZXh0cmFjdF91aW50MTYKICAgIHN1YnN0cmluZzMKICAgIGV4dHJhY3QgMiAwCiAgICBpbnRjXzEgLy8gMQogICAgZ2V0Ynl0ZQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo0MDUKICAgIC8vIGxvZ2dlZEFzc2VydCgoZmxhZ3MgJiBQb2xpY3lIb2xkZXJQaW5zQ29sbGVjdGlibGVPbmx5KSA9PT0gMCwgZXJyU291cmNlTm90QWxsb3dlZCkKICAgIGludGNfMiAvLyAyCiAgICAmCiAgICBieiBwaW5NYWluSG9sZGVyX2FmdGVyX2lmX2Vsc2VAMTcKICAgIGJ5dGVjIDE0IC8vICJFUlI6ZXJyQ3ZTbiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJDdlNuCgpwaW5NYWluSG9sZGVyX2FmdGVyX2lmX2Vsc2VAMTc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQwNwogICAgLy8gY29uc3Qgc2VjdGlvbiA9IFR4bi5zZW5kZXIuYnl0ZXMuY29uY2F0KHRoaXMucGluQ29yZSh3cml0ZXIsIHNsb3QsIHNvdXJjZSkpLmNvbmNhdCh0aGlzLnNvdXJjZUZsYXQoc291cmNlKSkKICAgIHR4biBTZW5kZXIKICAgIHVuY292ZXIgMgogICAgdW5jb3ZlciA1CiAgICBkaWcgMwogICAgY2FsbHN1YiBwaW5Db3JlCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNhbGxzdWIgc291cmNlRmxhdAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNjQKICAgIC8vIHJldHVybiBQcmVmaXhNYWluLmNvbmNhdChpdG9iKGFzc2V0KSkKICAgIGRpZyAyCiAgICBpdG9iCiAgICBieXRlYyA1IC8vICJtIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQwOQogICAgLy8gY29uc3QgW21haW4sIGV4aXN0c10gPSBvcC5Cb3guZ2V0KHRoaXMubWFpbk5hbWUoYXNzZXQpKQogICAgYm94X2dldAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDEwCiAgICAvLyBpZiAoZXhpc3RzICYmIHRoaXMuc2VjdGlvbihtYWluLCBSb2xlSG9sZGVyKSA9PT0gc2VjdGlvbikgewogICAgYnogcGluTWFpbkhvbGRlcl9hZnRlcl9pZl9lbHNlQDIwCiAgICBkdXAKICAgIGludGNfMiAvLyAyCiAgICBjYWxsc3ViIHNlY3Rpb24KICAgIGRpZyAzCiAgICA9PQogICAgYnogcGluTWFpbkhvbGRlcl9hZnRlcl9pZl9lbHNlQDIwCiAgICBidXJ5IDEKICAgIGJ1cnkgMQogICAgYnVyeSAxCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDExCiAgICAvLyB0aGlzLmV4cGVjdE5vUGF5bWVudCgpCiAgICBjYWxsc3ViIGV4cGVjdE5vUGF5bWVudAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo0MTIKICAgIC8vIHJldHVybiB7IHJldmlzaW9uOiBidG9pKG1haW4uc2xpY2UoTVJldmlzaW9uLCBNUmV2aXNpb24gKyA4KSksIGNoYW5nZWQ6IGZhbHNlLCBtYnI6IHRoaXMubWJyTm9uZSgpIH0KICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMKICAgIGRpZyAxCiAgICA+PQogICAgcHVzaGludCAzCiAgICBkaWcgMgogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIHB1c2hpbnQgMTEKICAgIGRpZyAyCiAgICA+PQogICAgcHVzaGludCAxMQogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgc3Vic3RyaW5nMwogICAgYnRvaQogICAgaXRvYgogICAgYnl0ZWNfMiAvLyAweDAwMDAwMDAwMDAwMDAwMDAwMDAwCiAgICBjb25jYXQKCnBpbk1haW5Ib2xkZXJfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMucGluTWFpbkhvbGRlckAyNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mzk0CiAgICAvLyBAYWJpbWV0aG9kKCkKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCnBpbk1haW5Ib2xkZXJfYWZ0ZXJfaWZfZWxzZUAyMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDE0CiAgICAvLyBjb25zdCBmbGFnczogdWludDY0ID0gZXhpc3RzID8gZ2V0Qnl0ZShtYWluLCBNRmxhZ3MpIDogMAogICAgc3dhcAogICAgYnogcGluTWFpbkhvbGRlcl90ZXJuYXJ5X2ZhbHNlQDIyCiAgICBpbnRjXzEgLy8gMQogICAgZ2V0Ynl0ZQoKcGluTWFpbkhvbGRlcl90ZXJuYXJ5X21lcmdlQDIzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo0MTUKICAgIC8vIHJldHVybiB0aGlzLndyaXRlU2VjdGlvbihhc3NldCwgUm9sZUhvbGRlciwgc2VjdGlvbiwgZmxhZ3MsIGZhY3RzLmRlY2ltYWxzLCBUeG4uc2VuZGVyKQogICAgdHhuIFNlbmRlcgogICAgdW5jb3ZlciA0CiAgICBpbnRjXzIgLy8gMgogICAgdW5jb3ZlciA0CiAgICB1bmNvdmVyIDQKICAgIHVuY292ZXIgNQogICAgdW5jb3ZlciA1CiAgICBjYWxsc3ViIHdyaXRlU2VjdGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czozOTQKICAgIC8vIEBhYmltZXRob2QoKQogICAgYiBwaW5NYWluSG9sZGVyX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo6Q29sbGVjdGlibGVWYXJpYXRpb25zLnBpbk1haW5Ib2xkZXJAMjQKCnBpbk1haW5Ib2xkZXJfdGVybmFyeV9mYWxzZUAyMjoKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo0MTQKICAgIC8vIGNvbnN0IGZsYWdzOiB1aW50NjQgPSBleGlzdHMgPyBnZXRCeXRlKG1haW4sIE1GbGFncykgOiAwCiAgICBpbnRjXzAgLy8gMAogICAgYiBwaW5NYWluSG9sZGVyX3Rlcm5hcnlfbWVyZ2VAMjMKCnBpbk1haW5Ib2xkZXJfYm9vbF9mYWxzZUA2OgogICAgaW50Y18wIC8vIDAKICAgIGIgcGluTWFpbkhvbGRlcl9ib29sX21lcmdlQDcKCgovLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMudW5waW5NYWluQ3JlYXRvcltyb3V0aW5nXSgpIC0+IHZvaWQ6CnVucGluTWFpbkNyZWF0b3I6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQxOQogICAgLy8gQGFiaW1ldGhvZCgpCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDIxCiAgICAvLyBjb25zdCBmYWN0cyA9IHRoaXMuYXNzZXRGYWN0cyhhc3NldCkKICAgIGNhbGxzdWIgYXNzZXRGYWN0cwogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQyMgogICAgLy8gbG9nZ2VkQXNzZXJ0KGZhY3RzLmV4aXN0cywgZXJyQXNzZXRNaXNzaW5nKQogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgYm56IHVucGluTWFpbkNyZWF0b3JfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDcgLy8gIkVSUjplcnJDdkFtIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckN2QW0KCnVucGluTWFpbkNyZWF0b3JfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQyMwogICAgLy8gY29uc3QgcmVhc29uID0gdGhpcy5jcmVhdG9yU2lkZVJlbW92ZXIoYXNzZXQsIGNvbnRyb2xsaW5nQXBwLCBmYWN0cykKICAgIGRpZyAxCiAgICBkdXAKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciAzCiAgICBjYWxsc3ViIGNyZWF0b3JTaWRlUmVtb3ZlcgogICAgcG9wCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNjQKICAgIC8vIHJldHVybiBQcmVmaXhNYWluLmNvbmNhdChpdG9iKGFzc2V0KSkKICAgIGl0b2IKICAgIGJ5dGVjIDUgLy8gIm0iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDI0CiAgICAvLyBjb25zdCBbbWFpbiwgZXhpc3RzXSA9IG9wLkJveC5nZXQodGhpcy5tYWluTmFtZShhc3NldCkpCiAgICBib3hfZ2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQyNQogICAgLy8gaWYgKCFleGlzdHMgfHwgZXh0cmFjdFVpbnQxNihtYWluLCBNQ3JlYXRvckxlbikgPT09IDApIHsKICAgIGJ6IHVucGluTWFpbkNyZWF0b3JfaWZfYm9keUA1CiAgICBkdXAKICAgIHB1c2hpbnQgMTEKICAgIGV4dHJhY3RfdWludDE2CiAgICBibnogdW5waW5NYWluQ3JlYXRvcl9hZnRlcl9pZl9lbHNlQDYKCnVucGluTWFpbkNyZWF0b3JfaWZfYm9keUA1OgogICAgcG9wbiAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQyNgogICAgLy8gdGhpcy5leHBlY3ROb1BheW1lbnQoKQogICAgY2FsbHN1YiBleHBlY3ROb1BheW1lbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDI3CiAgICAvLyByZXR1cm4geyByZW1vdmVkOiBmYWxzZSwgcmVhc29uOiBuZXcgVWludDgoUmVtb3ZlZE5vbmUpLCByZWZ1bmQ6IDAgfQogICAgYnl0ZWNfMiAvLyAweDAwMDAwMDAwMDAwMDAwMDAwMDAwCgp1bnBpbk1haW5DcmVhdG9yX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo6Q29sbGVjdGlibGVWYXJpYXRpb25zLnVucGluTWFpbkNyZWF0b3JAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDE5CiAgICAvLyBAYWJpbWV0aG9kKCkKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCnVucGluTWFpbkNyZWF0b3JfYWZ0ZXJfaWZfZWxzZUA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo0MjkKICAgIC8vIGxvZ2dlZEFzc2VydCgoZ2V0Qnl0ZShtYWluLCBNRmxhZ3MpICYgTWFpbkNyZWF0b3JMb2NrZWQpID09PSAwLCBlcnJMb2NrZWQpCiAgICBkdXAKICAgIGludGNfMSAvLyAxCiAgICBnZXRieXRlCiAgICBpbnRjIDQgLy8gMTI4CiAgICAmCiAgICBieiB1bnBpbk1haW5DcmVhdG9yX2FmdGVyX2Fzc2VydEA4CiAgICBieXRlYyAxMCAvLyAiRVJSOmVyckN2TGsiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQ3ZMawoKdW5waW5NYWluQ3JlYXRvcl9hZnRlcl9hc3NlcnRAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDMwCiAgICAvLyBjb25zdCByZWZ1bmQgPSB0aGlzLmNsZWFyU2VjdGlvbihhc3NldCwgbWFpbiwgUm9sZUNyZWF0b3IsIFR4bi5zZW5kZXIpCiAgICB0eG4gU2VuZGVyCiAgICBjb3ZlciAyCiAgICBpbnRjXzEgLy8gMQogICAgdW5jb3ZlciAzCiAgICBjYWxsc3ViIGNsZWFyU2VjdGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo0MzEKICAgIC8vIHJldHVybiB7IHJlbW92ZWQ6IHRydWUsIHJlYXNvbjogbmV3IFVpbnQ4KHJlYXNvbiksIHJlZnVuZCB9CiAgICBzd2FwCiAgICBpdG9iCiAgICBkdXAKICAgIGJpdGxlbgogICAgaW50Y18zIC8vIDgKICAgIDw9CiAgICBhc3NlcnQgLy8gb3ZlcmZsb3cKICAgIGV4dHJhY3QgNyAxCiAgICBieXRlY18zIC8vIDB4ODAKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQxOQogICAgLy8gQGFiaW1ldGhvZCgpCiAgICBiIHVucGluTWFpbkNyZWF0b3JfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMudW5waW5NYWluQ3JlYXRvckA5CgoKLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo6Q29sbGVjdGlibGVWYXJpYXRpb25zLnVucGluTWFpbkhvbGRlcltyb3V0aW5nXSgpIC0+IHZvaWQ6CnVucGluTWFpbkhvbGRlcjoKICAgIGJ5dGVjXzAgLy8gIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDM1CiAgICAvLyBAYWJpbWV0aG9kKCkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo0MzcKICAgIC8vIGNvbnN0IGZhY3RzID0gdGhpcy5hc3NldEZhY3RzKGFzc2V0KQogICAgY2FsbHN1YiBhc3NldEZhY3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQzOAogICAgLy8gbG9nZ2VkQXNzZXJ0KGZhY3RzLmV4aXN0cywgZXJyQXNzZXRNaXNzaW5nKQogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgYm56IHVucGluTWFpbkhvbGRlcl9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNyAvLyAiRVJSOmVyckN2QW0iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQ3ZBbQoKdW5waW5NYWluSG9sZGVyX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMDY0CiAgICAvLyByZXR1cm4gUHJlZml4TWFpbi5jb25jYXQoaXRvYihhc3NldCkpCiAgICBkdXAKICAgIGl0b2IKICAgIGJ5dGVjIDUgLy8gIm0iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDM5CiAgICAvLyBjb25zdCBbbWFpbiwgZXhpc3RzXSA9IG9wLkJveC5nZXQodGhpcy5tYWluTmFtZShhc3NldCkpCiAgICBib3hfZ2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ0MAogICAgLy8gaWYgKCFleGlzdHMgfHwgZXh0cmFjdFVpbnQxNihtYWluLCBNSG9sZGVyTGVuKSA9PT0gMCkgewogICAgYnogdW5waW5NYWluSG9sZGVyX2lmX2JvZHlANQogICAgZHVwCiAgICBwdXNoaW50IDEzCiAgICBleHRyYWN0X3VpbnQxNgogICAgYm56IHVucGluTWFpbkhvbGRlcl9hZnRlcl9pZl9lbHNlQDYKCnVucGluTWFpbkhvbGRlcl9pZl9ib2R5QDU6CiAgICBwb3BuIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDQxCiAgICAvLyB0aGlzLmV4cGVjdE5vUGF5bWVudCgpCiAgICBjYWxsc3ViIGV4cGVjdE5vUGF5bWVudAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo0NDIKICAgIC8vIHJldHVybiB7IHJlbW92ZWQ6IGZhbHNlLCByZWFzb246IG5ldyBVaW50OChSZW1vdmVkTm9uZSksIHJlZnVuZDogMCB9CiAgICBieXRlY18yIC8vIDB4MDAwMDAwMDAwMDAwMDAwMDAwMDAKCnVucGluTWFpbkhvbGRlcl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy51bnBpbk1haW5Ib2xkZXJAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQzNQogICAgLy8gQGFiaW1ldGhvZCgpCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgp1bnBpbk1haW5Ib2xkZXJfYWZ0ZXJfaWZfZWxzZUA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo0NDQKICAgIC8vIGNvbnN0IHBpbm5lZCA9IEFjY291bnQodGhpcy5zZWN0aW9uKG1haW4sIFJvbGVIb2xkZXIpLnNsaWNlKDAsIDMyKSkKICAgIGR1cG4gMgogICAgaW50Y18yIC8vIDIKICAgIGNhbGxzdWIgc2VjdGlvbgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMCAvLyAwCiAgICBkaWcgMQogICAgPj0KICAgIGludGNfMCAvLyAwCiAgICBkaWcgMgogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIHB1c2hpbnQgMzIKICAgIGRpZyAyCiAgICA+PQogICAgcHVzaGludCAzMgogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgc3Vic3RyaW5nMwogICAgZHVwCiAgICBjb3ZlciA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ0NQogICAgLy8gbGV0IHJlYXNvbjogdWludDY0ID0gUmVtb3ZlZEJ5SG9sZGVyCiAgICBwdXNoaW50IDQKICAgIGJ1cnkgNgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo0NDYKICAgIC8vIGlmICghdGhpcy5ob2xkcyhwaW5uZWQsIGFzc2V0LCBnZXRCeXRlKG1haW4sIE1EZWNpbWFscykpKSB7CiAgICBzd2FwCiAgICBpbnRjXzIgLy8gMgogICAgZ2V0Ynl0ZQogICAgZGlnIDMKICAgIHN3YXAKICAgIGNhbGxzdWIgaG9sZHMKICAgIGJueiB1bnBpbk1haW5Ib2xkZXJfZWxzZV9ib2R5QDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDQ3CiAgICAvLyByZWFzb24gPSBSZW1vdmVkVm9pZAogICAgcHVzaGludCAzCiAgICBidXJ5IDQKCnVucGluTWFpbkhvbGRlcl9hZnRlcl9pZl9lbHNlQDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo0NTEKICAgIC8vIGNvbnN0IHJlZnVuZCA9IHRoaXMuY2xlYXJTZWN0aW9uKGFzc2V0LCBtYWluLCBSb2xlSG9sZGVyLCBwaW5uZWQpCiAgICBpbnRjXzIgLy8gMgogICAgdW5jb3ZlciAzCiAgICBjYWxsc3ViIGNsZWFyU2VjdGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo0NTIKICAgIC8vIHJldHVybiB7IHJlbW92ZWQ6IHRydWUsIHJlYXNvbjogbmV3IFVpbnQ4KHJlYXNvbiksIHJlZnVuZCB9CiAgICBkaWcgMQogICAgaXRvYgogICAgZHVwCiAgICBiaXRsZW4KICAgIGludGNfMyAvLyA4CiAgICA8PQogICAgYXNzZXJ0IC8vIG92ZXJmbG93CiAgICBleHRyYWN0IDcgMQogICAgYnl0ZWNfMyAvLyAweDgwCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo0MzUKICAgIC8vIEBhYmltZXRob2QoKQogICAgYiB1bnBpbk1haW5Ib2xkZXJfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMudW5waW5NYWluSG9sZGVyQDEyCgp1bnBpbk1haW5Ib2xkZXJfZWxzZV9ib2R5QDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ0OQogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHBpbm5lZCwgZXJyTm90QXV0aG9yaXplZCkKICAgIHR4biBTZW5kZXIKICAgIGRpZyAzCiAgICA9PQogICAgYm56IHVucGluTWFpbkhvbGRlcl9hZnRlcl9pZl9lbHNlQDExCiAgICBieXRlYyAxMiAvLyAiRVJSOmVyckN2TmEiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQ3ZOYQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy5zZXRBc3NldFBvbGljeVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnNldEFzc2V0UG9saWN5OgogICAgaW50Y18wIC8vIDAKICAgIGJ5dGVjXzAgLy8gIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDU4CiAgICAvLyBAYWJpbWV0aG9kKCkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIGNvdmVyIDIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBjb3ZlciAyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA1CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18xIC8vIDEKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuYm9vbAogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgc3dhcAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmJvb2wKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIHN3YXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDcKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5ib29sCiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Yml0CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ2OAogICAgLy8gY29uc3QgZmFjdHMgPSB0aGlzLmFzc2V0RmFjdHMoYXNzZXQpCiAgICBjYWxsc3ViIGFzc2V0RmFjdHMKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo0NjkKICAgIC8vIGxvZ2dlZEFzc2VydChmYWN0cy5leGlzdHMsIGVyckFzc2V0TWlzc2luZykKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIGJueiBzZXRBc3NldFBvbGljeV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNyAvLyAiRVJSOmVyckN2QW0iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQ3ZBbQoKc2V0QXNzZXRQb2xpY3lfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ3MAogICAgLy8gY29uc3QgY3JlYXRvciA9IHRoaXMucmVzb2x2ZUNyZWF0b3IoYXNzZXQsIGNvbnRyb2xsaW5nQXBwLCBmYWN0cykKICAgIGRpZyA3CiAgICB1bmNvdmVyIDUKICAgIHVuY292ZXIgMgogICAgY2FsbHN1YiByZXNvbHZlQ3JlYXRvcgogICAgcG9wCiAgICBkdXAKICAgIGJ1cnkgOQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo0NzEKICAgIC8vIGxvZ2dlZEFzc2VydChjcmVhdG9yICE9PSBHbG9iYWwuemVyb0FkZHJlc3MgJiYgVHhuLnNlbmRlciA9PT0gY3JlYXRvciwgZXJyTm90Q3JlYXRvcikKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgIT0KICAgIGJ6IHNldEFzc2V0UG9saWN5X2Jvb2xfZmFsc2VANgogICAgdHhuIFNlbmRlcgogICAgZGlnIDgKICAgID09CiAgICBieiBzZXRBc3NldFBvbGljeV9ib29sX2ZhbHNlQDYKICAgIGludGNfMSAvLyAxCgpzZXRBc3NldFBvbGljeV9ib29sX21lcmdlQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ3MQogICAgLy8gbG9nZ2VkQXNzZXJ0KGNyZWF0b3IgIT09IEdsb2JhbC56ZXJvQWRkcmVzcyAmJiBUeG4uc2VuZGVyID09PSBjcmVhdG9yLCBlcnJOb3RDcmVhdG9yKQogICAgYm56IHNldEFzc2V0UG9saWN5X2FmdGVyX2Fzc2VydEA5CiAgICBieXRlYyAxMyAvLyAiRVJSOmVyckN2TmMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQ3ZOYwoKc2V0QXNzZXRQb2xpY3lfYWZ0ZXJfYXNzZXJ0QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ3MgogICAgLy8gbGV0IGZsYWdzID0gdGhpcy5wb2xpY3lGbGFncyhtYW5hZ2VyV3JpdGVzLCBob2xkZXJQaW5zQ29sbGVjdGlibGVPbmx5KQogICAgY292ZXIgMgogICAgY2FsbHN1YiBwb2xpY3lGbGFncwogICAgYnVyeSA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ3MwogICAgLy8gaWYgKGxvY2spIGZsYWdzID0gZmxhZ3MgfCBQb2xpY3lMb2NrZWQKICAgIGJ6IHNldEFzc2V0UG9saWN5X2FmdGVyX2lmX2Vsc2VAMTEKICAgIGRpZyAzCiAgICBpbnRjIDQgLy8gMTI4CiAgICB8CiAgICBidXJ5IDQKCnNldEFzc2V0UG9saWN5X2FmdGVyX2lmX2Vsc2VAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ3NAogICAgLy8gY29uc3QgcmVzdWx0ID0gdGhpcy5zZXRQb2xpY3koUHJlZml4QXNzZXRQb2xpY3kuY29uY2F0KGl0b2IoYXNzZXQpKSwgY29sbGVjdGlibGUsIGhvbGRlciwgZmxhZ3MpCiAgICBkaWcgMgogICAgaXRvYgogICAgYnl0ZWMgMTUgLy8gInAiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGRpZyAyCiAgICBkaWcgMgogICAgZGlnIDYKICAgIGNhbGxzdWIgc2V0UG9saWN5CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDc1CiAgICAvLyBpZiAocmVzdWx0LmNoYW5nZWQpIHRoaXMuZW1pdFBvbGljeShhc3NldCwgR2xvYmFsLnplcm9BZGRyZXNzLCByZXN1bHQucmV2aXNpb24sIGZsYWdzLCBmYWxzZSkKICAgIHB1c2hpbnQgNjQKICAgIGdldGJpdAogICAgYnogc2V0QXNzZXRQb2xpY3lfYWZ0ZXJfaWZfZWxzZUAxMwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBkaWcgNQogICAgY292ZXIgMgogICAgZGlnIDcKICAgIGludGNfMCAvLyAwCiAgICBjYWxsc3ViIGVtaXRQb2xpY3kKCnNldEFzc2V0UG9saWN5X2FmdGVyX2lmX2Vsc2VAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ1OAogICAgLy8gQGFiaW1ldGhvZCgpCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpzZXRBc3NldFBvbGljeV9ib29sX2ZhbHNlQDY6CiAgICBpbnRjXzAgLy8gMAogICAgYiBzZXRBc3NldFBvbGljeV9ib29sX21lcmdlQDcKCgovLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMuc2V0TWFuYWdlclBvbGljeVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnNldE1hbmFnZXJQb2xpY3k6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ4MAogICAgLy8gQGFiaW1ldGhvZCgpCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5ib29sCiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Yml0CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18xIC8vIDEKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuYm9vbAogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo0ODcKICAgIC8vIGNvbnN0IGZsYWdzID0gdGhpcy5wb2xpY3lGbGFncyhtYW5hZ2VyV3JpdGVzLCBob2xkZXJQaW5zQ29sbGVjdGlibGVPbmx5KQogICAgY2FsbHN1YiBwb2xpY3lGbGFncwogICAgZHVwCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ4OAogICAgLy8gY29uc3QgcmVzdWx0ID0gdGhpcy5zZXRQb2xpY3koUHJlZml4TWFuYWdlclBvbGljeS5jb25jYXQoVHhuLnNlbmRlci5ieXRlcyksIGNvbGxlY3RpYmxlLCBob2xkZXIsIGZsYWdzKQogICAgYnl0ZWMgMjIgLy8gIlAiCiAgICB0eG4gU2VuZGVyCiAgICBjb25jYXQKICAgIGNvdmVyIDMKICAgIGNhbGxzdWIgc2V0UG9saWN5CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDg5CiAgICAvLyBpZiAocmVzdWx0LmNoYW5nZWQpIHRoaXMuZW1pdFBvbGljeSgwLCBUeG4uc2VuZGVyLCByZXN1bHQucmV2aXNpb24sIGZsYWdzLCBmYWxzZSkKICAgIHB1c2hpbnQgNjQKICAgIGdldGJpdAogICAgYnogc2V0TWFuYWdlclBvbGljeV9hZnRlcl9pZl9lbHNlQDMKICAgIHR4biBTZW5kZXIKICAgIGRpZyAxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGludGNfMCAvLyAwCiAgICBjb3ZlciAyCiAgICBkaWcgNAogICAgaW50Y18wIC8vIDAKICAgIGNhbGxzdWIgZW1pdFBvbGljeQoKc2V0TWFuYWdlclBvbGljeV9hZnRlcl9pZl9lbHNlQDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ4MAogICAgLy8gQGFiaW1ldGhvZCgpCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo6Q29sbGVjdGlibGVWYXJpYXRpb25zLmRlbGV0ZUFzc2V0UG9saWN5W3JvdXRpbmddKCkgLT4gdm9pZDoKZGVsZXRlQXNzZXRQb2xpY3k6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ5NAogICAgLy8gQGFiaW1ldGhvZCgpCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDk2CiAgICAvLyBjb25zdCBmYWN0cyA9IHRoaXMuYXNzZXRGYWN0cyhhc3NldCkKICAgIGNhbGxzdWIgYXNzZXRGYWN0cwogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ5NwogICAgLy8gbG9nZ2VkQXNzZXJ0KGZhY3RzLmV4aXN0cywgZXJyQXNzZXRNaXNzaW5nKQogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgYm56IGRlbGV0ZUFzc2V0UG9saWN5X2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA3IC8vICJFUlI6ZXJyQ3ZBbSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJDdkFtCgpkZWxldGVBc3NldFBvbGljeV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDk4CiAgICAvLyBjb25zdCByZWFzb24gPSB0aGlzLmNyZWF0b3JTaWRlUmVtb3Zlcihhc3NldCwgY29udHJvbGxpbmdBcHAsIGZhY3RzKQogICAgZGlnIDIKICAgIGR1cAogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDMKICAgIGNhbGxzdWIgY3JlYXRvclNpZGVSZW1vdmVyCiAgICBwb3AKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDk5CiAgICAvLyBjb25zdCByZXN1bHQgPSB0aGlzLmRlbGV0ZVBvbGljeShQcmVmaXhBc3NldFBvbGljeS5jb25jYXQoaXRvYihhc3NldCkpLCBUeG4uc2VuZGVyLCByZWFzb24sIHRydWUpCiAgICBpdG9iCiAgICBieXRlYyAxNSAvLyAicCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgdHhuIFNlbmRlcgogICAgdW5jb3ZlciAyCiAgICBpbnRjXzEgLy8gMQogICAgY2FsbHN1YiBkZWxldGVQb2xpY3kKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1MDAKICAgIC8vIGlmIChyZXN1bHQucmVtb3ZlZCkgdGhpcy5lbWl0UG9saWN5KGFzc2V0LCBHbG9iYWwuemVyb0FkZHJlc3MsIDAsIDAsIHRydWUpCiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Yml0CiAgICBieiBkZWxldGVBc3NldFBvbGljeV9hZnRlcl9pZl9lbHNlQDUKICAgIGRpZyAxCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgIGludGNfMCAvLyAwCiAgICBkdXAKICAgIGludGNfMSAvLyAxCiAgICBjYWxsc3ViIGVtaXRQb2xpY3kKCmRlbGV0ZUFzc2V0UG9saWN5X2FmdGVyX2lmX2Vsc2VANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDk0CiAgICAvLyBAYWJpbWV0aG9kKCkKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMuZGVsZXRlTWFuYWdlclBvbGljeVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmRlbGV0ZU1hbmFnZXJQb2xpY3k6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjUwNwogICAgLy8gY29uc3QgcmVzdWx0ID0gdGhpcy5kZWxldGVQb2xpY3koUHJlZml4TWFuYWdlclBvbGljeS5jb25jYXQoVHhuLnNlbmRlci5ieXRlcyksIFR4bi5zZW5kZXIsIFJlbW92ZWRCeUNyZWF0b3IsIHRydWUpCiAgICBieXRlYyAyMiAvLyAiUCIKICAgIHR4biBTZW5kZXIKICAgIGNvbmNhdAogICAgdHhuIFNlbmRlcgogICAgcHVzaGludCA1CiAgICBpbnRjXzEgLy8gMQogICAgY2FsbHN1YiBkZWxldGVQb2xpY3kKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1MDgKICAgIC8vIGlmIChyZXN1bHQucmVtb3ZlZCkgdGhpcy5lbWl0UG9saWN5KDAsIFR4bi5zZW5kZXIsIDAsIDAsIHRydWUpCiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Yml0CiAgICBieiBkZWxldGVNYW5hZ2VyUG9saWN5X2FmdGVyX2lmX2Vsc2VAMwogICAgaW50Y18wIC8vIDAKICAgIHR4biBTZW5kZXIKICAgIGludGNfMCAvLyAwCiAgICBkdXAKICAgIGludGNfMSAvLyAxCiAgICBjYWxsc3ViIGVtaXRQb2xpY3kKCmRlbGV0ZU1hbmFnZXJQb2xpY3lfYWZ0ZXJfaWZfZWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1MDUKICAgIC8vIEBhYmltZXRob2QoKQogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy5zZXRHcmFudFtyb3V0aW5nXSgpIC0+IHZvaWQ6CnNldEdyYW50OgogICAgYnl0ZWNfMCAvLyAiIgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjUxNQogICAgLy8gQGFiaW1ldGhvZCgpCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1MTcKICAgIC8vIGNvbnN0IG5hbWUgPSBQcmVmaXhHcmFudC5jb25jYXQoVHhuLnNlbmRlci5ieXRlcykKICAgIGJ5dGVjIDkgLy8gImciCiAgICB0eG4gU2VuZGVyCiAgICBjb25jYXQKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjUxOAogICAgLy8gY29uc3Qgc2V0ID0gdGhpcy5jaGVja1dyaXRlclNldCh3cml0ZXJzKQogICAgY2FsbHN1YiBjaGVja1dyaXRlclNldAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1MTkKICAgIC8vIGNvbnN0IFtzdG9yZWQsIGV4aXN0c10gPSBvcC5Cb3guZ2V0KG5hbWUpCiAgICBib3hfZ2V0CiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1MjAKICAgIC8vIGlmIChleGlzdHMgJiYgc3RvcmVkLnNsaWNlKEdTZXQpID09PSBzZXQpIHsKICAgIGJ6IHNldEdyYW50X2FmdGVyX2lmX2Vsc2VANAogICAgZHVwbiAyCiAgICBsZW4KICAgIGR1cAogICAgYnVyeSA3CiAgICBwdXNoaW50IDkKICAgIGRpZyAxCiAgICA+PQogICAgcHVzaGludCA5CiAgICBkaWcgMgogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIGR1cAogICAgYnVyeSA5CiAgICBzd2FwCiAgICBzdWJzdHJpbmczCiAgICBkaWcgNAogICAgPT0KICAgIGJ6IHNldEdyYW50X2FmdGVyX2lmX2Vsc2VANAogICAgYnVyeSAxCiAgICBidXJ5IDEKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1MjEKICAgIC8vIHRoaXMuZXhwZWN0Tm9QYXltZW50KCkKICAgIGNhbGxzdWIgZXhwZWN0Tm9QYXltZW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjUyMgogICAgLy8gcmV0dXJuIHsgcmV2aXNpb246IGJ0b2koc3RvcmVkLnNsaWNlKEdSZXZpc2lvbiwgR1JldmlzaW9uICsgOCkpLCBjaGFuZ2VkOiBmYWxzZSwgbWJyOiB0aGlzLm1ick5vbmUoKSB9CiAgICBpbnRjXzEgLy8gMQogICAgZGlnIDIKICAgIGR1cAogICAgY292ZXIgMgogICAgPj0KICAgIGludGNfMSAvLyAxCiAgICBjb3ZlciAyCiAgICBzZWxlY3QKICAgIGRpZyAzCiAgICBzdWJzdHJpbmczCiAgICBidG9pCiAgICBpdG9iCiAgICBieXRlY18yIC8vIDB4MDAwMDAwMDAwMDAwMDAwMDAwMDAKICAgIGNvbmNhdAoKc2V0R3JhbnRfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMuc2V0R3JhbnRAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTE1CiAgICAvLyBAYWJpbWV0aG9kKCkKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCnNldEdyYW50X2FmdGVyX2lmX2Vsc2VANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTEwOAogICAgLy8gcmV0dXJuIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLm1pbkJhbGFuY2UKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdE1pbkJhbGFuY2UKICAgIHN3YXAKICAgIGNvdmVyIDIKICAgIGFzc2VydCAvLyBhY2NvdW50IGZ1bmRlZAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1MjUKICAgIC8vIGNvbnN0IGZsb3cgPSB0aGlzLnN5bmNNZXRhUm9vdChNZXRhVGFnR3JhbnQsIG5hbWUsIGV4aXN0cyA/IHN0b3JlZC5zbGljZShHU2V0KSA6IEJ5dGVzLmZyb21IZXgoJzAwJyksIHNldCkKICAgIHVuY292ZXIgMgogICAgYnogc2V0R3JhbnRfdGVybmFyeV9mYWxzZUA2CiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA5CiAgICBkaWcgMQogICAgPj0KICAgIHB1c2hpbnQgOQogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBzd2FwCiAgICBzdWJzdHJpbmczCgpzZXRHcmFudF90ZXJuYXJ5X21lcmdlQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjUyNQogICAgLy8gY29uc3QgZmxvdyA9IHRoaXMuc3luY01ldGFSb290KE1ldGFUYWdHcmFudCwgbmFtZSwgZXhpc3RzID8gc3RvcmVkLnNsaWNlKEdTZXQpIDogQnl0ZXMuZnJvbUhleCgnMDAnKSwgc2V0KQogICAgYnl0ZWMgOSAvLyAiZyIKICAgIHVuY292ZXIgMwogICAgZHVwCiAgICBjb3ZlciAyCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgNQogICAgZHVwCiAgICBjb3ZlciA0CiAgICBjYWxsc3ViIHN5bmNNZXRhUm9vdAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1MjYKICAgIC8vIGNvbnN0IHJldmlzaW9uID0gdGhpcy5uZXh0UmV2aXNpb24oKQogICAgY2FsbHN1YiBuZXh0UmV2aXNpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTI3CiAgICAvLyB0aGlzLnB1dEJveChuYW1lLCBCeXRlcy5mcm9tSGV4KCcwMScpLmNvbmNhdChpdG9iKHJldmlzaW9uKSkuY29uY2F0KHNldCkpCiAgICBpdG9iCiAgICBieXRlYyA4IC8vIDB4MDEKICAgIGRpZyAxCiAgICBjb25jYXQKICAgIHVuY292ZXIgMwogICAgY29uY2F0CiAgICB1bmNvdmVyIDMKICAgIHN3YXAKICAgIGNhbGxzdWIgcHV0Qm94CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjUyOAogICAgLy8gY29uc3QgbWJyID0gdGhpcy5zZXR0bGUoYmVmb3JlLCBmbG93LCBUeG4uc2VuZGVyKQogICAgdHhuIFNlbmRlcgogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMgogICAgY2FsbHN1YiBzZXR0bGUKICAgIHBvcAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1MjkKICAgIC8vIGVtaXQ8R3JhbnRDaGFuZ2VkPih7IGhvbGRlcjogVHhuLnNlbmRlciwgcmV2aXNpb24sIGRlbGV0ZWQ6IGZhbHNlLCByb3VuZDogR2xvYmFsLnJvdW5kLCB0aW1lc3RhbXA6IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgfSkKICAgIGdsb2JhbCBSb3VuZAogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgdHhuIFNlbmRlcgogICAgZGlnIDMKICAgIGNvbmNhdAogICAgYnl0ZWMgNCAvLyAweDAwCiAgICBjb25jYXQKICAgIHVuY292ZXIgMgogICAgaXRvYgogICAgY29uY2F0CiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIGJ5dGVjIDI3IC8vIG1ldGhvZCAiR3JhbnRDaGFuZ2VkKGFkZHJlc3MsdWludDY0LGJvb2wsdWludDY0LHVpbnQ2NCkiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1MzAKICAgIC8vIHJldHVybiB7IHJldmlzaW9uLCBjaGFuZ2VkOiB0cnVlLCBtYnIgfQogICAgYnl0ZWNfMyAvLyAweDgwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1MTUKICAgIC8vIEBhYmltZXRob2QoKQogICAgYiBzZXRHcmFudF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy5zZXRHcmFudEA4CgpzZXRHcmFudF90ZXJuYXJ5X2ZhbHNlQDY6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTI1CiAgICAvLyBjb25zdCBmbG93ID0gdGhpcy5zeW5jTWV0YVJvb3QoTWV0YVRhZ0dyYW50LCBuYW1lLCBleGlzdHMgPyBzdG9yZWQuc2xpY2UoR1NldCkgOiBCeXRlcy5mcm9tSGV4KCcwMCcpLCBzZXQpCiAgICBieXRlYyA0IC8vIDB4MDAKICAgIGIgc2V0R3JhbnRfdGVybmFyeV9tZXJnZUA3CgoKLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo6Q29sbGVjdGlibGVWYXJpYXRpb25zLmRlbGV0ZUdyYW50W3JvdXRpbmddKCkgLT4gdm9pZDoKZGVsZXRlR3JhbnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjUzNgogICAgLy8gY29uc3QgbmFtZSA9IFByZWZpeEdyYW50LmNvbmNhdChUeG4uc2VuZGVyLmJ5dGVzKQogICAgYnl0ZWMgOSAvLyAiZyIKICAgIHR4biBTZW5kZXIKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjUzNwogICAgLy8gY29uc3QgW3N0b3JlZCwgZXhpc3RzXSA9IG9wLkJveC5nZXQobmFtZSkKICAgIGJveF9nZXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTM4CiAgICAvLyBpZiAoIWV4aXN0cykgewogICAgYm56IGRlbGV0ZUdyYW50X2FmdGVyX2lmX2Vsc2VAMwogICAgcG9wbiAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjUzOQogICAgLy8gdGhpcy5leHBlY3ROb1BheW1lbnQoKQogICAgY2FsbHN1YiBleHBlY3ROb1BheW1lbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTQwCiAgICAvLyByZXR1cm4geyByZW1vdmVkOiBmYWxzZSwgcmVhc29uOiBuZXcgVWludDgoUmVtb3ZlZE5vbmUpLCByZWZ1bmQ6IDAgfQogICAgYnl0ZWNfMiAvLyAweDAwMDAwMDAwMDAwMDAwMDAwMDAwCgpkZWxldGVHcmFudF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy5kZWxldGVHcmFudEA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1MzQKICAgIC8vIEBhYmltZXRob2QoKQogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKZGVsZXRlR3JhbnRfYWZ0ZXJfaWZfZWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMTA4CiAgICAvLyByZXR1cm4gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MubWluQmFsYW5jZQogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0TWluQmFsYW5jZQogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU0MwogICAgLy8gY29uc3QgZmxvdyA9IHRoaXMuc3luY01ldGFSb290KE1ldGFUYWdHcmFudCwgbmFtZSwgc3RvcmVkLnNsaWNlKEdTZXQpLCBCeXRlcy5mcm9tSGV4KCcwMCcpKQogICAgc3dhcAogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgOQogICAgZGlnIDEKICAgID49CiAgICBwdXNoaW50IDkKICAgIGRpZyAyCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgc3dhcAogICAgc3Vic3RyaW5nMwogICAgYnl0ZWMgOSAvLyAiZyIKICAgIHVuY292ZXIgMwogICAgZHVwCiAgICBjb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIGJ5dGVjIDQgLy8gMHgwMAogICAgY2FsbHN1YiBzeW5jTWV0YVJvb3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTQ0CiAgICAvLyBvcC5Cb3guZGVsZXRlKG5hbWUpCiAgICBzd2FwCiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTQ1CiAgICAvLyBjb25zdCBtYnIgPSB0aGlzLnNldHRsZShiZWZvcmUsIGZsb3csIFR4bi5zZW5kZXIpCiAgICB0eG4gU2VuZGVyCiAgICBjYWxsc3ViIHNldHRsZQogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU0NgogICAgLy8gZW1pdDxHcmFudENoYW5nZWQ+KHsgaG9sZGVyOiBUeG4uc2VuZGVyLCByZXZpc2lvbjogMCwgZGVsZXRlZDogdHJ1ZSwgcm91bmQ6IEdsb2JhbC5yb3VuZCwgdGltZXN0YW1wOiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wIH0pCiAgICB0eG4gU2VuZGVyCiAgICBnbG9iYWwgUm91bmQKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIGludGNfMCAvLyAwCiAgICBpdG9iCiAgICB1bmNvdmVyIDMKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYnl0ZWNfMyAvLyAweDgwCiAgICBjb25jYXQKICAgIHVuY292ZXIgMgogICAgaXRvYgogICAgY29uY2F0CiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIGJ5dGVjIDI3IC8vIG1ldGhvZCAiR3JhbnRDaGFuZ2VkKGFkZHJlc3MsdWludDY0LGJvb2wsdWludDY0LHVpbnQ2NCkiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1NDcKICAgIC8vIHJldHVybiB7IHJlbW92ZWQ6IHRydWUsIHJlYXNvbjogbmV3IFVpbnQ4KFJlbW92ZWRCeUhvbGRlciksIHJlZnVuZDogbWJyLmFtb3VudCB9CiAgICBleHRyYWN0IDEgOAogICAgcHVzaGJ5dGVzIDB4ODAwNAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjUzNAogICAgLy8gQGFiaW1ldGhvZCgpCiAgICBiIGRlbGV0ZUdyYW50X2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo6Q29sbGVjdGlibGVWYXJpYXRpb25zLmRlbGV0ZUdyYW50QDQKCgovLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMucHVyZ2Vbcm91dGluZ10oKSAtPiB2b2lkOgpwdXJnZToKICAgIGludGNfMCAvLyAwCiAgICBieXRlY18wIC8vICIiCiAgICBkdXBuIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTU3CiAgICAvLyBAYWJpbWV0aG9kKCkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTU5CiAgICAvLyBsb2dnZWRBc3NlcnQobmFtZS5sZW5ndGggPj0gQXNzZXROYW1lTGVuZ3RoLCBlcnJCYWRQdXJnZSkKICAgIGxlbgogICAgZHVwCiAgICBwdXNoaW50IDkKICAgID49CiAgICBibnogcHVyZ2VfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDIzIC8vICJFUlI6ZXJyQ3ZCcCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJDdkJwCgpwdXJnZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTYwCiAgICAvLyBjb25zdCBmYW1pbHkgPSBuYW1lLnNsaWNlKDAsIDEpCiAgICBpbnRjXzAgLy8gMAogICAgZGlnIDEKICAgIGR1cAogICAgY292ZXIgMgogICAgPj0KICAgIGludGNfMCAvLyAwCiAgICBkaWcgMgogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIGludGNfMSAvLyAxCiAgICBkaWcgMgogICAgPj0KICAgIGludGNfMSAvLyAxCiAgICBkaWcgMwogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIGRpZyA0CiAgICBkdXAKICAgIGNvdmVyIDQKICAgIHVuY292ZXIgMgogICAgZGlnIDIKICAgIHN1YnN0cmluZzMKICAgIGR1cAogICAgY292ZXIgNAogICAgYnVyeSAxMAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1NjEKICAgIC8vIGNvbnN0IGFzc2V0ID0gYnRvaShuYW1lLnNsaWNlKDEsIDkpKQogICAgcHVzaGludCA5CiAgICBkaWcgMgogICAgPj0KICAgIHB1c2hpbnQgOQogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgZHVwCiAgICBidXJ5IDgKICAgIHN1YnN0cmluZzMKICAgIGJ0b2kKICAgIGJ1cnkgNgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1NjIKICAgIC8vIGlmIChmYW1pbHkgPT09IFByZWZpeFZhcmlhdGlvbikgewogICAgYnl0ZWMgMTEgLy8gInYiCiAgICA9PQogICAgZHVwCiAgICBidXJ5IDQKICAgIGJ6IHB1cmdlX2Vsc2VfYm9keUAxMQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1NjMKICAgIC8vIGxvZ2dlZEFzc2VydChuYW1lLmxlbmd0aCA+IE5hbWVTbG90ICYmIG5hbWUubGVuZ3RoIDw9IE5hbWVTbG90ICsgTWF4U2xvdEJ5dGVzLCBlcnJCYWRQdXJnZSkKICAgIGR1cAogICAgcHVzaGludCA0MQogICAgPgogICAgYnogcHVyZ2VfYm9vbF9mYWxzZUA3CiAgICBkdXAKICAgIHB1c2hpbnQgNjQKICAgIDw9CiAgICBieiBwdXJnZV9ib29sX2ZhbHNlQDcKICAgIGludGNfMSAvLyAxCgpwdXJnZV9ib29sX21lcmdlQDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU2MwogICAgLy8gbG9nZ2VkQXNzZXJ0KG5hbWUubGVuZ3RoID4gTmFtZVNsb3QgJiYgbmFtZS5sZW5ndGggPD0gTmFtZVNsb3QgKyBNYXhTbG90Qnl0ZXMsIGVyckJhZFB1cmdlKQogICAgYm56IHB1cmdlX2FmdGVyX2lmX2Vsc2VAMTkKICAgIGJ5dGVjIDIzIC8vICJFUlI6ZXJyQ3ZCcCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJDdkJwCgpwdXJnZV9hZnRlcl9pZl9lbHNlQDE5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1NjcKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5hc3NldEZhY3RzKGFzc2V0KS5leGlzdHMsIGVyckFzc2V0RXhpc3RzKQogICAgZGlnIDQKICAgIGNhbGxzdWIgYXNzZXRGYWN0cwogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgYnogcHVyZ2VfYWZ0ZXJfYXNzZXJ0QDIxCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJDdkFlIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckN2QWUKCnB1cmdlX2FmdGVyX2Fzc2VydEAyMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTY4CiAgICAvLyB0aGlzLmV4cGVjdE5vUGF5bWVudCgpCiAgICBjYWxsc3ViIGV4cGVjdE5vUGF5bWVudAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1NzAKICAgIC8vIGNvbnN0IFtzdG9yZWQsIGV4aXN0c10gPSBvcC5Cb3guZ2V0KG5hbWUpCiAgICBkaWcgMQogICAgYm94X2dldAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1NzEKICAgIC8vIGlmICghZXhpc3RzKSB7CiAgICBibnogcHVyZ2VfYWZ0ZXJfaWZfZWxzZUAyMwogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU3MgogICAgLy8gcmV0dXJuIHsgcmVtb3ZlZDogZmFsc2UsIHJlYXNvbjogbmV3IFVpbnQ4KFJlbW92ZWROb25lKSwgcmVmdW5kOiAwIH0KICAgIGJ5dGVjXzIgLy8gMHgwMDAwMDAwMDAwMDAwMDAwMDAwMAoKcHVyZ2VfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMucHVyZ2VAMzM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU1NwogICAgLy8gQGFiaW1ldGhvZCgpCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpwdXJnZV9hZnRlcl9pZl9lbHNlQDIzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMTA4CiAgICAvLyByZXR1cm4gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MubWluQmFsYW5jZQogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0TWluQmFsYW5jZQogICAgc3dhcAogICAgY292ZXIgMgogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU3NwogICAgLy8gaWYgKGZhbWlseSA9PT0gUHJlZml4VmFyaWF0aW9uKSB7CiAgICBkaWcgNAogICAgYnogcHVyZ2VfZWxzZV9ib2R5QDI1CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU3OAogICAgLy8gb3AuQm94LmRlbGV0ZShuYW1lKQogICAgZGlnIDMKICAgIGR1cAogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMDgKICAgIC8vIHJldHVybiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcy5taW5CYWxhbmNlCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RNaW5CYWxhbmNlCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTc5CiAgICAvLyB0b3RhbCA9IGJlZm9yZSAtIHRoaXMuYXBwTWluQmFsYW5jZSgpCiAgICB1bmNvdmVyIDMKICAgIHN3YXAKICAgIC0KICAgIGR1cAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1ODAKICAgIC8vIGNvbnN0IHdyaXRlciA9IEFjY291bnQobmFtZS5zbGljZShOYW1lV3JpdGVyLCBOYW1lU2xvdCkpCiAgICBwdXNoaW50IDQxCiAgICBkaWcgNQogICAgZHVwCiAgICBjb3ZlciAyCiAgICA+PQogICAgcHVzaGludCA0MQogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBkaWcgMwogICAgZGlnIDEwCiAgICBkaWcgMgogICAgc3Vic3RyaW5nMwogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1ODEKICAgIC8vIHRoaXMucmVmdW5kKHdyaXRlciwgdG90YWwpCiAgICBkdXAKICAgIHVuY292ZXIgNAogICAgY2FsbHN1YiByZWZ1bmQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTgyCiAgICAvLyB0aGlzLmVtaXREZWxldGVkKGFzc2V0LCB3cml0ZXIsIG5hbWUuc2xpY2UoTmFtZVNsb3QpLCBzdG9yZWQsIFJlbW92ZWRQdXJnZWQpCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMgogICAgdW5jb3ZlciAzCiAgICBzdWJzdHJpbmczCiAgICBkaWcgOAogICAgY292ZXIgMgogICAgdW5jb3ZlciA0CiAgICBpbnRjXzEgLy8gMQogICAgY2FsbHN1YiBlbWl0RGVsZXRlZAoKcHVyZ2VfYWZ0ZXJfaWZfZWxzZUAzMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjAxCiAgICAvLyByZXR1cm4geyByZW1vdmVkOiB0cnVlLCByZWFzb246IG5ldyBVaW50OChSZW1vdmVkUHVyZ2VkKSwgcmVmdW5kOiB0b3RhbCB9CiAgICBpdG9iCiAgICBwdXNoYnl0ZXMgMHg4MDAxCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTU3CiAgICAvLyBAYWJpbWV0aG9kKCkKICAgIGIgcHVyZ2VfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMucHVyZ2VAMzMKCnB1cmdlX2Vsc2VfYm9keUAyNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTgzCiAgICAvLyB9IGVsc2UgaWYgKGZhbWlseSA9PT0gUHJlZml4TWFpbikgewogICAgZGlnIDcKICAgIGJ5dGVjIDUgLy8gIm0iCiAgICA9PQogICAgYnogcHVyZ2VfZWxzZV9ib2R5QDMwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU4NAogICAgLy8gY29uc3QgaG9sZGVyRGVwb3NpdCA9IGJ0b2koc3RvcmVkLnNsaWNlKE1Ib2xkZXJEZXBvc2l0LCBNSG9sZGVyRGVwb3NpdCArIDgpKQogICAgZHVwbiAyCiAgICBsZW4KICAgIHB1c2hpbnQgMjMKICAgIGRpZyAxCiAgICA+PQogICAgcHVzaGludCAyMwogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBwdXNoaW50IDMxCiAgICBkaWcgMgogICAgPj0KICAgIHB1c2hpbnQgMzEKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIGRpZyAyCiAgICBjb3ZlciAyCiAgICBzdWJzdHJpbmczCiAgICBidG9pCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU4NQogICAgLy8gb3AuQm94LmRlbGV0ZShuYW1lKQogICAgZGlnIDUKICAgIGJveF9kZWwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMTA4CiAgICAvLyByZXR1cm4gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MubWluQmFsYW5jZQogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0TWluQmFsYW5jZQogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU4NgogICAgLy8gdG90YWwgPSBiZWZvcmUgLSB0aGlzLmFwcE1pbkJhbGFuY2UoKQogICAgdW5jb3ZlciA0CiAgICBzd2FwCiAgICAtCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU4NwogICAgLy8gaWYgKGV4dHJhY3RVaW50MTYoc3RvcmVkLCBNSG9sZGVyTGVuKSA+IDApIHsKICAgIHB1c2hpbnQgMTMKICAgIGV4dHJhY3RfdWludDE2CiAgICBieiBwdXJnZV9lbHNlX2JvZHlAMjgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTg4CiAgICAvLyB0aGlzLnJlZnVuZChBY2NvdW50KHRoaXMuc2VjdGlvbihzdG9yZWQsIFJvbGVIb2xkZXIpLnNsaWNlKDAsIDMyKSksIGhvbGRlckRlcG9zaXQpCiAgICB1bmNvdmVyIDIKICAgIGludGNfMiAvLyAyCiAgICBjYWxsc3ViIHNlY3Rpb24KICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzAgLy8gMAogICAgZGlnIDEKICAgID49CiAgICBpbnRjXzAgLy8gMAogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBwdXNoaW50IDMyCiAgICBkaWcgMgogICAgPj0KICAgIHB1c2hpbnQgMzIKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIHN1YnN0cmluZzMKICAgIHVuY292ZXIgMgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBjYWxsc3ViIHJlZnVuZAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1ODkKICAgIC8vIHRoaXMucmVmdW5kKFR4bi5zZW5kZXIsIHRvdGFsIC0gaG9sZGVyRGVwb3NpdCkKICAgIHR4biBTZW5kZXIKICAgIGRpZyAyCiAgICB1bmNvdmVyIDIKICAgIC0KICAgIGNhbGxzdWIgcmVmdW5kCgpwdXJnZV9hZnRlcl9pZl9lbHNlQDI5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1OTMKICAgIC8vIHRoaXMuZW1pdE1haW4oYXNzZXQsIDAsIFJvbGVOb25lLCB0cnVlKQogICAgZGlnIDUKICAgIGludGNfMCAvLyAwCiAgICBkdXAKICAgIGludGNfMSAvLyAxCiAgICBjYWxsc3ViIGVtaXRNYWluCiAgICBiIHB1cmdlX2FmdGVyX2lmX2Vsc2VAMzIKCnB1cmdlX2Vsc2VfYm9keUAyODoKICAgIGJ1cnkgMQogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU5MQogICAgLy8gdGhpcy5yZWZ1bmQoVHhuLnNlbmRlciwgdG90YWwpCiAgICB0eG4gU2VuZGVyCiAgICBkaWcgMQogICAgY2FsbHN1YiByZWZ1bmQKICAgIGIgcHVyZ2VfYWZ0ZXJfaWZfZWxzZUAyOQoKcHVyZ2VfZWxzZV9ib2R5QDMwOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1OTUKICAgIC8vIGNvbnN0IGZsb3cgPSB0aGlzLmRyb3BQb2xpY3lSb290cyhuYW1lLCBzdG9yZWQpCiAgICBkaWcgMwogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgZHJvcFBvbGljeVJvb3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU5NgogICAgLy8gb3AuQm94LmRlbGV0ZShuYW1lKQogICAgc3dhcAogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMDgKICAgIC8vIHJldHVybiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcy5taW5CYWxhbmNlCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RNaW5CYWxhbmNlCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTk3CiAgICAvLyB0b3RhbCA9IGJlZm9yZSAtIHRoaXMuYXBwTWluQmFsYW5jZSgpICsgZmxvdy5yZWZ1bmRlZAogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICAtCiAgICBzd2FwCiAgICBpbnRjXzMgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgICsKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1OTgKICAgIC8vIHRoaXMucmVmdW5kKFR4bi5zZW5kZXIsIHRvdGFsKQogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgY2FsbHN1YiByZWZ1bmQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTk5CiAgICAvLyB0aGlzLmVtaXRQb2xpY3koYXNzZXQsIEdsb2JhbC56ZXJvQWRkcmVzcywgMCwgMCwgdHJ1ZSkKICAgIGRpZyA1CiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgIGludGNfMCAvLyAwCiAgICBkdXAKICAgIGludGNfMSAvLyAxCiAgICBjYWxsc3ViIGVtaXRQb2xpY3kKICAgIGIgcHVyZ2VfYWZ0ZXJfaWZfZWxzZUAzMgoKcHVyZ2VfYm9vbF9mYWxzZUA3OgogICAgaW50Y18wIC8vIDAKICAgIGIgcHVyZ2VfYm9vbF9tZXJnZUA4CgpwdXJnZV9lbHNlX2JvZHlAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU2NQogICAgLy8gbG9nZ2VkQXNzZXJ0KChmYW1pbHkgPT09IFByZWZpeE1haW4gfHwgZmFtaWx5ID09PSBQcmVmaXhBc3NldFBvbGljeSkgJiYgbmFtZS5sZW5ndGggPT09IEFzc2V0TmFtZUxlbmd0aCwgZXJyQmFkUHVyZ2UpCiAgICBkaWcgNQogICAgYnl0ZWMgNSAvLyAibSIKICAgID09CiAgICBibnogcHVyZ2VfYW5kX2NvbnRkQDEzCiAgICBkaWcgNQogICAgYnl0ZWMgMTUgLy8gInAiCiAgICA9PQogICAgYnogcHVyZ2VfYm9vbF9mYWxzZUAxNQoKcHVyZ2VfYW5kX2NvbnRkQDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo1NjUKICAgIC8vIGxvZ2dlZEFzc2VydCgoZmFtaWx5ID09PSBQcmVmaXhNYWluIHx8IGZhbWlseSA9PT0gUHJlZml4QXNzZXRQb2xpY3kpICYmIG5hbWUubGVuZ3RoID09PSBBc3NldE5hbWVMZW5ndGgsIGVyckJhZFB1cmdlKQogICAgZHVwCiAgICBwdXNoaW50IDkKICAgID09CiAgICBieiBwdXJnZV9ib29sX2ZhbHNlQDE1CiAgICBpbnRjXzEgLy8gMQoKcHVyZ2VfYm9vbF9tZXJnZUAxNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTY1CiAgICAvLyBsb2dnZWRBc3NlcnQoKGZhbWlseSA9PT0gUHJlZml4TWFpbiB8fCBmYW1pbHkgPT09IFByZWZpeEFzc2V0UG9saWN5KSAmJiBuYW1lLmxlbmd0aCA9PT0gQXNzZXROYW1lTGVuZ3RoLCBlcnJCYWRQdXJnZSkKICAgIGJueiBwdXJnZV9hZnRlcl9pZl9lbHNlQDE5CiAgICBieXRlYyAyMyAvLyAiRVJSOmVyckN2QnAiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQ3ZCcAoKcHVyZ2VfYm9vbF9mYWxzZUAxNToKICAgIGludGNfMCAvLyAwCiAgICBiIHB1cmdlX2Jvb2xfbWVyZ2VAMTYKCgovLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMuZ2V0TWFpbltyb3V0aW5nXSgpIC0+IHZvaWQ6CmdldE1haW46CiAgICBpbnRjXzAgLy8gMAogICAgYnl0ZWNfMCAvLyAiIgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjYxMAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA2NAogICAgLy8gcmV0dXJuIFByZWZpeE1haW4uY29uY2F0KGl0b2IoYXNzZXQpKQogICAgaXRvYgogICAgYnl0ZWMgNSAvLyAibSIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo2MTIKICAgIC8vIGNvbnN0IFttYWluLCBleGlzdHNdID0gb3AuQm94LmdldCh0aGlzLm1haW5OYW1lKGFzc2V0KSkKICAgIGJveF9nZXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjEzCiAgICAvLyBpZiAoZXhpc3RzKSB7CiAgICBieiBnZXRNYWluX2FmdGVyX2lmX2Vsc2VAOQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo2MTQKICAgIC8vIGlmIChleHRyYWN0VWludDE2KG1haW4sIE1Ib2xkZXJMZW4pID4gMCkgewogICAgZHVwCiAgICBwdXNoaW50IDEzCiAgICBleHRyYWN0X3VpbnQxNgogICAgYnogZ2V0TWFpbl9hZnRlcl9pZl9lbHNlQDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjE1CiAgICAvLyBjb25zdCBob2xkZXJTZWN0aW9uID0gdGhpcy5zZWN0aW9uKG1haW4sIFJvbGVIb2xkZXIpCiAgICBkdXBuIDIKICAgIGludGNfMiAvLyAyCiAgICBjYWxsc3ViIHNlY3Rpb24KICAgIGR1cAogICAgYnVyeSA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjYxNgogICAgLy8gaWYgKHRoaXMuaG9sZHMoQWNjb3VudChob2xkZXJTZWN0aW9uLnNsaWNlKDAsIDMyKSksIGFzc2V0LCBnZXRCeXRlKG1haW4sIE1EZWNpbWFscykpKSB7CiAgICBkdXAKICAgIGxlbgogICAgZHVwCiAgICBidXJ5IDYKICAgIGludGNfMCAvLyAwCiAgICBkaWcgMQogICAgPj0KICAgIGludGNfMCAvLyAwCiAgICBkaWcgMgogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIHB1c2hpbnQgMzIKICAgIGRpZyAyCiAgICA+PQogICAgcHVzaGludCAzMgogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgZHVwCiAgICBidXJ5IDgKICAgIHN1YnN0cmluZzMKICAgIHN3YXAKICAgIGludGNfMiAvLyAyCiAgICBnZXRieXRlCiAgICBkaWcgMwogICAgc3dhcAogICAgY2FsbHN1YiBob2xkcwogICAgYnogZ2V0TWFpbl9hZnRlcl9pZl9lbHNlQDYKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo2MTcKICAgIC8vIHJldHVybiB7IHJvbGU6IG5ldyBVaW50OChSb2xlSG9sZGVyKSwgcGluOiBob2xkZXJTZWN0aW9uLnNsaWNlKEhvbGRlclNlY3Rpb25QcmVmaXgpIH0KICAgIGRpZyAzCiAgICBkaWcgMwogICAgZGlnIDMKICAgIHN1YnN0cmluZzMKICAgIGR1cAogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgc3dhcAogICAgY29uY2F0CiAgICBwdXNoYnl0ZXMgMHgwMjAwMDMKICAgIHN3YXAKICAgIGNvbmNhdAoKZ2V0TWFpbl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy5nZXRNYWluQDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo2MTAKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKZ2V0TWFpbl9hZnRlcl9pZl9lbHNlQDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjYyMAogICAgLy8gaWYgKGV4dHJhY3RVaW50MTYobWFpbiwgTUNyZWF0b3JMZW4pID4gMCkgewogICAgZHVwCiAgICBwdXNoaW50IDExCiAgICBleHRyYWN0X3VpbnQxNgogICAgYnogZ2V0TWFpbl9hZnRlcl9pZl9lbHNlQDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjIxCiAgICAvLyByZXR1cm4geyByb2xlOiBuZXcgVWludDgoUm9sZUNyZWF0b3IpLCBwaW46IHRoaXMuc2VjdGlvbihtYWluLCBSb2xlQ3JlYXRvcikgfQogICAgaW50Y18xIC8vIDEKICAgIGNhbGxzdWIgc2VjdGlvbgogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHB1c2hieXRlcyAweDAxMDAwMwogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjYxMAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBiIGdldE1haW5fYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMuZ2V0TWFpbkAxMAoKZ2V0TWFpbl9hZnRlcl9pZl9lbHNlQDk6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjI0CiAgICAvLyByZXR1cm4geyByb2xlOiBuZXcgVWludDgoUm9sZU5vbmUpLCBwaW46IEJ5dGVzKCcnKSB9CiAgICBwdXNoYnl0ZXMgMHgwMDAwMDMwMDAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjYxMAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBiIGdldE1haW5fYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMuZ2V0TWFpbkAxMAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy5hc3NldEZhY3RzKGFzc2V0OiB1aW50NjQpIC0+IGJ5dGVzOgphc3NldEZhY3RzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo2MjkKICAgIC8vIHByaXZhdGUgYXNzZXRGYWN0cyhhc3NldDogdWludDY0KTogQXNzZXRGYWN0cyB7CiAgICBwcm90byAxIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjMxCiAgICAvLyBjb25zdCBbdG90YWwsIGV4aXN0c10gPSBvcC5Bc3NldFBhcmFtcy5hc3NldFRvdGFsKGEpCiAgICBmcmFtZV9kaWcgLTEKICAgIGFzc2V0X3BhcmFtc19nZXQgQXNzZXRUb3RhbAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo2MzIKICAgIC8vIGlmICghZXhpc3RzKSB7CiAgICBibnogYXNzZXRGYWN0c19hZnRlcl9pZl9lbHNlQDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjMzLTY0MAogICAgLy8gcmV0dXJuIHsKICAgIC8vICAgZXhpc3RzOiBmYWxzZSwKICAgIC8vICAgY3JlYXRvcjogR2xvYmFsLnplcm9BZGRyZXNzLAogICAgLy8gICBtYW5hZ2VyOiBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICAvLyAgIGNsYXdiYWNrOiBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICAvLyAgIHRvdGFsOiAwLAogICAgLy8gICBkZWNpbWFsczogMCwKICAgIC8vIH0KICAgIHB1c2hieXRlcyBiYXNlMzIoQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQSkKICAgIHN3YXAKICAgIHJldHN1YgoKYXNzZXRGYWN0c19hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY0MgogICAgLy8gY29uc3QgW2RlY2ltYWxzXSA9IG9wLkFzc2V0UGFyYW1zLmFzc2V0RGVjaW1hbHMoYSkKICAgIGZyYW1lX2RpZyAtMQogICAgYXNzZXRfcGFyYW1zX2dldCBBc3NldERlY2ltYWxzCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjQzCiAgICAvLyBjb25zdCBbbWFuYWdlcl0gPSBvcC5Bc3NldFBhcmFtcy5hc3NldE1hbmFnZXIoYSkKICAgIGZyYW1lX2RpZyAtMQogICAgYXNzZXRfcGFyYW1zX2dldCBBc3NldE1hbmFnZXIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo2NDQKICAgIC8vIGNvbnN0IFtjbGF3YmFja10gPSBvcC5Bc3NldFBhcmFtcy5hc3NldENsYXdiYWNrKGEpCiAgICBmcmFtZV9kaWcgLTEKICAgIGFzc2V0X3BhcmFtc19nZXQgQXNzZXRDbGF3YmFjawogICAgcG9wCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY0NQogICAgLy8gY29uc3QgW2NyZWF0b3JdID0gb3AuQXNzZXRQYXJhbXMuYXNzZXRDcmVhdG9yKGEpCiAgICBmcmFtZV9kaWcgLTEKICAgIGFzc2V0X3BhcmFtc19nZXQgQXNzZXRDcmVhdG9yCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjQ2CiAgICAvLyByZXR1cm4geyBleGlzdHM6IHRydWUsIGNyZWF0b3IsIG1hbmFnZXIsIGNsYXdiYWNrLCB0b3RhbCwgZGVjaW1hbHMgfQogICAgYnl0ZWNfMyAvLyAweDgwCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGl0b2IKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMuaXNVbml0QXNzZXQoZmFjdHM6IGJ5dGVzKSAtPiB1aW50NjQsIGJ5dGVzOgppc1VuaXRBc3NldDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjU0CiAgICAvLyBwcml2YXRlIGlzVW5pdEFzc2V0KGZhY3RzOiBBc3NldEZhY3RzKTogYm9vbGVhbiB7CiAgICBwcm90byAxIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjU1CiAgICAvLyByZXR1cm4gZmFjdHMuZGVjaW1hbHMgPD0gMTkgJiYgZmFjdHMudG90YWwgPj0gdGhpcy51bml0KGZhY3RzLmRlY2ltYWxzKQogICAgZnJhbWVfZGlnIC0xCiAgICBwdXNoaW50IDEwNQogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgcHVzaGludCAxOQogICAgPD0KICAgIGJ6IGlzVW5pdEFzc2V0X2Jvb2xfZmFsc2VAMwogICAgZnJhbWVfZGlnIC0xCiAgICBwdXNoaW50IDk3CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo2NTAKICAgIC8vIHJldHVybiAxMCAqKiBkZWNpbWFscwogICAgcHVzaGludCAxMAogICAgZnJhbWVfZGlnIDAKICAgIGV4cAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo2NTUKICAgIC8vIHJldHVybiBmYWN0cy5kZWNpbWFscyA8PSAxOSAmJiBmYWN0cy50b3RhbCA+PSB0aGlzLnVuaXQoZmFjdHMuZGVjaW1hbHMpCiAgICA+PQogICAgYnogaXNVbml0QXNzZXRfYm9vbF9mYWxzZUAzCiAgICBpbnRjXzEgLy8gMQoKaXNVbml0QXNzZXRfYm9vbF9tZXJnZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo2NTUKICAgIC8vIHJldHVybiBmYWN0cy5kZWNpbWFscyA8PSAxOSAmJiBmYWN0cy50b3RhbCA+PSB0aGlzLnVuaXQoZmFjdHMuZGVjaW1hbHMpCiAgICBmcmFtZV9kaWcgLTEKICAgIHVuY292ZXIgMgogICAgcmV0c3ViCgppc1VuaXRBc3NldF9ib29sX2ZhbHNlQDM6CiAgICBpbnRjXzAgLy8gMAogICAgYiBpc1VuaXRBc3NldF9ib29sX21lcmdlQDQKCgovLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMuaG9sZHMoYWNjb3VudDogYnl0ZXMsIGFzc2V0OiB1aW50NjQsIGRlY2ltYWxzOiB1aW50NjQpIC0+IHVpbnQ2NDoKaG9sZHM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY1OQogICAgLy8gcHJpdmF0ZSBob2xkcyhhY2NvdW50OiBBY2NvdW50LCBhc3NldDogdWludDY0LCBkZWNpbWFsczogdWludDY0KTogYm9vbGVhbiB7CiAgICBwcm90byAzIDEKICAgIGJ5dGVjXzAgLy8gIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjYwCiAgICAvLyBpZiAoYWNjb3VudCA9PT0gR2xvYmFsLnplcm9BZGRyZXNzIHx8IGRlY2ltYWxzID4gMTkpIHJldHVybiBmYWxzZQogICAgZnJhbWVfZGlnIC0zCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgID09CiAgICBibnogaG9sZHNfaWZfYm9keUAyCiAgICBmcmFtZV9kaWcgLTEKICAgIHB1c2hpbnQgMTkKICAgID4KICAgIGJ6IGhvbGRzX2FmdGVyX2lmX2Vsc2VAMwoKaG9sZHNfaWZfYm9keUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo2NjAKICAgIC8vIGlmIChhY2NvdW50ID09PSBHbG9iYWwuemVyb0FkZHJlc3MgfHwgZGVjaW1hbHMgPiAxOSkgcmV0dXJuIGZhbHNlCiAgICBpbnRjXzAgLy8gMAogICAgc3dhcAogICAgcmV0c3ViCgpob2xkc19hZnRlcl9pZl9lbHNlQDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY2MQogICAgLy8gY29uc3QgW2Ftb3VudCwgb3B0ZWRJbl0gPSBvcC5Bc3NldEhvbGRpbmcuYXNzZXRCYWxhbmNlKGFjY291bnQsIEFzc2V0KGFzc2V0KSkKICAgIGZyYW1lX2RpZyAtMwogICAgZnJhbWVfZGlnIC0yCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIHN3YXAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo2NjIKICAgIC8vIHJldHVybiBvcHRlZEluICYmIGFtb3VudCA+PSB0aGlzLnVuaXQoZGVjaW1hbHMpCiAgICBieiBob2xkc19ib29sX2ZhbHNlQDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjUwCiAgICAvLyByZXR1cm4gMTAgKiogZGVjaW1hbHMKICAgIHB1c2hpbnQgMTAKICAgIGZyYW1lX2RpZyAtMQogICAgZXhwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY2MgogICAgLy8gcmV0dXJuIG9wdGVkSW4gJiYgYW1vdW50ID49IHRoaXMudW5pdChkZWNpbWFscykKICAgIGZyYW1lX2RpZyAwCiAgICA8PQogICAgYnogaG9sZHNfYm9vbF9mYWxzZUA2CiAgICBpbnRjXzEgLy8gMQoKaG9sZHNfYm9vbF9tZXJnZUA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo2NjIKICAgIC8vIHJldHVybiBvcHRlZEluICYmIGFtb3VudCA+PSB0aGlzLnVuaXQoZGVjaW1hbHMpCiAgICBzd2FwCiAgICByZXRzdWIKCmhvbGRzX2Jvb2xfZmFsc2VANjoKICAgIGludGNfMCAvLyAwCiAgICBiIGhvbGRzX2Jvb2xfbWVyZ2VANwoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy5yZXNvbHZlQ3JlYXRvcihhc3NldDogdWludDY0LCBjb250cm9sbGluZ0FwcDogdWludDY0LCBmYWN0czogYnl0ZXMpIC0+IGJ5dGVzLCBieXRlczoKcmVzb2x2ZUNyZWF0b3I6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY3MAogICAgLy8gcHJpdmF0ZSByZXNvbHZlQ3JlYXRvcihhc3NldDogdWludDY0LCBjb250cm9sbGluZ0FwcDogdWludDY0LCBmYWN0czogQXNzZXRGYWN0cyk6IEFjY291bnQgewogICAgcHJvdG8gMyAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY3MQogICAgLy8gaWYgKGNvbnRyb2xsaW5nQXBwID09PSBQbGFpbkFzYSkgcmV0dXJuIGZhY3RzLm1hbmFnZXIKICAgIGZyYW1lX2RpZyAtMgogICAgYm56IHJlc29sdmVDcmVhdG9yX2FmdGVyX2lmX2Vsc2VAMgogICAgZnJhbWVfZGlnIC0xCiAgICBleHRyYWN0IDMzIDMyCiAgICBmcmFtZV9kaWcgLTEKICAgIHJldHN1YgoKcmVzb2x2ZUNyZWF0b3JfYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo2NzIKICAgIC8vIGNvbnN0IGFwcEFkZHJlc3MgPSBBcHBsaWNhdGlvbihjb250cm9sbGluZ0FwcCkuYWRkcmVzcwogICAgZnJhbWVfZGlnIC0yCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBzd2FwCiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo2NzMKICAgIC8vIGxvZ2dlZEFzc2VydChmYWN0cy5jbGF3YmFjayA9PT0gYXBwQWRkcmVzcywgZXJyQmFkU21hcnRBc2EpCiAgICBmcmFtZV9kaWcgLTEKICAgIGV4dHJhY3QgNjUgMzIKICAgID09CiAgICBibnogcmVzb2x2ZUNyZWF0b3JfYWZ0ZXJfYXNzZXJ0QDQKICAgIGJ5dGVjIDI0IC8vICJFUlI6ZXJyQ3ZCcyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJDdkJzCgpyZXNvbHZlQ3JlYXRvcl9hZnRlcl9hc3NlcnRANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6Njc2CiAgICAvLyBsb2dnZWRBc3NlcnQoZmFjdHMubWFuYWdlciA9PT0gYXBwQWRkcmVzcywgZXJyQmFkU21hcnRBc2EpCiAgICBmcmFtZV9kaWcgLTEKICAgIGV4dHJhY3QgMzMgMzIKICAgID09CiAgICBibnogcmVzb2x2ZUNyZWF0b3JfYWZ0ZXJfYXNzZXJ0QDYKICAgIGJ5dGVjIDI0IC8vICJFUlI6ZXJyQ3ZCcyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJDdkJzCgpyZXNvbHZlQ3JlYXRvcl9hZnRlcl9hc3NlcnRANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6Njc3LTY4NAogICAgLy8gY29uc3QgY2FsbCA9IGl0eG4KICAgIC8vICAgLmFwcGxpY2F0aW9uQ2FsbCh7CiAgICAvLyAgICAgYXBwSWQ6IGNvbnRyb2xsaW5nQXBwLAogICAgLy8gICAgIGFwcEFyZ3M6IFttZXRob2RTZWxlY3RvcihBcmMyMEdldEFzc2V0Q29uZmlnKSwgQnl0ZXMuZnJvbUhleCgnMDAnKV0sCiAgICAvLyAgICAgYXNzZXRzOiBbQXNzZXQoYXNzZXQpXSwKICAgIC8vICAgICBmZWU6IDAsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgZnJhbWVfZGlnIC0zCiAgICBpdHhuX2ZpZWxkIEFzc2V0cwogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo2ODAKICAgIC8vIGFwcEFyZ3M6IFttZXRob2RTZWxlY3RvcihBcmMyMEdldEFzc2V0Q29uZmlnKSwgQnl0ZXMuZnJvbUhleCgnMDAnKV0sCiAgICBwdXNoYnl0ZXMgMHhjZTJmMDVmMyAvLyBtZXRob2QgImdldF9hc3NldF9jb25maWcoYXNzZXQpKHVpbnQ2NCx1aW50MzIsYm9vbCxzdHJpbmcsc3RyaW5nLHN0cmluZyxieXRlW10sYWRkcmVzcyxhZGRyZXNzLGFkZHJlc3MsYWRkcmVzcykiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgYnl0ZWMgNCAvLyAweDAwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC0yCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6Njc3LTY4MwogICAgLy8gY29uc3QgY2FsbCA9IGl0eG4KICAgIC8vICAgLmFwcGxpY2F0aW9uQ2FsbCh7CiAgICAvLyAgICAgYXBwSWQ6IGNvbnRyb2xsaW5nQXBwLAogICAgLy8gICAgIGFwcEFyZ3M6IFttZXRob2RTZWxlY3RvcihBcmMyMEdldEFzc2V0Q29uZmlnKSwgQnl0ZXMuZnJvbUhleCgnMDAnKV0sCiAgICAvLyAgICAgYXNzZXRzOiBbQXNzZXQoYXNzZXQpXSwKICAgIC8vICAgICBmZWU6IDAsCiAgICAvLyAgIH0pCiAgICBwdXNoaW50IDYKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjgyCiAgICAvLyBmZWU6IDAsCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6Njc3LTY4NAogICAgLy8gY29uc3QgY2FsbCA9IGl0eG4KICAgIC8vICAgLmFwcGxpY2F0aW9uQ2FsbCh7CiAgICAvLyAgICAgYXBwSWQ6IGNvbnRyb2xsaW5nQXBwLAogICAgLy8gICAgIGFwcEFyZ3M6IFttZXRob2RTZWxlY3RvcihBcmMyMEdldEFzc2V0Q29uZmlnKSwgQnl0ZXMuZnJvbUhleCgnMDAnKV0sCiAgICAvLyAgICAgYXNzZXRzOiBbQXNzZXQoYXNzZXQpXSwKICAgIC8vICAgICBmZWU6IDAsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY4NgogICAgLy8gbG9nZ2VkQXNzZXJ0KHJlc3VsdC5sZW5ndGggPj0gQXJjMjBNYW5hZ2VyT2Zmc2V0ICsgMzIgJiYgcmVzdWx0LnNsaWNlKDAsIDQpID09PSBBcmM0UmV0dXJuUHJlZml4LCBlcnJCYWRTbWFydEFzYSkKICAgIGxlbgogICAgZHVwCiAgICBwdXNoaW50IDU3CiAgICA+PQogICAgYnogcmVzb2x2ZUNyZWF0b3JfYm9vbF9mYWxzZUAxMAogICAgaW50Y18wIC8vIDAKICAgIGRpZyAxCiAgICBkdXAKICAgIGNvdmVyIDIKICAgID49CiAgICBpbnRjXzAgLy8gMAogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBwdXNoaW50IDQKICAgIGRpZyAyCiAgICA+PQogICAgcHVzaGludCA0CiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBkaWcgMwogICAgY292ZXIgMgogICAgc3Vic3RyaW5nMwogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYnogcmVzb2x2ZUNyZWF0b3JfYm9vbF9mYWxzZUAxMAogICAgaW50Y18xIC8vIDEKCnJlc29sdmVDcmVhdG9yX2Jvb2xfbWVyZ2VAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY4NgogICAgLy8gbG9nZ2VkQXNzZXJ0KHJlc3VsdC5sZW5ndGggPj0gQXJjMjBNYW5hZ2VyT2Zmc2V0ICsgMzIgJiYgcmVzdWx0LnNsaWNlKDAsIDQpID09PSBBcmM0UmV0dXJuUHJlZml4LCBlcnJCYWRTbWFydEFzYSkKICAgIGJueiByZXNvbHZlQ3JlYXRvcl9hZnRlcl9hc3NlcnRAMTMKICAgIGJ5dGVjIDI0IC8vICJFUlI6ZXJyQ3ZCcyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJDdkJzCgpyZXNvbHZlQ3JlYXRvcl9hZnRlcl9hc3NlcnRAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY4NwogICAgLy8gcmV0dXJuIEFjY291bnQocmVzdWx0LnNsaWNlKEFyYzIwTWFuYWdlck9mZnNldCwgQXJjMjBNYW5hZ2VyT2Zmc2V0ICsgMzIpKQogICAgcHVzaGludCAyNQogICAgZGlnIDEKICAgID49CiAgICBwdXNoaW50IDI1CiAgICBkaWcgMgogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIHB1c2hpbnQgNTcKICAgIGRpZyAyCiAgICA+PQogICAgcHVzaGludCA1NwogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgc3Vic3RyaW5nMwogICAgZnJhbWVfZGlnIC0xCiAgICByZXRzdWIKCnJlc29sdmVDcmVhdG9yX2Jvb2xfZmFsc2VAMTA6CiAgICBpbnRjXzAgLy8gMAogICAgYiByZXNvbHZlQ3JlYXRvcl9ib29sX21lcmdlQDExCgoKLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo6Q29sbGVjdGlibGVWYXJpYXRpb25zLmNyZWF0b3JTaWRlUmVtb3Zlcihhc3NldDogdWludDY0LCBjb250cm9sbGluZ0FwcDogdWludDY0LCBmYWN0czogYnl0ZXMpIC0+IHVpbnQ2NCwgYnl0ZXM6CmNyZWF0b3JTaWRlUmVtb3ZlcjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjkxCiAgICAvLyBwcml2YXRlIGNyZWF0b3JTaWRlUmVtb3Zlcihhc3NldDogdWludDY0LCBjb250cm9sbGluZ0FwcDogdWludDY0LCBmYWN0czogQXNzZXRGYWN0cyk6IHVpbnQ2NCB7CiAgICBwcm90byAzIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjkyCiAgICAvLyBjb25zdCBjcmVhdG9yID0gdGhpcy5yZXNvbHZlQ3JlYXRvcihhc3NldCwgY29udHJvbGxpbmdBcHAsIGZhY3RzKQogICAgZnJhbWVfZGlnIC0zCiAgICBmcmFtZV9kaWcgLTIKICAgIGZyYW1lX2RpZyAtMQogICAgY2FsbHN1YiByZXNvbHZlQ3JlYXRvcgogICAgZnJhbWVfYnVyeSAtMQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY5MwogICAgLy8gaWYgKGNyZWF0b3IgIT09IEdsb2JhbC56ZXJvQWRkcmVzcykgewogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICAhPQogICAgYnogY3JlYXRvclNpZGVSZW1vdmVyX2FmdGVyX2lmX2Vsc2VANgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo2OTQKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSBjcmVhdG9yLCBlcnJOb3RDcmVhdG9yKQogICAgdHhuIFNlbmRlcgogICAgPT0KICAgIGJueiBjcmVhdG9yU2lkZVJlbW92ZXJfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjIDEzIC8vICJFUlI6ZXJyQ3ZOYyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJDdk5jCgpjcmVhdG9yU2lkZVJlbW92ZXJfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY5NQogICAgLy8gcmV0dXJuIFJlbW92ZWRCeUNyZWF0b3IKICAgIHB1c2hpbnQgNQogICAgZnJhbWVfZGlnIC0xCiAgICByZXRzdWIKCmNyZWF0b3JTaWRlUmVtb3Zlcl9hZnRlcl9pZl9lbHNlQDY6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6Njk3CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gZmFjdHMuY3JlYXRvciwgZXJyTm90Q3JlYXRvcikKICAgIHR4biBTZW5kZXIKICAgIGZyYW1lX2RpZyAtMQogICAgZXh0cmFjdCAxIDMyCiAgICA9PQogICAgYm56IGNyZWF0b3JTaWRlUmVtb3Zlcl9hZnRlcl9hc3NlcnRAOAogICAgYnl0ZWMgMTMgLy8gIkVSUjplcnJDdk5jIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckN2TmMKCmNyZWF0b3JTaWRlUmVtb3Zlcl9hZnRlcl9hc3NlcnRAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6Njk4CiAgICAvLyByZXR1cm4gUmVtb3ZlZEJ5QXNzZXRDcmVhdG9yCiAgICBwdXNoaW50IDYKICAgIGZyYW1lX2RpZyAtMQogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo6Q29sbGVjdGlibGVWYXJpYXRpb25zLmVmZmVjdGl2ZVBvbGljeShhc3NldDogdWludDY0LCBtYW5hZ2VyOiBieXRlcykgLT4gYnl0ZXM6CmVmZmVjdGl2ZVBvbGljeToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzA0CiAgICAvLyBwcml2YXRlIGVmZmVjdGl2ZVBvbGljeShhc3NldDogdWludDY0LCBtYW5hZ2VyOiBBY2NvdW50KTogUG9saWN5IHsKICAgIHByb3RvIDIgMQogICAgaW50Y18wIC8vIDAKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo3MDUKICAgIC8vIGNvbnN0IGFzc2V0TmFtZSA9IFByZWZpeEFzc2V0UG9saWN5LmNvbmNhdChpdG9iKGFzc2V0KSkKICAgIGZyYW1lX2RpZyAtMgogICAgaXRvYgogICAgYnl0ZWMgMTUgLy8gInAiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo3MDYKICAgIC8vIGNvbnN0IFthc3NldFZhbHVlLCBhc3NldEV4aXN0c10gPSBvcC5Cb3guZ2V0KGFzc2V0TmFtZSkKICAgIGJveF9nZXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzA3CiAgICAvLyBpZiAoYXNzZXRFeGlzdHMpIHJldHVybiB7IHZhbHVlOiBhc3NldFZhbHVlLCBuYW1lOiBhc3NldE5hbWUgfQogICAgYnogZWZmZWN0aXZlUG9saWN5X2FmdGVyX2lmX2Vsc2VAMgogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDQKICAgICsKICAgIHVuY292ZXIgMgogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBieXRlYyAyNSAvLyAweDAwMDQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCmVmZmVjdGl2ZVBvbGljeV9hZnRlcl9pZl9lbHNlQDI6CiAgICBwb3BuIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzA4CiAgICAvLyBpZiAobWFuYWdlciAhPT0gR2xvYmFsLnplcm9BZGRyZXNzKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgIT0KICAgIGJ6IGVmZmVjdGl2ZVBvbGljeV9hZnRlcl9pZl9lbHNlQDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzA5CiAgICAvLyBjb25zdCBtYW5hZ2VyTmFtZSA9IFByZWZpeE1hbmFnZXJQb2xpY3kuY29uY2F0KG1hbmFnZXIuYnl0ZXMpCiAgICBieXRlYyAyMiAvLyAiUCIKICAgIGZyYW1lX2RpZyAtMQogICAgY29uY2F0CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo3MTAKICAgIC8vIGNvbnN0IFttYW5hZ2VyVmFsdWUsIG1hbmFnZXJFeGlzdHNdID0gb3AuQm94LmdldChtYW5hZ2VyTmFtZSkKICAgIGJveF9nZXQKICAgIHN3YXAKICAgIGZyYW1lX2J1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo3MTEKICAgIC8vIGlmIChtYW5hZ2VyRXhpc3RzKSByZXR1cm4geyB2YWx1ZTogbWFuYWdlclZhbHVlLCBuYW1lOiBtYW5hZ2VyTmFtZSB9CiAgICBieiBlZmZlY3RpdmVQb2xpY3lfYWZ0ZXJfaWZfZWxzZUA2CiAgICBmcmFtZV9kaWcgMQogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDQKICAgICsKICAgIGZyYW1lX2RpZyAwCiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIGJ5dGVjIDI1IC8vIDB4MDAwNAogICAgc3dhcAogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKZWZmZWN0aXZlUG9saWN5X2FmdGVyX2lmX2Vsc2VANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzE0CiAgICAvLyByZXR1cm4geyB2YWx1ZTogQnl0ZXMuZnJvbUhleCgnMDEwMScpLmNvbmNhdChpdG9iKDApKS5jb25jYXQoQnl0ZXMuZnJvbUhleCgnMDAwMCcpKSwgbmFtZTogQnl0ZXMoJycpIH0KICAgIHB1c2hieXRlcyAweDAwMDQwMDEyMDAwYzAxMDEwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo6Q29sbGVjdGlibGVWYXJpYXRpb25zLnBvbGljeVNldHModmFsdWU6IGJ5dGVzKSAtPiBieXRlczoKcG9saWN5U2V0czoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzE4CiAgICAvLyBwcml2YXRlIHBvbGljeVNldHModmFsdWU6IGJ5dGVzKTogW2J5dGVzLCBieXRlc10gewogICAgcHJvdG8gMSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjcxOQogICAgLy8gY29uc3QgcmVzdCA9IHZhbHVlLnNsaWNlKFBTZXRzKQogICAgZnJhbWVfZGlnIC0xCiAgICBsZW4KICAgIHB1c2hpbnQgMTAKICAgIGRpZyAxCiAgICA+PQogICAgcHVzaGludCAxMAogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBmcmFtZV9kaWcgLTEKICAgIHN3YXAKICAgIHVuY292ZXIgMgogICAgc3Vic3RyaW5nMwogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo3MjAKICAgIC8vIGNvbnN0IGZpcnN0ID0gcmVzdC5zbGljZSgwLCB0aGlzLndyaXRlclNldExlbmd0aChyZXN0KSkKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzAgLy8gMAogICAgZGlnIDEKICAgID49CiAgICBpbnRjXzAgLy8gMAogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBkaWcgMgogICAgY2FsbHN1YiB3cml0ZXJTZXRMZW5ndGgKICAgIGR1cAogICAgZGlnIDMKICAgID49CiAgICBkaWcgMwogICAgc3dhcAogICAgc2VsZWN0CiAgICBkaWcgMwogICAgY292ZXIgMgogICAgc3Vic3RyaW5nMwogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo3MjEKICAgIC8vIHJldHVybiBbZmlyc3QsIHJlc3Quc2xpY2UoZmlyc3QubGVuZ3RoKV0KICAgIGR1cAogICAgbGVuCiAgICBkdXAKICAgIGRpZyAzCiAgICA+PQogICAgZGlnIDEKICAgIGRpZyA0CiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgdW5jb3ZlciA0CiAgICBzd2FwCiAgICB1bmNvdmVyIDQKICAgIHN1YnN0cmluZzMKICAgIHN3YXAKICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICB1bmNvdmVyIDIKICAgIGNvbmNhdAogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgNAogICAgKwogICAgZGlnIDIKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHVuY292ZXIgMwogICAgY29uY2F0CiAgICBzd2FwCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgYnl0ZWMgMjUgLy8gMHgwMDA0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy53cml0ZXJTZXRMZW5ndGgoc2V0OiBieXRlcykgLT4gdWludDY0Ogp3cml0ZXJTZXRMZW5ndGg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjcyNAogICAgLy8gcHJpdmF0ZSB3cml0ZXJTZXRMZW5ndGgoc2V0OiBieXRlcyk6IHVpbnQ2NCB7CiAgICBwcm90byAxIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzI1CiAgICAvLyBjb25zdCBtb2RlID0gZ2V0Qnl0ZShzZXQsIDApCiAgICBmcmFtZV9kaWcgLTEKICAgIGludGNfMCAvLyAwCiAgICBnZXRieXRlCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzI2CiAgICAvLyBpZiAobW9kZSA9PT0gV3JpdGVyU2V0QWxsb3cpIHJldHVybiAyICsgMzIgKiBnZXRCeXRlKHNldCwgMSkKICAgIGludGNfMiAvLyAyCiAgICA9PQogICAgYnogd3JpdGVyU2V0TGVuZ3RoX2FmdGVyX2lmX2Vsc2VAMgogICAgZnJhbWVfZGlnIC0xCiAgICBpbnRjXzEgLy8gMQogICAgZ2V0Ynl0ZQogICAgcHVzaGludCAzMgogICAgKgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIHN3YXAKICAgIHJldHN1YgoKd3JpdGVyU2V0TGVuZ3RoX2FmdGVyX2lmX2Vsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzI3CiAgICAvLyBpZiAobW9kZSA9PT0gV3JpdGVyU2V0RGVsZWdhdGUpIHJldHVybiA5CiAgICBkdXAKICAgIHB1c2hpbnQgMwogICAgPT0KICAgIGJ6IHdyaXRlclNldExlbmd0aF9hZnRlcl9pZl9lbHNlQDQKICAgIHB1c2hpbnQgOQogICAgc3dhcAogICAgcmV0c3ViCgp3cml0ZXJTZXRMZW5ndGhfYWZ0ZXJfaWZfZWxzZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo3MjgKICAgIC8vIGlmIChtb2RlID09PSBXcml0ZXJTZXRNZXRhKSByZXR1cm4gMzMKICAgIHB1c2hpbnQgNAogICAgPT0KICAgIGJ6IHdyaXRlclNldExlbmd0aF9hZnRlcl9pZl9lbHNlQDYKICAgIHB1c2hpbnQgMzMKICAgIHJldHN1YgoKd3JpdGVyU2V0TGVuZ3RoX2FmdGVyX2lmX2Vsc2VANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzI5CiAgICAvLyByZXR1cm4gMQogICAgaW50Y18xIC8vIDEKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy5hZG1pdHNMb2NhbGx5KHNldDogYnl0ZXMsIHdyaXRlcjogYnl0ZXMpIC0+IHVpbnQ2NDoKYWRtaXRzTG9jYWxseToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzMzCiAgICAvLyBwcml2YXRlIGFkbWl0c0xvY2FsbHkoc2V0OiBieXRlcywgd3JpdGVyOiBBY2NvdW50KTogYm9vbGVhbiB7CiAgICBwcm90byAyIDEKICAgIGJ5dGVjXzAgLy8gIiIKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo3MzQKICAgIC8vIGNvbnN0IG1vZGUgPSBnZXRCeXRlKHNldCwgMCkKICAgIGZyYW1lX2RpZyAtMgogICAgaW50Y18wIC8vIDAKICAgIGdldGJ5dGUKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo3MzUKICAgIC8vIGlmIChtb2RlID09PSBXcml0ZXJTZXRPcGVuKSByZXR1cm4gdHJ1ZQogICAgaW50Y18xIC8vIDEKICAgID09CiAgICBieiBhZG1pdHNMb2NhbGx5X2FmdGVyX2lmX2Vsc2VAMgogICAgaW50Y18xIC8vIDEKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgphZG1pdHNMb2NhbGx5X2FmdGVyX2lmX2Vsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzM2CiAgICAvLyBpZiAobW9kZSA9PT0gV3JpdGVyU2V0QWxsb3cpIHsKICAgIGludGNfMiAvLyAyCiAgICA9PQogICAgYnogYWRtaXRzTG9jYWxseV9hZnRlcl9pZl9lbHNlQDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzM3CiAgICAvLyBjb25zdCBuID0gZ2V0Qnl0ZShzZXQsIDEpCiAgICBmcmFtZV9kaWcgLTIKICAgIGludGNfMSAvLyAxCiAgICBnZXRieXRlCiAgICBmcmFtZV9idXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzM4CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgbjsgaSArPSAxKSB7CiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfYnVyeSAwCgphZG1pdHNMb2NhbGx5X3doaWxlX3RvcEA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo3MzgKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBuOyBpICs9IDEpIHsKICAgIGZyYW1lX2RpZyAwCiAgICBmcmFtZV9kaWcgMQogICAgPAogICAgYnogYWRtaXRzTG9jYWxseV9hZnRlcl9pZl9lbHNlQDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzM5CiAgICAvLyBpZiAoc2V0LnNsaWNlKDIgKyAzMiAqIGksIDM0ICsgMzIgKiBpKSA9PT0gd3JpdGVyLmJ5dGVzKSByZXR1cm4gdHJ1ZQogICAgZnJhbWVfZGlnIC0yCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgIGZyYW1lX2RpZyAwCiAgICAqCiAgICBpbnRjXzIgLy8gMgogICAgZGlnIDEKICAgICsKICAgIGR1cAogICAgZGlnIDMKICAgID49CiAgICBkaWcgMwogICAgc3dhcAogICAgc2VsZWN0CiAgICBwdXNoaW50IDM0CiAgICB1bmNvdmVyIDIKICAgICsKICAgIGR1cAogICAgZGlnIDMKICAgID49CiAgICBzd2FwCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBkdXAKICAgIGRpZyAyCiAgICA8CiAgICBkaWcgMgogICAgc3dhcAogICAgc2VsZWN0CiAgICBmcmFtZV9kaWcgLTIKICAgIGNvdmVyIDIKICAgIHN1YnN0cmluZzMKICAgIGZyYW1lX2RpZyAtMQogICAgPT0KICAgIGJ6IGFkbWl0c0xvY2FsbHlfYWZ0ZXJfaWZfZWxzZUA3CiAgICBpbnRjXzEgLy8gMQogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCmFkbWl0c0xvY2FsbHlfYWZ0ZXJfaWZfZWxzZUA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo3MzgKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBuOyBpICs9IDEpIHsKICAgIGZyYW1lX2RpZyAwCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgZnJhbWVfYnVyeSAwCiAgICBiIGFkbWl0c0xvY2FsbHlfd2hpbGVfdG9wQDQKCmFkbWl0c0xvY2FsbHlfYWZ0ZXJfaWZfZWxzZUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo3NDIKICAgIC8vIHJldHVybiBmYWxzZQogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo6Q29sbGVjdGlibGVWYXJpYXRpb25zLmFkbWl0c0J5TWV0YShzZXQ6IGJ5dGVzLCB0YWc6IGJ5dGVzLCBib3hOYW1lOiBieXRlcywgd3JpdGVyOiBieXRlcywgcHJvb2Y6IGJ5dGVzKSAtPiB1aW50NjQsIGJ5dGVzOgphZG1pdHNCeU1ldGE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc0NQogICAgLy8gcHJpdmF0ZSBhZG1pdHNCeU1ldGEoc2V0OiBieXRlcywgdGFnOiBzdHJpbmcsIGJveE5hbWU6IGJ5dGVzLCB3cml0ZXI6IEFjY291bnQsIHByb29mOiBieXRlczwzMj5bXSk6IGJvb2xlYW4gewogICAgcHJvdG8gNSAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc0NgogICAgLy8gaWYgKGdldEJ5dGUoc2V0LCAwKSAhPT0gV3JpdGVyU2V0TWV0YSB8fCBib3hOYW1lLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGZhbHNlCiAgICBmcmFtZV9kaWcgLTUKICAgIGludGNfMCAvLyAwCiAgICBnZXRieXRlCiAgICBwdXNoaW50IDQKICAgICE9CiAgICBibnogYWRtaXRzQnlNZXRhX2lmX2JvZHlAMgogICAgZnJhbWVfZGlnIC0zCiAgICBsZW4KICAgIGJueiBhZG1pdHNCeU1ldGFfYWZ0ZXJfaWZfZWxzZUAzCgphZG1pdHNCeU1ldGFfaWZfYm9keUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo3NDYKICAgIC8vIGlmIChnZXRCeXRlKHNldCwgMCkgIT09IFdyaXRlclNldE1ldGEgfHwgYm94TmFtZS5sZW5ndGggPT09IDApIHJldHVybiBmYWxzZQogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2RpZyAtMQogICAgcmV0c3ViCgphZG1pdHNCeU1ldGFfYWZ0ZXJfaWZfZWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo3NDctNzUxCiAgICAvLyByZXR1cm4gYWJpQ2FsbDx0eXBlb2YgTWV0YS5wcm90b3R5cGUudmVyaWZ5Pih7CiAgICAvLyAgIGFwcElkOiB0aGlzLm1ldGFBcHAudmFsdWUsCiAgICAvLyAgIGFyZ3M6IFtHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgdGhpcy5tZXRhUm9vdE5hbWUodGFnLCBib3hOYW1lKSwgc2hhMjU2KHNoYTI1Nih3cml0ZXIuYnl0ZXMpKSwgcHJvb2YsIHRoaXMubWV0YVRyZWVUeXBlLnZhbHVlXSwKICAgIC8vICAgZmVlOiAwLAogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzQ5CiAgICAvLyBhcmdzOiBbR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIHRoaXMubWV0YVJvb3ROYW1lKHRhZywgYm94TmFtZSksIHNoYTI1NihzaGEyNTYod3JpdGVyLmJ5dGVzKSksIHByb29mLCB0aGlzLm1ldGFUcmVlVHlwZS52YWx1ZV0sCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgZnJhbWVfZGlnIC00CiAgICBmcmFtZV9kaWcgLTMKICAgIGNhbGxzdWIgbWV0YVJvb3ROYW1lCiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC0yCiAgICBzaGEyNTYKICAgIHNoYTI1NgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjEwCiAgICAvLyBtZXRhVHJlZVR5cGUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBHbG9iYWxTdGF0ZUtleU1ldGFUcmVlVHlwZSB9KQogICAgYnl0ZWMgMTggLy8gInQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc0OQogICAgLy8gYXJnczogW0dsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCB0aGlzLm1ldGFSb290TmFtZSh0YWcsIGJveE5hbWUpLCBzaGEyNTYoc2hhMjU2KHdyaXRlci5ieXRlcykpLCBwcm9vZiwgdGhpcy5tZXRhVHJlZVR5cGUudmFsdWVdLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzQ4CiAgICAvLyBhcHBJZDogdGhpcy5tZXRhQXBwLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjA4CiAgICAvLyBtZXRhQXBwID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogR2xvYmFsU3RhdGVLZXlNZXRhQXBwIH0pCiAgICBieXRlYyAxNyAvLyAiYSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzQ4CiAgICAvLyBhcHBJZDogdGhpcy5tZXRhQXBwLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo3NDctNzUxCiAgICAvLyByZXR1cm4gYWJpQ2FsbDx0eXBlb2YgTWV0YS5wcm90b3R5cGUudmVyaWZ5Pih7CiAgICAvLyAgIGFwcElkOiB0aGlzLm1ldGFBcHAudmFsdWUsCiAgICAvLyAgIGFyZ3M6IFtHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgdGhpcy5tZXRhUm9vdE5hbWUodGFnLCBib3hOYW1lKSwgc2hhMjU2KHNoYTI1Nih3cml0ZXIuYnl0ZXMpKSwgcHJvb2YsIHRoaXMubWV0YVRyZWVUeXBlLnZhbHVlXSwKICAgIC8vICAgZmVlOiAwLAogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIHB1c2hieXRlcyAweDJiZjNjYzVhIC8vIG1ldGhvZCAidmVyaWZ5KGFkZHJlc3Msc3RyaW5nLGJ5dGVbMzJdLGJ5dGVbMzJdW10sdWludDY0KWJvb2wiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGZyYW1lX2RpZyAtMQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo3NTAKICAgIC8vIGZlZTogMCwKICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo3NDctNzUxCiAgICAvLyByZXR1cm4gYWJpQ2FsbDx0eXBlb2YgTWV0YS5wcm90b3R5cGUudmVyaWZ5Pih7CiAgICAvLyAgIGFwcElkOiB0aGlzLm1ldGFBcHAudmFsdWUsCiAgICAvLyAgIGFyZ3M6IFtHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgdGhpcy5tZXRhUm9vdE5hbWUodGFnLCBib3hOYW1lKSwgc2hhMjU2KHNoYTI1Nih3cml0ZXIuYnl0ZXMpKSwgcHJvb2YsIHRoaXMubWV0YVRyZWVUeXBlLnZhbHVlXSwKICAgIC8vICAgZmVlOiAwLAogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIHN3YXAKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBib29sCiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Yml0CiAgICBmcmFtZV9kaWcgLTEKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy5hZG1pdHNCeURlbGVnYXRlKHNldDogYnl0ZXMsIGFzc2V0OiB1aW50NjQsIHdyaXRlcjogYnl0ZXMsIHNsb3Q6IGJ5dGVzLCBob2xkZXI6IGJ5dGVzKSAtPiB1aW50NjQ6CmFkbWl0c0J5RGVsZWdhdGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc1NQogICAgLy8gcHJpdmF0ZSBhZG1pdHNCeURlbGVnYXRlKHNldDogYnl0ZXMsIGFzc2V0OiB1aW50NjQsIHdyaXRlcjogQWNjb3VudCwgc2xvdDogYnl0ZXMsIGhvbGRlcjogQWNjb3VudCk6IGJvb2xlYW4gewogICAgcHJvdG8gNSAxCiAgICBpbnRjXzAgLy8gMAogICAgYnl0ZWNfMCAvLyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo3NTYKICAgIC8vIGlmIChnZXRCeXRlKHNldCwgMCkgIT09IFdyaXRlclNldERlbGVnYXRlKSByZXR1cm4gZmFsc2UKICAgIGZyYW1lX2RpZyAtNQogICAgaW50Y18wIC8vIDAKICAgIGdldGJ5dGUKICAgIHB1c2hpbnQgMwogICAgIT0KICAgIGJ6IGFkbWl0c0J5RGVsZWdhdGVfYWZ0ZXJfaWZfZWxzZUAyCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCmFkbWl0c0J5RGVsZWdhdGVfYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo3NTctNzY5CiAgICAvLyBjb25zdCBjYWxsID0gaXR4bgogICAgLy8gICAuYXBwbGljYXRpb25DYWxsKHsKICAgIC8vICAgICBhcHBJZDogYnRvaShzZXQuc2xpY2UoMSwgOSkpLAogICAgLy8gICAgIGFwcEFyZ3M6IFsKICAgIC8vICAgICAgIG1ldGhvZFNlbGVjdG9yKERlbGVnYXRlQWRtaXQpLAogICAgLy8gICAgICAgaXRvYihhc3NldCksCiAgICAvLyAgICAgICB3cml0ZXIuYnl0ZXMsCiAgICAvLyAgICAgICBpdG9iKHNsb3QubGVuZ3RoKS5zbGljZSg2LCA4KS5jb25jYXQoc2xvdCksCiAgICAvLyAgICAgICBob2xkZXIuYnl0ZXMsCiAgICAvLyAgICAgXSwKICAgIC8vICAgICBmZWU6IDAsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo3NTkKICAgIC8vIGFwcElkOiBidG9pKHNldC5zbGljZSgxLCA5KSksCiAgICBmcmFtZV9kaWcgLTUKICAgIGxlbgogICAgaW50Y18xIC8vIDEKICAgIGRpZyAxCiAgICA+PQogICAgaW50Y18xIC8vIDEKICAgIGRpZyAyCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgcHVzaGludCA5CiAgICBkaWcgMgogICAgPj0KICAgIHB1c2hpbnQgOQogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgZnJhbWVfZGlnIC01CiAgICBjb3ZlciAyCiAgICBzdWJzdHJpbmczCiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc2MgogICAgLy8gaXRvYihhc3NldCksCiAgICBmcmFtZV9kaWcgLTQKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzY0CiAgICAvLyBpdG9iKHNsb3QubGVuZ3RoKS5zbGljZSg2LCA4KS5jb25jYXQoc2xvdCksCiAgICBmcmFtZV9kaWcgLTIKICAgIGxlbgogICAgaXRvYgogICAgc3Vic3RyaW5nIDYgOAogICAgZnJhbWVfZGlnIC0yCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzYxCiAgICAvLyBtZXRob2RTZWxlY3RvcihEZWxlZ2F0ZUFkbWl0KSwKICAgIHB1c2hieXRlcyAweDIwYzU0ZmM5IC8vIG1ldGhvZCAiYWRtaXQodWludDY0LGFkZHJlc3MsYnl0ZVtdLGFkZHJlc3MpYm9vbCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC0zCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGZyYW1lX2RpZyAtMQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo3NTctNzY4CiAgICAvLyBjb25zdCBjYWxsID0gaXR4bgogICAgLy8gICAuYXBwbGljYXRpb25DYWxsKHsKICAgIC8vICAgICBhcHBJZDogYnRvaShzZXQuc2xpY2UoMSwgOSkpLAogICAgLy8gICAgIGFwcEFyZ3M6IFsKICAgIC8vICAgICAgIG1ldGhvZFNlbGVjdG9yKERlbGVnYXRlQWRtaXQpLAogICAgLy8gICAgICAgaXRvYihhc3NldCksCiAgICAvLyAgICAgICB3cml0ZXIuYnl0ZXMsCiAgICAvLyAgICAgICBpdG9iKHNsb3QubGVuZ3RoKS5zbGljZSg2LCA4KS5jb25jYXQoc2xvdCksCiAgICAvLyAgICAgICBob2xkZXIuYnl0ZXMsCiAgICAvLyAgICAgXSwKICAgIC8vICAgICBmZWU6IDAsCiAgICAvLyAgIH0pCiAgICBwdXNoaW50IDYKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzY3CiAgICAvLyBmZWU6IDAsCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzU3LTc2OQogICAgLy8gY29uc3QgY2FsbCA9IGl0eG4KICAgIC8vICAgLmFwcGxpY2F0aW9uQ2FsbCh7CiAgICAvLyAgICAgYXBwSWQ6IGJ0b2koc2V0LnNsaWNlKDEsIDkpKSwKICAgIC8vICAgICBhcHBBcmdzOiBbCiAgICAvLyAgICAgICBtZXRob2RTZWxlY3RvcihEZWxlZ2F0ZUFkbWl0KSwKICAgIC8vICAgICAgIGl0b2IoYXNzZXQpLAogICAgLy8gICAgICAgd3JpdGVyLmJ5dGVzLAogICAgLy8gICAgICAgaXRvYihzbG90Lmxlbmd0aCkuc2xpY2UoNiwgOCkuY29uY2F0KHNsb3QpLAogICAgLy8gICAgICAgaG9sZGVyLmJ5dGVzLAogICAgLy8gICAgIF0sCiAgICAvLyAgICAgZmVlOiAwLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZnJhbWVfYnVyeSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc3MQogICAgLy8gcmV0dXJuIHJlc3VsdC5sZW5ndGggPT09IDUgJiYgcmVzdWx0LnNsaWNlKDAsIDQpID09PSBBcmM0UmV0dXJuUHJlZml4ICYmIGdldEJ5dGUocmVzdWx0LCA0KSA9PT0gMHg4MAogICAgbGVuCiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMQogICAgcHVzaGludCA1CiAgICA9PQogICAgYnogYWRtaXRzQnlEZWxlZ2F0ZV9ib29sX2ZhbHNlQDcKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9kaWcgMQogICAgZHVwCiAgICBjb3ZlciAyCiAgICA+PQogICAgaW50Y18wIC8vIDAKICAgIGRpZyAyCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgcHVzaGludCA0CiAgICBkaWcgMgogICAgPj0KICAgIHB1c2hpbnQgNAogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgZnJhbWVfZGlnIDAKICAgIGNvdmVyIDIKICAgIHN1YnN0cmluZzMKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGJ6IGFkbWl0c0J5RGVsZWdhdGVfYm9vbF9mYWxzZUA3CiAgICBmcmFtZV9kaWcgMAogICAgcHVzaGludCA0CiAgICBnZXRieXRlCiAgICBpbnRjIDQgLy8gMTI4CiAgICA9PQogICAgYnogYWRtaXRzQnlEZWxlZ2F0ZV9ib29sX2ZhbHNlQDcKICAgIGludGNfMSAvLyAxCgphZG1pdHNCeURlbGVnYXRlX2Jvb2xfbWVyZ2VAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzcxCiAgICAvLyByZXR1cm4gcmVzdWx0Lmxlbmd0aCA9PT0gNSAmJiByZXN1bHQuc2xpY2UoMCwgNCkgPT09IEFyYzRSZXR1cm5QcmVmaXggJiYgZ2V0Qnl0ZShyZXN1bHQsIDQpID09PSAweDgwCiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKYWRtaXRzQnlEZWxlZ2F0ZV9ib29sX2ZhbHNlQDc6CiAgICBpbnRjXzAgLy8gMAogICAgYiBhZG1pdHNCeURlbGVnYXRlX2Jvb2xfbWVyZ2VAOAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy5wb2xpY3lGbGFncyhtYW5hZ2VyV3JpdGVzOiB1aW50NjQsIGhvbGRlclBpbnNDb2xsZWN0aWJsZU9ubHk6IHVpbnQ2NCkgLT4gdWludDY0Ogpwb2xpY3lGbGFnczoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODAzCiAgICAvLyBwcml2YXRlIHBvbGljeUZsYWdzKG1hbmFnZXJXcml0ZXM6IGJvb2xlYW4sIGhvbGRlclBpbnNDb2xsZWN0aWJsZU9ubHk6IGJvb2xlYW4pOiB1aW50NjQgewogICAgcHJvdG8gMiAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgwNAogICAgLy8gbGV0IGZsYWdzOiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo4MDUKICAgIC8vIGlmIChtYW5hZ2VyV3JpdGVzKSBmbGFncyA9IGZsYWdzIHwgUG9saWN5TWFuYWdlcldyaXRlcwogICAgZnJhbWVfZGlnIC0yCiAgICBieiBwb2xpY3lGbGFnc19hZnRlcl9pZl9lbHNlQDIKICAgIGludGNfMSAvLyAxCiAgICBmcmFtZV9idXJ5IDAKCnBvbGljeUZsYWdzX2FmdGVyX2lmX2Vsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODA2CiAgICAvLyBpZiAoaG9sZGVyUGluc0NvbGxlY3RpYmxlT25seSkgZmxhZ3MgPSBmbGFncyB8IFBvbGljeUhvbGRlclBpbnNDb2xsZWN0aWJsZU9ubHkKICAgIGZyYW1lX2RpZyAtMQogICAgYnogcG9saWN5RmxhZ3NfYWZ0ZXJfaWZfZWxzZUA0CiAgICBmcmFtZV9kaWcgMAogICAgaW50Y18yIC8vIDIKICAgIHwKICAgIGZyYW1lX2J1cnkgMAoKcG9saWN5RmxhZ3NfYWZ0ZXJfaWZfZWxzZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo4MDcKICAgIC8vIHJldHVybiBmbGFncwogICAgZnJhbWVfZGlnIDAKICAgIHN3YXAKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy5zZXRQb2xpY3kobmFtZTogYnl0ZXMsIGNvbGxlY3RpYmxlOiBieXRlcywgaG9sZGVyOiBieXRlcywgZmxhZ3M6IHVpbnQ2NCkgLT4gYnl0ZXM6CnNldFBvbGljeToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODExCiAgICAvLyBwcml2YXRlIHNldFBvbGljeShuYW1lOiBieXRlcywgY29sbGVjdGlibGU6IGJ5dGVzLCBob2xkZXI6IGJ5dGVzLCBmbGFnczogdWludDY0KTogV3JpdGVSZXN1bHQgewogICAgcHJvdG8gNCAxCiAgICBieXRlY18wIC8vICIiCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODEyCiAgICAvLyBjb25zdCBzZXRzID0gdGhpcy5jaGVja1dyaXRlclNldChjb2xsZWN0aWJsZSkuY29uY2F0KHRoaXMuY2hlY2tXcml0ZXJTZXQoaG9sZGVyKSkKICAgIGZyYW1lX2RpZyAtMwogICAgY2FsbHN1YiBjaGVja1dyaXRlclNldAogICAgZnJhbWVfZGlnIC0yCiAgICBjYWxsc3ViIGNoZWNrV3JpdGVyU2V0CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODEzCiAgICAvLyBjb25zdCBbc3RvcmVkLCBleGlzdHNdID0gb3AuQm94LmdldChuYW1lKQogICAgZnJhbWVfZGlnIC00CiAgICBib3hfZ2V0CiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo4MTQKICAgIC8vIGlmIChleGlzdHMgJiYgZ2V0Qnl0ZShzdG9yZWQsIFBGbGFncykgPT09IGZsYWdzICYmIHN0b3JlZC5zbGljZShQU2V0cykgPT09IHNldHMpIHsKICAgIGJ6IHNldFBvbGljeV9hZnRlcl9pZl9lbHNlQDQKICAgIGR1cAogICAgaW50Y18xIC8vIDEKICAgIGdldGJ5dGUKICAgIGZyYW1lX2RpZyAtMQogICAgPT0KICAgIGJ6IHNldFBvbGljeV9hZnRlcl9pZl9lbHNlQDQKICAgIGR1cG4gMgogICAgbGVuCiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMQogICAgcHVzaGludCAxMAogICAgZGlnIDEKICAgID49CiAgICBwdXNoaW50IDEwCiAgICBkaWcgMgogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIGR1cAogICAgZnJhbWVfYnVyeSAwCiAgICBzd2FwCiAgICBzdWJzdHJpbmczCiAgICBkaWcgMwogICAgPT0KICAgIGJ6IHNldFBvbGljeV9hZnRlcl9pZl9lbHNlQDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODE1CiAgICAvLyB0aGlzLmV4cGVjdE5vUGF5bWVudCgpCiAgICBjYWxsc3ViIGV4cGVjdE5vUGF5bWVudAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo4MTYKICAgIC8vIHJldHVybiB7IHJldmlzaW9uOiBidG9pKHN0b3JlZC5zbGljZShQUmV2aXNpb24sIFBSZXZpc2lvbiArIDgpKSwgY2hhbmdlZDogZmFsc2UsIG1icjogdGhpcy5tYnJOb25lKCkgfQogICAgaW50Y18yIC8vIDIKICAgIGZyYW1lX2RpZyAxCiAgICBkdXAKICAgIGNvdmVyIDIKICAgID49CiAgICBpbnRjXzIgLy8gMgogICAgY292ZXIgMgogICAgc2VsZWN0CiAgICBmcmFtZV9kaWcgMAogICAgc3Vic3RyaW5nMwogICAgYnRvaQogICAgaXRvYgogICAgYnl0ZWNfMiAvLyAweDAwMDAwMDAwMDAwMDAwMDAwMDAwCiAgICBjb25jYXQKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpzZXRQb2xpY3lfYWZ0ZXJfaWZfZWxzZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo4MTgKICAgIC8vIGxvZ2dlZEFzc2VydCghZXhpc3RzIHx8IChnZXRCeXRlKHN0b3JlZCwgUEZsYWdzKSAmIFBvbGljeUxvY2tlZCkgPT09IDAsIGVyckxvY2tlZCkKICAgIGRpZyAxCiAgICBieiBzZXRQb2xpY3lfYm9vbF90cnVlQDYKICAgIGR1cAogICAgaW50Y18xIC8vIDEKICAgIGdldGJ5dGUKICAgIGludGMgNCAvLyAxMjgKICAgICYKICAgIGJueiBzZXRQb2xpY3lfYm9vbF9mYWxzZUA3CgpzZXRQb2xpY3lfYm9vbF90cnVlQDY6CiAgICBpbnRjXzEgLy8gMQoKc2V0UG9saWN5X2Jvb2xfbWVyZ2VAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODE4CiAgICAvLyBsb2dnZWRBc3NlcnQoIWV4aXN0cyB8fCAoZ2V0Qnl0ZShzdG9yZWQsIFBGbGFncykgJiBQb2xpY3lMb2NrZWQpID09PSAwLCBlcnJMb2NrZWQpCiAgICBibnogc2V0UG9saWN5X2FmdGVyX2Fzc2VydEAxMAogICAgYnl0ZWMgMTAgLy8gIkVSUjplcnJDdkxrIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckN2TGsKCnNldFBvbGljeV9hZnRlcl9hc3NlcnRAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMDgKICAgIC8vIHJldHVybiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcy5taW5CYWxhbmNlCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RNaW5CYWxhbmNlCiAgICBzd2FwCiAgICBjb3ZlciAyCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODIxCiAgICAvLyBjb25zdCBvbGQgPSBleGlzdHMgPyB0aGlzLnBvbGljeVNldHMoc3RvcmVkKSA6IChbQnl0ZXMuZnJvbUhleCgnMDAnKSwgQnl0ZXMuZnJvbUhleCgnMDAnKV0gYXMgW2J5dGVzLCBieXRlc10pCiAgICB1bmNvdmVyIDIKICAgIGJ6IHNldFBvbGljeV90ZXJuYXJ5X2ZhbHNlQDEyCiAgICBjYWxsc3ViIHBvbGljeVNldHMKCnNldFBvbGljeV90ZXJuYXJ5X21lcmdlQDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo4MjIKICAgIC8vIGNvbnN0IG5leHQgPSB0aGlzLnBvbGljeVNldHMoQnl0ZXMuZnJvbUhleCgnMDEnKS5jb25jYXQoQnl0ZXMuZnJvbUhleCgnMDAnKSkuY29uY2F0KGl0b2IoMCkpLmNvbmNhdChzZXRzKSkKICAgIHB1c2hieXRlcyAweDAxMDAwMDAwMDAwMDAwMDAwMDAwCiAgICB1bmNvdmVyIDMKICAgIGR1cAogICAgY292ZXIgMgogICAgY29uY2F0CiAgICBjYWxsc3ViIHBvbGljeVNldHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODIzCiAgICAvLyBjb25zdCBmaXJzdCA9IHRoaXMuc3luY01ldGFSb290KE1ldGFUYWdDb2xsZWN0aWJsZSwgbmFtZSwgb2xkWzBdLCBuZXh0WzBdKQogICAgdW5jb3ZlciAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgZGlnIDEKICAgIGludGNfMiAvLyAyCiAgICBleHRyYWN0X3VpbnQxNgogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgZGlnIDIKICAgIHN1YnN0cmluZzMKICAgIGV4dHJhY3QgMiAwCiAgICBkaWcgMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgNAogICAgaW50Y18yIC8vIDIKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgNQogICAgdW5jb3ZlciAyCiAgICBkaWcgMgogICAgc3Vic3RyaW5nMwogICAgZXh0cmFjdCAyIDAKICAgIGJ5dGVjIDIxIC8vICJjIgogICAgZnJhbWVfZGlnIC00CiAgICB1bmNvdmVyIDQKICAgIHVuY292ZXIgMwogICAgY2FsbHN1YiBzeW5jTWV0YVJvb3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODI0CiAgICAvLyBjb25zdCBzZWNvbmQgPSB0aGlzLnN5bmNNZXRhUm9vdChNZXRhVGFnSG9sZGVyLCBuYW1lLCBvbGRbMV0sIG5leHRbMV0pCiAgICBkaWcgMwogICAgbGVuCiAgICB1bmNvdmVyIDQKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciAyCiAgICBzdWJzdHJpbmczCiAgICBleHRyYWN0IDIgMAogICAgZGlnIDMKICAgIGxlbgogICAgdW5jb3ZlciA0CiAgICB1bmNvdmVyIDQKICAgIHVuY292ZXIgMgogICAgc3Vic3RyaW5nMwogICAgZXh0cmFjdCAyIDAKICAgIGJ5dGVjIDIwIC8vICJoIgogICAgZnJhbWVfZGlnIC00CiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMwogICAgY2FsbHN1YiBzeW5jTWV0YVJvb3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODI1CiAgICAvLyBjb25zdCByZXZpc2lvbiA9IHRoaXMubmV4dFJldmlzaW9uKCkKICAgIGNhbGxzdWIgbmV4dFJldmlzaW9uCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgyNgogICAgLy8gY29uc3QgdmFsdWUgPSBCeXRlcy5mcm9tSGV4KCcwMScpLmNvbmNhdChpdG9iKGZsYWdzKS5zbGljZSg3LCA4KSkuY29uY2F0KGl0b2IocmV2aXNpb24pKS5jb25jYXQoc2V0cykKICAgIGZyYW1lX2RpZyAtMQogICAgaXRvYgogICAgc3Vic3RyaW5nIDcgOAogICAgYnl0ZWMgOCAvLyAweDAxCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0b2IKICAgIHN3YXAKICAgIGRpZyAxCiAgICBjb25jYXQKICAgIHVuY292ZXIgNAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgyNwogICAgLy8gdGhpcy5wdXRCb3gobmFtZSwgdmFsdWUpCiAgICBmcmFtZV9kaWcgLTQKICAgIHN3YXAKICAgIGNhbGxzdWIgcHV0Qm94CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgyOAogICAgLy8gY29uc3QgbWJyID0gdGhpcy5zZXR0bGUoYmVmb3JlLCB7IHBhaWQ6IGZpcnN0LnBhaWQgKyBzZWNvbmQucGFpZCwgcmVmdW5kZWQ6IGZpcnN0LnJlZnVuZGVkICsgc2Vjb25kLnJlZnVuZGVkIH0sIFR4bi5zZW5kZXIpCiAgICBkaWcgMgogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBkaWcgMgogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICArCiAgICB1bmNvdmVyIDMKICAgIGludGNfMyAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgdW5jb3ZlciAzCiAgICBpbnRjXzMgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgICsKICAgIHN3YXAKICAgIGl0b2IKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgdHhuIFNlbmRlcgogICAgdW5jb3ZlciAzCiAgICBjb3ZlciAyCiAgICBjYWxsc3ViIHNldHRsZQogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgyOQogICAgLy8gcmV0dXJuIHsgcmV2aXNpb24sIGNoYW5nZWQ6IHRydWUsIG1iciB9CiAgICBzd2FwCiAgICBieXRlY18zIC8vIDB4ODAKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKc2V0UG9saWN5X3Rlcm5hcnlfZmFsc2VAMTI6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODIxCiAgICAvLyBjb25zdCBvbGQgPSBleGlzdHMgPyB0aGlzLnBvbGljeVNldHMoc3RvcmVkKSA6IChbQnl0ZXMuZnJvbUhleCgnMDAnKSwgQnl0ZXMuZnJvbUhleCgnMDAnKV0gYXMgW2J5dGVzLCBieXRlc10pCiAgICBwdXNoYnl0ZXMgMHgwMDA0MDAwNzAwMDEwMDAwMDEwMAogICAgYiBzZXRQb2xpY3lfdGVybmFyeV9tZXJnZUAxMwoKc2V0UG9saWN5X2Jvb2xfZmFsc2VANzoKICAgIGludGNfMCAvLyAwCiAgICBiIHNldFBvbGljeV9ib29sX21lcmdlQDgKCgovLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMuZGVsZXRlUG9saWN5KG5hbWU6IGJ5dGVzLCBvd25lcjogYnl0ZXMsIHJlYXNvbjogdWludDY0LCByZXF1aXJlVW5sb2NrZWQ6IHVpbnQ2NCkgLT4gYnl0ZXM6CmRlbGV0ZVBvbGljeToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODMzCiAgICAvLyBwcml2YXRlIGRlbGV0ZVBvbGljeShuYW1lOiBieXRlcywgb3duZXI6IEFjY291bnQsIHJlYXNvbjogdWludDY0LCByZXF1aXJlVW5sb2NrZWQ6IGJvb2xlYW4pOiBSZW1vdmVSZXN1bHQgewogICAgcHJvdG8gNCAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgzNAogICAgLy8gY29uc3QgW3N0b3JlZCwgZXhpc3RzXSA9IG9wLkJveC5nZXQobmFtZSkKICAgIGZyYW1lX2RpZyAtNAogICAgYm94X2dldAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo4MzUKICAgIC8vIGlmICghZXhpc3RzKSB7CiAgICBibnogZGVsZXRlUG9saWN5X2FmdGVyX2lmX2Vsc2VAMgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo4MzYKICAgIC8vIHRoaXMuZXhwZWN0Tm9QYXltZW50KCkKICAgIGNhbGxzdWIgZXhwZWN0Tm9QYXltZW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgzNwogICAgLy8gcmV0dXJuIHsgcmVtb3ZlZDogZmFsc2UsIHJlYXNvbjogbmV3IFVpbnQ4KFJlbW92ZWROb25lKSwgcmVmdW5kOiAwIH0KICAgIGJ5dGVjXzIgLy8gMHgwMDAwMDAwMDAwMDAwMDAwMDAwMAogICAgc3dhcAogICAgcmV0c3ViCgpkZWxldGVQb2xpY3lfYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo4MzkKICAgIC8vIGlmIChyZXF1aXJlVW5sb2NrZWQpIGxvZ2dlZEFzc2VydCgoZ2V0Qnl0ZShzdG9yZWQsIFBGbGFncykgJiBQb2xpY3lMb2NrZWQpID09PSAwLCBlcnJMb2NrZWQpCiAgICBmcmFtZV9kaWcgLTEKICAgIGJ6IGRlbGV0ZVBvbGljeV9hZnRlcl9pZl9lbHNlQDYKICAgIGR1cAogICAgaW50Y18xIC8vIDEKICAgIGdldGJ5dGUKICAgIGludGMgNCAvLyAxMjgKICAgICYKICAgIGJ6IGRlbGV0ZVBvbGljeV9hZnRlcl9pZl9lbHNlQDYKICAgIGJ5dGVjIDEwIC8vICJFUlI6ZXJyQ3ZMayIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJDdkxrCgpkZWxldGVQb2xpY3lfYWZ0ZXJfaWZfZWxzZUA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMTA4CiAgICAvLyByZXR1cm4gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MubWluQmFsYW5jZQogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0TWluQmFsYW5jZQogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg0MQogICAgLy8gY29uc3QgZmxvdyA9IHRoaXMuZHJvcFBvbGljeVJvb3RzKG5hbWUsIHN0b3JlZCkKICAgIGZyYW1lX2RpZyAtNAogICAgdW5jb3ZlciAyCiAgICBjYWxsc3ViIGRyb3BQb2xpY3lSb290cwogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo4NDIKICAgIC8vIG9wLkJveC5kZWxldGUobmFtZSkKICAgIGZyYW1lX2RpZyAtNAogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg0MwogICAgLy8gY29uc3QgbWJyID0gdGhpcy5zZXR0bGUoYmVmb3JlLCBmbG93LCBvd25lcikKICAgIGZyYW1lX2RpZyAtMwogICAgY2FsbHN1YiBzZXR0bGUKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo4NDQKICAgIC8vIHJldHVybiB7IHJlbW92ZWQ6IHRydWUsIHJlYXNvbjogbmV3IFVpbnQ4KHJlYXNvbiksIHJlZnVuZDogbWJyLmFtb3VudCB9CiAgICBmcmFtZV9kaWcgLTIKICAgIGl0b2IKICAgIGR1cAogICAgYml0bGVuCiAgICBpbnRjXzMgLy8gOAogICAgPD0KICAgIGFzc2VydCAvLyBvdmVyZmxvdwogICAgZXh0cmFjdCA3IDEKICAgIHN3YXAKICAgIGV4dHJhY3QgMSA4CiAgICBieXRlY18zIC8vIDB4ODAKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy5kcm9wUG9saWN5Um9vdHMobmFtZTogYnl0ZXMsIHN0b3JlZDogYnl0ZXMpIC0+IGJ5dGVzOgpkcm9wUG9saWN5Um9vdHM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg0NwogICAgLy8gcHJpdmF0ZSBkcm9wUG9saWN5Um9vdHMobmFtZTogYnl0ZXMsIHN0b3JlZDogYnl0ZXMpOiBNZXRhRmxvdyB7CiAgICBwcm90byAyIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODQ4CiAgICAvLyBjb25zdCBbY29sbGVjdGlibGUsIGhvbGRlcl0gPSB0aGlzLnBvbGljeVNldHMoc3RvcmVkKQogICAgZnJhbWVfZGlnIC0xCiAgICBjYWxsc3ViIHBvbGljeVNldHMKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMQogICAgaW50Y18yIC8vIDIKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMgogICAgdW5jb3ZlciAyCiAgICBkaWcgMgogICAgc3Vic3RyaW5nMwogICAgZXh0cmFjdCAyIDAKICAgIGRpZyAyCiAgICBsZW4KICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIHN1YnN0cmluZzMKICAgIGV4dHJhY3QgMiAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg0OQogICAgLy8gY29uc3QgZmlyc3QgPSB0aGlzLnN5bmNNZXRhUm9vdChNZXRhVGFnQ29sbGVjdGlibGUsIG5hbWUsIGNvbGxlY3RpYmxlLCBCeXRlcy5mcm9tSGV4KCcwMCcpKQogICAgYnl0ZWMgMjEgLy8gImMiCiAgICBmcmFtZV9kaWcgLTIKICAgIHVuY292ZXIgMwogICAgYnl0ZWMgNCAvLyAweDAwCiAgICBjYWxsc3ViIHN5bmNNZXRhUm9vdAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo4NTAKICAgIC8vIGNvbnN0IHNlY29uZCA9IHRoaXMuc3luY01ldGFSb290KE1ldGFUYWdIb2xkZXIsIG5hbWUsIGhvbGRlciwgQnl0ZXMuZnJvbUhleCgnMDAnKSkKICAgIGJ5dGVjIDIwIC8vICJoIgogICAgZnJhbWVfZGlnIC0yCiAgICB1bmNvdmVyIDMKICAgIGJ5dGVjIDQgLy8gMHgwMAogICAgY2FsbHN1YiBzeW5jTWV0YVJvb3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODUxCiAgICAvLyByZXR1cm4geyBwYWlkOiBmaXJzdC5wYWlkICsgc2Vjb25kLnBhaWQsIHJlZnVuZGVkOiBmaXJzdC5yZWZ1bmRlZCArIHNlY29uZC5yZWZ1bmRlZCB9CiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICArCiAgICB1bmNvdmVyIDIKICAgIGludGNfMyAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgdW5jb3ZlciAyCiAgICBpbnRjXzMgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgICsKICAgIHN3YXAKICAgIGl0b2IKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo6Q29sbGVjdGlibGVWYXJpYXRpb25zLmNoZWNrV3JpdGVyU2V0KHNldDogYnl0ZXMpIC0+IGJ5dGVzOgpjaGVja1dyaXRlclNldDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODU4CiAgICAvLyBwcml2YXRlIGNoZWNrV3JpdGVyU2V0KHNldDogYnl0ZXMpOiBieXRlcyB7CiAgICBwcm90byAxIDEKICAgIGJ5dGVjXzAgLy8gIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODU5CiAgICAvLyBsb2dnZWRBc3NlcnQoc2V0Lmxlbmd0aCA+PSAxLCBlcnJCYWRBcmd1bWVudCkKICAgIGZyYW1lX2RpZyAtMQogICAgbGVuCiAgICBkdXAKICAgIGJueiBjaGVja1dyaXRlclNldF9hZnRlcl9hc3NlcnRAMgogICAgYnl0ZWMgNiAvLyAiRVJSOmVyckN2QmEiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQ3ZCYQoKY2hlY2tXcml0ZXJTZXRfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg2MAogICAgLy8gY29uc3QgbW9kZSA9IGdldEJ5dGUoc2V0LCAwKQogICAgZnJhbWVfZGlnIC0xCiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Ynl0ZQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg2MQogICAgLy8gbG9nZ2VkQXNzZXJ0KG1vZGUgPD0gV3JpdGVyU2V0TWV0YSwgZXJyQmFkQXJndW1lbnQpCiAgICBwdXNoaW50IDQKICAgIDw9CiAgICBibnogY2hlY2tXcml0ZXJTZXRfYWZ0ZXJfYXNzZXJ0QDQKICAgIGJ5dGVjIDYgLy8gIkVSUjplcnJDdkJhIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckN2QmEKCmNoZWNrV3JpdGVyU2V0X2FmdGVyX2Fzc2VydEA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo4NjIKICAgIC8vIGlmIChtb2RlID09PSBXcml0ZXJTZXRBbGxvdykgewogICAgZHVwCiAgICBpbnRjXzIgLy8gMgogICAgPT0KICAgIGJ6IGNoZWNrV3JpdGVyU2V0X2FmdGVyX2lmX2Vsc2VAMTMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODYzCiAgICAvLyBsb2dnZWRBc3NlcnQoc2V0Lmxlbmd0aCA+PSAyICYmIGdldEJ5dGUoc2V0LCAxKSA+PSAxICYmIGdldEJ5dGUoc2V0LCAxKSA8PSBNYXhBbGxvd1dyaXRlcnMsIGVyckJhZEFyZ3VtZW50KQogICAgZnJhbWVfZGlnIDEKICAgIGludGNfMiAvLyAyCiAgICA+PQogICAgYnogY2hlY2tXcml0ZXJTZXRfYm9vbF9mYWxzZUA5CiAgICBmcmFtZV9kaWcgLTEKICAgIGludGNfMSAvLyAxCiAgICBnZXRieXRlCiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMAogICAgYnogY2hlY2tXcml0ZXJTZXRfYm9vbF9mYWxzZUA5CiAgICBmcmFtZV9kaWcgMAogICAgaW50Y18zIC8vIDgKICAgIDw9CiAgICBieiBjaGVja1dyaXRlclNldF9ib29sX2ZhbHNlQDkKICAgIGludGNfMSAvLyAxCgpjaGVja1dyaXRlclNldF9ib29sX21lcmdlQDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo4NjMKICAgIC8vIGxvZ2dlZEFzc2VydChzZXQubGVuZ3RoID49IDIgJiYgZ2V0Qnl0ZShzZXQsIDEpID49IDEgJiYgZ2V0Qnl0ZShzZXQsIDEpIDw9IE1heEFsbG93V3JpdGVycywgZXJyQmFkQXJndW1lbnQpCiAgICBibnogY2hlY2tXcml0ZXJTZXRfYWZ0ZXJfaWZfZWxzZUAxMwogICAgYnl0ZWMgNiAvLyAiRVJSOmVyckN2QmEiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQ3ZCYQoKY2hlY2tXcml0ZXJTZXRfYWZ0ZXJfaWZfZWxzZUAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODY1CiAgICAvLyBsb2dnZWRBc3NlcnQoc2V0Lmxlbmd0aCA9PT0gdGhpcy53cml0ZXJTZXRMZW5ndGgoc2V0KSwgZXJyQmFkQXJndW1lbnQpCiAgICBmcmFtZV9kaWcgLTEKICAgIGNhbGxzdWIgd3JpdGVyU2V0TGVuZ3RoCiAgICBmcmFtZV9kaWcgMQogICAgPT0KICAgIGJueiBjaGVja1dyaXRlclNldF9hZnRlcl9hc3NlcnRAMTUKICAgIGJ5dGVjIDYgLy8gIkVSUjplcnJDdkJhIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckN2QmEKCmNoZWNrV3JpdGVyU2V0X2FmdGVyX2Fzc2VydEAxNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODY2CiAgICAvLyBpZiAobW9kZSA9PT0gV3JpdGVyU2V0RGVsZWdhdGUpIGxvZ2dlZEFzc2VydChidG9pKHNldC5zbGljZSgxLCA5KSkgIT09IDAsIGVyckJhZEFyZ3VtZW50KQogICAgZHVwCiAgICBwdXNoaW50IDMKICAgID09CiAgICBieiBjaGVja1dyaXRlclNldF9hZnRlcl9pZl9lbHNlQDE5CiAgICBpbnRjXzEgLy8gMQogICAgZnJhbWVfZGlnIDEKICAgIGR1cAogICAgY292ZXIgMgogICAgPj0KICAgIGludGNfMSAvLyAxCiAgICBkaWcgMgogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIHB1c2hpbnQgOQogICAgZGlnIDIKICAgID49CiAgICBwdXNoaW50IDkKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIGZyYW1lX2RpZyAtMQogICAgY292ZXIgMgogICAgc3Vic3RyaW5nMwogICAgYnRvaQogICAgYm56IGNoZWNrV3JpdGVyU2V0X2FmdGVyX2lmX2Vsc2VAMTkKICAgIGJ5dGVjIDYgLy8gIkVSUjplcnJDdkJhIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckN2QmEKCmNoZWNrV3JpdGVyU2V0X2FmdGVyX2lmX2Vsc2VAMTk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg2NwogICAgLy8gaWYgKG1vZGUgPT09IFdyaXRlclNldE1ldGEpIGxvZ2dlZEFzc2VydChzZXQuc2xpY2UoMSwgMzMpICE9PSBvcC5iemVybygzMiksIGVyckJhZEFyZ3VtZW50KQogICAgcHVzaGludCA0CiAgICA9PQogICAgYnogY2hlY2tXcml0ZXJTZXRfYWZ0ZXJfaWZfZWxzZUAyMwogICAgaW50Y18xIC8vIDEKICAgIGZyYW1lX2RpZyAxCiAgICBkdXAKICAgIGNvdmVyIDIKICAgID49CiAgICBpbnRjXzEgLy8gMQogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBwdXNoaW50IDMzCiAgICBkaWcgMgogICAgPj0KICAgIHB1c2hpbnQgMzMKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIGZyYW1lX2RpZyAtMQogICAgY292ZXIgMgogICAgc3Vic3RyaW5nMwogICAgcHVzaGludCAzMgogICAgYnplcm8KICAgICE9CiAgICBibnogY2hlY2tXcml0ZXJTZXRfYWZ0ZXJfaWZfZWxzZUAyMwogICAgYnl0ZWMgNiAvLyAiRVJSOmVyckN2QmEiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQ3ZCYQoKY2hlY2tXcml0ZXJTZXRfYWZ0ZXJfaWZfZWxzZUAyMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODY4CiAgICAvLyByZXR1cm4gc2V0CiAgICBmcmFtZV9kaWcgLTEKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpjaGVja1dyaXRlclNldF9ib29sX2ZhbHNlQDk6CiAgICBpbnRjXzAgLy8gMAogICAgYiBjaGVja1dyaXRlclNldF9ib29sX21lcmdlQDEwCgoKLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo6Q29sbGVjdGlibGVWYXJpYXRpb25zLm1ldGFSb290TmFtZSh0YWc6IGJ5dGVzLCBib3hOYW1lOiBieXRlcykgLT4gYnl0ZXM6Cm1ldGFSb290TmFtZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODc0CiAgICAvLyBwcml2YXRlIG1ldGFSb290TmFtZSh0YWc6IHN0cmluZywgYm94TmFtZTogYnl0ZXMpOiBzdHJpbmcgewogICAgcHJvdG8gMiAxCiAgICBieXRlY18wIC8vICIiCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODc1CiAgICAvLyBjb25zdCBoYXNoID0gc2hhMjU2KGJveE5hbWUpLnNsaWNlKDAsIE1ldGFOYW1lSGFzaEJ5dGVzKQogICAgZnJhbWVfZGlnIC0xCiAgICBzaGEyNTYKICAgIHN1YnN0cmluZyAwIDE4CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg3NwogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IE1ldGFOYW1lSGFzaEJ5dGVzOyBpICs9IDMpIHsKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9kaWcgLTIKCm1ldGFSb290TmFtZV93aGlsZV90b3BAMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODc3CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgTWV0YU5hbWVIYXNoQnl0ZXM7IGkgKz0gMykgewogICAgZGlnIDEKICAgIHB1c2hpbnQgMTgKICAgIDwKICAgIGJ6IG1ldGFSb290TmFtZV9hZnRlcl93aGlsZUA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg3OAogICAgLy8gY29uc3QgbiA9IGJ0b2koaGFzaC5zbGljZShpLCBpICsgMykpCiAgICBkaWcgMgogICAgZHVwCiAgICBsZW4KICAgIHVuY292ZXIgMwogICAgZHVwCiAgICBjb3ZlciAyCiAgICBkaWcgMQogICAgPj0KICAgIGRpZyAyCiAgICBkaWcgMgogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIHVuY292ZXIgMgogICAgcHVzaGludCAzCiAgICArCiAgICBkdXAKICAgIGNvdmVyIDUKICAgIGR1cAogICAgZGlnIDMKICAgID49CiAgICBzd2FwCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBkdXAKICAgIGRpZyAyCiAgICA8CiAgICBkaWcgMgogICAgc3dhcAogICAgc2VsZWN0CiAgICBzdWJzdHJpbmczCiAgICBidG9pCiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODc5CiAgICAvLyBmb3IgKGxldCBzaGlmdDogdWludDY0ID0gMjQ7IHNoaWZ0ID4gMDsgc2hpZnQgLT0gNikgewogICAgcHVzaGludCAyNAogICAgZnJhbWVfYnVyeSAxCgptZXRhUm9vdE5hbWVfd2hpbGVfdG9wQDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg3OQogICAgLy8gZm9yIChsZXQgc2hpZnQ6IHVpbnQ2NCA9IDI0OyBzaGlmdCA+IDA7IHNoaWZ0IC09IDYpIHsKICAgIGZyYW1lX2RpZyAxCiAgICBieiBtZXRhUm9vdE5hbWVfd2hpbGVfdG9wQDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODgwCiAgICAvLyBjb25zdCBpbmRleDogdWludDY0ID0gKG4gPj4gKHNoaWZ0IC0gNikpICYgNjMKICAgIGZyYW1lX2RpZyAxCiAgICBwdXNoaW50IDYKICAgIC0KICAgIGR1cAogICAgZnJhbWVfYnVyeSAxCiAgICBmcmFtZV9kaWcgMAogICAgc3dhcAogICAgc2hyCiAgICBwdXNoaW50IDYzCiAgICAmCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg4MQogICAgLy8gb3V0ID0gb3V0LmNvbmNhdChCYXNlNjRVcmxBbHBoYWJldC5zbGljZShpbmRleCwgaW5kZXggKyAxKSkKICAgIGR1cAogICAgcHVzaGludCA2NAogICAgPj0KICAgIGRpZyAxCiAgICBwdXNoaW50IDY0CiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgc3dhcAogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGR1cAogICAgcHVzaGludCA2NAogICAgPj0KICAgIHB1c2hpbnQgNjQKICAgIHN3YXAKICAgIHNlbGVjdAogICAgZHVwCiAgICBkaWcgMgogICAgPAogICAgZGlnIDIKICAgIHN3YXAKICAgIHNlbGVjdAogICAgcHVzaGJ5dGVzICJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OS1fIgogICAgY292ZXIgMgogICAgc3Vic3RyaW5nMwogICAgY29uY2F0CiAgICBiIG1ldGFSb290TmFtZV93aGlsZV90b3BAMwoKbWV0YVJvb3ROYW1lX2FmdGVyX3doaWxlQDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg4NAogICAgLy8gcmV0dXJuIFN0cmluZyhvdXQpCiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy5zeW5jTWV0YVJvb3QodGFnOiBieXRlcywgYm94TmFtZTogYnl0ZXMsIGJlZm9yZTogYnl0ZXMsIGFmdGVyOiBieXRlcykgLT4gYnl0ZXM6CnN5bmNNZXRhUm9vdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODkxCiAgICAvLyBwcml2YXRlIHN5bmNNZXRhUm9vdCh0YWc6IHN0cmluZywgYm94TmFtZTogYnl0ZXMsIGJlZm9yZTogYnl0ZXMsIGFmdGVyOiBieXRlcyk6IE1ldGFGbG93IHsKICAgIHByb3RvIDQgMQogICAgaW50Y18wIC8vIDAKICAgIGJ5dGVjXzAgLy8gIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODkyCiAgICAvLyBjb25zdCB3YXNNZXRhID0gZ2V0Qnl0ZShiZWZvcmUsIDApID09PSBXcml0ZXJTZXRNZXRhCiAgICBmcmFtZV9kaWcgLTIKICAgIGludGNfMCAvLyAwCiAgICBnZXRieXRlCiAgICBwdXNoaW50IDQKICAgID09CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODkzCiAgICAvLyBjb25zdCBpc01ldGEgPSBnZXRCeXRlKGFmdGVyLCAwKSA9PT0gV3JpdGVyU2V0TWV0YQogICAgZnJhbWVfZGlnIC0xCiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Ynl0ZQogICAgcHVzaGludCA0CiAgICA9PQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo4OTQKICAgIC8vIGlmICghd2FzTWV0YSAmJiAhaXNNZXRhKSByZXR1cm4geyBwYWlkOiAwLCByZWZ1bmRlZDogMCB9CiAgICBibnogc3luY01ldGFSb290X2FmdGVyX2lmX2Vsc2VAMwogICAgZHVwCiAgICBibnogc3luY01ldGFSb290X2FmdGVyX2lmX2Vsc2VAMwogICAgYnl0ZWMgMTkgLy8gMHgwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCnN5bmNNZXRhUm9vdF9hZnRlcl9pZl9lbHNlQDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg5NQogICAgLy8gY29uc3QgbmFtZSA9IHRoaXMubWV0YVJvb3ROYW1lKHRhZywgYm94TmFtZSkKICAgIGZyYW1lX2RpZyAtNAogICAgZnJhbWVfZGlnIC0zCiAgICBjYWxsc3ViIG1ldGFSb290TmFtZQogICAgZnJhbWVfYnVyeSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg5NgogICAgLy8gY29uc3QgbWV0YSA9IEFwcGxpY2F0aW9uKHRoaXMubWV0YUFwcC52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjIwOAogICAgLy8gbWV0YUFwcCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5TWV0YUFwcCB9KQogICAgYnl0ZWMgMTcgLy8gImEiCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg5NgogICAgLy8gY29uc3QgbWV0YSA9IEFwcGxpY2F0aW9uKHRoaXMubWV0YUFwcC52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBzd2FwCiAgICBmcmFtZV9idXJ5IDEKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODk4CiAgICAvLyBpZiAod2FzTWV0YSAmJiBpc01ldGEpIHsKICAgIHN3YXAKICAgIGJ6IHN5bmNNZXRhUm9vdF9hZnRlcl9pZl9lbHNlQDkKICAgIGR1cAogICAgYnogc3luY01ldGFSb290X2FmdGVyX2lmX2Vsc2VAOQogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg5OQogICAgLy8gaWYgKGJlZm9yZSAhPT0gYWZ0ZXIpIHsKICAgIGZyYW1lX2RpZyAtMgogICAgZnJhbWVfZGlnIC0xCiAgICAhPQogICAgYnogc3luY01ldGFSb290X2FmdGVyX2lmX2Vsc2VAOAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo5MDAtOTA0CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBNZXRhLnByb3RvdHlwZS51cGRhdGVSb290Pih7CiAgICAvLyAgIGFwcElkOiBtZXRhLAogICAgLy8gICBhcmdzOiBbbmFtZSwgYWZ0ZXIuc2xpY2UoMSwgMzMpLnRvRml4ZWQoeyBsZW5ndGg6IDMyIH0pXSwKICAgIC8vICAgZmVlOiAwLAogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTAyCiAgICAvLyBhcmdzOiBbbmFtZSwgYWZ0ZXIuc2xpY2UoMSwgMzMpLnRvRml4ZWQoeyBsZW5ndGg6IDMyIH0pXSwKICAgIGZyYW1lX2RpZyAwCiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC0xCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICBkaWcgMQogICAgPj0KICAgIGludGNfMSAvLyAxCiAgICBkaWcgMgogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIHB1c2hpbnQgMzMKICAgIGRpZyAyCiAgICA+PQogICAgcHVzaGludCAzMwogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgZnJhbWVfZGlnIC0xCiAgICBjb3ZlciAyCiAgICBzdWJzdHJpbmczCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBMZW5ndGggbXVzdCBiZSAzMgogICAgZnJhbWVfZGlnIDEKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo5MDAtOTA0CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBNZXRhLnByb3RvdHlwZS51cGRhdGVSb290Pih7CiAgICAvLyAgIGFwcElkOiBtZXRhLAogICAgLy8gICBhcmdzOiBbbmFtZSwgYWZ0ZXIuc2xpY2UoMSwgMzMpLnRvRml4ZWQoeyBsZW5ndGg6IDMyIH0pXSwKICAgIC8vICAgZmVlOiAwLAogICAgLy8gfSkKICAgIHB1c2hieXRlcyAweGM2ZDNkNzA0IC8vIG1ldGhvZCAidXBkYXRlUm9vdChzdHJpbmcsYnl0ZVszMl0pdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkwMwogICAgLy8gZmVlOiAwLAogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkwMC05MDQKICAgIC8vIGFiaUNhbGw8dHlwZW9mIE1ldGEucHJvdG90eXBlLnVwZGF0ZVJvb3Q+KHsKICAgIC8vICAgYXBwSWQ6IG1ldGEsCiAgICAvLyAgIGFyZ3M6IFtuYW1lLCBhZnRlci5zbGljZSgxLCAzMykudG9GaXhlZCh7IGxlbmd0aDogMzIgfSldLAogICAgLy8gICBmZWU6IDAsCiAgICAvLyB9KQogICAgaXR4bl9zdWJtaXQKCnN5bmNNZXRhUm9vdF9hZnRlcl9pZl9lbHNlQDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkwNgogICAgLy8gcmV0dXJuIHsgcGFpZDogMCwgcmVmdW5kZWQ6IDAgfQogICAgYnl0ZWMgMTkgLy8gMHgwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCnN5bmNNZXRhUm9vdF9hZnRlcl9pZl9lbHNlQDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkwOAogICAgLy8gaWYgKGlzTWV0YSkgewogICAgYnogc3luY01ldGFSb290X2FmdGVyX2lmX2Vsc2VAMTQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTA5CiAgICAvLyBjb25zdCBjb3N0ID0gYWJpQ2FsbDx0eXBlb2YgTWV0YS5wcm90b3R5cGUucm9vdENvc3RzPih7IGFwcElkOiBtZXRhLCBhcmdzOiBbbmFtZV0sIGZlZTogMCB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgZnJhbWVfZGlnIDAKICAgIGR1cAogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgc3dhcAogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgMQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hieXRlcyAweDcyYjI1OTgxIC8vIG1ldGhvZCAicm9vdENvc3RzKHN0cmluZyl1aW50NjQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZHVwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgc3dhcAogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo5MTAtOTE5CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBNZXRhLnByb3RvdHlwZS5hZGRSb290Pih7CiAgICAvLyAgIGFwcElkOiBtZXRhLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsgcmVjZWl2ZXI6IG1ldGEuYWRkcmVzcywgYW1vdW50OiBjb3N0LCBmZWU6IDAgfSksCiAgICAvLyAgICAgbmFtZSwKICAgIC8vICAgICBhZnRlci5zbGljZSgxLCAzMykudG9GaXhlZCh7IGxlbmd0aDogMzIgfSksCiAgICAvLyAgICAgdGhpcy5tZXRhVHJlZVR5cGUudmFsdWUsCiAgICAvLyAgIF0sCiAgICAvLyAgIGZlZTogMCwKICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkxMwogICAgLy8gaXR4bi5wYXltZW50KHsgcmVjZWl2ZXI6IG1ldGEuYWRkcmVzcywgYW1vdW50OiBjb3N0LCBmZWU6IDAgfSksCiAgICBkaWcgMgogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZGlnIDEKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkxMC05MTkKICAgIC8vIGFiaUNhbGw8dHlwZW9mIE1ldGEucHJvdG90eXBlLmFkZFJvb3Q+KHsKICAgIC8vICAgYXBwSWQ6IG1ldGEsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoeyByZWNlaXZlcjogbWV0YS5hZGRyZXNzLCBhbW91bnQ6IGNvc3QsIGZlZTogMCB9KSwKICAgIC8vICAgICBuYW1lLAogICAgLy8gICAgIGFmdGVyLnNsaWNlKDEsIDMzKS50b0ZpeGVkKHsgbGVuZ3RoOiAzMiB9KSwKICAgIC8vICAgICB0aGlzLm1ldGFUcmVlVHlwZS52YWx1ZSwKICAgIC8vICAgXSwKICAgIC8vICAgZmVlOiAwLAogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo5MTUKICAgIC8vIGFmdGVyLnNsaWNlKDEsIDMzKS50b0ZpeGVkKHsgbGVuZ3RoOiAzMiB9KSwKICAgIGZyYW1lX2RpZyAtMQogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgZGlnIDEKICAgID49CiAgICBpbnRjXzEgLy8gMQogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBwdXNoaW50IDMzCiAgICBkaWcgMgogICAgPj0KICAgIHB1c2hpbnQgMzMKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIGZyYW1lX2RpZyAtMQogICAgY292ZXIgMgogICAgc3Vic3RyaW5nMwogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gTGVuZ3RoIG11c3QgYmUgMzIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTE2CiAgICAvLyB0aGlzLm1ldGFUcmVlVHlwZS52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjIxMAogICAgLy8gbWV0YVRyZWVUeXBlID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogR2xvYmFsU3RhdGVLZXlNZXRhVHJlZVR5cGUgfSkKICAgIGJ5dGVjIDE4IC8vICJ0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo5MTYKICAgIC8vIHRoaXMubWV0YVRyZWVUeXBlLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0b2IKICAgIHVuY292ZXIgNAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkxMC05MTkKICAgIC8vIGFiaUNhbGw8dHlwZW9mIE1ldGEucHJvdG90eXBlLmFkZFJvb3Q+KHsKICAgIC8vICAgYXBwSWQ6IG1ldGEsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoeyByZWNlaXZlcjogbWV0YS5hZGRyZXNzLCBhbW91bnQ6IGNvc3QsIGZlZTogMCB9KSwKICAgIC8vICAgICBuYW1lLAogICAgLy8gICAgIGFmdGVyLnNsaWNlKDEsIDMzKS50b0ZpeGVkKHsgbGVuZ3RoOiAzMiB9KSwKICAgIC8vICAgICB0aGlzLm1ldGFUcmVlVHlwZS52YWx1ZSwKICAgIC8vICAgXSwKICAgIC8vICAgZmVlOiAwLAogICAgLy8gfSkKICAgIHB1c2hieXRlcyAweGEyNGMwNjdjIC8vIG1ldGhvZCAiYWRkUm9vdChwYXksc3RyaW5nLGJ5dGVbMzJdLHVpbnQ2NCl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTE4CiAgICAvLyBmZWU6IDAsCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTEwLTkxOQogICAgLy8gYWJpQ2FsbDx0eXBlb2YgTWV0YS5wcm90b3R5cGUuYWRkUm9vdD4oewogICAgLy8gICBhcHBJZDogbWV0YSwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7IHJlY2VpdmVyOiBtZXRhLmFkZHJlc3MsIGFtb3VudDogY29zdCwgZmVlOiAwIH0pLAogICAgLy8gICAgIG5hbWUsCiAgICAvLyAgICAgYWZ0ZXIuc2xpY2UoMSwgMzMpLnRvRml4ZWQoeyBsZW5ndGg6IDMyIH0pLAogICAgLy8gICAgIHRoaXMubWV0YVRyZWVUeXBlLnZhbHVlLAogICAgLy8gICBdLAogICAgLy8gICBmZWU6IDAsCiAgICAvLyB9KQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTIwCiAgICAvLyByZXR1cm4geyBwYWlkOiBjb3N0LCByZWZ1bmRlZDogMCB9CiAgICBpdG9iCiAgICBpbnRjXzAgLy8gMAogICAgaXRvYgogICAgY29uY2F0CiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKc3luY01ldGFSb290X2FmdGVyX2lmX2Vsc2VAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkyMgogICAgLy8gY29uc3QgYmFsYW5jZUJlZm9yZSA9IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLmJhbGFuY2UKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdEJhbGFuY2UKICAgIGFzc2VydCAvLyBhY2NvdW50IGZ1bmRlZAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo5MjMKICAgIC8vIGFiaUNhbGw8dHlwZW9mIE1ldGEucHJvdG90eXBlLmRlbGV0ZVJvb3Q+KHsgYXBwSWQ6IG1ldGEsIGFyZ3M6IFtuYW1lXSwgZmVlOiAwIH0pCiAgICBpdHhuX2JlZ2luCiAgICBmcmFtZV9kaWcgMAogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAxCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hieXRlcyAweGRmMjg3YTdkIC8vIG1ldGhvZCAiZGVsZXRlUm9vdChzdHJpbmcpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTI0CiAgICAvLyByZXR1cm4geyBwYWlkOiAwLCByZWZ1bmRlZDogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MuYmFsYW5jZSAtIGJhbGFuY2VCZWZvcmUgfQogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0QmFsYW5jZQogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICBzd2FwCiAgICAtCiAgICBpbnRjXzAgLy8gMAogICAgaXRvYgogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy5waW5Tb3VyY2UoYXNzZXQ6IHVpbnQ2NCwgd3JpdGVyOiBieXRlcywgc2xvdDogYnl0ZXMsIHNvdXJjZVJldmlzaW9uOiB1aW50NjQpIC0+IGJ5dGVzOgpwaW5Tb3VyY2U6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkyOQogICAgLy8gcHJpdmF0ZSBwaW5Tb3VyY2UoYXNzZXQ6IHVpbnQ2NCwgd3JpdGVyOiBBY2NvdW50LCBzbG90OiBieXRlcywgc291cmNlUmV2aXNpb246IHVpbnQ2NCk6IGJ5dGVzIHsKICAgIHByb3RvIDQgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMDYwCiAgICAvLyByZXR1cm4gUHJlZml4VmFyaWF0aW9uLmNvbmNhdChpdG9iKGFzc2V0KSkuY29uY2F0KHdyaXRlci5ieXRlcykuY29uY2F0KHNsb3QpCiAgICBmcmFtZV9kaWcgLTQKICAgIGl0b2IKICAgIGJ5dGVjIDExIC8vICJ2IgogICAgc3dhcAogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgLTMKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC0yCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTMwCiAgICAvLyBjb25zdCBbc291cmNlLCBleGlzdHNdID0gb3AuQm94LmdldCh0aGlzLnZhcmlhdGlvbk5hbWUoYXNzZXQsIHdyaXRlciwgc2xvdCkpCiAgICBib3hfZ2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkzMQogICAgLy8gbG9nZ2VkQXNzZXJ0KGV4aXN0cywgZXJyU291cmNlTWlzc2luZykKICAgIGJueiBwaW5Tb3VyY2VfYWZ0ZXJfYXNzZXJ0QDIKICAgIHB1c2hieXRlcyAiRVJSOmVyckN2U20iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQ3ZTbQoKcGluU291cmNlX2FmdGVyX2Fzc2VydEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo5MzIKICAgIC8vIGxvZ2dlZEFzc2VydChidG9pKHNvdXJjZS5zbGljZShWUmV2aXNpb24sIFZSZXZpc2lvbiArIDgpKSA9PT0gc291cmNlUmV2aXNpb24sIGVyclNvdXJjZUNoYW5nZWQpCiAgICBkdXBuIDIKICAgIGxlbgogICAgcHVzaGludCA0CiAgICBkaWcgMQogICAgPj0KICAgIHB1c2hpbnQgNAogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBwdXNoaW50IDEyCiAgICBkaWcgMgogICAgPj0KICAgIHB1c2hpbnQgMTIKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIHN1YnN0cmluZzMKICAgIGJ0b2kKICAgIGZyYW1lX2RpZyAtMQogICAgPT0KICAgIGJueiBwaW5Tb3VyY2VfYWZ0ZXJfYXNzZXJ0QDQKICAgIHB1c2hieXRlcyAiRVJSOmVyckN2U2MiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQ3ZTYwoKcGluU291cmNlX2FmdGVyX2Fzc2VydEA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo5MzMKICAgIC8vIGxvZ2dlZEFzc2VydChleHRyYWN0VWludDE2KHNvdXJjZSwgVkZsYXRMZW4pID4gMCwgZXJyU291cmNlTm90QWxsb3dlZCkKICAgIGR1cAogICAgcHVzaGludCAxMgogICAgZXh0cmFjdF91aW50MTYKICAgIGJueiBwaW5Tb3VyY2VfYWZ0ZXJfYXNzZXJ0QDYKICAgIGJ5dGVjIDE0IC8vICJFUlI6ZXJyQ3ZTbiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJDdlNuCgpwaW5Tb3VyY2VfYWZ0ZXJfYXNzZXJ0QDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkzNAogICAgLy8gcmV0dXJuIHNvdXJjZQogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo6Q29sbGVjdGlibGVWYXJpYXRpb25zLnNvdXJjZUZsYXQoc291cmNlOiBieXRlcykgLT4gYnl0ZXM6CnNvdXJjZUZsYXQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkzNwogICAgLy8gcHJpdmF0ZSBzb3VyY2VGbGF0KHNvdXJjZTogYnl0ZXMpOiBieXRlcyB7CiAgICBwcm90byAxIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTM4CiAgICAvLyBjb25zdCBzdGFydDogdWludDY0ID0gKGdldEJ5dGUoc291cmNlLCBWRmxhZ3MpICYgRmxhZ0hvbGRlclNjb3BlKSAhPT0gMCA/IFZGbGF0SG9sZGVyIDogVkZsYXRDb2xsZWN0aWJsZQogICAgZnJhbWVfZGlnIC0xCiAgICBpbnRjXzEgLy8gMQogICAgZ2V0Ynl0ZQogICAgaW50Y18xIC8vIDEKICAgICYKICAgIHB1c2hpbnRzIDE0IDQ3CiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo5MzkKICAgIC8vIHJldHVybiBzb3VyY2Uuc2xpY2Uoc3RhcnQsIHN0YXJ0ICsgZXh0cmFjdFVpbnQxNihzb3VyY2UsIFZGbGF0TGVuKSkKICAgIGZyYW1lX2RpZyAtMQogICAgbGVuCiAgICBkdXAyCiAgICA+PQogICAgZGlnIDIKICAgIGRpZyAyCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgZnJhbWVfZGlnIC0xCiAgICBwdXNoaW50IDEyCiAgICBleHRyYWN0X3VpbnQxNgogICAgdW5jb3ZlciAzCiAgICArCiAgICBkdXAKICAgIGRpZyAzCiAgICA+PQogICAgc3dhcAogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgZHVwCiAgICBkaWcgMgogICAgPAogICAgZGlnIDIKICAgIHN3YXAKICAgIHNlbGVjdAogICAgZnJhbWVfZGlnIC0xCiAgICBjb3ZlciAyCiAgICBzdWJzdHJpbmczCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMucGluQ29yZSh3cml0ZXI6IGJ5dGVzLCBzbG90OiBieXRlcywgc291cmNlOiBieXRlcykgLT4gYnl0ZXM6CnBpbkNvcmU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk0MwogICAgLy8gcHJpdmF0ZSBwaW5Db3JlKHdyaXRlcjogQWNjb3VudCwgc2xvdDogYnl0ZXMsIHNvdXJjZTogYnl0ZXMpOiBieXRlcyB7CiAgICBwcm90byAzIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTQ1CiAgICAvLyAuY29uY2F0KGl0b2Ioc2xvdC5sZW5ndGgpLnNsaWNlKDcsIDgpKQogICAgZnJhbWVfZGlnIC0yCiAgICBsZW4KICAgIGR1cAogICAgaXRvYgogICAgc3Vic3RyaW5nIDcgOAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo5NDQtOTQ1CiAgICAvLyByZXR1cm4gd3JpdGVyLmJ5dGVzCiAgICAvLyAgIC5jb25jYXQoaXRvYihzbG90Lmxlbmd0aCkuc2xpY2UoNywgOCkpCiAgICBmcmFtZV9kaWcgLTMKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo5NDYKICAgIC8vIC5jb25jYXQoc2xvdC5jb25jYXQob3AuYnplcm8oTWF4U2xvdEJ5dGVzIC0gc2xvdC5sZW5ndGgpKSkKICAgIHB1c2hpbnQgMjMKICAgIHVuY292ZXIgMgogICAgLQogICAgYnplcm8KICAgIGZyYW1lX2RpZyAtMgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk0NC05NDYKICAgIC8vIHJldHVybiB3cml0ZXIuYnl0ZXMKICAgIC8vICAgLmNvbmNhdChpdG9iKHNsb3QubGVuZ3RoKS5zbGljZSg3LCA4KSkKICAgIC8vICAgLmNvbmNhdChzbG90LmNvbmNhdChvcC5iemVybyhNYXhTbG90Qnl0ZXMgLSBzbG90Lmxlbmd0aCkpKQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk0NwogICAgLy8gLmNvbmNhdChzb3VyY2Uuc2xpY2UoVlJldmlzaW9uLCBWUmV2aXNpb24gKyA4KSkKICAgIGZyYW1lX2RpZyAtMQogICAgbGVuCiAgICBwdXNoaW50IDQKICAgIGRpZyAxCiAgICA+PQogICAgcHVzaGludCA0CiAgICBkaWcgMgogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIHB1c2hpbnQgMTIKICAgIGRpZyAyCiAgICA+PQogICAgcHVzaGludCAxMgogICAgZGlnIDMKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBmcmFtZV9kaWcgLTEKICAgIGRpZyAyCiAgICB1bmNvdmVyIDIKICAgIHN1YnN0cmluZzMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTQ0LTk0NwogICAgLy8gcmV0dXJuIHdyaXRlci5ieXRlcwogICAgLy8gICAuY29uY2F0KGl0b2Ioc2xvdC5sZW5ndGgpLnNsaWNlKDcsIDgpKQogICAgLy8gICAuY29uY2F0KHNsb3QuY29uY2F0KG9wLmJ6ZXJvKE1heFNsb3RCeXRlcyAtIHNsb3QubGVuZ3RoKSkpCiAgICAvLyAgIC5jb25jYXQoc291cmNlLnNsaWNlKFZSZXZpc2lvbiwgVlJldmlzaW9uICsgOCkpCiAgICB1bmNvdmVyIDMKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo5NDgKICAgIC8vIC5jb25jYXQoc291cmNlLnNsaWNlKFZLaW5kLCBWS2luZCArIDEpKQogICAgaW50Y18yIC8vIDIKICAgIGRpZyAzCiAgICA+PQogICAgaW50Y18yIC8vIDIKICAgIGRpZyA0CiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgcHVzaGludCAzCiAgICBkaWcgNAogICAgPj0KICAgIHB1c2hpbnQgMwogICAgdW5jb3ZlciA1CiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgZnJhbWVfZGlnIC0xCiAgICB1bmNvdmVyIDIKICAgIGRpZyAyCiAgICBzdWJzdHJpbmczCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk0NC05NDgKICAgIC8vIHJldHVybiB3cml0ZXIuYnl0ZXMKICAgIC8vICAgLmNvbmNhdChpdG9iKHNsb3QubGVuZ3RoKS5zbGljZSg3LCA4KSkKICAgIC8vICAgLmNvbmNhdChzbG90LmNvbmNhdChvcC5iemVybyhNYXhTbG90Qnl0ZXMgLSBzbG90Lmxlbmd0aCkpKQogICAgLy8gICAuY29uY2F0KHNvdXJjZS5zbGljZShWUmV2aXNpb24sIFZSZXZpc2lvbiArIDgpKQogICAgLy8gICAuY29uY2F0KHNvdXJjZS5zbGljZShWS2luZCwgVktpbmQgKyAxKSkKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk0OQogICAgLy8gLmNvbmNhdChzb3VyY2Uuc2xpY2UoVlN1YiwgVlN1YiArIDEpKQogICAgZnJhbWVfZGlnIC0xCiAgICB1bmNvdmVyIDIKICAgIHVuY292ZXIgMwogICAgc3Vic3RyaW5nMwogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo5NDQtOTQ5CiAgICAvLyByZXR1cm4gd3JpdGVyLmJ5dGVzCiAgICAvLyAgIC5jb25jYXQoaXRvYihzbG90Lmxlbmd0aCkuc2xpY2UoNywgOCkpCiAgICAvLyAgIC5jb25jYXQoc2xvdC5jb25jYXQob3AuYnplcm8oTWF4U2xvdEJ5dGVzIC0gc2xvdC5sZW5ndGgpKSkKICAgIC8vICAgLmNvbmNhdChzb3VyY2Uuc2xpY2UoVlJldmlzaW9uLCBWUmV2aXNpb24gKyA4KSkKICAgIC8vICAgLmNvbmNhdChzb3VyY2Uuc2xpY2UoVktpbmQsIFZLaW5kICsgMSkpCiAgICAvLyAgIC5jb25jYXQoc291cmNlLnNsaWNlKFZTdWIsIFZTdWIgKyAxKSkKICAgIGNvbmNhdAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo6Q29sbGVjdGlibGVWYXJpYXRpb25zLnNlY3Rpb24obWFpbjogYnl0ZXMsIHJvbGU6IHVpbnQ2NCkgLT4gYnl0ZXM6CnNlY3Rpb246CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk1MgogICAgLy8gcHJpdmF0ZSBzZWN0aW9uKG1haW46IGJ5dGVzLCByb2xlOiB1aW50NjQpOiBieXRlcyB7CiAgICBwcm90byAyIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTUzCiAgICAvLyBjb25zdCBjcmVhdG9yTGVuID0gZXh0cmFjdFVpbnQxNihtYWluLCBNQ3JlYXRvckxlbikKICAgIGZyYW1lX2RpZyAtMgogICAgcHVzaGludCAxMQogICAgZXh0cmFjdF91aW50MTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTU0CiAgICAvLyBpZiAocm9sZSA9PT0gUm9sZUNyZWF0b3IpIHJldHVybiBtYWluLnNsaWNlKE1TZWN0aW9ucywgTVNlY3Rpb25zICsgY3JlYXRvckxlbikKICAgIGZyYW1lX2RpZyAtMQogICAgaW50Y18xIC8vIDEKICAgID09CiAgICBieiBzZWN0aW9uX2FmdGVyX2lmX2Vsc2VAMgogICAgZnJhbWVfZGlnIC0yCiAgICBsZW4KICAgIHB1c2hpbnQgMzEKICAgIGRpZyAxCiAgICA+PQogICAgcHVzaGludCAzMQogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBwdXNoaW50IDMxCiAgICB1bmNvdmVyIDMKICAgICsKICAgIGR1cAogICAgZGlnIDMKICAgID49CiAgICBzd2FwCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBkdXAKICAgIGRpZyAyCiAgICA8CiAgICBkaWcgMgogICAgc3dhcAogICAgc2VsZWN0CiAgICBmcmFtZV9kaWcgLTIKICAgIGNvdmVyIDIKICAgIHN1YnN0cmluZzMKICAgIHJldHN1YgoKc2VjdGlvbl9hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk1NQogICAgLy8gcmV0dXJuIG1haW4uc2xpY2UoTVNlY3Rpb25zICsgY3JlYXRvckxlbiwgTVNlY3Rpb25zICsgY3JlYXRvckxlbiArIGV4dHJhY3RVaW50MTYobWFpbiwgTUhvbGRlckxlbikpCiAgICBmcmFtZV9kaWcgLTIKICAgIGxlbgogICAgcHVzaGludCAzMQogICAgdW5jb3ZlciAyCiAgICArCiAgICBkdXAKICAgIGRpZyAyCiAgICA+PQogICAgZGlnIDEKICAgIGRpZyAzCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgZnJhbWVfZGlnIC0yCiAgICBwdXNoaW50IDEzCiAgICBleHRyYWN0X3VpbnQxNgogICAgdW5jb3ZlciAyCiAgICArCiAgICBkdXAKICAgIGRpZyAzCiAgICA+PQogICAgc3dhcAogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgZHVwCiAgICBkaWcgMgogICAgPAogICAgZGlnIDIKICAgIHN3YXAKICAgIHNlbGVjdAogICAgZnJhbWVfZGlnIC0yCiAgICBjb3ZlciAyCiAgICBzdWJzdHJpbmczCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMubWFpblZhbHVlKGZsYWdzOiB1aW50NjQsIGRlY2ltYWxzOiB1aW50NjQsIHJldmlzaW9uOiB1aW50NjQsIGNyZWF0b3I6IGJ5dGVzLCBob2xkZXI6IGJ5dGVzLCBjcmVhdG9yRGVwb3NpdDogdWludDY0LCBob2xkZXJEZXBvc2l0OiB1aW50NjQpIC0+IGJ5dGVzOgptYWluVmFsdWU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk1OAogICAgLy8gcHJpdmF0ZSBtYWluVmFsdWUoZmxhZ3M6IHVpbnQ2NCwgZGVjaW1hbHM6IHVpbnQ2NCwgcmV2aXNpb246IHVpbnQ2NCwgY3JlYXRvcjogYnl0ZXMsIGhvbGRlcjogYnl0ZXMsIGNyZWF0b3JEZXBvc2l0OiB1aW50NjQsIGhvbGRlckRlcG9zaXQ6IHVpbnQ2NCk6IGJ5dGVzIHsKICAgIHByb3RvIDcgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo5NjAKICAgIC8vIC5jb25jYXQoaXRvYihmbGFncykuc2xpY2UoNywgOCkpCiAgICBmcmFtZV9kaWcgLTcKICAgIGl0b2IKICAgIHN1YnN0cmluZyA3IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTU5CiAgICAvLyByZXR1cm4gQnl0ZXMuZnJvbUhleCgnMDEnKQogICAgYnl0ZWMgOCAvLyAweDAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk1OS05NjAKICAgIC8vIHJldHVybiBCeXRlcy5mcm9tSGV4KCcwMScpCiAgICAvLyAgIC5jb25jYXQoaXRvYihmbGFncykuc2xpY2UoNywgOCkpCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTYxCiAgICAvLyAuY29uY2F0KGl0b2IoZGVjaW1hbHMpLnNsaWNlKDcsIDgpKQogICAgZnJhbWVfZGlnIC02CiAgICBpdG9iCiAgICBzdWJzdHJpbmcgNyA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk1OS05NjEKICAgIC8vIHJldHVybiBCeXRlcy5mcm9tSGV4KCcwMScpCiAgICAvLyAgIC5jb25jYXQoaXRvYihmbGFncykuc2xpY2UoNywgOCkpCiAgICAvLyAgIC5jb25jYXQoaXRvYihkZWNpbWFscykuc2xpY2UoNywgOCkpCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTYyCiAgICAvLyAuY29uY2F0KGl0b2IocmV2aXNpb24pKQogICAgZnJhbWVfZGlnIC01CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk1OS05NjIKICAgIC8vIHJldHVybiBCeXRlcy5mcm9tSGV4KCcwMScpCiAgICAvLyAgIC5jb25jYXQoaXRvYihmbGFncykuc2xpY2UoNywgOCkpCiAgICAvLyAgIC5jb25jYXQoaXRvYihkZWNpbWFscykuc2xpY2UoNywgOCkpCiAgICAvLyAgIC5jb25jYXQoaXRvYihyZXZpc2lvbikpCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTYzCiAgICAvLyAuY29uY2F0KGl0b2IoY3JlYXRvci5sZW5ndGgpLnNsaWNlKDYsIDgpKQogICAgZnJhbWVfZGlnIC00CiAgICBsZW4KICAgIGl0b2IKICAgIHN1YnN0cmluZyA2IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTU5LTk2MwogICAgLy8gcmV0dXJuIEJ5dGVzLmZyb21IZXgoJzAxJykKICAgIC8vICAgLmNvbmNhdChpdG9iKGZsYWdzKS5zbGljZSg3LCA4KSkKICAgIC8vICAgLmNvbmNhdChpdG9iKGRlY2ltYWxzKS5zbGljZSg3LCA4KSkKICAgIC8vICAgLmNvbmNhdChpdG9iKHJldmlzaW9uKSkKICAgIC8vICAgLmNvbmNhdChpdG9iKGNyZWF0b3IubGVuZ3RoKS5zbGljZSg2LCA4KSkKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo5NjQKICAgIC8vIC5jb25jYXQoaXRvYihob2xkZXIubGVuZ3RoKS5zbGljZSg2LCA4KSkKICAgIGZyYW1lX2RpZyAtMwogICAgbGVuCiAgICBpdG9iCiAgICBzdWJzdHJpbmcgNiA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk1OS05NjQKICAgIC8vIHJldHVybiBCeXRlcy5mcm9tSGV4KCcwMScpCiAgICAvLyAgIC5jb25jYXQoaXRvYihmbGFncykuc2xpY2UoNywgOCkpCiAgICAvLyAgIC5jb25jYXQoaXRvYihkZWNpbWFscykuc2xpY2UoNywgOCkpCiAgICAvLyAgIC5jb25jYXQoaXRvYihyZXZpc2lvbikpCiAgICAvLyAgIC5jb25jYXQoaXRvYihjcmVhdG9yLmxlbmd0aCkuc2xpY2UoNiwgOCkpCiAgICAvLyAgIC5jb25jYXQoaXRvYihob2xkZXIubGVuZ3RoKS5zbGljZSg2LCA4KSkKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo5NjUKICAgIC8vIC5jb25jYXQoaXRvYihjcmVhdG9yRGVwb3NpdCkpCiAgICBmcmFtZV9kaWcgLTIKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTU5LTk2NQogICAgLy8gcmV0dXJuIEJ5dGVzLmZyb21IZXgoJzAxJykKICAgIC8vICAgLmNvbmNhdChpdG9iKGZsYWdzKS5zbGljZSg3LCA4KSkKICAgIC8vICAgLmNvbmNhdChpdG9iKGRlY2ltYWxzKS5zbGljZSg3LCA4KSkKICAgIC8vICAgLmNvbmNhdChpdG9iKHJldmlzaW9uKSkKICAgIC8vICAgLmNvbmNhdChpdG9iKGNyZWF0b3IubGVuZ3RoKS5zbGljZSg2LCA4KSkKICAgIC8vICAgLmNvbmNhdChpdG9iKGhvbGRlci5sZW5ndGgpLnNsaWNlKDYsIDgpKQogICAgLy8gICAuY29uY2F0KGl0b2IoY3JlYXRvckRlcG9zaXQpKQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk2NgogICAgLy8gLmNvbmNhdChpdG9iKGhvbGRlckRlcG9zaXQpKQogICAgZnJhbWVfZGlnIC0xCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk1OS05NjYKICAgIC8vIHJldHVybiBCeXRlcy5mcm9tSGV4KCcwMScpCiAgICAvLyAgIC5jb25jYXQoaXRvYihmbGFncykuc2xpY2UoNywgOCkpCiAgICAvLyAgIC5jb25jYXQoaXRvYihkZWNpbWFscykuc2xpY2UoNywgOCkpCiAgICAvLyAgIC5jb25jYXQoaXRvYihyZXZpc2lvbikpCiAgICAvLyAgIC5jb25jYXQoaXRvYihjcmVhdG9yLmxlbmd0aCkuc2xpY2UoNiwgOCkpCiAgICAvLyAgIC5jb25jYXQoaXRvYihob2xkZXIubGVuZ3RoKS5zbGljZSg2LCA4KSkKICAgIC8vICAgLmNvbmNhdChpdG9iKGNyZWF0b3JEZXBvc2l0KSkKICAgIC8vICAgLmNvbmNhdChpdG9iKGhvbGRlckRlcG9zaXQpKQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk1OS05NjcKICAgIC8vIHJldHVybiBCeXRlcy5mcm9tSGV4KCcwMScpCiAgICAvLyAgIC5jb25jYXQoaXRvYihmbGFncykuc2xpY2UoNywgOCkpCiAgICAvLyAgIC5jb25jYXQoaXRvYihkZWNpbWFscykuc2xpY2UoNywgOCkpCiAgICAvLyAgIC5jb25jYXQoaXRvYihyZXZpc2lvbikpCiAgICAvLyAgIC5jb25jYXQoaXRvYihjcmVhdG9yLmxlbmd0aCkuc2xpY2UoNiwgOCkpCiAgICAvLyAgIC5jb25jYXQoaXRvYihob2xkZXIubGVuZ3RoKS5zbGljZSg2LCA4KSkKICAgIC8vICAgLmNvbmNhdChpdG9iKGNyZWF0b3JEZXBvc2l0KSkKICAgIC8vICAgLmNvbmNhdChpdG9iKGhvbGRlckRlcG9zaXQpKQogICAgLy8gICAuY29uY2F0KGNyZWF0b3IpCiAgICBmcmFtZV9kaWcgLTQKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo5NTktOTY4CiAgICAvLyByZXR1cm4gQnl0ZXMuZnJvbUhleCgnMDEnKQogICAgLy8gICAuY29uY2F0KGl0b2IoZmxhZ3MpLnNsaWNlKDcsIDgpKQogICAgLy8gICAuY29uY2F0KGl0b2IoZGVjaW1hbHMpLnNsaWNlKDcsIDgpKQogICAgLy8gICAuY29uY2F0KGl0b2IocmV2aXNpb24pKQogICAgLy8gICAuY29uY2F0KGl0b2IoY3JlYXRvci5sZW5ndGgpLnNsaWNlKDYsIDgpKQogICAgLy8gICAuY29uY2F0KGl0b2IoaG9sZGVyLmxlbmd0aCkuc2xpY2UoNiwgOCkpCiAgICAvLyAgIC5jb25jYXQoaXRvYihjcmVhdG9yRGVwb3NpdCkpCiAgICAvLyAgIC5jb25jYXQoaXRvYihob2xkZXJEZXBvc2l0KSkKICAgIC8vICAgLmNvbmNhdChjcmVhdG9yKQogICAgLy8gICAuY29uY2F0KGhvbGRlcikKICAgIGZyYW1lX2RpZyAtMwogICAgY29uY2F0CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMud3JpdGVTZWN0aW9uKGFzc2V0OiB1aW50NjQsIHJvbGU6IHVpbnQ2NCwgc2VjdGlvbjogYnl0ZXMsIGZsYWdzOiB1aW50NjQsIGRlY2ltYWxzOiB1aW50NjQsIG93bmVyOiBieXRlcykgLT4gYnl0ZXM6CndyaXRlU2VjdGlvbjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTc2CiAgICAvLyBwcml2YXRlIHdyaXRlU2VjdGlvbihhc3NldDogdWludDY0LCByb2xlOiB1aW50NjQsIHNlY3Rpb246IGJ5dGVzLCBmbGFnczogdWludDY0LCBkZWNpbWFsczogdWludDY0LCBvd25lcjogQWNjb3VudCk6IFdyaXRlUmVzdWx0IHsKICAgIHByb3RvIDYgMQogICAgaW50Y18wIC8vIDAKICAgIGJ5dGVjXzAgLy8gIiIKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMDY0CiAgICAvLyByZXR1cm4gUHJlZml4TWFpbi5jb25jYXQoaXRvYihhc3NldCkpCiAgICBmcmFtZV9kaWcgLTYKICAgIGl0b2IKICAgIGJ5dGVjIDUgLy8gIm0iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo5NzgKICAgIC8vIGNvbnN0IFttYWluLCBleGlzdHNdID0gb3AuQm94LmdldChuYW1lKQogICAgYm94X2dldAogICAgc3dhcAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo5NzkKICAgIC8vIGxldCBjcmVhdG9yU2VjdGlvbiA9IEJ5dGVzKCcnKQogICAgYnl0ZWNfMCAvLyAiIgogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo5ODAKICAgIC8vIGxldCBob2xkZXJTZWN0aW9uID0gQnl0ZXMoJycpCiAgICBieXRlY18wIC8vICIiCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk4MQogICAgLy8gbGV0IGNyZWF0b3JEZXBvc2l0OiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo5ODIKICAgIC8vIGxldCBob2xkZXJEZXBvc2l0OiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo5ODMKICAgIC8vIGlmIChleGlzdHMpIHsKICAgIGJ6IHdyaXRlU2VjdGlvbl9hZnRlcl9pZl9lbHNlQDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTg0CiAgICAvLyBjcmVhdG9yU2VjdGlvbiA9IHRoaXMuc2VjdGlvbihtYWluLCBSb2xlQ3JlYXRvcikKICAgIGZyYW1lX2RpZyAzCiAgICBkdXAKICAgIGludGNfMSAvLyAxCiAgICBjYWxsc3ViIHNlY3Rpb24KICAgIGZyYW1lX2J1cnkgNAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo5ODUKICAgIC8vIGhvbGRlclNlY3Rpb24gPSB0aGlzLnNlY3Rpb24obWFpbiwgUm9sZUhvbGRlcikKICAgIGR1cAogICAgaW50Y18yIC8vIDIKICAgIGNhbGxzdWIgc2VjdGlvbgogICAgZnJhbWVfYnVyeSA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk4NgogICAgLy8gY3JlYXRvckRlcG9zaXQgPSBidG9pKG1haW4uc2xpY2UoTUNyZWF0b3JEZXBvc2l0LCBNQ3JlYXRvckRlcG9zaXQgKyA4KSkKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDE1CiAgICBkaWcgMQogICAgPj0KICAgIHB1c2hpbnQgMTUKICAgIGRpZyAyCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgcHVzaGludCAyMwogICAgZGlnIDIKICAgID49CiAgICBwdXNoaW50IDIzCiAgICBkaWcgMwogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIGRpZyAzCiAgICB1bmNvdmVyIDIKICAgIGRpZyAyCiAgICBzdWJzdHJpbmczCiAgICBidG9pCiAgICBmcmFtZV9idXJ5IDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTg3CiAgICAvLyBob2xkZXJEZXBvc2l0ID0gYnRvaShtYWluLnNsaWNlKE1Ib2xkZXJEZXBvc2l0LCBNSG9sZGVyRGVwb3NpdCArIDgpKQogICAgcHVzaGludCAzMQogICAgZGlnIDIKICAgID49CiAgICBwdXNoaW50IDMxCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBzdWJzdHJpbmczCiAgICBidG9pCiAgICBmcmFtZV9idXJ5IDcKCndyaXRlU2VjdGlvbl9hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk4OQogICAgLy8gY29uc3Qgc3RvcmVkOiB1aW50NjQgPSByb2xlID09PSBSb2xlQ3JlYXRvciA/IGNyZWF0b3JEZXBvc2l0IDogaG9sZGVyRGVwb3NpdAogICAgZnJhbWVfZGlnIC01CiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGR1cAogICAgZnJhbWVfZGlnIDcKICAgIGZyYW1lX2RpZyA2CiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo5OTEKICAgIC8vIGlmIChyb2xlID09PSBSb2xlSG9sZGVyICYmIGhvbGRlclNlY3Rpb24ubGVuZ3RoID4gMCkgcHJldmlvdXNPd25lciA9IEFjY291bnQoaG9sZGVyU2VjdGlvbi5zbGljZSgwLCAzMikpCiAgICBmcmFtZV9kaWcgLTUKICAgIGludGNfMiAvLyAyCiAgICA9PQogICAgYm56IHdyaXRlU2VjdGlvbl9hbmRfY29udGRAMwogICAgZnJhbWVfZGlnIC0xCgp3cml0ZVNlY3Rpb25fYWZ0ZXJfaWZfZWxzZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo5OTIKICAgIC8vIGlmIChyb2xlID09PSBSb2xlQ3JlYXRvcikgewogICAgZGlnIDIKICAgIGJ6IHdyaXRlU2VjdGlvbl9lbHNlX2JvZHlANwogICAgZnJhbWVfZGlnIC00CiAgICBmcmFtZV9idXJ5IDQKCndyaXRlU2VjdGlvbl9hZnRlcl9pZl9lbHNlQDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk5OAogICAgLy8gY29uc3QgcmV2aXNpb24gPSB0aGlzLm5leHRSZXZpc2lvbigpCiAgICBjYWxsc3ViIG5leHRSZXZpc2lvbgogICAgZHVwCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMDgKICAgIC8vIHJldHVybiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcy5taW5CYWxhbmNlCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RNaW5CYWxhbmNlCiAgICBzd2FwCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGZyYW1lX2J1cnkgMgogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwMDAKICAgIC8vIHRoaXMucHV0Qm94KG5hbWUsIHRoaXMubWFpblZhbHVlKGZsYWdzLCBkZWNpbWFscywgcmV2aXNpb24sIGNyZWF0b3JTZWN0aW9uLCBob2xkZXJTZWN0aW9uLCBjcmVhdG9yRGVwb3NpdCwgaG9sZGVyRGVwb3NpdCkpCiAgICBmcmFtZV9kaWcgLTMKICAgIGZyYW1lX2RpZyAtMgogICAgdW5jb3ZlciAyCiAgICBmcmFtZV9kaWcgNAogICAgZnJhbWVfZGlnIDUKICAgIGZyYW1lX2RpZyA2CiAgICBmcmFtZV9kaWcgNwogICAgY2FsbHN1YiBtYWluVmFsdWUKICAgIHVuY292ZXIgNgogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgcHV0Qm94CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMDgKICAgIC8vIHJldHVybiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcy5taW5CYWxhbmNlCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RNaW5CYWxhbmNlCiAgICBzd2FwCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGZyYW1lX2J1cnkgMQogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwMDIKICAgIC8vIGNvbnN0IGRlcG9zaXQ6IHVpbnQ2NCA9IHN0b3JlZCArIGFmdGVyIC0gYmVmb3JlCiAgICBkaWcgNAogICAgKwogICAgdW5jb3ZlciAyCiAgICAtCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAwMwogICAgLy8gb3AuQm94LnJlcGxhY2UobmFtZSwgcm9sZSA9PT0gUm9sZUNyZWF0b3IgPyBNQ3JlYXRvckRlcG9zaXQgOiBNSG9sZGVyRGVwb3NpdCwgaXRvYihkZXBvc2l0KSkKICAgIHB1c2hpbnRzIDIzIDE1CiAgICB1bmNvdmVyIDgKICAgIHNlbGVjdAogICAgc3dhcAogICAgaXRvYgogICAgZHVwCiAgICBjb3ZlciA0CiAgICBib3hfcmVwbGFjZQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMTEyCiAgICAvLyByZXR1cm4geyBzaWduOiBuZXcgVWludDgoTWJyTnVsbCksIGFtb3VudDogMCB9CiAgICBieXRlYyAyOCAvLyAweDAwMDAwMDAwMDAwMDAwMDAwMAogICAgZnJhbWVfYnVyeSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwMDYKICAgIC8vIGlmIChwcmV2aW91c093bmVyICE9PSBvd25lcikgewogICAgZHVwCiAgICBmcmFtZV9kaWcgLTEKICAgICE9CiAgICBieiB3cml0ZVNlY3Rpb25fZWxzZV9ib2R5QDEwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwMDcKICAgIC8vIHRoaXMucmVmdW5kKHByZXZpb3VzT3duZXIsIHN0b3JlZCkKICAgIHVuY292ZXIgMwogICAgY2FsbHN1YiByZWZ1bmQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAwOAogICAgLy8gdGhpcy5leHBlY3RQYXltZW50KGRlcG9zaXQpCiAgICBzd2FwCiAgICBjYWxsc3ViIGV4cGVjdFBheW1lbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAwOQogICAgLy8gbWJyID0geyBzaWduOiBuZXcgVWludDgoTWJyUG9zaXRpdmUpLCBhbW91bnQ6IGRlcG9zaXQgfQogICAgYnl0ZWMgOCAvLyAweDAxCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGZyYW1lX2J1cnkgMAoKd3JpdGVTZWN0aW9uX2FmdGVyX2lmX2Vsc2VAMTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwMjAKICAgIC8vIHRoaXMuZW1pdE1haW4oYXNzZXQsIHJldmlzaW9uLCByb2xlLCBmYWxzZSkKICAgIGZyYW1lX2RpZyAtNgogICAgZGlnIDEKICAgIGZyYW1lX2RpZyAtNQogICAgaW50Y18wIC8vIDAKICAgIGNhbGxzdWIgZW1pdE1haW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAyMQogICAgLy8gcmV0dXJuIHsgcmV2aXNpb24sIGNoYW5nZWQ6IHRydWUsIG1iciB9CiAgICBpdG9iCiAgICBieXRlY18zIC8vIDB4ODAKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIDAKICAgIGNvbmNhdAogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCndyaXRlU2VjdGlvbl9lbHNlX2JvZHlAMTA6CiAgICBwb3BuIDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAxMAogICAgLy8gfSBlbHNlIGlmIChhZnRlciA+IGJlZm9yZSkgewogICAgZnJhbWVfZGlnIDEKICAgIGZyYW1lX2RpZyAyCiAgICA+CiAgICBieiB3cml0ZVNlY3Rpb25fZWxzZV9ib2R5QDEyCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwMTEKICAgIC8vIHRoaXMuZXhwZWN0UGF5bWVudChhZnRlciAtIGJlZm9yZSkKICAgIGZyYW1lX2RpZyAxCiAgICBmcmFtZV9kaWcgMgogICAgLQogICAgZHVwCiAgICBjYWxsc3ViIGV4cGVjdFBheW1lbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAxMgogICAgLy8gbWJyID0geyBzaWduOiBuZXcgVWludDgoTWJyUG9zaXRpdmUpLCBhbW91bnQ6IGFmdGVyIC0gYmVmb3JlIH0KICAgIGl0b2IKICAgIGJ5dGVjIDggLy8gMHgwMQogICAgc3dhcAogICAgY29uY2F0CiAgICBmcmFtZV9idXJ5IDAKICAgIGIgd3JpdGVTZWN0aW9uX2FmdGVyX2lmX2Vsc2VAMTYKCndyaXRlU2VjdGlvbl9lbHNlX2JvZHlAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwMTQKICAgIC8vIHRoaXMuZXhwZWN0Tm9QYXltZW50KCkKICAgIGNhbGxzdWIgZXhwZWN0Tm9QYXltZW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwMTUKICAgIC8vIGlmIChiZWZvcmUgPiBhZnRlcikgewogICAgZnJhbWVfZGlnIDIKICAgIGZyYW1lX2RpZyAxCiAgICA+CiAgICBieiB3cml0ZVNlY3Rpb25fYWZ0ZXJfaWZfZWxzZUAxNgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMDE2CiAgICAvLyB0aGlzLnJlZnVuZChvd25lciwgYmVmb3JlIC0gYWZ0ZXIpCiAgICBmcmFtZV9kaWcgMgogICAgZnJhbWVfZGlnIDEKICAgIC0KICAgIGZyYW1lX2RpZyAtMQogICAgZGlnIDEKICAgIGNhbGxzdWIgcmVmdW5kCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwMTcKICAgIC8vIG1iciA9IHsgc2lnbjogbmV3IFVpbnQ4KE1ick5lZ2F0aXZlKSwgYW1vdW50OiBiZWZvcmUgLSBhZnRlciB9CiAgICBpdG9iCiAgICBwdXNoYnl0ZXMgMHhmZgogICAgc3dhcAogICAgY29uY2F0CiAgICBmcmFtZV9idXJ5IDAKICAgIGIgd3JpdGVTZWN0aW9uX2FmdGVyX2lmX2Vsc2VAMTYKCndyaXRlU2VjdGlvbl9lbHNlX2JvZHlANzoKICAgIGZyYW1lX2RpZyAtNAogICAgZnJhbWVfYnVyeSA1CiAgICBiIHdyaXRlU2VjdGlvbl9hZnRlcl9pZl9lbHNlQDgKCndyaXRlU2VjdGlvbl9hbmRfY29udGRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTkxCiAgICAvLyBpZiAocm9sZSA9PT0gUm9sZUhvbGRlciAmJiBob2xkZXJTZWN0aW9uLmxlbmd0aCA+IDApIHByZXZpb3VzT3duZXIgPSBBY2NvdW50KGhvbGRlclNlY3Rpb24uc2xpY2UoMCwgMzIpKQogICAgZnJhbWVfZGlnIDUKICAgIGxlbgogICAgZHVwCiAgICBibnogd3JpdGVTZWN0aW9uX2lmX2JvZHlANAogICAgcG9wCiAgICBmcmFtZV9kaWcgLTEKICAgIGIgd3JpdGVTZWN0aW9uX2FmdGVyX2lmX2Vsc2VANQoKd3JpdGVTZWN0aW9uX2lmX2JvZHlANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTkxCiAgICAvLyBpZiAocm9sZSA9PT0gUm9sZUhvbGRlciAmJiBob2xkZXJTZWN0aW9uLmxlbmd0aCA+IDApIHByZXZpb3VzT3duZXIgPSBBY2NvdW50KGhvbGRlclNlY3Rpb24uc2xpY2UoMCwgMzIpKQogICAgaW50Y18wIC8vIDAKICAgIGRpZyAxCiAgICA+PQogICAgaW50Y18wIC8vIDAKICAgIGRpZyAyCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgcHVzaGludCAzMgogICAgZGlnIDIKICAgID49CiAgICBwdXNoaW50IDMyCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBmcmFtZV9kaWcgNQogICAgY292ZXIgMgogICAgc3Vic3RyaW5nMwogICAgYiB3cml0ZVNlY3Rpb25fYWZ0ZXJfaWZfZWxzZUA1CgoKLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo6Q29sbGVjdGlibGVWYXJpYXRpb25zLmNsZWFyU2VjdGlvbihhc3NldDogdWludDY0LCBtYWluOiBieXRlcywgcm9sZTogdWludDY0LCBvd25lcjogYnl0ZXMpIC0+IHVpbnQ2NDoKY2xlYXJTZWN0aW9uOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMDI4CiAgICAvLyBwcml2YXRlIGNsZWFyU2VjdGlvbihhc3NldDogdWludDY0LCBtYWluOiBieXRlcywgcm9sZTogdWludDY0LCBvd25lcjogQWNjb3VudCk6IHVpbnQ2NCB7CiAgICBwcm90byA0IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA2NAogICAgLy8gcmV0dXJuIFByZWZpeE1haW4uY29uY2F0KGl0b2IoYXNzZXQpKQogICAgZnJhbWVfZGlnIC00CiAgICBpdG9iCiAgICBieXRlYyA1IC8vICJtIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwMzAKICAgIC8vIGNvbnN0IG90aGVyUm9sZTogdWludDY0ID0gcm9sZSA9PT0gUm9sZUNyZWF0b3IgPyBSb2xlSG9sZGVyIDogUm9sZUNyZWF0b3IKICAgIGZyYW1lX2RpZyAtMgogICAgaW50Y18xIC8vIDEKICAgID09CiAgICBkdXAKICAgIGludGNfMSAvLyAxCiAgICBpbnRjXzIgLy8gMgogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIGR1cAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMDMxCiAgICAvLyBjb25zdCBvdGhlciA9IHRoaXMuc2VjdGlvbihtYWluLCBvdGhlclJvbGUpCiAgICBmcmFtZV9kaWcgLTMKICAgIHN3YXAKICAgIGNhbGxzdWIgc2VjdGlvbgogICAgZHVwCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwMzIKICAgIC8vIHRoaXMuZXhwZWN0Tm9QYXltZW50KCkKICAgIGNhbGxzdWIgZXhwZWN0Tm9QYXltZW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMDgKICAgIC8vIHJldHVybiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcy5taW5CYWxhbmNlCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RNaW5CYWxhbmNlCiAgICBzd2FwCiAgICBjb3ZlciAyCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAzNAogICAgLy8gaWYgKG90aGVyLmxlbmd0aCA9PT0gMCkgewogICAgbGVuCiAgICBibnogY2xlYXJTZWN0aW9uX2FmdGVyX2lmX2Vsc2VAMgogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwMzUKICAgIC8vIG9wLkJveC5kZWxldGUobmFtZSkKICAgIHN3YXAKICAgIGJveF9kZWwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMTA4CiAgICAvLyByZXR1cm4gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MubWluQmFsYW5jZQogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0TWluQmFsYW5jZQogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwMzYKICAgIC8vIGNvbnN0IHJlZnVuZDogdWludDY0ID0gYmVmb3JlIC0gdGhpcy5hcHBNaW5CYWxhbmNlKCkKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAzNwogICAgLy8gdGhpcy5yZWZ1bmQob3duZXIsIHJlZnVuZCkKICAgIGZyYW1lX2RpZyAtMQogICAgZGlnIDEKICAgIGNhbGxzdWIgcmVmdW5kCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwMzgKICAgIC8vIHRoaXMuZW1pdE1haW4oYXNzZXQsIDAsIFJvbGVOb25lLCB0cnVlKQogICAgZnJhbWVfZGlnIC00CiAgICBpbnRjXzAgLy8gMAogICAgZHVwCiAgICBpbnRjXzEgLy8gMQogICAgY2FsbHN1YiBlbWl0TWFpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMDM5CiAgICAvLyByZXR1cm4gcmVmdW5kCiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKY2xlYXJTZWN0aW9uX2FmdGVyX2lmX2Vsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA0MgogICAgLy8gYnRvaShtYWluLnNsaWNlKE1DcmVhdG9yRGVwb3NpdCwgTUNyZWF0b3JEZXBvc2l0ICsgOCkpICsgYnRvaShtYWluLnNsaWNlKE1Ib2xkZXJEZXBvc2l0LCBNSG9sZGVyRGVwb3NpdCArIDgpKQogICAgZnJhbWVfZGlnIC0zCiAgICBsZW4KICAgIHB1c2hpbnQgMTUKICAgIGRpZyAxCiAgICA+PQogICAgcHVzaGludCAxNQogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBwdXNoaW50IDIzCiAgICBkaWcgMgogICAgPj0KICAgIHB1c2hpbnQgMjMKICAgIGRpZyAzCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgZnJhbWVfZGlnIC0zCiAgICB1bmNvdmVyIDIKICAgIGRpZyAyCiAgICBzdWJzdHJpbmczCiAgICBidG9pCiAgICBwdXNoaW50IDMxCiAgICBkaWcgMwogICAgPj0KICAgIHB1c2hpbnQgMzEKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIGZyYW1lX2RpZyAtMwogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIHN1YnN0cmluZzMKICAgIGJ0b2kKICAgICsKICAgIGNvdmVyIDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA0MwogICAgLy8gY29uc3QgcmV2aXNpb24gPSB0aGlzLm5leHRSZXZpc2lvbigpCiAgICBjYWxsc3ViIG5leHRSZXZpc2lvbgogICAgY292ZXIgNAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMDQ0CiAgICAvLyBjb25zdCBmbGFnczogdWludDY0ID0gcm9sZSA9PT0gUm9sZUNyZWF0b3IgPyAwIDogZ2V0Qnl0ZShtYWluLCBNRmxhZ3MpCiAgICBkaWcgMQogICAgYnogY2xlYXJTZWN0aW9uX3Rlcm5hcnlfZmFsc2VANAogICAgaW50Y18wIC8vIDAKCmNsZWFyU2VjdGlvbl90ZXJuYXJ5X21lcmdlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNDYtMTA0OAogICAgLy8gcm9sZSA9PT0gUm9sZUNyZWF0b3IKICAgIC8vICAgPyB0aGlzLm1haW5WYWx1ZShmbGFncywgZ2V0Qnl0ZShtYWluLCBNRGVjaW1hbHMpLCByZXZpc2lvbiwgQnl0ZXMoJycpLCBvdGhlciwgMCwgMCkKICAgIC8vICAgOiB0aGlzLm1haW5WYWx1ZShmbGFncywgZ2V0Qnl0ZShtYWluLCBNRGVjaW1hbHMpLCByZXZpc2lvbiwgb3RoZXIsIEJ5dGVzKCcnKSwgMCwgMCkKICAgIHVuY292ZXIgMgogICAgYnogY2xlYXJTZWN0aW9uX3Rlcm5hcnlfZmFsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMDQ3CiAgICAvLyA/IHRoaXMubWFpblZhbHVlKGZsYWdzLCBnZXRCeXRlKG1haW4sIE1EZWNpbWFscyksIHJldmlzaW9uLCBCeXRlcygnJyksIG90aGVyLCAwLCAwKQogICAgZnJhbWVfZGlnIC0zCiAgICBpbnRjXzIgLy8gMgogICAgZ2V0Ynl0ZQogICAgZGlnIDUKICAgIGJ5dGVjXzAgLy8gIiIKICAgIHVuY292ZXIgNgogICAgaW50Y18wIC8vIDAKICAgIGR1cAogICAgY2FsbHN1YiBtYWluVmFsdWUKCmNsZWFyU2VjdGlvbl90ZXJuYXJ5X21lcmdlQDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNDkKICAgIC8vIHRoaXMucHV0Qm94KG5hbWUsIHZhbHVlKQogICAgdW5jb3ZlciAyCiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgY2FsbHN1YiBwdXRCb3gKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTEwOAogICAgLy8gcmV0dXJuIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLm1pbkJhbGFuY2UKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdE1pbkJhbGFuY2UKICAgIGFzc2VydCAvLyBhY2NvdW50IGZ1bmRlZAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMDUwCiAgICAvLyBjb25zdCByZWZ1bmQ6IHVpbnQ2NCA9IGJlZm9yZSAtIHRoaXMuYXBwTWluQmFsYW5jZSgpCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA1MQogICAgLy8gb3AuQm94LnJlcGxhY2UobmFtZSwgb3RoZXJSb2xlID09PSBSb2xlQ3JlYXRvciA/IE1DcmVhdG9yRGVwb3NpdCA6IE1Ib2xkZXJEZXBvc2l0LCBpdG9iKHRvdGFsIC0gcmVmdW5kKSkKICAgIHVuY292ZXIgNAogICAgaW50Y18xIC8vIDEKICAgID09CiAgICBwdXNoaW50cyAyMyAxNQogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIHVuY292ZXIgNAogICAgZGlnIDIKICAgIC0KICAgIGl0b2IKICAgIHVuY292ZXIgMwogICAgY292ZXIgMgogICAgYm94X3JlcGxhY2UKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA1MgogICAgLy8gdGhpcy5yZWZ1bmQob3duZXIsIHJlZnVuZCkKICAgIGZyYW1lX2RpZyAtMQogICAgZGlnIDEKICAgIGNhbGxzdWIgcmVmdW5kCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNTMKICAgIC8vIHRoaXMuZW1pdE1haW4oYXNzZXQsIHJldmlzaW9uLCByb2xlLCB0cnVlKQogICAgZnJhbWVfZGlnIC00CiAgICB1bmNvdmVyIDIKICAgIGZyYW1lX2RpZyAtMgogICAgaW50Y18xIC8vIDEKICAgIGNhbGxzdWIgZW1pdE1haW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA1NAogICAgLy8gcmV0dXJuIHJlZnVuZAogICAgcmV0c3ViCgpjbGVhclNlY3Rpb25fdGVybmFyeV9mYWxzZUA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMDQ4CiAgICAvLyA6IHRoaXMubWFpblZhbHVlKGZsYWdzLCBnZXRCeXRlKG1haW4sIE1EZWNpbWFscyksIHJldmlzaW9uLCBvdGhlciwgQnl0ZXMoJycpLCAwLCAwKQogICAgZnJhbWVfZGlnIC0zCiAgICBpbnRjXzIgLy8gMgogICAgZ2V0Ynl0ZQogICAgZGlnIDUKICAgIHVuY292ZXIgNQogICAgYnl0ZWNfMCAvLyAiIgogICAgaW50Y18wIC8vIDAKICAgIGR1cAogICAgY2FsbHN1YiBtYWluVmFsdWUKICAgIGIgY2xlYXJTZWN0aW9uX3Rlcm5hcnlfbWVyZ2VAOAoKY2xlYXJTZWN0aW9uX3Rlcm5hcnlfZmFsc2VANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA0NAogICAgLy8gY29uc3QgZmxhZ3M6IHVpbnQ2NCA9IHJvbGUgPT09IFJvbGVDcmVhdG9yID8gMCA6IGdldEJ5dGUobWFpbiwgTUZsYWdzKQogICAgZnJhbWVfZGlnIC0zCiAgICBpbnRjXzEgLy8gMQogICAgZ2V0Ynl0ZQogICAgYiBjbGVhclNlY3Rpb25fdGVybmFyeV9tZXJnZUA1CgoKLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo6Q29sbGVjdGlibGVWYXJpYXRpb25zLnZhcmlhdGlvblZhbHVlKGZsYWdzOiB1aW50NjQsIGtpbmQ6IGJ5dGVzLCBzdWI6IGJ5dGVzLCByZXZpc2lvbjogdWludDY0LCBob2xkZXI6IGJ5dGVzLCBkZWNpbWFsczogdWludDY0LCBmbGF0OiBieXRlcywgYm9keTogYnl0ZXMpIC0+IGJ5dGVzOgp2YXJpYXRpb25WYWx1ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA2Ny0xMDc2CiAgICAvLyBwcml2YXRlIHZhcmlhdGlvblZhbHVlKAogICAgLy8gICBmbGFnczogdWludDY0LAogICAgLy8gICBraW5kOiBVaW50OCwKICAgIC8vICAgc3ViOiBVaW50OCwKICAgIC8vICAgcmV2aXNpb246IHVpbnQ2NCwKICAgIC8vICAgaG9sZGVyOiBBY2NvdW50LAogICAgLy8gICBkZWNpbWFsczogdWludDY0LAogICAgLy8gICBmbGF0OiBieXRlcywKICAgIC8vICAgYm9keTogYnl0ZXMsCiAgICAvLyApOiBieXRlcyB7CiAgICBwcm90byA4IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA3OAogICAgLy8gLmNvbmNhdChpdG9iKGZsYWdzKS5zbGljZSg3LCA4KSkKICAgIGZyYW1lX2RpZyAtOAogICAgaXRvYgogICAgc3Vic3RyaW5nIDcgOAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMDc3CiAgICAvLyBsZXQgdmFsdWUgPSBCeXRlcy5mcm9tSGV4KCcwMScpCiAgICBieXRlYyA4IC8vIDB4MDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA3Ny0xMDc4CiAgICAvLyBsZXQgdmFsdWUgPSBCeXRlcy5mcm9tSGV4KCcwMScpCiAgICAvLyAgIC5jb25jYXQoaXRvYihmbGFncykuc2xpY2UoNywgOCkpCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA3Ny0xMDc5CiAgICAvLyBsZXQgdmFsdWUgPSBCeXRlcy5mcm9tSGV4KCcwMScpCiAgICAvLyAgIC5jb25jYXQoaXRvYihmbGFncykuc2xpY2UoNywgOCkpCiAgICAvLyAgIC5jb25jYXQoa2luZC5ieXRlcykKICAgIGZyYW1lX2RpZyAtNwogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNzctMTA4MAogICAgLy8gbGV0IHZhbHVlID0gQnl0ZXMuZnJvbUhleCgnMDEnKQogICAgLy8gICAuY29uY2F0KGl0b2IoZmxhZ3MpLnNsaWNlKDcsIDgpKQogICAgLy8gICAuY29uY2F0KGtpbmQuYnl0ZXMpCiAgICAvLyAgIC5jb25jYXQoc3ViLmJ5dGVzKQogICAgZnJhbWVfZGlnIC02CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA4MQogICAgLy8gLmNvbmNhdChpdG9iKHJldmlzaW9uKSkKICAgIGZyYW1lX2RpZyAtNQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMDc3LTEwODEKICAgIC8vIGxldCB2YWx1ZSA9IEJ5dGVzLmZyb21IZXgoJzAxJykKICAgIC8vICAgLmNvbmNhdChpdG9iKGZsYWdzKS5zbGljZSg3LCA4KSkKICAgIC8vICAgLmNvbmNhdChraW5kLmJ5dGVzKQogICAgLy8gICAuY29uY2F0KHN1Yi5ieXRlcykKICAgIC8vICAgLmNvbmNhdChpdG9iKHJldmlzaW9uKSkKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMDgyCiAgICAvLyAuY29uY2F0KGl0b2IoZmxhdC5sZW5ndGgpLnNsaWNlKDYsIDgpKQogICAgZnJhbWVfZGlnIC0yCiAgICBsZW4KICAgIGl0b2IKICAgIHN1YnN0cmluZyA2IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA3Ny0xMDgyCiAgICAvLyBsZXQgdmFsdWUgPSBCeXRlcy5mcm9tSGV4KCcwMScpCiAgICAvLyAgIC5jb25jYXQoaXRvYihmbGFncykuc2xpY2UoNywgOCkpCiAgICAvLyAgIC5jb25jYXQoa2luZC5ieXRlcykKICAgIC8vICAgLmNvbmNhdChzdWIuYnl0ZXMpCiAgICAvLyAgIC5jb25jYXQoaXRvYihyZXZpc2lvbikpCiAgICAvLyAgIC5jb25jYXQoaXRvYihmbGF0Lmxlbmd0aCkuc2xpY2UoNiwgOCkpCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA4MwogICAgLy8gaWYgKChmbGFncyAmIEZsYWdIb2xkZXJTY29wZSkgIT09IDApIHsKICAgIGZyYW1lX2RpZyAtOAogICAgaW50Y18xIC8vIDEKICAgICYKICAgIGJ6IHZhcmlhdGlvblZhbHVlX2FmdGVyX2lmX2Vsc2VAMgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMDg0CiAgICAvLyB2YWx1ZSA9IHZhbHVlLmNvbmNhdChob2xkZXIuYnl0ZXMpLmNvbmNhdChpdG9iKGRlY2ltYWxzKS5zbGljZSg3LCA4KSkKICAgIGZyYW1lX2RpZyAtNAogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgLTMKICAgIGl0b2IKICAgIHN1YnN0cmluZyA3IDgKICAgIGNvbmNhdAoKdmFyaWF0aW9uVmFsdWVfYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMDg2CiAgICAvLyByZXR1cm4gdmFsdWUuY29uY2F0KGZsYXQpLmNvbmNhdChib2R5KQogICAgZnJhbWVfZGlnIC0yCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtMQogICAgY29uY2F0CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMuc3RvcmVkSG9sZGVyKHZhbHVlOiBieXRlcykgLT4gYnl0ZXM6CnN0b3JlZEhvbGRlcjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA4OQogICAgLy8gcHJpdmF0ZSBzdG9yZWRIb2xkZXIodmFsdWU6IGJ5dGVzKTogQWNjb3VudCB7CiAgICBwcm90byAxIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA5MAogICAgLy8gcmV0dXJuIEFjY291bnQodmFsdWUuc2xpY2UoVkhvbGRlciwgVkhvbGRlciArIDMyKSkKICAgIGZyYW1lX2RpZyAtMQogICAgbGVuCiAgICBwdXNoaW50IDE0CiAgICBkaWcgMQogICAgPj0KICAgIHB1c2hpbnQgMTQKICAgIGRpZyAyCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgcHVzaGludCA0NgogICAgZGlnIDIKICAgID49CiAgICBwdXNoaW50IDQ2CiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBmcmFtZV9kaWcgLTEKICAgIGNvdmVyIDIKICAgIHN1YnN0cmluZzMKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy5wdXRCb3gobmFtZTogYnl0ZXMsIHZhbHVlOiBieXRlcykgLT4gdm9pZDoKcHV0Qm94OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMDk0CiAgICAvLyBwcml2YXRlIHB1dEJveChuYW1lOiBieXRlcywgdmFsdWU6IGJ5dGVzKTogdm9pZCB7CiAgICBwcm90byAyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA5NQogICAgLy8gY29uc3QgW2xlbmd0aCwgZXhpc3RzXSA9IG9wLkJveC5sZW5ndGgobmFtZSkKICAgIGZyYW1lX2RpZyAtMgogICAgYm94X2xlbgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMDk2CiAgICAvLyBpZiAoZXhpc3RzICYmIGxlbmd0aCAhPT0gdmFsdWUubGVuZ3RoKSBvcC5Cb3guZGVsZXRlKG5hbWUpCiAgICBieiBwdXRCb3hfYWZ0ZXJfaWZfZWxzZUAzCiAgICBmcmFtZV9kaWcgLTEKICAgIGxlbgogICAgZnJhbWVfZGlnIDAKICAgICE9CiAgICBieiBwdXRCb3hfYWZ0ZXJfaWZfZWxzZUAzCiAgICBmcmFtZV9kaWcgLTIKICAgIGJveF9kZWwKICAgIHBvcAoKcHV0Qm94X2FmdGVyX2lmX2Vsc2VAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA5NwogICAgLy8gb3AuQm94LnB1dChuYW1lLCB2YWx1ZSkKICAgIGZyYW1lX2RpZyAtMgogICAgZnJhbWVfZGlnIC0xCiAgICBib3hfcHV0CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMubmV4dFJldmlzaW9uKCkgLT4gdWludDY0OgpuZXh0UmV2aXNpb246CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMDMKICAgIC8vIHRoaXMucmV2aXNpb24udmFsdWUgPSB0aGlzLnJldmlzaW9uLnZhbHVlICsgMQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjA2CiAgICAvLyByZXZpc2lvbiA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5UmV2aXNpb24sIGluaXRpYWxWYWx1ZTogMCB9KQogICAgYnl0ZWMgMTYgLy8gInIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMDMKICAgIC8vIHRoaXMucmV2aXNpb24udmFsdWUgPSB0aGlzLnJldmlzaW9uLnZhbHVlICsgMQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMSAvLyAxCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjIwNgogICAgLy8gcmV2aXNpb24gPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBHbG9iYWxTdGF0ZUtleVJldmlzaW9uLCBpbml0aWFsVmFsdWU6IDAgfSkKICAgIGJ5dGVjIDE2IC8vICJyIgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMTAzCiAgICAvLyB0aGlzLnJldmlzaW9uLnZhbHVlID0gdGhpcy5yZXZpc2lvbi52YWx1ZSArIDEKICAgIGRpZyAxCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMTA0CiAgICAvLyByZXR1cm4gdGhpcy5yZXZpc2lvbi52YWx1ZQogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czo6Q29sbGVjdGlibGVWYXJpYXRpb25zLnNldHRsZShiZWZvcmU6IHVpbnQ2NCwgZmxvdzogYnl0ZXMsIG93bmVyOiBieXRlcykgLT4gYnl0ZXMsIGJ5dGVzOgpzZXR0bGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMjAKICAgIC8vIHByaXZhdGUgc2V0dGxlKGJlZm9yZTogdWludDY0LCBmbG93OiBNZXRhRmxvdywgb3duZXI6IEFjY291bnQpOiBNYnJEZWx0YSB7CiAgICBwcm90byAzIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTEwOAogICAgLy8gcmV0dXJuIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLm1pbkJhbGFuY2UKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdE1pbkJhbGFuY2UKICAgIGFzc2VydCAvLyBhY2NvdW50IGZ1bmRlZAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMTIyCiAgICAvLyBjb25zdCBpbmZsb3c6IHVpbnQ2NCA9IGFmdGVyICsgZmxvdy5wYWlkCiAgICBmcmFtZV9kaWcgLTIKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgKwogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMjMKICAgIC8vIGNvbnN0IG91dGZsb3c6IHVpbnQ2NCA9IGJlZm9yZSArIGZsb3cucmVmdW5kZWQKICAgIGZyYW1lX2RpZyAtMgogICAgaW50Y18zIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBmcmFtZV9kaWcgLTMKICAgICsKICAgIGR1cAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMTI0CiAgICAvLyBpZiAoaW5mbG93ID4gb3V0ZmxvdykgewogICAgPgogICAgYnogc2V0dGxlX2FmdGVyX2lmX2Vsc2VAMgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMTI1CiAgICAvLyB0aGlzLmV4cGVjdFBheW1lbnQoaW5mbG93IC0gb3V0ZmxvdykKICAgIC0KICAgIGR1cAogICAgY2FsbHN1YiBleHBlY3RQYXltZW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMjYKICAgIC8vIHJldHVybiB7IHNpZ246IG5ldyBVaW50OChNYnJQb3NpdGl2ZSksIGFtb3VudDogaW5mbG93IC0gb3V0ZmxvdyB9CiAgICBpdG9iCiAgICBieXRlYyA4IC8vIDB4MDEKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC0yCiAgICByZXRzdWIKCnNldHRsZV9hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMjgKICAgIC8vIHRoaXMuZXhwZWN0Tm9QYXltZW50KCkKICAgIGNhbGxzdWIgZXhwZWN0Tm9QYXltZW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMjkKICAgIC8vIGlmIChvdXRmbG93ID4gaW5mbG93KSB7CiAgICBkdXAKICAgIGRpZyAyCiAgICA+CiAgICBieiBzZXR0bGVfYWZ0ZXJfaWZfZWxzZUA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMzAKICAgIC8vIHRoaXMucmVmdW5kKG93bmVyLCBvdXRmbG93IC0gaW5mbG93KQogICAgc3dhcAogICAgLQogICAgZnJhbWVfZGlnIC0xCiAgICBkaWcgMQogICAgY2FsbHN1YiByZWZ1bmQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTEzMQogICAgLy8gcmV0dXJuIHsgc2lnbjogbmV3IFVpbnQ4KE1ick5lZ2F0aXZlKSwgYW1vdW50OiBvdXRmbG93IC0gaW5mbG93IH0KICAgIGl0b2IKICAgIHB1c2hieXRlcyAweGZmCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtMgogICAgcmV0c3ViCgpzZXR0bGVfYWZ0ZXJfaWZfZWxzZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMTEyCiAgICAvLyByZXR1cm4geyBzaWduOiBuZXcgVWludDgoTWJyTnVsbCksIGFtb3VudDogMCB9CiAgICBieXRlYyAyOCAvLyAweDAwMDAwMDAwMDAwMDAwMDAwMAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMTMzCiAgICAvLyByZXR1cm4gdGhpcy5tYnJOb25lKCkKICAgIGZyYW1lX2RpZyAtMgogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDMKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy5leHBlY3RQYXltZW50KGFtb3VudDogdWludDY0KSAtPiB2b2lkOgpleHBlY3RQYXltZW50OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMTQxCiAgICAvLyBwcml2YXRlIGV4cGVjdFBheW1lbnQoYW1vdW50OiB1aW50NjQpOiB2b2lkIHsKICAgIHByb3RvIDEgMAogICAgYnl0ZWNfMCAvLyAiIgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExNDIKICAgIC8vIGxldCBvayA9IFR4bi5ncm91cEluZGV4ID4gMAogICAgdHhuIEdyb3VwSW5kZXgKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgID4KICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE0MwogICAgLy8gaWYgKG9rKSB7CiAgICBieiBleHBlY3RQYXltZW50X2FmdGVyX2lmX2Vsc2VAMTAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE0NAogICAgLy8gY29uc3QgaW5kZXg6IHVpbnQ2NCA9IFR4bi5ncm91cEluZGV4IC0gMQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMTQ1CiAgICAvLyBvayA9IGd0eG4uVHJhbnNhY3Rpb24oaW5kZXgpLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5QYXltZW50CiAgICBndHhucyBUeXBlRW51bQogICAgZHVwCiAgICBmcmFtZV9idXJ5IDEKICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgZHVwCiAgICBmcmFtZV9idXJ5IDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE0NgogICAgLy8gaWYgKG9rKSB7CiAgICBieiBleHBlY3RQYXltZW50X2FmdGVyX2lmX2Vsc2VAMTAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE0NwogICAgLy8gY29uc3QgcGF5bWVudCA9IGd0eG4uUGF5bWVudFR4bihpbmRleCkKICAgIGZyYW1lX2RpZyAxCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExNDkKICAgIC8vIHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzICYmCiAgICBmcmFtZV9kaWcgMAogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMTQ5LTExNTAKICAgIC8vIHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzICYmCiAgICAvLyBwYXltZW50LmFtb3VudCA9PT0gYW1vdW50ICYmCiAgICBieiBleHBlY3RQYXltZW50X2Jvb2xfZmFsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMTUwCiAgICAvLyBwYXltZW50LmFtb3VudCA9PT0gYW1vdW50ICYmCiAgICBmcmFtZV9kaWcgMAogICAgZ3R4bnMgQW1vdW50CiAgICBmcmFtZV9kaWcgLTEKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExNDktMTE1MAogICAgLy8gcGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MgJiYKICAgIC8vIHBheW1lbnQuYW1vdW50ID09PSBhbW91bnQgJiYKICAgIGJ6IGV4cGVjdFBheW1lbnRfYm9vbF9mYWxzZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExNTEKICAgIC8vIHBheW1lbnQuY2xvc2VSZW1haW5kZXJUbyA9PT0gR2xvYmFsLnplcm9BZGRyZXNzICYmCiAgICBmcmFtZV9kaWcgMAogICAgZ3R4bnMgQ2xvc2VSZW1haW5kZXJUbwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMTQ5LTExNTEKICAgIC8vIHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzICYmCiAgICAvLyBwYXltZW50LmFtb3VudCA9PT0gYW1vdW50ICYmCiAgICAvLyBwYXltZW50LmNsb3NlUmVtYWluZGVyVG8gPT09IEdsb2JhbC56ZXJvQWRkcmVzcyAmJgogICAgYnogZXhwZWN0UGF5bWVudF9ib29sX2ZhbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE1MgogICAgLy8gcGF5bWVudC5yZWtleVRvID09PSBHbG9iYWwuemVyb0FkZHJlc3MKICAgIGZyYW1lX2RpZyAwCiAgICBndHhucyBSZWtleVRvCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExNDktMTE1MgogICAgLy8gcGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MgJiYKICAgIC8vIHBheW1lbnQuYW1vdW50ID09PSBhbW91bnQgJiYKICAgIC8vIHBheW1lbnQuY2xvc2VSZW1haW5kZXJUbyA9PT0gR2xvYmFsLnplcm9BZGRyZXNzICYmCiAgICAvLyBwYXltZW50LnJla2V5VG8gPT09IEdsb2JhbC56ZXJvQWRkcmVzcwogICAgYnogZXhwZWN0UGF5bWVudF9ib29sX2ZhbHNlQDcKICAgIGludGNfMSAvLyAxCiAgICBmcmFtZV9idXJ5IDIKCmV4cGVjdFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE1NQogICAgLy8gaWYgKCFvaykgewogICAgZnJhbWVfZGlnIDIKICAgIGJueiBleHBlY3RQYXltZW50X2FmdGVyX2lmX2Vsc2VAMTIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE1NgogICAgLy8gbG9nKERlcG9zaXRMb2dQcmVmaXguY29uY2F0KGl0b2IoYW1vdW50KSkpCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0b2IKICAgIHB1c2hieXRlcyAiY3Y6ZGVwb3NpdDoiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMTU3CiAgICAvLyBsb2dnZWRFcnIoZXJyRGVwb3NpdE1pc21hdGNoKQogICAgYnl0ZWMgMjkgLy8gIkVSUjplcnJDdkRtIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckN2RG0KCmV4cGVjdFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUAxMjoKICAgIHJldHN1YgoKZXhwZWN0UGF5bWVudF9ib29sX2ZhbHNlQDc6CiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfYnVyeSAyCiAgICBiIGV4cGVjdFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUAxMAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy5leHBlY3ROb1BheW1lbnQoKSAtPiB2b2lkOgpleHBlY3ROb1BheW1lbnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExNjEKICAgIC8vIHByaXZhdGUgZXhwZWN0Tm9QYXltZW50KCk6IHZvaWQgewogICAgcHJvdG8gMCAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExNjIKICAgIC8vIGlmIChUeG4uZ3JvdXBJbmRleCA9PT0gMCkgcmV0dXJuCiAgICB0eG4gR3JvdXBJbmRleAogICAgYm56IGV4cGVjdE5vUGF5bWVudF9hZnRlcl9pZl9lbHNlQDIKICAgIHJldHN1YgoKZXhwZWN0Tm9QYXltZW50X2FmdGVyX2lmX2Vsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE2MwogICAgLy8gY29uc3QgaW5kZXg6IHVpbnQ2NCA9IFR4bi5ncm91cEluZGV4IC0gMQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE2NAogICAgLy8gaWYgKGd0eG4uVHJhbnNhY3Rpb24oaW5kZXgpLnR5cGUgIT09IFRyYW5zYWN0aW9uVHlwZS5QYXltZW50KSByZXR1cm4KICAgIGd0eG5zIFR5cGVFbnVtCiAgICBkdXAKICAgIGludGNfMSAvLyAxCiAgICAhPQogICAgYnogZXhwZWN0Tm9QYXltZW50X2FmdGVyX2lmX2Vsc2VANAogICAgcmV0c3ViCgpleHBlY3ROb1BheW1lbnRfYWZ0ZXJfaWZfZWxzZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMTY1CiAgICAvLyBsb2dnZWRBc3NlcnQoZ3R4bi5QYXltZW50VHhuKGluZGV4KS5yZWNlaXZlciAhPT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckRlcG9zaXRNaXNtYXRjaCkKICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgIT0KICAgIGJueiBleHBlY3ROb1BheW1lbnRfYWZ0ZXJfYXNzZXJ0QDYKICAgIGJ5dGVjIDI5IC8vICJFUlI6ZXJyQ3ZEbSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJDdkRtCgpleHBlY3ROb1BheW1lbnRfYWZ0ZXJfYXNzZXJ0QDY6CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMucmVmdW5kKHRvOiBieXRlcywgYW1vdW50OiB1aW50NjQpIC0+IHZvaWQ6CnJlZnVuZDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE3MgogICAgLy8gcHJpdmF0ZSByZWZ1bmQodG86IEFjY291bnQsIGFtb3VudDogdWludDY0KTogdm9pZCB7CiAgICBwcm90byAyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE3MwogICAgLy8gaWYgKGFtb3VudCA9PT0gMCkgcmV0dXJuCiAgICBmcmFtZV9kaWcgLTEKICAgIGJueiByZWZ1bmRfYWZ0ZXJfaWZfZWxzZUAyCiAgICByZXRzdWIKCnJlZnVuZF9hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExNzUKICAgIC8vIGNvbnN0IFtiYWxhbmNlXSA9IG9wLkFjY3RQYXJhbXMuYWNjdEJhbGFuY2UodG8pCiAgICBmcmFtZV9kaWcgLTIKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0QmFsYW5jZQogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExNzYKICAgIC8vIGlmIChiYWxhbmNlID09PSAwICYmIGFtb3VudCA8IEdsb2JhbC5taW5CYWxhbmNlKSByZWNlaXZlciA9IFR4bi5zZW5kZXIKICAgIGJ6IHJlZnVuZF9hbmRfY29udGRAMwogICAgZnJhbWVfZGlnIC0yCgpyZWZ1bmRfYWZ0ZXJfaWZfZWxzZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMTc3CiAgICAvLyBpdHhuLnBheW1lbnQoeyByZWNlaXZlciwgYW1vdW50LCBmZWU6IDAgfSkuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIGZyYW1lX2RpZyAtMQogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICByZXRzdWIKCnJlZnVuZF9hbmRfY29udGRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE3NgogICAgLy8gaWYgKGJhbGFuY2UgPT09IDAgJiYgYW1vdW50IDwgR2xvYmFsLm1pbkJhbGFuY2UpIHJlY2VpdmVyID0gVHhuLnNlbmRlcgogICAgZnJhbWVfZGlnIC0xCiAgICBnbG9iYWwgTWluQmFsYW5jZQogICAgPAogICAgYm56IHJlZnVuZF9pZl9ib2R5QDQKICAgIGZyYW1lX2RpZyAtMgogICAgYiByZWZ1bmRfYWZ0ZXJfaWZfZWxzZUA1CgpyZWZ1bmRfaWZfYm9keUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMTc2CiAgICAvLyBpZiAoYmFsYW5jZSA9PT0gMCAmJiBhbW91bnQgPCBHbG9iYWwubWluQmFsYW5jZSkgcmVjZWl2ZXIgPSBUeG4uc2VuZGVyCiAgICB0eG4gU2VuZGVyCiAgICBiIHJlZnVuZF9hZnRlcl9pZl9lbHNlQDUKCgovLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMuZW1pdERlbGV0ZWQoYXNzZXQ6IHVpbnQ2NCwgd3JpdGVyOiBieXRlcywgc2xvdDogYnl0ZXMsIHN0b3JlZDogYnl0ZXMsIHJlYXNvbjogdWludDY0KSAtPiB2b2lkOgplbWl0RGVsZXRlZDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE4MgogICAgLy8gcHJpdmF0ZSBlbWl0RGVsZXRlZChhc3NldDogdWludDY0LCB3cml0ZXI6IEFjY291bnQsIHNsb3Q6IGJ5dGVzLCBzdG9yZWQ6IGJ5dGVzLCByZWFzb246IHVpbnQ2NCk6IHZvaWQgewogICAgcHJvdG8gNSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExODcKICAgIC8vIGxhc3RSZXZpc2lvbjogYnRvaShzdG9yZWQuc2xpY2UoVlJldmlzaW9uLCBWUmV2aXNpb24gKyA4KSksCiAgICBmcmFtZV9kaWcgLTIKICAgIGxlbgogICAgcHVzaGludCA0CiAgICBkaWcgMQogICAgPj0KICAgIHB1c2hpbnQgNAogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBwdXNoaW50IDEyCiAgICBkaWcgMgogICAgPj0KICAgIHB1c2hpbnQgMTIKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIGZyYW1lX2RpZyAtMgogICAgY292ZXIgMgogICAgc3Vic3RyaW5nMwogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMTg4CiAgICAvLyByZWFzb246IG5ldyBVaW50OChyZWFzb24pLAogICAgZnJhbWVfZGlnIC0xCiAgICBpdG9iCiAgICBkdXAKICAgIGJpdGxlbgogICAgaW50Y18zIC8vIDgKICAgIDw9CiAgICBhc3NlcnQgLy8gb3ZlcmZsb3cKICAgIGV4dHJhY3QgNyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExODkKICAgIC8vIHJvdW5kOiBHbG9iYWwucm91bmQsCiAgICBnbG9iYWwgUm91bmQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE5MAogICAgLy8gdGltZXN0YW1wOiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMTgzLTExOTEKICAgIC8vIGVtaXQ8VmFyaWF0aW9uRGVsZXRlZD4oewogICAgLy8gICBhc3NldCwKICAgIC8vICAgd3JpdGVyLAogICAgLy8gICBzbG90LAogICAgLy8gICBsYXN0UmV2aXNpb246IGJ0b2koc3RvcmVkLnNsaWNlKFZSZXZpc2lvbiwgVlJldmlzaW9uICsgOCkpLAogICAgLy8gICByZWFzb246IG5ldyBVaW50OChyZWFzb24pLAogICAgLy8gICByb3VuZDogR2xvYmFsLnJvdW5kLAogICAgLy8gICB0aW1lc3RhbXA6IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICAvLyB9KQogICAgZnJhbWVfZGlnIC01CiAgICBpdG9iCiAgICBmcmFtZV9kaWcgLTQKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC0zCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBmcmFtZV9kaWcgLTMKICAgIGNvbmNhdAogICAgc3dhcAogICAgcHVzaGJ5dGVzIDB4MDA0MwogICAgY29uY2F0CiAgICB1bmNvdmVyIDUKICAgIGl0b2IKICAgIGNvbmNhdAogICAgdW5jb3ZlciA0CiAgICBjb25jYXQKICAgIHVuY292ZXIgMwogICAgaXRvYgogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGl0b2IKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICBwdXNoYnl0ZXMgMHhiNGE0ZWRiYiAvLyBtZXRob2QgIlZhcmlhdGlvbkRlbGV0ZWQodWludDY0LGFkZHJlc3MsYnl0ZVtdLHVpbnQ2NCx1aW50OCx1aW50NjQsdWludDY0KSIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpDb2xsZWN0aWJsZVZhcmlhdGlvbnMuZW1pdE1haW4oYXNzZXQ6IHVpbnQ2NCwgcmV2aXNpb246IHVpbnQ2NCwgcm9sZTogdWludDY0LCBjbGVhcmVkOiB1aW50NjQpIC0+IHZvaWQ6CmVtaXRNYWluOgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMTk0CiAgICAvLyBwcml2YXRlIGVtaXRNYWluKGFzc2V0OiB1aW50NjQsIHJldmlzaW9uOiB1aW50NjQsIHJvbGU6IHVpbnQ2NCwgY2xlYXJlZDogYm9vbGVhbik6IHZvaWQgewogICAgcHJvdG8gNCAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExOTgKICAgIC8vIHJvbGU6IG5ldyBVaW50OChyb2xlKSwKICAgIGZyYW1lX2RpZyAtMgogICAgaXRvYgogICAgZHVwCiAgICBiaXRsZW4KICAgIGludGNfMyAvLyA4CiAgICA8PQogICAgYXNzZXJ0IC8vIG92ZXJmbG93CiAgICBleHRyYWN0IDcgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMjAwCiAgICAvLyByb3VuZDogR2xvYmFsLnJvdW5kLAogICAgZ2xvYmFsIFJvdW5kCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMDEKICAgIC8vIHRpbWVzdGFtcDogR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE5NS0xMjAyCiAgICAvLyBlbWl0PE1haW5DaGFuZ2VkPih7CiAgICAvLyAgIGFzc2V0LAogICAgLy8gICByZXZpc2lvbiwKICAgIC8vICAgcm9sZTogbmV3IFVpbnQ4KHJvbGUpLAogICAgLy8gICBjbGVhcmVkLAogICAgLy8gICByb3VuZDogR2xvYmFsLnJvdW5kLAogICAgLy8gICB0aW1lc3RhbXA6IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICAvLyB9KQogICAgZnJhbWVfZGlnIC00CiAgICBpdG9iCiAgICBmcmFtZV9kaWcgLTMKICAgIGl0b2IKICAgIGNvbmNhdAogICAgdW5jb3ZlciAzCiAgICBjb25jYXQKICAgIGJ5dGVjIDQgLy8gMHgwMAogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2RpZyAtMQogICAgc2V0Yml0CiAgICBjb25jYXQKICAgIHVuY292ZXIgMgogICAgaXRvYgogICAgY29uY2F0CiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHB1c2hieXRlcyAweDhjYTA1YmQ5IC8vIG1ldGhvZCAiTWFpbkNoYW5nZWQodWludDY0LHVpbnQ2NCx1aW50OCxib29sLHVpbnQ2NCx1aW50NjQpIgogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6OkNvbGxlY3RpYmxlVmFyaWF0aW9ucy5lbWl0UG9saWN5KGFzc2V0OiB1aW50NjQsIG1hbmFnZXI6IGJ5dGVzLCByZXZpc2lvbjogdWludDY0LCBmbGFnczogdWludDY0LCBkZWxldGVkOiB1aW50NjQpIC0+IHZvaWQ6CmVtaXRQb2xpY3k6CiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMDUKICAgIC8vIHByaXZhdGUgZW1pdFBvbGljeShhc3NldDogdWludDY0LCBtYW5hZ2VyOiBBY2NvdW50LCByZXZpc2lvbjogdWludDY0LCBmbGFnczogdWludDY0LCBkZWxldGVkOiBib29sZWFuKTogdm9pZCB7CiAgICBwcm90byA1IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIxMAogICAgLy8gZmxhZ3M6IG5ldyBVaW50OChmbGFncyksCiAgICBmcmFtZV9kaWcgLTIKICAgIGl0b2IKICAgIGR1cAogICAgYml0bGVuCiAgICBpbnRjXzMgLy8gOAogICAgPD0KICAgIGFzc2VydCAvLyBvdmVyZmxvdwogICAgZXh0cmFjdCA3IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb2xsZWN0aWJsZS12YXJpYXRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIxMgogICAgLy8gcm91bmQ6IEdsb2JhbC5yb3VuZCwKICAgIGdsb2JhbCBSb3VuZAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbGxlY3RpYmxlLXZhcmlhdGlvbnMvY29udHJhY3QuYWxnby50czoxMjEzCiAgICAvLyB0aW1lc3RhbXA6IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29sbGVjdGlibGUtdmFyaWF0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMDYtMTIxNAogICAgLy8gZW1pdDxQb2xpY3lDaGFuZ2VkPih7CiAgICAvLyAgIGFzc2V0LAogICAgLy8gICBtYW5hZ2VyLAogICAgLy8gICByZXZpc2lvbiwKICAgIC8vICAgZmxhZ3M6IG5ldyBVaW50OChmbGFncyksCiAgICAvLyAgIGRlbGV0ZWQsCiAgICAvLyAgIHJvdW5kOiBHbG9iYWwucm91bmQsCiAgICAvLyAgIHRpbWVzdGFtcDogR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIC8vIH0pCiAgICBmcmFtZV9kaWcgLTUKICAgIGl0b2IKICAgIGZyYW1lX2RpZyAtNAogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgLTMKICAgIGl0b2IKICAgIGNvbmNhdAogICAgdW5jb3ZlciAzCiAgICBjb25jYXQKICAgIGJ5dGVjIDQgLy8gMHgwMAogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2RpZyAtMQogICAgc2V0Yml0CiAgICBjb25jYXQKICAgIHVuY292ZXIgMgogICAgaXRvYgogICAgY29uY2F0CiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHB1c2hieXRlcyAweGM3MzQ1YzQyIC8vIG1ldGhvZCAiUG9saWN5Q2hhbmdlZCh1aW50NjQsYWRkcmVzcyx1aW50NjQsdWludDgsYm9vbCx1aW50NjQsdWludDY0KSIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICByZXRzdWIK", "clear": "I3ByYWdtYSB2ZXJzaW9uIDEzCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCiNwcmFnbWEgYXV0b3NhbHQgZmFsc2UKCi8vIEBhbGdvcmFuZGZvdW5kYXRpb24vYWxnb3JhbmQtdHlwZXNjcmlwdC9iYXNlLWNvbnRyYWN0LmQudHM6OkJhc2VDb250cmFjdC5jbGVhclN0YXRlUHJvZ3JhbSgpIC0+IHVpbnQ2NDoKbWFpbjoKICAgIHB1c2hpbnQgMQogICAgcmV0dXJuCg==" }, "byteCode": { "approval": "DSAFAAECCIABJh4ABBUffHUKAAAAAAAAAAAAAAGAAQABbQtFUlI6ZXJyQ3ZCYQtFUlI6ZXJyQ3ZBbQEBAWcLRVJSOmVyckN2TGsBdgtFUlI6ZXJyQ3ZOYQtFUlI6ZXJyQ3ZOYwtFUlI6ZXJyQ3ZTbgFwAXIBYQF0EAAAAAAAAAAAAAAAAAAAAAABaAFjAVALRVJSOmVyckN2QnALRVJSOmVyckN2QnMCAAQLRVJSOmVyckN2TmgERBZZFAkAAAAAAAAAAAALRVJSOmVyckN2RG0xGEAIJxAiZzEZFEQxGEHUAYIOBAsCAYsEGzm6SwQyNSZrBKo4tL4E9zBQOwR1lppZBLIuopsE3VO1zwTGogVJBGXcmmgEs8ApWAQo/1t0BNkvvPYElQjLYTYaAI4OAEAEpAXXBwoIRQi1CUAKCQpoCrYK1wusDBQN3QCABJR5/2M2GgCOAQABADYaAUkVJRJEF0k2GgJJFSUSRBdMQTBJQSojQAgnBrAAJxFPAmcnEkxnI3YLI0MiQikiRwUoRwg2GgFJFSUSRBdJNhoCSRUlEkQXTgI2GgNJIlkkCEsBFRJEVwIATgI2GgRJTgMVgSASRDYaBUlOAxUjEkQ2GgZJTgMVIxJENhoHSRUjEkQiU04CNhoISSJZJAhLARUSRFcCAE4DNhoJSSJZJAhLARUSRFcCAE4DNhoKSRUlEkQXTgM2GgtJTgJJIllJTgaBIAskCEwVEkSIoDZJTgQiU0AIJwewAEsKMgMTSYMCDi9PAk1FFEsKF0kjEkAMSSQSQa4OI0UUQZoOSwwVSUUSQYgOSxCBFw5B+A1LBYEYDkHoDUsSQQxLCBVB1A0jQAgnBrAASwgVSUURgYAGDkGkDUsTSxAISwgVCIGAIA5BhA0jQB6AC0VSUjplcnJDdlRssABPA0DEDElFFTEASwMWSUUZJwtMUExQSwxQSUUavklOAkUYRRlB9AtLF0kVgQRLAQ+BBEsCTwJNgQxLAg+BDE8DTwJNUhdFEUsDgWlbSxVLC0sLSxRLD08FSw1LDYjWZ0UcSxVBLksbSxgSQSBGA4ikbEsNFipQKUxQsCNDSxVBWksXI1VJRQ8hBBpBQksNIxpBlApLF0mIzmdMgS5VSwRMiNo0QO4JI0AIJwqwAEGmB0sCiO4zRQRBigdLAoFpW0sKSwNPAoiQNEHoBiNACCcasAAxAEsKEkGkA0YCI0AIJwywAEsCgf///////////wESQBZLAkDCAksSFEGuAiNAHoALRVJSOmVyckN2UGawAIjWZksBgWlbSxNJTgNLCklOBUsLSwRLD08FSw1LDYiyZDIKcwFESxpPAojOZScTMQCIjmZITgMxAE8CFkmTJQ5EVwcBMgYyB0saTwRQSw9JFRZXBgJMUEyAAgBEUE8FFkxLAVBPBVBPBVBPBBZQTwMWUE8CUIAEZ2SFG0xQsCtQTFBCtwQiQq0CSxJBFksNSwMSQQgjQtMCIkLbAicJSwpQSUUavklOAkUVTEH2AkkVgQlLAQ+BCUsCTwJNTFJLA1chIEsDTIj6M0lOAkkiWUsBJFlJTgRSVwIAiPY1SSRZSwEVUlcCAExJMQCIiDhBDEYGI0LLBEsBMQCI6jdBDEYGI0LpBEsWQTIxAEsBJwlLH08DTwiIkDlOBUEMRgYjQqMFTwNJFUxPBE8CUlcCADEASwMnFE8DTwNPBojEOEhBDEYDI0LtBUsCMQBLDUsNiPw5QQxGAiNCkwYxAExOAksLSwuI1DlCsQZIJwRC2wIiQucGSwJXISBLAkyIkDFHAiJZSwEkWUlOBFJXAgBJiI4zSSJZSwEkWVJXAgBJTgIxAIicNUEURgYjQKsHJwywACNVIxpBPksESw9LB4jiLEUHSUUeMgMTQRhLHDEAEkEKRgUjQlNMSRVMTwNPAlJXAgAxAEsCJxVPA08DTwWI4DVIQQxGAiNCmQExADIDTwJPA08DSwxPBIiMN0LBASJC7QkiRRFCuQtJIQQZRRVCyQwiQoMNIkLTDSJFFEKtDiIoSTYaAUkVJRJEF0k2GgJJFSUSRBdOAjYaA0lOAhWBIBJENhoESSJZJAhLARUSRFcCAE4DiKYmSU4EIlNACCcHsABLARYnC0xQSwFQSwNQSb5MTgJAGEYFiNJfKilMULAjQ0sBI1VJIQQaRQkjGiJFCjEASwQSQZwBSwhAkgFIJEUJSwhACCcMsAAyCnMBREy8SDIKcwFECYjSXk8CSU4CSwGIhl9PA08CTwRPBEsISU4FiMRfFkmTJQ5EVwcBK0xQTBZQQs8BQVJLAUmI5FlJTwKBLlVLBkyI7CZAEEiBA0UJQr8BMQASQcsBgQRFCULZAUsFVyEgSwRMiLQqSSJZSwEkWVJXAgAjVSEEGkCVAksDSwdLB4jQJkhJRQsyAxNBuwIxAEsKEkHLAoEFRQlC2QIiNhoBSRUlEkQXSTYaAkkVJRJEF04CNhoDSU4CFYEgEkQ2GgRJIlkkCEsBFRJEVwIATgI2GgVJFSUSRBdOBDYaBkkVIxJEIlNMiJghSU4CIlNACCcHsABLBE8HTwOI3iROAklFCDIDE0GIAzEASwcSQfgCI0AIJw2wAEsESwNLBU8IiKJFSSNVIxpBCCcOsABPA08ESwKIrkdMiK5GUE4CSwMWJwVMUL5JTwJMQfYBSSNVTE8DQdYBSwEhBBlOA08CQYYBSwJLAhJBeEkjiJRISwUSQWRFAUUBRQFFAUUBiOBYSRWBA0sBD4EDSwJPAk2BC0sCD4ELTwNPAk1SFxYqUClMULAjQ0ghBBpBCCcKsABMgWlbMQBPBCNOBU4FiLpJQj9LAU4DQs8BIkxC8QEiQvcCNhoBSRUlEkQXSTYaAklOAhWBIBJENhoDSSJZJAhLARUSRFcCAE4DNhoESRUlEkQXTgSI4BxJTgUiU0AIJwewAEsEiIYfRQZB2gNLBEmBYVtMgWlbgQpMlBJBtgMjQB6AC0VSUjplcnJDdlN1sAAxAEsFgWlbSU4DSwRMiNweQAgnGrAASwJLAUsFTweIqEBJI1UjGkFaSYiEUTEAEkAIJw6wAEsFVyEgSwRMiIgiSSJZSwEkWVJXAgAjVSQaQQgnDrAAMQBPAk8FSwOI3kFQTIjcQFBLAhYnBUxQvklPAkxBdEkkiIBDSwMSQWBFAUUBRQFFAYjQU0kVgQNLAQ+BA0sCTwJNgQtLAg+BC08DTwJNUhcWKlApTFCwI0NMQSgjVTEATwQkTwRPBE8FTwWItERCNUgiQiciQrUDNhoBSRUlEkQXSTYaAkkVJRJEF04CiKQYSSJTQAgnB7AASwFJTwRPA4isHkhOAhYnBUxQvkEMSYELWUAYRgOIxlEqKUxQsCNDSSNVIQQaQQgnCrAAMQBOAiNPA4iySEwWSZMlDkRXBwErTFBMFlBCVyg2GgFJFSUSRBdJiNgWIlNACCcHsABJFicFTFC+QQxJgQ1ZQBhGAoiUUCopTFCwI0NHAiSIij9JFSJLAQ8iSwJPAk2BIEsCD4EgTwNPAk1SSU4EgQRFBkwkVUsDTIjCGEA8gQNFBCRPA4i2RksBFkmTJQ5EVwcBK0xQTBZQQqMBMQBLAxJAPScMsAAiKDYaAUkVJRJEF0k2GgJJFSUSRBdMNhoDSSJZJAhLARUSRFcCAE4CNhoESSJZJAhLARUSRFcCAE4CNhoFSRUjEkQiU0w2GgZJFSMSRCJTTDYaB0kVIxJEIlNMiKITSSJTQAgnB7AASwdPBU8CiOwWSElFCTIDE0GWATEASwgSQYYBI0AIJw2wAE4CiK4kRQVBDksDIQQZRQRLAhYnD0xQSwJLAksGiKokSYFAU0EgMgNLASJbSwVOAksHIoiqTylMULAjQyJChQE2GgFJIlkkCEsBFRJEVwIANhoCSSJZJAhLARUSRFcCADYaA0kVIxJEIlM2GgRJFSMSRCJTiMoiSU4DJxYxAFBOA4jiIkmBQFNBHjEASwEiWyJOAksEIojkTSlMULAjQzYaAUkVJRJEF0k2GgJJFSUSRBdMiOAPSSJTQAgnB7AASwJJTwNPA4joFUhMFicPTFAxAE8CI4iyJkkiU0EUSwEyAyJJI4jITClMULAjQycWMQBQMQCBBSOI7iVJIlNBEiIxACJJI4iGTClMULAjQyhJNhoBSSJZJAhLARUSRFcCACcJMQBQSU8CiMYnTgK+SU8CTEF6RwIVSUUHgQlLAQ+BCUsCTwJNSUUJTFJLBBJBQkUBRQFFAYiORyNLAklOAg8jTgJNSwNSFxYqUClMULAjQzIKcwFMTgJETwJBvgFJFYEJSwEPgQlLAk8CTUxSJwlPA0lOAk8DTwVJTgSIzCuI8kIWJwhLAVBPA1BPA0yIoEIxAE8DTwNPAojYQkhMMgYyBzEASwNQJwRQTwIWUEwWUCcbTFCwK1BMUELdAUgnBEKjAScJMQBQSb5AGEYCiN5EKilMULAjQzIKcwFETEkVgQlLAQ+BCUsCTwJNTFInCU8DSU4DTwInBIjSKUy8SDEAiIhBSDEAMgYyByIWTwNMUCtQTwIWUEwWUCcbTFCwVwEIgAKABExQQqsBIihHAjYaAUkiWSQISwEVEkRXAgBJFUmBCQ9ACCcXsAAiSwFJTgIPIksCTwJNI0sCDyNLA08CTUsESU4ETwJLAlJJTgRFCoEJSwIPgQlPA08CTUlFCFIXRQYnCxJJRQRBkAVJgSkNQfoESYFADkHsBCNACCcXsABLBIi+ByJTQR6AC0VSUjplcnJDdkFlsACIhkFLAb5AEEgqKUxQsCNDMgpzAUxOAkRLBEGQAUsDSbxIMgpzAURPA0wJSU4CgSlLBUlOAg+BKUsCTwJNSwNLCksCUklPBIjAQE8DTwJPA1JLCE4CTwQjiPxAFoACgAFMUEKvAUsHJwUSQfwBRwIVgRdLAQ+BF0sCTwJNgR9LAg+BH08DTwJNSwJOAlIXTEsFvEgyCnMBRE8ETAlMgQ1ZQXhPAiSIzC1JFSJLAQ8iSwJPAk2BIEsCD4EgTwNPAk1STwJJTgKIwj4xAEsCTwIJiK4+SwUiSSOIxEBC/wFFAUUBMQBLAYiCPkIrSwNJTwKI2htMvEgyCnMBRE8CTAlMJVsISTEATIjAPUsFMgMiSSOIukBC8QIiQusESwUnBRJADksFJw8SQRxJgQkSQRAjQI8FJxewACJCDyIoSTYaAUkVJRJEF0kWJwVMUL5B5AFJgQ1ZQaABRwIkiOIqSUUHSRVJRQYiSwEPIksCTwJNgSBLAg+BIE8DTwJNSUUIUkwkVUsDTIiWBEE6SEsDSwNLA1JJFRZXBgJMUIADAgADTFApTFCwI0NJgQtZQSojiLopSRUWVwYCTFCAAwEAA0xQQj1IgAUAAAMAAEJRigEBi/9xAEDqAYBxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABMiYv/cQFIi/9xB0iL/3EKSEyL/3ELSCtMUExQTFBPAhZQTBZQiYoBAov/gWlbSYETDkEmi/+BYVuBCosAlA9BDCOL/08CiSJCC4oDASiL/TIDEkAOi/+BEw1BBiJMiYv9i/5wAEyMAEEagQqL/5SLAA5BBiNMiSJCBYoDAov+QBCL/1chIIv/iYv+cghMSU8CRIv/V0EgEkAIJxiwAIv/VyEgEkAIJxiwALGL/bIwgATOLwXzshonBLIai/6yGIEGshAisgGztD5JFUmBOQ9BigEiSwFJTgIPIksCTwJNgQRLAg+BBE8DTwJNSwNOAlIpEkFGI0AIJxiwAIEZSwEPgRlLAk8CTYE5SwIPgTlPA08CTVKL/4kiQkWKAwKL/Yv+i/+I0QKM/0kyAxNBHDEAEkAIJw2wAIEFi/+JSDEAi/9XASASQAgnDbAAgQaL/4mKAgEiSYv+FicPTFBJvkFQSRUWVwYCTFBJFYEECE8CSRUWVwYCTFBMFlcGAicZTFBPAlBMUIwAiUYCi/8yAxNBcCcWi/9QSYwAvkyMAUFUiwFJFRZXBgJMUEkVgQQIiwBJFRZXBgJMUEwWVwYCJxlMUE8CUExQjACJgBQABAASAAwBAQAAAAAAAAAAAAAAAIwAiYoBAYv/FYEKSwEPgQpLAk8CTYv/TE8CUkkVIksBDyJLAk8CTUsCiIwBSUsDD0sDTE1LA04CUkkVSUsDD0sBSwRPAk1PBExPBFJMFlcGAk8CUEkVgQQISwIVFlcGAk8DUEwWVwYCJxlMUE8CUExQiYoBAYv/IlVJJBJBFov/I1WBIAskCEyJSYEDEkEIgQlMiYEEEkEGgSGJI4mKAgEoSYv+IlVJIxJBCCOMAIkkEkGmAYv+I1WMASKMAIsAiwEMQYQBi/4VgSCLAAskSwEISUsDD0sDTE2BIk8CCElLAw9MTwNPAk1JSwIMSwJMTYv+TgJSi/8SQQgjjACJiwAjCIwAQo0BIowAiYoFAov7IlWBBBNACov9FUAIIov/ibEyCov8i/2Iog5JFRZXBgJMUIv+AQEiJxJlRBYiJxFlRLIYgAQr88xashpPA7IaTwKyGkyyGov/shqyGoEGshAisgGztD5JVwQATFcABCkSREkVIxJEIlOL/4mKBQEiKIv7IlWBAxNBCCKMAImxi/sVI0sBDyNLAk8CTYEJSwIPgQlPA08CTYv7TgJSF4v8Fov+FRZRBgiL/lCABCDFT8myGkyyGov9shqyGov/shqyGIEGshAisgGztD5JjAAVSYwBgQUSQWAiiwFJTgIPIksCTwJNgQRLAg+BBE8DTwJNiwBOAlIpEkEciwCBBFUhBBJBCCOMAIkiQgeKAgEii/5BBiOMAIv/QQyLACQZjACLAEyJigQBKEmL/YieB4v+iJQHUIv8vklPAkxBeEkjVYv/EkFoRwIVSYwBgQpLAQ+BCksCTwJNSYwATFJLAxJBMIjWJiSLAUlOAg8kTgJNiwBSFxYqUIwAiUsBQRJJI1UhBBpArAMjQAgnCrAAMgpzAUxOAkRPAkHkAojLCoAKAQAAAAAAAAAAAE8DSU4CUIj1Ck8CSSJZSwEkWUsCTwJLAlJXAgBLAyJZSwQkWUsFTwJLAlJXAgAnFYv8TwRPA4ikCksDFU8ETwRPAlJXAgBLAxVPBE8ETwJSVwIAJxSL/E8DTwOI2gmIgCGL/xZRBwgnCExQTBZMSwFQTwRQi/xMiJogSwIiW0sCIlsITwMlW08DJVsITBZMFlAxAE8DTgKIqCBITCtQTFCMAIlIgAoABAAHAAEAAAEAQvcCIkKrA4oEAYv8vkAMiMgiKkyJi/9BGEkjVSEEGkEIJwqwADIKcwFEi/xPAohAi/y8SIv9iIofSIv+FkmTJQ5EVwcBTFcBCCtPAlBMUImKAgGL/4jzDkkiWUsBJFlLAk8CSwJSVwIASwIVTwNPA08CUlcCACcVi/5PAycEiLQGJxSL/k8DJwSIngZLASJbSwEiWwhPAiVbTwIlWwhMFkwWUImKAQEoi/8VSUAIJwawAIv/IlVJgQQOQAgnBrAASSQSQT6LASQPQYYCi/8jVUmMAEHyAYsAJQ5B5AEjQAgnBrAAi/+Itw+LARJACCcGsABJgQMSQUojiwFJTgIPI0sCTwJNgQlLAg+BCU8DTwJNi/9OAlIXQAgnBrAAgQQSQVAjiwFJTgIPI0sCTwJNgSFLAg+BIU8DTwJNi/9OAlKBIK8TQAgnBrAAi/+MAIkiQuMBigIBKEmL/wFRABIii/5LAYESDEHeAksCSRVPA0lOAksBD0sCSwJPAk1PAoEDCElOBUlLAw9MTwNPAk1JSwIMSwJMTVIXjACBGIwBiwFBfYsBgQYJSYwBiwBMkYE/GkmBQA9LAYFATwJNTCMISYFAD4FATE1JSwIMSwJMTYBAQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODktX04CUlBC7QGMAImKBAEiKIv+IlWBBBJJi/8iVYEEEkxAEElACicTjACJi/yL/YjVA4wAIicRZUyMAURMQbQBSUGsAUiL/ov/E0GQAbGLAEkVFlcGAkxQi/8VI0sBDyNLAk8CTYEhSwIPgSFPA08CTYv/TgJSSRWBIBJEiwGyGIAExtPXBLIaTLIashqBBrIQIrIBsycTjACJQbICsYsASRUWVwYCTFCLAUlOArIYgARyslmBshpJshqBBrIQIrIBs7Q+SVcEAExXAAQpEkRJFSUSRBexSwJyCERLAbIIsgcjshAisgG2i/8VI0sBDyNLAk8CTYEhSwIPgSFPA08CTYv/TgJSSRWBIBJEIicSZUQWTwSyGIAEokwGfLIaTwOyGkyyGrIagQayECKyAbMWIhZQjACJMgpzAESxiwBJFRZXBgJMUIsBshiABN8oen2yGrIagQayECKyAbMyCnMAREwJIhZMFlCMAImKBAGL/BYnC0xQi/1Qi/5QvkAegAtFUlI6ZXJyQ3ZTbbAARwIVgQRLAQ+BBEsCTwJNgQxLAg+BDE8DTwJNUheL/xJAHoALRVJSOmVyckN2U2OwAEmBDFlACCcOsACJigEBi/8jVSMagwIOL08CTYv/FUoPSwJLAk8CTYv/gQxZTwMISUsDD0xPA08CTUlLAgxLAkxNi/9OAlKJigMBi/4VSRZRBwiL/UxQgRdPAgmvi/5MUFCL/xWBBEsBD4EESwJPAk2BDEsCD4EMSwNPAk2L/0sCTwJSTwNMUCRLAw8kSwRPAk2BA0sED4EDTwVPAk2L/08CSwJSTwJMUIv/TwJPA1JQiYoCAYv+gQtZi/8jEkFYi/4VgR9LAQ+BH0sCTwJNgR9PAwhJSwMPTE8DTwJNSUsCDEsCTE2L/k4CUomL/hWBH08CCElLAg9LAUsDTwJNi/6BDVlPAghJSwMPTE8DTwJNSUsCDEsCTE2L/k4CUomKBwGL+RZRBwgnCExQi/oWUQcIUIv7FlCL/BUWUQYIUIv9FRZRBghQi/4WUIv/FlCL/FCL/VCJigYBIihJi/oWJwVMUEm+TE4CKE4CKE4CIk4CIk4CQYgBiwNJI4iRA4wESSSInwOMBUkVgQ9LAQ+BD0sCTwJNgRdLAg+BF0sDTwJNSwNPAksCUheMBoEfSwIPgR9PA08CTVIXjAeL+yMSSYsHiwZPAk2L+yQSQIoDi/9LAkHuAov8jASIkglJTgMyCnMBTElOA4wCRIv9i/5PAosEiwWLBosHiLEDTwZJTwKIkAgyCnMBTElOAowBREsECE8CCUlOA4MCFw9PCE1MFklOBLsnHIwASYv/E0FETwOItgtMiIwJJwhMUIwAi/pLAYv7Ioi0DRYrUIsAUIwAiUYEiwGLAg1BJIsBiwIJSYi2CBYnCExQjABCV4j4CYsCiwENQWuLAosBCYv/SwGImgoWgAH/TFCMAEKXAYv8jAVC7QKLBRVJQAxIi/9ClwMiSwEPIksCTwJNgSBLAg+BIE8DTwJNiwVOAlJC0wOKBAGL/BYnBUxQi/4jEkkjJE8CTUlOA4v9TIjJCElOA4iUCDIKcwFMTgJEFUA6RQFMvEgyCnMBRAmL/0sBiKIIi/wiSSOIuAqMAImL/RWBD0sBD4EPSwJPAk2BF0sCD4EXSwNPAk2L/U8CSwJSF4EfSwMPgR9PBE8CTYv9TwNPAlIXCE4EiMADTgRLAUG8ASJPAkGOAYv9JFVLBShPBiJJiPsITwJJTwKIxgIyCnMBRE8CTAlPBCMSgwIXD08CTU8ESwIJFk8DTgK7i/9LAYiABov8TwKL/iOIkgiJi/0kVUsFTwUoIkmIiQpCjQGL/SNVQsEBiggBi/gWUQcIJwhMUIv5UIv6UIv7FlCL/hUWUQYIUIv4IxpBFIv8UIv9FlEHCFCL/lCL/1CJigEBi/8VgQ5LAQ+BDksCTwJNgS5LAg+BLk8DTwJNi/9OAlKJigIAi/69QRiL/xWLABNBCIv+vEiL/ov/v4kiJxBlRCMIJxBLAWeJigMCMgpzAUSL/iJbCEmL/iVbi/0ISU4CDUEYCUmIWBYnCExQi/6JiJwCSUsCDUEkTAmL/0sBiMYCFoAB/0xQi/6JJxyL/k8DTwOJigEAKEkxFkkiDUxBfjEWIwlJjAA4EEmMASMSSYwCQViLASMSRIsAOAcyChJBdIsAOAiL/xJBYosAOAkyAxJBUIsAOCAyAxJBPiOMAosCQC6L/xaAC2N2OmRlcG9zaXQ6TFCwJx2wAIkijAJCPYoAADEWQAKJMRYjCUk4EEkjE0ECiSMSRDgHMgoTQAgnHbAAiYoCAIv/QAKJi/5zAEhBIov+sYv/sgiyByOyECKyAbOJi/8yAQxACIv+Qi8xAEI3igUAi/4VgQRLAQ+BBEsCTwJNgQxLAg+BDE8DTwJNi/5OAlIXi/8WSZMlDkRXBwEyBjIHi/sWi/xQi/0VFlcGAov9UEyAAgBDUE8FFlBPBFBPAxZQTwIWUExQgAS0pO27TFCwiYoEAIv+FkmTJQ5EVwcBMgYyB4v8Fov9FlBPA1AnBCKL/1RQTwIWUEwWUIAEjKBb2UxQsImKBQCL/hZJkyUORFcHATIGMgeL+xaL/FCL/RZQTwNQJwQii/9UUE8CFlBMFlCABMc0XEJMULCJ", "clear": "DYEBQw==" }, "events": [{ "name": "VariationWritten", "args": [{ "type": "uint64", "name": "asset" }, { "type": "address", "name": "writer" }, { "type": "byte[]", "name": "slot" }, { "type": "uint64", "name": "revision" }, { "type": "uint8", "name": "flags" }, { "type": "uint8", "name": "kind" }, { "type": "uint64", "name": "round" }, { "type": "uint64", "name": "timestamp" }] }, { "name": "VariationDeleted", "args": [{ "type": "uint64", "name": "asset" }, { "type": "address", "name": "writer" }, { "type": "byte[]", "name": "slot" }, { "type": "uint64", "name": "lastRevision" }, { "type": "uint8", "name": "reason" }, { "type": "uint64", "name": "round" }, { "type": "uint64", "name": "timestamp" }] }, { "name": "MainChanged", "args": [{ "type": "uint64", "name": "asset" }, { "type": "uint64", "name": "revision" }, { "type": "uint8", "name": "role" }, { "type": "bool", "name": "cleared" }, { "type": "uint64", "name": "round" }, { "type": "uint64", "name": "timestamp" }] }, { "name": "PolicyChanged", "args": [{ "type": "uint64", "name": "asset" }, { "type": "address", "name": "manager" }, { "type": "uint64", "name": "revision" }, { "type": "uint8", "name": "flags" }, { "type": "bool", "name": "deleted" }, { "type": "uint64", "name": "round" }, { "type": "uint64", "name": "timestamp" }] }, { "name": "GrantChanged", "args": [{ "type": "address", "name": "holder" }, { "type": "uint64", "name": "revision" }, { "type": "bool", "name": "deleted" }, { "type": "uint64", "name": "round" }, { "type": "uint64", "name": "timestamp" }] }], "templateVariables": {} };
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
     * Constructs a no op call for the writeVariation(uint64,uint64,byte[],address,uint8,uint8,bool,byte[],byte[],uint64,byte[32][])(uint64,bool,(uint8,uint64)) ABI method
     *
    * Create or replace the sender's variation (asset, sender, slot). `holder` zero means
    collectible scope, otherwise holder scope bound to `holder`. `proof` is used only by meta
    writer sets.
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static writeVariation(params) {
    return {
      ...params,
      method: "writeVariation(uint64,uint64,byte[],address,uint8,uint8,bool,byte[],byte[],uint64,byte[32][])(uint64,bool,(uint8,uint64))",
      args: Array.isArray(params.args) ? params.args : [params.args.asset, params.args.controllingApp, params.args.slot, params.args.holder, params.args.kind, params.args.sub, params.args.lock, params.args.flat, params.args.body, params.args.ifRevision, params.args.proof]
    };
  }
  /**
     * Constructs a no op call for the deleteVariation(uint64,uint64,address,byte[])(bool,uint8,uint64) ABI method
     *
    * Delete variation (asset, writer, slot) of an existing asset. The first authority that applies
    is used and reported: writer (unlocked), void, holder, creator (unlocked policy).
    The refund goes to the writer.
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static deleteVariation(params) {
    return {
      ...params,
      method: "deleteVariation(uint64,uint64,address,byte[])(bool,uint8,uint64)",
      args: Array.isArray(params.args) ? params.args : [params.args.asset, params.args.controllingApp, params.args.writer, params.args.slot]
    };
  }
  /**
   * Constructs a no op call for the pinMainCreator(uint64,uint64,address,byte[],uint64,bool)(uint64,bool,(uint8,uint64)) ABI method
   *
   * Pin a collectible-scope variation as the creator's main image. The pin is a snapshot of its flat image.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static pinMainCreator(params) {
    return {
      ...params,
      method: "pinMainCreator(uint64,uint64,address,byte[],uint64,bool)(uint64,bool,(uint8,uint64))",
      args: Array.isArray(params.args) ? params.args : [params.args.asset, params.args.controllingApp, params.args.writer, params.args.slot, params.args.sourceRevision, params.args.lock]
    };
  }
  /**
   * Constructs a no op call for the pinMainHolder(uint64,address,byte[],uint64)(uint64,bool,(uint8,uint64)) ABI method
   *
   * Pin a variation as the holder's main image. Only single-unit assets. The next transfer voids it.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static pinMainHolder(params) {
    return {
      ...params,
      method: "pinMainHolder(uint64,address,byte[],uint64)(uint64,bool,(uint8,uint64))",
      args: Array.isArray(params.args) ? params.args : [params.args.asset, params.args.writer, params.args.slot, params.args.sourceRevision]
    };
  }
  /**
   * Constructs a no op call for the unpinMainCreator(uint64,uint64)(bool,uint8,uint64) ABI method
   *
   * Clear the creator section. The resolved creator, or the AssetCreator when none resolves (I12).
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static unpinMainCreator(params) {
    return {
      ...params,
      method: "unpinMainCreator(uint64,uint64)(bool,uint8,uint64)",
      args: Array.isArray(params.args) ? params.args : [params.args.asset, params.args.controllingApp]
    };
  }
  /**
   * Constructs a no op call for the unpinMainHolder(uint64)(bool,uint8,uint64) ABI method
   *
   * Clear the holder section. Its holder, or anyone once it is void. Refunded to the holder in it.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static unpinMainHolder(params) {
    return {
      ...params,
      method: "unpinMainHolder(uint64)(bool,uint8,uint64)",
      args: Array.isArray(params.args) ? params.args : [params.args.asset]
    };
  }
  /**
   * Constructs a no op call for the setAssetPolicy(uint64,uint64,byte[],byte[],bool,bool,bool)(uint64,bool,(uint8,uint64)) ABI method
   *
   * Set the policy of one asset. It overrides the manager policy. `lock` is one way.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static setAssetPolicy(params) {
    return {
      ...params,
      method: "setAssetPolicy(uint64,uint64,byte[],byte[],bool,bool,bool)(uint64,bool,(uint8,uint64))",
      args: Array.isArray(params.args) ? params.args : [params.args.asset, params.args.controllingApp, params.args.collectible, params.args.holder, params.args.managerWrites, params.args.holderPinsCollectibleOnly, params.args.lock]
    };
  }
  /**
   * Constructs a no op call for the setManagerPolicy(byte[],byte[],bool,bool)(uint64,bool,(uint8,uint64)) ABI method
   *
   * Set the policy of every asset whose ASA manager field is the sender. It has no lock.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static setManagerPolicy(params) {
    return {
      ...params,
      method: "setManagerPolicy(byte[],byte[],bool,bool)(uint64,bool,(uint8,uint64))",
      args: Array.isArray(params.args) ? params.args : [params.args.collectible, params.args.holder, params.args.managerWrites, params.args.holderPinsCollectibleOnly]
    };
  }
  /**
   * Constructs a no op call for the deleteAssetPolicy(uint64,uint64)(bool,uint8,uint64) ABI method
   *
   * Delete an unlocked asset policy. The resolved creator, or the AssetCreator when none resolves (I12).
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static deleteAssetPolicy(params) {
    return {
      ...params,
      method: "deleteAssetPolicy(uint64,uint64)(bool,uint8,uint64)",
      args: Array.isArray(params.args) ? params.args : [params.args.asset, params.args.controllingApp]
    };
  }
  /**
   * Constructs a no op call for the deleteManagerPolicy()(bool,uint8,uint64) ABI method
   *
   * Delete the sender's manager policy.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static deleteManagerPolicy(params) {
    return {
      ...params,
      method: "deleteManagerPolicy()(bool,uint8,uint64)",
      args: Array.isArray(params.args) ? params.args : []
    };
  }
  /**
   * Constructs a no op call for the setGrant(byte[])(uint64,bool,(uint8,uint64)) ABI method
   *
   * Writers the sender admits for holder-scope entries bound to the sender, on anything the sender holds.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static setGrant(params) {
    return {
      ...params,
      method: "setGrant(byte[])(uint64,bool,(uint8,uint64))",
      args: Array.isArray(params.args) ? params.args : [params.args.writers]
    };
  }
  /**
   * Constructs a no op call for the deleteGrant()(bool,uint8,uint64) ABI method
   *
   * Delete the sender's grant. Entries it admitted stay; the holder removes them separately.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static deleteGrant(params) {
    return {
      ...params,
      method: "deleteGrant()(bool,uint8,uint64)",
      args: Array.isArray(params.args) ? params.args : []
    };
  }
  /**
     * Constructs a no op call for the purge(byte[])(bool,uint8,uint64) ABI method
     *
    * Delete one `v`, `m` or `p` box of a destroyed asset (I11). Anyone may call. `v` refunds the
    writer in the name; `m` refunds the holder section's deposit to its holder and the rest to the
    caller; `p` refunds the caller (no creator resolves after destroy, as in ARC-89).
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static purge(params) {
    return {
      ...params,
      method: "purge(byte[])(bool,uint8,uint64)",
      args: Array.isArray(params.args) ? params.args : [params.args.name]
    };
  }
  /**
     * Constructs a no op call for the getMain(uint64)(uint8,byte[]) ABI method
     *
    * The pin that applies: a valid holder pin, else the creator pin, else role 0. `pin` is the
    section's PinCore followed by its flat image (the holder's address is dropped).
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static getMain(params) {
    return {
      ...params,
      method: "getMain(uint64)(uint8,byte[])",
      args: Array.isArray(params.args) ? params.args : [params.args.asset]
    };
  }
};
var CollectibleVariationsFactory = class {
  /**
   * The underlying `AppFactory` for when you want to have more flexibility
   */
  appFactory;
  /**
   * Creates a new instance of `CollectibleVariationsFactory`
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
  params = {
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
       * Creates a new instance of the CollectibleVariations smart contract using the create(uint64,uint64)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create transaction
       */
      create: (params) => {
        return this.appFactory.createTransaction.create(CollectibleVariationsParamsFactory.create.create(params));
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
  };
};
var CollectibleVariationsClient = class _CollectibleVariationsClient {
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
   * Returns a new `CollectibleVariationsClient` client, resolving the app by creator address and name
   * using AlgoKit app deployment semantics (i.e. looking for the app creation transaction note).
   * @param params The parameters to create the app client
   */
  static async fromCreatorAndName(params) {
    return new _CollectibleVariationsClient(await _AppClient.fromCreatorAndName({ ...params, appSpec: APP_SPEC }));
  }
  /**
   * Returns an `CollectibleVariationsClient` instance for the current network based on
   * pre-determined network-specific app IDs specified in the ARC-56 app spec.
   *
   * If no IDs are in the app spec or the network isn't recognised, an error is thrown.
   * @param params The parameters to create the app client
   */
  static async fromNetwork(params) {
    return new _CollectibleVariationsClient(await _AppClient.fromNetwork({ ...params, appSpec: APP_SPEC }));
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
     * Makes a clear_state call to an existing instance of the CollectibleVariations smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.params.bare.clearState(params);
    },
    /**
         * Makes a call to the CollectibleVariations smart contract using the `writeVariation(uint64,uint64,byte[],address,uint8,uint8,bool,byte[],byte[],uint64,byte[32][])(uint64,bool,(uint8,uint64))` ABI method.
         *
        * Create or replace the sender's variation (asset, sender, slot). `holder` zero means
        collectible scope, otherwise holder scope bound to `holder`. `proof` is used only by meta
        writer sets.
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    writeVariation: (params) => {
      return this.appClient.params.call(CollectibleVariationsParamsFactory.writeVariation(params));
    },
    /**
         * Makes a call to the CollectibleVariations smart contract using the `deleteVariation(uint64,uint64,address,byte[])(bool,uint8,uint64)` ABI method.
         *
        * Delete variation (asset, writer, slot) of an existing asset. The first authority that applies
        is used and reported: writer (unlocked), void, holder, creator (unlocked policy).
        The refund goes to the writer.
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    deleteVariation: (params) => {
      return this.appClient.params.call(CollectibleVariationsParamsFactory.deleteVariation(params));
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `pinMainCreator(uint64,uint64,address,byte[],uint64,bool)(uint64,bool,(uint8,uint64))` ABI method.
     *
     * Pin a collectible-scope variation as the creator's main image. The pin is a snapshot of its flat image.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    pinMainCreator: (params) => {
      return this.appClient.params.call(CollectibleVariationsParamsFactory.pinMainCreator(params));
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `pinMainHolder(uint64,address,byte[],uint64)(uint64,bool,(uint8,uint64))` ABI method.
     *
     * Pin a variation as the holder's main image. Only single-unit assets. The next transfer voids it.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    pinMainHolder: (params) => {
      return this.appClient.params.call(CollectibleVariationsParamsFactory.pinMainHolder(params));
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `unpinMainCreator(uint64,uint64)(bool,uint8,uint64)` ABI method.
     *
     * Clear the creator section. The resolved creator, or the AssetCreator when none resolves (I12).
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    unpinMainCreator: (params) => {
      return this.appClient.params.call(CollectibleVariationsParamsFactory.unpinMainCreator(params));
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `unpinMainHolder(uint64)(bool,uint8,uint64)` ABI method.
     *
     * Clear the holder section. Its holder, or anyone once it is void. Refunded to the holder in it.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    unpinMainHolder: (params) => {
      return this.appClient.params.call(CollectibleVariationsParamsFactory.unpinMainHolder(params));
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `setAssetPolicy(uint64,uint64,byte[],byte[],bool,bool,bool)(uint64,bool,(uint8,uint64))` ABI method.
     *
     * Set the policy of one asset. It overrides the manager policy. `lock` is one way.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    setAssetPolicy: (params) => {
      return this.appClient.params.call(CollectibleVariationsParamsFactory.setAssetPolicy(params));
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `setManagerPolicy(byte[],byte[],bool,bool)(uint64,bool,(uint8,uint64))` ABI method.
     *
     * Set the policy of every asset whose ASA manager field is the sender. It has no lock.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    setManagerPolicy: (params) => {
      return this.appClient.params.call(CollectibleVariationsParamsFactory.setManagerPolicy(params));
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `deleteAssetPolicy(uint64,uint64)(bool,uint8,uint64)` ABI method.
     *
     * Delete an unlocked asset policy. The resolved creator, or the AssetCreator when none resolves (I12).
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    deleteAssetPolicy: (params) => {
      return this.appClient.params.call(CollectibleVariationsParamsFactory.deleteAssetPolicy(params));
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `deleteManagerPolicy()(bool,uint8,uint64)` ABI method.
     *
     * Delete the sender's manager policy.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    deleteManagerPolicy: (params = { args: [] }) => {
      return this.appClient.params.call(CollectibleVariationsParamsFactory.deleteManagerPolicy(params));
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `setGrant(byte[])(uint64,bool,(uint8,uint64))` ABI method.
     *
     * Writers the sender admits for holder-scope entries bound to the sender, on anything the sender holds.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    setGrant: (params) => {
      return this.appClient.params.call(CollectibleVariationsParamsFactory.setGrant(params));
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `deleteGrant()(bool,uint8,uint64)` ABI method.
     *
     * Delete the sender's grant. Entries it admitted stay; the holder removes them separately.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    deleteGrant: (params = { args: [] }) => {
      return this.appClient.params.call(CollectibleVariationsParamsFactory.deleteGrant(params));
    },
    /**
         * Makes a call to the CollectibleVariations smart contract using the `purge(byte[])(bool,uint8,uint64)` ABI method.
         *
        * Delete one `v`, `m` or `p` box of a destroyed asset (I11). Anyone may call. `v` refunds the
        writer in the name; `m` refunds the holder section's deposit to its holder and the rest to the
        caller; `p` refunds the caller (no creator resolves after destroy, as in ARC-89).
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    purge: (params) => {
      return this.appClient.params.call(CollectibleVariationsParamsFactory.purge(params));
    },
    /**
         * Makes a call to the CollectibleVariations smart contract using the `getMain(uint64)(uint8,byte[])` ABI method.
         *
         * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
         *
        * The pin that applies: a valid holder pin, else the creator pin, else role 0. `pin` is the
        section's PinCore followed by its flat image (the holder's address is dropped).
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    getMain: (params) => {
      return this.appClient.params.call(CollectibleVariationsParamsFactory.getMain(params));
    }
  };
  /**
   * Create transactions for the current app
   */
  createTransaction = {
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
         * Makes a call to the CollectibleVariations smart contract using the `writeVariation(uint64,uint64,byte[],address,uint8,uint8,bool,byte[],byte[],uint64,byte[32][])(uint64,bool,(uint8,uint64))` ABI method.
         *
        * Create or replace the sender's variation (asset, sender, slot). `holder` zero means
        collectible scope, otherwise holder scope bound to `holder`. `proof` is used only by meta
        writer sets.
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    writeVariation: (params) => {
      return this.appClient.createTransaction.call(CollectibleVariationsParamsFactory.writeVariation(params));
    },
    /**
         * Makes a call to the CollectibleVariations smart contract using the `deleteVariation(uint64,uint64,address,byte[])(bool,uint8,uint64)` ABI method.
         *
        * Delete variation (asset, writer, slot) of an existing asset. The first authority that applies
        is used and reported: writer (unlocked), void, holder, creator (unlocked policy).
        The refund goes to the writer.
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    deleteVariation: (params) => {
      return this.appClient.createTransaction.call(CollectibleVariationsParamsFactory.deleteVariation(params));
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `pinMainCreator(uint64,uint64,address,byte[],uint64,bool)(uint64,bool,(uint8,uint64))` ABI method.
     *
     * Pin a collectible-scope variation as the creator's main image. The pin is a snapshot of its flat image.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    pinMainCreator: (params) => {
      return this.appClient.createTransaction.call(CollectibleVariationsParamsFactory.pinMainCreator(params));
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `pinMainHolder(uint64,address,byte[],uint64)(uint64,bool,(uint8,uint64))` ABI method.
     *
     * Pin a variation as the holder's main image. Only single-unit assets. The next transfer voids it.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    pinMainHolder: (params) => {
      return this.appClient.createTransaction.call(CollectibleVariationsParamsFactory.pinMainHolder(params));
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `unpinMainCreator(uint64,uint64)(bool,uint8,uint64)` ABI method.
     *
     * Clear the creator section. The resolved creator, or the AssetCreator when none resolves (I12).
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    unpinMainCreator: (params) => {
      return this.appClient.createTransaction.call(CollectibleVariationsParamsFactory.unpinMainCreator(params));
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `unpinMainHolder(uint64)(bool,uint8,uint64)` ABI method.
     *
     * Clear the holder section. Its holder, or anyone once it is void. Refunded to the holder in it.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    unpinMainHolder: (params) => {
      return this.appClient.createTransaction.call(CollectibleVariationsParamsFactory.unpinMainHolder(params));
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `setAssetPolicy(uint64,uint64,byte[],byte[],bool,bool,bool)(uint64,bool,(uint8,uint64))` ABI method.
     *
     * Set the policy of one asset. It overrides the manager policy. `lock` is one way.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    setAssetPolicy: (params) => {
      return this.appClient.createTransaction.call(CollectibleVariationsParamsFactory.setAssetPolicy(params));
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `setManagerPolicy(byte[],byte[],bool,bool)(uint64,bool,(uint8,uint64))` ABI method.
     *
     * Set the policy of every asset whose ASA manager field is the sender. It has no lock.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    setManagerPolicy: (params) => {
      return this.appClient.createTransaction.call(CollectibleVariationsParamsFactory.setManagerPolicy(params));
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `deleteAssetPolicy(uint64,uint64)(bool,uint8,uint64)` ABI method.
     *
     * Delete an unlocked asset policy. The resolved creator, or the AssetCreator when none resolves (I12).
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    deleteAssetPolicy: (params) => {
      return this.appClient.createTransaction.call(CollectibleVariationsParamsFactory.deleteAssetPolicy(params));
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `deleteManagerPolicy()(bool,uint8,uint64)` ABI method.
     *
     * Delete the sender's manager policy.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    deleteManagerPolicy: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(CollectibleVariationsParamsFactory.deleteManagerPolicy(params));
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `setGrant(byte[])(uint64,bool,(uint8,uint64))` ABI method.
     *
     * Writers the sender admits for holder-scope entries bound to the sender, on anything the sender holds.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    setGrant: (params) => {
      return this.appClient.createTransaction.call(CollectibleVariationsParamsFactory.setGrant(params));
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `deleteGrant()(bool,uint8,uint64)` ABI method.
     *
     * Delete the sender's grant. Entries it admitted stay; the holder removes them separately.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    deleteGrant: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(CollectibleVariationsParamsFactory.deleteGrant(params));
    },
    /**
         * Makes a call to the CollectibleVariations smart contract using the `purge(byte[])(bool,uint8,uint64)` ABI method.
         *
        * Delete one `v`, `m` or `p` box of a destroyed asset (I11). Anyone may call. `v` refunds the
        writer in the name; `m` refunds the holder section's deposit to its holder and the rest to the
        caller; `p` refunds the caller (no creator resolves after destroy, as in ARC-89).
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    purge: (params) => {
      return this.appClient.createTransaction.call(CollectibleVariationsParamsFactory.purge(params));
    },
    /**
         * Makes a call to the CollectibleVariations smart contract using the `getMain(uint64)(uint8,byte[])` ABI method.
         *
         * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
         *
        * The pin that applies: a valid holder pin, else the creator pin, else role 0. `pin` is the
        section's PinCore followed by its flat image (the holder's address is dropped).
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    getMain: (params) => {
      return this.appClient.createTransaction.call(CollectibleVariationsParamsFactory.getMain(params));
    }
  };
  /**
   * Send calls to the current app
   */
  send = {
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
         * Makes a call to the CollectibleVariations smart contract using the `writeVariation(uint64,uint64,byte[],address,uint8,uint8,bool,byte[],byte[],uint64,byte[32][])(uint64,bool,(uint8,uint64))` ABI method.
         *
        * Create or replace the sender's variation (asset, sender, slot). `holder` zero means
        collectible scope, otherwise holder scope bound to `holder`. `proof` is used only by meta
        writer sets.
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    writeVariation: async (params) => {
      const result = await this.appClient.send.call(CollectibleVariationsParamsFactory.writeVariation(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the CollectibleVariations smart contract using the `deleteVariation(uint64,uint64,address,byte[])(bool,uint8,uint64)` ABI method.
         *
        * Delete variation (asset, writer, slot) of an existing asset. The first authority that applies
        is used and reported: writer (unlocked), void, holder, creator (unlocked policy).
        The refund goes to the writer.
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    deleteVariation: async (params) => {
      const result = await this.appClient.send.call(CollectibleVariationsParamsFactory.deleteVariation(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `pinMainCreator(uint64,uint64,address,byte[],uint64,bool)(uint64,bool,(uint8,uint64))` ABI method.
     *
     * Pin a collectible-scope variation as the creator's main image. The pin is a snapshot of its flat image.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    pinMainCreator: async (params) => {
      const result = await this.appClient.send.call(CollectibleVariationsParamsFactory.pinMainCreator(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `pinMainHolder(uint64,address,byte[],uint64)(uint64,bool,(uint8,uint64))` ABI method.
     *
     * Pin a variation as the holder's main image. Only single-unit assets. The next transfer voids it.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    pinMainHolder: async (params) => {
      const result = await this.appClient.send.call(CollectibleVariationsParamsFactory.pinMainHolder(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `unpinMainCreator(uint64,uint64)(bool,uint8,uint64)` ABI method.
     *
     * Clear the creator section. The resolved creator, or the AssetCreator when none resolves (I12).
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    unpinMainCreator: async (params) => {
      const result = await this.appClient.send.call(CollectibleVariationsParamsFactory.unpinMainCreator(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `unpinMainHolder(uint64)(bool,uint8,uint64)` ABI method.
     *
     * Clear the holder section. Its holder, or anyone once it is void. Refunded to the holder in it.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    unpinMainHolder: async (params) => {
      const result = await this.appClient.send.call(CollectibleVariationsParamsFactory.unpinMainHolder(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `setAssetPolicy(uint64,uint64,byte[],byte[],bool,bool,bool)(uint64,bool,(uint8,uint64))` ABI method.
     *
     * Set the policy of one asset. It overrides the manager policy. `lock` is one way.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    setAssetPolicy: async (params) => {
      const result = await this.appClient.send.call(CollectibleVariationsParamsFactory.setAssetPolicy(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `setManagerPolicy(byte[],byte[],bool,bool)(uint64,bool,(uint8,uint64))` ABI method.
     *
     * Set the policy of every asset whose ASA manager field is the sender. It has no lock.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    setManagerPolicy: async (params) => {
      const result = await this.appClient.send.call(CollectibleVariationsParamsFactory.setManagerPolicy(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `deleteAssetPolicy(uint64,uint64)(bool,uint8,uint64)` ABI method.
     *
     * Delete an unlocked asset policy. The resolved creator, or the AssetCreator when none resolves (I12).
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    deleteAssetPolicy: async (params) => {
      const result = await this.appClient.send.call(CollectibleVariationsParamsFactory.deleteAssetPolicy(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `deleteManagerPolicy()(bool,uint8,uint64)` ABI method.
     *
     * Delete the sender's manager policy.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    deleteManagerPolicy: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(CollectibleVariationsParamsFactory.deleteManagerPolicy(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `setGrant(byte[])(uint64,bool,(uint8,uint64))` ABI method.
     *
     * Writers the sender admits for holder-scope entries bound to the sender, on anything the sender holds.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    setGrant: async (params) => {
      const result = await this.appClient.send.call(CollectibleVariationsParamsFactory.setGrant(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the CollectibleVariations smart contract using the `deleteGrant()(bool,uint8,uint64)` ABI method.
     *
     * Delete the sender's grant. Entries it admitted stay; the holder removes them separately.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    deleteGrant: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(CollectibleVariationsParamsFactory.deleteGrant(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the CollectibleVariations smart contract using the `purge(byte[])(bool,uint8,uint64)` ABI method.
         *
        * Delete one `v`, `m` or `p` box of a destroyed asset (I11). Anyone may call. `v` refunds the
        writer in the name; `m` refunds the holder section's deposit to its holder and the rest to the
        caller; `p` refunds the caller (no creator resolves after destroy, as in ARC-89).
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    purge: async (params) => {
      const result = await this.appClient.send.call(CollectibleVariationsParamsFactory.purge(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the CollectibleVariations smart contract using the `getMain(uint64)(uint8,byte[])` ABI method.
         *
         * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
         *
        * The pin that applies: a valid holder pin, else the creator pin, else role 0. `pin` is the
        section's PinCore followed by its flat image (the holder's address is dropped).
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    getMain: async (params) => {
      const result = await this.appClient.send.call(CollectibleVariationsParamsFactory.getMain(params));
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
    return new _CollectibleVariationsClient(this.appClient.clone(params));
  }
  /**
     * Makes a readonly (simulated) call to the CollectibleVariations smart contract using the `getMain(uint64)(uint8,byte[])` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
    * The pin that applies: a valid holder pin, else the creator pin, else role 0. `pin` is the
    section's PinCore followed by its flat image (the holder's address is dropped).
  
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
  async getMain(params) {
    const result = await this.appClient.send.call(CollectibleVariationsParamsFactory.getMain(params));
    return result.return;
  }
  /**
   * Methods to access state for the current CollectibleVariations app
   */
  state = {
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
  };
  newGroup() {
    const client = this;
    const composer = this.algorand.newGroup();
    let promiseChain = Promise.resolve();
    const resultMappers = [];
    return {
      /**
       * Add a writeVariation(uint64,uint64,byte[],address,uint8,uint8,bool,byte[],byte[],uint64,byte[32][])(uint64,bool,(uint8,uint64)) method call against the CollectibleVariations contract
       */
      writeVariation(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.writeVariation(params)));
        resultMappers.push((v) => client.decodeReturnValue("writeVariation(uint64,uint64,byte[],address,uint8,uint8,bool,byte[],byte[],uint64,byte[32][])(uint64,bool,(uint8,uint64))", v));
        return this;
      },
      /**
       * Add a deleteVariation(uint64,uint64,address,byte[])(bool,uint8,uint64) method call against the CollectibleVariations contract
       */
      deleteVariation(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.deleteVariation(params)));
        resultMappers.push((v) => client.decodeReturnValue("deleteVariation(uint64,uint64,address,byte[])(bool,uint8,uint64)", v));
        return this;
      },
      /**
       * Add a pinMainCreator(uint64,uint64,address,byte[],uint64,bool)(uint64,bool,(uint8,uint64)) method call against the CollectibleVariations contract
       */
      pinMainCreator(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.pinMainCreator(params)));
        resultMappers.push((v) => client.decodeReturnValue("pinMainCreator(uint64,uint64,address,byte[],uint64,bool)(uint64,bool,(uint8,uint64))", v));
        return this;
      },
      /**
       * Add a pinMainHolder(uint64,address,byte[],uint64)(uint64,bool,(uint8,uint64)) method call against the CollectibleVariations contract
       */
      pinMainHolder(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.pinMainHolder(params)));
        resultMappers.push((v) => client.decodeReturnValue("pinMainHolder(uint64,address,byte[],uint64)(uint64,bool,(uint8,uint64))", v));
        return this;
      },
      /**
       * Add a unpinMainCreator(uint64,uint64)(bool,uint8,uint64) method call against the CollectibleVariations contract
       */
      unpinMainCreator(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.unpinMainCreator(params)));
        resultMappers.push((v) => client.decodeReturnValue("unpinMainCreator(uint64,uint64)(bool,uint8,uint64)", v));
        return this;
      },
      /**
       * Add a unpinMainHolder(uint64)(bool,uint8,uint64) method call against the CollectibleVariations contract
       */
      unpinMainHolder(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.unpinMainHolder(params)));
        resultMappers.push((v) => client.decodeReturnValue("unpinMainHolder(uint64)(bool,uint8,uint64)", v));
        return this;
      },
      /**
       * Add a setAssetPolicy(uint64,uint64,byte[],byte[],bool,bool,bool)(uint64,bool,(uint8,uint64)) method call against the CollectibleVariations contract
       */
      setAssetPolicy(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.setAssetPolicy(params)));
        resultMappers.push((v) => client.decodeReturnValue("setAssetPolicy(uint64,uint64,byte[],byte[],bool,bool,bool)(uint64,bool,(uint8,uint64))", v));
        return this;
      },
      /**
       * Add a setManagerPolicy(byte[],byte[],bool,bool)(uint64,bool,(uint8,uint64)) method call against the CollectibleVariations contract
       */
      setManagerPolicy(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.setManagerPolicy(params)));
        resultMappers.push((v) => client.decodeReturnValue("setManagerPolicy(byte[],byte[],bool,bool)(uint64,bool,(uint8,uint64))", v));
        return this;
      },
      /**
       * Add a deleteAssetPolicy(uint64,uint64)(bool,uint8,uint64) method call against the CollectibleVariations contract
       */
      deleteAssetPolicy(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.deleteAssetPolicy(params)));
        resultMappers.push((v) => client.decodeReturnValue("deleteAssetPolicy(uint64,uint64)(bool,uint8,uint64)", v));
        return this;
      },
      /**
       * Add a deleteManagerPolicy()(bool,uint8,uint64) method call against the CollectibleVariations contract
       */
      deleteManagerPolicy(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.deleteManagerPolicy(params)));
        resultMappers.push((v) => client.decodeReturnValue("deleteManagerPolicy()(bool,uint8,uint64)", v));
        return this;
      },
      /**
       * Add a setGrant(byte[])(uint64,bool,(uint8,uint64)) method call against the CollectibleVariations contract
       */
      setGrant(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.setGrant(params)));
        resultMappers.push((v) => client.decodeReturnValue("setGrant(byte[])(uint64,bool,(uint8,uint64))", v));
        return this;
      },
      /**
       * Add a deleteGrant()(bool,uint8,uint64) method call against the CollectibleVariations contract
       */
      deleteGrant(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.deleteGrant(params)));
        resultMappers.push((v) => client.decodeReturnValue("deleteGrant()(bool,uint8,uint64)", v));
        return this;
      },
      /**
       * Add a purge(byte[])(bool,uint8,uint64) method call against the CollectibleVariations contract
       */
      purge(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.purge(params)));
        resultMappers.push((v) => client.decodeReturnValue("purge(byte[])(bool,uint8,uint64)", v));
        return this;
      },
      /**
       * Add a getMain(uint64)(uint8,byte[]) method call against the CollectibleVariations contract
       */
      getMain(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getMain(params)));
        resultMappers.push((v) => client.decodeReturnValue("getMain(uint64)(uint8,byte[])", v));
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
};

// src/collectible-variations/codec.ts
import { sha256 } from "@noble/hashes/sha2.js";
import { decodeAddress, encodeAddress } from "algosdk";

// src/collectible-variations/layout.ts
var layout_exports = {};
__export(layout_exports, {
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
var DelegateAdmit = "admit(uint64,address,byte[],address)bool";
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
var addressAt = (b, at) => encodeAddress(b.slice(at, at + 32));
var publicKey = (address) => decodeAddress(address).publicKey;
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
  const hash = sha256(boxName).slice(0, MetaNameHashBytes);
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
var translateCollectibleVariationsError = makeErrorTranslator(COLLECTIBLE_VARIATIONS_ERROR_MESSAGES);

// src/collectible-variations/index.ts
var DISCOVERY_FEE = 60000n;
var CollectibleVariationsSDK = class extends BaseSDK {
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
      "writeVariation",
      {
        asset,
        controllingApp,
        slot: slotBytes(slot),
        holder: holder ?? algosdk.ALGORAND_ZERO_ADDRESS_STRING,
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
    return this.call("deleteVariation", { asset, controllingApp, writer, slot: slotBytes(slot) }, { sender, signer });
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
      "pinMainCreator",
      { asset, controllingApp, writer, slot: slotBytes(slot), sourceRevision, lock },
      { sender, signer }
    );
  }
  /** Pin a variation as the holder's main image (single-unit assets only). */
  async pinMainHolder({ sender, signer, asset, writer, slot, sourceRevision }) {
    return this.call("pinMainHolder", { asset, writer, slot: slotBytes(slot), sourceRevision }, { sender, signer });
  }
  async unpinMainCreator({ sender, signer, asset, controllingApp = 0n }) {
    return this.call("unpinMainCreator", { asset, controllingApp }, { sender, signer });
  }
  async unpinMainHolder({ sender, signer, asset }) {
    return this.call("unpinMainHolder", { asset }, { sender, signer });
  }
  /** Set one asset's policy (overrides the manager policy). `lock` is permanent. */
  async setAssetPolicy({ sender, signer, asset, controllingApp = 0n, lock = false, ...policy }) {
    return this.call("setAssetPolicy", { asset, controllingApp, ...this.policyArgs(policy), lock }, { sender, signer });
  }
  /** Set the policy of every asset whose ASA manager is the sender. */
  async setManagerPolicy({ sender, signer, ...policy }) {
    return this.call("setManagerPolicy", this.policyArgs(policy), { sender, signer });
  }
  async deleteAssetPolicy({ sender, signer, asset, controllingApp = 0n }) {
    return this.call("deleteAssetPolicy", { asset, controllingApp }, { sender, signer });
  }
  async deleteManagerPolicy(params = {}) {
    return this.call("deleteManagerPolicy", {}, params);
  }
  /** Writers the sender admits for holder-scope entries bound to it. */
  async setGrant({ sender, signer, writers }) {
    return this.call("setGrant", { writers: encodeWriterSet(writers) }, { sender, signer });
  }
  async deleteGrant(params = {}) {
    return this.call("deleteGrant", {}, params);
  }
  /** Delete a `v`, `m` or `p` box of a destroyed asset. Anyone may call. */
  async purge({ sender, signer, name }) {
    return this.call("purge", { name }, { sender, signer });
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
    if (manager && manager !== algosdk.ALGORAND_ZERO_ADDRESS_STRING) {
      const managed = await this.getManagerPolicy({ manager: manager.toString() });
      if (managed) return { policy: managed, source: "manager" };
    }
    return { policy: DEFAULT_POLICY, source: "default" };
  }
  /**
   * The pin that applies, as getMain computes it: a holder pin whose
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
    if (account === algosdk.ALGORAND_ZERO_ADDRESS_STRING || decimals > 19) return false;
    try {
      const info = await this.algorand.asset.getAccountInformation(account, asset);
      return info.balance >= 10n ** BigInt(decimals);
    } catch {
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
    const { transactions } = await create[method]({ sender, args, staticFee: microAlgo(DISCOVERY_FEE) });
    const grouped = algosdk.assignGroupID(transactions);
    const response = await this.algorand.client.algod.simulateTransactions(
      new algosdk.modelsv2.SimulateRequest({
        txnGroups: [
          new algosdk.modelsv2.SimulateRequestTransactionGroup({
            txns: grouped.map((txn) => new algosdk.SignedTransaction({ txn }))
          })
        ],
        allowEmptySignatures: true,
        allowUnnamedResources: true,
        allowMoreLogging: true,
        extraOpcodeBudget: 2e4
      })
    ).do();
    const logs = response.txnGroups[0].txnResults.flatMap((r) => r.txnResult.logs ?? []);
    return parseDepositLog(logs) ?? 0n;
  }
  /** A `meta` writer set's Merkle tree over writer addresses (leaf = sha256(sha256(address))). */
  static writerListTree(writers) {
    return createAddressTree(writers.map((w) => decodeAddress2(w).publicKey));
  }
  /** The proof that `writer` is in `tree`, for `writeVariation({ proof })`. */
  static writerProof(tree, writer) {
    const key = decodeAddress2(writer).publicKey;
    const found = tree.getProofFor(([value]) => value.length === 32 && value.every((b, i) => b === key[i]));
    if (!found) throw new Error(`${writer} is not in the writer list`);
    return found.proof;
  }
  // ========== Internals ==========
  policyArgs({ collectible, holder, managerWrites = true, holderPinsCollectibleOnly = false }) {
    return {
      collectible: encodeWriterSet(collectible ?? { mode: "closed" }),
      holder: encodeWriterSet(holder ?? { mode: "closed" }),
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
        amount: microAlgo(deposit)
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
    } catch {
      return void 0;
    }
  }
};
export {
  CLOSED,
  COLLECTIBLE_VARIATIONS_ERROR_MESSAGES,
  CollectibleVariationsSDK,
  DEFAULT_POLICY,
  OPEN,
  assetPolicyBoxName,
  concatBytes,
  decodeGrant,
  decodeMain,
  decodePin,
  decodePolicy,
  decodeVariation,
  decodeWriterSet,
  encodeWriterSet,
  grantBoxName,
  layout_exports as layout,
  mainBoxName,
  managerPolicyBoxName,
  metaRootName,
  parseDepositLog,
  slotBytes,
  translateCollectibleVariationsError,
  uint64Bytes,
  variationBoxName
};
//# sourceMappingURL=index.mjs.map
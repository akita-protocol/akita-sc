"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } var _class; var _class2; var _class3; var _class4;

var _chunkF7QD5JKNjs = require('./chunk-F7QD5JKN.js');


var _chunkGL3BLPAFjs = require('./chunk-GL3BLPAF.js');


var _chunkLAHRKL35js = require('./chunk-LAHRKL35.js');

// src/marketplace/index.ts
var _algokitutils = require('@algorandfoundation/algokit-utils');
var _algosdk = require('algosdk'); var _algosdk2 = _interopRequireDefault(_algosdk);

// src/generated/MarketplaceClient.ts
var _apparc56 = require('@algorandfoundation/algokit-utils/types/app-arc56');


var _appclient = require('@algorandfoundation/algokit-utils/types/app-client');
var _appfactory = require('@algorandfoundation/algokit-utils/types/app-factory');
var APP_SPEC = { "name": "Marketplace", "structs": {}, "methods": [{ "name": "create", "args": [{ "type": "string", "name": "version" }, { "type": "string", "name": "childVersion" }, { "type": "uint64", "name": "akitaDAO" }, { "type": "uint64", "name": "akitaDAOEscrow" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "list", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "uint64", "name": "price" }, { "type": "uint64", "name": "paymentAsset" }, { "type": "uint64", "name": "expiration" }, { "type": "address", "name": "reservedFor" }, { "type": "uint64", "name": "gateID" }, { "type": "address", "name": "marketplace" }, { "type": "string", "name": "name" }, { "type": "byte[32][]", "name": "proof" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "listPrizeBox", "args": [{ "type": "appl", "name": "prizeBoxTransferTxn" }, { "type": "pay", "name": "payment" }, { "type": "uint64", "name": "price" }, { "type": "uint64", "name": "paymentAsset" }, { "type": "uint64", "name": "expiration" }, { "type": "address", "name": "reservedFor" }, { "type": "uint64", "name": "gateID" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "gatedPurchase", "args": [{ "type": "pay", "name": "payment" }, { "type": "appl", "name": "gateTxn" }, { "type": "uint64", "name": "appId" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "purchase", "args": [{ "type": "pay", "name": "payment" }, { "type": "uint64", "name": "appId" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "gatedPurchaseAsa", "args": [{ "type": "axfer", "name": "assetXfer" }, { "type": "appl", "name": "gateTxn" }, { "type": "uint64", "name": "appId" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "purchaseAsa", "args": [{ "type": "axfer", "name": "assetXfer" }, { "type": "uint64", "name": "appId" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "delist", "args": [{ "type": "uint64", "name": "appId" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "initBoxedContract", "args": [{ "type": "string", "name": "version" }, { "type": "uint64", "name": "size" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "loadBoxedContract", "args": [{ "type": "uint64", "name": "offset" }, { "type": "byte[]", "name": "data" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "deleteBoxedContract", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "optIn", "args": [{ "type": "pay", "name": "payment", "desc": "The payment transaction" }, { "type": "uint64", "name": "asset", "desc": "The asset to be opted into" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "optin tells the contract to opt into an asa", "events": [], "recommendations": {} }, { "name": "optInCost", "args": [{ "type": "uint64", "name": "asset" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "updateAkitaDAOEscrow", "args": [{ "type": "uint64", "name": "app" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "update", "args": [{ "type": "string", "name": "newVersion" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["UpdateApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 2, "bytes": 2 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "childContractVersion": { "keyType": "AVMString", "valueType": "AVMString", "key": "Y2hpbGRfY29udHJhY3RfdmVyc2lvbg==", "desc": "the current version of the child contract" }, "akitaDAOEscrow": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZXNjcm93", "desc": "the app ID for the akita DAO escrow to use" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" } }, "local": {}, "box": { "boxedContract": { "keyType": "AVMString", "valueType": "AVMBytes", "key": "YmM=" } } }, "maps": { "global": {}, "local": {}, "box": {} } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [1546], "errorMessage": "Bad method prize box transfer needed" }, { "pc": [945, 1648], "errorMessage": "Box must have value" }, { "pc": [417, 1329, 3148], "errorMessage": "Bytes has valid prefix" }, { "pc": [824, 1528, 2809], "errorMessage": "Contract not set" }, { "pc": [3168], "errorMessage": "Escrow does not exist" }, { "pc": [3030], "errorMessage": "Invalid app upgrade" }, { "pc": [2804], "errorMessage": "Invalid call order" }, { "pc": [899, 923, 1645, 2046, 2175, 2896], "errorMessage": "Invalid payment" }, { "pc": [2349, 2491], "errorMessage": "Invalid transfer" }, { "pc": [819, 1523], "errorMessage": "Lowest price is 4 units for divisibility" }, { "pc": [2017, 2159, 2312, 2467, 2588], "errorMessage": "Not a listing contract" }, { "pc": [1575], "errorMessage": "Not a prize box" }, { "pc": [1588], "errorMessage": "Not prize box owner" }, { "pc": [179], "errorMessage": "OnCompletion must be NoOp" }, { "pc": [321], "errorMessage": "OnCompletion must be UpdateApplication && can only call when not creating" }, { "pc": [2687, 2707, 2835, 2980, 3019, 3059], "errorMessage": "Only the Akita DAO can call this function" }, { "pc": [2167, 2475], "errorMessage": "This has a gate" }, { "pc": [3177], "errorMessage": "Wrong escrow for this operation" }, { "pc": [552, 1090, 1111, 1148, 1177, 1217, 1382, 1561, 1573, 1790, 1810, 1837, 1877, 1918, 2013, 2066, 2155, 2195, 2308, 2369, 2463, 2511, 2584, 2705, 2833, 2870, 2937, 2978, 3015, 3057, 3230, 3252, 3330], "errorMessage": "application exists" }, { "pc": [1261], "errorMessage": "asset exists" }, { "pc": [835, 930, 975, 987, 992, 1214, 1375, 1379, 1395, 1550, 1677, 1689, 1694, 1874, 1911, 1915, 1931, 2e3, 2027, 2295, 2322, 2699, 2827, 2863, 2867, 2930, 2934, 2972, 3008, 3051, 3071, 3172, 3249, 3327], "errorMessage": "check GlobalState exists" }, { "pc": [3161], "errorMessage": "invalid number of bytes for (len+(uint64,bool1)[])" }, { "pc": [814], "errorMessage": "invalid number of bytes for (len+uint8[32][])" }, { "pc": [427, 2737], "errorMessage": "invalid number of bytes for (len+uint8[])" }, { "pc": [625, 642, 792, 1339, 2657, 2999], "errorMessage": "invalid number of bytes for (len+utf8[])" }, { "pc": [653, 662, 718, 730, 744, 765, 1462, 1474, 1487, 1508, 1986, 2140, 2281, 2448, 2579, 2668, 2721, 2858, 2925, 2965, 3044], "errorMessage": "invalid number of bytes for uint64" }, { "pc": [755, 776, 1498, 1519, 1996, 2150, 2291, 2458], "errorMessage": "invalid number of bytes for uint8[32]" }, { "pc": [1439, 1978, 2273], "errorMessage": "transaction type is appl" }, { "pc": [709, 2263, 2440], "errorMessage": "transaction type is axfer" }, { "pc": [698, 1451, 1968, 2132, 2850], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDggNiA2MDYwMCA3MzUwMDAgNTAwMDAKICAgIGJ5dGVjYmxvY2sgImFraXRhX2RhbyIgImFraXRhX2VzY3JvdyIgImJjIiAid2FsbGV0IiAweDE1MWY3Yzc1ICJmdW5kZXIiICJhYWwiICJjaGlsZF9jb250cmFjdF92ZXJzaW9uIiAiZ2F0ZV9pZCIgMHgzZWExMTgzMiAweDgwIDB4YzUzYjMyY2MgInZlcnNpb24iIDB4ZDZmMTFlYTUgYmFzZTY0KEM0RUJRdz09KSAicmV2X21hcmtldHBsYWNlIiAweGFkZjkyYWU0IDB4NmExNjM5M2QgMHgxNzFjOWY4OCAicGFsIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTgKICAgIC8vIGV4cG9ydCBjbGFzcyBNYXJrZXRwbGFjZSBleHRlbmRzIEZhY3RvcnlDb250cmFjdCB7CiAgICBwdXNoYnl0ZXMgMHhlYTkxODBkZCAvLyBtZXRob2QgInVwZGF0ZShzdHJpbmcpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIG1haW5fdXBkYXRlX3JvdXRlQDIKCm1haW5fc3dpdGNoX2Nhc2VfbmV4dEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTgKICAgIC8vIGV4cG9ydCBjbGFzcyBNYXJrZXRwbGFjZSBleHRlbmRzIEZhY3RvcnlDb250cmFjdCB7CiAgICB0eG4gT25Db21wbGV0aW9uCiAgICAhCiAgICBhc3NlcnQgLy8gT25Db21wbGV0aW9uIG11c3QgYmUgTm9PcAogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgIGJ6IG1haW5fY3JlYXRlX05vT3BAMjEKICAgIHB1c2hieXRlc3MgMHhlMmZhOWUyMSAweDgxZGM1MTZhIDB4NmU5MDM1Y2MgMHg1ZDdhNjE3NyAweGRhYTk3NTE2IDB4MDJjZmIxY2YgMHhjOTdkYmIyZSAvLyBtZXRob2QgImxpc3QocGF5LGF4ZmVyLHVpbnQ2NCx1aW50NjQsdWludDY0LGFkZHJlc3MsdWludDY0LGFkZHJlc3Msc3RyaW5nLGJ5dGVbMzJdW10pdWludDY0IiwgbWV0aG9kICJsaXN0UHJpemVCb3goYXBwbCxwYXksdWludDY0LHVpbnQ2NCx1aW50NjQsYWRkcmVzcyx1aW50NjQsYWRkcmVzcyl1aW50NjQiLCBtZXRob2QgImdhdGVkUHVyY2hhc2UocGF5LGFwcGwsdWludDY0LGFkZHJlc3Mpdm9pZCIsIG1ldGhvZCAicHVyY2hhc2UocGF5LHVpbnQ2NCxhZGRyZXNzKXZvaWQiLCBtZXRob2QgImdhdGVkUHVyY2hhc2VBc2EoYXhmZXIsYXBwbCx1aW50NjQsYWRkcmVzcyl2b2lkIiwgbWV0aG9kICJwdXJjaGFzZUFzYShheGZlcix1aW50NjQsYWRkcmVzcyl2b2lkIiwgbWV0aG9kICJkZWxpc3QodWludDY0KXZvaWQiCiAgICBieXRlYyAxMSAvLyBtZXRob2QgImluaXRCb3hlZENvbnRyYWN0KHN0cmluZyx1aW50NjQpdm9pZCIKICAgIHB1c2hieXRlc3MgMHhkY2EyZDg2MiAweGQzNDZiMWE0IDB4Mzk0ZWFlYjIgMHgzM2Y3ODgwOCAweDFlYWQyMGE5IDB4MzNlOTJjOTQgMHg4NTRkZWRlMCAvLyBtZXRob2QgImxvYWRCb3hlZENvbnRyYWN0KHVpbnQ2NCxieXRlW10pdm9pZCIsIG1ldGhvZCAiZGVsZXRlQm94ZWRDb250cmFjdCgpdm9pZCIsIG1ldGhvZCAib3B0SW4ocGF5LHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJvcHRJbkNvc3QodWludDY0KXVpbnQ2NCIsIG1ldGhvZCAidXBkYXRlQWtpdGFEQU9Fc2Nyb3codWludDY0KXZvaWQiLCBtZXRob2QgInVwZGF0ZUFraXRhREFPKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJvcFVwKCl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggbGlzdCBsaXN0UHJpemVCb3ggZ2F0ZWRQdXJjaGFzZSBwdXJjaGFzZSBnYXRlZFB1cmNoYXNlQXNhIHB1cmNoYXNlQXNhIGRlbGlzdCBpbml0Qm94ZWRDb250cmFjdCBsb2FkQm94ZWRDb250cmFjdCBkZWxldGVCb3hlZENvbnRyYWN0IG9wdEluIG9wdEluQ29zdCB1cGRhdGVBa2l0YURBT0VzY3JvdyB1cGRhdGVBa2l0YURBTyBtYWluX29wVXBfcm91dGVAMTkKICAgIGVycgoKbWFpbl9vcFVwX3JvdXRlQDE5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDMKICAgIC8vIG9wVXAoKTogdm9pZCB7IH0KICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCm1haW5fY3JlYXRlX05vT3BAMjE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxOAogICAgLy8gZXhwb3J0IGNsYXNzIE1hcmtldHBsYWNlIGV4dGVuZHMgRmFjdG9yeUNvbnRyYWN0IHsKICAgIHB1c2hieXRlcyAweGM0MjZmNGJhIC8vIG1ldGhvZCAiY3JlYXRlKHN0cmluZyxzdHJpbmcsdWludDY0LHVpbnQ2NCl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggY3JlYXRlCiAgICBlcnIKCm1haW5fdXBkYXRlX3JvdXRlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICB0eG4gT25Db21wbGV0aW9uCiAgICBwdXNoaW50IDQgLy8gVXBkYXRlQXBwbGljYXRpb24KICAgID09CiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgJiYKICAgIGFzc2VydCAvLyBPbkNvbXBsZXRpb24gbXVzdCBiZSBVcGRhdGVBcHBsaWNhdGlvbiAmJiBjYW4gb25seSBjYWxsIHdoZW4gbm90IGNyZWF0aW5nCiAgICBiIHVwZGF0ZQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Om9yaWdpbk9yVHhuU2VuZGVyKHdhbGxldElEOiB1aW50NjQpIC0+IGJ5dGVzOgpvcmlnaW5PclR4blNlbmRlcjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTQ5CiAgICAvLyBleHBvcnQgZnVuY3Rpb24gb3JpZ2luT3JUeG5TZW5kZXIod2FsbGV0SUQ6IEFwcGxpY2F0aW9uKTogQWNjb3VudCB7CiAgICBwcm90byAxIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTUwCiAgICAvLyByZXR1cm4gb3JpZ2luT3Iod2FsbGV0SUQsIFR4bi5zZW5kZXIpCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE0MwogICAgLy8gaWYgKHdhbGxldElELmlkID09PSAwKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGJueiBvcmlnaW5PclR4blNlbmRlcl9hZnRlcl9pZl9lbHNlQDMKICAgIGZyYW1lX2RpZyAwCgpvcmlnaW5PclR4blNlbmRlcl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Om9yaWdpbk9yQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE1MAogICAgLy8gcmV0dXJuIG9yaWdpbk9yKHdhbGxldElELCBUeG4uc2VuZGVyKQogICAgc3dhcAogICAgcmV0c3ViCgpvcmlnaW5PclR4blNlbmRlcl9hZnRlcl9pZl9lbHNlQDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE2NS0xNjgKICAgIC8vIGNvbnN0IFtjb250cm9sbGVkQWNjb3VudEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKAogICAgLy8gICB3YWxsZXRJRCwKICAgIC8vICAgQnl0ZXMoQWJzdHJhY3RBY2NvdW50R2xvYmFsU3RhdGVLZXlzQ29udHJvbGxlZEFkZHJlc3MpCiAgICAvLyApCiAgICBmcmFtZV9kaWcgLTEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTY3CiAgICAvLyBCeXRlcyhBYnN0cmFjdEFjY291bnRHbG9iYWxTdGF0ZUtleXNDb250cm9sbGVkQWRkcmVzcykKICAgIHB1c2hieXRlcyAiY29udHJvbGxlZF9hZGRyZXNzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNjUtMTY4CiAgICAvLyBjb25zdCBbY29udHJvbGxlZEFjY291bnRCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcygKICAgIC8vICAgd2FsbGV0SUQsCiAgICAvLyAgIEJ5dGVzKEFic3RyYWN0QWNjb3VudEdsb2JhbFN0YXRlS2V5c0NvbnRyb2xsZWRBZGRyZXNzKQogICAgLy8gKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNTAKICAgIC8vIHJldHVybiBvcmlnaW5Pcih3YWxsZXRJRCwgVHhuLnNlbmRlcikKICAgIGIgb3JpZ2luT3JUeG5TZW5kZXJfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpvcmlnaW5PckA0CgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6Z2V0V2FsbGV0SURVc2luZ0FraXRhREFPKGFraXRhREFPOiB1aW50NjQsIGFkZHJlc3M6IGJ5dGVzKSAtPiB1aW50NjQ6CmdldFdhbGxldElEVXNpbmdBa2l0YURBTzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTgwCiAgICAvLyBleHBvcnQgZnVuY3Rpb24gZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPKGFraXRhREFPOiBBcHBsaWNhdGlvbiwgYWRkcmVzczogQWNjb3VudCk6IEFwcGxpY2F0aW9uIHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1OQogICAgLy8gY29uc3QgW290aGVyQXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c090aGVyQXBwTGlzdCkpCiAgICBmcmFtZV9kaWcgLTIKICAgIHB1c2hieXRlcyAib2FsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NAogICAgLy8gcmV0dXJuIGdldE90aGVyQXBwTGlzdChha2l0YURBTykuZXNjcm93CiAgICBwdXNoaW50IDI0IC8vIDI0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxODYtMTg5CiAgICAvLyBjb25zdCBkYXRhID0gYWJpQ2FsbDx0eXBlb2YgRXNjcm93RmFjdG9yeS5wcm90b3R5cGUuZ2V0Pih7CiAgICAvLyAgIGFwcElkOiBlc2Nyb3dGYWN0b3J5LAogICAgLy8gICBhcmdzOiBbYWRkcmVzc10KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICBwdXNoYnl0ZXMgMHgzYzFhNmYzMyAvLyBtZXRob2QgImdldChhZGRyZXNzKWJ5dGVbXSIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIGludGNfMyAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIGRpZyAxCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWMgNCAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBwdXNoaW50IDIgLy8gMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciAobGVuK3VpbnQ4W10pCiAgICBleHRyYWN0IDYgMAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE5MQogICAgLy8gaWYgKEJ5dGVzKGRhdGEpLmxlbmd0aCA9PT0gMCB8fCBCeXRlcyhkYXRhKS5sZW5ndGggIT09IDgpIHsKICAgIGxlbgogICAgZHVwCiAgICBieiBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU9faWZfYm9keUA2CiAgICBmcmFtZV9kaWcgMQogICAgaW50Y18yIC8vIDgKICAgICE9CiAgICBieiBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU9fYWZ0ZXJfaWZfZWxzZUA3CgpnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU9faWZfYm9keUA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxOTIKICAgIC8vIHJldHVybiAwCiAgICBpbnRjXzAgLy8gMAoKZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6Z2V0V2FsbGV0SURAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTgyCiAgICAvLyByZXR1cm4gQXBwbGljYXRpb24oZ2V0V2FsbGV0SUQoZXNjcm93RmFjdG9yeSwgYWRkcmVzcykpCiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPX2FmdGVyX2lmX2Vsc2VANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTk1CiAgICAvLyByZXR1cm4gYnRvaShkYXRhKQogICAgZnJhbWVfZGlnIDAKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTgyCiAgICAvLyByZXR1cm4gQXBwbGljYXRpb24oZ2V0V2FsbGV0SUQoZXNjcm93RmFjdG9yeSwgYWRkcmVzcykpCiAgICBiIGdldFdhbGxldElEVXNpbmdBa2l0YURBT19hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmdldFdhbGxldElEQDgKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpnYXRlQ2hlY2soZ2F0ZVR4bjogdWludDY0LCBha2l0YURBTzogdWludDY0LCBjYWxsZXI6IGJ5dGVzLCBpZDogdWludDY0KSAtPiB1aW50NjQ6CmdhdGVDaGVjazoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjMxCiAgICAvLyBleHBvcnQgZnVuY3Rpb24gZ2F0ZUNoZWNrKGdhdGVUeG46IGd0eG4uQXBwbGljYXRpb25DYWxsVHhuLCBha2l0YURBTzogQXBwbGljYXRpb24sIGNhbGxlcjogQWNjb3VudCwgaWQ6IHVpbnQ2NCk6IGJvb2xlYW4gewogICAgcHJvdG8gNCAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIzMwogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgZnJhbWVfZGlnIC00CiAgICBndHhucyBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICBmcmFtZV9kaWcgLTMKICAgIGJ5dGVjIDYgLy8gImFhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjMzCiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICBwdXNoaW50IDQwIC8vIDQwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjMzLTIzNAogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgYnogZ2F0ZUNoZWNrX2Jvb2xfZmFsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMzQKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIGZyYW1lX2RpZyAtNAogICAgZ3R4bnMgT25Db21wbGV0aW9uCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIzMy0yMzQKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIGJueiBnYXRlQ2hlY2tfYm9vbF9mYWxzZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIzNQogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICBmcmFtZV9kaWcgLTQKICAgIGd0eG5zIE51bUFwcEFyZ3MKICAgIHB1c2hpbnQgNCAvLyA0CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMzMtMjM1CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIGJ6IGdhdGVDaGVja19ib29sX2ZhbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjM2CiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBHYXRlLnByb3RvdHlwZS5tdXN0Q2hlY2s+KCkgJiYKICAgIGZyYW1lX2RpZyAtNAogICAgaW50Y18wIC8vIDAKICAgIGd0eG5zYXMgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoYnl0ZXMgMHg0MzkyMjY1NSAvLyBtZXRob2QgIm11c3RDaGVjayhhZGRyZXNzLHVpbnQ2NCxieXRlW11bXSl2b2lkIgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjMzLTIzNgogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBHYXRlLnByb3RvdHlwZS5tdXN0Q2hlY2s+KCkgJiYKICAgIGJ6IGdhdGVDaGVja19ib29sX2ZhbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjM3CiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMSkgPT09IG5ldyBBZGRyZXNzKGNhbGxlcikuYnl0ZXMgJiYKICAgIGZyYW1lX2RpZyAtNAogICAgaW50Y18xIC8vIDEKICAgIGd0eG5zYXMgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTIKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIzMy0yMzcKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgR2F0ZS5wcm90b3R5cGUubXVzdENoZWNrPigpICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMSkgPT09IG5ldyBBZGRyZXNzKGNhbGxlcikuYnl0ZXMgJiYKICAgIGJ6IGdhdGVDaGVja19ib29sX2ZhbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjM4CiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMikgPT09IGl0b2IoaWQpCiAgICBmcmFtZV9kaWcgLTQKICAgIHB1c2hpbnQgMiAvLyAyCiAgICBndHhuc2FzIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC0xCiAgICBpdG9iCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMzMtMjM4CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIEdhdGUucHJvdG90eXBlLm11c3RDaGVjaz4oKSAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBuZXcgQWRkcmVzcyhjYWxsZXIpLmJ5dGVzICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMikgPT09IGl0b2IoaWQpCiAgICBieiBnYXRlQ2hlY2tfYm9vbF9mYWxzZUA3CiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMzItMjM5CiAgICAvLyByZXR1cm4gKAogICAgLy8gICBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyAgIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vICAgZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICAvLyAgIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIEdhdGUucHJvdG90eXBlLm11c3RDaGVjaz4oKSAmJgogICAgLy8gICBnYXRlVHhuLmFwcEFyZ3MoMSkgPT09IG5ldyBBZGRyZXNzKGNhbGxlcikuYnl0ZXMgJiYKICAgIC8vICAgZ2F0ZVR4bi5hcHBBcmdzKDIpID09PSBpdG9iKGlkKQogICAgLy8gKQogICAgcmV0c3ViCgpnYXRlQ2hlY2tfYm9vbF9mYWxzZUA3OgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjMyLTIzOQogICAgLy8gcmV0dXJuICgKICAgIC8vICAgZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gICBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyAgIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgLy8gICBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBHYXRlLnByb3RvdHlwZS5tdXN0Q2hlY2s+KCkgJiYKICAgIC8vICAgZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBuZXcgQWRkcmVzcyhjYWxsZXIpLmJ5dGVzICYmCiAgICAvLyAgIGdhdGVUeG4uYXBwQXJncygyKSA9PT0gaXRvYihpZCkKICAgIC8vICkKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnJld2FyZHNPcHRJbkNvc3QoYWtpdGFEQU86IHVpbnQ2NCwgYXNzZXQ6IHVpbnQ2NCkgLT4gdWludDY0OgpyZXdhcmRzT3B0SW5Db3N0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MDgKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiByZXdhcmRzT3B0SW5Db3N0KGFraXRhREFPOiBBcHBsaWNhdGlvbiwgYXNzZXQ6IHVpbnQ2NCk6IHVpbnQ2NCB7CiAgICBwcm90byAyIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTA5CiAgICAvLyBpZiAoYXNzZXQgIT09IDApIHsKICAgIGZyYW1lX2RpZyAtMQogICAgYnogcmV3YXJkc09wdEluQ29zdF9hZnRlcl9pZl9lbHNlQDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0KSkKICAgIGZyYW1lX2RpZyAtMgogICAgYnl0ZWMgNiAvLyAiYWFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MTAKICAgIC8vIGNvbnN0IHJld2FyZHNBcHAgPSBnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLnJld2FyZHMKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MTEKICAgIC8vIGlmICghQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcy5pc09wdGVkSW4oQXNzZXQoYXNzZXQpKSkgewogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZnJhbWVfZGlnIC0xCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYm56IHJld2FyZHNPcHRJbkNvc3RfYWZ0ZXJfaWZfZWxzZUA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUxMgogICAgLy8gcmV0dXJuIEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICByZXRzdWIKCnJld2FyZHNPcHRJbkNvc3RfYWZ0ZXJfaWZfZWxzZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MTUKICAgIC8vIHJldHVybiAwCiAgICBpbnRjXzAgLy8gMAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6c3BsaXRPcHRJbkNvdW50KGFraXRhREFPOiB1aW50NjQsIGVzY3JvdzogYnl0ZXMsIGFzc2V0OiB1aW50NjQpIC0+IHVpbnQ2NDoKc3BsaXRPcHRJbkNvdW50OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MjEKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiBzcGxpdE9wdEluQ291bnQoYWtpdGFEQU86IEFwcGxpY2F0aW9uLCBlc2Nyb3c6IEFjY291bnQsIGFzc2V0OiBBc3NldCk6IHVpbnQ2NCB7CiAgICBwcm90byAzIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjIyCiAgICAvLyBsZXQgY291bnQ6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYyNAogICAgLy8gaWYgKCFlc2Nyb3cuaXNPcHRlZEluKGFzc2V0KSkgewogICAgZnJhbWVfZGlnIC0yCiAgICBmcmFtZV9kaWcgLTEKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBibnogc3BsaXRPcHRJbkNvdW50X2FmdGVyX2lmX2Vsc2VAMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDMKICAgIC8vIGNvbnN0IFtzcGxpdHNCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNSZXZlbnVlU3BsaXRzKSkKICAgIGZyYW1lX2RpZyAtMwogICAgcHVzaGJ5dGVzICJyZXZlbnVlX3NwbGl0cyIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjI4CiAgICAvLyBjb3VudCArPSBzcGxpdHMubGVuZ3RoCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjI1CiAgICAvLyBjb3VudCArPSAxCiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MjgKICAgIC8vIGNvdW50ICs9IHNwbGl0cy5sZW5ndGgKICAgICsKICAgIGZyYW1lX2J1cnkgMAoKc3BsaXRPcHRJbkNvdW50X2FmdGVyX2lmX2Vsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjMxCiAgICAvLyByZXR1cm4gY291bnQKICAgIGZyYW1lX2RpZyAwCiAgICBzd2FwCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo6TWFya2V0cGxhY2UuY3JlYXRlW3JvdXRpbmddKCkgLT4gdm9pZDoKY3JlYXRlOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjQKICAgIC8vIEBhYmltZXRob2QoeyBvbkNyZWF0ZTogJ3JlcXVpcmUnIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgcHVzaGludCAyIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIChsZW4rdXRmOFtdKQogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBwdXNoaW50IDIgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgKGxlbit1dGY4W10pCiAgICBleHRyYWN0IDIgMAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gdmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5VmVyc2lvbiB9KQogICAgYnl0ZWMgMTIgLy8gInZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyNgogICAgLy8gdGhpcy52ZXJzaW9uLnZhbHVlID0gdmVyc2lvbgogICAgdW5jb3ZlciA0CiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MzQKICAgIC8vIGNoaWxkQ29udHJhY3RWZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogQmFzZUZhY3RvcnlHbG9iYWxTdGF0ZUtleUNoaWxkQ29udHJhY3RWZXJzaW9uIH0pCiAgICBieXRlYyA3IC8vICJjaGlsZF9jb250cmFjdF92ZXJzaW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjcKICAgIC8vIHRoaXMuY2hpbGRDb250cmFjdFZlcnNpb24udmFsdWUgPSBjaGlsZFZlcnNpb24KICAgIHVuY292ZXIgMwogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI5CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjgKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUgPSBha2l0YURBTwogICAgdW5jb3ZlciAyCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NjUKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlY18xIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyOQogICAgLy8gdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSA9IGFraXRhREFPRXNjcm93CiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjQKICAgIC8vIEBhYmltZXRob2QoeyBvbkNyZWF0ZTogJ3JlcXVpcmUnIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6Ok1hcmtldHBsYWNlLmxpc3Rbcm91dGluZ10oKSAtPiB2b2lkOgpsaXN0OgogICAgaW50Y18wIC8vIDAKICAgIHB1c2hieXRlcyAiIgogICAgZHVwbiA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozNC00NQogICAgLy8gbGlzdCgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgcHJpY2U6IHVpbnQ2NCwKICAgIC8vICAgcGF5bWVudEFzc2V0OiB1aW50NjQsIC8vIDAgfCBBc3NldAogICAgLy8gICBleHBpcmF0aW9uOiB1aW50NjQsCiAgICAvLyAgIHJlc2VydmVkRm9yOiBBY2NvdW50LAogICAgLy8gICBnYXRlSUQ6IHVpbnQ2NCwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQsCiAgICAvLyAgIG5hbWU6IHN0cmluZywKICAgIC8vICAgcHJvb2Y6IFByb29mCiAgICAvLyApOiB1aW50NjQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIHB1c2hpbnQgMiAvLyAyCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNCAvLyBheGZlcgogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGF4ZmVyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXBuIDIKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICBjb3ZlciAyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBjb3ZlciAzCiAgICBsZW4KICAgIHB1c2hpbnQgMzIgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ4WzMyXQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQogICAgZHVwCiAgICBjb3ZlciAzCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDYKICAgIGR1cAogICAgY292ZXIgMwogICAgbGVuCiAgICBwdXNoaW50IDMyIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50OFszMl0KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDcKICAgIGR1cAogICAgY292ZXIgMwogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIHB1c2hpbnQgMiAvLyAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIChsZW4rdXRmOFtdKQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgOAogICAgZHVwCiAgICBjb3ZlciAzCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgZHVwCiAgICBjb3ZlciA0CiAgICBwdXNoaW50IDMyIC8vIDMyCiAgICAqCiAgICBwdXNoaW50IDIgLy8gMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciAobGVuK3VpbnQ4WzMyXVtdKQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDcKICAgIC8vIGFzc2VydChwcmljZSA+PSA0LCBFUlJfUFJJQ0VfVE9PX0xPVykKICAgIHN3YXAKICAgIHB1c2hpbnQgNCAvLyA0CiAgICA+PQogICAgYXNzZXJ0IC8vIExvd2VzdCBwcmljZSBpcyA0IHVuaXRzIGZvciBkaXZpc2liaWxpdHkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjM4CiAgICAvLyBib3hlZENvbnRyYWN0ID0gQm94PGJ5dGVzPih7IGtleTogQm94S2V5Qm94ZWRDb250cmFjdCB9KQogICAgYnl0ZWNfMiAvLyAiYmMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0OAogICAgLy8gYXNzZXJ0KHRoaXMuYm94ZWRDb250cmFjdC5leGlzdHMsIEVSUl9DT05UUkFDVF9OT1RfU0VUKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBhc3NlcnQgLy8gQ29udHJhY3Qgbm90IHNldAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NTEtNTMKICAgIC8vIGNvbnN0IG9wdGluTUJSOiB1aW50NjQgPSBpc0FsZ29QYXltZW50CiAgICAvLyAgID8gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICAvLyAgIDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogMgogICAgYm56IGxpc3RfdGVybmFyeV9mYWxzZUAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo1MgogICAgLy8gPyBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgYnVyeSAxNQoKbGlzdF90ZXJuYXJ5X21lcmdlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo2MgogICAgLy8gbGV0IGRpc2J1cnNlbWVudE1CUjogdWludDY0ID0gZGlzYnVyc2VtZW50Q29zdCgxKSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgYXNzZXRYZmVyLnhmZXJBc3NldC5pZCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyOQogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjYyCiAgICAvLyBsZXQgZGlzYnVyc2VtZW50TUJSOiB1aW50NjQgPSBkaXNidXJzZW1lbnRDb3N0KDEpICsgcmV3YXJkc09wdEluQ29zdCh0aGlzLmFraXRhREFPLnZhbHVlLCBhc3NldFhmZXIueGZlckFzc2V0LmlkKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyAxMQogICAgZ3R4bnMgWGZlckFzc2V0CiAgICBkdXAKICAgIGJ1cnkgMjEKICAgIGNhbGxzdWIgcmV3YXJkc09wdEluQ29zdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MDEKICAgIC8vIHJldHVybiAoTWluRGlzYnVyc2VtZW50c01CUiArIFVzZXJBbGxvY2F0aW9uTUJSKSAqIGNvdW50CiAgICBpbnRjIDQgLy8gNjA2MDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjYyCiAgICAvLyBsZXQgZGlzYnVyc2VtZW50TUJSOiB1aW50NjQgPSBkaXNidXJzZW1lbnRDb3N0KDEpICsgcmV3YXJkc09wdEluQ29zdCh0aGlzLmFraXRhREFPLnZhbHVlLCBhc3NldFhmZXIueGZlckFzc2V0LmlkKQogICAgKwogICAgYnVyeSAxNwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NjMKICAgIC8vIGlmIChpc0FsZ29QYXltZW50KSB7CiAgICBkaWcgNwogICAgYm56IGxpc3RfZWxzZV9ib2R5QDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjY0CiAgICAvLyBkaXNidXJzZW1lbnRNQlIgKz0gZGlzYnVyc2VtZW50Q29zdCgxKQogICAgZGlnIDE2CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUwMQogICAgLy8gcmV0dXJuIChNaW5EaXNidXJzZW1lbnRzTUJSICsgVXNlckFsbG9jYXRpb25NQlIpICogY291bnQKICAgIGludGMgNCAvLyA2MDYwMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NjQKICAgIC8vIGRpc2J1cnNlbWVudE1CUiArPSBkaXNidXJzZW1lbnRDb3N0KDEpCiAgICArCiAgICBidXJ5IDE3CgpsaXN0X2FmdGVyX2lmX2Vsc2VANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjcwLTcyCiAgICAvLyBjb25zdCBlc2Nyb3dPcHRJbkNvc3Q6IHVpbnQ2NCA9IGlzQWxnb1BheW1lbnQKICAgIC8vICAgPyAwCiAgICAvLyAgIDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYWRkcmVzcywgQXNzZXQocGF5bWVudEFzc2V0KSkKICAgIGRpZyA3CiAgICBibnogbGlzdF90ZXJuYXJ5X2ZhbHNlQDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjcxCiAgICAvLyA/IDAKICAgIGludGNfMCAvLyAwCgpsaXN0X3Rlcm5hcnlfbWVyZ2VAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo3NAogICAgLy8gY29uc3QgY2hpbGRBcHBNQlI6IHVpbnQ2NCA9IEdsb2JhbC5taW5CYWxhbmNlICsgb3B0aW5NQlIgKyBkaXNidXJzZW1lbnRNQlIgKyBlc2Nyb3dPcHRJbkNvc3QKICAgIGdsb2JhbCBNaW5CYWxhbmNlCiAgICBkaWcgMTYKICAgICsKICAgIGRpZyAxOAogICAgKwogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NzYtNzgKICAgIC8vIE1JTl9QUk9HUkFNX1BBR0VTICogKDEgKyBsaXN0aW5nLmV4dHJhUHJvZ3JhbVBhZ2VzKSArCiAgICAvLyAoR0xPQkFMX1NUQVRFX0tFWV9VSU5UX0NPU1QgKiBsaXN0aW5nLmdsb2JhbFVpbnRzKSArCiAgICAvLyAoR0xPQkFMX1NUQVRFX0tFWV9CWVRFU19DT1NUICogbGlzdGluZy5nbG9iYWxCeXRlcykgKwogICAgaW50YyA1IC8vIDczNTAwMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NzYtNzkKICAgIC8vIE1JTl9QUk9HUkFNX1BBR0VTICogKDEgKyBsaXN0aW5nLmV4dHJhUHJvZ3JhbVBhZ2VzKSArCiAgICAvLyAoR0xPQkFMX1NUQVRFX0tFWV9VSU5UX0NPU1QgKiBsaXN0aW5nLmdsb2JhbFVpbnRzKSArCiAgICAvLyAoR0xPQkFMX1NUQVRFX0tFWV9CWVRFU19DT1NUICogbGlzdGluZy5nbG9iYWxCeXRlcykgKwogICAgLy8gY2hpbGRBcHBNQlIKICAgICsKICAgIGR1cAogICAgYnVyeSAxNAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6ODMtOTAKICAgIC8vIGFzc2VydE1hdGNoKAogICAgLy8gICBwYXltZW50LAogICAgLy8gICB7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogdG90YWxNQlIKICAgIC8vICAgfSwKICAgIC8vICAgRVJSX0lOVkFMSURfUEFZTUVOVAogICAgLy8gKQogICAgZGlnIDEyCiAgICBkdXAKICAgIGd0eG5zIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo4NgogICAgLy8gcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjgzLTkwCiAgICAvLyBhc3NlcnRNYXRjaCgKICAgIC8vICAgcGF5bWVudCwKICAgIC8vICAgewogICAgLy8gICAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IHRvdGFsTUJSCiAgICAvLyAgIH0sCiAgICAvLyAgIEVSUl9JTlZBTElEX1BBWU1FTlQKICAgIC8vICkKICAgID09CiAgICBzd2FwCiAgICBndHhucyBBbW91bnQKICAgIHVuY292ZXIgMgogICAgPT0KICAgICYmCiAgICBhc3NlcnQgLy8gSW52YWxpZCBwYXltZW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo5My0xMDEKICAgIC8vIGFzc2VydE1hdGNoKAogICAgLy8gICBhc3NldFhmZXIsCiAgICAvLyAgIHsKICAgIC8vICAgICBzZW5kZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IHsgZ3JlYXRlclRoYW46IDAgfSwKICAgIC8vICAgfSwKICAgIC8vICAgRVJSX0lOVkFMSURfUEFZTUVOVAogICAgLy8gKQogICAgZGlnIDEwCiAgICBkdXAKICAgIGd0eG5zIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6OTYKICAgIC8vIHNlbmRlcjogVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjkzLTEwMQogICAgLy8gYXNzZXJ0TWF0Y2goCiAgICAvLyAgIGFzc2V0WGZlciwKICAgIC8vICAgewogICAgLy8gICAgIHNlbmRlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogeyBncmVhdGVyVGhhbjogMCB9LAogICAgLy8gICB9LAogICAgLy8gICBFUlJfSU5WQUxJRF9QQVlNRU5UCiAgICAvLyApCiAgICA9PQogICAgZGlnIDEKICAgIGd0eG5zIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjk3CiAgICAvLyBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo5My0xMDEKICAgIC8vIGFzc2VydE1hdGNoKAogICAgLy8gICBhc3NldFhmZXIsCiAgICAvLyAgIHsKICAgIC8vICAgICBzZW5kZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IHsgZ3JlYXRlclRoYW46IDAgfSwKICAgIC8vICAgfSwKICAgIC8vICAgRVJSX0lOVkFMSURfUEFZTUVOVAogICAgLy8gKQogICAgPT0KICAgICYmCiAgICBzd2FwCiAgICBndHhucyBBc3NldEFtb3VudAogICAgZHVwCiAgICBidXJ5IDE2CiAgICAmJgogICAgYXNzZXJ0IC8vIEludmFsaWQgcGF5bWVudAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTAzCiAgICAvLyBjb25zdCBjcmVhdG9yUm95YWx0eSA9IHJveWFsdGllcyh0aGlzLmFraXRhREFPLnZhbHVlLCBhc3NldFhmZXIueGZlckFzc2V0LCBuYW1lLCBwcm9vZikKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyOQogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjEwMwogICAgLy8gY29uc3QgY3JlYXRvclJveWFsdHkgPSByb3lhbHRpZXModGhpcy5ha2l0YURBTy52YWx1ZSwgYXNzZXRYZmVyLnhmZXJBc3NldCwgbmFtZSwgcHJvb2YpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgYnVyeSAyMQogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0MTgKICAgIC8vIGxldCBjcmVhdG9yUm95YWx0eTogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIGJ1cnkgMTgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDIwCiAgICAvLyBpZiAoIShwcm9vZi5sZW5ndGggPiAwKSkgewogICAgZHVwCiAgICBibnogbGlzdF9hZnRlcl9pZl9lbHNlQDI0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQyMQogICAgLy8gcmV0dXJuIENyZWF0b3JSb3lhbHR5RGVmYXVsdAogICAgcHVzaGludCA1MDAwIC8vIDUwMDAKICAgIGJ1cnkgMTgKCmxpc3RfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpyb3lhbHRpZXNAMjk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czozOAogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzIgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTA2CiAgICAvLyBjb25zdCBhcHByb3ZhbFByb2dyYW0gPSB0aGlzLmJveGVkQ29udHJhY3QuZXh0cmFjdCgwLCB0aGlzLmJveGVkQ29udHJhY3QubGVuZ3RoKQogICAgYm94X2xlbgogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjM4CiAgICAvLyBib3hlZENvbnRyYWN0ID0gQm94PGJ5dGVzPih7IGtleTogQm94S2V5Qm94ZWRDb250cmFjdCB9KQogICAgYnl0ZWNfMiAvLyAiYmMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxMDYKICAgIC8vIGNvbnN0IGFwcHJvdmFsUHJvZ3JhbSA9IHRoaXMuYm94ZWRDb250cmFjdC5leHRyYWN0KDAsIHRoaXMuYm94ZWRDb250cmFjdC5sZW5ndGgpCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBib3hfZXh0cmFjdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTA5LTEyOQogICAgLy8gY29uc3QgbGlzdGluZ0FwcCA9IGxpc3RpbmcuY2FsbAogICAgLy8gICAuY3JlYXRlKHsKICAgIC8vICAgICBhcmdzOiBbCiAgICAvLyAgICAgICBhc3NldFhmZXIueGZlckFzc2V0LmlkLAogICAgLy8gICAgICAgZmFsc2UsCiAgICAvLyAgICAgICBwcmljZSwKICAgIC8vICAgICAgIHBheW1lbnRBc3NldCwKICAgIC8vICAgICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgICAgeyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiB0b3RhbE1CUiB9LAogICAgLy8gICAgICAgcmVzZXJ2ZWRGb3IsCiAgICAvLyAgICAgICBjcmVhdG9yUm95YWx0eSwKICAgIC8vICAgICAgIGdhdGVJRCwKICAgIC8vICAgICAgIG1hcmtldHBsYWNlLAogICAgLy8gICAgICAgdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSwKICAgIC8vICAgICAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgICAgICB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLAogICAgLy8gICAgIF0sCiAgICAvLyAgICAgYXBwcm92YWxQcm9ncmFtOiBbYXBwcm92YWxQcm9ncmFtXSwKICAgIC8vICAgICBjbGVhclN0YXRlUHJvZ3JhbTogbGlzdGluZy5jbGVhclN0YXRlUHJvZ3JhbSwKICAgIC8vICAgfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjExMgogICAgLy8gYXNzZXRYZmVyLnhmZXJBc3NldC5pZCwKICAgIGRpZyAxOQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxMTcKICAgIC8vIFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxMTgKICAgIC8vIHsgYWNjb3VudDogcGF5bWVudC5zZW5kZXIsIGFtb3VudDogdG90YWxNQlIgfSwKICAgIGRpZyAxNQogICAgZ3R4bnMgU2VuZGVyCiAgICBkaWcgMTcKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTIwCiAgICAvLyBjcmVhdG9yUm95YWx0eSwKICAgIGRpZyAyMgogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTIzCiAgICAvLyB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjM0CiAgICAvLyBjaGlsZENvbnRyYWN0VmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEJhc2VGYWN0b3J5R2xvYmFsU3RhdGVLZXlDaGlsZENvbnRyYWN0VmVyc2lvbiB9KQogICAgYnl0ZWMgNyAvLyAiY2hpbGRfY29udHJhY3RfdmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjEyMwogICAgLy8gdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTI0CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI5CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTI0CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjEyNQogICAgLy8gdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo2NQogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjEyNQogICAgLy8gdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxMDktMTI5CiAgICAvLyBjb25zdCBsaXN0aW5nQXBwID0gbGlzdGluZy5jYWxsCiAgICAvLyAgIC5jcmVhdGUoewogICAgLy8gICAgIGFyZ3M6IFsKICAgIC8vICAgICAgIGFzc2V0WGZlci54ZmVyQXNzZXQuaWQsCiAgICAvLyAgICAgICBmYWxzZSwKICAgIC8vICAgICAgIHByaWNlLAogICAgLy8gICAgICAgcGF5bWVudEFzc2V0LAogICAgLy8gICAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgICB7IGFjY291bnQ6IHBheW1lbnQuc2VuZGVyLCBhbW91bnQ6IHRvdGFsTUJSIH0sCiAgICAvLyAgICAgICByZXNlcnZlZEZvciwKICAgIC8vICAgICAgIGNyZWF0b3JSb3lhbHR5LAogICAgLy8gICAgICAgZ2F0ZUlELAogICAgLy8gICAgICAgbWFya2V0cGxhY2UsCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlLAogICAgLy8gICAgICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgICAgIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUsCiAgICAvLyAgICAgXSwKICAgIC8vICAgICBhcHByb3ZhbFByb2dyYW06IFthcHByb3ZhbFByb2dyYW1dLAogICAgLy8gICAgIGNsZWFyU3RhdGVQcm9ncmFtOiBsaXN0aW5nLmNsZWFyU3RhdGVQcm9ncmFtLAogICAgLy8gICB9KQogICAgYnl0ZWMgMTMgLy8gbWV0aG9kICJjcmVhdGUodWludDY0LGJvb2wsdWludDY0LHVpbnQ2NCx1aW50NjQsYWRkcmVzcywoYWRkcmVzcyx1aW50NjQpLGFkZHJlc3MsdWludDY0LHVpbnQ2NCxhZGRyZXNzLHN0cmluZyx1aW50NjQsdWludDY0KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZGlnIDYKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxMTMKICAgIC8vIGZhbHNlLAogICAgcHVzaGJ5dGVzIDB4MDAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkaWcgMTgKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkaWcgMTcKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkaWcgMTUKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDUKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkaWcgMTIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkaWcgMTAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkaWcgOQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NTUKICAgIC8vIGNvbnN0IGxpc3RpbmcgPSBjb21waWxlQXJjNChMaXN0aW5nKQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgRXh0cmFQcm9ncmFtUGFnZXMKICAgIHB1c2hpbnQgNSAvLyA1CiAgICBpdHhuX2ZpZWxkIEdsb2JhbE51bUJ5dGVTbGljZQogICAgcHVzaGludCAxMCAvLyAxMAogICAgaXR4bl9maWVsZCBHbG9iYWxOdW1VaW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxMDktMTI5CiAgICAvLyBjb25zdCBsaXN0aW5nQXBwID0gbGlzdGluZy5jYWxsCiAgICAvLyAgIC5jcmVhdGUoewogICAgLy8gICAgIGFyZ3M6IFsKICAgIC8vICAgICAgIGFzc2V0WGZlci54ZmVyQXNzZXQuaWQsCiAgICAvLyAgICAgICBmYWxzZSwKICAgIC8vICAgICAgIHByaWNlLAogICAgLy8gICAgICAgcGF5bWVudEFzc2V0LAogICAgLy8gICAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgICB7IGFjY291bnQ6IHBheW1lbnQuc2VuZGVyLCBhbW91bnQ6IHRvdGFsTUJSIH0sCiAgICAvLyAgICAgICByZXNlcnZlZEZvciwKICAgIC8vICAgICAgIGNyZWF0b3JSb3lhbHR5LAogICAgLy8gICAgICAgZ2F0ZUlELAogICAgLy8gICAgICAgbWFya2V0cGxhY2UsCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlLAogICAgLy8gICAgICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgICAgIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUsCiAgICAvLyAgICAgXSwKICAgIC8vICAgICBhcHByb3ZhbFByb2dyYW06IFthcHByb3ZhbFByb2dyYW1dLAogICAgLy8gICAgIGNsZWFyU3RhdGVQcm9ncmFtOiBsaXN0aW5nLmNsZWFyU3RhdGVQcm9ncmFtLAogICAgLy8gICB9KQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgT25Db21wbGV0aW9uCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo1NQogICAgLy8gY29uc3QgbGlzdGluZyA9IGNvbXBpbGVBcmM0KExpc3RpbmcpCiAgICBieXRlYyAxNCAvLyBiYXNlNjQoQzRFQlF3PT0pCiAgICBpdHhuX2ZpZWxkIENsZWFyU3RhdGVQcm9ncmFtUGFnZXMKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwcm92YWxQcm9ncmFtUGFnZXMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjEwOS0xMjkKICAgIC8vIGNvbnN0IGxpc3RpbmdBcHAgPSBsaXN0aW5nLmNhbGwKICAgIC8vICAgLmNyZWF0ZSh7CiAgICAvLyAgICAgYXJnczogWwogICAgLy8gICAgICAgYXNzZXRYZmVyLnhmZXJBc3NldC5pZCwKICAgIC8vICAgICAgIGZhbHNlLAogICAgLy8gICAgICAgcHJpY2UsCiAgICAvLyAgICAgICBwYXltZW50QXNzZXQsCiAgICAvLyAgICAgICBleHBpcmF0aW9uLAogICAgLy8gICAgICAgVHhuLnNlbmRlciwKICAgIC8vICAgICAgIHsgYWNjb3VudDogcGF5bWVudC5zZW5kZXIsIGFtb3VudDogdG90YWxNQlIgfSwKICAgIC8vICAgICAgIHJlc2VydmVkRm9yLAogICAgLy8gICAgICAgY3JlYXRvclJveWFsdHksCiAgICAvLyAgICAgICBnYXRlSUQsCiAgICAvLyAgICAgICBtYXJrZXRwbGFjZSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRDb250cmFjdFZlcnNpb24udmFsdWUsCiAgICAvLyAgICAgICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICAgICAgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSwKICAgIC8vICAgICBdLAogICAgLy8gICAgIGFwcHJvdmFsUHJvZ3JhbTogW2FwcHJvdmFsUHJvZ3JhbV0sCiAgICAvLyAgICAgY2xlYXJTdGF0ZVByb2dyYW06IGxpc3RpbmcuY2xlYXJTdGF0ZVByb2dyYW0sCiAgICAvLyAgIH0pCiAgICBpbnRjXzMgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTA5LTEzMQogICAgLy8gY29uc3QgbGlzdGluZ0FwcCA9IGxpc3RpbmcuY2FsbAogICAgLy8gICAuY3JlYXRlKHsKICAgIC8vICAgICBhcmdzOiBbCiAgICAvLyAgICAgICBhc3NldFhmZXIueGZlckFzc2V0LmlkLAogICAgLy8gICAgICAgZmFsc2UsCiAgICAvLyAgICAgICBwcmljZSwKICAgIC8vICAgICAgIHBheW1lbnRBc3NldCwKICAgIC8vICAgICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgICAgeyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiB0b3RhbE1CUiB9LAogICAgLy8gICAgICAgcmVzZXJ2ZWRGb3IsCiAgICAvLyAgICAgICBjcmVhdG9yUm95YWx0eSwKICAgIC8vICAgICAgIGdhdGVJRCwKICAgIC8vICAgICAgIG1hcmtldHBsYWNlLAogICAgLy8gICAgICAgdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSwKICAgIC8vICAgICAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgICAgICB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLAogICAgLy8gICAgIF0sCiAgICAvLyAgICAgYXBwcm92YWxQcm9ncmFtOiBbYXBwcm92YWxQcm9ncmFtXSwKICAgIC8vICAgICBjbGVhclN0YXRlUHJvZ3JhbTogbGlzdGluZy5jbGVhclN0YXRlUHJvZ3JhbSwKICAgIC8vICAgfSkKICAgIC8vICAgLml0eG4KICAgIC8vICAgLmNyZWF0ZWRBcHAKICAgIGdpdHhuIDAgQ3JlYXRlZEFwcGxpY2F0aW9uSUQKICAgIGR1cAogICAgYnVyeSAxOQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTM0LTEzOQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IGxpc3RpbmdBcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IEdsb2JhbC5taW5CYWxhbmNlICsgZGlzYnVyc2VtZW50TUJSCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTM2CiAgICAvLyByZWNlaXZlcjogbGlzdGluZ0FwcC5hZGRyZXNzLAogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxMzcKICAgIC8vIGFtb3VudDogR2xvYmFsLm1pbkJhbGFuY2UgKyBkaXNidXJzZW1lbnRNQlIKICAgIGdsb2JhbCBNaW5CYWxhbmNlCiAgICBkaWcgMjEKICAgICsKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxMzQtMTM4CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogbGlzdGluZ0FwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogR2xvYmFsLm1pbkJhbGFuY2UgKyBkaXNidXJzZW1lbnRNQlIKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjEzNC0xMzkKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBsaXN0aW5nQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBHbG9iYWwubWluQmFsYW5jZSArIGRpc2J1cnNlbWVudE1CUgogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxNDItMTUxCiAgICAvLyBsaXN0aW5nLmNhbGwub3B0aW4oewogICAgLy8gICBhcHBJZDogbGlzdGluZ0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogbGlzdGluZ0FwcC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UsCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgYXNzZXRYZmVyLnhmZXJBc3NldC5pZCwKICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxNDYKICAgIC8vIHJlY2VpdmVyOiBsaXN0aW5nQXBwLmFkZHJlc3MsCiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjE0NwogICAgLy8gYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UsCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxNDUtMTQ4CiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogbGlzdGluZ0FwcC5hZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSwKICAgIC8vIH0pLAogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTQyLTE1MQogICAgLy8gbGlzdGluZy5jYWxsLm9wdGluKHsKICAgIC8vICAgYXBwSWQ6IGxpc3RpbmdBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGxpc3RpbmdBcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlLAogICAgLy8gICAgIH0pLAogICAgLy8gICAgIGFzc2V0WGZlci54ZmVyQXNzZXQuaWQsCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICBieXRlYyA5IC8vIG1ldGhvZCAib3B0aW4ocGF5LHVpbnQ2NCl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBPbkNvbXBsZXRpb24KICAgIGR1cAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBpbnRjXzMgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTU0LTE2MAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogbGlzdGluZ0FwcC5hZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhc3NldFhmZXIuYXNzZXRBbW91bnQsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldFhmZXIueGZlckFzc2V0LAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjE1NgogICAgLy8gYXNzZXRSZWNlaXZlcjogbGlzdGluZ0FwcC5hZGRyZXNzLAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgc3dhcAogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGRpZyAxNAogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxNTQtMTU5CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBsaXN0aW5nQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFzc2V0WGZlci5hc3NldEFtb3VudCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0WGZlci54ZmVyQXNzZXQsCiAgICAvLyAgIH0pCiAgICBwdXNoaW50IDQgLy8gNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxNTQtMTYwCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBsaXN0aW5nQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFzc2V0WGZlci5hc3NldEFtb3VudCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0WGZlci54ZmVyQXNzZXQsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjE2MgogICAgLy8gaWYgKCFpc0FsZ29QYXltZW50KSB7CiAgICBkaWcgNwogICAgYnogbGlzdF9hZnRlcl9pZl9lbHNlQDIxCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxNjQtMTczCiAgICAvLyBsaXN0aW5nLmNhbGwub3B0aW4oewogICAgLy8gICBhcHBJZDogbGlzdGluZ0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogbGlzdGluZ0FwcC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBvcHRpbk1CUiwKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBwYXltZW50QXNzZXQsCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTY4CiAgICAvLyByZWNlaXZlcjogbGlzdGluZ0FwcC5hZGRyZXNzLAogICAgZGlnIDE1CiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGRpZyAxNgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjE2Ny0xNzAKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBsaXN0aW5nQXBwLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogb3B0aW5NQlIsCiAgICAvLyB9KSwKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjE2NC0xNzMKICAgIC8vIGxpc3RpbmcuY2FsbC5vcHRpbih7CiAgICAvLyAgIGFwcElkOiBsaXN0aW5nQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBsaXN0aW5nQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG9wdGluTUJSLAogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHBheW1lbnRBc3NldCwKICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIGJ5dGVjIDkgLy8gbWV0aG9kICJvcHRpbihwYXksdWludDY0KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZGlnIDkKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBPbkNvbXBsZXRpb24KICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgaW50Y18zIC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjE3NgogICAgLy8gaWYgKCF0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFkZHJlc3MuaXNPcHRlZEluKEFzc2V0KHBheW1lbnRBc3NldCkpKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NjUKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlY18xIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxNzYKICAgIC8vIGlmICghdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hZGRyZXNzLmlzT3B0ZWRJbihBc3NldChwYXltZW50QXNzZXQpKSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGRpZyA4CiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYm56IGxpc3RfYWZ0ZXJfaWZfZWxzZUAyMQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTc3CiAgICAvLyB0aGlzLm9wdEFraXRhRXNjcm93SW5BbmRTZW5kKEFraXRhREFPRXNjcm93QWNjb3VudE1hcmtldHBsYWNlLCBBc3NldChwYXltZW50QXNzZXQpLCAwKQogICAgYnl0ZWMgMTUgLy8gInJldl9tYXJrZXRwbGFjZSIKICAgIGRpZyA4CiAgICBpbnRjXzAgLy8gMAogICAgY2FsbHN1YiBvcHRBa2l0YUVzY3Jvd0luQW5kU2VuZAogICAgcG9wCgpsaXN0X2FmdGVyX2lmX2Vsc2VAMjE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozNC00NQogICAgLy8gbGlzdCgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgcHJpY2U6IHVpbnQ2NCwKICAgIC8vICAgcGF5bWVudEFzc2V0OiB1aW50NjQsIC8vIDAgfCBBc3NldAogICAgLy8gICBleHBpcmF0aW9uOiB1aW50NjQsCiAgICAvLyAgIHJlc2VydmVkRm9yOiBBY2NvdW50LAogICAgLy8gICBnYXRlSUQ6IHVpbnQ2NCwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQsCiAgICAvLyAgIG5hbWU6IHN0cmluZywKICAgIC8vICAgcHJvb2Y6IFByb29mCiAgICAvLyApOiB1aW50NjQgewogICAgZGlnIDE1CiAgICBpdG9iCiAgICBieXRlYyA0IC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpsaXN0X2FmdGVyX2lmX2Vsc2VAMjQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQyNS00MzUKICAgIC8vIGNvbnN0IGNyZWF0b3JSb3lhbHR5U3RyaW5nID0gYWJpQ2FsbDx0eXBlb2YgTWV0YU1lcmtsZXMucHJvdG90eXBlLnZlcmlmaWVkUmVhZD4oewogICAgLy8gICBhcHBJZDogZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5tZXRhTWVya2xlcywKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGFzc2V0LmNyZWF0b3IsCiAgICAvLyAgICAgbmFtZSwKICAgIC8vICAgICBzaGEyNTYoc2hhMjU2KGl0b2IoYXNzZXQuaWQpKSksCiAgICAvLyAgICAgcHJvb2YsCiAgICAvLyAgICAgMSwKICAgIC8vICAgICAncm95YWx0eScsCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICBkaWcgMTkKICAgIGJ5dGVjIDYgLy8gImFhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDI2CiAgICAvLyBhcHBJZDogZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5tZXRhTWVya2xlcywKICAgIHB1c2hpbnQgNzIgLy8gNzIKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQyOAogICAgLy8gYXNzZXQuY3JlYXRvciwKICAgIGRpZyAxOQogICAgZHVwCiAgICBhc3NldF9wYXJhbXNfZ2V0IEFzc2V0Q3JlYXRvcgogICAgYXNzZXJ0IC8vIGFzc2V0IGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0MzAKICAgIC8vIHNoYTI1NihzaGEyNTYoaXRvYihhc3NldC5pZCkpKSwKICAgIHN3YXAKICAgIGl0b2IKICAgIHNoYTI1NgogICAgc2hhMjU2CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQzMgogICAgLy8gMSwKICAgIGludGNfMSAvLyAxCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQyNS00MzUKICAgIC8vIGNvbnN0IGNyZWF0b3JSb3lhbHR5U3RyaW5nID0gYWJpQ2FsbDx0eXBlb2YgTWV0YU1lcmtsZXMucHJvdG90eXBlLnZlcmlmaWVkUmVhZD4oewogICAgLy8gICBhcHBJZDogZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5tZXRhTWVya2xlcywKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGFzc2V0LmNyZWF0b3IsCiAgICAvLyAgICAgbmFtZSwKICAgIC8vICAgICBzaGEyNTYoc2hhMjU2KGl0b2IoYXNzZXQuaWQpKSksCiAgICAvLyAgICAgcHJvb2YsCiAgICAvLyAgICAgMSwKICAgIC8vICAgICAncm95YWx0eScsCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBwdXNoYnl0ZXMgMHgwY2YxYjljZiAvLyBtZXRob2QgInZlcmlmaWVkUmVhZChhZGRyZXNzLHN0cmluZyxieXRlWzMyXSxieXRlWzMyXVtdLHVpbnQ2NCxzdHJpbmcpc3RyaW5nIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyA1CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyAzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDMzCiAgICAvLyAncm95YWx0eScsCiAgICBwdXNoYnl0ZXMgMHgwMDA3NzI2Zjc5NjE2Yzc0NzkKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDI1LTQzNQogICAgLy8gY29uc3QgY3JlYXRvclJveWFsdHlTdHJpbmcgPSBhYmlDYWxsPHR5cGVvZiBNZXRhTWVya2xlcy5wcm90b3R5cGUudmVyaWZpZWRSZWFkPih7CiAgICAvLyAgIGFwcElkOiBnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLm1ldGFNZXJrbGVzLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgYXNzZXQuY3JlYXRvciwKICAgIC8vICAgICBuYW1lLAogICAgLy8gICAgIHNoYTI1NihzaGEyNTYoaXRvYihhc3NldC5pZCkpKSwKICAgIC8vICAgICBwcm9vZiwKICAgIC8vICAgICAxLAogICAgLy8gICAgICdyb3lhbHR5JywKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGludGNfMyAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIGRpZyAxCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWMgNCAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBwdXNoaW50IDIgLy8gMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciAobGVuK3V0ZjhbXSkKICAgIGV4dHJhY3QgNiAwCiAgICBkdXAKICAgIGJ1cnkgMjIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDM3CiAgICAvLyBpZiAoQnl0ZXMoY3JlYXRvclJveWFsdHlTdHJpbmcpLmxlbmd0aCA+IDApIHsKICAgIGxlbgogICAgYnogbGlzdF9hZnRlcl9pZl9lbHNlQDI2CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQzOAogICAgLy8gY3JlYXRvclJveWFsdHkgPSBidG9pKEJ5dGVzKGNyZWF0b3JSb3lhbHR5U3RyaW5nKSkKICAgIGRpZyAyMAogICAgYnRvaQogICAgYnVyeSAxOAoKbGlzdF9hZnRlcl9pZl9lbHNlQDI2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NDEKICAgIC8vIGlmIChjcmVhdG9yUm95YWx0eSA+IENyZWF0b3JSb3lhbHR5TWF4aW11bVNpbmdsZSkgewogICAgZGlnIDE3CiAgICBpbnRjIDYgLy8gNTAwMDAKICAgID4KICAgIGJ6IGxpc3RfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpyb3lhbHRpZXNAMjkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQyCiAgICAvLyByZXR1cm4gQ3JlYXRvclJveWFsdHlNYXhpbXVtU2luZ2xlCiAgICBpbnRjIDYgLy8gNTAwMDAKICAgIGJ1cnkgMTgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjEwMwogICAgLy8gY29uc3QgY3JlYXRvclJveWFsdHkgPSByb3lhbHRpZXModGhpcy5ha2l0YURBTy52YWx1ZSwgYXNzZXRYZmVyLnhmZXJBc3NldCwgbmFtZSwgcHJvb2YpCiAgICBiIGxpc3RfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpyb3lhbHRpZXNAMjkKCmxpc3RfdGVybmFyeV9mYWxzZUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NzIKICAgIC8vIDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYWRkcmVzcywgQXNzZXQocGF5bWVudEFzc2V0KSkKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI5CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NzIKICAgIC8vIDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYWRkcmVzcywgQXNzZXQocGF5bWVudEFzc2V0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NjUKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlY18xIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo3MgogICAgLy8gOiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiBzcGxpdE9wdEluQ291bnQodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hZGRyZXNzLCBBc3NldChwYXltZW50QXNzZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGRpZyAxMAogICAgY2FsbHN1YiBzcGxpdE9wdEluQ291bnQKICAgICoKICAgIGIgbGlzdF90ZXJuYXJ5X21lcmdlQDEwCgpsaXN0X2Vsc2VfYm9keUA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NjYKICAgIC8vIGRpc2J1cnNlbWVudE1CUiArPSBkaXNidXJzZW1lbnRDb3N0KDUpICsgcmV3YXJkc09wdEluQ29zdCh0aGlzLmFraXRhREFPLnZhbHVlLCBwYXltZW50QXNzZXQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjkKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo2NgogICAgLy8gZGlzYnVyc2VtZW50TUJSICs9IGRpc2J1cnNlbWVudENvc3QoNSkgKyByZXdhcmRzT3B0SW5Db3N0KHRoaXMuYWtpdGFEQU8udmFsdWUsIHBheW1lbnRBc3NldCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgOAogICAgY2FsbHN1YiByZXdhcmRzT3B0SW5Db3N0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUwMQogICAgLy8gcmV0dXJuIChNaW5EaXNidXJzZW1lbnRzTUJSICsgVXNlckFsbG9jYXRpb25NQlIpICogY291bnQKICAgIHB1c2hpbnQgMzAzMDAwIC8vIDMwMzAwMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NjYKICAgIC8vIGRpc2J1cnNlbWVudE1CUiArPSBkaXNidXJzZW1lbnRDb3N0KDUpICsgcmV3YXJkc09wdEluQ29zdCh0aGlzLmFraXRhREFPLnZhbHVlLCBwYXltZW50QXNzZXQpCiAgICArCiAgICBkaWcgMTcKICAgICsKICAgIGJ1cnkgMTcKICAgIGIgbGlzdF9hZnRlcl9pZl9lbHNlQDcKCmxpc3RfdGVybmFyeV9mYWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NTMKICAgIC8vIDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogMgogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBwdXNoaW50IDIgLy8gMgogICAgKgogICAgYnVyeSAxNQogICAgYiBsaXN0X3Rlcm5hcnlfbWVyZ2VANAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjpNYXJrZXRwbGFjZS5saXN0UHJpemVCb3hbcm91dGluZ10oKSAtPiB2b2lkOgpsaXN0UHJpemVCb3g6CiAgICBwdXNoYnl0ZXMgIiIKICAgIGR1cG4gMwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTg0LTE5MwogICAgLy8gbGlzdFByaXplQm94KAogICAgLy8gICBwcml6ZUJveFRyYW5zZmVyVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBwcmljZTogdWludDY0LAogICAgLy8gICBwYXltZW50QXNzZXQ6IHVpbnQ2NCwKICAgIC8vICAgZXhwaXJhdGlvbjogdWludDY0LAogICAgLy8gICByZXNlcnZlZEZvcjogQWNjb3VudCwKICAgIC8vICAgZ2F0ZUlEOiB1aW50NjQsCiAgICAvLyAgIG1hcmtldHBsYWNlOiBBY2NvdW50LAogICAgLy8gKTogdWludDY0IHsKICAgIHR4biBHcm91cEluZGV4CiAgICBwdXNoaW50IDIgLy8gMgogICAgLQogICAgZHVwbiAyCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18zIC8vIGFwcGwKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBhcHBsCiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgY292ZXIgMgogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgY292ZXIgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgY292ZXIgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgY292ZXIgMwogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGxlbgogICAgcHVzaGludCAzMiAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDhbMzJdCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA1CiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNgogICAgZHVwCiAgICBjb3ZlciAzCiAgICBsZW4KICAgIHB1c2hpbnQgMzIgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ4WzMyXQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTk0CiAgICAvLyBhc3NlcnQocHJpY2UgPj0gNCwgRVJSX1BSSUNFX1RPT19MT1cpCiAgICBwdXNoaW50IDQgLy8gNAogICAgPj0KICAgIGFzc2VydCAvLyBMb3dlc3QgcHJpY2UgaXMgNCB1bml0cyBmb3IgZGl2aXNpYmlsaXR5CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czozOAogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzIgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTk1CiAgICAvLyBhc3NlcnQodGhpcy5ib3hlZENvbnRyYWN0LmV4aXN0cywgRVJSX0NPTlRSQUNUX05PVF9TRVQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGFzc2VydCAvLyBDb250cmFjdCBub3Qgc2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxOTgKICAgIC8vIHByaXplQm94VHJhbnNmZXJUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIFByaXplQm94LnByb3RvdHlwZS50cmFuc2Zlcj4oKSAmJgogICAgaW50Y18wIC8vIDAKICAgIGd0eG5zYXMgQXBwbGljYXRpb25BcmdzCiAgICBieXRlYyAxNiAvLyBtZXRob2QgInRyYW5zZmVyKGFkZHJlc3Mpdm9pZCIKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxOTgtMTk5CiAgICAvLyBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBQcml6ZUJveC5wcm90b3R5cGUudHJhbnNmZXI+KCkgJiYKICAgIC8vIHByaXplQm94VHJhbnNmZXJUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AKICAgIGJ6IGxpc3RQcml6ZUJveF9ib29sX2ZhbHNlQDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjE5OQogICAgLy8gcHJpemVCb3hUcmFuc2ZlclR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcAogICAgZGlnIDgKICAgIGd0eG5zIE9uQ29tcGxldGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTk4LTE5OQogICAgLy8gcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgUHJpemVCb3gucHJvdG90eXBlLnRyYW5zZmVyPigpICYmCiAgICAvLyBwcml6ZUJveFRyYW5zZmVyVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wCiAgICBibnogbGlzdFByaXplQm94X2Jvb2xfZmFsc2VANAogICAgaW50Y18xIC8vIDEKCmxpc3RQcml6ZUJveF9ib29sX21lcmdlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxOTctMjAwCiAgICAvLyBhc3NlcnQoKAogICAgLy8gICBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBQcml6ZUJveC5wcm90b3R5cGUudHJhbnNmZXI+KCkgJiYKICAgIC8vICAgcHJpemVCb3hUcmFuc2ZlclR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcAogICAgLy8gKSwgRVJSX0JBRF9NRVRIT0RfUFJJWkVfQk9YX1RSQU5TRkVSX05FRURFRCkKICAgIGFzc2VydCAvLyBCYWQgbWV0aG9kIHByaXplIGJveCB0cmFuc2ZlciBuZWVkZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjIwMQogICAgLy8gYXNzZXJ0KGdldFByaXplQm94T3duZXIodGhpcy5ha2l0YURBTy52YWx1ZSwgcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBJZCkgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfTk9UX1BSSVpFX0JPWF9PV05FUikKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyOQogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjIwMQogICAgLy8gYXNzZXJ0KGdldFByaXplQm94T3duZXIodGhpcy5ha2l0YURBTy52YWx1ZSwgcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBJZCkgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfTk9UX1BSSVpFX0JPWF9PV05FUikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgOQogICAgZ3R4bnMgQXBwbGljYXRpb25JRAogICAgZHVwCiAgICBidXJ5IDEyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0OQogICAgLy8gYXNzZXJ0KHByaXplQm94LmNyZWF0b3IgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykucHJpemVCb3gpLmFkZHJlc3MsIEVSUl9OT1RfQV9QUklaRV9CT1gpCiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcENyZWF0b3IKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0KSkKICAgIHVuY292ZXIgMgogICAgYnl0ZWMgNiAvLyAiYWFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NDkKICAgIC8vIGFzc2VydChwcml6ZUJveC5jcmVhdG9yID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLnByaXplQm94KS5hZGRyZXNzLCBFUlJfTk9UX0FfUFJJWkVfQk9YKQogICAgcHVzaGludCAyNCAvLyAyNAogICAgZXh0cmFjdF91aW50NjQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBhc3NlcnQgLy8gTm90IGEgcHJpemUgYm94CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ1MAogICAgLy8gY29uc3QgW293bmVyQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMocHJpemVCb3gsIEJ5dGVzKFByaXplQm94R2xvYmFsU3RhdGVLZXlPd25lcikpCiAgICBwdXNoYnl0ZXMgIm93bmVyIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjAxCiAgICAvLyBhc3NlcnQoZ2V0UHJpemVCb3hPd25lcih0aGlzLmFraXRhREFPLnZhbHVlLCBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcElkKSA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIEVSUl9OT1RfUFJJWkVfQk9YX09XTkVSKQogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBhc3NlcnQgLy8gTm90IHByaXplIGJveCBvd25lcgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjA0LTIwNgogICAgLy8gY29uc3Qgb3B0aW5NQlI6IHVpbnQ2NCA9IGlzQWxnb1BheW1lbnQKICAgIC8vICAgPyAwCiAgICAvLyAgIDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBkaWcgNAogICAgYm56IGxpc3RQcml6ZUJveF90ZXJuYXJ5X2ZhbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjIwNQogICAgLy8gPyAwCiAgICBpbnRjXzAgLy8gMAogICAgYnVyeSAxMQoKbGlzdFByaXplQm94X3Rlcm5hcnlfbWVyZ2VAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjIxNgogICAgLy8gaWYgKGlzQWxnb1BheW1lbnQpIHsKICAgIGRpZyA0CiAgICBibnogbGlzdFByaXplQm94X2Vsc2VfYm9keUAxMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MDEKICAgIC8vIHJldHVybiAoTWluRGlzYnVyc2VtZW50c01CUiArIFVzZXJBbGxvY2F0aW9uTUJSKSAqIGNvdW50CiAgICBpbnRjIDQgLy8gNjA2MDAKICAgIGJ1cnkgMTMKCmxpc3RQcml6ZUJveF9hZnRlcl9pZl9lbHNlQDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjIzLTIyNQogICAgLy8gY29uc3QgZXNjcm93T3B0SW5Db3N0OiB1aW50NjQgPSBpc0FsZ29QYXltZW50CiAgICAvLyAgID8gMAogICAgLy8gICA6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSAqIHNwbGl0T3B0SW5Db3VudCh0aGlzLmFraXRhREFPLnZhbHVlLCB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFkZHJlc3MsIEFzc2V0KHBheW1lbnRBc3NldCkpCiAgICBkaWcgNAogICAgYm56IGxpc3RQcml6ZUJveF90ZXJuYXJ5X2ZhbHNlQDEzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyMjQKICAgIC8vID8gMAogICAgaW50Y18wIC8vIDAKCmxpc3RQcml6ZUJveF90ZXJuYXJ5X21lcmdlQDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjI3CiAgICAvLyBjb25zdCBjaGlsZEFwcE1CUjogdWludDY0ID0gR2xvYmFsLm1pbkJhbGFuY2UgKyBvcHRpbk1CUiArIGRpc2J1cnNlbWVudE1CUiArIGVzY3Jvd09wdEluQ29zdAogICAgZ2xvYmFsIE1pbkJhbGFuY2UKICAgIGRpZyAxMgogICAgKwogICAgZGlnIDE0CiAgICBkdXAKICAgIGNvdmVyIDIKICAgICsKICAgIHVuY292ZXIgMgogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjI5LTIzMQogICAgLy8gTUlOX1BST0dSQU1fUEFHRVMgKiAoMSArIGxpc3RpbmcuZXh0cmFQcm9ncmFtUGFnZXMpICsKICAgIC8vIChHTE9CQUxfU1RBVEVfS0VZX1VJTlRfQ09TVCAqIGxpc3RpbmcuZ2xvYmFsVWludHMpICsKICAgIC8vIChHTE9CQUxfU1RBVEVfS0VZX0JZVEVTX0NPU1QgKiBsaXN0aW5nLmdsb2JhbEJ5dGVzKSArCiAgICBpbnRjIDUgLy8gNzM1MDAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyMjktMjMyCiAgICAvLyBNSU5fUFJPR1JBTV9QQUdFUyAqICgxICsgbGlzdGluZy5leHRyYVByb2dyYW1QYWdlcykgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfVUlOVF9DT1NUICogbGlzdGluZy5nbG9iYWxVaW50cykgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfQllURVNfQ09TVCAqIGxpc3RpbmcuZ2xvYmFsQnl0ZXMpICsKICAgIC8vIGNoaWxkQXBwTUJSCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyMzUtMjQyCiAgICAvLyBhc3NlcnRNYXRjaCgKICAgIC8vICAgcGF5bWVudCwKICAgIC8vICAgewogICAgLy8gICAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IHRvdGFsTUJSCiAgICAvLyAgIH0sCiAgICAvLyAgIEVSUl9JTlZBTElEX1BBWU1FTlQKICAgIC8vICkKICAgIGRpZyA5CiAgICBkdXAKICAgIGd0eG5zIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyMzgKICAgIC8vIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyMzUtMjQyCiAgICAvLyBhc3NlcnRNYXRjaCgKICAgIC8vICAgcGF5bWVudCwKICAgIC8vICAgewogICAgLy8gICAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IHRvdGFsTUJSCiAgICAvLyAgIH0sCiAgICAvLyAgIEVSUl9JTlZBTElEX1BBWU1FTlQKICAgIC8vICkKICAgID09CiAgICBkaWcgMQogICAgZ3R4bnMgQW1vdW50CiAgICBkaWcgMwogICAgPT0KICAgICYmCiAgICBhc3NlcnQgLy8gSW52YWxpZCBwYXltZW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czozOAogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzIgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjQ1CiAgICAvLyBjb25zdCBhcHByb3ZhbFByb2dyYW0gPSB0aGlzLmJveGVkQ29udHJhY3QuZXh0cmFjdCgwLCB0aGlzLmJveGVkQ29udHJhY3QubGVuZ3RoKQogICAgYm94X2xlbgogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjM4CiAgICAvLyBib3hlZENvbnRyYWN0ID0gQm94PGJ5dGVzPih7IGtleTogQm94S2V5Qm94ZWRDb250cmFjdCB9KQogICAgYnl0ZWNfMiAvLyAiYmMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyNDUKICAgIC8vIGNvbnN0IGFwcHJvdmFsUHJvZ3JhbSA9IHRoaXMuYm94ZWRDb250cmFjdC5leHRyYWN0KDAsIHRoaXMuYm94ZWRDb250cmFjdC5sZW5ndGgpCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBib3hfZXh0cmFjdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjQ4LTI2OAogICAgLy8gY29uc3QgbGlzdGluZ0FwcCA9IGxpc3RpbmcuY2FsbAogICAgLy8gICAuY3JlYXRlKHsKICAgIC8vICAgICBhcmdzOiBbCiAgICAvLyAgICAgICBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcElkLmlkLAogICAgLy8gICAgICAgdHJ1ZSwKICAgIC8vICAgICAgIHByaWNlLAogICAgLy8gICAgICAgcGF5bWVudEFzc2V0LAogICAgLy8gICAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgICB7IGFjY291bnQ6IHBheW1lbnQuc2VuZGVyLCBhbW91bnQ6IHRvdGFsTUJSIH0sCiAgICAvLyAgICAgICByZXNlcnZlZEZvciwKICAgIC8vICAgICAgIDAsCiAgICAvLyAgICAgICBnYXRlSUQsCiAgICAvLyAgICAgICBtYXJrZXRwbGFjZSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRDb250cmFjdFZlcnNpb24udmFsdWUsCiAgICAvLyAgICAgICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICAgICAgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSwKICAgIC8vICAgICBdLAogICAgLy8gICAgIGFwcHJvdmFsUHJvZ3JhbTogW2FwcHJvdmFsUHJvZ3JhbV0sCiAgICAvLyAgICAgY2xlYXJTdGF0ZVByb2dyYW06IGxpc3RpbmcuY2xlYXJTdGF0ZVByb2dyYW0sCiAgICAvLyAgIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyNTEKICAgIC8vIHByaXplQm94VHJhbnNmZXJUeG4uYXBwSWQuaWQsCiAgICBkaWcgMTMKICAgIGR1cAogICAgY292ZXIgNAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjU2CiAgICAvLyBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjU3CiAgICAvLyB7IGFjY291bnQ6IHBheW1lbnQuc2VuZGVyLCBhbW91bnQ6IHRvdGFsTUJSIH0sCiAgICB1bmNvdmVyIDMKICAgIGd0eG5zIFNlbmRlcgogICAgdW5jb3ZlciA0CiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjI1OQogICAgLy8gMCwKICAgIGludGNfMCAvLyAwCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyNjIKICAgIC8vIHRoaXMuY2hpbGRDb250cmFjdFZlcnNpb24udmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MzQKICAgIC8vIGNoaWxkQ29udHJhY3RWZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogQmFzZUZhY3RvcnlHbG9iYWxTdGF0ZUtleUNoaWxkQ29udHJhY3RWZXJzaW9uIH0pCiAgICBieXRlYyA3IC8vICJjaGlsZF9jb250cmFjdF92ZXJzaW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjYyCiAgICAvLyB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGR1cAogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyNjMKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjkKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyNjMKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjY0CiAgICAvLyB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjY1CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjY0CiAgICAvLyB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjI0OC0yNjgKICAgIC8vIGNvbnN0IGxpc3RpbmdBcHAgPSBsaXN0aW5nLmNhbGwKICAgIC8vICAgLmNyZWF0ZSh7CiAgICAvLyAgICAgYXJnczogWwogICAgLy8gICAgICAgcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBJZC5pZCwKICAgIC8vICAgICAgIHRydWUsCiAgICAvLyAgICAgICBwcmljZSwKICAgIC8vICAgICAgIHBheW1lbnRBc3NldCwKICAgIC8vICAgICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgICAgeyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiB0b3RhbE1CUiB9LAogICAgLy8gICAgICAgcmVzZXJ2ZWRGb3IsCiAgICAvLyAgICAgICAwLAogICAgLy8gICAgICAgZ2F0ZUlELAogICAgLy8gICAgICAgbWFya2V0cGxhY2UsCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlLAogICAgLy8gICAgICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgICAgIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUsCiAgICAvLyAgICAgXSwKICAgIC8vICAgICBhcHByb3ZhbFByb2dyYW06IFthcHByb3ZhbFByb2dyYW1dLAogICAgLy8gICAgIGNsZWFyU3RhdGVQcm9ncmFtOiBsaXN0aW5nLmNsZWFyU3RhdGVQcm9ncmFtLAogICAgLy8gICB9KQogICAgYnl0ZWMgMTMgLy8gbWV0aG9kICJjcmVhdGUodWludDY0LGJvb2wsdWludDY0LHVpbnQ2NCx1aW50NjQsYWRkcmVzcywoYWRkcmVzcyx1aW50NjQpLGFkZHJlc3MsdWludDY0LHVpbnQ2NCxhZGRyZXNzLHN0cmluZyx1aW50NjQsdWludDY0KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciA2CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjUyCiAgICAvLyB0cnVlLAogICAgYnl0ZWMgMTAgLy8gMHg4MAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyAxNQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyAxNAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyAxMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgNQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgNAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyA5CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZGlnIDcKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkaWcgNgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjA4CiAgICAvLyBjb25zdCBsaXN0aW5nID0gY29tcGlsZUFyYzQoTGlzdGluZykKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIEV4dHJhUHJvZ3JhbVBhZ2VzCiAgICBwdXNoaW50IDUgLy8gNQogICAgaXR4bl9maWVsZCBHbG9iYWxOdW1CeXRlU2xpY2UKICAgIHB1c2hpbnQgMTAgLy8gMTAKICAgIGl0eG5fZmllbGQgR2xvYmFsTnVtVWludAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjQ4LTI2OAogICAgLy8gY29uc3QgbGlzdGluZ0FwcCA9IGxpc3RpbmcuY2FsbAogICAgLy8gICAuY3JlYXRlKHsKICAgIC8vICAgICBhcmdzOiBbCiAgICAvLyAgICAgICBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcElkLmlkLAogICAgLy8gICAgICAgdHJ1ZSwKICAgIC8vICAgICAgIHByaWNlLAogICAgLy8gICAgICAgcGF5bWVudEFzc2V0LAogICAgLy8gICAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgICB7IGFjY291bnQ6IHBheW1lbnQuc2VuZGVyLCBhbW91bnQ6IHRvdGFsTUJSIH0sCiAgICAvLyAgICAgICByZXNlcnZlZEZvciwKICAgIC8vICAgICAgIDAsCiAgICAvLyAgICAgICBnYXRlSUQsCiAgICAvLyAgICAgICBtYXJrZXRwbGFjZSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRDb250cmFjdFZlcnNpb24udmFsdWUsCiAgICAvLyAgICAgICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICAgICAgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSwKICAgIC8vICAgICBdLAogICAgLy8gICAgIGFwcHJvdmFsUHJvZ3JhbTogW2FwcHJvdmFsUHJvZ3JhbV0sCiAgICAvLyAgICAgY2xlYXJTdGF0ZVByb2dyYW06IGxpc3RpbmcuY2xlYXJTdGF0ZVByb2dyYW0sCiAgICAvLyAgIH0pCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBPbkNvbXBsZXRpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjIwOAogICAgLy8gY29uc3QgbGlzdGluZyA9IGNvbXBpbGVBcmM0KExpc3RpbmcpCiAgICBieXRlYyAxNCAvLyBiYXNlNjQoQzRFQlF3PT0pCiAgICBpdHhuX2ZpZWxkIENsZWFyU3RhdGVQcm9ncmFtUGFnZXMKICAgIGl0eG5fZmllbGQgQXBwcm92YWxQcm9ncmFtUGFnZXMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjI0OC0yNjgKICAgIC8vIGNvbnN0IGxpc3RpbmdBcHAgPSBsaXN0aW5nLmNhbGwKICAgIC8vICAgLmNyZWF0ZSh7CiAgICAvLyAgICAgYXJnczogWwogICAgLy8gICAgICAgcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBJZC5pZCwKICAgIC8vICAgICAgIHRydWUsCiAgICAvLyAgICAgICBwcmljZSwKICAgIC8vICAgICAgIHBheW1lbnRBc3NldCwKICAgIC8vICAgICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgICAgeyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiB0b3RhbE1CUiB9LAogICAgLy8gICAgICAgcmVzZXJ2ZWRGb3IsCiAgICAvLyAgICAgICAwLAogICAgLy8gICAgICAgZ2F0ZUlELAogICAgLy8gICAgICAgbWFya2V0cGxhY2UsCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlLAogICAgLy8gICAgICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgICAgIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUsCiAgICAvLyAgICAgXSwKICAgIC8vICAgICBhcHByb3ZhbFByb2dyYW06IFthcHByb3ZhbFByb2dyYW1dLAogICAgLy8gICAgIGNsZWFyU3RhdGVQcm9ncmFtOiBsaXN0aW5nLmNsZWFyU3RhdGVQcm9ncmFtLAogICAgLy8gICB9KQogICAgaW50Y18zIC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjI0OC0yNzAKICAgIC8vIGNvbnN0IGxpc3RpbmdBcHAgPSBsaXN0aW5nLmNhbGwKICAgIC8vICAgLmNyZWF0ZSh7CiAgICAvLyAgICAgYXJnczogWwogICAgLy8gICAgICAgcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBJZC5pZCwKICAgIC8vICAgICAgIHRydWUsCiAgICAvLyAgICAgICBwcmljZSwKICAgIC8vICAgICAgIHBheW1lbnRBc3NldCwKICAgIC8vICAgICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgICAgeyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiB0b3RhbE1CUiB9LAogICAgLy8gICAgICAgcmVzZXJ2ZWRGb3IsCiAgICAvLyAgICAgICAwLAogICAgLy8gICAgICAgZ2F0ZUlELAogICAgLy8gICAgICAgbWFya2V0cGxhY2UsCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlLAogICAgLy8gICAgICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgICAgIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUsCiAgICAvLyAgICAgXSwKICAgIC8vICAgICBhcHByb3ZhbFByb2dyYW06IFthcHByb3ZhbFByb2dyYW1dLAogICAgLy8gICAgIGNsZWFyU3RhdGVQcm9ncmFtOiBsaXN0aW5nLmNsZWFyU3RhdGVQcm9ncmFtLAogICAgLy8gICB9KQogICAgLy8gICAuaXR4bgogICAgLy8gICAuY3JlYXRlZEFwcAogICAgZ2l0eG4gMCBDcmVhdGVkQXBwbGljYXRpb25JRAogICAgZHVwCiAgICBidXJ5IDE1CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyNzMtMjc4CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogbGlzdGluZ0FwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogR2xvYmFsLm1pbkJhbGFuY2UgKyBkaXNidXJzZW1lbnRNQlIKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyNzUKICAgIC8vIHJlY2VpdmVyOiBsaXN0aW5nQXBwLmFkZHJlc3MsCiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjI3NgogICAgLy8gYW1vdW50OiBHbG9iYWwubWluQmFsYW5jZSArIGRpc2J1cnNlbWVudE1CUgogICAgZ2xvYmFsIE1pbkJhbGFuY2UKICAgIHVuY292ZXIgNAogICAgKwogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjI3My0yNzcKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBsaXN0aW5nQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBHbG9iYWwubWluQmFsYW5jZSArIGRpc2J1cnNlbWVudE1CUgogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjczLTI3OAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IGxpc3RpbmdBcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IEdsb2JhbC5taW5CYWxhbmNlICsgZGlzYnVyc2VtZW50TUJSCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjI4MS0yODQKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFByaXplQm94LnByb3RvdHlwZS50cmFuc2Zlcj4oewogICAgLy8gICBhcHBJZDogcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBJZCwKICAgIC8vICAgYXJnczogW2xpc3RpbmdBcHAuYWRkcmVzc10sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjgzCiAgICAvLyBhcmdzOiBbbGlzdGluZ0FwcC5hZGRyZXNzXSwKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjI4MS0yODQKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFByaXplQm94LnByb3RvdHlwZS50cmFuc2Zlcj4oewogICAgLy8gICBhcHBJZDogcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBJZCwKICAgIC8vICAgYXJnczogW2xpc3RpbmdBcHAuYWRkcmVzc10sCiAgICAvLyB9KQogICAgYnl0ZWMgMTYgLy8gbWV0aG9kICJ0cmFuc2ZlcihhZGRyZXNzKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgaW50Y18zIC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjI4NgogICAgLy8gaWYgKCFpc0FsZ29QYXltZW50KSB7CiAgICBkaWcgNAogICAgYnogbGlzdFByaXplQm94X2FmdGVyX2lmX2Vsc2VAMjMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjI4OC0yOTcKICAgIC8vIGxpc3RpbmcuY2FsbC5vcHRpbih7CiAgICAvLyAgIGFwcElkOiBsaXN0aW5nQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBsaXN0aW5nQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG9wdGluTUJSLAogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHBheW1lbnRBc3NldCwKICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyOTIKICAgIC8vIHJlY2VpdmVyOiBsaXN0aW5nQXBwLmFkZHJlc3MsCiAgICBkaWcgMTEKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZGlnIDEyCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjkxLTI5NAogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IGxpc3RpbmdBcHAuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiBvcHRpbk1CUiwKICAgIC8vIH0pLAogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6Mjg4LTI5NwogICAgLy8gbGlzdGluZy5jYWxsLm9wdGluKHsKICAgIC8vICAgYXBwSWQ6IGxpc3RpbmdBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGxpc3RpbmdBcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogb3B0aW5NQlIsCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgcGF5bWVudEFzc2V0LAogICAgLy8gICBdLAogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgYnl0ZWMgOSAvLyBtZXRob2QgIm9wdGluKHBheSx1aW50NjQpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkaWcgNgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIE9uQ29tcGxldGlvbgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBpbnRjXzMgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzAwCiAgICAvLyBpZiAoIXRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYWRkcmVzcy5pc09wdGVkSW4oQXNzZXQocGF5bWVudEFzc2V0KSkpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo2NQogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjMwMAogICAgLy8gaWYgKCF0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFkZHJlc3MuaXNPcHRlZEluKEFzc2V0KHBheW1lbnRBc3NldCkpKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZGlnIDUKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBibnogbGlzdFByaXplQm94X2FmdGVyX2lmX2Vsc2VAMjMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjMwMQogICAgLy8gdGhpcy5vcHRBa2l0YUVzY3Jvd0luQW5kU2VuZChBa2l0YURBT0VzY3Jvd0FjY291bnRNYXJrZXRwbGFjZSwgQXNzZXQocGF5bWVudEFzc2V0KSwgMCkKICAgIGJ5dGVjIDE1IC8vICJyZXZfbWFya2V0cGxhY2UiCiAgICBkaWcgNQogICAgaW50Y18wIC8vIDAKICAgIGNhbGxzdWIgb3B0QWtpdGFFc2Nyb3dJbkFuZFNlbmQKICAgIHBvcAoKbGlzdFByaXplQm94X2FmdGVyX2lmX2Vsc2VAMjM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxODQtMTkzCiAgICAvLyBsaXN0UHJpemVCb3goCiAgICAvLyAgIHByaXplQm94VHJhbnNmZXJUeG46IGd0eG4uQXBwbGljYXRpb25DYWxsVHhuLAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIHByaWNlOiB1aW50NjQsCiAgICAvLyAgIHBheW1lbnRBc3NldDogdWludDY0LAogICAgLy8gICBleHBpcmF0aW9uOiB1aW50NjQsCiAgICAvLyAgIHJlc2VydmVkRm9yOiBBY2NvdW50LAogICAgLy8gICBnYXRlSUQ6IHVpbnQ2NCwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQsCiAgICAvLyApOiB1aW50NjQgewogICAgZGlnIDExCiAgICBpdG9iCiAgICBieXRlYyA0IC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpsaXN0UHJpemVCb3hfdGVybmFyeV9mYWxzZUAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjIyNQogICAgLy8gOiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiBzcGxpdE9wdEluQ291bnQodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hZGRyZXNzLCBBc3NldChwYXltZW50QXNzZXQpKQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjkKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyMjUKICAgIC8vIDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYWRkcmVzcywgQXNzZXQocGF5bWVudEFzc2V0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NjUKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlY18xIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyMjUKICAgIC8vIDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYWRkcmVzcywgQXNzZXQocGF5bWVudEFzc2V0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBkaWcgNwogICAgY2FsbHN1YiBzcGxpdE9wdEluQ291bnQKICAgICoKICAgIGIgbGlzdFByaXplQm94X3Rlcm5hcnlfbWVyZ2VAMTQKCmxpc3RQcml6ZUJveF9lbHNlX2JvZHlAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyMTkKICAgIC8vIGRpc2J1cnNlbWVudE1CUiA9IGRpc2J1cnNlbWVudENvc3QoNCkgKyByZXdhcmRzT3B0SW5Db3N0KHRoaXMuYWtpdGFEQU8udmFsdWUsIHBheW1lbnRBc3NldCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyOQogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjIxOQogICAgLy8gZGlzYnVyc2VtZW50TUJSID0gZGlzYnVyc2VtZW50Q29zdCg0KSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgcGF5bWVudEFzc2V0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyA1CiAgICBjYWxsc3ViIHJld2FyZHNPcHRJbkNvc3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTAxCiAgICAvLyByZXR1cm4gKE1pbkRpc2J1cnNlbWVudHNNQlIgKyBVc2VyQWxsb2NhdGlvbk1CUikgKiBjb3VudAogICAgcHVzaGludCAyNDI0MDAgLy8gMjQyNDAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyMTkKICAgIC8vIGRpc2J1cnNlbWVudE1CUiA9IGRpc2J1cnNlbWVudENvc3QoNCkgKyByZXdhcmRzT3B0SW5Db3N0KHRoaXMuYWtpdGFEQU8udmFsdWUsIHBheW1lbnRBc3NldCkKICAgICsKICAgIGJ1cnkgMTMKICAgIGIgbGlzdFByaXplQm94X2FmdGVyX2lmX2Vsc2VAMTEKCmxpc3RQcml6ZUJveF90ZXJuYXJ5X2ZhbHNlQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyMDYKICAgIC8vIDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGJ1cnkgMTEKICAgIGIgbGlzdFByaXplQm94X3Rlcm5hcnlfbWVyZ2VAOAoKbGlzdFByaXplQm94X2Jvb2xfZmFsc2VANDoKICAgIGludGNfMCAvLyAwCiAgICBiIGxpc3RQcml6ZUJveF9ib29sX21lcmdlQDUKCgovLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo6TWFya2V0cGxhY2UuZ2F0ZWRQdXJjaGFzZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmdhdGVkUHVyY2hhc2U6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozMDgtMzEzCiAgICAvLyBnYXRlZFB1cmNoYXNlKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGdhdGVUeG46IGd0eG4uQXBwbGljYXRpb25DYWxsVHhuLAogICAgLy8gICBhcHBJZDogQXBwbGljYXRpb24sCiAgICAvLyAgIG1hcmtldHBsYWNlOiBBY2NvdW50LAogICAgLy8gKTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgcHVzaGludCAyIC8vIDIKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18zIC8vIGFwcGwKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBhcHBsCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ4WzMyXQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzE0CiAgICAvLyBjb25zdCB3YWxsZXQgPSBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU8odGhpcy5ha2l0YURBTy52YWx1ZSwgVHhuLnNlbmRlcikKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyOQogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjMxNAogICAgLy8gY29uc3Qgd2FsbGV0ID0gZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPKHRoaXMuYWtpdGFEQU8udmFsdWUsIFR4bi5zZW5kZXIpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgdHhuIFNlbmRlcgogICAgY2FsbHN1YiBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjMxNQogICAgLy8gY29uc3Qgb3JpZ2luID0gb3JpZ2luT3JUeG5TZW5kZXIod2FsbGV0KQogICAgY2FsbHN1YiBvcmlnaW5PclR4blNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzE3CiAgICAvLyBhc3NlcnQoYXBwSWQuY3JlYXRvciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIEVSUl9OT1RfQV9MSVNUSU5HKQogICAgZGlnIDIKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcENyZWF0b3IKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYXNzZXJ0IC8vIE5vdCBhIGxpc3RpbmcgY29udHJhY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjMxOAogICAgLy8gY29uc3QgZ2F0ZUlEID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KGFwcElkLCBCeXRlcyhMaXN0aW5nR2xvYmFsU3RhdGVLZXlHYXRlSUQpKVswXQogICAgZGlnIDIKICAgIGJ5dGVjIDggLy8gImdhdGVfaWQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozMTkKICAgIC8vIGFzc2VydChnYXRlQ2hlY2soZ2F0ZVR4biwgdGhpcy5ha2l0YURBTy52YWx1ZSwgb3JpZ2luLCBnYXRlSUQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI5CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzE5CiAgICAvLyBhc3NlcnQoZ2F0ZUNoZWNrKGdhdGVUeG4sIHRoaXMuYWtpdGFEQU8udmFsdWUsIG9yaWdpbiwgZ2F0ZUlEKSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICB1bmNvdmVyIDUKICAgIHN3YXAKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAzCiAgICBjYWxsc3ViIGdhdGVDaGVjawogICAgYXNzZXJ0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozMjAtMzI0CiAgICAvLyBhc3NlcnRNYXRjaCgKICAgIC8vICAgcGF5bWVudCwKICAgIC8vICAgeyByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MgfSwKICAgIC8vICAgRVJSX0lOVkFMSURfUEFZTUVOVAogICAgLy8gKQogICAgZGlnIDIKICAgIGd0eG5zIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozMjIKICAgIC8vIHsgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzIH0sCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzIwLTMyNAogICAgLy8gYXNzZXJ0TWF0Y2goCiAgICAvLyAgIHBheW1lbnQsCiAgICAvLyAgIHsgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzIH0sCiAgICAvLyAgIEVSUl9JTlZBTElEX1BBWU1FTlQKICAgIC8vICkKICAgID09CiAgICBhc3NlcnQgLy8gSW52YWxpZCBwYXltZW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ1NQogICAgLy8gY29uc3QgW2Z1bmRlckJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFwcElkLCBCeXRlcyhHbG9iYWxTdGF0ZUtleUZ1bmRlcikpCiAgICBkaWcgMQogICAgYnl0ZWMgNSAvLyAiZnVuZGVyIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzI3CiAgICAvLyBjb25zdCB7IGFjY291bnQ6IGNyZWF0b3IsIGFtb3VudCB9ID0gZ2V0RnVuZGVyKGFwcElkKQogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIHN3YXAKICAgIHB1c2hpbnQgMzIgLy8gMzIKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozMzAtMzQwCiAgICAvLyBsaXN0aW5nLmNhbGwucHVyY2hhc2UoewogICAgLy8gICBhcHBJZCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogYXBwSWQuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogcGF5bWVudC5hbW91bnQsCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgVHhuLnNlbmRlciwKICAgIC8vICAgICBtYXJrZXRwbGFjZQogICAgLy8gICBdLAogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjMzNAogICAgLy8gcmVjZWl2ZXI6IGFwcElkLmFkZHJlc3MsCiAgICBkaWcgMwogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzM1CiAgICAvLyBhbW91bnQ6IHBheW1lbnQuYW1vdW50LAogICAgdW5jb3ZlciA1CiAgICBndHhucyBBbW91bnQKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozMzMtMzM2CiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogYXBwSWQuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiBwYXltZW50LmFtb3VudCwKICAgIC8vIH0pLAogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzMwLTM0MAogICAgLy8gbGlzdGluZy5jYWxsLnB1cmNoYXNlKHsKICAgIC8vICAgYXBwSWQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGFwcElkLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IHBheW1lbnQuYW1vdW50LAogICAgLy8gICAgIH0pLAogICAgLy8gICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgbWFya2V0cGxhY2UKICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjMzNwogICAgLy8gVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjMzMC0zNDAKICAgIC8vIGxpc3RpbmcuY2FsbC5wdXJjaGFzZSh7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBhcHBJZC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBwYXltZW50LmFtb3VudCwKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgIG1hcmtldHBsYWNlCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgYnl0ZWMgMTcgLy8gbWV0aG9kICJwdXJjaGFzZShwYXksYWRkcmVzcyxhZGRyZXNzKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNSAvLyA1CiAgICBpdHhuX2ZpZWxkIE9uQ29tcGxldGlvbgogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIGludGNfMyAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozNDItMzQ3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQsCiAgICAvLyAgICAgcmVjZWl2ZXI6IGNyZWF0b3IsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjM0Mi0zNDYKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGFtb3VudCwKICAgIC8vICAgICByZWNlaXZlcjogY3JlYXRvciwKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjM0Mi0zNDcKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGFtb3VudCwKICAgIC8vICAgICByZWNlaXZlcjogY3JlYXRvciwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzA4LTMxMwogICAgLy8gZ2F0ZWRQdXJjaGFzZSgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBnYXRlVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwKICAgIC8vICAgYXBwSWQ6IEFwcGxpY2F0aW9uLAogICAgLy8gICBtYXJrZXRwbGFjZTogQWNjb3VudCwKICAgIC8vICk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjpNYXJrZXRwbGFjZS5wdXJjaGFzZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnB1cmNoYXNlOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzUwLTM1NAogICAgLy8gcHVyY2hhc2UoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgYXBwSWQ6IEFwcGxpY2F0aW9uLAogICAgLy8gICBtYXJrZXRwbGFjZTogQWNjb3VudCwKICAgIC8vICk6IHZvaWQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ4WzMyXQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzU1CiAgICAvLyBhc3NlcnQoYXBwSWQuY3JlYXRvciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIEVSUl9OT1RfQV9MSVNUSU5HKQogICAgZGlnIDEKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcENyZWF0b3IKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYXNzZXJ0IC8vIE5vdCBhIGxpc3RpbmcgY29udHJhY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjM1NgogICAgLy8gY29uc3QgZ2F0ZUlEID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KGFwcElkLCBCeXRlcyhMaXN0aW5nR2xvYmFsU3RhdGVLZXlHYXRlSUQpKVswXQogICAgZGlnIDEKICAgIGJ5dGVjIDggLy8gImdhdGVfaWQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozNTcKICAgIC8vIGFzc2VydChnYXRlSUQgPT09IDAsIEVSUl9IQVNfR0FURSkKICAgICEKICAgIGFzc2VydCAvLyBUaGlzIGhhcyBhIGdhdGUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjM1OC0zNjIKICAgIC8vIGFzc2VydE1hdGNoKAogICAgLy8gICBwYXltZW50LAogICAgLy8gICB7IHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcyB9LAogICAgLy8gICBFUlJfSU5WQUxJRF9QQVlNRU5UCiAgICAvLyApCiAgICBkaWcgMgogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjM2MAogICAgLy8geyByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MgfSwKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozNTgtMzYyCiAgICAvLyBhc3NlcnRNYXRjaCgKICAgIC8vICAgcGF5bWVudCwKICAgIC8vICAgeyByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MgfSwKICAgIC8vICAgRVJSX0lOVkFMSURfUEFZTUVOVAogICAgLy8gKQogICAgPT0KICAgIGFzc2VydCAvLyBJbnZhbGlkIHBheW1lbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDU1CiAgICAvLyBjb25zdCBbZnVuZGVyQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYXBwSWQsIEJ5dGVzKEdsb2JhbFN0YXRlS2V5RnVuZGVyKSkKICAgIGRpZyAxCiAgICBieXRlYyA1IC8vICJmdW5kZXIiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozNjUKICAgIC8vIGNvbnN0IHsgYWNjb3VudDogY3JlYXRvciwgYW1vdW50IH0gPSBnZXRGdW5kZXIoYXBwSWQpCiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgc3dhcAogICAgcHVzaGludCAzMiAvLyAzMgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjM2OC0zNzgKICAgIC8vIGxpc3RpbmcuY2FsbC5wdXJjaGFzZSh7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBhcHBJZC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBwYXltZW50LmFtb3VudCwKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgIG1hcmtldHBsYWNlCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzcyCiAgICAvLyByZWNlaXZlcjogYXBwSWQuYWRkcmVzcywKICAgIGRpZyAzCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozNzMKICAgIC8vIGFtb3VudDogcGF5bWVudC5hbW91bnQsCiAgICB1bmNvdmVyIDUKICAgIGd0eG5zIEFtb3VudAogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjM3MS0zNzQKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBhcHBJZC5hZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IHBheW1lbnQuYW1vdW50LAogICAgLy8gfSksCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozNjgtMzc4CiAgICAvLyBsaXN0aW5nLmNhbGwucHVyY2hhc2UoewogICAgLy8gICBhcHBJZCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogYXBwSWQuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogcGF5bWVudC5hbW91bnQsCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgVHhuLnNlbmRlciwKICAgIC8vICAgICBtYXJrZXRwbGFjZQogICAgLy8gICBdLAogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6Mzc1CiAgICAvLyBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzY4LTM3OAogICAgLy8gbGlzdGluZy5jYWxsLnB1cmNoYXNlKHsKICAgIC8vICAgYXBwSWQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGFwcElkLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IHBheW1lbnQuYW1vdW50LAogICAgLy8gICAgIH0pLAogICAgLy8gICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgbWFya2V0cGxhY2UKICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBieXRlYyAxNyAvLyBtZXRob2QgInB1cmNoYXNlKHBheSxhZGRyZXNzLGFkZHJlc3Mpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA1IC8vIDUKICAgIGl0eG5fZmllbGQgT25Db21wbGV0aW9uCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgaW50Y18zIC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjM4MC0zODUKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGFtb3VudCwKICAgIC8vICAgICByZWNlaXZlcjogY3JlYXRvciwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzgwLTM4NAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50LAogICAgLy8gICAgIHJlY2VpdmVyOiBjcmVhdG9yLAogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzgwLTM4NQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50LAogICAgLy8gICAgIHJlY2VpdmVyOiBjcmVhdG9yLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozNTAtMzU0CiAgICAvLyBwdXJjaGFzZSgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBhcHBJZDogQXBwbGljYXRpb24sCiAgICAvLyAgIG1hcmtldHBsYWNlOiBBY2NvdW50LAogICAgLy8gKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6Ok1hcmtldHBsYWNlLmdhdGVkUHVyY2hhc2VBc2Fbcm91dGluZ10oKSAtPiB2b2lkOgpnYXRlZFB1cmNoYXNlQXNhOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6Mzg4LTM5MwogICAgLy8gZ2F0ZWRQdXJjaGFzZUFzYSgKICAgIC8vICAgYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIGdhdGVUeG46IGd0eG4uQXBwbGljYXRpb25DYWxsVHhuLAogICAgLy8gICBhcHBJZDogQXBwbGljYXRpb24sCiAgICAvLyAgIG1hcmtldHBsYWNlOiBBY2NvdW50LAogICAgLy8gKTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgcHVzaGludCAyIC8vIDIKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNCAvLyBheGZlcgogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGF4ZmVyCiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMyAvLyBhcHBsCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXBwbAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50OFszMl0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjM5NAogICAgLy8gY29uc3Qgd2FsbGV0ID0gZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPKHRoaXMuYWtpdGFEQU8udmFsdWUsIFR4bi5zZW5kZXIpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjkKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozOTQKICAgIC8vIGNvbnN0IHdhbGxldCA9IGdldFdhbGxldElEVXNpbmdBa2l0YURBTyh0aGlzLmFraXRhREFPLnZhbHVlLCBUeG4uc2VuZGVyKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHR4biBTZW5kZXIKICAgIGNhbGxzdWIgZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozOTUKICAgIC8vIGNvbnN0IG9yaWdpbiA9IG9yaWdpbk9yVHhuU2VuZGVyKHdhbGxldCkKICAgIGNhbGxzdWIgb3JpZ2luT3JUeG5TZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjM5NwogICAgLy8gYXNzZXJ0KGFwcElkLmNyZWF0b3IgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfTk9UX0FfTElTVElORykKICAgIGRpZyAyCiAgICBhcHBfcGFyYW1zX2dldCBBcHBDcmVhdG9yCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGFzc2VydCAvLyBOb3QgYSBsaXN0aW5nIGNvbnRyYWN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozOTgKICAgIC8vIGNvbnN0IGdhdGVJRCA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NChhcHBJZCwgQnl0ZXMoTGlzdGluZ0dsb2JhbFN0YXRlS2V5R2F0ZUlEKSlbMF0KICAgIGRpZyAyCiAgICBieXRlYyA4IC8vICJnYXRlX2lkIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6Mzk5CiAgICAvLyBhc3NlcnQoZ2F0ZUNoZWNrKGdhdGVUeG4sIHRoaXMuYWtpdGFEQU8udmFsdWUsIG9yaWdpbiwgZ2F0ZUlEKSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyOQogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjM5OQogICAgLy8gYXNzZXJ0KGdhdGVDaGVjayhnYXRlVHhuLCB0aGlzLmFraXRhREFPLnZhbHVlLCBvcmlnaW4sIGdhdGVJRCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgdW5jb3ZlciA1CiAgICBzd2FwCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMwogICAgY2FsbHN1YiBnYXRlQ2hlY2sKICAgIGFzc2VydAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDAwLTQwNwogICAgLy8gYXNzZXJ0TWF0Y2goCiAgICAvLyAgIGFzc2V0WGZlciwKICAgIC8vICAgewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiB7IGdyZWF0ZXJUaGFuOiAwIH0sCiAgICAvLyAgIH0sCiAgICAvLyAgIEVSUl9JTlZBTElEX1RSQU5TRkVSCiAgICAvLyApCiAgICBkaWcgMgogICAgZ3R4bnMgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDAzCiAgICAvLyBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0MDAtNDA3CiAgICAvLyBhc3NlcnRNYXRjaCgKICAgIC8vICAgYXNzZXRYZmVyLAogICAgLy8gICB7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IHsgZ3JlYXRlclRoYW46IDAgfSwKICAgIC8vICAgfSwKICAgIC8vICAgRVJSX0lOVkFMSURfVFJBTlNGRVIKICAgIC8vICkKICAgID09CiAgICBkaWcgMwogICAgZ3R4bnMgQXNzZXRBbW91bnQKICAgIHN3YXAKICAgIGRpZyAxCiAgICAmJgogICAgYXNzZXJ0IC8vIEludmFsaWQgdHJhbnNmZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDU1CiAgICAvLyBjb25zdCBbZnVuZGVyQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYXBwSWQsIEJ5dGVzKEdsb2JhbFN0YXRlS2V5RnVuZGVyKSkKICAgIGRpZyAyCiAgICBieXRlYyA1IC8vICJmdW5kZXIiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0MTAKICAgIC8vIGNvbnN0IHsgYWNjb3VudDogcmVjZWl2ZXIsIGFtb3VudCB9ID0gZ2V0RnVuZGVyKGFwcElkKQogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIHN3YXAKICAgIHB1c2hpbnQgMzIgLy8gMzIKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0MTMtNDI0CiAgICAvLyBsaXN0aW5nLmNhbGwucHVyY2hhc2VBc2EoewogICAgLy8gICBhcHBJZCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgICBhc3NldFJlY2VpdmVyOiBhcHBJZC5hZGRyZXNzLAogICAgLy8gICAgICAgYXNzZXRBbW91bnQ6IGFzc2V0WGZlci5hc3NldEFtb3VudCwKICAgIC8vICAgICAgIHhmZXJBc3NldDogYXNzZXRYZmVyLnhmZXJBc3NldCwKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgIG1hcmtldHBsYWNlCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDE3CiAgICAvLyBhc3NldFJlY2VpdmVyOiBhcHBJZC5hZGRyZXNzLAogICAgZGlnIDQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQxOQogICAgLy8geGZlckFzc2V0OiBhc3NldFhmZXIueGZlckFzc2V0LAogICAgdW5jb3ZlciA2CiAgICBndHhucyBYZmVyQXNzZXQKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICB1bmNvdmVyIDMKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDE2LTQyMAogICAgLy8gaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgYXNzZXRSZWNlaXZlcjogYXBwSWQuYWRkcmVzcywKICAgIC8vICAgYXNzZXRBbW91bnQ6IGFzc2V0WGZlci5hc3NldEFtb3VudCwKICAgIC8vICAgeGZlckFzc2V0OiBhc3NldFhmZXIueGZlckFzc2V0LAogICAgLy8gfSksCiAgICBwdXNoaW50IDQgLy8gNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0MTMtNDI0CiAgICAvLyBsaXN0aW5nLmNhbGwucHVyY2hhc2VBc2EoewogICAgLy8gICBhcHBJZCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgICBhc3NldFJlY2VpdmVyOiBhcHBJZC5hZGRyZXNzLAogICAgLy8gICAgICAgYXNzZXRBbW91bnQ6IGFzc2V0WGZlci5hc3NldEFtb3VudCwKICAgIC8vICAgICAgIHhmZXJBc3NldDogYXNzZXRYZmVyLnhmZXJBc3NldCwKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgIG1hcmtldHBsYWNlCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0MjEKICAgIC8vIFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0MTMtNDI0CiAgICAvLyBsaXN0aW5nLmNhbGwucHVyY2hhc2VBc2EoewogICAgLy8gICBhcHBJZCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgICBhc3NldFJlY2VpdmVyOiBhcHBJZC5hZGRyZXNzLAogICAgLy8gICAgICAgYXNzZXRBbW91bnQ6IGFzc2V0WGZlci5hc3NldEFtb3VudCwKICAgIC8vICAgICAgIHhmZXJBc3NldDogYXNzZXRYZmVyLnhmZXJBc3NldCwKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgIG1hcmtldHBsYWNlCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgYnl0ZWMgMTggLy8gbWV0aG9kICJwdXJjaGFzZUFzYShheGZlcixhZGRyZXNzLGFkZHJlc3Mpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgT25Db21wbGV0aW9uCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgaW50Y18zIC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQyNi00MjgKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoeyBhbW91bnQsIHJlY2VpdmVyIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQyNi00MjcKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoeyBhbW91bnQsIHJlY2VpdmVyIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0MjYtNDI4CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsgYW1vdW50LCByZWNlaXZlciB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozODgtMzkzCiAgICAvLyBnYXRlZFB1cmNoYXNlQXNhKAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgZ2F0ZVR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sCiAgICAvLyAgIGFwcElkOiBBcHBsaWNhdGlvbiwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQsCiAgICAvLyApOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo6TWFya2V0cGxhY2UucHVyY2hhc2VBc2Fbcm91dGluZ10oKSAtPiB2b2lkOgpwdXJjaGFzZUFzYToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQzMS00MzUKICAgIC8vIHB1cmNoYXNlQXNhKAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgYXBwSWQ6IEFwcGxpY2F0aW9uLAogICAgLy8gICBtYXJrZXRwbGFjZTogQWNjb3VudCwKICAgIC8vICk6IHZvaWQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDQgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50OFszMl0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQzNgogICAgLy8gYXNzZXJ0KGFwcElkLmNyZWF0b3IgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfTk9UX0FfTElTVElORykKICAgIGRpZyAxCiAgICBhcHBfcGFyYW1zX2dldCBBcHBDcmVhdG9yCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGFzc2VydCAvLyBOb3QgYSBsaXN0aW5nIGNvbnRyYWN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0MzcKICAgIC8vIGNvbnN0IGdhdGVJRCA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NChhcHBJZCwgQnl0ZXMoTGlzdGluZ0dsb2JhbFN0YXRlS2V5R2F0ZUlEKSlbMF0KICAgIGRpZyAxCiAgICBieXRlYyA4IC8vICJnYXRlX2lkIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDM4CiAgICAvLyBhc3NlcnQoZ2F0ZUlEID09PSAwLCBFUlJfSEFTX0dBVEUpCiAgICAhCiAgICBhc3NlcnQgLy8gVGhpcyBoYXMgYSBnYXRlCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0MzktNDQ2CiAgICAvLyBhc3NlcnRNYXRjaCgKICAgIC8vICAgYXNzZXRYZmVyLAogICAgLy8gICB7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IHsgZ3JlYXRlclRoYW46IDAgfSwKICAgIC8vICAgfSwKICAgIC8vICAgRVJSX0lOVkFMSURfVFJBTlNGRVIKICAgIC8vICkKICAgIGRpZyAyCiAgICBndHhucyBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0NDIKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQzOS00NDYKICAgIC8vIGFzc2VydE1hdGNoKAogICAgLy8gICBhc3NldFhmZXIsCiAgICAvLyAgIHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogeyBncmVhdGVyVGhhbjogMCB9LAogICAgLy8gICB9LAogICAgLy8gICBFUlJfSU5WQUxJRF9UUkFOU0ZFUgogICAgLy8gKQogICAgPT0KICAgIGRpZyAzCiAgICBndHhucyBBc3NldEFtb3VudAogICAgc3dhcAogICAgZGlnIDEKICAgICYmCiAgICBhc3NlcnQgLy8gSW52YWxpZCB0cmFuc2ZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NTUKICAgIC8vIGNvbnN0IFtmdW5kZXJCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhhcHBJZCwgQnl0ZXMoR2xvYmFsU3RhdGVLZXlGdW5kZXIpKQogICAgZGlnIDIKICAgIGJ5dGVjIDUgLy8gImZ1bmRlciIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQ0OQogICAgLy8gY29uc3QgeyBhY2NvdW50OiByZWNlaXZlciwgYW1vdW50IH0gPSBnZXRGdW5kZXIoYXBwSWQpCiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgc3dhcAogICAgcHVzaGludCAzMiAvLyAzMgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQ1Mi00NjMKICAgIC8vIGxpc3RpbmcuY2FsbC5wdXJjaGFzZUFzYSh7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICAgIGFzc2V0UmVjZWl2ZXI6IGFwcElkLmFkZHJlc3MsCiAgICAvLyAgICAgICBhc3NldEFtb3VudDogYXNzZXRYZmVyLmFzc2V0QW1vdW50LAogICAgLy8gICAgICAgeGZlckFzc2V0OiBhc3NldFhmZXIueGZlckFzc2V0LAogICAgLy8gICAgIH0pLAogICAgLy8gICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgbWFya2V0cGxhY2UKICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0NTYKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IGFwcElkLmFkZHJlc3MsCiAgICBkaWcgNAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDU4CiAgICAvLyB4ZmVyQXNzZXQ6IGFzc2V0WGZlci54ZmVyQXNzZXQsCiAgICB1bmNvdmVyIDYKICAgIGd0eG5zIFhmZXJBc3NldAogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIHVuY292ZXIgMwogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0NTUtNDU5CiAgICAvLyBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICBhc3NldFJlY2VpdmVyOiBhcHBJZC5hZGRyZXNzLAogICAgLy8gICBhc3NldEFtb3VudDogYXNzZXRYZmVyLmFzc2V0QW1vdW50LAogICAgLy8gICB4ZmVyQXNzZXQ6IGFzc2V0WGZlci54ZmVyQXNzZXQsCiAgICAvLyB9KSwKICAgIHB1c2hpbnQgNCAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQ1Mi00NjMKICAgIC8vIGxpc3RpbmcuY2FsbC5wdXJjaGFzZUFzYSh7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICAgIGFzc2V0UmVjZWl2ZXI6IGFwcElkLmFkZHJlc3MsCiAgICAvLyAgICAgICBhc3NldEFtb3VudDogYXNzZXRYZmVyLmFzc2V0QW1vdW50LAogICAgLy8gICAgICAgeGZlckFzc2V0OiBhc3NldFhmZXIueGZlckFzc2V0LAogICAgLy8gICAgIH0pLAogICAgLy8gICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgbWFya2V0cGxhY2UKICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQ2MAogICAgLy8gVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQ1Mi00NjMKICAgIC8vIGxpc3RpbmcuY2FsbC5wdXJjaGFzZUFzYSh7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICAgIGFzc2V0UmVjZWl2ZXI6IGFwcElkLmFkZHJlc3MsCiAgICAvLyAgICAgICBhc3NldEFtb3VudDogYXNzZXRYZmVyLmFzc2V0QW1vdW50LAogICAgLy8gICAgICAgeGZlckFzc2V0OiBhc3NldFhmZXIueGZlckFzc2V0LAogICAgLy8gICAgIH0pLAogICAgLy8gICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgbWFya2V0cGxhY2UKICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBieXRlYyAxOCAvLyBtZXRob2QgInB1cmNoYXNlQXNhKGF4ZmVyLGFkZHJlc3MsYWRkcmVzcyl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBPbkNvbXBsZXRpb24KICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBpbnRjXzMgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDY1LTQ2NwogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7IGFtb3VudCwgcmVjZWl2ZXIgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDY1LTQ2NgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7IGFtb3VudCwgcmVjZWl2ZXIgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQ2NS00NjcKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoeyBhbW91bnQsIHJlY2VpdmVyIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQzMS00MzUKICAgIC8vIHB1cmNoYXNlQXNhKAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgYXBwSWQ6IEFwcGxpY2F0aW9uLAogICAgLy8gICBtYXJrZXRwbGFjZTogQWNjb3VudCwKICAgIC8vICk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjpNYXJrZXRwbGFjZS5kZWxpc3Rbcm91dGluZ10oKSAtPiB2b2lkOgpkZWxpc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0NzAKICAgIC8vIGRlbGlzdChhcHBJZDogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0NzEKICAgIC8vIGFzc2VydChhcHBJZC5jcmVhdG9yID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgRVJSX05PVF9BX0xJU1RJTkcpCiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcENyZWF0b3IKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYXNzZXJ0IC8vIE5vdCBhIGxpc3RpbmcgY29udHJhY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDU1CiAgICAvLyBjb25zdCBbZnVuZGVyQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYXBwSWQsIEJ5dGVzKEdsb2JhbFN0YXRlS2V5RnVuZGVyKSkKICAgIGR1cAogICAgYnl0ZWMgNSAvLyAiZnVuZGVyIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDc0CiAgICAvLyBjb25zdCB7IGFjY291bnQ6IHJlY2VpdmVyLCBhbW91bnQgfSA9IGdldEZ1bmRlcihhcHBJZCkKICAgIGR1cAogICAgZXh0cmFjdCAwIDMyCiAgICBzd2FwCiAgICBwdXNoaW50IDMyIC8vIDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDc3LTQ4MAogICAgLy8gbGlzdGluZy5jYWxsLmRlbGlzdCh7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbVHhuLnNlbmRlcl0sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDc5CiAgICAvLyBhcmdzOiBbVHhuLnNlbmRlcl0sCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0NzctNDgwCiAgICAvLyBsaXN0aW5nLmNhbGwuZGVsaXN0KHsKICAgIC8vICAgYXBwSWQsCiAgICAvLyAgIGFyZ3M6IFtUeG4uc2VuZGVyXSwKICAgIC8vIH0pCiAgICBwdXNoYnl0ZXMgMHg2OGU4NjM0MyAvLyBtZXRob2QgImRlbGlzdChhZGRyZXNzKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNSAvLyA1CiAgICBpdHhuX2ZpZWxkIE9uQ29tcGxldGlvbgogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIGludGNfMyAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0ODItNDg0CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsgYW1vdW50LCByZWNlaXZlciB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0ODItNDgzCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsgYW1vdW50LCByZWNlaXZlciB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDgyLTQ4NAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7IGFtb3VudCwgcmVjZWl2ZXIgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDcwCiAgICAvLyBkZWxpc3QoYXBwSWQ6IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6OkZhY3RvcnlDb250cmFjdC5pbml0Qm94ZWRDb250cmFjdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmluaXRCb3hlZENvbnRyYWN0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NDIKICAgIC8vIGluaXRCb3hlZENvbnRyYWN0KHZlcnNpb246IHN0cmluZywgc2l6ZTogdWludDY0KTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgcHVzaGludCAyIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIChsZW4rdXRmOFtdKQogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czozNAogICAgLy8gY2hpbGRDb250cmFjdFZlcnNpb24gPSBHbG9iYWxTdGF0ZTxzdHJpbmc+KHsga2V5OiBCYXNlRmFjdG9yeUdsb2JhbFN0YXRlS2V5Q2hpbGRDb250cmFjdFZlcnNpb24gfSkKICAgIGJ5dGVjIDcgLy8gImNoaWxkX2NvbnRyYWN0X3ZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo0MwogICAgLy8gdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSA9IHZlcnNpb24KICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czozOAogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzIgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NDQKICAgIC8vIGlmICghdGhpcy5ib3hlZENvbnRyYWN0LmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogaW5pdEJveGVkQ29udHJhY3RfZWxzZV9ib2R5QDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjQ1CiAgICAvLyBhc3NlcnQoVHhuLnNlbmRlciA9PT0gR2xvYmFsLmNyZWF0b3JBZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIHR4biBTZW5kZXIKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgPT0KICAgIGFzc2VydCAvLyBPbmx5IHRoZSBBa2l0YSBEQU8gY2FuIGNhbGwgdGhpcyBmdW5jdGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MzgKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18yIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjQ2CiAgICAvLyB0aGlzLmJveGVkQ29udHJhY3QuY3JlYXRlKHsgc2l6ZSB9KQogICAgc3dhcAogICAgYm94X2NyZWF0ZQogICAgcG9wCgppbml0Qm94ZWRDb250cmFjdF9hZnRlcl9pZl9lbHNlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo0MgogICAgLy8gaW5pdEJveGVkQ29udHJhY3QodmVyc2lvbjogc3RyaW5nLCBzaXplOiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmluaXRCb3hlZENvbnRyYWN0X2Vsc2VfYm9keUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NDgKICAgIC8vIGFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMgogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjkKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMgogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWNfMyAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NDgKICAgIC8vIGFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYXNzZXJ0IC8vIE9ubHkgdGhlIEFraXRhIERBTyBjYW4gY2FsbCB0aGlzIGZ1bmN0aW9uCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czozOAogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzIgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NDkKICAgIC8vIHRoaXMuYm94ZWRDb250cmFjdC5yZXNpemUoc2l6ZSkKICAgIHN3YXAKICAgIGJveF9yZXNpemUKICAgIGIgaW5pdEJveGVkQ29udHJhY3RfYWZ0ZXJfaWZfZWxzZUA0CgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6OkZhY3RvcnlDb250cmFjdC5sb2FkQm94ZWRDb250cmFjdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmxvYWRCb3hlZENvbnRyYWN0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTMKICAgIC8vIGxvYWRCb3hlZENvbnRyYWN0KG9mZnNldDogdWludDY0LCBkYXRhOiBieXRlcyk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIHB1c2hpbnQgMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciAobGVuK3VpbnQ4W10pCiAgICBleHRyYWN0IDIgMAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTQKICAgIC8vIGNvbnN0IGV4cGVjdGVkUHJldmlvdXNDYWxsczogdWludDY0ID0gb2Zmc2V0IC8gMjAzMgogICAgcHVzaGludCAyMDMyIC8vIDIwMzIKICAgIC8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjU1CiAgICAvLyBjb25zdCB0eG4gPSBndHhuLlRyYW5zYWN0aW9uKFR4bi5ncm91cEluZGV4IC0gZXhwZWN0ZWRQcmV2aW91c0NhbGxzIC0gMSkKICAgIHR4biBHcm91cEluZGV4CiAgICBzd2FwCiAgICAtCiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1NwogICAgLy8gdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzMgLy8gNgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjU3LTU4CiAgICAvLyB0eG4udHlwZSA9PT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbAogICAgLy8gJiYgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQKICAgIGJ6IGxvYWRCb3hlZENvbnRyYWN0X2Jvb2xfZmFsc2VAOAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTgKICAgIC8vICYmIHR4bi5hcHBJZCA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkCiAgICBkdXAKICAgIGd0eG5zIEFwcGxpY2F0aW9uSUQKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25JRAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjU3LTU4CiAgICAvLyB0eG4udHlwZSA9PT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbAogICAgLy8gJiYgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQKICAgIGJ6IGxvYWRCb3hlZENvbnRyYWN0X2Jvb2xfZmFsc2VAOAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTkKICAgIC8vICYmIHR4bi5udW1BcHBBcmdzID09PSAzCiAgICBkdXAKICAgIGd0eG5zIE51bUFwcEFyZ3MKICAgIHB1c2hpbnQgMyAvLyAzCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTctNTkKICAgIC8vIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsCiAgICAvLyAmJiB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZAogICAgLy8gJiYgdHhuLm51bUFwcEFyZ3MgPT09IDMKICAgIGJ6IGxvYWRCb3hlZENvbnRyYWN0X2Jvb2xfZmFsc2VAOAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjAKICAgIC8vICYmIHR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcAogICAgZHVwCiAgICBndHhucyBPbkNvbXBsZXRpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjU3LTYwCiAgICAvLyB0eG4udHlwZSA9PT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbAogICAgLy8gJiYgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQKICAgIC8vICYmIHR4bi5udW1BcHBBcmdzID09PSAzCiAgICAvLyAmJiB0eG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AKICAgIGJueiBsb2FkQm94ZWRDb250cmFjdF9ib29sX2ZhbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjYxCiAgICAvLyAmJiB0eG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3IodGhpcy5pbml0Qm94ZWRDb250cmFjdCkKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGd0eG5zYXMgQXBwbGljYXRpb25BcmdzCiAgICBieXRlYyAxMSAvLyBtZXRob2QgImluaXRCb3hlZENvbnRyYWN0KHN0cmluZyx1aW50NjQpdm9pZCIKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1Ny02MQogICAgLy8gdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwKICAgIC8vICYmIHR4bi5hcHBJZCA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkCiAgICAvLyAmJiB0eG4ubnVtQXBwQXJncyA9PT0gMwogICAgLy8gJiYgdHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wCiAgICAvLyAmJiB0eG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3IodGhpcy5pbml0Qm94ZWRDb250cmFjdCkKICAgIGJ6IGxvYWRCb3hlZENvbnRyYWN0X2Jvb2xfZmFsc2VAOAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjIKICAgIC8vICYmIHR4bi5zZW5kZXIgPT09IFR4bi5zZW5kZXIKICAgIGR1cAogICAgZ3R4bnMgU2VuZGVyCiAgICB0eG4gU2VuZGVyCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTctNjIKICAgIC8vIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsCiAgICAvLyAmJiB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZAogICAgLy8gJiYgdHhuLm51bUFwcEFyZ3MgPT09IDMKICAgIC8vICYmIHR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcAogICAgLy8gJiYgdHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKHRoaXMuaW5pdEJveGVkQ29udHJhY3QpCiAgICAvLyAmJiB0eG4uc2VuZGVyID09PSBUeG4uc2VuZGVyCiAgICBieiBsb2FkQm94ZWRDb250cmFjdF9ib29sX2ZhbHNlQDgKICAgIGludGNfMSAvLyAxCgpsb2FkQm94ZWRDb250cmFjdF9ib29sX21lcmdlQDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1Ni02MwogICAgLy8gYXNzZXJ0KCgKICAgIC8vICAgdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwKICAgIC8vICAgJiYgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQKICAgIC8vICAgJiYgdHhuLm51bUFwcEFyZ3MgPT09IDMKICAgIC8vICAgJiYgdHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wCiAgICAvLyAgICYmIHR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcih0aGlzLmluaXRCb3hlZENvbnRyYWN0KQogICAgLy8gICAmJiB0eG4uc2VuZGVyID09PSBUeG4uc2VuZGVyCiAgICAvLyApLCBFUlJfSU5WQUxJRF9DQUxMX09SREVSKQogICAgYXNzZXJ0IC8vIEludmFsaWQgY2FsbCBvcmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MzgKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18yIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjY0CiAgICAvLyBhc3NlcnQodGhpcy5ib3hlZENvbnRyYWN0LmV4aXN0cywgRVJSX0NPTlRSQUNUX05PVF9TRVQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGFzc2VydCAvLyBDb250cmFjdCBub3Qgc2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czozOAogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzIgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjUKICAgIC8vIHRoaXMuYm94ZWRDb250cmFjdC5yZXBsYWNlKG9mZnNldCwgZGF0YSkKICAgIGRpZyAzCiAgICBkaWcgMwogICAgYm94X3JlcGxhY2UKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjUzCiAgICAvLyBsb2FkQm94ZWRDb250cmFjdChvZmZzZXQ6IHVpbnQ2NCwgZGF0YTogYnl0ZXMpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmxvYWRCb3hlZENvbnRyYWN0X2Jvb2xfZmFsc2VAODoKICAgIGludGNfMCAvLyAwCiAgICBiIGxvYWRCb3hlZENvbnRyYWN0X2Jvb2xfbWVyZ2VAOQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjpGYWN0b3J5Q29udHJhY3QuZGVsZXRlQm94ZWRDb250cmFjdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmRlbGV0ZUJveGVkQ29udHJhY3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo2OQogICAgLy8gYXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMyCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyOQogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMyCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlY18zIC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo2OQogICAgLy8gYXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBhc3NlcnQgLy8gT25seSB0aGUgQWtpdGEgREFPIGNhbiBjYWxsIHRoaXMgZnVuY3Rpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjM4CiAgICAvLyBib3hlZENvbnRyYWN0ID0gQm94PGJ5dGVzPih7IGtleTogQm94S2V5Qm94ZWRDb250cmFjdCB9KQogICAgYnl0ZWNfMiAvLyAiYmMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo3MAogICAgLy8gdGhpcy5ib3hlZENvbnRyYWN0LmRlbGV0ZSgpCiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjY4CiAgICAvLyBkZWxldGVCb3hlZENvbnRyYWN0KCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpBa2l0YUZlZUdlbmVyYXRvckNvbnRyYWN0V2l0aE9wdEluLm9wdEluW3JvdXRpbmddKCkgLT4gdm9pZDoKb3B0SW46CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNTAKICAgIC8vIG9wdEluKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYXNzZXQ6IEFzc2V0KTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNTIKICAgIC8vIGNvbnN0IGNvdW50ID0gc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYWRkcmVzcywgYXNzZXQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjkKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNTIKICAgIC8vIGNvbnN0IGNvdW50ID0gc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYWRkcmVzcywgYXNzZXQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjY1CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTUyCiAgICAvLyBjb25zdCBjb3VudCA9IHNwbGl0T3B0SW5Db3VudCh0aGlzLmFraXRhREFPLnZhbHVlLCB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFkZHJlc3MsIGFzc2V0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGRpZyAyCiAgICBjYWxsc3ViIHNwbGl0T3B0SW5Db3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTU0LTE2MQogICAgLy8gYXNzZXJ0TWF0Y2goCiAgICAvLyAgIHBheW1lbnQsCiAgICAvLyAgIHsKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiAoMSArIGNvdW50KSwKICAgIC8vICAgfSwKICAgIC8vICAgRVJSX0lOVkFMSURfUEFZTUVOVAogICAgLy8gKQogICAgZGlnIDIKICAgIGd0eG5zIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNTcKICAgIC8vIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNTQtMTYxCiAgICAvLyBhc3NlcnRNYXRjaCgKICAgIC8vICAgcGF5bWVudCwKICAgIC8vICAgewogICAgLy8gICAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSAqICgxICsgY291bnQpLAogICAgLy8gICB9LAogICAgLy8gICBFUlJfSU5WQUxJRF9QQVlNRU5UCiAgICAvLyApCiAgICA9PQogICAgdW5jb3ZlciAzCiAgICBndHhucyBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE1OAogICAgLy8gYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiAoMSArIGNvdW50KSwKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgaW50Y18xIC8vIDEKICAgIHVuY292ZXIgNAogICAgKwogICAgKgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTU0LTE2MQogICAgLy8gYXNzZXJ0TWF0Y2goCiAgICAvLyAgIHBheW1lbnQsCiAgICAvLyAgIHsKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiAoMSArIGNvdW50KSwKICAgIC8vICAgfSwKICAgIC8vICAgRVJSX0lOVkFMSURfUEFZTUVOVAogICAgLy8gKQogICAgPT0KICAgICYmCiAgICBhc3NlcnQgLy8gSW52YWxpZCBwYXltZW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNjMtMTY5CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogMCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTY1CiAgICAvLyBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTY2CiAgICAvLyBhc3NldEFtb3VudDogMCwKICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE2My0xNjgKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vICAgfSkKICAgIHB1c2hpbnQgNCAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE2My0xNjkKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTUwCiAgICAvLyBvcHRJbihwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGFzc2V0OiBBc3NldCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpBa2l0YUZlZUdlbmVyYXRvckNvbnRyYWN0V2l0aE9wdEluLm9wdEluQ29zdFtyb3V0aW5nXSgpIC0+IHZvaWQ6Cm9wdEluQ29zdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE3MgogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTc0CiAgICAvLyBjb25zdCBjb3VudCA9IHNwbGl0T3B0SW5Db3VudCh0aGlzLmFraXRhREFPLnZhbHVlLCB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFkZHJlc3MsIGFzc2V0KQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI5CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTc0CiAgICAvLyBjb25zdCBjb3VudCA9IHNwbGl0T3B0SW5Db3VudCh0aGlzLmFraXRhREFPLnZhbHVlLCB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFkZHJlc3MsIGFzc2V0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo2NQogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE3NAogICAgLy8gY29uc3QgY291bnQgPSBzcGxpdE9wdEluQ291bnQodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hZGRyZXNzLCBhc3NldCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgc3BsaXRPcHRJbkNvdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNzUKICAgIC8vIHJldHVybiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiAoMSArIGNvdW50KQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBpbnRjXzEgLy8gMQogICAgdW5jb3ZlciAyCiAgICArCiAgICAqCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNzIKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgaXRvYgogICAgYnl0ZWMgNCAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpBa2l0YUJhc2VGZWVHZW5lcmF0b3JDb250cmFjdC51cGRhdGVBa2l0YURBT0VzY3Jvd1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZUFraXRhREFPRXNjcm93OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTM3CiAgICAvLyB1cGRhdGVBa2l0YURBT0VzY3JvdyhhcHA6IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTM4CiAgICAvLyBhc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzIKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI5CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzIKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjXzMgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEzOAogICAgLy8gYXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBhc3NlcnQgLy8gT25seSB0aGUgQWtpdGEgREFPIGNhbiBjYWxsIHRoaXMgZnVuY3Rpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjY1CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTM5CiAgICAvLyB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlID0gYXBwCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTM3CiAgICAvLyB1cGRhdGVBa2l0YURBT0VzY3JvdyhhcHA6IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OlVwZ3JhZGVhYmxlQWtpdGFCYXNlQ29udHJhY3QudXBkYXRlW3JvdXRpbmddKCkgLT4gdm9pZDoKdXBkYXRlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIHB1c2hpbnQgMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciAobGVuK3V0ZjhbXSkKICAgIGV4dHJhY3QgMiAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo1MAogICAgLy8gYXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMyCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyOQogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMyCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkdXAKICAgIGJ5dGVjXzMgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUwCiAgICAvLyBhc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgdW5jb3ZlciAyCiAgICA9PQogICAgYXNzZXJ0IC8vIE9ubHkgdGhlIEFraXRhIERBTyBjYW4gY2FsbCB0aGlzIGZ1bmN0aW9uCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0CiAgICAvLyBjb25zdCBbcGx1Z2luQXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1BsdWdpbkFwcExpc3QpKQogICAgYnl0ZWMgMTkgLy8gInBhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUxCiAgICAvLyBjb25zdCB1cGRhdGVQbHVnaW4gPSBnZXRQbHVnaW5BcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnVwZGF0ZQogICAgcHVzaGludCAxNiAvLyAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUyCiAgICAvLyBhc3NlcnQoR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uSWQgPT09IHVwZGF0ZVBsdWdpbiwgRVJSX0lOVkFMSURfVVBHUkFERSkKICAgIGdsb2JhbCBDYWxsZXJBcHBsaWNhdGlvbklECiAgICA9PQogICAgYXNzZXJ0IC8vIEludmFsaWQgYXBwIHVwZ3JhZGUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyB2ZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogR2xvYmFsU3RhdGVLZXlWZXJzaW9uIH0pCiAgICBieXRlYyAxMiAvLyAidmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUzCiAgICAvLyB0aGlzLnZlcnNpb24udmFsdWUgPSBuZXdWZXJzaW9uCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpBa2l0YUJhc2VDb250cmFjdC51cGRhdGVBa2l0YURBT1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZUFraXRhREFPOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzgKICAgIC8vIHVwZGF0ZUFraXRhREFPKGFraXRhREFPOiBBcHBsaWNhdGlvbik6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM5CiAgICAvLyBhc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzIKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI5CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzIKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjXzMgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM5CiAgICAvLyBhc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGFzc2VydCAvLyBPbmx5IHRoZSBBa2l0YSBEQU8gY2FuIGNhbGwgdGhpcyBmdW5jdGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjkKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0MAogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSA9IGFraXRhREFPCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzgKICAgIC8vIHVwZGF0ZUFraXRhREFPKGFraXRhREFPOiBBcHBsaWNhdGlvbik6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpBa2l0YUJhc2VGZWVHZW5lcmF0b3JDb250cmFjdC5vcHRBa2l0YUVzY3Jvd0luQW5kU2VuZChuYW1lOiBieXRlcywgYXNzZXQ6IHVpbnQ2NCwgYW1vdW50OiB1aW50NjQpIC0+IHVpbnQ2NDoKb3B0QWtpdGFFc2Nyb3dJbkFuZFNlbmQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4MAogICAgLy8gcHJvdGVjdGVkIG9wdEFraXRhRXNjcm93SW5BbmRTZW5kKG5hbWU6IHN0cmluZywgYXNzZXQ6IEFzc2V0LCBhbW91bnQ6IHVpbnQ2NCk6IHVpbnQ2NCB7CiAgICBwcm90byAzIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMyCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyOQogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMyCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkdXAKICAgIGJ5dGVjXzMgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTQKICAgIC8vIGNvbnN0IFtwbHVnaW5BcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzUGx1Z2luQXBwTGlzdCkpCiAgICBkdXAKICAgIGJ5dGVjIDE5IC8vICJwYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4MwogICAgLy8gY29uc3QgeyByZXZlbnVlTWFuYWdlciB9ID0gZ2V0UGx1Z2luQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgZHVwCiAgICBleHRyYWN0IDggOAogICAgc3dhcAogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMgogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBkaWcgMgogICAgYnl0ZWNfMyAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NzAtNzMKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9nZXRFc2Nyb3dzPih7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbW25hbWVdXSwKICAgIC8vIH0pLnJldHVyblZhbHVlWzBdCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo3MgogICAgLy8gYXJnczogW1tuYW1lXV0sCiAgICBmcmFtZV9kaWcgLTMKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIGZyYW1lX2RpZyAtMwogICAgY29uY2F0CiAgICBwdXNoYnl0ZXMgMHgwMDAxMDAwMgogICAgZGlnIDEKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NzAtNzMKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9nZXRFc2Nyb3dzPih7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbW25hbWVdXSwKICAgIC8vIH0pLnJldHVyblZhbHVlWzBdCiAgICBwdXNoYnl0ZXMgMHhhMjQwM2RkZiAvLyBtZXRob2QgImFyYzU4X2dldEVzY3Jvd3Moc3RyaW5nW10pKHVpbnQ2NCxib29sKVtdIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIGludGNfMyAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIGRpZyAxCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWMgNCAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBwdXNoaW50IDkgLy8gOQogICAgKgogICAgcHVzaGludCAyIC8vIDIKICAgICsKICAgIHN3YXAKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgKGxlbisodWludDY0LGJvb2wxKVtdKQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NzUKICAgIC8vIGFzc2VydChlc2Nyb3cuaWQgIT09IDAsIEVSUl9FU0NST1dfRE9FU19OT1RfRVhJU1QpCiAgICBleHRyYWN0IDYgOQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGFzc2VydCAvLyBFc2Nyb3cgZG9lcyBub3QgZXhpc3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg2CiAgICAvLyBhc3NlcnQoaWQgPT09IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuaWQsIEVSUl9XUk9OR19FU0NST1dfRk9SX09QRVJBVElPTikKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo2NQogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg2CiAgICAvLyBhc3NlcnQoaWQgPT09IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuaWQsIEVSUl9XUk9OR19FU0NST1dfRk9SX09QRVJBVElPTikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBzd2FwCiAgICBkaWcgMQogICAgPT0KICAgIGFzc2VydCAvLyBXcm9uZyBlc2Nyb3cgZm9yIHRoaXMgb3BlcmF0aW9uCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4OC05NwogICAgLy8gaXR4bkNvbXBvc2UuYmVnaW48dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9yZWtleVRvUGx1Z2luPih7CiAgICAvLyAgIGFwcElkOiB3YWxsZXQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIG5hbWUsCiAgICAvLyAgICAgWzBdLCAvLyBhbGwgdGhlIGFraXRhIGVzY3Jvd3MgaGF2ZSBtZXRob2QgcmVzdHJpY3Rpb25zIHdpdGggb3B0aW4gYmVpbmcgaW5kZXggMAogICAgLy8gICAgIFtdCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgcHVzaGJ5dGVzIDB4NTgyZmYzODIgLy8gbWV0aG9kICJhcmM1OF9yZWtleVRvUGx1Z2luKHVpbnQ2NCxib29sLHN0cmluZyx1aW50NjRbXSwodWludDY0LHVpbnQ2NClbXSl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjkyCiAgICAvLyB0cnVlLAogICAgYnl0ZWMgMTAgLy8gMHg4MAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo5NAogICAgLy8gWzBdLCAvLyBhbGwgdGhlIGFraXRhIGVzY3Jvd3MgaGF2ZSBtZXRob2QgcmVzdHJpY3Rpb25zIHdpdGggb3B0aW4gYmVpbmcgaW5kZXggMAogICAgcHVzaGJ5dGVzIDB4MDAwMTAwMDAwMDAwMDAwMDAwMDAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo5NQogICAgLy8gW10KICAgIHB1c2hieXRlcyAweDAwMDAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkaWcgMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4OC05NwogICAgLy8gaXR4bkNvbXBvc2UuYmVnaW48dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9yZWtleVRvUGx1Z2luPih7CiAgICAvLyAgIGFwcElkOiB3YWxsZXQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIG5hbWUsCiAgICAvLyAgICAgWzBdLCAvLyBhbGwgdGhlIGFraXRhIGVzY3Jvd3MgaGF2ZSBtZXRob2QgcmVzdHJpY3Rpb25zIHdpdGggb3B0aW4gYmVpbmcgaW5kZXggMAogICAgLy8gICAgIFtdCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaW50Y18zIC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTAxCiAgICAvLyB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFkZHJlc3MsCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo5OS0xMDMKICAgIC8vIGNvbnN0IG9wdEluQ291bnQgPSBzcGxpdE9wdEluQ291bnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYWRkcmVzcywKICAgIC8vICAgYXNzZXQKICAgIC8vICkKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgZnJhbWVfZGlnIC0yCiAgICBjYWxsc3ViIHNwbGl0T3B0SW5Db3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTA1CiAgICAvLyBjb25zdCBtYnJBbW91bnQ6IHVpbnQ2NCA9IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSAqIG9wdEluQ291bnQKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgKgogICAgZHVwCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMDctMTE4CiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBSZXZlbnVlTWFuYWdlclBsdWdpblN0dWIucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHdhbGxldCwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIFthc3NldC5pZF0sCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gICAgIH0pCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjExNAogICAgLy8gcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYWRkcmVzcywKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo2NQogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjExNAogICAgLy8gcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYWRkcmVzcywKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTEzLTExNgogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiBtYnJBbW91bnQKICAgIC8vIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMDctMTE4CiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBSZXZlbnVlTWFuYWdlclBsdWdpblN0dWIucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHdhbGxldCwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIFthc3NldC5pZF0sCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gICAgIH0pCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjExMAogICAgLy8gd2FsbGV0LAogICAgZGlnIDEKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjExMgogICAgLy8gW2Fzc2V0LmlkXSwKICAgIGZyYW1lX2RpZyAtMgogICAgaXRvYgogICAgcHVzaGJ5dGVzIDB4MDAwMQogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMDctMTE4CiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBSZXZlbnVlTWFuYWdlclBsdWdpblN0dWIucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHdhbGxldCwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIFthc3NldC5pZF0sCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gICAgIH0pCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBwdXNoYnl0ZXMgMHg2ODM1ZTNiYyAvLyBtZXRob2QgIm9wdEluKHVpbnQ2NCxib29sLHVpbnQ2NFtdLHBheSl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo5MgogICAgLy8gdHJ1ZSwKICAgIGJ5dGVjIDEwIC8vIDB4ODAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMDctMTE4CiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBSZXZlbnVlTWFuYWdlclBsdWdpblN0dWIucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHdhbGxldCwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIFthc3NldC5pZF0sCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gICAgIH0pCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpbnRjXzMgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMjAKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF92ZXJpZnlBdXRoQWRkcmVzcz4oeyBhcHBJZDogd2FsbGV0IH0pCiAgICBpdHhuX25leHQKICAgIHB1c2hieXRlcyAweDZjYzNmNjA2IC8vIG1ldGhvZCAiYXJjNThfdmVyaWZ5QXV0aEFkZHJlc3MoKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBpbnRjXzMgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMjIKICAgIC8vIGlmIChhbW91bnQgPiAwKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ6IG9wdEFraXRhRXNjcm93SW5BbmRTZW5kX2FmdGVyX2lmX2Vsc2VAMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTIzLTEyOQogICAgLy8gaXR4bkNvbXBvc2UubmV4dCgKICAgIC8vICAgaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0LAogICAgLy8gICB9KQogICAgLy8gKQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMjUKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYWRkcmVzcywKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo2NQogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEyNQogICAgLy8gYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hZGRyZXNzLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGZyYW1lX2RpZyAtMgogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGZyYW1lX2RpZyAtMQogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMjQtMTI4CiAgICAvLyBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFkZHJlc3MsCiAgICAvLyAgIGFzc2V0QW1vdW50OiBhbW91bnQsCiAgICAvLyAgIHhmZXJBc3NldDogYXNzZXQsCiAgICAvLyB9KQogICAgcHVzaGludCA0IC8vIDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQoKb3B0QWtpdGFFc2Nyb3dJbkFuZFNlbmRfYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTMyCiAgICAvLyBpdHhuQ29tcG9zZS5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEzNAogICAgLy8gcmV0dXJuIG1ickFtb3VudAogICAgZnJhbWVfZGlnIDAKICAgIHN3YXAKICAgIHJldHN1Ygo=", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEgLy8gMQogICAgcmV0dXJuCg==" }, "byteCode": { "approval": "CyAHAAEIBrjZA5juLNCGAyYUCWFraXRhX2Rhbwxha2l0YV9lc2Nyb3cCYmMGd2FsbGV0BBUffHUGZnVuZGVyA2FhbBZjaGlsZF9jb250cmFjdF92ZXJzaW9uB2dhdGVfaWQEPqEYMgGABMU7MswHdmVyc2lvbgTW8R6lBAuBAUMPcmV2X21hcmtldHBsYWNlBK35KuQEahY5PQQXHJ+IA3BhbIAE6pGA3TYaAI4BAIkxGRREMRhBAHKCBwTi+p4hBIHcUWoEbpA1zARdemF3BNqpdRYEAs+xzwTJfbsuJwuCBwTcothiBNNGsaQEOU6usgQz94gIBB6tIKkEM+kslASFTe3gNhoAjg8BgwRoBn4HIwekCFYI5AksCXIJ3gnxCj4KZgq1AAEAI0OABMQm9Lo2GgCOAQEsADEZgQQSMRgQREIKZYoBATEAi/9AAASLAEyJi/+AEmNvbnRyb2xsZWRfYWRkcmVzc2VIQv/jigIBi/6AA29hbGVIgRhbsYAEPBpvM7Iai/+yGrIYJbIQIrIBs7Q+SVcEAEsBVwAEJwQSREkiWYECCEwVEkRXBgBJFUlBAAeLASQTQQAEIowAiYsAF0L/94oEAYv8OBiL/ScGZUiBKFsSQQA6i/w4GUAAM4v8OBuBBBJBACmL/CLCGoAEQ5ImVRJBABqL/CPCGov+EkEAD4v8gQLCGov/FhJBAAIjiSKJigIBi/9BABeL/icGZUgkW3IIRIv/cABFAUAAAzIQiSKJigMBIov+i/9wAEUBQAAai/2ADnJldmVudWVfc3BsaXRzZUgiWSMIjACLAEyJNhoBSSJZgQIISwEVEkRXAgA2GgJJIlmBAghLARUSRFcCADYaA0kVJBJEFzYaBEkVJBJEFycMTwRnJwdPA2coTwJnKUxnI0MigABHBzEWgQIJSTgQIxJEMRYjCUk4EIEEEkQ2GgFHAhUkEkQXNhoCSU4CSRUkEkQXSU4CNhoDSU4DFSQSRDYaBElOAxWBIBJENhoFSU4DFSQSRDYaBklOAxWBIBJENhoHSU4DSSJZgQIITBUSRDYaCElOA0kiWUlOBIEgC4ECCEwVEkRMgQQPRCq9RQFEQAJKMhBFDyIoZURLCzgRSUUViP7IIQQIRRFLB0ACGEsQIQQIRRFLB0AB9iIyAUsQCEsSCAghBQhJRQ5LDEk4BzIKEkw4CE8CEhBESwpJOAAxABJLATgUMgoSEEw4EklFEBBEIihlTEUVRCJFEklAATSBiCdFEiq9RCoiTwK6sUsTSU4CFjEASw84AEsRFlBLFhYiJwdlREkVFlcGAkxQIihlRBYiKWVEFicNshpLBrIagAEAshpLErIaSxGyGksPshpPBbIaTwSyGksMshpPA7IaSwqyGksJshpPArIaTLIashojsjiBBbI1gQqyNCKyGScOskJMskAlshAisgGztwA9SUUTsUlyCEQyAUsVCLIIsgcjshAisgGzsUlyCEQyELIIsgcjshAisgG2JwmyGkyyGiKyGUmyGCWyECKyAbOxcghETLIRSw6yErIUgQSyECKyAbNLB0EAQbFLD0lyCERLELIIsgcjshAisgG2JwmyGksJshoishmyGCWyECKyAbMiKWVEcghESwhwAEUBQAAJJw9LCCKIByZISw8WJwRMULAjQ7FLEycGZUiBSFtLE0lxC0RMFgEBIxaABAzxuc+yGk8CshpLBbIaTLIaSwOyGrIagAkAB3JveWFsdHmyGrIYJbIQIrIBs7Q+SVcEAEsBVwAEJwQSREkiWYECCEwVEkRXBgBJRRYVQQAFSxQXRRJLESEGDUH+XCEGRRJC/lUyECIoZUQiKWVEcghESwqI/MsLQv31IihlREsIiPydgZi/EghLEQhFEUL92TIQgQILRQ9C/bCAAEcDMRaBAglHAjgQJRJEMRYjCUlOAjgQIxJENhoBSU4CSRUkEkQXNhoCSU4DSRUkEkQXTgI2GgNJTgMVJBJENhoESU4DFYEgEkQ2GgVJTgMVJBJENhoGSU4DFYEgEkSBBA9EKr1FAUQiwhonEBJBAaBLCDgZQAGZI0QiKGVESwk4GElFDElyB0RPAicGZUiBGFtyCEQSRIAFb3duZXJlSDIKEkRLBEABYSJFC0sEQAFGIQRFDUsEQAEnIjIBSwwISw5JTgIITwIIIQUISwlJOAcyChJLATgISwMSEEQqvUQqIk8CurFLDUlOBBYxAE8DOABPBBZQIhYiJwdlREkVFlcGAkxQIihlRBYiKWVEFicNshpPBrIaJwqyGksPshpLDrIaSwyyGk8FshpPBLIaSwmyGk8DshpLB7IaSwayGk8CshpMshqyGiOyOIEFsjWBCrI0IrIZJw6yQrJAJbIQIrIBs7cAPUlFD7FJcghEMgFPBAiyCLIHI7IQIrIBs7FyCEQnELIashqyGCWyECKyAbNLBEEAQbFLC0lyCERLDLIIsgcjshAisgG2JwmyGksGshoishmyGCWyECKyAbMiKWVEcghESwVwAEUBQAAJJw9LBSKIBJJISwsWJwRMULAjQzIQIihlRCIpZURyCERLB4j6swtC/sQiKGVESwWI+oWB4OUOCEUNQv6rMhBFC0L+myJC/mQxFoECCUk4ECMSRDEWIwlJOBAlEkQ2GgFJFSQSRBc2GgJJFYEgEkQiKGVEMQCI+ZiI+WxLAnIHRDIKEkRLAicIZUgiKGVETwVMTwNPA4j50ERLAjgHMgoSREsBJwVlSElXACBMgSBbsUsDcghETwU4CLIIsgcjshAisgG2MQAnEbIashpPArIagQWyGU8CshglshAisgGzsbIIsgcjshAisgGzI0MxFiMJSTgQIxJENhoBSRUkEkQXNhoCSRWBIBJESwFyB0QyChJESwEnCGVIFERLAjgHMgoSREsBJwVlSElXACBMgSBbsUsDcghETwU4CLIIsgcjshAisgG2MQAnEbIashpPArIagQWyGU8CshglshAisgGzsbIIsgcjshAisgGzI0MxFoECCUk4EIEEEkQxFiMJSTgQJRJENhoBSRUkEkQXNhoCSRWBIBJEIihlRDEAiPhxiPhFSwJyB0QyChJESwInCGVIIihlRE8FTE8DTwOI+KlESwI4FDIKEksDOBJMSwEQREsCJwVlSElXACBMgSBbsUsEcghETwY4EbIRTwOyErIUgQSyECKyAbYxACcSshqyGk8CshoishlPArIYJbIQIrIBs7GyCLIHI7IQIrIBsyNDMRYjCUk4EIEEEkQ2GgFJFSQSRBc2GgJJFYEgEkRLAXIHRDIKEkRLAScIZUgUREsCOBQyChJLAzgSTEsBEERLAicFZUhJVwAgTIEgW7FLBHIIRE8GOBGyEU8DshKyFIEEshAisgG2MQAnErIashpPArIaIrIZTwKyGCWyECKyAbOxsgiyByOyECKyAbMjQzYaAUkVJBJEF0lyB0QyChJESScFZUhJVwAgTIEgW7ExAIAEaOhjQ7IashqBBbIZTwKyGCWyECKyAbOxsgiyByOyECKyAbMjQzYaAUkiWYECCEsBFRJEVwIANhoCSRUkEkQXTCcHTGcqvUUBQAAMMQAyCRJEKky5SCNDMQAiKGVEK2VIcghEEkQqTNNC/+o2GgFJFSQSRBdJNhoCSSJZgQIISwEVEkRXAgBMgfAPCjEWTAkjCUk4ECUSQQA6STgYMggSQQAxSTgbgQMSQQAoSTgZQAAiSSLCGicLEkEAGEk4ADEAEkEADyNEKr1FAUQqSwNLA7sjQyJC/+4xACIoZUQrZUhyCEQSRCq8SCNDMRYjCUk4ECMSRDYaAUkVJBJEFyIoZUQiKWVEcghESwKI9vtLAjgHMgoSTwM4CDIQI08ECAsSEESxMgpMshEishKyFIEEshAisgGzI0M2GgFJFSQSRBciKGVEIillRHIIRE8CiPa4MhAjTwIICxYnBExQsCNDNhoBSRUkEkQXMQAiKGVEK2VIcghEEkQpTGcjQzYaAUkiWYECCEsBFRJEVwIAMQAiKGVESStlSHIIRE8CEkQnE2VIgRBbMg0SRCcMTGcjQzYaAUkVJBJEFzEAIihlRCtlSHIIRBJEKExnI0OKAwEiKGVESStlSExJJxNlSElXCAhMJFtLAitlSLGL/RUWVwYCi/1QgAQAAQACSwFQgASiQD3fshqyGkyyGCWyECKyAbO0PklXBABLAVcABCcEEkRJIlmBCQuBAghMFRJEVwYJIltJRCIpZURMSwESRLGABFgv84KyGk8DshonCrIaTLIagAoAAQAAAAAAAAAAshqAAgAAshpLA7IYJbIQIrIBcghETwJMi/6I9ZAyEAtJTgO2IillRHIIRLIHsggjshAisgG2SwEWi/4WgAIAAUxQgARoNeO8shpMshonCrIashqyGCWyECKyAbaABGzD9gayGrIYJbIQIrIBi/9BABm2IillRHIIRIv+shGL/7ISshSBBLIQIrIBs4sATIk=", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
var BinaryStateValue = class {
  constructor(value) {
    this.value = value;
  }
  asByteArray() {
    return this.value;
  }
  asString() {
    return this.value !== void 0 ? Buffer.from(this.value).toString("utf-8") : void 0;
  }
};
var MarketplaceParamsFactory = class _MarketplaceParamsFactory {
  /**
   * Gets available create ABI call param factories
   */
  static get create() {
    return {
      _resolveByMethod(params) {
        switch (params.method) {
          case "create":
          case "create(string,string,uint64,uint64)void":
            return _MarketplaceParamsFactory.create.create(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs create ABI call params for the Marketplace smart contract using the create(string,string,uint64,uint64)void ABI method
       *
       * @param params Parameters for the call
       * @returns An `AppClientMethodCallParams` object for the call
       */
      create(params) {
        return {
          ...params,
          method: "create(string,string,uint64,uint64)void",
          args: Array.isArray(params.args) ? params.args : [params.args.version, params.args.childVersion, params.args.akitaDao, params.args.akitaDaoEscrow]
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
            return _MarketplaceParamsFactory.update.update(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs update ABI call params for the Marketplace smart contract using the update(string)void ABI method
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
   * Constructs a no op call for the list(pay,axfer,uint64,uint64,uint64,address,uint64,address,string,byte[32][])uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static list(params) {
    return {
      ...params,
      method: "list(pay,axfer,uint64,uint64,uint64,address,uint64,address,string,byte[32][])uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.assetXfer, params.args.price, params.args.paymentAsset, params.args.expiration, params.args.reservedFor, params.args.gateId, params.args.marketplace, params.args.name, params.args.proof]
    };
  }
  /**
   * Constructs a no op call for the listPrizeBox(appl,pay,uint64,uint64,uint64,address,uint64,address)uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static listPrizeBox(params) {
    return {
      ...params,
      method: "listPrizeBox(appl,pay,uint64,uint64,uint64,address,uint64,address)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.prizeBoxTransferTxn, params.args.payment, params.args.price, params.args.paymentAsset, params.args.expiration, params.args.reservedFor, params.args.gateId, params.args.marketplace]
    };
  }
  /**
   * Constructs a no op call for the gatedPurchase(pay,appl,uint64,address)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static gatedPurchase(params) {
    return {
      ...params,
      method: "gatedPurchase(pay,appl,uint64,address)void",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.gateTxn, params.args.appId, params.args.marketplace]
    };
  }
  /**
   * Constructs a no op call for the purchase(pay,uint64,address)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static purchase(params) {
    return {
      ...params,
      method: "purchase(pay,uint64,address)void",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.appId, params.args.marketplace]
    };
  }
  /**
   * Constructs a no op call for the gatedPurchaseAsa(axfer,appl,uint64,address)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static gatedPurchaseAsa(params) {
    return {
      ...params,
      method: "gatedPurchaseAsa(axfer,appl,uint64,address)void",
      args: Array.isArray(params.args) ? params.args : [params.args.assetXfer, params.args.gateTxn, params.args.appId, params.args.marketplace]
    };
  }
  /**
   * Constructs a no op call for the purchaseAsa(axfer,uint64,address)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static purchaseAsa(params) {
    return {
      ...params,
      method: "purchaseAsa(axfer,uint64,address)void",
      args: Array.isArray(params.args) ? params.args : [params.args.assetXfer, params.args.appId, params.args.marketplace]
    };
  }
  /**
   * Constructs a no op call for the delist(uint64)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static delist(params) {
    return {
      ...params,
      method: "delist(uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.appId]
    };
  }
  /**
   * Constructs a no op call for the initBoxedContract(string,uint64)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static initBoxedContract(params) {
    return {
      ...params,
      method: "initBoxedContract(string,uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.version, params.args.size]
    };
  }
  /**
   * Constructs a no op call for the loadBoxedContract(uint64,byte[])void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static loadBoxedContract(params) {
    return {
      ...params,
      method: "loadBoxedContract(uint64,byte[])void",
      args: Array.isArray(params.args) ? params.args : [params.args.offset, params.args.data]
    };
  }
  /**
   * Constructs a no op call for the deleteBoxedContract()void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static deleteBoxedContract(params) {
    return {
      ...params,
      method: "deleteBoxedContract()void",
      args: Array.isArray(params.args) ? params.args : []
    };
  }
  /**
   * Constructs a no op call for the optIn(pay,uint64)void ABI method
   *
   * optin tells the contract to opt into an asa
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static optIn(params) {
    return {
      ...params,
      method: "optIn(pay,uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.asset]
    };
  }
  /**
   * Constructs a no op call for the optInCost(uint64)uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static optInCost(params) {
    return {
      ...params,
      method: "optInCost(uint64)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.asset]
    };
  }
  /**
   * Constructs a no op call for the updateAkitaDAOEscrow(uint64)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static updateAkitaDaoEscrow(params) {
    return {
      ...params,
      method: "updateAkitaDAOEscrow(uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.app]
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
  /**
   * Constructs a no op call for the opUp()void ABI method
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
};
var MarketplaceFactory = (_class = class {
  /**
   * The underlying `AppFactory` for when you want to have more flexibility
   */
  
  /**
   * Creates a new instance of `MarketplaceFactory`
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
    return new MarketplaceClient(this.appFactory.getAppClientById(params));
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
    return new MarketplaceClient(await this.appFactory.getAppClientByCreatorAndName(params));
  }
  /**
   * Idempotently deploys the Marketplace smart contract.
   *
   * @param params The arguments for the contract calls and any additional parameters for the call
   * @returns The deployment result
   */
  async deploy(params = {}) {
    var _a, _b;
    const result = await this.appFactory.deploy({
      ...params,
      createParams: ((_a = params.createParams) == null ? void 0 : _a.method) ? MarketplaceParamsFactory.create._resolveByMethod(params.createParams) : params.createParams ? params.createParams : void 0,
      updateParams: ((_b = params.updateParams) == null ? void 0 : _b.method) ? MarketplaceParamsFactory.update._resolveByMethod(params.updateParams) : params.updateParams ? params.updateParams : void 0
    });
    return { result: result.result, appClient: new MarketplaceClient(result.appClient) };
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
       * Creates a new instance of the Marketplace smart contract using the create(string,string,uint64,uint64)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create params
       */
      create: (params) => {
        return this.appFactory.params.create(MarketplaceParamsFactory.create.create(params));
      }
    },
    /**
     * Gets available deployUpdate methods
     */
    deployUpdate: {
      /**
       * Updates an existing instance of the Marketplace smart contract using the update(string)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The deployUpdate params
       */
      update: (params) => {
        return this.appFactory.params.deployUpdate(MarketplaceParamsFactory.update.update(params));
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
       * Creates a new instance of the Marketplace smart contract using the create(string,string,uint64,uint64)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create transaction
       */
      create: (params) => {
        return this.appFactory.createTransaction.create(MarketplaceParamsFactory.create.create(params));
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
       * Creates a new instance of the Marketplace smart contract using an ABI method call using the create(string,string,uint64,uint64)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create result
       */
      create: async (params) => {
        const result = await this.appFactory.send.create(MarketplaceParamsFactory.create.create(params));
        return { result: { ...result.result, return: result.result.return }, appClient: new MarketplaceClient(result.appClient) };
      }
    }
  }}
}, _class);
var MarketplaceClient = (_class2 = class _MarketplaceClient {
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
   * Returns a new `MarketplaceClient` client, resolving the app by creator address and name
   * using AlgoKit app deployment semantics (i.e. looking for the app creation transaction note).
   * @param params The parameters to create the app client
   */
  static async fromCreatorAndName(params) {
    return new _MarketplaceClient(await _appclient.AppClient.fromCreatorAndName({ ...params, appSpec: APP_SPEC }));
  }
  /**
   * Returns an `MarketplaceClient` instance for the current network based on
   * pre-determined network-specific app IDs specified in the ARC-56 app spec.
   *
   * If no IDs are in the app spec or the network isn't recognised, an error is thrown.
   * @param params The parameters to create the app client
   */
  static async fromNetwork(params) {
    return new _MarketplaceClient(await _appclient.AppClient.fromNetwork({ ...params, appSpec: APP_SPEC }));
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
       * Updates an existing instance of the Marketplace smart contract using the `update(string)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The update params
       */
      update: (params) => {
        return this.appClient.params.update(MarketplaceParamsFactory.update.update(params));
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the Marketplace smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.params.bare.clearState(params);
    },
    /**
     * Makes a call to the Marketplace smart contract using the `list(pay,axfer,uint64,uint64,uint64,address,uint64,address,string,byte[32][])uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    list: (params) => {
      return this.appClient.params.call(MarketplaceParamsFactory.list(params));
    },
    /**
     * Makes a call to the Marketplace smart contract using the `listPrizeBox(appl,pay,uint64,uint64,uint64,address,uint64,address)uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    listPrizeBox: (params) => {
      return this.appClient.params.call(MarketplaceParamsFactory.listPrizeBox(params));
    },
    /**
     * Makes a call to the Marketplace smart contract using the `gatedPurchase(pay,appl,uint64,address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    gatedPurchase: (params) => {
      return this.appClient.params.call(MarketplaceParamsFactory.gatedPurchase(params));
    },
    /**
     * Makes a call to the Marketplace smart contract using the `purchase(pay,uint64,address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    purchase: (params) => {
      return this.appClient.params.call(MarketplaceParamsFactory.purchase(params));
    },
    /**
     * Makes a call to the Marketplace smart contract using the `gatedPurchaseAsa(axfer,appl,uint64,address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    gatedPurchaseAsa: (params) => {
      return this.appClient.params.call(MarketplaceParamsFactory.gatedPurchaseAsa(params));
    },
    /**
     * Makes a call to the Marketplace smart contract using the `purchaseAsa(axfer,uint64,address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    purchaseAsa: (params) => {
      return this.appClient.params.call(MarketplaceParamsFactory.purchaseAsa(params));
    },
    /**
     * Makes a call to the Marketplace smart contract using the `delist(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    delist: (params) => {
      return this.appClient.params.call(MarketplaceParamsFactory.delist(params));
    },
    /**
     * Makes a call to the Marketplace smart contract using the `initBoxedContract(string,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    initBoxedContract: (params) => {
      return this.appClient.params.call(MarketplaceParamsFactory.initBoxedContract(params));
    },
    /**
     * Makes a call to the Marketplace smart contract using the `loadBoxedContract(uint64,byte[])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    loadBoxedContract: (params) => {
      return this.appClient.params.call(MarketplaceParamsFactory.loadBoxedContract(params));
    },
    /**
     * Makes a call to the Marketplace smart contract using the `deleteBoxedContract()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    deleteBoxedContract: (params = { args: [] }) => {
      return this.appClient.params.call(MarketplaceParamsFactory.deleteBoxedContract(params));
    },
    /**
     * Makes a call to the Marketplace smart contract using the `optIn(pay,uint64)void` ABI method.
     *
     * optin tells the contract to opt into an asa
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    optIn: (params) => {
      return this.appClient.params.call(MarketplaceParamsFactory.optIn(params));
    },
    /**
     * Makes a call to the Marketplace smart contract using the `optInCost(uint64)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    optInCost: (params) => {
      return this.appClient.params.call(MarketplaceParamsFactory.optInCost(params));
    },
    /**
     * Makes a call to the Marketplace smart contract using the `updateAkitaDAOEscrow(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    updateAkitaDaoEscrow: (params) => {
      return this.appClient.params.call(MarketplaceParamsFactory.updateAkitaDaoEscrow(params));
    },
    /**
     * Makes a call to the Marketplace smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    updateAkitaDao: (params) => {
      return this.appClient.params.call(MarketplaceParamsFactory.updateAkitaDao(params));
    },
    /**
     * Makes a call to the Marketplace smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    opUp: (params = { args: [] }) => {
      return this.appClient.params.call(MarketplaceParamsFactory.opUp(params));
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
       * Updates an existing instance of the Marketplace smart contract using the `update(string)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The update transaction
       */
      update: (params) => {
        return this.appClient.createTransaction.update(MarketplaceParamsFactory.update.update(params));
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the Marketplace smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.createTransaction.bare.clearState(params);
    },
    /**
     * Makes a call to the Marketplace smart contract using the `list(pay,axfer,uint64,uint64,uint64,address,uint64,address,string,byte[32][])uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    list: (params) => {
      return this.appClient.createTransaction.call(MarketplaceParamsFactory.list(params));
    },
    /**
     * Makes a call to the Marketplace smart contract using the `listPrizeBox(appl,pay,uint64,uint64,uint64,address,uint64,address)uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    listPrizeBox: (params) => {
      return this.appClient.createTransaction.call(MarketplaceParamsFactory.listPrizeBox(params));
    },
    /**
     * Makes a call to the Marketplace smart contract using the `gatedPurchase(pay,appl,uint64,address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    gatedPurchase: (params) => {
      return this.appClient.createTransaction.call(MarketplaceParamsFactory.gatedPurchase(params));
    },
    /**
     * Makes a call to the Marketplace smart contract using the `purchase(pay,uint64,address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    purchase: (params) => {
      return this.appClient.createTransaction.call(MarketplaceParamsFactory.purchase(params));
    },
    /**
     * Makes a call to the Marketplace smart contract using the `gatedPurchaseAsa(axfer,appl,uint64,address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    gatedPurchaseAsa: (params) => {
      return this.appClient.createTransaction.call(MarketplaceParamsFactory.gatedPurchaseAsa(params));
    },
    /**
     * Makes a call to the Marketplace smart contract using the `purchaseAsa(axfer,uint64,address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    purchaseAsa: (params) => {
      return this.appClient.createTransaction.call(MarketplaceParamsFactory.purchaseAsa(params));
    },
    /**
     * Makes a call to the Marketplace smart contract using the `delist(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    delist: (params) => {
      return this.appClient.createTransaction.call(MarketplaceParamsFactory.delist(params));
    },
    /**
     * Makes a call to the Marketplace smart contract using the `initBoxedContract(string,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    initBoxedContract: (params) => {
      return this.appClient.createTransaction.call(MarketplaceParamsFactory.initBoxedContract(params));
    },
    /**
     * Makes a call to the Marketplace smart contract using the `loadBoxedContract(uint64,byte[])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    loadBoxedContract: (params) => {
      return this.appClient.createTransaction.call(MarketplaceParamsFactory.loadBoxedContract(params));
    },
    /**
     * Makes a call to the Marketplace smart contract using the `deleteBoxedContract()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    deleteBoxedContract: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(MarketplaceParamsFactory.deleteBoxedContract(params));
    },
    /**
     * Makes a call to the Marketplace smart contract using the `optIn(pay,uint64)void` ABI method.
     *
     * optin tells the contract to opt into an asa
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    optIn: (params) => {
      return this.appClient.createTransaction.call(MarketplaceParamsFactory.optIn(params));
    },
    /**
     * Makes a call to the Marketplace smart contract using the `optInCost(uint64)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    optInCost: (params) => {
      return this.appClient.createTransaction.call(MarketplaceParamsFactory.optInCost(params));
    },
    /**
     * Makes a call to the Marketplace smart contract using the `updateAkitaDAOEscrow(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    updateAkitaDaoEscrow: (params) => {
      return this.appClient.createTransaction.call(MarketplaceParamsFactory.updateAkitaDaoEscrow(params));
    },
    /**
     * Makes a call to the Marketplace smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    updateAkitaDao: (params) => {
      return this.appClient.createTransaction.call(MarketplaceParamsFactory.updateAkitaDao(params));
    },
    /**
     * Makes a call to the Marketplace smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    opUp: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(MarketplaceParamsFactory.opUp(params));
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
       * Updates an existing instance of the Marketplace smart contract using the `update(string)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The update result
       */
      update: async (params) => {
        const result = await this.appClient.send.update(MarketplaceParamsFactory.update.update(params));
        return { ...result, return: result.return };
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the Marketplace smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.send.bare.clearState(params);
    },
    /**
     * Makes a call to the Marketplace smart contract using the `list(pay,axfer,uint64,uint64,uint64,address,uint64,address,string,byte[32][])uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    list: async (params) => {
      const result = await this.appClient.send.call(MarketplaceParamsFactory.list(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Marketplace smart contract using the `listPrizeBox(appl,pay,uint64,uint64,uint64,address,uint64,address)uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    listPrizeBox: async (params) => {
      const result = await this.appClient.send.call(MarketplaceParamsFactory.listPrizeBox(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Marketplace smart contract using the `gatedPurchase(pay,appl,uint64,address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    gatedPurchase: async (params) => {
      const result = await this.appClient.send.call(MarketplaceParamsFactory.gatedPurchase(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Marketplace smart contract using the `purchase(pay,uint64,address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    purchase: async (params) => {
      const result = await this.appClient.send.call(MarketplaceParamsFactory.purchase(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Marketplace smart contract using the `gatedPurchaseAsa(axfer,appl,uint64,address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    gatedPurchaseAsa: async (params) => {
      const result = await this.appClient.send.call(MarketplaceParamsFactory.gatedPurchaseAsa(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Marketplace smart contract using the `purchaseAsa(axfer,uint64,address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    purchaseAsa: async (params) => {
      const result = await this.appClient.send.call(MarketplaceParamsFactory.purchaseAsa(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Marketplace smart contract using the `delist(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    delist: async (params) => {
      const result = await this.appClient.send.call(MarketplaceParamsFactory.delist(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Marketplace smart contract using the `initBoxedContract(string,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    initBoxedContract: async (params) => {
      const result = await this.appClient.send.call(MarketplaceParamsFactory.initBoxedContract(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Marketplace smart contract using the `loadBoxedContract(uint64,byte[])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    loadBoxedContract: async (params) => {
      const result = await this.appClient.send.call(MarketplaceParamsFactory.loadBoxedContract(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Marketplace smart contract using the `deleteBoxedContract()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    deleteBoxedContract: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(MarketplaceParamsFactory.deleteBoxedContract(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Marketplace smart contract using the `optIn(pay,uint64)void` ABI method.
     *
     * optin tells the contract to opt into an asa
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    optIn: async (params) => {
      const result = await this.appClient.send.call(MarketplaceParamsFactory.optIn(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Marketplace smart contract using the `optInCost(uint64)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    optInCost: async (params) => {
      const result = await this.appClient.send.call(MarketplaceParamsFactory.optInCost(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Marketplace smart contract using the `updateAkitaDAOEscrow(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    updateAkitaDaoEscrow: async (params) => {
      const result = await this.appClient.send.call(MarketplaceParamsFactory.updateAkitaDaoEscrow(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Marketplace smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    updateAkitaDao: async (params) => {
      const result = await this.appClient.send.call(MarketplaceParamsFactory.updateAkitaDao(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Marketplace smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    opUp: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(MarketplaceParamsFactory.opUp(params));
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
    return new _MarketplaceClient(this.appClient.clone(params));
  }
  /**
   * Makes a readonly (simulated) call to the Marketplace smart contract using the `optInCost(uint64)uint64` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async optInCost(params) {
    const result = await this.appClient.send.call(MarketplaceParamsFactory.optInCost(params));
    return result.return;
  }
  /**
   * Methods to access state for the current Marketplace app
   */
  __init7() {this.state = {
    /**
     * Methods to access global state for the current Marketplace app
     */
    global: {
      /**
       * Get all current keyed values from global state
       */
      getAll: async () => {
        const result = await this.appClient.state.global.getAll();
        return {
          childContractVersion: result.childContractVersion,
          akitaDaoEscrow: result.akitaDAOEscrow,
          version: result.version,
          akitaDao: result.akitaDAO
        };
      },
      /**
       * Get the current value of the childContractVersion key in global state
       */
      childContractVersion: async () => {
        return await this.appClient.state.global.getValue("childContractVersion");
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
     * Methods to access box state for the current Marketplace app
     */
    box: {
      /**
       * Get all current keyed values from box state
       */
      getAll: async () => {
        const result = await this.appClient.state.box.getAll();
        return {
          boxedContract: new BinaryStateValue(result.boxedContract)
        };
      },
      /**
       * Get the current value of the boxedContract key in box state
       */
      boxedContract: async () => {
        return new BinaryStateValue(await this.appClient.state.box.getValue("boxedContract"));
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
       * Add a list(pay,axfer,uint64,uint64,uint64,address,uint64,address,string,byte[32][])uint64 method call against the Marketplace contract
       */
      list(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.list(params)));
        resultMappers.push((v) => client.decodeReturnValue("list(pay,axfer,uint64,uint64,uint64,address,uint64,address,string,byte[32][])uint64", v));
        return this;
      },
      /**
       * Add a listPrizeBox(appl,pay,uint64,uint64,uint64,address,uint64,address)uint64 method call against the Marketplace contract
       */
      listPrizeBox(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.listPrizeBox(params)));
        resultMappers.push((v) => client.decodeReturnValue("listPrizeBox(appl,pay,uint64,uint64,uint64,address,uint64,address)uint64", v));
        return this;
      },
      /**
       * Add a gatedPurchase(pay,appl,uint64,address)void method call against the Marketplace contract
       */
      gatedPurchase(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.gatedPurchase(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a purchase(pay,uint64,address)void method call against the Marketplace contract
       */
      purchase(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.purchase(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a gatedPurchaseAsa(axfer,appl,uint64,address)void method call against the Marketplace contract
       */
      gatedPurchaseAsa(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.gatedPurchaseAsa(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a purchaseAsa(axfer,uint64,address)void method call against the Marketplace contract
       */
      purchaseAsa(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.purchaseAsa(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a delist(uint64)void method call against the Marketplace contract
       */
      delist(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.delist(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a initBoxedContract(string,uint64)void method call against the Marketplace contract
       */
      initBoxedContract(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.initBoxedContract(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a loadBoxedContract(uint64,byte[])void method call against the Marketplace contract
       */
      loadBoxedContract(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.loadBoxedContract(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a deleteBoxedContract()void method call against the Marketplace contract
       */
      deleteBoxedContract(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.deleteBoxedContract(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a optIn(pay,uint64)void method call against the Marketplace contract
       */
      optIn(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.optIn(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a optInCost(uint64)uint64 method call against the Marketplace contract
       */
      optInCost(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.optInCost(params)));
        resultMappers.push((v) => client.decodeReturnValue("optInCost(uint64)uint64", v));
        return this;
      },
      /**
       * Add a updateAkitaDAOEscrow(uint64)void method call against the Marketplace contract
       */
      updateAkitaDaoEscrow(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateAkitaDaoEscrow(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a updateAkitaDAO(uint64)void method call against the Marketplace contract
       */
      updateAkitaDao(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateAkitaDao(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a opUp()void method call against the Marketplace contract
       */
      opUp(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.opUp(params)));
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
       * Add a clear state call to the Marketplace contract
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

// src/generated/ListingClient.ts





var APP_SPEC2 = { "name": "Listing", "structs": { "FunderInfo": [{ "name": "account", "type": "address" }, { "name": "amount", "type": "uint64" }] }, "methods": [{ "name": "create", "args": [{ "type": "uint64", "name": "prize" }, { "type": "bool", "name": "isPrizeBox" }, { "type": "uint64", "name": "price" }, { "type": "uint64", "name": "paymentAsset" }, { "type": "uint64", "name": "expiration" }, { "type": "address", "name": "seller" }, { "type": "(address,uint64)", "struct": "FunderInfo", "name": "funder" }, { "type": "address", "name": "reservedFor" }, { "type": "uint64", "name": "creatorRoyalty" }, { "type": "uint64", "name": "gateID" }, { "type": "address", "name": "marketplace" }, { "type": "string", "name": "version" }, { "type": "uint64", "name": "akitaDAO" }, { "type": "uint64", "name": "akitaDAOEscrow" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "desc": "create the listing application", "events": [], "recommendations": {} }, { "name": "purchase", "args": [{ "type": "pay", "name": "payment", "desc": "- the payment for purchasing the asset" }, { "type": "address", "name": "buyer", "desc": "- the buyer of the asset" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["DeleteApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "purchaseAsa", "args": [{ "type": "axfer", "name": "assetXfer" }, { "type": "address", "name": "buyer" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "delist", "args": [{ "type": "address", "name": "caller" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["DeleteApplication"] }, "readonly": false, "desc": "Deletes the app and returns the asset/mbr to the seller", "events": [], "recommendations": {} }, { "name": "changePrice", "args": [{ "type": "uint64", "name": "price" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "optin", "args": [{ "type": "pay", "name": "payment", "desc": "The payment transaction" }, { "type": "uint64", "name": "asset", "desc": "The asset to be opted into" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "optin tells the contract to opt into an asa", "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 10, "bytes": 5 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "prize": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cHJpemU=", "desc": "the asset for sale: Asset | Application ( Prize Box )" }, "isPrizeBox": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "aXNfcHJpemVfYm94", "desc": "whether or not the prize is an asset or a prize box" }, "price": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cHJpY2U=", "desc": "the price of the asset" }, "paymentAsset": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cGF5bWVudF9hc3NldA==", "desc": "the asset to use for payment" }, "expiration": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "ZXhwaXJhdGlvbg==", "desc": "the timestamp the listing expires on, once this passes all that can be done is delist" }, "seller": { "keyType": "AVMString", "valueType": "address", "key": "c2VsbGVy", "desc": "the address selling the asset" }, "reservedFor": { "keyType": "AVMString", "valueType": "address", "key": "cmVzZXJ2ZWRfZm9y", "desc": "the address the sale is reserved for" }, "creatorRoyalty": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "Y3JlYXRvcl9yb3lhbHR5", "desc": "the amount the creator will get for the sale" }, "gateID": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "Z2F0ZV9pZA==", "desc": "the gate ID to use to check if the user is qualified to buy" }, "marketplace": { "keyType": "AVMString", "valueType": "address", "key": "bWFya2V0cGxhY2U=", "desc": "The address of the marketplace that listed the asset to send the fee to\n\nIMPORTANT: this is a double sided marketplace fee contract\nthe marketplace referred to internally in the contract\nis the listing side marketplace.\nthe buyer side marketplace provides their address at\nthe time of purchase" }, "marketplaceRoyalties": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "bWFya2V0cGxhY2Vfcm95YWx0aWVz", "desc": "the amount the marketplaces will get for the sale" }, "akitaDAOEscrow": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZXNjcm93", "desc": "the app ID for the akita DAO escrow" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" }, "funder": { "keyType": "AVMString", "valueType": "FunderInfo", "key": "ZnVuZGVy" } }, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": {} } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [425, 584, 712, 2483], "errorMessage": "Bytes has valid prefix" }, { "pc": [320], "errorMessage": "Close out of algo forbidden" }, { "pc": [1288, 2352], "errorMessage": "Invalid payment" }, { "pc": [791, 2389, 2520, 2550], "errorMessage": "Invalid percentage" }, { "pc": [1591], "errorMessage": "Invalid transfer" }, { "pc": [284, 296], "errorMessage": "OnCompletion must be DeleteApplication && can only call when not creating" }, { "pc": [211], "errorMessage": "OnCompletion must be NoOp" }, { "pc": [2306], "errorMessage": "Only the Akita DAO can call this function" }, { "pc": [2702, 2718], "errorMessage": "account opted into asset" }, { "pc": [361, 448, 469, 482, 493, 611, 1331, 1637, 2304], "errorMessage": "application exists" }, { "pc": [1439, 1459, 1673, 1688, 1991], "errorMessage": "asset exists" }, { "pc": [1162, 1218, 1225, 1233, 1246, 1257, 1285, 1298, 1314, 1328, 1353, 1384, 1397, 1426, 1471, 1530, 1536, 1544, 1557, 1568, 1588, 1601, 1617, 1621, 1634, 1641, 1659, 1670, 1677, 1696, 1714, 1718, 1731, 1740, 1757, 1777, 1795, 1799, 1811, 1815, 1844, 1848, 1852, 1891, 1895, 1934, 1938, 1943, 1982, 1986, 2054, 2060, 2066, 2073, 2080, 2085, 2093, 2097, 2182, 2190, 2194, 2268, 2291, 2384, 2404, 2419, 2437, 2545, 2567, 2628, 2636, 2663, 2692], "errorMessage": "check GlobalState exists" }, { "pc": [1090], "errorMessage": "invalid expiration" }, { "pc": [722], "errorMessage": "invalid number of bytes for (len+uint8[])" }, { "pc": [1029], "errorMessage": "invalid number of bytes for (len+utf8[])" }, { "pc": [971], "errorMessage": "invalid number of bytes for (uint8[32],uint64)" }, { "pc": [917], "errorMessage": "invalid number of bytes for bool8" }, { "pc": [430, 589, 908, 927, 936, 945, 990, 1001, 1042, 1053, 2261, 2284, 2329, 2488], "errorMessage": "invalid number of bytes for uint64" }, { "pc": [960, 982, 1015, 1199, 1208, 1511, 1520, 2038], "errorMessage": "invalid number of bytes for uint8[32]" }, { "pc": [1241, 1552], "errorMessage": "listing expired" }, { "pc": [1059, 1214, 1526, 2044], "errorMessage": "must be called from the factory" }, { "pc": [2270], "errorMessage": "must be the seller" }, { "pc": [2056], "errorMessage": "only the seller can delist" }, { "pc": [1220], "errorMessage": "payment asset must be algo" }, { "pc": [1531], "errorMessage": "payment asset must not be algo" }, { "pc": [1261, 1572], "errorMessage": "reserved for different address" }, { "pc": [1502], "errorMessage": "transaction type is axfer" }, { "pc": [1190, 2321], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDggNCAxMDAwMDAgMTg0NDY3NDQwNzM3MDk1NTE2MTUKICAgIGJ5dGVjYmxvY2sgInBheW1lbnRfYXNzZXQiICJzZWxsZXIiICJha2l0YV9kYW8iICJwcml6ZSIgMHgwMDAxICJpc19wcml6ZV9ib3giICJwcmljZSIgImV4cGlyYXRpb24iICJyZXNlcnZlZF9mb3IiICJtYXJrZXRwbGFjZSIgMHgxNTFmN2M3NSAiY3JlYXRvcl9yb3lhbHR5IiAiYWtpdGFfZXNjcm93IiAibWFya2V0cGxhY2Vfcm95YWx0aWVzIiAweGFkZjkyYWU0ICJuZnRfZmVlcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTgtMjIKICAgIC8vIGV4cG9ydCBjbGFzcyBMaXN0aW5nIGV4dGVuZHMgY2xhc3NlcygKICAgIC8vICAgQWtpdGFCYXNlQ29udHJhY3QsCiAgICAvLyAgIENvbnRyYWN0V2l0aENyZWF0b3JPbmx5T3B0SW4sCiAgICAvLyAgIENoaWxkQ29udHJhY3QKICAgIC8vICkgewogICAgcHVzaGJ5dGVzcyAweDZhMTYzOTNkIDB4NjhlODYzNDMgLy8gbWV0aG9kICJwdXJjaGFzZShwYXksYWRkcmVzcyxhZGRyZXNzKXZvaWQiLCBtZXRob2QgImRlbGlzdChhZGRyZXNzKXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBtYWluX3B1cmNoYXNlX3JvdXRlQDQgbWFpbl9kZWxpc3Rfcm91dGVANQoKbWFpbl9zd2l0Y2hfY2FzZV9uZXh0QDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE4LTIyCiAgICAvLyBleHBvcnQgY2xhc3MgTGlzdGluZyBleHRlbmRzIGNsYXNzZXMoCiAgICAvLyAgIEFraXRhQmFzZUNvbnRyYWN0LAogICAgLy8gICBDb250cmFjdFdpdGhDcmVhdG9yT25seU9wdEluLAogICAgLy8gICBDaGlsZENvbnRyYWN0CiAgICAvLyApIHsKICAgIHR4biBPbkNvbXBsZXRpb24KICAgICEKICAgIGFzc2VydCAvLyBPbkNvbXBsZXRpb24gbXVzdCBiZSBOb09wCiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgYnogbWFpbl9jcmVhdGVfTm9PcEAxNAogICAgcHVzaGJ5dGVzcyAweDE3MWM5Zjg4IDB4MTkzOTZjNGEgMHgzM2U5MmM5NCAweDg1NGRlZGUwIDB4M2VhMTE4MzIgLy8gbWV0aG9kICJwdXJjaGFzZUFzYShheGZlcixhZGRyZXNzLGFkZHJlc3Mpdm9pZCIsIG1ldGhvZCAiY2hhbmdlUHJpY2UodWludDY0KXZvaWQiLCBtZXRob2QgInVwZGF0ZUFraXRhREFPKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJvcFVwKCl2b2lkIiwgbWV0aG9kICJvcHRpbihwYXksdWludDY0KXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBwdXJjaGFzZUFzYSBjaGFuZ2VQcmljZSB1cGRhdGVBa2l0YURBTyBtYWluX29wVXBfcm91dGVAMTEgb3B0aW4KICAgIGVycgoKbWFpbl9vcFVwX3JvdXRlQDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDMKICAgIC8vIG9wVXAoKTogdm9pZCB7IH0KICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCm1haW5fY3JlYXRlX05vT3BAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE4LTIyCiAgICAvLyBleHBvcnQgY2xhc3MgTGlzdGluZyBleHRlbmRzIGNsYXNzZXMoCiAgICAvLyAgIEFraXRhQmFzZUNvbnRyYWN0LAogICAgLy8gICBDb250cmFjdFdpdGhDcmVhdG9yT25seU9wdEluLAogICAgLy8gICBDaGlsZENvbnRyYWN0CiAgICAvLyApIHsKICAgIHB1c2hieXRlcyAweGQ2ZjExZWE1IC8vIG1ldGhvZCAiY3JlYXRlKHVpbnQ2NCxib29sLHVpbnQ2NCx1aW50NjQsdWludDY0LGFkZHJlc3MsKGFkZHJlc3MsdWludDY0KSxhZGRyZXNzLHVpbnQ2NCx1aW50NjQsYWRkcmVzcyxzdHJpbmcsdWludDY0LHVpbnQ2NCl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggY3JlYXRlCiAgICBlcnIKCm1haW5fZGVsaXN0X3JvdXRlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQxNAogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogJ0RlbGV0ZUFwcGxpY2F0aW9uJyB9KQogICAgdHhuIE9uQ29tcGxldGlvbgogICAgcHVzaGludCA1IC8vIERlbGV0ZUFwcGxpY2F0aW9uCiAgICA9PQogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgICYmCiAgICBhc3NlcnQgLy8gT25Db21wbGV0aW9uIG11c3QgYmUgRGVsZXRlQXBwbGljYXRpb24gJiYgY2FuIG9ubHkgY2FsbCB3aGVuIG5vdCBjcmVhdGluZwogICAgYiBkZWxpc3QKCm1haW5fcHVyY2hhc2Vfcm91dGVANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzQ0CiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiAnRGVsZXRlQXBwbGljYXRpb24nIH0pCiAgICB0eG4gT25Db21wbGV0aW9uCiAgICBwdXNoaW50IDUgLy8gRGVsZXRlQXBwbGljYXRpb24KICAgID09CiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgJiYKICAgIGFzc2VydCAvLyBPbkNvbXBsZXRpb24gbXVzdCBiZSBEZWxldGVBcHBsaWNhdGlvbiAmJiBjYW4gb25seSBjYWxsIHdoZW4gbm90IGNyZWF0aW5nCiAgICBiIHB1cmNoYXNlCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6Y3JlYXRlSW5zdGFudERpc2J1cnNlbWVudChha2l0YURBTzogdWludDY0LCBhc3NldDogdWludDY0LCB0aW1lVG9VbmxvY2s6IHVpbnQ2NCwgZXhwaXJhdGlvbjogdWludDY0LCBhbGxvY2F0aW9uczogYnl0ZXMsIHN1bTogdWludDY0LCBjbG9zZU91dDogdWludDY0KSAtPiBieXRlcywgYnl0ZXM6CmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUxOAogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoYWtpdGFEQU86IEFwcGxpY2F0aW9uLCBhc3NldDogdWludDY0LCB0aW1lVG9VbmxvY2s6IHVpbnQ2NCwgZXhwaXJhdGlvbjogdWludDY0LCBhbGxvY2F0aW9uczogVXNlckFsbG9jYXRpb25bXSwgc3VtOiB1aW50NjQsIGNsb3NlT3V0OiBib29sZWFuKTogeyBpZDogdWludDY0LCBjb3N0OiB1aW50NjQgfSB7CiAgICBwcm90byA3IDIKICAgIGludGNfMCAvLyAwCiAgICBwdXNoYnl0ZXMgIiIKICAgIGR1cG4gMwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTE5CiAgICAvLyBhc3NlcnQoYXNzZXQgIT09IDAgfHwgY2xvc2VPdXQgPT09IGZhbHNlLCBFUlJfQ0FOTk9UX0NMT1NFX09VVF9PRl9BTEdPX0ZPUkJJRERFTikKICAgIGZyYW1lX2RpZyAtNgogICAgYm56IGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYm9vbF90cnVlQDIKICAgIGZyYW1lX2RpZyAtMQogICAgYm56IGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYm9vbF9mYWxzZUAzCgpjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2Jvb2xfdHJ1ZUAyOgogICAgaW50Y18xIC8vIDEKCmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYm9vbF9tZXJnZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MTkKICAgIC8vIGFzc2VydChhc3NldCAhPT0gMCB8fCBjbG9zZU91dCA9PT0gZmFsc2UsIEVSUl9DQU5OT1RfQ0xPU0VfT1VUX09GX0FMR09fRk9SQklEREVOKQogICAgYXNzZXJ0IC8vIENsb3NlIG91dCBvZiBhbGdvIGZvcmJpZGRlbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NAogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgZnJhbWVfZGlnIC03CiAgICBwdXNoYnl0ZXMgImFhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTIwCiAgICAvLyBjb25zdCByZXdhcmRzQXBwID0gZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5yZXdhcmRzCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIGZyYW1lX2J1cnkgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MjMKICAgIC8vIGxldCBjb3N0OiB1aW50NjQgPSBNaW5EaXNidXJzZW1lbnRzTUJSICsgKFVzZXJBbGxvY2F0aW9uTUJSICogYWxsb2NhdGlvbnMubGVuZ3RoKQogICAgZnJhbWVfZGlnIC0zCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIHB1c2hpbnQgMjUzMDAgLy8gMjUzMDAKICAgICoKICAgIHB1c2hpbnQgMzUzMDAgLy8gMzUzMDAKICAgICsKICAgIGZyYW1lX2J1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MjQKICAgIC8vIGlmIChhc3NldCA9PT0gMCkgewogICAgZnJhbWVfZGlnIC02CiAgICBibnogY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9lbHNlX2JvZHlAOAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MjUtNTM2CiAgICAvLyBpZCA9IGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQ+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9ucy5sZW5ndGgpICsgc3VtCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdGltZVRvVW5sb2NrLAogICAgLy8gICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgYWxsb2NhdGlvbnMKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTI5CiAgICAvLyByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIGZyYW1lX2RpZyAzCiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTMwCiAgICAvLyBhbW91bnQ6IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9ucy5sZW5ndGgpICsgc3VtCiAgICBmcmFtZV9kaWcgMQogICAgZnJhbWVfZGlnIC0yCiAgICArCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MjgtNTMxCiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiBNaW5EaXNidXJzZW1lbnRzTUJSICsgKFVzZXJBbGxvY2F0aW9uTUJSICogYWxsb2NhdGlvbnMubGVuZ3RoKSArIHN1bQogICAgLy8gfSksCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUyNS01MzYKICAgIC8vIGlkID0gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUuY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudD4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogTWluRGlzYnVyc2VtZW50c01CUiArIChVc2VyQWxsb2NhdGlvbk1CUiAqIGFsbG9jYXRpb25zLmxlbmd0aCkgKyBzdW0KICAgIC8vICAgICB9KSwKICAgIC8vICAgICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICBhbGxvY2F0aW9ucwogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUzMgogICAgLy8gdGltZVRvVW5sb2NrLAogICAgZnJhbWVfZGlnIC01CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUzMwogICAgLy8gZXhwaXJhdGlvbiwKICAgIGZyYW1lX2RpZyAtNAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MjUtNTM2CiAgICAvLyBpZCA9IGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQ+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9ucy5sZW5ndGgpICsgc3VtCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdGltZVRvVW5sb2NrLAogICAgLy8gICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgYWxsb2NhdGlvbnMKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIHB1c2hieXRlcyAweDdiN2RjNWZjIC8vIG1ldGhvZCAiY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudChwYXksdWludDY0LHVpbnQ2NCwoYWRkcmVzcyx1aW50NjQpW10pdWludDY0IgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC0zCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgZ2l0eG4gMSBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBzd2FwCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWMgMTAgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQoKY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9hZnRlcl9pZl9lbHNlQDIwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NzcKICAgIC8vIHJldHVybiB7IGlkLCBjb3N0IH0KICAgIGl0b2IKICAgIGZyYW1lX2RpZyAxCiAgICBpdG9iCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtMwogICAgZnJhbWVfYnVyeSAxCiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9lbHNlX2JvZHlAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTM4CiAgICAvLyBpZiAoIUFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MuaXNPcHRlZEluKEFzc2V0KGFzc2V0KSkpIHsKICAgIGZyYW1lX2RpZyAzCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBmcmFtZV9kaWcgLTYKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBieiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2lmX2JvZHlAOQogICAgZnJhbWVfZGlnIDEKICAgIGZyYW1lX2J1cnkgMgoKY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9hZnRlcl9pZl9lbHNlQDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NTMKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICBmcmFtZV9kaWcgMwogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgc3dhcAogICAgZnJhbWVfYnVyeSAwCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU1MgogICAgLy8gY29uc3QgdHJhbnNmZXJUeG4gPSBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2J1cnkgNAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NTgKICAgIC8vIGlmIChjbG9zZU91dCkgewogICAgZnJhbWVfZGlnIC0xCiAgICBieiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2FmdGVyX2lmX2Vsc2VAMTQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTU5CiAgICAvLyB0cmFuc2ZlclR4bi5zZXQoeyBhc3NldENsb3NlVG86IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MgfSkKICAgIGZyYW1lX2RpZyAzCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBpbnRjXzEgLy8gMQogICAgZnJhbWVfYnVyeSA0CiAgICBmcmFtZV9idXJ5IDUKCmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYWZ0ZXJfaWZfZWxzZUAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTYyLTU3NAogICAgLy8gaWQgPSBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5jcmVhdGVJbnN0YW50QXNhRGlzYnVyc2VtZW50Pih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBNaW5EaXNidXJzZW1lbnRzTUJSICsgKFVzZXJBbGxvY2F0aW9uTUJSICogYWxsb2NhdGlvbnMubGVuZ3RoKQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHRyYW5zZmVyVHhuLAogICAgLy8gICAgIHRpbWVUb1VubG9jaywKICAgIC8vICAgICBleHBpcmF0aW9uLAogICAgLy8gICAgIGFsbG9jYXRpb25zCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU2NgogICAgLy8gcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICBmcmFtZV9kaWcgMwogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZnJhbWVfZGlnIDEKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU2NS01NjgKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9ucy5sZW5ndGgpCiAgICAvLyB9KSwKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTY5CiAgICAvLyB0cmFuc2ZlclR4biwKICAgIGl0eG5fbmV4dAogICAgZnJhbWVfZGlnIDQKICAgIGJ6IGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfbmV4dF9maWVsZEAxNwogICAgZnJhbWVfZGlnIDUKICAgIGl0eG5fZmllbGQgQXNzZXRDbG9zZVRvCgpjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X25leHRfZmllbGRAMTc6CiAgICBmcmFtZV9kaWcgLTYKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBmcmFtZV9kaWcgLTIKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGZyYW1lX2RpZyAwCiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTUyLTU1NgogICAgLy8gY29uc3QgdHJhbnNmZXJUeG4gPSBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICBhc3NldFJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICBhc3NldEFtb3VudDogc3VtLAogICAgLy8gICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyB9KQogICAgaW50Y18zIC8vIDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NjItNTc0CiAgICAvLyBpZCA9IGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLmNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnQ+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9ucy5sZW5ndGgpCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdHJhbnNmZXJUeG4sCiAgICAvLyAgICAgdGltZVRvVW5sb2NrLAogICAgLy8gICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgYWxsb2NhdGlvbnMKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NzAKICAgIC8vIHRpbWVUb1VubG9jaywKICAgIGZyYW1lX2RpZyAtNQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NzEKICAgIC8vIGV4cGlyYXRpb24sCiAgICBmcmFtZV9kaWcgLTQKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTYyLTU3NAogICAgLy8gaWQgPSBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5jcmVhdGVJbnN0YW50QXNhRGlzYnVyc2VtZW50Pih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBNaW5EaXNidXJzZW1lbnRzTUJSICsgKFVzZXJBbGxvY2F0aW9uTUJSICogYWxsb2NhdGlvbnMubGVuZ3RoKQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHRyYW5zZmVyVHhuLAogICAgLy8gICAgIHRpbWVUb1VubG9jaywKICAgIC8vICAgICBleHBpcmF0aW9uLAogICAgLy8gICAgIGFsbG9jYXRpb25zCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBwdXNoYnl0ZXMgMHhhZjFhMTRmMiAvLyBtZXRob2QgImNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnQocGF5LGF4ZmVyLHVpbnQ2NCx1aW50NjQsKGFkZHJlc3MsdWludDY0KVtdKXVpbnQ2NCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGZyYW1lX2RpZyAtMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGZyYW1lX2RpZyAzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBnaXR4biAyIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIHN3YXAKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlYyAxMCAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICBmcmFtZV9kaWcgMgogICAgZnJhbWVfYnVyeSAxCiAgICBiIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYWZ0ZXJfaWZfZWxzZUAyMAoKY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9pZl9ib2R5QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUzOQogICAgLy8gY29zdCArPSBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGZyYW1lX2RpZyAxCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgICsKICAgIGZyYW1lX2J1cnkgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NDAtNTQ5CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5vcHRJbj4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgQXNzZXQoYXNzZXQpCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0NAogICAgLy8gcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICBmcmFtZV9kaWcgMwogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0NQogICAgLy8gYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTQzLTU0NgogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICAvLyB9KSwKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTQwLTU0OQogICAgLy8gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIEFzc2V0KGFzc2V0KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0NwogICAgLy8gQXNzZXQoYXNzZXQpCiAgICBmcmFtZV9kaWcgLTYKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTQwLTU0OQogICAgLy8gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIEFzc2V0KGFzc2V0KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgcHVzaGJ5dGVzIDB4Mzk0ZWFlYjIgLy8gbWV0aG9kICJvcHRJbihwYXksdWludDY0KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGIgY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9hZnRlcl9pZl9lbHNlQDEyCgpjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2Jvb2xfZmFsc2VAMzoKICAgIGludGNfMCAvLyAwCiAgICBiIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYm9vbF9tZXJnZUA0CgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6c2VuZFJlZmVycmFsUGF5bWVudChha2l0YURBTzogdWludDY0LCBhc3NldDogdWludDY0LCBhbW91bnQ6IHVpbnQ2NCkgLT4gYnl0ZXM6CnNlbmRSZWZlcnJhbFBheW1lbnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU5MQogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIHNlbmRSZWZlcnJhbFBheW1lbnQoYWtpdGFEQU86IEFwcGxpY2F0aW9uLCBhc3NldDogdWludDY0LCBhbW91bnQ6IHVpbnQ2NCk6IFJlZmVycmFsUGF5bWVudEluZm8gewogICAgcHJvdG8gMyAxCiAgICBpbnRjXzAgLy8gMAogICAgZHVwCiAgICBwdXNoYnl0ZXMgIiIKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1OTIKICAgIC8vIGNvbnN0IHdhbGxldCA9IGdldFdhbGxldElEVXNpbmdBa2l0YURBTyhha2l0YURBTywgVHhuLnNlbmRlcikKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTkKICAgIC8vIGNvbnN0IFtvdGhlckFwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNPdGhlckFwcExpc3QpKQogICAgZnJhbWVfZGlnIC0zCiAgICBwdXNoYnl0ZXMgIm9hbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjQKICAgIC8vIHJldHVybiBnZXRPdGhlckFwcExpc3QoYWtpdGFEQU8pLmVzY3JvdwogICAgcHVzaGludCAyNCAvLyAyNAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTg2LTE4OQogICAgLy8gY29uc3QgZGF0YSA9IGFiaUNhbGw8dHlwZW9mIEVzY3Jvd0ZhY3RvcnkucHJvdG90eXBlLmdldD4oewogICAgLy8gICBhcHBJZDogZXNjcm93RmFjdG9yeSwKICAgIC8vICAgYXJnczogW2FkZHJlc3NdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgcHVzaGJ5dGVzIDB4M2MxYTZmMzMgLy8gbWV0aG9kICJnZXQoYWRkcmVzcylieXRlW10iCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgZGlnIDEKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlYyAxMCAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBwdXNoaW50IDIgLy8gMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciAobGVuK3VpbnQ4W10pCiAgICBleHRyYWN0IDYgMAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE5MQogICAgLy8gaWYgKEJ5dGVzKGRhdGEpLmxlbmd0aCA9PT0gMCB8fCBCeXRlcyhkYXRhKS5sZW5ndGggIT09IDgpIHsKICAgIGxlbgogICAgZHVwCiAgICBieiBzZW5kUmVmZXJyYWxQYXltZW50X2lmX2JvZHlAMTEKICAgIGZyYW1lX2RpZyA1CiAgICBpbnRjXzIgLy8gOAogICAgIT0KICAgIGJ6IHNlbmRSZWZlcnJhbFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUAxMgoKc2VuZFJlZmVycmFsUGF5bWVudF9pZl9ib2R5QDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxOTIKICAgIC8vIHJldHVybiAwCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfYnVyeSAzCgpzZW5kUmVmZXJyYWxQYXltZW50X2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6Z2V0V2FsbGV0SURAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE2MQogICAgLy8gcmV0dXJuIHJlZmVycmVyT3Iod2FsbGV0SUQsIEdsb2JhbC56ZXJvQWRkcmVzcykKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgZnJhbWVfYnVyeSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE1NAogICAgLy8gaWYgKHdhbGxldElELmlkID09PSAwKSB7CiAgICBmcmFtZV9kaWcgMwogICAgYm56IHNlbmRSZWZlcnJhbFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUAxNwogICAgZnJhbWVfZGlnIDAKICAgIGZyYW1lX2J1cnkgMQoKc2VuZFJlZmVycmFsUGF5bWVudF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnJlZmVycmVyT3JAMTg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU5NgogICAgLy8gaWYgKGFtb3VudCA+IDAgJiYgcmVmZXJyZXIgIT09IEdsb2JhbC56ZXJvQWRkcmVzcykgewogICAgZnJhbWVfZGlnIC0xCiAgICBieiBzZW5kUmVmZXJyYWxQYXltZW50X2FmdGVyX2lmX2Vsc2VANgogICAgZnJhbWVfZGlnIDEKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgIT0KICAgIGJ6IHNlbmRSZWZlcnJhbFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY4CiAgICAvLyBjb25zdCBbd2FsbGV0RmVlc0J5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldEZlZXMpKQogICAgZnJhbWVfZGlnIC0zCiAgICBwdXNoYnl0ZXMgIndhbGxldF9mZWVzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1OTgKICAgIC8vIGNvbnN0IHsgcmVmZXJyZXJQZXJjZW50YWdlIH0gPSBnZXRXYWxsZXRGZWVzKGFraXRhREFPKQogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwOAogICAgLy8gYXNzZXJ0KHAgPD0gRElWSVNPUiwgRVJSX0lOVkFMSURfUEVSQ0VOVEFHRSkKICAgIGR1cAogICAgaW50YyA0IC8vIDEwMDAwMAogICAgPD0KICAgIGFzc2VydCAvLyBJbnZhbGlkIHBlcmNlbnRhZ2UKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA5CiAgICAvLyByZXR1cm4gb3AuZGl2dyguLi5vcC5tdWx3KGEsIHApLCBESVZJU09SKQogICAgZnJhbWVfZGlnIC0xCiAgICBtdWx3CiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICBkaXZ3CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MDEKICAgIC8vIGlmIChyZWZlcnJhbEZlZSA9PT0gMCAmJiBhbW91bnQgPiAwKSB7CiAgICBibnogc2VuZFJlZmVycmFsUGF5bWVudF9hZnRlcl9pZl9lbHNlQDUKICAgIGZyYW1lX2RpZyAtMQogICAgYnogc2VuZFJlZmVycmFsUGF5bWVudF9hZnRlcl9pZl9lbHNlQDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjAyCiAgICAvLyByZWZlcnJhbEZlZSA9IDEKICAgIGludGNfMSAvLyAxCiAgICBmcmFtZV9idXJ5IDIKCnNlbmRSZWZlcnJhbFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MDgKICAgIC8vIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYwOQogICAgLy8gKEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgKyBPTkVfV0VFSyksCiAgICBkdXAKICAgIHB1c2hpbnQgNjA0ODAwIC8vIDYwNDgwMAogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MTAKICAgIC8vIFt7IGFkZHJlc3M6IHJlZmVycmVyLCBhbW91bnQ6IHJlZmVycmFsRmVlIH1dLAogICAgZnJhbWVfZGlnIDIKICAgIGR1cAogICAgY292ZXIgMgogICAgaXRvYgogICAgZnJhbWVfZGlnIDEKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYnl0ZWMgNCAvLyAweDAwMDEKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MDUtNjEzCiAgICAvLyBjb25zdCB7IGNvc3Q6IHJlZmVycmFsTWJyIH0gPSBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICBha2l0YURBTywKICAgIC8vICAgYXNzZXQsCiAgICAvLyAgIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICAvLyAgIChHbG9iYWwubGF0ZXN0VGltZXN0YW1wICsgT05FX1dFRUspLAogICAgLy8gICBbeyBhZGRyZXNzOiByZWZlcnJlciwgYW1vdW50OiByZWZlcnJhbEZlZSB9XSwKICAgIC8vICAgcmVmZXJyYWxGZWUsCiAgICAvLyAgIGZhbHNlCiAgICAvLyApCiAgICBmcmFtZV9kaWcgLTMKICAgIGZyYW1lX2RpZyAtMgogICAgdW5jb3ZlciA1CiAgICB1bmNvdmVyIDQKICAgIHVuY292ZXIgNAogICAgZGlnIDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjEyCiAgICAvLyBmYWxzZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjA1LTYxMwogICAgLy8gY29uc3QgeyBjb3N0OiByZWZlcnJhbE1iciB9ID0gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgYWtpdGFEQU8sCiAgICAvLyAgIGFzc2V0LAogICAgLy8gICBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgLy8gICAoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCArIE9ORV9XRUVLKSwKICAgIC8vICAgW3sgYWRkcmVzczogcmVmZXJyZXIsIGFtb3VudDogcmVmZXJyYWxGZWUgfV0sCiAgICAvLyAgIHJlZmVycmFsRmVlLAogICAgLy8gICBmYWxzZQogICAgLy8gKQogICAgY2FsbHN1YiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50CiAgICBwb3AKICAgIGV4dHJhY3QgOCA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYxNQogICAgLy8gcmV0dXJuIHsgbGVmdG92ZXI6IChhbW91bnQgLSByZWZlcnJhbEZlZSksIHJlZmVycmFsTWJyIH0KICAgIGZyYW1lX2RpZyAtMQogICAgdW5jb3ZlciAyCiAgICAtCiAgICBpdG9iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpzZW5kUmVmZXJyYWxQYXltZW50X2FmdGVyX2lmX2Vsc2VANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjE4CiAgICAvLyByZXR1cm4geyBsZWZ0b3ZlcjogYW1vdW50LCByZWZlcnJhbE1icjogMCB9CiAgICBmcmFtZV9kaWcgLTEKICAgIGl0b2IKICAgIGludGNfMCAvLyAwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpzZW5kUmVmZXJyYWxQYXltZW50X2FmdGVyX2lmX2Vsc2VAMTc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE3My0xNzYKICAgIC8vIGNvbnN0IFtyZWZlcnJlckJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKAogICAgLy8gICB3YWxsZXRJRCwKICAgIC8vICAgQnl0ZXMoQWJzdHJhY3RBY2NvdW50R2xvYmFsU3RhdGVLZXlzUmVmZXJyZXIpCiAgICAvLyApCiAgICBmcmFtZV9kaWcgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNzUKICAgIC8vIEJ5dGVzKEFic3RyYWN0QWNjb3VudEdsb2JhbFN0YXRlS2V5c1JlZmVycmVyKQogICAgcHVzaGJ5dGVzICJyZWZlcnJlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTczLTE3NgogICAgLy8gY29uc3QgW3JlZmVycmVyQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoCiAgICAvLyAgIHdhbGxldElELAogICAgLy8gICBCeXRlcyhBYnN0cmFjdEFjY291bnRHbG9iYWxTdGF0ZUtleXNSZWZlcnJlcikKICAgIC8vICkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIGZyYW1lX2J1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNjEKICAgIC8vIHJldHVybiByZWZlcnJlck9yKHdhbGxldElELCBHbG9iYWwuemVyb0FkZHJlc3MpCiAgICBiIHNlbmRSZWZlcnJhbFBheW1lbnRfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpyZWZlcnJlck9yQDE4CgpzZW5kUmVmZXJyYWxQYXltZW50X2FmdGVyX2lmX2Vsc2VAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE5NQogICAgLy8gcmV0dXJuIGJ0b2koZGF0YSkKICAgIGZyYW1lX2RpZyA0CiAgICBidG9pCiAgICBmcmFtZV9idXJ5IDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTgyCiAgICAvLyByZXR1cm4gQXBwbGljYXRpb24oZ2V0V2FsbGV0SUQoZXNjcm93RmFjdG9yeSwgYWRkcmVzcykpCiAgICBiIHNlbmRSZWZlcnJhbFBheW1lbnRfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpnZXRXYWxsZXRJREAxMwoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6Okxpc3RpbmcuY3JlYXRlW3JvdXRpbmddKCkgLT4gdm9pZDoKY3JlYXRlOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyOTQKICAgIC8vIEBhYmltZXRob2QoeyBvbkNyZWF0ZTogJ3JlcXVpcmUnIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBib29sOAogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA1CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICBjb3ZlciA1CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA2CiAgICBkdXAKICAgIGNvdmVyIDYKICAgIGxlbgogICAgcHVzaGludCAzMiAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDhbMzJdCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA3CiAgICBkdXAKICAgIGNvdmVyIDYKICAgIGxlbgogICAgcHVzaGludCA0MCAvLyA0MAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgKHVpbnQ4WzMyXSx1aW50NjQpCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA4CiAgICBkdXAKICAgIGNvdmVyIDYKICAgIGxlbgogICAgcHVzaGludCAzMiAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDhbMzJdCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA5CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgNQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTAKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICBjb3ZlciA1CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxMQogICAgZHVwCiAgICBjb3ZlciA2CiAgICBsZW4KICAgIHB1c2hpbnQgMzIgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ4WzMyXQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBwdXNoaW50IDIgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgKGxlbit1dGY4W10pCiAgICBleHRyYWN0IDIgMAogICAgY292ZXIgNQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICBjb3ZlciA1CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxNAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzExCiAgICAvLyBhc3NlcnQoR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uSWQgIT09IDAsIEVSUl9NVVNUX0JFX0NBTExFRF9GUk9NX0ZBQ1RPUlkpCiAgICBnbG9iYWwgQ2FsbGVyQXBwbGljYXRpb25JRAogICAgYXNzZXJ0IC8vIG11c3QgYmUgY2FsbGVkIGZyb20gdGhlIGZhY3RvcnkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjcKICAgIC8vIHByaXplID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5UHJpemUgfSkKICAgIGJ5dGVjXzMgLy8gInByaXplIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMTMKICAgIC8vIHRoaXMucHJpemUudmFsdWUgPSBwcml6ZQogICAgdW5jb3ZlciA1CiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyOQogICAgLy8gaXNQcml6ZUJveCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlJc1ByaXplQm94IH0pCiAgICBieXRlYyA1IC8vICJpc19wcml6ZV9ib3giCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMxNAogICAgLy8gdGhpcy5pc1ByaXplQm94LnZhbHVlID0gaXNQcml6ZUJveAogICAgdW5jb3ZlciA0CiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMQogICAgLy8gcHJpY2UgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQcmljZSB9KQogICAgYnl0ZWMgNiAvLyAicHJpY2UiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMxNQogICAgLy8gdGhpcy5wcmljZS52YWx1ZSA9IHByaWNlCiAgICB1bmNvdmVyIDMKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMzCiAgICAvLyBwYXltZW50QXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVBheW1lbnRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAicGF5bWVudF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzE2CiAgICAvLyB0aGlzLnBheW1lbnRBc3NldC52YWx1ZSA9IEFzc2V0KHBheW1lbnRBc3NldCkKICAgIHVuY292ZXIgMgogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzE3CiAgICAvLyBhc3NlcnQoZXhwaXJhdGlvbiA9PT0gMCB8fCBleHBpcmF0aW9uID4gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwgRVJSX0lOVkFMSURfRVhQSVJBVElPTikKICAgIGJ6IGNyZWF0ZV9ib29sX3RydWVAMwogICAgZGlnIDkKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgID4KICAgIGJ6IGNyZWF0ZV9ib29sX2ZhbHNlQDQKCmNyZWF0ZV9ib29sX3RydWVAMzoKICAgIGludGNfMSAvLyAxCgpjcmVhdGVfYm9vbF9tZXJnZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMTcKICAgIC8vIGFzc2VydChleHBpcmF0aW9uID09PSAwIHx8IGV4cGlyYXRpb24gPiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLCBFUlJfSU5WQUxJRF9FWFBJUkFUSU9OKQogICAgYXNzZXJ0IC8vIGludmFsaWQgZXhwaXJhdGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNQogICAgLy8gZXhwaXJhdGlvbiA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleUV4cGlyYXRpb24gfSkKICAgIGJ5dGVjIDcgLy8gImV4cGlyYXRpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMxOAogICAgLy8gdGhpcy5leHBpcmF0aW9uLnZhbHVlID0gZXhwaXJhdGlvbgogICAgZGlnIDEwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNwogICAgLy8gc2VsbGVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVNlbGxlciB9KQogICAgYnl0ZWNfMSAvLyAic2VsbGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMTkKICAgIC8vIHRoaXMuc2VsbGVyLnZhbHVlID0gc2VsbGVyCiAgICBkaWcgOQogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9jaGlsZC50czoxMQogICAgLy8gZnVuZGVyID0gR2xvYmFsU3RhdGU8RnVuZGVySW5mbz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5RnVuZGVyIH0pCiAgICBwdXNoYnl0ZXMgImZ1bmRlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzIwCiAgICAvLyB0aGlzLmZ1bmRlci52YWx1ZSA9IGNsb25lKGZ1bmRlcikKICAgIGRpZyA4CiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozOQogICAgLy8gcmVzZXJ2ZWRGb3IgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5UmVzZXJ2ZWRGb3IgfSkKICAgIGJ5dGVjIDggLy8gInJlc2VydmVkX2ZvciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzIxCiAgICAvLyB0aGlzLnJlc2VydmVkRm9yLnZhbHVlID0gcmVzZXJ2ZWRGb3IKICAgIGRpZyA3CiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MQogICAgLy8gY3JlYXRvclJveWFsdHkgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlDcmVhdG9yUm95YWx0eSB9KQogICAgYnl0ZWMgMTEgLy8gImNyZWF0b3Jfcm95YWx0eSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzIyCiAgICAvLyB0aGlzLmNyZWF0b3JSb3lhbHR5LnZhbHVlID0gY3JlYXRvclJveWFsdHkKICAgIGRpZyA2CiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MwogICAgLy8gZ2F0ZUlEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5R2F0ZUlEIH0pCiAgICBwdXNoYnl0ZXMgImdhdGVfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMyMwogICAgLy8gdGhpcy5nYXRlSUQudmFsdWUgPSBnYXRlSUQKICAgIGRpZyA1CiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo1NAogICAgLy8gbWFya2V0cGxhY2UgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5TWFya2V0cGxhY2UgfSkKICAgIGJ5dGVjIDkgLy8gIm1hcmtldHBsYWNlIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMjQKICAgIC8vIHRoaXMubWFya2V0cGxhY2UudmFsdWUgPSBtYXJrZXRwbGFjZQogICAgZGlnIDQKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gdmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5VmVyc2lvbiB9KQogICAgcHVzaGJ5dGVzICJ2ZXJzaW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMjUKICAgIC8vIHRoaXMudmVyc2lvbi52YWx1ZSA9IHZlcnNpb24KICAgIGRpZyAzCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjkKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18yIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMyNgogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSA9IGFraXRhREFPCiAgICBkaWcgMgogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NTgKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlBa2l0YURBT0VzY3JvdyB9KQogICAgYnl0ZWMgMTIgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzI3CiAgICAvLyB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlID0gYWtpdGFEQU9Fc2Nyb3cKICAgIGRpZyAxCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMzAKICAgIC8vIHRoaXMubWFya2V0cGxhY2VSb3lhbHRpZXMudmFsdWUgPSBnZXRORlRGZWVzKHRoaXMuYWtpdGFEQU8udmFsdWUpLm1hcmtldHBsYWNlQ29tcG9zYWJsZVBlcmNlbnRhZ2UKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyOQogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzIgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzMwCiAgICAvLyB0aGlzLm1hcmtldHBsYWNlUm95YWx0aWVzLnZhbHVlID0gZ2V0TkZURmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKS5tYXJrZXRwbGFjZUNvbXBvc2FibGVQZXJjZW50YWdlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5MwogICAgLy8gY29uc3QgW25mdEZlZXNCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNORlRGZWVzKSkKICAgIGJ5dGVjIDE1IC8vICJuZnRfZmVlcyIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzMwCiAgICAvLyB0aGlzLm1hcmtldHBsYWNlUm95YWx0aWVzLnZhbHVlID0gZ2V0TkZURmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKS5tYXJrZXRwbGFjZUNvbXBvc2FibGVQZXJjZW50YWdlCiAgICBwdXNoaW50IDE2IC8vIDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo1NgogICAgLy8gbWFya2V0cGxhY2VSb3lhbHRpZXMgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlNYXJrZXRwbGFjZVJveWFsdGllcyB9KQogICAgYnl0ZWMgMTMgLy8gIm1hcmtldHBsYWNlX3JveWFsdGllcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzMwCiAgICAvLyB0aGlzLm1hcmtldHBsYWNlUm95YWx0aWVzLnZhbHVlID0gZ2V0TkZURmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKS5tYXJrZXRwbGFjZUNvbXBvc2FibGVQZXJjZW50YWdlCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyOTQKICAgIC8vIEBhYmltZXRob2QoeyBvbkNyZWF0ZTogJ3JlcXVpcmUnIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpjcmVhdGVfYm9vbF9mYWxzZUA0OgogICAgaW50Y18wIC8vIDAKICAgIGIgY3JlYXRlX2Jvb2xfbWVyZ2VANQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6Okxpc3RpbmcucHVyY2hhc2Vbcm91dGluZ10oKSAtPiB2b2lkOgpwdXJjaGFzZToKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM0NAogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogJ0RlbGV0ZUFwcGxpY2F0aW9uJyB9KQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMiAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDhbMzJdCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMiAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDhbMzJdCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM1MAogICAgLy8gYXNzZXJ0KFR4bi5zZW5kZXIgPT09IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywgRVJSX01VU1RfQkVfQ0FMTEVEX0ZST01fRkFDVE9SWSkKICAgIHR4biBTZW5kZXIKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgPT0KICAgIGFzc2VydCAvLyBtdXN0IGJlIGNhbGxlZCBmcm9tIHRoZSBmYWN0b3J5CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM1MQogICAgLy8gYXNzZXJ0KHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLmlkID09PSAwLCBFUlJfUEFZTUVOVF9BU1NFVF9NVVNUX0JFX0FMR08pCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMwogICAgLy8gcGF5bWVudEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQYXltZW50QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInBheW1lbnRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM1MQogICAgLy8gYXNzZXJ0KHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLmlkID09PSAwLCBFUlJfUEFZTUVOVF9BU1NFVF9NVVNUX0JFX0FMR08pCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgIQogICAgYXNzZXJ0IC8vIHBheW1lbnQgYXNzZXQgbXVzdCBiZSBhbGdvCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM1MgogICAgLy8gYXNzZXJ0KHRoaXMuZXhwaXJhdGlvbi52YWx1ZSA9PT0gMCB8fCB0aGlzLmV4cGlyYXRpb24udmFsdWUgPiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLCBFUlJfTElTVElOR19FWFBJUkVEKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzUKICAgIC8vIGV4cGlyYXRpb24gPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlFeHBpcmF0aW9uIH0pCiAgICBieXRlYyA3IC8vICJleHBpcmF0aW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNTIKICAgIC8vIGFzc2VydCh0aGlzLmV4cGlyYXRpb24udmFsdWUgPT09IDAgfHwgdGhpcy5leHBpcmF0aW9uLnZhbHVlID4gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwgRVJSX0xJU1RJTkdfRVhQSVJFRCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBwdXJjaGFzZV9ib29sX3RydWVAMwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzUKICAgIC8vIGV4cGlyYXRpb24gPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlFeHBpcmF0aW9uIH0pCiAgICBieXRlYyA3IC8vICJleHBpcmF0aW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNTIKICAgIC8vIGFzc2VydCh0aGlzLmV4cGlyYXRpb24udmFsdWUgPT09IDAgfHwgdGhpcy5leHBpcmF0aW9uLnZhbHVlID4gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwgRVJSX0xJU1RJTkdfRVhQSVJFRCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICA+CiAgICBieiBwdXJjaGFzZV9ib29sX2ZhbHNlQDQKCnB1cmNoYXNlX2Jvb2xfdHJ1ZUAzOgogICAgaW50Y18xIC8vIDEKCnB1cmNoYXNlX2Jvb2xfbWVyZ2VANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzUyCiAgICAvLyBhc3NlcnQodGhpcy5leHBpcmF0aW9uLnZhbHVlID09PSAwIHx8IHRoaXMuZXhwaXJhdGlvbi52YWx1ZSA+IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsIEVSUl9MSVNUSU5HX0VYUElSRUQpCiAgICBhc3NlcnQgLy8gbGlzdGluZyBleHBpcmVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM1NAogICAgLy8gaWYgKHRoaXMucmVzZXJ2ZWRGb3IudmFsdWUgIT09IEdsb2JhbC56ZXJvQWRkcmVzcykgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzkKICAgIC8vIHJlc2VydmVkRm9yID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVJlc2VydmVkRm9yIH0pCiAgICBieXRlYyA4IC8vICJyZXNlcnZlZF9mb3IiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM1NAogICAgLy8gaWYgKHRoaXMucmVzZXJ2ZWRGb3IudmFsdWUgIT09IEdsb2JhbC56ZXJvQWRkcmVzcykgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgIT0KICAgIGJ6IHB1cmNoYXNlX2FmdGVyX2lmX2Vsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNTUKICAgIC8vIGFzc2VydChidXllciA9PT0gdGhpcy5yZXNlcnZlZEZvci52YWx1ZSwgRVJSX1JFU0VSVkVEX0ZPUl9ESUZGRVJFTlRfQUREUkVTUykKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM5CiAgICAvLyByZXNlcnZlZEZvciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlSZXNlcnZlZEZvciB9KQogICAgYnl0ZWMgOCAvLyAicmVzZXJ2ZWRfZm9yIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNTUKICAgIC8vIGFzc2VydChidXllciA9PT0gdGhpcy5yZXNlcnZlZEZvci52YWx1ZSwgRVJSX1JFU0VSVkVEX0ZPUl9ESUZGRVJFTlRfQUREUkVTUykKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgMgogICAgPT0KICAgIGFzc2VydCAvLyByZXNlcnZlZCBmb3IgZGlmZmVyZW50IGFkZHJlc3MKCnB1cmNoYXNlX2FmdGVyX2lmX2Vsc2VANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzU4LTM2NgogICAgLy8gYXNzZXJ0TWF0Y2goCiAgICAvLyAgIHBheW1lbnQsCiAgICAvLyAgIHsKICAgIC8vICAgICBzZW5kZXI6IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiB0aGlzLnByaWNlLnZhbHVlLAogICAgLy8gICB9LAogICAgLy8gICBFUlJfSU5WQUxJRF9QQVlNRU5UCiAgICAvLyApCiAgICBkaWcgMgogICAgZHVwCiAgICBndHhucyBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzYxCiAgICAvLyBzZW5kZXI6IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNTgtMzY2CiAgICAvLyBhc3NlcnRNYXRjaCgKICAgIC8vICAgcGF5bWVudCwKICAgIC8vICAgewogICAgLy8gICAgIHNlbmRlcjogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgLy8gICAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IHRoaXMucHJpY2UudmFsdWUsCiAgICAvLyAgIH0sCiAgICAvLyAgIEVSUl9JTlZBTElEX1BBWU1FTlQKICAgIC8vICkKICAgID09CiAgICBkaWcgMQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzYyCiAgICAvLyByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNTgtMzY2CiAgICAvLyBhc3NlcnRNYXRjaCgKICAgIC8vICAgcGF5bWVudCwKICAgIC8vICAgewogICAgLy8gICAgIHNlbmRlcjogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgLy8gICAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IHRoaXMucHJpY2UudmFsdWUsCiAgICAvLyAgIH0sCiAgICAvLyAgIEVSUl9JTlZBTElEX1BBWU1FTlQKICAgIC8vICkKICAgID09CiAgICAmJgogICAgc3dhcAogICAgZ3R4bnMgQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM2MwogICAgLy8gYW1vdW50OiB0aGlzLnByaWNlLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzEKICAgIC8vIHByaWNlID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5UHJpY2UgfSkKICAgIGJ5dGVjIDYgLy8gInByaWNlIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNjMKICAgIC8vIGFtb3VudDogdGhpcy5wcmljZS52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM1OC0zNjYKICAgIC8vIGFzc2VydE1hdGNoKAogICAgLy8gICBwYXltZW50LAogICAgLy8gICB7CiAgICAvLyAgICAgc2VuZGVyOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MsCiAgICAvLyAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogdGhpcy5wcmljZS52YWx1ZSwKICAgIC8vICAgfSwKICAgIC8vICAgRVJSX0lOVkFMSURfUEFZTUVOVAogICAgLy8gKQogICAgPT0KICAgICYmCiAgICBhc3NlcnQgLy8gSW52YWxpZCBwYXltZW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM2OAogICAgLy8gdGhpcy50cmFuc2ZlclB1cmNoYXNlVG9CdXllcihidXllcikKICAgIGRpZyAxCiAgICBjYWxsc3ViIHRyYW5zZmVyUHVyY2hhc2VUb0J1eWVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjEyNAogICAgLy8gY29uc3QgYW1vdW50cyA9IHRoaXMuZ2V0QW1vdW50cyh0aGlzLnByaWNlLnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzEKICAgIC8vIHByaWNlID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5UHJpY2UgfSkKICAgIGJ5dGVjIDYgLy8gInByaWNlIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxMjQKICAgIC8vIGNvbnN0IGFtb3VudHMgPSB0aGlzLmdldEFtb3VudHModGhpcy5wcmljZS52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBjYWxsc3ViIGdldEFtb3VudHMKICAgIGR1cAogICAgYnVyeSA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjEyNwogICAgLy8gbGV0IGxlZnRvdmVyOiB1aW50NjQgPSBhbW91bnRzLmFraXRhCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxMjgKICAgIC8vIGlmIChhbW91bnRzLmFraXRhID4gMCkgewogICAgYnogcHVyY2hhc2VfYWZ0ZXJfaWZfZWxzZUAxMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxMjkKICAgIC8vICh7IGxlZnRvdmVyIH0gPSBzZW5kUmVmZXJyYWxQYXltZW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIDAsIGFtb3VudHMuYWtpdGEpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI5CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMiAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxMjkKICAgIC8vICh7IGxlZnRvdmVyIH0gPSBzZW5kUmVmZXJyYWxQYXltZW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIDAsIGFtb3VudHMuYWtpdGEpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgc2VuZFJlZmVycmFsUGF5bWVudAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CgpwdXJjaGFzZV9hZnRlcl9pZl9lbHNlQDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxMzItMTM3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogbGVmdG92ZXIsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxMzQKICAgIC8vIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFkZHJlc3MsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo1OAogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleUFraXRhREFPRXNjcm93IH0pCiAgICBieXRlYyAxMiAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxMzQKICAgIC8vIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFkZHJlc3MsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTMyLTEzNgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IGxlZnRvdmVyLAogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxMzItMTM3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogbGVmdG92ZXIsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTQwLTE0NQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLm1hcmtldHBsYWNlLAogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLm1hcmtldHBsYWNlLnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTQyCiAgICAvLyBhbW91bnQ6IGFtb3VudHMubWFya2V0cGxhY2UsCiAgICBkaWcgMwogICAgcHVzaGludCAxNiAvLyAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTQzCiAgICAvLyByZWNlaXZlcjogdGhpcy5tYXJrZXRwbGFjZS52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjU0CiAgICAvLyBtYXJrZXRwbGFjZSA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlNYXJrZXRwbGFjZSB9KQogICAgYnl0ZWMgOSAvLyAibWFya2V0cGxhY2UiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE0MwogICAgLy8gcmVjZWl2ZXI6IHRoaXMubWFya2V0cGxhY2UudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgZHVwCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxNDAtMTQ0CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudHMubWFya2V0cGxhY2UsCiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMubWFya2V0cGxhY2UudmFsdWUsCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE0MC0xNDUKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGFtb3VudDogYW1vdW50cy5tYXJrZXRwbGFjZSwKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5tYXJrZXRwbGFjZS52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxNDgtMTUzCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudHMubWFya2V0cGxhY2UsCiAgICAvLyAgICAgcmVjZWl2ZXI6IG1hcmtldHBsYWNlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIGRpZyAxCiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxNDgtMTUyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudHMubWFya2V0cGxhY2UsCiAgICAvLyAgICAgcmVjZWl2ZXI6IG1hcmtldHBsYWNlLAogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxNDgtMTUzCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudHMubWFya2V0cGxhY2UsCiAgICAvLyAgICAgcmVjZWl2ZXI6IG1hcmtldHBsYWNlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE1NgogICAgLy8gaWYgKHRoaXMuaXNQcml6ZUJveC52YWx1ZSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjkKICAgIC8vIGlzUHJpemVCb3ggPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5SXNQcml6ZUJveCB9KQogICAgYnl0ZWMgNSAvLyAiaXNfcHJpemVfYm94IgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxNTYKICAgIC8vIGlmICh0aGlzLmlzUHJpemVCb3gudmFsdWUpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBwdXJjaGFzZV9lbHNlX2JvZHlAMTIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTU3LTE2MgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLnNlbGxlciwKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5zZWxsZXIudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxNTkKICAgIC8vIGFtb3VudDogYW1vdW50cy5zZWxsZXIsCiAgICBkaWcgMwogICAgcHVzaGludCAyNCAvLyAyNAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTYwCiAgICAvLyByZWNlaXZlcjogdGhpcy5zZWxsZXIudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNwogICAgLy8gc2VsbGVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVNlbGxlciB9KQogICAgYnl0ZWNfMSAvLyAic2VsbGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxNjAKICAgIC8vIHJlY2VpdmVyOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxNTctMTYxCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudHMuc2VsbGVyLAogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTU3LTE2MgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLnNlbGxlciwKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5zZWxsZXIudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKCnB1cmNoYXNlX2FmdGVyX2lmX2Vsc2VAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM3MC0zNzIKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoeyBjbG9zZVJlbWFpbmRlclRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM3MQogICAgLy8gLnBheW1lbnQoeyBjbG9zZVJlbWFpbmRlclRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MgfSkKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgaXR4bl9maWVsZCBDbG9zZVJlbWFpbmRlclRvCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM3MC0zNzEKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoeyBjbG9zZVJlbWFpbmRlclRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzcwLTM3MgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7IGNsb3NlUmVtYWluZGVyVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcyB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM0NAogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogJ0RlbGV0ZUFwcGxpY2F0aW9uJyB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKcHVyY2hhc2VfZWxzZV9ib2R5QDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxNjQKICAgIC8vIGNvbnN0IGFzc2V0UHJpemUgPSBBc3NldCh0aGlzLnByaXplLnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjcKICAgIC8vIHByaXplID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5UHJpemUgfSkKICAgIGJ5dGVjXzMgLy8gInByaXplIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxNjQKICAgIC8vIGNvbnN0IGFzc2V0UHJpemUgPSBBc3NldCh0aGlzLnByaXplLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTY3LTE3MgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLmNyZWF0b3IsCiAgICAvLyAgICAgcmVjZWl2ZXI6IGFzc2V0UHJpemUuY3JlYXRvciwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE2OQogICAgLy8gYW1vdW50OiBhbW91bnRzLmNyZWF0b3IsCiAgICBkaWcgNAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTcwCiAgICAvLyByZWNlaXZlcjogYXNzZXRQcml6ZS5jcmVhdG9yLAogICAgZGlnIDEKICAgIGFzc2V0X3BhcmFtc19nZXQgQXNzZXRDcmVhdG9yCiAgICBhc3NlcnQgLy8gYXNzZXQgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxNjctMTcxCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudHMuY3JlYXRvciwKICAgIC8vICAgICByZWNlaXZlcjogYXNzZXRQcml6ZS5jcmVhdG9yLAogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxNjctMTcyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudHMuY3JlYXRvciwKICAgIC8vICAgICByZWNlaXZlcjogYXNzZXRQcml6ZS5jcmVhdG9yLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE3NS0xODEKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGFtb3VudDogYW1vdW50cy5zZWxsZXIsCiAgICAvLyAgICAgbm90ZTogU3RyaW5nKGFzc2V0UHJpemUubmFtZSkgKyAnIFNvbGQnLAogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE3NwogICAgLy8gYW1vdW50OiBhbW91bnRzLnNlbGxlciwKICAgIHN3YXAKICAgIHB1c2hpbnQgMjQgLy8gMjQKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE3OAogICAgLy8gbm90ZTogU3RyaW5nKGFzc2V0UHJpemUubmFtZSkgKyAnIFNvbGQnLAogICAgc3dhcAogICAgYXNzZXRfcGFyYW1zX2dldCBBc3NldE5hbWUKICAgIGFzc2VydCAvLyBhc3NldCBleGlzdHMKICAgIHB1c2hieXRlcyAiIFNvbGQiCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTc5CiAgICAvLyByZWNlaXZlcjogdGhpcy5zZWxsZXIudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNwogICAgLy8gc2VsbGVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVNlbGxlciB9KQogICAgYnl0ZWNfMSAvLyAic2VsbGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxNzkKICAgIC8vIHJlY2VpdmVyOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpdHhuX2ZpZWxkIE5vdGUKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE3NS0xODAKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGFtb3VudDogYW1vdW50cy5zZWxsZXIsCiAgICAvLyAgICAgbm90ZTogU3RyaW5nKGFzc2V0UHJpemUubmFtZSkgKyAnIFNvbGQnLAogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTc1LTE4MQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLnNlbGxlciwKICAgIC8vICAgICBub3RlOiBTdHJpbmcoYXNzZXRQcml6ZS5uYW1lKSArICcgU29sZCcsCiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMuc2VsbGVyLnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICBiIHB1cmNoYXNlX2FmdGVyX2lmX2Vsc2VAMTMKCnB1cmNoYXNlX2Jvb2xfZmFsc2VANDoKICAgIGludGNfMCAvLyAwCiAgICBiIHB1cmNoYXNlX2Jvb2xfbWVyZ2VANQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6Okxpc3RpbmcucHVyY2hhc2VBc2Fbcm91dGluZ10oKSAtPiB2b2lkOgpwdXJjaGFzZUFzYToKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM4MwogICAgLy8gQGFiaW1ldGhvZCh7IE9uQ29tcGxldGVBY3Rpb246ICdEZWxldGVBcHBsaWNhdGlvbicgfSkKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18zIC8vIGF4ZmVyCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXhmZXIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50OFszMl0KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50OFszMl0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6Mzg5CiAgICAvLyBhc3NlcnQoVHhuLnNlbmRlciA9PT0gR2xvYmFsLmNyZWF0b3JBZGRyZXNzLCBFUlJfTVVTVF9CRV9DQUxMRURfRlJPTV9GQUNUT1JZKQogICAgdHhuIFNlbmRlcgogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICA9PQogICAgYXNzZXJ0IC8vIG11c3QgYmUgY2FsbGVkIGZyb20gdGhlIGZhY3RvcnkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzkwCiAgICAvLyBhc3NlcnQodGhpcy5wYXltZW50QXNzZXQudmFsdWUuaWQgIT09IDAsIEVSUl9QQVlNRU5UX0FTU0VUX01VU1RfTk9UX0JFX0FMR08pCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMwogICAgLy8gcGF5bWVudEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQYXltZW50QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInBheW1lbnRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM5MAogICAgLy8gYXNzZXJ0KHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLmlkICE9PSAwLCBFUlJfUEFZTUVOVF9BU1NFVF9NVVNUX05PVF9CRV9BTEdPKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGFzc2VydCAvLyBwYXltZW50IGFzc2V0IG11c3Qgbm90IGJlIGFsZ28KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzkxCiAgICAvLyBhc3NlcnQodGhpcy5leHBpcmF0aW9uLnZhbHVlID09PSAwIHx8IHRoaXMuZXhwaXJhdGlvbi52YWx1ZSA+IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsIEVSUl9MSVNUSU5HX0VYUElSRUQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNQogICAgLy8gZXhwaXJhdGlvbiA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleUV4cGlyYXRpb24gfSkKICAgIGJ5dGVjIDcgLy8gImV4cGlyYXRpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM5MQogICAgLy8gYXNzZXJ0KHRoaXMuZXhwaXJhdGlvbi52YWx1ZSA9PT0gMCB8fCB0aGlzLmV4cGlyYXRpb24udmFsdWUgPiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLCBFUlJfTElTVElOR19FWFBJUkVEKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IHB1cmNoYXNlQXNhX2Jvb2xfdHJ1ZUAzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNQogICAgLy8gZXhwaXJhdGlvbiA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleUV4cGlyYXRpb24gfSkKICAgIGJ5dGVjIDcgLy8gImV4cGlyYXRpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM5MQogICAgLy8gYXNzZXJ0KHRoaXMuZXhwaXJhdGlvbi52YWx1ZSA9PT0gMCB8fCB0aGlzLmV4cGlyYXRpb24udmFsdWUgPiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLCBFUlJfTElTVElOR19FWFBJUkVEKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgID4KICAgIGJ6IHB1cmNoYXNlQXNhX2Jvb2xfZmFsc2VANAoKcHVyY2hhc2VBc2FfYm9vbF90cnVlQDM6CiAgICBpbnRjXzEgLy8gMQoKcHVyY2hhc2VBc2FfYm9vbF9tZXJnZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozOTEKICAgIC8vIGFzc2VydCh0aGlzLmV4cGlyYXRpb24udmFsdWUgPT09IDAgfHwgdGhpcy5leHBpcmF0aW9uLnZhbHVlID4gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwgRVJSX0xJU1RJTkdfRVhQSVJFRCkKICAgIGFzc2VydCAvLyBsaXN0aW5nIGV4cGlyZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzkzCiAgICAvLyBpZiAodGhpcy5yZXNlcnZlZEZvci52YWx1ZSAhPT0gR2xvYmFsLnplcm9BZGRyZXNzKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozOQogICAgLy8gcmVzZXJ2ZWRGb3IgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5UmVzZXJ2ZWRGb3IgfSkKICAgIGJ5dGVjIDggLy8gInJlc2VydmVkX2ZvciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzkzCiAgICAvLyBpZiAodGhpcy5yZXNlcnZlZEZvci52YWx1ZSAhPT0gR2xvYmFsLnplcm9BZGRyZXNzKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICAhPQogICAgYnogcHVyY2hhc2VBc2FfYWZ0ZXJfaWZfZWxzZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM5NAogICAgLy8gYXNzZXJ0KGJ1eWVyID09PSB0aGlzLnJlc2VydmVkRm9yLnZhbHVlLCBFUlJfUkVTRVJWRURfRk9SX0RJRkZFUkVOVF9BRERSRVNTKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzkKICAgIC8vIHJlc2VydmVkRm9yID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVJlc2VydmVkRm9yIH0pCiAgICBieXRlYyA4IC8vICJyZXNlcnZlZF9mb3IiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM5NAogICAgLy8gYXNzZXJ0KGJ1eWVyID09PSB0aGlzLnJlc2VydmVkRm9yLnZhbHVlLCBFUlJfUkVTRVJWRURfRk9SX0RJRkZFUkVOVF9BRERSRVNTKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyAyCiAgICA9PQogICAgYXNzZXJ0IC8vIHJlc2VydmVkIGZvciBkaWZmZXJlbnQgYWRkcmVzcwoKcHVyY2hhc2VBc2FfYWZ0ZXJfaWZfZWxzZUA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozOTctNDA0CiAgICAvLyBhc3NlcnRNYXRjaCgKICAgIC8vICAgYXNzZXRYZmVyLAogICAgLy8gICB7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IHRoaXMucHJpY2UudmFsdWUsCiAgICAvLyAgIH0sCiAgICAvLyAgIEVSUl9JTlZBTElEX1RSQU5TRkVSCiAgICAvLyApCiAgICBkaWcgMgogICAgZHVwCiAgICBndHhucyBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQwMAogICAgLy8gYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozOTctNDA0CiAgICAvLyBhc3NlcnRNYXRjaCgKICAgIC8vICAgYXNzZXRYZmVyLAogICAgLy8gICB7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IHRoaXMucHJpY2UudmFsdWUsCiAgICAvLyAgIH0sCiAgICAvLyAgIEVSUl9JTlZBTElEX1RSQU5TRkVSCiAgICAvLyApCiAgICA9PQogICAgc3dhcAogICAgZ3R4bnMgQXNzZXRBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDAxCiAgICAvLyBhc3NldEFtb3VudDogdGhpcy5wcmljZS52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMxCiAgICAvLyBwcmljZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVByaWNlIH0pCiAgICBieXRlYyA2IC8vICJwcmljZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDAxCiAgICAvLyBhc3NldEFtb3VudDogdGhpcy5wcmljZS52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM5Ny00MDQKICAgIC8vIGFzc2VydE1hdGNoKAogICAgLy8gICBhc3NldFhmZXIsCiAgICAvLyAgIHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogdGhpcy5wcmljZS52YWx1ZSwKICAgIC8vICAgfSwKICAgIC8vICAgRVJSX0lOVkFMSURfVFJBTlNGRVIKICAgIC8vICkKICAgID09CiAgICAmJgogICAgYXNzZXJ0IC8vIEludmFsaWQgdHJhbnNmZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDA2CiAgICAvLyB0aGlzLnRyYW5zZmVyUHVyY2hhc2VUb0J1eWVyKGJ1eWVyKQogICAgZGlnIDEKICAgIGNhbGxzdWIgdHJhbnNmZXJQdXJjaGFzZVRvQnV5ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTg3CiAgICAvLyBjb25zdCBhbW91bnRzID0gdGhpcy5nZXRBbW91bnRzKHRoaXMucHJpY2UudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMQogICAgLy8gcHJpY2UgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQcmljZSB9KQogICAgYnl0ZWMgNiAvLyAicHJpY2UiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE4NwogICAgLy8gY29uc3QgYW1vdW50cyA9IHRoaXMuZ2V0QW1vdW50cyh0aGlzLnByaWNlLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGNhbGxzdWIgZ2V0QW1vdW50cwogICAgZHVwCiAgICBidXJ5IDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTkwCiAgICAvLyBsZXQgbGVmdG92ZXI6IHVpbnQ2NCA9IGFtb3VudHMuYWtpdGEKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE5MQogICAgLy8gaWYgKGFtb3VudHMuYWtpdGEgPiAwKSB7CiAgICBieiBwdXJjaGFzZUFzYV9hZnRlcl9pZl9lbHNlQDEwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE5MgogICAgLy8gKHsgbGVmdG92ZXIgfSA9IHNlbmRSZWZlcnJhbFBheW1lbnQodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5wYXltZW50QXNzZXQudmFsdWUuaWQsIGFtb3VudHMuYWtpdGEpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI5CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMiAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxOTIKICAgIC8vICh7IGxlZnRvdmVyIH0gPSBzZW5kUmVmZXJyYWxQYXltZW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLmlkLCBhbW91bnRzLmFraXRhKSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMwogICAgLy8gcGF5bWVudEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQYXltZW50QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInBheW1lbnRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE5MgogICAgLy8gKHsgbGVmdG92ZXIgfSA9IHNlbmRSZWZlcnJhbFBheW1lbnQodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5wYXltZW50QXNzZXQudmFsdWUuaWQsIGFtb3VudHMuYWtpdGEpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHVuY292ZXIgMgogICAgY2FsbHN1YiBzZW5kUmVmZXJyYWxQYXltZW50CiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKCnB1cmNoYXNlQXNhX2FmdGVyX2lmX2Vsc2VAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE5NS0yMDEKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogbGVmdG92ZXIsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnBheW1lbnRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE5NwogICAgLy8gYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hZGRyZXNzLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NTgKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlBa2l0YURBT0VzY3JvdyB9KQogICAgYnl0ZWMgMTIgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTk3CiAgICAvLyBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFkZHJlc3MsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxOTkKICAgIC8vIHhmZXJBc3NldDogdGhpcy5wYXltZW50QXNzZXQudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMwogICAgLy8gcGF5bWVudEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQYXltZW50QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInBheW1lbnRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE5OQogICAgLy8geGZlckFzc2V0OiB0aGlzLnBheW1lbnRBc3NldC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE5NS0yMDAKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogbGVmdG92ZXIsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnBheW1lbnRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIGludGNfMyAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTk1LTIwMQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBsZWZ0b3ZlciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIwNAogICAgLy8gaWYgKCF0aGlzLmlzUHJpemVCb3gudmFsdWUpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI5CiAgICAvLyBpc1ByaXplQm94ID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleUlzUHJpemVCb3ggfSkKICAgIGJ5dGVjIDUgLy8gImlzX3ByaXplX2JveCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjA0CiAgICAvLyBpZiAoIXRoaXMuaXNQcml6ZUJveC52YWx1ZSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJueiBwdXJjaGFzZUFzYV9hZnRlcl9pZl9lbHNlQDE0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIwNQogICAgLy8gY29uc3QgYXNzZXRQcml6ZSA9IEFzc2V0KHRoaXMucHJpemUudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNwogICAgLy8gcHJpemUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQcml6ZSB9KQogICAgYnl0ZWNfMyAvLyAicHJpemUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIwNQogICAgLy8gY29uc3QgYXNzZXRQcml6ZSA9IEFzc2V0KHRoaXMucHJpemUudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjA3CiAgICAvLyBpZiAoYXNzZXRQcml6ZS5jcmVhdG9yLmlzT3B0ZWRJbih0aGlzLnBheW1lbnRBc3NldC52YWx1ZSkpIHsKICAgIGFzc2V0X3BhcmFtc19nZXQgQXNzZXRDcmVhdG9yCiAgICBhc3NlcnQgLy8gYXNzZXQgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMwogICAgLy8gcGF5bWVudEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQYXltZW50QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInBheW1lbnRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIwNwogICAgLy8gaWYgKGFzc2V0UHJpemUuY3JlYXRvci5pc09wdGVkSW4odGhpcy5wYXltZW50QXNzZXQudmFsdWUpKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJ6IHB1cmNoYXNlQXNhX2Vsc2VfYm9keUAxMwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyMDgtMjE0CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBhc3NldFByaXplLmNyZWF0b3IsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudHMuY3JlYXRvciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjEwCiAgICAvLyBhc3NldFJlY2VpdmVyOiBhc3NldFByaXplLmNyZWF0b3IsCiAgICBhc3NldF9wYXJhbXNfZ2V0IEFzc2V0Q3JlYXRvcgogICAgYXNzZXJ0IC8vIGFzc2V0IGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyMTEKICAgIC8vIGFzc2V0QW1vdW50OiBhbW91bnRzLmNyZWF0b3IsCiAgICBkaWcgNAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIxMgogICAgLy8geGZlckFzc2V0OiB0aGlzLnBheW1lbnRBc3NldC52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMzCiAgICAvLyBwYXltZW50QXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVBheW1lbnRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAicGF5bWVudF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjEyCiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjA4LTIxMwogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogYXNzZXRQcml6ZS5jcmVhdG9yLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnRzLmNyZWF0b3IsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnBheW1lbnRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIGludGNfMyAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjA4LTIxNAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogYXNzZXRQcml6ZS5jcmVhdG9yLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnRzLmNyZWF0b3IsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnBheW1lbnRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAoKcHVyY2hhc2VBc2FfYWZ0ZXJfaWZfZWxzZUAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjI5CiAgICAvLyBpZiAodGhpcy5tYXJrZXRwbGFjZS52YWx1ZS5pc09wdGVkSW4odGhpcy5wYXltZW50QXNzZXQudmFsdWUpKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo1NAogICAgLy8gbWFya2V0cGxhY2UgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5TWFya2V0cGxhY2UgfSkKICAgIGJ5dGVjIDkgLy8gIm1hcmtldHBsYWNlIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyMjkKICAgIC8vIGlmICh0aGlzLm1hcmtldHBsYWNlLnZhbHVlLmlzT3B0ZWRJbih0aGlzLnBheW1lbnRBc3NldC52YWx1ZSkpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMwogICAgLy8gcGF5bWVudEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQYXltZW50QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInBheW1lbnRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIyOQogICAgLy8gaWYgKHRoaXMubWFya2V0cGxhY2UudmFsdWUuaXNPcHRlZEluKHRoaXMucGF5bWVudEFzc2V0LnZhbHVlKSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBieiBwdXJjaGFzZUFzYV9lbHNlX2JvZHlAMTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjMwLTIzNgogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5tYXJrZXRwbGFjZS52YWx1ZSwKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50cy5tYXJrZXRwbGFjZSwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjMyCiAgICAvLyBhc3NldFJlY2VpdmVyOiB0aGlzLm1hcmtldHBsYWNlLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NTQKICAgIC8vIG1hcmtldHBsYWNlID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleU1hcmtldHBsYWNlIH0pCiAgICBieXRlYyA5IC8vICJtYXJrZXRwbGFjZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjMyCiAgICAvLyBhc3NldFJlY2VpdmVyOiB0aGlzLm1hcmtldHBsYWNlLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjMzCiAgICAvLyBhc3NldEFtb3VudDogYW1vdW50cy5tYXJrZXRwbGFjZSwKICAgIGRpZyA0CiAgICBwdXNoaW50IDE2IC8vIDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyMzQKICAgIC8vIHhmZXJBc3NldDogdGhpcy5wYXltZW50QXNzZXQudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMwogICAgLy8gcGF5bWVudEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQYXltZW50QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInBheW1lbnRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIzNAogICAgLy8geGZlckFzc2V0OiB0aGlzLnBheW1lbnRBc3NldC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIzMC0yMzUKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHRoaXMubWFya2V0cGxhY2UudmFsdWUsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudHMubWFya2V0cGxhY2UsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnBheW1lbnRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIGludGNfMyAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjMwLTIzNgogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5tYXJrZXRwbGFjZS52YWx1ZSwKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50cy5tYXJrZXRwbGFjZSwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CgpwdXJjaGFzZUFzYV9hZnRlcl9pZl9lbHNlQDE3OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNTAKICAgIC8vIGlmIChtYXJrZXRwbGFjZS5pc09wdGVkSW4odGhpcy5wYXltZW50QXNzZXQudmFsdWUpKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMwogICAgLy8gcGF5bWVudEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQYXltZW50QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInBheW1lbnRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI1MAogICAgLy8gaWYgKG1hcmtldHBsYWNlLmlzT3B0ZWRJbih0aGlzLnBheW1lbnRBc3NldC52YWx1ZSkpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgMQogICAgc3dhcAogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJ6IHB1cmNoYXNlQXNhX2Vsc2VfYm9keUAxOQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNTEtMjU3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBtYXJrZXRwbGFjZSwKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50cy5tYXJrZXRwbGFjZSwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjU0CiAgICAvLyBhc3NldEFtb3VudDogYW1vdW50cy5tYXJrZXRwbGFjZSwKICAgIGRpZyAzCiAgICBwdXNoaW50IDE2IC8vIDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNTUKICAgIC8vIHhmZXJBc3NldDogdGhpcy5wYXltZW50QXNzZXQudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMwogICAgLy8gcGF5bWVudEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQYXltZW50QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInBheW1lbnRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI1NQogICAgLy8geGZlckFzc2V0OiB0aGlzLnBheW1lbnRBc3NldC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgZHVwCiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjUxLTI1NgogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogbWFya2V0cGxhY2UsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudHMubWFya2V0cGxhY2UsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnBheW1lbnRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIGludGNfMyAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjUxLTI1NwogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogbWFya2V0cGxhY2UsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudHMubWFya2V0cGxhY2UsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnBheW1lbnRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAoKcHVyY2hhc2VBc2FfYWZ0ZXJfaWZfZWxzZUAyMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjcxCiAgICAvLyBpZiAodGhpcy5zZWxsZXIudmFsdWUuaXNPcHRlZEluKHRoaXMucGF5bWVudEFzc2V0LnZhbHVlKSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzcKICAgIC8vIHNlbGxlciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlTZWxsZXIgfSkKICAgIGJ5dGVjXzEgLy8gInNlbGxlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjcxCiAgICAvLyBpZiAodGhpcy5zZWxsZXIudmFsdWUuaXNPcHRlZEluKHRoaXMucGF5bWVudEFzc2V0LnZhbHVlKSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMzCiAgICAvLyBwYXltZW50QXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVBheW1lbnRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAicGF5bWVudF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjcxCiAgICAvLyBpZiAodGhpcy5zZWxsZXIudmFsdWUuaXNPcHRlZEluKHRoaXMucGF5bWVudEFzc2V0LnZhbHVlKSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBieiBwdXJjaGFzZUFzYV9lbHNlX2JvZHlAMjIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjcyLTI3NwogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRDbG9zZVRvOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6Mjc0CiAgICAvLyBhc3NldENsb3NlVG86IHRoaXMuc2VsbGVyLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzcKICAgIC8vIHNlbGxlciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlTZWxsZXIgfSkKICAgIGJ5dGVjXzEgLy8gInNlbGxlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6Mjc0CiAgICAvLyBhc3NldENsb3NlVG86IHRoaXMuc2VsbGVyLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6Mjc1CiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzMKICAgIC8vIHBheW1lbnRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5UGF5bWVudEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJwYXltZW50X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNzUKICAgIC8vIHhmZXJBc3NldDogdGhpcy5wYXltZW50QXNzZXQudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGl0eG5fZmllbGQgQXNzZXRDbG9zZVRvCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI3Mi0yNzYKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0Q2xvc2VUbzogdGhpcy5zZWxsZXIudmFsdWUsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnBheW1lbnRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIGludGNfMyAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjcyLTI3NwogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRDbG9zZVRvOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CgpwdXJjaGFzZUFzYV9hZnRlcl9pZl9lbHNlQDIzOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MDgtNDEwCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsgY2xvc2VSZW1haW5kZXJUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MDkKICAgIC8vIC5wYXltZW50KHsgY2xvc2VSZW1haW5kZXJUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzIH0pCiAgICBnbG9iYWwgQ3JlYXRvckFkZHJlc3MKICAgIGl0eG5fZmllbGQgQ2xvc2VSZW1haW5kZXJUbwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MDgtNDA5CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsgY2xvc2VSZW1haW5kZXJUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQwOC00MTAKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoeyBjbG9zZVJlbWFpbmRlclRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozODMKICAgIC8vIEBhYmltZXRob2QoeyBPbkNvbXBsZXRlQWN0aW9uOiAnRGVsZXRlQXBwbGljYXRpb24nIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpwdXJjaGFzZUFzYV9lbHNlX2JvZHlAMjI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI4MAogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyOQogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzIgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjgwCiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjgxCiAgICAvLyB0aGlzLnBheW1lbnRBc3NldC52YWx1ZS5pZCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMzCiAgICAvLyBwYXltZW50QXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVBheW1lbnRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAicGF5bWVudF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjgxCiAgICAvLyB0aGlzLnBheW1lbnRBc3NldC52YWx1ZS5pZCwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI4NAogICAgLy8gW3sgYWRkcmVzczogdGhpcy5zZWxsZXIudmFsdWUsIGFtb3VudDogYW1vdW50cy5zZWxsZXIgfV0sCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNwogICAgLy8gc2VsbGVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVNlbGxlciB9KQogICAgYnl0ZWNfMSAvLyAic2VsbGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyODQKICAgIC8vIFt7IGFkZHJlc3M6IHRoaXMuc2VsbGVyLnZhbHVlLCBhbW91bnQ6IGFtb3VudHMuc2VsbGVyIH1dLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyA2CiAgICBwdXNoaW50IDI0IC8vIDI0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBpdG9iCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYnl0ZWMgNCAvLyAweDAwMDEKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNzktMjg3CiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICB0aGlzLnBheW1lbnRBc3NldC52YWx1ZS5pZCwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogdGhpcy5zZWxsZXIudmFsdWUsIGFtb3VudDogYW1vdW50cy5zZWxsZXIgfV0sCiAgICAvLyAgIGFtb3VudHMuc2VsbGVyLAogICAgLy8gICBmYWxzZQogICAgLy8gKQogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjgyCiAgICAvLyAwLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjgzCiAgICAvLyBNQVhfVUlOVDY0LAogICAgaW50YyA1IC8vIDE4NDQ2NzQ0MDczNzA5NTUxNjE1CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI3OS0yODcKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLmlkLAogICAgLy8gICAwLAogICAgLy8gICBNQVhfVUlOVDY0LAogICAgLy8gICBbeyBhZGRyZXNzOiB0aGlzLnNlbGxlci52YWx1ZSwgYW1vdW50OiBhbW91bnRzLnNlbGxlciB9XSwKICAgIC8vICAgYW1vdW50cy5zZWxsZXIsCiAgICAvLyAgIGZhbHNlCiAgICAvLyApCiAgICB1bmNvdmVyIDQKICAgIHVuY292ZXIgNQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyODYKICAgIC8vIGZhbHNlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNzktMjg3CiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICB0aGlzLnBheW1lbnRBc3NldC52YWx1ZS5pZCwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogdGhpcy5zZWxsZXIudmFsdWUsIGFtb3VudDogYW1vdW50cy5zZWxsZXIgfV0sCiAgICAvLyAgIGFtb3VudHMuc2VsbGVyLAogICAgLy8gICBmYWxzZQogICAgLy8gKQogICAgY2FsbHN1YiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50CiAgICBwb3BuIDIKICAgIGIgcHVyY2hhc2VBc2FfYWZ0ZXJfaWZfZWxzZUAyMwoKcHVyY2hhc2VBc2FfZWxzZV9ib2R5QDE5OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNjAKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjkKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18yIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI2MAogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI2MQogICAgLy8gdGhpcy5wYXltZW50QXNzZXQudmFsdWUuaWQsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMwogICAgLy8gcGF5bWVudEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQYXltZW50QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInBheW1lbnRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI2MQogICAgLy8gdGhpcy5wYXltZW50QXNzZXQudmFsdWUuaWQsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNjQKICAgIC8vIFt7IGFkZHJlc3M6IG1hcmtldHBsYWNlLCBhbW91bnQ6IGFtb3VudHMubWFya2V0cGxhY2UgfV0sCiAgICBkaWcgNQogICAgcHVzaGludCAxNiAvLyAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgaXRvYgogICAgZGlnIDQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYnl0ZWMgNCAvLyAweDAwMDEKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNTktMjY3CiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICB0aGlzLnBheW1lbnRBc3NldC52YWx1ZS5pZCwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogbWFya2V0cGxhY2UsIGFtb3VudDogYW1vdW50cy5tYXJrZXRwbGFjZSB9XSwKICAgIC8vICAgYW1vdW50cy5tYXJrZXRwbGFjZSwKICAgIC8vICAgZmFsc2UKICAgIC8vICkKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI2MgogICAgLy8gMCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI2MwogICAgLy8gTUFYX1VJTlQ2NCwKICAgIGludGMgNSAvLyAxODQ0Njc0NDA3MzcwOTU1MTYxNQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNTktMjY3CiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICB0aGlzLnBheW1lbnRBc3NldC52YWx1ZS5pZCwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogbWFya2V0cGxhY2UsIGFtb3VudDogYW1vdW50cy5tYXJrZXRwbGFjZSB9XSwKICAgIC8vICAgYW1vdW50cy5tYXJrZXRwbGFjZSwKICAgIC8vICAgZmFsc2UKICAgIC8vICkKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI2NgogICAgLy8gZmFsc2UKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI1OS0yNjcKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLmlkLAogICAgLy8gICAwLAogICAgLy8gICBNQVhfVUlOVDY0LAogICAgLy8gICBbeyBhZGRyZXNzOiBtYXJrZXRwbGFjZSwgYW1vdW50OiBhbW91bnRzLm1hcmtldHBsYWNlIH1dLAogICAgLy8gICBhbW91bnRzLm1hcmtldHBsYWNlLAogICAgLy8gICBmYWxzZQogICAgLy8gKQogICAgY2FsbHN1YiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50CiAgICBwb3BuIDIKICAgIGIgcHVyY2hhc2VBc2FfYWZ0ZXJfaWZfZWxzZUAyMAoKcHVyY2hhc2VBc2FfZWxzZV9ib2R5QDE2OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyMzkKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjkKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18yIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIzOQogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI0MAogICAgLy8gdGhpcy5wYXltZW50QXNzZXQudmFsdWUuaWQsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMwogICAgLy8gcGF5bWVudEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQYXltZW50QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInBheW1lbnRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI0MAogICAgLy8gdGhpcy5wYXltZW50QXNzZXQudmFsdWUuaWQsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNDMKICAgIC8vIFt7IGFkZHJlc3M6IHRoaXMubWFya2V0cGxhY2UudmFsdWUsIGFtb3VudDogYW1vdW50cy5tYXJrZXRwbGFjZSB9XSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjU0CiAgICAvLyBtYXJrZXRwbGFjZSA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlNYXJrZXRwbGFjZSB9KQogICAgYnl0ZWMgOSAvLyAibWFya2V0cGxhY2UiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI0MwogICAgLy8gW3sgYWRkcmVzczogdGhpcy5tYXJrZXRwbGFjZS52YWx1ZSwgYW1vdW50OiBhbW91bnRzLm1hcmtldHBsYWNlIH1dLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyA2CiAgICBwdXNoaW50IDE2IC8vIDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBpdG9iCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYnl0ZWMgNCAvLyAweDAwMDEKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyMzgtMjQ2CiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICB0aGlzLnBheW1lbnRBc3NldC52YWx1ZS5pZCwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogdGhpcy5tYXJrZXRwbGFjZS52YWx1ZSwgYW1vdW50OiBhbW91bnRzLm1hcmtldHBsYWNlIH1dLAogICAgLy8gICBhbW91bnRzLm1hcmtldHBsYWNlLAogICAgLy8gICBmYWxzZQogICAgLy8gKQogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjQxCiAgICAvLyAwLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjQyCiAgICAvLyBNQVhfVUlOVDY0LAogICAgaW50YyA1IC8vIDE4NDQ2NzQ0MDczNzA5NTUxNjE1CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIzOC0yNDYKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLmlkLAogICAgLy8gICAwLAogICAgLy8gICBNQVhfVUlOVDY0LAogICAgLy8gICBbeyBhZGRyZXNzOiB0aGlzLm1hcmtldHBsYWNlLnZhbHVlLCBhbW91bnQ6IGFtb3VudHMubWFya2V0cGxhY2UgfV0sCiAgICAvLyAgIGFtb3VudHMubWFya2V0cGxhY2UsCiAgICAvLyAgIGZhbHNlCiAgICAvLyApCiAgICB1bmNvdmVyIDQKICAgIHVuY292ZXIgNQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNDUKICAgIC8vIGZhbHNlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyMzgtMjQ2CiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICB0aGlzLnBheW1lbnRBc3NldC52YWx1ZS5pZCwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogdGhpcy5tYXJrZXRwbGFjZS52YWx1ZSwgYW1vdW50OiBhbW91bnRzLm1hcmtldHBsYWNlIH1dLAogICAgLy8gICBhbW91bnRzLm1hcmtldHBsYWNlLAogICAgLy8gICBmYWxzZQogICAgLy8gKQogICAgY2FsbHN1YiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50CiAgICBwb3BuIDIKICAgIGIgcHVyY2hhc2VBc2FfYWZ0ZXJfaWZfZWxzZUAxNwoKcHVyY2hhc2VBc2FfZWxzZV9ib2R5QDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyMTcKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjkKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18yIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIxNwogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIxOAogICAgLy8gdGhpcy5wYXltZW50QXNzZXQudmFsdWUuaWQsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMwogICAgLy8gcGF5bWVudEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQYXltZW50QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInBheW1lbnRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIxOAogICAgLy8gdGhpcy5wYXltZW50QXNzZXQudmFsdWUuaWQsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyMjEKICAgIC8vIFt7IGFkZHJlc3M6IGFzc2V0UHJpemUuY3JlYXRvciwgYW1vdW50OiBhbW91bnRzLmNyZWF0b3IgfV0sCiAgICB1bmNvdmVyIDIKICAgIGFzc2V0X3BhcmFtc19nZXQgQXNzZXRDcmVhdG9yCiAgICBhc3NlcnQgLy8gYXNzZXQgZXhpc3RzCiAgICBkaWcgNgogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgY29uY2F0CiAgICBieXRlYyA0IC8vIDB4MDAwMQogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIxNi0yMjQKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLmlkLAogICAgLy8gICAwLAogICAgLy8gICBNQVhfVUlOVDY0LAogICAgLy8gICBbeyBhZGRyZXNzOiBhc3NldFByaXplLmNyZWF0b3IsIGFtb3VudDogYW1vdW50cy5jcmVhdG9yIH1dLAogICAgLy8gICBhbW91bnRzLmNyZWF0b3IsCiAgICAvLyAgIGZhbHNlCiAgICAvLyApCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyMTkKICAgIC8vIDAsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyMjAKICAgIC8vIE1BWF9VSU5UNjQsCiAgICBpbnRjIDUgLy8gMTg0NDY3NDQwNzM3MDk1NTE2MTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjE2LTIyNAogICAgLy8gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgdGhpcy5wYXltZW50QXNzZXQudmFsdWUuaWQsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IGFzc2V0UHJpemUuY3JlYXRvciwgYW1vdW50OiBhbW91bnRzLmNyZWF0b3IgfV0sCiAgICAvLyAgIGFtb3VudHMuY3JlYXRvciwKICAgIC8vICAgZmFsc2UKICAgIC8vICkKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIyMwogICAgLy8gZmFsc2UKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIxNi0yMjQKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLmlkLAogICAgLy8gICAwLAogICAgLy8gICBNQVhfVUlOVDY0LAogICAgLy8gICBbeyBhZGRyZXNzOiBhc3NldFByaXplLmNyZWF0b3IsIGFtb3VudDogYW1vdW50cy5jcmVhdG9yIH1dLAogICAgLy8gICBhbW91bnRzLmNyZWF0b3IsCiAgICAvLyAgIGZhbHNlCiAgICAvLyApCiAgICBjYWxsc3ViIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQKICAgIHBvcG4gMgogICAgYiBwdXJjaGFzZUFzYV9hZnRlcl9pZl9lbHNlQDE0CgpwdXJjaGFzZUFzYV9ib29sX2ZhbHNlQDQ6CiAgICBpbnRjXzAgLy8gMAogICAgYiBwdXJjaGFzZUFzYV9ib29sX21lcmdlQDUKCgovLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjpMaXN0aW5nLmRlbGlzdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmRlbGlzdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDE0CiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiAnRGVsZXRlQXBwbGljYXRpb24nIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMiAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDhbMzJdCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQxNgogICAgLy8gYXNzZXJ0KFR4bi5zZW5kZXIgPT09IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywgRVJSX01VU1RfQkVfQ0FMTEVEX0ZST01fRkFDVE9SWSkKICAgIHR4biBTZW5kZXIKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgPT0KICAgIGFzc2VydCAvLyBtdXN0IGJlIGNhbGxlZCBmcm9tIHRoZSBmYWN0b3J5CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQxNwogICAgLy8gYXNzZXJ0KHRoaXMuc2VsbGVyLnZhbHVlID09PSBjYWxsZXIsIEVSUl9PTkxZX1NFTExFUl9DQU5fREVMSVNUKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzcKICAgIC8vIHNlbGxlciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlTZWxsZXIgfSkKICAgIGJ5dGVjXzEgLy8gInNlbGxlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDE3CiAgICAvLyBhc3NlcnQodGhpcy5zZWxsZXIudmFsdWUgPT09IGNhbGxlciwgRVJSX09OTFlfU0VMTEVSX0NBTl9ERUxJU1QpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBjb3ZlciAzCiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA9PQogICAgYXNzZXJ0IC8vIG9ubHkgdGhlIHNlbGxlciBjYW4gZGVsaXN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQyMQogICAgLy8geGZlckFzc2V0OiB0aGlzLnByaXplLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjcKICAgIC8vIHByaXplID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5UHJpemUgfSkKICAgIGJ5dGVjXzMgLy8gInByaXplIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MjEKICAgIC8vIHhmZXJBc3NldDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQyNQogICAgLy8gY2xvc2VSZW1haW5kZXJUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQyOAogICAgLy8gaWYgKCEodGhpcy5wYXltZW50QXNzZXQudmFsdWUuaWQgPT09IDApKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMwogICAgLy8gcGF5bWVudEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQYXltZW50QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInBheW1lbnRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQyOAogICAgLy8gaWYgKCEodGhpcy5wYXltZW50QXNzZXQudmFsdWUuaWQgPT09IDApKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogZGVsaXN0X2Vsc2VfYm9keUAxMgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MzEKICAgIC8vIGFzc2V0Q2xvc2VUbzogdGhpcy5zZWxsZXIudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNwogICAgLy8gc2VsbGVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVNlbGxlciB9KQogICAgYnl0ZWNfMSAvLyAic2VsbGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MzEKICAgIC8vIGFzc2V0Q2xvc2VUbzogdGhpcy5zZWxsZXIudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MzIKICAgIC8vIHhmZXJBc3NldDogdGhpcy5wYXltZW50QXNzZXQudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMwogICAgLy8gcGF5bWVudEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQYXltZW50QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInBheW1lbnRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQzMgogICAgLy8geGZlckFzc2V0OiB0aGlzLnBheW1lbnRBc3NldC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBzd2FwCiAgICBjb3ZlciAyCiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQzNQogICAgLy8gaWYgKHRoaXMuaXNQcml6ZUJveC52YWx1ZSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjkKICAgIC8vIGlzUHJpemVCb3ggPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5SXNQcml6ZUJveCB9KQogICAgYnl0ZWMgNSAvLyAiaXNfcHJpemVfYm94IgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MzUKICAgIC8vIGlmICh0aGlzLmlzUHJpemVCb3gudmFsdWUpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBkZWxpc3RfZWxzZV9ib2R5QDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDM2LTQzOQogICAgLy8gYWJpQ2FsbDx0eXBlb2YgUHJpemVCb3gucHJvdG90eXBlLnRyYW5zZmVyPih7CiAgICAvLyAgIGFwcElkOiB0aGlzLnByaXplLnZhbHVlLAogICAgLy8gICBhcmdzOiBbdGhpcy5zZWxsZXIudmFsdWVdLAogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDM3CiAgICAvLyBhcHBJZDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI3CiAgICAvLyBwcml6ZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVByaXplIH0pCiAgICBieXRlY18zIC8vICJwcml6ZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDM3CiAgICAvLyBhcHBJZDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQzOAogICAgLy8gYXJnczogW3RoaXMuc2VsbGVyLnZhbHVlXSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM3CiAgICAvLyBzZWxsZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5U2VsbGVyIH0pCiAgICBieXRlY18xIC8vICJzZWxsZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQzOAogICAgLy8gYXJnczogW3RoaXMuc2VsbGVyLnZhbHVlXSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQzNi00MzkKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFByaXplQm94LnByb3RvdHlwZS50cmFuc2Zlcj4oewogICAgLy8gICBhcHBJZDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vICAgYXJnczogW3RoaXMuc2VsbGVyLnZhbHVlXSwKICAgIC8vIH0pCiAgICBieXRlYyAxNCAvLyBtZXRob2QgInRyYW5zZmVyKGFkZHJlc3Mpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0NDAKICAgIC8vIGl0eG4uc3VibWl0R3JvdXAocGF5bWVudEFzc2V0VHJhbnNmZXIsIHBheW1lbnQpCiAgICBpdHhuX2JlZ2luCiAgICBpdHhuX2ZpZWxkIEFzc2V0Q2xvc2VUbwogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDMwLTQzMwogICAgLy8gY29uc3QgcGF5bWVudEFzc2V0VHJhbnNmZXIgPSBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICBhc3NldENsb3NlVG86IHRoaXMuc2VsbGVyLnZhbHVlLAogICAgLy8gICB4ZmVyQXNzZXQ6IHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLAogICAgLy8gfSkKICAgIGludGNfMyAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDQwCiAgICAvLyBpdHhuLnN1Ym1pdEdyb3VwKHBheW1lbnRBc3NldFRyYW5zZmVyLCBwYXltZW50KQogICAgaXR4bl9uZXh0CiAgICBkdXAKICAgIGl0eG5fZmllbGQgQ2xvc2VSZW1haW5kZXJUbwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MjQtNDI2CiAgICAvLyBjb25zdCBwYXltZW50ID0gaXR4bi5wYXltZW50KHsKICAgIC8vICAgY2xvc2VSZW1haW5kZXJUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgLy8gfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDQwCiAgICAvLyBpdHhuLnN1Ym1pdEdyb3VwKHBheW1lbnRBc3NldFRyYW5zZmVyLCBwYXltZW50KQogICAgaXR4bl9zdWJtaXQKCmRlbGlzdF9hZnRlcl9pZl9lbHNlQDIwOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MTQKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6ICdEZWxldGVBcHBsaWNhdGlvbicgfSkKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmRlbGlzdF9lbHNlX2JvZHlANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDQyCiAgICAvLyBpdHhuLnN1Ym1pdEdyb3VwKGFzc2V0VHJhbnNmZXIsIHBheW1lbnRBc3NldFRyYW5zZmVyLCBwYXltZW50KQogICAgaXR4bl9iZWdpbgogICAgZGlnIDMKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBkaWcgNAogICAgaXR4bl9maWVsZCBBc3NldENsb3NlVG8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDE5LTQyMgogICAgLy8gY29uc3QgYXNzZXRUcmFuc2ZlciA9IGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgIGFzc2V0Q2xvc2VUbzogdGhpcy5zZWxsZXIudmFsdWUsCiAgICAvLyAgIHhmZXJBc3NldDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vIH0pCiAgICBpbnRjXzMgLy8gNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ0MgogICAgLy8gaXR4bi5zdWJtaXRHcm91cChhc3NldFRyYW5zZmVyLCBwYXltZW50QXNzZXRUcmFuc2ZlciwgcGF5bWVudCkKICAgIGl0eG5fbmV4dAogICAgaXR4bl9maWVsZCBBc3NldENsb3NlVG8KICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQzMC00MzMKICAgIC8vIGNvbnN0IHBheW1lbnRBc3NldFRyYW5zZmVyID0gaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgYXNzZXRDbG9zZVRvOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIC8vICAgeGZlckFzc2V0OiB0aGlzLnBheW1lbnRBc3NldC52YWx1ZSwKICAgIC8vIH0pCiAgICBpbnRjXzMgLy8gNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ0MgogICAgLy8gaXR4bi5zdWJtaXRHcm91cChhc3NldFRyYW5zZmVyLCBwYXltZW50QXNzZXRUcmFuc2ZlciwgcGF5bWVudCkKICAgIGl0eG5fbmV4dAogICAgZHVwCiAgICBpdHhuX2ZpZWxkIENsb3NlUmVtYWluZGVyVG8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDI0LTQyNgogICAgLy8gY29uc3QgcGF5bWVudCA9IGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIGNsb3NlUmVtYWluZGVyVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIC8vIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ0MgogICAgLy8gaXR4bi5zdWJtaXRHcm91cChhc3NldFRyYW5zZmVyLCBwYXltZW50QXNzZXRUcmFuc2ZlciwgcGF5bWVudCkKICAgIGl0eG5fc3VibWl0CiAgICBiIGRlbGlzdF9hZnRlcl9pZl9lbHNlQDIwCgpkZWxpc3RfZWxzZV9ib2R5QDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0NDUKICAgIC8vIGlmICh0aGlzLmlzUHJpemVCb3gudmFsdWUpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI5CiAgICAvLyBpc1ByaXplQm94ID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleUlzUHJpemVCb3ggfSkKICAgIGJ5dGVjIDUgLy8gImlzX3ByaXplX2JveCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDQ1CiAgICAvLyBpZiAodGhpcy5pc1ByaXplQm94LnZhbHVlKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogZGVsaXN0X2Vsc2VfYm9keUAxNgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0NDYtNDQ5CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBQcml6ZUJveC5wcm90b3R5cGUudHJhbnNmZXI+KHsKICAgIC8vICAgYXBwSWQ6IHRoaXMucHJpemUudmFsdWUsCiAgICAvLyAgIGFyZ3M6IFt0aGlzLnNlbGxlci52YWx1ZV0sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0NDcKICAgIC8vIGFwcElkOiB0aGlzLnByaXplLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjcKICAgIC8vIHByaXplID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5UHJpemUgfSkKICAgIGJ5dGVjXzMgLy8gInByaXplIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0NDcKICAgIC8vIGFwcElkOiB0aGlzLnByaXplLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDQ4CiAgICAvLyBhcmdzOiBbdGhpcy5zZWxsZXIudmFsdWVdLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzcKICAgIC8vIHNlbGxlciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlTZWxsZXIgfSkKICAgIGJ5dGVjXzEgLy8gInNlbGxlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDQ4CiAgICAvLyBhcmdzOiBbdGhpcy5zZWxsZXIudmFsdWVdLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDQ2LTQ0OQogICAgLy8gYWJpQ2FsbDx0eXBlb2YgUHJpemVCb3gucHJvdG90eXBlLnRyYW5zZmVyPih7CiAgICAvLyAgIGFwcElkOiB0aGlzLnByaXplLnZhbHVlLAogICAgLy8gICBhcmdzOiBbdGhpcy5zZWxsZXIudmFsdWVdLAogICAgLy8gfSkKICAgIGJ5dGVjIDE0IC8vIG1ldGhvZCAidHJhbnNmZXIoYWRkcmVzcyl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ1MAogICAgLy8gcGF5bWVudC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgZHVwCiAgICBpdHhuX2ZpZWxkIENsb3NlUmVtYWluZGVyVG8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDI0LTQyNgogICAgLy8gY29uc3QgcGF5bWVudCA9IGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIGNsb3NlUmVtYWluZGVyVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIC8vIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ1MAogICAgLy8gcGF5bWVudC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIGIgZGVsaXN0X2FmdGVyX2lmX2Vsc2VAMjAKCmRlbGlzdF9lbHNlX2JvZHlAMTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ1MgogICAgLy8gaXR4bi5zdWJtaXRHcm91cChhc3NldFRyYW5zZmVyLCBwYXltZW50KQogICAgaXR4bl9iZWdpbgogICAgZGlnIDEKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBkaWcgMgogICAgaXR4bl9maWVsZCBBc3NldENsb3NlVG8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDE5LTQyMgogICAgLy8gY29uc3QgYXNzZXRUcmFuc2ZlciA9IGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgIGFzc2V0Q2xvc2VUbzogdGhpcy5zZWxsZXIudmFsdWUsCiAgICAvLyAgIHhmZXJBc3NldDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vIH0pCiAgICBpbnRjXzMgLy8gNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ1MgogICAgLy8gaXR4bi5zdWJtaXRHcm91cChhc3NldFRyYW5zZmVyLCBwYXltZW50KQogICAgaXR4bl9uZXh0CiAgICBkdXAKICAgIGl0eG5fZmllbGQgQ2xvc2VSZW1haW5kZXJUbwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MjQtNDI2CiAgICAvLyBjb25zdCBwYXltZW50ID0gaXR4bi5wYXltZW50KHsKICAgIC8vICAgY2xvc2VSZW1haW5kZXJUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgLy8gfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDUyCiAgICAvLyBpdHhuLnN1Ym1pdEdyb3VwKGFzc2V0VHJhbnNmZXIsIHBheW1lbnQpCiAgICBpdHhuX3N1Ym1pdAogICAgYiBkZWxpc3RfYWZ0ZXJfaWZfZWxzZUAyMAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6Okxpc3RpbmcuY2hhbmdlUHJpY2Vbcm91dGluZ10oKSAtPiB2b2lkOgpjaGFuZ2VQcmljZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDU3CiAgICAvLyBjaGFuZ2VQcmljZShwcmljZTogdWludDY0KTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0NTgKICAgIC8vIGFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLnNlbGxlci52YWx1ZSwgRVJSX01VU1RfQkVfU0VMTEVSKQogICAgdHhuIFNlbmRlcgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzcKICAgIC8vIHNlbGxlciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlTZWxsZXIgfSkKICAgIGJ5dGVjXzEgLy8gInNlbGxlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDU4CiAgICAvLyBhc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5zZWxsZXIudmFsdWUsIEVSUl9NVVNUX0JFX1NFTExFUikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA9PQogICAgYXNzZXJ0IC8vIG11c3QgYmUgdGhlIHNlbGxlcgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMQogICAgLy8gcHJpY2UgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQcmljZSB9KQogICAgYnl0ZWMgNiAvLyAicHJpY2UiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ1OQogICAgLy8gdGhpcy5wcmljZS52YWx1ZSA9IHByaWNlCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0NTcKICAgIC8vIGNoYW5nZVByaWNlKHByaWNlOiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6QWtpdGFCYXNlQ29udHJhY3QudXBkYXRlQWtpdGFEQU9bcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGVBa2l0YURBTzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM4CiAgICAvLyB1cGRhdGVBa2l0YURBTyhha2l0YURBTzogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozOQogICAgLy8gYXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMyCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyOQogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzIgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMyCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBwdXNoYnl0ZXMgIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM5CiAgICAvLyBhc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGFzc2VydCAvLyBPbmx5IHRoZSBBa2l0YSBEQU8gY2FuIGNhbGwgdGhpcyBmdW5jdGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjkKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18yIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0MAogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSA9IGFraXRhREFPCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzgKICAgIC8vIHVwZGF0ZUFraXRhREFPKGFraXRhREFPOiBBcHBsaWNhdGlvbik6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czo6Q29udHJhY3RXaXRoQ3JlYXRvck9ubHlPcHRJbi5vcHRpbltyb3V0aW5nXSgpIC0+IHZvaWQ6Cm9wdGluOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjUzCiAgICAvLyBvcHRpbihwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGFzc2V0OiB1aW50NjQpOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czo1NAogICAgLy8gYXNzZXJ0KFR4bi5zZW5kZXIgPT09IEdsb2JhbC5jcmVhdG9yQWRkcmVzcykKICAgIHR4biBTZW5kZXIKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgPT0KICAgIGFzc2VydAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjU2LTYzCiAgICAvLyBhc3NlcnRNYXRjaCgKICAgIC8vICAgcGF5bWVudCwKICAgIC8vICAgewogICAgLy8gICAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSwKICAgIC8vICAgfSwKICAgIC8vICAgRVJSX0lOVkFMSURfUEFZTUVOVAogICAgLy8gKQogICAgZGlnIDEKICAgIGd0eG5zIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6NTkKICAgIC8vIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6NTYtNjMKICAgIC8vIGFzc2VydE1hdGNoKAogICAgLy8gICBwYXltZW50LAogICAgLy8gICB7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlLAogICAgLy8gICB9LAogICAgLy8gICBFUlJfSU5WQUxJRF9QQVlNRU5UCiAgICAvLyApCiAgICA9PQogICAgdW5jb3ZlciAyCiAgICBndHhucyBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czo2MAogICAgLy8gYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UsCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czo1Ni02MwogICAgLy8gYXNzZXJ0TWF0Y2goCiAgICAvLyAgIHBheW1lbnQsCiAgICAvLyAgIHsKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UsCiAgICAvLyAgIH0sCiAgICAvLyAgIEVSUl9JTlZBTElEX1BBWU1FTlQKICAgIC8vICkKICAgID09CiAgICAmJgogICAgYXNzZXJ0IC8vIEludmFsaWQgcGF5bWVudAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjY1LTY5CiAgICAvLyBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgYXNzZXRBbW91bnQ6IDAsCiAgICAvLyAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vIH0pLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6NjYKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6NjcKICAgIC8vIGFzc2V0QW1vdW50OiAwLAogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjY1LTY5CiAgICAvLyBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgYXNzZXRBbW91bnQ6IDAsCiAgICAvLyAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vIH0pLnN1Ym1pdCgpCiAgICBpbnRjXzMgLy8gNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjUzCiAgICAvLyBvcHRpbihwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGFzc2V0OiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjpMaXN0aW5nLmdldEFtb3VudHMoYW1vdW50OiB1aW50NjQpIC0+IGJ5dGVzOgpnZXRBbW91bnRzOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo2MgogICAgLy8gcHJpdmF0ZSBnZXRBbW91bnRzKGFtb3VudDogdWludDY0KTogUm95YWx0eUFtb3VudHMgewogICAgcHJvdG8gMSAxCiAgICBwdXNoYnl0ZXMgIiIKICAgIGR1cG4gNAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo2MwogICAgLy8gbGV0IGNyZWF0b3JBbW91bnQgPSBjYWxjUGVyY2VudChhbW91bnQsIHRoaXMuY3JlYXRvclJveWFsdHkudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MQogICAgLy8gY3JlYXRvclJveWFsdHkgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlDcmVhdG9yUm95YWx0eSB9KQogICAgYnl0ZWMgMTEgLy8gImNyZWF0b3Jfcm95YWx0eSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NjMKICAgIC8vIGxldCBjcmVhdG9yQW1vdW50ID0gY2FsY1BlcmNlbnQoYW1vdW50LCB0aGlzLmNyZWF0b3JSb3lhbHR5LnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA4CiAgICAvLyBhc3NlcnQocCA8PSBESVZJU09SLCBFUlJfSU5WQUxJRF9QRVJDRU5UQUdFKQogICAgZHVwCiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICA8PQogICAgYXNzZXJ0IC8vIEludmFsaWQgcGVyY2VudGFnZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDkKICAgIC8vIHJldHVybiBvcC5kaXZ3KC4uLm9wLm11bHcoYSwgcCksIERJVklTT1IpCiAgICBmcmFtZV9kaWcgLTEKICAgIG11bHcKICAgIGludGMgNCAvLyAxMDAwMDAKICAgIGRpdncKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo2NAogICAgLy8gaWYgKGNyZWF0b3JBbW91bnQgPT09IDAgJiYgdGhpcy5jcmVhdG9yUm95YWx0eS52YWx1ZSA+IDAgJiYgYW1vdW50ID4gMCkgewogICAgYm56IGdldEFtb3VudHNfYWZ0ZXJfaWZfZWxzZUA0CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MQogICAgLy8gY3JlYXRvclJveWFsdHkgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlDcmVhdG9yUm95YWx0eSB9KQogICAgYnl0ZWMgMTEgLy8gImNyZWF0b3Jfcm95YWx0eSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NjQKICAgIC8vIGlmIChjcmVhdG9yQW1vdW50ID09PSAwICYmIHRoaXMuY3JlYXRvclJveWFsdHkudmFsdWUgPiAwICYmIGFtb3VudCA+IDApIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VANAogICAgZnJhbWVfZGlnIC0xCiAgICBieiBnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VANAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo2NQogICAgLy8gY3JlYXRvckFtb3VudCA9IDEKICAgIGludGNfMSAvLyAxCiAgICBmcmFtZV9idXJ5IDUKCmdldEFtb3VudHNfYWZ0ZXJfaWZfZWxzZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo2OAogICAgLy8gY29uc3QgeyBtYXJrZXRwbGFjZVNhbGVQZXJjZW50YWdlTWluOiBtaW4sIG1hcmtldHBsYWNlU2FsZVBlcmNlbnRhZ2VNYXg6IG1heCB9ID0gZ2V0TkZURmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI5CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMiAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo2OAogICAgLy8gY29uc3QgeyBtYXJrZXRwbGFjZVNhbGVQZXJjZW50YWdlTWluOiBtaW4sIG1hcmtldHBsYWNlU2FsZVBlcmNlbnRhZ2VNYXg6IG1heCB9ID0gZ2V0TkZURmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTMKICAgIC8vIGNvbnN0IFtuZnRGZWVzQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzTkZURmVlcykpCiAgICBkdXAKICAgIGJ5dGVjIDE1IC8vICJuZnRfZmVlcyIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NjgKICAgIC8vIGNvbnN0IHsgbWFya2V0cGxhY2VTYWxlUGVyY2VudGFnZU1pbjogbWluLCBtYXJrZXRwbGFjZVNhbGVQZXJjZW50YWdlTWF4OiBtYXggfSA9IGdldE5GVEZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBmcmFtZV9idXJ5IDQKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZnJhbWVfYnVyeSAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjY5CiAgICAvLyBjb25zdCBpbXBhY3QgPSBnZXRVc2VySW1wYWN0KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuc2VsbGVyLnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzcKICAgIC8vIHNlbGxlciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlTZWxsZXIgfSkKICAgIGJ5dGVjXzEgLy8gInNlbGxlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NjkKICAgIC8vIGNvbnN0IGltcGFjdCA9IGdldFVzZXJJbXBhY3QodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5zZWxsZXIudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMzYtMTM5CiAgICAvLyByZXR1cm4gYWJpQ2FsbDx0eXBlb2YgQWtpdGFTb2NpYWxJbXBhY3QucHJvdG90eXBlLmdldFVzZXJJbXBhY3Q+KHsKICAgIC8vICAgYXBwSWQ6IGdldEFraXRhU29jaWFsQXBwTGlzdChha2l0YURBTykuaW1wYWN0LAogICAgLy8gICBhcmdzOiBbYWNjb3VudF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ5CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhU29jaWFsQXBwTGlzdCkpCiAgICBzd2FwCiAgICBwdXNoYnl0ZXMgInNhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTM3CiAgICAvLyBhcHBJZDogZ2V0QWtpdGFTb2NpYWxBcHBMaXN0KGFraXRhREFPKS5pbXBhY3QsCiAgICBwdXNoaW50IDE2IC8vIDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMzYtMTM5CiAgICAvLyByZXR1cm4gYWJpQ2FsbDx0eXBlb2YgQWtpdGFTb2NpYWxJbXBhY3QucHJvdG90eXBlLmdldFVzZXJJbXBhY3Q+KHsKICAgIC8vICAgYXBwSWQ6IGdldEFraXRhU29jaWFsQXBwTGlzdChha2l0YURBTykuaW1wYWN0LAogICAgLy8gICBhcmdzOiBbYWNjb3VudF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBwdXNoYnl0ZXMgMHhkNTc0YmIxMCAvLyBtZXRob2QgImdldFVzZXJJbXBhY3QoYWRkcmVzcyl1aW50NjQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgc3dhcAogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjIDEwIC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgZnJhbWVfYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEzMQogICAgLy8gY29uc3QgbWluSW1wYWN0OiB1aW50NjQgPSAoaW1wYWN0ID4gMSkgPyBpbXBhY3QgLSAxIDogMQogICAgaW50Y18xIC8vIDEKICAgID4KICAgIGJ6IGdldEFtb3VudHNfdGVybmFyeV9mYWxzZUAxNgogICAgZnJhbWVfZGlnIDEKICAgIGludGNfMSAvLyAxCiAgICAtCgpnZXRBbW91bnRzX3Rlcm5hcnlfbWVyZ2VAMTc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEzMgogICAgLy8gcmV0dXJuIG1heCAtICgoKG1heCAtIG1pbikgKiBtaW5JbXBhY3QpIC8gSU1QQUNUX0RJVklTT1IpCiAgICBmcmFtZV9kaWcgMwogICAgZHVwCiAgICBmcmFtZV9kaWcgNAogICAgLQogICAgdW5jb3ZlciAyCiAgICAqCiAgICBwdXNoaW50IDEwMDAgLy8gMTAwMAogICAgLwogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDgKICAgIC8vIGFzc2VydChwIDw9IERJVklTT1IsIEVSUl9JTlZBTElEX1BFUkNFTlRBR0UpCiAgICBkdXAKICAgIGludGMgNCAvLyAxMDAwMDAKICAgIDw9CiAgICBhc3NlcnQgLy8gSW52YWxpZCBwZXJjZW50YWdlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwOQogICAgLy8gcmV0dXJuIG9wLmRpdncoLi4ub3AubXVsdyhhLCBwKSwgRElWSVNPUikKICAgIGZyYW1lX2RpZyAtMQogICAgbXVsdwogICAgaW50YyA0IC8vIDEwMDAwMAogICAgZGl2dwogICAgZHVwCiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NzMKICAgIC8vIGlmIChha2l0YUFtb3VudCA9PT0gMCAmJiBhbW91bnQgPiAwKSB7CiAgICBibnogZ2V0QW1vdW50c19hZnRlcl9pZl9lbHNlQDcKICAgIGZyYW1lX2RpZyAtMQogICAgYnogZ2V0QW1vdW50c19hZnRlcl9pZl9lbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NzQKICAgIC8vIGFraXRhQW1vdW50ID0gMQogICAgaW50Y18xIC8vIDEKICAgIGZyYW1lX2J1cnkgMAoKZ2V0QW1vdW50c19hZnRlcl9pZl9lbHNlQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjc3CiAgICAvLyBsZXQgbWFya2V0cGxhY2VBbW91bnQgPSBjYWxjUGVyY2VudChhbW91bnQsIHRoaXMubWFya2V0cGxhY2VSb3lhbHRpZXMudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo1NgogICAgLy8gbWFya2V0cGxhY2VSb3lhbHRpZXMgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlNYXJrZXRwbGFjZVJveWFsdGllcyB9KQogICAgYnl0ZWMgMTMgLy8gIm1hcmtldHBsYWNlX3JveWFsdGllcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NzcKICAgIC8vIGxldCBtYXJrZXRwbGFjZUFtb3VudCA9IGNhbGNQZXJjZW50KGFtb3VudCwgdGhpcy5tYXJrZXRwbGFjZVJveWFsdGllcy52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwOAogICAgLy8gYXNzZXJ0KHAgPD0gRElWSVNPUiwgRVJSX0lOVkFMSURfUEVSQ0VOVEFHRSkKICAgIGR1cAogICAgaW50YyA0IC8vIDEwMDAwMAogICAgPD0KICAgIGFzc2VydCAvLyBJbnZhbGlkIHBlcmNlbnRhZ2UKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA5CiAgICAvLyByZXR1cm4gb3AuZGl2dyguLi5vcC5tdWx3KGEsIHApLCBESVZJU09SKQogICAgZnJhbWVfZGlnIC0xCiAgICBtdWx3CiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICBkaXZ3CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo3OAogICAgLy8gaWYgKG1hcmtldHBsYWNlQW1vdW50ID09PSAwICYmIHRoaXMubWFya2V0cGxhY2VSb3lhbHRpZXMudmFsdWUgPiAwICYmIGFtb3VudCA+IDApIHsKICAgIGJueiBnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VAMTEKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjU2CiAgICAvLyBtYXJrZXRwbGFjZVJveWFsdGllcyA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleU1hcmtldHBsYWNlUm95YWx0aWVzIH0pCiAgICBieXRlYyAxMyAvLyAibWFya2V0cGxhY2Vfcm95YWx0aWVzIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo3OAogICAgLy8gaWYgKG1hcmtldHBsYWNlQW1vdW50ID09PSAwICYmIHRoaXMubWFya2V0cGxhY2VSb3lhbHRpZXMudmFsdWUgPiAwICYmIGFtb3VudCA+IDApIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VAMTEKICAgIGZyYW1lX2RpZyAtMQogICAgYnogZ2V0QW1vdW50c19hZnRlcl9pZl9lbHNlQDExCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjc5CiAgICAvLyBtYXJrZXRwbGFjZUFtb3VudCA9IDEKICAgIGludGNfMSAvLyAxCiAgICBmcmFtZV9idXJ5IDIKCmdldEFtb3VudHNfYWZ0ZXJfaWZfZWxzZUAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6ODIKICAgIC8vIGNvbnN0IHNlbGxlckFtb3VudDogdWludDY0ID0gYW1vdW50IC0gKGNyZWF0b3JBbW91bnQgKyBha2l0YUFtb3VudCArICgyICogbWFya2V0cGxhY2VBbW91bnQpKQogICAgZnJhbWVfZGlnIDUKICAgIGR1cAogICAgZnJhbWVfZGlnIDAKICAgIGR1cAogICAgY292ZXIgMwogICAgKwogICAgcHVzaGludCAyIC8vIDIKICAgIGZyYW1lX2RpZyAyCiAgICBkdXAKICAgIGNvdmVyIDUKICAgICoKICAgICsKICAgIGZyYW1lX2RpZyAtMQogICAgc3dhcAogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo4NC04OQogICAgLy8gcmV0dXJuIHsKICAgIC8vICAgY3JlYXRvcjogY3JlYXRvckFtb3VudCwKICAgIC8vICAgYWtpdGE6IGFraXRhQW1vdW50LAogICAgLy8gICBtYXJrZXRwbGFjZTogbWFya2V0cGxhY2VBbW91bnQsCiAgICAvLyAgIHNlbGxlcjogc2VsbGVyQW1vdW50LAogICAgLy8gfQogICAgc3dhcAogICAgaXRvYgogICAgdW5jb3ZlciAyCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHVuY292ZXIgMgogICAgaXRvYgogICAgY29uY2F0CiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpnZXRBbW91bnRzX3Rlcm5hcnlfZmFsc2VAMTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEzMQogICAgLy8gY29uc3QgbWluSW1wYWN0OiB1aW50NjQgPSAoaW1wYWN0ID4gMSkgPyBpbXBhY3QgLSAxIDogMQogICAgaW50Y18xIC8vIDEKICAgIGIgZ2V0QW1vdW50c190ZXJuYXJ5X21lcmdlQDE3CgoKLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo6TGlzdGluZy50cmFuc2ZlclB1cmNoYXNlVG9CdXllcihidXllcjogYnl0ZXMpIC0+IHZvaWQ6CnRyYW5zZmVyUHVyY2hhc2VUb0J1eWVyOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo5MgogICAgLy8gcHJpdmF0ZSB0cmFuc2ZlclB1cmNoYXNlVG9CdXllcihidXllcjogQWNjb3VudCk6IHZvaWQgewogICAgcHJvdG8gMSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjkzCiAgICAvLyBpZiAodGhpcy5pc1ByaXplQm94LnZhbHVlKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyOQogICAgLy8gaXNQcml6ZUJveCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlJc1ByaXplQm94IH0pCiAgICBieXRlYyA1IC8vICJpc19wcml6ZV9ib3giCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjkzCiAgICAvLyBpZiAodGhpcy5pc1ByaXplQm94LnZhbHVlKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogdHJhbnNmZXJQdXJjaGFzZVRvQnV5ZXJfYWZ0ZXJfaWZfZWxzZUAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjk0LTk3CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBQcml6ZUJveC5wcm90b3R5cGUudHJhbnNmZXI+KHsKICAgIC8vICAgYXBwSWQ6IHRoaXMucHJpemUudmFsdWUsCiAgICAvLyAgIGFyZ3M6IFtidXllcl0sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo5NQogICAgLy8gYXBwSWQ6IHRoaXMucHJpemUudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNwogICAgLy8gcHJpemUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQcml6ZSB9KQogICAgYnl0ZWNfMyAvLyAicHJpemUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjk1CiAgICAvLyBhcHBJZDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjk0LTk3CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBQcml6ZUJveC5wcm90b3R5cGUudHJhbnNmZXI+KHsKICAgIC8vICAgYXBwSWQ6IHRoaXMucHJpemUudmFsdWUsCiAgICAvLyAgIGFyZ3M6IFtidXllcl0sCiAgICAvLyB9KQogICAgYnl0ZWMgMTQgLy8gbWV0aG9kICJ0cmFuc2ZlcihhZGRyZXNzKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC0xCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo5OAogICAgLy8gcmV0dXJuCiAgICByZXRzdWIKCnRyYW5zZmVyUHVyY2hhc2VUb0J1eWVyX2FmdGVyX2lmX2Vsc2VAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTAxCiAgICAvLyBjb25zdCBwcml6ZUFzc2V0ID0gQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI3CiAgICAvLyBwcml6ZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVByaXplIH0pCiAgICBieXRlY18zIC8vICJwcml6ZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTAxCiAgICAvLyBjb25zdCBwcml6ZUFzc2V0ID0gQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBzd2FwCiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxMDMKICAgIC8vIGlmIChidXllci5pc09wdGVkSW4ocHJpemVBc3NldCkpIHsKICAgIGZyYW1lX2RpZyAtMQogICAgc3dhcAogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJ6IHRyYW5zZmVyUHVyY2hhc2VUb0J1eWVyX2Vsc2VfYm9keUA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjEwNS0xMDgKICAgIC8vIGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgIGFzc2V0Q2xvc2VUbzogYnV5ZXIsCiAgICAvLyAgIHhmZXJBc3NldDogcHJpemVBc3NldCwKICAgIC8vIH0pLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgZnJhbWVfZGlnIC0xCiAgICBpdHhuX2ZpZWxkIEFzc2V0Q2xvc2VUbwogICAgaW50Y18zIC8vIDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIHJldHN1YgoKdHJhbnNmZXJQdXJjaGFzZVRvQnV5ZXJfZWxzZV9ib2R5QDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjExMQogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyOQogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzIgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTExCiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTE1CiAgICAvLyBbeyBhZGRyZXNzOiBidXllciwgYW1vdW50OiBwcml6ZUFzc2V0LmJhbGFuY2UoR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MpIH1dLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIHVuY292ZXIgMgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGFzc2VydCAvLyBhY2NvdW50IG9wdGVkIGludG8gYXNzZXQKICAgIGl0b2IKICAgIGZyYW1lX2RpZyAtMQogICAgc3dhcAogICAgY29uY2F0CiAgICBieXRlYyA0IC8vIDB4MDAwMQogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjExNgogICAgLy8gcHJpemVBc3NldC5iYWxhbmNlKEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzKSwKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBkaWcgMgogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBhc3NlcnQgLy8gYWNjb3VudCBvcHRlZCBpbnRvIGFzc2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjExMC0xMTgKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHByaXplQXNzZXQuaWQsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IGJ1eWVyLCBhbW91bnQ6IHByaXplQXNzZXQuYmFsYW5jZShHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcykgfV0sCiAgICAvLyAgIHByaXplQXNzZXQuYmFsYW5jZShHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcyksCiAgICAvLyAgIHRydWUKICAgIC8vICkKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjExMwogICAgLy8gMCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjExNAogICAgLy8gTUFYX1VJTlQ2NCwKICAgIGludGMgNSAvLyAxODQ0Njc0NDA3MzcwOTU1MTYxNQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxMTAtMTE4CiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICBwcml6ZUFzc2V0LmlkLAogICAgLy8gICAwLAogICAgLy8gICBNQVhfVUlOVDY0LAogICAgLy8gICBbeyBhZGRyZXNzOiBidXllciwgYW1vdW50OiBwcml6ZUFzc2V0LmJhbGFuY2UoR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MpIH1dLAogICAgLy8gICBwcml6ZUFzc2V0LmJhbGFuY2UoR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MpLAogICAgLy8gICB0cnVlCiAgICAvLyApCiAgICB1bmNvdmVyIDUKICAgIHVuY292ZXIgNQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxMTcKICAgIC8vIHRydWUKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjExMC0xMTgKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHByaXplQXNzZXQuaWQsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IGJ1eWVyLCBhbW91bnQ6IHByaXplQXNzZXQuYmFsYW5jZShHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcykgfV0sCiAgICAvLyAgIHByaXplQXNzZXQuYmFsYW5jZShHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcyksCiAgICAvLyAgIHRydWUKICAgIC8vICkKICAgIGNhbGxzdWIgY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudAogICAgcG9wbiAyCiAgICByZXRzdWIK", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEgLy8gMQogICAgcmV0dXJuCg==" }, "byteCode": { "approval": "CyAGAAEIBKCNBv///////////wEmEA1wYXltZW50X2Fzc2V0BnNlbGxlcglha2l0YV9kYW8FcHJpemUCAAEMaXNfcHJpemVfYm94BXByaWNlCmV4cGlyYXRpb24McmVzZXJ2ZWRfZm9yC21hcmtldHBsYWNlBBUffHUPY3JlYXRvcl9yb3lhbHR5DGFraXRhX2VzY3JvdxVtYXJrZXRwbGFjZV9yb3lhbHRpZXMErfkq5AhuZnRfZmVlc4ICBGoWOT0EaOhjQzYaAI4CAFAARDEZFEQxGEEALYIFBBccn4gEGTlsSgQz6SyUBIVN7eAEPqEYMjYaAI4FBNEHywfiAAEIBQAjQ4AE1vEepTYaAI4BAnIAMRmBBRIxGBBEQgbOMRmBBRIxGBBEQgNwigcCIoAARwMii/pAAAWL/0ABTCNEi/mAA2FhbGVIJFuMA4v9IlmB1MUBC4HkkwIIjAGL+kAAWbGLA0lyCESLAYv+CLIIsgcjshAisgG2i/sWi/wWgAR7fcX8shpMshqyGov9shqyGIEGshAisgGztwE+SVcEAExXAAQnChJESRUkEkQXFosBFlCL/YwBjACJiwNyCESL+nAARQFBAIyLAYwCiwNyCEyMAEQijASL/0EACosDcghEI4wEjAWxiwNyCESLAbIIsgcjshAisgG2iwRBAASLBbIVi/qyEYv+shKLALIUJbIQIrIBtov7Fov8FoAErxoU8rIaTLIashqL/bIaiwOyGIEGshAisgGztwI+SVcEAExXAAQnChJESRUkEkQXiwKMAUL/WosBMhAIjAKxiwNJcghEMhCyCLIHI7IQIrIBtov6FoAEOU6usrIashqyGIEGshAisgGzQv9DIkL+sYoDASJJgABJMQCL/YADb2FsZUiBGFuxgAQ8Gm8zshqyGLIagQayECKyAbO0PklXBABLAVcABCcKEkRJIlmBAghMFRJEVwYASRVJQQAHiwUkE0EAmiKMAzIDjACLA0AAe4sAjAGL/0EAaYsBMgMTQQBhi/2AC3dhbGxldF9mZWVzZUgkW0khBA5Ei/8dIQSXSYwCQAAIi/9BAAMjjAIyB0mBgPUkCIsCSU4CFosBTFAnBExQi/2L/k8FTwRPBEsFIoj92khXCAiL/08CCRZMUIwAiYv/FiIWUIwAiYsDgAhyZWZlcnJlcmVIjAFC/3aLBBeMA0L/YTYaAUkVJBJEFzYaAkkVIxJEIlM2GgNJFSQSRBc2GgRJFSQSRBc2GgVJFSQSRBdJTgU2GgZJTgYVgSASRDYaB0lOBhWBKBJENhoISU4GFYEgEkQ2GglJFSQSRBdOBTYaCkkVJBJEF04FNhoLSU4GFYEgEkQ2GgxJIlmBAghLARUSRFcCAE4FNhoNSRUkEkQXTgU2Gg5JFSQSRBdOBTINRCtPBWcnBU8EZycGTwNnKE8CZ0EACEsJMgcNQQBXI0QnB0sKZylLCWeABmZ1bmRlcksIZycISwdnJwtLBmeAB2dhdGVfaWRLBWcnCUsEZ4AHdmVyc2lvbksDZypLAmcnDEsBZyIqZUQnD2VIgRBbJw1MZyNDIkL/piIxFiMJSTgQIxJENhoBSRWBIBJENhoCSRWBIBJEMQAyCRJEIihlRBREIicHZURBAAsiJwdlRDIHDUEA+CNEIicIZUQyAxNBAAkiJwhlREsCEkRLAkk4ADIJEksBOAcyChIQTDgIIicGZUQSEERLAYgFLyInBmVEiAQvSUUFJFtJQQAMIiplRCJPAoj9ZiJbsSInDGVEcghEsgeyCCOyECKyAbOxSwOBEFsiJwllRLIHSbIII7IQIrIBs7FLAbIHsggjshAisgGzIicFZURBACOxSwOBGFsiKWVEsgeyCCOyECKyAbOxMgmyCSOyECKyAbMjQyIrZUSxSwRJTgIiW0sBcQtEsgeyCCOyECKyAbOxTIEYW0xxBESABSBTb2xkUCIpZUSyB7IFsggjshAisgGzQv+xIkL/BSIxFiMJSTgQJRJENhoBSRWBIBJENhoCSRWBIBJEMQAyCRJEIihlREQiJwdlREEACyInB2VEMgcNQQHbI0QiJwhlRDIDE0EACSInCGVESwISREsCSTgUMgoSTDgSIicGZUQSEERLAYgEACInBmVEiAMASUUFJFtJQQAPIiplRCIoZURPAoj8NCJbsSInDGVEcghEIihlRLIRshSyEiWyECKyAbMiJwVlREAALyIrZUxJTwJEcQtEIihlRHAARQFBASaxcQtESwQiWyIoZUSyEbISshQlshAisgGzIicJZUQiKGVEcABFAUEAzbEiJwllREsEgRBbIihlRLIRshKyFCWyECKyAbMiKGVESwFMcABFAUEAeLFLA4EQWyIoZUSyEbISSbIUJbIQIrIBsyIpZUQiKGVEcABFAUEAIrEiKWVEIihlRLIRshUlshAisgGzsTIJsgkjshAisgGzI0MiKmVEIihlRCIpZURLBoEYW0kWTwJMUCcETFBPA08DIiEFTwRPBSKI+dFGAkL/wyIqZUQiKGVESwWBEFtJFksETFAnBExQTwNPAyIhBU8ETwUiiPmmRgJC/3UiKmVEIihlRCInCWVESwaBEFtJFk8CTFAnBExQTwNPAyIhBU8ETwUiiPl2RgJC/x8iKmVEIihlRE8CcQtESwYiW0kWTwJMUCcETFBPA08DIiEFTwRPBSKI+UdGAkL+xCJC/iI2GgFJFYEgEkQxADIJEkQiKWVMSU4CTgNEEkQiK2VEMgkiKGVEQQBsIillRCIoZUxOAkQiJwVlREEAMbEiK2VEIillRCcOshqyGrIYgQayECKyAbOxshWyESWyECKyAbZJsgkjshAisgGzI0OxSwOyEUsEshUlshAisgG2shWyESWyECKyAbZJsgkjshAisgGzQv/WIicFZURBACexIitlRCIpZUQnDrIashqyGIEGshAisgGzsUmyCSOyECKyAbNC/6exSwGyEUsCshUlshAisgG2SbIJI7IQIrIBs0L/ijYaAUkVJBJEFzEAIillRBJEJwZMZyNDNhoBSRUkEkQXMQAiKmVEgAZ3YWxsZXRlSHIIRBJEKkxnI0MxFiMJSTgQIxJENhoBSRUkEkQXMQAyCRJESwE4BzIKEk8COAgyEBIQRLEyCkyyESKyErIUJbIQIrIBsyNDigEBgABHBCInC2VESSEEDkSL/x0hBJdJQAAQIicLZURBAAiL/0EAAyOMBSIqZURJJw9lSEkiW4wEJFuMAyIpZUSxTIADc2FsZUiBEFuABNV0uxCyGrIYshqBBrIQIrIBs7Q+SVcEAExXAAQnChJESRUkEkQXSYwBIw1BAHeLASMJiwNJiwQJTwILgegHCglJIQQORIv/HSEEl0mMAEAACIv/QQADI4wAIicNZURJIQQORIv/HSEEl0mMAkAAECInDWVEQQAIi/9BAAMjjAKLBUmLAElOAwiBAosCSU4FCwiL/0wJTBZPAhZQTwIWUEwWUIwAiSNC/4mKAQAiJwVlREEAGLEiK2VEJw6yGov/shqyGIEGshAisgGziSIrZUxJTwJEi/9McABFAUEAD7GyEYv/shUlshAisgGziSIqZUQyCk8CSU4CcABEFov/TFAnBExQMgpLAnAARE8DTwMiIQVPBU8FI4j2fkYCiQ==", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
var ListingParamsFactory = class _ListingParamsFactory {
  /**
   * Gets available create ABI call param factories
   */
  static get create() {
    return {
      _resolveByMethod(params) {
        switch (params.method) {
          case "create":
          case "create(uint64,bool,uint64,uint64,uint64,address,(address,uint64),address,uint64,uint64,address,string,uint64,uint64)void":
            return _ListingParamsFactory.create.create(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs create ABI call params for the Listing smart contract using the create(uint64,bool,uint64,uint64,uint64,address,(address,uint64),address,uint64,uint64,address,string,uint64,uint64)void ABI method
       *
       * @param params Parameters for the call
       * @returns An `AppClientMethodCallParams` object for the call
       */
      create(params) {
        return {
          ...params,
          method: "create(uint64,bool,uint64,uint64,uint64,address,(address,uint64),address,uint64,uint64,address,string,uint64,uint64)void",
          args: Array.isArray(params.args) ? params.args : [params.args.prize, params.args.isPrizeBox, params.args.price, params.args.paymentAsset, params.args.expiration, params.args.seller, params.args.funder, params.args.reservedFor, params.args.creatorRoyalty, params.args.gateId, params.args.marketplace, params.args.version, params.args.akitaDao, params.args.akitaDaoEscrow]
        };
      }
    };
  }
  /**
   * Gets available delete ABI call param factories
   */
  static get delete() {
    return {
      _resolveByMethod(params) {
        switch (params.method) {
          case "purchase":
          case "purchase(pay,address,address)void":
            return _ListingParamsFactory.delete.purchase(params);
          case "delist":
          case "delist(address)void":
            return _ListingParamsFactory.delete.delist(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs delete ABI call params for the Listing smart contract using the purchase(pay,address,address)void ABI method
       *
       * @param params Parameters for the call
       * @returns An `AppClientMethodCallParams` object for the call
       */
      purchase(params) {
        return {
          ...params,
          method: "purchase(pay,address,address)void",
          args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.buyer, params.args.marketplace]
        };
      },
      /**
       * Constructs delete ABI call params for the Listing smart contract using the delist(address)void ABI method
       *
       * @param params Parameters for the call
       * @returns An `AppClientMethodCallParams` object for the call
       */
      delist(params) {
        return {
          ...params,
          method: "delist(address)void",
          args: Array.isArray(params.args) ? params.args : [params.args.caller]
        };
      }
    };
  }
  /**
   * Constructs a no op call for the purchaseAsa(axfer,address,address)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static purchaseAsa(params) {
    return {
      ...params,
      method: "purchaseAsa(axfer,address,address)void",
      args: Array.isArray(params.args) ? params.args : [params.args.assetXfer, params.args.buyer, params.args.marketplace]
    };
  }
  /**
   * Constructs a no op call for the changePrice(uint64)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static changePrice(params) {
    return {
      ...params,
      method: "changePrice(uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.price]
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
  /**
   * Constructs a no op call for the opUp()void ABI method
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
   * Constructs a no op call for the optin(pay,uint64)void ABI method
   *
   * optin tells the contract to opt into an asa
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static optin(params) {
    return {
      ...params,
      method: "optin(pay,uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.asset]
    };
  }
};
var ListingFactory = (_class3 = class {
  /**
   * The underlying `AppFactory` for when you want to have more flexibility
   */
  
  /**
   * Creates a new instance of `ListingFactory`
   *
   * @param params The parameters to initialise the app factory with
   */
  constructor(params) {;_class3.prototype.__init8.call(this);_class3.prototype.__init9.call(this);_class3.prototype.__init10.call(this);
    this.appFactory = new (0, _appfactory.AppFactory)({
      ...params,
      appSpec: APP_SPEC2
    });
  }
  /** The name of the app (from the ARC-32 / ARC-56 app spec or override). */
  get appName() {
    return this.appFactory.appName;
  }
  /** The ARC-56 app spec being used */
  get appSpec() {
    return APP_SPEC2;
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
    return new ListingClient(this.appFactory.getAppClientById(params));
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
    return new ListingClient(await this.appFactory.getAppClientByCreatorAndName(params));
  }
  /**
   * Idempotently deploys the Listing smart contract.
   *
   * @param params The arguments for the contract calls and any additional parameters for the call
   * @returns The deployment result
   */
  async deploy(params = {}) {
    var _a, _b;
    const result = await this.appFactory.deploy({
      ...params,
      createParams: ((_a = params.createParams) == null ? void 0 : _a.method) ? ListingParamsFactory.create._resolveByMethod(params.createParams) : params.createParams ? params.createParams : void 0,
      deleteParams: ((_b = params.deleteParams) == null ? void 0 : _b.method) ? ListingParamsFactory.delete._resolveByMethod(params.deleteParams) : params.deleteParams ? params.deleteParams : void 0
    });
    return { result: result.result, appClient: new ListingClient(result.appClient) };
  }
  /**
   * Get parameters to create transactions (create and deploy related calls) for the current app. A good mental model for this is that these parameters represent a deferred transaction creation.
   */
  __init8() {this.params = {
    /**
     * Gets available create methods
     */
    create: {
      /**
       * Creates a new instance of the Listing smart contract using the create(uint64,bool,uint64,uint64,uint64,address,(address,uint64),address,uint64,uint64,address,string,uint64,uint64)void ABI method.
       *
       * create the listing application
       *
       * @param params The params for the smart contract call
       * @returns The create params
       */
      create: (params) => {
        return this.appFactory.params.create(ListingParamsFactory.create.create(params));
      }
    },
    /**
     * Gets available deployDelete methods
     */
    deployDelete: {
      /**
       * Deletes an existing instance of the Listing smart contract using the purchase(pay,address,address)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The deployDelete params
       */
      purchase: (params) => {
        return this.appFactory.params.deployDelete(ListingParamsFactory.delete.purchase(params));
      },
      /**
       * Deletes an existing instance of the Listing smart contract using the delist(address)void ABI method.
       *
       * Deletes the app and returns the asset/mbr to the seller
       *
       * @param params The params for the smart contract call
       * @returns The deployDelete params
       */
      delist: (params) => {
        return this.appFactory.params.deployDelete(ListingParamsFactory.delete.delist(params));
      }
    }
  }}
  /**
   * Create transactions for the current app
   */
  __init9() {this.createTransaction = {
    /**
     * Gets available create methods
     */
    create: {
      /**
       * Creates a new instance of the Listing smart contract using the create(uint64,bool,uint64,uint64,uint64,address,(address,uint64),address,uint64,uint64,address,string,uint64,uint64)void ABI method.
       *
       * create the listing application
       *
       * @param params The params for the smart contract call
       * @returns The create transaction
       */
      create: (params) => {
        return this.appFactory.createTransaction.create(ListingParamsFactory.create.create(params));
      }
    }
  }}
  /**
   * Send calls to the current app
   */
  __init10() {this.send = {
    /**
     * Gets available create methods
     */
    create: {
      /**
       * Creates a new instance of the Listing smart contract using an ABI method call using the create(uint64,bool,uint64,uint64,uint64,address,(address,uint64),address,uint64,uint64,address,string,uint64,uint64)void ABI method.
       *
       * create the listing application
       *
       * @param params The params for the smart contract call
       * @returns The create result
       */
      create: async (params) => {
        const result = await this.appFactory.send.create(ListingParamsFactory.create.create(params));
        return { result: { ...result.result, return: result.result.return }, appClient: new ListingClient(result.appClient) };
      }
    }
  }}
}, _class3);
var ListingClient = (_class4 = class _ListingClient {
  /**
   * The underlying `AppClient` for when you want to have more flexibility
   */
  
  constructor(appClientOrParams) {;_class4.prototype.__init11.call(this);_class4.prototype.__init12.call(this);_class4.prototype.__init13.call(this);_class4.prototype.__init14.call(this);
    this.appClient = appClientOrParams instanceof _appclient.AppClient ? appClientOrParams : new (0, _appclient.AppClient)({
      ...appClientOrParams,
      appSpec: APP_SPEC2
    });
  }
  /**
   * Returns a new `ListingClient` client, resolving the app by creator address and name
   * using AlgoKit app deployment semantics (i.e. looking for the app creation transaction note).
   * @param params The parameters to create the app client
   */
  static async fromCreatorAndName(params) {
    return new _ListingClient(await _appclient.AppClient.fromCreatorAndName({ ...params, appSpec: APP_SPEC2 }));
  }
  /**
   * Returns an `ListingClient` instance for the current network based on
   * pre-determined network-specific app IDs specified in the ARC-56 app spec.
   *
   * If no IDs are in the app spec or the network isn't recognised, an error is thrown.
   * @param params The parameters to create the app client
   */
  static async fromNetwork(params) {
    return new _ListingClient(await _appclient.AppClient.fromNetwork({ ...params, appSpec: APP_SPEC2 }));
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
  __init11() {this.params = {
    /**
     * Gets available delete methods
     */
    delete: {
      /**
       * Deletes an existing instance of the Listing smart contract using the `purchase(pay,address,address)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The delete params
       */
      purchase: (params) => {
        return this.appClient.params.delete(ListingParamsFactory.delete.purchase(params));
      },
      /**
       * Deletes an existing instance of the Listing smart contract using the `delist(address)void` ABI method.
       *
       * Deletes the app and returns the asset/mbr to the seller
       *
       * @param params The params for the smart contract call
       * @returns The delete params
       */
      delist: (params) => {
        return this.appClient.params.delete(ListingParamsFactory.delete.delist(params));
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the Listing smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.params.bare.clearState(params);
    },
    /**
     * Makes a call to the Listing smart contract using the `purchaseAsa(axfer,address,address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    purchaseAsa: (params) => {
      return this.appClient.params.call(ListingParamsFactory.purchaseAsa(params));
    },
    /**
     * Makes a call to the Listing smart contract using the `changePrice(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    changePrice: (params) => {
      return this.appClient.params.call(ListingParamsFactory.changePrice(params));
    },
    /**
     * Makes a call to the Listing smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    updateAkitaDao: (params) => {
      return this.appClient.params.call(ListingParamsFactory.updateAkitaDao(params));
    },
    /**
     * Makes a call to the Listing smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    opUp: (params = { args: [] }) => {
      return this.appClient.params.call(ListingParamsFactory.opUp(params));
    },
    /**
     * Makes a call to the Listing smart contract using the `optin(pay,uint64)void` ABI method.
     *
     * optin tells the contract to opt into an asa
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    optin: (params) => {
      return this.appClient.params.call(ListingParamsFactory.optin(params));
    }
  }}
  /**
   * Create transactions for the current app
   */
  __init12() {this.createTransaction = {
    /**
     * Gets available delete methods
     */
    delete: {
      /**
       * Deletes an existing instance of the Listing smart contract using the `purchase(pay,address,address)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The delete transaction
       */
      purchase: (params) => {
        return this.appClient.createTransaction.delete(ListingParamsFactory.delete.purchase(params));
      },
      /**
       * Deletes an existing instance of the Listing smart contract using the `delist(address)void` ABI method.
       *
       * Deletes the app and returns the asset/mbr to the seller
       *
       * @param params The params for the smart contract call
       * @returns The delete transaction
       */
      delist: (params) => {
        return this.appClient.createTransaction.delete(ListingParamsFactory.delete.delist(params));
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the Listing smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.createTransaction.bare.clearState(params);
    },
    /**
     * Makes a call to the Listing smart contract using the `purchaseAsa(axfer,address,address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    purchaseAsa: (params) => {
      return this.appClient.createTransaction.call(ListingParamsFactory.purchaseAsa(params));
    },
    /**
     * Makes a call to the Listing smart contract using the `changePrice(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    changePrice: (params) => {
      return this.appClient.createTransaction.call(ListingParamsFactory.changePrice(params));
    },
    /**
     * Makes a call to the Listing smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    updateAkitaDao: (params) => {
      return this.appClient.createTransaction.call(ListingParamsFactory.updateAkitaDao(params));
    },
    /**
     * Makes a call to the Listing smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    opUp: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(ListingParamsFactory.opUp(params));
    },
    /**
     * Makes a call to the Listing smart contract using the `optin(pay,uint64)void` ABI method.
     *
     * optin tells the contract to opt into an asa
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    optin: (params) => {
      return this.appClient.createTransaction.call(ListingParamsFactory.optin(params));
    }
  }}
  /**
   * Send calls to the current app
   */
  __init13() {this.send = {
    /**
     * Gets available delete methods
     */
    delete: {
      /**
       * Deletes an existing instance of the Listing smart contract using the `purchase(pay,address,address)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The delete result
       */
      purchase: async (params) => {
        const result = await this.appClient.send.delete(ListingParamsFactory.delete.purchase(params));
        return { ...result, return: result.return };
      },
      /**
       * Deletes an existing instance of the Listing smart contract using the `delist(address)void` ABI method.
       *
       * Deletes the app and returns the asset/mbr to the seller
       *
       * @param params The params for the smart contract call
       * @returns The delete result
       */
      delist: async (params) => {
        const result = await this.appClient.send.delete(ListingParamsFactory.delete.delist(params));
        return { ...result, return: result.return };
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the Listing smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.send.bare.clearState(params);
    },
    /**
     * Makes a call to the Listing smart contract using the `purchaseAsa(axfer,address,address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    purchaseAsa: async (params) => {
      const result = await this.appClient.send.call(ListingParamsFactory.purchaseAsa(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Listing smart contract using the `changePrice(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    changePrice: async (params) => {
      const result = await this.appClient.send.call(ListingParamsFactory.changePrice(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Listing smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    updateAkitaDao: async (params) => {
      const result = await this.appClient.send.call(ListingParamsFactory.updateAkitaDao(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Listing smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    opUp: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(ListingParamsFactory.opUp(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Listing smart contract using the `optin(pay,uint64)void` ABI method.
     *
     * optin tells the contract to opt into an asa
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    optin: async (params) => {
      const result = await this.appClient.send.call(ListingParamsFactory.optin(params));
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
    return new _ListingClient(this.appClient.clone(params));
  }
  /**
   * Methods to access state for the current Listing app
   */
  __init14() {this.state = {
    /**
     * Methods to access global state for the current Listing app
     */
    global: {
      /**
       * Get all current keyed values from global state
       */
      getAll: async () => {
        const result = await this.appClient.state.global.getAll();
        return {
          prize: result.prize,
          isPrizeBox: result.isPrizeBox,
          price: result.price,
          paymentAsset: result.paymentAsset,
          expiration: result.expiration,
          seller: result.seller,
          reservedFor: result.reservedFor,
          creatorRoyalty: result.creatorRoyalty,
          gateId: result.gateID,
          marketplace: result.marketplace,
          marketplaceRoyalties: result.marketplaceRoyalties,
          akitaDaoEscrow: result.akitaDAOEscrow,
          version: result.version,
          akitaDao: result.akitaDAO,
          funder: result.funder
        };
      },
      /**
       * Get the current value of the prize key in global state
       */
      prize: async () => {
        return await this.appClient.state.global.getValue("prize");
      },
      /**
       * Get the current value of the isPrizeBox key in global state
       */
      isPrizeBox: async () => {
        return await this.appClient.state.global.getValue("isPrizeBox");
      },
      /**
       * Get the current value of the price key in global state
       */
      price: async () => {
        return await this.appClient.state.global.getValue("price");
      },
      /**
       * Get the current value of the paymentAsset key in global state
       */
      paymentAsset: async () => {
        return await this.appClient.state.global.getValue("paymentAsset");
      },
      /**
       * Get the current value of the expiration key in global state
       */
      expiration: async () => {
        return await this.appClient.state.global.getValue("expiration");
      },
      /**
       * Get the current value of the seller key in global state
       */
      seller: async () => {
        return await this.appClient.state.global.getValue("seller");
      },
      /**
       * Get the current value of the reservedFor key in global state
       */
      reservedFor: async () => {
        return await this.appClient.state.global.getValue("reservedFor");
      },
      /**
       * Get the current value of the creatorRoyalty key in global state
       */
      creatorRoyalty: async () => {
        return await this.appClient.state.global.getValue("creatorRoyalty");
      },
      /**
       * Get the current value of the gateID key in global state
       */
      gateId: async () => {
        return await this.appClient.state.global.getValue("gateID");
      },
      /**
       * Get the current value of the marketplace key in global state
       */
      marketplace: async () => {
        return await this.appClient.state.global.getValue("marketplace");
      },
      /**
       * Get the current value of the marketplaceRoyalties key in global state
       */
      marketplaceRoyalties: async () => {
        return await this.appClient.state.global.getValue("marketplaceRoyalties");
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
      },
      /**
       * Get the current value of the funder key in global state
       */
      funder: async () => {
        return await this.appClient.state.global.getValue("funder");
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
       * Add a purchaseAsa(axfer,address,address)void method call against the Listing contract
       */
      purchaseAsa(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.purchaseAsa(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a changePrice(uint64)void method call against the Listing contract
       */
      changePrice(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.changePrice(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a updateAkitaDAO(uint64)void method call against the Listing contract
       */
      updateAkitaDao(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateAkitaDao(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a opUp()void method call against the Listing contract
       */
      opUp(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.opUp(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a optin(pay,uint64)void method call against the Listing contract
       */
      optin(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.optin(params)));
        resultMappers.push(void 0);
        return this;
      },
      get delete() {
        return {
          purchase: (params) => {
            promiseChain = promiseChain.then(async () => composer.addAppDeleteMethodCall(await client.params.delete.purchase(params)));
            resultMappers.push(void 0);
            return this;
          },
          delist: (params) => {
            promiseChain = promiseChain.then(async () => composer.addAppDeleteMethodCall(await client.params.delete.delist(params)));
            resultMappers.push(void 0);
            return this;
          }
        };
      },
      /**
       * Add a clear state call to the Listing contract
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
}, _class4);

// src/marketplace/listing.ts
var ListingSDK = class extends _chunkGL3BLPAFjs.BaseSDK {
  constructor(params) {
    super({ factory: ListingFactory, ...params });
  }
  // ========== Read Methods ==========
  /**
   * Gets the current state of the listing.
   */
  async state() {
    var _a, _b, _c;
    const state = await this.client.state.global.getAll();
    return {
      prize: _nullishCoalesce(state.prize, () => ( 0n)),
      isPrizeBox: _nullishCoalesce(state.isPrizeBox, () => ( false)),
      price: _nullishCoalesce(state.price, () => ( 0n)),
      paymentAsset: _nullishCoalesce(state.paymentAsset, () => ( 0n)),
      expiration: _nullishCoalesce(state.expiration, () => ( 0n)),
      seller: _nullishCoalesce(((_a = state.seller) == null ? void 0 : _a.toString()), () => ( "")),
      reservedFor: _nullishCoalesce(((_b = state.reservedFor) == null ? void 0 : _b.toString()), () => ( "")),
      creatorRoyalty: _nullishCoalesce(state.creatorRoyalty, () => ( 0n)),
      gateId: _nullishCoalesce(state.gateId, () => ( 0n)),
      marketplace: _nullishCoalesce(((_c = state.marketplace) == null ? void 0 : _c.toString()), () => ( "")),
      marketplaceRoyalties: _nullishCoalesce(state.marketplaceRoyalties, () => ( 0n))
    };
  }
  /**
   * Checks if the listing has expired.
   */
  async isExpired() {
    const listingState = await this.state();
    if (listingState.expiration === 0n) {
      return false;
    }
    const now = BigInt(Math.floor(Date.now() / 1e3));
    return now > listingState.expiration;
  }
  /**
   * Checks if the listing is reserved for a specific address.
   */
  async isReserved() {
    const listingState = await this.state();
    return listingState.reservedFor !== "" && listingState.reservedFor !== "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ";
  }
  // ========== Write Methods ==========
  /**
   * Changes the price of the listing.
   * Can only be called by the seller.
   */
  async changePrice({ sender, signer, price }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    await this.client.send.changePrice({
      ...sendParams,
      args: { price }
    });
  }
};

// src/marketplace/index.ts
var MarketplaceSDK = class extends _chunkGL3BLPAFjs.BaseSDK {
  constructor(params) {
    super({ factory: MarketplaceFactory, ...params }, _chunkLAHRKL35js.ENV_VAR_NAMES.MARKETPLACE_APP_ID);
  }
  // ========== Factory/Listing Methods ==========
  /**
   * Creates a new listing and returns a ListingSDK instance.
   * Can list either an ASA or a PrizeBox based on the `isPrizeBox` flag.
   * @returns ListingSDK for the newly created listing
   */
  async list({
    sender,
    signer,
    isPrizeBox = false,
    price,
    paymentAsset,
    expiration,
    reservedFor,
    gateId,
    marketplace,
    ...rest
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const isAlgoPayment = BigInt(paymentAsset) === 0n;
    const prizeId = isPrizeBox ? 0n : BigInt(rest.asset);
    const [prizeRewardsOptInCost, paymentRewardsOptInCost] = await Promise.all([
      this.getRewardsOptInCost(prizeId),
      this.getRewardsOptInCost(BigInt(paymentAsset))
    ]);
    const cost = this.listCost({ isPrizeBox, isAlgoPayment, prizeRewardsOptInCost, paymentRewardsOptInCost });
    const payment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: _algokitutils.microAlgo.call(void 0, cost),
      receiver: this.client.appAddress
    });
    let appId;
    if (isPrizeBox) {
      const { prizeBoxId } = rest;
      const prizeBoxSDK = new (0, _chunkF7QD5JKNjs.PrizeBoxFactorySDK)({ algorand: this.algorand, factoryParams: {} }).get({ appId: BigInt(prizeBoxId) });
      const prizeBoxTransferTxn = (await prizeBoxSDK.client.createTransaction.transfer({
        sender,
        signer,
        args: {
          newOwner: this.client.appAddress.toString()
        }
      })).transactions[0];
      ({ return: appId } = await this.client.send.listPrizeBox({
        ...sendParams,
        args: {
          prizeBoxTransferTxn,
          payment,
          price,
          paymentAsset,
          expiration,
          reservedFor,
          gateId,
          marketplace
        }
      }));
    } else {
      const { asset, amount, name, proof } = rest;
      const assetXfer = await this.client.algorand.createTransaction.assetTransfer({
        ...sendParams,
        amount: BigInt(amount),
        assetId: BigInt(asset),
        receiver: this.client.appAddress
      });
      ({ return: appId } = await this.client.send.list({
        ...sendParams,
        args: {
          payment,
          assetXfer,
          price,
          paymentAsset,
          expiration,
          reservedFor,
          gateId,
          marketplace,
          name,
          proof
        }
      }));
    }
    if (appId === void 0) {
      throw new Error("Failed to create new listing");
    }
    return new ListingSDK({
      algorand: this.algorand,
      factoryParams: {
        appId,
        defaultSender: sendParams.sender,
        defaultSigner: sendParams.signer
      }
    });
  }
  /**
   * Gets a ListingSDK instance for an existing listing.
   * @param appId - The app ID of the listing
   * @returns ListingSDK for the specified listing
   */
  getListing({ appId }) {
    return new ListingSDK({
      algorand: this.algorand,
      factoryParams: {
        appId,
        defaultSender: this.sendParams.sender,
        defaultSigner: this.sendParams.signer
      }
    });
  }
  /**
   * Checks if the rewards app is already opted into the given asset.
   * Returns 0n if opted in (no cost needed), 100_000n if not.
   */
  async getRewardsOptInCost(assetId) {
    const asset = BigInt(assetId);
    if (asset === 0n) return 0n;
    try {
      const akitaDaoAppId = await this.client.state.global.akitaDao();
      if (!akitaDaoAppId) return 100000n;
      const algod = this.algorand.client.algod;
      const daoApp = await algod.getApplicationByID(akitaDaoAppId).do();
      const globalState = daoApp.params.globalState;
      if (!globalState) return 100000n;
      const aalKey = new TextEncoder().encode("aal");
      const aalEntry = globalState.find(
        (kv) => kv.key.length === aalKey.length && kv.key.every((b, i) => b === aalKey[i])
      );
      if (!aalEntry || aalEntry.value.type !== 1) return 100000n;
      const aalBytes = aalEntry.value.bytes;
      if (aalBytes.length < 16) return 100000n;
      const view = new DataView(aalBytes.buffer, aalBytes.byteOffset, aalBytes.byteLength);
      const rewardsAppId = view.getBigUint64(8);
      if (rewardsAppId === 0n) return 100000n;
      const rewardsAddress = _algosdk2.default.getApplicationAddress(rewardsAppId).toString();
      const response = await algod.accountAssetInformation(rewardsAddress, asset).do();
      return response.assetHolding ? 0n : 100000n;
    } catch (e) {
      return 100000n;
    }
  }
  /**
   * Gets the cost to create a new listing.
   * @param isPrizeBox - Whether the prize is a PrizeBox
   * @param isAlgoPayment - Whether the listing will accept ALGO as payment
   * @param prizeRewardsOptInCost - Rewards app opt-in cost for the prize asset (default: 100,000, pass 0 if already opted in)
   * @param paymentRewardsOptInCost - Rewards app opt-in cost for the payment asset (default: 100,000, pass 0 if already opted in)
   */
  listCost({ isPrizeBox = false, isAlgoPayment = true, prizeRewardsOptInCost = 100000n, paymentRewardsOptInCost = 100000n, escrowOptInCost = 0n } = {}) {
    const baseCost = 735000n;
    const minBalance = 100000n;
    const assetOptInMinBalance = 100000n;
    const perDisbursement = 60600n;
    const optinMbr = isPrizeBox ? isAlgoPayment ? 0n : assetOptInMinBalance : isAlgoPayment ? assetOptInMinBalance : assetOptInMinBalance * 2n;
    let disbursementMbr = 0n;
    if (!isPrizeBox) {
      disbursementMbr += perDisbursement + prizeRewardsOptInCost;
      if (isAlgoPayment) {
        disbursementMbr += perDisbursement;
      } else {
        disbursementMbr += perDisbursement * 5n + paymentRewardsOptInCost;
      }
    } else {
      if (isAlgoPayment) {
        disbursementMbr = perDisbursement;
      } else {
        disbursementMbr = perDisbursement * 4n + paymentRewardsOptInCost;
      }
    }
    const escrowCost = isAlgoPayment ? 0n : escrowOptInCost;
    return baseCost + minBalance + optinMbr + disbursementMbr + escrowCost;
  }
  // ========== Purchase Methods ==========
  /**
   * Purchases a listing.
   * Use `isAsa: true` with `paymentAsset` and `paymentAmount` for ASA payments, otherwise ALGO is used.
   * Provide `gateTxn` for gated listings.
   */
  async purchase({
    sender,
    signer,
    listingAppId,
    marketplace,
    isAsa = false,
    gateTxn,
    ...rest
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const group = this.client.newGroup();
    if (isAsa) {
      const { paymentAsset, paymentAmount } = rest;
      const assetXfer = await this.client.algorand.createTransaction.assetTransfer({
        ...sendParams,
        amount: BigInt(paymentAmount),
        assetId: BigInt(paymentAsset),
        receiver: this.client.appAddress
      });
      if (gateTxn) {
        group.gatedPurchaseAsa({
          ...sendParams,
          args: {
            assetXfer,
            gateTxn,
            appId: listingAppId,
            marketplace
          }
        });
      } else {
        group.purchaseAsa({
          ...sendParams,
          args: {
            assetXfer,
            appId: listingAppId,
            marketplace
          }
        });
      }
    } else {
      const listing = this.getListing({ appId: BigInt(listingAppId) });
      const listingState = await listing.state();
      const payment = await this.client.algorand.createTransaction.payment({
        ...sendParams,
        amount: _algokitutils.microAlgo.call(void 0, listingState.price),
        receiver: this.client.appAddress
      });
      if (gateTxn) {
        group.gatedPurchase({
          ...sendParams,
          args: {
            payment,
            gateTxn,
            appId: listingAppId,
            marketplace
          }
        });
      } else {
        group.purchase({
          ...sendParams,
          args: {
            payment,
            appId: listingAppId,
            marketplace
          }
        });
      }
    }
    for (let i = 0; i < 10; i++) {
      group.opUp({ ...sendParams, args: {}, note: i > 0 ? `opUp-${i}` : void 0 });
    }
    await group.send(sendParams);
  }
  // ========== Delist Methods ==========
  /**
   * Removes a listing and returns the asset to the seller.
   * Can only be called by the seller.
   */
  async delist({ sender, signer, appId }) {
    const sendParams = this.getSendParams({ sender, signer });
    await this.client.send.delist({
      ...sendParams,
      args: { appId }
    });
  }
  // ========== Admin Methods ==========
  /**
   * Updates the Akita DAO reference.
   */
  async updateAkitaDAO({ sender, signer, akitaDao }) {
    const sendParams = this.getSendParams({ sender, signer });
    await this.client.send.updateAkitaDao({
      ...sendParams,
      args: { akitaDao }
    });
  }
  /**
   * Updates the Akita DAO Escrow reference.
   */
  async updateAkitaDAOEscrow({ sender, signer, app }) {
    const sendParams = this.getSendParams({ sender, signer });
    await this.client.send.updateAkitaDaoEscrow({
      ...sendParams,
      args: { app }
    });
  }
};
async function newListing({
  factoryParams,
  algorand,
  readerAccount,
  sendParams,
  ...listParams
}) {
  const marketplace = new MarketplaceSDK({ factoryParams, algorand, readerAccount, sendParams });
  return await marketplace.list(listParams);
}





exports.ListingSDK = ListingSDK; exports.MarketplaceSDK = MarketplaceSDK; exports.newListing = newListing;
//# sourceMappingURL=chunk-67K63TAH.js.map
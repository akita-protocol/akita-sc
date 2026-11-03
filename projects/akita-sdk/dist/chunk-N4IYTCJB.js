"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } var _class; var _class2; var _class3; var _class4;

var _chunkEBWCKG2Cjs = require('./chunk-EBWCKG2C.js');


var _chunkGIGYZ6YCjs = require('./chunk-GIGYZ6YC.js');


var _chunkKLHVDYDWjs = require('./chunk-KLHVDYDW.js');


var _chunkHFHM5QOFjs = require('./chunk-HFHM5QOF.js');

// src/marketplace/index.ts
var _algokitutils = require('@algorandfoundation/algokit-utils');
var _algosdk = require('algosdk'); var _algosdk2 = _interopRequireDefault(_algosdk);

// src/generated/MarketplaceClient.ts
var _abi = require('@algorandfoundation/algokit-utils/abi');
var _appclient = require('@algorandfoundation/algokit-utils/app-client');
var _appfactory = require('@algorandfoundation/algokit-utils/app-factory');
var APP_SPEC = { "name": "Marketplace", "structs": { "EscrowConfig": [{ "name": "name", "type": "string" }, { "name": "app", "type": "uint64" }] }, "methods": [{ "name": "create", "args": [{ "type": "string", "name": "version" }, { "type": "string", "name": "childVersion" }, { "type": "uint64", "name": "akitaDAO" }, { "type": "(string,uint64)", "struct": "EscrowConfig", "name": "akitaDAOEscrow" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "list", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "uint64", "name": "price" }, { "type": "uint64", "name": "paymentAsset" }, { "type": "uint64", "name": "expiration" }, { "type": "address", "name": "reservedFor" }, { "type": "uint64", "name": "gateID" }, { "type": "address", "name": "marketplace" }, { "type": "string", "name": "name" }, { "type": "byte[32][]", "name": "proof" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "listPrizeBox", "args": [{ "type": "appl", "name": "prizeBoxTransferTxn" }, { "type": "pay", "name": "payment" }, { "type": "uint64", "name": "price" }, { "type": "uint64", "name": "paymentAsset" }, { "type": "uint64", "name": "expiration" }, { "type": "address", "name": "reservedFor" }, { "type": "uint64", "name": "gateID" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "gatedPurchase", "args": [{ "type": "pay", "name": "payment" }, { "type": "appl", "name": "gateTxn" }, { "type": "uint64", "name": "appId" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "purchase", "args": [{ "type": "pay", "name": "payment" }, { "type": "uint64", "name": "appId" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "gatedPurchaseAsa", "args": [{ "type": "axfer", "name": "assetXfer" }, { "type": "appl", "name": "gateTxn" }, { "type": "uint64", "name": "appId" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "purchaseAsa", "args": [{ "type": "axfer", "name": "assetXfer" }, { "type": "uint64", "name": "appId" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "delist", "args": [{ "type": "uint64", "name": "appId" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "initBoxedContract", "args": [{ "type": "string", "name": "version" }, { "type": "uint64", "name": "size" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "loadBoxedContract", "args": [{ "type": "uint64", "name": "offset" }, { "type": "byte[]", "name": "data" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "deleteBoxedContract", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "optIn", "args": [{ "type": "pay", "name": "payment", "desc": "The payment transaction covering MBR for all opt-ins" }, { "type": "uint64", "name": "asset", "desc": "The asset to opt into" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "optIn opts this contract into `asset`. When this contract has a\nnamed escrow configured (`akitaDAOEscrow.value.name !== ''`), it\nalso opts the escrow and every revenue-split recipient in through\nthe revenue-manager plugin \u2014 so downstream methods (subscribe,\nlist, etc.) can transfer to the escrow without doing the plugin-\nrekey dance mid-group.\n\nPayment must cover:\n  - this contract's own opt-in (1 \xD7 assetOptInMinBalance), plus\n  - each downstream opt-in the escrow still needs.\n`splitOptInCount` returns 0 once the escrow is already opted in, so\nthe charge collapses to just 1 \xD7 assetOptInMinBalance on repeat\ncalls and the escrow branch becomes a no-op.", "events": [], "recommendations": {} }, { "name": "optInCost", "args": [{ "type": "uint64", "name": "asset" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "updateAkitaDAOEscrow", "args": [{ "type": "(string,uint64)", "struct": "EscrowConfig", "name": "config" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "update", "args": [{ "type": "string", "name": "newVersion" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["UpdateApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 8, "bytes": 56 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "childContractVersion": { "keyType": "AVMString", "valueType": "AVMString", "key": "Y2hpbGRfY29udHJhY3RfdmVyc2lvbg==", "desc": "the current version of the child contract" }, "akitaDAOEscrow": { "keyType": "AVMString", "valueType": "EscrowConfig", "key": "YWtpdGFfZXNjcm93", "desc": "the named DAO escrow this contract routes fees to (name + app)" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" } }, "local": {}, "box": { "boxedContract": { "keyType": "AVMString", "valueType": "AVMBytes", "key": "YmM=" } } }, "maps": { "global": {}, "local": {}, "box": {} } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [1049, 1786], "errorMessage": "Box must have value" }, { "pc": [467, 1425, 3577], "errorMessage": "Bytes has valid prefix" }, { "pc": [1667], "errorMessage": "ERR:BMPT" }, { "pc": [903, 1635, 3075], "errorMessage": "ERR:CNST" }, { "pc": [2189, 2520], "errorMessage": "ERR:FGTE" }, { "pc": [2334, 2684], "errorMessage": "ERR:HGTE" }, { "pc": [3064], "errorMessage": "ERR:ICOR" }, { "pc": [972, 985, 998, 1011, 1024, 1770, 1783, 2202, 2347], "errorMessage": "ERR:IPAY" }, { "pc": [3207], "errorMessage": "ERR:IPMA" }, { "pc": [3181], "errorMessage": "ERR:IPMR" }, { "pc": [3419], "errorMessage": "ERR:IUPG" }, { "pc": [2534, 2546, 2698, 2710], "errorMessage": "ERR:IXFR" }, { "pc": [2162, 2322, 2493, 2672, 2814], "errorMessage": "ERR:NALS" }, { "pc": [2919, 2946, 3106, 3348, 3390, 3456], "errorMessage": "ERR:NDAO" }, { "pc": [3610], "errorMessage": "ERR:NESC" }, { "pc": [1722], "errorMessage": "ERR:NPBO" }, { "pc": [892, 1624], "errorMessage": "ERR:PRLO" }, { "pc": [3633], "errorMessage": "ERR:WESC" }, { "pc": [1695], "errorMessage": "NAPB" }, { "pc": [602, 1190, 1211, 1248, 1276, 1318, 1479, 1681, 1693, 1926, 1946, 1973, 2015, 2054, 2152, 2221, 2312, 2366, 2483, 2566, 2662, 2730, 2804, 2938, 3098, 3155, 3279, 3340, 3382, 3448, 3695, 3711, 3789], "errorMessage": "application exists" }, { "pc": [1348], "errorMessage": "asset exists" }, { "pc": [916, 1031, 1076, 1088, 1093, 1313, 1470, 1474, 1492, 1671, 1812, 1824, 1829, 2010, 2045, 2049, 2067, 2140, 2172, 2471, 2503, 2931, 3091, 3145, 3149, 3270, 3274, 3333, 3375, 3394, 3441, 3470, 3502, 3687], "errorMessage": "check GlobalState exists" }, { "pc": [470, 653, 667, 683, 725, 855, 870, 1428, 2875, 2969, 3322, 3359, 3580], "errorMessage": "invalid array length header" }, { "pc": [674, 690, 861, 2882, 2976, 3366], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [882], "errorMessage": "invalid number of bytes for arc4.dynamic_array<bytes[32]>" }, { "pc": [3589], "errorMessage": "invalid number of bytes for arc4.dynamic_array<smart_contracts/arc58/account/types.ts::EscrowInfo>" }, { "pc": [824, 846, 1592, 1614, 2136, 2309, 2467, 2659], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [702, 786, 799, 813, 835, 1554, 1567, 1581, 1603, 2123, 2296, 2454, 2646, 2799, 2894, 2961, 3131, 3265, 3434], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [476], "errorMessage": "invalid number of bytes for bytes" }, { "pc": [730, 3327], "errorMessage": "invalid number of bytes for smart_contracts/utils/base-contracts/base.ts::EscrowConfig" }, { "pc": [1434], "errorMessage": "invalid number of bytes for string" }, { "pc": [717, 3314], "errorMessage": "invalid tail pointer at index 0 of ((len+utf8[]),uint64)" }, { "pc": [712, 3309], "errorMessage": "invalid tuple encoding" }, { "pc": [1530, 2114, 2445], "errorMessage": "transaction type is appl" }, { "pc": [774, 2433, 2637], "errorMessage": "transaction type is axfer" }, { "pc": [763, 1542, 2102, 2287, 3122], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDYgMiA2NzAwMCA3NTY1MDAgNTAwMDAKICAgIGJ5dGVjYmxvY2sgImFraXRhX2RhbyIgImJjIiAiYWtpdGFfZXNjcm93IiAiRVJSOklQQVkiICJ3YWxsZXQiIDB4MTUxZjdjNzUgIkVSUjpOREFPIiAiRVJSOk5BTFMiICJmdW5kZXIiICJhYWwiICJjaGlsZF9jb250cmFjdF92ZXJzaW9uIiAiZ2F0ZV9pZCIgIkVSUjpJWEZSIiAiRVJSOkNOU1QiIDB4M2VhMTE4MzIgMHhjNTNiMzJjYyAidmVyc2lvbiIgIkVSUjpQUkxPIiBiYXNlNjQoQzRFQlF3PT0pIDB4N2I1MGVhOGMgMHhhZGY5MmFlNCAiRVJSOkZHVEUiIDB4NmExNjM5M2QgIkVSUjpIR1RFIiAweDE3MWM5Zjg4ICJwYWwiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxOC0yNAogICAgLy8gQGNvbnRyYWN0KHsKICAgIC8vICAgc3RhdGVUb3RhbHM6IHsKICAgIC8vICAgICBnbG9iYWxCeXRlczogRmFjdG9yeUdsb2JhbFN0YXRlTWF4Qnl0ZXMsCiAgICAvLyAgICAgZ2xvYmFsVWludHM6IEZhY3RvcnlHbG9iYWxTdGF0ZU1heFVpbnRzCiAgICAvLyAgIH0KICAgIC8vIH0pCiAgICAvLyBleHBvcnQgY2xhc3MgTWFya2V0cGxhY2UgZXh0ZW5kcyBGYWN0b3J5Q29udHJhY3QgewogICAgcHVzaGJ5dGVzIDB4ZWE5MTgwZGQgLy8gbWV0aG9kICJ1cGRhdGUoc3RyaW5nKXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBtYWluX3VwZGF0ZV9yb3V0ZUAyCgptYWluX3N3aXRjaF9jYXNlX25leHRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjE4LTI0CiAgICAvLyBAY29udHJhY3QoewogICAgLy8gICBzdGF0ZVRvdGFsczogewogICAgLy8gICAgIGdsb2JhbEJ5dGVzOiBGYWN0b3J5R2xvYmFsU3RhdGVNYXhCeXRlcywKICAgIC8vICAgICBnbG9iYWxVaW50czogRmFjdG9yeUdsb2JhbFN0YXRlTWF4VWludHMKICAgIC8vICAgfQogICAgLy8gfSkKICAgIC8vIGV4cG9ydCBjbGFzcyBNYXJrZXRwbGFjZSBleHRlbmRzIEZhY3RvcnlDb250cmFjdCB7CiAgICB0eG4gT25Db21wbGV0aW9uCiAgICAhCiAgICBhc3NlcnQKICAgIHR4biBBcHBsaWNhdGlvbklECiAgICBieiBtYWluX2NyZWF0ZV9Ob09wQDIxCiAgICBwdXNoYnl0ZXNzIDB4ZTJmYTllMjEgMHg4MWRjNTE2YSAweDZlOTAzNWNjIDB4NWQ3YTYxNzcgMHhkYWE5NzUxNiAweDAyY2ZiMWNmIDB4Yzk3ZGJiMmUgLy8gbWV0aG9kICJsaXN0KHBheSxheGZlcix1aW50NjQsdWludDY0LHVpbnQ2NCxhZGRyZXNzLHVpbnQ2NCxhZGRyZXNzLHN0cmluZyxieXRlWzMyXVtdKXVpbnQ2NCIsIG1ldGhvZCAibGlzdFByaXplQm94KGFwcGwscGF5LHVpbnQ2NCx1aW50NjQsdWludDY0LGFkZHJlc3MsdWludDY0LGFkZHJlc3MpdWludDY0IiwgbWV0aG9kICJnYXRlZFB1cmNoYXNlKHBheSxhcHBsLHVpbnQ2NCxhZGRyZXNzKXZvaWQiLCBtZXRob2QgInB1cmNoYXNlKHBheSx1aW50NjQsYWRkcmVzcyl2b2lkIiwgbWV0aG9kICJnYXRlZFB1cmNoYXNlQXNhKGF4ZmVyLGFwcGwsdWludDY0LGFkZHJlc3Mpdm9pZCIsIG1ldGhvZCAicHVyY2hhc2VBc2EoYXhmZXIsdWludDY0LGFkZHJlc3Mpdm9pZCIsIG1ldGhvZCAiZGVsaXN0KHVpbnQ2NCl2b2lkIgogICAgYnl0ZWMgMTUgLy8gbWV0aG9kICJpbml0Qm94ZWRDb250cmFjdChzdHJpbmcsdWludDY0KXZvaWQiCiAgICBwdXNoYnl0ZXNzIDB4ZGNhMmQ4NjIgMHhkMzQ2YjFhNCAweDM5NGVhZWIyIDB4MzNmNzg4MDggMHhhZTg0Y2JkOCAweDMzZTkyYzk0IDB4ODU0ZGVkZTAgLy8gbWV0aG9kICJsb2FkQm94ZWRDb250cmFjdCh1aW50NjQsYnl0ZVtdKXZvaWQiLCBtZXRob2QgImRlbGV0ZUJveGVkQ29udHJhY3QoKXZvaWQiLCBtZXRob2QgIm9wdEluKHBheSx1aW50NjQpdm9pZCIsIG1ldGhvZCAib3B0SW5Db3N0KHVpbnQ2NCl1aW50NjQiLCBtZXRob2QgInVwZGF0ZUFraXRhREFPRXNjcm93KChzdHJpbmcsdWludDY0KSl2b2lkIiwgbWV0aG9kICJ1cGRhdGVBa2l0YURBTyh1aW50NjQpdm9pZCIsIG1ldGhvZCAib3BVcCgpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIGxpc3QgbGlzdFByaXplQm94IGdhdGVkUHVyY2hhc2UgcHVyY2hhc2UgZ2F0ZWRQdXJjaGFzZUFzYSBwdXJjaGFzZUFzYSBkZWxpc3QgaW5pdEJveGVkQ29udHJhY3QgbG9hZEJveGVkQ29udHJhY3QgZGVsZXRlQm94ZWRDb250cmFjdCBvcHRJbiBvcHRJbkNvc3QgdXBkYXRlQWtpdGFEQU9Fc2Nyb3cgdXBkYXRlQWtpdGFEQU8gbWFpbl9vcFVwX3JvdXRlQDE5CiAgICBlcnIKCm1haW5fb3BVcF9yb3V0ZUAxOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQxCiAgICAvLyBvcFVwKCk6IHZvaWQgeyB9CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgptYWluX2NyZWF0ZV9Ob09wQDIxOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTgtMjQKICAgIC8vIEBjb250cmFjdCh7CiAgICAvLyAgIHN0YXRlVG90YWxzOiB7CiAgICAvLyAgICAgZ2xvYmFsQnl0ZXM6IEZhY3RvcnlHbG9iYWxTdGF0ZU1heEJ5dGVzLAogICAgLy8gICAgIGdsb2JhbFVpbnRzOiBGYWN0b3J5R2xvYmFsU3RhdGVNYXhVaW50cwogICAgLy8gICB9CiAgICAvLyB9KQogICAgLy8gZXhwb3J0IGNsYXNzIE1hcmtldHBsYWNlIGV4dGVuZHMgRmFjdG9yeUNvbnRyYWN0IHsKICAgIHB1c2hieXRlcyAweDgxMTUzNjI4IC8vIG1ldGhvZCAiY3JlYXRlKHN0cmluZyxzdHJpbmcsdWludDY0LChzdHJpbmcsdWludDY0KSl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggY3JlYXRlCiAgICBlcnIKCm1haW5fdXBkYXRlX3JvdXRlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0NgogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICB0eG4gT25Db21wbGV0aW9uCiAgICBwdXNoaW50IDQgLy8gVXBkYXRlQXBwbGljYXRpb24KICAgID09CiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgJiYKICAgIGFzc2VydAogICAgYiB1cGRhdGUKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpvcmlnaW5PclR4blNlbmRlcih3YWxsZXRJRDogdWludDY0KSAtPiBieXRlczoKb3JpZ2luT3JUeG5TZW5kZXI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE0OQogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIG9yaWdpbk9yVHhuU2VuZGVyKHdhbGxldElEOiBBcHBsaWNhdGlvbik6IEFjY291bnQgewogICAgcHJvdG8gMSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE1MAogICAgLy8gcmV0dXJuIG9yaWdpbk9yKHdhbGxldElELCBUeG4uc2VuZGVyKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNDMKICAgIC8vIGlmICh3YWxsZXRJRC5pZCA9PT0gMCkgewogICAgZnJhbWVfZGlnIC0xCiAgICBibnogb3JpZ2luT3JUeG5TZW5kZXJfYWZ0ZXJfaWZfZWxzZUAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE1MAogICAgLy8gcmV0dXJuIG9yaWdpbk9yKHdhbGxldElELCBUeG4uc2VuZGVyKQogICAgcmV0c3ViCgpvcmlnaW5PclR4blNlbmRlcl9hZnRlcl9pZl9lbHNlQDM6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTY1LTE2OAogICAgLy8gY29uc3QgW2NvbnRyb2xsZWRBY2NvdW50Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoCiAgICAvLyAgIHdhbGxldElELAogICAgLy8gICBCeXRlcyhBYnN0cmFjdEFjY291bnRHbG9iYWxTdGF0ZUtleXNDb250cm9sbGVkQWRkcmVzcykKICAgIC8vICkKICAgIGZyYW1lX2RpZyAtMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNjcKICAgIC8vIEJ5dGVzKEFic3RyYWN0QWNjb3VudEdsb2JhbFN0YXRlS2V5c0NvbnRyb2xsZWRBZGRyZXNzKQogICAgcHVzaGJ5dGVzICJjb250cm9sbGVkX2FkZHJlc3MiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE2NS0xNjgKICAgIC8vIGNvbnN0IFtjb250cm9sbGVkQWNjb3VudEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKAogICAgLy8gICB3YWxsZXRJRCwKICAgIC8vICAgQnl0ZXMoQWJzdHJhY3RBY2NvdW50R2xvYmFsU3RhdGVLZXlzQ29udHJvbGxlZEFkZHJlc3MpCiAgICAvLyApCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE1MAogICAgLy8gcmV0dXJuIG9yaWdpbk9yKHdhbGxldElELCBUeG4uc2VuZGVyKQogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6Z2V0V2FsbGV0SURVc2luZ0FraXRhREFPKGFraXRhREFPOiB1aW50NjQsIGFkZHJlc3M6IGJ5dGVzKSAtPiB1aW50NjQ6CmdldFdhbGxldElEVXNpbmdBa2l0YURBTzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTgwCiAgICAvLyBleHBvcnQgZnVuY3Rpb24gZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPKGFraXRhREFPOiBBcHBsaWNhdGlvbiwgYWRkcmVzczogQWNjb3VudCk6IEFwcGxpY2F0aW9uIHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1OQogICAgLy8gY29uc3QgW290aGVyQXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c090aGVyQXBwTGlzdCkpCiAgICBmcmFtZV9kaWcgLTIKICAgIHB1c2hieXRlcyAib2FsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NAogICAgLy8gcmV0dXJuIGdldE90aGVyQXBwTGlzdChha2l0YURBTykuZXNjcm93CiAgICBwdXNoaW50IDI0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxODYtMTg5CiAgICAvLyBjb25zdCBkYXRhID0gYWJpQ2FsbDx0eXBlb2YgRXNjcm93RmFjdG9yeS5wcm90b3R5cGUuZ2V0Pih7CiAgICAvLyAgIGFwcElkOiBlc2Nyb3dGYWN0b3J5LAogICAgLy8gICBhcmdzOiBbYWRkcmVzc10KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hieXRlcyAweDNjMWE2ZjMzIC8vIG1ldGhvZCAiZ2V0KGFkZHJlc3MpYnl0ZVtdIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGZyYW1lX2RpZyAtMQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGludGNfMiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIGRpZyAxCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWMgNSAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGJ5dGVzCiAgICBleHRyYWN0IDYgMAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE5MQogICAgLy8gaWYgKEJ5dGVzKGRhdGEpLmxlbmd0aCA9PT0gMCB8fCBCeXRlcyhkYXRhKS5sZW5ndGggIT09IDgpIHsKICAgIGxlbgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBieiBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU9faWZfYm9keUA2CiAgICBmcmFtZV9kaWcgMAogICAgcHVzaGludCA4CiAgICAhPQogICAgYnogZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPX2FmdGVyX2lmX2Vsc2VANwoKZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPX2lmX2JvZHlANjoKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxOTIKICAgIC8vIHJldHVybiAwCiAgICBpbnRjXzAgLy8gMAoKZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6Z2V0V2FsbGV0SURAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTgyCiAgICAvLyByZXR1cm4gQXBwbGljYXRpb24oZ2V0V2FsbGV0SUQoZXNjcm93RmFjdG9yeSwgYWRkcmVzcykpCiAgICBzd2FwCiAgICByZXRzdWIKCmdldFdhbGxldElEVXNpbmdBa2l0YURBT19hZnRlcl9pZl9lbHNlQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE5NQogICAgLy8gcmV0dXJuIGJ0b2koZGF0YSkKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTgyCiAgICAvLyByZXR1cm4gQXBwbGljYXRpb24oZ2V0V2FsbGV0SUQoZXNjcm93RmFjdG9yeSwgYWRkcmVzcykpCiAgICBiIGdldFdhbGxldElEVXNpbmdBa2l0YURBT19hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmdldFdhbGxldElEQDgKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpnYXRlQ2hlY2soZ2F0ZVR4bjogdWludDY0LCBha2l0YURBTzogdWludDY0LCBjYWxsZXI6IGJ5dGVzLCBpZDogdWludDY0KSAtPiB1aW50NjQ6CmdhdGVDaGVjazoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjQ3CiAgICAvLyBleHBvcnQgZnVuY3Rpb24gZ2F0ZUNoZWNrKGdhdGVUeG46IGd0eG4uQXBwbGljYXRpb25DYWxsVHhuLCBha2l0YURBTzogQXBwbGljYXRpb24sIGNhbGxlcjogQWNjb3VudCwgaWQ6IHVpbnQ2NCk6IGJvb2xlYW4gewogICAgcHJvdG8gNCAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI0OQogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgZnJhbWVfZGlnIC00CiAgICBndHhucyBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICBmcmFtZV9kaWcgLTMKICAgIGJ5dGVjIDkgLy8gImFhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjQ5CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICBwdXNoaW50IDQwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjQ5LTI1MAogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgYnogZ2F0ZUNoZWNrX2Jvb2xfZmFsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNTAKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIGZyYW1lX2RpZyAtNAogICAgZ3R4bnMgT25Db21wbGV0aW9uCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI0OS0yNTAKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIGJueiBnYXRlQ2hlY2tfYm9vbF9mYWxzZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI1MQogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICBmcmFtZV9kaWcgLTQKICAgIGd0eG5zIE51bUFwcEFyZ3MKICAgIHB1c2hpbnQgNAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjQ5LTI1MQogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICBieiBnYXRlQ2hlY2tfYm9vbF9mYWxzZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI1MgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgR2F0ZS5wcm90b3R5cGUubXVzdENoZWNrPigpICYmCiAgICBmcmFtZV9kaWcgLTQKICAgIGd0eG5zYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgcHVzaGJ5dGVzIDB4NDM5MjI2NTUgLy8gbWV0aG9kICJtdXN0Q2hlY2soYWRkcmVzcyx1aW50NjQsYnl0ZVtdW10pdm9pZCIKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI0OS0yNTIKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgR2F0ZS5wcm90b3R5cGUubXVzdENoZWNrPigpICYmCiAgICBieiBnYXRlQ2hlY2tfYm9vbF9mYWxzZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI1MwogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBuZXcgQWRkcmVzcyhjYWxsZXIpLmJ5dGVzICYmCiAgICBmcmFtZV9kaWcgLTQKICAgIGd0eG5zYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZnJhbWVfZGlnIC0yCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNDktMjUzCiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIEdhdGUucHJvdG90eXBlLm11c3RDaGVjaz4oKSAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBuZXcgQWRkcmVzcyhjYWxsZXIpLmJ5dGVzICYmCiAgICBieiBnYXRlQ2hlY2tfYm9vbF9mYWxzZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI1NAogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDIpID09PSBpdG9iKGlkKQogICAgZnJhbWVfZGlnIC00CiAgICBndHhuc2EgQXBwbGljYXRpb25BcmdzIDIKICAgIGZyYW1lX2RpZyAtMQogICAgaXRvYgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjQ5LTI1NAogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBHYXRlLnByb3RvdHlwZS5tdXN0Q2hlY2s+KCkgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygxKSA9PT0gbmV3IEFkZHJlc3MoY2FsbGVyKS5ieXRlcyAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDIpID09PSBpdG9iKGlkKQogICAgYnogZ2F0ZUNoZWNrX2Jvb2xfZmFsc2VANwogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjQ4LTI1NQogICAgLy8gcmV0dXJuICgKICAgIC8vICAgZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gICBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyAgIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgLy8gICBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBHYXRlLnByb3RvdHlwZS5tdXN0Q2hlY2s+KCkgJiYKICAgIC8vICAgZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBuZXcgQWRkcmVzcyhjYWxsZXIpLmJ5dGVzICYmCiAgICAvLyAgIGdhdGVUeG4uYXBwQXJncygyKSA9PT0gaXRvYihpZCkKICAgIC8vICkKICAgIHJldHN1YgoKZ2F0ZUNoZWNrX2Jvb2xfZmFsc2VANzoKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI0OC0yNTUKICAgIC8vIHJldHVybiAoCiAgICAvLyAgIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vICAgZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gICBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIC8vICAgZ2F0ZVR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgR2F0ZS5wcm90b3R5cGUubXVzdENoZWNrPigpICYmCiAgICAvLyAgIGdhdGVUeG4uYXBwQXJncygxKSA9PT0gbmV3IEFkZHJlc3MoY2FsbGVyKS5ieXRlcyAmJgogICAgLy8gICBnYXRlVHhuLmFwcEFyZ3MoMikgPT09IGl0b2IoaWQpCiAgICAvLyApCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpyZXdhcmRzT3B0SW5Db3N0KGFraXRhREFPOiB1aW50NjQsIGFzc2V0OiB1aW50NjQpIC0+IHVpbnQ2NDoKcmV3YXJkc09wdEluQ29zdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTI0CiAgICAvLyBleHBvcnQgZnVuY3Rpb24gcmV3YXJkc09wdEluQ29zdChha2l0YURBTzogQXBwbGljYXRpb24sIGFzc2V0OiB1aW50NjQpOiB1aW50NjQgewogICAgcHJvdG8gMiAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUyNQogICAgLy8gaWYgKGFzc2V0ICE9PSAwKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ6IHJld2FyZHNPcHRJbkNvc3RfYWZ0ZXJfaWZfZWxzZUA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICBmcmFtZV9kaWcgLTIKICAgIGJ5dGVjIDkgLy8gImFhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTI2CiAgICAvLyBjb25zdCByZXdhcmRzQXBwID0gZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5yZXdhcmRzCiAgICBwdXNoaW50IDgKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUyNwogICAgLy8gaWYgKCFBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLmlzT3B0ZWRJbihBc3NldChhc3NldCkpKSB7CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBmcmFtZV9kaWcgLTEKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBibnogcmV3YXJkc09wdEluQ29zdF9hZnRlcl9pZl9lbHNlQDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTI4CiAgICAvLyByZXR1cm4gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIHJldHN1YgoKcmV3YXJkc09wdEluQ29zdF9hZnRlcl9pZl9lbHNlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUzMQogICAgLy8gcmV0dXJuIDAKICAgIGludGNfMCAvLyAwCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpzcGxpdE9wdEluQ291bnQoYWtpdGFEQU86IHVpbnQ2NCwgZXNjcm93OiBieXRlcywgYXNzZXQ6IHVpbnQ2NCkgLT4gdWludDY0OgpzcGxpdE9wdEluQ291bnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYzNwogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIHNwbGl0T3B0SW5Db3VudChha2l0YURBTzogQXBwbGljYXRpb24sIGVzY3JvdzogQWNjb3VudCwgYXNzZXQ6IEFzc2V0KTogdWludDY0IHsKICAgIHByb3RvIDMgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MzgKICAgIC8vIGxldCBjb3VudDogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjQwCiAgICAvLyBpZiAoIWVzY3Jvdy5pc09wdGVkSW4oYXNzZXQpKSB7CiAgICBmcmFtZV9kaWcgLTIKICAgIGZyYW1lX2RpZyAtMQogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJueiBzcGxpdE9wdEluQ291bnRfYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwMwogICAgLy8gY29uc3QgW3NwbGl0c0J5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1JldmVudWVTcGxpdHMpKQogICAgZnJhbWVfZGlnIC0zCiAgICBwdXNoYnl0ZXMgInJldmVudWVfc3BsaXRzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NDQKICAgIC8vIGNvdW50ICs9IHNwbGl0cy5sZW5ndGgKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY0MQogICAgLy8gY291bnQgKz0gMQogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjQ0CiAgICAvLyBjb3VudCArPSBzcGxpdHMubGVuZ3RoCiAgICArCiAgICBmcmFtZV9idXJ5IDAKCnNwbGl0T3B0SW5Db3VudF9hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY0NwogICAgLy8gcmV0dXJuIGNvdW50CiAgICBmcmFtZV9kaWcgMAogICAgc3dhcAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6Ok1hcmtldHBsYWNlLmNyZWF0ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNyZWF0ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjMwCiAgICAvLyBAYWJpbWV0aG9kKHsgb25DcmVhdGU6ICdyZXF1aXJlJyB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIGRpZyAxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgcHVzaGludCAxMAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBhdCBpbmRleCAwIG9mICgobGVuK3V0ZjhbXSksdWludDY0KQogICAgZGlnIDIKICAgIHN3YXAKICAgIGRpZyAyCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAxMgogICAgKwogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkVzY3Jvd0NvbmZpZwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjUKICAgIC8vIHZlcnNpb24gPSBHbG9iYWxTdGF0ZTxzdHJpbmc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleVZlcnNpb24gfSkKICAgIGJ5dGVjIDE2IC8vICJ2ZXJzaW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzIKICAgIC8vIHRoaXMudmVyc2lvbi52YWx1ZSA9IHZlcnNpb24KICAgIHVuY292ZXIgNAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjM0CiAgICAvLyBjaGlsZENvbnRyYWN0VmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEJhc2VGYWN0b3J5R2xvYmFsU3RhdGVLZXlDaGlsZENvbnRyYWN0VmVyc2lvbiB9KQogICAgYnl0ZWMgMTAgLy8gImNoaWxkX2NvbnRyYWN0X3ZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozMwogICAgLy8gdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSA9IGNoaWxkVmVyc2lvbgogICAgdW5jb3ZlciAzCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozNAogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSA9IGFraXRhREFPCiAgICB1bmNvdmVyIDIKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4MgogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlY18yIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozNQogICAgLy8gdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSA9IGNsb25lKGFraXRhREFPRXNjcm93KQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjMwCiAgICAvLyBAYWJpbWV0aG9kKHsgb25DcmVhdGU6ICdyZXF1aXJlJyB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjpNYXJrZXRwbGFjZS5saXN0W3JvdXRpbmddKCkgLT4gdm9pZDoKbGlzdDoKICAgIGludGNfMCAvLyAwCiAgICBwdXNoYnl0ZXMgIiIKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDAtNTEKICAgIC8vIGxpc3QoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIHByaWNlOiB1aW50NjQsCiAgICAvLyAgIHBheW1lbnRBc3NldDogdWludDY0LCAvLyAwIHwgQXNzZXQKICAgIC8vICAgZXhwaXJhdGlvbjogdWludDY0LAogICAgLy8gICByZXNlcnZlZEZvcjogQWNjb3VudCwKICAgIC8vICAgZ2F0ZUlEOiB1aW50NjQsCiAgICAvLyAgIG1hcmtldHBsYWNlOiBBY2NvdW50LAogICAgLy8gICBuYW1lOiBzdHJpbmcsCiAgICAvLyAgIHByb29mOiBQcm9vZgogICAgLy8gKTogdWludDY0IHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzMgLy8gMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDQgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBjb3ZlciAzCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBjb3ZlciA0CiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgMwogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBjb3ZlciA0CiAgICBsZW4KICAgIHB1c2hpbnQgOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgY292ZXIgNAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDUKICAgIGR1cAogICAgY292ZXIgNAogICAgbGVuCiAgICBwdXNoaW50IDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA2CiAgICBkdXAKICAgIGNvdmVyIDQKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA3CiAgICBkdXAKICAgIGNvdmVyIDQKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgOAogICAgZHVwCiAgICBjb3ZlciA0CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBkdXAKICAgIGNvdmVyIDUKICAgIHB1c2hpbnQgMzIKICAgICoKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxieXRlc1szMl0+CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo1MwogICAgLy8gbG9nZ2VkQXNzZXJ0KHByaWNlID49IDQsIEVSUl9QUklDRV9UT09fTE9XKQogICAgcHVzaGludCA0CiAgICA+PQogICAgYm56IGxpc3RfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDE3IC8vICJFUlI6UFJMTyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpQUkxPCgpsaXN0X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MzgKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjU0CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5ib3hlZENvbnRyYWN0LmV4aXN0cywgRVJSX0NPTlRSQUNUX05PVF9TRVQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBsaXN0X2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyAxMyAvLyAiRVJSOkNOU1QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6Q05TVAoKbGlzdF9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjU3LTU5CiAgICAvLyBjb25zdCBvcHRpbk1CUjogdWludDY0ID0gaXNBbGdvUGF5bWVudAogICAgLy8gICA/IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gICA6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSAqIDIKICAgIGRpZyA5CiAgICBibnogbGlzdF90ZXJuYXJ5X2ZhbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjU4CiAgICAvLyA/IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBidXJ5IDEzCgpsaXN0X3Rlcm5hcnlfbWVyZ2VAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjY4CiAgICAvLyBsZXQgZGlzYnVyc2VtZW50TUJSOiB1aW50NjQgPSBkaXNidXJzZW1lbnRDb3N0KDEpICsgcmV3YXJkc09wdEluQ29zdCh0aGlzLmFraXRhREFPLnZhbHVlLCBhc3NldFhmZXIueGZlckFzc2V0LmlkKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NjgKICAgIC8vIGxldCBkaXNidXJzZW1lbnRNQlI6IHVpbnQ2NCA9IGRpc2J1cnNlbWVudENvc3QoMSkgKyByZXdhcmRzT3B0SW5Db3N0KHRoaXMuYWtpdGFEQU8udmFsdWUsIGFzc2V0WGZlci54ZmVyQXNzZXQuaWQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDEKICAgIGd0eG5zIFhmZXJBc3NldAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBjYWxsc3ViIHJld2FyZHNPcHRJbkNvc3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTE3CiAgICAvLyByZXR1cm4gKE1pbkRpc2J1cnNlbWVudHNNQlIgKyBVc2VyQWxsb2NhdGlvbk1CUikgKiBjb3VudAogICAgaW50YyA0IC8vIDY3MDAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo2OAogICAgLy8gbGV0IGRpc2J1cnNlbWVudE1CUjogdWludDY0ID0gZGlzYnVyc2VtZW50Q29zdCgxKSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgYXNzZXRYZmVyLnhmZXJBc3NldC5pZCkKICAgICsKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjY5CiAgICAvLyBpZiAoaXNBbGdvUGF5bWVudCkgewogICAgZGlnIDExCiAgICBibnogbGlzdF9lbHNlX2JvZHlAMTAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjcwCiAgICAvLyBkaXNidXJzZW1lbnRNQlIgKz0gZGlzYnVyc2VtZW50Q29zdCgxKQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MTcKICAgIC8vIHJldHVybiAoTWluRGlzYnVyc2VtZW50c01CUiArIFVzZXJBbGxvY2F0aW9uTUJSKSAqIGNvdW50CiAgICBpbnRjIDQgLy8gNjcwMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjcwCiAgICAvLyBkaXNidXJzZW1lbnRNQlIgKz0gZGlzYnVyc2VtZW50Q29zdCgxKQogICAgKwogICAgc3dhcAoKbGlzdF9hZnRlcl9pZl9lbHNlQDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NzYtNzgKICAgIC8vIGNvbnN0IGVzY3Jvd09wdEluQ29zdDogdWludDY0ID0gaXNBbGdvUGF5bWVudAogICAgLy8gICA/IDAKICAgIC8vICAgOiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiBzcGxpdE9wdEluQ291bnQodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywgQXNzZXQocGF5bWVudEFzc2V0KSkKICAgIGRpZyAxMQogICAgYm56IGxpc3RfdGVybmFyeV9mYWxzZUAxMwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NzcKICAgIC8vID8gMAogICAgaW50Y18wIC8vIDAKCmxpc3RfdGVybmFyeV9tZXJnZUAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjgwCiAgICAvLyBjb25zdCBjaGlsZEFwcE1CUjogdWludDY0ID0gR2xvYmFsLm1pbkJhbGFuY2UgKyBvcHRpbk1CUiArIGRpc2J1cnNlbWVudE1CUiArIGVzY3Jvd09wdEluQ29zdAogICAgZ2xvYmFsIE1pbkJhbGFuY2UKICAgIGRpZyAxNgogICAgKwogICAgZGlnIDMKICAgICsKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjgyLTg0CiAgICAvLyBNSU5fUFJPR1JBTV9QQUdFUyAqICgxICsgbGlzdGluZy5leHRyYVByb2dyYW1QYWdlcykgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfVUlOVF9DT1NUICogbGlzdGluZy5nbG9iYWxVaW50cykgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfQllURVNfQ09TVCAqIGxpc3RpbmcuZ2xvYmFsQnl0ZXMpICsKICAgIGludGMgNSAvLyA3NTY1MDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjgyLTg1CiAgICAvLyBNSU5fUFJPR1JBTV9QQUdFUyAqICgxICsgbGlzdGluZy5leHRyYVByb2dyYW1QYWdlcykgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfVUlOVF9DT1NUICogbGlzdGluZy5nbG9iYWxVaW50cykgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfQllURVNfQ09TVCAqIGxpc3RpbmcuZ2xvYmFsQnl0ZXMpICsKICAgIC8vIGNoaWxkQXBwTUJSCiAgICArCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo4OQogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfSU5WQUxJRF9QQVlNRU5UKQogICAgZGlnIDQKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBsaXN0X2FmdGVyX2Fzc2VydEAxNgogICAgYnl0ZWNfMyAvLyAiRVJSOklQQVkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBBWQoKbGlzdF9hZnRlcl9hc3NlcnRAMTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo5MAogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSB0b3RhbE1CUiwgRVJSX0lOVkFMSURfUEFZTUVOVCkKICAgIGRpZyA0CiAgICBndHhucyBBbW91bnQKICAgIGRpZyAyCiAgICA9PQogICAgYm56IGxpc3RfYWZ0ZXJfYXNzZXJ0QDE4CiAgICBieXRlY18zIC8vICJFUlI6SVBBWSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUEFZCgpsaXN0X2FmdGVyX2Fzc2VydEAxODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjkzCiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLnNlbmRlciA9PT0gVHhuLnNlbmRlciwgRVJSX0lOVkFMSURfUEFZTUVOVCkKICAgIGRpZyAzCiAgICBndHhucyBTZW5kZXIKICAgIHR4biBTZW5kZXIKICAgID09CiAgICBibnogbGlzdF9hZnRlcl9hc3NlcnRAMjAKICAgIGJ5dGVjXzMgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCmxpc3RfYWZ0ZXJfYXNzZXJ0QDIwOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6OTQKICAgIC8vIGxvZ2dlZEFzc2VydChhc3NldFhmZXIuYXNzZXRSZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIEVSUl9JTlZBTElEX1BBWU1FTlQpCiAgICBkaWcgMwogICAgZ3R4bnMgQXNzZXRSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogbGlzdF9hZnRlcl9hc3NlcnRAMjIKICAgIGJ5dGVjXzMgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCmxpc3RfYWZ0ZXJfYXNzZXJ0QDIyOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6OTUKICAgIC8vIGxvZ2dlZEFzc2VydChhc3NldFhmZXIuYXNzZXRBbW91bnQgPiAwLCBFUlJfSU5WQUxJRF9QQVlNRU5UKQogICAgdW5jb3ZlciAzCiAgICBndHhucyBBc3NldEFtb3VudAogICAgZHVwCiAgICBjb3ZlciA1CiAgICBibnogbGlzdF9hZnRlcl9hc3NlcnRAMjQKICAgIGJ5dGVjXzMgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCmxpc3RfYWZ0ZXJfYXNzZXJ0QDI0OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6OTcKICAgIC8vIGNvbnN0IGNyZWF0b3JSb3lhbHR5ID0gcm95YWx0aWVzKHRoaXMuYWtpdGFEQU8udmFsdWUsIGFzc2V0WGZlci54ZmVyQXNzZXQsIG5hbWUsIHByb29mKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6OTcKICAgIC8vIGNvbnN0IGNyZWF0b3JSb3lhbHR5ID0gcm95YWx0aWVzKHRoaXMuYWtpdGFEQU8udmFsdWUsIGFzc2V0WGZlci54ZmVyQXNzZXQsIG5hbWUsIHByb29mKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGNvdmVyIDIKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDM0CiAgICAvLyBsZXQgY3JlYXRvclJveWFsdHk6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBidXJ5IDE4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQzNgogICAgLy8gaWYgKCEocHJvb2YubGVuZ3RoID4gMCkpIHsKICAgIGRpZyA2CiAgICBibnogbGlzdF9hZnRlcl9pZl9lbHNlQDM4CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDM3CiAgICAvLyByZXR1cm4gQ3JlYXRvclJveWFsdHlEZWZhdWx0CiAgICBwdXNoaW50IDUwMDAKICAgIGJ1cnkgMTcKCmxpc3RfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpyb3lhbHRpZXNANDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czozOAogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTAwCiAgICAvLyBjb25zdCBhcHByb3ZhbFByb2dyYW0gPSB0aGlzLmJveGVkQ29udHJhY3QuZXh0cmFjdCgwLCB0aGlzLmJveGVkQ29udHJhY3QubGVuZ3RoKQogICAgYm94X2xlbgogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjM4CiAgICAvLyBib3hlZENvbnRyYWN0ID0gQm94PGJ5dGVzPih7IGtleTogQm94S2V5Qm94ZWRDb250cmFjdCB9KQogICAgYnl0ZWNfMSAvLyAiYmMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxMDAKICAgIC8vIGNvbnN0IGFwcHJvdmFsUHJvZ3JhbSA9IHRoaXMuYm94ZWRDb250cmFjdC5leHRyYWN0KDAsIHRoaXMuYm94ZWRDb250cmFjdC5sZW5ndGgpCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBib3hfZXh0cmFjdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTAzLTEyMwogICAgLy8gY29uc3QgbGlzdGluZ0FwcCA9IGxpc3RpbmcuY2FsbAogICAgLy8gICAuY3JlYXRlKHsKICAgIC8vICAgICBhcmdzOiBbCiAgICAvLyAgICAgICBhc3NldFhmZXIueGZlckFzc2V0LmlkLAogICAgLy8gICAgICAgZmFsc2UsCiAgICAvLyAgICAgICBwcmljZSwKICAgIC8vICAgICAgIHBheW1lbnRBc3NldCwKICAgIC8vICAgICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgICAgeyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiB0b3RhbE1CUiB9LAogICAgLy8gICAgICAgcmVzZXJ2ZWRGb3IsCiAgICAvLyAgICAgICBjcmVhdG9yUm95YWx0eSwKICAgIC8vICAgICAgIGdhdGVJRCwKICAgIC8vICAgICAgIG1hcmtldHBsYWNlLAogICAgLy8gICAgICAgdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSwKICAgIC8vICAgICAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgICAgICB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLAogICAgLy8gICAgIF0sCiAgICAvLyAgICAgYXBwcm92YWxQcm9ncmFtOiBbYXBwcm92YWxQcm9ncmFtXSwKICAgIC8vICAgICBjbGVhclN0YXRlUHJvZ3JhbTogbGlzdGluZy5jbGVhclN0YXRlUHJvZ3JhbSwKICAgIC8vICAgfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjEwNgogICAgLy8gYXNzZXRYZmVyLnhmZXJBc3NldC5pZCwKICAgIGRpZyAxCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxMTEKICAgIC8vIFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxMTIKICAgIC8vIHsgYWNjb3VudDogcGF5bWVudC5zZW5kZXIsIGFtb3VudDogdG90YWxNQlIgfSwKICAgIHVuY292ZXIgNgogICAgZ3R4bnMgU2VuZGVyCiAgICB1bmNvdmVyIDUKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTE0CiAgICAvLyBjcmVhdG9yUm95YWx0eSwKICAgIGRpZyAxOAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTE3CiAgICAvLyB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjM0CiAgICAvLyBjaGlsZENvbnRyYWN0VmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEJhc2VGYWN0b3J5R2xvYmFsU3RhdGVLZXlDaGlsZENvbnRyYWN0VmVyc2lvbiB9KQogICAgYnl0ZWMgMTAgLy8gImNoaWxkX2NvbnRyYWN0X3ZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxMTcKICAgIC8vIHRoaXMuY2hpbGRDb250cmFjdFZlcnNpb24udmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjExOAogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjExOAogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxMTkKICAgIC8vIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODIKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWNfMiAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTE5CiAgICAvLyB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjYxCiAgICAvLyBjb25zdCBsaXN0aW5nID0gY29tcGlsZUFyYzQoTGlzdGluZykKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIEV4dHJhUHJvZ3JhbVBhZ2VzCiAgICBpbnRjXzIgLy8gNgogICAgaXR4bl9maWVsZCBHbG9iYWxOdW1CeXRlU2xpY2UKICAgIHB1c2hpbnQgOQogICAgaXR4bl9maWVsZCBHbG9iYWxOdW1VaW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxMDMtMTIzCiAgICAvLyBjb25zdCBsaXN0aW5nQXBwID0gbGlzdGluZy5jYWxsCiAgICAvLyAgIC5jcmVhdGUoewogICAgLy8gICAgIGFyZ3M6IFsKICAgIC8vICAgICAgIGFzc2V0WGZlci54ZmVyQXNzZXQuaWQsCiAgICAvLyAgICAgICBmYWxzZSwKICAgIC8vICAgICAgIHByaWNlLAogICAgLy8gICAgICAgcGF5bWVudEFzc2V0LAogICAgLy8gICAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgICB7IGFjY291bnQ6IHBheW1lbnQuc2VuZGVyLCBhbW91bnQ6IHRvdGFsTUJSIH0sCiAgICAvLyAgICAgICByZXNlcnZlZEZvciwKICAgIC8vICAgICAgIGNyZWF0b3JSb3lhbHR5LAogICAgLy8gICAgICAgZ2F0ZUlELAogICAgLy8gICAgICAgbWFya2V0cGxhY2UsCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlLAogICAgLy8gICAgICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgICAgIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUsCiAgICAvLyAgICAgXSwKICAgIC8vICAgICBhcHByb3ZhbFByb2dyYW06IFthcHByb3ZhbFByb2dyYW1dLAogICAgLy8gICAgIGNsZWFyU3RhdGVQcm9ncmFtOiBsaXN0aW5nLmNsZWFyU3RhdGVQcm9ncmFtLAogICAgLy8gICB9KQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgT25Db21wbGV0aW9uCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo2MQogICAgLy8gY29uc3QgbGlzdGluZyA9IGNvbXBpbGVBcmM0KExpc3RpbmcpCiAgICBieXRlYyAxOCAvLyBiYXNlNjQoQzRFQlF3PT0pCiAgICBpdHhuX2ZpZWxkIENsZWFyU3RhdGVQcm9ncmFtUGFnZXMKICAgIHVuY292ZXIgNwogICAgaXR4bl9maWVsZCBBcHByb3ZhbFByb2dyYW1QYWdlcwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTAzLTEyMwogICAgLy8gY29uc3QgbGlzdGluZ0FwcCA9IGxpc3RpbmcuY2FsbAogICAgLy8gICAuY3JlYXRlKHsKICAgIC8vICAgICBhcmdzOiBbCiAgICAvLyAgICAgICBhc3NldFhmZXIueGZlckFzc2V0LmlkLAogICAgLy8gICAgICAgZmFsc2UsCiAgICAvLyAgICAgICBwcmljZSwKICAgIC8vICAgICAgIHBheW1lbnRBc3NldCwKICAgIC8vICAgICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgICAgeyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiB0b3RhbE1CUiB9LAogICAgLy8gICAgICAgcmVzZXJ2ZWRGb3IsCiAgICAvLyAgICAgICBjcmVhdG9yUm95YWx0eSwKICAgIC8vICAgICAgIGdhdGVJRCwKICAgIC8vICAgICAgIG1hcmtldHBsYWNlLAogICAgLy8gICAgICAgdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSwKICAgIC8vICAgICAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgICAgICB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLAogICAgLy8gICAgIF0sCiAgICAvLyAgICAgYXBwcm92YWxQcm9ncmFtOiBbYXBwcm92YWxQcm9ncmFtXSwKICAgIC8vICAgICBjbGVhclN0YXRlUHJvZ3JhbTogbGlzdGluZy5jbGVhclN0YXRlUHJvZ3JhbSwKICAgIC8vICAgfSkKICAgIGJ5dGVjIDE5IC8vIG1ldGhvZCAiY3JlYXRlKHVpbnQ2NCxib29sLHVpbnQ2NCx1aW50NjQsdWludDY0LGFkZHJlc3MsKGFkZHJlc3MsdWludDY0KSxhZGRyZXNzLHVpbnQ2NCx1aW50NjQsYWRkcmVzcyxzdHJpbmcsdWludDY0LChzdHJpbmcsdWludDY0KSl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyA2CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTA3CiAgICAvLyBmYWxzZSwKICAgIHB1c2hieXRlcyAweDAwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZGlnIDE5CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZGlnIDE4CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZGlnIDE2CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciA1CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciA0CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZGlnIDEzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZGlnIDExCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZGlnIDEwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxMDMtMTIzCiAgICAvLyBjb25zdCBsaXN0aW5nQXBwID0gbGlzdGluZy5jYWxsCiAgICAvLyAgIC5jcmVhdGUoewogICAgLy8gICAgIGFyZ3M6IFsKICAgIC8vICAgICAgIGFzc2V0WGZlci54ZmVyQXNzZXQuaWQsCiAgICAvLyAgICAgICBmYWxzZSwKICAgIC8vICAgICAgIHByaWNlLAogICAgLy8gICAgICAgcGF5bWVudEFzc2V0LAogICAgLy8gICAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgICB7IGFjY291bnQ6IHBheW1lbnQuc2VuZGVyLCBhbW91bnQ6IHRvdGFsTUJSIH0sCiAgICAvLyAgICAgICByZXNlcnZlZEZvciwKICAgIC8vICAgICAgIGNyZWF0b3JSb3lhbHR5LAogICAgLy8gICAgICAgZ2F0ZUlELAogICAgLy8gICAgICAgbWFya2V0cGxhY2UsCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlLAogICAgLy8gICAgICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgICAgIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUsCiAgICAvLyAgICAgXSwKICAgIC8vICAgICBhcHByb3ZhbFByb2dyYW06IFthcHByb3ZhbFByb2dyYW1dLAogICAgLy8gICAgIGNsZWFyU3RhdGVQcm9ncmFtOiBsaXN0aW5nLmNsZWFyU3RhdGVQcm9ncmFtLAogICAgLy8gICB9KQogICAgaW50Y18yIC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjEwMy0xMjUKICAgIC8vIGNvbnN0IGxpc3RpbmdBcHAgPSBsaXN0aW5nLmNhbGwKICAgIC8vICAgLmNyZWF0ZSh7CiAgICAvLyAgICAgYXJnczogWwogICAgLy8gICAgICAgYXNzZXRYZmVyLnhmZXJBc3NldC5pZCwKICAgIC8vICAgICAgIGZhbHNlLAogICAgLy8gICAgICAgcHJpY2UsCiAgICAvLyAgICAgICBwYXltZW50QXNzZXQsCiAgICAvLyAgICAgICBleHBpcmF0aW9uLAogICAgLy8gICAgICAgVHhuLnNlbmRlciwKICAgIC8vICAgICAgIHsgYWNjb3VudDogcGF5bWVudC5zZW5kZXIsIGFtb3VudDogdG90YWxNQlIgfSwKICAgIC8vICAgICAgIHJlc2VydmVkRm9yLAogICAgLy8gICAgICAgY3JlYXRvclJveWFsdHksCiAgICAvLyAgICAgICBnYXRlSUQsCiAgICAvLyAgICAgICBtYXJrZXRwbGFjZSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRDb250cmFjdFZlcnNpb24udmFsdWUsCiAgICAvLyAgICAgICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICAgICAgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSwKICAgIC8vICAgICBdLAogICAgLy8gICAgIGFwcHJvdmFsUHJvZ3JhbTogW2FwcHJvdmFsUHJvZ3JhbV0sCiAgICAvLyAgICAgY2xlYXJTdGF0ZVByb2dyYW06IGxpc3RpbmcuY2xlYXJTdGF0ZVByb2dyYW0sCiAgICAvLyAgIH0pCiAgICAvLyAgIC5pdHhuCiAgICAvLyAgIC5jcmVhdGVkQXBwCiAgICBnaXR4biAwIENyZWF0ZWRBcHBsaWNhdGlvbklECiAgICBkdXAKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjEyOC0xMzMKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBsaXN0aW5nQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBHbG9iYWwubWluQmFsYW5jZSArIGRpc2J1cnNlbWVudE1CUgogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjEzMAogICAgLy8gcmVjZWl2ZXI6IGxpc3RpbmdBcHAuYWRkcmVzcywKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTMxCiAgICAvLyBhbW91bnQ6IEdsb2JhbC5taW5CYWxhbmNlICsgZGlzYnVyc2VtZW50TUJSCiAgICBnbG9iYWwgTWluQmFsYW5jZQogICAgdW5jb3ZlciA2CiAgICArCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTI4LTEzMgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IGxpc3RpbmdBcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IEdsb2JhbC5taW5CYWxhbmNlICsgZGlzYnVyc2VtZW50TUJSCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxMjgtMTMzCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogbGlzdGluZ0FwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogR2xvYmFsLm1pbkJhbGFuY2UgKyBkaXNidXJzZW1lbnRNQlIKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTM2LTE0NQogICAgLy8gbGlzdGluZy5jYWxsLm9wdGluKHsKICAgIC8vICAgYXBwSWQ6IGxpc3RpbmdBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGxpc3RpbmdBcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlLAogICAgLy8gICAgIH0pLAogICAgLy8gICAgIGFzc2V0WGZlci54ZmVyQXNzZXQuaWQsCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTQwCiAgICAvLyByZWNlaXZlcjogbGlzdGluZ0FwcC5hZGRyZXNzLAogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxNDEKICAgIC8vIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlLAogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTM5LTE0MgogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IGxpc3RpbmdBcHAuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UsCiAgICAvLyB9KSwKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjEzNi0xNDUKICAgIC8vIGxpc3RpbmcuY2FsbC5vcHRpbih7CiAgICAvLyAgIGFwcElkOiBsaXN0aW5nQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBsaXN0aW5nQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSwKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBhc3NldFhmZXIueGZlckFzc2V0LmlkLAogICAgLy8gICBdLAogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgT25Db21wbGV0aW9uCiAgICBkdXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgYnl0ZWMgMTQgLy8gbWV0aG9kICJvcHRpbihwYXksdWludDY0KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGludGNfMiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxNDgtMTU0CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBsaXN0aW5nQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFzc2V0WGZlci5hc3NldEFtb3VudCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0WGZlci54ZmVyQXNzZXQsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTUwCiAgICAvLyBhc3NldFJlY2VpdmVyOiBsaXN0aW5nQXBwLmFkZHJlc3MsCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjE0OC0xNTMKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IGxpc3RpbmdBcHAuYWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogYXNzZXRYZmVyLmFzc2V0QW1vdW50LAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXRYZmVyLnhmZXJBc3NldCwKICAgIC8vICAgfSkKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxNDgtMTU0CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBsaXN0aW5nQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFzc2V0WGZlci5hc3NldEFtb3VudCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0WGZlci54ZmVyQXNzZXQsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjE1NgogICAgLy8gaWYgKCFpc0FsZ29QYXltZW50KSB7CiAgICBkaWcgOAogICAgYnogbGlzdF9hZnRlcl9pZl9lbHNlQDM1CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxNTgtMTY3CiAgICAvLyBsaXN0aW5nLmNhbGwub3B0aW4oewogICAgLy8gICBhcHBJZDogbGlzdGluZ0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogbGlzdGluZ0FwcC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBvcHRpbk1CUiwKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBwYXltZW50QXNzZXQsCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTYyCiAgICAvLyByZWNlaXZlcjogbGlzdGluZ0FwcC5hZGRyZXNzLAogICAgZHVwbiAyCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBkaWcgMTMKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxNjEtMTY0CiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogbGlzdGluZ0FwcC5hZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IG9wdGluTUJSLAogICAgLy8gfSksCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxNTgtMTY3CiAgICAvLyBsaXN0aW5nLmNhbGwub3B0aW4oewogICAgLy8gICBhcHBJZDogbGlzdGluZ0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogbGlzdGluZ0FwcC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBvcHRpbk1CUiwKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBwYXltZW50QXNzZXQsCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBPbkNvbXBsZXRpb24KICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgYnl0ZWMgMTQgLy8gbWV0aG9kICJvcHRpbihwYXksdWludDY0KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZGlnIDkKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpbnRjXzIgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTcwCiAgICAvLyBpZiAoIXRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MuaXNPcHRlZEluKEFzc2V0KHBheW1lbnRBc3NldCkpKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODIKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWNfMiAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTcwCiAgICAvLyBpZiAoIXRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MuaXNPcHRlZEluKEFzc2V0KHBheW1lbnRBc3NldCkpKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18zIC8vIDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBkaWcgOQogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJueiBsaXN0X2FmdGVyX2lmX2Vsc2VAMzUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjE3MQogICAgLy8gdGhpcy5vcHRBa2l0YUVzY3Jvd0luQW5kU2VuZChBc3NldChwYXltZW50QXNzZXQpLCAwKQogICAgZGlnIDgKICAgIGludGNfMCAvLyAwCiAgICBjYWxsc3ViIG9wdEFraXRhRXNjcm93SW5BbmRTZW5kCiAgICBwb3AKCmxpc3RfYWZ0ZXJfaWZfZWxzZUAzNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQwLTUxCiAgICAvLyBsaXN0KAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICBwcmljZTogdWludDY0LAogICAgLy8gICBwYXltZW50QXNzZXQ6IHVpbnQ2NCwgLy8gMCB8IEFzc2V0CiAgICAvLyAgIGV4cGlyYXRpb246IHVpbnQ2NCwKICAgIC8vICAgcmVzZXJ2ZWRGb3I6IEFjY291bnQsCiAgICAvLyAgIGdhdGVJRDogdWludDY0LAogICAgLy8gICBtYXJrZXRwbGFjZTogQWNjb3VudCwKICAgIC8vICAgbmFtZTogc3RyaW5nLAogICAgLy8gICBwcm9vZjogUHJvb2YKICAgIC8vICk6IHVpbnQ2NCB7CiAgICBpdG9iCiAgICBieXRlYyA1IC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpsaXN0X2FmdGVyX2lmX2Vsc2VAMzg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0MS00NTEKICAgIC8vIGNvbnN0IGNyZWF0b3JSb3lhbHR5U3RyaW5nID0gYWJpQ2FsbDx0eXBlb2YgTWV0YU1lcmtsZXMucHJvdG90eXBlLnZlcmlmaWVkUmVhZD4oewogICAgLy8gICBhcHBJZDogZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5tZXRhTWVya2xlcywKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGFzc2V0LmNyZWF0b3IsCiAgICAvLyAgICAgbmFtZSwKICAgIC8vICAgICBzaGEyNTYoc2hhMjU2KGl0b2IoYXNzZXQuaWQpKSksCiAgICAvLyAgICAgcHJvb2YsCiAgICAvLyAgICAgMSwKICAgIC8vICAgICAncm95YWx0eScsCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0NAogICAgLy8gYXNzZXQuY3JlYXRvciwKICAgIGR1cG4gMgogICAgYXNzZXRfcGFyYW1zX2dldCBBc3NldENyZWF0b3IKICAgIGFzc2VydCAvLyBhc3NldCBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQ2CiAgICAvLyBzaGEyNTYoc2hhMjU2KGl0b2IoYXNzZXQuaWQpKSksCiAgICBzd2FwCiAgICBpdG9iCiAgICBzaGEyNTYKICAgIHNoYTI1NgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NDgKICAgIC8vIDEsCiAgICBpbnRjXzEgLy8gMQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NAogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgdW5jb3ZlciA0CiAgICBieXRlYyA5IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0MgogICAgLy8gYXBwSWQ6IGdldEFraXRhQXBwTGlzdChha2l0YURBTykubWV0YU1lcmtsZXMsCiAgICBwdXNoaW50IDcyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0MS00NTEKICAgIC8vIGNvbnN0IGNyZWF0b3JSb3lhbHR5U3RyaW5nID0gYWJpQ2FsbDx0eXBlb2YgTWV0YU1lcmtsZXMucHJvdG90eXBlLnZlcmlmaWVkUmVhZD4oewogICAgLy8gICBhcHBJZDogZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5tZXRhTWVya2xlcywKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGFzc2V0LmNyZWF0b3IsCiAgICAvLyAgICAgbmFtZSwKICAgIC8vICAgICBzaGEyNTYoc2hhMjU2KGl0b2IoYXNzZXQuaWQpKSksCiAgICAvLyAgICAgcHJvb2YsCiAgICAvLyAgICAgMSwKICAgIC8vICAgICAncm95YWx0eScsCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBwdXNoYnl0ZXMgMHgwY2YxYjljZiAvLyBtZXRob2QgInZlcmlmaWVkUmVhZChhZGRyZXNzLHN0cmluZyxieXRlWzMyXSxieXRlWzMyXVtdLHVpbnQ2NCxzdHJpbmcpc3RyaW5nIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyA5CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyA3CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQ5CiAgICAvLyAncm95YWx0eScsCiAgICBwdXNoYnl0ZXMgMHgwMDA3NzI2Zjc5NjE2Yzc0NzkKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0MS00NTEKICAgIC8vIGNvbnN0IGNyZWF0b3JSb3lhbHR5U3RyaW5nID0gYWJpQ2FsbDx0eXBlb2YgTWV0YU1lcmtsZXMucHJvdG90eXBlLnZlcmlmaWVkUmVhZD4oewogICAgLy8gICBhcHBJZDogZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5tZXRhTWVya2xlcywKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGFzc2V0LmNyZWF0b3IsCiAgICAvLyAgICAgbmFtZSwKICAgIC8vICAgICBzaGEyNTYoc2hhMjU2KGl0b2IoYXNzZXQuaWQpKSksCiAgICAvLyAgICAgcHJvb2YsCiAgICAvLyAgICAgMSwKICAgIC8vICAgICAncm95YWx0eScsCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpbnRjXzIgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBkaWcgMQogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjIDUgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzdHJpbmcKICAgIGV4dHJhY3QgNiAwCiAgICBkdXAKICAgIGJ1cnkgMTkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDUzCiAgICAvLyBpZiAoQnl0ZXMoY3JlYXRvclJveWFsdHlTdHJpbmcpLmxlbmd0aCA+IDApIHsKICAgIGxlbgogICAgYnogbGlzdF9hZnRlcl9pZl9lbHNlQDQwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ1NAogICAgLy8gY3JlYXRvclJveWFsdHkgPSBidG9pKEJ5dGVzKGNyZWF0b3JSb3lhbHR5U3RyaW5nKSkKICAgIGRpZyAxNwogICAgYnRvaQogICAgYnVyeSAxNwoKbGlzdF9hZnRlcl9pZl9lbHNlQDQwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NTcKICAgIC8vIGlmIChjcmVhdG9yUm95YWx0eSA+IENyZWF0b3JSb3lhbHR5TWF4aW11bVNpbmdsZSkgewogICAgZGlnIDE2CiAgICBpbnRjIDYgLy8gNTAwMDAKICAgID4KICAgIGJ6IGxpc3RfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpyb3lhbHRpZXNANDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDU4CiAgICAvLyByZXR1cm4gQ3JlYXRvclJveWFsdHlNYXhpbXVtU2luZ2xlCiAgICBpbnRjIDYgLy8gNTAwMDAKICAgIGJ1cnkgMTcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjk3CiAgICAvLyBjb25zdCBjcmVhdG9yUm95YWx0eSA9IHJveWFsdGllcyh0aGlzLmFraXRhREFPLnZhbHVlLCBhc3NldFhmZXIueGZlckFzc2V0LCBuYW1lLCBwcm9vZikKICAgIGIgbGlzdF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnJveWFsdGllc0A0MwoKbGlzdF90ZXJuYXJ5X2ZhbHNlQDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NzgKICAgIC8vIDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsIEFzc2V0KHBheW1lbnRBc3NldCkpCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjc4CiAgICAvLyA6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSAqIHNwbGl0T3B0SW5Db3VudCh0aGlzLmFraXRhREFPLnZhbHVlLCB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLCBBc3NldChwYXltZW50QXNzZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4MgogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlY18yIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo3OAogICAgLy8gOiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiBzcGxpdE9wdEluQ291bnQodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywgQXNzZXQocGF5bWVudEFzc2V0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzMgLy8gMgogICAgZXh0cmFjdF91aW50NjQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGRpZyAxNAogICAgY2FsbHN1YiBzcGxpdE9wdEluQ291bnQKICAgICoKICAgIGIgbGlzdF90ZXJuYXJ5X21lcmdlQDE0CgpsaXN0X2Vsc2VfYm9keUAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjcyCiAgICAvLyBkaXNidXJzZW1lbnRNQlIgKz0gZGlzYnVyc2VtZW50Q29zdCg1KSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgcGF5bWVudEFzc2V0KQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NzIKICAgIC8vIGRpc2J1cnNlbWVudE1CUiArPSBkaXNidXJzZW1lbnRDb3N0KDUpICsgcmV3YXJkc09wdEluQ29zdCh0aGlzLmFraXRhREFPLnZhbHVlLCBwYXltZW50QXNzZXQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDEyCiAgICBjYWxsc3ViIHJld2FyZHNPcHRJbkNvc3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTE3CiAgICAvLyByZXR1cm4gKE1pbkRpc2J1cnNlbWVudHNNQlIgKyBVc2VyQWxsb2NhdGlvbk1CUikgKiBjb3VudAogICAgcHVzaGludCAzMzUwMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjcyCiAgICAvLyBkaXNidXJzZW1lbnRNQlIgKz0gZGlzYnVyc2VtZW50Q29zdCg1KSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgcGF5bWVudEFzc2V0KQogICAgKwogICAgdW5jb3ZlciAyCiAgICArCiAgICBzd2FwCiAgICBiIGxpc3RfYWZ0ZXJfaWZfZWxzZUAxMQoKbGlzdF90ZXJuYXJ5X2ZhbHNlQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo1OQogICAgLy8gOiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiAyCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGludGNfMyAvLyAyCiAgICAqCiAgICBidXJ5IDEzCiAgICBiIGxpc3RfdGVybmFyeV9tZXJnZUA4CgoKLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6Ok1hcmtldHBsYWNlLmxpc3RQcml6ZUJveFtyb3V0aW5nXSgpIC0+IHZvaWQ6Cmxpc3RQcml6ZUJveDoKICAgIHB1c2hieXRlcyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTc4LTE4NwogICAgLy8gbGlzdFByaXplQm94KAogICAgLy8gICBwcml6ZUJveFRyYW5zZmVyVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBwcmljZTogdWludDY0LAogICAgLy8gICBwYXltZW50QXNzZXQ6IHVpbnQ2NCwKICAgIC8vICAgZXhwaXJhdGlvbjogdWludDY0LAogICAgLy8gICByZXNlcnZlZEZvcjogQWNjb3VudCwKICAgIC8vICAgZ2F0ZUlEOiB1aW50NjQsCiAgICAvLyAgIG1hcmtldHBsYWNlOiBBY2NvdW50LAogICAgLy8gKTogdWludDY0IHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzMgLy8gMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18yIC8vIGFwcGwKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBhcHBsCiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgY292ZXIgMgogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgY292ZXIgMwogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgY292ZXIgNQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDQKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgY292ZXIgNAogICAgbGVuCiAgICBwdXNoaW50IDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGNvdmVyIDQKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA1CiAgICBkdXAKICAgIGNvdmVyIDQKICAgIGxlbgogICAgcHVzaGludCA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNgogICAgZHVwCiAgICBjb3ZlciA0CiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTg4CiAgICAvLyBsb2dnZWRBc3NlcnQocHJpY2UgPj0gNCwgRVJSX1BSSUNFX1RPT19MT1cpCiAgICBwdXNoaW50IDQKICAgID49CiAgICBibnogbGlzdFByaXplQm94X2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAxNyAvLyAiRVJSOlBSTE8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6UFJMTwoKbGlzdFByaXplQm94X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MzgKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjE4OQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYm94ZWRDb250cmFjdC5leGlzdHMsIEVSUl9DT05UUkFDVF9OT1RfU0VUKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogbGlzdFByaXplQm94X2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyAxMyAvLyAiRVJSOkNOU1QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6Q05TVAoKbGlzdFByaXplQm94X2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTkyCiAgICAvLyBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBQcml6ZUJveC5wcm90b3R5cGUudHJhbnNmZXI+KCkgJiYKICAgIGR1cAogICAgZ3R4bnNhIEFwcGxpY2F0aW9uQXJncyAwCiAgICBieXRlYyAyMCAvLyBtZXRob2QgInRyYW5zZmVyKGFkZHJlc3Mpdm9pZCIKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxOTItMTkzCiAgICAvLyBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBQcml6ZUJveC5wcm90b3R5cGUudHJhbnNmZXI+KCkgJiYKICAgIC8vIHByaXplQm94VHJhbnNmZXJUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AKICAgIGJ6IGxpc3RQcml6ZUJveF9ib29sX2ZhbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjE5MwogICAgLy8gcHJpemVCb3hUcmFuc2ZlclR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcAogICAgZHVwCiAgICBndHhucyBPbkNvbXBsZXRpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjE5Mi0xOTMKICAgIC8vIHByaXplQm94VHJhbnNmZXJUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIFByaXplQm94LnByb3RvdHlwZS50cmFuc2Zlcj4oKSAmJgogICAgLy8gcHJpemVCb3hUcmFuc2ZlclR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcAogICAgYm56IGxpc3RQcml6ZUJveF9ib29sX2ZhbHNlQDgKICAgIGludGNfMSAvLyAxCgpsaXN0UHJpemVCb3hfYm9vbF9tZXJnZUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTkxLTE5NAogICAgLy8gbG9nZ2VkQXNzZXJ0KCgKICAgIC8vICAgcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgUHJpemVCb3gucHJvdG90eXBlLnRyYW5zZmVyPigpICYmCiAgICAvLyAgIHByaXplQm94VHJhbnNmZXJUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AKICAgIC8vICksIEVSUl9CQURfTUVUSE9EX1BSSVpFX0JPWF9UUkFOU0ZFUl9ORUVERUQpCiAgICBibnogbGlzdFByaXplQm94X2FmdGVyX2Fzc2VydEAxMQogICAgcHVzaGJ5dGVzICJFUlI6Qk1QVCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpCTVBUCgpsaXN0UHJpemVCb3hfYWZ0ZXJfYXNzZXJ0QDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTk1CiAgICAvLyBsb2dnZWRBc3NlcnQoZ2V0UHJpemVCb3hPd25lcih0aGlzLmFraXRhREFPLnZhbHVlLCBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcElkKSA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIEVSUl9OT1RfUFJJWkVfQk9YX09XTkVSKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTk1CiAgICAvLyBsb2dnZWRBc3NlcnQoZ2V0UHJpemVCb3hPd25lcih0aGlzLmFraXRhREFPLnZhbHVlLCBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcElkKSA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIEVSUl9OT1RfUFJJWkVfQk9YX09XTkVSKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHN3YXAKICAgIGd0eG5zIEFwcGxpY2F0aW9uSUQKICAgIGR1cAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NjUKICAgIC8vIGFzc2VydChwcml6ZUJveC5jcmVhdG9yID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLnByaXplQm94KS5hZGRyZXNzLCBFUlJfTk9UX0FfUFJJWkVfQk9YKQogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBDcmVhdG9yCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICB1bmNvdmVyIDIKICAgIGJ5dGVjIDkgLy8gImFhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDY1CiAgICAvLyBhc3NlcnQocHJpemVCb3guY3JlYXRvciA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5wcml6ZUJveCkuYWRkcmVzcywgRVJSX05PVF9BX1BSSVpFX0JPWCkKICAgIHB1c2hpbnQgMjQKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYXNzZXJ0IC8vIE5BUEIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDY2CiAgICAvLyBjb25zdCBbb3duZXJCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhwcml6ZUJveCwgQnl0ZXMoUHJpemVCb3hHbG9iYWxTdGF0ZUtleU93bmVyKSkKICAgIHB1c2hieXRlcyAib3duZXIiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxOTUKICAgIC8vIGxvZ2dlZEFzc2VydChnZXRQcml6ZUJveE93bmVyKHRoaXMuYWtpdGFEQU8udmFsdWUsIHByaXplQm94VHJhbnNmZXJUeG4uYXBwSWQpID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgRVJSX05PVF9QUklaRV9CT1hfT1dORVIpCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBsaXN0UHJpemVCb3hfYWZ0ZXJfYXNzZXJ0QDEzCiAgICBwdXNoYnl0ZXMgIkVSUjpOUEJPIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5QQk8KCmxpc3RQcml6ZUJveF9hZnRlcl9hc3NlcnRAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxOTgtMjAwCiAgICAvLyBjb25zdCBvcHRpbk1CUjogdWludDY0ID0gaXNBbGdvUGF5bWVudAogICAgLy8gICA/IDAKICAgIC8vICAgOiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGRpZyA3CiAgICBibnogbGlzdFByaXplQm94X3Rlcm5hcnlfZmFsc2VAMTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjE5OQogICAgLy8gPyAwCiAgICBpbnRjXzAgLy8gMAogICAgYnVyeSAxMAoKbGlzdFByaXplQm94X3Rlcm5hcnlfbWVyZ2VAMTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyMTAKICAgIC8vIGlmIChpc0FsZ29QYXltZW50KSB7CiAgICBkaWcgNwogICAgYm56IGxpc3RQcml6ZUJveF9lbHNlX2JvZHlAMTgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTE3CiAgICAvLyByZXR1cm4gKE1pbkRpc2J1cnNlbWVudHNNQlIgKyBVc2VyQWxsb2NhdGlvbk1CUikgKiBjb3VudAogICAgaW50YyA0IC8vIDY3MDAwCiAgICBzd2FwCgpsaXN0UHJpemVCb3hfYWZ0ZXJfaWZfZWxzZUAxOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjIxNy0yMTkKICAgIC8vIGNvbnN0IGVzY3Jvd09wdEluQ29zdDogdWludDY0ID0gaXNBbGdvUGF5bWVudAogICAgLy8gICA/IDAKICAgIC8vICAgOiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiBzcGxpdE9wdEluQ291bnQodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywgQXNzZXQocGF5bWVudEFzc2V0KSkKICAgIGRpZyA4CiAgICBibnogbGlzdFByaXplQm94X3Rlcm5hcnlfZmFsc2VAMjEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjIxOAogICAgLy8gPyAwCiAgICBpbnRjXzAgLy8gMAoKbGlzdFByaXplQm94X3Rlcm5hcnlfbWVyZ2VAMjI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyMjEKICAgIC8vIGNvbnN0IGNoaWxkQXBwTUJSOiB1aW50NjQgPSBHbG9iYWwubWluQmFsYW5jZSArIG9wdGluTUJSICsgZGlzYnVyc2VtZW50TUJSICsgZXNjcm93T3B0SW5Db3N0CiAgICBnbG9iYWwgTWluQmFsYW5jZQogICAgZGlnIDEyCiAgICArCiAgICBkaWcgMwogICAgKwogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjIzLTIyNQogICAgLy8gTUlOX1BST0dSQU1fUEFHRVMgKiAoMSArIGxpc3RpbmcuZXh0cmFQcm9ncmFtUGFnZXMpICsKICAgIC8vIChHTE9CQUxfU1RBVEVfS0VZX1VJTlRfQ09TVCAqIGxpc3RpbmcuZ2xvYmFsVWludHMpICsKICAgIC8vIChHTE9CQUxfU1RBVEVfS0VZX0JZVEVTX0NPU1QgKiBsaXN0aW5nLmdsb2JhbEJ5dGVzKSArCiAgICBpbnRjIDUgLy8gNzU2NTAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyMjMtMjI2CiAgICAvLyBNSU5fUFJPR1JBTV9QQUdFUyAqICgxICsgbGlzdGluZy5leHRyYVByb2dyYW1QYWdlcykgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfVUlOVF9DT1NUICogbGlzdGluZy5nbG9iYWxVaW50cykgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfQllURVNfQ09TVCAqIGxpc3RpbmcuZ2xvYmFsQnl0ZXMpICsKICAgIC8vIGNoaWxkQXBwTUJSCiAgICArCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyMjkKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgRVJSX0lOVkFMSURfUEFZTUVOVCkKICAgIGRpZyAzCiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogbGlzdFByaXplQm94X2FmdGVyX2Fzc2VydEAyNAogICAgYnl0ZWNfMyAvLyAiRVJSOklQQVkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBBWQoKbGlzdFByaXplQm94X2FmdGVyX2Fzc2VydEAyNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjIzMAogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSB0b3RhbE1CUiwgRVJSX0lOVkFMSURfUEFZTUVOVCkKICAgIGRpZyAzCiAgICBndHhucyBBbW91bnQKICAgIGRpZyAyCiAgICA9PQogICAgYm56IGxpc3RQcml6ZUJveF9hZnRlcl9hc3NlcnRAMjYKICAgIGJ5dGVjXzMgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCmxpc3RQcml6ZUJveF9hZnRlcl9hc3NlcnRAMjY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czozOAogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjMzCiAgICAvLyBjb25zdCBhcHByb3ZhbFByb2dyYW0gPSB0aGlzLmJveGVkQ29udHJhY3QuZXh0cmFjdCgwLCB0aGlzLmJveGVkQ29udHJhY3QubGVuZ3RoKQogICAgYm94X2xlbgogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjM4CiAgICAvLyBib3hlZENvbnRyYWN0ID0gQm94PGJ5dGVzPih7IGtleTogQm94S2V5Qm94ZWRDb250cmFjdCB9KQogICAgYnl0ZWNfMSAvLyAiYmMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyMzMKICAgIC8vIGNvbnN0IGFwcHJvdmFsUHJvZ3JhbSA9IHRoaXMuYm94ZWRDb250cmFjdC5leHRyYWN0KDAsIHRoaXMuYm94ZWRDb250cmFjdC5sZW5ndGgpCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBib3hfZXh0cmFjdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjM2LTI1NgogICAgLy8gY29uc3QgbGlzdGluZ0FwcCA9IGxpc3RpbmcuY2FsbAogICAgLy8gICAuY3JlYXRlKHsKICAgIC8vICAgICBhcmdzOiBbCiAgICAvLyAgICAgICBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcElkLmlkLAogICAgLy8gICAgICAgdHJ1ZSwKICAgIC8vICAgICAgIHByaWNlLAogICAgLy8gICAgICAgcGF5bWVudEFzc2V0LAogICAgLy8gICAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgICB7IGFjY291bnQ6IHBheW1lbnQuc2VuZGVyLCBhbW91bnQ6IHRvdGFsTUJSIH0sCiAgICAvLyAgICAgICByZXNlcnZlZEZvciwKICAgIC8vICAgICAgIDAsCiAgICAvLyAgICAgICBnYXRlSUQsCiAgICAvLyAgICAgICBtYXJrZXRwbGFjZSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRDb250cmFjdFZlcnNpb24udmFsdWUsCiAgICAvLyAgICAgICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICAgICAgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSwKICAgIC8vICAgICBdLAogICAgLy8gICAgIGFwcHJvdmFsUHJvZ3JhbTogW2FwcHJvdmFsUHJvZ3JhbV0sCiAgICAvLyAgICAgY2xlYXJTdGF0ZVByb2dyYW06IGxpc3RpbmcuY2xlYXJTdGF0ZVByb2dyYW0sCiAgICAvLyAgIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyMzkKICAgIC8vIHByaXplQm94VHJhbnNmZXJUeG4uYXBwSWQuaWQsCiAgICBkaWcgMQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjQ0CiAgICAvLyBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjQ1CiAgICAvLyB7IGFjY291bnQ6IHBheW1lbnQuc2VuZGVyLCBhbW91bnQ6IHRvdGFsTUJSIH0sCiAgICB1bmNvdmVyIDYKICAgIGd0eG5zIFNlbmRlcgogICAgdW5jb3ZlciA1CiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjI0NwogICAgLy8gMCwKICAgIGludGNfMCAvLyAwCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyNTAKICAgIC8vIHRoaXMuY2hpbGRDb250cmFjdFZlcnNpb24udmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MzQKICAgIC8vIGNoaWxkQ29udHJhY3RWZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogQmFzZUZhY3RvcnlHbG9iYWxTdGF0ZUtleUNoaWxkQ29udHJhY3RWZXJzaW9uIH0pCiAgICBieXRlYyAxMCAvLyAiY2hpbGRfY29udHJhY3RfdmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjI1MAogICAgLy8gdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjUxCiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjUxCiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjI1MgogICAgLy8gdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4MgogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlY18yIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyNTIKICAgIC8vIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjAyCiAgICAvLyBjb25zdCBsaXN0aW5nID0gY29tcGlsZUFyYzQoTGlzdGluZykKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIEV4dHJhUHJvZ3JhbVBhZ2VzCiAgICBpbnRjXzIgLy8gNgogICAgaXR4bl9maWVsZCBHbG9iYWxOdW1CeXRlU2xpY2UKICAgIHB1c2hpbnQgOQogICAgaXR4bl9maWVsZCBHbG9iYWxOdW1VaW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyMzYtMjU2CiAgICAvLyBjb25zdCBsaXN0aW5nQXBwID0gbGlzdGluZy5jYWxsCiAgICAvLyAgIC5jcmVhdGUoewogICAgLy8gICAgIGFyZ3M6IFsKICAgIC8vICAgICAgIHByaXplQm94VHJhbnNmZXJUeG4uYXBwSWQuaWQsCiAgICAvLyAgICAgICB0cnVlLAogICAgLy8gICAgICAgcHJpY2UsCiAgICAvLyAgICAgICBwYXltZW50QXNzZXQsCiAgICAvLyAgICAgICBleHBpcmF0aW9uLAogICAgLy8gICAgICAgVHhuLnNlbmRlciwKICAgIC8vICAgICAgIHsgYWNjb3VudDogcGF5bWVudC5zZW5kZXIsIGFtb3VudDogdG90YWxNQlIgfSwKICAgIC8vICAgICAgIHJlc2VydmVkRm9yLAogICAgLy8gICAgICAgMCwKICAgIC8vICAgICAgIGdhdGVJRCwKICAgIC8vICAgICAgIG1hcmtldHBsYWNlLAogICAgLy8gICAgICAgdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSwKICAgIC8vICAgICAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgICAgICB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLAogICAgLy8gICAgIF0sCiAgICAvLyAgICAgYXBwcm92YWxQcm9ncmFtOiBbYXBwcm92YWxQcm9ncmFtXSwKICAgIC8vICAgICBjbGVhclN0YXRlUHJvZ3JhbTogbGlzdGluZy5jbGVhclN0YXRlUHJvZ3JhbSwKICAgIC8vICAgfSkKICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIE9uQ29tcGxldGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjAyCiAgICAvLyBjb25zdCBsaXN0aW5nID0gY29tcGlsZUFyYzQoTGlzdGluZykKICAgIGJ5dGVjIDE4IC8vIGJhc2U2NChDNEVCUXc9PSkKICAgIGl0eG5fZmllbGQgQ2xlYXJTdGF0ZVByb2dyYW1QYWdlcwogICAgdW5jb3ZlciA3CiAgICBpdHhuX2ZpZWxkIEFwcHJvdmFsUHJvZ3JhbVBhZ2VzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyMzYtMjU2CiAgICAvLyBjb25zdCBsaXN0aW5nQXBwID0gbGlzdGluZy5jYWxsCiAgICAvLyAgIC5jcmVhdGUoewogICAgLy8gICAgIGFyZ3M6IFsKICAgIC8vICAgICAgIHByaXplQm94VHJhbnNmZXJUeG4uYXBwSWQuaWQsCiAgICAvLyAgICAgICB0cnVlLAogICAgLy8gICAgICAgcHJpY2UsCiAgICAvLyAgICAgICBwYXltZW50QXNzZXQsCiAgICAvLyAgICAgICBleHBpcmF0aW9uLAogICAgLy8gICAgICAgVHhuLnNlbmRlciwKICAgIC8vICAgICAgIHsgYWNjb3VudDogcGF5bWVudC5zZW5kZXIsIGFtb3VudDogdG90YWxNQlIgfSwKICAgIC8vICAgICAgIHJlc2VydmVkRm9yLAogICAgLy8gICAgICAgMCwKICAgIC8vICAgICAgIGdhdGVJRCwKICAgIC8vICAgICAgIG1hcmtldHBsYWNlLAogICAgLy8gICAgICAgdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSwKICAgIC8vICAgICAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgICAgICB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLAogICAgLy8gICAgIF0sCiAgICAvLyAgICAgYXBwcm92YWxQcm9ncmFtOiBbYXBwcm92YWxQcm9ncmFtXSwKICAgIC8vICAgICBjbGVhclN0YXRlUHJvZ3JhbTogbGlzdGluZy5jbGVhclN0YXRlUHJvZ3JhbSwKICAgIC8vICAgfSkKICAgIGJ5dGVjIDE5IC8vIG1ldGhvZCAiY3JlYXRlKHVpbnQ2NCxib29sLHVpbnQ2NCx1aW50NjQsdWludDY0LGFkZHJlc3MsKGFkZHJlc3MsdWludDY0KSxhZGRyZXNzLHVpbnQ2NCx1aW50NjQsYWRkcmVzcyxzdHJpbmcsdWludDY0LChzdHJpbmcsdWludDY0KSl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgNgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjI0MAogICAgLy8gdHJ1ZSwKICAgIHB1c2hieXRlcyAweDgwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAxMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyAxMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMTEKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDUKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDgKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDYKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDUKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjIzNi0yNTYKICAgIC8vIGNvbnN0IGxpc3RpbmdBcHAgPSBsaXN0aW5nLmNhbGwKICAgIC8vICAgLmNyZWF0ZSh7CiAgICAvLyAgICAgYXJnczogWwogICAgLy8gICAgICAgcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBJZC5pZCwKICAgIC8vICAgICAgIHRydWUsCiAgICAvLyAgICAgICBwcmljZSwKICAgIC8vICAgICAgIHBheW1lbnRBc3NldCwKICAgIC8vICAgICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgICAgeyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiB0b3RhbE1CUiB9LAogICAgLy8gICAgICAgcmVzZXJ2ZWRGb3IsCiAgICAvLyAgICAgICAwLAogICAgLy8gICAgICAgZ2F0ZUlELAogICAgLy8gICAgICAgbWFya2V0cGxhY2UsCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlLAogICAgLy8gICAgICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgICAgIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUsCiAgICAvLyAgICAgXSwKICAgIC8vICAgICBhcHByb3ZhbFByb2dyYW06IFthcHByb3ZhbFByb2dyYW1dLAogICAgLy8gICAgIGNsZWFyU3RhdGVQcm9ncmFtOiBsaXN0aW5nLmNsZWFyU3RhdGVQcm9ncmFtLAogICAgLy8gICB9KQogICAgaW50Y18yIC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjIzNi0yNTgKICAgIC8vIGNvbnN0IGxpc3RpbmdBcHAgPSBsaXN0aW5nLmNhbGwKICAgIC8vICAgLmNyZWF0ZSh7CiAgICAvLyAgICAgYXJnczogWwogICAgLy8gICAgICAgcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBJZC5pZCwKICAgIC8vICAgICAgIHRydWUsCiAgICAvLyAgICAgICBwcmljZSwKICAgIC8vICAgICAgIHBheW1lbnRBc3NldCwKICAgIC8vICAgICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgICAgeyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiB0b3RhbE1CUiB9LAogICAgLy8gICAgICAgcmVzZXJ2ZWRGb3IsCiAgICAvLyAgICAgICAwLAogICAgLy8gICAgICAgZ2F0ZUlELAogICAgLy8gICAgICAgbWFya2V0cGxhY2UsCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlLAogICAgLy8gICAgICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgICAgIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUsCiAgICAvLyAgICAgXSwKICAgIC8vICAgICBhcHByb3ZhbFByb2dyYW06IFthcHByb3ZhbFByb2dyYW1dLAogICAgLy8gICAgIGNsZWFyU3RhdGVQcm9ncmFtOiBsaXN0aW5nLmNsZWFyU3RhdGVQcm9ncmFtLAogICAgLy8gICB9KQogICAgLy8gICAuaXR4bgogICAgLy8gICAuY3JlYXRlZEFwcAogICAgZ2l0eG4gMCBDcmVhdGVkQXBwbGljYXRpb25JRAogICAgZHVwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyNjEtMjY2CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogbGlzdGluZ0FwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogR2xvYmFsLm1pbkJhbGFuY2UgKyBkaXNidXJzZW1lbnRNQlIKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyNjMKICAgIC8vIHJlY2VpdmVyOiBsaXN0aW5nQXBwLmFkZHJlc3MsCiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjI2NAogICAgLy8gYW1vdW50OiBHbG9iYWwubWluQmFsYW5jZSArIGRpc2J1cnNlbWVudE1CUgogICAgZ2xvYmFsIE1pbkJhbGFuY2UKICAgIHVuY292ZXIgNQogICAgKwogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjI2MS0yNjUKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBsaXN0aW5nQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBHbG9iYWwubWluQmFsYW5jZSArIGRpc2J1cnNlbWVudE1CUgogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjYxLTI2NgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IGxpc3RpbmdBcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IEdsb2JhbC5taW5CYWxhbmNlICsgZGlzYnVyc2VtZW50TUJSCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjI2OS0yNzIKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFByaXplQm94LnByb3RvdHlwZS50cmFuc2Zlcj4oewogICAgLy8gICBhcHBJZDogcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBJZCwKICAgIC8vICAgYXJnczogW2xpc3RpbmdBcHAuYWRkcmVzc10sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjcxCiAgICAvLyBhcmdzOiBbbGlzdGluZ0FwcC5hZGRyZXNzXSwKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjY5LTI3MgogICAgLy8gYWJpQ2FsbDx0eXBlb2YgUHJpemVCb3gucHJvdG90eXBlLnRyYW5zZmVyPih7CiAgICAvLyAgIGFwcElkOiBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcElkLAogICAgLy8gICBhcmdzOiBbbGlzdGluZ0FwcC5hZGRyZXNzXSwKICAgIC8vIH0pCiAgICBieXRlYyAyMCAvLyBtZXRob2QgInRyYW5zZmVyKGFkZHJlc3Mpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaW50Y18yIC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjI3NAogICAgLy8gaWYgKCFpc0FsZ29QYXltZW50KSB7CiAgICBkaWcgMQogICAgYnogbGlzdFByaXplQm94X2FmdGVyX2lmX2Vsc2VAMzUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjI3Ni0yODUKICAgIC8vIGxpc3RpbmcuY2FsbC5vcHRpbih7CiAgICAvLyAgIGFwcElkOiBsaXN0aW5nQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBsaXN0aW5nQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG9wdGluTUJSLAogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHBheW1lbnRBc3NldCwKICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyODAKICAgIC8vIHJlY2VpdmVyOiBsaXN0aW5nQXBwLmFkZHJlc3MsCiAgICBkdXBuIDIKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGRpZyA1CiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6Mjc5LTI4MgogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IGxpc3RpbmdBcHAuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiBvcHRpbk1CUiwKICAgIC8vIH0pLAogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6Mjc2LTI4NQogICAgLy8gbGlzdGluZy5jYWxsLm9wdGluKHsKICAgIC8vICAgYXBwSWQ6IGxpc3RpbmdBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGxpc3RpbmdBcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogb3B0aW5NQlIsCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgcGF5bWVudEFzc2V0LAogICAgLy8gICBdLAogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgT25Db21wbGV0aW9uCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIGJ5dGVjIDE0IC8vIG1ldGhvZCAib3B0aW4ocGF5LHVpbnQ2NCl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaW50Y18yIC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjI4OAogICAgLy8gaWYgKCF0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLmlzT3B0ZWRJbihBc3NldChwYXltZW50QXNzZXQpKSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjgyCiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjXzIgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjI4OAogICAgLy8gaWYgKCF0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLmlzT3B0ZWRJbihBc3NldChwYXltZW50QXNzZXQpKSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMyAvLyAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZGlnIDIKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBibnogbGlzdFByaXplQm94X2FmdGVyX2lmX2Vsc2VAMzUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjI4OQogICAgLy8gdGhpcy5vcHRBa2l0YUVzY3Jvd0luQW5kU2VuZChBc3NldChwYXltZW50QXNzZXQpLCAwKQogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBjYWxsc3ViIG9wdEFraXRhRXNjcm93SW5BbmRTZW5kCiAgICBwb3AKCmxpc3RQcml6ZUJveF9hZnRlcl9pZl9lbHNlQDM1OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTc4LTE4NwogICAgLy8gbGlzdFByaXplQm94KAogICAgLy8gICBwcml6ZUJveFRyYW5zZmVyVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBwcmljZTogdWludDY0LAogICAgLy8gICBwYXltZW50QXNzZXQ6IHVpbnQ2NCwKICAgIC8vICAgZXhwaXJhdGlvbjogdWludDY0LAogICAgLy8gICByZXNlcnZlZEZvcjogQWNjb3VudCwKICAgIC8vICAgZ2F0ZUlEOiB1aW50NjQsCiAgICAvLyAgIG1hcmtldHBsYWNlOiBBY2NvdW50LAogICAgLy8gKTogdWludDY0IHsKICAgIGl0b2IKICAgIGJ5dGVjIDUgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmxpc3RQcml6ZUJveF90ZXJuYXJ5X2ZhbHNlQDIxOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjE5CiAgICAvLyA6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSAqIHNwbGl0T3B0SW5Db3VudCh0aGlzLmFraXRhREFPLnZhbHVlLCB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLCBBc3NldChwYXltZW50QXNzZXQpKQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyMTkKICAgIC8vIDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsIEFzc2V0KHBheW1lbnRBc3NldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjgyCiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjXzIgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjIxOQogICAgLy8gOiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiBzcGxpdE9wdEluQ291bnQodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywgQXNzZXQocGF5bWVudEFzc2V0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzMgLy8gMgogICAgZXh0cmFjdF91aW50NjQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGRpZyAxMQogICAgY2FsbHN1YiBzcGxpdE9wdEluQ291bnQKICAgICoKICAgIGIgbGlzdFByaXplQm94X3Rlcm5hcnlfbWVyZ2VAMjIKCmxpc3RQcml6ZUJveF9lbHNlX2JvZHlAMTg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyMTMKICAgIC8vIGRpc2J1cnNlbWVudE1CUiA9IGRpc2J1cnNlbWVudENvc3QoNCkgKyByZXdhcmRzT3B0SW5Db3N0KHRoaXMuYWtpdGFEQU8udmFsdWUsIHBheW1lbnRBc3NldCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjIxMwogICAgLy8gZGlzYnVyc2VtZW50TUJSID0gZGlzYnVyc2VtZW50Q29zdCg0KSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgcGF5bWVudEFzc2V0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyA4CiAgICBjYWxsc3ViIHJld2FyZHNPcHRJbkNvc3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTE3CiAgICAvLyByZXR1cm4gKE1pbkRpc2J1cnNlbWVudHNNQlIgKyBVc2VyQWxsb2NhdGlvbk1CUikgKiBjb3VudAogICAgcHVzaGludCAyNjgwMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjIxMwogICAgLy8gZGlzYnVyc2VtZW50TUJSID0gZGlzYnVyc2VtZW50Q29zdCg0KSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgcGF5bWVudEFzc2V0KQogICAgKwogICAgc3dhcAogICAgYiBsaXN0UHJpemVCb3hfYWZ0ZXJfaWZfZWxzZUAxOQoKbGlzdFByaXplQm94X3Rlcm5hcnlfZmFsc2VAMTU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyMDAKICAgIC8vIDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGJ1cnkgMTAKICAgIGIgbGlzdFByaXplQm94X3Rlcm5hcnlfbWVyZ2VAMTYKCmxpc3RQcml6ZUJveF9ib29sX2ZhbHNlQDg6CiAgICBpbnRjXzAgLy8gMAogICAgYiBsaXN0UHJpemVCb3hfYm9vbF9tZXJnZUA5CgoKLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6Ok1hcmtldHBsYWNlLmdhdGVkUHVyY2hhc2Vbcm91dGluZ10oKSAtPiB2b2lkOgpnYXRlZFB1cmNoYXNlOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6Mjk2LTMwMQogICAgLy8gZ2F0ZWRQdXJjaGFzZSgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBnYXRlVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwKICAgIC8vICAgYXBwSWQ6IEFwcGxpY2F0aW9uLAogICAgLy8gICBtYXJrZXRwbGFjZTogQWNjb3VudCwKICAgIC8vICk6IHZvaWQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMyAvLyAyCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgY292ZXIgMgogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMiAvLyBhcHBsCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXBwbAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBjb3ZlciAzCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzAyCiAgICAvLyBjb25zdCB3YWxsZXQgPSBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU8odGhpcy5ha2l0YURBTy52YWx1ZSwgVHhuLnNlbmRlcikKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjMwMgogICAgLy8gY29uc3Qgd2FsbGV0ID0gZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPKHRoaXMuYWtpdGFEQU8udmFsdWUsIFR4bi5zZW5kZXIpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgdHhuIFNlbmRlcgogICAgY2FsbHN1YiBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjMwMwogICAgLy8gY29uc3Qgb3JpZ2luID0gb3JpZ2luT3JUeG5TZW5kZXIod2FsbGV0KQogICAgY2FsbHN1YiBvcmlnaW5PclR4blNlbmRlcgogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzA1CiAgICAvLyBsb2dnZWRBc3NlcnQoYXBwSWQuY3JlYXRvciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIEVSUl9OT1RfQV9MSVNUSU5HKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQ3JlYXRvcgogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogZ2F0ZWRQdXJjaGFzZV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNyAvLyAiRVJSOk5BTFMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TkFMUwoKZ2F0ZWRQdXJjaGFzZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjMwNgogICAgLy8gY29uc3QgZ2F0ZUlEID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KGFwcElkLCBCeXRlcyhMaXN0aW5nR2xvYmFsU3RhdGVLZXlHYXRlSUQpKVswXQogICAgZGlnIDEKICAgIGJ5dGVjIDExIC8vICJnYXRlX2lkIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzA3CiAgICAvLyBsb2dnZWRBc3NlcnQoZ2F0ZUNoZWNrKGdhdGVUeG4sIHRoaXMuYWtpdGFEQU8udmFsdWUsIG9yaWdpbiwgZ2F0ZUlEKSwgRVJSX0ZBSUxFRF9HQVRFKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzA3CiAgICAvLyBsb2dnZWRBc3NlcnQoZ2F0ZUNoZWNrKGdhdGVUeG4sIHRoaXMuYWtpdGFEQU8udmFsdWUsIG9yaWdpbiwgZ2F0ZUlEKSwgRVJSX0ZBSUxFRF9HQVRFKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHVuY292ZXIgNgogICAgc3dhcAogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDMKICAgIGNhbGxzdWIgZ2F0ZUNoZWNrCiAgICBibnogZ2F0ZWRQdXJjaGFzZV9hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgMjEgLy8gIkVSUjpGR1RFIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkZHVEUKCmdhdGVkUHVyY2hhc2VfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozMDgKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgRVJSX0lOVkFMSURfUEFZTUVOVCkKICAgIGRpZyAyCiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogZ2F0ZWRQdXJjaGFzZV9hZnRlcl9hc3NlcnRANwogICAgYnl0ZWNfMyAvLyAiRVJSOklQQVkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBBWQoKZ2F0ZWRQdXJjaGFzZV9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDcxCiAgICAvLyBjb25zdCBbZnVuZGVyQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYXBwSWQsIEJ5dGVzKEdsb2JhbFN0YXRlS2V5RnVuZGVyKSkKICAgIGR1cAogICAgYnl0ZWMgOCAvLyAiZnVuZGVyIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzExCiAgICAvLyBjb25zdCB7IGFjY291bnQ6IGNyZWF0b3IsIGFtb3VudCB9ID0gZ2V0RnVuZGVyKGFwcElkKQogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIHN3YXAKICAgIHB1c2hpbnQgMzIKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozMTQtMzI0CiAgICAvLyBsaXN0aW5nLmNhbGwucHVyY2hhc2UoewogICAgLy8gICBhcHBJZCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogYXBwSWQuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogcGF5bWVudC5hbW91bnQsCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgVHhuLnNlbmRlciwKICAgIC8vICAgICBtYXJrZXRwbGFjZQogICAgLy8gICBdLAogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjMxOAogICAgLy8gcmVjZWl2ZXI6IGFwcElkLmFkZHJlc3MsCiAgICBkaWcgMgogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzE5CiAgICAvLyBhbW91bnQ6IHBheW1lbnQuYW1vdW50LAogICAgdW5jb3ZlciA1CiAgICBndHhucyBBbW91bnQKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozMTctMzIwCiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogYXBwSWQuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiBwYXltZW50LmFtb3VudCwKICAgIC8vIH0pLAogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzE0LTMyNAogICAgLy8gbGlzdGluZy5jYWxsLnB1cmNoYXNlKHsKICAgIC8vICAgYXBwSWQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGFwcElkLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IHBheW1lbnQuYW1vdW50LAogICAgLy8gICAgIH0pLAogICAgLy8gICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgbWFya2V0cGxhY2UKICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjMyMQogICAgLy8gVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjMxNC0zMjQKICAgIC8vIGxpc3RpbmcuY2FsbC5wdXJjaGFzZSh7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBhcHBJZC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBwYXltZW50LmFtb3VudCwKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgIG1hcmtldHBsYWNlCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgcHVzaGludCA1CiAgICBpdHhuX2ZpZWxkIE9uQ29tcGxldGlvbgogICAgdW5jb3ZlciAzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIGJ5dGVjIDIyIC8vIG1ldGhvZCAicHVyY2hhc2UocGF5LGFkZHJlc3MsYWRkcmVzcyl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpbnRjXzIgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzI2LTMzMQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50LAogICAgLy8gICAgIHJlY2VpdmVyOiBjcmVhdG9yLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozMjYtMzMwCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQsCiAgICAvLyAgICAgcmVjZWl2ZXI6IGNyZWF0b3IsCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozMjYtMzMxCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQsCiAgICAvLyAgICAgcmVjZWl2ZXI6IGNyZWF0b3IsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjI5Ni0zMDEKICAgIC8vIGdhdGVkUHVyY2hhc2UoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgZ2F0ZVR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sCiAgICAvLyAgIGFwcElkOiBBcHBsaWNhdGlvbiwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQsCiAgICAvLyApOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo6TWFya2V0cGxhY2UucHVyY2hhc2Vbcm91dGluZ10oKSAtPiB2b2lkOgpwdXJjaGFzZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjMzNC0zMzgKICAgIC8vIHB1cmNoYXNlKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGFwcElkOiBBcHBsaWNhdGlvbiwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQsCiAgICAvLyApOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBjb3ZlciAzCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzM5CiAgICAvLyBsb2dnZWRBc3NlcnQoYXBwSWQuY3JlYXRvciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIEVSUl9OT1RfQV9MSVNUSU5HKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQ3JlYXRvcgogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogcHVyY2hhc2VfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDcgLy8gIkVSUjpOQUxTIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5BTFMKCnB1cmNoYXNlX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzQwCiAgICAvLyBjb25zdCBnYXRlSUQgPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQoYXBwSWQsIEJ5dGVzKExpc3RpbmdHbG9iYWxTdGF0ZUtleUdhdGVJRCkpWzBdCiAgICBkdXAKICAgIGJ5dGVjIDExIC8vICJnYXRlX2lkIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzQxCiAgICAvLyBsb2dnZWRBc3NlcnQoZ2F0ZUlEID09PSAwLCBFUlJfSEFTX0dBVEUpCiAgICBieiBwdXJjaGFzZV9hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgMjMgLy8gIkVSUjpIR1RFIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkhHVEUKCnB1cmNoYXNlX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzQyCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIEVSUl9JTlZBTElEX1BBWU1FTlQpCiAgICBkaWcgMgogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IHB1cmNoYXNlX2FmdGVyX2Fzc2VydEA3CiAgICBieXRlY18zIC8vICJFUlI6SVBBWSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUEFZCgpwdXJjaGFzZV9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDcxCiAgICAvLyBjb25zdCBbZnVuZGVyQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYXBwSWQsIEJ5dGVzKEdsb2JhbFN0YXRlS2V5RnVuZGVyKSkKICAgIGR1cAogICAgYnl0ZWMgOCAvLyAiZnVuZGVyIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzQ1CiAgICAvLyBjb25zdCB7IGFjY291bnQ6IGNyZWF0b3IsIGFtb3VudCB9ID0gZ2V0RnVuZGVyKGFwcElkKQogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIHN3YXAKICAgIHB1c2hpbnQgMzIKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozNDgtMzU4CiAgICAvLyBsaXN0aW5nLmNhbGwucHVyY2hhc2UoewogICAgLy8gICBhcHBJZCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogYXBwSWQuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogcGF5bWVudC5hbW91bnQsCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgVHhuLnNlbmRlciwKICAgIC8vICAgICBtYXJrZXRwbGFjZQogICAgLy8gICBdLAogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjM1MgogICAgLy8gcmVjZWl2ZXI6IGFwcElkLmFkZHJlc3MsCiAgICBkaWcgMgogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzUzCiAgICAvLyBhbW91bnQ6IHBheW1lbnQuYW1vdW50LAogICAgdW5jb3ZlciA1CiAgICBndHhucyBBbW91bnQKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozNTEtMzU0CiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogYXBwSWQuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiBwYXltZW50LmFtb3VudCwKICAgIC8vIH0pLAogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzQ4LTM1OAogICAgLy8gbGlzdGluZy5jYWxsLnB1cmNoYXNlKHsKICAgIC8vICAgYXBwSWQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGFwcElkLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IHBheW1lbnQuYW1vdW50LAogICAgLy8gICAgIH0pLAogICAgLy8gICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgbWFya2V0cGxhY2UKICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjM1NQogICAgLy8gVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjM0OC0zNTgKICAgIC8vIGxpc3RpbmcuY2FsbC5wdXJjaGFzZSh7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBhcHBJZC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBwYXltZW50LmFtb3VudCwKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgIG1hcmtldHBsYWNlCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgcHVzaGludCA1CiAgICBpdHhuX2ZpZWxkIE9uQ29tcGxldGlvbgogICAgdW5jb3ZlciAzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIGJ5dGVjIDIyIC8vIG1ldGhvZCAicHVyY2hhc2UocGF5LGFkZHJlc3MsYWRkcmVzcyl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpbnRjXzIgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzYwLTM2NQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50LAogICAgLy8gICAgIHJlY2VpdmVyOiBjcmVhdG9yLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozNjAtMzY0CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQsCiAgICAvLyAgICAgcmVjZWl2ZXI6IGNyZWF0b3IsCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozNjAtMzY1CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQsCiAgICAvLyAgICAgcmVjZWl2ZXI6IGNyZWF0b3IsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjMzNC0zMzgKICAgIC8vIHB1cmNoYXNlKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGFwcElkOiBBcHBsaWNhdGlvbiwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQsCiAgICAvLyApOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo6TWFya2V0cGxhY2UuZ2F0ZWRQdXJjaGFzZUFzYVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmdhdGVkUHVyY2hhc2VBc2E6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozNjgtMzczCiAgICAvLyBnYXRlZFB1cmNoYXNlQXNhKAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgZ2F0ZVR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sCiAgICAvLyAgIGFwcElkOiBBcHBsaWNhdGlvbiwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQsCiAgICAvLyApOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzMgLy8gMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA0IC8vIGF4ZmVyCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXhmZXIKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18yIC8vIGFwcGwKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBhcHBsCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGNvdmVyIDQKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozNzQKICAgIC8vIGNvbnN0IHdhbGxldCA9IGdldFdhbGxldElEVXNpbmdBa2l0YURBTyh0aGlzLmFraXRhREFPLnZhbHVlLCBUeG4uc2VuZGVyKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6Mzc0CiAgICAvLyBjb25zdCB3YWxsZXQgPSBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU8odGhpcy5ha2l0YURBTy52YWx1ZSwgVHhuLnNlbmRlcikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICB0eG4gU2VuZGVyCiAgICBjYWxsc3ViIGdldFdhbGxldElEVXNpbmdBa2l0YURBTwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6Mzc1CiAgICAvLyBjb25zdCBvcmlnaW4gPSBvcmlnaW5PclR4blNlbmRlcih3YWxsZXQpCiAgICBjYWxsc3ViIG9yaWdpbk9yVHhuU2VuZGVyCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozNzcKICAgIC8vIGxvZ2dlZEFzc2VydChhcHBJZC5jcmVhdG9yID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgRVJSX05PVF9BX0xJU1RJTkcpCiAgICBhcHBfcGFyYW1zX2dldCBBcHBDcmVhdG9yCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBnYXRlZFB1cmNoYXNlQXNhX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA3IC8vICJFUlI6TkFMUyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOQUxTCgpnYXRlZFB1cmNoYXNlQXNhX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6Mzc4CiAgICAvLyBjb25zdCBnYXRlSUQgPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQoYXBwSWQsIEJ5dGVzKExpc3RpbmdHbG9iYWxTdGF0ZUtleUdhdGVJRCkpWzBdCiAgICBkaWcgMQogICAgYnl0ZWMgMTEgLy8gImdhdGVfaWQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozNzkKICAgIC8vIGxvZ2dlZEFzc2VydChnYXRlQ2hlY2soZ2F0ZVR4biwgdGhpcy5ha2l0YURBTy52YWx1ZSwgb3JpZ2luLCBnYXRlSUQpLCBFUlJfRkFJTEVEX0dBVEUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozNzkKICAgIC8vIGxvZ2dlZEFzc2VydChnYXRlQ2hlY2soZ2F0ZVR4biwgdGhpcy5ha2l0YURBTy52YWx1ZSwgb3JpZ2luLCBnYXRlSUQpLCBFUlJfRkFJTEVEX0dBVEUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgdW5jb3ZlciA2CiAgICBzd2FwCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMwogICAgY2FsbHN1YiBnYXRlQ2hlY2sKICAgIGJueiBnYXRlZFB1cmNoYXNlQXNhX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyAyMSAvLyAiRVJSOkZHVEUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6RkdURQoKZ2F0ZWRQdXJjaGFzZUFzYV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjM4MAogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci5hc3NldFJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgRVJSX0lOVkFMSURfVFJBTlNGRVIpCiAgICBkaWcgMQogICAgZ3R4bnMgQXNzZXRSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogZ2F0ZWRQdXJjaGFzZUFzYV9hZnRlcl9hc3NlcnRANwogICAgYnl0ZWMgMTIgLy8gIkVSUjpJWEZSIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklYRlIKCmdhdGVkUHVyY2hhc2VBc2FfYWZ0ZXJfYXNzZXJ0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozODEKICAgIC8vIGxvZ2dlZEFzc2VydChhc3NldFhmZXIuYXNzZXRBbW91bnQgPiAwLCBFUlJfSU5WQUxJRF9UUkFOU0ZFUikKICAgIGRpZyAxCiAgICBndHhucyBBc3NldEFtb3VudAogICAgZHVwCiAgICBibnogZ2F0ZWRQdXJjaGFzZUFzYV9hZnRlcl9hc3NlcnRAOQogICAgYnl0ZWMgMTIgLy8gIkVSUjpJWEZSIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklYRlIKCmdhdGVkUHVyY2hhc2VBc2FfYWZ0ZXJfYXNzZXJ0QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ3MQogICAgLy8gY29uc3QgW2Z1bmRlckJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFwcElkLCBCeXRlcyhHbG9iYWxTdGF0ZUtleUZ1bmRlcikpCiAgICBzd2FwCiAgICBkdXAKICAgIGJ5dGVjIDggLy8gImZ1bmRlciIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjM4NAogICAgLy8gY29uc3QgeyBhY2NvdW50OiByZWNlaXZlciwgYW1vdW50IH0gPSBnZXRGdW5kZXIoYXBwSWQpCiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgc3dhcAogICAgcHVzaGludCAzMgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjM4Ny0zOTgKICAgIC8vIGxpc3RpbmcuY2FsbC5wdXJjaGFzZUFzYSh7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICAgIGFzc2V0UmVjZWl2ZXI6IGFwcElkLmFkZHJlc3MsCiAgICAvLyAgICAgICBhc3NldEFtb3VudDogYXNzZXRYZmVyLmFzc2V0QW1vdW50LAogICAgLy8gICAgICAgeGZlckFzc2V0OiBhc3NldFhmZXIueGZlckFzc2V0LAogICAgLy8gICAgIH0pLAogICAgLy8gICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgbWFya2V0cGxhY2UKICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozOTEKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IGFwcElkLmFkZHJlc3MsCiAgICBkaWcgMgogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzkzCiAgICAvLyB4ZmVyQXNzZXQ6IGFzc2V0WGZlci54ZmVyQXNzZXQsCiAgICB1bmNvdmVyIDUKICAgIGd0eG5zIFhmZXJBc3NldAogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIHVuY292ZXIgNAogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozOTAtMzk0CiAgICAvLyBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICBhc3NldFJlY2VpdmVyOiBhcHBJZC5hZGRyZXNzLAogICAgLy8gICBhc3NldEFtb3VudDogYXNzZXRYZmVyLmFzc2V0QW1vdW50LAogICAgLy8gICB4ZmVyQXNzZXQ6IGFzc2V0WGZlci54ZmVyQXNzZXQsCiAgICAvLyB9KSwKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozODctMzk4CiAgICAvLyBsaXN0aW5nLmNhbGwucHVyY2hhc2VBc2EoewogICAgLy8gICBhcHBJZCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgICBhc3NldFJlY2VpdmVyOiBhcHBJZC5hZGRyZXNzLAogICAgLy8gICAgICAgYXNzZXRBbW91bnQ6IGFzc2V0WGZlci5hc3NldEFtb3VudCwKICAgIC8vICAgICAgIHhmZXJBc3NldDogYXNzZXRYZmVyLnhmZXJBc3NldCwKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgIG1hcmtldHBsYWNlCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozOTUKICAgIC8vIFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozODctMzk4CiAgICAvLyBsaXN0aW5nLmNhbGwucHVyY2hhc2VBc2EoewogICAgLy8gICBhcHBJZCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgICBhc3NldFJlY2VpdmVyOiBhcHBJZC5hZGRyZXNzLAogICAgLy8gICAgICAgYXNzZXRBbW91bnQ6IGFzc2V0WGZlci5hc3NldEFtb3VudCwKICAgIC8vICAgICAgIHhmZXJBc3NldDogYXNzZXRYZmVyLnhmZXJBc3NldCwKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgIG1hcmtldHBsYWNlCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgT25Db21wbGV0aW9uCiAgICB1bmNvdmVyIDMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgYnl0ZWMgMjQgLy8gbWV0aG9kICJwdXJjaGFzZUFzYShheGZlcixhZGRyZXNzLGFkZHJlc3Mpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaW50Y18yIC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQwMC00MDIKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoeyBhbW91bnQsIHJlY2VpdmVyIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQwMC00MDEKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoeyBhbW91bnQsIHJlY2VpdmVyIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0MDAtNDAyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsgYW1vdW50LCByZWNlaXZlciB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozNjgtMzczCiAgICAvLyBnYXRlZFB1cmNoYXNlQXNhKAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgZ2F0ZVR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sCiAgICAvLyAgIGFwcElkOiBBcHBsaWNhdGlvbiwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQsCiAgICAvLyApOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo6TWFya2V0cGxhY2UucHVyY2hhc2VBc2Fbcm91dGluZ10oKSAtPiB2b2lkOgpwdXJjaGFzZUFzYToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQwNS00MDkKICAgIC8vIHB1cmNoYXNlQXNhKAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgYXBwSWQ6IEFwcGxpY2F0aW9uLAogICAgLy8gICBtYXJrZXRwbGFjZTogQWNjb3VudCwKICAgIC8vICk6IHZvaWQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDQgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBjb3ZlciA0CiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDEwCiAgICAvLyBsb2dnZWRBc3NlcnQoYXBwSWQuY3JlYXRvciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIEVSUl9OT1RfQV9MSVNUSU5HKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQ3JlYXRvcgogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogcHVyY2hhc2VBc2FfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDcgLy8gIkVSUjpOQUxTIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5BTFMKCnB1cmNoYXNlQXNhX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDExCiAgICAvLyBjb25zdCBnYXRlSUQgPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQoYXBwSWQsIEJ5dGVzKExpc3RpbmdHbG9iYWxTdGF0ZUtleUdhdGVJRCkpWzBdCiAgICBkdXAKICAgIGJ5dGVjIDExIC8vICJnYXRlX2lkIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDEyCiAgICAvLyBsb2dnZWRBc3NlcnQoZ2F0ZUlEID09PSAwLCBFUlJfSEFTX0dBVEUpCiAgICBieiBwdXJjaGFzZUFzYV9hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgMjMgLy8gIkVSUjpIR1RFIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkhHVEUKCnB1cmNoYXNlQXNhX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDEzCiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLmFzc2V0UmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfSU5WQUxJRF9UUkFOU0ZFUikKICAgIGRpZyAxCiAgICBndHhucyBBc3NldFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBwdXJjaGFzZUFzYV9hZnRlcl9hc3NlcnRANwogICAgYnl0ZWMgMTIgLy8gIkVSUjpJWEZSIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklYRlIKCnB1cmNoYXNlQXNhX2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDE0CiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLmFzc2V0QW1vdW50ID4gMCwgRVJSX0lOVkFMSURfVFJBTlNGRVIpCiAgICBkaWcgMQogICAgZ3R4bnMgQXNzZXRBbW91bnQKICAgIGR1cAogICAgYm56IHB1cmNoYXNlQXNhX2FmdGVyX2Fzc2VydEA5CiAgICBieXRlYyAxMiAvLyAiRVJSOklYRlIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVhGUgoKcHVyY2hhc2VBc2FfYWZ0ZXJfYXNzZXJ0QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ3MQogICAgLy8gY29uc3QgW2Z1bmRlckJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFwcElkLCBCeXRlcyhHbG9iYWxTdGF0ZUtleUZ1bmRlcikpCiAgICBzd2FwCiAgICBkdXAKICAgIGJ5dGVjIDggLy8gImZ1bmRlciIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQxNwogICAgLy8gY29uc3QgeyBhY2NvdW50OiByZWNlaXZlciwgYW1vdW50IH0gPSBnZXRGdW5kZXIoYXBwSWQpCiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgc3dhcAogICAgcHVzaGludCAzMgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQyMC00MzEKICAgIC8vIGxpc3RpbmcuY2FsbC5wdXJjaGFzZUFzYSh7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICAgIGFzc2V0UmVjZWl2ZXI6IGFwcElkLmFkZHJlc3MsCiAgICAvLyAgICAgICBhc3NldEFtb3VudDogYXNzZXRYZmVyLmFzc2V0QW1vdW50LAogICAgLy8gICAgICAgeGZlckFzc2V0OiBhc3NldFhmZXIueGZlckFzc2V0LAogICAgLy8gICAgIH0pLAogICAgLy8gICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgbWFya2V0cGxhY2UKICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0MjQKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IGFwcElkLmFkZHJlc3MsCiAgICBkaWcgMgogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDI2CiAgICAvLyB4ZmVyQXNzZXQ6IGFzc2V0WGZlci54ZmVyQXNzZXQsCiAgICB1bmNvdmVyIDUKICAgIGd0eG5zIFhmZXJBc3NldAogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIHVuY292ZXIgNAogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0MjMtNDI3CiAgICAvLyBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICBhc3NldFJlY2VpdmVyOiBhcHBJZC5hZGRyZXNzLAogICAgLy8gICBhc3NldEFtb3VudDogYXNzZXRYZmVyLmFzc2V0QW1vdW50LAogICAgLy8gICB4ZmVyQXNzZXQ6IGFzc2V0WGZlci54ZmVyQXNzZXQsCiAgICAvLyB9KSwKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0MjAtNDMxCiAgICAvLyBsaXN0aW5nLmNhbGwucHVyY2hhc2VBc2EoewogICAgLy8gICBhcHBJZCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgICBhc3NldFJlY2VpdmVyOiBhcHBJZC5hZGRyZXNzLAogICAgLy8gICAgICAgYXNzZXRBbW91bnQ6IGFzc2V0WGZlci5hc3NldEFtb3VudCwKICAgIC8vICAgICAgIHhmZXJBc3NldDogYXNzZXRYZmVyLnhmZXJBc3NldCwKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgIG1hcmtldHBsYWNlCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0MjgKICAgIC8vIFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0MjAtNDMxCiAgICAvLyBsaXN0aW5nLmNhbGwucHVyY2hhc2VBc2EoewogICAgLy8gICBhcHBJZCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgICBhc3NldFJlY2VpdmVyOiBhcHBJZC5hZGRyZXNzLAogICAgLy8gICAgICAgYXNzZXRBbW91bnQ6IGFzc2V0WGZlci5hc3NldEFtb3VudCwKICAgIC8vICAgICAgIHhmZXJBc3NldDogYXNzZXRYZmVyLnhmZXJBc3NldCwKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgIG1hcmtldHBsYWNlCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgT25Db21wbGV0aW9uCiAgICB1bmNvdmVyIDMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgYnl0ZWMgMjQgLy8gbWV0aG9kICJwdXJjaGFzZUFzYShheGZlcixhZGRyZXNzLGFkZHJlc3Mpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaW50Y18yIC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQzMy00MzUKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoeyBhbW91bnQsIHJlY2VpdmVyIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQzMy00MzQKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoeyBhbW91bnQsIHJlY2VpdmVyIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0MzMtNDM1CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsgYW1vdW50LCByZWNlaXZlciB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0MDUtNDA5CiAgICAvLyBwdXJjaGFzZUFzYSgKICAgIC8vICAgYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIGFwcElkOiBBcHBsaWNhdGlvbiwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQsCiAgICAvLyApOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo6TWFya2V0cGxhY2UuZGVsaXN0W3JvdXRpbmddKCkgLT4gdm9pZDoKZGVsaXN0OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDM4CiAgICAvLyBkZWxpc3QoYXBwSWQ6IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0MzkKICAgIC8vIGxvZ2dlZEFzc2VydChhcHBJZC5jcmVhdG9yID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgRVJSX05PVF9BX0xJU1RJTkcpCiAgICBhcHBfcGFyYW1zX2dldCBBcHBDcmVhdG9yCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBkZWxpc3RfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDcgLy8gIkVSUjpOQUxTIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5BTFMKCmRlbGlzdF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDcxCiAgICAvLyBjb25zdCBbZnVuZGVyQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYXBwSWQsIEJ5dGVzKEdsb2JhbFN0YXRlS2V5RnVuZGVyKSkKICAgIGR1cAogICAgYnl0ZWMgOCAvLyAiZnVuZGVyIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDQyCiAgICAvLyBjb25zdCB7IGFjY291bnQ6IHJlY2VpdmVyLCBhbW91bnQgfSA9IGdldEZ1bmRlcihhcHBJZCkKICAgIGR1cAogICAgZXh0cmFjdCAwIDMyCiAgICBzd2FwCiAgICBwdXNoaW50IDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDQ1LTQ0OAogICAgLy8gbGlzdGluZy5jYWxsLmRlbGlzdCh7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbVHhuLnNlbmRlcl0sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDQ3CiAgICAvLyBhcmdzOiBbVHhuLnNlbmRlcl0sCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0NDUtNDQ4CiAgICAvLyBsaXN0aW5nLmNhbGwuZGVsaXN0KHsKICAgIC8vICAgYXBwSWQsCiAgICAvLyAgIGFyZ3M6IFtUeG4uc2VuZGVyXSwKICAgIC8vIH0pCiAgICBwdXNoaW50IDUKICAgIGl0eG5fZmllbGQgT25Db21wbGV0aW9uCiAgICB1bmNvdmVyIDMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgcHVzaGJ5dGVzIDB4NjhlODYzNDMgLy8gbWV0aG9kICJkZWxpc3QoYWRkcmVzcyl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpbnRjXzIgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDUwLTQ1MgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7IGFtb3VudCwgcmVjZWl2ZXIgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDUwLTQ1MQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7IGFtb3VudCwgcmVjZWl2ZXIgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQ1MC00NTIKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoeyBhbW91bnQsIHJlY2VpdmVyIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQzOAogICAgLy8gZGVsaXN0KGFwcElkOiBBcHBsaWNhdGlvbik6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjpGYWN0b3J5Q29udHJhY3QuaW5pdEJveGVkQ29udHJhY3Rbcm91dGluZ10oKSAtPiB2b2lkOgppbml0Qm94ZWRDb250cmFjdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjQyCiAgICAvLyBpbml0Qm94ZWRDb250cmFjdCh2ZXJzaW9uOiBzdHJpbmcsIHNpemU6IHVpbnQ2NCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czozNAogICAgLy8gY2hpbGRDb250cmFjdFZlcnNpb24gPSBHbG9iYWxTdGF0ZTxzdHJpbmc+KHsga2V5OiBCYXNlRmFjdG9yeUdsb2JhbFN0YXRlS2V5Q2hpbGRDb250cmFjdFZlcnNpb24gfSkKICAgIGJ5dGVjIDEwIC8vICJjaGlsZF9jb250cmFjdF92ZXJzaW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NDMKICAgIC8vIHRoaXMuY2hpbGRDb250cmFjdFZlcnNpb24udmFsdWUgPSB2ZXJzaW9uCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MzgKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjQ0CiAgICAvLyBpZiAoIXRoaXMuYm94ZWRDb250cmFjdC5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGluaXRCb3hlZENvbnRyYWN0X2Vsc2VfYm9keUA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo0NQogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICB0eG4gU2VuZGVyCiAgICBnbG9iYWwgQ3JlYXRvckFkZHJlc3MKICAgID09CiAgICBibnogaW5pdEJveGVkQ29udHJhY3RfYWZ0ZXJfYXNzZXJ0QDQKICAgIGJ5dGVjIDYgLy8gIkVSUjpOREFPIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5EQU8KCmluaXRCb3hlZENvbnRyYWN0X2FmdGVyX2Fzc2VydEA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MzgKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjQ2CiAgICAvLyB0aGlzLmJveGVkQ29udHJhY3QuY3JlYXRlKHsgc2l6ZSB9KQogICAgc3dhcAogICAgYm94X2NyZWF0ZQogICAgcG9wCgppbml0Qm94ZWRDb250cmFjdF9hZnRlcl9pZl9lbHNlQDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo0MgogICAgLy8gaW5pdEJveGVkQ29udHJhY3QodmVyc2lvbjogc3RyaW5nLCBzaXplOiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmluaXRCb3hlZENvbnRyYWN0X2Vsc2VfYm9keUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NDgKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWMgNCAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NDgKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IGluaXRCb3hlZENvbnRyYWN0X2FmdGVyX2Fzc2VydEA3CiAgICBieXRlYyA2IC8vICJFUlI6TkRBTyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOREFPCgppbml0Qm94ZWRDb250cmFjdF9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjM4CiAgICAvLyBib3hlZENvbnRyYWN0ID0gQm94PGJ5dGVzPih7IGtleTogQm94S2V5Qm94ZWRDb250cmFjdCB9KQogICAgYnl0ZWNfMSAvLyAiYmMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo0OQogICAgLy8gdGhpcy5ib3hlZENvbnRyYWN0LnJlc2l6ZShzaXplKQogICAgc3dhcAogICAgYm94X3Jlc2l6ZQogICAgYiBpbml0Qm94ZWRDb250cmFjdF9hZnRlcl9pZl9lbHNlQDgKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo6RmFjdG9yeUNvbnRyYWN0LmxvYWRCb3hlZENvbnRyYWN0W3JvdXRpbmddKCkgLT4gdm9pZDoKbG9hZEJveGVkQ29udHJhY3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1MwogICAgLy8gbG9hZEJveGVkQ29udHJhY3Qob2Zmc2V0OiB1aW50NjQsIGRhdGE6IGJ5dGVzKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTQKICAgIC8vIGNvbnN0IGV4cGVjdGVkUHJldmlvdXNDYWxsczogdWludDY0ID0gb2Zmc2V0IC8gMjAzMgogICAgcHVzaGludCAyMDMyCiAgICAvCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1NQogICAgLy8gY29uc3QgdHhuID0gZ3R4bi5UcmFuc2FjdGlvbihUeG4uZ3JvdXBJbmRleCAtIGV4cGVjdGVkUHJldmlvdXNDYWxscyAtIDEpCiAgICB0eG4gR3JvdXBJbmRleAogICAgc3dhcAogICAgLQogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTcKICAgIC8vIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18yIC8vIDYKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1Ny01OAogICAgLy8gdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwKICAgIC8vICYmIHR4bi5hcHBJZCA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkCiAgICBieiBsb2FkQm94ZWRDb250cmFjdF9ib29sX2ZhbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjU4CiAgICAvLyAmJiB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZAogICAgZGlnIDIKICAgIGd0eG5zIEFwcGxpY2F0aW9uSUQKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25JRAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjU3LTU4CiAgICAvLyB0eG4udHlwZSA9PT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbAogICAgLy8gJiYgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQKICAgIGJ6IGxvYWRCb3hlZENvbnRyYWN0X2Jvb2xfZmFsc2VAOAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTkKICAgIC8vICYmIHR4bi5udW1BcHBBcmdzID09PSAzCiAgICBkaWcgMgogICAgZ3R4bnMgTnVtQXBwQXJncwogICAgcHVzaGludCAzCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTctNTkKICAgIC8vIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsCiAgICAvLyAmJiB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZAogICAgLy8gJiYgdHhuLm51bUFwcEFyZ3MgPT09IDMKICAgIGJ6IGxvYWRCb3hlZENvbnRyYWN0X2Jvb2xfZmFsc2VAOAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjAKICAgIC8vICYmIHR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcAogICAgZGlnIDIKICAgIGd0eG5zIE9uQ29tcGxldGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTctNjAKICAgIC8vIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsCiAgICAvLyAmJiB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZAogICAgLy8gJiYgdHhuLm51bUFwcEFyZ3MgPT09IDMKICAgIC8vICYmIHR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcAogICAgYm56IGxvYWRCb3hlZENvbnRyYWN0X2Jvb2xfZmFsc2VAOAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjEKICAgIC8vICYmIHR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcih0aGlzLmluaXRCb3hlZENvbnRyYWN0KQogICAgZGlnIDIKICAgIGd0eG5zYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgYnl0ZWMgMTUgLy8gbWV0aG9kICJpbml0Qm94ZWRDb250cmFjdChzdHJpbmcsdWludDY0KXZvaWQiCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTctNjEKICAgIC8vIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsCiAgICAvLyAmJiB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZAogICAgLy8gJiYgdHhuLm51bUFwcEFyZ3MgPT09IDMKICAgIC8vICYmIHR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcAogICAgLy8gJiYgdHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKHRoaXMuaW5pdEJveGVkQ29udHJhY3QpCiAgICBieiBsb2FkQm94ZWRDb250cmFjdF9ib29sX2ZhbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjYyCiAgICAvLyAmJiB0eG4uc2VuZGVyID09PSBUeG4uc2VuZGVyCiAgICBkaWcgMgogICAgZ3R4bnMgU2VuZGVyCiAgICB0eG4gU2VuZGVyCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTctNjIKICAgIC8vIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsCiAgICAvLyAmJiB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZAogICAgLy8gJiYgdHhuLm51bUFwcEFyZ3MgPT09IDMKICAgIC8vICYmIHR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcAogICAgLy8gJiYgdHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKHRoaXMuaW5pdEJveGVkQ29udHJhY3QpCiAgICAvLyAmJiB0eG4uc2VuZGVyID09PSBUeG4uc2VuZGVyCiAgICBieiBsb2FkQm94ZWRDb250cmFjdF9ib29sX2ZhbHNlQDgKICAgIGludGNfMSAvLyAxCgpsb2FkQm94ZWRDb250cmFjdF9ib29sX21lcmdlQDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1Ni02MwogICAgLy8gbG9nZ2VkQXNzZXJ0KCgKICAgIC8vICAgdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwKICAgIC8vICAgJiYgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQKICAgIC8vICAgJiYgdHhuLm51bUFwcEFyZ3MgPT09IDMKICAgIC8vICAgJiYgdHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wCiAgICAvLyAgICYmIHR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcih0aGlzLmluaXRCb3hlZENvbnRyYWN0KQogICAgLy8gICAmJiB0eG4uc2VuZGVyID09PSBUeG4uc2VuZGVyCiAgICAvLyApLCBFUlJfSU5WQUxJRF9DQUxMX09SREVSKQogICAgYm56IGxvYWRCb3hlZENvbnRyYWN0X2FmdGVyX2Fzc2VydEAxMQogICAgcHVzaGJ5dGVzICJFUlI6SUNPUiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJQ09SCgpsb2FkQm94ZWRDb250cmFjdF9hZnRlcl9hc3NlcnRAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czozOAogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjQKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmJveGVkQ29udHJhY3QuZXhpc3RzLCBFUlJfQ09OVFJBQ1RfTk9UX1NFVCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGxvYWRCb3hlZENvbnRyYWN0X2FmdGVyX2Fzc2VydEAxMwogICAgYnl0ZWMgMTMgLy8gIkVSUjpDTlNUIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkNOU1QKCmxvYWRCb3hlZENvbnRyYWN0X2FmdGVyX2Fzc2VydEAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjM4CiAgICAvLyBib3hlZENvbnRyYWN0ID0gQm94PGJ5dGVzPih7IGtleTogQm94S2V5Qm94ZWRDb250cmFjdCB9KQogICAgYnl0ZWNfMSAvLyAiYmMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo2NQogICAgLy8gdGhpcy5ib3hlZENvbnRyYWN0LnJlcGxhY2Uob2Zmc2V0LCBkYXRhKQogICAgY292ZXIgMgogICAgYm94X3JlcGxhY2UKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjUzCiAgICAvLyBsb2FkQm94ZWRDb250cmFjdChvZmZzZXQ6IHVpbnQ2NCwgZGF0YTogYnl0ZXMpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmxvYWRCb3hlZENvbnRyYWN0X2Jvb2xfZmFsc2VAODoKICAgIGludGNfMCAvLyAwCiAgICBiIGxvYWRCb3hlZENvbnRyYWN0X2Jvb2xfbWVyZ2VAOQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjpGYWN0b3J5Q29udHJhY3QuZGVsZXRlQm94ZWRDb250cmFjdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmRlbGV0ZUJveGVkQ29udHJhY3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo2OQogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyA0IC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo2OQogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogZGVsZXRlQm94ZWRDb250cmFjdF9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNiAvLyAiRVJSOk5EQU8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TkRBTwoKZGVsZXRlQm94ZWRDb250cmFjdF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjM4CiAgICAvLyBib3hlZENvbnRyYWN0ID0gQm94PGJ5dGVzPih7IGtleTogQm94S2V5Qm94ZWRDb250cmFjdCB9KQogICAgYnl0ZWNfMSAvLyAiYmMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo3MAogICAgLy8gdGhpcy5ib3hlZENvbnRyYWN0LmRlbGV0ZSgpCiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjY4CiAgICAvLyBkZWxldGVCb3hlZENvbnRyYWN0KCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpBa2l0YUZlZUdlbmVyYXRvckNvbnRyYWN0V2l0aE9wdEluLm9wdEluW3JvdXRpbmddKCkgLT4gdm9pZDoKb3B0SW46CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTQKICAgIC8vIG9wdEluKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYXNzZXQ6IEFzc2V0KTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cG4gMgogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE5NgogICAgLy8gY29uc3QgZXNjcm93ID0gY2xvbmUodGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4MgogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlY18yIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTYKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGNsb25lKHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBjb3ZlciA1CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTcKICAgIC8vIGNvbnN0IGNvdW50ID0gc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIGVzY3Jvdy5hcHAuYWRkcmVzcywgYXNzZXQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTcKICAgIC8vIGNvbnN0IGNvdW50ID0gc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIGVzY3Jvdy5hcHAuYWRkcmVzcywgYXNzZXQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgc3dhcAogICAgaW50Y18zIC8vIDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgc3BsaXRPcHRJbkNvdW50CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTkKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgRVJSX0lOVkFMSURfUEFZTUVOVF9SRUNFSVZFUikKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBvcHRJbl9hZnRlcl9hc3NlcnRAMwogICAgcHVzaGJ5dGVzICJFUlI6SVBNUiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUE1SCgpvcHRJbl9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjIwMAogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiAoMSArIGNvdW50KSwgRVJSX0lOVkFMSURfUEFZTUVOVF9BTU9VTlQpCiAgICBzd2FwCiAgICBndHhucyBBbW91bnQKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgaW50Y18xIC8vIDEKICAgIGRpZyAzCiAgICArCiAgICAqCiAgICA9PQogICAgYm56IG9wdEluX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjpJUE1BIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQTUEKCm9wdEluX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjAyLTIwOAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IDAsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjIwNAogICAgLy8gYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgZGlnIDMKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMDUKICAgIC8vIGFzc2V0QW1vdW50OiAwLAogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjAyLTIwNwogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IDAsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldAogICAgLy8gICB9KQogICAgcHVzaGludCA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjIwMi0yMDgKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjE1CiAgICAvLyBpZiAoY291bnQgPiAwICYmIGVzY3Jvdy5uYW1lICE9PSAnJykgewogICAgYnogb3B0SW5fYWZ0ZXJfaWZfZWxzZUA5CiAgICBkdXBuIDIKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgZGlnIDEKICAgIGxlbgogICAgc3Vic3RyaW5nMwogICAgZXh0cmFjdCAyIDAKICAgIHB1c2hieXRlcyAiIgogICAgIT0KICAgIGJ6IG9wdEluX2FmdGVyX2lmX2Vsc2VAOQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjE2CiAgICAvLyB0aGlzLm9wdEFraXRhRXNjcm93SW5BbmRTZW5kKGFzc2V0LCAwKQogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBjYWxsc3ViIG9wdEFraXRhRXNjcm93SW5BbmRTZW5kCiAgICBwb3AKCm9wdEluX2FmdGVyX2lmX2Vsc2VAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE5NAogICAgLy8gb3B0SW4ocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBhc3NldDogQXNzZXQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6QWtpdGFGZWVHZW5lcmF0b3JDb250cmFjdFdpdGhPcHRJbi5vcHRJbkNvc3Rbcm91dGluZ10oKSAtPiB2b2lkOgpvcHRJbkNvc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMjAKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjIyMgogICAgLy8gY29uc3QgY291bnQgPSBzcGxpdE9wdEluQ291bnQodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywgYXNzZXQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMjIKICAgIC8vIGNvbnN0IGNvdW50ID0gc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsIGFzc2V0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4MgogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlY18yIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMjIKICAgIC8vIGNvbnN0IGNvdW50ID0gc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsIGFzc2V0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMyAvLyAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgdW5jb3ZlciAyCiAgICBjYWxsc3ViIHNwbGl0T3B0SW5Db3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjIzCiAgICAvLyByZXR1cm4gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogKDEgKyBjb3VudCkKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgaW50Y18xIC8vIDEKICAgIHVuY292ZXIgMgogICAgKwogICAgKgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjIwCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGl0b2IKICAgIGJ5dGVjIDUgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6QWtpdGFCYXNlRmVlR2VuZXJhdG9yQ29udHJhY3RXaXRob3V0QWtpdGFPcHRJbi51cGRhdGVBa2l0YURBT0VzY3Jvd1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZUFraXRhREFPRXNjcm93OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODQKICAgIC8vIHVwZGF0ZUFraXRhREFPRXNjcm93KGNvbmZpZzogRXNjcm93Q29uZmlnKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXBuIDIKICAgIGxlbgogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBwdXNoaW50IDEwCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDAgb2YgKChsZW4rdXRmOFtdKSx1aW50NjQpCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGRpZyAyCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAxMgogICAgKwogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkVzY3Jvd0NvbmZpZwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODUKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWMgNCAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODUKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IHVwZGF0ZUFraXRhREFPRXNjcm93X2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA2IC8vICJFUlI6TkRBTyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOREFPCgp1cGRhdGVBa2l0YURBT0VzY3Jvd19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjgyCiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjXzIgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg2CiAgICAvLyB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlID0gY2xvbmUoY29uZmlnKQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg0CiAgICAvLyB1cGRhdGVBa2l0YURBT0VzY3Jvdyhjb25maWc6IEVzY3Jvd0NvbmZpZyk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpVcGdyYWRlYWJsZUFraXRhQmFzZUNvbnRyYWN0LnVwZGF0ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ2CiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiBbJ1VwZGF0ZUFwcGxpY2F0aW9uJ10gfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyA0IC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogdXBkYXRlX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA2IC8vICJFUlI6TkRBTyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOREFPCgp1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OQogICAgLy8gY29uc3QgdXBkYXRlUGx1Z2luID0gZ2V0UGx1Z2luQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS51cGRhdGUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ5CiAgICAvLyBjb25zdCB1cGRhdGVQbHVnaW4gPSBnZXRQbHVnaW5BcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnVwZGF0ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTQKICAgIC8vIGNvbnN0IFtwbHVnaW5BcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzUGx1Z2luQXBwTGlzdCkpCiAgICBieXRlYyAyNSAvLyAicGFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDkKICAgIC8vIGNvbnN0IHVwZGF0ZVBsdWdpbiA9IGdldFBsdWdpbkFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkudXBkYXRlCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTAKICAgIC8vIGxvZ2dlZEFzc2VydChHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25JZCA9PT0gdXBkYXRlUGx1Z2luLCBFUlJfSU5WQUxJRF9VUEdSQURFKQogICAgZ2xvYmFsIENhbGxlckFwcGxpY2F0aW9uSUQKICAgID09CiAgICBibnogdXBkYXRlX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjpJVVBHIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklVUEcKCnVwZGF0ZV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI1CiAgICAvLyB2ZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogR2xvYmFsU3RhdGVLZXlWZXJzaW9uIH0pCiAgICBieXRlYyAxNiAvLyAidmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUxCiAgICAvLyB0aGlzLnZlcnNpb24udmFsdWUgPSBuZXdWZXJzaW9uCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDYKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpBa2l0YUJhc2VDb250cmFjdC51cGRhdGVBa2l0YURBT1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZUFraXRhREFPOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzYKICAgIC8vIHVwZGF0ZUFraXRhREFPKGFraXRhREFPOiBBcHBsaWNhdGlvbik6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM3CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjIDQgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM3CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGJueiB1cGRhdGVBa2l0YURBT19hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNiAvLyAiRVJSOk5EQU8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TkRBTwoKdXBkYXRlQWtpdGFEQU9fYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM4CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlID0gYWtpdGFEQU8KICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozNgogICAgLy8gdXBkYXRlQWtpdGFEQU8oYWtpdGFEQU86IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkFraXRhQmFzZUZlZUdlbmVyYXRvckNvbnRyYWN0Lm9wdEFraXRhRXNjcm93SW5BbmRTZW5kKGFzc2V0OiB1aW50NjQsIGFtb3VudDogdWludDY0KSAtPiB1aW50NjQ6Cm9wdEFraXRhRXNjcm93SW5BbmRTZW5kOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTE1CiAgICAvLyBwcm90ZWN0ZWQgb3B0QWtpdGFFc2Nyb3dJbkFuZFNlbmQoYXNzZXQ6IEFzc2V0LCBhbW91bnQ6IHVpbnQ2NCk6IHVpbnQ2NCB7CiAgICBwcm90byAyIDEKICAgIHB1c2hieXRlcyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGR1cAogICAgYnl0ZWMgNCAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NAogICAgLy8gY29uc3QgW3BsdWdpbkFwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNQbHVnaW5BcHBMaXN0KSkKICAgIGR1cAogICAgYnl0ZWMgMjUgLy8gInBhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjExOAogICAgLy8gY29uc3QgeyByZXZlbnVlTWFuYWdlciB9ID0gZ2V0UGx1Z2luQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgZHVwCiAgICBleHRyYWN0IDggOAogICAgY292ZXIgMgogICAgcHVzaGludCA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTIwCiAgICAvLyBjb25zdCBlc2Nyb3cgPSBjbG9uZSh0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjgyCiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjXzIgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEyMAogICAgLy8gY29uc3QgZXNjcm93ID0gY2xvbmUodGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBzd2FwCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGNvdmVyIDMKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEyMQogICAgLy8gY29uc3QgeyBpZCB9ID0gdGhpcy5nZXRFc2Nyb3coZXNjcm93Lm5hbWUpCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgZGlnIDEKICAgIGxlbgogICAgc3Vic3RyaW5nMwogICAgZHVwCiAgICBjb3ZlciAzCiAgICBleHRyYWN0IDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgc3dhcAogICAgYnl0ZWMgNCAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OTUtOTgKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9nZXRFc2Nyb3dzPih7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbW25hbWVdXSwKICAgIC8vIH0pLnJldHVyblZhbHVlWzBdCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo5NwogICAgLy8gYXJnczogW1tuYW1lXV0sCiAgICBpbnRjXzEgLy8gMQogICAgaXRvYgogICAgY292ZXIgMgogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHB1c2hieXRlcyAweDAwMDEwMDAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OTUtOTgKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9nZXRFc2Nyb3dzPih7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbW25hbWVdXSwKICAgIC8vIH0pLnJldHVyblZhbHVlWzBdCiAgICBwdXNoYnl0ZXMgMHgzYWIyODk1YiAvLyBtZXRob2QgImFyYzU4X2dldEVzY3Jvd3Moc3RyaW5nW10pKHVpbnQ2NCxhZGRyZXNzLGJvb2wpW10iCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGludGNfMiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIGRpZyAxCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWMgNSAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgNDEKICAgICoKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxzbWFydF9jb250cmFjdHMvYXJjNTgvYWNjb3VudC90eXBlcy50czo6RXNjcm93SW5mbz4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEwMAogICAgLy8gbG9nZ2VkQXNzZXJ0KGVzY3Jvdy5pZCAhPT0gMCwgRVJSX0VTQ1JPV19ET0VTX05PVF9FWElTVCkKICAgIGV4dHJhY3QgNiA0MQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGJueiBvcHRBa2l0YUVzY3Jvd0luQW5kU2VuZF9hZnRlcl9hc3NlcnRANwogICAgcHVzaGJ5dGVzICJFUlI6TkVTQyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpORVNDCgpvcHRBa2l0YUVzY3Jvd0luQW5kU2VuZF9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEyMgogICAgLy8gbG9nZ2VkQXNzZXJ0KGlkID09PSBlc2Nyb3cuYXBwLmlkLCBFUlJfV1JPTkdfRVNDUk9XX0ZPUl9PUEVSQVRJT04pCiAgICB1bmNvdmVyIDIKICAgIGludGNfMyAvLyAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBmcmFtZV9idXJ5IDAKICAgID09CiAgICBibnogb3B0QWtpdGFFc2Nyb3dJbkFuZFNlbmRfYWZ0ZXJfYXNzZXJ0QDIKICAgIHB1c2hieXRlcyAiRVJSOldFU0MiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6V0VTQwoKb3B0QWtpdGFFc2Nyb3dJbkFuZFNlbmRfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMjQtMTMzCiAgICAvLyBpdHhuQ29tcG9zZS5iZWdpbjx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X3Jla2V5VG9QbHVnaW4+KHsKICAgIC8vICAgYXBwSWQ6IHdhbGxldCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHJldmVudWVNYW5hZ2VyLAogICAgLy8gICAgIENhbGxlclR5cGVHbG9iYWwsCiAgICAvLyAgICAgZXNjcm93Lm5hbWUsCiAgICAvLyAgICAgWzBdLCAvLyBhbGwgdGhlIGFraXRhIGVzY3Jvd3MgaGF2ZSBtZXRob2QgcmVzdHJpY3Rpb25zIHdpdGggb3B0aW4gYmVpbmcgaW5kZXggMAogICAgLy8gICAgIFtdCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgdW5jb3ZlciAzCiAgICBkdXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgcHVzaGJ5dGVzIDB4NWFkZjMzOGYgLy8gbWV0aG9kICJhcmM1OF9yZWtleVRvUGx1Z2luKHVpbnQ2NCx1aW50NjQsc3RyaW5nLHVpbnQ2NFtdLCh1aW50NjQsdWludDY0KVtdKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMzAKICAgIC8vIFswXSwgLy8gYWxsIHRoZSBha2l0YSBlc2Nyb3dzIGhhdmUgbWV0aG9kIHJlc3RyaWN0aW9ucyB3aXRoIG9wdGluIGJlaW5nIGluZGV4IDAKICAgIHB1c2hieXRlcyAweDAwMDEwMDAwMDAwMDAwMDAwMDAwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTMxCiAgICAvLyBbXQogICAgcHVzaGJ5dGVzIDB4MDAwMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEyNC0xMzMKICAgIC8vIGl0eG5Db21wb3NlLmJlZ2luPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfcmVrZXlUb1BsdWdpbj4oewogICAgLy8gICBhcHBJZDogd2FsbGV0LAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgcmV2ZW51ZU1hbmFnZXIsCiAgICAvLyAgICAgQ2FsbGVyVHlwZUdsb2JhbCwKICAgIC8vICAgICBlc2Nyb3cubmFtZSwKICAgIC8vICAgICBbMF0sIC8vIGFsbCB0aGUgYWtpdGEgZXNjcm93cyBoYXZlIG1ldGhvZCByZXN0cmljdGlvbnMgd2l0aCBvcHRpbiBiZWluZyBpbmRleCAwCiAgICAvLyAgICAgW10KICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBpbnRjXzIgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMzYKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMzYKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTM3CiAgICAvLyBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICBmcmFtZV9kaWcgMAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMzUtMTM5CiAgICAvLyBjb25zdCBvcHRJbkNvdW50ID0gc3BsaXRPcHRJbkNvdW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgIGFzc2V0CiAgICAvLyApCiAgICBmcmFtZV9kaWcgLTIKICAgIGNhbGxzdWIgc3BsaXRPcHRJbkNvdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNDEKICAgIC8vIGNvbnN0IG1ickFtb3VudDogdWludDY0ID0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogb3B0SW5Db3VudAogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICAqCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0My0xNTQKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIFJldmVudWVNYW5hZ2VyUGx1Z2luU3R1Yi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJldmVudWVNYW5hZ2VyLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgW2Fzc2V0LmlkXSwKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTUwCiAgICAvLyByZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgc3dhcAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0OS0xNTIKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTQzLTE1NAogICAgLy8gaXR4bkNvbXBvc2UubmV4dDx0eXBlb2YgUmV2ZW51ZU1hbmFnZXJQbHVnaW5TdHViLnByb3RvdHlwZS5vcHRJbj4oewogICAgLy8gICBhcHBJZDogcmV2ZW51ZU1hbmFnZXIsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICB3YWxsZXQsCiAgICAvLyAgICAgdHJ1ZSwKICAgIC8vICAgICBbYXNzZXQuaWRdLAogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtYnJBbW91bnQKICAgIC8vICAgICB9KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNDYKICAgIC8vIHdhbGxldCwKICAgIGR1cAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTQ4CiAgICAvLyBbYXNzZXQuaWRdLAogICAgZnJhbWVfZGlnIC0yCiAgICBpdG9iCiAgICBwdXNoYnl0ZXMgMHgwMDAxCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHVuY292ZXIgNAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNDMtMTU0CiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBSZXZlbnVlTWFuYWdlclBsdWdpblN0dWIucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHdhbGxldCwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIFthc3NldC5pZF0sCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gICAgIH0pCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBwdXNoYnl0ZXMgMHg2ODM1ZTNiYyAvLyBtZXRob2QgIm9wdEluKHVpbnQ2NCxib29sLHVpbnQ2NFtdLHBheSl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNDcKICAgIC8vIHRydWUsCiAgICBwdXNoYnl0ZXMgMHg4MAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNDMtMTU0CiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBSZXZlbnVlTWFuYWdlclBsdWdpblN0dWIucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHdhbGxldCwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIFthc3NldC5pZF0sCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gICAgIH0pCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpbnRjXzIgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNTYKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF92ZXJpZnlBdXRoQWRkcmVzcz4oeyBhcHBJZDogd2FsbGV0IH0pCiAgICBpdHhuX25leHQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgcHVzaGJ5dGVzIDB4NmNjM2Y2MDYgLy8gbWV0aG9kICJhcmM1OF92ZXJpZnlBdXRoQWRkcmVzcygpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpbnRjXzIgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNTgKICAgIC8vIGlmIChhbW91bnQgPiAwKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ6IG9wdEFraXRhRXNjcm93SW5BbmRTZW5kX2FmdGVyX2lmX2Vsc2VANAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTU5LTE2NQogICAgLy8gaXR4bkNvbXBvc2UubmV4dCgKICAgIC8vICAgaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0LAogICAgLy8gICB9KQogICAgLy8gKQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNjEKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIGZyYW1lX2RpZyAwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBmcmFtZV9kaWcgLTIKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBmcmFtZV9kaWcgLTEKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTYwLTE2NAogICAgLy8gaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgYXNzZXRSZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgLy8gICBhc3NldEFtb3VudDogYW1vdW50LAogICAgLy8gICB4ZmVyQXNzZXQ6IGFzc2V0LAogICAgLy8gfSkKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCgpvcHRBa2l0YUVzY3Jvd0luQW5kU2VuZF9hZnRlcl9pZl9lbHNlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNjgKICAgIC8vIGl0eG5Db21wb3NlLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTcwCiAgICAvLyByZXR1cm4gbWJyQW1vdW50CiAgICBzd2FwCiAgICByZXRzdWIK", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyAHAAEGAriLBJSWLtCGAyYaCWFraXRhX2RhbwJiYwxha2l0YV9lc2Nyb3cIRVJSOklQQVkGd2FsbGV0BBUffHUIRVJSOk5EQU8IRVJSOk5BTFMGZnVuZGVyA2FhbBZjaGlsZF9jb250cmFjdF92ZXJzaW9uB2dhdGVfaWQIRVJSOklYRlIIRVJSOkNOU1QEPqEYMgTFOzLMB3ZlcnNpb24IRVJSOlBSTE8EC4EBQwR7UOqMBK35KuQIRVJSOkZHVEUEahY5PQhFUlI6SEdURQQXHJ+IA3BhbIAE6pGA3TYaAI4BAIkxGRREMRhBAHKCBwTi+p4hBIHcUWoEbpA1zARdemF3BNqpdRYEAs+xzwTJfbsuJw+CBwTcothiBNNGsaQEOU6usgQz94gIBK6Ey9gEM+kslASFTe3gNhoAjg8BkASRBs8HiAgZCOUJiQnYCisKsArKC1sLhgwEAAEAI0OABIEVNig2GgCOAQEoADEZgQQSMRgQREILn4oBATEAi/9AAAGJSIv/gBJjb250cm9sbGVkX2FkZHJlc3NlSImKAgGL/oADb2FsZUiBGFuxshiABDwabzOyGov/shokshAisgGztD5JVwQASwFXAAQnBRJESSJZJQhMFRJEVwYASRVJTgJBAAiLAIEIE0EABEgiTIkXQv/6igQBi/w4GIv9JwllSIEoWxJBADmL/DgZQAAyi/w4G4EEEkEAKIv8ORoAgARDkiZVEkEAGYv8ORoBi/4SQQAOi/w5GgKL/xYSQQACI4kiiYoCAYv/QQAYi/4nCWVIgQhbcghEi/9wAEUBQAADMhCJIomKAwEii/6L/3AARQFAABqL/YAOcmV2ZW51ZV9zcGxpdHNlSCJZIwiMAIsATIk2GgFJIlklCEsBFRJEVwIANhoCSSJZJQhLARUSRFcCADYaA0kVgQgSRBc2GgRJFUsBIllJgQoSREsCTEsCUiJZgQwIEkQnEE8EZycKTwNnKE8CZypMZyNDIoAASTEWJQlJOBAjEkQxFiMJSTgQgQQSRDYaAUlOA0kVgQgSRBc2GgJJTgRJFYEIEkQXTgM2GgNJTgQVgQgSRDYaBElOBBWBIBJENhoFSU4EFYEIEkQ2GgZJTgQVgSASRDYaB0lOBEkiWSUITBUSRDYaCElOBEkiWUlOBYEgCyUITBUSRIEED0AABCcRsAApvUUBQAAEJw2wAEsJQAJZMhBFDSIoZURLATgRSU4CiP6oIQQITEsLQAIpTCEECExLC0ACByIyAUsQCEsDCAghBQhMSwQ4BzIKEkAAAyuwAEsEOAhLAhJAAAMrsABLAzgAMQASQAADK7AASwM4FDIKEkAAAyuwAE8DOBJJTgVAAAMrsAAiKGVMTgJEIkUSSwZAAS9FAYGIJ0URKb1EKSJPArqxSwEWMQBPBjgATwUWUEsSFiInCmVESRUWVwYCTFAiKGVEFiIqZUQjsjgksjWBCbI0IrIZJxKyQk8HskAnE7IaSwayGoABALIaSxOyGksSshpLELIaTwWyGk8EshpLDbIaTwOyGksLshpLCrIaTwKyGkyyGrIaJLIQIrIBs7cAPUlOA7FJcghEMgFPBgiyCLIHI7IQIrIBs7FJcghEMhCyCLIHI7IQIrIBtiKyGUmyGCcOshpMshokshAisgGzsXIIREyyEU8CshKyFIEEshAisgGzSwhBAECxRwJyCERLDbIIsgcjshAisgG2IrIZshgnDrIaSwmyGiSyECKyAbMiKmVEJVtyCERLCXAARQFAAAdLCCKICFBIFicFTFCwI0OxRwJxC0RMFgEBIxZPBCcJZUiBSFuyGIAEDPG5z7IaTwKyGksJshpMshpLB7IashqACQAHcm95YWx0ebIaJLIQIrIBs7Q+SVcEAEsBVwAEJwUSREkiWSUITBUSRFcGAElFExVBAAVLERdFEUsQIQYNQf5lIQZFEUL+XjIQIihlRCIqZUQlW3IIREsOiPycC0L94iIoZURLDIj8bYGYuRQITwIITEL9xzIQJQtFDUL9ooAAMRYlCUk4ECQSRDEWIwlJTgI4ECMSRDYaAUlOA0kVgQgSRBc2GgJJTgVJFYEIEkQXTgQ2GgNJTgQVgQgSRDYaBElOBBWBIBJENhoFSU4EFYEIEkQ2GgZJTgQVgSASRIEED0AABCcRsAApvUUBQAAEJw2wAEk5GgAnFBJBAbtJOBlAAbUjQAAMgAhFUlI6Qk1QVLAAIihlREw4GElOAklyB0RPAicJZUiBGFtyCEQSRIAFb3duZXJlSDIKEkAADIAIRVJSOk5QQk+wAEsHQAFiIkUKSwdAAUghBExLCEABKCIyAUsMCEsDCAghBQhMSwM4BzIKEkAAAyuwAEsDOAhLAhJAAAMrsAApvUQpIk8CurFLARYxAE8GOABPBRZQIhYiJwplREkVFlcGAkxQIihlRBYiKmVEI7I4JLI1gQmyNCKyGScSskJPB7JAJxOyGk8GshqAAYCyGk8MshpLDbIaTwuyGk8FshpPBLIaTwiyGk8DshpPBrIaTwWyGk8CshpMshqyGiSyECKyAbO3AD1JTgKxSXIIRDIBTwUIsgiyByOyECKyAbOxcghETLIYJxSyGrIaJLIQIrIBs0sBQQBAsUcCcghESwWyCLIHI7IQIrIBtiKyGbIYJw6yGksCshokshAisgGzIiplRCVbcghESwJwAEUBQAAHSwEiiAWXSBYnBUxQsCNDMhAiKGVEIiplRCVbcghESwuI+l0LQv7BIihlREsIiPougeCtEAhMQv6pMhBFCkL+miJC/kgxFiUJSTgQIxJEMRYjCUlOAjgQJBJENhoBSRWBCBJEF0k2GgJJTgMVgSASRCIoZUQxAIj5Poj5FkxyB0QyChJAAAQnB7AASwEnC2VIIihlRE8GTE8DTwOI+XFAAAQnFbAASwI4BzIKEkAAAyuwAEknCGVISVcAIEyBIFuxSwJyCERPBTgIsgiyByOyECKyAbYxAIEFshlPA7IYJxayGrIaTwKyGiSyECKyAbOxsgiyByOyECKyAbMjQzEWIwlJOBAjEkQ2GgFJFYEIEkQXSTYaAklOAxWBIBJEcgdEMgoSQAAEJwewAEknC2VIQQAEJxewAEsCOAcyChJAAAMrsABJJwhlSElXACBMgSBbsUsCcghETwU4CLIIsgcjshAisgG2MQCBBbIZTwOyGCcWshqyGk8CshokshAisgGzsbIIsgcjshAisgGzI0MxFiUJSTgQgQQSRDEWIwlJTgI4ECQSRDYaAUkVgQgSRBdJNhoCSU4EFYEgEkQiKGVEMQCI9/OI98tMcgdEMgoSQAAEJwewAEsBJwtlSCIoZURPBkxPA08DiPgmQAAEJxWwAEsBOBQyChJAAAQnDLAASwE4EklAAAQnDLAATEknCGVISVcAIEyBIFuxSwJyCERPBTgRshFPBLISshSBBLIQIrIBtjEAIrIZTwOyGCcYshqyGk8CshokshAisgGzsbIIsgcjshAisgGzI0MxFiMJSTgQgQQSRDYaAUkVgQgSRBdJNhoCSU4EFYEgEkRyB0QyChJAAAQnB7AASScLZUhBAAQnF7AASwE4FDIKEkAABCcMsABLATgSSUAABCcMsABMSScIZUhJVwAgTIEgW7FLAnIIRE8FOBGyEU8EshKyFIEEshAisgG2MQAishlPA7IYJxiyGrIaTwKyGiSyECKyAbOxsgiyByOyECKyAbMjQzYaAUkVgQgSRBdJcgdEMgoSQAAEJwewAEknCGVISVcAIEyBIFuxMQCBBbIZTwOyGIAEaOhjQ7IashokshAisgGzsbIIsgcjshAisgGzI0M2GgFJIlklCEsBFRJEVwIANhoCSRWBCBJEF0wnCkxnKb1FAUAAEjEAMgkSQAAEJwawAClMuUgjQzEAIihlRCcEZUhyCEQSQAAEJwawAClM00L/4zYaAUkVgQgSRBdJNhoCSSJZJQhLARUSRFcCAEyB8A8KMRZMCSMJSU4DOBAkEkEAUUsCOBgyCBJBAEdLAjgbgQMSQQA9SwI4GUAANksCORoAJw8SQQArSwI4ADEAEkEAISNAAAyACEVSUjpJQ09SsAApvUUBQAAEJw2wAClOArsjQyJC/9wxACIoZUQnBGVIcghEEkAABCcGsAApvEgjQzEWIwlHAjgQIxJENhoBSRWBCBJEF0lOAyIqZUxJTgJOBUQiKGVETCVbcghETwKI9hBMOAcyChJAAAyACEVSUjpJUE1SsABMOAgyECNLAwgLEkAADIAIRVJSOklQTUGwALEyCksDshEishKyFIEEshAisgGzQQAYRwIiWUsBFVJXAgCAABNBAAdLASKIANBII0M2GgFJFYEIEkQXIihlRCIqZUQlW3IIRE8CiPWUMhAjTwIICxYnBUxQsCNDNhoBRwIVSwEiWUmBChJETwJMSwJSIlmBDAgSRDEAIihlRCcEZUhyCEQSQAAEJwawACpMZyNDNhoBSSJZJQhLARUSRFcCADEAIihlRCcEZUhyCEQSQAAEJwawACIoZUQnGWVIgRBbMg0SQAAMgAhFUlI6SVVQR7AAJxBMZyNDNhoBSRWBCBJEFzEAIihlRCcEZUhyCEQSQAAEJwawAChMZyNDigIBgAAiKGVESScEZUhMSScZZUhJVwgITgKBCFtOAyIqZUxJTgJOA0RJIllLARVSSU4DVwIATCcEZUhMsSMWTgJJFRZXBgJMUIAEAAEAAkxQTLIYgAQ6solbshqyGiSyECKyAbO0PklXBABLAVcABCcFEkRJIlmBKQslCEwVEkRXBikiW0lAAAyACEVSUjpORVNDsABPAiVbSYwAEkAADIAIRVJSOldFU0OwALFPA0myGIAEWt8zj7IaTwOyGkyyGkyyGoAKAAEAAAAAAAAAALIagAIAALIaJLIQIrIBIihlRIsASU4CcghEi/6I8/QyEAtJTgO2THIIRLIHsggjshAisgG2SRaL/haAAgABTFBPBLIYgARoNeO8shpMshqAAYCyGrIaJLIQIrIBtrIYgARsw/YGshokshAisgGL/0EAF7aLAHIIRIv+shGL/7ISshSBBLIQIrIBs0yJ", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
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
          case "create(string,string,uint64,(string,uint64))void":
            return _MarketplaceParamsFactory.create.create(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs create ABI call params for the Marketplace smart contract using the create(string,string,uint64,(string,uint64))void ABI method
       *
       * @param params Parameters for the call
       * @returns An `AppClientMethodCallParams` object for the call
       */
      create(params) {
        return {
          ...params,
          method: "create(string,string,uint64,(string,uint64))void",
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
    * optIn opts this contract into `asset`. When this contract has a
    named escrow configured (`akitaDAOEscrow.value.name !== ''`), it
    also opts the escrow and every revenue-split recipient in through
    the revenue-manager plugin — so downstream methods (subscribe,
    list, etc.) can transfer to the escrow without doing the plugin-
    rekey dance mid-group.
    
    Payment must cover:
     - this contract's own opt-in (1 × assetOptInMinBalance), plus
     - each downstream opt-in the escrow still needs.
    `splitOptInCount` returns 0 once the escrow is already opted in, so
    the charge collapses to just 1 × assetOptInMinBalance on repeat
    calls and the escrow branch becomes a no-op.
  
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
       * Creates a new instance of the Marketplace smart contract using the create(string,string,uint64,(string,uint64))void ABI method.
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
       * Creates a new instance of the Marketplace smart contract using the create(string,string,uint64,(string,uint64))void ABI method.
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
       * Creates a new instance of the Marketplace smart contract using an ABI method call using the create(string,string,uint64,(string,uint64))void ABI method.
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
        * optIn opts this contract into `asset`. When this contract has a
        named escrow configured (`akitaDAOEscrow.value.name !== ''`), it
        also opts the escrow and every revenue-split recipient in through
        the revenue-manager plugin — so downstream methods (subscribe,
        list, etc.) can transfer to the escrow without doing the plugin-
        rekey dance mid-group.
        
        Payment must cover:
         - this contract's own opt-in (1 × assetOptInMinBalance), plus
         - each downstream opt-in the escrow still needs.
        `splitOptInCount` returns 0 once the escrow is already opted in, so
        the charge collapses to just 1 × assetOptInMinBalance on repeat
        calls and the escrow branch becomes a no-op.
    
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
     * Makes a call to the Marketplace smart contract using the `updateAkitaDAOEscrow((string,uint64))void` ABI method.
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
        * optIn opts this contract into `asset`. When this contract has a
        named escrow configured (`akitaDAOEscrow.value.name !== ''`), it
        also opts the escrow and every revenue-split recipient in through
        the revenue-manager plugin — so downstream methods (subscribe,
        list, etc.) can transfer to the escrow without doing the plugin-
        rekey dance mid-group.
        
        Payment must cover:
         - this contract's own opt-in (1 × assetOptInMinBalance), plus
         - each downstream opt-in the escrow still needs.
        `splitOptInCount` returns 0 once the escrow is already opted in, so
        the charge collapses to just 1 × assetOptInMinBalance on repeat
        calls and the escrow branch becomes a no-op.
    
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
     * Makes a call to the Marketplace smart contract using the `updateAkitaDAOEscrow((string,uint64))void` ABI method.
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
        * optIn opts this contract into `asset`. When this contract has a
        named escrow configured (`akitaDAOEscrow.value.name !== ''`), it
        also opts the escrow and every revenue-split recipient in through
        the revenue-manager plugin — so downstream methods (subscribe,
        list, etc.) can transfer to the escrow without doing the plugin-
        rekey dance mid-group.
        
        Payment must cover:
         - this contract's own opt-in (1 × assetOptInMinBalance), plus
         - each downstream opt-in the escrow still needs.
        `splitOptInCount` returns 0 once the escrow is already opted in, so
        the charge collapses to just 1 × assetOptInMinBalance on repeat
        calls and the escrow branch becomes a no-op.
    
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
     * Makes a call to the Marketplace smart contract using the `updateAkitaDAOEscrow((string,uint64))void` ABI method.
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
   * @param params The params to use for the cloned app client. Omit a param to keep the original value. Set a param to override the original value. Setting to undefined will clear the original value.
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
  newGroup(composerConfig) {
    const client = this;
    const composer = this.algorand.newGroup(composerConfig);
    let promiseChain = Promise.resolve();
    return {
      /**
       * Add a list(pay,axfer,uint64,uint64,uint64,address,uint64,address,string,byte[32][])uint64 method call against the Marketplace contract
       */
      list(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.list(params)));
        return this;
      },
      /**
       * Add a listPrizeBox(appl,pay,uint64,uint64,uint64,address,uint64,address)uint64 method call against the Marketplace contract
       */
      listPrizeBox(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.listPrizeBox(params)));
        return this;
      },
      /**
       * Add a gatedPurchase(pay,appl,uint64,address)void method call against the Marketplace contract
       */
      gatedPurchase(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.gatedPurchase(params)));
        return this;
      },
      /**
       * Add a purchase(pay,uint64,address)void method call against the Marketplace contract
       */
      purchase(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.purchase(params)));
        return this;
      },
      /**
       * Add a gatedPurchaseAsa(axfer,appl,uint64,address)void method call against the Marketplace contract
       */
      gatedPurchaseAsa(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.gatedPurchaseAsa(params)));
        return this;
      },
      /**
       * Add a purchaseAsa(axfer,uint64,address)void method call against the Marketplace contract
       */
      purchaseAsa(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.purchaseAsa(params)));
        return this;
      },
      /**
       * Add a delist(uint64)void method call against the Marketplace contract
       */
      delist(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.delist(params)));
        return this;
      },
      /**
       * Add a initBoxedContract(string,uint64)void method call against the Marketplace contract
       */
      initBoxedContract(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.initBoxedContract(params)));
        return this;
      },
      /**
       * Add a loadBoxedContract(uint64,byte[])void method call against the Marketplace contract
       */
      loadBoxedContract(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.loadBoxedContract(params)));
        return this;
      },
      /**
       * Add a deleteBoxedContract()void method call against the Marketplace contract
       */
      deleteBoxedContract(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.deleteBoxedContract(params)));
        return this;
      },
      /**
       * Add a optIn(pay,uint64)void method call against the Marketplace contract
       */
      optIn(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.optIn(params)));
        return this;
      },
      /**
       * Add a optInCost(uint64)uint64 method call against the Marketplace contract
       */
      optInCost(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.optInCost(params)));
        return this;
      },
      /**
       * Add a updateAkitaDAOEscrow((string,uint64))void method call against the Marketplace contract
       */
      updateAkitaDaoEscrow(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateAkitaDaoEscrow(params)));
        return this;
      },
      /**
       * Add a updateAkitaDAO(uint64)void method call against the Marketplace contract
       */
      updateAkitaDao(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateAkitaDao(params)));
        return this;
      },
      /**
       * Add a opUp()void method call against the Marketplace contract
       */
      opUp(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.opUp(params)));
        return this;
      },
      get update() {
        return {
          update: (params) => {
            promiseChain = promiseChain.then(async () => composer.addAppUpdateMethodCall(await client.params.update.update(params)));
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

// src/generated/ListingClient.ts



var APP_SPEC2 = { "name": "Listing", "structs": { "EscrowConfig": [{ "name": "name", "type": "string" }, { "name": "app", "type": "uint64" }], "FunderInfo": [{ "name": "account", "type": "address" }, { "name": "amount", "type": "uint64" }] }, "methods": [{ "name": "create", "args": [{ "type": "uint64", "name": "prize" }, { "type": "bool", "name": "isPrizeBox" }, { "type": "uint64", "name": "price" }, { "type": "uint64", "name": "paymentAsset" }, { "type": "uint64", "name": "expiration" }, { "type": "address", "name": "seller" }, { "type": "(address,uint64)", "struct": "FunderInfo", "name": "funder" }, { "type": "address", "name": "reservedFor" }, { "type": "uint64", "name": "creatorRoyalty" }, { "type": "uint64", "name": "gateID" }, { "type": "address", "name": "marketplace" }, { "type": "string", "name": "version" }, { "type": "uint64", "name": "akitaDAO" }, { "type": "(string,uint64)", "struct": "EscrowConfig", "name": "akitaDAOEscrow" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "desc": "create the listing application", "events": [], "recommendations": {} }, { "name": "purchase", "args": [{ "type": "pay", "name": "payment", "desc": "- the payment for purchasing the asset" }, { "type": "address", "name": "buyer", "desc": "- the buyer of the asset" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["DeleteApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "purchaseAsa", "args": [{ "type": "axfer", "name": "assetXfer" }, { "type": "address", "name": "buyer" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "delist", "args": [{ "type": "address", "name": "caller" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["DeleteApplication"] }, "readonly": false, "desc": "Deletes the app and returns the asset/mbr to the seller", "events": [], "recommendations": {} }, { "name": "changePrice", "args": [{ "type": "uint64", "name": "price" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "optin", "args": [{ "type": "pay", "name": "payment", "desc": "The payment transaction" }, { "type": "uint64", "name": "asset", "desc": "The asset to be opted into" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "optin tells the contract to opt into an asa", "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 9, "bytes": 6 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "prize": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cHJpemU=", "desc": "the asset for sale: Asset | Application ( Prize Box )" }, "isPrizeBox": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "aXNfcHJpemVfYm94", "desc": "whether or not the prize is an asset or a prize box" }, "price": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cHJpY2U=", "desc": "the price of the asset" }, "paymentAsset": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cGF5bWVudF9hc3NldA==", "desc": "the asset to use for payment" }, "expiration": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "ZXhwaXJhdGlvbg==", "desc": "the timestamp the listing expires on, once this passes all that can be done is delist" }, "seller": { "keyType": "AVMString", "valueType": "address", "key": "c2VsbGVy", "desc": "the address selling the asset" }, "reservedFor": { "keyType": "AVMString", "valueType": "address", "key": "cmVzZXJ2ZWRfZm9y", "desc": "the address the sale is reserved for" }, "creatorRoyalty": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "Y3JlYXRvcl9yb3lhbHR5", "desc": "the amount the creator will get for the sale" }, "gateID": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "Z2F0ZV9pZA==", "desc": "the gate ID to use to check if the user is qualified to buy" }, "marketplace": { "keyType": "AVMString", "valueType": "address", "key": "bWFya2V0cGxhY2U=", "desc": "The address of the marketplace that listed the asset to send the fee to\n\nIMPORTANT: this is a double sided marketplace fee contract\nthe marketplace referred to internally in the contract\nis the listing side marketplace.\nthe buyer side marketplace provides their address at\nthe time of purchase" }, "marketplaceRoyalties": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "bWFya2V0cGxhY2Vfcm95YWx0aWVz", "desc": "the amount the marketplaces will get for the sale" }, "akitaDAOEscrow": { "keyType": "AVMString", "valueType": "EscrowConfig", "key": "YWtpdGFfZXNjcm93", "desc": "the app ID for the akita DAO escrow" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" }, "funder": { "keyType": "AVMString", "valueType": "FunderInfo", "key": "ZnVuZGVy" } }, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": {} } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [463, 615, 736, 2697], "errorMessage": "Bytes has valid prefix" }, { "pc": [2525], "errorMessage": "ERR:FORB" }, { "pc": [1135], "errorMessage": "ERR:IEXP" }, { "pc": [1350, 1364, 1380], "errorMessage": "ERR:IPAY" }, { "pc": [2568], "errorMessage": "ERR:IPMA" }, { "pc": [2547], "errorMessage": "ERR:IPMR" }, { "pc": [1704, 1721], "errorMessage": "ERR:IXFR" }, { "pc": [1310, 1664], "errorMessage": "ERR:LEXP" }, { "pc": [1090, 1264, 1618, 2179], "errorMessage": "ERR:MBFF" }, { "pc": [2431], "errorMessage": "ERR:MBSL" }, { "pc": [2481], "errorMessage": "ERR:NDAO" }, { "pc": [2199], "errorMessage": "ERR:OSCD" }, { "pc": [1283], "errorMessage": "ERR:PAMA" }, { "pc": [1637], "errorMessage": "ERR:PANA" }, { "pc": [1336, 1690], "errorMessage": "ERR:RFDA" }, { "pc": [811, 2604, 2729, 2759], "errorMessage": "IPCT" }, { "pc": [362], "errorMessage": "NCCA" }, { "pc": [2912, 2928], "errorMessage": "account opted into asset" }, { "pc": [398, 484, 504, 516, 526, 637, 1422, 1766, 2465], "errorMessage": "application exists" }, { "pc": [1524, 1544, 1802, 1817, 2120], "errorMessage": "asset exists" }, { "pc": [1205, 1268, 1288, 1296, 1315, 1326, 1372, 1388, 1402, 1416, 1443, 1474, 1485, 1514, 1556, 1622, 1642, 1650, 1669, 1680, 1713, 1729, 1743, 1747, 1760, 1770, 1788, 1799, 1806, 1825, 1843, 1847, 1860, 1869, 1886, 1905, 1923, 1927, 1940, 1944, 1973, 1977, 1981, 2020, 2024, 2063, 2067, 2072, 2111, 2115, 2183, 2203, 2207, 2215, 2225, 2229, 2234, 2246, 2250, 2333, 2343, 2347, 2415, 2452, 2599, 2619, 2634, 2651, 2754, 2776, 2838, 2846, 2873, 2902], "errorMessage": "check GlobalState exists" }, { "pc": [377, 739, 1029, 1076], "errorMessage": "invalid array length header" }, { "pc": [930], "errorMessage": "invalid number of bytes for arc4.bool" }, { "pc": [1037], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [970, 992, 1023, 1241, 1252, 1595, 1606, 2167], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [921, 940, 949, 958, 1e3, 1010, 1049, 2408, 2445, 2504], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [746], "errorMessage": "invalid number of bytes for bytes" }, { "pc": [1081], "errorMessage": "invalid number of bytes for smart_contracts/utils/base-contracts/base.ts::EscrowConfig" }, { "pc": [981], "errorMessage": "invalid number of bytes for smart_contracts/utils/types/mbr.ts::FunderInfo" }, { "pc": [468, 620, 2702], "errorMessage": "invalid number of bytes for uint64" }, { "pc": [1068], "errorMessage": "invalid tail pointer at index 0 of ((len+utf8[]),uint64)" }, { "pc": [1063], "errorMessage": "invalid tuple encoding" }, { "pc": [1586], "errorMessage": "transaction type is axfer" }, { "pc": [1232, 2496], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDggNCAxMDAwMDAgMTg0NDY3NDQwNzM3MDk1NTE2MTUKICAgIGJ5dGVjYmxvY2sgInBheW1lbnRfYXNzZXQiICJzZWxsZXIiICJha2l0YV9kYW8iICJwcml6ZSIgMHgwMDAxICJpc19wcml6ZV9ib3giICJwcmljZSIgImV4cGlyYXRpb24iICJyZXNlcnZlZF9mb3IiICJtYXJrZXRwbGFjZSIgMHgxNTFmN2M3NSAiRVJSOk1CRkYiICJjcmVhdG9yX3JveWFsdHkiICJha2l0YV9lc2Nyb3ciICJtYXJrZXRwbGFjZV9yb3lhbHRpZXMiICJFUlI6SVBBWSIgMHhhZGY5MmFlNCAibmZ0X2ZlZXMiICJFUlI6TEVYUCIgIkVSUjpSRkRBIiAiRVJSOklYRlIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE3LTIxCiAgICAvLyBleHBvcnQgY2xhc3MgTGlzdGluZyBleHRlbmRzIGNsYXNzZXMoCiAgICAvLyAgIEFraXRhQmFzZUNvbnRyYWN0LAogICAgLy8gICBDb250cmFjdFdpdGhDcmVhdG9yT25seU9wdEluLAogICAgLy8gICBDaGlsZENvbnRyYWN0CiAgICAvLyApIHsKICAgIHB1c2hieXRlc3MgMHg2YTE2MzkzZCAweDY4ZTg2MzQzIC8vIG1ldGhvZCAicHVyY2hhc2UocGF5LGFkZHJlc3MsYWRkcmVzcyl2b2lkIiwgbWV0aG9kICJkZWxpc3QoYWRkcmVzcyl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggbWFpbl9wdXJjaGFzZV9yb3V0ZUA0IG1haW5fZGVsaXN0X3JvdXRlQDUKCm1haW5fc3dpdGNoX2Nhc2VfbmV4dEA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxNy0yMQogICAgLy8gZXhwb3J0IGNsYXNzIExpc3RpbmcgZXh0ZW5kcyBjbGFzc2VzKAogICAgLy8gICBBa2l0YUJhc2VDb250cmFjdCwKICAgIC8vICAgQ29udHJhY3RXaXRoQ3JlYXRvck9ubHlPcHRJbiwKICAgIC8vICAgQ2hpbGRDb250cmFjdAogICAgLy8gKSB7CiAgICB0eG4gT25Db21wbGV0aW9uCiAgICAhCiAgICBhc3NlcnQKICAgIHR4biBBcHBsaWNhdGlvbklECiAgICBieiBtYWluX2NyZWF0ZV9Ob09wQDE0CiAgICBwdXNoYnl0ZXNzIDB4MTcxYzlmODggMHgxOTM5NmM0YSAweDMzZTkyYzk0IDB4ODU0ZGVkZTAgMHgzZWExMTgzMiAvLyBtZXRob2QgInB1cmNoYXNlQXNhKGF4ZmVyLGFkZHJlc3MsYWRkcmVzcyl2b2lkIiwgbWV0aG9kICJjaGFuZ2VQcmljZSh1aW50NjQpdm9pZCIsIG1ldGhvZCAidXBkYXRlQWtpdGFEQU8odWludDY0KXZvaWQiLCBtZXRob2QgIm9wVXAoKXZvaWQiLCBtZXRob2QgIm9wdGluKHBheSx1aW50NjQpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIHB1cmNoYXNlQXNhIGNoYW5nZVByaWNlIHVwZGF0ZUFraXRhREFPIG1haW5fb3BVcF9yb3V0ZUAxMSBvcHRpbgogICAgZXJyCgptYWluX29wVXBfcm91dGVAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0MQogICAgLy8gb3BVcCgpOiB2b2lkIHsgfQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKbWFpbl9jcmVhdGVfTm9PcEAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTctMjEKICAgIC8vIGV4cG9ydCBjbGFzcyBMaXN0aW5nIGV4dGVuZHMgY2xhc3NlcygKICAgIC8vICAgQWtpdGFCYXNlQ29udHJhY3QsCiAgICAvLyAgIENvbnRyYWN0V2l0aENyZWF0b3JPbmx5T3B0SW4sCiAgICAvLyAgIENoaWxkQ29udHJhY3QKICAgIC8vICkgewogICAgcHVzaGJ5dGVzIDB4N2I1MGVhOGMgLy8gbWV0aG9kICJjcmVhdGUodWludDY0LGJvb2wsdWludDY0LHVpbnQ2NCx1aW50NjQsYWRkcmVzcywoYWRkcmVzcyx1aW50NjQpLGFkZHJlc3MsdWludDY0LHVpbnQ2NCxhZGRyZXNzLHN0cmluZyx1aW50NjQsKHN0cmluZyx1aW50NjQpKXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBjcmVhdGUKICAgIGVycgoKbWFpbl9kZWxpc3Rfcm91dGVANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDAxCiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiAnRGVsZXRlQXBwbGljYXRpb24nIH0pCiAgICB0eG4gT25Db21wbGV0aW9uCiAgICBwdXNoaW50IDUgLy8gRGVsZXRlQXBwbGljYXRpb24KICAgID09CiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgJiYKICAgIGFzc2VydAogICAgYiBkZWxpc3QKCm1haW5fcHVyY2hhc2Vfcm91dGVANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzQzCiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiAnRGVsZXRlQXBwbGljYXRpb24nIH0pCiAgICB0eG4gT25Db21wbGV0aW9uCiAgICBwdXNoaW50IDUgLy8gRGVsZXRlQXBwbGljYXRpb24KICAgID09CiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgJiYKICAgIGFzc2VydAogICAgYiBwdXJjaGFzZQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoYWtpdGFEQU86IHVpbnQ2NCwgYXNzZXQ6IHVpbnQ2NCwgdGltZVRvVW5sb2NrOiB1aW50NjQsIGV4cGlyYXRpb246IHVpbnQ2NCwgYWxsb2NhdGlvbnM6IGJ5dGVzLCBzdW06IHVpbnQ2NCwgY2xvc2VPdXQ6IHVpbnQ2NCkgLT4gYnl0ZXMsIGJ5dGVzOgpjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MzQKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KGFraXRhREFPOiBBcHBsaWNhdGlvbiwgYXNzZXQ6IHVpbnQ2NCwgdGltZVRvVW5sb2NrOiB1aW50NjQsIGV4cGlyYXRpb246IHVpbnQ2NCwgYWxsb2NhdGlvbnM6IFVzZXJBbGxvY2F0aW9uW10sIHN1bTogdWludDY0LCBjbG9zZU91dDogYm9vbGVhbik6IHsgaWQ6IHVpbnQ2NCwgY29zdDogdWludDY0IH0gewogICAgcHJvdG8gNyAyCiAgICBwdXNoYnl0ZXMgIiIKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUzNQogICAgLy8gYXNzZXJ0KGFzc2V0ICE9PSAwIHx8IGNsb3NlT3V0ID09PSBmYWxzZSwgRVJSX0NBTk5PVF9DTE9TRV9PVVRfT0ZfQUxHT19GT1JCSURERU4pCiAgICBmcmFtZV9kaWcgLTYKICAgIGJueiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2Jvb2xfdHJ1ZUAyCiAgICBmcmFtZV9kaWcgLTEKICAgIGJueiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2Jvb2xfZmFsc2VAMwoKY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9ib29sX3RydWVAMjoKICAgIGludGNfMSAvLyAxCgpjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2Jvb2xfbWVyZ2VANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTM1CiAgICAvLyBhc3NlcnQoYXNzZXQgIT09IDAgfHwgY2xvc2VPdXQgPT09IGZhbHNlLCBFUlJfQ0FOTk9UX0NMT1NFX09VVF9PRl9BTEdPX0ZPUkJJRERFTikKICAgIGFzc2VydCAvLyBOQ0NBCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICBmcmFtZV9kaWcgLTcKICAgIHB1c2hieXRlcyAiYWFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MzYKICAgIC8vIGNvbnN0IHJld2FyZHNBcHAgPSBnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLnJld2FyZHMKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MzkKICAgIC8vIGxldCBjb3N0OiB1aW50NjQgPSBNaW5EaXNidXJzZW1lbnRzTUJSICsgKFVzZXJBbGxvY2F0aW9uTUJSICogYWxsb2NhdGlvbnMubGVuZ3RoKQogICAgZnJhbWVfZGlnIC0zCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAyNTMwMAogICAgKgogICAgcHVzaGludCA0MTcwMAogICAgKwogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NDAKICAgIC8vIGlmIChhc3NldCA9PT0gMCkgewogICAgZnJhbWVfZGlnIC02CiAgICBibnogY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9lbHNlX2JvZHlAOAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NDEtNTUyCiAgICAvLyBpZCA9IGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQ+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9ucy5sZW5ndGgpICsgc3VtCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdGltZVRvVW5sb2NrLAogICAgLy8gICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgYWxsb2NhdGlvbnMKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTQ1CiAgICAvLyByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NDYKICAgIC8vIGFtb3VudDogTWluRGlzYnVyc2VtZW50c01CUiArIChVc2VyQWxsb2NhdGlvbk1CUiAqIGFsbG9jYXRpb25zLmxlbmd0aCkgKyBzdW0KICAgIGRpZyAyCiAgICBmcmFtZV9kaWcgLTIKICAgICsKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0NC01NDcKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9ucy5sZW5ndGgpICsgc3VtCiAgICAvLyB9KSwKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTQxLTU1MgogICAgLy8gaWQgPSBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5jcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50Pih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBNaW5EaXNidXJzZW1lbnRzTUJSICsgKFVzZXJBbGxvY2F0aW9uTUJSICogYWxsb2NhdGlvbnMubGVuZ3RoKSArIHN1bQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHRpbWVUb1VubG9jaywKICAgIC8vICAgICBleHBpcmF0aW9uLAogICAgLy8gICAgIGFsbG9jYXRpb25zCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTQ4CiAgICAvLyB0aW1lVG9VbmxvY2ssCiAgICBmcmFtZV9kaWcgLTUKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTQ5CiAgICAvLyBleHBpcmF0aW9uLAogICAgZnJhbWVfZGlnIC00CiAgICBpdG9iCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NDEtNTUyCiAgICAvLyBpZCA9IGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQ+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9ucy5sZW5ndGgpICsgc3VtCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdGltZVRvVW5sb2NrLAogICAgLy8gICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgYWxsb2NhdGlvbnMKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIHB1c2hieXRlcyAweDdiN2RjNWZjIC8vIG1ldGhvZCAiY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudChwYXksdWludDY0LHVpbnQ2NCwoYWRkcmVzcyx1aW50NjQpW10pdWludDY0IgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC0zCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgc3dhcAogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjIDEwIC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKCmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYWZ0ZXJfaWZfZWxzZUAyMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTkzCiAgICAvLyByZXR1cm4geyBpZCwgY29zdCB9CiAgICBpdG9iCiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtMwogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDMKICAgIHJldHN1YgoKY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9lbHNlX2JvZHlAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTU0CiAgICAvLyBpZiAoIUFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MuaXNPcHRlZEluKEFzc2V0KGFzc2V0KSkpIHsKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZnJhbWVfZGlnIC02CiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYnogY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9pZl9ib2R5QDkKICAgIGRpZyAxCiAgICBjb3ZlciAyCgpjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2FmdGVyX2lmX2Vsc2VAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU2OQogICAgLy8gYXNzZXRSZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgc3dhcAogICAgY292ZXIgMwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NjgKICAgIC8vIGNvbnN0IHRyYW5zZmVyVHhuID0gaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTc0CiAgICAvLyBpZiAoY2xvc2VPdXQpIHsKICAgIGZyYW1lX2RpZyAtMQogICAgYnogY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9hZnRlcl9pZl9lbHNlQDE0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU3NQogICAgLy8gdHJhbnNmZXJUeG4uc2V0KHsgYXNzZXRDbG9zZVRvOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzIH0pCiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGludGNfMSAvLyAxCiAgICBmcmFtZV9idXJ5IDAKICAgIGZyYW1lX2J1cnkgMQoKY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9hZnRlcl9pZl9lbHNlQDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NzgtNTkwCiAgICAvLyBpZCA9IGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLmNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnQ+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9ucy5sZW5ndGgpCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdHJhbnNmZXJUeG4sCiAgICAvLyAgICAgdGltZVRvVW5sb2NrLAogICAgLy8gICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgYWxsb2NhdGlvbnMKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTgyCiAgICAvLyByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1ODEtNTg0CiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiBNaW5EaXNidXJzZW1lbnRzTUJSICsgKFVzZXJBbGxvY2F0aW9uTUJSICogYWxsb2NhdGlvbnMubGVuZ3RoKQogICAgLy8gfSksCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU4NQogICAgLy8gdHJhbnNmZXJUeG4sCiAgICBpdHhuX25leHQKICAgIGZyYW1lX2RpZyAwCiAgICBieiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X25leHRfZmllbGRAMTcKICAgIGZyYW1lX2RpZyAxCiAgICBpdHhuX2ZpZWxkIEFzc2V0Q2xvc2VUbwoKY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9uZXh0X2ZpZWxkQDE3OgogICAgZnJhbWVfZGlnIC02CiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgZnJhbWVfZGlnIC0yCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTY4LTU3MgogICAgLy8gY29uc3QgdHJhbnNmZXJUeG4gPSBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICBhc3NldFJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICBhc3NldEFtb3VudDogc3VtLAogICAgLy8gICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyB9KQogICAgaW50Y18zIC8vIDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NzgtNTkwCiAgICAvLyBpZCA9IGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLmNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnQ+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9ucy5sZW5ndGgpCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdHJhbnNmZXJUeG4sCiAgICAvLyAgICAgdGltZVRvVW5sb2NrLAogICAgLy8gICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgYWxsb2NhdGlvbnMKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1ODYKICAgIC8vIHRpbWVUb1VubG9jaywKICAgIGZyYW1lX2RpZyAtNQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1ODcKICAgIC8vIGV4cGlyYXRpb24sCiAgICBmcmFtZV9kaWcgLTQKICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU3OC01OTAKICAgIC8vIGlkID0gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUuY3JlYXRlSW5zdGFudEFzYURpc2J1cnNlbWVudD4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogTWluRGlzYnVyc2VtZW50c01CUiArIChVc2VyQWxsb2NhdGlvbk1CUiAqIGFsbG9jYXRpb25zLmxlbmd0aCkKICAgIC8vICAgICB9KSwKICAgIC8vICAgICB0cmFuc2ZlclR4biwKICAgIC8vICAgICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICBhbGxvY2F0aW9ucwogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgcHVzaGJ5dGVzIDB4YWYxYTE0ZjIgLy8gbWV0aG9kICJjcmVhdGVJbnN0YW50QXNhRGlzYnVyc2VtZW50KHBheSxheGZlcix1aW50NjQsdWludDY0LChhZGRyZXNzLHVpbnQ2NClbXSl1aW50NjQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBzd2FwCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWMgMTAgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgYiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2FmdGVyX2lmX2Vsc2VAMjAKCmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfaWZfYm9keUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NTUKICAgIC8vIGNvc3QgKz0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBkaWcgMQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICArCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU1Ni01NjUKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBBc3NldChhc3NldCkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTYwCiAgICAvLyByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIGR1cG4gMgogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NjEKICAgIC8vIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU1OS01NjIKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gfSksCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU1Ni01NjUKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBBc3NldChhc3NldCkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NjMKICAgIC8vIEFzc2V0KGFzc2V0KQogICAgZnJhbWVfZGlnIC02CiAgICBpdG9iCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTU2LTU2NQogICAgLy8gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIEFzc2V0KGFzc2V0KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgcHVzaGJ5dGVzIDB4Mzk0ZWFlYjIgLy8gbWV0aG9kICJvcHRJbihwYXksdWludDY0KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBiIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYWZ0ZXJfaWZfZWxzZUAxMgoKY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9ib29sX2ZhbHNlQDM6CiAgICBpbnRjXzAgLy8gMAogICAgYiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2Jvb2xfbWVyZ2VANAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnNlbmRSZWZlcnJhbFBheW1lbnQoYWtpdGFEQU86IHVpbnQ2NCwgYXNzZXQ6IHVpbnQ2NCwgYW1vdW50OiB1aW50NjQpIC0+IGJ5dGVzOgpzZW5kUmVmZXJyYWxQYXltZW50OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MDcKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiBzZW5kUmVmZXJyYWxQYXltZW50KGFraXRhREFPOiBBcHBsaWNhdGlvbiwgYXNzZXQ6IHVpbnQ2NCwgYW1vdW50OiB1aW50NjQpOiBSZWZlcnJhbFBheW1lbnRJbmZvIHsKICAgIHByb3RvIDMgMQogICAgcHVzaGJ5dGVzICIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYwOAogICAgLy8gY29uc3Qgd2FsbGV0ID0gZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPKGFraXRhREFPLCBUeG4uc2VuZGVyKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1OQogICAgLy8gY29uc3QgW290aGVyQXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c090aGVyQXBwTGlzdCkpCiAgICBmcmFtZV9kaWcgLTMKICAgIHB1c2hieXRlcyAib2FsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NAogICAgLy8gcmV0dXJuIGdldE90aGVyQXBwTGlzdChha2l0YURBTykuZXNjcm93CiAgICBwdXNoaW50IDI0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxODYtMTg5CiAgICAvLyBjb25zdCBkYXRhID0gYWJpQ2FsbDx0eXBlb2YgRXNjcm93RmFjdG9yeS5wcm90b3R5cGUuZ2V0Pih7CiAgICAvLyAgIGFwcElkOiBlc2Nyb3dGYWN0b3J5LAogICAgLy8gICBhcmdzOiBbYWRkcmVzc10KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hieXRlcyAweDNjMWE2ZjMzIC8vIG1ldGhvZCAiZ2V0KGFkZHJlc3MpYnl0ZVtdIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBkaWcgMQogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjIDEwIC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGJ5dGVzCiAgICBleHRyYWN0IDYgMAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE5MQogICAgLy8gaWYgKEJ5dGVzKGRhdGEpLmxlbmd0aCA9PT0gMCB8fCBCeXRlcyhkYXRhKS5sZW5ndGggIT09IDgpIHsKICAgIGxlbgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBieiBzZW5kUmVmZXJyYWxQYXltZW50X2lmX2JvZHlAMTEKICAgIGZyYW1lX2RpZyAxCiAgICBpbnRjXzIgLy8gOAogICAgIT0KICAgIGJ6IHNlbmRSZWZlcnJhbFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUAxMgoKc2VuZFJlZmVycmFsUGF5bWVudF9pZl9ib2R5QDExOgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE5MgogICAgLy8gcmV0dXJuIDAKICAgIGludGNfMCAvLyAwCgpzZW5kUmVmZXJyYWxQYXltZW50X2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6Z2V0V2FsbGV0SURAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE2MQogICAgLy8gcmV0dXJuIHJlZmVycmVyT3Iod2FsbGV0SUQsIEdsb2JhbC56ZXJvQWRkcmVzcykKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNTQKICAgIC8vIGlmICh3YWxsZXRJRC5pZCA9PT0gMCkgewogICAgZGlnIDEKICAgIGJueiBzZW5kUmVmZXJyYWxQYXltZW50X2FmdGVyX2lmX2Vsc2VAMTcKICAgIGJ1cnkgMQoKc2VuZFJlZmVycmFsUGF5bWVudF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnJlZmVycmVyT3JAMTg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYxMgogICAgLy8gaWYgKGFtb3VudCA+IDAgJiYgcmVmZXJyZXIgIT09IEdsb2JhbC56ZXJvQWRkcmVzcykgewogICAgZnJhbWVfZGlnIC0xCiAgICBieiBzZW5kUmVmZXJyYWxQYXltZW50X2FmdGVyX2lmX2Vsc2VANgogICAgZHVwCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgICE9CiAgICBieiBzZW5kUmVmZXJyYWxQYXltZW50X2FmdGVyX2lmX2Vsc2VANgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2OAogICAgLy8gY29uc3QgW3dhbGxldEZlZXNCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXRGZWVzKSkKICAgIGZyYW1lX2RpZyAtMwogICAgcHVzaGJ5dGVzICJ3YWxsZXRfZmVlcyIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjE0CiAgICAvLyBjb25zdCB7IHJlZmVycmVyUGVyY2VudGFnZSB9ID0gZ2V0V2FsbGV0RmVlcyhha2l0YURBTykKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDgKICAgIC8vIGFzc2VydChwIDw9IERJVklTT1IsIEVSUl9JTlZBTElEX1BFUkNFTlRBR0UpCiAgICBkdXAKICAgIGludGMgNCAvLyAxMDAwMDAKICAgIDw9CiAgICBhc3NlcnQgLy8gSVBDVAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDkKICAgIC8vIHJldHVybiBvcC5kaXZ3KC4uLm9wLm11bHcoYSwgcCksIERJVklTT1IpCiAgICBmcmFtZV9kaWcgLTEKICAgIG11bHcKICAgIGludGMgNCAvLyAxMDAwMDAKICAgIGRpdncKICAgIGR1cAogICAgZnJhbWVfYnVyeSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYxNwogICAgLy8gaWYgKHJlZmVycmFsRmVlID09PSAwICYmIGFtb3VudCA+IDApIHsKICAgIGJueiBzZW5kUmVmZXJyYWxQYXltZW50X2FmdGVyX2lmX2Vsc2VANQogICAgZnJhbWVfZGlnIC0xCiAgICBieiBzZW5kUmVmZXJyYWxQYXltZW50X2FmdGVyX2lmX2Vsc2VANQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MTgKICAgIC8vIHJlZmVycmFsRmVlID0gMQogICAgaW50Y18xIC8vIDEKICAgIGZyYW1lX2J1cnkgMAoKc2VuZFJlZmVycmFsUGF5bWVudF9hZnRlcl9pZl9lbHNlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYyNAogICAgLy8gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjI1CiAgICAvLyAoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCArIE9ORV9XRUVLKSwKICAgIGR1cAogICAgcHVzaGludCA2MDQ4MDAKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjI2CiAgICAvLyBbeyBhZGRyZXNzOiByZWZlcnJlciwgYW1vdW50OiByZWZlcnJhbEZlZSB9XSwKICAgIGZyYW1lX2RpZyAwCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGl0b2IKICAgIHVuY292ZXIgNAogICAgc3dhcAogICAgY29uY2F0CiAgICBieXRlYyA0IC8vIDB4MDAwMQogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYyMS02MjkKICAgIC8vIGNvbnN0IHsgY29zdDogcmVmZXJyYWxNYnIgfSA9IGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIGFraXRhREFPLAogICAgLy8gICBhc3NldCwKICAgIC8vICAgR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIC8vICAgKEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgKyBPTkVfV0VFSyksCiAgICAvLyAgIFt7IGFkZHJlc3M6IHJlZmVycmVyLCBhbW91bnQ6IHJlZmVycmFsRmVlIH1dLAogICAgLy8gICByZWZlcnJhbEZlZSwKICAgIC8vICAgZmFsc2UKICAgIC8vICkKICAgIGZyYW1lX2RpZyAtMwogICAgZnJhbWVfZGlnIC0yCiAgICB1bmNvdmVyIDUKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciA0CiAgICBkaWcgNQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MjgKICAgIC8vIGZhbHNlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MjEtNjI5CiAgICAvLyBjb25zdCB7IGNvc3Q6IHJlZmVycmFsTWJyIH0gPSBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICBha2l0YURBTywKICAgIC8vICAgYXNzZXQsCiAgICAvLyAgIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICAvLyAgIChHbG9iYWwubGF0ZXN0VGltZXN0YW1wICsgT05FX1dFRUspLAogICAgLy8gICBbeyBhZGRyZXNzOiByZWZlcnJlciwgYW1vdW50OiByZWZlcnJhbEZlZSB9XSwKICAgIC8vICAgcmVmZXJyYWxGZWUsCiAgICAvLyAgIGZhbHNlCiAgICAvLyApCiAgICBjYWxsc3ViIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQKICAgIHBvcAogICAgZXh0cmFjdCA4IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjMxCiAgICAvLyByZXR1cm4geyBsZWZ0b3ZlcjogKGFtb3VudCAtIHJlZmVycmFsRmVlKSwgcmVmZXJyYWxNYnIgfQogICAgZnJhbWVfZGlnIC0xCiAgICB1bmNvdmVyIDIKICAgIC0KICAgIGl0b2IKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCnNlbmRSZWZlcnJhbFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MzQKICAgIC8vIHJldHVybiB7IGxlZnRvdmVyOiBhbW91bnQsIHJlZmVycmFsTWJyOiAwIH0KICAgIGZyYW1lX2RpZyAtMQogICAgaXRvYgogICAgaW50Y18wIC8vIDAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCnNlbmRSZWZlcnJhbFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUAxNzoKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNzUKICAgIC8vIEJ5dGVzKEFic3RyYWN0QWNjb3VudEdsb2JhbFN0YXRlS2V5c1JlZmVycmVyKQogICAgcHVzaGJ5dGVzICJyZWZlcnJlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTczLTE3NgogICAgLy8gY29uc3QgW3JlZmVycmVyQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoCiAgICAvLyAgIHdhbGxldElELAogICAgLy8gICBCeXRlcyhBYnN0cmFjdEFjY291bnRHbG9iYWxTdGF0ZUtleXNSZWZlcnJlcikKICAgIC8vICkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTYxCiAgICAvLyByZXR1cm4gcmVmZXJyZXJPcih3YWxsZXRJRCwgR2xvYmFsLnplcm9BZGRyZXNzKQogICAgYiBzZW5kUmVmZXJyYWxQYXltZW50X2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6cmVmZXJyZXJPckAxOAoKc2VuZFJlZmVycmFsUGF5bWVudF9hZnRlcl9pZl9lbHNlQDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxOTUKICAgIC8vIHJldHVybiBidG9pKGRhdGEpCiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE4MgogICAgLy8gcmV0dXJuIEFwcGxpY2F0aW9uKGdldFdhbGxldElEKGVzY3Jvd0ZhY3RvcnksIGFkZHJlc3MpKQogICAgYiBzZW5kUmVmZXJyYWxQYXltZW50X2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6Z2V0V2FsbGV0SURAMTMKCgovLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjpMaXN0aW5nLmNyZWF0ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNyZWF0ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjkzCiAgICAvLyBAYWJpbWV0aG9kKHsgb25DcmVhdGU6ICdyZXF1aXJlJyB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmJvb2wKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDUKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDYKICAgIGR1cAogICAgY292ZXIgMgogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDcKICAgIGR1cAogICAgY292ZXIgMgogICAgbGVuCiAgICBwdXNoaW50IDQwCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbWJyLnRzOjpGdW5kZXJJbmZvCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA4CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA5CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxMAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTEKICAgIGR1cAogICAgY292ZXIgMgogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHN3YXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxNAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBkdXAKICAgIGxlbgogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBwdXNoaW50IDEwCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDAgb2YgKChsZW4rdXRmOFtdKSx1aW50NjQpCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGRpZyAyCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAxMgogICAgKwogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkVzY3Jvd0NvbmZpZwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMTAKICAgIC8vIGxvZ2dlZEFzc2VydChHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25JZCAhPT0gMCwgRVJSX01VU1RfQkVfQ0FMTEVEX0ZST01fRkFDVE9SWSkKICAgIGdsb2JhbCBDYWxsZXJBcHBsaWNhdGlvbklECiAgICBibnogY3JlYXRlX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAxMSAvLyAiRVJSOk1CRkYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TUJGRgoKY3JlYXRlX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNgogICAgLy8gcHJpemUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQcml6ZSB9KQogICAgYnl0ZWNfMyAvLyAicHJpemUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMxMgogICAgLy8gdGhpcy5wcml6ZS52YWx1ZSA9IHByaXplCiAgICB1bmNvdmVyIDE0CiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyOAogICAgLy8gaXNQcml6ZUJveCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlJc1ByaXplQm94IH0pCiAgICBieXRlYyA1IC8vICJpc19wcml6ZV9ib3giCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMxMwogICAgLy8gdGhpcy5pc1ByaXplQm94LnZhbHVlID0gaXNQcml6ZUJveAogICAgdW5jb3ZlciAxMwogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzAKICAgIC8vIHByaWNlID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5UHJpY2UgfSkKICAgIGJ5dGVjIDYgLy8gInByaWNlIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMTQKICAgIC8vIHRoaXMucHJpY2UudmFsdWUgPSBwcmljZQogICAgdW5jb3ZlciAxMgogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzIKICAgIC8vIHBheW1lbnRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5UGF5bWVudEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJwYXltZW50X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMTUKICAgIC8vIHRoaXMucGF5bWVudEFzc2V0LnZhbHVlID0gQXNzZXQocGF5bWVudEFzc2V0KQogICAgdW5jb3ZlciAxMQogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzE2CiAgICAvLyBsb2dnZWRBc3NlcnQoZXhwaXJhdGlvbiA9PT0gMCB8fCBleHBpcmF0aW9uID4gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwgRVJSX0lOVkFMSURfRVhQSVJBVElPTikKICAgIGR1cAogICAgYnogY3JlYXRlX2Jvb2xfdHJ1ZUA1CiAgICBkdXAKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgID4KICAgIGJ6IGNyZWF0ZV9ib29sX2ZhbHNlQDYKCmNyZWF0ZV9ib29sX3RydWVANToKICAgIGludGNfMSAvLyAxCgpjcmVhdGVfYm9vbF9tZXJnZUA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMTYKICAgIC8vIGxvZ2dlZEFzc2VydChleHBpcmF0aW9uID09PSAwIHx8IGV4cGlyYXRpb24gPiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLCBFUlJfSU5WQUxJRF9FWFBJUkFUSU9OKQogICAgYm56IGNyZWF0ZV9hZnRlcl9hc3NlcnRAOQogICAgcHVzaGJ5dGVzICJFUlI6SUVYUCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJRVhQCgpjcmVhdGVfYWZ0ZXJfYXNzZXJ0QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM0CiAgICAvLyBleHBpcmF0aW9uID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5RXhwaXJhdGlvbiB9KQogICAgYnl0ZWMgNyAvLyAiZXhwaXJhdGlvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzE3CiAgICAvLyB0aGlzLmV4cGlyYXRpb24udmFsdWUgPSBleHBpcmF0aW9uCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNgogICAgLy8gc2VsbGVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVNlbGxlciB9KQogICAgYnl0ZWNfMSAvLyAic2VsbGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMTgKICAgIC8vIHRoaXMuc2VsbGVyLnZhbHVlID0gc2VsbGVyCiAgICB1bmNvdmVyIDkKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvY2hpbGQudHM6MTEKICAgIC8vIGZ1bmRlciA9IEdsb2JhbFN0YXRlPEZ1bmRlckluZm8+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUZ1bmRlciB9KQogICAgcHVzaGJ5dGVzICJmdW5kZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMxOQogICAgLy8gdGhpcy5mdW5kZXIudmFsdWUgPSBjbG9uZShmdW5kZXIpCiAgICB1bmNvdmVyIDgKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM4CiAgICAvLyByZXNlcnZlZEZvciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlSZXNlcnZlZEZvciB9KQogICAgYnl0ZWMgOCAvLyAicmVzZXJ2ZWRfZm9yIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMjAKICAgIC8vIHRoaXMucmVzZXJ2ZWRGb3IudmFsdWUgPSByZXNlcnZlZEZvcgogICAgdW5jb3ZlciA3CiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MAogICAgLy8gY3JlYXRvclJveWFsdHkgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlDcmVhdG9yUm95YWx0eSB9KQogICAgYnl0ZWMgMTIgLy8gImNyZWF0b3Jfcm95YWx0eSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzIxCiAgICAvLyB0aGlzLmNyZWF0b3JSb3lhbHR5LnZhbHVlID0gY3JlYXRvclJveWFsdHkKICAgIHVuY292ZXIgNgogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDIKICAgIC8vIGdhdGVJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleUdhdGVJRCB9KQogICAgcHVzaGJ5dGVzICJnYXRlX2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMjIKICAgIC8vIHRoaXMuZ2F0ZUlELnZhbHVlID0gZ2F0ZUlECiAgICB1bmNvdmVyIDUKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjUzCiAgICAvLyBtYXJrZXRwbGFjZSA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlNYXJrZXRwbGFjZSB9KQogICAgYnl0ZWMgOSAvLyAibWFya2V0cGxhY2UiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMyMwogICAgLy8gdGhpcy5tYXJrZXRwbGFjZS52YWx1ZSA9IG1hcmtldHBsYWNlCiAgICB1bmNvdmVyIDQKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNQogICAgLy8gdmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5VmVyc2lvbiB9KQogICAgcHVzaGJ5dGVzICJ2ZXJzaW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMjQKICAgIC8vIHRoaXMudmVyc2lvbi52YWx1ZSA9IHZlcnNpb24KICAgIHVuY292ZXIgMwogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMiAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMjUKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUgPSBha2l0YURBTwogICAgdW5jb3ZlciAyCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo1NwogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlBa2l0YURBT0VzY3JvdyB9KQogICAgYnl0ZWMgMTMgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzI2CiAgICAvLyB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlID0gY2xvbmUoYWtpdGFEQU9Fc2Nyb3cpCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMjkKICAgIC8vIHRoaXMubWFya2V0cGxhY2VSb3lhbHRpZXMudmFsdWUgPSBnZXRORlRGZWVzKHRoaXMuYWtpdGFEQU8udmFsdWUpLm1hcmtldHBsYWNlQ29tcG9zYWJsZVBlcmNlbnRhZ2UKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzIgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzI5CiAgICAvLyB0aGlzLm1hcmtldHBsYWNlUm95YWx0aWVzLnZhbHVlID0gZ2V0TkZURmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKS5tYXJrZXRwbGFjZUNvbXBvc2FibGVQZXJjZW50YWdlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5MwogICAgLy8gY29uc3QgW25mdEZlZXNCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNORlRGZWVzKSkKICAgIGJ5dGVjIDE3IC8vICJuZnRfZmVlcyIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzI5CiAgICAvLyB0aGlzLm1hcmtldHBsYWNlUm95YWx0aWVzLnZhbHVlID0gZ2V0TkZURmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKS5tYXJrZXRwbGFjZUNvbXBvc2FibGVQZXJjZW50YWdlCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo1NQogICAgLy8gbWFya2V0cGxhY2VSb3lhbHRpZXMgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlNYXJrZXRwbGFjZVJveWFsdGllcyB9KQogICAgYnl0ZWMgMTQgLy8gIm1hcmtldHBsYWNlX3JveWFsdGllcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzI5CiAgICAvLyB0aGlzLm1hcmtldHBsYWNlUm95YWx0aWVzLnZhbHVlID0gZ2V0TkZURmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKS5tYXJrZXRwbGFjZUNvbXBvc2FibGVQZXJjZW50YWdlCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyOTMKICAgIC8vIEBhYmltZXRob2QoeyBvbkNyZWF0ZTogJ3JlcXVpcmUnIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpjcmVhdGVfYm9vbF9mYWxzZUA2OgogICAgaW50Y18wIC8vIDAKICAgIGIgY3JlYXRlX2Jvb2xfbWVyZ2VANwoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6Okxpc3RpbmcucHVyY2hhc2Vbcm91dGluZ10oKSAtPiB2b2lkOgpwdXJjaGFzZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzQzCiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiAnRGVsZXRlQXBwbGljYXRpb24nIH0pCiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgY292ZXIgMwogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzQ5CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gR2xvYmFsLmNyZWF0b3JBZGRyZXNzLCBFUlJfTVVTVF9CRV9DQUxMRURfRlJPTV9GQUNUT1JZKQogICAgdHhuIFNlbmRlcgogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICA9PQogICAgYm56IHB1cmNoYXNlX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAxMSAvLyAiRVJSOk1CRkYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TUJGRgoKcHVyY2hhc2VfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM1MAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLmlkID09PSAwLCBFUlJfUEFZTUVOVF9BU1NFVF9NVVNUX0JFX0FMR08pCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMgogICAgLy8gcGF5bWVudEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQYXltZW50QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInBheW1lbnRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM1MAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLmlkID09PSAwLCBFUlJfUEFZTUVOVF9BU1NFVF9NVVNUX0JFX0FMR08pCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogcHVyY2hhc2VfYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOlBBTUEiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6UEFNQQoKcHVyY2hhc2VfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM1MQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZXhwaXJhdGlvbi52YWx1ZSA9PT0gMCB8fCB0aGlzLmV4cGlyYXRpb24udmFsdWUgPiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLCBFUlJfTElTVElOR19FWFBJUkVEKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzQKICAgIC8vIGV4cGlyYXRpb24gPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlFeHBpcmF0aW9uIH0pCiAgICBieXRlYyA3IC8vICJleHBpcmF0aW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNTEKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmV4cGlyYXRpb24udmFsdWUgPT09IDAgfHwgdGhpcy5leHBpcmF0aW9uLnZhbHVlID4gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwgRVJSX0xJU1RJTkdfRVhQSVJFRCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBwdXJjaGFzZV9ib29sX3RydWVANwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzQKICAgIC8vIGV4cGlyYXRpb24gPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlFeHBpcmF0aW9uIH0pCiAgICBieXRlYyA3IC8vICJleHBpcmF0aW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNTEKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmV4cGlyYXRpb24udmFsdWUgPT09IDAgfHwgdGhpcy5leHBpcmF0aW9uLnZhbHVlID4gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwgRVJSX0xJU1RJTkdfRVhQSVJFRCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICA+CiAgICBieiBwdXJjaGFzZV9ib29sX2ZhbHNlQDgKCnB1cmNoYXNlX2Jvb2xfdHJ1ZUA3OgogICAgaW50Y18xIC8vIDEKCnB1cmNoYXNlX2Jvb2xfbWVyZ2VAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzUxCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5leHBpcmF0aW9uLnZhbHVlID09PSAwIHx8IHRoaXMuZXhwaXJhdGlvbi52YWx1ZSA+IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsIEVSUl9MSVNUSU5HX0VYUElSRUQpCiAgICBibnogcHVyY2hhc2VfYWZ0ZXJfYXNzZXJ0QDExCiAgICBieXRlYyAxOCAvLyAiRVJSOkxFWFAiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TEVYUAoKcHVyY2hhc2VfYWZ0ZXJfYXNzZXJ0QDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNTMKICAgIC8vIGlmICh0aGlzLnJlc2VydmVkRm9yLnZhbHVlICE9PSBHbG9iYWwuemVyb0FkZHJlc3MpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM4CiAgICAvLyByZXNlcnZlZEZvciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlSZXNlcnZlZEZvciB9KQogICAgYnl0ZWMgOCAvLyAicmVzZXJ2ZWRfZm9yIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNTMKICAgIC8vIGlmICh0aGlzLnJlc2VydmVkRm9yLnZhbHVlICE9PSBHbG9iYWwuemVyb0FkZHJlc3MpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgICE9CiAgICBieiBwdXJjaGFzZV9hZnRlcl9pZl9lbHNlQDE1CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM1NAogICAgLy8gbG9nZ2VkQXNzZXJ0KGJ1eWVyID09PSB0aGlzLnJlc2VydmVkRm9yLnZhbHVlLCBFUlJfUkVTRVJWRURfRk9SX0RJRkZFUkVOVF9BRERSRVNTKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzgKICAgIC8vIHJlc2VydmVkRm9yID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVJlc2VydmVkRm9yIH0pCiAgICBieXRlYyA4IC8vICJyZXNlcnZlZF9mb3IiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM1NAogICAgLy8gbG9nZ2VkQXNzZXJ0KGJ1eWVyID09PSB0aGlzLnJlc2VydmVkRm9yLnZhbHVlLCBFUlJfUkVTRVJWRURfRk9SX0RJRkZFUkVOVF9BRERSRVNTKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyAxCiAgICA9PQogICAgYm56IHB1cmNoYXNlX2FmdGVyX2lmX2Vsc2VAMTUKICAgIGJ5dGVjIDE5IC8vICJFUlI6UkZEQSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpSRkRBCgpwdXJjaGFzZV9hZnRlcl9pZl9lbHNlQDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNTcKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnNlbmRlciA9PT0gR2xvYmFsLmNyZWF0b3JBZGRyZXNzLCBFUlJfSU5WQUxJRF9QQVlNRU5UKQogICAgZGlnIDEKICAgIGd0eG5zIFNlbmRlcgogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICA9PQogICAgYm56IHB1cmNoYXNlX2FmdGVyX2Fzc2VydEAxNwogICAgYnl0ZWMgMTUgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCnB1cmNoYXNlX2FmdGVyX2Fzc2VydEAxNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzU4CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIEVSUl9JTlZBTElEX1BBWU1FTlQpCiAgICBkaWcgMQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IHB1cmNoYXNlX2FmdGVyX2Fzc2VydEAxOQogICAgYnl0ZWMgMTUgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCnB1cmNoYXNlX2FmdGVyX2Fzc2VydEAxOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzU5CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IHRoaXMucHJpY2UudmFsdWUsIEVSUl9JTlZBTElEX1BBWU1FTlQpCiAgICBzd2FwCiAgICBndHhucyBBbW91bnQKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMwCiAgICAvLyBwcmljZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVByaWNlIH0pCiAgICBieXRlYyA2IC8vICJwcmljZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzU5CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IHRoaXMucHJpY2UudmFsdWUsIEVSUl9JTlZBTElEX1BBWU1FTlQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPT0KICAgIGJueiBwdXJjaGFzZV9hZnRlcl9hc3NlcnRAMjEKICAgIGJ5dGVjIDE1IC8vICJFUlI6SVBBWSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUEFZCgpwdXJjaGFzZV9hZnRlcl9hc3NlcnRAMjE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM2MQogICAgLy8gdGhpcy50cmFuc2ZlclB1cmNoYXNlVG9CdXllcihidXllcikKICAgIGNhbGxzdWIgdHJhbnNmZXJQdXJjaGFzZVRvQnV5ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTIzCiAgICAvLyBjb25zdCBhbW91bnRzID0gdGhpcy5nZXRBbW91bnRzKHRoaXMucHJpY2UudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMAogICAgLy8gcHJpY2UgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQcmljZSB9KQogICAgYnl0ZWMgNiAvLyAicHJpY2UiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjEyMwogICAgLy8gY29uc3QgYW1vdW50cyA9IHRoaXMuZ2V0QW1vdW50cyh0aGlzLnByaWNlLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGNhbGxzdWIgZ2V0QW1vdW50cwogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjEyNgogICAgLy8gbGV0IGxlZnRvdmVyOiB1aW50NjQgPSBhbW91bnRzLmFraXRhCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxMjcKICAgIC8vIGlmIChhbW91bnRzLmFraXRhID4gMCkgewogICAgYnogcHVyY2hhc2VfYWZ0ZXJfaWZfZWxzZUAyNAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxMjgKICAgIC8vICh7IGxlZnRvdmVyIH0gPSBzZW5kUmVmZXJyYWxQYXltZW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIDAsIGFtb3VudHMuYWtpdGEpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMiAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxMjgKICAgIC8vICh7IGxlZnRvdmVyIH0gPSBzZW5kUmVmZXJyYWxQYXltZW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIDAsIGFtb3VudHMuYWtpdGEpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgc2VuZFJlZmVycmFsUGF5bWVudAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CgpwdXJjaGFzZV9hZnRlcl9pZl9lbHNlQDI0OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxMzEtMTM2CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IGxlZnRvdmVyLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTMzCiAgICAvLyByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjU3CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleUFraXRhREFPRXNjcm93IH0pCiAgICBieXRlYyAxMyAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxMzMKICAgIC8vIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHB1c2hpbnQgMgogICAgZXh0cmFjdF91aW50NjQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjEzMS0xMzUKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogbGVmdG92ZXIsCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjEzMS0xMzYKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogbGVmdG92ZXIsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTM5LTE0NAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLm1hcmtldHBsYWNlLAogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLm1hcmtldHBsYWNlLnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTQxCiAgICAvLyBhbW91bnQ6IGFtb3VudHMubWFya2V0cGxhY2UsCiAgICBkdXAKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE0MgogICAgLy8gcmVjZWl2ZXI6IHRoaXMubWFya2V0cGxhY2UudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo1MwogICAgLy8gbWFya2V0cGxhY2UgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5TWFya2V0cGxhY2UgfSkKICAgIGJ5dGVjIDkgLy8gIm1hcmtldHBsYWNlIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxNDIKICAgIC8vIHJlY2VpdmVyOiB0aGlzLm1hcmtldHBsYWNlLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGR1cAogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTM5LTE0MwogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLm1hcmtldHBsYWNlLAogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLm1hcmtldHBsYWNlLnZhbHVlLAogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxMzktMTQ0CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudHMubWFya2V0cGxhY2UsCiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMubWFya2V0cGxhY2UudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTQ3LTE1MgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLm1hcmtldHBsYWNlLAogICAgLy8gICAgIHJlY2VpdmVyOiBtYXJrZXRwbGFjZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICBkaWcgMgogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTQ3LTE1MQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLm1hcmtldHBsYWNlLAogICAgLy8gICAgIHJlY2VpdmVyOiBtYXJrZXRwbGFjZSwKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTQ3LTE1MgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLm1hcmtldHBsYWNlLAogICAgLy8gICAgIHJlY2VpdmVyOiBtYXJrZXRwbGFjZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxNTUKICAgIC8vIGlmICh0aGlzLmlzUHJpemVCb3gudmFsdWUpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI4CiAgICAvLyBpc1ByaXplQm94ID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleUlzUHJpemVCb3ggfSkKICAgIGJ5dGVjIDUgLy8gImlzX3ByaXplX2JveCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTU1CiAgICAvLyBpZiAodGhpcy5pc1ByaXplQm94LnZhbHVlKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogcHVyY2hhc2VfZWxzZV9ib2R5QDI2CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE1Ni0xNjEKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGFtb3VudDogYW1vdW50cy5zZWxsZXIsCiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMuc2VsbGVyLnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTU4CiAgICAvLyBhbW91bnQ6IGFtb3VudHMuc2VsbGVyLAogICAgcHVzaGludCAyNAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTU5CiAgICAvLyByZWNlaXZlcjogdGhpcy5zZWxsZXIudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNgogICAgLy8gc2VsbGVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVNlbGxlciB9KQogICAgYnl0ZWNfMSAvLyAic2VsbGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxNTkKICAgIC8vIHJlY2VpdmVyOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxNTYtMTYwCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudHMuc2VsbGVyLAogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTU2LTE2MQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLnNlbGxlciwKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5zZWxsZXIudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKCnB1cmNoYXNlX2FmdGVyX2lmX2Vsc2VAMjc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM2My0zNjUKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoeyBjbG9zZVJlbWFpbmRlclRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM2NAogICAgLy8gLnBheW1lbnQoeyBjbG9zZVJlbWFpbmRlclRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MgfSkKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgaXR4bl9maWVsZCBDbG9zZVJlbWFpbmRlclRvCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM2My0zNjQKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoeyBjbG9zZVJlbWFpbmRlclRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzYzLTM2NQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7IGNsb3NlUmVtYWluZGVyVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcyB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM0MwogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogJ0RlbGV0ZUFwcGxpY2F0aW9uJyB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKcHVyY2hhc2VfZWxzZV9ib2R5QDI2OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxNjMKICAgIC8vIGNvbnN0IGFzc2V0UHJpemUgPSBBc3NldCh0aGlzLnByaXplLnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjYKICAgIC8vIHByaXplID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5UHJpemUgfSkKICAgIGJ5dGVjXzMgLy8gInByaXplIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxNjMKICAgIC8vIGNvbnN0IGFzc2V0UHJpemUgPSBBc3NldCh0aGlzLnByaXplLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTY2LTE3MQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLmNyZWF0b3IsCiAgICAvLyAgICAgcmVjZWl2ZXI6IGFzc2V0UHJpemUuY3JlYXRvciwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE2OAogICAgLy8gYW1vdW50OiBhbW91bnRzLmNyZWF0b3IsCiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE2OQogICAgLy8gcmVjZWl2ZXI6IGFzc2V0UHJpemUuY3JlYXRvciwKICAgIGRpZyAxCiAgICBhc3NldF9wYXJhbXNfZ2V0IEFzc2V0Q3JlYXRvcgogICAgYXNzZXJ0IC8vIGFzc2V0IGV4aXN0cwogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTY2LTE3MAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLmNyZWF0b3IsCiAgICAvLyAgICAgcmVjZWl2ZXI6IGFzc2V0UHJpemUuY3JlYXRvciwKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTY2LTE3MQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLmNyZWF0b3IsCiAgICAvLyAgICAgcmVjZWl2ZXI6IGFzc2V0UHJpemUuY3JlYXRvciwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxNzQtMTgwCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudHMuc2VsbGVyLAogICAgLy8gICAgIG5vdGU6IFN0cmluZyhhc3NldFByaXplLm5hbWUpICsgJyBTb2xkJywKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5zZWxsZXIudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxNzYKICAgIC8vIGFtb3VudDogYW1vdW50cy5zZWxsZXIsCiAgICBzd2FwCiAgICBwdXNoaW50IDI0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxNzcKICAgIC8vIG5vdGU6IFN0cmluZyhhc3NldFByaXplLm5hbWUpICsgJyBTb2xkJywKICAgIHN3YXAKICAgIGFzc2V0X3BhcmFtc19nZXQgQXNzZXROYW1lCiAgICBhc3NlcnQgLy8gYXNzZXQgZXhpc3RzCiAgICBwdXNoYnl0ZXMgIiBTb2xkIgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE3OAogICAgLy8gcmVjZWl2ZXI6IHRoaXMuc2VsbGVyLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzYKICAgIC8vIHNlbGxlciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlTZWxsZXIgfSkKICAgIGJ5dGVjXzEgLy8gInNlbGxlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTc4CiAgICAvLyByZWNlaXZlcjogdGhpcy5zZWxsZXIudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgaXR4bl9maWVsZCBOb3RlCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxNzQtMTc5CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudHMuc2VsbGVyLAogICAgLy8gICAgIG5vdGU6IFN0cmluZyhhc3NldFByaXplLm5hbWUpICsgJyBTb2xkJywKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5zZWxsZXIudmFsdWUsCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE3NC0xODAKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGFtb3VudDogYW1vdW50cy5zZWxsZXIsCiAgICAvLyAgICAgbm90ZTogU3RyaW5nKGFzc2V0UHJpemUubmFtZSkgKyAnIFNvbGQnLAogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgYiBwdXJjaGFzZV9hZnRlcl9pZl9lbHNlQDI3CgpwdXJjaGFzZV9ib29sX2ZhbHNlQDg6CiAgICBpbnRjXzAgLy8gMAogICAgYiBwdXJjaGFzZV9ib29sX21lcmdlQDkKCgovLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjpMaXN0aW5nLnB1cmNoYXNlQXNhW3JvdXRpbmddKCkgLT4gdm9pZDoKcHVyY2hhc2VBc2E6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM3NgogICAgLy8gQGFiaW1ldGhvZCh7IE9uQ29tcGxldGVBY3Rpb246ICdEZWxldGVBcHBsaWNhdGlvbicgfSkKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18zIC8vIGF4ZmVyCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXhmZXIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgY292ZXIgMgogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzgyCiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gR2xvYmFsLmNyZWF0b3JBZGRyZXNzLCBFUlJfTVVTVF9CRV9DQUxMRURfRlJPTV9GQUNUT1JZKQogICAgdHhuIFNlbmRlcgogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICA9PQogICAgYm56IHB1cmNoYXNlQXNhX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAxMSAvLyAiRVJSOk1CRkYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TUJGRgoKcHVyY2hhc2VBc2FfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM4MwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLmlkICE9PSAwLCBFUlJfUEFZTUVOVF9BU1NFVF9NVVNUX05PVF9CRV9BTEdPKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzIKICAgIC8vIHBheW1lbnRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5UGF5bWVudEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJwYXltZW50X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozODMKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnBheW1lbnRBc3NldC52YWx1ZS5pZCAhPT0gMCwgRVJSX1BBWU1FTlRfQVNTRVRfTVVTVF9OT1RfQkVfQUxHTykKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBibnogcHVyY2hhc2VBc2FfYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOlBBTkEiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6UEFOQQoKcHVyY2hhc2VBc2FfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM4NAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZXhwaXJhdGlvbi52YWx1ZSA9PT0gMCB8fCB0aGlzLmV4cGlyYXRpb24udmFsdWUgPiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLCBFUlJfTElTVElOR19FWFBJUkVEKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzQKICAgIC8vIGV4cGlyYXRpb24gPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlFeHBpcmF0aW9uIH0pCiAgICBieXRlYyA3IC8vICJleHBpcmF0aW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozODQKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmV4cGlyYXRpb24udmFsdWUgPT09IDAgfHwgdGhpcy5leHBpcmF0aW9uLnZhbHVlID4gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwgRVJSX0xJU1RJTkdfRVhQSVJFRCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBwdXJjaGFzZUFzYV9ib29sX3RydWVANwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzQKICAgIC8vIGV4cGlyYXRpb24gPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlFeHBpcmF0aW9uIH0pCiAgICBieXRlYyA3IC8vICJleHBpcmF0aW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozODQKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmV4cGlyYXRpb24udmFsdWUgPT09IDAgfHwgdGhpcy5leHBpcmF0aW9uLnZhbHVlID4gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwgRVJSX0xJU1RJTkdfRVhQSVJFRCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICA+CiAgICBieiBwdXJjaGFzZUFzYV9ib29sX2ZhbHNlQDgKCnB1cmNoYXNlQXNhX2Jvb2xfdHJ1ZUA3OgogICAgaW50Y18xIC8vIDEKCnB1cmNoYXNlQXNhX2Jvb2xfbWVyZ2VAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6Mzg0CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5leHBpcmF0aW9uLnZhbHVlID09PSAwIHx8IHRoaXMuZXhwaXJhdGlvbi52YWx1ZSA+IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsIEVSUl9MSVNUSU5HX0VYUElSRUQpCiAgICBibnogcHVyY2hhc2VBc2FfYWZ0ZXJfYXNzZXJ0QDExCiAgICBieXRlYyAxOCAvLyAiRVJSOkxFWFAiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TEVYUAoKcHVyY2hhc2VBc2FfYWZ0ZXJfYXNzZXJ0QDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozODYKICAgIC8vIGlmICh0aGlzLnJlc2VydmVkRm9yLnZhbHVlICE9PSBHbG9iYWwuemVyb0FkZHJlc3MpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM4CiAgICAvLyByZXNlcnZlZEZvciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlSZXNlcnZlZEZvciB9KQogICAgYnl0ZWMgOCAvLyAicmVzZXJ2ZWRfZm9yIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozODYKICAgIC8vIGlmICh0aGlzLnJlc2VydmVkRm9yLnZhbHVlICE9PSBHbG9iYWwuemVyb0FkZHJlc3MpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgICE9CiAgICBieiBwdXJjaGFzZUFzYV9hZnRlcl9pZl9lbHNlQDE1CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM4NwogICAgLy8gbG9nZ2VkQXNzZXJ0KGJ1eWVyID09PSB0aGlzLnJlc2VydmVkRm9yLnZhbHVlLCBFUlJfUkVTRVJWRURfRk9SX0RJRkZFUkVOVF9BRERSRVNTKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzgKICAgIC8vIHJlc2VydmVkRm9yID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVJlc2VydmVkRm9yIH0pCiAgICBieXRlYyA4IC8vICJyZXNlcnZlZF9mb3IiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM4NwogICAgLy8gbG9nZ2VkQXNzZXJ0KGJ1eWVyID09PSB0aGlzLnJlc2VydmVkRm9yLnZhbHVlLCBFUlJfUkVTRVJWRURfRk9SX0RJRkZFUkVOVF9BRERSRVNTKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyAxCiAgICA9PQogICAgYm56IHB1cmNoYXNlQXNhX2FmdGVyX2lmX2Vsc2VAMTUKICAgIGJ5dGVjIDE5IC8vICJFUlI6UkZEQSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpSRkRBCgpwdXJjaGFzZUFzYV9hZnRlcl9pZl9lbHNlQDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozOTAKICAgIC8vIGxvZ2dlZEFzc2VydChhc3NldFhmZXIuYXNzZXRSZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIEVSUl9JTlZBTElEX1RSQU5TRkVSKQogICAgZGlnIDIKICAgIGd0eG5zIEFzc2V0UmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IHB1cmNoYXNlQXNhX2FmdGVyX2Fzc2VydEAxNwogICAgYnl0ZWMgMjAgLy8gIkVSUjpJWEZSIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklYRlIKCnB1cmNoYXNlQXNhX2FmdGVyX2Fzc2VydEAxNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzkxCiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLmFzc2V0QW1vdW50ID09PSB0aGlzLnByaWNlLnZhbHVlLCBFUlJfSU5WQUxJRF9UUkFOU0ZFUikKICAgIHVuY292ZXIgMgogICAgZ3R4bnMgQXNzZXRBbW91bnQKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMwCiAgICAvLyBwcmljZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVByaWNlIH0pCiAgICBieXRlYyA2IC8vICJwcmljZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzkxCiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLmFzc2V0QW1vdW50ID09PSB0aGlzLnByaWNlLnZhbHVlLCBFUlJfSU5WQUxJRF9UUkFOU0ZFUikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA9PQogICAgYm56IHB1cmNoYXNlQXNhX2FmdGVyX2Fzc2VydEAxOQogICAgYnl0ZWMgMjAgLy8gIkVSUjpJWEZSIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklYRlIKCnB1cmNoYXNlQXNhX2FmdGVyX2Fzc2VydEAxOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzkzCiAgICAvLyB0aGlzLnRyYW5zZmVyUHVyY2hhc2VUb0J1eWVyKGJ1eWVyKQogICAgY2FsbHN1YiB0cmFuc2ZlclB1cmNoYXNlVG9CdXllcgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxODYKICAgIC8vIGNvbnN0IGFtb3VudHMgPSB0aGlzLmdldEFtb3VudHModGhpcy5wcmljZS52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMwCiAgICAvLyBwcmljZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVByaWNlIH0pCiAgICBieXRlYyA2IC8vICJwcmljZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTg2CiAgICAvLyBjb25zdCBhbW91bnRzID0gdGhpcy5nZXRBbW91bnRzKHRoaXMucHJpY2UudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgY2FsbHN1YiBnZXRBbW91bnRzCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTg5CiAgICAvLyBsZXQgbGVmdG92ZXI6IHVpbnQ2NCA9IGFtb3VudHMuYWtpdGEKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE5MAogICAgLy8gaWYgKGFtb3VudHMuYWtpdGEgPiAwKSB7CiAgICBieiBwdXJjaGFzZUFzYV9hZnRlcl9pZl9lbHNlQDIyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE5MQogICAgLy8gKHsgbGVmdG92ZXIgfSA9IHNlbmRSZWZlcnJhbFBheW1lbnQodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5wYXltZW50QXNzZXQudmFsdWUuaWQsIGFtb3VudHMuYWtpdGEpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMiAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxOTEKICAgIC8vICh7IGxlZnRvdmVyIH0gPSBzZW5kUmVmZXJyYWxQYXltZW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLmlkLCBhbW91bnRzLmFraXRhKSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMgogICAgLy8gcGF5bWVudEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQYXltZW50QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInBheW1lbnRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE5MQogICAgLy8gKHsgbGVmdG92ZXIgfSA9IHNlbmRSZWZlcnJhbFBheW1lbnQodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5wYXltZW50QXNzZXQudmFsdWUuaWQsIGFtb3VudHMuYWtpdGEpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHVuY292ZXIgMgogICAgY2FsbHN1YiBzZW5kUmVmZXJyYWxQYXltZW50CiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKCnB1cmNoYXNlQXNhX2FmdGVyX2lmX2Vsc2VAMjI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE5NC0yMDAKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGxlZnRvdmVyLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5wYXltZW50QXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxOTYKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo1NwogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlBa2l0YURBT0VzY3JvdyB9KQogICAgYnl0ZWMgMTMgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTk2CiAgICAvLyBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHB1c2hpbnQgMgogICAgZXh0cmFjdF91aW50NjQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTk4CiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzIKICAgIC8vIHBheW1lbnRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5UGF5bWVudEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJwYXltZW50X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxOTgKICAgIC8vIHhmZXJBc3NldDogdGhpcy5wYXltZW50QXNzZXQudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxOTQtMTk5CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBsZWZ0b3ZlciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgaW50Y18zIC8vIDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxOTQtMjAwCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBsZWZ0b3ZlciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIwMwogICAgLy8gaWYgKCF0aGlzLmlzUHJpemVCb3gudmFsdWUpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI4CiAgICAvLyBpc1ByaXplQm94ID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleUlzUHJpemVCb3ggfSkKICAgIGJ5dGVjIDUgLy8gImlzX3ByaXplX2JveCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjAzCiAgICAvLyBpZiAoIXRoaXMuaXNQcml6ZUJveC52YWx1ZSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJueiBwdXJjaGFzZUFzYV9hZnRlcl9pZl9lbHNlQDI2CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIwNAogICAgLy8gY29uc3QgYXNzZXRQcml6ZSA9IEFzc2V0KHRoaXMucHJpemUudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNgogICAgLy8gcHJpemUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQcml6ZSB9KQogICAgYnl0ZWNfMyAvLyAicHJpemUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIwNAogICAgLy8gY29uc3QgYXNzZXRQcml6ZSA9IEFzc2V0KHRoaXMucHJpemUudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjA2CiAgICAvLyBpZiAoYXNzZXRQcml6ZS5jcmVhdG9yLmlzT3B0ZWRJbih0aGlzLnBheW1lbnRBc3NldC52YWx1ZSkpIHsKICAgIGFzc2V0X3BhcmFtc19nZXQgQXNzZXRDcmVhdG9yCiAgICBhc3NlcnQgLy8gYXNzZXQgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMgogICAgLy8gcGF5bWVudEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQYXltZW50QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInBheW1lbnRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIwNgogICAgLy8gaWYgKGFzc2V0UHJpemUuY3JlYXRvci5pc09wdGVkSW4odGhpcy5wYXltZW50QXNzZXQudmFsdWUpKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJ6IHB1cmNoYXNlQXNhX2Vsc2VfYm9keUAyNQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyMDctMjEzCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBhc3NldFByaXplLmNyZWF0b3IsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudHMuY3JlYXRvciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjA5CiAgICAvLyBhc3NldFJlY2VpdmVyOiBhc3NldFByaXplLmNyZWF0b3IsCiAgICBhc3NldF9wYXJhbXNfZ2V0IEFzc2V0Q3JlYXRvcgogICAgYXNzZXJ0IC8vIGFzc2V0IGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyMTAKICAgIC8vIGFzc2V0QW1vdW50OiBhbW91bnRzLmNyZWF0b3IsCiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIxMQogICAgLy8geGZlckFzc2V0OiB0aGlzLnBheW1lbnRBc3NldC52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMyCiAgICAvLyBwYXltZW50QXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVBheW1lbnRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAicGF5bWVudF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjExCiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjA3LTIxMgogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogYXNzZXRQcml6ZS5jcmVhdG9yLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnRzLmNyZWF0b3IsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnBheW1lbnRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIGludGNfMyAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjA3LTIxMwogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogYXNzZXRQcml6ZS5jcmVhdG9yLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnRzLmNyZWF0b3IsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnBheW1lbnRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAoKcHVyY2hhc2VBc2FfYWZ0ZXJfaWZfZWxzZUAyNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjI4CiAgICAvLyBpZiAodGhpcy5tYXJrZXRwbGFjZS52YWx1ZS5pc09wdGVkSW4odGhpcy5wYXltZW50QXNzZXQudmFsdWUpKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo1MwogICAgLy8gbWFya2V0cGxhY2UgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5TWFya2V0cGxhY2UgfSkKICAgIGJ5dGVjIDkgLy8gIm1hcmtldHBsYWNlIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyMjgKICAgIC8vIGlmICh0aGlzLm1hcmtldHBsYWNlLnZhbHVlLmlzT3B0ZWRJbih0aGlzLnBheW1lbnRBc3NldC52YWx1ZSkpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMgogICAgLy8gcGF5bWVudEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQYXltZW50QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInBheW1lbnRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIyOAogICAgLy8gaWYgKHRoaXMubWFya2V0cGxhY2UudmFsdWUuaXNPcHRlZEluKHRoaXMucGF5bWVudEFzc2V0LnZhbHVlKSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBieiBwdXJjaGFzZUFzYV9lbHNlX2JvZHlAMjgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjI5LTIzNQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5tYXJrZXRwbGFjZS52YWx1ZSwKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50cy5tYXJrZXRwbGFjZSwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjMxCiAgICAvLyBhc3NldFJlY2VpdmVyOiB0aGlzLm1hcmtldHBsYWNlLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NTMKICAgIC8vIG1hcmtldHBsYWNlID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleU1hcmtldHBsYWNlIH0pCiAgICBieXRlYyA5IC8vICJtYXJrZXRwbGFjZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjMxCiAgICAvLyBhc3NldFJlY2VpdmVyOiB0aGlzLm1hcmtldHBsYWNlLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjMyCiAgICAvLyBhc3NldEFtb3VudDogYW1vdW50cy5tYXJrZXRwbGFjZSwKICAgIGRpZyAxCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyMzMKICAgIC8vIHhmZXJBc3NldDogdGhpcy5wYXltZW50QXNzZXQudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMgogICAgLy8gcGF5bWVudEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQYXltZW50QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInBheW1lbnRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIzMwogICAgLy8geGZlckFzc2V0OiB0aGlzLnBheW1lbnRBc3NldC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIyOS0yMzQKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHRoaXMubWFya2V0cGxhY2UudmFsdWUsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudHMubWFya2V0cGxhY2UsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnBheW1lbnRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIGludGNfMyAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjI5LTIzNQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5tYXJrZXRwbGFjZS52YWx1ZSwKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50cy5tYXJrZXRwbGFjZSwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CgpwdXJjaGFzZUFzYV9hZnRlcl9pZl9lbHNlQDI5OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNDkKICAgIC8vIGlmIChtYXJrZXRwbGFjZS5pc09wdGVkSW4odGhpcy5wYXltZW50QXNzZXQudmFsdWUpKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMgogICAgLy8gcGF5bWVudEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQYXltZW50QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInBheW1lbnRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI0OQogICAgLy8gaWYgKG1hcmtldHBsYWNlLmlzT3B0ZWRJbih0aGlzLnBheW1lbnRBc3NldC52YWx1ZSkpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgMgogICAgc3dhcAogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJ6IHB1cmNoYXNlQXNhX2Vsc2VfYm9keUAzMQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNTAtMjU2CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBtYXJrZXRwbGFjZSwKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50cy5tYXJrZXRwbGFjZSwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjUzCiAgICAvLyBhc3NldEFtb3VudDogYW1vdW50cy5tYXJrZXRwbGFjZSwKICAgIGR1cAogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjU0CiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzIKICAgIC8vIHBheW1lbnRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5UGF5bWVudEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJwYXltZW50X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNTQKICAgIC8vIHhmZXJBc3NldDogdGhpcy5wYXltZW50QXNzZXQudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNTAtMjU1CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBtYXJrZXRwbGFjZSwKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50cy5tYXJrZXRwbGFjZSwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgaW50Y18zIC8vIDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNTAtMjU2CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBtYXJrZXRwbGFjZSwKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50cy5tYXJrZXRwbGFjZSwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CgpwdXJjaGFzZUFzYV9hZnRlcl9pZl9lbHNlQDMyOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNzAKICAgIC8vIGlmICh0aGlzLnNlbGxlci52YWx1ZS5pc09wdGVkSW4odGhpcy5wYXltZW50QXNzZXQudmFsdWUpKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNgogICAgLy8gc2VsbGVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVNlbGxlciB9KQogICAgYnl0ZWNfMSAvLyAic2VsbGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNzAKICAgIC8vIGlmICh0aGlzLnNlbGxlci52YWx1ZS5pc09wdGVkSW4odGhpcy5wYXltZW50QXNzZXQudmFsdWUpKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzIKICAgIC8vIHBheW1lbnRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5UGF5bWVudEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJwYXltZW50X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNzAKICAgIC8vIGlmICh0aGlzLnNlbGxlci52YWx1ZS5pc09wdGVkSW4odGhpcy5wYXltZW50QXNzZXQudmFsdWUpKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJ6IHB1cmNoYXNlQXNhX2Vsc2VfYm9keUAzNAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI3MS0yNzYKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0Q2xvc2VUbzogdGhpcy5zZWxsZXIudmFsdWUsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnBheW1lbnRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI3MwogICAgLy8gYXNzZXRDbG9zZVRvOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM2CiAgICAvLyBzZWxsZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5U2VsbGVyIH0pCiAgICBieXRlY18xIC8vICJzZWxsZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI3MwogICAgLy8gYXNzZXRDbG9zZVRvOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI3NAogICAgLy8geGZlckFzc2V0OiB0aGlzLnBheW1lbnRBc3NldC52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMyCiAgICAvLyBwYXltZW50QXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVBheW1lbnRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAicGF5bWVudF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6Mjc0CiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBpdHhuX2ZpZWxkIEFzc2V0Q2xvc2VUbwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNzEtMjc1CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldENsb3NlVG86IHRoaXMuc2VsbGVyLnZhbHVlLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5wYXltZW50QXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICBpbnRjXzMgLy8gNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI3MS0yNzYKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0Q2xvc2VUbzogdGhpcy5zZWxsZXIudmFsdWUsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnBheW1lbnRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAoKcHVyY2hhc2VBc2FfYWZ0ZXJfaWZfZWxzZUAzNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6Mzk1LTM5NwogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7IGNsb3NlUmVtYWluZGVyVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcyB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6Mzk2CiAgICAvLyAucGF5bWVudCh7IGNsb3NlUmVtYWluZGVyVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcyB9KQogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICBpdHhuX2ZpZWxkIENsb3NlUmVtYWluZGVyVG8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6Mzk1LTM5NgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7IGNsb3NlUmVtYWluZGVyVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcyB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozOTUtMzk3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsgY2xvc2VSZW1haW5kZXJUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6Mzc2CiAgICAvLyBAYWJpbWV0aG9kKHsgT25Db21wbGV0ZUFjdGlvbjogJ0RlbGV0ZUFwcGxpY2F0aW9uJyB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKcHVyY2hhc2VBc2FfZWxzZV9ib2R5QDM0OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNzkKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18yIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI3OQogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI4MAogICAgLy8gdGhpcy5wYXltZW50QXNzZXQudmFsdWUuaWQsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMgogICAgLy8gcGF5bWVudEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQYXltZW50QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInBheW1lbnRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI4MAogICAgLy8gdGhpcy5wYXltZW50QXNzZXQudmFsdWUuaWQsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyODMKICAgIC8vIFt7IGFkZHJlc3M6IHRoaXMuc2VsbGVyLnZhbHVlLCBhbW91bnQ6IGFtb3VudHMuc2VsbGVyIH1dLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzYKICAgIC8vIHNlbGxlciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlTZWxsZXIgfSkKICAgIGJ5dGVjXzEgLy8gInNlbGxlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjgzCiAgICAvLyBbeyBhZGRyZXNzOiB0aGlzLnNlbGxlci52YWx1ZSwgYW1vdW50OiBhbW91bnRzLnNlbGxlciB9XSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICB1bmNvdmVyIDMKICAgIHB1c2hpbnQgMjQKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgY29uY2F0CiAgICBieXRlYyA0IC8vIDB4MDAwMQogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI3OC0yODYKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLmlkLAogICAgLy8gICAwLAogICAgLy8gICBNQVhfVUlOVDY0LAogICAgLy8gICBbeyBhZGRyZXNzOiB0aGlzLnNlbGxlci52YWx1ZSwgYW1vdW50OiBhbW91bnRzLnNlbGxlciB9XSwKICAgIC8vICAgYW1vdW50cy5zZWxsZXIsCiAgICAvLyAgIGZhbHNlCiAgICAvLyApCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyODEKICAgIC8vIDAsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyODIKICAgIC8vIE1BWF9VSU5UNjQsCiAgICBpbnRjIDUgLy8gMTg0NDY3NDQwNzM3MDk1NTE2MTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6Mjc4LTI4NgogICAgLy8gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgdGhpcy5wYXltZW50QXNzZXQudmFsdWUuaWQsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IHRoaXMuc2VsbGVyLnZhbHVlLCBhbW91bnQ6IGFtb3VudHMuc2VsbGVyIH1dLAogICAgLy8gICBhbW91bnRzLnNlbGxlciwKICAgIC8vICAgZmFsc2UKICAgIC8vICkKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI4NQogICAgLy8gZmFsc2UKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI3OC0yODYKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLmlkLAogICAgLy8gICAwLAogICAgLy8gICBNQVhfVUlOVDY0LAogICAgLy8gICBbeyBhZGRyZXNzOiB0aGlzLnNlbGxlci52YWx1ZSwgYW1vdW50OiBhbW91bnRzLnNlbGxlciB9XSwKICAgIC8vICAgYW1vdW50cy5zZWxsZXIsCiAgICAvLyAgIGZhbHNlCiAgICAvLyApCiAgICBjYWxsc3ViIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQKICAgIHBvcG4gMgogICAgYiBwdXJjaGFzZUFzYV9hZnRlcl9pZl9lbHNlQDM1CgpwdXJjaGFzZUFzYV9lbHNlX2JvZHlAMzE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI1OQogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzIgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjU5CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjYwCiAgICAvLyB0aGlzLnBheW1lbnRBc3NldC52YWx1ZS5pZCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMyCiAgICAvLyBwYXltZW50QXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVBheW1lbnRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAicGF5bWVudF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjYwCiAgICAvLyB0aGlzLnBheW1lbnRBc3NldC52YWx1ZS5pZCwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI2MwogICAgLy8gW3sgYWRkcmVzczogbWFya2V0cGxhY2UsIGFtb3VudDogYW1vdW50cy5tYXJrZXRwbGFjZSB9XSwKICAgIGRpZyAyCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBpdG9iCiAgICB1bmNvdmVyIDUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYnl0ZWMgNCAvLyAweDAwMDEKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNTgtMjY2CiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICB0aGlzLnBheW1lbnRBc3NldC52YWx1ZS5pZCwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogbWFya2V0cGxhY2UsIGFtb3VudDogYW1vdW50cy5tYXJrZXRwbGFjZSB9XSwKICAgIC8vICAgYW1vdW50cy5tYXJrZXRwbGFjZSwKICAgIC8vICAgZmFsc2UKICAgIC8vICkKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI2MQogICAgLy8gMCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI2MgogICAgLy8gTUFYX1VJTlQ2NCwKICAgIGludGMgNSAvLyAxODQ0Njc0NDA3MzcwOTU1MTYxNQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNTgtMjY2CiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICB0aGlzLnBheW1lbnRBc3NldC52YWx1ZS5pZCwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogbWFya2V0cGxhY2UsIGFtb3VudDogYW1vdW50cy5tYXJrZXRwbGFjZSB9XSwKICAgIC8vICAgYW1vdW50cy5tYXJrZXRwbGFjZSwKICAgIC8vICAgZmFsc2UKICAgIC8vICkKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI2NQogICAgLy8gZmFsc2UKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI1OC0yNjYKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLmlkLAogICAgLy8gICAwLAogICAgLy8gICBNQVhfVUlOVDY0LAogICAgLy8gICBbeyBhZGRyZXNzOiBtYXJrZXRwbGFjZSwgYW1vdW50OiBhbW91bnRzLm1hcmtldHBsYWNlIH1dLAogICAgLy8gICBhbW91bnRzLm1hcmtldHBsYWNlLAogICAgLy8gICBmYWxzZQogICAgLy8gKQogICAgY2FsbHN1YiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50CiAgICBwb3BuIDIKICAgIGIgcHVyY2hhc2VBc2FfYWZ0ZXJfaWZfZWxzZUAzMgoKcHVyY2hhc2VBc2FfZWxzZV9ib2R5QDI4OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyMzgKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18yIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIzOAogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIzOQogICAgLy8gdGhpcy5wYXltZW50QXNzZXQudmFsdWUuaWQsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMgogICAgLy8gcGF5bWVudEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQYXltZW50QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInBheW1lbnRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIzOQogICAgLy8gdGhpcy5wYXltZW50QXNzZXQudmFsdWUuaWQsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNDIKICAgIC8vIFt7IGFkZHJlc3M6IHRoaXMubWFya2V0cGxhY2UudmFsdWUsIGFtb3VudDogYW1vdW50cy5tYXJrZXRwbGFjZSB9XSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjUzCiAgICAvLyBtYXJrZXRwbGFjZSA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlNYXJrZXRwbGFjZSB9KQogICAgYnl0ZWMgOSAvLyAibWFya2V0cGxhY2UiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI0MgogICAgLy8gW3sgYWRkcmVzczogdGhpcy5tYXJrZXRwbGFjZS52YWx1ZSwgYW1vdW50OiBhbW91bnRzLm1hcmtldHBsYWNlIH1dLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyAzCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBpdG9iCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYnl0ZWMgNCAvLyAweDAwMDEKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyMzctMjQ1CiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICB0aGlzLnBheW1lbnRBc3NldC52YWx1ZS5pZCwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogdGhpcy5tYXJrZXRwbGFjZS52YWx1ZSwgYW1vdW50OiBhbW91bnRzLm1hcmtldHBsYWNlIH1dLAogICAgLy8gICBhbW91bnRzLm1hcmtldHBsYWNlLAogICAgLy8gICBmYWxzZQogICAgLy8gKQogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjQwCiAgICAvLyAwLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjQxCiAgICAvLyBNQVhfVUlOVDY0LAogICAgaW50YyA1IC8vIDE4NDQ2NzQ0MDczNzA5NTUxNjE1CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIzNy0yNDUKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLmlkLAogICAgLy8gICAwLAogICAgLy8gICBNQVhfVUlOVDY0LAogICAgLy8gICBbeyBhZGRyZXNzOiB0aGlzLm1hcmtldHBsYWNlLnZhbHVlLCBhbW91bnQ6IGFtb3VudHMubWFya2V0cGxhY2UgfV0sCiAgICAvLyAgIGFtb3VudHMubWFya2V0cGxhY2UsCiAgICAvLyAgIGZhbHNlCiAgICAvLyApCiAgICB1bmNvdmVyIDQKICAgIHVuY292ZXIgNQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNDQKICAgIC8vIGZhbHNlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyMzctMjQ1CiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICB0aGlzLnBheW1lbnRBc3NldC52YWx1ZS5pZCwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogdGhpcy5tYXJrZXRwbGFjZS52YWx1ZSwgYW1vdW50OiBhbW91bnRzLm1hcmtldHBsYWNlIH1dLAogICAgLy8gICBhbW91bnRzLm1hcmtldHBsYWNlLAogICAgLy8gICBmYWxzZQogICAgLy8gKQogICAgY2FsbHN1YiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50CiAgICBwb3BuIDIKICAgIGIgcHVyY2hhc2VBc2FfYWZ0ZXJfaWZfZWxzZUAyOQoKcHVyY2hhc2VBc2FfZWxzZV9ib2R5QDI1OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyMTYKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18yIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIxNgogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIxNwogICAgLy8gdGhpcy5wYXltZW50QXNzZXQudmFsdWUuaWQsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMgogICAgLy8gcGF5bWVudEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQYXltZW50QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInBheW1lbnRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIxNwogICAgLy8gdGhpcy5wYXltZW50QXNzZXQudmFsdWUuaWQsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyMjAKICAgIC8vIFt7IGFkZHJlc3M6IGFzc2V0UHJpemUuY3JlYXRvciwgYW1vdW50OiBhbW91bnRzLmNyZWF0b3IgfV0sCiAgICB1bmNvdmVyIDIKICAgIGFzc2V0X3BhcmFtc19nZXQgQXNzZXRDcmVhdG9yCiAgICBhc3NlcnQgLy8gYXNzZXQgZXhpc3RzCiAgICBkaWcgMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgY29uY2F0CiAgICBieXRlYyA0IC8vIDB4MDAwMQogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIxNS0yMjMKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLmlkLAogICAgLy8gICAwLAogICAgLy8gICBNQVhfVUlOVDY0LAogICAgLy8gICBbeyBhZGRyZXNzOiBhc3NldFByaXplLmNyZWF0b3IsIGFtb3VudDogYW1vdW50cy5jcmVhdG9yIH1dLAogICAgLy8gICBhbW91bnRzLmNyZWF0b3IsCiAgICAvLyAgIGZhbHNlCiAgICAvLyApCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyMTgKICAgIC8vIDAsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyMTkKICAgIC8vIE1BWF9VSU5UNjQsCiAgICBpbnRjIDUgLy8gMTg0NDY3NDQwNzM3MDk1NTE2MTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjE1LTIyMwogICAgLy8gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgdGhpcy5wYXltZW50QXNzZXQudmFsdWUuaWQsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IGFzc2V0UHJpemUuY3JlYXRvciwgYW1vdW50OiBhbW91bnRzLmNyZWF0b3IgfV0sCiAgICAvLyAgIGFtb3VudHMuY3JlYXRvciwKICAgIC8vICAgZmFsc2UKICAgIC8vICkKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIyMgogICAgLy8gZmFsc2UKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIxNS0yMjMKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLmlkLAogICAgLy8gICAwLAogICAgLy8gICBNQVhfVUlOVDY0LAogICAgLy8gICBbeyBhZGRyZXNzOiBhc3NldFByaXplLmNyZWF0b3IsIGFtb3VudDogYW1vdW50cy5jcmVhdG9yIH1dLAogICAgLy8gICBhbW91bnRzLmNyZWF0b3IsCiAgICAvLyAgIGZhbHNlCiAgICAvLyApCiAgICBjYWxsc3ViIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQKICAgIHBvcG4gMgogICAgYiBwdXJjaGFzZUFzYV9hZnRlcl9pZl9lbHNlQDI2CgpwdXJjaGFzZUFzYV9ib29sX2ZhbHNlQDg6CiAgICBpbnRjXzAgLy8gMAogICAgYiBwdXJjaGFzZUFzYV9ib29sX21lcmdlQDkKCgovLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjpMaXN0aW5nLmRlbGlzdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmRlbGlzdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDAxCiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiAnRGVsZXRlQXBwbGljYXRpb24nIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQwMwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywgRVJSX01VU1RfQkVfQ0FMTEVEX0ZST01fRkFDVE9SWSkKICAgIHR4biBTZW5kZXIKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgPT0KICAgIGJueiBkZWxpc3RfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDExIC8vICJFUlI6TUJGRiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpNQkZGCgpkZWxpc3RfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQwNAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc2VsbGVyLnZhbHVlID09PSBjYWxsZXIsIEVSUl9PTkxZX1NFTExFUl9DQU5fREVMSVNUKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzYKICAgIC8vIHNlbGxlciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlTZWxsZXIgfSkKICAgIGJ5dGVjXzEgLy8gInNlbGxlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDA0CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zZWxsZXIudmFsdWUgPT09IGNhbGxlciwgRVJSX09OTFlfU0VMTEVSX0NBTl9ERUxJU1QpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPT0KICAgIGJueiBkZWxpc3RfYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOk9TQ0QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6T1NDRAoKZGVsaXN0X2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MDcKICAgIC8vIGFzc2V0Q2xvc2VUbzogdGhpcy5zZWxsZXIudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNgogICAgLy8gc2VsbGVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVNlbGxlciB9KQogICAgYnl0ZWNfMSAvLyAic2VsbGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MDcKICAgIC8vIGFzc2V0Q2xvc2VUbzogdGhpcy5zZWxsZXIudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MDgKICAgIC8vIHhmZXJBc3NldDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI2CiAgICAvLyBwcml6ZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVByaXplIH0pCiAgICBieXRlY18zIC8vICJwcml6ZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDA4CiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMucHJpemUudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MTIKICAgIC8vIGNsb3NlUmVtYWluZGVyVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MTUKICAgIC8vIGlmICghKHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLmlkID09PSAwKSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzIKICAgIC8vIHBheW1lbnRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5UGF5bWVudEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJwYXltZW50X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MTUKICAgIC8vIGlmICghKHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLmlkID09PSAwKSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGRlbGlzdF9lbHNlX2JvZHlAMTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDE4CiAgICAvLyBhc3NldENsb3NlVG86IHRoaXMuc2VsbGVyLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzYKICAgIC8vIHNlbGxlciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlTZWxsZXIgfSkKICAgIGJ5dGVjXzEgLy8gInNlbGxlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDE4CiAgICAvLyBhc3NldENsb3NlVG86IHRoaXMuc2VsbGVyLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGNvdmVyIDQKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDE5CiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzIKICAgIC8vIHBheW1lbnRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5UGF5bWVudEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJwYXltZW50X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MTkKICAgIC8vIHhmZXJBc3NldDogdGhpcy5wYXltZW50QXNzZXQudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MjIKICAgIC8vIGlmICh0aGlzLmlzUHJpemVCb3gudmFsdWUpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI4CiAgICAvLyBpc1ByaXplQm94ID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleUlzUHJpemVCb3ggfSkKICAgIGJ5dGVjIDUgLy8gImlzX3ByaXplX2JveCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDIyCiAgICAvLyBpZiAodGhpcy5pc1ByaXplQm94LnZhbHVlKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogZGVsaXN0X2Vsc2VfYm9keUAxMQogICAgYnVyeSAxCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDIzLTQyNgogICAgLy8gYWJpQ2FsbDx0eXBlb2YgUHJpemVCb3gucHJvdG90eXBlLnRyYW5zZmVyPih7CiAgICAvLyAgIGFwcElkOiB0aGlzLnByaXplLnZhbHVlLAogICAgLy8gICBhcmdzOiBbdGhpcy5zZWxsZXIudmFsdWVdLAogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDI1CiAgICAvLyBhcmdzOiBbdGhpcy5zZWxsZXIudmFsdWVdLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzYKICAgIC8vIHNlbGxlciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlTZWxsZXIgfSkKICAgIGJ5dGVjXzEgLy8gInNlbGxlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDI1CiAgICAvLyBhcmdzOiBbdGhpcy5zZWxsZXIudmFsdWVdLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDI0CiAgICAvLyBhcHBJZDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI2CiAgICAvLyBwcml6ZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVByaXplIH0pCiAgICBieXRlY18zIC8vICJwcml6ZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDI0CiAgICAvLyBhcHBJZDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDIzLTQyNgogICAgLy8gYWJpQ2FsbDx0eXBlb2YgUHJpemVCb3gucHJvdG90eXBlLnRyYW5zZmVyPih7CiAgICAvLyAgIGFwcElkOiB0aGlzLnByaXplLnZhbHVlLAogICAgLy8gICBhcmdzOiBbdGhpcy5zZWxsZXIudmFsdWVdLAogICAgLy8gfSkKICAgIGJ5dGVjIDE2IC8vIG1ldGhvZCAidHJhbnNmZXIoYWRkcmVzcyl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MjcKICAgIC8vIGl0eG4uc3VibWl0R3JvdXAocGF5bWVudEFzc2V0VHJhbnNmZXIsIHBheW1lbnQpCiAgICBpdHhuX2JlZ2luCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgc3dhcAogICAgaXR4bl9maWVsZCBBc3NldENsb3NlVG8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDE3LTQyMAogICAgLy8gY29uc3QgcGF5bWVudEFzc2V0VHJhbnNmZXIgPSBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICBhc3NldENsb3NlVG86IHRoaXMuc2VsbGVyLnZhbHVlLAogICAgLy8gICB4ZmVyQXNzZXQ6IHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLAogICAgLy8gfSkKICAgIGludGNfMyAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDI3CiAgICAvLyBpdHhuLnN1Ym1pdEdyb3VwKHBheW1lbnRBc3NldFRyYW5zZmVyLCBwYXltZW50KQogICAgaXR4bl9uZXh0CiAgICBpdHhuX2ZpZWxkIENsb3NlUmVtYWluZGVyVG8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDExLTQxMwogICAgLy8gY29uc3QgcGF5bWVudCA9IGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIGNsb3NlUmVtYWluZGVyVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIC8vIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQyNwogICAgLy8gaXR4bi5zdWJtaXRHcm91cChwYXltZW50QXNzZXRUcmFuc2ZlciwgcGF5bWVudCkKICAgIGl0eG5fc3VibWl0CgpkZWxpc3RfYWZ0ZXJfaWZfZWxzZUAyNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDAxCiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiAnRGVsZXRlQXBwbGljYXRpb24nIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpkZWxpc3RfZWxzZV9ib2R5QDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MjkKICAgIC8vIGl0eG4uc3VibWl0R3JvdXAoYXNzZXRUcmFuc2ZlciwgcGF5bWVudEFzc2V0VHJhbnNmZXIsIHBheW1lbnQpCiAgICBpdHhuX2JlZ2luCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgc3dhcAogICAgaXR4bl9maWVsZCBBc3NldENsb3NlVG8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDA2LTQwOQogICAgLy8gY29uc3QgYXNzZXRUcmFuc2ZlciA9IGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgIGFzc2V0Q2xvc2VUbzogdGhpcy5zZWxsZXIudmFsdWUsCiAgICAvLyAgIHhmZXJBc3NldDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vIH0pCiAgICBpbnRjXzMgLy8gNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQyOQogICAgLy8gaXR4bi5zdWJtaXRHcm91cChhc3NldFRyYW5zZmVyLCBwYXltZW50QXNzZXRUcmFuc2ZlciwgcGF5bWVudCkKICAgIGl0eG5fbmV4dAogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXNzZXRDbG9zZVRvCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQxNy00MjAKICAgIC8vIGNvbnN0IHBheW1lbnRBc3NldFRyYW5zZmVyID0gaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgYXNzZXRDbG9zZVRvOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIC8vICAgeGZlckFzc2V0OiB0aGlzLnBheW1lbnRBc3NldC52YWx1ZSwKICAgIC8vIH0pCiAgICBpbnRjXzMgLy8gNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQyOQogICAgLy8gaXR4bi5zdWJtaXRHcm91cChhc3NldFRyYW5zZmVyLCBwYXltZW50QXNzZXRUcmFuc2ZlciwgcGF5bWVudCkKICAgIGl0eG5fbmV4dAogICAgaXR4bl9maWVsZCBDbG9zZVJlbWFpbmRlclRvCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQxMS00MTMKICAgIC8vIGNvbnN0IHBheW1lbnQgPSBpdHhuLnBheW1lbnQoewogICAgLy8gICBjbG9zZVJlbWFpbmRlclRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MsCiAgICAvLyB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MjkKICAgIC8vIGl0eG4uc3VibWl0R3JvdXAoYXNzZXRUcmFuc2ZlciwgcGF5bWVudEFzc2V0VHJhbnNmZXIsIHBheW1lbnQpCiAgICBpdHhuX3N1Ym1pdAogICAgYiBkZWxpc3RfYWZ0ZXJfaWZfZWxzZUAyNAoKZGVsaXN0X2Vsc2VfYm9keUAxNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDMyCiAgICAvLyBpZiAodGhpcy5pc1ByaXplQm94LnZhbHVlKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyOAogICAgLy8gaXNQcml6ZUJveCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlJc1ByaXplQm94IH0pCiAgICBieXRlYyA1IC8vICJpc19wcml6ZV9ib3giCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQzMgogICAgLy8gaWYgKHRoaXMuaXNQcml6ZUJveC52YWx1ZSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGRlbGlzdF9lbHNlX2JvZHlAMjAKICAgIHBvcG4gMgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MzMtNDM2CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBQcml6ZUJveC5wcm90b3R5cGUudHJhbnNmZXI+KHsKICAgIC8vICAgYXBwSWQ6IHRoaXMucHJpemUudmFsdWUsCiAgICAvLyAgIGFyZ3M6IFt0aGlzLnNlbGxlci52YWx1ZV0sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MzUKICAgIC8vIGFyZ3M6IFt0aGlzLnNlbGxlci52YWx1ZV0sCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNgogICAgLy8gc2VsbGVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVNlbGxlciB9KQogICAgYnl0ZWNfMSAvLyAic2VsbGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MzUKICAgIC8vIGFyZ3M6IFt0aGlzLnNlbGxlci52YWx1ZV0sCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MzQKICAgIC8vIGFwcElkOiB0aGlzLnByaXplLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjYKICAgIC8vIHByaXplID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5UHJpemUgfSkKICAgIGJ5dGVjXzMgLy8gInByaXplIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MzQKICAgIC8vIGFwcElkOiB0aGlzLnByaXplLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MzMtNDM2CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBQcml6ZUJveC5wcm90b3R5cGUudHJhbnNmZXI+KHsKICAgIC8vICAgYXBwSWQ6IHRoaXMucHJpemUudmFsdWUsCiAgICAvLyAgIGFyZ3M6IFt0aGlzLnNlbGxlci52YWx1ZV0sCiAgICAvLyB9KQogICAgYnl0ZWMgMTYgLy8gbWV0aG9kICJ0cmFuc2ZlcihhZGRyZXNzKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQzNwogICAgLy8gcGF5bWVudC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgaXR4bl9maWVsZCBDbG9zZVJlbWFpbmRlclRvCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQxMS00MTMKICAgIC8vIGNvbnN0IHBheW1lbnQgPSBpdHhuLnBheW1lbnQoewogICAgLy8gICBjbG9zZVJlbWFpbmRlclRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MsCiAgICAvLyB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MzcKICAgIC8vIHBheW1lbnQuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICBiIGRlbGlzdF9hZnRlcl9pZl9lbHNlQDI0CgpkZWxpc3RfZWxzZV9ib2R5QDIwOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MzkKICAgIC8vIGl0eG4uc3VibWl0R3JvdXAoYXNzZXRUcmFuc2ZlciwgcGF5bWVudCkKICAgIGl0eG5fYmVnaW4KICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBpdHhuX2ZpZWxkIEFzc2V0Q2xvc2VUbwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MDYtNDA5CiAgICAvLyBjb25zdCBhc3NldFRyYW5zZmVyID0gaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgYXNzZXRDbG9zZVRvOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIC8vICAgeGZlckFzc2V0OiB0aGlzLnByaXplLnZhbHVlLAogICAgLy8gfSkKICAgIGludGNfMyAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDM5CiAgICAvLyBpdHhuLnN1Ym1pdEdyb3VwKGFzc2V0VHJhbnNmZXIsIHBheW1lbnQpCiAgICBpdHhuX25leHQKICAgIGl0eG5fZmllbGQgQ2xvc2VSZW1haW5kZXJUbwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MTEtNDEzCiAgICAvLyBjb25zdCBwYXltZW50ID0gaXR4bi5wYXltZW50KHsKICAgIC8vICAgY2xvc2VSZW1haW5kZXJUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgLy8gfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDM5CiAgICAvLyBpdHhuLnN1Ym1pdEdyb3VwKGFzc2V0VHJhbnNmZXIsIHBheW1lbnQpCiAgICBpdHhuX3N1Ym1pdAogICAgYiBkZWxpc3RfYWZ0ZXJfaWZfZWxzZUAyNAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6Okxpc3RpbmcuY2hhbmdlUHJpY2Vbcm91dGluZ10oKSAtPiB2b2lkOgpjaGFuZ2VQcmljZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDQ0CiAgICAvLyBjaGFuZ2VQcmljZShwcmljZTogdWludDY0KTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ0NQogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuc2VsbGVyLnZhbHVlLCBFUlJfTVVTVF9CRV9TRUxMRVIpCiAgICB0eG4gU2VuZGVyCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNgogICAgLy8gc2VsbGVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVNlbGxlciB9KQogICAgYnl0ZWNfMSAvLyAic2VsbGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0NDUKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLnNlbGxlci52YWx1ZSwgRVJSX01VU1RfQkVfU0VMTEVSKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgID09CiAgICBibnogY2hhbmdlUHJpY2VfYWZ0ZXJfYXNzZXJ0QDMKICAgIHB1c2hieXRlcyAiRVJSOk1CU0wiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TUJTTAoKY2hhbmdlUHJpY2VfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMwCiAgICAvLyBwcmljZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVByaWNlIH0pCiAgICBieXRlYyA2IC8vICJwcmljZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDQ2CiAgICAvLyB0aGlzLnByaWNlLnZhbHVlID0gcHJpY2UKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ0NAogICAgLy8gY2hhbmdlUHJpY2UocHJpY2U6IHVpbnQ2NCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpBa2l0YUJhc2VDb250cmFjdC51cGRhdGVBa2l0YURBT1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZUFraXRhREFPOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzYKICAgIC8vIHVwZGF0ZUFraXRhREFPKGFraXRhREFPOiBBcHBsaWNhdGlvbik6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzcKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18yIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgcHVzaGJ5dGVzICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozNwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogdXBkYXRlQWtpdGFEQU9fYWZ0ZXJfYXNzZXJ0QDMKICAgIHB1c2hieXRlcyAiRVJSOk5EQU8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TkRBTwoKdXBkYXRlQWtpdGFEQU9fYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzIgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM4CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlID0gYWtpdGFEQU8KICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozNgogICAgLy8gdXBkYXRlQWtpdGFEQU8oYWtpdGFEQU86IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjpDb250cmFjdFdpdGhDcmVhdG9yT25seU9wdEluLm9wdGluW3JvdXRpbmddKCkgLT4gdm9pZDoKb3B0aW46CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6NDcKICAgIC8vIG9wdGluKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYXNzZXQ6IHVpbnQ2NCk6IHZvaWQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6NDgKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSBHbG9iYWwuY3JlYXRvckFkZHJlc3MsIEVSUl9GT1JCSURERU4pCiAgICB0eG4gU2VuZGVyCiAgICBnbG9iYWwgQ3JlYXRvckFkZHJlc3MKICAgID09CiAgICBibnogb3B0aW5fYWZ0ZXJfYXNzZXJ0QDMKICAgIHB1c2hieXRlcyAiRVJSOkZPUkIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6Rk9SQgoKb3B0aW5fYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6NTAKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgRVJSX0lOVkFMSURfUEFZTUVOVF9SRUNFSVZFUikKICAgIGRpZyAxCiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogb3B0aW5fYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOklQTVIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBNUgoKb3B0aW5fYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6NTEKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LmFtb3VudCA9PT0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlLCBFUlJfSU5WQUxJRF9QQVlNRU5UX0FNT1VOVCkKICAgIHN3YXAKICAgIGd0eG5zIEFtb3VudAogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICA9PQogICAgYm56IG9wdGluX2FmdGVyX2Fzc2VydEA3CiAgICBwdXNoYnl0ZXMgIkVSUjpJUE1BIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQTUEKCm9wdGluX2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjUzLTU3CiAgICAvLyBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgYXNzZXRBbW91bnQ6IDAsCiAgICAvLyAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vIH0pLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6NTQKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6NTUKICAgIC8vIGFzc2V0QW1vdW50OiAwLAogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjUzLTU3CiAgICAvLyBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgYXNzZXRBbW91bnQ6IDAsCiAgICAvLyAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vIH0pLnN1Ym1pdCgpCiAgICBpbnRjXzMgLy8gNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjQ3CiAgICAvLyBvcHRpbihwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGFzc2V0OiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjpMaXN0aW5nLmdldEFtb3VudHMoYW1vdW50OiB1aW50NjQpIC0+IGJ5dGVzOgpnZXRBbW91bnRzOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo2MQogICAgLy8gcHJpdmF0ZSBnZXRBbW91bnRzKGFtb3VudDogdWludDY0KTogUm95YWx0eUFtb3VudHMgewogICAgcHJvdG8gMSAxCiAgICBwdXNoYnl0ZXMgIiIKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo2MgogICAgLy8gbGV0IGNyZWF0b3JBbW91bnQgPSBjYWxjUGVyY2VudChhbW91bnQsIHRoaXMuY3JlYXRvclJveWFsdHkudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MAogICAgLy8gY3JlYXRvclJveWFsdHkgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlDcmVhdG9yUm95YWx0eSB9KQogICAgYnl0ZWMgMTIgLy8gImNyZWF0b3Jfcm95YWx0eSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NjIKICAgIC8vIGxldCBjcmVhdG9yQW1vdW50ID0gY2FsY1BlcmNlbnQoYW1vdW50LCB0aGlzLmNyZWF0b3JSb3lhbHR5LnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA4CiAgICAvLyBhc3NlcnQocCA8PSBESVZJU09SLCBFUlJfSU5WQUxJRF9QRVJDRU5UQUdFKQogICAgZHVwCiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICA8PQogICAgYXNzZXJ0IC8vIElQQ1QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA5CiAgICAvLyByZXR1cm4gb3AuZGl2dyguLi5vcC5tdWx3KGEsIHApLCBESVZJU09SKQogICAgZnJhbWVfZGlnIC0xCiAgICBtdWx3CiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICBkaXZ3CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NjMKICAgIC8vIGlmIChjcmVhdG9yQW1vdW50ID09PSAwICYmIHRoaXMuY3JlYXRvclJveWFsdHkudmFsdWUgPiAwICYmIGFtb3VudCA+IDApIHsKICAgIGJueiBnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VANAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDAKICAgIC8vIGNyZWF0b3JSb3lhbHR5ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5Q3JlYXRvclJveWFsdHkgfSkKICAgIGJ5dGVjIDEyIC8vICJjcmVhdG9yX3JveWFsdHkiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjYzCiAgICAvLyBpZiAoY3JlYXRvckFtb3VudCA9PT0gMCAmJiB0aGlzLmNyZWF0b3JSb3lhbHR5LnZhbHVlID4gMCAmJiBhbW91bnQgPiAwKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogZ2V0QW1vdW50c19hZnRlcl9pZl9lbHNlQDQKICAgIGZyYW1lX2RpZyAtMQogICAgYnogZ2V0QW1vdW50c19hZnRlcl9pZl9lbHNlQDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NjQKICAgIC8vIGNyZWF0b3JBbW91bnQgPSAxCiAgICBpbnRjXzEgLy8gMQogICAgZnJhbWVfYnVyeSAyCgpnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NjcKICAgIC8vIGNvbnN0IHsgbWFya2V0cGxhY2VTYWxlUGVyY2VudGFnZU1pbjogbWluLCBtYXJrZXRwbGFjZVNhbGVQZXJjZW50YWdlTWF4OiBtYXggfSA9IGdldE5GVEZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzIgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NjcKICAgIC8vIGNvbnN0IHsgbWFya2V0cGxhY2VTYWxlUGVyY2VudGFnZU1pbjogbWluLCBtYXJrZXRwbGFjZVNhbGVQZXJjZW50YWdlTWF4OiBtYXggfSA9IGdldE5GVEZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjkzCiAgICAvLyBjb25zdCBbbmZ0RmVlc0J5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c05GVEZlZXMpKQogICAgZHVwCiAgICBieXRlYyAxNyAvLyAibmZ0X2ZlZXMiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjY3CiAgICAvLyBjb25zdCB7IG1hcmtldHBsYWNlU2FsZVBlcmNlbnRhZ2VNaW46IG1pbiwgbWFya2V0cGxhY2VTYWxlUGVyY2VudGFnZU1heDogbWF4IH0gPSBnZXRORlRGZWVzKHRoaXMuYWtpdGFEQU8udmFsdWUpCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgY292ZXIgMgogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjY4CiAgICAvLyBjb25zdCBpbXBhY3QgPSBnZXRVc2VySW1wYWN0KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuc2VsbGVyLnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzYKICAgIC8vIHNlbGxlciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlTZWxsZXIgfSkKICAgIGJ5dGVjXzEgLy8gInNlbGxlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NjgKICAgIC8vIGNvbnN0IGltcGFjdCA9IGdldFVzZXJJbXBhY3QodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5zZWxsZXIudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMzYtMTM5CiAgICAvLyByZXR1cm4gYWJpQ2FsbDx0eXBlb2YgQWtpdGFTb2NpYWxJbXBhY3QucHJvdG90eXBlLmdldFVzZXJJbXBhY3Q+KHsKICAgIC8vICAgYXBwSWQ6IGdldEFraXRhU29jaWFsQXBwTGlzdChha2l0YURBTykuaW1wYWN0LAogICAgLy8gICBhcmdzOiBbYWNjb3VudF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ5CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhU29jaWFsQXBwTGlzdCkpCiAgICBzd2FwCiAgICBwdXNoYnl0ZXMgInNhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTM3CiAgICAvLyBhcHBJZDogZ2V0QWtpdGFTb2NpYWxBcHBMaXN0KGFraXRhREFPKS5pbXBhY3QsCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEzNi0xMzkKICAgIC8vIHJldHVybiBhYmlDYWxsPHR5cGVvZiBBa2l0YVNvY2lhbEltcGFjdC5wcm90b3R5cGUuZ2V0VXNlckltcGFjdD4oewogICAgLy8gICBhcHBJZDogZ2V0QWtpdGFTb2NpYWxBcHBMaXN0KGFraXRhREFPKS5pbXBhY3QsCiAgICAvLyAgIGFyZ3M6IFthY2NvdW50XQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIHB1c2hieXRlcyAweGQ1NzRiYjEwIC8vIG1ldGhvZCAiZ2V0VXNlckltcGFjdChhZGRyZXNzKXVpbnQ2NCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgc3dhcAogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjIDEwIC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMzEKICAgIC8vIGNvbnN0IG1pbkltcGFjdDogdWludDY0ID0gKGltcGFjdCA+IDEpID8gaW1wYWN0IC0gMSA6IDEKICAgIGludGNfMSAvLyAxCiAgICA+CiAgICBieiBnZXRBbW91bnRzX3Rlcm5hcnlfZmFsc2VAMTYKICAgIGludGNfMSAvLyAxCiAgICAtCgpnZXRBbW91bnRzX3Rlcm5hcnlfbWVyZ2VAMTc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEzMgogICAgLy8gcmV0dXJuIG1heCAtICgoKG1heCAtIG1pbikgKiBtaW5JbXBhY3QpIC8gSU1QQUNUX0RJVklTT1IpCiAgICBzd2FwCiAgICBkdXAKICAgIHVuY292ZXIgMwogICAgLQogICAgdW5jb3ZlciAyCiAgICAqCiAgICBwdXNoaW50IDEwMDAKICAgIC8KICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA4CiAgICAvLyBhc3NlcnQocCA8PSBESVZJU09SLCBFUlJfSU5WQUxJRF9QRVJDRU5UQUdFKQogICAgZHVwCiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICA8PQogICAgYXNzZXJ0IC8vIElQQ1QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA5CiAgICAvLyByZXR1cm4gb3AuZGl2dyguLi5vcC5tdWx3KGEsIHApLCBESVZJU09SKQogICAgZnJhbWVfZGlnIC0xCiAgICBtdWx3CiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICBkaXZ3CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo3MgogICAgLy8gaWYgKGFraXRhQW1vdW50ID09PSAwICYmIGFtb3VudCA+IDApIHsKICAgIGJueiBnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VANwogICAgZnJhbWVfZGlnIC0xCiAgICBieiBnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo3MwogICAgLy8gYWtpdGFBbW91bnQgPSAxCiAgICBpbnRjXzEgLy8gMQogICAgZnJhbWVfYnVyeSAwCgpnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NzYKICAgIC8vIGxldCBtYXJrZXRwbGFjZUFtb3VudCA9IGNhbGNQZXJjZW50KGFtb3VudCwgdGhpcy5tYXJrZXRwbGFjZVJveWFsdGllcy52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjU1CiAgICAvLyBtYXJrZXRwbGFjZVJveWFsdGllcyA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleU1hcmtldHBsYWNlUm95YWx0aWVzIH0pCiAgICBieXRlYyAxNCAvLyAibWFya2V0cGxhY2Vfcm95YWx0aWVzIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo3NgogICAgLy8gbGV0IG1hcmtldHBsYWNlQW1vdW50ID0gY2FsY1BlcmNlbnQoYW1vdW50LCB0aGlzLm1hcmtldHBsYWNlUm95YWx0aWVzLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA4CiAgICAvLyBhc3NlcnQocCA8PSBESVZJU09SLCBFUlJfSU5WQUxJRF9QRVJDRU5UQUdFKQogICAgZHVwCiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICA8PQogICAgYXNzZXJ0IC8vIElQQ1QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA5CiAgICAvLyByZXR1cm4gb3AuZGl2dyguLi5vcC5tdWx3KGEsIHApLCBESVZJU09SKQogICAgZnJhbWVfZGlnIC0xCiAgICBtdWx3CiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICBkaXZ3CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo3NwogICAgLy8gaWYgKG1hcmtldHBsYWNlQW1vdW50ID09PSAwICYmIHRoaXMubWFya2V0cGxhY2VSb3lhbHRpZXMudmFsdWUgPiAwICYmIGFtb3VudCA+IDApIHsKICAgIGJueiBnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VAMTEKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjU1CiAgICAvLyBtYXJrZXRwbGFjZVJveWFsdGllcyA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleU1hcmtldHBsYWNlUm95YWx0aWVzIH0pCiAgICBieXRlYyAxNCAvLyAibWFya2V0cGxhY2Vfcm95YWx0aWVzIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo3NwogICAgLy8gaWYgKG1hcmtldHBsYWNlQW1vdW50ID09PSAwICYmIHRoaXMubWFya2V0cGxhY2VSb3lhbHRpZXMudmFsdWUgPiAwICYmIGFtb3VudCA+IDApIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VAMTEKICAgIGZyYW1lX2RpZyAtMQogICAgYnogZ2V0QW1vdW50c19hZnRlcl9pZl9lbHNlQDExCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjc4CiAgICAvLyBtYXJrZXRwbGFjZUFtb3VudCA9IDEKICAgIGludGNfMSAvLyAxCiAgICBmcmFtZV9idXJ5IDEKCmdldEFtb3VudHNfYWZ0ZXJfaWZfZWxzZUAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6ODEKICAgIC8vIGNvbnN0IHNlbGxlckFtb3VudDogdWludDY0ID0gYW1vdW50IC0gKGNyZWF0b3JBbW91bnQgKyBha2l0YUFtb3VudCArICgyICogbWFya2V0cGxhY2VBbW91bnQpKQogICAgZnJhbWVfZGlnIDIKICAgIGR1cAogICAgZnJhbWVfZGlnIDAKICAgIGR1cAogICAgY292ZXIgMwogICAgKwogICAgcHVzaGludCAyCiAgICBmcmFtZV9kaWcgMQogICAgZHVwCiAgICBjb3ZlciA1CiAgICAqCiAgICArCiAgICBmcmFtZV9kaWcgLTEKICAgIHN3YXAKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6ODMtODgKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIGNyZWF0b3I6IGNyZWF0b3JBbW91bnQsCiAgICAvLyAgIGFraXRhOiBha2l0YUFtb3VudCwKICAgIC8vICAgbWFya2V0cGxhY2U6IG1hcmtldHBsYWNlQW1vdW50LAogICAgLy8gICBzZWxsZXI6IHNlbGxlckFtb3VudCwKICAgIC8vIH0KICAgIHN3YXAKICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgaXRvYgogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGl0b2IKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKZ2V0QW1vdW50c190ZXJuYXJ5X2ZhbHNlQDE2OgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEzMQogICAgLy8gY29uc3QgbWluSW1wYWN0OiB1aW50NjQgPSAoaW1wYWN0ID4gMSkgPyBpbXBhY3QgLSAxIDogMQogICAgaW50Y18xIC8vIDEKICAgIGIgZ2V0QW1vdW50c190ZXJuYXJ5X21lcmdlQDE3CgoKLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo6TGlzdGluZy50cmFuc2ZlclB1cmNoYXNlVG9CdXllcihidXllcjogYnl0ZXMpIC0+IHZvaWQ6CnRyYW5zZmVyUHVyY2hhc2VUb0J1eWVyOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo5MQogICAgLy8gcHJpdmF0ZSB0cmFuc2ZlclB1cmNoYXNlVG9CdXllcihidXllcjogQWNjb3VudCk6IHZvaWQgewogICAgcHJvdG8gMSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjkyCiAgICAvLyBpZiAodGhpcy5pc1ByaXplQm94LnZhbHVlKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyOAogICAgLy8gaXNQcml6ZUJveCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlJc1ByaXplQm94IH0pCiAgICBieXRlYyA1IC8vICJpc19wcml6ZV9ib3giCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjkyCiAgICAvLyBpZiAodGhpcy5pc1ByaXplQm94LnZhbHVlKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogdHJhbnNmZXJQdXJjaGFzZVRvQnV5ZXJfYWZ0ZXJfaWZfZWxzZUAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjkzLTk2CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBQcml6ZUJveC5wcm90b3R5cGUudHJhbnNmZXI+KHsKICAgIC8vICAgYXBwSWQ6IHRoaXMucHJpemUudmFsdWUsCiAgICAvLyAgIGFyZ3M6IFtidXllcl0sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo5NAogICAgLy8gYXBwSWQ6IHRoaXMucHJpemUudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNgogICAgLy8gcHJpemUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQcml6ZSB9KQogICAgYnl0ZWNfMyAvLyAicHJpemUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjk0CiAgICAvLyBhcHBJZDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6OTMtOTYKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFByaXplQm94LnByb3RvdHlwZS50cmFuc2Zlcj4oewogICAgLy8gICBhcHBJZDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vICAgYXJnczogW2J1eWVyXSwKICAgIC8vIH0pCiAgICBieXRlYyAxNiAvLyBtZXRob2QgInRyYW5zZmVyKGFkZHJlc3Mpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo5NwogICAgLy8gcmV0dXJuCiAgICByZXRzdWIKCnRyYW5zZmVyUHVyY2hhc2VUb0J1eWVyX2FmdGVyX2lmX2Vsc2VAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTAwCiAgICAvLyBjb25zdCBwcml6ZUFzc2V0ID0gQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI2CiAgICAvLyBwcml6ZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVByaXplIH0pCiAgICBieXRlY18zIC8vICJwcml6ZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTAwCiAgICAvLyBjb25zdCBwcml6ZUFzc2V0ID0gQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBzd2FwCiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxMDIKICAgIC8vIGlmIChidXllci5pc09wdGVkSW4ocHJpemVBc3NldCkpIHsKICAgIGZyYW1lX2RpZyAtMQogICAgc3dhcAogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJ6IHRyYW5zZmVyUHVyY2hhc2VUb0J1eWVyX2Vsc2VfYm9keUA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjEwNC0xMDcKICAgIC8vIGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgIGFzc2V0Q2xvc2VUbzogYnV5ZXIsCiAgICAvLyAgIHhmZXJBc3NldDogcHJpemVBc3NldCwKICAgIC8vIH0pLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgZnJhbWVfZGlnIC0xCiAgICBpdHhuX2ZpZWxkIEFzc2V0Q2xvc2VUbwogICAgaW50Y18zIC8vIDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIHJldHN1YgoKdHJhbnNmZXJQdXJjaGFzZVRvQnV5ZXJfZWxzZV9ib2R5QDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjExMAogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzIgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTEwCiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTE0CiAgICAvLyBbeyBhZGRyZXNzOiBidXllciwgYW1vdW50OiBwcml6ZUFzc2V0LmJhbGFuY2UoR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MpIH1dLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIHVuY292ZXIgMgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGFzc2VydCAvLyBhY2NvdW50IG9wdGVkIGludG8gYXNzZXQKICAgIGl0b2IKICAgIGZyYW1lX2RpZyAtMQogICAgc3dhcAogICAgY29uY2F0CiAgICBieXRlYyA0IC8vIDB4MDAwMQogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjExNQogICAgLy8gcHJpemVBc3NldC5iYWxhbmNlKEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzKSwKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBkaWcgMgogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBhc3NlcnQgLy8gYWNjb3VudCBvcHRlZCBpbnRvIGFzc2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjEwOS0xMTcKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHByaXplQXNzZXQuaWQsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IGJ1eWVyLCBhbW91bnQ6IHByaXplQXNzZXQuYmFsYW5jZShHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcykgfV0sCiAgICAvLyAgIHByaXplQXNzZXQuYmFsYW5jZShHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcyksCiAgICAvLyAgIHRydWUKICAgIC8vICkKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjExMgogICAgLy8gMCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjExMwogICAgLy8gTUFYX1VJTlQ2NCwKICAgIGludGMgNSAvLyAxODQ0Njc0NDA3MzcwOTU1MTYxNQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxMDktMTE3CiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICBwcml6ZUFzc2V0LmlkLAogICAgLy8gICAwLAogICAgLy8gICBNQVhfVUlOVDY0LAogICAgLy8gICBbeyBhZGRyZXNzOiBidXllciwgYW1vdW50OiBwcml6ZUFzc2V0LmJhbGFuY2UoR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MpIH1dLAogICAgLy8gICBwcml6ZUFzc2V0LmJhbGFuY2UoR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MpLAogICAgLy8gICB0cnVlCiAgICAvLyApCiAgICB1bmNvdmVyIDUKICAgIHVuY292ZXIgNQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxMTYKICAgIC8vIHRydWUKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjEwOS0xMTcKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHByaXplQXNzZXQuaWQsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IGJ1eWVyLCBhbW91bnQ6IHByaXplQXNzZXQuYmFsYW5jZShHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcykgfV0sCiAgICAvLyAgIHByaXplQXNzZXQuYmFsYW5jZShHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcyksCiAgICAvLyAgIHRydWUKICAgIC8vICkKICAgIGNhbGxzdWIgY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudAogICAgcG9wbiAyCiAgICByZXRzdWIK", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyAGAAEIBKCNBv///////////wEmFQ1wYXltZW50X2Fzc2V0BnNlbGxlcglha2l0YV9kYW8FcHJpemUCAAEMaXNfcHJpemVfYm94BXByaWNlCmV4cGlyYXRpb24McmVzZXJ2ZWRfZm9yC21hcmtldHBsYWNlBBUffHUIRVJSOk1CRkYPY3JlYXRvcl9yb3lhbHR5DGFraXRhX2VzY3JvdxVtYXJrZXRwbGFjZV9yb3lhbHRpZXMIRVJSOklQQVkErfkq5AhuZnRfZmVlcwhFUlI6TEVYUAhFUlI6UkZEQQhFUlI6SVhGUoICBGoWOT0EaOhjQzYaAI4CAFAARDEZFEQxGEEALYIFBBccn4gEGTlsSgQz6SyUBIVN7eAEPqEYMjYaAI4FBPkIMQhWAAEIhwAjQ4AEe1DqjDYaAI4BAlIAMRmBBRIxGBBEQgciMRmBBRIxGBBEQgNuigcCgAAii/pAAAWL/0ABPSNEi/mAA2FhbGVIJFuL/SJZgdTFAQuB5MUCCEyL+kAAV7FJcghESwKL/giyCLIHI7IQIrIBtov7Fov8Fk8CshiABHt9xfyyGkyyGrIai/2yGoEGshAisgGztD5JVwQATFcABCcKEkRJFSQSRBcWTBZQi/1PA08DiUlyCESL+nAARQFBAINLAU4CSXIITE4DRCKMAIv/QQAJSXIIRCOMAIwBsUlyCERPArIIsgcjshAisgG2iwBBAASLAbIVi/qyEYv+shJMshQlshAisgG2i/sWi/wWTwKyGIAErxoU8rIaTLIashqL/bIagQayECKyAbO0PklXBABMVwAEJwoSREkVJBJEF0L/ZUsBMhAITgKxRwJyCEQyELIIsgcjshAisgG2i/oWTLIYgAQ5Tq6yshqyGoEGshAisgGzQv9MIkL+wIoDAYAAMQCL/YADb2FsZUiBGFuxshiABDwabzOyGrIagQayECKyAbO0PklXBABLAVcABCcKEkRJIlmBAghMFRJEVwYASRVJTgJBAAeLASQTQQCRSCIyA0sBQAB4RQGL/0EAaEkyAxNBAGGL/YALd2FsbGV0X2ZlZXNlSCRbSSEEDkSL/x0hBJdJjABAAAiL/0EAAyOMADIHSYGA9SQIiwBJTgIWTwRMUCcETFCL/Yv+TwVPBE8ESwUiiP3zSFcICIv/TwIJFkxQjACJi/8WIhZQjACJSIAIcmVmZXJyZXJlSEL/ehdC/202GgFJFSQSRBc2GgJJFSMSRCJTNhoDSRUkEkQXNhoESRUkEkQXNhoFSRUkEkQXNhoGSU4CFYEgEkQ2GgdJTgIVgSgSRDYaCElOAhWBIBJENhoJSRUkEkQXTDYaCkkVJBJEF0w2GgtJTgIVgSASRDYaDEkiWYECCEsBFRJEVwIATDYaDUkVJBJEF0w2Gg5JTgJJFUsBIllJgQoSRE8CTEsCUiJZgQwIEkQyDUAABCcLsAArTw5nJwVPDWcnBk8MZyhPC2dJQQAHSTIHDUEAYyNAAAyACEVSUjpJRVhQsAAnB0xnKU8JZ4AGZnVuZGVyTwhnJwhPB2cnDE8GZ4AHZ2F0ZV9pZE8FZycJTwRngAd2ZXJzaW9uTwNnKk8CZycNTGciKmVEJxFlSIEQWycOTGcjQyJC/5oxFiMJSTgQIxJENhoBSRWBIBJENhoCSU4DFYEgEkQxADIJEkAABCcLsAAiKGVEQQAMgAhFUlI6UEFNQbAAIicHZURBAAsiJwdlRDIHDUEBDiNAAAQnErAAIicIZUQyAxNBAA8iJwhlREsBEkAABCcTsABLATgAMgkSQAAEJw+wAEsBOAcyChJAAAQnD7AATDgIIicGZUQSQAAEJw+wAIgFpyInBmVEiAStSSRbSUEADCIqZUQiTwKI/SkiW7EiJw1lRIECW3IIRLIHsggjshAisgGzsUmBEFsiJwllRLIHSbIII7IQIrIBs7FLArIHsggjshAisgGzIicFZURBACGxgRhbIillRLIHsggjshAisgGzsTIJsgkjshAisgGzI0MiK2VEsUsBIltLAXELRLIHsggjshAisgGzsUyBGFtMcQREgAUgU29sZFAiKWVEsgeyBbIII7IQIrIBs0L/tCJC/u8xFiMJSTgQJRJENhoBSRWBIBJENhoCSU4CFYEgEkQxADIJEkAABCcLsAAiKGVEQAAMgAhFUlI6UEFOQbAAIicHZURBAAsiJwdlRDIHDUEB8iNAAAQnErAAIicIZUQyAxNBAA8iJwhlREsBEkAABCcTsABLAjgUMgoSQAAEJxSwAE8COBIiJwZlRBJAAAQnFLAAiARSIicGZUSIA1hJJFtJQQAPIiplRCIoZURPAoj70SJbsSInDWVEgQJbcghEIihlRLIRshSyEiWyECKyAbMiJwVlREAALyIrZUxJTwJEcQtEIihlRHAARQFBASaxcQtESwEiWyIoZUSyEbISshQlshAisgGzIicJZUQiKGVEcABFAUEAzbEiJwllREsBgRBbIihlRLIRshKyFCWyECKyAbMiKGVESwJMcABFAUEAeLFJgRBbIihlRLIRshJMshQlshAisgGzIillRCIoZURwAEUBQQAjSLEiKWVEIihlRLIRshUlshAisgGzsTIJsgkjshAisgGzI0MiKmVEIihlRCIpZURPA4EYW0kWTwJMUCcETFBPA08DIiEFTwRPBSKI+X1GAkL/wyIqZUQiKGVESwKBEFtJFk8FTFAnBExQTwNPAyIhBU8ETwUiiPlSRgJC/3QiKmVEIihlRCInCWVESwOBEFtJFk8CTFAnBExQTwNPAyIhBU8ETwUiiPkiRgJC/x8iKmVEIihlRE8CcQtESwMiW0kWTwJMUCcETFBPA08DIiEFTwRPBSKI+PNGAkL+xCJC/gs2GgFJFYEgEkQxADIJEkAABCcLsAAiKWVEEkAADIAIRVJSOk9TQ0SwACIpZUQiK2VEMglOAiIoZURBAG4iKWVMTgREIihlRCInBWVEQQA1RQFFAbEiKWVEIitlRLIYJxCyGrIagQayECKyAbOxshFMshUlshAisgG2sgkjshAisgGzI0OxTLIRTLIVJbIQIrIBtrIRTLIVJbIQIrIBtrIJI7IQIrIBs0L/2CInBWVEQQAoRgKxIillRCIrZUSyGCcQshqyGoEGshAisgGzsbIJI7IQIrIBs0L/qLGyEbIVJbIQIrIBtrIJI7IQIrIBs0L/kDYaAUkVJBJEFzEAIillRBJAAAyACEVSUjpNQlNMsAAnBkxnI0M2GgFJFSQSRBcxACIqZUSABndhbGxldGVIcghEEkAADIAIRVJSOk5EQU+wACpMZyNDMRYjCUk4ECMSRDYaAUkVJBJEFzEAMgkSQAAMgAhFUlI6Rk9SQrAASwE4BzIKEkAADIAIRVJSOklQTVKwAEw4CDIQEkAADIAIRVJSOklQTUGwALEyCkyyESKyErIUJbIQIrIBsyNDigEBgABJIicMZURJIQQORIv/HSEEl0lAABAiJwxlREEACIv/QQADI4wCIiplREknEWVISSJbTgIkW0wiKWVEsUyAA3NhbGVIgRBbshiABNV0uxCyGrIagQayECKyAbO0PklXBABMVwAEJwoSREkVJBJEF0kjDUEAdCMJTElPAwlPAguB6AcKCUkhBA5Ei/8dIQSXSYwAQAAIi/9BAAMjjAAiJw5lREkhBA5Ei/8dIQSXSYwBQAAQIicOZURBAAiL/0EAAyOMAYsCSYsASU4DCIECiwFJTgULCIv/TAlMFk8CFlBPAhZQTBZQjACJSCNC/4mKAQAiJwVlREEAGLEiK2VEshgnELIai/+yGoEGshAisgGziSIrZUxJTwJEi/9McABFAUEAD7GyEYv/shUlshAisgGziSIqZUQyCk8CSU4CcABEFov/TFAnBExQMgpLAnAARE8DTwMiIQVPBU8FI4j12UYCiQ==", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
var ListingParamsFactory = class _ListingParamsFactory {
  /**
   * Gets available create ABI call param factories
   */
  static get create() {
    return {
      _resolveByMethod(params) {
        switch (params.method) {
          case "create":
          case "create(uint64,bool,uint64,uint64,uint64,address,(address,uint64),address,uint64,uint64,address,string,uint64,(string,uint64))void":
            return _ListingParamsFactory.create.create(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs create ABI call params for the Listing smart contract using the create(uint64,bool,uint64,uint64,uint64,address,(address,uint64),address,uint64,uint64,address,string,uint64,(string,uint64))void ABI method
       *
       * @param params Parameters for the call
       * @returns An `AppClientMethodCallParams` object for the call
       */
      create(params) {
        return {
          ...params,
          method: "create(uint64,bool,uint64,uint64,uint64,address,(address,uint64),address,uint64,uint64,address,string,uint64,(string,uint64))void",
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
       * Creates a new instance of the Listing smart contract using the create(uint64,bool,uint64,uint64,uint64,address,(address,uint64),address,uint64,uint64,address,string,uint64,(string,uint64))void ABI method.
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
       * Creates a new instance of the Listing smart contract using the create(uint64,bool,uint64,uint64,uint64,address,(address,uint64),address,uint64,uint64,address,string,uint64,(string,uint64))void ABI method.
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
       * Creates a new instance of the Listing smart contract using an ABI method call using the create(uint64,bool,uint64,uint64,uint64,address,(address,uint64),address,uint64,uint64,address,string,uint64,(string,uint64))void ABI method.
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
   * @param params The params to use for the cloned app client. Omit a param to keep the original value. Set a param to override the original value. Setting to undefined will clear the original value.
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
  newGroup(composerConfig) {
    const client = this;
    const composer = this.algorand.newGroup(composerConfig);
    let promiseChain = Promise.resolve();
    return {
      /**
       * Add a purchaseAsa(axfer,address,address)void method call against the Listing contract
       */
      purchaseAsa(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.purchaseAsa(params)));
        return this;
      },
      /**
       * Add a changePrice(uint64)void method call against the Listing contract
       */
      changePrice(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.changePrice(params)));
        return this;
      },
      /**
       * Add a updateAkitaDAO(uint64)void method call against the Listing contract
       */
      updateAkitaDao(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateAkitaDao(params)));
        return this;
      },
      /**
       * Add a opUp()void method call against the Listing contract
       */
      opUp(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.opUp(params)));
        return this;
      },
      /**
       * Add a optin(pay,uint64)void method call against the Listing contract
       */
      optin(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.optin(params)));
        return this;
      },
      get delete() {
        return {
          purchase: (params) => {
            promiseChain = promiseChain.then(async () => composer.addAppDeleteMethodCall(await client.params.delete.purchase(params)));
            return this;
          },
          delist: (params) => {
            promiseChain = promiseChain.then(async () => composer.addAppDeleteMethodCall(await client.params.delete.delist(params)));
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
}, _class4);

// src/marketplace/listing.ts
var ListingSDK = class extends _chunkKLHVDYDWjs.BaseSDK {
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

// src/marketplace/errors.ts
var MARKETPLACE_ERROR_MESSAGES = {
  // --- Listing validation -------------------------------------------------
  PRLO: "Lowest price is 4 units for divisibility",
  MNOP: "Marketplace must be opted into payment asset",
  NALS: "Not a listing contract",
  IEXP: "Invalid expiration",
  LEXP: "Listing expired",
  // --- Payment asset ------------------------------------------------------
  PAMA: "Payment asset must be ALGO",
  PANA: "Payment asset must not be ALGO",
  // --- Access / delist ----------------------------------------------------
  OSCD: "Only the seller can delist",
  RFDA: "Reserved for a different address",
  MBSL: "Must be the seller",
  // --- Marketplace plugin -------------------------------------------------
  NENA: "Not enough of the asset",
  LCNM: "Listing creator is not the marketplace"
};
var translateMarketplaceError = _chunkGIGYZ6YCjs.makeErrorTranslator.call(void 0, MARKETPLACE_ERROR_MESSAGES);

// src/marketplace/index.ts
var ASSET_OPT_IN_MIN_BALANCE = 100000n;
function getHttpStatus(error) {
  if (typeof error !== "object" || error === null) return void 0;
  if ("status" in error && typeof error.status === "number") {
    return error.status;
  }
  if ("response" in error) {
    const { response } = error;
    if (typeof response === "object" && response !== null && "status" in response && typeof response.status === "number") {
      return response.status;
    }
  }
  return void 0;
}
var MarketplaceSDK = class extends _chunkKLHVDYDWjs.BaseSDK {
  constructor(params) {
    super({ factory: MarketplaceFactory, ...params }, _chunkHFHM5QOFjs.ENV_VAR_NAMES.MARKETPLACE_APP_ID);
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
    const paymentAssetId = BigInt(paymentAsset);
    const prizeId = isPrizeBox ? 0n : BigInt(rest.asset);
    const [prizeRewardsOptInCost, paymentRewardsOptInCost, listingOptIns] = await Promise.all([
      this.getRewardsOptInCost(prizeId),
      this.getRewardsOptInCost(paymentAssetId),
      this.getListingOptInPlan({ prizeAsset: prizeId, paymentAsset: paymentAssetId })
    ]);
    const cost = this.listCost({
      isPrizeBox,
      isAlgoPayment,
      prizeRewardsOptInCost,
      paymentRewardsOptInCost,
      escrowOptInCost: listingOptIns.paymentEscrowOptInCost
    });
    const payment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: _algokitutils.microAlgo.call(void 0, cost),
      receiver: this.client.appAddress
    });
    let appId;
    const needsComposer = listingOptIns.assetsToOptIn.length > 0 || listingOptIns.paymentEscrowOptInCost > 0n;
    const group = needsComposer ? this.client.newGroup() : void 0;
    if (group) {
      for (const { asset, cost: optInCost } of listingOptIns.assetsToOptIn) {
        const optInPayment = await this.client.algorand.createTransaction.payment({
          ...sendParams,
          amount: _algokitutils.microAlgo.call(void 0, optInCost),
          receiver: this.client.appAddress
        });
        group.optIn({
          ...sendParams,
          args: { payment: optInPayment, asset },
          maxFee: _algokitutils.microAlgo.call(void 0, 257e3)
        });
      }
    }
    if (isPrizeBox) {
      const { prizeBoxId } = rest;
      const prizeBoxSDK = new (0, _chunkEBWCKG2Cjs.PrizeBoxFactorySDK)({ algorand: this.algorand, factoryParams: {} }).get({ appId: BigInt(prizeBoxId) });
      const prizeBoxTransferTxn = (await prizeBoxSDK.client.createTransaction.transfer({
        sender,
        signer,
        args: {
          newOwner: this.client.appAddress.toString()
        }
      })).transactions[0];
      const args = {
        prizeBoxTransferTxn,
        payment,
        price,
        paymentAsset,
        expiration,
        reservedFor,
        gateId,
        marketplace
      };
      if (group) {
        group.listPrizeBox({
          ...sendParams,
          args,
          maxFee: _algokitutils.microAlgo.call(void 0, 2e6)
        });
      } else {
        ({ return: appId } = await this.client.send.listPrizeBox({
          ...sendParams,
          args
        }));
      }
    } else {
      const { asset, amount, name, proof } = rest;
      const assetXfer = await this.client.algorand.createTransaction.assetTransfer({
        ...sendParams,
        amount: BigInt(amount),
        assetId: BigInt(asset),
        receiver: this.client.appAddress
      });
      const args = {
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
      };
      if (group) {
        group.list({
          ...sendParams,
          args,
          maxFee: _algokitutils.microAlgo.call(void 0, 2e6)
        });
      } else {
        ({ return: appId } = await this.client.send.list({
          ...sendParams,
          args
        }));
      }
    }
    if (group) {
      const result = await group.send({
        ...sendParams,
        coverAppCallInnerTransactionFees: true,
        populateAppCallResources: true
      });
      appId = result.returns[result.returns.length - 1];
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
      const daoApp = await algod.applicationById(akitaDaoAppId);
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
      const response = await algod.accountAssetInformation(rewardsAddress, asset);
      return response.assetHolding ? 0n : 100000n;
    } catch (e) {
      return 100000n;
    }
  }
  /**
   * Builds the atomic opt-in plan needed before a listing can be created.
   *
   * The listed ASA must be receivable by the marketplace before the `assetXfer`
   * transaction runs. For ASA-denominated listings, the payment asset also needs
   * marketplace/escrow preparation so a future purchase can settle cleanly.
   */
  async getListingOptInPlan({ prizeAsset, paymentAsset }) {
    const assets = /* @__PURE__ */ new Set();
    if (prizeAsset !== 0n) assets.add(prizeAsset);
    if (paymentAsset !== 0n) assets.add(paymentAsset);
    const assetsToOptIn = [];
    let paymentEscrowOptInCost = 0n;
    for (const asset of assets) {
      const [isMarketplaceOptedIn, optInCost] = await Promise.all([
        this.isMarketplaceOptedInToAsset(asset),
        this.client.optInCost({ args: { asset } })
      ]);
      if (!isMarketplaceOptedIn) {
        assetsToOptIn.push({ asset, cost: optInCost });
        continue;
      }
      if (asset === paymentAsset && optInCost > ASSET_OPT_IN_MIN_BALANCE) {
        paymentEscrowOptInCost = optInCost - ASSET_OPT_IN_MIN_BALANCE;
      }
    }
    return { assetsToOptIn, paymentEscrowOptInCost };
  }
  async isMarketplaceOptedInToAsset(assetId) {
    const asset = BigInt(assetId);
    if (asset === 0n) return true;
    try {
      const response = await this.algorand.client.algod.accountAssetInformation(this.client.appAddress.toString(), asset);
      return !!response.assetHolding;
    } catch (error) {
      if (getHttpStatus(error) === 404) return false;
      throw error;
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
    const baseCost = 756500n;
    const minBalance = 100000n;
    const assetOptInMinBalance = 100000n;
    const perDisbursement = 67000n;
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
    await group.send(sendParams);
  }
  // ========== OptIn Methods ==========
  /**
   * Opts the marketplace into an asset so listings using it as the payment
   * asset can be fulfilled. When the marketplace has a named DAO escrow
   * configured, this also eagerly opts the escrow + every revenue-split
   * escrow in via the revenue-manager plugin, so downstream list/purchase
   * calls don't have to do the rekey dance mid-group.
   */
  async optIn({ sender, signer, asset }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const cost = await this.client.optInCost({ args: { asset } });
    const payment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: _algokitutils.microAlgo.call(void 0, cost),
      receiver: this.client.appAddress
    });
    await this.client.send.optIn({
      ...sendParams,
      args: { payment, asset },
      maxFee: _algokitutils.microAlgo.call(void 0, 257e3),
      coverAppCallInnerTransactionFees: true,
      populateAppCallResources: true
    });
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
  async updateAkitaDAOEscrow({ sender, signer, config }) {
    const sendParams = this.getSendParams({ sender, signer });
    await this.client.send.updateAkitaDaoEscrow({
      ...sendParams,
      args: { config }
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







exports.ListingSDK = ListingSDK; exports.MARKETPLACE_ERROR_MESSAGES = MARKETPLACE_ERROR_MESSAGES; exports.translateMarketplaceError = translateMarketplaceError; exports.MarketplaceSDK = MarketplaceSDK; exports.newListing = newListing;
//# sourceMappingURL=chunk-N4IYTCJB.js.map
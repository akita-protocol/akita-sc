"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } var _class; var _class2; var _class3; var _class4;


var _chunk3X3AK5HAjs = require('./chunk-3X3AK5HA.js');


var _chunkYA6SW4XNjs = require('./chunk-YA6SW4XN.js');



var _chunkQ5IKYOZSjs = require('./chunk-Q5IKYOZS.js');


var _chunk3QW7XUAWjs = require('./chunk-3QW7XUAW.js');


var _chunkMY4J3UZTjs = require('./chunk-MY4J3UZT.js');

// src/marketplace/index.ts
var _algokitutils = require('@algorandfoundation/algokit-utils');
var _algosdk = require('algosdk'); var _algosdk2 = _interopRequireDefault(_algosdk);

// src/generated/MarketplaceClient.ts
var _apparc56 = require('@algorandfoundation/algokit-utils/types/app-arc56');


var _appclient = require('@algorandfoundation/algokit-utils/types/app-client');
var _appfactory = require('@algorandfoundation/algokit-utils/types/app-factory');
var APP_SPEC = { "name": "Marketplace", "structs": { "EscrowConfig": [{ "name": "name", "type": "string" }, { "name": "app", "type": "uint64" }] }, "methods": [{ "name": "create", "args": [{ "type": "string", "name": "version" }, { "type": "string", "name": "childVersion" }, { "type": "uint64", "name": "akitaDAO" }, { "type": "(string,uint64)", "struct": "EscrowConfig", "name": "akitaDAOEscrow" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "list", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "uint64", "name": "price" }, { "type": "uint64", "name": "paymentAsset" }, { "type": "uint64", "name": "expiration" }, { "type": "address", "name": "reservedFor" }, { "type": "uint64", "name": "gateID" }, { "type": "address", "name": "marketplace" }, { "type": "string", "name": "name" }, { "type": "byte[32][]", "name": "proof" }, { "type": "uint64", "name": "wallet" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "List an ASA (principal resolution \xA76.7). `wallet` is the caller's wallet hint (0 = plain account):\nthe verified principal's referrer is fixed on the rev-3 child as `seller_referrer`. The seller is\nthe spender (`Txn.sender`).", "events": [], "recommendations": {} }, { "name": "list", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "uint64", "name": "price" }, { "type": "uint64", "name": "paymentAsset" }, { "type": "uint64", "name": "expiration" }, { "type": "address", "name": "reservedFor" }, { "type": "uint64", "name": "gateID" }, { "type": "address", "name": "marketplace" }, { "type": "string", "name": "name" }, { "type": "byte[32][]", "name": "proof" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "LEGACY shim, deployed selector `list(pay,axfer,uint64,uint64,uint64,address,uint64,address,string,byte[32][])uint64`.\nCreates a rev-3 child whose `seller_referrer` is the seller's registry referrer at creation\n(`legacySellerReferrer`). Also accepts the deployed plugin's ALGO payment (`assertListingPayment`).", "events": [], "recommendations": {} }, { "name": "listPrizeBox", "args": [{ "type": "appl", "name": "prizeBoxTransferTxn" }, { "type": "pay", "name": "payment" }, { "type": "uint64", "name": "price" }, { "type": "uint64", "name": "paymentAsset" }, { "type": "uint64", "name": "expiration" }, { "type": "address", "name": "reservedFor" }, { "type": "uint64", "name": "gateID" }, { "type": "address", "name": "marketplace" }, { "type": "uint64", "name": "wallet" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "List a prize box; `wallet` as in `list`.", "events": [], "recommendations": {} }, { "name": "listPrizeBox", "args": [{ "type": "appl", "name": "prizeBoxTransferTxn" }, { "type": "pay", "name": "payment" }, { "type": "uint64", "name": "price" }, { "type": "uint64", "name": "paymentAsset" }, { "type": "uint64", "name": "expiration" }, { "type": "address", "name": "reservedFor" }, { "type": "uint64", "name": "gateID" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "LEGACY shim, deployed selector `listPrizeBox(appl,pay,uint64,uint64,uint64,address,uint64,address)uint64` (see `legacyList`).", "events": [], "recommendations": {} }, { "name": "gatedPurchase", "args": [{ "type": "pay", "name": "payment" }, { "type": "appl", "name": "gateTxn" }, { "type": "uint64", "name": "appId" }, { "type": "address", "name": "marketplace" }, { "type": "uint64", "name": "wallet" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Gated ALGO purchase. `gateTxn` must be `Gate.mustCheckFor(ctx, gateID, args)` with `ctx` = the\nbuyer's verified `(principal, wallet, spender)` for hint `wallet` (0 = plain account).", "events": [], "recommendations": {} }, { "name": "gatedPurchase", "args": [{ "type": "pay", "name": "payment" }, { "type": "appl", "name": "gateTxn" }, { "type": "uint64", "name": "appId" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "LEGACY shim, deployed selector `gatedPurchase(pay,appl,uint64,address)void`: registry-origin `Gate.mustCheck`.", "events": [], "recommendations": {} }, { "name": "purchase", "args": [{ "type": "pay", "name": "payment" }, { "type": "uint64", "name": "appId" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "gatedPurchaseAsa", "args": [{ "type": "axfer", "name": "assetXfer" }, { "type": "appl", "name": "gateTxn" }, { "type": "uint64", "name": "appId" }, { "type": "address", "name": "marketplace" }, { "type": "uint64", "name": "wallet" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Gated ASA purchase; `gateTxn` and `wallet` as in `gatedPurchase`.", "events": [], "recommendations": {} }, { "name": "gatedPurchaseAsa", "args": [{ "type": "axfer", "name": "assetXfer" }, { "type": "appl", "name": "gateTxn" }, { "type": "uint64", "name": "appId" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "LEGACY shim, deployed selector `gatedPurchaseAsa(axfer,appl,uint64,address)void`: registry-origin `Gate.mustCheck`.", "events": [], "recommendations": {} }, { "name": "purchaseAsa", "args": [{ "type": "axfer", "name": "assetXfer" }, { "type": "uint64", "name": "appId" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "delist", "args": [{ "type": "uint64", "name": "appId" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "listCost", "args": [{ "type": "uint64", "name": "prize" }, { "type": "uint64", "name": "paymentAsset" }, { "type": "bool", "name": "isPrizeBox" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "Exact payment `list` (isPrizeBox = false, `prize` = the ASA) or `listPrizeBox`\n(isPrizeBox = true, `prize` ignored) requires right now. Includes the non-refundable\nDAO-escrow opt-in for a payment asset the escrow does not hold yet.", "events": [], "recommendations": {} }, { "name": "initBoxedContract", "args": [{ "type": "string", "name": "version" }, { "type": "uint64", "name": "size" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "loadBoxedContract", "args": [{ "type": "uint64", "name": "offset" }, { "type": "byte[]", "name": "data" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "deleteBoxedContract", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "optIn", "args": [{ "type": "pay", "name": "payment", "desc": "The payment transaction covering MBR for all opt-ins" }, { "type": "uint64", "name": "asset", "desc": "The asset to opt into" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "optIn opts this contract into `asset`. When this contract has a\nnamed escrow configured (`akitaDAOEscrow.value.name !== ''`), it\nalso opts the escrow and every revenue-split recipient in through\nthe revenue-manager plugin \u2014 so downstream methods (subscribe,\nlist, etc.) can transfer to the escrow without doing the plugin-\nrekey dance mid-group.\n\nPayment must cover:\n  - this contract's own opt-in (1 \xD7 assetOptInMinBalance), plus\n  - each downstream opt-in the escrow still needs.\n`splitOptInCount` returns 0 once the escrow is already opted in, so\nthe charge collapses to just 1 \xD7 assetOptInMinBalance on repeat\ncalls and the escrow branch becomes a no-op.", "events": [], "recommendations": {} }, { "name": "optInCost", "args": [{ "type": "uint64", "name": "asset" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "updateAkitaDAOEscrow", "args": [{ "type": "(string,uint64)", "struct": "EscrowConfig", "name": "config" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "update", "args": [{ "type": "string", "name": "newVersion" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["UpdateApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 8, "bytes": 56 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "childContractVersion": { "keyType": "AVMString", "valueType": "AVMString", "key": "Y2hpbGRfY29udHJhY3RfdmVyc2lvbg==", "desc": "the current version of the child contract" }, "akitaDAOEscrow": { "keyType": "AVMString", "valueType": "EscrowConfig", "key": "YWtpdGFfZXNjcm93", "desc": "the named DAO escrow this contract routes fees to (name + app)" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" } }, "local": {}, "box": { "boxedContract": { "keyType": "AVMString", "valueType": "AVMBytes", "key": "YmM=" } } }, "maps": { "global": {}, "local": {}, "box": {} } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [667, 4696, 5423], "errorMessage": "Bytes has valid prefix" }, { "pc": [4799], "errorMessage": "ERR:errBmpt" }, { "pc": [532, 2496, 4125, 4762], "errorMessage": "ERR:errCnst" }, { "pc": [3370, 3490], "errorMessage": "ERR:errFgte" }, { "pc": [3246], "errorMessage": "ERR:errHgte" }, { "pc": [993], "errorMessage": "ERR:errHnbd" }, { "pc": [897], "errorMessage": "ERR:errHnwl" }, { "pc": [916], "errorMessage": "ERR:errHtop" }, { "pc": [2485], "errorMessage": "ERR:errIcor" }, { "pc": [3617, 3703, 3876, 4146, 4158], "errorMessage": "ERR:errIpay" }, { "pc": [2633], "errorMessage": "ERR:errIpma" }, { "pc": [2604], "errorMessage": "ERR:errIpmr" }, { "pc": [550, 3834], "errorMessage": "ERR:errIpms" }, { "pc": [2846], "errorMessage": "ERR:errIupg" }, { "pc": [1015, 3523], "errorMessage": "ERR:errIwlt" }, { "pc": [3774, 3785, 3816], "errorMessage": "ERR:errIxfr" }, { "pc": [3739], "errorMessage": "ERR:errLflt" }, { "pc": [4003], "errorMessage": "ERR:errLgcy" }, { "pc": [3218], "errorMessage": "ERR:errNals" }, { "pc": [589, 3848], "errorMessage": "ERR:errNcls" }, { "pc": [575], "errorMessage": "ERR:errNclw" }, { "pc": [2336, 2527, 2772, 2814, 2882], "errorMessage": "ERR:errNdao" }, { "pc": [5459], "errorMessage": "ERR:errNesc" }, { "pc": [4813, 4861], "errorMessage": "ERR:errNpbo" }, { "pc": [603, 3862], "errorMessage": "ERR:errNrky" }, { "pc": [4184], "errorMessage": "ERR:errPbdl" }, { "pc": [4114, 4751], "errorMessage": "ERR:errPrlo" }, { "pc": [5287], "errorMessage": "ERR:errPtlg" }, { "pc": [5485], "errorMessage": "ERR:errWesc" }, { "pc": [1768, 1773, 1841, 1846, 1901, 1906, 1980, 1985, 2056, 2061, 2119, 2124, 2160, 2165, 3098, 3119, 3547, 3709, 3713], "errorMessage": "account funded" }, { "pc": [759, 2366, 2519, 2575, 2704, 2764, 2806, 2874, 2979, 3197, 3528, 3552, 3914, 4029, 4447, 4471, 4509, 4536, 4579, 4828, 4840, 5088, 5111, 5139, 5182, 5548, 5564, 5644], "errorMessage": "application exists" }, { "pc": [4608], "errorMessage": "asset exists" }, { "pc": [1379, 1608, 2315, 2512, 2565, 2569, 2695, 2699, 2757, 2799, 2818, 2867, 2970, 2974, 2996, 3013, 3046, 3254, 3270, 3385, 3411, 3576, 4217, 4282, 4294, 4299, 4574, 4817, 4927, 4939, 4944, 5177, 5317, 5348, 5540], "errorMessage": "check GlobalState exists" }, { "pc": [4842], "errorMessage": "errNapb" }, { "pc": [670, 810, 1178, 1194, 1235, 1340, 1356, 1479, 1495, 2292, 2386, 2746, 2783, 4224, 4699, 5426], "errorMessage": "invalid array length header" }, { "pc": [2272], "errorMessage": "invalid number of bytes for arc4.bool" }, { "pc": [1185, 1201, 1347, 1486, 2299, 2393, 2790], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [1366, 1505], "errorMessage": "invalid number of bytes for arc4.dynamic_array<bytes[32]>" }, { "pc": [5435], "errorMessage": "invalid number of bytes for arc4.dynamic_array<smart_contracts/arc58/account/types.ts::EscrowInfo>" }, { "pc": [1316, 1334, 1455, 1473, 1577, 1595, 1683, 1701, 1754, 1836, 1896, 1966, 2051, 2114], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [1212, 1288, 1297, 1306, 1324, 1374, 1427, 1436, 1445, 1463, 1549, 1558, 1567, 1585, 1603, 1655, 1664, 1673, 1691, 1744, 1762, 1826, 1886, 1956, 1974, 2041, 2104, 2154, 2254, 2263, 2310, 2378, 2551, 2690, 2860], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [676], "errorMessage": "invalid number of bytes for bytes" }, { "pc": [1240, 2751], "errorMessage": "invalid number of bytes for smart_contracts/utils/base-contracts/base.ts::EscrowConfig" }, { "pc": [4705], "errorMessage": "invalid number of bytes for string" }, { "pc": [1227, 2738], "errorMessage": "invalid tail pointer at index 0 of ((len+utf8[]),uint64)" }, { "pc": [1222, 2733], "errorMessage": "invalid tuple encoding" }, { "pc": [1531, 1637, 1736, 1818, 1948, 2033], "errorMessage": "transaction type is appl" }, { "pc": [1280, 1419, 1937, 2022, 2096], "errorMessage": "transaction type is axfer" }, { "pc": [1269, 1408, 1541, 1647, 1725, 1807, 1878, 2543], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDggMiA3OTgwMCA0MDk2IDc1NjUwMCA1MDAwMAogICAgYnl0ZWNibG9jayAiYWtpdGFfZGFvIiAiYmMiICJha2l0YV9lc2Nyb3ciIDB4MTUxZjdjNzUgImFhbCIgIndhbGxldCIgIkVSUjplcnJOZGFvIiAiRVJSOmVycklwYXkiICJFUlI6ZXJyQ25zdCIgImNoaWxkX2NvbnRyYWN0X3ZlcnNpb24iIDB4MDAgInJldiIgImZ1bmRlciIgImZhY3RvcnlfZmxvYXQiICJnYXRlX2lkIiAiRVJSOmVyckl4ZnIiIDB4M2VhMTE4MzIgMHhjNTNiMzJjYyAiRVJSOmVycklwbXMiICJFUlI6ZXJyTmNscyIgIkVSUjplcnJOcmt5IiAiYXBwSUQiICJjb250cm9sbGVkX2FkZHJlc3MiICJFUlI6ZXJySXdsdCIgInJlZmVycmVyIiAidmVyc2lvbiIgInBhbCIgIkVSUjplcnJGZ3RlIiAiRVJSOmVyclBybG8iIGJhc2U2NChDNEVCUXc9PSkgMHg5YzU0MjQwOSAweGFkZjkyYWU0ICJFUlI6ZXJyTnBibyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjIyLTI4CiAgICAvLyBAY29udHJhY3QoewogICAgLy8gICBzdGF0ZVRvdGFsczogewogICAgLy8gICAgIGdsb2JhbEJ5dGVzOiBGYWN0b3J5R2xvYmFsU3RhdGVNYXhCeXRlcywKICAgIC8vICAgICBnbG9iYWxVaW50czogRmFjdG9yeUdsb2JhbFN0YXRlTWF4VWludHMKICAgIC8vICAgfQogICAgLy8gfSkKICAgIC8vIGV4cG9ydCBjbGFzcyBNYXJrZXRwbGFjZSBleHRlbmRzIEZhY3RvcnlDb250cmFjdCB7CiAgICBwdXNoYnl0ZXMgMHhlYTkxODBkZCAvLyBtZXRob2QgInVwZGF0ZShzdHJpbmcpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIG1haW5fdXBkYXRlX3JvdXRlQDIKCm1haW5fc3dpdGNoX2Nhc2VfbmV4dEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjItMjgKICAgIC8vIEBjb250cmFjdCh7CiAgICAvLyAgIHN0YXRlVG90YWxzOiB7CiAgICAvLyAgICAgZ2xvYmFsQnl0ZXM6IEZhY3RvcnlHbG9iYWxTdGF0ZU1heEJ5dGVzLAogICAgLy8gICAgIGdsb2JhbFVpbnRzOiBGYWN0b3J5R2xvYmFsU3RhdGVNYXhVaW50cwogICAgLy8gICB9CiAgICAvLyB9KQogICAgLy8gZXhwb3J0IGNsYXNzIE1hcmtldHBsYWNlIGV4dGVuZHMgRmFjdG9yeUNvbnRyYWN0IHsKICAgIHR4biBPbkNvbXBsZXRpb24KICAgICEKICAgIGFzc2VydAogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgIGJ6IG1haW5fY3JlYXRlX05vT3BAMjYKICAgIHB1c2hieXRlc3MgMHg2YWJkNjczOCAweGUyZmE5ZTIxIDB4ZTY2YWQ5MmUgMHg4MWRjNTE2YSAweDcxZDUyMGY0IDB4NmU5MDM1Y2MgMHg1ZDdhNjE3NyAweDc5MjJjMWZkIDB4ZGFhOTc1MTYgMHgwMmNmYjFjZiAweGM5N2RiYjJlIDB4MzMyZjZkZDggLy8gbWV0aG9kICJsaXN0KHBheSxheGZlcix1aW50NjQsdWludDY0LHVpbnQ2NCxhZGRyZXNzLHVpbnQ2NCxhZGRyZXNzLHN0cmluZyxieXRlWzMyXVtdLHVpbnQ2NCl1aW50NjQiLCBtZXRob2QgImxpc3QocGF5LGF4ZmVyLHVpbnQ2NCx1aW50NjQsdWludDY0LGFkZHJlc3MsdWludDY0LGFkZHJlc3Msc3RyaW5nLGJ5dGVbMzJdW10pdWludDY0IiwgbWV0aG9kICJsaXN0UHJpemVCb3goYXBwbCxwYXksdWludDY0LHVpbnQ2NCx1aW50NjQsYWRkcmVzcyx1aW50NjQsYWRkcmVzcyx1aW50NjQpdWludDY0IiwgbWV0aG9kICJsaXN0UHJpemVCb3goYXBwbCxwYXksdWludDY0LHVpbnQ2NCx1aW50NjQsYWRkcmVzcyx1aW50NjQsYWRkcmVzcyl1aW50NjQiLCBtZXRob2QgImdhdGVkUHVyY2hhc2UocGF5LGFwcGwsdWludDY0LGFkZHJlc3MsdWludDY0KXZvaWQiLCBtZXRob2QgImdhdGVkUHVyY2hhc2UocGF5LGFwcGwsdWludDY0LGFkZHJlc3Mpdm9pZCIsIG1ldGhvZCAicHVyY2hhc2UocGF5LHVpbnQ2NCxhZGRyZXNzKXZvaWQiLCBtZXRob2QgImdhdGVkUHVyY2hhc2VBc2EoYXhmZXIsYXBwbCx1aW50NjQsYWRkcmVzcyx1aW50NjQpdm9pZCIsIG1ldGhvZCAiZ2F0ZWRQdXJjaGFzZUFzYShheGZlcixhcHBsLHVpbnQ2NCxhZGRyZXNzKXZvaWQiLCBtZXRob2QgInB1cmNoYXNlQXNhKGF4ZmVyLHVpbnQ2NCxhZGRyZXNzKXZvaWQiLCBtZXRob2QgImRlbGlzdCh1aW50NjQpdm9pZCIsIG1ldGhvZCAibGlzdENvc3QodWludDY0LHVpbnQ2NCxib29sKXVpbnQ2NCIKICAgIGJ5dGVjIDE3IC8vIG1ldGhvZCAiaW5pdEJveGVkQ29udHJhY3Qoc3RyaW5nLHVpbnQ2NCl2b2lkIgogICAgcHVzaGJ5dGVzcyAweGRjYTJkODYyIDB4ZDM0NmIxYTQgMHgzOTRlYWViMiAweDMzZjc4ODA4IDB4YWU4NGNiZDggMHgzM2U5MmM5NCAweDg1NGRlZGUwIC8vIG1ldGhvZCAibG9hZEJveGVkQ29udHJhY3QodWludDY0LGJ5dGVbXSl2b2lkIiwgbWV0aG9kICJkZWxldGVCb3hlZENvbnRyYWN0KCl2b2lkIiwgbWV0aG9kICJvcHRJbihwYXksdWludDY0KXZvaWQiLCBtZXRob2QgIm9wdEluQ29zdCh1aW50NjQpdWludDY0IiwgbWV0aG9kICJ1cGRhdGVBa2l0YURBT0VzY3Jvdygoc3RyaW5nLHVpbnQ2NCkpdm9pZCIsIG1ldGhvZCAidXBkYXRlQWtpdGFEQU8odWludDY0KXZvaWQiLCBtZXRob2QgIm9wVXAoKXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBsaXN0IGxlZ2FjeUxpc3QgbGlzdFByaXplQm94IGxlZ2FjeUxpc3RQcml6ZUJveCBnYXRlZFB1cmNoYXNlIGxlZ2FjeUdhdGVkUHVyY2hhc2UgcHVyY2hhc2UgZ2F0ZWRQdXJjaGFzZUFzYSBsZWdhY3lHYXRlZFB1cmNoYXNlQXNhIHB1cmNoYXNlQXNhIGRlbGlzdCBsaXN0Q29zdCBpbml0Qm94ZWRDb250cmFjdCBsb2FkQm94ZWRDb250cmFjdCBkZWxldGVCb3hlZENvbnRyYWN0IG9wdEluIG9wdEluQ29zdCB1cGRhdGVBa2l0YURBT0VzY3JvdyB1cGRhdGVBa2l0YURBTyBtYWluX29wVXBfcm91dGVAMjQKICAgIGVycgoKbWFpbl9vcFVwX3JvdXRlQDI0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjMwCiAgICAvLyBvcFVwKCk6IHZvaWQgeyB9CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgptYWluX2NyZWF0ZV9Ob09wQDI2OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjItMjgKICAgIC8vIEBjb250cmFjdCh7CiAgICAvLyAgIHN0YXRlVG90YWxzOiB7CiAgICAvLyAgICAgZ2xvYmFsQnl0ZXM6IEZhY3RvcnlHbG9iYWxTdGF0ZU1heEJ5dGVzLAogICAgLy8gICAgIGdsb2JhbFVpbnRzOiBGYWN0b3J5R2xvYmFsU3RhdGVNYXhVaW50cwogICAgLy8gICB9CiAgICAvLyB9KQogICAgLy8gZXhwb3J0IGNsYXNzIE1hcmtldHBsYWNlIGV4dGVuZHMgRmFjdG9yeUNvbnRyYWN0IHsKICAgIHB1c2hieXRlcyAweDgxMTUzNjI4IC8vIG1ldGhvZCAiY3JlYXRlKHN0cmluZyxzdHJpbmcsdWludDY0LChzdHJpbmcsdWludDY0KSl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggY3JlYXRlCiAgICBlcnIKCm1haW5fdXBkYXRlX3JvdXRlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzUKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgdHhuIE9uQ29tcGxldGlvbgogICAgcHVzaGludCA0IC8vIFVwZGF0ZUFwcGxpY2F0aW9uCiAgICA9PQogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgICYmCiAgICBhc3NlcnQKICAgIGIgdXBkYXRlCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3Byb2dyYW1zLnRzOjpib3hlZFByb2dyYW1TaXplKGJveEtleTogYnl0ZXMpIC0+IHVpbnQ2NDoKYm94ZWRQcm9ncmFtU2l6ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcm9ncmFtcy50czo4MQogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIGJveGVkUHJvZ3JhbVNpemUoYm94S2V5OiBieXRlcyk6IHVpbnQ2NCB7CiAgICBwcm90byAxIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcm9ncmFtcy50czo4MgogICAgLy8gY29uc3QgW3NpemUsIGV4aXN0c10gPSBvcC5Cb3gubGVuZ3RoKGJveEtleSkKICAgIGZyYW1lX2RpZyAtMQogICAgYm94X2xlbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3Byb2dyYW1zLnRzOjgzCiAgICAvLyBsb2dnZWRBc3NlcnQoZXhpc3RzLCBlcnJDb250cmFjdE5vdFNldCkKICAgIGJueiBib3hlZFByb2dyYW1TaXplX2FmdGVyX2Fzc2VydEAyCiAgICBieXRlYyA4IC8vICJFUlI6ZXJyQ25zdCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJDbnN0Cgpib3hlZFByb2dyYW1TaXplX2FmdGVyX2Fzc2VydEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3Byb2dyYW1zLnRzOjg0CiAgICAvLyByZXR1cm4gc2l6ZQogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6YXNzZXJ0U2FmZUFzc2V0VHJhbnNmZXIodHhuOiB1aW50NjQsIHNlbmRlcjogYnl0ZXMpIC0+IHZvaWQ6CmFzc2VydFNhZmVBc3NldFRyYW5zZmVyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo4MgogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIGFzc2VydFNhZmVBc3NldFRyYW5zZmVyKHR4bjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLCBzZW5kZXI6IEFjY291bnQpOiB2b2lkIHsKICAgIHByb3RvIDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo4MwogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5zZW5kZXIgPT09IHNlbmRlciwgZXJySW52YWxpZFBheW1lbnRTZW5kZXIpCiAgICBmcmFtZV9kaWcgLTIKICAgIGd0eG5zIFNlbmRlcgogICAgZnJhbWVfZGlnIC0xCiAgICA9PQogICAgYm56IGFzc2VydFNhZmVBc3NldFRyYW5zZmVyX2FmdGVyX2Fzc2VydEAyCiAgICBieXRlYyAxOCAvLyAiRVJSOmVycklwbXMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBtcwoKYXNzZXJ0U2FmZUFzc2V0VHJhbnNmZXJfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjg0CiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLmFzc2V0U2VuZGVyID09PSBHbG9iYWwuemVyb0FkZHJlc3MsIGVyckNsYXdiYWNrRm9yYmlkZGVuKQogICAgZnJhbWVfZGlnIC0yCiAgICBndHhucyBBc3NldFNlbmRlcgogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYm56IGFzc2VydFNhZmVBc3NldFRyYW5zZmVyX2FmdGVyX2Fzc2VydEA0CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJOY2x3IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5jbHcKCmFzc2VydFNhZmVBc3NldFRyYW5zZmVyX2FmdGVyX2Fzc2VydEA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo4NQogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5hc3NldENsb3NlVG8gPT09IEdsb2JhbC56ZXJvQWRkcmVzcywgZXJyQ2xvc2VGb3JiaWRkZW4pCiAgICBmcmFtZV9kaWcgLTIKICAgIGd0eG5zIEFzc2V0Q2xvc2VUbwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYm56IGFzc2VydFNhZmVBc3NldFRyYW5zZmVyX2FmdGVyX2Fzc2VydEA2CiAgICBieXRlYyAxOSAvLyAiRVJSOmVyck5jbHMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmNscwoKYXNzZXJ0U2FmZUFzc2V0VHJhbnNmZXJfYWZ0ZXJfYXNzZXJ0QDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjg2CiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLnJla2V5VG8gPT09IEdsb2JhbC56ZXJvQWRkcmVzcywgZXJyUmVrZXlGb3JiaWRkZW4pCiAgICBmcmFtZV9kaWcgLTIKICAgIGd0eG5zIFJla2V5VG8KICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIGJueiBhc3NlcnRTYWZlQXNzZXRUcmFuc2Zlcl9hZnRlcl9hc3NlcnRAOAogICAgYnl0ZWMgMjAgLy8gIkVSUjplcnJOcmt5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5ya3kKCmFzc2VydFNhZmVBc3NldFRyYW5zZmVyX2FmdGVyX2Fzc2VydEA4OgogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6bGVnYWN5V2FsbGV0T2YoYWtpdGFEQU86IHVpbnQ2NCwgYWRkcmVzczogYnl0ZXMpIC0+IHVpbnQ2NDoKbGVnYWN5V2FsbGV0T2Y6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI4NQogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIGxlZ2FjeVdhbGxldE9mKGFraXRhREFPOiBBcHBsaWNhdGlvbiwgYWRkcmVzczogQWNjb3VudCk6IEFwcGxpY2F0aW9uIHsKICAgIHByb3RvIDIgMQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTI3CiAgICAvLyBjb25zdCBbb3RoZXJBcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzT3RoZXJBcHBMaXN0KSkKICAgIGZyYW1lX2RpZyAtMgogICAgcHVzaGJ5dGVzICJvYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEzMgogICAgLy8gcmV0dXJuIGdldE90aGVyQXBwTGlzdChha2l0YURBTykuZXNjcm93CiAgICBwdXNoaW50IDI0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMTIKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0KSkKICAgIGZyYW1lX2RpZyAtMgogICAgYnl0ZWMgNCAvLyAiYWFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyODYKICAgIC8vIHJldHVybiBBcHBsaWNhdGlvbihsZWdhY3lXYWxsZXRJRChnZXRFc2Nyb3dGYWN0b3J5KGFraXRhREFPKSwgZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS53YWxsZXQsIGFkZHJlc3MpKQogICAgcHVzaGludCA4OAogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Mjk0LTI5NwogICAgLy8gY29uc3QgZGF0YSA9IGFiaUNhbGw8dHlwZW9mIEVzY3Jvd0ZhY3RvcnkucHJvdG90eXBlLmdldD4oewogICAgLy8gICBhcHBJZDogZXNjcm93RmFjdG9yeSwKICAgIC8vICAgYXJnczogW2FkZHJlc3NdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoYnl0ZXMgMHgzYzFhNmYzMyAvLyBtZXRob2QgImdldChhZGRyZXNzKWJ5dGVbXSIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBkaWcgMQogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjXzMgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBieXRlcwogICAgZXh0cmFjdCA2IDAKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyOTkKICAgIC8vIGlmIChCeXRlcyhkYXRhKS5sZW5ndGggIT09IDgpIHsKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgICE9CiAgICBieiBsZWdhY3lXYWxsZXRPZl9hZnRlcl9pZl9lbHNlQDYKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozMDAKICAgIC8vIHJldHVybiAwCiAgICBpbnRjXzAgLy8gMAoKbGVnYWN5V2FsbGV0T2ZfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpsZWdhY3lXYWxsZXRJREA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyODYKICAgIC8vIHJldHVybiBBcHBsaWNhdGlvbihsZWdhY3lXYWxsZXRJRChnZXRFc2Nyb3dGYWN0b3J5KGFraXRhREFPKSwgZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS53YWxsZXQsIGFkZHJlc3MpKQogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCmxlZ2FjeVdhbGxldE9mX2FmdGVyX2lmX2Vsc2VANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzAzCiAgICAvLyBjb25zdCB3YWxsZXQgPSBidG9pKGRhdGEpCiAgICBidG9pCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjcwCiAgICAvLyBpZiAod2FsbGV0ID09PSAwIHx8IHdhbGxldEZhY3RvcnkgPT09IDApIHsKICAgIGJ6IGxlZ2FjeVdhbGxldE9mX2lmX2JvZHlAMTAKICAgIGZyYW1lX2RpZyAxCiAgICBibnogbGVnYWN5V2FsbGV0T2ZfYWZ0ZXJfaWZfZWxzZUAxMQoKbGVnYWN5V2FsbGV0T2ZfaWZfYm9keUAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjcxCiAgICAvLyByZXR1cm4gZmFsc2UKICAgIGludGNfMCAvLyAwCgpsZWdhY3lXYWxsZXRPZl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmlzQWtpdGFXYWxsZXRAMTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjMwNAogICAgLy8gcmV0dXJuIGlzQWtpdGFXYWxsZXQod2FsbGV0LCB3YWxsZXRGYWN0b3J5KSA/IHdhbGxldCA6IDAKICAgIGludGNfMCAvLyAwCiAgICBjb3ZlciAyCiAgICBzZWxlY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Mjg2CiAgICAvLyByZXR1cm4gQXBwbGljYXRpb24obGVnYWN5V2FsbGV0SUQoZ2V0RXNjcm93RmFjdG9yeShha2l0YURBTyksIGdldEFraXRhQXBwTGlzdChha2l0YURBTykud2FsbGV0LCBhZGRyZXNzKSkKICAgIGIgbGVnYWN5V2FsbGV0T2ZfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpsZWdhY3lXYWxsZXRJREA3CgpsZWdhY3lXYWxsZXRPZl9hZnRlcl9pZl9lbHNlQDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNzMKICAgIC8vIGNvbnN0IFtjcmVhdG9yLCBleGlzdHNdID0gb3AuQXBwUGFyYW1zLmFwcENyZWF0b3Iod2FsbGV0KQogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBDcmVhdG9yCiAgICBzd2FwCiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Mjc0CiAgICAvLyByZXR1cm4gZXhpc3RzICYmIGNyZWF0b3IgPT09IGFwcEFkZHJlc3Mod2FsbGV0RmFjdG9yeSkKICAgIGJ6IGxlZ2FjeVdhbGxldE9mX2Jvb2xfZmFsc2VAMTQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjY1CiAgICAvLyByZXR1cm4gQWNjb3VudChvcC5zaGE1MTJfMjU2KEJ5dGVzKCdhcHBJRCcpLmNvbmNhdChpdG9iKGFwcElkKSkpKQogICAgZnJhbWVfZGlnIDEKICAgIGl0b2IKICAgIGJ5dGVjIDIxIC8vICJhcHBJRCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc2hhNTEyXzI1NgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNzQKICAgIC8vIHJldHVybiBleGlzdHMgJiYgY3JlYXRvciA9PT0gYXBwQWRkcmVzcyh3YWxsZXRGYWN0b3J5KQogICAgZnJhbWVfZGlnIDAKICAgID09CiAgICBieiBsZWdhY3lXYWxsZXRPZl9ib29sX2ZhbHNlQDE0CiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozMDQKICAgIC8vIHJldHVybiBpc0FraXRhV2FsbGV0KHdhbGxldCwgd2FsbGV0RmFjdG9yeSkgPyB3YWxsZXQgOiAwCiAgICBiIGxlZ2FjeVdhbGxldE9mX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6aXNBa2l0YVdhbGxldEAxNgoKbGVnYWN5V2FsbGV0T2ZfYm9vbF9mYWxzZUAxNDoKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjMwNAogICAgLy8gcmV0dXJuIGlzQWtpdGFXYWxsZXQod2FsbGV0LCB3YWxsZXRGYWN0b3J5KSA/IHdhbGxldCA6IDAKICAgIGIgbGVnYWN5V2FsbGV0T2ZfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjppc0FraXRhV2FsbGV0QDE2CgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6cmV3YXJkc09wdEluQ29zdChha2l0YURBTzogdWludDY0LCBhc3NldDogdWludDY0KSAtPiB1aW50NjQ6CnJld2FyZHNPcHRJbkNvc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY0NQogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIHJld2FyZHNPcHRJbkNvc3QoYWtpdGFEQU86IEFwcGxpY2F0aW9uLCBhc3NldDogdWludDY0KTogdWludDY0IHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NDYKICAgIC8vIGlmIChhc3NldCAhPT0gMCkgewogICAgZnJhbWVfZGlnIC0xCiAgICBieiByZXdhcmRzT3B0SW5Db3N0X2FmdGVyX2lmX2Vsc2VANAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMTIKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0KSkKICAgIGZyYW1lX2RpZyAtMgogICAgYnl0ZWMgNCAvLyAiYWFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NDcKICAgIC8vIGNvbnN0IHJld2FyZHNBcHAgPSBnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLnJld2FyZHMKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NDgKICAgIC8vIGlmICghQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcy5pc09wdGVkSW4oQXNzZXQoYXNzZXQpKSkgewogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZnJhbWVfZGlnIC0xCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYm56IHJld2FyZHNPcHRJbkNvc3RfYWZ0ZXJfaWZfZWxzZUA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY0OQogICAgLy8gcmV0dXJuIEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICByZXRzdWIKCnJld2FyZHNPcHRJbkNvc3RfYWZ0ZXJfaWZfZWxzZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NTIKICAgIC8vIHJldHVybiAwCiAgICBpbnRjXzAgLy8gMAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6c3BsaXRPcHRJbkNvdW50KGFraXRhREFPOiB1aW50NjQsIGVzY3JvdzogYnl0ZXMsIGFzc2V0OiB1aW50NjQpIC0+IHVpbnQ2NDoKc3BsaXRPcHRJbkNvdW50OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3OTAKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiBzcGxpdE9wdEluQ291bnQoYWtpdGFEQU86IEFwcGxpY2F0aW9uLCBlc2Nyb3c6IEFjY291bnQsIGFzc2V0OiBBc3NldCk6IHVpbnQ2NCB7CiAgICBwcm90byAzIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzkxCiAgICAvLyBsZXQgY291bnQ6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc5MwogICAgLy8gaWYgKCFlc2Nyb3cuaXNPcHRlZEluKGFzc2V0KSkgewogICAgZnJhbWVfZGlnIC0yCiAgICBmcmFtZV9kaWcgLTEKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBibnogc3BsaXRPcHRJbkNvdW50X2FmdGVyX2lmX2Vsc2VAMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNzEKICAgIC8vIGNvbnN0IFtzcGxpdHNCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNSZXZlbnVlU3BsaXRzKSkKICAgIGZyYW1lX2RpZyAtMwogICAgcHVzaGJ5dGVzICJyZXZlbnVlX3NwbGl0cyIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Nzk3CiAgICAvLyBjb3VudCArPSBzcGxpdHMubGVuZ3RoCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3OTQKICAgIC8vIGNvdW50ICs9IDEKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc5NwogICAgLy8gY291bnQgKz0gc3BsaXRzLmxlbmd0aAogICAgKwogICAgZnJhbWVfYnVyeSAwCgpzcGxpdE9wdEluQ291bnRfYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo4MDAKICAgIC8vIHJldHVybiBjb3VudAogICAgZnJhbWVfZGlnIDAKICAgIHN3YXAKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnByaW5jaXBhbE9mKGFraXRhREFPOiB1aW50NjQsIGhpbnQ6IHVpbnQ2NCkgLT4gYnl0ZXM6CnByaW5jaXBhbE9mOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo4MjgKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiBwcmluY2lwYWxPZihha2l0YURBTzogQXBwbGljYXRpb24sIGhpbnQ6IHVpbnQ2NCk6IFByaW5jaXBhbCB7CiAgICBwcm90byAyIDEKICAgIGludGNfMCAvLyAwCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTEyCiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICBmcmFtZV9kaWcgLTIKICAgIGJ5dGVjIDQgLy8gImFhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODI5CiAgICAvLyByZXR1cm4gcmVzb2x2ZVByaW5jaXBhbChnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLndhbGxldCwgaGludCkKICAgIHB1c2hpbnQgODgKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjIxNAogICAgLy8gR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uQWRkcmVzcywKICAgIGdsb2JhbCBDYWxsZXJBcHBsaWNhdGlvbkFkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MjEyCiAgICAvLyBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoyMTMKICAgIC8vIEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbklkLAogICAgZ2xvYmFsIENhbGxlckFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTQ4CiAgICAvLyBpZiAoaGludCA9PT0gMCkgewogICAgZnJhbWVfZGlnIC0xCiAgICBibnogcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUAzCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OTMKICAgIC8vIG9yaWdpbjogR2xvYmFsLnplcm9BZGRyZXNzLAogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjk1CiAgICAvLyByZWZlcnJlcjogR2xvYmFsLnplcm9BZGRyZXNzLAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjkxCiAgICAvLyB3YWxsZXQ6IDAsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo5MC05NwogICAgLy8gcmV0dXJuIHsKICAgIC8vICAgd2FsbGV0OiAwLAogICAgLy8gICBwcmluY2lwYWw6IHNlbmRlciwKICAgIC8vICAgb3JpZ2luOiBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICAvLyAgIHNwZW5kZXI6IHNlbmRlciwKICAgIC8vICAgcmVmZXJyZXI6IEdsb2JhbC56ZXJvQWRkcmVzcywKICAgIC8vICAgdmlhUGx1Z2luOiBmYWxzZSwKICAgIC8vIH0KICAgIGl0b2IKICAgIHVuY292ZXIgMwogICAgZHVwCiAgICBjb3ZlciAyCiAgICBjb25jYXQKICAgIHVuY292ZXIgMwogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYnl0ZWMgMTAgLy8gMHgwMAogICAgY29uY2F0CgpwcmluY2lwYWxPZl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OnJlc29sdmVQcmluY2lwYWxDdHhANDA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjgyOQogICAgLy8gcmV0dXJuIHJlc29sdmVQcmluY2lwYWwoZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS53YWxsZXQsIGhpbnQpCiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMDIKICAgIC8vIGlmICh3YWxsZXQgPT09IDAgfHwgd2FsbGV0RmFjdG9yeSA9PT0gMCkgewogICAgZnJhbWVfZGlnIC0xCiAgICBieiBwcmluY2lwYWxPZl9pZl9ib2R5QDUKICAgIGZyYW1lX2RpZyAyCiAgICBibnogcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUA2CgpwcmluY2lwYWxPZl9pZl9ib2R5QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjEwMwogICAgLy8gcmV0dXJuIGZhbHNlCiAgICBpbnRjXzAgLy8gMAoKcHJpbmNpcGFsT2ZfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjppc0dlbnVpbmVXYWxsZXRAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE1MgogICAgLy8gaWYgKCFpc0dlbnVpbmVXYWxsZXQoaGludCwgd2FsbGV0RmFjdG9yeSkpIHsKICAgIGJueiBwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDEzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE1NAogICAgLy8gbG9nZ2VkRXJyKGVyckhpbnROb3RXYWxsZXQpCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJIbndsIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckhud2wKCnByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE1OQogICAgLy8gaWYgKGNhbGxlckFwcCA9PT0gMCkgewogICAgZHVwCiAgICBibnogcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUAxNQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNjEKICAgIC8vIGxvZ2dlZEVycihlcnJIaW50VG9wTGV2ZWwpCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJIdG9wIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckh0b3AKCnByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMTU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE2NgogICAgLy8gbGV0IHZpYVBsdWdpbiA9IGZhbHNlCiAgICBpbnRjXzAgLy8gMAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNjcKICAgIC8vIGlmIChjYWxsZXJBcHAgIT09IGhpbnQpIHsKICAgIGZyYW1lX2RpZyAtMQogICAgIT0KICAgIGJ6IHByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMjIKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNzEKICAgIC8vIGNvbnN0IFtzcGVuZGluZywgc3BlbmRpbmdFeGlzdHNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoaGludCwgQnl0ZXMoUFJJTkNJUEFMX0tFWV9TUEVORElORykpCiAgICBmcmFtZV9kaWcgLTEKICAgIHB1c2hieXRlcyAic3BlbmRpbmdfYWRkcmVzcyIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBzd2FwCiAgICBmcmFtZV9idXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTcyCiAgICAvLyBpZiAoIShzcGVuZGluZ0V4aXN0cyAmJiBzcGVuZGluZy5sZW5ndGggPT09IDMyICYmIHNwZW5kaW5nID09PSBzZW5kZXIuYnl0ZXMgJiYgc2VuZGVyICE9PSBjYWxsZXJBZGRyKSkgewogICAgYnogcHJpbmNpcGFsT2ZfaWZfYm9keUAyMAogICAgZnJhbWVfZGlnIDEKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGJ6IHByaW5jaXBhbE9mX2lmX2JvZHlAMjAKICAgIGZyYW1lX2RpZyAxCiAgICBkaWcgMQogICAgPT0KICAgIGJ6IHByaW5jaXBhbE9mX2lmX2JvZHlAMjAKICAgIGR1cAogICAgZnJhbWVfZGlnIDMKICAgICE9CiAgICBibnogcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUAyMQoKcHJpbmNpcGFsT2ZfaWZfYm9keUAyMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTc0CiAgICAvLyBsb2dnZWRFcnIoZXJySGludE5vdEJvdW5kKQogICAgcHVzaGJ5dGVzICJFUlI6ZXJySG5iZCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJIbmJkCgpwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDIxOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNzgKICAgIC8vIHZpYVBsdWdpbiA9IHRydWUKICAgIGludGNfMSAvLyAxCiAgICBzd2FwCgpwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDIyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxODEKICAgIC8vIGNvbnN0IFtjb250cm9sbGVkQnl0ZXMsIGNvbnRyb2xsZWRFeGlzdHNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoaGludCwgQnl0ZXMoUFJJTkNJUEFMX0tFWV9DT05UUk9MTEVEKSkKICAgIGZyYW1lX2RpZyAtMQogICAgYnl0ZWMgMjIgLy8gImNvbnRyb2xsZWRfYWRkcmVzcyIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE4MgogICAgLy8gaWYgKCEoY29udHJvbGxlZEV4aXN0cyAmJiBjb250cm9sbGVkQnl0ZXMubGVuZ3RoID09PSAzMikpIHsKICAgIGJ6IHByaW5jaXBhbE9mX2lmX2JvZHlAMjQKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYm56IHByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMjUKCnByaW5jaXBhbE9mX2lmX2JvZHlAMjQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE4NAogICAgLy8gbG9nZ2VkRXJyKGVyckhpbnRCYWRXYWxsZXQpCiAgICBieXRlYyAyMyAvLyAiRVJSOmVyckl3bHQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXdsdAoKcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUAyNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTE5CiAgICAvLyBpZiAoY29udHJvbGxlZCA9PT0gc3BlbmRlcikgewogICAgZHVwCiAgICBkaWcgMgogICAgPT0KICAgIGJ6IHByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMjcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTIwCiAgICAvLyByZXR1cm4gdHJ1ZQogICAgaW50Y18xIC8vIDEKICAgIHN3YXAKCnByaW5jaXBhbE9mX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo6d2FsbGV0Q29udHJvbHNMaXZlQDMyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxOTEKICAgIC8vIGNvbnN0IFtyZWZlcnJlckJ5dGVzLCByZWZlcnJlckV4aXN0c10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhoaW50LCBCeXRlcyhQUklOQ0lQQUxfS0VZX1JFRkVSUkVSKSkKICAgIGZyYW1lX2RpZyAtMQogICAgYnl0ZWMgMjQgLy8gInJlZmVycmVyIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTkyCiAgICAvLyBjb25zdCByZWZlcnJlciA9IHJlZmVycmVyRXhpc3RzICYmIHJlZmVycmVyQnl0ZXMubGVuZ3RoID09PSAzMiA/IEFjY291bnQocmVmZXJyZXJCeXRlcykgOiBHbG9iYWwuemVyb0FkZHJlc3MKICAgIGJ6IHByaW5jaXBhbE9mX3Rlcm5hcnlfZmFsc2VAMzUKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYnogcHJpbmNpcGFsT2ZfdGVybmFyeV9mYWxzZUAzNQogICAgY292ZXIgMwoKcHJpbmNpcGFsT2ZfdGVybmFyeV9tZXJnZUAzNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTk2CiAgICAvLyBwcmluY2lwYWw6IGxpdmUgPyBjb250cm9sbGVkIDogc2VuZGVyLAogICAgZGlnIDIKICAgIGRpZyAxCiAgICB1bmNvdmVyIDMKICAgIGR1cAogICAgY292ZXIgMwogICAgc2VsZWN0CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE5NwogICAgLy8gb3JpZ2luOiBsaXZlID8gY29udHJvbGxlZCA6IEdsb2JhbC56ZXJvQWRkcmVzcywKICAgIGJ6IHByaW5jaXBhbE9mX3Rlcm5hcnlfZmFsc2VAMzgKICAgIHN3YXAKCnByaW5jaXBhbE9mX3Rlcm5hcnlfbWVyZ2VAMzk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE5NC0yMDEKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIHdhbGxldDogaGludCwKICAgIC8vICAgcHJpbmNpcGFsOiBsaXZlID8gY29udHJvbGxlZCA6IHNlbmRlciwKICAgIC8vICAgb3JpZ2luOiBsaXZlID8gY29udHJvbGxlZCA6IEdsb2JhbC56ZXJvQWRkcmVzcywKICAgIC8vICAgc3BlbmRlcjogc2VuZGVyLAogICAgLy8gICByZWZlcnJlciwKICAgIC8vICAgdmlhUGx1Z2luLAogICAgLy8gfQogICAgZnJhbWVfZGlnIC0xCiAgICBpdG9iCiAgICB1bmNvdmVyIDIKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYnl0ZWMgMTAgLy8gMHgwMAogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMwogICAgc2V0Yml0CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MjA5LTIxNgogICAgLy8gcmV0dXJuIHJlc29sdmVQcmluY2lwYWxDdHgoCiAgICAvLyAgIHdhbGxldEZhY3RvcnksCiAgICAvLyAgIGhpbnQsCiAgICAvLyAgIFR4bi5zZW5kZXIsCiAgICAvLyAgIEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbklkLAogICAgLy8gICBHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICB0cnVlCiAgICAvLyApCiAgICBiIHByaW5jaXBhbE9mX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo6cmVzb2x2ZVByaW5jaXBhbEN0eEA0MAoKcHJpbmNpcGFsT2ZfdGVybmFyeV9mYWxzZUAzODoKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxOTcKICAgIC8vIG9yaWdpbjogbGl2ZSA/IGNvbnRyb2xsZWQgOiBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgIGIgcHJpbmNpcGFsT2ZfdGVybmFyeV9tZXJnZUAzOQoKcHJpbmNpcGFsT2ZfdGVybmFyeV9mYWxzZUAzNToKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxOTIKICAgIC8vIGNvbnN0IHJlZmVycmVyID0gcmVmZXJyZXJFeGlzdHMgJiYgcmVmZXJyZXJCeXRlcy5sZW5ndGggPT09IDMyID8gQWNjb3VudChyZWZlcnJlckJ5dGVzKSA6IEdsb2JhbC56ZXJvQWRkcmVzcwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICBjb3ZlciAzCiAgICBiIHByaW5jaXBhbE9mX3Rlcm5hcnlfbWVyZ2VAMzYKCnByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMjc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjEyMgogICAgLy8gY29uc3QgW3dhbGxldEFkZHJlc3MsIHdhbGxldEV4aXN0c10gPSBvcC5BcHBQYXJhbXMuYXBwQWRkcmVzcyh3YWxsZXQpCiAgICBmcmFtZV9kaWcgLTEKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIHN3YXAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTIzCiAgICAvLyBpZiAoIXdhbGxldEV4aXN0cykgewogICAgYm56IHByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMjkKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMjQKICAgIC8vIHJldHVybiBmYWxzZQogICAgaW50Y18wIC8vIDAKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTg5CiAgICAvLyBjb25zdCBsaXZlID0gd2FsbGV0Q29udHJvbHNMaXZlKGhpbnQsIGNvbnRyb2xsZWQsIHNlbmRlcikKICAgIGIgcHJpbmNpcGFsT2ZfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjp3YWxsZXRDb250cm9sc0xpdmVAMzIKCnByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMjk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjEyNgogICAgLy8gaWYgKGNvbnRyb2xsZWQgPT09IHdhbGxldEFkZHJlc3MpIHsKICAgIGR1cAogICAgZGlnIDIKICAgID09CiAgICBieiBwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDMxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjg1CiAgICAvLyBjb25zdCBbYXV0aF0gPSBvcC5BY2N0UGFyYW1zLmFjY3RBdXRoQWRkcihhY2NvdW50KQogICAgc3dhcAogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RBdXRoQWRkcgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjEyNwogICAgLy8gcmV0dXJuIGF1dGhBZGRyT2Yod2FsbGV0QWRkcmVzcykgPT09IEdsb2JhbC56ZXJvQWRkcmVzcwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxODkKICAgIC8vIGNvbnN0IGxpdmUgPSB3YWxsZXRDb250cm9sc0xpdmUoaGludCwgY29udHJvbGxlZCwgc2VuZGVyKQogICAgYiBwcmluY2lwYWxPZl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OndhbGxldENvbnRyb2xzTGl2ZUAzMgoKcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUAzMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6ODUKICAgIC8vIGNvbnN0IFthdXRoXSA9IG9wLkFjY3RQYXJhbXMuYWNjdEF1dGhBZGRyKGFjY291bnQpCiAgICBkdXAKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0QXV0aEFkZHIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMjkKICAgIC8vIHJldHVybiBhdXRoQWRkck9mKGNvbnRyb2xsZWQpID09PSB3YWxsZXRBZGRyZXNzCiAgICB1bmNvdmVyIDIKICAgID09CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE4OQogICAgLy8gY29uc3QgbGl2ZSA9IHdhbGxldENvbnRyb2xzTGl2ZShoaW50LCBjb250cm9sbGVkLCBzZW5kZXIpCiAgICBiIHByaW5jaXBhbE9mX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo6d2FsbGV0Q29udHJvbHNMaXZlQDMyCgpwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjEwNQogICAgLy8gY29uc3QgW2NyZWF0b3IsIGV4aXN0c10gPSBvcC5BcHBQYXJhbXMuYXBwQ3JlYXRvcih3YWxsZXQpCiAgICBmcmFtZV9kaWcgLTEKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcENyZWF0b3IKICAgIHN3YXAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMDYKICAgIC8vIHJldHVybiBleGlzdHMgJiYgY3JlYXRvciA9PT0gYXBwQWRkcmVzc09mKHdhbGxldEZhY3RvcnkpCiAgICBieiBwcmluY2lwYWxPZl9ib29sX2ZhbHNlQDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6NzQKICAgIC8vIHJldHVybiBBY2NvdW50KG9wLnNoYTUxMl8yNTYoQnl0ZXMoJ2FwcElEJykuY29uY2F0KG9wLml0b2IoYXBwSWQpKSkpCiAgICBmcmFtZV9kaWcgMgogICAgaXRvYgogICAgYnl0ZWMgMjEgLy8gImFwcElEIgogICAgc3dhcAogICAgY29uY2F0CiAgICBzaGE1MTJfMjU2CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjEwNgogICAgLy8gcmV0dXJuIGV4aXN0cyAmJiBjcmVhdG9yID09PSBhcHBBZGRyZXNzT2Yod2FsbGV0RmFjdG9yeSkKICAgIGZyYW1lX2RpZyAwCiAgICA9PQogICAgYnogcHJpbmNpcGFsT2ZfYm9vbF9mYWxzZUA5CiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNTIKICAgIC8vIGlmICghaXNHZW51aW5lV2FsbGV0KGhpbnQsIHdhbGxldEZhY3RvcnkpKSB7CiAgICBiIHByaW5jaXBhbE9mX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo6aXNHZW51aW5lV2FsbGV0QDExCgpwcmluY2lwYWxPZl9ib29sX2ZhbHNlQDk6CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNTIKICAgIC8vIGlmICghaXNHZW51aW5lV2FsbGV0KGhpbnQsIHdhbGxldEZhY3RvcnkpKSB7CiAgICBiIHByaW5jaXBhbE9mX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo6aXNHZW51aW5lV2FsbGV0QDExCgoKLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6Ok1hcmtldHBsYWNlLmNyZWF0ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNyZWF0ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjI1OAogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIGRpZyAxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgcHVzaGludCAxMAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBhdCBpbmRleCAwIG9mICgobGVuK3V0ZjhbXSksdWludDY0KQogICAgZGlnIDIKICAgIHN3YXAKICAgIGRpZyAyCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAxMgogICAgKwogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkVzY3Jvd0NvbmZpZwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE0CiAgICAvLyB2ZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogR2xvYmFsU3RhdGVLZXlWZXJzaW9uIH0pCiAgICBieXRlYyAyNSAvLyAidmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjI2MAogICAgLy8gdGhpcy52ZXJzaW9uLnZhbHVlID0gdmVyc2lvbgogICAgdW5jb3ZlciA0CiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjIKICAgIC8vIGNoaWxkQ29udHJhY3RWZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogQmFzZUZhY3RvcnlHbG9iYWxTdGF0ZUtleUNoaWxkQ29udHJhY3RWZXJzaW9uIH0pCiAgICBieXRlYyA5IC8vICJjaGlsZF9jb250cmFjdF92ZXJzaW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjYxCiAgICAvLyB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlID0gY2hpbGRWZXJzaW9uCiAgICB1bmNvdmVyIDMKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyNjIKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUgPSBha2l0YURBTwogICAgdW5jb3ZlciAyCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWNfMiAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjYzCiAgICAvLyB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlID0gY2xvbmUoYWtpdGFEQU9Fc2Nyb3cpCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjU4CiAgICAvLyBAYWJpbWV0aG9kKHsgb25DcmVhdGU6ICdyZXF1aXJlJyB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjpNYXJrZXRwbGFjZS5saXN0W3JvdXRpbmddKCkgLT4gdm9pZDoKbGlzdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjUwMC01MTIKICAgIC8vIGxpc3QoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIHByaWNlOiB1aW50NjQsCiAgICAvLyAgIHBheW1lbnRBc3NldDogdWludDY0LCAvLyAwIHwgQXNzZXQKICAgIC8vICAgZXhwaXJhdGlvbjogdWludDY0LAogICAgLy8gICByZXNlcnZlZEZvcjogQWNjb3VudCwKICAgIC8vICAgZ2F0ZUlEOiB1aW50NjQsCiAgICAvLyAgIG1hcmtldHBsYWNlOiBBY2NvdW50LAogICAgLy8gICBuYW1lOiBzdHJpbmcsCiAgICAvLyAgIHByb29mOiBQcm9vZiwKICAgIC8vICAgd2FsbGV0OiB1aW50NjQKICAgIC8vICk6IHVpbnQ2NCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18zIC8vIDIKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA0IC8vIGF4ZmVyCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXhmZXIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDUKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDYKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDcKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA4CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDMyCiAgICAqCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGJ5dGVzWzMyXT4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDkKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjUxMwogICAgLy8gY29uc3QgeyByZWZlcnJlciB9ID0gcHJpbmNpcGFsT2YodGhpcy5ha2l0YURBTy52YWx1ZSwgd2FsbGV0KQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjUxMwogICAgLy8gY29uc3QgeyByZWZlcnJlciB9ID0gcHJpbmNpcGFsT2YodGhpcy5ha2l0YURBTy52YWx1ZSwgd2FsbGV0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHN3YXAKICAgIGNhbGxzdWIgcHJpbmNpcGFsT2YKICAgIGV4dHJhY3QgMTA0IDMyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo1MTQKICAgIC8vIHJldHVybiB0aGlzLmxpc3RJbXBsKHBheW1lbnQsIGFzc2V0WGZlciwgcHJpY2UsIHBheW1lbnRBc3NldCwgZXhwaXJhdGlvbiwgcmVzZXJ2ZWRGb3IsIGdhdGVJRCwgbWFya2V0cGxhY2UsIG5hbWUsIHByb29mLCByZWZlcnJlciwgZmFsc2UpCiAgICBpbnRjXzAgLy8gMAogICAgY2FsbHN1YiBsaXN0SW1wbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo1MDAtNTEyCiAgICAvLyBsaXN0KAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICBwcmljZTogdWludDY0LAogICAgLy8gICBwYXltZW50QXNzZXQ6IHVpbnQ2NCwgLy8gMCB8IEFzc2V0CiAgICAvLyAgIGV4cGlyYXRpb246IHVpbnQ2NCwKICAgIC8vICAgcmVzZXJ2ZWRGb3I6IEFjY291bnQsCiAgICAvLyAgIGdhdGVJRDogdWludDY0LAogICAgLy8gICBtYXJrZXRwbGFjZTogQWNjb3VudCwKICAgIC8vICAgbmFtZTogc3RyaW5nLAogICAgLy8gICBwcm9vZjogUHJvb2YsCiAgICAvLyAgIHdhbGxldDogdWludDY0CiAgICAvLyApOiB1aW50NjQgewogICAgaXRvYgogICAgYnl0ZWNfMyAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjpNYXJrZXRwbGFjZS5sZWdhY3lMaXN0W3JvdXRpbmddKCkgLT4gdm9pZDoKbGVnYWN5TGlzdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjUyMgogICAgLy8gQGFiaW1ldGhvZCh7IG5hbWU6ICdsaXN0JyB9KQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMyAvLyAyCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNCAvLyBheGZlcgogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGF4ZmVyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA1CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA2CiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA3CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgOAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAzMgogICAgKgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxieXRlc1szMl0+CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo1MzUKICAgIC8vIHJldHVybiB0aGlzLmxpc3RJbXBsKHBheW1lbnQsIGFzc2V0WGZlciwgcHJpY2UsIHBheW1lbnRBc3NldCwgZXhwaXJhdGlvbiwgcmVzZXJ2ZWRGb3IsIGdhdGVJRCwgbWFya2V0cGxhY2UsIG5hbWUsIHByb29mLCB0aGlzLmxlZ2FjeVNlbGxlclJlZmVycmVyKCksIHRydWUpCiAgICBjYWxsc3ViIGxlZ2FjeVNlbGxlclJlZmVycmVyCiAgICBpbnRjXzEgLy8gMQogICAgY2FsbHN1YiBsaXN0SW1wbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo1MjIKICAgIC8vIEBhYmltZXRob2QoeyBuYW1lOiAnbGlzdCcgfSkKICAgIGl0b2IKICAgIGJ5dGVjXzMgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo6TWFya2V0cGxhY2UubGlzdFByaXplQm94W3JvdXRpbmddKCkgLT4gdm9pZDoKbGlzdFByaXplQm94OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NTM5LTU0OQogICAgLy8gbGlzdFByaXplQm94KAogICAgLy8gICBwcml6ZUJveFRyYW5zZmVyVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBwcmljZTogdWludDY0LAogICAgLy8gICBwYXltZW50QXNzZXQ6IHVpbnQ2NCwKICAgIC8vICAgZXhwaXJhdGlvbjogdWludDY0LAogICAgLy8gICByZXNlcnZlZEZvcjogQWNjb3VudCwKICAgIC8vICAgZ2F0ZUlEOiB1aW50NjQsCiAgICAvLyAgIG1hcmtldHBsYWNlOiBBY2NvdW50LAogICAgLy8gICB3YWxsZXQ6IHVpbnQ2NAogICAgLy8gKTogdWludDY0IHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzMgLy8gMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA2IC8vIGFwcGwKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBhcHBsCiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDUKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDYKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDcKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjU1MAogICAgLy8gY29uc3QgeyByZWZlcnJlciB9ID0gcHJpbmNpcGFsT2YodGhpcy5ha2l0YURBTy52YWx1ZSwgd2FsbGV0KQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjU1MAogICAgLy8gY29uc3QgeyByZWZlcnJlciB9ID0gcHJpbmNpcGFsT2YodGhpcy5ha2l0YURBTy52YWx1ZSwgd2FsbGV0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHN3YXAKICAgIGNhbGxzdWIgcHJpbmNpcGFsT2YKICAgIGV4dHJhY3QgMTA0IDMyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo1NTEKICAgIC8vIHJldHVybiB0aGlzLmxpc3RQcml6ZUJveEltcGwocHJpemVCb3hUcmFuc2ZlclR4biwgcGF5bWVudCwgcHJpY2UsIHBheW1lbnRBc3NldCwgZXhwaXJhdGlvbiwgcmVzZXJ2ZWRGb3IsIGdhdGVJRCwgbWFya2V0cGxhY2UsIHJlZmVycmVyLCBmYWxzZSkKICAgIGludGNfMCAvLyAwCiAgICBjYWxsc3ViIGxpc3RQcml6ZUJveEltcGwKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjUzOS01NDkKICAgIC8vIGxpc3RQcml6ZUJveCgKICAgIC8vICAgcHJpemVCb3hUcmFuc2ZlclR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgcHJpY2U6IHVpbnQ2NCwKICAgIC8vICAgcGF5bWVudEFzc2V0OiB1aW50NjQsCiAgICAvLyAgIGV4cGlyYXRpb246IHVpbnQ2NCwKICAgIC8vICAgcmVzZXJ2ZWRGb3I6IEFjY291bnQsCiAgICAvLyAgIGdhdGVJRDogdWludDY0LAogICAgLy8gICBtYXJrZXRwbGFjZTogQWNjb3VudCwKICAgIC8vICAgd2FsbGV0OiB1aW50NjQKICAgIC8vICk6IHVpbnQ2NCB7CiAgICBpdG9iCiAgICBieXRlY18zIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6Ok1hcmtldHBsYWNlLmxlZ2FjeUxpc3RQcml6ZUJveFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmxlZ2FjeUxpc3RQcml6ZUJveDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjU1NQogICAgLy8gQGFiaW1ldGhvZCh7IG5hbWU6ICdsaXN0UHJpemVCb3gnIH0pCiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18zIC8vIDIKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXBwbAogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA1CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA2CiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo1NjYKICAgIC8vIHJldHVybiB0aGlzLmxpc3RQcml6ZUJveEltcGwocHJpemVCb3hUcmFuc2ZlclR4biwgcGF5bWVudCwgcHJpY2UsIHBheW1lbnRBc3NldCwgZXhwaXJhdGlvbiwgcmVzZXJ2ZWRGb3IsIGdhdGVJRCwgbWFya2V0cGxhY2UsIHRoaXMubGVnYWN5U2VsbGVyUmVmZXJyZXIoKSwgdHJ1ZSkKICAgIGNhbGxzdWIgbGVnYWN5U2VsbGVyUmVmZXJyZXIKICAgIGludGNfMSAvLyAxCiAgICBjYWxsc3ViIGxpc3RQcml6ZUJveEltcGwKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjU1NQogICAgLy8gQGFiaW1ldGhvZCh7IG5hbWU6ICdsaXN0UHJpemVCb3gnIH0pCiAgICBpdG9iCiAgICBieXRlY18zIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6Ok1hcmtldHBsYWNlLmdhdGVkUHVyY2hhc2Vbcm91dGluZ10oKSAtPiB2b2lkOgpnYXRlZFB1cmNoYXNlOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NTczLTU3OQogICAgLy8gZ2F0ZWRQdXJjaGFzZSgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBnYXRlVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwKICAgIC8vICAgYXBwSWQ6IEFwcGxpY2F0aW9uLAogICAgLy8gICBtYXJrZXRwbGFjZTogQWNjb3VudCwKICAgIC8vICAgd2FsbGV0OiB1aW50NjQKICAgIC8vICk6IHZvaWQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMyAvLyAyCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXBwbAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NTgwCiAgICAvLyBjb25zdCBiYWxhbmNlQmVmb3JlOiB1aW50NjQgPSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcy5iYWxhbmNlCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RCYWxhbmNlCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjU4MQogICAgLy8gY29uc3QgbWluQmVmb3JlOiB1aW50NjQgPSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcy5taW5CYWxhbmNlCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RNaW5CYWxhbmNlCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjU4MwogICAgLy8gdGhpcy5hc3NlcnRJc0xpc3RpbmcoYXBwSWQpCiAgICBkaWcgNAogICAgY2FsbHN1YiBhc3NlcnRJc0xpc3RpbmcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjU4NAogICAgLy8gdGhpcy5hc3NlcnRHYXRlUGFzc2VkKGdhdGVUeG4sIGFwcElkLCB3YWxsZXQpCiAgICB1bmNvdmVyIDUKICAgIGRpZyA1CiAgICB1bmNvdmVyIDQKICAgIGNhbGxzdWIgYXNzZXJ0R2F0ZVBhc3NlZAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NTg1CiAgICAvLyB0aGlzLmFzc2VydEJ1eWVyUGF5bWVudChwYXltZW50KQogICAgZGlnIDQKICAgIGNhbGxzdWIgYXNzZXJ0QnV5ZXJQYXltZW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo1ODcKICAgIC8vIHRoaXMuc2V0dGxlQWxnbyhwYXltZW50LCBhcHBJZCwgbWFya2V0cGxhY2UsIGJhbGFuY2VCZWZvcmUsIG1pbkJlZm9yZSkKICAgIGNhbGxzdWIgc2V0dGxlQWxnbwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NTczLTU3OQogICAgLy8gZ2F0ZWRQdXJjaGFzZSgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBnYXRlVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwKICAgIC8vICAgYXBwSWQ6IEFwcGxpY2F0aW9uLAogICAgLy8gICBtYXJrZXRwbGFjZTogQWNjb3VudCwKICAgIC8vICAgd2FsbGV0OiB1aW50NjQKICAgIC8vICk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjpNYXJrZXRwbGFjZS5sZWdhY3lHYXRlZFB1cmNoYXNlW3JvdXRpbmddKCkgLT4gdm9pZDoKbGVnYWN5R2F0ZWRQdXJjaGFzZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjU5MQogICAgLy8gQGFiaW1ldGhvZCh7IG5hbWU6ICdnYXRlZFB1cmNoYXNlJyB9KQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMyAvLyAyCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXBwbAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NTk4CiAgICAvLyBjb25zdCBiYWxhbmNlQmVmb3JlOiB1aW50NjQgPSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcy5iYWxhbmNlCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RCYWxhbmNlCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjU5OQogICAgLy8gY29uc3QgbWluQmVmb3JlOiB1aW50NjQgPSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcy5taW5CYWxhbmNlCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RNaW5CYWxhbmNlCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjYwMQogICAgLy8gdGhpcy5hc3NlcnRJc0xpc3RpbmcoYXBwSWQpCiAgICBkaWcgMwogICAgY2FsbHN1YiBhc3NlcnRJc0xpc3RpbmcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjYwMgogICAgLy8gdGhpcy5hc3NlcnRMZWdhY3lHYXRlUGFzc2VkKGdhdGVUeG4sIGFwcElkKQogICAgdW5jb3ZlciA0CiAgICBkaWcgNAogICAgY2FsbHN1YiBhc3NlcnRMZWdhY3lHYXRlUGFzc2VkCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo2MDMKICAgIC8vIHRoaXMuYXNzZXJ0QnV5ZXJQYXltZW50KHBheW1lbnQpCiAgICBkaWcgNAogICAgY2FsbHN1YiBhc3NlcnRCdXllclBheW1lbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjYwNQogICAgLy8gdGhpcy5zZXR0bGVBbGdvKHBheW1lbnQsIGFwcElkLCBtYXJrZXRwbGFjZSwgYmFsYW5jZUJlZm9yZSwgbWluQmVmb3JlKQogICAgY2FsbHN1YiBzZXR0bGVBbGdvCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo1OTEKICAgIC8vIEBhYmltZXRob2QoeyBuYW1lOiAnZ2F0ZWRQdXJjaGFzZScgfSkKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo6TWFya2V0cGxhY2UucHVyY2hhc2Vbcm91dGluZ10oKSAtPiB2b2lkOgpwdXJjaGFzZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjYwOC02MTIKICAgIC8vIHB1cmNoYXNlKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGFwcElkOiBBcHBsaWNhdGlvbiwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQsCiAgICAvLyApOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NjEzCiAgICAvLyBjb25zdCBiYWxhbmNlQmVmb3JlOiB1aW50NjQgPSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcy5iYWxhbmNlCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RCYWxhbmNlCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjYxNAogICAgLy8gY29uc3QgbWluQmVmb3JlOiB1aW50NjQgPSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcy5taW5CYWxhbmNlCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RNaW5CYWxhbmNlCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjYxNgogICAgLy8gdGhpcy5hc3NlcnRJc0xpc3RpbmcoYXBwSWQpCiAgICBkaWcgMwogICAgY2FsbHN1YiBhc3NlcnRJc0xpc3RpbmcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjYxNwogICAgLy8gdGhpcy5hc3NlcnRVbmdhdGVkKGFwcElkKQogICAgZGlnIDMKICAgIGNhbGxzdWIgYXNzZXJ0VW5nYXRlZAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NjE4CiAgICAvLyB0aGlzLmFzc2VydEJ1eWVyUGF5bWVudChwYXltZW50KQogICAgZGlnIDQKICAgIGNhbGxzdWIgYXNzZXJ0QnV5ZXJQYXltZW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo2MjAKICAgIC8vIHRoaXMuc2V0dGxlQWxnbyhwYXltZW50LCBhcHBJZCwgbWFya2V0cGxhY2UsIGJhbGFuY2VCZWZvcmUsIG1pbkJlZm9yZSkKICAgIGNhbGxzdWIgc2V0dGxlQWxnbwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NjA4LTYxMgogICAgLy8gcHVyY2hhc2UoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgYXBwSWQ6IEFwcGxpY2F0aW9uLAogICAgLy8gICBtYXJrZXRwbGFjZTogQWNjb3VudCwKICAgIC8vICk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjpNYXJrZXRwbGFjZS5nYXRlZFB1cmNoYXNlQXNhW3JvdXRpbmddKCkgLT4gdm9pZDoKZ2F0ZWRQdXJjaGFzZUFzYToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjYyNC02MzAKICAgIC8vIGdhdGVkUHVyY2hhc2VBc2EoCiAgICAvLyAgIGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICBnYXRlVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwKICAgIC8vICAgYXBwSWQ6IEFwcGxpY2F0aW9uLAogICAgLy8gICBtYXJrZXRwbGFjZTogQWNjb3VudCwKICAgIC8vICAgd2FsbGV0OiB1aW50NjQKICAgIC8vICk6IHZvaWQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMyAvLyAyCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDQgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGFwcGwKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjYzMQogICAgLy8gY29uc3QgYmFsYW5jZUJlZm9yZTogdWludDY0ID0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MuYmFsYW5jZQogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0QmFsYW5jZQogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo2MzIKICAgIC8vIGNvbnN0IG1pbkJlZm9yZTogdWludDY0ID0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MubWluQmFsYW5jZQogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0TWluQmFsYW5jZQogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo2MzQKICAgIC8vIHRoaXMuYXNzZXJ0SXNMaXN0aW5nKGFwcElkKQogICAgZGlnIDQKICAgIGNhbGxzdWIgYXNzZXJ0SXNMaXN0aW5nCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo2MzUKICAgIC8vIHRoaXMuYXNzZXJ0R2F0ZVBhc3NlZChnYXRlVHhuLCBhcHBJZCwgd2FsbGV0KQogICAgdW5jb3ZlciA1CiAgICBkaWcgNQogICAgdW5jb3ZlciA0CiAgICBjYWxsc3ViIGFzc2VydEdhdGVQYXNzZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjYzNgogICAgLy8gdGhpcy5hc3NlcnRCdXllckFzYVBheW1lbnQoYXNzZXRYZmVyLCBhcHBJZCkKICAgIGRpZyA0CiAgICBkaWcgNAogICAgY2FsbHN1YiBhc3NlcnRCdXllckFzYVBheW1lbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjYzOAogICAgLy8gdGhpcy5zZXR0bGVBc2EoYXNzZXRYZmVyLCBhcHBJZCwgbWFya2V0cGxhY2UsIGJhbGFuY2VCZWZvcmUsIG1pbkJlZm9yZSkKICAgIGNhbGxzdWIgc2V0dGxlQXNhCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo2MjQtNjMwCiAgICAvLyBnYXRlZFB1cmNoYXNlQXNhKAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgZ2F0ZVR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sCiAgICAvLyAgIGFwcElkOiBBcHBsaWNhdGlvbiwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQsCiAgICAvLyAgIHdhbGxldDogdWludDY0CiAgICAvLyApOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo6TWFya2V0cGxhY2UubGVnYWN5R2F0ZWRQdXJjaGFzZUFzYVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmxlZ2FjeUdhdGVkUHVyY2hhc2VBc2E6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo2NDIKICAgIC8vIEBhYmltZXRob2QoeyBuYW1lOiAnZ2F0ZWRQdXJjaGFzZUFzYScgfSkKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzMgLy8gMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA0IC8vIGF4ZmVyCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXhmZXIKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA2IC8vIGFwcGwKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBhcHBsCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo2NDkKICAgIC8vIGNvbnN0IGJhbGFuY2VCZWZvcmU6IHVpbnQ2NCA9IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLmJhbGFuY2UKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdEJhbGFuY2UKICAgIGFzc2VydCAvLyBhY2NvdW50IGZ1bmRlZAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NjUwCiAgICAvLyBjb25zdCBtaW5CZWZvcmU6IHVpbnQ2NCA9IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLm1pbkJhbGFuY2UKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdE1pbkJhbGFuY2UKICAgIGFzc2VydCAvLyBhY2NvdW50IGZ1bmRlZAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NjUyCiAgICAvLyB0aGlzLmFzc2VydElzTGlzdGluZyhhcHBJZCkKICAgIGRpZyAzCiAgICBjYWxsc3ViIGFzc2VydElzTGlzdGluZwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NjUzCiAgICAvLyB0aGlzLmFzc2VydExlZ2FjeUdhdGVQYXNzZWQoZ2F0ZVR4biwgYXBwSWQpCiAgICB1bmNvdmVyIDQKICAgIGRpZyA0CiAgICBjYWxsc3ViIGFzc2VydExlZ2FjeUdhdGVQYXNzZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjY1NAogICAgLy8gdGhpcy5hc3NlcnRCdXllckFzYVBheW1lbnQoYXNzZXRYZmVyLCBhcHBJZCkKICAgIGRpZyA0CiAgICBkaWcgNAogICAgY2FsbHN1YiBhc3NlcnRCdXllckFzYVBheW1lbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjY1NgogICAgLy8gdGhpcy5zZXR0bGVBc2EoYXNzZXRYZmVyLCBhcHBJZCwgbWFya2V0cGxhY2UsIGJhbGFuY2VCZWZvcmUsIG1pbkJlZm9yZSkKICAgIGNhbGxzdWIgc2V0dGxlQXNhCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo2NDIKICAgIC8vIEBhYmltZXRob2QoeyBuYW1lOiAnZ2F0ZWRQdXJjaGFzZUFzYScgfSkKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo6TWFya2V0cGxhY2UucHVyY2hhc2VBc2Fbcm91dGluZ10oKSAtPiB2b2lkOgpwdXJjaGFzZUFzYToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjY1OS02NjMKICAgIC8vIHB1cmNoYXNlQXNhKAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgYXBwSWQ6IEFwcGxpY2F0aW9uLAogICAgLy8gICBtYXJrZXRwbGFjZTogQWNjb3VudCwKICAgIC8vICk6IHZvaWQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDQgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NjY0CiAgICAvLyBjb25zdCBiYWxhbmNlQmVmb3JlOiB1aW50NjQgPSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcy5iYWxhbmNlCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RCYWxhbmNlCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjY2NQogICAgLy8gY29uc3QgbWluQmVmb3JlOiB1aW50NjQgPSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcy5taW5CYWxhbmNlCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RNaW5CYWxhbmNlCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjY2NwogICAgLy8gdGhpcy5hc3NlcnRJc0xpc3RpbmcoYXBwSWQpCiAgICBkaWcgMwogICAgY2FsbHN1YiBhc3NlcnRJc0xpc3RpbmcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjY2OAogICAgLy8gdGhpcy5hc3NlcnRVbmdhdGVkKGFwcElkKQogICAgZGlnIDMKICAgIGNhbGxzdWIgYXNzZXJ0VW5nYXRlZAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NjY5CiAgICAvLyB0aGlzLmFzc2VydEJ1eWVyQXNhUGF5bWVudChhc3NldFhmZXIsIGFwcElkKQogICAgZGlnIDQKICAgIGRpZyA0CiAgICBjYWxsc3ViIGFzc2VydEJ1eWVyQXNhUGF5bWVudAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NjcxCiAgICAvLyB0aGlzLnNldHRsZUFzYShhc3NldFhmZXIsIGFwcElkLCBtYXJrZXRwbGFjZSwgYmFsYW5jZUJlZm9yZSwgbWluQmVmb3JlKQogICAgY2FsbHN1YiBzZXR0bGVBc2EKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjY1OS02NjMKICAgIC8vIHB1cmNoYXNlQXNhKAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgYXBwSWQ6IEFwcGxpY2F0aW9uLAogICAgLy8gICBtYXJrZXRwbGFjZTogQWNjb3VudCwKICAgIC8vICk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjpNYXJrZXRwbGFjZS5kZWxpc3Rbcm91dGluZ10oKSAtPiB2b2lkOgpkZWxpc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo2NzQKICAgIC8vIGRlbGlzdChhcHBJZDogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjY3NQogICAgLy8gY29uc3QgYmFsYW5jZUJlZm9yZTogdWludDY0ID0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MuYmFsYW5jZQogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0QmFsYW5jZQogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo2NzYKICAgIC8vIGNvbnN0IG1pbkJlZm9yZTogdWludDY0ID0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MubWluQmFsYW5jZQogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0TWluQmFsYW5jZQogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo2NzgKICAgIC8vIHRoaXMuYXNzZXJ0SXNMaXN0aW5nKGFwcElkKQogICAgZGlnIDIKICAgIGNhbGxzdWIgYXNzZXJ0SXNMaXN0aW5nCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo4NAogICAgLy8gcmV0dXJuICFvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQoYXBwSWQsIEJ5dGVzKExpc3RpbmdHbG9iYWxTdGF0ZUtleVJldmlzaW9uKSlbMV0KICAgIGRpZyAyCiAgICBieXRlYyAxMSAvLyAicmV2IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGJ1cnkgMQogICAgIQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1ODMKICAgIC8vIGNvbnN0IFtmdW5kZXJCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhhcHBJZCwgQnl0ZXMoR2xvYmFsU3RhdGVLZXlGdW5kZXIpKQogICAgZGlnIDMKICAgIGJ5dGVjIDEyIC8vICJmdW5kZXIiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo2ODIKICAgIC8vIGNvbnN0IHsgYWNjb3VudDogcmVjZWl2ZXIsIGFtb3VudCB9ID0gZ2V0RnVuZGVyKGFwcElkKQogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIHN3YXAKICAgIHB1c2hpbnQgMzIKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxMTYKICAgIC8vIHJldHVybiBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQoYXBwSWQsIEJ5dGVzKExpc3RpbmdHbG9iYWxTdGF0ZUtleUZhY3RvcnlGbG9hdCkpWzBdCiAgICBkaWcgNQogICAgYnl0ZWMgMTMgLy8gImZhY3RvcnlfZmxvYXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo2ODYtNjkwCiAgICAvLyBsaXN0aW5nLmNhbGwuZGVsaXN0KHsKICAgIC8vICAgYXBwSWQsCiAgICAvLyAgIGFyZ3M6IFtUeG4uc2VuZGVyXSwKICAgIC8vICAgb25Db21wbGV0aW9uOiBPbkNvbXBsZXRlQWN0aW9uLkRlbGV0ZUFwcGxpY2F0aW9uLAogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjY4OAogICAgLy8gYXJnczogW1R4bi5zZW5kZXJdLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6Njg5CiAgICAvLyBvbkNvbXBsZXRpb246IE9uQ29tcGxldGVBY3Rpb24uRGVsZXRlQXBwbGljYXRpb24sCiAgICBwdXNoaW50IDUKICAgIGl0eG5fZmllbGQgT25Db21wbGV0aW9uCiAgICB1bmNvdmVyIDcKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6Njg2LTY5MAogICAgLy8gbGlzdGluZy5jYWxsLmRlbGlzdCh7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbVHhuLnNlbmRlcl0sCiAgICAvLyAgIG9uQ29tcGxldGlvbjogT25Db21wbGV0ZUFjdGlvbi5EZWxldGVBcHBsaWNhdGlvbiwKICAgIC8vIH0pCiAgICBwdXNoYnl0ZXMgMHg2OGU4NjM0MyAvLyBtZXRob2QgImRlbGlzdChhZGRyZXNzKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo2OTIKICAgIC8vIHRoaXMucmVmdW5kTGlzdGluZ0Z1bmRlcihsZWdhY3ksIHJlY2VpdmVyLCBhbW91bnQsIGZsb2F0LCBiYWxhbmNlQmVmb3JlLCBtaW5CZWZvcmUsIDApCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAyCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgNQogICAgdW5jb3ZlciA1CiAgICBpbnRjXzAgLy8gMAogICAgY2FsbHN1YiByZWZ1bmRMaXN0aW5nRnVuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo2NzQKICAgIC8vIGRlbGlzdChhcHBJZDogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo6TWFya2V0cGxhY2UubGlzdENvc3Rbcm91dGluZ10oKSAtPiB2b2lkOgpsaXN0Q29zdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjcwMgogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18xIC8vIDEKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuYm9vbAogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NzA0CiAgICAvLyByZXR1cm4gdGhpcy5saXN0aW5nQ29zdChwcml6ZSwgcGF5bWVudEFzc2V0LCBpc1ByaXplQm94KS50b3RhbAogICAgY2FsbHN1YiBsaXN0aW5nQ29zdAogICAgZXh0cmFjdCAwIDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjcwMgogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBieXRlY18zIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6OkZhY3RvcnlDb250cmFjdC5pbml0Qm94ZWRDb250cmFjdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmluaXRCb3hlZENvbnRyYWN0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTE4CiAgICAvLyBpbml0Qm94ZWRDb250cmFjdCh2ZXJzaW9uOiBzdHJpbmcsIHNpemU6IHVpbnQ2NCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjEyMgogICAgLy8gY29uc3QgW2Rhb1dhbGxldElkXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTIyCiAgICAvLyBjb25zdCBbZGFvV2FsbGV0SWRdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyA1IC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjEyNC0xMjYKICAgIC8vIGRhb1dhbGxldElkID09PSAwCiAgICAvLyAgID8gVHhuLnNlbmRlciA9PT0gR2xvYmFsLmNyZWF0b3JBZGRyZXNzCiAgICAvLyAgIDogVHhuLnNlbmRlciA9PT0gQXBwbGljYXRpb24oZGFvV2FsbGV0SWQpLmFkZHJlc3MsCiAgICBibnogaW5pdEJveGVkQ29udHJhY3RfdGVybmFyeV9mYWxzZUAzCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjEyNQogICAgLy8gPyBUeG4uc2VuZGVyID09PSBHbG9iYWwuY3JlYXRvckFkZHJlc3MKICAgIHR4biBTZW5kZXIKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgPT0KCmluaXRCb3hlZENvbnRyYWN0X3Rlcm5hcnlfbWVyZ2VANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjEyMy0xMjgKICAgIC8vIGxvZ2dlZEFzc2VydCgKICAgIC8vICAgZGFvV2FsbGV0SWQgPT09IDAKICAgIC8vICAgICA/IFR4bi5zZW5kZXIgPT09IEdsb2JhbC5jcmVhdG9yQWRkcmVzcwogICAgLy8gICAgIDogVHhuLnNlbmRlciA9PT0gQXBwbGljYXRpb24oZGFvV2FsbGV0SWQpLmFkZHJlc3MsCiAgICAvLyAgIGVyck5vdEFraXRhRGFvCiAgICAvLyApCiAgICBibnogaW5pdEJveGVkQ29udHJhY3RfYWZ0ZXJfYXNzZXJ0QDYKICAgIGJ5dGVjIDYgLy8gIkVSUjplcnJOZGFvIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5kYW8KCmluaXRCb3hlZENvbnRyYWN0X2FmdGVyX2Fzc2VydEA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjIKICAgIC8vIGNoaWxkQ29udHJhY3RWZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogQmFzZUZhY3RvcnlHbG9iYWxTdGF0ZUtleUNoaWxkQ29udHJhY3RWZXJzaW9uIH0pCiAgICBieXRlYyA5IC8vICJjaGlsZF9jb250cmFjdF92ZXJzaW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTI5CiAgICAvLyB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlID0gdmVyc2lvbgogICAgdW5jb3ZlciAyCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjYKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjEzMAogICAgLy8gaWYgKCF0aGlzLmJveGVkQ29udHJhY3QuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBpbml0Qm94ZWRDb250cmFjdF9lbHNlX2JvZHlAOAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjYKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjEzMQogICAgLy8gdGhpcy5ib3hlZENvbnRyYWN0LmNyZWF0ZSh7IHNpemUgfSkKICAgIHN3YXAKICAgIGJveF9jcmVhdGUKICAgIHBvcAoKaW5pdEJveGVkQ29udHJhY3RfYWZ0ZXJfaWZfZWxzZUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTE4CiAgICAvLyBpbml0Qm94ZWRDb250cmFjdCh2ZXJzaW9uOiBzdHJpbmcsIHNpemU6IHVpbnQ2NCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKaW5pdEJveGVkQ29udHJhY3RfZWxzZV9ib2R5QDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo2NgogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTMzCiAgICAvLyB0aGlzLmJveGVkQ29udHJhY3QucmVzaXplKHNpemUpCiAgICBzd2FwCiAgICBib3hfcmVzaXplCiAgICBiIGluaXRCb3hlZENvbnRyYWN0X2FmdGVyX2lmX2Vsc2VAOQoKaW5pdEJveGVkQ29udHJhY3RfdGVybmFyeV9mYWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTI2CiAgICAvLyA6IFR4bi5zZW5kZXIgPT09IEFwcGxpY2F0aW9uKGRhb1dhbGxldElkKS5hZGRyZXNzLAogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGIgaW5pdEJveGVkQ29udHJhY3RfdGVybmFyeV9tZXJnZUA0CgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6OkZhY3RvcnlDb250cmFjdC5sb2FkQm94ZWRDb250cmFjdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmxvYWRCb3hlZENvbnRyYWN0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTM3CiAgICAvLyBsb2FkQm94ZWRDb250cmFjdChvZmZzZXQ6IHVpbnQ2NCwgZGF0YTogYnl0ZXMpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjEzOAogICAgLy8gY29uc3QgZXhwZWN0ZWRQcmV2aW91c0NhbGxzOiB1aW50NjQgPSBvZmZzZXQgLyAyMDMyCiAgICBwdXNoaW50IDIwMzIKICAgIC8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjEzOQogICAgLy8gY29uc3QgdHhuID0gZ3R4bi5UcmFuc2FjdGlvbihUeG4uZ3JvdXBJbmRleCAtIGV4cGVjdGVkUHJldmlvdXNDYWxscyAtIDEpCiAgICB0eG4gR3JvdXBJbmRleAogICAgc3dhcAogICAgLQogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTQxCiAgICAvLyB0eG4udHlwZSA9PT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjE0MS0xNDIKICAgIC8vIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsCiAgICAvLyAmJiB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZAogICAgYnogbG9hZEJveGVkQ29udHJhY3RfYm9vbF9mYWxzZUA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxNDIKICAgIC8vICYmIHR4bi5hcHBJZCA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkCiAgICBkaWcgMgogICAgZ3R4bnMgQXBwbGljYXRpb25JRAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbklECiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTQxLTE0MgogICAgLy8gdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwKICAgIC8vICYmIHR4bi5hcHBJZCA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkCiAgICBieiBsb2FkQm94ZWRDb250cmFjdF9ib29sX2ZhbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjE0MwogICAgLy8gJiYgdHhuLm51bUFwcEFyZ3MgPT09IDMKICAgIGRpZyAyCiAgICBndHhucyBOdW1BcHBBcmdzCiAgICBwdXNoaW50IDMKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxNDEtMTQzCiAgICAvLyB0eG4udHlwZSA9PT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbAogICAgLy8gJiYgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQKICAgIC8vICYmIHR4bi5udW1BcHBBcmdzID09PSAzCiAgICBieiBsb2FkQm94ZWRDb250cmFjdF9ib29sX2ZhbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjE0NAogICAgLy8gJiYgdHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wCiAgICBkaWcgMgogICAgZ3R4bnMgT25Db21wbGV0aW9uCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxNDEtMTQ0CiAgICAvLyB0eG4udHlwZSA9PT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbAogICAgLy8gJiYgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQKICAgIC8vICYmIHR4bi5udW1BcHBBcmdzID09PSAzCiAgICAvLyAmJiB0eG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AKICAgIGJueiBsb2FkQm94ZWRDb250cmFjdF9ib29sX2ZhbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjE0NQogICAgLy8gJiYgdHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKHRoaXMuaW5pdEJveGVkQ29udHJhY3QpCiAgICBkaWcgMgogICAgZ3R4bnNhIEFwcGxpY2F0aW9uQXJncyAwCiAgICBieXRlYyAxNyAvLyBtZXRob2QgImluaXRCb3hlZENvbnRyYWN0KHN0cmluZyx1aW50NjQpdm9pZCIKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxNDEtMTQ1CiAgICAvLyB0eG4udHlwZSA9PT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbAogICAgLy8gJiYgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQKICAgIC8vICYmIHR4bi5udW1BcHBBcmdzID09PSAzCiAgICAvLyAmJiB0eG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AKICAgIC8vICYmIHR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcih0aGlzLmluaXRCb3hlZENvbnRyYWN0KQogICAgYnogbG9hZEJveGVkQ29udHJhY3RfYm9vbF9mYWxzZUA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxNDYKICAgIC8vICYmIHR4bi5zZW5kZXIgPT09IFR4bi5zZW5kZXIKICAgIGRpZyAyCiAgICBndHhucyBTZW5kZXIKICAgIHR4biBTZW5kZXIKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxNDEtMTQ2CiAgICAvLyB0eG4udHlwZSA9PT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbAogICAgLy8gJiYgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQKICAgIC8vICYmIHR4bi5udW1BcHBBcmdzID09PSAzCiAgICAvLyAmJiB0eG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AKICAgIC8vICYmIHR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcih0aGlzLmluaXRCb3hlZENvbnRyYWN0KQogICAgLy8gJiYgdHhuLnNlbmRlciA9PT0gVHhuLnNlbmRlcgogICAgYnogbG9hZEJveGVkQ29udHJhY3RfYm9vbF9mYWxzZUA4CiAgICBpbnRjXzEgLy8gMQoKbG9hZEJveGVkQ29udHJhY3RfYm9vbF9tZXJnZUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTQwLTE0NwogICAgLy8gbG9nZ2VkQXNzZXJ0KCgKICAgIC8vICAgdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwKICAgIC8vICAgJiYgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQKICAgIC8vICAgJiYgdHhuLm51bUFwcEFyZ3MgPT09IDMKICAgIC8vICAgJiYgdHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wCiAgICAvLyAgICYmIHR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcih0aGlzLmluaXRCb3hlZENvbnRyYWN0KQogICAgLy8gICAmJiB0eG4uc2VuZGVyID09PSBUeG4uc2VuZGVyCiAgICAvLyApLCBlcnJJbnZhbGlkQ2FsbE9yZGVyKQogICAgYm56IGxvYWRCb3hlZENvbnRyYWN0X2FmdGVyX2Fzc2VydEAxMQogICAgcHVzaGJ5dGVzICJFUlI6ZXJySWNvciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJY29yCgpsb2FkQm94ZWRDb250cmFjdF9hZnRlcl9hc3NlcnRAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo2NgogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTQ4CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5ib3hlZENvbnRyYWN0LmV4aXN0cywgZXJyQ29udHJhY3ROb3RTZXQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBsb2FkQm94ZWRDb250cmFjdF9hZnRlcl9hc3NlcnRAMTMKICAgIGJ5dGVjIDggLy8gIkVSUjplcnJDbnN0IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckNuc3QKCmxvYWRCb3hlZENvbnRyYWN0X2FmdGVyX2Fzc2VydEAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjY2CiAgICAvLyBib3hlZENvbnRyYWN0ID0gQm94PGJ5dGVzPih7IGtleTogQm94S2V5Qm94ZWRDb250cmFjdCB9KQogICAgYnl0ZWNfMSAvLyAiYmMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxNDkKICAgIC8vIHRoaXMuYm94ZWRDb250cmFjdC5yZXBsYWNlKG9mZnNldCwgZGF0YSkKICAgIGNvdmVyIDIKICAgIGJveF9yZXBsYWNlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxMzcKICAgIC8vIGxvYWRCb3hlZENvbnRyYWN0KG9mZnNldDogdWludDY0LCBkYXRhOiBieXRlcyk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKbG9hZEJveGVkQ29udHJhY3RfYm9vbF9mYWxzZUA4OgogICAgaW50Y18wIC8vIDAKICAgIGIgbG9hZEJveGVkQ29udHJhY3RfYm9vbF9tZXJnZUA5CgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6OkZhY3RvcnlDb250cmFjdC5kZWxldGVCb3hlZENvbnRyYWN0W3JvdXRpbmddKCkgLT4gdm9pZDoKZGVsZXRlQm94ZWRDb250cmFjdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjE1MwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyA1IC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxNTMKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IGRlbGV0ZUJveGVkQ29udHJhY3RfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDYgLy8gIkVSUjplcnJOZGFvIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5kYW8KCmRlbGV0ZUJveGVkQ29udHJhY3RfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo2NgogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTU0CiAgICAvLyB0aGlzLmJveGVkQ29udHJhY3QuZGVsZXRlKCkKICAgIGJveF9kZWwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTUyCiAgICAvLyBkZWxldGVCb3hlZENvbnRyYWN0KCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpBa2l0YUZlZUdlbmVyYXRvckNvbnRyYWN0V2l0aE9wdEluLm9wdEluW3JvdXRpbmddKCkgLT4gdm9pZDoKb3B0SW46CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxODcKICAgIC8vIG9wdEluKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYXNzZXQ6IEFzc2V0KTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cG4gMgogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTg5CiAgICAvLyBjb25zdCBlc2Nyb3cgPSBjbG9uZSh0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjXzIgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE4OQogICAgLy8gY29uc3QgZXNjcm93ID0gY2xvbmUodGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBzd2FwCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGNvdmVyIDUKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE5MAogICAgLy8gY29uc3QgY291bnQgPSBzcGxpdE9wdEluQ291bnQodGhpcy5ha2l0YURBTy52YWx1ZSwgZXNjcm93LmFwcC5hZGRyZXNzLCBhc3NldCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTAKICAgIC8vIGNvbnN0IGNvdW50ID0gc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIGVzY3Jvdy5hcHAuYWRkcmVzcywgYXNzZXQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgc3dhcAogICAgaW50Y18zIC8vIDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgc3BsaXRPcHRJbkNvdW50CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTIKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJySW52YWxpZFBheW1lbnRSZWNlaXZlcikKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBvcHRJbl9hZnRlcl9hc3NlcnRAMwogICAgcHVzaGJ5dGVzICJFUlI6ZXJySXBtciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcG1yCgpvcHRJbl9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE5MwogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiAoMSArIGNvdW50KSwgZXJySW52YWxpZFBheW1lbnRBbW91bnQpCiAgICBzd2FwCiAgICBndHhucyBBbW91bnQKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgaW50Y18xIC8vIDEKICAgIGRpZyAzCiAgICArCiAgICAqCiAgICA9PQogICAgYm56IG9wdEluX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJJcG1hIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwbWEKCm9wdEluX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTk1LTIwMQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IDAsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE5NwogICAgLy8gYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgZGlnIDMKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTgKICAgIC8vIGFzc2V0QW1vdW50OiAwLAogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTk1LTIwMAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IDAsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldAogICAgLy8gICB9KQogICAgcHVzaGludCA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE5NS0yMDEKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjA4CiAgICAvLyBpZiAoY291bnQgPiAwICYmIGVzY3Jvdy5uYW1lICE9PSAnJykgewogICAgYnogb3B0SW5fYWZ0ZXJfaWZfZWxzZUA5CiAgICBkdXBuIDIKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgZGlnIDEKICAgIGxlbgogICAgc3Vic3RyaW5nMwogICAgZXh0cmFjdCAyIDAKICAgIHB1c2hieXRlcyAiIgogICAgIT0KICAgIGJ6IG9wdEluX2FmdGVyX2lmX2Vsc2VAOQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjA5CiAgICAvLyB0aGlzLm9wdEFraXRhRXNjcm93SW5BbmRTZW5kKGFzc2V0LCAwKQogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBjYWxsc3ViIG9wdEFraXRhRXNjcm93SW5BbmRTZW5kCiAgICBwb3AKCm9wdEluX2FmdGVyX2lmX2Vsc2VAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE4NwogICAgLy8gb3B0SW4ocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBhc3NldDogQXNzZXQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6QWtpdGFGZWVHZW5lcmF0b3JDb250cmFjdFdpdGhPcHRJbi5vcHRJbkNvc3Rbcm91dGluZ10oKSAtPiB2b2lkOgpvcHRJbkNvc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMTMKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjE1CiAgICAvLyBjb25zdCBjb3VudCA9IHNwbGl0T3B0SW5Db3VudCh0aGlzLmFraXRhREFPLnZhbHVlLCB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLCBhc3NldCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMTUKICAgIC8vIGNvbnN0IGNvdW50ID0gc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsIGFzc2V0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlY18yIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMTUKICAgIC8vIGNvbnN0IGNvdW50ID0gc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsIGFzc2V0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMyAvLyAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgdW5jb3ZlciAyCiAgICBjYWxsc3ViIHNwbGl0T3B0SW5Db3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjE2CiAgICAvLyByZXR1cm4gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogKDEgKyBjb3VudCkKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgaW50Y18xIC8vIDEKICAgIHVuY292ZXIgMgogICAgKwogICAgKgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjEzCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGl0b2IKICAgIGJ5dGVjXzMgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6QWtpdGFCYXNlRmVlR2VuZXJhdG9yQ29udHJhY3RXaXRob3V0QWtpdGFPcHRJbi51cGRhdGVBa2l0YURBT0VzY3Jvd1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZUFraXRhREFPRXNjcm93OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTAKICAgIC8vIHVwZGF0ZUFraXRhREFPRXNjcm93KGNvbmZpZzogRXNjcm93Q29uZmlnKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXBuIDIKICAgIGxlbgogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBwdXNoaW50IDEwCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDAgb2YgKChsZW4rdXRmOFtdKSx1aW50NjQpCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGRpZyAyCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAxMgogICAgKwogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkVzY3Jvd0NvbmZpZwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTEKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWMgNSAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTEKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IHVwZGF0ZUFraXRhREFPRXNjcm93X2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA2IC8vICJFUlI6ZXJyTmRhbyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOZGFvCgp1cGRhdGVBa2l0YURBT0VzY3Jvd19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjXzIgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUyCiAgICAvLyB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlID0gY2xvbmUoY29uZmlnKQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUwCiAgICAvLyB1cGRhdGVBa2l0YURBT0VzY3Jvdyhjb25maWc6IEVzY3Jvd0NvbmZpZyk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czo6VXBncmFkZWFibGVBa2l0YUJhc2VDb250cmFjdC51cGRhdGVbcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzUKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozNwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyA1IC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzcKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IHVwZGF0ZV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNiAvLyAiRVJSOmVyck5kYW8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmRhbwoKdXBkYXRlX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM4CiAgICAvLyBjb25zdCBbcGx1Z2luc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1BsdWdpbkFwcExpc3QpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozOAogICAgLy8gY29uc3QgW3BsdWdpbnNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXModGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNQbHVnaW5BcHBMaXN0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyAyNiAvLyAicGFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM5CiAgICAvLyBjb25zdCB1cGRhdGVQbHVnaW4gPSBkZWNvZGVBcmM0PFBsdWdpbkFwcExpc3Q+KHBsdWdpbnMpLnVwZGF0ZQogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czo0MAogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbklkID09PSB1cGRhdGVQbHVnaW4sIGVyckludmFsaWRVcGdyYWRlKQogICAgZ2xvYmFsIENhbGxlckFwcGxpY2F0aW9uSUQKICAgID09CiAgICBibnogdXBkYXRlX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJJdXBnIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckl1cGcKCnVwZGF0ZV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNAogICAgLy8gdmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5VmVyc2lvbiB9KQogICAgYnl0ZWMgMjUgLy8gInZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6NDEKICAgIC8vIHRoaXMudmVyc2lvbi52YWx1ZSA9IG5ld1ZlcnNpb24KICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzUKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czo6QWtpdGFCYXNlQ29udHJhY3QudXBkYXRlQWtpdGFEQU9bcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGVBa2l0YURBTzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNQogICAgLy8gdXBkYXRlQWtpdGFEQU8oYWtpdGFEQU86IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MjYKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWMgNSAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjI2CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIGVyck5vdEFraXRhRGFvKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGJueiB1cGRhdGVBa2l0YURBT19hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNiAvLyAiRVJSOmVyck5kYW8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmRhbwoKdXBkYXRlQWtpdGFEQU9fYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MjcKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUgPSBha2l0YURBTwogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNQogICAgLy8gdXBkYXRlQWtpdGFEQU8oYWtpdGFEQU86IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6Ok1hcmtldHBsYWNlLmxpc3RpbmdDb3N0KHByaXplOiB1aW50NjQsIHBheW1lbnRBc3NldDogdWludDY0LCBpc1ByaXplQm94OiB1aW50NjQpIC0+IGJ5dGVzOgpsaXN0aW5nQ29zdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjM4CiAgICAvLyBwcml2YXRlIGxpc3RpbmdDb3N0KHByaXplOiB1aW50NjQsIHBheW1lbnRBc3NldDogdWludDY0LCBpc1ByaXplQm94OiBib29sZWFuKTogTGlzdGluZ0Nvc3RJbmZvIHsKICAgIHByb3RvIDMgMQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDIKICAgIC8vIGxldCBvcHRpbjogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQ0CiAgICAvLyBpZiAoaXNQcml6ZUJveCkgewogICAgZnJhbWVfZGlnIC0xCiAgICBieiBsaXN0aW5nQ29zdF9lbHNlX2JvZHlANQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDgKICAgIC8vIGlmIChpc0FsZ29QYXltZW50KSB7CiAgICBmcmFtZV9kaWcgLTIKICAgIGJueiBsaXN0aW5nQ29zdF9lbHNlX2JvZHlAMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MzgKICAgIC8vIHJldHVybiAoTWluRGlzYnVyc2VtZW50c01CUiArIFVzZXJBbGxvY2F0aW9uTUJSKSAqIGNvdW50CiAgICBpbnRjIDQgLy8gNzk4MDAKCmxpc3RpbmdDb3N0X2FmdGVyX2lmX2Vsc2VAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjY4LTcwCiAgICAvLyBjb25zdCBlc2Nyb3dPcHRJbjogdWludDY0ID0gaXNBbGdvUGF5bWVudAogICAgLy8gICA/IDAKICAgIC8vICAgOiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiBzcGxpdE9wdEluQ291bnQodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywgQXNzZXQocGF5bWVudEFzc2V0KSkKICAgIGZyYW1lX2RpZyAtMgogICAgYm56IGxpc3RpbmdDb3N0X3Rlcm5hcnlfZmFsc2VAMTEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjY5CiAgICAvLyA/IDAKICAgIGludGNfMCAvLyAwCgpsaXN0aW5nQ29zdF90ZXJuYXJ5X21lcmdlQDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NzMKICAgIC8vIHByb2dyYW1QYWdlc01icih0aGlzLmNoaWxkRXh0cmFQYWdlc0F0TGVhc3QobGlzdGluZy5jbGVhclN0YXRlUHJvZ3JhbS5sZW5ndGgsIGxpc3RpbmcuZXh0cmFQcm9ncmFtUGFnZXMpKSArCiAgICBwdXNoaW50IDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjM5CiAgICAvLyBjb25zdCBsaXN0aW5nID0gY29tcGlsZUFyYzQoTGlzdGluZykKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo3MwogICAgLy8gcHJvZ3JhbVBhZ2VzTWJyKHRoaXMuY2hpbGRFeHRyYVBhZ2VzQXRMZWFzdChsaXN0aW5nLmNsZWFyU3RhdGVQcm9ncmFtLmxlbmd0aCwgbGlzdGluZy5leHRyYVByb2dyYW1QYWdlcykpICsKICAgIGNhbGxzdWIgY2hpbGRFeHRyYVBhZ2VzQXRMZWFzdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3Byb2dyYW1zLnRzOjQ5CiAgICAvLyByZXR1cm4gTUlOX1BST0dSQU1fUEFHRVMgKiAoMSArIGV4dHJhUGFnZXMpCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgcHVzaGludCAxMDAwMDAKICAgICoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjczLTc1CiAgICAvLyBwcm9ncmFtUGFnZXNNYnIodGhpcy5jaGlsZEV4dHJhUGFnZXNBdExlYXN0KGxpc3RpbmcuY2xlYXJTdGF0ZVByb2dyYW0ubGVuZ3RoLCBsaXN0aW5nLmV4dHJhUHJvZ3JhbVBhZ2VzKSkgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfVUlOVF9DT1NUICogbGlzdGluZy5nbG9iYWxVaW50cykgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfQllURVNfQ09TVCAqIGxpc3RpbmcuZ2xvYmFsQnl0ZXMpCiAgICBwdXNoaW50IDcyMDUwMAogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NzcKICAgIC8vIGNvbnN0IHRvdGFsOiB1aW50NjQgPSBjcmVhdGVNYnIgKyBHbG9iYWwubWluQmFsYW5jZSArIG9wdGluICsgZGlzYnVyc2VtZW50ICsgZXNjcm93T3B0SW4KICAgIGR1cAogICAgZ2xvYmFsIE1pbkJhbGFuY2UKICAgICsKICAgIGZyYW1lX2RpZyAwCiAgICBkdXAKICAgIGNvdmVyIDIKICAgICsKICAgIHVuY292ZXIgNAogICAgZHVwCiAgICBjb3ZlciAyCiAgICArCiAgICB1bmNvdmVyIDQKICAgIGR1cAogICAgY292ZXIgMgogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NzkKICAgIC8vIHJldHVybiB7IHRvdGFsLCBlc2Nyb3dPcHRJbiwgZGlzYnVyc2VtZW50LCBvcHRpbiwgY3JlYXRlTWJyIH0KICAgIGl0b2IKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgc3dhcAogICAgcmV0c3ViCgpsaXN0aW5nQ29zdF90ZXJuYXJ5X2ZhbHNlQDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NzAKICAgIC8vIDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsIEFzc2V0KHBheW1lbnRBc3NldCkpCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo3MAogICAgLy8gOiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiBzcGxpdE9wdEluQ291bnQodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywgQXNzZXQocGF5bWVudEFzc2V0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWNfMiAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NzAKICAgIC8vIDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsIEFzc2V0KHBheW1lbnRBc3NldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18zIC8vIDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBmcmFtZV9kaWcgLTIKICAgIGNhbGxzdWIgc3BsaXRPcHRJbkNvdW50CiAgICAqCiAgICBiIGxpc3RpbmdDb3N0X3Rlcm5hcnlfbWVyZ2VAMTIKCmxpc3RpbmdDb3N0X2Vsc2VfYm9keUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NTEKICAgIC8vIG9wdGluID0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NTIKICAgIC8vIGRpc2J1cnNlbWVudCA9IGRpc2J1cnNlbWVudENvc3QoNCkgKyByZXdhcmRzT3B0SW5Db3N0KHRoaXMuYWtpdGFEQU8udmFsdWUsIHBheW1lbnRBc3NldCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo1MgogICAgLy8gZGlzYnVyc2VtZW50ID0gZGlzYnVyc2VtZW50Q29zdCg0KSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgcGF5bWVudEFzc2V0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGZyYW1lX2RpZyAtMgogICAgY2FsbHN1YiByZXdhcmRzT3B0SW5Db3N0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYzOAogICAgLy8gcmV0dXJuIChNaW5EaXNidXJzZW1lbnRzTUJSICsgVXNlckFsbG9jYXRpb25NQlIpICogY291bnQKICAgIHB1c2hpbnQgMzE5MjAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo1MgogICAgLy8gZGlzYnVyc2VtZW50ID0gZGlzYnVyc2VtZW50Q29zdCg0KSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgcGF5bWVudEFzc2V0KQogICAgKwogICAgYiBsaXN0aW5nQ29zdF9hZnRlcl9pZl9lbHNlQDkKCmxpc3RpbmdDb3N0X2Vsc2VfYm9keUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NTcKICAgIC8vIGRpc2J1cnNlbWVudCA9IGRpc2J1cnNlbWVudENvc3QoMSkgKyByZXdhcmRzT3B0SW5Db3N0KHRoaXMuYWtpdGFEQU8udmFsdWUsIHByaXplKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjU3CiAgICAvLyBkaXNidXJzZW1lbnQgPSBkaXNidXJzZW1lbnRDb3N0KDEpICsgcmV3YXJkc09wdEluQ29zdCh0aGlzLmFraXRhREFPLnZhbHVlLCBwcml6ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBmcmFtZV9kaWcgLTMKICAgIGNhbGxzdWIgcmV3YXJkc09wdEluQ29zdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MzgKICAgIC8vIHJldHVybiAoTWluRGlzYnVyc2VtZW50c01CUiArIFVzZXJBbGxvY2F0aW9uTUJSKSAqIGNvdW50CiAgICBpbnRjIDQgLy8gNzk4MDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjU3CiAgICAvLyBkaXNidXJzZW1lbnQgPSBkaXNidXJzZW1lbnRDb3N0KDEpICsgcmV3YXJkc09wdEluQ29zdCh0aGlzLmFraXRhREFPLnZhbHVlLCBwcml6ZSkKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjU4CiAgICAvLyBpZiAoaXNBbGdvUGF5bWVudCkgewogICAgZnJhbWVfZGlnIC0yCiAgICBibnogbGlzdGluZ0Nvc3RfZWxzZV9ib2R5QDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjU5CiAgICAvLyBvcHRpbiA9IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjM4CiAgICAvLyByZXR1cm4gKE1pbkRpc2J1cnNlbWVudHNNQlIgKyBVc2VyQWxsb2NhdGlvbk1CUikgKiBjb3VudAogICAgaW50YyA0IC8vIDc5ODAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo2MAogICAgLy8gZGlzYnVyc2VtZW50ICs9IGRpc2J1cnNlbWVudENvc3QoMSkKICAgICsKICAgIGIgbGlzdGluZ0Nvc3RfYWZ0ZXJfaWZfZWxzZUA5CgpsaXN0aW5nQ29zdF9lbHNlX2JvZHlANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjYyCiAgICAvLyBvcHRpbiA9IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSAqIDIKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgaW50Y18zIC8vIDIKICAgICoKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NjMKICAgIC8vIGRpc2J1cnNlbWVudCArPSBkaXNidXJzZW1lbnRDb3N0KDUpICsgcmV3YXJkc09wdEluQ29zdCh0aGlzLmFraXRhREFPLnZhbHVlLCBwYXltZW50QXNzZXQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NjMKICAgIC8vIGRpc2J1cnNlbWVudCArPSBkaXNidXJzZW1lbnRDb3N0KDUpICsgcmV3YXJkc09wdEluQ29zdCh0aGlzLmFraXRhREFPLnZhbHVlLCBwYXltZW50QXNzZXQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZnJhbWVfZGlnIC0yCiAgICBjYWxsc3ViIHJld2FyZHNPcHRJbkNvc3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjM4CiAgICAvLyByZXR1cm4gKE1pbkRpc2J1cnNlbWVudHNNQlIgKyBVc2VyQWxsb2NhdGlvbk1CUikgKiBjb3VudAogICAgcHVzaGludCAzOTkwMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjYzCiAgICAvLyBkaXNidXJzZW1lbnQgKz0gZGlzYnVyc2VtZW50Q29zdCg1KSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgcGF5bWVudEFzc2V0KQogICAgKwogICAgKwogICAgYiBsaXN0aW5nQ29zdF9hZnRlcl9pZl9lbHNlQDkKCgovLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo6TWFya2V0cGxhY2UucmVmdW5kTGlzdGluZ0Z1bmRlcihsZWdhY3k6IHVpbnQ2NCwgcmVjZWl2ZXI6IGJ5dGVzLCBhbW91bnQ6IHVpbnQ2NCwgZmxvYXQ6IHVpbnQ2NCwgYmFsYW5jZUJlZm9yZTogdWludDY0LCBtaW5CZWZvcmU6IHVpbnQ2NCwgZm9yd2FyZGVkOiB1aW50NjQpIC0+IHZvaWQ6CnJlZnVuZExpc3RpbmdGdW5kZXI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo5NC0xMDIKICAgIC8vIHByaXZhdGUgcmVmdW5kTGlzdGluZ0Z1bmRlcigKICAgIC8vICAgbGVnYWN5OiBib29sZWFuLAogICAgLy8gICByZWNlaXZlcjogQWNjb3VudCwKICAgIC8vICAgYW1vdW50OiB1aW50NjQsCiAgICAvLyAgIGZsb2F0OiB1aW50NjQsCiAgICAvLyAgIGJhbGFuY2VCZWZvcmU6IHVpbnQ2NCwKICAgIC8vICAgbWluQmVmb3JlOiB1aW50NjQsCiAgICAvLyAgIGZvcndhcmRlZDogdWludDY0CiAgICAvLyApOiB2b2lkIHsKICAgIHByb3RvIDcgMAogICAgcHVzaGJ5dGVzICIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxMDMKICAgIC8vIGlmIChsZWdhY3kpIHsKICAgIGZyYW1lX2RpZyAtNwogICAgYnogcmVmdW5kTGlzdGluZ0Z1bmRlcl9lbHNlX2JvZHlAMwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTA0CiAgICAvLyBpdHhuLnBheW1lbnQoeyByZWNlaXZlciwgYW1vdW50IH0pLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICBmcmFtZV9kaWcgLTUKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBmcmFtZV9kaWcgLTYKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CgpyZWZ1bmRMaXN0aW5nRnVuZGVyX2FmdGVyX2lmX2Vsc2VAMTA6CiAgICByZXRzdWIKCnJlZnVuZExpc3RpbmdGdW5kZXJfZWxzZV9ib2R5QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxMDYKICAgIC8vIGNvbnN0IGdyb3NzID0gcmVsZWFzZWRSZWZ1bmQoYW1vdW50ICsgZmxvYXQsIGJhbGFuY2VCZWZvcmUsIG1pbkJlZm9yZSwgZm9yd2FyZGVkKQogICAgZnJhbWVfZGlnIC01CiAgICBmcmFtZV9kaWcgLTQKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjQ4CiAgICAvLyBjb25zdCBzZWxmID0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjQ5CiAgICAvLyBjb25zdCBncm9zczogdWludDY0ID0gc2VsZi5iYWxhbmNlICsgZm9yd2FyZGVkCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdEJhbGFuY2UKICAgIGFzc2VydCAvLyBhY2NvdW50IGZ1bmRlZAogICAgZnJhbWVfZGlnIC0xCiAgICArCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjUwCiAgICAvLyBjb25zdCByZWNlaXZlZDogdWludDY0ID0gZ3Jvc3MgPiBiYWxhbmNlQmVmb3JlID8gZ3Jvc3MgLSBiYWxhbmNlQmVmb3JlIDogMAogICAgZnJhbWVfZGlnIC0zCiAgICA+CiAgICBieiByZWZ1bmRMaXN0aW5nRnVuZGVyX3Rlcm5hcnlfZmFsc2VAMTMKICAgIGZyYW1lX2RpZyAtMwogICAgLQoKcmVmdW5kTGlzdGluZ0Z1bmRlcl90ZXJuYXJ5X21lcmdlQDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTEKICAgIC8vIGNvbnN0IG1pbkFmdGVyOiB1aW50NjQgPSBzZWxmLm1pbkJhbGFuY2UKICAgIHN3YXAKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0TWluQmFsYW5jZQogICAgc3dhcAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIGFzc2VydCAvLyBhY2NvdW50IGZ1bmRlZAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTIKICAgIC8vIGNvbnN0IHJlbGVhc2VkOiB1aW50NjQgPSBtaW5CZWZvcmUgPiBtaW5BZnRlciA/IG1pbkJlZm9yZSAtIG1pbkFmdGVyIDogMAogICAgZnJhbWVfZGlnIC0yCiAgICA8CiAgICBieiByZWZ1bmRMaXN0aW5nRnVuZGVyX3Rlcm5hcnlfZmFsc2VAMTYKICAgIGZyYW1lX2RpZyAtMgogICAgc3dhcAogICAgLQoKcmVmdW5kTGlzdGluZ0Z1bmRlcl90ZXJuYXJ5X21lcmdlQDE3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTMKICAgIC8vIGNvbnN0IHJlZnVuZDogdWludDY0ID0gcmVjZWl2ZWQgKyByZWxlYXNlZAogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTQKICAgIC8vIHJldHVybiByZWZ1bmQgPiByZWNvcmRlZCA/IHJlY29yZGVkIDogcmVmdW5kCiAgICBkdXAKICAgIGRpZyAyCiAgICA+CiAgICBzd2FwCiAgICBjb3ZlciAyCiAgICBzZWxlY3QKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTA3CiAgICAvLyBjb25zdCByZWZ1bmQ6IHVpbnQ2NCA9IGdyb3NzID4gZmxvYXQgPyBncm9zcyAtIGZsb2F0IDogMAogICAgZnJhbWVfZGlnIC00CiAgICA+CiAgICBieiByZWZ1bmRMaXN0aW5nRnVuZGVyX3Rlcm5hcnlfZmFsc2VANQogICAgZnJhbWVfZGlnIC00CiAgICAtCiAgICBmcmFtZV9idXJ5IDAKCnJlZnVuZExpc3RpbmdGdW5kZXJfdGVybmFyeV9tZXJnZUA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTA4CiAgICAvLyBpZiAocmVmdW5kID4gMCkgewogICAgZnJhbWVfZGlnIDAKICAgIGJ6IHJlZnVuZExpc3RpbmdGdW5kZXJfYWZ0ZXJfaWZfZWxzZUAxMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTA5CiAgICAvLyBpdHhuLnBheW1lbnQoeyByZWNlaXZlciwgYW1vdW50OiByZWZ1bmQgfSkuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIGZyYW1lX2RpZyAwCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgZnJhbWVfZGlnIC02CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgcmV0c3ViCgpyZWZ1bmRMaXN0aW5nRnVuZGVyX3Rlcm5hcnlfZmFsc2VANToKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTA3CiAgICAvLyBjb25zdCByZWZ1bmQ6IHVpbnQ2NCA9IGdyb3NzID4gZmxvYXQgPyBncm9zcyAtIGZsb2F0IDogMAogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2J1cnkgMAogICAgYiByZWZ1bmRMaXN0aW5nRnVuZGVyX3Rlcm5hcnlfbWVyZ2VANgoKcmVmdW5kTGlzdGluZ0Z1bmRlcl90ZXJuYXJ5X2ZhbHNlQDE2OgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1MgogICAgLy8gY29uc3QgcmVsZWFzZWQ6IHVpbnQ2NCA9IG1pbkJlZm9yZSA+IG1pbkFmdGVyID8gbWluQmVmb3JlIC0gbWluQWZ0ZXIgOiAwCiAgICBpbnRjXzAgLy8gMAogICAgYiByZWZ1bmRMaXN0aW5nRnVuZGVyX3Rlcm5hcnlfbWVyZ2VAMTcKCnJlZnVuZExpc3RpbmdGdW5kZXJfdGVybmFyeV9mYWxzZUAxMzoKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTAKICAgIC8vIGNvbnN0IHJlY2VpdmVkOiB1aW50NjQgPSBncm9zcyA+IGJhbGFuY2VCZWZvcmUgPyBncm9zcyAtIGJhbGFuY2VCZWZvcmUgOiAwCiAgICBpbnRjXzAgLy8gMAogICAgYiByZWZ1bmRMaXN0aW5nRnVuZGVyX3Rlcm5hcnlfbWVyZ2VAMTQKCgovLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo6TWFya2V0cGxhY2UuYXNzZXJ0SXNMaXN0aW5nKGFwcElkOiB1aW50NjQpIC0+IHZvaWQ6CmFzc2VydElzTGlzdGluZzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjExOQogICAgLy8gcHJpdmF0ZSBhc3NlcnRJc0xpc3RpbmcoYXBwSWQ6IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICBwcm90byAxIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjEyMAogICAgLy8gbG9nZ2VkQXNzZXJ0KGFwcElkLmNyZWF0b3IgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBlcnJOb3RBTGlzdGluZykKICAgIGZyYW1lX2RpZyAtMQogICAgYXBwX3BhcmFtc19nZXQgQXBwQ3JlYXRvcgogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogYXNzZXJ0SXNMaXN0aW5nX2FmdGVyX2Fzc2VydEAyCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJOYWxzIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5hbHMKCmFzc2VydElzTGlzdGluZ19hZnRlcl9hc3NlcnRAMjoKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjpNYXJrZXRwbGFjZS5hc3NlcnRVbmdhdGVkKGFwcElkOiB1aW50NjQpIC0+IHZvaWQ6CmFzc2VydFVuZ2F0ZWQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxMjMKICAgIC8vIHByaXZhdGUgYXNzZXJ0VW5nYXRlZChhcHBJZDogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIHByb3RvIDEgMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTI0CiAgICAvLyBjb25zdCBnYXRlSUQgPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQoYXBwSWQsIEJ5dGVzKExpc3RpbmdHbG9iYWxTdGF0ZUtleUdhdGVJRCkpWzBdCiAgICBmcmFtZV9kaWcgLTEKICAgIGJ5dGVjIDE0IC8vICJnYXRlX2lkIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTI1CiAgICAvLyBsb2dnZWRBc3NlcnQoZ2F0ZUlEID09PSAwLCBlcnJIYXNHYXRlKQogICAgYnogYXNzZXJ0VW5nYXRlZF9hZnRlcl9hc3NlcnRAMgogICAgcHVzaGJ5dGVzICJFUlI6ZXJySGd0ZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJIZ3RlCgphc3NlcnRVbmdhdGVkX2FmdGVyX2Fzc2VydEAyOgogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6Ok1hcmtldHBsYWNlLmFzc2VydEdhdGVQYXNzZWQoZ2F0ZVR4bjogdWludDY0LCBhcHBJZDogdWludDY0LCB3YWxsZXQ6IHVpbnQ2NCkgLT4gdm9pZDoKYXNzZXJ0R2F0ZVBhc3NlZDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjEzMgogICAgLy8gcHJpdmF0ZSBhc3NlcnRHYXRlUGFzc2VkKGdhdGVUeG46IGd0eG4uQXBwbGljYXRpb25DYWxsVHhuLCBhcHBJZDogQXBwbGljYXRpb24sIHdhbGxldDogdWludDY0KTogdm9pZCB7CiAgICBwcm90byAzIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjEzMwogICAgLy8gY29uc3QgcCA9IHByaW5jaXBhbE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIHdhbGxldCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxMzMKICAgIC8vIGNvbnN0IHAgPSBwcmluY2lwYWxPZih0aGlzLmFraXRhREFPLnZhbHVlLCB3YWxsZXQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZnJhbWVfZGlnIC0xCiAgICBjYWxsc3ViIHByaW5jaXBhbE9mCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxMzQKICAgIC8vIGNvbnN0IGdhdGVJRCA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NChhcHBJZCwgQnl0ZXMoTGlzdGluZ0dsb2JhbFN0YXRlS2V5R2F0ZUlEKSlbMF0KICAgIGZyYW1lX2RpZyAtMgogICAgYnl0ZWMgMTQgLy8gImdhdGVfaWQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxMzUKICAgIC8vIGxvZ2dlZEFzc2VydChnYXRlQ2hlY2tDdHgoZ2F0ZVR4biwgdGhpcy5ha2l0YURBTy52YWx1ZSwgZ2F0ZUN0eChwKSwgZ2F0ZUlEKSwgZXJyRmFpbGVkR2F0ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxMzUKICAgIC8vIGxvZ2dlZEFzc2VydChnYXRlQ2hlY2tDdHgoZ2F0ZVR4biwgdGhpcy5ha2l0YURBTy52YWx1ZSwgZ2F0ZUN0eChwKSwgZ2F0ZUlEKSwgZXJyRmFpbGVkR2F0ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjMwNAogICAgLy8gcmV0dXJuIHsgcHJpbmNpcGFsOiBwLnByaW5jaXBhbCwgd2FsbGV0OiBwLndhbGxldCwgc3BlbmRlcjogcC5zcGVuZGVyIH0KICAgIGRpZyAxCiAgICBleHRyYWN0IDggMzIKICAgIGRpZyAyCiAgICBleHRyYWN0IDAgOAogICAgdW5jb3ZlciAzCiAgICBleHRyYWN0IDcyIDMyCiAgICBjb3ZlciAyCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo4NzQKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIGZyYW1lX2RpZyAtMwogICAgZ3R4bnMgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMTIKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0KSkKICAgIHN3YXAKICAgIGJ5dGVjIDQgLy8gImFhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODc0CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICBwdXNoaW50IDQwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODc0LTg3NQogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgYnogYXNzZXJ0R2F0ZVBhc3NlZF9ib29sX2ZhbHNlQDEyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjg3NQogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgZnJhbWVfZGlnIC0zCiAgICBndHhucyBPbkNvbXBsZXRpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODc0LTg3NQogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgYm56IGFzc2VydEdhdGVQYXNzZWRfYm9vbF9mYWxzZUAxMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo4NzYKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgZnJhbWVfZGlnIC0zCiAgICBndHhucyBOdW1BcHBBcmdzCiAgICBwdXNoaW50IDQKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjg3NC04NzYKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgYnogYXNzZXJ0R2F0ZVBhc3NlZF9ib29sX2ZhbHNlQDEyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjg3NwogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3RvcihHYXRlTXVzdENoZWNrRm9yQWJpTWV0aG9kKSAmJgogICAgZnJhbWVfZGlnIC0zCiAgICBndHhuc2EgQXBwbGljYXRpb25BcmdzIDAKICAgIHB1c2hieXRlcyAweDliMTQ3ZDJjIC8vIG1ldGhvZCAibXVzdENoZWNrRm9yKChhZGRyZXNzLHVpbnQ2NCxhZGRyZXNzKSx1aW50NjQsYnl0ZVtdW10pdm9pZCIKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjg3NC04NzcKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3RvcihHYXRlTXVzdENoZWNrRm9yQWJpTWV0aG9kKSAmJgogICAgYnogYXNzZXJ0R2F0ZVBhc3NlZF9ib29sX2ZhbHNlQDEyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjg3OAogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBlbmNvZGVBcmM0KGN0eCkgJiYKICAgIGZyYW1lX2RpZyAtMwogICAgZ3R4bnNhIEFwcGxpY2F0aW9uQXJncyAxCiAgICBmcmFtZV9kaWcgMQogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODc0LTg3OAogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKEdhdGVNdXN0Q2hlY2tGb3JBYmlNZXRob2QpICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMSkgPT09IGVuY29kZUFyYzQoY3R4KSAmJgogICAgYnogYXNzZXJ0R2F0ZVBhc3NlZF9ib29sX2ZhbHNlQDEyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjg3OQogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDIpID09PSBpdG9iKGlkKQogICAgZnJhbWVfZGlnIC0zCiAgICBndHhuc2EgQXBwbGljYXRpb25BcmdzIDIKICAgIGZyYW1lX2RpZyAwCiAgICBpdG9iCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo4NzQtODc5CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3IoR2F0ZU11c3RDaGVja0ZvckFiaU1ldGhvZCkgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygxKSA9PT0gZW5jb2RlQXJjNChjdHgpICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMikgPT09IGl0b2IoaWQpCiAgICBieiBhc3NlcnRHYXRlUGFzc2VkX2Jvb2xfZmFsc2VAMTIKICAgIGludGNfMSAvLyAxCgphc3NlcnRHYXRlUGFzc2VkX2Jvb2xfbWVyZ2VAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxMzUKICAgIC8vIGxvZ2dlZEFzc2VydChnYXRlQ2hlY2tDdHgoZ2F0ZVR4biwgdGhpcy5ha2l0YURBTy52YWx1ZSwgZ2F0ZUN0eChwKSwgZ2F0ZUlEKSwgZXJyRmFpbGVkR2F0ZSkKICAgIGJueiBhc3NlcnRHYXRlUGFzc2VkX2FmdGVyX2Fzc2VydEAyCiAgICBieXRlYyAyNyAvLyAiRVJSOmVyckZndGUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyRmd0ZQoKYXNzZXJ0R2F0ZVBhc3NlZF9hZnRlcl9hc3NlcnRAMjoKICAgIHJldHN1YgoKYXNzZXJ0R2F0ZVBhc3NlZF9ib29sX2ZhbHNlQDEyOgogICAgaW50Y18wIC8vIDAKICAgIGIgYXNzZXJ0R2F0ZVBhc3NlZF9ib29sX21lcmdlQDEzCgoKLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6Ok1hcmtldHBsYWNlLmFzc2VydExlZ2FjeUdhdGVQYXNzZWQoZ2F0ZVR4bjogdWludDY0LCBhcHBJZDogdWludDY0KSAtPiB2b2lkOgphc3NlcnRMZWdhY3lHYXRlUGFzc2VkOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTQyCiAgICAvLyBwcml2YXRlIGFzc2VydExlZ2FjeUdhdGVQYXNzZWQoZ2F0ZVR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sIGFwcElkOiBBcHBsaWNhdGlvbik6IHZvaWQgewogICAgcHJvdG8gMiAwCiAgICBpbnRjXzAgLy8gMAogICAgcHVzaGJ5dGVzICIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxNDMKICAgIC8vIGNvbnN0IHdhbGxldCA9IGxlZ2FjeVdhbGxldE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIFR4bi5zZW5kZXIpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTQzCiAgICAvLyBjb25zdCB3YWxsZXQgPSBsZWdhY3lXYWxsZXRPZih0aGlzLmFraXRhREFPLnZhbHVlLCBUeG4uc2VuZGVyKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHR4biBTZW5kZXIKICAgIGNhbGxzdWIgbGVnYWN5V2FsbGV0T2YKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMzEKICAgIC8vIHJldHVybiBsZWdhY3lPcmlnaW5Pcih3YWxsZXRJRCwgVHhuLnNlbmRlcikKICAgIHR4biBTZW5kZXIKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjIwCiAgICAvLyBpZiAod2FsbGV0SUQuaWQgPT09IDApIHsKICAgIGJueiBhc3NlcnRMZWdhY3lHYXRlUGFzc2VkX2FmdGVyX2lmX2Vsc2VANQogICAgZnJhbWVfYnVyeSAwCgphc3NlcnRMZWdhY3lHYXRlUGFzc2VkX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6bGVnYWN5T3JpZ2luT3JAMTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxNDUKICAgIC8vIGNvbnN0IGdhdGVJRCA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NChhcHBJZCwgQnl0ZXMoTGlzdGluZ0dsb2JhbFN0YXRlS2V5R2F0ZUlEKSlbMF0KICAgIGZyYW1lX2RpZyAtMQogICAgYnl0ZWMgMTQgLy8gImdhdGVfaWQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICBmcmFtZV9idXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjE0NgogICAgLy8gbG9nZ2VkQXNzZXJ0KGdhdGVDaGVjayhnYXRlVHhuLCB0aGlzLmFraXRhREFPLnZhbHVlLCBvcmlnaW4sIGdhdGVJRCksIGVyckZhaWxlZEdhdGUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTQ2CiAgICAvLyBsb2dnZWRBc3NlcnQoZ2F0ZUNoZWNrKGdhdGVUeG4sIHRoaXMuYWtpdGFEQU8udmFsdWUsIG9yaWdpbiwgZ2F0ZUlEKSwgZXJyRmFpbGVkR2F0ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM0OAogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgZnJhbWVfZGlnIC0yCiAgICBndHhucyBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjExMgogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgc3dhcAogICAgYnl0ZWMgNCAvLyAiYWFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNDgKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIHB1c2hpbnQgNDAKICAgIGV4dHJhY3RfdWludDY0CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNDgtMzQ5CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICBieiBhc3NlcnRMZWdhY3lHYXRlUGFzc2VkX2Jvb2xfZmFsc2VAMjUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzQ5CiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICBmcmFtZV9kaWcgLTIKICAgIGd0eG5zIE9uQ29tcGxldGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNDgtMzQ5CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICBibnogYXNzZXJ0TGVnYWN5R2F0ZVBhc3NlZF9ib29sX2ZhbHNlQDI1CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM1MAogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICBmcmFtZV9kaWcgLTIKICAgIGd0eG5zIE51bUFwcEFyZ3MKICAgIHB1c2hpbnQgNAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzQ4LTM1MAogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICBieiBhc3NlcnRMZWdhY3lHYXRlUGFzc2VkX2Jvb2xfZmFsc2VAMjUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzUxCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBHYXRlLnByb3RvdHlwZS5tdXN0Q2hlY2s+KCkgJiYKICAgIGZyYW1lX2RpZyAtMgogICAgZ3R4bnNhIEFwcGxpY2F0aW9uQXJncyAwCiAgICBwdXNoYnl0ZXMgMHg0MzkyMjY1NSAvLyBtZXRob2QgIm11c3RDaGVjayhhZGRyZXNzLHVpbnQ2NCxieXRlW11bXSl2b2lkIgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzQ4LTM1MQogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBHYXRlLnByb3RvdHlwZS5tdXN0Q2hlY2s+KCkgJiYKICAgIGJ6IGFzc2VydExlZ2FjeUdhdGVQYXNzZWRfYm9vbF9mYWxzZUAyNQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNTIKICAgIC8vIGdhdGVUeG4uYXBwQXJncygxKSA9PT0gbmV3IEFkZHJlc3MoY2FsbGVyKS5ieXRlcyAmJgogICAgZnJhbWVfZGlnIC0yCiAgICBndHhuc2EgQXBwbGljYXRpb25BcmdzIDEKICAgIGZyYW1lX2RpZyAwCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNDgtMzUyCiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIEdhdGUucHJvdG90eXBlLm11c3RDaGVjaz4oKSAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBuZXcgQWRkcmVzcyhjYWxsZXIpLmJ5dGVzICYmCiAgICBieiBhc3NlcnRMZWdhY3lHYXRlUGFzc2VkX2Jvb2xfZmFsc2VAMjUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzUzCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMikgPT09IGl0b2IoaWQpCiAgICBmcmFtZV9kaWcgLTIKICAgIGd0eG5zYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZnJhbWVfZGlnIDEKICAgIGl0b2IKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM0OC0zNTMKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgR2F0ZS5wcm90b3R5cGUubXVzdENoZWNrPigpICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMSkgPT09IG5ldyBBZGRyZXNzKGNhbGxlcikuYnl0ZXMgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygyKSA9PT0gaXRvYihpZCkKICAgIGJ6IGFzc2VydExlZ2FjeUdhdGVQYXNzZWRfYm9vbF9mYWxzZUAyNQogICAgaW50Y18xIC8vIDEKCmFzc2VydExlZ2FjeUdhdGVQYXNzZWRfYm9vbF9tZXJnZUAyNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjE0NgogICAgLy8gbG9nZ2VkQXNzZXJ0KGdhdGVDaGVjayhnYXRlVHhuLCB0aGlzLmFraXRhREFPLnZhbHVlLCBvcmlnaW4sIGdhdGVJRCksIGVyckZhaWxlZEdhdGUpCiAgICBibnogYXNzZXJ0TGVnYWN5R2F0ZVBhc3NlZF9hZnRlcl9hc3NlcnRAMgogICAgYnl0ZWMgMjcgLy8gIkVSUjplcnJGZ3RlIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckZndGUKCmFzc2VydExlZ2FjeUdhdGVQYXNzZWRfYWZ0ZXJfYXNzZXJ0QDI6CiAgICByZXRzdWIKCmFzc2VydExlZ2FjeUdhdGVQYXNzZWRfYm9vbF9mYWxzZUAyNToKICAgIGludGNfMCAvLyAwCiAgICBiIGFzc2VydExlZ2FjeUdhdGVQYXNzZWRfYm9vbF9tZXJnZUAyNgoKYXNzZXJ0TGVnYWN5R2F0ZVBhc3NlZF9hZnRlcl9pZl9lbHNlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI0Ny0yNTAKICAgIC8vIGNvbnN0IFtjb250cm9sbGVkQWNjb3VudEJ5dGVzLCBleGlzdHNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoCiAgICAvLyAgIHdhbGxldElELAogICAgLy8gICBCeXRlcyhBYnN0cmFjdEFjY291bnRHbG9iYWxTdGF0ZUtleXNDb250cm9sbGVkQWRkcmVzcykKICAgIC8vICkKICAgIGZyYW1lX2RpZyAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI0OQogICAgLy8gQnl0ZXMoQWJzdHJhY3RBY2NvdW50R2xvYmFsU3RhdGVLZXlzQ29udHJvbGxlZEFkZHJlc3MpCiAgICBieXRlYyAyMiAvLyAiY29udHJvbGxlZF9hZGRyZXNzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNDctMjUwCiAgICAvLyBjb25zdCBbY29udHJvbGxlZEFjY291bnRCeXRlcywgZXhpc3RzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKAogICAgLy8gICB3YWxsZXRJRCwKICAgIC8vICAgQnl0ZXMoQWJzdHJhY3RBY2NvdW50R2xvYmFsU3RhdGVLZXlzQ29udHJvbGxlZEFkZHJlc3MpCiAgICAvLyApCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNTEKICAgIC8vIGxvZ2dlZEFzc2VydChleGlzdHMgJiYgY29udHJvbGxlZEFjY291bnRCeXRlcy5sZW5ndGggPT09IDMyLCBlcnJJbnZhbGlkV2FsbGV0KQogICAgYnogYXNzZXJ0TGVnYWN5R2F0ZVBhc3NlZF9ib29sX2ZhbHNlQDgKICAgIGRpZyAxCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBieiBhc3NlcnRMZWdhY3lHYXRlUGFzc2VkX2Jvb2xfZmFsc2VAOAogICAgaW50Y18xIC8vIDEKCmFzc2VydExlZ2FjeUdhdGVQYXNzZWRfYm9vbF9tZXJnZUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNTEKICAgIC8vIGxvZ2dlZEFzc2VydChleGlzdHMgJiYgY29udHJvbGxlZEFjY291bnRCeXRlcy5sZW5ndGggPT09IDMyLCBlcnJJbnZhbGlkV2FsbGV0KQogICAgYm56IGFzc2VydExlZ2FjeUdhdGVQYXNzZWRfYWZ0ZXJfYXNzZXJ0QDExCiAgICBieXRlYyAyMyAvLyAiRVJSOmVyckl3bHQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXdsdAoKYXNzZXJ0TGVnYWN5R2F0ZVBhc3NlZF9hZnRlcl9hc3NlcnRAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIyNAogICAgLy8gaWYgKG9yaWdpbiAhPT0gd2FsbGV0SUQuYWRkcmVzcyAmJiBvcmlnaW4gIT09IFR4bi5zZW5kZXIgJiYgb3JpZ2luLmF1dGhBZGRyZXNzICE9PSB3YWxsZXRJRC5hZGRyZXNzKSB7CiAgICBmcmFtZV9kaWcgMgogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZGlnIDIKICAgICE9CiAgICBieiBhc3NlcnRMZWdhY3lHYXRlUGFzc2VkX2FmdGVyX2lmX2Vsc2VAMTUKICAgIGRpZyAxCiAgICB0eG4gU2VuZGVyCiAgICAhPQogICAgYnogYXNzZXJ0TGVnYWN5R2F0ZVBhc3NlZF9hZnRlcl9pZl9lbHNlQDE1CiAgICBkaWcgMQogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RBdXRoQWRkcgogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICBmcmFtZV9kaWcgMgogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgIT0KICAgIGJ6IGFzc2VydExlZ2FjeUdhdGVQYXNzZWRfYWZ0ZXJfaWZfZWxzZUAxNQogICAgZnJhbWVfYnVyeSAwCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjMxCiAgICAvLyByZXR1cm4gbGVnYWN5T3JpZ2luT3Iod2FsbGV0SUQsIFR4bi5zZW5kZXIpCiAgICBiIGFzc2VydExlZ2FjeUdhdGVQYXNzZWRfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpsZWdhY3lPcmlnaW5PckAxNgoKYXNzZXJ0TGVnYWN5R2F0ZVBhc3NlZF9hZnRlcl9pZl9lbHNlQDE1OgogICAgcG9wCiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjMxCiAgICAvLyByZXR1cm4gbGVnYWN5T3JpZ2luT3Iod2FsbGV0SUQsIFR4bi5zZW5kZXIpCiAgICBiIGFzc2VydExlZ2FjeUdhdGVQYXNzZWRfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpsZWdhY3lPcmlnaW5PckAxNgoKYXNzZXJ0TGVnYWN5R2F0ZVBhc3NlZF9ib29sX2ZhbHNlQDg6CiAgICBpbnRjXzAgLy8gMAogICAgYiBhc3NlcnRMZWdhY3lHYXRlUGFzc2VkX2Jvb2xfbWVyZ2VAOQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjpNYXJrZXRwbGFjZS5sZWdhY3lTZWxsZXJSZWZlcnJlcigpIC0+IGJ5dGVzOgpsZWdhY3lTZWxsZXJSZWZlcnJlcjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjE1NQogICAgLy8gcmV0dXJuIHJlZmVycmVyT3JaZXJvQWRkcmVzcyhsZWdhY3lXYWxsZXRPZih0aGlzLmFraXRhREFPLnZhbHVlLCBUeG4uc2VuZGVyKSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxNTUKICAgIC8vIHJldHVybiByZWZlcnJlck9yWmVyb0FkZHJlc3MobGVnYWN5V2FsbGV0T2YodGhpcy5ha2l0YURBTy52YWx1ZSwgVHhuLnNlbmRlcikpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgdHhuIFNlbmRlcgogICAgY2FsbHN1YiBsZWdhY3lXYWxsZXRPZgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI0MgogICAgLy8gcmV0dXJuIHJlZmVycmVyT3Iod2FsbGV0SUQsIEdsb2JhbC56ZXJvQWRkcmVzcykKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMzUKICAgIC8vIGlmICh3YWxsZXRJRC5pZCA9PT0gMCkgewogICAgYm56IGxlZ2FjeVNlbGxlclJlZmVycmVyX2FmdGVyX2lmX2Vsc2VAMwogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxNTUKICAgIC8vIHJldHVybiByZWZlcnJlck9yWmVyb0FkZHJlc3MobGVnYWN5V2FsbGV0T2YodGhpcy5ha2l0YURBTy52YWx1ZSwgVHhuLnNlbmRlcikpCiAgICByZXRzdWIKCmxlZ2FjeVNlbGxlclJlZmVycmVyX2FmdGVyX2lmX2Vsc2VAMzoKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNTgKICAgIC8vIEJ5dGVzKEFic3RyYWN0QWNjb3VudEdsb2JhbFN0YXRlS2V5c1JlZmVycmVyKQogICAgYnl0ZWMgMjQgLy8gInJlZmVycmVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNTYtMjU5CiAgICAvLyBjb25zdCBbcmVmZXJyZXJCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcygKICAgIC8vICAgd2FsbGV0SUQsCiAgICAvLyAgIEJ5dGVzKEFic3RyYWN0QWNjb3VudEdsb2JhbFN0YXRlS2V5c1JlZmVycmVyKQogICAgLy8gKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTU1CiAgICAvLyByZXR1cm4gcmVmZXJyZXJPclplcm9BZGRyZXNzKGxlZ2FjeVdhbGxldE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIFR4bi5zZW5kZXIpKQogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6Ok1hcmtldHBsYWNlLmFzc2VydExpc3RpbmdQYXltZW50KHBheW1lbnQ6IHVpbnQ2NCwgY29zdDogYnl0ZXMsIGlzQWxnb1BheW1lbnQ6IHVpbnQ2NCwgaXNQcml6ZUJveDogdWludDY0LCBsZWdhY3lQYXltZW50OiB1aW50NjQpIC0+IHVpbnQ2NCwgYnl0ZXM6CmFzc2VydExpc3RpbmdQYXltZW50OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTcwCiAgICAvLyBwcml2YXRlIGFzc2VydExpc3RpbmdQYXltZW50KHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgY29zdDogTGlzdGluZ0Nvc3RJbmZvLCBpc0FsZ29QYXltZW50OiBib29sZWFuLCBpc1ByaXplQm94OiBib29sZWFuLCBsZWdhY3lQYXltZW50OiBib29sZWFuKTogdWludDY0IHsKICAgIHByb3RvIDUgMgogICAgcHVzaGJ5dGVzICIiCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjE3MQogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBlcnJJbnZhbGlkUGF5bWVudCkKICAgIGZyYW1lX2RpZyAtNQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IGFzc2VydExpc3RpbmdQYXltZW50X2FmdGVyX2Fzc2VydEAyCiAgICBieXRlYyA3IC8vICJFUlI6ZXJySXBheSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcGF5Cgphc3NlcnRMaXN0aW5nUGF5bWVudF9hZnRlcl9hc3NlcnRAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjE3MgogICAgLy8gaWYgKHBheW1lbnQuYW1vdW50ID09PSBjb3N0LnRvdGFsKSB7CiAgICBmcmFtZV9kaWcgLTUKICAgIGd0eG5zIEFtb3VudAogICAgZHVwCiAgICBmcmFtZV9idXJ5IDEKICAgIGZyYW1lX2RpZyAtNAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGNvdmVyIDIKICAgID09CiAgICBieiBhc3NlcnRMaXN0aW5nUGF5bWVudF9hZnRlcl9pZl9lbHNlQDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjE3MwogICAgLy8gcmV0dXJuIDAKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9kaWcgLTQKICAgIGZyYW1lX2J1cnkgMQogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCmFzc2VydExpc3RpbmdQYXltZW50X2FmdGVyX2lmX2Vsc2VANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjE4OQogICAgLy8gY29uc3QgZGlzYnVyc2VtZW50czogdWludDY0ID0gaXNQcml6ZUJveCA/IDEgOiAyCiAgICBpbnRjXzMgLy8gMgogICAgaW50Y18xIC8vIDEKICAgIGZyYW1lX2RpZyAtMgogICAgc2VsZWN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxOTAKICAgIC8vIHJldHVybiBjb3N0LmNyZWF0ZU1iciAtIExlZ2FjeUxpc3RpbmdDcmVhdGVNYnIgKyAoKE1pbkRpc2J1cnNlbWVudHNNQlIgLSBMZWdhY3lNaW5EaXNidXJzZW1lbnRzTUJSKSAqIGRpc2J1cnNlbWVudHMpCiAgICBmcmFtZV9kaWcgLTQKICAgIHB1c2hpbnQgMzIKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMAogICAgaW50YyA2IC8vIDc1NjUwMAogICAgLQogICAgcHVzaGludCAxMjgwMAogICAgdW5jb3ZlciAyCiAgICAqCiAgICArCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxNzcKICAgIC8vIGxlZ2FjeVBheW1lbnQgJiYgaXNBbGdvUGF5bWVudCAmJiBjb3N0LmNyZWF0ZU1iciA+IExlZ2FjeUxpc3RpbmdDcmVhdGVNYnIgJiYKICAgIGZyYW1lX2RpZyAtMQogICAgYnogYXNzZXJ0TGlzdGluZ1BheW1lbnRfYm9vbF9mYWxzZUAxMQogICAgZnJhbWVfZGlnIC0zCiAgICBieiBhc3NlcnRMaXN0aW5nUGF5bWVudF9ib29sX2ZhbHNlQDExCiAgICBmcmFtZV9kaWcgMAogICAgaW50YyA2IC8vIDc1NjUwMAogICAgPgogICAgYnogYXNzZXJ0TGlzdGluZ1BheW1lbnRfYm9vbF9mYWxzZUAxMQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTc4CiAgICAvLyBwYXltZW50LmFtb3VudCA9PT0gY29zdC50b3RhbCAtIGZsb2F0CiAgICBkdXAKICAgIGRpZyAyCiAgICAtCiAgICBmcmFtZV9kaWcgMQogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjE3Ny0xNzgKICAgIC8vIGxlZ2FjeVBheW1lbnQgJiYgaXNBbGdvUGF5bWVudCAmJiBjb3N0LmNyZWF0ZU1iciA+IExlZ2FjeUxpc3RpbmdDcmVhdGVNYnIgJiYKICAgIC8vIHBheW1lbnQuYW1vdW50ID09PSBjb3N0LnRvdGFsIC0gZmxvYXQKICAgIGJ6IGFzc2VydExpc3RpbmdQYXltZW50X2Jvb2xfZmFsc2VAMTEKICAgIGludGNfMSAvLyAxCgphc3NlcnRMaXN0aW5nUGF5bWVudF9ib29sX21lcmdlQDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTc2LTE3OQogICAgLy8gbG9nZ2VkQXNzZXJ0KCgKICAgIC8vICAgbGVnYWN5UGF5bWVudCAmJiBpc0FsZ29QYXltZW50ICYmIGNvc3QuY3JlYXRlTWJyID4gTGVnYWN5TGlzdGluZ0NyZWF0ZU1iciAmJgogICAgLy8gICBwYXltZW50LmFtb3VudCA9PT0gY29zdC50b3RhbCAtIGZsb2F0CiAgICAvLyApLCBlcnJJbnZhbGlkUGF5bWVudCkKICAgIGJueiBhc3NlcnRMaXN0aW5nUGF5bWVudF9hZnRlcl9hc3NlcnRAMTQKICAgIGJ5dGVjIDcgLy8gIkVSUjplcnJJcGF5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwYXkKCmFzc2VydExpc3RpbmdQYXltZW50X2FmdGVyX2Fzc2VydEAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjE4MgogICAgLy8gY29uc3Qgc2VsZiA9IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTgzCiAgICAvLyBsb2dnZWRBc3NlcnQoc2VsZi5iYWxhbmNlIC0gc2VsZi5taW5CYWxhbmNlID49IGNvc3QudG90YWwgKyBMZWdhY3lGbG9hdFJlc2VydmUsIGVyckxlZ2FjeUZsb2F0UmVzZXJ2ZSkKICAgIGR1cAogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RCYWxhbmNlCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIHN3YXAKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0TWluQmFsYW5jZQogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICAtCiAgICBzd2FwCiAgICBwdXNoaW50IDUwMDAwMAogICAgKwogICAgPj0KICAgIGJueiBhc3NlcnRMaXN0aW5nUGF5bWVudF9hZnRlcl9hc3NlcnRAMTYKICAgIHB1c2hieXRlcyAiRVJSOmVyckxmbHQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTGZsdAoKYXNzZXJ0TGlzdGluZ1BheW1lbnRfYWZ0ZXJfYXNzZXJ0QDE2OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTg0CiAgICAvLyByZXR1cm4gZmxvYXQKICAgIGZyYW1lX2RpZyAtNAogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDMKICAgIHJldHN1YgoKYXNzZXJ0TGlzdGluZ1BheW1lbnRfYm9vbF9mYWxzZUAxMToKICAgIGludGNfMCAvLyAwCiAgICBiIGFzc2VydExpc3RpbmdQYXltZW50X2Jvb2xfbWVyZ2VAMTIKCgovLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo6TWFya2V0cGxhY2UuYXNzZXJ0QnV5ZXJBc2FQYXltZW50KGFzc2V0WGZlcjogdWludDY0LCBhcHBJZDogdWludDY0KSAtPiB2b2lkOgphc3NlcnRCdXllckFzYVBheW1lbnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxOTQKICAgIC8vIHByaXZhdGUgYXNzZXJ0QnV5ZXJBc2FQYXltZW50KGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLCBhcHBJZDogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIHByb3RvIDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTk1CiAgICAvLyBhc3NlcnRTYWZlQXNzZXRUcmFuc2Zlcihhc3NldFhmZXIsIFR4bi5zZW5kZXIpCiAgICBmcmFtZV9kaWcgLTIKICAgIHR4biBTZW5kZXIKICAgIGNhbGxzdWIgYXNzZXJ0U2FmZUFzc2V0VHJhbnNmZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjE5NgogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci5hc3NldFJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJySW52YWxpZFRyYW5zZmVyKQogICAgZnJhbWVfZGlnIC0yCiAgICBndHhucyBBc3NldFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBhc3NlcnRCdXllckFzYVBheW1lbnRfYWZ0ZXJfYXNzZXJ0QDIKICAgIGJ5dGVjIDE1IC8vICJFUlI6ZXJySXhmciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJeGZyCgphc3NlcnRCdXllckFzYVBheW1lbnRfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxOTcKICAgIC8vIGxvZ2dlZEFzc2VydChhc3NldFhmZXIuYXNzZXRBbW91bnQgPiAwLCBlcnJJbnZhbGlkVHJhbnNmZXIpCiAgICBmcmFtZV9kaWcgLTIKICAgIGd0eG5zIEFzc2V0QW1vdW50CiAgICBibnogYXNzZXJ0QnV5ZXJBc2FQYXltZW50X2FmdGVyX2Fzc2VydEA0CiAgICBieXRlYyAxNSAvLyAiRVJSOmVyckl4ZnIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXhmcgoKYXNzZXJ0QnV5ZXJBc2FQYXltZW50X2FmdGVyX2Fzc2VydEA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTk4CiAgICAvLyBjb25zdCBwYXltZW50QXNzZXQgPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQoYXBwSWQsIEJ5dGVzKExpc3RpbmdHbG9iYWxTdGF0ZUtleVBheW1lbnRBc3NldCkpWzBdCiAgICBmcmFtZV9kaWcgLTEKICAgIHB1c2hieXRlcyAicGF5bWVudF9hc3NldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjE5OQogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci54ZmVyQXNzZXQuaWQgPT09IHBheW1lbnRBc3NldCwgZXJySW52YWxpZFRyYW5zZmVyKQogICAgZnJhbWVfZGlnIC0yCiAgICBndHhucyBYZmVyQXNzZXQKICAgID09CiAgICBibnogYXNzZXJ0QnV5ZXJBc2FQYXltZW50X2FmdGVyX2Fzc2VydEA2CiAgICBieXRlYyAxNSAvLyAiRVJSOmVyckl4ZnIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXhmcgoKYXNzZXJ0QnV5ZXJBc2FQYXltZW50X2FmdGVyX2Fzc2VydEA2OgogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6Ok1hcmtldHBsYWNlLmFzc2VydEJ1eWVyUGF5bWVudChwYXltZW50OiB1aW50NjQpIC0+IHZvaWQ6CmFzc2VydEJ1eWVyUGF5bWVudDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjIwMwogICAgLy8gcHJpdmF0ZSBhc3NlcnRCdXllclBheW1lbnQocGF5bWVudDogZ3R4bi5QYXltZW50VHhuKTogdm9pZCB7CiAgICBwcm90byAxIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjIwNAogICAgLy8gYXNzZXJ0U2FmZVBheW1lbnQocGF5bWVudCwgVHhuLnNlbmRlcikKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjIKICAgIC8vIGxvZ2dlZEFzc2VydCh0eG4uc2VuZGVyID09PSBzZW5kZXIsIGVyckludmFsaWRQYXltZW50U2VuZGVyKQogICAgZnJhbWVfZGlnIC0xCiAgICBndHhucyBTZW5kZXIKICAgID09CiAgICBibnogYXNzZXJ0QnV5ZXJQYXltZW50X2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyAxOCAvLyAiRVJSOmVycklwbXMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBtcwoKYXNzZXJ0QnV5ZXJQYXltZW50X2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MwogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5jbG9zZVJlbWFpbmRlclRvID09PSBHbG9iYWwuemVyb0FkZHJlc3MsIGVyckNsb3NlRm9yYmlkZGVuKQogICAgZnJhbWVfZGlnIC0xCiAgICBndHhucyBDbG9zZVJlbWFpbmRlclRvCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgID09CiAgICBibnogYXNzZXJ0QnV5ZXJQYXltZW50X2FmdGVyX2Fzc2VydEA3CiAgICBieXRlYyAxOSAvLyAiRVJSOmVyck5jbHMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmNscwoKYXNzZXJ0QnV5ZXJQYXltZW50X2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NAogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5yZWtleVRvID09PSBHbG9iYWwuemVyb0FkZHJlc3MsIGVyclJla2V5Rm9yYmlkZGVuKQogICAgZnJhbWVfZGlnIC0xCiAgICBndHhucyBSZWtleVRvCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgID09CiAgICBibnogYXNzZXJ0QnV5ZXJQYXltZW50X2FmdGVyX2Fzc2VydEA5CiAgICBieXRlYyAyMCAvLyAiRVJSOmVyck5ya3kiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTnJreQoKYXNzZXJ0QnV5ZXJQYXltZW50X2FmdGVyX2Fzc2VydEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjA1CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRQYXltZW50KQogICAgZnJhbWVfZGlnIC0xCiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogYXNzZXJ0QnV5ZXJQYXltZW50X2FmdGVyX2Fzc2VydEAyCiAgICBieXRlYyA3IC8vICJFUlI6ZXJySXBheSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcGF5Cgphc3NlcnRCdXllclBheW1lbnRfYWZ0ZXJfYXNzZXJ0QDI6CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo6TWFya2V0cGxhY2Uuc2V0dGxlQWxnbyhwYXltZW50OiB1aW50NjQsIGFwcElkOiB1aW50NjQsIG1hcmtldHBsYWNlOiBieXRlcywgYmFsYW5jZUJlZm9yZTogdWludDY0LCBtaW5CZWZvcmU6IHVpbnQ2NCkgLT4gdm9pZDoKc2V0dGxlQWxnbzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjIwOAogICAgLy8gcHJpdmF0ZSBzZXR0bGVBbGdvKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYXBwSWQ6IEFwcGxpY2F0aW9uLCBtYXJrZXRwbGFjZTogQWNjb3VudCwgYmFsYW5jZUJlZm9yZTogdWludDY0LCBtaW5CZWZvcmU6IHVpbnQ2NCk6IHZvaWQgewogICAgcHJvdG8gNSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo4NAogICAgLy8gcmV0dXJuICFvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQoYXBwSWQsIEJ5dGVzKExpc3RpbmdHbG9iYWxTdGF0ZUtleVJldmlzaW9uKSlbMV0KICAgIGZyYW1lX2RpZyAtNAogICAgYnl0ZWMgMTEgLy8gInJldiIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBidXJ5IDEKICAgICEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTgzCiAgICAvLyBjb25zdCBbZnVuZGVyQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYXBwSWQsIEJ5dGVzKEdsb2JhbFN0YXRlS2V5RnVuZGVyKSkKICAgIGZyYW1lX2RpZyAtNAogICAgYnl0ZWMgMTIgLy8gImZ1bmRlciIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjIxMQogICAgLy8gY29uc3QgeyBhY2NvdW50OiByZWNlaXZlciwgYW1vdW50IH0gPSBnZXRGdW5kZXIoYXBwSWQpCiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgc3dhcAogICAgcHVzaGludCAzMgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjExNgogICAgLy8gcmV0dXJuIG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NChhcHBJZCwgQnl0ZXMoTGlzdGluZ0dsb2JhbFN0YXRlS2V5RmFjdG9yeUZsb2F0KSlbMF0KICAgIGZyYW1lX2RpZyAtNAogICAgYnl0ZWMgMTMgLy8gImZhY3RvcnlfZmxvYXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyMTUtMjI2CiAgICAvLyBsaXN0aW5nLmNhbGwucHVyY2hhc2UoewogICAgLy8gICBhcHBJZCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogYXBwSWQuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogcGF5bWVudC5hbW91bnQsCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgVHhuLnNlbmRlciwKICAgIC8vICAgICBtYXJrZXRwbGFjZQogICAgLy8gICBdLAogICAgLy8gICBvbkNvbXBsZXRpb246IE9uQ29tcGxldGVBY3Rpb24uRGVsZXRlQXBwbGljYXRpb24sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjE5CiAgICAvLyByZWNlaXZlcjogYXBwSWQuYWRkcmVzcywKICAgIGZyYW1lX2RpZyAtNAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjIwCiAgICAvLyBhbW91bnQ6IHBheW1lbnQuYW1vdW50LAogICAgZnJhbWVfZGlnIC01CiAgICBndHhucyBBbW91bnQKICAgIGR1cAogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjIxOC0yMjEKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBhcHBJZC5hZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IHBheW1lbnQuYW1vdW50LAogICAgLy8gfSksCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyMTUtMjI2CiAgICAvLyBsaXN0aW5nLmNhbGwucHVyY2hhc2UoewogICAgLy8gICBhcHBJZCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogYXBwSWQuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogcGF5bWVudC5hbW91bnQsCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgVHhuLnNlbmRlciwKICAgIC8vICAgICBtYXJrZXRwbGFjZQogICAgLy8gICBdLAogICAgLy8gICBvbkNvbXBsZXRpb246IE9uQ29tcGxldGVBY3Rpb24uRGVsZXRlQXBwbGljYXRpb24sCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyMjIKICAgIC8vIFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyMjUKICAgIC8vIG9uQ29tcGxldGlvbjogT25Db21wbGV0ZUFjdGlvbi5EZWxldGVBcHBsaWNhdGlvbiwKICAgIHB1c2hpbnQgNQogICAgaXR4bl9maWVsZCBPbkNvbXBsZXRpb24KICAgIGZyYW1lX2RpZyAtNAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyMTUtMjI2CiAgICAvLyBsaXN0aW5nLmNhbGwucHVyY2hhc2UoewogICAgLy8gICBhcHBJZCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogYXBwSWQuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogcGF5bWVudC5hbW91bnQsCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgVHhuLnNlbmRlciwKICAgIC8vICAgICBtYXJrZXRwbGFjZQogICAgLy8gICBdLAogICAgLy8gICBvbkNvbXBsZXRpb246IE9uQ29tcGxldGVBY3Rpb24uRGVsZXRlQXBwbGljYXRpb24sCiAgICAvLyB9KQogICAgcHVzaGJ5dGVzIDB4NmExNjM5M2QgLy8gbWV0aG9kICJwdXJjaGFzZShwYXksYWRkcmVzcyxhZGRyZXNzKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGZyYW1lX2RpZyAtMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyMjgKICAgIC8vIHRoaXMucmVmdW5kTGlzdGluZ0Z1bmRlcihsZWdhY3ksIHJlY2VpdmVyLCBhbW91bnQsIGZsb2F0LCBiYWxhbmNlQmVmb3JlLCBtaW5CZWZvcmUsIHBheW1lbnQuYW1vdW50KQogICAgY292ZXIgNAogICAgZnJhbWVfZGlnIC0yCiAgICBmcmFtZV9kaWcgLTEKICAgIHVuY292ZXIgNgogICAgY2FsbHN1YiByZWZ1bmRMaXN0aW5nRnVuZGVyCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo6TWFya2V0cGxhY2Uuc2V0dGxlQXNhKGFzc2V0WGZlcjogdWludDY0LCBhcHBJZDogdWludDY0LCBtYXJrZXRwbGFjZTogYnl0ZXMsIGJhbGFuY2VCZWZvcmU6IHVpbnQ2NCwgbWluQmVmb3JlOiB1aW50NjQpIC0+IHZvaWQ6CnNldHRsZUFzYToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjIzMQogICAgLy8gcHJpdmF0ZSBzZXR0bGVBc2EoYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sIGFwcElkOiBBcHBsaWNhdGlvbiwgbWFya2V0cGxhY2U6IEFjY291bnQsIGJhbGFuY2VCZWZvcmU6IHVpbnQ2NCwgbWluQmVmb3JlOiB1aW50NjQpOiB2b2lkIHsKICAgIHByb3RvIDUgMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6ODQKICAgIC8vIHJldHVybiAhb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KGFwcElkLCBCeXRlcyhMaXN0aW5nR2xvYmFsU3RhdGVLZXlSZXZpc2lvbikpWzFdCiAgICBmcmFtZV9kaWcgLTQKICAgIGJ5dGVjIDExIC8vICJyZXYiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyMzMKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5pc0xlZ2FjeUxpc3RpbmcoYXBwSWQpLCBlcnJMZWdhY3lMaXN0aW5nKQogICAgYm56IHNldHRsZUFzYV9hZnRlcl9hc3NlcnRAMgogICAgcHVzaGJ5dGVzICJFUlI6ZXJyTGdjeSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJMZ2N5CgpzZXR0bGVBc2FfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU4MwogICAgLy8gY29uc3QgW2Z1bmRlckJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFwcElkLCBCeXRlcyhHbG9iYWxTdGF0ZUtleUZ1bmRlcikpCiAgICBmcmFtZV9kaWcgLTQKICAgIGJ5dGVjIDEyIC8vICJmdW5kZXIiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyMzUKICAgIC8vIGNvbnN0IHsgYWNjb3VudDogcmVjZWl2ZXIsIGFtb3VudCB9ID0gZ2V0RnVuZGVyKGFwcElkKQogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIHN3YXAKICAgIHB1c2hpbnQgMzIKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxMTYKICAgIC8vIHJldHVybiBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQoYXBwSWQsIEJ5dGVzKExpc3RpbmdHbG9iYWxTdGF0ZUtleUZhY3RvcnlGbG9hdCkpWzBdCiAgICBmcmFtZV9kaWcgLTQKICAgIGJ5dGVjIDEzIC8vICJmYWN0b3J5X2Zsb2F0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjM5LTI1MQogICAgLy8gbGlzdGluZy5jYWxsLnB1cmNoYXNlQXNhKHsKICAgIC8vICAgYXBwSWQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgICAgYXNzZXRSZWNlaXZlcjogYXBwSWQuYWRkcmVzcywKICAgIC8vICAgICAgIGFzc2V0QW1vdW50OiBhc3NldFhmZXIuYXNzZXRBbW91bnQsCiAgICAvLyAgICAgICB4ZmVyQXNzZXQ6IGFzc2V0WGZlci54ZmVyQXNzZXQsCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgVHhuLnNlbmRlciwKICAgIC8vICAgICBtYXJrZXRwbGFjZQogICAgLy8gICBdLAogICAgLy8gICBvbkNvbXBsZXRpb246IE9uQ29tcGxldGVBY3Rpb24uRGVsZXRlQXBwbGljYXRpb24sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjQzCiAgICAvLyBhc3NldFJlY2VpdmVyOiBhcHBJZC5hZGRyZXNzLAogICAgZnJhbWVfZGlnIC00CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyNDQKICAgIC8vIGFzc2V0QW1vdW50OiBhc3NldFhmZXIuYXNzZXRBbW91bnQsCiAgICBmcmFtZV9kaWcgLTUKICAgIGd0eG5zIEFzc2V0QW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyNDUKICAgIC8vIHhmZXJBc3NldDogYXNzZXRYZmVyLnhmZXJBc3NldCwKICAgIGZyYW1lX2RpZyAtNQogICAgZ3R4bnMgWGZlckFzc2V0CiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyNDItMjQ2CiAgICAvLyBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICBhc3NldFJlY2VpdmVyOiBhcHBJZC5hZGRyZXNzLAogICAgLy8gICBhc3NldEFtb3VudDogYXNzZXRYZmVyLmFzc2V0QW1vdW50LAogICAgLy8gICB4ZmVyQXNzZXQ6IGFzc2V0WGZlci54ZmVyQXNzZXQsCiAgICAvLyB9KSwKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyMzktMjUxCiAgICAvLyBsaXN0aW5nLmNhbGwucHVyY2hhc2VBc2EoewogICAgLy8gICBhcHBJZCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgICBhc3NldFJlY2VpdmVyOiBhcHBJZC5hZGRyZXNzLAogICAgLy8gICAgICAgYXNzZXRBbW91bnQ6IGFzc2V0WGZlci5hc3NldEFtb3VudCwKICAgIC8vICAgICAgIHhmZXJBc3NldDogYXNzZXRYZmVyLnhmZXJBc3NldCwKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgIG1hcmtldHBsYWNlCiAgICAvLyAgIF0sCiAgICAvLyAgIG9uQ29tcGxldGlvbjogT25Db21wbGV0ZUFjdGlvbi5EZWxldGVBcHBsaWNhdGlvbiwKICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjI0NwogICAgLy8gVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjI1MAogICAgLy8gb25Db21wbGV0aW9uOiBPbkNvbXBsZXRlQWN0aW9uLkRlbGV0ZUFwcGxpY2F0aW9uLAogICAgcHVzaGludCA1CiAgICBpdHhuX2ZpZWxkIE9uQ29tcGxldGlvbgogICAgZnJhbWVfZGlnIC00CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjIzOS0yNTEKICAgIC8vIGxpc3RpbmcuY2FsbC5wdXJjaGFzZUFzYSh7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICAgIGFzc2V0UmVjZWl2ZXI6IGFwcElkLmFkZHJlc3MsCiAgICAvLyAgICAgICBhc3NldEFtb3VudDogYXNzZXRYZmVyLmFzc2V0QW1vdW50LAogICAgLy8gICAgICAgeGZlckFzc2V0OiBhc3NldFhmZXIueGZlckFzc2V0LAogICAgLy8gICAgIH0pLAogICAgLy8gICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgbWFya2V0cGxhY2UKICAgIC8vICAgXSwKICAgIC8vICAgb25Db21wbGV0aW9uOiBPbkNvbXBsZXRlQWN0aW9uLkRlbGV0ZUFwcGxpY2F0aW9uLAogICAgLy8gfSkKICAgIHB1c2hieXRlcyAweDE3MWM5Zjg4IC8vIG1ldGhvZCAicHVyY2hhc2VBc2EoYXhmZXIsYWRkcmVzcyxhZGRyZXNzKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGZyYW1lX2RpZyAtMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyNTMKICAgIC8vIHRoaXMucmVmdW5kTGlzdGluZ0Z1bmRlcihmYWxzZSwgcmVjZWl2ZXIsIGFtb3VudCwgZmxvYXQsIGJhbGFuY2VCZWZvcmUsIG1pbkJlZm9yZSwgMCkKICAgIGludGNfMCAvLyAwCiAgICBjb3ZlciAzCiAgICBmcmFtZV9kaWcgLTIKICAgIGZyYW1lX2RpZyAtMQogICAgaW50Y18wIC8vIDAKICAgIGNhbGxzdWIgcmVmdW5kTGlzdGluZ0Z1bmRlcgogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6Ok1hcmtldHBsYWNlLmxpc3RJbXBsKHBheW1lbnQ6IHVpbnQ2NCwgYXNzZXRYZmVyOiB1aW50NjQsIHByaWNlOiB1aW50NjQsIHBheW1lbnRBc3NldDogdWludDY0LCBleHBpcmF0aW9uOiB1aW50NjQsIHJlc2VydmVkRm9yOiBieXRlcywgZ2F0ZUlEOiB1aW50NjQsIG1hcmtldHBsYWNlOiBieXRlcywgbmFtZTogYnl0ZXMsIHByb29mOiBieXRlcywgc2VsbGVyUmVmZXJyZXI6IGJ5dGVzLCBsZWdhY3lQYXltZW50OiB1aW50NjQpIC0+IHVpbnQ2NCwgYnl0ZXM6Cmxpc3RJbXBsOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjY5LTI4MgogICAgLy8gcHJpdmF0ZSBsaXN0SW1wbCgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgcHJpY2U6IHVpbnQ2NCwKICAgIC8vICAgcGF5bWVudEFzc2V0OiB1aW50NjQsIC8vIDAgfCBBc3NldAogICAgLy8gICBleHBpcmF0aW9uOiB1aW50NjQsCiAgICAvLyAgIHJlc2VydmVkRm9yOiBBY2NvdW50LAogICAgLy8gICBnYXRlSUQ6IHVpbnQ2NCwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQsCiAgICAvLyAgIG5hbWU6IHN0cmluZywKICAgIC8vICAgcHJvb2Y6IFByb29mLAogICAgLy8gICBzZWxsZXJSZWZlcnJlcjogQWNjb3VudCwKICAgIC8vICAgbGVnYWN5UGF5bWVudDogYm9vbGVhbgogICAgLy8gKTogdWludDY0IHsKICAgIHByb3RvIDEyIDIKICAgIGludGNfMCAvLyAwCiAgICBkdXAKICAgIHB1c2hieXRlcyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6Mjg0CiAgICAvLyBsb2dnZWRBc3NlcnQocHJpY2UgPj0gTGlzdGluZ01pbmltdW1QcmljZSwgZXJyUHJpY2VUb29Mb3cpCiAgICBmcmFtZV9kaWcgLTEwCiAgICBwdXNoaW50IDQKICAgID49CiAgICBibnogbGlzdEltcGxfYWZ0ZXJfYXNzZXJ0QDIKICAgIGJ5dGVjIDI4IC8vICJFUlI6ZXJyUHJsbyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJQcmxvCgpsaXN0SW1wbF9hZnRlcl9hc3NlcnRAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjY2CiAgICAvLyBib3hlZENvbnRyYWN0ID0gQm94PGJ5dGVzPih7IGtleTogQm94S2V5Qm94ZWRDb250cmFjdCB9KQogICAgYnl0ZWNfMSAvLyAiYmMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyODUKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmJveGVkQ29udHJhY3QuZXhpc3RzLCBlcnJDb250cmFjdE5vdFNldCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGxpc3RJbXBsX2FmdGVyX2Fzc2VydEA0CiAgICBieXRlYyA4IC8vICJFUlI6ZXJyQ25zdCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJDbnN0CgpsaXN0SW1wbF9hZnRlcl9hc3NlcnRANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjI4OAogICAgLy8gYXNzZXJ0U2FmZUFzc2V0VHJhbnNmZXIoYXNzZXRYZmVyLCBUeG4uc2VuZGVyKQogICAgZnJhbWVfZGlnIC0xMQogICAgdHhuIFNlbmRlcgogICAgY2FsbHN1YiBhc3NlcnRTYWZlQXNzZXRUcmFuc2ZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6Mjg5CiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLmFzc2V0UmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBlcnJJbnZhbGlkUGF5bWVudCkKICAgIGZyYW1lX2RpZyAtMTEKICAgIGd0eG5zIEFzc2V0UmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IGxpc3RJbXBsX2FmdGVyX2Fzc2VydEA2CiAgICBieXRlYyA3IC8vICJFUlI6ZXJySXBheSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcGF5CgpsaXN0SW1wbF9hZnRlcl9hc3NlcnRANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjI5MAogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci5hc3NldEFtb3VudCA+IDAsIGVyckludmFsaWRQYXltZW50KQogICAgZnJhbWVfZGlnIC0xMQogICAgZ3R4bnMgQXNzZXRBbW91bnQKICAgIGR1cAogICAgYm56IGxpc3RJbXBsX2FmdGVyX2Fzc2VydEA4CiAgICBieXRlYyA3IC8vICJFUlI6ZXJySXBheSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcGF5CgpsaXN0SW1wbF9hZnRlcl9hc3NlcnRAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjI5MgogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnRBc3NldCAhPT0gYXNzZXRYZmVyLnhmZXJBc3NldC5pZCwgZXJyUHJpemVJc1BheW1lbnRBc3NldCkKICAgIGZyYW1lX2RpZyAtMTEKICAgIGd0eG5zIFhmZXJBc3NldAogICAgZHVwCiAgICBmcmFtZV9kaWcgLTkKICAgICE9CiAgICBibnogbGlzdEltcGxfYWZ0ZXJfYXNzZXJ0QDEwCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJQYmRsIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclBiZGwKCmxpc3RJbXBsX2FmdGVyX2Fzc2VydEAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjI5NAogICAgLy8gY29uc3QgaXNBbGdvUGF5bWVudCA9IHBheW1lbnRBc3NldCA9PT0gMAogICAgZnJhbWVfZGlnIC05CiAgICAhCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyOTUKICAgIC8vIGNvbnN0IGNvc3QgPSBjbG9uZSh0aGlzLmxpc3RpbmdDb3N0KGFzc2V0WGZlci54ZmVyQXNzZXQuaWQsIHBheW1lbnRBc3NldCwgZmFsc2UpKQogICAgZGlnIDEKICAgIGZyYW1lX2RpZyAtOQogICAgaW50Y18wIC8vIDAKICAgIGNhbGxzdWIgbGlzdGluZ0Nvc3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjI5OAogICAgLy8gY29uc3QgZmxvYXQgPSB0aGlzLmFzc2VydExpc3RpbmdQYXltZW50KHBheW1lbnQsIGNvc3QsIGlzQWxnb1BheW1lbnQsIGZhbHNlLCBsZWdhY3lQYXltZW50KQogICAgZnJhbWVfZGlnIC0xMgogICAgc3dhcAogICAgdW5jb3ZlciAyCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfZGlnIC0xCiAgICBjYWxsc3ViIGFzc2VydExpc3RpbmdQYXltZW50CiAgICBjb3ZlciAzCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozMDAKICAgIC8vIGNvbnN0IGNyZWF0b3JSb3lhbHR5ID0gcm95YWx0aWVzKHRoaXMuYWtpdGFEQU8udmFsdWUsIGFzc2V0WGZlci54ZmVyQXNzZXQsIG5hbWUsIHByb29mKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjMwMAogICAgLy8gY29uc3QgY3JlYXRvclJveWFsdHkgPSByb3lhbHRpZXModGhpcy5ha2l0YURBTy52YWx1ZSwgYXNzZXRYZmVyLnhmZXJBc3NldCwgbmFtZSwgcHJvb2YpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgY292ZXIgMgogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NDUKICAgIC8vIGxldCBjcmVhdG9yUm95YWx0eTogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2J1cnkgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NDcKICAgIC8vIGlmICghKHByb29mLmxlbmd0aCA+IDApKSB7CiAgICBmcmFtZV9kaWcgLTMKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBibnogbGlzdEltcGxfYWZ0ZXJfaWZfZWxzZUAyNgogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0OAogICAgLy8gcmV0dXJuIENyZWF0b3JSb3lhbHR5RGVmYXVsdAogICAgcHVzaGludCA1MDAwCiAgICBmcmFtZV9idXJ5IDIKCmxpc3RJbXBsX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6cm95YWx0aWVzQDMxOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzA1LTMzNgogICAgLy8gY29uc3QgbGlzdGluZ0FwcCA9IGxpc3RpbmcuY2FsbAogICAgLy8gICAuY3JlYXRlKHsKICAgIC8vICAgICBhcmdzOiBbCiAgICAvLyAgICAgICBhc3NldFhmZXIueGZlckFzc2V0LmlkLAogICAgLy8gICAgICAgZmFsc2UsCiAgICAvLyAgICAgICBwcmljZSwKICAgIC8vICAgICAgIHBheW1lbnRBc3NldCwKICAgIC8vICAgICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgICAgLy8gdGhlIGVzY3JvdyBvcHQtaW4gaXMgcGFpZCB0byB0aGUgREFPIGFuZCBuZXZlciByZWxlYXNlZCwgc28gaXQgaXMgbm90IHJlZnVuZGFibGUKICAgIC8vICAgICAgIHsgYWNjb3VudDogcGF5bWVudC5zZW5kZXIsIGFtb3VudDogcGF5bWVudC5hbW91bnQgLSBjb3N0LmVzY3Jvd09wdEluIH0sCiAgICAvLyAgICAgICByZXNlcnZlZEZvciwKICAgIC8vICAgICAgIGNyZWF0b3JSb3lhbHR5LAogICAgLy8gICAgICAgZ2F0ZUlELAogICAgLy8gICAgICAgbWFya2V0cGxhY2UsCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlLAogICAgLy8gICAgICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgICAgIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUsCiAgICAvLyAgICAgICBhc3NldFhmZXIuYXNzZXRBbW91bnQsCiAgICAvLyAgICAgICBzZWxsZXJSZWZlcnJlciwKICAgIC8vICAgICAgIGZsb2F0LAogICAgLy8gICAgIF0sCiAgICAvLyAgICAgLy8gQm94ZWQgYXBwcm92YWwgcHJvZ3JhbSBpbiB1cCB0byBmb3VyIDQgS0IgY2h1bmtzIChBVk0gMTM6IHVwIHRvIDE2IEtCKS4KICAgIC8vICAgICBhcHByb3ZhbFByb2dyYW06IFsKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDApLAogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMSksCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygyKSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDMpLAogICAgLy8gICAgIF0sCiAgICAvLyAgICAgY2xlYXJTdGF0ZVByb2dyYW06IGxpc3RpbmcuY2xlYXJTdGF0ZVByb2dyYW0sCiAgICAvLyAgICAgZXh0cmFQcm9ncmFtUGFnZXM6IHRoaXMuY2hpbGRFeHRyYVBhZ2VzQXRMZWFzdChsaXN0aW5nLmNsZWFyU3RhdGVQcm9ncmFtLmxlbmd0aCwgbGlzdGluZy5leHRyYVByb2dyYW1QYWdlcyksCiAgICAvLyAgIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozMDgKICAgIC8vIGFzc2V0WGZlci54ZmVyQXNzZXQuaWQsCiAgICBkdXAKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjMxMAogICAgLy8gcHJpY2UsCiAgICBmcmFtZV9kaWcgLTEwCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozMTEKICAgIC8vIHBheW1lbnRBc3NldCwKICAgIGZyYW1lX2RpZyAtOQogICAgaXRvYgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjMxMgogICAgLy8gZXhwaXJhdGlvbiwKICAgIGZyYW1lX2RpZyAtOAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzEzCiAgICAvLyBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzE1CiAgICAvLyB7IGFjY291bnQ6IHBheW1lbnQuc2VuZGVyLCBhbW91bnQ6IHBheW1lbnQuYW1vdW50IC0gY29zdC5lc2Nyb3dPcHRJbiB9LAogICAgZnJhbWVfZGlnIC0xMgogICAgZ3R4bnMgU2VuZGVyCiAgICBmcmFtZV9kaWcgLTEyCiAgICBndHhucyBBbW91bnQKICAgIHVuY292ZXIgOQogICAgZHVwCiAgICBjb3ZlciA4CiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIC0KICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzE3CiAgICAvLyBjcmVhdG9yUm95YWx0eSwKICAgIGZyYW1lX2RpZyAyCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozMTgKICAgIC8vIGdhdGVJRCwKICAgIGZyYW1lX2RpZyAtNgogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzIwCiAgICAvLyB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjYyCiAgICAvLyBjaGlsZENvbnRyYWN0VmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEJhc2VGYWN0b3J5R2xvYmFsU3RhdGVLZXlDaGlsZENvbnRyYWN0VmVyc2lvbiB9KQogICAgYnl0ZWMgOSAvLyAiY2hpbGRfY29udHJhY3RfdmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjMyMAogICAgLy8gdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzIxCiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjMyMQogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozMjIKICAgIC8vIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWNfMiAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzIyCiAgICAvLyB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjMyMwogICAgLy8gYXNzZXRYZmVyLmFzc2V0QW1vdW50LAogICAgdW5jb3ZlciAxMwogICAgZHVwCiAgICBjb3ZlciAxMgogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzI1CiAgICAvLyBmbG9hdCwKICAgIHVuY292ZXIgMTUKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjMyMy0zMjUKICAgIC8vIGFzc2V0WGZlci5hc3NldEFtb3VudCwKICAgIC8vIHNlbGxlclJlZmVycmVyLAogICAgLy8gZmxvYXQsCiAgICBzd2FwCiAgICBmcmFtZV9kaWcgLTIKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozMjkKICAgIC8vIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDApLAogICAgaW50Y18wIC8vIDAKICAgIGNhbGxzdWIgY2hpbGRBcHByb3ZhbENodW5rCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozMzAKICAgIC8vIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDEpLAogICAgaW50Y18xIC8vIDEKICAgIGNhbGxzdWIgY2hpbGRBcHByb3ZhbENodW5rCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozMzEKICAgIC8vIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDIpLAogICAgaW50Y18zIC8vIDIKICAgIGNhbGxzdWIgY2hpbGRBcHByb3ZhbENodW5rCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozMzIKICAgIC8vIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDMpLAogICAgcHVzaGludCAzCiAgICBjYWxsc3ViIGNoaWxkQXBwcm92YWxDaHVuawogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzM1CiAgICAvLyBleHRyYVByb2dyYW1QYWdlczogdGhpcy5jaGlsZEV4dHJhUGFnZXNBdExlYXN0KGxpc3RpbmcuY2xlYXJTdGF0ZVByb2dyYW0ubGVuZ3RoLCBsaXN0aW5nLmV4dHJhUHJvZ3JhbVBhZ2VzKSwKICAgIHB1c2hpbnQgNAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzAyCiAgICAvLyBjb25zdCBsaXN0aW5nID0gY29tcGlsZUFyYzQoTGlzdGluZykKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozMzUKICAgIC8vIGV4dHJhUHJvZ3JhbVBhZ2VzOiB0aGlzLmNoaWxkRXh0cmFQYWdlc0F0TGVhc3QobGlzdGluZy5jbGVhclN0YXRlUHJvZ3JhbS5sZW5ndGgsIGxpc3RpbmcuZXh0cmFQcm9ncmFtUGFnZXMpLAogICAgY2FsbHN1YiBjaGlsZEV4dHJhUGFnZXNBdExlYXN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozMDIKICAgIC8vIGNvbnN0IGxpc3RpbmcgPSBjb21waWxlQXJjNChMaXN0aW5nKQogICAgcHVzaGludCA3CiAgICBpdHhuX2ZpZWxkIEdsb2JhbE51bUJ5dGVTbGljZQogICAgcHVzaGludCAxMwogICAgaXR4bl9maWVsZCBHbG9iYWxOdW1VaW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozMDUtMzM2CiAgICAvLyBjb25zdCBsaXN0aW5nQXBwID0gbGlzdGluZy5jYWxsCiAgICAvLyAgIC5jcmVhdGUoewogICAgLy8gICAgIGFyZ3M6IFsKICAgIC8vICAgICAgIGFzc2V0WGZlci54ZmVyQXNzZXQuaWQsCiAgICAvLyAgICAgICBmYWxzZSwKICAgIC8vICAgICAgIHByaWNlLAogICAgLy8gICAgICAgcGF5bWVudEFzc2V0LAogICAgLy8gICAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgICAvLyB0aGUgZXNjcm93IG9wdC1pbiBpcyBwYWlkIHRvIHRoZSBEQU8gYW5kIG5ldmVyIHJlbGVhc2VkLCBzbyBpdCBpcyBub3QgcmVmdW5kYWJsZQogICAgLy8gICAgICAgeyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiBwYXltZW50LmFtb3VudCAtIGNvc3QuZXNjcm93T3B0SW4gfSwKICAgIC8vICAgICAgIHJlc2VydmVkRm9yLAogICAgLy8gICAgICAgY3JlYXRvclJveWFsdHksCiAgICAvLyAgICAgICBnYXRlSUQsCiAgICAvLyAgICAgICBtYXJrZXRwbGFjZSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRDb250cmFjdFZlcnNpb24udmFsdWUsCiAgICAvLyAgICAgICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICAgICAgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSwKICAgIC8vICAgICAgIGFzc2V0WGZlci5hc3NldEFtb3VudCwKICAgIC8vICAgICAgIHNlbGxlclJlZmVycmVyLAogICAgLy8gICAgICAgZmxvYXQsCiAgICAvLyAgICAgXSwKICAgIC8vICAgICAvLyBCb3hlZCBhcHByb3ZhbCBwcm9ncmFtIGluIHVwIHRvIGZvdXIgNCBLQiBjaHVua3MgKEFWTSAxMzogdXAgdG8gMTYgS0IpLgogICAgLy8gICAgIGFwcHJvdmFsUHJvZ3JhbTogWwogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMCksCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygxKSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDIpLAogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMyksCiAgICAvLyAgICAgXSwKICAgIC8vICAgICBjbGVhclN0YXRlUHJvZ3JhbTogbGlzdGluZy5jbGVhclN0YXRlUHJvZ3JhbSwKICAgIC8vICAgICBleHRyYVByb2dyYW1QYWdlczogdGhpcy5jaGlsZEV4dHJhUGFnZXNBdExlYXN0KGxpc3RpbmcuY2xlYXJTdGF0ZVByb2dyYW0ubGVuZ3RoLCBsaXN0aW5nLmV4dHJhUHJvZ3JhbVBhZ2VzKSwKICAgIC8vICAgfSkKICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIE9uQ29tcGxldGlvbgogICAgaXR4bl9maWVsZCBFeHRyYVByb2dyYW1QYWdlcwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzAyCiAgICAvLyBjb25zdCBsaXN0aW5nID0gY29tcGlsZUFyYzQoTGlzdGluZykKICAgIGJ5dGVjIDI5IC8vIGJhc2U2NChDNEVCUXc9PSkKICAgIGl0eG5fZmllbGQgQ2xlYXJTdGF0ZVByb2dyYW1QYWdlcwogICAgdW5jb3ZlciAzCiAgICBpdHhuX2ZpZWxkIEFwcHJvdmFsUHJvZ3JhbVBhZ2VzCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwcm92YWxQcm9ncmFtUGFnZXMKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwcm92YWxQcm9ncmFtUGFnZXMKICAgIGl0eG5fZmllbGQgQXBwcm92YWxQcm9ncmFtUGFnZXMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjMwNS0zMzYKICAgIC8vIGNvbnN0IGxpc3RpbmdBcHAgPSBsaXN0aW5nLmNhbGwKICAgIC8vICAgLmNyZWF0ZSh7CiAgICAvLyAgICAgYXJnczogWwogICAgLy8gICAgICAgYXNzZXRYZmVyLnhmZXJBc3NldC5pZCwKICAgIC8vICAgICAgIGZhbHNlLAogICAgLy8gICAgICAgcHJpY2UsCiAgICAvLyAgICAgICBwYXltZW50QXNzZXQsCiAgICAvLyAgICAgICBleHBpcmF0aW9uLAogICAgLy8gICAgICAgVHhuLnNlbmRlciwKICAgIC8vICAgICAgIC8vIHRoZSBlc2Nyb3cgb3B0LWluIGlzIHBhaWQgdG8gdGhlIERBTyBhbmQgbmV2ZXIgcmVsZWFzZWQsIHNvIGl0IGlzIG5vdCByZWZ1bmRhYmxlCiAgICAvLyAgICAgICB7IGFjY291bnQ6IHBheW1lbnQuc2VuZGVyLCBhbW91bnQ6IHBheW1lbnQuYW1vdW50IC0gY29zdC5lc2Nyb3dPcHRJbiB9LAogICAgLy8gICAgICAgcmVzZXJ2ZWRGb3IsCiAgICAvLyAgICAgICBjcmVhdG9yUm95YWx0eSwKICAgIC8vICAgICAgIGdhdGVJRCwKICAgIC8vICAgICAgIG1hcmtldHBsYWNlLAogICAgLy8gICAgICAgdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSwKICAgIC8vICAgICAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgICAgICB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLAogICAgLy8gICAgICAgYXNzZXRYZmVyLmFzc2V0QW1vdW50LAogICAgLy8gICAgICAgc2VsbGVyUmVmZXJyZXIsCiAgICAvLyAgICAgICBmbG9hdCwKICAgIC8vICAgICBdLAogICAgLy8gICAgIC8vIEJveGVkIGFwcHJvdmFsIHByb2dyYW0gaW4gdXAgdG8gZm91ciA0IEtCIGNodW5rcyAoQVZNIDEzOiB1cCB0byAxNiBLQikuCiAgICAvLyAgICAgYXBwcm92YWxQcm9ncmFtOiBbCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygwKSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDEpLAogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMiksCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygzKSwKICAgIC8vICAgICBdLAogICAgLy8gICAgIGNsZWFyU3RhdGVQcm9ncmFtOiBsaXN0aW5nLmNsZWFyU3RhdGVQcm9ncmFtLAogICAgLy8gICAgIGV4dHJhUHJvZ3JhbVBhZ2VzOiB0aGlzLmNoaWxkRXh0cmFQYWdlc0F0TGVhc3QobGlzdGluZy5jbGVhclN0YXRlUHJvZ3JhbS5sZW5ndGgsIGxpc3RpbmcuZXh0cmFQcm9ncmFtUGFnZXMpLAogICAgLy8gICB9KQogICAgYnl0ZWMgMzAgLy8gbWV0aG9kICJjcmVhdGUodWludDY0LGJvb2wsdWludDY0LHVpbnQ2NCx1aW50NjQsYWRkcmVzcywoYWRkcmVzcyx1aW50NjQpLGFkZHJlc3MsdWludDY0LHVpbnQ2NCxhZGRyZXNzLHN0cmluZyx1aW50NjQsKHN0cmluZyx1aW50NjQpLHVpbnQ2NCxhZGRyZXNzLHVpbnQ2NCl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyAxMQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjMwOQogICAgLy8gZmFsc2UsCiAgICBieXRlYyAxMCAvLyAweDAwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciA5CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciA5CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciA4CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciA3CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciA2CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC03CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciA1CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciA0CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC01CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozMDUtMzM2CiAgICAvLyBjb25zdCBsaXN0aW5nQXBwID0gbGlzdGluZy5jYWxsCiAgICAvLyAgIC5jcmVhdGUoewogICAgLy8gICAgIGFyZ3M6IFsKICAgIC8vICAgICAgIGFzc2V0WGZlci54ZmVyQXNzZXQuaWQsCiAgICAvLyAgICAgICBmYWxzZSwKICAgIC8vICAgICAgIHByaWNlLAogICAgLy8gICAgICAgcGF5bWVudEFzc2V0LAogICAgLy8gICAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgICAvLyB0aGUgZXNjcm93IG9wdC1pbiBpcyBwYWlkIHRvIHRoZSBEQU8gYW5kIG5ldmVyIHJlbGVhc2VkLCBzbyBpdCBpcyBub3QgcmVmdW5kYWJsZQogICAgLy8gICAgICAgeyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiBwYXltZW50LmFtb3VudCAtIGNvc3QuZXNjcm93T3B0SW4gfSwKICAgIC8vICAgICAgIHJlc2VydmVkRm9yLAogICAgLy8gICAgICAgY3JlYXRvclJveWFsdHksCiAgICAvLyAgICAgICBnYXRlSUQsCiAgICAvLyAgICAgICBtYXJrZXRwbGFjZSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRDb250cmFjdFZlcnNpb24udmFsdWUsCiAgICAvLyAgICAgICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICAgICAgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSwKICAgIC8vICAgICAgIGFzc2V0WGZlci5hc3NldEFtb3VudCwKICAgIC8vICAgICAgIHNlbGxlclJlZmVycmVyLAogICAgLy8gICAgICAgZmxvYXQsCiAgICAvLyAgICAgXSwKICAgIC8vICAgICAvLyBCb3hlZCBhcHByb3ZhbCBwcm9ncmFtIGluIHVwIHRvIGZvdXIgNCBLQiBjaHVua3MgKEFWTSAxMzogdXAgdG8gMTYgS0IpLgogICAgLy8gICAgIGFwcHJvdmFsUHJvZ3JhbTogWwogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMCksCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygxKSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDIpLAogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMyksCiAgICAvLyAgICAgXSwKICAgIC8vICAgICBjbGVhclN0YXRlUHJvZ3JhbTogbGlzdGluZy5jbGVhclN0YXRlUHJvZ3JhbSwKICAgIC8vICAgICBleHRyYVByb2dyYW1QYWdlczogdGhpcy5jaGlsZEV4dHJhUGFnZXNBdExlYXN0KGxpc3RpbmcuY2xlYXJTdGF0ZVByb2dyYW0ubGVuZ3RoLCBsaXN0aW5nLmV4dHJhUHJvZ3JhbVBhZ2VzKSwKICAgIC8vICAgfSkKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozMDUtMzM4CiAgICAvLyBjb25zdCBsaXN0aW5nQXBwID0gbGlzdGluZy5jYWxsCiAgICAvLyAgIC5jcmVhdGUoewogICAgLy8gICAgIGFyZ3M6IFsKICAgIC8vICAgICAgIGFzc2V0WGZlci54ZmVyQXNzZXQuaWQsCiAgICAvLyAgICAgICBmYWxzZSwKICAgIC8vICAgICAgIHByaWNlLAogICAgLy8gICAgICAgcGF5bWVudEFzc2V0LAogICAgLy8gICAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgICAvLyB0aGUgZXNjcm93IG9wdC1pbiBpcyBwYWlkIHRvIHRoZSBEQU8gYW5kIG5ldmVyIHJlbGVhc2VkLCBzbyBpdCBpcyBub3QgcmVmdW5kYWJsZQogICAgLy8gICAgICAgeyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiBwYXltZW50LmFtb3VudCAtIGNvc3QuZXNjcm93T3B0SW4gfSwKICAgIC8vICAgICAgIHJlc2VydmVkRm9yLAogICAgLy8gICAgICAgY3JlYXRvclJveWFsdHksCiAgICAvLyAgICAgICBnYXRlSUQsCiAgICAvLyAgICAgICBtYXJrZXRwbGFjZSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRDb250cmFjdFZlcnNpb24udmFsdWUsCiAgICAvLyAgICAgICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICAgICAgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSwKICAgIC8vICAgICAgIGFzc2V0WGZlci5hc3NldEFtb3VudCwKICAgIC8vICAgICAgIHNlbGxlclJlZmVycmVyLAogICAgLy8gICAgICAgZmxvYXQsCiAgICAvLyAgICAgXSwKICAgIC8vICAgICAvLyBCb3hlZCBhcHByb3ZhbCBwcm9ncmFtIGluIHVwIHRvIGZvdXIgNCBLQiBjaHVua3MgKEFWTSAxMzogdXAgdG8gMTYgS0IpLgogICAgLy8gICAgIGFwcHJvdmFsUHJvZ3JhbTogWwogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMCksCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygxKSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDIpLAogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMyksCiAgICAvLyAgICAgXSwKICAgIC8vICAgICBjbGVhclN0YXRlUHJvZ3JhbTogbGlzdGluZy5jbGVhclN0YXRlUHJvZ3JhbSwKICAgIC8vICAgICBleHRyYVByb2dyYW1QYWdlczogdGhpcy5jaGlsZEV4dHJhUGFnZXNBdExlYXN0KGxpc3RpbmcuY2xlYXJTdGF0ZVByb2dyYW0ubGVuZ3RoLCBsaXN0aW5nLmV4dHJhUHJvZ3JhbVBhZ2VzKSwKICAgIC8vICAgfSkKICAgIC8vICAgLml0eG4KICAgIC8vICAgLmNyZWF0ZWRBcHAKICAgIGdpdHhuIDAgQ3JlYXRlZEFwcGxpY2F0aW9uSUQKICAgIGR1cAogICAgY292ZXIgNQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzQxLTM0NgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IGxpc3RpbmdBcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IEdsb2JhbC5taW5CYWxhbmNlICsgY29zdC5kaXNidXJzZW1lbnQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozNDMKICAgIC8vIHJlY2VpdmVyOiBsaXN0aW5nQXBwLmFkZHJlc3MsCiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjM0NAogICAgLy8gYW1vdW50OiBHbG9iYWwubWluQmFsYW5jZSArIGNvc3QuZGlzYnVyc2VtZW50CiAgICBnbG9iYWwgTWluQmFsYW5jZQogICAgdW5jb3ZlciA1CiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgKwogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjM0MS0zNDUKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBsaXN0aW5nQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBHbG9iYWwubWluQmFsYW5jZSArIGNvc3QuZGlzYnVyc2VtZW50CiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozNDEtMzQ2CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogbGlzdGluZ0FwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogR2xvYmFsLm1pbkJhbGFuY2UgKyBjb3N0LmRpc2J1cnNlbWVudAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozNDktMzU4CiAgICAvLyBsaXN0aW5nLmNhbGwub3B0aW4oewogICAgLy8gICBhcHBJZDogbGlzdGluZ0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogbGlzdGluZ0FwcC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UsCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgYXNzZXRYZmVyLnhmZXJBc3NldC5pZCwKICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozNTMKICAgIC8vIHJlY2VpdmVyOiBsaXN0aW5nQXBwLmFkZHJlc3MsCiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjM1NAogICAgLy8gYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UsCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozNTItMzU1CiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogbGlzdGluZ0FwcC5hZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSwKICAgIC8vIH0pLAogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzQ5LTM1OAogICAgLy8gbGlzdGluZy5jYWxsLm9wdGluKHsKICAgIC8vICAgYXBwSWQ6IGxpc3RpbmdBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGxpc3RpbmdBcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlLAogICAgLy8gICAgIH0pLAogICAgLy8gICAgIGFzc2V0WGZlci54ZmVyQXNzZXQuaWQsCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBPbkNvbXBsZXRpb24KICAgIGR1cAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBieXRlYyAxNiAvLyBtZXRob2QgIm9wdGluKHBheSx1aW50NjQpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjM2MS0zNjcKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IGxpc3RpbmdBcHAuYWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogYXNzZXRYZmVyLmFzc2V0QW1vdW50LAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXRYZmVyLnhmZXJBc3NldCwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozNjMKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IGxpc3RpbmdBcHAuYWRkcmVzcywKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzYxLTM2NgogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogbGlzdGluZ0FwcC5hZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhc3NldFhmZXIuYXNzZXRBbW91bnQsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldFhmZXIueGZlckFzc2V0LAogICAgLy8gICB9KQogICAgcHVzaGludCA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjM2MS0zNjcKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IGxpc3RpbmdBcHAuYWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogYXNzZXRYZmVyLmFzc2V0QW1vdW50LAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXRYZmVyLnhmZXJBc3NldCwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzY5CiAgICAvLyBpZiAoIWlzQWxnb1BheW1lbnQpIHsKICAgIGZyYW1lX2RpZyAtOQogICAgYnogbGlzdEltcGxfYWZ0ZXJfaWZfZWxzZUAyMwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzcxLTM4MAogICAgLy8gbGlzdGluZy5jYWxsLm9wdGluKHsKICAgIC8vICAgYXBwSWQ6IGxpc3RpbmdBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGxpc3RpbmdBcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlLAogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHBheW1lbnRBc3NldCwKICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozNzUKICAgIC8vIHJlY2VpdmVyOiBsaXN0aW5nQXBwLmFkZHJlc3MsCiAgICBkdXBuIDIKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjM3NgogICAgLy8gYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UsCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozNzQtMzc3CiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogbGlzdGluZ0FwcC5hZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSwKICAgIC8vIH0pLAogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzcxLTM4MAogICAgLy8gbGlzdGluZy5jYWxsLm9wdGluKHsKICAgIC8vICAgYXBwSWQ6IGxpc3RpbmdBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGxpc3RpbmdBcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlLAogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHBheW1lbnRBc3NldCwKICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIE9uQ29tcGxldGlvbgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBieXRlYyAxNiAvLyBtZXRob2QgIm9wdGluKHBheSx1aW50NjQpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozODMKICAgIC8vIGlmICghdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcy5pc09wdGVkSW4oQXNzZXQocGF5bWVudEFzc2V0KSkpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlY18yIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozODMKICAgIC8vIGlmICghdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcy5pc09wdGVkSW4oQXNzZXQocGF5bWVudEFzc2V0KSkpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzMgLy8gMgogICAgZXh0cmFjdF91aW50NjQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGZyYW1lX2RpZyAtOQogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJueiBsaXN0SW1wbF9hZnRlcl9pZl9lbHNlQDIzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozODQKICAgIC8vIHRoaXMub3B0QWtpdGFFc2Nyb3dJbkFuZFNlbmQoQXNzZXQocGF5bWVudEFzc2V0KSwgMCkKICAgIGZyYW1lX2RpZyAtOQogICAgaW50Y18wIC8vIDAKICAgIGNhbGxzdWIgb3B0QWtpdGFFc2Nyb3dJbkFuZFNlbmQKICAgIHBvcAoKbGlzdEltcGxfYWZ0ZXJfaWZfZWxzZUAyMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjM4OAogICAgLy8gcmV0dXJuIGxpc3RpbmdBcHAuaWQKICAgIGZyYW1lX2RpZyAtMwogICAgZnJhbWVfYnVyeSAxCiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKbGlzdEltcGxfYWZ0ZXJfaWZfZWxzZUAyNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTUzLTU2MwogICAgLy8gY29uc3QgY3JlYXRvclJveWFsdHlTdHJpbmcgPSBhYmlDYWxsPHR5cGVvZiBNZXRhLnByb3RvdHlwZS52ZXJpZmllZE11c3RSZWFkPih7CiAgICAvLyAgIGFwcElkOiBnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLm1ldGFNZXJrbGVzLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgYXNzZXQuY3JlYXRvciwKICAgIC8vICAgICBuYW1lLAogICAgLy8gICAgIHNoYTI1NihzaGEyNTYoaXRvYihhc3NldC5pZCkpKSwKICAgIC8vICAgICBwcm9vZiwKICAgIC8vICAgICAxLAogICAgLy8gICAgICdyb3lhbHR5JywKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTU2CiAgICAvLyBhc3NldC5jcmVhdG9yLAogICAgZHVwbiAyCiAgICBhc3NldF9wYXJhbXNfZ2V0IEFzc2V0Q3JlYXRvcgogICAgYXNzZXJ0IC8vIGFzc2V0IGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NTcKICAgIC8vIG5hbWUsCiAgICBmcmFtZV9kaWcgLTQKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIGZyYW1lX2RpZyAtNAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU1OAogICAgLy8gc2hhMjU2KHNoYTI1NihpdG9iKGFzc2V0LmlkKSkpLAogICAgdW5jb3ZlciAyCiAgICBpdG9iCiAgICBzaGEyNTYKICAgIHNoYTI1NgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NjAKICAgIC8vIDEsCiAgICBpbnRjXzEgLy8gMQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMTIKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0KSkKICAgIHVuY292ZXIgNQogICAgYnl0ZWMgNCAvLyAiYWFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NTQKICAgIC8vIGFwcElkOiBnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLm1ldGFNZXJrbGVzLAogICAgcHVzaGludCA3MgogICAgZXh0cmFjdF91aW50NjQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NTMtNTYzCiAgICAvLyBjb25zdCBjcmVhdG9yUm95YWx0eVN0cmluZyA9IGFiaUNhbGw8dHlwZW9mIE1ldGEucHJvdG90eXBlLnZlcmlmaWVkTXVzdFJlYWQ+KHsKICAgIC8vICAgYXBwSWQ6IGdldEFraXRhQXBwTGlzdChha2l0YURBTykubWV0YU1lcmtsZXMsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBhc3NldC5jcmVhdG9yLAogICAgLy8gICAgIG5hbWUsCiAgICAvLyAgICAgc2hhMjU2KHNoYTI1NihpdG9iKGFzc2V0LmlkKSkpLAogICAgLy8gICAgIHByb29mLAogICAgLy8gICAgIDEsCiAgICAvLyAgICAgJ3JveWFsdHknLAogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgcHVzaGJ5dGVzIDB4MWZmN2M3NGMgLy8gbWV0aG9kICJ2ZXJpZmllZE11c3RSZWFkKGFkZHJlc3Msc3RyaW5nLGJ5dGVbMzJdLGJ5dGVbMzJdW10sdWludDY0LHN0cmluZylzdHJpbmciCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGZyYW1lX2RpZyAtMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU2MQogICAgLy8gJ3JveWFsdHknLAogICAgcHVzaGJ5dGVzIDB4MDAwNzcyNmY3OTYxNmM3NDc5CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NTMtNTYzCiAgICAvLyBjb25zdCBjcmVhdG9yUm95YWx0eVN0cmluZyA9IGFiaUNhbGw8dHlwZW9mIE1ldGEucHJvdG90eXBlLnZlcmlmaWVkTXVzdFJlYWQ+KHsKICAgIC8vICAgYXBwSWQ6IGdldEFraXRhQXBwTGlzdChha2l0YURBTykubWV0YU1lcmtsZXMsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBhc3NldC5jcmVhdG9yLAogICAgLy8gICAgIG5hbWUsCiAgICAvLyAgICAgc2hhMjU2KHNoYTI1NihpdG9iKGFzc2V0LmlkKSkpLAogICAgLy8gICAgIHByb29mLAogICAgLy8gICAgIDEsCiAgICAvLyAgICAgJ3JveWFsdHknLAogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgZGlnIDEKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlY18zIC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIHN3YXAKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc3RyaW5nCiAgICBleHRyYWN0IDYgMAogICAgZHVwCiAgICBmcmFtZV9idXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTY1CiAgICAvLyBpZiAoQnl0ZXMoY3JlYXRvclJveWFsdHlTdHJpbmcpLmxlbmd0aCA+IDApIHsKICAgIGxlbgogICAgYnogbGlzdEltcGxfYWZ0ZXJfaWZfZWxzZUAyOAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NjYKICAgIC8vIGNyZWF0b3JSb3lhbHR5ID0gYnRvaShCeXRlcyhjcmVhdG9yUm95YWx0eVN0cmluZykpCiAgICBmcmFtZV9kaWcgMQogICAgYnRvaQogICAgZnJhbWVfYnVyeSAyCgpsaXN0SW1wbF9hZnRlcl9pZl9lbHNlQDI4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NjkKICAgIC8vIGlmIChjcmVhdG9yUm95YWx0eSA+IENyZWF0b3JSb3lhbHR5TWF4aW11bVNpbmdsZSkgewogICAgZnJhbWVfZGlnIDIKICAgIGludGMgNyAvLyA1MDAwMAogICAgPgogICAgYnogbGlzdEltcGxfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpyb3lhbHRpZXNAMzEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTcwCiAgICAvLyByZXR1cm4gQ3JlYXRvclJveWFsdHlNYXhpbXVtU2luZ2xlCiAgICBpbnRjIDcgLy8gNTAwMDAKICAgIGZyYW1lX2J1cnkgMgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzAwCiAgICAvLyBjb25zdCBjcmVhdG9yUm95YWx0eSA9IHJveWFsdGllcyh0aGlzLmFraXRhREFPLnZhbHVlLCBhc3NldFhmZXIueGZlckFzc2V0LCBuYW1lLCBwcm9vZikKICAgIGIgbGlzdEltcGxfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpyb3lhbHRpZXNAMzEKCgovLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo6TWFya2V0cGxhY2UubGlzdFByaXplQm94SW1wbChwcml6ZUJveFRyYW5zZmVyVHhuOiB1aW50NjQsIHBheW1lbnQ6IHVpbnQ2NCwgcHJpY2U6IHVpbnQ2NCwgcGF5bWVudEFzc2V0OiB1aW50NjQsIGV4cGlyYXRpb246IHVpbnQ2NCwgcmVzZXJ2ZWRGb3I6IGJ5dGVzLCBnYXRlSUQ6IHVpbnQ2NCwgbWFya2V0cGxhY2U6IGJ5dGVzLCBzZWxsZXJSZWZlcnJlcjogYnl0ZXMsIGxlZ2FjeVBheW1lbnQ6IHVpbnQ2NCkgLT4gdWludDY0OgpsaXN0UHJpemVCb3hJbXBsOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzkyLTQwMwogICAgLy8gcHJpdmF0ZSBsaXN0UHJpemVCb3hJbXBsKAogICAgLy8gICBwcml6ZUJveFRyYW5zZmVyVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBwcmljZTogdWludDY0LAogICAgLy8gICBwYXltZW50QXNzZXQ6IHVpbnQ2NCwKICAgIC8vICAgZXhwaXJhdGlvbjogdWludDY0LAogICAgLy8gICByZXNlcnZlZEZvcjogQWNjb3VudCwKICAgIC8vICAgZ2F0ZUlEOiB1aW50NjQsCiAgICAvLyAgIG1hcmtldHBsYWNlOiBBY2NvdW50LAogICAgLy8gICBzZWxsZXJSZWZlcnJlcjogQWNjb3VudCwKICAgIC8vICAgbGVnYWN5UGF5bWVudDogYm9vbGVhbgogICAgLy8gKTogdWludDY0IHsKICAgIHByb3RvIDEwIDEKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0MDQKICAgIC8vIGxvZ2dlZEFzc2VydChwcmljZSA+PSBMaXN0aW5nTWluaW11bVByaWNlLCBlcnJQcmljZVRvb0xvdykKICAgIGZyYW1lX2RpZyAtOAogICAgcHVzaGludCA0CiAgICA+PQogICAgYm56IGxpc3RQcml6ZUJveEltcGxfYWZ0ZXJfYXNzZXJ0QDIKICAgIGJ5dGVjIDI4IC8vICJFUlI6ZXJyUHJsbyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJQcmxvCgpsaXN0UHJpemVCb3hJbXBsX2FmdGVyX2Fzc2VydEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjYKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQwNQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYm94ZWRDb250cmFjdC5leGlzdHMsIGVyckNvbnRyYWN0Tm90U2V0KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogbGlzdFByaXplQm94SW1wbF9hZnRlcl9hc3NlcnRANAogICAgYnl0ZWMgOCAvLyAiRVJSOmVyckNuc3QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQ25zdAoKbGlzdFByaXplQm94SW1wbF9hZnRlcl9hc3NlcnRANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQwOAogICAgLy8gcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgUHJpemVCb3gucHJvdG90eXBlLnRyYW5zZmVyPigpICYmCiAgICBmcmFtZV9kaWcgLTEwCiAgICBndHhuc2EgQXBwbGljYXRpb25BcmdzIDAKICAgIGJ5dGVjIDMxIC8vIG1ldGhvZCAidHJhbnNmZXIoYWRkcmVzcyl2b2lkIgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQwOC00MDkKICAgIC8vIHByaXplQm94VHJhbnNmZXJUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIFByaXplQm94LnByb3RvdHlwZS50cmFuc2Zlcj4oKSAmJgogICAgLy8gcHJpemVCb3hUcmFuc2ZlclR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcAogICAgYnogbGlzdFByaXplQm94SW1wbF9ib29sX2ZhbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQwOQogICAgLy8gcHJpemVCb3hUcmFuc2ZlclR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcAogICAgZnJhbWVfZGlnIC0xMAogICAgZ3R4bnMgT25Db21wbGV0aW9uCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0MDgtNDA5CiAgICAvLyBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBQcml6ZUJveC5wcm90b3R5cGUudHJhbnNmZXI+KCkgJiYKICAgIC8vIHByaXplQm94VHJhbnNmZXJUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AKICAgIGJueiBsaXN0UHJpemVCb3hJbXBsX2Jvb2xfZmFsc2VANwogICAgaW50Y18xIC8vIDEKCmxpc3RQcml6ZUJveEltcGxfYm9vbF9tZXJnZUA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDA3LTQxMAogICAgLy8gbG9nZ2VkQXNzZXJ0KCgKICAgIC8vICAgcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgUHJpemVCb3gucHJvdG90eXBlLnRyYW5zZmVyPigpICYmCiAgICAvLyAgIHByaXplQm94VHJhbnNmZXJUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AKICAgIC8vICksIGVyckJhZE1ldGhvZFByaXplQm94VHJhbnNmZXJOZWVkZWQpCiAgICBibnogbGlzdFByaXplQm94SW1wbF9hZnRlcl9hc3NlcnRAMTAKICAgIHB1c2hieXRlcyAiRVJSOmVyckJtcHQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQm1wdAoKbGlzdFByaXplQm94SW1wbF9hZnRlcl9hc3NlcnRAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0MTIKICAgIC8vIGxvZ2dlZEFzc2VydChwcml6ZUJveFRyYW5zZmVyVHhuLnNlbmRlciA9PT0gVHhuLnNlbmRlciwgZXJyTm90UHJpemVCb3hPd25lcikKICAgIGZyYW1lX2RpZyAtMTAKICAgIGd0eG5zIFNlbmRlcgogICAgdHhuIFNlbmRlcgogICAgPT0KICAgIGJueiBsaXN0UHJpemVCb3hJbXBsX2FmdGVyX2Fzc2VydEAxMgogICAgYnl0ZWMgMzIgLy8gIkVSUjplcnJOcGJvIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5wYm8KCmxpc3RQcml6ZUJveEltcGxfYWZ0ZXJfYXNzZXJ0QDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDEzCiAgICAvLyBsb2dnZWRBc3NlcnQoZ2V0UHJpemVCb3hPd25lcih0aGlzLmFraXRhREFPLnZhbHVlLCBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcElkKSA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyck5vdFByaXplQm94T3duZXIpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDEzCiAgICAvLyBsb2dnZWRBc3NlcnQoZ2V0UHJpemVCb3hPd25lcih0aGlzLmFraXRhREFPLnZhbHVlLCBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcElkKSA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyck5vdFByaXplQm94T3duZXIpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZnJhbWVfZGlnIC0xMAogICAgZ3R4bnMgQXBwbGljYXRpb25JRAogICAgZHVwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU3NwogICAgLy8gYXNzZXJ0KHByaXplQm94LmNyZWF0b3IgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykucHJpemVCb3gpLmFkZHJlc3MsIGVyck5vdEFQcml6ZUJveCkKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQ3JlYXRvcgogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMTIKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0KSkKICAgIHVuY292ZXIgMgogICAgYnl0ZWMgNCAvLyAiYWFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NzcKICAgIC8vIGFzc2VydChwcml6ZUJveC5jcmVhdG9yID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLnByaXplQm94KS5hZGRyZXNzLCBlcnJOb3RBUHJpemVCb3gpCiAgICBwdXNoaW50IDI0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGFzc2VydCAvLyBlcnJOYXBiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU3OAogICAgLy8gY29uc3QgW293bmVyQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMocHJpemVCb3gsIEJ5dGVzKFByaXplQm94R2xvYmFsU3RhdGVLZXlPd25lcikpCiAgICBwdXNoYnl0ZXMgIm93bmVyIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDEzCiAgICAvLyBsb2dnZWRBc3NlcnQoZ2V0UHJpemVCb3hPd25lcih0aGlzLmFraXRhREFPLnZhbHVlLCBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcElkKSA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyck5vdFByaXplQm94T3duZXIpCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBsaXN0UHJpemVCb3hJbXBsX2FmdGVyX2Fzc2VydEAxNAogICAgYnl0ZWMgMzIgLy8gIkVSUjplcnJOcGJvIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5wYm8KCmxpc3RQcml6ZUJveEltcGxfYWZ0ZXJfYXNzZXJ0QDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDE1CiAgICAvLyBjb25zdCBpc0FsZ29QYXltZW50ID0gcGF5bWVudEFzc2V0ID09PSAwCiAgICBmcmFtZV9kaWcgLTcKICAgICEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQxNgogICAgLy8gY29uc3QgY29zdCA9IGNsb25lKHRoaXMubGlzdGluZ0Nvc3QoMCwgcGF5bWVudEFzc2V0LCB0cnVlKSkKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9kaWcgLTcKICAgIGludGNfMSAvLyAxCiAgICBjYWxsc3ViIGxpc3RpbmdDb3N0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0MTgKICAgIC8vIGNvbnN0IGZsb2F0ID0gdGhpcy5hc3NlcnRMaXN0aW5nUGF5bWVudChwYXltZW50LCBjb3N0LCBpc0FsZ29QYXltZW50LCB0cnVlLCBsZWdhY3lQYXltZW50KQogICAgZnJhbWVfZGlnIC05CiAgICBzd2FwCiAgICB1bmNvdmVyIDIKICAgIGludGNfMSAvLyAxCiAgICBmcmFtZV9kaWcgLTEKICAgIGNhbGxzdWIgYXNzZXJ0TGlzdGluZ1BheW1lbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQyMy00NTMKICAgIC8vIGNvbnN0IGxpc3RpbmdBcHAgPSBsaXN0aW5nLmNhbGwKICAgIC8vICAgLmNyZWF0ZSh7CiAgICAvLyAgICAgYXJnczogWwogICAgLy8gICAgICAgcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBJZC5pZCwKICAgIC8vICAgICAgIHRydWUsCiAgICAvLyAgICAgICBwcmljZSwKICAgIC8vICAgICAgIHBheW1lbnRBc3NldCwKICAgIC8vICAgICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgICAgeyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiBwYXltZW50LmFtb3VudCAtIGNvc3QuZXNjcm93T3B0SW4gfSwKICAgIC8vICAgICAgIHJlc2VydmVkRm9yLAogICAgLy8gICAgICAgMCwKICAgIC8vICAgICAgIGdhdGVJRCwKICAgIC8vICAgICAgIG1hcmtldHBsYWNlLAogICAgLy8gICAgICAgdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSwKICAgIC8vICAgICAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgICAgICB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLAogICAgLy8gICAgICAgMCwKICAgIC8vICAgICAgIHNlbGxlclJlZmVycmVyLAogICAgLy8gICAgICAgZmxvYXQsCiAgICAvLyAgICAgXSwKICAgIC8vICAgICAvLyBCb3hlZCBhcHByb3ZhbCBwcm9ncmFtIGluIHVwIHRvIGZvdXIgNCBLQiBjaHVua3MgKEFWTSAxMzogdXAgdG8gMTYgS0IpLgogICAgLy8gICAgIGFwcHJvdmFsUHJvZ3JhbTogWwogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMCksCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygxKSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDIpLAogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMyksCiAgICAvLyAgICAgXSwKICAgIC8vICAgICBjbGVhclN0YXRlUHJvZ3JhbTogbGlzdGluZy5jbGVhclN0YXRlUHJvZ3JhbSwKICAgIC8vICAgICBleHRyYVByb2dyYW1QYWdlczogdGhpcy5jaGlsZEV4dHJhUGFnZXNBdExlYXN0KGxpc3RpbmcuY2xlYXJTdGF0ZVByb2dyYW0ubGVuZ3RoLCBsaXN0aW5nLmV4dHJhUHJvZ3JhbVBhZ2VzKSwKICAgIC8vICAgfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQyNgogICAgLy8gcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBJZC5pZCwKICAgIGRpZyAyCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0MjgKICAgIC8vIHByaWNlLAogICAgZnJhbWVfZGlnIC04CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0MjkKICAgIC8vIHBheW1lbnRBc3NldCwKICAgIGZyYW1lX2RpZyAtNwogICAgaXRvYgogICAgZHVwCiAgICBjb3ZlciA0CiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQzMAogICAgLy8gZXhwaXJhdGlvbiwKICAgIGZyYW1lX2RpZyAtNgogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDMxCiAgICAvLyBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDMyCiAgICAvLyB7IGFjY291bnQ6IHBheW1lbnQuc2VuZGVyLCBhbW91bnQ6IHBheW1lbnQuYW1vdW50IC0gY29zdC5lc2Nyb3dPcHRJbiB9LAogICAgZnJhbWVfZGlnIC05CiAgICBndHhucyBTZW5kZXIKICAgIGZyYW1lX2RpZyAtOQogICAgZ3R4bnMgQW1vdW50CiAgICBkaWcgNgogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICAtCiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQzNAogICAgLy8gMCwKICAgIGludGNfMCAvLyAwCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0MzUKICAgIC8vIGdhdGVJRCwKICAgIGZyYW1lX2RpZyAtNAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDM3CiAgICAvLyB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjYyCiAgICAvLyBjaGlsZENvbnRyYWN0VmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEJhc2VGYWN0b3J5R2xvYmFsU3RhdGVLZXlDaGlsZENvbnRyYWN0VmVyc2lvbiB9KQogICAgYnl0ZWMgOSAvLyAiY2hpbGRfY29udHJhY3RfdmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQzNwogICAgLy8gdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDM4CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQzOAogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0MzkKICAgIC8vIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWNfMiAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDM5CiAgICAvLyB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQ0MgogICAgLy8gZmxvYXQsCiAgICB1bmNvdmVyIDEyCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0NDAtNDQyCiAgICAvLyAwLAogICAgLy8gc2VsbGVyUmVmZXJyZXIsCiAgICAvLyBmbG9hdCwKICAgIGRpZyA1CiAgICBmcmFtZV9kaWcgLTIKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0NDYKICAgIC8vIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDApLAogICAgaW50Y18wIC8vIDAKICAgIGNhbGxzdWIgY2hpbGRBcHByb3ZhbENodW5rCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0NDcKICAgIC8vIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDEpLAogICAgaW50Y18xIC8vIDEKICAgIGNhbGxzdWIgY2hpbGRBcHByb3ZhbENodW5rCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0NDgKICAgIC8vIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDIpLAogICAgaW50Y18zIC8vIDIKICAgIGNhbGxzdWIgY2hpbGRBcHByb3ZhbENodW5rCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0NDkKICAgIC8vIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDMpLAogICAgcHVzaGludCAzCiAgICBjYWxsc3ViIGNoaWxkQXBwcm92YWxDaHVuawogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDUyCiAgICAvLyBleHRyYVByb2dyYW1QYWdlczogdGhpcy5jaGlsZEV4dHJhUGFnZXNBdExlYXN0KGxpc3RpbmcuY2xlYXJTdGF0ZVByb2dyYW0ubGVuZ3RoLCBsaXN0aW5nLmV4dHJhUHJvZ3JhbVBhZ2VzKSwKICAgIHB1c2hpbnQgNAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDIwCiAgICAvLyBjb25zdCBsaXN0aW5nID0gY29tcGlsZUFyYzQoTGlzdGluZykKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0NTIKICAgIC8vIGV4dHJhUHJvZ3JhbVBhZ2VzOiB0aGlzLmNoaWxkRXh0cmFQYWdlc0F0TGVhc3QobGlzdGluZy5jbGVhclN0YXRlUHJvZ3JhbS5sZW5ndGgsIGxpc3RpbmcuZXh0cmFQcm9ncmFtUGFnZXMpLAogICAgY2FsbHN1YiBjaGlsZEV4dHJhUGFnZXNBdExlYXN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0MjAKICAgIC8vIGNvbnN0IGxpc3RpbmcgPSBjb21waWxlQXJjNChMaXN0aW5nKQogICAgcHVzaGludCA3CiAgICBpdHhuX2ZpZWxkIEdsb2JhbE51bUJ5dGVTbGljZQogICAgcHVzaGludCAxMwogICAgaXR4bl9maWVsZCBHbG9iYWxOdW1VaW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0MjMtNDUzCiAgICAvLyBjb25zdCBsaXN0aW5nQXBwID0gbGlzdGluZy5jYWxsCiAgICAvLyAgIC5jcmVhdGUoewogICAgLy8gICAgIGFyZ3M6IFsKICAgIC8vICAgICAgIHByaXplQm94VHJhbnNmZXJUeG4uYXBwSWQuaWQsCiAgICAvLyAgICAgICB0cnVlLAogICAgLy8gICAgICAgcHJpY2UsCiAgICAvLyAgICAgICBwYXltZW50QXNzZXQsCiAgICAvLyAgICAgICBleHBpcmF0aW9uLAogICAgLy8gICAgICAgVHhuLnNlbmRlciwKICAgIC8vICAgICAgIHsgYWNjb3VudDogcGF5bWVudC5zZW5kZXIsIGFtb3VudDogcGF5bWVudC5hbW91bnQgLSBjb3N0LmVzY3Jvd09wdEluIH0sCiAgICAvLyAgICAgICByZXNlcnZlZEZvciwKICAgIC8vICAgICAgIDAsCiAgICAvLyAgICAgICBnYXRlSUQsCiAgICAvLyAgICAgICBtYXJrZXRwbGFjZSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRDb250cmFjdFZlcnNpb24udmFsdWUsCiAgICAvLyAgICAgICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICAgICAgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSwKICAgIC8vICAgICAgIDAsCiAgICAvLyAgICAgICBzZWxsZXJSZWZlcnJlciwKICAgIC8vICAgICAgIGZsb2F0LAogICAgLy8gICAgIF0sCiAgICAvLyAgICAgLy8gQm94ZWQgYXBwcm92YWwgcHJvZ3JhbSBpbiB1cCB0byBmb3VyIDQgS0IgY2h1bmtzIChBVk0gMTM6IHVwIHRvIDE2IEtCKS4KICAgIC8vICAgICBhcHByb3ZhbFByb2dyYW06IFsKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDApLAogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMSksCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygyKSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDMpLAogICAgLy8gICAgIF0sCiAgICAvLyAgICAgY2xlYXJTdGF0ZVByb2dyYW06IGxpc3RpbmcuY2xlYXJTdGF0ZVByb2dyYW0sCiAgICAvLyAgICAgZXh0cmFQcm9ncmFtUGFnZXM6IHRoaXMuY2hpbGRFeHRyYVBhZ2VzQXRMZWFzdChsaXN0aW5nLmNsZWFyU3RhdGVQcm9ncmFtLmxlbmd0aCwgbGlzdGluZy5leHRyYVByb2dyYW1QYWdlcyksCiAgICAvLyAgIH0pCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBPbkNvbXBsZXRpb24KICAgIGl0eG5fZmllbGQgRXh0cmFQcm9ncmFtUGFnZXMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQyMAogICAgLy8gY29uc3QgbGlzdGluZyA9IGNvbXBpbGVBcmM0KExpc3RpbmcpCiAgICBieXRlYyAyOSAvLyBiYXNlNjQoQzRFQlF3PT0pCiAgICBpdHhuX2ZpZWxkIENsZWFyU3RhdGVQcm9ncmFtUGFnZXMKICAgIHVuY292ZXIgMwogICAgaXR4bl9maWVsZCBBcHByb3ZhbFByb2dyYW1QYWdlcwogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcHJvdmFsUHJvZ3JhbVBhZ2VzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcHJvdmFsUHJvZ3JhbVBhZ2VzCiAgICBpdHhuX2ZpZWxkIEFwcHJvdmFsUHJvZ3JhbVBhZ2VzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0MjMtNDUzCiAgICAvLyBjb25zdCBsaXN0aW5nQXBwID0gbGlzdGluZy5jYWxsCiAgICAvLyAgIC5jcmVhdGUoewogICAgLy8gICAgIGFyZ3M6IFsKICAgIC8vICAgICAgIHByaXplQm94VHJhbnNmZXJUeG4uYXBwSWQuaWQsCiAgICAvLyAgICAgICB0cnVlLAogICAgLy8gICAgICAgcHJpY2UsCiAgICAvLyAgICAgICBwYXltZW50QXNzZXQsCiAgICAvLyAgICAgICBleHBpcmF0aW9uLAogICAgLy8gICAgICAgVHhuLnNlbmRlciwKICAgIC8vICAgICAgIHsgYWNjb3VudDogcGF5bWVudC5zZW5kZXIsIGFtb3VudDogcGF5bWVudC5hbW91bnQgLSBjb3N0LmVzY3Jvd09wdEluIH0sCiAgICAvLyAgICAgICByZXNlcnZlZEZvciwKICAgIC8vICAgICAgIDAsCiAgICAvLyAgICAgICBnYXRlSUQsCiAgICAvLyAgICAgICBtYXJrZXRwbGFjZSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRDb250cmFjdFZlcnNpb24udmFsdWUsCiAgICAvLyAgICAgICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICAgICAgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSwKICAgIC8vICAgICAgIDAsCiAgICAvLyAgICAgICBzZWxsZXJSZWZlcnJlciwKICAgIC8vICAgICAgIGZsb2F0LAogICAgLy8gICAgIF0sCiAgICAvLyAgICAgLy8gQm94ZWQgYXBwcm92YWwgcHJvZ3JhbSBpbiB1cCB0byBmb3VyIDQgS0IgY2h1bmtzIChBVk0gMTM6IHVwIHRvIDE2IEtCKS4KICAgIC8vICAgICBhcHByb3ZhbFByb2dyYW06IFsKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDApLAogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMSksCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygyKSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDMpLAogICAgLy8gICAgIF0sCiAgICAvLyAgICAgY2xlYXJTdGF0ZVByb2dyYW06IGxpc3RpbmcuY2xlYXJTdGF0ZVByb2dyYW0sCiAgICAvLyAgICAgZXh0cmFQcm9ncmFtUGFnZXM6IHRoaXMuY2hpbGRFeHRyYVBhZ2VzQXRMZWFzdChsaXN0aW5nLmNsZWFyU3RhdGVQcm9ncmFtLmxlbmd0aCwgbGlzdGluZy5leHRyYVByb2dyYW1QYWdlcyksCiAgICAvLyAgIH0pCiAgICBieXRlYyAzMCAvLyBtZXRob2QgImNyZWF0ZSh1aW50NjQsYm9vbCx1aW50NjQsdWludDY0LHVpbnQ2NCxhZGRyZXNzLChhZGRyZXNzLHVpbnQ2NCksYWRkcmVzcyx1aW50NjQsdWludDY0LGFkZHJlc3Msc3RyaW5nLHVpbnQ2NCwoc3RyaW5nLHVpbnQ2NCksdWludDY0LGFkZHJlc3MsdWludDY0KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAxMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQyNwogICAgLy8gdHJ1ZSwKICAgIHB1c2hieXRlcyAweDgwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciA5CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAxMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgOAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgNwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgNgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGZyYW1lX2RpZyAtNQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgNQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgNAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGZyYW1lX2RpZyAtMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDIzLTQ1MwogICAgLy8gY29uc3QgbGlzdGluZ0FwcCA9IGxpc3RpbmcuY2FsbAogICAgLy8gICAuY3JlYXRlKHsKICAgIC8vICAgICBhcmdzOiBbCiAgICAvLyAgICAgICBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcElkLmlkLAogICAgLy8gICAgICAgdHJ1ZSwKICAgIC8vICAgICAgIHByaWNlLAogICAgLy8gICAgICAgcGF5bWVudEFzc2V0LAogICAgLy8gICAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgICB7IGFjY291bnQ6IHBheW1lbnQuc2VuZGVyLCBhbW91bnQ6IHBheW1lbnQuYW1vdW50IC0gY29zdC5lc2Nyb3dPcHRJbiB9LAogICAgLy8gICAgICAgcmVzZXJ2ZWRGb3IsCiAgICAvLyAgICAgICAwLAogICAgLy8gICAgICAgZ2F0ZUlELAogICAgLy8gICAgICAgbWFya2V0cGxhY2UsCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlLAogICAgLy8gICAgICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgICAgIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUsCiAgICAvLyAgICAgICAwLAogICAgLy8gICAgICAgc2VsbGVyUmVmZXJyZXIsCiAgICAvLyAgICAgICBmbG9hdCwKICAgIC8vICAgICBdLAogICAgLy8gICAgIC8vIEJveGVkIGFwcHJvdmFsIHByb2dyYW0gaW4gdXAgdG8gZm91ciA0IEtCIGNodW5rcyAoQVZNIDEzOiB1cCB0byAxNiBLQikuCiAgICAvLyAgICAgYXBwcm92YWxQcm9ncmFtOiBbCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygwKSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDEpLAogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMiksCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygzKSwKICAgIC8vICAgICBdLAogICAgLy8gICAgIGNsZWFyU3RhdGVQcm9ncmFtOiBsaXN0aW5nLmNsZWFyU3RhdGVQcm9ncmFtLAogICAgLy8gICAgIGV4dHJhUHJvZ3JhbVBhZ2VzOiB0aGlzLmNoaWxkRXh0cmFQYWdlc0F0TGVhc3QobGlzdGluZy5jbGVhclN0YXRlUHJvZ3JhbS5sZW5ndGgsIGxpc3RpbmcuZXh0cmFQcm9ncmFtUGFnZXMpLAogICAgLy8gICB9KQogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQyMy00NTUKICAgIC8vIGNvbnN0IGxpc3RpbmdBcHAgPSBsaXN0aW5nLmNhbGwKICAgIC8vICAgLmNyZWF0ZSh7CiAgICAvLyAgICAgYXJnczogWwogICAgLy8gICAgICAgcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBJZC5pZCwKICAgIC8vICAgICAgIHRydWUsCiAgICAvLyAgICAgICBwcmljZSwKICAgIC8vICAgICAgIHBheW1lbnRBc3NldCwKICAgIC8vICAgICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgICAgeyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiBwYXltZW50LmFtb3VudCAtIGNvc3QuZXNjcm93T3B0SW4gfSwKICAgIC8vICAgICAgIHJlc2VydmVkRm9yLAogICAgLy8gICAgICAgMCwKICAgIC8vICAgICAgIGdhdGVJRCwKICAgIC8vICAgICAgIG1hcmtldHBsYWNlLAogICAgLy8gICAgICAgdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSwKICAgIC8vICAgICAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgICAgICB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLAogICAgLy8gICAgICAgMCwKICAgIC8vICAgICAgIHNlbGxlclJlZmVycmVyLAogICAgLy8gICAgICAgZmxvYXQsCiAgICAvLyAgICAgXSwKICAgIC8vICAgICAvLyBCb3hlZCBhcHByb3ZhbCBwcm9ncmFtIGluIHVwIHRvIGZvdXIgNCBLQiBjaHVua3MgKEFWTSAxMzogdXAgdG8gMTYgS0IpLgogICAgLy8gICAgIGFwcHJvdmFsUHJvZ3JhbTogWwogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMCksCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygxKSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDIpLAogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMyksCiAgICAvLyAgICAgXSwKICAgIC8vICAgICBjbGVhclN0YXRlUHJvZ3JhbTogbGlzdGluZy5jbGVhclN0YXRlUHJvZ3JhbSwKICAgIC8vICAgICBleHRyYVByb2dyYW1QYWdlczogdGhpcy5jaGlsZEV4dHJhUGFnZXNBdExlYXN0KGxpc3RpbmcuY2xlYXJTdGF0ZVByb2dyYW0ubGVuZ3RoLCBsaXN0aW5nLmV4dHJhUHJvZ3JhbVBhZ2VzKSwKICAgIC8vICAgfSkKICAgIC8vICAgLml0eG4KICAgIC8vICAgLmNyZWF0ZWRBcHAKICAgIGdpdHhuIDAgQ3JlYXRlZEFwcGxpY2F0aW9uSUQKICAgIGR1cAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDU4LTQ2MwogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IGxpc3RpbmdBcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IEdsb2JhbC5taW5CYWxhbmNlICsgY29zdC5kaXNidXJzZW1lbnQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0NjAKICAgIC8vIHJlY2VpdmVyOiBsaXN0aW5nQXBwLmFkZHJlc3MsCiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQ2MQogICAgLy8gYW1vdW50OiBHbG9iYWwubWluQmFsYW5jZSArIGNvc3QuZGlzYnVyc2VtZW50CiAgICBnbG9iYWwgTWluQmFsYW5jZQogICAgdW5jb3ZlciAzCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgKwogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQ1OC00NjIKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBsaXN0aW5nQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBHbG9iYWwubWluQmFsYW5jZSArIGNvc3QuZGlzYnVyc2VtZW50CiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0NTgtNDYzCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogbGlzdGluZ0FwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogR2xvYmFsLm1pbkJhbGFuY2UgKyBjb3N0LmRpc2J1cnNlbWVudAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0NjYtNDY5CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBQcml6ZUJveC5wcm90b3R5cGUudHJhbnNmZXI+KHsKICAgIC8vICAgYXBwSWQ6IHByaXplQm94VHJhbnNmZXJUeG4uYXBwSWQsCiAgICAvLyAgIGFyZ3M6IFtsaXN0aW5nQXBwLmFkZHJlc3NdLAogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQ2OAogICAgLy8gYXJnczogW2xpc3RpbmdBcHAuYWRkcmVzc10sCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQ2Ni00NjkKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFByaXplQm94LnByb3RvdHlwZS50cmFuc2Zlcj4oewogICAgLy8gICBhcHBJZDogcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBJZCwKICAgIC8vICAgYXJnczogW2xpc3RpbmdBcHAuYWRkcmVzc10sCiAgICAvLyB9KQogICAgYnl0ZWMgMzEgLy8gbWV0aG9kICJ0cmFuc2ZlcihhZGRyZXNzKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0NzEKICAgIC8vIGlmICghaXNBbGdvUGF5bWVudCkgewogICAgZnJhbWVfZGlnIC03CiAgICBieiBsaXN0UHJpemVCb3hJbXBsX2FmdGVyX2lmX2Vsc2VAMjMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQ3My00ODIKICAgIC8vIGxpc3RpbmcuY2FsbC5vcHRpbih7CiAgICAvLyAgIGFwcElkOiBsaXN0aW5nQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBsaXN0aW5nQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSwKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBwYXltZW50QXNzZXQsCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDc3CiAgICAvLyByZWNlaXZlcjogbGlzdGluZ0FwcC5hZGRyZXNzLAogICAgZHVwbiAyCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0NzgKICAgIC8vIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlLAogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDc2LTQ3OQogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IGxpc3RpbmdBcHAuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UsCiAgICAvLyB9KSwKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQ3My00ODIKICAgIC8vIGxpc3RpbmcuY2FsbC5vcHRpbih7CiAgICAvLyAgIGFwcElkOiBsaXN0aW5nQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBsaXN0aW5nQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSwKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBwYXltZW50QXNzZXQsCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBPbkNvbXBsZXRpb24KICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgYnl0ZWMgMTYgLy8gbWV0aG9kICJvcHRpbihwYXksdWludDY0KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIDAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDg1CiAgICAvLyBpZiAoIXRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MuaXNPcHRlZEluKEFzc2V0KHBheW1lbnRBc3NldCkpKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWNfMiAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDg1CiAgICAvLyBpZiAoIXRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MuaXNPcHRlZEluKEFzc2V0KHBheW1lbnRBc3NldCkpKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18zIC8vIDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBmcmFtZV9kaWcgLTcKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBibnogbGlzdFByaXplQm94SW1wbF9hZnRlcl9pZl9lbHNlQDIzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0ODYKICAgIC8vIHRoaXMub3B0QWtpdGFFc2Nyb3dJbkFuZFNlbmQoQXNzZXQocGF5bWVudEFzc2V0KSwgMCkKICAgIGZyYW1lX2RpZyAtNwogICAgaW50Y18wIC8vIDAKICAgIGNhbGxzdWIgb3B0QWtpdGFFc2Nyb3dJbkFuZFNlbmQKICAgIHBvcAoKbGlzdFByaXplQm94SW1wbF9hZnRlcl9pZl9lbHNlQDIzOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDkwCiAgICAvLyByZXR1cm4gbGlzdGluZ0FwcC5pZAogICAgc3dhcAogICAgcmV0c3ViCgpsaXN0UHJpemVCb3hJbXBsX2Jvb2xfZmFsc2VANzoKICAgIGludGNfMCAvLyAwCiAgICBiIGxpc3RQcml6ZUJveEltcGxfYm9vbF9tZXJnZUA4CgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6OkZhY3RvcnlDb250cmFjdC5jaGlsZEFwcHJvdmFsQ2h1bmsoaW5kZXg6IHVpbnQ2NCkgLT4gYnl0ZXM6CmNoaWxkQXBwcm92YWxDaHVuazoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjcxCiAgICAvLyBwcm90ZWN0ZWQgY2hpbGRBcHByb3ZhbENodW5rKGluZGV4OiB1aW50NjQpOiBieXRlcyB7CiAgICBwcm90byAxIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjcyCiAgICAvLyByZXR1cm4gYm94ZWRQcm9ncmFtQ2h1bmsoQnl0ZXMoQm94S2V5Qm94ZWRDb250cmFjdCksIGluZGV4KQogICAgYnl0ZWNfMSAvLyAiYmMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJvZ3JhbXMudHM6OTIKICAgIC8vIGNvbnN0IHNpemUgPSBib3hlZFByb2dyYW1TaXplKGJveEtleSkKICAgIGNhbGxzdWIgYm94ZWRQcm9ncmFtU2l6ZQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJvZ3JhbXMudHM6OTMKICAgIC8vIGNvbnN0IG9mZnNldDogdWludDY0ID0gaW5kZXggKiBNQVhfQVZNX0JZVEVfQVJSQVlfTEVOR1RICiAgICBmcmFtZV9kaWcgLTEKICAgIGludGMgNSAvLyA0MDk2CiAgICAqCiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3Byb2dyYW1zLnRzOjk0CiAgICAvLyBpZiAob2Zmc2V0ID49IHNpemUpIHsKICAgID49CiAgICBieiBjaGlsZEFwcHJvdmFsQ2h1bmtfYWZ0ZXJfaWZfZWxzZUAzCiAgICBwb3BuIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcm9ncmFtcy50czo5NQogICAgLy8gcmV0dXJuIEJ5dGVzKCcnKQogICAgcHVzaGJ5dGVzICIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo3MgogICAgLy8gcmV0dXJuIGJveGVkUHJvZ3JhbUNodW5rKEJ5dGVzKEJveEtleUJveGVkQ29udHJhY3QpLCBpbmRleCkKICAgIHJldHN1YgoKY2hpbGRBcHByb3ZhbENodW5rX2FmdGVyX2lmX2Vsc2VAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcm9ncmFtcy50czo5NwogICAgLy8gY29uc3QgcmVtYWluaW5nOiB1aW50NjQgPSBzaXplIC0gb2Zmc2V0CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcm9ncmFtcy50czo5OAogICAgLy8gcmV0dXJuIG9wLkJveC5leHRyYWN0KGJveEtleSwgb2Zmc2V0LCByZW1haW5pbmcgPiBNQVhfQVZNX0JZVEVfQVJSQVlfTEVOR1RIID8gTUFYX0FWTV9CWVRFX0FSUkFZX0xFTkdUSCA6IHJlbWFpbmluZykKICAgIGR1cAogICAgaW50YyA1IC8vIDQwOTYKICAgID4KICAgIGludGMgNSAvLyA0MDk2CiAgICBzd2FwCiAgICBzZWxlY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjcyCiAgICAvLyByZXR1cm4gYm94ZWRQcm9ncmFtQ2h1bmsoQnl0ZXMoQm94S2V5Qm94ZWRDb250cmFjdCksIGluZGV4KQogICAgYnl0ZWNfMSAvLyAiYmMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJvZ3JhbXMudHM6OTgKICAgIC8vIHJldHVybiBvcC5Cb3guZXh0cmFjdChib3hLZXksIG9mZnNldCwgcmVtYWluaW5nID4gTUFYX0FWTV9CWVRFX0FSUkFZX0xFTkdUSCA/IE1BWF9BVk1fQllURV9BUlJBWV9MRU5HVEggOiByZW1haW5pbmcpCiAgICBjb3ZlciAyCiAgICBib3hfZXh0cmFjdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NzIKICAgIC8vIHJldHVybiBib3hlZFByb2dyYW1DaHVuayhCeXRlcyhCb3hLZXlCb3hlZENvbnRyYWN0KSwgaW5kZXgpCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo6RmFjdG9yeUNvbnRyYWN0LmNoaWxkRXh0cmFQYWdlc0F0TGVhc3QoY2xlYXJTaXplOiB1aW50NjQsIG1pbkV4dHJhUGFnZXM6IHVpbnQ2NCkgLT4gdWludDY0OgpjaGlsZEV4dHJhUGFnZXNBdExlYXN0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6ODkKICAgIC8vIHByb3RlY3RlZCBjaGlsZEV4dHJhUGFnZXNBdExlYXN0KGNsZWFyU2l6ZTogdWludDY0LCBtaW5FeHRyYVBhZ2VzOiB1aW50NjQpOiB1aW50NjQgewogICAgcHJvdG8gMiAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo3NwogICAgLy8gcmV0dXJuIGJveGVkUHJvZ3JhbVNpemUoQnl0ZXMoQm94S2V5Qm94ZWRDb250cmFjdCkpCiAgICBieXRlY18xIC8vICJiYyIKICAgIGNhbGxzdWIgYm94ZWRQcm9ncmFtU2l6ZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3Byb2dyYW1zLnRzOjMyCiAgICAvLyBjb25zdCBwYWdlczogdWludDY0ID0gKGFwcHJvdmFsU2l6ZSArIGNsZWFyU2l6ZSArIFBST0dSQU1fUEFHRV9TSVpFIC0gMSkgLyBQUk9HUkFNX1BBR0VfU0laRQogICAgZnJhbWVfZGlnIC0yCiAgICArCiAgICBwdXNoaW50IDIwNDgKICAgICsKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBwdXNoaW50IDIwNDgKICAgIC8KICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3Byb2dyYW1zLnRzOjMzCiAgICAvLyBsb2dnZWRBc3NlcnQocGFnZXMgPD0gTUFYX1BST0dSQU1fVE9UQUxfUEFHRVMsIGVyclByb2dyYW1Ub29MYXJnZSkKICAgIGludGNfMiAvLyA4CiAgICA8PQogICAgYm56IGNoaWxkRXh0cmFQYWdlc0F0TGVhc3RfYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOmVyclB0bGciCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyUHRsZwoKY2hpbGRFeHRyYVBhZ2VzQXRMZWFzdF9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcm9ncmFtcy50czo0MwogICAgLy8gY29uc3QgZXh0cmE6IHVpbnQ2NCA9IHBhZ2VzID4gMCA/IHBhZ2VzIC0gMSA6IDAKICAgIGR1cAogICAgYnogY2hpbGRFeHRyYVBhZ2VzQXRMZWFzdF90ZXJuYXJ5X2ZhbHNlQDcKICAgIGludGNfMSAvLyAxCiAgICAtCgpjaGlsZEV4dHJhUGFnZXNBdExlYXN0X3Rlcm5hcnlfbWVyZ2VAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcm9ncmFtcy50czo0NAogICAgLy8gcmV0dXJuIGV4dHJhID4gbWluRXh0cmFQYWdlcyA/IGV4dHJhIDogbWluRXh0cmFQYWdlcwogICAgZHVwCiAgICBmcmFtZV9kaWcgLTEKICAgID4KICAgIGZyYW1lX2RpZyAtMQogICAgY292ZXIgMgogICAgc2VsZWN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo5MAogICAgLy8gcmV0dXJuIHByb2dyYW1FeHRyYVBhZ2VzKHRoaXMuY2hpbGRBcHByb3ZhbFNpemUoKSwgY2xlYXJTaXplLCBtaW5FeHRyYVBhZ2VzKQogICAgcmV0c3ViCgpjaGlsZEV4dHJhUGFnZXNBdExlYXN0X3Rlcm5hcnlfZmFsc2VANzoKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3Byb2dyYW1zLnRzOjQzCiAgICAvLyBjb25zdCBleHRyYTogdWludDY0ID0gcGFnZXMgPiAwID8gcGFnZXMgLSAxIDogMAogICAgaW50Y18wIC8vIDAKICAgIGIgY2hpbGRFeHRyYVBhZ2VzQXRMZWFzdF90ZXJuYXJ5X21lcmdlQDgKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6QWtpdGFCYXNlRmVlR2VuZXJhdG9yQ29udHJhY3Qub3B0QWtpdGFFc2Nyb3dJbkFuZFNlbmQoYXNzZXQ6IHVpbnQ2NCwgYW1vdW50OiB1aW50NjQpIC0+IHVpbnQ2NDoKb3B0QWtpdGFFc2Nyb3dJbkFuZFNlbmQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4MgogICAgLy8gcHJvdGVjdGVkIG9wdEFraXRhRXNjcm93SW5BbmRTZW5kKGFzc2V0OiBBc3NldCwgYW1vdW50OiB1aW50NjQpOiB1aW50NjQgewogICAgcHJvdG8gMiAxCiAgICBwdXNoYnl0ZXMgIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkdXAKICAgIGJ5dGVjIDUgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTIyCiAgICAvLyBjb25zdCBbcGx1Z2luQXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1BsdWdpbkFwcExpc3QpKQogICAgZHVwCiAgICBieXRlYyAyNiAvLyAicGFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODUKICAgIC8vIGNvbnN0IHsgcmV2ZW51ZU1hbmFnZXIgfSA9IGdldFBsdWdpbkFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkKICAgIGR1cAogICAgZXh0cmFjdCA4IDgKICAgIGNvdmVyIDIKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODcKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGNsb25lKHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWNfMiAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODcKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGNsb25lKHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBjb3ZlciAzCiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4OAogICAgLy8gY29uc3QgeyBpZCB9ID0gdGhpcy5nZXRFc2Nyb3coZXNjcm93Lm5hbWUpCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgZGlnIDEKICAgIGxlbgogICAgc3Vic3RyaW5nMwogICAgZHVwCiAgICBjb3ZlciAzCiAgICBleHRyYWN0IDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIHN3YXAKICAgIGJ5dGVjIDUgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjYyLTY1CiAgICAvLyBjb25zdCBlc2Nyb3cgPSBhYmlDYWxsPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfZ2V0RXNjcm93cz4oewogICAgLy8gICBhcHBJZCwKICAgIC8vICAgYXJnczogW1tuYW1lXV0sCiAgICAvLyB9KS5yZXR1cm5WYWx1ZVswXQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NjQKICAgIC8vIGFyZ3M6IFtbbmFtZV1dLAogICAgaW50Y18xIC8vIDEKICAgIGl0b2IKICAgIGNvdmVyIDIKICAgIGR1cAogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgc3dhcAogICAgY29uY2F0CiAgICBwdXNoYnl0ZXMgMHgwMDAxMDAwMgogICAgc3dhcAogICAgY29uY2F0CiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjYyLTY1CiAgICAvLyBjb25zdCBlc2Nyb3cgPSBhYmlDYWxsPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfZ2V0RXNjcm93cz4oewogICAgLy8gICBhcHBJZCwKICAgIC8vICAgYXJnczogW1tuYW1lXV0sCiAgICAvLyB9KS5yZXR1cm5WYWx1ZVswXQogICAgcHVzaGJ5dGVzIDB4M2FiMjg5NWIgLy8gbWV0aG9kICJhcmM1OF9nZXRFc2Nyb3dzKHN0cmluZ1tdKSh1aW50NjQsYWRkcmVzcyxib29sKVtdIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBkaWcgMQogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjXzMgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDQxCiAgICAqCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8c21hcnRfY29udHJhY3RzL2FyYzU4L2FjY291bnQvdHlwZXMudHM6OkVzY3Jvd0luZm8+CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo2NwogICAgLy8gbG9nZ2VkQXNzZXJ0KGVzY3Jvdy5pZCAhPT0gMCwgZXJyRXNjcm93RG9lc05vdEV4aXN0KQogICAgZXh0cmFjdCA2IDQxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgYm56IG9wdEFraXRhRXNjcm93SW5BbmRTZW5kX2FmdGVyX2Fzc2VydEA5CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJOZXNjIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5lc2MKCm9wdEFraXRhRXNjcm93SW5BbmRTZW5kX2FmdGVyX2Fzc2VydEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODkKICAgIC8vIGxvZ2dlZEFzc2VydChpZCA9PT0gZXNjcm93LmFwcC5pZCwgZXJyV3JvbmdFc2Nyb3dGb3JPcGVyYXRpb24pCiAgICB1bmNvdmVyIDIKICAgIGludGNfMyAvLyAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBmcmFtZV9idXJ5IDAKICAgID09CiAgICBibnogb3B0QWtpdGFFc2Nyb3dJbkFuZFNlbmRfYWZ0ZXJfYXNzZXJ0QDIKICAgIHB1c2hieXRlcyAiRVJSOmVycldlc2MiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyV2VzYwoKb3B0QWtpdGFFc2Nyb3dJbkFuZFNlbmRfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo5MS0xMDAKICAgIC8vIGl0eG5Db21wb3NlLmJlZ2luPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfcmVrZXlUb1BsdWdpbj4oewogICAgLy8gICBhcHBJZDogd2FsbGV0LAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgcmV2ZW51ZU1hbmFnZXIsCiAgICAvLyAgICAgQ2FsbGVyVHlwZUdsb2JhbCwKICAgIC8vICAgICBlc2Nyb3cubmFtZSwKICAgIC8vICAgICBbMF0sIC8vIGFsbCB0aGUgYWtpdGEgZXNjcm93cyBoYXZlIG1ldGhvZCByZXN0cmljdGlvbnMgd2l0aCBvcHRpbiBiZWluZyBpbmRleCAwCiAgICAvLyAgICAgW10KICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICB1bmNvdmVyIDMKICAgIGR1cAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoYnl0ZXMgMHg1YWRmMzM4ZiAvLyBtZXRob2QgImFyYzU4X3Jla2V5VG9QbHVnaW4odWludDY0LHVpbnQ2NCxzdHJpbmcsdWludDY0W10sKHVpbnQ2NCx1aW50NjQpW10pdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjk3CiAgICAvLyBbMF0sIC8vIGFsbCB0aGUgYWtpdGEgZXNjcm93cyBoYXZlIG1ldGhvZCByZXN0cmljdGlvbnMgd2l0aCBvcHRpbiBiZWluZyBpbmRleCAwCiAgICBwdXNoYnl0ZXMgMHgwMDAxMDAwMDAwMDAwMDAwMDAwMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjk4CiAgICAvLyBbXQogICAgcHVzaGJ5dGVzIDB4MDAwMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjkxLTEwMAogICAgLy8gaXR4bkNvbXBvc2UuYmVnaW48dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9yZWtleVRvUGx1Z2luPih7CiAgICAvLyAgIGFwcElkOiB3YWxsZXQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgICBDYWxsZXJUeXBlR2xvYmFsLAogICAgLy8gICAgIGVzY3Jvdy5uYW1lLAogICAgLy8gICAgIFswXSwgLy8gYWxsIHRoZSBha2l0YSBlc2Nyb3dzIGhhdmUgbWV0aG9kIHJlc3RyaWN0aW9ucyB3aXRoIG9wdGluIGJlaW5nIGluZGV4IDAKICAgIC8vICAgICBbXQogICAgLy8gICBdLAogICAgLy8gfSkKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEwMwogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMDMKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTA0CiAgICAvLyBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICBmcmFtZV9kaWcgMAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMDItMTA2CiAgICAvLyBjb25zdCBvcHRJbkNvdW50ID0gc3BsaXRPcHRJbkNvdW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgIGFzc2V0CiAgICAvLyApCiAgICBmcmFtZV9kaWcgLTIKICAgIGNhbGxzdWIgc3BsaXRPcHRJbkNvdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMDgKICAgIC8vIGNvbnN0IG1ickFtb3VudDogdWludDY0ID0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogb3B0SW5Db3VudAogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICAqCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjExMC0xMjEKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIFJldmVudWVNYW5hZ2VyUGx1Z2luU3R1Yi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJldmVudWVNYW5hZ2VyLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgW2Fzc2V0LmlkXSwKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTE3CiAgICAvLyByZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgc3dhcAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjExNi0xMTkKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTEwLTEyMQogICAgLy8gaXR4bkNvbXBvc2UubmV4dDx0eXBlb2YgUmV2ZW51ZU1hbmFnZXJQbHVnaW5TdHViLnByb3RvdHlwZS5vcHRJbj4oewogICAgLy8gICBhcHBJZDogcmV2ZW51ZU1hbmFnZXIsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICB3YWxsZXQsCiAgICAvLyAgICAgdHJ1ZSwKICAgIC8vICAgICBbYXNzZXQuaWRdLAogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtYnJBbW91bnQKICAgIC8vICAgICB9KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTMKICAgIC8vIHdhbGxldCwKICAgIGR1cAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTE1CiAgICAvLyBbYXNzZXQuaWRdLAogICAgZnJhbWVfZGlnIC0yCiAgICBpdG9iCiAgICBwdXNoYnl0ZXMgMHgwMDAxCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHVuY292ZXIgNAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTAtMTIxCiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBSZXZlbnVlTWFuYWdlclBsdWdpblN0dWIucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHdhbGxldCwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIFthc3NldC5pZF0sCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gICAgIH0pCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBwdXNoYnl0ZXMgMHg2ODM1ZTNiYyAvLyBtZXRob2QgIm9wdEluKHVpbnQ2NCxib29sLHVpbnQ2NFtdLHBheSl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTQKICAgIC8vIHRydWUsCiAgICBwdXNoYnl0ZXMgMHg4MAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTAtMTIxCiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBSZXZlbnVlTWFuYWdlclBsdWdpblN0dWIucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHdhbGxldCwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIFthc3NldC5pZF0sCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gICAgIH0pCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMjMKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF92ZXJpZnlBdXRoQWRkcmVzcz4oeyBhcHBJZDogd2FsbGV0IH0pCiAgICBpdHhuX25leHQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgcHVzaGJ5dGVzIDB4NmNjM2Y2MDYgLy8gbWV0aG9kICJhcmM1OF92ZXJpZnlBdXRoQWRkcmVzcygpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMjUKICAgIC8vIGlmIChhbW91bnQgPiAwKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ6IG9wdEFraXRhRXNjcm93SW5BbmRTZW5kX2FmdGVyX2lmX2Vsc2VANAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTI2LTEzMgogICAgLy8gaXR4bkNvbXBvc2UubmV4dCgKICAgIC8vICAgaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0LAogICAgLy8gICB9KQogICAgLy8gKQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMjgKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIGZyYW1lX2RpZyAwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBmcmFtZV9kaWcgLTIKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBmcmFtZV9kaWcgLTEKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTI3LTEzMQogICAgLy8gaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgYXNzZXRSZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgLy8gICBhc3NldEFtb3VudDogYW1vdW50LAogICAgLy8gICB4ZmVyQXNzZXQ6IGFzc2V0LAogICAgLy8gfSkKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCgpvcHRBa2l0YUVzY3Jvd0luQW5kU2VuZF9hZnRlcl9pZl9lbHNlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMzUKICAgIC8vIGl0eG5Db21wb3NlLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTM3CiAgICAvLyByZXR1cm4gbWJyQW1vdW50CiAgICBzd2FwCiAgICByZXRzdWIK", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyAIAAEIArjvBIAglJYu0IYDJiEJYWtpdGFfZGFvAmJjDGFraXRhX2VzY3JvdwQVH3x1A2FhbAZ3YWxsZXQLRVJSOmVyck5kYW8LRVJSOmVycklwYXkLRVJSOmVyckNuc3QWY2hpbGRfY29udHJhY3RfdmVyc2lvbgEAA3JldgZmdW5kZXINZmFjdG9yeV9mbG9hdAdnYXRlX2lkC0VSUjplcnJJeGZyBD6hGDIExTsyzAtFUlI6ZXJySXBtcwtFUlI6ZXJyTmNscwtFUlI6ZXJyTnJreQVhcHBJRBJjb250cm9sbGVkX2FkZHJlc3MLRVJSOmVyckl3bHQIcmVmZXJyZXIHdmVyc2lvbgNwYWwLRVJSOmVyckZndGULRVJSOmVyclBybG8EC4EBQwScVCQJBK35KuQLRVJSOmVyck5wYm+ABOqRgN02GgCOAQCsMRkURDEYQQCVggwEar1nOATi+p4hBOZq2S4EgdxRagRx1SD0BG6QNcwEXXphdwR5IsH9BNqpdRYEAs+xzwTJfbsuBDMvbdgnEYIHBNyi2GIE00axpAQ5Tq6yBDP3iAgEroTL2AQz6SyUBIVN7eA2GgCOFAMBA4wEBgRwBMkFGwViBZwF8QY7BngG3AcEB1gH4Af6CJAIuQk6AAEAI0OABIEVNig2GgCOAQKaADEZgQQSMRgQREII0ooBAYv/vUAABCcIsACJigIAi/44AIv/EkAABCcSsACL/jgTMgMSQAAPgAtFUlI6ZXJyTmNsd7AAi/44FTIDEkAABCcTsACL/jggMgMSQAAEJxSwAImKAgEii/6AA29hbGVIgRhbi/4nBGVIgVhbTLGyGIAEPBpvM7Iai/+yGoEGshAisgGztD5JVwQASwFXAAQrEkRJIlklCEwVEkRXBgBJFSQTQQAFSCKMAIkXSUEABYsBQAAIIiJOAk1C/+tJcgdMjABBABKLARYnFUxQA4sAEkEABCNC/94iQv/aigIBi/9BABeL/icEZUgkW3IIRIv/cABFAUAAAzIQiSKJigMBIov+i/9wAEUBQAAai/2ADnJldmVudWVfc3BsaXRzZUgiWSMIjACLAEyJigIBIkmL/icEZUiBWFsyDjEAMg2L/0AAGUgyA0kiFk8DSU4CUE8DUExQTFAnClCMAImL/0EABYsCQAEGIkAAD4ALRVJSOmVyckhud2ywAElAAA+AC0VSUjplcnJIdG9wsAAiTgKL/xNBAEZFAYv/gBBzcGVuZGluZ19hZGRyZXNzZUyMAUEAGIsBFYEgEkEAD4sBSwESQQAHSYsDE0AAD4ALRVJSOmVyckhuYmSwACNMi/8nFmVBAAhJFYEgEkAABCcXsABJSwISQQBII0yL/ycYZUEANkkVgSASQQAuTgNLAksBTwNJTgNNTEEAF0yL/xZPAlBMUExQTFAnCiJPA1RQQv8qRQEyA0L/40gyA04DQv/Mi/9yCExOAkAAB0UBIkxC/6lJSwISQQALTHMCSDIDEkxC/5dJcwJITwISTEL/jIv/cgdMjABBABKLAhYnFUxQA4sAEkEABCNC/t8iQv7bNhoBSSJZJQhLARUSRFcCADYaAkkiWSUISwEVEkRXAgA2GgNJFSQSRBc2GgRJFUsBIllJgQoSREsCTEsCUiJZgQwIEkQnGU8EZycJTwNnKE8CZypMZyNDMRYlCUk4ECMSRDEWIwlJOBCBBBJENhoBSRUkEkQXNhoCSRUkEkQXNhoDSRUkEkQXNhoESRWBIBJENhoFSRUkEkQXNhoGSRWBIBJENhoHSSJZJQhLARUSRFcCADYaCEkiWYEgCyUISwEVEkQ2GglJFSQSRBciKGVETIj9y1doICKICpFIFitMULAjQzEWJQlJOBAjEkQxFiMJSTgQgQQSRDYaAUkVJBJEFzYaAkkVJBJEFzYaA0kVJBJEFzYaBEkVgSASRDYaBUkVJBJEFzYaBkkVgSASRDYaB0kiWSUISwEVEkRXAgA2GghJIlmBIAslCEsBFRJEiAgQI4gKF0gWK0xQsCNDMRYlCUk4EIEGEkQxFiMJSTgQIxJENhoBSRUkEkQXNhoCSRUkEkQXNhoDSRUkEkQXNhoESRWBIBJENhoFSRUkEkQXNhoGSRWBIBJENhoHSRUkEkQXIihlREyI/OZXaCAiiAwsFitMULAjQzEWJQlJOBCBBhJEMRYjCUk4ECMSRDYaAUkVJBJEFzYaAkkVJBJEFzYaA0kVJBJEFzYaBEkVgSASRDYaBUkVJBJEFzYaBkkVgSASRIgHTCOIC9MWK0xQsCNDMRYlCUk4ECMSRDEWIwlJOBCBBhJENhoBSRUkEkQXNhoCSRWBIBJENhoDSRUkEkQXMgpzAEQyCnMBREsEiAWDTwVLBU8EiAW0SwSIB+mICCIjQzEWJQlJOBAjEkQxFiMJSTgQgQYSRDYaAUkVJBJEFzYaAkkVgSASRDIKcwBEMgpzAURLA4gFOk8ESwSIBe1LBIgHoogH2yNDMRYjCUk4ECMSRDYaAUkVJBJEFzYaAkkVgSASRDIKcwBEMgpzAURLA4gE/ksDiAUXSwSIB2iIB6EjQzEWJQlJOBCBBBJEMRYjCUk4EIEGEkQ2GgFJFSQSRBc2GgJJFYEgEkQ2GgNJFSQSRBcyCnMARDIKcwFESwSIBK9PBUsFTwSIBOBLBEsEiAbQiAeuI0MxFiUJSTgQgQQSRDEWIwlJOBCBBhJENhoBSRUkEkQXNhoCSRWBIBJEMgpzAEQyCnMBREsDiARjTwRLBIgFFksESwSIBoaIB2QjQzEWIwlJOBCBBBJENhoBSRUkEkQXNhoCSRWBIBJEMgpzAEQyCnMBREsDiAQkSwOIBD1LBEsEiAZJiAcnI0M2GgFJFSQSRBcyCnMARDIKcwFESwKIA/tLAicLZUUBFEsDJwxlSElXACBMgSBbSwUnDWVITLExAIEFshlPB7IYgARo6GNDshqyGoEGshAisgGzTwNPA08CTwNPBU8FIogDMCNDNhoBSRUkEkQXNhoCSRUkEkQXNhoDSRUjEkQiU4gCYlcACCtMULAjQzYaAUkiWSUISwEVEkRXAgA2GgJJFSQSRBciKGVEJwVlSElAACVIMQAyCRJAAAQnBrAAJwlPAmcpvUUBQAAGKUy5SCNDKUzTQv/4MQBMcghEEkL/1zYaAUkVJBJEF0k2GgJJIlklCEsBFRJEVwIATIHwDwoxFkwJIwlJTgM4EIEGEkEAVEsCOBgyCBJBAEpLAjgbgQMSQQBASwI4GUAAOUsCORoAJxESQQAuSwI4ADEAEkEAJCNAAA+AC0VSUjplcnJJY29ysAApvUUBQAAEJwiwAClOArsjQyJC/9kxACIoZUQnBWVIcghEEkAABCcGsAApvEgjQzEWIwlHAjgQIxJENhoBSRUkEkQXSU4DIiplTElOAk4FRCIoZURMJVtyCERPAoj48Uw4BzIKEkAAD4ALRVJSOmVycklwbXKwAEw4CDIQI0sDCAsSQAAPgAtFUlI6ZXJySXBtYbAAsTIKSwOyESKyErIUgQSyECKyAbNBABhHAiJZSwEVUlcCAIAAE0EAB0sBIogKRUgjQzYaAUkVJBJEFyIoZUQiKmVEJVtyCERPAoj4cDIQI08CCAsWK0xQsCNDNhoBRwIVSwEiWUmBChJETwJMSwJSIlmBDAgSRDEAIihlRCcFZUhyCEQSQAAEJwawACpMZyNDNhoBSSJZJQhLARUSRFcCADEAIihlRCcFZUhyCEQSQAAEJwawACIoZUQnGmVIgRBbMg0SQAAPgAtFUlI6ZXJySXVwZ7AAJxlMZyNDNhoBSRUkEkQXMQAiKGVEJwVlSHIIRBJAAAQnBrAAKExnI0OKAwEii/9BAHGL/kAAVyEEi/5AADgigQQjiAkbIwiBoI0GC4H0/CsISTIBCIsASU4CCE8ESU4CCE8ESU4CCBZMFlBMFlBMFlBMFlBMiTIQIihlRCIqZUQlW3IIRIv+iPddC0L/sTIQjAAiKGVEi/6I9yuB4L0TCEL/liIoZUSL/Yj3GiEECIv+QAAKMhCMACEECEL/ezIQJQuMACIoZUSL/oj2+YGYrRgICEL/Y4oHAIAAi/lBABGxi/uyCIv6sgcjshAisgGziYv7i/wIMgpJcwBEi/8ISYv9DUEATIv9CUxzAUxJTwJEi/4MQQA2i/5MCQhJSwINTE4CTUmL/A1BABuL/AmMAIsAQf+7sYsAsgiL+rIHI7IQIrIBs4lIIowAQv/jSCJC/8lIIkL/sooBAIv/cgdEMgoSQAAPgAtFUlI6ZXJyTmFsc7AAiYoBAIv/Jw5lSEEAD4ALRVJSOmVyckhndGWwAImKAwAiKGVEi/+I9neL/icOZUhMIihlREsBVwggSwJXAAhPA1dIIE4CUExQTIv9OBhMJwRlSIEoWxJBAECL/TgZQAA5i/04G4EEEkEAL4v9ORoAgASbFH0sEkEAIIv9ORoBiwESQQAVi/05GgKLABYSQQAJI0AABCcbsACJIkL/9IoCACKAACIoZUQxAIj1HkkxAExAAGKMAIv/Jw5lSIwBIihlRIv+OBhMJwRlSIEoWxJBAECL/jgZQAA5i/44G4EEEkEAL4v+ORoAgARDkiZVEkEAIIv+ORoBiwASQQAVi/45GgKLARYSQQAJI0AABCcbsACJIkL/9IsCJxZlTE4CQQA+SwEVgSASQQA1I0AABCcXsACLAnIIREsCE0EAHEsBMQATQQAUSwFzAkSLAnIIRBNBAAaMAEhC/11IjABC/1ciQv/IIihlRDEAiPRfSTIDTEAAA0UBiUgnGGVIiYoFAoAASYv7OAcyChJAAAQnB7AAi/s4CEmMAYv8IltJTgISQQAIIov8jAGMAIklI4v+TYv8gSBbSYwAIQYJgYBkTwILCEyL/0EASov9QQBFiwAhBg1BAD1JSwIJiwESQQAzI0AABCcHsAAyCklzAERMcwFECUyBoMIeCA9AAA+AC0VSUjplcnJMZmx0sACL/E8DTwOJIkL/yooCAIv+MQCI82WL/jgUMgoSQAAEJw+wAIv+OBJAAAQnD7AAi/+ADXBheW1lbnRfYXNzZXRlSIv+OBESQAAEJw+wAImKAQAxAIv/OAASQAAEJxKwAIv/OAkyAxJAAAQnE7AAi/84IDIDEkAABCcUsACL/zgHMgoSQAAEJwewAImKBQCL/CcLZUUBFIv8JwxlSElXACBMgSBbi/wnDWVIsYv8cghEi/s4CEmyCEyyByOyECKyAbYxAIEFshmL/LIYgARqFjk9shqyGov9shqBBrIQIrIBs04Ei/6L/08GiPxuiYoFAIv8JwtlRQFAAA+AC0VSUjplcnJMZ2N5sACL/CcMZUhJVwAgTIEgW4v8Jw1lSLGL/HIIRIv7OBKL+zgRshGyErIUgQSyECKyAbYxAIEFshmL/LIYgAQXHJ+IshqyGov9shqBBrIQIrIBsyJOA4v+i/8iiPv2iYoMAiJJgACL9oEED0AABCccsAApvUUBQAAEJwiwAIv1MQCI8fGL9TgUMgoSQAAEJwewAIv1OBJJQAAEJwewAIv1OBFJi/cTQAAPgAtFUlI6ZXJyUGJkbLAAi/cUSwGL9yKI+uSL9ExPAiKL/4j9n04DTgMiKGVMTgJEIowCi/0iWUABd0UBgYgnjAKxSRaL9haL9xZJTgKMAIv4FjEAi/Q4AIv0OAhPCUlOCCRbCRZQiwIWi/oWIicJZURJFRZXBgJMUCIoZUQWIiplRE8NSU4MFk8PFkyL/lBMUCKIA3YjiANyJYgDboEDiANpgQQjiAONgQeyNYENsjQishmyOCcdskJPA7JATwKyQEyyQLJAJx6yGksLshonCrIaTwmyGk8JshpPCLIaTweyGk8GshqL+bIaTwWyGk8EshqL+7IaTwOyGk8CshpMshqyGoEGshAisgGztwA9SU4FsUlyCEQyAU8FgRBbCLIIsgcjshAisgGzsUlyCEQyELIIsgcjshAisgG2IrIZSbIYJxCyGkyyGoEGshAisgGzsXIIRE8CshGyFLISgQSyECKyAbOL90EAQbFHAnIIRDIQsgiyByOyECKyAbYishmyGCcQshqLALIagQayECKyAbMiKmVEJVtyCESL93AARQFAAAeL9yKIAspIi/2MAYwAibFHAnELRIv8FRZXBgKL/FBPAhYBASMWTwUnBGVIgUhbshiABB/3x0yyGk8DshpPArIaTLIai/2yGrIagAkAB3JveWFsdHmyGoEGshAisgGztD5JVwQASwFXAAQrEkRJIlklCEwVEkRXBgBJjAEVQQAFiwEXjAKLAiEHDUH+EiEHjAJC/guKCgEii/iBBA9AAAQnHLAAKb1FAUAABCcIsACL9jkaACcfEkEBq4v2OBlAAaQjQAAPgAtFUlI6ZXJyQm1wdLAAi/Y4ADEAEkAABCcgsAAiKGVEi/Y4GElOAklyB0RPAicEZUiBGFtyCEQSRIAFb3duZXJlSDIKEkAABCcgsACL+RQii/kjiPhAi/dMTwIji/+I+vuxSwIWi/gWi/kWSU4EjACL+hYxAIv3OACL9zgISwYkWwkWUCIWi/wWIicJZURJFRZXBgJMUCIoZUQWIiplRE8MFksFi/5QTFAiiAD2I4gA8iWIAO6BA4gA6YEEI4gBDYEHsjWBDbI0IrIZsjgnHbJCTwOyQE8CskBMskCyQCceshpPCrIagAGAshpPCbIaTwqyGk8IshpPB7IaTwayGov7shpPBbIaTwSyGov9shpPA7IaTwKyGkyyGrIagQayECKyAbO3AD1JTgOxSXIIRDIBTwOBEFsIsgiyByOyECKyAbOxcghETLIYJx+yGrIagQayECKyAbOL+UEAQbFHAnIIRDIQsgiyByOyECKyAbYishmyGCcQshqLALIagQayECKyAbMiKmVEJVtyCESL+XAARQFAAAeL+SKIAG9ITIkiQv5ZigEBKYjtrEmL/yEFC0lPAg9BAAVGAoAAiUlOAglJIQUNIQVMTSlOArqJigIBKYjtgov+CIGAEAgjCYGAEApJJA5AAA+AC0VSUjplcnJQdGxnsABJQQAMIwlJi/8Ni/9OAk2JSCJC//GKAgGAACIoZURJJwVlSExJJxplSElXCAhOAiRbTgMiKmVMSU4CTgNESSJZSwEVUklOA1cCAEwnBWVITLEjFk4CSRUWVwYCTFCABAABAAJMUEyyGIAEOrKJW7IashqBBrIQIrIBs7Q+SVcEAEsBVwAEKxJESSJZgSkLJQhMFRJEVwYpIltJQAAPgAtFUlI6ZXJyTmVzY7AATwIlW0mMABJAAA+AC0VSUjplcnJXZXNjsACxTwNJshiABFrfM4+yGk8DshpMshpMshqACgABAAAAAAAAAACyGoACAACyGoEGshAisgEiKGVEiwBJTgJyCESL/ojtVDIQC0lOA7ZMcghEsgeyCCOyECKyAbZJFov+FoACAAFMUE8EshiABGg147yyGkyyGoABgLIashqBBrIQIrIBtrIYgARsw/YGshqBBrIQIrIBi/9BABe2iwByCESL/rIRi/+yErIUgQSyECKyAbNMiQ==", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
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
     * Constructs a no op call for the list(pay,axfer,uint64,uint64,uint64,address,uint64,address,string,byte[32][],uint64)uint64 ABI method
     *
    * List an ASA (principal resolution §6.7). `wallet` is the caller's wallet hint (0 = plain account):
    the verified principal's referrer is fixed on the rev-3 child as `seller_referrer`. The seller is
    the spender (`Txn.sender`).
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static listPayAxferUint64Uint64Uint64AddressUint64AddressStringByte_32Uint64Uint64(params) {
    return {
      ...params,
      method: "list(pay,axfer,uint64,uint64,uint64,address,uint64,address,string,byte[32][],uint64)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.assetXfer, params.args.price, params.args.paymentAsset, params.args.expiration, params.args.reservedFor, params.args.gateId, params.args.marketplace, params.args.name, params.args.proof, params.args.wallet]
    };
  }
  /**
     * Constructs a no op call for the list(pay,axfer,uint64,uint64,uint64,address,uint64,address,string,byte[32][])uint64 ABI method
     *
    * LEGACY shim, deployed selector `list(pay,axfer,uint64,uint64,uint64,address,uint64,address,string,byte[32][])uint64`.
    Creates a rev-3 child whose `seller_referrer` is the seller's registry referrer at creation
    (`legacySellerReferrer`). Also accepts the deployed plugin's ALGO payment (`assertListingPayment`).
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static listPayAxferUint64Uint64Uint64AddressUint64AddressStringByte_32Uint64(params) {
    return {
      ...params,
      method: "list(pay,axfer,uint64,uint64,uint64,address,uint64,address,string,byte[32][])uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.assetXfer, params.args.price, params.args.paymentAsset, params.args.expiration, params.args.reservedFor, params.args.gateId, params.args.marketplace, params.args.name, params.args.proof]
    };
  }
  /**
   * Constructs a no op call for the listPrizeBox(appl,pay,uint64,uint64,uint64,address,uint64,address,uint64)uint64 ABI method
   *
   * List a prize box; `wallet` as in `list`.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static listPrizeBoxApplPayUint64Uint64Uint64AddressUint64AddressUint64Uint64(params) {
    return {
      ...params,
      method: "listPrizeBox(appl,pay,uint64,uint64,uint64,address,uint64,address,uint64)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.prizeBoxTransferTxn, params.args.payment, params.args.price, params.args.paymentAsset, params.args.expiration, params.args.reservedFor, params.args.gateId, params.args.marketplace, params.args.wallet]
    };
  }
  /**
   * Constructs a no op call for the listPrizeBox(appl,pay,uint64,uint64,uint64,address,uint64,address)uint64 ABI method
   *
   * LEGACY shim, deployed selector `listPrizeBox(appl,pay,uint64,uint64,uint64,address,uint64,address)uint64` (see `legacyList`).
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static listPrizeBoxApplPayUint64Uint64Uint64AddressUint64AddressUint64(params) {
    return {
      ...params,
      method: "listPrizeBox(appl,pay,uint64,uint64,uint64,address,uint64,address)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.prizeBoxTransferTxn, params.args.payment, params.args.price, params.args.paymentAsset, params.args.expiration, params.args.reservedFor, params.args.gateId, params.args.marketplace]
    };
  }
  /**
     * Constructs a no op call for the gatedPurchase(pay,appl,uint64,address,uint64)void ABI method
     *
    * Gated ALGO purchase. `gateTxn` must be `Gate.mustCheckFor(ctx, gateID, args)` with `ctx` = the
    buyer's verified `(principal, wallet, spender)` for hint `wallet` (0 = plain account).
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static gatedPurchasePayApplUint64AddressUint64Void(params) {
    return {
      ...params,
      method: "gatedPurchase(pay,appl,uint64,address,uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.gateTxn, params.args.appId, params.args.marketplace, params.args.wallet]
    };
  }
  /**
   * Constructs a no op call for the gatedPurchase(pay,appl,uint64,address)void ABI method
   *
   * LEGACY shim, deployed selector `gatedPurchase(pay,appl,uint64,address)void`: registry-origin `Gate.mustCheck`.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static gatedPurchasePayApplUint64AddressVoid(params) {
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
   * Constructs a no op call for the gatedPurchaseAsa(axfer,appl,uint64,address,uint64)void ABI method
   *
   * Gated ASA purchase; `gateTxn` and `wallet` as in `gatedPurchase`.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static gatedPurchaseAsaAxferApplUint64AddressUint64Void(params) {
    return {
      ...params,
      method: "gatedPurchaseAsa(axfer,appl,uint64,address,uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.assetXfer, params.args.gateTxn, params.args.appId, params.args.marketplace, params.args.wallet]
    };
  }
  /**
   * Constructs a no op call for the gatedPurchaseAsa(axfer,appl,uint64,address)void ABI method
   *
   * LEGACY shim, deployed selector `gatedPurchaseAsa(axfer,appl,uint64,address)void`: registry-origin `Gate.mustCheck`.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static gatedPurchaseAsaAxferApplUint64AddressVoid(params) {
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
     * Constructs a no op call for the listCost(uint64,uint64,bool)uint64 ABI method
     *
    * Exact payment `list` (isPrizeBox = false, `prize` = the ASA) or `listPrizeBox`
    (isPrizeBox = true, `prize` ignored) requires right now. Includes the non-refundable
    DAO-escrow opt-in for a payment asset the escrow does not hold yet.
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static listCost(params) {
    return {
      ...params,
      method: "listCost(uint64,uint64,bool)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.prize, params.args.paymentAsset, params.args.isPrizeBox]
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
         * Makes a call to the Marketplace smart contract using the `list(pay,axfer,uint64,uint64,uint64,address,uint64,address,string,byte[32][],uint64)uint64` ABI method.
         *
        * List an ASA (principal resolution §6.7). `wallet` is the caller's wallet hint (0 = plain account):
        the verified principal's referrer is fixed on the rev-3 child as `seller_referrer`. The seller is
        the spender (`Txn.sender`).
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    listPayAxferUint64Uint64Uint64AddressUint64AddressStringByte_32Uint64Uint64: (params) => {
      return this.appClient.params.call(MarketplaceParamsFactory.listPayAxferUint64Uint64Uint64AddressUint64AddressStringByte_32Uint64Uint64(params));
    },
    /**
         * Makes a call to the Marketplace smart contract using the `list(pay,axfer,uint64,uint64,uint64,address,uint64,address,string,byte[32][])uint64` ABI method.
         *
        * LEGACY shim, deployed selector `list(pay,axfer,uint64,uint64,uint64,address,uint64,address,string,byte[32][])uint64`.
        Creates a rev-3 child whose `seller_referrer` is the seller's registry referrer at creation
        (`legacySellerReferrer`). Also accepts the deployed plugin's ALGO payment (`assertListingPayment`).
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    listPayAxferUint64Uint64Uint64AddressUint64AddressStringByte_32Uint64: (params) => {
      return this.appClient.params.call(MarketplaceParamsFactory.listPayAxferUint64Uint64Uint64AddressUint64AddressStringByte_32Uint64(params));
    },
    /**
     * Makes a call to the Marketplace smart contract using the `listPrizeBox(appl,pay,uint64,uint64,uint64,address,uint64,address,uint64)uint64` ABI method.
     *
     * List a prize box; `wallet` as in `list`.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    listPrizeBoxApplPayUint64Uint64Uint64AddressUint64AddressUint64Uint64: (params) => {
      return this.appClient.params.call(MarketplaceParamsFactory.listPrizeBoxApplPayUint64Uint64Uint64AddressUint64AddressUint64Uint64(params));
    },
    /**
     * Makes a call to the Marketplace smart contract using the `listPrizeBox(appl,pay,uint64,uint64,uint64,address,uint64,address)uint64` ABI method.
     *
     * LEGACY shim, deployed selector `listPrizeBox(appl,pay,uint64,uint64,uint64,address,uint64,address)uint64` (see `legacyList`).
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    listPrizeBoxApplPayUint64Uint64Uint64AddressUint64AddressUint64: (params) => {
      return this.appClient.params.call(MarketplaceParamsFactory.listPrizeBoxApplPayUint64Uint64Uint64AddressUint64AddressUint64(params));
    },
    /**
         * Makes a call to the Marketplace smart contract using the `gatedPurchase(pay,appl,uint64,address,uint64)void` ABI method.
         *
        * Gated ALGO purchase. `gateTxn` must be `Gate.mustCheckFor(ctx, gateID, args)` with `ctx` = the
        buyer's verified `(principal, wallet, spender)` for hint `wallet` (0 = plain account).
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    gatedPurchasePayApplUint64AddressUint64Void: (params) => {
      return this.appClient.params.call(MarketplaceParamsFactory.gatedPurchasePayApplUint64AddressUint64Void(params));
    },
    /**
     * Makes a call to the Marketplace smart contract using the `gatedPurchase(pay,appl,uint64,address)void` ABI method.
     *
     * LEGACY shim, deployed selector `gatedPurchase(pay,appl,uint64,address)void`: registry-origin `Gate.mustCheck`.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    gatedPurchasePayApplUint64AddressVoid: (params) => {
      return this.appClient.params.call(MarketplaceParamsFactory.gatedPurchasePayApplUint64AddressVoid(params));
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
     * Makes a call to the Marketplace smart contract using the `gatedPurchaseAsa(axfer,appl,uint64,address,uint64)void` ABI method.
     *
     * Gated ASA purchase; `gateTxn` and `wallet` as in `gatedPurchase`.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    gatedPurchaseAsaAxferApplUint64AddressUint64Void: (params) => {
      return this.appClient.params.call(MarketplaceParamsFactory.gatedPurchaseAsaAxferApplUint64AddressUint64Void(params));
    },
    /**
     * Makes a call to the Marketplace smart contract using the `gatedPurchaseAsa(axfer,appl,uint64,address)void` ABI method.
     *
     * LEGACY shim, deployed selector `gatedPurchaseAsa(axfer,appl,uint64,address)void`: registry-origin `Gate.mustCheck`.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    gatedPurchaseAsaAxferApplUint64AddressVoid: (params) => {
      return this.appClient.params.call(MarketplaceParamsFactory.gatedPurchaseAsaAxferApplUint64AddressVoid(params));
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
         * Makes a call to the Marketplace smart contract using the `listCost(uint64,uint64,bool)uint64` ABI method.
         *
         * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
         *
        * Exact payment `list` (isPrizeBox = false, `prize` = the ASA) or `listPrizeBox`
        (isPrizeBox = true, `prize` ignored) requires right now. Includes the non-refundable
        DAO-escrow opt-in for a payment asset the escrow does not hold yet.
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    listCost: (params) => {
      return this.appClient.params.call(MarketplaceParamsFactory.listCost(params));
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
         * Makes a call to the Marketplace smart contract using the `list(pay,axfer,uint64,uint64,uint64,address,uint64,address,string,byte[32][],uint64)uint64` ABI method.
         *
        * List an ASA (principal resolution §6.7). `wallet` is the caller's wallet hint (0 = plain account):
        the verified principal's referrer is fixed on the rev-3 child as `seller_referrer`. The seller is
        the spender (`Txn.sender`).
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    listPayAxferUint64Uint64Uint64AddressUint64AddressStringByte_32Uint64Uint64: (params) => {
      return this.appClient.createTransaction.call(MarketplaceParamsFactory.listPayAxferUint64Uint64Uint64AddressUint64AddressStringByte_32Uint64Uint64(params));
    },
    /**
         * Makes a call to the Marketplace smart contract using the `list(pay,axfer,uint64,uint64,uint64,address,uint64,address,string,byte[32][])uint64` ABI method.
         *
        * LEGACY shim, deployed selector `list(pay,axfer,uint64,uint64,uint64,address,uint64,address,string,byte[32][])uint64`.
        Creates a rev-3 child whose `seller_referrer` is the seller's registry referrer at creation
        (`legacySellerReferrer`). Also accepts the deployed plugin's ALGO payment (`assertListingPayment`).
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    listPayAxferUint64Uint64Uint64AddressUint64AddressStringByte_32Uint64: (params) => {
      return this.appClient.createTransaction.call(MarketplaceParamsFactory.listPayAxferUint64Uint64Uint64AddressUint64AddressStringByte_32Uint64(params));
    },
    /**
     * Makes a call to the Marketplace smart contract using the `listPrizeBox(appl,pay,uint64,uint64,uint64,address,uint64,address,uint64)uint64` ABI method.
     *
     * List a prize box; `wallet` as in `list`.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    listPrizeBoxApplPayUint64Uint64Uint64AddressUint64AddressUint64Uint64: (params) => {
      return this.appClient.createTransaction.call(MarketplaceParamsFactory.listPrizeBoxApplPayUint64Uint64Uint64AddressUint64AddressUint64Uint64(params));
    },
    /**
     * Makes a call to the Marketplace smart contract using the `listPrizeBox(appl,pay,uint64,uint64,uint64,address,uint64,address)uint64` ABI method.
     *
     * LEGACY shim, deployed selector `listPrizeBox(appl,pay,uint64,uint64,uint64,address,uint64,address)uint64` (see `legacyList`).
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    listPrizeBoxApplPayUint64Uint64Uint64AddressUint64AddressUint64: (params) => {
      return this.appClient.createTransaction.call(MarketplaceParamsFactory.listPrizeBoxApplPayUint64Uint64Uint64AddressUint64AddressUint64(params));
    },
    /**
         * Makes a call to the Marketplace smart contract using the `gatedPurchase(pay,appl,uint64,address,uint64)void` ABI method.
         *
        * Gated ALGO purchase. `gateTxn` must be `Gate.mustCheckFor(ctx, gateID, args)` with `ctx` = the
        buyer's verified `(principal, wallet, spender)` for hint `wallet` (0 = plain account).
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    gatedPurchasePayApplUint64AddressUint64Void: (params) => {
      return this.appClient.createTransaction.call(MarketplaceParamsFactory.gatedPurchasePayApplUint64AddressUint64Void(params));
    },
    /**
     * Makes a call to the Marketplace smart contract using the `gatedPurchase(pay,appl,uint64,address)void` ABI method.
     *
     * LEGACY shim, deployed selector `gatedPurchase(pay,appl,uint64,address)void`: registry-origin `Gate.mustCheck`.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    gatedPurchasePayApplUint64AddressVoid: (params) => {
      return this.appClient.createTransaction.call(MarketplaceParamsFactory.gatedPurchasePayApplUint64AddressVoid(params));
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
     * Makes a call to the Marketplace smart contract using the `gatedPurchaseAsa(axfer,appl,uint64,address,uint64)void` ABI method.
     *
     * Gated ASA purchase; `gateTxn` and `wallet` as in `gatedPurchase`.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    gatedPurchaseAsaAxferApplUint64AddressUint64Void: (params) => {
      return this.appClient.createTransaction.call(MarketplaceParamsFactory.gatedPurchaseAsaAxferApplUint64AddressUint64Void(params));
    },
    /**
     * Makes a call to the Marketplace smart contract using the `gatedPurchaseAsa(axfer,appl,uint64,address)void` ABI method.
     *
     * LEGACY shim, deployed selector `gatedPurchaseAsa(axfer,appl,uint64,address)void`: registry-origin `Gate.mustCheck`.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    gatedPurchaseAsaAxferApplUint64AddressVoid: (params) => {
      return this.appClient.createTransaction.call(MarketplaceParamsFactory.gatedPurchaseAsaAxferApplUint64AddressVoid(params));
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
         * Makes a call to the Marketplace smart contract using the `listCost(uint64,uint64,bool)uint64` ABI method.
         *
         * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
         *
        * Exact payment `list` (isPrizeBox = false, `prize` = the ASA) or `listPrizeBox`
        (isPrizeBox = true, `prize` ignored) requires right now. Includes the non-refundable
        DAO-escrow opt-in for a payment asset the escrow does not hold yet.
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    listCost: (params) => {
      return this.appClient.createTransaction.call(MarketplaceParamsFactory.listCost(params));
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
         * Makes a call to the Marketplace smart contract using the `list(pay,axfer,uint64,uint64,uint64,address,uint64,address,string,byte[32][],uint64)uint64` ABI method.
         *
        * List an ASA (principal resolution §6.7). `wallet` is the caller's wallet hint (0 = plain account):
        the verified principal's referrer is fixed on the rev-3 child as `seller_referrer`. The seller is
        the spender (`Txn.sender`).
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    listPayAxferUint64Uint64Uint64AddressUint64AddressStringByte_32Uint64Uint64: async (params) => {
      const result = await this.appClient.send.call(MarketplaceParamsFactory.listPayAxferUint64Uint64Uint64AddressUint64AddressStringByte_32Uint64Uint64(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the Marketplace smart contract using the `list(pay,axfer,uint64,uint64,uint64,address,uint64,address,string,byte[32][])uint64` ABI method.
         *
        * LEGACY shim, deployed selector `list(pay,axfer,uint64,uint64,uint64,address,uint64,address,string,byte[32][])uint64`.
        Creates a rev-3 child whose `seller_referrer` is the seller's registry referrer at creation
        (`legacySellerReferrer`). Also accepts the deployed plugin's ALGO payment (`assertListingPayment`).
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    listPayAxferUint64Uint64Uint64AddressUint64AddressStringByte_32Uint64: async (params) => {
      const result = await this.appClient.send.call(MarketplaceParamsFactory.listPayAxferUint64Uint64Uint64AddressUint64AddressStringByte_32Uint64(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Marketplace smart contract using the `listPrizeBox(appl,pay,uint64,uint64,uint64,address,uint64,address,uint64)uint64` ABI method.
     *
     * List a prize box; `wallet` as in `list`.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    listPrizeBoxApplPayUint64Uint64Uint64AddressUint64AddressUint64Uint64: async (params) => {
      const result = await this.appClient.send.call(MarketplaceParamsFactory.listPrizeBoxApplPayUint64Uint64Uint64AddressUint64AddressUint64Uint64(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Marketplace smart contract using the `listPrizeBox(appl,pay,uint64,uint64,uint64,address,uint64,address)uint64` ABI method.
     *
     * LEGACY shim, deployed selector `listPrizeBox(appl,pay,uint64,uint64,uint64,address,uint64,address)uint64` (see `legacyList`).
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    listPrizeBoxApplPayUint64Uint64Uint64AddressUint64AddressUint64: async (params) => {
      const result = await this.appClient.send.call(MarketplaceParamsFactory.listPrizeBoxApplPayUint64Uint64Uint64AddressUint64AddressUint64(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the Marketplace smart contract using the `gatedPurchase(pay,appl,uint64,address,uint64)void` ABI method.
         *
        * Gated ALGO purchase. `gateTxn` must be `Gate.mustCheckFor(ctx, gateID, args)` with `ctx` = the
        buyer's verified `(principal, wallet, spender)` for hint `wallet` (0 = plain account).
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    gatedPurchasePayApplUint64AddressUint64Void: async (params) => {
      const result = await this.appClient.send.call(MarketplaceParamsFactory.gatedPurchasePayApplUint64AddressUint64Void(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Marketplace smart contract using the `gatedPurchase(pay,appl,uint64,address)void` ABI method.
     *
     * LEGACY shim, deployed selector `gatedPurchase(pay,appl,uint64,address)void`: registry-origin `Gate.mustCheck`.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    gatedPurchasePayApplUint64AddressVoid: async (params) => {
      const result = await this.appClient.send.call(MarketplaceParamsFactory.gatedPurchasePayApplUint64AddressVoid(params));
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
     * Makes a call to the Marketplace smart contract using the `gatedPurchaseAsa(axfer,appl,uint64,address,uint64)void` ABI method.
     *
     * Gated ASA purchase; `gateTxn` and `wallet` as in `gatedPurchase`.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    gatedPurchaseAsaAxferApplUint64AddressUint64Void: async (params) => {
      const result = await this.appClient.send.call(MarketplaceParamsFactory.gatedPurchaseAsaAxferApplUint64AddressUint64Void(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Marketplace smart contract using the `gatedPurchaseAsa(axfer,appl,uint64,address)void` ABI method.
     *
     * LEGACY shim, deployed selector `gatedPurchaseAsa(axfer,appl,uint64,address)void`: registry-origin `Gate.mustCheck`.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    gatedPurchaseAsaAxferApplUint64AddressVoid: async (params) => {
      const result = await this.appClient.send.call(MarketplaceParamsFactory.gatedPurchaseAsaAxferApplUint64AddressVoid(params));
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
         * Makes a call to the Marketplace smart contract using the `listCost(uint64,uint64,bool)uint64` ABI method.
         *
         * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
         *
        * Exact payment `list` (isPrizeBox = false, `prize` = the ASA) or `listPrizeBox`
        (isPrizeBox = true, `prize` ignored) requires right now. Includes the non-refundable
        DAO-escrow opt-in for a payment asset the escrow does not hold yet.
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    listCost: async (params) => {
      const result = await this.appClient.send.call(MarketplaceParamsFactory.listCost(params));
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
   * @param params The params to use for the the cloned app client. Omit a param to keep the original value. Set a param to override the original value. Setting to undefined will clear the original value.
   * @returns A new app client with the altered params
   */
  clone(params) {
    return new _MarketplaceClient(this.appClient.clone(params));
  }
  /**
     * Makes a readonly (simulated) call to the Marketplace smart contract using the `listCost(uint64,uint64,bool)uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
    * Exact payment `list` (isPrizeBox = false, `prize` = the ASA) or `listPrizeBox`
    (isPrizeBox = true, `prize` ignored) requires right now. Includes the non-refundable
    DAO-escrow opt-in for a payment asset the escrow does not hold yet.
  
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
  async listCost(params) {
    const result = await this.appClient.send.call(MarketplaceParamsFactory.listCost(params));
    return result.return;
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
       * Add a list(pay,axfer,uint64,uint64,uint64,address,uint64,address,string,byte[32][],uint64)uint64 method call against the Marketplace contract
       */
      listPayAxferUint64Uint64Uint64AddressUint64AddressStringByte_32Uint64Uint64(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.listPayAxferUint64Uint64Uint64AddressUint64AddressStringByte_32Uint64Uint64(params)));
        resultMappers.push((v) => client.decodeReturnValue("list(pay,axfer,uint64,uint64,uint64,address,uint64,address,string,byte[32][],uint64)uint64", v));
        return this;
      },
      /**
       * Add a list(pay,axfer,uint64,uint64,uint64,address,uint64,address,string,byte[32][])uint64 method call against the Marketplace contract
       */
      listPayAxferUint64Uint64Uint64AddressUint64AddressStringByte_32Uint64(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.listPayAxferUint64Uint64Uint64AddressUint64AddressStringByte_32Uint64(params)));
        resultMappers.push((v) => client.decodeReturnValue("list(pay,axfer,uint64,uint64,uint64,address,uint64,address,string,byte[32][])uint64", v));
        return this;
      },
      /**
       * Add a listPrizeBox(appl,pay,uint64,uint64,uint64,address,uint64,address,uint64)uint64 method call against the Marketplace contract
       */
      listPrizeBoxApplPayUint64Uint64Uint64AddressUint64AddressUint64Uint64(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.listPrizeBoxApplPayUint64Uint64Uint64AddressUint64AddressUint64Uint64(params)));
        resultMappers.push((v) => client.decodeReturnValue("listPrizeBox(appl,pay,uint64,uint64,uint64,address,uint64,address,uint64)uint64", v));
        return this;
      },
      /**
       * Add a listPrizeBox(appl,pay,uint64,uint64,uint64,address,uint64,address)uint64 method call against the Marketplace contract
       */
      listPrizeBoxApplPayUint64Uint64Uint64AddressUint64AddressUint64(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.listPrizeBoxApplPayUint64Uint64Uint64AddressUint64AddressUint64(params)));
        resultMappers.push((v) => client.decodeReturnValue("listPrizeBox(appl,pay,uint64,uint64,uint64,address,uint64,address)uint64", v));
        return this;
      },
      /**
       * Add a gatedPurchase(pay,appl,uint64,address,uint64)void method call against the Marketplace contract
       */
      gatedPurchasePayApplUint64AddressUint64Void(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.gatedPurchasePayApplUint64AddressUint64Void(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a gatedPurchase(pay,appl,uint64,address)void method call against the Marketplace contract
       */
      gatedPurchasePayApplUint64AddressVoid(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.gatedPurchasePayApplUint64AddressVoid(params)));
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
       * Add a gatedPurchaseAsa(axfer,appl,uint64,address,uint64)void method call against the Marketplace contract
       */
      gatedPurchaseAsaAxferApplUint64AddressUint64Void(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.gatedPurchaseAsaAxferApplUint64AddressUint64Void(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a gatedPurchaseAsa(axfer,appl,uint64,address)void method call against the Marketplace contract
       */
      gatedPurchaseAsaAxferApplUint64AddressVoid(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.gatedPurchaseAsaAxferApplUint64AddressVoid(params)));
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
       * Add a listCost(uint64,uint64,bool)uint64 method call against the Marketplace contract
       */
      listCost(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.listCost(params)));
        resultMappers.push((v) => client.decodeReturnValue("listCost(uint64,uint64,bool)uint64", v));
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
       * Add a updateAkitaDAOEscrow((string,uint64))void method call against the Marketplace contract
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





var APP_SPEC2 = { "name": "Listing", "structs": { "EscrowConfig": [{ "name": "name", "type": "string" }, { "name": "app", "type": "uint64" }], "FunderInfo": [{ "name": "account", "type": "address" }, { "name": "amount", "type": "uint64" }] }, "methods": [{ "name": "create", "args": [{ "type": "uint64", "name": "prize" }, { "type": "bool", "name": "isPrizeBox" }, { "type": "uint64", "name": "price" }, { "type": "uint64", "name": "paymentAsset" }, { "type": "uint64", "name": "expiration" }, { "type": "address", "name": "seller" }, { "type": "(address,uint64)", "struct": "FunderInfo", "name": "funder" }, { "type": "address", "name": "reservedFor" }, { "type": "uint64", "name": "creatorRoyalty" }, { "type": "uint64", "name": "gateID" }, { "type": "address", "name": "marketplace" }, { "type": "string", "name": "version" }, { "type": "uint64", "name": "akitaDAO" }, { "type": "(string,uint64)", "struct": "EscrowConfig", "name": "akitaDAOEscrow" }, { "type": "uint64", "name": "prizeAmount" }, { "type": "address", "name": "sellerReferrer" }, { "type": "uint64", "name": "factoryFloat" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "desc": "create the listing application", "events": [], "recommendations": {} }, { "name": "purchase", "args": [{ "type": "pay", "name": "payment", "desc": "- the payment for purchasing the asset" }, { "type": "address", "name": "buyer", "desc": "- the buyer of the asset" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["DeleteApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "purchaseAsa", "args": [{ "type": "axfer", "name": "assetXfer" }, { "type": "address", "name": "buyer" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["DeleteApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "delist", "args": [{ "type": "address", "name": "caller" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["DeleteApplication"] }, "readonly": false, "desc": "Deletes the app and returns the asset/mbr to the seller", "events": [], "recommendations": {} }, { "name": "changePrice", "args": [{ "type": "uint64", "name": "price" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "optin", "args": [{ "type": "pay", "name": "payment", "desc": "The payment transaction" }, { "type": "uint64", "name": "asset", "desc": "The asset to be opted into" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "optin tells the contract to opt into an asa", "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 13, "bytes": 7 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "prize": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cHJpemU=", "desc": "the asset for sale: Asset | Application ( Prize Box )" }, "isPrizeBox": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "aXNfcHJpemVfYm94", "desc": "whether or not the prize is an asset or a prize box" }, "price": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cHJpY2U=", "desc": "the price of the asset" }, "paymentAsset": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cGF5bWVudF9hc3NldA==", "desc": "the asset to use for payment" }, "expiration": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "ZXhwaXJhdGlvbg==", "desc": "the timestamp the listing expires on, once this passes all that can be done is delist" }, "seller": { "keyType": "AVMString", "valueType": "address", "key": "c2VsbGVy", "desc": "the address selling the asset" }, "reservedFor": { "keyType": "AVMString", "valueType": "address", "key": "cmVzZXJ2ZWRfZm9y", "desc": "the address the sale is reserved for" }, "creatorRoyalty": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "Y3JlYXRvcl9yb3lhbHR5", "desc": "the amount the creator will get for the sale" }, "gateID": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "Z2F0ZV9pZA==", "desc": "the gate ID to use to check if the user is qualified to buy" }, "marketplace": { "keyType": "AVMString", "valueType": "address", "key": "bWFya2V0cGxhY2U=", "desc": "The address of the marketplace that listed the asset to send the fee to\n\nIMPORTANT: this is a double sided marketplace fee contract\nthe marketplace referred to internally in the contract\nis the listing side marketplace.\nthe buyer side marketplace provides their address at\nthe time of purchase" }, "marketplaceRoyalties": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "bWFya2V0cGxhY2Vfcm95YWx0aWVz", "desc": "the amount the marketplaces will get for the sale" }, "akitaDAOEscrow": { "keyType": "AVMString", "valueType": "EscrowConfig", "key": "YWtpdGFfZXNjcm93", "desc": "the app ID for the akita DAO escrow" }, "prizeAmount": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cHJpemVfYW1vdW50", "desc": "the amount of the prize asset escrowed at listing time (0 for prize boxes)" }, "lastPriceRound": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cHJpY2Vfcm91bmQ=", "desc": "the round of the last price change (0 = never changed); purchases wait out a cooldown after it" }, "rev": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cmV2", "desc": "program revision; absent on legacy listings so the factory can tell them apart" }, "sellerReferrer": { "keyType": "AVMString", "valueType": "address", "key": "c2VsbGVyX3JlZmVycmVy", "desc": "the seller's referrer, fixed by the factory at creation (rev 3+): the verified principal's referrer\non the hinted `list`, the registry referrer on the legacy shim. Settlement pays the referral cut\nhere with no registry read. Zero address = no referral. (Rev-absent deployed listings never paid a\nseller referral: their registry lookup keyed on `Txn.sender`, which is always the factory.)" }, "factoryFloat": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "ZmFjdG9yeV9mbG9hdA==", "desc": "rev 3+: the creation MBR the factory advanced for a legacy-paid listing (0 otherwise). The factory\nreads it before deletion and recovers it ahead of the funder refund; the Listing only stores it." }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" }, "funder": { "keyType": "AVMString", "valueType": "FunderInfo", "key": "ZnVuZGVy" } }, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": {} } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [535, 695, 2877], "errorMessage": "Bytes has valid prefix" }, { "pc": [2699], "errorMessage": "ERR:errForb" }, { "pc": [1149], "errorMessage": "ERR:errIexp" }, { "pc": [1410, 1424, 1440], "errorMessage": "ERR:errIpay" }, { "pc": [2748], "errorMessage": "ERR:errIpma" }, { "pc": [2724], "errorMessage": "ERR:errIpmr" }, { "pc": [1792, 1806, 1823], "errorMessage": "ERR:errIxfr" }, { "pc": [1367, 1747], "errorMessage": "ERR:errLexp" }, { "pc": [1101, 1318, 1698, 2315], "errorMessage": "ERR:errMbff" }, { "pc": [2573], "errorMessage": "ERR:errMbsl" }, { "pc": [2652], "errorMessage": "ERR:errNdao" }, { "pc": [2338], "errorMessage": "ERR:errOscd" }, { "pc": [1340], "errorMessage": "ERR:errPama" }, { "pc": [1720], "errorMessage": "ERR:errPana" }, { "pc": [3124], "errorMessage": "ERR:errPchg" }, { "pc": [3050], "errorMessage": "ERR:errPrcd" }, { "pc": [2594], "errorMessage": "ERR:errPrlo" }, { "pc": [1396, 1776], "errorMessage": "ERR:errRfda" }, { "pc": [2100, 3100, 3164, 3180], "errorMessage": "account opted into asset" }, { "pc": [466, 558, 577, 590, 601, 717, 1478, 1502, 1865, 1888, 2633], "errorMessage": "application exists" }, { "pc": [1604, 1624, 1924, 1939, 2252], "errorMessage": "asset exists" }, { "pc": [1259, 1322, 1345, 1353, 1375, 1386, 1432, 1448, 1462, 1467, 1472, 1496, 1523, 1554, 1565, 1594, 1636, 1702, 1725, 1733, 1755, 1766, 1784, 1815, 1831, 1845, 1850, 1854, 1859, 1882, 1892, 1910, 1921, 1928, 1947, 1965, 1969, 1982, 1991, 2008, 2026, 2043, 2047, 2059, 2063, 2094, 2104, 2108, 2144, 2148, 2191, 2195, 2200, 2243, 2247, 2319, 2342, 2346, 2354, 2364, 2368, 2373, 2385, 2389, 2472, 2482, 2486, 2554, 2620, 2779, 2799, 2814, 2831, 2934, 2956, 3022, 3059, 3067, 3094, 3105, 3154], "errorMessage": "check GlobalState exists" }, { "pc": [803, 2784, 2909, 2939], "errorMessage": "errIpct" }, { "pc": [430], "errorMessage": "errNcca" }, { "pc": [445, 1002, 1049], "errorMessage": "invalid array length header" }, { "pc": [903], "errorMessage": "invalid number of bytes for arc4.bool" }, { "pc": [1010], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [943, 965, 996, 1295, 1306, 1675, 1686, 2303], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [1063, 1075, 1088], "errorMessage": "invalid number of bytes for arc4.tuple<arc4.uint64,arc4.static_array<arc4.uint8, 32>,arc4.uint64>" }, { "pc": [894, 913, 922, 931, 973, 983, 1022, 2547, 2613, 2675], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [1054], "errorMessage": "invalid number of bytes for smart_contracts/utils/base-contracts/base.ts::EscrowConfig" }, { "pc": [954], "errorMessage": "invalid number of bytes for smart_contracts/utils/types/mbr.ts::FunderInfo" }, { "pc": [540, 700, 2882], "errorMessage": "invalid number of bytes for uint64" }, { "pc": [1041], "errorMessage": "invalid tail pointer at index 0 of ((len+utf8[]),uint64)" }, { "pc": [1036], "errorMessage": "invalid tuple encoding" }, { "pc": [1666], "errorMessage": "transaction type is axfer" }, { "pc": [1286, 2667], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDggNCAxMDAwMDAgMTg0NDY3NDQwNzM3MDk1NTE2MTUKICAgIGJ5dGVjYmxvY2sgInBheW1lbnRfYXNzZXQiICJzZWxsZXIiICJha2l0YV9kYW8iICJwcml6ZSIgMHgwMDAxICJpc19wcml6ZV9ib3giICJwcmljZSIgImV4cGlyYXRpb24iICJyZXNlcnZlZF9mb3IiICJtYXJrZXRwbGFjZSIgImFraXRhX2VzY3JvdyIgIkVSUjplcnJNYmZmIiAweDE1MWY3Yzc1ICJjcmVhdG9yX3JveWFsdHkiICJwcmljZV9yb3VuZCIgInNlbGxlcl9yZWZlcnJlciIgIm1hcmtldHBsYWNlX3JveWFsdGllcyIgIkVSUjplcnJJcGF5IiAiRVJSOmVyckl4ZnIiIDB4YWRmOTJhZTQgInByaXplX2Ftb3VudCIgIm5mdF9mZWVzIiAiRVJSOmVyckxleHAiICJFUlI6ZXJyUmZkYSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTgtMjIKICAgIC8vIGV4cG9ydCBjbGFzcyBMaXN0aW5nIGV4dGVuZHMgY2xhc3NlcygKICAgIC8vICAgQWtpdGFCYXNlQ29udHJhY3QsCiAgICAvLyAgIENvbnRyYWN0V2l0aENyZWF0b3JPbmx5T3B0SW4sCiAgICAvLyAgIENoaWxkQ29udHJhY3QKICAgIC8vICkgewogICAgcHVzaGJ5dGVzcyAweDZhMTYzOTNkIDB4MTcxYzlmODggMHg2OGU4NjM0MyAvLyBtZXRob2QgInB1cmNoYXNlKHBheSxhZGRyZXNzLGFkZHJlc3Mpdm9pZCIsIG1ldGhvZCAicHVyY2hhc2VBc2EoYXhmZXIsYWRkcmVzcyxhZGRyZXNzKXZvaWQiLCBtZXRob2QgImRlbGlzdChhZGRyZXNzKXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBtYWluX3B1cmNoYXNlX3JvdXRlQDQgbWFpbl9wdXJjaGFzZUFzYV9yb3V0ZUA1IG1haW5fZGVsaXN0X3JvdXRlQDYKCm1haW5fc3dpdGNoX2Nhc2VfbmV4dEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxOC0yMgogICAgLy8gZXhwb3J0IGNsYXNzIExpc3RpbmcgZXh0ZW5kcyBjbGFzc2VzKAogICAgLy8gICBBa2l0YUJhc2VDb250cmFjdCwKICAgIC8vICAgQ29udHJhY3RXaXRoQ3JlYXRvck9ubHlPcHRJbiwKICAgIC8vICAgQ2hpbGRDb250cmFjdAogICAgLy8gKSB7CiAgICB0eG4gT25Db21wbGV0aW9uCiAgICAhCiAgICBhc3NlcnQKICAgIHR4biBBcHBsaWNhdGlvbklECiAgICBieiBtYWluX2NyZWF0ZV9Ob09wQDE0CiAgICBwdXNoYnl0ZXNzIDB4MTkzOTZjNGEgMHgzM2U5MmM5NCAweDg1NGRlZGUwIDB4M2VhMTE4MzIgLy8gbWV0aG9kICJjaGFuZ2VQcmljZSh1aW50NjQpdm9pZCIsIG1ldGhvZCAidXBkYXRlQWtpdGFEQU8odWludDY0KXZvaWQiLCBtZXRob2QgIm9wVXAoKXZvaWQiLCBtZXRob2QgIm9wdGluKHBheSx1aW50NjQpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIGNoYW5nZVByaWNlIHVwZGF0ZUFraXRhREFPIG1haW5fb3BVcF9yb3V0ZUAxMSBvcHRpbgogICAgZXJyCgptYWluX29wVXBfcm91dGVAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzAKICAgIC8vIG9wVXAoKTogdm9pZCB7IH0KICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCm1haW5fY3JlYXRlX05vT3BAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE4LTIyCiAgICAvLyBleHBvcnQgY2xhc3MgTGlzdGluZyBleHRlbmRzIGNsYXNzZXMoCiAgICAvLyAgIEFraXRhQmFzZUNvbnRyYWN0LAogICAgLy8gICBDb250cmFjdFdpdGhDcmVhdG9yT25seU9wdEluLAogICAgLy8gICBDaGlsZENvbnRyYWN0CiAgICAvLyApIHsKICAgIHB1c2hieXRlcyAweDljNTQyNDA5IC8vIG1ldGhvZCAiY3JlYXRlKHVpbnQ2NCxib29sLHVpbnQ2NCx1aW50NjQsdWludDY0LGFkZHJlc3MsKGFkZHJlc3MsdWludDY0KSxhZGRyZXNzLHVpbnQ2NCx1aW50NjQsYWRkcmVzcyxzdHJpbmcsdWludDY0LChzdHJpbmcsdWludDY0KSx1aW50NjQsYWRkcmVzcyx1aW50NjQpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIGNyZWF0ZQogICAgZXJyCgptYWluX2RlbGlzdF9yb3V0ZUA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0NDgKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6ICdEZWxldGVBcHBsaWNhdGlvbicgfSkKICAgIHR4biBPbkNvbXBsZXRpb24KICAgIHB1c2hpbnQgNSAvLyBEZWxldGVBcHBsaWNhdGlvbgogICAgPT0KICAgIHR4biBBcHBsaWNhdGlvbklECiAgICAmJgogICAgYXNzZXJ0CiAgICBiIGRlbGlzdAoKbWFpbl9wdXJjaGFzZUFzYV9yb3V0ZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MjEKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6ICdEZWxldGVBcHBsaWNhdGlvbicgfSkKICAgIHR4biBPbkNvbXBsZXRpb24KICAgIHB1c2hpbnQgNSAvLyBEZWxldGVBcHBsaWNhdGlvbgogICAgPT0KICAgIHR4biBBcHBsaWNhdGlvbklECiAgICAmJgogICAgYXNzZXJ0CiAgICBiIHB1cmNoYXNlQXNhCgptYWluX3B1cmNoYXNlX3JvdXRlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM4OAogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogJ0RlbGV0ZUFwcGxpY2F0aW9uJyB9KQogICAgdHhuIE9uQ29tcGxldGlvbgogICAgcHVzaGludCA1IC8vIERlbGV0ZUFwcGxpY2F0aW9uCiAgICA9PQogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgICYmCiAgICBhc3NlcnQKICAgIGIgcHVyY2hhc2UKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KGFraXRhREFPOiB1aW50NjQsIGFzc2V0OiB1aW50NjQsIHRpbWVUb1VubG9jazogdWludDY0LCBleHBpcmF0aW9uOiB1aW50NjQsIGFsbG9jYXRpb25zOiBieXRlcywgc3VtOiB1aW50NjQsIGNsb3NlT3V0OiB1aW50NjQsIHJlY2xhaW1UbzogYnl0ZXMpIC0+IGJ5dGVzLCBieXRlczoKY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjU5CiAgICAvLyBleHBvcnQgZnVuY3Rpb24gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudChha2l0YURBTzogQXBwbGljYXRpb24sIGFzc2V0OiB1aW50NjQsIHRpbWVUb1VubG9jazogdWludDY0LCBleHBpcmF0aW9uOiB1aW50NjQsIGFsbG9jYXRpb25zOiBVc2VyQWxsb2NhdGlvbltdLCBzdW06IHVpbnQ2NCwgY2xvc2VPdXQ6IGJvb2xlYW4sIHJlY2xhaW1UbzogQWNjb3VudCk6IHsgaWQ6IHVpbnQ2NCwgY29zdDogdWludDY0IH0gewogICAgcHJvdG8gOCAyCiAgICBwdXNoYnl0ZXMgIiIKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY2MAogICAgLy8gYXNzZXJ0KGFzc2V0ICE9PSAwIHx8IGNsb3NlT3V0ID09PSBmYWxzZSwgZXJyQ2Fubm90Q2xvc2VPdXRPZkFsZ29Gb3JiaWRkZW4pCiAgICBmcmFtZV9kaWcgLTcKICAgIGJueiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2Jvb2xfdHJ1ZUAyCiAgICBmcmFtZV9kaWcgLTIKICAgIGJueiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2Jvb2xfZmFsc2VAMwoKY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9ib29sX3RydWVAMjoKICAgIGludGNfMSAvLyAxCgpjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2Jvb2xfbWVyZ2VANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjYwCiAgICAvLyBhc3NlcnQoYXNzZXQgIT09IDAgfHwgY2xvc2VPdXQgPT09IGZhbHNlLCBlcnJDYW5ub3RDbG9zZU91dE9mQWxnb0ZvcmJpZGRlbikKICAgIGFzc2VydCAvLyBlcnJOY2NhCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjExMgogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgZnJhbWVfZGlnIC04CiAgICBwdXNoYnl0ZXMgImFhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjYxCiAgICAvLyBjb25zdCByZXdhcmRzQXBwID0gZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5yZXdhcmRzCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjY0CiAgICAvLyBjb25zdCBtYnI6IHVpbnQ2NCA9IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9ucy5sZW5ndGgpCiAgICBmcmFtZV9kaWcgLTQKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDI1MzAwCiAgICAqCiAgICBwdXNoaW50IDU0NTAwCiAgICArCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY2NgogICAgLy8gaWYgKGFzc2V0ID09PSAwKSB7CiAgICBmcmFtZV9kaWcgLTcKICAgIGJueiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2Vsc2VfYm9keUA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY2Ny02NzkKICAgIC8vIGlkID0gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUuY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudD4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyICsgc3VtCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdGltZVRvVW5sb2NrLAogICAgLy8gICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgYWxsb2NhdGlvbnMsCiAgICAvLyAgICAgcmVjbGFpbVRvCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY3MQogICAgLy8gcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjcyCiAgICAvLyBhbW91bnQ6IG1iciArIHN1bQogICAgZGlnIDIKICAgIGZyYW1lX2RpZyAtMwogICAgKwogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjcwLTY3MwogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogbWJyICsgc3VtCiAgICAvLyB9KSwKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjY3LTY3OQogICAgLy8gaWQgPSBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5jcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50Pih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtYnIgKyBzdW0KICAgIC8vICAgICB9KSwKICAgIC8vICAgICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICBhbGxvY2F0aW9ucywKICAgIC8vICAgICByZWNsYWltVG8KICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NzQKICAgIC8vIHRpbWVUb1VubG9jaywKICAgIGZyYW1lX2RpZyAtNgogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NzUKICAgIC8vIGV4cGlyYXRpb24sCiAgICBmcmFtZV9kaWcgLTUKICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY2Ny02NzkKICAgIC8vIGlkID0gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUuY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudD4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyICsgc3VtCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdGltZVRvVW5sb2NrLAogICAgLy8gICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgYWxsb2NhdGlvbnMsCiAgICAvLyAgICAgcmVjbGFpbVRvCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBwdXNoYnl0ZXMgMHhkY2FjMDkzNSAvLyBtZXRob2QgImNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQocGF5LHVpbnQ2NCx1aW50NjQsKGFkZHJlc3MsdWludDY0KVtdLGFkZHJlc3MpdWludDY0IgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC00CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC0xCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgc3dhcAogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjIDEyIC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKCmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYWZ0ZXJfaWZfZWxzZUAyMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzIxCiAgICAvLyByZXR1cm4geyBpZCwgY29zdCB9CiAgICBzd2FwCiAgICBpdG9iCiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtNAogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDMKICAgIHJldHN1YgoKY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9lbHNlX2JvZHlAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjgxCiAgICAvLyBpZiAoIUFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MuaXNPcHRlZEluKEFzc2V0KGFzc2V0KSkpIHsKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZnJhbWVfZGlnIC03CiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYnogY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9pZl9ib2R5QDkKICAgIGRpZyAxCgpjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2FmdGVyX2lmX2Vsc2VAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY5NgogICAgLy8gYXNzZXRSZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIGRpZyAxCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBzd2FwCiAgICBjb3ZlciA0CiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY5NQogICAgLy8gY29uc3QgdHJhbnNmZXJUeG4gPSBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3MDEKICAgIC8vIGlmIChjbG9zZU91dCkgewogICAgZnJhbWVfZGlnIC0yCiAgICBieiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2FmdGVyX2lmX2Vsc2VAMTQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzAyCiAgICAvLyB0cmFuc2ZlclR4bi5zZXQoeyBhc3NldENsb3NlVG86IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MgfSkKICAgIGRpZyAxCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBpbnRjXzEgLy8gMQogICAgZnJhbWVfYnVyeSAwCiAgICBmcmFtZV9idXJ5IDEKCmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYWZ0ZXJfaWZfZWxzZUAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzA1LTcxOAogICAgLy8gaWQgPSBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5jcmVhdGVJbnN0YW50QXNhRGlzYnVyc2VtZW50Pih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtYnIKICAgIC8vICAgICB9KSwKICAgIC8vICAgICB0cmFuc2ZlclR4biwKICAgIC8vICAgICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICBhbGxvY2F0aW9ucywKICAgIC8vICAgICByZWNsYWltVG8KICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzA5CiAgICAvLyByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIGRpZyAxCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICB1bmNvdmVyIDMKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjcwOC03MTEKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IG1icgogICAgLy8gfSksCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjcxMgogICAgLy8gdHJhbnNmZXJUeG4sCiAgICBpdHhuX25leHQKICAgIGZyYW1lX2RpZyAwCiAgICBieiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X25leHRfZmllbGRAMTcKICAgIGZyYW1lX2RpZyAxCiAgICBpdHhuX2ZpZWxkIEFzc2V0Q2xvc2VUbwoKY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9uZXh0X2ZpZWxkQDE3OgogICAgZnJhbWVfZGlnIC03CiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgZnJhbWVfZGlnIC0zCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2OTUtNjk5CiAgICAvLyBjb25zdCB0cmFuc2ZlclR4biA9IGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgIGFzc2V0UmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgIGFzc2V0QW1vdW50OiBzdW0sCiAgICAvLyAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vIH0pCiAgICBpbnRjXzMgLy8gNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjcwNS03MTgKICAgIC8vIGlkID0gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUuY3JlYXRlSW5zdGFudEFzYURpc2J1cnNlbWVudD4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdHJhbnNmZXJUeG4sCiAgICAvLyAgICAgdGltZVRvVW5sb2NrLAogICAgLy8gICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgYWxsb2NhdGlvbnMsCiAgICAvLyAgICAgcmVjbGFpbVRvCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzEzCiAgICAvLyB0aW1lVG9VbmxvY2ssCiAgICBmcmFtZV9kaWcgLTYKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzE0CiAgICAvLyBleHBpcmF0aW9uLAogICAgZnJhbWVfZGlnIC01CiAgICBpdG9iCiAgICB1bmNvdmVyIDMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3MDUtNzE4CiAgICAvLyBpZCA9IGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLmNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnQ+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1icgogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHRyYW5zZmVyVHhuLAogICAgLy8gICAgIHRpbWVUb1VubG9jaywKICAgIC8vICAgICBleHBpcmF0aW9uLAogICAgLy8gICAgIGFsbG9jYXRpb25zLAogICAgLy8gICAgIHJlY2xhaW1UbwogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgcHVzaGJ5dGVzIDB4YTNhMTZjYWEgLy8gbWV0aG9kICJjcmVhdGVJbnN0YW50QXNhRGlzYnVyc2VtZW50KHBheSxheGZlcix1aW50NjQsdWludDY0LChhZGRyZXNzLHVpbnQ2NClbXSxhZGRyZXNzKXVpbnQ2NCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGZyYW1lX2RpZyAtNAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGZyYW1lX2RpZyAtMQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIHN3YXAKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlYyAxMiAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICBiIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYWZ0ZXJfaWZfZWxzZUAyMAoKY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9pZl9ib2R5QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY4MgogICAgLy8gY29zdCArPSBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGRpZyAxCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjgzLTY5MgogICAgLy8gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIEFzc2V0KGFzc2V0KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2ODcKICAgIC8vIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgZGlnIDEKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2ODgKICAgIC8vIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY4Ni02ODkKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gfSksCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY4My02OTIKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBBc3NldChhc3NldCkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2OTAKICAgIC8vIEFzc2V0KGFzc2V0KQogICAgZnJhbWVfZGlnIC03CiAgICBpdG9iCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjgzLTY5MgogICAgLy8gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIEFzc2V0KGFzc2V0KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgcHVzaGJ5dGVzIDB4Mzk0ZWFlYjIgLy8gbWV0aG9kICJvcHRJbihwYXksdWludDY0KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBiIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYWZ0ZXJfaWZfZWxzZUAxMgoKY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9ib29sX2ZhbHNlQDM6CiAgICBpbnRjXzAgLy8gMAogICAgYiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2Jvb2xfbWVyZ2VANAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnNlbmRSZWZlcnJhbFBheW1lbnRUbyhha2l0YURBTzogdWludDY0LCByZWZlcnJlcjogYnl0ZXMsIGFzc2V0OiB1aW50NjQsIGFtb3VudDogdWludDY0LCByZWNsYWltVG86IGJ5dGVzKSAtPiBieXRlczoKc2VuZFJlZmVycmFsUGF5bWVudFRvOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5MDEKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiBzZW5kUmVmZXJyYWxQYXltZW50VG8oYWtpdGFEQU86IEFwcGxpY2F0aW9uLCByZWZlcnJlcjogQWNjb3VudCwgYXNzZXQ6IHVpbnQ2NCwgYW1vdW50OiB1aW50NjQsIHJlY2xhaW1UbzogQWNjb3VudCk6IFJlZmVycmFsUGF5bWVudEluZm8gewogICAgcHJvdG8gNSAxCiAgICBwdXNoYnl0ZXMgIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTAzCiAgICAvLyBpZiAoYW1vdW50ID4gMCAmJiByZWZlcnJlciAhPT0gR2xvYmFsLnplcm9BZGRyZXNzKSB7CiAgICBmcmFtZV9kaWcgLTIKICAgIGJ6IHNlbmRSZWZlcnJhbFBheW1lbnRUb19hZnRlcl9pZl9lbHNlQDYKICAgIGZyYW1lX2RpZyAtNAogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICAhPQogICAgYnogc2VuZFJlZmVycmFsUGF5bWVudFRvX2FmdGVyX2lmX2Vsc2VANgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMzYKICAgIC8vIGNvbnN0IFt3YWxsZXRGZWVzQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0RmVlcykpCiAgICBmcmFtZV9kaWcgLTUKICAgIHB1c2hieXRlcyAid2FsbGV0X2ZlZXMiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjkwNQogICAgLy8gY29uc3QgeyByZWZlcnJlclBlcmNlbnRhZ2UgfSA9IGdldFdhbGxldEZlZXMoYWtpdGFEQU8pCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTc2CiAgICAvLyBhc3NlcnQocCA8PSBESVZJU09SLCBlcnJJbnZhbGlkUGVyY2VudGFnZSkKICAgIGR1cAogICAgaW50YyA0IC8vIDEwMDAwMAogICAgPD0KICAgIGFzc2VydCAvLyBlcnJJcGN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE3NwogICAgLy8gcmV0dXJuIG9wLmRpdncoLi4ub3AubXVsdyhhLCBwKSwgRElWSVNPUikKICAgIGZyYW1lX2RpZyAtMgogICAgbXVsdwogICAgaW50YyA0IC8vIDEwMDAwMAogICAgZGl2dwogICAgZHVwCiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTA4CiAgICAvLyBpZiAocmVmZXJyYWxGZWUgPT09IDAgJiYgYW1vdW50ID4gMCkgewogICAgYm56IHNlbmRSZWZlcnJhbFBheW1lbnRUb19hZnRlcl9pZl9lbHNlQDUKICAgIGZyYW1lX2RpZyAtMgogICAgYnogc2VuZFJlZmVycmFsUGF5bWVudFRvX2FmdGVyX2lmX2Vsc2VANQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5MDkKICAgIC8vIHJlZmVycmFsRmVlID0gMQogICAgaW50Y18xIC8vIDEKICAgIGZyYW1lX2J1cnkgMAoKc2VuZFJlZmVycmFsUGF5bWVudFRvX2FmdGVyX2lmX2Vsc2VANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTE1CiAgICAvLyBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5MTYKICAgIC8vIChHbG9iYWwubGF0ZXN0VGltZXN0YW1wICsgVEhJUlRZX0RBWVMpLAogICAgZHVwCiAgICBwdXNoaW50IDI1OTIwMDAKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTE3CiAgICAvLyBbeyBhZGRyZXNzOiByZWZlcnJlciwgYW1vdW50OiByZWZlcnJhbEZlZSB9XSwKICAgIGZyYW1lX2RpZyAwCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGl0b2IKICAgIGZyYW1lX2RpZyAtNAogICAgc3dhcAogICAgY29uY2F0CiAgICBieXRlYyA0IC8vIDB4MDAwMQogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjkxMi05MjEKICAgIC8vIGNvbnN0IHsgY29zdDogcmVmZXJyYWxNYnIgfSA9IGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIGFraXRhREFPLAogICAgLy8gICBhc3NldCwKICAgIC8vICAgR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIC8vICAgKEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgKyBUSElSVFlfREFZUyksCiAgICAvLyAgIFt7IGFkZHJlc3M6IHJlZmVycmVyLCBhbW91bnQ6IHJlZmVycmFsRmVlIH1dLAogICAgLy8gICByZWZlcnJhbEZlZSwKICAgIC8vICAgZmFsc2UsCiAgICAvLyAgIHJlY2xhaW1UbwogICAgLy8gKQogICAgZnJhbWVfZGlnIC01CiAgICBmcmFtZV9kaWcgLTMKICAgIHVuY292ZXIgNQogICAgdW5jb3ZlciA0CiAgICB1bmNvdmVyIDQKICAgIGRpZyA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjkxOQogICAgLy8gZmFsc2UsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5MTItOTIxCiAgICAvLyBjb25zdCB7IGNvc3Q6IHJlZmVycmFsTWJyIH0gPSBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICBha2l0YURBTywKICAgIC8vICAgYXNzZXQsCiAgICAvLyAgIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICAvLyAgIChHbG9iYWwubGF0ZXN0VGltZXN0YW1wICsgVEhJUlRZX0RBWVMpLAogICAgLy8gICBbeyBhZGRyZXNzOiByZWZlcnJlciwgYW1vdW50OiByZWZlcnJhbEZlZSB9XSwKICAgIC8vICAgcmVmZXJyYWxGZWUsCiAgICAvLyAgIGZhbHNlLAogICAgLy8gICByZWNsYWltVG8KICAgIC8vICkKICAgIGZyYW1lX2RpZyAtMQogICAgY2FsbHN1YiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50CiAgICBwb3AKICAgIGV4dHJhY3QgOCA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjkyMwogICAgLy8gcmV0dXJuIHsgbGVmdG92ZXI6IChhbW91bnQgLSByZWZlcnJhbEZlZSksIHJlZmVycmFsTWJyIH0KICAgIGZyYW1lX2RpZyAtMgogICAgdW5jb3ZlciAyCiAgICAtCiAgICBpdG9iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIHJldHN1YgoKc2VuZFJlZmVycmFsUGF5bWVudFRvX2FmdGVyX2lmX2Vsc2VANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTI2CiAgICAvLyByZXR1cm4geyBsZWZ0b3ZlcjogYW1vdW50LCByZWZlcnJhbE1icjogMCB9CiAgICBmcmFtZV9kaWcgLTIKICAgIGl0b2IKICAgIGludGNfMCAvLyAwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHN3YXAKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6Okxpc3RpbmcuY3JlYXRlW3JvdXRpbmddKCkgLT4gdm9pZDoKY3JlYXRlOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMzAKICAgIC8vIEBhYmltZXRob2QoeyBvbkNyZWF0ZTogJ3JlcXVpcmUnIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18xIC8vIDEKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuYm9vbAogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNwogICAgZHVwCiAgICBjb3ZlciAyCiAgICBsZW4KICAgIHB1c2hpbnQgNDAKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9tYnIudHM6OkZ1bmRlckluZm8KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDgKICAgIGR1cAogICAgY292ZXIgMgogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDkKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEwCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxMQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgc3dhcAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDE0CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGR1cAogICAgbGVuCiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIHB1c2hpbnQgMTAKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCB0YWlsIHBvaW50ZXIgYXQgaW5kZXggMCBvZiAoKGxlbit1dGY4W10pLHVpbnQ2NCkKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgZGlnIDIKICAgIHN1YnN0cmluZzMKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDEyCiAgICArCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6RXNjcm93Q29uZmlnCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxNQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgNDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudHVwbGU8YXJjNC51aW50NjQsYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+LGFyYzQudWludDY0PgogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxNQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgNDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudHVwbGU8YXJjNC51aW50NjQsYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+LGFyYzQudWludDY0PgogICAgZXh0cmFjdCA4IDMyCiAgICBzd2FwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxNQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgNDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudHVwbGU8YXJjNC51aW50NjQsYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+LGFyYzQudWludDY0PgogICAgcHVzaGludCA0MAogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzUwCiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uSWQgIT09IDAsIGVyck11c3RCZUNhbGxlZEZyb21GYWN0b3J5KQogICAgZ2xvYmFsIENhbGxlckFwcGxpY2F0aW9uSUQKICAgIGJueiBjcmVhdGVfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDExIC8vICJFUlI6ZXJyTWJmZiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJNYmZmCgpjcmVhdGVfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI3CiAgICAvLyBwcml6ZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVByaXplIH0pCiAgICBieXRlY18zIC8vICJwcml6ZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzUyCiAgICAvLyB0aGlzLnByaXplLnZhbHVlID0gcHJpemUKICAgIHVuY292ZXIgMTcKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI5CiAgICAvLyBpc1ByaXplQm94ID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleUlzUHJpemVCb3ggfSkKICAgIGJ5dGVjIDUgLy8gImlzX3ByaXplX2JveCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzUzCiAgICAvLyB0aGlzLmlzUHJpemVCb3gudmFsdWUgPSBpc1ByaXplQm94CiAgICB1bmNvdmVyIDE2CiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMQogICAgLy8gcHJpY2UgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQcmljZSB9KQogICAgYnl0ZWMgNiAvLyAicHJpY2UiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM1NAogICAgLy8gdGhpcy5wcmljZS52YWx1ZSA9IHByaWNlCiAgICB1bmNvdmVyIDE1CiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMwogICAgLy8gcGF5bWVudEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQYXltZW50QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInBheW1lbnRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM1NQogICAgLy8gdGhpcy5wYXltZW50QXNzZXQudmFsdWUgPSBBc3NldChwYXltZW50QXNzZXQpCiAgICB1bmNvdmVyIDE0CiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNTYKICAgIC8vIGxvZ2dlZEFzc2VydChleHBpcmF0aW9uID09PSAwIHx8IGV4cGlyYXRpb24gPiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLCBlcnJJbnZhbGlkRXhwaXJhdGlvbikKICAgIGR1cAogICAgYnogY3JlYXRlX2Jvb2xfdHJ1ZUA1CiAgICBkdXAKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgID4KICAgIGJ6IGNyZWF0ZV9ib29sX2ZhbHNlQDYKCmNyZWF0ZV9ib29sX3RydWVANToKICAgIGludGNfMSAvLyAxCgpjcmVhdGVfYm9vbF9tZXJnZUA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNTYKICAgIC8vIGxvZ2dlZEFzc2VydChleHBpcmF0aW9uID09PSAwIHx8IGV4cGlyYXRpb24gPiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLCBlcnJJbnZhbGlkRXhwaXJhdGlvbikKICAgIGJueiBjcmVhdGVfYWZ0ZXJfYXNzZXJ0QDkKICAgIHB1c2hieXRlcyAiRVJSOmVycklleHAiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySWV4cAoKY3JlYXRlX2FmdGVyX2Fzc2VydEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNQogICAgLy8gZXhwaXJhdGlvbiA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleUV4cGlyYXRpb24gfSkKICAgIGJ5dGVjIDcgLy8gImV4cGlyYXRpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM1NwogICAgLy8gdGhpcy5leHBpcmF0aW9uLnZhbHVlID0gZXhwaXJhdGlvbgogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzcKICAgIC8vIHNlbGxlciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlTZWxsZXIgfSkKICAgIGJ5dGVjXzEgLy8gInNlbGxlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzU4CiAgICAvLyB0aGlzLnNlbGxlci52YWx1ZSA9IHNlbGxlcgogICAgdW5jb3ZlciAxMgogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9jaGlsZC50czoxMQogICAgLy8gZnVuZGVyID0gR2xvYmFsU3RhdGU8RnVuZGVySW5mbz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5RnVuZGVyIH0pCiAgICBwdXNoYnl0ZXMgImZ1bmRlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzU5CiAgICAvLyB0aGlzLmZ1bmRlci52YWx1ZSA9IGNsb25lKGZ1bmRlcikKICAgIHVuY292ZXIgMTEKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM5CiAgICAvLyByZXNlcnZlZEZvciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlSZXNlcnZlZEZvciB9KQogICAgYnl0ZWMgOCAvLyAicmVzZXJ2ZWRfZm9yIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNjAKICAgIC8vIHRoaXMucmVzZXJ2ZWRGb3IudmFsdWUgPSByZXNlcnZlZEZvcgogICAgdW5jb3ZlciAxMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDEKICAgIC8vIGNyZWF0b3JSb3lhbHR5ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5Q3JlYXRvclJveWFsdHkgfSkKICAgIGJ5dGVjIDEzIC8vICJjcmVhdG9yX3JveWFsdHkiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM2MQogICAgLy8gdGhpcy5jcmVhdG9yUm95YWx0eS52YWx1ZSA9IGNyZWF0b3JSb3lhbHR5CiAgICB1bmNvdmVyIDkKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQzCiAgICAvLyBnYXRlSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlHYXRlSUQgfSkKICAgIHB1c2hieXRlcyAiZ2F0ZV9pZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzYyCiAgICAvLyB0aGlzLmdhdGVJRC52YWx1ZSA9IGdhdGVJRAogICAgdW5jb3ZlciA4CiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo1NAogICAgLy8gbWFya2V0cGxhY2UgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5TWFya2V0cGxhY2UgfSkKICAgIGJ5dGVjIDkgLy8gIm1hcmtldHBsYWNlIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNjMKICAgIC8vIHRoaXMubWFya2V0cGxhY2UudmFsdWUgPSBtYXJrZXRwbGFjZQogICAgdW5jb3ZlciA3CiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE0CiAgICAvLyB2ZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogR2xvYmFsU3RhdGVLZXlWZXJzaW9uIH0pCiAgICBwdXNoYnl0ZXMgInZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM2NAogICAgLy8gdGhpcy52ZXJzaW9uLnZhbHVlID0gdmVyc2lvbgogICAgdW5jb3ZlciA2CiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMiAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNjUKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUgPSBha2l0YURBTwogICAgdW5jb3ZlciA1CiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo1OAogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlBa2l0YURBT0VzY3JvdyB9KQogICAgYnl0ZWMgMTAgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzY2CiAgICAvLyB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlID0gY2xvbmUoYWtpdGFEQU9Fc2Nyb3cpCiAgICB1bmNvdmVyIDQKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjYwCiAgICAvLyBwcml6ZUFtb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVByaXplQW1vdW50IH0pCiAgICBieXRlYyAyMCAvLyAicHJpemVfYW1vdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNjcKICAgIC8vIHRoaXMucHJpemVBbW91bnQudmFsdWUgPSBwcml6ZUFtb3VudAogICAgdW5jb3ZlciAzCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo2MgogICAgLy8gbGFzdFByaWNlUm91bmQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQcmljZVJvdW5kIH0pCiAgICBieXRlYyAxNCAvLyAicHJpY2Vfcm91bmQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM2OAogICAgLy8gdGhpcy5sYXN0UHJpY2VSb3VuZC52YWx1ZSA9IDAKICAgIGludGNfMCAvLyAwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo2NAogICAgLy8gcmV2ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5UmV2aXNpb24gfSkKICAgIHB1c2hieXRlcyAicmV2IgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNjkKICAgIC8vIHRoaXMucmV2LnZhbHVlID0gTGlzdGluZ1JldmlzaW9uCiAgICBwdXNoaW50IDMKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjcxCiAgICAvLyBzZWxsZXJSZWZlcnJlciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlTZWxsZXJSZWZlcnJlciB9KQogICAgYnl0ZWMgMTUgLy8gInNlbGxlcl9yZWZlcnJlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzcwCiAgICAvLyB0aGlzLnNlbGxlclJlZmVycmVyLnZhbHVlID0gc2VsbGVyUmVmZXJyZXIKICAgIHVuY292ZXIgMgogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NzYKICAgIC8vIGZhY3RvcnlGbG9hdCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleUZhY3RvcnlGbG9hdCB9KQogICAgcHVzaGJ5dGVzICJmYWN0b3J5X2Zsb2F0IgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNzEKICAgIC8vIHRoaXMuZmFjdG9yeUZsb2F0LnZhbHVlID0gZmFjdG9yeUZsb2F0CiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNzQKICAgIC8vIHRoaXMubWFya2V0cGxhY2VSb3lhbHRpZXMudmFsdWUgPSBnZXRORlRGZWVzKHRoaXMuYWtpdGFEQU8udmFsdWUpLm1hcmtldHBsYWNlQ29tcG9zYWJsZVBlcmNlbnRhZ2UKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18yIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM3NAogICAgLy8gdGhpcy5tYXJrZXRwbGFjZVJveWFsdGllcy52YWx1ZSA9IGdldE5GVEZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkubWFya2V0cGxhY2VDb21wb3NhYmxlUGVyY2VudGFnZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTYxCiAgICAvLyBjb25zdCBbbmZ0RmVlc0J5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c05GVEZlZXMpKQogICAgYnl0ZWMgMjEgLy8gIm5mdF9mZWVzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNzQKICAgIC8vIHRoaXMubWFya2V0cGxhY2VSb3lhbHRpZXMudmFsdWUgPSBnZXRORlRGZWVzKHRoaXMuYWtpdGFEQU8udmFsdWUpLm1hcmtldHBsYWNlQ29tcG9zYWJsZVBlcmNlbnRhZ2UKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjU2CiAgICAvLyBtYXJrZXRwbGFjZVJveWFsdGllcyA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleU1hcmtldHBsYWNlUm95YWx0aWVzIH0pCiAgICBieXRlYyAxNiAvLyAibWFya2V0cGxhY2Vfcm95YWx0aWVzIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNzQKICAgIC8vIHRoaXMubWFya2V0cGxhY2VSb3lhbHRpZXMudmFsdWUgPSBnZXRORlRGZWVzKHRoaXMuYWtpdGFEQU8udmFsdWUpLm1hcmtldHBsYWNlQ29tcG9zYWJsZVBlcmNlbnRhZ2UKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMzMAogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmNyZWF0ZV9ib29sX2ZhbHNlQDY6CiAgICBpbnRjXzAgLy8gMAogICAgYiBjcmVhdGVfYm9vbF9tZXJnZUA3CgoKLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo6TGlzdGluZy5wdXJjaGFzZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnB1cmNoYXNlOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozODgKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6ICdEZWxldGVBcHBsaWNhdGlvbicgfSkKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBjb3ZlciAzCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozOTQKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSBHbG9iYWwuY3JlYXRvckFkZHJlc3MsIGVyck11c3RCZUNhbGxlZEZyb21GYWN0b3J5KQogICAgdHhuIFNlbmRlcgogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICA9PQogICAgYm56IHB1cmNoYXNlX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAxMSAvLyAiRVJSOmVyck1iZmYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTWJmZgoKcHVyY2hhc2VfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM5NQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLmlkID09PSAwLCBlcnJQYXltZW50QXNzZXRNdXN0QmVBbGdvKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzMKICAgIC8vIHBheW1lbnRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5UGF5bWVudEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJwYXltZW50X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozOTUKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnBheW1lbnRBc3NldC52YWx1ZS5pZCA9PT0gMCwgZXJyUGF5bWVudEFzc2V0TXVzdEJlQWxnbykKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBwdXJjaGFzZV9hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6ZXJyUGFtYSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJQYW1hCgpwdXJjaGFzZV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6Mzk2CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5leHBpcmF0aW9uLnZhbHVlID09PSAwIHx8IHRoaXMuZXhwaXJhdGlvbi52YWx1ZSA+IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsIGVyckxpc3RpbmdFeHBpcmVkKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzUKICAgIC8vIGV4cGlyYXRpb24gPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlFeHBpcmF0aW9uIH0pCiAgICBieXRlYyA3IC8vICJleHBpcmF0aW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozOTYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmV4cGlyYXRpb24udmFsdWUgPT09IDAgfHwgdGhpcy5leHBpcmF0aW9uLnZhbHVlID4gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwgZXJyTGlzdGluZ0V4cGlyZWQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogcHVyY2hhc2VfYm9vbF90cnVlQDcKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM1CiAgICAvLyBleHBpcmF0aW9uID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5RXhwaXJhdGlvbiB9KQogICAgYnl0ZWMgNyAvLyAiZXhwaXJhdGlvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6Mzk2CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5leHBpcmF0aW9uLnZhbHVlID09PSAwIHx8IHRoaXMuZXhwaXJhdGlvbi52YWx1ZSA+IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsIGVyckxpc3RpbmdFeHBpcmVkKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgID4KICAgIGJ6IHB1cmNoYXNlX2Jvb2xfZmFsc2VAOAoKcHVyY2hhc2VfYm9vbF90cnVlQDc6CiAgICBpbnRjXzEgLy8gMQoKcHVyY2hhc2VfYm9vbF9tZXJnZUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozOTYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmV4cGlyYXRpb24udmFsdWUgPT09IDAgfHwgdGhpcy5leHBpcmF0aW9uLnZhbHVlID4gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwgZXJyTGlzdGluZ0V4cGlyZWQpCiAgICBibnogcHVyY2hhc2VfYWZ0ZXJfYXNzZXJ0QDExCiAgICBieXRlYyAyMiAvLyAiRVJSOmVyckxleHAiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTGV4cAoKcHVyY2hhc2VfYWZ0ZXJfYXNzZXJ0QDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozOTcKICAgIC8vIHRoaXMuYXNzZXJ0UHJpY2VTZXR0bGVkKCkKICAgIGNhbGxzdWIgYXNzZXJ0UHJpY2VTZXR0bGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM5OQogICAgLy8gaWYgKHRoaXMucmVzZXJ2ZWRGb3IudmFsdWUgIT09IEdsb2JhbC56ZXJvQWRkcmVzcykgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzkKICAgIC8vIHJlc2VydmVkRm9yID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVJlc2VydmVkRm9yIH0pCiAgICBieXRlYyA4IC8vICJyZXNlcnZlZF9mb3IiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM5OQogICAgLy8gaWYgKHRoaXMucmVzZXJ2ZWRGb3IudmFsdWUgIT09IEdsb2JhbC56ZXJvQWRkcmVzcykgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgIT0KICAgIGJ6IHB1cmNoYXNlX2FmdGVyX2lmX2Vsc2VAMTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDAwCiAgICAvLyBsb2dnZWRBc3NlcnQoYnV5ZXIgPT09IHRoaXMucmVzZXJ2ZWRGb3IudmFsdWUsIGVyclJlc2VydmVkRm9yRGlmZmVyZW50QWRkcmVzcykKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM5CiAgICAvLyByZXNlcnZlZEZvciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlSZXNlcnZlZEZvciB9KQogICAgYnl0ZWMgOCAvLyAicmVzZXJ2ZWRfZm9yIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MDAKICAgIC8vIGxvZ2dlZEFzc2VydChidXllciA9PT0gdGhpcy5yZXNlcnZlZEZvci52YWx1ZSwgZXJyUmVzZXJ2ZWRGb3JEaWZmZXJlbnRBZGRyZXNzKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyAxCiAgICA9PQogICAgYm56IHB1cmNoYXNlX2FmdGVyX2lmX2Vsc2VAMTUKICAgIGJ5dGVjIDIzIC8vICJFUlI6ZXJyUmZkYSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJSZmRhCgpwdXJjaGFzZV9hZnRlcl9pZl9lbHNlQDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MDMKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnNlbmRlciA9PT0gR2xvYmFsLmNyZWF0b3JBZGRyZXNzLCBlcnJJbnZhbGlkUGF5bWVudCkKICAgIGRpZyAxCiAgICBndHhucyBTZW5kZXIKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgPT0KICAgIGJueiBwdXJjaGFzZV9hZnRlcl9hc3NlcnRAMTcKICAgIGJ5dGVjIDE3IC8vICJFUlI6ZXJySXBheSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcGF5CgpwdXJjaGFzZV9hZnRlcl9hc3NlcnRAMTc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQwNAogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBlcnJJbnZhbGlkUGF5bWVudCkKICAgIGRpZyAxCiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogcHVyY2hhc2VfYWZ0ZXJfYXNzZXJ0QDE5CiAgICBieXRlYyAxNyAvLyAiRVJSOmVycklwYXkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBheQoKcHVyY2hhc2VfYWZ0ZXJfYXNzZXJ0QDE5OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MDUKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LmFtb3VudCA9PT0gdGhpcy5wcmljZS52YWx1ZSwgZXJySW52YWxpZFBheW1lbnQpCiAgICBzd2FwCiAgICBndHhucyBBbW91bnQKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMxCiAgICAvLyBwcmljZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVByaWNlIH0pCiAgICBieXRlYyA2IC8vICJwcmljZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDA1CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IHRoaXMucHJpY2UudmFsdWUsIGVyckludmFsaWRQYXltZW50KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgID09CiAgICBibnogcHVyY2hhc2VfYWZ0ZXJfYXNzZXJ0QDIxCiAgICBieXRlYyAxNyAvLyAiRVJSOmVycklwYXkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBheQoKcHVyY2hhc2VfYWZ0ZXJfYXNzZXJ0QDIxOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MDcKICAgIC8vIHRoaXMudHJhbnNmZXJQdXJjaGFzZVRvQnV5ZXIoYnV5ZXIpCiAgICBjYWxsc3ViIHRyYW5zZmVyUHVyY2hhc2VUb0J1eWVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE1NAogICAgLy8gY29uc3QgYW1vdW50cyA9IHRoaXMuZ2V0QW1vdW50cyh0aGlzLnByaWNlLnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzEKICAgIC8vIHByaWNlID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5UHJpY2UgfSkKICAgIGJ5dGVjIDYgLy8gInByaWNlIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxNTQKICAgIC8vIGNvbnN0IGFtb3VudHMgPSB0aGlzLmdldEFtb3VudHModGhpcy5wcmljZS52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBjYWxsc3ViIGdldEFtb3VudHMKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxNTcKICAgIC8vIGxldCBsZWZ0b3ZlcjogdWludDY0ID0gYW1vdW50cy5ha2l0YQogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTU4CiAgICAvLyBpZiAoYW1vdW50cy5ha2l0YSA+IDApIHsKICAgIGJ6IHB1cmNoYXNlX2FmdGVyX2lmX2Vsc2VAMjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTU5CiAgICAvLyAoeyBsZWZ0b3ZlciB9ID0gc2VuZFJlZmVycmFsUGF5bWVudFRvKHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuc2VsbGVyUmVmZXJyZXIudmFsdWUsIDAsIGFtb3VudHMuYWtpdGEsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzIgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTU5CiAgICAvLyAoeyBsZWZ0b3ZlciB9ID0gc2VuZFJlZmVycmFsUGF5bWVudFRvKHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuc2VsbGVyUmVmZXJyZXIudmFsdWUsIDAsIGFtb3VudHMuYWtpdGEsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjcxCiAgICAvLyBzZWxsZXJSZWZlcnJlciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlTZWxsZXJSZWZlcnJlciB9KQogICAgYnl0ZWMgMTUgLy8gInNlbGxlcl9yZWZlcnJlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTU5CiAgICAvLyAoeyBsZWZ0b3ZlciB9ID0gc2VuZFJlZmVycmFsUGF5bWVudFRvKHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuc2VsbGVyUmVmZXJyZXIudmFsdWUsIDAsIGFtb3VudHMuYWtpdGEsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjU4CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleUFraXRhREFPRXNjcm93IH0pCiAgICBieXRlYyAxMCAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxNTkKICAgIC8vICh7IGxlZnRvdmVyIH0gPSBzZW5kUmVmZXJyYWxQYXltZW50VG8odGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5zZWxsZXJSZWZlcnJlci52YWx1ZSwgMCwgYW1vdW50cy5ha2l0YSwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcykpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgcHVzaGludCAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgY292ZXIgMgogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciA0CiAgICBjYWxsc3ViIHNlbmRSZWZlcnJhbFBheW1lbnRUbwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CgpwdXJjaGFzZV9hZnRlcl9pZl9lbHNlQDI0OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxNjItMTY3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IGxlZnRvdmVyLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTY0CiAgICAvLyByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjU4CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleUFraXRhREFPRXNjcm93IH0pCiAgICBieXRlYyAxMCAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxNjQKICAgIC8vIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHB1c2hpbnQgMgogICAgZXh0cmFjdF91aW50NjQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE2Mi0xNjYKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogbGVmdG92ZXIsCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE2Mi0xNjcKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogbGVmdG92ZXIsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTcwLTE3NQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLm1hcmtldHBsYWNlLAogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLm1hcmtldHBsYWNlLnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTcyCiAgICAvLyBhbW91bnQ6IGFtb3VudHMubWFya2V0cGxhY2UsCiAgICBkdXAKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE3MwogICAgLy8gcmVjZWl2ZXI6IHRoaXMubWFya2V0cGxhY2UudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo1NAogICAgLy8gbWFya2V0cGxhY2UgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5TWFya2V0cGxhY2UgfSkKICAgIGJ5dGVjIDkgLy8gIm1hcmtldHBsYWNlIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxNzMKICAgIC8vIHJlY2VpdmVyOiB0aGlzLm1hcmtldHBsYWNlLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGR1cAogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTcwLTE3NAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLm1hcmtldHBsYWNlLAogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLm1hcmtldHBsYWNlLnZhbHVlLAogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxNzAtMTc1CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudHMubWFya2V0cGxhY2UsCiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMubWFya2V0cGxhY2UudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTc4LTE4MwogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLm1hcmtldHBsYWNlLAogICAgLy8gICAgIHJlY2VpdmVyOiBtYXJrZXRwbGFjZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICBkaWcgMgogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTc4LTE4MgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLm1hcmtldHBsYWNlLAogICAgLy8gICAgIHJlY2VpdmVyOiBtYXJrZXRwbGFjZSwKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTc4LTE4MwogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLm1hcmtldHBsYWNlLAogICAgLy8gICAgIHJlY2VpdmVyOiBtYXJrZXRwbGFjZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxODYKICAgIC8vIGlmICh0aGlzLmlzUHJpemVCb3gudmFsdWUpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI5CiAgICAvLyBpc1ByaXplQm94ID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleUlzUHJpemVCb3ggfSkKICAgIGJ5dGVjIDUgLy8gImlzX3ByaXplX2JveCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTg2CiAgICAvLyBpZiAodGhpcy5pc1ByaXplQm94LnZhbHVlKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogcHVyY2hhc2VfZWxzZV9ib2R5QDI2CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE4Ny0xOTIKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGFtb3VudDogYW1vdW50cy5zZWxsZXIsCiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMuc2VsbGVyLnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTg5CiAgICAvLyBhbW91bnQ6IGFtb3VudHMuc2VsbGVyLAogICAgcHVzaGludCAyNAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTkwCiAgICAvLyByZWNlaXZlcjogdGhpcy5zZWxsZXIudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNwogICAgLy8gc2VsbGVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVNlbGxlciB9KQogICAgYnl0ZWNfMSAvLyAic2VsbGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxOTAKICAgIC8vIHJlY2VpdmVyOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxODctMTkxCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudHMuc2VsbGVyLAogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTg3LTE5MgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLnNlbGxlciwKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5zZWxsZXIudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKCnB1cmNoYXNlX2FmdGVyX2lmX2Vsc2VAMjc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQwOS00MTEKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoeyBjbG9zZVJlbWFpbmRlclRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQxMAogICAgLy8gLnBheW1lbnQoeyBjbG9zZVJlbWFpbmRlclRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MgfSkKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgaXR4bl9maWVsZCBDbG9zZVJlbWFpbmRlclRvCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQwOS00MTAKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoeyBjbG9zZVJlbWFpbmRlclRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDA5LTQxMQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7IGNsb3NlUmVtYWluZGVyVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcyB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM4OAogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogJ0RlbGV0ZUFwcGxpY2F0aW9uJyB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKcHVyY2hhc2VfZWxzZV9ib2R5QDI2OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxOTQKICAgIC8vIGNvbnN0IGFzc2V0UHJpemUgPSBBc3NldCh0aGlzLnByaXplLnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjcKICAgIC8vIHByaXplID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5UHJpemUgfSkKICAgIGJ5dGVjXzMgLy8gInByaXplIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxOTQKICAgIC8vIGNvbnN0IGFzc2V0UHJpemUgPSBBc3NldCh0aGlzLnByaXplLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTk3LTIwMgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLmNyZWF0b3IsCiAgICAvLyAgICAgcmVjZWl2ZXI6IGFzc2V0UHJpemUuY3JlYXRvciwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE5OQogICAgLy8gYW1vdW50OiBhbW91bnRzLmNyZWF0b3IsCiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIwMAogICAgLy8gcmVjZWl2ZXI6IGFzc2V0UHJpemUuY3JlYXRvciwKICAgIGRpZyAxCiAgICBhc3NldF9wYXJhbXNfZ2V0IEFzc2V0Q3JlYXRvcgogICAgYXNzZXJ0IC8vIGFzc2V0IGV4aXN0cwogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTk3LTIwMQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLmNyZWF0b3IsCiAgICAvLyAgICAgcmVjZWl2ZXI6IGFzc2V0UHJpemUuY3JlYXRvciwKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTk3LTIwMgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLmNyZWF0b3IsCiAgICAvLyAgICAgcmVjZWl2ZXI6IGFzc2V0UHJpemUuY3JlYXRvciwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyMDUtMjExCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudHMuc2VsbGVyLAogICAgLy8gICAgIG5vdGU6IFN0cmluZyhhc3NldFByaXplLm5hbWUpICsgJyBTb2xkJywKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5zZWxsZXIudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyMDcKICAgIC8vIGFtb3VudDogYW1vdW50cy5zZWxsZXIsCiAgICBzd2FwCiAgICBwdXNoaW50IDI0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyMDgKICAgIC8vIG5vdGU6IFN0cmluZyhhc3NldFByaXplLm5hbWUpICsgJyBTb2xkJywKICAgIHN3YXAKICAgIGFzc2V0X3BhcmFtc19nZXQgQXNzZXROYW1lCiAgICBhc3NlcnQgLy8gYXNzZXQgZXhpc3RzCiAgICBwdXNoYnl0ZXMgIiBTb2xkIgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIwOQogICAgLy8gcmVjZWl2ZXI6IHRoaXMuc2VsbGVyLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzcKICAgIC8vIHNlbGxlciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlTZWxsZXIgfSkKICAgIGJ5dGVjXzEgLy8gInNlbGxlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjA5CiAgICAvLyByZWNlaXZlcjogdGhpcy5zZWxsZXIudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgaXR4bl9maWVsZCBOb3RlCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyMDUtMjEwCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudHMuc2VsbGVyLAogICAgLy8gICAgIG5vdGU6IFN0cmluZyhhc3NldFByaXplLm5hbWUpICsgJyBTb2xkJywKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5zZWxsZXIudmFsdWUsCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIwNS0yMTEKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGFtb3VudDogYW1vdW50cy5zZWxsZXIsCiAgICAvLyAgICAgbm90ZTogU3RyaW5nKGFzc2V0UHJpemUubmFtZSkgKyAnIFNvbGQnLAogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgYiBwdXJjaGFzZV9hZnRlcl9pZl9lbHNlQDI3CgpwdXJjaGFzZV9ib29sX2ZhbHNlQDg6CiAgICBpbnRjXzAgLy8gMAogICAgYiBwdXJjaGFzZV9ib29sX21lcmdlQDkKCgovLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjpMaXN0aW5nLnB1cmNoYXNlQXNhW3JvdXRpbmddKCkgLT4gdm9pZDoKcHVyY2hhc2VBc2E6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQyMQogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogJ0RlbGV0ZUFwcGxpY2F0aW9uJyB9KQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzMgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MjcKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSBHbG9iYWwuY3JlYXRvckFkZHJlc3MsIGVyck11c3RCZUNhbGxlZEZyb21GYWN0b3J5KQogICAgdHhuIFNlbmRlcgogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICA9PQogICAgYm56IHB1cmNoYXNlQXNhX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAxMSAvLyAiRVJSOmVyck1iZmYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTWJmZgoKcHVyY2hhc2VBc2FfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQyOAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLmlkICE9PSAwLCBlcnJQYXltZW50QXNzZXRNdXN0Tm90QmVBbGdvKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzMKICAgIC8vIHBheW1lbnRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5UGF5bWVudEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJwYXltZW50X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MjgKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnBheW1lbnRBc3NldC52YWx1ZS5pZCAhPT0gMCwgZXJyUGF5bWVudEFzc2V0TXVzdE5vdEJlQWxnbykKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBibnogcHVyY2hhc2VBc2FfYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOmVyclBhbmEiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyUGFuYQoKcHVyY2hhc2VBc2FfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQyOQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZXhwaXJhdGlvbi52YWx1ZSA9PT0gMCB8fCB0aGlzLmV4cGlyYXRpb24udmFsdWUgPiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLCBlcnJMaXN0aW5nRXhwaXJlZCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM1CiAgICAvLyBleHBpcmF0aW9uID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5RXhwaXJhdGlvbiB9KQogICAgYnl0ZWMgNyAvLyAiZXhwaXJhdGlvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDI5CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5leHBpcmF0aW9uLnZhbHVlID09PSAwIHx8IHRoaXMuZXhwaXJhdGlvbi52YWx1ZSA+IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsIGVyckxpc3RpbmdFeHBpcmVkKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IHB1cmNoYXNlQXNhX2Jvb2xfdHJ1ZUA3CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNQogICAgLy8gZXhwaXJhdGlvbiA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleUV4cGlyYXRpb24gfSkKICAgIGJ5dGVjIDcgLy8gImV4cGlyYXRpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQyOQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZXhwaXJhdGlvbi52YWx1ZSA9PT0gMCB8fCB0aGlzLmV4cGlyYXRpb24udmFsdWUgPiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLCBlcnJMaXN0aW5nRXhwaXJlZCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICA+CiAgICBieiBwdXJjaGFzZUFzYV9ib29sX2ZhbHNlQDgKCnB1cmNoYXNlQXNhX2Jvb2xfdHJ1ZUA3OgogICAgaW50Y18xIC8vIDEKCnB1cmNoYXNlQXNhX2Jvb2xfbWVyZ2VAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDI5CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5leHBpcmF0aW9uLnZhbHVlID09PSAwIHx8IHRoaXMuZXhwaXJhdGlvbi52YWx1ZSA+IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsIGVyckxpc3RpbmdFeHBpcmVkKQogICAgYm56IHB1cmNoYXNlQXNhX2FmdGVyX2Fzc2VydEAxMQogICAgYnl0ZWMgMjIgLy8gIkVSUjplcnJMZXhwIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckxleHAKCnB1cmNoYXNlQXNhX2FmdGVyX2Fzc2VydEAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDMwCiAgICAvLyB0aGlzLmFzc2VydFByaWNlU2V0dGxlZCgpCiAgICBjYWxsc3ViIGFzc2VydFByaWNlU2V0dGxlZAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MzIKICAgIC8vIGlmICh0aGlzLnJlc2VydmVkRm9yLnZhbHVlICE9PSBHbG9iYWwuemVyb0FkZHJlc3MpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM5CiAgICAvLyByZXNlcnZlZEZvciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlSZXNlcnZlZEZvciB9KQogICAgYnl0ZWMgOCAvLyAicmVzZXJ2ZWRfZm9yIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MzIKICAgIC8vIGlmICh0aGlzLnJlc2VydmVkRm9yLnZhbHVlICE9PSBHbG9iYWwuemVyb0FkZHJlc3MpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgICE9CiAgICBieiBwdXJjaGFzZUFzYV9hZnRlcl9pZl9lbHNlQDE1CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQzMwogICAgLy8gbG9nZ2VkQXNzZXJ0KGJ1eWVyID09PSB0aGlzLnJlc2VydmVkRm9yLnZhbHVlLCBlcnJSZXNlcnZlZEZvckRpZmZlcmVudEFkZHJlc3MpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozOQogICAgLy8gcmVzZXJ2ZWRGb3IgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5UmVzZXJ2ZWRGb3IgfSkKICAgIGJ5dGVjIDggLy8gInJlc2VydmVkX2ZvciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDMzCiAgICAvLyBsb2dnZWRBc3NlcnQoYnV5ZXIgPT09IHRoaXMucmVzZXJ2ZWRGb3IudmFsdWUsIGVyclJlc2VydmVkRm9yRGlmZmVyZW50QWRkcmVzcykKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgMQogICAgPT0KICAgIGJueiBwdXJjaGFzZUFzYV9hZnRlcl9pZl9lbHNlQDE1CiAgICBieXRlYyAyMyAvLyAiRVJSOmVyclJmZGEiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyUmZkYQoKcHVyY2hhc2VBc2FfYWZ0ZXJfaWZfZWxzZUAxNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDM2CiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLnhmZXJBc3NldC5pZCA9PT0gdGhpcy5wYXltZW50QXNzZXQudmFsdWUuaWQsIGVyckludmFsaWRUcmFuc2ZlcikKICAgIGRpZyAyCiAgICBndHhucyBYZmVyQXNzZXQKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMzCiAgICAvLyBwYXltZW50QXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVBheW1lbnRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAicGF5bWVudF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDM2CiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLnhmZXJBc3NldC5pZCA9PT0gdGhpcy5wYXltZW50QXNzZXQudmFsdWUuaWQsIGVyckludmFsaWRUcmFuc2ZlcikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA9PQogICAgYm56IHB1cmNoYXNlQXNhX2FmdGVyX2Fzc2VydEAxNwogICAgYnl0ZWMgMTggLy8gIkVSUjplcnJJeGZyIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckl4ZnIKCnB1cmNoYXNlQXNhX2FmdGVyX2Fzc2VydEAxNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDM3CiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLmFzc2V0UmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBlcnJJbnZhbGlkVHJhbnNmZXIpCiAgICBkaWcgMgogICAgZ3R4bnMgQXNzZXRSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogcHVyY2hhc2VBc2FfYWZ0ZXJfYXNzZXJ0QDE5CiAgICBieXRlYyAxOCAvLyAiRVJSOmVyckl4ZnIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXhmcgoKcHVyY2hhc2VBc2FfYWZ0ZXJfYXNzZXJ0QDE5OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MzgKICAgIC8vIGxvZ2dlZEFzc2VydChhc3NldFhmZXIuYXNzZXRBbW91bnQgPT09IHRoaXMucHJpY2UudmFsdWUsIGVyckludmFsaWRUcmFuc2ZlcikKICAgIHVuY292ZXIgMgogICAgZ3R4bnMgQXNzZXRBbW91bnQKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMxCiAgICAvLyBwcmljZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVByaWNlIH0pCiAgICBieXRlYyA2IC8vICJwcmljZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDM4CiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLmFzc2V0QW1vdW50ID09PSB0aGlzLnByaWNlLnZhbHVlLCBlcnJJbnZhbGlkVHJhbnNmZXIpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPT0KICAgIGJueiBwdXJjaGFzZUFzYV9hZnRlcl9hc3NlcnRAMjEKICAgIGJ5dGVjIDE4IC8vICJFUlI6ZXJySXhmciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJeGZyCgpwdXJjaGFzZUFzYV9hZnRlcl9hc3NlcnRAMjE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ0MAogICAgLy8gdGhpcy50cmFuc2ZlclB1cmNoYXNlVG9CdXllcihidXllcikKICAgIGNhbGxzdWIgdHJhbnNmZXJQdXJjaGFzZVRvQnV5ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjE3CiAgICAvLyBjb25zdCBhbW91bnRzID0gdGhpcy5nZXRBbW91bnRzKHRoaXMucHJpY2UudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMQogICAgLy8gcHJpY2UgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQcmljZSB9KQogICAgYnl0ZWMgNiAvLyAicHJpY2UiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIxNwogICAgLy8gY29uc3QgYW1vdW50cyA9IHRoaXMuZ2V0QW1vdW50cyh0aGlzLnByaWNlLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGNhbGxzdWIgZ2V0QW1vdW50cwogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIyMAogICAgLy8gbGV0IGxlZnRvdmVyOiB1aW50NjQgPSBhbW91bnRzLmFraXRhCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyMjEKICAgIC8vIGlmIChhbW91bnRzLmFraXRhID4gMCkgewogICAgYnogcHVyY2hhc2VBc2FfYWZ0ZXJfaWZfZWxzZUAyNAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyMjIKICAgIC8vICh7IGxlZnRvdmVyIH0gPSBzZW5kUmVmZXJyYWxQYXltZW50VG8odGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5zZWxsZXJSZWZlcnJlci52YWx1ZSwgdGhpcy5wYXltZW50QXNzZXQudmFsdWUuaWQsIGFtb3VudHMuYWtpdGEsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzIgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjIyCiAgICAvLyAoeyBsZWZ0b3ZlciB9ID0gc2VuZFJlZmVycmFsUGF5bWVudFRvKHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuc2VsbGVyUmVmZXJyZXIudmFsdWUsIHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLmlkLCBhbW91bnRzLmFraXRhLCB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzKSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo3MQogICAgLy8gc2VsbGVyUmVmZXJyZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5U2VsbGVyUmVmZXJyZXIgfSkKICAgIGJ5dGVjIDE1IC8vICJzZWxsZXJfcmVmZXJyZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIyMgogICAgLy8gKHsgbGVmdG92ZXIgfSA9IHNlbmRSZWZlcnJhbFBheW1lbnRUbyh0aGlzLmFraXRhREFPLnZhbHVlLCB0aGlzLnNlbGxlclJlZmVycmVyLnZhbHVlLCB0aGlzLnBheW1lbnRBc3NldC52YWx1ZS5pZCwgYW1vdW50cy5ha2l0YSwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcykpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzMKICAgIC8vIHBheW1lbnRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5UGF5bWVudEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJwYXltZW50X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyMjIKICAgIC8vICh7IGxlZnRvdmVyIH0gPSBzZW5kUmVmZXJyYWxQYXltZW50VG8odGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5zZWxsZXJSZWZlcnJlci52YWx1ZSwgdGhpcy5wYXltZW50QXNzZXQudmFsdWUuaWQsIGFtb3VudHMuYWtpdGEsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjU4CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleUFraXRhREFPRXNjcm93IH0pCiAgICBieXRlYyAxMCAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyMjIKICAgIC8vICh7IGxlZnRvdmVyIH0gPSBzZW5kUmVmZXJyYWxQYXltZW50VG8odGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5zZWxsZXJSZWZlcnJlci52YWx1ZSwgdGhpcy5wYXltZW50QXNzZXQudmFsdWUuaWQsIGFtb3VudHMuYWtpdGEsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHB1c2hpbnQgMgogICAgZXh0cmFjdF91aW50NjQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGNvdmVyIDMKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciA0CiAgICBjYWxsc3ViIHNlbmRSZWZlcnJhbFBheW1lbnRUbwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CgpwdXJjaGFzZUFzYV9hZnRlcl9pZl9lbHNlQDI0OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyMjUtMjMxCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBsZWZ0b3ZlciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjI3CiAgICAvLyBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NTgKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5QWtpdGFEQU9Fc2Nyb3cgfSkKICAgIGJ5dGVjIDEwIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIyNwogICAgLy8gYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBwdXNoaW50IDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIyOQogICAgLy8geGZlckFzc2V0OiB0aGlzLnBheW1lbnRBc3NldC52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMzCiAgICAvLyBwYXltZW50QXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVBheW1lbnRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAicGF5bWVudF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjI5CiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjI1LTIzMAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogbGVmdG92ZXIsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnBheW1lbnRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIGludGNfMyAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjI1LTIzMQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogbGVmdG92ZXIsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnBheW1lbnRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyMzQKICAgIC8vIGlmICghdGhpcy5pc1ByaXplQm94LnZhbHVlKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyOQogICAgLy8gaXNQcml6ZUJveCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlJc1ByaXplQm94IH0pCiAgICBieXRlYyA1IC8vICJpc19wcml6ZV9ib3giCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIzNAogICAgLy8gaWYgKCF0aGlzLmlzUHJpemVCb3gudmFsdWUpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBibnogcHVyY2hhc2VBc2FfYWZ0ZXJfaWZfZWxzZUAyOAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyMzUKICAgIC8vIGNvbnN0IGFzc2V0UHJpemUgPSBBc3NldCh0aGlzLnByaXplLnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjcKICAgIC8vIHByaXplID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5UHJpemUgfSkKICAgIGJ5dGVjXzMgLy8gInByaXplIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyMzUKICAgIC8vIGNvbnN0IGFzc2V0UHJpemUgPSBBc3NldCh0aGlzLnByaXplLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIzNwogICAgLy8gaWYgKGFzc2V0UHJpemUuY3JlYXRvci5pc09wdGVkSW4odGhpcy5wYXltZW50QXNzZXQudmFsdWUpKSB7CiAgICBhc3NldF9wYXJhbXNfZ2V0IEFzc2V0Q3JlYXRvcgogICAgYXNzZXJ0IC8vIGFzc2V0IGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzMKICAgIC8vIHBheW1lbnRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5UGF5bWVudEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJwYXltZW50X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyMzcKICAgIC8vIGlmIChhc3NldFByaXplLmNyZWF0b3IuaXNPcHRlZEluKHRoaXMucGF5bWVudEFzc2V0LnZhbHVlKSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBieiBwdXJjaGFzZUFzYV9lbHNlX2JvZHlAMjcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjM4LTI0NAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogYXNzZXRQcml6ZS5jcmVhdG9yLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnRzLmNyZWF0b3IsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnBheW1lbnRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI0MAogICAgLy8gYXNzZXRSZWNlaXZlcjogYXNzZXRQcml6ZS5jcmVhdG9yLAogICAgYXNzZXRfcGFyYW1zX2dldCBBc3NldENyZWF0b3IKICAgIGFzc2VydCAvLyBhc3NldCBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjQxCiAgICAvLyBhc3NldEFtb3VudDogYW1vdW50cy5jcmVhdG9yLAogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNDIKICAgIC8vIHhmZXJBc3NldDogdGhpcy5wYXltZW50QXNzZXQudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMwogICAgLy8gcGF5bWVudEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQYXltZW50QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInBheW1lbnRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI0MgogICAgLy8geGZlckFzc2V0OiB0aGlzLnBheW1lbnRBc3NldC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIzOC0yNDMKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IGFzc2V0UHJpemUuY3JlYXRvciwKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50cy5jcmVhdG9yLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5wYXltZW50QXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICBpbnRjXzMgLy8gNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIzOC0yNDQKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IGFzc2V0UHJpemUuY3JlYXRvciwKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50cy5jcmVhdG9yLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5wYXltZW50QXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKCnB1cmNoYXNlQXNhX2FmdGVyX2lmX2Vsc2VAMjg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI2MAogICAgLy8gaWYgKHRoaXMubWFya2V0cGxhY2UudmFsdWUuaXNPcHRlZEluKHRoaXMucGF5bWVudEFzc2V0LnZhbHVlKSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NTQKICAgIC8vIG1hcmtldHBsYWNlID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleU1hcmtldHBsYWNlIH0pCiAgICBieXRlYyA5IC8vICJtYXJrZXRwbGFjZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjYwCiAgICAvLyBpZiAodGhpcy5tYXJrZXRwbGFjZS52YWx1ZS5pc09wdGVkSW4odGhpcy5wYXltZW50QXNzZXQudmFsdWUpKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzMKICAgIC8vIHBheW1lbnRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5UGF5bWVudEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJwYXltZW50X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNjAKICAgIC8vIGlmICh0aGlzLm1hcmtldHBsYWNlLnZhbHVlLmlzT3B0ZWRJbih0aGlzLnBheW1lbnRBc3NldC52YWx1ZSkpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYnogcHVyY2hhc2VBc2FfZWxzZV9ib2R5QDMwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI2MS0yNjcKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHRoaXMubWFya2V0cGxhY2UudmFsdWUsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudHMubWFya2V0cGxhY2UsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnBheW1lbnRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI2MwogICAgLy8gYXNzZXRSZWNlaXZlcjogdGhpcy5tYXJrZXRwbGFjZS52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjU0CiAgICAvLyBtYXJrZXRwbGFjZSA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlNYXJrZXRwbGFjZSB9KQogICAgYnl0ZWMgOSAvLyAibWFya2V0cGxhY2UiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI2MwogICAgLy8gYXNzZXRSZWNlaXZlcjogdGhpcy5tYXJrZXRwbGFjZS52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI2NAogICAgLy8gYXNzZXRBbW91bnQ6IGFtb3VudHMubWFya2V0cGxhY2UsCiAgICBkaWcgMQogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjY1CiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzMKICAgIC8vIHBheW1lbnRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5UGF5bWVudEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJwYXltZW50X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNjUKICAgIC8vIHhmZXJBc3NldDogdGhpcy5wYXltZW50QXNzZXQudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNjEtMjY2CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLm1hcmtldHBsYWNlLnZhbHVlLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnRzLm1hcmtldHBsYWNlLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5wYXltZW50QXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICBpbnRjXzMgLy8gNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI2MS0yNjcKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHRoaXMubWFya2V0cGxhY2UudmFsdWUsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudHMubWFya2V0cGxhY2UsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnBheW1lbnRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAoKcHVyY2hhc2VBc2FfYWZ0ZXJfaWZfZWxzZUAzMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjgyCiAgICAvLyBpZiAobWFya2V0cGxhY2UuaXNPcHRlZEluKHRoaXMucGF5bWVudEFzc2V0LnZhbHVlKSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzMKICAgIC8vIHBheW1lbnRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5UGF5bWVudEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJwYXltZW50X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyODIKICAgIC8vIGlmIChtYXJrZXRwbGFjZS5pc09wdGVkSW4odGhpcy5wYXltZW50QXNzZXQudmFsdWUpKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDIKICAgIHN3YXAKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBieiBwdXJjaGFzZUFzYV9lbHNlX2JvZHlAMzMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjgzLTI4OQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogbWFya2V0cGxhY2UsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudHMubWFya2V0cGxhY2UsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnBheW1lbnRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI4NgogICAgLy8gYXNzZXRBbW91bnQ6IGFtb3VudHMubWFya2V0cGxhY2UsCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyODcKICAgIC8vIHhmZXJBc3NldDogdGhpcy5wYXltZW50QXNzZXQudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMwogICAgLy8gcGF5bWVudEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQYXltZW50QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInBheW1lbnRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI4NwogICAgLy8geGZlckFzc2V0OiB0aGlzLnBheW1lbnRBc3NldC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI4My0yODgKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IG1hcmtldHBsYWNlLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnRzLm1hcmtldHBsYWNlLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5wYXltZW50QXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICBpbnRjXzMgLy8gNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI4My0yODkKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IG1hcmtldHBsYWNlLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnRzLm1hcmtldHBsYWNlLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5wYXltZW50QXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKCnB1cmNoYXNlQXNhX2FmdGVyX2lmX2Vsc2VAMzQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMwNAogICAgLy8gaWYgKHRoaXMuc2VsbGVyLnZhbHVlLmlzT3B0ZWRJbih0aGlzLnBheW1lbnRBc3NldC52YWx1ZSkpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM3CiAgICAvLyBzZWxsZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5U2VsbGVyIH0pCiAgICBieXRlY18xIC8vICJzZWxsZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMwNAogICAgLy8gaWYgKHRoaXMuc2VsbGVyLnZhbHVlLmlzT3B0ZWRJbih0aGlzLnBheW1lbnRBc3NldC52YWx1ZSkpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMwogICAgLy8gcGF5bWVudEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQYXltZW50QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInBheW1lbnRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMwNAogICAgLy8gaWYgKHRoaXMuc2VsbGVyLnZhbHVlLmlzT3B0ZWRJbih0aGlzLnBheW1lbnRBc3NldC52YWx1ZSkpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYnogcHVyY2hhc2VBc2FfZWxzZV9ib2R5QDM2CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMwNS0zMTAKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0Q2xvc2VUbzogdGhpcy5zZWxsZXIudmFsdWUsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnBheW1lbnRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMwNwogICAgLy8gYXNzZXRDbG9zZVRvOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM3CiAgICAvLyBzZWxsZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5U2VsbGVyIH0pCiAgICBieXRlY18xIC8vICJzZWxsZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMwNwogICAgLy8gYXNzZXRDbG9zZVRvOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMwOAogICAgLy8geGZlckFzc2V0OiB0aGlzLnBheW1lbnRBc3NldC52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMzCiAgICAvLyBwYXltZW50QXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVBheW1lbnRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAicGF5bWVudF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzA4CiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBpdHhuX2ZpZWxkIEFzc2V0Q2xvc2VUbwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMDUtMzA5CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldENsb3NlVG86IHRoaXMuc2VsbGVyLnZhbHVlLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5wYXltZW50QXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICBpbnRjXzMgLy8gNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMwNS0zMTAKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0Q2xvc2VUbzogdGhpcy5zZWxsZXIudmFsdWUsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnBheW1lbnRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAoKcHVyY2hhc2VBc2FfYWZ0ZXJfaWZfZWxzZUAzNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDQyLTQ0NAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7IGNsb3NlUmVtYWluZGVyVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcyB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDQzCiAgICAvLyAucGF5bWVudCh7IGNsb3NlUmVtYWluZGVyVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcyB9KQogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICBpdHhuX2ZpZWxkIENsb3NlUmVtYWluZGVyVG8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDQyLTQ0MwogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7IGNsb3NlUmVtYWluZGVyVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcyB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0NDItNDQ0CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsgY2xvc2VSZW1haW5kZXJUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDIxCiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiAnRGVsZXRlQXBwbGljYXRpb24nIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpwdXJjaGFzZUFzYV9lbHNlX2JvZHlAMzY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMxMwogICAgLy8gY29uc3QgcmVtYWluaW5nID0gdGhpcy5wYXltZW50QXNzZXQudmFsdWUuYmFsYW5jZShHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcykKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMwogICAgLy8gcGF5bWVudEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQYXltZW50QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInBheW1lbnRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMxMwogICAgLy8gY29uc3QgcmVtYWluaW5nID0gdGhpcy5wYXltZW50QXNzZXQudmFsdWUuYmFsYW5jZShHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcykKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBzd2FwCiAgICBkaWcgMQogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBhc3NlcnQgLy8gYWNjb3VudCBvcHRlZCBpbnRvIGFzc2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMxNQogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18yIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMxNQogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMxOQogICAgLy8gW3sgYWRkcmVzczogdGhpcy5zZWxsZXIudmFsdWUsIGFtb3VudDogcmVtYWluaW5nIH1dLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzcKICAgIC8vIHNlbGxlciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlTZWxsZXIgfSkKICAgIGJ5dGVjXzEgLy8gInNlbGxlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzE5CiAgICAvLyBbeyBhZGRyZXNzOiB0aGlzLnNlbGxlci52YWx1ZSwgYW1vdW50OiByZW1haW5pbmcgfV0sCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDIKICAgIGl0b2IKICAgIGNvbmNhdAogICAgYnl0ZWMgNCAvLyAweDAwMDEKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMjIKICAgIC8vIEdsb2JhbC56ZXJvQWRkcmVzcwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMxNC0zMjMKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLmlkLAogICAgLy8gICAwLAogICAgLy8gICBNQVhfVUlOVDY0LAogICAgLy8gICBbeyBhZGRyZXNzOiB0aGlzLnNlbGxlci52YWx1ZSwgYW1vdW50OiByZW1haW5pbmcgfV0sCiAgICAvLyAgIHJlbWFpbmluZywKICAgIC8vICAgdHJ1ZSwKICAgIC8vICAgR2xvYmFsLnplcm9BZGRyZXNzCiAgICAvLyApCiAgICB1bmNvdmVyIDIKICAgIHVuY292ZXIgNAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMTcKICAgIC8vIDAsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMTgKICAgIC8vIE1BWF9VSU5UNjQsCiAgICBpbnRjIDUgLy8gMTg0NDY3NDQwNzM3MDk1NTE2MTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzE0LTMyMwogICAgLy8gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgdGhpcy5wYXltZW50QXNzZXQudmFsdWUuaWQsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IHRoaXMuc2VsbGVyLnZhbHVlLCBhbW91bnQ6IHJlbWFpbmluZyB9XSwKICAgIC8vICAgcmVtYWluaW5nLAogICAgLy8gICB0cnVlLAogICAgLy8gICBHbG9iYWwuemVyb0FkZHJlc3MKICAgIC8vICkKICAgIHVuY292ZXIgNQogICAgdW5jb3ZlciA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMyMQogICAgLy8gdHJ1ZSwKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMxNC0zMjMKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLmlkLAogICAgLy8gICAwLAogICAgLy8gICBNQVhfVUlOVDY0LAogICAgLy8gICBbeyBhZGRyZXNzOiB0aGlzLnNlbGxlci52YWx1ZSwgYW1vdW50OiByZW1haW5pbmcgfV0sCiAgICAvLyAgIHJlbWFpbmluZywKICAgIC8vICAgdHJ1ZSwKICAgIC8vICAgR2xvYmFsLnplcm9BZGRyZXNzCiAgICAvLyApCiAgICB1bmNvdmVyIDcKICAgIGNhbGxzdWIgY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudAogICAgcG9wbiAyCiAgICBiIHB1cmNoYXNlQXNhX2FmdGVyX2lmX2Vsc2VAMzcKCnB1cmNoYXNlQXNhX2Vsc2VfYm9keUAzMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjkyCiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzIgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjkyCiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjkzCiAgICAvLyB0aGlzLnBheW1lbnRBc3NldC52YWx1ZS5pZCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMzCiAgICAvLyBwYXltZW50QXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVBheW1lbnRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAicGF5bWVudF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjkzCiAgICAvLyB0aGlzLnBheW1lbnRBc3NldC52YWx1ZS5pZCwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI5NgogICAgLy8gW3sgYWRkcmVzczogbWFya2V0cGxhY2UsIGFtb3VudDogYW1vdW50cy5tYXJrZXRwbGFjZSB9XSwKICAgIHVuY292ZXIgMgogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgaXRvYgogICAgdW5jb3ZlciA0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJ5dGVjIDQgLy8gMHgwMDAxCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6Mjk5CiAgICAvLyBHbG9iYWwuemVyb0FkZHJlc3MKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyOTEtMzAwCiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICB0aGlzLnBheW1lbnRBc3NldC52YWx1ZS5pZCwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogbWFya2V0cGxhY2UsIGFtb3VudDogYW1vdW50cy5tYXJrZXRwbGFjZSB9XSwKICAgIC8vICAgYW1vdW50cy5tYXJrZXRwbGFjZSwKICAgIC8vICAgZmFsc2UsCiAgICAvLyAgIEdsb2JhbC56ZXJvQWRkcmVzcwogICAgLy8gKQogICAgdW5jb3ZlciA0CiAgICB1bmNvdmVyIDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6Mjk0CiAgICAvLyAwLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6Mjk1CiAgICAvLyBNQVhfVUlOVDY0LAogICAgaW50YyA1IC8vIDE4NDQ2NzQ0MDczNzA5NTUxNjE1CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI5MS0zMDAKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLmlkLAogICAgLy8gICAwLAogICAgLy8gICBNQVhfVUlOVDY0LAogICAgLy8gICBbeyBhZGRyZXNzOiBtYXJrZXRwbGFjZSwgYW1vdW50OiBhbW91bnRzLm1hcmtldHBsYWNlIH1dLAogICAgLy8gICBhbW91bnRzLm1hcmtldHBsYWNlLAogICAgLy8gICBmYWxzZSwKICAgIC8vICAgR2xvYmFsLnplcm9BZGRyZXNzCiAgICAvLyApCiAgICB1bmNvdmVyIDUKICAgIHVuY292ZXIgNgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyOTgKICAgIC8vIGZhbHNlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjkxLTMwMAogICAgLy8gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgdGhpcy5wYXltZW50QXNzZXQudmFsdWUuaWQsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IG1hcmtldHBsYWNlLCBhbW91bnQ6IGFtb3VudHMubWFya2V0cGxhY2UgfV0sCiAgICAvLyAgIGFtb3VudHMubWFya2V0cGxhY2UsCiAgICAvLyAgIGZhbHNlLAogICAgLy8gICBHbG9iYWwuemVyb0FkZHJlc3MKICAgIC8vICkKICAgIHVuY292ZXIgNwogICAgY2FsbHN1YiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50CiAgICBwb3BuIDIKICAgIGIgcHVyY2hhc2VBc2FfYWZ0ZXJfaWZfZWxzZUAzNAoKcHVyY2hhc2VBc2FfZWxzZV9ib2R5QDMwOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNzAKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMiAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNzAKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNzEKICAgIC8vIHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLmlkLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzMKICAgIC8vIHBheW1lbnRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5UGF5bWVudEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJwYXltZW50X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNzEKICAgIC8vIHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLmlkLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6Mjc0CiAgICAvLyBbeyBhZGRyZXNzOiB0aGlzLm1hcmtldHBsYWNlLnZhbHVlLCBhbW91bnQ6IGFtb3VudHMubWFya2V0cGxhY2UgfV0sCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo1NAogICAgLy8gbWFya2V0cGxhY2UgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5TWFya2V0cGxhY2UgfSkKICAgIGJ5dGVjIDkgLy8gIm1hcmtldHBsYWNlIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNzQKICAgIC8vIFt7IGFkZHJlc3M6IHRoaXMubWFya2V0cGxhY2UudmFsdWUsIGFtb3VudDogYW1vdW50cy5tYXJrZXRwbGFjZSB9XSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgMwogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgaXRvYgogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJ5dGVjIDQgLy8gMHgwMDAxCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6Mjc3CiAgICAvLyBHbG9iYWwuemVyb0FkZHJlc3MKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNjktMjc4CiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICB0aGlzLnBheW1lbnRBc3NldC52YWx1ZS5pZCwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogdGhpcy5tYXJrZXRwbGFjZS52YWx1ZSwgYW1vdW50OiBhbW91bnRzLm1hcmtldHBsYWNlIH1dLAogICAgLy8gICBhbW91bnRzLm1hcmtldHBsYWNlLAogICAgLy8gICBmYWxzZSwKICAgIC8vICAgR2xvYmFsLnplcm9BZGRyZXNzCiAgICAvLyApCiAgICB1bmNvdmVyIDQKICAgIHVuY292ZXIgNAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNzIKICAgIC8vIDAsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNzMKICAgIC8vIE1BWF9VSU5UNjQsCiAgICBpbnRjIDUgLy8gMTg0NDY3NDQwNzM3MDk1NTE2MTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjY5LTI3OAogICAgLy8gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgdGhpcy5wYXltZW50QXNzZXQudmFsdWUuaWQsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IHRoaXMubWFya2V0cGxhY2UudmFsdWUsIGFtb3VudDogYW1vdW50cy5tYXJrZXRwbGFjZSB9XSwKICAgIC8vICAgYW1vdW50cy5tYXJrZXRwbGFjZSwKICAgIC8vICAgZmFsc2UsCiAgICAvLyAgIEdsb2JhbC56ZXJvQWRkcmVzcwogICAgLy8gKQogICAgdW5jb3ZlciA1CiAgICB1bmNvdmVyIDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6Mjc2CiAgICAvLyBmYWxzZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI2OS0yNzgKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLmlkLAogICAgLy8gICAwLAogICAgLy8gICBNQVhfVUlOVDY0LAogICAgLy8gICBbeyBhZGRyZXNzOiB0aGlzLm1hcmtldHBsYWNlLnZhbHVlLCBhbW91bnQ6IGFtb3VudHMubWFya2V0cGxhY2UgfV0sCiAgICAvLyAgIGFtb3VudHMubWFya2V0cGxhY2UsCiAgICAvLyAgIGZhbHNlLAogICAgLy8gICBHbG9iYWwuemVyb0FkZHJlc3MKICAgIC8vICkKICAgIHVuY292ZXIgNwogICAgY2FsbHN1YiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50CiAgICBwb3BuIDIKICAgIGIgcHVyY2hhc2VBc2FfYWZ0ZXJfaWZfZWxzZUAzMQoKcHVyY2hhc2VBc2FfZWxzZV9ib2R5QDI3OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNDcKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMiAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNDcKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNDgKICAgIC8vIHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLmlkLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzMKICAgIC8vIHBheW1lbnRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5UGF5bWVudEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJwYXltZW50X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNDgKICAgIC8vIHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLmlkLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjUxCiAgICAvLyBbeyBhZGRyZXNzOiBhc3NldFByaXplLmNyZWF0b3IsIGFtb3VudDogYW1vdW50cy5jcmVhdG9yIH1dLAogICAgdW5jb3ZlciAyCiAgICBhc3NldF9wYXJhbXNfZ2V0IEFzc2V0Q3JlYXRvcgogICAgYXNzZXJ0IC8vIGFzc2V0IGV4aXN0cwogICAgZGlnIDMKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBpdG9iCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYnl0ZWMgNCAvLyAweDAwMDEKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNTQKICAgIC8vIEdsb2JhbC56ZXJvQWRkcmVzcwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI0Ni0yNTUKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLmlkLAogICAgLy8gICAwLAogICAgLy8gICBNQVhfVUlOVDY0LAogICAgLy8gICBbeyBhZGRyZXNzOiBhc3NldFByaXplLmNyZWF0b3IsIGFtb3VudDogYW1vdW50cy5jcmVhdG9yIH1dLAogICAgLy8gICBhbW91bnRzLmNyZWF0b3IsCiAgICAvLyAgIGZhbHNlLAogICAgLy8gICBHbG9iYWwuemVyb0FkZHJlc3MKICAgIC8vICkKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI0OQogICAgLy8gMCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI1MAogICAgLy8gTUFYX1VJTlQ2NCwKICAgIGludGMgNSAvLyAxODQ0Njc0NDA3MzcwOTU1MTYxNQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNDYtMjU1CiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICB0aGlzLnBheW1lbnRBc3NldC52YWx1ZS5pZCwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogYXNzZXRQcml6ZS5jcmVhdG9yLCBhbW91bnQ6IGFtb3VudHMuY3JlYXRvciB9XSwKICAgIC8vICAgYW1vdW50cy5jcmVhdG9yLAogICAgLy8gICBmYWxzZSwKICAgIC8vICAgR2xvYmFsLnplcm9BZGRyZXNzCiAgICAvLyApCiAgICB1bmNvdmVyIDUKICAgIHVuY292ZXIgNgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNTMKICAgIC8vIGZhbHNlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjQ2LTI1NQogICAgLy8gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgdGhpcy5wYXltZW50QXNzZXQudmFsdWUuaWQsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IGFzc2V0UHJpemUuY3JlYXRvciwgYW1vdW50OiBhbW91bnRzLmNyZWF0b3IgfV0sCiAgICAvLyAgIGFtb3VudHMuY3JlYXRvciwKICAgIC8vICAgZmFsc2UsCiAgICAvLyAgIEdsb2JhbC56ZXJvQWRkcmVzcwogICAgLy8gKQogICAgdW5jb3ZlciA3CiAgICBjYWxsc3ViIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQKICAgIHBvcG4gMgogICAgYiBwdXJjaGFzZUFzYV9hZnRlcl9pZl9lbHNlQDI4CgpwdXJjaGFzZUFzYV9ib29sX2ZhbHNlQDg6CiAgICBpbnRjXzAgLy8gMAogICAgYiBwdXJjaGFzZUFzYV9ib29sX21lcmdlQDkKCgovLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjpMaXN0aW5nLmRlbGlzdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmRlbGlzdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDQ4CiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiAnRGVsZXRlQXBwbGljYXRpb24nIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ1MAogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywgZXJyTXVzdEJlQ2FsbGVkRnJvbUZhY3RvcnkpCiAgICB0eG4gU2VuZGVyCiAgICBnbG9iYWwgQ3JlYXRvckFkZHJlc3MKICAgID09CiAgICBibnogZGVsaXN0X2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAxMSAvLyAiRVJSOmVyck1iZmYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTWJmZgoKZGVsaXN0X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0NTEKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnNlbGxlci52YWx1ZSA9PT0gY2FsbGVyLCBlcnJPbmx5U2VsbGVyQ2FuRGVsaXN0KQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzcKICAgIC8vIHNlbGxlciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlTZWxsZXIgfSkKICAgIGJ5dGVjXzEgLy8gInNlbGxlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDUxCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zZWxsZXIudmFsdWUgPT09IGNhbGxlciwgZXJyT25seVNlbGxlckNhbkRlbGlzdCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA9PQogICAgYm56IGRlbGlzdF9hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6ZXJyT3NjZCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJPc2NkCgpkZWxpc3RfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ1NAogICAgLy8gYXNzZXRDbG9zZVRvOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM3CiAgICAvLyBzZWxsZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5U2VsbGVyIH0pCiAgICBieXRlY18xIC8vICJzZWxsZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ1NAogICAgLy8gYXNzZXRDbG9zZVRvOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ1NQogICAgLy8geGZlckFzc2V0OiB0aGlzLnByaXplLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjcKICAgIC8vIHByaXplID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5UHJpemUgfSkKICAgIGJ5dGVjXzMgLy8gInByaXplIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0NTUKICAgIC8vIHhmZXJBc3NldDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ1OQogICAgLy8gY2xvc2VSZW1haW5kZXJUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ2MgogICAgLy8gaWYgKCEodGhpcy5wYXltZW50QXNzZXQudmFsdWUuaWQgPT09IDApKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMwogICAgLy8gcGF5bWVudEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQYXltZW50QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInBheW1lbnRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ2MgogICAgLy8gaWYgKCEodGhpcy5wYXltZW50QXNzZXQudmFsdWUuaWQgPT09IDApKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogZGVsaXN0X2Vsc2VfYm9keUAxNgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0NjUKICAgIC8vIGFzc2V0Q2xvc2VUbzogdGhpcy5zZWxsZXIudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNwogICAgLy8gc2VsbGVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVNlbGxlciB9KQogICAgYnl0ZWNfMSAvLyAic2VsbGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0NjUKICAgIC8vIGFzc2V0Q2xvc2VUbzogdGhpcy5zZWxsZXIudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgY292ZXIgNAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0NjYKICAgIC8vIHhmZXJBc3NldDogdGhpcy5wYXltZW50QXNzZXQudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMwogICAgLy8gcGF5bWVudEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQYXltZW50QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInBheW1lbnRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ2NgogICAgLy8geGZlckFzc2V0OiB0aGlzLnBheW1lbnRBc3NldC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ2OQogICAgLy8gaWYgKHRoaXMuaXNQcml6ZUJveC52YWx1ZSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjkKICAgIC8vIGlzUHJpemVCb3ggPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5SXNQcml6ZUJveCB9KQogICAgYnl0ZWMgNSAvLyAiaXNfcHJpemVfYm94IgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0NjkKICAgIC8vIGlmICh0aGlzLmlzUHJpemVCb3gudmFsdWUpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBkZWxpc3RfZWxzZV9ib2R5QDExCiAgICBidXJ5IDEKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0NzAtNDczCiAgICAvLyBhYmlDYWxsPHR5cGVvZiBQcml6ZUJveC5wcm90b3R5cGUudHJhbnNmZXI+KHsKICAgIC8vICAgYXBwSWQ6IHRoaXMucHJpemUudmFsdWUsCiAgICAvLyAgIGFyZ3M6IFt0aGlzLnNlbGxlci52YWx1ZV0sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0NzIKICAgIC8vIGFyZ3M6IFt0aGlzLnNlbGxlci52YWx1ZV0sCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNwogICAgLy8gc2VsbGVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVNlbGxlciB9KQogICAgYnl0ZWNfMSAvLyAic2VsbGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0NzIKICAgIC8vIGFyZ3M6IFt0aGlzLnNlbGxlci52YWx1ZV0sCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0NzEKICAgIC8vIGFwcElkOiB0aGlzLnByaXplLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjcKICAgIC8vIHByaXplID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5UHJpemUgfSkKICAgIGJ5dGVjXzMgLy8gInByaXplIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0NzEKICAgIC8vIGFwcElkOiB0aGlzLnByaXplLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0NzAtNDczCiAgICAvLyBhYmlDYWxsPHR5cGVvZiBQcml6ZUJveC5wcm90b3R5cGUudHJhbnNmZXI+KHsKICAgIC8vICAgYXBwSWQ6IHRoaXMucHJpemUudmFsdWUsCiAgICAvLyAgIGFyZ3M6IFt0aGlzLnNlbGxlci52YWx1ZV0sCiAgICAvLyB9KQogICAgYnl0ZWMgMTkgLy8gbWV0aG9kICJ0cmFuc2ZlcihhZGRyZXNzKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ3NAogICAgLy8gaXR4bi5zdWJtaXRHcm91cChwYXltZW50QXNzZXRUcmFuc2ZlciwgcGF5bWVudCkKICAgIGl0eG5fYmVnaW4KICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFzc2V0Q2xvc2VUbwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0NjQtNDY3CiAgICAvLyBjb25zdCBwYXltZW50QXNzZXRUcmFuc2ZlciA9IGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgIGFzc2V0Q2xvc2VUbzogdGhpcy5zZWxsZXIudmFsdWUsCiAgICAvLyAgIHhmZXJBc3NldDogdGhpcy5wYXltZW50QXNzZXQudmFsdWUsCiAgICAvLyB9KQogICAgaW50Y18zIC8vIDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0NzQKICAgIC8vIGl0eG4uc3VibWl0R3JvdXAocGF5bWVudEFzc2V0VHJhbnNmZXIsIHBheW1lbnQpCiAgICBpdHhuX25leHQKICAgIGl0eG5fZmllbGQgQ2xvc2VSZW1haW5kZXJUbwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0NTgtNDYwCiAgICAvLyBjb25zdCBwYXltZW50ID0gaXR4bi5wYXltZW50KHsKICAgIC8vICAgY2xvc2VSZW1haW5kZXJUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgLy8gfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDc0CiAgICAvLyBpdHhuLnN1Ym1pdEdyb3VwKHBheW1lbnRBc3NldFRyYW5zZmVyLCBwYXltZW50KQogICAgaXR4bl9zdWJtaXQKCmRlbGlzdF9hZnRlcl9pZl9lbHNlQDI0OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0NDgKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6ICdEZWxldGVBcHBsaWNhdGlvbicgfSkKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmRlbGlzdF9lbHNlX2JvZHlAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ3NgogICAgLy8gaXR4bi5zdWJtaXRHcm91cChhc3NldFRyYW5zZmVyLCBwYXltZW50QXNzZXRUcmFuc2ZlciwgcGF5bWVudCkKICAgIGl0eG5fYmVnaW4KICAgIHN3YXAKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFzc2V0Q2xvc2VUbwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0NTMtNDU2CiAgICAvLyBjb25zdCBhc3NldFRyYW5zZmVyID0gaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgYXNzZXRDbG9zZVRvOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIC8vICAgeGZlckFzc2V0OiB0aGlzLnByaXplLnZhbHVlLAogICAgLy8gfSkKICAgIGludGNfMyAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDc2CiAgICAvLyBpdHhuLnN1Ym1pdEdyb3VwKGFzc2V0VHJhbnNmZXIsIHBheW1lbnRBc3NldFRyYW5zZmVyLCBwYXltZW50KQogICAgaXR4bl9uZXh0CiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgc3dhcAogICAgaXR4bl9maWVsZCBBc3NldENsb3NlVG8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDY0LTQ2NwogICAgLy8gY29uc3QgcGF5bWVudEFzc2V0VHJhbnNmZXIgPSBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICBhc3NldENsb3NlVG86IHRoaXMuc2VsbGVyLnZhbHVlLAogICAgLy8gICB4ZmVyQXNzZXQ6IHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLAogICAgLy8gfSkKICAgIGludGNfMyAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDc2CiAgICAvLyBpdHhuLnN1Ym1pdEdyb3VwKGFzc2V0VHJhbnNmZXIsIHBheW1lbnRBc3NldFRyYW5zZmVyLCBwYXltZW50KQogICAgaXR4bl9uZXh0CiAgICBpdHhuX2ZpZWxkIENsb3NlUmVtYWluZGVyVG8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDU4LTQ2MAogICAgLy8gY29uc3QgcGF5bWVudCA9IGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIGNsb3NlUmVtYWluZGVyVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIC8vIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ3NgogICAgLy8gaXR4bi5zdWJtaXRHcm91cChhc3NldFRyYW5zZmVyLCBwYXltZW50QXNzZXRUcmFuc2ZlciwgcGF5bWVudCkKICAgIGl0eG5fc3VibWl0CiAgICBiIGRlbGlzdF9hZnRlcl9pZl9lbHNlQDI0CgpkZWxpc3RfZWxzZV9ib2R5QDE2OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0NzkKICAgIC8vIGlmICh0aGlzLmlzUHJpemVCb3gudmFsdWUpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI5CiAgICAvLyBpc1ByaXplQm94ID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleUlzUHJpemVCb3ggfSkKICAgIGJ5dGVjIDUgLy8gImlzX3ByaXplX2JveCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDc5CiAgICAvLyBpZiAodGhpcy5pc1ByaXplQm94LnZhbHVlKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogZGVsaXN0X2Vsc2VfYm9keUAyMAogICAgcG9wbiAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ4MC00ODMKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFByaXplQm94LnByb3RvdHlwZS50cmFuc2Zlcj4oewogICAgLy8gICBhcHBJZDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vICAgYXJnczogW3RoaXMuc2VsbGVyLnZhbHVlXSwKICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ4MgogICAgLy8gYXJnczogW3RoaXMuc2VsbGVyLnZhbHVlXSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM3CiAgICAvLyBzZWxsZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5U2VsbGVyIH0pCiAgICBieXRlY18xIC8vICJzZWxsZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ4MgogICAgLy8gYXJnczogW3RoaXMuc2VsbGVyLnZhbHVlXSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ4MQogICAgLy8gYXBwSWQ6IHRoaXMucHJpemUudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNwogICAgLy8gcHJpemUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQcml6ZSB9KQogICAgYnl0ZWNfMyAvLyAicHJpemUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ4MQogICAgLy8gYXBwSWQ6IHRoaXMucHJpemUudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ4MC00ODMKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFByaXplQm94LnByb3RvdHlwZS50cmFuc2Zlcj4oewogICAgLy8gICBhcHBJZDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vICAgYXJnczogW3RoaXMuc2VsbGVyLnZhbHVlXSwKICAgIC8vIH0pCiAgICBieXRlYyAxOSAvLyBtZXRob2QgInRyYW5zZmVyKGFkZHJlc3Mpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDg0CiAgICAvLyBwYXltZW50LnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICBpdHhuX2ZpZWxkIENsb3NlUmVtYWluZGVyVG8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDU4LTQ2MAogICAgLy8gY29uc3QgcGF5bWVudCA9IGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIGNsb3NlUmVtYWluZGVyVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIC8vIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ4NAogICAgLy8gcGF5bWVudC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIGIgZGVsaXN0X2FmdGVyX2lmX2Vsc2VAMjQKCmRlbGlzdF9lbHNlX2JvZHlAMjA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ4NgogICAgLy8gaXR4bi5zdWJtaXRHcm91cChhc3NldFRyYW5zZmVyLCBwYXltZW50KQogICAgaXR4bl9iZWdpbgogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGl0eG5fZmllbGQgQXNzZXRDbG9zZVRvCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ1My00NTYKICAgIC8vIGNvbnN0IGFzc2V0VHJhbnNmZXIgPSBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICBhc3NldENsb3NlVG86IHRoaXMuc2VsbGVyLnZhbHVlLAogICAgLy8gICB4ZmVyQXNzZXQ6IHRoaXMucHJpemUudmFsdWUsCiAgICAvLyB9KQogICAgaW50Y18zIC8vIDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0ODYKICAgIC8vIGl0eG4uc3VibWl0R3JvdXAoYXNzZXRUcmFuc2ZlciwgcGF5bWVudCkKICAgIGl0eG5fbmV4dAogICAgaXR4bl9maWVsZCBDbG9zZVJlbWFpbmRlclRvCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ1OC00NjAKICAgIC8vIGNvbnN0IHBheW1lbnQgPSBpdHhuLnBheW1lbnQoewogICAgLy8gICBjbG9zZVJlbWFpbmRlclRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MsCiAgICAvLyB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0ODYKICAgIC8vIGl0eG4uc3VibWl0R3JvdXAoYXNzZXRUcmFuc2ZlciwgcGF5bWVudCkKICAgIGl0eG5fc3VibWl0CiAgICBiIGRlbGlzdF9hZnRlcl9pZl9lbHNlQDI0CgoKLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo6TGlzdGluZy5jaGFuZ2VQcmljZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNoYW5nZVByaWNlOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0OTEKICAgIC8vIGNoYW5nZVByaWNlKHByaWNlOiB1aW50NjQpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDkyCiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5zZWxsZXIudmFsdWUsIGVyck11c3RCZVNlbGxlcikKICAgIHR4biBTZW5kZXIKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM3CiAgICAvLyBzZWxsZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5U2VsbGVyIH0pCiAgICBieXRlY18xIC8vICJzZWxsZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ5MgogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuc2VsbGVyLnZhbHVlLCBlcnJNdXN0QmVTZWxsZXIpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPT0KICAgIGJueiBjaGFuZ2VQcmljZV9hZnRlcl9hc3NlcnRAMwogICAgcHVzaGJ5dGVzICJFUlI6ZXJyTWJzbCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJNYnNsCgpjaGFuZ2VQcmljZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDkzCiAgICAvLyBsb2dnZWRBc3NlcnQocHJpY2UgPj0gTGlzdGluZ01pbmltdW1QcmljZSwgZXJyUHJpY2VUb29Mb3cpCiAgICBkdXAKICAgIGludGNfMyAvLyA0CiAgICA+PQogICAgYm56IGNoYW5nZVByaWNlX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJQcmxvIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclBybG8KCmNoYW5nZVByaWNlX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMQogICAgLy8gcHJpY2UgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQcmljZSB9KQogICAgYnl0ZWMgNiAvLyAicHJpY2UiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ5NAogICAgLy8gdGhpcy5wcmljZS52YWx1ZSA9IHByaWNlCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo2MgogICAgLy8gbGFzdFByaWNlUm91bmQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQcmljZVJvdW5kIH0pCiAgICBieXRlYyAxNCAvLyAicHJpY2Vfcm91bmQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ5NQogICAgLy8gdGhpcy5sYXN0UHJpY2VSb3VuZC52YWx1ZSA9IEdsb2JhbC5yb3VuZAogICAgZ2xvYmFsIFJvdW5kCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0OTEKICAgIC8vIGNoYW5nZVByaWNlKHByaWNlOiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6OkFraXRhQmFzZUNvbnRyYWN0LnVwZGF0ZUFraXRhREFPW3JvdXRpbmddKCkgLT4gdm9pZDoKdXBkYXRlQWtpdGFEQU86CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MjUKICAgIC8vIHVwZGF0ZUFraXRhREFPKGFraXRhREFPOiBBcHBsaWNhdGlvbik6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjI2CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIGVyck5vdEFraXRhRGFvKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18yIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHB1c2hieXRlcyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjI2CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIGVyck5vdEFraXRhRGFvKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGJueiB1cGRhdGVBa2l0YURBT19hZnRlcl9hc3NlcnRAMwogICAgcHVzaGJ5dGVzICJFUlI6ZXJyTmRhbyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOZGFvCgp1cGRhdGVBa2l0YURBT19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzIgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNwogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSA9IGFraXRhREFPCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjI1CiAgICAvLyB1cGRhdGVBa2l0YURBTyhha2l0YURBTzogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6OkNvbnRyYWN0V2l0aENyZWF0b3JPbmx5T3B0SW4ub3B0aW5bcm91dGluZ10oKSAtPiB2b2lkOgpvcHRpbjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czo0NwogICAgLy8gb3B0aW4ocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBhc3NldDogdWludDY0KTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czo0OAogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywgZXJyRm9yYmlkZGVuKQogICAgdHhuIFNlbmRlcgogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICA9PQogICAgYm56IG9wdGluX2FmdGVyX2Fzc2VydEAzCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJGb3JiIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckZvcmIKCm9wdGluX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjUwCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRQYXltZW50UmVjZWl2ZXIpCiAgICBkaWcgMQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IG9wdGluX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJJcG1yIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwbXIKCm9wdGluX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjUxCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSwgZXJySW52YWxpZFBheW1lbnRBbW91bnQpCiAgICBzd2FwCiAgICBndHhucyBBbW91bnQKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgPT0KICAgIGJueiBvcHRpbl9hZnRlcl9hc3NlcnRANwogICAgcHVzaGJ5dGVzICJFUlI6ZXJySXBtYSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcG1hCgpvcHRpbl9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czo1My01NwogICAgLy8gaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyB9KS5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjU0CiAgICAvLyBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjU1CiAgICAvLyBhc3NldEFtb3VudDogMCwKICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czo1My01NwogICAgLy8gaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyB9KS5zdWJtaXQoKQogICAgaW50Y18zIC8vIDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czo0NwogICAgLy8gb3B0aW4ocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBhc3NldDogdWludDY0KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo6TGlzdGluZy5nZXRBbW91bnRzKGFtb3VudDogdWludDY0KSAtPiBieXRlczoKZ2V0QW1vdW50czoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6ODAKICAgIC8vIHByaXZhdGUgZ2V0QW1vdW50cyhhbW91bnQ6IHVpbnQ2NCk6IFJveWFsdHlBbW91bnRzIHsKICAgIHByb3RvIDEgMQogICAgcHVzaGJ5dGVzICIiCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6ODEKICAgIC8vIGxldCBjcmVhdG9yQW1vdW50ID0gY2FsY1BlcmNlbnQoYW1vdW50LCB0aGlzLmNyZWF0b3JSb3lhbHR5LnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDEKICAgIC8vIGNyZWF0b3JSb3lhbHR5ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5Q3JlYXRvclJveWFsdHkgfSkKICAgIGJ5dGVjIDEzIC8vICJjcmVhdG9yX3JveWFsdHkiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjgxCiAgICAvLyBsZXQgY3JlYXRvckFtb3VudCA9IGNhbGNQZXJjZW50KGFtb3VudCwgdGhpcy5jcmVhdG9yUm95YWx0eS52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE3NgogICAgLy8gYXNzZXJ0KHAgPD0gRElWSVNPUiwgZXJySW52YWxpZFBlcmNlbnRhZ2UpCiAgICBkdXAKICAgIGludGMgNCAvLyAxMDAwMDAKICAgIDw9CiAgICBhc3NlcnQgLy8gZXJySXBjdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNzcKICAgIC8vIHJldHVybiBvcC5kaXZ3KC4uLm9wLm11bHcoYSwgcCksIERJVklTT1IpCiAgICBmcmFtZV9kaWcgLTEKICAgIG11bHcKICAgIGludGMgNCAvLyAxMDAwMDAKICAgIGRpdncKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo4MgogICAgLy8gaWYgKGNyZWF0b3JBbW91bnQgPT09IDAgJiYgdGhpcy5jcmVhdG9yUm95YWx0eS52YWx1ZSA+IDAgJiYgYW1vdW50ID4gMCkgewogICAgYm56IGdldEFtb3VudHNfYWZ0ZXJfaWZfZWxzZUA0CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MQogICAgLy8gY3JlYXRvclJveWFsdHkgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlDcmVhdG9yUm95YWx0eSB9KQogICAgYnl0ZWMgMTMgLy8gImNyZWF0b3Jfcm95YWx0eSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6ODIKICAgIC8vIGlmIChjcmVhdG9yQW1vdW50ID09PSAwICYmIHRoaXMuY3JlYXRvclJveWFsdHkudmFsdWUgPiAwICYmIGFtb3VudCA+IDApIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VANAogICAgZnJhbWVfZGlnIC0xCiAgICBieiBnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VANAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo4MwogICAgLy8gY3JlYXRvckFtb3VudCA9IDEKICAgIGludGNfMSAvLyAxCiAgICBmcmFtZV9idXJ5IDIKCmdldEFtb3VudHNfYWZ0ZXJfaWZfZWxzZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo4NgogICAgLy8gY29uc3QgeyBtYXJrZXRwbGFjZVNhbGVQZXJjZW50YWdlTWluOiBtaW4sIG1hcmtldHBsYWNlU2FsZVBlcmNlbnRhZ2VNYXg6IG1heCB9ID0gZ2V0TkZURmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzIgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6ODYKICAgIC8vIGNvbnN0IHsgbWFya2V0cGxhY2VTYWxlUGVyY2VudGFnZU1pbjogbWluLCBtYXJrZXRwbGFjZVNhbGVQZXJjZW50YWdlTWF4OiBtYXggfSA9IGdldE5GVEZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE2MQogICAgLy8gY29uc3QgW25mdEZlZXNCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNORlRGZWVzKSkKICAgIGR1cAogICAgYnl0ZWMgMjEgLy8gIm5mdF9mZWVzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo4NgogICAgLy8gY29uc3QgeyBtYXJrZXRwbGFjZVNhbGVQZXJjZW50YWdlTWluOiBtaW4sIG1hcmtldHBsYWNlU2FsZVBlcmNlbnRhZ2VNYXg6IG1heCB9ID0gZ2V0TkZURmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDIKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo4NwogICAgLy8gY29uc3QgaW1wYWN0ID0gZ2V0VXNlckltcGFjdCh0aGlzLmFraXRhREFPLnZhbHVlLCB0aGlzLnNlbGxlci52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM3CiAgICAvLyBzZWxsZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5U2VsbGVyIH0pCiAgICBieXRlY18xIC8vICJzZWxsZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjg3CiAgICAvLyBjb25zdCBpbXBhY3QgPSBnZXRVc2VySW1wYWN0KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuc2VsbGVyLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjA0LTIwNwogICAgLy8gcmV0dXJuIGFiaUNhbGw8dHlwZW9mIEFraXRhU29jaWFsSW1wYWN0LnByb3RvdHlwZS5nZXRVc2VySW1wYWN0Pih7CiAgICAvLyAgIGFwcElkOiBnZXRBa2l0YVNvY2lhbEFwcExpc3QoYWtpdGFEQU8pLmltcGFjdCwKICAgIC8vICAgYXJnczogW2FjY291bnRdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMTcKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFTb2NpYWxBcHBMaXN0KSkKICAgIHN3YXAKICAgIHB1c2hieXRlcyAic2FsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMDUKICAgIC8vIGFwcElkOiBnZXRBa2l0YVNvY2lhbEFwcExpc3QoYWtpdGFEQU8pLmltcGFjdCwKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjA0LTIwNwogICAgLy8gcmV0dXJuIGFiaUNhbGw8dHlwZW9mIEFraXRhU29jaWFsSW1wYWN0LnByb3RvdHlwZS5nZXRVc2VySW1wYWN0Pih7CiAgICAvLyAgIGFwcElkOiBnZXRBa2l0YVNvY2lhbEFwcExpc3QoYWtpdGFEQU8pLmltcGFjdCwKICAgIC8vICAgYXJnczogW2FjY291bnRdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgcHVzaGJ5dGVzIDB4ZDU3NGJiMTAgLy8gbWV0aG9kICJnZXRVc2VySW1wYWN0KGFkZHJlc3MpdWludDY0IgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBzd2FwCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWMgMTIgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE5OQogICAgLy8gY29uc3QgbWluSW1wYWN0OiB1aW50NjQgPSAoaW1wYWN0ID4gMSkgPyBpbXBhY3QgLSAxIDogMQogICAgaW50Y18xIC8vIDEKICAgID4KICAgIGJ6IGdldEFtb3VudHNfdGVybmFyeV9mYWxzZUAxNgogICAgaW50Y18xIC8vIDEKICAgIC0KCmdldEFtb3VudHNfdGVybmFyeV9tZXJnZUAxNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjAwCiAgICAvLyByZXR1cm4gbWF4IC0gKCgobWF4IC0gbWluKSAqIG1pbkltcGFjdCkgLyBJTVBBQ1RfRElWSVNPUikKICAgIHN3YXAKICAgIGR1cAogICAgdW5jb3ZlciAzCiAgICAtCiAgICB1bmNvdmVyIDIKICAgICoKICAgIHB1c2hpbnQgMTAwMAogICAgLwogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNzYKICAgIC8vIGFzc2VydChwIDw9IERJVklTT1IsIGVyckludmFsaWRQZXJjZW50YWdlKQogICAgZHVwCiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICA8PQogICAgYXNzZXJ0IC8vIGVycklwY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTc3CiAgICAvLyByZXR1cm4gb3AuZGl2dyguLi5vcC5tdWx3KGEsIHApLCBESVZJU09SKQogICAgZnJhbWVfZGlnIC0xCiAgICBtdWx3CiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICBkaXZ3CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo5MQogICAgLy8gaWYgKGFraXRhQW1vdW50ID09PSAwICYmIGFtb3VudCA+IDApIHsKICAgIGJueiBnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VANwogICAgZnJhbWVfZGlnIC0xCiAgICBieiBnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo5MgogICAgLy8gYWtpdGFBbW91bnQgPSAxCiAgICBpbnRjXzEgLy8gMQogICAgZnJhbWVfYnVyeSAwCgpnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6OTUKICAgIC8vIGxldCBtYXJrZXRwbGFjZUFtb3VudCA9IGNhbGNQZXJjZW50KGFtb3VudCwgdGhpcy5tYXJrZXRwbGFjZVJveWFsdGllcy52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjU2CiAgICAvLyBtYXJrZXRwbGFjZVJveWFsdGllcyA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleU1hcmtldHBsYWNlUm95YWx0aWVzIH0pCiAgICBieXRlYyAxNiAvLyAibWFya2V0cGxhY2Vfcm95YWx0aWVzIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo5NQogICAgLy8gbGV0IG1hcmtldHBsYWNlQW1vdW50ID0gY2FsY1BlcmNlbnQoYW1vdW50LCB0aGlzLm1hcmtldHBsYWNlUm95YWx0aWVzLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTc2CiAgICAvLyBhc3NlcnQocCA8PSBESVZJU09SLCBlcnJJbnZhbGlkUGVyY2VudGFnZSkKICAgIGR1cAogICAgaW50YyA0IC8vIDEwMDAwMAogICAgPD0KICAgIGFzc2VydCAvLyBlcnJJcGN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE3NwogICAgLy8gcmV0dXJuIG9wLmRpdncoLi4ub3AubXVsdyhhLCBwKSwgRElWSVNPUikKICAgIGZyYW1lX2RpZyAtMQogICAgbXVsdwogICAgaW50YyA0IC8vIDEwMDAwMAogICAgZGl2dwogICAgZHVwCiAgICBmcmFtZV9idXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6OTYKICAgIC8vIGlmIChtYXJrZXRwbGFjZUFtb3VudCA9PT0gMCAmJiB0aGlzLm1hcmtldHBsYWNlUm95YWx0aWVzLnZhbHVlID4gMCAmJiBhbW91bnQgPiAwKSB7CiAgICBibnogZ2V0QW1vdW50c19hZnRlcl9pZl9lbHNlQDExCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo1NgogICAgLy8gbWFya2V0cGxhY2VSb3lhbHRpZXMgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlNYXJrZXRwbGFjZVJveWFsdGllcyB9KQogICAgYnl0ZWMgMTYgLy8gIm1hcmtldHBsYWNlX3JveWFsdGllcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6OTYKICAgIC8vIGlmIChtYXJrZXRwbGFjZUFtb3VudCA9PT0gMCAmJiB0aGlzLm1hcmtldHBsYWNlUm95YWx0aWVzLnZhbHVlID4gMCAmJiBhbW91bnQgPiAwKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogZ2V0QW1vdW50c19hZnRlcl9pZl9lbHNlQDExCiAgICBmcmFtZV9kaWcgLTEKICAgIGJ6IGdldEFtb3VudHNfYWZ0ZXJfaWZfZWxzZUAxMQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo5NwogICAgLy8gbWFya2V0cGxhY2VBbW91bnQgPSAxCiAgICBpbnRjXzEgLy8gMQogICAgZnJhbWVfYnVyeSAxCgpnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjEwMAogICAgLy8gY29uc3Qgc2VsbGVyQW1vdW50OiB1aW50NjQgPSBhbW91bnQgLSAoY3JlYXRvckFtb3VudCArIGFraXRhQW1vdW50ICsgKDIgKiBtYXJrZXRwbGFjZUFtb3VudCkpCiAgICBmcmFtZV9kaWcgMgogICAgZHVwCiAgICBmcmFtZV9kaWcgMAogICAgZHVwCiAgICBjb3ZlciAzCiAgICArCiAgICBwdXNoaW50IDIKICAgIGZyYW1lX2RpZyAxCiAgICBkdXAKICAgIGNvdmVyIDUKICAgICoKICAgICsKICAgIGZyYW1lX2RpZyAtMQogICAgc3dhcAogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxMDItMTA3CiAgICAvLyByZXR1cm4gewogICAgLy8gICBjcmVhdG9yOiBjcmVhdG9yQW1vdW50LAogICAgLy8gICBha2l0YTogYWtpdGFBbW91bnQsCiAgICAvLyAgIG1hcmtldHBsYWNlOiBtYXJrZXRwbGFjZUFtb3VudCwKICAgIC8vICAgc2VsbGVyOiBzZWxsZXJBbW91bnQsCiAgICAvLyB9CiAgICBzd2FwCiAgICBpdG9iCiAgICB1bmNvdmVyIDIKICAgIGl0b2IKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCmdldEFtb3VudHNfdGVybmFyeV9mYWxzZUAxNjoKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxOTkKICAgIC8vIGNvbnN0IG1pbkltcGFjdDogdWludDY0ID0gKGltcGFjdCA+IDEpID8gaW1wYWN0IC0gMSA6IDEKICAgIGludGNfMSAvLyAxCiAgICBiIGdldEFtb3VudHNfdGVybmFyeV9tZXJnZUAxNwoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6Okxpc3RpbmcuYXNzZXJ0UHJpY2VTZXR0bGVkKCkgLT4gdm9pZDoKYXNzZXJ0UHJpY2VTZXR0bGVkOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxMTEKICAgIC8vIHByaXZhdGUgYXNzZXJ0UHJpY2VTZXR0bGVkKCk6IHZvaWQgewogICAgcHJvdG8gMCAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjExMgogICAgLy8gY29uc3QgbGFzdCA9IHRoaXMubGFzdFByaWNlUm91bmQudmFsdWUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjYyCiAgICAvLyBsYXN0UHJpY2VSb3VuZCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVByaWNlUm91bmQgfSkKICAgIGJ5dGVjIDE0IC8vICJwcmljZV9yb3VuZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTEyCiAgICAvLyBjb25zdCBsYXN0ID0gdGhpcy5sYXN0UHJpY2VSb3VuZC52YWx1ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjExMwogICAgLy8gaWYgKGxhc3QgPiAwKSB7CiAgICBieiBhc3NlcnRQcmljZVNldHRsZWRfYWZ0ZXJfaWZfZWxzZUA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjExNAogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5yb3VuZCA+IGxhc3QgKyBMaXN0aW5nUHJpY2VDaGFuZ2VDb29sZG93blJvdW5kcywgZXJyUHJpY2VSZWNlbnRseUNoYW5nZWQpCiAgICBnbG9iYWwgUm91bmQKICAgIGZyYW1lX2RpZyAwCiAgICBpbnRjXzMgLy8gNAogICAgKwogICAgPgogICAgYm56IGFzc2VydFByaWNlU2V0dGxlZF9hZnRlcl9pZl9lbHNlQDQKICAgIHB1c2hieXRlcyAiRVJSOmVyclByY2QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyUHJjZAoKYXNzZXJ0UHJpY2VTZXR0bGVkX2FmdGVyX2lmX2Vsc2VANDoKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6Okxpc3RpbmcudHJhbnNmZXJQdXJjaGFzZVRvQnV5ZXIoYnV5ZXI6IGJ5dGVzKSAtPiB2b2lkOgp0cmFuc2ZlclB1cmNoYXNlVG9CdXllcjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTE4CiAgICAvLyBwcml2YXRlIHRyYW5zZmVyUHVyY2hhc2VUb0J1eWVyKGJ1eWVyOiBBY2NvdW50KTogdm9pZCB7CiAgICBwcm90byAxIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTE5CiAgICAvLyBpZiAodGhpcy5pc1ByaXplQm94LnZhbHVlKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyOQogICAgLy8gaXNQcml6ZUJveCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlJc1ByaXplQm94IH0pCiAgICBieXRlYyA1IC8vICJpc19wcml6ZV9ib3giCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjExOQogICAgLy8gaWYgKHRoaXMuaXNQcml6ZUJveC52YWx1ZSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IHRyYW5zZmVyUHVyY2hhc2VUb0J1eWVyX2FmdGVyX2lmX2Vsc2VAMwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxMjAtMTIzCiAgICAvLyBhYmlDYWxsPHR5cGVvZiBQcml6ZUJveC5wcm90b3R5cGUudHJhbnNmZXI+KHsKICAgIC8vICAgYXBwSWQ6IHRoaXMucHJpemUudmFsdWUsCiAgICAvLyAgIGFyZ3M6IFtidXllcl0sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxMjEKICAgIC8vIGFwcElkOiB0aGlzLnByaXplLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjcKICAgIC8vIHByaXplID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5UHJpemUgfSkKICAgIGJ5dGVjXzMgLy8gInByaXplIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxMjEKICAgIC8vIGFwcElkOiB0aGlzLnByaXplLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxMjAtMTIzCiAgICAvLyBhYmlDYWxsPHR5cGVvZiBQcml6ZUJveC5wcm90b3R5cGUudHJhbnNmZXI+KHsKICAgIC8vICAgYXBwSWQ6IHRoaXMucHJpemUudmFsdWUsCiAgICAvLyAgIGFyZ3M6IFtidXllcl0sCiAgICAvLyB9KQogICAgYnl0ZWMgMTkgLy8gbWV0aG9kICJ0cmFuc2ZlcihhZGRyZXNzKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC0xCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTI0CiAgICAvLyByZXR1cm4KICAgIHJldHN1YgoKdHJhbnNmZXJQdXJjaGFzZVRvQnV5ZXJfYWZ0ZXJfaWZfZWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxMjcKICAgIC8vIGNvbnN0IHByaXplQXNzZXQgPSBBc3NldCh0aGlzLnByaXplLnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjcKICAgIC8vIHByaXplID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5UHJpemUgfSkKICAgIGJ5dGVjXzMgLy8gInByaXplIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxMjcKICAgIC8vIGNvbnN0IHByaXplQXNzZXQgPSBBc3NldCh0aGlzLnByaXplLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjEzMAogICAgLy8gbG9nZ2VkQXNzZXJ0KHByaXplQXNzZXQuYmFsYW5jZShHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcykgPj0gdGhpcy5wcml6ZUFtb3VudC52YWx1ZSwgZXJyUHJpemVDaGFuZ2VkKQogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIHN3YXAKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYXNzZXJ0IC8vIGFjY291bnQgb3B0ZWQgaW50byBhc3NldAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NjAKICAgIC8vIHByaXplQW1vdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5UHJpemVBbW91bnQgfSkKICAgIGJ5dGVjIDIwIC8vICJwcml6ZV9hbW91bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjEzMAogICAgLy8gbG9nZ2VkQXNzZXJ0KHByaXplQXNzZXQuYmFsYW5jZShHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcykgPj0gdGhpcy5wcml6ZUFtb3VudC52YWx1ZSwgZXJyUHJpemVDaGFuZ2VkKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgID49CiAgICBibnogdHJhbnNmZXJQdXJjaGFzZVRvQnV5ZXJfYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOmVyclBjaGciCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyUGNoZwoKdHJhbnNmZXJQdXJjaGFzZVRvQnV5ZXJfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjEzMgogICAgLy8gaWYgKGJ1eWVyLmlzT3B0ZWRJbihwcml6ZUFzc2V0KSkgewogICAgZnJhbWVfZGlnIC0xCiAgICBkaWcgMQogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJ6IHRyYW5zZmVyUHVyY2hhc2VUb0J1eWVyX2Vsc2VfYm9keUA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjEzNC0xMzcKICAgIC8vIGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgIGFzc2V0Q2xvc2VUbzogYnV5ZXIsCiAgICAvLyAgIHhmZXJBc3NldDogcHJpemVBc3NldCwKICAgIC8vIH0pLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgZnJhbWVfZGlnIC0xCiAgICBpdHhuX2ZpZWxkIEFzc2V0Q2xvc2VUbwogICAgaW50Y18zIC8vIDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIHJldHN1YgoKdHJhbnNmZXJQdXJjaGFzZVRvQnV5ZXJfZWxzZV9ib2R5QDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE0MAogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18yIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE0MAogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE0NAogICAgLy8gW3sgYWRkcmVzczogYnV5ZXIsIGFtb3VudDogcHJpemVBc3NldC5iYWxhbmNlKEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzKSB9XSwKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICB1bmNvdmVyIDIKICAgIGR1cAogICAgY292ZXIgMgogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBhc3NlcnQgLy8gYWNjb3VudCBvcHRlZCBpbnRvIGFzc2V0CiAgICBpdG9iCiAgICBmcmFtZV9kaWcgLTEKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYnl0ZWMgNCAvLyAweDAwMDEKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxNDUKICAgIC8vIHByaXplQXNzZXQuYmFsYW5jZShHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcyksCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgZGlnIDIKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYXNzZXJ0IC8vIGFjY291bnQgb3B0ZWQgaW50byBhc3NldAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxNDcKICAgIC8vIEdsb2JhbC56ZXJvQWRkcmVzcwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjEzOS0xNDgKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHByaXplQXNzZXQuaWQsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IGJ1eWVyLCBhbW91bnQ6IHByaXplQXNzZXQuYmFsYW5jZShHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcykgfV0sCiAgICAvLyAgIHByaXplQXNzZXQuYmFsYW5jZShHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcyksCiAgICAvLyAgIHRydWUsCiAgICAvLyAgIEdsb2JhbC56ZXJvQWRkcmVzcwogICAgLy8gKQogICAgdW5jb3ZlciA0CiAgICB1bmNvdmVyIDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTQyCiAgICAvLyAwLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTQzCiAgICAvLyBNQVhfVUlOVDY0LAogICAgaW50YyA1IC8vIDE4NDQ2NzQ0MDczNzA5NTUxNjE1CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjEzOS0xNDgKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHByaXplQXNzZXQuaWQsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IGJ1eWVyLCBhbW91bnQ6IHByaXplQXNzZXQuYmFsYW5jZShHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcykgfV0sCiAgICAvLyAgIHByaXplQXNzZXQuYmFsYW5jZShHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcyksCiAgICAvLyAgIHRydWUsCiAgICAvLyAgIEdsb2JhbC56ZXJvQWRkcmVzcwogICAgLy8gKQogICAgdW5jb3ZlciA2CiAgICB1bmNvdmVyIDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTQ2CiAgICAvLyB0cnVlLAogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTM5LTE0OAogICAgLy8gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgcHJpemVBc3NldC5pZCwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogYnV5ZXIsIGFtb3VudDogcHJpemVBc3NldC5iYWxhbmNlKEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzKSB9XSwKICAgIC8vICAgcHJpemVBc3NldC5iYWxhbmNlKEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzKSwKICAgIC8vICAgdHJ1ZSwKICAgIC8vICAgR2xvYmFsLnplcm9BZGRyZXNzCiAgICAvLyApCiAgICB1bmNvdmVyIDcKICAgIGNhbGxzdWIgY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudAogICAgcG9wbiAyCiAgICByZXRzdWIK", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyAGAAEIBKCNBv///////////wEmGA1wYXltZW50X2Fzc2V0BnNlbGxlcglha2l0YV9kYW8FcHJpemUCAAEMaXNfcHJpemVfYm94BXByaWNlCmV4cGlyYXRpb24McmVzZXJ2ZWRfZm9yC21hcmtldHBsYWNlDGFraXRhX2VzY3JvdwtFUlI6ZXJyTWJmZgQVH3x1D2NyZWF0b3Jfcm95YWx0eQtwcmljZV9yb3VuZA9zZWxsZXJfcmVmZXJyZXIVbWFya2V0cGxhY2Vfcm95YWx0aWVzC0VSUjplcnJJcGF5C0VSUjplcnJJeGZyBK35KuQMcHJpemVfYW1vdW50CG5mdF9mZWVzC0VSUjplcnJMZXhwC0VSUjplcnJSZmRhggMEahY5PQQXHJ+IBGjoY0M2GgCOAwBVAEkAPTEZFEQxGEEAJoIEBBk5bEoEM+kslASFTe3gBD6hGDI2GgCOBAiECMYAAQj6ACNDgAScVCQJNhoAjgEB/wAxGYEFEjEYEERCB3IxGYEFEjEYEERCBOgxGYEFEjEYEERCA2CKCAKAACKL+UAABYv+QAFJI0SL+IADYWFsZUgkW4v8IlmB1MUBC4HkqQMITIv5QABdsUlyCERLAov9CLIIsgcjshAisgG2i/oWi/sWTwKyGIAE3KwJNbIaTLIashqL/LIai/+yGoEGshAisgGztD5JVwQATFcABCcMEkRJFSQSRBdMTBZMFlCL/E8DTwOJSXIIRIv5cABFAUEAiksBSwFyCExOBEQijACL/kEACksBcghEI4wAjAGxSwFyCERPA7IIsgcjshAisgG2iwBBAASLAbIVi/myEYv9shJPArIUJbIQIrIBtov6Fov7Fk8DshiABKOhbKqyGkyyGrIai/yyGov/shqBBrIQIrIBs7Q+SVcEAExXAAQnDBJESRUkEkQXTEL/XUsBMhAIsUsBSXIIRDIQsgiyByOyECKyAbaL+RZMshiABDlOrrKyGrIagQayECKyAbNC/0QiQv60igUBgACL/kEAa4v8MgMTQQBji/uAC3dhbGxldF9mZWVzZUgkW0khBA5Ei/4dIQSXSYwAQAAIi/5BAAMjjAAyB0mBgJqeAQiLAElOAhaL/ExQJwRMUIv7i/1PBU8ETwRLBSKL/4j+PEhXCAiL/k8CCRZMUEyJi/4WIhZQTIk2GgFJFSQSRBc2GgJJFSMSRCJTNhoDSRUkEkQXNhoESRUkEkQXNhoFSRUkEkQXNhoGSU4CFYEgEkQ2GgdJTgIVgSgSRDYaCElOAhWBIBJENhoJSRUkEkQXTDYaCkkVJBJEF0w2GgtJTgIVgSASRDYaDEkiWYECCEsBFRJEVwIATDYaDUkVJBJEF0w2Gg5JTgJJFUsBIllJgQoSRE8CTEsCUiJZgQwIEkQ2Gg9JFYEwEkQiW0w2Gg9JFYEwEkRXCCBMNhoPSRWBMBJEgShbTDINQAAEJwuwACtPEWcnBU8QZycGTw9nKE8OZ0lBAAdJMgcNQQCOI0AAD4ALRVJSOmVycklleHCwACcHTGcpTwxngAZmdW5kZXJPC2cnCE8KZycNTwlngAdnYXRlX2lkTwhnJwlPB2eAB3ZlcnNpb25PBmcqTwVnJwpPBGcnFE8DZycOImeAA3JldoEDZycPTwJngA1mYWN0b3J5X2Zsb2F0TGciKmVEJxVlSIEQWycQTGcjQyJC/28xFiMJSTgQIxJENhoBSRWBIBJENhoCSU4DFYEgEkQxADIJEkAABCcLsAAiKGVEQQAPgAtFUlI6ZXJyUGFtYbAAIicHZURBAAsiJwdlRDIHDUEBJSNAAAQnFrAAiAZoIicIZUQyAxNBAA8iJwhlREsBEkAABCcXsABLATgAMgkSQAAEJxGwAEsBOAcyChJAAAQnEbAATDgIIicGZUQSQAAEJxGwAIgGSCInBmVEiAUlSSRbSUEAICIqZUQiJw9lRCInCmVEgQJbcghETgIiTwRPBIj9KSJbsSInCmVEgQJbcghEsgeyCCOyECKyAbOxSYEQWyInCWVEsgdJsggjshAisgGzsUsCsgeyCCOyECKyAbMiJwVlREEAIbGBGFsiKWVEsgeyCCOyECKyAbOxMgmyCSOyECKyAbMjQyIrZUSxSwEiW0sBcQtEsgeyCCOyECKyAbOxTIEYW0xxBESABSBTb2xkUCIpZUSyB7IFsggjshAisgGzQv+0IkL+2DEWIwlJOBAlEkQ2GgFJFYEgEkQ2GgJJTgIVgSASRDEAMgkSQAAEJwuwACIoZURAAA+AC0VSUjplcnJQYW5hsAAiJwdlREEACyInB2VEMgcNQQInI0AABCcWsACIBOwiJwhlRDIDE0EADyInCGVESwESQAAEJxewAEsCOBEiKGVEEkAABCcSsABLAjgUMgoSQAAEJxKwAE8COBIiJwZlRBJAAAQnErAAiATJIicGZUSIA6ZJJFtJQQAjIiplRCInD2VEIihlRCInCmVEgQJbcghETgNPBE8EiPunIluxIicKZUSBAltyCEQiKGVEshGyFLISJbIQIrIBsyInBWVEQAAvIitlTElPAkRxC0QiKGVEcABFAUEBMLFxC0RLASJbIihlRLIRshKyFCWyECKyAbMiJwllRCIoZURwAEUBQQDTsSInCWVESwGBEFsiKGVEshGyErIUJbIQIrIBsyIoZURLAkxwAEUBQQB6sYEQWyIoZUSyEbISshQlshAisgGzIillRCIoZURwAEUBQQAisSIpZUQiKGVEshGyFSWyECKyAbOxMgmyCSOyECKyAbMjQzIKIihlRExLAXAARCIqZUQiKWVESwIWUCcETFAyA08CTwQiIQVPBU8GI08HiPlFRgJC/74iKmVEIihlRE8CgRBbSRZPBExQJwRMUDIDTwRPBCIhBU8FTwYiTweI+RZGAkL/bCIqZUQiKGVEIicJZURLA4EQW0kWTwJMUCcETFAyA08ETwQiIQVPBU8GIk8HiPjiRgJC/xUiKmVEIihlRE8CcQtESwMiW0kWTwJMUCcETFAyA08ETwQiIQVPBU8GIk8HiPivRgJC/rYiQv3WNhoBSRWBIBJEMQAyCRJAAAQnC7AAIillRBJAAA+AC0VSUjplcnJPc2NksAAiKWVEIitlRDIJTgIiKGVEQQBuIillTE4ERCIoZUQiJwVlREEANUUBRQGxIillRCIrZUSyGCcTshqyGoEGshAisgGzsbIRTLIVJbIQIrIBtrIJI7IQIrIBsyNDsUyyEUyyFSWyECKyAbayEUyyFSWyECKyAbayCSOyECKyAbNC/9giJwVlREEAKEYCsSIpZUQiK2VEshgnE7IashqBBrIQIrIBs7GyCSOyECKyAbNC/6ixshGyFSWyECKyAbayCSOyECKyAbNC/5A2GgFJFSQSRBcxACIpZUQSQAAPgAtFUlI6ZXJyTWJzbLAASSUPQAAPgAtFUlI6ZXJyUHJsb7AAJwZMZycOMgZnI0M2GgFJFSQSRBcxACIqZUSABndhbGxldGVIcghEEkAAD4ALRVJSOmVyck5kYW+wACpMZyNDMRYjCUk4ECMSRDYaAUkVJBJEFzEAMgkSQAAPgAtFUlI6ZXJyRm9yYrAASwE4BzIKEkAAD4ALRVJSOmVycklwbXKwAEw4CDIQEkAAD4ALRVJSOmVycklwbWGwALEyCkyyESKyErIUJbIQIrIBsyNDigEBgABJIicNZURJIQQORIv/HSEEl0lAABAiJw1lREEACIv/QQADI4wCIiplREknFWVISSJbTgIkW0wiKWVEsUyAA3NhbGVIgRBbshiABNV0uxCyGrIagQayECKyAbO0PklXBABMVwAEJwwSREkVJBJEF0kjDUEAdCMJTElPAwlPAguB6AcKCUkhBA5Ei/8dIQSXSYwAQAAIi/9BAAMjjAAiJxBlREkhBA5Ei/8dIQSXSYwBQAAQIicQZURBAAiL/0EAAyOMAYsCSYsASU4DCIECiwFJTgULCIv/TAlMFk8CFlBPAhZQTBZQjACJSCNC/4mKAAAiJw5lTElPAkRBABkyBosAJQgNQAAPgAtFUlI6ZXJyUHJjZLAAiYoBACInBWVEQQAYsSIrZUSyGCcTshqL/7IagQayECKyAbOJIitlTElPAkQyCkxwAEQiJxRlRA9AAA+AC0VSUjplcnJQY2hnsACL/0sBcABFAUEAD7GyEYv/shUlshAisgGziSIqZUQyCk8CSU4CcABEFov/TFAnBExQMgpLAnAARDIDTwRPBCIhBU8GTwYjTweI9R1GAok=", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
var ListingParamsFactory = class _ListingParamsFactory {
  /**
   * Gets available create ABI call param factories
   */
  static get create() {
    return {
      _resolveByMethod(params) {
        switch (params.method) {
          case "create":
          case "create(uint64,bool,uint64,uint64,uint64,address,(address,uint64),address,uint64,uint64,address,string,uint64,(string,uint64),uint64,address,uint64)void":
            return _ListingParamsFactory.create.create(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs create ABI call params for the Listing smart contract using the create(uint64,bool,uint64,uint64,uint64,address,(address,uint64),address,uint64,uint64,address,string,uint64,(string,uint64),uint64,address,uint64)void ABI method
       *
       * @param params Parameters for the call
       * @returns An `AppClientMethodCallParams` object for the call
       */
      create(params) {
        return {
          ...params,
          method: "create(uint64,bool,uint64,uint64,uint64,address,(address,uint64),address,uint64,uint64,address,string,uint64,(string,uint64),uint64,address,uint64)void",
          args: Array.isArray(params.args) ? params.args : [params.args.prize, params.args.isPrizeBox, params.args.price, params.args.paymentAsset, params.args.expiration, params.args.seller, params.args.funder, params.args.reservedFor, params.args.creatorRoyalty, params.args.gateId, params.args.marketplace, params.args.version, params.args.akitaDao, params.args.akitaDaoEscrow, params.args.prizeAmount, params.args.sellerReferrer, params.args.factoryFloat]
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
          case "purchaseAsa":
          case "purchaseAsa(axfer,address,address)void":
            return _ListingParamsFactory.delete.purchaseAsa(params);
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
       * Constructs delete ABI call params for the Listing smart contract using the purchaseAsa(axfer,address,address)void ABI method
       *
       * @param params Parameters for the call
       * @returns An `AppClientMethodCallParams` object for the call
       */
      purchaseAsa(params) {
        return {
          ...params,
          method: "purchaseAsa(axfer,address,address)void",
          args: Array.isArray(params.args) ? params.args : [params.args.assetXfer, params.args.buyer, params.args.marketplace]
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
       * Creates a new instance of the Listing smart contract using the create(uint64,bool,uint64,uint64,uint64,address,(address,uint64),address,uint64,uint64,address,string,uint64,(string,uint64),uint64,address,uint64)void ABI method.
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
       * Deletes an existing instance of the Listing smart contract using the purchaseAsa(axfer,address,address)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The deployDelete params
       */
      purchaseAsa: (params) => {
        return this.appFactory.params.deployDelete(ListingParamsFactory.delete.purchaseAsa(params));
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
       * Creates a new instance of the Listing smart contract using the create(uint64,bool,uint64,uint64,uint64,address,(address,uint64),address,uint64,uint64,address,string,uint64,(string,uint64),uint64,address,uint64)void ABI method.
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
       * Creates a new instance of the Listing smart contract using an ABI method call using the create(uint64,bool,uint64,uint64,uint64,address,(address,uint64),address,uint64,uint64,address,string,uint64,(string,uint64),uint64,address,uint64)void ABI method.
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
       * Deletes an existing instance of the Listing smart contract using the `purchaseAsa(axfer,address,address)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The delete params
       */
      purchaseAsa: (params) => {
        return this.appClient.params.delete(ListingParamsFactory.delete.purchaseAsa(params));
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
       * Deletes an existing instance of the Listing smart contract using the `purchaseAsa(axfer,address,address)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The delete transaction
       */
      purchaseAsa: (params) => {
        return this.appClient.createTransaction.delete(ListingParamsFactory.delete.purchaseAsa(params));
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
       * Deletes an existing instance of the Listing smart contract using the `purchaseAsa(axfer,address,address)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The delete result
       */
      purchaseAsa: async (params) => {
        const result = await this.appClient.send.delete(ListingParamsFactory.delete.purchaseAsa(params));
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
          prizeAmount: result.prizeAmount,
          lastPriceRound: result.lastPriceRound,
          rev: result.rev,
          sellerReferrer: result.sellerReferrer,
          factoryFloat: result.factoryFloat,
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
       * Get the current value of the prizeAmount key in global state
       */
      prizeAmount: async () => {
        return await this.appClient.state.global.getValue("prizeAmount");
      },
      /**
       * Get the current value of the lastPriceRound key in global state
       */
      lastPriceRound: async () => {
        return await this.appClient.state.global.getValue("lastPriceRound");
      },
      /**
       * Get the current value of the rev key in global state
       */
      rev: async () => {
        return await this.appClient.state.global.getValue("rev");
      },
      /**
       * Get the current value of the sellerReferrer key in global state
       */
      sellerReferrer: async () => {
        return await this.appClient.state.global.getValue("sellerReferrer");
      },
      /**
       * Get the current value of the factoryFloat key in global state
       */
      factoryFloat: async () => {
        return await this.appClient.state.global.getValue("factoryFloat");
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
          purchaseAsa: (params) => {
            promiseChain = promiseChain.then(async () => composer.addAppDeleteMethodCall(await client.params.delete.purchaseAsa(params)));
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
var ListingSDK = class extends _chunk3QW7XUAWjs.BaseSDK {
  constructor(params) {
    super({ factory: ListingFactory, ...params });
  }
  // ========== Read Methods ==========
  /**
   * Gets the current state of the listing.
   */
  async state() {
    var _a, _b, _c, _d;
    const state = await this.client.state.global.getAll();
    return {
      prize: _nullishCoalesce(state.prize, () => ( 0n)),
      isPrizeBox: Boolean(_nullishCoalesce(state.isPrizeBox, () => ( 0n))),
      price: _nullishCoalesce(state.price, () => ( 0n)),
      paymentAsset: _nullishCoalesce(state.paymentAsset, () => ( 0n)),
      expiration: _nullishCoalesce(state.expiration, () => ( 0n)),
      seller: _nullishCoalesce(((_a = state.seller) == null ? void 0 : _a.toString()), () => ( "")),
      reservedFor: _nullishCoalesce(((_b = state.reservedFor) == null ? void 0 : _b.toString()), () => ( "")),
      creatorRoyalty: _nullishCoalesce(state.creatorRoyalty, () => ( 0n)),
      gateId: _nullishCoalesce(state.gateId, () => ( 0n)),
      marketplace: _nullishCoalesce(((_c = state.marketplace) == null ? void 0 : _c.toString()), () => ( "")),
      marketplaceRoyalties: _nullishCoalesce(state.marketplaceRoyalties, () => ( 0n)),
      rev: _nullishCoalesce(state.rev, () => ( 0n)),
      sellerReferrer: (_d = state.sellerReferrer) == null ? void 0 : _d.toString(),
      factoryFloat: state.factoryFloat
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
var MARKETPLACE_ERROR_MESSAGES = _chunkQ5IKYOZSjs.withErrorCodeAliases.call(void 0, {
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
  // --- Legacy-payment float (principal resolution) -------------------------
  LFLT: "Marketplace float reserve too low for a legacy-paid listing; pay the full listCost",
  // --- Marketplace plugin -------------------------------------------------
  NENA: "Not enough of the asset",
  LCNM: "Listing creator is not the marketplace",
  PAMX: "Listing price is above the buyer maxPrice"
});
var translateMarketplaceError = _chunkQ5IKYOZSjs.makeErrorTranslator.call(void 0, MARKETPLACE_ERROR_MESSAGES);

// src/marketplace/index.ts
var ASSET_OPT_IN_MIN_BALANCE = 100000n;
var MARKETPLACE_HINTED_METHODS = {
  list: "list(pay,axfer,uint64,uint64,uint64,address,uint64,address,string,byte[32][],uint64)uint64",
  listPrizeBox: "listPrizeBox(appl,pay,uint64,uint64,uint64,address,uint64,address,uint64)uint64",
  gatedPurchase: "gatedPurchase(pay,appl,uint64,address,uint64)void",
  gatedPurchaseAsa: "gatedPurchaseAsa(axfer,appl,uint64,address,uint64)void"
};
var MARKETPLACE_LEGACY_METHODS = {
  list: "list(pay,axfer,uint64,uint64,uint64,address,uint64,address,string,byte[32][])uint64",
  listPrizeBox: "listPrizeBox(appl,pay,uint64,uint64,uint64,address,uint64,address)uint64",
  gatedPurchase: "gatedPurchase(pay,appl,uint64,address)void",
  gatedPurchaseAsa: "gatedPurchaseAsa(axfer,appl,uint64,address)void"
};
var LISTING_CREATE_MBR = 920500n;
var LEGACY_LISTING_CREATE_MBR = 756500n;
function directGateCtx(sender) {
  const account = sender.toString();
  return { principal: account, wallet: 0n, spender: account };
}
function isLegacyGateTxn(gateTxn) {
  return gateTxn.method.name === "mustCheck";
}
var noteCounter = 0;
function uniqueNote(tag) {
  noteCounter += 1;
  return `akita-marketplace:${tag}:${Date.now()}:${noteCounter}`;
}
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
var MarketplaceSDK = class extends _chunk3QW7XUAWjs.BaseSDK {
  constructor(params) {
    super({ factory: MarketplaceFactory, ...params }, _chunkMY4J3UZTjs.ENV_VAR_NAMES.MARKETPLACE_APP_ID);
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
    wallet = 0n,
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
      note: uniqueNote("payment"),
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
          note: uniqueNote("payment"),
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
      const prizeBoxSDK = new (0, _chunkYA6SW4XNjs.PrizeBoxFactorySDK)({ algorand: this.algorand, factoryParams: {} }).get({ appId: BigInt(prizeBoxId) });
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
        marketplace,
        wallet
      };
      if (group) {
        group.listPrizeBoxApplPayUint64Uint64Uint64AddressUint64AddressUint64Uint64({
          ...sendParams,
          args,
          maxFee: _algokitutils.microAlgo.call(void 0, 2e6)
        });
      } else {
        ({ return: appId } = await this.client.send.listPrizeBoxApplPayUint64Uint64Uint64AddressUint64AddressUint64Uint64({
          ...sendParams,
          args
        }));
      }
    } else {
      const { asset, amount, name, proof } = rest;
      const assetXfer = await this.client.algorand.createTransaction.assetTransfer({
        note: uniqueNote("assetTransfer"),
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
        proof,
        wallet
      };
      if (group) {
        group.listPayAxferUint64Uint64Uint64AddressUint64AddressStringByte_32Uint64Uint64({
          ...sendParams,
          args,
          maxFee: _algokitutils.microAlgo.call(void 0, 2e6)
        });
      } else {
        ({ return: appId } = await this.client.send.listPayAxferUint64Uint64Uint64AddressUint64AddressStringByte_32Uint64Uint64({
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
    var _a;
    const asset = BigInt(assetId);
    if (asset === 0n) return 0n;
    try {
      const akitaDaoAppId = await this.client.state.global.akitaDao();
      if (!akitaDaoAppId) return 100000n;
      const algod = this.algorand.client.algod;
      const daoApp = await algod.getApplicationByID(akitaDaoAppId).do();
      const globalState = (_a = daoApp.params) == null ? void 0 : _a.globalState;
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
      const response = await this.algorand.client.algod.accountAssetInformation(this.client.appAddress.toString(), asset).do();
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
    const baseCost = LISTING_CREATE_MBR;
    const minBalance = 100000n;
    const assetOptInMinBalance = 100000n;
    const perDisbursement = _chunk3X3AK5HAjs.MIN_DISBURSEMENTS_MBR + _chunk3X3AK5HAjs.USER_ALLOCATION_MBR;
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
  /**
   * Exact listing payment from the factory's readonly `listCost(prize, paymentAsset, isPrizeBox)`, as
   * the chain computes it right now (includes the rewards and DAO-escrow opt-in terms). Pass `prize = 0`
   * for a prize box. Quote after any factory opt-ins the listing group adds, or use `listCost` offline.
   */
  async quoteListCost({ prize = 0n, paymentAsset = 0n, isPrizeBox = false } = {}) {
    return await this.client.listCost({ args: { prize, paymentAsset, isPrizeBox } });
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
    wallet = 0n,
    ...rest
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const group = this.client.newGroup();
    const legacyGate = gateTxn !== void 0 && isLegacyGateTxn(gateTxn);
    if (isAsa) {
      const { paymentAsset, paymentAmount } = rest;
      const assetXfer = await this.client.algorand.createTransaction.assetTransfer({
        note: uniqueNote("assetTransfer"),
        ...sendParams,
        amount: BigInt(paymentAmount),
        assetId: BigInt(paymentAsset),
        receiver: this.client.appAddress
      });
      if (gateTxn && legacyGate) {
        group.gatedPurchaseAsaAxferApplUint64AddressVoid({
          ...sendParams,
          args: {
            assetXfer,
            gateTxn,
            appId: listingAppId,
            marketplace
          }
        });
      } else if (gateTxn) {
        group.gatedPurchaseAsaAxferApplUint64AddressUint64Void({
          ...sendParams,
          args: {
            assetXfer,
            gateTxn,
            appId: listingAppId,
            marketplace,
            wallet
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
        note: uniqueNote("payment"),
        ...sendParams,
        amount: _algokitutils.microAlgo.call(void 0, listingState.price),
        receiver: this.client.appAddress
      });
      if (gateTxn && legacyGate) {
        group.gatedPurchasePayApplUint64AddressVoid({
          ...sendParams,
          args: {
            payment,
            gateTxn,
            appId: listingAppId,
            marketplace
          }
        });
      } else if (gateTxn) {
        group.gatedPurchasePayApplUint64AddressUint64Void({
          ...sendParams,
          args: {
            payment,
            gateTxn,
            appId: listingAppId,
            marketplace,
            wallet
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
      note: uniqueNote("payment"),
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













exports.ListingSDK = ListingSDK; exports.MARKETPLACE_ERROR_MESSAGES = MARKETPLACE_ERROR_MESSAGES; exports.translateMarketplaceError = translateMarketplaceError; exports.MARKETPLACE_HINTED_METHODS = MARKETPLACE_HINTED_METHODS; exports.MARKETPLACE_LEGACY_METHODS = MARKETPLACE_LEGACY_METHODS; exports.LISTING_CREATE_MBR = LISTING_CREATE_MBR; exports.LEGACY_LISTING_CREATE_MBR = LEGACY_LISTING_CREATE_MBR; exports.directGateCtx = directGateCtx; exports.isLegacyGateTxn = isLegacyGateTxn; exports.MarketplaceSDK = MarketplaceSDK; exports.newListing = newListing;
//# sourceMappingURL=chunk-Y4MTSIPC.js.map
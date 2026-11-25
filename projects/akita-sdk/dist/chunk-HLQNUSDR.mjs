import {
  MIN_DISBURSEMENTS_MBR,
  USER_ALLOCATION_MBR
} from "./chunk-MZANR6D2.mjs";
import {
  PrizeBoxFactorySDK
} from "./chunk-N4QEZXSZ.mjs";
import {
  makeErrorTranslator,
  withErrorCodeAliases
} from "./chunk-GOQ4H3PG.mjs";
import {
  BaseSDK
} from "./chunk-TD7NNME7.mjs";
import {
  ENV_VAR_NAMES
} from "./chunk-J2RLGP2X.mjs";

// src/marketplace/index.ts
import { microAlgo } from "@algorandfoundation/algokit-utils";
import algosdk from "algosdk";

// src/generated/MarketplaceClient.ts
import { getArc56ReturnValue, getABIStructFromABITuple } from "@algorandfoundation/algokit-utils/types/app-arc56";
import {
  AppClient as _AppClient
} from "@algorandfoundation/algokit-utils/types/app-client";
import { AppFactory as _AppFactory } from "@algorandfoundation/algokit-utils/types/app-factory";
var APP_SPEC = { "name": "Marketplace", "structs": { "EscrowConfig": [{ "name": "name", "type": "string" }, { "name": "app", "type": "uint64" }] }, "methods": [{ "name": "create", "args": [{ "type": "string", "name": "version" }, { "type": "string", "name": "childVersion" }, { "type": "uint64", "name": "akitaDAO" }, { "type": "(string,uint64)", "struct": "EscrowConfig", "name": "akitaDAOEscrow" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "list", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "uint64", "name": "price" }, { "type": "uint64", "name": "paymentAsset" }, { "type": "uint64", "name": "expiration" }, { "type": "address", "name": "reservedFor" }, { "type": "uint64", "name": "gateID" }, { "type": "address", "name": "marketplace" }, { "type": "string", "name": "name" }, { "type": "byte[32][]", "name": "proof" }, { "type": "uint64", "name": "wallet" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "List an ASA (principal resolution \xA76.7). `wallet` is the caller's wallet hint (0 = plain account):\nthe verified principal's referrer is fixed on the rev-3 child as `seller_referrer`. The seller is\nthe spender (`Txn.sender`).", "events": [], "recommendations": {} }, { "name": "list", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "uint64", "name": "price" }, { "type": "uint64", "name": "paymentAsset" }, { "type": "uint64", "name": "expiration" }, { "type": "address", "name": "reservedFor" }, { "type": "uint64", "name": "gateID" }, { "type": "address", "name": "marketplace" }, { "type": "string", "name": "name" }, { "type": "byte[32][]", "name": "proof" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "LEGACY shim, deployed selector `list(pay,axfer,uint64,uint64,uint64,address,uint64,address,string,byte[32][])uint64`.\nCreates a rev-3 child whose `seller_referrer` is the seller's registry referrer at creation\n(`legacySellerReferrer`). Also accepts the deployed plugin's ALGO payment (`assertListingPayment`).", "events": [], "recommendations": {} }, { "name": "listPrizeBox", "args": [{ "type": "appl", "name": "prizeBoxTransferTxn" }, { "type": "pay", "name": "payment" }, { "type": "uint64", "name": "price" }, { "type": "uint64", "name": "paymentAsset" }, { "type": "uint64", "name": "expiration" }, { "type": "address", "name": "reservedFor" }, { "type": "uint64", "name": "gateID" }, { "type": "address", "name": "marketplace" }, { "type": "uint64", "name": "wallet" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "List a prize box; `wallet` as in `list`.", "events": [], "recommendations": {} }, { "name": "listPrizeBox", "args": [{ "type": "appl", "name": "prizeBoxTransferTxn" }, { "type": "pay", "name": "payment" }, { "type": "uint64", "name": "price" }, { "type": "uint64", "name": "paymentAsset" }, { "type": "uint64", "name": "expiration" }, { "type": "address", "name": "reservedFor" }, { "type": "uint64", "name": "gateID" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "LEGACY shim, deployed selector `listPrizeBox(appl,pay,uint64,uint64,uint64,address,uint64,address)uint64` (see `legacyList`).", "events": [], "recommendations": {} }, { "name": "gatedPurchase", "args": [{ "type": "pay", "name": "payment" }, { "type": "appl", "name": "gateTxn" }, { "type": "uint64", "name": "appId" }, { "type": "address", "name": "marketplace" }, { "type": "uint64", "name": "wallet" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Gated ALGO purchase. `gateTxn` must be `Gate.mustCheckFor(ctx, gateID, args)` with `ctx` = the\nbuyer's verified `(principal, wallet, spender)` for hint `wallet` (0 = plain account).", "events": [], "recommendations": {} }, { "name": "gatedPurchase", "args": [{ "type": "pay", "name": "payment" }, { "type": "appl", "name": "gateTxn" }, { "type": "uint64", "name": "appId" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "LEGACY shim, deployed selector `gatedPurchase(pay,appl,uint64,address)void`: registry-origin `Gate.mustCheck`.", "events": [], "recommendations": {} }, { "name": "purchase", "args": [{ "type": "pay", "name": "payment" }, { "type": "uint64", "name": "appId" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "gatedPurchaseAsa", "args": [{ "type": "axfer", "name": "assetXfer" }, { "type": "appl", "name": "gateTxn" }, { "type": "uint64", "name": "appId" }, { "type": "address", "name": "marketplace" }, { "type": "uint64", "name": "wallet" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Gated ASA purchase; `gateTxn` and `wallet` as in `gatedPurchase`.", "events": [], "recommendations": {} }, { "name": "gatedPurchaseAsa", "args": [{ "type": "axfer", "name": "assetXfer" }, { "type": "appl", "name": "gateTxn" }, { "type": "uint64", "name": "appId" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "LEGACY shim, deployed selector `gatedPurchaseAsa(axfer,appl,uint64,address)void`: registry-origin `Gate.mustCheck`.", "events": [], "recommendations": {} }, { "name": "purchaseAsa", "args": [{ "type": "axfer", "name": "assetXfer" }, { "type": "uint64", "name": "appId" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "delist", "args": [{ "type": "uint64", "name": "appId" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "listCost", "args": [{ "type": "uint64", "name": "prize" }, { "type": "uint64", "name": "paymentAsset" }, { "type": "bool", "name": "isPrizeBox" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "Exact payment `list` (isPrizeBox = false, `prize` = the ASA) or `listPrizeBox`\n(isPrizeBox = true, `prize` ignored) requires right now. Includes the non-refundable\nDAO-escrow opt-in for a payment asset the escrow does not hold yet.", "events": [], "recommendations": {} }, { "name": "initBoxedContract", "args": [{ "type": "string", "name": "version" }, { "type": "uint64", "name": "size" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "loadBoxedContract", "args": [{ "type": "uint64", "name": "offset" }, { "type": "byte[]", "name": "data" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "deleteBoxedContract", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "optIn", "args": [{ "type": "pay", "name": "payment", "desc": "The payment transaction covering MBR for all opt-ins" }, { "type": "uint64", "name": "asset", "desc": "The asset to opt into" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "optIn opts this contract into `asset`. When this contract has a\nnamed escrow configured (`akitaDAOEscrow.value.name !== ''`), it\nalso opts the escrow and every revenue-split recipient in through\nthe revenue-manager plugin \u2014 so downstream methods (subscribe,\nlist, etc.) can transfer to the escrow without doing the plugin-\nrekey dance mid-group.\n\nPayment must cover:\n  - this contract's own opt-in (1 \xD7 assetOptInMinBalance), plus\n  - each downstream opt-in the escrow still needs.\n`splitOptInCount` returns 0 once the escrow is already opted in, so\nthe charge collapses to just 1 \xD7 assetOptInMinBalance on repeat\ncalls and the escrow branch becomes a no-op.", "events": [], "recommendations": {} }, { "name": "optInCost", "args": [{ "type": "uint64", "name": "asset" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "updateAkitaDAOEscrow", "args": [{ "type": "(string,uint64)", "struct": "EscrowConfig", "name": "config" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "update", "args": [{ "type": "string", "name": "newVersion" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["UpdateApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 8, "bytes": 56 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "childContractVersion": { "keyType": "AVMString", "valueType": "AVMString", "key": "Y2hpbGRfY29udHJhY3RfdmVyc2lvbg==", "desc": "the current version of the child contract" }, "akitaDAOEscrow": { "keyType": "AVMString", "valueType": "EscrowConfig", "key": "YWtpdGFfZXNjcm93", "desc": "the named DAO escrow this contract routes fees to (name + app)" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" } }, "local": {}, "box": { "boxedContract": { "keyType": "AVMString", "valueType": "AVMBytes", "key": "YmM=" } } }, "maps": { "global": {}, "local": {}, "box": {} } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [667, 4665, 5392], "errorMessage": "Bytes has valid prefix" }, { "pc": [4768], "errorMessage": "ERR:errBmpt" }, { "pc": [532, 2451, 4094, 4731], "errorMessage": "ERR:errCnst" }, { "pc": [3339, 3459], "errorMessage": "ERR:errFgte" }, { "pc": [3215], "errorMessage": "ERR:errHgte" }, { "pc": [948], "errorMessage": "ERR:errHnbd" }, { "pc": [852], "errorMessage": "ERR:errHnwl" }, { "pc": [871], "errorMessage": "ERR:errHtop" }, { "pc": [2440], "errorMessage": "ERR:errIcor" }, { "pc": [3586, 3672, 3845, 4115, 4127], "errorMessage": "ERR:errIpay" }, { "pc": [2595], "errorMessage": "ERR:errIpma" }, { "pc": [2565], "errorMessage": "ERR:errIpmr" }, { "pc": [550, 3803], "errorMessage": "ERR:errIpms" }, { "pc": [2811], "errorMessage": "ERR:errIupg" }, { "pc": [970, 3492], "errorMessage": "ERR:errIwlt" }, { "pc": [3743, 3754, 3785], "errorMessage": "ERR:errIxfr" }, { "pc": [3708], "errorMessage": "ERR:errLflt" }, { "pc": [3972], "errorMessage": "ERR:errLgcy" }, { "pc": [3187], "errorMessage": "ERR:errNals" }, { "pc": [589, 3817], "errorMessage": "ERR:errNcls" }, { "pc": [575], "errorMessage": "ERR:errNclw" }, { "pc": [2291, 2482, 2737, 2779, 2847], "errorMessage": "ERR:errNdao" }, { "pc": [5428], "errorMessage": "ERR:errNesc" }, { "pc": [4782, 4830], "errorMessage": "ERR:errNpbo" }, { "pc": [603, 3831], "errorMessage": "ERR:errNrky" }, { "pc": [4153], "errorMessage": "ERR:errPbdl" }, { "pc": [4083, 4720], "errorMessage": "ERR:errPrlo" }, { "pc": [5256], "errorMessage": "ERR:errPtlg" }, { "pc": [5454], "errorMessage": "ERR:errWesc" }, { "pc": [1723, 1728, 1796, 1801, 1856, 1861, 1935, 1940, 2011, 2016, 2074, 2079, 2115, 2120, 3067, 3088, 3516, 3678, 3682], "errorMessage": "account funded" }, { "pc": [759, 2321, 2474, 2531, 2668, 2729, 2771, 2839, 2946, 3166, 3497, 3521, 3883, 3998, 4416, 4440, 4478, 4505, 4548, 4797, 4809, 5057, 5080, 5108, 5151, 5517, 5535, 5615], "errorMessage": "application exists" }, { "pc": [4577], "errorMessage": "asset exists" }, { "pc": [1334, 1563, 2270, 2467, 2520, 2526, 2659, 2663, 2722, 2764, 2783, 2832, 2937, 2941, 2965, 2982, 3015, 3223, 3239, 3354, 3380, 3545, 4186, 4251, 4263, 4268, 4543, 4786, 4896, 4908, 4913, 5146, 5286, 5317, 5511], "errorMessage": "check GlobalState exists" }, { "pc": [4811], "errorMessage": "errNapb" }, { "pc": [670, 1133, 1149, 1190, 1295, 1311, 1434, 1450, 2247, 2341, 2711, 2748, 4193, 4668, 5395], "errorMessage": "invalid array length header" }, { "pc": [2227], "errorMessage": "invalid number of bytes for arc4.bool" }, { "pc": [1140, 1156, 1302, 1441, 2254, 2348, 2755], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [1321, 1460], "errorMessage": "invalid number of bytes for arc4.dynamic_array<bytes[32]>" }, { "pc": [5404], "errorMessage": "invalid number of bytes for arc4.dynamic_array<smart_contracts/arc58/account/types.ts::EscrowInfo>" }, { "pc": [1271, 1289, 1410, 1428, 1532, 1550, 1638, 1656, 1709, 1791, 1851, 1921, 2006, 2069], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [1167, 1243, 1252, 1261, 1279, 1329, 1382, 1391, 1400, 1418, 1504, 1513, 1522, 1540, 1558, 1610, 1619, 1628, 1646, 1699, 1717, 1781, 1841, 1911, 1929, 1996, 2059, 2109, 2209, 2218, 2265, 2333, 2506, 2652, 2825], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [676], "errorMessage": "invalid number of bytes for bytes" }, { "pc": [1195, 2716], "errorMessage": "invalid number of bytes for smart_contracts/utils/base-contracts/base.ts::EscrowConfig" }, { "pc": [4674], "errorMessage": "invalid number of bytes for string" }, { "pc": [1182, 2703], "errorMessage": "invalid tail pointer at index 0 of ((len+utf8[]),uint64)" }, { "pc": [1177, 2698], "errorMessage": "invalid tuple encoding" }, { "pc": [1486, 1592, 1691, 1773, 1903, 1988], "errorMessage": "transaction type is appl" }, { "pc": [1235, 1374, 1892, 1977, 2051], "errorMessage": "transaction type is axfer" }, { "pc": [1224, 1363, 1496, 1602, 1680, 1762, 1833, 2498], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDggMiA3OTgwMCA0MDk2IDc1NjUwMCA1MDAwMAogICAgYnl0ZWNibG9jayAiYWtpdGFfZGFvIiAiYmMiICJha2l0YV9lc2Nyb3ciIDB4MTUxZjdjNzUgImFhbCIgIndhbGxldCIgIkVSUjplcnJOZGFvIiAiRVJSOmVycklwYXkiICJFUlI6ZXJyQ25zdCIgImNoaWxkX2NvbnRyYWN0X3ZlcnNpb24iIDB4MDAgInJldiIgImZ1bmRlciIgImZhY3RvcnlfZmxvYXQiICJnYXRlX2lkIiAiRVJSOmVyckl4ZnIiIDB4M2VhMTE4MzIgMHhjNTNiMzJjYyAiRVJSOmVycklwbXMiICJFUlI6ZXJyTmNscyIgIkVSUjplcnJOcmt5IiAiYXBwSUQiICJjb250cm9sbGVkX2FkZHJlc3MiICJFUlI6ZXJySXdsdCIgInJlZmVycmVyIiAidmVyc2lvbiIgInBhbCIgIkVSUjplcnJGZ3RlIiAiRVJSOmVyclBybG8iIGJhc2U2NChDNEVCUXc9PSkgMHg5YzU0MjQwOSAweGFkZjkyYWU0ICJFUlI6ZXJyTnBibyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjIyLTI4CiAgICAvLyBAY29udHJhY3QoewogICAgLy8gICBzdGF0ZVRvdGFsczogewogICAgLy8gICAgIGdsb2JhbEJ5dGVzOiBGYWN0b3J5R2xvYmFsU3RhdGVNYXhCeXRlcywKICAgIC8vICAgICBnbG9iYWxVaW50czogRmFjdG9yeUdsb2JhbFN0YXRlTWF4VWludHMKICAgIC8vICAgfQogICAgLy8gfSkKICAgIC8vIGV4cG9ydCBjbGFzcyBNYXJrZXRwbGFjZSBleHRlbmRzIEZhY3RvcnlDb250cmFjdCB7CiAgICBwdXNoYnl0ZXMgMHhlYTkxODBkZCAvLyBtZXRob2QgInVwZGF0ZShzdHJpbmcpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIG1haW5fdXBkYXRlX3JvdXRlQDIKCm1haW5fc3dpdGNoX2Nhc2VfbmV4dEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjItMjgKICAgIC8vIEBjb250cmFjdCh7CiAgICAvLyAgIHN0YXRlVG90YWxzOiB7CiAgICAvLyAgICAgZ2xvYmFsQnl0ZXM6IEZhY3RvcnlHbG9iYWxTdGF0ZU1heEJ5dGVzLAogICAgLy8gICAgIGdsb2JhbFVpbnRzOiBGYWN0b3J5R2xvYmFsU3RhdGVNYXhVaW50cwogICAgLy8gICB9CiAgICAvLyB9KQogICAgLy8gZXhwb3J0IGNsYXNzIE1hcmtldHBsYWNlIGV4dGVuZHMgRmFjdG9yeUNvbnRyYWN0IHsKICAgIHR4biBPbkNvbXBsZXRpb24KICAgICEKICAgIGFzc2VydAogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgIGJ6IG1haW5fY3JlYXRlX05vT3BAMjYKICAgIHB1c2hieXRlc3MgMHg2YWJkNjczOCAweGUyZmE5ZTIxIDB4ZTY2YWQ5MmUgMHg4MWRjNTE2YSAweDcxZDUyMGY0IDB4NmU5MDM1Y2MgMHg1ZDdhNjE3NyAweDc5MjJjMWZkIDB4ZGFhOTc1MTYgMHgwMmNmYjFjZiAweGM5N2RiYjJlIDB4MzMyZjZkZDggLy8gbWV0aG9kICJsaXN0KHBheSxheGZlcix1aW50NjQsdWludDY0LHVpbnQ2NCxhZGRyZXNzLHVpbnQ2NCxhZGRyZXNzLHN0cmluZyxieXRlWzMyXVtdLHVpbnQ2NCl1aW50NjQiLCBtZXRob2QgImxpc3QocGF5LGF4ZmVyLHVpbnQ2NCx1aW50NjQsdWludDY0LGFkZHJlc3MsdWludDY0LGFkZHJlc3Msc3RyaW5nLGJ5dGVbMzJdW10pdWludDY0IiwgbWV0aG9kICJsaXN0UHJpemVCb3goYXBwbCxwYXksdWludDY0LHVpbnQ2NCx1aW50NjQsYWRkcmVzcyx1aW50NjQsYWRkcmVzcyx1aW50NjQpdWludDY0IiwgbWV0aG9kICJsaXN0UHJpemVCb3goYXBwbCxwYXksdWludDY0LHVpbnQ2NCx1aW50NjQsYWRkcmVzcyx1aW50NjQsYWRkcmVzcyl1aW50NjQiLCBtZXRob2QgImdhdGVkUHVyY2hhc2UocGF5LGFwcGwsdWludDY0LGFkZHJlc3MsdWludDY0KXZvaWQiLCBtZXRob2QgImdhdGVkUHVyY2hhc2UocGF5LGFwcGwsdWludDY0LGFkZHJlc3Mpdm9pZCIsIG1ldGhvZCAicHVyY2hhc2UocGF5LHVpbnQ2NCxhZGRyZXNzKXZvaWQiLCBtZXRob2QgImdhdGVkUHVyY2hhc2VBc2EoYXhmZXIsYXBwbCx1aW50NjQsYWRkcmVzcyx1aW50NjQpdm9pZCIsIG1ldGhvZCAiZ2F0ZWRQdXJjaGFzZUFzYShheGZlcixhcHBsLHVpbnQ2NCxhZGRyZXNzKXZvaWQiLCBtZXRob2QgInB1cmNoYXNlQXNhKGF4ZmVyLHVpbnQ2NCxhZGRyZXNzKXZvaWQiLCBtZXRob2QgImRlbGlzdCh1aW50NjQpdm9pZCIsIG1ldGhvZCAibGlzdENvc3QodWludDY0LHVpbnQ2NCxib29sKXVpbnQ2NCIKICAgIGJ5dGVjIDE3IC8vIG1ldGhvZCAiaW5pdEJveGVkQ29udHJhY3Qoc3RyaW5nLHVpbnQ2NCl2b2lkIgogICAgcHVzaGJ5dGVzcyAweGRjYTJkODYyIDB4ZDM0NmIxYTQgMHgzOTRlYWViMiAweDMzZjc4ODA4IDB4YWU4NGNiZDggMHgzM2U5MmM5NCAweDg1NGRlZGUwIC8vIG1ldGhvZCAibG9hZEJveGVkQ29udHJhY3QodWludDY0LGJ5dGVbXSl2b2lkIiwgbWV0aG9kICJkZWxldGVCb3hlZENvbnRyYWN0KCl2b2lkIiwgbWV0aG9kICJvcHRJbihwYXksdWludDY0KXZvaWQiLCBtZXRob2QgIm9wdEluQ29zdCh1aW50NjQpdWludDY0IiwgbWV0aG9kICJ1cGRhdGVBa2l0YURBT0VzY3Jvdygoc3RyaW5nLHVpbnQ2NCkpdm9pZCIsIG1ldGhvZCAidXBkYXRlQWtpdGFEQU8odWludDY0KXZvaWQiLCBtZXRob2QgIm9wVXAoKXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBsaXN0IGxlZ2FjeUxpc3QgbGlzdFByaXplQm94IGxlZ2FjeUxpc3RQcml6ZUJveCBnYXRlZFB1cmNoYXNlIGxlZ2FjeUdhdGVkUHVyY2hhc2UgcHVyY2hhc2UgZ2F0ZWRQdXJjaGFzZUFzYSBsZWdhY3lHYXRlZFB1cmNoYXNlQXNhIHB1cmNoYXNlQXNhIGRlbGlzdCBsaXN0Q29zdCBpbml0Qm94ZWRDb250cmFjdCBsb2FkQm94ZWRDb250cmFjdCBkZWxldGVCb3hlZENvbnRyYWN0IG9wdEluIG9wdEluQ29zdCB1cGRhdGVBa2l0YURBT0VzY3JvdyB1cGRhdGVBa2l0YURBTyBtYWluX29wVXBfcm91dGVAMjQKICAgIGVycgoKbWFpbl9vcFVwX3JvdXRlQDI0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjMwCiAgICAvLyBvcFVwKCk6IHZvaWQgeyB9CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgptYWluX2NyZWF0ZV9Ob09wQDI2OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjItMjgKICAgIC8vIEBjb250cmFjdCh7CiAgICAvLyAgIHN0YXRlVG90YWxzOiB7CiAgICAvLyAgICAgZ2xvYmFsQnl0ZXM6IEZhY3RvcnlHbG9iYWxTdGF0ZU1heEJ5dGVzLAogICAgLy8gICAgIGdsb2JhbFVpbnRzOiBGYWN0b3J5R2xvYmFsU3RhdGVNYXhVaW50cwogICAgLy8gICB9CiAgICAvLyB9KQogICAgLy8gZXhwb3J0IGNsYXNzIE1hcmtldHBsYWNlIGV4dGVuZHMgRmFjdG9yeUNvbnRyYWN0IHsKICAgIHB1c2hieXRlcyAweDgxMTUzNjI4IC8vIG1ldGhvZCAiY3JlYXRlKHN0cmluZyxzdHJpbmcsdWludDY0LChzdHJpbmcsdWludDY0KSl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggY3JlYXRlCiAgICBlcnIKCm1haW5fdXBkYXRlX3JvdXRlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzUKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgdHhuIE9uQ29tcGxldGlvbgogICAgcHVzaGludCA0IC8vIFVwZGF0ZUFwcGxpY2F0aW9uCiAgICA9PQogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgICYmCiAgICBhc3NlcnQKICAgIGIgdXBkYXRlCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3Byb2dyYW1zLnRzOjpib3hlZFByb2dyYW1TaXplKGJveEtleTogYnl0ZXMpIC0+IHVpbnQ2NDoKYm94ZWRQcm9ncmFtU2l6ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcm9ncmFtcy50czo4MQogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIGJveGVkUHJvZ3JhbVNpemUoYm94S2V5OiBieXRlcyk6IHVpbnQ2NCB7CiAgICBwcm90byAxIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcm9ncmFtcy50czo4MgogICAgLy8gY29uc3QgW3NpemUsIGV4aXN0c10gPSBvcC5Cb3gubGVuZ3RoKGJveEtleSkKICAgIGZyYW1lX2RpZyAtMQogICAgYm94X2xlbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3Byb2dyYW1zLnRzOjgzCiAgICAvLyBsb2dnZWRBc3NlcnQoZXhpc3RzLCBlcnJDb250cmFjdE5vdFNldCkKICAgIGJueiBib3hlZFByb2dyYW1TaXplX2FmdGVyX2Fzc2VydEAyCiAgICBieXRlYyA4IC8vICJFUlI6ZXJyQ25zdCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJDbnN0Cgpib3hlZFByb2dyYW1TaXplX2FmdGVyX2Fzc2VydEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3Byb2dyYW1zLnRzOjg0CiAgICAvLyByZXR1cm4gc2l6ZQogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6YXNzZXJ0U2FmZUFzc2V0VHJhbnNmZXIodHhuOiB1aW50NjQsIHNlbmRlcjogYnl0ZXMpIC0+IHZvaWQ6CmFzc2VydFNhZmVBc3NldFRyYW5zZmVyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNzYKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiBhc3NlcnRTYWZlQXNzZXRUcmFuc2Zlcih0eG46IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwgc2VuZGVyOiBBY2NvdW50KTogdm9pZCB7CiAgICBwcm90byAyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTc3CiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLnNlbmRlciA9PT0gc2VuZGVyLCBlcnJJbnZhbGlkUGF5bWVudFNlbmRlcikKICAgIGZyYW1lX2RpZyAtMgogICAgZ3R4bnMgU2VuZGVyCiAgICBmcmFtZV9kaWcgLTEKICAgID09CiAgICBibnogYXNzZXJ0U2FmZUFzc2V0VHJhbnNmZXJfYWZ0ZXJfYXNzZXJ0QDIKICAgIGJ5dGVjIDE4IC8vICJFUlI6ZXJySXBtcyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcG1zCgphc3NlcnRTYWZlQXNzZXRUcmFuc2Zlcl9hZnRlcl9hc3NlcnRAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTc4CiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLmFzc2V0U2VuZGVyID09PSBHbG9iYWwuemVyb0FkZHJlc3MsIGVyckNsYXdiYWNrRm9yYmlkZGVuKQogICAgZnJhbWVfZGlnIC0yCiAgICBndHhucyBBc3NldFNlbmRlcgogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYm56IGFzc2VydFNhZmVBc3NldFRyYW5zZmVyX2FmdGVyX2Fzc2VydEA0CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJOY2x3IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5jbHcKCmFzc2VydFNhZmVBc3NldFRyYW5zZmVyX2FmdGVyX2Fzc2VydEA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNzkKICAgIC8vIGxvZ2dlZEFzc2VydCh0eG4uYXNzZXRDbG9zZVRvID09PSBHbG9iYWwuemVyb0FkZHJlc3MsIGVyckNsb3NlRm9yYmlkZGVuKQogICAgZnJhbWVfZGlnIC0yCiAgICBndHhucyBBc3NldENsb3NlVG8KICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIGJueiBhc3NlcnRTYWZlQXNzZXRUcmFuc2Zlcl9hZnRlcl9hc3NlcnRANgogICAgYnl0ZWMgMTkgLy8gIkVSUjplcnJOY2xzIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5jbHMKCmFzc2VydFNhZmVBc3NldFRyYW5zZmVyX2FmdGVyX2Fzc2VydEA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxODAKICAgIC8vIGxvZ2dlZEFzc2VydCh0eG4ucmVrZXlUbyA9PT0gR2xvYmFsLnplcm9BZGRyZXNzLCBlcnJSZWtleUZvcmJpZGRlbikKICAgIGZyYW1lX2RpZyAtMgogICAgZ3R4bnMgUmVrZXlUbwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYm56IGFzc2VydFNhZmVBc3NldFRyYW5zZmVyX2FmdGVyX2Fzc2VydEA4CiAgICBieXRlYyAyMCAvLyAiRVJSOmVyck5ya3kiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTnJreQoKYXNzZXJ0U2FmZUFzc2V0VHJhbnNmZXJfYWZ0ZXJfYXNzZXJ0QDg6CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpsZWdhY3lXYWxsZXRPZihha2l0YURBTzogdWludDY0LCBhZGRyZXNzOiBieXRlcykgLT4gdWludDY0OgpsZWdhY3lXYWxsZXRPZjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Mzc5CiAgICAvLyBleHBvcnQgZnVuY3Rpb24gbGVnYWN5V2FsbGV0T2YoYWtpdGFEQU86IEFwcGxpY2F0aW9uLCBhZGRyZXNzOiBBY2NvdW50KTogQXBwbGljYXRpb24gewogICAgcHJvdG8gMiAxCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMjEKICAgIC8vIGNvbnN0IFtvdGhlckFwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNPdGhlckFwcExpc3QpKQogICAgZnJhbWVfZGlnIC0yCiAgICBwdXNoYnl0ZXMgIm9hbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjI2CiAgICAvLyByZXR1cm4gZ2V0T3RoZXJBcHBMaXN0KGFraXRhREFPKS5lc2Nyb3cKICAgIHB1c2hpbnQgMjQKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIwNgogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgZnJhbWVfZGlnIC0yCiAgICBieXRlYyA0IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM4MAogICAgLy8gcmV0dXJuIEFwcGxpY2F0aW9uKGxlZ2FjeVdhbGxldElEKGdldEVzY3Jvd0ZhY3RvcnkoYWtpdGFEQU8pLCBnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLndhbGxldCwgYWRkcmVzcykpCiAgICBwdXNoaW50IDg4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozODgtMzkxCiAgICAvLyBjb25zdCBkYXRhID0gYWJpQ2FsbDx0eXBlb2YgRXNjcm93RmFjdG9yeS5wcm90b3R5cGUuZ2V0Pih7CiAgICAvLyAgIGFwcElkOiBlc2Nyb3dGYWN0b3J5LAogICAgLy8gICBhcmdzOiBbYWRkcmVzc10KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hieXRlcyAweDNjMWE2ZjMzIC8vIG1ldGhvZCAiZ2V0KGFkZHJlc3MpYnl0ZVtdIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGZyYW1lX2RpZyAtMQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIGRpZyAxCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWNfMyAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGJ5dGVzCiAgICBleHRyYWN0IDYgMAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM5MwogICAgLy8gaWYgKEJ5dGVzKGRhdGEpLmxlbmd0aCAhPT0gOCkgewogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgIT0KICAgIGJ6IGxlZ2FjeVdhbGxldE9mX2FmdGVyX2lmX2Vsc2VANgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM5NAogICAgLy8gcmV0dXJuIDAKICAgIGludGNfMCAvLyAwCgpsZWdhY3lXYWxsZXRPZl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmxlZ2FjeVdhbGxldElEQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM4MAogICAgLy8gcmV0dXJuIEFwcGxpY2F0aW9uKGxlZ2FjeVdhbGxldElEKGdldEVzY3Jvd0ZhY3RvcnkoYWtpdGFEQU8pLCBnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLndhbGxldCwgYWRkcmVzcykpCiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKbGVnYWN5V2FsbGV0T2ZfYWZ0ZXJfaWZfZWxzZUA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozOTcKICAgIC8vIGNvbnN0IHdhbGxldCA9IGJ0b2koZGF0YSkKICAgIGJ0b2kKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNjQKICAgIC8vIGlmICh3YWxsZXQgPT09IDAgfHwgd2FsbGV0RmFjdG9yeSA9PT0gMCkgewogICAgYnogbGVnYWN5V2FsbGV0T2ZfaWZfYm9keUAxMAogICAgZnJhbWVfZGlnIDEKICAgIGJueiBsZWdhY3lXYWxsZXRPZl9hZnRlcl9pZl9lbHNlQDExCgpsZWdhY3lXYWxsZXRPZl9pZl9ib2R5QDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNjUKICAgIC8vIHJldHVybiBmYWxzZQogICAgaW50Y18wIC8vIDAKCmxlZ2FjeVdhbGxldE9mX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6aXNBa2l0YVdhbGxldEAxNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Mzk4CiAgICAvLyByZXR1cm4gaXNBa2l0YVdhbGxldCh3YWxsZXQsIHdhbGxldEZhY3RvcnkpID8gd2FsbGV0IDogMAogICAgaW50Y18wIC8vIDAKICAgIGNvdmVyIDIKICAgIHNlbGVjdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozODAKICAgIC8vIHJldHVybiBBcHBsaWNhdGlvbihsZWdhY3lXYWxsZXRJRChnZXRFc2Nyb3dGYWN0b3J5KGFraXRhREFPKSwgZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS53YWxsZXQsIGFkZHJlc3MpKQogICAgYiBsZWdhY3lXYWxsZXRPZl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmxlZ2FjeVdhbGxldElEQDcKCmxlZ2FjeVdhbGxldE9mX2FmdGVyX2lmX2Vsc2VAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM2NwogICAgLy8gY29uc3QgW2NyZWF0b3IsIGV4aXN0c10gPSBvcC5BcHBQYXJhbXMuYXBwQ3JlYXRvcih3YWxsZXQpCiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcENyZWF0b3IKICAgIHN3YXAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNjgKICAgIC8vIHJldHVybiBleGlzdHMgJiYgY3JlYXRvciA9PT0gYXBwQWRkcmVzcyh3YWxsZXRGYWN0b3J5KQogICAgYnogbGVnYWN5V2FsbGV0T2ZfYm9vbF9mYWxzZUAxNAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNTkKICAgIC8vIHJldHVybiBBY2NvdW50KG9wLnNoYTUxMl8yNTYoQnl0ZXMoJ2FwcElEJykuY29uY2F0KGl0b2IoYXBwSWQpKSkpCiAgICBmcmFtZV9kaWcgMQogICAgaXRvYgogICAgYnl0ZWMgMjEgLy8gImFwcElEIgogICAgc3dhcAogICAgY29uY2F0CiAgICBzaGE1MTJfMjU2CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM2OAogICAgLy8gcmV0dXJuIGV4aXN0cyAmJiBjcmVhdG9yID09PSBhcHBBZGRyZXNzKHdhbGxldEZhY3RvcnkpCiAgICBmcmFtZV9kaWcgMAogICAgPT0KICAgIGJ6IGxlZ2FjeVdhbGxldE9mX2Jvb2xfZmFsc2VAMTQKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM5OAogICAgLy8gcmV0dXJuIGlzQWtpdGFXYWxsZXQod2FsbGV0LCB3YWxsZXRGYWN0b3J5KSA/IHdhbGxldCA6IDAKICAgIGIgbGVnYWN5V2FsbGV0T2ZfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjppc0FraXRhV2FsbGV0QDE2CgpsZWdhY3lXYWxsZXRPZl9ib29sX2ZhbHNlQDE0OgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Mzk4CiAgICAvLyByZXR1cm4gaXNBa2l0YVdhbGxldCh3YWxsZXQsIHdhbGxldEZhY3RvcnkpID8gd2FsbGV0IDogMAogICAgYiBsZWdhY3lXYWxsZXRPZl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmlzQWtpdGFXYWxsZXRAMTYKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpyZXdhcmRzT3B0SW5Db3N0KGFraXRhREFPOiB1aW50NjQsIGFzc2V0OiB1aW50NjQpIC0+IHVpbnQ2NDoKcmV3YXJkc09wdEluQ29zdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzM5CiAgICAvLyBleHBvcnQgZnVuY3Rpb24gcmV3YXJkc09wdEluQ29zdChha2l0YURBTzogQXBwbGljYXRpb24sIGFzc2V0OiB1aW50NjQpOiB1aW50NjQgewogICAgcHJvdG8gMiAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc0MAogICAgLy8gaWYgKGFzc2V0ICE9PSAwKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ6IHJld2FyZHNPcHRJbkNvc3RfYWZ0ZXJfaWZfZWxzZUA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIwNgogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgZnJhbWVfZGlnIC0yCiAgICBieXRlYyA0IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc0MQogICAgLy8gY29uc3QgcmV3YXJkc0FwcCA9IGdldEFraXRhQXBwTGlzdChha2l0YURBTykucmV3YXJkcwogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc0MgogICAgLy8gaWYgKCFBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLmlzT3B0ZWRJbihBc3NldChhc3NldCkpKSB7CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBmcmFtZV9kaWcgLTEKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBibnogcmV3YXJkc09wdEluQ29zdF9hZnRlcl9pZl9lbHNlQDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzQzCiAgICAvLyByZXR1cm4gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIHJldHN1YgoKcmV3YXJkc09wdEluQ29zdF9hZnRlcl9pZl9lbHNlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc0NgogICAgLy8gcmV0dXJuIDAKICAgIGludGNfMCAvLyAwCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpwcmluY2lwYWxPZihha2l0YURBTzogdWludDY0LCBoaW50OiB1aW50NjQpIC0+IGJ5dGVzOgpwcmluY2lwYWxPZjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTE5CiAgICAvLyBleHBvcnQgZnVuY3Rpb24gcHJpbmNpcGFsT2YoYWtpdGFEQU86IEFwcGxpY2F0aW9uLCBoaW50OiB1aW50NjQpOiBQcmluY2lwYWwgewogICAgcHJvdG8gMiAxCiAgICBpbnRjXzAgLy8gMAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIwNgogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgZnJhbWVfZGlnIC0yCiAgICBieXRlYyA0IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjkyMAogICAgLy8gcmV0dXJuIHJlc29sdmVQcmluY2lwYWwoZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS53YWxsZXQsIGhpbnQpCiAgICBwdXNoaW50IDg4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoyMTQKICAgIC8vIEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ2FsbGVyQXBwbGljYXRpb25BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjIxMgogICAgLy8gVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MjEzCiAgICAvLyBHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25JZCwKICAgIGdsb2JhbCBDYWxsZXJBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE0OAogICAgLy8gaWYgKGhpbnQgPT09IDApIHsKICAgIGZyYW1lX2RpZyAtMQogICAgYm56IHByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMwogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjkzCiAgICAvLyBvcmlnaW46IEdsb2JhbC56ZXJvQWRkcmVzcywKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo5NQogICAgLy8gcmVmZXJyZXI6IEdsb2JhbC56ZXJvQWRkcmVzcywKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo5MQogICAgLy8gd2FsbGV0OiAwLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OTAtOTcKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIHdhbGxldDogMCwKICAgIC8vICAgcHJpbmNpcGFsOiBzZW5kZXIsCiAgICAvLyAgIG9yaWdpbjogR2xvYmFsLnplcm9BZGRyZXNzLAogICAgLy8gICBzcGVuZGVyOiBzZW5kZXIsCiAgICAvLyAgIHJlZmVycmVyOiBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICAvLyAgIHZpYVBsdWdpbjogZmFsc2UsCiAgICAvLyB9CiAgICBpdG9iCiAgICB1bmNvdmVyIDMKICAgIGR1cAogICAgY292ZXIgMgogICAgY29uY2F0CiAgICB1bmNvdmVyIDMKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJ5dGVjIDEwIC8vIDB4MDAKICAgIGNvbmNhdAoKcHJpbmNpcGFsT2ZfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjpyZXNvbHZlUHJpbmNpcGFsQ3R4QDQwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5MjAKICAgIC8vIHJldHVybiByZXNvbHZlUHJpbmNpcGFsKGdldEFraXRhQXBwTGlzdChha2l0YURBTykud2FsbGV0LCBoaW50KQogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCnByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTAyCiAgICAvLyBpZiAod2FsbGV0ID09PSAwIHx8IHdhbGxldEZhY3RvcnkgPT09IDApIHsKICAgIGZyYW1lX2RpZyAtMQogICAgYnogcHJpbmNpcGFsT2ZfaWZfYm9keUA1CiAgICBmcmFtZV9kaWcgMgogICAgYm56IHByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VANgoKcHJpbmNpcGFsT2ZfaWZfYm9keUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMDMKICAgIC8vIHJldHVybiBmYWxzZQogICAgaW50Y18wIC8vIDAKCnByaW5jaXBhbE9mX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo6aXNHZW51aW5lV2FsbGV0QDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNTIKICAgIC8vIGlmICghaXNHZW51aW5lV2FsbGV0KGhpbnQsIHdhbGxldEZhY3RvcnkpKSB7CiAgICBibnogcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUAxMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNTQKICAgIC8vIGxvZ2dlZEVycihlcnJIaW50Tm90V2FsbGV0KQogICAgcHVzaGJ5dGVzICJFUlI6ZXJySG53bCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJIbndsCgpwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNTkKICAgIC8vIGlmIChjYWxsZXJBcHAgPT09IDApIHsKICAgIGR1cAogICAgYm56IHByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTYxCiAgICAvLyBsb2dnZWRFcnIoZXJySGludFRvcExldmVsKQogICAgcHVzaGJ5dGVzICJFUlI6ZXJySHRvcCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJIdG9wCgpwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNjYKICAgIC8vIGxldCB2aWFQbHVnaW4gPSBmYWxzZQogICAgaW50Y18wIC8vIDAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTY3CiAgICAvLyBpZiAoY2FsbGVyQXBwICE9PSBoaW50KSB7CiAgICBmcmFtZV9kaWcgLTEKICAgICE9CiAgICBieiBwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDIyCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTcxCiAgICAvLyBjb25zdCBbc3BlbmRpbmcsIHNwZW5kaW5nRXhpc3RzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGhpbnQsIEJ5dGVzKFBSSU5DSVBBTF9LRVlfU1BFTkRJTkcpKQogICAgZnJhbWVfZGlnIC0xCiAgICBwdXNoYnl0ZXMgInNwZW5kaW5nX2FkZHJlc3MiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgZnJhbWVfYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE3MgogICAgLy8gaWYgKCEoc3BlbmRpbmdFeGlzdHMgJiYgc3BlbmRpbmcubGVuZ3RoID09PSAzMiAmJiBzcGVuZGluZyA9PT0gc2VuZGVyLmJ5dGVzICYmIHNlbmRlciAhPT0gY2FsbGVyQWRkcikpIHsKICAgIGJ6IHByaW5jaXBhbE9mX2lmX2JvZHlAMjAKICAgIGZyYW1lX2RpZyAxCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBieiBwcmluY2lwYWxPZl9pZl9ib2R5QDIwCiAgICBmcmFtZV9kaWcgMQogICAgZGlnIDEKICAgID09CiAgICBieiBwcmluY2lwYWxPZl9pZl9ib2R5QDIwCiAgICBkdXAKICAgIGZyYW1lX2RpZyAzCiAgICAhPQogICAgYm56IHByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMjEKCnByaW5jaXBhbE9mX2lmX2JvZHlAMjA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE3NAogICAgLy8gbG9nZ2VkRXJyKGVyckhpbnROb3RCb3VuZCkKICAgIHB1c2hieXRlcyAiRVJSOmVyckhuYmQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySG5iZAoKcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUAyMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTc4CiAgICAvLyB2aWFQbHVnaW4gPSB0cnVlCiAgICBpbnRjXzEgLy8gMQogICAgc3dhcAoKcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUAyMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTgxCiAgICAvLyBjb25zdCBbY29udHJvbGxlZEJ5dGVzLCBjb250cm9sbGVkRXhpc3RzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGhpbnQsIEJ5dGVzKFBSSU5DSVBBTF9LRVlfQ09OVFJPTExFRCkpCiAgICBmcmFtZV9kaWcgLTEKICAgIGJ5dGVjIDIyIC8vICJjb250cm9sbGVkX2FkZHJlc3MiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxODIKICAgIC8vIGlmICghKGNvbnRyb2xsZWRFeGlzdHMgJiYgY29udHJvbGxlZEJ5dGVzLmxlbmd0aCA9PT0gMzIpKSB7CiAgICBieiBwcmluY2lwYWxPZl9pZl9ib2R5QDI0CiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGJueiBwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDI1CgpwcmluY2lwYWxPZl9pZl9ib2R5QDI0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxODQKICAgIC8vIGxvZ2dlZEVycihlcnJIaW50QmFkV2FsbGV0KQogICAgYnl0ZWMgMjMgLy8gIkVSUjplcnJJd2x0IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckl3bHQKCnByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMjU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjExOQogICAgLy8gaWYgKGNvbnRyb2xsZWQgPT09IHNwZW5kZXIpIHsKICAgIGR1cAogICAgZGlnIDIKICAgID09CiAgICBieiBwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDI3CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjEyMAogICAgLy8gcmV0dXJuIHRydWUKICAgIGludGNfMSAvLyAxCiAgICBzd2FwCgpwcmluY2lwYWxPZl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OndhbGxldENvbnRyb2xzTGl2ZUAzMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTkxCiAgICAvLyBjb25zdCBbcmVmZXJyZXJCeXRlcywgcmVmZXJyZXJFeGlzdHNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoaGludCwgQnl0ZXMoUFJJTkNJUEFMX0tFWV9SRUZFUlJFUikpCiAgICBmcmFtZV9kaWcgLTEKICAgIGJ5dGVjIDI0IC8vICJyZWZlcnJlciIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE5MgogICAgLy8gY29uc3QgcmVmZXJyZXIgPSByZWZlcnJlckV4aXN0cyAmJiByZWZlcnJlckJ5dGVzLmxlbmd0aCA9PT0gMzIgPyBBY2NvdW50KHJlZmVycmVyQnl0ZXMpIDogR2xvYmFsLnplcm9BZGRyZXNzCiAgICBieiBwcmluY2lwYWxPZl90ZXJuYXJ5X2ZhbHNlQDM1CiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGJ6IHByaW5jaXBhbE9mX3Rlcm5hcnlfZmFsc2VAMzUKICAgIGNvdmVyIDMKCnByaW5jaXBhbE9mX3Rlcm5hcnlfbWVyZ2VAMzY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE5NgogICAgLy8gcHJpbmNpcGFsOiBsaXZlID8gY29udHJvbGxlZCA6IHNlbmRlciwKICAgIGRpZyAyCiAgICBkaWcgMQogICAgdW5jb3ZlciAzCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIHNlbGVjdAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxOTcKICAgIC8vIG9yaWdpbjogbGl2ZSA/IGNvbnRyb2xsZWQgOiBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICBieiBwcmluY2lwYWxPZl90ZXJuYXJ5X2ZhbHNlQDM4CiAgICBzd2FwCgpwcmluY2lwYWxPZl90ZXJuYXJ5X21lcmdlQDM5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxOTQtMjAxCiAgICAvLyByZXR1cm4gewogICAgLy8gICB3YWxsZXQ6IGhpbnQsCiAgICAvLyAgIHByaW5jaXBhbDogbGl2ZSA/IGNvbnRyb2xsZWQgOiBzZW5kZXIsCiAgICAvLyAgIG9yaWdpbjogbGl2ZSA/IGNvbnRyb2xsZWQgOiBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICAvLyAgIHNwZW5kZXI6IHNlbmRlciwKICAgIC8vICAgcmVmZXJyZXIsCiAgICAvLyAgIHZpYVBsdWdpbiwKICAgIC8vIH0KICAgIGZyYW1lX2RpZyAtMQogICAgaXRvYgogICAgdW5jb3ZlciAyCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJ5dGVjIDEwIC8vIDB4MDAKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDMKICAgIHNldGJpdAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjIwOS0yMTYKICAgIC8vIHJldHVybiByZXNvbHZlUHJpbmNpcGFsQ3R4KAogICAgLy8gICB3YWxsZXRGYWN0b3J5LAogICAgLy8gICBoaW50LAogICAgLy8gICBUeG4uc2VuZGVyLAogICAgLy8gICBHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25JZCwKICAgIC8vICAgR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgdHJ1ZQogICAgLy8gKQogICAgYiBwcmluY2lwYWxPZl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OnJlc29sdmVQcmluY2lwYWxDdHhANDAKCnByaW5jaXBhbE9mX3Rlcm5hcnlfZmFsc2VAMzg6CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTk3CiAgICAvLyBvcmlnaW46IGxpdmUgPyBjb250cm9sbGVkIDogR2xvYmFsLnplcm9BZGRyZXNzLAogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICBiIHByaW5jaXBhbE9mX3Rlcm5hcnlfbWVyZ2VAMzkKCnByaW5jaXBhbE9mX3Rlcm5hcnlfZmFsc2VAMzU6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTkyCiAgICAvLyBjb25zdCByZWZlcnJlciA9IHJlZmVycmVyRXhpc3RzICYmIHJlZmVycmVyQnl0ZXMubGVuZ3RoID09PSAzMiA/IEFjY291bnQocmVmZXJyZXJCeXRlcykgOiBHbG9iYWwuemVyb0FkZHJlc3MKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgY292ZXIgMwogICAgYiBwcmluY2lwYWxPZl90ZXJuYXJ5X21lcmdlQDM2CgpwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDI3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMjIKICAgIC8vIGNvbnN0IFt3YWxsZXRBZGRyZXNzLCB3YWxsZXRFeGlzdHNdID0gb3AuQXBwUGFyYW1zLmFwcEFkZHJlc3Mod2FsbGV0KQogICAgZnJhbWVfZGlnIC0xCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBzd2FwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjEyMwogICAgLy8gaWYgKCF3YWxsZXRFeGlzdHMpIHsKICAgIGJueiBwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDI5CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTI0CiAgICAvLyByZXR1cm4gZmFsc2UKICAgIGludGNfMCAvLyAwCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE4OQogICAgLy8gY29uc3QgbGl2ZSA9IHdhbGxldENvbnRyb2xzTGl2ZShoaW50LCBjb250cm9sbGVkLCBzZW5kZXIpCiAgICBiIHByaW5jaXBhbE9mX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo6d2FsbGV0Q29udHJvbHNMaXZlQDMyCgpwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDI5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMjYKICAgIC8vIGlmIChjb250cm9sbGVkID09PSB3YWxsZXRBZGRyZXNzKSB7CiAgICBkdXAKICAgIGRpZyAyCiAgICA9PQogICAgYnogcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUAzMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo4NQogICAgLy8gY29uc3QgW2F1dGhdID0gb3AuQWNjdFBhcmFtcy5hY2N0QXV0aEFkZHIoYWNjb3VudCkKICAgIHN3YXAKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0QXV0aEFkZHIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMjcKICAgIC8vIHJldHVybiBhdXRoQWRkck9mKHdhbGxldEFkZHJlc3MpID09PSBHbG9iYWwuemVyb0FkZHJlc3MKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTg5CiAgICAvLyBjb25zdCBsaXZlID0gd2FsbGV0Q29udHJvbHNMaXZlKGhpbnQsIGNvbnRyb2xsZWQsIHNlbmRlcikKICAgIGIgcHJpbmNpcGFsT2ZfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjp3YWxsZXRDb250cm9sc0xpdmVAMzIKCnByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMzE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjg1CiAgICAvLyBjb25zdCBbYXV0aF0gPSBvcC5BY2N0UGFyYW1zLmFjY3RBdXRoQWRkcihhY2NvdW50KQogICAgZHVwCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdEF1dGhBZGRyCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTI5CiAgICAvLyByZXR1cm4gYXV0aEFkZHJPZihjb250cm9sbGVkKSA9PT0gd2FsbGV0QWRkcmVzcwogICAgdW5jb3ZlciAyCiAgICA9PQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxODkKICAgIC8vIGNvbnN0IGxpdmUgPSB3YWxsZXRDb250cm9sc0xpdmUoaGludCwgY29udHJvbGxlZCwgc2VuZGVyKQogICAgYiBwcmluY2lwYWxPZl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OndhbGxldENvbnRyb2xzTGl2ZUAzMgoKcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMDUKICAgIC8vIGNvbnN0IFtjcmVhdG9yLCBleGlzdHNdID0gb3AuQXBwUGFyYW1zLmFwcENyZWF0b3Iod2FsbGV0KQogICAgZnJhbWVfZGlnIC0xCiAgICBhcHBfcGFyYW1zX2dldCBBcHBDcmVhdG9yCiAgICBzd2FwCiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTA2CiAgICAvLyByZXR1cm4gZXhpc3RzICYmIGNyZWF0b3IgPT09IGFwcEFkZHJlc3NPZih3YWxsZXRGYWN0b3J5KQogICAgYnogcHJpbmNpcGFsT2ZfYm9vbF9mYWxzZUA5CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjc0CiAgICAvLyByZXR1cm4gQWNjb3VudChvcC5zaGE1MTJfMjU2KEJ5dGVzKCdhcHBJRCcpLmNvbmNhdChvcC5pdG9iKGFwcElkKSkpKQogICAgZnJhbWVfZGlnIDIKICAgIGl0b2IKICAgIGJ5dGVjIDIxIC8vICJhcHBJRCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc2hhNTEyXzI1NgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMDYKICAgIC8vIHJldHVybiBleGlzdHMgJiYgY3JlYXRvciA9PT0gYXBwQWRkcmVzc09mKHdhbGxldEZhY3RvcnkpCiAgICBmcmFtZV9kaWcgMAogICAgPT0KICAgIGJ6IHByaW5jaXBhbE9mX2Jvb2xfZmFsc2VAOQogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTUyCiAgICAvLyBpZiAoIWlzR2VudWluZVdhbGxldChoaW50LCB3YWxsZXRGYWN0b3J5KSkgewogICAgYiBwcmluY2lwYWxPZl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OmlzR2VudWluZVdhbGxldEAxMQoKcHJpbmNpcGFsT2ZfYm9vbF9mYWxzZUA5OgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTUyCiAgICAvLyBpZiAoIWlzR2VudWluZVdhbGxldChoaW50LCB3YWxsZXRGYWN0b3J5KSkgewogICAgYiBwcmluY2lwYWxPZl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OmlzR2VudWluZVdhbGxldEAxMQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjpNYXJrZXRwbGFjZS5jcmVhdGVbcm91dGluZ10oKSAtPiB2b2lkOgpjcmVhdGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyNTgKICAgIC8vIEBhYmltZXRob2QoeyBvbkNyZWF0ZTogJ3JlcXVpcmUnIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgbGVuCiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIHB1c2hpbnQgMTAKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCB0YWlsIHBvaW50ZXIgYXQgaW5kZXggMCBvZiAoKGxlbit1dGY4W10pLHVpbnQ2NCkKICAgIGRpZyAyCiAgICBzd2FwCiAgICBkaWcgMgogICAgc3Vic3RyaW5nMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMTIKICAgICsKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpFc2Nyb3dDb25maWcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNAogICAgLy8gdmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5VmVyc2lvbiB9KQogICAgYnl0ZWMgMjUgLy8gInZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyNjAKICAgIC8vIHRoaXMudmVyc2lvbi52YWx1ZSA9IHZlcnNpb24KICAgIHVuY292ZXIgNAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjYyCiAgICAvLyBjaGlsZENvbnRyYWN0VmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEJhc2VGYWN0b3J5R2xvYmFsU3RhdGVLZXlDaGlsZENvbnRyYWN0VmVyc2lvbiB9KQogICAgYnl0ZWMgOSAvLyAiY2hpbGRfY29udHJhY3RfdmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjI2MQogICAgLy8gdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSA9IGNoaWxkVmVyc2lvbgogICAgdW5jb3ZlciAzCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjYyCiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlID0gYWtpdGFEQU8KICAgIHVuY292ZXIgMgogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjXzIgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjI2MwogICAgLy8gdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSA9IGNsb25lKGFraXRhREFPRXNjcm93KQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjI1OAogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo6TWFya2V0cGxhY2UubGlzdFtyb3V0aW5nXSgpIC0+IHZvaWQ6Cmxpc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo1MDAtNTEyCiAgICAvLyBsaXN0KAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICBwcmljZTogdWludDY0LAogICAgLy8gICBwYXltZW50QXNzZXQ6IHVpbnQ2NCwgLy8gMCB8IEFzc2V0CiAgICAvLyAgIGV4cGlyYXRpb246IHVpbnQ2NCwKICAgIC8vICAgcmVzZXJ2ZWRGb3I6IEFjY291bnQsCiAgICAvLyAgIGdhdGVJRDogdWludDY0LAogICAgLy8gICBtYXJrZXRwbGFjZTogQWNjb3VudCwKICAgIC8vICAgbmFtZTogc3RyaW5nLAogICAgLy8gICBwcm9vZjogUHJvb2YsCiAgICAvLyAgIHdhbGxldDogdWludDY0CiAgICAvLyApOiB1aW50NjQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMyAvLyAyCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNCAvLyBheGZlcgogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGF4ZmVyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA1CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA2CiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA3CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgOAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAzMgogICAgKgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxieXRlc1szMl0+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA5CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo1MTMKICAgIC8vIGNvbnN0IHsgcmVmZXJyZXIgfSA9IHByaW5jaXBhbE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIHdhbGxldCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo1MTMKICAgIC8vIGNvbnN0IHsgcmVmZXJyZXIgfSA9IHByaW5jaXBhbE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIHdhbGxldCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBzd2FwCiAgICBjYWxsc3ViIHByaW5jaXBhbE9mCiAgICBleHRyYWN0IDEwNCAzMgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NTE0CiAgICAvLyByZXR1cm4gdGhpcy5saXN0SW1wbChwYXltZW50LCBhc3NldFhmZXIsIHByaWNlLCBwYXltZW50QXNzZXQsIGV4cGlyYXRpb24sIHJlc2VydmVkRm9yLCBnYXRlSUQsIG1hcmtldHBsYWNlLCBuYW1lLCBwcm9vZiwgcmVmZXJyZXIsIGZhbHNlKQogICAgaW50Y18wIC8vIDAKICAgIGNhbGxzdWIgbGlzdEltcGwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NTAwLTUxMgogICAgLy8gbGlzdCgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgcHJpY2U6IHVpbnQ2NCwKICAgIC8vICAgcGF5bWVudEFzc2V0OiB1aW50NjQsIC8vIDAgfCBBc3NldAogICAgLy8gICBleHBpcmF0aW9uOiB1aW50NjQsCiAgICAvLyAgIHJlc2VydmVkRm9yOiBBY2NvdW50LAogICAgLy8gICBnYXRlSUQ6IHVpbnQ2NCwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQsCiAgICAvLyAgIG5hbWU6IHN0cmluZywKICAgIC8vICAgcHJvb2Y6IFByb29mLAogICAgLy8gICB3YWxsZXQ6IHVpbnQ2NAogICAgLy8gKTogdWludDY0IHsKICAgIGl0b2IKICAgIGJ5dGVjXzMgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo6TWFya2V0cGxhY2UubGVnYWN5TGlzdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmxlZ2FjeUxpc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo1MjIKICAgIC8vIEBhYmltZXRob2QoeyBuYW1lOiAnbGlzdCcgfSkKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzMgLy8gMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDQgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNgogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNwogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDgKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMzIKICAgICoKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8Ynl0ZXNbMzJdPgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NTM1CiAgICAvLyByZXR1cm4gdGhpcy5saXN0SW1wbChwYXltZW50LCBhc3NldFhmZXIsIHByaWNlLCBwYXltZW50QXNzZXQsIGV4cGlyYXRpb24sIHJlc2VydmVkRm9yLCBnYXRlSUQsIG1hcmtldHBsYWNlLCBuYW1lLCBwcm9vZiwgdGhpcy5sZWdhY3lTZWxsZXJSZWZlcnJlcigpLCB0cnVlKQogICAgY2FsbHN1YiBsZWdhY3lTZWxsZXJSZWZlcnJlcgogICAgaW50Y18xIC8vIDEKICAgIGNhbGxzdWIgbGlzdEltcGwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NTIyCiAgICAvLyBAYWJpbWV0aG9kKHsgbmFtZTogJ2xpc3QnIH0pCiAgICBpdG9iCiAgICBieXRlY18zIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6Ok1hcmtldHBsYWNlLmxpc3RQcml6ZUJveFtyb3V0aW5nXSgpIC0+IHZvaWQ6Cmxpc3RQcml6ZUJveDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjUzOS01NDkKICAgIC8vIGxpc3RQcml6ZUJveCgKICAgIC8vICAgcHJpemVCb3hUcmFuc2ZlclR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgcHJpY2U6IHVpbnQ2NCwKICAgIC8vICAgcGF5bWVudEFzc2V0OiB1aW50NjQsCiAgICAvLyAgIGV4cGlyYXRpb246IHVpbnQ2NCwKICAgIC8vICAgcmVzZXJ2ZWRGb3I6IEFjY291bnQsCiAgICAvLyAgIGdhdGVJRDogdWludDY0LAogICAgLy8gICBtYXJrZXRwbGFjZTogQWNjb3VudCwKICAgIC8vICAgd2FsbGV0OiB1aW50NjQKICAgIC8vICk6IHVpbnQ2NCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18zIC8vIDIKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXBwbAogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA1CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA2CiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA3CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo1NTAKICAgIC8vIGNvbnN0IHsgcmVmZXJyZXIgfSA9IHByaW5jaXBhbE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIHdhbGxldCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo1NTAKICAgIC8vIGNvbnN0IHsgcmVmZXJyZXIgfSA9IHByaW5jaXBhbE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIHdhbGxldCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBzd2FwCiAgICBjYWxsc3ViIHByaW5jaXBhbE9mCiAgICBleHRyYWN0IDEwNCAzMgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NTUxCiAgICAvLyByZXR1cm4gdGhpcy5saXN0UHJpemVCb3hJbXBsKHByaXplQm94VHJhbnNmZXJUeG4sIHBheW1lbnQsIHByaWNlLCBwYXltZW50QXNzZXQsIGV4cGlyYXRpb24sIHJlc2VydmVkRm9yLCBnYXRlSUQsIG1hcmtldHBsYWNlLCByZWZlcnJlciwgZmFsc2UpCiAgICBpbnRjXzAgLy8gMAogICAgY2FsbHN1YiBsaXN0UHJpemVCb3hJbXBsCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo1MzktNTQ5CiAgICAvLyBsaXN0UHJpemVCb3goCiAgICAvLyAgIHByaXplQm94VHJhbnNmZXJUeG46IGd0eG4uQXBwbGljYXRpb25DYWxsVHhuLAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIHByaWNlOiB1aW50NjQsCiAgICAvLyAgIHBheW1lbnRBc3NldDogdWludDY0LAogICAgLy8gICBleHBpcmF0aW9uOiB1aW50NjQsCiAgICAvLyAgIHJlc2VydmVkRm9yOiBBY2NvdW50LAogICAgLy8gICBnYXRlSUQ6IHVpbnQ2NCwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQsCiAgICAvLyAgIHdhbGxldDogdWludDY0CiAgICAvLyApOiB1aW50NjQgewogICAgaXRvYgogICAgYnl0ZWNfMyAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjpNYXJrZXRwbGFjZS5sZWdhY3lMaXN0UHJpemVCb3hbcm91dGluZ10oKSAtPiB2b2lkOgpsZWdhY3lMaXN0UHJpemVCb3g6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo1NTUKICAgIC8vIEBhYmltZXRob2QoeyBuYW1lOiAnbGlzdFByaXplQm94JyB9KQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMyAvLyAyCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGFwcGwKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNgogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NTY2CiAgICAvLyByZXR1cm4gdGhpcy5saXN0UHJpemVCb3hJbXBsKHByaXplQm94VHJhbnNmZXJUeG4sIHBheW1lbnQsIHByaWNlLCBwYXltZW50QXNzZXQsIGV4cGlyYXRpb24sIHJlc2VydmVkRm9yLCBnYXRlSUQsIG1hcmtldHBsYWNlLCB0aGlzLmxlZ2FjeVNlbGxlclJlZmVycmVyKCksIHRydWUpCiAgICBjYWxsc3ViIGxlZ2FjeVNlbGxlclJlZmVycmVyCiAgICBpbnRjXzEgLy8gMQogICAgY2FsbHN1YiBsaXN0UHJpemVCb3hJbXBsCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo1NTUKICAgIC8vIEBhYmltZXRob2QoeyBuYW1lOiAnbGlzdFByaXplQm94JyB9KQogICAgaXRvYgogICAgYnl0ZWNfMyAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjpNYXJrZXRwbGFjZS5nYXRlZFB1cmNoYXNlW3JvdXRpbmddKCkgLT4gdm9pZDoKZ2F0ZWRQdXJjaGFzZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjU3My01NzkKICAgIC8vIGdhdGVkUHVyY2hhc2UoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgZ2F0ZVR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sCiAgICAvLyAgIGFwcElkOiBBcHBsaWNhdGlvbiwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQsCiAgICAvLyAgIHdhbGxldDogdWludDY0CiAgICAvLyApOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzMgLy8gMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGFwcGwKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjU4MAogICAgLy8gY29uc3QgYmFsYW5jZUJlZm9yZTogdWludDY0ID0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MuYmFsYW5jZQogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0QmFsYW5jZQogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo1ODEKICAgIC8vIGNvbnN0IG1pbkJlZm9yZTogdWludDY0ID0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MubWluQmFsYW5jZQogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0TWluQmFsYW5jZQogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo1ODMKICAgIC8vIHRoaXMuYXNzZXJ0SXNMaXN0aW5nKGFwcElkKQogICAgZGlnIDQKICAgIGNhbGxzdWIgYXNzZXJ0SXNMaXN0aW5nCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo1ODQKICAgIC8vIHRoaXMuYXNzZXJ0R2F0ZVBhc3NlZChnYXRlVHhuLCBhcHBJZCwgd2FsbGV0KQogICAgdW5jb3ZlciA1CiAgICBkaWcgNQogICAgdW5jb3ZlciA0CiAgICBjYWxsc3ViIGFzc2VydEdhdGVQYXNzZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjU4NQogICAgLy8gdGhpcy5hc3NlcnRCdXllclBheW1lbnQocGF5bWVudCkKICAgIGRpZyA0CiAgICBjYWxsc3ViIGFzc2VydEJ1eWVyUGF5bWVudAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NTg3CiAgICAvLyB0aGlzLnNldHRsZUFsZ28ocGF5bWVudCwgYXBwSWQsIG1hcmtldHBsYWNlLCBiYWxhbmNlQmVmb3JlLCBtaW5CZWZvcmUpCiAgICBjYWxsc3ViIHNldHRsZUFsZ28KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjU3My01NzkKICAgIC8vIGdhdGVkUHVyY2hhc2UoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgZ2F0ZVR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sCiAgICAvLyAgIGFwcElkOiBBcHBsaWNhdGlvbiwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQsCiAgICAvLyAgIHdhbGxldDogdWludDY0CiAgICAvLyApOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo6TWFya2V0cGxhY2UubGVnYWN5R2F0ZWRQdXJjaGFzZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmxlZ2FjeUdhdGVkUHVyY2hhc2U6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo1OTEKICAgIC8vIEBhYmltZXRob2QoeyBuYW1lOiAnZ2F0ZWRQdXJjaGFzZScgfSkKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzMgLy8gMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGFwcGwKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjU5OAogICAgLy8gY29uc3QgYmFsYW5jZUJlZm9yZTogdWludDY0ID0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MuYmFsYW5jZQogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0QmFsYW5jZQogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo1OTkKICAgIC8vIGNvbnN0IG1pbkJlZm9yZTogdWludDY0ID0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MubWluQmFsYW5jZQogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0TWluQmFsYW5jZQogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo2MDEKICAgIC8vIHRoaXMuYXNzZXJ0SXNMaXN0aW5nKGFwcElkKQogICAgZGlnIDMKICAgIGNhbGxzdWIgYXNzZXJ0SXNMaXN0aW5nCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo2MDIKICAgIC8vIHRoaXMuYXNzZXJ0TGVnYWN5R2F0ZVBhc3NlZChnYXRlVHhuLCBhcHBJZCkKICAgIHVuY292ZXIgNAogICAgZGlnIDQKICAgIGNhbGxzdWIgYXNzZXJ0TGVnYWN5R2F0ZVBhc3NlZAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NjAzCiAgICAvLyB0aGlzLmFzc2VydEJ1eWVyUGF5bWVudChwYXltZW50KQogICAgZGlnIDQKICAgIGNhbGxzdWIgYXNzZXJ0QnV5ZXJQYXltZW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo2MDUKICAgIC8vIHRoaXMuc2V0dGxlQWxnbyhwYXltZW50LCBhcHBJZCwgbWFya2V0cGxhY2UsIGJhbGFuY2VCZWZvcmUsIG1pbkJlZm9yZSkKICAgIGNhbGxzdWIgc2V0dGxlQWxnbwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NTkxCiAgICAvLyBAYWJpbWV0aG9kKHsgbmFtZTogJ2dhdGVkUHVyY2hhc2UnIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6Ok1hcmtldHBsYWNlLnB1cmNoYXNlW3JvdXRpbmddKCkgLT4gdm9pZDoKcHVyY2hhc2U6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo2MDgtNjEyCiAgICAvLyBwdXJjaGFzZSgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBhcHBJZDogQXBwbGljYXRpb24sCiAgICAvLyAgIG1hcmtldHBsYWNlOiBBY2NvdW50LAogICAgLy8gKTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjYxMwogICAgLy8gY29uc3QgYmFsYW5jZUJlZm9yZTogdWludDY0ID0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MuYmFsYW5jZQogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0QmFsYW5jZQogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo2MTQKICAgIC8vIGNvbnN0IG1pbkJlZm9yZTogdWludDY0ID0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MubWluQmFsYW5jZQogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0TWluQmFsYW5jZQogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo2MTYKICAgIC8vIHRoaXMuYXNzZXJ0SXNMaXN0aW5nKGFwcElkKQogICAgZGlnIDMKICAgIGNhbGxzdWIgYXNzZXJ0SXNMaXN0aW5nCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo2MTcKICAgIC8vIHRoaXMuYXNzZXJ0VW5nYXRlZChhcHBJZCkKICAgIGRpZyAzCiAgICBjYWxsc3ViIGFzc2VydFVuZ2F0ZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjYxOAogICAgLy8gdGhpcy5hc3NlcnRCdXllclBheW1lbnQocGF5bWVudCkKICAgIGRpZyA0CiAgICBjYWxsc3ViIGFzc2VydEJ1eWVyUGF5bWVudAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NjIwCiAgICAvLyB0aGlzLnNldHRsZUFsZ28ocGF5bWVudCwgYXBwSWQsIG1hcmtldHBsYWNlLCBiYWxhbmNlQmVmb3JlLCBtaW5CZWZvcmUpCiAgICBjYWxsc3ViIHNldHRsZUFsZ28KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjYwOC02MTIKICAgIC8vIHB1cmNoYXNlKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGFwcElkOiBBcHBsaWNhdGlvbiwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQsCiAgICAvLyApOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo6TWFya2V0cGxhY2UuZ2F0ZWRQdXJjaGFzZUFzYVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmdhdGVkUHVyY2hhc2VBc2E6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo2MjQtNjMwCiAgICAvLyBnYXRlZFB1cmNoYXNlQXNhKAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgZ2F0ZVR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sCiAgICAvLyAgIGFwcElkOiBBcHBsaWNhdGlvbiwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQsCiAgICAvLyAgIHdhbGxldDogdWludDY0CiAgICAvLyApOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzMgLy8gMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA0IC8vIGF4ZmVyCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXhmZXIKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA2IC8vIGFwcGwKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBhcHBsCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo2MzEKICAgIC8vIGNvbnN0IGJhbGFuY2VCZWZvcmU6IHVpbnQ2NCA9IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLmJhbGFuY2UKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdEJhbGFuY2UKICAgIGFzc2VydCAvLyBhY2NvdW50IGZ1bmRlZAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NjMyCiAgICAvLyBjb25zdCBtaW5CZWZvcmU6IHVpbnQ2NCA9IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLm1pbkJhbGFuY2UKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdE1pbkJhbGFuY2UKICAgIGFzc2VydCAvLyBhY2NvdW50IGZ1bmRlZAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NjM0CiAgICAvLyB0aGlzLmFzc2VydElzTGlzdGluZyhhcHBJZCkKICAgIGRpZyA0CiAgICBjYWxsc3ViIGFzc2VydElzTGlzdGluZwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NjM1CiAgICAvLyB0aGlzLmFzc2VydEdhdGVQYXNzZWQoZ2F0ZVR4biwgYXBwSWQsIHdhbGxldCkKICAgIHVuY292ZXIgNQogICAgZGlnIDUKICAgIHVuY292ZXIgNAogICAgY2FsbHN1YiBhc3NlcnRHYXRlUGFzc2VkCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo2MzYKICAgIC8vIHRoaXMuYXNzZXJ0QnV5ZXJBc2FQYXltZW50KGFzc2V0WGZlciwgYXBwSWQpCiAgICBkaWcgNAogICAgZGlnIDQKICAgIGNhbGxzdWIgYXNzZXJ0QnV5ZXJBc2FQYXltZW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo2MzgKICAgIC8vIHRoaXMuc2V0dGxlQXNhKGFzc2V0WGZlciwgYXBwSWQsIG1hcmtldHBsYWNlLCBiYWxhbmNlQmVmb3JlLCBtaW5CZWZvcmUpCiAgICBjYWxsc3ViIHNldHRsZUFzYQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NjI0LTYzMAogICAgLy8gZ2F0ZWRQdXJjaGFzZUFzYSgKICAgIC8vICAgYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIGdhdGVUeG46IGd0eG4uQXBwbGljYXRpb25DYWxsVHhuLAogICAgLy8gICBhcHBJZDogQXBwbGljYXRpb24sCiAgICAvLyAgIG1hcmtldHBsYWNlOiBBY2NvdW50LAogICAgLy8gICB3YWxsZXQ6IHVpbnQ2NAogICAgLy8gKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6Ok1hcmtldHBsYWNlLmxlZ2FjeUdhdGVkUHVyY2hhc2VBc2Fbcm91dGluZ10oKSAtPiB2b2lkOgpsZWdhY3lHYXRlZFB1cmNoYXNlQXNhOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NjQyCiAgICAvLyBAYWJpbWV0aG9kKHsgbmFtZTogJ2dhdGVkUHVyY2hhc2VBc2EnIH0pCiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18zIC8vIDIKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNCAvLyBheGZlcgogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGF4ZmVyCiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXBwbAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NjQ5CiAgICAvLyBjb25zdCBiYWxhbmNlQmVmb3JlOiB1aW50NjQgPSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcy5iYWxhbmNlCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RCYWxhbmNlCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjY1MAogICAgLy8gY29uc3QgbWluQmVmb3JlOiB1aW50NjQgPSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcy5taW5CYWxhbmNlCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RNaW5CYWxhbmNlCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjY1MgogICAgLy8gdGhpcy5hc3NlcnRJc0xpc3RpbmcoYXBwSWQpCiAgICBkaWcgMwogICAgY2FsbHN1YiBhc3NlcnRJc0xpc3RpbmcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjY1MwogICAgLy8gdGhpcy5hc3NlcnRMZWdhY3lHYXRlUGFzc2VkKGdhdGVUeG4sIGFwcElkKQogICAgdW5jb3ZlciA0CiAgICBkaWcgNAogICAgY2FsbHN1YiBhc3NlcnRMZWdhY3lHYXRlUGFzc2VkCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo2NTQKICAgIC8vIHRoaXMuYXNzZXJ0QnV5ZXJBc2FQYXltZW50KGFzc2V0WGZlciwgYXBwSWQpCiAgICBkaWcgNAogICAgZGlnIDQKICAgIGNhbGxzdWIgYXNzZXJ0QnV5ZXJBc2FQYXltZW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo2NTYKICAgIC8vIHRoaXMuc2V0dGxlQXNhKGFzc2V0WGZlciwgYXBwSWQsIG1hcmtldHBsYWNlLCBiYWxhbmNlQmVmb3JlLCBtaW5CZWZvcmUpCiAgICBjYWxsc3ViIHNldHRsZUFzYQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NjQyCiAgICAvLyBAYWJpbWV0aG9kKHsgbmFtZTogJ2dhdGVkUHVyY2hhc2VBc2EnIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6Ok1hcmtldHBsYWNlLnB1cmNoYXNlQXNhW3JvdXRpbmddKCkgLT4gdm9pZDoKcHVyY2hhc2VBc2E6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo2NTktNjYzCiAgICAvLyBwdXJjaGFzZUFzYSgKICAgIC8vICAgYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIGFwcElkOiBBcHBsaWNhdGlvbiwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQsCiAgICAvLyApOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA0IC8vIGF4ZmVyCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXhmZXIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjY2NAogICAgLy8gY29uc3QgYmFsYW5jZUJlZm9yZTogdWludDY0ID0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MuYmFsYW5jZQogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0QmFsYW5jZQogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo2NjUKICAgIC8vIGNvbnN0IG1pbkJlZm9yZTogdWludDY0ID0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MubWluQmFsYW5jZQogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0TWluQmFsYW5jZQogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo2NjcKICAgIC8vIHRoaXMuYXNzZXJ0SXNMaXN0aW5nKGFwcElkKQogICAgZGlnIDMKICAgIGNhbGxzdWIgYXNzZXJ0SXNMaXN0aW5nCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo2NjgKICAgIC8vIHRoaXMuYXNzZXJ0VW5nYXRlZChhcHBJZCkKICAgIGRpZyAzCiAgICBjYWxsc3ViIGFzc2VydFVuZ2F0ZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjY2OQogICAgLy8gdGhpcy5hc3NlcnRCdXllckFzYVBheW1lbnQoYXNzZXRYZmVyLCBhcHBJZCkKICAgIGRpZyA0CiAgICBkaWcgNAogICAgY2FsbHN1YiBhc3NlcnRCdXllckFzYVBheW1lbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjY3MQogICAgLy8gdGhpcy5zZXR0bGVBc2EoYXNzZXRYZmVyLCBhcHBJZCwgbWFya2V0cGxhY2UsIGJhbGFuY2VCZWZvcmUsIG1pbkJlZm9yZSkKICAgIGNhbGxzdWIgc2V0dGxlQXNhCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo2NTktNjYzCiAgICAvLyBwdXJjaGFzZUFzYSgKICAgIC8vICAgYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIGFwcElkOiBBcHBsaWNhdGlvbiwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQsCiAgICAvLyApOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo6TWFya2V0cGxhY2UuZGVsaXN0W3JvdXRpbmddKCkgLT4gdm9pZDoKZGVsaXN0OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6Njc0CiAgICAvLyBkZWxpc3QoYXBwSWQ6IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo2NzUKICAgIC8vIGNvbnN0IGJhbGFuY2VCZWZvcmU6IHVpbnQ2NCA9IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLmJhbGFuY2UKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdEJhbGFuY2UKICAgIGFzc2VydCAvLyBhY2NvdW50IGZ1bmRlZAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6Njc2CiAgICAvLyBjb25zdCBtaW5CZWZvcmU6IHVpbnQ2NCA9IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLm1pbkJhbGFuY2UKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdE1pbkJhbGFuY2UKICAgIGFzc2VydCAvLyBhY2NvdW50IGZ1bmRlZAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6Njc4CiAgICAvLyB0aGlzLmFzc2VydElzTGlzdGluZyhhcHBJZCkKICAgIGRpZyAyCiAgICBjYWxsc3ViIGFzc2VydElzTGlzdGluZwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6ODQKICAgIC8vIHJldHVybiAhb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KGFwcElkLCBCeXRlcyhMaXN0aW5nR2xvYmFsU3RhdGVLZXlSZXZpc2lvbikpWzFdCiAgICBkaWcgMgogICAgYnl0ZWMgMTEgLy8gInJldiIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBidXJ5IDEKICAgICEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Njc3CiAgICAvLyBjb25zdCBbZnVuZGVyQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYXBwSWQsIEJ5dGVzKEdsb2JhbFN0YXRlS2V5RnVuZGVyKSkKICAgIGRpZyAzCiAgICBieXRlYyAxMiAvLyAiZnVuZGVyIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NjgyCiAgICAvLyBjb25zdCB7IGFjY291bnQ6IHJlY2VpdmVyLCBhbW91bnQgfSA9IGdldEZ1bmRlcihhcHBJZCkKICAgIGR1cAogICAgZXh0cmFjdCAwIDMyCiAgICBzd2FwCiAgICBwdXNoaW50IDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTE2CiAgICAvLyByZXR1cm4gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KGFwcElkLCBCeXRlcyhMaXN0aW5nR2xvYmFsU3RhdGVLZXlGYWN0b3J5RmxvYXQpKVswXQogICAgZGlnIDUKICAgIGJ5dGVjIDEzIC8vICJmYWN0b3J5X2Zsb2F0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6Njg2LTY5MAogICAgLy8gbGlzdGluZy5jYWxsLmRlbGlzdCh7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbVHhuLnNlbmRlcl0sCiAgICAvLyAgIG9uQ29tcGxldGlvbjogT25Db21wbGV0ZUFjdGlvbi5EZWxldGVBcHBsaWNhdGlvbiwKICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo2ODgKICAgIC8vIGFyZ3M6IFtUeG4uc2VuZGVyXSwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjY4OQogICAgLy8gb25Db21wbGV0aW9uOiBPbkNvbXBsZXRlQWN0aW9uLkRlbGV0ZUFwcGxpY2F0aW9uLAogICAgcHVzaGludCA1CiAgICBpdHhuX2ZpZWxkIE9uQ29tcGxldGlvbgogICAgdW5jb3ZlciA3CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjY4Ni02OTAKICAgIC8vIGxpc3RpbmcuY2FsbC5kZWxpc3QoewogICAgLy8gICBhcHBJZCwKICAgIC8vICAgYXJnczogW1R4bi5zZW5kZXJdLAogICAgLy8gICBvbkNvbXBsZXRpb246IE9uQ29tcGxldGVBY3Rpb24uRGVsZXRlQXBwbGljYXRpb24sCiAgICAvLyB9KQogICAgcHVzaGJ5dGVzIDB4NjhlODYzNDMgLy8gbWV0aG9kICJkZWxpc3QoYWRkcmVzcyl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NjkyCiAgICAvLyB0aGlzLnJlZnVuZExpc3RpbmdGdW5kZXIobGVnYWN5LCByZWNlaXZlciwgYW1vdW50LCBmbG9hdCwgYmFsYW5jZUJlZm9yZSwgbWluQmVmb3JlLCAwKQogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMgogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDUKICAgIHVuY292ZXIgNQogICAgaW50Y18wIC8vIDAKICAgIGNhbGxzdWIgcmVmdW5kTGlzdGluZ0Z1bmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6Njc0CiAgICAvLyBkZWxpc3QoYXBwSWQ6IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6Ok1hcmtldHBsYWNlLmxpc3RDb3N0W3JvdXRpbmddKCkgLT4gdm9pZDoKbGlzdENvc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo3MDIKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmJvb2wKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjcwNAogICAgLy8gcmV0dXJuIHRoaXMubGlzdGluZ0Nvc3QocHJpemUsIHBheW1lbnRBc3NldCwgaXNQcml6ZUJveCkudG90YWwKICAgIGNhbGxzdWIgbGlzdGluZ0Nvc3QKICAgIGV4dHJhY3QgMCA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo3MDIKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYnl0ZWNfMyAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjpGYWN0b3J5Q29udHJhY3QuaW5pdEJveGVkQ29udHJhY3Rbcm91dGluZ10oKSAtPiB2b2lkOgppbml0Qm94ZWRDb250cmFjdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjExOAogICAgLy8gaW5pdEJveGVkQ29udHJhY3QodmVyc2lvbjogc3RyaW5nLCBzaXplOiB1aW50NjQpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxMjIKICAgIC8vIGNvbnN0IFtkYW9XYWxsZXRJZF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjEyMgogICAgLy8gY29uc3QgW2Rhb1dhbGxldElkXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWMgNSAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxMjQtMTI2CiAgICAvLyBkYW9XYWxsZXRJZCA9PT0gMAogICAgLy8gICA/IFR4bi5zZW5kZXIgPT09IEdsb2JhbC5jcmVhdG9yQWRkcmVzcwogICAgLy8gICA6IFR4bi5zZW5kZXIgPT09IEFwcGxpY2F0aW9uKGRhb1dhbGxldElkKS5hZGRyZXNzLAogICAgYm56IGluaXRCb3hlZENvbnRyYWN0X3Rlcm5hcnlfZmFsc2VAMwogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxMjUKICAgIC8vID8gVHhuLnNlbmRlciA9PT0gR2xvYmFsLmNyZWF0b3JBZGRyZXNzCiAgICB0eG4gU2VuZGVyCiAgICBnbG9iYWwgQ3JlYXRvckFkZHJlc3MKICAgID09Cgppbml0Qm94ZWRDb250cmFjdF90ZXJuYXJ5X21lcmdlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxMjMtMTI4CiAgICAvLyBsb2dnZWRBc3NlcnQoCiAgICAvLyAgIGRhb1dhbGxldElkID09PSAwCiAgICAvLyAgICAgPyBUeG4uc2VuZGVyID09PSBHbG9iYWwuY3JlYXRvckFkZHJlc3MKICAgIC8vICAgICA6IFR4bi5zZW5kZXIgPT09IEFwcGxpY2F0aW9uKGRhb1dhbGxldElkKS5hZGRyZXNzLAogICAgLy8gICBlcnJOb3RBa2l0YURhbwogICAgLy8gKQogICAgYm56IGluaXRCb3hlZENvbnRyYWN0X2FmdGVyX2Fzc2VydEA2CiAgICBieXRlYyA2IC8vICJFUlI6ZXJyTmRhbyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOZGFvCgppbml0Qm94ZWRDb250cmFjdF9hZnRlcl9hc3NlcnRANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjYyCiAgICAvLyBjaGlsZENvbnRyYWN0VmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEJhc2VGYWN0b3J5R2xvYmFsU3RhdGVLZXlDaGlsZENvbnRyYWN0VmVyc2lvbiB9KQogICAgYnl0ZWMgOSAvLyAiY2hpbGRfY29udHJhY3RfdmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjEyOQogICAgLy8gdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSA9IHZlcnNpb24KICAgIHVuY292ZXIgMgogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjY2CiAgICAvLyBib3hlZENvbnRyYWN0ID0gQm94PGJ5dGVzPih7IGtleTogQm94S2V5Qm94ZWRDb250cmFjdCB9KQogICAgYnl0ZWNfMSAvLyAiYmMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxMzAKICAgIC8vIGlmICghdGhpcy5ib3hlZENvbnRyYWN0LmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogaW5pdEJveGVkQ29udHJhY3RfZWxzZV9ib2R5QDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjY2CiAgICAvLyBib3hlZENvbnRyYWN0ID0gQm94PGJ5dGVzPih7IGtleTogQm94S2V5Qm94ZWRDb250cmFjdCB9KQogICAgYnl0ZWNfMSAvLyAiYmMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxMzEKICAgIC8vIHRoaXMuYm94ZWRDb250cmFjdC5jcmVhdGUoeyBzaXplIH0pCiAgICBzd2FwCiAgICBib3hfY3JlYXRlCiAgICBwb3AKCmluaXRCb3hlZENvbnRyYWN0X2FmdGVyX2lmX2Vsc2VAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjExOAogICAgLy8gaW5pdEJveGVkQ29udHJhY3QodmVyc2lvbjogc3RyaW5nLCBzaXplOiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmluaXRCb3hlZENvbnRyYWN0X2Vsc2VfYm9keUA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjYKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjEzMwogICAgLy8gdGhpcy5ib3hlZENvbnRyYWN0LnJlc2l6ZShzaXplKQogICAgc3dhcAogICAgYm94X3Jlc2l6ZQogICAgYiBpbml0Qm94ZWRDb250cmFjdF9hZnRlcl9pZl9lbHNlQDkKCmluaXRCb3hlZENvbnRyYWN0X3Rlcm5hcnlfZmFsc2VAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjEyNgogICAgLy8gOiBUeG4uc2VuZGVyID09PSBBcHBsaWNhdGlvbihkYW9XYWxsZXRJZCkuYWRkcmVzcywKICAgIHR4biBTZW5kZXIKICAgIHN3YXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBiIGluaXRCb3hlZENvbnRyYWN0X3Rlcm5hcnlfbWVyZ2VANAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjpGYWN0b3J5Q29udHJhY3QubG9hZEJveGVkQ29udHJhY3Rbcm91dGluZ10oKSAtPiB2b2lkOgpsb2FkQm94ZWRDb250cmFjdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjEzNwogICAgLy8gbG9hZEJveGVkQ29udHJhY3Qob2Zmc2V0OiB1aW50NjQsIGRhdGE6IGJ5dGVzKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxMzgKICAgIC8vIGNvbnN0IGV4cGVjdGVkUHJldmlvdXNDYWxsczogdWludDY0ID0gb2Zmc2V0IC8gMjAzMgogICAgcHVzaGludCAyMDMyCiAgICAvCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxMzkKICAgIC8vIGNvbnN0IHR4biA9IGd0eG4uVHJhbnNhY3Rpb24oVHhuLmdyb3VwSW5kZXggLSBleHBlY3RlZFByZXZpb3VzQ2FsbHMgLSAxKQogICAgdHhuIEdyb3VwSW5kZXgKICAgIHN3YXAKICAgIC0KICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjE0MQogICAgLy8gdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDYKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxNDEtMTQyCiAgICAvLyB0eG4udHlwZSA9PT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbAogICAgLy8gJiYgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQKICAgIGJ6IGxvYWRCb3hlZENvbnRyYWN0X2Jvb2xfZmFsc2VAOAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTQyCiAgICAvLyAmJiB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZAogICAgZGlnIDIKICAgIGd0eG5zIEFwcGxpY2F0aW9uSUQKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25JRAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjE0MS0xNDIKICAgIC8vIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsCiAgICAvLyAmJiB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZAogICAgYnogbG9hZEJveGVkQ29udHJhY3RfYm9vbF9mYWxzZUA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxNDMKICAgIC8vICYmIHR4bi5udW1BcHBBcmdzID09PSAzCiAgICBkaWcgMgogICAgZ3R4bnMgTnVtQXBwQXJncwogICAgcHVzaGludCAzCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTQxLTE0MwogICAgLy8gdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwKICAgIC8vICYmIHR4bi5hcHBJZCA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkCiAgICAvLyAmJiB0eG4ubnVtQXBwQXJncyA9PT0gMwogICAgYnogbG9hZEJveGVkQ29udHJhY3RfYm9vbF9mYWxzZUA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxNDQKICAgIC8vICYmIHR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcAogICAgZGlnIDIKICAgIGd0eG5zIE9uQ29tcGxldGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTQxLTE0NAogICAgLy8gdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwKICAgIC8vICYmIHR4bi5hcHBJZCA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkCiAgICAvLyAmJiB0eG4ubnVtQXBwQXJncyA9PT0gMwogICAgLy8gJiYgdHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wCiAgICBibnogbG9hZEJveGVkQ29udHJhY3RfYm9vbF9mYWxzZUA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxNDUKICAgIC8vICYmIHR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcih0aGlzLmluaXRCb3hlZENvbnRyYWN0KQogICAgZGlnIDIKICAgIGd0eG5zYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgYnl0ZWMgMTcgLy8gbWV0aG9kICJpbml0Qm94ZWRDb250cmFjdChzdHJpbmcsdWludDY0KXZvaWQiCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTQxLTE0NQogICAgLy8gdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwKICAgIC8vICYmIHR4bi5hcHBJZCA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkCiAgICAvLyAmJiB0eG4ubnVtQXBwQXJncyA9PT0gMwogICAgLy8gJiYgdHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wCiAgICAvLyAmJiB0eG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3IodGhpcy5pbml0Qm94ZWRDb250cmFjdCkKICAgIGJ6IGxvYWRCb3hlZENvbnRyYWN0X2Jvb2xfZmFsc2VAOAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTQ2CiAgICAvLyAmJiB0eG4uc2VuZGVyID09PSBUeG4uc2VuZGVyCiAgICBkaWcgMgogICAgZ3R4bnMgU2VuZGVyCiAgICB0eG4gU2VuZGVyCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTQxLTE0NgogICAgLy8gdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwKICAgIC8vICYmIHR4bi5hcHBJZCA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkCiAgICAvLyAmJiB0eG4ubnVtQXBwQXJncyA9PT0gMwogICAgLy8gJiYgdHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wCiAgICAvLyAmJiB0eG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3IodGhpcy5pbml0Qm94ZWRDb250cmFjdCkKICAgIC8vICYmIHR4bi5zZW5kZXIgPT09IFR4bi5zZW5kZXIKICAgIGJ6IGxvYWRCb3hlZENvbnRyYWN0X2Jvb2xfZmFsc2VAOAogICAgaW50Y18xIC8vIDEKCmxvYWRCb3hlZENvbnRyYWN0X2Jvb2xfbWVyZ2VAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjE0MC0xNDcKICAgIC8vIGxvZ2dlZEFzc2VydCgoCiAgICAvLyAgIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsCiAgICAvLyAgICYmIHR4bi5hcHBJZCA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkCiAgICAvLyAgICYmIHR4bi5udW1BcHBBcmdzID09PSAzCiAgICAvLyAgICYmIHR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcAogICAgLy8gICAmJiB0eG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3IodGhpcy5pbml0Qm94ZWRDb250cmFjdCkKICAgIC8vICAgJiYgdHhuLnNlbmRlciA9PT0gVHhuLnNlbmRlcgogICAgLy8gKSwgZXJySW52YWxpZENhbGxPcmRlcikKICAgIGJueiBsb2FkQm94ZWRDb250cmFjdF9hZnRlcl9hc3NlcnRAMTEKICAgIHB1c2hieXRlcyAiRVJSOmVyckljb3IiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySWNvcgoKbG9hZEJveGVkQ29udHJhY3RfYWZ0ZXJfYXNzZXJ0QDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjYKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjE0OAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYm94ZWRDb250cmFjdC5leGlzdHMsIGVyckNvbnRyYWN0Tm90U2V0KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogbG9hZEJveGVkQ29udHJhY3RfYWZ0ZXJfYXNzZXJ0QDEzCiAgICBieXRlYyA4IC8vICJFUlI6ZXJyQ25zdCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJDbnN0Cgpsb2FkQm94ZWRDb250cmFjdF9hZnRlcl9hc3NlcnRAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo2NgogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTQ5CiAgICAvLyB0aGlzLmJveGVkQ29udHJhY3QucmVwbGFjZShvZmZzZXQsIGRhdGEpCiAgICBjb3ZlciAyCiAgICBib3hfcmVwbGFjZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTM3CiAgICAvLyBsb2FkQm94ZWRDb250cmFjdChvZmZzZXQ6IHVpbnQ2NCwgZGF0YTogYnl0ZXMpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmxvYWRCb3hlZENvbnRyYWN0X2Jvb2xfZmFsc2VAODoKICAgIGludGNfMCAvLyAwCiAgICBiIGxvYWRCb3hlZENvbnRyYWN0X2Jvb2xfbWVyZ2VAOQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjpGYWN0b3J5Q29udHJhY3QuZGVsZXRlQm94ZWRDb250cmFjdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmRlbGV0ZUJveGVkQ29udHJhY3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxNTMKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWMgNSAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTUzCiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIGVyck5vdEFraXRhRGFvKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGJueiBkZWxldGVCb3hlZENvbnRyYWN0X2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA2IC8vICJFUlI6ZXJyTmRhbyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOZGFvCgpkZWxldGVCb3hlZENvbnRyYWN0X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjYKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjE1NAogICAgLy8gdGhpcy5ib3hlZENvbnRyYWN0LmRlbGV0ZSgpCiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjE1MgogICAgLy8gZGVsZXRlQm94ZWRDb250cmFjdCgpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6QWtpdGFGZWVHZW5lcmF0b3JDb250cmFjdFdpdGhPcHRJbi5vcHRJbltyb3V0aW5nXSgpIC0+IHZvaWQ6Cm9wdEluOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTg3CiAgICAvLyBvcHRJbihwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGFzc2V0OiBBc3NldCk6IHZvaWQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXBuIDIKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE4OQogICAgLy8gY29uc3QgZXNjcm93ID0gY2xvbmUodGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlY18yIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxODkKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGNsb25lKHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBjb3ZlciA1CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTAKICAgIC8vIGNvbnN0IGNvdW50ID0gc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIGVzY3Jvdy5hcHAuYWRkcmVzcywgYXNzZXQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTkwCiAgICAvLyBjb25zdCBjb3VudCA9IHNwbGl0T3B0SW5Db3VudCh0aGlzLmFraXRhREFPLnZhbHVlLCBlc2Nyb3cuYXBwLmFkZHJlc3MsIGFzc2V0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGJ1cnkgMQogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18zIC8vIDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjg5MQogICAgLy8gcmV0dXJuIGVzY3Jvdy5pc09wdGVkSW4oYXNzZXQpID8gMCA6IDEKICAgIHN3YXAKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBjb3ZlciAzCiAgICBwb3AKICAgICEKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE5MgogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBlcnJJbnZhbGlkUGF5bWVudFJlY2VpdmVyKQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IG9wdEluX2FmdGVyX2Fzc2VydEAzCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJJcG1yIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwbXIKCm9wdEluX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTkzCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSAqICgxICsgY291bnQpLCBlcnJJbnZhbGlkUGF5bWVudEFtb3VudCkKICAgIHVuY292ZXIgMgogICAgZ3R4bnMgQW1vdW50CiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGludGNfMSAvLyAxCiAgICB1bmNvdmVyIDMKICAgICsKICAgICoKICAgID09CiAgICBibnogb3B0SW5fYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOmVycklwbWEiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBtYQoKb3B0SW5fYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTUtMjAxCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogMCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTk3CiAgICAvLyBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBkaWcgMwogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE5OAogICAgLy8gYXNzZXRBbW91bnQ6IDAsCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTUtMjAwCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogMCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyAgIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTk1LTIwMQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IDAsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMDgKICAgIC8vIGlmIChjb3VudCA+IDAgJiYgZXNjcm93Lm5hbWUgIT09ICcnKSB7CiAgICBibnogb3B0SW5fYWZ0ZXJfaWZfZWxzZUA5CiAgICBkdXBuIDIKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgZGlnIDEKICAgIGxlbgogICAgc3Vic3RyaW5nMwogICAgZXh0cmFjdCAyIDAKICAgIHB1c2hieXRlcyAiIgogICAgIT0KICAgIGJ6IG9wdEluX2FmdGVyX2lmX2Vsc2VAOQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjA5CiAgICAvLyB0aGlzLm9wdEFraXRhRXNjcm93SW5BbmRTZW5kKGFzc2V0LCAwKQogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBjYWxsc3ViIG9wdEFraXRhRXNjcm93SW5BbmRTZW5kCiAgICBwb3AKCm9wdEluX2FmdGVyX2lmX2Vsc2VAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE4NwogICAgLy8gb3B0SW4ocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBhc3NldDogQXNzZXQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6QWtpdGFGZWVHZW5lcmF0b3JDb250cmFjdFdpdGhPcHRJbi5vcHRJbkNvc3Rbcm91dGluZ10oKSAtPiB2b2lkOgpvcHRJbkNvc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMTMKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjE1CiAgICAvLyBjb25zdCBjb3VudCA9IHNwbGl0T3B0SW5Db3VudCh0aGlzLmFraXRhREFPLnZhbHVlLCB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLCBhc3NldCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMTUKICAgIC8vIGNvbnN0IGNvdW50ID0gc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsIGFzc2V0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGJ1cnkgMQogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjXzIgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjIxNQogICAgLy8gY29uc3QgY291bnQgPSBzcGxpdE9wdEluQ291bnQodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywgYXNzZXQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18zIC8vIDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjg5MQogICAgLy8gcmV0dXJuIGVzY3Jvdy5pc09wdGVkSW4oYXNzZXQpID8gMCA6IDEKICAgIHN3YXAKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICAhCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMTYKICAgIC8vIHJldHVybiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiAoMSArIGNvdW50KQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBpbnRjXzEgLy8gMQogICAgdW5jb3ZlciAyCiAgICArCiAgICAqCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMTMKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgaXRvYgogICAgYnl0ZWNfMyAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpBa2l0YUJhc2VGZWVHZW5lcmF0b3JDb250cmFjdFdpdGhvdXRBa2l0YU9wdEluLnVwZGF0ZUFraXRhREFPRXNjcm93W3JvdXRpbmddKCkgLT4gdm9pZDoKdXBkYXRlQWtpdGFEQU9Fc2Nyb3c6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo1MAogICAgLy8gdXBkYXRlQWtpdGFEQU9Fc2Nyb3coY29uZmlnOiBFc2Nyb3dDb25maWcpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cG4gMgogICAgbGVuCiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIHB1c2hpbnQgMTAKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCB0YWlsIHBvaW50ZXIgYXQgaW5kZXggMCBvZiAoKGxlbit1dGY4W10pLHVpbnQ2NCkKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgZGlnIDIKICAgIHN1YnN0cmluZzMKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDEyCiAgICArCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6RXNjcm93Q29uZmlnCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo1MQogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyA1IC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo1MQogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogdXBkYXRlQWtpdGFEQU9Fc2Nyb3dfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDYgLy8gIkVSUjplcnJOZGFvIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5kYW8KCnVwZGF0ZUFraXRhREFPRXNjcm93X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWNfMiAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTIKICAgIC8vIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgPSBjbG9uZShjb25maWcpCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTAKICAgIC8vIHVwZGF0ZUFraXRhREFPRXNjcm93KGNvbmZpZzogRXNjcm93Q29uZmlnKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjpVcGdyYWRlYWJsZUFraXRhQmFzZUNvbnRyYWN0LnVwZGF0ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozNQogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM3CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIGVyck5vdEFraXRhRGFvKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjIDUgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozNwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogdXBkYXRlX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA2IC8vICJFUlI6ZXJyTmRhbyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOZGFvCgp1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzgKICAgIC8vIGNvbnN0IFtwbHVnaW5zXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzUGx1Z2luQXBwTGlzdCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM4CiAgICAvLyBjb25zdCBbcGx1Z2luc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1BsdWdpbkFwcExpc3QpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjIDI2IC8vICJwYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzkKICAgIC8vIGNvbnN0IHVwZGF0ZVBsdWdpbiA9IGRlY29kZUFyYzQ8UGx1Z2luQXBwTGlzdD4ocGx1Z2lucykudXBkYXRlCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjQwCiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uSWQgPT09IHVwZGF0ZVBsdWdpbiwgZXJySW52YWxpZFVwZ3JhZGUpCiAgICBnbG9iYWwgQ2FsbGVyQXBwbGljYXRpb25JRAogICAgPT0KICAgIGJueiB1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOmVyckl1cGciCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXVwZwoKdXBkYXRlX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE0CiAgICAvLyB2ZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogR2xvYmFsU3RhdGVLZXlWZXJzaW9uIH0pCiAgICBieXRlYyAyNSAvLyAidmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czo0MQogICAgLy8gdGhpcy52ZXJzaW9uLnZhbHVlID0gbmV3VmVyc2lvbgogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozNQogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjpBa2l0YUJhc2VDb250cmFjdC51cGRhdGVBa2l0YURBT1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZUFraXRhREFPOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjI1CiAgICAvLyB1cGRhdGVBa2l0YURBTyhha2l0YURBTzogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNgogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyA1IC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MjYKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IHVwZGF0ZUFraXRhREFPX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA2IC8vICJFUlI6ZXJyTmRhbyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOZGFvCgp1cGRhdGVBa2l0YURBT19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNwogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSA9IGFraXRhREFPCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjI1CiAgICAvLyB1cGRhdGVBa2l0YURBTyhha2l0YURBTzogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo6TWFya2V0cGxhY2UubGlzdGluZ0Nvc3QocHJpemU6IHVpbnQ2NCwgcGF5bWVudEFzc2V0OiB1aW50NjQsIGlzUHJpemVCb3g6IHVpbnQ2NCkgLT4gYnl0ZXM6Cmxpc3RpbmdDb3N0OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzgKICAgIC8vIHByaXZhdGUgbGlzdGluZ0Nvc3QocHJpemU6IHVpbnQ2NCwgcGF5bWVudEFzc2V0OiB1aW50NjQsIGlzUHJpemVCb3g6IGJvb2xlYW4pOiBMaXN0aW5nQ29zdEluZm8gewogICAgcHJvdG8gMyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0MgogICAgLy8gbGV0IG9wdGluOiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDQKICAgIC8vIGlmIChpc1ByaXplQm94KSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ6IGxpc3RpbmdDb3N0X2Vsc2VfYm9keUA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0OAogICAgLy8gaWYgKGlzQWxnb1BheW1lbnQpIHsKICAgIGZyYW1lX2RpZyAtMgogICAgYm56IGxpc3RpbmdDb3N0X2Vsc2VfYm9keUAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjczMgogICAgLy8gcmV0dXJuIChNaW5EaXNidXJzZW1lbnRzTUJSICsgVXNlckFsbG9jYXRpb25NQlIpICogY291bnQKICAgIGludGMgNCAvLyA3OTgwMAoKbGlzdGluZ0Nvc3RfYWZ0ZXJfaWZfZWxzZUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NjgtNzAKICAgIC8vIGNvbnN0IGVzY3Jvd09wdEluOiB1aW50NjQgPSBpc0FsZ29QYXltZW50CiAgICAvLyAgID8gMAogICAgLy8gICA6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSAqIHNwbGl0T3B0SW5Db3VudCh0aGlzLmFraXRhREFPLnZhbHVlLCB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLCBBc3NldChwYXltZW50QXNzZXQpKQogICAgZnJhbWVfZGlnIC0yCiAgICBibnogbGlzdGluZ0Nvc3RfdGVybmFyeV9mYWxzZUAxMQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NjkKICAgIC8vID8gMAogICAgaW50Y18wIC8vIDAKCmxpc3RpbmdDb3N0X3Rlcm5hcnlfbWVyZ2VAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo3MwogICAgLy8gcHJvZ3JhbVBhZ2VzTWJyKHRoaXMuY2hpbGRFeHRyYVBhZ2VzQXRMZWFzdChsaXN0aW5nLmNsZWFyU3RhdGVQcm9ncmFtLmxlbmd0aCwgbGlzdGluZy5leHRyYVByb2dyYW1QYWdlcykpICsKICAgIHB1c2hpbnQgNAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzkKICAgIC8vIGNvbnN0IGxpc3RpbmcgPSBjb21waWxlQXJjNChMaXN0aW5nKQogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjczCiAgICAvLyBwcm9ncmFtUGFnZXNNYnIodGhpcy5jaGlsZEV4dHJhUGFnZXNBdExlYXN0KGxpc3RpbmcuY2xlYXJTdGF0ZVByb2dyYW0ubGVuZ3RoLCBsaXN0aW5nLmV4dHJhUHJvZ3JhbVBhZ2VzKSkgKwogICAgY2FsbHN1YiBjaGlsZEV4dHJhUGFnZXNBdExlYXN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJvZ3JhbXMudHM6NDkKICAgIC8vIHJldHVybiBNSU5fUFJPR1JBTV9QQUdFUyAqICgxICsgZXh0cmFQYWdlcykKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBwdXNoaW50IDEwMDAwMAogICAgKgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NzMtNzUKICAgIC8vIHByb2dyYW1QYWdlc01icih0aGlzLmNoaWxkRXh0cmFQYWdlc0F0TGVhc3QobGlzdGluZy5jbGVhclN0YXRlUHJvZ3JhbS5sZW5ndGgsIGxpc3RpbmcuZXh0cmFQcm9ncmFtUGFnZXMpKSArCiAgICAvLyAoR0xPQkFMX1NUQVRFX0tFWV9VSU5UX0NPU1QgKiBsaXN0aW5nLmdsb2JhbFVpbnRzKSArCiAgICAvLyAoR0xPQkFMX1NUQVRFX0tFWV9CWVRFU19DT1NUICogbGlzdGluZy5nbG9iYWxCeXRlcykKICAgIHB1c2hpbnQgNzIwNTAwCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo3NwogICAgLy8gY29uc3QgdG90YWw6IHVpbnQ2NCA9IGNyZWF0ZU1iciArIEdsb2JhbC5taW5CYWxhbmNlICsgb3B0aW4gKyBkaXNidXJzZW1lbnQgKyBlc2Nyb3dPcHRJbgogICAgZHVwCiAgICBnbG9iYWwgTWluQmFsYW5jZQogICAgKwogICAgZnJhbWVfZGlnIDAKICAgIGR1cAogICAgY292ZXIgMgogICAgKwogICAgdW5jb3ZlciA0CiAgICBkdXAKICAgIGNvdmVyIDIKICAgICsKICAgIHVuY292ZXIgNAogICAgZHVwCiAgICBjb3ZlciAyCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo3OQogICAgLy8gcmV0dXJuIHsgdG90YWwsIGVzY3Jvd09wdEluLCBkaXNidXJzZW1lbnQsIG9wdGluLCBjcmVhdGVNYnIgfQogICAgaXRvYgogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICBzd2FwCiAgICByZXRzdWIKCmxpc3RpbmdDb3N0X3Rlcm5hcnlfZmFsc2VAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo3MAogICAgLy8gOiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiBzcGxpdE9wdEluQ291bnQodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywgQXNzZXQocGF5bWVudEFzc2V0KSkKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjcwCiAgICAvLyA6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSAqIHNwbGl0T3B0SW5Db3VudCh0aGlzLmFraXRhREFPLnZhbHVlLCB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLCBBc3NldChwYXltZW50QXNzZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGJ1cnkgMQogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjXzIgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjcwCiAgICAvLyA6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSAqIHNwbGl0T3B0SW5Db3VudCh0aGlzLmFraXRhREFPLnZhbHVlLCB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLCBBc3NldChwYXltZW50QXNzZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMyAvLyAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo4OTEKICAgIC8vIHJldHVybiBlc2Nyb3cuaXNPcHRlZEluKGFzc2V0KSA/IDAgOiAxCiAgICBmcmFtZV9kaWcgLTIKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICAhCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo3MAogICAgLy8gOiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiBzcGxpdE9wdEluQ291bnQodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywgQXNzZXQocGF5bWVudEFzc2V0KSkKICAgICoKICAgIGIgbGlzdGluZ0Nvc3RfdGVybmFyeV9tZXJnZUAxMgoKbGlzdGluZ0Nvc3RfZWxzZV9ib2R5QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo1MQogICAgLy8gb3B0aW4gPSBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgZnJhbWVfYnVyeSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo1MgogICAgLy8gZGlzYnVyc2VtZW50ID0gZGlzYnVyc2VtZW50Q29zdCg0KSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgcGF5bWVudEFzc2V0KQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjUyCiAgICAvLyBkaXNidXJzZW1lbnQgPSBkaXNidXJzZW1lbnRDb3N0KDQpICsgcmV3YXJkc09wdEluQ29zdCh0aGlzLmFraXRhREFPLnZhbHVlLCBwYXltZW50QXNzZXQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZnJhbWVfZGlnIC0yCiAgICBjYWxsc3ViIHJld2FyZHNPcHRJbkNvc3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzMyCiAgICAvLyByZXR1cm4gKE1pbkRpc2J1cnNlbWVudHNNQlIgKyBVc2VyQWxsb2NhdGlvbk1CUikgKiBjb3VudAogICAgcHVzaGludCAzMTkyMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjUyCiAgICAvLyBkaXNidXJzZW1lbnQgPSBkaXNidXJzZW1lbnRDb3N0KDQpICsgcmV3YXJkc09wdEluQ29zdCh0aGlzLmFraXRhREFPLnZhbHVlLCBwYXltZW50QXNzZXQpCiAgICArCiAgICBiIGxpc3RpbmdDb3N0X2FmdGVyX2lmX2Vsc2VAOQoKbGlzdGluZ0Nvc3RfZWxzZV9ib2R5QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo1NwogICAgLy8gZGlzYnVyc2VtZW50ID0gZGlzYnVyc2VtZW50Q29zdCgxKSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgcHJpemUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NTcKICAgIC8vIGRpc2J1cnNlbWVudCA9IGRpc2J1cnNlbWVudENvc3QoMSkgKyByZXdhcmRzT3B0SW5Db3N0KHRoaXMuYWtpdGFEQU8udmFsdWUsIHByaXplKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGZyYW1lX2RpZyAtMwogICAgY2FsbHN1YiByZXdhcmRzT3B0SW5Db3N0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjczMgogICAgLy8gcmV0dXJuIChNaW5EaXNidXJzZW1lbnRzTUJSICsgVXNlckFsbG9jYXRpb25NQlIpICogY291bnQKICAgIGludGMgNCAvLyA3OTgwMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NTcKICAgIC8vIGRpc2J1cnNlbWVudCA9IGRpc2J1cnNlbWVudENvc3QoMSkgKyByZXdhcmRzT3B0SW5Db3N0KHRoaXMuYWtpdGFEQU8udmFsdWUsIHByaXplKQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NTgKICAgIC8vIGlmIChpc0FsZ29QYXltZW50KSB7CiAgICBmcmFtZV9kaWcgLTIKICAgIGJueiBsaXN0aW5nQ29zdF9lbHNlX2JvZHlANwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NTkKICAgIC8vIG9wdGluID0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3MzIKICAgIC8vIHJldHVybiAoTWluRGlzYnVyc2VtZW50c01CUiArIFVzZXJBbGxvY2F0aW9uTUJSKSAqIGNvdW50CiAgICBpbnRjIDQgLy8gNzk4MDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjYwCiAgICAvLyBkaXNidXJzZW1lbnQgKz0gZGlzYnVyc2VtZW50Q29zdCgxKQogICAgKwogICAgYiBsaXN0aW5nQ29zdF9hZnRlcl9pZl9lbHNlQDkKCmxpc3RpbmdDb3N0X2Vsc2VfYm9keUA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NjIKICAgIC8vIG9wdGluID0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogMgogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBpbnRjXzMgLy8gMgogICAgKgogICAgZnJhbWVfYnVyeSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo2MwogICAgLy8gZGlzYnVyc2VtZW50ICs9IGRpc2J1cnNlbWVudENvc3QoNSkgKyByZXdhcmRzT3B0SW5Db3N0KHRoaXMuYWtpdGFEQU8udmFsdWUsIHBheW1lbnRBc3NldCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo2MwogICAgLy8gZGlzYnVyc2VtZW50ICs9IGRpc2J1cnNlbWVudENvc3QoNSkgKyByZXdhcmRzT3B0SW5Db3N0KHRoaXMuYWtpdGFEQU8udmFsdWUsIHBheW1lbnRBc3NldCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBmcmFtZV9kaWcgLTIKICAgIGNhbGxzdWIgcmV3YXJkc09wdEluQ29zdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3MzIKICAgIC8vIHJldHVybiAoTWluRGlzYnVyc2VtZW50c01CUiArIFVzZXJBbGxvY2F0aW9uTUJSKSAqIGNvdW50CiAgICBwdXNoaW50IDM5OTAwMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NjMKICAgIC8vIGRpc2J1cnNlbWVudCArPSBkaXNidXJzZW1lbnRDb3N0KDUpICsgcmV3YXJkc09wdEluQ29zdCh0aGlzLmFraXRhREFPLnZhbHVlLCBwYXltZW50QXNzZXQpCiAgICArCiAgICArCiAgICBiIGxpc3RpbmdDb3N0X2FmdGVyX2lmX2Vsc2VAOQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjpNYXJrZXRwbGFjZS5yZWZ1bmRMaXN0aW5nRnVuZGVyKGxlZ2FjeTogdWludDY0LCByZWNlaXZlcjogYnl0ZXMsIGFtb3VudDogdWludDY0LCBmbG9hdDogdWludDY0LCBiYWxhbmNlQmVmb3JlOiB1aW50NjQsIG1pbkJlZm9yZTogdWludDY0LCBmb3J3YXJkZWQ6IHVpbnQ2NCkgLT4gdm9pZDoKcmVmdW5kTGlzdGluZ0Z1bmRlcjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjk0LTEwMgogICAgLy8gcHJpdmF0ZSByZWZ1bmRMaXN0aW5nRnVuZGVyKAogICAgLy8gICBsZWdhY3k6IGJvb2xlYW4sCiAgICAvLyAgIHJlY2VpdmVyOiBBY2NvdW50LAogICAgLy8gICBhbW91bnQ6IHVpbnQ2NCwKICAgIC8vICAgZmxvYXQ6IHVpbnQ2NCwKICAgIC8vICAgYmFsYW5jZUJlZm9yZTogdWludDY0LAogICAgLy8gICBtaW5CZWZvcmU6IHVpbnQ2NCwKICAgIC8vICAgZm9yd2FyZGVkOiB1aW50NjQKICAgIC8vICk6IHZvaWQgewogICAgcHJvdG8gNyAwCiAgICBwdXNoYnl0ZXMgIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjEwMwogICAgLy8gaWYgKGxlZ2FjeSkgewogICAgZnJhbWVfZGlnIC03CiAgICBieiByZWZ1bmRMaXN0aW5nRnVuZGVyX2Vsc2VfYm9keUAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxMDQKICAgIC8vIGl0eG4ucGF5bWVudCh7IHJlY2VpdmVyLCBhbW91bnQgfSkuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIGZyYW1lX2RpZyAtNQogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGZyYW1lX2RpZyAtNgogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKCnJlZnVuZExpc3RpbmdGdW5kZXJfYWZ0ZXJfaWZfZWxzZUAxMDoKICAgIHJldHN1YgoKcmVmdW5kTGlzdGluZ0Z1bmRlcl9lbHNlX2JvZHlAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjEwNgogICAgLy8gY29uc3QgZ3Jvc3MgPSByZWxlYXNlZFJlZnVuZChhbW91bnQgKyBmbG9hdCwgYmFsYW5jZUJlZm9yZSwgbWluQmVmb3JlLCBmb3J3YXJkZWQpCiAgICBmcmFtZV9kaWcgLTUKICAgIGZyYW1lX2RpZyAtNAogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NDgKICAgIC8vIGNvbnN0IHNlbGYgPSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NDkKICAgIC8vIGNvbnN0IGdyb3NzOiB1aW50NjQgPSBzZWxmLmJhbGFuY2UgKyBmb3J3YXJkZWQKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0QmFsYW5jZQogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICBmcmFtZV9kaWcgLTEKICAgICsKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTAKICAgIC8vIGNvbnN0IHJlY2VpdmVkOiB1aW50NjQgPSBncm9zcyA+IGJhbGFuY2VCZWZvcmUgPyBncm9zcyAtIGJhbGFuY2VCZWZvcmUgOiAwCiAgICBmcmFtZV9kaWcgLTMKICAgID4KICAgIGJ6IHJlZnVuZExpc3RpbmdGdW5kZXJfdGVybmFyeV9mYWxzZUAxMwogICAgZnJhbWVfZGlnIC0zCiAgICAtCgpyZWZ1bmRMaXN0aW5nRnVuZGVyX3Rlcm5hcnlfbWVyZ2VAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1MQogICAgLy8gY29uc3QgbWluQWZ0ZXI6IHVpbnQ2NCA9IHNlbGYubWluQmFsYW5jZQogICAgc3dhcAogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RNaW5CYWxhbmNlCiAgICBzd2FwCiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1MgogICAgLy8gY29uc3QgcmVsZWFzZWQ6IHVpbnQ2NCA9IG1pbkJlZm9yZSA+IG1pbkFmdGVyID8gbWluQmVmb3JlIC0gbWluQWZ0ZXIgOiAwCiAgICBmcmFtZV9kaWcgLTIKICAgIDwKICAgIGJ6IHJlZnVuZExpc3RpbmdGdW5kZXJfdGVybmFyeV9mYWxzZUAxNgogICAgZnJhbWVfZGlnIC0yCiAgICBzd2FwCiAgICAtCgpyZWZ1bmRMaXN0aW5nRnVuZGVyX3Rlcm5hcnlfbWVyZ2VAMTc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1MwogICAgLy8gY29uc3QgcmVmdW5kOiB1aW50NjQgPSByZWNlaXZlZCArIHJlbGVhc2VkCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1NAogICAgLy8gcmV0dXJuIHJlZnVuZCA+IHJlY29yZGVkID8gcmVjb3JkZWQgOiByZWZ1bmQKICAgIGR1cAogICAgZGlnIDIKICAgID4KICAgIHN3YXAKICAgIGNvdmVyIDIKICAgIHNlbGVjdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxMDcKICAgIC8vIGNvbnN0IHJlZnVuZDogdWludDY0ID0gZ3Jvc3MgPiBmbG9hdCA/IGdyb3NzIC0gZmxvYXQgOiAwCiAgICBmcmFtZV9kaWcgLTQKICAgID4KICAgIGJ6IHJlZnVuZExpc3RpbmdGdW5kZXJfdGVybmFyeV9mYWxzZUA1CiAgICBmcmFtZV9kaWcgLTQKICAgIC0KICAgIGZyYW1lX2J1cnkgMAoKcmVmdW5kTGlzdGluZ0Z1bmRlcl90ZXJuYXJ5X21lcmdlQDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxMDgKICAgIC8vIGlmIChyZWZ1bmQgPiAwKSB7CiAgICBmcmFtZV9kaWcgMAogICAgYnogcmVmdW5kTGlzdGluZ0Z1bmRlcl9hZnRlcl9pZl9lbHNlQDEwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxMDkKICAgIC8vIGl0eG4ucGF5bWVudCh7IHJlY2VpdmVyLCBhbW91bnQ6IHJlZnVuZCB9KS5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgZnJhbWVfZGlnIDAKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBmcmFtZV9kaWcgLTYKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICByZXRzdWIKCnJlZnVuZExpc3RpbmdGdW5kZXJfdGVybmFyeV9mYWxzZUA1OgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxMDcKICAgIC8vIGNvbnN0IHJlZnVuZDogdWludDY0ID0gZ3Jvc3MgPiBmbG9hdCA/IGdyb3NzIC0gZmxvYXQgOiAwCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfYnVyeSAwCiAgICBiIHJlZnVuZExpc3RpbmdGdW5kZXJfdGVybmFyeV9tZXJnZUA2CgpyZWZ1bmRMaXN0aW5nRnVuZGVyX3Rlcm5hcnlfZmFsc2VAMTY6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjUyCiAgICAvLyBjb25zdCByZWxlYXNlZDogdWludDY0ID0gbWluQmVmb3JlID4gbWluQWZ0ZXIgPyBtaW5CZWZvcmUgLSBtaW5BZnRlciA6IDAKICAgIGludGNfMCAvLyAwCiAgICBiIHJlZnVuZExpc3RpbmdGdW5kZXJfdGVybmFyeV9tZXJnZUAxNwoKcmVmdW5kTGlzdGluZ0Z1bmRlcl90ZXJuYXJ5X2ZhbHNlQDEzOgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1MAogICAgLy8gY29uc3QgcmVjZWl2ZWQ6IHVpbnQ2NCA9IGdyb3NzID4gYmFsYW5jZUJlZm9yZSA/IGdyb3NzIC0gYmFsYW5jZUJlZm9yZSA6IDAKICAgIGludGNfMCAvLyAwCiAgICBiIHJlZnVuZExpc3RpbmdGdW5kZXJfdGVybmFyeV9tZXJnZUAxNAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjpNYXJrZXRwbGFjZS5hc3NlcnRJc0xpc3RpbmcoYXBwSWQ6IHVpbnQ2NCkgLT4gdm9pZDoKYXNzZXJ0SXNMaXN0aW5nOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTE5CiAgICAvLyBwcml2YXRlIGFzc2VydElzTGlzdGluZyhhcHBJZDogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIHByb3RvIDEgMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTIwCiAgICAvLyBsb2dnZWRBc3NlcnQoYXBwSWQuY3JlYXRvciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyck5vdEFMaXN0aW5nKQogICAgZnJhbWVfZGlnIC0xCiAgICBhcHBfcGFyYW1zX2dldCBBcHBDcmVhdG9yCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBhc3NlcnRJc0xpc3RpbmdfYWZ0ZXJfYXNzZXJ0QDIKICAgIHB1c2hieXRlcyAiRVJSOmVyck5hbHMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmFscwoKYXNzZXJ0SXNMaXN0aW5nX2FmdGVyX2Fzc2VydEAyOgogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6Ok1hcmtldHBsYWNlLmFzc2VydFVuZ2F0ZWQoYXBwSWQ6IHVpbnQ2NCkgLT4gdm9pZDoKYXNzZXJ0VW5nYXRlZDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjEyMwogICAgLy8gcHJpdmF0ZSBhc3NlcnRVbmdhdGVkKGFwcElkOiBBcHBsaWNhdGlvbik6IHZvaWQgewogICAgcHJvdG8gMSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxMjQKICAgIC8vIGNvbnN0IGdhdGVJRCA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NChhcHBJZCwgQnl0ZXMoTGlzdGluZ0dsb2JhbFN0YXRlS2V5R2F0ZUlEKSlbMF0KICAgIGZyYW1lX2RpZyAtMQogICAgYnl0ZWMgMTQgLy8gImdhdGVfaWQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxMjUKICAgIC8vIGxvZ2dlZEFzc2VydChnYXRlSUQgPT09IDAsIGVyckhhc0dhdGUpCiAgICBieiBhc3NlcnRVbmdhdGVkX2FmdGVyX2Fzc2VydEAyCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJIZ3RlIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckhndGUKCmFzc2VydFVuZ2F0ZWRfYWZ0ZXJfYXNzZXJ0QDI6CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo6TWFya2V0cGxhY2UuYXNzZXJ0R2F0ZVBhc3NlZChnYXRlVHhuOiB1aW50NjQsIGFwcElkOiB1aW50NjQsIHdhbGxldDogdWludDY0KSAtPiB2b2lkOgphc3NlcnRHYXRlUGFzc2VkOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTMyCiAgICAvLyBwcml2YXRlIGFzc2VydEdhdGVQYXNzZWQoZ2F0ZVR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sIGFwcElkOiBBcHBsaWNhdGlvbiwgd2FsbGV0OiB1aW50NjQpOiB2b2lkIHsKICAgIHByb3RvIDMgMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTMzCiAgICAvLyBjb25zdCBwID0gcHJpbmNpcGFsT2YodGhpcy5ha2l0YURBTy52YWx1ZSwgd2FsbGV0KQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjEzMwogICAgLy8gY29uc3QgcCA9IHByaW5jaXBhbE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIHdhbGxldCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBmcmFtZV9kaWcgLTEKICAgIGNhbGxzdWIgcHJpbmNpcGFsT2YKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjEzNAogICAgLy8gY29uc3QgZ2F0ZUlEID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KGFwcElkLCBCeXRlcyhMaXN0aW5nR2xvYmFsU3RhdGVLZXlHYXRlSUQpKVswXQogICAgZnJhbWVfZGlnIC0yCiAgICBieXRlYyAxNCAvLyAiZ2F0ZV9pZCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjEzNQogICAgLy8gbG9nZ2VkQXNzZXJ0KGdhdGVDaGVja0N0eChnYXRlVHhuLCB0aGlzLmFraXRhREFPLnZhbHVlLCBnYXRlQ3R4KHApLCBnYXRlSUQpLCBlcnJGYWlsZWRHYXRlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjEzNQogICAgLy8gbG9nZ2VkQXNzZXJ0KGdhdGVDaGVja0N0eChnYXRlVHhuLCB0aGlzLmFraXRhREFPLnZhbHVlLCBnYXRlQ3R4KHApLCBnYXRlSUQpLCBlcnJGYWlsZWRHYXRlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MzA0CiAgICAvLyByZXR1cm4geyBwcmluY2lwYWw6IHAucHJpbmNpcGFsLCB3YWxsZXQ6IHAud2FsbGV0LCBzcGVuZGVyOiBwLnNwZW5kZXIgfQogICAgZGlnIDEKICAgIGV4dHJhY3QgOCAzMgogICAgZGlnIDIKICAgIGV4dHJhY3QgMCA4CiAgICB1bmNvdmVyIDMKICAgIGV4dHJhY3QgNzIgMzIKICAgIGNvdmVyIDIKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk2NQogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgZnJhbWVfZGlnIC0zCiAgICBndHhucyBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIwNgogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgc3dhcAogICAgYnl0ZWMgNCAvLyAiYWFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5NjUKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIHB1c2hpbnQgNDAKICAgIGV4dHJhY3RfdWludDY0CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5NjUtOTY2CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICBieiBhc3NlcnRHYXRlUGFzc2VkX2Jvb2xfZmFsc2VAMTIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTY2CiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICBmcmFtZV9kaWcgLTMKICAgIGd0eG5zIE9uQ29tcGxldGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5NjUtOTY2CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICBibnogYXNzZXJ0R2F0ZVBhc3NlZF9ib29sX2ZhbHNlQDEyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk2NwogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICBmcmFtZV9kaWcgLTMKICAgIGd0eG5zIE51bUFwcEFyZ3MKICAgIHB1c2hpbnQgNAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTY1LTk2NwogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICBieiBhc3NlcnRHYXRlUGFzc2VkX2Jvb2xfZmFsc2VAMTIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTY4CiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKEdhdGVNdXN0Q2hlY2tGb3JBYmlNZXRob2QpICYmCiAgICBmcmFtZV9kaWcgLTMKICAgIGd0eG5zYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgcHVzaGJ5dGVzIDB4OWIxNDdkMmMgLy8gbWV0aG9kICJtdXN0Q2hlY2tGb3IoKGFkZHJlc3MsdWludDY0LGFkZHJlc3MpLHVpbnQ2NCxieXRlW11bXSl2b2lkIgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTY1LTk2OAogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKEdhdGVNdXN0Q2hlY2tGb3JBYmlNZXRob2QpICYmCiAgICBieiBhc3NlcnRHYXRlUGFzc2VkX2Jvb2xfZmFsc2VAMTIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTY5CiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMSkgPT09IGVuY29kZUFyYzQoY3R4KSAmJgogICAgZnJhbWVfZGlnIC0zCiAgICBndHhuc2EgQXBwbGljYXRpb25BcmdzIDEKICAgIGZyYW1lX2RpZyAxCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5NjUtOTY5CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3IoR2F0ZU11c3RDaGVja0ZvckFiaU1ldGhvZCkgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygxKSA9PT0gZW5jb2RlQXJjNChjdHgpICYmCiAgICBieiBhc3NlcnRHYXRlUGFzc2VkX2Jvb2xfZmFsc2VAMTIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTcwCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMikgPT09IGl0b2IoaWQpCiAgICBmcmFtZV9kaWcgLTMKICAgIGd0eG5zYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZnJhbWVfZGlnIDAKICAgIGl0b2IKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk2NS05NzAKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3RvcihHYXRlTXVzdENoZWNrRm9yQWJpTWV0aG9kKSAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBlbmNvZGVBcmM0KGN0eCkgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygyKSA9PT0gaXRvYihpZCkKICAgIGJ6IGFzc2VydEdhdGVQYXNzZWRfYm9vbF9mYWxzZUAxMgogICAgaW50Y18xIC8vIDEKCmFzc2VydEdhdGVQYXNzZWRfYm9vbF9tZXJnZUAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjEzNQogICAgLy8gbG9nZ2VkQXNzZXJ0KGdhdGVDaGVja0N0eChnYXRlVHhuLCB0aGlzLmFraXRhREFPLnZhbHVlLCBnYXRlQ3R4KHApLCBnYXRlSUQpLCBlcnJGYWlsZWRHYXRlKQogICAgYm56IGFzc2VydEdhdGVQYXNzZWRfYWZ0ZXJfYXNzZXJ0QDIKICAgIGJ5dGVjIDI3IC8vICJFUlI6ZXJyRmd0ZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJGZ3RlCgphc3NlcnRHYXRlUGFzc2VkX2FmdGVyX2Fzc2VydEAyOgogICAgcmV0c3ViCgphc3NlcnRHYXRlUGFzc2VkX2Jvb2xfZmFsc2VAMTI6CiAgICBpbnRjXzAgLy8gMAogICAgYiBhc3NlcnRHYXRlUGFzc2VkX2Jvb2xfbWVyZ2VAMTMKCgovLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo6TWFya2V0cGxhY2UuYXNzZXJ0TGVnYWN5R2F0ZVBhc3NlZChnYXRlVHhuOiB1aW50NjQsIGFwcElkOiB1aW50NjQpIC0+IHZvaWQ6CmFzc2VydExlZ2FjeUdhdGVQYXNzZWQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxNDIKICAgIC8vIHByaXZhdGUgYXNzZXJ0TGVnYWN5R2F0ZVBhc3NlZChnYXRlVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwgYXBwSWQ6IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICBwcm90byAyIDAKICAgIGludGNfMCAvLyAwCiAgICBwdXNoYnl0ZXMgIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjE0MwogICAgLy8gY29uc3Qgd2FsbGV0ID0gbGVnYWN5V2FsbGV0T2YodGhpcy5ha2l0YURBTy52YWx1ZSwgVHhuLnNlbmRlcikKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxNDMKICAgIC8vIGNvbnN0IHdhbGxldCA9IGxlZ2FjeVdhbGxldE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIFR4bi5zZW5kZXIpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgdHhuIFNlbmRlcgogICAgY2FsbHN1YiBsZWdhY3lXYWxsZXRPZgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjMyNQogICAgLy8gcmV0dXJuIGxlZ2FjeU9yaWdpbk9yKHdhbGxldElELCBUeG4uc2VuZGVyKQogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozMTQKICAgIC8vIGlmICh3YWxsZXRJRC5pZCA9PT0gMCkgewogICAgYm56IGFzc2VydExlZ2FjeUdhdGVQYXNzZWRfYWZ0ZXJfaWZfZWxzZUA1CiAgICBmcmFtZV9idXJ5IDAKCmFzc2VydExlZ2FjeUdhdGVQYXNzZWRfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpsZWdhY3lPcmlnaW5PckAxNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjE0NQogICAgLy8gY29uc3QgZ2F0ZUlEID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KGFwcElkLCBCeXRlcyhMaXN0aW5nR2xvYmFsU3RhdGVLZXlHYXRlSUQpKVswXQogICAgZnJhbWVfZGlnIC0xCiAgICBieXRlYyAxNCAvLyAiZ2F0ZV9pZCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIGZyYW1lX2J1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTQ2CiAgICAvLyBsb2dnZWRBc3NlcnQoZ2F0ZUNoZWNrKGdhdGVUeG4sIHRoaXMuYWtpdGFEQU8udmFsdWUsIG9yaWdpbiwgZ2F0ZUlEKSwgZXJyRmFpbGVkR2F0ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxNDYKICAgIC8vIGxvZ2dlZEFzc2VydChnYXRlQ2hlY2soZ2F0ZVR4biwgdGhpcy5ha2l0YURBTy52YWx1ZSwgb3JpZ2luLCBnYXRlSUQpLCBlcnJGYWlsZWRHYXRlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQyCiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICBmcmFtZV9kaWcgLTIKICAgIGd0eG5zIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjA2CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICBzd2FwCiAgICBieXRlYyA0IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0MgogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgcHVzaGludCA0MAogICAgZXh0cmFjdF91aW50NjQKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0Mi00NDMKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIGJ6IGFzc2VydExlZ2FjeUdhdGVQYXNzZWRfYm9vbF9mYWxzZUAyNQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NDMKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIGZyYW1lX2RpZyAtMgogICAgZ3R4bnMgT25Db21wbGV0aW9uCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0Mi00NDMKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIGJueiBhc3NlcnRMZWdhY3lHYXRlUGFzc2VkX2Jvb2xfZmFsc2VAMjUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQ0CiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIGZyYW1lX2RpZyAtMgogICAgZ3R4bnMgTnVtQXBwQXJncwogICAgcHVzaGludCA0CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NDItNDQ0CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIGJ6IGFzc2VydExlZ2FjeUdhdGVQYXNzZWRfYm9vbF9mYWxzZUAyNQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NDUKICAgIC8vIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIEdhdGUucHJvdG90eXBlLm11c3RDaGVjaz4oKSAmJgogICAgZnJhbWVfZGlnIC0yCiAgICBndHhuc2EgQXBwbGljYXRpb25BcmdzIDAKICAgIHB1c2hieXRlcyAweDQzOTIyNjU1IC8vIG1ldGhvZCAibXVzdENoZWNrKGFkZHJlc3MsdWludDY0LGJ5dGVbXVtdKXZvaWQiCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NDItNDQ1CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIEdhdGUucHJvdG90eXBlLm11c3RDaGVjaz4oKSAmJgogICAgYnogYXNzZXJ0TGVnYWN5R2F0ZVBhc3NlZF9ib29sX2ZhbHNlQDI1CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0NgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBuZXcgQWRkcmVzcyhjYWxsZXIpLmJ5dGVzICYmCiAgICBmcmFtZV9kaWcgLTIKICAgIGd0eG5zYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZnJhbWVfZGlnIDAKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0Mi00NDYKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgR2F0ZS5wcm90b3R5cGUubXVzdENoZWNrPigpICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMSkgPT09IG5ldyBBZGRyZXNzKGNhbGxlcikuYnl0ZXMgJiYKICAgIGJ6IGFzc2VydExlZ2FjeUdhdGVQYXNzZWRfYm9vbF9mYWxzZUAyNQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NDcKICAgIC8vIGdhdGVUeG4uYXBwQXJncygyKSA9PT0gaXRvYihpZCkKICAgIGZyYW1lX2RpZyAtMgogICAgZ3R4bnNhIEFwcGxpY2F0aW9uQXJncyAyCiAgICBmcmFtZV9kaWcgMQogICAgaXRvYgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQyLTQ0NwogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBHYXRlLnByb3RvdHlwZS5tdXN0Q2hlY2s+KCkgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygxKSA9PT0gbmV3IEFkZHJlc3MoY2FsbGVyKS5ieXRlcyAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDIpID09PSBpdG9iKGlkKQogICAgYnogYXNzZXJ0TGVnYWN5R2F0ZVBhc3NlZF9ib29sX2ZhbHNlQDI1CiAgICBpbnRjXzEgLy8gMQoKYXNzZXJ0TGVnYWN5R2F0ZVBhc3NlZF9ib29sX21lcmdlQDI2OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTQ2CiAgICAvLyBsb2dnZWRBc3NlcnQoZ2F0ZUNoZWNrKGdhdGVUeG4sIHRoaXMuYWtpdGFEQU8udmFsdWUsIG9yaWdpbiwgZ2F0ZUlEKSwgZXJyRmFpbGVkR2F0ZSkKICAgIGJueiBhc3NlcnRMZWdhY3lHYXRlUGFzc2VkX2FmdGVyX2Fzc2VydEAyCiAgICBieXRlYyAyNyAvLyAiRVJSOmVyckZndGUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyRmd0ZQoKYXNzZXJ0TGVnYWN5R2F0ZVBhc3NlZF9hZnRlcl9hc3NlcnRAMjoKICAgIHJldHN1YgoKYXNzZXJ0TGVnYWN5R2F0ZVBhc3NlZF9ib29sX2ZhbHNlQDI1OgogICAgaW50Y18wIC8vIDAKICAgIGIgYXNzZXJ0TGVnYWN5R2F0ZVBhc3NlZF9ib29sX21lcmdlQDI2Cgphc3NlcnRMZWdhY3lHYXRlUGFzc2VkX2FmdGVyX2lmX2Vsc2VANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzQxLTM0NAogICAgLy8gY29uc3QgW2NvbnRyb2xsZWRBY2NvdW50Qnl0ZXMsIGV4aXN0c10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcygKICAgIC8vICAgd2FsbGV0SUQsCiAgICAvLyAgIEJ5dGVzKEFic3RyYWN0QWNjb3VudEdsb2JhbFN0YXRlS2V5c0NvbnRyb2xsZWRBZGRyZXNzKQogICAgLy8gKQogICAgZnJhbWVfZGlnIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzQzCiAgICAvLyBCeXRlcyhBYnN0cmFjdEFjY291bnRHbG9iYWxTdGF0ZUtleXNDb250cm9sbGVkQWRkcmVzcykKICAgIGJ5dGVjIDIyIC8vICJjb250cm9sbGVkX2FkZHJlc3MiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM0MS0zNDQKICAgIC8vIGNvbnN0IFtjb250cm9sbGVkQWNjb3VudEJ5dGVzLCBleGlzdHNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoCiAgICAvLyAgIHdhbGxldElELAogICAgLy8gICBCeXRlcyhBYnN0cmFjdEFjY291bnRHbG9iYWxTdGF0ZUtleXNDb250cm9sbGVkQWRkcmVzcykKICAgIC8vICkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBzd2FwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM0NQogICAgLy8gbG9nZ2VkQXNzZXJ0KGV4aXN0cyAmJiBjb250cm9sbGVkQWNjb3VudEJ5dGVzLmxlbmd0aCA9PT0gMzIsIGVyckludmFsaWRXYWxsZXQpCiAgICBieiBhc3NlcnRMZWdhY3lHYXRlUGFzc2VkX2Jvb2xfZmFsc2VAOAogICAgZGlnIDEKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGJ6IGFzc2VydExlZ2FjeUdhdGVQYXNzZWRfYm9vbF9mYWxzZUA4CiAgICBpbnRjXzEgLy8gMQoKYXNzZXJ0TGVnYWN5R2F0ZVBhc3NlZF9ib29sX21lcmdlQDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM0NQogICAgLy8gbG9nZ2VkQXNzZXJ0KGV4aXN0cyAmJiBjb250cm9sbGVkQWNjb3VudEJ5dGVzLmxlbmd0aCA9PT0gMzIsIGVyckludmFsaWRXYWxsZXQpCiAgICBibnogYXNzZXJ0TGVnYWN5R2F0ZVBhc3NlZF9hZnRlcl9hc3NlcnRAMTEKICAgIGJ5dGVjIDIzIC8vICJFUlI6ZXJySXdsdCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJd2x0Cgphc3NlcnRMZWdhY3lHYXRlUGFzc2VkX2FmdGVyX2Fzc2VydEAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzE4CiAgICAvLyBpZiAob3JpZ2luICE9PSB3YWxsZXRJRC5hZGRyZXNzICYmIG9yaWdpbiAhPT0gVHhuLnNlbmRlciAmJiBvcmlnaW4uYXV0aEFkZHJlc3MgIT09IHdhbGxldElELmFkZHJlc3MpIHsKICAgIGZyYW1lX2RpZyAyCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBkaWcgMgogICAgIT0KICAgIGJ6IGFzc2VydExlZ2FjeUdhdGVQYXNzZWRfYWZ0ZXJfaWZfZWxzZUAxNQogICAgZGlnIDEKICAgIHR4biBTZW5kZXIKICAgICE9CiAgICBieiBhc3NlcnRMZWdhY3lHYXRlUGFzc2VkX2FmdGVyX2lmX2Vsc2VAMTUKICAgIGRpZyAxCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdEF1dGhBZGRyCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIGZyYW1lX2RpZyAyCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAhPQogICAgYnogYXNzZXJ0TGVnYWN5R2F0ZVBhc3NlZF9hZnRlcl9pZl9lbHNlQDE1CiAgICBmcmFtZV9idXJ5IDAKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozMjUKICAgIC8vIHJldHVybiBsZWdhY3lPcmlnaW5Pcih3YWxsZXRJRCwgVHhuLnNlbmRlcikKICAgIGIgYXNzZXJ0TGVnYWN5R2F0ZVBhc3NlZF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmxlZ2FjeU9yaWdpbk9yQDE2Cgphc3NlcnRMZWdhY3lHYXRlUGFzc2VkX2FmdGVyX2lmX2Vsc2VAMTU6CiAgICBwb3AKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozMjUKICAgIC8vIHJldHVybiBsZWdhY3lPcmlnaW5Pcih3YWxsZXRJRCwgVHhuLnNlbmRlcikKICAgIGIgYXNzZXJ0TGVnYWN5R2F0ZVBhc3NlZF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmxlZ2FjeU9yaWdpbk9yQDE2Cgphc3NlcnRMZWdhY3lHYXRlUGFzc2VkX2Jvb2xfZmFsc2VAODoKICAgIGludGNfMCAvLyAwCiAgICBiIGFzc2VydExlZ2FjeUdhdGVQYXNzZWRfYm9vbF9tZXJnZUA5CgoKLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6Ok1hcmtldHBsYWNlLmxlZ2FjeVNlbGxlclJlZmVycmVyKCkgLT4gYnl0ZXM6CmxlZ2FjeVNlbGxlclJlZmVycmVyOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTU1CiAgICAvLyByZXR1cm4gcmVmZXJyZXJPclplcm9BZGRyZXNzKGxlZ2FjeVdhbGxldE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIFR4bi5zZW5kZXIpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjE1NQogICAgLy8gcmV0dXJuIHJlZmVycmVyT3JaZXJvQWRkcmVzcyhsZWdhY3lXYWxsZXRPZih0aGlzLmFraXRhREFPLnZhbHVlLCBUeG4uc2VuZGVyKSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICB0eG4gU2VuZGVyCiAgICBjYWxsc3ViIGxlZ2FjeVdhbGxldE9mCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzM2CiAgICAvLyByZXR1cm4gcmVmZXJyZXJPcih3YWxsZXRJRCwgR2xvYmFsLnplcm9BZGRyZXNzKQogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjMyOQogICAgLy8gaWYgKHdhbGxldElELmlkID09PSAwKSB7CiAgICBibnogbGVnYWN5U2VsbGVyUmVmZXJyZXJfYWZ0ZXJfaWZfZWxzZUAzCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjE1NQogICAgLy8gcmV0dXJuIHJlZmVycmVyT3JaZXJvQWRkcmVzcyhsZWdhY3lXYWxsZXRPZih0aGlzLmFraXRhREFPLnZhbHVlLCBUeG4uc2VuZGVyKSkKICAgIHJldHN1YgoKbGVnYWN5U2VsbGVyUmVmZXJyZXJfYWZ0ZXJfaWZfZWxzZUAzOgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM1MgogICAgLy8gQnl0ZXMoQWJzdHJhY3RBY2NvdW50R2xvYmFsU3RhdGVLZXlzUmVmZXJyZXIpCiAgICBieXRlYyAyNCAvLyAicmVmZXJyZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM1MC0zNTMKICAgIC8vIGNvbnN0IFtyZWZlcnJlckJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKAogICAgLy8gICB3YWxsZXRJRCwKICAgIC8vICAgQnl0ZXMoQWJzdHJhY3RBY2NvdW50R2xvYmFsU3RhdGVLZXlzUmVmZXJyZXIpCiAgICAvLyApCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxNTUKICAgIC8vIHJldHVybiByZWZlcnJlck9yWmVyb0FkZHJlc3MobGVnYWN5V2FsbGV0T2YodGhpcy5ha2l0YURBTy52YWx1ZSwgVHhuLnNlbmRlcikpCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo6TWFya2V0cGxhY2UuYXNzZXJ0TGlzdGluZ1BheW1lbnQocGF5bWVudDogdWludDY0LCBjb3N0OiBieXRlcywgaXNBbGdvUGF5bWVudDogdWludDY0LCBpc1ByaXplQm94OiB1aW50NjQsIGxlZ2FjeVBheW1lbnQ6IHVpbnQ2NCkgLT4gdWludDY0LCBieXRlczoKYXNzZXJ0TGlzdGluZ1BheW1lbnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxNzAKICAgIC8vIHByaXZhdGUgYXNzZXJ0TGlzdGluZ1BheW1lbnQocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBjb3N0OiBMaXN0aW5nQ29zdEluZm8sIGlzQWxnb1BheW1lbnQ6IGJvb2xlYW4sIGlzUHJpemVCb3g6IGJvb2xlYW4sIGxlZ2FjeVBheW1lbnQ6IGJvb2xlYW4pOiB1aW50NjQgewogICAgcHJvdG8gNSAyCiAgICBwdXNoYnl0ZXMgIiIKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTcxCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRQYXltZW50KQogICAgZnJhbWVfZGlnIC01CiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogYXNzZXJ0TGlzdGluZ1BheW1lbnRfYWZ0ZXJfYXNzZXJ0QDIKICAgIGJ5dGVjIDcgLy8gIkVSUjplcnJJcGF5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwYXkKCmFzc2VydExpc3RpbmdQYXltZW50X2FmdGVyX2Fzc2VydEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTcyCiAgICAvLyBpZiAocGF5bWVudC5hbW91bnQgPT09IGNvc3QudG90YWwpIHsKICAgIGZyYW1lX2RpZyAtNQogICAgZ3R4bnMgQW1vdW50CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMQogICAgZnJhbWVfZGlnIC00CiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgY292ZXIgMgogICAgPT0KICAgIGJ6IGFzc2VydExpc3RpbmdQYXltZW50X2FmdGVyX2lmX2Vsc2VANAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTczCiAgICAvLyByZXR1cm4gMAogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2RpZyAtNAogICAgZnJhbWVfYnVyeSAxCiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKYXNzZXJ0TGlzdGluZ1BheW1lbnRfYWZ0ZXJfaWZfZWxzZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTg5CiAgICAvLyBjb25zdCBkaXNidXJzZW1lbnRzOiB1aW50NjQgPSBpc1ByaXplQm94ID8gMSA6IDIKICAgIGludGNfMyAvLyAyCiAgICBpbnRjXzEgLy8gMQogICAgZnJhbWVfZGlnIC0yCiAgICBzZWxlY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjE5MAogICAgLy8gcmV0dXJuIGNvc3QuY3JlYXRlTWJyIC0gTGVnYWN5TGlzdGluZ0NyZWF0ZU1iciArICgoTWluRGlzYnVyc2VtZW50c01CUiAtIExlZ2FjeU1pbkRpc2J1cnNlbWVudHNNQlIpICogZGlzYnVyc2VtZW50cykKICAgIGZyYW1lX2RpZyAtNAogICAgcHVzaGludCAzMgogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgZnJhbWVfYnVyeSAwCiAgICBpbnRjIDYgLy8gNzU2NTAwCiAgICAtCiAgICBwdXNoaW50IDEyODAwCiAgICB1bmNvdmVyIDIKICAgICoKICAgICsKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjE3NwogICAgLy8gbGVnYWN5UGF5bWVudCAmJiBpc0FsZ29QYXltZW50ICYmIGNvc3QuY3JlYXRlTWJyID4gTGVnYWN5TGlzdGluZ0NyZWF0ZU1iciAmJgogICAgZnJhbWVfZGlnIC0xCiAgICBieiBhc3NlcnRMaXN0aW5nUGF5bWVudF9ib29sX2ZhbHNlQDExCiAgICBmcmFtZV9kaWcgLTMKICAgIGJ6IGFzc2VydExpc3RpbmdQYXltZW50X2Jvb2xfZmFsc2VAMTEKICAgIGZyYW1lX2RpZyAwCiAgICBpbnRjIDYgLy8gNzU2NTAwCiAgICA+CiAgICBieiBhc3NlcnRMaXN0aW5nUGF5bWVudF9ib29sX2ZhbHNlQDExCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxNzgKICAgIC8vIHBheW1lbnQuYW1vdW50ID09PSBjb3N0LnRvdGFsIC0gZmxvYXQKICAgIGR1cAogICAgZGlnIDIKICAgIC0KICAgIGZyYW1lX2RpZyAxCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTc3LTE3OAogICAgLy8gbGVnYWN5UGF5bWVudCAmJiBpc0FsZ29QYXltZW50ICYmIGNvc3QuY3JlYXRlTWJyID4gTGVnYWN5TGlzdGluZ0NyZWF0ZU1iciAmJgogICAgLy8gcGF5bWVudC5hbW91bnQgPT09IGNvc3QudG90YWwgLSBmbG9hdAogICAgYnogYXNzZXJ0TGlzdGluZ1BheW1lbnRfYm9vbF9mYWxzZUAxMQogICAgaW50Y18xIC8vIDEKCmFzc2VydExpc3RpbmdQYXltZW50X2Jvb2xfbWVyZ2VAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxNzYtMTc5CiAgICAvLyBsb2dnZWRBc3NlcnQoKAogICAgLy8gICBsZWdhY3lQYXltZW50ICYmIGlzQWxnb1BheW1lbnQgJiYgY29zdC5jcmVhdGVNYnIgPiBMZWdhY3lMaXN0aW5nQ3JlYXRlTWJyICYmCiAgICAvLyAgIHBheW1lbnQuYW1vdW50ID09PSBjb3N0LnRvdGFsIC0gZmxvYXQKICAgIC8vICksIGVyckludmFsaWRQYXltZW50KQogICAgYm56IGFzc2VydExpc3RpbmdQYXltZW50X2FmdGVyX2Fzc2VydEAxNAogICAgYnl0ZWMgNyAvLyAiRVJSOmVycklwYXkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBheQoKYXNzZXJ0TGlzdGluZ1BheW1lbnRfYWZ0ZXJfYXNzZXJ0QDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTgyCiAgICAvLyBjb25zdCBzZWxmID0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxODMKICAgIC8vIGxvZ2dlZEFzc2VydChzZWxmLmJhbGFuY2UgLSBzZWxmLm1pbkJhbGFuY2UgPj0gY29zdC50b3RhbCArIExlZ2FjeUZsb2F0UmVzZXJ2ZSwgZXJyTGVnYWN5RmxvYXRSZXNlcnZlKQogICAgZHVwCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdEJhbGFuY2UKICAgIGFzc2VydCAvLyBhY2NvdW50IGZ1bmRlZAogICAgc3dhcAogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RNaW5CYWxhbmNlCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIC0KICAgIHN3YXAKICAgIHB1c2hpbnQgNTAwMDAwCiAgICArCiAgICA+PQogICAgYm56IGFzc2VydExpc3RpbmdQYXltZW50X2FmdGVyX2Fzc2VydEAxNgogICAgcHVzaGJ5dGVzICJFUlI6ZXJyTGZsdCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJMZmx0Cgphc3NlcnRMaXN0aW5nUGF5bWVudF9hZnRlcl9hc3NlcnRAMTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxODQKICAgIC8vIHJldHVybiBmbG9hdAogICAgZnJhbWVfZGlnIC00CiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMwogICAgcmV0c3ViCgphc3NlcnRMaXN0aW5nUGF5bWVudF9ib29sX2ZhbHNlQDExOgogICAgaW50Y18wIC8vIDAKICAgIGIgYXNzZXJ0TGlzdGluZ1BheW1lbnRfYm9vbF9tZXJnZUAxMgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjpNYXJrZXRwbGFjZS5hc3NlcnRCdXllckFzYVBheW1lbnQoYXNzZXRYZmVyOiB1aW50NjQsIGFwcElkOiB1aW50NjQpIC0+IHZvaWQ6CmFzc2VydEJ1eWVyQXNhUGF5bWVudDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjE5NAogICAgLy8gcHJpdmF0ZSBhc3NlcnRCdXllckFzYVBheW1lbnQoYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sIGFwcElkOiBBcHBsaWNhdGlvbik6IHZvaWQgewogICAgcHJvdG8gMiAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxOTUKICAgIC8vIGFzc2VydFNhZmVBc3NldFRyYW5zZmVyKGFzc2V0WGZlciwgVHhuLnNlbmRlcikKICAgIGZyYW1lX2RpZyAtMgogICAgdHhuIFNlbmRlcgogICAgY2FsbHN1YiBhc3NlcnRTYWZlQXNzZXRUcmFuc2ZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTk2CiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLmFzc2V0UmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBlcnJJbnZhbGlkVHJhbnNmZXIpCiAgICBmcmFtZV9kaWcgLTIKICAgIGd0eG5zIEFzc2V0UmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IGFzc2VydEJ1eWVyQXNhUGF5bWVudF9hZnRlcl9hc3NlcnRAMgogICAgYnl0ZWMgMTUgLy8gIkVSUjplcnJJeGZyIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckl4ZnIKCmFzc2VydEJ1eWVyQXNhUGF5bWVudF9hZnRlcl9hc3NlcnRAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjE5NwogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci5hc3NldEFtb3VudCA+IDAsIGVyckludmFsaWRUcmFuc2ZlcikKICAgIGZyYW1lX2RpZyAtMgogICAgZ3R4bnMgQXNzZXRBbW91bnQKICAgIGJueiBhc3NlcnRCdXllckFzYVBheW1lbnRfYWZ0ZXJfYXNzZXJ0QDQKICAgIGJ5dGVjIDE1IC8vICJFUlI6ZXJySXhmciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJeGZyCgphc3NlcnRCdXllckFzYVBheW1lbnRfYWZ0ZXJfYXNzZXJ0QDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoxOTgKICAgIC8vIGNvbnN0IHBheW1lbnRBc3NldCA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NChhcHBJZCwgQnl0ZXMoTGlzdGluZ0dsb2JhbFN0YXRlS2V5UGF5bWVudEFzc2V0KSlbMF0KICAgIGZyYW1lX2RpZyAtMQogICAgcHVzaGJ5dGVzICJwYXltZW50X2Fzc2V0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTk5CiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLnhmZXJBc3NldC5pZCA9PT0gcGF5bWVudEFzc2V0LCBlcnJJbnZhbGlkVHJhbnNmZXIpCiAgICBmcmFtZV9kaWcgLTIKICAgIGd0eG5zIFhmZXJBc3NldAogICAgPT0KICAgIGJueiBhc3NlcnRCdXllckFzYVBheW1lbnRfYWZ0ZXJfYXNzZXJ0QDYKICAgIGJ5dGVjIDE1IC8vICJFUlI6ZXJySXhmciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJeGZyCgphc3NlcnRCdXllckFzYVBheW1lbnRfYWZ0ZXJfYXNzZXJ0QDY6CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo6TWFya2V0cGxhY2UuYXNzZXJ0QnV5ZXJQYXltZW50KHBheW1lbnQ6IHVpbnQ2NCkgLT4gdm9pZDoKYXNzZXJ0QnV5ZXJQYXltZW50OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjAzCiAgICAvLyBwcml2YXRlIGFzc2VydEJ1eWVyUGF5bWVudChwYXltZW50OiBndHhuLlBheW1lbnRUeG4pOiB2b2lkIHsKICAgIHByb3RvIDEgMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjA0CiAgICAvLyBhc3NlcnRTYWZlUGF5bWVudChwYXltZW50LCBUeG4uc2VuZGVyKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNTYKICAgIC8vIGxvZ2dlZEFzc2VydCh0eG4uc2VuZGVyID09PSBzZW5kZXIsIGVyckludmFsaWRQYXltZW50U2VuZGVyKQogICAgZnJhbWVfZGlnIC0xCiAgICBndHhucyBTZW5kZXIKICAgID09CiAgICBibnogYXNzZXJ0QnV5ZXJQYXltZW50X2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyAxOCAvLyAiRVJSOmVycklwbXMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBtcwoKYXNzZXJ0QnV5ZXJQYXltZW50X2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNTcKICAgIC8vIGxvZ2dlZEFzc2VydCh0eG4uY2xvc2VSZW1haW5kZXJUbyA9PT0gR2xvYmFsLnplcm9BZGRyZXNzLCBlcnJDbG9zZUZvcmJpZGRlbikKICAgIGZyYW1lX2RpZyAtMQogICAgZ3R4bnMgQ2xvc2VSZW1haW5kZXJUbwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYm56IGFzc2VydEJ1eWVyUGF5bWVudF9hZnRlcl9hc3NlcnRANwogICAgYnl0ZWMgMTkgLy8gIkVSUjplcnJOY2xzIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5jbHMKCmFzc2VydEJ1eWVyUGF5bWVudF9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTU4CiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLnJla2V5VG8gPT09IEdsb2JhbC56ZXJvQWRkcmVzcywgZXJyUmVrZXlGb3JiaWRkZW4pCiAgICBmcmFtZV9kaWcgLTEKICAgIGd0eG5zIFJla2V5VG8KICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIGJueiBhc3NlcnRCdXllclBheW1lbnRfYWZ0ZXJfYXNzZXJ0QDkKICAgIGJ5dGVjIDIwIC8vICJFUlI6ZXJyTnJreSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOcmt5Cgphc3NlcnRCdXllclBheW1lbnRfYWZ0ZXJfYXNzZXJ0QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyMDUKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJySW52YWxpZFBheW1lbnQpCiAgICBmcmFtZV9kaWcgLTEKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBhc3NlcnRCdXllclBheW1lbnRfYWZ0ZXJfYXNzZXJ0QDIKICAgIGJ5dGVjIDcgLy8gIkVSUjplcnJJcGF5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwYXkKCmFzc2VydEJ1eWVyUGF5bWVudF9hZnRlcl9hc3NlcnRAMjoKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjpNYXJrZXRwbGFjZS5zZXR0bGVBbGdvKHBheW1lbnQ6IHVpbnQ2NCwgYXBwSWQ6IHVpbnQ2NCwgbWFya2V0cGxhY2U6IGJ5dGVzLCBiYWxhbmNlQmVmb3JlOiB1aW50NjQsIG1pbkJlZm9yZTogdWludDY0KSAtPiB2b2lkOgpzZXR0bGVBbGdvOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjA4CiAgICAvLyBwcml2YXRlIHNldHRsZUFsZ28ocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBhcHBJZDogQXBwbGljYXRpb24sIG1hcmtldHBsYWNlOiBBY2NvdW50LCBiYWxhbmNlQmVmb3JlOiB1aW50NjQsIG1pbkJlZm9yZTogdWludDY0KTogdm9pZCB7CiAgICBwcm90byA1IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjg0CiAgICAvLyByZXR1cm4gIW9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NChhcHBJZCwgQnl0ZXMoTGlzdGluZ0dsb2JhbFN0YXRlS2V5UmV2aXNpb24pKVsxXQogICAgZnJhbWVfZGlnIC00CiAgICBieXRlYyAxMSAvLyAicmV2IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGJ1cnkgMQogICAgIQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NzcKICAgIC8vIGNvbnN0IFtmdW5kZXJCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhhcHBJZCwgQnl0ZXMoR2xvYmFsU3RhdGVLZXlGdW5kZXIpKQogICAgZnJhbWVfZGlnIC00CiAgICBieXRlYyAxMiAvLyAiZnVuZGVyIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjExCiAgICAvLyBjb25zdCB7IGFjY291bnQ6IHJlY2VpdmVyLCBhbW91bnQgfSA9IGdldEZ1bmRlcihhcHBJZCkKICAgIGR1cAogICAgZXh0cmFjdCAwIDMyCiAgICBzd2FwCiAgICBwdXNoaW50IDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MTE2CiAgICAvLyByZXR1cm4gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KGFwcElkLCBCeXRlcyhMaXN0aW5nR2xvYmFsU3RhdGVLZXlGYWN0b3J5RmxvYXQpKVswXQogICAgZnJhbWVfZGlnIC00CiAgICBieXRlYyAxMyAvLyAiZmFjdG9yeV9mbG9hdCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjIxNS0yMjYKICAgIC8vIGxpc3RpbmcuY2FsbC5wdXJjaGFzZSh7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBhcHBJZC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBwYXltZW50LmFtb3VudCwKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgIG1hcmtldHBsYWNlCiAgICAvLyAgIF0sCiAgICAvLyAgIG9uQ29tcGxldGlvbjogT25Db21wbGV0ZUFjdGlvbi5EZWxldGVBcHBsaWNhdGlvbiwKICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyMTkKICAgIC8vIHJlY2VpdmVyOiBhcHBJZC5hZGRyZXNzLAogICAgZnJhbWVfZGlnIC00CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyMjAKICAgIC8vIGFtb3VudDogcGF5bWVudC5hbW91bnQsCiAgICBmcmFtZV9kaWcgLTUKICAgIGd0eG5zIEFtb3VudAogICAgZHVwCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgc3dhcAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjE4LTIyMQogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IGFwcElkLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogcGF5bWVudC5hbW91bnQsCiAgICAvLyB9KSwKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjIxNS0yMjYKICAgIC8vIGxpc3RpbmcuY2FsbC5wdXJjaGFzZSh7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBhcHBJZC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBwYXltZW50LmFtb3VudCwKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgIG1hcmtldHBsYWNlCiAgICAvLyAgIF0sCiAgICAvLyAgIG9uQ29tcGxldGlvbjogT25Db21wbGV0ZUFjdGlvbi5EZWxldGVBcHBsaWNhdGlvbiwKICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjIyMgogICAgLy8gVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjIyNQogICAgLy8gb25Db21wbGV0aW9uOiBPbkNvbXBsZXRlQWN0aW9uLkRlbGV0ZUFwcGxpY2F0aW9uLAogICAgcHVzaGludCA1CiAgICBpdHhuX2ZpZWxkIE9uQ29tcGxldGlvbgogICAgZnJhbWVfZGlnIC00CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjIxNS0yMjYKICAgIC8vIGxpc3RpbmcuY2FsbC5wdXJjaGFzZSh7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBhcHBJZC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBwYXltZW50LmFtb3VudCwKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgIG1hcmtldHBsYWNlCiAgICAvLyAgIF0sCiAgICAvLyAgIG9uQ29tcGxldGlvbjogT25Db21wbGV0ZUFjdGlvbi5EZWxldGVBcHBsaWNhdGlvbiwKICAgIC8vIH0pCiAgICBwdXNoYnl0ZXMgMHg2YTE2MzkzZCAvLyBtZXRob2QgInB1cmNoYXNlKHBheSxhZGRyZXNzLGFkZHJlc3Mpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC0zCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjIyOAogICAgLy8gdGhpcy5yZWZ1bmRMaXN0aW5nRnVuZGVyKGxlZ2FjeSwgcmVjZWl2ZXIsIGFtb3VudCwgZmxvYXQsIGJhbGFuY2VCZWZvcmUsIG1pbkJlZm9yZSwgcGF5bWVudC5hbW91bnQpCiAgICBjb3ZlciA0CiAgICBmcmFtZV9kaWcgLTIKICAgIGZyYW1lX2RpZyAtMQogICAgdW5jb3ZlciA2CiAgICBjYWxsc3ViIHJlZnVuZExpc3RpbmdGdW5kZXIKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjpNYXJrZXRwbGFjZS5zZXR0bGVBc2EoYXNzZXRYZmVyOiB1aW50NjQsIGFwcElkOiB1aW50NjQsIG1hcmtldHBsYWNlOiBieXRlcywgYmFsYW5jZUJlZm9yZTogdWludDY0LCBtaW5CZWZvcmU6IHVpbnQ2NCkgLT4gdm9pZDoKc2V0dGxlQXNhOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjMxCiAgICAvLyBwcml2YXRlIHNldHRsZUFzYShhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwgYXBwSWQ6IEFwcGxpY2F0aW9uLCBtYXJrZXRwbGFjZTogQWNjb3VudCwgYmFsYW5jZUJlZm9yZTogdWludDY0LCBtaW5CZWZvcmU6IHVpbnQ2NCk6IHZvaWQgewogICAgcHJvdG8gNSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo4NAogICAgLy8gcmV0dXJuICFvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQoYXBwSWQsIEJ5dGVzKExpc3RpbmdHbG9iYWxTdGF0ZUtleVJldmlzaW9uKSlbMV0KICAgIGZyYW1lX2RpZyAtNAogICAgYnl0ZWMgMTEgLy8gInJldiIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjIzMwogICAgLy8gbG9nZ2VkQXNzZXJ0KCF0aGlzLmlzTGVnYWN5TGlzdGluZyhhcHBJZCksIGVyckxlZ2FjeUxpc3RpbmcpCiAgICBibnogc2V0dGxlQXNhX2FmdGVyX2Fzc2VydEAyCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJMZ2N5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckxnY3kKCnNldHRsZUFzYV9hZnRlcl9hc3NlcnRAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Njc3CiAgICAvLyBjb25zdCBbZnVuZGVyQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYXBwSWQsIEJ5dGVzKEdsb2JhbFN0YXRlS2V5RnVuZGVyKSkKICAgIGZyYW1lX2RpZyAtNAogICAgYnl0ZWMgMTIgLy8gImZ1bmRlciIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjIzNQogICAgLy8gY29uc3QgeyBhY2NvdW50OiByZWNlaXZlciwgYW1vdW50IH0gPSBnZXRGdW5kZXIoYXBwSWQpCiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgc3dhcAogICAgcHVzaGludCAzMgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjExNgogICAgLy8gcmV0dXJuIG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NChhcHBJZCwgQnl0ZXMoTGlzdGluZ0dsb2JhbFN0YXRlS2V5RmFjdG9yeUZsb2F0KSlbMF0KICAgIGZyYW1lX2RpZyAtNAogICAgYnl0ZWMgMTMgLy8gImZhY3RvcnlfZmxvYXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyMzktMjUxCiAgICAvLyBsaXN0aW5nLmNhbGwucHVyY2hhc2VBc2EoewogICAgLy8gICBhcHBJZCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgICBhc3NldFJlY2VpdmVyOiBhcHBJZC5hZGRyZXNzLAogICAgLy8gICAgICAgYXNzZXRBbW91bnQ6IGFzc2V0WGZlci5hc3NldEFtb3VudCwKICAgIC8vICAgICAgIHhmZXJBc3NldDogYXNzZXRYZmVyLnhmZXJBc3NldCwKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgIG1hcmtldHBsYWNlCiAgICAvLyAgIF0sCiAgICAvLyAgIG9uQ29tcGxldGlvbjogT25Db21wbGV0ZUFjdGlvbi5EZWxldGVBcHBsaWNhdGlvbiwKICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyNDMKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IGFwcElkLmFkZHJlc3MsCiAgICBmcmFtZV9kaWcgLTQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjI0NAogICAgLy8gYXNzZXRBbW91bnQ6IGFzc2V0WGZlci5hc3NldEFtb3VudCwKICAgIGZyYW1lX2RpZyAtNQogICAgZ3R4bnMgQXNzZXRBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjI0NQogICAgLy8geGZlckFzc2V0OiBhc3NldFhmZXIueGZlckFzc2V0LAogICAgZnJhbWVfZGlnIC01CiAgICBndHhucyBYZmVyQXNzZXQKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjI0Mi0yNDYKICAgIC8vIGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgIGFzc2V0UmVjZWl2ZXI6IGFwcElkLmFkZHJlc3MsCiAgICAvLyAgIGFzc2V0QW1vdW50OiBhc3NldFhmZXIuYXNzZXRBbW91bnQsCiAgICAvLyAgIHhmZXJBc3NldDogYXNzZXRYZmVyLnhmZXJBc3NldCwKICAgIC8vIH0pLAogICAgcHVzaGludCA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjIzOS0yNTEKICAgIC8vIGxpc3RpbmcuY2FsbC5wdXJjaGFzZUFzYSh7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICAgIGFzc2V0UmVjZWl2ZXI6IGFwcElkLmFkZHJlc3MsCiAgICAvLyAgICAgICBhc3NldEFtb3VudDogYXNzZXRYZmVyLmFzc2V0QW1vdW50LAogICAgLy8gICAgICAgeGZlckFzc2V0OiBhc3NldFhmZXIueGZlckFzc2V0LAogICAgLy8gICAgIH0pLAogICAgLy8gICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgbWFya2V0cGxhY2UKICAgIC8vICAgXSwKICAgIC8vICAgb25Db21wbGV0aW9uOiBPbkNvbXBsZXRlQWN0aW9uLkRlbGV0ZUFwcGxpY2F0aW9uLAogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjQ3CiAgICAvLyBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjUwCiAgICAvLyBvbkNvbXBsZXRpb246IE9uQ29tcGxldGVBY3Rpb24uRGVsZXRlQXBwbGljYXRpb24sCiAgICBwdXNoaW50IDUKICAgIGl0eG5fZmllbGQgT25Db21wbGV0aW9uCiAgICBmcmFtZV9kaWcgLTQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjM5LTI1MQogICAgLy8gbGlzdGluZy5jYWxsLnB1cmNoYXNlQXNhKHsKICAgIC8vICAgYXBwSWQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgICAgYXNzZXRSZWNlaXZlcjogYXBwSWQuYWRkcmVzcywKICAgIC8vICAgICAgIGFzc2V0QW1vdW50OiBhc3NldFhmZXIuYXNzZXRBbW91bnQsCiAgICAvLyAgICAgICB4ZmVyQXNzZXQ6IGFzc2V0WGZlci54ZmVyQXNzZXQsCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgVHhuLnNlbmRlciwKICAgIC8vICAgICBtYXJrZXRwbGFjZQogICAgLy8gICBdLAogICAgLy8gICBvbkNvbXBsZXRpb246IE9uQ29tcGxldGVBY3Rpb24uRGVsZXRlQXBwbGljYXRpb24sCiAgICAvLyB9KQogICAgcHVzaGJ5dGVzIDB4MTcxYzlmODggLy8gbWV0aG9kICJwdXJjaGFzZUFzYShheGZlcixhZGRyZXNzLGFkZHJlc3Mpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC0zCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjI1MwogICAgLy8gdGhpcy5yZWZ1bmRMaXN0aW5nRnVuZGVyKGZhbHNlLCByZWNlaXZlciwgYW1vdW50LCBmbG9hdCwgYmFsYW5jZUJlZm9yZSwgbWluQmVmb3JlLCAwKQogICAgaW50Y18wIC8vIDAKICAgIGNvdmVyIDMKICAgIGZyYW1lX2RpZyAtMgogICAgZnJhbWVfZGlnIC0xCiAgICBpbnRjXzAgLy8gMAogICAgY2FsbHN1YiByZWZ1bmRMaXN0aW5nRnVuZGVyCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo6TWFya2V0cGxhY2UubGlzdEltcGwocGF5bWVudDogdWludDY0LCBhc3NldFhmZXI6IHVpbnQ2NCwgcHJpY2U6IHVpbnQ2NCwgcGF5bWVudEFzc2V0OiB1aW50NjQsIGV4cGlyYXRpb246IHVpbnQ2NCwgcmVzZXJ2ZWRGb3I6IGJ5dGVzLCBnYXRlSUQ6IHVpbnQ2NCwgbWFya2V0cGxhY2U6IGJ5dGVzLCBuYW1lOiBieXRlcywgcHJvb2Y6IGJ5dGVzLCBzZWxsZXJSZWZlcnJlcjogYnl0ZXMsIGxlZ2FjeVBheW1lbnQ6IHVpbnQ2NCkgLT4gdWludDY0LCBieXRlczoKbGlzdEltcGw6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyNjktMjgyCiAgICAvLyBwcml2YXRlIGxpc3RJbXBsKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICBwcmljZTogdWludDY0LAogICAgLy8gICBwYXltZW50QXNzZXQ6IHVpbnQ2NCwgLy8gMCB8IEFzc2V0CiAgICAvLyAgIGV4cGlyYXRpb246IHVpbnQ2NCwKICAgIC8vICAgcmVzZXJ2ZWRGb3I6IEFjY291bnQsCiAgICAvLyAgIGdhdGVJRDogdWludDY0LAogICAgLy8gICBtYXJrZXRwbGFjZTogQWNjb3VudCwKICAgIC8vICAgbmFtZTogc3RyaW5nLAogICAgLy8gICBwcm9vZjogUHJvb2YsCiAgICAvLyAgIHNlbGxlclJlZmVycmVyOiBBY2NvdW50LAogICAgLy8gICBsZWdhY3lQYXltZW50OiBib29sZWFuCiAgICAvLyApOiB1aW50NjQgewogICAgcHJvdG8gMTIgMgogICAgaW50Y18wIC8vIDAKICAgIGR1cAogICAgcHVzaGJ5dGVzICIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyODQKICAgIC8vIGxvZ2dlZEFzc2VydChwcmljZSA+PSBMaXN0aW5nTWluaW11bVByaWNlLCBlcnJQcmljZVRvb0xvdykKICAgIGZyYW1lX2RpZyAtMTAKICAgIHB1c2hpbnQgNAogICAgPj0KICAgIGJueiBsaXN0SW1wbF9hZnRlcl9hc3NlcnRAMgogICAgYnl0ZWMgMjggLy8gIkVSUjplcnJQcmxvIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclBybG8KCmxpc3RJbXBsX2FmdGVyX2Fzc2VydEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjYKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjI4NQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYm94ZWRDb250cmFjdC5leGlzdHMsIGVyckNvbnRyYWN0Tm90U2V0KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogbGlzdEltcGxfYWZ0ZXJfYXNzZXJ0QDQKICAgIGJ5dGVjIDggLy8gIkVSUjplcnJDbnN0IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckNuc3QKCmxpc3RJbXBsX2FmdGVyX2Fzc2VydEA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6Mjg4CiAgICAvLyBhc3NlcnRTYWZlQXNzZXRUcmFuc2Zlcihhc3NldFhmZXIsIFR4bi5zZW5kZXIpCiAgICBmcmFtZV9kaWcgLTExCiAgICB0eG4gU2VuZGVyCiAgICBjYWxsc3ViIGFzc2VydFNhZmVBc3NldFRyYW5zZmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czoyODkKICAgIC8vIGxvZ2dlZEFzc2VydChhc3NldFhmZXIuYXNzZXRSZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRQYXltZW50KQogICAgZnJhbWVfZGlnIC0xMQogICAgZ3R4bnMgQXNzZXRSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogbGlzdEltcGxfYWZ0ZXJfYXNzZXJ0QDYKICAgIGJ5dGVjIDcgLy8gIkVSUjplcnJJcGF5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwYXkKCmxpc3RJbXBsX2FmdGVyX2Fzc2VydEA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjkwCiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLmFzc2V0QW1vdW50ID4gMCwgZXJySW52YWxpZFBheW1lbnQpCiAgICBmcmFtZV9kaWcgLTExCiAgICBndHhucyBBc3NldEFtb3VudAogICAgZHVwCiAgICBibnogbGlzdEltcGxfYWZ0ZXJfYXNzZXJ0QDgKICAgIGJ5dGVjIDcgLy8gIkVSUjplcnJJcGF5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwYXkKCmxpc3RJbXBsX2FmdGVyX2Fzc2VydEA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MjkyCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudEFzc2V0ICE9PSBhc3NldFhmZXIueGZlckFzc2V0LmlkLCBlcnJQcml6ZUlzUGF5bWVudEFzc2V0KQogICAgZnJhbWVfZGlnIC0xMQogICAgZ3R4bnMgWGZlckFzc2V0CiAgICBkdXAKICAgIGZyYW1lX2RpZyAtOQogICAgIT0KICAgIGJueiBsaXN0SW1wbF9hZnRlcl9hc3NlcnRAMTAKICAgIHB1c2hieXRlcyAiRVJSOmVyclBiZGwiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyUGJkbAoKbGlzdEltcGxfYWZ0ZXJfYXNzZXJ0QDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6Mjk0CiAgICAvLyBjb25zdCBpc0FsZ29QYXltZW50ID0gcGF5bWVudEFzc2V0ID09PSAwCiAgICBmcmFtZV9kaWcgLTkKICAgICEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjI5NQogICAgLy8gY29uc3QgY29zdCA9IGNsb25lKHRoaXMubGlzdGluZ0Nvc3QoYXNzZXRYZmVyLnhmZXJBc3NldC5pZCwgcGF5bWVudEFzc2V0LCBmYWxzZSkpCiAgICBkaWcgMQogICAgZnJhbWVfZGlnIC05CiAgICBpbnRjXzAgLy8gMAogICAgY2FsbHN1YiBsaXN0aW5nQ29zdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6Mjk4CiAgICAvLyBjb25zdCBmbG9hdCA9IHRoaXMuYXNzZXJ0TGlzdGluZ1BheW1lbnQocGF5bWVudCwgY29zdCwgaXNBbGdvUGF5bWVudCwgZmFsc2UsIGxlZ2FjeVBheW1lbnQpCiAgICBmcmFtZV9kaWcgLTEyCiAgICBzd2FwCiAgICB1bmNvdmVyIDIKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9kaWcgLTEKICAgIGNhbGxzdWIgYXNzZXJ0TGlzdGluZ1BheW1lbnQKICAgIGNvdmVyIDMKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjMwMAogICAgLy8gY29uc3QgY3JlYXRvclJveWFsdHkgPSByb3lhbHRpZXModGhpcy5ha2l0YURBTy52YWx1ZSwgYXNzZXRYZmVyLnhmZXJBc3NldCwgbmFtZSwgcHJvb2YpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzAwCiAgICAvLyBjb25zdCBjcmVhdG9yUm95YWx0eSA9IHJveWFsdGllcyh0aGlzLmFraXRhREFPLnZhbHVlLCBhc3NldFhmZXIueGZlckFzc2V0LCBuYW1lLCBwcm9vZikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBzd2FwCiAgICBjb3ZlciAyCiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYzOQogICAgLy8gbGV0IGNyZWF0b3JSb3lhbHR5OiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfYnVyeSAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY0MQogICAgLy8gaWYgKCEocHJvb2YubGVuZ3RoID4gMCkpIHsKICAgIGZyYW1lX2RpZyAtMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGJueiBsaXN0SW1wbF9hZnRlcl9pZl9lbHNlQDI2CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjQyCiAgICAvLyByZXR1cm4gQ3JlYXRvclJveWFsdHlEZWZhdWx0CiAgICBwdXNoaW50IDUwMDAKICAgIGZyYW1lX2J1cnkgMgoKbGlzdEltcGxfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpyb3lhbHRpZXNAMzE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozMDUtMzM2CiAgICAvLyBjb25zdCBsaXN0aW5nQXBwID0gbGlzdGluZy5jYWxsCiAgICAvLyAgIC5jcmVhdGUoewogICAgLy8gICAgIGFyZ3M6IFsKICAgIC8vICAgICAgIGFzc2V0WGZlci54ZmVyQXNzZXQuaWQsCiAgICAvLyAgICAgICBmYWxzZSwKICAgIC8vICAgICAgIHByaWNlLAogICAgLy8gICAgICAgcGF5bWVudEFzc2V0LAogICAgLy8gICAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgICAvLyB0aGUgZXNjcm93IG9wdC1pbiBpcyBwYWlkIHRvIHRoZSBEQU8gYW5kIG5ldmVyIHJlbGVhc2VkLCBzbyBpdCBpcyBub3QgcmVmdW5kYWJsZQogICAgLy8gICAgICAgeyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiBwYXltZW50LmFtb3VudCAtIGNvc3QuZXNjcm93T3B0SW4gfSwKICAgIC8vICAgICAgIHJlc2VydmVkRm9yLAogICAgLy8gICAgICAgY3JlYXRvclJveWFsdHksCiAgICAvLyAgICAgICBnYXRlSUQsCiAgICAvLyAgICAgICBtYXJrZXRwbGFjZSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRDb250cmFjdFZlcnNpb24udmFsdWUsCiAgICAvLyAgICAgICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICAgICAgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSwKICAgIC8vICAgICAgIGFzc2V0WGZlci5hc3NldEFtb3VudCwKICAgIC8vICAgICAgIHNlbGxlclJlZmVycmVyLAogICAgLy8gICAgICAgZmxvYXQsCiAgICAvLyAgICAgXSwKICAgIC8vICAgICAvLyBCb3hlZCBhcHByb3ZhbCBwcm9ncmFtIGluIHVwIHRvIGZvdXIgNCBLQiBjaHVua3MgKEFWTSAxMzogdXAgdG8gMTYgS0IpLgogICAgLy8gICAgIGFwcHJvdmFsUHJvZ3JhbTogWwogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMCksCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygxKSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDIpLAogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMyksCiAgICAvLyAgICAgXSwKICAgIC8vICAgICBjbGVhclN0YXRlUHJvZ3JhbTogbGlzdGluZy5jbGVhclN0YXRlUHJvZ3JhbSwKICAgIC8vICAgICBleHRyYVByb2dyYW1QYWdlczogdGhpcy5jaGlsZEV4dHJhUGFnZXNBdExlYXN0KGxpc3RpbmcuY2xlYXJTdGF0ZVByb2dyYW0ubGVuZ3RoLCBsaXN0aW5nLmV4dHJhUHJvZ3JhbVBhZ2VzKSwKICAgIC8vICAgfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjMwOAogICAgLy8gYXNzZXRYZmVyLnhmZXJBc3NldC5pZCwKICAgIGR1cAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzEwCiAgICAvLyBwcmljZSwKICAgIGZyYW1lX2RpZyAtMTAKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjMxMQogICAgLy8gcGF5bWVudEFzc2V0LAogICAgZnJhbWVfZGlnIC05CiAgICBpdG9iCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzEyCiAgICAvLyBleHBpcmF0aW9uLAogICAgZnJhbWVfZGlnIC04CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozMTMKICAgIC8vIFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozMTUKICAgIC8vIHsgYWNjb3VudDogcGF5bWVudC5zZW5kZXIsIGFtb3VudDogcGF5bWVudC5hbW91bnQgLSBjb3N0LmVzY3Jvd09wdEluIH0sCiAgICBmcmFtZV9kaWcgLTEyCiAgICBndHhucyBTZW5kZXIKICAgIGZyYW1lX2RpZyAtMTIKICAgIGd0eG5zIEFtb3VudAogICAgdW5jb3ZlciA5CiAgICBkdXAKICAgIGNvdmVyIDgKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLQogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozMTcKICAgIC8vIGNyZWF0b3JSb3lhbHR5LAogICAgZnJhbWVfZGlnIDIKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjMxOAogICAgLy8gZ2F0ZUlELAogICAgZnJhbWVfZGlnIC02CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozMjAKICAgIC8vIHRoaXMuY2hpbGRDb250cmFjdFZlcnNpb24udmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjIKICAgIC8vIGNoaWxkQ29udHJhY3RWZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogQmFzZUZhY3RvcnlHbG9iYWxTdGF0ZUtleUNoaWxkQ29udHJhY3RWZXJzaW9uIH0pCiAgICBieXRlYyA5IC8vICJjaGlsZF9jb250cmFjdF92ZXJzaW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzIwCiAgICAvLyB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGR1cAogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozMjEKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzIxCiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjMyMgogICAgLy8gdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlY18yIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozMjIKICAgIC8vIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzIzCiAgICAvLyBhc3NldFhmZXIuYXNzZXRBbW91bnQsCiAgICB1bmNvdmVyIDEzCiAgICBkdXAKICAgIGNvdmVyIDEyCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozMjUKICAgIC8vIGZsb2F0LAogICAgdW5jb3ZlciAxNQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzIzLTMyNQogICAgLy8gYXNzZXRYZmVyLmFzc2V0QW1vdW50LAogICAgLy8gc2VsbGVyUmVmZXJyZXIsCiAgICAvLyBmbG9hdCwKICAgIHN3YXAKICAgIGZyYW1lX2RpZyAtMgogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjMyOQogICAgLy8gdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMCksCiAgICBpbnRjXzAgLy8gMAogICAgY2FsbHN1YiBjaGlsZEFwcHJvdmFsQ2h1bmsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjMzMAogICAgLy8gdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMSksCiAgICBpbnRjXzEgLy8gMQogICAgY2FsbHN1YiBjaGlsZEFwcHJvdmFsQ2h1bmsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjMzMQogICAgLy8gdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMiksCiAgICBpbnRjXzMgLy8gMgogICAgY2FsbHN1YiBjaGlsZEFwcHJvdmFsQ2h1bmsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjMzMgogICAgLy8gdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMyksCiAgICBwdXNoaW50IDMKICAgIGNhbGxzdWIgY2hpbGRBcHByb3ZhbENodW5rCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozMzUKICAgIC8vIGV4dHJhUHJvZ3JhbVBhZ2VzOiB0aGlzLmNoaWxkRXh0cmFQYWdlc0F0TGVhc3QobGlzdGluZy5jbGVhclN0YXRlUHJvZ3JhbS5sZW5ndGgsIGxpc3RpbmcuZXh0cmFQcm9ncmFtUGFnZXMpLAogICAgcHVzaGludCA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozMDIKICAgIC8vIGNvbnN0IGxpc3RpbmcgPSBjb21waWxlQXJjNChMaXN0aW5nKQogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjMzNQogICAgLy8gZXh0cmFQcm9ncmFtUGFnZXM6IHRoaXMuY2hpbGRFeHRyYVBhZ2VzQXRMZWFzdChsaXN0aW5nLmNsZWFyU3RhdGVQcm9ncmFtLmxlbmd0aCwgbGlzdGluZy5leHRyYVByb2dyYW1QYWdlcyksCiAgICBjYWxsc3ViIGNoaWxkRXh0cmFQYWdlc0F0TGVhc3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjMwMgogICAgLy8gY29uc3QgbGlzdGluZyA9IGNvbXBpbGVBcmM0KExpc3RpbmcpCiAgICBwdXNoaW50IDcKICAgIGl0eG5fZmllbGQgR2xvYmFsTnVtQnl0ZVNsaWNlCiAgICBwdXNoaW50IDEzCiAgICBpdHhuX2ZpZWxkIEdsb2JhbE51bVVpbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjMwNS0zMzYKICAgIC8vIGNvbnN0IGxpc3RpbmdBcHAgPSBsaXN0aW5nLmNhbGwKICAgIC8vICAgLmNyZWF0ZSh7CiAgICAvLyAgICAgYXJnczogWwogICAgLy8gICAgICAgYXNzZXRYZmVyLnhmZXJBc3NldC5pZCwKICAgIC8vICAgICAgIGZhbHNlLAogICAgLy8gICAgICAgcHJpY2UsCiAgICAvLyAgICAgICBwYXltZW50QXNzZXQsCiAgICAvLyAgICAgICBleHBpcmF0aW9uLAogICAgLy8gICAgICAgVHhuLnNlbmRlciwKICAgIC8vICAgICAgIC8vIHRoZSBlc2Nyb3cgb3B0LWluIGlzIHBhaWQgdG8gdGhlIERBTyBhbmQgbmV2ZXIgcmVsZWFzZWQsIHNvIGl0IGlzIG5vdCByZWZ1bmRhYmxlCiAgICAvLyAgICAgICB7IGFjY291bnQ6IHBheW1lbnQuc2VuZGVyLCBhbW91bnQ6IHBheW1lbnQuYW1vdW50IC0gY29zdC5lc2Nyb3dPcHRJbiB9LAogICAgLy8gICAgICAgcmVzZXJ2ZWRGb3IsCiAgICAvLyAgICAgICBjcmVhdG9yUm95YWx0eSwKICAgIC8vICAgICAgIGdhdGVJRCwKICAgIC8vICAgICAgIG1hcmtldHBsYWNlLAogICAgLy8gICAgICAgdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSwKICAgIC8vICAgICAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgICAgICB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLAogICAgLy8gICAgICAgYXNzZXRYZmVyLmFzc2V0QW1vdW50LAogICAgLy8gICAgICAgc2VsbGVyUmVmZXJyZXIsCiAgICAvLyAgICAgICBmbG9hdCwKICAgIC8vICAgICBdLAogICAgLy8gICAgIC8vIEJveGVkIGFwcHJvdmFsIHByb2dyYW0gaW4gdXAgdG8gZm91ciA0IEtCIGNodW5rcyAoQVZNIDEzOiB1cCB0byAxNiBLQikuCiAgICAvLyAgICAgYXBwcm92YWxQcm9ncmFtOiBbCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygwKSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDEpLAogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMiksCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygzKSwKICAgIC8vICAgICBdLAogICAgLy8gICAgIGNsZWFyU3RhdGVQcm9ncmFtOiBsaXN0aW5nLmNsZWFyU3RhdGVQcm9ncmFtLAogICAgLy8gICAgIGV4dHJhUHJvZ3JhbVBhZ2VzOiB0aGlzLmNoaWxkRXh0cmFQYWdlc0F0TGVhc3QobGlzdGluZy5jbGVhclN0YXRlUHJvZ3JhbS5sZW5ndGgsIGxpc3RpbmcuZXh0cmFQcm9ncmFtUGFnZXMpLAogICAgLy8gICB9KQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgT25Db21wbGV0aW9uCiAgICBpdHhuX2ZpZWxkIEV4dHJhUHJvZ3JhbVBhZ2VzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozMDIKICAgIC8vIGNvbnN0IGxpc3RpbmcgPSBjb21waWxlQXJjNChMaXN0aW5nKQogICAgYnl0ZWMgMjkgLy8gYmFzZTY0KEM0RUJRdz09KQogICAgaXR4bl9maWVsZCBDbGVhclN0YXRlUHJvZ3JhbVBhZ2VzCiAgICB1bmNvdmVyIDMKICAgIGl0eG5fZmllbGQgQXBwcm92YWxQcm9ncmFtUGFnZXMKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHByb3ZhbFByb2dyYW1QYWdlcwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHByb3ZhbFByb2dyYW1QYWdlcwogICAgaXR4bl9maWVsZCBBcHByb3ZhbFByb2dyYW1QYWdlcwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzA1LTMzNgogICAgLy8gY29uc3QgbGlzdGluZ0FwcCA9IGxpc3RpbmcuY2FsbAogICAgLy8gICAuY3JlYXRlKHsKICAgIC8vICAgICBhcmdzOiBbCiAgICAvLyAgICAgICBhc3NldFhmZXIueGZlckFzc2V0LmlkLAogICAgLy8gICAgICAgZmFsc2UsCiAgICAvLyAgICAgICBwcmljZSwKICAgIC8vICAgICAgIHBheW1lbnRBc3NldCwKICAgIC8vICAgICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgICAgLy8gdGhlIGVzY3JvdyBvcHQtaW4gaXMgcGFpZCB0byB0aGUgREFPIGFuZCBuZXZlciByZWxlYXNlZCwgc28gaXQgaXMgbm90IHJlZnVuZGFibGUKICAgIC8vICAgICAgIHsgYWNjb3VudDogcGF5bWVudC5zZW5kZXIsIGFtb3VudDogcGF5bWVudC5hbW91bnQgLSBjb3N0LmVzY3Jvd09wdEluIH0sCiAgICAvLyAgICAgICByZXNlcnZlZEZvciwKICAgIC8vICAgICAgIGNyZWF0b3JSb3lhbHR5LAogICAgLy8gICAgICAgZ2F0ZUlELAogICAgLy8gICAgICAgbWFya2V0cGxhY2UsCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlLAogICAgLy8gICAgICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgICAgIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUsCiAgICAvLyAgICAgICBhc3NldFhmZXIuYXNzZXRBbW91bnQsCiAgICAvLyAgICAgICBzZWxsZXJSZWZlcnJlciwKICAgIC8vICAgICAgIGZsb2F0LAogICAgLy8gICAgIF0sCiAgICAvLyAgICAgLy8gQm94ZWQgYXBwcm92YWwgcHJvZ3JhbSBpbiB1cCB0byBmb3VyIDQgS0IgY2h1bmtzIChBVk0gMTM6IHVwIHRvIDE2IEtCKS4KICAgIC8vICAgICBhcHByb3ZhbFByb2dyYW06IFsKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDApLAogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMSksCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygyKSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDMpLAogICAgLy8gICAgIF0sCiAgICAvLyAgICAgY2xlYXJTdGF0ZVByb2dyYW06IGxpc3RpbmcuY2xlYXJTdGF0ZVByb2dyYW0sCiAgICAvLyAgICAgZXh0cmFQcm9ncmFtUGFnZXM6IHRoaXMuY2hpbGRFeHRyYVBhZ2VzQXRMZWFzdChsaXN0aW5nLmNsZWFyU3RhdGVQcm9ncmFtLmxlbmd0aCwgbGlzdGluZy5leHRyYVByb2dyYW1QYWdlcyksCiAgICAvLyAgIH0pCiAgICBieXRlYyAzMCAvLyBtZXRob2QgImNyZWF0ZSh1aW50NjQsYm9vbCx1aW50NjQsdWludDY0LHVpbnQ2NCxhZGRyZXNzLChhZGRyZXNzLHVpbnQ2NCksYWRkcmVzcyx1aW50NjQsdWludDY0LGFkZHJlc3Msc3RyaW5nLHVpbnQ2NCwoc3RyaW5nLHVpbnQ2NCksdWludDY0LGFkZHJlc3MsdWludDY0KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZGlnIDExCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzA5CiAgICAvLyBmYWxzZSwKICAgIGJ5dGVjIDEwIC8vIDB4MDAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDkKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDkKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDgKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDcKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDYKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTcKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDUKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTUKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjMwNS0zMzYKICAgIC8vIGNvbnN0IGxpc3RpbmdBcHAgPSBsaXN0aW5nLmNhbGwKICAgIC8vICAgLmNyZWF0ZSh7CiAgICAvLyAgICAgYXJnczogWwogICAgLy8gICAgICAgYXNzZXRYZmVyLnhmZXJBc3NldC5pZCwKICAgIC8vICAgICAgIGZhbHNlLAogICAgLy8gICAgICAgcHJpY2UsCiAgICAvLyAgICAgICBwYXltZW50QXNzZXQsCiAgICAvLyAgICAgICBleHBpcmF0aW9uLAogICAgLy8gICAgICAgVHhuLnNlbmRlciwKICAgIC8vICAgICAgIC8vIHRoZSBlc2Nyb3cgb3B0LWluIGlzIHBhaWQgdG8gdGhlIERBTyBhbmQgbmV2ZXIgcmVsZWFzZWQsIHNvIGl0IGlzIG5vdCByZWZ1bmRhYmxlCiAgICAvLyAgICAgICB7IGFjY291bnQ6IHBheW1lbnQuc2VuZGVyLCBhbW91bnQ6IHBheW1lbnQuYW1vdW50IC0gY29zdC5lc2Nyb3dPcHRJbiB9LAogICAgLy8gICAgICAgcmVzZXJ2ZWRGb3IsCiAgICAvLyAgICAgICBjcmVhdG9yUm95YWx0eSwKICAgIC8vICAgICAgIGdhdGVJRCwKICAgIC8vICAgICAgIG1hcmtldHBsYWNlLAogICAgLy8gICAgICAgdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSwKICAgIC8vICAgICAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgICAgICB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLAogICAgLy8gICAgICAgYXNzZXRYZmVyLmFzc2V0QW1vdW50LAogICAgLy8gICAgICAgc2VsbGVyUmVmZXJyZXIsCiAgICAvLyAgICAgICBmbG9hdCwKICAgIC8vICAgICBdLAogICAgLy8gICAgIC8vIEJveGVkIGFwcHJvdmFsIHByb2dyYW0gaW4gdXAgdG8gZm91ciA0IEtCIGNodW5rcyAoQVZNIDEzOiB1cCB0byAxNiBLQikuCiAgICAvLyAgICAgYXBwcm92YWxQcm9ncmFtOiBbCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygwKSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDEpLAogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMiksCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygzKSwKICAgIC8vICAgICBdLAogICAgLy8gICAgIGNsZWFyU3RhdGVQcm9ncmFtOiBsaXN0aW5nLmNsZWFyU3RhdGVQcm9ncmFtLAogICAgLy8gICAgIGV4dHJhUHJvZ3JhbVBhZ2VzOiB0aGlzLmNoaWxkRXh0cmFQYWdlc0F0TGVhc3QobGlzdGluZy5jbGVhclN0YXRlUHJvZ3JhbS5sZW5ndGgsIGxpc3RpbmcuZXh0cmFQcm9ncmFtUGFnZXMpLAogICAgLy8gICB9KQogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjMwNS0zMzgKICAgIC8vIGNvbnN0IGxpc3RpbmdBcHAgPSBsaXN0aW5nLmNhbGwKICAgIC8vICAgLmNyZWF0ZSh7CiAgICAvLyAgICAgYXJnczogWwogICAgLy8gICAgICAgYXNzZXRYZmVyLnhmZXJBc3NldC5pZCwKICAgIC8vICAgICAgIGZhbHNlLAogICAgLy8gICAgICAgcHJpY2UsCiAgICAvLyAgICAgICBwYXltZW50QXNzZXQsCiAgICAvLyAgICAgICBleHBpcmF0aW9uLAogICAgLy8gICAgICAgVHhuLnNlbmRlciwKICAgIC8vICAgICAgIC8vIHRoZSBlc2Nyb3cgb3B0LWluIGlzIHBhaWQgdG8gdGhlIERBTyBhbmQgbmV2ZXIgcmVsZWFzZWQsIHNvIGl0IGlzIG5vdCByZWZ1bmRhYmxlCiAgICAvLyAgICAgICB7IGFjY291bnQ6IHBheW1lbnQuc2VuZGVyLCBhbW91bnQ6IHBheW1lbnQuYW1vdW50IC0gY29zdC5lc2Nyb3dPcHRJbiB9LAogICAgLy8gICAgICAgcmVzZXJ2ZWRGb3IsCiAgICAvLyAgICAgICBjcmVhdG9yUm95YWx0eSwKICAgIC8vICAgICAgIGdhdGVJRCwKICAgIC8vICAgICAgIG1hcmtldHBsYWNlLAogICAgLy8gICAgICAgdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSwKICAgIC8vICAgICAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgICAgICB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLAogICAgLy8gICAgICAgYXNzZXRYZmVyLmFzc2V0QW1vdW50LAogICAgLy8gICAgICAgc2VsbGVyUmVmZXJyZXIsCiAgICAvLyAgICAgICBmbG9hdCwKICAgIC8vICAgICBdLAogICAgLy8gICAgIC8vIEJveGVkIGFwcHJvdmFsIHByb2dyYW0gaW4gdXAgdG8gZm91ciA0IEtCIGNodW5rcyAoQVZNIDEzOiB1cCB0byAxNiBLQikuCiAgICAvLyAgICAgYXBwcm92YWxQcm9ncmFtOiBbCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygwKSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDEpLAogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMiksCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygzKSwKICAgIC8vICAgICBdLAogICAgLy8gICAgIGNsZWFyU3RhdGVQcm9ncmFtOiBsaXN0aW5nLmNsZWFyU3RhdGVQcm9ncmFtLAogICAgLy8gICAgIGV4dHJhUHJvZ3JhbVBhZ2VzOiB0aGlzLmNoaWxkRXh0cmFQYWdlc0F0TGVhc3QobGlzdGluZy5jbGVhclN0YXRlUHJvZ3JhbS5sZW5ndGgsIGxpc3RpbmcuZXh0cmFQcm9ncmFtUGFnZXMpLAogICAgLy8gICB9KQogICAgLy8gICAuaXR4bgogICAgLy8gICAuY3JlYXRlZEFwcAogICAgZ2l0eG4gMCBDcmVhdGVkQXBwbGljYXRpb25JRAogICAgZHVwCiAgICBjb3ZlciA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozNDEtMzQ2CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogbGlzdGluZ0FwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogR2xvYmFsLm1pbkJhbGFuY2UgKyBjb3N0LmRpc2J1cnNlbWVudAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjM0MwogICAgLy8gcmVjZWl2ZXI6IGxpc3RpbmdBcHAuYWRkcmVzcywKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzQ0CiAgICAvLyBhbW91bnQ6IEdsb2JhbC5taW5CYWxhbmNlICsgY29zdC5kaXNidXJzZW1lbnQKICAgIGdsb2JhbCBNaW5CYWxhbmNlCiAgICB1bmNvdmVyIDUKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICArCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzQxLTM0NQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IGxpc3RpbmdBcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IEdsb2JhbC5taW5CYWxhbmNlICsgY29zdC5kaXNidXJzZW1lbnQKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjM0MS0zNDYKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBsaXN0aW5nQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBHbG9iYWwubWluQmFsYW5jZSArIGNvc3QuZGlzYnVyc2VtZW50CiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjM0OS0zNTgKICAgIC8vIGxpc3RpbmcuY2FsbC5vcHRpbih7CiAgICAvLyAgIGFwcElkOiBsaXN0aW5nQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBsaXN0aW5nQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSwKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBhc3NldFhmZXIueGZlckFzc2V0LmlkLAogICAgLy8gICBdLAogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjM1MwogICAgLy8gcmVjZWl2ZXI6IGxpc3RpbmdBcHAuYWRkcmVzcywKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzU0CiAgICAvLyBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSwKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjM1Mi0zNTUKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBsaXN0aW5nQXBwLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlLAogICAgLy8gfSksCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozNDktMzU4CiAgICAvLyBsaXN0aW5nLmNhbGwub3B0aW4oewogICAgLy8gICBhcHBJZDogbGlzdGluZ0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogbGlzdGluZ0FwcC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UsCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgYXNzZXRYZmVyLnhmZXJBc3NldC5pZCwKICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIE9uQ29tcGxldGlvbgogICAgZHVwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIGJ5dGVjIDE2IC8vIG1ldGhvZCAib3B0aW4ocGF5LHVpbnQ2NCl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzYxLTM2NwogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogbGlzdGluZ0FwcC5hZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhc3NldFhmZXIuYXNzZXRBbW91bnQsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldFhmZXIueGZlckFzc2V0LAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjM2MwogICAgLy8gYXNzZXRSZWNlaXZlcjogbGlzdGluZ0FwcC5hZGRyZXNzLAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozNjEtMzY2CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBsaXN0aW5nQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFzc2V0WGZlci5hc3NldEFtb3VudCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0WGZlci54ZmVyQXNzZXQsCiAgICAvLyAgIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6MzYxLTM2NwogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogbGlzdGluZ0FwcC5hZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhc3NldFhmZXIuYXNzZXRBbW91bnQsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldFhmZXIueGZlckFzc2V0LAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozNjkKICAgIC8vIGlmICghaXNBbGdvUGF5bWVudCkgewogICAgZnJhbWVfZGlnIC05CiAgICBieiBsaXN0SW1wbF9hZnRlcl9pZl9lbHNlQDIzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozNzEtMzgwCiAgICAvLyBsaXN0aW5nLmNhbGwub3B0aW4oewogICAgLy8gICBhcHBJZDogbGlzdGluZ0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogbGlzdGluZ0FwcC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UsCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgcGF5bWVudEFzc2V0LAogICAgLy8gICBdLAogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjM3NQogICAgLy8gcmVjZWl2ZXI6IGxpc3RpbmdBcHAuYWRkcmVzcywKICAgIGR1cG4gMgogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6Mzc2CiAgICAvLyBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSwKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjM3NC0zNzcKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBsaXN0aW5nQXBwLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlLAogICAgLy8gfSksCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozNzEtMzgwCiAgICAvLyBsaXN0aW5nLmNhbGwub3B0aW4oewogICAgLy8gICBhcHBJZDogbGlzdGluZ0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogbGlzdGluZ0FwcC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UsCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgcGF5bWVudEFzc2V0LAogICAgLy8gICBdLAogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgT25Db21wbGV0aW9uCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIGJ5dGVjIDE2IC8vIG1ldGhvZCAib3B0aW4ocGF5LHVpbnQ2NCl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGZyYW1lX2RpZyAwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjM4MwogICAgLy8gaWYgKCF0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLmlzT3B0ZWRJbihBc3NldChwYXltZW50QXNzZXQpKSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjXzIgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjM4MwogICAgLy8gaWYgKCF0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLmlzT3B0ZWRJbihBc3NldChwYXltZW50QXNzZXQpKSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMyAvLyAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZnJhbWVfZGlnIC05CiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYm56IGxpc3RJbXBsX2FmdGVyX2lmX2Vsc2VAMjMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjM4NAogICAgLy8gdGhpcy5vcHRBa2l0YUVzY3Jvd0luQW5kU2VuZChBc3NldChwYXltZW50QXNzZXQpLCAwKQogICAgZnJhbWVfZGlnIC05CiAgICBpbnRjXzAgLy8gMAogICAgY2FsbHN1YiBvcHRBa2l0YUVzY3Jvd0luQW5kU2VuZAogICAgcG9wCgpsaXN0SW1wbF9hZnRlcl9pZl9lbHNlQDIzOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6Mzg4CiAgICAvLyByZXR1cm4gbGlzdGluZ0FwcC5pZAogICAgZnJhbWVfZGlnIC0zCiAgICBmcmFtZV9idXJ5IDEKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpsaXN0SW1wbF9hZnRlcl9pZl9lbHNlQDI2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NDctNjU3CiAgICAvLyBjb25zdCBjcmVhdG9yUm95YWx0eVN0cmluZyA9IGFiaUNhbGw8dHlwZW9mIE1ldGEucHJvdG90eXBlLnZlcmlmaWVkTXVzdFJlYWQ+KHsKICAgIC8vICAgYXBwSWQ6IGdldEFraXRhQXBwTGlzdChha2l0YURBTykubWV0YU1lcmtsZXMsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBhc3NldC5jcmVhdG9yLAogICAgLy8gICAgIG5hbWUsCiAgICAvLyAgICAgc2hhMjU2KHNoYTI1NihpdG9iKGFzc2V0LmlkKSkpLAogICAgLy8gICAgIHByb29mLAogICAgLy8gICAgIDEsCiAgICAvLyAgICAgJ3JveWFsdHknLAogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NTAKICAgIC8vIGFzc2V0LmNyZWF0b3IsCiAgICBkdXBuIDIKICAgIGFzc2V0X3BhcmFtc19nZXQgQXNzZXRDcmVhdG9yCiAgICBhc3NlcnQgLy8gYXNzZXQgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY1MQogICAgLy8gbmFtZSwKICAgIGZyYW1lX2RpZyAtNAogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgZnJhbWVfZGlnIC00CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjUyCiAgICAvLyBzaGEyNTYoc2hhMjU2KGl0b2IoYXNzZXQuaWQpKSksCiAgICB1bmNvdmVyIDIKICAgIGl0b2IKICAgIHNoYTI1NgogICAgc2hhMjU2CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY1NAogICAgLy8gMSwKICAgIGludGNfMSAvLyAxCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIwNgogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgdW5jb3ZlciA1CiAgICBieXRlYyA0IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY0OAogICAgLy8gYXBwSWQ6IGdldEFraXRhQXBwTGlzdChha2l0YURBTykubWV0YU1lcmtsZXMsCiAgICBwdXNoaW50IDcyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY0Ny02NTcKICAgIC8vIGNvbnN0IGNyZWF0b3JSb3lhbHR5U3RyaW5nID0gYWJpQ2FsbDx0eXBlb2YgTWV0YS5wcm90b3R5cGUudmVyaWZpZWRNdXN0UmVhZD4oewogICAgLy8gICBhcHBJZDogZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5tZXRhTWVya2xlcywKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGFzc2V0LmNyZWF0b3IsCiAgICAvLyAgICAgbmFtZSwKICAgIC8vICAgICBzaGEyNTYoc2hhMjU2KGl0b2IoYXNzZXQuaWQpKSksCiAgICAvLyAgICAgcHJvb2YsCiAgICAvLyAgICAgMSwKICAgIC8vICAgICAncm95YWx0eScsCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBwdXNoYnl0ZXMgMHgxZmY3Yzc0YyAvLyBtZXRob2QgInZlcmlmaWVkTXVzdFJlYWQoYWRkcmVzcyxzdHJpbmcsYnl0ZVszMl0sYnl0ZVszMl1bXSx1aW50NjQsc3RyaW5nKXN0cmluZyIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC0zCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjU1CiAgICAvLyAncm95YWx0eScsCiAgICBwdXNoYnl0ZXMgMHgwMDA3NzI2Zjc5NjE2Yzc0NzkKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY0Ny02NTcKICAgIC8vIGNvbnN0IGNyZWF0b3JSb3lhbHR5U3RyaW5nID0gYWJpQ2FsbDx0eXBlb2YgTWV0YS5wcm90b3R5cGUudmVyaWZpZWRNdXN0UmVhZD4oewogICAgLy8gICBhcHBJZDogZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5tZXRhTWVya2xlcywKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGFzc2V0LmNyZWF0b3IsCiAgICAvLyAgICAgbmFtZSwKICAgIC8vICAgICBzaGEyNTYoc2hhMjU2KGl0b2IoYXNzZXQuaWQpKSksCiAgICAvLyAgICAgcHJvb2YsCiAgICAvLyAgICAgMSwKICAgIC8vICAgICAncm95YWx0eScsCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBkaWcgMQogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjXzMgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzdHJpbmcKICAgIGV4dHJhY3QgNiAwCiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NTkKICAgIC8vIGlmIChCeXRlcyhjcmVhdG9yUm95YWx0eVN0cmluZykubGVuZ3RoID4gMCkgewogICAgbGVuCiAgICBieiBsaXN0SW1wbF9hZnRlcl9pZl9lbHNlQDI4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY2MAogICAgLy8gY3JlYXRvclJveWFsdHkgPSBidG9pKEJ5dGVzKGNyZWF0b3JSb3lhbHR5U3RyaW5nKSkKICAgIGZyYW1lX2RpZyAxCiAgICBidG9pCiAgICBmcmFtZV9idXJ5IDIKCmxpc3RJbXBsX2FmdGVyX2lmX2Vsc2VAMjg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY2MwogICAgLy8gaWYgKGNyZWF0b3JSb3lhbHR5ID4gQ3JlYXRvclJveWFsdHlNYXhpbXVtU2luZ2xlKSB7CiAgICBmcmFtZV9kaWcgMgogICAgaW50YyA3IC8vIDUwMDAwCiAgICA+CiAgICBieiBsaXN0SW1wbF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnJveWFsdGllc0AzMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NjQKICAgIC8vIHJldHVybiBDcmVhdG9yUm95YWx0eU1heGltdW1TaW5nbGUKICAgIGludGMgNyAvLyA1MDAwMAogICAgZnJhbWVfYnVyeSAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozMDAKICAgIC8vIGNvbnN0IGNyZWF0b3JSb3lhbHR5ID0gcm95YWx0aWVzKHRoaXMuYWtpdGFEQU8udmFsdWUsIGFzc2V0WGZlci54ZmVyQXNzZXQsIG5hbWUsIHByb29mKQogICAgYiBsaXN0SW1wbF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnJveWFsdGllc0AzMQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjpNYXJrZXRwbGFjZS5saXN0UHJpemVCb3hJbXBsKHByaXplQm94VHJhbnNmZXJUeG46IHVpbnQ2NCwgcGF5bWVudDogdWludDY0LCBwcmljZTogdWludDY0LCBwYXltZW50QXNzZXQ6IHVpbnQ2NCwgZXhwaXJhdGlvbjogdWludDY0LCByZXNlcnZlZEZvcjogYnl0ZXMsIGdhdGVJRDogdWludDY0LCBtYXJrZXRwbGFjZTogYnl0ZXMsIHNlbGxlclJlZmVycmVyOiBieXRlcywgbGVnYWN5UGF5bWVudDogdWludDY0KSAtPiB1aW50NjQ6Cmxpc3RQcml6ZUJveEltcGw6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czozOTItNDAzCiAgICAvLyBwcml2YXRlIGxpc3RQcml6ZUJveEltcGwoCiAgICAvLyAgIHByaXplQm94VHJhbnNmZXJUeG46IGd0eG4uQXBwbGljYXRpb25DYWxsVHhuLAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIHByaWNlOiB1aW50NjQsCiAgICAvLyAgIHBheW1lbnRBc3NldDogdWludDY0LAogICAgLy8gICBleHBpcmF0aW9uOiB1aW50NjQsCiAgICAvLyAgIHJlc2VydmVkRm9yOiBBY2NvdW50LAogICAgLy8gICBnYXRlSUQ6IHVpbnQ2NCwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQsCiAgICAvLyAgIHNlbGxlclJlZmVycmVyOiBBY2NvdW50LAogICAgLy8gICBsZWdhY3lQYXltZW50OiBib29sZWFuCiAgICAvLyApOiB1aW50NjQgewogICAgcHJvdG8gMTAgMQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQwNAogICAgLy8gbG9nZ2VkQXNzZXJ0KHByaWNlID49IExpc3RpbmdNaW5pbXVtUHJpY2UsIGVyclByaWNlVG9vTG93KQogICAgZnJhbWVfZGlnIC04CiAgICBwdXNoaW50IDQKICAgID49CiAgICBibnogbGlzdFByaXplQm94SW1wbF9hZnRlcl9hc3NlcnRAMgogICAgYnl0ZWMgMjggLy8gIkVSUjplcnJQcmxvIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclBybG8KCmxpc3RQcml6ZUJveEltcGxfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo2NgogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDA1CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5ib3hlZENvbnRyYWN0LmV4aXN0cywgZXJyQ29udHJhY3ROb3RTZXQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBsaXN0UHJpemVCb3hJbXBsX2FmdGVyX2Fzc2VydEA0CiAgICBieXRlYyA4IC8vICJFUlI6ZXJyQ25zdCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJDbnN0CgpsaXN0UHJpemVCb3hJbXBsX2FmdGVyX2Fzc2VydEA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDA4CiAgICAvLyBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBQcml6ZUJveC5wcm90b3R5cGUudHJhbnNmZXI+KCkgJiYKICAgIGZyYW1lX2RpZyAtMTAKICAgIGd0eG5zYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgYnl0ZWMgMzEgLy8gbWV0aG9kICJ0cmFuc2ZlcihhZGRyZXNzKXZvaWQiCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDA4LTQwOQogICAgLy8gcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgUHJpemVCb3gucHJvdG90eXBlLnRyYW5zZmVyPigpICYmCiAgICAvLyBwcml6ZUJveFRyYW5zZmVyVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wCiAgICBieiBsaXN0UHJpemVCb3hJbXBsX2Jvb2xfZmFsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDA5CiAgICAvLyBwcml6ZUJveFRyYW5zZmVyVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wCiAgICBmcmFtZV9kaWcgLTEwCiAgICBndHhucyBPbkNvbXBsZXRpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQwOC00MDkKICAgIC8vIHByaXplQm94VHJhbnNmZXJUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIFByaXplQm94LnByb3RvdHlwZS50cmFuc2Zlcj4oKSAmJgogICAgLy8gcHJpemVCb3hUcmFuc2ZlclR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcAogICAgYm56IGxpc3RQcml6ZUJveEltcGxfYm9vbF9mYWxzZUA3CiAgICBpbnRjXzEgLy8gMQoKbGlzdFByaXplQm94SW1wbF9ib29sX21lcmdlQDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0MDctNDEwCiAgICAvLyBsb2dnZWRBc3NlcnQoKAogICAgLy8gICBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBQcml6ZUJveC5wcm90b3R5cGUudHJhbnNmZXI+KCkgJiYKICAgIC8vICAgcHJpemVCb3hUcmFuc2ZlclR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcAogICAgLy8gKSwgZXJyQmFkTWV0aG9kUHJpemVCb3hUcmFuc2Zlck5lZWRlZCkKICAgIGJueiBsaXN0UHJpemVCb3hJbXBsX2FmdGVyX2Fzc2VydEAxMAogICAgcHVzaGJ5dGVzICJFUlI6ZXJyQm1wdCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJCbXB0CgpsaXN0UHJpemVCb3hJbXBsX2FmdGVyX2Fzc2VydEAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQxMgogICAgLy8gbG9nZ2VkQXNzZXJ0KHByaXplQm94VHJhbnNmZXJUeG4uc2VuZGVyID09PSBUeG4uc2VuZGVyLCBlcnJOb3RQcml6ZUJveE93bmVyKQogICAgZnJhbWVfZGlnIC0xMAogICAgZ3R4bnMgU2VuZGVyCiAgICB0eG4gU2VuZGVyCiAgICA9PQogICAgYm56IGxpc3RQcml6ZUJveEltcGxfYWZ0ZXJfYXNzZXJ0QDEyCiAgICBieXRlYyAzMiAvLyAiRVJSOmVyck5wYm8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTnBibwoKbGlzdFByaXplQm94SW1wbF9hZnRlcl9hc3NlcnRAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0MTMKICAgIC8vIGxvZ2dlZEFzc2VydChnZXRQcml6ZUJveE93bmVyKHRoaXMuYWtpdGFEQU8udmFsdWUsIHByaXplQm94VHJhbnNmZXJUeG4uYXBwSWQpID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJyTm90UHJpemVCb3hPd25lcikKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0MTMKICAgIC8vIGxvZ2dlZEFzc2VydChnZXRQcml6ZUJveE93bmVyKHRoaXMuYWtpdGFEQU8udmFsdWUsIHByaXplQm94VHJhbnNmZXJUeG4uYXBwSWQpID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJyTm90UHJpemVCb3hPd25lcikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBmcmFtZV9kaWcgLTEwCiAgICBndHhucyBBcHBsaWNhdGlvbklECiAgICBkdXAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjcxCiAgICAvLyBhc3NlcnQocHJpemVCb3guY3JlYXRvciA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5wcml6ZUJveCkuYWRkcmVzcywgZXJyTm90QVByaXplQm94KQogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBDcmVhdG9yCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIwNgogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgdW5jb3ZlciAyCiAgICBieXRlYyA0IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY3MQogICAgLy8gYXNzZXJ0KHByaXplQm94LmNyZWF0b3IgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykucHJpemVCb3gpLmFkZHJlc3MsIGVyck5vdEFQcml6ZUJveCkKICAgIHB1c2hpbnQgMjQKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYXNzZXJ0IC8vIGVyck5hcGIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjcyCiAgICAvLyBjb25zdCBbb3duZXJCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhwcml6ZUJveCwgQnl0ZXMoUHJpemVCb3hHbG9iYWxTdGF0ZUtleU93bmVyKSkKICAgIHB1c2hieXRlcyAib3duZXIiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0MTMKICAgIC8vIGxvZ2dlZEFzc2VydChnZXRQcml6ZUJveE93bmVyKHRoaXMuYWtpdGFEQU8udmFsdWUsIHByaXplQm94VHJhbnNmZXJUeG4uYXBwSWQpID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJyTm90UHJpemVCb3hPd25lcikKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IGxpc3RQcml6ZUJveEltcGxfYWZ0ZXJfYXNzZXJ0QDE0CiAgICBieXRlYyAzMiAvLyAiRVJSOmVyck5wYm8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTnBibwoKbGlzdFByaXplQm94SW1wbF9hZnRlcl9hc3NlcnRAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0MTUKICAgIC8vIGNvbnN0IGlzQWxnb1BheW1lbnQgPSBwYXltZW50QXNzZXQgPT09IDAKICAgIGZyYW1lX2RpZyAtNwogICAgIQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDE2CiAgICAvLyBjb25zdCBjb3N0ID0gY2xvbmUodGhpcy5saXN0aW5nQ29zdCgwLCBwYXltZW50QXNzZXQsIHRydWUpKQogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2RpZyAtNwogICAgaW50Y18xIC8vIDEKICAgIGNhbGxzdWIgbGlzdGluZ0Nvc3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQxOAogICAgLy8gY29uc3QgZmxvYXQgPSB0aGlzLmFzc2VydExpc3RpbmdQYXltZW50KHBheW1lbnQsIGNvc3QsIGlzQWxnb1BheW1lbnQsIHRydWUsIGxlZ2FjeVBheW1lbnQpCiAgICBmcmFtZV9kaWcgLTkKICAgIHN3YXAKICAgIHVuY292ZXIgMgogICAgaW50Y18xIC8vIDEKICAgIGZyYW1lX2RpZyAtMQogICAgY2FsbHN1YiBhc3NlcnRMaXN0aW5nUGF5bWVudAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDIzLTQ1MwogICAgLy8gY29uc3QgbGlzdGluZ0FwcCA9IGxpc3RpbmcuY2FsbAogICAgLy8gICAuY3JlYXRlKHsKICAgIC8vICAgICBhcmdzOiBbCiAgICAvLyAgICAgICBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcElkLmlkLAogICAgLy8gICAgICAgdHJ1ZSwKICAgIC8vICAgICAgIHByaWNlLAogICAgLy8gICAgICAgcGF5bWVudEFzc2V0LAogICAgLy8gICAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgICB7IGFjY291bnQ6IHBheW1lbnQuc2VuZGVyLCBhbW91bnQ6IHBheW1lbnQuYW1vdW50IC0gY29zdC5lc2Nyb3dPcHRJbiB9LAogICAgLy8gICAgICAgcmVzZXJ2ZWRGb3IsCiAgICAvLyAgICAgICAwLAogICAgLy8gICAgICAgZ2F0ZUlELAogICAgLy8gICAgICAgbWFya2V0cGxhY2UsCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlLAogICAgLy8gICAgICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgICAgIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUsCiAgICAvLyAgICAgICAwLAogICAgLy8gICAgICAgc2VsbGVyUmVmZXJyZXIsCiAgICAvLyAgICAgICBmbG9hdCwKICAgIC8vICAgICBdLAogICAgLy8gICAgIC8vIEJveGVkIGFwcHJvdmFsIHByb2dyYW0gaW4gdXAgdG8gZm91ciA0IEtCIGNodW5rcyAoQVZNIDEzOiB1cCB0byAxNiBLQikuCiAgICAvLyAgICAgYXBwcm92YWxQcm9ncmFtOiBbCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygwKSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDEpLAogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMiksCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygzKSwKICAgIC8vICAgICBdLAogICAgLy8gICAgIGNsZWFyU3RhdGVQcm9ncmFtOiBsaXN0aW5nLmNsZWFyU3RhdGVQcm9ncmFtLAogICAgLy8gICAgIGV4dHJhUHJvZ3JhbVBhZ2VzOiB0aGlzLmNoaWxkRXh0cmFQYWdlc0F0TGVhc3QobGlzdGluZy5jbGVhclN0YXRlUHJvZ3JhbS5sZW5ndGgsIGxpc3RpbmcuZXh0cmFQcm9ncmFtUGFnZXMpLAogICAgLy8gICB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDI2CiAgICAvLyBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcElkLmlkLAogICAgZGlnIDIKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQyOAogICAgLy8gcHJpY2UsCiAgICBmcmFtZV9kaWcgLTgKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQyOQogICAgLy8gcGF5bWVudEFzc2V0LAogICAgZnJhbWVfZGlnIC03CiAgICBpdG9iCiAgICBkdXAKICAgIGNvdmVyIDQKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDMwCiAgICAvLyBleHBpcmF0aW9uLAogICAgZnJhbWVfZGlnIC02CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0MzEKICAgIC8vIFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0MzIKICAgIC8vIHsgYWNjb3VudDogcGF5bWVudC5zZW5kZXIsIGFtb3VudDogcGF5bWVudC5hbW91bnQgLSBjb3N0LmVzY3Jvd09wdEluIH0sCiAgICBmcmFtZV9kaWcgLTkKICAgIGd0eG5zIFNlbmRlcgogICAgZnJhbWVfZGlnIC05CiAgICBndHhucyBBbW91bnQKICAgIGRpZyA2CiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIC0KICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDM0CiAgICAvLyAwLAogICAgaW50Y18wIC8vIDAKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQzNQogICAgLy8gZ2F0ZUlELAogICAgZnJhbWVfZGlnIC00CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0MzcKICAgIC8vIHRoaXMuY2hpbGRDb250cmFjdFZlcnNpb24udmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjIKICAgIC8vIGNoaWxkQ29udHJhY3RWZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogQmFzZUZhY3RvcnlHbG9iYWxTdGF0ZUtleUNoaWxkQ29udHJhY3RWZXJzaW9uIH0pCiAgICBieXRlYyA5IC8vICJjaGlsZF9jb250cmFjdF92ZXJzaW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDM3CiAgICAvLyB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGR1cAogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0MzgKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDM4CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQzOQogICAgLy8gdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlY18yIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0MzkKICAgIC8vIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDQyCiAgICAvLyBmbG9hdCwKICAgIHVuY292ZXIgMTIKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQ0MC00NDIKICAgIC8vIDAsCiAgICAvLyBzZWxsZXJSZWZlcnJlciwKICAgIC8vIGZsb2F0LAogICAgZGlnIDUKICAgIGZyYW1lX2RpZyAtMgogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQ0NgogICAgLy8gdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMCksCiAgICBpbnRjXzAgLy8gMAogICAgY2FsbHN1YiBjaGlsZEFwcHJvdmFsQ2h1bmsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQ0NwogICAgLy8gdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMSksCiAgICBpbnRjXzEgLy8gMQogICAgY2FsbHN1YiBjaGlsZEFwcHJvdmFsQ2h1bmsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQ0OAogICAgLy8gdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMiksCiAgICBpbnRjXzMgLy8gMgogICAgY2FsbHN1YiBjaGlsZEFwcHJvdmFsQ2h1bmsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQ0OQogICAgLy8gdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMyksCiAgICBwdXNoaW50IDMKICAgIGNhbGxzdWIgY2hpbGRBcHByb3ZhbENodW5rCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0NTIKICAgIC8vIGV4dHJhUHJvZ3JhbVBhZ2VzOiB0aGlzLmNoaWxkRXh0cmFQYWdlc0F0TGVhc3QobGlzdGluZy5jbGVhclN0YXRlUHJvZ3JhbS5sZW5ndGgsIGxpc3RpbmcuZXh0cmFQcm9ncmFtUGFnZXMpLAogICAgcHVzaGludCA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0MjAKICAgIC8vIGNvbnN0IGxpc3RpbmcgPSBjb21waWxlQXJjNChMaXN0aW5nKQogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQ1MgogICAgLy8gZXh0cmFQcm9ncmFtUGFnZXM6IHRoaXMuY2hpbGRFeHRyYVBhZ2VzQXRMZWFzdChsaXN0aW5nLmNsZWFyU3RhdGVQcm9ncmFtLmxlbmd0aCwgbGlzdGluZy5leHRyYVByb2dyYW1QYWdlcyksCiAgICBjYWxsc3ViIGNoaWxkRXh0cmFQYWdlc0F0TGVhc3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQyMAogICAgLy8gY29uc3QgbGlzdGluZyA9IGNvbXBpbGVBcmM0KExpc3RpbmcpCiAgICBwdXNoaW50IDcKICAgIGl0eG5fZmllbGQgR2xvYmFsTnVtQnl0ZVNsaWNlCiAgICBwdXNoaW50IDEzCiAgICBpdHhuX2ZpZWxkIEdsb2JhbE51bVVpbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQyMy00NTMKICAgIC8vIGNvbnN0IGxpc3RpbmdBcHAgPSBsaXN0aW5nLmNhbGwKICAgIC8vICAgLmNyZWF0ZSh7CiAgICAvLyAgICAgYXJnczogWwogICAgLy8gICAgICAgcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBJZC5pZCwKICAgIC8vICAgICAgIHRydWUsCiAgICAvLyAgICAgICBwcmljZSwKICAgIC8vICAgICAgIHBheW1lbnRBc3NldCwKICAgIC8vICAgICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgICAgeyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiBwYXltZW50LmFtb3VudCAtIGNvc3QuZXNjcm93T3B0SW4gfSwKICAgIC8vICAgICAgIHJlc2VydmVkRm9yLAogICAgLy8gICAgICAgMCwKICAgIC8vICAgICAgIGdhdGVJRCwKICAgIC8vICAgICAgIG1hcmtldHBsYWNlLAogICAgLy8gICAgICAgdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSwKICAgIC8vICAgICAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgICAgICB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLAogICAgLy8gICAgICAgMCwKICAgIC8vICAgICAgIHNlbGxlclJlZmVycmVyLAogICAgLy8gICAgICAgZmxvYXQsCiAgICAvLyAgICAgXSwKICAgIC8vICAgICAvLyBCb3hlZCBhcHByb3ZhbCBwcm9ncmFtIGluIHVwIHRvIGZvdXIgNCBLQiBjaHVua3MgKEFWTSAxMzogdXAgdG8gMTYgS0IpLgogICAgLy8gICAgIGFwcHJvdmFsUHJvZ3JhbTogWwogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMCksCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygxKSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDIpLAogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMyksCiAgICAvLyAgICAgXSwKICAgIC8vICAgICBjbGVhclN0YXRlUHJvZ3JhbTogbGlzdGluZy5jbGVhclN0YXRlUHJvZ3JhbSwKICAgIC8vICAgICBleHRyYVByb2dyYW1QYWdlczogdGhpcy5jaGlsZEV4dHJhUGFnZXNBdExlYXN0KGxpc3RpbmcuY2xlYXJTdGF0ZVByb2dyYW0ubGVuZ3RoLCBsaXN0aW5nLmV4dHJhUHJvZ3JhbVBhZ2VzKSwKICAgIC8vICAgfSkKICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIE9uQ29tcGxldGlvbgogICAgaXR4bl9maWVsZCBFeHRyYVByb2dyYW1QYWdlcwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDIwCiAgICAvLyBjb25zdCBsaXN0aW5nID0gY29tcGlsZUFyYzQoTGlzdGluZykKICAgIGJ5dGVjIDI5IC8vIGJhc2U2NChDNEVCUXc9PSkKICAgIGl0eG5fZmllbGQgQ2xlYXJTdGF0ZVByb2dyYW1QYWdlcwogICAgdW5jb3ZlciAzCiAgICBpdHhuX2ZpZWxkIEFwcHJvdmFsUHJvZ3JhbVBhZ2VzCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwcm92YWxQcm9ncmFtUGFnZXMKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwcm92YWxQcm9ncmFtUGFnZXMKICAgIGl0eG5fZmllbGQgQXBwcm92YWxQcm9ncmFtUGFnZXMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQyMy00NTMKICAgIC8vIGNvbnN0IGxpc3RpbmdBcHAgPSBsaXN0aW5nLmNhbGwKICAgIC8vICAgLmNyZWF0ZSh7CiAgICAvLyAgICAgYXJnczogWwogICAgLy8gICAgICAgcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBJZC5pZCwKICAgIC8vICAgICAgIHRydWUsCiAgICAvLyAgICAgICBwcmljZSwKICAgIC8vICAgICAgIHBheW1lbnRBc3NldCwKICAgIC8vICAgICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgICAgeyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiBwYXltZW50LmFtb3VudCAtIGNvc3QuZXNjcm93T3B0SW4gfSwKICAgIC8vICAgICAgIHJlc2VydmVkRm9yLAogICAgLy8gICAgICAgMCwKICAgIC8vICAgICAgIGdhdGVJRCwKICAgIC8vICAgICAgIG1hcmtldHBsYWNlLAogICAgLy8gICAgICAgdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSwKICAgIC8vICAgICAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgICAgICB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLAogICAgLy8gICAgICAgMCwKICAgIC8vICAgICAgIHNlbGxlclJlZmVycmVyLAogICAgLy8gICAgICAgZmxvYXQsCiAgICAvLyAgICAgXSwKICAgIC8vICAgICAvLyBCb3hlZCBhcHByb3ZhbCBwcm9ncmFtIGluIHVwIHRvIGZvdXIgNCBLQiBjaHVua3MgKEFWTSAxMzogdXAgdG8gMTYgS0IpLgogICAgLy8gICAgIGFwcHJvdmFsUHJvZ3JhbTogWwogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMCksCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygxKSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDIpLAogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMyksCiAgICAvLyAgICAgXSwKICAgIC8vICAgICBjbGVhclN0YXRlUHJvZ3JhbTogbGlzdGluZy5jbGVhclN0YXRlUHJvZ3JhbSwKICAgIC8vICAgICBleHRyYVByb2dyYW1QYWdlczogdGhpcy5jaGlsZEV4dHJhUGFnZXNBdExlYXN0KGxpc3RpbmcuY2xlYXJTdGF0ZVByb2dyYW0ubGVuZ3RoLCBsaXN0aW5nLmV4dHJhUHJvZ3JhbVBhZ2VzKSwKICAgIC8vICAgfSkKICAgIGJ5dGVjIDMwIC8vIG1ldGhvZCAiY3JlYXRlKHVpbnQ2NCxib29sLHVpbnQ2NCx1aW50NjQsdWludDY0LGFkZHJlc3MsKGFkZHJlc3MsdWludDY0KSxhZGRyZXNzLHVpbnQ2NCx1aW50NjQsYWRkcmVzcyxzdHJpbmcsdWludDY0LChzdHJpbmcsdWludDY0KSx1aW50NjQsYWRkcmVzcyx1aW50NjQpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDEwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDI3CiAgICAvLyB0cnVlLAogICAgcHVzaGJ5dGVzIDB4ODAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDkKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDEwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciA4CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciA3CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciA2CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC01CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciA1CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciA0CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC0zCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0MjMtNDUzCiAgICAvLyBjb25zdCBsaXN0aW5nQXBwID0gbGlzdGluZy5jYWxsCiAgICAvLyAgIC5jcmVhdGUoewogICAgLy8gICAgIGFyZ3M6IFsKICAgIC8vICAgICAgIHByaXplQm94VHJhbnNmZXJUeG4uYXBwSWQuaWQsCiAgICAvLyAgICAgICB0cnVlLAogICAgLy8gICAgICAgcHJpY2UsCiAgICAvLyAgICAgICBwYXltZW50QXNzZXQsCiAgICAvLyAgICAgICBleHBpcmF0aW9uLAogICAgLy8gICAgICAgVHhuLnNlbmRlciwKICAgIC8vICAgICAgIHsgYWNjb3VudDogcGF5bWVudC5zZW5kZXIsIGFtb3VudDogcGF5bWVudC5hbW91bnQgLSBjb3N0LmVzY3Jvd09wdEluIH0sCiAgICAvLyAgICAgICByZXNlcnZlZEZvciwKICAgIC8vICAgICAgIDAsCiAgICAvLyAgICAgICBnYXRlSUQsCiAgICAvLyAgICAgICBtYXJrZXRwbGFjZSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRDb250cmFjdFZlcnNpb24udmFsdWUsCiAgICAvLyAgICAgICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICAgICAgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSwKICAgIC8vICAgICAgIDAsCiAgICAvLyAgICAgICBzZWxsZXJSZWZlcnJlciwKICAgIC8vICAgICAgIGZsb2F0LAogICAgLy8gICAgIF0sCiAgICAvLyAgICAgLy8gQm94ZWQgYXBwcm92YWwgcHJvZ3JhbSBpbiB1cCB0byBmb3VyIDQgS0IgY2h1bmtzIChBVk0gMTM6IHVwIHRvIDE2IEtCKS4KICAgIC8vICAgICBhcHByb3ZhbFByb2dyYW06IFsKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDApLAogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMSksCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygyKSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDMpLAogICAgLy8gICAgIF0sCiAgICAvLyAgICAgY2xlYXJTdGF0ZVByb2dyYW06IGxpc3RpbmcuY2xlYXJTdGF0ZVByb2dyYW0sCiAgICAvLyAgICAgZXh0cmFQcm9ncmFtUGFnZXM6IHRoaXMuY2hpbGRFeHRyYVBhZ2VzQXRMZWFzdChsaXN0aW5nLmNsZWFyU3RhdGVQcm9ncmFtLmxlbmd0aCwgbGlzdGluZy5leHRyYVByb2dyYW1QYWdlcyksCiAgICAvLyAgIH0pCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDIzLTQ1NQogICAgLy8gY29uc3QgbGlzdGluZ0FwcCA9IGxpc3RpbmcuY2FsbAogICAgLy8gICAuY3JlYXRlKHsKICAgIC8vICAgICBhcmdzOiBbCiAgICAvLyAgICAgICBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcElkLmlkLAogICAgLy8gICAgICAgdHJ1ZSwKICAgIC8vICAgICAgIHByaWNlLAogICAgLy8gICAgICAgcGF5bWVudEFzc2V0LAogICAgLy8gICAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgICB7IGFjY291bnQ6IHBheW1lbnQuc2VuZGVyLCBhbW91bnQ6IHBheW1lbnQuYW1vdW50IC0gY29zdC5lc2Nyb3dPcHRJbiB9LAogICAgLy8gICAgICAgcmVzZXJ2ZWRGb3IsCiAgICAvLyAgICAgICAwLAogICAgLy8gICAgICAgZ2F0ZUlELAogICAgLy8gICAgICAgbWFya2V0cGxhY2UsCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlLAogICAgLy8gICAgICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgICAgIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUsCiAgICAvLyAgICAgICAwLAogICAgLy8gICAgICAgc2VsbGVyUmVmZXJyZXIsCiAgICAvLyAgICAgICBmbG9hdCwKICAgIC8vICAgICBdLAogICAgLy8gICAgIC8vIEJveGVkIGFwcHJvdmFsIHByb2dyYW0gaW4gdXAgdG8gZm91ciA0IEtCIGNodW5rcyAoQVZNIDEzOiB1cCB0byAxNiBLQikuCiAgICAvLyAgICAgYXBwcm92YWxQcm9ncmFtOiBbCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygwKSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDEpLAogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMiksCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygzKSwKICAgIC8vICAgICBdLAogICAgLy8gICAgIGNsZWFyU3RhdGVQcm9ncmFtOiBsaXN0aW5nLmNsZWFyU3RhdGVQcm9ncmFtLAogICAgLy8gICAgIGV4dHJhUHJvZ3JhbVBhZ2VzOiB0aGlzLmNoaWxkRXh0cmFQYWdlc0F0TGVhc3QobGlzdGluZy5jbGVhclN0YXRlUHJvZ3JhbS5sZW5ndGgsIGxpc3RpbmcuZXh0cmFQcm9ncmFtUGFnZXMpLAogICAgLy8gICB9KQogICAgLy8gICAuaXR4bgogICAgLy8gICAuY3JlYXRlZEFwcAogICAgZ2l0eG4gMCBDcmVhdGVkQXBwbGljYXRpb25JRAogICAgZHVwCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0NTgtNDYzCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogbGlzdGluZ0FwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogR2xvYmFsLm1pbkJhbGFuY2UgKyBjb3N0LmRpc2J1cnNlbWVudAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQ2MAogICAgLy8gcmVjZWl2ZXI6IGxpc3RpbmdBcHAuYWRkcmVzcywKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDYxCiAgICAvLyBhbW91bnQ6IEdsb2JhbC5taW5CYWxhbmNlICsgY29zdC5kaXNidXJzZW1lbnQKICAgIGdsb2JhbCBNaW5CYWxhbmNlCiAgICB1bmNvdmVyIDMKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICArCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDU4LTQ2MgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IGxpc3RpbmdBcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IEdsb2JhbC5taW5CYWxhbmNlICsgY29zdC5kaXNidXJzZW1lbnQKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQ1OC00NjMKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBsaXN0aW5nQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBHbG9iYWwubWluQmFsYW5jZSArIGNvc3QuZGlzYnVyc2VtZW50CiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQ2Ni00NjkKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFByaXplQm94LnByb3RvdHlwZS50cmFuc2Zlcj4oewogICAgLy8gICBhcHBJZDogcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBJZCwKICAgIC8vICAgYXJnczogW2xpc3RpbmdBcHAuYWRkcmVzc10sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDY4CiAgICAvLyBhcmdzOiBbbGlzdGluZ0FwcC5hZGRyZXNzXSwKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDY2LTQ2OQogICAgLy8gYWJpQ2FsbDx0eXBlb2YgUHJpemVCb3gucHJvdG90eXBlLnRyYW5zZmVyPih7CiAgICAvLyAgIGFwcElkOiBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcElkLAogICAgLy8gICBhcmdzOiBbbGlzdGluZ0FwcC5hZGRyZXNzXSwKICAgIC8vIH0pCiAgICBieXRlYyAzMSAvLyBtZXRob2QgInRyYW5zZmVyKGFkZHJlc3Mpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQ3MQogICAgLy8gaWYgKCFpc0FsZ29QYXltZW50KSB7CiAgICBmcmFtZV9kaWcgLTcKICAgIGJ6IGxpc3RQcml6ZUJveEltcGxfYWZ0ZXJfaWZfZWxzZUAyMwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDczLTQ4MgogICAgLy8gbGlzdGluZy5jYWxsLm9wdGluKHsKICAgIC8vICAgYXBwSWQ6IGxpc3RpbmdBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGxpc3RpbmdBcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlLAogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHBheW1lbnRBc3NldCwKICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0NzcKICAgIC8vIHJlY2VpdmVyOiBsaXN0aW5nQXBwLmFkZHJlc3MsCiAgICBkdXBuIDIKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQ3OAogICAgLy8gYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UsCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0NzYtNDc5CiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogbGlzdGluZ0FwcC5hZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSwKICAgIC8vIH0pLAogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL21hcmtldHBsYWNlLmFsZ28udHM6NDczLTQ4MgogICAgLy8gbGlzdGluZy5jYWxsLm9wdGluKHsKICAgIC8vICAgYXBwSWQ6IGxpc3RpbmdBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGxpc3RpbmdBcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlLAogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHBheW1lbnRBc3NldCwKICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIE9uQ29tcGxldGlvbgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBieXRlYyAxNiAvLyBtZXRob2QgIm9wdGluKHBheSx1aW50NjQpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0ODUKICAgIC8vIGlmICghdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcy5pc09wdGVkSW4oQXNzZXQocGF5bWVudEFzc2V0KSkpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlY18yIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0ODUKICAgIC8vIGlmICghdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcy5pc09wdGVkSW4oQXNzZXQocGF5bWVudEFzc2V0KSkpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzMgLy8gMgogICAgZXh0cmFjdF91aW50NjQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGZyYW1lX2RpZyAtNwogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJueiBsaXN0UHJpemVCb3hJbXBsX2FmdGVyX2lmX2Vsc2VAMjMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS5hbGdvLnRzOjQ4NgogICAgLy8gdGhpcy5vcHRBa2l0YUVzY3Jvd0luQW5kU2VuZChBc3NldChwYXltZW50QXNzZXQpLCAwKQogICAgZnJhbWVfZGlnIC03CiAgICBpbnRjXzAgLy8gMAogICAgY2FsbHN1YiBvcHRBa2l0YUVzY3Jvd0luQW5kU2VuZAogICAgcG9wCgpsaXN0UHJpemVCb3hJbXBsX2FmdGVyX2lmX2Vsc2VAMjM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbWFya2V0cGxhY2UuYWxnby50czo0OTAKICAgIC8vIHJldHVybiBsaXN0aW5nQXBwLmlkCiAgICBzd2FwCiAgICByZXRzdWIKCmxpc3RQcml6ZUJveEltcGxfYm9vbF9mYWxzZUA3OgogICAgaW50Y18wIC8vIDAKICAgIGIgbGlzdFByaXplQm94SW1wbF9ib29sX21lcmdlQDgKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo6RmFjdG9yeUNvbnRyYWN0LmNoaWxkQXBwcm92YWxDaHVuayhpbmRleDogdWludDY0KSAtPiBieXRlczoKY2hpbGRBcHByb3ZhbENodW5rOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NzEKICAgIC8vIHByb3RlY3RlZCBjaGlsZEFwcHJvdmFsQ2h1bmsoaW5kZXg6IHVpbnQ2NCk6IGJ5dGVzIHsKICAgIHByb3RvIDEgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NzIKICAgIC8vIHJldHVybiBib3hlZFByb2dyYW1DaHVuayhCeXRlcyhCb3hLZXlCb3hlZENvbnRyYWN0KSwgaW5kZXgpCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcm9ncmFtcy50czo5MgogICAgLy8gY29uc3Qgc2l6ZSA9IGJveGVkUHJvZ3JhbVNpemUoYm94S2V5KQogICAgY2FsbHN1YiBib3hlZFByb2dyYW1TaXplCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcm9ncmFtcy50czo5MwogICAgLy8gY29uc3Qgb2Zmc2V0OiB1aW50NjQgPSBpbmRleCAqIE1BWF9BVk1fQllURV9BUlJBWV9MRU5HVEgKICAgIGZyYW1lX2RpZyAtMQogICAgaW50YyA1IC8vIDQwOTYKICAgICoKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJvZ3JhbXMudHM6OTQKICAgIC8vIGlmIChvZmZzZXQgPj0gc2l6ZSkgewogICAgPj0KICAgIGJ6IGNoaWxkQXBwcm92YWxDaHVua19hZnRlcl9pZl9lbHNlQDMKICAgIHBvcG4gMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3Byb2dyYW1zLnRzOjk1CiAgICAvLyByZXR1cm4gQnl0ZXMoJycpCiAgICBwdXNoYnl0ZXMgIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjcyCiAgICAvLyByZXR1cm4gYm94ZWRQcm9ncmFtQ2h1bmsoQnl0ZXMoQm94S2V5Qm94ZWRDb250cmFjdCksIGluZGV4KQogICAgcmV0c3ViCgpjaGlsZEFwcHJvdmFsQ2h1bmtfYWZ0ZXJfaWZfZWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3Byb2dyYW1zLnRzOjk3CiAgICAvLyBjb25zdCByZW1haW5pbmc6IHVpbnQ2NCA9IHNpemUgLSBvZmZzZXQKICAgIGR1cAogICAgY292ZXIgMgogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3Byb2dyYW1zLnRzOjk4CiAgICAvLyByZXR1cm4gb3AuQm94LmV4dHJhY3QoYm94S2V5LCBvZmZzZXQsIHJlbWFpbmluZyA+IE1BWF9BVk1fQllURV9BUlJBWV9MRU5HVEggPyBNQVhfQVZNX0JZVEVfQVJSQVlfTEVOR1RIIDogcmVtYWluaW5nKQogICAgZHVwCiAgICBpbnRjIDUgLy8gNDA5NgogICAgPgogICAgaW50YyA1IC8vIDQwOTYKICAgIHN3YXAKICAgIHNlbGVjdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NzIKICAgIC8vIHJldHVybiBib3hlZFByb2dyYW1DaHVuayhCeXRlcyhCb3hLZXlCb3hlZENvbnRyYWN0KSwgaW5kZXgpCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcm9ncmFtcy50czo5OAogICAgLy8gcmV0dXJuIG9wLkJveC5leHRyYWN0KGJveEtleSwgb2Zmc2V0LCByZW1haW5pbmcgPiBNQVhfQVZNX0JZVEVfQVJSQVlfTEVOR1RIID8gTUFYX0FWTV9CWVRFX0FSUkFZX0xFTkdUSCA6IHJlbWFpbmluZykKICAgIGNvdmVyIDIKICAgIGJveF9leHRyYWN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo3MgogICAgLy8gcmV0dXJuIGJveGVkUHJvZ3JhbUNodW5rKEJ5dGVzKEJveEtleUJveGVkQ29udHJhY3QpLCBpbmRleCkKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjpGYWN0b3J5Q29udHJhY3QuY2hpbGRFeHRyYVBhZ2VzQXRMZWFzdChjbGVhclNpemU6IHVpbnQ2NCwgbWluRXh0cmFQYWdlczogdWludDY0KSAtPiB1aW50NjQ6CmNoaWxkRXh0cmFQYWdlc0F0TGVhc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo4OQogICAgLy8gcHJvdGVjdGVkIGNoaWxkRXh0cmFQYWdlc0F0TGVhc3QoY2xlYXJTaXplOiB1aW50NjQsIG1pbkV4dHJhUGFnZXM6IHVpbnQ2NCk6IHVpbnQ2NCB7CiAgICBwcm90byAyIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjc3CiAgICAvLyByZXR1cm4gYm94ZWRQcm9ncmFtU2l6ZShCeXRlcyhCb3hLZXlCb3hlZENvbnRyYWN0KSkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgY2FsbHN1YiBib3hlZFByb2dyYW1TaXplCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJvZ3JhbXMudHM6MzIKICAgIC8vIGNvbnN0IHBhZ2VzOiB1aW50NjQgPSAoYXBwcm92YWxTaXplICsgY2xlYXJTaXplICsgUFJPR1JBTV9QQUdFX1NJWkUgLSAxKSAvIFBST0dSQU1fUEFHRV9TSVpFCiAgICBmcmFtZV9kaWcgLTIKICAgICsKICAgIHB1c2hpbnQgMjA0OAogICAgKwogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIHB1c2hpbnQgMjA0OAogICAgLwogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJvZ3JhbXMudHM6MzMKICAgIC8vIGxvZ2dlZEFzc2VydChwYWdlcyA8PSBNQVhfUFJPR1JBTV9UT1RBTF9QQUdFUywgZXJyUHJvZ3JhbVRvb0xhcmdlKQogICAgaW50Y18yIC8vIDgKICAgIDw9CiAgICBibnogY2hpbGRFeHRyYVBhZ2VzQXRMZWFzdF9hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6ZXJyUHRsZyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJQdGxnCgpjaGlsZEV4dHJhUGFnZXNBdExlYXN0X2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3Byb2dyYW1zLnRzOjQzCiAgICAvLyBjb25zdCBleHRyYTogdWludDY0ID0gcGFnZXMgPiAwID8gcGFnZXMgLSAxIDogMAogICAgZHVwCiAgICBieiBjaGlsZEV4dHJhUGFnZXNBdExlYXN0X3Rlcm5hcnlfZmFsc2VANwogICAgaW50Y18xIC8vIDEKICAgIC0KCmNoaWxkRXh0cmFQYWdlc0F0TGVhc3RfdGVybmFyeV9tZXJnZUA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3Byb2dyYW1zLnRzOjQ0CiAgICAvLyByZXR1cm4gZXh0cmEgPiBtaW5FeHRyYVBhZ2VzID8gZXh0cmEgOiBtaW5FeHRyYVBhZ2VzCiAgICBkdXAKICAgIGZyYW1lX2RpZyAtMQogICAgPgogICAgZnJhbWVfZGlnIC0xCiAgICBjb3ZlciAyCiAgICBzZWxlY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjkwCiAgICAvLyByZXR1cm4gcHJvZ3JhbUV4dHJhUGFnZXModGhpcy5jaGlsZEFwcHJvdmFsU2l6ZSgpLCBjbGVhclNpemUsIG1pbkV4dHJhUGFnZXMpCiAgICByZXRzdWIKCmNoaWxkRXh0cmFQYWdlc0F0TGVhc3RfdGVybmFyeV9mYWxzZUA3OgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJvZ3JhbXMudHM6NDMKICAgIC8vIGNvbnN0IGV4dHJhOiB1aW50NjQgPSBwYWdlcyA+IDAgPyBwYWdlcyAtIDEgOiAwCiAgICBpbnRjXzAgLy8gMAogICAgYiBjaGlsZEV4dHJhUGFnZXNBdExlYXN0X3Rlcm5hcnlfbWVyZ2VAOAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpBa2l0YUJhc2VGZWVHZW5lcmF0b3JDb250cmFjdC5vcHRBa2l0YUVzY3Jvd0luQW5kU2VuZChhc3NldDogdWludDY0LCBhbW91bnQ6IHVpbnQ2NCkgLT4gdWludDY0OgpvcHRBa2l0YUVzY3Jvd0luQW5kU2VuZDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjgyCiAgICAvLyBwcm90ZWN0ZWQgb3B0QWtpdGFFc2Nyb3dJbkFuZFNlbmQoYXNzZXQ6IEFzc2V0LCBhbW91bnQ6IHVpbnQ2NCk6IHVpbnQ2NCB7CiAgICBwcm90byAyIDEKICAgIHB1c2hieXRlcyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGR1cAogICAgYnl0ZWMgNSAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMTYKICAgIC8vIGNvbnN0IFtwbHVnaW5BcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzUGx1Z2luQXBwTGlzdCkpCiAgICBkdXAKICAgIGJ5dGVjIDI2IC8vICJwYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4NQogICAgLy8gY29uc3QgeyByZXZlbnVlTWFuYWdlciB9ID0gZ2V0UGx1Z2luQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgZHVwCiAgICBleHRyYWN0IDggOAogICAgY292ZXIgMgogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4NwogICAgLy8gY29uc3QgZXNjcm93ID0gY2xvbmUodGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlY18yIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4NwogICAgLy8gY29uc3QgZXNjcm93ID0gY2xvbmUodGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBzd2FwCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGNvdmVyIDMKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg4CiAgICAvLyBjb25zdCB7IGlkIH0gPSB0aGlzLmdldEVzY3Jvdyhlc2Nyb3cubmFtZSkKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMQogICAgbGVuCiAgICBzdWJzdHJpbmczCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGV4dHJhY3QgMiAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgc3dhcAogICAgYnl0ZWMgNSAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NjItNjUKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9nZXRFc2Nyb3dzPih7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbW25hbWVdXSwKICAgIC8vIH0pLnJldHVyblZhbHVlWzBdCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo2NAogICAgLy8gYXJnczogW1tuYW1lXV0sCiAgICBpbnRjXzEgLy8gMQogICAgaXRvYgogICAgY292ZXIgMgogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHB1c2hieXRlcyAweDAwMDEwMDAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NjItNjUKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9nZXRFc2Nyb3dzPih7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbW25hbWVdXSwKICAgIC8vIH0pLnJldHVyblZhbHVlWzBdCiAgICBwdXNoYnl0ZXMgMHgzYWIyODk1YiAvLyBtZXRob2QgImFyYzU4X2dldEVzY3Jvd3Moc3RyaW5nW10pKHVpbnQ2NCxhZGRyZXNzLGJvb2wpW10iCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIGRpZyAxCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWNfMyAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgNDEKICAgICoKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxzbWFydF9jb250cmFjdHMvYXJjNTgvYWNjb3VudC90eXBlcy50czo6RXNjcm93SW5mbz4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjY3CiAgICAvLyBsb2dnZWRBc3NlcnQoZXNjcm93LmlkICE9PSAwLCBlcnJFc2Nyb3dEb2VzTm90RXhpc3QpCiAgICBleHRyYWN0IDYgNDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBibnogb3B0QWtpdGFFc2Nyb3dJbkFuZFNlbmRfYWZ0ZXJfYXNzZXJ0QDkKICAgIHB1c2hieXRlcyAiRVJSOmVyck5lc2MiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmVzYwoKb3B0QWtpdGFFc2Nyb3dJbkFuZFNlbmRfYWZ0ZXJfYXNzZXJ0QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4OQogICAgLy8gbG9nZ2VkQXNzZXJ0KGlkID09PSBlc2Nyb3cuYXBwLmlkLCBlcnJXcm9uZ0VzY3Jvd0Zvck9wZXJhdGlvbikKICAgIHVuY292ZXIgMgogICAgaW50Y18zIC8vIDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMAogICAgPT0KICAgIGJueiBvcHRBa2l0YUVzY3Jvd0luQW5kU2VuZF9hZnRlcl9hc3NlcnRAMgogICAgcHVzaGJ5dGVzICJFUlI6ZXJyV2VzYyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJXZXNjCgpvcHRBa2l0YUVzY3Jvd0luQW5kU2VuZF9hZnRlcl9hc3NlcnRAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjkxLTEwMAogICAgLy8gaXR4bkNvbXBvc2UuYmVnaW48dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9yZWtleVRvUGx1Z2luPih7CiAgICAvLyAgIGFwcElkOiB3YWxsZXQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgICBDYWxsZXJUeXBlR2xvYmFsLAogICAgLy8gICAgIGVzY3Jvdy5uYW1lLAogICAgLy8gICAgIFswXSwgLy8gYWxsIHRoZSBha2l0YSBlc2Nyb3dzIGhhdmUgbWV0aG9kIHJlc3RyaWN0aW9ucyB3aXRoIG9wdGluIGJlaW5nIGluZGV4IDAKICAgIC8vICAgICBbXQogICAgLy8gICBdLAogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIHVuY292ZXIgMwogICAgZHVwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hieXRlcyAweDVhZGYzMzhmIC8vIG1ldGhvZCAiYXJjNThfcmVrZXlUb1BsdWdpbih1aW50NjQsdWludDY0LHN0cmluZyx1aW50NjRbXSwodWludDY0LHVpbnQ2NClbXSl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OTcKICAgIC8vIFswXSwgLy8gYWxsIHRoZSBha2l0YSBlc2Nyb3dzIGhhdmUgbWV0aG9kIHJlc3RyaWN0aW9ucyB3aXRoIG9wdGluIGJlaW5nIGluZGV4IDAKICAgIHB1c2hieXRlcyAweDAwMDEwMDAwMDAwMDAwMDAwMDAwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OTgKICAgIC8vIFtdCiAgICBwdXNoYnl0ZXMgMHgwMDAwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OTEtMTAwCiAgICAvLyBpdHhuQ29tcG9zZS5iZWdpbjx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X3Jla2V5VG9QbHVnaW4+KHsKICAgIC8vICAgYXBwSWQ6IHdhbGxldCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHJldmVudWVNYW5hZ2VyLAogICAgLy8gICAgIENhbGxlclR5cGVHbG9iYWwsCiAgICAvLyAgICAgZXNjcm93Lm5hbWUsCiAgICAvLyAgICAgWzBdLCAvLyBhbGwgdGhlIGFraXRhIGVzY3Jvd3MgaGF2ZSBtZXRob2QgcmVzdHJpY3Rpb25zIHdpdGggb3B0aW4gYmVpbmcgaW5kZXggMAogICAgLy8gICAgIFtdCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTAzCiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEwMwogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBidXJ5IDEKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEwNAogICAgLy8gZXNjcm93LmFwcC5hZGRyZXNzLAogICAgZnJhbWVfZGlnIDAKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo4OTEKICAgIC8vIHJldHVybiBlc2Nyb3cuaXNPcHRlZEluKGFzc2V0KSA/IDAgOiAxCiAgICBmcmFtZV9kaWcgLTIKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICAhCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMDgKICAgIC8vIGNvbnN0IG1ickFtb3VudDogdWludDY0ID0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogb3B0SW5Db3VudAogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICAqCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjExMC0xMjEKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIFJldmVudWVNYW5hZ2VyUGx1Z2luU3R1Yi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJldmVudWVNYW5hZ2VyLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgW2Fzc2V0LmlkXSwKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTE3CiAgICAvLyByZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgc3dhcAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjExNi0xMTkKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTEwLTEyMQogICAgLy8gaXR4bkNvbXBvc2UubmV4dDx0eXBlb2YgUmV2ZW51ZU1hbmFnZXJQbHVnaW5TdHViLnByb3RvdHlwZS5vcHRJbj4oewogICAgLy8gICBhcHBJZDogcmV2ZW51ZU1hbmFnZXIsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICB3YWxsZXQsCiAgICAvLyAgICAgdHJ1ZSwKICAgIC8vICAgICBbYXNzZXQuaWRdLAogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtYnJBbW91bnQKICAgIC8vICAgICB9KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTMKICAgIC8vIHdhbGxldCwKICAgIGR1cAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTE1CiAgICAvLyBbYXNzZXQuaWRdLAogICAgZnJhbWVfZGlnIC0yCiAgICBpdG9iCiAgICBwdXNoYnl0ZXMgMHgwMDAxCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHVuY292ZXIgNAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTAtMTIxCiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBSZXZlbnVlTWFuYWdlclBsdWdpblN0dWIucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHdhbGxldCwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIFthc3NldC5pZF0sCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gICAgIH0pCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBwdXNoYnl0ZXMgMHg2ODM1ZTNiYyAvLyBtZXRob2QgIm9wdEluKHVpbnQ2NCxib29sLHVpbnQ2NFtdLHBheSl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTQKICAgIC8vIHRydWUsCiAgICBwdXNoYnl0ZXMgMHg4MAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTAtMTIxCiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBSZXZlbnVlTWFuYWdlclBsdWdpblN0dWIucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHdhbGxldCwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIFthc3NldC5pZF0sCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gICAgIH0pCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMjMKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF92ZXJpZnlBdXRoQWRkcmVzcz4oeyBhcHBJZDogd2FsbGV0IH0pCiAgICBpdHhuX25leHQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgcHVzaGJ5dGVzIDB4NmNjM2Y2MDYgLy8gbWV0aG9kICJhcmM1OF92ZXJpZnlBdXRoQWRkcmVzcygpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMjUKICAgIC8vIGlmIChhbW91bnQgPiAwKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ6IG9wdEFraXRhRXNjcm93SW5BbmRTZW5kX2FmdGVyX2lmX2Vsc2VANAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTI2LTEzMgogICAgLy8gaXR4bkNvbXBvc2UubmV4dCgKICAgIC8vICAgaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0LAogICAgLy8gICB9KQogICAgLy8gKQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMjgKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIGZyYW1lX2RpZyAwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBmcmFtZV9kaWcgLTIKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBmcmFtZV9kaWcgLTEKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTI3LTEzMQogICAgLy8gaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgYXNzZXRSZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgLy8gICBhc3NldEFtb3VudDogYW1vdW50LAogICAgLy8gICB4ZmVyQXNzZXQ6IGFzc2V0LAogICAgLy8gfSkKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCgpvcHRBa2l0YUVzY3Jvd0luQW5kU2VuZF9hZnRlcl9pZl9lbHNlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMzUKICAgIC8vIGl0eG5Db21wb3NlLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTM3CiAgICAvLyByZXR1cm4gbWJyQW1vdW50CiAgICBzd2FwCiAgICByZXRzdWIK", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyAIAAEIArjvBIAglJYu0IYDJiEJYWtpdGFfZGFvAmJjDGFraXRhX2VzY3JvdwQVH3x1A2FhbAZ3YWxsZXQLRVJSOmVyck5kYW8LRVJSOmVycklwYXkLRVJSOmVyckNuc3QWY2hpbGRfY29udHJhY3RfdmVyc2lvbgEAA3JldgZmdW5kZXINZmFjdG9yeV9mbG9hdAdnYXRlX2lkC0VSUjplcnJJeGZyBD6hGDIExTsyzAtFUlI6ZXJySXBtcwtFUlI6ZXJyTmNscwtFUlI6ZXJyTnJreQVhcHBJRBJjb250cm9sbGVkX2FkZHJlc3MLRVJSOmVyckl3bHQIcmVmZXJyZXIHdmVyc2lvbgNwYWwLRVJSOmVyckZndGULRVJSOmVyclBybG8EC4EBQwScVCQJBK35KuQLRVJSOmVyck5wYm+ABOqRgN02GgCOAQCsMRkURDEYQQCVggwEar1nOATi+p4hBOZq2S4EgdxRagRx1SD0BG6QNcwEXXphdwR5IsH9BNqpdRYEAs+xzwTJfbsuBDMvbdgnEYIHBNyi2GIE00axpAQ5Tq6yBDP3iAgEroTL2AQz6SyUBIVN7eA2GgCOFALUA18D2QRDBJwE7gU1BW8FxAYOBksGrwbXBysHswfNCGoIlgkXAAEAI0OABIEVNig2GgCOAQJtADEZgQQSMRgQREIIr4oBAYv/vUAABCcIsACJigIAi/44AIv/EkAABCcSsACL/jgTMgMSQAAPgAtFUlI6ZXJyTmNsd7AAi/44FTIDEkAABCcTsACL/jggMgMSQAAEJxSwAImKAgEii/6AA29hbGVIgRhbi/4nBGVIgVhbTLGyGIAEPBpvM7Iai/+yGoEGshAisgGztD5JVwQASwFXAAQrEkRJIlklCEwVEkRXBgBJFSQTQQAFSCKMAIkXSUEABYsBQAAIIiJOAk1C/+tJcgdMjABBABKLARYnFUxQA4sAEkEABCNC/94iQv/aigIBi/9BABeL/icEZUgkW3IIRIv/cABFAUAAAzIQiSKJigIBIkmL/icEZUiBWFsyDjEAMg2L/0AAGUgyA0kiFk8DSU4CUE8DUExQTFAnClCMAImL/0EABYsCQAEGIkAAD4ALRVJSOmVyckhud2ywAElAAA+AC0VSUjplcnJIdG9wsAAiTgKL/xNBAEZFAYv/gBBzcGVuZGluZ19hZGRyZXNzZUyMAUEAGIsBFYEgEkEAD4sBSwESQQAHSYsDE0AAD4ALRVJSOmVyckhuYmSwACNMi/8nFmVBAAhJFYEgEkAABCcXsABJSwISQQBII0yL/ycYZUEANkkVgSASQQAuTgNLAksBTwNJTgNNTEEAF0yL/xZPAlBMUExQTFAnCiJPA1RQQv8qRQEyA0L/40gyA04DQv/Mi/9yCExOAkAAB0UBIkxC/6lJSwISQQALTHMCSDIDEkxC/5dJcwJITwISTEL/jIv/cgdMjABBABKLAhYnFUxQA4sAEkEABCNC/t8iQv7bNhoBSSJZJQhLARUSRFcCADYaAkkiWSUISwEVEkRXAgA2GgNJFSQSRBc2GgRJFUsBIllJgQoSREsCTEsCUiJZgQwIEkQnGU8EZycJTwNnKE8CZypMZyNDMRYlCUk4ECMSRDEWIwlJOBCBBBJENhoBSRUkEkQXNhoCSRUkEkQXNhoDSRUkEkQXNhoESRWBIBJENhoFSRUkEkQXNhoGSRWBIBJENhoHSSJZJQhLARUSRFcCADYaCEkiWYEgCyUISwEVEkQ2GglJFSQSRBciKGVETIj9y1doICKICp9IFitMULAjQzEWJQlJOBAjEkQxFiMJSTgQgQQSRDYaAUkVJBJEFzYaAkkVJBJEFzYaA0kVJBJEFzYaBEkVgSASRDYaBUkVJBJEFzYaBkkVgSASRDYaB0kiWSUISwEVEkRXAgA2GghJIlmBIAslCEsBFRJEiAgeI4gKJUgWK0xQsCNDMRYlCUk4EIEGEkQxFiMJSTgQIxJENhoBSRUkEkQXNhoCSRUkEkQXNhoDSRUkEkQXNhoESRWBIBJENhoFSRUkEkQXNhoGSRWBIBJENhoHSRUkEkQXIihlREyI/OZXaCAiiAw6FitMULAjQzEWJQlJOBCBBhJEMRYjCUk4ECMSRDYaAUkVJBJEFzYaAkkVJBJEFzYaA0kVJBJEFzYaBEkVgSASRDYaBUkVJBJEFzYaBkkVgSASRIgHWiOIC+EWK0xQsCNDMRYlCUk4ECMSRDEWIwlJOBCBBhJENhoBSRUkEkQXNhoCSRWBIBJENhoDSRUkEkQXMgpzAEQyCnMBREsEiAWRTwVLBU8EiAXCSwSIB/eICDAjQzEWJQlJOBAjEkQxFiMJSTgQgQYSRDYaAUkVJBJEFzYaAkkVgSASRDIKcwBEMgpzAURLA4gFSE8ESwSIBftLBIgHsIgH6SNDMRYjCUk4ECMSRDYaAUkVJBJEFzYaAkkVgSASRDIKcwBEMgpzAURLA4gFDEsDiAUlSwSIB3aIB68jQzEWJQlJOBCBBBJEMRYjCUk4EIEGEkQ2GgFJFSQSRBc2GgJJFYEgEkQ2GgNJFSQSRBcyCnMARDIKcwFESwSIBL1PBUsFTwSIBO5LBEsEiAbeiAe8I0MxFiUJSTgQgQQSRDEWIwlJOBCBBhJENhoBSRUkEkQXNhoCSRWBIBJEMgpzAEQyCnMBREsDiARxTwRLBIgFJEsESwSIBpSIB3IjQzEWIwlJOBCBBBJENhoBSRUkEkQXNhoCSRWBIBJEMgpzAEQyCnMBREsDiAQySwOIBEtLBEsEiAZXiAc1I0M2GgFJFSQSRBcyCnMARDIKcwFESwKIBAlLAicLZUUBFEsDJwxlSElXACBMgSBbSwUnDWVITLExAIEFshlPB7IYgARo6GNDshqyGoEGshAisgGzTwNPA08CTwNPBU8FIogDPiNDNhoBSRUkEkQXNhoCSRUkEkQXNhoDSRUjEkQiU4gCbFcACCtMULAjQzYaAUkiWSUISwEVEkRXAgA2GgJJFSQSRBciKGVEJwVlSElAACVIMQAyCRJAAAQnBrAAJwlPAmcpvUUBQAAGKUy5SCNDKUzTQv/4MQBMcghEEkL/1zYaAUkVJBJEF0k2GgJJIlklCEsBFRJEVwIATIHwDwoxFkwJIwlJTgM4EIEGEkEAVEsCOBgyCBJBAEpLAjgbgQMSQQBASwI4GUAAOUsCORoAJxESQQAuSwI4ADEAEkEAJCNAAA+AC0VSUjplcnJJY29ysAApvUUBQAAEJwiwAClOArsjQyJC/9kxACIoZUQnBWVIcghEEkAABCcGsAApvEgjQzEWIwlHAjgQIxJENhoBSRUkEkQXSU4DIiplTElOAk4FRCIoZUUBRCVbcghETHAASU4CTgNIFEw4BzIKEkAAD4ALRVJSOmVycklwbXKwAE8COAgyECNPAwgLEkAAD4ALRVJSOmVycklwbWGwALEyCksDshEishKyFIEEshAisgGzQAAYRwIiWUsBFVJXAgCAABNBAAdLASKICkxII0M2GgFJFSQSRBciKGVFAUQiKmVEJVtyCERMcABFARQyECNPAggLFitMULAjQzYaAUcCFUsBIllJgQoSRE8CTEsCUiJZgQwIEkQxACIoZUQnBWVIcghEEkAABCcGsAAqTGcjQzYaAUkiWSUISwEVEkRXAgAxACIoZUQnBWVIcghEEkAABCcGsAAiKGVEJxplSIEQWzINEkAAD4ALRVJSOmVyckl1cGewACcZTGcjQzYaAUkVJBJEFzEAIihlRCcFZUhyCEQSQAAEJwawAChMZyNDigMBIov/QQB1i/5AAFshBIv+QAA4IoEEI4gJHyMIgaCNBguB9PwrCEkyAQiLAElOAghPBElOAghPBElOAggWTBZQTBZQTBZQTBZQTIkyECIoZUUBRCIqZUQlW3IIRIv+cABFARQLQv+tMhCMACIoZUSL/oj3SoHgvRMIQv+SIihlRIv9iPc5IQQIi/5AAAoyEIwAIQQIQv93MhAlC4wAIihlRIv+iPcYgZitGAgIQv9figcAgACL+UEAEbGL+7IIi/qyByOyECKyAbOJi/uL/AgyCklzAESL/whJi/0NQQBMi/0JTHMBTElPAkSL/gxBADaL/kwJCElLAg1MTgJNSYv8DUEAG4v8CYwAiwBB/7uxiwCyCIv6sgcjshAisgGziUgijABC/+NIIkL/yUgiQv+yigEAi/9yB0QyChJAAA+AC0VSUjplcnJOYWxzsACJigEAi/8nDmVIQQAPgAtFUlI6ZXJySGd0ZbAAiYoDACIoZUSL/4j2aYv+Jw5lSEwiKGVESwFXCCBLAlcACE8DV0ggTgJQTFBMi/04GEwnBGVIgShbEkEAQIv9OBlAADmL/TgbgQQSQQAvi/05GgCABJsUfSwSQQAgi/05GgGLARJBABWL/TkaAosAFhJBAAkjQAAEJxuwAIkiQv/0igIAIoAAIihlRDEAiPU9STEATEAAYowAi/8nDmVIjAEiKGVEi/44GEwnBGVIgShbEkEAQIv+OBlAADmL/jgbgQQSQQAvi/45GgCABEOSJlUSQQAgi/45GgGLABJBABWL/jkaAosBFhJBAAkjQAAEJxuwAIkiQv/0iwInFmVMTgJBAD5LARWBIBJBADUjQAAEJxewAIsCcghESwITQQAcSwExABNBABRLAXMCRIsCcghEE0EABowASEL/XUiMAEL/VyJC/8giKGVEMQCI9H5JMgNMQAADRQGJSCcYZUiJigUCgABJi/s4BzIKEkAABCcHsACL+zgISYwBi/wiW0lOAhJBAAgii/yMAYwAiSUji/5Ni/yBIFtJjAAhBgmBgGRPAgsITIv/QQBKi/1BAEWLACEGDUEAPUlLAgmLARJBADMjQAAEJwewADIKSXMARExzAUQJTIGgwh4ID0AAD4ALRVJSOmVyckxmbHSwAIv8TwNPA4kiQv/KigIAi/4xAIjzhIv+OBQyChJAAAQnD7AAi/44EkAABCcPsACL/4ANcGF5bWVudF9hc3NldGVIi/44ERJAAAQnD7AAiYoBADEAi/84ABJAAAQnErAAi/84CTIDEkAABCcTsACL/zggMgMSQAAEJxSwAIv/OAcyChJAAAQnB7AAiYoFAIv8JwtlRQEUi/wnDGVISVcAIEyBIFuL/CcNZUixi/xyCESL+zgISbIITLIHI7IQIrIBtjEAgQWyGYv8shiABGoWOT2yGrIai/2yGoEGshAisgGzTgSL/ov/TwaI/G6JigUAi/wnC2VFAUAAD4ALRVJSOmVyckxnY3mwAIv8JwxlSElXACBMgSBbi/wnDWVIsYv8cghEi/s4Eov7OBGyEbISshSBBLIQIrIBtjEAgQWyGYv8shiABBccn4iyGrIai/2yGoEGshAisgGzIk4Di/6L/yKI+/aJigwCIkmAAIv2gQQPQAAEJxywACm9RQFAAAQnCLAAi/UxAIjyEIv1OBQyChJAAAQnB7AAi/U4EklAAAQnB7AAi/U4EUmL9xNAAA+AC0VSUjplcnJQYmRssACL9xRLAYv3Ioj64Iv0TE8CIov/iP2fTgNOAyIoZUxOAkQijAKL/SJZQAF3RQGBiCeMArFJFov2Fov3FklOAowAi/gWMQCL9DgAi/Q4CE8JSU4IJFsJFlCLAhaL+hYiJwllREkVFlcGAkxQIihlRBYiKmVETw1JTgwWTw8WTIv+UExQIogDdiOIA3IliANugQOIA2mBBCOIA42BB7I1gQ2yNCKyGbI4Jx2yQk8DskBPArJATLJAskAnHrIaSwuyGicKshpPCbIaTwmyGk8IshpPB7IaTwayGov5shpPBbIaTwSyGov7shpPA7IaTwKyGkyyGrIagQayECKyAbO3AD1JTgWxSXIIRDIBTwWBEFsIsgiyByOyECKyAbOxSXIIRDIQsgiyByOyECKyAbYishlJshgnELIaTLIagQayECKyAbOxcghETwKyEbIUshKBBLIQIrIBs4v3QQBBsUcCcghEMhCyCLIHI7IQIrIBtiKyGbIYJxCyGosAshqBBrIQIrIBsyIqZUQlW3IIRIv3cABFAUAAB4v3IogCykiL/YwBjACJsUcCcQtEi/wVFlcGAov8UE8CFgEBIxZPBScEZUiBSFuyGIAEH/fHTLIaTwOyGk8CshpMshqL/bIashqACQAHcm95YWx0ebIagQayECKyAbO0PklXBABLAVcABCsSREkiWSUITBUSRFcGAEmMARVBAAWLAReMAosCIQcNQf4SIQeMAkL+C4oKASKL+IEED0AABCccsAApvUUBQAAEJwiwAIv2ORoAJx8SQQGri/Y4GUABpCNAAA+AC0VSUjplcnJCbXB0sACL9jgAMQASQAAEJyCwACIoZUSL9jgYSU4CSXIHRE8CJwRlSIEYW3IIRBJEgAVvd25lcmVIMgoSQAAEJyCwAIv5FCKL+SOI+DyL90xPAiOL/4j6+7FLAhaL+BaL+RZJTgSMAIv6FjEAi/c4AIv3OAhLBiRbCRZQIhaL/BYiJwllREkVFlcGAkxQIihlRBYiKmVETwwWSwWL/lBMUCKIAPYjiADyJYgA7oEDiADpgQQjiAENgQeyNYENsjQishmyOCcdskJPA7JATwKyQEyyQLJAJx6yGk8KshqAAYCyGk8JshpPCrIaTwiyGk8HshpPBrIai/uyGk8FshpPBLIai/2yGk8DshpPArIaTLIashqBBrIQIrIBs7cAPUlOA7FJcghEMgFPA4EQWwiyCLIHI7IQIrIBs7FyCERMshgnH7IashqBBrIQIrIBs4v5QQBBsUcCcghEMhCyCLIHI7IQIrIBtiKyGbIYJxCyGosAshqBBrIQIrIBsyIqZUQlW3IIRIv5cABFAUAAB4v5IogAb0hMiSJC/lmKAQEpiO3LSYv/IQULSU8CD0EABUYCgACJSU4CCUkhBQ0hBUxNKU4CuomKAgEpiO2hi/4IgYAQCCMJgYAQCkkkDkAAD4ALRVJSOmVyclB0bGewAElBAAwjCUmL/w2L/04CTYlIIkL/8YoCAYAAIihlREknBWVITEknGmVISVcICE4CJFtOAyIqZUxJTgJOA0RJIllLARVSSU4DVwIATCcFZUhMsSMWTgJJFRZXBgJMUIAEAAEAAkxQTLIYgAQ6solbshqyGoEGshAisgGztD5JVwQASwFXAAQrEkRJIlmBKQslCEwVEkRXBikiW0lAAA+AC0VSUjplcnJOZXNjsABPAiVbSYwAEkAAD4ALRVJSOmVycldlc2OwALFPA0myGIAEWt8zj7IaTwOyGkyyGkyyGoAKAAEAAAAAAAAAALIagAIAALIagQayECKyASIoZUUBRIsASXIIRIv+cABFARQyEAtJTgO2THIIRLIHsggjshAisgG2SRaL/haAAgABTFBPBLIYgARoNeO8shpMshqAAYCyGrIagQayECKyAbayGIAEbMP2BrIagQayECKyAYv/QQAXtosAcghEi/6yEYv/shKyFIEEshAisgGzTIk=", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
var BinaryStateValue = class {
  constructor(value) {
    this.value = value;
  }
  value;
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
var MarketplaceFactory = class {
  /**
   * The underlying `AppFactory` for when you want to have more flexibility
   */
  appFactory;
  /**
   * Creates a new instance of `MarketplaceFactory`
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
  params = {
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
       * Creates a new instance of the Marketplace smart contract using the create(string,string,uint64,(string,uint64))void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create transaction
       */
      create: (params) => {
        return this.appFactory.createTransaction.create(MarketplaceParamsFactory.create.create(params));
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
  };
};
var MarketplaceClient = class _MarketplaceClient {
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
   * Returns a new `MarketplaceClient` client, resolving the app by creator address and name
   * using AlgoKit app deployment semantics (i.e. looking for the app creation transaction note).
   * @param params The parameters to create the app client
   */
  static async fromCreatorAndName(params) {
    return new _MarketplaceClient(await _AppClient.fromCreatorAndName({ ...params, appSpec: APP_SPEC }));
  }
  /**
   * Returns an `MarketplaceClient` instance for the current network based on
   * pre-determined network-specific app IDs specified in the ARC-56 app spec.
   *
   * If no IDs are in the app spec or the network isn't recognised, an error is thrown.
   * @param params The parameters to create the app client
   */
  static async fromNetwork(params) {
    return new _MarketplaceClient(await _AppClient.fromNetwork({ ...params, appSpec: APP_SPEC }));
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
  };
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
  state = {
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
  };
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
};

// src/generated/ListingClient.ts
import { getABIStructFromABITuple as getABIStructFromABITuple2 } from "@algorandfoundation/algokit-utils/types/app-arc56";
import {
  AppClient as _AppClient2
} from "@algorandfoundation/algokit-utils/types/app-client";
import { AppFactory as _AppFactory2 } from "@algorandfoundation/algokit-utils/types/app-factory";
var APP_SPEC2 = { "name": "Listing", "structs": { "EscrowConfig": [{ "name": "name", "type": "string" }, { "name": "app", "type": "uint64" }], "FunderInfo": [{ "name": "account", "type": "address" }, { "name": "amount", "type": "uint64" }] }, "methods": [{ "name": "create", "args": [{ "type": "uint64", "name": "prize" }, { "type": "bool", "name": "isPrizeBox" }, { "type": "uint64", "name": "price" }, { "type": "uint64", "name": "paymentAsset" }, { "type": "uint64", "name": "expiration" }, { "type": "address", "name": "seller" }, { "type": "(address,uint64)", "struct": "FunderInfo", "name": "funder" }, { "type": "address", "name": "reservedFor" }, { "type": "uint64", "name": "creatorRoyalty" }, { "type": "uint64", "name": "gateID" }, { "type": "address", "name": "marketplace" }, { "type": "string", "name": "version" }, { "type": "uint64", "name": "akitaDAO" }, { "type": "(string,uint64)", "struct": "EscrowConfig", "name": "akitaDAOEscrow" }, { "type": "uint64", "name": "prizeAmount" }, { "type": "address", "name": "sellerReferrer" }, { "type": "uint64", "name": "factoryFloat" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "desc": "create the listing application", "events": [], "recommendations": {} }, { "name": "purchase", "args": [{ "type": "pay", "name": "payment", "desc": "- the payment for purchasing the asset" }, { "type": "address", "name": "buyer", "desc": "- the buyer of the asset" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["DeleteApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "purchaseAsa", "args": [{ "type": "axfer", "name": "assetXfer" }, { "type": "address", "name": "buyer" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["DeleteApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "delist", "args": [{ "type": "address", "name": "caller" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["DeleteApplication"] }, "readonly": false, "desc": "Deletes the app and returns the asset/mbr to the seller", "events": [], "recommendations": {} }, { "name": "changePrice", "args": [{ "type": "uint64", "name": "price" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "optin", "args": [{ "type": "pay", "name": "payment", "desc": "The payment transaction" }, { "type": "uint64", "name": "asset", "desc": "The asset to be opted into" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "optin tells the contract to opt into an asa", "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 13, "bytes": 7 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "prize": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cHJpemU=", "desc": "the asset for sale: Asset | Application ( Prize Box )" }, "isPrizeBox": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "aXNfcHJpemVfYm94", "desc": "whether or not the prize is an asset or a prize box" }, "price": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cHJpY2U=", "desc": "the price of the asset" }, "paymentAsset": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cGF5bWVudF9hc3NldA==", "desc": "the asset to use for payment" }, "expiration": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "ZXhwaXJhdGlvbg==", "desc": "the timestamp the listing expires on, once this passes all that can be done is delist" }, "seller": { "keyType": "AVMString", "valueType": "address", "key": "c2VsbGVy", "desc": "the address selling the asset" }, "reservedFor": { "keyType": "AVMString", "valueType": "address", "key": "cmVzZXJ2ZWRfZm9y", "desc": "the address the sale is reserved for" }, "creatorRoyalty": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "Y3JlYXRvcl9yb3lhbHR5", "desc": "the amount the creator will get for the sale" }, "gateID": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "Z2F0ZV9pZA==", "desc": "the gate ID to use to check if the user is qualified to buy" }, "marketplace": { "keyType": "AVMString", "valueType": "address", "key": "bWFya2V0cGxhY2U=", "desc": "The address of the marketplace that listed the asset to send the fee to\n\nIMPORTANT: this is a double sided marketplace fee contract\nthe marketplace referred to internally in the contract\nis the listing side marketplace.\nthe buyer side marketplace provides their address at\nthe time of purchase" }, "marketplaceRoyalties": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "bWFya2V0cGxhY2Vfcm95YWx0aWVz", "desc": "the amount the marketplaces will get for the sale" }, "akitaDAOEscrow": { "keyType": "AVMString", "valueType": "EscrowConfig", "key": "YWtpdGFfZXNjcm93", "desc": "the app ID for the akita DAO escrow" }, "prizeAmount": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cHJpemVfYW1vdW50", "desc": "the amount of the prize asset escrowed at listing time (0 for prize boxes)" }, "lastPriceRound": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cHJpY2Vfcm91bmQ=", "desc": "the round of the last price change (0 = never changed); purchases wait out a cooldown after it" }, "rev": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cmV2", "desc": "program revision; absent on legacy listings so the factory can tell them apart" }, "sellerReferrer": { "keyType": "AVMString", "valueType": "address", "key": "c2VsbGVyX3JlZmVycmVy", "desc": "the seller's referrer, fixed by the factory at creation (rev 3+): the verified principal's referrer\non the hinted `list`, the registry referrer on the legacy shim. Settlement pays the referral cut\nhere with no registry read. Zero address = no referral. (Rev-absent deployed listings never paid a\nseller referral: their registry lookup keyed on `Txn.sender`, which is always the factory.)" }, "factoryFloat": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "ZmFjdG9yeV9mbG9hdA==", "desc": "rev 3+: the creation MBR the factory advanced for a legacy-paid listing (0 otherwise). The factory\nreads it before deletion and recovers it ahead of the funder refund; the Listing only stores it." }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" }, "funder": { "keyType": "AVMString", "valueType": "FunderInfo", "key": "ZnVuZGVy" } }, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": {} } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [535, 695, 2877], "errorMessage": "Bytes has valid prefix" }, { "pc": [2699], "errorMessage": "ERR:errForb" }, { "pc": [1149], "errorMessage": "ERR:errIexp" }, { "pc": [1410, 1424, 1440], "errorMessage": "ERR:errIpay" }, { "pc": [2748], "errorMessage": "ERR:errIpma" }, { "pc": [2724], "errorMessage": "ERR:errIpmr" }, { "pc": [1792, 1806, 1823], "errorMessage": "ERR:errIxfr" }, { "pc": [1367, 1747], "errorMessage": "ERR:errLexp" }, { "pc": [1101, 1318, 1698, 2315], "errorMessage": "ERR:errMbff" }, { "pc": [2573], "errorMessage": "ERR:errMbsl" }, { "pc": [2652], "errorMessage": "ERR:errNdao" }, { "pc": [2338], "errorMessage": "ERR:errOscd" }, { "pc": [1340], "errorMessage": "ERR:errPama" }, { "pc": [1720], "errorMessage": "ERR:errPana" }, { "pc": [3124], "errorMessage": "ERR:errPchg" }, { "pc": [3050], "errorMessage": "ERR:errPrcd" }, { "pc": [2594], "errorMessage": "ERR:errPrlo" }, { "pc": [1396, 1776], "errorMessage": "ERR:errRfda" }, { "pc": [2100, 3100, 3164, 3180], "errorMessage": "account opted into asset" }, { "pc": [466, 558, 577, 590, 601, 717, 1478, 1502, 1865, 1888, 2633], "errorMessage": "application exists" }, { "pc": [1604, 1624, 1924, 1939, 2252], "errorMessage": "asset exists" }, { "pc": [1259, 1322, 1345, 1353, 1375, 1386, 1432, 1448, 1462, 1467, 1472, 1496, 1523, 1554, 1565, 1594, 1636, 1702, 1725, 1733, 1755, 1766, 1784, 1815, 1831, 1845, 1850, 1854, 1859, 1882, 1892, 1910, 1921, 1928, 1947, 1965, 1969, 1982, 1991, 2008, 2026, 2043, 2047, 2059, 2063, 2094, 2104, 2108, 2144, 2148, 2191, 2195, 2200, 2243, 2247, 2319, 2342, 2346, 2354, 2364, 2368, 2373, 2385, 2389, 2472, 2482, 2486, 2554, 2620, 2779, 2799, 2814, 2831, 2934, 2956, 3022, 3059, 3067, 3094, 3105, 3154], "errorMessage": "check GlobalState exists" }, { "pc": [803, 2784, 2909, 2939], "errorMessage": "errIpct" }, { "pc": [430], "errorMessage": "errNcca" }, { "pc": [445, 1002, 1049], "errorMessage": "invalid array length header" }, { "pc": [903], "errorMessage": "invalid number of bytes for arc4.bool" }, { "pc": [1010], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [943, 965, 996, 1295, 1306, 1675, 1686, 2303], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [1063, 1075, 1088], "errorMessage": "invalid number of bytes for arc4.tuple<arc4.uint64,arc4.static_array<arc4.uint8, 32>,arc4.uint64>" }, { "pc": [894, 913, 922, 931, 973, 983, 1022, 2547, 2613, 2675], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [1054], "errorMessage": "invalid number of bytes for smart_contracts/utils/base-contracts/base.ts::EscrowConfig" }, { "pc": [954], "errorMessage": "invalid number of bytes for smart_contracts/utils/types/mbr.ts::FunderInfo" }, { "pc": [540, 700, 2882], "errorMessage": "invalid number of bytes for uint64" }, { "pc": [1041], "errorMessage": "invalid tail pointer at index 0 of ((len+utf8[]),uint64)" }, { "pc": [1036], "errorMessage": "invalid tuple encoding" }, { "pc": [1666], "errorMessage": "transaction type is axfer" }, { "pc": [1286, 2667], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDggNCAxMDAwMDAgMTg0NDY3NDQwNzM3MDk1NTE2MTUKICAgIGJ5dGVjYmxvY2sgInBheW1lbnRfYXNzZXQiICJzZWxsZXIiICJha2l0YV9kYW8iICJwcml6ZSIgMHgwMDAxICJpc19wcml6ZV9ib3giICJwcmljZSIgImV4cGlyYXRpb24iICJyZXNlcnZlZF9mb3IiICJtYXJrZXRwbGFjZSIgImFraXRhX2VzY3JvdyIgIkVSUjplcnJNYmZmIiAweDE1MWY3Yzc1ICJjcmVhdG9yX3JveWFsdHkiICJwcmljZV9yb3VuZCIgInNlbGxlcl9yZWZlcnJlciIgIm1hcmtldHBsYWNlX3JveWFsdGllcyIgIkVSUjplcnJJcGF5IiAiRVJSOmVyckl4ZnIiIDB4YWRmOTJhZTQgInByaXplX2Ftb3VudCIgIm5mdF9mZWVzIiAiRVJSOmVyckxleHAiICJFUlI6ZXJyUmZkYSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTgtMjIKICAgIC8vIGV4cG9ydCBjbGFzcyBMaXN0aW5nIGV4dGVuZHMgY2xhc3NlcygKICAgIC8vICAgQWtpdGFCYXNlQ29udHJhY3QsCiAgICAvLyAgIENvbnRyYWN0V2l0aENyZWF0b3JPbmx5T3B0SW4sCiAgICAvLyAgIENoaWxkQ29udHJhY3QKICAgIC8vICkgewogICAgcHVzaGJ5dGVzcyAweDZhMTYzOTNkIDB4MTcxYzlmODggMHg2OGU4NjM0MyAvLyBtZXRob2QgInB1cmNoYXNlKHBheSxhZGRyZXNzLGFkZHJlc3Mpdm9pZCIsIG1ldGhvZCAicHVyY2hhc2VBc2EoYXhmZXIsYWRkcmVzcyxhZGRyZXNzKXZvaWQiLCBtZXRob2QgImRlbGlzdChhZGRyZXNzKXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBtYWluX3B1cmNoYXNlX3JvdXRlQDQgbWFpbl9wdXJjaGFzZUFzYV9yb3V0ZUA1IG1haW5fZGVsaXN0X3JvdXRlQDYKCm1haW5fc3dpdGNoX2Nhc2VfbmV4dEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxOC0yMgogICAgLy8gZXhwb3J0IGNsYXNzIExpc3RpbmcgZXh0ZW5kcyBjbGFzc2VzKAogICAgLy8gICBBa2l0YUJhc2VDb250cmFjdCwKICAgIC8vICAgQ29udHJhY3RXaXRoQ3JlYXRvck9ubHlPcHRJbiwKICAgIC8vICAgQ2hpbGRDb250cmFjdAogICAgLy8gKSB7CiAgICB0eG4gT25Db21wbGV0aW9uCiAgICAhCiAgICBhc3NlcnQKICAgIHR4biBBcHBsaWNhdGlvbklECiAgICBieiBtYWluX2NyZWF0ZV9Ob09wQDE0CiAgICBwdXNoYnl0ZXNzIDB4MTkzOTZjNGEgMHgzM2U5MmM5NCAweDg1NGRlZGUwIDB4M2VhMTE4MzIgLy8gbWV0aG9kICJjaGFuZ2VQcmljZSh1aW50NjQpdm9pZCIsIG1ldGhvZCAidXBkYXRlQWtpdGFEQU8odWludDY0KXZvaWQiLCBtZXRob2QgIm9wVXAoKXZvaWQiLCBtZXRob2QgIm9wdGluKHBheSx1aW50NjQpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIGNoYW5nZVByaWNlIHVwZGF0ZUFraXRhREFPIG1haW5fb3BVcF9yb3V0ZUAxMSBvcHRpbgogICAgZXJyCgptYWluX29wVXBfcm91dGVAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzAKICAgIC8vIG9wVXAoKTogdm9pZCB7IH0KICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCm1haW5fY3JlYXRlX05vT3BAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE4LTIyCiAgICAvLyBleHBvcnQgY2xhc3MgTGlzdGluZyBleHRlbmRzIGNsYXNzZXMoCiAgICAvLyAgIEFraXRhQmFzZUNvbnRyYWN0LAogICAgLy8gICBDb250cmFjdFdpdGhDcmVhdG9yT25seU9wdEluLAogICAgLy8gICBDaGlsZENvbnRyYWN0CiAgICAvLyApIHsKICAgIHB1c2hieXRlcyAweDljNTQyNDA5IC8vIG1ldGhvZCAiY3JlYXRlKHVpbnQ2NCxib29sLHVpbnQ2NCx1aW50NjQsdWludDY0LGFkZHJlc3MsKGFkZHJlc3MsdWludDY0KSxhZGRyZXNzLHVpbnQ2NCx1aW50NjQsYWRkcmVzcyxzdHJpbmcsdWludDY0LChzdHJpbmcsdWludDY0KSx1aW50NjQsYWRkcmVzcyx1aW50NjQpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIGNyZWF0ZQogICAgZXJyCgptYWluX2RlbGlzdF9yb3V0ZUA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0NDgKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6ICdEZWxldGVBcHBsaWNhdGlvbicgfSkKICAgIHR4biBPbkNvbXBsZXRpb24KICAgIHB1c2hpbnQgNSAvLyBEZWxldGVBcHBsaWNhdGlvbgogICAgPT0KICAgIHR4biBBcHBsaWNhdGlvbklECiAgICAmJgogICAgYXNzZXJ0CiAgICBiIGRlbGlzdAoKbWFpbl9wdXJjaGFzZUFzYV9yb3V0ZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MjEKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6ICdEZWxldGVBcHBsaWNhdGlvbicgfSkKICAgIHR4biBPbkNvbXBsZXRpb24KICAgIHB1c2hpbnQgNSAvLyBEZWxldGVBcHBsaWNhdGlvbgogICAgPT0KICAgIHR4biBBcHBsaWNhdGlvbklECiAgICAmJgogICAgYXNzZXJ0CiAgICBiIHB1cmNoYXNlQXNhCgptYWluX3B1cmNoYXNlX3JvdXRlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM4OAogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogJ0RlbGV0ZUFwcGxpY2F0aW9uJyB9KQogICAgdHhuIE9uQ29tcGxldGlvbgogICAgcHVzaGludCA1IC8vIERlbGV0ZUFwcGxpY2F0aW9uCiAgICA9PQogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgICYmCiAgICBhc3NlcnQKICAgIGIgcHVyY2hhc2UKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KGFraXRhREFPOiB1aW50NjQsIGFzc2V0OiB1aW50NjQsIHRpbWVUb1VubG9jazogdWludDY0LCBleHBpcmF0aW9uOiB1aW50NjQsIGFsbG9jYXRpb25zOiBieXRlcywgc3VtOiB1aW50NjQsIGNsb3NlT3V0OiB1aW50NjQsIHJlY2xhaW1UbzogYnl0ZXMpIC0+IGJ5dGVzLCBieXRlczoKY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzUzCiAgICAvLyBleHBvcnQgZnVuY3Rpb24gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudChha2l0YURBTzogQXBwbGljYXRpb24sIGFzc2V0OiB1aW50NjQsIHRpbWVUb1VubG9jazogdWludDY0LCBleHBpcmF0aW9uOiB1aW50NjQsIGFsbG9jYXRpb25zOiBVc2VyQWxsb2NhdGlvbltdLCBzdW06IHVpbnQ2NCwgY2xvc2VPdXQ6IGJvb2xlYW4sIHJlY2xhaW1UbzogQWNjb3VudCk6IHsgaWQ6IHVpbnQ2NCwgY29zdDogdWludDY0IH0gewogICAgcHJvdG8gOCAyCiAgICBwdXNoYnl0ZXMgIiIKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc1NAogICAgLy8gYXNzZXJ0KGFzc2V0ICE9PSAwIHx8IGNsb3NlT3V0ID09PSBmYWxzZSwgZXJyQ2Fubm90Q2xvc2VPdXRPZkFsZ29Gb3JiaWRkZW4pCiAgICBmcmFtZV9kaWcgLTcKICAgIGJueiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2Jvb2xfdHJ1ZUAyCiAgICBmcmFtZV9kaWcgLTIKICAgIGJueiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2Jvb2xfZmFsc2VAMwoKY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9ib29sX3RydWVAMjoKICAgIGludGNfMSAvLyAxCgpjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2Jvb2xfbWVyZ2VANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzU0CiAgICAvLyBhc3NlcnQoYXNzZXQgIT09IDAgfHwgY2xvc2VPdXQgPT09IGZhbHNlLCBlcnJDYW5ub3RDbG9zZU91dE9mQWxnb0ZvcmJpZGRlbikKICAgIGFzc2VydCAvLyBlcnJOY2NhCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIwNgogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgZnJhbWVfZGlnIC04CiAgICBwdXNoYnl0ZXMgImFhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzU1CiAgICAvLyBjb25zdCByZXdhcmRzQXBwID0gZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5yZXdhcmRzCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzU4CiAgICAvLyBjb25zdCBtYnI6IHVpbnQ2NCA9IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9ucy5sZW5ndGgpCiAgICBmcmFtZV9kaWcgLTQKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDI1MzAwCiAgICAqCiAgICBwdXNoaW50IDU0NTAwCiAgICArCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc2MAogICAgLy8gaWYgKGFzc2V0ID09PSAwKSB7CiAgICBmcmFtZV9kaWcgLTcKICAgIGJueiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2Vsc2VfYm9keUA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc2MS03NzMKICAgIC8vIGlkID0gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUuY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudD4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyICsgc3VtCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdGltZVRvVW5sb2NrLAogICAgLy8gICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgYWxsb2NhdGlvbnMsCiAgICAvLyAgICAgcmVjbGFpbVRvCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc2NQogICAgLy8gcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzY2CiAgICAvLyBhbW91bnQ6IG1iciArIHN1bQogICAgZGlnIDIKICAgIGZyYW1lX2RpZyAtMwogICAgKwogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzY0LTc2NwogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogbWJyICsgc3VtCiAgICAvLyB9KSwKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzYxLTc3MwogICAgLy8gaWQgPSBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5jcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50Pih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtYnIgKyBzdW0KICAgIC8vICAgICB9KSwKICAgIC8vICAgICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICBhbGxvY2F0aW9ucywKICAgIC8vICAgICByZWNsYWltVG8KICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3NjgKICAgIC8vIHRpbWVUb1VubG9jaywKICAgIGZyYW1lX2RpZyAtNgogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3NjkKICAgIC8vIGV4cGlyYXRpb24sCiAgICBmcmFtZV9kaWcgLTUKICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc2MS03NzMKICAgIC8vIGlkID0gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUuY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudD4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyICsgc3VtCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdGltZVRvVW5sb2NrLAogICAgLy8gICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgYWxsb2NhdGlvbnMsCiAgICAvLyAgICAgcmVjbGFpbVRvCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBwdXNoYnl0ZXMgMHhkY2FjMDkzNSAvLyBtZXRob2QgImNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQocGF5LHVpbnQ2NCx1aW50NjQsKGFkZHJlc3MsdWludDY0KVtdLGFkZHJlc3MpdWludDY0IgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC00CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC0xCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgc3dhcAogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjIDEyIC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKCmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYWZ0ZXJfaWZfZWxzZUAyMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODE1CiAgICAvLyByZXR1cm4geyBpZCwgY29zdCB9CiAgICBzd2FwCiAgICBpdG9iCiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtNAogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDMKICAgIHJldHN1YgoKY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9lbHNlX2JvZHlAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Nzc1CiAgICAvLyBpZiAoIUFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MuaXNPcHRlZEluKEFzc2V0KGFzc2V0KSkpIHsKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZnJhbWVfZGlnIC03CiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYnogY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9pZl9ib2R5QDkKICAgIGRpZyAxCgpjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2FmdGVyX2lmX2Vsc2VAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc5MAogICAgLy8gYXNzZXRSZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIGRpZyAxCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBzd2FwCiAgICBjb3ZlciA0CiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc4OQogICAgLy8gY29uc3QgdHJhbnNmZXJUeG4gPSBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3OTUKICAgIC8vIGlmIChjbG9zZU91dCkgewogICAgZnJhbWVfZGlnIC0yCiAgICBieiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2FmdGVyX2lmX2Vsc2VAMTQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Nzk2CiAgICAvLyB0cmFuc2ZlclR4bi5zZXQoeyBhc3NldENsb3NlVG86IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MgfSkKICAgIGRpZyAxCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBpbnRjXzEgLy8gMQogICAgZnJhbWVfYnVyeSAwCiAgICBmcmFtZV9idXJ5IDEKCmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYWZ0ZXJfaWZfZWxzZUAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Nzk5LTgxMgogICAgLy8gaWQgPSBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5jcmVhdGVJbnN0YW50QXNhRGlzYnVyc2VtZW50Pih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtYnIKICAgIC8vICAgICB9KSwKICAgIC8vICAgICB0cmFuc2ZlclR4biwKICAgIC8vICAgICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICBhbGxvY2F0aW9ucywKICAgIC8vICAgICByZWNsYWltVG8KICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODAzCiAgICAvLyByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIGRpZyAxCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICB1bmNvdmVyIDMKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjgwMi04MDUKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IG1icgogICAgLy8gfSksCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjgwNgogICAgLy8gdHJhbnNmZXJUeG4sCiAgICBpdHhuX25leHQKICAgIGZyYW1lX2RpZyAwCiAgICBieiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X25leHRfZmllbGRAMTcKICAgIGZyYW1lX2RpZyAxCiAgICBpdHhuX2ZpZWxkIEFzc2V0Q2xvc2VUbwoKY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9uZXh0X2ZpZWxkQDE3OgogICAgZnJhbWVfZGlnIC03CiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgZnJhbWVfZGlnIC0zCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3ODktNzkzCiAgICAvLyBjb25zdCB0cmFuc2ZlclR4biA9IGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgIGFzc2V0UmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgIGFzc2V0QW1vdW50OiBzdW0sCiAgICAvLyAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vIH0pCiAgICBpbnRjXzMgLy8gNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc5OS04MTIKICAgIC8vIGlkID0gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUuY3JlYXRlSW5zdGFudEFzYURpc2J1cnNlbWVudD4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdHJhbnNmZXJUeG4sCiAgICAvLyAgICAgdGltZVRvVW5sb2NrLAogICAgLy8gICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgYWxsb2NhdGlvbnMsCiAgICAvLyAgICAgcmVjbGFpbVRvCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODA3CiAgICAvLyB0aW1lVG9VbmxvY2ssCiAgICBmcmFtZV9kaWcgLTYKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODA4CiAgICAvLyBleHBpcmF0aW9uLAogICAgZnJhbWVfZGlnIC01CiAgICBpdG9iCiAgICB1bmNvdmVyIDMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3OTktODEyCiAgICAvLyBpZCA9IGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLmNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnQ+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1icgogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHRyYW5zZmVyVHhuLAogICAgLy8gICAgIHRpbWVUb1VubG9jaywKICAgIC8vICAgICBleHBpcmF0aW9uLAogICAgLy8gICAgIGFsbG9jYXRpb25zLAogICAgLy8gICAgIHJlY2xhaW1UbwogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgcHVzaGJ5dGVzIDB4YTNhMTZjYWEgLy8gbWV0aG9kICJjcmVhdGVJbnN0YW50QXNhRGlzYnVyc2VtZW50KHBheSxheGZlcix1aW50NjQsdWludDY0LChhZGRyZXNzLHVpbnQ2NClbXSxhZGRyZXNzKXVpbnQ2NCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGZyYW1lX2RpZyAtNAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGZyYW1lX2RpZyAtMQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIHN3YXAKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlYyAxMiAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICBiIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYWZ0ZXJfaWZfZWxzZUAyMAoKY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9pZl9ib2R5QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc3NgogICAgLy8gY29zdCArPSBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGRpZyAxCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Nzc3LTc4NgogICAgLy8gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIEFzc2V0KGFzc2V0KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3ODEKICAgIC8vIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgZGlnIDEKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3ODIKICAgIC8vIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc4MC03ODMKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gfSksCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc3Ny03ODYKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBBc3NldChhc3NldCkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3ODQKICAgIC8vIEFzc2V0KGFzc2V0KQogICAgZnJhbWVfZGlnIC03CiAgICBpdG9iCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Nzc3LTc4NgogICAgLy8gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIEFzc2V0KGFzc2V0KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgcHVzaGJ5dGVzIDB4Mzk0ZWFlYjIgLy8gbWV0aG9kICJvcHRJbihwYXksdWludDY0KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBiIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYWZ0ZXJfaWZfZWxzZUAxMgoKY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9ib29sX2ZhbHNlQDM6CiAgICBpbnRjXzAgLy8gMAogICAgYiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2Jvb2xfbWVyZ2VANAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnNlbmRSZWZlcnJhbFBheW1lbnRUbyhha2l0YURBTzogdWludDY0LCByZWZlcnJlcjogYnl0ZXMsIGFzc2V0OiB1aW50NjQsIGFtb3VudDogdWludDY0LCByZWNsYWltVG86IGJ5dGVzKSAtPiBieXRlczoKc2VuZFJlZmVycmFsUGF5bWVudFRvOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5OTIKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiBzZW5kUmVmZXJyYWxQYXltZW50VG8oYWtpdGFEQU86IEFwcGxpY2F0aW9uLCByZWZlcnJlcjogQWNjb3VudCwgYXNzZXQ6IHVpbnQ2NCwgYW1vdW50OiB1aW50NjQsIHJlY2xhaW1UbzogQWNjb3VudCk6IFJlZmVycmFsUGF5bWVudEluZm8gewogICAgcHJvdG8gNSAxCiAgICBwdXNoYnl0ZXMgIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTk0CiAgICAvLyBpZiAoYW1vdW50ID4gMCAmJiByZWZlcnJlciAhPT0gR2xvYmFsLnplcm9BZGRyZXNzKSB7CiAgICBmcmFtZV9kaWcgLTIKICAgIGJ6IHNlbmRSZWZlcnJhbFBheW1lbnRUb19hZnRlcl9pZl9lbHNlQDYKICAgIGZyYW1lX2RpZyAtNAogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICAhPQogICAgYnogc2VuZFJlZmVycmFsUGF5bWVudFRvX2FmdGVyX2lmX2Vsc2VANgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMzAKICAgIC8vIGNvbnN0IFt3YWxsZXRGZWVzQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0RmVlcykpCiAgICBmcmFtZV9kaWcgLTUKICAgIHB1c2hieXRlcyAid2FsbGV0X2ZlZXMiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk5NgogICAgLy8gY29uc3QgeyByZWZlcnJlclBlcmNlbnRhZ2UgfSA9IGdldFdhbGxldEZlZXMoYWtpdGFEQU8pCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjcwCiAgICAvLyBhc3NlcnQocCA8PSBESVZJU09SLCBlcnJJbnZhbGlkUGVyY2VudGFnZSkKICAgIGR1cAogICAgaW50YyA0IC8vIDEwMDAwMAogICAgPD0KICAgIGFzc2VydCAvLyBlcnJJcGN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI3MQogICAgLy8gcmV0dXJuIG9wLmRpdncoLi4ub3AubXVsdyhhLCBwKSwgRElWSVNPUikKICAgIGZyYW1lX2RpZyAtMgogICAgbXVsdwogICAgaW50YyA0IC8vIDEwMDAwMAogICAgZGl2dwogICAgZHVwCiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTk5CiAgICAvLyBpZiAocmVmZXJyYWxGZWUgPT09IDAgJiYgYW1vdW50ID4gMCkgewogICAgYm56IHNlbmRSZWZlcnJhbFBheW1lbnRUb19hZnRlcl9pZl9lbHNlQDUKICAgIGZyYW1lX2RpZyAtMgogICAgYnogc2VuZFJlZmVycmFsUGF5bWVudFRvX2FmdGVyX2lmX2Vsc2VANQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDAwCiAgICAvLyByZWZlcnJhbEZlZSA9IDEKICAgIGludGNfMSAvLyAxCiAgICBmcmFtZV9idXJ5IDAKCnNlbmRSZWZlcnJhbFBheW1lbnRUb19hZnRlcl9pZl9lbHNlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwMDYKICAgIC8vIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwMDcKICAgIC8vIChHbG9iYWwubGF0ZXN0VGltZXN0YW1wICsgVEhJUlRZX0RBWVMpLAogICAgZHVwCiAgICBwdXNoaW50IDI1OTIwMDAKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTAwOAogICAgLy8gW3sgYWRkcmVzczogcmVmZXJyZXIsIGFtb3VudDogcmVmZXJyYWxGZWUgfV0sCiAgICBmcmFtZV9kaWcgMAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBpdG9iCiAgICBmcmFtZV9kaWcgLTQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYnl0ZWMgNCAvLyAweDAwMDEKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDAzLTEwMTIKICAgIC8vIGNvbnN0IHsgY29zdDogcmVmZXJyYWxNYnIgfSA9IGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIGFraXRhREFPLAogICAgLy8gICBhc3NldCwKICAgIC8vICAgR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIC8vICAgKEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgKyBUSElSVFlfREFZUyksCiAgICAvLyAgIFt7IGFkZHJlc3M6IHJlZmVycmVyLCBhbW91bnQ6IHJlZmVycmFsRmVlIH1dLAogICAgLy8gICByZWZlcnJhbEZlZSwKICAgIC8vICAgZmFsc2UsCiAgICAvLyAgIHJlY2xhaW1UbwogICAgLy8gKQogICAgZnJhbWVfZGlnIC01CiAgICBmcmFtZV9kaWcgLTMKICAgIHVuY292ZXIgNQogICAgdW5jb3ZlciA0CiAgICB1bmNvdmVyIDQKICAgIGRpZyA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwMTAKICAgIC8vIGZhbHNlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTAwMy0xMDEyCiAgICAvLyBjb25zdCB7IGNvc3Q6IHJlZmVycmFsTWJyIH0gPSBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICBha2l0YURBTywKICAgIC8vICAgYXNzZXQsCiAgICAvLyAgIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICAvLyAgIChHbG9iYWwubGF0ZXN0VGltZXN0YW1wICsgVEhJUlRZX0RBWVMpLAogICAgLy8gICBbeyBhZGRyZXNzOiByZWZlcnJlciwgYW1vdW50OiByZWZlcnJhbEZlZSB9XSwKICAgIC8vICAgcmVmZXJyYWxGZWUsCiAgICAvLyAgIGZhbHNlLAogICAgLy8gICByZWNsYWltVG8KICAgIC8vICkKICAgIGZyYW1lX2RpZyAtMQogICAgY2FsbHN1YiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50CiAgICBwb3AKICAgIGV4dHJhY3QgOCA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwMTQKICAgIC8vIHJldHVybiB7IGxlZnRvdmVyOiAoYW1vdW50IC0gcmVmZXJyYWxGZWUpLCByZWZlcnJhbE1iciB9CiAgICBmcmFtZV9kaWcgLTIKICAgIHVuY292ZXIgMgogICAgLQogICAgaXRvYgogICAgc3dhcAogICAgY29uY2F0CiAgICBzd2FwCiAgICByZXRzdWIKCnNlbmRSZWZlcnJhbFBheW1lbnRUb19hZnRlcl9pZl9lbHNlQDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwMTcKICAgIC8vIHJldHVybiB7IGxlZnRvdmVyOiBhbW91bnQsIHJlZmVycmFsTWJyOiAwIH0KICAgIGZyYW1lX2RpZyAtMgogICAgaXRvYgogICAgaW50Y18wIC8vIDAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgc3dhcAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo6TGlzdGluZy5jcmVhdGVbcm91dGluZ10oKSAtPiB2b2lkOgpjcmVhdGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMzMAogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5ib29sCiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Yml0CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA1CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA2CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA3CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGxlbgogICAgcHVzaGludCA0MAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL21ici50czo6RnVuZGVySW5mbwogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgOAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgOQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTAKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDExCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBzd2FwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTQKICAgIGR1cAogICAgY292ZXIgMgogICAgZHVwCiAgICBsZW4KICAgIGRpZyAxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgcHVzaGludCAxMAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBhdCBpbmRleCAwIG9mICgobGVuK3V0ZjhbXSksdWludDY0KQogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICBkaWcgMgogICAgc3Vic3RyaW5nMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMTIKICAgICsKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpFc2Nyb3dDb25maWcKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDE1CiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA0OAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC50dXBsZTxhcmM0LnVpbnQ2NCxhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4sYXJjNC51aW50NjQ+CiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDE1CiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA0OAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC50dXBsZTxhcmM0LnVpbnQ2NCxhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4sYXJjNC51aW50NjQ+CiAgICBleHRyYWN0IDggMzIKICAgIHN3YXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDE1CiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA0OAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC50dXBsZTxhcmM0LnVpbnQ2NCxhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4sYXJjNC51aW50NjQ+CiAgICBwdXNoaW50IDQwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNTAKICAgIC8vIGxvZ2dlZEFzc2VydChHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25JZCAhPT0gMCwgZXJyTXVzdEJlQ2FsbGVkRnJvbUZhY3RvcnkpCiAgICBnbG9iYWwgQ2FsbGVyQXBwbGljYXRpb25JRAogICAgYm56IGNyZWF0ZV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMTEgLy8gIkVSUjplcnJNYmZmIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck1iZmYKCmNyZWF0ZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjcKICAgIC8vIHByaXplID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5UHJpemUgfSkKICAgIGJ5dGVjXzMgLy8gInByaXplIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNTIKICAgIC8vIHRoaXMucHJpemUudmFsdWUgPSBwcml6ZQogICAgdW5jb3ZlciAxNwogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjkKICAgIC8vIGlzUHJpemVCb3ggPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5SXNQcml6ZUJveCB9KQogICAgYnl0ZWMgNSAvLyAiaXNfcHJpemVfYm94IgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNTMKICAgIC8vIHRoaXMuaXNQcml6ZUJveC52YWx1ZSA9IGlzUHJpemVCb3gKICAgIHVuY292ZXIgMTYKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMxCiAgICAvLyBwcmljZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVByaWNlIH0pCiAgICBieXRlYyA2IC8vICJwcmljZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzU0CiAgICAvLyB0aGlzLnByaWNlLnZhbHVlID0gcHJpY2UKICAgIHVuY292ZXIgMTUKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMzCiAgICAvLyBwYXltZW50QXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVBheW1lbnRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAicGF5bWVudF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzU1CiAgICAvLyB0aGlzLnBheW1lbnRBc3NldC52YWx1ZSA9IEFzc2V0KHBheW1lbnRBc3NldCkKICAgIHVuY292ZXIgMTQKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM1NgogICAgLy8gbG9nZ2VkQXNzZXJ0KGV4cGlyYXRpb24gPT09IDAgfHwgZXhwaXJhdGlvbiA+IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsIGVyckludmFsaWRFeHBpcmF0aW9uKQogICAgZHVwCiAgICBieiBjcmVhdGVfYm9vbF90cnVlQDUKICAgIGR1cAogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgPgogICAgYnogY3JlYXRlX2Jvb2xfZmFsc2VANgoKY3JlYXRlX2Jvb2xfdHJ1ZUA1OgogICAgaW50Y18xIC8vIDEKCmNyZWF0ZV9ib29sX21lcmdlQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM1NgogICAgLy8gbG9nZ2VkQXNzZXJ0KGV4cGlyYXRpb24gPT09IDAgfHwgZXhwaXJhdGlvbiA+IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsIGVyckludmFsaWRFeHBpcmF0aW9uKQogICAgYm56IGNyZWF0ZV9hZnRlcl9hc3NlcnRAOQogICAgcHVzaGJ5dGVzICJFUlI6ZXJySWV4cCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJZXhwCgpjcmVhdGVfYWZ0ZXJfYXNzZXJ0QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM1CiAgICAvLyBleHBpcmF0aW9uID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5RXhwaXJhdGlvbiB9KQogICAgYnl0ZWMgNyAvLyAiZXhwaXJhdGlvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzU3CiAgICAvLyB0aGlzLmV4cGlyYXRpb24udmFsdWUgPSBleHBpcmF0aW9uCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNwogICAgLy8gc2VsbGVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVNlbGxlciB9KQogICAgYnl0ZWNfMSAvLyAic2VsbGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNTgKICAgIC8vIHRoaXMuc2VsbGVyLnZhbHVlID0gc2VsbGVyCiAgICB1bmNvdmVyIDEyCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2NoaWxkLnRzOjExCiAgICAvLyBmdW5kZXIgPSBHbG9iYWxTdGF0ZTxGdW5kZXJJbmZvPih7IGtleTogR2xvYmFsU3RhdGVLZXlGdW5kZXIgfSkKICAgIHB1c2hieXRlcyAiZnVuZGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNTkKICAgIC8vIHRoaXMuZnVuZGVyLnZhbHVlID0gY2xvbmUoZnVuZGVyKQogICAgdW5jb3ZlciAxMQogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzkKICAgIC8vIHJlc2VydmVkRm9yID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVJlc2VydmVkRm9yIH0pCiAgICBieXRlYyA4IC8vICJyZXNlcnZlZF9mb3IiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM2MAogICAgLy8gdGhpcy5yZXNlcnZlZEZvci52YWx1ZSA9IHJlc2VydmVkRm9yCiAgICB1bmNvdmVyIDEwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MQogICAgLy8gY3JlYXRvclJveWFsdHkgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlDcmVhdG9yUm95YWx0eSB9KQogICAgYnl0ZWMgMTMgLy8gImNyZWF0b3Jfcm95YWx0eSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzYxCiAgICAvLyB0aGlzLmNyZWF0b3JSb3lhbHR5LnZhbHVlID0gY3JlYXRvclJveWFsdHkKICAgIHVuY292ZXIgOQogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDMKICAgIC8vIGdhdGVJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleUdhdGVJRCB9KQogICAgcHVzaGJ5dGVzICJnYXRlX2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNjIKICAgIC8vIHRoaXMuZ2F0ZUlELnZhbHVlID0gZ2F0ZUlECiAgICB1bmNvdmVyIDgKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjU0CiAgICAvLyBtYXJrZXRwbGFjZSA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlNYXJrZXRwbGFjZSB9KQogICAgYnl0ZWMgOSAvLyAibWFya2V0cGxhY2UiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM2MwogICAgLy8gdGhpcy5tYXJrZXRwbGFjZS52YWx1ZSA9IG1hcmtldHBsYWNlCiAgICB1bmNvdmVyIDcKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTQKICAgIC8vIHZlcnNpb24gPSBHbG9iYWxTdGF0ZTxzdHJpbmc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleVZlcnNpb24gfSkKICAgIHB1c2hieXRlcyAidmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzY0CiAgICAvLyB0aGlzLnZlcnNpb24udmFsdWUgPSB2ZXJzaW9uCiAgICB1bmNvdmVyIDYKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18yIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM2NQogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSA9IGFraXRhREFPCiAgICB1bmNvdmVyIDUKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjU4CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleUFraXRhREFPRXNjcm93IH0pCiAgICBieXRlYyAxMCAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNjYKICAgIC8vIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgPSBjbG9uZShha2l0YURBT0VzY3JvdykKICAgIHVuY292ZXIgNAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NjAKICAgIC8vIHByaXplQW1vdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5UHJpemVBbW91bnQgfSkKICAgIGJ5dGVjIDIwIC8vICJwcml6ZV9hbW91bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM2NwogICAgLy8gdGhpcy5wcml6ZUFtb3VudC52YWx1ZSA9IHByaXplQW1vdW50CiAgICB1bmNvdmVyIDMKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjYyCiAgICAvLyBsYXN0UHJpY2VSb3VuZCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVByaWNlUm91bmQgfSkKICAgIGJ5dGVjIDE0IC8vICJwcmljZV9yb3VuZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzY4CiAgICAvLyB0aGlzLmxhc3RQcmljZVJvdW5kLnZhbHVlID0gMAogICAgaW50Y18wIC8vIDAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjY0CiAgICAvLyByZXYgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlSZXZpc2lvbiB9KQogICAgcHVzaGJ5dGVzICJyZXYiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM2OQogICAgLy8gdGhpcy5yZXYudmFsdWUgPSBMaXN0aW5nUmV2aXNpb24KICAgIHB1c2hpbnQgMwogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NzEKICAgIC8vIHNlbGxlclJlZmVycmVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVNlbGxlclJlZmVycmVyIH0pCiAgICBieXRlYyAxNSAvLyAic2VsbGVyX3JlZmVycmVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNzAKICAgIC8vIHRoaXMuc2VsbGVyUmVmZXJyZXIudmFsdWUgPSBzZWxsZXJSZWZlcnJlcgogICAgdW5jb3ZlciAyCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo3NgogICAgLy8gZmFjdG9yeUZsb2F0ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5RmFjdG9yeUZsb2F0IH0pCiAgICBwdXNoYnl0ZXMgImZhY3RvcnlfZmxvYXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM3MQogICAgLy8gdGhpcy5mYWN0b3J5RmxvYXQudmFsdWUgPSBmYWN0b3J5RmxvYXQKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM3NAogICAgLy8gdGhpcy5tYXJrZXRwbGFjZVJveWFsdGllcy52YWx1ZSA9IGdldE5GVEZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkubWFya2V0cGxhY2VDb21wb3NhYmxlUGVyY2VudGFnZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzIgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6Mzc0CiAgICAvLyB0aGlzLm1hcmtldHBsYWNlUm95YWx0aWVzLnZhbHVlID0gZ2V0TkZURmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKS5tYXJrZXRwbGFjZUNvbXBvc2FibGVQZXJjZW50YWdlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNTUKICAgIC8vIGNvbnN0IFtuZnRGZWVzQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzTkZURmVlcykpCiAgICBieXRlYyAyMSAvLyAibmZ0X2ZlZXMiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM3NAogICAgLy8gdGhpcy5tYXJrZXRwbGFjZVJveWFsdGllcy52YWx1ZSA9IGdldE5GVEZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkubWFya2V0cGxhY2VDb21wb3NhYmxlUGVyY2VudGFnZQogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NTYKICAgIC8vIG1hcmtldHBsYWNlUm95YWx0aWVzID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5TWFya2V0cGxhY2VSb3lhbHRpZXMgfSkKICAgIGJ5dGVjIDE2IC8vICJtYXJrZXRwbGFjZV9yb3lhbHRpZXMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM3NAogICAgLy8gdGhpcy5tYXJrZXRwbGFjZVJveWFsdGllcy52YWx1ZSA9IGdldE5GVEZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkubWFya2V0cGxhY2VDb21wb3NhYmxlUGVyY2VudGFnZQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzMwCiAgICAvLyBAYWJpbWV0aG9kKHsgb25DcmVhdGU6ICdyZXF1aXJlJyB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKY3JlYXRlX2Jvb2xfZmFsc2VANjoKICAgIGludGNfMCAvLyAwCiAgICBiIGNyZWF0ZV9ib29sX21lcmdlQDcKCgovLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjpMaXN0aW5nLnB1cmNoYXNlW3JvdXRpbmddKCkgLT4gdm9pZDoKcHVyY2hhc2U6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM4OAogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogJ0RlbGV0ZUFwcGxpY2F0aW9uJyB9KQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM5NAogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywgZXJyTXVzdEJlQ2FsbGVkRnJvbUZhY3RvcnkpCiAgICB0eG4gU2VuZGVyCiAgICBnbG9iYWwgQ3JlYXRvckFkZHJlc3MKICAgID09CiAgICBibnogcHVyY2hhc2VfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDExIC8vICJFUlI6ZXJyTWJmZiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJNYmZmCgpwdXJjaGFzZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6Mzk1CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5wYXltZW50QXNzZXQudmFsdWUuaWQgPT09IDAsIGVyclBheW1lbnRBc3NldE11c3RCZUFsZ28pCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMwogICAgLy8gcGF5bWVudEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQYXltZW50QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInBheW1lbnRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM5NQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLmlkID09PSAwLCBlcnJQYXltZW50QXNzZXRNdXN0QmVBbGdvKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IHB1cmNoYXNlX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJQYW1hIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclBhbWEKCnB1cmNoYXNlX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozOTYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmV4cGlyYXRpb24udmFsdWUgPT09IDAgfHwgdGhpcy5leHBpcmF0aW9uLnZhbHVlID4gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwgZXJyTGlzdGluZ0V4cGlyZWQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNQogICAgLy8gZXhwaXJhdGlvbiA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleUV4cGlyYXRpb24gfSkKICAgIGJ5dGVjIDcgLy8gImV4cGlyYXRpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM5NgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZXhwaXJhdGlvbi52YWx1ZSA9PT0gMCB8fCB0aGlzLmV4cGlyYXRpb24udmFsdWUgPiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLCBlcnJMaXN0aW5nRXhwaXJlZCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBwdXJjaGFzZV9ib29sX3RydWVANwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzUKICAgIC8vIGV4cGlyYXRpb24gPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlFeHBpcmF0aW9uIH0pCiAgICBieXRlYyA3IC8vICJleHBpcmF0aW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozOTYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmV4cGlyYXRpb24udmFsdWUgPT09IDAgfHwgdGhpcy5leHBpcmF0aW9uLnZhbHVlID4gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwgZXJyTGlzdGluZ0V4cGlyZWQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgPgogICAgYnogcHVyY2hhc2VfYm9vbF9mYWxzZUA4CgpwdXJjaGFzZV9ib29sX3RydWVANzoKICAgIGludGNfMSAvLyAxCgpwdXJjaGFzZV9ib29sX21lcmdlQDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM5NgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZXhwaXJhdGlvbi52YWx1ZSA9PT0gMCB8fCB0aGlzLmV4cGlyYXRpb24udmFsdWUgPiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLCBlcnJMaXN0aW5nRXhwaXJlZCkKICAgIGJueiBwdXJjaGFzZV9hZnRlcl9hc3NlcnRAMTEKICAgIGJ5dGVjIDIyIC8vICJFUlI6ZXJyTGV4cCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJMZXhwCgpwdXJjaGFzZV9hZnRlcl9hc3NlcnRAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM5NwogICAgLy8gdGhpcy5hc3NlcnRQcmljZVNldHRsZWQoKQogICAgY2FsbHN1YiBhc3NlcnRQcmljZVNldHRsZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6Mzk5CiAgICAvLyBpZiAodGhpcy5yZXNlcnZlZEZvci52YWx1ZSAhPT0gR2xvYmFsLnplcm9BZGRyZXNzKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozOQogICAgLy8gcmVzZXJ2ZWRGb3IgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5UmVzZXJ2ZWRGb3IgfSkKICAgIGJ5dGVjIDggLy8gInJlc2VydmVkX2ZvciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6Mzk5CiAgICAvLyBpZiAodGhpcy5yZXNlcnZlZEZvci52YWx1ZSAhPT0gR2xvYmFsLnplcm9BZGRyZXNzKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICAhPQogICAgYnogcHVyY2hhc2VfYWZ0ZXJfaWZfZWxzZUAxNQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MDAKICAgIC8vIGxvZ2dlZEFzc2VydChidXllciA9PT0gdGhpcy5yZXNlcnZlZEZvci52YWx1ZSwgZXJyUmVzZXJ2ZWRGb3JEaWZmZXJlbnRBZGRyZXNzKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzkKICAgIC8vIHJlc2VydmVkRm9yID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVJlc2VydmVkRm9yIH0pCiAgICBieXRlYyA4IC8vICJyZXNlcnZlZF9mb3IiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQwMAogICAgLy8gbG9nZ2VkQXNzZXJ0KGJ1eWVyID09PSB0aGlzLnJlc2VydmVkRm9yLnZhbHVlLCBlcnJSZXNlcnZlZEZvckRpZmZlcmVudEFkZHJlc3MpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDEKICAgID09CiAgICBibnogcHVyY2hhc2VfYWZ0ZXJfaWZfZWxzZUAxNQogICAgYnl0ZWMgMjMgLy8gIkVSUjplcnJSZmRhIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclJmZGEKCnB1cmNoYXNlX2FmdGVyX2lmX2Vsc2VAMTU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQwMwogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuc2VuZGVyID09PSBHbG9iYWwuY3JlYXRvckFkZHJlc3MsIGVyckludmFsaWRQYXltZW50KQogICAgZGlnIDEKICAgIGd0eG5zIFNlbmRlcgogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICA9PQogICAgYm56IHB1cmNoYXNlX2FmdGVyX2Fzc2VydEAxNwogICAgYnl0ZWMgMTcgLy8gIkVSUjplcnJJcGF5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwYXkKCnB1cmNoYXNlX2FmdGVyX2Fzc2VydEAxNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDA0CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRQYXltZW50KQogICAgZGlnIDEKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBwdXJjaGFzZV9hZnRlcl9hc3NlcnRAMTkKICAgIGJ5dGVjIDE3IC8vICJFUlI6ZXJySXBheSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcGF5CgpwdXJjaGFzZV9hZnRlcl9hc3NlcnRAMTk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQwNQogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSB0aGlzLnByaWNlLnZhbHVlLCBlcnJJbnZhbGlkUGF5bWVudCkKICAgIHN3YXAKICAgIGd0eG5zIEFtb3VudAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzEKICAgIC8vIHByaWNlID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5UHJpY2UgfSkKICAgIGJ5dGVjIDYgLy8gInByaWNlIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MDUKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LmFtb3VudCA9PT0gdGhpcy5wcmljZS52YWx1ZSwgZXJySW52YWxpZFBheW1lbnQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPT0KICAgIGJueiBwdXJjaGFzZV9hZnRlcl9hc3NlcnRAMjEKICAgIGJ5dGVjIDE3IC8vICJFUlI6ZXJySXBheSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcGF5CgpwdXJjaGFzZV9hZnRlcl9hc3NlcnRAMjE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQwNwogICAgLy8gdGhpcy50cmFuc2ZlclB1cmNoYXNlVG9CdXllcihidXllcikKICAgIGNhbGxzdWIgdHJhbnNmZXJQdXJjaGFzZVRvQnV5ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTU0CiAgICAvLyBjb25zdCBhbW91bnRzID0gdGhpcy5nZXRBbW91bnRzKHRoaXMucHJpY2UudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMQogICAgLy8gcHJpY2UgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQcmljZSB9KQogICAgYnl0ZWMgNiAvLyAicHJpY2UiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE1NAogICAgLy8gY29uc3QgYW1vdW50cyA9IHRoaXMuZ2V0QW1vdW50cyh0aGlzLnByaWNlLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGNhbGxzdWIgZ2V0QW1vdW50cwogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE1NwogICAgLy8gbGV0IGxlZnRvdmVyOiB1aW50NjQgPSBhbW91bnRzLmFraXRhCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxNTgKICAgIC8vIGlmIChhbW91bnRzLmFraXRhID4gMCkgewogICAgYnogcHVyY2hhc2VfYWZ0ZXJfaWZfZWxzZUAyNAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxNTkKICAgIC8vICh7IGxlZnRvdmVyIH0gPSBzZW5kUmVmZXJyYWxQYXltZW50VG8odGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5zZWxsZXJSZWZlcnJlci52YWx1ZSwgMCwgYW1vdW50cy5ha2l0YSwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcykpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMiAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxNTkKICAgIC8vICh7IGxlZnRvdmVyIH0gPSBzZW5kUmVmZXJyYWxQYXltZW50VG8odGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5zZWxsZXJSZWZlcnJlci52YWx1ZSwgMCwgYW1vdW50cy5ha2l0YSwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcykpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NzEKICAgIC8vIHNlbGxlclJlZmVycmVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVNlbGxlclJlZmVycmVyIH0pCiAgICBieXRlYyAxNSAvLyAic2VsbGVyX3JlZmVycmVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxNTkKICAgIC8vICh7IGxlZnRvdmVyIH0gPSBzZW5kUmVmZXJyYWxQYXltZW50VG8odGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5zZWxsZXJSZWZlcnJlci52YWx1ZSwgMCwgYW1vdW50cy5ha2l0YSwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcykpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NTgKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5QWtpdGFEQU9Fc2Nyb3cgfSkKICAgIGJ5dGVjIDEwIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE1OQogICAgLy8gKHsgbGVmdG92ZXIgfSA9IHNlbmRSZWZlcnJhbFBheW1lbnRUbyh0aGlzLmFraXRhREFPLnZhbHVlLCB0aGlzLnNlbGxlclJlZmVycmVyLnZhbHVlLCAwLCBhbW91bnRzLmFraXRhLCB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzKSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBwdXNoaW50IDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBjb3ZlciAyCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciA0CiAgICB1bmNvdmVyIDQKICAgIGNhbGxzdWIgc2VuZFJlZmVycmFsUGF5bWVudFRvCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKCnB1cmNoYXNlX2FmdGVyX2lmX2Vsc2VAMjQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE2Mi0xNjcKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogbGVmdG92ZXIsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxNjQKICAgIC8vIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NTgKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5QWtpdGFEQU9Fc2Nyb3cgfSkKICAgIGJ5dGVjIDEwIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE2NAogICAgLy8gcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgcHVzaGludCAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTYyLTE2NgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBsZWZ0b3ZlciwKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTYyLTE2NwogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBsZWZ0b3ZlciwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxNzAtMTc1CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudHMubWFya2V0cGxhY2UsCiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMubWFya2V0cGxhY2UudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxNzIKICAgIC8vIGFtb3VudDogYW1vdW50cy5tYXJrZXRwbGFjZSwKICAgIGR1cAogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTczCiAgICAvLyByZWNlaXZlcjogdGhpcy5tYXJrZXRwbGFjZS52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjU0CiAgICAvLyBtYXJrZXRwbGFjZSA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlNYXJrZXRwbGFjZSB9KQogICAgYnl0ZWMgOSAvLyAibWFya2V0cGxhY2UiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE3MwogICAgLy8gcmVjZWl2ZXI6IHRoaXMubWFya2V0cGxhY2UudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgZHVwCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxNzAtMTc0CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudHMubWFya2V0cGxhY2UsCiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMubWFya2V0cGxhY2UudmFsdWUsCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE3MC0xNzUKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGFtb3VudDogYW1vdW50cy5tYXJrZXRwbGFjZSwKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5tYXJrZXRwbGFjZS52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxNzgtMTgzCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudHMubWFya2V0cGxhY2UsCiAgICAvLyAgICAgcmVjZWl2ZXI6IG1hcmtldHBsYWNlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIGRpZyAyCiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxNzgtMTgyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudHMubWFya2V0cGxhY2UsCiAgICAvLyAgICAgcmVjZWl2ZXI6IG1hcmtldHBsYWNlLAogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxNzgtMTgzCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudHMubWFya2V0cGxhY2UsCiAgICAvLyAgICAgcmVjZWl2ZXI6IG1hcmtldHBsYWNlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE4NgogICAgLy8gaWYgKHRoaXMuaXNQcml6ZUJveC52YWx1ZSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjkKICAgIC8vIGlzUHJpemVCb3ggPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5SXNQcml6ZUJveCB9KQogICAgYnl0ZWMgNSAvLyAiaXNfcHJpemVfYm94IgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxODYKICAgIC8vIGlmICh0aGlzLmlzUHJpemVCb3gudmFsdWUpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBwdXJjaGFzZV9lbHNlX2JvZHlAMjYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTg3LTE5MgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLnNlbGxlciwKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5zZWxsZXIudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxODkKICAgIC8vIGFtb3VudDogYW1vdW50cy5zZWxsZXIsCiAgICBwdXNoaW50IDI0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxOTAKICAgIC8vIHJlY2VpdmVyOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM3CiAgICAvLyBzZWxsZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5U2VsbGVyIH0pCiAgICBieXRlY18xIC8vICJzZWxsZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE5MAogICAgLy8gcmVjZWl2ZXI6IHRoaXMuc2VsbGVyLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE4Ny0xOTEKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGFtb3VudDogYW1vdW50cy5zZWxsZXIsCiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMuc2VsbGVyLnZhbHVlLAogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxODctMTkyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudHMuc2VsbGVyLAogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAoKcHVyY2hhc2VfYWZ0ZXJfaWZfZWxzZUAyNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDA5LTQxMQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7IGNsb3NlUmVtYWluZGVyVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcyB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDEwCiAgICAvLyAucGF5bWVudCh7IGNsb3NlUmVtYWluZGVyVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcyB9KQogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICBpdHhuX2ZpZWxkIENsb3NlUmVtYWluZGVyVG8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDA5LTQxMAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7IGNsb3NlUmVtYWluZGVyVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcyB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MDktNDExCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsgY2xvc2VSZW1haW5kZXJUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6Mzg4CiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiAnRGVsZXRlQXBwbGljYXRpb24nIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpwdXJjaGFzZV9lbHNlX2JvZHlAMjY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE5NAogICAgLy8gY29uc3QgYXNzZXRQcml6ZSA9IEFzc2V0KHRoaXMucHJpemUudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNwogICAgLy8gcHJpemUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQcml6ZSB9KQogICAgYnl0ZWNfMyAvLyAicHJpemUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE5NAogICAgLy8gY29uc3QgYXNzZXRQcml6ZSA9IEFzc2V0KHRoaXMucHJpemUudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxOTctMjAyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudHMuY3JlYXRvciwKICAgIC8vICAgICByZWNlaXZlcjogYXNzZXRQcml6ZS5jcmVhdG9yLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTk5CiAgICAvLyBhbW91bnQ6IGFtb3VudHMuY3JlYXRvciwKICAgIGRpZyAxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjAwCiAgICAvLyByZWNlaXZlcjogYXNzZXRQcml6ZS5jcmVhdG9yLAogICAgZGlnIDEKICAgIGFzc2V0X3BhcmFtc19nZXQgQXNzZXRDcmVhdG9yCiAgICBhc3NlcnQgLy8gYXNzZXQgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxOTctMjAxCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudHMuY3JlYXRvciwKICAgIC8vICAgICByZWNlaXZlcjogYXNzZXRQcml6ZS5jcmVhdG9yLAogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxOTctMjAyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudHMuY3JlYXRvciwKICAgIC8vICAgICByZWNlaXZlcjogYXNzZXRQcml6ZS5jcmVhdG9yLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIwNS0yMTEKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGFtb3VudDogYW1vdW50cy5zZWxsZXIsCiAgICAvLyAgICAgbm90ZTogU3RyaW5nKGFzc2V0UHJpemUubmFtZSkgKyAnIFNvbGQnLAogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIwNwogICAgLy8gYW1vdW50OiBhbW91bnRzLnNlbGxlciwKICAgIHN3YXAKICAgIHB1c2hpbnQgMjQKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIwOAogICAgLy8gbm90ZTogU3RyaW5nKGFzc2V0UHJpemUubmFtZSkgKyAnIFNvbGQnLAogICAgc3dhcAogICAgYXNzZXRfcGFyYW1zX2dldCBBc3NldE5hbWUKICAgIGFzc2VydCAvLyBhc3NldCBleGlzdHMKICAgIHB1c2hieXRlcyAiIFNvbGQiCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjA5CiAgICAvLyByZWNlaXZlcjogdGhpcy5zZWxsZXIudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNwogICAgLy8gc2VsbGVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVNlbGxlciB9KQogICAgYnl0ZWNfMSAvLyAic2VsbGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyMDkKICAgIC8vIHJlY2VpdmVyOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpdHhuX2ZpZWxkIE5vdGUKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIwNS0yMTAKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGFtb3VudDogYW1vdW50cy5zZWxsZXIsCiAgICAvLyAgICAgbm90ZTogU3RyaW5nKGFzc2V0UHJpemUubmFtZSkgKyAnIFNvbGQnLAogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjA1LTIxMQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLnNlbGxlciwKICAgIC8vICAgICBub3RlOiBTdHJpbmcoYXNzZXRQcml6ZS5uYW1lKSArICcgU29sZCcsCiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMuc2VsbGVyLnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICBiIHB1cmNoYXNlX2FmdGVyX2lmX2Vsc2VAMjcKCnB1cmNoYXNlX2Jvb2xfZmFsc2VAODoKICAgIGludGNfMCAvLyAwCiAgICBiIHB1cmNoYXNlX2Jvb2xfbWVyZ2VAOQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6Okxpc3RpbmcucHVyY2hhc2VBc2Fbcm91dGluZ10oKSAtPiB2b2lkOgpwdXJjaGFzZUFzYToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDIxCiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiAnRGVsZXRlQXBwbGljYXRpb24nIH0pCiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMyAvLyBheGZlcgogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGF4ZmVyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQyNwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywgZXJyTXVzdEJlQ2FsbGVkRnJvbUZhY3RvcnkpCiAgICB0eG4gU2VuZGVyCiAgICBnbG9iYWwgQ3JlYXRvckFkZHJlc3MKICAgID09CiAgICBibnogcHVyY2hhc2VBc2FfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDExIC8vICJFUlI6ZXJyTWJmZiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJNYmZmCgpwdXJjaGFzZUFzYV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDI4CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5wYXltZW50QXNzZXQudmFsdWUuaWQgIT09IDAsIGVyclBheW1lbnRBc3NldE11c3ROb3RCZUFsZ28pCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMwogICAgLy8gcGF5bWVudEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQYXltZW50QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInBheW1lbnRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQyOAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLmlkICE9PSAwLCBlcnJQYXltZW50QXNzZXRNdXN0Tm90QmVBbGdvKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJueiBwdXJjaGFzZUFzYV9hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6ZXJyUGFuYSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJQYW5hCgpwdXJjaGFzZUFzYV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDI5CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5leHBpcmF0aW9uLnZhbHVlID09PSAwIHx8IHRoaXMuZXhwaXJhdGlvbi52YWx1ZSA+IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsIGVyckxpc3RpbmdFeHBpcmVkKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzUKICAgIC8vIGV4cGlyYXRpb24gPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlFeHBpcmF0aW9uIH0pCiAgICBieXRlYyA3IC8vICJleHBpcmF0aW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MjkKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmV4cGlyYXRpb24udmFsdWUgPT09IDAgfHwgdGhpcy5leHBpcmF0aW9uLnZhbHVlID4gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwgZXJyTGlzdGluZ0V4cGlyZWQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogcHVyY2hhc2VBc2FfYm9vbF90cnVlQDcKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM1CiAgICAvLyBleHBpcmF0aW9uID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5RXhwaXJhdGlvbiB9KQogICAgYnl0ZWMgNyAvLyAiZXhwaXJhdGlvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDI5CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5leHBpcmF0aW9uLnZhbHVlID09PSAwIHx8IHRoaXMuZXhwaXJhdGlvbi52YWx1ZSA+IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsIGVyckxpc3RpbmdFeHBpcmVkKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgID4KICAgIGJ6IHB1cmNoYXNlQXNhX2Jvb2xfZmFsc2VAOAoKcHVyY2hhc2VBc2FfYm9vbF90cnVlQDc6CiAgICBpbnRjXzEgLy8gMQoKcHVyY2hhc2VBc2FfYm9vbF9tZXJnZUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MjkKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmV4cGlyYXRpb24udmFsdWUgPT09IDAgfHwgdGhpcy5leHBpcmF0aW9uLnZhbHVlID4gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwgZXJyTGlzdGluZ0V4cGlyZWQpCiAgICBibnogcHVyY2hhc2VBc2FfYWZ0ZXJfYXNzZXJ0QDExCiAgICBieXRlYyAyMiAvLyAiRVJSOmVyckxleHAiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTGV4cAoKcHVyY2hhc2VBc2FfYWZ0ZXJfYXNzZXJ0QDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MzAKICAgIC8vIHRoaXMuYXNzZXJ0UHJpY2VTZXR0bGVkKCkKICAgIGNhbGxzdWIgYXNzZXJ0UHJpY2VTZXR0bGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQzMgogICAgLy8gaWYgKHRoaXMucmVzZXJ2ZWRGb3IudmFsdWUgIT09IEdsb2JhbC56ZXJvQWRkcmVzcykgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzkKICAgIC8vIHJlc2VydmVkRm9yID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVJlc2VydmVkRm9yIH0pCiAgICBieXRlYyA4IC8vICJyZXNlcnZlZF9mb3IiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQzMgogICAgLy8gaWYgKHRoaXMucmVzZXJ2ZWRGb3IudmFsdWUgIT09IEdsb2JhbC56ZXJvQWRkcmVzcykgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgIT0KICAgIGJ6IHB1cmNoYXNlQXNhX2FmdGVyX2lmX2Vsc2VAMTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDMzCiAgICAvLyBsb2dnZWRBc3NlcnQoYnV5ZXIgPT09IHRoaXMucmVzZXJ2ZWRGb3IudmFsdWUsIGVyclJlc2VydmVkRm9yRGlmZmVyZW50QWRkcmVzcykKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM5CiAgICAvLyByZXNlcnZlZEZvciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlSZXNlcnZlZEZvciB9KQogICAgYnl0ZWMgOCAvLyAicmVzZXJ2ZWRfZm9yIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MzMKICAgIC8vIGxvZ2dlZEFzc2VydChidXllciA9PT0gdGhpcy5yZXNlcnZlZEZvci52YWx1ZSwgZXJyUmVzZXJ2ZWRGb3JEaWZmZXJlbnRBZGRyZXNzKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyAxCiAgICA9PQogICAgYm56IHB1cmNoYXNlQXNhX2FmdGVyX2lmX2Vsc2VAMTUKICAgIGJ5dGVjIDIzIC8vICJFUlI6ZXJyUmZkYSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJSZmRhCgpwdXJjaGFzZUFzYV9hZnRlcl9pZl9lbHNlQDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MzYKICAgIC8vIGxvZ2dlZEFzc2VydChhc3NldFhmZXIueGZlckFzc2V0LmlkID09PSB0aGlzLnBheW1lbnRBc3NldC52YWx1ZS5pZCwgZXJySW52YWxpZFRyYW5zZmVyKQogICAgZGlnIDIKICAgIGd0eG5zIFhmZXJBc3NldAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzMKICAgIC8vIHBheW1lbnRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5UGF5bWVudEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJwYXltZW50X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MzYKICAgIC8vIGxvZ2dlZEFzc2VydChhc3NldFhmZXIueGZlckFzc2V0LmlkID09PSB0aGlzLnBheW1lbnRBc3NldC52YWx1ZS5pZCwgZXJySW52YWxpZFRyYW5zZmVyKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgID09CiAgICBibnogcHVyY2hhc2VBc2FfYWZ0ZXJfYXNzZXJ0QDE3CiAgICBieXRlYyAxOCAvLyAiRVJSOmVyckl4ZnIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXhmcgoKcHVyY2hhc2VBc2FfYWZ0ZXJfYXNzZXJ0QDE3OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MzcKICAgIC8vIGxvZ2dlZEFzc2VydChhc3NldFhmZXIuYXNzZXRSZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRUcmFuc2ZlcikKICAgIGRpZyAyCiAgICBndHhucyBBc3NldFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBwdXJjaGFzZUFzYV9hZnRlcl9hc3NlcnRAMTkKICAgIGJ5dGVjIDE4IC8vICJFUlI6ZXJySXhmciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJeGZyCgpwdXJjaGFzZUFzYV9hZnRlcl9hc3NlcnRAMTk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQzOAogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci5hc3NldEFtb3VudCA9PT0gdGhpcy5wcmljZS52YWx1ZSwgZXJySW52YWxpZFRyYW5zZmVyKQogICAgdW5jb3ZlciAyCiAgICBndHhucyBBc3NldEFtb3VudAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzEKICAgIC8vIHByaWNlID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5UHJpY2UgfSkKICAgIGJ5dGVjIDYgLy8gInByaWNlIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MzgKICAgIC8vIGxvZ2dlZEFzc2VydChhc3NldFhmZXIuYXNzZXRBbW91bnQgPT09IHRoaXMucHJpY2UudmFsdWUsIGVyckludmFsaWRUcmFuc2ZlcikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA9PQogICAgYm56IHB1cmNoYXNlQXNhX2FmdGVyX2Fzc2VydEAyMQogICAgYnl0ZWMgMTggLy8gIkVSUjplcnJJeGZyIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckl4ZnIKCnB1cmNoYXNlQXNhX2FmdGVyX2Fzc2VydEAyMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDQwCiAgICAvLyB0aGlzLnRyYW5zZmVyUHVyY2hhc2VUb0J1eWVyKGJ1eWVyKQogICAgY2FsbHN1YiB0cmFuc2ZlclB1cmNoYXNlVG9CdXllcgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyMTcKICAgIC8vIGNvbnN0IGFtb3VudHMgPSB0aGlzLmdldEFtb3VudHModGhpcy5wcmljZS52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMxCiAgICAvLyBwcmljZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVByaWNlIH0pCiAgICBieXRlYyA2IC8vICJwcmljZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjE3CiAgICAvLyBjb25zdCBhbW91bnRzID0gdGhpcy5nZXRBbW91bnRzKHRoaXMucHJpY2UudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgY2FsbHN1YiBnZXRBbW91bnRzCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjIwCiAgICAvLyBsZXQgbGVmdG92ZXI6IHVpbnQ2NCA9IGFtb3VudHMuYWtpdGEKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIyMQogICAgLy8gaWYgKGFtb3VudHMuYWtpdGEgPiAwKSB7CiAgICBieiBwdXJjaGFzZUFzYV9hZnRlcl9pZl9lbHNlQDI0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIyMgogICAgLy8gKHsgbGVmdG92ZXIgfSA9IHNlbmRSZWZlcnJhbFBheW1lbnRUbyh0aGlzLmFraXRhREFPLnZhbHVlLCB0aGlzLnNlbGxlclJlZmVycmVyLnZhbHVlLCB0aGlzLnBheW1lbnRBc3NldC52YWx1ZS5pZCwgYW1vdW50cy5ha2l0YSwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcykpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMiAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyMjIKICAgIC8vICh7IGxlZnRvdmVyIH0gPSBzZW5kUmVmZXJyYWxQYXltZW50VG8odGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5zZWxsZXJSZWZlcnJlci52YWx1ZSwgdGhpcy5wYXltZW50QXNzZXQudmFsdWUuaWQsIGFtb3VudHMuYWtpdGEsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjcxCiAgICAvLyBzZWxsZXJSZWZlcnJlciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlTZWxsZXJSZWZlcnJlciB9KQogICAgYnl0ZWMgMTUgLy8gInNlbGxlcl9yZWZlcnJlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjIyCiAgICAvLyAoeyBsZWZ0b3ZlciB9ID0gc2VuZFJlZmVycmFsUGF5bWVudFRvKHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuc2VsbGVyUmVmZXJyZXIudmFsdWUsIHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLmlkLCBhbW91bnRzLmFraXRhLCB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzKSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMwogICAgLy8gcGF5bWVudEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQYXltZW50QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInBheW1lbnRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIyMgogICAgLy8gKHsgbGVmdG92ZXIgfSA9IHNlbmRSZWZlcnJhbFBheW1lbnRUbyh0aGlzLmFraXRhREFPLnZhbHVlLCB0aGlzLnNlbGxlclJlZmVycmVyLnZhbHVlLCB0aGlzLnBheW1lbnRBc3NldC52YWx1ZS5pZCwgYW1vdW50cy5ha2l0YSwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcykpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NTgKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5QWtpdGFEQU9Fc2Nyb3cgfSkKICAgIGJ5dGVjIDEwIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIyMgogICAgLy8gKHsgbGVmdG92ZXIgfSA9IHNlbmRSZWZlcnJhbFBheW1lbnRUbyh0aGlzLmFraXRhREFPLnZhbHVlLCB0aGlzLnNlbGxlclJlZmVycmVyLnZhbHVlLCB0aGlzLnBheW1lbnRBc3NldC52YWx1ZS5pZCwgYW1vdW50cy5ha2l0YSwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcykpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgcHVzaGludCAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgY292ZXIgMwogICAgdW5jb3ZlciA0CiAgICB1bmNvdmVyIDQKICAgIGNhbGxzdWIgc2VuZFJlZmVycmFsUGF5bWVudFRvCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKCnB1cmNoYXNlQXNhX2FmdGVyX2lmX2Vsc2VAMjQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIyNS0yMzEKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGxlZnRvdmVyLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5wYXltZW50QXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyMjcKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo1OAogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlBa2l0YURBT0VzY3JvdyB9KQogICAgYnl0ZWMgMTAgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjI3CiAgICAvLyBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHB1c2hpbnQgMgogICAgZXh0cmFjdF91aW50NjQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjI5CiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzMKICAgIC8vIHBheW1lbnRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5UGF5bWVudEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJwYXltZW50X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyMjkKICAgIC8vIHhmZXJBc3NldDogdGhpcy5wYXltZW50QXNzZXQudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyMjUtMjMwCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBsZWZ0b3ZlciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgaW50Y18zIC8vIDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyMjUtMjMxCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBsZWZ0b3ZlciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIzNAogICAgLy8gaWYgKCF0aGlzLmlzUHJpemVCb3gudmFsdWUpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI5CiAgICAvLyBpc1ByaXplQm94ID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleUlzUHJpemVCb3ggfSkKICAgIGJ5dGVjIDUgLy8gImlzX3ByaXplX2JveCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjM0CiAgICAvLyBpZiAoIXRoaXMuaXNQcml6ZUJveC52YWx1ZSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJueiBwdXJjaGFzZUFzYV9hZnRlcl9pZl9lbHNlQDI4CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIzNQogICAgLy8gY29uc3QgYXNzZXRQcml6ZSA9IEFzc2V0KHRoaXMucHJpemUudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNwogICAgLy8gcHJpemUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQcml6ZSB9KQogICAgYnl0ZWNfMyAvLyAicHJpemUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIzNQogICAgLy8gY29uc3QgYXNzZXRQcml6ZSA9IEFzc2V0KHRoaXMucHJpemUudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjM3CiAgICAvLyBpZiAoYXNzZXRQcml6ZS5jcmVhdG9yLmlzT3B0ZWRJbih0aGlzLnBheW1lbnRBc3NldC52YWx1ZSkpIHsKICAgIGFzc2V0X3BhcmFtc19nZXQgQXNzZXRDcmVhdG9yCiAgICBhc3NlcnQgLy8gYXNzZXQgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMwogICAgLy8gcGF5bWVudEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQYXltZW50QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInBheW1lbnRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjIzNwogICAgLy8gaWYgKGFzc2V0UHJpemUuY3JlYXRvci5pc09wdGVkSW4odGhpcy5wYXltZW50QXNzZXQudmFsdWUpKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJ6IHB1cmNoYXNlQXNhX2Vsc2VfYm9keUAyNwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyMzgtMjQ0CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBhc3NldFByaXplLmNyZWF0b3IsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudHMuY3JlYXRvciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjQwCiAgICAvLyBhc3NldFJlY2VpdmVyOiBhc3NldFByaXplLmNyZWF0b3IsCiAgICBhc3NldF9wYXJhbXNfZ2V0IEFzc2V0Q3JlYXRvcgogICAgYXNzZXJ0IC8vIGFzc2V0IGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNDEKICAgIC8vIGFzc2V0QW1vdW50OiBhbW91bnRzLmNyZWF0b3IsCiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI0MgogICAgLy8geGZlckFzc2V0OiB0aGlzLnBheW1lbnRBc3NldC52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMzCiAgICAvLyBwYXltZW50QXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVBheW1lbnRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAicGF5bWVudF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjQyCiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjM4LTI0MwogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogYXNzZXRQcml6ZS5jcmVhdG9yLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnRzLmNyZWF0b3IsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnBheW1lbnRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIGludGNfMyAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjM4LTI0NAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogYXNzZXRQcml6ZS5jcmVhdG9yLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnRzLmNyZWF0b3IsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnBheW1lbnRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAoKcHVyY2hhc2VBc2FfYWZ0ZXJfaWZfZWxzZUAyODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjYwCiAgICAvLyBpZiAodGhpcy5tYXJrZXRwbGFjZS52YWx1ZS5pc09wdGVkSW4odGhpcy5wYXltZW50QXNzZXQudmFsdWUpKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo1NAogICAgLy8gbWFya2V0cGxhY2UgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5TWFya2V0cGxhY2UgfSkKICAgIGJ5dGVjIDkgLy8gIm1hcmtldHBsYWNlIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNjAKICAgIC8vIGlmICh0aGlzLm1hcmtldHBsYWNlLnZhbHVlLmlzT3B0ZWRJbih0aGlzLnBheW1lbnRBc3NldC52YWx1ZSkpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMwogICAgLy8gcGF5bWVudEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQYXltZW50QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInBheW1lbnRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI2MAogICAgLy8gaWYgKHRoaXMubWFya2V0cGxhY2UudmFsdWUuaXNPcHRlZEluKHRoaXMucGF5bWVudEFzc2V0LnZhbHVlKSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBieiBwdXJjaGFzZUFzYV9lbHNlX2JvZHlAMzAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjYxLTI2NwogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5tYXJrZXRwbGFjZS52YWx1ZSwKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50cy5tYXJrZXRwbGFjZSwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjYzCiAgICAvLyBhc3NldFJlY2VpdmVyOiB0aGlzLm1hcmtldHBsYWNlLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NTQKICAgIC8vIG1hcmtldHBsYWNlID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleU1hcmtldHBsYWNlIH0pCiAgICBieXRlYyA5IC8vICJtYXJrZXRwbGFjZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjYzCiAgICAvLyBhc3NldFJlY2VpdmVyOiB0aGlzLm1hcmtldHBsYWNlLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjY0CiAgICAvLyBhc3NldEFtb3VudDogYW1vdW50cy5tYXJrZXRwbGFjZSwKICAgIGRpZyAxCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNjUKICAgIC8vIHhmZXJBc3NldDogdGhpcy5wYXltZW50QXNzZXQudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMwogICAgLy8gcGF5bWVudEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQYXltZW50QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInBheW1lbnRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI2NQogICAgLy8geGZlckFzc2V0OiB0aGlzLnBheW1lbnRBc3NldC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI2MS0yNjYKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHRoaXMubWFya2V0cGxhY2UudmFsdWUsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudHMubWFya2V0cGxhY2UsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnBheW1lbnRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIGludGNfMyAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjYxLTI2NwogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5tYXJrZXRwbGFjZS52YWx1ZSwKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50cy5tYXJrZXRwbGFjZSwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CgpwdXJjaGFzZUFzYV9hZnRlcl9pZl9lbHNlQDMxOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyODIKICAgIC8vIGlmIChtYXJrZXRwbGFjZS5pc09wdGVkSW4odGhpcy5wYXltZW50QXNzZXQudmFsdWUpKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMwogICAgLy8gcGF5bWVudEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQYXltZW50QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInBheW1lbnRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI4MgogICAgLy8gaWYgKG1hcmtldHBsYWNlLmlzT3B0ZWRJbih0aGlzLnBheW1lbnRBc3NldC52YWx1ZSkpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgMgogICAgc3dhcAogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJ6IHB1cmNoYXNlQXNhX2Vsc2VfYm9keUAzMwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyODMtMjg5CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBtYXJrZXRwbGFjZSwKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50cy5tYXJrZXRwbGFjZSwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6Mjg2CiAgICAvLyBhc3NldEFtb3VudDogYW1vdW50cy5tYXJrZXRwbGFjZSwKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI4NwogICAgLy8geGZlckFzc2V0OiB0aGlzLnBheW1lbnRBc3NldC52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMzCiAgICAvLyBwYXltZW50QXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVBheW1lbnRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAicGF5bWVudF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6Mjg3CiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjgzLTI4OAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogbWFya2V0cGxhY2UsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudHMubWFya2V0cGxhY2UsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnBheW1lbnRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIGludGNfMyAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjgzLTI4OQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogbWFya2V0cGxhY2UsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudHMubWFya2V0cGxhY2UsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnBheW1lbnRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAoKcHVyY2hhc2VBc2FfYWZ0ZXJfaWZfZWxzZUAzNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzA0CiAgICAvLyBpZiAodGhpcy5zZWxsZXIudmFsdWUuaXNPcHRlZEluKHRoaXMucGF5bWVudEFzc2V0LnZhbHVlKSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzcKICAgIC8vIHNlbGxlciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlTZWxsZXIgfSkKICAgIGJ5dGVjXzEgLy8gInNlbGxlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzA0CiAgICAvLyBpZiAodGhpcy5zZWxsZXIudmFsdWUuaXNPcHRlZEluKHRoaXMucGF5bWVudEFzc2V0LnZhbHVlKSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMzCiAgICAvLyBwYXltZW50QXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVBheW1lbnRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAicGF5bWVudF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzA0CiAgICAvLyBpZiAodGhpcy5zZWxsZXIudmFsdWUuaXNPcHRlZEluKHRoaXMucGF5bWVudEFzc2V0LnZhbHVlKSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBieiBwdXJjaGFzZUFzYV9lbHNlX2JvZHlAMzYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzA1LTMxMAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRDbG9zZVRvOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzA3CiAgICAvLyBhc3NldENsb3NlVG86IHRoaXMuc2VsbGVyLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzcKICAgIC8vIHNlbGxlciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlTZWxsZXIgfSkKICAgIGJ5dGVjXzEgLy8gInNlbGxlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzA3CiAgICAvLyBhc3NldENsb3NlVG86IHRoaXMuc2VsbGVyLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzA4CiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzMKICAgIC8vIHBheW1lbnRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5UGF5bWVudEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJwYXltZW50X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMDgKICAgIC8vIHhmZXJBc3NldDogdGhpcy5wYXltZW50QXNzZXQudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGl0eG5fZmllbGQgQXNzZXRDbG9zZVRvCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMwNS0zMDkKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0Q2xvc2VUbzogdGhpcy5zZWxsZXIudmFsdWUsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnBheW1lbnRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIGludGNfMyAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzA1LTMxMAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRDbG9zZVRvOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CgpwdXJjaGFzZUFzYV9hZnRlcl9pZl9lbHNlQDM3OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0NDItNDQ0CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsgY2xvc2VSZW1haW5kZXJUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0NDMKICAgIC8vIC5wYXltZW50KHsgY2xvc2VSZW1haW5kZXJUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzIH0pCiAgICBnbG9iYWwgQ3JlYXRvckFkZHJlc3MKICAgIGl0eG5fZmllbGQgQ2xvc2VSZW1haW5kZXJUbwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0NDItNDQzCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsgY2xvc2VSZW1haW5kZXJUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ0Mi00NDQKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoeyBjbG9zZVJlbWFpbmRlclRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MjEKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6ICdEZWxldGVBcHBsaWNhdGlvbicgfSkKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCnB1cmNoYXNlQXNhX2Vsc2VfYm9keUAzNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzEzCiAgICAvLyBjb25zdCByZW1haW5pbmcgPSB0aGlzLnBheW1lbnRBc3NldC52YWx1ZS5iYWxhbmNlKEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzKQogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMzCiAgICAvLyBwYXltZW50QXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVBheW1lbnRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAicGF5bWVudF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzEzCiAgICAvLyBjb25zdCByZW1haW5pbmcgPSB0aGlzLnBheW1lbnRBc3NldC52YWx1ZS5iYWxhbmNlKEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHN3YXAKICAgIGRpZyAxCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGFzc2VydCAvLyBhY2NvdW50IG9wdGVkIGludG8gYXNzZXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzE1CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzIgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzE1CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzE5CiAgICAvLyBbeyBhZGRyZXNzOiB0aGlzLnNlbGxlci52YWx1ZSwgYW1vdW50OiByZW1haW5pbmcgfV0sCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNwogICAgLy8gc2VsbGVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVNlbGxlciB9KQogICAgYnl0ZWNfMSAvLyAic2VsbGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMTkKICAgIC8vIFt7IGFkZHJlc3M6IHRoaXMuc2VsbGVyLnZhbHVlLCBhbW91bnQ6IHJlbWFpbmluZyB9XSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgMgogICAgaXRvYgogICAgY29uY2F0CiAgICBieXRlYyA0IC8vIDB4MDAwMQogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMyMgogICAgLy8gR2xvYmFsLnplcm9BZGRyZXNzCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzE0LTMyMwogICAgLy8gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgdGhpcy5wYXltZW50QXNzZXQudmFsdWUuaWQsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IHRoaXMuc2VsbGVyLnZhbHVlLCBhbW91bnQ6IHJlbWFpbmluZyB9XSwKICAgIC8vICAgcmVtYWluaW5nLAogICAgLy8gICB0cnVlLAogICAgLy8gICBHbG9iYWwuemVyb0FkZHJlc3MKICAgIC8vICkKICAgIHVuY292ZXIgMgogICAgdW5jb3ZlciA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMxNwogICAgLy8gMCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMxOAogICAgLy8gTUFYX1VJTlQ2NCwKICAgIGludGMgNSAvLyAxODQ0Njc0NDA3MzcwOTU1MTYxNQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMTQtMzIzCiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICB0aGlzLnBheW1lbnRBc3NldC52YWx1ZS5pZCwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogdGhpcy5zZWxsZXIudmFsdWUsIGFtb3VudDogcmVtYWluaW5nIH1dLAogICAgLy8gICByZW1haW5pbmcsCiAgICAvLyAgIHRydWUsCiAgICAvLyAgIEdsb2JhbC56ZXJvQWRkcmVzcwogICAgLy8gKQogICAgdW5jb3ZlciA1CiAgICB1bmNvdmVyIDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzIxCiAgICAvLyB0cnVlLAogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzE0LTMyMwogICAgLy8gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgdGhpcy5wYXltZW50QXNzZXQudmFsdWUuaWQsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IHRoaXMuc2VsbGVyLnZhbHVlLCBhbW91bnQ6IHJlbWFpbmluZyB9XSwKICAgIC8vICAgcmVtYWluaW5nLAogICAgLy8gICB0cnVlLAogICAgLy8gICBHbG9iYWwuemVyb0FkZHJlc3MKICAgIC8vICkKICAgIHVuY292ZXIgNwogICAgY2FsbHN1YiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50CiAgICBwb3BuIDIKICAgIGIgcHVyY2hhc2VBc2FfYWZ0ZXJfaWZfZWxzZUAzNwoKcHVyY2hhc2VBc2FfZWxzZV9ib2R5QDMzOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyOTIKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMiAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyOTIKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyOTMKICAgIC8vIHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLmlkLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzMKICAgIC8vIHBheW1lbnRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5UGF5bWVudEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJwYXltZW50X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyOTMKICAgIC8vIHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLmlkLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6Mjk2CiAgICAvLyBbeyBhZGRyZXNzOiBtYXJrZXRwbGFjZSwgYW1vdW50OiBhbW91bnRzLm1hcmtldHBsYWNlIH1dLAogICAgdW5jb3ZlciAyCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBpdG9iCiAgICB1bmNvdmVyIDQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYnl0ZWMgNCAvLyAweDAwMDEKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyOTkKICAgIC8vIEdsb2JhbC56ZXJvQWRkcmVzcwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI5MS0zMDAKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLmlkLAogICAgLy8gICAwLAogICAgLy8gICBNQVhfVUlOVDY0LAogICAgLy8gICBbeyBhZGRyZXNzOiBtYXJrZXRwbGFjZSwgYW1vdW50OiBhbW91bnRzLm1hcmtldHBsYWNlIH1dLAogICAgLy8gICBhbW91bnRzLm1hcmtldHBsYWNlLAogICAgLy8gICBmYWxzZSwKICAgIC8vICAgR2xvYmFsLnplcm9BZGRyZXNzCiAgICAvLyApCiAgICB1bmNvdmVyIDQKICAgIHVuY292ZXIgNAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyOTQKICAgIC8vIDAsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyOTUKICAgIC8vIE1BWF9VSU5UNjQsCiAgICBpbnRjIDUgLy8gMTg0NDY3NDQwNzM3MDk1NTE2MTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjkxLTMwMAogICAgLy8gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgdGhpcy5wYXltZW50QXNzZXQudmFsdWUuaWQsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IG1hcmtldHBsYWNlLCBhbW91bnQ6IGFtb3VudHMubWFya2V0cGxhY2UgfV0sCiAgICAvLyAgIGFtb3VudHMubWFya2V0cGxhY2UsCiAgICAvLyAgIGZhbHNlLAogICAgLy8gICBHbG9iYWwuemVyb0FkZHJlc3MKICAgIC8vICkKICAgIHVuY292ZXIgNQogICAgdW5jb3ZlciA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI5OAogICAgLy8gZmFsc2UsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyOTEtMzAwCiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICB0aGlzLnBheW1lbnRBc3NldC52YWx1ZS5pZCwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogbWFya2V0cGxhY2UsIGFtb3VudDogYW1vdW50cy5tYXJrZXRwbGFjZSB9XSwKICAgIC8vICAgYW1vdW50cy5tYXJrZXRwbGFjZSwKICAgIC8vICAgZmFsc2UsCiAgICAvLyAgIEdsb2JhbC56ZXJvQWRkcmVzcwogICAgLy8gKQogICAgdW5jb3ZlciA3CiAgICBjYWxsc3ViIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQKICAgIHBvcG4gMgogICAgYiBwdXJjaGFzZUFzYV9hZnRlcl9pZl9lbHNlQDM0CgpwdXJjaGFzZUFzYV9lbHNlX2JvZHlAMzA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI3MAogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18yIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI3MAogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI3MQogICAgLy8gdGhpcy5wYXltZW50QXNzZXQudmFsdWUuaWQsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMwogICAgLy8gcGF5bWVudEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQYXltZW50QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInBheW1lbnRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI3MQogICAgLy8gdGhpcy5wYXltZW50QXNzZXQudmFsdWUuaWQsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNzQKICAgIC8vIFt7IGFkZHJlc3M6IHRoaXMubWFya2V0cGxhY2UudmFsdWUsIGFtb3VudDogYW1vdW50cy5tYXJrZXRwbGFjZSB9XSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjU0CiAgICAvLyBtYXJrZXRwbGFjZSA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlNYXJrZXRwbGFjZSB9KQogICAgYnl0ZWMgOSAvLyAibWFya2V0cGxhY2UiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI3NAogICAgLy8gW3sgYWRkcmVzczogdGhpcy5tYXJrZXRwbGFjZS52YWx1ZSwgYW1vdW50OiBhbW91bnRzLm1hcmtldHBsYWNlIH1dLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyAzCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBpdG9iCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYnl0ZWMgNCAvLyAweDAwMDEKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNzcKICAgIC8vIEdsb2JhbC56ZXJvQWRkcmVzcwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI2OS0yNzgKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLmlkLAogICAgLy8gICAwLAogICAgLy8gICBNQVhfVUlOVDY0LAogICAgLy8gICBbeyBhZGRyZXNzOiB0aGlzLm1hcmtldHBsYWNlLnZhbHVlLCBhbW91bnQ6IGFtb3VudHMubWFya2V0cGxhY2UgfV0sCiAgICAvLyAgIGFtb3VudHMubWFya2V0cGxhY2UsCiAgICAvLyAgIGZhbHNlLAogICAgLy8gICBHbG9iYWwuemVyb0FkZHJlc3MKICAgIC8vICkKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI3MgogICAgLy8gMCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI3MwogICAgLy8gTUFYX1VJTlQ2NCwKICAgIGludGMgNSAvLyAxODQ0Njc0NDA3MzcwOTU1MTYxNQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNjktMjc4CiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICB0aGlzLnBheW1lbnRBc3NldC52YWx1ZS5pZCwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogdGhpcy5tYXJrZXRwbGFjZS52YWx1ZSwgYW1vdW50OiBhbW91bnRzLm1hcmtldHBsYWNlIH1dLAogICAgLy8gICBhbW91bnRzLm1hcmtldHBsYWNlLAogICAgLy8gICBmYWxzZSwKICAgIC8vICAgR2xvYmFsLnplcm9BZGRyZXNzCiAgICAvLyApCiAgICB1bmNvdmVyIDUKICAgIHVuY292ZXIgNgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNzYKICAgIC8vIGZhbHNlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjY5LTI3OAogICAgLy8gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgdGhpcy5wYXltZW50QXNzZXQudmFsdWUuaWQsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IHRoaXMubWFya2V0cGxhY2UudmFsdWUsIGFtb3VudDogYW1vdW50cy5tYXJrZXRwbGFjZSB9XSwKICAgIC8vICAgYW1vdW50cy5tYXJrZXRwbGFjZSwKICAgIC8vICAgZmFsc2UsCiAgICAvLyAgIEdsb2JhbC56ZXJvQWRkcmVzcwogICAgLy8gKQogICAgdW5jb3ZlciA3CiAgICBjYWxsc3ViIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQKICAgIHBvcG4gMgogICAgYiBwdXJjaGFzZUFzYV9hZnRlcl9pZl9lbHNlQDMxCgpwdXJjaGFzZUFzYV9lbHNlX2JvZHlAMjc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI0NwogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18yIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI0NwogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI0OAogICAgLy8gdGhpcy5wYXltZW50QXNzZXQudmFsdWUuaWQsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozMwogICAgLy8gcGF5bWVudEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQYXltZW50QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInBheW1lbnRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI0OAogICAgLy8gdGhpcy5wYXltZW50QXNzZXQudmFsdWUuaWQsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNTEKICAgIC8vIFt7IGFkZHJlc3M6IGFzc2V0UHJpemUuY3JlYXRvciwgYW1vdW50OiBhbW91bnRzLmNyZWF0b3IgfV0sCiAgICB1bmNvdmVyIDIKICAgIGFzc2V0X3BhcmFtc19nZXQgQXNzZXRDcmVhdG9yCiAgICBhc3NlcnQgLy8gYXNzZXQgZXhpc3RzCiAgICBkaWcgMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgY29uY2F0CiAgICBieXRlYyA0IC8vIDB4MDAwMQogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI1NAogICAgLy8gR2xvYmFsLnplcm9BZGRyZXNzCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjQ2LTI1NQogICAgLy8gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgdGhpcy5wYXltZW50QXNzZXQudmFsdWUuaWQsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IGFzc2V0UHJpemUuY3JlYXRvciwgYW1vdW50OiBhbW91bnRzLmNyZWF0b3IgfV0sCiAgICAvLyAgIGFtb3VudHMuY3JlYXRvciwKICAgIC8vICAgZmFsc2UsCiAgICAvLyAgIEdsb2JhbC56ZXJvQWRkcmVzcwogICAgLy8gKQogICAgdW5jb3ZlciA0CiAgICB1bmNvdmVyIDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjQ5CiAgICAvLyAwLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjUwCiAgICAvLyBNQVhfVUlOVDY0LAogICAgaW50YyA1IC8vIDE4NDQ2NzQ0MDczNzA5NTUxNjE1CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI0Ni0yNTUKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLmlkLAogICAgLy8gICAwLAogICAgLy8gICBNQVhfVUlOVDY0LAogICAgLy8gICBbeyBhZGRyZXNzOiBhc3NldFByaXplLmNyZWF0b3IsIGFtb3VudDogYW1vdW50cy5jcmVhdG9yIH1dLAogICAgLy8gICBhbW91bnRzLmNyZWF0b3IsCiAgICAvLyAgIGZhbHNlLAogICAgLy8gICBHbG9iYWwuemVyb0FkZHJlc3MKICAgIC8vICkKICAgIHVuY292ZXIgNQogICAgdW5jb3ZlciA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI1MwogICAgLy8gZmFsc2UsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNDYtMjU1CiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICB0aGlzLnBheW1lbnRBc3NldC52YWx1ZS5pZCwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogYXNzZXRQcml6ZS5jcmVhdG9yLCBhbW91bnQ6IGFtb3VudHMuY3JlYXRvciB9XSwKICAgIC8vICAgYW1vdW50cy5jcmVhdG9yLAogICAgLy8gICBmYWxzZSwKICAgIC8vICAgR2xvYmFsLnplcm9BZGRyZXNzCiAgICAvLyApCiAgICB1bmNvdmVyIDcKICAgIGNhbGxzdWIgY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudAogICAgcG9wbiAyCiAgICBiIHB1cmNoYXNlQXNhX2FmdGVyX2lmX2Vsc2VAMjgKCnB1cmNoYXNlQXNhX2Jvb2xfZmFsc2VAODoKICAgIGludGNfMCAvLyAwCiAgICBiIHB1cmNoYXNlQXNhX2Jvb2xfbWVyZ2VAOQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6Okxpc3RpbmcuZGVsaXN0W3JvdXRpbmddKCkgLT4gdm9pZDoKZGVsaXN0OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0NDgKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6ICdEZWxldGVBcHBsaWNhdGlvbicgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDUwCiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gR2xvYmFsLmNyZWF0b3JBZGRyZXNzLCBlcnJNdXN0QmVDYWxsZWRGcm9tRmFjdG9yeSkKICAgIHR4biBTZW5kZXIKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgPT0KICAgIGJueiBkZWxpc3RfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDExIC8vICJFUlI6ZXJyTWJmZiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJNYmZmCgpkZWxpc3RfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ1MQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc2VsbGVyLnZhbHVlID09PSBjYWxsZXIsIGVyck9ubHlTZWxsZXJDYW5EZWxpc3QpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czozNwogICAgLy8gc2VsbGVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVNlbGxlciB9KQogICAgYnl0ZWNfMSAvLyAic2VsbGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0NTEKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnNlbGxlci52YWx1ZSA9PT0gY2FsbGVyLCBlcnJPbmx5U2VsbGVyQ2FuRGVsaXN0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgID09CiAgICBibnogZGVsaXN0X2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJPc2NkIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck9zY2QKCmRlbGlzdF9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDU0CiAgICAvLyBhc3NldENsb3NlVG86IHRoaXMuc2VsbGVyLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzcKICAgIC8vIHNlbGxlciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlTZWxsZXIgfSkKICAgIGJ5dGVjXzEgLy8gInNlbGxlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDU0CiAgICAvLyBhc3NldENsb3NlVG86IHRoaXMuc2VsbGVyLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDU1CiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMucHJpemUudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNwogICAgLy8gcHJpemUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQcml6ZSB9KQogICAgYnl0ZWNfMyAvLyAicHJpemUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ1NQogICAgLy8geGZlckFzc2V0OiB0aGlzLnByaXplLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDU5CiAgICAvLyBjbG9zZVJlbWFpbmRlclRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MsCiAgICBnbG9iYWwgQ3JlYXRvckFkZHJlc3MKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDYyCiAgICAvLyBpZiAoISh0aGlzLnBheW1lbnRBc3NldC52YWx1ZS5pZCA9PT0gMCkpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMzCiAgICAvLyBwYXltZW50QXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVBheW1lbnRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAicGF5bWVudF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDYyCiAgICAvLyBpZiAoISh0aGlzLnBheW1lbnRBc3NldC52YWx1ZS5pZCA9PT0gMCkpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBkZWxpc3RfZWxzZV9ib2R5QDE2CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ2NQogICAgLy8gYXNzZXRDbG9zZVRvOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM3CiAgICAvLyBzZWxsZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5U2VsbGVyIH0pCiAgICBieXRlY18xIC8vICJzZWxsZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ2NQogICAgLy8gYXNzZXRDbG9zZVRvOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBzd2FwCiAgICBjb3ZlciA0CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ2NgogICAgLy8geGZlckFzc2V0OiB0aGlzLnBheW1lbnRBc3NldC52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMzCiAgICAvLyBwYXltZW50QXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVBheW1lbnRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAicGF5bWVudF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDY2CiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMucGF5bWVudEFzc2V0LnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDY5CiAgICAvLyBpZiAodGhpcy5pc1ByaXplQm94LnZhbHVlKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyOQogICAgLy8gaXNQcml6ZUJveCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlJc1ByaXplQm94IH0pCiAgICBieXRlYyA1IC8vICJpc19wcml6ZV9ib3giCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ2OQogICAgLy8gaWYgKHRoaXMuaXNQcml6ZUJveC52YWx1ZSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGRlbGlzdF9lbHNlX2JvZHlAMTEKICAgIGJ1cnkgMQogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ3MC00NzMKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFByaXplQm94LnByb3RvdHlwZS50cmFuc2Zlcj4oewogICAgLy8gICBhcHBJZDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vICAgYXJnczogW3RoaXMuc2VsbGVyLnZhbHVlXSwKICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ3MgogICAgLy8gYXJnczogW3RoaXMuc2VsbGVyLnZhbHVlXSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjM3CiAgICAvLyBzZWxsZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5U2VsbGVyIH0pCiAgICBieXRlY18xIC8vICJzZWxsZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ3MgogICAgLy8gYXJnczogW3RoaXMuc2VsbGVyLnZhbHVlXSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ3MQogICAgLy8gYXBwSWQ6IHRoaXMucHJpemUudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNwogICAgLy8gcHJpemUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQcml6ZSB9KQogICAgYnl0ZWNfMyAvLyAicHJpemUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ3MQogICAgLy8gYXBwSWQ6IHRoaXMucHJpemUudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ3MC00NzMKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFByaXplQm94LnByb3RvdHlwZS50cmFuc2Zlcj4oewogICAgLy8gICBhcHBJZDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vICAgYXJnczogW3RoaXMuc2VsbGVyLnZhbHVlXSwKICAgIC8vIH0pCiAgICBieXRlYyAxOSAvLyBtZXRob2QgInRyYW5zZmVyKGFkZHJlc3Mpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDc0CiAgICAvLyBpdHhuLnN1Ym1pdEdyb3VwKHBheW1lbnRBc3NldFRyYW5zZmVyLCBwYXltZW50KQogICAgaXR4bl9iZWdpbgogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXNzZXRDbG9zZVRvCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ2NC00NjcKICAgIC8vIGNvbnN0IHBheW1lbnRBc3NldFRyYW5zZmVyID0gaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgYXNzZXRDbG9zZVRvOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIC8vICAgeGZlckFzc2V0OiB0aGlzLnBheW1lbnRBc3NldC52YWx1ZSwKICAgIC8vIH0pCiAgICBpbnRjXzMgLy8gNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ3NAogICAgLy8gaXR4bi5zdWJtaXRHcm91cChwYXltZW50QXNzZXRUcmFuc2ZlciwgcGF5bWVudCkKICAgIGl0eG5fbmV4dAogICAgaXR4bl9maWVsZCBDbG9zZVJlbWFpbmRlclRvCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ1OC00NjAKICAgIC8vIGNvbnN0IHBheW1lbnQgPSBpdHhuLnBheW1lbnQoewogICAgLy8gICBjbG9zZVJlbWFpbmRlclRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MsCiAgICAvLyB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0NzQKICAgIC8vIGl0eG4uc3VibWl0R3JvdXAocGF5bWVudEFzc2V0VHJhbnNmZXIsIHBheW1lbnQpCiAgICBpdHhuX3N1Ym1pdAoKZGVsaXN0X2FmdGVyX2lmX2Vsc2VAMjQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ0OAogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogJ0RlbGV0ZUFwcGxpY2F0aW9uJyB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKZGVsaXN0X2Vsc2VfYm9keUAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDc2CiAgICAvLyBpdHhuLnN1Ym1pdEdyb3VwKGFzc2V0VHJhbnNmZXIsIHBheW1lbnRBc3NldFRyYW5zZmVyLCBwYXltZW50KQogICAgaXR4bl9iZWdpbgogICAgc3dhcAogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXNzZXRDbG9zZVRvCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ1My00NTYKICAgIC8vIGNvbnN0IGFzc2V0VHJhbnNmZXIgPSBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICBhc3NldENsb3NlVG86IHRoaXMuc2VsbGVyLnZhbHVlLAogICAgLy8gICB4ZmVyQXNzZXQ6IHRoaXMucHJpemUudmFsdWUsCiAgICAvLyB9KQogICAgaW50Y18zIC8vIDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0NzYKICAgIC8vIGl0eG4uc3VibWl0R3JvdXAoYXNzZXRUcmFuc2ZlciwgcGF5bWVudEFzc2V0VHJhbnNmZXIsIHBheW1lbnQpCiAgICBpdHhuX25leHQKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFzc2V0Q2xvc2VUbwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0NjQtNDY3CiAgICAvLyBjb25zdCBwYXltZW50QXNzZXRUcmFuc2ZlciA9IGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgIGFzc2V0Q2xvc2VUbzogdGhpcy5zZWxsZXIudmFsdWUsCiAgICAvLyAgIHhmZXJBc3NldDogdGhpcy5wYXltZW50QXNzZXQudmFsdWUsCiAgICAvLyB9KQogICAgaW50Y18zIC8vIDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0NzYKICAgIC8vIGl0eG4uc3VibWl0R3JvdXAoYXNzZXRUcmFuc2ZlciwgcGF5bWVudEFzc2V0VHJhbnNmZXIsIHBheW1lbnQpCiAgICBpdHhuX25leHQKICAgIGl0eG5fZmllbGQgQ2xvc2VSZW1haW5kZXJUbwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0NTgtNDYwCiAgICAvLyBjb25zdCBwYXltZW50ID0gaXR4bi5wYXltZW50KHsKICAgIC8vICAgY2xvc2VSZW1haW5kZXJUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgLy8gfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDc2CiAgICAvLyBpdHhuLnN1Ym1pdEdyb3VwKGFzc2V0VHJhbnNmZXIsIHBheW1lbnRBc3NldFRyYW5zZmVyLCBwYXltZW50KQogICAgaXR4bl9zdWJtaXQKICAgIGIgZGVsaXN0X2FmdGVyX2lmX2Vsc2VAMjQKCmRlbGlzdF9lbHNlX2JvZHlAMTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ3OQogICAgLy8gaWYgKHRoaXMuaXNQcml6ZUJveC52YWx1ZSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MjkKICAgIC8vIGlzUHJpemVCb3ggPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5SXNQcml6ZUJveCB9KQogICAgYnl0ZWMgNSAvLyAiaXNfcHJpemVfYm94IgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0NzkKICAgIC8vIGlmICh0aGlzLmlzUHJpemVCb3gudmFsdWUpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBkZWxpc3RfZWxzZV9ib2R5QDIwCiAgICBwb3BuIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDgwLTQ4MwogICAgLy8gYWJpQ2FsbDx0eXBlb2YgUHJpemVCb3gucHJvdG90eXBlLnRyYW5zZmVyPih7CiAgICAvLyAgIGFwcElkOiB0aGlzLnByaXplLnZhbHVlLAogICAgLy8gICBhcmdzOiBbdGhpcy5zZWxsZXIudmFsdWVdLAogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDgyCiAgICAvLyBhcmdzOiBbdGhpcy5zZWxsZXIudmFsdWVdLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzcKICAgIC8vIHNlbGxlciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlTZWxsZXIgfSkKICAgIGJ5dGVjXzEgLy8gInNlbGxlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDgyCiAgICAvLyBhcmdzOiBbdGhpcy5zZWxsZXIudmFsdWVdLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDgxCiAgICAvLyBhcHBJZDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI3CiAgICAvLyBwcml6ZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVByaXplIH0pCiAgICBieXRlY18zIC8vICJwcml6ZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDgxCiAgICAvLyBhcHBJZDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDgwLTQ4MwogICAgLy8gYWJpQ2FsbDx0eXBlb2YgUHJpemVCb3gucHJvdG90eXBlLnRyYW5zZmVyPih7CiAgICAvLyAgIGFwcElkOiB0aGlzLnByaXplLnZhbHVlLAogICAgLy8gICBhcmdzOiBbdGhpcy5zZWxsZXIudmFsdWVdLAogICAgLy8gfSkKICAgIGJ5dGVjIDE5IC8vIG1ldGhvZCAidHJhbnNmZXIoYWRkcmVzcyl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0ODQKICAgIC8vIHBheW1lbnQuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIGl0eG5fZmllbGQgQ2xvc2VSZW1haW5kZXJUbwogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0NTgtNDYwCiAgICAvLyBjb25zdCBwYXltZW50ID0gaXR4bi5wYXltZW50KHsKICAgIC8vICAgY2xvc2VSZW1haW5kZXJUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgLy8gfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDg0CiAgICAvLyBwYXltZW50LnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgYiBkZWxpc3RfYWZ0ZXJfaWZfZWxzZUAyNAoKZGVsaXN0X2Vsc2VfYm9keUAyMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDg2CiAgICAvLyBpdHhuLnN1Ym1pdEdyb3VwKGFzc2V0VHJhbnNmZXIsIHBheW1lbnQpCiAgICBpdHhuX2JlZ2luCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgaXR4bl9maWVsZCBBc3NldENsb3NlVG8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDUzLTQ1NgogICAgLy8gY29uc3QgYXNzZXRUcmFuc2ZlciA9IGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgIGFzc2V0Q2xvc2VUbzogdGhpcy5zZWxsZXIudmFsdWUsCiAgICAvLyAgIHhmZXJBc3NldDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vIH0pCiAgICBpbnRjXzMgLy8gNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ4NgogICAgLy8gaXR4bi5zdWJtaXRHcm91cChhc3NldFRyYW5zZmVyLCBwYXltZW50KQogICAgaXR4bl9uZXh0CiAgICBpdHhuX2ZpZWxkIENsb3NlUmVtYWluZGVyVG8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDU4LTQ2MAogICAgLy8gY29uc3QgcGF5bWVudCA9IGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIGNsb3NlUmVtYWluZGVyVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIC8vIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ4NgogICAgLy8gaXR4bi5zdWJtaXRHcm91cChhc3NldFRyYW5zZmVyLCBwYXltZW50KQogICAgaXR4bl9zdWJtaXQKICAgIGIgZGVsaXN0X2FmdGVyX2lmX2Vsc2VAMjQKCgovLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjpMaXN0aW5nLmNoYW5nZVByaWNlW3JvdXRpbmddKCkgLT4gdm9pZDoKY2hhbmdlUHJpY2U6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ5MQogICAgLy8gY2hhbmdlUHJpY2UocHJpY2U6IHVpbnQ2NCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0OTIKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLnNlbGxlci52YWx1ZSwgZXJyTXVzdEJlU2VsbGVyKQogICAgdHhuIFNlbmRlcgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzcKICAgIC8vIHNlbGxlciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlTZWxsZXIgfSkKICAgIGJ5dGVjXzEgLy8gInNlbGxlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDkyCiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5zZWxsZXIudmFsdWUsIGVyck11c3RCZVNlbGxlcikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA9PQogICAgYm56IGNoYW5nZVByaWNlX2FmdGVyX2Fzc2VydEAzCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJNYnNsIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck1ic2wKCmNoYW5nZVByaWNlX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0OTMKICAgIC8vIGxvZ2dlZEFzc2VydChwcmljZSA+PSBMaXN0aW5nTWluaW11bVByaWNlLCBlcnJQcmljZVRvb0xvdykKICAgIGR1cAogICAgaW50Y18zIC8vIDQKICAgID49CiAgICBibnogY2hhbmdlUHJpY2VfYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOmVyclBybG8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyUHJsbwoKY2hhbmdlUHJpY2VfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjMxCiAgICAvLyBwcmljZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVByaWNlIH0pCiAgICBieXRlYyA2IC8vICJwcmljZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDk0CiAgICAvLyB0aGlzLnByaWNlLnZhbHVlID0gcHJpY2UKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjYyCiAgICAvLyBsYXN0UHJpY2VSb3VuZCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleVByaWNlUm91bmQgfSkKICAgIGJ5dGVjIDE0IC8vICJwcmljZV9yb3VuZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NDk1CiAgICAvLyB0aGlzLmxhc3RQcmljZVJvdW5kLnZhbHVlID0gR2xvYmFsLnJvdW5kCiAgICBnbG9iYWwgUm91bmQKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQ5MQogICAgLy8gY2hhbmdlUHJpY2UocHJpY2U6IHVpbnQ2NCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czo6QWtpdGFCYXNlQ29udHJhY3QudXBkYXRlQWtpdGFEQU9bcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGVBa2l0YURBTzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNQogICAgLy8gdXBkYXRlQWtpdGFEQU8oYWtpdGFEQU86IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MjYKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzIgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgcHVzaGJ5dGVzICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MjYKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IHVwZGF0ZUFraXRhREFPX2FmdGVyX2Fzc2VydEAzCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJOZGFvIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5kYW8KCnVwZGF0ZUFraXRhREFPX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMiAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjI3CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlID0gYWtpdGFEQU8KICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MjUKICAgIC8vIHVwZGF0ZUFraXRhREFPKGFraXRhREFPOiBBcHBsaWNhdGlvbik6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czo6Q29udHJhY3RXaXRoQ3JlYXRvck9ubHlPcHRJbi5vcHRpbltyb3V0aW5nXSgpIC0+IHZvaWQ6Cm9wdGluOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjQ3CiAgICAvLyBvcHRpbihwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGFzc2V0OiB1aW50NjQpOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjQ4CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gR2xvYmFsLmNyZWF0b3JBZGRyZXNzLCBlcnJGb3JiaWRkZW4pCiAgICB0eG4gU2VuZGVyCiAgICBnbG9iYWwgQ3JlYXRvckFkZHJlc3MKICAgID09CiAgICBibnogb3B0aW5fYWZ0ZXJfYXNzZXJ0QDMKICAgIHB1c2hieXRlcyAiRVJSOmVyckZvcmIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyRm9yYgoKb3B0aW5fYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6NTAKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJySW52YWxpZFBheW1lbnRSZWNlaXZlcikKICAgIGRpZyAxCiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogb3B0aW5fYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOmVycklwbXIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBtcgoKb3B0aW5fYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6NTEKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LmFtb3VudCA9PT0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlLCBlcnJJbnZhbGlkUGF5bWVudEFtb3VudCkKICAgIHN3YXAKICAgIGd0eG5zIEFtb3VudAogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICA9PQogICAgYm56IG9wdGluX2FmdGVyX2Fzc2VydEA3CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJJcG1hIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwbWEKCm9wdGluX2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjUzLTU3CiAgICAvLyBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgYXNzZXRBbW91bnQ6IDAsCiAgICAvLyAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vIH0pLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6NTQKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6NTUKICAgIC8vIGFzc2V0QW1vdW50OiAwLAogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjUzLTU3CiAgICAvLyBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgYXNzZXRBbW91bnQ6IDAsCiAgICAvLyAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vIH0pLnN1Ym1pdCgpCiAgICBpbnRjXzMgLy8gNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjQ3CiAgICAvLyBvcHRpbihwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGFzc2V0OiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjpMaXN0aW5nLmdldEFtb3VudHMoYW1vdW50OiB1aW50NjQpIC0+IGJ5dGVzOgpnZXRBbW91bnRzOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo4MAogICAgLy8gcHJpdmF0ZSBnZXRBbW91bnRzKGFtb3VudDogdWludDY0KTogUm95YWx0eUFtb3VudHMgewogICAgcHJvdG8gMSAxCiAgICBwdXNoYnl0ZXMgIiIKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo4MQogICAgLy8gbGV0IGNyZWF0b3JBbW91bnQgPSBjYWxjUGVyY2VudChhbW91bnQsIHRoaXMuY3JlYXRvclJveWFsdHkudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo0MQogICAgLy8gY3JlYXRvclJveWFsdHkgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlDcmVhdG9yUm95YWx0eSB9KQogICAgYnl0ZWMgMTMgLy8gImNyZWF0b3Jfcm95YWx0eSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6ODEKICAgIC8vIGxldCBjcmVhdG9yQW1vdW50ID0gY2FsY1BlcmNlbnQoYW1vdW50LCB0aGlzLmNyZWF0b3JSb3lhbHR5LnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjcwCiAgICAvLyBhc3NlcnQocCA8PSBESVZJU09SLCBlcnJJbnZhbGlkUGVyY2VudGFnZSkKICAgIGR1cAogICAgaW50YyA0IC8vIDEwMDAwMAogICAgPD0KICAgIGFzc2VydCAvLyBlcnJJcGN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI3MQogICAgLy8gcmV0dXJuIG9wLmRpdncoLi4ub3AubXVsdyhhLCBwKSwgRElWSVNPUikKICAgIGZyYW1lX2RpZyAtMQogICAgbXVsdwogICAgaW50YyA0IC8vIDEwMDAwMAogICAgZGl2dwogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjgyCiAgICAvLyBpZiAoY3JlYXRvckFtb3VudCA9PT0gMCAmJiB0aGlzLmNyZWF0b3JSb3lhbHR5LnZhbHVlID4gMCAmJiBhbW91bnQgPiAwKSB7CiAgICBibnogZ2V0QW1vdW50c19hZnRlcl9pZl9lbHNlQDQKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjQxCiAgICAvLyBjcmVhdG9yUm95YWx0eSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleUNyZWF0b3JSb3lhbHR5IH0pCiAgICBieXRlYyAxMyAvLyAiY3JlYXRvcl9yb3lhbHR5IgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo4MgogICAgLy8gaWYgKGNyZWF0b3JBbW91bnQgPT09IDAgJiYgdGhpcy5jcmVhdG9yUm95YWx0eS52YWx1ZSA+IDAgJiYgYW1vdW50ID4gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGdldEFtb3VudHNfYWZ0ZXJfaWZfZWxzZUA0CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ6IGdldEFtb3VudHNfYWZ0ZXJfaWZfZWxzZUA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjgzCiAgICAvLyBjcmVhdG9yQW1vdW50ID0gMQogICAgaW50Y18xIC8vIDEKICAgIGZyYW1lX2J1cnkgMgoKZ2V0QW1vdW50c19hZnRlcl9pZl9lbHNlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjg2CiAgICAvLyBjb25zdCB7IG1hcmtldHBsYWNlU2FsZVBlcmNlbnRhZ2VNaW46IG1pbiwgbWFya2V0cGxhY2VTYWxlUGVyY2VudGFnZU1heDogbWF4IH0gPSBnZXRORlRGZWVzKHRoaXMuYWtpdGFEQU8udmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMiAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo4NgogICAgLy8gY29uc3QgeyBtYXJrZXRwbGFjZVNhbGVQZXJjZW50YWdlTWluOiBtaW4sIG1hcmtldHBsYWNlU2FsZVBlcmNlbnRhZ2VNYXg6IG1heCB9ID0gZ2V0TkZURmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjU1CiAgICAvLyBjb25zdCBbbmZ0RmVlc0J5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c05GVEZlZXMpKQogICAgZHVwCiAgICBieXRlYyAyMSAvLyAibmZ0X2ZlZXMiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjg2CiAgICAvLyBjb25zdCB7IG1hcmtldHBsYWNlU2FsZVBlcmNlbnRhZ2VNaW46IG1pbiwgbWFya2V0cGxhY2VTYWxlUGVyY2VudGFnZU1heDogbWF4IH0gPSBnZXRORlRGZWVzKHRoaXMuYWtpdGFEQU8udmFsdWUpCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgY292ZXIgMgogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjg3CiAgICAvLyBjb25zdCBpbXBhY3QgPSBnZXRVc2VySW1wYWN0KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuc2VsbGVyLnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MzcKICAgIC8vIHNlbGxlciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlTZWxsZXIgfSkKICAgIGJ5dGVjXzEgLy8gInNlbGxlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6ODcKICAgIC8vIGNvbnN0IGltcGFjdCA9IGdldFVzZXJJbXBhY3QodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5zZWxsZXIudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyOTgtMzAxCiAgICAvLyByZXR1cm4gYWJpQ2FsbDx0eXBlb2YgQWtpdGFTb2NpYWxJbXBhY3QucHJvdG90eXBlLmdldFVzZXJJbXBhY3Q+KHsKICAgIC8vICAgYXBwSWQ6IGdldEFraXRhU29jaWFsQXBwTGlzdChha2l0YURBTykuaW1wYWN0LAogICAgLy8gICBhcmdzOiBbYWNjb3VudF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIxMQogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YVNvY2lhbEFwcExpc3QpKQogICAgc3dhcAogICAgcHVzaGJ5dGVzICJzYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI5OQogICAgLy8gYXBwSWQ6IGdldEFraXRhU29jaWFsQXBwTGlzdChha2l0YURBTykuaW1wYWN0LAogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyOTgtMzAxCiAgICAvLyByZXR1cm4gYWJpQ2FsbDx0eXBlb2YgQWtpdGFTb2NpYWxJbXBhY3QucHJvdG90eXBlLmdldFVzZXJJbXBhY3Q+KHsKICAgIC8vICAgYXBwSWQ6IGdldEFraXRhU29jaWFsQXBwTGlzdChha2l0YURBTykuaW1wYWN0LAogICAgLy8gICBhcmdzOiBbYWNjb3VudF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBwdXNoYnl0ZXMgMHhkNTc0YmIxMCAvLyBtZXRob2QgImdldFVzZXJJbXBhY3QoYWRkcmVzcyl1aW50NjQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIHN3YXAKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlYyAxMiAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjkzCiAgICAvLyBjb25zdCBtaW5JbXBhY3Q6IHVpbnQ2NCA9IChpbXBhY3QgPiAxKSA/IGltcGFjdCAtIDEgOiAxCiAgICBpbnRjXzEgLy8gMQogICAgPgogICAgYnogZ2V0QW1vdW50c190ZXJuYXJ5X2ZhbHNlQDE2CiAgICBpbnRjXzEgLy8gMQogICAgLQoKZ2V0QW1vdW50c190ZXJuYXJ5X21lcmdlQDE3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyOTQKICAgIC8vIHJldHVybiBtYXggLSAoKChtYXggLSBtaW4pICogbWluSW1wYWN0KSAvIElNUEFDVF9ESVZJU09SKQogICAgc3dhcAogICAgZHVwCiAgICB1bmNvdmVyIDMKICAgIC0KICAgIHVuY292ZXIgMgogICAgKgogICAgcHVzaGludCAxMDAwCiAgICAvCiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI3MAogICAgLy8gYXNzZXJ0KHAgPD0gRElWSVNPUiwgZXJySW52YWxpZFBlcmNlbnRhZ2UpCiAgICBkdXAKICAgIGludGMgNCAvLyAxMDAwMDAKICAgIDw9CiAgICBhc3NlcnQgLy8gZXJySXBjdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNzEKICAgIC8vIHJldHVybiBvcC5kaXZ3KC4uLm9wLm11bHcoYSwgcCksIERJVklTT1IpCiAgICBmcmFtZV9kaWcgLTEKICAgIG11bHcKICAgIGludGMgNCAvLyAxMDAwMDAKICAgIGRpdncKICAgIGR1cAogICAgZnJhbWVfYnVyeSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjkxCiAgICAvLyBpZiAoYWtpdGFBbW91bnQgPT09IDAgJiYgYW1vdW50ID4gMCkgewogICAgYm56IGdldEFtb3VudHNfYWZ0ZXJfaWZfZWxzZUA3CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ6IGdldEFtb3VudHNfYWZ0ZXJfaWZfZWxzZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjkyCiAgICAvLyBha2l0YUFtb3VudCA9IDEKICAgIGludGNfMSAvLyAxCiAgICBmcmFtZV9idXJ5IDAKCmdldEFtb3VudHNfYWZ0ZXJfaWZfZWxzZUA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo5NQogICAgLy8gbGV0IG1hcmtldHBsYWNlQW1vdW50ID0gY2FsY1BlcmNlbnQoYW1vdW50LCB0aGlzLm1hcmtldHBsYWNlUm95YWx0aWVzLnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NTYKICAgIC8vIG1hcmtldHBsYWNlUm95YWx0aWVzID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5TWFya2V0cGxhY2VSb3lhbHRpZXMgfSkKICAgIGJ5dGVjIDE2IC8vICJtYXJrZXRwbGFjZV9yb3lhbHRpZXMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjk1CiAgICAvLyBsZXQgbWFya2V0cGxhY2VBbW91bnQgPSBjYWxjUGVyY2VudChhbW91bnQsIHRoaXMubWFya2V0cGxhY2VSb3lhbHRpZXMudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNzAKICAgIC8vIGFzc2VydChwIDw9IERJVklTT1IsIGVyckludmFsaWRQZXJjZW50YWdlKQogICAgZHVwCiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICA8PQogICAgYXNzZXJ0IC8vIGVycklwY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjcxCiAgICAvLyByZXR1cm4gb3AuZGl2dyguLi5vcC5tdWx3KGEsIHApLCBESVZJU09SKQogICAgZnJhbWVfZGlnIC0xCiAgICBtdWx3CiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICBkaXZ3CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo5NgogICAgLy8gaWYgKG1hcmtldHBsYWNlQW1vdW50ID09PSAwICYmIHRoaXMubWFya2V0cGxhY2VSb3lhbHRpZXMudmFsdWUgPiAwICYmIGFtb3VudCA+IDApIHsKICAgIGJueiBnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VAMTEKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjU2CiAgICAvLyBtYXJrZXRwbGFjZVJveWFsdGllcyA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleU1hcmtldHBsYWNlUm95YWx0aWVzIH0pCiAgICBieXRlYyAxNiAvLyAibWFya2V0cGxhY2Vfcm95YWx0aWVzIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo5NgogICAgLy8gaWYgKG1hcmtldHBsYWNlQW1vdW50ID09PSAwICYmIHRoaXMubWFya2V0cGxhY2VSb3lhbHRpZXMudmFsdWUgPiAwICYmIGFtb3VudCA+IDApIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VAMTEKICAgIGZyYW1lX2RpZyAtMQogICAgYnogZ2V0QW1vdW50c19hZnRlcl9pZl9lbHNlQDExCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjk3CiAgICAvLyBtYXJrZXRwbGFjZUFtb3VudCA9IDEKICAgIGludGNfMSAvLyAxCiAgICBmcmFtZV9idXJ5IDEKCmdldEFtb3VudHNfYWZ0ZXJfaWZfZWxzZUAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTAwCiAgICAvLyBjb25zdCBzZWxsZXJBbW91bnQ6IHVpbnQ2NCA9IGFtb3VudCAtIChjcmVhdG9yQW1vdW50ICsgYWtpdGFBbW91bnQgKyAoMiAqIG1hcmtldHBsYWNlQW1vdW50KSkKICAgIGZyYW1lX2RpZyAyCiAgICBkdXAKICAgIGZyYW1lX2RpZyAwCiAgICBkdXAKICAgIGNvdmVyIDMKICAgICsKICAgIHB1c2hpbnQgMgogICAgZnJhbWVfZGlnIDEKICAgIGR1cAogICAgY292ZXIgNQogICAgKgogICAgKwogICAgZnJhbWVfZGlnIC0xCiAgICBzd2FwCiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjEwMi0xMDcKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIGNyZWF0b3I6IGNyZWF0b3JBbW91bnQsCiAgICAvLyAgIGFraXRhOiBha2l0YUFtb3VudCwKICAgIC8vICAgbWFya2V0cGxhY2U6IG1hcmtldHBsYWNlQW1vdW50LAogICAgLy8gICBzZWxsZXI6IHNlbGxlckFtb3VudCwKICAgIC8vIH0KICAgIHN3YXAKICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgaXRvYgogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGl0b2IKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKZ2V0QW1vdW50c190ZXJuYXJ5X2ZhbHNlQDE2OgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI5MwogICAgLy8gY29uc3QgbWluSW1wYWN0OiB1aW50NjQgPSAoaW1wYWN0ID4gMSkgPyBpbXBhY3QgLSAxIDogMQogICAgaW50Y18xIC8vIDEKICAgIGIgZ2V0QW1vdW50c190ZXJuYXJ5X21lcmdlQDE3CgoKLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo6TGlzdGluZy5hc3NlcnRQcmljZVNldHRsZWQoKSAtPiB2b2lkOgphc3NlcnRQcmljZVNldHRsZWQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjExMQogICAgLy8gcHJpdmF0ZSBhc3NlcnRQcmljZVNldHRsZWQoKTogdm9pZCB7CiAgICBwcm90byAwIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTEyCiAgICAvLyBjb25zdCBsYXN0ID0gdGhpcy5sYXN0UHJpY2VSb3VuZC52YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6NjIKICAgIC8vIGxhc3RQcmljZVJvdW5kID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogTGlzdGluZ0dsb2JhbFN0YXRlS2V5UHJpY2VSb3VuZCB9KQogICAgYnl0ZWMgMTQgLy8gInByaWNlX3JvdW5kIgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxMTIKICAgIC8vIGNvbnN0IGxhc3QgPSB0aGlzLmxhc3RQcmljZVJvdW5kLnZhbHVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTEzCiAgICAvLyBpZiAobGFzdCA+IDApIHsKICAgIGJ6IGFzc2VydFByaWNlU2V0dGxlZF9hZnRlcl9pZl9lbHNlQDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTE0CiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLnJvdW5kID4gbGFzdCArIExpc3RpbmdQcmljZUNoYW5nZUNvb2xkb3duUm91bmRzLCBlcnJQcmljZVJlY2VudGx5Q2hhbmdlZCkKICAgIGdsb2JhbCBSb3VuZAogICAgZnJhbWVfZGlnIDAKICAgIGludGNfMyAvLyA0CiAgICArCiAgICA+CiAgICBibnogYXNzZXJ0UHJpY2VTZXR0bGVkX2FmdGVyX2lmX2Vsc2VANAogICAgcHVzaGJ5dGVzICJFUlI6ZXJyUHJjZCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJQcmNkCgphc3NlcnRQcmljZVNldHRsZWRfYWZ0ZXJfaWZfZWxzZUA0OgogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo6TGlzdGluZy50cmFuc2ZlclB1cmNoYXNlVG9CdXllcihidXllcjogYnl0ZXMpIC0+IHZvaWQ6CnRyYW5zZmVyUHVyY2hhc2VUb0J1eWVyOgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxMTgKICAgIC8vIHByaXZhdGUgdHJhbnNmZXJQdXJjaGFzZVRvQnV5ZXIoYnV5ZXI6IEFjY291bnQpOiB2b2lkIHsKICAgIHByb3RvIDEgMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxMTkKICAgIC8vIGlmICh0aGlzLmlzUHJpemVCb3gudmFsdWUpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjI5CiAgICAvLyBpc1ByaXplQm94ID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBrZXk6IExpc3RpbmdHbG9iYWxTdGF0ZUtleUlzUHJpemVCb3ggfSkKICAgIGJ5dGVjIDUgLy8gImlzX3ByaXplX2JveCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTE5CiAgICAvLyBpZiAodGhpcy5pc1ByaXplQm94LnZhbHVlKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogdHJhbnNmZXJQdXJjaGFzZVRvQnV5ZXJfYWZ0ZXJfaWZfZWxzZUAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjEyMC0xMjMKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFByaXplQm94LnByb3RvdHlwZS50cmFuc2Zlcj4oewogICAgLy8gICBhcHBJZDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vICAgYXJnczogW2J1eWVyXSwKICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjEyMQogICAgLy8gYXBwSWQ6IHRoaXMucHJpemUudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNwogICAgLy8gcHJpemUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQcml6ZSB9KQogICAgYnl0ZWNfMyAvLyAicHJpemUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjEyMQogICAgLy8gYXBwSWQ6IHRoaXMucHJpemUudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjEyMC0xMjMKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFByaXplQm94LnByb3RvdHlwZS50cmFuc2Zlcj4oewogICAgLy8gICBhcHBJZDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vICAgYXJnczogW2J1eWVyXSwKICAgIC8vIH0pCiAgICBieXRlYyAxOSAvLyBtZXRob2QgInRyYW5zZmVyKGFkZHJlc3Mpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxMjQKICAgIC8vIHJldHVybgogICAgcmV0c3ViCgp0cmFuc2ZlclB1cmNoYXNlVG9CdXllcl9hZnRlcl9pZl9lbHNlQDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjEyNwogICAgLy8gY29uc3QgcHJpemVBc3NldCA9IEFzc2V0KHRoaXMucHJpemUudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoyNwogICAgLy8gcHJpemUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQcml6ZSB9KQogICAgYnl0ZWNfMyAvLyAicHJpemUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjEyNwogICAgLy8gY29uc3QgcHJpemVBc3NldCA9IEFzc2V0KHRoaXMucHJpemUudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTMwCiAgICAvLyBsb2dnZWRBc3NlcnQocHJpemVBc3NldC5iYWxhbmNlKEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzKSA+PSB0aGlzLnByaXplQW1vdW50LnZhbHVlLCBlcnJQcml6ZUNoYW5nZWQpCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgc3dhcAogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBhc3NlcnQgLy8gYWNjb3VudCBvcHRlZCBpbnRvIGFzc2V0CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czo2MAogICAgLy8gcHJpemVBbW91bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBMaXN0aW5nR2xvYmFsU3RhdGVLZXlQcml6ZUFtb3VudCB9KQogICAgYnl0ZWMgMjAgLy8gInByaXplX2Ftb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTMwCiAgICAvLyBsb2dnZWRBc3NlcnQocHJpemVBc3NldC5iYWxhbmNlKEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzKSA+PSB0aGlzLnByaXplQW1vdW50LnZhbHVlLCBlcnJQcml6ZUNoYW5nZWQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPj0KICAgIGJueiB0cmFuc2ZlclB1cmNoYXNlVG9CdXllcl9hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6ZXJyUGNoZyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJQY2hnCgp0cmFuc2ZlclB1cmNoYXNlVG9CdXllcl9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTMyCiAgICAvLyBpZiAoYnV5ZXIuaXNPcHRlZEluKHByaXplQXNzZXQpKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGRpZyAxCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYnogdHJhbnNmZXJQdXJjaGFzZVRvQnV5ZXJfZWxzZV9ib2R5QDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTM0LTEzNwogICAgLy8gaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgYXNzZXRDbG9zZVRvOiBidXllciwKICAgIC8vICAgeGZlckFzc2V0OiBwcml6ZUFzc2V0LAogICAgLy8gfSkuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBmcmFtZV9kaWcgLTEKICAgIGl0eG5fZmllbGQgQXNzZXRDbG9zZVRvCiAgICBpbnRjXzMgLy8gNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgcmV0c3ViCgp0cmFuc2ZlclB1cmNoYXNlVG9CdXllcl9lbHNlX2JvZHlAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTQwCiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzIgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTQwCiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTQ0CiAgICAvLyBbeyBhZGRyZXNzOiBidXllciwgYW1vdW50OiBwcml6ZUFzc2V0LmJhbGFuY2UoR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MpIH1dLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIHVuY292ZXIgMgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGFzc2VydCAvLyBhY2NvdW50IG9wdGVkIGludG8gYXNzZXQKICAgIGl0b2IKICAgIGZyYW1lX2RpZyAtMQogICAgc3dhcAogICAgY29uY2F0CiAgICBieXRlYyA0IC8vIDB4MDAwMQogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE0NQogICAgLy8gcHJpemVBc3NldC5iYWxhbmNlKEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzKSwKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBkaWcgMgogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBhc3NlcnQgLy8gYWNjb3VudCBvcHRlZCBpbnRvIGFzc2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvbWFya2V0cGxhY2UvbGlzdGluZy5hbGdvLnRzOjE0NwogICAgLy8gR2xvYmFsLnplcm9BZGRyZXNzCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTM5LTE0OAogICAgLy8gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgcHJpemVBc3NldC5pZCwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogYnV5ZXIsIGFtb3VudDogcHJpemVBc3NldC5iYWxhbmNlKEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzKSB9XSwKICAgIC8vICAgcHJpemVBc3NldC5iYWxhbmNlKEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzKSwKICAgIC8vICAgdHJ1ZSwKICAgIC8vICAgR2xvYmFsLnplcm9BZGRyZXNzCiAgICAvLyApCiAgICB1bmNvdmVyIDQKICAgIHVuY292ZXIgNAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxNDIKICAgIC8vIDAsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxNDMKICAgIC8vIE1BWF9VSU5UNjQsCiAgICBpbnRjIDUgLy8gMTg0NDY3NDQwNzM3MDk1NTE2MTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9tYXJrZXRwbGFjZS9saXN0aW5nLmFsZ28udHM6MTM5LTE0OAogICAgLy8gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgcHJpemVBc3NldC5pZCwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogYnV5ZXIsIGFtb3VudDogcHJpemVBc3NldC5iYWxhbmNlKEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzKSB9XSwKICAgIC8vICAgcHJpemVBc3NldC5iYWxhbmNlKEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzKSwKICAgIC8vICAgdHJ1ZSwKICAgIC8vICAgR2xvYmFsLnplcm9BZGRyZXNzCiAgICAvLyApCiAgICB1bmNvdmVyIDYKICAgIHVuY292ZXIgNgogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxNDYKICAgIC8vIHRydWUsCiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL21hcmtldHBsYWNlL2xpc3RpbmcuYWxnby50czoxMzktMTQ4CiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICBwcml6ZUFzc2V0LmlkLAogICAgLy8gICAwLAogICAgLy8gICBNQVhfVUlOVDY0LAogICAgLy8gICBbeyBhZGRyZXNzOiBidXllciwgYW1vdW50OiBwcml6ZUFzc2V0LmJhbGFuY2UoR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MpIH1dLAogICAgLy8gICBwcml6ZUFzc2V0LmJhbGFuY2UoR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MpLAogICAgLy8gICB0cnVlLAogICAgLy8gICBHbG9iYWwuemVyb0FkZHJlc3MKICAgIC8vICkKICAgIHVuY292ZXIgNwogICAgY2FsbHN1YiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50CiAgICBwb3BuIDIKICAgIHJldHN1Ygo=", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyAGAAEIBKCNBv///////////wEmGA1wYXltZW50X2Fzc2V0BnNlbGxlcglha2l0YV9kYW8FcHJpemUCAAEMaXNfcHJpemVfYm94BXByaWNlCmV4cGlyYXRpb24McmVzZXJ2ZWRfZm9yC21hcmtldHBsYWNlDGFraXRhX2VzY3JvdwtFUlI6ZXJyTWJmZgQVH3x1D2NyZWF0b3Jfcm95YWx0eQtwcmljZV9yb3VuZA9zZWxsZXJfcmVmZXJyZXIVbWFya2V0cGxhY2Vfcm95YWx0aWVzC0VSUjplcnJJcGF5C0VSUjplcnJJeGZyBK35KuQMcHJpemVfYW1vdW50CG5mdF9mZWVzC0VSUjplcnJMZXhwC0VSUjplcnJSZmRhggMEahY5PQQXHJ+IBGjoY0M2GgCOAwBVAEkAPTEZFEQxGEEAJoIEBBk5bEoEM+kslASFTe3gBD6hGDI2GgCOBAiECMYAAQj6ACNDgAScVCQJNhoAjgEB/wAxGYEFEjEYEERCB3IxGYEFEjEYEERCBOgxGYEFEjEYEERCA2CKCAKAACKL+UAABYv+QAFJI0SL+IADYWFsZUgkW4v8IlmB1MUBC4HkqQMITIv5QABdsUlyCERLAov9CLIIsgcjshAisgG2i/oWi/sWTwKyGIAE3KwJNbIaTLIashqL/LIai/+yGoEGshAisgGztD5JVwQATFcABCcMEkRJFSQSRBdMTBZMFlCL/E8DTwOJSXIIRIv5cABFAUEAiksBSwFyCExOBEQijACL/kEACksBcghEI4wAjAGxSwFyCERPA7IIsgcjshAisgG2iwBBAASLAbIVi/myEYv9shJPArIUJbIQIrIBtov6Fov7Fk8DshiABKOhbKqyGkyyGrIai/yyGov/shqBBrIQIrIBs7Q+SVcEAExXAAQnDBJESRUkEkQXTEL/XUsBMhAIsUsBSXIIRDIQsgiyByOyECKyAbaL+RZMshiABDlOrrKyGrIagQayECKyAbNC/0QiQv60igUBgACL/kEAa4v8MgMTQQBji/uAC3dhbGxldF9mZWVzZUgkW0khBA5Ei/4dIQSXSYwAQAAIi/5BAAMjjAAyB0mBgJqeAQiLAElOAhaL/ExQJwRMUIv7i/1PBU8ETwRLBSKL/4j+PEhXCAiL/k8CCRZMUEyJi/4WIhZQTIk2GgFJFSQSRBc2GgJJFSMSRCJTNhoDSRUkEkQXNhoESRUkEkQXNhoFSRUkEkQXNhoGSU4CFYEgEkQ2GgdJTgIVgSgSRDYaCElOAhWBIBJENhoJSRUkEkQXTDYaCkkVJBJEF0w2GgtJTgIVgSASRDYaDEkiWYECCEsBFRJEVwIATDYaDUkVJBJEF0w2Gg5JTgJJFUsBIllJgQoSRE8CTEsCUiJZgQwIEkQ2Gg9JFYEwEkQiW0w2Gg9JFYEwEkRXCCBMNhoPSRWBMBJEgShbTDINQAAEJwuwACtPEWcnBU8QZycGTw9nKE8OZ0lBAAdJMgcNQQCOI0AAD4ALRVJSOmVycklleHCwACcHTGcpTwxngAZmdW5kZXJPC2cnCE8KZycNTwlngAdnYXRlX2lkTwhnJwlPB2eAB3ZlcnNpb25PBmcqTwVnJwpPBGcnFE8DZycOImeAA3JldoEDZycPTwJngA1mYWN0b3J5X2Zsb2F0TGciKmVEJxVlSIEQWycQTGcjQyJC/28xFiMJSTgQIxJENhoBSRWBIBJENhoCSU4DFYEgEkQxADIJEkAABCcLsAAiKGVEQQAPgAtFUlI6ZXJyUGFtYbAAIicHZURBAAsiJwdlRDIHDUEBJSNAAAQnFrAAiAZoIicIZUQyAxNBAA8iJwhlREsBEkAABCcXsABLATgAMgkSQAAEJxGwAEsBOAcyChJAAAQnEbAATDgIIicGZUQSQAAEJxGwAIgGSCInBmVEiAUlSSRbSUEAICIqZUQiJw9lRCInCmVEgQJbcghETgIiTwRPBIj9KSJbsSInCmVEgQJbcghEsgeyCCOyECKyAbOxSYEQWyInCWVEsgdJsggjshAisgGzsUsCsgeyCCOyECKyAbMiJwVlREEAIbGBGFsiKWVEsgeyCCOyECKyAbOxMgmyCSOyECKyAbMjQyIrZUSxSwEiW0sBcQtEsgeyCCOyECKyAbOxTIEYW0xxBESABSBTb2xkUCIpZUSyB7IFsggjshAisgGzQv+0IkL+2DEWIwlJOBAlEkQ2GgFJFYEgEkQ2GgJJTgIVgSASRDEAMgkSQAAEJwuwACIoZURAAA+AC0VSUjplcnJQYW5hsAAiJwdlREEACyInB2VEMgcNQQInI0AABCcWsACIBOwiJwhlRDIDE0EADyInCGVESwESQAAEJxewAEsCOBEiKGVEEkAABCcSsABLAjgUMgoSQAAEJxKwAE8COBIiJwZlRBJAAAQnErAAiATJIicGZUSIA6ZJJFtJQQAjIiplRCInD2VEIihlRCInCmVEgQJbcghETgNPBE8EiPunIluxIicKZUSBAltyCEQiKGVEshGyFLISJbIQIrIBsyInBWVEQAAvIitlTElPAkRxC0QiKGVEcABFAUEBMLFxC0RLASJbIihlRLIRshKyFCWyECKyAbMiJwllRCIoZURwAEUBQQDTsSInCWVESwGBEFsiKGVEshGyErIUJbIQIrIBsyIoZURLAkxwAEUBQQB6sYEQWyIoZUSyEbISshQlshAisgGzIillRCIoZURwAEUBQQAisSIpZUQiKGVEshGyFSWyECKyAbOxMgmyCSOyECKyAbMjQzIKIihlRExLAXAARCIqZUQiKWVESwIWUCcETFAyA08CTwQiIQVPBU8GI08HiPlFRgJC/74iKmVEIihlRE8CgRBbSRZPBExQJwRMUDIDTwRPBCIhBU8FTwYiTweI+RZGAkL/bCIqZUQiKGVEIicJZURLA4EQW0kWTwJMUCcETFAyA08ETwQiIQVPBU8GIk8HiPjiRgJC/xUiKmVEIihlRE8CcQtESwMiW0kWTwJMUCcETFAyA08ETwQiIQVPBU8GIk8HiPivRgJC/rYiQv3WNhoBSRWBIBJEMQAyCRJAAAQnC7AAIillRBJAAA+AC0VSUjplcnJPc2NksAAiKWVEIitlRDIJTgIiKGVEQQBuIillTE4ERCIoZUQiJwVlREEANUUBRQGxIillRCIrZUSyGCcTshqyGoEGshAisgGzsbIRTLIVJbIQIrIBtrIJI7IQIrIBsyNDsUyyEUyyFSWyECKyAbayEUyyFSWyECKyAbayCSOyECKyAbNC/9giJwVlREEAKEYCsSIpZUQiK2VEshgnE7IashqBBrIQIrIBs7GyCSOyECKyAbNC/6ixshGyFSWyECKyAbayCSOyECKyAbNC/5A2GgFJFSQSRBcxACIpZUQSQAAPgAtFUlI6ZXJyTWJzbLAASSUPQAAPgAtFUlI6ZXJyUHJsb7AAJwZMZycOMgZnI0M2GgFJFSQSRBcxACIqZUSABndhbGxldGVIcghEEkAAD4ALRVJSOmVyck5kYW+wACpMZyNDMRYjCUk4ECMSRDYaAUkVJBJEFzEAMgkSQAAPgAtFUlI6ZXJyRm9yYrAASwE4BzIKEkAAD4ALRVJSOmVycklwbXKwAEw4CDIQEkAAD4ALRVJSOmVycklwbWGwALEyCkyyESKyErIUJbIQIrIBsyNDigEBgABJIicNZURJIQQORIv/HSEEl0lAABAiJw1lREEACIv/QQADI4wCIiplREknFWVISSJbTgIkW0wiKWVEsUyAA3NhbGVIgRBbshiABNV0uxCyGrIagQayECKyAbO0PklXBABMVwAEJwwSREkVJBJEF0kjDUEAdCMJTElPAwlPAguB6AcKCUkhBA5Ei/8dIQSXSYwAQAAIi/9BAAMjjAAiJxBlREkhBA5Ei/8dIQSXSYwBQAAQIicQZURBAAiL/0EAAyOMAYsCSYsASU4DCIECiwFJTgULCIv/TAlMFk8CFlBPAhZQTBZQjACJSCNC/4mKAAAiJw5lTElPAkRBABkyBosAJQgNQAAPgAtFUlI6ZXJyUHJjZLAAiYoBACInBWVEQQAYsSIrZUSyGCcTshqL/7IagQayECKyAbOJIitlTElPAkQyCkxwAEQiJxRlRA9AAA+AC0VSUjplcnJQY2hnsACL/0sBcABFAUEAD7GyEYv/shUlshAisgGziSIqZUQyCk8CSU4CcABEFov/TFAnBExQMgpLAnAARDIDTwRPBCIhBU8GTwYjTweI9R1GAok=", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
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
var ListingFactory = class {
  /**
   * The underlying `AppFactory` for when you want to have more flexibility
   */
  appFactory;
  /**
   * Creates a new instance of `ListingFactory`
   *
   * @param params The parameters to initialise the app factory with
   */
  constructor(params) {
    this.appFactory = new _AppFactory2({
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
  params = {
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
  };
};
var ListingClient = class _ListingClient {
  /**
   * The underlying `AppClient` for when you want to have more flexibility
   */
  appClient;
  constructor(appClientOrParams) {
    this.appClient = appClientOrParams instanceof _AppClient2 ? appClientOrParams : new _AppClient2({
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
    return new _ListingClient(await _AppClient2.fromCreatorAndName({ ...params, appSpec: APP_SPEC2 }));
  }
  /**
   * Returns an `ListingClient` instance for the current network based on
   * pre-determined network-specific app IDs specified in the ARC-56 app spec.
   *
   * If no IDs are in the app spec or the network isn't recognised, an error is thrown.
   * @param params The parameters to create the app client
   */
  static async fromNetwork(params) {
    return new _ListingClient(await _AppClient2.fromNetwork({ ...params, appSpec: APP_SPEC2 }));
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
  };
  /**
   * Create transactions for the current app
   */
  createTransaction = {
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
  };
  /**
   * Send calls to the current app
   */
  send = {
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
  };
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
  state = {
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
  };
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
};

// src/marketplace/listing.ts
var ListingSDK = class extends BaseSDK {
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
      prize: state.prize ?? 0n,
      isPrizeBox: Boolean(state.isPrizeBox ?? 0n),
      price: state.price ?? 0n,
      paymentAsset: state.paymentAsset ?? 0n,
      expiration: state.expiration ?? 0n,
      seller: ((_a = state.seller) == null ? void 0 : _a.toString()) ?? "",
      reservedFor: ((_b = state.reservedFor) == null ? void 0 : _b.toString()) ?? "",
      creatorRoyalty: state.creatorRoyalty ?? 0n,
      gateId: state.gateId ?? 0n,
      marketplace: ((_c = state.marketplace) == null ? void 0 : _c.toString()) ?? "",
      marketplaceRoyalties: state.marketplaceRoyalties ?? 0n,
      rev: state.rev ?? 0n,
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
var MARKETPLACE_ERROR_MESSAGES = withErrorCodeAliases({
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
var translateMarketplaceError = makeErrorTranslator(MARKETPLACE_ERROR_MESSAGES);

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
var MarketplaceSDK = class extends BaseSDK {
  constructor(params) {
    super({ factory: MarketplaceFactory, ...params }, ENV_VAR_NAMES.MARKETPLACE_APP_ID);
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
      amount: microAlgo(cost),
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
          amount: microAlgo(optInCost),
          receiver: this.client.appAddress
        });
        group.optIn({
          ...sendParams,
          args: { payment: optInPayment, asset },
          maxFee: microAlgo(257e3)
        });
      }
    }
    if (isPrizeBox) {
      const { prizeBoxId } = rest;
      const prizeBoxSDK = new PrizeBoxFactorySDK({ algorand: this.algorand, factoryParams: {} }).get({ appId: BigInt(prizeBoxId) });
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
          maxFee: microAlgo(2e6)
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
          maxFee: microAlgo(2e6)
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
      const rewardsAddress = algosdk.getApplicationAddress(rewardsAppId).toString();
      const response = await algod.accountAssetInformation(rewardsAddress, asset).do();
      return response.assetHolding ? 0n : 100000n;
    } catch {
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
    const perDisbursement = MIN_DISBURSEMENTS_MBR + USER_ALLOCATION_MBR;
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
        amount: microAlgo(listingState.price),
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
      amount: microAlgo(cost),
      receiver: this.client.appAddress
    });
    await this.client.send.optIn({
      ...sendParams,
      args: { payment, asset },
      maxFee: microAlgo(257e3),
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

export {
  ListingSDK,
  MARKETPLACE_ERROR_MESSAGES,
  translateMarketplaceError,
  MARKETPLACE_HINTED_METHODS,
  MARKETPLACE_LEGACY_METHODS,
  LISTING_CREATE_MBR,
  LEGACY_LISTING_CREATE_MBR,
  directGateCtx,
  isLegacyGateTxn,
  MarketplaceSDK,
  newListing
};
//# sourceMappingURL=chunk-HLQNUSDR.mjs.map
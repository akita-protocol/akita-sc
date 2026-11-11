"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } var _class; var _class2;


var _chunkYKKIQIROjs = require('./chunk-YKKIQIRO.js');



var _chunkQ5IKYOZSjs = require('./chunk-Q5IKYOZS.js');


var _chunkR54UGCHPjs = require('./chunk-R54UGCHP.js');


var _chunkVE7OXZWIjs = require('./chunk-VE7OXZWI.js');

// src/hyper-swap/index.ts
var _algokitutils = require('@algorandfoundation/algokit-utils');

// src/generated/HyperSwapClient.ts
var _apparc56 = require('@algorandfoundation/algokit-utils/types/app-arc56');


var _appclient = require('@algorandfoundation/algokit-utils/types/app-client');
var _appfactory = require('@algorandfoundation/algokit-utils/types/app-factory');
var APP_SPEC = { "name": "HyperSwap", "structs": { "Object57CB3C34": [{ "name": "root", "type": "uint64" }, { "name": "data", "type": "uint64" }], "HashKey": [{ "name": "id", "type": "uint64" }, { "name": "hash", "type": "byte[32]" }], "HyperSwapMBRData": [{ "name": "offers", "type": "uint64" }, { "name": "participants", "type": "uint64" }, { "name": "hashes", "type": "uint64" }, { "name": "mm", "type": "Object57CB3C34" }], "OfferValue": [{ "name": "state", "type": "uint8" }, { "name": "root", "type": "byte[32]" }, { "name": "leaves", "type": "uint64" }, { "name": "escrowed", "type": "uint64" }, { "name": "participantsRoot", "type": "byte[32]" }, { "name": "participantsLeaves", "type": "uint64" }, { "name": "acceptances", "type": "uint64" }, { "name": "expiration", "type": "uint64" }], "ParticipantKey": [{ "name": "id", "type": "uint64" }, { "name": "address", "type": "address" }], "RefundValue": [{ "name": "amount", "type": "uint64" }, { "name": "payor", "type": "address" }] }, "methods": [{ "name": "create", "args": [{ "type": "string", "name": "version" }, { "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "offer", "args": [{ "type": "pay", "name": "payment" }, { "type": "byte[32]", "name": "root", "desc": "the merkle tree root of trades consisting of from address, recipient address, asset id & amount" }, { "type": "uint64", "name": "leaves", "desc": "the number of leaves in the tree" }, { "type": "byte[32]", "name": "participantsRoot", "desc": "the merkle tree root of participating addresses" }, { "type": "uint64", "name": "participantsLeaves" }, { "type": "uint64", "name": "expiration", "desc": "the unix timestamp that the offer auto-expires at; at most `MaxOfferDuration` from now" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Creates a merkle tree based atomic payment/xfer group", "events": [], "recommendations": {} }, { "name": "accept", "args": [{ "type": "pay", "name": "mbrPayment", "desc": "the payment to cover the MBR" }, { "type": "uint64", "name": "id", "desc": "the id of the offer being accepted" }, { "type": "byte[32][]", "name": "proof", "desc": "the bytes32 array proof of inclusion in the participants list" }, { "type": "byte[32]", "name": "terms", "desc": "`offerTerms(id)` as computed by the participant from the full leaf and participant lists" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Accepts an offer", "events": [], "recommendations": {} }, { "name": "escrow", "args": [{ "type": "pay", "name": "payment", "desc": "the leaf's ALGO principal plus the hash MBR, sent by the participant" }, { "type": "uint64", "name": "id", "desc": "the id of the offer" }, { "type": "address", "name": "receiver", "desc": "the recipient in the offer leaf" }, { "type": "uint64", "name": "amount", "desc": "the amount in the offer leaf" }, { "type": "byte[32][]", "name": "proof", "desc": "the proof to verify the details are part of the tree" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Escrows the assets in the trade for a given leaf in the tree", "events": [], "recommendations": {} }, { "name": "escrowAsa", "args": [{ "type": "pay", "name": "mbrPayment", "desc": "the payment to cover the MBR" }, { "type": "axfer", "name": "assetXfer", "desc": "the asset transfer to escrow the asa, sent by the participant (no clawback)" }, { "type": "uint64", "name": "id", "desc": "the id of the offer" }, { "type": "address", "name": "receiver", "desc": "the recipient in the offer leaf" }, { "type": "uint64", "name": "asset", "desc": "the asset in the offer leaf" }, { "type": "uint64", "name": "amount", "desc": "the amount in the offer leaf" }, { "type": "byte[32][]", "name": "proof", "desc": "the proof to verify the details are part of the tree" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Escrows the assets in the trade for a given leaf in the tree", "events": [], "recommendations": {} }, { "name": "disburse", "args": [{ "type": "uint64", "name": "id", "desc": "the id of the offer" }, { "type": "uint64", "name": "receiverWallet", "desc": "the receiver's ARC58 wallet app id (0 if not an ARC58 wallet)" }, { "type": "address", "name": "receiver", "desc": "the recipient address in the leaf" }, { "type": "uint64", "name": "asset", "desc": "the asset being transferred" }, { "type": "uint64", "name": "amount", "desc": "the amount being transferred" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Disburses the caller's own escrowed leaf. Kept for the existing plugin ABI; equivalent to\n`disburseFrom(id, Txn.sender, ...)`.", "events": [], "recommendations": {} }, { "name": "disburseFrom", "args": [{ "type": "uint64", "name": "id", "desc": "the id of the offer" }, { "type": "address", "name": "from", "desc": "the funder (sender) in the leaf" }, { "type": "uint64", "name": "receiverWallet", "desc": "the receiver's ARC58 wallet app id (0 if not an ARC58 wallet)" }, { "type": "address", "name": "receiver", "desc": "the recipient address in the leaf" }, { "type": "uint64", "name": "asset", "desc": "the asset being transferred" }, { "type": "uint64", "name": "amount", "desc": "the amount being transferred" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Disburses any escrowed leaf. Permissionless: once every agreed leaf is funded, anyone can\ncomplete the swap, so no participant can withhold its own leaf.", "events": [], "recommendations": {} }, { "name": "cancel", "args": [{ "type": "uint64", "name": "id", "desc": "the id of the offer being cancelled" }, { "type": "byte[32][]", "name": "proof", "desc": "unused; kept for ABI compatibility (membership was proven at accept)" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Cancels an offer. Allowed while collecting acceptances or escrow, and in DISBURSING only after\nexpiration and only if no leaf has been disbursed yet (`escrowed === leaves`), so a swap is\neither completed or fully unwound.", "events": [], "recommendations": {} }, { "name": "withdraw", "args": [{ "type": "uint64", "name": "id", "desc": "the id of the cancelled offer" }, { "type": "address", "name": "receiver", "desc": "the receiver of the leaf's swap" }, { "type": "uint64", "name": "asset", "desc": "the asset of the leaf's swap" }, { "type": "uint64", "name": "amount", "desc": "the amount of the leaf's swap" }, { "type": "byte[32][]", "name": "proof", "desc": "unused; kept for ABI compatibility (the hash box proves a verified escrow)" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Withdraws your assets from a cancelled swap if they're escrowed", "events": [], "recommendations": {} }, { "name": "cleanupParticipant", "args": [{ "type": "uint64", "name": "id", "desc": "the id of the offer" }, { "type": "address", "name": "participant", "desc": "the participant address to clean up" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Cleans up participant box and refunds MBR\nCan only be called when offer is completed, cancelled+completed, or expired", "events": [], "recommendations": {} }, { "name": "cleanupOffer", "args": [{ "type": "uint64", "name": "id", "desc": "the id of the offer" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Cleans up the offer box after all participants have been cleaned up\nCan only be called when offer is completed, cancelled+completed, or expired", "events": [], "recommendations": {} }, { "name": "offerTerms", "args": [{ "type": "uint64", "name": "id" }], "returns": { "type": "byte[32]" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "The terms commitment `accept` expects for an offer. Clients should compute it independently.", "events": [], "recommendations": {} }, { "name": "optIn", "args": [{ "type": "pay", "name": "payment", "desc": "The payment transaction" }, { "type": "uint64", "name": "asset", "desc": "The asset to be opted into" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "optin tells the contract to opt into an asa", "events": [], "recommendations": {} }, { "name": "update", "args": [{ "type": "string", "name": "newVersion" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["UpdateApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "mbr", "args": [], "returns": { "type": "(uint64,uint64,uint64,(uint64,uint64))", "struct": "HyperSwapMBRData" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "Shared storage costs for HyperSwap and its plugin using the current Meta layout.", "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 2, "bytes": 1 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "offerCursor": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "b2ZmZXJfY3Vyc29y", "desc": "global counter for offers" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" } }, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": { "offers": { "keyType": "uint64", "valueType": "OfferValue", "desc": "map of hyper swap offers", "prefix": "bw==" }, "participants": { "keyType": "ParticipantKey", "valueType": "RefundValue", "desc": "map of the participants in each swap", "prefix": "cA==" }, "hashes": { "keyType": "HashKey", "valueType": "RefundValue", "desc": "map of merkle tree hashes during escrow & disbursal phases", "prefix": "aA==" }, "offerRefunds": { "keyType": "uint64", "valueType": "RefundValue", "desc": "Original offer/root deposit, refunded after their storage is deleted.", "prefix": "Zg==" }, "offerRegistry": { "keyType": "uint64", "valueType": "uint64", "desc": "Meta registry that holds the offer's roots, pinned at creation. Later DAO registry changes\ncannot strand an offer's proofs or root deposits.", "prefix": "cg==" } } } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [1005, 1258, 1592, 2063, 2270, 2348, 2492, 2602, 2678, 2788, 2803, 3143, 3222, 3314, 3377], "errorMessage": "Box must have value" }, { "pc": [3272, 3582], "errorMessage": "Bytes has valid prefix" }, { "pc": [601], "errorMessage": "ERR:errBrot" }, { "pc": [1379, 1719], "errorMessage": "ERR:errCvlf" }, { "pc": [1113], "errorMessage": "ERR:errEacc" }, { "pc": [658, 674, 1141, 1155, 1438, 1455, 1755, 1769], "errorMessage": "ERR:errIpay" }, { "pc": [2999], "errorMessage": "ERR:errIpma" }, { "pc": [2975], "errorMessage": "ERR:errIpmr" }, { "pc": [1396, 1783], "errorMessage": "ERR:errIpms" }, { "pc": [1039, 1291, 1625, 2135, 2291, 2571, 2757, 3334], "errorMessage": "ERR:errIste" }, { "pc": [3090], "errorMessage": "ERR:errIupg" }, { "pc": [3702], "errorMessage": "ERR:errIwlt" }, { "pc": [1846, 1859, 1871], "errorMessage": "ERR:errIxfr" }, { "pc": [1361, 1701], "errorMessage": "ERR:errLaes" }, { "pc": [2345, 3374], "errorMessage": "ERR:errLnes" }, { "pc": [2174], "errorMessage": "ERR:errNacp" }, { "pc": [1410, 1820], "errorMessage": "ERR:errNcls" }, { "pc": [1807], "errorMessage": "ERR:errNclw" }, { "pc": [3058, 3126], "errorMessage": "ERR:errNdao" }, { "pc": [975, 1254, 1588, 2060, 2267, 2488, 2675, 2921, 3310], "errorMessage": "ERR:errNofr" }, { "pc": [2599], "errorMessage": "ERR:errNpfd" }, { "pc": [1073, 1327, 1662], "errorMessage": "ERR:errNprt" }, { "pc": [1424, 1833], "errorMessage": "ERR:errNrky" }, { "pc": [2311], "errorMessage": "ERR:errNtwd" }, { "pc": [612, 1051, 1301, 1635], "errorMessage": "ERR:errOfex" }, { "pc": [640], "errorMessage": "ERR:errOtlg" }, { "pc": [2776], "errorMessage": "ERR:errPncl" }, { "pc": [3471, 3509, 3596], "errorMessage": "ERR:errRnoi" }, { "pc": [3497], "errorMessage": "ERR:errRwmm" }, { "pc": [1001], "errorMessage": "ERR:errTmis" }, { "pc": [717, 781, 3050, 3118, 3476], "errorMessage": "application exists" }, { "pc": [679, 690, 3043, 3062, 3111, 3513, 3600], "errorMessage": "check GlobalState exists" }, { "pc": [3632], "errorMessage": "errAamm" }, { "pc": [1127, 1174, 1472, 1481, 1891, 1900, 2182, 2189, 2410, 2414, 2421, 2625, 3441, 3450], "errorMessage": "index out of bounds" }, { "pc": [483, 939, 1228, 1560, 2036, 2241, 3026, 3620, 3627], "errorMessage": "invalid array length header" }, { "pc": [491, 3034], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [948, 1237, 1569, 2045, 2250], "errorMessage": "invalid number of bytes for arc4.dynamic_array<bytes[32]>" }, { "pc": [538, 560, 958, 1208, 1529, 1928, 1977, 1994, 2215, 2471], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [502, 546, 568, 579, 928, 1194, 1216, 1515, 1537, 1548, 1910, 1919, 1936, 1945, 1968, 1985, 2002, 2011, 2029, 2204, 2223, 2233, 2460, 2659, 2906, 2950, 3104], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [3277, 3587], "errorMessage": "invalid number of bytes for bool" }, { "pc": [1507], "errorMessage": "transaction type is axfer" }, { "pc": [527, 920, 1186, 1496, 2942], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDggMzIgMzQ5MDAgMzUzMDAKICAgIGJ5dGVjYmxvY2sgIm8iICJwIiAiRVJSOmVyck5vZnIiICJha2l0YV9kYW8iICJFUlI6ZXJySXBheSIgIkVSUjplcnJJc3RlIiAweDE0IDB4MGEgIkVSUjplcnJPZmV4IiAiaCIgMHgxZSAweDNjIDB4MDAwMCAib2ZmZXJfY3Vyc29yIiAiciIgInQiICJFUlI6ZXJyTnBydCIgIkVSUjplcnJJeGZyIiAweDI4IDB4MTUxZjdjNzUgInBhbCIgIkVSUjplcnJSbm9pIiAidmVyc2lvbiIgMHhhMjRjMDY3YyAiRVJSOmVyckxhZXMiICJFUlI6ZXJyQ3ZsZiIgIkVSUjplcnJJcG1zIiAiRVJSOmVyck5jbHMiICJFUlI6ZXJyTnJreSIgIkVSUjplcnJMbmVzIiAweGRmMjg3YTdkICJ3YWxsZXQiICJFUlI6ZXJyTmRhbyIgMHgwMDAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU2CiAgICAvLyBleHBvcnQgY2xhc3MgSHlwZXJTd2FwIGV4dGVuZHMgY2xhc3NlcyhCYXNlSHlwZXJTd2FwLCBVcGdyYWRlYWJsZUFraXRhQmFzZUNvbnRyYWN0LCBDb250cmFjdFdpdGhPcHRJbikgewogICAgcHVzaGJ5dGVzIDB4ZWE5MTgwZGQgLy8gbWV0aG9kICJ1cGRhdGUoc3RyaW5nKXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBtYWluX3VwZGF0ZV9yb3V0ZUA0CgptYWluX3N3aXRjaF9jYXNlX25leHRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTYKICAgIC8vIGV4cG9ydCBjbGFzcyBIeXBlclN3YXAgZXh0ZW5kcyBjbGFzc2VzKEJhc2VIeXBlclN3YXAsIFVwZ3JhZGVhYmxlQWtpdGFCYXNlQ29udHJhY3QsIENvbnRyYWN0V2l0aE9wdEluKSB7CiAgICB0eG4gT25Db21wbGV0aW9uCiAgICAhCiAgICBhc3NlcnQKICAgIHR4biBBcHBsaWNhdGlvbklECiAgICBieiBtYWluX2NyZWF0ZV9Ob09wQDIzCiAgICBwdXNoYnl0ZXNzIDB4MGRiM2E0NGIgMHg3YmRhODFjOSAweGQ4NWZlYmRkIDB4NDY2Zjg3MWEgMHg1NjZhNjJiMiAweDI3MzM2YmEwIDB4MGM3YWI0MmUgMHgwNjMxODY4YiAweDY4M2JiNjc4IDB4ZDNlZTA0ZjAgMHgwMGQ3MDFkNSAweDM5NGVhZWIyIDB4MzNlOTJjOTQgMHg4NTRkZWRlMCAweDg0MDczM2RkIC8vIG1ldGhvZCAib2ZmZXIocGF5LGJ5dGVbMzJdLHVpbnQ2NCxieXRlWzMyXSx1aW50NjQsdWludDY0KXZvaWQiLCBtZXRob2QgImFjY2VwdChwYXksdWludDY0LGJ5dGVbMzJdW10sYnl0ZVszMl0pdm9pZCIsIG1ldGhvZCAiZXNjcm93KHBheSx1aW50NjQsYWRkcmVzcyx1aW50NjQsYnl0ZVszMl1bXSl2b2lkIiwgbWV0aG9kICJlc2Nyb3dBc2EocGF5LGF4ZmVyLHVpbnQ2NCxhZGRyZXNzLHVpbnQ2NCx1aW50NjQsYnl0ZVszMl1bXSl2b2lkIiwgbWV0aG9kICJkaXNidXJzZSh1aW50NjQsdWludDY0LGFkZHJlc3MsdWludDY0LHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJkaXNidXJzZUZyb20odWludDY0LGFkZHJlc3MsdWludDY0LGFkZHJlc3MsdWludDY0LHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJjYW5jZWwodWludDY0LGJ5dGVbMzJdW10pdm9pZCIsIG1ldGhvZCAid2l0aGRyYXcodWludDY0LGFkZHJlc3MsdWludDY0LHVpbnQ2NCxieXRlWzMyXVtdKXZvaWQiLCBtZXRob2QgImNsZWFudXBQYXJ0aWNpcGFudCh1aW50NjQsYWRkcmVzcyl2b2lkIiwgbWV0aG9kICJjbGVhbnVwT2ZmZXIodWludDY0KXZvaWQiLCBtZXRob2QgIm9mZmVyVGVybXModWludDY0KWJ5dGVbMzJdIiwgbWV0aG9kICJvcHRJbihwYXksdWludDY0KXZvaWQiLCBtZXRob2QgInVwZGF0ZUFraXRhREFPKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJvcFVwKCl2b2lkIiwgbWV0aG9kICJtYnIoKSh1aW50NjQsdWludDY0LHVpbnQ2NCwodWludDY0LHVpbnQ2NCkpIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggb2ZmZXIgYWNjZXB0IGVzY3JvdyBlc2Nyb3dBc2EgZGlzYnVyc2UgZGlzYnVyc2VGcm9tIGNhbmNlbCB3aXRoZHJhdyBjbGVhbnVwUGFydGljaXBhbnQgY2xlYW51cE9mZmVyIG9mZmVyVGVybXMgb3B0SW4gdXBkYXRlQWtpdGFEQU8gbWFpbl9vcFVwX3JvdXRlQDIwIG1haW5fbWJyX3JvdXRlQDIxCiAgICBlcnIKCm1haW5fbWJyX3JvdXRlQDIxOgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvYmFzZS50czo3CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHB1c2hieXRlcyAweDE1MWY3Yzc1MDAwMDAwMDAwMDAxMzY4YzAwMDAwMDAwMDAwMDg4NTQwMDAwMDAwMDAwMDA4ODU0MDAwMDAwMDAwMDAwODllNDAwMDAwMDAwMDAwMDAwMDAKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKbWFpbl9vcFVwX3JvdXRlQDIwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjMwCiAgICAvLyBvcFVwKCk6IHZvaWQgeyB9CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgptYWluX2NyZWF0ZV9Ob09wQDIzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1NgogICAgLy8gZXhwb3J0IGNsYXNzIEh5cGVyU3dhcCBleHRlbmRzIGNsYXNzZXMoQmFzZUh5cGVyU3dhcCwgVXBncmFkZWFibGVBa2l0YUJhc2VDb250cmFjdCwgQ29udHJhY3RXaXRoT3B0SW4pIHsKICAgIHB1c2hieXRlcyAweGNkOWFkNjdlIC8vIG1ldGhvZCAiY3JlYXRlKHN0cmluZyx1aW50NjQpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIGNyZWF0ZQogICAgZXJyCgptYWluX3VwZGF0ZV9yb3V0ZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM1CiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiBbJ1VwZGF0ZUFwcGxpY2F0aW9uJ10gfSkKICAgIHR4biBPbkNvbXBsZXRpb24KICAgIHB1c2hpbnQgNCAvLyBVcGRhdGVBcHBsaWNhdGlvbgogICAgPT0KICAgIHR4biBBcHBsaWNhdGlvbklECiAgICAmJgogICAgYXNzZXJ0CiAgICBiIHVwZGF0ZQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Okh5cGVyU3dhcC5jcmVhdGVbcm91dGluZ10oKSAtPiB2b2lkOgpjcmVhdGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjIyMAogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE0CiAgICAvLyB2ZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogR2xvYmFsU3RhdGVLZXlWZXJzaW9uIH0pCiAgICBieXRlYyAyMiAvLyAidmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjIyCiAgICAvLyB0aGlzLnZlcnNpb24udmFsdWUgPSB2ZXJzaW9uCiAgICB1bmNvdmVyIDIKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18zIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjIyMwogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSA9IGFraXRhREFPCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2MQogICAgLy8gb2ZmZXJDdXJzb3IgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBIeXBlclN3YXBHbG9iYWxTdGF0ZUtleU9mZmVyQ3Vyc29yIH0pCiAgICBieXRlYyAxMyAvLyAib2ZmZXJfY3Vyc29yIgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyMjQKICAgIC8vIHRoaXMub2ZmZXJDdXJzb3IudmFsdWUgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjIwCiAgICAvLyBAYWJpbWV0aG9kKHsgb25DcmVhdGU6ICdyZXF1aXJlJyB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Okh5cGVyU3dhcC5vZmZlcltyb3V0aW5nXSgpIC0+IHZvaWQ6Cm9mZmVyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyMzgtMjQ1CiAgICAvLyBvZmZlcigKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICByb290OiBieXRlczwzMj4sCiAgICAvLyAgIGxlYXZlczogdWludDY0LAogICAgLy8gICBwYXJ0aWNpcGFudHNSb290OiBieXRlczwzMj4sCiAgICAvLyAgIHBhcnRpY2lwYW50c0xlYXZlczogdWludDY0LAogICAgLy8gICBleHBpcmF0aW9uOiB1aW50NjQKICAgIC8vICkgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgMwogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBjb3ZlciAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDQKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDUKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjQ2CiAgICAvLyBsb2dnZWRBc3NlcnQocm9vdCAhPT0gcGFydGljaXBhbnRzUm9vdCwgZXJyQmFkUm9vdHMpCiAgICAhPQogICAgYm56IG9mZmVyX2FmdGVyX2Fzc2VydEAzCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJCcm90IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckJyb3QKCm9mZmVyX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyNDcKICAgIC8vIGxvZ2dlZEFzc2VydChleHBpcmF0aW9uID4gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwgZXJyT2ZmZXJFeHBpcmVkKQogICAgZHVwCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICA+CiAgICBibnogb2ZmZXJfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjIDggLy8gIkVSUjplcnJPZmV4IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck9mZXgKCm9mZmVyX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyNDkKICAgIC8vIGxvZ2dlZEFzc2VydChleHBpcmF0aW9uIC0gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA8PSBNYXhPZmZlckR1cmF0aW9uLCBlcnJPZmZlclRvb0xvbmcpCiAgICBkdXAKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIC0KICAgIHB1c2hpbnQgMjU5MjAwMAogICAgPD0KICAgIGJueiBvZmZlcl9hZnRlcl9hc3NlcnRANwogICAgcHVzaGJ5dGVzICJFUlI6ZXJyT3RsZyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJPdGxnCgpvZmZlcl9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjU0CiAgICAvLyBjb25zdCBwYXlvciA9IHBheW1lbnQuc2VuZGVyCiAgICBkaWcgMgogICAgZHVwCiAgICBndHhucyBTZW5kZXIKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjU2CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRQYXltZW50KQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IG9mZmVyX2FmdGVyX2Fzc2VydEA5CiAgICBieXRlYyA0IC8vICJFUlI6ZXJySXBheSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcGF5CgpvZmZlcl9hZnRlcl9hc3NlcnRAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjU3CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IGh5cGVyU3dhcE9mZmVyTUJSQW1vdW50LCBlcnJJbnZhbGlkUGF5bWVudCkKICAgIHVuY292ZXIgMwogICAgZ3R4bnMgQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI1MwogICAgLy8gY29uc3QgaHlwZXJTd2FwT2ZmZXJNQlJBbW91bnQ6IHVpbnQ2NCA9IGNvc3RzLm9mZmVycyArIGNvc3RzLnBhcnRpY2lwYW50cyArIChtZXRhTWVya2xlc0Nvc3QgKiAyKQogICAgcHVzaGludCAxODUwMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjU3CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IGh5cGVyU3dhcE9mZmVyTUJSQW1vdW50LCBlcnJJbnZhbGlkUGF5bWVudCkKICAgID09CiAgICBibnogb2ZmZXJfYWZ0ZXJfYXNzZXJ0QDExCiAgICBieXRlYyA0IC8vICJFUlI6ZXJySXBheSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcGF5CgpvZmZlcl9hZnRlcl9hc3NlcnRAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjg5CiAgICAvLyBjb25zdCBpZCA9IHRoaXMub2ZmZXJDdXJzb3IudmFsdWUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjYxCiAgICAvLyBvZmZlckN1cnNvciA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEh5cGVyU3dhcEdsb2JhbFN0YXRlS2V5T2ZmZXJDdXJzb3IgfSkKICAgIGJ5dGVjIDEzIC8vICJvZmZlcl9jdXJzb3IiCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjg5CiAgICAvLyBjb25zdCBpZCA9IHRoaXMub2ZmZXJDdXJzb3IudmFsdWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjkwCiAgICAvLyB0aGlzLm9mZmVyQ3Vyc29yLnZhbHVlICs9IDEKICAgIGR1cAogICAgaW50Y18xIC8vIDEKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjEKICAgIC8vIG9mZmVyQ3Vyc29yID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogSHlwZXJTd2FwR2xvYmFsU3RhdGVLZXlPZmZlckN1cnNvciB9KQogICAgYnl0ZWMgMTMgLy8gIm9mZmVyX2N1cnNvciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6OTAKICAgIC8vIHRoaXMub2ZmZXJDdXJzb3IudmFsdWUgKz0gMQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjYwCiAgICAvLyBjb25zdCBtZXRhTWVya2xlc0FwcElEID0gZ2V0QWtpdGFBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLm1ldGFNZXJrbGVzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMyAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyNjAKICAgIC8vIGNvbnN0IG1ldGFNZXJrbGVzQXBwSUQgPSBnZXRBa2l0YUFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkubWV0YU1lcmtsZXMKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjExMgogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgcHVzaGJ5dGVzICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI2MAogICAgLy8gY29uc3QgbWV0YU1lcmtsZXNBcHBJRCA9IGdldEFraXRhQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5tZXRhTWVya2xlcwogICAgcHVzaGludCA3MgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjYxCiAgICAvLyB0aGlzLm9mZmVyUmVnaXN0cnkoaWQpLnZhbHVlID0gbWV0YU1lcmtsZXNBcHBJRAogICAgc3dhcAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo3OQogICAgLy8gb2ZmZXJSZWdpc3RyeSA9IEJveE1hcDx1aW50NjQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IEh5cGVyU3dhcEJveFByZWZpeE9mZmVyUmVnaXN0cnkgfSkKICAgIGJ5dGVjIDE0IC8vICJyIgogICAgZGlnIDEKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyNjEKICAgIC8vIHRoaXMub2ZmZXJSZWdpc3RyeShpZCkudmFsdWUgPSBtZXRhTWVya2xlc0FwcElECiAgICBkaWcgMgogICAgaXRvYgogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyNjMtMjc0CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBNZXRhLnByb3RvdHlwZS5hZGRSb290Pih7CiAgICAvLyAgIGFwcElkOiBtZXRhTWVya2xlc0FwcElELAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihtZXRhTWVya2xlc0FwcElEKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtZXRhTWVya2xlc0Nvc3QsCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdGhpcy5yb290TmFtZShpZCwgZmFsc2UpLAogICAgLy8gICAgIHJvb3QsCiAgICAvLyAgICAgTWVya2xlVHJlZVR5cGVUcmFkZQogICAgLy8gICBdLAogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjY3CiAgICAvLyByZWNlaXZlcjogQXBwbGljYXRpb24obWV0YU1lcmtsZXNBcHBJRCkuYWRkcmVzcywKICAgIGRpZyAxCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI1MgogICAgLy8gY29uc3QgbWV0YU1lcmtsZXNDb3N0OiB1aW50NjQgPSBjb3N0cy5tbS5yb290ICsgY29zdHMubW0uZGF0YQogICAgaW50YyA1IC8vIDM1MzAwCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyNjYtMjY5CiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogQXBwbGljYXRpb24obWV0YU1lcmtsZXNBcHBJRCkuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiBtZXRhTWVya2xlc0Nvc3QsCiAgICAvLyB9KSwKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjYzLTI3NAogICAgLy8gYWJpQ2FsbDx0eXBlb2YgTWV0YS5wcm90b3R5cGUuYWRkUm9vdD4oewogICAgLy8gICBhcHBJZDogbWV0YU1lcmtsZXNBcHBJRCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24obWV0YU1lcmtsZXNBcHBJRCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWV0YU1lcmtsZXNDb3N0LAogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHRoaXMucm9vdE5hbWUoaWQsIGZhbHNlKSwKICAgIC8vICAgICByb290LAogICAgLy8gICAgIE1lcmtsZVRyZWVUeXBlVHJhZGUKICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6ODUKICAgIC8vIHJldHVybiBTdHJpbmcoKHBhcnRpY2lwYW50cyA/IEJ5dGVzKCdwJykgOiBCeXRlcygndCcpKS5jb25jYXQoaXRvYihpZCkpKQogICAgYnl0ZWMgMTUgLy8gInQiCiAgICBkaWcgMQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI3MAogICAgLy8gdGhpcy5yb290TmFtZShpZCwgZmFsc2UpLAogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjcyCiAgICAvLyBNZXJrbGVUcmVlVHlwZVRyYWRlCiAgICBwdXNoaW50IDMKICAgIGl0b2IKICAgIGRpZyAzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjYzLTI3NAogICAgLy8gYWJpQ2FsbDx0eXBlb2YgTWV0YS5wcm90b3R5cGUuYWRkUm9vdD4oewogICAgLy8gICBhcHBJZDogbWV0YU1lcmtsZXNBcHBJRCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24obWV0YU1lcmtsZXNBcHBJRCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWV0YU1lcmtsZXNDb3N0LAogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHRoaXMucm9vdE5hbWUoaWQsIGZhbHNlKSwKICAgIC8vICAgICByb290LAogICAgLy8gICAgIE1lcmtsZVRyZWVUeXBlVHJhZGUKICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBieXRlYyAyMyAvLyBtZXRob2QgImFkZFJvb3QocGF5LHN0cmluZyxieXRlWzMyXSx1aW50NjQpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciA3CiAgICBkdXAKICAgIGNvdmVyIDQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkdXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyNzctMjg4CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBNZXRhLnByb3RvdHlwZS5hZGRSb290Pih7CiAgICAvLyAgIGFwcElkOiBtZXRhTWVya2xlc0FwcElELAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihtZXRhTWVya2xlc0FwcElEKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtZXRhTWVya2xlc0Nvc3QsCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdGhpcy5yb290TmFtZShpZCwgdHJ1ZSksCiAgICAvLyAgICAgcGFydGljaXBhbnRzUm9vdCwKICAgIC8vICAgICBNZXJrbGVUcmVlVHlwZVRyYWRlCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyODEKICAgIC8vIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihtZXRhTWVya2xlc0FwcElEKS5hZGRyZXNzLAogICAgZGlnIDIKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjUyCiAgICAvLyBjb25zdCBtZXRhTWVya2xlc0Nvc3Q6IHVpbnQ2NCA9IGNvc3RzLm1tLnJvb3QgKyBjb3N0cy5tbS5kYXRhCiAgICBpbnRjIDUgLy8gMzUzMDAKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI4MC0yODMKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihtZXRhTWVya2xlc0FwcElEKS5hZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IG1ldGFNZXJrbGVzQ29zdCwKICAgIC8vIH0pLAogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyNzctMjg4CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBNZXRhLnByb3RvdHlwZS5hZGRSb290Pih7CiAgICAvLyAgIGFwcElkOiBtZXRhTWVya2xlc0FwcElELAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihtZXRhTWVya2xlc0FwcElEKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtZXRhTWVya2xlc0Nvc3QsCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdGhpcy5yb290TmFtZShpZCwgdHJ1ZSksCiAgICAvLyAgICAgcGFydGljaXBhbnRzUm9vdCwKICAgIC8vICAgICBNZXJrbGVUcmVlVHlwZVRyYWRlCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjg1CiAgICAvLyByZXR1cm4gU3RyaW5nKChwYXJ0aWNpcGFudHMgPyBCeXRlcygncCcpIDogQnl0ZXMoJ3QnKSkuY29uY2F0KGl0b2IoaWQpKSkKICAgIGJ5dGVjXzEgLy8gInAiCiAgICBkaWcgMgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI4NAogICAgLy8gdGhpcy5yb290TmFtZShpZCwgdHJ1ZSksCiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgdW5jb3ZlciAzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Mjc3LTI4OAogICAgLy8gYWJpQ2FsbDx0eXBlb2YgTWV0YS5wcm90b3R5cGUuYWRkUm9vdD4oewogICAgLy8gICBhcHBJZDogbWV0YU1lcmtsZXNBcHBJRCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24obWV0YU1lcmtsZXNBcHBJRCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWV0YU1lcmtsZXNDb3N0LAogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHRoaXMucm9vdE5hbWUoaWQsIHRydWUpLAogICAgLy8gICAgIHBhcnRpY2lwYW50c1Jvb3QsCiAgICAvLyAgICAgTWVya2xlVHJlZVR5cGVUcmFkZQogICAgLy8gICBdLAogICAgLy8gfSkKICAgIGJ5dGVjIDIzIC8vIG1ldGhvZCAiYWRkUm9vdChwYXksc3RyaW5nLGJ5dGVbMzJdLHVpbnQ2NCl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDUKICAgIGR1cAogICAgY292ZXIgMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyNTMKICAgIC8vIGNvbnN0IGh5cGVyU3dhcE9mZmVyTUJSQW1vdW50OiB1aW50NjQgPSBjb3N0cy5vZmZlcnMgKyBjb3N0cy5wYXJ0aWNpcGFudHMgKyAobWV0YU1lcmtsZXNDb3N0ICogMikKICAgIGludGMgNCAvLyAzNDkwMAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyOTEKICAgIC8vIHRoaXMucGFydGljaXBhbnRzKHsgaWQsIGFkZHJlc3M6IFR4bi5zZW5kZXIgfSkudmFsdWUgPSB7IHBheW9yLCBhbW91bnQ6IGNvc3RzLnBhcnRpY2lwYW50cyB9CiAgICBpdG9iCiAgICB1bmNvdmVyIDQKICAgIGR1cAogICAgY292ZXIgMgogICAgY29uY2F0CiAgICBkaWcgMgogICAgdHhuIFNlbmRlcgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjY4CiAgICAvLyBwYXJ0aWNpcGFudHMgPSBCb3hNYXA8UGFydGljaXBhbnRLZXksIFJlZnVuZFZhbHVlPih7IGtleVByZWZpeDogSHlwZXJTd2FwQm94UHJlZml4UGFydGljaXBhbnRzIH0pCiAgICBieXRlY18xIC8vICJwIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI5MQogICAgLy8gdGhpcy5wYXJ0aWNpcGFudHMoeyBpZCwgYWRkcmVzczogVHhuLnNlbmRlciB9KS52YWx1ZSA9IHsgcGF5b3IsIGFtb3VudDogY29zdHMucGFydGljaXBhbnRzIH0KICAgIHN3YXAKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjkyCiAgICAvLyB0aGlzLm9mZmVyUmVmdW5kcyhpZCkudmFsdWUgPSB7IHBheW9yLCBhbW91bnQ6IGNvc3RzLm9mZmVycyArIChtZXRhTWVya2xlc0Nvc3QgKiAyKSB9CiAgICBwdXNoaW50IDE1MDEwMAogICAgaXRvYgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjczCiAgICAvLyBvZmZlclJlZnVuZHMgPSBCb3hNYXA8dWludDY0LCBSZWZ1bmRWYWx1ZT4oeyBrZXlQcmVmaXg6IEh5cGVyU3dhcEJveFByZWZpeE9mZmVyUmVmdW5kcyB9KQogICAgcHVzaGJ5dGVzICJmIgogICAgZGlnIDIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyOTIKICAgIC8vIHRoaXMub2ZmZXJSZWZ1bmRzKGlkKS52YWx1ZSA9IHsgcGF5b3IsIGFtb3VudDogY29zdHMub2ZmZXJzICsgKG1ldGFNZXJrbGVzQ29zdCAqIDIpIH0KICAgIHN3YXAKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Mjk2CiAgICAvLyBzdGF0ZTogcGFydGljaXBhbnRzTGVhdmVzID09PSAxID8gU1RBVEVfRVNDUk9XSU5HIDogU1RBVEVfT0ZGRVJFRCwKICAgIHVuY292ZXIgNAogICAgZHVwCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGJ5dGVjIDcgLy8gMHgwYQogICAgYnl0ZWMgNiAvLyAweDE0CiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyOTUtMzA0CiAgICAvLyB0aGlzLm9mZmVycyhpZCkudmFsdWUgPSB7CiAgICAvLyAgIHN0YXRlOiBwYXJ0aWNpcGFudHNMZWF2ZXMgPT09IDEgPyBTVEFURV9FU0NST1dJTkcgOiBTVEFURV9PRkZFUkVELAogICAgLy8gICByb290LAogICAgLy8gICBsZWF2ZXMsCiAgICAvLyAgIGVzY3Jvd2VkOiAwLAogICAgLy8gICBwYXJ0aWNpcGFudHNSb290LAogICAgLy8gICBwYXJ0aWNpcGFudHNMZWF2ZXMsCiAgICAvLyAgIGFjY2VwdGFuY2VzOiAxLAogICAgLy8gICBleHBpcmF0aW9uLAogICAgLy8gfQogICAgdW5jb3ZlciA0CiAgICBjb25jYXQKICAgIHVuY292ZXIgNQogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI5OQogICAgLy8gZXNjcm93ZWQ6IDAsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyOTUtMzA0CiAgICAvLyB0aGlzLm9mZmVycyhpZCkudmFsdWUgPSB7CiAgICAvLyAgIHN0YXRlOiBwYXJ0aWNpcGFudHNMZWF2ZXMgPT09IDEgPyBTVEFURV9FU0NST1dJTkcgOiBTVEFURV9PRkZFUkVELAogICAgLy8gICByb290LAogICAgLy8gICBsZWF2ZXMsCiAgICAvLyAgIGVzY3Jvd2VkOiAwLAogICAgLy8gICBwYXJ0aWNpcGFudHNSb290LAogICAgLy8gICBwYXJ0aWNpcGFudHNMZWF2ZXMsCiAgICAvLyAgIGFjY2VwdGFuY2VzOiAxLAogICAgLy8gICBleHBpcmF0aW9uLAogICAgLy8gfQogICAgaXRvYgogICAgY29uY2F0CiAgICB1bmNvdmVyIDMKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjMwMgogICAgLy8gYWNjZXB0YW5jZXM6IDEsCiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyOTUtMzA0CiAgICAvLyB0aGlzLm9mZmVycyhpZCkudmFsdWUgPSB7CiAgICAvLyAgIHN0YXRlOiBwYXJ0aWNpcGFudHNMZWF2ZXMgPT09IDEgPyBTVEFURV9FU0NST1dJTkcgOiBTVEFURV9PRkZFUkVELAogICAgLy8gICByb290LAogICAgLy8gICBsZWF2ZXMsCiAgICAvLyAgIGVzY3Jvd2VkOiAwLAogICAgLy8gICBwYXJ0aWNpcGFudHNSb290LAogICAgLy8gICBwYXJ0aWNpcGFudHNMZWF2ZXMsCiAgICAvLyAgIGFjY2VwdGFuY2VzOiAxLAogICAgLy8gICBleHBpcmF0aW9uLAogICAgLy8gfQogICAgaXRvYgogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2NgogICAgLy8gb2ZmZXJzID0gQm94TWFwPHVpbnQ2NCwgT2ZmZXJWYWx1ZT4oeyBrZXlQcmVmaXg6IEh5cGVyU3dhcEJveFByZWZpeE9mZmVycyB9KQogICAgYnl0ZWNfMCAvLyAibyIKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI5NS0zMDQKICAgIC8vIHRoaXMub2ZmZXJzKGlkKS52YWx1ZSA9IHsKICAgIC8vICAgc3RhdGU6IHBhcnRpY2lwYW50c0xlYXZlcyA9PT0gMSA/IFNUQVRFX0VTQ1JPV0lORyA6IFNUQVRFX09GRkVSRUQsCiAgICAvLyAgIHJvb3QsCiAgICAvLyAgIGxlYXZlcywKICAgIC8vICAgZXNjcm93ZWQ6IDAsCiAgICAvLyAgIHBhcnRpY2lwYW50c1Jvb3QsCiAgICAvLyAgIHBhcnRpY2lwYW50c0xlYXZlcywKICAgIC8vICAgYWNjZXB0YW5jZXM6IDEsCiAgICAvLyAgIGV4cGlyYXRpb24sCiAgICAvLyB9CiAgICBzd2FwCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjIzOC0yNDUKICAgIC8vIG9mZmVyKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIHJvb3Q6IGJ5dGVzPDMyPiwKICAgIC8vICAgbGVhdmVzOiB1aW50NjQsCiAgICAvLyAgIHBhcnRpY2lwYW50c1Jvb3Q6IGJ5dGVzPDMyPiwKICAgIC8vICAgcGFydGljaXBhbnRzTGVhdmVzOiB1aW50NjQsCiAgICAvLyAgIGV4cGlyYXRpb246IHVpbnQ2NAogICAgLy8gKSB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo6SHlwZXJTd2FwLmFjY2VwdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmFjY2VwdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzE1CiAgICAvLyBhY2NlcHQobWJyUGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBpZDogdWludDY0LCBwcm9vZjogUHJvb2YsIHRlcm1zOiBieXRlczwzMj4pIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGNvdmVyIDQKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAzMgogICAgKgogICAgcHVzaGludCAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxieXRlc1szMl0+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzE3CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5vZmZlcnMoaWQpLmV4aXN0cywgZXJyT2ZmZXJOb3RGb3VuZCkKICAgIGl0b2IKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2NgogICAgLy8gb2ZmZXJzID0gQm94TWFwPHVpbnQ2NCwgT2ZmZXJWYWx1ZT4oeyBrZXlQcmVmaXg6IEh5cGVyU3dhcEJveFByZWZpeE9mZmVycyB9KQogICAgYnl0ZWNfMCAvLyAibyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBjb3ZlciA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjMxNwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMub2ZmZXJzKGlkKS5leGlzdHMsIGVyck9mZmVyTm90Rm91bmQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBhY2NlcHRfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjXzIgLy8gIkVSUjplcnJOb2ZyIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5vZnIKCmFjY2VwdF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzE5CiAgICAvLyBsb2dnZWRBc3NlcnQodGVybXMgPT09IHRoaXMudGVybXMoaWQpLCBlcnJUZXJtc01pc21hdGNoKQogICAgZGlnIDEKICAgIGNhbGxzdWIgdGVybXMKICAgIHVuY292ZXIgMwogICAgPT0KICAgIGJueiBhY2NlcHRfYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOmVyclRtaXMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyVG1pcwoKYWNjZXB0X2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozMjAKICAgIC8vIGNvbnN0IHsgc3RhdGUsIGV4cGlyYXRpb24sIGFjY2VwdGFuY2VzLCBwYXJ0aWNpcGFudHNMZWF2ZXMgfSA9IHRoaXMub2ZmZXJzKGlkKS52YWx1ZQogICAgZGlnIDQKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBkdXAKICAgIGV4dHJhY3QgMCAxCiAgICBkaWcgMQogICAgcHVzaGludCA5NwogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDMKICAgIGRpZyAxCiAgICBwdXNoaW50IDg5CiAgICBleHRyYWN0X3VpbnQ2NAogICAgY292ZXIgMgogICAgc3dhcAogICAgcHVzaGludCA4MQogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzIyCiAgICAvLyBsb2dnZWRBc3NlcnQoc3RhdGUgPT09IFNUQVRFX09GRkVSRUQsIGVyckludmFsaWRTdGF0ZSkKICAgIGJ5dGVjIDcgLy8gMHgwYQogICAgPT0KICAgIGJueiBhY2NlcHRfYWZ0ZXJfYXNzZXJ0QDcKICAgIGJ5dGVjIDUgLy8gIkVSUjplcnJJc3RlIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklzdGUKCmFjY2VwdF9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzIzCiAgICAvLyBsb2dnZWRBc3NlcnQoZXhwaXJhdGlvbiA+IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsIGVyck9mZmVyRXhwaXJlZCkKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIHVuY292ZXIgNAogICAgPAogICAgYm56IGFjY2VwdF9hZnRlcl9hc3NlcnRAOQogICAgYnl0ZWMgOCAvLyAiRVJSOmVyck9mZXgiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyT2ZleAoKYWNjZXB0X2FmdGVyX2Fzc2VydEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozMjUKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnZlcmlmeUxlYWYoaWQsIHRydWUsIHNoYTI1NihzaGEyNTYoVHhuLnNlbmRlci5ieXRlcykpLCBwcm9vZiksIGVyck5vdEFQYXJ0aWNpcGFudCkKICAgIHR4biBTZW5kZXIKICAgIHNoYTI1NgogICAgc2hhMjU2CiAgICB1bmNvdmVyIDQKICAgIGludGNfMSAvLyAxCiAgICB1bmNvdmVyIDIKICAgIHVuY292ZXIgNwogICAgY2FsbHN1YiB2ZXJpZnlMZWFmCiAgICBwb3AKICAgIGJueiBhY2NlcHRfYWZ0ZXJfYXNzZXJ0QDExCiAgICBieXRlYyAxNiAvLyAiRVJSOmVyck5wcnQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTnBydAoKYWNjZXB0X2FmdGVyX2Fzc2VydEAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzI4CiAgICAvLyBjb25zdCBzZW5kZXJQYXJ0aWNpcGFudEtleSA9IHsgaWQsIGFkZHJlc3M6IFR4bi5zZW5kZXIgfQogICAgdHhuIFNlbmRlcgogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzI5CiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMucGFydGljaXBhbnRzKHNlbmRlclBhcnRpY2lwYW50S2V5KS5leGlzdHMsIGVyckFscmVhZHlBY2NlcHRlZCkKICAgIGR1cAogICAgZXh0cmFjdCAwIDgKICAgIHN3YXAKICAgIGV4dHJhY3QgOCAzMgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjY4CiAgICAvLyBwYXJ0aWNpcGFudHMgPSBCb3hNYXA8UGFydGljaXBhbnRLZXksIFJlZnVuZFZhbHVlPih7IGtleVByZWZpeDogSHlwZXJTd2FwQm94UHJlZml4UGFydGljaXBhbnRzIH0pCiAgICBieXRlY18xIC8vICJwIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzI5CiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMucGFydGljaXBhbnRzKHNlbmRlclBhcnRpY2lwYW50S2V5KS5leGlzdHMsIGVyckFscmVhZHlBY2NlcHRlZCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogYWNjZXB0X2FmdGVyX2Fzc2VydEAxMwogICAgcHVzaGJ5dGVzICJFUlI6ZXJyRWFjYyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJFYWNjCgphY2NlcHRfYWZ0ZXJfYXNzZXJ0QDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozMzEKICAgIC8vIGNvbnN0IG5ld0FjY2VwdGFuY2VzOiB1aW50NjQgPSBhY2NlcHRhbmNlcyArIDEKICAgIHN3YXAKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzMyCiAgICAvLyB0aGlzLm9mZmVycyhpZCkudmFsdWUuYWNjZXB0YW5jZXMgPSBuZXdBY2NlcHRhbmNlcwogICAgaXRvYgogICAgZGlnIDUKICAgIHB1c2hpbnQgODkKICAgIHVuY292ZXIgMgogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzM2CiAgICAvLyBsb2dnZWRBc3NlcnQobWJyUGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRQYXltZW50KQogICAgZGlnIDMKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBhY2NlcHRfYWZ0ZXJfYXNzZXJ0QDE1CiAgICBieXRlYyA0IC8vICJFUlI6ZXJySXBheSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcGF5CgphY2NlcHRfYWZ0ZXJfYXNzZXJ0QDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozMzcKICAgIC8vIGxvZ2dlZEFzc2VydChtYnJQYXltZW50LmFtb3VudCA9PT0gY29zdHMucGFydGljaXBhbnRzLCBlcnJJbnZhbGlkUGF5bWVudCkKICAgIGRpZyAzCiAgICBndHhucyBBbW91bnQKICAgIGludGMgNCAvLyAzNDkwMAogICAgPT0KICAgIGJueiBhY2NlcHRfYWZ0ZXJfYXNzZXJ0QDE3CiAgICBieXRlYyA0IC8vICJFUlI6ZXJySXBheSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcGF5CgphY2NlcHRfYWZ0ZXJfYXNzZXJ0QDE3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozNDEKICAgIC8vIHBheW9yOiBtYnJQYXltZW50LnNlbmRlciwKICAgIHVuY292ZXIgMwogICAgZ3R4bnMgU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjMzNwogICAgLy8gbG9nZ2VkQXNzZXJ0KG1iclBheW1lbnQuYW1vdW50ID09PSBjb3N0cy5wYXJ0aWNpcGFudHMsIGVyckludmFsaWRQYXltZW50KQogICAgaW50YyA0IC8vIDM0OTAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjM0MC0zNDMKICAgIC8vIHRoaXMucGFydGljaXBhbnRzKHNlbmRlclBhcnRpY2lwYW50S2V5KS52YWx1ZSA9IHsKICAgIC8vICAgcGF5b3I6IG1iclBheW1lbnQuc2VuZGVyLAogICAgLy8gICBhbW91bnQ6IGNvc3RzLnBhcnRpY2lwYW50cwogICAgLy8gfQogICAgaXRvYgogICAgc3dhcAogICAgY29uY2F0CiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjM0NQogICAgLy8gaWYgKHBhcnRpY2lwYW50c0xlYXZlcyA9PT0gbmV3QWNjZXB0YW5jZXMpIHsKICAgID09CiAgICBieiBhY2NlcHRfYWZ0ZXJfaWZfZWxzZUAxOQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozNDYKICAgIC8vIHRoaXMub2ZmZXJzKGlkKS52YWx1ZS5zdGF0ZSA9IFNUQVRFX0VTQ1JPV0lORwogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgYnl0ZWMgNiAvLyAweDE0CiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwoKYWNjZXB0X2FmdGVyX2lmX2Vsc2VAMTk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjMxNQogICAgLy8gYWNjZXB0KG1iclBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgaWQ6IHVpbnQ2NCwgcHJvb2Y6IFByb29mLCB0ZXJtczogYnl0ZXM8MzI+KSB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo6SHlwZXJTd2FwLmVzY3Jvd1tyb3V0aW5nXSgpIC0+IHZvaWQ6CmVzY3JvdzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzU5CiAgICAvLyBlc2Nyb3cocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBpZDogdWludDY0LCByZWNlaXZlcjogQWNjb3VudCwgYW1vdW50OiB1aW50NjQsIHByb29mOiBQcm9vZikgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgY292ZXIgMwogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgMgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBjb3ZlciA0CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMzIKICAgICoKICAgIHB1c2hpbnQgMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8Ynl0ZXNbMzJdPgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozNjEKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLm9mZmVycyhpZCkuZXhpc3RzLCBlcnJPZmZlck5vdEZvdW5kKQogICAgaXRvYgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjY2CiAgICAvLyBvZmZlcnMgPSBCb3hNYXA8dWludDY0LCBPZmZlclZhbHVlPih7IGtleVByZWZpeDogSHlwZXJTd2FwQm94UHJlZml4T2ZmZXJzIH0pCiAgICBieXRlY18wIC8vICJvIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGNvdmVyIDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzYxCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5vZmZlcnMoaWQpLmV4aXN0cywgZXJyT2ZmZXJOb3RGb3VuZCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGVzY3Jvd19hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWNfMiAvLyAiRVJSOmVyck5vZnIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTm9mcgoKZXNjcm93X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozNjIKICAgIC8vIGNvbnN0IHsgc3RhdGUsIGVzY3Jvd2VkLCBsZWF2ZXMsIGV4cGlyYXRpb24gfSA9IHRoaXMub2ZmZXJzKGlkKS52YWx1ZQogICAgZGlnIDYKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBkdXAKICAgIGV4dHJhY3QgMCAxCiAgICBkaWcgMQogICAgcHVzaGludCA0MQogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDUKICAgIGRpZyAxCiAgICBwdXNoaW50IDMzCiAgICBleHRyYWN0X3VpbnQ2NAogICAgY292ZXIgOAogICAgc3dhcAogICAgcHVzaGludCA5NwogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzY0CiAgICAvLyBsb2dnZWRBc3NlcnQoc3RhdGUgPT09IFNUQVRFX0VTQ1JPV0lORywgZXJySW52YWxpZFN0YXRlKQogICAgYnl0ZWMgNiAvLyAweDE0CiAgICA9PQogICAgYm56IGVzY3Jvd19hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgNSAvLyAiRVJSOmVycklzdGUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXN0ZQoKZXNjcm93X2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozNjYKICAgIC8vIGxvZ2dlZEFzc2VydChleHBpcmF0aW9uID4gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwgZXJyT2ZmZXJFeHBpcmVkKQogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgPgogICAgYm56IGVzY3Jvd19hZnRlcl9hc3NlcnRANwogICAgYnl0ZWMgOCAvLyAiRVJSOmVyck9mZXgiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyT2ZleAoKZXNjcm93X2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozNjgKICAgIC8vIGNvbnN0IHNlbmRlclBhcnRpY2lwYW50S2V5ID0geyBpZCwgYWRkcmVzczogVHhuLnNlbmRlciB9CiAgICBkdXAKICAgIHR4biBTZW5kZXIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozNjkKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnBhcnRpY2lwYW50cyhzZW5kZXJQYXJ0aWNpcGFudEtleSkuZXhpc3RzLCBlcnJOb3RBUGFydGljaXBhbnQpCiAgICBkdXAKICAgIGV4dHJhY3QgMCA4CiAgICBzd2FwCiAgICBleHRyYWN0IDggMzIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2OAogICAgLy8gcGFydGljaXBhbnRzID0gQm94TWFwPFBhcnRpY2lwYW50S2V5LCBSZWZ1bmRWYWx1ZT4oeyBrZXlQcmVmaXg6IEh5cGVyU3dhcEJveFByZWZpeFBhcnRpY2lwYW50cyB9KQogICAgYnl0ZWNfMSAvLyAicCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozNjkKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnBhcnRpY2lwYW50cyhzZW5kZXJQYXJ0aWNpcGFudEtleSkuZXhpc3RzLCBlcnJOb3RBUGFydGljaXBhbnQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBlc2Nyb3dfYWZ0ZXJfYXNzZXJ0QDkKICAgIGJ5dGVjIDE2IC8vICJFUlI6ZXJyTnBydCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOcHJ0Cgplc2Nyb3dfYWZ0ZXJfYXNzZXJ0QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjM3MQogICAgLy8gY29uc3QgaGFzaCA9IHNoYTI1NihzaGEyNTYoQnl0ZXNgJHtUeG4uc2VuZGVyLmJ5dGVzfSR7cmVjZWl2ZXIuYnl0ZXN9JHtpdG9iKDApfSR7aXRvYihhbW91bnQpfWApKQogICAgdHhuIFNlbmRlcgogICAgdW5jb3ZlciA2CiAgICBjb25jYXQKICAgIGludGNfMCAvLyAwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIGRpZyAzCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHNoYTI1NgogICAgc2hhMjU2CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzcyCiAgICAvLyBjb25zdCBoYXNoS2V5OiBIYXNoS2V5ID0geyBpZCwgaGFzaCB9CiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo3MAogICAgLy8gaGFzaGVzID0gQm94TWFwPEhhc2hLZXksIFJlZnVuZFZhbHVlPih7IGtleVByZWZpeDogSHlwZXJTd2FwQm94UHJlZml4SGFzaGVzIH0pCiAgICBieXRlYyA5IC8vICJoIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzczCiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMuaGFzaGVzKGhhc2hLZXkpLmV4aXN0cywgZXJyTGVhZkFscmVhZHlFc2Nyb3dlZCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogZXNjcm93X2FmdGVyX2Fzc2VydEAxMQogICAgYnl0ZWMgMjQgLy8gIkVSUjplcnJMYWVzIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckxhZXMKCmVzY3Jvd19hZnRlcl9hc3NlcnRAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjM3NQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMudmVyaWZ5TGVhZihpZCwgZmFsc2UsIGhhc2gsIHByb29mKSwgZXJyQ2FudFZlcmlmeUxlYWYpCiAgICB1bmNvdmVyIDcKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgNwogICAgY2FsbHN1YiB2ZXJpZnlMZWFmCiAgICBwb3AKICAgIGJueiBlc2Nyb3dfYWZ0ZXJfYXNzZXJ0QDEzCiAgICBieXRlYyAyNSAvLyAiRVJSOmVyckN2bGYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQ3ZsZgoKZXNjcm93X2FmdGVyX2Fzc2VydEAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzgwCiAgICAvLyBhc3NlcnRTYWZlUGF5bWVudChwYXltZW50LCBUeG4uc2VuZGVyKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MgogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5zZW5kZXIgPT09IHNlbmRlciwgZXJySW52YWxpZFBheW1lbnRTZW5kZXIpCiAgICBkaWcgMgogICAgZ3R4bnMgU2VuZGVyCiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgPT0KICAgIGJueiBlc2Nyb3dfYWZ0ZXJfYXNzZXJ0QDIyCiAgICBieXRlYyAyNiAvLyAiRVJSOmVycklwbXMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBtcwoKZXNjcm93X2FmdGVyX2Fzc2VydEAyMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjMKICAgIC8vIGxvZ2dlZEFzc2VydCh0eG4uY2xvc2VSZW1haW5kZXJUbyA9PT0gR2xvYmFsLnplcm9BZGRyZXNzLCBlcnJDbG9zZUZvcmJpZGRlbikKICAgIGRpZyAyCiAgICBndHhucyBDbG9zZVJlbWFpbmRlclRvCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgID09CiAgICBibnogZXNjcm93X2FmdGVyX2Fzc2VydEAyNAogICAgYnl0ZWMgMjcgLy8gIkVSUjplcnJOY2xzIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5jbHMKCmVzY3Jvd19hZnRlcl9hc3NlcnRAMjQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY0CiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLnJla2V5VG8gPT09IEdsb2JhbC56ZXJvQWRkcmVzcywgZXJyUmVrZXlGb3JiaWRkZW4pCiAgICBkaWcgMgogICAgZ3R4bnMgUmVrZXlUbwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYm56IGVzY3Jvd19hZnRlcl9hc3NlcnRAMjYKICAgIGJ5dGVjIDI4IC8vICJFUlI6ZXJyTnJreSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOcmt5Cgplc2Nyb3dfYWZ0ZXJfYXNzZXJ0QDI2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozODEKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJySW52YWxpZFBheW1lbnQpCiAgICBkaWcgMgogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IGVzY3Jvd19hZnRlcl9hc3NlcnRAMTUKICAgIGJ5dGVjIDQgLy8gIkVSUjplcnJJcGF5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwYXkKCmVzY3Jvd19hZnRlcl9hc3NlcnRAMTU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjM4MgogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSBhbW91bnQgKyBjb3N0cy5oYXNoZXMsIGVyckludmFsaWRQYXltZW50KQogICAgdW5jb3ZlciAyCiAgICBndHhucyBBbW91bnQKICAgIHVuY292ZXIgMwogICAgaW50YyA0IC8vIDM0OTAwCiAgICArCiAgICA9PQogICAgYm56IGVzY3Jvd19hZnRlcl9hc3NlcnRAMTcKICAgIGJ5dGVjIDQgLy8gIkVSUjplcnJJcGF5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwYXkKCmVzY3Jvd19hZnRlcl9hc3NlcnRAMTc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjM4MgogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSBhbW91bnQgKyBjb3N0cy5oYXNoZXMsIGVyckludmFsaWRQYXltZW50KQogICAgaW50YyA0IC8vIDM0OTAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjM4NS0zODgKICAgIC8vIHRoaXMuaGFzaGVzKGhhc2hLZXkpLnZhbHVlID0gewogICAgLy8gICBwYXlvcjogcGF5bWVudC5zZW5kZXIsCiAgICAvLyAgIGFtb3VudDogY29zdHMuaGFzaGVzCiAgICAvLyB9CiAgICBpdG9iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzkwCiAgICAvLyBjb25zdCBuZXdFc2Nyb3dlZDogdWludDY0ID0gZXNjcm93ZWQgKyAxCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozOTEKICAgIC8vIHRoaXMub2ZmZXJzKGlkKS52YWx1ZS5lc2Nyb3dlZCA9IG5ld0VzY3Jvd2VkCiAgICBkdXAKICAgIGl0b2IKICAgIGRpZyAzCiAgICBwdXNoaW50IDQxCiAgICB1bmNvdmVyIDIKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjM5NAogICAgLy8gaWYgKGxlYXZlcyA9PT0gbmV3RXNjcm93ZWQpIHsKICAgID09CiAgICBieiBlc2Nyb3dfYWZ0ZXJfaWZfZWxzZUAxOQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozOTUKICAgIC8vIHRoaXMub2ZmZXJzKGlkKS52YWx1ZS5zdGF0ZSA9IFNUQVRFX0RJU0JVUlNJTkcKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGJ5dGVjIDEwIC8vIDB4MWUKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCgplc2Nyb3dfYWZ0ZXJfaWZfZWxzZUAxOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzU5CiAgICAvLyBlc2Nyb3cocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBpZDogdWludDY0LCByZWNlaXZlcjogQWNjb3VudCwgYW1vdW50OiB1aW50NjQsIHByb29mOiBQcm9vZikgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Okh5cGVyU3dhcC5lc2Nyb3dBc2Fbcm91dGluZ10oKSAtPiB2b2lkOgplc2Nyb3dBc2E6CiAgICBwdXNoYnl0ZXMgIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDA5LTQxNwogICAgLy8gZXNjcm93QXNhKAogICAgLy8gICBtYnJQYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICBpZDogdWludDY0LAogICAgLy8gICByZWNlaXZlcjogQWNjb3VudCwKICAgIC8vICAgYXNzZXQ6IHVpbnQ2NCwKICAgIC8vICAgYW1vdW50OiB1aW50NjQsCiAgICAvLyAgIHByb29mOiBQcm9vZgogICAgLy8gKSB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgcHVzaGludCAyCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNCAvLyBheGZlcgogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGF4ZmVyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgY292ZXIgMwogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgMwogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgNAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQogICAgZHVwCiAgICBjb3ZlciA1CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMzIKICAgICoKICAgIHB1c2hpbnQgMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8Ynl0ZXNbMzJdPgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0MTkKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLm9mZmVycyhpZCkuZXhpc3RzLCBlcnJPZmZlck5vdEZvdW5kKQogICAgaXRvYgogICAgZHVwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjY2CiAgICAvLyBvZmZlcnMgPSBCb3hNYXA8dWludDY0LCBPZmZlclZhbHVlPih7IGtleVByZWZpeDogSHlwZXJTd2FwQm94UHJlZml4T2ZmZXJzIH0pCiAgICBieXRlY18wIC8vICJvIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGNvdmVyIDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDE5CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5vZmZlcnMoaWQpLmV4aXN0cywgZXJyT2ZmZXJOb3RGb3VuZCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGVzY3Jvd0FzYV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWNfMiAvLyAiRVJSOmVyck5vZnIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTm9mcgoKZXNjcm93QXNhX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0MjAKICAgIC8vIGNvbnN0IHsgc3RhdGUsIGVzY3Jvd2VkLCBsZWF2ZXMsIGV4cGlyYXRpb24gfSA9IHRoaXMub2ZmZXJzKGlkKS52YWx1ZQogICAgZGlnIDgKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBkdXAKICAgIGV4dHJhY3QgMCAxCiAgICBkaWcgMQogICAgcHVzaGludCA0MQogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDkKICAgIGRpZyAxCiAgICBwdXNoaW50IDMzCiAgICBleHRyYWN0X3VpbnQ2NAogICAgY292ZXIgMTAKICAgIHN3YXAKICAgIHB1c2hpbnQgOTcKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQyMgogICAgLy8gbG9nZ2VkQXNzZXJ0KHN0YXRlID09PSBTVEFURV9FU0NST1dJTkcsIGVyckludmFsaWRTdGF0ZSkKICAgIGJ5dGVjIDYgLy8gMHgxNAogICAgPT0KICAgIGJueiBlc2Nyb3dBc2FfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjIDUgLy8gIkVSUjplcnJJc3RlIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklzdGUKCmVzY3Jvd0FzYV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDI0CiAgICAvLyBsb2dnZWRBc3NlcnQoZXhwaXJhdGlvbiA+IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsIGVyck9mZmVyRXhwaXJlZCkKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgID4KICAgIGJueiBlc2Nyb3dBc2FfYWZ0ZXJfYXNzZXJ0QDcKICAgIGJ5dGVjIDggLy8gIkVSUjplcnJPZmV4IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck9mZXgKCmVzY3Jvd0FzYV9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDI2CiAgICAvLyBjb25zdCBzZW5kZXJQYXJ0aWNpcGFudEtleSA9IHsgaWQsIGFkZHJlc3M6IFR4bi5zZW5kZXIgfQogICAgZGlnIDEKICAgIHR4biBTZW5kZXIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0MjcKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnBhcnRpY2lwYW50cyhzZW5kZXJQYXJ0aWNpcGFudEtleSkuZXhpc3RzLCBlcnJOb3RBUGFydGljaXBhbnQpCiAgICBkdXAKICAgIGV4dHJhY3QgMCA4CiAgICBzd2FwCiAgICBleHRyYWN0IDggMzIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2OAogICAgLy8gcGFydGljaXBhbnRzID0gQm94TWFwPFBhcnRpY2lwYW50S2V5LCBSZWZ1bmRWYWx1ZT4oeyBrZXlQcmVmaXg6IEh5cGVyU3dhcEJveFByZWZpeFBhcnRpY2lwYW50cyB9KQogICAgYnl0ZWNfMSAvLyAicCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0MjcKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnBhcnRpY2lwYW50cyhzZW5kZXJQYXJ0aWNpcGFudEtleSkuZXhpc3RzLCBlcnJOb3RBUGFydGljaXBhbnQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBlc2Nyb3dBc2FfYWZ0ZXJfYXNzZXJ0QDkKICAgIGJ5dGVjIDE2IC8vICJFUlI6ZXJyTnBydCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOcHJ0Cgplc2Nyb3dBc2FfYWZ0ZXJfYXNzZXJ0QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQyOQogICAgLy8gY29uc3QgaGFzaCA9IHNoYTI1NihzaGEyNTYoQnl0ZXNgJHtUeG4uc2VuZGVyLmJ5dGVzfSR7cmVjZWl2ZXIuYnl0ZXN9JHtpdG9iKGFzc2V0KX0ke2l0b2IoYW1vdW50KX1gKSkKICAgIHR4biBTZW5kZXIKICAgIGRpZyAzCiAgICBjb25jYXQKICAgIGRpZyA0CiAgICBpdG9iCiAgICBjb25jYXQKICAgIGRpZyA2CiAgICBpdG9iCiAgICBjb25jYXQKICAgIHNoYTI1NgogICAgc2hhMjU2CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDMwCiAgICAvLyBjb25zdCBoYXNoS2V5OiBIYXNoS2V5ID0geyBpZCwgaGFzaCB9CiAgICB1bmNvdmVyIDMKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo3MAogICAgLy8gaGFzaGVzID0gQm94TWFwPEhhc2hLZXksIFJlZnVuZFZhbHVlPih7IGtleVByZWZpeDogSHlwZXJTd2FwQm94UHJlZml4SGFzaGVzIH0pCiAgICBieXRlYyA5IC8vICJoIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDMxCiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMuaGFzaGVzKGhhc2hLZXkpLmV4aXN0cywgZXJyTGVhZkFscmVhZHlFc2Nyb3dlZCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogZXNjcm93QXNhX2FmdGVyX2Fzc2VydEAxMQogICAgYnl0ZWMgMjQgLy8gIkVSUjplcnJMYWVzIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckxhZXMKCmVzY3Jvd0FzYV9hZnRlcl9hc3NlcnRAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQzMwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMudmVyaWZ5TGVhZihpZCwgZmFsc2UsIGhhc2gsIHByb29mKSwgZXJyQ2FudFZlcmlmeUxlYWYpCiAgICB1bmNvdmVyIDEwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciA0CiAgICB1bmNvdmVyIDcKICAgIGNhbGxzdWIgdmVyaWZ5TGVhZgogICAgcG9wCiAgICBibnogZXNjcm93QXNhX2FmdGVyX2Fzc2VydEAxMwogICAgYnl0ZWMgMjUgLy8gIkVSUjplcnJDdmxmIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckN2bGYKCmVzY3Jvd0FzYV9hZnRlcl9hc3NlcnRAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQzNwogICAgLy8gbGV0IG1ickFtb3VudCA9IGNvc3RzLmhhc2hlcwogICAgaW50YyA0IC8vIDM0OTAwCiAgICBidXJ5IDEwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQ0MAogICAgLy8gaWYgKCFyZWNlaXZlci5pc09wdGVkSW4oQXNzZXQoYXNzZXQpKSkgewogICAgdW5jb3ZlciAyCiAgICBkaWcgMwogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJueiBlc2Nyb3dBc2FfYWZ0ZXJfaWZfZWxzZUAxNQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0MzcKICAgIC8vIGxldCBtYnJBbW91bnQgPSBjb3N0cy5oYXNoZXMKICAgIGludGMgNCAvLyAzNDkwMAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0NDEKICAgIC8vIG1ickFtb3VudCArPSBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgKwogICAgYnVyeSA5Cgplc2Nyb3dBc2FfYWZ0ZXJfaWZfZWxzZUAxNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDQ0CiAgICAvLyBsb2dnZWRBc3NlcnQobWJyUGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRQYXltZW50KQogICAgZGlnIDQKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBlc2Nyb3dBc2FfYWZ0ZXJfYXNzZXJ0QDE3CiAgICBieXRlYyA0IC8vICJFUlI6ZXJySXBheSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcGF5Cgplc2Nyb3dBc2FfYWZ0ZXJfYXNzZXJ0QDE3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0NDUKICAgIC8vIGxvZ2dlZEFzc2VydChtYnJQYXltZW50LmFtb3VudCA9PT0gbWJyQW1vdW50LCBlcnJJbnZhbGlkUGF5bWVudCkKICAgIGRpZyA0CiAgICBndHhucyBBbW91bnQKICAgIGRpZyA5CiAgICA9PQogICAgYm56IGVzY3Jvd0FzYV9hZnRlcl9hc3NlcnRAMTkKICAgIGJ5dGVjIDQgLy8gIkVSUjplcnJJcGF5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwYXkKCmVzY3Jvd0FzYV9hZnRlcl9hc3NlcnRAMTk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQ0OAogICAgLy8gYXNzZXJ0U2FmZUFzc2V0VHJhbnNmZXIoYXNzZXRYZmVyLCBUeG4uc2VuZGVyKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo4MwogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5zZW5kZXIgPT09IHNlbmRlciwgZXJySW52YWxpZFBheW1lbnRTZW5kZXIpCiAgICBkaWcgMQogICAgZ3R4bnMgU2VuZGVyCiAgICA9PQogICAgYm56IGVzY3Jvd0FzYV9hZnRlcl9hc3NlcnRAMzAKICAgIGJ5dGVjIDI2IC8vICJFUlI6ZXJySXBtcyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcG1zCgplc2Nyb3dBc2FfYWZ0ZXJfYXNzZXJ0QDMwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo4NAogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5hc3NldFNlbmRlciA9PT0gR2xvYmFsLnplcm9BZGRyZXNzLCBlcnJDbGF3YmFja0ZvcmJpZGRlbikKICAgIGR1cAogICAgZ3R4bnMgQXNzZXRTZW5kZXIKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIGJueiBlc2Nyb3dBc2FfYWZ0ZXJfYXNzZXJ0QDMyCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJOY2x3IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5jbHcKCmVzY3Jvd0FzYV9hZnRlcl9hc3NlcnRAMzI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjg1CiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLmFzc2V0Q2xvc2VUbyA9PT0gR2xvYmFsLnplcm9BZGRyZXNzLCBlcnJDbG9zZUZvcmJpZGRlbikKICAgIGR1cAogICAgZ3R4bnMgQXNzZXRDbG9zZVRvCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgID09CiAgICBibnogZXNjcm93QXNhX2FmdGVyX2Fzc2VydEAzNAogICAgYnl0ZWMgMjcgLy8gIkVSUjplcnJOY2xzIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5jbHMKCmVzY3Jvd0FzYV9hZnRlcl9hc3NlcnRAMzQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjg2CiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLnJla2V5VG8gPT09IEdsb2JhbC56ZXJvQWRkcmVzcywgZXJyUmVrZXlGb3JiaWRkZW4pCiAgICBkdXAKICAgIGd0eG5zIFJla2V5VG8KICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIGJueiBlc2Nyb3dBc2FfYWZ0ZXJfYXNzZXJ0QDM2CiAgICBieXRlYyAyOCAvLyAiRVJSOmVyck5ya3kiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTnJreQoKZXNjcm93QXNhX2FmdGVyX2Fzc2VydEAzNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDQ5CiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLmFzc2V0UmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBlcnJJbnZhbGlkVHJhbnNmZXIpCiAgICBkdXAKICAgIGd0eG5zIEFzc2V0UmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IGVzY3Jvd0FzYV9hZnRlcl9hc3NlcnRAMjEKICAgIGJ5dGVjIDE3IC8vICJFUlI6ZXJySXhmciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJeGZyCgplc2Nyb3dBc2FfYWZ0ZXJfYXNzZXJ0QDIxOgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0NTAKICAgIC8vIGxvZ2dlZEFzc2VydChhc3NldFhmZXIueGZlckFzc2V0ID09PSBBc3NldChhc3NldCksIGVyckludmFsaWRUcmFuc2ZlcikKICAgIGR1cAogICAgZ3R4bnMgWGZlckFzc2V0CiAgICB1bmNvdmVyIDMKICAgID09CiAgICBibnogZXNjcm93QXNhX2FmdGVyX2Fzc2VydEAyMwogICAgYnl0ZWMgMTcgLy8gIkVSUjplcnJJeGZyIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckl4ZnIKCmVzY3Jvd0FzYV9hZnRlcl9hc3NlcnRAMjM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQ1MQogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci5hc3NldEFtb3VudCA9PT0gYW1vdW50LCBlcnJJbnZhbGlkVHJhbnNmZXIpCiAgICBndHhucyBBc3NldEFtb3VudAogICAgdW5jb3ZlciAyCiAgICA9PQogICAgYm56IGVzY3Jvd0FzYV9hZnRlcl9hc3NlcnRAMjUKICAgIGJ5dGVjIDE3IC8vICJFUlI6ZXJySXhmciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJeGZyCgplc2Nyb3dBc2FfYWZ0ZXJfYXNzZXJ0QDI1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0NTUKICAgIC8vIHBheW9yOiBtYnJQYXltZW50LnNlbmRlciwKICAgIHN3YXAKICAgIGd0eG5zIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0NTQtNDU3CiAgICAvLyB0aGlzLmhhc2hlcyhoYXNoS2V5KS52YWx1ZSA9IHsKICAgIC8vICAgcGF5b3I6IG1iclBheW1lbnQuc2VuZGVyLAogICAgLy8gICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gfQogICAgZGlnIDUKICAgIGl0b2IKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0NTkKICAgIC8vIGNvbnN0IG5ld0VzY3Jvd2VkOiB1aW50NjQgPSBlc2Nyb3dlZCArIDEKICAgIGludGNfMSAvLyAxCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQ2MAogICAgLy8gdGhpcy5vZmZlcnMoaWQpLnZhbHVlLmVzY3Jvd2VkID0gbmV3RXNjcm93ZWQKICAgIGR1cAogICAgaXRvYgogICAgZGlnIDMKICAgIHB1c2hpbnQgNDEKICAgIHVuY292ZXIgMgogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDYyCiAgICAvLyBpZiAobGVhdmVzID09PSBuZXdFc2Nyb3dlZCkgewogICAgPT0KICAgIGJ6IGVzY3Jvd0FzYV9hZnRlcl9pZl9lbHNlQDI3CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQ2MwogICAgLy8gdGhpcy5vZmZlcnMoaWQpLnZhbHVlLnN0YXRlID0gU1RBVEVfRElTQlVSU0lORwogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgYnl0ZWMgMTAgLy8gMHgxZQogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKCmVzY3Jvd0FzYV9hZnRlcl9pZl9lbHNlQDI3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0MDktNDE3CiAgICAvLyBlc2Nyb3dBc2EoCiAgICAvLyAgIG1iclBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIGlkOiB1aW50NjQsCiAgICAvLyAgIHJlY2VpdmVyOiBBY2NvdW50LAogICAgLy8gICBhc3NldDogdWludDY0LAogICAgLy8gICBhbW91bnQ6IHVpbnQ2NCwKICAgIC8vICAgcHJvb2Y6IFByb29mCiAgICAvLyApIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjpIeXBlclN3YXAuZGlzYnVyc2Vbcm91dGluZ10oKSAtPiB2b2lkOgpkaXNidXJzZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDc3CiAgICAvLyBkaXNidXJzZShpZDogdWludDY0LCByZWNlaXZlcldhbGxldDogdWludDY0LCByZWNlaXZlcjogQWNjb3VudCwgYXNzZXQ6IHVpbnQ2NCwgYW1vdW50OiB1aW50NjQpIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0NzgKICAgIC8vIHRoaXMucmVsZWFzZShpZCwgVHhuLnNlbmRlciwgcmVjZWl2ZXJXYWxsZXQsIHJlY2VpdmVyLCBhc3NldCwgYW1vdW50KQogICAgdHhuIFNlbmRlcgogICAgdW5jb3ZlciA1CiAgICBzd2FwCiAgICBjb3ZlciA1CiAgICBjb3ZlciA1CiAgICBjYWxsc3ViIHJlbGVhc2UKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDc3CiAgICAvLyBkaXNidXJzZShpZDogdWludDY0LCByZWNlaXZlcldhbGxldDogdWludDY0LCByZWNlaXZlcjogQWNjb3VudCwgYXNzZXQ6IHVpbnQ2NCwgYW1vdW50OiB1aW50NjQpIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjpIeXBlclN3YXAuZGlzYnVyc2VGcm9tW3JvdXRpbmddKCkgLT4gdm9pZDoKZGlzYnVyc2VGcm9tOgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0OTIKICAgIC8vIGRpc2J1cnNlRnJvbShpZDogdWludDY0LCBmcm9tOiBBY2NvdW50LCByZWNlaXZlcldhbGxldDogdWludDY0LCByZWNlaXZlcjogQWNjb3VudCwgYXNzZXQ6IHVpbnQ2NCwgYW1vdW50OiB1aW50NjQpIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA1CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA2CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQ5MwogICAgLy8gdGhpcy5yZWxlYXNlKGlkLCBmcm9tLCByZWNlaXZlcldhbGxldCwgcmVjZWl2ZXIsIGFzc2V0LCBhbW91bnQpCiAgICBjYWxsc3ViIHJlbGVhc2UKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDkyCiAgICAvLyBkaXNidXJzZUZyb20oaWQ6IHVpbnQ2NCwgZnJvbTogQWNjb3VudCwgcmVjZWl2ZXJXYWxsZXQ6IHVpbnQ2NCwgcmVjZWl2ZXI6IEFjY291bnQsIGFzc2V0OiB1aW50NjQsIGFtb3VudDogdWludDY0KSB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo6SHlwZXJTd2FwLmNhbmNlbFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNhbmNlbDoKICAgIGludGNfMCAvLyAwCiAgICBwdXNoYnl0ZXMgIiIKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1MDQKICAgIC8vIGNhbmNlbChpZDogdWludDY0LCBwcm9vZjogUHJvb2YpIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAzMgogICAgKgogICAgcHVzaGludCAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxieXRlc1szMl0+CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjUwNgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMub2ZmZXJzKGlkKS5leGlzdHMsIGVyck9mZmVyTm90Rm91bmQpCiAgICBpdG9iCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjYKICAgIC8vIG9mZmVycyA9IEJveE1hcDx1aW50NjQsIE9mZmVyVmFsdWU+KHsga2V5UHJlZml4OiBIeXBlclN3YXBCb3hQcmVmaXhPZmZlcnMgfSkKICAgIGJ5dGVjXzAgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1MDYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLm9mZmVycyhpZCkuZXhpc3RzLCBlcnJPZmZlck5vdEZvdW5kKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogY2FuY2VsX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlY18yIC8vICJFUlI6ZXJyTm9mciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOb2ZyCgpjYW5jZWxfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjUwNwogICAgLy8gY29uc3QgeyBzdGF0ZSwgZXNjcm93ZWQsIGxlYXZlcywgZXhwaXJhdGlvbiB9ID0gdGhpcy5vZmZlcnMoaWQpLnZhbHVlCiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBkdXAKICAgIGV4dHJhY3QgMCAxCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGJ1cnkgNwogICAgZHVwCiAgICBwdXNoaW50IDQxCiAgICBleHRyYWN0X3VpbnQ2NAogICAgY292ZXIgNAogICAgZHVwCiAgICBwdXNoaW50IDMzCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYnVyeSA2CiAgICBwdXNoaW50IDk3CiAgICBleHRyYWN0X3VpbnQ2NAogICAgYnVyeSA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjUwOQogICAgLy8gc3RhdGUgPT09IFNUQVRFX09GRkVSRUQgfHwgc3RhdGUgPT09IFNUQVRFX0VTQ1JPV0lORyB8fAogICAgYnl0ZWMgNyAvLyAweDBhCiAgICA9PQogICAgYm56IGNhbmNlbF9ib29sX3RydWVAOAogICAgZGlnIDUKICAgIGJ5dGVjIDYgLy8gMHgxNAogICAgPT0KICAgIGJueiBjYW5jZWxfYm9vbF90cnVlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTEwCiAgICAvLyAoc3RhdGUgPT09IFNUQVRFX0RJU0JVUlNJTkcgJiYgZXNjcm93ZWQgPT09IGxlYXZlcyAmJiBleHBpcmF0aW9uIDw9IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXApLAogICAgZGlnIDUKICAgIGJ5dGVjIDEwIC8vIDB4MWUKICAgID09CiAgICBieiBjYW5jZWxfYm9vbF9mYWxzZUA5CiAgICBkaWcgMgogICAgZGlnIDQKICAgID09CiAgICBieiBjYW5jZWxfYm9vbF9mYWxzZUA5CiAgICBkaWcgNAogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgPD0KICAgIGJ6IGNhbmNlbF9ib29sX2ZhbHNlQDkKCmNhbmNlbF9ib29sX3RydWVAODoKICAgIGludGNfMSAvLyAxCgpjYW5jZWxfYm9vbF9tZXJnZUAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTA4LTUxMgogICAgLy8gbG9nZ2VkQXNzZXJ0KAogICAgLy8gICBzdGF0ZSA9PT0gU1RBVEVfT0ZGRVJFRCB8fCBzdGF0ZSA9PT0gU1RBVEVfRVNDUk9XSU5HIHx8CiAgICAvLyAgIChzdGF0ZSA9PT0gU1RBVEVfRElTQlVSU0lORyAmJiBlc2Nyb3dlZCA9PT0gbGVhdmVzICYmIGV4cGlyYXRpb24gPD0gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCksCiAgICAvLyAgIGVyckludmFsaWRTdGF0ZQogICAgLy8gKQogICAgYm56IGNhbmNlbF9hZnRlcl9hc3NlcnRAMTIKICAgIGJ5dGVjIDUgLy8gIkVSUjplcnJJc3RlIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklzdGUKCmNhbmNlbF9hZnRlcl9hc3NlcnRAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjUxNgogICAgLy8gY29uc3Qgc2VuZGVyUGFydGljaXBhbnRLZXkgPSB7IGlkLCBhZGRyZXNzOiBUeG4uc2VuZGVyIH0KICAgIHR4biBTZW5kZXIKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjUxNwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucGFydGljaXBhbnRzKHNlbmRlclBhcnRpY2lwYW50S2V5KS5leGlzdHMsIGVyck5vdEFjY2VwdGVkKQogICAgZHVwCiAgICBleHRyYWN0IDAgOAogICAgc3dhcAogICAgZXh0cmFjdCA4IDMyCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjgKICAgIC8vIHBhcnRpY2lwYW50cyA9IEJveE1hcDxQYXJ0aWNpcGFudEtleSwgUmVmdW5kVmFsdWU+KHsga2V5UHJlZml4OiBIeXBlclN3YXBCb3hQcmVmaXhQYXJ0aWNpcGFudHMgfSkKICAgIGJ5dGVjXzEgLy8gInAiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTE3CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5wYXJ0aWNpcGFudHMoc2VuZGVyUGFydGljaXBhbnRLZXkpLmV4aXN0cywgZXJyTm90QWNjZXB0ZWQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBjYW5jZWxfYWZ0ZXJfYXNzZXJ0QDE0CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJOYWNwIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5hY3AKCmNhbmNlbF9hZnRlcl9hc3NlcnRAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjUyMAogICAgLy8gaWYgKGVzY3Jvd2VkID09PSAwKSB7CiAgICBzd2FwCiAgICBibnogY2FuY2VsX2Vsc2VfYm9keUAxNgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1MjEKICAgIC8vIHRoaXMub2ZmZXJzKGlkKS52YWx1ZS5zdGF0ZSA9IFNUQVRFX0NBTkNFTF9DT01QTEVURUQKICAgIGludGNfMCAvLyAwCiAgICBieXRlYyAxMSAvLyAweDNjCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwoKY2FuY2VsX2FmdGVyX2lmX2Vsc2VAMTc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjUwNAogICAgLy8gY2FuY2VsKGlkOiB1aW50NjQsIHByb29mOiBQcm9vZikgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKY2FuY2VsX2Vsc2VfYm9keUAxNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTIzCiAgICAvLyB0aGlzLm9mZmVycyhpZCkudmFsdWUuc3RhdGUgPSBTVEFURV9DQU5DRUxMRUQKICAgIGludGNfMCAvLyAwCiAgICBwdXNoYnl0ZXMgMHgzMgogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGIgY2FuY2VsX2FmdGVyX2lmX2Vsc2VAMTcKCmNhbmNlbF9ib29sX2ZhbHNlQDk6CiAgICBpbnRjXzAgLy8gMAogICAgYiBjYW5jZWxfYm9vbF9tZXJnZUAxMAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Okh5cGVyU3dhcC53aXRoZHJhd1tyb3V0aW5nXSgpIC0+IHZvaWQ6CndpdGhkcmF3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1MzYKICAgIC8vIHdpdGhkcmF3KGlkOiB1aW50NjQsIHJlY2VpdmVyOiBBY2NvdW50LCBhc3NldDogdWludDY0LCBhbW91bnQ6IHVpbnQ2NCwgcHJvb2Y6IFByb29mKSB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDUKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAzMgogICAgKgogICAgcHVzaGludCAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxieXRlc1szMl0+CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjUzOAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMub2ZmZXJzKGlkKS5leGlzdHMsIGVyck9mZmVyTm90Rm91bmQpCiAgICBpdG9iCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjYKICAgIC8vIG9mZmVycyA9IEJveE1hcDx1aW50NjQsIE9mZmVyVmFsdWU+KHsga2V5UHJlZml4OiBIeXBlclN3YXBCb3hQcmVmaXhPZmZlcnMgfSkKICAgIGJ5dGVjXzAgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1MzgKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLm9mZmVycyhpZCkuZXhpc3RzLCBlcnJPZmZlck5vdEZvdW5kKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogd2l0aGRyYXdfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjXzIgLy8gIkVSUjplcnJOb2ZyIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5vZnIKCndpdGhkcmF3X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1MzkKICAgIC8vIGNvbnN0IHsgc3RhdGUsIGVzY3Jvd2VkIH0gPSB0aGlzLm9mZmVycyhpZCkudmFsdWUKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGR1cAogICAgZXh0cmFjdCAwIDEKICAgIHN3YXAKICAgIHB1c2hpbnQgNDEKICAgIGV4dHJhY3RfdWludDY0CiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU0MQogICAgLy8gbG9nZ2VkQXNzZXJ0KHN0YXRlID09PSBTVEFURV9DQU5DRUxMRUQsIGVyckludmFsaWRTdGF0ZSkKICAgIHB1c2hieXRlcyAweDMyCiAgICA9PQogICAgYm56IHdpdGhkcmF3X2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyA1IC8vICJFUlI6ZXJySXN0ZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJc3RlCgp3aXRoZHJhd19hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTQzCiAgICAvLyBsb2dnZWRBc3NlcnQoZXNjcm93ZWQgPiAwLCBlcnJOb3RoaW5nVG9XaXRoZHJhdykKICAgIGRpZyAxCiAgICBibnogd2l0aGRyYXdfYWZ0ZXJfYXNzZXJ0QDcKICAgIHB1c2hieXRlcyAiRVJSOmVyck50d2QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTnR3ZAoKd2l0aGRyYXdfYWZ0ZXJfYXNzZXJ0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU0NQogICAgLy8gY29uc3QgaGFzaCA9IHNoYTI1NihzaGEyNTYoQnl0ZXNgJHtUeG4uc2VuZGVyLmJ5dGVzfSR7cmVjZWl2ZXIuYnl0ZXN9JHtpdG9iKGFzc2V0KX0ke2l0b2IoYW1vdW50KX1gKSkKICAgIHR4biBTZW5kZXIKICAgIHVuY292ZXIgNgogICAgY29uY2F0CiAgICBkaWcgNAogICAgaXRvYgogICAgY29uY2F0CiAgICBkaWcgMwogICAgaXRvYgogICAgY29uY2F0CiAgICBzaGEyNTYKICAgIHNoYTI1NgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1NDYKICAgIC8vIGNvbnN0IGhhc2hLZXk6IEhhc2hLZXkgPSB7IGlkLCBoYXNoIH0KICAgIHVuY292ZXIgNQogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjcwCiAgICAvLyBoYXNoZXMgPSBCb3hNYXA8SGFzaEtleSwgUmVmdW5kVmFsdWU+KHsga2V5UHJlZml4OiBIeXBlclN3YXBCb3hQcmVmaXhIYXNoZXMgfSkKICAgIGJ5dGVjIDkgLy8gImgiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1NDcKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmhhc2hlcyhoYXNoS2V5KS5leGlzdHMsIGVyckxlYWZOb3RFc2Nyb3dlZCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHdpdGhkcmF3X2FmdGVyX2Fzc2VydEA5CiAgICBieXRlYyAyOSAvLyAiRVJSOmVyckxuZXMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTG5lcwoKd2l0aGRyYXdfYWZ0ZXJfYXNzZXJ0QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU0OQogICAgLy8gbGV0IHsgcGF5b3IsIGFtb3VudDogcmVmdW5kQW1vdW50IH0gPSB0aGlzLmhhc2hlcyhoYXNoS2V5KS52YWx1ZQogICAgZHVwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZHVwCiAgICBleHRyYWN0IDggMzIKICAgIGNvdmVyIDIKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1NTAKICAgIC8vIHRoaXMuaGFzaGVzKGhhc2hLZXkpLmRlbGV0ZSgpCiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTUyCiAgICAvLyBpZiAoYXNzZXQgPT09IDApIHsKICAgIGRpZyA1CiAgICBibnogd2l0aGRyYXdfZWxzZV9ib2R5QDEyCiAgICB1bmNvdmVyIDUKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1NTMtNTU4CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudCwKICAgIC8vICAgICByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU1NgogICAgLy8gcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICB1bmNvdmVyIDQKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU1My01NTcKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGFtb3VudDogYW1vdW50LAogICAgLy8gICAgIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1NTMtNTU4CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudCwKICAgIC8vICAgICByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAoKd2l0aGRyYXdfYWZ0ZXJfaWZfZWxzZUAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTY5LTU3NAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50OiByZWZ1bmRBbW91bnQsCiAgICAvLyAgICAgcmVjZWl2ZXI6IHBheW9yLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU2OS01NzMKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGFtb3VudDogcmVmdW5kQW1vdW50LAogICAgLy8gICAgIHJlY2VpdmVyOiBwYXlvciwKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTY5LTU3NAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50OiByZWZ1bmRBbW91bnQsCiAgICAvLyAgICAgcmVjZWl2ZXI6IHBheW9yLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU3NwogICAgLy8gY29uc3QgbmV3RXNjcm93ZWQ6IHVpbnQ2NCA9IGVzY3Jvd2VkIC0gMQogICAgc3dhcAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1NzkKICAgIC8vIGlmIChuZXdFc2Nyb3dlZCA9PT0gMCkgewogICAgYm56IHdpdGhkcmF3X2Vsc2VfYm9keUAxNwogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1ODAKICAgIC8vIHRoaXMub2ZmZXJzKGlkKS52YWx1ZS5lc2Nyb3dlZCA9IG5ld0VzY3Jvd2VkCiAgICBpdG9iCiAgICBkaWcgMQogICAgcHVzaGludCA0MQogICAgdW5jb3ZlciAyCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1ODEKICAgIC8vIHRoaXMub2ZmZXJzKGlkKS52YWx1ZS5zdGF0ZSA9IFNUQVRFX0NBTkNFTF9DT01QTEVURUQKICAgIGludGNfMCAvLyAwCiAgICBieXRlYyAxMSAvLyAweDNjCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwoKd2l0aGRyYXdfYWZ0ZXJfaWZfZWxzZUAxODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTM2CiAgICAvLyB3aXRoZHJhdyhpZDogdWludDY0LCByZWNlaXZlcjogQWNjb3VudCwgYXNzZXQ6IHVpbnQ2NCwgYW1vdW50OiB1aW50NjQsIHByb29mOiBQcm9vZikgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKd2l0aGRyYXdfZWxzZV9ib2R5QDE3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1ODMKICAgIC8vIHRoaXMub2ZmZXJzKGlkKS52YWx1ZS5lc2Nyb3dlZCA9IG5ld0VzY3Jvd2VkCiAgICBpdG9iCiAgICBwdXNoaW50IDQxCiAgICBzd2FwCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYiB3aXRoZHJhd19hZnRlcl9pZl9lbHNlQDE4Cgp3aXRoZHJhd19lbHNlX2JvZHlAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU2MC01NjYKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudCwKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTY0CiAgICAvLyBhc3NldFJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICB1bmNvdmVyIDQKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIHVuY292ZXIgNAogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTYwLTU2NQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldCwKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50LAogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1NjAtNTY2CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnQsCiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgYiB3aXRoZHJhd19hZnRlcl9pZl9lbHNlQDE0CgoKLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo6SHlwZXJTd2FwLmNsZWFudXBQYXJ0aWNpcGFudFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNsZWFudXBQYXJ0aWNpcGFudDoKICAgIGludGNfMCAvLyAwCiAgICBwdXNoYnl0ZXMgIiIKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1OTYKICAgIC8vIGNsZWFudXBQYXJ0aWNpcGFudChpZDogdWludDY0LCBwYXJ0aWNpcGFudDogQWNjb3VudCkgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU5NwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMub2ZmZXJzKGlkKS5leGlzdHMsIGVyck9mZmVyTm90Rm91bmQpCiAgICBpdG9iCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjYKICAgIC8vIG9mZmVycyA9IEJveE1hcDx1aW50NjQsIE9mZmVyVmFsdWU+KHsga2V5UHJlZml4OiBIeXBlclN3YXBCb3hQcmVmaXhPZmZlcnMgfSkKICAgIGJ5dGVjXzAgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1OTcKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLm9mZmVycyhpZCkuZXhpc3RzLCBlcnJPZmZlck5vdEZvdW5kKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogY2xlYW51cFBhcnRpY2lwYW50X2FmdGVyX2Fzc2VydEAzCiAgICBieXRlY18yIC8vICJFUlI6ZXJyTm9mciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOb2ZyCgpjbGVhbnVwUGFydGljaXBhbnRfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU5OAogICAgLy8gY29uc3QgeyBzdGF0ZSwgZXhwaXJhdGlvbiwgYWNjZXB0YW5jZXMsIGVzY3Jvd2VkIH0gPSB0aGlzLm9mZmVycyhpZCkudmFsdWUKICAgIGRpZyAxCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZHVwCiAgICBleHRyYWN0IDAgMQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBidXJ5IDgKICAgIGR1cAogICAgcHVzaGludCA5NwogICAgZXh0cmFjdF91aW50NjQKICAgIGJ1cnkgNgogICAgZHVwCiAgICBwdXNoaW50IDg5CiAgICBleHRyYWN0X3VpbnQ2NAogICAgY292ZXIgNAogICAgcHVzaGludCA0MQogICAgZXh0cmFjdF91aW50NjQKICAgIGJ1cnkgNwogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2MDEKICAgIC8vIGNvbnN0IGlzQ29tcGxldGVkID0gc3RhdGUgPT09IFNUQVRFX0NPTVBMRVRFRCB8fCBzdGF0ZSA9PT0gU1RBVEVfQ0FOQ0VMX0NPTVBMRVRFRAogICAgYnl0ZWMgMTggLy8gMHgyOAogICAgPT0KICAgIGJueiBjbGVhbnVwUGFydGljaXBhbnRfYm9vbF90cnVlQDUKICAgIGRpZyA2CiAgICBieXRlYyAxMSAvLyAweDNjCiAgICA9PQogICAgYnogY2xlYW51cFBhcnRpY2lwYW50X2Jvb2xfZmFsc2VANgoKY2xlYW51cFBhcnRpY2lwYW50X2Jvb2xfdHJ1ZUA1OgogICAgaW50Y18xIC8vIDEKCmNsZWFudXBQYXJ0aWNpcGFudF9ib29sX21lcmdlQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjYwMgogICAgLy8gY29uc3QgaXNFeHBpcmVkID0gKHN0YXRlID09PSBTVEFURV9PRkZFUkVEIHx8IHN0YXRlID09PSBTVEFURV9FU0NST1dJTkcpICYmIGV4cGlyYXRpb24gPD0gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCAmJiBlc2Nyb3dlZCA9PT0gMAogICAgZGlnIDcKICAgIGJ5dGVjIDcgLy8gMHgwYQogICAgPT0KICAgIGJueiBjbGVhbnVwUGFydGljaXBhbnRfYW5kX2NvbnRkQDkKICAgIGRpZyA3CiAgICBieXRlYyA2IC8vIDB4MTQKICAgID09CiAgICBieiBjbGVhbnVwUGFydGljaXBhbnRfYm9vbF9mYWxzZUAxMgoKY2xlYW51cFBhcnRpY2lwYW50X2FuZF9jb250ZEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2MDIKICAgIC8vIGNvbnN0IGlzRXhwaXJlZCA9IChzdGF0ZSA9PT0gU1RBVEVfT0ZGRVJFRCB8fCBzdGF0ZSA9PT0gU1RBVEVfRVNDUk9XSU5HKSAmJiBleHBpcmF0aW9uIDw9IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgJiYgZXNjcm93ZWQgPT09IDAKICAgIGRpZyA1CiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICA8PQogICAgYnogY2xlYW51cFBhcnRpY2lwYW50X2Jvb2xfZmFsc2VAMTIKICAgIGRpZyA2CiAgICBibnogY2xlYW51cFBhcnRpY2lwYW50X2Jvb2xfZmFsc2VAMTIKICAgIGludGNfMSAvLyAxCgpjbGVhbnVwUGFydGljaXBhbnRfYm9vbF9tZXJnZUAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjAzCiAgICAvLyBsb2dnZWRBc3NlcnQoaXNDb21wbGV0ZWQgfHwgaXNFeHBpcmVkLCBlcnJJbnZhbGlkU3RhdGUpCiAgICB8fAogICAgYm56IGNsZWFudXBQYXJ0aWNpcGFudF9hZnRlcl9hc3NlcnRAMTUKICAgIGJ5dGVjIDUgLy8gIkVSUjplcnJJc3RlIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklzdGUKCmNsZWFudXBQYXJ0aWNpcGFudF9hZnRlcl9hc3NlcnRAMTU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjYwNQogICAgLy8gY29uc3QgcGFydGljaXBhbnRLZXk6IFBhcnRpY2lwYW50S2V5ID0geyBpZCwgYWRkcmVzczogcGFydGljaXBhbnQgfQogICAgdW5jb3ZlciAzCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjgKICAgIC8vIHBhcnRpY2lwYW50cyA9IEJveE1hcDxQYXJ0aWNpcGFudEtleSwgUmVmdW5kVmFsdWU+KHsga2V5UHJlZml4OiBIeXBlclN3YXBCb3hQcmVmaXhQYXJ0aWNpcGFudHMgfSkKICAgIGJ5dGVjXzEgLy8gInAiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2MDYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnBhcnRpY2lwYW50cyhwYXJ0aWNpcGFudEtleSkuZXhpc3RzLCBlcnJQYXJ0aWNpcGFudE5vdEZvdW5kKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogY2xlYW51cFBhcnRpY2lwYW50X2FmdGVyX2Fzc2VydEAxNwogICAgcHVzaGJ5dGVzICJFUlI6ZXJyTnBmZCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOcGZkCgpjbGVhbnVwUGFydGljaXBhbnRfYWZ0ZXJfYXNzZXJ0QDE3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2MDgKICAgIC8vIGNvbnN0IHsgcGF5b3IsIGFtb3VudCB9ID0gdGhpcy5wYXJ0aWNpcGFudHMocGFydGljaXBhbnRLZXkpLnZhbHVlCiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBkdXAKICAgIGV4dHJhY3QgOCAzMgogICAgc3dhcAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjYwOQogICAgLy8gdGhpcy5wYXJ0aWNpcGFudHMocGFydGljaXBhbnRLZXkpLmRlbGV0ZSgpCiAgICB1bmNvdmVyIDIKICAgIGJveF9kZWwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2MTIKICAgIC8vIHRoaXMub2ZmZXJzKGlkKS52YWx1ZS5hY2NlcHRhbmNlcyA9IGFjY2VwdGFuY2VzIC0gMQogICAgdW5jb3ZlciAzCiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgaXRvYgogICAgdW5jb3ZlciAzCiAgICBwdXNoaW50IDg5CiAgICB1bmNvdmVyIDIKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjYxNS02MjAKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGFtb3VudCwKICAgIC8vICAgICByZWNlaXZlcjogcGF5b3IsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjE1LTYxOQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50LAogICAgLy8gICAgIHJlY2VpdmVyOiBwYXlvciwKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjE1LTYyMAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50LAogICAgLy8gICAgIHJlY2VpdmVyOiBwYXlvciwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1OTYKICAgIC8vIGNsZWFudXBQYXJ0aWNpcGFudChpZDogdWludDY0LCBwYXJ0aWNpcGFudDogQWNjb3VudCkgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKY2xlYW51cFBhcnRpY2lwYW50X2Jvb2xfZmFsc2VAMTI6CiAgICBpbnRjXzAgLy8gMAogICAgYiBjbGVhbnVwUGFydGljaXBhbnRfYm9vbF9tZXJnZUAxMwoKY2xlYW51cFBhcnRpY2lwYW50X2Jvb2xfZmFsc2VANjoKICAgIGludGNfMCAvLyAwCiAgICBiIGNsZWFudXBQYXJ0aWNpcGFudF9ib29sX21lcmdlQDcKCgovLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjpIeXBlclN3YXAuY2xlYW51cE9mZmVyW3JvdXRpbmddKCkgLT4gdm9pZDoKY2xlYW51cE9mZmVyOgogICAgaW50Y18wIC8vIDAKICAgIHB1c2hieXRlcyAiIgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjYyOQogICAgLy8gY2xlYW51cE9mZmVyKGlkOiB1aW50NjQpIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjMwCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5vZmZlcnMoaWQpLmV4aXN0cywgZXJyT2ZmZXJOb3RGb3VuZCkKICAgIGl0b2IKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2NgogICAgLy8gb2ZmZXJzID0gQm94TWFwPHVpbnQ2NCwgT2ZmZXJWYWx1ZT4oeyBrZXlQcmVmaXg6IEh5cGVyU3dhcEJveFByZWZpeE9mZmVycyB9KQogICAgYnl0ZWNfMCAvLyAibyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjYzMAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMub2ZmZXJzKGlkKS5leGlzdHMsIGVyck9mZmVyTm90Rm91bmQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBjbGVhbnVwT2ZmZXJfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjXzIgLy8gIkVSUjplcnJOb2ZyIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5vZnIKCmNsZWFudXBPZmZlcl9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjMxCiAgICAvLyBjb25zdCB7IHN0YXRlLCBleHBpcmF0aW9uLCBhY2NlcHRhbmNlcywgZXNjcm93ZWQgfSA9IHRoaXMub2ZmZXJzKGlkKS52YWx1ZQogICAgZHVwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZHVwCiAgICBleHRyYWN0IDAgMQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBidXJ5IDcKICAgIGR1cAogICAgcHVzaGludCA5NwogICAgZXh0cmFjdF91aW50NjQKICAgIGJ1cnkgNQogICAgZHVwCiAgICBwdXNoaW50IDg5CiAgICBleHRyYWN0X3VpbnQ2NAogICAgY292ZXIgMwogICAgcHVzaGludCA0MQogICAgZXh0cmFjdF91aW50NjQKICAgIGJ1cnkgNgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2MzQKICAgIC8vIGNvbnN0IGlzQ29tcGxldGVkID0gc3RhdGUgPT09IFNUQVRFX0NPTVBMRVRFRCB8fCBzdGF0ZSA9PT0gU1RBVEVfQ0FOQ0VMX0NPTVBMRVRFRAogICAgYnl0ZWMgMTggLy8gMHgyOAogICAgPT0KICAgIGJueiBjbGVhbnVwT2ZmZXJfYm9vbF90cnVlQDUKICAgIGRpZyA1CiAgICBieXRlYyAxMSAvLyAweDNjCiAgICA9PQogICAgYnogY2xlYW51cE9mZmVyX2Jvb2xfZmFsc2VANgoKY2xlYW51cE9mZmVyX2Jvb2xfdHJ1ZUA1OgogICAgaW50Y18xIC8vIDEKCmNsZWFudXBPZmZlcl9ib29sX21lcmdlQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjYzNQogICAgLy8gY29uc3QgaXNFeHBpcmVkID0gKHN0YXRlID09PSBTVEFURV9PRkZFUkVEIHx8IHN0YXRlID09PSBTVEFURV9FU0NST1dJTkcpICYmIGV4cGlyYXRpb24gPD0gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCAmJiBlc2Nyb3dlZCA9PT0gMAogICAgZGlnIDYKICAgIGJ5dGVjIDcgLy8gMHgwYQogICAgPT0KICAgIGJueiBjbGVhbnVwT2ZmZXJfYW5kX2NvbnRkQDkKICAgIGRpZyA2CiAgICBieXRlYyA2IC8vIDB4MTQKICAgID09CiAgICBieiBjbGVhbnVwT2ZmZXJfYm9vbF9mYWxzZUAxMgoKY2xlYW51cE9mZmVyX2FuZF9jb250ZEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2MzUKICAgIC8vIGNvbnN0IGlzRXhwaXJlZCA9IChzdGF0ZSA9PT0gU1RBVEVfT0ZGRVJFRCB8fCBzdGF0ZSA9PT0gU1RBVEVfRVNDUk9XSU5HKSAmJiBleHBpcmF0aW9uIDw9IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgJiYgZXNjcm93ZWQgPT09IDAKICAgIGRpZyA0CiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICA8PQogICAgYnogY2xlYW51cE9mZmVyX2Jvb2xfZmFsc2VAMTIKICAgIGRpZyA1CiAgICBibnogY2xlYW51cE9mZmVyX2Jvb2xfZmFsc2VAMTIKICAgIGludGNfMSAvLyAxCgpjbGVhbnVwT2ZmZXJfYm9vbF9tZXJnZUAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjM2CiAgICAvLyBsb2dnZWRBc3NlcnQoaXNDb21wbGV0ZWQgfHwgaXNFeHBpcmVkLCBlcnJJbnZhbGlkU3RhdGUpCiAgICB8fAogICAgYm56IGNsZWFudXBPZmZlcl9hZnRlcl9hc3NlcnRAMTUKICAgIGJ5dGVjIDUgLy8gIkVSUjplcnJJc3RlIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklzdGUKCmNsZWFudXBPZmZlcl9hZnRlcl9hc3NlcnRAMTU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjYzOQogICAgLy8gbG9nZ2VkQXNzZXJ0KGFjY2VwdGFuY2VzID09PSAwLCBlcnJQYXJ0aWNpcGFudHNOb3RDbGVhbmVkKQogICAgc3dhcAogICAgYnogY2xlYW51cE9mZmVyX2FmdGVyX2Fzc2VydEAxNwogICAgcHVzaGJ5dGVzICJFUlI6ZXJyUG5jbCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJQbmNsCgpjbGVhbnVwT2ZmZXJfYWZ0ZXJfYXNzZXJ0QDE3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo3MwogICAgLy8gb2ZmZXJSZWZ1bmRzID0gQm94TWFwPHVpbnQ2NCwgUmVmdW5kVmFsdWU+KHsga2V5UHJlZml4OiBIeXBlclN3YXBCb3hQcmVmaXhPZmZlclJlZnVuZHMgfSkKICAgIHB1c2hieXRlcyAiZiIKICAgIHVuY292ZXIgMgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjQxCiAgICAvLyBjb25zdCB7IHBheW9yLCBhbW91bnQgfSA9IHRoaXMub2ZmZXJSZWZ1bmRzKGlkKS52YWx1ZQogICAgZHVwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZHVwCiAgICBleHRyYWN0IDggMzIKICAgIHN3YXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo3OQogICAgLy8gb2ZmZXJSZWdpc3RyeSA9IEJveE1hcDx1aW50NjQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IEh5cGVyU3dhcEJveFByZWZpeE9mZmVyUmVnaXN0cnkgfSkKICAgIGJ5dGVjIDE0IC8vICJyIgogICAgZGlnIDQKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2NDMKICAgIC8vIGNvbnN0IHJlZ2lzdHJ5ID0gdGhpcy5vZmZlclJlZ2lzdHJ5KGlkKS52YWx1ZQogICAgZHVwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2NDQKICAgIC8vIGFiaUNhbGw8dHlwZW9mIE1ldGEucHJvdG90eXBlLmRlbGV0ZVJvb3Q+KHsgYXBwSWQ6IHJlZ2lzdHJ5LCBhcmdzOiBbdGhpcy5yb290TmFtZShpZCwgZmFsc2UpXSB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo4NQogICAgLy8gcmV0dXJuIFN0cmluZygocGFydGljaXBhbnRzID8gQnl0ZXMoJ3AnKSA6IEJ5dGVzKCd0JykpLmNvbmNhdChpdG9iKGlkKSkpCiAgICBieXRlYyAxNSAvLyAidCIKICAgIGRpZyA2CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjQ0CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBNZXRhLnByb3RvdHlwZS5kZWxldGVSb290Pih7IGFwcElkOiByZWdpc3RyeSwgYXJnczogW3RoaXMucm9vdE5hbWUoaWQsIGZhbHNlKV0gfSkKICAgIGR1cAogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgc3dhcAogICAgY29uY2F0CiAgICBkaWcgMQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBieXRlYyAzMCAvLyBtZXRob2QgImRlbGV0ZVJvb3Qoc3RyaW5nKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjY0NQogICAgLy8gYWJpQ2FsbDx0eXBlb2YgTWV0YS5wcm90b3R5cGUuZGVsZXRlUm9vdD4oeyBhcHBJZDogcmVnaXN0cnksIGFyZ3M6IFt0aGlzLnJvb3ROYW1lKGlkLCB0cnVlKV0gfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6ODUKICAgIC8vIHJldHVybiBTdHJpbmcoKHBhcnRpY2lwYW50cyA/IEJ5dGVzKCdwJykgOiBCeXRlcygndCcpKS5jb25jYXQoaXRvYihpZCkpKQogICAgYnl0ZWNfMSAvLyAicCIKICAgIHVuY292ZXIgNgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjY0NQogICAgLy8gYWJpQ2FsbDx0eXBlb2YgTWV0YS5wcm90b3R5cGUuZGVsZXRlUm9vdD4oeyBhcHBJZDogcmVnaXN0cnksIGFyZ3M6IFt0aGlzLnJvb3ROYW1lKGlkLCB0cnVlKV0gfSkKICAgIGR1cAogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgc3dhcAogICAgY29uY2F0CiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIGJ5dGVjIDMwIC8vIG1ldGhvZCAiZGVsZXRlUm9vdChzdHJpbmcpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjQ2CiAgICAvLyB0aGlzLm9mZmVycyhpZCkuZGVsZXRlKCkKICAgIHVuY292ZXIgNAogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjY0NwogICAgLy8gdGhpcy5vZmZlclJlZnVuZHMoaWQpLmRlbGV0ZSgpCiAgICB1bmNvdmVyIDMKICAgIGJveF9kZWwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2NDgKICAgIC8vIHRoaXMub2ZmZXJSZWdpc3RyeShpZCkuZGVsZXRlKCkKICAgIGJveF9kZWwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2NDkKICAgIC8vIGl0eG4ucGF5bWVudCh7IHJlY2VpdmVyOiBwYXlvciwgYW1vdW50IH0pLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjI5CiAgICAvLyBjbGVhbnVwT2ZmZXIoaWQ6IHVpbnQ2NCkgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKY2xlYW51cE9mZmVyX2Jvb2xfZmFsc2VAMTI6CiAgICBpbnRjXzAgLy8gMAogICAgYiBjbGVhbnVwT2ZmZXJfYm9vbF9tZXJnZUAxMwoKY2xlYW51cE9mZmVyX2Jvb2xfZmFsc2VANjoKICAgIGludGNfMCAvLyAwCiAgICBiIGNsZWFudXBPZmZlcl9ib29sX21lcmdlQDcKCgovLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjpIeXBlclN3YXAub2ZmZXJUZXJtc1tyb3V0aW5nXSgpIC0+IHZvaWQ6Cm9mZmVyVGVybXM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjY1NQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjU3CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5vZmZlcnMoaWQpLmV4aXN0cywgZXJyT2ZmZXJOb3RGb3VuZCkKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjYKICAgIC8vIG9mZmVycyA9IEJveE1hcDx1aW50NjQsIE9mZmVyVmFsdWU+KHsga2V5UHJlZml4OiBIeXBlclN3YXBCb3hQcmVmaXhPZmZlcnMgfSkKICAgIGJ5dGVjXzAgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjU3CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5vZmZlcnMoaWQpLmV4aXN0cywgZXJyT2ZmZXJOb3RGb3VuZCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IG9mZmVyVGVybXNfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjXzIgLy8gIkVSUjplcnJOb2ZyIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5vZnIKCm9mZmVyVGVybXNfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjY1OAogICAgLy8gcmV0dXJuIHRoaXMudGVybXMoaWQpCiAgICBjYWxsc3ViIHRlcm1zCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjY1NQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBieXRlYyAxOSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czo6Q29udHJhY3RXaXRoT3B0SW4ub3B0SW5bcm91dGluZ10oKSAtPiB2b2lkOgpvcHRJbjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czoyMwogICAgLy8gb3B0SW4ocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBhc3NldDogQXNzZXQpOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwbiAyCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjI1CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRQYXltZW50UmVjZWl2ZXIpCiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogb3B0SW5fYWZ0ZXJfYXNzZXJ0QDMKICAgIHB1c2hieXRlcyAiRVJSOmVycklwbXIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBtcgoKb3B0SW5fYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6MjYKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LmFtb3VudCA9PT0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlLCBlcnJJbnZhbGlkUGF5bWVudEFtb3VudCkKICAgIHN3YXAKICAgIGd0eG5zIEFtb3VudAogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICA9PQogICAgYm56IG9wdEluX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJJcG1hIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwbWEKCm9wdEluX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjI4LTM0CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogMCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjMwCiAgICAvLyBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjMxCiAgICAvLyBhc3NldEFtb3VudDogMCwKICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czoyOC0zMwogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IDAsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldAogICAgLy8gICB9KQogICAgcHVzaGludCA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czoyOC0zNAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IDAsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6MjMKICAgIC8vIG9wdEluKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYXNzZXQ6IEFzc2V0KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjpVcGdyYWRlYWJsZUFraXRhQmFzZUNvbnRyYWN0LnVwZGF0ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozNQogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozNwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMyAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyAzMSAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM3CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIGVyck5vdEFraXRhRGFvKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGJueiB1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDMyIC8vICJFUlI6ZXJyTmRhbyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOZGFvCgp1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzgKICAgIC8vIGNvbnN0IFtwbHVnaW5zXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzUGx1Z2luQXBwTGlzdCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMyAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM4CiAgICAvLyBjb25zdCBbcGx1Z2luc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1BsdWdpbkFwcExpc3QpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjIDIwIC8vICJwYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzkKICAgIC8vIGNvbnN0IHVwZGF0ZVBsdWdpbiA9IGRlY29kZUFyYzQ8UGx1Z2luQXBwTGlzdD4ocGx1Z2lucykudXBkYXRlCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjQwCiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uSWQgPT09IHVwZGF0ZVBsdWdpbiwgZXJySW52YWxpZFVwZ3JhZGUpCiAgICBnbG9iYWwgQ2FsbGVyQXBwbGljYXRpb25JRAogICAgPT0KICAgIGJueiB1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOmVyckl1cGciCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXVwZwoKdXBkYXRlX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE0CiAgICAvLyB2ZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogR2xvYmFsU3RhdGVLZXlWZXJzaW9uIH0pCiAgICBieXRlYyAyMiAvLyAidmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czo0MQogICAgLy8gdGhpcy52ZXJzaW9uLnZhbHVlID0gbmV3VmVyc2lvbgogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozNQogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjpBa2l0YUJhc2VDb250cmFjdC51cGRhdGVBa2l0YURBT1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZUFraXRhREFPOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjI1CiAgICAvLyB1cGRhdGVBa2l0YURBTyhha2l0YURBTzogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNgogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMyAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyAzMSAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjI2CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIGVyck5vdEFraXRhRGFvKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGJueiB1cGRhdGVBa2l0YURBT19hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMzIgLy8gIkVSUjplcnJOZGFvIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5kYW8KCnVwZGF0ZUFraXRhREFPX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMyAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjI3CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlID0gYWtpdGFEQU8KICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MjUKICAgIC8vIHVwZGF0ZUFraXRhREFPKGFraXRhREFPOiBBcHBsaWNhdGlvbik6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Okh5cGVyU3dhcC50ZXJtcyhpZDogdWludDY0KSAtPiBieXRlczoKdGVybXM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjk5CiAgICAvLyBwcml2YXRlIHRlcm1zKGlkOiB1aW50NjQpOiBieXRlczwzMj4gewogICAgcHJvdG8gMSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjEwMAogICAgLy8gY29uc3QgeyByb290LCBsZWF2ZXMsIHBhcnRpY2lwYW50c1Jvb3QsIHBhcnRpY2lwYW50c0xlYXZlcywgZXhwaXJhdGlvbiB9ID0gdGhpcy5vZmZlcnMoaWQpLnZhbHVlCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjYKICAgIC8vIG9mZmVycyA9IEJveE1hcDx1aW50NjQsIE9mZmVyVmFsdWU+KHsga2V5UHJlZml4OiBIeXBlclN3YXBCb3hQcmVmaXhPZmZlcnMgfSkKICAgIGJ5dGVjXzAgLy8gIm8iCiAgICBkaWcgMQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjEwMAogICAgLy8gY29uc3QgeyByb290LCBsZWF2ZXMsIHBhcnRpY2lwYW50c1Jvb3QsIHBhcnRpY2lwYW50c0xlYXZlcywgZXhwaXJhdGlvbiB9ID0gdGhpcy5vZmZlcnMoaWQpLnZhbHVlCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZHVwCiAgICBleHRyYWN0IDEgMzIKICAgIGRpZyAxCiAgICBleHRyYWN0IDMzIDgKICAgIGRpZyAyCiAgICBleHRyYWN0IDQ5IDMyCiAgICBkaWcgMwogICAgZXh0cmFjdCA4MSA4CiAgICB1bmNvdmVyIDQKICAgIGV4dHJhY3QgOTcgOAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxMDEKICAgIC8vIHJldHVybiBzaGEyNTYoQnl0ZXNgJHtpdG9iKGlkKX0ke3Jvb3R9JHtpdG9iKGxlYXZlcyl9JHtwYXJ0aWNpcGFudHNSb290fSR7aXRvYihwYXJ0aWNpcGFudHNMZWF2ZXMpfSR7aXRvYihleHBpcmF0aW9uKX1gKQogICAgdW5jb3ZlciA1CiAgICB1bmNvdmVyIDUKICAgIGNvbmNhdAogICAgdW5jb3ZlciA0CiAgICBjb25jYXQKICAgIHVuY292ZXIgMwogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICBzaGEyNTYKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Okh5cGVyU3dhcC52ZXJpZnlMZWFmKGlkOiB1aW50NjQsIHBhcnRpY2lwYW50czogdWludDY0LCBsZWFmOiBieXRlcywgcHJvb2Y6IGJ5dGVzKSAtPiB1aW50NjQsIGJ5dGVzOgp2ZXJpZnlMZWFmOgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxMDUKICAgIC8vIHByaXZhdGUgdmVyaWZ5TGVhZihpZDogdWludDY0LCBwYXJ0aWNpcGFudHM6IGJvb2xlYW4sIGxlYWY6IGJ5dGVzPDMyPiwgcHJvb2Y6IFByb29mKTogYm9vbGVhbiB7CiAgICBwcm90byA0IDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTA2LTExNQogICAgLy8gcmV0dXJuIGFiaUNhbGw8dHlwZW9mIE1ldGEucHJvdG90eXBlLnZlcmlmeT4oewogICAgLy8gICBhcHBJZDogdGhpcy5vZmZlclJlZ2lzdHJ5KGlkKS52YWx1ZSwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIHRoaXMucm9vdE5hbWUoaWQsIHBhcnRpY2lwYW50cyksCiAgICAvLyAgICAgbGVhZiwKICAgIC8vICAgICBwcm9vZiwKICAgIC8vICAgICBNZXJrbGVUcmVlVHlwZVRyYWRlCiAgICAvLyAgIF0sCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxMDkKICAgIC8vIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6ODUKICAgIC8vIHJldHVybiBTdHJpbmcoKHBhcnRpY2lwYW50cyA/IEJ5dGVzKCdwJykgOiBCeXRlcygndCcpKS5jb25jYXQoaXRvYihpZCkpKQogICAgYnl0ZWMgMTUgLy8gInQiCiAgICBieXRlY18xIC8vICJwIgogICAgZnJhbWVfZGlnIC0zCiAgICBzZWxlY3QKICAgIGZyYW1lX2RpZyAtNAogICAgaXRvYgogICAgc3dhcAogICAgZGlnIDEKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxMTAKICAgIC8vIHRoaXMucm9vdE5hbWUoaWQsIHBhcnRpY2lwYW50cyksCiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxMTMKICAgIC8vIE1lcmtsZVRyZWVUeXBlVHJhZGUKICAgIHB1c2hpbnQgMwogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo3OQogICAgLy8gb2ZmZXJSZWdpc3RyeSA9IEJveE1hcDx1aW50NjQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IEh5cGVyU3dhcEJveFByZWZpeE9mZmVyUmVnaXN0cnkgfSkKICAgIGJ5dGVjIDE0IC8vICJyIgogICAgdW5jb3ZlciAzCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTA3CiAgICAvLyBhcHBJZDogdGhpcy5vZmZlclJlZ2lzdHJ5KGlkKS52YWx1ZSwKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBidG9pCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTA2LTExNQogICAgLy8gcmV0dXJuIGFiaUNhbGw8dHlwZW9mIE1ldGEucHJvdG90eXBlLnZlcmlmeT4oewogICAgLy8gICBhcHBJZDogdGhpcy5vZmZlclJlZ2lzdHJ5KGlkKS52YWx1ZSwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIHRoaXMucm9vdE5hbWUoaWQsIHBhcnRpY2lwYW50cyksCiAgICAvLyAgICAgbGVhZiwKICAgIC8vICAgICBwcm9vZiwKICAgIC8vICAgICBNZXJrbGVUcmVlVHlwZVRyYWRlCiAgICAvLyAgIF0sCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgcHVzaGJ5dGVzIDB4MmJmM2NjNWEgLy8gbWV0aG9kICJ2ZXJpZnkoYWRkcmVzcyxzdHJpbmcsYnl0ZVszMl0sYnl0ZVszMl1bXSx1aW50NjQpYm9vbCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC0yCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC0xCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIHN3YXAKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlYyAxOSAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYm9vbAogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgZnJhbWVfZGlnIC0xCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjpIeXBlclN3YXAucmVsZWFzZShpZDogdWludDY0LCBmcm9tOiBieXRlcywgcmVjZWl2ZXJXYWxsZXQ6IHVpbnQ2NCwgcmVjZWl2ZXI6IGJ5dGVzLCBhc3NldDogdWludDY0LCBhbW91bnQ6IHVpbnQ2NCkgLT4gdm9pZDoKcmVsZWFzZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTIyCiAgICAvLyBwcml2YXRlIHJlbGVhc2UoaWQ6IHVpbnQ2NCwgZnJvbTogQWNjb3VudCwgcmVjZWl2ZXJXYWxsZXQ6IHVpbnQ2NCwgcmVjZWl2ZXI6IEFjY291bnQsIGFzc2V0OiB1aW50NjQsIGFtb3VudDogdWludDY0KTogdm9pZCB7CiAgICBwcm90byA2IDAKICAgIGludGNfMCAvLyAwCiAgICBkdXAKICAgIHB1c2hieXRlcyAiIgogICAgZHVwbiA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjEyNAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMub2ZmZXJzKGlkKS5leGlzdHMsIGVyck9mZmVyTm90Rm91bmQpCiAgICBmcmFtZV9kaWcgLTYKICAgIGl0b2IKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2NgogICAgLy8gb2ZmZXJzID0gQm94TWFwPHVpbnQ2NCwgT2ZmZXJWYWx1ZT4oeyBrZXlQcmVmaXg6IEh5cGVyU3dhcEJveFByZWZpeE9mZmVycyB9KQogICAgYnl0ZWNfMCAvLyAibyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjEyNAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMub2ZmZXJzKGlkKS5leGlzdHMsIGVyck9mZmVyTm90Rm91bmQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiByZWxlYXNlX2FmdGVyX2Fzc2VydEAyCiAgICBieXRlY18yIC8vICJFUlI6ZXJyTm9mciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOb2ZyCgpyZWxlYXNlX2FmdGVyX2Fzc2VydEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxMjUKICAgIC8vIGNvbnN0IHsgc3RhdGUsIGVzY3Jvd2VkIH0gPSB0aGlzLm9mZmVycyhpZCkudmFsdWUKICAgIGZyYW1lX2RpZyA4CiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZHVwCiAgICBleHRyYWN0IDAgMQogICAgc3dhcAogICAgcHVzaGludCA0MQogICAgZXh0cmFjdF91aW50NjQKICAgIGZyYW1lX2J1cnkgNAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxMjcKICAgIC8vIGxvZ2dlZEFzc2VydChzdGF0ZSA9PT0gU1RBVEVfRElTQlVSU0lORywgZXJySW52YWxpZFN0YXRlKQogICAgYnl0ZWMgMTAgLy8gMHgxZQogICAgPT0KICAgIGJueiByZWxlYXNlX2FmdGVyX2Fzc2VydEA0CiAgICBieXRlYyA1IC8vICJFUlI6ZXJySXN0ZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJc3RlCgpyZWxlYXNlX2FmdGVyX2Fzc2VydEA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxMzAKICAgIC8vIGNvbnN0IGhhc2ggPSBzaGEyNTYoc2hhMjU2KEJ5dGVzYCR7ZnJvbS5ieXRlc30ke3JlY2VpdmVyLmJ5dGVzfSR7aXRvYihhc3NldCl9JHtpdG9iKGFtb3VudCl9YCkpCiAgICBmcmFtZV9kaWcgLTUKICAgIGZyYW1lX2RpZyAtMwogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgLTIKICAgIGl0b2IKICAgIGR1cAogICAgY292ZXIgMgogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgLTEKICAgIGl0b2IKICAgIGR1cAogICAgY292ZXIgMgogICAgY29uY2F0CiAgICBzaGEyNTYKICAgIHNoYTI1NgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxMzEKICAgIC8vIGNvbnN0IGhhc2hLZXk6IEhhc2hLZXkgPSB7IGlkLCBoYXNoIH0KICAgIHVuY292ZXIgMwogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjcwCiAgICAvLyBoYXNoZXMgPSBCb3hNYXA8SGFzaEtleSwgUmVmdW5kVmFsdWU+KHsga2V5UHJlZml4OiBIeXBlclN3YXBCb3hQcmVmaXhIYXNoZXMgfSkKICAgIGJ5dGVjIDkgLy8gImgiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxMzIKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmhhc2hlcyhoYXNoS2V5KS5leGlzdHMsIGVyckxlYWZOb3RFc2Nyb3dlZCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHJlbGVhc2VfYWZ0ZXJfYXNzZXJ0QDYKICAgIGJ5dGVjIDI5IC8vICJFUlI6ZXJyTG5lcyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJMbmVzCgpyZWxlYXNlX2FmdGVyX2Fzc2VydEA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxMzQKICAgIC8vIGxldCB7IHBheW9yLCBhbW91bnQ6IHJlZnVuZEFtb3VudCB9ID0gdGhpcy5oYXNoZXMoaGFzaEtleSkudmFsdWUKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGR1cAogICAgZXh0cmFjdCA4IDMyCiAgICBmcmFtZV9idXJ5IDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZnJhbWVfYnVyeSA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjEzNQogICAgLy8gdGhpcy5oYXNoZXMoaGFzaEtleSkuZGVsZXRlKCkKICAgIGJveF9kZWwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxMzgKICAgIC8vIGlmIChhc3NldCA9PT0gMCkgewogICAgZnJhbWVfZGlnIC0yCiAgICBibnogcmVsZWFzZV9lbHNlX2JvZHlAMTAKICAgIHBvcG4gMgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxNDAtMTQyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsgYW1vdW50LCByZWNlaXZlciB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIGZyYW1lX2RpZyAtMwogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgZnJhbWVfZGlnIC0xCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxNDAtMTQxCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsgYW1vdW50LCByZWNlaXZlciB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxNDAtMTQyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsgYW1vdW50LCByZWNlaXZlciB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE0NS0xNTAKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGFtb3VudDogcmVmdW5kQW1vdW50LAogICAgLy8gICAgIHJlY2VpdmVyOiBwYXlvciwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICBmcmFtZV9kaWcgMQogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgZnJhbWVfZGlnIDYKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE0NS0xNDkKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGFtb3VudDogcmVmdW5kQW1vdW50LAogICAgLy8gICAgIHJlY2VpdmVyOiBwYXlvciwKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTQ1LTE1MAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50OiByZWZ1bmRBbW91bnQsCiAgICAvLyAgICAgcmVjZWl2ZXI6IHBheW9yLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CgpyZWxlYXNlX2FmdGVyX2lmX2Vsc2VAMjg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjIxMAogICAgLy8gY29uc3QgbmV3RXNjcm93ZWQ6IHVpbnQ2NCA9IGVzY3Jvd2VkIC0gMQogICAgZnJhbWVfZGlnIDQKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjIxMQogICAgLy8gdGhpcy5vZmZlcnMoaWQpLnZhbHVlLmVzY3Jvd2VkID0gbmV3RXNjcm93ZWQKICAgIGR1cAogICAgaXRvYgogICAgZnJhbWVfZGlnIDgKICAgIHB1c2hpbnQgNDEKICAgIHVuY292ZXIgMgogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjEzCiAgICAvLyBpZiAobmV3RXNjcm93ZWQgPT09IDApIHsKICAgIGJueiByZWxlYXNlX2FmdGVyX2lmX2Vsc2VAMzAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjE0CiAgICAvLyB0aGlzLm9mZmVycyhpZCkudmFsdWUuc3RhdGUgPSBTVEFURV9DT01QTEVURUQKICAgIGZyYW1lX2RpZyA4CiAgICBpbnRjXzAgLy8gMAogICAgYnl0ZWMgMTggLy8gMHgyOAogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKCnJlbGVhc2VfYWZ0ZXJfaWZfZWxzZUAzMDoKICAgIHJldHN1YgoKcmVsZWFzZV9lbHNlX2JvZHlAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE1MwogICAgLy8gY29uc3QgWywgaXNPcHRlZEluXSA9IEFzc2V0SG9sZGluZy5hc3NldEJhbGFuY2UocmVjZWl2ZXIsIGFzc2V0KQogICAgZnJhbWVfZGlnIC0zCiAgICBmcmFtZV9kaWcgLTIKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE1NQogICAgLy8gaWYgKCFpc09wdGVkSW4pIHsKICAgIGJueiByZWxlYXNlX2Vsc2VfYm9keUAyNAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxNTcKICAgIC8vIGxvZ2dlZEFzc2VydChyZWNlaXZlcldhbGxldCAhPT0gMCwgZXJyUmVjZWl2ZXJOb3RPcHRlZEluKQogICAgZnJhbWVfZGlnIC00CiAgICBibnogcmVsZWFzZV9hZnRlcl9hc3NlcnRAMTMKICAgIGJ5dGVjIDIxIC8vICJFUlI6ZXJyUm5vaSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJSbm9pCgpyZWxlYXNlX2FmdGVyX2Fzc2VydEAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTU4CiAgICAvLyBsb2dnZWRBc3NlcnQoQXBwbGljYXRpb24ocmVjZWl2ZXJXYWxsZXQpLmFkZHJlc3MgPT09IHJlY2VpdmVyLCBlcnJSZWNlaXZlcldhbGxldE1pc21hdGNoKQogICAgZnJhbWVfZGlnIC00CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBmcmFtZV9kaWcgLTMKICAgID09CiAgICBibnogcmVsZWFzZV9hZnRlcl9hc3NlcnRAMTUKICAgIHB1c2hieXRlcyAiRVJSOmVyclJ3bW0iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyUndtbQoKcmVsZWFzZV9hZnRlcl9hc3NlcnRAMTU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE2MAogICAgLy8gbG9nZ2VkQXNzZXJ0KHJlZnVuZEFtb3VudCA+PSBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UsIGVyclJlY2VpdmVyTm90T3B0ZWRJbikKICAgIGZyYW1lX2RpZyA2CiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgID49CiAgICBibnogcmVsZWFzZV9hZnRlcl9hc3NlcnRAMTcKICAgIGJ5dGVjIDIxIC8vICJFUlI6ZXJyUm5vaSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJSbm9pCgpyZWxlYXNlX2FmdGVyX2Fzc2VydEAxNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTYzCiAgICAvLyBjb25zdCBvcHRpblBsdWdpbiA9IGdldFBsdWdpbkFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkub3B0aW4KICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18zIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE2MwogICAgLy8gY29uc3Qgb3B0aW5QbHVnaW4gPSBnZXRQbHVnaW5BcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLm9wdGluCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMjIKICAgIC8vIGNvbnN0IFtwbHVnaW5BcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzUGx1Z2luQXBwTGlzdCkpCiAgICBieXRlYyAyMCAvLyAicGFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxNjMKICAgIC8vIGNvbnN0IG9wdGluUGx1Z2luID0gZ2V0UGx1Z2luQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5vcHRpbgogICAgZXh0cmFjdCAwIDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTY0LTE3MwogICAgLy8gY29uc3QgY2FuT3B0SW4gPSBhYmlDYWxsPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfY2FuQ2FsbD4oewogICAgLy8gICBhcHBJZDogcmVjZWl2ZXJXYWxsZXQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBvcHRpblBsdWdpbiwKICAgIC8vICAgICBDYWxsZXJUeXBlR2xvYmFsLAogICAgLy8gICAgIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgICcnLAogICAgLy8gICAgIG9wLmJ6ZXJvKDQpLnRvRml4ZWQoeyBsZW5ndGg6IDQgfSksCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE2OAogICAgLy8gQ2FsbGVyVHlwZUdsb2JhbCwKICAgIGludGNfMSAvLyAxCiAgICBpdG9iCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTY5CiAgICAvLyBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE3MQogICAgLy8gb3AuYnplcm8oNCkudG9GaXhlZCh7IGxlbmd0aDogNCB9KSwKICAgIHB1c2hpbnQgNAogICAgYnplcm8KICAgIGZyYW1lX2RpZyAtNAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE2NC0xNzMKICAgIC8vIGNvbnN0IGNhbk9wdEluID0gYWJpQ2FsbDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X2NhbkNhbGw+KHsKICAgIC8vICAgYXBwSWQ6IHJlY2VpdmVyV2FsbGV0LAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgb3B0aW5QbHVnaW4sCiAgICAvLyAgICAgQ2FsbGVyVHlwZUdsb2JhbCwKICAgIC8vICAgICBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICAnJywKICAgIC8vICAgICBvcC5iemVybyg0KS50b0ZpeGVkKHsgbGVuZ3RoOiA0IH0pLAogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgcHVzaGJ5dGVzIDB4YjM2MjM0YTUgLy8gbWV0aG9kICJhcmM1OF9jYW5DYWxsKHVpbnQ2NCx1aW50NjQsYWRkcmVzcyxzdHJpbmcsYnl0ZVs0XSlib29sIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE3MAogICAgLy8gJycsCiAgICBieXRlYyAxMiAvLyAweDAwMDAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxNjQtMTczCiAgICAvLyBjb25zdCBjYW5PcHRJbiA9IGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9jYW5DYWxsPih7CiAgICAvLyAgIGFwcElkOiByZWNlaXZlcldhbGxldCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIG9wdGluUGx1Z2luLAogICAgLy8gICAgIENhbGxlclR5cGVHbG9iYWwsCiAgICAvLyAgICAgR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgJycsCiAgICAvLyAgICAgb3AuYnplcm8oNCkudG9GaXhlZCh7IGxlbmd0aDogNCB9KSwKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIHN3YXAKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlYyAxOSAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYm9vbAogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxNzUKICAgIC8vIGxvZ2dlZEFzc2VydChjYW5PcHRJbiwgZXJyUmVjZWl2ZXJOb3RPcHRlZEluKQogICAgYm56IHJlbGVhc2VfYWZ0ZXJfYXNzZXJ0QDIwCiAgICBieXRlYyAyMSAvLyAiRVJSOmVyclJub2kiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyUm5vaQoKcmVsZWFzZV9hZnRlcl9hc3NlcnRAMjA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE3OAogICAgLy8gYXJjNThPcHRJbkFuZFNlbmQodGhpcy5ha2l0YURBTy52YWx1ZSwgQXBwbGljYXRpb24ocmVjZWl2ZXJXYWxsZXQpLCAnJywgW2Fzc2V0XSwgW2Ftb3VudF0pCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMyAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxNzgKICAgIC8vIGFyYzU4T3B0SW5BbmRTZW5kKHRoaXMuYWtpdGFEQU8udmFsdWUsIEFwcGxpY2F0aW9uKHJlY2VpdmVyV2FsbGV0KSwgJycsIFthc3NldF0sIFthbW91bnRdKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjIDMzIC8vIDB4MDAwMQogICAgdW5jb3ZlciA0CiAgICBjb25jYXQKICAgIGR1cAogICAgY292ZXIgMwogICAgYnl0ZWMgMzMgLy8gMHgwMDAxCiAgICB1bmNvdmVyIDUKICAgIGNvbmNhdAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTAzCiAgICAvLyBhc3NlcnQoYXNzZXRzLmxlbmd0aCA9PT0gYW1vdW50cy5sZW5ndGgsIGVyckFzc2V0c0FuZEFtb3VudHNNaXNtYXRjaCkKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGNvdmVyIDQKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMgogICAgPT0KICAgIGFzc2VydCAvLyBlcnJBYW1tCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEyMgogICAgLy8gY29uc3QgW3BsdWdpbkFwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNQbHVnaW5BcHBMaXN0KSkKICAgIGJ5dGVjIDIwIC8vICJwYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUwNAogICAgLy8gY29uc3Qgb3B0aW5QbHVnaW4gPSBnZXRQbHVnaW5BcHBMaXN0KGFraXRhREFPKS5vcHRpbgogICAgZHVwCiAgICBleHRyYWN0IDAgOAogICAgY292ZXIgMgogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI0Ny0yNTAKICAgIC8vIGNvbnN0IFtjb250cm9sbGVkQWNjb3VudEJ5dGVzLCBleGlzdHNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoCiAgICAvLyAgIHdhbGxldElELAogICAgLy8gICBCeXRlcyhBYnN0cmFjdEFjY291bnRHbG9iYWxTdGF0ZUtleXNDb250cm9sbGVkQWRkcmVzcykKICAgIC8vICkKICAgIGZyYW1lX2RpZyAtNAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNDkKICAgIC8vIEJ5dGVzKEFic3RyYWN0QWNjb3VudEdsb2JhbFN0YXRlS2V5c0NvbnRyb2xsZWRBZGRyZXNzKQogICAgcHVzaGJ5dGVzICJjb250cm9sbGVkX2FkZHJlc3MiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI0Ny0yNTAKICAgIC8vIGNvbnN0IFtjb250cm9sbGVkQWNjb3VudEJ5dGVzLCBleGlzdHNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoCiAgICAvLyAgIHdhbGxldElELAogICAgLy8gICBCeXRlcyhBYnN0cmFjdEFjY291bnRHbG9iYWxTdGF0ZUtleXNDb250cm9sbGVkQWRkcmVzcykKICAgIC8vICkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBzd2FwCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI1MQogICAgLy8gbG9nZ2VkQXNzZXJ0KGV4aXN0cyAmJiBjb250cm9sbGVkQWNjb3VudEJ5dGVzLmxlbmd0aCA9PT0gMzIsIGVyckludmFsaWRXYWxsZXQpCiAgICBieiByZWxlYXNlX2Jvb2xfZmFsc2VAMzQKICAgIGRpZyAyCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGJ6IHJlbGVhc2VfYm9vbF9mYWxzZUAzNAogICAgaW50Y18xIC8vIDEKCnJlbGVhc2VfYm9vbF9tZXJnZUAzNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjUxCiAgICAvLyBsb2dnZWRBc3NlcnQoZXhpc3RzICYmIGNvbnRyb2xsZWRBY2NvdW50Qnl0ZXMubGVuZ3RoID09PSAzMiwgZXJySW52YWxpZFdhbGxldCkKICAgIGJueiByZWxlYXNlX2FmdGVyX2Fzc2VydEAzNwogICAgcHVzaGJ5dGVzICJFUlI6ZXJySXdsdCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJd2x0CgpyZWxlYXNlX2FmdGVyX2Fzc2VydEAzNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTA3LTUxMAogICAgLy8gaXR4bkNvbXBvc2UuYmVnaW48dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9yZWtleVRvUGx1Z2luPih7CiAgICAvLyAgIGFwcElkOiByZWNpcGllbnRXYWxsZXQuaWQsCiAgICAvLyAgIGFyZ3M6IFtvcHRpblBsdWdpbiwgQ2FsbGVyVHlwZUdsb2JhbCwgZXNjcm93LCBbXSwgW11dCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgZnJhbWVfZGlnIC00CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hieXRlcyAweDVhZGYzMzhmIC8vIG1ldGhvZCAiYXJjNThfcmVrZXlUb1BsdWdpbih1aW50NjQsdWludDY0LHN0cmluZyx1aW50NjRbXSwodWludDY0LHVpbnQ2NClbXSl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxNzAKICAgIC8vICcnLAogICAgYnl0ZWMgMTIgLy8gMHgwMDAwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MDkKICAgIC8vIGFyZ3M6IFtvcHRpblBsdWdpbiwgQ2FsbGVyVHlwZUdsb2JhbCwgZXNjcm93LCBbXSwgW11dCiAgICBieXRlYyAxMiAvLyAweDAwMDAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBieXRlYyAxMiAvLyAweDAwMDAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUwNy01MTAKICAgIC8vIGl0eG5Db21wb3NlLmJlZ2luPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfcmVrZXlUb1BsdWdpbj4oewogICAgLy8gICBhcHBJZDogcmVjaXBpZW50V2FsbGV0LmlkLAogICAgLy8gICBhcmdzOiBbb3B0aW5QbHVnaW4sIENhbGxlclR5cGVHbG9iYWwsIGVzY3JvdywgW10sIFtdXQogICAgLy8gfSkKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTEyLTUyMwogICAgLy8gaXR4bkNvbXBvc2UubmV4dDx0eXBlb2YgT3B0SW5QbHVnaW4ucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiBvcHRpblBsdWdpbiwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHJlY2lwaWVudFdhbGxldCwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIGFzc2V0cywKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IG9yaWdpbiwKICAgIC8vICAgICAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogYXNzZXRzLmxlbmd0aAogICAgLy8gICAgIH0pCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTIwCiAgICAvLyBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSAqIGFzc2V0cy5sZW5ndGgKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgdW5jb3ZlciAzCiAgICAqCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgZHVwCiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUxOC01MjEKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBvcmlnaW4sCiAgICAvLyAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogYXNzZXRzLmxlbmd0aAogICAgLy8gfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTEyLTUyMwogICAgLy8gaXR4bkNvbXBvc2UubmV4dDx0eXBlb2YgT3B0SW5QbHVnaW4ucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiBvcHRpblBsdWdpbiwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHJlY2lwaWVudFdhbGxldCwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIGFzc2V0cywKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IG9yaWdpbiwKICAgIC8vICAgICAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogYXNzZXRzLmxlbmd0aAogICAgLy8gICAgIH0pCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTE1CiAgICAvLyByZWNpcGllbnRXYWxsZXQsCiAgICBmcmFtZV9kaWcgLTQKICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUxMi01MjMKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIE9wdEluUGx1Z2luLnByb3RvdHlwZS5vcHRJbj4oewogICAgLy8gICBhcHBJZDogb3B0aW5QbHVnaW4sCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICByZWNpcGllbnRXYWxsZXQsCiAgICAvLyAgICAgdHJ1ZSwKICAgIC8vICAgICBhc3NldHMsCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBvcmlnaW4sCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSAqIGFzc2V0cy5sZW5ndGgKICAgIC8vICAgICB9KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgcHVzaGJ5dGVzIDB4NjgzNWUzYmMgLy8gbWV0aG9kICJvcHRJbih1aW50NjQsYm9vbCx1aW50NjRbXSxwYXkpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MTYKICAgIC8vIHRydWUsCiAgICBwdXNoYnl0ZXMgMHg4MAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyAxCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MTItNTIzCiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBPcHRJblBsdWdpbi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IG9wdGluUGx1Z2luLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgcmVjaXBpZW50V2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgYXNzZXRzLAogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogb3JpZ2luLAogICAgLy8gICAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiBhc3NldHMubGVuZ3RoCiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTI1CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgYW1vdW50cy5sZW5ndGg7IGkrKykgewogICAgaW50Y18wIC8vIDAKCnJlbGVhc2Vfd2hpbGVfdG9wQDM4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MjUKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBhbW91bnRzLmxlbmd0aDsgaSsrKSB7CiAgICBkdXAKICAgIGZyYW1lX2RpZyAyCiAgICA8CiAgICBieiByZWxlYXNlX2FmdGVyX3doaWxlQDQyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUyNgogICAgLy8gaWYgKGFtb3VudHNbaV0gPiAwKSB7CiAgICBmcmFtZV9kaWcgMAogICAgZXh0cmFjdCAyIDAKICAgIGRpZyAxCiAgICBpbnRjXzIgLy8gOAogICAgKgogICAgZHVwCiAgICBmcmFtZV9idXJ5IDMKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgNwogICAgYnogcmVsZWFzZV9hZnRlcl9pZl9lbHNlQDQxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUyNy01MzMKICAgIC8vIGl0eG5Db21wb3NlLm5leHQoCiAgICAvLyAgIGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudHNbaV0sCiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogb3JpZ2luLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXRzW2ldCiAgICAvLyAgIH0pCiAgICAvLyApCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTMxCiAgICAvLyB4ZmVyQXNzZXQ6IGFzc2V0c1tpXQogICAgZGlnIDIKICAgIGV4dHJhY3QgMiAwCiAgICBmcmFtZV9kaWcgMwogICAgZXh0cmFjdF91aW50NjQKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBkaWcgMQogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICBmcmFtZV9kaWcgNwogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MjgtNTMyCiAgICAvLyBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICBhc3NldEFtb3VudDogYW1vdW50c1tpXSwKICAgIC8vICAgYXNzZXRSZWNlaXZlcjogb3JpZ2luLAogICAgLy8gICB4ZmVyQXNzZXQ6IGFzc2V0c1tpXQogICAgLy8gfSkKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCgpyZWxlYXNlX2FmdGVyX2lmX2Vsc2VANDE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUyNQogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGFtb3VudHMubGVuZ3RoOyBpKyspIHsKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBiIHJlbGVhc2Vfd2hpbGVfdG9wQDM4CgpyZWxlYXNlX2FmdGVyX3doaWxlQDQyOgogICAgcG9wbiAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUzNy01MzkKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF92ZXJpZnlBdXRoQWRkcmVzcz4oewogICAgLy8gICBhcHBJZDogcmVjaXBpZW50V2FsbGV0CiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICBmcmFtZV9kaWcgLTQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgcHVzaGJ5dGVzIDB4NmNjM2Y2MDYgLy8gbWV0aG9kICJhcmM1OF92ZXJpZnlBdXRoQWRkcmVzcygpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0MQogICAgLy8gaXR4bkNvbXBvc2Uuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE4MQogICAgLy8gY29uc3Qgb3B0SW5Db3N0ID0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGR1cAogICAgZnJhbWVfYnVyeSA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE4MgogICAgLy8gaWYgKHJlZnVuZEFtb3VudCA+IG9wdEluQ29zdCkgewogICAgZnJhbWVfZGlnIDYKICAgIDwKICAgIGJ6IHJlbGVhc2VfYWZ0ZXJfaWZfZWxzZUAyOAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxODMtMTg4CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IHJlZnVuZEFtb3VudCAtIG9wdEluQ29zdCwKICAgIC8vICAgICByZWNlaXZlcjogcGF5b3IsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxODUKICAgIC8vIGFtb3VudDogcmVmdW5kQW1vdW50IC0gb3B0SW5Db3N0LAogICAgZnJhbWVfZGlnIDYKICAgIGZyYW1lX2RpZyA1CiAgICAtCiAgICBmcmFtZV9kaWcgMQogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTgzLTE4NwogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50OiByZWZ1bmRBbW91bnQgLSBvcHRJbkNvc3QsCiAgICAvLyAgICAgcmVjZWl2ZXI6IHBheW9yLAogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxODMtMTg4CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IHJlZnVuZEFtb3VudCAtIG9wdEluQ29zdCwKICAgIC8vICAgICByZWNlaXZlcjogcGF5b3IsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIGIgcmVsZWFzZV9hZnRlcl9pZl9lbHNlQDI4CgpyZWxlYXNlX2Jvb2xfZmFsc2VAMzQ6CiAgICBpbnRjXzAgLy8gMAogICAgYiByZWxlYXNlX2Jvb2xfbWVyZ2VAMzUKCnJlbGVhc2VfZWxzZV9ib2R5QDI0OgogICAgcG9wbiAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE5Mi0xOTgKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudCwKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiByZWNlaXZlciwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICBmcmFtZV9kaWcgLTMKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgZnJhbWVfZGlnIC0xCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBmcmFtZV9kaWcgLTIKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE5Mi0xOTcKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudCwKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiByZWNlaXZlciwKICAgIC8vICAgfSkKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE5Mi0xOTgKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudCwKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiByZWNlaXZlciwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyMDEtMjA2CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IHJlZnVuZEFtb3VudCwKICAgIC8vICAgICByZWNlaXZlcjogcGF5b3IsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgZnJhbWVfZGlnIDEKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGZyYW1lX2RpZyA2CiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyMDEtMjA1CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IHJlZnVuZEFtb3VudCwKICAgIC8vICAgICByZWNlaXZlcjogcGF5b3IsCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjIwMS0yMDYKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGFtb3VudDogcmVmdW5kQW1vdW50LAogICAgLy8gICAgIHJlY2VpdmVyOiBwYXlvciwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgYiByZWxlYXNlX2FmdGVyX2lmX2Vsc2VAMjgK", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyAGAAEIINSQAuSTAiYiAW8BcAtFUlI6ZXJyTm9mcglha2l0YV9kYW8LRVJSOmVycklwYXkLRVJSOmVycklzdGUBFAEKC0VSUjplcnJPZmV4AWgBHgE8AgAADG9mZmVyX2N1cnNvcgFyAXQLRVJSOmVyck5wcnQLRVJSOmVyckl4ZnIBKAQVH3x1A3BhbAtFUlI6ZXJyUm5vaQd2ZXJzaW9uBKJMBnwLRVJSOmVyckxhZXMLRVJSOmVyckN2bGYLRVJSOmVycklwbXMLRVJSOmVyck5jbHMLRVJSOmVyck5ya3kLRVJSOmVyckxuZXME3yh6fQZ3YWxsZXQLRVJSOmVyck5kYW8CAAGABOqRgN02GgCOAQC7MRkURDEYQQCkgg8EDbOkSwR72oHJBNhf690ERm+HGgRWamKyBCcza6AEDHq0LgQGMYaLBGg7tngE0+4E8AQA1wHVBDlOrrIEM+kslASFTe3gBIQHM902GgCODwB2Af8DCQQ8Bd8GGQZSBwUIAQjICcMJ5AqJADIAAQCALBUffHUAAAAAAAE2jAAAAAAAAIhUAAAAAAAAiFQAAAAAAACJ5AAAAAAAAAAAsCNDI0OABM2a1n42GgCOAQANADEZgQQSMRgQREIJ7zYaAUkiWYECCEsBFRJEVwIANhoCSRUkEkQXJxZPAmcrTGcnDSJnI0MxFiMJSTgQIxJENhoBSU4CSRUlEkQ2GgJJFSQSRBdOAzYaA0lOAkkVJRJENhoESRUkEkQXTgQ2GgVJFSQSRBdOAhNAAA+AC0VSUjplcnJCcm90sABJMgcNQAAEJwiwAEkyBwmBgJqeAQ5AAA+AC0VSUjplcnJPdGxnsABLAkk4AEw4BzIKEkAABCcEsABPAzgIgailCxJAAAQnBLAAIicNZURJIwgnDUxnIitlRIADYWFsZUiBSFtMFicOSwFQSwIWv7FLAXIIRCEFsgiyByOyECKyAbYnD0sBUEkVFlcGAkxQgQMWSwOyGCcXshpMshpPB0lOBLIaSbIagQayECKyAbOxSwJyCEQhBbIIsgcjshAisgG2KUsCUEkVFlcGAkxQTwOyGCcXshqyGk8FSU4DshqyGoEGshAisgGzIQQWTwRJTgJQSwIxAFApTFBMv4HUlAkWTFCAAWZLAlBMv08ESSMSJwcnBk8CTU8EUE8FFlAiFlBPA1BMFlAjFlBPAhZQKE8CUEy/I0MxFiMJSTgQIxJENhoBSRUkEkQXSTYaAklOBEkiWSULgQIITBUSRDYaA0lOAxUlEkQWSShMUElOBr1FAUAAAyqwAEsBiAhnTwMSQAAPgAtFUlI6ZXJyVG1pc7AASwS+RElXAAFLAYFhW04DSwGBWVtOAkyBUVtOAycHEkAABCcFsAAyB08EDEAABCcIsAAxAAEBTwQjTwJPB4gISEhAAAQnELAAMQBPAkxQSVcACExXCCBQKUxQSb1FAUEAD4ALRVJSOmVyckVhY2OwAEwjCElOAxZLBYFZTwK7SwM4BzIKEkAABCcEsABLAzgIIQQSQAAEJwSwAE8DOAAhBBZMUL8SQQAFSSInBrsjQzEWIwlJOBAjEkQ2GgFJFSQSRBdJTgI2GgJJTgMVJRJENhoDSRUkEkQXTgI2GgRJTgRJIlklC4ECCEwVEkQWSShMUElOB71FAUAAAyqwAEsGvkRJVwABSwGBKVtOBUsBgSFbTghMgWFbTCcGEkAABCcFsAAyBw1AAAQnCLAASTEAUElXAAhMVwggUClMUL1FAUAABCcQsAAxAE8GUCIWUEsDFlABAUlPAkxQJwlMUEm9RQFBAAQnGLAATwciTwNPB4gHFkhAAAQnGbAAMQBLAjgASU8CEkAABCcasABLAjgJMgMSQAAEJxuwAEsCOCAyAxJAAAQnHLAASwI4BzIKEkAABCcEsABPAjgITwMhBAgSQAAEJwSwACEEFkxQvyMISRZLA4EpTwK7EkEABUkiJwq7I0OAADEWgQIJSTgQIxJEMRYjCUk4EIEEEkQ2GgFJFSQSRBdJTgM2GgJJTgMVJRJENhoDSRUkEkQXTgM2GgRJFSQSRBdOBDYaBUlOBUkiWSULgQIITBUSRBZJTgIoTFBJTgm9RQFAAAMqsABLCL5ESVcAAUsBgSlbTglLAYEhW04KTIFhW0wnBhJAAAQnBbAAMgcNQAAEJwiwAEsBMQBQSVcACExXCCBQKUxQvUUBQAAEJxCwADEASwNQSwQWUEsGFlABAUlOAk8DTFAnCUxQSU4CvUUBQQAEJxiwAE8KIk8ETweIBcJIQAAEJxmwACEERQpPAksDcABFAUAAByEEMhAIRQlLBDgHMgoSQAAEJwSwAEsEOAhLCRJAAAQnBLAAMQBLATgAEkAABCcasABJOBMyAxJAAA+AC0VSUjplcnJOY2x3sABJOBUyAxJAAAQnG7AASTggMgMSQAAEJxywAEk4FDIKEkAABCcRsABJOBFPAxJAAAQnEbAAOBJPAhJAAAQnEbAATDgASwUWTFC/IwhJFksDgSlPArsSQQAFSSInCrsjQzYaAUkVJBJEFzYaAkkVJBJEFzYaA0kVJRJENhoESRUkEkQXNhoFSRUkEkQXMQBPBUxOBU4FiAUsI0M2GgFJFSQSRBc2GgJJFSUSRDYaA0kVJBJEFzYaBEkVJRJENhoFSRUkEkQXNhoGSRUkEkQXiATzI0MigABJNhoBSRUkEkQXNhoCSSJZJQuBAghMFRJEFkkoTFBJvUUBQAADKrAASb5ESVcAAUlOAkUHSYEpW04ESYEhW0UGgWFbRQYnBxJAACBLBScGEkAAGEsFJwoSQQBRSwJLBBJBAElLBDIHDkEAQSNAAAQnBbAAMQBPAkxQSVcACExXCCBQKUxQvUUBQAAPgAtFUlI6ZXJyTmFjcLAATEAABiInC7sjQyKAATK7Qv/2IkL/vDYaAUkVJBJEFzYaAklOAhUlEkQ2GgNJFSQSRBdMNhoESRUkEkQXTDYaBUkiWSULgQIITBUSRBZJTgMoTFBJvUUBQAADKrAASb5ESVcAAUyBKVtOAoABMhJAAAQnBbAASwFAAA+AC0VSUjplcnJOdHdksAAxAE8GUEsEFlBLAxZQAQFPBUxQJwlMUEm9RQFAAAQnHbAASb5ESVcIIE4CIltMvEhLBUAAPE8FSLExALIHTwSyCCOyECKyAbOxsgiyByOyECKyAbNMIwlJQAAOFksBgSlPArsiJwu7I0MWgSlMu0L/9rExALIUTwSyEk8EshGBBLIQIrIBs0L/vyKAAEk2GgFJFSQSRBc2GgJJTgIVJRJEFkkoTFBJTgK9RQFAAAMqsABLAb5ESVcAAUlOAkUISYFhW0UGSYFZW04EgSlbRQcnEhJAAAhLBicLEkEAbyNLBycHEkAACEsHJwYSQQBaSwUyBw5BAFJLBkAATSMRQAAEJwWwAE8DUClMUEm9RQFAAA+AC0VSUjplcnJOcGZksABJvkRJVwggTCJbTwK8SE8DIwkWTwOBWU8Cu7GyCLIHI7IQIrIBsyNDIkL/sCJC/44igABJNhoBSRUkEkQXFkkoTFBJvUUBQAADKrAASb5ESVcAAUlOAkUHSYFhW0UFSYFZW04DgSlbRQYnEhJAAAhLBScLEkEAsCNLBicHEkAACEsGJwYSQQCbSwQyBw5BAJNLBUAAjiMRQAAEJwWwAExBAA+AC0VSUjplcnJQbmNssACAAWZPAklOAlBJvkRJVwggTCJbJw5LBFBJvkQXsScPSwZQSRUWVwYCTFBLAbIYJx6yGrIagQayECKyAbOxKU8GUEkVFlcGAkxQTLIYJx6yGrIagQayECKyAbNPBLxITwO8SLxIsbIIsgcjshAisgGzI0MiQv9vIkL/TTYaAUkVJBJEF0kWKExQvUUBQAADKrAAiADPJxNMULAjQzEWIwlHAjgQIxJENhoBSRUkEkQXTDgHMgoSQAAPgAtFUlI6ZXJySXBtcrAATDgIMhASQAAPgAtFUlI6ZXJySXBtYbAAsTIKTLIRIrISshSBBLIQIrIBsyNDNhoBSSJZgQIISwEVEkRXAgAxACIrZUQnH2VIcghEEkAABCcgsAAiK2VEJxRlSIEQWzINEkAAD4ALRVJSOmVyckl1cGewACcWTGcjQzYaAUkVJBJEFzEAIitlRCcfZUhyCEQSQAAEJyCwACtMZyNDigEBi/8WKEsBUL5ESVcBIEsBVyEISwJXMSBLA1dRCE8EV2EITwVPBVBPBFBPA1BPAlBMUAGJigQCsTIKJw8pi/1Ni/wWTEsBUEkVFlcGAkxQgQMWJw5PA1C+RBeyGIAEK/PMWrIaTwKyGkyyGov+shqL/7IashqBBrIQIrIBs7Q+SVcEAExXAAQnExJESRUjEkQiU4v/iYoGACJJgABHBYv6FkkoTFBJTgK9RQFAAAMqsACLCL5ESVcAAUyBKVuMBCcKEkAABCcFsACL+4v9UIv+FklOAlCL/xZJTgJQAQFPA0xQJwlMUEm9RQFAAAQnHbAASb5ESVcIIIwBIluMBrxIi/5AADlGArGL/bIHi/+yCCOyECKyAbOxiwGyB4sGsggjshAisgGziwQjCUkWiwiBKU8Cu0AABosIIicSu4mL/Yv+cABFAUABvov8QAAEJxWwAIv8cghEi/0SQAAPgAtFUlI6ZXJyUndtbbAAiwYyEA9AAAQnFbAAIitlRCcUZUhXAAixIxZJTgIyCoEEr4v8shiABLNiNKWyGk8DshpPArIaTLIaJwyyGrIagQayECKyAbO0PklXBABMVwAEJxMSREkVIxJEIlNAAAQnFbAAIitlRCchTwRQSU4DJyFPBVBJTgKMACJZSU4CTgQiWUmMAhJEJxRlSElXAAhOAiJbTgKL/IASY29udHJvbGxlZF9hZGRyZXNzZUxOA0EA5UsCFSUSQQDdI0AAD4ALRVJSOmVyckl3bHSwALGL/LIYgARa3zOPshpMshqyGicMshonDLIaJwyyGoEGshAisgG2MhBPAwuyCEmyByOyECKyAbaL/BZPArIYgARoNeO8shqyGoABgLIaSwGyGoEGshAisgEiSYsCDEEAMosAVwIASwEkC0mMA1tJjAdBABq2SwJXAgCLA1uyEUsBshSLB7ISgQSyECKyASMIQv/HRgO2i/yyGIAEbMP2BrIagQayECKyAbMyEEmMBYsGDEH+OrGLBosFCYsBsgeyCCOyECKyAbNC/iQiQv8gRgKxi/2yFIv/shKL/rIRgQSyECKyAbOxiwGyB4sGsggjshAisgGzQv32", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
var HyperSwapParamsFactory = class _HyperSwapParamsFactory {
  /**
   * Gets available create ABI call param factories
   */
  static get create() {
    return {
      _resolveByMethod(params) {
        switch (params.method) {
          case "create":
          case "create(string,uint64)void":
            return _HyperSwapParamsFactory.create.create(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs create ABI call params for the HyperSwap smart contract using the create(string,uint64)void ABI method
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
            return _HyperSwapParamsFactory.update.update(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs update ABI call params for the HyperSwap smart contract using the update(string)void ABI method
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
   * Constructs a no op call for the offer(pay,byte[32],uint64,byte[32],uint64,uint64)void ABI method
   *
   * Creates a merkle tree based atomic payment/xfer group
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static offer(params) {
    return {
      ...params,
      method: "offer(pay,byte[32],uint64,byte[32],uint64,uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.root, params.args.leaves, params.args.participantsRoot, params.args.participantsLeaves, params.args.expiration]
    };
  }
  /**
   * Constructs a no op call for the accept(pay,uint64,byte[32][],byte[32])void ABI method
   *
   * Accepts an offer
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static accept(params) {
    return {
      ...params,
      method: "accept(pay,uint64,byte[32][],byte[32])void",
      args: Array.isArray(params.args) ? params.args : [params.args.mbrPayment, params.args.id, params.args.proof, params.args.terms]
    };
  }
  /**
   * Constructs a no op call for the escrow(pay,uint64,address,uint64,byte[32][])void ABI method
   *
   * Escrows the assets in the trade for a given leaf in the tree
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static escrow(params) {
    return {
      ...params,
      method: "escrow(pay,uint64,address,uint64,byte[32][])void",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.id, params.args.receiver, params.args.amount, params.args.proof]
    };
  }
  /**
   * Constructs a no op call for the escrowAsa(pay,axfer,uint64,address,uint64,uint64,byte[32][])void ABI method
   *
   * Escrows the assets in the trade for a given leaf in the tree
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static escrowAsa(params) {
    return {
      ...params,
      method: "escrowAsa(pay,axfer,uint64,address,uint64,uint64,byte[32][])void",
      args: Array.isArray(params.args) ? params.args : [params.args.mbrPayment, params.args.assetXfer, params.args.id, params.args.receiver, params.args.asset, params.args.amount, params.args.proof]
    };
  }
  /**
     * Constructs a no op call for the disburse(uint64,uint64,address,uint64,uint64)void ABI method
     *
    * Disburses the caller's own escrowed leaf. Kept for the existing plugin ABI; equivalent to
    `disburseFrom(id, Txn.sender, ...)`.
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static disburse(params) {
    return {
      ...params,
      method: "disburse(uint64,uint64,address,uint64,uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.id, params.args.receiverWallet, params.args.receiver, params.args.asset, params.args.amount]
    };
  }
  /**
     * Constructs a no op call for the disburseFrom(uint64,address,uint64,address,uint64,uint64)void ABI method
     *
    * Disburses any escrowed leaf. Permissionless: once every agreed leaf is funded, anyone can
    complete the swap, so no participant can withhold its own leaf.
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static disburseFrom(params) {
    return {
      ...params,
      method: "disburseFrom(uint64,address,uint64,address,uint64,uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.id, params.args.from, params.args.receiverWallet, params.args.receiver, params.args.asset, params.args.amount]
    };
  }
  /**
     * Constructs a no op call for the cancel(uint64,byte[32][])void ABI method
     *
    * Cancels an offer. Allowed while collecting acceptances or escrow, and in DISBURSING only after
    expiration and only if no leaf has been disbursed yet (`escrowed === leaves`), so a swap is
    either completed or fully unwound.
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static cancel(params) {
    return {
      ...params,
      method: "cancel(uint64,byte[32][])void",
      args: Array.isArray(params.args) ? params.args : [params.args.id, params.args.proof]
    };
  }
  /**
   * Constructs a no op call for the withdraw(uint64,address,uint64,uint64,byte[32][])void ABI method
   *
   * Withdraws your assets from a cancelled swap if they're escrowed
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static withdraw(params) {
    return {
      ...params,
      method: "withdraw(uint64,address,uint64,uint64,byte[32][])void",
      args: Array.isArray(params.args) ? params.args : [params.args.id, params.args.receiver, params.args.asset, params.args.amount, params.args.proof]
    };
  }
  /**
     * Constructs a no op call for the cleanupParticipant(uint64,address)void ABI method
     *
    * Cleans up participant box and refunds MBR
    Can only be called when offer is completed, cancelled+completed, or expired
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static cleanupParticipant(params) {
    return {
      ...params,
      method: "cleanupParticipant(uint64,address)void",
      args: Array.isArray(params.args) ? params.args : [params.args.id, params.args.participant]
    };
  }
  /**
     * Constructs a no op call for the cleanupOffer(uint64)void ABI method
     *
    * Cleans up the offer box after all participants have been cleaned up
    Can only be called when offer is completed, cancelled+completed, or expired
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static cleanupOffer(params) {
    return {
      ...params,
      method: "cleanupOffer(uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.id]
    };
  }
  /**
   * Constructs a no op call for the offerTerms(uint64)byte[32] ABI method
   *
   * The terms commitment `accept` expects for an offer. Clients should compute it independently.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static offerTerms(params) {
    return {
      ...params,
      method: "offerTerms(uint64)byte[32]",
      args: Array.isArray(params.args) ? params.args : [params.args.id]
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
   * Constructs a no op call for the mbr()(uint64,uint64,uint64,(uint64,uint64)) ABI method
   *
   * Shared storage costs for HyperSwap and its plugin using the current Meta layout.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static mbr(params) {
    return {
      ...params,
      method: "mbr()(uint64,uint64,uint64,(uint64,uint64))",
      args: Array.isArray(params.args) ? params.args : []
    };
  }
};
var HyperSwapFactory = (_class = class {
  /**
   * The underlying `AppFactory` for when you want to have more flexibility
   */
  
  /**
   * Creates a new instance of `HyperSwapFactory`
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
    return new HyperSwapClient(this.appFactory.getAppClientById(params));
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
    return new HyperSwapClient(await this.appFactory.getAppClientByCreatorAndName(params));
  }
  /**
   * Idempotently deploys the HyperSwap smart contract.
   *
   * @param params The arguments for the contract calls and any additional parameters for the call
   * @returns The deployment result
   */
  async deploy(params = {}) {
    var _a, _b;
    const result = await this.appFactory.deploy({
      ...params,
      createParams: ((_a = params.createParams) == null ? void 0 : _a.method) ? HyperSwapParamsFactory.create._resolveByMethod(params.createParams) : params.createParams ? params.createParams : void 0,
      updateParams: ((_b = params.updateParams) == null ? void 0 : _b.method) ? HyperSwapParamsFactory.update._resolveByMethod(params.updateParams) : params.updateParams ? params.updateParams : void 0
    });
    return { result: result.result, appClient: new HyperSwapClient(result.appClient) };
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
       * Creates a new instance of the HyperSwap smart contract using the create(string,uint64)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create params
       */
      create: (params) => {
        return this.appFactory.params.create(HyperSwapParamsFactory.create.create(params));
      }
    },
    /**
     * Gets available deployUpdate methods
     */
    deployUpdate: {
      /**
       * Updates an existing instance of the HyperSwap smart contract using the update(string)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The deployUpdate params
       */
      update: (params) => {
        return this.appFactory.params.deployUpdate(HyperSwapParamsFactory.update.update(params));
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
       * Creates a new instance of the HyperSwap smart contract using the create(string,uint64)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create transaction
       */
      create: (params) => {
        return this.appFactory.createTransaction.create(HyperSwapParamsFactory.create.create(params));
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
       * Creates a new instance of the HyperSwap smart contract using an ABI method call using the create(string,uint64)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create result
       */
      create: async (params) => {
        const result = await this.appFactory.send.create(HyperSwapParamsFactory.create.create(params));
        return { result: { ...result.result, return: result.result.return }, appClient: new HyperSwapClient(result.appClient) };
      }
    }
  }}
}, _class);
var HyperSwapClient = (_class2 = class _HyperSwapClient {
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
   * Returns a new `HyperSwapClient` client, resolving the app by creator address and name
   * using AlgoKit app deployment semantics (i.e. looking for the app creation transaction note).
   * @param params The parameters to create the app client
   */
  static async fromCreatorAndName(params) {
    return new _HyperSwapClient(await _appclient.AppClient.fromCreatorAndName({ ...params, appSpec: APP_SPEC }));
  }
  /**
   * Returns an `HyperSwapClient` instance for the current network based on
   * pre-determined network-specific app IDs specified in the ARC-56 app spec.
   *
   * If no IDs are in the app spec or the network isn't recognised, an error is thrown.
   * @param params The parameters to create the app client
   */
  static async fromNetwork(params) {
    return new _HyperSwapClient(await _appclient.AppClient.fromNetwork({ ...params, appSpec: APP_SPEC }));
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
       * Updates an existing instance of the HyperSwap smart contract using the `update(string)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The update params
       */
      update: (params) => {
        return this.appClient.params.update(HyperSwapParamsFactory.update.update(params));
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the HyperSwap smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.params.bare.clearState(params);
    },
    /**
     * Makes a call to the HyperSwap smart contract using the `offer(pay,byte[32],uint64,byte[32],uint64,uint64)void` ABI method.
     *
     * Creates a merkle tree based atomic payment/xfer group
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    offer: (params) => {
      return this.appClient.params.call(HyperSwapParamsFactory.offer(params));
    },
    /**
     * Makes a call to the HyperSwap smart contract using the `accept(pay,uint64,byte[32][],byte[32])void` ABI method.
     *
     * Accepts an offer
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    accept: (params) => {
      return this.appClient.params.call(HyperSwapParamsFactory.accept(params));
    },
    /**
     * Makes a call to the HyperSwap smart contract using the `escrow(pay,uint64,address,uint64,byte[32][])void` ABI method.
     *
     * Escrows the assets in the trade for a given leaf in the tree
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    escrow: (params) => {
      return this.appClient.params.call(HyperSwapParamsFactory.escrow(params));
    },
    /**
     * Makes a call to the HyperSwap smart contract using the `escrowAsa(pay,axfer,uint64,address,uint64,uint64,byte[32][])void` ABI method.
     *
     * Escrows the assets in the trade for a given leaf in the tree
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    escrowAsa: (params) => {
      return this.appClient.params.call(HyperSwapParamsFactory.escrowAsa(params));
    },
    /**
         * Makes a call to the HyperSwap smart contract using the `disburse(uint64,uint64,address,uint64,uint64)void` ABI method.
         *
        * Disburses the caller's own escrowed leaf. Kept for the existing plugin ABI; equivalent to
        `disburseFrom(id, Txn.sender, ...)`.
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    disburse: (params) => {
      return this.appClient.params.call(HyperSwapParamsFactory.disburse(params));
    },
    /**
         * Makes a call to the HyperSwap smart contract using the `disburseFrom(uint64,address,uint64,address,uint64,uint64)void` ABI method.
         *
        * Disburses any escrowed leaf. Permissionless: once every agreed leaf is funded, anyone can
        complete the swap, so no participant can withhold its own leaf.
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    disburseFrom: (params) => {
      return this.appClient.params.call(HyperSwapParamsFactory.disburseFrom(params));
    },
    /**
         * Makes a call to the HyperSwap smart contract using the `cancel(uint64,byte[32][])void` ABI method.
         *
        * Cancels an offer. Allowed while collecting acceptances or escrow, and in DISBURSING only after
        expiration and only if no leaf has been disbursed yet (`escrowed === leaves`), so a swap is
        either completed or fully unwound.
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    cancel: (params) => {
      return this.appClient.params.call(HyperSwapParamsFactory.cancel(params));
    },
    /**
     * Makes a call to the HyperSwap smart contract using the `withdraw(uint64,address,uint64,uint64,byte[32][])void` ABI method.
     *
     * Withdraws your assets from a cancelled swap if they're escrowed
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    withdraw: (params) => {
      return this.appClient.params.call(HyperSwapParamsFactory.withdraw(params));
    },
    /**
         * Makes a call to the HyperSwap smart contract using the `cleanupParticipant(uint64,address)void` ABI method.
         *
        * Cleans up participant box and refunds MBR
        Can only be called when offer is completed, cancelled+completed, or expired
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    cleanupParticipant: (params) => {
      return this.appClient.params.call(HyperSwapParamsFactory.cleanupParticipant(params));
    },
    /**
         * Makes a call to the HyperSwap smart contract using the `cleanupOffer(uint64)void` ABI method.
         *
        * Cleans up the offer box after all participants have been cleaned up
        Can only be called when offer is completed, cancelled+completed, or expired
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    cleanupOffer: (params) => {
      return this.appClient.params.call(HyperSwapParamsFactory.cleanupOffer(params));
    },
    /**
     * Makes a call to the HyperSwap smart contract using the `offerTerms(uint64)byte[32]` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * The terms commitment `accept` expects for an offer. Clients should compute it independently.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    offerTerms: (params) => {
      return this.appClient.params.call(HyperSwapParamsFactory.offerTerms(params));
    },
    /**
     * Makes a call to the HyperSwap smart contract using the `optIn(pay,uint64)void` ABI method.
     *
     * optin tells the contract to opt into an asa
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    optIn: (params) => {
      return this.appClient.params.call(HyperSwapParamsFactory.optIn(params));
    },
    /**
     * Makes a call to the HyperSwap smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    updateAkitaDao: (params) => {
      return this.appClient.params.call(HyperSwapParamsFactory.updateAkitaDao(params));
    },
    /**
     * Makes a call to the HyperSwap smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    opUp: (params = { args: [] }) => {
      return this.appClient.params.call(HyperSwapParamsFactory.opUp(params));
    },
    /**
     * Makes a call to the HyperSwap smart contract using the `mbr()(uint64,uint64,uint64,(uint64,uint64))` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * Shared storage costs for HyperSwap and its plugin using the current Meta layout.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    mbr: (params = { args: [] }) => {
      return this.appClient.params.call(HyperSwapParamsFactory.mbr(params));
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
       * Updates an existing instance of the HyperSwap smart contract using the `update(string)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The update transaction
       */
      update: (params) => {
        return this.appClient.createTransaction.update(HyperSwapParamsFactory.update.update(params));
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the HyperSwap smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.createTransaction.bare.clearState(params);
    },
    /**
     * Makes a call to the HyperSwap smart contract using the `offer(pay,byte[32],uint64,byte[32],uint64,uint64)void` ABI method.
     *
     * Creates a merkle tree based atomic payment/xfer group
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    offer: (params) => {
      return this.appClient.createTransaction.call(HyperSwapParamsFactory.offer(params));
    },
    /**
     * Makes a call to the HyperSwap smart contract using the `accept(pay,uint64,byte[32][],byte[32])void` ABI method.
     *
     * Accepts an offer
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    accept: (params) => {
      return this.appClient.createTransaction.call(HyperSwapParamsFactory.accept(params));
    },
    /**
     * Makes a call to the HyperSwap smart contract using the `escrow(pay,uint64,address,uint64,byte[32][])void` ABI method.
     *
     * Escrows the assets in the trade for a given leaf in the tree
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    escrow: (params) => {
      return this.appClient.createTransaction.call(HyperSwapParamsFactory.escrow(params));
    },
    /**
     * Makes a call to the HyperSwap smart contract using the `escrowAsa(pay,axfer,uint64,address,uint64,uint64,byte[32][])void` ABI method.
     *
     * Escrows the assets in the trade for a given leaf in the tree
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    escrowAsa: (params) => {
      return this.appClient.createTransaction.call(HyperSwapParamsFactory.escrowAsa(params));
    },
    /**
         * Makes a call to the HyperSwap smart contract using the `disburse(uint64,uint64,address,uint64,uint64)void` ABI method.
         *
        * Disburses the caller's own escrowed leaf. Kept for the existing plugin ABI; equivalent to
        `disburseFrom(id, Txn.sender, ...)`.
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    disburse: (params) => {
      return this.appClient.createTransaction.call(HyperSwapParamsFactory.disburse(params));
    },
    /**
         * Makes a call to the HyperSwap smart contract using the `disburseFrom(uint64,address,uint64,address,uint64,uint64)void` ABI method.
         *
        * Disburses any escrowed leaf. Permissionless: once every agreed leaf is funded, anyone can
        complete the swap, so no participant can withhold its own leaf.
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    disburseFrom: (params) => {
      return this.appClient.createTransaction.call(HyperSwapParamsFactory.disburseFrom(params));
    },
    /**
         * Makes a call to the HyperSwap smart contract using the `cancel(uint64,byte[32][])void` ABI method.
         *
        * Cancels an offer. Allowed while collecting acceptances or escrow, and in DISBURSING only after
        expiration and only if no leaf has been disbursed yet (`escrowed === leaves`), so a swap is
        either completed or fully unwound.
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    cancel: (params) => {
      return this.appClient.createTransaction.call(HyperSwapParamsFactory.cancel(params));
    },
    /**
     * Makes a call to the HyperSwap smart contract using the `withdraw(uint64,address,uint64,uint64,byte[32][])void` ABI method.
     *
     * Withdraws your assets from a cancelled swap if they're escrowed
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    withdraw: (params) => {
      return this.appClient.createTransaction.call(HyperSwapParamsFactory.withdraw(params));
    },
    /**
         * Makes a call to the HyperSwap smart contract using the `cleanupParticipant(uint64,address)void` ABI method.
         *
        * Cleans up participant box and refunds MBR
        Can only be called when offer is completed, cancelled+completed, or expired
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    cleanupParticipant: (params) => {
      return this.appClient.createTransaction.call(HyperSwapParamsFactory.cleanupParticipant(params));
    },
    /**
         * Makes a call to the HyperSwap smart contract using the `cleanupOffer(uint64)void` ABI method.
         *
        * Cleans up the offer box after all participants have been cleaned up
        Can only be called when offer is completed, cancelled+completed, or expired
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    cleanupOffer: (params) => {
      return this.appClient.createTransaction.call(HyperSwapParamsFactory.cleanupOffer(params));
    },
    /**
     * Makes a call to the HyperSwap smart contract using the `offerTerms(uint64)byte[32]` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * The terms commitment `accept` expects for an offer. Clients should compute it independently.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    offerTerms: (params) => {
      return this.appClient.createTransaction.call(HyperSwapParamsFactory.offerTerms(params));
    },
    /**
     * Makes a call to the HyperSwap smart contract using the `optIn(pay,uint64)void` ABI method.
     *
     * optin tells the contract to opt into an asa
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    optIn: (params) => {
      return this.appClient.createTransaction.call(HyperSwapParamsFactory.optIn(params));
    },
    /**
     * Makes a call to the HyperSwap smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    updateAkitaDao: (params) => {
      return this.appClient.createTransaction.call(HyperSwapParamsFactory.updateAkitaDao(params));
    },
    /**
     * Makes a call to the HyperSwap smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    opUp: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(HyperSwapParamsFactory.opUp(params));
    },
    /**
     * Makes a call to the HyperSwap smart contract using the `mbr()(uint64,uint64,uint64,(uint64,uint64))` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * Shared storage costs for HyperSwap and its plugin using the current Meta layout.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    mbr: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(HyperSwapParamsFactory.mbr(params));
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
       * Updates an existing instance of the HyperSwap smart contract using the `update(string)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The update result
       */
      update: async (params) => {
        const result = await this.appClient.send.update(HyperSwapParamsFactory.update.update(params));
        return { ...result, return: result.return };
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the HyperSwap smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.send.bare.clearState(params);
    },
    /**
     * Makes a call to the HyperSwap smart contract using the `offer(pay,byte[32],uint64,byte[32],uint64,uint64)void` ABI method.
     *
     * Creates a merkle tree based atomic payment/xfer group
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    offer: async (params) => {
      const result = await this.appClient.send.call(HyperSwapParamsFactory.offer(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the HyperSwap smart contract using the `accept(pay,uint64,byte[32][],byte[32])void` ABI method.
     *
     * Accepts an offer
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    accept: async (params) => {
      const result = await this.appClient.send.call(HyperSwapParamsFactory.accept(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the HyperSwap smart contract using the `escrow(pay,uint64,address,uint64,byte[32][])void` ABI method.
     *
     * Escrows the assets in the trade for a given leaf in the tree
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    escrow: async (params) => {
      const result = await this.appClient.send.call(HyperSwapParamsFactory.escrow(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the HyperSwap smart contract using the `escrowAsa(pay,axfer,uint64,address,uint64,uint64,byte[32][])void` ABI method.
     *
     * Escrows the assets in the trade for a given leaf in the tree
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    escrowAsa: async (params) => {
      const result = await this.appClient.send.call(HyperSwapParamsFactory.escrowAsa(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the HyperSwap smart contract using the `disburse(uint64,uint64,address,uint64,uint64)void` ABI method.
         *
        * Disburses the caller's own escrowed leaf. Kept for the existing plugin ABI; equivalent to
        `disburseFrom(id, Txn.sender, ...)`.
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    disburse: async (params) => {
      const result = await this.appClient.send.call(HyperSwapParamsFactory.disburse(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the HyperSwap smart contract using the `disburseFrom(uint64,address,uint64,address,uint64,uint64)void` ABI method.
         *
        * Disburses any escrowed leaf. Permissionless: once every agreed leaf is funded, anyone can
        complete the swap, so no participant can withhold its own leaf.
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    disburseFrom: async (params) => {
      const result = await this.appClient.send.call(HyperSwapParamsFactory.disburseFrom(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the HyperSwap smart contract using the `cancel(uint64,byte[32][])void` ABI method.
         *
        * Cancels an offer. Allowed while collecting acceptances or escrow, and in DISBURSING only after
        expiration and only if no leaf has been disbursed yet (`escrowed === leaves`), so a swap is
        either completed or fully unwound.
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    cancel: async (params) => {
      const result = await this.appClient.send.call(HyperSwapParamsFactory.cancel(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the HyperSwap smart contract using the `withdraw(uint64,address,uint64,uint64,byte[32][])void` ABI method.
     *
     * Withdraws your assets from a cancelled swap if they're escrowed
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    withdraw: async (params) => {
      const result = await this.appClient.send.call(HyperSwapParamsFactory.withdraw(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the HyperSwap smart contract using the `cleanupParticipant(uint64,address)void` ABI method.
         *
        * Cleans up participant box and refunds MBR
        Can only be called when offer is completed, cancelled+completed, or expired
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    cleanupParticipant: async (params) => {
      const result = await this.appClient.send.call(HyperSwapParamsFactory.cleanupParticipant(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the HyperSwap smart contract using the `cleanupOffer(uint64)void` ABI method.
         *
        * Cleans up the offer box after all participants have been cleaned up
        Can only be called when offer is completed, cancelled+completed, or expired
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    cleanupOffer: async (params) => {
      const result = await this.appClient.send.call(HyperSwapParamsFactory.cleanupOffer(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the HyperSwap smart contract using the `offerTerms(uint64)byte[32]` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * The terms commitment `accept` expects for an offer. Clients should compute it independently.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    offerTerms: async (params) => {
      const result = await this.appClient.send.call(HyperSwapParamsFactory.offerTerms(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the HyperSwap smart contract using the `optIn(pay,uint64)void` ABI method.
     *
     * optin tells the contract to opt into an asa
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    optIn: async (params) => {
      const result = await this.appClient.send.call(HyperSwapParamsFactory.optIn(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the HyperSwap smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    updateAkitaDao: async (params) => {
      const result = await this.appClient.send.call(HyperSwapParamsFactory.updateAkitaDao(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the HyperSwap smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    opUp: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(HyperSwapParamsFactory.opUp(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the HyperSwap smart contract using the `mbr()(uint64,uint64,uint64,(uint64,uint64))` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * Shared storage costs for HyperSwap and its plugin using the current Meta layout.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    mbr: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(HyperSwapParamsFactory.mbr(params));
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
    return new _HyperSwapClient(this.appClient.clone(params));
  }
  /**
   * Makes a readonly (simulated) call to the HyperSwap smart contract using the `offerTerms(uint64)byte[32]` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * The terms commitment `accept` expects for an offer. Clients should compute it independently.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async offerTerms(params) {
    const result = await this.appClient.send.call(HyperSwapParamsFactory.offerTerms(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the HyperSwap smart contract using the `mbr()(uint64,uint64,uint64,(uint64,uint64))` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * Shared storage costs for HyperSwap and its plugin using the current Meta layout.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async mbr(params = { args: [] }) {
    const result = await this.appClient.send.call(HyperSwapParamsFactory.mbr(params));
    return result.return;
  }
  /**
   * Methods to access state for the current HyperSwap app
   */
  __init7() {this.state = {
    /**
     * Methods to access global state for the current HyperSwap app
     */
    global: {
      /**
       * Get all current keyed values from global state
       */
      getAll: async () => {
        const result = await this.appClient.state.global.getAll();
        return {
          offerCursor: result.offerCursor,
          version: result.version,
          akitaDao: result.akitaDAO
        };
      },
      /**
       * Get the current value of the offerCursor key in global state
       */
      offerCursor: async () => {
        return await this.appClient.state.global.getValue("offerCursor");
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
     * Methods to access box state for the current HyperSwap app
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
       * Get values from the offers map in box state
       */
      offers: {
        /**
         * Get all current values of the offers map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("offers");
        },
        /**
         * Get a current value of the offers map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("offers", key);
        }
      },
      /**
       * Get values from the participants map in box state
       */
      participants: {
        /**
         * Get all current values of the participants map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("participants");
        },
        /**
         * Get a current value of the participants map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("participants", key);
        }
      },
      /**
       * Get values from the hashes map in box state
       */
      hashes: {
        /**
         * Get all current values of the hashes map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("hashes");
        },
        /**
         * Get a current value of the hashes map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("hashes", key);
        }
      },
      /**
       * Get values from the offerRefunds map in box state
       */
      offerRefunds: {
        /**
         * Get all current values of the offerRefunds map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("offerRefunds");
        },
        /**
         * Get a current value of the offerRefunds map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("offerRefunds", key);
        }
      },
      /**
       * Get values from the offerRegistry map in box state
       */
      offerRegistry: {
        /**
         * Get all current values of the offerRegistry map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("offerRegistry");
        },
        /**
         * Get a current value of the offerRegistry map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("offerRegistry", key);
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
       * Add a offer(pay,byte[32],uint64,byte[32],uint64,uint64)void method call against the HyperSwap contract
       */
      offer(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.offer(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a accept(pay,uint64,byte[32][],byte[32])void method call against the HyperSwap contract
       */
      accept(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.accept(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a escrow(pay,uint64,address,uint64,byte[32][])void method call against the HyperSwap contract
       */
      escrow(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.escrow(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a escrowAsa(pay,axfer,uint64,address,uint64,uint64,byte[32][])void method call against the HyperSwap contract
       */
      escrowAsa(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.escrowAsa(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a disburse(uint64,uint64,address,uint64,uint64)void method call against the HyperSwap contract
       */
      disburse(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.disburse(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a disburseFrom(uint64,address,uint64,address,uint64,uint64)void method call against the HyperSwap contract
       */
      disburseFrom(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.disburseFrom(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a cancel(uint64,byte[32][])void method call against the HyperSwap contract
       */
      cancel(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.cancel(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a withdraw(uint64,address,uint64,uint64,byte[32][])void method call against the HyperSwap contract
       */
      withdraw(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.withdraw(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a cleanupParticipant(uint64,address)void method call against the HyperSwap contract
       */
      cleanupParticipant(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.cleanupParticipant(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a cleanupOffer(uint64)void method call against the HyperSwap contract
       */
      cleanupOffer(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.cleanupOffer(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a offerTerms(uint64)byte[32] method call against the HyperSwap contract
       */
      offerTerms(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.offerTerms(params)));
        resultMappers.push((v) => client.decodeReturnValue("offerTerms(uint64)byte[32]", v));
        return this;
      },
      /**
       * Add a optIn(pay,uint64)void method call against the HyperSwap contract
       */
      optIn(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.optIn(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a updateAkitaDAO(uint64)void method call against the HyperSwap contract
       */
      updateAkitaDao(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateAkitaDao(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a opUp()void method call against the HyperSwap contract
       */
      opUp(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.opUp(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a mbr()(uint64,uint64,uint64,(uint64,uint64)) method call against the HyperSwap contract
       */
      mbr(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.mbr(params)));
        resultMappers.push((v) => client.decodeReturnValue("mbr()(uint64,uint64,uint64,(uint64,uint64))", v));
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
       * Add a clear state call to the HyperSwap contract
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

// src/hyper-swap/errors.ts
var HYPER_SWAP_ERROR_MESSAGES = _chunkQ5IKYOZSjs.withErrorCodeAliases.call(void 0, {
  // --- Offer validation ---------------------------------------------------
  BROT: "Offer and participants roots cannot be the same",
  OFEX: "Offer has expired",
  NOFR: "Offer not found",
  OTLG: "Offer expiration is further out than the 30-day maximum",
  TMIS: "Offer terms do not match the terms you validated",
  // --- Participants -------------------------------------------------------
  NPRT: "Not a participant in this swap",
  EACC: "Already accepted this offer",
  NPFD: "Participant not found",
  PNCL: "All participants must be cleaned up first",
  // --- State machine ------------------------------------------------------
  ISTE: "Offer is in the wrong state for this action",
  NACP: "Must have accepted to cancel",
  // --- Escrow / leaves ----------------------------------------------------
  CVLF: "Cannot verify leaf",
  LAES: "Leaf is already escrowed",
  LNES: "Leaf is not escrowed",
  NTWD: "Nothing to withdraw",
  // --- Disbursal ----------------------------------------------------------
  RNOI: "Receiver is not opted into asset",
  RWMM: "Receiver wallet address does not match receiver"
});
var translateHyperSwapError = _chunkQ5IKYOZSjs.makeErrorTranslator.call(void 0, HYPER_SWAP_ERROR_MESSAGES);

// src/hyper-swap/types.ts
var OfferState = /* @__PURE__ */ ((OfferState2) => {
  OfferState2[OfferState2["Offered"] = 10] = "Offered";
  OfferState2[OfferState2["Escrowing"] = 20] = "Escrowing";
  OfferState2[OfferState2["Disbursing"] = 30] = "Disbursing";
  OfferState2[OfferState2["Completed"] = 40] = "Completed";
  OfferState2[OfferState2["Cancelled"] = 50] = "Cancelled";
  OfferState2[OfferState2["CancelCompleted"] = 60] = "CancelCompleted";
  return OfferState2;
})(OfferState || {});

// src/hyper-swap/roots.ts
var _algosdk = require('algosdk');
var rootKeyType = _algosdk.ABIType.from("(address,byte[])");
function hyperSwapRootName(id, participants) {
  return new Uint8Array([participants ? 112 : 116, ..._algosdk.encodeUint64.call(void 0, id)]);
}
function hyperSwapRootBoxName(address, id, participants, layout = "Meta") {
  if (layout === "Meta") return new Uint8Array([114, ..._algosdk.decodeAddress.call(void 0, address).publicKey, ...hyperSwapRootName(id, participants)]);
  return new Uint8Array([114, ...rootKeyType.encode([address, hyperSwapRootName(id, participants)])]);
}

// src/hyper-swap/index.ts
var HyperSwapSDK = class extends _chunkR54UGCHPjs.BaseSDK {
  constructor(params) {
    super({ factory: HyperSwapFactory, ...params }, _chunkVE7OXZWIjs.ENV_VAR_NAMES.HYPER_SWAP_APP_ID);
  }
  // ========== Read Methods ==========
  /**
   * Gets the MBR data for HyperSwap operations.
   */
  async mbr() {
    const mbr = await this.client.mbr();
    return {
      offers: mbr.offers,
      participants: mbr.participants,
      hashes: mbr.hashes,
      mm: {
        root: mbr.mm.root,
        data: mbr.mm.data
      }
    };
  }
  /**
   * Gets an offer by its ID.
   */
  async getOffer({ id }) {
    const offer = await this.client.state.box.offers.value(id);
    if (offer === void 0) {
      throw new Error(`Offer ${id} not found`);
    }
    return {
      state: Number(offer.state),
      root: offer.root,
      leaves: offer.leaves,
      escrowed: offer.escrowed,
      participantsRoot: offer.participantsRoot,
      participantsLeaves: offer.participantsLeaves,
      acceptances: offer.acceptances,
      expiration: offer.expiration
    };
  }
  /**
   * The terms commitment the contract expects for an offer. Use it only to cross-check:
   * `accept` derives the commitment from the full lists and never takes it from here.
   */
  async offerTerms({ id }) {
    const result = await this.client.offerTerms({ args: { id } });
    return new Uint8Array(result);
  }
  // ========== Write Methods ==========
  /**
   * Opts the HyperSwap contract into an asset.
   */
  async optIn({ sender, signer, asset }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const payment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: _algokitutils.microAlgo.call(void 0, 1e5),
      // Asset opt-in MBR
      receiver: this.client.appAddress
    });
    await this.client.send.optIn({
      ...sendParams,
      args: {
        payment,
        asset
      }
    });
  }
  /**
   * Creates a new offer for an atomic multi-party trade.
   */
  async offer({
    sender,
    signer,
    root,
    leaves,
    participantsRoot,
    participantsLeaves,
    expiration
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const mbrData = await this.mbr();
    const metaMerklesCost = mbrData.mm.root + mbrData.mm.data;
    const totalMbr = mbrData.offers + mbrData.participants + metaMerklesCost * 2n;
    const payment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: _algokitutils.microAlgo.call(void 0, totalMbr),
      receiver: this.client.appAddress
    });
    await this.client.send.offer({
      ...sendParams,
      args: {
        payment,
        root,
        leaves,
        participantsRoot,
        participantsLeaves,
        expiration
      }
    });
  }
  /**
   * Accepts an offer as a participant.
   *
   * Takes the full, ordered leaf and participant lists the offeror shared. The offer is read from
   * the chain and checked against them (`validateOffer`), and the terms commitment sent to the
   * contract is derived here. An offer that under-declares its leaves or participants, repeats
   * one, or does not match the lists is refused before anything is signed. There is no way to pass
   * a ready-made `terms` value through this method.
   */
  async accept({ sender, signer, id, leaves, participants, proof }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const terms = _chunkYKKIQIROjs.validateOffer.call(void 0, { id, offer: await this.getOffer({ id }), leaves, participants });
    let participantProof = proof;
    if (participantProof === void 0) {
      const acceptor = sendParams.sender.toString();
      const index = participants.indexOf(acceptor);
      if (index < 0) throw new Error(`HyperSwap acceptor ${acceptor} is not in the participant list`);
      participantProof = _chunkYKKIQIROjs.hyperSwapParticipantTree.call(void 0, participants).getProof(index);
    }
    const mbrData = await this.mbr();
    const mbrPayment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: _algokitutils.microAlgo.call(void 0, mbrData.participants),
      receiver: this.client.appAddress
    });
    await this.client.send.accept({
      ...sendParams,
      args: {
        mbrPayment,
        id,
        proof: participantProof,
        terms
      }
    });
  }
  /**
   * Escrows assets for a trade leaf.
   * Use `isAsa: true` and `asset` for ASA escrows, otherwise ALGO is used.
   */
  async escrow({
    sender,
    signer,
    id,
    receiver,
    amount,
    proof,
    isAsa = false,
    ...rest
  }) {
    var _a, _b;
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const mbrData = await this.mbr();
    if (isAsa) {
      const { asset } = rest;
      const group = this.client.newGroup();
      const holdings = await this.client.algorand.account.getInformation(this.client.appAddress);
      if (!((_a = holdings.assets) == null ? void 0 : _a.some((holding) => holding.assetId === BigInt(asset)))) {
        group.optIn({
          ...sendParams,
          args: {
            payment: this.client.algorand.createTransaction.payment({
              ...sendParams,
              receiver: this.client.appAddress,
              amount: _algokitutils.microAlgo.call(void 0, 1e5)
            }),
            asset
          }
        });
      }
      const recipient = await this.client.algorand.account.getInformation(receiver);
      const recipientOptIn = ((_b = recipient.assets) == null ? void 0 : _b.some((holding) => holding.assetId === BigInt(asset))) ? 0n : 100000n;
      const mbrPayment = await this.client.algorand.createTransaction.payment({
        ...sendParams,
        amount: _algokitutils.microAlgo.call(void 0, mbrData.hashes + recipientOptIn),
        receiver: this.client.appAddress
      });
      const assetXfer = await this.client.algorand.createTransaction.assetTransfer({
        ...sendParams,
        amount: BigInt(amount),
        assetId: BigInt(asset),
        receiver: this.client.appAddress
      });
      group.escrowAsa({
        ...sendParams,
        args: {
          mbrPayment,
          assetXfer,
          id,
          receiver,
          asset,
          amount,
          proof
        }
      });
      await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
    } else {
      const payment = await this.client.algorand.createTransaction.payment({
        ...sendParams,
        amount: _algokitutils.microAlgo.call(void 0, BigInt(amount) + mbrData.hashes),
        receiver: this.client.appAddress
      });
      await this.client.send.escrow({
        ...sendParams,
        args: {
          payment,
          id,
          receiver,
          amount,
          proof
        }
      });
    }
  }
  /**
   * Disburses assets for a trade leaf.
   * @param receiverWallet - The receiver's ARC58 wallet app ID (0 if not an ARC58 wallet)
   */
  async disburse({ sender, signer, id, receiverWallet, receiver, asset, amount }) {
    const sendParams = this.getSendParams({ sender, signer });
    await this.client.send.disburse({
      ...sendParams,
      args: {
        id,
        receiverWallet,
        receiver,
        asset,
        amount
      }
    });
  }
  /**
   * Disburses any escrowed leaf. Anyone may call this once the offer is DISBURSING.
   */
  async disburseFrom({ sender, signer, id, from, receiverWallet, receiver, asset, amount }) {
    const sendParams = this.getSendParams({ sender, signer });
    await this.client.send.disburseFrom({
      ...sendParams,
      args: { id, from, receiverWallet, receiver, asset, amount }
    });
  }
  /**
   * Disburses every given leaf in one atomic group (at most 16), so either the whole swap
   * settles or nothing moves and a stuck leaf leaves the offer cancellable.
   */
  async disburseAll({ sender, signer, id, leaves }) {
    if (leaves.length === 0) return;
    if (leaves.length > 16) throw new Error("disburseAll supports at most 16 leaves per atomic group");
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const group = this.client.newGroup();
    for (const { from, receiver, asset, amount, receiverWallet } of leaves) {
      group.disburseFrom({
        ...sendParams,
        args: { id, from, receiverWallet: _nullishCoalesce(receiverWallet, () => ( 0n)), receiver, asset, amount }
      });
    }
    await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
  }
  /**
   * Cancels an offer.
   */
  async cancel({ sender, signer, id, proof }) {
    const sendParams = this.getSendParams({ sender, signer });
    await this.client.send.cancel({
      ...sendParams,
      args: {
        id,
        proof
      }
    });
  }
  /**
   * Withdraws escrowed assets from a cancelled offer.
   */
  async withdraw({ sender, signer, id, receiver, asset, amount, proof }) {
    const sendParams = this.getSendParams({ sender, signer });
    await this.client.send.withdraw({
      ...sendParams,
      args: {
        id,
        receiver,
        asset,
        amount,
        proof
      }
    });
  }
};








exports.HYPER_SWAP_ERROR_MESSAGES = HYPER_SWAP_ERROR_MESSAGES; exports.translateHyperSwapError = translateHyperSwapError; exports.OfferState = OfferState; exports.hyperSwapRootName = hyperSwapRootName; exports.hyperSwapRootBoxName = hyperSwapRootBoxName; exports.HyperSwapSDK = HyperSwapSDK;
//# sourceMappingURL=chunk-JOMZOH4B.js.map
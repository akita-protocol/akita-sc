"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } var _class; var _class2;


var _chunkYKKIQIROjs = require('./chunk-YKKIQIRO.js');



var _chunkZGCVKZRLjs = require('./chunk-ZGCVKZRL.js');


var _chunkDAPZMPG6js = require('./chunk-DAPZMPG6.js');


var _chunkNTQ4SNRMjs = require('./chunk-NTQ4SNRM.js');

// src/hyper-swap/index.ts
var _algokitutils = require('@algorandfoundation/algokit-utils');

// src/generated/HyperSwapClient.ts
var _apparc56 = require('@algorandfoundation/algokit-utils/types/app-arc56');


var _appclient = require('@algorandfoundation/algokit-utils/types/app-client');
var _appfactory = require('@algorandfoundation/algokit-utils/types/app-factory');
var APP_SPEC = { "name": "HyperSwap", "structs": { "Object57CB3C34": [{ "name": "root", "type": "uint64" }, { "name": "data", "type": "uint64" }], "HashKey": [{ "name": "id", "type": "uint64" }, { "name": "hash", "type": "byte[32]" }], "HyperSwapMBRData": [{ "name": "offers", "type": "uint64" }, { "name": "participants", "type": "uint64" }, { "name": "hashes", "type": "uint64" }, { "name": "mm", "type": "Object57CB3C34" }], "OfferValue": [{ "name": "state", "type": "uint8" }, { "name": "root", "type": "byte[32]" }, { "name": "leaves", "type": "uint64" }, { "name": "escrowed", "type": "uint64" }, { "name": "participantsRoot", "type": "byte[32]" }, { "name": "participantsLeaves", "type": "uint64" }, { "name": "acceptances", "type": "uint64" }, { "name": "expiration", "type": "uint64" }], "ParticipantKey": [{ "name": "id", "type": "uint64" }, { "name": "address", "type": "address" }], "RefundValue": [{ "name": "amount", "type": "uint64" }, { "name": "payor", "type": "address" }] }, "methods": [{ "name": "create", "args": [{ "type": "string", "name": "version" }, { "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "offer", "args": [{ "type": "pay", "name": "payment" }, { "type": "byte[32]", "name": "root", "desc": "the merkle tree root of trades consisting of from address, recipient address, asset id & amount" }, { "type": "uint64", "name": "leaves", "desc": "the number of leaves in the tree" }, { "type": "byte[32]", "name": "participantsRoot", "desc": "the merkle tree root of participating addresses" }, { "type": "uint64", "name": "participantsLeaves" }, { "type": "uint64", "name": "expiration", "desc": "the unix timestamp that the offer auto-expires at; at most `MaxOfferDuration` from now" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Creates a merkle tree based atomic payment/xfer group", "events": [], "recommendations": {} }, { "name": "accept", "args": [{ "type": "pay", "name": "mbrPayment", "desc": "the payment to cover the MBR" }, { "type": "uint64", "name": "id", "desc": "the id of the offer being accepted" }, { "type": "byte[32][]", "name": "proof", "desc": "the bytes32 array proof of inclusion in the participants list" }, { "type": "byte[32]", "name": "terms", "desc": "`offerTerms(id)` as computed by the participant from the full leaf and participant lists" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Accepts an offer", "events": [], "recommendations": {} }, { "name": "escrow", "args": [{ "type": "pay", "name": "payment", "desc": "the leaf's ALGO principal plus the hash MBR, from any payer" }, { "type": "uint64", "name": "id", "desc": "the id of the offer" }, { "type": "address", "name": "receiver", "desc": "the recipient in the offer leaf" }, { "type": "uint64", "name": "amount", "desc": "the amount in the offer leaf" }, { "type": "byte[32][]", "name": "proof", "desc": "the proof to verify the details are part of the tree" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Escrows the assets in the trade for a given leaf in the tree", "events": [], "recommendations": {} }, { "name": "escrowAsa", "args": [{ "type": "pay", "name": "mbrPayment", "desc": "the payment to cover the MBR" }, { "type": "axfer", "name": "assetXfer", "desc": "the asset transfer to escrow the asa, sent by the participant (no clawback)" }, { "type": "uint64", "name": "id", "desc": "the id of the offer" }, { "type": "address", "name": "receiver", "desc": "the recipient in the offer leaf" }, { "type": "uint64", "name": "asset", "desc": "the asset in the offer leaf" }, { "type": "uint64", "name": "amount", "desc": "the amount in the offer leaf" }, { "type": "byte[32][]", "name": "proof", "desc": "the proof to verify the details are part of the tree" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Escrows the assets in the trade for a given leaf in the tree", "events": [], "recommendations": {} }, { "name": "disburse", "args": [{ "type": "uint64", "name": "id", "desc": "the id of the offer" }, { "type": "uint64", "name": "receiverWallet", "desc": "the receiver's ARC58 wallet app id (0 if not an ARC58 wallet)" }, { "type": "address", "name": "receiver", "desc": "the recipient address in the leaf" }, { "type": "uint64", "name": "asset", "desc": "the asset being transferred" }, { "type": "uint64", "name": "amount", "desc": "the amount being transferred" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Disburses the caller's own escrowed leaf. Kept for the existing plugin ABI; equivalent to\n`disburseFrom(id, Txn.sender, ...)`.", "events": [], "recommendations": {} }, { "name": "disburseFrom", "args": [{ "type": "uint64", "name": "id", "desc": "the id of the offer" }, { "type": "address", "name": "from", "desc": "the funder (sender) in the leaf" }, { "type": "uint64", "name": "receiverWallet", "desc": "the receiver's ARC58 wallet app id (0 if not an ARC58 wallet)" }, { "type": "address", "name": "receiver", "desc": "the recipient address in the leaf" }, { "type": "uint64", "name": "asset", "desc": "the asset being transferred" }, { "type": "uint64", "name": "amount", "desc": "the amount being transferred" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Disburses any escrowed leaf. Permissionless: once every agreed leaf is funded, anyone can\ncomplete the swap, so no participant can withhold its own leaf.", "events": [], "recommendations": {} }, { "name": "cancel", "args": [{ "type": "uint64", "name": "id", "desc": "the id of the offer being cancelled" }, { "type": "byte[32][]", "name": "proof", "desc": "unused; kept for ABI compatibility (membership was proven at accept)" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Cancels an offer. Allowed while collecting acceptances or escrow, and in DISBURSING only after\nexpiration and only if no leaf has been disbursed yet (`escrowed === leaves`), so a swap is\neither completed or fully unwound.", "events": [], "recommendations": {} }, { "name": "withdraw", "args": [{ "type": "uint64", "name": "id", "desc": "the id of the cancelled offer" }, { "type": "address", "name": "receiver", "desc": "the receiver of the leaf's swap" }, { "type": "uint64", "name": "asset", "desc": "the asset of the leaf's swap" }, { "type": "uint64", "name": "amount", "desc": "the amount of the leaf's swap" }, { "type": "byte[32][]", "name": "proof", "desc": "unused; kept for ABI compatibility (the hash box proves a verified escrow)" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Withdraws your assets from a cancelled swap if they're escrowed", "events": [], "recommendations": {} }, { "name": "withdrawFor", "args": [{ "type": "uint64", "name": "id", "desc": "the id of the cancelled offer" }, { "type": "address", "name": "from", "desc": "the funder (sender) in the leaf" }, { "type": "address", "name": "receiver", "desc": "the receiver of the leaf's swap" }, { "type": "uint64", "name": "asset", "desc": "the asset of the leaf's swap" }, { "type": "uint64", "name": "amount", "desc": "the amount of the leaf's swap" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Returns any escrowed leaf of a cancelled swap to its funder (`from`, named by the leaf hash).\nPermissionless, like `disburseFrom`: the leaf can only go back to the account that funded it,\nso a funder that never comes back cannot keep a cancelled offer out of CANCEL_COMPLETED and\nhold the offer's storage deposit.", "events": [], "recommendations": {} }, { "name": "cleanupParticipant", "args": [{ "type": "uint64", "name": "id", "desc": "the id of the offer" }, { "type": "address", "name": "participant", "desc": "the participant address to clean up" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Cleans up participant box and refunds MBR\nCan only be called when offer is completed, cancelled (with or without leaves still to be\nreturned: a participant's deposit backs no escrow), or expired", "events": [], "recommendations": {} }, { "name": "cleanupOffer", "args": [{ "type": "uint64", "name": "id", "desc": "the id of the offer" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Cleans up the offer box after all participants have been cleaned up\nCan only be called when offer is completed, cancelled+completed, or expired", "events": [], "recommendations": {} }, { "name": "offerTerms", "args": [{ "type": "uint64", "name": "id" }], "returns": { "type": "byte[32]" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "The terms commitment `accept` expects for an offer. Clients should compute it independently.", "events": [], "recommendations": {} }, { "name": "optIn", "args": [{ "type": "pay", "name": "payment", "desc": "The payment transaction" }, { "type": "uint64", "name": "asset", "desc": "The asset to be opted into" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "optin tells the contract to opt into an asa", "events": [], "recommendations": {} }, { "name": "update", "args": [{ "type": "string", "name": "newVersion" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["UpdateApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "mbr", "args": [], "returns": { "type": "(uint64,uint64,uint64,(uint64,uint64))", "struct": "HyperSwapMBRData" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "Shared storage costs for HyperSwap and its plugin using the current Meta layout.", "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 2, "bytes": 1 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "offerCursor": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "b2ZmZXJfY3Vyc29y", "desc": "global counter for offers" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" } }, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": { "offers": { "keyType": "uint64", "valueType": "OfferValue", "desc": "map of hyper swap offers", "prefix": "bw==" }, "participants": { "keyType": "ParticipantKey", "valueType": "RefundValue", "desc": "map of the participants in each swap", "prefix": "cA==" }, "hashes": { "keyType": "HashKey", "valueType": "RefundValue", "desc": "map of merkle tree hashes during escrow & disbursal phases", "prefix": "aA==" }, "offerRefunds": { "keyType": "uint64", "valueType": "RefundValue", "desc": "Original offer/root deposit, refunded after their storage is deleted.", "prefix": "Zg==" }, "offerRegistry": { "keyType": "uint64", "valueType": "uint64", "desc": "Meta registry that holds the offer's roots, pinned at creation. Later DAO registry changes\ncannot strand an offer's proofs or root deposits.", "prefix": "cg==" } } } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [1026, 1279, 1599, 2081, 2369, 2487, 2557, 2667, 2682, 3022, 3101, 3250, 3313, 3890, 3967], "errorMessage": "Box must have value" }, { "pc": [3151, 3511], "errorMessage": "Bytes has valid prefix" }, { "pc": [622], "errorMessage": "ERR:errBrot" }, { "pc": [1400, 1726], "errorMessage": "ERR:errCvlf" }, { "pc": [1134], "errorMessage": "ERR:errEacc" }, { "pc": [679, 695, 1162, 1176, 1442, 1459, 1762, 1776], "errorMessage": "ERR:errIpay" }, { "pc": [2878], "errorMessage": "ERR:errIpma" }, { "pc": [2854], "errorMessage": "ERR:errIpmr" }, { "pc": [1801], "errorMessage": "ERR:errIpms" }, { "pc": [1060, 1312, 1632, 2153, 2456, 2636, 3270, 3910], "errorMessage": "ERR:errIste" }, { "pc": [2969], "errorMessage": "ERR:errIupg" }, { "pc": [3631], "errorMessage": "ERR:errIwlt" }, { "pc": [1864, 1877, 1889], "errorMessage": "ERR:errIxfr" }, { "pc": [1382, 1708], "errorMessage": "ERR:errLaes" }, { "pc": [3310, 3964], "errorMessage": "ERR:errLnes" }, { "pc": [2192], "errorMessage": "ERR:errNacp" }, { "pc": [1414, 1838], "errorMessage": "ERR:errNcls" }, { "pc": [1825], "errorMessage": "ERR:errNclw" }, { "pc": [2937, 3005], "errorMessage": "ERR:errNdao" }, { "pc": [996, 1275, 1595, 2078, 2365, 2554, 2800, 3246, 3887], "errorMessage": "ERR:errNofr" }, { "pc": [2484], "errorMessage": "ERR:errNpfd" }, { "pc": [1094, 1348, 1669], "errorMessage": "ERR:errNprt" }, { "pc": [1428, 1851], "errorMessage": "ERR:errNrky" }, { "pc": [3930], "errorMessage": "ERR:errNtwd" }, { "pc": [633, 1072, 1322, 1642], "errorMessage": "ERR:errOfex" }, { "pc": [661], "errorMessage": "ERR:errOtlg" }, { "pc": [2655], "errorMessage": "ERR:errPncl" }, { "pc": [3400, 3438, 3525], "errorMessage": "ERR:errRnoi" }, { "pc": [3426], "errorMessage": "ERR:errRwmm" }, { "pc": [1022], "errorMessage": "ERR:errTmis" }, { "pc": [738, 802, 2929, 2997, 3405], "errorMessage": "application exists" }, { "pc": [700, 711, 2922, 2941, 2990, 3442, 3529], "errorMessage": "check GlobalState exists" }, { "pc": [3561], "errorMessage": "errAamm" }, { "pc": [1148, 1195, 1479, 1488, 1909, 1918, 2200, 2206, 2510, 3370, 3379, 4020, 4024, 4030], "errorMessage": "index out of bounds" }, { "pc": [504, 960, 1249, 1567, 2054, 2254, 2905, 3549, 3556], "errorMessage": "invalid array length header" }, { "pc": [512, 2913], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [969, 1258, 1576, 2063, 2263], "errorMessage": "invalid number of bytes for arc4.dynamic_array<bytes[32]>" }, { "pc": [559, 581, 979, 1229, 1536, 1946, 1995, 2012, 2230, 2294, 2302, 2348], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [523, 567, 589, 600, 949, 1215, 1237, 1522, 1544, 1555, 1928, 1937, 1954, 1963, 1986, 2003, 2020, 2029, 2047, 2221, 2238, 2247, 2285, 2310, 2319, 2337, 2538, 2785, 2829, 2983], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [3156, 3516], "errorMessage": "invalid number of bytes for bool" }, { "pc": [1514], "errorMessage": "transaction type is axfer" }, { "pc": [548, 941, 1207, 1503, 2821], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDggMzIgMzQ5MDAgMzUzMDAKICAgIGJ5dGVjYmxvY2sgIm8iICJwIiAiRVJSOmVyck5vZnIiICJha2l0YV9kYW8iICJFUlI6ZXJySXBheSIgIkVSUjplcnJJc3RlIiAweDE0IDB4MGEgIkVSUjplcnJPZmV4IiAiaCIgMHgxZSAweDNjIDB4MDAwMCAib2ZmZXJfY3Vyc29yIiAiciIgInQiICJFUlI6ZXJyTnBydCIgIkVSUjplcnJJeGZyIiAweDMyIDB4MjggMHgxNTFmN2M3NSAicGFsIiAiRVJSOmVyclJub2kiICJ2ZXJzaW9uIiAweGEyNGMwNjdjICJFUlI6ZXJyTGFlcyIgIkVSUjplcnJDdmxmIiAiRVJSOmVyck5jbHMiICJFUlI6ZXJyTnJreSIgMHhkZjI4N2E3ZCAid2FsbGV0IiAiRVJSOmVyck5kYW8iICJFUlI6ZXJyTG5lcyIgMHgwMDAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU2CiAgICAvLyBleHBvcnQgY2xhc3MgSHlwZXJTd2FwIGV4dGVuZHMgY2xhc3NlcyhCYXNlSHlwZXJTd2FwLCBVcGdyYWRlYWJsZUFraXRhQmFzZUNvbnRyYWN0LCBDb250cmFjdFdpdGhPcHRJbikgewogICAgcHVzaGJ5dGVzIDB4ZWE5MTgwZGQgLy8gbWV0aG9kICJ1cGRhdGUoc3RyaW5nKXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBtYWluX3VwZGF0ZV9yb3V0ZUA0CgptYWluX3N3aXRjaF9jYXNlX25leHRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTYKICAgIC8vIGV4cG9ydCBjbGFzcyBIeXBlclN3YXAgZXh0ZW5kcyBjbGFzc2VzKEJhc2VIeXBlclN3YXAsIFVwZ3JhZGVhYmxlQWtpdGFCYXNlQ29udHJhY3QsIENvbnRyYWN0V2l0aE9wdEluKSB7CiAgICB0eG4gT25Db21wbGV0aW9uCiAgICAhCiAgICBhc3NlcnQKICAgIHR4biBBcHBsaWNhdGlvbklECiAgICBieiBtYWluX2NyZWF0ZV9Ob09wQDI0CiAgICBwdXNoYnl0ZXNzIDB4MGRiM2E0NGIgMHg3YmRhODFjOSAweGQ4NWZlYmRkIDB4NDY2Zjg3MWEgMHg1NjZhNjJiMiAweDI3MzM2YmEwIDB4MGM3YWI0MmUgMHgwNjMxODY4YiAweGUxZTVlODYxIDB4NjgzYmI2NzggMHhkM2VlMDRmMCAweDAwZDcwMWQ1IDB4Mzk0ZWFlYjIgMHgzM2U5MmM5NCAweDg1NGRlZGUwIDB4ODQwNzMzZGQgLy8gbWV0aG9kICJvZmZlcihwYXksYnl0ZVszMl0sdWludDY0LGJ5dGVbMzJdLHVpbnQ2NCx1aW50NjQpdm9pZCIsIG1ldGhvZCAiYWNjZXB0KHBheSx1aW50NjQsYnl0ZVszMl1bXSxieXRlWzMyXSl2b2lkIiwgbWV0aG9kICJlc2Nyb3cocGF5LHVpbnQ2NCxhZGRyZXNzLHVpbnQ2NCxieXRlWzMyXVtdKXZvaWQiLCBtZXRob2QgImVzY3Jvd0FzYShwYXksYXhmZXIsdWludDY0LGFkZHJlc3MsdWludDY0LHVpbnQ2NCxieXRlWzMyXVtdKXZvaWQiLCBtZXRob2QgImRpc2J1cnNlKHVpbnQ2NCx1aW50NjQsYWRkcmVzcyx1aW50NjQsdWludDY0KXZvaWQiLCBtZXRob2QgImRpc2J1cnNlRnJvbSh1aW50NjQsYWRkcmVzcyx1aW50NjQsYWRkcmVzcyx1aW50NjQsdWludDY0KXZvaWQiLCBtZXRob2QgImNhbmNlbCh1aW50NjQsYnl0ZVszMl1bXSl2b2lkIiwgbWV0aG9kICJ3aXRoZHJhdyh1aW50NjQsYWRkcmVzcyx1aW50NjQsdWludDY0LGJ5dGVbMzJdW10pdm9pZCIsIG1ldGhvZCAid2l0aGRyYXdGb3IodWludDY0LGFkZHJlc3MsYWRkcmVzcyx1aW50NjQsdWludDY0KXZvaWQiLCBtZXRob2QgImNsZWFudXBQYXJ0aWNpcGFudCh1aW50NjQsYWRkcmVzcyl2b2lkIiwgbWV0aG9kICJjbGVhbnVwT2ZmZXIodWludDY0KXZvaWQiLCBtZXRob2QgIm9mZmVyVGVybXModWludDY0KWJ5dGVbMzJdIiwgbWV0aG9kICJvcHRJbihwYXksdWludDY0KXZvaWQiLCBtZXRob2QgInVwZGF0ZUFraXRhREFPKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJvcFVwKCl2b2lkIiwgbWV0aG9kICJtYnIoKSh1aW50NjQsdWludDY0LHVpbnQ2NCwodWludDY0LHVpbnQ2NCkpIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggb2ZmZXIgYWNjZXB0IGVzY3JvdyBlc2Nyb3dBc2EgZGlzYnVyc2UgZGlzYnVyc2VGcm9tIGNhbmNlbCB3aXRoZHJhdyB3aXRoZHJhd0ZvciBjbGVhbnVwUGFydGljaXBhbnQgY2xlYW51cE9mZmVyIG9mZmVyVGVybXMgb3B0SW4gdXBkYXRlQWtpdGFEQU8gbWFpbl9vcFVwX3JvdXRlQDIxIG1haW5fbWJyX3JvdXRlQDIyCiAgICBlcnIKCm1haW5fbWJyX3JvdXRlQDIyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvYmFzZS50czo3CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHB1c2hieXRlcyAweDE1MWY3Yzc1MDAwMDAwMDAwMDAxMzY4YzAwMDAwMDAwMDAwMDg4NTQwMDAwMDAwMDAwMDA4ODU0MDAwMDAwMDAwMDAwODllNDAwMDAwMDAwMDAwMDAwMDAKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKbWFpbl9vcFVwX3JvdXRlQDIxOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjMwCiAgICAvLyBvcFVwKCk6IHZvaWQgeyB9CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgptYWluX2NyZWF0ZV9Ob09wQDI0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1NgogICAgLy8gZXhwb3J0IGNsYXNzIEh5cGVyU3dhcCBleHRlbmRzIGNsYXNzZXMoQmFzZUh5cGVyU3dhcCwgVXBncmFkZWFibGVBa2l0YUJhc2VDb250cmFjdCwgQ29udHJhY3RXaXRoT3B0SW4pIHsKICAgIHB1c2hieXRlcyAweGNkOWFkNjdlIC8vIG1ldGhvZCAiY3JlYXRlKHN0cmluZyx1aW50NjQpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIGNyZWF0ZQogICAgZXJyCgptYWluX3VwZGF0ZV9yb3V0ZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM1CiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiBbJ1VwZGF0ZUFwcGxpY2F0aW9uJ10gfSkKICAgIHR4biBPbkNvbXBsZXRpb24KICAgIHB1c2hpbnQgNCAvLyBVcGRhdGVBcHBsaWNhdGlvbgogICAgPT0KICAgIHR4biBBcHBsaWNhdGlvbklECiAgICAmJgogICAgYXNzZXJ0CiAgICBiIHVwZGF0ZQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmNhblJlY2VpdmVBbGdvKHJlY2VpdmVyOiBieXRlcywgYW1vdW50OiB1aW50NjQpIC0+IHVpbnQ2NDoKY2FuUmVjZWl2ZUFsZ286CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEyOQogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIGNhblJlY2VpdmVBbGdvKHJlY2VpdmVyOiBBY2NvdW50LCBhbW91bnQ6IHVpbnQ2NCk6IGJvb2xlYW4gewogICAgcHJvdG8gMiAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEzMAogICAgLy8gY29uc3QgWywgZnVuZGVkXSA9IG9wLkFjY3RQYXJhbXMuYWNjdEJhbGFuY2UocmVjZWl2ZXIpCiAgICBmcmFtZV9kaWcgLTIKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0QmFsYW5jZQogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEzMQogICAgLy8gcmV0dXJuIGZ1bmRlZCB8fCBhbW91bnQgPj0gR2xvYmFsLm1pbkJhbGFuY2UKICAgIGJueiBjYW5SZWNlaXZlQWxnb19ib29sX3RydWVAMgogICAgZnJhbWVfZGlnIC0xCiAgICBnbG9iYWwgTWluQmFsYW5jZQogICAgPj0KICAgIGJ6IGNhblJlY2VpdmVBbGdvX2Jvb2xfZmFsc2VAMwoKY2FuUmVjZWl2ZUFsZ29fYm9vbF90cnVlQDI6CiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMzEKICAgIC8vIHJldHVybiBmdW5kZWQgfHwgYW1vdW50ID49IEdsb2JhbC5taW5CYWxhbmNlCiAgICByZXRzdWIKCmNhblJlY2VpdmVBbGdvX2Jvb2xfZmFsc2VAMzoKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEzMQogICAgLy8gcmV0dXJuIGZ1bmRlZCB8fCBhbW91bnQgPj0gR2xvYmFsLm1pbkJhbGFuY2UKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Okh5cGVyU3dhcC5jcmVhdGVbcm91dGluZ10oKSAtPiB2b2lkOgpjcmVhdGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjIxOQogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE0CiAgICAvLyB2ZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogR2xvYmFsU3RhdGVLZXlWZXJzaW9uIH0pCiAgICBieXRlYyAyMyAvLyAidmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjIxCiAgICAvLyB0aGlzLnZlcnNpb24udmFsdWUgPSB2ZXJzaW9uCiAgICB1bmNvdmVyIDIKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18zIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjIyMgogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSA9IGFraXRhREFPCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2MQogICAgLy8gb2ZmZXJDdXJzb3IgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBIeXBlclN3YXBHbG9iYWxTdGF0ZUtleU9mZmVyQ3Vyc29yIH0pCiAgICBieXRlYyAxMyAvLyAib2ZmZXJfY3Vyc29yIgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyMjMKICAgIC8vIHRoaXMub2ZmZXJDdXJzb3IudmFsdWUgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjE5CiAgICAvLyBAYWJpbWV0aG9kKHsgb25DcmVhdGU6ICdyZXF1aXJlJyB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Okh5cGVyU3dhcC5vZmZlcltyb3V0aW5nXSgpIC0+IHZvaWQ6Cm9mZmVyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyMzctMjQ0CiAgICAvLyBvZmZlcigKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICByb290OiBieXRlczwzMj4sCiAgICAvLyAgIGxlYXZlczogdWludDY0LAogICAgLy8gICBwYXJ0aWNpcGFudHNSb290OiBieXRlczwzMj4sCiAgICAvLyAgIHBhcnRpY2lwYW50c0xlYXZlczogdWludDY0LAogICAgLy8gICBleHBpcmF0aW9uOiB1aW50NjQKICAgIC8vICkgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgMwogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBjb3ZlciAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDQKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDUKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjQ1CiAgICAvLyBsb2dnZWRBc3NlcnQocm9vdCAhPT0gcGFydGljaXBhbnRzUm9vdCwgZXJyQmFkUm9vdHMpCiAgICAhPQogICAgYm56IG9mZmVyX2FmdGVyX2Fzc2VydEAzCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJCcm90IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckJyb3QKCm9mZmVyX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyNDYKICAgIC8vIGxvZ2dlZEFzc2VydChleHBpcmF0aW9uID4gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwgZXJyT2ZmZXJFeHBpcmVkKQogICAgZHVwCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICA+CiAgICBibnogb2ZmZXJfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjIDggLy8gIkVSUjplcnJPZmV4IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck9mZXgKCm9mZmVyX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyNDgKICAgIC8vIGxvZ2dlZEFzc2VydChleHBpcmF0aW9uIC0gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA8PSBNYXhPZmZlckR1cmF0aW9uLCBlcnJPZmZlclRvb0xvbmcpCiAgICBkdXAKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIC0KICAgIHB1c2hpbnQgMjU5MjAwMAogICAgPD0KICAgIGJueiBvZmZlcl9hZnRlcl9hc3NlcnRANwogICAgcHVzaGJ5dGVzICJFUlI6ZXJyT3RsZyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJPdGxnCgpvZmZlcl9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjUzCiAgICAvLyBjb25zdCBwYXlvciA9IHBheW1lbnQuc2VuZGVyCiAgICBkaWcgMgogICAgZHVwCiAgICBndHhucyBTZW5kZXIKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjU1CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRQYXltZW50KQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IG9mZmVyX2FmdGVyX2Fzc2VydEA5CiAgICBieXRlYyA0IC8vICJFUlI6ZXJySXBheSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcGF5CgpvZmZlcl9hZnRlcl9hc3NlcnRAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjU2CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IGh5cGVyU3dhcE9mZmVyTUJSQW1vdW50LCBlcnJJbnZhbGlkUGF5bWVudCkKICAgIHVuY292ZXIgMwogICAgZ3R4bnMgQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI1MgogICAgLy8gY29uc3QgaHlwZXJTd2FwT2ZmZXJNQlJBbW91bnQ6IHVpbnQ2NCA9IGNvc3RzLm9mZmVycyArIGNvc3RzLnBhcnRpY2lwYW50cyArIChtZXRhTWVya2xlc0Nvc3QgKiAyKQogICAgcHVzaGludCAxODUwMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjU2CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IGh5cGVyU3dhcE9mZmVyTUJSQW1vdW50LCBlcnJJbnZhbGlkUGF5bWVudCkKICAgID09CiAgICBibnogb2ZmZXJfYWZ0ZXJfYXNzZXJ0QDExCiAgICBieXRlYyA0IC8vICJFUlI6ZXJySXBheSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcGF5CgpvZmZlcl9hZnRlcl9hc3NlcnRAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjg5CiAgICAvLyBjb25zdCBpZCA9IHRoaXMub2ZmZXJDdXJzb3IudmFsdWUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjYxCiAgICAvLyBvZmZlckN1cnNvciA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEh5cGVyU3dhcEdsb2JhbFN0YXRlS2V5T2ZmZXJDdXJzb3IgfSkKICAgIGJ5dGVjIDEzIC8vICJvZmZlcl9jdXJzb3IiCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjg5CiAgICAvLyBjb25zdCBpZCA9IHRoaXMub2ZmZXJDdXJzb3IudmFsdWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjkwCiAgICAvLyB0aGlzLm9mZmVyQ3Vyc29yLnZhbHVlICs9IDEKICAgIGR1cAogICAgaW50Y18xIC8vIDEKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjEKICAgIC8vIG9mZmVyQ3Vyc29yID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogSHlwZXJTd2FwR2xvYmFsU3RhdGVLZXlPZmZlckN1cnNvciB9KQogICAgYnl0ZWMgMTMgLy8gIm9mZmVyX2N1cnNvciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6OTAKICAgIC8vIHRoaXMub2ZmZXJDdXJzb3IudmFsdWUgKz0gMQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjU5CiAgICAvLyBjb25zdCBtZXRhTWVya2xlc0FwcElEID0gZ2V0QWtpdGFBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLm1ldGFNZXJrbGVzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMyAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyNTkKICAgIC8vIGNvbnN0IG1ldGFNZXJrbGVzQXBwSUQgPSBnZXRBa2l0YUFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkubWV0YU1lcmtsZXMKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIwNgogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgcHVzaGJ5dGVzICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI1OQogICAgLy8gY29uc3QgbWV0YU1lcmtsZXNBcHBJRCA9IGdldEFraXRhQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5tZXRhTWVya2xlcwogICAgcHVzaGludCA3MgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjYwCiAgICAvLyB0aGlzLm9mZmVyUmVnaXN0cnkoaWQpLnZhbHVlID0gbWV0YU1lcmtsZXNBcHBJRAogICAgc3dhcAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo3OQogICAgLy8gb2ZmZXJSZWdpc3RyeSA9IEJveE1hcDx1aW50NjQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IEh5cGVyU3dhcEJveFByZWZpeE9mZmVyUmVnaXN0cnkgfSkKICAgIGJ5dGVjIDE0IC8vICJyIgogICAgZGlnIDEKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyNjAKICAgIC8vIHRoaXMub2ZmZXJSZWdpc3RyeShpZCkudmFsdWUgPSBtZXRhTWVya2xlc0FwcElECiAgICBkaWcgMgogICAgaXRvYgogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyNjItMjczCiAgICAvLyBhYmlDYWxsPHR5cGVvZiBNZXRhLnByb3RvdHlwZS5hZGRSb290Pih7CiAgICAvLyAgIGFwcElkOiBtZXRhTWVya2xlc0FwcElELAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihtZXRhTWVya2xlc0FwcElEKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtZXRhTWVya2xlc0Nvc3QsCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdGhpcy5yb290TmFtZShpZCwgZmFsc2UpLAogICAgLy8gICAgIHJvb3QsCiAgICAvLyAgICAgTWVya2xlVHJlZVR5cGVUcmFkZQogICAgLy8gICBdLAogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjY2CiAgICAvLyByZWNlaXZlcjogQXBwbGljYXRpb24obWV0YU1lcmtsZXNBcHBJRCkuYWRkcmVzcywKICAgIGRpZyAxCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI1MQogICAgLy8gY29uc3QgbWV0YU1lcmtsZXNDb3N0OiB1aW50NjQgPSBjb3N0cy5tbS5yb290ICsgY29zdHMubW0uZGF0YQogICAgaW50YyA1IC8vIDM1MzAwCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyNjUtMjY4CiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogQXBwbGljYXRpb24obWV0YU1lcmtsZXNBcHBJRCkuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiBtZXRhTWVya2xlc0Nvc3QsCiAgICAvLyB9KSwKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjYyLTI3MwogICAgLy8gYWJpQ2FsbDx0eXBlb2YgTWV0YS5wcm90b3R5cGUuYWRkUm9vdD4oewogICAgLy8gICBhcHBJZDogbWV0YU1lcmtsZXNBcHBJRCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24obWV0YU1lcmtsZXNBcHBJRCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWV0YU1lcmtsZXNDb3N0LAogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHRoaXMucm9vdE5hbWUoaWQsIGZhbHNlKSwKICAgIC8vICAgICByb290LAogICAgLy8gICAgIE1lcmtsZVRyZWVUeXBlVHJhZGUKICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6ODUKICAgIC8vIHJldHVybiBTdHJpbmcoKHBhcnRpY2lwYW50cyA/IEJ5dGVzKCdwJykgOiBCeXRlcygndCcpKS5jb25jYXQoaXRvYihpZCkpKQogICAgYnl0ZWMgMTUgLy8gInQiCiAgICBkaWcgMQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI2OQogICAgLy8gdGhpcy5yb290TmFtZShpZCwgZmFsc2UpLAogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjcxCiAgICAvLyBNZXJrbGVUcmVlVHlwZVRyYWRlCiAgICBwdXNoaW50IDMKICAgIGl0b2IKICAgIGRpZyAzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjYyLTI3MwogICAgLy8gYWJpQ2FsbDx0eXBlb2YgTWV0YS5wcm90b3R5cGUuYWRkUm9vdD4oewogICAgLy8gICBhcHBJZDogbWV0YU1lcmtsZXNBcHBJRCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24obWV0YU1lcmtsZXNBcHBJRCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWV0YU1lcmtsZXNDb3N0LAogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHRoaXMucm9vdE5hbWUoaWQsIGZhbHNlKSwKICAgIC8vICAgICByb290LAogICAgLy8gICAgIE1lcmtsZVRyZWVUeXBlVHJhZGUKICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBieXRlYyAyNCAvLyBtZXRob2QgImFkZFJvb3QocGF5LHN0cmluZyxieXRlWzMyXSx1aW50NjQpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciA3CiAgICBkdXAKICAgIGNvdmVyIDQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkdXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyNzYtMjg3CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBNZXRhLnByb3RvdHlwZS5hZGRSb290Pih7CiAgICAvLyAgIGFwcElkOiBtZXRhTWVya2xlc0FwcElELAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihtZXRhTWVya2xlc0FwcElEKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtZXRhTWVya2xlc0Nvc3QsCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdGhpcy5yb290TmFtZShpZCwgdHJ1ZSksCiAgICAvLyAgICAgcGFydGljaXBhbnRzUm9vdCwKICAgIC8vICAgICBNZXJrbGVUcmVlVHlwZVRyYWRlCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyODAKICAgIC8vIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihtZXRhTWVya2xlc0FwcElEKS5hZGRyZXNzLAogICAgZGlnIDIKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjUxCiAgICAvLyBjb25zdCBtZXRhTWVya2xlc0Nvc3Q6IHVpbnQ2NCA9IGNvc3RzLm1tLnJvb3QgKyBjb3N0cy5tbS5kYXRhCiAgICBpbnRjIDUgLy8gMzUzMDAKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI3OS0yODIKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihtZXRhTWVya2xlc0FwcElEKS5hZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IG1ldGFNZXJrbGVzQ29zdCwKICAgIC8vIH0pLAogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyNzYtMjg3CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBNZXRhLnByb3RvdHlwZS5hZGRSb290Pih7CiAgICAvLyAgIGFwcElkOiBtZXRhTWVya2xlc0FwcElELAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihtZXRhTWVya2xlc0FwcElEKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtZXRhTWVya2xlc0Nvc3QsCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdGhpcy5yb290TmFtZShpZCwgdHJ1ZSksCiAgICAvLyAgICAgcGFydGljaXBhbnRzUm9vdCwKICAgIC8vICAgICBNZXJrbGVUcmVlVHlwZVRyYWRlCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjg1CiAgICAvLyByZXR1cm4gU3RyaW5nKChwYXJ0aWNpcGFudHMgPyBCeXRlcygncCcpIDogQnl0ZXMoJ3QnKSkuY29uY2F0KGl0b2IoaWQpKSkKICAgIGJ5dGVjXzEgLy8gInAiCiAgICBkaWcgMgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI4MwogICAgLy8gdGhpcy5yb290TmFtZShpZCwgdHJ1ZSksCiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgdW5jb3ZlciAzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Mjc2LTI4NwogICAgLy8gYWJpQ2FsbDx0eXBlb2YgTWV0YS5wcm90b3R5cGUuYWRkUm9vdD4oewogICAgLy8gICBhcHBJZDogbWV0YU1lcmtsZXNBcHBJRCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24obWV0YU1lcmtsZXNBcHBJRCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWV0YU1lcmtsZXNDb3N0LAogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHRoaXMucm9vdE5hbWUoaWQsIHRydWUpLAogICAgLy8gICAgIHBhcnRpY2lwYW50c1Jvb3QsCiAgICAvLyAgICAgTWVya2xlVHJlZVR5cGVUcmFkZQogICAgLy8gICBdLAogICAgLy8gfSkKICAgIGJ5dGVjIDI0IC8vIG1ldGhvZCAiYWRkUm9vdChwYXksc3RyaW5nLGJ5dGVbMzJdLHVpbnQ2NCl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDUKICAgIGR1cAogICAgY292ZXIgMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyNTIKICAgIC8vIGNvbnN0IGh5cGVyU3dhcE9mZmVyTUJSQW1vdW50OiB1aW50NjQgPSBjb3N0cy5vZmZlcnMgKyBjb3N0cy5wYXJ0aWNpcGFudHMgKyAobWV0YU1lcmtsZXNDb3N0ICogMikKICAgIGludGMgNCAvLyAzNDkwMAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyOTAKICAgIC8vIHRoaXMucGFydGljaXBhbnRzKHsgaWQsIGFkZHJlc3M6IFR4bi5zZW5kZXIgfSkudmFsdWUgPSB7IHBheW9yLCBhbW91bnQ6IGNvc3RzLnBhcnRpY2lwYW50cyB9CiAgICBpdG9iCiAgICB1bmNvdmVyIDQKICAgIGR1cAogICAgY292ZXIgMgogICAgY29uY2F0CiAgICBkaWcgMgogICAgdHhuIFNlbmRlcgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjY4CiAgICAvLyBwYXJ0aWNpcGFudHMgPSBCb3hNYXA8UGFydGljaXBhbnRLZXksIFJlZnVuZFZhbHVlPih7IGtleVByZWZpeDogSHlwZXJTd2FwQm94UHJlZml4UGFydGljaXBhbnRzIH0pCiAgICBieXRlY18xIC8vICJwIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI5MAogICAgLy8gdGhpcy5wYXJ0aWNpcGFudHMoeyBpZCwgYWRkcmVzczogVHhuLnNlbmRlciB9KS52YWx1ZSA9IHsgcGF5b3IsIGFtb3VudDogY29zdHMucGFydGljaXBhbnRzIH0KICAgIHN3YXAKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjkxCiAgICAvLyB0aGlzLm9mZmVyUmVmdW5kcyhpZCkudmFsdWUgPSB7IHBheW9yLCBhbW91bnQ6IGNvc3RzLm9mZmVycyArIChtZXRhTWVya2xlc0Nvc3QgKiAyKSB9CiAgICBwdXNoaW50IDE1MDEwMAogICAgaXRvYgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjczCiAgICAvLyBvZmZlclJlZnVuZHMgPSBCb3hNYXA8dWludDY0LCBSZWZ1bmRWYWx1ZT4oeyBrZXlQcmVmaXg6IEh5cGVyU3dhcEJveFByZWZpeE9mZmVyUmVmdW5kcyB9KQogICAgcHVzaGJ5dGVzICJmIgogICAgZGlnIDIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyOTEKICAgIC8vIHRoaXMub2ZmZXJSZWZ1bmRzKGlkKS52YWx1ZSA9IHsgcGF5b3IsIGFtb3VudDogY29zdHMub2ZmZXJzICsgKG1ldGFNZXJrbGVzQ29zdCAqIDIpIH0KICAgIHN3YXAKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Mjk1CiAgICAvLyBzdGF0ZTogcGFydGljaXBhbnRzTGVhdmVzID09PSAxID8gU1RBVEVfRVNDUk9XSU5HIDogU1RBVEVfT0ZGRVJFRCwKICAgIHVuY292ZXIgNAogICAgZHVwCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGJ5dGVjIDcgLy8gMHgwYQogICAgYnl0ZWMgNiAvLyAweDE0CiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyOTQtMzAzCiAgICAvLyB0aGlzLm9mZmVycyhpZCkudmFsdWUgPSB7CiAgICAvLyAgIHN0YXRlOiBwYXJ0aWNpcGFudHNMZWF2ZXMgPT09IDEgPyBTVEFURV9FU0NST1dJTkcgOiBTVEFURV9PRkZFUkVELAogICAgLy8gICByb290LAogICAgLy8gICBsZWF2ZXMsCiAgICAvLyAgIGVzY3Jvd2VkOiAwLAogICAgLy8gICBwYXJ0aWNpcGFudHNSb290LAogICAgLy8gICBwYXJ0aWNpcGFudHNMZWF2ZXMsCiAgICAvLyAgIGFjY2VwdGFuY2VzOiAxLAogICAgLy8gICBleHBpcmF0aW9uLAogICAgLy8gfQogICAgdW5jb3ZlciA0CiAgICBjb25jYXQKICAgIHVuY292ZXIgNQogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI5OAogICAgLy8gZXNjcm93ZWQ6IDAsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyOTQtMzAzCiAgICAvLyB0aGlzLm9mZmVycyhpZCkudmFsdWUgPSB7CiAgICAvLyAgIHN0YXRlOiBwYXJ0aWNpcGFudHNMZWF2ZXMgPT09IDEgPyBTVEFURV9FU0NST1dJTkcgOiBTVEFURV9PRkZFUkVELAogICAgLy8gICByb290LAogICAgLy8gICBsZWF2ZXMsCiAgICAvLyAgIGVzY3Jvd2VkOiAwLAogICAgLy8gICBwYXJ0aWNpcGFudHNSb290LAogICAgLy8gICBwYXJ0aWNpcGFudHNMZWF2ZXMsCiAgICAvLyAgIGFjY2VwdGFuY2VzOiAxLAogICAgLy8gICBleHBpcmF0aW9uLAogICAgLy8gfQogICAgaXRvYgogICAgY29uY2F0CiAgICB1bmNvdmVyIDMKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjMwMQogICAgLy8gYWNjZXB0YW5jZXM6IDEsCiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyOTQtMzAzCiAgICAvLyB0aGlzLm9mZmVycyhpZCkudmFsdWUgPSB7CiAgICAvLyAgIHN0YXRlOiBwYXJ0aWNpcGFudHNMZWF2ZXMgPT09IDEgPyBTVEFURV9FU0NST1dJTkcgOiBTVEFURV9PRkZFUkVELAogICAgLy8gICByb290LAogICAgLy8gICBsZWF2ZXMsCiAgICAvLyAgIGVzY3Jvd2VkOiAwLAogICAgLy8gICBwYXJ0aWNpcGFudHNSb290LAogICAgLy8gICBwYXJ0aWNpcGFudHNMZWF2ZXMsCiAgICAvLyAgIGFjY2VwdGFuY2VzOiAxLAogICAgLy8gICBleHBpcmF0aW9uLAogICAgLy8gfQogICAgaXRvYgogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2NgogICAgLy8gb2ZmZXJzID0gQm94TWFwPHVpbnQ2NCwgT2ZmZXJWYWx1ZT4oeyBrZXlQcmVmaXg6IEh5cGVyU3dhcEJveFByZWZpeE9mZmVycyB9KQogICAgYnl0ZWNfMCAvLyAibyIKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI5NC0zMDMKICAgIC8vIHRoaXMub2ZmZXJzKGlkKS52YWx1ZSA9IHsKICAgIC8vICAgc3RhdGU6IHBhcnRpY2lwYW50c0xlYXZlcyA9PT0gMSA/IFNUQVRFX0VTQ1JPV0lORyA6IFNUQVRFX09GRkVSRUQsCiAgICAvLyAgIHJvb3QsCiAgICAvLyAgIGxlYXZlcywKICAgIC8vICAgZXNjcm93ZWQ6IDAsCiAgICAvLyAgIHBhcnRpY2lwYW50c1Jvb3QsCiAgICAvLyAgIHBhcnRpY2lwYW50c0xlYXZlcywKICAgIC8vICAgYWNjZXB0YW5jZXM6IDEsCiAgICAvLyAgIGV4cGlyYXRpb24sCiAgICAvLyB9CiAgICBzd2FwCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjIzNy0yNDQKICAgIC8vIG9mZmVyKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIHJvb3Q6IGJ5dGVzPDMyPiwKICAgIC8vICAgbGVhdmVzOiB1aW50NjQsCiAgICAvLyAgIHBhcnRpY2lwYW50c1Jvb3Q6IGJ5dGVzPDMyPiwKICAgIC8vICAgcGFydGljaXBhbnRzTGVhdmVzOiB1aW50NjQsCiAgICAvLyAgIGV4cGlyYXRpb246IHVpbnQ2NAogICAgLy8gKSB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo6SHlwZXJTd2FwLmFjY2VwdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmFjY2VwdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzE0CiAgICAvLyBhY2NlcHQobWJyUGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBpZDogdWludDY0LCBwcm9vZjogUHJvb2YsIHRlcm1zOiBieXRlczwzMj4pIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGNvdmVyIDQKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAzMgogICAgKgogICAgcHVzaGludCAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxieXRlc1szMl0+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzE2CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5vZmZlcnMoaWQpLmV4aXN0cywgZXJyT2ZmZXJOb3RGb3VuZCkKICAgIGl0b2IKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2NgogICAgLy8gb2ZmZXJzID0gQm94TWFwPHVpbnQ2NCwgT2ZmZXJWYWx1ZT4oeyBrZXlQcmVmaXg6IEh5cGVyU3dhcEJveFByZWZpeE9mZmVycyB9KQogICAgYnl0ZWNfMCAvLyAibyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBjb3ZlciA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjMxNgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMub2ZmZXJzKGlkKS5leGlzdHMsIGVyck9mZmVyTm90Rm91bmQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBhY2NlcHRfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjXzIgLy8gIkVSUjplcnJOb2ZyIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5vZnIKCmFjY2VwdF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzE4CiAgICAvLyBsb2dnZWRBc3NlcnQodGVybXMgPT09IHRoaXMudGVybXMoaWQpLCBlcnJUZXJtc01pc21hdGNoKQogICAgZGlnIDEKICAgIGNhbGxzdWIgdGVybXMKICAgIHVuY292ZXIgMwogICAgPT0KICAgIGJueiBhY2NlcHRfYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOmVyclRtaXMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyVG1pcwoKYWNjZXB0X2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozMTkKICAgIC8vIGNvbnN0IHsgc3RhdGUsIGV4cGlyYXRpb24sIGFjY2VwdGFuY2VzLCBwYXJ0aWNpcGFudHNMZWF2ZXMgfSA9IHRoaXMub2ZmZXJzKGlkKS52YWx1ZQogICAgZGlnIDQKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBkdXAKICAgIGV4dHJhY3QgMCAxCiAgICBkaWcgMQogICAgcHVzaGludCA5NwogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDMKICAgIGRpZyAxCiAgICBwdXNoaW50IDg5CiAgICBleHRyYWN0X3VpbnQ2NAogICAgY292ZXIgMgogICAgc3dhcAogICAgcHVzaGludCA4MQogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzIxCiAgICAvLyBsb2dnZWRBc3NlcnQoc3RhdGUgPT09IFNUQVRFX09GRkVSRUQsIGVyckludmFsaWRTdGF0ZSkKICAgIGJ5dGVjIDcgLy8gMHgwYQogICAgPT0KICAgIGJueiBhY2NlcHRfYWZ0ZXJfYXNzZXJ0QDcKICAgIGJ5dGVjIDUgLy8gIkVSUjplcnJJc3RlIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklzdGUKCmFjY2VwdF9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzIyCiAgICAvLyBsb2dnZWRBc3NlcnQoZXhwaXJhdGlvbiA+IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsIGVyck9mZmVyRXhwaXJlZCkKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIHVuY292ZXIgNAogICAgPAogICAgYm56IGFjY2VwdF9hZnRlcl9hc3NlcnRAOQogICAgYnl0ZWMgOCAvLyAiRVJSOmVyck9mZXgiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyT2ZleAoKYWNjZXB0X2FmdGVyX2Fzc2VydEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozMjQKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnZlcmlmeUxlYWYoaWQsIHRydWUsIHNoYTI1NihzaGEyNTYoVHhuLnNlbmRlci5ieXRlcykpLCBwcm9vZiksIGVyck5vdEFQYXJ0aWNpcGFudCkKICAgIHR4biBTZW5kZXIKICAgIHNoYTI1NgogICAgc2hhMjU2CiAgICB1bmNvdmVyIDQKICAgIGludGNfMSAvLyAxCiAgICB1bmNvdmVyIDIKICAgIHVuY292ZXIgNwogICAgY2FsbHN1YiB2ZXJpZnlMZWFmCiAgICBwb3AKICAgIGJueiBhY2NlcHRfYWZ0ZXJfYXNzZXJ0QDExCiAgICBieXRlYyAxNiAvLyAiRVJSOmVyck5wcnQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTnBydAoKYWNjZXB0X2FmdGVyX2Fzc2VydEAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzI3CiAgICAvLyBjb25zdCBzZW5kZXJQYXJ0aWNpcGFudEtleSA9IHsgaWQsIGFkZHJlc3M6IFR4bi5zZW5kZXIgfQogICAgdHhuIFNlbmRlcgogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzI4CiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMucGFydGljaXBhbnRzKHNlbmRlclBhcnRpY2lwYW50S2V5KS5leGlzdHMsIGVyckFscmVhZHlBY2NlcHRlZCkKICAgIGR1cAogICAgZXh0cmFjdCAwIDgKICAgIHN3YXAKICAgIGV4dHJhY3QgOCAzMgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjY4CiAgICAvLyBwYXJ0aWNpcGFudHMgPSBCb3hNYXA8UGFydGljaXBhbnRLZXksIFJlZnVuZFZhbHVlPih7IGtleVByZWZpeDogSHlwZXJTd2FwQm94UHJlZml4UGFydGljaXBhbnRzIH0pCiAgICBieXRlY18xIC8vICJwIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzI4CiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMucGFydGljaXBhbnRzKHNlbmRlclBhcnRpY2lwYW50S2V5KS5leGlzdHMsIGVyckFscmVhZHlBY2NlcHRlZCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogYWNjZXB0X2FmdGVyX2Fzc2VydEAxMwogICAgcHVzaGJ5dGVzICJFUlI6ZXJyRWFjYyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJFYWNjCgphY2NlcHRfYWZ0ZXJfYXNzZXJ0QDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozMzAKICAgIC8vIGNvbnN0IG5ld0FjY2VwdGFuY2VzOiB1aW50NjQgPSBhY2NlcHRhbmNlcyArIDEKICAgIHN3YXAKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzMxCiAgICAvLyB0aGlzLm9mZmVycyhpZCkudmFsdWUuYWNjZXB0YW5jZXMgPSBuZXdBY2NlcHRhbmNlcwogICAgaXRvYgogICAgZGlnIDUKICAgIHB1c2hpbnQgODkKICAgIHVuY292ZXIgMgogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzM1CiAgICAvLyBsb2dnZWRBc3NlcnQobWJyUGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRQYXltZW50KQogICAgZGlnIDMKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBhY2NlcHRfYWZ0ZXJfYXNzZXJ0QDE1CiAgICBieXRlYyA0IC8vICJFUlI6ZXJySXBheSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcGF5CgphY2NlcHRfYWZ0ZXJfYXNzZXJ0QDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozMzYKICAgIC8vIGxvZ2dlZEFzc2VydChtYnJQYXltZW50LmFtb3VudCA9PT0gY29zdHMucGFydGljaXBhbnRzLCBlcnJJbnZhbGlkUGF5bWVudCkKICAgIGRpZyAzCiAgICBndHhucyBBbW91bnQKICAgIGludGMgNCAvLyAzNDkwMAogICAgPT0KICAgIGJueiBhY2NlcHRfYWZ0ZXJfYXNzZXJ0QDE3CiAgICBieXRlYyA0IC8vICJFUlI6ZXJySXBheSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcGF5CgphY2NlcHRfYWZ0ZXJfYXNzZXJ0QDE3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozNDAKICAgIC8vIHBheW9yOiBtYnJQYXltZW50LnNlbmRlciwKICAgIHVuY292ZXIgMwogICAgZ3R4bnMgU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjMzNgogICAgLy8gbG9nZ2VkQXNzZXJ0KG1iclBheW1lbnQuYW1vdW50ID09PSBjb3N0cy5wYXJ0aWNpcGFudHMsIGVyckludmFsaWRQYXltZW50KQogICAgaW50YyA0IC8vIDM0OTAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjMzOS0zNDIKICAgIC8vIHRoaXMucGFydGljaXBhbnRzKHNlbmRlclBhcnRpY2lwYW50S2V5KS52YWx1ZSA9IHsKICAgIC8vICAgcGF5b3I6IG1iclBheW1lbnQuc2VuZGVyLAogICAgLy8gICBhbW91bnQ6IGNvc3RzLnBhcnRpY2lwYW50cwogICAgLy8gfQogICAgaXRvYgogICAgc3dhcAogICAgY29uY2F0CiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjM0NAogICAgLy8gaWYgKHBhcnRpY2lwYW50c0xlYXZlcyA9PT0gbmV3QWNjZXB0YW5jZXMpIHsKICAgID09CiAgICBieiBhY2NlcHRfYWZ0ZXJfaWZfZWxzZUAxOQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozNDUKICAgIC8vIHRoaXMub2ZmZXJzKGlkKS52YWx1ZS5zdGF0ZSA9IFNUQVRFX0VTQ1JPV0lORwogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgYnl0ZWMgNiAvLyAweDE0CiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwoKYWNjZXB0X2FmdGVyX2lmX2Vsc2VAMTk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjMxNAogICAgLy8gYWNjZXB0KG1iclBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgaWQ6IHVpbnQ2NCwgcHJvb2Y6IFByb29mLCB0ZXJtczogYnl0ZXM8MzI+KSB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo6SHlwZXJTd2FwLmVzY3Jvd1tyb3V0aW5nXSgpIC0+IHZvaWQ6CmVzY3JvdzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzU4CiAgICAvLyBlc2Nyb3cocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBpZDogdWludDY0LCByZWNlaXZlcjogQWNjb3VudCwgYW1vdW50OiB1aW50NjQsIHByb29mOiBQcm9vZikgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgY292ZXIgMwogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgMgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBjb3ZlciA0CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMzIKICAgICoKICAgIHB1c2hpbnQgMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8Ynl0ZXNbMzJdPgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozNjAKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLm9mZmVycyhpZCkuZXhpc3RzLCBlcnJPZmZlck5vdEZvdW5kKQogICAgaXRvYgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjY2CiAgICAvLyBvZmZlcnMgPSBCb3hNYXA8dWludDY0LCBPZmZlclZhbHVlPih7IGtleVByZWZpeDogSHlwZXJTd2FwQm94UHJlZml4T2ZmZXJzIH0pCiAgICBieXRlY18wIC8vICJvIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGNvdmVyIDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzYwCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5vZmZlcnMoaWQpLmV4aXN0cywgZXJyT2ZmZXJOb3RGb3VuZCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGVzY3Jvd19hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWNfMiAvLyAiRVJSOmVyck5vZnIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTm9mcgoKZXNjcm93X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozNjEKICAgIC8vIGNvbnN0IHsgc3RhdGUsIGVzY3Jvd2VkLCBsZWF2ZXMsIGV4cGlyYXRpb24gfSA9IHRoaXMub2ZmZXJzKGlkKS52YWx1ZQogICAgZGlnIDYKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBkdXAKICAgIGV4dHJhY3QgMCAxCiAgICBkaWcgMQogICAgcHVzaGludCA0MQogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDUKICAgIGRpZyAxCiAgICBwdXNoaW50IDMzCiAgICBleHRyYWN0X3VpbnQ2NAogICAgY292ZXIgOAogICAgc3dhcAogICAgcHVzaGludCA5NwogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzYzCiAgICAvLyBsb2dnZWRBc3NlcnQoc3RhdGUgPT09IFNUQVRFX0VTQ1JPV0lORywgZXJySW52YWxpZFN0YXRlKQogICAgYnl0ZWMgNiAvLyAweDE0CiAgICA9PQogICAgYm56IGVzY3Jvd19hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgNSAvLyAiRVJSOmVycklzdGUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXN0ZQoKZXNjcm93X2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozNjUKICAgIC8vIGxvZ2dlZEFzc2VydChleHBpcmF0aW9uID4gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwgZXJyT2ZmZXJFeHBpcmVkKQogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgPgogICAgYm56IGVzY3Jvd19hZnRlcl9hc3NlcnRANwogICAgYnl0ZWMgOCAvLyAiRVJSOmVyck9mZXgiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyT2ZleAoKZXNjcm93X2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozNjcKICAgIC8vIGNvbnN0IHNlbmRlclBhcnRpY2lwYW50S2V5ID0geyBpZCwgYWRkcmVzczogVHhuLnNlbmRlciB9CiAgICBkdXAKICAgIHR4biBTZW5kZXIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozNjgKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnBhcnRpY2lwYW50cyhzZW5kZXJQYXJ0aWNpcGFudEtleSkuZXhpc3RzLCBlcnJOb3RBUGFydGljaXBhbnQpCiAgICBkdXAKICAgIGV4dHJhY3QgMCA4CiAgICBzd2FwCiAgICBleHRyYWN0IDggMzIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2OAogICAgLy8gcGFydGljaXBhbnRzID0gQm94TWFwPFBhcnRpY2lwYW50S2V5LCBSZWZ1bmRWYWx1ZT4oeyBrZXlQcmVmaXg6IEh5cGVyU3dhcEJveFByZWZpeFBhcnRpY2lwYW50cyB9KQogICAgYnl0ZWNfMSAvLyAicCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozNjgKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnBhcnRpY2lwYW50cyhzZW5kZXJQYXJ0aWNpcGFudEtleSkuZXhpc3RzLCBlcnJOb3RBUGFydGljaXBhbnQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBlc2Nyb3dfYWZ0ZXJfYXNzZXJ0QDkKICAgIGJ5dGVjIDE2IC8vICJFUlI6ZXJyTnBydCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOcHJ0Cgplc2Nyb3dfYWZ0ZXJfYXNzZXJ0QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjM3MAogICAgLy8gY29uc3QgaGFzaCA9IHNoYTI1NihzaGEyNTYoQnl0ZXNgJHtUeG4uc2VuZGVyLmJ5dGVzfSR7cmVjZWl2ZXIuYnl0ZXN9JHtpdG9iKDApfSR7aXRvYihhbW91bnQpfWApKQogICAgdHhuIFNlbmRlcgogICAgdW5jb3ZlciA2CiAgICBjb25jYXQKICAgIGludGNfMCAvLyAwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIGRpZyAzCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHNoYTI1NgogICAgc2hhMjU2CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzcxCiAgICAvLyBjb25zdCBoYXNoS2V5OiBIYXNoS2V5ID0geyBpZCwgaGFzaCB9CiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo3MAogICAgLy8gaGFzaGVzID0gQm94TWFwPEhhc2hLZXksIFJlZnVuZFZhbHVlPih7IGtleVByZWZpeDogSHlwZXJTd2FwQm94UHJlZml4SGFzaGVzIH0pCiAgICBieXRlYyA5IC8vICJoIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzcyCiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMuaGFzaGVzKGhhc2hLZXkpLmV4aXN0cywgZXJyTGVhZkFscmVhZHlFc2Nyb3dlZCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogZXNjcm93X2FmdGVyX2Fzc2VydEAxMQogICAgYnl0ZWMgMjUgLy8gIkVSUjplcnJMYWVzIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckxhZXMKCmVzY3Jvd19hZnRlcl9hc3NlcnRAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjM3NAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMudmVyaWZ5TGVhZihpZCwgZmFsc2UsIGhhc2gsIHByb29mKSwgZXJyQ2FudFZlcmlmeUxlYWYpCiAgICB1bmNvdmVyIDcKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgNwogICAgY2FsbHN1YiB2ZXJpZnlMZWFmCiAgICBwb3AKICAgIGJueiBlc2Nyb3dfYWZ0ZXJfYXNzZXJ0QDEzCiAgICBieXRlYyAyNiAvLyAiRVJSOmVyckN2bGYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQ3ZsZgoKZXNjcm93X2FmdGVyX2Fzc2VydEAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjgKICAgIC8vIGxvZ2dlZEFzc2VydCh0eG4uY2xvc2VSZW1haW5kZXJUbyA9PT0gR2xvYmFsLnplcm9BZGRyZXNzLCBlcnJDbG9zZUZvcmJpZGRlbikKICAgIGRpZyAxCiAgICBndHhucyBDbG9zZVJlbWFpbmRlclRvCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgID09CiAgICBibnogZXNjcm93X2FmdGVyX2Fzc2VydEAyMgogICAgYnl0ZWMgMjcgLy8gIkVSUjplcnJOY2xzIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5jbHMKCmVzY3Jvd19hZnRlcl9hc3NlcnRAMjI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY5CiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLnJla2V5VG8gPT09IEdsb2JhbC56ZXJvQWRkcmVzcywgZXJyUmVrZXlGb3JiaWRkZW4pCiAgICBkaWcgMQogICAgZ3R4bnMgUmVrZXlUbwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYm56IGVzY3Jvd19hZnRlcl9hc3NlcnRAMjQKICAgIGJ5dGVjIDI4IC8vICJFUlI6ZXJyTnJreSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOcmt5Cgplc2Nyb3dfYWZ0ZXJfYXNzZXJ0QDI0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozODEKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJySW52YWxpZFBheW1lbnQpCiAgICBkaWcgMQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IGVzY3Jvd19hZnRlcl9hc3NlcnRAMTUKICAgIGJ5dGVjIDQgLy8gIkVSUjplcnJJcGF5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwYXkKCmVzY3Jvd19hZnRlcl9hc3NlcnRAMTU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjM4MgogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSBhbW91bnQgKyBjb3N0cy5oYXNoZXMsIGVyckludmFsaWRQYXltZW50KQogICAgZGlnIDEKICAgIGd0eG5zIEFtb3VudAogICAgdW5jb3ZlciAzCiAgICBpbnRjIDQgLy8gMzQ5MDAKICAgICsKICAgID09CiAgICBibnogZXNjcm93X2FmdGVyX2Fzc2VydEAxNwogICAgYnl0ZWMgNCAvLyAiRVJSOmVycklwYXkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBheQoKZXNjcm93X2FmdGVyX2Fzc2VydEAxNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Mzg2CiAgICAvLyBwYXlvcjogcGF5bWVudC5zZW5kZXIsCiAgICBzd2FwCiAgICBndHhucyBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzgyCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IGFtb3VudCArIGNvc3RzLmhhc2hlcywgZXJySW52YWxpZFBheW1lbnQpCiAgICBpbnRjIDQgLy8gMzQ5MDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Mzg1LTM4OAogICAgLy8gdGhpcy5oYXNoZXMoaGFzaEtleSkudmFsdWUgPSB7CiAgICAvLyAgIHBheW9yOiBwYXltZW50LnNlbmRlciwKICAgIC8vICAgYW1vdW50OiBjb3N0cy5oYXNoZXMKICAgIC8vIH0KICAgIGl0b2IKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozOTAKICAgIC8vIGNvbnN0IG5ld0VzY3Jvd2VkOiB1aW50NjQgPSBlc2Nyb3dlZCArIDEKICAgIGludGNfMSAvLyAxCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjM5MQogICAgLy8gdGhpcy5vZmZlcnMoaWQpLnZhbHVlLmVzY3Jvd2VkID0gbmV3RXNjcm93ZWQKICAgIGR1cAogICAgaXRvYgogICAgZGlnIDMKICAgIHB1c2hpbnQgNDEKICAgIHVuY292ZXIgMgogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Mzk0CiAgICAvLyBpZiAobGVhdmVzID09PSBuZXdFc2Nyb3dlZCkgewogICAgPT0KICAgIGJ6IGVzY3Jvd19hZnRlcl9pZl9lbHNlQDE5CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjM5NQogICAgLy8gdGhpcy5vZmZlcnMoaWQpLnZhbHVlLnN0YXRlID0gU1RBVEVfRElTQlVSU0lORwogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgYnl0ZWMgMTAgLy8gMHgxZQogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKCmVzY3Jvd19hZnRlcl9pZl9lbHNlQDE5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozNTgKICAgIC8vIGVzY3JvdyhwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGlkOiB1aW50NjQsIHJlY2VpdmVyOiBBY2NvdW50LCBhbW91bnQ6IHVpbnQ2NCwgcHJvb2Y6IFByb29mKSB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo6SHlwZXJTd2FwLmVzY3Jvd0FzYVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmVzY3Jvd0FzYToKICAgIHB1c2hieXRlcyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0MDktNDE3CiAgICAvLyBlc2Nyb3dBc2EoCiAgICAvLyAgIG1iclBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIGlkOiB1aW50NjQsCiAgICAvLyAgIHJlY2VpdmVyOiBBY2NvdW50LAogICAgLy8gICBhc3NldDogdWludDY0LAogICAgLy8gICBhbW91bnQ6IHVpbnQ2NCwKICAgIC8vICAgcHJvb2Y6IFByb29mCiAgICAvLyApIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBwdXNoaW50IDIKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA0IC8vIGF4ZmVyCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXhmZXIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgY292ZXIgMwogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBjb3ZlciAzCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciAzCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciA0CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA1CiAgICBkdXAKICAgIGNvdmVyIDUKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAzMgogICAgKgogICAgcHVzaGludCAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxieXRlc1szMl0+CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQxOQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMub2ZmZXJzKGlkKS5leGlzdHMsIGVyck9mZmVyTm90Rm91bmQpCiAgICBpdG9iCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjYKICAgIC8vIG9mZmVycyA9IEJveE1hcDx1aW50NjQsIE9mZmVyVmFsdWU+KHsga2V5UHJlZml4OiBIeXBlclN3YXBCb3hQcmVmaXhPZmZlcnMgfSkKICAgIGJ5dGVjXzAgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgY292ZXIgOQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0MTkKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLm9mZmVycyhpZCkuZXhpc3RzLCBlcnJPZmZlck5vdEZvdW5kKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogZXNjcm93QXNhX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlY18yIC8vICJFUlI6ZXJyTm9mciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOb2ZyCgplc2Nyb3dBc2FfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQyMAogICAgLy8gY29uc3QgeyBzdGF0ZSwgZXNjcm93ZWQsIGxlYXZlcywgZXhwaXJhdGlvbiB9ID0gdGhpcy5vZmZlcnMoaWQpLnZhbHVlCiAgICBkaWcgOAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGR1cAogICAgZXh0cmFjdCAwIDEKICAgIGRpZyAxCiAgICBwdXNoaW50IDQxCiAgICBleHRyYWN0X3VpbnQ2NAogICAgY292ZXIgOQogICAgZGlnIDEKICAgIHB1c2hpbnQgMzMKICAgIGV4dHJhY3RfdWludDY0CiAgICBjb3ZlciAxMAogICAgc3dhcAogICAgcHVzaGludCA5NwogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDIyCiAgICAvLyBsb2dnZWRBc3NlcnQoc3RhdGUgPT09IFNUQVRFX0VTQ1JPV0lORywgZXJySW52YWxpZFN0YXRlKQogICAgYnl0ZWMgNiAvLyAweDE0CiAgICA9PQogICAgYm56IGVzY3Jvd0FzYV9hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgNSAvLyAiRVJSOmVycklzdGUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXN0ZQoKZXNjcm93QXNhX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0MjQKICAgIC8vIGxvZ2dlZEFzc2VydChleHBpcmF0aW9uID4gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwgZXJyT2ZmZXJFeHBpcmVkKQogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgPgogICAgYm56IGVzY3Jvd0FzYV9hZnRlcl9hc3NlcnRANwogICAgYnl0ZWMgOCAvLyAiRVJSOmVyck9mZXgiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyT2ZleAoKZXNjcm93QXNhX2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0MjYKICAgIC8vIGNvbnN0IHNlbmRlclBhcnRpY2lwYW50S2V5ID0geyBpZCwgYWRkcmVzczogVHhuLnNlbmRlciB9CiAgICBkaWcgMQogICAgdHhuIFNlbmRlcgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQyNwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucGFydGljaXBhbnRzKHNlbmRlclBhcnRpY2lwYW50S2V5KS5leGlzdHMsIGVyck5vdEFQYXJ0aWNpcGFudCkKICAgIGR1cAogICAgZXh0cmFjdCAwIDgKICAgIHN3YXAKICAgIGV4dHJhY3QgOCAzMgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjY4CiAgICAvLyBwYXJ0aWNpcGFudHMgPSBCb3hNYXA8UGFydGljaXBhbnRLZXksIFJlZnVuZFZhbHVlPih7IGtleVByZWZpeDogSHlwZXJTd2FwQm94UHJlZml4UGFydGljaXBhbnRzIH0pCiAgICBieXRlY18xIC8vICJwIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQyNwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucGFydGljaXBhbnRzKHNlbmRlclBhcnRpY2lwYW50S2V5KS5leGlzdHMsIGVyck5vdEFQYXJ0aWNpcGFudCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGVzY3Jvd0FzYV9hZnRlcl9hc3NlcnRAOQogICAgYnl0ZWMgMTYgLy8gIkVSUjplcnJOcHJ0IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5wcnQKCmVzY3Jvd0FzYV9hZnRlcl9hc3NlcnRAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDI5CiAgICAvLyBjb25zdCBoYXNoID0gc2hhMjU2KHNoYTI1NihCeXRlc2Ake1R4bi5zZW5kZXIuYnl0ZXN9JHtyZWNlaXZlci5ieXRlc30ke2l0b2IoYXNzZXQpfSR7aXRvYihhbW91bnQpfWApKQogICAgdHhuIFNlbmRlcgogICAgZGlnIDMKICAgIGNvbmNhdAogICAgZGlnIDQKICAgIGl0b2IKICAgIGNvbmNhdAogICAgZGlnIDYKICAgIGl0b2IKICAgIGNvbmNhdAogICAgc2hhMjU2CiAgICBzaGEyNTYKICAgIGR1cAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0MzAKICAgIC8vIGNvbnN0IGhhc2hLZXk6IEhhc2hLZXkgPSB7IGlkLCBoYXNoIH0KICAgIHVuY292ZXIgMwogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjcwCiAgICAvLyBoYXNoZXMgPSBCb3hNYXA8SGFzaEtleSwgUmVmdW5kVmFsdWU+KHsga2V5UHJlZml4OiBIeXBlclN3YXBCb3hQcmVmaXhIYXNoZXMgfSkKICAgIGJ5dGVjIDkgLy8gImgiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0MzEKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5oYXNoZXMoaGFzaEtleSkuZXhpc3RzLCBlcnJMZWFmQWxyZWFkeUVzY3Jvd2VkKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBlc2Nyb3dBc2FfYWZ0ZXJfYXNzZXJ0QDExCiAgICBieXRlYyAyNSAvLyAiRVJSOmVyckxhZXMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTGFlcwoKZXNjcm93QXNhX2FmdGVyX2Fzc2VydEAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDMzCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy52ZXJpZnlMZWFmKGlkLCBmYWxzZSwgaGFzaCwgcHJvb2YpLCBlcnJDYW50VmVyaWZ5TGVhZikKICAgIHVuY292ZXIgMTAKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDQKICAgIHVuY292ZXIgNwogICAgY2FsbHN1YiB2ZXJpZnlMZWFmCiAgICBwb3AKICAgIGJueiBlc2Nyb3dBc2FfYWZ0ZXJfYXNzZXJ0QDEzCiAgICBieXRlYyAyNiAvLyAiRVJSOmVyckN2bGYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQ3ZsZgoKZXNjcm93QXNhX2FmdGVyX2Fzc2VydEAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDM3CiAgICAvLyBsZXQgbWJyQW1vdW50ID0gY29zdHMuaGFzaGVzCiAgICBpbnRjIDQgLy8gMzQ5MDAKICAgIGJ1cnkgMTAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDQwCiAgICAvLyBpZiAoIXJlY2VpdmVyLmlzT3B0ZWRJbihBc3NldChhc3NldCkpKSB7CiAgICB1bmNvdmVyIDIKICAgIGRpZyAzCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYm56IGVzY3Jvd0FzYV9hZnRlcl9pZl9lbHNlQDE1CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQzNwogICAgLy8gbGV0IG1ickFtb3VudCA9IGNvc3RzLmhhc2hlcwogICAgaW50YyA0IC8vIDM0OTAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQ0MQogICAgLy8gbWJyQW1vdW50ICs9IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICArCiAgICBidXJ5IDkKCmVzY3Jvd0FzYV9hZnRlcl9pZl9lbHNlQDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0NDQKICAgIC8vIGxvZ2dlZEFzc2VydChtYnJQYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJySW52YWxpZFBheW1lbnQpCiAgICBkaWcgNAogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IGVzY3Jvd0FzYV9hZnRlcl9hc3NlcnRAMTcKICAgIGJ5dGVjIDQgLy8gIkVSUjplcnJJcGF5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwYXkKCmVzY3Jvd0FzYV9hZnRlcl9hc3NlcnRAMTc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQ0NQogICAgLy8gbG9nZ2VkQXNzZXJ0KG1iclBheW1lbnQuYW1vdW50ID09PSBtYnJBbW91bnQsIGVyckludmFsaWRQYXltZW50KQogICAgZGlnIDQKICAgIGd0eG5zIEFtb3VudAogICAgZGlnIDkKICAgID09CiAgICBibnogZXNjcm93QXNhX2FmdGVyX2Fzc2VydEAxOQogICAgYnl0ZWMgNCAvLyAiRVJSOmVycklwYXkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBheQoKZXNjcm93QXNhX2FmdGVyX2Fzc2VydEAxOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDQ4CiAgICAvLyBhc3NlcnRTYWZlQXNzZXRUcmFuc2Zlcihhc3NldFhmZXIsIFR4bi5zZW5kZXIpCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE3NwogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5zZW5kZXIgPT09IHNlbmRlciwgZXJySW52YWxpZFBheW1lbnRTZW5kZXIpCiAgICBkaWcgMQogICAgZ3R4bnMgU2VuZGVyCiAgICA9PQogICAgYm56IGVzY3Jvd0FzYV9hZnRlcl9hc3NlcnRAMzAKICAgIHB1c2hieXRlcyAiRVJSOmVycklwbXMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBtcwoKZXNjcm93QXNhX2FmdGVyX2Fzc2VydEAzMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTc4CiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLmFzc2V0U2VuZGVyID09PSBHbG9iYWwuemVyb0FkZHJlc3MsIGVyckNsYXdiYWNrRm9yYmlkZGVuKQogICAgZHVwCiAgICBndHhucyBBc3NldFNlbmRlcgogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYm56IGVzY3Jvd0FzYV9hZnRlcl9hc3NlcnRAMzIKICAgIHB1c2hieXRlcyAiRVJSOmVyck5jbHciCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmNsdwoKZXNjcm93QXNhX2FmdGVyX2Fzc2VydEAzMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTc5CiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLmFzc2V0Q2xvc2VUbyA9PT0gR2xvYmFsLnplcm9BZGRyZXNzLCBlcnJDbG9zZUZvcmJpZGRlbikKICAgIGR1cAogICAgZ3R4bnMgQXNzZXRDbG9zZVRvCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgID09CiAgICBibnogZXNjcm93QXNhX2FmdGVyX2Fzc2VydEAzNAogICAgYnl0ZWMgMjcgLy8gIkVSUjplcnJOY2xzIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5jbHMKCmVzY3Jvd0FzYV9hZnRlcl9hc3NlcnRAMzQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE4MAogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5yZWtleVRvID09PSBHbG9iYWwuemVyb0FkZHJlc3MsIGVyclJla2V5Rm9yYmlkZGVuKQogICAgZHVwCiAgICBndHhucyBSZWtleVRvCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgID09CiAgICBibnogZXNjcm93QXNhX2FmdGVyX2Fzc2VydEAzNgogICAgYnl0ZWMgMjggLy8gIkVSUjplcnJOcmt5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5ya3kKCmVzY3Jvd0FzYV9hZnRlcl9hc3NlcnRAMzY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQ0OQogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci5hc3NldFJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJySW52YWxpZFRyYW5zZmVyKQogICAgZHVwCiAgICBndHhucyBBc3NldFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBlc2Nyb3dBc2FfYWZ0ZXJfYXNzZXJ0QDIxCiAgICBieXRlYyAxNyAvLyAiRVJSOmVyckl4ZnIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXhmcgoKZXNjcm93QXNhX2FmdGVyX2Fzc2VydEAyMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDUwCiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLnhmZXJBc3NldCA9PT0gQXNzZXQoYXNzZXQpLCBlcnJJbnZhbGlkVHJhbnNmZXIpCiAgICBkdXAKICAgIGd0eG5zIFhmZXJBc3NldAogICAgdW5jb3ZlciAzCiAgICA9PQogICAgYm56IGVzY3Jvd0FzYV9hZnRlcl9hc3NlcnRAMjMKICAgIGJ5dGVjIDE3IC8vICJFUlI6ZXJySXhmciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJeGZyCgplc2Nyb3dBc2FfYWZ0ZXJfYXNzZXJ0QDIzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0NTEKICAgIC8vIGxvZ2dlZEFzc2VydChhc3NldFhmZXIuYXNzZXRBbW91bnQgPT09IGFtb3VudCwgZXJySW52YWxpZFRyYW5zZmVyKQogICAgZ3R4bnMgQXNzZXRBbW91bnQKICAgIHVuY292ZXIgMgogICAgPT0KICAgIGJueiBlc2Nyb3dBc2FfYWZ0ZXJfYXNzZXJ0QDI1CiAgICBieXRlYyAxNyAvLyAiRVJSOmVyckl4ZnIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXhmcgoKZXNjcm93QXNhX2FmdGVyX2Fzc2VydEAyNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDU1CiAgICAvLyBwYXlvcjogbWJyUGF5bWVudC5zZW5kZXIsCiAgICBzd2FwCiAgICBndHhucyBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDU0LTQ1NwogICAgLy8gdGhpcy5oYXNoZXMoaGFzaEtleSkudmFsdWUgPSB7CiAgICAvLyAgIHBheW9yOiBtYnJQYXltZW50LnNlbmRlciwKICAgIC8vICAgYW1vdW50OiBtYnJBbW91bnQKICAgIC8vIH0KICAgIGRpZyA1CiAgICBpdG9iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDU5CiAgICAvLyBjb25zdCBuZXdFc2Nyb3dlZDogdWludDY0ID0gZXNjcm93ZWQgKyAxCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0NjAKICAgIC8vIHRoaXMub2ZmZXJzKGlkKS52YWx1ZS5lc2Nyb3dlZCA9IG5ld0VzY3Jvd2VkCiAgICBkdXAKICAgIGl0b2IKICAgIGRpZyAzCiAgICBwdXNoaW50IDQxCiAgICB1bmNvdmVyIDIKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQ2MgogICAgLy8gaWYgKGxlYXZlcyA9PT0gbmV3RXNjcm93ZWQpIHsKICAgID09CiAgICBieiBlc2Nyb3dBc2FfYWZ0ZXJfaWZfZWxzZUAyNwogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0NjMKICAgIC8vIHRoaXMub2ZmZXJzKGlkKS52YWx1ZS5zdGF0ZSA9IFNUQVRFX0RJU0JVUlNJTkcKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGJ5dGVjIDEwIC8vIDB4MWUKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCgplc2Nyb3dBc2FfYWZ0ZXJfaWZfZWxzZUAyNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDA5LTQxNwogICAgLy8gZXNjcm93QXNhKAogICAgLy8gICBtYnJQYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICBpZDogdWludDY0LAogICAgLy8gICByZWNlaXZlcjogQWNjb3VudCwKICAgIC8vICAgYXNzZXQ6IHVpbnQ2NCwKICAgIC8vICAgYW1vdW50OiB1aW50NjQsCiAgICAvLyAgIHByb29mOiBQcm9vZgogICAgLy8gKSB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo6SHlwZXJTd2FwLmRpc2J1cnNlW3JvdXRpbmddKCkgLT4gdm9pZDoKZGlzYnVyc2U6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQ3NwogICAgLy8gZGlzYnVyc2UoaWQ6IHVpbnQ2NCwgcmVjZWl2ZXJXYWxsZXQ6IHVpbnQ2NCwgcmVjZWl2ZXI6IEFjY291bnQsIGFzc2V0OiB1aW50NjQsIGFtb3VudDogdWludDY0KSB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDUKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDc4CiAgICAvLyB0aGlzLnJlbGVhc2UoaWQsIFR4bi5zZW5kZXIsIHJlY2VpdmVyV2FsbGV0LCByZWNlaXZlciwgYXNzZXQsIGFtb3VudCkKICAgIHR4biBTZW5kZXIKICAgIHVuY292ZXIgNQogICAgc3dhcAogICAgY292ZXIgNQogICAgY292ZXIgNQogICAgY2FsbHN1YiByZWxlYXNlCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQ3NwogICAgLy8gZGlzYnVyc2UoaWQ6IHVpbnQ2NCwgcmVjZWl2ZXJXYWxsZXQ6IHVpbnQ2NCwgcmVjZWl2ZXI6IEFjY291bnQsIGFzc2V0OiB1aW50NjQsIGFtb3VudDogdWludDY0KSB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo6SHlwZXJTd2FwLmRpc2J1cnNlRnJvbVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmRpc2J1cnNlRnJvbToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDkyCiAgICAvLyBkaXNidXJzZUZyb20oaWQ6IHVpbnQ2NCwgZnJvbTogQWNjb3VudCwgcmVjZWl2ZXJXYWxsZXQ6IHVpbnQ2NCwgcmVjZWl2ZXI6IEFjY291bnQsIGFzc2V0OiB1aW50NjQsIGFtb3VudDogdWludDY0KSB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0OTMKICAgIC8vIHRoaXMucmVsZWFzZShpZCwgZnJvbSwgcmVjZWl2ZXJXYWxsZXQsIHJlY2VpdmVyLCBhc3NldCwgYW1vdW50KQogICAgY2FsbHN1YiByZWxlYXNlCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQ5MgogICAgLy8gZGlzYnVyc2VGcm9tKGlkOiB1aW50NjQsIGZyb206IEFjY291bnQsIHJlY2VpdmVyV2FsbGV0OiB1aW50NjQsIHJlY2VpdmVyOiBBY2NvdW50LCBhc3NldDogdWludDY0LCBhbW91bnQ6IHVpbnQ2NCkgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Okh5cGVyU3dhcC5jYW5jZWxbcm91dGluZ10oKSAtPiB2b2lkOgpjYW5jZWw6CiAgICBpbnRjXzAgLy8gMAogICAgcHVzaGJ5dGVzICIiCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTA0CiAgICAvLyBjYW5jZWwoaWQ6IHVpbnQ2NCwgcHJvb2Y6IFByb29mKSB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMzIKICAgICoKICAgIHB1c2hpbnQgMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8Ynl0ZXNbMzJdPgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1MDYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLm9mZmVycyhpZCkuZXhpc3RzLCBlcnJPZmZlck5vdEZvdW5kKQogICAgaXRvYgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjY2CiAgICAvLyBvZmZlcnMgPSBCb3hNYXA8dWludDY0LCBPZmZlclZhbHVlPih7IGtleVByZWZpeDogSHlwZXJTd2FwQm94UHJlZml4T2ZmZXJzIH0pCiAgICBieXRlY18wIC8vICJvIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTA2CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5vZmZlcnMoaWQpLmV4aXN0cywgZXJyT2ZmZXJOb3RGb3VuZCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGNhbmNlbF9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWNfMiAvLyAiRVJSOmVyck5vZnIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTm9mcgoKY2FuY2VsX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1MDcKICAgIC8vIGNvbnN0IHsgc3RhdGUsIGVzY3Jvd2VkLCBsZWF2ZXMsIGV4cGlyYXRpb24gfSA9IHRoaXMub2ZmZXJzKGlkKS52YWx1ZQogICAgZHVwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZHVwCiAgICBleHRyYWN0IDAgMQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBidXJ5IDcKICAgIGR1cAogICAgcHVzaGludCA0MQogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDQKICAgIGR1cAogICAgcHVzaGludCAzMwogICAgZXh0cmFjdF91aW50NjQKICAgIGJ1cnkgNgogICAgcHVzaGludCA5NwogICAgZXh0cmFjdF91aW50NjQKICAgIGJ1cnkgNgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1MDkKICAgIC8vIHN0YXRlID09PSBTVEFURV9PRkZFUkVEIHx8IHN0YXRlID09PSBTVEFURV9FU0NST1dJTkcgfHwKICAgIGJ5dGVjIDcgLy8gMHgwYQogICAgPT0KICAgIGJueiBjYW5jZWxfYm9vbF90cnVlQDgKICAgIGRpZyA1CiAgICBieXRlYyA2IC8vIDB4MTQKICAgID09CiAgICBibnogY2FuY2VsX2Jvb2xfdHJ1ZUA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjUxMAogICAgLy8gKHN0YXRlID09PSBTVEFURV9ESVNCVVJTSU5HICYmIGVzY3Jvd2VkID09PSBsZWF2ZXMgJiYgZXhwaXJhdGlvbiA8PSBHbG9iYWwubGF0ZXN0VGltZXN0YW1wKSwKICAgIGRpZyA1CiAgICBieXRlYyAxMCAvLyAweDFlCiAgICA9PQogICAgYnogY2FuY2VsX2Jvb2xfZmFsc2VAOQogICAgZGlnIDIKICAgIGRpZyA0CiAgICA9PQogICAgYnogY2FuY2VsX2Jvb2xfZmFsc2VAOQogICAgZGlnIDQKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIDw9CiAgICBieiBjYW5jZWxfYm9vbF9mYWxzZUA5CgpjYW5jZWxfYm9vbF90cnVlQDg6CiAgICBpbnRjXzEgLy8gMQoKY2FuY2VsX2Jvb2xfbWVyZ2VAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjUwOC01MTIKICAgIC8vIGxvZ2dlZEFzc2VydCgKICAgIC8vICAgc3RhdGUgPT09IFNUQVRFX09GRkVSRUQgfHwgc3RhdGUgPT09IFNUQVRFX0VTQ1JPV0lORyB8fAogICAgLy8gICAoc3RhdGUgPT09IFNUQVRFX0RJU0JVUlNJTkcgJiYgZXNjcm93ZWQgPT09IGxlYXZlcyAmJiBleHBpcmF0aW9uIDw9IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXApLAogICAgLy8gICBlcnJJbnZhbGlkU3RhdGUKICAgIC8vICkKICAgIGJueiBjYW5jZWxfYWZ0ZXJfYXNzZXJ0QDEyCiAgICBieXRlYyA1IC8vICJFUlI6ZXJySXN0ZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJc3RlCgpjYW5jZWxfYWZ0ZXJfYXNzZXJ0QDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1MTYKICAgIC8vIGNvbnN0IHNlbmRlclBhcnRpY2lwYW50S2V5ID0geyBpZCwgYWRkcmVzczogVHhuLnNlbmRlciB9CiAgICB0eG4gU2VuZGVyCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1MTcKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnBhcnRpY2lwYW50cyhzZW5kZXJQYXJ0aWNpcGFudEtleSkuZXhpc3RzLCBlcnJOb3RBY2NlcHRlZCkKICAgIGR1cAogICAgZXh0cmFjdCAwIDgKICAgIHN3YXAKICAgIGV4dHJhY3QgOCAzMgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjY4CiAgICAvLyBwYXJ0aWNpcGFudHMgPSBCb3hNYXA8UGFydGljaXBhbnRLZXksIFJlZnVuZFZhbHVlPih7IGtleVByZWZpeDogSHlwZXJTd2FwQm94UHJlZml4UGFydGljaXBhbnRzIH0pCiAgICBieXRlY18xIC8vICJwIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjUxNwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucGFydGljaXBhbnRzKHNlbmRlclBhcnRpY2lwYW50S2V5KS5leGlzdHMsIGVyck5vdEFjY2VwdGVkKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogY2FuY2VsX2FmdGVyX2Fzc2VydEAxNAogICAgcHVzaGJ5dGVzICJFUlI6ZXJyTmFjcCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOYWNwCgpjYW5jZWxfYWZ0ZXJfYXNzZXJ0QDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1MjAKICAgIC8vIGlmIChlc2Nyb3dlZCA9PT0gMCkgewogICAgc3dhcAogICAgYm56IGNhbmNlbF9lbHNlX2JvZHlAMTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTIxCiAgICAvLyB0aGlzLm9mZmVycyhpZCkudmFsdWUuc3RhdGUgPSBTVEFURV9DQU5DRUxfQ09NUExFVEVECiAgICBpbnRjXzAgLy8gMAogICAgYnl0ZWMgMTEgLy8gMHgzYwogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKCmNhbmNlbF9hZnRlcl9pZl9lbHNlQDE3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1MDQKICAgIC8vIGNhbmNlbChpZDogdWludDY0LCBwcm9vZjogUHJvb2YpIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmNhbmNlbF9lbHNlX2JvZHlAMTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjUyMwogICAgLy8gdGhpcy5vZmZlcnMoaWQpLnZhbHVlLnN0YXRlID0gU1RBVEVfQ0FOQ0VMTEVECiAgICBpbnRjXzAgLy8gMAogICAgYnl0ZWMgMTggLy8gMHgzMgogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGIgY2FuY2VsX2FmdGVyX2lmX2Vsc2VAMTcKCmNhbmNlbF9ib29sX2ZhbHNlQDk6CiAgICBpbnRjXzAgLy8gMAogICAgYiBjYW5jZWxfYm9vbF9tZXJnZUAxMAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Okh5cGVyU3dhcC53aXRoZHJhd1tyb3V0aW5nXSgpIC0+IHZvaWQ6CndpdGhkcmF3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1MzYKICAgIC8vIHdpdGhkcmF3KGlkOiB1aW50NjQsIHJlY2VpdmVyOiBBY2NvdW50LCBhc3NldDogdWludDY0LCBhbW91bnQ6IHVpbnQ2NCwgcHJvb2Y6IFByb29mKSB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDUKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAzMgogICAgKgogICAgcHVzaGludCAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxieXRlc1szMl0+CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjUzNwogICAgLy8gdGhpcy5yZXR1cm5MZWFmKGlkLCBUeG4uc2VuZGVyLCByZWNlaXZlciwgYXNzZXQsIGFtb3VudCkKICAgIHR4biBTZW5kZXIKICAgIHVuY292ZXIgNAogICAgc3dhcAogICAgY292ZXIgNAogICAgY292ZXIgNAogICAgY2FsbHN1YiByZXR1cm5MZWFmCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjUzNgogICAgLy8gd2l0aGRyYXcoaWQ6IHVpbnQ2NCwgcmVjZWl2ZXI6IEFjY291bnQsIGFzc2V0OiB1aW50NjQsIGFtb3VudDogdWludDY0LCBwcm9vZjogUHJvb2YpIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjpIeXBlclN3YXAud2l0aGRyYXdGb3Jbcm91dGluZ10oKSAtPiB2b2lkOgp3aXRoZHJhd0ZvcjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTUyCiAgICAvLyB3aXRoZHJhd0ZvcihpZDogdWludDY0LCBmcm9tOiBBY2NvdW50LCByZWNlaXZlcjogQWNjb3VudCwgYXNzZXQ6IHVpbnQ2NCwgYW1vdW50OiB1aW50NjQpIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA1CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU1MwogICAgLy8gdGhpcy5yZXR1cm5MZWFmKGlkLCBmcm9tLCByZWNlaXZlciwgYXNzZXQsIGFtb3VudCkKICAgIGNhbGxzdWIgcmV0dXJuTGVhZgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1NTIKICAgIC8vIHdpdGhkcmF3Rm9yKGlkOiB1aW50NjQsIGZyb206IEFjY291bnQsIHJlY2VpdmVyOiBBY2NvdW50LCBhc3NldDogdWludDY0LCBhbW91bnQ6IHVpbnQ2NCkgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Okh5cGVyU3dhcC5jbGVhbnVwUGFydGljaXBhbnRbcm91dGluZ10oKSAtPiB2b2lkOgpjbGVhbnVwUGFydGljaXBhbnQ6CiAgICBpbnRjXzAgLy8gMAogICAgcHVzaGJ5dGVzICIiCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjEyCiAgICAvLyBjbGVhbnVwUGFydGljaXBhbnQoaWQ6IHVpbnQ2NCwgcGFydGljaXBhbnQ6IEFjY291bnQpIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgY292ZXIgMgogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2MTMKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLm9mZmVycyhpZCkuZXhpc3RzLCBlcnJPZmZlck5vdEZvdW5kKQogICAgaXRvYgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjY2CiAgICAvLyBvZmZlcnMgPSBCb3hNYXA8dWludDY0LCBPZmZlclZhbHVlPih7IGtleVByZWZpeDogSHlwZXJTd2FwQm94UHJlZml4T2ZmZXJzIH0pCiAgICBieXRlY18wIC8vICJvIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjEzCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5vZmZlcnMoaWQpLmV4aXN0cywgZXJyT2ZmZXJOb3RGb3VuZCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGNsZWFudXBQYXJ0aWNpcGFudF9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWNfMiAvLyAiRVJSOmVyck5vZnIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTm9mcgoKY2xlYW51cFBhcnRpY2lwYW50X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2MTQKICAgIC8vIGNvbnN0IHsgc3RhdGUsIGV4cGlyYXRpb24sIGFjY2VwdGFuY2VzLCBlc2Nyb3dlZCB9ID0gdGhpcy5vZmZlcnMoaWQpLnZhbHVlCiAgICBkaWcgMQogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGR1cAogICAgZXh0cmFjdCAwIDEKICAgIGR1cAogICAgY292ZXIgMgogICAgYnVyeSA4CiAgICBkdXAKICAgIHB1c2hpbnQgOTcKICAgIGV4dHJhY3RfdWludDY0CiAgICBidXJ5IDYKICAgIGR1cAogICAgcHVzaGludCA4OQogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDQKICAgIHB1c2hpbnQgNDEKICAgIGV4dHJhY3RfdWludDY0CiAgICBidXJ5IDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjE3CiAgICAvLyBjb25zdCBpc0NvbXBsZXRlZCA9IHN0YXRlID09PSBTVEFURV9DT01QTEVURUQgfHwgc3RhdGUgPT09IFNUQVRFX0NBTkNFTF9DT01QTEVURUQgfHwgc3RhdGUgPT09IFNUQVRFX0NBTkNFTExFRAogICAgYnl0ZWMgMTkgLy8gMHgyOAogICAgPT0KICAgIGJueiBjbGVhbnVwUGFydGljaXBhbnRfYm9vbF90cnVlQDYKICAgIGRpZyA2CiAgICBieXRlYyAxMSAvLyAweDNjCiAgICA9PQogICAgYm56IGNsZWFudXBQYXJ0aWNpcGFudF9ib29sX3RydWVANgogICAgZGlnIDYKICAgIGJ5dGVjIDE4IC8vIDB4MzIKICAgID09CiAgICBieiBjbGVhbnVwUGFydGljaXBhbnRfYm9vbF9mYWxzZUA3CgpjbGVhbnVwUGFydGljaXBhbnRfYm9vbF90cnVlQDY6CiAgICBpbnRjXzEgLy8gMQoKY2xlYW51cFBhcnRpY2lwYW50X2Jvb2xfbWVyZ2VAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjE4CiAgICAvLyBjb25zdCBpc0V4cGlyZWQgPSAoc3RhdGUgPT09IFNUQVRFX09GRkVSRUQgfHwgc3RhdGUgPT09IFNUQVRFX0VTQ1JPV0lORykgJiYgZXhwaXJhdGlvbiA8PSBHbG9iYWwubGF0ZXN0VGltZXN0YW1wICYmIGVzY3Jvd2VkID09PSAwCiAgICBkaWcgNwogICAgYnl0ZWMgNyAvLyAweDBhCiAgICA9PQogICAgYm56IGNsZWFudXBQYXJ0aWNpcGFudF9hbmRfY29udGRAMTAKICAgIGRpZyA3CiAgICBieXRlYyA2IC8vIDB4MTQKICAgID09CiAgICBieiBjbGVhbnVwUGFydGljaXBhbnRfYm9vbF9mYWxzZUAxMwoKY2xlYW51cFBhcnRpY2lwYW50X2FuZF9jb250ZEAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjE4CiAgICAvLyBjb25zdCBpc0V4cGlyZWQgPSAoc3RhdGUgPT09IFNUQVRFX09GRkVSRUQgfHwgc3RhdGUgPT09IFNUQVRFX0VTQ1JPV0lORykgJiYgZXhwaXJhdGlvbiA8PSBHbG9iYWwubGF0ZXN0VGltZXN0YW1wICYmIGVzY3Jvd2VkID09PSAwCiAgICBkaWcgNQogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgPD0KICAgIGJ6IGNsZWFudXBQYXJ0aWNpcGFudF9ib29sX2ZhbHNlQDEzCiAgICBkaWcgNgogICAgYm56IGNsZWFudXBQYXJ0aWNpcGFudF9ib29sX2ZhbHNlQDEzCiAgICBpbnRjXzEgLy8gMQoKY2xlYW51cFBhcnRpY2lwYW50X2Jvb2xfbWVyZ2VAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjYxOQogICAgLy8gbG9nZ2VkQXNzZXJ0KGlzQ29tcGxldGVkIHx8IGlzRXhwaXJlZCwgZXJySW52YWxpZFN0YXRlKQogICAgfHwKICAgIGJueiBjbGVhbnVwUGFydGljaXBhbnRfYWZ0ZXJfYXNzZXJ0QDE2CiAgICBieXRlYyA1IC8vICJFUlI6ZXJySXN0ZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJc3RlCgpjbGVhbnVwUGFydGljaXBhbnRfYWZ0ZXJfYXNzZXJ0QDE2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2MjEKICAgIC8vIGNvbnN0IHBhcnRpY2lwYW50S2V5OiBQYXJ0aWNpcGFudEtleSA9IHsgaWQsIGFkZHJlc3M6IHBhcnRpY2lwYW50IH0KICAgIGRpZyAzCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjgKICAgIC8vIHBhcnRpY2lwYW50cyA9IEJveE1hcDxQYXJ0aWNpcGFudEtleSwgUmVmdW5kVmFsdWU+KHsga2V5UHJlZml4OiBIeXBlclN3YXBCb3hQcmVmaXhQYXJ0aWNpcGFudHMgfSkKICAgIGJ5dGVjXzEgLy8gInAiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2MjIKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnBhcnRpY2lwYW50cyhwYXJ0aWNpcGFudEtleSkuZXhpc3RzLCBlcnJQYXJ0aWNpcGFudE5vdEZvdW5kKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogY2xlYW51cFBhcnRpY2lwYW50X2FmdGVyX2Fzc2VydEAxOAogICAgcHVzaGJ5dGVzICJFUlI6ZXJyTnBmZCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOcGZkCgpjbGVhbnVwUGFydGljaXBhbnRfYWZ0ZXJfYXNzZXJ0QDE4OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2MjQKICAgIC8vIGNvbnN0IHsgcGF5b3IsIGFtb3VudCB9ID0gdGhpcy5wYXJ0aWNpcGFudHMocGFydGljaXBhbnRLZXkpLnZhbHVlCiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBkdXAKICAgIGV4dHJhY3QgOCAzMgogICAgc3dhcAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjYyNQogICAgLy8gdGhpcy5wYXJ0aWNpcGFudHMocGFydGljaXBhbnRLZXkpLmRlbGV0ZSgpCiAgICB1bmNvdmVyIDIKICAgIGJveF9kZWwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2MjgKICAgIC8vIHRoaXMub2ZmZXJzKGlkKS52YWx1ZS5hY2NlcHRhbmNlcyA9IGFjY2VwdGFuY2VzIC0gMQogICAgdW5jb3ZlciAzCiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgaXRvYgogICAgdW5jb3ZlciAzCiAgICBwdXNoaW50IDg5CiAgICB1bmNvdmVyIDIKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjYzMQogICAgLy8gdGhpcy5yZWZ1bmRTdG9yYWdlKHBheW9yLCBwYXJ0aWNpcGFudCwgYW1vdW50KQogICAgc3dhcAogICAgY292ZXIgMgogICAgY2FsbHN1YiByZWZ1bmRTdG9yYWdlCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjYxMgogICAgLy8gY2xlYW51cFBhcnRpY2lwYW50KGlkOiB1aW50NjQsIHBhcnRpY2lwYW50OiBBY2NvdW50KSB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpjbGVhbnVwUGFydGljaXBhbnRfYm9vbF9mYWxzZUAxMzoKICAgIGludGNfMCAvLyAwCiAgICBiIGNsZWFudXBQYXJ0aWNpcGFudF9ib29sX21lcmdlQDE0CgpjbGVhbnVwUGFydGljaXBhbnRfYm9vbF9mYWxzZUA3OgogICAgaW50Y18wIC8vIDAKICAgIGIgY2xlYW51cFBhcnRpY2lwYW50X2Jvb2xfbWVyZ2VAOAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Okh5cGVyU3dhcC5jbGVhbnVwT2ZmZXJbcm91dGluZ10oKSAtPiB2b2lkOgpjbGVhbnVwT2ZmZXI6CiAgICBpbnRjXzAgLy8gMAogICAgcHVzaGJ5dGVzICIiCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjQwCiAgICAvLyBjbGVhbnVwT2ZmZXIoaWQ6IHVpbnQ2NCkgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2NDEKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLm9mZmVycyhpZCkuZXhpc3RzLCBlcnJPZmZlck5vdEZvdW5kKQogICAgaXRvYgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjY2CiAgICAvLyBvZmZlcnMgPSBCb3hNYXA8dWludDY0LCBPZmZlclZhbHVlPih7IGtleVByZWZpeDogSHlwZXJTd2FwQm94UHJlZml4T2ZmZXJzIH0pCiAgICBieXRlY18wIC8vICJvIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjQxCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5vZmZlcnMoaWQpLmV4aXN0cywgZXJyT2ZmZXJOb3RGb3VuZCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGNsZWFudXBPZmZlcl9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWNfMiAvLyAiRVJSOmVyck5vZnIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTm9mcgoKY2xlYW51cE9mZmVyX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2NDIKICAgIC8vIGNvbnN0IHsgc3RhdGUsIGV4cGlyYXRpb24sIGFjY2VwdGFuY2VzLCBlc2Nyb3dlZCB9ID0gdGhpcy5vZmZlcnMoaWQpLnZhbHVlCiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBkdXAKICAgIGV4dHJhY3QgMCAxCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGJ1cnkgNwogICAgZHVwCiAgICBwdXNoaW50IDk3CiAgICBleHRyYWN0X3VpbnQ2NAogICAgYnVyeSA1CiAgICBkdXAKICAgIHB1c2hpbnQgODkKICAgIGV4dHJhY3RfdWludDY0CiAgICBjb3ZlciAzCiAgICBwdXNoaW50IDQxCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYnVyeSA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjY0NQogICAgLy8gY29uc3QgaXNDb21wbGV0ZWQgPSBzdGF0ZSA9PT0gU1RBVEVfQ09NUExFVEVEIHx8IHN0YXRlID09PSBTVEFURV9DQU5DRUxfQ09NUExFVEVECiAgICBieXRlYyAxOSAvLyAweDI4CiAgICA9PQogICAgYm56IGNsZWFudXBPZmZlcl9ib29sX3RydWVANQogICAgZGlnIDUKICAgIGJ5dGVjIDExIC8vIDB4M2MKICAgID09CiAgICBieiBjbGVhbnVwT2ZmZXJfYm9vbF9mYWxzZUA2CgpjbGVhbnVwT2ZmZXJfYm9vbF90cnVlQDU6CiAgICBpbnRjXzEgLy8gMQoKY2xlYW51cE9mZmVyX2Jvb2xfbWVyZ2VANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjQ2CiAgICAvLyBjb25zdCBpc0V4cGlyZWQgPSAoc3RhdGUgPT09IFNUQVRFX09GRkVSRUQgfHwgc3RhdGUgPT09IFNUQVRFX0VTQ1JPV0lORykgJiYgZXhwaXJhdGlvbiA8PSBHbG9iYWwubGF0ZXN0VGltZXN0YW1wICYmIGVzY3Jvd2VkID09PSAwCiAgICBkaWcgNgogICAgYnl0ZWMgNyAvLyAweDBhCiAgICA9PQogICAgYm56IGNsZWFudXBPZmZlcl9hbmRfY29udGRAOQogICAgZGlnIDYKICAgIGJ5dGVjIDYgLy8gMHgxNAogICAgPT0KICAgIGJ6IGNsZWFudXBPZmZlcl9ib29sX2ZhbHNlQDEyCgpjbGVhbnVwT2ZmZXJfYW5kX2NvbnRkQDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjY0NgogICAgLy8gY29uc3QgaXNFeHBpcmVkID0gKHN0YXRlID09PSBTVEFURV9PRkZFUkVEIHx8IHN0YXRlID09PSBTVEFURV9FU0NST1dJTkcpICYmIGV4cGlyYXRpb24gPD0gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCAmJiBlc2Nyb3dlZCA9PT0gMAogICAgZGlnIDQKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIDw9CiAgICBieiBjbGVhbnVwT2ZmZXJfYm9vbF9mYWxzZUAxMgogICAgZGlnIDUKICAgIGJueiBjbGVhbnVwT2ZmZXJfYm9vbF9mYWxzZUAxMgogICAgaW50Y18xIC8vIDEKCmNsZWFudXBPZmZlcl9ib29sX21lcmdlQDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2NDcKICAgIC8vIGxvZ2dlZEFzc2VydChpc0NvbXBsZXRlZCB8fCBpc0V4cGlyZWQsIGVyckludmFsaWRTdGF0ZSkKICAgIHx8CiAgICBibnogY2xlYW51cE9mZmVyX2FmdGVyX2Fzc2VydEAxNQogICAgYnl0ZWMgNSAvLyAiRVJSOmVycklzdGUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXN0ZQoKY2xlYW51cE9mZmVyX2FmdGVyX2Fzc2VydEAxNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjUwCiAgICAvLyBsb2dnZWRBc3NlcnQoYWNjZXB0YW5jZXMgPT09IDAsIGVyclBhcnRpY2lwYW50c05vdENsZWFuZWQpCiAgICBzd2FwCiAgICBieiBjbGVhbnVwT2ZmZXJfYWZ0ZXJfYXNzZXJ0QDE3CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJQbmNsIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclBuY2wKCmNsZWFudXBPZmZlcl9hZnRlcl9hc3NlcnRAMTc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjczCiAgICAvLyBvZmZlclJlZnVuZHMgPSBCb3hNYXA8dWludDY0LCBSZWZ1bmRWYWx1ZT4oeyBrZXlQcmVmaXg6IEh5cGVyU3dhcEJveFByZWZpeE9mZmVyUmVmdW5kcyB9KQogICAgcHVzaGJ5dGVzICJmIgogICAgdW5jb3ZlciAyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2NTIKICAgIC8vIGNvbnN0IHsgcGF5b3IsIGFtb3VudCB9ID0gdGhpcy5vZmZlclJlZnVuZHMoaWQpLnZhbHVlCiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBkdXAKICAgIGV4dHJhY3QgOCAzMgogICAgc3dhcAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjc5CiAgICAvLyBvZmZlclJlZ2lzdHJ5ID0gQm94TWFwPHVpbnQ2NCwgdWludDY0Pih7IGtleVByZWZpeDogSHlwZXJTd2FwQm94UHJlZml4T2ZmZXJSZWdpc3RyeSB9KQogICAgYnl0ZWMgMTQgLy8gInIiCiAgICBkaWcgNAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjY1NAogICAgLy8gY29uc3QgcmVnaXN0cnkgPSB0aGlzLm9mZmVyUmVnaXN0cnkoaWQpLnZhbHVlCiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjY1NQogICAgLy8gYWJpQ2FsbDx0eXBlb2YgTWV0YS5wcm90b3R5cGUuZGVsZXRlUm9vdD4oeyBhcHBJZDogcmVnaXN0cnksIGFyZ3M6IFt0aGlzLnJvb3ROYW1lKGlkLCBmYWxzZSldIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjg1CiAgICAvLyByZXR1cm4gU3RyaW5nKChwYXJ0aWNpcGFudHMgPyBCeXRlcygncCcpIDogQnl0ZXMoJ3QnKSkuY29uY2F0KGl0b2IoaWQpKSkKICAgIGJ5dGVjIDE1IC8vICJ0IgogICAgZGlnIDYKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2NTUKICAgIC8vIGFiaUNhbGw8dHlwZW9mIE1ldGEucHJvdG90eXBlLmRlbGV0ZVJvb3Q+KHsgYXBwSWQ6IHJlZ2lzdHJ5LCBhcmdzOiBbdGhpcy5yb290TmFtZShpZCwgZmFsc2UpXSB9KQogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGRpZyAxCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIGJ5dGVjIDI5IC8vIG1ldGhvZCAiZGVsZXRlUm9vdChzdHJpbmcpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjU2CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBNZXRhLnByb3RvdHlwZS5kZWxldGVSb290Pih7IGFwcElkOiByZWdpc3RyeSwgYXJnczogW3RoaXMucm9vdE5hbWUoaWQsIHRydWUpXSB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo4NQogICAgLy8gcmV0dXJuIFN0cmluZygocGFydGljaXBhbnRzID8gQnl0ZXMoJ3AnKSA6IEJ5dGVzKCd0JykpLmNvbmNhdChpdG9iKGlkKSkpCiAgICBieXRlY18xIC8vICJwIgogICAgdW5jb3ZlciA2CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjU2CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBNZXRhLnByb3RvdHlwZS5kZWxldGVSb290Pih7IGFwcElkOiByZWdpc3RyeSwgYXJnczogW3RoaXMucm9vdE5hbWUoaWQsIHRydWUpXSB9KQogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgYnl0ZWMgMjkgLy8gbWV0aG9kICJkZWxldGVSb290KHN0cmluZyl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2NTcKICAgIC8vIHRoaXMub2ZmZXJzKGlkKS5kZWxldGUoKQogICAgdW5jb3ZlciA0CiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjU4CiAgICAvLyB0aGlzLm9mZmVyUmVmdW5kcyhpZCkuZGVsZXRlKCkKICAgIHVuY292ZXIgMwogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjY1OQogICAgLy8gdGhpcy5vZmZlclJlZ2lzdHJ5KGlkKS5kZWxldGUoKQogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjY2MAogICAgLy8gaXR4bi5wYXltZW50KHsgcmVjZWl2ZXI6IHBheW9yLCBhbW91bnQgfSkuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2NDAKICAgIC8vIGNsZWFudXBPZmZlcihpZDogdWludDY0KSB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpjbGVhbnVwT2ZmZXJfYm9vbF9mYWxzZUAxMjoKICAgIGludGNfMCAvLyAwCiAgICBiIGNsZWFudXBPZmZlcl9ib29sX21lcmdlQDEzCgpjbGVhbnVwT2ZmZXJfYm9vbF9mYWxzZUA2OgogICAgaW50Y18wIC8vIDAKICAgIGIgY2xlYW51cE9mZmVyX2Jvb2xfbWVyZ2VANwoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Okh5cGVyU3dhcC5vZmZlclRlcm1zW3JvdXRpbmddKCkgLT4gdm9pZDoKb2ZmZXJUZXJtczoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjY2CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2NjgKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLm9mZmVycyhpZCkuZXhpc3RzLCBlcnJPZmZlck5vdEZvdW5kKQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2NgogICAgLy8gb2ZmZXJzID0gQm94TWFwPHVpbnQ2NCwgT2ZmZXJWYWx1ZT4oeyBrZXlQcmVmaXg6IEh5cGVyU3dhcEJveFByZWZpeE9mZmVycyB9KQogICAgYnl0ZWNfMCAvLyAibyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2NjgKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLm9mZmVycyhpZCkuZXhpc3RzLCBlcnJPZmZlck5vdEZvdW5kKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogb2ZmZXJUZXJtc19hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWNfMiAvLyAiRVJSOmVyck5vZnIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTm9mcgoKb2ZmZXJUZXJtc19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjY5CiAgICAvLyByZXR1cm4gdGhpcy50ZXJtcyhpZCkKICAgIGNhbGxzdWIgdGVybXMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjY2CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjIDIwIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjpDb250cmFjdFdpdGhPcHRJbi5vcHRJbltyb3V0aW5nXSgpIC0+IHZvaWQ6Cm9wdEluOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjIzCiAgICAvLyBvcHRJbihwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGFzc2V0OiBBc3NldCk6IHZvaWQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXBuIDIKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6MjUKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJySW52YWxpZFBheW1lbnRSZWNlaXZlcikKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBvcHRJbl9hZnRlcl9hc3NlcnRAMwogICAgcHVzaGJ5dGVzICJFUlI6ZXJySXBtciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcG1yCgpvcHRJbl9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czoyNgogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UsIGVyckludmFsaWRQYXltZW50QW1vdW50KQogICAgc3dhcAogICAgZ3R4bnMgQW1vdW50CiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgID09CiAgICBibnogb3B0SW5fYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOmVycklwbWEiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBtYQoKb3B0SW5fYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6MjgtMzQKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6MzAKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6MzEKICAgIC8vIGFzc2V0QW1vdW50OiAwLAogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjI4LTMzCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogMCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyAgIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjI4LTM0CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogMCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czoyMwogICAgLy8gb3B0SW4ocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBhc3NldDogQXNzZXQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6OlVwZ3JhZGVhYmxlQWtpdGFCYXNlQ29udHJhY3QudXBkYXRlW3JvdXRpbmddKCkgLT4gdm9pZDoKdXBkYXRlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM1CiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiBbJ1VwZGF0ZUFwcGxpY2F0aW9uJ10gfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM3CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIGVyck5vdEFraXRhRGFvKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18zIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjIDMwIC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzcKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IHVwZGF0ZV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMzEgLy8gIkVSUjplcnJOZGFvIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5kYW8KCnVwZGF0ZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozOAogICAgLy8gY29uc3QgW3BsdWdpbnNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXModGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNQbHVnaW5BcHBMaXN0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18zIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzgKICAgIC8vIGNvbnN0IFtwbHVnaW5zXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzUGx1Z2luQXBwTGlzdCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWMgMjEgLy8gInBhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozOQogICAgLy8gY29uc3QgdXBkYXRlUGx1Z2luID0gZGVjb2RlQXJjNDxQbHVnaW5BcHBMaXN0PihwbHVnaW5zKS51cGRhdGUKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6NDAKICAgIC8vIGxvZ2dlZEFzc2VydChHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25JZCA9PT0gdXBkYXRlUGx1Z2luLCBlcnJJbnZhbGlkVXBncmFkZSkKICAgIGdsb2JhbCBDYWxsZXJBcHBsaWNhdGlvbklECiAgICA9PQogICAgYm56IHVwZGF0ZV9hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6ZXJySXVwZyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJdXBnCgp1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTQKICAgIC8vIHZlcnNpb24gPSBHbG9iYWxTdGF0ZTxzdHJpbmc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleVZlcnNpb24gfSkKICAgIGJ5dGVjIDIzIC8vICJ2ZXJzaW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjQxCiAgICAvLyB0aGlzLnZlcnNpb24udmFsdWUgPSBuZXdWZXJzaW9uCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM1CiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiBbJ1VwZGF0ZUFwcGxpY2F0aW9uJ10gfSkKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6OkFraXRhQmFzZUNvbnRyYWN0LnVwZGF0ZUFraXRhREFPW3JvdXRpbmddKCkgLT4gdm9pZDoKdXBkYXRlQWtpdGFEQU86CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MjUKICAgIC8vIHVwZGF0ZUFraXRhREFPKGFraXRhREFPOiBBcHBsaWNhdGlvbik6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjI2CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIGVyck5vdEFraXRhRGFvKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18zIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjIDMwIC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MjYKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IHVwZGF0ZUFraXRhREFPX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAzMSAvLyAiRVJSOmVyck5kYW8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmRhbwoKdXBkYXRlQWtpdGFEQU9fYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18zIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MjcKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUgPSBha2l0YURBTwogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNQogICAgLy8gdXBkYXRlQWtpdGFEQU8oYWtpdGFEQU86IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo6SHlwZXJTd2FwLnRlcm1zKGlkOiB1aW50NjQpIC0+IGJ5dGVzOgp0ZXJtczoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6OTkKICAgIC8vIHByaXZhdGUgdGVybXMoaWQ6IHVpbnQ2NCk6IGJ5dGVzPDMyPiB7CiAgICBwcm90byAxIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTAwCiAgICAvLyBjb25zdCB7IHJvb3QsIGxlYXZlcywgcGFydGljaXBhbnRzUm9vdCwgcGFydGljaXBhbnRzTGVhdmVzLCBleHBpcmF0aW9uIH0gPSB0aGlzLm9mZmVycyhpZCkudmFsdWUKICAgIGZyYW1lX2RpZyAtMQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2NgogICAgLy8gb2ZmZXJzID0gQm94TWFwPHVpbnQ2NCwgT2ZmZXJWYWx1ZT4oeyBrZXlQcmVmaXg6IEh5cGVyU3dhcEJveFByZWZpeE9mZmVycyB9KQogICAgYnl0ZWNfMCAvLyAibyIKICAgIGRpZyAxCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTAwCiAgICAvLyBjb25zdCB7IHJvb3QsIGxlYXZlcywgcGFydGljaXBhbnRzUm9vdCwgcGFydGljaXBhbnRzTGVhdmVzLCBleHBpcmF0aW9uIH0gPSB0aGlzLm9mZmVycyhpZCkudmFsdWUKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBkdXAKICAgIGV4dHJhY3QgMSAzMgogICAgZGlnIDEKICAgIGV4dHJhY3QgMzMgOAogICAgZGlnIDIKICAgIGV4dHJhY3QgNDkgMzIKICAgIGRpZyAzCiAgICBleHRyYWN0IDgxIDgKICAgIHVuY292ZXIgNAogICAgZXh0cmFjdCA5NyA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjEwMQogICAgLy8gcmV0dXJuIHNoYTI1NihCeXRlc2Ake2l0b2IoaWQpfSR7cm9vdH0ke2l0b2IobGVhdmVzKX0ke3BhcnRpY2lwYW50c1Jvb3R9JHtpdG9iKHBhcnRpY2lwYW50c0xlYXZlcyl9JHtpdG9iKGV4cGlyYXRpb24pfWApCiAgICB1bmNvdmVyIDUKICAgIHVuY292ZXIgNQogICAgY29uY2F0CiAgICB1bmNvdmVyIDQKICAgIGNvbmNhdAogICAgdW5jb3ZlciAzCiAgICBjb25jYXQKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIHNoYTI1NgogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo6SHlwZXJTd2FwLnZlcmlmeUxlYWYoaWQ6IHVpbnQ2NCwgcGFydGljaXBhbnRzOiB1aW50NjQsIGxlYWY6IGJ5dGVzLCBwcm9vZjogYnl0ZXMpIC0+IHVpbnQ2NCwgYnl0ZXM6CnZlcmlmeUxlYWY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjEwNQogICAgLy8gcHJpdmF0ZSB2ZXJpZnlMZWFmKGlkOiB1aW50NjQsIHBhcnRpY2lwYW50czogYm9vbGVhbiwgbGVhZjogYnl0ZXM8MzI+LCBwcm9vZjogUHJvb2YpOiBib29sZWFuIHsKICAgIHByb3RvIDQgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxMDYtMTE1CiAgICAvLyByZXR1cm4gYWJpQ2FsbDx0eXBlb2YgTWV0YS5wcm90b3R5cGUudmVyaWZ5Pih7CiAgICAvLyAgIGFwcElkOiB0aGlzLm9mZmVyUmVnaXN0cnkoaWQpLnZhbHVlLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgdGhpcy5yb290TmFtZShpZCwgcGFydGljaXBhbnRzKSwKICAgIC8vICAgICBsZWFmLAogICAgLy8gICAgIHByb29mLAogICAgLy8gICAgIE1lcmtsZVRyZWVUeXBlVHJhZGUKICAgIC8vICAgXSwKICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjEwOQogICAgLy8gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo4NQogICAgLy8gcmV0dXJuIFN0cmluZygocGFydGljaXBhbnRzID8gQnl0ZXMoJ3AnKSA6IEJ5dGVzKCd0JykpLmNvbmNhdChpdG9iKGlkKSkpCiAgICBieXRlYyAxNSAvLyAidCIKICAgIGJ5dGVjXzEgLy8gInAiCiAgICBmcmFtZV9kaWcgLTMKICAgIHNlbGVjdAogICAgZnJhbWVfZGlnIC00CiAgICBpdG9iCiAgICBzd2FwCiAgICBkaWcgMQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjExMAogICAgLy8gdGhpcy5yb290TmFtZShpZCwgcGFydGljaXBhbnRzKSwKICAgIGR1cAogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjExMwogICAgLy8gTWVya2xlVHJlZVR5cGVUcmFkZQogICAgcHVzaGludCAzCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjc5CiAgICAvLyBvZmZlclJlZ2lzdHJ5ID0gQm94TWFwPHVpbnQ2NCwgdWludDY0Pih7IGtleVByZWZpeDogSHlwZXJTd2FwQm94UHJlZml4T2ZmZXJSZWdpc3RyeSB9KQogICAgYnl0ZWMgMTQgLy8gInIiCiAgICB1bmNvdmVyIDMKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxMDcKICAgIC8vIGFwcElkOiB0aGlzLm9mZmVyUmVnaXN0cnkoaWQpLnZhbHVlLAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGJ0b2kKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxMDYtMTE1CiAgICAvLyByZXR1cm4gYWJpQ2FsbDx0eXBlb2YgTWV0YS5wcm90b3R5cGUudmVyaWZ5Pih7CiAgICAvLyAgIGFwcElkOiB0aGlzLm9mZmVyUmVnaXN0cnkoaWQpLnZhbHVlLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgdGhpcy5yb290TmFtZShpZCwgcGFydGljaXBhbnRzKSwKICAgIC8vICAgICBsZWFmLAogICAgLy8gICAgIHByb29mLAogICAgLy8gICAgIE1lcmtsZVRyZWVUeXBlVHJhZGUKICAgIC8vICAgXSwKICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBwdXNoYnl0ZXMgMHgyYmYzY2M1YSAvLyBtZXRob2QgInZlcmlmeShhZGRyZXNzLHN0cmluZyxieXRlWzMyXSxieXRlWzMyXVtdLHVpbnQ2NClib29sIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgc3dhcAogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjIDIwIC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBib29sCiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Yml0CiAgICBmcmFtZV9kaWcgLTEKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Okh5cGVyU3dhcC5yZWZ1bmRTdG9yYWdlKHBheW9yOiBieXRlcywgb3duZXI6IGJ5dGVzLCBhbW91bnQ6IHVpbnQ2NCkgLT4gdm9pZDoKcmVmdW5kU3RvcmFnZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTI0CiAgICAvLyBwcml2YXRlIHJlZnVuZFN0b3JhZ2UocGF5b3I6IEFjY291bnQsIG93bmVyOiBBY2NvdW50LCBhbW91bnQ6IHVpbnQ2NCk6IHZvaWQgewogICAgcHJvdG8gMyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjEyNQogICAgLy8gaWYgKGNhblJlY2VpdmVBbGdvKHBheW9yLCBhbW91bnQpKSB7CiAgICBmcmFtZV9kaWcgLTMKICAgIGZyYW1lX2RpZyAtMQogICAgY2FsbHN1YiBjYW5SZWNlaXZlQWxnbwogICAgYnogcmVmdW5kU3RvcmFnZV9lbHNlX2JvZHlAMwogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxMjYKICAgIC8vIGl0eG4ucGF5bWVudCh7IHJlY2VpdmVyOiBwYXlvciwgYW1vdW50IH0pLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBmcmFtZV9kaWcgLTMKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CgpyZWZ1bmRTdG9yYWdlX2FmdGVyX2lmX2Vsc2VANzoKICAgIHJldHN1YgoKcmVmdW5kU3RvcmFnZV9lbHNlX2JvZHlAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTI3CiAgICAvLyB9IGVsc2UgaWYgKGNhblJlY2VpdmVBbGdvKG93bmVyLCBhbW91bnQpKSB7CiAgICBmcmFtZV9kaWcgLTIKICAgIGZyYW1lX2RpZyAtMQogICAgY2FsbHN1YiBjYW5SZWNlaXZlQWxnbwogICAgYnogcmVmdW5kU3RvcmFnZV9hZnRlcl9pZl9lbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTI4CiAgICAvLyBpdHhuLnBheW1lbnQoeyByZWNlaXZlcjogb3duZXIsIGFtb3VudCB9KS5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgZnJhbWVfZGlnIC0xCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgZnJhbWVfZGlnIC0yCiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo6SHlwZXJTd2FwLnJlbGVhc2UoaWQ6IHVpbnQ2NCwgZnJvbTogYnl0ZXMsIHJlY2VpdmVyV2FsbGV0OiB1aW50NjQsIHJlY2VpdmVyOiBieXRlcywgYXNzZXQ6IHVpbnQ2NCwgYW1vdW50OiB1aW50NjQpIC0+IHZvaWQ6CnJlbGVhc2U6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjEzNgogICAgLy8gcHJpdmF0ZSByZWxlYXNlKGlkOiB1aW50NjQsIGZyb206IEFjY291bnQsIHJlY2VpdmVyV2FsbGV0OiB1aW50NjQsIHJlY2VpdmVyOiBBY2NvdW50LCBhc3NldDogdWludDY0LCBhbW91bnQ6IHVpbnQ2NCk6IHZvaWQgewogICAgcHJvdG8gNiAwCiAgICBpbnRjXzAgLy8gMAogICAgZHVwCiAgICBwdXNoYnl0ZXMgIiIKICAgIGR1cG4gNQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxMzgKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLm9mZmVycyhpZCkuZXhpc3RzLCBlcnJPZmZlck5vdEZvdW5kKQogICAgZnJhbWVfZGlnIC02CiAgICBpdG9iCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjYKICAgIC8vIG9mZmVycyA9IEJveE1hcDx1aW50NjQsIE9mZmVyVmFsdWU+KHsga2V5UHJlZml4OiBIeXBlclN3YXBCb3hQcmVmaXhPZmZlcnMgfSkKICAgIGJ5dGVjXzAgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxMzgKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLm9mZmVycyhpZCkuZXhpc3RzLCBlcnJPZmZlck5vdEZvdW5kKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogcmVsZWFzZV9hZnRlcl9hc3NlcnRAMgogICAgYnl0ZWNfMiAvLyAiRVJSOmVyck5vZnIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTm9mcgoKcmVsZWFzZV9hZnRlcl9hc3NlcnRAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTM5CiAgICAvLyBjb25zdCB7IHN0YXRlLCBlc2Nyb3dlZCB9ID0gdGhpcy5vZmZlcnMoaWQpLnZhbHVlCiAgICBmcmFtZV9kaWcgOAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGR1cAogICAgZXh0cmFjdCAwIDEKICAgIHN3YXAKICAgIHB1c2hpbnQgNDEKICAgIGV4dHJhY3RfdWludDY0CiAgICBmcmFtZV9idXJ5IDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTQxCiAgICAvLyBsb2dnZWRBc3NlcnQoc3RhdGUgPT09IFNUQVRFX0RJU0JVUlNJTkcsIGVyckludmFsaWRTdGF0ZSkKICAgIGJ5dGVjIDEwIC8vIDB4MWUKICAgID09CiAgICBibnogcmVsZWFzZV9hZnRlcl9hc3NlcnRANAogICAgYnl0ZWMgNSAvLyAiRVJSOmVycklzdGUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXN0ZQoKcmVsZWFzZV9hZnRlcl9hc3NlcnRANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTQ0CiAgICAvLyBjb25zdCBoYXNoID0gc2hhMjU2KHNoYTI1NihCeXRlc2Ake2Zyb20uYnl0ZXN9JHtyZWNlaXZlci5ieXRlc30ke2l0b2IoYXNzZXQpfSR7aXRvYihhbW91bnQpfWApKQogICAgZnJhbWVfZGlnIC01CiAgICBmcmFtZV9kaWcgLTMKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC0yCiAgICBpdG9iCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC0xCiAgICBpdG9iCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGNvbmNhdAogICAgc2hhMjU2CiAgICBzaGEyNTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTQ1CiAgICAvLyBjb25zdCBoYXNoS2V5OiBIYXNoS2V5ID0geyBpZCwgaGFzaCB9CiAgICB1bmNvdmVyIDMKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo3MAogICAgLy8gaGFzaGVzID0gQm94TWFwPEhhc2hLZXksIFJlZnVuZFZhbHVlPih7IGtleVByZWZpeDogSHlwZXJTd2FwQm94UHJlZml4SGFzaGVzIH0pCiAgICBieXRlYyA5IC8vICJoIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTQ2CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5oYXNoZXMoaGFzaEtleSkuZXhpc3RzLCBlcnJMZWFmTm90RXNjcm93ZWQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiByZWxlYXNlX2FmdGVyX2Fzc2VydEA2CiAgICBieXRlYyAzMiAvLyAiRVJSOmVyckxuZXMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTG5lcwoKcmVsZWFzZV9hZnRlcl9hc3NlcnRANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTQ4CiAgICAvLyBsZXQgeyBwYXlvciwgYW1vdW50OiByZWZ1bmRBbW91bnQgfSA9IHRoaXMuaGFzaGVzKGhhc2hLZXkpLnZhbHVlCiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBkdXAKICAgIGV4dHJhY3QgOCAzMgogICAgZnJhbWVfYnVyeSAxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGZyYW1lX2J1cnkgNgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxNDkKICAgIC8vIHRoaXMuaGFzaGVzKGhhc2hLZXkpLmRlbGV0ZSgpCiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTUyCiAgICAvLyBpZiAoYXNzZXQgPT09IDApIHsKICAgIGZyYW1lX2RpZyAtMgogICAgYm56IHJlbGVhc2VfZWxzZV9ib2R5QDkKICAgIHBvcG4gMgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxNTQtMTU2CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsgYW1vdW50LCByZWNlaXZlciB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIGZyYW1lX2RpZyAtMwogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgZnJhbWVfZGlnIC0xCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxNTQtMTU1CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsgYW1vdW50LCByZWNlaXZlciB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxNTQtMTU2CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsgYW1vdW50LCByZWNlaXZlciB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE1OQogICAgLy8gdGhpcy5yZWZ1bmRTdG9yYWdlKHBheW9yLCBmcm9tLCByZWZ1bmRBbW91bnQpCiAgICBmcmFtZV9kaWcgMQogICAgZnJhbWVfZGlnIC01CiAgICBmcmFtZV9kaWcgNgogICAgY2FsbHN1YiByZWZ1bmRTdG9yYWdlCgpyZWxlYXNlX2FmdGVyX2lmX2Vsc2VAMjU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjIwOQogICAgLy8gY29uc3QgbmV3RXNjcm93ZWQ6IHVpbnQ2NCA9IGVzY3Jvd2VkIC0gMQogICAgZnJhbWVfZGlnIDQKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjIxMAogICAgLy8gdGhpcy5vZmZlcnMoaWQpLnZhbHVlLmVzY3Jvd2VkID0gbmV3RXNjcm93ZWQKICAgIGR1cAogICAgaXRvYgogICAgZnJhbWVfZGlnIDgKICAgIHB1c2hpbnQgNDEKICAgIHVuY292ZXIgMgogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjEyCiAgICAvLyBpZiAobmV3RXNjcm93ZWQgPT09IDApIHsKICAgIGJueiByZWxlYXNlX2FmdGVyX2lmX2Vsc2VAMjcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjEzCiAgICAvLyB0aGlzLm9mZmVycyhpZCkudmFsdWUuc3RhdGUgPSBTVEFURV9DT01QTEVURUQKICAgIGZyYW1lX2RpZyA4CiAgICBpbnRjXzAgLy8gMAogICAgYnl0ZWMgMTkgLy8gMHgyOAogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKCnJlbGVhc2VfYWZ0ZXJfaWZfZWxzZUAyNzoKICAgIHJldHN1YgoKcmVsZWFzZV9lbHNlX2JvZHlAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTYyCiAgICAvLyBjb25zdCBbLCBpc09wdGVkSW5dID0gQXNzZXRIb2xkaW5nLmFzc2V0QmFsYW5jZShyZWNlaXZlciwgYXNzZXQpCiAgICBmcmFtZV9kaWcgLTMKICAgIGZyYW1lX2RpZyAtMgogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTY0CiAgICAvLyBpZiAoIWlzT3B0ZWRJbikgewogICAgYm56IHJlbGVhc2VfZWxzZV9ib2R5QDIyCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE2NgogICAgLy8gbG9nZ2VkQXNzZXJ0KHJlY2VpdmVyV2FsbGV0ICE9PSAwLCBlcnJSZWNlaXZlck5vdE9wdGVkSW4pCiAgICBmcmFtZV9kaWcgLTQKICAgIGJueiByZWxlYXNlX2FmdGVyX2Fzc2VydEAxMgogICAgYnl0ZWMgMjIgLy8gIkVSUjplcnJSbm9pIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclJub2kKCnJlbGVhc2VfYWZ0ZXJfYXNzZXJ0QDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxNjcKICAgIC8vIGxvZ2dlZEFzc2VydChBcHBsaWNhdGlvbihyZWNlaXZlcldhbGxldCkuYWRkcmVzcyA9PT0gcmVjZWl2ZXIsIGVyclJlY2VpdmVyV2FsbGV0TWlzbWF0Y2gpCiAgICBmcmFtZV9kaWcgLTQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGZyYW1lX2RpZyAtMwogICAgPT0KICAgIGJueiByZWxlYXNlX2FmdGVyX2Fzc2VydEAxNAogICAgcHVzaGJ5dGVzICJFUlI6ZXJyUndtbSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJSd21tCgpyZWxlYXNlX2FmdGVyX2Fzc2VydEAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTY5CiAgICAvLyBsb2dnZWRBc3NlcnQocmVmdW5kQW1vdW50ID49IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSwgZXJyUmVjZWl2ZXJOb3RPcHRlZEluKQogICAgZnJhbWVfZGlnIDYKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgPj0KICAgIGJueiByZWxlYXNlX2FmdGVyX2Fzc2VydEAxNgogICAgYnl0ZWMgMjIgLy8gIkVSUjplcnJSbm9pIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclJub2kKCnJlbGVhc2VfYWZ0ZXJfYXNzZXJ0QDE2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxNzIKICAgIC8vIGNvbnN0IG9wdGluUGx1Z2luID0gZ2V0UGx1Z2luQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5vcHRpbgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzMgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTcyCiAgICAvLyBjb25zdCBvcHRpblBsdWdpbiA9IGdldFBsdWdpbkFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkub3B0aW4KICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIxNgogICAgLy8gY29uc3QgW3BsdWdpbkFwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNQbHVnaW5BcHBMaXN0KSkKICAgIGJ5dGVjIDIxIC8vICJwYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE3MgogICAgLy8gY29uc3Qgb3B0aW5QbHVnaW4gPSBnZXRQbHVnaW5BcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLm9wdGluCiAgICBleHRyYWN0IDAgOAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxNzMtMTgyCiAgICAvLyBjb25zdCBjYW5PcHRJbiA9IGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9jYW5DYWxsPih7CiAgICAvLyAgIGFwcElkOiByZWNlaXZlcldhbGxldCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIG9wdGluUGx1Z2luLAogICAgLy8gICAgIENhbGxlclR5cGVHbG9iYWwsCiAgICAvLyAgICAgR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgJycsCiAgICAvLyAgICAgb3AuYnplcm8oNCkudG9GaXhlZCh7IGxlbmd0aDogNCB9KSwKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTc3CiAgICAvLyBDYWxsZXJUeXBlR2xvYmFsLAogICAgaW50Y18xIC8vIDEKICAgIGl0b2IKICAgIGR1cAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxNzgKICAgIC8vIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTgwCiAgICAvLyBvcC5iemVybyg0KS50b0ZpeGVkKHsgbGVuZ3RoOiA0IH0pLAogICAgcHVzaGludCA0CiAgICBiemVybwogICAgZnJhbWVfZGlnIC00CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTczLTE4MgogICAgLy8gY29uc3QgY2FuT3B0SW4gPSBhYmlDYWxsPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfY2FuQ2FsbD4oewogICAgLy8gICBhcHBJZDogcmVjZWl2ZXJXYWxsZXQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBvcHRpblBsdWdpbiwKICAgIC8vICAgICBDYWxsZXJUeXBlR2xvYmFsLAogICAgLy8gICAgIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgICcnLAogICAgLy8gICAgIG9wLmJ6ZXJvKDQpLnRvRml4ZWQoeyBsZW5ndGg6IDQgfSksCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBwdXNoYnl0ZXMgMHhiMzYyMzRhNSAvLyBtZXRob2QgImFyYzU4X2NhbkNhbGwodWludDY0LHVpbnQ2NCxhZGRyZXNzLHN0cmluZyxieXRlWzRdKWJvb2wiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTc5CiAgICAvLyAnJywKICAgIGJ5dGVjIDEyIC8vIDB4MDAwMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE3My0xODIKICAgIC8vIGNvbnN0IGNhbk9wdEluID0gYWJpQ2FsbDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X2NhbkNhbGw+KHsKICAgIC8vICAgYXBwSWQ6IHJlY2VpdmVyV2FsbGV0LAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgb3B0aW5QbHVnaW4sCiAgICAvLyAgICAgQ2FsbGVyVHlwZUdsb2JhbCwKICAgIC8vICAgICBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICAnJywKICAgIC8vICAgICBvcC5iemVybyg0KS50b0ZpeGVkKHsgbGVuZ3RoOiA0IH0pLAogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgc3dhcAogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjIDIwIC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBib29sCiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Yml0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE4NAogICAgLy8gbG9nZ2VkQXNzZXJ0KGNhbk9wdEluLCBlcnJSZWNlaXZlck5vdE9wdGVkSW4pCiAgICBibnogcmVsZWFzZV9hZnRlcl9hc3NlcnRAMTkKICAgIGJ5dGVjIDIyIC8vICJFUlI6ZXJyUm5vaSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJSbm9pCgpyZWxlYXNlX2FmdGVyX2Fzc2VydEAxOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTg3CiAgICAvLyBhcmM1OE9wdEluQW5kU2VuZCh0aGlzLmFraXRhREFPLnZhbHVlLCBBcHBsaWNhdGlvbihyZWNlaXZlcldhbGxldCksICcnLCBbYXNzZXRdLCBbYW1vdW50XSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18zIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE4NwogICAgLy8gYXJjNThPcHRJbkFuZFNlbmQodGhpcy5ha2l0YURBTy52YWx1ZSwgQXBwbGljYXRpb24ocmVjZWl2ZXJXYWxsZXQpLCAnJywgW2Fzc2V0XSwgW2Ftb3VudF0pCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWMgMzMgLy8gMHgwMDAxCiAgICB1bmNvdmVyIDQKICAgIGNvbmNhdAogICAgZHVwCiAgICBjb3ZlciAzCiAgICBieXRlYyAzMyAvLyAweDAwMDEKICAgIHVuY292ZXIgNQogICAgY29uY2F0CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MjIKICAgIC8vIGFzc2VydChhc3NldHMubGVuZ3RoID09PSBhbW91bnRzLmxlbmd0aCwgZXJyQXNzZXRzQW5kQW1vdW50c01pc21hdGNoKQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGR1cAogICAgY292ZXIgMgogICAgY292ZXIgNAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGR1cAogICAgZnJhbWVfYnVyeSAyCiAgICA9PQogICAgYXNzZXJ0IC8vIGVyckFhbW0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjE2CiAgICAvLyBjb25zdCBbcGx1Z2luQXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1BsdWdpbkFwcExpc3QpKQogICAgYnl0ZWMgMjEgLy8gInBhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjIzCiAgICAvLyBjb25zdCBvcHRpblBsdWdpbiA9IGdldFBsdWdpbkFwcExpc3QoYWtpdGFEQU8pLm9wdGluCiAgICBkdXAKICAgIGV4dHJhY3QgMCA4CiAgICBjb3ZlciAyCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzY2LTM2OQogICAgLy8gY29uc3QgW2NvbnRyb2xsZWRBY2NvdW50Qnl0ZXMsIGV4aXN0c10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcygKICAgIC8vICAgd2FsbGV0SUQsCiAgICAvLyAgIEJ5dGVzKEFic3RyYWN0QWNjb3VudEdsb2JhbFN0YXRlS2V5c0NvbnRyb2xsZWRBZGRyZXNzKQogICAgLy8gKQogICAgZnJhbWVfZGlnIC00CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM2OAogICAgLy8gQnl0ZXMoQWJzdHJhY3RBY2NvdW50R2xvYmFsU3RhdGVLZXlzQ29udHJvbGxlZEFkZHJlc3MpCiAgICBwdXNoYnl0ZXMgImNvbnRyb2xsZWRfYWRkcmVzcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzY2LTM2OQogICAgLy8gY29uc3QgW2NvbnRyb2xsZWRBY2NvdW50Qnl0ZXMsIGV4aXN0c10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcygKICAgIC8vICAgd2FsbGV0SUQsCiAgICAvLyAgIEJ5dGVzKEFic3RyYWN0QWNjb3VudEdsb2JhbFN0YXRlS2V5c0NvbnRyb2xsZWRBZGRyZXNzKQogICAgLy8gKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzcwCiAgICAvLyBsb2dnZWRBc3NlcnQoZXhpc3RzICYmIGNvbnRyb2xsZWRBY2NvdW50Qnl0ZXMubGVuZ3RoID09PSAzMiwgZXJySW52YWxpZFdhbGxldCkKICAgIGJ6IHJlbGVhc2VfYm9vbF9mYWxzZUAzMQogICAgZGlnIDIKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYnogcmVsZWFzZV9ib29sX2ZhbHNlQDMxCiAgICBpbnRjXzEgLy8gMQoKcmVsZWFzZV9ib29sX21lcmdlQDMyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNzAKICAgIC8vIGxvZ2dlZEFzc2VydChleGlzdHMgJiYgY29udHJvbGxlZEFjY291bnRCeXRlcy5sZW5ndGggPT09IDMyLCBlcnJJbnZhbGlkV2FsbGV0KQogICAgYm56IHJlbGVhc2VfYWZ0ZXJfYXNzZXJ0QDM0CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJJd2x0IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckl3bHQKCnJlbGVhc2VfYWZ0ZXJfYXNzZXJ0QDM0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MjYtNjI5CiAgICAvLyBpdHhuQ29tcG9zZS5iZWdpbjx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X3Jla2V5VG9QbHVnaW4+KHsKICAgIC8vICAgYXBwSWQ6IHJlY2lwaWVudFdhbGxldC5pZCwKICAgIC8vICAgYXJnczogW29wdGluUGx1Z2luLCBDYWxsZXJUeXBlR2xvYmFsLCBlc2Nyb3csIFtdLCBbXV0KICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICBmcmFtZV9kaWcgLTQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgcHVzaGJ5dGVzIDB4NWFkZjMzOGYgLy8gbWV0aG9kICJhcmM1OF9yZWtleVRvUGx1Z2luKHVpbnQ2NCx1aW50NjQsc3RyaW5nLHVpbnQ2NFtdLCh1aW50NjQsdWludDY0KVtdKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE3OQogICAgLy8gJycsCiAgICBieXRlYyAxMiAvLyAweDAwMDAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYyOAogICAgLy8gYXJnczogW29wdGluUGx1Z2luLCBDYWxsZXJUeXBlR2xvYmFsLCBlc2Nyb3csIFtdLCBbXV0KICAgIGJ5dGVjIDEyIC8vIDB4MDAwMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGJ5dGVjIDEyIC8vIDB4MDAwMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjI2LTYyOQogICAgLy8gaXR4bkNvbXBvc2UuYmVnaW48dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9yZWtleVRvUGx1Z2luPih7CiAgICAvLyAgIGFwcElkOiByZWNpcGllbnRXYWxsZXQuaWQsCiAgICAvLyAgIGFyZ3M6IFtvcHRpblBsdWdpbiwgQ2FsbGVyVHlwZUdsb2JhbCwgZXNjcm93LCBbXSwgW11dCiAgICAvLyB9KQogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MzEtNjQyCiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBPcHRJblBsdWdpbi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IG9wdGluUGx1Z2luLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgcmVjaXBpZW50V2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgYXNzZXRzLAogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogb3JpZ2luLAogICAgLy8gICAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiBhc3NldHMubGVuZ3RoCiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MzkKICAgIC8vIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogYXNzZXRzLmxlbmd0aAogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICB1bmNvdmVyIDMKICAgICoKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBkdXAKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjM3LTY0MAogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IG9yaWdpbiwKICAgIC8vICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiBhc3NldHMubGVuZ3RoCiAgICAvLyB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MzEtNjQyCiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBPcHRJblBsdWdpbi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IG9wdGluUGx1Z2luLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgcmVjaXBpZW50V2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgYXNzZXRzLAogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogb3JpZ2luLAogICAgLy8gICAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiBhc3NldHMubGVuZ3RoCiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MzQKICAgIC8vIHJlY2lwaWVudFdhbGxldCwKICAgIGZyYW1lX2RpZyAtNAogICAgaXRvYgogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjMxLTY0MgogICAgLy8gaXR4bkNvbXBvc2UubmV4dDx0eXBlb2YgT3B0SW5QbHVnaW4ucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiBvcHRpblBsdWdpbiwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHJlY2lwaWVudFdhbGxldCwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIGFzc2V0cywKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IG9yaWdpbiwKICAgIC8vICAgICAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogYXNzZXRzLmxlbmd0aAogICAgLy8gICAgIH0pCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBwdXNoYnl0ZXMgMHg2ODM1ZTNiYyAvLyBtZXRob2QgIm9wdEluKHVpbnQ2NCxib29sLHVpbnQ2NFtdLHBheSl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYzNQogICAgLy8gdHJ1ZSwKICAgIHB1c2hieXRlcyAweDgwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZGlnIDEKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYzMS02NDIKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIE9wdEluUGx1Z2luLnByb3RvdHlwZS5vcHRJbj4oewogICAgLy8gICBhcHBJZDogb3B0aW5QbHVnaW4sCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICByZWNpcGllbnRXYWxsZXQsCiAgICAvLyAgICAgdHJ1ZSwKICAgIC8vICAgICBhc3NldHMsCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBvcmlnaW4sCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSAqIGFzc2V0cy5sZW5ndGgKICAgIC8vICAgICB9KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NDQKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBhbW91bnRzLmxlbmd0aDsgaSsrKSB7CiAgICBpbnRjXzAgLy8gMAoKcmVsZWFzZV93aGlsZV90b3BAMzU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY0NAogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGFtb3VudHMubGVuZ3RoOyBpKyspIHsKICAgIGR1cAogICAgZnJhbWVfZGlnIDIKICAgIDwKICAgIGJ6IHJlbGVhc2VfYWZ0ZXJfd2hpbGVAMzkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjQ1CiAgICAvLyBpZiAoYW1vdW50c1tpXSA+IDApIHsKICAgIGZyYW1lX2RpZyAwCiAgICBleHRyYWN0IDIgMAogICAgZGlnIDEKICAgIGludGNfMiAvLyA4CiAgICAqCiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMwogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgZnJhbWVfYnVyeSA3CiAgICBieiByZWxlYXNlX2FmdGVyX2lmX2Vsc2VAMzgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjQ2LTY1MgogICAgLy8gaXR4bkNvbXBvc2UubmV4dCgKICAgIC8vICAgaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50c1tpXSwKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBvcmlnaW4sCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldHNbaV0KICAgIC8vICAgfSkKICAgIC8vICkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NTAKICAgIC8vIHhmZXJBc3NldDogYXNzZXRzW2ldCiAgICBkaWcgMgogICAgZXh0cmFjdCAyIDAKICAgIGZyYW1lX2RpZyAzCiAgICBleHRyYWN0X3VpbnQ2NAogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGRpZyAxCiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIGZyYW1lX2RpZyA3CiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY0Ny02NTEKICAgIC8vIGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgIGFzc2V0QW1vdW50OiBhbW91bnRzW2ldLAogICAgLy8gICBhc3NldFJlY2VpdmVyOiBvcmlnaW4sCiAgICAvLyAgIHhmZXJBc3NldDogYXNzZXRzW2ldCiAgICAvLyB9KQogICAgcHVzaGludCA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKCnJlbGVhc2VfYWZ0ZXJfaWZfZWxzZUAzODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjQ0CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgYW1vdW50cy5sZW5ndGg7IGkrKykgewogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGIgcmVsZWFzZV93aGlsZV90b3BAMzUKCnJlbGVhc2VfYWZ0ZXJfd2hpbGVAMzk6CiAgICBwb3BuIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjU2LTY1OAogICAgLy8gaXR4bkNvbXBvc2UubmV4dDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X3ZlcmlmeUF1dGhBZGRyZXNzPih7CiAgICAvLyAgIGFwcElkOiByZWNpcGllbnRXYWxsZXQKICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIGZyYW1lX2RpZyAtNAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoYnl0ZXMgMHg2Y2MzZjYwNiAvLyBtZXRob2QgImFyYzU4X3ZlcmlmeUF1dGhBZGRyZXNzKCl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjYwCiAgICAvLyBpdHhuQ29tcG9zZS5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTkwCiAgICAvLyBjb25zdCBvcHRJbkNvc3QgPSBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgZHVwCiAgICBmcmFtZV9idXJ5IDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTkxCiAgICAvLyBpZiAocmVmdW5kQW1vdW50ID4gb3B0SW5Db3N0KSB7CiAgICBmcmFtZV9kaWcgNgogICAgPAogICAgYnogcmVsZWFzZV9hZnRlcl9pZl9lbHNlQDI1CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE5MgogICAgLy8gdGhpcy5yZWZ1bmRTdG9yYWdlKHBheW9yLCBmcm9tLCByZWZ1bmRBbW91bnQgLSBvcHRJbkNvc3QpCiAgICBmcmFtZV9kaWcgNgogICAgZnJhbWVfZGlnIDUKICAgIC0KICAgIGZyYW1lX2RpZyAxCiAgICBmcmFtZV9kaWcgLTUKICAgIHVuY292ZXIgMgogICAgY2FsbHN1YiByZWZ1bmRTdG9yYWdlCiAgICBiIHJlbGVhc2VfYWZ0ZXJfaWZfZWxzZUAyNQoKcmVsZWFzZV9ib29sX2ZhbHNlQDMxOgogICAgaW50Y18wIC8vIDAKICAgIGIgcmVsZWFzZV9ib29sX21lcmdlQDMyCgpyZWxlYXNlX2Vsc2VfYm9keUAyMjoKICAgIHBvcG4gMgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxOTYtMjAyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnQsCiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogcmVjZWl2ZXIsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgZnJhbWVfZGlnIC0zCiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIGZyYW1lX2RpZyAtMQogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgZnJhbWVfZGlnIC0yCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxOTYtMjAxCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnQsCiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogcmVjZWl2ZXIsCiAgICAvLyAgIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxOTYtMjAyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnQsCiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogcmVjZWl2ZXIsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjA1CiAgICAvLyB0aGlzLnJlZnVuZFN0b3JhZ2UocGF5b3IsIGZyb20sIHJlZnVuZEFtb3VudCkKICAgIGZyYW1lX2RpZyAxCiAgICBmcmFtZV9kaWcgLTUKICAgIGZyYW1lX2RpZyA2CiAgICBjYWxsc3ViIHJlZnVuZFN0b3JhZ2UKICAgIGIgcmVsZWFzZV9hZnRlcl9pZl9lbHNlQDI1CgoKLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo6SHlwZXJTd2FwLnJldHVybkxlYWYoaWQ6IHVpbnQ2NCwgZnJvbTogYnl0ZXMsIHJlY2VpdmVyOiBieXRlcywgYXNzZXQ6IHVpbnQ2NCwgYW1vdW50OiB1aW50NjQpIC0+IHZvaWQ6CnJldHVybkxlYWY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU1NgogICAgLy8gcHJpdmF0ZSByZXR1cm5MZWFmKGlkOiB1aW50NjQsIGZyb206IEFjY291bnQsIHJlY2VpdmVyOiBBY2NvdW50LCBhc3NldDogdWludDY0LCBhbW91bnQ6IHVpbnQ2NCk6IHZvaWQgewogICAgcHJvdG8gNSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU1OAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMub2ZmZXJzKGlkKS5leGlzdHMsIGVyck9mZmVyTm90Rm91bmQpCiAgICBmcmFtZV9kaWcgLTUKICAgIGl0b2IKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2NgogICAgLy8gb2ZmZXJzID0gQm94TWFwPHVpbnQ2NCwgT2ZmZXJWYWx1ZT4oeyBrZXlQcmVmaXg6IEh5cGVyU3dhcEJveFByZWZpeE9mZmVycyB9KQogICAgYnl0ZWNfMCAvLyAibyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU1OAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMub2ZmZXJzKGlkKS5leGlzdHMsIGVyck9mZmVyTm90Rm91bmQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiByZXR1cm5MZWFmX2FmdGVyX2Fzc2VydEAyCiAgICBieXRlY18yIC8vICJFUlI6ZXJyTm9mciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOb2ZyCgpyZXR1cm5MZWFmX2FmdGVyX2Fzc2VydEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1NTkKICAgIC8vIGNvbnN0IHsgc3RhdGUsIGVzY3Jvd2VkIH0gPSB0aGlzLm9mZmVycyhpZCkudmFsdWUKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGR1cAogICAgZXh0cmFjdCAwIDEKICAgIHN3YXAKICAgIHB1c2hpbnQgNDEKICAgIGV4dHJhY3RfdWludDY0CiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU2MQogICAgLy8gbG9nZ2VkQXNzZXJ0KHN0YXRlID09PSBTVEFURV9DQU5DRUxMRUQsIGVyckludmFsaWRTdGF0ZSkKICAgIGJ5dGVjIDE4IC8vIDB4MzIKICAgID09CiAgICBibnogcmV0dXJuTGVhZl9hZnRlcl9hc3NlcnRANAogICAgYnl0ZWMgNSAvLyAiRVJSOmVycklzdGUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXN0ZQoKcmV0dXJuTGVhZl9hZnRlcl9hc3NlcnRANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTYzCiAgICAvLyBsb2dnZWRBc3NlcnQoZXNjcm93ZWQgPiAwLCBlcnJOb3RoaW5nVG9XaXRoZHJhdykKICAgIGRpZyAyCiAgICBibnogcmV0dXJuTGVhZl9hZnRlcl9hc3NlcnRANgogICAgcHVzaGJ5dGVzICJFUlI6ZXJyTnR3ZCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOdHdkCgpyZXR1cm5MZWFmX2FmdGVyX2Fzc2VydEA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1NjUKICAgIC8vIGNvbnN0IGhhc2ggPSBzaGEyNTYoc2hhMjU2KEJ5dGVzYCR7ZnJvbS5ieXRlc30ke3JlY2VpdmVyLmJ5dGVzfSR7aXRvYihhc3NldCl9JHtpdG9iKGFtb3VudCl9YCkpCiAgICBmcmFtZV9kaWcgLTQKICAgIGZyYW1lX2RpZyAtMwogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgLTIKICAgIGl0b2IKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC0xCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHNoYTI1NgogICAgc2hhMjU2CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU2NgogICAgLy8gY29uc3QgaGFzaEtleTogSGFzaEtleSA9IHsgaWQsIGhhc2ggfQogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NzAKICAgIC8vIGhhc2hlcyA9IEJveE1hcDxIYXNoS2V5LCBSZWZ1bmRWYWx1ZT4oeyBrZXlQcmVmaXg6IEh5cGVyU3dhcEJveFByZWZpeEhhc2hlcyB9KQogICAgYnl0ZWMgOSAvLyAiaCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU2NwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuaGFzaGVzKGhhc2hLZXkpLmV4aXN0cywgZXJyTGVhZk5vdEVzY3Jvd2VkKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogcmV0dXJuTGVhZl9hZnRlcl9hc3NlcnRAOAogICAgYnl0ZWMgMzIgLy8gIkVSUjplcnJMbmVzIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckxuZXMKCnJldHVybkxlYWZfYWZ0ZXJfYXNzZXJ0QDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU2OQogICAgLy8gbGV0IHsgcGF5b3IsIGFtb3VudDogcmVmdW5kQW1vdW50IH0gPSB0aGlzLmhhc2hlcyhoYXNoS2V5KS52YWx1ZQogICAgZHVwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZHVwCiAgICBleHRyYWN0IDggMzIKICAgIGNvdmVyIDIKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1NzAKICAgIC8vIHRoaXMuaGFzaGVzKGhhc2hLZXkpLmRlbGV0ZSgpCiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTcyCiAgICAvLyBpZiAoYXNzZXQgPT09IDApIHsKICAgIGZyYW1lX2RpZyAtMgogICAgYm56IHJldHVybkxlYWZfZWxzZV9ib2R5QDExCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU3My01NzgKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGFtb3VudDogYW1vdW50LAogICAgLy8gICAgIHJlY2VpdmVyOiBmcm9tLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIGZyYW1lX2RpZyAtNAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgZnJhbWVfZGlnIC0xCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1NzMtNTc3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudCwKICAgIC8vICAgICByZWNlaXZlcjogZnJvbSwKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTczLTU3OAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50OiBhbW91bnQsCiAgICAvLyAgICAgcmVjZWl2ZXI6IGZyb20sCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKCnJldHVybkxlYWZfYWZ0ZXJfaWZfZWxzZUAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTg5CiAgICAvLyB0aGlzLnJlZnVuZFN0b3JhZ2UocGF5b3IsIGZyb20sIHJlZnVuZEFtb3VudCkKICAgIGZyYW1lX2RpZyAtNAogICAgc3dhcAogICAgY2FsbHN1YiByZWZ1bmRTdG9yYWdlCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU5MgogICAgLy8gY29uc3QgbmV3RXNjcm93ZWQ6IHVpbnQ2NCA9IGVzY3Jvd2VkIC0gMQogICAgc3dhcAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1OTQKICAgIC8vIGlmIChuZXdFc2Nyb3dlZCA9PT0gMCkgewogICAgYm56IHJldHVybkxlYWZfZWxzZV9ib2R5QDE1CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU5NQogICAgLy8gdGhpcy5vZmZlcnMoaWQpLnZhbHVlLmVzY3Jvd2VkID0gbmV3RXNjcm93ZWQKICAgIGl0b2IKICAgIGRpZyAxCiAgICBwdXNoaW50IDQxCiAgICB1bmNvdmVyIDIKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU5NgogICAgLy8gdGhpcy5vZmZlcnMoaWQpLnZhbHVlLnN0YXRlID0gU1RBVEVfQ0FOQ0VMX0NPTVBMRVRFRAogICAgaW50Y18wIC8vIDAKICAgIGJ5dGVjIDExIC8vIDB4M2MKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICByZXRzdWIKCnJldHVybkxlYWZfZWxzZV9ib2R5QDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1OTgKICAgIC8vIHRoaXMub2ZmZXJzKGlkKS52YWx1ZS5lc2Nyb3dlZCA9IG5ld0VzY3Jvd2VkCiAgICBpdG9iCiAgICBwdXNoaW50IDQxCiAgICBzd2FwCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgcmV0c3ViCgpyZXR1cm5MZWFmX2Vsc2VfYm9keUAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTgwLTU4NgogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldCwKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50LAogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IGZyb20sCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgZnJhbWVfZGlnIC00CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIGZyYW1lX2RpZyAtMQogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgZnJhbWVfZGlnIC0yCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1ODAtNTg1CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnQsCiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogZnJvbSwKICAgIC8vICAgfSkKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU4MC01ODYKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudCwKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBmcm9tLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICBiIHJldHVybkxlYWZfYWZ0ZXJfaWZfZWxzZUAxMwo=", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyAGAAEIINSQAuSTAiYiAW8BcAtFUlI6ZXJyTm9mcglha2l0YV9kYW8LRVJSOmVycklwYXkLRVJSOmVycklzdGUBFAEKC0VSUjplcnJPZmV4AWgBHgE8AgAADG9mZmVyX2N1cnNvcgFyAXQLRVJSOmVyck5wcnQLRVJSOmVyckl4ZnIBMgEoBBUffHUDcGFsC0VSUjplcnJSbm9pB3ZlcnNpb24EokwGfAtFUlI6ZXJyTGFlcwtFUlI6ZXJyQ3ZsZgtFUlI6ZXJyTmNscwtFUlI6ZXJyTnJreQTfKHp9BndhbGxldAtFUlI6ZXJyTmRhbwtFUlI6ZXJyTG5lcwIAAYAE6pGA3TYaAI4BAMIxGRREMRhBAKuCEAQNs6RLBHvagckE2F/r3QRGb4caBFZqYrIEJzNroAQMerQuBAYxhosE4eXoYQRoO7Z4BNPuBPAEANcB1QQ5Tq6yBDPpLJQEhU3t4ASEBzPdNhoAjhAAjgIXAyEERgX0Bi4GZwcZB1kHiQhSCU0JbgoTADIAAQCALBUffHUAAAAAAAE2jAAAAAAAAIhUAAAAAAAAiFQAAAAAAACJ5AAAAAAAAAAAsCNDI0OABM2a1n42GgCOAQAlADEZgQQSMRgQREIJeYoCAYv+cwBFAUAACIv/MgEPQQACI4kiiTYaAUkiWYECCEsBFRJEVwIANhoCSRUkEkQXJxdPAmcrTGcnDSJnI0MxFiMJSTgQIxJENhoBSU4CSRUlEkQ2GgJJFSQSRBdOAzYaA0lOAkkVJRJENhoESRUkEkQXTgQ2GgVJFSQSRBdOAhNAAA+AC0VSUjplcnJCcm90sABJMgcNQAAEJwiwAEkyBwmBgJqeAQ5AAA+AC0VSUjplcnJPdGxnsABLAkk4AEw4BzIKEkAABCcEsABPAzgIgailCxJAAAQnBLAAIicNZURJIwgnDUxnIitlRIADYWFsZUiBSFtMFicOSwFQSwIWv7FLAXIIRCEFsgiyByOyECKyAbYnD0sBUEkVFlcGAkxQgQMWSwOyGCcYshpMshpPB0lOBLIaSbIagQayECKyAbOxSwJyCEQhBbIIsgcjshAisgG2KUsCUEkVFlcGAkxQTwOyGCcYshqyGk8FSU4DshqyGoEGshAisgGzIQQWTwRJTgJQSwIxAFApTFBMv4HUlAkWTFCAAWZLAlBMv08ESSMSJwcnBk8CTU8EUE8FFlAiFlBPA1BMFlAjFlBPAhZQKE8CUEy/I0MxFiMJSTgQIxJENhoBSRUkEkQXSTYaAklOBEkiWSULgQIITBUSRDYaA0lOAxUlEkQWSShMUElOBr1FAUAAAyqwAEsBiAfZTwMSQAAPgAtFUlI6ZXJyVG1pc7AASwS+RElXAAFLAYFhW04DSwGBWVtOAkyBUVtOAycHEkAABCcFsAAyB08EDEAABCcIsAAxAAEBTwQjTwJPB4gHukhAAAQnELAAMQBPAkxQSVcACExXCCBQKUxQSb1FAUEAD4ALRVJSOmVyckVhY2OwAEwjCElOAxZLBYFZTwK7SwM4BzIKEkAABCcEsABLAzgIIQQSQAAEJwSwAE8DOAAhBBZMUL8SQQAFSSInBrsjQzEWIwlJOBAjEkQ2GgFJFSQSRBdJTgI2GgJJTgMVJRJENhoDSRUkEkQXTgI2GgRJTgRJIlklC4ECCEwVEkQWSShMUElOB71FAUAAAyqwAEsGvkRJVwABSwGBKVtOBUsBgSFbTghMgWFbTCcGEkAABCcFsAAyBw1AAAQnCLAASTEAUElXAAhMVwggUClMUL1FAUAABCcQsAAxAE8GUCIWUEsDFlABAUlPAkxQJwlMUEm9RQFBAAQnGbAATwciTwNPB4gGiEhAAAQnGrAASwE4CTIDEkAABCcbsABLATggMgMSQAAEJxywAEsBOAcyChJAAAQnBLAASwE4CE8DIQQIEkAABCcEsABMOAAhBBZMUL8jCEkWSwOBKU8CuxJBAAVJIicKuyNDgAAxFoECCUk4ECMSRDEWIwlJOBCBBBJENhoBSRUkEkQXSU4DNhoCSU4DFSUSRDYaA0kVJBJEF04DNhoESRUkEkQXTgQ2GgVJTgVJIlklC4ECCEwVEkQWSU4CKExQSU4JvUUBQAADKrAASwi+RElXAAFLAYEpW04JSwGBIVtOCkyBYVtMJwYSQAAEJwWwADIHDUAABCcIsABLATEAUElXAAhMVwggUClMUL1FAUAABCcQsAAxAEsDUEsEFlBLBhZQAQFJTgJPA0xQJwlMUElOAr1FAUEABCcZsABPCiJPBE8HiAVCSEAABCcasAAhBEUKTwJLA3AARQFAAAchBDIQCEUJSwQ4BzIKEkAABCcEsABLBDgISwkSQAAEJwSwADEASwE4ABJAAA+AC0VSUjplcnJJcG1zsABJOBMyAxJAAA+AC0VSUjplcnJOY2x3sABJOBUyAxJAAAQnG7AASTggMgMSQAAEJxywAEk4FDIKEkAABCcRsABJOBFPAxJAAAQnEbAAOBJPAhJAAAQnEbAATDgASwUWTFC/IwhJFksDgSlPArsSQQAFSSInCrsjQzYaAUkVJBJEFzYaAkkVJBJEFzYaA0kVJRJENhoESRUkEkQXNhoFSRUkEkQXMQBPBUxOBU4FiATaI0M2GgFJFSQSRBc2GgJJFSUSRDYaA0kVJBJEFzYaBEkVJRJENhoFSRUkEkQXNhoGSRUkEkQXiAShI0MigABJNhoBSRUkEkQXNhoCSSJZJQuBAghMFRJEFkkoTFBJvUUBQAADKrAASb5ESVcAAUlOAkUHSYEpW04ESYEhW0UGgWFbRQYnBxJAACBLBScGEkAAGEsFJwoSQQBQSwJLBBJBAEhLBDIHDkEAQCNAAAQnBbAAMQBPAkxQSVcACExXCCBQKUxQvUUBQAAPgAtFUlI6ZXJyTmFjcLAATEAABiInC7sjQyInErtC//ciQv+9NhoBSRUkEkQXNhoCSRUlEkQ2GgNJFSQSRBc2GgRJFSQSRBc2GgVJIlklC4ECCEwVEkQxAE8ETE4ETgSIBjgjQzYaAUkVJBJEFzYaAkkVJRJENhoDSRUlEkQ2GgRJFSQSRBc2GgVJFSQSRBeIBggjQyKAAEk2GgFJFSQSRBc2GgJJTgIVJRJEFkkoTFBJTgK9RQFAAAMqsABLAb5ESVcAAUlOAkUISYFhW0UGSYFZW04EgSlbRQcnExJAABBLBicLEkAACEsGJxISQQBpI0sHJwcSQAAISwcnBhJBAFRLBTIHDkEATEsGQABHIxFAAAQnBbAASwNQKUxQSb1FAUAAD4ALRVJSOmVyck5wZmSwAEm+RElXCCBMIltPArxITwMjCRZPA4FZTwK7TE4CiAKFI0MiQv+2IkL/lCKAAEk2GgFJFSQSRBcWSShMUEm9RQFAAAMqsABJvkRJVwABSU4CRQdJgWFbRQVJgVlbTgOBKVtFBicTEkAACEsFJwsSQQCwI0sGJwcSQAAISwYnBhJBAJtLBDIHDkEAk0sFQACOIxFAAAQnBbAATEEAD4ALRVJSOmVyclBuY2ywAIABZk8CSU4CUEm+RElXCCBMIlsnDksEUEm+RBexJw9LBlBJFRZXBgJMUEsBshgnHbIashqBBrIQIrIBs7EpTwZQSRUWVwYCTFBMshgnHbIashqBBrIQIrIBs08EvEhPA7xIvEixsgiyByOyECKyAbMjQyJC/28iQv9NNhoBSRUkEkQXSRYoTFC9RQFAAAMqsACIAM8nFExQsCNDMRYjCUcCOBAjEkQ2GgFJFSQSRBdMOAcyChJAAA+AC0VSUjplcnJJcG1ysABMOAgyEBJAAA+AC0VSUjplcnJJcG1hsACxMgpMshEishKyFIEEshAisgGzI0M2GgFJIlmBAghLARUSRFcCADEAIitlRCceZUhyCEQSQAAEJx+wACIrZUQnFWVIgRBbMg0SQAAPgAtFUlI6ZXJySXVwZ7AAJxdMZyNDNhoBSRUkEkQXMQAiK2VEJx5lSHIIRBJAAAQnH7AAK0xnI0OKAQGL/xYoSwFQvkRJVwEgSwFXIQhLAlcxIEsDV1EITwRXYQhPBU8FUE8EUE8DUE8CUExQAYmKBAKxMgonDymL/U2L/BZMSwFQSRUWVwYCTFCBAxYnDk8DUL5EF7IYgAQr88xashpPArIaTLIai/6yGov/shqyGoEGshAisgGztD5JVwQATFcABCcUEkRJFSMSRCJTi/+JigMAi/2L/4j1d0EAEbGL/7IIi/2yByOyECKyAbOJi/6L/4j1XEH/9bGL/7IIi/6yByOyECKyAbOJigYAIkmAAEcFi/oWSShMUElOAr1FAUAAAyqwAIsIvkRJVwABTIEpW4wEJwoSQAAEJwWwAIv7i/1Qi/4WSU4CUIv/FklOAlABAU8DTFAnCUxQSb1FAUAABCcgsABJvkRJVwggjAEiW4wGvEiL/kAAMkYCsYv9sgeL/7III7IQIrIBs4sBi/uLBoj/PIsEIwlJFosIgSlPArtAAAaLCCInE7uJi/2L/nAARQFAAbmL/EAABCcWsACL/HIIRIv9EkAAD4ALRVJSOmVyclJ3bW2wAIsGMhAPQAAEJxawACIrZUQnFWVIVwAIsSMWSU4CMgqBBK+L/LIYgASzYjSlshpPA7IaTwKyGkyyGicMshqyGoEGshAisgGztD5JVwQATFcABCcUEkRJFSMSRCJTQAAEJxawACIrZUQnIU8EUElOAychTwVQSU4CjAAiWUlOAk4EIllJjAISRCcVZUhJVwAITgIiW04Ci/yAEmNvbnRyb2xsZWRfYWRkcmVzc2VMTgNBAOBLAhUlEkEA2CNAAA+AC0VSUjplcnJJd2x0sACxi/yyGIAEWt8zj7IaTLIashonDLIaJwyyGicMshqBBrIQIrIBtjIQTwMLsghJsgcjshAisgG2i/wWTwKyGIAEaDXjvLIashqAAYCyGksBshqBBrIQIrIBIkmLAgxBADKLAFcCAEsBJAtJjANbSYwHQQAatksCVwIAiwNbshFLAbIUiweyEoEEshAisgEjCEL/x0YDtov8shiABGzD9gayGoEGshAisgGzMhBJjAWLBgxB/jqLBosFCYsBi/tPAoj9aEL+KSJC/yVGArGL/bIUi/+yEov+shGBBLIQIrIBs4sBi/uLBoj9QUL+AooFAIv7FkkoTFBJvUUBQAADKrAASb5ESVcAAUyBKVtOAycSEkAABCcFsABLAkAAD4ALRVJSOmVyck50d2SwAIv8i/1Qi/4WUIv/FlABAU8CTFAnCUxQSb1FAUAABCcgsABJvkRJVwggTgIiW0y8SIv+QAAwsYv8sgeL/7III7IQIrIBs4v8TIj8tEwjCUlAAA0WSwGBKU8CuyInC7uJFoEpTLuJsYv8shSL/7ISi/6yEYEEshAisgGzQv/I", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
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
     * Constructs a no op call for the withdrawFor(uint64,address,address,uint64,uint64)void ABI method
     *
    * Returns any escrowed leaf of a cancelled swap to its funder (`from`, named by the leaf hash).
    Permissionless, like `disburseFrom`: the leaf can only go back to the account that funded it,
    so a funder that never comes back cannot keep a cancelled offer out of CANCEL_COMPLETED and
    hold the offer's storage deposit.
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static withdrawFor(params) {
    return {
      ...params,
      method: "withdrawFor(uint64,address,address,uint64,uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.id, params.args.from, params.args.receiver, params.args.asset, params.args.amount]
    };
  }
  /**
     * Constructs a no op call for the cleanupParticipant(uint64,address)void ABI method
     *
    * Cleans up participant box and refunds MBR
    Can only be called when offer is completed, cancelled (with or without leaves still to be
    returned: a participant's deposit backs no escrow), or expired
  
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
         * Makes a call to the HyperSwap smart contract using the `withdrawFor(uint64,address,address,uint64,uint64)void` ABI method.
         *
        * Returns any escrowed leaf of a cancelled swap to its funder (`from`, named by the leaf hash).
        Permissionless, like `disburseFrom`: the leaf can only go back to the account that funded it,
        so a funder that never comes back cannot keep a cancelled offer out of CANCEL_COMPLETED and
        hold the offer's storage deposit.
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    withdrawFor: (params) => {
      return this.appClient.params.call(HyperSwapParamsFactory.withdrawFor(params));
    },
    /**
         * Makes a call to the HyperSwap smart contract using the `cleanupParticipant(uint64,address)void` ABI method.
         *
        * Cleans up participant box and refunds MBR
        Can only be called when offer is completed, cancelled (with or without leaves still to be
        returned: a participant's deposit backs no escrow), or expired
    
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
         * Makes a call to the HyperSwap smart contract using the `withdrawFor(uint64,address,address,uint64,uint64)void` ABI method.
         *
        * Returns any escrowed leaf of a cancelled swap to its funder (`from`, named by the leaf hash).
        Permissionless, like `disburseFrom`: the leaf can only go back to the account that funded it,
        so a funder that never comes back cannot keep a cancelled offer out of CANCEL_COMPLETED and
        hold the offer's storage deposit.
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    withdrawFor: (params) => {
      return this.appClient.createTransaction.call(HyperSwapParamsFactory.withdrawFor(params));
    },
    /**
         * Makes a call to the HyperSwap smart contract using the `cleanupParticipant(uint64,address)void` ABI method.
         *
        * Cleans up participant box and refunds MBR
        Can only be called when offer is completed, cancelled (with or without leaves still to be
        returned: a participant's deposit backs no escrow), or expired
    
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
         * Makes a call to the HyperSwap smart contract using the `withdrawFor(uint64,address,address,uint64,uint64)void` ABI method.
         *
        * Returns any escrowed leaf of a cancelled swap to its funder (`from`, named by the leaf hash).
        Permissionless, like `disburseFrom`: the leaf can only go back to the account that funded it,
        so a funder that never comes back cannot keep a cancelled offer out of CANCEL_COMPLETED and
        hold the offer's storage deposit.
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    withdrawFor: async (params) => {
      const result = await this.appClient.send.call(HyperSwapParamsFactory.withdrawFor(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the HyperSwap smart contract using the `cleanupParticipant(uint64,address)void` ABI method.
         *
        * Cleans up participant box and refunds MBR
        Can only be called when offer is completed, cancelled (with or without leaves still to be
        returned: a participant's deposit backs no escrow), or expired
    
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
       * Add a withdrawFor(uint64,address,address,uint64,uint64)void method call against the HyperSwap contract
       */
      withdrawFor(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.withdrawFor(params)));
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
var HYPER_SWAP_ERROR_MESSAGES = _chunkZGCVKZRLjs.withErrorCodeAliases.call(void 0, {
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
var translateHyperSwapError = _chunkZGCVKZRLjs.makeErrorTranslator.call(void 0, HYPER_SWAP_ERROR_MESSAGES);

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
var HyperSwapSDK = class extends _chunkDAPZMPG6js.BaseSDK {
  constructor(params) {
    super({ factory: HyperSwapFactory, ...params }, _chunkNTQ4SNRMjs.ENV_VAR_NAMES.HYPER_SWAP_APP_ID);
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
  /**
   * Returns an escrowed leaf of a cancelled offer to its funder (`from`). Anyone may call this, and the
   * leaf can only go back to the account that funded it. Once every leaf is returned the offer is
   * complete and its storage can be cleaned up, so no funder has to come back for the others to finish.
   */
  async withdrawFor({ sender, signer, id, from, receiver, asset, amount }) {
    const sendParams = this.getSendParams({ sender, signer });
    await this.client.send.withdrawFor({
      ...sendParams,
      args: { id, from, receiver, asset, amount }
    });
  }
};








exports.HYPER_SWAP_ERROR_MESSAGES = HYPER_SWAP_ERROR_MESSAGES; exports.translateHyperSwapError = translateHyperSwapError; exports.OfferState = OfferState; exports.hyperSwapRootName = hyperSwapRootName; exports.hyperSwapRootBoxName = hyperSwapRootBoxName; exports.HyperSwapSDK = HyperSwapSDK;
//# sourceMappingURL=chunk-YHLSOD6U.js.map
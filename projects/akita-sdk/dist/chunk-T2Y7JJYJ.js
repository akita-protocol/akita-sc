"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } var _class; var _class2;


var _chunkYKKIQIROjs = require('./chunk-YKKIQIRO.js');



var _chunkZGCVKZRLjs = require('./chunk-ZGCVKZRL.js');


var _chunkZ5W34YZIjs = require('./chunk-Z5W34YZI.js');


var _chunkZLCB7PYBjs = require('./chunk-ZLCB7PYB.js');

// src/hyper-swap/index.ts
var _algokitutils = require('@algorandfoundation/algokit-utils');

// src/generated/HyperSwapClient.ts
var _apparc56 = require('@algorandfoundation/algokit-utils/types/app-arc56');


var _appclient = require('@algorandfoundation/algokit-utils/types/app-client');
var _appfactory = require('@algorandfoundation/algokit-utils/types/app-factory');
var APP_SPEC = { "name": "HyperSwap", "structs": { "Object57CB3C34": [{ "name": "root", "type": "uint64" }, { "name": "data", "type": "uint64" }], "HashKey": [{ "name": "id", "type": "uint64" }, { "name": "hash", "type": "byte[32]" }], "HyperSwapMBRData": [{ "name": "offers", "type": "uint64" }, { "name": "participants", "type": "uint64" }, { "name": "hashes", "type": "uint64" }, { "name": "mm", "type": "Object57CB3C34" }], "OfferValue": [{ "name": "state", "type": "uint8" }, { "name": "root", "type": "byte[32]" }, { "name": "leaves", "type": "uint64" }, { "name": "escrowed", "type": "uint64" }, { "name": "participantsRoot", "type": "byte[32]" }, { "name": "participantsLeaves", "type": "uint64" }, { "name": "acceptances", "type": "uint64" }, { "name": "expiration", "type": "uint64" }], "ParticipantKey": [{ "name": "id", "type": "uint64" }, { "name": "address", "type": "address" }], "RefundValue": [{ "name": "amount", "type": "uint64" }, { "name": "payor", "type": "address" }] }, "methods": [{ "name": "create", "args": [{ "type": "string", "name": "version" }, { "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "offer", "args": [{ "type": "pay", "name": "payment" }, { "type": "byte[32]", "name": "root", "desc": "the merkle tree root of trades consisting of from address, recipient address, asset id & amount" }, { "type": "uint64", "name": "leaves", "desc": "the number of leaves in the tree" }, { "type": "byte[32]", "name": "participantsRoot", "desc": "the merkle tree root of participating addresses" }, { "type": "uint64", "name": "participantsLeaves" }, { "type": "uint64", "name": "expiration", "desc": "the unix timestamp that the offer auto-expires at; at most `MaxOfferDuration` from now" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Creates a merkle tree based atomic payment/xfer group", "events": [], "recommendations": {} }, { "name": "accept", "args": [{ "type": "pay", "name": "mbrPayment", "desc": "the payment to cover the MBR" }, { "type": "uint64", "name": "id", "desc": "the id of the offer being accepted" }, { "type": "byte[32][]", "name": "proof", "desc": "the bytes32 array proof of inclusion in the participants list" }, { "type": "byte[32]", "name": "terms", "desc": "`offerTerms(id)` as computed by the participant from the full leaf and participant lists" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Accepts an offer", "events": [], "recommendations": {} }, { "name": "escrow", "args": [{ "type": "pay", "name": "payment", "desc": "the leaf's ALGO principal plus the hash MBR, from any payer" }, { "type": "uint64", "name": "id", "desc": "the id of the offer" }, { "type": "address", "name": "receiver", "desc": "the recipient in the offer leaf" }, { "type": "uint64", "name": "amount", "desc": "the amount in the offer leaf" }, { "type": "byte[32][]", "name": "proof", "desc": "the proof to verify the details are part of the tree" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Escrows the assets in the trade for a given leaf in the tree", "events": [], "recommendations": {} }, { "name": "escrowAsa", "args": [{ "type": "pay", "name": "mbrPayment", "desc": "the payment to cover the MBR" }, { "type": "axfer", "name": "assetXfer", "desc": "the asset transfer to escrow the asa, sent by the participant (no clawback)" }, { "type": "uint64", "name": "id", "desc": "the id of the offer" }, { "type": "address", "name": "receiver", "desc": "the recipient in the offer leaf" }, { "type": "uint64", "name": "asset", "desc": "the asset in the offer leaf" }, { "type": "uint64", "name": "amount", "desc": "the amount in the offer leaf" }, { "type": "byte[32][]", "name": "proof", "desc": "the proof to verify the details are part of the tree" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Escrows the assets in the trade for a given leaf in the tree", "events": [], "recommendations": {} }, { "name": "disburse", "args": [{ "type": "uint64", "name": "id", "desc": "the id of the offer" }, { "type": "uint64", "name": "receiverWallet", "desc": "the receiver's ARC58 wallet app id (0 if not an ARC58 wallet)" }, { "type": "address", "name": "receiver", "desc": "the recipient address in the leaf" }, { "type": "uint64", "name": "asset", "desc": "the asset being transferred" }, { "type": "uint64", "name": "amount", "desc": "the amount being transferred" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Disburses the caller's own escrowed leaf. Kept for the existing plugin ABI; equivalent to\n`disburseFrom(id, Txn.sender, ...)`.", "events": [], "recommendations": {} }, { "name": "disburseFrom", "args": [{ "type": "uint64", "name": "id", "desc": "the id of the offer" }, { "type": "address", "name": "from", "desc": "the funder (sender) in the leaf" }, { "type": "uint64", "name": "receiverWallet", "desc": "the receiver's ARC58 wallet app id (0 if not an ARC58 wallet)" }, { "type": "address", "name": "receiver", "desc": "the recipient address in the leaf" }, { "type": "uint64", "name": "asset", "desc": "the asset being transferred" }, { "type": "uint64", "name": "amount", "desc": "the amount being transferred" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Disburses any escrowed leaf. Permissionless: once every agreed leaf is funded, anyone can\ncomplete the swap, so no participant can withhold its own leaf.", "events": [], "recommendations": {} }, { "name": "cancel", "args": [{ "type": "uint64", "name": "id", "desc": "the id of the offer being cancelled" }, { "type": "byte[32][]", "name": "proof", "desc": "unused; kept for ABI compatibility (membership was proven at accept)" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Cancels an offer. Allowed while collecting acceptances or escrow, and in DISBURSING only after\nexpiration and only if no leaf has been disbursed yet (`escrowed === leaves`), so a swap is\neither completed or fully unwound.", "events": [], "recommendations": {} }, { "name": "withdraw", "args": [{ "type": "uint64", "name": "id", "desc": "the id of the cancelled offer" }, { "type": "address", "name": "receiver", "desc": "the receiver of the leaf's swap" }, { "type": "uint64", "name": "asset", "desc": "the asset of the leaf's swap" }, { "type": "uint64", "name": "amount", "desc": "the amount of the leaf's swap" }, { "type": "byte[32][]", "name": "proof", "desc": "unused; kept for ABI compatibility (the hash box proves a verified escrow)" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Withdraws your assets from a cancelled swap if they're escrowed", "events": [], "recommendations": {} }, { "name": "cleanupParticipant", "args": [{ "type": "uint64", "name": "id", "desc": "the id of the offer" }, { "type": "address", "name": "participant", "desc": "the participant address to clean up" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Cleans up participant box and refunds MBR\nCan only be called when offer is completed, cancelled+completed, or expired", "events": [], "recommendations": {} }, { "name": "cleanupOffer", "args": [{ "type": "uint64", "name": "id", "desc": "the id of the offer" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Cleans up the offer box after all participants have been cleaned up\nCan only be called when offer is completed, cancelled+completed, or expired", "events": [], "recommendations": {} }, { "name": "offerTerms", "args": [{ "type": "uint64", "name": "id" }], "returns": { "type": "byte[32]" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "The terms commitment `accept` expects for an offer. Clients should compute it independently.", "events": [], "recommendations": {} }, { "name": "optIn", "args": [{ "type": "pay", "name": "payment", "desc": "The payment transaction" }, { "type": "uint64", "name": "asset", "desc": "The asset to be opted into" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "optin tells the contract to opt into an asa", "events": [], "recommendations": {} }, { "name": "update", "args": [{ "type": "string", "name": "newVersion" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["UpdateApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "mbr", "args": [], "returns": { "type": "(uint64,uint64,uint64,(uint64,uint64))", "struct": "HyperSwapMBRData" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "Shared storage costs for HyperSwap and its plugin using the current Meta layout.", "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 2, "bytes": 1 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "offerCursor": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "b2ZmZXJfY3Vyc29y", "desc": "global counter for offers" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" } }, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": { "offers": { "keyType": "uint64", "valueType": "OfferValue", "desc": "map of hyper swap offers", "prefix": "bw==" }, "participants": { "keyType": "ParticipantKey", "valueType": "RefundValue", "desc": "map of the participants in each swap", "prefix": "cA==" }, "hashes": { "keyType": "HashKey", "valueType": "RefundValue", "desc": "map of merkle tree hashes during escrow & disbursal phases", "prefix": "aA==" }, "offerRefunds": { "keyType": "uint64", "valueType": "RefundValue", "desc": "Original offer/root deposit, refunded after their storage is deleted.", "prefix": "Zg==" }, "offerRegistry": { "keyType": "uint64", "valueType": "uint64", "desc": "Meta registry that holds the offer's roots, pinned at creation. Later DAO registry changes\ncannot strand an offer's proofs or root deposits.", "prefix": "cg==" } } } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [1017, 1270, 1590, 2072, 2279, 2357, 2495, 2605, 2675, 2785, 2800, 3140, 3219, 3368, 3431], "errorMessage": "Box must have value" }, { "pc": [3269, 3629], "errorMessage": "Bytes has valid prefix" }, { "pc": [613], "errorMessage": "ERR:errBrot" }, { "pc": [1391, 1717], "errorMessage": "ERR:errCvlf" }, { "pc": [1125], "errorMessage": "ERR:errEacc" }, { "pc": [670, 686, 1153, 1167, 1433, 1450, 1753, 1767], "errorMessage": "ERR:errIpay" }, { "pc": [2996], "errorMessage": "ERR:errIpma" }, { "pc": [2972], "errorMessage": "ERR:errIpmr" }, { "pc": [1792], "errorMessage": "ERR:errIpms" }, { "pc": [1051, 1303, 1623, 2144, 2300, 2574, 2754, 3388], "errorMessage": "ERR:errIste" }, { "pc": [3087], "errorMessage": "ERR:errIupg" }, { "pc": [3749], "errorMessage": "ERR:errIwlt" }, { "pc": [1855, 1868, 1880], "errorMessage": "ERR:errIxfr" }, { "pc": [1373, 1699], "errorMessage": "ERR:errLaes" }, { "pc": [2354, 3428], "errorMessage": "ERR:errLnes" }, { "pc": [2183], "errorMessage": "ERR:errNacp" }, { "pc": [1405, 1829], "errorMessage": "ERR:errNcls" }, { "pc": [1816], "errorMessage": "ERR:errNclw" }, { "pc": [3055, 3123], "errorMessage": "ERR:errNdao" }, { "pc": [987, 1266, 1586, 2069, 2276, 2491, 2672, 2918, 3364], "errorMessage": "ERR:errNofr" }, { "pc": [2602], "errorMessage": "ERR:errNpfd" }, { "pc": [1085, 1339, 1660], "errorMessage": "ERR:errNprt" }, { "pc": [1419, 1842], "errorMessage": "ERR:errNrky" }, { "pc": [2320], "errorMessage": "ERR:errNtwd" }, { "pc": [624, 1063, 1313, 1633], "errorMessage": "ERR:errOfex" }, { "pc": [652], "errorMessage": "ERR:errOtlg" }, { "pc": [2773], "errorMessage": "ERR:errPncl" }, { "pc": [3518, 3556, 3643], "errorMessage": "ERR:errRnoi" }, { "pc": [3544], "errorMessage": "ERR:errRwmm" }, { "pc": [1013], "errorMessage": "ERR:errTmis" }, { "pc": [729, 793, 3047, 3115, 3523], "errorMessage": "application exists" }, { "pc": [691, 702, 3040, 3059, 3108, 3560, 3647], "errorMessage": "check GlobalState exists" }, { "pc": [3679], "errorMessage": "errAamm" }, { "pc": [1139, 1186, 1470, 1479, 1900, 1909, 2191, 2198, 2413, 2417, 2424, 2628, 3488, 3497], "errorMessage": "index out of bounds" }, { "pc": [495, 951, 1240, 1558, 2045, 2250, 3023, 3667, 3674], "errorMessage": "invalid array length header" }, { "pc": [503, 3031], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [960, 1249, 1567, 2054, 2259], "errorMessage": "invalid number of bytes for arc4.dynamic_array<bytes[32]>" }, { "pc": [550, 572, 970, 1220, 1527, 1937, 1986, 2003, 2224, 2474], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [514, 558, 580, 591, 940, 1206, 1228, 1513, 1535, 1546, 1919, 1928, 1945, 1954, 1977, 1994, 2011, 2020, 2038, 2213, 2232, 2242, 2463, 2656, 2903, 2947, 3101], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [3274, 3634], "errorMessage": "invalid number of bytes for bool" }, { "pc": [1505], "errorMessage": "transaction type is axfer" }, { "pc": [539, 932, 1198, 1494, 2939], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDggMzIgMzQ5MDAgMzUzMDAKICAgIGJ5dGVjYmxvY2sgIm8iICJwIiAiRVJSOmVyck5vZnIiICJha2l0YV9kYW8iICJFUlI6ZXJySXBheSIgIkVSUjplcnJJc3RlIiAweDE0IDB4MGEgIkVSUjplcnJPZmV4IiAiaCIgMHgxZSAweDNjIDB4MDAwMCAib2ZmZXJfY3Vyc29yIiAiciIgInQiICJFUlI6ZXJyTnBydCIgIkVSUjplcnJJeGZyIiAweDI4IDB4MTUxZjdjNzUgInBhbCIgIkVSUjplcnJSbm9pIiAidmVyc2lvbiIgMHhhMjRjMDY3YyAiRVJSOmVyckxhZXMiICJFUlI6ZXJyQ3ZsZiIgIkVSUjplcnJOY2xzIiAiRVJSOmVyck5ya3kiICJFUlI6ZXJyTG5lcyIgMHhkZjI4N2E3ZCAid2FsbGV0IiAiRVJSOmVyck5kYW8iIDB4MDAwMQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1NgogICAgLy8gZXhwb3J0IGNsYXNzIEh5cGVyU3dhcCBleHRlbmRzIGNsYXNzZXMoQmFzZUh5cGVyU3dhcCwgVXBncmFkZWFibGVBa2l0YUJhc2VDb250cmFjdCwgQ29udHJhY3RXaXRoT3B0SW4pIHsKICAgIHB1c2hieXRlcyAweGVhOTE4MGRkIC8vIG1ldGhvZCAidXBkYXRlKHN0cmluZyl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggbWFpbl91cGRhdGVfcm91dGVANAoKbWFpbl9zd2l0Y2hfY2FzZV9uZXh0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU2CiAgICAvLyBleHBvcnQgY2xhc3MgSHlwZXJTd2FwIGV4dGVuZHMgY2xhc3NlcyhCYXNlSHlwZXJTd2FwLCBVcGdyYWRlYWJsZUFraXRhQmFzZUNvbnRyYWN0LCBDb250cmFjdFdpdGhPcHRJbikgewogICAgdHhuIE9uQ29tcGxldGlvbgogICAgIQogICAgYXNzZXJ0CiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgYnogbWFpbl9jcmVhdGVfTm9PcEAyMwogICAgcHVzaGJ5dGVzcyAweDBkYjNhNDRiIDB4N2JkYTgxYzkgMHhkODVmZWJkZCAweDQ2NmY4NzFhIDB4NTY2YTYyYjIgMHgyNzMzNmJhMCAweDBjN2FiNDJlIDB4MDYzMTg2OGIgMHg2ODNiYjY3OCAweGQzZWUwNGYwIDB4MDBkNzAxZDUgMHgzOTRlYWViMiAweDMzZTkyYzk0IDB4ODU0ZGVkZTAgMHg4NDA3MzNkZCAvLyBtZXRob2QgIm9mZmVyKHBheSxieXRlWzMyXSx1aW50NjQsYnl0ZVszMl0sdWludDY0LHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJhY2NlcHQocGF5LHVpbnQ2NCxieXRlWzMyXVtdLGJ5dGVbMzJdKXZvaWQiLCBtZXRob2QgImVzY3JvdyhwYXksdWludDY0LGFkZHJlc3MsdWludDY0LGJ5dGVbMzJdW10pdm9pZCIsIG1ldGhvZCAiZXNjcm93QXNhKHBheSxheGZlcix1aW50NjQsYWRkcmVzcyx1aW50NjQsdWludDY0LGJ5dGVbMzJdW10pdm9pZCIsIG1ldGhvZCAiZGlzYnVyc2UodWludDY0LHVpbnQ2NCxhZGRyZXNzLHVpbnQ2NCx1aW50NjQpdm9pZCIsIG1ldGhvZCAiZGlzYnVyc2VGcm9tKHVpbnQ2NCxhZGRyZXNzLHVpbnQ2NCxhZGRyZXNzLHVpbnQ2NCx1aW50NjQpdm9pZCIsIG1ldGhvZCAiY2FuY2VsKHVpbnQ2NCxieXRlWzMyXVtdKXZvaWQiLCBtZXRob2QgIndpdGhkcmF3KHVpbnQ2NCxhZGRyZXNzLHVpbnQ2NCx1aW50NjQsYnl0ZVszMl1bXSl2b2lkIiwgbWV0aG9kICJjbGVhbnVwUGFydGljaXBhbnQodWludDY0LGFkZHJlc3Mpdm9pZCIsIG1ldGhvZCAiY2xlYW51cE9mZmVyKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJvZmZlclRlcm1zKHVpbnQ2NClieXRlWzMyXSIsIG1ldGhvZCAib3B0SW4ocGF5LHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJ1cGRhdGVBa2l0YURBTyh1aW50NjQpdm9pZCIsIG1ldGhvZCAib3BVcCgpdm9pZCIsIG1ldGhvZCAibWJyKCkodWludDY0LHVpbnQ2NCx1aW50NjQsKHVpbnQ2NCx1aW50NjQpKSIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIG9mZmVyIGFjY2VwdCBlc2Nyb3cgZXNjcm93QXNhIGRpc2J1cnNlIGRpc2J1cnNlRnJvbSBjYW5jZWwgd2l0aGRyYXcgY2xlYW51cFBhcnRpY2lwYW50IGNsZWFudXBPZmZlciBvZmZlclRlcm1zIG9wdEluIHVwZGF0ZUFraXRhREFPIG1haW5fb3BVcF9yb3V0ZUAyMCBtYWluX21icl9yb3V0ZUAyMQogICAgZXJyCgptYWluX21icl9yb3V0ZUAyMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2Jhc2UudHM6NwogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBwdXNoYnl0ZXMgMHgxNTFmN2M3NTAwMDAwMDAwMDAwMTM2OGMwMDAwMDAwMDAwMDA4ODU0MDAwMDAwMDAwMDAwODg1NDAwMDAwMDAwMDAwMDg5ZTQwMDAwMDAwMDAwMDAwMDAwCiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCm1haW5fb3BVcF9yb3V0ZUAyMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozMAogICAgLy8gb3BVcCgpOiB2b2lkIHsgfQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKbWFpbl9jcmVhdGVfTm9PcEAyMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTYKICAgIC8vIGV4cG9ydCBjbGFzcyBIeXBlclN3YXAgZXh0ZW5kcyBjbGFzc2VzKEJhc2VIeXBlclN3YXAsIFVwZ3JhZGVhYmxlQWtpdGFCYXNlQ29udHJhY3QsIENvbnRyYWN0V2l0aE9wdEluKSB7CiAgICBwdXNoYnl0ZXMgMHhjZDlhZDY3ZSAvLyBtZXRob2QgImNyZWF0ZShzdHJpbmcsdWludDY0KXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBjcmVhdGUKICAgIGVycgoKbWFpbl91cGRhdGVfcm91dGVANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozNQogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICB0eG4gT25Db21wbGV0aW9uCiAgICBwdXNoaW50IDQgLy8gVXBkYXRlQXBwbGljYXRpb24KICAgID09CiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgJiYKICAgIGFzc2VydAogICAgYiB1cGRhdGUKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpjYW5SZWNlaXZlQWxnbyhyZWNlaXZlcjogYnl0ZXMsIGFtb3VudDogdWludDY0KSAtPiB1aW50NjQ6CmNhblJlY2VpdmVBbGdvOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMjkKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiBjYW5SZWNlaXZlQWxnbyhyZWNlaXZlcjogQWNjb3VudCwgYW1vdW50OiB1aW50NjQpOiBib29sZWFuIHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMzAKICAgIC8vIGNvbnN0IFssIGZ1bmRlZF0gPSBvcC5BY2N0UGFyYW1zLmFjY3RCYWxhbmNlKHJlY2VpdmVyKQogICAgZnJhbWVfZGlnIC0yCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdEJhbGFuY2UKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMzEKICAgIC8vIHJldHVybiBmdW5kZWQgfHwgYW1vdW50ID49IEdsb2JhbC5taW5CYWxhbmNlCiAgICBibnogY2FuUmVjZWl2ZUFsZ29fYm9vbF90cnVlQDIKICAgIGZyYW1lX2RpZyAtMQogICAgZ2xvYmFsIE1pbkJhbGFuY2UKICAgID49CiAgICBieiBjYW5SZWNlaXZlQWxnb19ib29sX2ZhbHNlQDMKCmNhblJlY2VpdmVBbGdvX2Jvb2xfdHJ1ZUAyOgogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTMxCiAgICAvLyByZXR1cm4gZnVuZGVkIHx8IGFtb3VudCA+PSBHbG9iYWwubWluQmFsYW5jZQogICAgcmV0c3ViCgpjYW5SZWNlaXZlQWxnb19ib29sX2ZhbHNlQDM6CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMzEKICAgIC8vIHJldHVybiBmdW5kZWQgfHwgYW1vdW50ID49IEdsb2JhbC5taW5CYWxhbmNlCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjpIeXBlclN3YXAuY3JlYXRlW3JvdXRpbmddKCkgLT4gdm9pZDoKY3JlYXRlOgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyMTkKICAgIC8vIEBhYmltZXRob2QoeyBvbkNyZWF0ZTogJ3JlcXVpcmUnIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNAogICAgLy8gdmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5VmVyc2lvbiB9KQogICAgYnl0ZWMgMjIgLy8gInZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjIyMQogICAgLy8gdGhpcy52ZXJzaW9uLnZhbHVlID0gdmVyc2lvbgogICAgdW5jb3ZlciAyCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMyAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyMjIKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUgPSBha2l0YURBTwogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjEKICAgIC8vIG9mZmVyQ3Vyc29yID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogSHlwZXJTd2FwR2xvYmFsU3RhdGVLZXlPZmZlckN1cnNvciB9KQogICAgYnl0ZWMgMTMgLy8gIm9mZmVyX2N1cnNvciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjIzCiAgICAvLyB0aGlzLm9mZmVyQ3Vyc29yLnZhbHVlID0gMAogICAgaW50Y18wIC8vIDAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjIxOQogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjpIeXBlclN3YXAub2ZmZXJbcm91dGluZ10oKSAtPiB2b2lkOgpvZmZlcjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjM3LTI0NAogICAgLy8gb2ZmZXIoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgcm9vdDogYnl0ZXM8MzI+LAogICAgLy8gICBsZWF2ZXM6IHVpbnQ2NCwKICAgIC8vICAgcGFydGljaXBhbnRzUm9vdDogYnl0ZXM8MzI+LAogICAgLy8gICBwYXJ0aWNpcGFudHNMZWF2ZXM6IHVpbnQ2NCwKICAgIC8vICAgZXhwaXJhdGlvbjogdWludDY0CiAgICAvLyApIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDMKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgY292ZXIgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciA0CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA1CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI0NQogICAgLy8gbG9nZ2VkQXNzZXJ0KHJvb3QgIT09IHBhcnRpY2lwYW50c1Jvb3QsIGVyckJhZFJvb3RzKQogICAgIT0KICAgIGJueiBvZmZlcl9hZnRlcl9hc3NlcnRAMwogICAgcHVzaGJ5dGVzICJFUlI6ZXJyQnJvdCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJCcm90CgpvZmZlcl9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjQ2CiAgICAvLyBsb2dnZWRBc3NlcnQoZXhwaXJhdGlvbiA+IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsIGVyck9mZmVyRXhwaXJlZCkKICAgIGR1cAogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgPgogICAgYm56IG9mZmVyX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyA4IC8vICJFUlI6ZXJyT2ZleCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJPZmV4CgpvZmZlcl9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjQ4CiAgICAvLyBsb2dnZWRBc3NlcnQoZXhwaXJhdGlvbiAtIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPD0gTWF4T2ZmZXJEdXJhdGlvbiwgZXJyT2ZmZXJUb29Mb25nKQogICAgZHVwCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICAtCiAgICBwdXNoaW50IDI1OTIwMDAKICAgIDw9CiAgICBibnogb2ZmZXJfYWZ0ZXJfYXNzZXJ0QDcKICAgIHB1c2hieXRlcyAiRVJSOmVyck90bGciCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyT3RsZwoKb2ZmZXJfYWZ0ZXJfYXNzZXJ0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI1MwogICAgLy8gY29uc3QgcGF5b3IgPSBwYXltZW50LnNlbmRlcgogICAgZGlnIDIKICAgIGR1cAogICAgZ3R4bnMgU2VuZGVyCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI1NQogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBlcnJJbnZhbGlkUGF5bWVudCkKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBvZmZlcl9hZnRlcl9hc3NlcnRAOQogICAgYnl0ZWMgNCAvLyAiRVJSOmVycklwYXkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBheQoKb2ZmZXJfYWZ0ZXJfYXNzZXJ0QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI1NgogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSBoeXBlclN3YXBPZmZlck1CUkFtb3VudCwgZXJySW52YWxpZFBheW1lbnQpCiAgICB1bmNvdmVyIDMKICAgIGd0eG5zIEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyNTIKICAgIC8vIGNvbnN0IGh5cGVyU3dhcE9mZmVyTUJSQW1vdW50OiB1aW50NjQgPSBjb3N0cy5vZmZlcnMgKyBjb3N0cy5wYXJ0aWNpcGFudHMgKyAobWV0YU1lcmtsZXNDb3N0ICogMikKICAgIHB1c2hpbnQgMTg1MDAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI1NgogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSBoeXBlclN3YXBPZmZlck1CUkFtb3VudCwgZXJySW52YWxpZFBheW1lbnQpCiAgICA9PQogICAgYm56IG9mZmVyX2FmdGVyX2Fzc2VydEAxMQogICAgYnl0ZWMgNCAvLyAiRVJSOmVycklwYXkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBheQoKb2ZmZXJfYWZ0ZXJfYXNzZXJ0QDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo4OQogICAgLy8gY29uc3QgaWQgPSB0aGlzLm9mZmVyQ3Vyc29yLnZhbHVlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2MQogICAgLy8gb2ZmZXJDdXJzb3IgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBIeXBlclN3YXBHbG9iYWxTdGF0ZUtleU9mZmVyQ3Vyc29yIH0pCiAgICBieXRlYyAxMyAvLyAib2ZmZXJfY3Vyc29yIgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo4OQogICAgLy8gY29uc3QgaWQgPSB0aGlzLm9mZmVyQ3Vyc29yLnZhbHVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo5MAogICAgLy8gdGhpcy5vZmZlckN1cnNvci52YWx1ZSArPSAxCiAgICBkdXAKICAgIGludGNfMSAvLyAxCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjYxCiAgICAvLyBvZmZlckN1cnNvciA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEh5cGVyU3dhcEdsb2JhbFN0YXRlS2V5T2ZmZXJDdXJzb3IgfSkKICAgIGJ5dGVjIDEzIC8vICJvZmZlcl9jdXJzb3IiCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjkwCiAgICAvLyB0aGlzLm9mZmVyQ3Vyc29yLnZhbHVlICs9IDEKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI1OQogICAgLy8gY29uc3QgbWV0YU1lcmtsZXNBcHBJRCA9IGdldEFraXRhQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5tZXRhTWVya2xlcwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzMgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjU5CiAgICAvLyBjb25zdCBtZXRhTWVya2xlc0FwcElEID0gZ2V0QWtpdGFBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLm1ldGFNZXJrbGVzCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMDYKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0KSkKICAgIHB1c2hieXRlcyAiYWFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyNTkKICAgIC8vIGNvbnN0IG1ldGFNZXJrbGVzQXBwSUQgPSBnZXRBa2l0YUFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkubWV0YU1lcmtsZXMKICAgIHB1c2hpbnQgNzIKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI2MAogICAgLy8gdGhpcy5vZmZlclJlZ2lzdHJ5KGlkKS52YWx1ZSA9IG1ldGFNZXJrbGVzQXBwSUQKICAgIHN3YXAKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NzkKICAgIC8vIG9mZmVyUmVnaXN0cnkgPSBCb3hNYXA8dWludDY0LCB1aW50NjQ+KHsga2V5UHJlZml4OiBIeXBlclN3YXBCb3hQcmVmaXhPZmZlclJlZ2lzdHJ5IH0pCiAgICBieXRlYyAxNCAvLyAiciIKICAgIGRpZyAxCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjYwCiAgICAvLyB0aGlzLm9mZmVyUmVnaXN0cnkoaWQpLnZhbHVlID0gbWV0YU1lcmtsZXNBcHBJRAogICAgZGlnIDIKICAgIGl0b2IKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjYyLTI3MwogICAgLy8gYWJpQ2FsbDx0eXBlb2YgTWV0YS5wcm90b3R5cGUuYWRkUm9vdD4oewogICAgLy8gICBhcHBJZDogbWV0YU1lcmtsZXNBcHBJRCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24obWV0YU1lcmtsZXNBcHBJRCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWV0YU1lcmtsZXNDb3N0LAogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHRoaXMucm9vdE5hbWUoaWQsIGZhbHNlKSwKICAgIC8vICAgICByb290LAogICAgLy8gICAgIE1lcmtsZVRyZWVUeXBlVHJhZGUKICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI2NgogICAgLy8gcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKG1ldGFNZXJrbGVzQXBwSUQpLmFkZHJlc3MsCiAgICBkaWcgMQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyNTEKICAgIC8vIGNvbnN0IG1ldGFNZXJrbGVzQ29zdDogdWludDY0ID0gY29zdHMubW0ucm9vdCArIGNvc3RzLm1tLmRhdGEKICAgIGludGMgNSAvLyAzNTMwMAogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjY1LTI2OAogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKG1ldGFNZXJrbGVzQXBwSUQpLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogbWV0YU1lcmtsZXNDb3N0LAogICAgLy8gfSksCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI2Mi0yNzMKICAgIC8vIGFiaUNhbGw8dHlwZW9mIE1ldGEucHJvdG90eXBlLmFkZFJvb3Q+KHsKICAgIC8vICAgYXBwSWQ6IG1ldGFNZXJrbGVzQXBwSUQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKG1ldGFNZXJrbGVzQXBwSUQpLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ldGFNZXJrbGVzQ29zdCwKICAgIC8vICAgICB9KSwKICAgIC8vICAgICB0aGlzLnJvb3ROYW1lKGlkLCBmYWxzZSksCiAgICAvLyAgICAgcm9vdCwKICAgIC8vICAgICBNZXJrbGVUcmVlVHlwZVRyYWRlCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjg1CiAgICAvLyByZXR1cm4gU3RyaW5nKChwYXJ0aWNpcGFudHMgPyBCeXRlcygncCcpIDogQnl0ZXMoJ3QnKSkuY29uY2F0KGl0b2IoaWQpKSkKICAgIGJ5dGVjIDE1IC8vICJ0IgogICAgZGlnIDEKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyNjkKICAgIC8vIHRoaXMucm9vdE5hbWUoaWQsIGZhbHNlKSwKICAgIGR1cAogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI3MQogICAgLy8gTWVya2xlVHJlZVR5cGVUcmFkZQogICAgcHVzaGludCAzCiAgICBpdG9iCiAgICBkaWcgMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI2Mi0yNzMKICAgIC8vIGFiaUNhbGw8dHlwZW9mIE1ldGEucHJvdG90eXBlLmFkZFJvb3Q+KHsKICAgIC8vICAgYXBwSWQ6IG1ldGFNZXJrbGVzQXBwSUQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKG1ldGFNZXJrbGVzQXBwSUQpLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ldGFNZXJrbGVzQ29zdCwKICAgIC8vICAgICB9KSwKICAgIC8vICAgICB0aGlzLnJvb3ROYW1lKGlkLCBmYWxzZSksCiAgICAvLyAgICAgcm9vdCwKICAgIC8vICAgICBNZXJrbGVUcmVlVHlwZVRyYWRlCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgYnl0ZWMgMjMgLy8gbWV0aG9kICJhZGRSb290KHBheSxzdHJpbmcsYnl0ZVszMl0sdWludDY0KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgNwogICAgZHVwCiAgICBjb3ZlciA0CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZHVwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Mjc2LTI4NwogICAgLy8gYWJpQ2FsbDx0eXBlb2YgTWV0YS5wcm90b3R5cGUuYWRkUm9vdD4oewogICAgLy8gICBhcHBJZDogbWV0YU1lcmtsZXNBcHBJRCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24obWV0YU1lcmtsZXNBcHBJRCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWV0YU1lcmtsZXNDb3N0LAogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHRoaXMucm9vdE5hbWUoaWQsIHRydWUpLAogICAgLy8gICAgIHBhcnRpY2lwYW50c1Jvb3QsCiAgICAvLyAgICAgTWVya2xlVHJlZVR5cGVUcmFkZQogICAgLy8gICBdLAogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjgwCiAgICAvLyByZWNlaXZlcjogQXBwbGljYXRpb24obWV0YU1lcmtsZXNBcHBJRCkuYWRkcmVzcywKICAgIGRpZyAyCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI1MQogICAgLy8gY29uc3QgbWV0YU1lcmtsZXNDb3N0OiB1aW50NjQgPSBjb3N0cy5tbS5yb290ICsgY29zdHMubW0uZGF0YQogICAgaW50YyA1IC8vIDM1MzAwCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyNzktMjgyCiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogQXBwbGljYXRpb24obWV0YU1lcmtsZXNBcHBJRCkuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiBtZXRhTWVya2xlc0Nvc3QsCiAgICAvLyB9KSwKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Mjc2LTI4NwogICAgLy8gYWJpQ2FsbDx0eXBlb2YgTWV0YS5wcm90b3R5cGUuYWRkUm9vdD4oewogICAgLy8gICBhcHBJZDogbWV0YU1lcmtsZXNBcHBJRCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24obWV0YU1lcmtsZXNBcHBJRCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWV0YU1lcmtsZXNDb3N0LAogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHRoaXMucm9vdE5hbWUoaWQsIHRydWUpLAogICAgLy8gICAgIHBhcnRpY2lwYW50c1Jvb3QsCiAgICAvLyAgICAgTWVya2xlVHJlZVR5cGVUcmFkZQogICAgLy8gICBdLAogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo4NQogICAgLy8gcmV0dXJuIFN0cmluZygocGFydGljaXBhbnRzID8gQnl0ZXMoJ3AnKSA6IEJ5dGVzKCd0JykpLmNvbmNhdChpdG9iKGlkKSkpCiAgICBieXRlY18xIC8vICJwIgogICAgZGlnIDIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyODMKICAgIC8vIHRoaXMucm9vdE5hbWUoaWQsIHRydWUpLAogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHVuY292ZXIgMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI3Ni0yODcKICAgIC8vIGFiaUNhbGw8dHlwZW9mIE1ldGEucHJvdG90eXBlLmFkZFJvb3Q+KHsKICAgIC8vICAgYXBwSWQ6IG1ldGFNZXJrbGVzQXBwSUQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKG1ldGFNZXJrbGVzQXBwSUQpLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ldGFNZXJrbGVzQ29zdCwKICAgIC8vICAgICB9KSwKICAgIC8vICAgICB0aGlzLnJvb3ROYW1lKGlkLCB0cnVlKSwKICAgIC8vICAgICBwYXJ0aWNpcGFudHNSb290LAogICAgLy8gICAgIE1lcmtsZVRyZWVUeXBlVHJhZGUKICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBieXRlYyAyMyAvLyBtZXRob2QgImFkZFJvb3QocGF5LHN0cmluZyxieXRlWzMyXSx1aW50NjQpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciA1CiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjUyCiAgICAvLyBjb25zdCBoeXBlclN3YXBPZmZlck1CUkFtb3VudDogdWludDY0ID0gY29zdHMub2ZmZXJzICsgY29zdHMucGFydGljaXBhbnRzICsgKG1ldGFNZXJrbGVzQ29zdCAqIDIpCiAgICBpbnRjIDQgLy8gMzQ5MDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjkwCiAgICAvLyB0aGlzLnBhcnRpY2lwYW50cyh7IGlkLCBhZGRyZXNzOiBUeG4uc2VuZGVyIH0pLnZhbHVlID0geyBwYXlvciwgYW1vdW50OiBjb3N0cy5wYXJ0aWNpcGFudHMgfQogICAgaXRvYgogICAgdW5jb3ZlciA0CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGNvbmNhdAogICAgZGlnIDIKICAgIHR4biBTZW5kZXIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2OAogICAgLy8gcGFydGljaXBhbnRzID0gQm94TWFwPFBhcnRpY2lwYW50S2V5LCBSZWZ1bmRWYWx1ZT4oeyBrZXlQcmVmaXg6IEh5cGVyU3dhcEJveFByZWZpeFBhcnRpY2lwYW50cyB9KQogICAgYnl0ZWNfMSAvLyAicCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyOTAKICAgIC8vIHRoaXMucGFydGljaXBhbnRzKHsgaWQsIGFkZHJlc3M6IFR4bi5zZW5kZXIgfSkudmFsdWUgPSB7IHBheW9yLCBhbW91bnQ6IGNvc3RzLnBhcnRpY2lwYW50cyB9CiAgICBzd2FwCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI5MQogICAgLy8gdGhpcy5vZmZlclJlZnVuZHMoaWQpLnZhbHVlID0geyBwYXlvciwgYW1vdW50OiBjb3N0cy5vZmZlcnMgKyAobWV0YU1lcmtsZXNDb3N0ICogMikgfQogICAgcHVzaGludCAxNTAxMDAKICAgIGl0b2IKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo3MwogICAgLy8gb2ZmZXJSZWZ1bmRzID0gQm94TWFwPHVpbnQ2NCwgUmVmdW5kVmFsdWU+KHsga2V5UHJlZml4OiBIeXBlclN3YXBCb3hQcmVmaXhPZmZlclJlZnVuZHMgfSkKICAgIHB1c2hieXRlcyAiZiIKICAgIGRpZyAyCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjkxCiAgICAvLyB0aGlzLm9mZmVyUmVmdW5kcyhpZCkudmFsdWUgPSB7IHBheW9yLCBhbW91bnQ6IGNvc3RzLm9mZmVycyArIChtZXRhTWVya2xlc0Nvc3QgKiAyKSB9CiAgICBzd2FwCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI5NQogICAgLy8gc3RhdGU6IHBhcnRpY2lwYW50c0xlYXZlcyA9PT0gMSA/IFNUQVRFX0VTQ1JPV0lORyA6IFNUQVRFX09GRkVSRUQsCiAgICB1bmNvdmVyIDQKICAgIGR1cAogICAgaW50Y18xIC8vIDEKICAgID09CiAgICBieXRlYyA3IC8vIDB4MGEKICAgIGJ5dGVjIDYgLy8gMHgxNAogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Mjk0LTMwMwogICAgLy8gdGhpcy5vZmZlcnMoaWQpLnZhbHVlID0gewogICAgLy8gICBzdGF0ZTogcGFydGljaXBhbnRzTGVhdmVzID09PSAxID8gU1RBVEVfRVNDUk9XSU5HIDogU1RBVEVfT0ZGRVJFRCwKICAgIC8vICAgcm9vdCwKICAgIC8vICAgbGVhdmVzLAogICAgLy8gICBlc2Nyb3dlZDogMCwKICAgIC8vICAgcGFydGljaXBhbnRzUm9vdCwKICAgIC8vICAgcGFydGljaXBhbnRzTGVhdmVzLAogICAgLy8gICBhY2NlcHRhbmNlczogMSwKICAgIC8vICAgZXhwaXJhdGlvbiwKICAgIC8vIH0KICAgIHVuY292ZXIgNAogICAgY29uY2F0CiAgICB1bmNvdmVyIDUKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyOTgKICAgIC8vIGVzY3Jvd2VkOiAwLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Mjk0LTMwMwogICAgLy8gdGhpcy5vZmZlcnMoaWQpLnZhbHVlID0gewogICAgLy8gICBzdGF0ZTogcGFydGljaXBhbnRzTGVhdmVzID09PSAxID8gU1RBVEVfRVNDUk9XSU5HIDogU1RBVEVfT0ZGRVJFRCwKICAgIC8vICAgcm9vdCwKICAgIC8vICAgbGVhdmVzLAogICAgLy8gICBlc2Nyb3dlZDogMCwKICAgIC8vICAgcGFydGljaXBhbnRzUm9vdCwKICAgIC8vICAgcGFydGljaXBhbnRzTGVhdmVzLAogICAgLy8gICBhY2NlcHRhbmNlczogMSwKICAgIC8vICAgZXhwaXJhdGlvbiwKICAgIC8vIH0KICAgIGl0b2IKICAgIGNvbmNhdAogICAgdW5jb3ZlciAzCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozMDEKICAgIC8vIGFjY2VwdGFuY2VzOiAxLAogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Mjk0LTMwMwogICAgLy8gdGhpcy5vZmZlcnMoaWQpLnZhbHVlID0gewogICAgLy8gICBzdGF0ZTogcGFydGljaXBhbnRzTGVhdmVzID09PSAxID8gU1RBVEVfRVNDUk9XSU5HIDogU1RBVEVfT0ZGRVJFRCwKICAgIC8vICAgcm9vdCwKICAgIC8vICAgbGVhdmVzLAogICAgLy8gICBlc2Nyb3dlZDogMCwKICAgIC8vICAgcGFydGljaXBhbnRzUm9vdCwKICAgIC8vICAgcGFydGljaXBhbnRzTGVhdmVzLAogICAgLy8gICBhY2NlcHRhbmNlczogMSwKICAgIC8vICAgZXhwaXJhdGlvbiwKICAgIC8vIH0KICAgIGl0b2IKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjYKICAgIC8vIG9mZmVycyA9IEJveE1hcDx1aW50NjQsIE9mZmVyVmFsdWU+KHsga2V5UHJlZml4OiBIeXBlclN3YXBCb3hQcmVmaXhPZmZlcnMgfSkKICAgIGJ5dGVjXzAgLy8gIm8iCiAgICB1bmNvdmVyIDIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyOTQtMzAzCiAgICAvLyB0aGlzLm9mZmVycyhpZCkudmFsdWUgPSB7CiAgICAvLyAgIHN0YXRlOiBwYXJ0aWNpcGFudHNMZWF2ZXMgPT09IDEgPyBTVEFURV9FU0NST1dJTkcgOiBTVEFURV9PRkZFUkVELAogICAgLy8gICByb290LAogICAgLy8gICBsZWF2ZXMsCiAgICAvLyAgIGVzY3Jvd2VkOiAwLAogICAgLy8gICBwYXJ0aWNpcGFudHNSb290LAogICAgLy8gICBwYXJ0aWNpcGFudHNMZWF2ZXMsCiAgICAvLyAgIGFjY2VwdGFuY2VzOiAxLAogICAgLy8gICBleHBpcmF0aW9uLAogICAgLy8gfQogICAgc3dhcAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyMzctMjQ0CiAgICAvLyBvZmZlcigKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICByb290OiBieXRlczwzMj4sCiAgICAvLyAgIGxlYXZlczogdWludDY0LAogICAgLy8gICBwYXJ0aWNpcGFudHNSb290OiBieXRlczwzMj4sCiAgICAvLyAgIHBhcnRpY2lwYW50c0xlYXZlczogdWludDY0LAogICAgLy8gICBleHBpcmF0aW9uOiB1aW50NjQKICAgIC8vICkgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Okh5cGVyU3dhcC5hY2NlcHRbcm91dGluZ10oKSAtPiB2b2lkOgphY2NlcHQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjMxNAogICAgLy8gYWNjZXB0KG1iclBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgaWQ6IHVpbnQ2NCwgcHJvb2Y6IFByb29mLCB0ZXJtczogYnl0ZXM8MzI+KSB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBjb3ZlciA0CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMzIKICAgICoKICAgIHB1c2hpbnQgMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8Ynl0ZXNbMzJdPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBjb3ZlciAzCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjMxNgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMub2ZmZXJzKGlkKS5leGlzdHMsIGVyck9mZmVyTm90Rm91bmQpCiAgICBpdG9iCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjYKICAgIC8vIG9mZmVycyA9IEJveE1hcDx1aW50NjQsIE9mZmVyVmFsdWU+KHsga2V5UHJlZml4OiBIeXBlclN3YXBCb3hQcmVmaXhPZmZlcnMgfSkKICAgIGJ5dGVjXzAgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgY292ZXIgNgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozMTYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLm9mZmVycyhpZCkuZXhpc3RzLCBlcnJPZmZlck5vdEZvdW5kKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogYWNjZXB0X2FmdGVyX2Fzc2VydEAzCiAgICBieXRlY18yIC8vICJFUlI6ZXJyTm9mciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOb2ZyCgphY2NlcHRfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjMxOAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRlcm1zID09PSB0aGlzLnRlcm1zKGlkKSwgZXJyVGVybXNNaXNtYXRjaCkKICAgIGRpZyAxCiAgICBjYWxsc3ViIHRlcm1zCiAgICB1bmNvdmVyIDMKICAgID09CiAgICBibnogYWNjZXB0X2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJUbWlzIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclRtaXMKCmFjY2VwdF9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzE5CiAgICAvLyBjb25zdCB7IHN0YXRlLCBleHBpcmF0aW9uLCBhY2NlcHRhbmNlcywgcGFydGljaXBhbnRzTGVhdmVzIH0gPSB0aGlzLm9mZmVycyhpZCkudmFsdWUKICAgIGRpZyA0CiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZHVwCiAgICBleHRyYWN0IDAgMQogICAgZGlnIDEKICAgIHB1c2hpbnQgOTcKICAgIGV4dHJhY3RfdWludDY0CiAgICBjb3ZlciAzCiAgICBkaWcgMQogICAgcHVzaGludCA4OQogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDIKICAgIHN3YXAKICAgIHB1c2hpbnQgODEKICAgIGV4dHJhY3RfdWludDY0CiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjMyMQogICAgLy8gbG9nZ2VkQXNzZXJ0KHN0YXRlID09PSBTVEFURV9PRkZFUkVELCBlcnJJbnZhbGlkU3RhdGUpCiAgICBieXRlYyA3IC8vIDB4MGEKICAgID09CiAgICBibnogYWNjZXB0X2FmdGVyX2Fzc2VydEA3CiAgICBieXRlYyA1IC8vICJFUlI6ZXJySXN0ZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJc3RlCgphY2NlcHRfYWZ0ZXJfYXNzZXJ0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjMyMgogICAgLy8gbG9nZ2VkQXNzZXJ0KGV4cGlyYXRpb24gPiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLCBlcnJPZmZlckV4cGlyZWQpCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICB1bmNvdmVyIDQKICAgIDwKICAgIGJueiBhY2NlcHRfYWZ0ZXJfYXNzZXJ0QDkKICAgIGJ5dGVjIDggLy8gIkVSUjplcnJPZmV4IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck9mZXgKCmFjY2VwdF9hZnRlcl9hc3NlcnRAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzI0CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy52ZXJpZnlMZWFmKGlkLCB0cnVlLCBzaGEyNTYoc2hhMjU2KFR4bi5zZW5kZXIuYnl0ZXMpKSwgcHJvb2YpLCBlcnJOb3RBUGFydGljaXBhbnQpCiAgICB0eG4gU2VuZGVyCiAgICBzaGEyNTYKICAgIHNoYTI1NgogICAgdW5jb3ZlciA0CiAgICBpbnRjXzEgLy8gMQogICAgdW5jb3ZlciAyCiAgICB1bmNvdmVyIDcKICAgIGNhbGxzdWIgdmVyaWZ5TGVhZgogICAgcG9wCiAgICBibnogYWNjZXB0X2FmdGVyX2Fzc2VydEAxMQogICAgYnl0ZWMgMTYgLy8gIkVSUjplcnJOcHJ0IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5wcnQKCmFjY2VwdF9hZnRlcl9hc3NlcnRAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjMyNwogICAgLy8gY29uc3Qgc2VuZGVyUGFydGljaXBhbnRLZXkgPSB7IGlkLCBhZGRyZXNzOiBUeG4uc2VuZGVyIH0KICAgIHR4biBTZW5kZXIKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjMyOAogICAgLy8gbG9nZ2VkQXNzZXJ0KCF0aGlzLnBhcnRpY2lwYW50cyhzZW5kZXJQYXJ0aWNpcGFudEtleSkuZXhpc3RzLCBlcnJBbHJlYWR5QWNjZXB0ZWQpCiAgICBkdXAKICAgIGV4dHJhY3QgMCA4CiAgICBzd2FwCiAgICBleHRyYWN0IDggMzIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2OAogICAgLy8gcGFydGljaXBhbnRzID0gQm94TWFwPFBhcnRpY2lwYW50S2V5LCBSZWZ1bmRWYWx1ZT4oeyBrZXlQcmVmaXg6IEh5cGVyU3dhcEJveFByZWZpeFBhcnRpY2lwYW50cyB9KQogICAgYnl0ZWNfMSAvLyAicCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjMyOAogICAgLy8gbG9nZ2VkQXNzZXJ0KCF0aGlzLnBhcnRpY2lwYW50cyhzZW5kZXJQYXJ0aWNpcGFudEtleSkuZXhpc3RzLCBlcnJBbHJlYWR5QWNjZXB0ZWQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGFjY2VwdF9hZnRlcl9hc3NlcnRAMTMKICAgIHB1c2hieXRlcyAiRVJSOmVyckVhY2MiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyRWFjYwoKYWNjZXB0X2FmdGVyX2Fzc2VydEAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzMwCiAgICAvLyBjb25zdCBuZXdBY2NlcHRhbmNlczogdWludDY0ID0gYWNjZXB0YW5jZXMgKyAxCiAgICBzd2FwCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgZHVwCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjMzMQogICAgLy8gdGhpcy5vZmZlcnMoaWQpLnZhbHVlLmFjY2VwdGFuY2VzID0gbmV3QWNjZXB0YW5jZXMKICAgIGl0b2IKICAgIGRpZyA1CiAgICBwdXNoaW50IDg5CiAgICB1bmNvdmVyIDIKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjMzNQogICAgLy8gbG9nZ2VkQXNzZXJ0KG1iclBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBlcnJJbnZhbGlkUGF5bWVudCkKICAgIGRpZyAzCiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogYWNjZXB0X2FmdGVyX2Fzc2VydEAxNQogICAgYnl0ZWMgNCAvLyAiRVJSOmVycklwYXkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBheQoKYWNjZXB0X2FmdGVyX2Fzc2VydEAxNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzM2CiAgICAvLyBsb2dnZWRBc3NlcnQobWJyUGF5bWVudC5hbW91bnQgPT09IGNvc3RzLnBhcnRpY2lwYW50cywgZXJySW52YWxpZFBheW1lbnQpCiAgICBkaWcgMwogICAgZ3R4bnMgQW1vdW50CiAgICBpbnRjIDQgLy8gMzQ5MDAKICAgID09CiAgICBibnogYWNjZXB0X2FmdGVyX2Fzc2VydEAxNwogICAgYnl0ZWMgNCAvLyAiRVJSOmVycklwYXkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBheQoKYWNjZXB0X2FmdGVyX2Fzc2VydEAxNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzQwCiAgICAvLyBwYXlvcjogbWJyUGF5bWVudC5zZW5kZXIsCiAgICB1bmNvdmVyIDMKICAgIGd0eG5zIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozMzYKICAgIC8vIGxvZ2dlZEFzc2VydChtYnJQYXltZW50LmFtb3VudCA9PT0gY29zdHMucGFydGljaXBhbnRzLCBlcnJJbnZhbGlkUGF5bWVudCkKICAgIGludGMgNCAvLyAzNDkwMAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozMzktMzQyCiAgICAvLyB0aGlzLnBhcnRpY2lwYW50cyhzZW5kZXJQYXJ0aWNpcGFudEtleSkudmFsdWUgPSB7CiAgICAvLyAgIHBheW9yOiBtYnJQYXltZW50LnNlbmRlciwKICAgIC8vICAgYW1vdW50OiBjb3N0cy5wYXJ0aWNpcGFudHMKICAgIC8vIH0KICAgIGl0b2IKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozNDQKICAgIC8vIGlmIChwYXJ0aWNpcGFudHNMZWF2ZXMgPT09IG5ld0FjY2VwdGFuY2VzKSB7CiAgICA9PQogICAgYnogYWNjZXB0X2FmdGVyX2lmX2Vsc2VAMTkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzQ1CiAgICAvLyB0aGlzLm9mZmVycyhpZCkudmFsdWUuc3RhdGUgPSBTVEFURV9FU0NST1dJTkcKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGJ5dGVjIDYgLy8gMHgxNAogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKCmFjY2VwdF9hZnRlcl9pZl9lbHNlQDE5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozMTQKICAgIC8vIGFjY2VwdChtYnJQYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGlkOiB1aW50NjQsIHByb29mOiBQcm9vZiwgdGVybXM6IGJ5dGVzPDMyPikgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Okh5cGVyU3dhcC5lc2Nyb3dbcm91dGluZ10oKSAtPiB2b2lkOgplc2Nyb3c6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjM1OAogICAgLy8gZXNjcm93KHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgaWQ6IHVpbnQ2NCwgcmVjZWl2ZXI6IEFjY291bnQsIGFtb3VudDogdWludDY0LCBwcm9vZjogUHJvb2YpIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICBjb3ZlciAyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgY292ZXIgNAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDMyCiAgICAqCiAgICBwdXNoaW50IDIKICAgICsKICAgIHN3YXAKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGJ5dGVzWzMyXT4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzYwCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5vZmZlcnMoaWQpLmV4aXN0cywgZXJyT2ZmZXJOb3RGb3VuZCkKICAgIGl0b2IKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2NgogICAgLy8gb2ZmZXJzID0gQm94TWFwPHVpbnQ2NCwgT2ZmZXJWYWx1ZT4oeyBrZXlQcmVmaXg6IEh5cGVyU3dhcEJveFByZWZpeE9mZmVycyB9KQogICAgYnl0ZWNfMCAvLyAibyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBjb3ZlciA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjM2MAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMub2ZmZXJzKGlkKS5leGlzdHMsIGVyck9mZmVyTm90Rm91bmQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBlc2Nyb3dfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjXzIgLy8gIkVSUjplcnJOb2ZyIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5vZnIKCmVzY3Jvd19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzYxCiAgICAvLyBjb25zdCB7IHN0YXRlLCBlc2Nyb3dlZCwgbGVhdmVzLCBleHBpcmF0aW9uIH0gPSB0aGlzLm9mZmVycyhpZCkudmFsdWUKICAgIGRpZyA2CiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZHVwCiAgICBleHRyYWN0IDAgMQogICAgZGlnIDEKICAgIHB1c2hpbnQgNDEKICAgIGV4dHJhY3RfdWludDY0CiAgICBjb3ZlciA1CiAgICBkaWcgMQogICAgcHVzaGludCAzMwogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDgKICAgIHN3YXAKICAgIHB1c2hpbnQgOTcKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjM2MwogICAgLy8gbG9nZ2VkQXNzZXJ0KHN0YXRlID09PSBTVEFURV9FU0NST1dJTkcsIGVyckludmFsaWRTdGF0ZSkKICAgIGJ5dGVjIDYgLy8gMHgxNAogICAgPT0KICAgIGJueiBlc2Nyb3dfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjIDUgLy8gIkVSUjplcnJJc3RlIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklzdGUKCmVzY3Jvd19hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzY1CiAgICAvLyBsb2dnZWRBc3NlcnQoZXhwaXJhdGlvbiA+IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsIGVyck9mZmVyRXhwaXJlZCkKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgID4KICAgIGJueiBlc2Nyb3dfYWZ0ZXJfYXNzZXJ0QDcKICAgIGJ5dGVjIDggLy8gIkVSUjplcnJPZmV4IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck9mZXgKCmVzY3Jvd19hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzY3CiAgICAvLyBjb25zdCBzZW5kZXJQYXJ0aWNpcGFudEtleSA9IHsgaWQsIGFkZHJlc3M6IFR4bi5zZW5kZXIgfQogICAgZHVwCiAgICB0eG4gU2VuZGVyCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzY4CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5wYXJ0aWNpcGFudHMoc2VuZGVyUGFydGljaXBhbnRLZXkpLmV4aXN0cywgZXJyTm90QVBhcnRpY2lwYW50KQogICAgZHVwCiAgICBleHRyYWN0IDAgOAogICAgc3dhcAogICAgZXh0cmFjdCA4IDMyCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjgKICAgIC8vIHBhcnRpY2lwYW50cyA9IEJveE1hcDxQYXJ0aWNpcGFudEtleSwgUmVmdW5kVmFsdWU+KHsga2V5UHJlZml4OiBIeXBlclN3YXBCb3hQcmVmaXhQYXJ0aWNpcGFudHMgfSkKICAgIGJ5dGVjXzEgLy8gInAiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzY4CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5wYXJ0aWNpcGFudHMoc2VuZGVyUGFydGljaXBhbnRLZXkpLmV4aXN0cywgZXJyTm90QVBhcnRpY2lwYW50KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogZXNjcm93X2FmdGVyX2Fzc2VydEA5CiAgICBieXRlYyAxNiAvLyAiRVJSOmVyck5wcnQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTnBydAoKZXNjcm93X2FmdGVyX2Fzc2VydEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozNzAKICAgIC8vIGNvbnN0IGhhc2ggPSBzaGEyNTYoc2hhMjU2KEJ5dGVzYCR7VHhuLnNlbmRlci5ieXRlc30ke3JlY2VpdmVyLmJ5dGVzfSR7aXRvYigwKX0ke2l0b2IoYW1vdW50KX1gKSkKICAgIHR4biBTZW5kZXIKICAgIHVuY292ZXIgNgogICAgY29uY2F0CiAgICBpbnRjXzAgLy8gMAogICAgaXRvYgogICAgY29uY2F0CiAgICBkaWcgMwogICAgaXRvYgogICAgY29uY2F0CiAgICBzaGEyNTYKICAgIHNoYTI1NgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjM3MQogICAgLy8gY29uc3QgaGFzaEtleTogSGFzaEtleSA9IHsgaWQsIGhhc2ggfQogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NzAKICAgIC8vIGhhc2hlcyA9IEJveE1hcDxIYXNoS2V5LCBSZWZ1bmRWYWx1ZT4oeyBrZXlQcmVmaXg6IEh5cGVyU3dhcEJveFByZWZpeEhhc2hlcyB9KQogICAgYnl0ZWMgOSAvLyAiaCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjM3MgogICAgLy8gbG9nZ2VkQXNzZXJ0KCF0aGlzLmhhc2hlcyhoYXNoS2V5KS5leGlzdHMsIGVyckxlYWZBbHJlYWR5RXNjcm93ZWQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGVzY3Jvd19hZnRlcl9hc3NlcnRAMTEKICAgIGJ5dGVjIDI0IC8vICJFUlI6ZXJyTGFlcyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJMYWVzCgplc2Nyb3dfYWZ0ZXJfYXNzZXJ0QDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozNzQKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnZlcmlmeUxlYWYoaWQsIGZhbHNlLCBoYXNoLCBwcm9vZiksIGVyckNhbnRWZXJpZnlMZWFmKQogICAgdW5jb3ZlciA3CiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDcKICAgIGNhbGxzdWIgdmVyaWZ5TGVhZgogICAgcG9wCiAgICBibnogZXNjcm93X2FmdGVyX2Fzc2VydEAxMwogICAgYnl0ZWMgMjUgLy8gIkVSUjplcnJDdmxmIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckN2bGYKCmVzY3Jvd19hZnRlcl9hc3NlcnRAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY4CiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLmNsb3NlUmVtYWluZGVyVG8gPT09IEdsb2JhbC56ZXJvQWRkcmVzcywgZXJyQ2xvc2VGb3JiaWRkZW4pCiAgICBkaWcgMQogICAgZ3R4bnMgQ2xvc2VSZW1haW5kZXJUbwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYm56IGVzY3Jvd19hZnRlcl9hc3NlcnRAMjIKICAgIGJ5dGVjIDI2IC8vICJFUlI6ZXJyTmNscyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOY2xzCgplc2Nyb3dfYWZ0ZXJfYXNzZXJ0QDIyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2OQogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5yZWtleVRvID09PSBHbG9iYWwuemVyb0FkZHJlc3MsIGVyclJla2V5Rm9yYmlkZGVuKQogICAgZGlnIDEKICAgIGd0eG5zIFJla2V5VG8KICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIGJueiBlc2Nyb3dfYWZ0ZXJfYXNzZXJ0QDI0CiAgICBieXRlYyAyNyAvLyAiRVJSOmVyck5ya3kiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTnJreQoKZXNjcm93X2FmdGVyX2Fzc2VydEAyNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzgxCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRQYXltZW50KQogICAgZGlnIDEKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBlc2Nyb3dfYWZ0ZXJfYXNzZXJ0QDE1CiAgICBieXRlYyA0IC8vICJFUlI6ZXJySXBheSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcGF5Cgplc2Nyb3dfYWZ0ZXJfYXNzZXJ0QDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozODIKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LmFtb3VudCA9PT0gYW1vdW50ICsgY29zdHMuaGFzaGVzLCBlcnJJbnZhbGlkUGF5bWVudCkKICAgIGRpZyAxCiAgICBndHhucyBBbW91bnQKICAgIHVuY292ZXIgMwogICAgaW50YyA0IC8vIDM0OTAwCiAgICArCiAgICA9PQogICAgYm56IGVzY3Jvd19hZnRlcl9hc3NlcnRAMTcKICAgIGJ5dGVjIDQgLy8gIkVSUjplcnJJcGF5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwYXkKCmVzY3Jvd19hZnRlcl9hc3NlcnRAMTc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjM4NgogICAgLy8gcGF5b3I6IHBheW1lbnQuc2VuZGVyLAogICAgc3dhcAogICAgZ3R4bnMgU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjM4MgogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSBhbW91bnQgKyBjb3N0cy5oYXNoZXMsIGVyckludmFsaWRQYXltZW50KQogICAgaW50YyA0IC8vIDM0OTAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjM4NS0zODgKICAgIC8vIHRoaXMuaGFzaGVzKGhhc2hLZXkpLnZhbHVlID0gewogICAgLy8gICBwYXlvcjogcGF5bWVudC5zZW5kZXIsCiAgICAvLyAgIGFtb3VudDogY29zdHMuaGFzaGVzCiAgICAvLyB9CiAgICBpdG9iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzkwCiAgICAvLyBjb25zdCBuZXdFc2Nyb3dlZDogdWludDY0ID0gZXNjcm93ZWQgKyAxCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozOTEKICAgIC8vIHRoaXMub2ZmZXJzKGlkKS52YWx1ZS5lc2Nyb3dlZCA9IG5ld0VzY3Jvd2VkCiAgICBkdXAKICAgIGl0b2IKICAgIGRpZyAzCiAgICBwdXNoaW50IDQxCiAgICB1bmNvdmVyIDIKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjM5NAogICAgLy8gaWYgKGxlYXZlcyA9PT0gbmV3RXNjcm93ZWQpIHsKICAgID09CiAgICBieiBlc2Nyb3dfYWZ0ZXJfaWZfZWxzZUAxOQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozOTUKICAgIC8vIHRoaXMub2ZmZXJzKGlkKS52YWx1ZS5zdGF0ZSA9IFNUQVRFX0RJU0JVUlNJTkcKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGJ5dGVjIDEwIC8vIDB4MWUKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCgplc2Nyb3dfYWZ0ZXJfaWZfZWxzZUAxOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzU4CiAgICAvLyBlc2Nyb3cocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBpZDogdWludDY0LCByZWNlaXZlcjogQWNjb3VudCwgYW1vdW50OiB1aW50NjQsIHByb29mOiBQcm9vZikgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Okh5cGVyU3dhcC5lc2Nyb3dBc2Fbcm91dGluZ10oKSAtPiB2b2lkOgplc2Nyb3dBc2E6CiAgICBwdXNoYnl0ZXMgIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDA5LTQxNwogICAgLy8gZXNjcm93QXNhKAogICAgLy8gICBtYnJQYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICBpZDogdWludDY0LAogICAgLy8gICByZWNlaXZlcjogQWNjb3VudCwKICAgIC8vICAgYXNzZXQ6IHVpbnQ2NCwKICAgIC8vICAgYW1vdW50OiB1aW50NjQsCiAgICAvLyAgIHByb29mOiBQcm9vZgogICAgLy8gKSB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgcHVzaGludCAyCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNCAvLyBheGZlcgogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGF4ZmVyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgY292ZXIgMwogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgMwogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgNAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQogICAgZHVwCiAgICBjb3ZlciA1CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMzIKICAgICoKICAgIHB1c2hpbnQgMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8Ynl0ZXNbMzJdPgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0MTkKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLm9mZmVycyhpZCkuZXhpc3RzLCBlcnJPZmZlck5vdEZvdW5kKQogICAgaXRvYgogICAgZHVwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjY2CiAgICAvLyBvZmZlcnMgPSBCb3hNYXA8dWludDY0LCBPZmZlclZhbHVlPih7IGtleVByZWZpeDogSHlwZXJTd2FwQm94UHJlZml4T2ZmZXJzIH0pCiAgICBieXRlY18wIC8vICJvIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGNvdmVyIDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDE5CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5vZmZlcnMoaWQpLmV4aXN0cywgZXJyT2ZmZXJOb3RGb3VuZCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGVzY3Jvd0FzYV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWNfMiAvLyAiRVJSOmVyck5vZnIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTm9mcgoKZXNjcm93QXNhX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0MjAKICAgIC8vIGNvbnN0IHsgc3RhdGUsIGVzY3Jvd2VkLCBsZWF2ZXMsIGV4cGlyYXRpb24gfSA9IHRoaXMub2ZmZXJzKGlkKS52YWx1ZQogICAgZGlnIDgKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBkdXAKICAgIGV4dHJhY3QgMCAxCiAgICBkaWcgMQogICAgcHVzaGludCA0MQogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDkKICAgIGRpZyAxCiAgICBwdXNoaW50IDMzCiAgICBleHRyYWN0X3VpbnQ2NAogICAgY292ZXIgMTAKICAgIHN3YXAKICAgIHB1c2hpbnQgOTcKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQyMgogICAgLy8gbG9nZ2VkQXNzZXJ0KHN0YXRlID09PSBTVEFURV9FU0NST1dJTkcsIGVyckludmFsaWRTdGF0ZSkKICAgIGJ5dGVjIDYgLy8gMHgxNAogICAgPT0KICAgIGJueiBlc2Nyb3dBc2FfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjIDUgLy8gIkVSUjplcnJJc3RlIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklzdGUKCmVzY3Jvd0FzYV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDI0CiAgICAvLyBsb2dnZWRBc3NlcnQoZXhwaXJhdGlvbiA+IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsIGVyck9mZmVyRXhwaXJlZCkKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgID4KICAgIGJueiBlc2Nyb3dBc2FfYWZ0ZXJfYXNzZXJ0QDcKICAgIGJ5dGVjIDggLy8gIkVSUjplcnJPZmV4IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck9mZXgKCmVzY3Jvd0FzYV9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDI2CiAgICAvLyBjb25zdCBzZW5kZXJQYXJ0aWNpcGFudEtleSA9IHsgaWQsIGFkZHJlc3M6IFR4bi5zZW5kZXIgfQogICAgZGlnIDEKICAgIHR4biBTZW5kZXIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0MjcKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnBhcnRpY2lwYW50cyhzZW5kZXJQYXJ0aWNpcGFudEtleSkuZXhpc3RzLCBlcnJOb3RBUGFydGljaXBhbnQpCiAgICBkdXAKICAgIGV4dHJhY3QgMCA4CiAgICBzd2FwCiAgICBleHRyYWN0IDggMzIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2OAogICAgLy8gcGFydGljaXBhbnRzID0gQm94TWFwPFBhcnRpY2lwYW50S2V5LCBSZWZ1bmRWYWx1ZT4oeyBrZXlQcmVmaXg6IEh5cGVyU3dhcEJveFByZWZpeFBhcnRpY2lwYW50cyB9KQogICAgYnl0ZWNfMSAvLyAicCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0MjcKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnBhcnRpY2lwYW50cyhzZW5kZXJQYXJ0aWNpcGFudEtleSkuZXhpc3RzLCBlcnJOb3RBUGFydGljaXBhbnQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBlc2Nyb3dBc2FfYWZ0ZXJfYXNzZXJ0QDkKICAgIGJ5dGVjIDE2IC8vICJFUlI6ZXJyTnBydCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOcHJ0Cgplc2Nyb3dBc2FfYWZ0ZXJfYXNzZXJ0QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQyOQogICAgLy8gY29uc3QgaGFzaCA9IHNoYTI1NihzaGEyNTYoQnl0ZXNgJHtUeG4uc2VuZGVyLmJ5dGVzfSR7cmVjZWl2ZXIuYnl0ZXN9JHtpdG9iKGFzc2V0KX0ke2l0b2IoYW1vdW50KX1gKSkKICAgIHR4biBTZW5kZXIKICAgIGRpZyAzCiAgICBjb25jYXQKICAgIGRpZyA0CiAgICBpdG9iCiAgICBjb25jYXQKICAgIGRpZyA2CiAgICBpdG9iCiAgICBjb25jYXQKICAgIHNoYTI1NgogICAgc2hhMjU2CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDMwCiAgICAvLyBjb25zdCBoYXNoS2V5OiBIYXNoS2V5ID0geyBpZCwgaGFzaCB9CiAgICB1bmNvdmVyIDMKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo3MAogICAgLy8gaGFzaGVzID0gQm94TWFwPEhhc2hLZXksIFJlZnVuZFZhbHVlPih7IGtleVByZWZpeDogSHlwZXJTd2FwQm94UHJlZml4SGFzaGVzIH0pCiAgICBieXRlYyA5IC8vICJoIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDMxCiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMuaGFzaGVzKGhhc2hLZXkpLmV4aXN0cywgZXJyTGVhZkFscmVhZHlFc2Nyb3dlZCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogZXNjcm93QXNhX2FmdGVyX2Fzc2VydEAxMQogICAgYnl0ZWMgMjQgLy8gIkVSUjplcnJMYWVzIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckxhZXMKCmVzY3Jvd0FzYV9hZnRlcl9hc3NlcnRAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQzMwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMudmVyaWZ5TGVhZihpZCwgZmFsc2UsIGhhc2gsIHByb29mKSwgZXJyQ2FudFZlcmlmeUxlYWYpCiAgICB1bmNvdmVyIDEwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciA0CiAgICB1bmNvdmVyIDcKICAgIGNhbGxzdWIgdmVyaWZ5TGVhZgogICAgcG9wCiAgICBibnogZXNjcm93QXNhX2FmdGVyX2Fzc2VydEAxMwogICAgYnl0ZWMgMjUgLy8gIkVSUjplcnJDdmxmIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckN2bGYKCmVzY3Jvd0FzYV9hZnRlcl9hc3NlcnRAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQzNwogICAgLy8gbGV0IG1ickFtb3VudCA9IGNvc3RzLmhhc2hlcwogICAgaW50YyA0IC8vIDM0OTAwCiAgICBidXJ5IDEwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQ0MAogICAgLy8gaWYgKCFyZWNlaXZlci5pc09wdGVkSW4oQXNzZXQoYXNzZXQpKSkgewogICAgdW5jb3ZlciAyCiAgICBkaWcgMwogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJueiBlc2Nyb3dBc2FfYWZ0ZXJfaWZfZWxzZUAxNQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0MzcKICAgIC8vIGxldCBtYnJBbW91bnQgPSBjb3N0cy5oYXNoZXMKICAgIGludGMgNCAvLyAzNDkwMAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0NDEKICAgIC8vIG1ickFtb3VudCArPSBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgKwogICAgYnVyeSA5Cgplc2Nyb3dBc2FfYWZ0ZXJfaWZfZWxzZUAxNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDQ0CiAgICAvLyBsb2dnZWRBc3NlcnQobWJyUGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRQYXltZW50KQogICAgZGlnIDQKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBlc2Nyb3dBc2FfYWZ0ZXJfYXNzZXJ0QDE3CiAgICBieXRlYyA0IC8vICJFUlI6ZXJySXBheSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcGF5Cgplc2Nyb3dBc2FfYWZ0ZXJfYXNzZXJ0QDE3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0NDUKICAgIC8vIGxvZ2dlZEFzc2VydChtYnJQYXltZW50LmFtb3VudCA9PT0gbWJyQW1vdW50LCBlcnJJbnZhbGlkUGF5bWVudCkKICAgIGRpZyA0CiAgICBndHhucyBBbW91bnQKICAgIGRpZyA5CiAgICA9PQogICAgYm56IGVzY3Jvd0FzYV9hZnRlcl9hc3NlcnRAMTkKICAgIGJ5dGVjIDQgLy8gIkVSUjplcnJJcGF5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwYXkKCmVzY3Jvd0FzYV9hZnRlcl9hc3NlcnRAMTk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQ0OAogICAgLy8gYXNzZXJ0U2FmZUFzc2V0VHJhbnNmZXIoYXNzZXRYZmVyLCBUeG4uc2VuZGVyKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNzcKICAgIC8vIGxvZ2dlZEFzc2VydCh0eG4uc2VuZGVyID09PSBzZW5kZXIsIGVyckludmFsaWRQYXltZW50U2VuZGVyKQogICAgZGlnIDEKICAgIGd0eG5zIFNlbmRlcgogICAgPT0KICAgIGJueiBlc2Nyb3dBc2FfYWZ0ZXJfYXNzZXJ0QDMwCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJJcG1zIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwbXMKCmVzY3Jvd0FzYV9hZnRlcl9hc3NlcnRAMzA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE3OAogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5hc3NldFNlbmRlciA9PT0gR2xvYmFsLnplcm9BZGRyZXNzLCBlcnJDbGF3YmFja0ZvcmJpZGRlbikKICAgIGR1cAogICAgZ3R4bnMgQXNzZXRTZW5kZXIKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIGJueiBlc2Nyb3dBc2FfYWZ0ZXJfYXNzZXJ0QDMyCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJOY2x3IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5jbHcKCmVzY3Jvd0FzYV9hZnRlcl9hc3NlcnRAMzI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE3OQogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5hc3NldENsb3NlVG8gPT09IEdsb2JhbC56ZXJvQWRkcmVzcywgZXJyQ2xvc2VGb3JiaWRkZW4pCiAgICBkdXAKICAgIGd0eG5zIEFzc2V0Q2xvc2VUbwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYm56IGVzY3Jvd0FzYV9hZnRlcl9hc3NlcnRAMzQKICAgIGJ5dGVjIDI2IC8vICJFUlI6ZXJyTmNscyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOY2xzCgplc2Nyb3dBc2FfYWZ0ZXJfYXNzZXJ0QDM0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxODAKICAgIC8vIGxvZ2dlZEFzc2VydCh0eG4ucmVrZXlUbyA9PT0gR2xvYmFsLnplcm9BZGRyZXNzLCBlcnJSZWtleUZvcmJpZGRlbikKICAgIGR1cAogICAgZ3R4bnMgUmVrZXlUbwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYm56IGVzY3Jvd0FzYV9hZnRlcl9hc3NlcnRAMzYKICAgIGJ5dGVjIDI3IC8vICJFUlI6ZXJyTnJreSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOcmt5Cgplc2Nyb3dBc2FfYWZ0ZXJfYXNzZXJ0QDM2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0NDkKICAgIC8vIGxvZ2dlZEFzc2VydChhc3NldFhmZXIuYXNzZXRSZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRUcmFuc2ZlcikKICAgIGR1cAogICAgZ3R4bnMgQXNzZXRSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogZXNjcm93QXNhX2FmdGVyX2Fzc2VydEAyMQogICAgYnl0ZWMgMTcgLy8gIkVSUjplcnJJeGZyIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckl4ZnIKCmVzY3Jvd0FzYV9hZnRlcl9hc3NlcnRAMjE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQ1MAogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci54ZmVyQXNzZXQgPT09IEFzc2V0KGFzc2V0KSwgZXJySW52YWxpZFRyYW5zZmVyKQogICAgZHVwCiAgICBndHhucyBYZmVyQXNzZXQKICAgIHVuY292ZXIgMwogICAgPT0KICAgIGJueiBlc2Nyb3dBc2FfYWZ0ZXJfYXNzZXJ0QDIzCiAgICBieXRlYyAxNyAvLyAiRVJSOmVyckl4ZnIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXhmcgoKZXNjcm93QXNhX2FmdGVyX2Fzc2VydEAyMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDUxCiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLmFzc2V0QW1vdW50ID09PSBhbW91bnQsIGVyckludmFsaWRUcmFuc2ZlcikKICAgIGd0eG5zIEFzc2V0QW1vdW50CiAgICB1bmNvdmVyIDIKICAgID09CiAgICBibnogZXNjcm93QXNhX2FmdGVyX2Fzc2VydEAyNQogICAgYnl0ZWMgMTcgLy8gIkVSUjplcnJJeGZyIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckl4ZnIKCmVzY3Jvd0FzYV9hZnRlcl9hc3NlcnRAMjU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQ1NQogICAgLy8gcGF5b3I6IG1iclBheW1lbnQuc2VuZGVyLAogICAgc3dhcAogICAgZ3R4bnMgU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQ1NC00NTcKICAgIC8vIHRoaXMuaGFzaGVzKGhhc2hLZXkpLnZhbHVlID0gewogICAgLy8gICBwYXlvcjogbWJyUGF5bWVudC5zZW5kZXIsCiAgICAvLyAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyB9CiAgICBkaWcgNQogICAgaXRvYgogICAgc3dhcAogICAgY29uY2F0CiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQ1OQogICAgLy8gY29uc3QgbmV3RXNjcm93ZWQ6IHVpbnQ2NCA9IGVzY3Jvd2VkICsgMQogICAgaW50Y18xIC8vIDEKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDYwCiAgICAvLyB0aGlzLm9mZmVycyhpZCkudmFsdWUuZXNjcm93ZWQgPSBuZXdFc2Nyb3dlZAogICAgZHVwCiAgICBpdG9iCiAgICBkaWcgMwogICAgcHVzaGludCA0MQogICAgdW5jb3ZlciAyCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0NjIKICAgIC8vIGlmIChsZWF2ZXMgPT09IG5ld0VzY3Jvd2VkKSB7CiAgICA9PQogICAgYnogZXNjcm93QXNhX2FmdGVyX2lmX2Vsc2VAMjcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDYzCiAgICAvLyB0aGlzLm9mZmVycyhpZCkudmFsdWUuc3RhdGUgPSBTVEFURV9ESVNCVVJTSU5HCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBieXRlYyAxMCAvLyAweDFlCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwoKZXNjcm93QXNhX2FmdGVyX2lmX2Vsc2VAMjc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQwOS00MTcKICAgIC8vIGVzY3Jvd0FzYSgKICAgIC8vICAgbWJyUGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgaWQ6IHVpbnQ2NCwKICAgIC8vICAgcmVjZWl2ZXI6IEFjY291bnQsCiAgICAvLyAgIGFzc2V0OiB1aW50NjQsCiAgICAvLyAgIGFtb3VudDogdWludDY0LAogICAgLy8gICBwcm9vZjogUHJvb2YKICAgIC8vICkgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Okh5cGVyU3dhcC5kaXNidXJzZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmRpc2J1cnNlOgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0NzcKICAgIC8vIGRpc2J1cnNlKGlkOiB1aW50NjQsIHJlY2VpdmVyV2FsbGV0OiB1aW50NjQsIHJlY2VpdmVyOiBBY2NvdW50LCBhc3NldDogdWludDY0LCBhbW91bnQ6IHVpbnQ2NCkgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA1CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQ3OAogICAgLy8gdGhpcy5yZWxlYXNlKGlkLCBUeG4uc2VuZGVyLCByZWNlaXZlcldhbGxldCwgcmVjZWl2ZXIsIGFzc2V0LCBhbW91bnQpCiAgICB0eG4gU2VuZGVyCiAgICB1bmNvdmVyIDUKICAgIHN3YXAKICAgIGNvdmVyIDUKICAgIGNvdmVyIDUKICAgIGNhbGxzdWIgcmVsZWFzZQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0NzcKICAgIC8vIGRpc2J1cnNlKGlkOiB1aW50NjQsIHJlY2VpdmVyV2FsbGV0OiB1aW50NjQsIHJlY2VpdmVyOiBBY2NvdW50LCBhc3NldDogdWludDY0LCBhbW91bnQ6IHVpbnQ2NCkgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Okh5cGVyU3dhcC5kaXNidXJzZUZyb21bcm91dGluZ10oKSAtPiB2b2lkOgpkaXNidXJzZUZyb206CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQ5MgogICAgLy8gZGlzYnVyc2VGcm9tKGlkOiB1aW50NjQsIGZyb206IEFjY291bnQsIHJlY2VpdmVyV2FsbGV0OiB1aW50NjQsIHJlY2VpdmVyOiBBY2NvdW50LCBhc3NldDogdWludDY0LCBhbW91bnQ6IHVpbnQ2NCkgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDUKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDYKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDkzCiAgICAvLyB0aGlzLnJlbGVhc2UoaWQsIGZyb20sIHJlY2VpdmVyV2FsbGV0LCByZWNlaXZlciwgYXNzZXQsIGFtb3VudCkKICAgIGNhbGxzdWIgcmVsZWFzZQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0OTIKICAgIC8vIGRpc2J1cnNlRnJvbShpZDogdWludDY0LCBmcm9tOiBBY2NvdW50LCByZWNlaXZlcldhbGxldDogdWludDY0LCByZWNlaXZlcjogQWNjb3VudCwgYXNzZXQ6IHVpbnQ2NCwgYW1vdW50OiB1aW50NjQpIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjpIeXBlclN3YXAuY2FuY2VsW3JvdXRpbmddKCkgLT4gdm9pZDoKY2FuY2VsOgogICAgaW50Y18wIC8vIDAKICAgIHB1c2hieXRlcyAiIgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjUwNAogICAgLy8gY2FuY2VsKGlkOiB1aW50NjQsIHByb29mOiBQcm9vZikgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDMyCiAgICAqCiAgICBwdXNoaW50IDIKICAgICsKICAgIHN3YXAKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGJ5dGVzWzMyXT4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTA2CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5vZmZlcnMoaWQpLmV4aXN0cywgZXJyT2ZmZXJOb3RGb3VuZCkKICAgIGl0b2IKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2NgogICAgLy8gb2ZmZXJzID0gQm94TWFwPHVpbnQ2NCwgT2ZmZXJWYWx1ZT4oeyBrZXlQcmVmaXg6IEh5cGVyU3dhcEJveFByZWZpeE9mZmVycyB9KQogICAgYnl0ZWNfMCAvLyAibyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjUwNgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMub2ZmZXJzKGlkKS5leGlzdHMsIGVyck9mZmVyTm90Rm91bmQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBjYW5jZWxfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjXzIgLy8gIkVSUjplcnJOb2ZyIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5vZnIKCmNhbmNlbF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTA3CiAgICAvLyBjb25zdCB7IHN0YXRlLCBlc2Nyb3dlZCwgbGVhdmVzLCBleHBpcmF0aW9uIH0gPSB0aGlzLm9mZmVycyhpZCkudmFsdWUKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGR1cAogICAgZXh0cmFjdCAwIDEKICAgIGR1cAogICAgY292ZXIgMgogICAgYnVyeSA3CiAgICBkdXAKICAgIHB1c2hpbnQgNDEKICAgIGV4dHJhY3RfdWludDY0CiAgICBjb3ZlciA0CiAgICBkdXAKICAgIHB1c2hpbnQgMzMKICAgIGV4dHJhY3RfdWludDY0CiAgICBidXJ5IDYKICAgIHB1c2hpbnQgOTcKICAgIGV4dHJhY3RfdWludDY0CiAgICBidXJ5IDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTA5CiAgICAvLyBzdGF0ZSA9PT0gU1RBVEVfT0ZGRVJFRCB8fCBzdGF0ZSA9PT0gU1RBVEVfRVNDUk9XSU5HIHx8CiAgICBieXRlYyA3IC8vIDB4MGEKICAgID09CiAgICBibnogY2FuY2VsX2Jvb2xfdHJ1ZUA4CiAgICBkaWcgNQogICAgYnl0ZWMgNiAvLyAweDE0CiAgICA9PQogICAgYm56IGNhbmNlbF9ib29sX3RydWVAOAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1MTAKICAgIC8vIChzdGF0ZSA9PT0gU1RBVEVfRElTQlVSU0lORyAmJiBlc2Nyb3dlZCA9PT0gbGVhdmVzICYmIGV4cGlyYXRpb24gPD0gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCksCiAgICBkaWcgNQogICAgYnl0ZWMgMTAgLy8gMHgxZQogICAgPT0KICAgIGJ6IGNhbmNlbF9ib29sX2ZhbHNlQDkKICAgIGRpZyAyCiAgICBkaWcgNAogICAgPT0KICAgIGJ6IGNhbmNlbF9ib29sX2ZhbHNlQDkKICAgIGRpZyA0CiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICA8PQogICAgYnogY2FuY2VsX2Jvb2xfZmFsc2VAOQoKY2FuY2VsX2Jvb2xfdHJ1ZUA4OgogICAgaW50Y18xIC8vIDEKCmNhbmNlbF9ib29sX21lcmdlQDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1MDgtNTEyCiAgICAvLyBsb2dnZWRBc3NlcnQoCiAgICAvLyAgIHN0YXRlID09PSBTVEFURV9PRkZFUkVEIHx8IHN0YXRlID09PSBTVEFURV9FU0NST1dJTkcgfHwKICAgIC8vICAgKHN0YXRlID09PSBTVEFURV9ESVNCVVJTSU5HICYmIGVzY3Jvd2VkID09PSBsZWF2ZXMgJiYgZXhwaXJhdGlvbiA8PSBHbG9iYWwubGF0ZXN0VGltZXN0YW1wKSwKICAgIC8vICAgZXJySW52YWxpZFN0YXRlCiAgICAvLyApCiAgICBibnogY2FuY2VsX2FmdGVyX2Fzc2VydEAxMgogICAgYnl0ZWMgNSAvLyAiRVJSOmVycklzdGUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXN0ZQoKY2FuY2VsX2FmdGVyX2Fzc2VydEAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTE2CiAgICAvLyBjb25zdCBzZW5kZXJQYXJ0aWNpcGFudEtleSA9IHsgaWQsIGFkZHJlc3M6IFR4bi5zZW5kZXIgfQogICAgdHhuIFNlbmRlcgogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTE3CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5wYXJ0aWNpcGFudHMoc2VuZGVyUGFydGljaXBhbnRLZXkpLmV4aXN0cywgZXJyTm90QWNjZXB0ZWQpCiAgICBkdXAKICAgIGV4dHJhY3QgMCA4CiAgICBzd2FwCiAgICBleHRyYWN0IDggMzIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2OAogICAgLy8gcGFydGljaXBhbnRzID0gQm94TWFwPFBhcnRpY2lwYW50S2V5LCBSZWZ1bmRWYWx1ZT4oeyBrZXlQcmVmaXg6IEh5cGVyU3dhcEJveFByZWZpeFBhcnRpY2lwYW50cyB9KQogICAgYnl0ZWNfMSAvLyAicCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1MTcKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnBhcnRpY2lwYW50cyhzZW5kZXJQYXJ0aWNpcGFudEtleSkuZXhpc3RzLCBlcnJOb3RBY2NlcHRlZCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGNhbmNlbF9hZnRlcl9hc3NlcnRAMTQKICAgIHB1c2hieXRlcyAiRVJSOmVyck5hY3AiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmFjcAoKY2FuY2VsX2FmdGVyX2Fzc2VydEAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTIwCiAgICAvLyBpZiAoZXNjcm93ZWQgPT09IDApIHsKICAgIHN3YXAKICAgIGJueiBjYW5jZWxfZWxzZV9ib2R5QDE2CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjUyMQogICAgLy8gdGhpcy5vZmZlcnMoaWQpLnZhbHVlLnN0YXRlID0gU1RBVEVfQ0FOQ0VMX0NPTVBMRVRFRAogICAgaW50Y18wIC8vIDAKICAgIGJ5dGVjIDExIC8vIDB4M2MKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCgpjYW5jZWxfYWZ0ZXJfaWZfZWxzZUAxNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTA0CiAgICAvLyBjYW5jZWwoaWQ6IHVpbnQ2NCwgcHJvb2Y6IFByb29mKSB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpjYW5jZWxfZWxzZV9ib2R5QDE2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1MjMKICAgIC8vIHRoaXMub2ZmZXJzKGlkKS52YWx1ZS5zdGF0ZSA9IFNUQVRFX0NBTkNFTExFRAogICAgaW50Y18wIC8vIDAKICAgIHB1c2hieXRlcyAweDMyCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYiBjYW5jZWxfYWZ0ZXJfaWZfZWxzZUAxNwoKY2FuY2VsX2Jvb2xfZmFsc2VAOToKICAgIGludGNfMCAvLyAwCiAgICBiIGNhbmNlbF9ib29sX21lcmdlQDEwCgoKLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo6SHlwZXJTd2FwLndpdGhkcmF3W3JvdXRpbmddKCkgLT4gdm9pZDoKd2l0aGRyYXc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjUzNgogICAgLy8gd2l0aGRyYXcoaWQ6IHVpbnQ2NCwgcmVjZWl2ZXI6IEFjY291bnQsIGFzc2V0OiB1aW50NjQsIGFtb3VudDogdWludDY0LCBwcm9vZjogUHJvb2YpIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgY292ZXIgMgogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDMyCiAgICAqCiAgICBwdXNoaW50IDIKICAgICsKICAgIHN3YXAKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGJ5dGVzWzMyXT4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTM4CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5vZmZlcnMoaWQpLmV4aXN0cywgZXJyT2ZmZXJOb3RGb3VuZCkKICAgIGl0b2IKICAgIGR1cAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2NgogICAgLy8gb2ZmZXJzID0gQm94TWFwPHVpbnQ2NCwgT2ZmZXJWYWx1ZT4oeyBrZXlQcmVmaXg6IEh5cGVyU3dhcEJveFByZWZpeE9mZmVycyB9KQogICAgYnl0ZWNfMCAvLyAibyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjUzOAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMub2ZmZXJzKGlkKS5leGlzdHMsIGVyck9mZmVyTm90Rm91bmQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiB3aXRoZHJhd19hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWNfMiAvLyAiRVJSOmVyck5vZnIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTm9mcgoKd2l0aGRyYXdfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjUzOQogICAgLy8gY29uc3QgeyBzdGF0ZSwgZXNjcm93ZWQgfSA9IHRoaXMub2ZmZXJzKGlkKS52YWx1ZQogICAgZHVwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZHVwCiAgICBleHRyYWN0IDAgMQogICAgc3dhcAogICAgcHVzaGludCA0MQogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTQxCiAgICAvLyBsb2dnZWRBc3NlcnQoc3RhdGUgPT09IFNUQVRFX0NBTkNFTExFRCwgZXJySW52YWxpZFN0YXRlKQogICAgcHVzaGJ5dGVzIDB4MzIKICAgID09CiAgICBibnogd2l0aGRyYXdfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjIDUgLy8gIkVSUjplcnJJc3RlIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklzdGUKCndpdGhkcmF3X2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1NDMKICAgIC8vIGxvZ2dlZEFzc2VydChlc2Nyb3dlZCA+IDAsIGVyck5vdGhpbmdUb1dpdGhkcmF3KQogICAgZGlnIDEKICAgIGJueiB3aXRoZHJhd19hZnRlcl9hc3NlcnRANwogICAgcHVzaGJ5dGVzICJFUlI6ZXJyTnR3ZCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOdHdkCgp3aXRoZHJhd19hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTQ1CiAgICAvLyBjb25zdCBoYXNoID0gc2hhMjU2KHNoYTI1NihCeXRlc2Ake1R4bi5zZW5kZXIuYnl0ZXN9JHtyZWNlaXZlci5ieXRlc30ke2l0b2IoYXNzZXQpfSR7aXRvYihhbW91bnQpfWApKQogICAgdHhuIFNlbmRlcgogICAgdW5jb3ZlciA2CiAgICBjb25jYXQKICAgIGRpZyA0CiAgICBpdG9iCiAgICBjb25jYXQKICAgIGRpZyAzCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHNoYTI1NgogICAgc2hhMjU2CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU0NgogICAgLy8gY29uc3QgaGFzaEtleTogSGFzaEtleSA9IHsgaWQsIGhhc2ggfQogICAgdW5jb3ZlciA1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NzAKICAgIC8vIGhhc2hlcyA9IEJveE1hcDxIYXNoS2V5LCBSZWZ1bmRWYWx1ZT4oeyBrZXlQcmVmaXg6IEh5cGVyU3dhcEJveFByZWZpeEhhc2hlcyB9KQogICAgYnl0ZWMgOSAvLyAiaCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU0NwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuaGFzaGVzKGhhc2hLZXkpLmV4aXN0cywgZXJyTGVhZk5vdEVzY3Jvd2VkKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogd2l0aGRyYXdfYWZ0ZXJfYXNzZXJ0QDkKICAgIGJ5dGVjIDI4IC8vICJFUlI6ZXJyTG5lcyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJMbmVzCgp3aXRoZHJhd19hZnRlcl9hc3NlcnRAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTQ5CiAgICAvLyBsZXQgeyBwYXlvciwgYW1vdW50OiByZWZ1bmRBbW91bnQgfSA9IHRoaXMuaGFzaGVzKGhhc2hLZXkpLnZhbHVlCiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBkdXAKICAgIGV4dHJhY3QgOCAzMgogICAgY292ZXIgMgogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU1MAogICAgLy8gdGhpcy5oYXNoZXMoaGFzaEtleSkuZGVsZXRlKCkKICAgIGJveF9kZWwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1NTIKICAgIC8vIGlmIChhc3NldCA9PT0gMCkgewogICAgZGlnIDUKICAgIGJueiB3aXRoZHJhd19lbHNlX2JvZHlAMTIKICAgIHVuY292ZXIgNQogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU1My01NTgKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGFtb3VudDogYW1vdW50LAogICAgLy8gICAgIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTU2CiAgICAvLyByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIHVuY292ZXIgNAogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTUzLTU1NwogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50OiBhbW91bnQsCiAgICAvLyAgICAgcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU1My01NTgKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGFtb3VudDogYW1vdW50LAogICAgLy8gICAgIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0Cgp3aXRoZHJhd19hZnRlcl9pZl9lbHNlQDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1NjkKICAgIC8vIHRoaXMucmVmdW5kU3RvcmFnZShwYXlvciwgVHhuLnNlbmRlciwgcmVmdW5kQW1vdW50KQogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgY2FsbHN1YiByZWZ1bmRTdG9yYWdlCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU3MgogICAgLy8gY29uc3QgbmV3RXNjcm93ZWQ6IHVpbnQ2NCA9IGVzY3Jvd2VkIC0gMQogICAgc3dhcAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1NzQKICAgIC8vIGlmIChuZXdFc2Nyb3dlZCA9PT0gMCkgewogICAgYm56IHdpdGhkcmF3X2Vsc2VfYm9keUAxNgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1NzUKICAgIC8vIHRoaXMub2ZmZXJzKGlkKS52YWx1ZS5lc2Nyb3dlZCA9IG5ld0VzY3Jvd2VkCiAgICBpdG9iCiAgICBkaWcgMQogICAgcHVzaGludCA0MQogICAgdW5jb3ZlciAyCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1NzYKICAgIC8vIHRoaXMub2ZmZXJzKGlkKS52YWx1ZS5zdGF0ZSA9IFNUQVRFX0NBTkNFTF9DT01QTEVURUQKICAgIGludGNfMCAvLyAwCiAgICBieXRlYyAxMSAvLyAweDNjCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwoKd2l0aGRyYXdfYWZ0ZXJfaWZfZWxzZUAxNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTM2CiAgICAvLyB3aXRoZHJhdyhpZDogdWludDY0LCByZWNlaXZlcjogQWNjb3VudCwgYXNzZXQ6IHVpbnQ2NCwgYW1vdW50OiB1aW50NjQsIHByb29mOiBQcm9vZikgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKd2l0aGRyYXdfZWxzZV9ib2R5QDE2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1NzgKICAgIC8vIHRoaXMub2ZmZXJzKGlkKS52YWx1ZS5lc2Nyb3dlZCA9IG5ld0VzY3Jvd2VkCiAgICBpdG9iCiAgICBwdXNoaW50IDQxCiAgICBzd2FwCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYiB3aXRoZHJhd19hZnRlcl9pZl9lbHNlQDE3Cgp3aXRoZHJhd19lbHNlX2JvZHlAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU2MC01NjYKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudCwKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTY0CiAgICAvLyBhc3NldFJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICB1bmNvdmVyIDQKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIHVuY292ZXIgNAogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTYwLTU2NQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldCwKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50LAogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1NjAtNTY2CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnQsCiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgYiB3aXRoZHJhd19hZnRlcl9pZl9lbHNlQDE0CgoKLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo6SHlwZXJTd2FwLmNsZWFudXBQYXJ0aWNpcGFudFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNsZWFudXBQYXJ0aWNpcGFudDoKICAgIGludGNfMCAvLyAwCiAgICBwdXNoYnl0ZXMgIiIKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1OTEKICAgIC8vIGNsZWFudXBQYXJ0aWNpcGFudChpZDogdWludDY0LCBwYXJ0aWNpcGFudDogQWNjb3VudCkgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU5MgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMub2ZmZXJzKGlkKS5leGlzdHMsIGVyck9mZmVyTm90Rm91bmQpCiAgICBpdG9iCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjYKICAgIC8vIG9mZmVycyA9IEJveE1hcDx1aW50NjQsIE9mZmVyVmFsdWU+KHsga2V5UHJlZml4OiBIeXBlclN3YXBCb3hQcmVmaXhPZmZlcnMgfSkKICAgIGJ5dGVjXzAgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1OTIKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLm9mZmVycyhpZCkuZXhpc3RzLCBlcnJPZmZlck5vdEZvdW5kKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogY2xlYW51cFBhcnRpY2lwYW50X2FmdGVyX2Fzc2VydEAzCiAgICBieXRlY18yIC8vICJFUlI6ZXJyTm9mciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOb2ZyCgpjbGVhbnVwUGFydGljaXBhbnRfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU5MwogICAgLy8gY29uc3QgeyBzdGF0ZSwgZXhwaXJhdGlvbiwgYWNjZXB0YW5jZXMsIGVzY3Jvd2VkIH0gPSB0aGlzLm9mZmVycyhpZCkudmFsdWUKICAgIGRpZyAxCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZHVwCiAgICBleHRyYWN0IDAgMQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBidXJ5IDgKICAgIGR1cAogICAgcHVzaGludCA5NwogICAgZXh0cmFjdF91aW50NjQKICAgIGJ1cnkgNgogICAgZHVwCiAgICBwdXNoaW50IDg5CiAgICBleHRyYWN0X3VpbnQ2NAogICAgY292ZXIgNAogICAgcHVzaGludCA0MQogICAgZXh0cmFjdF91aW50NjQKICAgIGJ1cnkgNwogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1OTYKICAgIC8vIGNvbnN0IGlzQ29tcGxldGVkID0gc3RhdGUgPT09IFNUQVRFX0NPTVBMRVRFRCB8fCBzdGF0ZSA9PT0gU1RBVEVfQ0FOQ0VMX0NPTVBMRVRFRAogICAgYnl0ZWMgMTggLy8gMHgyOAogICAgPT0KICAgIGJueiBjbGVhbnVwUGFydGljaXBhbnRfYm9vbF90cnVlQDUKICAgIGRpZyA2CiAgICBieXRlYyAxMSAvLyAweDNjCiAgICA9PQogICAgYnogY2xlYW51cFBhcnRpY2lwYW50X2Jvb2xfZmFsc2VANgoKY2xlYW51cFBhcnRpY2lwYW50X2Jvb2xfdHJ1ZUA1OgogICAgaW50Y18xIC8vIDEKCmNsZWFudXBQYXJ0aWNpcGFudF9ib29sX21lcmdlQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU5NwogICAgLy8gY29uc3QgaXNFeHBpcmVkID0gKHN0YXRlID09PSBTVEFURV9PRkZFUkVEIHx8IHN0YXRlID09PSBTVEFURV9FU0NST1dJTkcpICYmIGV4cGlyYXRpb24gPD0gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCAmJiBlc2Nyb3dlZCA9PT0gMAogICAgZGlnIDcKICAgIGJ5dGVjIDcgLy8gMHgwYQogICAgPT0KICAgIGJueiBjbGVhbnVwUGFydGljaXBhbnRfYW5kX2NvbnRkQDkKICAgIGRpZyA3CiAgICBieXRlYyA2IC8vIDB4MTQKICAgID09CiAgICBieiBjbGVhbnVwUGFydGljaXBhbnRfYm9vbF9mYWxzZUAxMgoKY2xlYW51cFBhcnRpY2lwYW50X2FuZF9jb250ZEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1OTcKICAgIC8vIGNvbnN0IGlzRXhwaXJlZCA9IChzdGF0ZSA9PT0gU1RBVEVfT0ZGRVJFRCB8fCBzdGF0ZSA9PT0gU1RBVEVfRVNDUk9XSU5HKSAmJiBleHBpcmF0aW9uIDw9IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgJiYgZXNjcm93ZWQgPT09IDAKICAgIGRpZyA1CiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICA8PQogICAgYnogY2xlYW51cFBhcnRpY2lwYW50X2Jvb2xfZmFsc2VAMTIKICAgIGRpZyA2CiAgICBibnogY2xlYW51cFBhcnRpY2lwYW50X2Jvb2xfZmFsc2VAMTIKICAgIGludGNfMSAvLyAxCgpjbGVhbnVwUGFydGljaXBhbnRfYm9vbF9tZXJnZUAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTk4CiAgICAvLyBsb2dnZWRBc3NlcnQoaXNDb21wbGV0ZWQgfHwgaXNFeHBpcmVkLCBlcnJJbnZhbGlkU3RhdGUpCiAgICB8fAogICAgYm56IGNsZWFudXBQYXJ0aWNpcGFudF9hZnRlcl9hc3NlcnRAMTUKICAgIGJ5dGVjIDUgLy8gIkVSUjplcnJJc3RlIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklzdGUKCmNsZWFudXBQYXJ0aWNpcGFudF9hZnRlcl9hc3NlcnRAMTU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjYwMAogICAgLy8gY29uc3QgcGFydGljaXBhbnRLZXk6IFBhcnRpY2lwYW50S2V5ID0geyBpZCwgYWRkcmVzczogcGFydGljaXBhbnQgfQogICAgZGlnIDMKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2OAogICAgLy8gcGFydGljaXBhbnRzID0gQm94TWFwPFBhcnRpY2lwYW50S2V5LCBSZWZ1bmRWYWx1ZT4oeyBrZXlQcmVmaXg6IEh5cGVyU3dhcEJveFByZWZpeFBhcnRpY2lwYW50cyB9KQogICAgYnl0ZWNfMSAvLyAicCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjYwMQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucGFydGljaXBhbnRzKHBhcnRpY2lwYW50S2V5KS5leGlzdHMsIGVyclBhcnRpY2lwYW50Tm90Rm91bmQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBjbGVhbnVwUGFydGljaXBhbnRfYWZ0ZXJfYXNzZXJ0QDE3CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJOcGZkIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5wZmQKCmNsZWFudXBQYXJ0aWNpcGFudF9hZnRlcl9hc3NlcnRAMTc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjYwMwogICAgLy8gY29uc3QgeyBwYXlvciwgYW1vdW50IH0gPSB0aGlzLnBhcnRpY2lwYW50cyhwYXJ0aWNpcGFudEtleSkudmFsdWUKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGR1cAogICAgZXh0cmFjdCA4IDMyCiAgICBzd2FwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjA0CiAgICAvLyB0aGlzLnBhcnRpY2lwYW50cyhwYXJ0aWNpcGFudEtleSkuZGVsZXRlKCkKICAgIHVuY292ZXIgMgogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjYwNwogICAgLy8gdGhpcy5vZmZlcnMoaWQpLnZhbHVlLmFjY2VwdGFuY2VzID0gYWNjZXB0YW5jZXMgLSAxCiAgICB1bmNvdmVyIDMKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBpdG9iCiAgICB1bmNvdmVyIDMKICAgIHB1c2hpbnQgODkKICAgIHVuY292ZXIgMgogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjEwCiAgICAvLyB0aGlzLnJlZnVuZFN0b3JhZ2UocGF5b3IsIHBhcnRpY2lwYW50LCBhbW91bnQpCiAgICBzd2FwCiAgICBjb3ZlciAyCiAgICBjYWxsc3ViIHJlZnVuZFN0b3JhZ2UKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTkxCiAgICAvLyBjbGVhbnVwUGFydGljaXBhbnQoaWQ6IHVpbnQ2NCwgcGFydGljaXBhbnQ6IEFjY291bnQpIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmNsZWFudXBQYXJ0aWNpcGFudF9ib29sX2ZhbHNlQDEyOgogICAgaW50Y18wIC8vIDAKICAgIGIgY2xlYW51cFBhcnRpY2lwYW50X2Jvb2xfbWVyZ2VAMTMKCmNsZWFudXBQYXJ0aWNpcGFudF9ib29sX2ZhbHNlQDY6CiAgICBpbnRjXzAgLy8gMAogICAgYiBjbGVhbnVwUGFydGljaXBhbnRfYm9vbF9tZXJnZUA3CgoKLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo6SHlwZXJTd2FwLmNsZWFudXBPZmZlcltyb3V0aW5nXSgpIC0+IHZvaWQ6CmNsZWFudXBPZmZlcjoKICAgIGludGNfMCAvLyAwCiAgICBwdXNoYnl0ZXMgIiIKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2MTkKICAgIC8vIGNsZWFudXBPZmZlcihpZDogdWludDY0KSB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjYyMAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMub2ZmZXJzKGlkKS5leGlzdHMsIGVyck9mZmVyTm90Rm91bmQpCiAgICBpdG9iCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjYKICAgIC8vIG9mZmVycyA9IEJveE1hcDx1aW50NjQsIE9mZmVyVmFsdWU+KHsga2V5UHJlZml4OiBIeXBlclN3YXBCb3hQcmVmaXhPZmZlcnMgfSkKICAgIGJ5dGVjXzAgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2MjAKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLm9mZmVycyhpZCkuZXhpc3RzLCBlcnJPZmZlck5vdEZvdW5kKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogY2xlYW51cE9mZmVyX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlY18yIC8vICJFUlI6ZXJyTm9mciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOb2ZyCgpjbGVhbnVwT2ZmZXJfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjYyMQogICAgLy8gY29uc3QgeyBzdGF0ZSwgZXhwaXJhdGlvbiwgYWNjZXB0YW5jZXMsIGVzY3Jvd2VkIH0gPSB0aGlzLm9mZmVycyhpZCkudmFsdWUKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGR1cAogICAgZXh0cmFjdCAwIDEKICAgIGR1cAogICAgY292ZXIgMgogICAgYnVyeSA3CiAgICBkdXAKICAgIHB1c2hpbnQgOTcKICAgIGV4dHJhY3RfdWludDY0CiAgICBidXJ5IDUKICAgIGR1cAogICAgcHVzaGludCA4OQogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDMKICAgIHB1c2hpbnQgNDEKICAgIGV4dHJhY3RfdWludDY0CiAgICBidXJ5IDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjI0CiAgICAvLyBjb25zdCBpc0NvbXBsZXRlZCA9IHN0YXRlID09PSBTVEFURV9DT01QTEVURUQgfHwgc3RhdGUgPT09IFNUQVRFX0NBTkNFTF9DT01QTEVURUQKICAgIGJ5dGVjIDE4IC8vIDB4MjgKICAgID09CiAgICBibnogY2xlYW51cE9mZmVyX2Jvb2xfdHJ1ZUA1CiAgICBkaWcgNQogICAgYnl0ZWMgMTEgLy8gMHgzYwogICAgPT0KICAgIGJ6IGNsZWFudXBPZmZlcl9ib29sX2ZhbHNlQDYKCmNsZWFudXBPZmZlcl9ib29sX3RydWVANToKICAgIGludGNfMSAvLyAxCgpjbGVhbnVwT2ZmZXJfYm9vbF9tZXJnZUA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2MjUKICAgIC8vIGNvbnN0IGlzRXhwaXJlZCA9IChzdGF0ZSA9PT0gU1RBVEVfT0ZGRVJFRCB8fCBzdGF0ZSA9PT0gU1RBVEVfRVNDUk9XSU5HKSAmJiBleHBpcmF0aW9uIDw9IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgJiYgZXNjcm93ZWQgPT09IDAKICAgIGRpZyA2CiAgICBieXRlYyA3IC8vIDB4MGEKICAgID09CiAgICBibnogY2xlYW51cE9mZmVyX2FuZF9jb250ZEA5CiAgICBkaWcgNgogICAgYnl0ZWMgNiAvLyAweDE0CiAgICA9PQogICAgYnogY2xlYW51cE9mZmVyX2Jvb2xfZmFsc2VAMTIKCmNsZWFudXBPZmZlcl9hbmRfY29udGRAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjI1CiAgICAvLyBjb25zdCBpc0V4cGlyZWQgPSAoc3RhdGUgPT09IFNUQVRFX09GRkVSRUQgfHwgc3RhdGUgPT09IFNUQVRFX0VTQ1JPV0lORykgJiYgZXhwaXJhdGlvbiA8PSBHbG9iYWwubGF0ZXN0VGltZXN0YW1wICYmIGVzY3Jvd2VkID09PSAwCiAgICBkaWcgNAogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgPD0KICAgIGJ6IGNsZWFudXBPZmZlcl9ib29sX2ZhbHNlQDEyCiAgICBkaWcgNQogICAgYm56IGNsZWFudXBPZmZlcl9ib29sX2ZhbHNlQDEyCiAgICBpbnRjXzEgLy8gMQoKY2xlYW51cE9mZmVyX2Jvb2xfbWVyZ2VAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjYyNgogICAgLy8gbG9nZ2VkQXNzZXJ0KGlzQ29tcGxldGVkIHx8IGlzRXhwaXJlZCwgZXJySW52YWxpZFN0YXRlKQogICAgfHwKICAgIGJueiBjbGVhbnVwT2ZmZXJfYWZ0ZXJfYXNzZXJ0QDE1CiAgICBieXRlYyA1IC8vICJFUlI6ZXJySXN0ZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJc3RlCgpjbGVhbnVwT2ZmZXJfYWZ0ZXJfYXNzZXJ0QDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2MjkKICAgIC8vIGxvZ2dlZEFzc2VydChhY2NlcHRhbmNlcyA9PT0gMCwgZXJyUGFydGljaXBhbnRzTm90Q2xlYW5lZCkKICAgIHN3YXAKICAgIGJ6IGNsZWFudXBPZmZlcl9hZnRlcl9hc3NlcnRAMTcKICAgIHB1c2hieXRlcyAiRVJSOmVyclBuY2wiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyUG5jbAoKY2xlYW51cE9mZmVyX2FmdGVyX2Fzc2VydEAxNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NzMKICAgIC8vIG9mZmVyUmVmdW5kcyA9IEJveE1hcDx1aW50NjQsIFJlZnVuZFZhbHVlPih7IGtleVByZWZpeDogSHlwZXJTd2FwQm94UHJlZml4T2ZmZXJSZWZ1bmRzIH0pCiAgICBwdXNoYnl0ZXMgImYiCiAgICB1bmNvdmVyIDIKICAgIGR1cAogICAgY292ZXIgMgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjYzMQogICAgLy8gY29uc3QgeyBwYXlvciwgYW1vdW50IH0gPSB0aGlzLm9mZmVyUmVmdW5kcyhpZCkudmFsdWUKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGR1cAogICAgZXh0cmFjdCA4IDMyCiAgICBzd2FwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NzkKICAgIC8vIG9mZmVyUmVnaXN0cnkgPSBCb3hNYXA8dWludDY0LCB1aW50NjQ+KHsga2V5UHJlZml4OiBIeXBlclN3YXBCb3hQcmVmaXhPZmZlclJlZ2lzdHJ5IH0pCiAgICBieXRlYyAxNCAvLyAiciIKICAgIGRpZyA0CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjMzCiAgICAvLyBjb25zdCByZWdpc3RyeSA9IHRoaXMub2ZmZXJSZWdpc3RyeShpZCkudmFsdWUKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjM0CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBNZXRhLnByb3RvdHlwZS5kZWxldGVSb290Pih7IGFwcElkOiByZWdpc3RyeSwgYXJnczogW3RoaXMucm9vdE5hbWUoaWQsIGZhbHNlKV0gfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6ODUKICAgIC8vIHJldHVybiBTdHJpbmcoKHBhcnRpY2lwYW50cyA/IEJ5dGVzKCdwJykgOiBCeXRlcygndCcpKS5jb25jYXQoaXRvYihpZCkpKQogICAgYnl0ZWMgMTUgLy8gInQiCiAgICBkaWcgNgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjYzNAogICAgLy8gYWJpQ2FsbDx0eXBlb2YgTWV0YS5wcm90b3R5cGUuZGVsZXRlUm9vdD4oeyBhcHBJZDogcmVnaXN0cnksIGFyZ3M6IFt0aGlzLnJvb3ROYW1lKGlkLCBmYWxzZSldIH0pCiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgYnl0ZWMgMjkgLy8gbWV0aG9kICJkZWxldGVSb290KHN0cmluZyl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2MzUKICAgIC8vIGFiaUNhbGw8dHlwZW9mIE1ldGEucHJvdG90eXBlLmRlbGV0ZVJvb3Q+KHsgYXBwSWQ6IHJlZ2lzdHJ5LCBhcmdzOiBbdGhpcy5yb290TmFtZShpZCwgdHJ1ZSldIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjg1CiAgICAvLyByZXR1cm4gU3RyaW5nKChwYXJ0aWNpcGFudHMgPyBCeXRlcygncCcpIDogQnl0ZXMoJ3QnKSkuY29uY2F0KGl0b2IoaWQpKSkKICAgIGJ5dGVjXzEgLy8gInAiCiAgICB1bmNvdmVyIDYKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2MzUKICAgIC8vIGFiaUNhbGw8dHlwZW9mIE1ldGEucHJvdG90eXBlLmRlbGV0ZVJvb3Q+KHsgYXBwSWQ6IHJlZ2lzdHJ5LCBhcmdzOiBbdGhpcy5yb290TmFtZShpZCwgdHJ1ZSldIH0pCiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBieXRlYyAyOSAvLyBtZXRob2QgImRlbGV0ZVJvb3Qoc3RyaW5nKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjYzNgogICAgLy8gdGhpcy5vZmZlcnMoaWQpLmRlbGV0ZSgpCiAgICB1bmNvdmVyIDQKICAgIGJveF9kZWwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2MzcKICAgIC8vIHRoaXMub2ZmZXJSZWZ1bmRzKGlkKS5kZWxldGUoKQogICAgdW5jb3ZlciAzCiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjM4CiAgICAvLyB0aGlzLm9mZmVyUmVnaXN0cnkoaWQpLmRlbGV0ZSgpCiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjM5CiAgICAvLyBpdHhuLnBheW1lbnQoeyByZWNlaXZlcjogcGF5b3IsIGFtb3VudCB9KS5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjYxOQogICAgLy8gY2xlYW51cE9mZmVyKGlkOiB1aW50NjQpIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmNsZWFudXBPZmZlcl9ib29sX2ZhbHNlQDEyOgogICAgaW50Y18wIC8vIDAKICAgIGIgY2xlYW51cE9mZmVyX2Jvb2xfbWVyZ2VAMTMKCmNsZWFudXBPZmZlcl9ib29sX2ZhbHNlQDY6CiAgICBpbnRjXzAgLy8gMAogICAgYiBjbGVhbnVwT2ZmZXJfYm9vbF9tZXJnZUA3CgoKLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo6SHlwZXJTd2FwLm9mZmVyVGVybXNbcm91dGluZ10oKSAtPiB2b2lkOgpvZmZlclRlcm1zOgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2NDUKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjY0NwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMub2ZmZXJzKGlkKS5leGlzdHMsIGVyck9mZmVyTm90Rm91bmQpCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjY2CiAgICAvLyBvZmZlcnMgPSBCb3hNYXA8dWludDY0LCBPZmZlclZhbHVlPih7IGtleVByZWZpeDogSHlwZXJTd2FwQm94UHJlZml4T2ZmZXJzIH0pCiAgICBieXRlY18wIC8vICJvIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjY0NwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMub2ZmZXJzKGlkKS5leGlzdHMsIGVyck9mZmVyTm90Rm91bmQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBvZmZlclRlcm1zX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlY18yIC8vICJFUlI6ZXJyTm9mciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOb2ZyCgpvZmZlclRlcm1zX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2NDgKICAgIC8vIHJldHVybiB0aGlzLnRlcm1zKGlkKQogICAgY2FsbHN1YiB0ZXJtcwogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2NDUKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYnl0ZWMgMTkgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6OkNvbnRyYWN0V2l0aE9wdEluLm9wdEluW3JvdXRpbmddKCkgLT4gdm9pZDoKb3B0SW46CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6MjMKICAgIC8vIG9wdEluKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYXNzZXQ6IEFzc2V0KTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cG4gMgogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czoyNQogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBlcnJJbnZhbGlkUGF5bWVudFJlY2VpdmVyKQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IG9wdEluX2FmdGVyX2Fzc2VydEAzCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJJcG1yIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwbXIKCm9wdEluX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjI2CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSwgZXJySW52YWxpZFBheW1lbnRBbW91bnQpCiAgICBzd2FwCiAgICBndHhucyBBbW91bnQKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgPT0KICAgIGJueiBvcHRJbl9hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6ZXJySXBtYSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcG1hCgpvcHRJbl9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czoyOC0zNAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IDAsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czozMAogICAgLy8gYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgc3dhcAogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czozMQogICAgLy8gYXNzZXRBbW91bnQ6IDAsCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6MjgtMzMKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vICAgfSkKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6MjgtMzQKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjIzCiAgICAvLyBvcHRJbihwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGFzc2V0OiBBc3NldCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czo6VXBncmFkZWFibGVBa2l0YUJhc2VDb250cmFjdC51cGRhdGVbcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzUKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzcKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzMgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWMgMzAgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozNwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogdXBkYXRlX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAzMSAvLyAiRVJSOmVyck5kYW8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmRhbwoKdXBkYXRlX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM4CiAgICAvLyBjb25zdCBbcGx1Z2luc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1BsdWdpbkFwcExpc3QpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzMgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozOAogICAgLy8gY29uc3QgW3BsdWdpbnNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXModGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNQbHVnaW5BcHBMaXN0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyAyMCAvLyAicGFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM5CiAgICAvLyBjb25zdCB1cGRhdGVQbHVnaW4gPSBkZWNvZGVBcmM0PFBsdWdpbkFwcExpc3Q+KHBsdWdpbnMpLnVwZGF0ZQogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czo0MAogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbklkID09PSB1cGRhdGVQbHVnaW4sIGVyckludmFsaWRVcGdyYWRlKQogICAgZ2xvYmFsIENhbGxlckFwcGxpY2F0aW9uSUQKICAgID09CiAgICBibnogdXBkYXRlX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJJdXBnIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckl1cGcKCnVwZGF0ZV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNAogICAgLy8gdmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5VmVyc2lvbiB9KQogICAgYnl0ZWMgMjIgLy8gInZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6NDEKICAgIC8vIHRoaXMudmVyc2lvbi52YWx1ZSA9IG5ld1ZlcnNpb24KICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzUKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czo6QWtpdGFCYXNlQ29udHJhY3QudXBkYXRlQWtpdGFEQU9bcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGVBa2l0YURBTzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNQogICAgLy8gdXBkYXRlQWtpdGFEQU8oYWtpdGFEQU86IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MjYKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzMgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWMgMzAgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNgogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogdXBkYXRlQWtpdGFEQU9fYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDMxIC8vICJFUlI6ZXJyTmRhbyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOZGFvCgp1cGRhdGVBa2l0YURBT19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzMgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNwogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSA9IGFraXRhREFPCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjI1CiAgICAvLyB1cGRhdGVBa2l0YURBTyhha2l0YURBTzogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjpIeXBlclN3YXAudGVybXMoaWQ6IHVpbnQ2NCkgLT4gYnl0ZXM6CnRlcm1zOgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo5OQogICAgLy8gcHJpdmF0ZSB0ZXJtcyhpZDogdWludDY0KTogYnl0ZXM8MzI+IHsKICAgIHByb3RvIDEgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxMDAKICAgIC8vIGNvbnN0IHsgcm9vdCwgbGVhdmVzLCBwYXJ0aWNpcGFudHNSb290LCBwYXJ0aWNpcGFudHNMZWF2ZXMsIGV4cGlyYXRpb24gfSA9IHRoaXMub2ZmZXJzKGlkKS52YWx1ZQogICAgZnJhbWVfZGlnIC0xCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjY2CiAgICAvLyBvZmZlcnMgPSBCb3hNYXA8dWludDY0LCBPZmZlclZhbHVlPih7IGtleVByZWZpeDogSHlwZXJTd2FwQm94UHJlZml4T2ZmZXJzIH0pCiAgICBieXRlY18wIC8vICJvIgogICAgZGlnIDEKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxMDAKICAgIC8vIGNvbnN0IHsgcm9vdCwgbGVhdmVzLCBwYXJ0aWNpcGFudHNSb290LCBwYXJ0aWNpcGFudHNMZWF2ZXMsIGV4cGlyYXRpb24gfSA9IHRoaXMub2ZmZXJzKGlkKS52YWx1ZQogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGR1cAogICAgZXh0cmFjdCAxIDMyCiAgICBkaWcgMQogICAgZXh0cmFjdCAzMyA4CiAgICBkaWcgMgogICAgZXh0cmFjdCA0OSAzMgogICAgZGlnIDMKICAgIGV4dHJhY3QgODEgOAogICAgdW5jb3ZlciA0CiAgICBleHRyYWN0IDk3IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTAxCiAgICAvLyByZXR1cm4gc2hhMjU2KEJ5dGVzYCR7aXRvYihpZCl9JHtyb290fSR7aXRvYihsZWF2ZXMpfSR7cGFydGljaXBhbnRzUm9vdH0ke2l0b2IocGFydGljaXBhbnRzTGVhdmVzKX0ke2l0b2IoZXhwaXJhdGlvbil9YCkKICAgIHVuY292ZXIgNQogICAgdW5jb3ZlciA1CiAgICBjb25jYXQKICAgIHVuY292ZXIgNAogICAgY29uY2F0CiAgICB1bmNvdmVyIDMKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc2hhMjU2CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjpIeXBlclN3YXAudmVyaWZ5TGVhZihpZDogdWludDY0LCBwYXJ0aWNpcGFudHM6IHVpbnQ2NCwgbGVhZjogYnl0ZXMsIHByb29mOiBieXRlcykgLT4gdWludDY0LCBieXRlczoKdmVyaWZ5TGVhZjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTA1CiAgICAvLyBwcml2YXRlIHZlcmlmeUxlYWYoaWQ6IHVpbnQ2NCwgcGFydGljaXBhbnRzOiBib29sZWFuLCBsZWFmOiBieXRlczwzMj4sIHByb29mOiBQcm9vZik6IGJvb2xlYW4gewogICAgcHJvdG8gNCAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjEwNi0xMTUKICAgIC8vIHJldHVybiBhYmlDYWxsPHR5cGVvZiBNZXRhLnByb3RvdHlwZS52ZXJpZnk+KHsKICAgIC8vICAgYXBwSWQ6IHRoaXMub2ZmZXJSZWdpc3RyeShpZCkudmFsdWUsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICB0aGlzLnJvb3ROYW1lKGlkLCBwYXJ0aWNpcGFudHMpLAogICAgLy8gICAgIGxlYWYsCiAgICAvLyAgICAgcHJvb2YsCiAgICAvLyAgICAgTWVya2xlVHJlZVR5cGVUcmFkZQogICAgLy8gICBdLAogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTA5CiAgICAvLyBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjg1CiAgICAvLyByZXR1cm4gU3RyaW5nKChwYXJ0aWNpcGFudHMgPyBCeXRlcygncCcpIDogQnl0ZXMoJ3QnKSkuY29uY2F0KGl0b2IoaWQpKSkKICAgIGJ5dGVjIDE1IC8vICJ0IgogICAgYnl0ZWNfMSAvLyAicCIKICAgIGZyYW1lX2RpZyAtMwogICAgc2VsZWN0CiAgICBmcmFtZV9kaWcgLTQKICAgIGl0b2IKICAgIHN3YXAKICAgIGRpZyAxCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTEwCiAgICAvLyB0aGlzLnJvb3ROYW1lKGlkLCBwYXJ0aWNpcGFudHMpLAogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTEzCiAgICAvLyBNZXJrbGVUcmVlVHlwZVRyYWRlCiAgICBwdXNoaW50IDMKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NzkKICAgIC8vIG9mZmVyUmVnaXN0cnkgPSBCb3hNYXA8dWludDY0LCB1aW50NjQ+KHsga2V5UHJlZml4OiBIeXBlclN3YXBCb3hQcmVmaXhPZmZlclJlZ2lzdHJ5IH0pCiAgICBieXRlYyAxNCAvLyAiciIKICAgIHVuY292ZXIgMwogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjEwNwogICAgLy8gYXBwSWQ6IHRoaXMub2ZmZXJSZWdpc3RyeShpZCkudmFsdWUsCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgYnRvaQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjEwNi0xMTUKICAgIC8vIHJldHVybiBhYmlDYWxsPHR5cGVvZiBNZXRhLnByb3RvdHlwZS52ZXJpZnk+KHsKICAgIC8vICAgYXBwSWQ6IHRoaXMub2ZmZXJSZWdpc3RyeShpZCkudmFsdWUsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICB0aGlzLnJvb3ROYW1lKGlkLCBwYXJ0aWNpcGFudHMpLAogICAgLy8gICAgIGxlYWYsCiAgICAvLyAgICAgcHJvb2YsCiAgICAvLyAgICAgTWVya2xlVHJlZVR5cGVUcmFkZQogICAgLy8gICBdLAogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIHB1c2hieXRlcyAweDJiZjNjYzVhIC8vIG1ldGhvZCAidmVyaWZ5KGFkZHJlc3Msc3RyaW5nLGJ5dGVbMzJdLGJ5dGVbMzJdW10sdWludDY0KWJvb2wiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGZyYW1lX2RpZyAtMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGZyYW1lX2RpZyAtMQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBzd2FwCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWMgMTkgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18xIC8vIDEKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGJvb2wKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIGZyYW1lX2RpZyAtMQogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo6SHlwZXJTd2FwLnJlZnVuZFN0b3JhZ2UocGF5b3I6IGJ5dGVzLCBvd25lcjogYnl0ZXMsIGFtb3VudDogdWludDY0KSAtPiB2b2lkOgpyZWZ1bmRTdG9yYWdlOgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxMjQKICAgIC8vIHByaXZhdGUgcmVmdW5kU3RvcmFnZShwYXlvcjogQWNjb3VudCwgb3duZXI6IEFjY291bnQsIGFtb3VudDogdWludDY0KTogdm9pZCB7CiAgICBwcm90byAzIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTI1CiAgICAvLyBpZiAoY2FuUmVjZWl2ZUFsZ28ocGF5b3IsIGFtb3VudCkpIHsKICAgIGZyYW1lX2RpZyAtMwogICAgZnJhbWVfZGlnIC0xCiAgICBjYWxsc3ViIGNhblJlY2VpdmVBbGdvCiAgICBieiByZWZ1bmRTdG9yYWdlX2Vsc2VfYm9keUAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjEyNgogICAgLy8gaXR4bi5wYXltZW50KHsgcmVjZWl2ZXI6IHBheW9yLCBhbW91bnQgfSkuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIGZyYW1lX2RpZyAtMQogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGZyYW1lX2RpZyAtMwogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKCnJlZnVuZFN0b3JhZ2VfYWZ0ZXJfaWZfZWxzZUA3OgogICAgcmV0c3ViCgpyZWZ1bmRTdG9yYWdlX2Vsc2VfYm9keUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxMjcKICAgIC8vIH0gZWxzZSBpZiAoY2FuUmVjZWl2ZUFsZ28ob3duZXIsIGFtb3VudCkpIHsKICAgIGZyYW1lX2RpZyAtMgogICAgZnJhbWVfZGlnIC0xCiAgICBjYWxsc3ViIGNhblJlY2VpdmVBbGdvCiAgICBieiByZWZ1bmRTdG9yYWdlX2FmdGVyX2lmX2Vsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxMjgKICAgIC8vIGl0eG4ucGF5bWVudCh7IHJlY2VpdmVyOiBvd25lciwgYW1vdW50IH0pLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBmcmFtZV9kaWcgLTIKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjpIeXBlclN3YXAucmVsZWFzZShpZDogdWludDY0LCBmcm9tOiBieXRlcywgcmVjZWl2ZXJXYWxsZXQ6IHVpbnQ2NCwgcmVjZWl2ZXI6IGJ5dGVzLCBhc3NldDogdWludDY0LCBhbW91bnQ6IHVpbnQ2NCkgLT4gdm9pZDoKcmVsZWFzZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTM2CiAgICAvLyBwcml2YXRlIHJlbGVhc2UoaWQ6IHVpbnQ2NCwgZnJvbTogQWNjb3VudCwgcmVjZWl2ZXJXYWxsZXQ6IHVpbnQ2NCwgcmVjZWl2ZXI6IEFjY291bnQsIGFzc2V0OiB1aW50NjQsIGFtb3VudDogdWludDY0KTogdm9pZCB7CiAgICBwcm90byA2IDAKICAgIGludGNfMCAvLyAwCiAgICBkdXAKICAgIHB1c2hieXRlcyAiIgogICAgZHVwbiA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjEzOAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMub2ZmZXJzKGlkKS5leGlzdHMsIGVyck9mZmVyTm90Rm91bmQpCiAgICBmcmFtZV9kaWcgLTYKICAgIGl0b2IKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2NgogICAgLy8gb2ZmZXJzID0gQm94TWFwPHVpbnQ2NCwgT2ZmZXJWYWx1ZT4oeyBrZXlQcmVmaXg6IEh5cGVyU3dhcEJveFByZWZpeE9mZmVycyB9KQogICAgYnl0ZWNfMCAvLyAibyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjEzOAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMub2ZmZXJzKGlkKS5leGlzdHMsIGVyck9mZmVyTm90Rm91bmQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiByZWxlYXNlX2FmdGVyX2Fzc2VydEAyCiAgICBieXRlY18yIC8vICJFUlI6ZXJyTm9mciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOb2ZyCgpyZWxlYXNlX2FmdGVyX2Fzc2VydEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxMzkKICAgIC8vIGNvbnN0IHsgc3RhdGUsIGVzY3Jvd2VkIH0gPSB0aGlzLm9mZmVycyhpZCkudmFsdWUKICAgIGZyYW1lX2RpZyA4CiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZHVwCiAgICBleHRyYWN0IDAgMQogICAgc3dhcAogICAgcHVzaGludCA0MQogICAgZXh0cmFjdF91aW50NjQKICAgIGZyYW1lX2J1cnkgNAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxNDEKICAgIC8vIGxvZ2dlZEFzc2VydChzdGF0ZSA9PT0gU1RBVEVfRElTQlVSU0lORywgZXJySW52YWxpZFN0YXRlKQogICAgYnl0ZWMgMTAgLy8gMHgxZQogICAgPT0KICAgIGJueiByZWxlYXNlX2FmdGVyX2Fzc2VydEA0CiAgICBieXRlYyA1IC8vICJFUlI6ZXJySXN0ZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJc3RlCgpyZWxlYXNlX2FmdGVyX2Fzc2VydEA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxNDQKICAgIC8vIGNvbnN0IGhhc2ggPSBzaGEyNTYoc2hhMjU2KEJ5dGVzYCR7ZnJvbS5ieXRlc30ke3JlY2VpdmVyLmJ5dGVzfSR7aXRvYihhc3NldCl9JHtpdG9iKGFtb3VudCl9YCkpCiAgICBmcmFtZV9kaWcgLTUKICAgIGZyYW1lX2RpZyAtMwogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgLTIKICAgIGl0b2IKICAgIGR1cAogICAgY292ZXIgMgogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgLTEKICAgIGl0b2IKICAgIGR1cAogICAgY292ZXIgMgogICAgY29uY2F0CiAgICBzaGEyNTYKICAgIHNoYTI1NgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxNDUKICAgIC8vIGNvbnN0IGhhc2hLZXk6IEhhc2hLZXkgPSB7IGlkLCBoYXNoIH0KICAgIHVuY292ZXIgMwogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjcwCiAgICAvLyBoYXNoZXMgPSBCb3hNYXA8SGFzaEtleSwgUmVmdW5kVmFsdWU+KHsga2V5UHJlZml4OiBIeXBlclN3YXBCb3hQcmVmaXhIYXNoZXMgfSkKICAgIGJ5dGVjIDkgLy8gImgiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxNDYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmhhc2hlcyhoYXNoS2V5KS5leGlzdHMsIGVyckxlYWZOb3RFc2Nyb3dlZCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHJlbGVhc2VfYWZ0ZXJfYXNzZXJ0QDYKICAgIGJ5dGVjIDI4IC8vICJFUlI6ZXJyTG5lcyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJMbmVzCgpyZWxlYXNlX2FmdGVyX2Fzc2VydEA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxNDgKICAgIC8vIGxldCB7IHBheW9yLCBhbW91bnQ6IHJlZnVuZEFtb3VudCB9ID0gdGhpcy5oYXNoZXMoaGFzaEtleSkudmFsdWUKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGR1cAogICAgZXh0cmFjdCA4IDMyCiAgICBmcmFtZV9idXJ5IDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZnJhbWVfYnVyeSA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE0OQogICAgLy8gdGhpcy5oYXNoZXMoaGFzaEtleSkuZGVsZXRlKCkKICAgIGJveF9kZWwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxNTIKICAgIC8vIGlmIChhc3NldCA9PT0gMCkgewogICAgZnJhbWVfZGlnIC0yCiAgICBibnogcmVsZWFzZV9lbHNlX2JvZHlAOQogICAgcG9wbiAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE1NC0xNTYKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoeyBhbW91bnQsIHJlY2VpdmVyIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgZnJhbWVfZGlnIC0zCiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE1NC0xNTUKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoeyBhbW91bnQsIHJlY2VpdmVyIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE1NC0xNTYKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoeyBhbW91bnQsIHJlY2VpdmVyIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTU5CiAgICAvLyB0aGlzLnJlZnVuZFN0b3JhZ2UocGF5b3IsIGZyb20sIHJlZnVuZEFtb3VudCkKICAgIGZyYW1lX2RpZyAxCiAgICBmcmFtZV9kaWcgLTUKICAgIGZyYW1lX2RpZyA2CiAgICBjYWxsc3ViIHJlZnVuZFN0b3JhZ2UKCnJlbGVhc2VfYWZ0ZXJfaWZfZWxzZUAyNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjA5CiAgICAvLyBjb25zdCBuZXdFc2Nyb3dlZDogdWludDY0ID0gZXNjcm93ZWQgLSAxCiAgICBmcmFtZV9kaWcgNAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjEwCiAgICAvLyB0aGlzLm9mZmVycyhpZCkudmFsdWUuZXNjcm93ZWQgPSBuZXdFc2Nyb3dlZAogICAgZHVwCiAgICBpdG9iCiAgICBmcmFtZV9kaWcgOAogICAgcHVzaGludCA0MQogICAgdW5jb3ZlciAyCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyMTIKICAgIC8vIGlmIChuZXdFc2Nyb3dlZCA9PT0gMCkgewogICAgYm56IHJlbGVhc2VfYWZ0ZXJfaWZfZWxzZUAyNwogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyMTMKICAgIC8vIHRoaXMub2ZmZXJzKGlkKS52YWx1ZS5zdGF0ZSA9IFNUQVRFX0NPTVBMRVRFRAogICAgZnJhbWVfZGlnIDgKICAgIGludGNfMCAvLyAwCiAgICBieXRlYyAxOCAvLyAweDI4CiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwoKcmVsZWFzZV9hZnRlcl9pZl9lbHNlQDI3OgogICAgcmV0c3ViCgpyZWxlYXNlX2Vsc2VfYm9keUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxNjIKICAgIC8vIGNvbnN0IFssIGlzT3B0ZWRJbl0gPSBBc3NldEhvbGRpbmcuYXNzZXRCYWxhbmNlKHJlY2VpdmVyLCBhc3NldCkKICAgIGZyYW1lX2RpZyAtMwogICAgZnJhbWVfZGlnIC0yCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxNjQKICAgIC8vIGlmICghaXNPcHRlZEluKSB7CiAgICBibnogcmVsZWFzZV9lbHNlX2JvZHlAMjIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTY2CiAgICAvLyBsb2dnZWRBc3NlcnQocmVjZWl2ZXJXYWxsZXQgIT09IDAsIGVyclJlY2VpdmVyTm90T3B0ZWRJbikKICAgIGZyYW1lX2RpZyAtNAogICAgYm56IHJlbGVhc2VfYWZ0ZXJfYXNzZXJ0QDEyCiAgICBieXRlYyAyMSAvLyAiRVJSOmVyclJub2kiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyUm5vaQoKcmVsZWFzZV9hZnRlcl9hc3NlcnRAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE2NwogICAgLy8gbG9nZ2VkQXNzZXJ0KEFwcGxpY2F0aW9uKHJlY2VpdmVyV2FsbGV0KS5hZGRyZXNzID09PSByZWNlaXZlciwgZXJyUmVjZWl2ZXJXYWxsZXRNaXNtYXRjaCkKICAgIGZyYW1lX2RpZyAtNAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZnJhbWVfZGlnIC0zCiAgICA9PQogICAgYm56IHJlbGVhc2VfYWZ0ZXJfYXNzZXJ0QDE0CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJSd21tIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclJ3bW0KCnJlbGVhc2VfYWZ0ZXJfYXNzZXJ0QDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxNjkKICAgIC8vIGxvZ2dlZEFzc2VydChyZWZ1bmRBbW91bnQgPj0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlLCBlcnJSZWNlaXZlck5vdE9wdGVkSW4pCiAgICBmcmFtZV9kaWcgNgogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICA+PQogICAgYm56IHJlbGVhc2VfYWZ0ZXJfYXNzZXJ0QDE2CiAgICBieXRlYyAyMSAvLyAiRVJSOmVyclJub2kiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyUm5vaQoKcmVsZWFzZV9hZnRlcl9hc3NlcnRAMTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE3MgogICAgLy8gY29uc3Qgb3B0aW5QbHVnaW4gPSBnZXRQbHVnaW5BcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLm9wdGluCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMyAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxNzIKICAgIC8vIGNvbnN0IG9wdGluUGx1Z2luID0gZ2V0UGx1Z2luQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5vcHRpbgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjE2CiAgICAvLyBjb25zdCBbcGx1Z2luQXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1BsdWdpbkFwcExpc3QpKQogICAgYnl0ZWMgMjAgLy8gInBhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTcyCiAgICAvLyBjb25zdCBvcHRpblBsdWdpbiA9IGdldFBsdWdpbkFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkub3B0aW4KICAgIGV4dHJhY3QgMCA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE3My0xODIKICAgIC8vIGNvbnN0IGNhbk9wdEluID0gYWJpQ2FsbDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X2NhbkNhbGw+KHsKICAgIC8vICAgYXBwSWQ6IHJlY2VpdmVyV2FsbGV0LAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgb3B0aW5QbHVnaW4sCiAgICAvLyAgICAgQ2FsbGVyVHlwZUdsb2JhbCwKICAgIC8vICAgICBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICAnJywKICAgIC8vICAgICBvcC5iemVybyg0KS50b0ZpeGVkKHsgbGVuZ3RoOiA0IH0pLAogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxNzcKICAgIC8vIENhbGxlclR5cGVHbG9iYWwsCiAgICBpbnRjXzEgLy8gMQogICAgaXRvYgogICAgZHVwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE3OAogICAgLy8gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxODAKICAgIC8vIG9wLmJ6ZXJvKDQpLnRvRml4ZWQoeyBsZW5ndGg6IDQgfSksCiAgICBwdXNoaW50IDQKICAgIGJ6ZXJvCiAgICBmcmFtZV9kaWcgLTQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxNzMtMTgyCiAgICAvLyBjb25zdCBjYW5PcHRJbiA9IGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9jYW5DYWxsPih7CiAgICAvLyAgIGFwcElkOiByZWNlaXZlcldhbGxldCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIG9wdGluUGx1Z2luLAogICAgLy8gICAgIENhbGxlclR5cGVHbG9iYWwsCiAgICAvLyAgICAgR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgJycsCiAgICAvLyAgICAgb3AuYnplcm8oNCkudG9GaXhlZCh7IGxlbmd0aDogNCB9KSwKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIHB1c2hieXRlcyAweGIzNjIzNGE1IC8vIG1ldGhvZCAiYXJjNThfY2FuQ2FsbCh1aW50NjQsdWludDY0LGFkZHJlc3Msc3RyaW5nLGJ5dGVbNF0pYm9vbCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxNzkKICAgIC8vICcnLAogICAgYnl0ZWMgMTIgLy8gMHgwMDAwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTczLTE4MgogICAgLy8gY29uc3QgY2FuT3B0SW4gPSBhYmlDYWxsPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfY2FuQ2FsbD4oewogICAgLy8gICBhcHBJZDogcmVjZWl2ZXJXYWxsZXQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBvcHRpblBsdWdpbiwKICAgIC8vICAgICBDYWxsZXJUeXBlR2xvYmFsLAogICAgLy8gICAgIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgICcnLAogICAgLy8gICAgIG9wLmJ6ZXJvKDQpLnRvRml4ZWQoeyBsZW5ndGg6IDQgfSksCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBzd2FwCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWMgMTkgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18xIC8vIDEKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGJvb2wKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTg0CiAgICAvLyBsb2dnZWRBc3NlcnQoY2FuT3B0SW4sIGVyclJlY2VpdmVyTm90T3B0ZWRJbikKICAgIGJueiByZWxlYXNlX2FmdGVyX2Fzc2VydEAxOQogICAgYnl0ZWMgMjEgLy8gIkVSUjplcnJSbm9pIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclJub2kKCnJlbGVhc2VfYWZ0ZXJfYXNzZXJ0QDE5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxODcKICAgIC8vIGFyYzU4T3B0SW5BbmRTZW5kKHRoaXMuYWtpdGFEQU8udmFsdWUsIEFwcGxpY2F0aW9uKHJlY2VpdmVyV2FsbGV0KSwgJycsIFthc3NldF0sIFthbW91bnRdKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzMgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTg3CiAgICAvLyBhcmM1OE9wdEluQW5kU2VuZCh0aGlzLmFraXRhREFPLnZhbHVlLCBBcHBsaWNhdGlvbihyZWNlaXZlcldhbGxldCksICcnLCBbYXNzZXRdLCBbYW1vdW50XSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyAzMiAvLyAweDAwMDEKICAgIHVuY292ZXIgNAogICAgY29uY2F0CiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGJ5dGVjIDMyIC8vIDB4MDAwMQogICAgdW5jb3ZlciA1CiAgICBjb25jYXQKICAgIGR1cAogICAgY292ZXIgMgogICAgZnJhbWVfYnVyeSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU5NwogICAgLy8gYXNzZXJ0KGFzc2V0cy5sZW5ndGggPT09IGFtb3VudHMubGVuZ3RoLCBlcnJBc3NldHNBbmRBbW91bnRzTWlzbWF0Y2gpCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBjb3ZlciA0CiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgZHVwCiAgICBmcmFtZV9idXJ5IDIKICAgID09CiAgICBhc3NlcnQgLy8gZXJyQWFtbQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMTYKICAgIC8vIGNvbnN0IFtwbHVnaW5BcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzUGx1Z2luQXBwTGlzdCkpCiAgICBieXRlYyAyMCAvLyAicGFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1OTgKICAgIC8vIGNvbnN0IG9wdGluUGx1Z2luID0gZ2V0UGx1Z2luQXBwTGlzdChha2l0YURBTykub3B0aW4KICAgIGR1cAogICAgZXh0cmFjdCAwIDgKICAgIGNvdmVyIDIKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNDEtMzQ0CiAgICAvLyBjb25zdCBbY29udHJvbGxlZEFjY291bnRCeXRlcywgZXhpc3RzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKAogICAgLy8gICB3YWxsZXRJRCwKICAgIC8vICAgQnl0ZXMoQWJzdHJhY3RBY2NvdW50R2xvYmFsU3RhdGVLZXlzQ29udHJvbGxlZEFkZHJlc3MpCiAgICAvLyApCiAgICBmcmFtZV9kaWcgLTQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzQzCiAgICAvLyBCeXRlcyhBYnN0cmFjdEFjY291bnRHbG9iYWxTdGF0ZUtleXNDb250cm9sbGVkQWRkcmVzcykKICAgIHB1c2hieXRlcyAiY29udHJvbGxlZF9hZGRyZXNzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNDEtMzQ0CiAgICAvLyBjb25zdCBbY29udHJvbGxlZEFjY291bnRCeXRlcywgZXhpc3RzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKAogICAgLy8gICB3YWxsZXRJRCwKICAgIC8vICAgQnl0ZXMoQWJzdHJhY3RBY2NvdW50R2xvYmFsU3RhdGVLZXlzQ29udHJvbGxlZEFkZHJlc3MpCiAgICAvLyApCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNDUKICAgIC8vIGxvZ2dlZEFzc2VydChleGlzdHMgJiYgY29udHJvbGxlZEFjY291bnRCeXRlcy5sZW5ndGggPT09IDMyLCBlcnJJbnZhbGlkV2FsbGV0KQogICAgYnogcmVsZWFzZV9ib29sX2ZhbHNlQDMxCiAgICBkaWcgMgogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBieiByZWxlYXNlX2Jvb2xfZmFsc2VAMzEKICAgIGludGNfMSAvLyAxCgpyZWxlYXNlX2Jvb2xfbWVyZ2VAMzI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM0NQogICAgLy8gbG9nZ2VkQXNzZXJ0KGV4aXN0cyAmJiBjb250cm9sbGVkQWNjb3VudEJ5dGVzLmxlbmd0aCA9PT0gMzIsIGVyckludmFsaWRXYWxsZXQpCiAgICBibnogcmVsZWFzZV9hZnRlcl9hc3NlcnRAMzQKICAgIHB1c2hieXRlcyAiRVJSOmVyckl3bHQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXdsdAoKcmVsZWFzZV9hZnRlcl9hc3NlcnRAMzQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYwMS02MDQKICAgIC8vIGl0eG5Db21wb3NlLmJlZ2luPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfcmVrZXlUb1BsdWdpbj4oewogICAgLy8gICBhcHBJZDogcmVjaXBpZW50V2FsbGV0LmlkLAogICAgLy8gICBhcmdzOiBbb3B0aW5QbHVnaW4sIENhbGxlclR5cGVHbG9iYWwsIGVzY3JvdywgW10sIFtdXQogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIGZyYW1lX2RpZyAtNAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoYnl0ZXMgMHg1YWRmMzM4ZiAvLyBtZXRob2QgImFyYzU4X3Jla2V5VG9QbHVnaW4odWludDY0LHVpbnQ2NCxzdHJpbmcsdWludDY0W10sKHVpbnQ2NCx1aW50NjQpW10pdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTc5CiAgICAvLyAnJywKICAgIGJ5dGVjIDEyIC8vIDB4MDAwMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjAzCiAgICAvLyBhcmdzOiBbb3B0aW5QbHVnaW4sIENhbGxlclR5cGVHbG9iYWwsIGVzY3JvdywgW10sIFtdXQogICAgYnl0ZWMgMTIgLy8gMHgwMDAwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgYnl0ZWMgMTIgLy8gMHgwMDAwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MDEtNjA0CiAgICAvLyBpdHhuQ29tcG9zZS5iZWdpbjx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X3Jla2V5VG9QbHVnaW4+KHsKICAgIC8vICAgYXBwSWQ6IHJlY2lwaWVudFdhbGxldC5pZCwKICAgIC8vICAgYXJnczogW29wdGluUGx1Z2luLCBDYWxsZXJUeXBlR2xvYmFsLCBlc2Nyb3csIFtdLCBbXV0KICAgIC8vIH0pCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYwNi02MTcKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIE9wdEluUGx1Z2luLnByb3RvdHlwZS5vcHRJbj4oewogICAgLy8gICBhcHBJZDogb3B0aW5QbHVnaW4sCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICByZWNpcGllbnRXYWxsZXQsCiAgICAvLyAgICAgdHJ1ZSwKICAgIC8vICAgICBhc3NldHMsCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBvcmlnaW4sCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSAqIGFzc2V0cy5sZW5ndGgKICAgIC8vICAgICB9KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYxNAogICAgLy8gYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiBhc3NldHMubGVuZ3RoCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIHVuY292ZXIgMwogICAgKgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGR1cAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MTItNjE1CiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogb3JpZ2luLAogICAgLy8gICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSAqIGFzc2V0cy5sZW5ndGgKICAgIC8vIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYwNi02MTcKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIE9wdEluUGx1Z2luLnByb3RvdHlwZS5vcHRJbj4oewogICAgLy8gICBhcHBJZDogb3B0aW5QbHVnaW4sCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICByZWNpcGllbnRXYWxsZXQsCiAgICAvLyAgICAgdHJ1ZSwKICAgIC8vICAgICBhc3NldHMsCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBvcmlnaW4sCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSAqIGFzc2V0cy5sZW5ndGgKICAgIC8vICAgICB9KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYwOQogICAgLy8gcmVjaXBpZW50V2FsbGV0LAogICAgZnJhbWVfZGlnIC00CiAgICBpdG9iCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MDYtNjE3CiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBPcHRJblBsdWdpbi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IG9wdGluUGx1Z2luLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgcmVjaXBpZW50V2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgYXNzZXRzLAogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogb3JpZ2luLAogICAgLy8gICAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiBhc3NldHMubGVuZ3RoCiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIHB1c2hieXRlcyAweDY4MzVlM2JjIC8vIG1ldGhvZCAib3B0SW4odWludDY0LGJvb2wsdWludDY0W10scGF5KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjEwCiAgICAvLyB0cnVlLAogICAgcHVzaGJ5dGVzIDB4ODAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkaWcgMQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjA2LTYxNwogICAgLy8gaXR4bkNvbXBvc2UubmV4dDx0eXBlb2YgT3B0SW5QbHVnaW4ucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiBvcHRpblBsdWdpbiwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHJlY2lwaWVudFdhbGxldCwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIGFzc2V0cywKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IG9yaWdpbiwKICAgIC8vICAgICAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogYXNzZXRzLmxlbmd0aAogICAgLy8gICAgIH0pCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYxOQogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGFtb3VudHMubGVuZ3RoOyBpKyspIHsKICAgIGludGNfMCAvLyAwCgpyZWxlYXNlX3doaWxlX3RvcEAzNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjE5CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgYW1vdW50cy5sZW5ndGg7IGkrKykgewogICAgZHVwCiAgICBmcmFtZV9kaWcgMgogICAgPAogICAgYnogcmVsZWFzZV9hZnRlcl93aGlsZUAzOQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MjAKICAgIC8vIGlmIChhbW91bnRzW2ldID4gMCkgewogICAgZnJhbWVfZGlnIDAKICAgIGV4dHJhY3QgMiAwCiAgICBkaWcgMQogICAgaW50Y18yIC8vIDgKICAgICoKICAgIGR1cAogICAgZnJhbWVfYnVyeSAzCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBmcmFtZV9idXJ5IDcKICAgIGJ6IHJlbGVhc2VfYWZ0ZXJfaWZfZWxzZUAzOAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MjEtNjI3CiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0KAogICAgLy8gICBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnRzW2ldLAogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IG9yaWdpbiwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0c1tpXQogICAgLy8gICB9KQogICAgLy8gKQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYyNQogICAgLy8geGZlckFzc2V0OiBhc3NldHNbaV0KICAgIGRpZyAyCiAgICBleHRyYWN0IDIgMAogICAgZnJhbWVfZGlnIDMKICAgIGV4dHJhY3RfdWludDY0CiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgZGlnIDEKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgZnJhbWVfZGlnIDcKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjIyLTYyNgogICAgLy8gaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgYXNzZXRBbW91bnQ6IGFtb3VudHNbaV0sCiAgICAvLyAgIGFzc2V0UmVjZWl2ZXI6IG9yaWdpbiwKICAgIC8vICAgeGZlckFzc2V0OiBhc3NldHNbaV0KICAgIC8vIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQoKcmVsZWFzZV9hZnRlcl9pZl9lbHNlQDM4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MTkKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBhbW91bnRzLmxlbmd0aDsgaSsrKSB7CiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgYiByZWxlYXNlX3doaWxlX3RvcEAzNQoKcmVsZWFzZV9hZnRlcl93aGlsZUAzOToKICAgIHBvcG4gMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MzEtNjMzCiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfdmVyaWZ5QXV0aEFkZHJlc3M+KHsKICAgIC8vICAgYXBwSWQ6IHJlY2lwaWVudFdhbGxldAogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgZnJhbWVfZGlnIC00CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hieXRlcyAweDZjYzNmNjA2IC8vIG1ldGhvZCAiYXJjNThfdmVyaWZ5QXV0aEFkZHJlc3MoKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MzUKICAgIC8vIGl0eG5Db21wb3NlLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxOTAKICAgIC8vIGNvbnN0IG9wdEluQ29zdCA9IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBkdXAKICAgIGZyYW1lX2J1cnkgNQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxOTEKICAgIC8vIGlmIChyZWZ1bmRBbW91bnQgPiBvcHRJbkNvc3QpIHsKICAgIGZyYW1lX2RpZyA2CiAgICA8CiAgICBieiByZWxlYXNlX2FmdGVyX2lmX2Vsc2VAMjUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTkyCiAgICAvLyB0aGlzLnJlZnVuZFN0b3JhZ2UocGF5b3IsIGZyb20sIHJlZnVuZEFtb3VudCAtIG9wdEluQ29zdCkKICAgIGZyYW1lX2RpZyA2CiAgICBmcmFtZV9kaWcgNQogICAgLQogICAgZnJhbWVfZGlnIDEKICAgIGZyYW1lX2RpZyAtNQogICAgdW5jb3ZlciAyCiAgICBjYWxsc3ViIHJlZnVuZFN0b3JhZ2UKICAgIGIgcmVsZWFzZV9hZnRlcl9pZl9lbHNlQDI1CgpyZWxlYXNlX2Jvb2xfZmFsc2VAMzE6CiAgICBpbnRjXzAgLy8gMAogICAgYiByZWxlYXNlX2Jvb2xfbWVyZ2VAMzIKCnJlbGVhc2VfZWxzZV9ib2R5QDIyOgogICAgcG9wbiAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE5Ni0yMDIKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudCwKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiByZWNlaXZlciwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICBmcmFtZV9kaWcgLTMKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgZnJhbWVfZGlnIC0xCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBmcmFtZV9kaWcgLTIKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE5Ni0yMDEKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudCwKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiByZWNlaXZlciwKICAgIC8vICAgfSkKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE5Ni0yMDIKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudCwKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiByZWNlaXZlciwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyMDUKICAgIC8vIHRoaXMucmVmdW5kU3RvcmFnZShwYXlvciwgZnJvbSwgcmVmdW5kQW1vdW50KQogICAgZnJhbWVfZGlnIDEKICAgIGZyYW1lX2RpZyAtNQogICAgZnJhbWVfZGlnIDYKICAgIGNhbGxzdWIgcmVmdW5kU3RvcmFnZQogICAgYiByZWxlYXNlX2FmdGVyX2lmX2Vsc2VAMjUK", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyAGAAEIINSQAuSTAiYhAW8BcAtFUlI6ZXJyTm9mcglha2l0YV9kYW8LRVJSOmVycklwYXkLRVJSOmVycklzdGUBFAEKC0VSUjplcnJPZmV4AWgBHgE8AgAADG9mZmVyX2N1cnNvcgFyAXQLRVJSOmVyck5wcnQLRVJSOmVyckl4ZnIBKAQVH3x1A3BhbAtFUlI6ZXJyUm5vaQd2ZXJzaW9uBKJMBnwLRVJSOmVyckxhZXMLRVJSOmVyckN2bGYLRVJSOmVyck5jbHMLRVJSOmVyck5ya3kLRVJSOmVyckxuZXME3yh6fQZ3YWxsZXQLRVJSOmVyck5kYW8CAAGABOqRgN02GgCOAQC7MRkURDEYQQCkgg8EDbOkSwR72oHJBNhf690ERm+HGgRWamKyBCcza6AEDHq0LgQGMYaLBGg7tngE0+4E8AQA1wHVBDlOrrIEM+kslASFTe3gBIQHM902GgCODwCOAhcDIQRGBfQGLgZnBxoIEAjRCcwJ7QqSADIAAQCALBUffHUAAAAAAAE2jAAAAAAAAIhUAAAAAAAAiFQAAAAAAACJ5AAAAAAAAAAAsCNDI0OABM2a1n42GgCOAQAlADEZgQQSMRgQREIJ+IoCAYv+cwBFAUAACIv/MgEPQQACI4kiiTYaAUkiWYECCEsBFRJEVwIANhoCSRUkEkQXJxZPAmcrTGcnDSJnI0MxFiMJSTgQIxJENhoBSU4CSRUlEkQ2GgJJFSQSRBdOAzYaA0lOAkkVJRJENhoESRUkEkQXTgQ2GgVJFSQSRBdOAhNAAA+AC0VSUjplcnJCcm90sABJMgcNQAAEJwiwAEkyBwmBgJqeAQ5AAA+AC0VSUjplcnJPdGxnsABLAkk4AEw4BzIKEkAABCcEsABPAzgIgailCxJAAAQnBLAAIicNZURJIwgnDUxnIitlRIADYWFsZUiBSFtMFicOSwFQSwIWv7FLAXIIRCEFsgiyByOyECKyAbYnD0sBUEkVFlcGAkxQgQMWSwOyGCcXshpMshpPB0lOBLIaSbIagQayECKyAbOxSwJyCEQhBbIIsgcjshAisgG2KUsCUEkVFlcGAkxQTwOyGCcXshqyGk8FSU4DshqyGoEGshAisgGzIQQWTwRJTgJQSwIxAFApTFBMv4HUlAkWTFCAAWZLAlBMv08ESSMSJwcnBk8CTU8EUE8FFlAiFlBPA1BMFlAjFlBPAhZQKE8CUEy/I0MxFiMJSTgQIxJENhoBSRUkEkQXSTYaAklOBEkiWSULgQIITBUSRDYaA0lOAxUlEkQWSShMUElOBr1FAUAAAyqwAEsBiAhYTwMSQAAPgAtFUlI6ZXJyVG1pc7AASwS+RElXAAFLAYFhW04DSwGBWVtOAkyBUVtOAycHEkAABCcFsAAyB08EDEAABCcIsAAxAAEBTwQjTwJPB4gIOUhAAAQnELAAMQBPAkxQSVcACExXCCBQKUxQSb1FAUEAD4ALRVJSOmVyckVhY2OwAEwjCElOAxZLBYFZTwK7SwM4BzIKEkAABCcEsABLAzgIIQQSQAAEJwSwAE8DOAAhBBZMUL8SQQAFSSInBrsjQzEWIwlJOBAjEkQ2GgFJFSQSRBdJTgI2GgJJTgMVJRJENhoDSRUkEkQXTgI2GgRJTgRJIlklC4ECCEwVEkQWSShMUElOB71FAUAAAyqwAEsGvkRJVwABSwGBKVtOBUsBgSFbTghMgWFbTCcGEkAABCcFsAAyBw1AAAQnCLAASTEAUElXAAhMVwggUClMUL1FAUAABCcQsAAxAE8GUCIWUEsDFlABAUlPAkxQJwlMUEm9RQFBAAQnGLAATwciTwNPB4gHB0hAAAQnGbAASwE4CTIDEkAABCcasABLATggMgMSQAAEJxuwAEsBOAcyChJAAAQnBLAASwE4CE8DIQQIEkAABCcEsABMOAAhBBZMUL8jCEkWSwOBKU8CuxJBAAVJIicKuyNDgAAxFoECCUk4ECMSRDEWIwlJOBCBBBJENhoBSRUkEkQXSU4DNhoCSU4DFSUSRDYaA0kVJBJEF04DNhoESRUkEkQXTgQ2GgVJTgVJIlklC4ECCEwVEkQWSU4CKExQSU4JvUUBQAADKrAASwi+RElXAAFLAYEpW04JSwGBIVtOCkyBYVtMJwYSQAAEJwWwADIHDUAABCcIsABLATEAUElXAAhMVwggUClMUL1FAUAABCcQsAAxAEsDUEsEFlBLBhZQAQFJTgJPA0xQJwlMUElOAr1FAUEABCcYsABPCiJPBE8HiAXBSEAABCcZsAAhBEUKTwJLA3AARQFAAAchBDIQCEUJSwQ4BzIKEkAABCcEsABLBDgISwkSQAAEJwSwADEASwE4ABJAAA+AC0VSUjplcnJJcG1zsABJOBMyAxJAAA+AC0VSUjplcnJOY2x3sABJOBUyAxJAAAQnGrAASTggMgMSQAAEJxuwAEk4FDIKEkAABCcRsABJOBFPAxJAAAQnEbAAOBJPAhJAAAQnEbAATDgASwUWTFC/IwhJFksDgSlPArsSQQAFSSInCrsjQzYaAUkVJBJEFzYaAkkVJBJEFzYaA0kVJRJENhoESRUkEkQXNhoFSRUkEkQXMQBPBUxOBU4FiAVZI0M2GgFJFSQSRBc2GgJJFSUSRDYaA0kVJBJEFzYaBEkVJRJENhoFSRUkEkQXNhoGSRUkEkQXiAUgI0MigABJNhoBSRUkEkQXNhoCSSJZJQuBAghMFRJEFkkoTFBJvUUBQAADKrAASb5ESVcAAUlOAkUHSYEpW04ESYEhW0UGgWFbRQYnBxJAACBLBScGEkAAGEsFJwoSQQBRSwJLBBJBAElLBDIHDkEAQSNAAAQnBbAAMQBPAkxQSVcACExXCCBQKUxQvUUBQAAPgAtFUlI6ZXJyTmFjcLAATEAABiInC7sjQyKAATK7Qv/2IkL/vDYaAUkVJBJEFzYaAklOAhUlEkQ2GgNJFSQSRBdMNhoESRUkEkQXTDYaBUkiWSULgQIITBUSRBZJTgMoTFBJvUUBQAADKrAASb5ESVcAAUyBKVtOAoABMhJAAAQnBbAASwFAAA+AC0VSUjplcnJOdHdksAAxAE8GUEsEFlBLAxZQAQFPBUxQJwlMUEm9RQFAAAQnHLAASb5ESVcIIE4CIltMvEhLBUAANk8FSLExALIHTwSyCCOyECKyAbMxAEyIA3FMIwlJQAAOFksBgSlPArsiJwu7I0MWgSlMu0L/9rExALIUTwSyEk8EshGBBLIQIrIBs0L/xSKAAEk2GgFJFSQSRBc2GgJJTgIVJRJEFkkoTFBJTgK9RQFAAAMqsABLAb5ESVcAAUlOAkUISYFhW0UGSYFZW04EgSlbRQcnEhJAAAhLBicLEkEAaSNLBycHEkAACEsHJwYSQQBUSwUyBw5BAExLBkAARyMRQAAEJwWwAEsDUClMUEm9RQFAAA+AC0VSUjplcnJOcGZksABJvkRJVwggTCJbTwK8SE8DIwkWTwOBWU8Cu0xOAogChSNDIkL/tiJC/5QigABJNhoBSRUkEkQXFkkoTFBJvUUBQAADKrAASb5ESVcAAUlOAkUHSYFhW0UFSYFZW04DgSlbRQYnEhJAAAhLBScLEkEAsCNLBicHEkAACEsGJwYSQQCbSwQyBw5BAJNLBUAAjiMRQAAEJwWwAExBAA+AC0VSUjplcnJQbmNssACAAWZPAklOAlBJvkRJVwggTCJbJw5LBFBJvkQXsScPSwZQSRUWVwYCTFBLAbIYJx2yGrIagQayECKyAbOxKU8GUEkVFlcGAkxQTLIYJx2yGrIagQayECKyAbNPBLxITwO8SLxIsbIIsgcjshAisgGzI0MiQv9vIkL/TTYaAUkVJBJEF0kWKExQvUUBQAADKrAAiADPJxNMULAjQzEWIwlHAjgQIxJENhoBSRUkEkQXTDgHMgoSQAAPgAtFUlI6ZXJySXBtcrAATDgIMhASQAAPgAtFUlI6ZXJySXBtYbAAsTIKTLIRIrISshSBBLIQIrIBsyNDNhoBSSJZgQIISwEVEkRXAgAxACIrZUQnHmVIcghEEkAABCcfsAAiK2VEJxRlSIEQWzINEkAAD4ALRVJSOmVyckl1cGewACcWTGcjQzYaAUkVJBJEFzEAIitlRCceZUhyCEQSQAAEJx+wACtMZyNDigEBi/8WKEsBUL5ESVcBIEsBVyEISwJXMSBLA1dRCE8EV2EITwVPBVBPBFBPA1BPAlBMUAGJigQCsTIKJw8pi/1Ni/wWTEsBUEkVFlcGAkxQgQMWJw5PA1C+RBeyGIAEK/PMWrIaTwKyGkyyGov+shqL/7IashqBBrIQIrIBs7Q+SVcEAExXAAQnExJESRUjEkQiU4v/iYoDAIv9i/+I9PhBABGxi/+yCIv9sgcjshAisgGziYv+i/+I9N1B//Wxi/+yCIv+sgcjshAisgGziYoGACJJgABHBYv6FkkoTFBJTgK9RQFAAAMqsACLCL5ESVcAAUyBKVuMBCcKEkAABCcFsACL+4v9UIv+FklOAlCL/xZJTgJQAQFPA0xQJwlMUEm9RQFAAAQnHLAASb5ESVcIIIwBIluMBrxIi/5AADJGArGL/bIHi/+yCCOyECKyAbOLAYv7iwaI/zyLBCMJSRaLCIEpTwK7QAAGiwgiJxK7iYv9i/5wAEUBQAG5i/xAAAQnFbAAi/xyCESL/RJAAA+AC0VSUjplcnJSd21tsACLBjIQD0AABCcVsAAiK2VEJxRlSFcACLEjFklOAjIKgQSvi/yyGIAEs2I0pbIaTwOyGk8CshpMshonDLIashqBBrIQIrIBs7Q+SVcEAExXAAQnExJESRUjEkQiU0AABCcVsAAiK2VEJyBPBFBJTgMnIE8FUElOAowAIllJTgJOBCJZSYwCEkQnFGVISVcACE4CIltOAov8gBJjb250cm9sbGVkX2FkZHJlc3NlTE4DQQDgSwIVJRJBANgjQAAPgAtFUlI6ZXJySXdsdLAAsYv8shiABFrfM4+yGkyyGrIaJwyyGicMshonDLIagQayECKyAbYyEE8DC7IISbIHI7IQIrIBtov8Fk8CshiABGg147yyGrIagAGAshpLAbIagQayECKyASJJiwIMQQAyiwBXAgBLASQLSYwDW0mMB0EAGrZLAlcCAIsDW7IRSwGyFIsHshKBBLIQIrIBIwhC/8dGA7aL/LIYgARsw/YGshqBBrIQIrIBszIQSYwFiwYMQf46iwaLBQmLAYv7TwKI/WhC/ikiQv8lRgKxi/2yFIv/shKL/rIRgQSyECKyAbOLAYv7iwaI/UFC/gI=", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
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
var HyperSwapSDK = class extends _chunkZ5W34YZIjs.BaseSDK {
  constructor(params) {
    super({ factory: HyperSwapFactory, ...params }, _chunkZLCB7PYBjs.ENV_VAR_NAMES.HYPER_SWAP_APP_ID);
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
//# sourceMappingURL=chunk-T2Y7JJYJ.js.map
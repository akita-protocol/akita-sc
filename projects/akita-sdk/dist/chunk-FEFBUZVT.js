"use strict";Object.defineProperty(exports, "__esModule", {value: true}); var _class; var _class2;

var _chunkGIGYZ6YCjs = require('./chunk-GIGYZ6YC.js');


var _chunkA73G7K3Bjs = require('./chunk-A73G7K3B.js');


var _chunkYA4OODI3js = require('./chunk-YA4OODI3.js');

// src/hyper-swap/index.ts
var _algokitutils = require('@algorandfoundation/algokit-utils');

// src/generated/HyperSwapClient.ts
var _abi = require('@algorandfoundation/algokit-utils/abi');
var _appclient = require('@algorandfoundation/algokit-utils/app-client');
var _appfactory = require('@algorandfoundation/algokit-utils/app-factory');
var APP_SPEC = { "name": "HyperSwap", "structs": { "Object57CB3C34": [{ "name": "root", "type": "uint64" }, { "name": "data", "type": "uint64" }], "HashKey": [{ "name": "id", "type": "uint64" }, { "name": "hash", "type": "byte[32]" }], "HyperSwapMBRData": [{ "name": "offers", "type": "uint64" }, { "name": "participants", "type": "uint64" }, { "name": "hashes", "type": "uint64" }, { "name": "mm", "type": "Object57CB3C34" }], "OfferValue": [{ "name": "state", "type": "uint8" }, { "name": "root", "type": "byte[32]" }, { "name": "leaves", "type": "uint64" }, { "name": "escrowed", "type": "uint64" }, { "name": "participantsRoot", "type": "byte[32]" }, { "name": "participantsLeaves", "type": "uint64" }, { "name": "acceptances", "type": "uint64" }, { "name": "expiration", "type": "uint64" }], "ParticipantKey": [{ "name": "id", "type": "uint64" }, { "name": "address", "type": "address" }], "RefundValue": [{ "name": "amount", "type": "uint64" }, { "name": "payor", "type": "address" }] }, "methods": [{ "name": "create", "args": [{ "type": "string", "name": "version" }, { "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "offer", "args": [{ "type": "pay", "name": "payment" }, { "type": "byte[32]", "name": "root", "desc": "the merkle tree root of trades consisting of from address, recipient address, asset id & amount" }, { "type": "uint64", "name": "leaves", "desc": "the number of leaves in the tree" }, { "type": "byte[32]", "name": "participantsRoot", "desc": "the merkle tree root of participating addresses" }, { "type": "uint64", "name": "participantsLeaves" }, { "type": "uint64", "name": "expiration", "desc": "the unix timestamp that the offer auto-expires at if it has not been accepted by all participants" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Creates a merkle tree based atomic payment/xfer group", "events": [], "recommendations": {} }, { "name": "accept", "args": [{ "type": "pay", "name": "mbrPayment", "desc": "the payment to cover the MBR" }, { "type": "uint64", "name": "id", "desc": "the id of the offer being accepted" }, { "type": "byte[32][]", "name": "proof", "desc": "the bytes32 array proof of inclusion in the participants list" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Accepts an offer", "events": [], "recommendations": {} }, { "name": "escrow", "args": [{ "type": "pay", "name": "payment" }, { "type": "uint64", "name": "id", "desc": "the id of the offer" }, { "type": "address", "name": "receiver", "desc": "the recipient in the offer leaf" }, { "type": "uint64", "name": "amount", "desc": "the amount in the offer leaf" }, { "type": "byte[32][]", "name": "proof", "desc": "the proof to verify the details are part of the tree" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Escrows the assets in the trade for a given leaf in the tree", "events": [], "recommendations": {} }, { "name": "escrowAsa", "args": [{ "type": "pay", "name": "mbrPayment", "desc": "the payment to cover the MBR" }, { "type": "axfer", "name": "assetXfer", "desc": "the asset transfer to escrow the asa" }, { "type": "uint64", "name": "id", "desc": "the id of the offer" }, { "type": "address", "name": "receiver", "desc": "the recipient in the offer leaf" }, { "type": "uint64", "name": "asset", "desc": "the asset in the offer leaf" }, { "type": "uint64", "name": "amount", "desc": "the amount in the offer leaf" }, { "type": "byte[32][]", "name": "proof", "desc": "the proof to verify the details are part of the tree" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Escrows the assets in the trade for a given leaf in the tree", "events": [], "recommendations": {} }, { "name": "disburse", "args": [{ "type": "uint64", "name": "id", "desc": "the id of the offer" }, { "type": "uint64", "name": "receiverWallet", "desc": "the receiver's ARC58 wallet app id (0 if not an ARC58 wallet)" }, { "type": "address", "name": "receiver", "desc": "the recipient address in the leaf" }, { "type": "uint64", "name": "asset", "desc": "the asset being transferred" }, { "type": "uint64", "name": "amount", "desc": "the amount being transferred" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Disburses assets for a leaf in the tree, ensuring ordered processing", "events": [], "recommendations": {} }, { "name": "cancel", "args": [{ "type": "uint64", "name": "id", "desc": "the id of the offer being cancelled" }, { "type": "byte[32][]", "name": "proof", "desc": "a proof of inclusion in the participants list" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "withdraw", "args": [{ "type": "uint64", "name": "id", "desc": "the id of the cancelled offer" }, { "type": "address", "name": "receiver", "desc": "the receiver of the leaf's swap" }, { "type": "uint64", "name": "asset", "desc": "the asset of the leaf's swap" }, { "type": "uint64", "name": "amount", "desc": "the amount of the leaf's swap" }, { "type": "byte[32][]", "name": "proof", "desc": "the proof that the leaf is in the tree" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Withdraws your assets from a cancelled swap if they're escrowed", "events": [], "recommendations": {} }, { "name": "cleanupParticipant", "args": [{ "type": "uint64", "name": "id", "desc": "the id of the offer" }, { "type": "address", "name": "participant", "desc": "the participant address to clean up" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Cleans up participant box and refunds MBR\nCan only be called when offer is completed, cancelled+completed, or expired", "events": [], "recommendations": {} }, { "name": "cleanupOffer", "args": [{ "type": "uint64", "name": "id", "desc": "the id of the offer" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Cleans up the offer box after all participants have been cleaned up\nCan only be called when offer is completed, cancelled+completed, or expired", "events": [], "recommendations": {} }, { "name": "optIn", "args": [{ "type": "pay", "name": "payment", "desc": "The payment transaction" }, { "type": "uint64", "name": "asset", "desc": "The asset to be opted into" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "optin tells the contract to opt into an asa", "events": [], "recommendations": {} }, { "name": "update", "args": [{ "type": "string", "name": "newVersion" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["UpdateApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "mbr", "args": [], "returns": { "type": "(uint64,uint64,uint64,(uint64,uint64))", "struct": "HyperSwapMBRData" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 2, "bytes": 1 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "offerCursor": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "b2ZmZXJfY3Vyc29y", "desc": "global counter for offers" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" } }, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": { "offers": { "keyType": "uint64", "valueType": "OfferValue", "desc": "map of hyper swap offers", "prefix": "bw==" }, "participants": { "keyType": "ParticipantKey", "valueType": "RefundValue", "desc": "map of the participants in each swap", "prefix": "cA==" }, "hashes": { "keyType": "HashKey", "valueType": "RefundValue", "desc": "map of merkle tree hashes during escrow & disbursal phases", "prefix": "aA==" } } } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [2246], "errorMessage": "AAMM" }, { "pc": [822, 1150, 1522, 1929, 1996, 2582, 2873, 3043, 3195, 3302, 3380], "errorMessage": "Box must have value" }, { "pc": [946, 1336, 1709, 2196, 2753, 3024], "errorMessage": "Bytes has valid prefix" }, { "pc": [526], "errorMessage": "ERR:BROT" }, { "pc": [1350, 1723, 3038], "errorMessage": "ERR:CVLF" }, { "pc": [999], "errorMessage": "ERR:EACC" }, { "pc": [555, 568, 1027, 1040, 1363, 1379, 1758, 1771], "errorMessage": "ERR:IPAY" }, { "pc": [3547], "errorMessage": "ERR:IPMA" }, { "pc": [3525], "errorMessage": "ERR:IPMR" }, { "pc": [863, 1191, 1563, 1949, 2646, 2901, 3267, 3452], "errorMessage": "ERR:ISTE" }, { "pc": [3636], "errorMessage": "ERR:IUPG" }, { "pc": [1785, 1799, 1813], "errorMessage": "ERR:IXFR" }, { "pc": [1269, 1642], "errorMessage": "ERR:LAES" }, { "pc": [1991, 2957], "errorMessage": "ERR:LNES" }, { "pc": [2682], "errorMessage": "ERR:NACP" }, { "pc": [3607, 3673], "errorMessage": "ERR:NDAO" }, { "pc": [819, 1147, 1519, 1926, 2579, 2870, 3192, 3377], "errorMessage": "ERR:NOFR" }, { "pc": [3297], "errorMessage": "ERR:NPFD" }, { "pc": [960, 1231, 1603, 2767], "errorMessage": "ERR:NPRT" }, { "pc": [2918], "errorMessage": "ERR:NTWD" }, { "pc": [537, 875, 1203, 1575], "errorMessage": "ERR:OFEX" }, { "pc": [3469], "errorMessage": "ERR:PNCL" }, { "pc": [2088, 2123, 2210], "errorMessage": "ERR:RNOI" }, { "pc": [2111], "errorMessage": "ERR:RWMM" }, { "pc": [584, 644, 2093, 3599, 3665], "errorMessage": "application exists" }, { "pc": [572, 698, 894, 1284, 1657, 2127, 2214, 2701, 2972, 3592, 3611, 3658], "errorMessage": "check GlobalState exists" }, { "pc": [1014, 1066, 1405, 1416, 1839, 1850, 2058, 2066, 2777, 2785, 3111, 3115, 3125, 3325], "errorMessage": "index out of bounds" }, { "pc": [407, 794, 1122, 1494, 2235, 2239, 2554, 2845, 3575], "errorMessage": "invalid array length header" }, { "pc": [415, 3583], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [803, 1131, 1503, 2563, 2854], "errorMessage": "invalid number of bytes for arc4.dynamic_array<bytes[32]>" }, { "pc": [464, 488, 1103, 1465, 1890, 2816, 3176], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [426, 472, 496, 507, 784, 1092, 1111, 1454, 1473, 1483, 1866, 1878, 1898, 1908, 2544, 2805, 2824, 2834, 3165, 3361, 3503, 3651], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [951, 1341, 1714, 2201, 2758, 3029], "errorMessage": "invalid number of bytes for bool" }, { "pc": [1446], "errorMessage": "transaction type is axfer" }, { "pc": [452, 776, 1084, 1435, 3495], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDggMzIgMzQ5MDAgMjIyMjAwIDY4MjAwCiAgICBieXRlY2Jsb2NrICJha2l0YV9kYW8iICJvIiAiRVJSOklQQVkiICIiICJFUlI6Tk9GUiIgIkVSUjpJU1RFIiAiYWFsIiAicCIgMHgxNTFmN2M3NSAweDE0IDB4MGEgMHgwMDIwIDB4MmJmM2NjNWEgIkVSUjpPRkVYIiAiRVJSOk5QUlQiICJoIiAweDFlIDB4MDAwMCAweDNjICJvZmZlcl9jdXJzb3IiICJFUlI6Q1ZMRiIgIkVSUjpJWEZSIiAweDI4ICJFUlI6Uk5PSSIgInBhbCIgInZlcnNpb24iIDB4YTI0YzA2N2MgIkVSUjpMQUVTIiAiRVJSOkxORVMiIDB4MDAwMSAid2FsbGV0IiAiRVJSOk5EQU8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQwCiAgICAvLyBleHBvcnQgY2xhc3MgSHlwZXJTd2FwIGV4dGVuZHMgY2xhc3NlcyhCYXNlSHlwZXJTd2FwLCBVcGdyYWRlYWJsZUFraXRhQmFzZUNvbnRyYWN0LCBDb250cmFjdFdpdGhPcHRJbikgewogICAgcHVzaGJ5dGVzIDB4ZWE5MTgwZGQgLy8gbWV0aG9kICJ1cGRhdGUoc3RyaW5nKXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBtYWluX3VwZGF0ZV9yb3V0ZUA0CgptYWluX3N3aXRjaF9jYXNlX25leHRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDAKICAgIC8vIGV4cG9ydCBjbGFzcyBIeXBlclN3YXAgZXh0ZW5kcyBjbGFzc2VzKEJhc2VIeXBlclN3YXAsIFVwZ3JhZGVhYmxlQWtpdGFCYXNlQ29udHJhY3QsIENvbnRyYWN0V2l0aE9wdEluKSB7CiAgICB0eG4gT25Db21wbGV0aW9uCiAgICAhCiAgICBhc3NlcnQKICAgIHR4biBBcHBsaWNhdGlvbklECiAgICBieiBtYWluX2NyZWF0ZV9Ob09wQDIxCiAgICBwdXNoYnl0ZXNzIDB4MGRiM2E0NGIgMHhiZGUxYTExZSAweGQ4NWZlYmRkIDB4NDY2Zjg3MWEgMHg1NjZhNjJiMiAweDBjN2FiNDJlIDB4MDYzMTg2OGIgMHg2ODNiYjY3OCAweGQzZWUwNGYwIDB4Mzk0ZWFlYjIgMHgzM2U5MmM5NCAweDg1NGRlZGUwIDB4ODQwNzMzZGQgLy8gbWV0aG9kICJvZmZlcihwYXksYnl0ZVszMl0sdWludDY0LGJ5dGVbMzJdLHVpbnQ2NCx1aW50NjQpdm9pZCIsIG1ldGhvZCAiYWNjZXB0KHBheSx1aW50NjQsYnl0ZVszMl1bXSl2b2lkIiwgbWV0aG9kICJlc2Nyb3cocGF5LHVpbnQ2NCxhZGRyZXNzLHVpbnQ2NCxieXRlWzMyXVtdKXZvaWQiLCBtZXRob2QgImVzY3Jvd0FzYShwYXksYXhmZXIsdWludDY0LGFkZHJlc3MsdWludDY0LHVpbnQ2NCxieXRlWzMyXVtdKXZvaWQiLCBtZXRob2QgImRpc2J1cnNlKHVpbnQ2NCx1aW50NjQsYWRkcmVzcyx1aW50NjQsdWludDY0KXZvaWQiLCBtZXRob2QgImNhbmNlbCh1aW50NjQsYnl0ZVszMl1bXSl2b2lkIiwgbWV0aG9kICJ3aXRoZHJhdyh1aW50NjQsYWRkcmVzcyx1aW50NjQsdWludDY0LGJ5dGVbMzJdW10pdm9pZCIsIG1ldGhvZCAiY2xlYW51cFBhcnRpY2lwYW50KHVpbnQ2NCxhZGRyZXNzKXZvaWQiLCBtZXRob2QgImNsZWFudXBPZmZlcih1aW50NjQpdm9pZCIsIG1ldGhvZCAib3B0SW4ocGF5LHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJ1cGRhdGVBa2l0YURBTyh1aW50NjQpdm9pZCIsIG1ldGhvZCAib3BVcCgpdm9pZCIsIG1ldGhvZCAibWJyKCkodWludDY0LHVpbnQ2NCx1aW50NjQsKHVpbnQ2NCx1aW50NjQpKSIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIG9mZmVyIGFjY2VwdCBlc2Nyb3cgZXNjcm93QXNhIGRpc2J1cnNlIGNhbmNlbCB3aXRoZHJhdyBjbGVhbnVwUGFydGljaXBhbnQgY2xlYW51cE9mZmVyIG9wdEluIHVwZGF0ZUFraXRhREFPIG1haW5fb3BVcF9yb3V0ZUAxOCBtYWluX21icl9yb3V0ZUAxOQogICAgZXJyCgptYWluX21icl9yb3V0ZUAxOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2Jhc2UudHM6NgogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBwdXNoYnl0ZXMgMHgxNTFmN2M3NTAwMDAwMDAwMDAwMGM2ZDQwMDAwMDAwMDAwMDA4ODU0MDAwMDAwMDAwMDAwODg1NDAwMDAwMDAwMDAwMDlmYzQwMDAwMDAwMDAwMDA2YWE0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCm1haW5fb3BVcF9yb3V0ZUAxODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQxCiAgICAvLyBvcFVwKCk6IHZvaWQgeyB9CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgptYWluX2NyZWF0ZV9Ob09wQDIxOgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0MAogICAgLy8gZXhwb3J0IGNsYXNzIEh5cGVyU3dhcCBleHRlbmRzIGNsYXNzZXMoQmFzZUh5cGVyU3dhcCwgVXBncmFkZWFibGVBa2l0YUJhc2VDb250cmFjdCwgQ29udHJhY3RXaXRoT3B0SW4pIHsKICAgIHB1c2hieXRlcyAweGNkOWFkNjdlIC8vIG1ldGhvZCAiY3JlYXRlKHN0cmluZyx1aW50NjQpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIGNyZWF0ZQogICAgZXJyCgptYWluX3VwZGF0ZV9yb3V0ZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDYKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgdHhuIE9uQ29tcGxldGlvbgogICAgcHVzaGludCA0IC8vIFVwZGF0ZUFwcGxpY2F0aW9uCiAgICA9PQogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgICYmCiAgICBhc3NlcnQKICAgIGIgdXBkYXRlCgoKLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo6SHlwZXJTd2FwLmNyZWF0ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNyZWF0ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjYKICAgIC8vIEBhYmltZXRob2QoeyBvbkNyZWF0ZTogJ3JlcXVpcmUnIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI1CiAgICAvLyB2ZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogR2xvYmFsU3RhdGVLZXlWZXJzaW9uIH0pCiAgICBieXRlYyAyNSAvLyAidmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjgKICAgIC8vIHRoaXMudmVyc2lvbi52YWx1ZSA9IHZlcnNpb24KICAgIHVuY292ZXIgMgogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2OQogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSA9IGFraXRhREFPCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0NQogICAgLy8gb2ZmZXJDdXJzb3IgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBIeXBlclN3YXBHbG9iYWxTdGF0ZUtleU9mZmVyQ3Vyc29yIH0pCiAgICBieXRlYyAxOSAvLyAib2ZmZXJfY3Vyc29yIgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo3MAogICAgLy8gdGhpcy5vZmZlckN1cnNvci52YWx1ZSA9IDAKICAgIGludGNfMCAvLyAwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2NgogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjpIeXBlclN3YXAub2ZmZXJbcm91dGluZ10oKSAtPiB2b2lkOgpvZmZlcjoKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjg2LTkzCiAgICAvLyBvZmZlcigKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICByb290OiBieXRlczwzMj4sCiAgICAvLyAgIGxlYXZlczogdWludDY0LAogICAgLy8gICBwYXJ0aWNpcGFudHNSb290OiBieXRlczwzMj4sCiAgICAvLyAgIHBhcnRpY2lwYW50c0xlYXZlczogdWludDY0LAogICAgLy8gICBleHBpcmF0aW9uOiB1aW50NjQKICAgIC8vICkgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXBuIDIKICAgIGxlbgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBjb3ZlciAyCiAgICBkdXAKICAgIGxlbgogICAgZHVwCiAgICBjb3ZlciAzCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgMgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo5NAogICAgLy8gbG9nZ2VkQXNzZXJ0KHJvb3QgIT09IHBhcnRpY2lwYW50c1Jvb3QsIEVSUl9CQURfUk9PVFMpCiAgICAhPQogICAgYm56IG9mZmVyX2FmdGVyX2Fzc2VydEAzCiAgICBwdXNoYnl0ZXMgIkVSUjpCUk9UIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkJST1QKCm9mZmVyX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo5NQogICAgLy8gbG9nZ2VkQXNzZXJ0KGV4cGlyYXRpb24gPiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLCBFUlJfT0ZGRVJfRVhQSVJFRCkKICAgIGR1cAogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgPgogICAgYm56IG9mZmVyX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyAxMyAvLyAiRVJSOk9GRVgiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6T0ZFWAoKb2ZmZXJfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjEwMQogICAgLy8gY29uc3QgcGF5b3IgPSBwYXltZW50LnNlbmRlcgogICAgZGlnIDcKICAgIGR1cAogICAgZ3R4bnMgU2VuZGVyCiAgICBidXJ5IDEwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjEwMwogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfSU5WQUxJRF9QQVlNRU5UKQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IG9mZmVyX2FmdGVyX2Fzc2VydEA3CiAgICBieXRlY18yIC8vICJFUlI6SVBBWSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUEFZCgpvZmZlcl9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTA0CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IGh5cGVyU3dhcE9mZmVyTUJSQW1vdW50LCBFUlJfSU5WQUxJRF9QQVlNRU5UKQogICAgZGlnIDcKICAgIGd0eG5zIEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxMDAKICAgIC8vIGNvbnN0IGh5cGVyU3dhcE9mZmVyTUJSQW1vdW50OiB1aW50NjQgPSBjb3N0cy5vZmZlcnMgKyBjb3N0cy5wYXJ0aWNpcGFudHMgKyAobWV0YU1lcmtsZXNDb3N0ICogMikKICAgIGludGMgNSAvLyAyMjIyMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTA0CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IGh5cGVyU3dhcE9mZmVyTUJSQW1vdW50LCBFUlJfSU5WQUxJRF9QQVlNRU5UKQogICAgPT0KICAgIGJueiBvZmZlcl9hZnRlcl9hc3NlcnRAOQogICAgYnl0ZWNfMiAvLyAiRVJSOklQQVkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBBWQoKb2ZmZXJfYWZ0ZXJfYXNzZXJ0QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjEwNgogICAgLy8gY29uc3QgbWV0YU1lcmtsZXNBcHBJRCA9IGdldEFraXRhQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5tZXRhTWVya2xlcwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxMDYKICAgIC8vIGNvbnN0IG1ldGFNZXJrbGVzQXBwSUQgPSBnZXRBa2l0YUFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkubWV0YU1lcmtsZXMKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICBieXRlYyA2IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjEwNgogICAgLy8gY29uc3QgbWV0YU1lcmtsZXNBcHBJRCA9IGdldEFraXRhQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5tZXRhTWVya2xlcwogICAgcHVzaGludCA3MgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTA4LTExOQogICAgLy8gYWJpQ2FsbDx0eXBlb2YgTWV0YU1lcmtsZXMucHJvdG90eXBlLmFkZFJvb3Q+KHsKICAgIC8vICAgYXBwSWQ6IG1ldGFNZXJrbGVzQXBwSUQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKG1ldGFNZXJrbGVzQXBwSUQpLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ldGFNZXJrbGVzQ29zdCwKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBTdHJpbmcocm9vdCksCiAgICAvLyAgICAgcm9vdCwKICAgIC8vICAgICBNZXJrbGVUcmVlVHlwZVRyYWRlCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxMTIKICAgIC8vIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihtZXRhTWVya2xlc0FwcElEKS5hZGRyZXNzLAogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjk5CiAgICAvLyBjb25zdCBtZXRhTWVya2xlc0Nvc3Q6IHVpbnQ2NCA9IGNvc3RzLm1tLnJvb3QgKyBjb3N0cy5tbS5kYXRhCiAgICBpbnRjIDYgLy8gNjgyMDAKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjExMS0xMTQKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihtZXRhTWVya2xlc0FwcElEKS5hZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IG1ldGFNZXJrbGVzQ29zdCwKICAgIC8vIH0pLAogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxMDgtMTE5CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBNZXRhTWVya2xlcy5wcm90b3R5cGUuYWRkUm9vdD4oewogICAgLy8gICBhcHBJZDogbWV0YU1lcmtsZXNBcHBJRCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24obWV0YU1lcmtsZXNBcHBJRCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWV0YU1lcmtsZXNDb3N0LAogICAgLy8gICAgIH0pLAogICAgLy8gICAgIFN0cmluZyhyb290KSwKICAgIC8vICAgICByb290LAogICAgLy8gICAgIE1lcmtsZVRyZWVUeXBlVHJhZGUKICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTE1CiAgICAvLyBTdHJpbmcocm9vdCksCiAgICBkaWcgNgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIGRpZyA4CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxMTcKICAgIC8vIE1lcmtsZVRyZWVUeXBlVHJhZGUKICAgIHB1c2hpbnQgMwogICAgaXRvYgogICAgZGlnIDMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxMDgtMTE5CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBNZXRhTWVya2xlcy5wcm90b3R5cGUuYWRkUm9vdD4oewogICAgLy8gICBhcHBJZDogbWV0YU1lcmtsZXNBcHBJRCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24obWV0YU1lcmtsZXNBcHBJRCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWV0YU1lcmtsZXNDb3N0LAogICAgLy8gICAgIH0pLAogICAgLy8gICAgIFN0cmluZyhyb290KSwKICAgIC8vICAgICByb290LAogICAgLy8gICAgIE1lcmtsZVRyZWVUeXBlVHJhZGUKICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBieXRlYyAyNiAvLyBtZXRob2QgImFkZFJvb3QocGF5LHN0cmluZyxieXRlWzMyXSx1aW50NjQpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZGlnIDEKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkdXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxMjItMTMzCiAgICAvLyBhYmlDYWxsPHR5cGVvZiBNZXRhTWVya2xlcy5wcm90b3R5cGUuYWRkUm9vdD4oewogICAgLy8gICBhcHBJZDogbWV0YU1lcmtsZXNBcHBJRCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24obWV0YU1lcmtsZXNBcHBJRCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWV0YU1lcmtsZXNDb3N0LAogICAgLy8gICAgIH0pLAogICAgLy8gICAgIFN0cmluZyhwYXJ0aWNpcGFudHNSb290KSwKICAgIC8vICAgICBwYXJ0aWNpcGFudHNSb290LAogICAgLy8gICAgIE1lcmtsZVRyZWVUeXBlVHJhZGUKICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjEyNgogICAgLy8gcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKG1ldGFNZXJrbGVzQXBwSUQpLmFkZHJlc3MsCiAgICBkaWcgMgogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo5OQogICAgLy8gY29uc3QgbWV0YU1lcmtsZXNDb3N0OiB1aW50NjQgPSBjb3N0cy5tbS5yb290ICsgY29zdHMubW0uZGF0YQogICAgaW50YyA2IC8vIDY4MjAwCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxMjUtMTI4CiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogQXBwbGljYXRpb24obWV0YU1lcmtsZXNBcHBJRCkuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiBtZXRhTWVya2xlc0Nvc3QsCiAgICAvLyB9KSwKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTIyLTEzMwogICAgLy8gYWJpQ2FsbDx0eXBlb2YgTWV0YU1lcmtsZXMucHJvdG90eXBlLmFkZFJvb3Q+KHsKICAgIC8vICAgYXBwSWQ6IG1ldGFNZXJrbGVzQXBwSUQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKG1ldGFNZXJrbGVzQXBwSUQpLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ldGFNZXJrbGVzQ29zdCwKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBTdHJpbmcocGFydGljaXBhbnRzUm9vdCksCiAgICAvLyAgICAgcGFydGljaXBhbnRzUm9vdCwKICAgIC8vICAgICBNZXJrbGVUcmVlVHlwZVRyYWRlCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjEyOQogICAgLy8gU3RyaW5nKHBhcnRpY2lwYW50c1Jvb3QpLAogICAgZGlnIDUKICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBkaWcgNwogICAgZHVwCiAgICBjb3ZlciAyCiAgICBjb25jYXQKICAgIHVuY292ZXIgNAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjEyMi0xMzMKICAgIC8vIGFiaUNhbGw8dHlwZW9mIE1ldGFNZXJrbGVzLnByb3RvdHlwZS5hZGRSb290Pih7CiAgICAvLyAgIGFwcElkOiBtZXRhTWVya2xlc0FwcElELAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihtZXRhTWVya2xlc0FwcElEKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtZXRhTWVya2xlc0Nvc3QsCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgU3RyaW5nKHBhcnRpY2lwYW50c1Jvb3QpLAogICAgLy8gICAgIHBhcnRpY2lwYW50c1Jvb3QsCiAgICAvLyAgICAgTWVya2xlVHJlZVR5cGVUcmFkZQogICAgLy8gICBdLAogICAgLy8gfSkKICAgIGJ5dGVjIDI2IC8vIG1ldGhvZCAiYWRkUm9vdChwYXksc3RyaW5nLGJ5dGVbMzJdLHVpbnQ2NCl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkdXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTkKICAgIC8vIGNvbnN0IGlkID0gdGhpcy5vZmZlckN1cnNvci52YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDUKICAgIC8vIG9mZmVyQ3Vyc29yID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogSHlwZXJTd2FwR2xvYmFsU3RhdGVLZXlPZmZlckN1cnNvciB9KQogICAgYnl0ZWMgMTkgLy8gIm9mZmVyX2N1cnNvciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTkKICAgIC8vIGNvbnN0IGlkID0gdGhpcy5vZmZlckN1cnNvci52YWx1ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjAKICAgIC8vIHRoaXMub2ZmZXJDdXJzb3IudmFsdWUgKz0gMQogICAgZHVwCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0NQogICAgLy8gb2ZmZXJDdXJzb3IgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBIeXBlclN3YXBHbG9iYWxTdGF0ZUtleU9mZmVyQ3Vyc29yIH0pCiAgICBieXRlYyAxOSAvLyAib2ZmZXJfY3Vyc29yIgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2MAogICAgLy8gdGhpcy5vZmZlckN1cnNvci52YWx1ZSArPSAxCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxMDAKICAgIC8vIGNvbnN0IGh5cGVyU3dhcE9mZmVyTUJSQW1vdW50OiB1aW50NjQgPSBjb3N0cy5vZmZlcnMgKyBjb3N0cy5wYXJ0aWNpcGFudHMgKyAobWV0YU1lcmtsZXNDb3N0ICogMikKICAgIGludGMgNSAvLyAyMjIyMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTM4CiAgICAvLyB0aGlzLnBhcnRpY2lwYW50cyh7IGlkLCBhZGRyZXNzOiBUeG4uc2VuZGVyIH0pLnZhbHVlID0geyBwYXlvciwgYW1vdW50OiBoeXBlclN3YXBPZmZlck1CUkFtb3VudCB9CiAgICBpdG9iCiAgICBkaWcgMTIKICAgIGNvbmNhdAogICAgdHhuIFNlbmRlcgogICAgdW5jb3ZlciAyCiAgICBpdG9iCiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjUyCiAgICAvLyBwYXJ0aWNpcGFudHMgPSBCb3hNYXA8UGFydGljaXBhbnRLZXksIFJlZnVuZFZhbHVlPih7IGtleVByZWZpeDogSHlwZXJTd2FwQm94UHJlZml4UGFydGljaXBhbnRzIH0pCiAgICBieXRlYyA3IC8vICJwIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjEzOAogICAgLy8gdGhpcy5wYXJ0aWNpcGFudHMoeyBpZCwgYWRkcmVzczogVHhuLnNlbmRlciB9KS52YWx1ZSA9IHsgcGF5b3IsIGFtb3VudDogaHlwZXJTd2FwT2ZmZXJNQlJBbW91bnQgfQogICAgdW5jb3ZlciAyCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE0MgogICAgLy8gc3RhdGU6IFNUQVRFX09GRkVSRUQsCiAgICBieXRlYyAxMCAvLyAweDBhCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE0MS0xNTAKICAgIC8vIHRoaXMub2ZmZXJzKGlkKS52YWx1ZSA9IHsKICAgIC8vICAgc3RhdGU6IFNUQVRFX09GRkVSRUQsCiAgICAvLyAgIHJvb3QsCiAgICAvLyAgIGxlYXZlcywKICAgIC8vICAgZXNjcm93ZWQ6IDAsCiAgICAvLyAgIHBhcnRpY2lwYW50c1Jvb3QsCiAgICAvLyAgIHBhcnRpY2lwYW50c0xlYXZlcywKICAgIC8vICAgYWNjZXB0YW5jZXM6IDEsCiAgICAvLyAgIGV4cGlyYXRpb24sCiAgICAvLyB9CiAgICB1bmNvdmVyIDMKICAgIGNvbmNhdAogICAgZGlnIDcKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxNDUKICAgIC8vIGVzY3Jvd2VkOiAwLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTQxLTE1MAogICAgLy8gdGhpcy5vZmZlcnMoaWQpLnZhbHVlID0gewogICAgLy8gICBzdGF0ZTogU1RBVEVfT0ZGRVJFRCwKICAgIC8vICAgcm9vdCwKICAgIC8vICAgbGVhdmVzLAogICAgLy8gICBlc2Nyb3dlZDogMCwKICAgIC8vICAgcGFydGljaXBhbnRzUm9vdCwKICAgIC8vICAgcGFydGljaXBhbnRzTGVhdmVzLAogICAgLy8gICBhY2NlcHRhbmNlczogMSwKICAgIC8vICAgZXhwaXJhdGlvbiwKICAgIC8vIH0KICAgIGl0b2IKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBjb25jYXQKICAgIGRpZyAzCiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTQ4CiAgICAvLyBhY2NlcHRhbmNlczogMSwKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE0MS0xNTAKICAgIC8vIHRoaXMub2ZmZXJzKGlkKS52YWx1ZSA9IHsKICAgIC8vICAgc3RhdGU6IFNUQVRFX09GRkVSRUQsCiAgICAvLyAgIHJvb3QsCiAgICAvLyAgIGxlYXZlcywKICAgIC8vICAgZXNjcm93ZWQ6IDAsCiAgICAvLyAgIHBhcnRpY2lwYW50c1Jvb3QsCiAgICAvLyAgIHBhcnRpY2lwYW50c0xlYXZlcywKICAgIC8vICAgYWNjZXB0YW5jZXM6IDEsCiAgICAvLyAgIGV4cGlyYXRpb24sCiAgICAvLyB9CiAgICBpdG9iCiAgICBjb25jYXQKICAgIGRpZyAyCiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTAKICAgIC8vIG9mZmVycyA9IEJveE1hcDx1aW50NjQsIE9mZmVyVmFsdWU+KHsga2V5UHJlZml4OiBIeXBlclN3YXBCb3hQcmVmaXhPZmZlcnMgfSkKICAgIGJ5dGVjXzEgLy8gIm8iCiAgICB1bmNvdmVyIDIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxNDEtMTUwCiAgICAvLyB0aGlzLm9mZmVycyhpZCkudmFsdWUgPSB7CiAgICAvLyAgIHN0YXRlOiBTVEFURV9PRkZFUkVELAogICAgLy8gICByb290LAogICAgLy8gICBsZWF2ZXMsCiAgICAvLyAgIGVzY3Jvd2VkOiAwLAogICAgLy8gICBwYXJ0aWNpcGFudHNSb290LAogICAgLy8gICBwYXJ0aWNpcGFudHNMZWF2ZXMsCiAgICAvLyAgIGFjY2VwdGFuY2VzOiAxLAogICAgLy8gICBleHBpcmF0aW9uLAogICAgLy8gfQogICAgc3dhcAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo4Ni05MwogICAgLy8gb2ZmZXIoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgcm9vdDogYnl0ZXM8MzI+LAogICAgLy8gICBsZWF2ZXM6IHVpbnQ2NCwKICAgIC8vICAgcGFydGljaXBhbnRzUm9vdDogYnl0ZXM8MzI+LAogICAgLy8gICBwYXJ0aWNpcGFudHNMZWF2ZXM6IHVpbnQ2NCwKICAgIC8vICAgZXhwaXJhdGlvbjogdWludDY0CiAgICAvLyApIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjpIeXBlclN3YXAuYWNjZXB0W3JvdXRpbmddKCkgLT4gdm9pZDoKYWNjZXB0OgogICAgaW50Y18wIC8vIDAKICAgIGR1cAogICAgYnl0ZWNfMyAvLyAiIgogICAgZHVwbiAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE2MAogICAgLy8gYWNjZXB0KG1iclBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgaWQ6IHVpbnQ2NCwgcHJvb2Y6IFByb29mKSB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgY292ZXIgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDMyCiAgICAqCiAgICBwdXNoaW50IDIKICAgICsKICAgIHN3YXAKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGJ5dGVzWzMyXT4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTYyCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5vZmZlcnMoaWQpLmV4aXN0cywgRVJSX09GRkVSX05PVF9GT1VORCkKICAgIGl0b2IKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1MAogICAgLy8gb2ZmZXJzID0gQm94TWFwPHVpbnQ2NCwgT2ZmZXJWYWx1ZT4oeyBrZXlQcmVmaXg6IEh5cGVyU3dhcEJveFByZWZpeE9mZmVycyB9KQogICAgYnl0ZWNfMSAvLyAibyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE2MgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMub2ZmZXJzKGlkKS5leGlzdHMsIEVSUl9PRkZFUl9OT1RfRk9VTkQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBhY2NlcHRfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDQgLy8gIkVSUjpOT0ZSIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5PRlIKCmFjY2VwdF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTYzCiAgICAvLyBjb25zdCB7IHN0YXRlLCBleHBpcmF0aW9uLCBwYXJ0aWNpcGFudHNSb290LCBhY2NlcHRhbmNlcywgcGFydGljaXBhbnRzTGVhdmVzIH0gPSB0aGlzLm9mZmVycyhpZCkudmFsdWUKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGR1cAogICAgZXh0cmFjdCAwIDEKICAgIGRpZyAxCiAgICBwdXNoaW50IDk3CiAgICBleHRyYWN0X3VpbnQ2NAogICAgYnVyeSA5CiAgICBkaWcgMQogICAgZXh0cmFjdCA0OSAzMgogICAgYnVyeSAxMQogICAgZGlnIDEKICAgIHB1c2hpbnQgODkKICAgIGV4dHJhY3RfdWludDY0CiAgICBidXJ5IDEwCiAgICBzd2FwCiAgICBwdXNoaW50IDgxCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYnVyeSA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE2NQogICAgLy8gbG9nZ2VkQXNzZXJ0KHN0YXRlID09PSBTVEFURV9PRkZFUkVELCBFUlJfSU5WQUxJRF9TVEFURSkKICAgIGJ5dGVjIDEwIC8vIDB4MGEKICAgID09CiAgICBibnogYWNjZXB0X2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyA1IC8vICJFUlI6SVNURSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJU1RFCgphY2NlcHRfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE2NgogICAgLy8gbG9nZ2VkQXNzZXJ0KGV4cGlyYXRpb24gPiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLCBFUlJfT0ZGRVJfRVhQSVJFRCkKICAgIGRpZyA2CiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICA+CiAgICBibnogYWNjZXB0X2FmdGVyX2Fzc2VydEA3CiAgICBieXRlYyAxMyAvLyAiRVJSOk9GRVgiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6T0ZFWAoKYWNjZXB0X2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxNjgtMTc3CiAgICAvLyBjb25zdCBpc1BhcnRpY2lwYW50ID0gYWJpQ2FsbDx0eXBlb2YgTWV0YU1lcmtsZXMucHJvdG90eXBlLnZlcmlmeT4oewogICAgLy8gICBhcHBJZDogZ2V0QWtpdGFBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLm1ldGFNZXJrbGVzLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgU3RyaW5nKHBhcnRpY2lwYW50c1Jvb3QpLAogICAgLy8gICAgIHNoYTI1NihzaGEyNTYoVHhuLnNlbmRlci5ieXRlcykpLAogICAgLy8gICAgIHByb29mLAogICAgLy8gICAgIE1lcmtsZVRyZWVUeXBlVHJhZGUKICAgIC8vICAgXSwKICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE3MQogICAgLy8gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxNzIKICAgIC8vIFN0cmluZyhwYXJ0aWNpcGFudHNSb290KSwKICAgIGJ5dGVjIDExIC8vIDB4MDAyMAogICAgZGlnIDEwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTczCiAgICAvLyBzaGEyNTYoc2hhMjU2KFR4bi5zZW5kZXIuYnl0ZXMpKSwKICAgIHR4biBTZW5kZXIKICAgIHNoYTI1NgogICAgc2hhMjU2CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE3NQogICAgLy8gTWVya2xlVHJlZVR5cGVUcmFkZQogICAgcHVzaGludCAzCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE2OQogICAgLy8gYXBwSWQ6IGdldEFraXRhQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5tZXRhTWVya2xlcywKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTY5CiAgICAvLyBhcHBJZDogZ2V0QWtpdGFBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLm1ldGFNZXJrbGVzLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0KSkKICAgIGJ5dGVjIDYgLy8gImFhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTY5CiAgICAvLyBhcHBJZDogZ2V0QWtpdGFBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLm1ldGFNZXJrbGVzLAogICAgcHVzaGludCA3MgogICAgZXh0cmFjdF91aW50NjQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxNjgtMTc3CiAgICAvLyBjb25zdCBpc1BhcnRpY2lwYW50ID0gYWJpQ2FsbDx0eXBlb2YgTWV0YU1lcmtsZXMucHJvdG90eXBlLnZlcmlmeT4oewogICAgLy8gICBhcHBJZDogZ2V0QWtpdGFBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLm1ldGFNZXJrbGVzLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgU3RyaW5nKHBhcnRpY2lwYW50c1Jvb3QpLAogICAgLy8gICAgIHNoYTI1NihzaGEyNTYoVHhuLnNlbmRlci5ieXRlcykpLAogICAgLy8gICAgIHByb29mLAogICAgLy8gICAgIE1lcmtsZVRyZWVUeXBlVHJhZGUKICAgIC8vICAgXSwKICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBieXRlYyAxMiAvLyBtZXRob2QgInZlcmlmeShhZGRyZXNzLHN0cmluZyxieXRlWzMyXSxieXRlWzMyXVtdLHVpbnQ2NClib29sIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkaWcgMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBzd2FwCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWMgOCAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYm9vbAogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxNzkKICAgIC8vIGxvZ2dlZEFzc2VydChpc1BhcnRpY2lwYW50LCBFUlJfTk9UX0FfUEFSVElDSVBBTlQpCiAgICBibnogYWNjZXB0X2FmdGVyX2Fzc2VydEAxMAogICAgYnl0ZWMgMTQgLy8gIkVSUjpOUFJUIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5QUlQKCmFjY2VwdF9hZnRlcl9hc3NlcnRAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE4MgogICAgLy8gY29uc3Qgc2VuZGVyUGFydGljaXBhbnRLZXkgPSB7IGlkLCBhZGRyZXNzOiBUeG4uc2VuZGVyIH0KICAgIGRpZyAxCiAgICB0eG4gU2VuZGVyCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTgzCiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMucGFydGljaXBhbnRzKHNlbmRlclBhcnRpY2lwYW50S2V5KS5leGlzdHMsIEVSUl9BTFJFQURZX0FDQ0VQVEVEKQogICAgZHVwCiAgICBleHRyYWN0IDAgOAogICAgc3dhcAogICAgZXh0cmFjdCA4IDMyCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTIKICAgIC8vIHBhcnRpY2lwYW50cyA9IEJveE1hcDxQYXJ0aWNpcGFudEtleSwgUmVmdW5kVmFsdWU+KHsga2V5UHJlZml4OiBIeXBlclN3YXBCb3hQcmVmaXhQYXJ0aWNpcGFudHMgfSkKICAgIGJ5dGVjIDcgLy8gInAiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgYnVyeSAxMQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxODMKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5wYXJ0aWNpcGFudHMoc2VuZGVyUGFydGljaXBhbnRLZXkpLmV4aXN0cywgRVJSX0FMUkVBRFlfQUNDRVBURUQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGFjY2VwdF9hZnRlcl9hc3NlcnRAMTIKICAgIHB1c2hieXRlcyAiRVJSOkVBQ0MiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6RUFDQwoKYWNjZXB0X2FmdGVyX2Fzc2VydEAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTg1CiAgICAvLyBjb25zdCBuZXdBY2NlcHRhbmNlczogdWludDY0ID0gYWNjZXB0YW5jZXMgKyAxCiAgICBkaWcgNwogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGR1cAogICAgYnVyeSA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE4NgogICAgLy8gdGhpcy5vZmZlcnMoaWQpLnZhbHVlLmFjY2VwdGFuY2VzID0gbmV3QWNjZXB0YW5jZXMKICAgIGl0b2IKICAgIGRpZyAxCiAgICBwdXNoaW50IDg5CiAgICB1bmNvdmVyIDIKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE5MAogICAgLy8gbG9nZ2VkQXNzZXJ0KG1iclBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfSU5WQUxJRF9QQVlNRU5UKQogICAgZGlnIDMKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBhY2NlcHRfYWZ0ZXJfYXNzZXJ0QDE0CiAgICBieXRlY18yIC8vICJFUlI6SVBBWSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUEFZCgphY2NlcHRfYWZ0ZXJfYXNzZXJ0QDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxOTEKICAgIC8vIGxvZ2dlZEFzc2VydChtYnJQYXltZW50LmFtb3VudCA9PT0gY29zdHMucGFydGljaXBhbnRzLCBFUlJfSU5WQUxJRF9QQVlNRU5UKQogICAgZGlnIDMKICAgIGd0eG5zIEFtb3VudAogICAgaW50YyA0IC8vIDM0OTAwCiAgICA9PQogICAgYm56IGFjY2VwdF9hZnRlcl9hc3NlcnRAMTYKICAgIGJ5dGVjXzIgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCmFjY2VwdF9hZnRlcl9hc3NlcnRAMTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE5NQogICAgLy8gcGF5b3I6IG1iclBheW1lbnQuc2VuZGVyLAogICAgZGlnIDMKICAgIGd0eG5zIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxOTEKICAgIC8vIGxvZ2dlZEFzc2VydChtYnJQYXltZW50LmFtb3VudCA9PT0gY29zdHMucGFydGljaXBhbnRzLCBFUlJfSU5WQUxJRF9QQVlNRU5UKQogICAgaW50YyA0IC8vIDM0OTAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE5NC0xOTcKICAgIC8vIHRoaXMucGFydGljaXBhbnRzKHNlbmRlclBhcnRpY2lwYW50S2V5KS52YWx1ZSA9IHsKICAgIC8vICAgcGF5b3I6IG1iclBheW1lbnQuc2VuZGVyLAogICAgLy8gICBhbW91bnQ6IGNvc3RzLnBhcnRpY2lwYW50cwogICAgLy8gfQogICAgaXRvYgogICAgc3dhcAogICAgY29uY2F0CiAgICBkaWcgMTAKICAgIHN3YXAKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTk5CiAgICAvLyBpZiAocGFydGljaXBhbnRzTGVhdmVzID09PSBuZXdBY2NlcHRhbmNlcykgewogICAgZGlnIDQKICAgIGRpZyA2CiAgICA9PQogICAgYnogYWNjZXB0X2FmdGVyX2lmX2Vsc2VAMTgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjAwCiAgICAvLyB0aGlzLm9mZmVycyhpZCkudmFsdWUuc3RhdGUgPSBTVEFURV9FU0NST1dJTkcKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGJ5dGVjIDkgLy8gMHgxNAogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKCmFjY2VwdF9hZnRlcl9pZl9lbHNlQDE4OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxNjAKICAgIC8vIGFjY2VwdChtYnJQYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGlkOiB1aW50NjQsIHByb29mOiBQcm9vZikgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Okh5cGVyU3dhcC5lc2Nyb3dbcm91dGluZ10oKSAtPiB2b2lkOgplc2Nyb3c6CiAgICBpbnRjXzAgLy8gMAogICAgZHVwbiAyCiAgICBieXRlY18zIC8vICIiCiAgICBkdXBuIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjE0CiAgICAvLyBlc2Nyb3cocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBpZDogdWludDY0LCByZWNlaXZlcjogQWNjb3VudCwgYW1vdW50OiB1aW50NjQsIHByb29mOiBQcm9vZikgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgY292ZXIgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDMyCiAgICAqCiAgICBwdXNoaW50IDIKICAgICsKICAgIHN3YXAKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGJ5dGVzWzMyXT4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjE2CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5vZmZlcnMoaWQpLmV4aXN0cywgRVJSX09GRkVSX05PVF9GT1VORCkKICAgIGl0b2IKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1MAogICAgLy8gb2ZmZXJzID0gQm94TWFwPHVpbnQ2NCwgT2ZmZXJWYWx1ZT4oeyBrZXlQcmVmaXg6IEh5cGVyU3dhcEJveFByZWZpeE9mZmVycyB9KQogICAgYnl0ZWNfMSAvLyAibyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjIxNgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMub2ZmZXJzKGlkKS5leGlzdHMsIEVSUl9PRkZFUl9OT1RfRk9VTkQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBlc2Nyb3dfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDQgLy8gIkVSUjpOT0ZSIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5PRlIKCmVzY3Jvd19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjE3CiAgICAvLyBjb25zdCB7IHN0YXRlLCByb290LCBlc2Nyb3dlZCwgbGVhdmVzLCBleHBpcmF0aW9uIH0gPSB0aGlzLm9mZmVycyhpZCkudmFsdWUKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGR1cAogICAgZXh0cmFjdCAwIDEKICAgIGRpZyAxCiAgICBleHRyYWN0IDEgMzIKICAgIGJ1cnkgMTIKICAgIGRpZyAxCiAgICBwdXNoaW50IDQxCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYnVyeSAxMQogICAgZGlnIDEKICAgIHB1c2hpbnQgMzMKICAgIGV4dHJhY3RfdWludDY0CiAgICBidXJ5IDkKICAgIHN3YXAKICAgIHB1c2hpbnQgOTcKICAgIGV4dHJhY3RfdWludDY0CiAgICBidXJ5IDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjE5CiAgICAvLyBsb2dnZWRBc3NlcnQoc3RhdGUgPT09IFNUQVRFX0VTQ1JPV0lORywgRVJSX0lOVkFMSURfU1RBVEUpCiAgICBieXRlYyA5IC8vIDB4MTQKICAgID09CiAgICBibnogZXNjcm93X2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyA1IC8vICJFUlI6SVNURSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJU1RFCgplc2Nyb3dfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjIyMQogICAgLy8gbG9nZ2VkQXNzZXJ0KGV4cGlyYXRpb24gPiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLCBFUlJfT0ZGRVJfRVhQSVJFRCkKICAgIGRpZyA3CiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICA+CiAgICBibnogZXNjcm93X2FmdGVyX2Fzc2VydEA3CiAgICBieXRlYyAxMyAvLyAiRVJSOk9GRVgiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6T0ZFWAoKZXNjcm93X2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyMjMKICAgIC8vIGNvbnN0IHNlbmRlclBhcnRpY2lwYW50S2V5ID0geyBpZCwgYWRkcmVzczogVHhuLnNlbmRlciB9CiAgICBkaWcgMQogICAgdHhuIFNlbmRlcgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjIyNAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucGFydGljaXBhbnRzKHNlbmRlclBhcnRpY2lwYW50S2V5KS5leGlzdHMsIEVSUl9OT1RfQV9QQVJUSUNJUEFOVCkKICAgIGR1cAogICAgZXh0cmFjdCAwIDgKICAgIHN3YXAKICAgIGV4dHJhY3QgOCAzMgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjUyCiAgICAvLyBwYXJ0aWNpcGFudHMgPSBCb3hNYXA8UGFydGljaXBhbnRLZXksIFJlZnVuZFZhbHVlPih7IGtleVByZWZpeDogSHlwZXJTd2FwQm94UHJlZml4UGFydGljaXBhbnRzIH0pCiAgICBieXRlYyA3IC8vICJwIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjIyNAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucGFydGljaXBhbnRzKHNlbmRlclBhcnRpY2lwYW50S2V5KS5leGlzdHMsIEVSUl9OT1RfQV9QQVJUSUNJUEFOVCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGVzY3Jvd19hZnRlcl9hc3NlcnRAOQogICAgYnl0ZWMgMTQgLy8gIkVSUjpOUFJUIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5QUlQKCmVzY3Jvd19hZnRlcl9hc3NlcnRAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjI2CiAgICAvLyBjb25zdCBoYXNoID0gc2hhMjU2KHNoYTI1NihCeXRlc2Ake1R4bi5zZW5kZXIuYnl0ZXN9JHtyZWNlaXZlci5ieXRlc30ke2l0b2IoMCl9JHtpdG9iKGFtb3VudCl9YCkpCiAgICB0eG4gU2VuZGVyCiAgICBkaWcgNQogICAgY29uY2F0CiAgICBpbnRjXzAgLy8gMAogICAgaXRvYgogICAgY29uY2F0CiAgICBkaWcgNAogICAgaXRvYgogICAgY29uY2F0CiAgICBzaGEyNTYKICAgIHNoYTI1NgogICAgZHVwCiAgICBidXJ5IDEzCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjIyNwogICAgLy8gY29uc3QgaGFzaEtleTogSGFzaEtleSA9IHsgaWQsIGhhc2ggfQogICAgZGlnIDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1NAogICAgLy8gaGFzaGVzID0gQm94TWFwPEhhc2hLZXksIFJlZnVuZFZhbHVlPih7IGtleVByZWZpeDogSHlwZXJTd2FwQm94UHJlZml4SGFzaGVzIH0pCiAgICBieXRlYyAxNSAvLyAiaCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBidXJ5IDEyCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjIyOAogICAgLy8gbG9nZ2VkQXNzZXJ0KCF0aGlzLmhhc2hlcyhoYXNoS2V5KS5leGlzdHMsIEVSUl9MRUFGX0FMUkVBRFlfRVNDUk9XRUQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGVzY3Jvd19hZnRlcl9hc3NlcnRAMTEKICAgIGJ5dGVjIDI3IC8vICJFUlI6TEFFUyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpMQUVTCgplc2Nyb3dfYWZ0ZXJfYXNzZXJ0QDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyMzAtMjM5CiAgICAvLyBjb25zdCB2ZXJpZmllZCA9IGFiaUNhbGw8dHlwZW9mIE1ldGFNZXJrbGVzLnByb3RvdHlwZS52ZXJpZnk+KHsKICAgIC8vICAgYXBwSWQ6IGdldEFraXRhQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5tZXRhTWVya2xlcywKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIFN0cmluZyhyb290KSwKICAgIC8vICAgICBoYXNoLAogICAgLy8gICAgIHByb29mLAogICAgLy8gICAgIE1lcmtsZVRyZWVUeXBlVHJhZGUKICAgIC8vICAgXSwKICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjIzMwogICAgLy8gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyMzQKICAgIC8vIFN0cmluZyhyb290KSwKICAgIGJ5dGVjIDExIC8vIDB4MDAyMAogICAgZGlnIDExCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjM3CiAgICAvLyBNZXJrbGVUcmVlVHlwZVRyYWRlCiAgICBwdXNoaW50IDMKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjMxCiAgICAvLyBhcHBJZDogZ2V0QWtpdGFBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLm1ldGFNZXJrbGVzLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyMzEKICAgIC8vIGFwcElkOiBnZXRBa2l0YUFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkubWV0YU1lcmtsZXMsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NAogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgYnl0ZWMgNiAvLyAiYWFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyMzEKICAgIC8vIGFwcElkOiBnZXRBa2l0YUFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkubWV0YU1lcmtsZXMsCiAgICBwdXNoaW50IDcyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjIzMC0yMzkKICAgIC8vIGNvbnN0IHZlcmlmaWVkID0gYWJpQ2FsbDx0eXBlb2YgTWV0YU1lcmtsZXMucHJvdG90eXBlLnZlcmlmeT4oewogICAgLy8gICBhcHBJZDogZ2V0QWtpdGFBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLm1ldGFNZXJrbGVzLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgU3RyaW5nKHJvb3QpLAogICAgLy8gICAgIGhhc2gsCiAgICAvLyAgICAgcHJvb2YsCiAgICAvLyAgICAgTWVya2xlVHJlZVR5cGVUcmFkZQogICAgLy8gICBdLAogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGJ5dGVjIDEyIC8vIG1ldGhvZCAidmVyaWZ5KGFkZHJlc3Msc3RyaW5nLGJ5dGVbMzJdLGJ5dGVbMzJdW10sdWludDY0KWJvb2wiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyAxMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyAzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIHN3YXAKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlYyA4IC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBib29sCiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Yml0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI0MQogICAgLy8gbG9nZ2VkQXNzZXJ0KHZlcmlmaWVkLCBFUlJfQ0FOVF9WRVJJRllfTEVBRikKICAgIGJueiBlc2Nyb3dfYWZ0ZXJfYXNzZXJ0QDE0CiAgICBieXRlYyAyMCAvLyAiRVJSOkNWTEYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6Q1ZMRgoKZXNjcm93X2FmdGVyX2Fzc2VydEAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjQ1CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIEVSUl9JTlZBTElEX1BBWU1FTlQpCiAgICBkaWcgNQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IGVzY3Jvd19hZnRlcl9hc3NlcnRAMTYKICAgIGJ5dGVjXzIgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCmVzY3Jvd19hZnRlcl9hc3NlcnRAMTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI0NgogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSBhbW91bnQgKyBjb3N0cy5oYXNoZXMsIEVSUl9JTlZBTElEX1BBWU1FTlQpCiAgICBkaWcgNQogICAgZ3R4bnMgQW1vdW50CiAgICBkaWcgNAogICAgaW50YyA0IC8vIDM0OTAwCiAgICArCiAgICA9PQogICAgYm56IGVzY3Jvd19hZnRlcl9hc3NlcnRAMTgKICAgIGJ5dGVjXzIgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCmVzY3Jvd19hZnRlcl9hc3NlcnRAMTg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI1MAogICAgLy8gcGF5b3I6IHBheW1lbnQuc2VuZGVyLAogICAgZGlnIDUKICAgIGd0eG5zIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyNDYKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LmFtb3VudCA9PT0gYW1vdW50ICsgY29zdHMuaGFzaGVzLCBFUlJfSU5WQUxJRF9QQVlNRU5UKQogICAgaW50YyA0IC8vIDM0OTAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI0OS0yNTIKICAgIC8vIHRoaXMuaGFzaGVzKGhhc2hLZXkpLnZhbHVlID0gewogICAgLy8gICBwYXlvcjogcGF5bWVudC5zZW5kZXIsCiAgICAvLyAgIGFtb3VudDogY29zdHMuaGFzaGVzCiAgICAvLyB9CiAgICBpdG9iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGRpZyAxMQogICAgc3dhcAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyNTQKICAgIC8vIGNvbnN0IG5ld0VzY3Jvd2VkOiB1aW50NjQgPSBlc2Nyb3dlZCArIDEKICAgIGRpZyA4CiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyNTUKICAgIC8vIHRoaXMub2ZmZXJzKGlkKS52YWx1ZS5lc2Nyb3dlZCA9IG5ld0VzY3Jvd2VkCiAgICBkdXAKICAgIGl0b2IKICAgIGRpZyAyCiAgICBwdXNoaW50IDQxCiAgICB1bmNvdmVyIDIKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI1OAogICAgLy8gaWYgKGxlYXZlcyA9PT0gbmV3RXNjcm93ZWQpIHsKICAgIGRpZyA3CiAgICA9PQogICAgYnogZXNjcm93X2FmdGVyX2lmX2Vsc2VAMjAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjU5CiAgICAvLyB0aGlzLm9mZmVycyhpZCkudmFsdWUuc3RhdGUgPSBTVEFURV9ESVNCVVJTSU5HCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBieXRlYyAxNiAvLyAweDFlCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwoKZXNjcm93X2FmdGVyX2lmX2Vsc2VAMjA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjIxNAogICAgLy8gZXNjcm93KHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgaWQ6IHVpbnQ2NCwgcmVjZWl2ZXI6IEFjY291bnQsIGFtb3VudDogdWludDY0LCBwcm9vZjogUHJvb2YpIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjpIeXBlclN3YXAuZXNjcm93QXNhW3JvdXRpbmddKCkgLT4gdm9pZDoKZXNjcm93QXNhOgogICAgaW50Y18wIC8vIDAKICAgIGR1cG4gMgogICAgYnl0ZWNfMyAvLyAiIgogICAgZHVwbiAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI3My0yODEKICAgIC8vIGVzY3Jvd0FzYSgKICAgIC8vICAgbWJyUGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgaWQ6IHVpbnQ2NCwKICAgIC8vICAgcmVjZWl2ZXI6IEFjY291bnQsCiAgICAvLyAgIGFzc2V0OiB1aW50NjQsCiAgICAvLyAgIGFtb3VudDogdWludDY0LAogICAgLy8gICBwcm9vZjogUHJvb2YKICAgIC8vICkgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIHB1c2hpbnQgMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDQgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA1CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAzMgogICAgKgogICAgcHVzaGludCAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxieXRlc1szMl0+CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI4MwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMub2ZmZXJzKGlkKS5leGlzdHMsIEVSUl9PRkZFUl9OT1RfRk9VTkQpCiAgICBpdG9iCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTAKICAgIC8vIG9mZmVycyA9IEJveE1hcDx1aW50NjQsIE9mZmVyVmFsdWU+KHsga2V5UHJlZml4OiBIeXBlclN3YXBCb3hQcmVmaXhPZmZlcnMgfSkKICAgIGJ5dGVjXzEgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyODMKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLm9mZmVycyhpZCkuZXhpc3RzLCBFUlJfT0ZGRVJfTk9UX0ZPVU5EKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogZXNjcm93QXNhX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA0IC8vICJFUlI6Tk9GUiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOT0ZSCgplc2Nyb3dBc2FfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI4NAogICAgLy8gY29uc3QgeyBzdGF0ZSwgcm9vdCwgZXNjcm93ZWQsIGxlYXZlcywgZXhwaXJhdGlvbiB9ID0gdGhpcy5vZmZlcnMoaWQpLnZhbHVlCiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBkdXAKICAgIGV4dHJhY3QgMCAxCiAgICBkaWcgMQogICAgZXh0cmFjdCAxIDMyCiAgICBidXJ5IDE1CiAgICBkaWcgMQogICAgcHVzaGludCA0MQogICAgZXh0cmFjdF91aW50NjQKICAgIGJ1cnkgMTQKICAgIGRpZyAxCiAgICBwdXNoaW50IDMzCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYnVyeSAxMgogICAgc3dhcAogICAgcHVzaGludCA5NwogICAgZXh0cmFjdF91aW50NjQKICAgIGJ1cnkgMTIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Mjg2CiAgICAvLyBsb2dnZWRBc3NlcnQoc3RhdGUgPT09IFNUQVRFX0VTQ1JPV0lORywgRVJSX0lOVkFMSURfU1RBVEUpCiAgICBieXRlYyA5IC8vIDB4MTQKICAgID09CiAgICBibnogZXNjcm93QXNhX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyA1IC8vICJFUlI6SVNURSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJU1RFCgplc2Nyb3dBc2FfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI4OAogICAgLy8gbG9nZ2VkQXNzZXJ0KGV4cGlyYXRpb24gPiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLCBFUlJfT0ZGRVJfRVhQSVJFRCkKICAgIGRpZyAxMAogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgPgogICAgYm56IGVzY3Jvd0FzYV9hZnRlcl9hc3NlcnRANwogICAgYnl0ZWMgMTMgLy8gIkVSUjpPRkVYIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk9GRVgKCmVzY3Jvd0FzYV9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjkwCiAgICAvLyBjb25zdCBzZW5kZXJQYXJ0aWNpcGFudEtleSA9IHsgaWQsIGFkZHJlc3M6IFR4bi5zZW5kZXIgfQogICAgZGlnIDEKICAgIHR4biBTZW5kZXIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyOTEKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnBhcnRpY2lwYW50cyhzZW5kZXJQYXJ0aWNpcGFudEtleSkuZXhpc3RzLCBFUlJfTk9UX0FfUEFSVElDSVBBTlQpCiAgICBkdXAKICAgIGV4dHJhY3QgMCA4CiAgICBzd2FwCiAgICBleHRyYWN0IDggMzIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1MgogICAgLy8gcGFydGljaXBhbnRzID0gQm94TWFwPFBhcnRpY2lwYW50S2V5LCBSZWZ1bmRWYWx1ZT4oeyBrZXlQcmVmaXg6IEh5cGVyU3dhcEJveFByZWZpeFBhcnRpY2lwYW50cyB9KQogICAgYnl0ZWMgNyAvLyAicCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyOTEKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnBhcnRpY2lwYW50cyhzZW5kZXJQYXJ0aWNpcGFudEtleSkuZXhpc3RzLCBFUlJfTk9UX0FfUEFSVElDSVBBTlQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBlc2Nyb3dBc2FfYWZ0ZXJfYXNzZXJ0QDkKICAgIGJ5dGVjIDE0IC8vICJFUlI6TlBSVCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOUFJUCgplc2Nyb3dBc2FfYWZ0ZXJfYXNzZXJ0QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI5MwogICAgLy8gY29uc3QgaGFzaCA9IHNoYTI1NihzaGEyNTYoQnl0ZXNgJHtUeG4uc2VuZGVyLmJ5dGVzfSR7cmVjZWl2ZXIuYnl0ZXN9JHtpdG9iKGFzc2V0KX0ke2l0b2IoYW1vdW50KX1gKSkKICAgIHR4biBTZW5kZXIKICAgIGRpZyA2CiAgICBjb25jYXQKICAgIGRpZyA1CiAgICBpdG9iCiAgICBjb25jYXQKICAgIGRpZyA0CiAgICBpdG9iCiAgICBjb25jYXQKICAgIHNoYTI1NgogICAgc2hhMjU2CiAgICBkdXAKICAgIGJ1cnkgMTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Mjk0CiAgICAvLyBjb25zdCBoYXNoS2V5OiBIYXNoS2V5ID0geyBpZCwgaGFzaCB9CiAgICBkaWcgMgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU0CiAgICAvLyBoYXNoZXMgPSBCb3hNYXA8SGFzaEtleSwgUmVmdW5kVmFsdWU+KHsga2V5UHJlZml4OiBIeXBlclN3YXBCb3hQcmVmaXhIYXNoZXMgfSkKICAgIGJ5dGVjIDE1IC8vICJoIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGJ1cnkgMTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Mjk1CiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMuaGFzaGVzKGhhc2hLZXkpLmV4aXN0cywgRVJSX0xFQUZfQUxSRUFEWV9FU0NST1dFRCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogZXNjcm93QXNhX2FmdGVyX2Fzc2VydEAxMQogICAgYnl0ZWMgMjcgLy8gIkVSUjpMQUVTIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkxBRVMKCmVzY3Jvd0FzYV9hZnRlcl9hc3NlcnRAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI5Ny0zMDYKICAgIC8vIGNvbnN0IHZlcmlmaWVkID0gYWJpQ2FsbDx0eXBlb2YgTWV0YU1lcmtsZXMucHJvdG90eXBlLnZlcmlmeT4oewogICAgLy8gICBhcHBJZDogZ2V0QWtpdGFBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLm1ldGFNZXJrbGVzLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgU3RyaW5nKHJvb3QpLAogICAgLy8gICAgIGhhc2gsCiAgICAvLyAgICAgcHJvb2YsCiAgICAvLyAgICAgTWVya2xlVHJlZVR5cGVUcmFkZQogICAgLy8gICBdLAogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzAwCiAgICAvLyBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjMwMQogICAgLy8gU3RyaW5nKHJvb3QpLAogICAgYnl0ZWMgMTEgLy8gMHgwMDIwCiAgICBkaWcgMTQKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozMDQKICAgIC8vIE1lcmtsZVRyZWVUeXBlVHJhZGUKICAgIHB1c2hpbnQgMwogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyOTgKICAgIC8vIGFwcElkOiBnZXRBa2l0YUFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkubWV0YU1lcmtsZXMsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI5OAogICAgLy8gYXBwSWQ6IGdldEFraXRhQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5tZXRhTWVya2xlcywKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICBieXRlYyA2IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI5OAogICAgLy8gYXBwSWQ6IGdldEFraXRhQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5tZXRhTWVya2xlcywKICAgIHB1c2hpbnQgNzIKICAgIGV4dHJhY3RfdWludDY0CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Mjk3LTMwNgogICAgLy8gY29uc3QgdmVyaWZpZWQgPSBhYmlDYWxsPHR5cGVvZiBNZXRhTWVya2xlcy5wcm90b3R5cGUudmVyaWZ5Pih7CiAgICAvLyAgIGFwcElkOiBnZXRBa2l0YUFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkubWV0YU1lcmtsZXMsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBTdHJpbmcocm9vdCksCiAgICAvLyAgICAgaGFzaCwKICAgIC8vICAgICBwcm9vZiwKICAgIC8vICAgICBNZXJrbGVUcmVlVHlwZVRyYWRlCiAgICAvLyAgIF0sCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgYnl0ZWMgMTIgLy8gbWV0aG9kICJ2ZXJpZnkoYWRkcmVzcyxzdHJpbmcsYnl0ZVszMl0sYnl0ZVszMl1bXSx1aW50NjQpYm9vbCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZGlnIDE1CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZGlnIDMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgc3dhcAogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjIDggLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18xIC8vIDEKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGJvb2wKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzA4CiAgICAvLyBsb2dnZWRBc3NlcnQodmVyaWZpZWQsIEVSUl9DQU5UX1ZFUklGWV9MRUFGKQogICAgYm56IGVzY3Jvd0FzYV9hZnRlcl9hc3NlcnRAMTQKICAgIGJ5dGVjIDIwIC8vICJFUlI6Q1ZMRiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpDVkxGCgplc2Nyb3dBc2FfYWZ0ZXJfYXNzZXJ0QDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozMTIKICAgIC8vIGxldCBtYnJBbW91bnQgPSBjb3N0cy5oYXNoZXMKICAgIGludGMgNCAvLyAzNDkwMAogICAgYnVyeSA5CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjMxNQogICAgLy8gaWYgKCFyZWNlaXZlci5pc09wdGVkSW4oQXNzZXQoYXNzZXQpKSkgewogICAgZGlnIDUKICAgIGRpZyA1CiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYm56IGVzY3Jvd0FzYV9hZnRlcl9pZl9lbHNlQDE2CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjMxMgogICAgLy8gbGV0IG1ickFtb3VudCA9IGNvc3RzLmhhc2hlcwogICAgaW50YyA0IC8vIDM0OTAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjMxNgogICAgLy8gbWJyQW1vdW50ICs9IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICArCiAgICBidXJ5IDkKCmVzY3Jvd0FzYV9hZnRlcl9pZl9lbHNlQDE2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozMTkKICAgIC8vIGxvZ2dlZEFzc2VydChtYnJQYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgRVJSX0lOVkFMSURfUEFZTUVOVCkKICAgIGRpZyA3CiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogZXNjcm93QXNhX2FmdGVyX2Fzc2VydEAxOAogICAgYnl0ZWNfMiAvLyAiRVJSOklQQVkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBBWQoKZXNjcm93QXNhX2FmdGVyX2Fzc2VydEAxODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzIwCiAgICAvLyBsb2dnZWRBc3NlcnQobWJyUGF5bWVudC5hbW91bnQgPT09IG1ickFtb3VudCwgRVJSX0lOVkFMSURfUEFZTUVOVCkKICAgIGRpZyA3CiAgICBndHhucyBBbW91bnQKICAgIGRpZyA5CiAgICA9PQogICAgYm56IGVzY3Jvd0FzYV9hZnRlcl9hc3NlcnRAMjAKICAgIGJ5dGVjXzIgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCmVzY3Jvd0FzYV9hZnRlcl9hc3NlcnRAMjA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjMyMgogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci5hc3NldFJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgRVJSX0lOVkFMSURfVFJBTlNGRVIpCiAgICBkaWcgNgogICAgZ3R4bnMgQXNzZXRSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogZXNjcm93QXNhX2FmdGVyX2Fzc2VydEAyMgogICAgYnl0ZWMgMjEgLy8gIkVSUjpJWEZSIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklYRlIKCmVzY3Jvd0FzYV9hZnRlcl9hc3NlcnRAMjI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjMyMwogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci54ZmVyQXNzZXQgPT09IEFzc2V0KGFzc2V0KSwgRVJSX0lOVkFMSURfVFJBTlNGRVIpCiAgICBkaWcgNgogICAgZ3R4bnMgWGZlckFzc2V0CiAgICBkaWcgNQogICAgPT0KICAgIGJueiBlc2Nyb3dBc2FfYWZ0ZXJfYXNzZXJ0QDI0CiAgICBieXRlYyAyMSAvLyAiRVJSOklYRlIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVhGUgoKZXNjcm93QXNhX2FmdGVyX2Fzc2VydEAyNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzI0CiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLmFzc2V0QW1vdW50ID09PSBhbW91bnQsIEVSUl9JTlZBTElEX1RSQU5TRkVSKQogICAgZGlnIDYKICAgIGd0eG5zIEFzc2V0QW1vdW50CiAgICBkaWcgNAogICAgPT0KICAgIGJueiBlc2Nyb3dBc2FfYWZ0ZXJfYXNzZXJ0QDI2CiAgICBieXRlYyAyMSAvLyAiRVJSOklYRlIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVhGUgoKZXNjcm93QXNhX2FmdGVyX2Fzc2VydEAyNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzI4CiAgICAvLyBwYXlvcjogbWJyUGF5bWVudC5zZW5kZXIsCiAgICBkaWcgNwogICAgZ3R4bnMgU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjMyNy0zMzAKICAgIC8vIHRoaXMuaGFzaGVzKGhhc2hLZXkpLnZhbHVlID0gewogICAgLy8gICBwYXlvcjogbWJyUGF5bWVudC5zZW5kZXIsCiAgICAvLyAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyB9CiAgICBkaWcgOQogICAgaXRvYgogICAgc3dhcAogICAgY29uY2F0CiAgICBkaWcgMTQKICAgIHN3YXAKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzMyCiAgICAvLyBjb25zdCBuZXdFc2Nyb3dlZDogdWludDY0ID0gZXNjcm93ZWQgKyAxCiAgICBkaWcgMTEKICAgIGludGNfMSAvLyAxCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjMzMwogICAgLy8gdGhpcy5vZmZlcnMoaWQpLnZhbHVlLmVzY3Jvd2VkID0gbmV3RXNjcm93ZWQKICAgIGR1cAogICAgaXRvYgogICAgZGlnIDIKICAgIHB1c2hpbnQgNDEKICAgIHVuY292ZXIgMgogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzM1CiAgICAvLyBpZiAobGVhdmVzID09PSBuZXdFc2Nyb3dlZCkgewogICAgZGlnIDEwCiAgICA9PQogICAgYnogZXNjcm93QXNhX2FmdGVyX2lmX2Vsc2VAMjgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzM2CiAgICAvLyB0aGlzLm9mZmVycyhpZCkudmFsdWUuc3RhdGUgPSBTVEFURV9ESVNCVVJTSU5HCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBieXRlYyAxNiAvLyAweDFlCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwoKZXNjcm93QXNhX2FmdGVyX2lmX2Vsc2VAMjg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI3My0yODEKICAgIC8vIGVzY3Jvd0FzYSgKICAgIC8vICAgbWJyUGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgaWQ6IHVpbnQ2NCwKICAgIC8vICAgcmVjZWl2ZXI6IEFjY291bnQsCiAgICAvLyAgIGFzc2V0OiB1aW50NjQsCiAgICAvLyAgIGFtb3VudDogdWludDY0LAogICAgLy8gICBwcm9vZjogUHJvb2YKICAgIC8vICkgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Okh5cGVyU3dhcC5kaXNidXJzZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmRpc2J1cnNlOgogICAgaW50Y18wIC8vIDAKICAgIGR1cG4gNwogICAgYnl0ZWNfMyAvLyAiIgogICAgZHVwbiA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjM0OQogICAgLy8gZGlzYnVyc2UoaWQ6IHVpbnQ2NCwgcmVjZWl2ZXJXYWxsZXQ6IHVpbnQ2NCwgcmVjZWl2ZXI6IEFjY291bnQsIGFzc2V0OiB1aW50NjQsIGFtb3VudDogdWludDY0KSB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgY292ZXIgMgogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozNTEKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLm9mZmVycyhpZCkuZXhpc3RzLCBFUlJfT0ZGRVJfTk9UX0ZPVU5EKQogICAgaXRvYgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjUwCiAgICAvLyBvZmZlcnMgPSBCb3hNYXA8dWludDY0LCBPZmZlclZhbHVlPih7IGtleVByZWZpeDogSHlwZXJTd2FwQm94UHJlZml4T2ZmZXJzIH0pCiAgICBieXRlY18xIC8vICJvIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzUxCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5vZmZlcnMoaWQpLmV4aXN0cywgRVJSX09GRkVSX05PVF9GT1VORCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGRpc2J1cnNlX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA0IC8vICJFUlI6Tk9GUiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOT0ZSCgpkaXNidXJzZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzUyCiAgICAvLyBjb25zdCB7IHN0YXRlLCBlc2Nyb3dlZCB9ID0gdGhpcy5vZmZlcnMoaWQpLnZhbHVlCiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBkdXAKICAgIGV4dHJhY3QgMCAxCiAgICBzd2FwCiAgICBwdXNoaW50IDQxCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYnVyeSAxMwogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozNTQKICAgIC8vIGxvZ2dlZEFzc2VydChzdGF0ZSA9PT0gU1RBVEVfRElTQlVSU0lORywgRVJSX0lOVkFMSURfU1RBVEUpCiAgICBieXRlYyAxNiAvLyAweDFlCiAgICA9PQogICAgYm56IGRpc2J1cnNlX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyA1IC8vICJFUlI6SVNURSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJU1RFCgpkaXNidXJzZV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzU3CiAgICAvLyBjb25zdCBoYXNoID0gc2hhMjU2KHNoYTI1NihCeXRlc2Ake1R4bi5zZW5kZXIuYnl0ZXN9JHtyZWNlaXZlci5ieXRlc30ke2l0b2IoYXNzZXQpfSR7aXRvYihhbW91bnQpfWApKQogICAgdHhuIFNlbmRlcgogICAgZGlnIDUKICAgIGNvbmNhdAogICAgZGlnIDQKICAgIGl0b2IKICAgIGR1cAogICAgYnVyeSAxOAogICAgY29uY2F0CiAgICBkaWcgMwogICAgaXRvYgogICAgZHVwCiAgICBidXJ5IDE3CiAgICBjb25jYXQKICAgIHNoYTI1NgogICAgc2hhMjU2CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjM1OAogICAgLy8gY29uc3QgaGFzaEtleTogSGFzaEtleSA9IHsgaWQsIGhhc2ggfQogICAgZGlnIDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1NAogICAgLy8gaGFzaGVzID0gQm94TWFwPEhhc2hLZXksIFJlZnVuZFZhbHVlPih7IGtleVByZWZpeDogSHlwZXJTd2FwQm94UHJlZml4SGFzaGVzIH0pCiAgICBieXRlYyAxNSAvLyAiaCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBidXJ5IDE5CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjM1OQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuaGFzaGVzKGhhc2hLZXkpLmV4aXN0cywgRVJSX0xFQUZfTk9UX0VTQ1JPV0VEKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogZGlzYnVyc2VfYWZ0ZXJfYXNzZXJ0QDcKICAgIGJ5dGVjIDI4IC8vICJFUlI6TE5FUyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpMTkVTCgpkaXNidXJzZV9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzYxCiAgICAvLyBsZXQgeyBwYXlvciwgYW1vdW50OiByZWZ1bmRBbW91bnQgfSA9IHRoaXMuaGFzaGVzKGhhc2hLZXkpLnZhbHVlCiAgICBkaWcgMTcKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGR1cAogICAgZXh0cmFjdCA4IDMyCiAgICBidXJ5IDE5CiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGJ1cnkgMTAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzYyCiAgICAvLyB0aGlzLmhhc2hlcyhoYXNoS2V5KS5kZWxldGUoKQogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjM2NQogICAgLy8gaWYgKGFzc2V0ID09PSAwKSB7CiAgICBkaWcgMwogICAgYm56IGRpc2J1cnNlX2Vsc2VfYm9keUAxMQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozNjctMzY5CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsgYW1vdW50LCByZWNlaXZlciB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIGRpZyA0CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBkaWcgMgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzY3LTM2OAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7IGFtb3VudCwgcmVjZWl2ZXIgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzY3LTM2OQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7IGFtb3VudCwgcmVjZWl2ZXIgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozNzItMzc3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IHJlZnVuZEFtb3VudCwKICAgIC8vICAgICByZWNlaXZlcjogcGF5b3IsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgZGlnIDE2CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBkaWcgOAogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzcyLTM3NgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50OiByZWZ1bmRBbW91bnQsCiAgICAvLyAgICAgcmVjZWl2ZXI6IHBheW9yLAogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozNzItMzc3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IHJlZnVuZEFtb3VudCwKICAgIC8vICAgICByZWNlaXZlcjogcGF5b3IsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKCmRpc2J1cnNlX2FmdGVyX2lmX2Vsc2VAMjk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQzNwogICAgLy8gY29uc3QgbmV3RXNjcm93ZWQ6IHVpbnQ2NCA9IGVzY3Jvd2VkIC0gMQogICAgZGlnIDExCiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0MzgKICAgIC8vIHRoaXMub2ZmZXJzKGlkKS52YWx1ZS5lc2Nyb3dlZCA9IG5ld0VzY3Jvd2VkCiAgICBkdXAKICAgIGl0b2IKICAgIGRpZyAyCiAgICBwdXNoaW50IDQxCiAgICB1bmNvdmVyIDIKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQ0MAogICAgLy8gaWYgKG5ld0VzY3Jvd2VkID09PSAwKSB7CiAgICBibnogZGlzYnVyc2VfYWZ0ZXJfaWZfZWxzZUAzMQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0NDEKICAgIC8vIHRoaXMub2ZmZXJzKGlkKS52YWx1ZS5zdGF0ZSA9IFNUQVRFX0NPTVBMRVRFRAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgYnl0ZWMgMjIgLy8gMHgyOAogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKCmRpc2J1cnNlX2FmdGVyX2lmX2Vsc2VAMzE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjM0OQogICAgLy8gZGlzYnVyc2UoaWQ6IHVpbnQ2NCwgcmVjZWl2ZXJXYWxsZXQ6IHVpbnQ2NCwgcmVjZWl2ZXI6IEFjY291bnQsIGFzc2V0OiB1aW50NjQsIGFtb3VudDogdWludDY0KSB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpkaXNidXJzZV9lbHNlX2JvZHlAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjM4MAogICAgLy8gY29uc3QgWywgaXNPcHRlZEluXSA9IEFzc2V0SG9sZGluZy5hc3NldEJhbGFuY2UocmVjZWl2ZXIsIGFzc2V0KQogICAgZGlnIDQKICAgIGRpZyA0CiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozODIKICAgIC8vIGlmICghaXNPcHRlZEluKSB7CiAgICBibnogZGlzYnVyc2VfZWxzZV9ib2R5QDI1CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjM4NAogICAgLy8gbG9nZ2VkQXNzZXJ0KHJlY2VpdmVyV2FsbGV0ICE9PSAwLCBFUlJfUkVDRUlWRVJfTk9UX09QVEVEX0lOKQogICAgZGlnIDUKICAgIGJueiBkaXNidXJzZV9hZnRlcl9hc3NlcnRAMTQKICAgIGJ5dGVjIDIzIC8vICJFUlI6Uk5PSSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpSTk9JCgpkaXNidXJzZV9hZnRlcl9hc3NlcnRAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjM4NQogICAgLy8gbG9nZ2VkQXNzZXJ0KEFwcGxpY2F0aW9uKHJlY2VpdmVyV2FsbGV0KS5hZGRyZXNzID09PSByZWNlaXZlciwgRVJSX1JFQ0VJVkVSX1dBTExFVF9NSVNNQVRDSCkKICAgIGRpZyA1CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBkaWcgNQogICAgPT0KICAgIGJueiBkaXNidXJzZV9hZnRlcl9hc3NlcnRAMTYKICAgIHB1c2hieXRlcyAiRVJSOlJXTU0iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6UldNTQoKZGlzYnVyc2VfYWZ0ZXJfYXNzZXJ0QDE2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozODcKICAgIC8vIGxvZ2dlZEFzc2VydChyZWZ1bmRBbW91bnQgPj0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlLCBFUlJfUkVDRUlWRVJfTk9UX09QVEVEX0lOKQogICAgZGlnIDgKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgPj0KICAgIGJueiBkaXNidXJzZV9hZnRlcl9hc3NlcnRAMTgKICAgIGJ5dGVjIDIzIC8vICJFUlI6Uk5PSSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpSTk9JCgpkaXNidXJzZV9hZnRlcl9hc3NlcnRAMTg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjM5MAogICAgLy8gY29uc3Qgb3B0aW5QbHVnaW4gPSBnZXRQbHVnaW5BcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLm9wdGluCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjM5MAogICAgLy8gY29uc3Qgb3B0aW5QbHVnaW4gPSBnZXRQbHVnaW5BcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLm9wdGluCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NAogICAgLy8gY29uc3QgW3BsdWdpbkFwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNQbHVnaW5BcHBMaXN0KSkKICAgIGJ5dGVjIDI0IC8vICJwYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjM5MAogICAgLy8gY29uc3Qgb3B0aW5QbHVnaW4gPSBnZXRQbHVnaW5BcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLm9wdGluCiAgICBleHRyYWN0IDAgOAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozOTEtNDAwCiAgICAvLyBjb25zdCBjYW5PcHRJbiA9IGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9jYW5DYWxsPih7CiAgICAvLyAgIGFwcElkOiByZWNlaXZlcldhbGxldCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIG9wdGluUGx1Z2luLAogICAgLy8gICAgIENhbGxlclR5cGVHbG9iYWwsCiAgICAvLyAgICAgR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgJycsCiAgICAvLyAgICAgb3AuYnplcm8oNCkudG9GaXhlZCh7IGxlbmd0aDogNCB9KSwKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Mzk1CiAgICAvLyBDYWxsZXJUeXBlR2xvYmFsLAogICAgaW50Y18xIC8vIDEKICAgIGl0b2IKICAgIGR1cAogICAgYnVyeSAyNAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozOTYKICAgIC8vIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Mzk4CiAgICAvLyBvcC5iemVybyg0KS50b0ZpeGVkKHsgbGVuZ3RoOiA0IH0pLAogICAgcHVzaGludCA0CiAgICBiemVybwogICAgZGlnIDkKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozOTEtNDAwCiAgICAvLyBjb25zdCBjYW5PcHRJbiA9IGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9jYW5DYWxsPih7CiAgICAvLyAgIGFwcElkOiByZWNlaXZlcldhbGxldCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIG9wdGluUGx1Z2luLAogICAgLy8gICAgIENhbGxlclR5cGVHbG9iYWwsCiAgICAvLyAgICAgR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgJycsCiAgICAvLyAgICAgb3AuYnplcm8oNCkudG9GaXhlZCh7IGxlbmd0aDogNCB9KSwKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIHB1c2hieXRlcyAweGIzNjIzNGE1IC8vIG1ldGhvZCAiYXJjNThfY2FuQ2FsbCh1aW50NjQsdWludDY0LGFkZHJlc3Msc3RyaW5nLGJ5dGVbNF0pYm9vbCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozOTcKICAgIC8vICcnLAogICAgYnl0ZWMgMTcgLy8gMHgwMDAwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzkxLTQwMAogICAgLy8gY29uc3QgY2FuT3B0SW4gPSBhYmlDYWxsPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfY2FuQ2FsbD4oewogICAgLy8gICBhcHBJZDogcmVjZWl2ZXJXYWxsZXQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBvcHRpblBsdWdpbiwKICAgIC8vICAgICBDYWxsZXJUeXBlR2xvYmFsLAogICAgLy8gICAgIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgICcnLAogICAgLy8gICAgIG9wLmJ6ZXJvKDQpLnRvRml4ZWQoeyBsZW5ndGg6IDQgfSksCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBzd2FwCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWMgOCAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYm9vbAogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0MDIKICAgIC8vIGxvZ2dlZEFzc2VydChjYW5PcHRJbiwgRVJSX1JFQ0VJVkVSX05PVF9PUFRFRF9JTikKICAgIGJueiBkaXNidXJzZV9hZnRlcl9hc3NlcnRAMjEKICAgIGJ5dGVjIDIzIC8vICJFUlI6Uk5PSSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpSTk9JCgpkaXNidXJzZV9hZnRlcl9hc3NlcnRAMjE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQwNQogICAgLy8gYXJjNThPcHRJbkFuZFNlbmQodGhpcy5ha2l0YURBTy52YWx1ZSwgQXBwbGljYXRpb24ocmVjZWl2ZXJXYWxsZXQpLCAnJywgW2Fzc2V0XSwgW2Ftb3VudF0pCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQwNQogICAgLy8gYXJjNThPcHRJbkFuZFNlbmQodGhpcy5ha2l0YURBTy52YWx1ZSwgQXBwbGljYXRpb24ocmVjZWl2ZXJXYWxsZXQpLCAnJywgW2Fzc2V0XSwgW2Ftb3VudF0pCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWMgMjkgLy8gMHgwMDAxCiAgICBkaWcgMTcKICAgIGNvbmNhdAogICAgZHVwCiAgICBidXJ5IDIyCiAgICBieXRlYyAyOSAvLyAweDAwMDEKICAgIGRpZyAxNwogICAgY29uY2F0CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGJ1cnkgMjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Mzc2CiAgICAvLyBhc3NlcnQoYXNzZXRzLmxlbmd0aCA9PT0gYW1vdW50cy5sZW5ndGgsIEVSUl9BU1NFVFNfQU5EX0FNT1VOVFNfTUlTTUFUQ0gpCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICB1bmNvdmVyIDIKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBkdXAKICAgIGJ1cnkgMTgKICAgIGRpZyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIEFBTU0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTQKICAgIC8vIGNvbnN0IFtwbHVnaW5BcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzUGx1Z2luQXBwTGlzdCkpCiAgICB1bmNvdmVyIDIKICAgIGJ5dGVjIDI0IC8vICJwYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM3NwogICAgLy8gY29uc3Qgb3B0aW5QbHVnaW4gPSBnZXRQbHVnaW5BcHBMaXN0KGFraXRhREFPKS5vcHRpbgogICAgZHVwCiAgICBleHRyYWN0IDAgOAogICAgc3dhcAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE2NS0xNjgKICAgIC8vIGNvbnN0IFtjb250cm9sbGVkQWNjb3VudEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKAogICAgLy8gICB3YWxsZXRJRCwKICAgIC8vICAgQnl0ZXMoQWJzdHJhY3RBY2NvdW50R2xvYmFsU3RhdGVLZXlzQ29udHJvbGxlZEFkZHJlc3MpCiAgICAvLyApCiAgICBkaWcgOQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE2NwogICAgLy8gQnl0ZXMoQWJzdHJhY3RBY2NvdW50R2xvYmFsU3RhdGVLZXlzQ29udHJvbGxlZEFkZHJlc3MpCiAgICBwdXNoYnl0ZXMgImNvbnRyb2xsZWRfYWRkcmVzcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTY1LTE2OAogICAgLy8gY29uc3QgW2NvbnRyb2xsZWRBY2NvdW50Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoCiAgICAvLyAgIHdhbGxldElELAogICAgLy8gICBCeXRlcyhBYnN0cmFjdEFjY291bnRHbG9iYWxTdGF0ZUtleXNDb250cm9sbGVkQWRkcmVzcykKICAgIC8vICkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIGR1cAogICAgY292ZXIgMwogICAgYnVyeSAyNQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozODAtMzgzCiAgICAvLyBpdHhuQ29tcG9zZS5iZWdpbjx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X3Jla2V5VG9QbHVnaW4+KHsKICAgIC8vICAgYXBwSWQ6IHJlY2lwaWVudFdhbGxldC5pZCwKICAgIC8vICAgYXJnczogW29wdGluUGx1Z2luLCBDYWxsZXJUeXBlR2xvYmFsLCBlc2Nyb3csIFtdLCBbXV0KICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hieXRlcyAweDVhZGYzMzhmIC8vIG1ldGhvZCAiYXJjNThfcmVrZXlUb1BsdWdpbih1aW50NjQsdWludDY0LHN0cmluZyx1aW50NjRbXSwodWludDY0LHVpbnQ2NClbXSl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyAyNQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Mzk3CiAgICAvLyAnJywKICAgIGJ5dGVjIDE3IC8vIDB4MDAwMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzgyCiAgICAvLyBhcmdzOiBbb3B0aW5QbHVnaW4sIENhbGxlclR5cGVHbG9iYWwsIGVzY3JvdywgW10sIFtdXQogICAgYnl0ZWMgMTcgLy8gMHgwMDAwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgYnl0ZWMgMTcgLy8gMHgwMDAwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozODAtMzgzCiAgICAvLyBpdHhuQ29tcG9zZS5iZWdpbjx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X3Jla2V5VG9QbHVnaW4+KHsKICAgIC8vICAgYXBwSWQ6IHJlY2lwaWVudFdhbGxldC5pZCwKICAgIC8vICAgYXJnczogW29wdGluUGx1Z2luLCBDYWxsZXJUeXBlR2xvYmFsLCBlc2Nyb3csIFtdLCBbXV0KICAgIC8vIH0pCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM4NS0zOTYKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIE9wdEluUGx1Z2luLnByb3RvdHlwZS5vcHRJbj4oewogICAgLy8gICBhcHBJZDogb3B0aW5QbHVnaW4sCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICByZWNpcGllbnRXYWxsZXQsCiAgICAvLyAgICAgdHJ1ZSwKICAgIC8vICAgICBhc3NldHMsCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBvcmlnaW4sCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSAqIGFzc2V0cy5sZW5ndGgKICAgIC8vICAgICB9KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM5MwogICAgLy8gYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiBhc3NldHMubGVuZ3RoCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIHVuY292ZXIgMwogICAgKgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzkxLTM5NAogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IG9yaWdpbiwKICAgIC8vICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiBhc3NldHMubGVuZ3RoCiAgICAvLyB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozODUtMzk2CiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBPcHRJblBsdWdpbi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IG9wdGluUGx1Z2luLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgcmVjaXBpZW50V2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgYXNzZXRzLAogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogb3JpZ2luLAogICAgLy8gICAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiBhc3NldHMubGVuZ3RoCiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoYnl0ZXMgMHg2ODM1ZTNiYyAvLyBtZXRob2QgIm9wdEluKHVpbnQ2NCxib29sLHVpbnQ2NFtdLHBheSl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyA3CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozODkKICAgIC8vIHRydWUsCiAgICBwdXNoYnl0ZXMgMHg4MAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM4NS0zOTYKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIE9wdEluUGx1Z2luLnByb3RvdHlwZS5vcHRJbj4oewogICAgLy8gICBhcHBJZDogb3B0aW5QbHVnaW4sCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICByZWNpcGllbnRXYWxsZXQsCiAgICAvLyAgICAgdHJ1ZSwKICAgIC8vICAgICBhc3NldHMsCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBvcmlnaW4sCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSAqIGFzc2V0cy5sZW5ndGgKICAgIC8vICAgICB9KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozOTgKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBhbW91bnRzLmxlbmd0aDsgaSsrKSB7CiAgICBpbnRjXzAgLy8gMAogICAgYnVyeSAxMQoKZGlzYnVyc2Vfd2hpbGVfdG9wQDMzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozOTgKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBhbW91bnRzLmxlbmd0aDsgaSsrKSB7CiAgICBkaWcgMTAKICAgIGRpZyAxNAogICAgPAogICAgYnogZGlzYnVyc2VfYWZ0ZXJfd2hpbGVAMzcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Mzk5CiAgICAvLyBpZiAoYW1vdW50c1tpXSA+IDApIHsKICAgIGRpZyAyMAogICAgZXh0cmFjdCAyIDAKICAgIGRpZyAxMQogICAgaW50Y18yIC8vIDgKICAgICoKICAgIGR1cAogICAgYnVyeSAxNQogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgYnVyeSA5CiAgICBieiBkaXNidXJzZV9hZnRlcl9pZl9lbHNlQDM2CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQwMC00MDYKICAgIC8vIGl0eG5Db21wb3NlLm5leHQoCiAgICAvLyAgIGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudHNbaV0sCiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogb3JpZ2luLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXRzW2ldCiAgICAvLyAgIH0pCiAgICAvLyApCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDA0CiAgICAvLyB4ZmVyQXNzZXQ6IGFzc2V0c1tpXQogICAgZGlnIDE5CiAgICBleHRyYWN0IDIgMAogICAgZGlnIDEzCiAgICBleHRyYWN0X3VpbnQ2NAogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGRpZyAxOAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICBkaWcgNwogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0MDEtNDA1CiAgICAvLyBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICBhc3NldEFtb3VudDogYW1vdW50c1tpXSwKICAgIC8vICAgYXNzZXRSZWNlaXZlcjogb3JpZ2luLAogICAgLy8gICB4ZmVyQXNzZXQ6IGFzc2V0c1tpXQogICAgLy8gfSkKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCgpkaXNidXJzZV9hZnRlcl9pZl9lbHNlQDM2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozOTgKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBhbW91bnRzLmxlbmd0aDsgaSsrKSB7CiAgICBkaWcgMTAKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBidXJ5IDExCiAgICBiIGRpc2J1cnNlX3doaWxlX3RvcEAzMwoKZGlzYnVyc2VfYWZ0ZXJfd2hpbGVAMzc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQxMC00MTIKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF92ZXJpZnlBdXRoQWRkcmVzcz4oewogICAgLy8gICBhcHBJZDogcmVjaXBpZW50V2FsbGV0CiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICBkaWcgNQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoYnl0ZXMgMHg2Y2MzZjYwNiAvLyBtZXRob2QgImFyYzU4X3ZlcmlmeUF1dGhBZGRyZXNzKCl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDE0CiAgICAvLyBpdHhuQ29tcG9zZS5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDA4CiAgICAvLyBjb25zdCBvcHRJbkNvc3QgPSBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgZHVwCiAgICBidXJ5IDExCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQwOQogICAgLy8gaWYgKHJlZnVuZEFtb3VudCA+IG9wdEluQ29zdCkgewogICAgZGlnIDkKICAgIDwKICAgIGJ6IGRpc2J1cnNlX2FmdGVyX2lmX2Vsc2VAMjkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDEwLTQxNQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50OiByZWZ1bmRBbW91bnQgLSBvcHRJbkNvc3QsCiAgICAvLyAgICAgcmVjZWl2ZXI6IHBheW9yLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDEyCiAgICAvLyBhbW91bnQ6IHJlZnVuZEFtb3VudCAtIG9wdEluQ29zdCwKICAgIGRpZyA4CiAgICBkaWcgMTAKICAgIC0KICAgIGRpZyAxNwogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDEwLTQxNAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50OiByZWZ1bmRBbW91bnQgLSBvcHRJbkNvc3QsCiAgICAvLyAgICAgcmVjZWl2ZXI6IHBheW9yLAogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0MTAtNDE1CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IHJlZnVuZEFtb3VudCAtIG9wdEluQ29zdCwKICAgIC8vICAgICByZWNlaXZlcjogcGF5b3IsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIGIgZGlzYnVyc2VfYWZ0ZXJfaWZfZWxzZUAyOQoKZGlzYnVyc2VfZWxzZV9ib2R5QDI1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0MTktNDI1CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnQsCiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogcmVjZWl2ZXIsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgZGlnIDQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgZGlnIDIKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGRpZyAzCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0MTktNDI0CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnQsCiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogcmVjZWl2ZXIsCiAgICAvLyAgIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0MTktNDI1CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnQsCiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogcmVjZWl2ZXIsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDI4LTQzMwogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50OiByZWZ1bmRBbW91bnQsCiAgICAvLyAgICAgcmVjZWl2ZXI6IHBheW9yLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIGRpZyAxNgogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgZGlnIDgKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQyOC00MzIKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGFtb3VudDogcmVmdW5kQW1vdW50LAogICAgLy8gICAgIHJlY2VpdmVyOiBwYXlvciwKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDI4LTQzMwogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50OiByZWZ1bmRBbW91bnQsCiAgICAvLyAgICAgcmVjZWl2ZXI6IHBheW9yLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICBiIGRpc2J1cnNlX2FmdGVyX2lmX2Vsc2VAMjkKCgovLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjpIeXBlclN3YXAuY2FuY2VsW3JvdXRpbmddKCkgLT4gdm9pZDoKY2FuY2VsOgogICAgaW50Y18wIC8vIDAKICAgIGR1cAogICAgYnl0ZWNfMyAvLyAiIgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQ0OQogICAgLy8gY2FuY2VsKGlkOiB1aW50NjQsIHByb29mOiBQcm9vZikgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMzIKICAgICoKICAgIHB1c2hpbnQgMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8Ynl0ZXNbMzJdPgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0NTEKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLm9mZmVycyhpZCkuZXhpc3RzLCBFUlJfT0ZGRVJfTk9UX0ZPVU5EKQogICAgaXRvYgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjUwCiAgICAvLyBvZmZlcnMgPSBCb3hNYXA8dWludDY0LCBPZmZlclZhbHVlPih7IGtleVByZWZpeDogSHlwZXJTd2FwQm94UHJlZml4T2ZmZXJzIH0pCiAgICBieXRlY18xIC8vICJvIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDUxCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5vZmZlcnMoaWQpLmV4aXN0cywgRVJSX09GRkVSX05PVF9GT1VORCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGNhbmNlbF9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNCAvLyAiRVJSOk5PRlIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6Tk9GUgoKY2FuY2VsX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0NTIKICAgIC8vIGNvbnN0IHsgc3RhdGUsIHBhcnRpY2lwYW50c1Jvb3QsIGVzY3Jvd2VkLCByb290LCBleHBpcmF0aW9uIH0gPSB0aGlzLm9mZmVycyhpZCkudmFsdWUKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGR1cAogICAgZXh0cmFjdCAwIDEKICAgIGR1cAogICAgY292ZXIgMgogICAgYnVyeSA4CiAgICBkdXAKICAgIGV4dHJhY3QgNDkgMzIKICAgIGJ1cnkgOQogICAgZHVwCiAgICBwdXNoaW50IDQxCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYnVyeSA3CiAgICBwdXNoaW50IDk3CiAgICBleHRyYWN0X3VpbnQ2NAogICAgYnVyeSA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQ1NQogICAgLy8gc3RhdGUgPT09IFNUQVRFX09GRkVSRUQgfHwgc3RhdGUgPT09IFNUQVRFX0VTQ1JPV0lORyB8fAogICAgYnl0ZWMgMTAgLy8gMHgwYQogICAgPT0KICAgIGJueiBjYW5jZWxfYm9vbF90cnVlQDcKICAgIGRpZyA1CiAgICBieXRlYyA5IC8vIDB4MTQKICAgID09CiAgICBibnogY2FuY2VsX2Jvb2xfdHJ1ZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQ1NgogICAgLy8gKHN0YXRlID09PSBTVEFURV9ESVNCVVJTSU5HICYmIGV4cGlyYXRpb24gPD0gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCksCiAgICBkaWcgNQogICAgYnl0ZWMgMTYgLy8gMHgxZQogICAgPT0KICAgIGJ6IGNhbmNlbF9ib29sX2ZhbHNlQDgKICAgIGRpZyAzCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICA8PQogICAgYnogY2FuY2VsX2Jvb2xfZmFsc2VAOAoKY2FuY2VsX2Jvb2xfdHJ1ZUA3OgogICAgaW50Y18xIC8vIDEKCmNhbmNlbF9ib29sX21lcmdlQDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQ1NC00NTgKICAgIC8vIGxvZ2dlZEFzc2VydCgKICAgIC8vICAgc3RhdGUgPT09IFNUQVRFX09GRkVSRUQgfHwgc3RhdGUgPT09IFNUQVRFX0VTQ1JPV0lORyB8fAogICAgLy8gICAoc3RhdGUgPT09IFNUQVRFX0RJU0JVUlNJTkcgJiYgZXhwaXJhdGlvbiA8PSBHbG9iYWwubGF0ZXN0VGltZXN0YW1wKSwKICAgIC8vICAgRVJSX0lOVkFMSURfU1RBVEUKICAgIC8vICkKICAgIGJueiBjYW5jZWxfYWZ0ZXJfYXNzZXJ0QDExCiAgICBieXRlYyA1IC8vICJFUlI6SVNURSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJU1RFCgpjYW5jZWxfYWZ0ZXJfYXNzZXJ0QDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0NjEKICAgIC8vIGNvbnN0IHNlbmRlclBhcnRpY2lwYW50S2V5ID0geyBpZCwgYWRkcmVzczogVHhuLnNlbmRlciB9CiAgICBkaWcgMQogICAgdHhuIFNlbmRlcgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQ2MgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucGFydGljaXBhbnRzKHNlbmRlclBhcnRpY2lwYW50S2V5KS5leGlzdHMsIEVSUl9OT1RfQUNDRVBURUQpCiAgICBkdXAKICAgIGV4dHJhY3QgMCA4CiAgICBzd2FwCiAgICBleHRyYWN0IDggMzIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1MgogICAgLy8gcGFydGljaXBhbnRzID0gQm94TWFwPFBhcnRpY2lwYW50S2V5LCBSZWZ1bmRWYWx1ZT4oeyBrZXlQcmVmaXg6IEh5cGVyU3dhcEJveFByZWZpeFBhcnRpY2lwYW50cyB9KQogICAgYnl0ZWMgNyAvLyAicCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0NjIKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnBhcnRpY2lwYW50cyhzZW5kZXJQYXJ0aWNpcGFudEtleSkuZXhpc3RzLCBFUlJfTk9UX0FDQ0VQVEVEKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogY2FuY2VsX2FmdGVyX2Fzc2VydEAxMwogICAgcHVzaGJ5dGVzICJFUlI6TkFDUCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOQUNQCgpjYW5jZWxfYWZ0ZXJfYXNzZXJ0QDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0NjUtNDc0CiAgICAvLyBjb25zdCBpc1BhcnRpY2lwYW50ID0gYWJpQ2FsbDx0eXBlb2YgTWV0YU1lcmtsZXMucHJvdG90eXBlLnZlcmlmeT4oewogICAgLy8gICBhcHBJZDogZ2V0QWtpdGFBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLm1ldGFNZXJrbGVzLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgU3RyaW5nKHBhcnRpY2lwYW50c1Jvb3QpLAogICAgLy8gICAgIHNoYTI1NihzaGEyNTYoVHhuLnNlbmRlci5ieXRlcykpLAogICAgLy8gICAgIHByb29mLAogICAgLy8gICAgIE1lcmtsZVRyZWVUeXBlVHJhZGUKICAgIC8vICAgXSwKICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQ2OAogICAgLy8gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0NjkKICAgIC8vIFN0cmluZyhwYXJ0aWNpcGFudHNSb290KSwKICAgIGJ5dGVjIDExIC8vIDB4MDAyMAogICAgZGlnIDgKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0NzAKICAgIC8vIHNoYTI1NihzaGEyNTYoVHhuLnNlbmRlci5ieXRlcykpLAogICAgdHhuIFNlbmRlcgogICAgc2hhMjU2CiAgICBzaGEyNTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDcyCiAgICAvLyBNZXJrbGVUcmVlVHlwZVRyYWRlCiAgICBwdXNoaW50IDMKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDY2CiAgICAvLyBhcHBJZDogZ2V0QWtpdGFBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLm1ldGFNZXJrbGVzLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0NjYKICAgIC8vIGFwcElkOiBnZXRBa2l0YUFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkubWV0YU1lcmtsZXMsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NAogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgYnl0ZWMgNiAvLyAiYWFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0NjYKICAgIC8vIGFwcElkOiBnZXRBa2l0YUFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkubWV0YU1lcmtsZXMsCiAgICBwdXNoaW50IDcyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQ2NS00NzQKICAgIC8vIGNvbnN0IGlzUGFydGljaXBhbnQgPSBhYmlDYWxsPHR5cGVvZiBNZXRhTWVya2xlcy5wcm90b3R5cGUudmVyaWZ5Pih7CiAgICAvLyAgIGFwcElkOiBnZXRBa2l0YUFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkubWV0YU1lcmtsZXMsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBTdHJpbmcocGFydGljaXBhbnRzUm9vdCksCiAgICAvLyAgICAgc2hhMjU2KHNoYTI1NihUeG4uc2VuZGVyLmJ5dGVzKSksCiAgICAvLyAgICAgcHJvb2YsCiAgICAvLyAgICAgTWVya2xlVHJlZVR5cGVUcmFkZQogICAgLy8gICBdLAogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGJ5dGVjIDEyIC8vIG1ldGhvZCAidmVyaWZ5KGFkZHJlc3Msc3RyaW5nLGJ5dGVbMzJdLGJ5dGVbMzJdW10sdWludDY0KWJvb2wiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyAzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIHN3YXAKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlYyA4IC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBib29sCiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Yml0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQ3NgogICAgLy8gbG9nZ2VkQXNzZXJ0KGlzUGFydGljaXBhbnQsIEVSUl9OT1RfQV9QQVJUSUNJUEFOVCkKICAgIGJueiBjYW5jZWxfYWZ0ZXJfYXNzZXJ0QDE2CiAgICBieXRlYyAxNCAvLyAiRVJSOk5QUlQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TlBSVAoKY2FuY2VsX2FmdGVyX2Fzc2VydEAxNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDc4CiAgICAvLyBpZiAoZXNjcm93ZWQgPT09IDApIHsKICAgIGRpZyA0CiAgICBibnogY2FuY2VsX2Vsc2VfYm9keUAxOAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0NzkKICAgIC8vIHRoaXMub2ZmZXJzKGlkKS52YWx1ZS5zdGF0ZSA9IFNUQVRFX0NBTkNFTF9DT01QTEVURUQKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGJ5dGVjIDE4IC8vIDB4M2MKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCgpjYW5jZWxfYWZ0ZXJfaWZfZWxzZUAxOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDQ5CiAgICAvLyBjYW5jZWwoaWQ6IHVpbnQ2NCwgcHJvb2Y6IFByb29mKSB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpjYW5jZWxfZWxzZV9ib2R5QDE4OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0ODEKICAgIC8vIHRoaXMub2ZmZXJzKGlkKS52YWx1ZS5zdGF0ZSA9IFNUQVRFX0NBTkNFTExFRAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgcHVzaGJ5dGVzIDB4MzIKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBiIGNhbmNlbF9hZnRlcl9pZl9lbHNlQDE5CgpjYW5jZWxfYm9vbF9mYWxzZUA4OgogICAgaW50Y18wIC8vIDAKICAgIGIgY2FuY2VsX2Jvb2xfbWVyZ2VAOQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Okh5cGVyU3dhcC53aXRoZHJhd1tyb3V0aW5nXSgpIC0+IHZvaWQ6CndpdGhkcmF3OgogICAgaW50Y18wIC8vIDAKICAgIGR1cG4gMwogICAgYnl0ZWNfMyAvLyAiIgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQ5NgogICAgLy8gd2l0aGRyYXcoaWQ6IHVpbnQ2NCwgcmVjZWl2ZXI6IEFjY291bnQsIGFzc2V0OiB1aW50NjQsIGFtb3VudDogdWludDY0LCBwcm9vZjogUHJvb2YpIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgY292ZXIgMgogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMzIKICAgICoKICAgIHB1c2hpbnQgMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8Ynl0ZXNbMzJdPgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0OTgKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLm9mZmVycyhpZCkuZXhpc3RzLCBFUlJfT0ZGRVJfTk9UX0ZPVU5EKQogICAgaXRvYgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjUwCiAgICAvLyBvZmZlcnMgPSBCb3hNYXA8dWludDY0LCBPZmZlclZhbHVlPih7IGtleVByZWZpeDogSHlwZXJTd2FwQm94UHJlZml4T2ZmZXJzIH0pCiAgICBieXRlY18xIC8vICJvIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDk4CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5vZmZlcnMoaWQpLmV4aXN0cywgRVJSX09GRkVSX05PVF9GT1VORCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHdpdGhkcmF3X2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA0IC8vICJFUlI6Tk9GUiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOT0ZSCgp3aXRoZHJhd19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDk5CiAgICAvLyBjb25zdCB7IHN0YXRlLCBlc2Nyb3dlZCwgcm9vdCB9ID0gdGhpcy5vZmZlcnMoaWQpLnZhbHVlCiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBkdXAKICAgIGV4dHJhY3QgMCAxCiAgICBkaWcgMQogICAgcHVzaGludCA0MQogICAgZXh0cmFjdF91aW50NjQKICAgIGJ1cnkgMTAKICAgIHN3YXAKICAgIGV4dHJhY3QgMSAzMgogICAgYnVyeSAxMAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1MDEKICAgIC8vIGxvZ2dlZEFzc2VydChzdGF0ZSA9PT0gU1RBVEVfQ0FOQ0VMTEVELCBFUlJfSU5WQUxJRF9TVEFURSkKICAgIHB1c2hieXRlcyAweDMyCiAgICA9PQogICAgYm56IHdpdGhkcmF3X2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyA1IC8vICJFUlI6SVNURSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJU1RFCgp3aXRoZHJhd19hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTAzCiAgICAvLyBsb2dnZWRBc3NlcnQoZXNjcm93ZWQgPiAwLCBFUlJfTk9USElOR19UT19XSVRIRFJBVykKICAgIGRpZyA3CiAgICBibnogd2l0aGRyYXdfYWZ0ZXJfYXNzZXJ0QDcKICAgIHB1c2hieXRlcyAiRVJSOk5UV0QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TlRXRAoKd2l0aGRyYXdfYWZ0ZXJfYXNzZXJ0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjUwNQogICAgLy8gY29uc3QgaGFzaCA9IHNoYTI1NihzaGEyNTYoQnl0ZXNgJHtUeG4uc2VuZGVyLmJ5dGVzfSR7cmVjZWl2ZXIuYnl0ZXN9JHtpdG9iKGFzc2V0KX0ke2l0b2IoYW1vdW50KX1gKSkKICAgIHR4biBTZW5kZXIKICAgIGRpZyA2CiAgICBjb25jYXQKICAgIGRpZyA1CiAgICBpdG9iCiAgICBjb25jYXQKICAgIGRpZyA0CiAgICBpdG9iCiAgICBjb25jYXQKICAgIHNoYTI1NgogICAgc2hhMjU2CiAgICBkdXAKICAgIGJ1cnkgMTMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTA2CiAgICAvLyBjb25zdCBoYXNoS2V5OiBIYXNoS2V5ID0geyBpZCwgaGFzaCB9CiAgICBkaWcgMgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU0CiAgICAvLyBoYXNoZXMgPSBCb3hNYXA8SGFzaEtleSwgUmVmdW5kVmFsdWU+KHsga2V5UHJlZml4OiBIeXBlclN3YXBCb3hQcmVmaXhIYXNoZXMgfSkKICAgIGJ5dGVjIDE1IC8vICJoIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGJ1cnkgMTIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTA3CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5oYXNoZXMoaGFzaEtleSkuZXhpc3RzLCBFUlJfTEVBRl9OT1RfRVNDUk9XRUQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiB3aXRoZHJhd19hZnRlcl9hc3NlcnRAOQogICAgYnl0ZWMgMjggLy8gIkVSUjpMTkVTIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkxORVMKCndpdGhkcmF3X2FmdGVyX2Fzc2VydEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1MDktNTE4CiAgICAvLyBjb25zdCB2ZXJpZmllZCA9IGFiaUNhbGw8dHlwZW9mIE1ldGFNZXJrbGVzLnByb3RvdHlwZS52ZXJpZnk+KHsKICAgIC8vICAgYXBwSWQ6IGdldEFraXRhQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5tZXRhTWVya2xlcywKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIFN0cmluZyhyb290KSwKICAgIC8vICAgICBoYXNoLAogICAgLy8gICAgIHByb29mLAogICAgLy8gICAgIE1lcmtsZVRyZWVUeXBlVHJhZGUKICAgIC8vICAgXSwKICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjUxMgogICAgLy8gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1MTMKICAgIC8vIFN0cmluZyhyb290KSwKICAgIGJ5dGVjIDExIC8vIDB4MDAyMAogICAgZGlnIDEwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTE2CiAgICAvLyBNZXJrbGVUcmVlVHlwZVRyYWRlCiAgICBwdXNoaW50IDMKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTEwCiAgICAvLyBhcHBJZDogZ2V0QWtpdGFBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLm1ldGFNZXJrbGVzLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1MTAKICAgIC8vIGFwcElkOiBnZXRBa2l0YUFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkubWV0YU1lcmtsZXMsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NAogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgYnl0ZWMgNiAvLyAiYWFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1MTAKICAgIC8vIGFwcElkOiBnZXRBa2l0YUFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkubWV0YU1lcmtsZXMsCiAgICBwdXNoaW50IDcyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjUwOS01MTgKICAgIC8vIGNvbnN0IHZlcmlmaWVkID0gYWJpQ2FsbDx0eXBlb2YgTWV0YU1lcmtsZXMucHJvdG90eXBlLnZlcmlmeT4oewogICAgLy8gICBhcHBJZDogZ2V0QWtpdGFBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLm1ldGFNZXJrbGVzLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgU3RyaW5nKHJvb3QpLAogICAgLy8gICAgIGhhc2gsCiAgICAvLyAgICAgcHJvb2YsCiAgICAvLyAgICAgTWVya2xlVHJlZVR5cGVUcmFkZQogICAgLy8gICBdLAogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGJ5dGVjIDEyIC8vIG1ldGhvZCAidmVyaWZ5KGFkZHJlc3Msc3RyaW5nLGJ5dGVbMzJdLGJ5dGVbMzJdW10sdWludDY0KWJvb2wiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyAxMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyAzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIHN3YXAKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlYyA4IC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBib29sCiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Yml0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjUyMAogICAgLy8gbG9nZ2VkQXNzZXJ0KHZlcmlmaWVkLCBFUlJfQ0FOVF9WRVJJRllfTEVBRikKICAgIGJueiB3aXRoZHJhd19hZnRlcl9hc3NlcnRAMTIKICAgIGJ5dGVjIDIwIC8vICJFUlI6Q1ZMRiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpDVkxGCgp3aXRoZHJhd19hZnRlcl9hc3NlcnRAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjUyMgogICAgLy8gbGV0IHsgcGF5b3IsIGFtb3VudDogcmVmdW5kQW1vdW50IH0gPSB0aGlzLmhhc2hlcyhoYXNoS2V5KS52YWx1ZQogICAgZGlnIDEwCiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBkdXAKICAgIGV4dHJhY3QgOCAzMgogICAgYnVyeSAxMgogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBidXJ5IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTIzCiAgICAvLyB0aGlzLmhhc2hlcyhoYXNoS2V5KS5kZWxldGUoKQogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjUyNQogICAgLy8gaWYgKGFzc2V0ID09PSAwKSB7CiAgICBkaWcgNAogICAgYm56IHdpdGhkcmF3X2Vsc2VfYm9keUAxNQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1MjYtNTMxCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudCwKICAgIC8vICAgICByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjUyOQogICAgLy8gcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBkaWcgMwogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTI2LTUzMAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50OiBhbW91bnQsCiAgICAvLyAgICAgcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjUyNi01MzEKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGFtb3VudDogYW1vdW50LAogICAgLy8gICAgIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0Cgp3aXRoZHJhd19hZnRlcl9pZl9lbHNlQDE3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1NDItNTQ3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IHJlZnVuZEFtb3VudCwKICAgIC8vICAgICByZWNlaXZlcjogcGF5b3IsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgZGlnIDkKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGRpZyA2CiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1NDItNTQ2CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IHJlZnVuZEFtb3VudCwKICAgIC8vICAgICByZWNlaXZlcjogcGF5b3IsCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU0Mi01NDcKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGFtb3VudDogcmVmdW5kQW1vdW50LAogICAgLy8gICAgIHJlY2VpdmVyOiBwYXlvciwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1NTAKICAgIC8vIGNvbnN0IG5ld0VzY3Jvd2VkOiB1aW50NjQgPSBlc2Nyb3dlZCAtIDEKICAgIGRpZyA3CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU1MgogICAgLy8gaWYgKG5ld0VzY3Jvd2VkID09PSAwKSB7CiAgICBibnogd2l0aGRyYXdfZWxzZV9ib2R5QDIwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU1MwogICAgLy8gdGhpcy5vZmZlcnMoaWQpLnZhbHVlLmVzY3Jvd2VkID0gbmV3RXNjcm93ZWQKICAgIGl0b2IKICAgIGRpZyAxCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIHB1c2hpbnQgNDEKICAgIHVuY292ZXIgMgogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTU0CiAgICAvLyB0aGlzLm9mZmVycyhpZCkudmFsdWUuc3RhdGUgPSBTVEFURV9DQU5DRUxfQ09NUExFVEVECiAgICBpbnRjXzAgLy8gMAogICAgYnl0ZWMgMTggLy8gMHgzYwogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKCndpdGhkcmF3X2FmdGVyX2lmX2Vsc2VAMjE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQ5NgogICAgLy8gd2l0aGRyYXcoaWQ6IHVpbnQ2NCwgcmVjZWl2ZXI6IEFjY291bnQsIGFzc2V0OiB1aW50NjQsIGFtb3VudDogdWludDY0LCBwcm9vZjogUHJvb2YpIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCndpdGhkcmF3X2Vsc2VfYm9keUAyMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTU2CiAgICAvLyB0aGlzLm9mZmVycyhpZCkudmFsdWUuZXNjcm93ZWQgPSBuZXdFc2Nyb3dlZAogICAgaXRvYgogICAgZGlnIDEKICAgIHB1c2hpbnQgNDEKICAgIHVuY292ZXIgMgogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGIgd2l0aGRyYXdfYWZ0ZXJfaWZfZWxzZUAyMQoKd2l0aGRyYXdfZWxzZV9ib2R5QDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1MzMtNTM5CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnQsCiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjUzNwogICAgLy8gYXNzZXRSZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgZGlnIDMKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGRpZyA0CiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1MzMtNTM4CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnQsCiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgfSkKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjUzMy01MzkKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudCwKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICBiIHdpdGhkcmF3X2FmdGVyX2lmX2Vsc2VAMTcKCgovLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjpIeXBlclN3YXAuY2xlYW51cFBhcnRpY2lwYW50W3JvdXRpbmddKCkgLT4gdm9pZDoKY2xlYW51cFBhcnRpY2lwYW50OgogICAgaW50Y18wIC8vIDAKICAgIGR1cAogICAgYnl0ZWNfMyAvLyAiIgogICAgZHVwbiAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU2OQogICAgLy8gY2xlYW51cFBhcnRpY2lwYW50KGlkOiB1aW50NjQsIHBhcnRpY2lwYW50OiBBY2NvdW50KSB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTcwCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5vZmZlcnMoaWQpLmV4aXN0cywgRVJSX09GRkVSX05PVF9GT1VORCkKICAgIGl0b2IKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1MAogICAgLy8gb2ZmZXJzID0gQm94TWFwPHVpbnQ2NCwgT2ZmZXJWYWx1ZT4oeyBrZXlQcmVmaXg6IEh5cGVyU3dhcEJveFByZWZpeE9mZmVycyB9KQogICAgYnl0ZWNfMSAvLyAibyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU3MAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMub2ZmZXJzKGlkKS5leGlzdHMsIEVSUl9PRkZFUl9OT1RfRk9VTkQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBjbGVhbnVwUGFydGljaXBhbnRfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDQgLy8gIkVSUjpOT0ZSIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5PRlIKCmNsZWFudXBQYXJ0aWNpcGFudF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTcxCiAgICAvLyBjb25zdCB7IHN0YXRlLCBleHBpcmF0aW9uLCBhY2NlcHRhbmNlcyB9ID0gdGhpcy5vZmZlcnMoaWQpLnZhbHVlCiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBkdXAKICAgIGV4dHJhY3QgMCAxCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGJ1cnkgOQogICAgZHVwCiAgICBwdXNoaW50IDk3CiAgICBleHRyYWN0X3VpbnQ2NAogICAgYnVyeSA3CiAgICBwdXNoaW50IDg5CiAgICBleHRyYWN0X3VpbnQ2NAogICAgYnVyeSA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU3NAogICAgLy8gY29uc3QgaXNDb21wbGV0ZWQgPSBzdGF0ZSA9PT0gU1RBVEVfQ09NUExFVEVEIHx8IHN0YXRlID09PSBTVEFURV9DQU5DRUxfQ09NUExFVEVECiAgICBieXRlYyAyMiAvLyAweDI4CiAgICA9PQogICAgYm56IGNsZWFudXBQYXJ0aWNpcGFudF9ib29sX3RydWVANQogICAgZGlnIDYKICAgIGJ5dGVjIDE4IC8vIDB4M2MKICAgID09CiAgICBieiBjbGVhbnVwUGFydGljaXBhbnRfYm9vbF9mYWxzZUA2CgpjbGVhbnVwUGFydGljaXBhbnRfYm9vbF90cnVlQDU6CiAgICBpbnRjXzEgLy8gMQogICAgYnVyeSA0CgpjbGVhbnVwUGFydGljaXBhbnRfYm9vbF9tZXJnZUA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1NzUKICAgIC8vIGNvbnN0IGlzRXhwaXJlZCA9IChzdGF0ZSA9PT0gU1RBVEVfT0ZGRVJFRCB8fCBzdGF0ZSA9PT0gU1RBVEVfRVNDUk9XSU5HKSAmJiBleHBpcmF0aW9uIDw9IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAKICAgIGRpZyA2CiAgICBieXRlYyAxMCAvLyAweDBhCiAgICA9PQogICAgYm56IGNsZWFudXBQYXJ0aWNpcGFudF9hbmRfY29udGRAOQogICAgZGlnIDYKICAgIGJ5dGVjIDkgLy8gMHgxNAogICAgPT0KICAgIGJ6IGNsZWFudXBQYXJ0aWNpcGFudF9ib29sX2ZhbHNlQDExCgpjbGVhbnVwUGFydGljaXBhbnRfYW5kX2NvbnRkQDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU3NQogICAgLy8gY29uc3QgaXNFeHBpcmVkID0gKHN0YXRlID09PSBTVEFURV9PRkZFUkVEIHx8IHN0YXRlID09PSBTVEFURV9FU0NST1dJTkcpICYmIGV4cGlyYXRpb24gPD0gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcAogICAgZGlnIDQKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIDw9CiAgICBieiBjbGVhbnVwUGFydGljaXBhbnRfYm9vbF9mYWxzZUAxMQogICAgaW50Y18xIC8vIDEKCmNsZWFudXBQYXJ0aWNpcGFudF9ib29sX21lcmdlQDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1NzYKICAgIC8vIGxvZ2dlZEFzc2VydChpc0NvbXBsZXRlZCB8fCBpc0V4cGlyZWQsIEVSUl9JTlZBTElEX1NUQVRFKQogICAgZGlnIDQKICAgIHx8CiAgICBibnogY2xlYW51cFBhcnRpY2lwYW50X2FmdGVyX2Fzc2VydEAxNAogICAgYnl0ZWMgNSAvLyAiRVJSOklTVEUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVNURQoKY2xlYW51cFBhcnRpY2lwYW50X2FmdGVyX2Fzc2VydEAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTc4CiAgICAvLyBjb25zdCBwYXJ0aWNpcGFudEtleTogUGFydGljaXBhbnRLZXkgPSB7IGlkLCBhZGRyZXNzOiBwYXJ0aWNpcGFudCB9CiAgICBkaWcgMQogICAgZGlnIDMKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1MgogICAgLy8gcGFydGljaXBhbnRzID0gQm94TWFwPFBhcnRpY2lwYW50S2V5LCBSZWZ1bmRWYWx1ZT4oeyBrZXlQcmVmaXg6IEh5cGVyU3dhcEJveFByZWZpeFBhcnRpY2lwYW50cyB9KQogICAgYnl0ZWMgNyAvLyAicCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBidXJ5IDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTc5CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5wYXJ0aWNpcGFudHMocGFydGljaXBhbnRLZXkpLmV4aXN0cywgRVJSX1BBUlRJQ0lQQU5UX05PVF9GT1VORCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGNsZWFudXBQYXJ0aWNpcGFudF9hZnRlcl9hc3NlcnRAMTYKICAgIHB1c2hieXRlcyAiRVJSOk5QRkQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TlBGRAoKY2xlYW51cFBhcnRpY2lwYW50X2FmdGVyX2Fzc2VydEAxNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTgxCiAgICAvLyBjb25zdCB7IHBheW9yLCBhbW91bnQgfSA9IHRoaXMucGFydGljaXBhbnRzKHBhcnRpY2lwYW50S2V5KS52YWx1ZQogICAgZGlnIDcKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGR1cAogICAgZXh0cmFjdCA4IDMyCiAgICBzd2FwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTgyCiAgICAvLyB0aGlzLnBhcnRpY2lwYW50cyhwYXJ0aWNpcGFudEtleSkuZGVsZXRlKCkKICAgIHVuY292ZXIgMgogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU4NQogICAgLy8gdGhpcy5vZmZlcnMoaWQpLnZhbHVlLmFjY2VwdGFuY2VzID0gYWNjZXB0YW5jZXMgLSAxCiAgICBkaWcgNwogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGl0b2IKICAgIGRpZyAzCiAgICBwdXNoaW50IDg5CiAgICB1bmNvdmVyIDIKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU4OC01OTMKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGFtb3VudCwKICAgIC8vICAgICByZWNlaXZlcjogcGF5b3IsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTg4LTU5MgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50LAogICAgLy8gICAgIHJlY2VpdmVyOiBwYXlvciwKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTg4LTU5MwogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50LAogICAgLy8gICAgIHJlY2VpdmVyOiBwYXlvciwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1NjkKICAgIC8vIGNsZWFudXBQYXJ0aWNpcGFudChpZDogdWludDY0LCBwYXJ0aWNpcGFudDogQWNjb3VudCkgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKY2xlYW51cFBhcnRpY2lwYW50X2Jvb2xfZmFsc2VAMTE6CiAgICBpbnRjXzAgLy8gMAogICAgYiBjbGVhbnVwUGFydGljaXBhbnRfYm9vbF9tZXJnZUAxMgoKY2xlYW51cFBhcnRpY2lwYW50X2Jvb2xfZmFsc2VANjoKICAgIGludGNfMCAvLyAwCiAgICBidXJ5IDQKICAgIGIgY2xlYW51cFBhcnRpY2lwYW50X2Jvb2xfbWVyZ2VANwoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Okh5cGVyU3dhcC5jbGVhbnVwT2ZmZXJbcm91dGluZ10oKSAtPiB2b2lkOgpjbGVhbnVwT2ZmZXI6CiAgICBpbnRjXzAgLy8gMAogICAgYnl0ZWNfMyAvLyAiIgogICAgZHVwbiAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjYwMgogICAgLy8gY2xlYW51cE9mZmVyKGlkOiB1aW50NjQpIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjAzCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5vZmZlcnMoaWQpLmV4aXN0cywgRVJSX09GRkVSX05PVF9GT1VORCkKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTAKICAgIC8vIG9mZmVycyA9IEJveE1hcDx1aW50NjQsIE9mZmVyVmFsdWU+KHsga2V5UHJlZml4OiBIeXBlclN3YXBCb3hQcmVmaXhPZmZlcnMgfSkKICAgIGJ5dGVjXzEgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2MDMKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLm9mZmVycyhpZCkuZXhpc3RzLCBFUlJfT0ZGRVJfTk9UX0ZPVU5EKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogY2xlYW51cE9mZmVyX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA0IC8vICJFUlI6Tk9GUiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOT0ZSCgpjbGVhbnVwT2ZmZXJfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjYwNAogICAgLy8gY29uc3QgeyBzdGF0ZSwgZXhwaXJhdGlvbiwgYWNjZXB0YW5jZXMgfSA9IHRoaXMub2ZmZXJzKGlkKS52YWx1ZQogICAgZHVwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZHVwCiAgICBleHRyYWN0IDAgMQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBidXJ5IDcKICAgIGR1cAogICAgcHVzaGludCA5NwogICAgZXh0cmFjdF91aW50NjQKICAgIGJ1cnkgNQogICAgcHVzaGludCA4OQogICAgZXh0cmFjdF91aW50NjQKICAgIGJ1cnkgNQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2MDcKICAgIC8vIGNvbnN0IGlzQ29tcGxldGVkID0gc3RhdGUgPT09IFNUQVRFX0NPTVBMRVRFRCB8fCBzdGF0ZSA9PT0gU1RBVEVfQ0FOQ0VMX0NPTVBMRVRFRAogICAgYnl0ZWMgMjIgLy8gMHgyOAogICAgPT0KICAgIGJueiBjbGVhbnVwT2ZmZXJfYm9vbF90cnVlQDUKICAgIGRpZyA0CiAgICBieXRlYyAxOCAvLyAweDNjCiAgICA9PQogICAgYnogY2xlYW51cE9mZmVyX2Jvb2xfZmFsc2VANgoKY2xlYW51cE9mZmVyX2Jvb2xfdHJ1ZUA1OgogICAgaW50Y18xIC8vIDEKICAgIGJ1cnkgMgoKY2xlYW51cE9mZmVyX2Jvb2xfbWVyZ2VANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjA4CiAgICAvLyBjb25zdCBpc0V4cGlyZWQgPSAoc3RhdGUgPT09IFNUQVRFX09GRkVSRUQgfHwgc3RhdGUgPT09IFNUQVRFX0VTQ1JPV0lORykgJiYgZXhwaXJhdGlvbiA8PSBHbG9iYWwubGF0ZXN0VGltZXN0YW1wCiAgICBkaWcgNAogICAgYnl0ZWMgMTAgLy8gMHgwYQogICAgPT0KICAgIGJueiBjbGVhbnVwT2ZmZXJfYW5kX2NvbnRkQDkKICAgIGRpZyA0CiAgICBieXRlYyA5IC8vIDB4MTQKICAgID09CiAgICBieiBjbGVhbnVwT2ZmZXJfYm9vbF9mYWxzZUAxMQoKY2xlYW51cE9mZmVyX2FuZF9jb250ZEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2MDgKICAgIC8vIGNvbnN0IGlzRXhwaXJlZCA9IChzdGF0ZSA9PT0gU1RBVEVfT0ZGRVJFRCB8fCBzdGF0ZSA9PT0gU1RBVEVfRVNDUk9XSU5HKSAmJiBleHBpcmF0aW9uIDw9IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAKICAgIGRpZyAyCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICA8PQogICAgYnogY2xlYW51cE9mZmVyX2Jvb2xfZmFsc2VAMTEKICAgIGludGNfMSAvLyAxCgpjbGVhbnVwT2ZmZXJfYm9vbF9tZXJnZUAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjA5CiAgICAvLyBsb2dnZWRBc3NlcnQoaXNDb21wbGV0ZWQgfHwgaXNFeHBpcmVkLCBFUlJfSU5WQUxJRF9TVEFURSkKICAgIGRpZyAyCiAgICB8fAogICAgYm56IGNsZWFudXBPZmZlcl9hZnRlcl9hc3NlcnRAMTQKICAgIGJ5dGVjIDUgLy8gIkVSUjpJU1RFIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklTVEUKCmNsZWFudXBPZmZlcl9hZnRlcl9hc3NlcnRAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjYxMgogICAgLy8gbG9nZ2VkQXNzZXJ0KGFjY2VwdGFuY2VzID09PSAwLCBFUlJfUEFSVElDSVBBTlRTX05PVF9DTEVBTkVEKQogICAgZGlnIDMKICAgIGJ6IGNsZWFudXBPZmZlcl9hZnRlcl9hc3NlcnRAMTYKICAgIHB1c2hieXRlcyAiRVJSOlBOQ0wiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6UE5DTAoKY2xlYW51cE9mZmVyX2FmdGVyX2Fzc2VydEAxNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjE0CiAgICAvLyB0aGlzLm9mZmVycyhpZCkuZGVsZXRlKCkKICAgIGR1cAogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjYwMgogICAgLy8gY2xlYW51cE9mZmVyKGlkOiB1aW50NjQpIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmNsZWFudXBPZmZlcl9ib29sX2ZhbHNlQDExOgogICAgaW50Y18wIC8vIDAKICAgIGIgY2xlYW51cE9mZmVyX2Jvb2xfbWVyZ2VAMTIKCmNsZWFudXBPZmZlcl9ib29sX2ZhbHNlQDY6CiAgICBpbnRjXzAgLy8gMAogICAgYnVyeSAyCiAgICBiIGNsZWFudXBPZmZlcl9ib29sX21lcmdlQDcKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6OkNvbnRyYWN0V2l0aE9wdEluLm9wdEluW3JvdXRpbmddKCkgLT4gdm9pZDoKb3B0SW46CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6MjMKICAgIC8vIG9wdEluKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYXNzZXQ6IEFzc2V0KTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cG4gMgogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czoyNQogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfSU5WQUxJRF9QQVlNRU5UX1JFQ0VJVkVSKQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IG9wdEluX2FmdGVyX2Fzc2VydEAzCiAgICBwdXNoYnl0ZXMgIkVSUjpJUE1SIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQTVIKCm9wdEluX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjI2CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSwgRVJSX0lOVkFMSURfUEFZTUVOVF9BTU9VTlQpCiAgICBkaWcgMQogICAgZ3R4bnMgQW1vdW50CiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgID09CiAgICBibnogb3B0SW5fYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOklQTUEiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBNQQoKb3B0SW5fYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6MjgtMzQKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6MzAKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGRpZyAxCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjMxCiAgICAvLyBhc3NldEFtb3VudDogMCwKICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czoyOC0zMwogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IDAsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldAogICAgLy8gICB9KQogICAgcHVzaGludCA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czoyOC0zNAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IDAsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6MjMKICAgIC8vIG9wdEluKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYXNzZXQ6IEFzc2V0KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OlVwZ3JhZGVhYmxlQWtpdGFCYXNlQ29udHJhY3QudXBkYXRlW3JvdXRpbmddKCkgLT4gdm9pZDoKdXBkYXRlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDYKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyAzMCAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IHVwZGF0ZV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMzEgLy8gIkVSUjpOREFPIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5EQU8KCnVwZGF0ZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ5CiAgICAvLyBjb25zdCB1cGRhdGVQbHVnaW4gPSBnZXRQbHVnaW5BcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnVwZGF0ZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDkKICAgIC8vIGNvbnN0IHVwZGF0ZVBsdWdpbiA9IGdldFBsdWdpbkFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkudXBkYXRlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NAogICAgLy8gY29uc3QgW3BsdWdpbkFwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNQbHVnaW5BcHBMaXN0KSkKICAgIGJ5dGVjIDI0IC8vICJwYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OQogICAgLy8gY29uc3QgdXBkYXRlUGx1Z2luID0gZ2V0UGx1Z2luQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS51cGRhdGUKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo1MAogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbklkID09PSB1cGRhdGVQbHVnaW4sIEVSUl9JTlZBTElEX1VQR1JBREUpCiAgICBnbG9iYWwgQ2FsbGVyQXBwbGljYXRpb25JRAogICAgPT0KICAgIGJueiB1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOklVUEciCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVVQRwoKdXBkYXRlX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjUKICAgIC8vIHZlcnNpb24gPSBHbG9iYWxTdGF0ZTxzdHJpbmc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleVZlcnNpb24gfSkKICAgIGJ5dGVjIDI1IC8vICJ2ZXJzaW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTEKICAgIC8vIHRoaXMudmVyc2lvbi52YWx1ZSA9IG5ld1ZlcnNpb24KICAgIGRpZyAxCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDYKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpBa2l0YUJhc2VDb250cmFjdC51cGRhdGVBa2l0YURBT1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZUFraXRhREFPOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzYKICAgIC8vIHVwZGF0ZUFraXRhREFPKGFraXRhREFPOiBBcHBsaWNhdGlvbik6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzcKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWMgMzAgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM3CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGJueiB1cGRhdGVBa2l0YURBT19hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMzEgLy8gIkVSUjpOREFPIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5EQU8KCnVwZGF0ZUFraXRhREFPX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozOAogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSA9IGFraXRhREFPCiAgICBkaWcgMQogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM2CiAgICAvLyB1cGRhdGVBa2l0YURBTyhha2l0YURBTzogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4K", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyAHAAEIINSQAvjHDeiUBCYgCWFraXRhX2RhbwFvCEVSUjpJUEFZAAhFUlI6Tk9GUghFUlI6SVNURQNhYWwBcAQVH3x1ARQBCgIAIAQr88xaCEVSUjpPRkVYCEVSUjpOUFJUAWgBHgIAAAE8DG9mZmVyX2N1cnNvcghFUlI6Q1ZMRghFUlI6SVhGUgEoCEVSUjpSTk9JA3BhbAd2ZXJzaW9uBKJMBnwIRVJSOkxBRVMIRVJSOkxORVMCAAEGd2FsbGV0CEVSUjpOREFPgATqkYDdNhoAjgEArTEZFEQxGEEAloINBA2zpEsEveGhHgTYX+vdBEZvhxoEVmpisgQMerQuBAYxhosEaDu2eATT7gTwBDlOrrIEM+kslASFTe3gBIQHM902GgCODQB2AbYC6QRHBfkIoQmlCw0L0gxZDPgAMgABAIAsFR98dQAAAAAAAMbUAAAAAAAAiFQAAAAAAACIVAAAAAAAAJ/EAAAAAAAAaqSwI0MjQ4AEzZrWfjYaAI4BAA0AMRmBBBIxGBBEQgxgNhoBSSJZgQIISwEVEkRXAgA2GgJJFSQSRBcnGU8CZyhMZycTImcjQyIxFiMJSTgQIxJENhoBRwIVSU4CJRJENhoCSRUkEkQXTDYaA0lOAkkVSU4DJRJENhoESRUkEkQXTgI2GgVJFSQSRBdOAhNAAAyACEVSUjpCUk9UsABJMgcNQAAEJw2wAEsHSTgARQo4BzIKEkAAAyqwAEsHOAghBRJAAAMqsAAiKGVEJwZlSIFIW7FJcghEIQayCLIHI7IQIrIBtksGFlcGAksISU4CUIEDFksDshgnGrIaTLIaSwGyGkmyGoEGshAisgGzsUsCcghEIQayCLIHI7IQIrIBtksFFlcGAksHSU4CUE8EshgnGrIashpJshpMshqBBrIQIrIBsyInE2VESSMIJxNMZyEFFksMUDEATwIWSU8CUCcHTFBPAr8nCk8DUEsHFlAiFlBPAlBLAxZQIxZQSwIWUClPAlBMvyNDIkkrRwMxFiMJSTgQIxJENhoBSRUkEkQXNhoCSU4CSSJZJQuBAghMFRJEFkkpTFBJvUUBQAAEJwSwAEm+RElXAAFLAYFhW0UJSwFXMSBFC0sBgVlbRQpMgVFbRQYnChJAAAQnBbAASwYyBw1AAAQnDbAAsTIKJwtLClAxAAEBgQMWIihlRCcGZUiBSFuyGCcMshpPA7IaTwKyGkyyGksDshqyGoEGshAisgGztD5JVwQATFcABCcIEkRJFSMSRCJTQAAEJw6wAEsBMQBQSVcACExXCCBQJwdMUElFC71FAUEADIAIRVJSOkVBQ0OwAEsHIwhJRQcWSwGBWU8Cu0sDOAcyChJAAAMqsABLAzgIIQQSQAADKrAASwM4ACEEFkxQSwpMv0sESwYSQQAFSSInCbsjQyJHAitHAjEWIwlJOBAjEkQ2GgFJFSQSRBc2GgJJTgIVJRJENhoDSRUkEkQXTDYaBElOAkkiWSULgQIITBUSRBZJKUxQSb1FAUAABCcEsABJvkRJVwABSwFXASBFDEsBgSlbRQtLAYEhW0UJTIFhW0UJJwkSQAAEJwWwAEsHMgcNQAAEJw2wAEsBMQBQSVcACExXCCBQJwdMUL1FAUAABCcOsAAxAEsFUCIWUEsEFlABAUlFDUsCTFAnD0xQSUUMvUUBQQAEJxuwALEyCicLSwtQgQMWIihlRCcGZUiBSFuyGCcMshpPArIaTLIaSwyyGksDshqyGoEGshAisgGztD5JVwQATFcABCcIEkRJFSMSRCJTQAAEJxSwAEsFOAcyChJAAAMqsABLBTgISwQhBAgSQAADKrAASwU4ACEEFkxQSwtMv0sIIwhJFksCgSlPArtLBxJBAAVJIicQuyNDIkcCK0cDMRaBAglJOBAjEkQxFiMJSTgQgQQSRDYaAUkVJBJEFzYaAklOAhUlEkQ2GgNJFSQSRBdMNhoESRUkEkQXTDYaBUlOAkkiWSULgQIITBUSRBZJKUxQSb1FAUAABCcEsABJvkRJVwABSwFXASBFD0sBgSlbRQ5LAYEhW0UMTIFhW0UMJwkSQAAEJwWwAEsKMgcNQAAEJw2wAEsBMQBQSVcACExXCCBQJwdMUL1FAUAABCcOsAAxAEsGUEsFFlBLBBZQAQFJRRBLAkxQJw9MUElFD71FAUEABCcbsACxMgonC0sOUIEDFiIoZUQnBmVIgUhbshgnDLIaTwKyGkyyGksPshpLA7IashqBBrIQIrIBs7Q+SVcEAExXAAQnCBJESRUjEkQiU0AABCcUsAAhBEUJSwVLBXAARQFAAAchBDIQCEUJSwc4BzIKEkAAAyqwAEsHOAhLCRJAAAMqsABLBjgUMgoSQAAEJxWwAEsGOBFLBRJAAAQnFbAASwY4EksEEkAABCcVsABLBzgASwkWTFBLDky/SwsjCEkWSwKBKU8Cu0sKEkEABUkiJxC7I0MiRwcrRwY2GgFJFSQSRBc2GgJJTgJJFSQSRBdMNhoDSU4CFSUSRDYaBEkVJBJEF0w2GgVJFSQSRBdMFkkpTFBJvUUBQAAEJwSwAEm+RElXAAFMgSlbRQ0nEBJAAAQnBbAAMQBLBVBLBBZJRRJQSwMWSUURUAEBSwJMUCcPTFBJRRO9RQFAAAQnHLAASxFJvkRJVwggRRMiW0UKvEhLA0AAN7FLBLIHSwKyCCOyECKyAbOxSxCyB0sIsggjshAisgGzSwsjCUkWSwKBKU8Cu0AABUkiJxa7I0NLBEsEcABFAUABnUsFQAAEJxewAEsFcghESwUSQAAMgAhFUlI6UldNTbAASwgyEA9AAAQnF7AAIihlRCcYZUhXAAixIxZJRRgyCoEEr0sJshiABLNiNKWyGk8DshpPArIaTLIaJxGyGrIagQayECKyAbO0PklXBABMVwAEJwgSREkVIxJEIlNAAAQnF7AAIihlRCcdSxFQSUUWJx1LEVBJTgJFGEkiWU8CIllJRRJLARJETwInGGVISVcACEwiW0sJSYASY29udHJvbGxlZF9hZGRyZXNzZUhJTgNFGbGyGIAEWt8zj7IaTwKyGksZshonEbIaJxGyGicRshqBBrIQIrIBtjIQTwMLsghMsgcjshAisgG2shiABGg147yyGksHshqAAYCyGrIagQayECKyASJFC0sKSw4MQQA2SxRXAgBLCyQLSUUPW0lFCUEAGrZLE1cCAEsNW7IRSxKyFEsHshKBBLIQIrIBSwojCEULQv/CtksFshiABGzD9gayGoEGshAisgGzMhBJRQtLCQxB/lexSwhLCglLEbIHsggjshAisgGzQv5BsUsEshRLArISSwOyEYEEshAisgGzsUsQsgdLCLIII7IQIrIBs0L+GSJJK0k2GgFJFSQSRBc2GgJJTgJJIlklC4ECCEwVEkQWSSlMUEm9RQFAAAQnBLAASb5ESVcAAUlOAkUISVcxIEUJSYEpW0UHgWFbRQUnChJAABhLBScJEkAAEEsFJxASQQCeSwMyBw5BAJYjQAAEJwWwAEsBMQBQSVcACExXCCBQJwdMUL1FAUAADIAIRVJSOk5BQ1CwALEyCicLSwhQMQABAYEDFiIoZUQnBmVIgUhbshgnDLIaTwOyGk8CshpMshpLA7IashqBBrIQIrIBs7Q+SVcEAExXAAQnCBJESRUjEkQiU0AABCcOsABLBEAAB0kiJxK7I0NJIoABMrtC//UiQv9nIkcDK0k2GgFJFSQSRBc2GgJJTgIVJRJENhoDSRUkEkQXTDYaBEkVJBJEF0w2GgVJTgJJIlklC4ECCEwVEkQWSSlMUEm9RQFAAAQnBLAASb5ESVcAAUsBgSlbRQpMVwEgRQqAATISQAAEJwWwAEsHQAAMgAhFUlI6TlRXRLAAMQBLBlBLBRZQSwQWUAEBSUUNSwJMUCcPTFBJRQy9RQFAAAQnHLAAsTIKJwtLClCBAxYiKGVEJwZlSIFIW7IYJwyyGk8CshpMshpLDLIaSwOyGrIagQayECKyAbO0PklXBABMVwAEJwgSREkVIxJEIlNAAAQnFLAASwpJvkRJVwggRQwiW0UIvEhLBEAARLExALIHSwOyCCOyECKyAbOxSwmyB0sGsggjshAisgGzSwcjCUlAABEWSwFJTgKBKU8CuyInErsjQxZLAYEpTwK7Qv/zsTEAshRLA7ISSwSyEYEEshAisgGzQv+0IkkrRwI2GgFJFSQSRBc2GgJJTgIVJRJEFkkpTFBJvUUBQAAEJwSwAEm+RElXAAFJTgJFCUmBYVtFB4FZW0UHJxYSQAAISwYnEhJBAHIjRQRLBicKEkAACEsGJwkSQQBbSwQyBw5BAFMjSwQRQAAEJwWwAEsBSwNQJwdMUElFCb1FAUAADIAIRVJSOk5QRkSwAEsHSb5ESVcIIEwiW08CvEhLByMJFksDgVlPAruxsgiyByOyECKyAbMjQyJC/6oiRQRC/4siK0cCNhoBSRUkEkQXFilMUEm9RQFAAAQnBLAASb5ESVcAAUlOAkUHSYFhW0UFgVlbRQUnFhJAAAhLBCcSEkEAQCNFAksEJwoSQAAISwQnCRJBAClLAjIHDkEAISNLAhFAAAQnBbAASwNBAAyACEVSUjpQTkNMsABJvEgjQyJC/9wiRQJC/70xFiMJRwI4ECMSRDYaAUkVJBJEF0w4BzIKEkAADIAIRVJSOklQTVKwAEsBOAgyEBJAAAyACEVSUjpJUE1BsACxMgpLAbIRIrISshSBBLIQIrIBsyNDNhoBSSJZgQIISwEVEkRXAgAxACIoZUQnHmVIcghEEkAABCcfsAAiKGVEJxhlSIEQWzINEkAADIAIRVJSOklVUEewACcZSwFnI0M2GgFJFSQSRBcxACIoZUQnHmVIcghEEkAABCcfsAAoSwFnI0M=", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
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
   * Constructs a no op call for the accept(pay,uint64,byte[32][])void ABI method
   *
   * Accepts an offer
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static accept(params) {
    return {
      ...params,
      method: "accept(pay,uint64,byte[32][])void",
      args: Array.isArray(params.args) ? params.args : [params.args.mbrPayment, params.args.id, params.args.proof]
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
   * Disburses assets for a leaf in the tree, ensuring ordered processing
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
   * Constructs a no op call for the cancel(uint64,byte[32][])void ABI method
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
     * Makes a call to the HyperSwap smart contract using the `accept(pay,uint64,byte[32][])void` ABI method.
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
     * Disburses assets for a leaf in the tree, ensuring ordered processing
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    disburse: (params) => {
      return this.appClient.params.call(HyperSwapParamsFactory.disburse(params));
    },
    /**
     * Makes a call to the HyperSwap smart contract using the `cancel(uint64,byte[32][])void` ABI method.
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
     * Makes a call to the HyperSwap smart contract using the `accept(pay,uint64,byte[32][])void` ABI method.
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
     * Disburses assets for a leaf in the tree, ensuring ordered processing
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    disburse: (params) => {
      return this.appClient.createTransaction.call(HyperSwapParamsFactory.disburse(params));
    },
    /**
     * Makes a call to the HyperSwap smart contract using the `cancel(uint64,byte[32][])void` ABI method.
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
     * Makes a call to the HyperSwap smart contract using the `accept(pay,uint64,byte[32][])void` ABI method.
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
     * Disburses assets for a leaf in the tree, ensuring ordered processing
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    disburse: async (params) => {
      const result = await this.appClient.send.call(HyperSwapParamsFactory.disburse(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the HyperSwap smart contract using the `cancel(uint64,byte[32][])void` ABI method.
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
   * @param params The params to use for the cloned app client. Omit a param to keep the original value. Set a param to override the original value. Setting to undefined will clear the original value.
   * @returns A new app client with the altered params
   */
  clone(params) {
    return new _HyperSwapClient(this.appClient.clone(params));
  }
  /**
   * Makes a readonly (simulated) call to the HyperSwap smart contract using the `mbr()(uint64,uint64,uint64,(uint64,uint64))` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
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
      }
    }
  }}
  newGroup(composerConfig) {
    const client = this;
    const composer = this.algorand.newGroup(composerConfig);
    let promiseChain = Promise.resolve();
    return {
      /**
       * Add a offer(pay,byte[32],uint64,byte[32],uint64,uint64)void method call against the HyperSwap contract
       */
      offer(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.offer(params)));
        return this;
      },
      /**
       * Add a accept(pay,uint64,byte[32][])void method call against the HyperSwap contract
       */
      accept(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.accept(params)));
        return this;
      },
      /**
       * Add a escrow(pay,uint64,address,uint64,byte[32][])void method call against the HyperSwap contract
       */
      escrow(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.escrow(params)));
        return this;
      },
      /**
       * Add a escrowAsa(pay,axfer,uint64,address,uint64,uint64,byte[32][])void method call against the HyperSwap contract
       */
      escrowAsa(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.escrowAsa(params)));
        return this;
      },
      /**
       * Add a disburse(uint64,uint64,address,uint64,uint64)void method call against the HyperSwap contract
       */
      disburse(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.disburse(params)));
        return this;
      },
      /**
       * Add a cancel(uint64,byte[32][])void method call against the HyperSwap contract
       */
      cancel(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.cancel(params)));
        return this;
      },
      /**
       * Add a withdraw(uint64,address,uint64,uint64,byte[32][])void method call against the HyperSwap contract
       */
      withdraw(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.withdraw(params)));
        return this;
      },
      /**
       * Add a cleanupParticipant(uint64,address)void method call against the HyperSwap contract
       */
      cleanupParticipant(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.cleanupParticipant(params)));
        return this;
      },
      /**
       * Add a cleanupOffer(uint64)void method call against the HyperSwap contract
       */
      cleanupOffer(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.cleanupOffer(params)));
        return this;
      },
      /**
       * Add a optIn(pay,uint64)void method call against the HyperSwap contract
       */
      optIn(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.optIn(params)));
        return this;
      },
      /**
       * Add a updateAkitaDAO(uint64)void method call against the HyperSwap contract
       */
      updateAkitaDao(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateAkitaDao(params)));
        return this;
      },
      /**
       * Add a opUp()void method call against the HyperSwap contract
       */
      opUp(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.opUp(params)));
        return this;
      },
      /**
       * Add a mbr()(uint64,uint64,uint64,(uint64,uint64)) method call against the HyperSwap contract
       */
      mbr(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.mbr(params)));
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

// src/hyper-swap/errors.ts
var HYPER_SWAP_ERROR_MESSAGES = {
  // --- Offer validation ---------------------------------------------------
  BROT: "Offer and participants roots cannot be the same",
  OFEX: "Offer has expired",
  NOFR: "Offer not found",
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
};
var translateHyperSwapError = _chunkGIGYZ6YCjs.makeErrorTranslator.call(void 0, HYPER_SWAP_ERROR_MESSAGES);

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

// src/hyper-swap/index.ts
var HyperSwapSDK = class extends _chunkA73G7K3Bjs.BaseSDK {
  constructor(params) {
    super({ factory: HyperSwapFactory, ...params }, _chunkYA4OODI3js.ENV_VAR_NAMES.HYPER_SWAP_APP_ID);
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
   */
  async accept({ sender, signer, id, proof }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
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
        proof
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
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const mbrData = await this.mbr();
    if (isAsa) {
      const { asset } = rest;
      const mbrPayment = await this.client.algorand.createTransaction.payment({
        ...sendParams,
        amount: _algokitutils.microAlgo.call(void 0, mbrData.hashes + 200000n),
        // Extra for potential arc59
        receiver: this.client.appAddress
      });
      const assetXfer = await this.client.algorand.createTransaction.assetTransfer({
        ...sendParams,
        amount: BigInt(amount),
        assetId: BigInt(asset),
        receiver: this.client.appAddress
      });
      await this.client.send.escrowAsa({
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






exports.HYPER_SWAP_ERROR_MESSAGES = HYPER_SWAP_ERROR_MESSAGES; exports.translateHyperSwapError = translateHyperSwapError; exports.OfferState = OfferState; exports.HyperSwapSDK = HyperSwapSDK;
//# sourceMappingURL=chunk-FEFBUZVT.js.map
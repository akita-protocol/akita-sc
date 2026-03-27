import {
  BaseSDK
} from "./chunk-KDI5GHOT.mjs";
import {
  ENV_VAR_NAMES
} from "./chunk-M2DDWZUM.mjs";

// src/hyper-swap/index.ts
import { microAlgo } from "@algorandfoundation/algokit-utils";

// src/generated/HyperSwapClient.ts
import { getArc56ReturnValue, getABIStructFromABITuple } from "@algorandfoundation/algokit-utils/types/app-arc56";
import {
  AppClient as _AppClient
} from "@algorandfoundation/algokit-utils/types/app-client";
import { AppFactory as _AppFactory } from "@algorandfoundation/algokit-utils/types/app-factory";
var APP_SPEC = { "name": "HyperSwap", "structs": { "Object57CB3C34": [{ "name": "root", "type": "uint64" }, { "name": "data", "type": "uint64" }], "HashKey": [{ "name": "id", "type": "uint64" }, { "name": "hash", "type": "byte[32]" }], "HyperSwapMBRData": [{ "name": "offers", "type": "uint64" }, { "name": "participants", "type": "uint64" }, { "name": "hashes", "type": "uint64" }, { "name": "mm", "type": "Object57CB3C34" }], "OfferValue": [{ "name": "state", "type": "uint8" }, { "name": "root", "type": "byte[32]" }, { "name": "leaves", "type": "uint64" }, { "name": "escrowed", "type": "uint64" }, { "name": "participantsRoot", "type": "byte[32]" }, { "name": "participantsLeaves", "type": "uint64" }, { "name": "acceptances", "type": "uint64" }, { "name": "expiration", "type": "uint64" }], "ParticipantKey": [{ "name": "id", "type": "uint64" }, { "name": "address", "type": "address" }], "RefundValue": [{ "name": "amount", "type": "uint64" }, { "name": "payor", "type": "address" }] }, "methods": [{ "name": "create", "args": [{ "type": "string", "name": "version" }, { "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "offer", "args": [{ "type": "pay", "name": "payment" }, { "type": "byte[32]", "name": "root", "desc": "the merkle tree root of trades consisting of from address, recipient address, asset id & amount" }, { "type": "uint64", "name": "leaves", "desc": "the number of leaves in the tree" }, { "type": "byte[32]", "name": "participantsRoot", "desc": "the merkle tree root of participating addresses" }, { "type": "uint64", "name": "participantsLeaves" }, { "type": "uint64", "name": "expiration", "desc": "the unix timestamp that the offer auto-expires at if it has not been accepted by all participants" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Creates a merkle tree based atomic payment/xfer group", "events": [], "recommendations": {} }, { "name": "accept", "args": [{ "type": "pay", "name": "mbrPayment", "desc": "the payment to cover the MBR" }, { "type": "uint64", "name": "id", "desc": "the id of the offer being accepted" }, { "type": "byte[32][]", "name": "proof", "desc": "the bytes32 array proof of inclusion in the participants list" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Accepts an offer", "events": [], "recommendations": {} }, { "name": "escrow", "args": [{ "type": "pay", "name": "payment" }, { "type": "uint64", "name": "id", "desc": "the id of the offer" }, { "type": "address", "name": "receiver", "desc": "the recipient in the offer leaf" }, { "type": "uint64", "name": "amount", "desc": "the amount in the offer leaf" }, { "type": "byte[32][]", "name": "proof", "desc": "the proof to verify the details are part of the tree" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Escrows the assets in the trade for a given leaf in the tree", "events": [], "recommendations": {} }, { "name": "escrowAsa", "args": [{ "type": "pay", "name": "mbrPayment", "desc": "the payment to cover the MBR" }, { "type": "axfer", "name": "assetXfer", "desc": "the asset transfer to escrow the asa" }, { "type": "uint64", "name": "id", "desc": "the id of the offer" }, { "type": "address", "name": "receiver", "desc": "the recipient in the offer leaf" }, { "type": "uint64", "name": "asset", "desc": "the asset in the offer leaf" }, { "type": "uint64", "name": "amount", "desc": "the amount in the offer leaf" }, { "type": "byte[32][]", "name": "proof", "desc": "the proof to verify the details are part of the tree" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Escrows the assets in the trade for a given leaf in the tree", "events": [], "recommendations": {} }, { "name": "disburse", "args": [{ "type": "uint64", "name": "id", "desc": "the id of the offer" }, { "type": "uint64", "name": "receiverWallet", "desc": "the receiver's ARC58 wallet app id (0 if not an ARC58 wallet)" }, { "type": "address", "name": "receiver", "desc": "the recipient address in the leaf" }, { "type": "uint64", "name": "asset", "desc": "the asset being transferred" }, { "type": "uint64", "name": "amount", "desc": "the amount being transferred" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Disburses assets for a leaf in the tree, ensuring ordered processing", "events": [], "recommendations": {} }, { "name": "cancel", "args": [{ "type": "uint64", "name": "id", "desc": "the id of the offer being cancelled" }, { "type": "byte[32][]", "name": "proof", "desc": "a proof of inclusion in the participants list" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "withdraw", "args": [{ "type": "uint64", "name": "id", "desc": "the id of the cancelled offer" }, { "type": "address", "name": "receiver", "desc": "the receiver of the leaf's swap" }, { "type": "uint64", "name": "asset", "desc": "the asset of the leaf's swap" }, { "type": "uint64", "name": "amount", "desc": "the amount of the leaf's swap" }, { "type": "byte[32][]", "name": "proof", "desc": "the proof that the leaf is in the tree" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Withdraws your assets from a cancelled swap if they're escrowed", "events": [], "recommendations": {} }, { "name": "cleanupParticipant", "args": [{ "type": "uint64", "name": "id", "desc": "the id of the offer" }, { "type": "address", "name": "participant", "desc": "the participant address to clean up" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Cleans up participant box and refunds MBR\nCan only be called when offer is completed, cancelled+completed, or expired", "events": [], "recommendations": {} }, { "name": "cleanupOffer", "args": [{ "type": "uint64", "name": "id", "desc": "the id of the offer" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Cleans up the offer box after all participants have been cleaned up\nCan only be called when offer is completed, cancelled+completed, or expired", "events": [], "recommendations": {} }, { "name": "optIn", "args": [{ "type": "pay", "name": "payment", "desc": "The payment transaction" }, { "type": "uint64", "name": "asset", "desc": "The asset to be opted into" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "optin tells the contract to opt into an asa", "events": [], "recommendations": {} }, { "name": "update", "args": [{ "type": "string", "name": "newVersion" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["UpdateApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "mbr", "args": [], "returns": { "type": "(uint64,uint64,uint64,(uint64,uint64))", "struct": "HyperSwapMBRData" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 2, "bytes": 1 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "offerCursor": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "b2ZmZXJfY3Vyc29y", "desc": "global counter for offers" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" } }, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": { "offers": { "keyType": "uint64", "valueType": "OfferValue", "desc": "map of hyper swap offers", "prefix": "bw==" }, "participants": { "keyType": "ParticipantKey", "valueType": "RefundValue", "desc": "map of the participants in each swap", "prefix": "cA==" }, "hashes": { "keyType": "HashKey", "valueType": "RefundValue", "desc": "map of merkle tree hashes during escrow & disbursal phases", "prefix": "aA==" } } } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [1850], "errorMessage": "Assets and amounts mismatch" }, { "pc": [772, 1082, 1404, 1810, 2323, 2562], "errorMessage": "Bytes has valid prefix" }, { "pc": [3042], "errorMessage": "Invalid app upgrade" }, { "pc": [426, 833, 1109, 1451, 2975], "errorMessage": "Invalid payment" }, { "pc": [1475], "errorMessage": "Invalid transfer" }, { "pc": [119], "errorMessage": "OnCompletion must be NoOp" }, { "pc": [297], "errorMessage": "OnCompletion must be UpdateApplication && can only call when not creating" }, { "pc": [3031, 3072], "errorMessage": "Only the Akita DAO can call this function" }, { "pc": [2924], "errorMessage": "all participants must be cleaned up first" }, { "pc": [441, 498, 1731, 3027, 3070], "errorMessage": "application exists" }, { "pc": [1090, 1412, 2570], "errorMessage": "cannot verify leaf" }, { "pc": [430, 547, 702, 1016, 1338, 1745, 2253, 2496, 3019, 3063], "errorMessage": "check GlobalState exists" }, { "pc": [644, 909, 1225, 2160, 2419], "errorMessage": "invalid number of bytes for (len+uint8[32][])" }, { "pc": [314, 3010], "errorMessage": "invalid number of bytes for (len+utf8[])" }, { "pc": [777, 1087, 1409, 1815, 2328, 2567], "errorMessage": "invalid number of bytes for bool8" }, { "pc": [325, 367, 385, 394, 627, 875, 892, 1172, 1189, 1203, 1528, 1540, 1561, 1573, 2141, 2366, 2383, 2397, 2685, 2845, 2958, 3056], "errorMessage": "invalid number of bytes for uint64" }, { "pc": [359, 377, 884, 1181, 1553, 2375, 2696], "errorMessage": "invalid number of bytes for uint8[32]" }, { "pc": [2248], "errorMessage": "must have accepted to cancel" }, { "pc": [780, 2331], "errorMessage": "not a participant in this swap" }, { "pc": [406, 697, 961, 1280], "errorMessage": "offer has expired" }, { "pc": [1727, 1741, 1818], "errorMessage": "receiver is not opted into asset" }, { "pc": [1735], "errorMessage": "receiverWallet address mismatch" }, { "pc": [401], "errorMessage": "root and participantsRoot cannot be the same" }, { "pc": [1164], "errorMessage": "transaction type is axfer" }, { "pc": [350, 619, 867, 1153, 2950], "errorMessage": "transaction type is pay" }, { "pc": [957, 1276, 2227, 2772, 2921], "errorMessage": "wrong state" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDggMzIgMzQ5MDAgMjIyMjAwIDY4MjAwCiAgICBieXRlY2Jsb2NrICJha2l0YV9kYW8iICJvIiAiYWFsIiAicCIgMHgxNTFmN2M3NSAweDE0IDB4MGEgMHgyYmYzY2M1YSAiaCIgMHgxZSAweDAwMDAgMHgzYyAib2ZmZXJfY3Vyc29yIiAweDI4ICJwYWwiIDB4ODAgInZlcnNpb24iIDB4YTI0YzA2N2MgMHgwMDAxICJ3YWxsZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjIyCiAgICAvLyBleHBvcnQgY2xhc3MgSHlwZXJTd2FwIGV4dGVuZHMgY2xhc3NlcyhCYXNlSHlwZXJTd2FwLCBVcGdyYWRlYWJsZUFraXRhQmFzZUNvbnRyYWN0LCBDb250cmFjdFdpdGhPcHRJbikgewogICAgcHVzaGJ5dGVzIDB4ZWE5MTgwZGQgLy8gbWV0aG9kICJ1cGRhdGUoc3RyaW5nKXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBtYWluX3VwZGF0ZV9yb3V0ZUA0CgptYWluX3N3aXRjaF9jYXNlX25leHRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjIKICAgIC8vIGV4cG9ydCBjbGFzcyBIeXBlclN3YXAgZXh0ZW5kcyBjbGFzc2VzKEJhc2VIeXBlclN3YXAsIFVwZ3JhZGVhYmxlQWtpdGFCYXNlQ29udHJhY3QsIENvbnRyYWN0V2l0aE9wdEluKSB7CiAgICB0eG4gT25Db21wbGV0aW9uCiAgICAhCiAgICBhc3NlcnQgLy8gT25Db21wbGV0aW9uIG11c3QgYmUgTm9PcAogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgIGJ6IG1haW5fY3JlYXRlX05vT3BAMjEKICAgIHB1c2hieXRlc3MgMHgwZGIzYTQ0YiAweGJkZTFhMTFlIDB4ZDg1ZmViZGQgMHg0NjZmODcxYSAweDU2NmE2MmIyIDB4MGM3YWI0MmUgMHgwNjMxODY4YiAweDY4M2JiNjc4IDB4ZDNlZTA0ZjAgMHgzOTRlYWViMiAweDMzZTkyYzk0IDB4ODU0ZGVkZTAgMHg4NDA3MzNkZCAvLyBtZXRob2QgIm9mZmVyKHBheSxieXRlWzMyXSx1aW50NjQsYnl0ZVszMl0sdWludDY0LHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJhY2NlcHQocGF5LHVpbnQ2NCxieXRlWzMyXVtdKXZvaWQiLCBtZXRob2QgImVzY3JvdyhwYXksdWludDY0LGFkZHJlc3MsdWludDY0LGJ5dGVbMzJdW10pdm9pZCIsIG1ldGhvZCAiZXNjcm93QXNhKHBheSxheGZlcix1aW50NjQsYWRkcmVzcyx1aW50NjQsdWludDY0LGJ5dGVbMzJdW10pdm9pZCIsIG1ldGhvZCAiZGlzYnVyc2UodWludDY0LHVpbnQ2NCxhZGRyZXNzLHVpbnQ2NCx1aW50NjQpdm9pZCIsIG1ldGhvZCAiY2FuY2VsKHVpbnQ2NCxieXRlWzMyXVtdKXZvaWQiLCBtZXRob2QgIndpdGhkcmF3KHVpbnQ2NCxhZGRyZXNzLHVpbnQ2NCx1aW50NjQsYnl0ZVszMl1bXSl2b2lkIiwgbWV0aG9kICJjbGVhbnVwUGFydGljaXBhbnQodWludDY0LGFkZHJlc3Mpdm9pZCIsIG1ldGhvZCAiY2xlYW51cE9mZmVyKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJvcHRJbihwYXksdWludDY0KXZvaWQiLCBtZXRob2QgInVwZGF0ZUFraXRhREFPKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJvcFVwKCl2b2lkIiwgbWV0aG9kICJtYnIoKSh1aW50NjQsdWludDY0LHVpbnQ2NCwodWludDY0LHVpbnQ2NCkpIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggb2ZmZXIgYWNjZXB0IGVzY3JvdyBlc2Nyb3dBc2EgZGlzYnVyc2UgY2FuY2VsIHdpdGhkcmF3IGNsZWFudXBQYXJ0aWNpcGFudCBjbGVhbnVwT2ZmZXIgb3B0SW4gdXBkYXRlQWtpdGFEQU8gbWFpbl9vcFVwX3JvdXRlQDE4IG1haW5fbWJyX3JvdXRlQDE5CiAgICBlcnIKCm1haW5fbWJyX3JvdXRlQDE5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvYmFzZS50czo2CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHB1c2hieXRlcyAweDE1MWY3Yzc1MDAwMDAwMDAwMDAwYzZkNDAwMDAwMDAwMDAwMDg4NTQwMDAwMDAwMDAwMDA4ODU0MDAwMDAwMDAwMDAwOWZjNDAwMDAwMDAwMDAwMDZhYTQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKbWFpbl9vcFVwX3JvdXRlQDE4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDMKICAgIC8vIG9wVXAoKTogdm9pZCB7IH0KICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCm1haW5fY3JlYXRlX05vT3BAMjE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjIyCiAgICAvLyBleHBvcnQgY2xhc3MgSHlwZXJTd2FwIGV4dGVuZHMgY2xhc3NlcyhCYXNlSHlwZXJTd2FwLCBVcGdyYWRlYWJsZUFraXRhQmFzZUNvbnRyYWN0LCBDb250cmFjdFdpdGhPcHRJbikgewogICAgcHVzaGJ5dGVzIDB4Y2Q5YWQ2N2UgLy8gbWV0aG9kICJjcmVhdGUoc3RyaW5nLHVpbnQ2NCl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggY3JlYXRlCiAgICBlcnIKCm1haW5fdXBkYXRlX3JvdXRlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICB0eG4gT25Db21wbGV0aW9uCiAgICBwdXNoaW50IDQgLy8gVXBkYXRlQXBwbGljYXRpb24KICAgID09CiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgJiYKICAgIGFzc2VydCAvLyBPbkNvbXBsZXRpb24gbXVzdCBiZSBVcGRhdGVBcHBsaWNhdGlvbiAmJiBjYW4gb25seSBjYWxsIHdoZW4gbm90IGNyZWF0aW5nCiAgICBiIHVwZGF0ZQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Okh5cGVyU3dhcC5jcmVhdGVbcm91dGluZ10oKSAtPiB2b2lkOgpjcmVhdGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQ4CiAgICAvLyBAYWJpbWV0aG9kKHsgb25DcmVhdGU6ICdyZXF1aXJlJyB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIHB1c2hpbnQgMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciAobGVuK3V0ZjhbXSkKICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIHZlcnNpb24gPSBHbG9iYWxTdGF0ZTxzdHJpbmc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleVZlcnNpb24gfSkKICAgIGJ5dGVjIDE2IC8vICJ2ZXJzaW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1MAogICAgLy8gdGhpcy52ZXJzaW9uLnZhbHVlID0gdmVyc2lvbgogICAgdW5jb3ZlciAyCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjkKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjUxCiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlID0gYWtpdGFEQU8KICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI3CiAgICAvLyBvZmZlckN1cnNvciA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEh5cGVyU3dhcEdsb2JhbFN0YXRlS2V5T2ZmZXJDdXJzb3IgfSkKICAgIGJ5dGVjIDEyIC8vICJvZmZlcl9jdXJzb3IiCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjUyCiAgICAvLyB0aGlzLm9mZmVyQ3Vyc29yLnZhbHVlID0gMAogICAgaW50Y18wIC8vIDAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQ4CiAgICAvLyBAYWJpbWV0aG9kKHsgb25DcmVhdGU6ICdyZXF1aXJlJyB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Okh5cGVyU3dhcC5vZmZlcltyb3V0aW5nXSgpIC0+IHZvaWQ6Cm9mZmVyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2OC03NQogICAgLy8gb2ZmZXIoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgcm9vdDogYnl0ZXM8MzI+LAogICAgLy8gICBsZWF2ZXM6IHVpbnQ2NCwKICAgIC8vICAgcGFydGljaXBhbnRzUm9vdDogYnl0ZXM8MzI+LAogICAgLy8gICBwYXJ0aWNpcGFudHNMZWF2ZXM6IHVpbnQ2NCwKICAgIC8vICAgZXhwaXJhdGlvbjogdWludDY0CiAgICAvLyApIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGR1cAogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50OFszMl0KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgZHVwCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ4WzMyXQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDUKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjc2CiAgICAvLyBhc3NlcnQocm9vdCAhPT0gcGFydGljaXBhbnRzUm9vdCwgRVJSX0JBRF9ST09UUykKICAgIGRpZyA2CiAgICBkaWcgNAogICAgIT0KICAgIGFzc2VydCAvLyByb290IGFuZCBwYXJ0aWNpcGFudHNSb290IGNhbm5vdCBiZSB0aGUgc2FtZQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo3NwogICAgLy8gYXNzZXJ0KGV4cGlyYXRpb24gPiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLCBFUlJfT0ZGRVJfRVhQSVJFRCkKICAgIGR1cAogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgPgogICAgYXNzZXJ0IC8vIG9mZmVyIGhhcyBleHBpcmVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjgzCiAgICAvLyBjb25zdCBwYXlvciA9IHBheW1lbnQuc2VuZGVyCiAgICBkaWcgNwogICAgZ3R4bnMgU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjg1LTkyCiAgICAvLyBhc3NlcnRNYXRjaCgKICAgIC8vICAgcGF5bWVudCwKICAgIC8vICAgewogICAgLy8gICAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IGh5cGVyU3dhcE9mZmVyTUJSQW1vdW50CiAgICAvLyAgIH0sCiAgICAvLyAgIEVSUl9JTlZBTElEX1BBWU1FTlQKICAgIC8vICkKICAgIGRpZyA4CiAgICBndHhucyBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo4OAogICAgLy8gcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6ODUtOTIKICAgIC8vIGFzc2VydE1hdGNoKAogICAgLy8gICBwYXltZW50LAogICAgLy8gICB7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogaHlwZXJTd2FwT2ZmZXJNQlJBbW91bnQKICAgIC8vICAgfSwKICAgIC8vICAgRVJSX0lOVkFMSURfUEFZTUVOVAogICAgLy8gKQogICAgPT0KICAgIHVuY292ZXIgOQogICAgZ3R4bnMgQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjgyCiAgICAvLyBjb25zdCBoeXBlclN3YXBPZmZlck1CUkFtb3VudDogdWludDY0ID0gY29zdHMub2ZmZXJzICsgY29zdHMucGFydGljaXBhbnRzICsgKG1ldGFNZXJrbGVzQ29zdCAqIDIpCiAgICBpbnRjIDUgLy8gMjIyMjAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjg1LTkyCiAgICAvLyBhc3NlcnRNYXRjaCgKICAgIC8vICAgcGF5bWVudCwKICAgIC8vICAgewogICAgLy8gICAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IGh5cGVyU3dhcE9mZmVyTUJSQW1vdW50CiAgICAvLyAgIH0sCiAgICAvLyAgIEVSUl9JTlZBTElEX1BBWU1FTlQKICAgIC8vICkKICAgID09CiAgICAmJgogICAgYXNzZXJ0IC8vIEludmFsaWQgcGF5bWVudAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo5NAogICAgLy8gY29uc3QgbWV0YU1lcmtsZXNBcHBJRCA9IGdldEFraXRhQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5tZXRhTWVya2xlcwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI5CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo5NAogICAgLy8gY29uc3QgbWV0YU1lcmtsZXNBcHBJRCA9IGdldEFraXRhQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5tZXRhTWVya2xlcwogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0KSkKICAgIGJ5dGVjXzIgLy8gImFhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6OTQKICAgIC8vIGNvbnN0IG1ldGFNZXJrbGVzQXBwSUQgPSBnZXRBa2l0YUFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkubWV0YU1lcmtsZXMKICAgIHB1c2hpbnQgNzIgLy8gNzIKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjk2LTEwNwogICAgLy8gYWJpQ2FsbDx0eXBlb2YgTWV0YU1lcmtsZXMucHJvdG90eXBlLmFkZFJvb3Q+KHsKICAgIC8vICAgYXBwSWQ6IG1ldGFNZXJrbGVzQXBwSUQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKG1ldGFNZXJrbGVzQXBwSUQpLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ldGFNZXJrbGVzQ29zdCwKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBTdHJpbmcocm9vdCksCiAgICAvLyAgICAgcm9vdCwKICAgIC8vICAgICBNZXJrbGVUcmVlVHlwZVRyYWRlCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxMDAKICAgIC8vIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihtZXRhTWVya2xlc0FwcElEKS5hZGRyZXNzLAogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjgxCiAgICAvLyBjb25zdCBtZXRhTWVya2xlc0Nvc3Q6IHVpbnQ2NCA9IGNvc3RzLm1tLnJvb3QgKyBjb3N0cy5tbS5kYXRhCiAgICBpbnRjIDYgLy8gNjgyMDAKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjk5LTEwMgogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKG1ldGFNZXJrbGVzQXBwSUQpLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogbWV0YU1lcmtsZXNDb3N0LAogICAgLy8gfSksCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjk2LTEwNwogICAgLy8gYWJpQ2FsbDx0eXBlb2YgTWV0YU1lcmtsZXMucHJvdG90eXBlLmFkZFJvb3Q+KHsKICAgIC8vICAgYXBwSWQ6IG1ldGFNZXJrbGVzQXBwSUQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKG1ldGFNZXJrbGVzQXBwSUQpLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ldGFNZXJrbGVzQ29zdCwKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBTdHJpbmcocm9vdCksCiAgICAvLyAgICAgcm9vdCwKICAgIC8vICAgICBNZXJrbGVUcmVlVHlwZVRyYWRlCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjEwMwogICAgLy8gU3RyaW5nKHJvb3QpLAogICAgdW5jb3ZlciA3CiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgZGlnIDgKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxMDUKICAgIC8vIE1lcmtsZVRyZWVUeXBlVHJhZGUKICAgIHB1c2hpbnQgMyAvLyAzCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjk2LTEwNwogICAgLy8gYWJpQ2FsbDx0eXBlb2YgTWV0YU1lcmtsZXMucHJvdG90eXBlLmFkZFJvb3Q+KHsKICAgIC8vICAgYXBwSWQ6IG1ldGFNZXJrbGVzQXBwSUQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKG1ldGFNZXJrbGVzQXBwSUQpLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ldGFNZXJrbGVzQ29zdCwKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBTdHJpbmcocm9vdCksCiAgICAvLyAgICAgcm9vdCwKICAgIC8vICAgICBNZXJrbGVUcmVlVHlwZVRyYWRlCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgYnl0ZWMgMTcgLy8gbWV0aG9kICJhZGRSb290KHBheSxzdHJpbmcsYnl0ZVszMl0sdWludDY0KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyA4CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZHVwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZGlnIDEKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTEwLTEyMQogICAgLy8gYWJpQ2FsbDx0eXBlb2YgTWV0YU1lcmtsZXMucHJvdG90eXBlLmFkZFJvb3Q+KHsKICAgIC8vICAgYXBwSWQ6IG1ldGFNZXJrbGVzQXBwSUQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKG1ldGFNZXJrbGVzQXBwSUQpLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ldGFNZXJrbGVzQ29zdCwKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBTdHJpbmcocGFydGljaXBhbnRzUm9vdCksCiAgICAvLyAgICAgcGFydGljaXBhbnRzUm9vdCwKICAgIC8vICAgICBNZXJrbGVUcmVlVHlwZVRyYWRlCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxMTQKICAgIC8vIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihtZXRhTWVya2xlc0FwcElEKS5hZGRyZXNzLAogICAgZGlnIDEKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6ODEKICAgIC8vIGNvbnN0IG1ldGFNZXJrbGVzQ29zdDogdWludDY0ID0gY29zdHMubW0ucm9vdCArIGNvc3RzLm1tLmRhdGEKICAgIGludGMgNiAvLyA2ODIwMAogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTEzLTExNgogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKG1ldGFNZXJrbGVzQXBwSUQpLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogbWV0YU1lcmtsZXNDb3N0LAogICAgLy8gfSksCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjExMC0xMjEKICAgIC8vIGFiaUNhbGw8dHlwZW9mIE1ldGFNZXJrbGVzLnByb3RvdHlwZS5hZGRSb290Pih7CiAgICAvLyAgIGFwcElkOiBtZXRhTWVya2xlc0FwcElELAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihtZXRhTWVya2xlc0FwcElEKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtZXRhTWVya2xlc0Nvc3QsCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgU3RyaW5nKHBhcnRpY2lwYW50c1Jvb3QpLAogICAgLy8gICAgIHBhcnRpY2lwYW50c1Jvb3QsCiAgICAvLyAgICAgTWVya2xlVHJlZVR5cGVUcmFkZQogICAgLy8gICBdLAogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxMTcKICAgIC8vIFN0cmluZyhwYXJ0aWNpcGFudHNSb290KSwKICAgIHVuY292ZXIgNQogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIGRpZyA2CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTEwLTEyMQogICAgLy8gYWJpQ2FsbDx0eXBlb2YgTWV0YU1lcmtsZXMucHJvdG90eXBlLmFkZFJvb3Q+KHsKICAgIC8vICAgYXBwSWQ6IG1ldGFNZXJrbGVzQXBwSUQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKG1ldGFNZXJrbGVzQXBwSUQpLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ldGFNZXJrbGVzQ29zdCwKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBTdHJpbmcocGFydGljaXBhbnRzUm9vdCksCiAgICAvLyAgICAgcGFydGljaXBhbnRzUm9vdCwKICAgIC8vICAgICBNZXJrbGVUcmVlVHlwZVRyYWRlCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgYnl0ZWMgMTcgLy8gbWV0aG9kICJhZGRSb290KHBheSxzdHJpbmcsYnl0ZVszMl0sdWludDY0KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyA1CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDEKICAgIC8vIGNvbnN0IGlkID0gdGhpcy5vZmZlckN1cnNvci52YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjcKICAgIC8vIG9mZmVyQ3Vyc29yID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogSHlwZXJTd2FwR2xvYmFsU3RhdGVLZXlPZmZlckN1cnNvciB9KQogICAgYnl0ZWMgMTIgLy8gIm9mZmVyX2N1cnNvciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDEKICAgIC8vIGNvbnN0IGlkID0gdGhpcy5vZmZlckN1cnNvci52YWx1ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDIKICAgIC8vIHRoaXMub2ZmZXJDdXJzb3IudmFsdWUgKz0gMQogICAgZHVwCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyNwogICAgLy8gb2ZmZXJDdXJzb3IgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBIeXBlclN3YXBHbG9iYWxTdGF0ZUtleU9mZmVyQ3Vyc29yIH0pCiAgICBieXRlYyAxMiAvLyAib2ZmZXJfY3Vyc29yIgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0MgogICAgLy8gdGhpcy5vZmZlckN1cnNvci52YWx1ZSArPSAxCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo4MgogICAgLy8gY29uc3QgaHlwZXJTd2FwT2ZmZXJNQlJBbW91bnQ6IHVpbnQ2NCA9IGNvc3RzLm9mZmVycyArIGNvc3RzLnBhcnRpY2lwYW50cyArIChtZXRhTWVya2xlc0Nvc3QgKiAyKQogICAgaW50YyA1IC8vIDIyMjIwMAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxMjYKICAgIC8vIHRoaXMucGFydGljaXBhbnRzKHsgaWQsIGFkZHJlc3M6IFR4bi5zZW5kZXIgfSkudmFsdWUgPSB7IHBheW9yLCBhbW91bnQ6IGh5cGVyU3dhcE9mZmVyTUJSQW1vdW50IH0KICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICB0eG4gU2VuZGVyCiAgICB1bmNvdmVyIDIKICAgIGl0b2IKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzQKICAgIC8vIHBhcnRpY2lwYW50cyA9IEJveE1hcDxQYXJ0aWNpcGFudEtleSwgUmVmdW5kVmFsdWU+KHsga2V5UHJlZml4OiBIeXBlclN3YXBCb3hQcmVmaXhQYXJ0aWNpcGFudHMgfSkKICAgIGJ5dGVjXzMgLy8gInAiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTI2CiAgICAvLyB0aGlzLnBhcnRpY2lwYW50cyh7IGlkLCBhZGRyZXNzOiBUeG4uc2VuZGVyIH0pLnZhbHVlID0geyBwYXlvciwgYW1vdW50OiBoeXBlclN3YXBPZmZlck1CUkFtb3VudCB9CiAgICB1bmNvdmVyIDIKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTMwCiAgICAvLyBzdGF0ZTogU1RBVEVfT0ZGRVJFRCwKICAgIGJ5dGVjIDYgLy8gMHgwYQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxMjktMTM4CiAgICAvLyB0aGlzLm9mZmVycyhpZCkudmFsdWUgPSB7CiAgICAvLyAgIHN0YXRlOiBTVEFURV9PRkZFUkVELAogICAgLy8gICByb290LAogICAgLy8gICBsZWF2ZXMsCiAgICAvLyAgIGVzY3Jvd2VkOiAwLAogICAgLy8gICBwYXJ0aWNpcGFudHNSb290LAogICAgLy8gICBwYXJ0aWNpcGFudHNMZWF2ZXMsCiAgICAvLyAgIGFjY2VwdGFuY2VzOiAxLAogICAgLy8gICBleHBpcmF0aW9uLAogICAgLy8gfQogICAgdW5jb3ZlciA2CiAgICBjb25jYXQKICAgIHVuY292ZXIgNQogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjEzMwogICAgLy8gZXNjcm93ZWQ6IDAsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxMjktMTM4CiAgICAvLyB0aGlzLm9mZmVycyhpZCkudmFsdWUgPSB7CiAgICAvLyAgIHN0YXRlOiBTVEFURV9PRkZFUkVELAogICAgLy8gICByb290LAogICAgLy8gICBsZWF2ZXMsCiAgICAvLyAgIGVzY3Jvd2VkOiAwLAogICAgLy8gICBwYXJ0aWNpcGFudHNSb290LAogICAgLy8gICBwYXJ0aWNpcGFudHNMZWF2ZXMsCiAgICAvLyAgIGFjY2VwdGFuY2VzOiAxLAogICAgLy8gICBleHBpcmF0aW9uLAogICAgLy8gfQogICAgaXRvYgogICAgY29uY2F0CiAgICB1bmNvdmVyIDQKICAgIGNvbmNhdAogICAgdW5jb3ZlciAzCiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTM2CiAgICAvLyBhY2NlcHRhbmNlczogMSwKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjEyOS0xMzgKICAgIC8vIHRoaXMub2ZmZXJzKGlkKS52YWx1ZSA9IHsKICAgIC8vICAgc3RhdGU6IFNUQVRFX09GRkVSRUQsCiAgICAvLyAgIHJvb3QsCiAgICAvLyAgIGxlYXZlcywKICAgIC8vICAgZXNjcm93ZWQ6IDAsCiAgICAvLyAgIHBhcnRpY2lwYW50c1Jvb3QsCiAgICAvLyAgIHBhcnRpY2lwYW50c0xlYXZlcywKICAgIC8vICAgYWNjZXB0YW5jZXM6IDEsCiAgICAvLyAgIGV4cGlyYXRpb24sCiAgICAvLyB9CiAgICBpdG9iCiAgICBjb25jYXQKICAgIHVuY292ZXIgMgogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjMyCiAgICAvLyBvZmZlcnMgPSBCb3hNYXA8dWludDY0LCBPZmZlclZhbHVlPih7IGtleVByZWZpeDogSHlwZXJTd2FwQm94UHJlZml4T2ZmZXJzIH0pCiAgICBieXRlY18xIC8vICJvIgogICAgdW5jb3ZlciAyCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTI5LTEzOAogICAgLy8gdGhpcy5vZmZlcnMoaWQpLnZhbHVlID0gewogICAgLy8gICBzdGF0ZTogU1RBVEVfT0ZGRVJFRCwKICAgIC8vICAgcm9vdCwKICAgIC8vICAgbGVhdmVzLAogICAgLy8gICBlc2Nyb3dlZDogMCwKICAgIC8vICAgcGFydGljaXBhbnRzUm9vdCwKICAgIC8vICAgcGFydGljaXBhbnRzTGVhdmVzLAogICAgLy8gICBhY2NlcHRhbmNlczogMSwKICAgIC8vICAgZXhwaXJhdGlvbiwKICAgIC8vIH0KICAgIHN3YXAKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjgtNzUKICAgIC8vIG9mZmVyKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIHJvb3Q6IGJ5dGVzPDMyPiwKICAgIC8vICAgbGVhdmVzOiB1aW50NjQsCiAgICAvLyAgIHBhcnRpY2lwYW50c1Jvb3Q6IGJ5dGVzPDMyPiwKICAgIC8vICAgcGFydGljaXBhbnRzTGVhdmVzOiB1aW50NjQsCiAgICAvLyAgIGV4cGlyYXRpb246IHVpbnQ2NAogICAgLy8gKSB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo6SHlwZXJTd2FwLmFjY2VwdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmFjY2VwdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTQ4CiAgICAvLyBhY2NlcHQobWJyUGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBpZDogdWludDY0LCBwcm9vZjogUHJvb2YpIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBpbnRjXzMgLy8gMzIKICAgICoKICAgIHB1c2hpbnQgMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciAobGVuK3VpbnQ4WzMyXVtdKQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxNTAKICAgIC8vIGFzc2VydCh0aGlzLm9mZmVycyhpZCkuZXhpc3RzKQogICAgc3dhcAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozMgogICAgLy8gb2ZmZXJzID0gQm94TWFwPHVpbnQ2NCwgT2ZmZXJWYWx1ZT4oeyBrZXlQcmVmaXg6IEh5cGVyU3dhcEJveFByZWZpeE9mZmVycyB9KQogICAgYnl0ZWNfMSAvLyAibyIKICAgIGRpZyAxCiAgICBjb25jYXQKICAgIGR1cAogICAgY292ZXIgNAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxNTAKICAgIC8vIGFzc2VydCh0aGlzLm9mZmVycyhpZCkuZXhpc3RzKQogICAgZHVwCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGFzc2VydAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxNTEKICAgIC8vIGNvbnN0IHsgc3RhdGUsIGV4cGlyYXRpb24sIHBhcnRpY2lwYW50c1Jvb3QsIGFjY2VwdGFuY2VzLCBwYXJ0aWNpcGFudHNMZWF2ZXMgfSA9IHRoaXMub2ZmZXJzKGlkKS52YWx1ZQogICAgZHVwCiAgICBib3hfZ2V0CiAgICBwb3AKICAgIGR1cAogICAgZXh0cmFjdCAwIDEKICAgIGRpZyAxCiAgICBwdXNoaW50IDk3IC8vIDk3CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZGlnIDIKICAgIGV4dHJhY3QgNDkgMzIKICAgIGRpZyAzCiAgICBwdXNoaW50IDg5IC8vIDg5CiAgICBleHRyYWN0X3VpbnQ2NAogICAgdW5jb3ZlciA0CiAgICBwdXNoaW50IDgxIC8vIDgxCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxNTMKICAgIC8vIGFzc2VydChzdGF0ZSA9PT0gU1RBVEVfT0ZGRVJFRCkKICAgIHVuY292ZXIgNAogICAgYnl0ZWMgNiAvLyAweDBhCiAgICA9PQogICAgYXNzZXJ0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE1NAogICAgLy8gYXNzZXJ0KGV4cGlyYXRpb24gPiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLCBFUlJfT0ZGRVJfRVhQSVJFRCkKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIHVuY292ZXIgNAogICAgPAogICAgYXNzZXJ0IC8vIG9mZmVyIGhhcyBleHBpcmVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE1Ni0xNjUKICAgIC8vIGNvbnN0IGlzUGFydGljaXBhbnQgPSBhYmlDYWxsPHR5cGVvZiBNZXRhTWVya2xlcy5wcm90b3R5cGUudmVyaWZ5Pih7CiAgICAvLyAgIGFwcElkOiBnZXRBa2l0YUFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkubWV0YU1lcmtsZXMsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBTdHJpbmcocGFydGljaXBhbnRzUm9vdCksCiAgICAvLyAgICAgc2hhMjU2KHNoYTI1NihUeG4uc2VuZGVyLmJ5dGVzKSksCiAgICAvLyAgICAgcHJvb2YsCiAgICAvLyAgICAgTWVya2xlVHJlZVR5cGVUcmFkZQogICAgLy8gICBdLAogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTU3CiAgICAvLyBhcHBJZDogZ2V0QWtpdGFBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLm1ldGFNZXJrbGVzLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI5CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxNTcKICAgIC8vIGFwcElkOiBnZXRBa2l0YUFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkubWV0YU1lcmtsZXMsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NAogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgYnl0ZWNfMiAvLyAiYWFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxNTcKICAgIC8vIGFwcElkOiBnZXRBa2l0YUFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkubWV0YU1lcmtsZXMsCiAgICBwdXNoaW50IDcyIC8vIDcyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxNTkKICAgIC8vIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTYwCiAgICAvLyBTdHJpbmcocGFydGljaXBhbnRzUm9vdCksCiAgICBkaWcgNAogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgdW5jb3ZlciA1CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTYxCiAgICAvLyBzaGEyNTYoc2hhMjU2KFR4bi5zZW5kZXIuYnl0ZXMpKSwKICAgIHR4biBTZW5kZXIKICAgIHNoYTI1NgogICAgc2hhMjU2CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE2MwogICAgLy8gTWVya2xlVHJlZVR5cGVUcmFkZQogICAgcHVzaGludCAzIC8vIDMKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTU2LTE2NQogICAgLy8gY29uc3QgaXNQYXJ0aWNpcGFudCA9IGFiaUNhbGw8dHlwZW9mIE1ldGFNZXJrbGVzLnByb3RvdHlwZS52ZXJpZnk+KHsKICAgIC8vICAgYXBwSWQ6IGdldEFraXRhQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5tZXRhTWVya2xlcywKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIFN0cmluZyhwYXJ0aWNpcGFudHNSb290KSwKICAgIC8vICAgICBzaGEyNTYoc2hhMjU2KFR4bi5zZW5kZXIuYnl0ZXMpKSwKICAgIC8vICAgICBwcm9vZiwKICAgIC8vICAgICBNZXJrbGVUcmVlVHlwZVRyYWRlCiAgICAvLyAgIF0sCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgYnl0ZWMgNyAvLyBtZXRob2QgInZlcmlmeShhZGRyZXNzLHN0cmluZyxieXRlWzMyXSxieXRlWzMyXVtdLHVpbnQ2NClib29sIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDYKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBzd2FwCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWMgNCAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYm9vbDgKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTY3CiAgICAvLyBhc3NlcnQoaXNQYXJ0aWNpcGFudCwgRVJSX05PVF9BX1BBUlRJQ0lQQU5UKQogICAgYXNzZXJ0IC8vIG5vdCBhIHBhcnRpY2lwYW50IGluIHRoaXMgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxNzAKICAgIC8vIGNvbnN0IHNlbmRlclBhcnRpY2lwYW50S2V5ID0geyBpZCwgYWRkcmVzczogVHhuLnNlbmRlciB9CiAgICB0eG4gU2VuZGVyCiAgICB1bmNvdmVyIDQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxNzEKICAgIC8vIGFzc2VydCghdGhpcy5wYXJ0aWNpcGFudHMoc2VuZGVyUGFydGljaXBhbnRLZXkpLmV4aXN0cykKICAgIGR1cAogICAgZXh0cmFjdCAwIDgKICAgIHN3YXAKICAgIGV4dHJhY3QgOCAzMgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjM0CiAgICAvLyBwYXJ0aWNpcGFudHMgPSBCb3hNYXA8UGFydGljaXBhbnRLZXksIFJlZnVuZFZhbHVlPih7IGtleVByZWZpeDogSHlwZXJTd2FwQm94UHJlZml4UGFydGljaXBhbnRzIH0pCiAgICBieXRlY18zIC8vICJwIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE3MQogICAgLy8gYXNzZXJ0KCF0aGlzLnBhcnRpY2lwYW50cyhzZW5kZXJQYXJ0aWNpcGFudEtleSkuZXhpc3RzKQogICAgZHVwCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgICEKICAgIGFzc2VydAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxNzMKICAgIC8vIGNvbnN0IG5ld0FjY2VwdGFuY2VzOiB1aW50NjQgPSBhY2NlcHRhbmNlcyArIDEKICAgIHVuY292ZXIgMgogICAgaW50Y18xIC8vIDEKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTc0CiAgICAvLyB0aGlzLm9mZmVycyhpZCkudmFsdWUuYWNjZXB0YW5jZXMgPSBuZXdBY2NlcHRhbmNlcwogICAgZHVwCiAgICBpdG9iCiAgICB1bmNvdmVyIDQKICAgIHB1c2hpbnQgODkgLy8gODkKICAgIHVuY292ZXIgMgogICAgYm94X3JlcGxhY2UKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTc4LTE4NQogICAgLy8gYXNzZXJ0TWF0Y2goCiAgICAvLyAgIG1iclBheW1lbnQsCiAgICAvLyAgIHsKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBjb3N0cy5wYXJ0aWNpcGFudHMKICAgIC8vICAgfSwKICAgIC8vICAgRVJSX0lOVkFMSURfUEFZTUVOVAogICAgLy8gKQogICAgZGlnIDMKICAgIGd0eG5zIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE4MQogICAgLy8gcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTc4LTE4NQogICAgLy8gYXNzZXJ0TWF0Y2goCiAgICAvLyAgIG1iclBheW1lbnQsCiAgICAvLyAgIHsKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBjb3N0cy5wYXJ0aWNpcGFudHMKICAgIC8vICAgfSwKICAgIC8vICAgRVJSX0lOVkFMSURfUEFZTUVOVAogICAgLy8gKQogICAgPT0KICAgIGRpZyA0CiAgICBndHhucyBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MTgyCiAgICAvLyBhbW91bnQ6IGNvc3RzLnBhcnRpY2lwYW50cwogICAgaW50YyA0IC8vIDM0OTAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE3OC0xODUKICAgIC8vIGFzc2VydE1hdGNoKAogICAgLy8gICBtYnJQYXltZW50LAogICAgLy8gICB7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogY29zdHMucGFydGljaXBhbnRzCiAgICAvLyAgIH0sCiAgICAvLyAgIEVSUl9JTlZBTElEX1BBWU1FTlQKICAgIC8vICkKICAgID09CiAgICAmJgogICAgYXNzZXJ0IC8vIEludmFsaWQgcGF5bWVudAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxODkKICAgIC8vIHBheW9yOiBtYnJQYXltZW50LnNlbmRlciwKICAgIHVuY292ZXIgMwogICAgZ3R4bnMgU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE4MgogICAgLy8gYW1vdW50OiBjb3N0cy5wYXJ0aWNpcGFudHMKICAgIGludGMgNCAvLyAzNDkwMAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxODgtMTkxCiAgICAvLyB0aGlzLnBhcnRpY2lwYW50cyhzZW5kZXJQYXJ0aWNpcGFudEtleSkudmFsdWUgPSB7CiAgICAvLyAgIHBheW9yOiBtYnJQYXltZW50LnNlbmRlciwKICAgIC8vICAgYW1vdW50OiBjb3N0cy5wYXJ0aWNpcGFudHMKICAgIC8vIH0KICAgIGl0b2IKICAgIHN3YXAKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE5MwogICAgLy8gaWYgKHBhcnRpY2lwYW50c0xlYXZlcyA9PT0gbmV3QWNjZXB0YW5jZXMpIHsKICAgID09CiAgICBieiBhY2NlcHRfYWZ0ZXJfaWZfZWxzZUA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjE5NAogICAgLy8gdGhpcy5vZmZlcnMoaWQpLnZhbHVlLnN0YXRlID0gU1RBVEVfRVNDUk9XSU5HCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBieXRlYyA1IC8vIDB4MTQKICAgIGJveF9yZXBsYWNlCgphY2NlcHRfYWZ0ZXJfaWZfZWxzZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoxNDgKICAgIC8vIGFjY2VwdChtYnJQYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGlkOiB1aW50NjQsIHByb29mOiBQcm9vZikgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Okh5cGVyU3dhcC5lc2Nyb3dbcm91dGluZ10oKSAtPiB2b2lkOgplc2Nyb3c6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjIwOAogICAgLy8gZXNjcm93KHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgaWQ6IHVpbnQ2NCwgcmVjZWl2ZXI6IEFjY291bnQsIGFtb3VudDogdWludDY0LCBwcm9vZjogUHJvb2YpIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ4WzMyXQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBpbnRjXzMgLy8gMzIKICAgICoKICAgIHB1c2hpbnQgMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciAobGVuK3VpbnQ4WzMyXVtdKQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyMTAKICAgIC8vIGFzc2VydCh0aGlzLm9mZmVycyhpZCkuZXhpc3RzKQogICAgdW5jb3ZlciAzCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjMyCiAgICAvLyBvZmZlcnMgPSBCb3hNYXA8dWludDY0LCBPZmZlclZhbHVlPih7IGtleVByZWZpeDogSHlwZXJTd2FwQm94UHJlZml4T2ZmZXJzIH0pCiAgICBieXRlY18xIC8vICJvIgogICAgZGlnIDEKICAgIGNvbmNhdAogICAgZHVwCiAgICBjb3ZlciA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjIxMAogICAgLy8gYXNzZXJ0KHRoaXMub2ZmZXJzKGlkKS5leGlzdHMpCiAgICBkdXAKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYXNzZXJ0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjIxMQogICAgLy8gY29uc3QgeyBzdGF0ZSwgcm9vdCwgZXNjcm93ZWQsIGxlYXZlcywgZXhwaXJhdGlvbiB9ID0gdGhpcy5vZmZlcnMoaWQpLnZhbHVlCiAgICBkdXAKICAgIGJveF9nZXQKICAgIHBvcAogICAgZHVwCiAgICBleHRyYWN0IDAgMQogICAgZGlnIDEKICAgIGV4dHJhY3QgMSAzMgogICAgZGlnIDIKICAgIHB1c2hpbnQgNDEgLy8gNDEKICAgIGV4dHJhY3RfdWludDY0CiAgICBkaWcgMwogICAgcHVzaGludCAzMyAvLyAzMwogICAgZXh0cmFjdF91aW50NjQKICAgIHVuY292ZXIgNAogICAgcHVzaGludCA5NyAvLyA5NwogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjEzCiAgICAvLyBhc3NlcnQoc3RhdGUgPT09IFNUQVRFX0VTQ1JPV0lORywgRVJSX0lOVkFMSURfU1RBVEUpCiAgICB1bmNvdmVyIDQKICAgIGJ5dGVjIDUgLy8gMHgxNAogICAgPT0KICAgIGFzc2VydCAvLyB3cm9uZyBzdGF0ZQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyMTUKICAgIC8vIGFzc2VydChleHBpcmF0aW9uID4gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwgRVJSX09GRkVSX0VYUElSRUQpCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICA+CiAgICBhc3NlcnQgLy8gb2ZmZXIgaGFzIGV4cGlyZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjE3CiAgICAvLyBjb25zdCBzZW5kZXJQYXJ0aWNpcGFudEtleSA9IHsgaWQsIGFkZHJlc3M6IFR4bi5zZW5kZXIgfQogICAgZGlnIDQKICAgIHR4biBTZW5kZXIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyMTgKICAgIC8vIGFzc2VydCh0aGlzLnBhcnRpY2lwYW50cyhzZW5kZXJQYXJ0aWNpcGFudEtleSkuZXhpc3RzKQogICAgZHVwCiAgICBleHRyYWN0IDAgOAogICAgc3dhcAogICAgZXh0cmFjdCA4IDMyCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzQKICAgIC8vIHBhcnRpY2lwYW50cyA9IEJveE1hcDxQYXJ0aWNpcGFudEtleSwgUmVmdW5kVmFsdWU+KHsga2V5UHJlZml4OiBIeXBlclN3YXBCb3hQcmVmaXhQYXJ0aWNpcGFudHMgfSkKICAgIGJ5dGVjXzMgLy8gInAiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjE4CiAgICAvLyBhc3NlcnQodGhpcy5wYXJ0aWNpcGFudHMoc2VuZGVyUGFydGljaXBhbnRLZXkpLmV4aXN0cykKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYXNzZXJ0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjIyMAogICAgLy8gY29uc3QgaGFzaCA9IHNoYTI1NihzaGEyNTYoQnl0ZXNgJHtUeG4uc2VuZGVyLmJ5dGVzfSR7cmVjZWl2ZXIuYnl0ZXN9JHtpdG9iKDApfSR7aXRvYihhbW91bnQpfWApKQogICAgdHhuIFNlbmRlcgogICAgdW5jb3ZlciA4CiAgICBjb25jYXQKICAgIGludGNfMCAvLyAwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIGRpZyA3CiAgICBpdG9iCiAgICBjb25jYXQKICAgIHNoYTI1NgogICAgc2hhMjU2CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjIyMQogICAgLy8gY29uc3QgaGFzaEtleTogSGFzaEtleSA9IHsgaWQsIGhhc2ggfQogICAgdW5jb3ZlciA1CiAgICBkaWcgMQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjM2CiAgICAvLyBoYXNoZXMgPSBCb3hNYXA8SGFzaEtleSwgUmVmdW5kVmFsdWU+KHsga2V5UHJlZml4OiBIeXBlclN3YXBCb3hQcmVmaXhIYXNoZXMgfSkKICAgIGJ5dGVjIDggLy8gImgiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjIyCiAgICAvLyBhc3NlcnQoIXRoaXMuaGFzaGVzKGhhc2hLZXkpLmV4aXN0cykKICAgIGR1cAogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICAhCiAgICBhc3NlcnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjI0LTIzMwogICAgLy8gY29uc3QgdmVyaWZpZWQgPSBhYmlDYWxsPHR5cGVvZiBNZXRhTWVya2xlcy5wcm90b3R5cGUudmVyaWZ5Pih7CiAgICAvLyAgIGFwcElkOiBnZXRBa2l0YUFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkubWV0YU1lcmtsZXMsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBTdHJpbmcocm9vdCksCiAgICAvLyAgICAgaGFzaCwKICAgIC8vICAgICBwcm9vZiwKICAgIC8vICAgICBNZXJrbGVUcmVlVHlwZVRyYWRlCiAgICAvLyAgIF0sCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyMjUKICAgIC8vIGFwcElkOiBnZXRBa2l0YUFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkubWV0YU1lcmtsZXMsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjkKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjIyNQogICAgLy8gYXBwSWQ6IGdldEFraXRhQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5tZXRhTWVya2xlcywKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICBieXRlY18yIC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjIyNQogICAgLy8gYXBwSWQ6IGdldEFraXRhQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5tZXRhTWVya2xlcywKICAgIHB1c2hpbnQgNzIgLy8gNzIKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjIyNwogICAgLy8gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyMjgKICAgIC8vIFN0cmluZyhyb290KSwKICAgIGRpZyA2CiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICB1bmNvdmVyIDcKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyMzEKICAgIC8vIE1lcmtsZVRyZWVUeXBlVHJhZGUKICAgIHB1c2hpbnQgMyAvLyAzCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjIyNC0yMzMKICAgIC8vIGNvbnN0IHZlcmlmaWVkID0gYWJpQ2FsbDx0eXBlb2YgTWV0YU1lcmtsZXMucHJvdG90eXBlLnZlcmlmeT4oewogICAgLy8gICBhcHBJZDogZ2V0QWtpdGFBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLm1ldGFNZXJrbGVzLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgU3RyaW5nKHJvb3QpLAogICAgLy8gICAgIGhhc2gsCiAgICAvLyAgICAgcHJvb2YsCiAgICAvLyAgICAgTWVya2xlVHJlZVR5cGVUcmFkZQogICAgLy8gICBdLAogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGJ5dGVjIDcgLy8gbWV0aG9kICJ2ZXJpZnkoYWRkcmVzcyxzdHJpbmcsYnl0ZVszMl0sYnl0ZVszMl1bXSx1aW50NjQpYm9vbCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciA2CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgc3dhcAogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjIDQgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18xIC8vIDEKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGJvb2w4CiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Yml0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjIzNQogICAgLy8gYXNzZXJ0KHZlcmlmaWVkLCBFUlJfQ0FOVF9WRVJJRllfTEVBRikKICAgIGFzc2VydCAvLyBjYW5ub3QgdmVyaWZ5IGxlYWYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjM5LTI0NgogICAgLy8gYXNzZXJ0TWF0Y2goCiAgICAvLyAgIHBheW1lbnQsCiAgICAvLyAgIHsKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBhbW91bnQgKyBjb3N0cy5oYXNoZXMKICAgIC8vICAgfSwKICAgIC8vICAgRVJSX0lOVkFMSURfUEFZTUVOVAogICAgLy8gKQogICAgZGlnIDUKICAgIGd0eG5zIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI0MgogICAgLy8gcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjM5LTI0NgogICAgLy8gYXNzZXJ0TWF0Y2goCiAgICAvLyAgIHBheW1lbnQsCiAgICAvLyAgIHsKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBhbW91bnQgKyBjb3N0cy5oYXNoZXMKICAgIC8vICAgfSwKICAgIC8vICAgRVJSX0lOVkFMSURfUEFZTUVOVAogICAgLy8gKQogICAgPT0KICAgIGRpZyA2CiAgICBndHhucyBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjQzCiAgICAvLyBhbW91bnQ6IGFtb3VudCArIGNvc3RzLmhhc2hlcwogICAgdW5jb3ZlciA2CiAgICBpbnRjIDQgLy8gMzQ5MDAKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjM5LTI0NgogICAgLy8gYXNzZXJ0TWF0Y2goCiAgICAvLyAgIHBheW1lbnQsCiAgICAvLyAgIHsKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBhbW91bnQgKyBjb3N0cy5oYXNoZXMKICAgIC8vICAgfSwKICAgIC8vICAgRVJSX0lOVkFMSURfUEFZTUVOVAogICAgLy8gKQogICAgPT0KICAgICYmCiAgICBhc3NlcnQgLy8gSW52YWxpZCBwYXltZW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI1MAogICAgLy8gcGF5b3I6IHBheW1lbnQuc2VuZGVyLAogICAgdW5jb3ZlciA0CiAgICBndHhucyBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjQzCiAgICAvLyBhbW91bnQ6IGFtb3VudCArIGNvc3RzLmhhc2hlcwogICAgaW50YyA0IC8vIDM0OTAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI0OS0yNTIKICAgIC8vIHRoaXMuaGFzaGVzKGhhc2hLZXkpLnZhbHVlID0gewogICAgLy8gICBwYXlvcjogcGF5bWVudC5zZW5kZXIsCiAgICAvLyAgIGFtb3VudDogY29zdHMuaGFzaGVzCiAgICAvLyB9CiAgICBpdG9iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjU0CiAgICAvLyBjb25zdCBuZXdFc2Nyb3dlZDogdWludDY0ID0gZXNjcm93ZWQgKyAxCiAgICBzd2FwCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyNTUKICAgIC8vIHRoaXMub2ZmZXJzKGlkKS52YWx1ZS5lc2Nyb3dlZCA9IG5ld0VzY3Jvd2VkCiAgICBkdXAKICAgIGl0b2IKICAgIHVuY292ZXIgMwogICAgcHVzaGludCA0MSAvLyA0MQogICAgdW5jb3ZlciAyCiAgICBib3hfcmVwbGFjZQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyNTgKICAgIC8vIGlmIChsZWF2ZXMgPT09IG5ld0VzY3Jvd2VkKSB7CiAgICA9PQogICAgYnogZXNjcm93X2FmdGVyX2lmX2Vsc2VANAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyNTkKICAgIC8vIHRoaXMub2ZmZXJzKGlkKS52YWx1ZS5zdGF0ZSA9IFNUQVRFX0RJU0JVUlNJTkcKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGJ5dGVjIDkgLy8gMHgxZQogICAgYm94X3JlcGxhY2UKCmVzY3Jvd19hZnRlcl9pZl9lbHNlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjIwOAogICAgLy8gZXNjcm93KHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgaWQ6IHVpbnQ2NCwgcmVjZWl2ZXI6IEFjY291bnQsIGFtb3VudDogdWludDY0LCBwcm9vZjogUHJvb2YpIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjpIeXBlclN3YXAuZXNjcm93QXNhW3JvdXRpbmddKCkgLT4gdm9pZDoKZXNjcm93QXNhOgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyNzMtMjgxCiAgICAvLyBlc2Nyb3dBc2EoCiAgICAvLyAgIG1iclBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIGlkOiB1aW50NjQsCiAgICAvLyAgIHJlY2VpdmVyOiBBY2NvdW50LAogICAgLy8gICBhc3NldDogdWludDY0LAogICAgLy8gICBhbW91bnQ6IHVpbnQ2NCwKICAgIC8vICAgcHJvb2Y6IFByb29mCiAgICAvLyApIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBwdXNoaW50IDIgLy8gMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDQgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ4WzMyXQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgY292ZXIgMgogICAgY292ZXIgMwogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgY292ZXIgMgogICAgY292ZXIgNAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIGludGNfMyAvLyAzMgogICAgKgogICAgcHVzaGludCAyIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIChsZW4rdWludDhbMzJdW10pCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI4MwogICAgLy8gYXNzZXJ0KHRoaXMub2ZmZXJzKGlkKS5leGlzdHMpCiAgICB1bmNvdmVyIDQKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzIKICAgIC8vIG9mZmVycyA9IEJveE1hcDx1aW50NjQsIE9mZmVyVmFsdWU+KHsga2V5UHJlZml4OiBIeXBlclN3YXBCb3hQcmVmaXhPZmZlcnMgfSkKICAgIGJ5dGVjXzEgLy8gIm8iCiAgICBkaWcgMQogICAgY29uY2F0CiAgICBkdXAKICAgIGNvdmVyIDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjgzCiAgICAvLyBhc3NlcnQodGhpcy5vZmZlcnMoaWQpLmV4aXN0cykKICAgIGR1cAogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBhc3NlcnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Mjg0CiAgICAvLyBjb25zdCB7IHN0YXRlLCByb290LCBlc2Nyb3dlZCwgbGVhdmVzLCBleHBpcmF0aW9uIH0gPSB0aGlzLm9mZmVycyhpZCkudmFsdWUKICAgIGJveF9nZXQKICAgIHBvcAogICAgZHVwCiAgICBleHRyYWN0IDAgMQogICAgZGlnIDEKICAgIGV4dHJhY3QgMSAzMgogICAgZGlnIDIKICAgIHB1c2hpbnQgNDEgLy8gNDEKICAgIGV4dHJhY3RfdWludDY0CiAgICBjb3ZlciA4CiAgICBkaWcgMgogICAgcHVzaGludCAzMyAvLyAzMwogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDgKICAgIHVuY292ZXIgMgogICAgcHVzaGludCA5NyAvLyA5NwogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Mjg2CiAgICAvLyBhc3NlcnQoc3RhdGUgPT09IFNUQVRFX0VTQ1JPV0lORywgRVJSX0lOVkFMSURfU1RBVEUpCiAgICB1bmNvdmVyIDIKICAgIGJ5dGVjIDUgLy8gMHgxNAogICAgPT0KICAgIGFzc2VydCAvLyB3cm9uZyBzdGF0ZQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyODgKICAgIC8vIGFzc2VydChleHBpcmF0aW9uID4gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwgRVJSX09GRkVSX0VYUElSRUQpCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICA+CiAgICBhc3NlcnQgLy8gb2ZmZXIgaGFzIGV4cGlyZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjkwCiAgICAvLyBjb25zdCBzZW5kZXJQYXJ0aWNpcGFudEtleSA9IHsgaWQsIGFkZHJlc3M6IFR4bi5zZW5kZXIgfQogICAgZGlnIDEKICAgIHR4biBTZW5kZXIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyOTEKICAgIC8vIGFzc2VydCh0aGlzLnBhcnRpY2lwYW50cyhzZW5kZXJQYXJ0aWNpcGFudEtleSkuZXhpc3RzKQogICAgZHVwCiAgICBleHRyYWN0IDAgOAogICAgc3dhcAogICAgZXh0cmFjdCA4IDMyCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzQKICAgIC8vIHBhcnRpY2lwYW50cyA9IEJveE1hcDxQYXJ0aWNpcGFudEtleSwgUmVmdW5kVmFsdWU+KHsga2V5UHJlZml4OiBIeXBlclN3YXBCb3hQcmVmaXhQYXJ0aWNpcGFudHMgfSkKICAgIGJ5dGVjXzMgLy8gInAiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MjkxCiAgICAvLyBhc3NlcnQodGhpcy5wYXJ0aWNpcGFudHMoc2VuZGVyUGFydGljaXBhbnRLZXkpLmV4aXN0cykKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYXNzZXJ0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI5MwogICAgLy8gY29uc3QgaGFzaCA9IHNoYTI1NihzaGEyNTYoQnl0ZXNgJHtUeG4uc2VuZGVyLmJ5dGVzfSR7cmVjZWl2ZXIuYnl0ZXN9JHtpdG9iKGFzc2V0KX0ke2l0b2IoYW1vdW50KX1gKSkKICAgIHR4biBTZW5kZXIKICAgIGRpZyA0CiAgICBjb25jYXQKICAgIGRpZyA2CiAgICBpdG9iCiAgICBjb25jYXQKICAgIHVuY292ZXIgNQogICAgaXRvYgogICAgY29uY2F0CiAgICBzaGEyNTYKICAgIHNoYTI1NgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyOTQKICAgIC8vIGNvbnN0IGhhc2hLZXk6IEhhc2hLZXkgPSB7IGlkLCBoYXNoIH0KICAgIHVuY292ZXIgMgogICAgZGlnIDEKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozNgogICAgLy8gaGFzaGVzID0gQm94TWFwPEhhc2hLZXksIFJlZnVuZFZhbHVlPih7IGtleVByZWZpeDogSHlwZXJTd2FwQm94UHJlZml4SGFzaGVzIH0pCiAgICBieXRlYyA4IC8vICJoIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGNvdmVyIDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Mjk1CiAgICAvLyBhc3NlcnQoIXRoaXMuaGFzaGVzKGhhc2hLZXkpLmV4aXN0cykKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgIQogICAgYXNzZXJ0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjI5Ny0zMDYKICAgIC8vIGNvbnN0IHZlcmlmaWVkID0gYWJpQ2FsbDx0eXBlb2YgTWV0YU1lcmtsZXMucHJvdG90eXBlLnZlcmlmeT4oewogICAgLy8gICBhcHBJZDogZ2V0QWtpdGFBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLm1ldGFNZXJrbGVzLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgU3RyaW5nKHJvb3QpLAogICAgLy8gICAgIGhhc2gsCiAgICAvLyAgICAgcHJvb2YsCiAgICAvLyAgICAgTWVya2xlVHJlZVR5cGVUcmFkZQogICAgLy8gICBdLAogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Mjk4CiAgICAvLyBhcHBJZDogZ2V0QWtpdGFBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLm1ldGFNZXJrbGVzLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI5CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyOTgKICAgIC8vIGFwcElkOiBnZXRBa2l0YUFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkubWV0YU1lcmtsZXMsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NAogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgYnl0ZWNfMiAvLyAiYWFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyOTgKICAgIC8vIGFwcElkOiBnZXRBa2l0YUFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkubWV0YU1lcmtsZXMsCiAgICBwdXNoaW50IDcyIC8vIDcyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozMDAKICAgIC8vIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzAxCiAgICAvLyBTdHJpbmcocm9vdCksCiAgICBkaWcgMwogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgdW5jb3ZlciA0CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzA0CiAgICAvLyBNZXJrbGVUcmVlVHlwZVRyYWRlCiAgICBwdXNoaW50IDMgLy8gMwogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyOTctMzA2CiAgICAvLyBjb25zdCB2ZXJpZmllZCA9IGFiaUNhbGw8dHlwZW9mIE1ldGFNZXJrbGVzLnByb3RvdHlwZS52ZXJpZnk+KHsKICAgIC8vICAgYXBwSWQ6IGdldEFraXRhQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5tZXRhTWVya2xlcywKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIFN0cmluZyhyb290KSwKICAgIC8vICAgICBoYXNoLAogICAgLy8gICAgIHByb29mLAogICAgLy8gICAgIE1lcmtsZVRyZWVUeXBlVHJhZGUKICAgIC8vICAgXSwKICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBieXRlYyA3IC8vIG1ldGhvZCAidmVyaWZ5KGFkZHJlc3Msc3RyaW5nLGJ5dGVbMzJdLGJ5dGVbMzJdW10sdWludDY0KWJvb2wiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIHN3YXAKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlYyA0IC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBib29sOAogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozMDgKICAgIC8vIGFzc2VydCh2ZXJpZmllZCwgRVJSX0NBTlRfVkVSSUZZX0xFQUYpCiAgICBhc3NlcnQgLy8gY2Fubm90IHZlcmlmeSBsZWFmCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjMxMgogICAgLy8gbGV0IG1ickFtb3VudCA9IGNvc3RzLmhhc2hlcwogICAgaW50YyA0IC8vIDM0OTAwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjMxNQogICAgLy8gaWYgKCFyZWNlaXZlci5pc09wdGVkSW4oQXNzZXQoYXNzZXQpKSkgewogICAgc3dhcAogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJueiBlc2Nyb3dBc2FfYWZ0ZXJfaWZfZWxzZUA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjMxMgogICAgLy8gbGV0IG1ickFtb3VudCA9IGNvc3RzLmhhc2hlcwogICAgaW50YyA0IC8vIDM0OTAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjMxNgogICAgLy8gbWJyQW1vdW50ICs9IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICArCiAgICBidXJ5IDEKCmVzY3Jvd0FzYV9hZnRlcl9pZl9lbHNlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjMxOS0zMjYKICAgIC8vIGFzc2VydE1hdGNoKAogICAgLy8gICBtYnJQYXltZW50LAogICAgLy8gICB7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyAgIH0sCiAgICAvLyAgIEVSUl9JTlZBTElEX1BBWU1FTlQKICAgIC8vICkKICAgIGRpZyA4CiAgICBkdXAKICAgIGd0eG5zIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjMyMgogICAgLy8gcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzE5LTMyNgogICAgLy8gYXNzZXJ0TWF0Y2goCiAgICAvLyAgIG1iclBheW1lbnQsCiAgICAvLyAgIHsKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBtYnJBbW91bnQKICAgIC8vICAgfSwKICAgIC8vICAgRVJSX0lOVkFMSURfUEFZTUVOVAogICAgLy8gKQogICAgPT0KICAgIGRpZyAxCiAgICBndHhucyBBbW91bnQKICAgIGRpZyAzCiAgICBkdXAKICAgIGNvdmVyIDMKICAgID09CiAgICAmJgogICAgYXNzZXJ0IC8vIEludmFsaWQgcGF5bWVudAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozMjgtMzM2CiAgICAvLyBhc3NlcnRNYXRjaCgKICAgIC8vICAgYXNzZXRYZmVyLAogICAgLy8gICB7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgeGZlckFzc2V0OiBBc3NldChhc3NldCksCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudAogICAgLy8gICB9LAogICAgLy8gICBFUlJfSU5WQUxJRF9UUkFOU0ZFUgogICAgLy8gKQogICAgZGlnIDkKICAgIGR1cAogICAgZ3R4bnMgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozMzEKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzI4LTMzNgogICAgLy8gYXNzZXJ0TWF0Y2goCiAgICAvLyAgIGFzc2V0WGZlciwKICAgIC8vICAgewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIHhmZXJBc3NldDogQXNzZXQoYXNzZXQpLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnQKICAgIC8vICAgfSwKICAgIC8vICAgRVJSX0lOVkFMSURfVFJBTlNGRVIKICAgIC8vICkKICAgID09CiAgICBkaWcgMQogICAgZ3R4bnMgWGZlckFzc2V0CiAgICBkaWcgMTEKICAgID09CiAgICAmJgogICAgc3dhcAogICAgZ3R4bnMgQXNzZXRBbW91bnQKICAgIGRpZyA5CiAgICA9PQogICAgJiYKICAgIGFzc2VydCAvLyBJbnZhbGlkIHRyYW5zZmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjM0MAogICAgLy8gcGF5b3I6IG1iclBheW1lbnQuc2VuZGVyLAogICAgc3dhcAogICAgZ3R4bnMgU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjMzOS0zNDIKICAgIC8vIHRoaXMuaGFzaGVzKGhhc2hLZXkpLnZhbHVlID0gewogICAgLy8gICBwYXlvcjogbWJyUGF5bWVudC5zZW5kZXIsCiAgICAvLyAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyB9CiAgICBzd2FwCiAgICBpdG9iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGRpZyAyCiAgICBzd2FwCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjM0NAogICAgLy8gY29uc3QgbmV3RXNjcm93ZWQ6IHVpbnQ2NCA9IGVzY3Jvd2VkICsgMQogICAgZGlnIDMKICAgIGludGNfMSAvLyAxCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjM0NQogICAgLy8gdGhpcy5vZmZlcnMoaWQpLnZhbHVlLmVzY3Jvd2VkID0gbmV3RXNjcm93ZWQKICAgIGR1cAogICAgaXRvYgogICAgZGlnIDYKICAgIHB1c2hpbnQgNDEgLy8gNDEKICAgIHVuY292ZXIgMgogICAgYm94X3JlcGxhY2UKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzQ3CiAgICAvLyBpZiAobGVhdmVzID09PSBuZXdFc2Nyb3dlZCkgewogICAgZGlnIDMKICAgID09CiAgICBieiBlc2Nyb3dBc2FfYWZ0ZXJfaWZfZWxzZUA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjM0OAogICAgLy8gdGhpcy5vZmZlcnMoaWQpLnZhbHVlLnN0YXRlID0gU1RBVEVfRElTQlVSU0lORwogICAgZGlnIDQKICAgIGludGNfMCAvLyAwCiAgICBieXRlYyA5IC8vIDB4MWUKICAgIGJveF9yZXBsYWNlCgplc2Nyb3dBc2FfYWZ0ZXJfaWZfZWxzZUA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czoyNzMtMjgxCiAgICAvLyBlc2Nyb3dBc2EoCiAgICAvLyAgIG1iclBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIGlkOiB1aW50NjQsCiAgICAvLyAgIHJlY2VpdmVyOiBBY2NvdW50LAogICAgLy8gICBhc3NldDogdWludDY0LAogICAgLy8gICBhbW91bnQ6IHVpbnQ2NCwKICAgIC8vICAgcHJvb2Y6IFByb29mCiAgICAvLyApIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjpIeXBlclN3YXAuZGlzYnVyc2Vbcm91dGluZ10oKSAtPiB2b2lkOgpkaXNidXJzZToKICAgIGludGNfMCAvLyAwCiAgICBkdXBuIDIKICAgIHB1c2hieXRlcyAiIgogICAgZHVwbiA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjM2MQogICAgLy8gZGlzYnVyc2UoaWQ6IHVpbnQ2NCwgcmVjZWl2ZXJXYWxsZXQ6IHVpbnQ2NCwgcmVjZWl2ZXI6IEFjY291bnQsIGFzc2V0OiB1aW50NjQsIGFtb3VudDogdWludDY0KSB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBjb3ZlciAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50OFszMl0KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDUKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIGNvdmVyIDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzYzCiAgICAvLyBhc3NlcnQodGhpcy5vZmZlcnMoaWQpLmV4aXN0cykKICAgIHVuY292ZXIgMwogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozMgogICAgLy8gb2ZmZXJzID0gQm94TWFwPHVpbnQ2NCwgT2ZmZXJWYWx1ZT4oeyBrZXlQcmVmaXg6IEh5cGVyU3dhcEJveFByZWZpeE9mZmVycyB9KQogICAgYnl0ZWNfMSAvLyAibyIKICAgIGRpZyAxCiAgICBjb25jYXQKICAgIGR1cAogICAgY292ZXIgNQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozNjMKICAgIC8vIGFzc2VydCh0aGlzLm9mZmVycyhpZCkuZXhpc3RzKQogICAgZHVwCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGFzc2VydAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozNjQKICAgIC8vIGNvbnN0IHsgc3RhdGUsIGVzY3Jvd2VkIH0gPSB0aGlzLm9mZmVycyhpZCkudmFsdWUKICAgIGJveF9nZXQKICAgIHBvcAogICAgZHVwCiAgICBleHRyYWN0IDAgMQogICAgc3dhcAogICAgcHVzaGludCA0MSAvLyA0MQogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzY2CiAgICAvLyBhc3NlcnQoc3RhdGUgPT09IFNUQVRFX0RJU0JVUlNJTkcpCiAgICBieXRlYyA5IC8vIDB4MWUKICAgID09CiAgICBhc3NlcnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzY5CiAgICAvLyBjb25zdCBoYXNoID0gc2hhMjU2KHNoYTI1NihCeXRlc2Ake1R4bi5zZW5kZXIuYnl0ZXN9JHtyZWNlaXZlci5ieXRlc30ke2l0b2IoYXNzZXQpfSR7aXRvYihhbW91bnQpfWApKQogICAgdHhuIFNlbmRlcgogICAgdW5jb3ZlciA0CiAgICBjb25jYXQKICAgIGRpZyAzCiAgICBpdG9iCiAgICBkdXAKICAgIGNvdmVyIDUKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBpdG9iCiAgICBkdXAKICAgIGNvdmVyIDQKICAgIGNvbmNhdAogICAgc2hhMjU2CiAgICBzaGEyNTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzcwCiAgICAvLyBjb25zdCBoYXNoS2V5OiBIYXNoS2V5ID0geyBpZCwgaGFzaCB9CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzYKICAgIC8vIGhhc2hlcyA9IEJveE1hcDxIYXNoS2V5LCBSZWZ1bmRWYWx1ZT4oeyBrZXlQcmVmaXg6IEh5cGVyU3dhcEJveFByZWZpeEhhc2hlcyB9KQogICAgYnl0ZWMgOCAvLyAiaCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozNzEKICAgIC8vIGFzc2VydCh0aGlzLmhhc2hlcyhoYXNoS2V5KS5leGlzdHMpCiAgICBkdXAKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYXNzZXJ0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjM3MwogICAgLy8gbGV0IHsgcGF5b3IsIGFtb3VudDogcmVmdW5kQW1vdW50IH0gPSB0aGlzLmhhc2hlcyhoYXNoS2V5KS52YWx1ZQogICAgZHVwCiAgICBib3hfZ2V0CiAgICBwb3AKICAgIGR1cAogICAgZXh0cmFjdCA4IDMyCiAgICBjb3ZlciAzCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Mzc0CiAgICAvLyB0aGlzLmhhc2hlcyhoYXNoS2V5KS5kZWxldGUoKQogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjM3NwogICAgLy8gaWYgKGFzc2V0ID09PSAwKSB7CiAgICBibnogZGlzYnVyc2VfZWxzZV9ib2R5QDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Mzc5LTM4MQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7IGFtb3VudCwgcmVjZWl2ZXIgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICBkaWcgOAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgZGlnIDYKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjM3OS0zODAKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoeyBhbW91bnQsIHJlY2VpdmVyIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjM3OS0zODEKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoeyBhbW91bnQsIHJlY2VpdmVyIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Mzg0LTM4OQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50OiByZWZ1bmRBbW91bnQsCiAgICAvLyAgICAgcmVjZWl2ZXI6IHBheW9yLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIGRpZyAxCiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBkdXAKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjM4NC0zODgKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGFtb3VudDogcmVmdW5kQW1vdW50LAogICAgLy8gICAgIHJlY2VpdmVyOiBwYXlvciwKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Mzg0LTM4OQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50OiByZWZ1bmRBbW91bnQsCiAgICAvLyAgICAgcmVjZWl2ZXI6IHBheW9yLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CgpkaXNidXJzZV9hZnRlcl9pZl9lbHNlQDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0NDkKICAgIC8vIGNvbnN0IG5ld0VzY3Jvd2VkOiB1aW50NjQgPSBlc2Nyb3dlZCAtIDEKICAgIGRpZyA0CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0NTAKICAgIC8vIHRoaXMub2ZmZXJzKGlkKS52YWx1ZS5lc2Nyb3dlZCA9IG5ld0VzY3Jvd2VkCiAgICBkdXAKICAgIGl0b2IKICAgIGRpZyA3CiAgICBwdXNoaW50IDQxIC8vIDQxCiAgICB1bmNvdmVyIDIKICAgIGJveF9yZXBsYWNlCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQ1MgogICAgLy8gaWYgKG5ld0VzY3Jvd2VkID09PSAwKSB7CiAgICBibnogZGlzYnVyc2VfYWZ0ZXJfaWZfZWxzZUAxNwogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0NTMKICAgIC8vIHRoaXMub2ZmZXJzKGlkKS52YWx1ZS5zdGF0ZSA9IFNUQVRFX0NPTVBMRVRFRAogICAgZGlnIDUKICAgIGludGNfMCAvLyAwCiAgICBieXRlYyAxMyAvLyAweDI4CiAgICBib3hfcmVwbGFjZQoKZGlzYnVyc2VfYWZ0ZXJfaWZfZWxzZUAxNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzYxCiAgICAvLyBkaXNidXJzZShpZDogdWludDY0LCByZWNlaXZlcldhbGxldDogdWludDY0LCByZWNlaXZlcjogQWNjb3VudCwgYXNzZXQ6IHVpbnQ2NCwgYW1vdW50OiB1aW50NjQpIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmRpc2J1cnNlX2Vsc2VfYm9keUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozOTIKICAgIC8vIGNvbnN0IFssIGlzT3B0ZWRJbl0gPSBBc3NldEhvbGRpbmcuYXNzZXRCYWxhbmNlKHJlY2VpdmVyLCBhc3NldCkKICAgIGRpZyA4CiAgICBkaWcgOAogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Mzk0CiAgICAvLyBpZiAoIWlzT3B0ZWRJbikgewogICAgYm56IGRpc2J1cnNlX2Vsc2VfYm9keUAxMQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozOTYKICAgIC8vIGFzc2VydChyZWNlaXZlcldhbGxldCAhPT0gMCwgRVJSX1JFQ0VJVkVSX05PVF9PUFRFRF9JTikKICAgIGRpZyA5CiAgICBkdXAKICAgIGFzc2VydCAvLyByZWNlaXZlciBpcyBub3Qgb3B0ZWQgaW50byBhc3NldAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozOTcKICAgIC8vIGFzc2VydChBcHBsaWNhdGlvbihyZWNlaXZlcldhbGxldCkuYWRkcmVzcyA9PT0gcmVjZWl2ZXIsICdyZWNlaXZlcldhbGxldCBhZGRyZXNzIG1pc21hdGNoJykKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZGlnIDEwCiAgICA9PQogICAgYXNzZXJ0IC8vIHJlY2VpdmVyV2FsbGV0IGFkZHJlc3MgbWlzbWF0Y2gKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Mzk5CiAgICAvLyBhc3NlcnQocmVmdW5kQW1vdW50ID49IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSwgRVJSX1JFQ0VJVkVSX05PVF9PUFRFRF9JTikKICAgIGRpZyAxCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgID49CiAgICBhc3NlcnQgLy8gcmVjZWl2ZXIgaXMgbm90IG9wdGVkIGludG8gYXNzZXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDAyCiAgICAvLyBjb25zdCBvcHRpblBsdWdpbiA9IGdldFBsdWdpbkFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkub3B0aW4KICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyOQogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDAyCiAgICAvLyBjb25zdCBvcHRpblBsdWdpbiA9IGdldFBsdWdpbkFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkub3B0aW4KICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0CiAgICAvLyBjb25zdCBbcGx1Z2luQXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1BsdWdpbkFwcExpc3QpKQogICAgZHVwCiAgICBieXRlYyAxNCAvLyAicGFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0MDIKICAgIC8vIGNvbnN0IG9wdGluUGx1Z2luID0gZ2V0UGx1Z2luQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5vcHRpbgogICAgZXh0cmFjdCAwIDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDAzLTQxMgogICAgLy8gY29uc3QgY2FuT3B0SW4gPSBhYmlDYWxsPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfY2FuQ2FsbD4oewogICAgLy8gICBhcHBJZDogcmVjZWl2ZXJXYWxsZXQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBvcHRpblBsdWdpbiwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgICcnLAogICAgLy8gICAgIG9wLmJ6ZXJvKDQpLnRvRml4ZWQoeyBsZW5ndGg6IDQgfSksCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQwOAogICAgLy8gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0MTAKICAgIC8vIG9wLmJ6ZXJvKDQpLnRvRml4ZWQoeyBsZW5ndGg6IDQgfSksCiAgICBwdXNoaW50IDQgLy8gNAogICAgYnplcm8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDAzLTQxMgogICAgLy8gY29uc3QgY2FuT3B0SW4gPSBhYmlDYWxsPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfY2FuQ2FsbD4oewogICAgLy8gICBhcHBJZDogcmVjZWl2ZXJXYWxsZXQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBvcHRpblBsdWdpbiwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgICcnLAogICAgLy8gICAgIG9wLmJ6ZXJvKDQpLnRvRml4ZWQoeyBsZW5ndGg6IDQgfSksCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBwdXNoYnl0ZXMgMHg0NzI3YWYyMSAvLyBtZXRob2QgImFyYzU4X2NhbkNhbGwodWludDY0LGJvb2wsYWRkcmVzcyxzdHJpbmcsYnl0ZVs0XSlib29sIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDA3CiAgICAvLyB0cnVlLAogICAgYnl0ZWMgMTUgLy8gMHg4MAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQwOQogICAgLy8gJycsCiAgICBieXRlYyAxMCAvLyAweDAwMDAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZGlnIDEKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0MDMtNDEyCiAgICAvLyBjb25zdCBjYW5PcHRJbiA9IGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9jYW5DYWxsPih7CiAgICAvLyAgIGFwcElkOiByZWNlaXZlcldhbGxldCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIG9wdGluUGx1Z2luLAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgJycsCiAgICAvLyAgICAgb3AuYnplcm8oNCkudG9GaXhlZCh7IGxlbmd0aDogNCB9KSwKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIHN3YXAKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlYyA0IC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBib29sOAogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0MTQKICAgIC8vIGFzc2VydChjYW5PcHRJbiwgRVJSX1JFQ0VJVkVSX05PVF9PUFRFRF9JTikKICAgIGFzc2VydCAvLyByZWNlaXZlciBpcyBub3Qgb3B0ZWQgaW50byBhc3NldAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0MTcKICAgIC8vIGFyYzU4T3B0SW5BbmRTZW5kKHRoaXMuYWtpdGFEQU8udmFsdWUsIEFwcGxpY2F0aW9uKHJlY2VpdmVyV2FsbGV0KSwgJycsIFthc3NldF0sIFthbW91bnRdKQogICAgYnl0ZWMgMTggLy8gMHgwMDAxCiAgICBkaWcgNgogICAgY29uY2F0CiAgICBkdXAKICAgIGJ1cnkgMjEKICAgIGJ5dGVjIDE4IC8vIDB4MDAwMQogICAgZGlnIDYKICAgIGNvbmNhdAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBidXJ5IDIzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM3NgogICAgLy8gYXNzZXJ0KGFzc2V0cy5sZW5ndGggPT09IGFtb3VudHMubGVuZ3RoLCBFUlJfQVNTRVRTX0FORF9BTU9VTlRTX01JU01BVENIKQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIHVuY292ZXIgMgogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBkdXAKICAgIGJ1cnkgMjEKICAgIGRpZyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIEFzc2V0cyBhbmQgYW1vdW50cyBtaXNtYXRjaAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NAogICAgLy8gY29uc3QgW3BsdWdpbkFwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNQbHVnaW5BcHBMaXN0KSkKICAgIHVuY292ZXIgMgogICAgYnl0ZWMgMTQgLy8gInBhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Mzc3CiAgICAvLyBjb25zdCBvcHRpblBsdWdpbiA9IGdldFBsdWdpbkFwcExpc3QoYWtpdGFEQU8pLm9wdGluCiAgICBkdXAKICAgIGV4dHJhY3QgMCA4CiAgICBzd2FwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTY1LTE2OAogICAgLy8gY29uc3QgW2NvbnRyb2xsZWRBY2NvdW50Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoCiAgICAvLyAgIHdhbGxldElELAogICAgLy8gICBCeXRlcyhBYnN0cmFjdEFjY291bnRHbG9iYWxTdGF0ZUtleXNDb250cm9sbGVkQWRkcmVzcykKICAgIC8vICkKICAgIGRpZyA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE2NwogICAgLy8gQnl0ZXMoQWJzdHJhY3RBY2NvdW50R2xvYmFsU3RhdGVLZXlzQ29udHJvbGxlZEFkZHJlc3MpCiAgICBwdXNoYnl0ZXMgImNvbnRyb2xsZWRfYWRkcmVzcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTY1LTE2OAogICAgLy8gY29uc3QgW2NvbnRyb2xsZWRBY2NvdW50Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoCiAgICAvLyAgIHdhbGxldElELAogICAgLy8gICBCeXRlcyhBYnN0cmFjdEFjY291bnRHbG9iYWxTdGF0ZUtleXNDb250cm9sbGVkQWRkcmVzcykKICAgIC8vICkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIGR1cAogICAgY292ZXIgMwogICAgYnVyeSAyMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozODAtMzgzCiAgICAvLyBpdHhuQ29tcG9zZS5iZWdpbjx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X3Jla2V5VG9QbHVnaW4+KHsKICAgIC8vICAgYXBwSWQ6IHJlY2lwaWVudFdhbGxldC5pZCwKICAgIC8vICAgYXJnczogW29wdGluUGx1Z2luLCB0cnVlLCBlc2Nyb3csIFtdLCBbXV0KICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICBwdXNoYnl0ZXMgMHg1ODJmZjM4MiAvLyBtZXRob2QgImFyYzU4X3Jla2V5VG9QbHVnaW4odWludDY0LGJvb2wsc3RyaW5nLHVpbnQ2NFtdLCh1aW50NjQsdWludDY0KVtdKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDA3CiAgICAvLyB0cnVlLAogICAgYnl0ZWMgMTUgLy8gMHg4MAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDA5CiAgICAvLyAnJywKICAgIGJ5dGVjIDEwIC8vIDB4MDAwMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzgyCiAgICAvLyBhcmdzOiBbb3B0aW5QbHVnaW4sIHRydWUsIGVzY3JvdywgW10sIFtdXQogICAgYnl0ZWMgMTAgLy8gMHgwMDAwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgYnl0ZWMgMTAgLy8gMHgwMDAwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciA0CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzgwLTM4MwogICAgLy8gaXR4bkNvbXBvc2UuYmVnaW48dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9yZWtleVRvUGx1Z2luPih7CiAgICAvLyAgIGFwcElkOiByZWNpcGllbnRXYWxsZXQuaWQsCiAgICAvLyAgIGFyZ3M6IFtvcHRpblBsdWdpbiwgdHJ1ZSwgZXNjcm93LCBbXSwgW11dCiAgICAvLyB9KQogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozODUtMzk2CiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBPcHRJblBsdWdpbi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IG9wdGluUGx1Z2luLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgcmVjaXBpZW50V2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgYXNzZXRzLAogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogb3JpZ2luLAogICAgLy8gICAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiBhc3NldHMubGVuZ3RoCiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozOTMKICAgIC8vIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogYXNzZXRzLmxlbmd0aAogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICB1bmNvdmVyIDMKICAgICoKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM5MS0zOTQKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBvcmlnaW4sCiAgICAvLyAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogYXNzZXRzLmxlbmd0aAogICAgLy8gfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Mzg1LTM5NgogICAgLy8gaXR4bkNvbXBvc2UubmV4dDx0eXBlb2YgT3B0SW5QbHVnaW4ucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiBvcHRpblBsdWdpbiwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHJlY2lwaWVudFdhbGxldCwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIGFzc2V0cywKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IG9yaWdpbiwKICAgIC8vICAgICAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogYXNzZXRzLmxlbmd0aAogICAgLy8gICAgIH0pCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIHB1c2hieXRlcyAweDY4MzVlM2JjIC8vIG1ldGhvZCAib3B0SW4odWludDY0LGJvb2wsdWludDY0W10scGF5KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZGlnIDEyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0MDcKICAgIC8vIHRydWUsCiAgICBieXRlYyAxNSAvLyAweDgwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozODUtMzk2CiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBPcHRJblBsdWdpbi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IG9wdGluUGx1Z2luLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgcmVjaXBpZW50V2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgYXNzZXRzLAogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogb3JpZ2luLAogICAgLy8gICAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiBhc3NldHMubGVuZ3RoCiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Mzk4CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgYW1vdW50cy5sZW5ndGg7IGkrKykgewogICAgaW50Y18wIC8vIDAKICAgIGJ1cnkgMTQKCmRpc2J1cnNlX3doaWxlX3RvcEAxOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Mzk4CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgYW1vdW50cy5sZW5ndGg7IGkrKykgewogICAgZGlnIDEzCiAgICBkaWcgMTYKICAgIDwKICAgIGJ6IGRpc2J1cnNlX2FmdGVyX3doaWxlQDIzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM5OQogICAgLy8gaWYgKGFtb3VudHNbaV0gPiAwKSB7CiAgICBkaWcgMTgKICAgIGV4dHJhY3QgMiAwCiAgICBkaWcgMTQKICAgIGludGNfMiAvLyA4CiAgICAqCiAgICBkdXAKICAgIGJ1cnkgMTcKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGJ1cnkgMTMKICAgIGJ6IGRpc2J1cnNlX2FmdGVyX2lmX2Vsc2VAMjIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDAwLTQwNgogICAgLy8gaXR4bkNvbXBvc2UubmV4dCgKICAgIC8vICAgaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50c1tpXSwKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBvcmlnaW4sCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldHNbaV0KICAgIC8vICAgfSkKICAgIC8vICkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0MDQKICAgIC8vIHhmZXJBc3NldDogYXNzZXRzW2ldCiAgICBkaWcgMTcKICAgIGV4dHJhY3QgMiAwCiAgICBkaWcgMTUKICAgIGV4dHJhY3RfdWludDY0CiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgZGlnIDE2CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIGRpZyAxMQogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0MDEtNDA1CiAgICAvLyBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICBhc3NldEFtb3VudDogYW1vdW50c1tpXSwKICAgIC8vICAgYXNzZXRSZWNlaXZlcjogb3JpZ2luLAogICAgLy8gICB4ZmVyQXNzZXQ6IGFzc2V0c1tpXQogICAgLy8gfSkKICAgIHB1c2hpbnQgNCAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKCmRpc2J1cnNlX2FmdGVyX2lmX2Vsc2VAMjI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM5OAogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGFtb3VudHMubGVuZ3RoOyBpKyspIHsKICAgIGRpZyAxMwogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGJ1cnkgMTQKICAgIGIgZGlzYnVyc2Vfd2hpbGVfdG9wQDE5CgpkaXNidXJzZV9hZnRlcl93aGlsZUAyMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDEwLTQxMgogICAgLy8gaXR4bkNvbXBvc2UubmV4dDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X3ZlcmlmeUF1dGhBZGRyZXNzPih7CiAgICAvLyAgIGFwcElkOiByZWNpcGllbnRXYWxsZXQKICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIHB1c2hieXRlcyAweDZjYzNmNjA2IC8vIG1ldGhvZCAiYXJjNThfdmVyaWZ5QXV0aEFkZHJlc3MoKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZGlnIDkKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0MTQKICAgIC8vIGl0eG5Db21wb3NlLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0MjAKICAgIC8vIGNvbnN0IG9wdEluQ29zdCA9IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBkdXAKICAgIGJ1cnkgMTQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDIxCiAgICAvLyBpZiAocmVmdW5kQW1vdW50ID4gb3B0SW5Db3N0KSB7CiAgICBkaWcgMQogICAgPAogICAgYnogZGlzYnVyc2VfYWZ0ZXJfaWZfZWxzZUAxNQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0MjItNDI3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IHJlZnVuZEFtb3VudCAtIG9wdEluQ29zdCwKICAgIC8vICAgICByZWNlaXZlcjogcGF5b3IsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0MjQKICAgIC8vIGFtb3VudDogcmVmdW5kQW1vdW50IC0gb3B0SW5Db3N0LAogICAgZHVwCiAgICBkaWcgMTMKICAgIC0KICAgIGRpZyAyCiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0MjItNDI2CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IHJlZnVuZEFtb3VudCAtIG9wdEluQ29zdCwKICAgIC8vICAgICByZWNlaXZlcjogcGF5b3IsCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQyMi00MjcKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGFtb3VudDogcmVmdW5kQW1vdW50IC0gb3B0SW5Db3N0LAogICAgLy8gICAgIHJlY2VpdmVyOiBwYXlvciwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgYiBkaXNidXJzZV9hZnRlcl9pZl9lbHNlQDE1CgpkaXNidXJzZV9lbHNlX2JvZHlAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQzMS00MzcKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudCwKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiByZWNlaXZlciwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICBkaWcgOAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICBkaWcgNgogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgZGlnIDcKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQzMS00MzYKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudCwKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiByZWNlaXZlciwKICAgIC8vICAgfSkKICAgIHB1c2hpbnQgNCAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDMxLTQzNwogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldCwKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50LAogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHJlY2VpdmVyLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQ0MC00NDUKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGFtb3VudDogcmVmdW5kQW1vdW50LAogICAgLy8gICAgIHJlY2VpdmVyOiBwYXlvciwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICBkaWcgMQogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgZHVwCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0NDAtNDQ0CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IHJlZnVuZEFtb3VudCwKICAgIC8vICAgICByZWNlaXZlcjogcGF5b3IsCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQ0MC00NDUKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGFtb3VudDogcmVmdW5kQW1vdW50LAogICAgLy8gICAgIHJlY2VpdmVyOiBwYXlvciwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgYiBkaXNidXJzZV9hZnRlcl9pZl9lbHNlQDE1CgoKLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo6SHlwZXJTd2FwLmNhbmNlbFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNhbmNlbDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDYxCiAgICAvLyBjYW5jZWwoaWQ6IHVpbnQ2NCwgcHJvb2Y6IFByb29mKSB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgaW50Y18zIC8vIDMyCiAgICAqCiAgICBwdXNoaW50IDIgLy8gMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciAobGVuK3VpbnQ4WzMyXVtdKQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0NjMKICAgIC8vIGFzc2VydCh0aGlzLm9mZmVycyhpZCkuZXhpc3RzKQogICAgaXRvYgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjMyCiAgICAvLyBvZmZlcnMgPSBCb3hNYXA8dWludDY0LCBPZmZlclZhbHVlPih7IGtleVByZWZpeDogSHlwZXJTd2FwQm94UHJlZml4T2ZmZXJzIH0pCiAgICBieXRlY18xIC8vICJvIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXBuIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDYzCiAgICAvLyBhc3NlcnQodGhpcy5vZmZlcnMoaWQpLmV4aXN0cykKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYXNzZXJ0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQ2NAogICAgLy8gY29uc3QgeyBzdGF0ZSwgcGFydGljaXBhbnRzUm9vdCwgZXNjcm93ZWQsIHJvb3QsIGV4cGlyYXRpb24gfSA9IHRoaXMub2ZmZXJzKGlkKS52YWx1ZQogICAgYm94X2dldAogICAgcG9wCiAgICBkdXAKICAgIGV4dHJhY3QgMCAxCiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgZHVwCiAgICBleHRyYWN0IDQ5IDMyCiAgICBjb3ZlciAyCiAgICBkdXAKICAgIHB1c2hpbnQgNDEgLy8gNDEKICAgIGV4dHJhY3RfdWludDY0CiAgICBjb3ZlciAyCiAgICBwdXNoaW50IDk3IC8vIDk3CiAgICBleHRyYWN0X3VpbnQ2NAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0NjcKICAgIC8vIHN0YXRlID09PSBTVEFURV9PRkZFUkVEIHx8IHN0YXRlID09PSBTVEFURV9FU0NST1dJTkcgfHwKICAgIGJ5dGVjIDYgLy8gMHgwYQogICAgPT0KICAgIGJueiBjYW5jZWxfYm9vbF90cnVlQDUKICAgIGRpZyAzCiAgICBieXRlYyA1IC8vIDB4MTQKICAgID09CiAgICBibnogY2FuY2VsX2Jvb2xfdHJ1ZUA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQ2OAogICAgLy8gKHN0YXRlID09PSBTVEFURV9ESVNCVVJTSU5HICYmIGV4cGlyYXRpb24gPD0gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCksCiAgICBkaWcgMwogICAgYnl0ZWMgOSAvLyAweDFlCiAgICA9PQogICAgYnogY2FuY2VsX2Jvb2xfZmFsc2VANgogICAgZHVwCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICA8PQogICAgYnogY2FuY2VsX2Jvb2xfZmFsc2VANgoKY2FuY2VsX2Jvb2xfdHJ1ZUA1OgogICAgaW50Y18xIC8vIDEKCmNhbmNlbF9ib29sX21lcmdlQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQ2Ni00NzAKICAgIC8vIGFzc2VydCgKICAgIC8vICAgc3RhdGUgPT09IFNUQVRFX09GRkVSRUQgfHwgc3RhdGUgPT09IFNUQVRFX0VTQ1JPV0lORyB8fAogICAgLy8gICAoc3RhdGUgPT09IFNUQVRFX0RJU0JVUlNJTkcgJiYgZXhwaXJhdGlvbiA8PSBHbG9iYWwubGF0ZXN0VGltZXN0YW1wKSwKICAgIC8vICAgRVJSX0lOVkFMSURfU1RBVEUKICAgIC8vICkKICAgIGFzc2VydCAvLyB3cm9uZyBzdGF0ZQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0NzMKICAgIC8vIGNvbnN0IHNlbmRlclBhcnRpY2lwYW50S2V5ID0geyBpZCwgYWRkcmVzczogVHhuLnNlbmRlciB9CiAgICBkaWcgNQogICAgdHhuIFNlbmRlcgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQ3NAogICAgLy8gYXNzZXJ0KHRoaXMucGFydGljaXBhbnRzKHNlbmRlclBhcnRpY2lwYW50S2V5KS5leGlzdHMsIEVSUl9OT1RfQUNDRVBURUQpCiAgICBkdXAKICAgIGV4dHJhY3QgMCA4CiAgICBzd2FwCiAgICBleHRyYWN0IDggMzIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozNAogICAgLy8gcGFydGljaXBhbnRzID0gQm94TWFwPFBhcnRpY2lwYW50S2V5LCBSZWZ1bmRWYWx1ZT4oeyBrZXlQcmVmaXg6IEh5cGVyU3dhcEJveFByZWZpeFBhcnRpY2lwYW50cyB9KQogICAgYnl0ZWNfMyAvLyAicCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0NzQKICAgIC8vIGFzc2VydCh0aGlzLnBhcnRpY2lwYW50cyhzZW5kZXJQYXJ0aWNpcGFudEtleSkuZXhpc3RzLCBFUlJfTk9UX0FDQ0VQVEVEKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBhc3NlcnQgLy8gbXVzdCBoYXZlIGFjY2VwdGVkIHRvIGNhbmNlbAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0NzctNDg2CiAgICAvLyBjb25zdCBpc1BhcnRpY2lwYW50ID0gYWJpQ2FsbDx0eXBlb2YgTWV0YU1lcmtsZXMucHJvdG90eXBlLnZlcmlmeT4oewogICAgLy8gICBhcHBJZDogZ2V0QWtpdGFBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLm1ldGFNZXJrbGVzLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgU3RyaW5nKHBhcnRpY2lwYW50c1Jvb3QpLAogICAgLy8gICAgIHNoYTI1NihzaGEyNTYoVHhuLnNlbmRlci5ieXRlcykpLAogICAgLy8gICAgIHByb29mLAogICAgLy8gICAgIE1lcmtsZVRyZWVUeXBlVHJhZGUKICAgIC8vICAgXSwKICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQ3OAogICAgLy8gYXBwSWQ6IGdldEFraXRhQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5tZXRhTWVya2xlcywKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyOQogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDc4CiAgICAvLyBhcHBJZDogZ2V0QWtpdGFBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLm1ldGFNZXJrbGVzLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0KSkKICAgIGJ5dGVjXzIgLy8gImFhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDc4CiAgICAvLyBhcHBJZDogZ2V0QWtpdGFBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLm1ldGFNZXJrbGVzLAogICAgcHVzaGludCA3MiAvLyA3MgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDgwCiAgICAvLyBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQ4MQogICAgLy8gU3RyaW5nKHBhcnRpY2lwYW50c1Jvb3QpLAogICAgZGlnIDQKICAgIGR1cAogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQ4MgogICAgLy8gc2hhMjU2KHNoYTI1NihUeG4uc2VuZGVyLmJ5dGVzKSksCiAgICB0eG4gU2VuZGVyCiAgICBzaGEyNTYKICAgIHNoYTI1NgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0ODQKICAgIC8vIE1lcmtsZVRyZWVUeXBlVHJhZGUKICAgIHB1c2hpbnQgMyAvLyAzCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQ3Ny00ODYKICAgIC8vIGNvbnN0IGlzUGFydGljaXBhbnQgPSBhYmlDYWxsPHR5cGVvZiBNZXRhTWVya2xlcy5wcm90b3R5cGUudmVyaWZ5Pih7CiAgICAvLyAgIGFwcElkOiBnZXRBa2l0YUFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkubWV0YU1lcmtsZXMsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBTdHJpbmcocGFydGljaXBhbnRzUm9vdCksCiAgICAvLyAgICAgc2hhMjU2KHNoYTI1NihUeG4uc2VuZGVyLmJ5dGVzKSksCiAgICAvLyAgICAgcHJvb2YsCiAgICAvLyAgICAgTWVya2xlVHJlZVR5cGVUcmFkZQogICAgLy8gICBdLAogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGJ5dGVjIDcgLy8gbWV0aG9kICJ2ZXJpZnkoYWRkcmVzcyxzdHJpbmcsYnl0ZVszMl0sYnl0ZVszMl1bXSx1aW50NjQpYm9vbCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZGlnIDgKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBzd2FwCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWMgNCAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYm9vbDgKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDg4CiAgICAvLyBhc3NlcnQoaXNQYXJ0aWNpcGFudCwgRVJSX05PVF9BX1BBUlRJQ0lQQU5UKQogICAgYXNzZXJ0IC8vIG5vdCBhIHBhcnRpY2lwYW50IGluIHRoaXMgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo0OTAKICAgIC8vIGlmIChlc2Nyb3dlZCA9PT0gMCkgewogICAgZGlnIDEKICAgIGJueiBjYW5jZWxfZWxzZV9ib2R5QDEwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQ5MQogICAgLy8gdGhpcy5vZmZlcnMoaWQpLnZhbHVlLnN0YXRlID0gU1RBVEVfQ0FOQ0VMX0NPTVBMRVRFRAogICAgZGlnIDQKICAgIGludGNfMCAvLyAwCiAgICBieXRlYyAxMSAvLyAweDNjCiAgICBib3hfcmVwbGFjZQoKY2FuY2VsX2FmdGVyX2lmX2Vsc2VAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjQ2MQogICAgLy8gY2FuY2VsKGlkOiB1aW50NjQsIHByb29mOiBQcm9vZikgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKY2FuY2VsX2Vsc2VfYm9keUAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NDkzCiAgICAvLyB0aGlzLm9mZmVycyhpZCkudmFsdWUuc3RhdGUgPSBTVEFURV9DQU5DRUxMRUQKICAgIGRpZyA0CiAgICBpbnRjXzAgLy8gMAogICAgcHVzaGJ5dGVzIDB4MzIKICAgIGJveF9yZXBsYWNlCiAgICBiIGNhbmNlbF9hZnRlcl9pZl9lbHNlQDExCgpjYW5jZWxfYm9vbF9mYWxzZUA2OgogICAgaW50Y18wIC8vIDAKICAgIGIgY2FuY2VsX2Jvb2xfbWVyZ2VANwoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Okh5cGVyU3dhcC53aXRoZHJhd1tyb3V0aW5nXSgpIC0+IHZvaWQ6CndpdGhkcmF3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1MDgKICAgIC8vIHdpdGhkcmF3KGlkOiB1aW50NjQsIHJlY2VpdmVyOiBBY2NvdW50LCBhc3NldDogdWludDY0LCBhbW91bnQ6IHVpbnQ2NCwgcHJvb2Y6IFByb29mKSB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDhbMzJdCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBjb3ZlciAzCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBjb3ZlciA0CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA1CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgaW50Y18zIC8vIDMyCiAgICAqCiAgICBwdXNoaW50IDIgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgKGxlbit1aW50OFszMl1bXSkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTEwCiAgICAvLyBhc3NlcnQodGhpcy5vZmZlcnMoaWQpLmV4aXN0cykKICAgIHVuY292ZXIgNAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozMgogICAgLy8gb2ZmZXJzID0gQm94TWFwPHVpbnQ2NCwgT2ZmZXJWYWx1ZT4oeyBrZXlQcmVmaXg6IEh5cGVyU3dhcEJveFByZWZpeE9mZmVycyB9KQogICAgYnl0ZWNfMSAvLyAibyIKICAgIGRpZyAxCiAgICBjb25jYXQKICAgIGR1cAogICAgY292ZXIgNwogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1MTAKICAgIC8vIGFzc2VydCh0aGlzLm9mZmVycyhpZCkuZXhpc3RzKQogICAgZHVwCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGFzc2VydAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1MTEKICAgIC8vIGNvbnN0IHsgc3RhdGUsIGVzY3Jvd2VkLCByb290IH0gPSB0aGlzLm9mZmVycyhpZCkudmFsdWUKICAgIGJveF9nZXQKICAgIHBvcAogICAgZHVwCiAgICBleHRyYWN0IDAgMQogICAgZGlnIDEKICAgIHB1c2hpbnQgNDEgLy8gNDEKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGNvdmVyIDkKICAgIHN3YXAKICAgIGV4dHJhY3QgMSAzMgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1MTMKICAgIC8vIGFzc2VydChzdGF0ZSA9PT0gU1RBVEVfQ0FOQ0VMTEVEKQogICAgc3dhcAogICAgcHVzaGJ5dGVzIDB4MzIKICAgID09CiAgICBhc3NlcnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTE1CiAgICAvLyBhc3NlcnQoZXNjcm93ZWQgPiAwKQogICAgc3dhcAogICAgYXNzZXJ0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjUxNwogICAgLy8gY29uc3QgaGFzaCA9IHNoYTI1NihzaGEyNTYoQnl0ZXNgJHtUeG4uc2VuZGVyLmJ5dGVzfSR7cmVjZWl2ZXIuYnl0ZXN9JHtpdG9iKGFzc2V0KX0ke2l0b2IoYW1vdW50KX1gKSkKICAgIHR4biBTZW5kZXIKICAgIHVuY292ZXIgNAogICAgY29uY2F0CiAgICBkaWcgNQogICAgaXRvYgogICAgY29uY2F0CiAgICB1bmNvdmVyIDQKICAgIGl0b2IKICAgIGNvbmNhdAogICAgc2hhMjU2CiAgICBzaGEyNTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTE4CiAgICAvLyBjb25zdCBoYXNoS2V5OiBIYXNoS2V5ID0geyBpZCwgaGFzaCB9CiAgICB1bmNvdmVyIDIKICAgIGRpZyAxCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6MzYKICAgIC8vIGhhc2hlcyA9IEJveE1hcDxIYXNoS2V5LCBSZWZ1bmRWYWx1ZT4oeyBrZXlQcmVmaXg6IEh5cGVyU3dhcEJveFByZWZpeEhhc2hlcyB9KQogICAgYnl0ZWMgOCAvLyAiaCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1MTkKICAgIC8vIGFzc2VydCh0aGlzLmhhc2hlcyhoYXNoS2V5KS5leGlzdHMpCiAgICBkdXAKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYXNzZXJ0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjUyMS01MzAKICAgIC8vIGNvbnN0IHZlcmlmaWVkID0gYWJpQ2FsbDx0eXBlb2YgTWV0YU1lcmtsZXMucHJvdG90eXBlLnZlcmlmeT4oewogICAgLy8gICBhcHBJZDogZ2V0QWtpdGFBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLm1ldGFNZXJrbGVzLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgU3RyaW5nKHJvb3QpLAogICAgLy8gICAgIGhhc2gsCiAgICAvLyAgICAgcHJvb2YsCiAgICAvLyAgICAgTWVya2xlVHJlZVR5cGVUcmFkZQogICAgLy8gICBdLAogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTIyCiAgICAvLyBhcHBJZDogZ2V0QWtpdGFBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLm1ldGFNZXJrbGVzLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI5CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1MjIKICAgIC8vIGFwcElkOiBnZXRBa2l0YUFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkubWV0YU1lcmtsZXMsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NAogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgYnl0ZWNfMiAvLyAiYWFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1MjIKICAgIC8vIGFwcElkOiBnZXRBa2l0YUFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkubWV0YU1lcmtsZXMsCiAgICBwdXNoaW50IDcyIC8vIDcyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1MjQKICAgIC8vIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTI1CiAgICAvLyBTdHJpbmcocm9vdCksCiAgICBkaWcgNAogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgdW5jb3ZlciA1CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTI4CiAgICAvLyBNZXJrbGVUcmVlVHlwZVRyYWRlCiAgICBwdXNoaW50IDMgLy8gMwogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1MjEtNTMwCiAgICAvLyBjb25zdCB2ZXJpZmllZCA9IGFiaUNhbGw8dHlwZW9mIE1ldGFNZXJrbGVzLnByb3RvdHlwZS52ZXJpZnk+KHsKICAgIC8vICAgYXBwSWQ6IGdldEFraXRhQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5tZXRhTWVya2xlcywKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIFN0cmluZyhyb290KSwKICAgIC8vICAgICBoYXNoLAogICAgLy8gICAgIHByb29mLAogICAgLy8gICAgIE1lcmtsZVRyZWVUeXBlVHJhZGUKICAgIC8vICAgXSwKICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBieXRlYyA3IC8vIG1ldGhvZCAidmVyaWZ5KGFkZHJlc3Msc3RyaW5nLGJ5dGVbMzJdLGJ5dGVbMzJdW10sdWludDY0KWJvb2wiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIHN3YXAKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlYyA0IC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBib29sOAogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1MzIKICAgIC8vIGFzc2VydCh2ZXJpZmllZCwgRVJSX0NBTlRfVkVSSUZZX0xFQUYpCiAgICBhc3NlcnQgLy8gY2Fubm90IHZlcmlmeSBsZWFmCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjUzNAogICAgLy8gbGV0IHsgcGF5b3IsIGFtb3VudDogcmVmdW5kQW1vdW50IH0gPSB0aGlzLmhhc2hlcyhoYXNoS2V5KS52YWx1ZQogICAgZHVwCiAgICBib3hfZ2V0CiAgICBwb3AKICAgIGR1cAogICAgZXh0cmFjdCA4IDMyCiAgICBjb3ZlciA0CiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTM1CiAgICAvLyB0aGlzLmhhc2hlcyhoYXNoS2V5KS5kZWxldGUoKQogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjUzNwogICAgLy8gaWYgKGFzc2V0ID09PSAwKSB7CiAgICBibnogd2l0aGRyYXdfZWxzZV9ib2R5QDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTM4LTU0MwogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50OiBhbW91bnQsCiAgICAvLyAgICAgcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1NDEKICAgIC8vIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTM4LTU0MgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50OiBhbW91bnQsCiAgICAvLyAgICAgcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjUzOC01NDMKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGFtb3VudDogYW1vdW50LAogICAgLy8gICAgIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0Cgp3aXRoZHJhd19hZnRlcl9pZl9lbHNlQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU1NC01NTkKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGFtb3VudDogcmVmdW5kQW1vdW50LAogICAgLy8gICAgIHJlY2VpdmVyOiBwYXlvciwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICBkaWcgMQogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgZHVwCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1NTQtNTU4CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IHJlZnVuZEFtb3VudCwKICAgIC8vICAgICByZWNlaXZlcjogcGF5b3IsCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU1NC01NTkKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGFtb3VudDogcmVmdW5kQW1vdW50LAogICAgLy8gICAgIHJlY2VpdmVyOiBwYXlvciwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1NjIKICAgIC8vIGNvbnN0IG5ld0VzY3Jvd2VkOiB1aW50NjQgPSBlc2Nyb3dlZCAtIDEKICAgIGRpZyAyCiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU2NAogICAgLy8gaWYgKG5ld0VzY3Jvd2VkID09PSAwKSB7CiAgICBibnogd2l0aGRyYXdfZWxzZV9ib2R5QDEwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU2NQogICAgLy8gdGhpcy5vZmZlcnMoaWQpLnZhbHVlLmVzY3Jvd2VkID0gbmV3RXNjcm93ZWQKICAgIGl0b2IKICAgIGRpZyA0CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIHB1c2hpbnQgNDEgLy8gNDEKICAgIHVuY292ZXIgMgogICAgYm94X3JlcGxhY2UKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTY2CiAgICAvLyB0aGlzLm9mZmVycyhpZCkudmFsdWUuc3RhdGUgPSBTVEFURV9DQU5DRUxfQ09NUExFVEVECiAgICBpbnRjXzAgLy8gMAogICAgYnl0ZWMgMTEgLy8gMHgzYwogICAgYm94X3JlcGxhY2UKCndpdGhkcmF3X2FmdGVyX2lmX2Vsc2VAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjUwOAogICAgLy8gd2l0aGRyYXcoaWQ6IHVpbnQ2NCwgcmVjZWl2ZXI6IEFjY291bnQsIGFzc2V0OiB1aW50NjQsIGFtb3VudDogdWludDY0LCBwcm9vZjogUHJvb2YpIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCndpdGhkcmF3X2Vsc2VfYm9keUAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTY4CiAgICAvLyB0aGlzLm9mZmVycyhpZCkudmFsdWUuZXNjcm93ZWQgPSBuZXdFc2Nyb3dlZAogICAgaXRvYgogICAgZGlnIDQKICAgIHB1c2hpbnQgNDEgLy8gNDEKICAgIHVuY292ZXIgMgogICAgYm94X3JlcGxhY2UKICAgIGIgd2l0aGRyYXdfYWZ0ZXJfaWZfZWxzZUAxMQoKd2l0aGRyYXdfZWxzZV9ib2R5QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU0NS01NTEKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudCwKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTQ5CiAgICAvLyBhc3NldFJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBkaWcgNAogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTQ1LTU1MAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldCwKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50LAogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgIH0pCiAgICBwdXNoaW50IDQgLy8gNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU0NS01NTEKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudCwKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICBiIHdpdGhkcmF3X2FmdGVyX2lmX2Vsc2VANwoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6Okh5cGVyU3dhcC5jbGVhbnVwUGFydGljaXBhbnRbcm91dGluZ10oKSAtPiB2b2lkOgpjbGVhbnVwUGFydGljaXBhbnQ6CiAgICBwdXNoYnl0ZXMgIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTgxCiAgICAvLyBjbGVhbnVwUGFydGljaXBhbnQoaWQ6IHVpbnQ2NCwgcGFydGljaXBhbnQ6IEFjY291bnQpIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50OFszMl0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTgyCiAgICAvLyBhc3NlcnQodGhpcy5vZmZlcnMoaWQpLmV4aXN0cykKICAgIGl0b2IKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozMgogICAgLy8gb2ZmZXJzID0gQm94TWFwPHVpbnQ2NCwgT2ZmZXJWYWx1ZT4oeyBrZXlQcmVmaXg6IEh5cGVyU3dhcEJveFByZWZpeE9mZmVycyB9KQogICAgYnl0ZWNfMSAvLyAibyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwbiAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU4MgogICAgLy8gYXNzZXJ0KHRoaXMub2ZmZXJzKGlkKS5leGlzdHMpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGFzc2VydAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1ODMKICAgIC8vIGNvbnN0IHsgc3RhdGUsIGV4cGlyYXRpb24sIGFjY2VwdGFuY2VzIH0gPSB0aGlzLm9mZmVycyhpZCkudmFsdWUKICAgIGJveF9nZXQKICAgIHBvcAogICAgZHVwCiAgICBleHRyYWN0IDAgMQogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIGR1cAogICAgcHVzaGludCA5NyAvLyA5NwogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDIKICAgIHB1c2hpbnQgODkgLy8gODkKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU4NgogICAgLy8gY29uc3QgaXNDb21wbGV0ZWQgPSBzdGF0ZSA9PT0gU1RBVEVfQ09NUExFVEVEIHx8IHN0YXRlID09PSBTVEFURV9DQU5DRUxfQ09NUExFVEVECiAgICBieXRlYyAxMyAvLyAweDI4CiAgICA9PQogICAgYm56IGNsZWFudXBQYXJ0aWNpcGFudF9ib29sX3RydWVAMwogICAgZGlnIDIKICAgIGJ5dGVjIDExIC8vIDB4M2MKICAgID09CiAgICBieiBjbGVhbnVwUGFydGljaXBhbnRfYm9vbF9mYWxzZUA0CgpjbGVhbnVwUGFydGljaXBhbnRfYm9vbF90cnVlQDM6CiAgICBpbnRjXzEgLy8gMQogICAgYnVyeSA3CgpjbGVhbnVwUGFydGljaXBhbnRfYm9vbF9tZXJnZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1ODcKICAgIC8vIGNvbnN0IGlzRXhwaXJlZCA9IChzdGF0ZSA9PT0gU1RBVEVfT0ZGRVJFRCB8fCBzdGF0ZSA9PT0gU1RBVEVfRVNDUk9XSU5HKSAmJiBleHBpcmF0aW9uIDw9IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAKICAgIGRpZyAyCiAgICBieXRlYyA2IC8vIDB4MGEKICAgID09CiAgICBibnogY2xlYW51cFBhcnRpY2lwYW50X2FuZF9jb250ZEA3CiAgICBkaWcgMgogICAgYnl0ZWMgNSAvLyAweDE0CiAgICA9PQogICAgYnogY2xlYW51cFBhcnRpY2lwYW50X2Jvb2xfZmFsc2VAOQoKY2xlYW51cFBhcnRpY2lwYW50X2FuZF9jb250ZEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1ODcKICAgIC8vIGNvbnN0IGlzRXhwaXJlZCA9IChzdGF0ZSA9PT0gU1RBVEVfT0ZGRVJFRCB8fCBzdGF0ZSA9PT0gU1RBVEVfRVNDUk9XSU5HKSAmJiBleHBpcmF0aW9uIDw9IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAKICAgIGRpZyAxCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICA8PQogICAgYnogY2xlYW51cFBhcnRpY2lwYW50X2Jvb2xfZmFsc2VAOQogICAgaW50Y18xIC8vIDEKCmNsZWFudXBQYXJ0aWNpcGFudF9ib29sX21lcmdlQDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1ODgKICAgIC8vIGFzc2VydChpc0NvbXBsZXRlZCB8fCBpc0V4cGlyZWQsIEVSUl9JTlZBTElEX1NUQVRFKQogICAgZGlnIDcKICAgIHx8CiAgICBhc3NlcnQgLy8gd3Jvbmcgc3RhdGUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTkwCiAgICAvLyBjb25zdCBwYXJ0aWNpcGFudEtleTogUGFydGljaXBhbnRLZXkgPSB7IGlkLCBhZGRyZXNzOiBwYXJ0aWNpcGFudCB9CiAgICBkaWcgNAogICAgZGlnIDYKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czozNAogICAgLy8gcGFydGljaXBhbnRzID0gQm94TWFwPFBhcnRpY2lwYW50S2V5LCBSZWZ1bmRWYWx1ZT4oeyBrZXlQcmVmaXg6IEh5cGVyU3dhcEJveFByZWZpeFBhcnRpY2lwYW50cyB9KQogICAgYnl0ZWNfMyAvLyAicCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1OTEKICAgIC8vIGFzc2VydCh0aGlzLnBhcnRpY2lwYW50cyhwYXJ0aWNpcGFudEtleSkuZXhpc3RzKQogICAgZHVwCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGFzc2VydAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1OTMKICAgIC8vIGNvbnN0IHsgcGF5b3IsIGFtb3VudCB9ID0gdGhpcy5wYXJ0aWNpcGFudHMocGFydGljaXBhbnRLZXkpLnZhbHVlCiAgICBkdXAKICAgIGJveF9nZXQKICAgIHBvcAogICAgZHVwCiAgICBleHRyYWN0IDggMzIKICAgIHN3YXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo1OTQKICAgIC8vIHRoaXMucGFydGljaXBhbnRzKHBhcnRpY2lwYW50S2V5KS5kZWxldGUoKQogICAgdW5jb3ZlciAyCiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NTk3CiAgICAvLyB0aGlzLm9mZmVycyhpZCkudmFsdWUuYWNjZXB0YW5jZXMgPSBhY2NlcHRhbmNlcyAtIDEKICAgIGRpZyAyCiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgaXRvYgogICAgZGlnIDYKICAgIHB1c2hpbnQgODkgLy8gODkKICAgIHVuY292ZXIgMgogICAgYm94X3JlcGxhY2UKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjAwLTYwNQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50LAogICAgLy8gICAgIHJlY2VpdmVyOiBwYXlvciwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2MDAtNjA0CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQsCiAgICAvLyAgICAgcmVjZWl2ZXI6IHBheW9yLAogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2MDAtNjA1CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQsCiAgICAvLyAgICAgcmVjZWl2ZXI6IHBheW9yLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjU4MQogICAgLy8gY2xlYW51cFBhcnRpY2lwYW50KGlkOiB1aW50NjQsIHBhcnRpY2lwYW50OiBBY2NvdW50KSB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpjbGVhbnVwUGFydGljaXBhbnRfYm9vbF9mYWxzZUA5OgogICAgaW50Y18wIC8vIDAKICAgIGIgY2xlYW51cFBhcnRpY2lwYW50X2Jvb2xfbWVyZ2VAMTAKCmNsZWFudXBQYXJ0aWNpcGFudF9ib29sX2ZhbHNlQDQ6CiAgICBpbnRjXzAgLy8gMAogICAgYnVyeSA3CiAgICBiIGNsZWFudXBQYXJ0aWNpcGFudF9ib29sX21lcmdlQDUKCgovLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjpIeXBlclN3YXAuY2xlYW51cE9mZmVyW3JvdXRpbmddKCkgLT4gdm9pZDoKY2xlYW51cE9mZmVyOgogICAgcHVzaGJ5dGVzICIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjYxNAogICAgLy8gY2xlYW51cE9mZmVyKGlkOiB1aW50NjQpIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjYxNQogICAgLy8gYXNzZXJ0KHRoaXMub2ZmZXJzKGlkKS5leGlzdHMpCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjMyCiAgICAvLyBvZmZlcnMgPSBCb3hNYXA8dWludDY0LCBPZmZlclZhbHVlPih7IGtleVByZWZpeDogSHlwZXJTd2FwQm94UHJlZml4T2ZmZXJzIH0pCiAgICBieXRlY18xIC8vICJvIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXBuIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjE1CiAgICAvLyBhc3NlcnQodGhpcy5vZmZlcnMoaWQpLmV4aXN0cykKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYXNzZXJ0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjYxNgogICAgLy8gY29uc3QgeyBzdGF0ZSwgZXhwaXJhdGlvbiwgYWNjZXB0YW5jZXMgfSA9IHRoaXMub2ZmZXJzKGlkKS52YWx1ZQogICAgYm94X2dldAogICAgcG9wCiAgICBkdXAKICAgIGV4dHJhY3QgMCAxCiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgZHVwCiAgICBwdXNoaW50IDk3IC8vIDk3CiAgICBleHRyYWN0X3VpbnQ2NAogICAgY292ZXIgMgogICAgcHVzaGludCA4OSAvLyA4OQogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oeXBlci1zd2FwL2NvbnRyYWN0LmFsZ28udHM6NjE5CiAgICAvLyBjb25zdCBpc0NvbXBsZXRlZCA9IHN0YXRlID09PSBTVEFURV9DT01QTEVURUQgfHwgc3RhdGUgPT09IFNUQVRFX0NBTkNFTF9DT01QTEVURUQKICAgIGJ5dGVjIDEzIC8vIDB4MjgKICAgID09CiAgICBibnogY2xlYW51cE9mZmVyX2Jvb2xfdHJ1ZUAzCiAgICBkaWcgMgogICAgYnl0ZWMgMTEgLy8gMHgzYwogICAgPT0KICAgIGJ6IGNsZWFudXBPZmZlcl9ib29sX2ZhbHNlQDQKCmNsZWFudXBPZmZlcl9ib29sX3RydWVAMzoKICAgIGludGNfMSAvLyAxCiAgICBidXJ5IDUKCmNsZWFudXBPZmZlcl9ib29sX21lcmdlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjYyMAogICAgLy8gY29uc3QgaXNFeHBpcmVkID0gKHN0YXRlID09PSBTVEFURV9PRkZFUkVEIHx8IHN0YXRlID09PSBTVEFURV9FU0NST1dJTkcpICYmIGV4cGlyYXRpb24gPD0gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcAogICAgZGlnIDIKICAgIGJ5dGVjIDYgLy8gMHgwYQogICAgPT0KICAgIGJueiBjbGVhbnVwT2ZmZXJfYW5kX2NvbnRkQDcKICAgIGRpZyAyCiAgICBieXRlYyA1IC8vIDB4MTQKICAgID09CiAgICBieiBjbGVhbnVwT2ZmZXJfYm9vbF9mYWxzZUA5CgpjbGVhbnVwT2ZmZXJfYW5kX2NvbnRkQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjYyMAogICAgLy8gY29uc3QgaXNFeHBpcmVkID0gKHN0YXRlID09PSBTVEFURV9PRkZFUkVEIHx8IHN0YXRlID09PSBTVEFURV9FU0NST1dJTkcpICYmIGV4cGlyYXRpb24gPD0gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcAogICAgZGlnIDEKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIDw9CiAgICBieiBjbGVhbnVwT2ZmZXJfYm9vbF9mYWxzZUA5CiAgICBpbnRjXzEgLy8gMQoKY2xlYW51cE9mZmVyX2Jvb2xfbWVyZ2VAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjYyMQogICAgLy8gYXNzZXJ0KGlzQ29tcGxldGVkIHx8IGlzRXhwaXJlZCwgRVJSX0lOVkFMSURfU1RBVEUpCiAgICBkaWcgNQogICAgfHwKICAgIGFzc2VydCAvLyB3cm9uZyBzdGF0ZQogICAgLy8gc21hcnRfY29udHJhY3RzL2h5cGVyLXN3YXAvY29udHJhY3QuYWxnby50czo2MjQKICAgIC8vIGFzc2VydChhY2NlcHRhbmNlcyA9PT0gMCwgJ2FsbCBwYXJ0aWNpcGFudHMgbXVzdCBiZSBjbGVhbmVkIHVwIGZpcnN0JykKICAgIGR1cAogICAgIQogICAgYXNzZXJ0IC8vIGFsbCBwYXJ0aWNpcGFudHMgbXVzdCBiZSBjbGVhbmVkIHVwIGZpcnN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjYyNgogICAgLy8gdGhpcy5vZmZlcnMoaWQpLmRlbGV0ZSgpCiAgICBkaWcgMwogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvaHlwZXItc3dhcC9jb250cmFjdC5hbGdvLnRzOjYxNAogICAgLy8gY2xlYW51cE9mZmVyKGlkOiB1aW50NjQpIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmNsZWFudXBPZmZlcl9ib29sX2ZhbHNlQDk6CiAgICBpbnRjXzAgLy8gMAogICAgYiBjbGVhbnVwT2ZmZXJfYm9vbF9tZXJnZUAxMAoKY2xlYW51cE9mZmVyX2Jvb2xfZmFsc2VANDoKICAgIGludGNfMCAvLyAwCiAgICBidXJ5IDUKICAgIGIgY2xlYW51cE9mZmVyX2Jvb2xfbWVyZ2VANQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czo6Q29udHJhY3RXaXRoT3B0SW4ub3B0SW5bcm91dGluZ10oKSAtPiB2b2lkOgpvcHRJbjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czoyMwogICAgLy8gb3B0SW4ocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBhc3NldDogQXNzZXQpOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czoyNS0zMgogICAgLy8gYXNzZXJ0TWF0Y2goCiAgICAvLyAgIHBheW1lbnQsCiAgICAvLyAgIHsKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UsCiAgICAvLyAgIH0sCiAgICAvLyAgIEVSUl9JTlZBTElEX1BBWU1FTlQKICAgIC8vICkKICAgIGRpZyAxCiAgICBndHhucyBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjI4CiAgICAvLyByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjI1LTMyCiAgICAvLyBhc3NlcnRNYXRjaCgKICAgIC8vICAgcGF5bWVudCwKICAgIC8vICAgewogICAgLy8gICAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSwKICAgIC8vICAgfSwKICAgIC8vICAgRVJSX0lOVkFMSURfUEFZTUVOVAogICAgLy8gKQogICAgPT0KICAgIHVuY292ZXIgMgogICAgZ3R4bnMgQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6MjkKICAgIC8vIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlLAogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6MjUtMzIKICAgIC8vIGFzc2VydE1hdGNoKAogICAgLy8gICBwYXltZW50LAogICAgLy8gICB7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlLAogICAgLy8gICB9LAogICAgLy8gICBFUlJfSU5WQUxJRF9QQVlNRU5UCiAgICAvLyApCiAgICA9PQogICAgJiYKICAgIGFzc2VydCAvLyBJbnZhbGlkIHBheW1lbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czozNC00MAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IDAsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czozNgogICAgLy8gYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgc3dhcAogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czozNwogICAgLy8gYXNzZXRBbW91bnQ6IDAsCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6MzQtMzkKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vICAgfSkKICAgIHB1c2hpbnQgNCAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czozNC00MAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IDAsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6MjMKICAgIC8vIG9wdEluKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYXNzZXQ6IEFzc2V0KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OlVwZ3JhZGVhYmxlQWtpdGFCYXNlQ29udHJhY3QudXBkYXRlW3JvdXRpbmddKCkgLT4gdm9pZDoKdXBkYXRlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIHB1c2hpbnQgMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciAobGVuK3V0ZjhbXSkKICAgIGV4dHJhY3QgMiAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo1MAogICAgLy8gYXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMyCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyOQogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMyCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkdXAKICAgIGJ5dGVjIDE5IC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo1MAogICAgLy8gYXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIHVuY292ZXIgMgogICAgPT0KICAgIGFzc2VydCAvLyBPbmx5IHRoZSBBa2l0YSBEQU8gY2FuIGNhbGwgdGhpcyBmdW5jdGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NAogICAgLy8gY29uc3QgW3BsdWdpbkFwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNQbHVnaW5BcHBMaXN0KSkKICAgIGJ5dGVjIDE0IC8vICJwYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo1MQogICAgLy8gY29uc3QgdXBkYXRlUGx1Z2luID0gZ2V0UGx1Z2luQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS51cGRhdGUKICAgIHB1c2hpbnQgMTYgLy8gMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo1MgogICAgLy8gYXNzZXJ0KEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbklkID09PSB1cGRhdGVQbHVnaW4sIEVSUl9JTlZBTElEX1VQR1JBREUpCiAgICBnbG9iYWwgQ2FsbGVyQXBwbGljYXRpb25JRAogICAgPT0KICAgIGFzc2VydCAvLyBJbnZhbGlkIGFwcCB1cGdyYWRlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gdmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5VmVyc2lvbiB9KQogICAgYnl0ZWMgMTYgLy8gInZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo1MwogICAgLy8gdGhpcy52ZXJzaW9uLnZhbHVlID0gbmV3VmVyc2lvbgogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiBbJ1VwZGF0ZUFwcGxpY2F0aW9uJ10gfSkKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6QWtpdGFCYXNlQ29udHJhY3QudXBkYXRlQWtpdGFEQU9bcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGVBa2l0YURBTzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM4CiAgICAvLyB1cGRhdGVBa2l0YURBTyhha2l0YURBTzogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozOQogICAgLy8gYXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMyCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyOQogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMyCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyAxOSAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzkKICAgIC8vIGFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYXNzZXJ0IC8vIE9ubHkgdGhlIEFraXRhIERBTyBjYW4gY2FsbCB0aGlzIGZ1bmN0aW9uCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyOQogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQwCiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlID0gYWtpdGFEQU8KICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozOAogICAgLy8gdXBkYXRlQWtpdGFEQU8oYWtpdGFEQU86IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCg==", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEgLy8gMQogICAgcmV0dXJuCg==" }, "byteCode": { "approval": "CyAHAAEIINSQAvjHDeiUBCYUCWFraXRhX2RhbwFvA2FhbAFwBBUffHUBFAEKBCvzzFoBaAEeAgAAATwMb2ZmZXJfY3Vyc29yASgDcGFsAYAHdmVyc2lvbgSiTAZ8AgABBndhbGxldIAE6pGA3TYaAI4BAK0xGRREMRhBAJaCDQQNs6RLBL3hoR4E2F/r3QRGb4caBFZqYrIEDHq0LgQGMYaLBGg7tngE0+4E8AQ5Tq6yBDPpLJQEhU3t4ASEBzPdNhoAjg0AdgGDAnsDmAULB3cIWAmVCjUKngsKADIAAQCALBUffHUAAAAAAADG1AAAAAAAAIhUAAAAAAAAiFQAAAAAAACfxAAAAAAAAGqksCNDI0OABM2a1n42GgCOAQANADEZgQQSMRgQREIKiDYaAUkiWYECCEsBFRJEVwIANhoCSRUkEkQXJxBPAmcoTGcnDCJnI0MxFiMJSTgQIxJENhoBSRVJJRJENhoCSRUkEkQXNhoDSRVJJRJENhoESRUkEkQXNhoFSRUkEkQXSwZLBBNESTIHDURLBzgASwg4BzIKEk8JOAghBRIQRCIoZUQqZUiBSFuxSXIIRCEGsgiyByOyECKyAbZPBxZXBgJLCFCBAxYnEbIaTLIaSwiyGkmyGksBshiBBrIQIrIBs7FLAXIIRCEGsgiyByOyECKyAbZPBRZXBgJLBlAnEbIashpLBbIashqyGIEGshAisgGzIicMZURJIwgnDExnIQUWTwJQMQBPAhZJTwJQK0xQTwK/JwZPBlBPBRZQIhZQTwRQTwMWUCMWUE8CFlApTwJQTL8jQzEWIwlJOBAjEkQ2GgFJFSQSRBc2GgJJIlklC4ECCEsBFRJETBYpSwFQSU4ESb1FAURJvkhJVwABSwGBYVtLAlcxIEsDgVlbTwSBUVtPBCcGEkQyB08EDESxIihlRCplSIFIWzIKSwQVFlcGAk8FUDEAAQGBAxYnB7IaTwOyGk8CshpMshpPBrIashqyGIEGshAisgGztD5JVwQATFcABCcEEkRJFSMSRCJTRDEATwRMUElXAAhMVwggUCtMUEm9RQEURE8CIwhJFk8EgVlPArtLAzgHMgoSSwQ4CCEEEhBETwM4ACEEFkxQTwJMvxJBAAVJIicFuyNDMRYjCUk4ECMSRDYaAUkVJBJEFzYaAkkVJRJENhoDSRUkEkQXNhoESSJZJQuBAghLARUSRE8DFilLAVBJTgZJvUUBREm+SElXAAFLAVcBIEsCgSlbSwOBIVtPBIFhW08EJwUSRDIHDURLBDEAUElXAAhMVwggUCtMUL1FAUQxAE8IUCIWUEsHFlABAU8FSwFQJwhMUEm9RQEURLEiKGVEKmVIgUhbMgpLBhUWVwYCTwdQgQMWJweyGk8CshpMshpPA7IaTwayGrIashiBBrIQIrIBs7Q+SVcEAExXAAQnBBJESRUjEkQiU0RLBTgHMgoSSwY4CE8GIQQIEhBETwQ4ACEEFkxQv0wjCEkWTwOBKU8CuxJBAAVJIicJuyNDMRaBAglJOBAjEkQxFiMJSTgQgQQSRDYaAUkVJBJEFzYaAkkVJRJENhoDSRUkEkQXSU4CTgM2GgRJFSQSRBdJTgJOBDYaBUkiWSULgQIISwEVEkRPBBYpSwFQSU4GSb1FAUS+SElXAAFLAVcBIEsCgSlbTghLAoEhW04ITwKBYVtPAicFEkQyBw1ESwExAFBJVwAITFcIIFArTFC9RQFEMQBLBFBLBhZQTwUWUAEBTwJLAVAnCExQSU4GvUUBFESxIihlRCplSIFIWzIKSwMVFlcGAk8EUIEDFicHshpPArIaTLIaTwKyGk8CshqyGrIYgQayECKyAbO0PklXBABMVwAEJwQSREkVIxJEIlNEIQROAkxwAEUBQAAHIQQyEAhFAUsISTgHMgoSSwE4CEsDSU4DEhBESwlJOBQyChJLATgRSwsSEEw4EksJEhBETDgATBZMUEsCTL9LAyMISRZLBoEpTwK7SwMSQQAGSwQiJwm7I0MiRwKAAEcENhoBSRUkEkQXNhoCSU4CSRUkEkQXTDYaA0lOAkkVJRJENhoESRUkEkQXSU4DNhoFSRUkEkQXSU4ETwMWKUsBUElOBUm9RQFEvkhJVwABTIEpW04FJwkSRDEATwRQSwMWSU4FUE8CFklOBFABAVAnCExQSb1FAURJvkhJVwggTgMiW04CvEhAADexSwiyB0sGsggjshAisgGzsUsBsgdJsggjshAisgGzSwQjCUkWSweBKU8Cu0AABksFIicNuyNDSwhLCHAARQFAAXNLCUlESXIIREsKEkRLATIQD0QiKGVESScOZUhXAAixMgqBBK+ABEcnryGyGk8CshonD7IaTLIaJwqyGrIaSwGyGIEGshAisgGztD5JVwQATFcABCcEEkRJFSMSRCJTRCcSSwZQSUUVJxJLBlBJTgJFF0kiWU8CIllJRRVLARJETwInDmVISVcACEwiW0sEgBJjb250cm9sbGVkX2FkZHJlc3NlSElOA0UXsYAEWC/zgrIaTLIaJw+yGicKshonCrIaJwqyGk8EshiBBrIQIrIBtjIQTwMLsghMsgcjshAisgG2gARoNeO8shpLDLIaJw+yGrIYshqBBrIQIrIBIkUOSw1LEAxBADZLElcCAEsOJAtJRRFbSUUNQQAatksRVwIASw9bshFLELIUSwuyEoEEshAisgFLDSMIRQ5C/8K2gARsw/YGshpLCbIYgQayECKyAbMyEElFDksBDEH+f7FJSw0JSwKyB7III7IQIrIBs0L+arFLCLIUSwayEksHshGBBLIQIrIBs7FLAbIHSbIII7IQIrIBs0L+QzYaAUkVJBJEFzYaAklOAkkiWSULgQIITBUSRBZJKUxQRwK9RQFEvkhJVwABSU8CSVcxIE4CSYEpW04CgWFbTCcGEkAAF0sDJwUSQAAPSwMnCRJBAIhJMgcOQQCBI0RLBTEAUElXAAhMVwggUCtMUL1FAUSxIihlRCplSIFIWzIKSwRJFRZXBgJMUDEAAQGBAxYnB7IaTwOyGk8CshpMshpLCLIashqyGIEGshAisgGztD5JVwQATFcABCcEEkRJFSMSRCJTREsBQAAISwQiJwu7I0NLBCKAATK7Qv/0IkL/fDYaAUkVJBJEFzYaAkkVJRJENhoDSRUkEkQXSU4CTgM2GgRJFSQSRBdJTgJOBDYaBUkiWSULgQIISwEVEkRPBBYpSwFQSU4HSb1FAUS+SElXAAFLAYEpW0lOA04JTFcBIEyAATISRExEMQBPBFBLBRZQTwQWUAEBTwJLAVAnCExQSb1FAUSxIihlRCplSIFIWzIKSwQVFlcGAk8FUIEDFicHshpPArIaTLIaTwOyGk8DshqyGrIYgQayECKyAbO0PklXBABMVwAEJwQSREkVIxJEIlNESb5ISVcIIE4EIltOA7xIQABBsTEAsgeyCCOyECKyAbOxSwGyB0myCCOyECKyAbNLAiMJSUAAERZLBElOAoEpTwK7IicLuyNDFksEgSlPArtC//OxMQCyFLISSwSyEYEEshAisgGzQv+3gAA2GgFJFSQSRBc2GgJJTgIVJRJEFkkpTFBHAr1FAUS+SElXAAFJTwJJgWFbTgKBWVtMJw0SQAAISwInCxJBAFkjRQdLAicGEkAACEsCJwUSQQBCSwEyBw5BADojSwcRREsESwZQK0xQSb1FAURJvkhJVwggTCJbTwK8SEsCIwkWSwaBWU8Cu7GyCLIHI7IQIrIBsyNDIkL/wyJFB0L/pIAANhoBSRUkEkQXFilMUEcCvUUBRL5ISVcAAUlPAkmBYVtOAoFZW0wnDRJAAAhLAicLEkEALSNFBUsCJwYSQAAISwInBRJBABZLATIHDkEADiNLBRFESRRESwO8SCNDIkL/7yJFBUL/0DEWIwlJOBAjEkQ2GgFJFSQSRBdLATgHMgoSTwI4CDIQEhBEsTIKTLIRIrISshSBBLIQIrIBsyNDNhoBSSJZgQIISwEVEkRXAgAxACIoZURJJxNlSHIIRE8CEkQnDmVIgRBbMg0SRCcQTGcjQzYaAUkVJBJEFzEAIihlRCcTZUhyCEQSRChMZyND", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
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
var HyperSwapFactory = class {
  /**
   * The underlying `AppFactory` for when you want to have more flexibility
   */
  appFactory;
  /**
   * Creates a new instance of `HyperSwapFactory`
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
  params = {
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
       * Creates a new instance of the HyperSwap smart contract using the create(string,uint64)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create transaction
       */
      create: (params) => {
        return this.appFactory.createTransaction.create(HyperSwapParamsFactory.create.create(params));
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
  };
};
var HyperSwapClient = class _HyperSwapClient {
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
   * Returns a new `HyperSwapClient` client, resolving the app by creator address and name
   * using AlgoKit app deployment semantics (i.e. looking for the app creation transaction note).
   * @param params The parameters to create the app client
   */
  static async fromCreatorAndName(params) {
    return new _HyperSwapClient(await _AppClient.fromCreatorAndName({ ...params, appSpec: APP_SPEC }));
  }
  /**
   * Returns an `HyperSwapClient` instance for the current network based on
   * pre-determined network-specific app IDs specified in the ARC-56 app spec.
   *
   * If no IDs are in the app spec or the network isn't recognised, an error is thrown.
   * @param params The parameters to create the app client
   */
  static async fromNetwork(params) {
    return new _HyperSwapClient(await _AppClient.fromNetwork({ ...params, appSpec: APP_SPEC }));
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
  };
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
  state = {
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
  };
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
       * Add a accept(pay,uint64,byte[32][])void method call against the HyperSwap contract
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
};

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
var HyperSwapSDK = class extends BaseSDK {
  constructor(params) {
    super({ factory: HyperSwapFactory, ...params }, ENV_VAR_NAMES.HYPER_SWAP_APP_ID);
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
      amount: microAlgo(1e5),
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
      amount: microAlgo(totalMbr),
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
      amount: microAlgo(mbrData.participants),
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
        amount: microAlgo(mbrData.hashes + 200000n),
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
        amount: microAlgo(BigInt(amount) + mbrData.hashes),
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

export {
  OfferState,
  HyperSwapSDK
};
//# sourceMappingURL=chunk-MMOTCSDK.mjs.map
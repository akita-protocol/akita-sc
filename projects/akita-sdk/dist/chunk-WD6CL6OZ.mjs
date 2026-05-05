import {
  makeErrorTranslator
} from "./chunk-2AEP6DTX.mjs";
import {
  BaseSDK
} from "./chunk-JNYFBSSA.mjs";
import {
  ENV_VAR_NAMES
} from "./chunk-X7YBMTJD.mjs";

// src/rewards/index.ts
import { microAlgo } from "@algorandfoundation/algokit-utils";
import { ABIMethod } from "@algorandfoundation/algokit-utils/abi";

// src/generated/RewardsClient.ts
import { ABIStructType, getStructValueFromTupleValue } from "@algorandfoundation/algokit-utils/abi";
import { AppClient as _AppClient } from "@algorandfoundation/algokit-utils/app-client";
import { AppFactory as _AppFactory } from "@algorandfoundation/algokit-utils/app-factory";
var APP_SPEC = { "name": "Rewards", "structs": { "DisbursementDetails": [{ "name": "creator", "type": "address" }, { "name": "finalized", "type": "bool" }, { "name": "title", "type": "string" }, { "name": "amount", "type": "uint64" }, { "name": "timeToUnlock", "type": "uint64" }, { "name": "expiration", "type": "uint64" }, { "name": "allocations", "type": "uint64" }, { "name": "distributed", "type": "uint64" }, { "name": "mbrCredits", "type": "uint64" }, { "name": "usedMbrCredits", "type": "uint64" }, { "name": "note", "type": "string" }], "RewardsMBRData": [{ "name": "disbursements", "type": "uint64" }, { "name": "userAllocations", "type": "uint64" }], "UserAllocationsKey": [{ "name": "address", "type": "address" }, { "name": "asset", "type": "uint64" }, { "name": "disbursementId", "type": "uint64" }] }, "methods": [{ "name": "create", "args": [{ "type": "string", "name": "version" }, { "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "fundMbrCredits", "args": [{ "type": "uint64", "name": "id" }, { "type": "pay", "name": "payment" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "withdrawMbrCredits", "args": [{ "type": "uint64", "name": "id" }, { "type": "uint64", "name": "amount" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "createDisbursement", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "string", "name": "title" }, { "type": "uint64", "name": "timeToUnlock" }, { "type": "uint64", "name": "expiration" }, { "type": "string", "name": "note" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "editDisbursement", "args": [{ "type": "uint64", "name": "id" }, { "type": "string", "name": "title" }, { "type": "uint64", "name": "timeToUnlock" }, { "type": "uint64", "name": "expiration" }, { "type": "string", "name": "note" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "createUserAllocations", "args": [{ "type": "pay", "name": "payment" }, { "type": "uint64", "name": "id" }, { "type": "(address,uint64)[]", "name": "allocations" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "createAsaUserAllocations", "args": [{ "type": "axfer", "name": "assetXfer" }, { "type": "uint64", "name": "id" }, { "type": "(address,uint64)[]", "name": "allocations" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "createAsaDisbursementFromGroup", "args": [{ "type": "uint64", "name": "mbrPaymentIndex" }, { "type": "uint64", "name": "assetTransferStartIndex" }, { "type": "string", "name": "title" }, { "type": "uint64", "name": "timeToUnlock" }, { "type": "uint64", "name": "expiration" }, { "type": "string", "name": "note" }, { "type": "(address,uint64)[]", "name": "allocations" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "finalizeDisbursement", "args": [{ "type": "uint64", "name": "id" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "createInstantDisbursement", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "uint64", "name": "timeToUnlock" }, { "type": "uint64", "name": "expiration" }, { "type": "(address,uint64)[]", "name": "allocations" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "createInstantAsaDisbursement", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "uint64", "name": "timeToUnlock" }, { "type": "uint64", "name": "expiration" }, { "type": "(address,uint64)[]", "name": "allocations" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "claimRewards", "args": [{ "type": "(uint64,uint64)[]", "name": "rewards" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "reclaimRewards", "args": [{ "type": "uint64", "name": "id" }, { "type": "(address,uint64)[]", "name": "reclaims" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "allocationMbrCreditShortfall", "args": [{ "type": "uint64", "name": "id" }, { "type": "uint64", "name": "allocationCount" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "mbr", "args": [{ "type": "string", "name": "title" }, { "type": "string", "name": "note" }], "returns": { "type": "(uint64,uint64)", "struct": "RewardsMBRData" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "optIn", "args": [{ "type": "pay", "name": "payment", "desc": "The payment transaction" }, { "type": "uint64", "name": "asset", "desc": "The asset to be opted into" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "optin tells the contract to opt into an asa", "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 2, "bytes": 1 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "disbursementID": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "ZGlzYnVyc2VtZW50X2lk", "desc": "the disbursement id cursor" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" } }, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": { "disbursements": { "keyType": "uint64", "valueType": "DisbursementDetails", "desc": "the disbursement map of tokens\n\nthe key is the uint64 id of the disbursement\nthe value is the details of the disbursement", "prefix": "ZA==" }, "userAllocations": { "keyType": "UserAllocationsKey", "valueType": "uint64", "desc": "the user allocations of disbursements\n\nthe key is the address of the qualified account with the uint64 id of the disbursement\nthe value is the amount they are owed", "prefix": "dQ==" } } } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [915, 2990, 3271], "errorMessage": "Box must have value" }, { "pc": [1205, 1512, 1952], "errorMessage": "ERR:ALAE" }, { "pc": [2985, 3266], "errorMessage": "ERR:ALNE" }, { "pc": [911, 1149, 1453, 2241, 3189], "errorMessage": "ERR:DBAF" }, { "pc": [2101, 2295], "errorMessage": "ERR:DBEM" }, { "pc": [2954], "errorMessage": "ERR:DBFD" }, { "pc": [2922, 2934], "errorMessage": "ERR:DBLK" }, { "pc": [2115, 2304], "errorMessage": "ERR:DBMA" }, { "pc": [422, 513, 877, 1067, 1371, 2171, 2851, 3143, 3401], "errorMessage": "ERR:DBNE" }, { "pc": [3209], "errorMessage": "ERR:DBNX" }, { "pc": [2063, 2262], "errorMessage": "ERR:IDUT" }, { "pc": [2087, 2286], "errorMessage": "ERR:IDXT" }, { "pc": [537, 553, 3657, 3716], "errorMessage": "ERR:IMBR" }, { "pc": [450, 463, 684, 700, 1293, 1306, 1763, 1782, 2461, 2477, 2681, 2694], "errorMessage": "ERR:IPAY" }, { "pc": [3597], "errorMessage": "ERR:IPMA" }, { "pc": [3575], "errorMessage": "ERR:IPMR" }, { "pc": [1601, 1615, 1966, 1986, 2708, 2722], "errorMessage": "ERR:IXFR" }, { "pc": [3485], "errorMessage": "ERR:NDAO" }, { "pc": [437, 528, 902, 1140, 1444, 2232, 3180], "errorMessage": "ERR:YNCR" }, { "pc": [3469], "errorMessage": "application exists" }, { "pc": [3456, 3624], "errorMessage": "check GlobalState exists" }, { "pc": [1176, 1480, 1921, 2412, 2629, 2824, 3233], "errorMessage": "index access is out of bounds" }, { "pc": [427, 469, 478, 518, 542, 559, 574, 883, 888, 979, 985, 1073, 1079, 1223, 1234, 1239, 1248, 1377, 1383, 1530, 1541, 1546, 1555, 2001, 2012, 2017, 2026, 2093, 2107, 2129, 2177, 2183, 2193, 2202, 2211, 2219, 2317, 2858, 2865, 2874, 2883, 3001, 3012, 3017, 3026, 3149, 3159, 3167, 3282, 3293, 3298, 3307, 3415, 3646, 3664, 3676, 3681, 3690, 3705, 3723, 3735, 3740, 3749], "errorMessage": "index out of bounds" }, { "pc": [349, 608, 649, 819, 857, 1040, 1344, 1649, 1690, 1712, 2362, 2579, 2791, 3116, 3498, 3514], "errorMessage": "invalid array length header" }, { "pc": [356, 615, 656, 828, 863, 1656, 1697, 3505, 3521], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [3128], "errorMessage": "invalid number of bytes for arc4.dynamic_array<smart_contracts/rewards/types.ts::AllocationReclaimDetails>" }, { "pc": [2803], "errorMessage": "invalid number of bytes for arc4.dynamic_array<smart_contracts/rewards/types.ts::ClaimDetails>" }, { "pc": [1052, 1356, 1726, 2376, 2593], "errorMessage": "invalid number of bytes for arc4.dynamic_array<smart_contracts/rewards/types.ts::UserAllocation>" }, { "pc": [367, 395, 488, 497, 629, 640, 809, 838, 848, 1029, 1333, 1631, 1641, 1670, 1681, 2156, 2345, 2354, 2562, 2571, 3105, 3376, 3385, 3448, 3553], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [1325, 1908, 2554], "errorMessage": "transaction type is axfer" }, { "pc": [408, 602, 1021, 1738, 2337, 2543, 3545], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDggMiAyNTMwMCA0MTcwMAogICAgYnl0ZWNibG9jayAiZCIgIkVSUjpJUEFZIiAiIiAiRVJSOkRCTkUiICJFUlI6WU5DUiIgInUiIDB4MTUxZjdjNzUgIkVSUjpJWEZSIiAiRVJSOkRCQUYiICJFUlI6SU1CUiIgImRpc2J1cnNlbWVudF9pZCIgImFraXRhX2RhbyIgIkVSUjpBTEFFIiAweDAwMDA1ZCAiRVJSOklEVVQiICJFUlI6SURYVCIgIkVSUjpEQkVNIiAiRVJSOkRCTUEiIDB4ODAwMDVkIDB4MDA1ZjAwMDAwMDAwICJFUlI6REJMSyIgIkVSUjpBTE5FIgogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgIGJueiBtYWluX2FmdGVyX2lmX2Vsc2VAMgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1OQogICAgLy8gZGlzYnVyc2VtZW50SUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAxLCBrZXk6IFJld2FyZHNHbG9iYWxTdGF0ZUtleURpc2J1cnNlbWVudElEIH0pCiAgICBieXRlYyAxMCAvLyAiZGlzYnVyc2VtZW50X2lkIgogICAgaW50Y18xIC8vIDEKICAgIGFwcF9nbG9iYWxfcHV0CgptYWluX2FmdGVyX2lmX2Vsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTQKICAgIC8vIGV4cG9ydCBjbGFzcyBSZXdhcmRzIGV4dGVuZHMgY2xhc3NlcyhCYXNlUmV3YXJkcywgQWtpdGFCYXNlQ29udHJhY3QsIENvbnRyYWN0V2l0aE9wdEluKSB7CiAgICB0eG4gT25Db21wbGV0aW9uCiAgICAhCiAgICBhc3NlcnQKICAgIHR4biBBcHBsaWNhdGlvbklECiAgICBieiBtYWluX2NyZWF0ZV9Ob09wQDIzCiAgICBwdXNoYnl0ZXNzIDB4NjY2MTIwNWEgMHhkNjFhNjlmYSAweDFjOWViYmRiIDB4OGY0OTI2MmQgMHg1NjU2YWNmOSAweGY2MmNkYzJiIDB4NmY1YzEwY2YgMHg1NDI0YTU5MSAweDdiN2RjNWZjIDB4YWYxYTE0ZjIgMHgzZWM0MGFhNCAweGJkM2NkMDkwIDB4MTQ5NjlkOTcgMHgzM2U5MmM5NCAweDg1NGRlZGUwIDB4ZDU0YmJhZDkgMHgzOTRlYWViMiAvLyBtZXRob2QgImZ1bmRNYnJDcmVkaXRzKHVpbnQ2NCxwYXkpdm9pZCIsIG1ldGhvZCAid2l0aGRyYXdNYnJDcmVkaXRzKHVpbnQ2NCx1aW50NjQpdm9pZCIsIG1ldGhvZCAiY3JlYXRlRGlzYnVyc2VtZW50KHBheSxzdHJpbmcsdWludDY0LHVpbnQ2NCxzdHJpbmcpdWludDY0IiwgbWV0aG9kICJlZGl0RGlzYnVyc2VtZW50KHVpbnQ2NCxzdHJpbmcsdWludDY0LHVpbnQ2NCxzdHJpbmcpdm9pZCIsIG1ldGhvZCAiY3JlYXRlVXNlckFsbG9jYXRpb25zKHBheSx1aW50NjQsKGFkZHJlc3MsdWludDY0KVtdKXZvaWQiLCBtZXRob2QgImNyZWF0ZUFzYVVzZXJBbGxvY2F0aW9ucyhheGZlcix1aW50NjQsKGFkZHJlc3MsdWludDY0KVtdKXZvaWQiLCBtZXRob2QgImNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cCh1aW50NjQsdWludDY0LHN0cmluZyx1aW50NjQsdWludDY0LHN0cmluZywoYWRkcmVzcyx1aW50NjQpW10pdWludDY0IiwgbWV0aG9kICJmaW5hbGl6ZURpc2J1cnNlbWVudCh1aW50NjQpdm9pZCIsIG1ldGhvZCAiY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudChwYXksdWludDY0LHVpbnQ2NCwoYWRkcmVzcyx1aW50NjQpW10pdWludDY0IiwgbWV0aG9kICJjcmVhdGVJbnN0YW50QXNhRGlzYnVyc2VtZW50KHBheSxheGZlcix1aW50NjQsdWludDY0LChhZGRyZXNzLHVpbnQ2NClbXSl1aW50NjQiLCBtZXRob2QgImNsYWltUmV3YXJkcygodWludDY0LHVpbnQ2NClbXSl2b2lkIiwgbWV0aG9kICJyZWNsYWltUmV3YXJkcyh1aW50NjQsKGFkZHJlc3MsdWludDY0KVtdKXZvaWQiLCBtZXRob2QgImFsbG9jYXRpb25NYnJDcmVkaXRTaG9ydGZhbGwodWludDY0LHVpbnQ2NCl1aW50NjQiLCBtZXRob2QgInVwZGF0ZUFraXRhREFPKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJvcFVwKCl2b2lkIiwgbWV0aG9kICJtYnIoc3RyaW5nLHN0cmluZykodWludDY0LHVpbnQ2NCkiLCBtZXRob2QgIm9wdEluKHBheSx1aW50NjQpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIGZ1bmRNYnJDcmVkaXRzIHdpdGhkcmF3TWJyQ3JlZGl0cyBjcmVhdGVEaXNidXJzZW1lbnQgZWRpdERpc2J1cnNlbWVudCBjcmVhdGVVc2VyQWxsb2NhdGlvbnMgY3JlYXRlQXNhVXNlckFsbG9jYXRpb25zIGNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cCBmaW5hbGl6ZURpc2J1cnNlbWVudCBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50IGNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnQgY2xhaW1SZXdhcmRzIHJlY2xhaW1SZXdhcmRzIGFsbG9jYXRpb25NYnJDcmVkaXRTaG9ydGZhbGwgdXBkYXRlQWtpdGFEQU8gbWFpbl9vcFVwX3JvdXRlQDE5IG1iciBvcHRJbgogICAgZXJyCgptYWluX29wVXBfcm91dGVAMTk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0MQogICAgLy8gb3BVcCgpOiB2b2lkIHsgfQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKbWFpbl9jcmVhdGVfTm9PcEAyMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTQKICAgIC8vIGV4cG9ydCBjbGFzcyBSZXdhcmRzIGV4dGVuZHMgY2xhc3NlcyhCYXNlUmV3YXJkcywgQWtpdGFCYXNlQ29udHJhY3QsIENvbnRyYWN0V2l0aE9wdEluKSB7CiAgICBwdXNoYnl0ZXMgMHhjZDlhZDY3ZSAvLyBtZXRob2QgImNyZWF0ZShzdHJpbmcsdWludDY0KXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBjcmVhdGUKICAgIGVycgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6OlJld2FyZHMuY3JlYXRlW3JvdXRpbmddKCkgLT4gdm9pZDoKY3JlYXRlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxMDcKICAgIC8vIEBhYmltZXRob2QoeyBvbkNyZWF0ZTogJ3JlcXVpcmUnIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjUKICAgIC8vIHZlcnNpb24gPSBHbG9iYWxTdGF0ZTxzdHJpbmc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleVZlcnNpb24gfSkKICAgIHB1c2hieXRlcyAidmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTA5CiAgICAvLyB0aGlzLnZlcnNpb24udmFsdWUgPSB2ZXJzaW9uCiAgICB1bmNvdmVyIDIKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjIDExIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjExMAogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSA9IEFwcGxpY2F0aW9uKGFraXRhREFPKQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTA3CiAgICAvLyBAYWJpbWV0aG9kKHsgb25DcmVhdGU6ICdyZXF1aXJlJyB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6OlJld2FyZHMuZnVuZE1ickNyZWRpdHNbcm91dGluZ10oKSAtPiB2b2lkOgpmdW5kTWJyQ3JlZGl0czoKICAgIGJ5dGVjXzIgLy8gIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTE1CiAgICAvLyBmdW5kTWJyQ3JlZGl0cyhpZDogdWludDY0LCBwYXltZW50OiBndHhuLlBheW1lbnRUeG4pOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxMTYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmRpc2J1cnNlbWVudHMoaWQpLmV4aXN0cywgRVJSX0RJU0JVUlNFTUVOVF9ET0VTX05PVF9FWElTVCkKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NjkKICAgIC8vIGRpc2J1cnNlbWVudHMgPSBCb3hNYXA8dWludDY0LCBEaXNidXJzZW1lbnREZXRhaWxzPih7IGtleVByZWZpeDogUmV3YXJkc0JveFByZWZpeERpc2J1cnNlbWVudHMgfSkKICAgIGJ5dGVjXzAgLy8gImQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxMTYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmRpc2J1cnNlbWVudHMoaWQpLmV4aXN0cywgRVJSX0RJU0JVUlNFTUVOVF9ET0VTX05PVF9FWElTVCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGZ1bmRNYnJDcmVkaXRzX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlY18zIC8vICJFUlI6REJORSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpEQk5FCgpmdW5kTWJyQ3JlZGl0c19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTE3CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZS5jcmVhdG9yID09PSBUeG4uc2VuZGVyLCBFUlJfWU9VX0FSRV9OT1RfVEhFX0NSRUFUT1IpCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBwdXNoaW50IDMyCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgdHhuIFNlbmRlcgogICAgPT0KICAgIGJueiBmdW5kTWJyQ3JlZGl0c19hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgNCAvLyAiRVJSOllOQ1IiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6WU5DUgoKZnVuZE1ickNyZWRpdHNfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjExOAogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfSU5WQUxJRF9QQVlNRU5UKQogICAgZGlnIDEKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBmdW5kTWJyQ3JlZGl0c19hZnRlcl9hc3NlcnRANwogICAgYnl0ZWNfMSAvLyAiRVJSOklQQVkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBBWQoKZnVuZE1ickNyZWRpdHNfYWZ0ZXJfYXNzZXJ0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjExOQogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID4gMCwgRVJSX0lOVkFMSURfUEFZTUVOVCkKICAgIGRpZyAxCiAgICBndHhucyBBbW91bnQKICAgIGR1cAogICAgYnVyeSA0CiAgICBibnogZnVuZE1ickNyZWRpdHNfYWZ0ZXJfYXNzZXJ0QDkKICAgIGJ5dGVjXzEgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCmZ1bmRNYnJDcmVkaXRzX2FmdGVyX2Fzc2VydEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo4NgogICAgLy8gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZS5tYnJDcmVkaXRzICs9IGFtb3VudAogICAgZHVwbiAyCiAgICBwdXNoaW50IDc1CiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGRpZyA0CiAgICArCiAgICBpdG9iCiAgICBwdXNoaW50IDc1CiAgICBzd2FwCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxMTUKICAgIC8vIGZ1bmRNYnJDcmVkaXRzKGlkOiB1aW50NjQsIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4bik6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6OlJld2FyZHMud2l0aGRyYXdNYnJDcmVkaXRzW3JvdXRpbmddKCkgLT4gdm9pZDoKd2l0aGRyYXdNYnJDcmVkaXRzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxMjQKICAgIC8vIHdpdGhkcmF3TWJyQ3JlZGl0cyhpZDogdWludDY0LCBhbW91bnQ6IHVpbnQ2NCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxMjUKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmRpc2J1cnNlbWVudHMoaWQpLmV4aXN0cywgRVJSX0RJU0JVUlNFTUVOVF9ET0VTX05PVF9FWElTVCkKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NjkKICAgIC8vIGRpc2J1cnNlbWVudHMgPSBCb3hNYXA8dWludDY0LCBEaXNidXJzZW1lbnREZXRhaWxzPih7IGtleVByZWZpeDogUmV3YXJkc0JveFByZWZpeERpc2J1cnNlbWVudHMgfSkKICAgIGJ5dGVjXzAgLy8gImQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxMjUKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmRpc2J1cnNlbWVudHMoaWQpLmV4aXN0cywgRVJSX0RJU0JVUlNFTUVOVF9ET0VTX05PVF9FWElTVCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHdpdGhkcmF3TWJyQ3JlZGl0c19hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWNfMyAvLyAiRVJSOkRCTkUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6REJORQoKd2l0aGRyYXdNYnJDcmVkaXRzX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxMjYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlLmNyZWF0b3IgPT09IFR4bi5zZW5kZXIsIEVSUl9ZT1VfQVJFX05PVF9USEVfQ1JFQVRPUikKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIHB1c2hpbnQgMzIKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICB0eG4gU2VuZGVyCiAgICA9PQogICAgYm56IHdpdGhkcmF3TWJyQ3JlZGl0c19hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgNCAvLyAiRVJSOllOQ1IiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6WU5DUgoKd2l0aGRyYXdNYnJDcmVkaXRzX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxMjcKICAgIC8vIGxvZ2dlZEFzc2VydChhbW91bnQgPiAwLCBFUlJfSU5WQUxJRF9NQlJfQU1PVU5UKQogICAgZGlnIDEKICAgIGJueiB3aXRoZHJhd01ickNyZWRpdHNfYWZ0ZXJfYXNzZXJ0QDcKICAgIGJ5dGVjIDkgLy8gIkVSUjpJTUJSIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklNQlIKCndpdGhkcmF3TWJyQ3JlZGl0c19hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTI4CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZS5tYnJDcmVkaXRzID49IGFtb3VudCwgRVJSX0lOVkFMSURfTUJSX0FNT1VOVCkKICAgIGR1cAogICAgcHVzaGludCA3NQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBkaWcgMgogICAgPj0KICAgIGJueiB3aXRoZHJhd01ickNyZWRpdHNfYWZ0ZXJfYXNzZXJ0QDkKICAgIGJ5dGVjIDkgLy8gIkVSUjpJTUJSIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklNQlIKCndpdGhkcmF3TWJyQ3JlZGl0c19hZnRlcl9hc3NlcnRAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTI5CiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlLm1ickNyZWRpdHMgLT0gYW1vdW50CiAgICBkdXBuIDIKICAgIHB1c2hpbnQgNzUKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgZGlnIDMKICAgIGR1cAogICAgY292ZXIgMgogICAgLQogICAgaXRvYgogICAgdW5jb3ZlciAyCiAgICBwdXNoaW50IDc1CiAgICB1bmNvdmVyIDIKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjEzMS0xMzQKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICBhbW91bnQsCiAgICAvLyB9KS5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxMzIKICAgIC8vIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTMxLTEzNAogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgIGFtb3VudCwKICAgIC8vIH0pLnN1Ym1pdCgpCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxMjQKICAgIC8vIHdpdGhkcmF3TWJyQ3JlZGl0cyhpZDogdWludDY0LCBhbW91bnQ6IHVpbnQ2NCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6OlJld2FyZHMuY3JlYXRlRGlzYnVyc2VtZW50W3JvdXRpbmddKCkgLT4gdm9pZDoKY3JlYXRlRGlzYnVyc2VtZW50OgogICAgYnl0ZWNfMiAvLyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxMzctMTQzCiAgICAvLyBjcmVhdGVEaXNidXJzZW1lbnQoCiAgICAvLyAgIG1iclBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgdGl0bGU6IHN0cmluZywKICAgIC8vICAgdGltZVRvVW5sb2NrOiB1aW50NjQsCiAgICAvLyAgIGV4cGlyYXRpb246IHVpbnQ2NCwKICAgIC8vICAgbm90ZTogc3RyaW5nCiAgICAvLyApOiB1aW50NjQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXBuIDIKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgZHVwCiAgICBjb3ZlciAyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciAyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciAyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgZHVwCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjE0NAogICAgLy8gY29uc3QgaWQgPSB0aGlzLm5ld0Rpc2J1cnNlbWVudElEKCkKICAgIGNhbGxzdWIgbmV3RGlzYnVyc2VtZW50SUQKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTQ2CiAgICAvLyBjb25zdCBjb3N0cyA9IHRoaXMubWJyKHRpdGxlLCBub3RlKQogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9iYXNlLnRzOjpCYXNlUmV3YXJkcy5tYnIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTQ3CiAgICAvLyBjb25zdCBtYnJBbW91bnQgPSBjb3N0cy5kaXNidXJzZW1lbnRzCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTQ5CiAgICAvLyBsb2dnZWRBc3NlcnQobWJyUGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIEVSUl9JTlZBTElEX1BBWU1FTlQpCiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogY3JlYXRlRGlzYnVyc2VtZW50X2FmdGVyX2Fzc2VydEAzCiAgICBieXRlY18xIC8vICJFUlI6SVBBWSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUEFZCgpjcmVhdGVEaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjE1MAogICAgLy8gbG9nZ2VkQXNzZXJ0KG1iclBheW1lbnQuYW1vdW50ID49IG1ickFtb3VudCwgRVJSX0lOVkFMSURfUEFZTUVOVCkKICAgIGRpZyA2CiAgICBndHhucyBBbW91bnQKICAgIGR1cAogICAgYnVyeSA5CiAgICBkaWcgMQogICAgPj0KICAgIGJueiBjcmVhdGVEaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjXzEgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCmNyZWF0ZURpc2J1cnNlbWVudF9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTUzCiAgICAvLyBjcmVhdG9yOiBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxNjEKICAgIC8vIG1ickNyZWRpdHM6IG1iclBheW1lbnQuYW1vdW50IC0gbWJyQW1vdW50LAogICAgZGlnIDgKICAgIGRpZyAyCiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjE1Mi0xNjQKICAgIC8vIHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUgPSB7CiAgICAvLyAgIGNyZWF0b3I6IFR4bi5zZW5kZXIsCiAgICAvLyAgIGZpbmFsaXplZDogZmFsc2UsCiAgICAvLyAgIHRpdGxlLAogICAgLy8gICBhbW91bnQ6IDAsCiAgICAvLyAgIHRpbWVUb1VubG9jaywKICAgIC8vICAgZXhwaXJhdGlvbiwKICAgIC8vICAgYWxsb2NhdGlvbnM6IDAsCiAgICAvLyAgIGRpc3RyaWJ1dGVkOiAwLAogICAgLy8gICBtYnJDcmVkaXRzOiBtYnJQYXltZW50LmFtb3VudCAtIG1ickFtb3VudCwKICAgIC8vICAgdXNlZE1ickNyZWRpdHM6IDAsCiAgICAvLyAgIG5vdGUsCiAgICAvLyB9CiAgICBkaWcgNwogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHVuY292ZXIgMgogICAgYnl0ZWMgMTMgLy8gMHgwMDAwNWQKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIGxlbgogICAgcHVzaGludCA5MwogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxNTYKICAgIC8vIGFtb3VudDogMCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjE1Mi0xNjQKICAgIC8vIHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUgPSB7CiAgICAvLyAgIGNyZWF0b3I6IFR4bi5zZW5kZXIsCiAgICAvLyAgIGZpbmFsaXplZDogZmFsc2UsCiAgICAvLyAgIHRpdGxlLAogICAgLy8gICBhbW91bnQ6IDAsCiAgICAvLyAgIHRpbWVUb1VubG9jaywKICAgIC8vICAgZXhwaXJhdGlvbiwKICAgIC8vICAgYWxsb2NhdGlvbnM6IDAsCiAgICAvLyAgIGRpc3RyaWJ1dGVkOiAwLAogICAgLy8gICBtYnJDcmVkaXRzOiBtYnJQYXltZW50LmFtb3VudCAtIG1ickFtb3VudCwKICAgIC8vICAgdXNlZE1ickNyZWRpdHM6IDAsCiAgICAvLyAgIG5vdGUsCiAgICAvLyB9CiAgICBpdG9iCiAgICB1bmNvdmVyIDIKICAgIGRpZyAxCiAgICBjb25jYXQKICAgIGRpZyA5CiAgICBpdG9iCiAgICBjb25jYXQKICAgIGRpZyA4CiAgICBpdG9iCiAgICBjb25jYXQKICAgIGRpZyAxCiAgICBjb25jYXQKICAgIGRpZyAxCiAgICBjb25jYXQKICAgIHVuY292ZXIgNAogICAgaXRvYgogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGRpZyA1CiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTUyCiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlID0gewogICAgZGlnIDIKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NjkKICAgIC8vIGRpc2J1cnNlbWVudHMgPSBCb3hNYXA8dWludDY0LCBEaXNidXJzZW1lbnREZXRhaWxzPih7IGtleVByZWZpeDogUmV3YXJkc0JveFByZWZpeERpc2J1cnNlbWVudHMgfSkKICAgIGJ5dGVjXzAgLy8gImQiCiAgICBkaWcgMQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjE1Mi0xNjQKICAgIC8vIHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUgPSB7CiAgICAvLyAgIGNyZWF0b3I6IFR4bi5zZW5kZXIsCiAgICAvLyAgIGZpbmFsaXplZDogZmFsc2UsCiAgICAvLyAgIHRpdGxlLAogICAgLy8gICBhbW91bnQ6IDAsCiAgICAvLyAgIHRpbWVUb1VubG9jaywKICAgIC8vICAgZXhwaXJhdGlvbiwKICAgIC8vICAgYWxsb2NhdGlvbnM6IDAsCiAgICAvLyAgIGRpc3RyaWJ1dGVkOiAwLAogICAgLy8gICBtYnJDcmVkaXRzOiBtYnJQYXltZW50LmFtb3VudCAtIG1ickFtb3VudCwKICAgIC8vICAgdXNlZE1ickNyZWRpdHM6IDAsCiAgICAvLyAgIG5vdGUsCiAgICAvLyB9CiAgICBkdXAKICAgIGJveF9kZWwKICAgIHBvcAogICAgdW5jb3ZlciAyCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjEzNy0xNDMKICAgIC8vIGNyZWF0ZURpc2J1cnNlbWVudCgKICAgIC8vICAgbWJyUGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICB0aXRsZTogc3RyaW5nLAogICAgLy8gICB0aW1lVG9VbmxvY2s6IHVpbnQ2NCwKICAgIC8vICAgZXhwaXJhdGlvbjogdWludDY0LAogICAgLy8gICBub3RlOiBzdHJpbmcKICAgIC8vICk6IHVpbnQ2NCB7CiAgICBieXRlYyA2IC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo6UmV3YXJkcy5lZGl0RGlzYnVyc2VtZW50W3JvdXRpbmddKCkgLT4gdm9pZDoKZWRpdERpc2J1cnNlbWVudDoKICAgIGJ5dGVjXzIgLy8gIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTY5LTE3NQogICAgLy8gZWRpdERpc2J1cnNlbWVudCgKICAgIC8vICAgaWQ6IHVpbnQ2NCwKICAgIC8vICAgdGl0bGU6IHN0cmluZywKICAgIC8vICAgdGltZVRvVW5sb2NrOiB1aW50NjQsCiAgICAvLyAgIGV4cGlyYXRpb246IHVpbnQ2NCwKICAgIC8vICAgbm90ZTogc3RyaW5nCiAgICAvLyApOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgY292ZXIgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIHN3YXAKICAgIGxlbgogICAgZHVwCiAgICBjb3ZlciAzCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgY292ZXIgMgogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgY292ZXIgMgogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDUKICAgIGR1cAogICAgY292ZXIgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIHN3YXAKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjE3NgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZGlzYnVyc2VtZW50cyhpZCkuZXhpc3RzLCBFUlJfRElTQlVSU0VNRU5UX0RPRVNfTk9UX0VYSVNUKQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2OQogICAgLy8gZGlzYnVyc2VtZW50cyA9IEJveE1hcDx1aW50NjQsIERpc2J1cnNlbWVudERldGFpbHM+KHsga2V5UHJlZml4OiBSZXdhcmRzQm94UHJlZml4RGlzYnVyc2VtZW50cyB9KQogICAgYnl0ZWNfMCAvLyAiZCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjE3NgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZGlzYnVyc2VtZW50cyhpZCkuZXhpc3RzLCBFUlJfRElTQlVSU0VNRU5UX0RPRVNfTk9UX0VYSVNUKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogZWRpdERpc2J1cnNlbWVudF9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWNfMyAvLyAiRVJSOkRCTkUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6REJORQoKZWRpdERpc2J1cnNlbWVudF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTc4CiAgICAvLyBjb25zdCB7IGNyZWF0b3IsIGZpbmFsaXplZCB9ID0gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZQogICAgZHVwbiAyCiAgICBpbnRjXzAgLy8gMAogICAgcHVzaGludCAzMgogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIHN3YXAKICAgIHB1c2hpbnQgMzIKICAgIGludGNfMSAvLyAxCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgYnVyeSA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjE3OQogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IGNyZWF0b3IsIEVSUl9ZT1VfQVJFX05PVF9USEVfQ1JFQVRPUikKICAgIHR4biBTZW5kZXIKICAgID09CiAgICBibnogZWRpdERpc2J1cnNlbWVudF9hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgNCAvLyAiRVJSOllOQ1IiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6WU5DUgoKZWRpdERpc2J1cnNlbWVudF9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTgwCiAgICAvLyBsb2dnZWRBc3NlcnQoZmluYWxpemVkID09PSBmYWxzZSwgRVJSX0RJU0JVUlNFTUVOVF9BTFJFQURZX0ZJTkFMKQogICAgZGlnIDYKICAgIGJ6IGVkaXREaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDcKICAgIGJ5dGVjIDggLy8gIkVSUjpEQkFGIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkRCQUYKCmVkaXREaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjE4MgogICAgLy8gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZS50aXRsZSA9IHRpdGxlCiAgICBkdXBuIDIKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBkdXAKICAgIHB1c2hpbnQgMzMKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGRpZyAyCiAgICBleHRyYWN0MwogICAgZGlnIDkKICAgIGNvbmNhdAogICAgZGlnIDIKICAgIHB1c2hpbnQgOTEKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMwogICAgbGVuCiAgICB1bmNvdmVyIDQKICAgIGRpZyAyCiAgICB1bmNvdmVyIDIKICAgIHN1YnN0cmluZzMKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgY29uY2F0CiAgICBkaWcgMQogICAgdW5jb3ZlciAzCiAgICAtCiAgICB1bmNvdmVyIDIKICAgIGRpZyA4CiAgICArCiAgICBzd2FwCiAgICAtCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgcmVwbGFjZTIgOTEKICAgIGRpZyAxCiAgICBib3hfZGVsCiAgICBwb3AKICAgIGRpZyAxCiAgICBzd2FwCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjE4MwogICAgLy8gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZS50aW1lVG9VbmxvY2sgPSB0aW1lVG9VbmxvY2sKICAgIGR1cAogICAgcHVzaGludCA0MwogICAgZGlnIDYKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjE4NAogICAgLy8gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZS5leHBpcmF0aW9uID0gZXhwaXJhdGlvbgogICAgZHVwCiAgICBwdXNoaW50IDUxCiAgICBkaWcgNQogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTg1CiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlLm5vdGUgPSBub3RlCiAgICBkdXAKICAgIGJveF9nZXQKICAgIHBvcAogICAgZHVwCiAgICBwdXNoaW50IDkxCiAgICBleHRyYWN0X3VpbnQxNgogICAgaW50Y18wIC8vIDAKICAgIHN3YXAKICAgIGV4dHJhY3QzCiAgICBkaWcgMwogICAgY29uY2F0CiAgICBkaWcgMQogICAgYm94X2RlbAogICAgcG9wCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjE2OS0xNzUKICAgIC8vIGVkaXREaXNidXJzZW1lbnQoCiAgICAvLyAgIGlkOiB1aW50NjQsCiAgICAvLyAgIHRpdGxlOiBzdHJpbmcsCiAgICAvLyAgIHRpbWVUb1VubG9jazogdWludDY0LAogICAgLy8gICBleHBpcmF0aW9uOiB1aW50NjQsCiAgICAvLyAgIG5vdGU6IHN0cmluZwogICAgLy8gKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo6UmV3YXJkcy5jcmVhdGVVc2VyQWxsb2NhdGlvbnNbcm91dGluZ10oKSAtPiB2b2lkOgpjcmVhdGVVc2VyQWxsb2NhdGlvbnM6CiAgICBpbnRjXzAgLy8gMAogICAgZHVwbiAzCiAgICBieXRlY18yIC8vICIiCiAgICBkdXBuIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTg4LTE5MgogICAgLy8gY3JlYXRlVXNlckFsbG9jYXRpb25zKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGlkOiB1aW50NjQsCiAgICAvLyAgIGFsbG9jYXRpb25zOiBVc2VyQWxsb2NhdGlvbltdCiAgICAvLyApOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGR1cAogICAgY292ZXIgMwogICAgcHVzaGludCA0MAogICAgKgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIHN3YXAKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL3R5cGVzLnRzOjpVc2VyQWxsb2NhdGlvbj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTkzCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5kaXNidXJzZW1lbnRzKGlkKS5leGlzdHMsIEVSUl9ESVNCVVJTRU1FTlRfRE9FU19OT1RfRVhJU1QpCiAgICBpdG9iCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NjkKICAgIC8vIGRpc2J1cnNlbWVudHMgPSBCb3hNYXA8dWludDY0LCBEaXNidXJzZW1lbnREZXRhaWxzPih7IGtleVByZWZpeDogUmV3YXJkc0JveFByZWZpeERpc2J1cnNlbWVudHMgfSkKICAgIGJ5dGVjXzAgLy8gImQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxOTMKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmRpc2J1cnNlbWVudHMoaWQpLmV4aXN0cywgRVJSX0RJU0JVUlNFTUVOVF9ET0VTX05PVF9FWElTVCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGNyZWF0ZVVzZXJBbGxvY2F0aW9uc19hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWNfMyAvLyAiRVJSOkRCTkUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6REJORQoKY3JlYXRlVXNlckFsbG9jYXRpb25zX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxOTUKICAgIC8vIGNvbnN0IHsgY3JlYXRvciwgZmluYWxpemVkLCB0aXRsZSwgbm90ZSB9ID0gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZQogICAgZHVwbiAyCiAgICBpbnRjXzAgLy8gMAogICAgcHVzaGludCAzMgogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGRpZyAxCiAgICBwdXNoaW50IDMyCiAgICBpbnRjXzEgLy8gMQogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIGJ1cnkgMTEKICAgIGRpZyAxCiAgICBwdXNoaW50IDkzCiAgICBpbnRjXzMgLy8gMgogICAgYm94X2V4dHJhY3QKICAgIGJ0b2kKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMgogICAgcHVzaGludCA5MwogICAgdW5jb3ZlciAyCiAgICBib3hfZXh0cmFjdAogICAgZXh0cmFjdCAyIDAKICAgIGJ1cnkgMTIKICAgIGRpZyAxCiAgICBwdXNoaW50IDkxCiAgICBpbnRjXzMgLy8gMgogICAgYm94X2V4dHJhY3QKICAgIGJ0b2kKICAgIGRpZyAyCiAgICBkaWcgMQogICAgaW50Y18zIC8vIDIKICAgIGJveF9leHRyYWN0CiAgICBidG9pCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgdW5jb3ZlciAzCiAgICBjb3ZlciAyCiAgICBib3hfZXh0cmFjdAogICAgZXh0cmFjdCAyIDAKICAgIGJ1cnkgMTIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTk2CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gY3JlYXRvciwgRVJSX1lPVV9BUkVfTk9UX1RIRV9DUkVBVE9SKQogICAgdHhuIFNlbmRlcgogICAgPT0KICAgIGJueiBjcmVhdGVVc2VyQWxsb2NhdGlvbnNfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjIDQgLy8gIkVSUjpZTkNSIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOllOQ1IKCmNyZWF0ZVVzZXJBbGxvY2F0aW9uc19hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTk3CiAgICAvLyBsb2dnZWRBc3NlcnQoIWZpbmFsaXplZCwgRVJSX0RJU0JVUlNFTUVOVF9BTFJFQURZX0ZJTkFMKQogICAgZGlnIDgKICAgIGJ6IGNyZWF0ZVVzZXJBbGxvY2F0aW9uc19hZnRlcl9hc3NlcnRANwogICAgYnl0ZWMgOCAvLyAiRVJSOkRCQUYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6REJBRgoKY3JlYXRlVXNlckFsbG9jYXRpb25zX2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxOTkKICAgIC8vIGxldCBzdW06IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBidXJ5IDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjAwCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgYWxsb2NhdGlvbnMubGVuZ3RoOyBpICs9IDEpIHsKICAgIGludGNfMCAvLyAwCiAgICBidXJ5IDgKCmNyZWF0ZVVzZXJBbGxvY2F0aW9uc193aGlsZV90b3BAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjAwCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgYWxsb2NhdGlvbnMubGVuZ3RoOyBpICs9IDEpIHsKICAgIGRpZyA3CiAgICBkaWcgMwogICAgPAogICAgYnogY3JlYXRlVXNlckFsbG9jYXRpb25zX2FmdGVyX3doaWxlQDEyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjIwMwogICAgLy8gYWRkcmVzczogYWxsb2NhdGlvbnNbaV0uYWRkcmVzcywKICAgIGRpZyAzCiAgICBleHRyYWN0IDIgMAogICAgZGlnIDgKICAgIHB1c2hpbnQgNDAKICAgICoKICAgIHB1c2hpbnQgNDAKICAgIGV4dHJhY3QzIC8vIG9uIGVycm9yOiBpbmRleCBhY2Nlc3MgaXMgb3V0IG9mIGJvdW5kcwogICAgZHVwCiAgICBidXJ5IDE0CiAgICBleHRyYWN0IDAgMzIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjA0CiAgICAvLyBhc3NldDogMCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjIwMS0yMDUKICAgIC8vIGNvbnN0IHVzZXJBbGxvY2F0aW9uc0tleTogVXNlckFsbG9jYXRpb25zS2V5ID0gewogICAgLy8gICBkaXNidXJzZW1lbnRJRDogaWQsCiAgICAvLyAgIGFkZHJlc3M6IGFsbG9jYXRpb25zW2ldLmFkZHJlc3MsCiAgICAvLyAgIGFzc2V0OiAwLAogICAgLy8gfQogICAgaXRvYgogICAgY29uY2F0CiAgICBkaWcgMgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjc1CiAgICAvLyB1c2VyQWxsb2NhdGlvbnMgPSBCb3hNYXA8VXNlckFsbG9jYXRpb25zS2V5LCB1aW50NjQ+KHsga2V5UHJlZml4OiBSZXdhcmRzQm94UHJlZml4VXNlckFsbG9jYXRpb25zIH0pCiAgICBieXRlYyA1IC8vICJ1IgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGJ1cnkgMTMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjA3CiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMudXNlckFsbG9jYXRpb25zKHVzZXJBbGxvY2F0aW9uc0tleSkuZXhpc3RzLCBFUlJfQUxMT0NBVElPTl9BTFJFQURZX0VYSVNUUykKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogY3JlYXRlVXNlckFsbG9jYXRpb25zX2FmdGVyX2Fzc2VydEAxMQogICAgYnl0ZWMgMTIgLy8gIkVSUjpBTEFFIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkFMQUUKCmNyZWF0ZVVzZXJBbGxvY2F0aW9uc19hZnRlcl9hc3NlcnRAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjIwOQogICAgLy8gdGhpcy51c2VyQWxsb2NhdGlvbnModXNlckFsbG9jYXRpb25zS2V5KS52YWx1ZSA9IGFsbG9jYXRpb25zW2ldLmFtb3VudAogICAgZGlnIDEyCiAgICBwdXNoaW50IDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBpdG9iCiAgICBkaWcgMTMKICAgIHN3YXAKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjEwCiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlLmFsbG9jYXRpb25zICs9IDEKICAgIGRpZyAxCiAgICBkdXAKICAgIHB1c2hpbnQgNTkKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGl0b2IKICAgIGRpZyAxCiAgICBwdXNoaW50IDU5CiAgICB1bmNvdmVyIDIKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjIxMQogICAgLy8gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZS5hbW91bnQgKz0gYWxsb2NhdGlvbnNbaV0uYW1vdW50CiAgICBkdXAKICAgIHB1c2hpbnQgMzUKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgZGlnIDIKICAgICsKICAgIGl0b2IKICAgIHB1c2hpbnQgMzUKICAgIHN3YXAKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjIxMwogICAgLy8gc3VtICs9IGFsbG9jYXRpb25zW2ldLmFtb3VudAogICAgZGlnIDcKICAgICsKICAgIGJ1cnkgNwogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyMDAKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBhbGxvY2F0aW9ucy5sZW5ndGg7IGkgKz0gMSkgewogICAgZGlnIDcKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBidXJ5IDgKICAgIGIgY3JlYXRlVXNlckFsbG9jYXRpb25zX3doaWxlX3RvcEA4CgpjcmVhdGVVc2VyQWxsb2NhdGlvbnNfYWZ0ZXJfd2hpbGVAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjIxNgogICAgLy8gY29uc3QgY29zdHMgPSB0aGlzLm1icih0aXRsZSwgbm90ZSkKICAgIGRpZyA5CiAgICBkaWcgMTEKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL3Jld2FyZHMvYmFzZS50czo6QmFzZVJld2FyZHMubWJyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjIxNwogICAgLy8gY29uc3QgbWJyQW1vdW50OiB1aW50NjQgPSBjb3N0cy51c2VyQWxsb2NhdGlvbnMgKiBhbGxvY2F0aW9ucy5sZW5ndGgKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZGlnIDMKICAgICoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjE4CiAgICAvLyB0aGlzLnVzZU1ickNyZWRpdChpZCwgbWJyQW1vdW50KQogICAgZGlnIDUKICAgIHN3YXAKICAgIGNhbGxzdWIgdXNlTWJyQ3JlZGl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjIyMAogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfSU5WQUxJRF9QQVlNRU5UKQogICAgZGlnIDUKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBjcmVhdGVVc2VyQWxsb2NhdGlvbnNfYWZ0ZXJfYXNzZXJ0QDE0CiAgICBieXRlY18xIC8vICJFUlI6SVBBWSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUEFZCgpjcmVhdGVVc2VyQWxsb2NhdGlvbnNfYWZ0ZXJfYXNzZXJ0QDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyMjEKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LmFtb3VudCA9PT0gc3VtLCBFUlJfSU5WQUxJRF9QQVlNRU5UKQogICAgZGlnIDUKICAgIGd0eG5zIEFtb3VudAogICAgZGlnIDcKICAgID09CiAgICBibnogY3JlYXRlVXNlckFsbG9jYXRpb25zX2FmdGVyX2Fzc2VydEAxNgogICAgYnl0ZWNfMSAvLyAiRVJSOklQQVkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBBWQoKY3JlYXRlVXNlckFsbG9jYXRpb25zX2FmdGVyX2Fzc2VydEAxNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTg4LTE5MgogICAgLy8gY3JlYXRlVXNlckFsbG9jYXRpb25zKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGlkOiB1aW50NjQsCiAgICAvLyAgIGFsbG9jYXRpb25zOiBVc2VyQWxsb2NhdGlvbltdCiAgICAvLyApOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjpSZXdhcmRzLmNyZWF0ZUFzYVVzZXJBbGxvY2F0aW9uc1tyb3V0aW5nXSgpIC0+IHZvaWQ6CmNyZWF0ZUFzYVVzZXJBbGxvY2F0aW9uczoKICAgIGludGNfMCAvLyAwCiAgICBkdXBuIDMKICAgIGJ5dGVjXzIgLy8gIiIKICAgIGR1cG4gMgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyMjQtMjI4CiAgICAvLyBjcmVhdGVBc2FVc2VyQWxsb2NhdGlvbnMoCiAgICAvLyAgIGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICBpZDogdWludDY0LAogICAgLy8gICBhbGxvY2F0aW9uczogVXNlckFsbG9jYXRpb25bXQogICAgLy8gKTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNCAvLyBheGZlcgogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGF4ZmVyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgY292ZXIgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgZHVwCiAgICBjb3ZlciAzCiAgICBwdXNoaW50IDQwCiAgICAqCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8c21hcnRfY29udHJhY3RzL3Jld2FyZHMvdHlwZXMudHM6OlVzZXJBbGxvY2F0aW9uPgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyMjkKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmRpc2J1cnNlbWVudHMoaWQpLmV4aXN0cywgRVJSX0RJU0JVUlNFTUVOVF9ET0VTX05PVF9FWElTVCkKICAgIGl0b2IKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2OQogICAgLy8gZGlzYnVyc2VtZW50cyA9IEJveE1hcDx1aW50NjQsIERpc2J1cnNlbWVudERldGFpbHM+KHsga2V5UHJlZml4OiBSZXdhcmRzQm94UHJlZml4RGlzYnVyc2VtZW50cyB9KQogICAgYnl0ZWNfMCAvLyAiZCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjIyOQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZGlzYnVyc2VtZW50cyhpZCkuZXhpc3RzLCBFUlJfRElTQlVSU0VNRU5UX0RPRVNfTk9UX0VYSVNUKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogY3JlYXRlQXNhVXNlckFsbG9jYXRpb25zX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlY18zIC8vICJFUlI6REJORSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpEQk5FCgpjcmVhdGVBc2FVc2VyQWxsb2NhdGlvbnNfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjIzMQogICAgLy8gY29uc3QgeyBjcmVhdG9yLCBmaW5hbGl6ZWQsIHRpdGxlLCBub3RlIH0gPSB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlCiAgICBkdXBuIDIKICAgIGludGNfMCAvLyAwCiAgICBwdXNoaW50IDMyCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgZGlnIDEKICAgIHB1c2hpbnQgMzIKICAgIGludGNfMSAvLyAxCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgYnVyeSAxMQogICAgZGlnIDEKICAgIHB1c2hpbnQgOTMKICAgIGludGNfMyAvLyAyCiAgICBib3hfZXh0cmFjdAogICAgYnRvaQogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAyCiAgICBwdXNoaW50IDkzCiAgICB1bmNvdmVyIDIKICAgIGJveF9leHRyYWN0CiAgICBleHRyYWN0IDIgMAogICAgYnVyeSAxMgogICAgZGlnIDEKICAgIHB1c2hpbnQgOTEKICAgIGludGNfMyAvLyAyCiAgICBib3hfZXh0cmFjdAogICAgYnRvaQogICAgZGlnIDIKICAgIGRpZyAxCiAgICBpbnRjXzMgLy8gMgogICAgYm94X2V4dHJhY3QKICAgIGJ0b2kKICAgIGludGNfMyAvLyAyCiAgICArCiAgICB1bmNvdmVyIDMKICAgIGNvdmVyIDIKICAgIGJveF9leHRyYWN0CiAgICBleHRyYWN0IDIgMAogICAgYnVyeSAxMgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyMzIKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSBjcmVhdG9yLCBFUlJfWU9VX0FSRV9OT1RfVEhFX0NSRUFUT1IpCiAgICB0eG4gU2VuZGVyCiAgICA9PQogICAgYm56IGNyZWF0ZUFzYVVzZXJBbGxvY2F0aW9uc19hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgNCAvLyAiRVJSOllOQ1IiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6WU5DUgoKY3JlYXRlQXNhVXNlckFsbG9jYXRpb25zX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyMzMKICAgIC8vIGxvZ2dlZEFzc2VydCghZmluYWxpemVkLCBFUlJfRElTQlVSU0VNRU5UX0FMUkVBRFlfRklOQUwpCiAgICBkaWcgOAogICAgYnogY3JlYXRlQXNhVXNlckFsbG9jYXRpb25zX2FmdGVyX2Fzc2VydEA3CiAgICBieXRlYyA4IC8vICJFUlI6REJBRiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpEQkFGCgpjcmVhdGVBc2FVc2VyQWxsb2NhdGlvbnNfYWZ0ZXJfYXNzZXJ0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjIzNQogICAgLy8gbGV0IG1hdGNoU3VtOiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgYnVyeSA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjIzNgogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGFsbG9jYXRpb25zLmxlbmd0aDsgaSArPSAxKSB7CiAgICBpbnRjXzAgLy8gMAogICAgYnVyeSA4CgpjcmVhdGVBc2FVc2VyQWxsb2NhdGlvbnNfd2hpbGVfdG9wQDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjIzNgogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGFsbG9jYXRpb25zLmxlbmd0aDsgaSArPSAxKSB7CiAgICBkaWcgNwogICAgZGlnIDMKICAgIDwKICAgIGJ6IGNyZWF0ZUFzYVVzZXJBbGxvY2F0aW9uc19hZnRlcl93aGlsZUAxMgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyMzkKICAgIC8vIGFkZHJlc3M6IGFsbG9jYXRpb25zW2ldLmFkZHJlc3MsCiAgICBkaWcgMwogICAgZXh0cmFjdCAyIDAKICAgIGRpZyA4CiAgICBwdXNoaW50IDQwCiAgICAqCiAgICBwdXNoaW50IDQwCiAgICBleHRyYWN0MyAvLyBvbiBlcnJvcjogaW5kZXggYWNjZXNzIGlzIG91dCBvZiBib3VuZHMKICAgIGR1cAogICAgYnVyeSAxNAogICAgZXh0cmFjdCAwIDMyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjI0MAogICAgLy8gYXNzZXQ6IGFzc2V0WGZlci54ZmVyQXNzZXQuaWQsCiAgICBkaWcgNgogICAgZ3R4bnMgWGZlckFzc2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjIzNy0yNDEKICAgIC8vIGNvbnN0IHVzZXJBbGxvY2F0aW9uc0tleTogVXNlckFsbG9jYXRpb25zS2V5ID0gewogICAgLy8gICBkaXNidXJzZW1lbnRJRDogaWQsCiAgICAvLyAgIGFkZHJlc3M6IGFsbG9jYXRpb25zW2ldLmFkZHJlc3MsCiAgICAvLyAgIGFzc2V0OiBhc3NldFhmZXIueGZlckFzc2V0LmlkLAogICAgLy8gfQogICAgaXRvYgogICAgY29uY2F0CiAgICBkaWcgMgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjc1CiAgICAvLyB1c2VyQWxsb2NhdGlvbnMgPSBCb3hNYXA8VXNlckFsbG9jYXRpb25zS2V5LCB1aW50NjQ+KHsga2V5UHJlZml4OiBSZXdhcmRzQm94UHJlZml4VXNlckFsbG9jYXRpb25zIH0pCiAgICBieXRlYyA1IC8vICJ1IgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGJ1cnkgMTMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjQyCiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMudXNlckFsbG9jYXRpb25zKHVzZXJBbGxvY2F0aW9uc0tleSkuZXhpc3RzLCBFUlJfQUxMT0NBVElPTl9BTFJFQURZX0VYSVNUUykKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogY3JlYXRlQXNhVXNlckFsbG9jYXRpb25zX2FmdGVyX2Fzc2VydEAxMQogICAgYnl0ZWMgMTIgLy8gIkVSUjpBTEFFIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkFMQUUKCmNyZWF0ZUFzYVVzZXJBbGxvY2F0aW9uc19hZnRlcl9hc3NlcnRAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjI0NAogICAgLy8gdGhpcy51c2VyQWxsb2NhdGlvbnModXNlckFsbG9jYXRpb25zS2V5KS52YWx1ZSA9IGFsbG9jYXRpb25zW2ldLmFtb3VudAogICAgZGlnIDEyCiAgICBwdXNoaW50IDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBpdG9iCiAgICBkaWcgMTMKICAgIHN3YXAKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjQ2CiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlLmFsbG9jYXRpb25zICs9IDEKICAgIGRpZyAxCiAgICBkdXAKICAgIHB1c2hpbnQgNTkKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGl0b2IKICAgIGRpZyAxCiAgICBwdXNoaW50IDU5CiAgICB1bmNvdmVyIDIKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjI0NwogICAgLy8gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZS5hbW91bnQgKz0gYWxsb2NhdGlvbnNbaV0uYW1vdW50CiAgICBkdXAKICAgIHB1c2hpbnQgMzUKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgZGlnIDIKICAgICsKICAgIGl0b2IKICAgIHB1c2hpbnQgMzUKICAgIHN3YXAKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjI0OQogICAgLy8gbWF0Y2hTdW0gKz0gYWxsb2NhdGlvbnNbaV0uYW1vdW50CiAgICBkaWcgNwogICAgKwogICAgYnVyeSA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjIzNgogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGFsbG9jYXRpb25zLmxlbmd0aDsgaSArPSAxKSB7CiAgICBkaWcgNwogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGJ1cnkgOAogICAgYiBjcmVhdGVBc2FVc2VyQWxsb2NhdGlvbnNfd2hpbGVfdG9wQDgKCmNyZWF0ZUFzYVVzZXJBbGxvY2F0aW9uc19hZnRlcl93aGlsZUAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjUyCiAgICAvLyBjb25zdCBjb3N0cyA9IHRoaXMubWJyKHRpdGxlLCBub3RlKQogICAgZGlnIDkKICAgIGRpZyAxMQogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9iYXNlLnRzOjpCYXNlUmV3YXJkcy5tYnIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjUzCiAgICAvLyBjb25zdCBtYnJBbW91bnQ6IHVpbnQ2NCA9IGNvc3RzLnVzZXJBbGxvY2F0aW9ucyAqIGFsbG9jYXRpb25zLmxlbmd0aAogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBkaWcgMwogICAgKgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyNTQKICAgIC8vIHRoaXMudXNlTWJyQ3JlZGl0KGlkLCBtYnJBbW91bnQpCiAgICBkaWcgNQogICAgc3dhcAogICAgY2FsbHN1YiB1c2VNYnJDcmVkaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjU2CiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLmFzc2V0UmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfSU5WQUxJRF9UUkFOU0ZFUikKICAgIGRpZyA1CiAgICBndHhucyBBc3NldFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBjcmVhdGVBc2FVc2VyQWxsb2NhdGlvbnNfYWZ0ZXJfYXNzZXJ0QDE0CiAgICBieXRlYyA3IC8vICJFUlI6SVhGUiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJWEZSCgpjcmVhdGVBc2FVc2VyQWxsb2NhdGlvbnNfYWZ0ZXJfYXNzZXJ0QDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyNTcKICAgIC8vIGxvZ2dlZEFzc2VydChhc3NldFhmZXIuYXNzZXRBbW91bnQgPT09IG1hdGNoU3VtLCBFUlJfSU5WQUxJRF9UUkFOU0ZFUikKICAgIGRpZyA1CiAgICBndHhucyBBc3NldEFtb3VudAogICAgZGlnIDcKICAgID09CiAgICBibnogY3JlYXRlQXNhVXNlckFsbG9jYXRpb25zX2FmdGVyX2Fzc2VydEAxNgogICAgYnl0ZWMgNyAvLyAiRVJSOklYRlIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVhGUgoKY3JlYXRlQXNhVXNlckFsbG9jYXRpb25zX2FmdGVyX2Fzc2VydEAxNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjI0LTIyOAogICAgLy8gY3JlYXRlQXNhVXNlckFsbG9jYXRpb25zKAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgaWQ6IHVpbnQ2NCwKICAgIC8vICAgYWxsb2NhdGlvbnM6IFVzZXJBbGxvY2F0aW9uW10KICAgIC8vICk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6OlJld2FyZHMuY3JlYXRlQXNhRGlzYnVyc2VtZW50RnJvbUdyb3VwW3JvdXRpbmddKCkgLT4gdm9pZDoKY3JlYXRlQXNhRGlzYnVyc2VtZW50RnJvbUdyb3VwOgogICAgaW50Y18wIC8vIDAKICAgIGR1cG4gMwogICAgYnl0ZWNfMiAvLyAiIgogICAgZHVwbiAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjI2MC0yNjgKICAgIC8vIGNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cCgKICAgIC8vICAgbWJyUGF5bWVudEluZGV4OiB1aW50NjQsCiAgICAvLyAgIGFzc2V0VHJhbnNmZXJTdGFydEluZGV4OiB1aW50NjQsCiAgICAvLyAgIHRpdGxlOiBzdHJpbmcsCiAgICAvLyAgIHRpbWVUb1VubG9jazogdWludDY0LAogICAgLy8gICBleHBpcmF0aW9uOiB1aW50NjQsCiAgICAvLyAgIG5vdGU6IHN0cmluZywKICAgIC8vICAgYWxsb2NhdGlvbnM6IFVzZXJBbGxvY2F0aW9uW10KICAgIC8vICk6IHVpbnQ2NCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDUKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDYKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDcKICAgIGR1cAogICAgY292ZXIgNAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgZHVwCiAgICBjb3ZlciA1CiAgICBkdXAKICAgIHB1c2hpbnQgNDAKICAgICoKICAgIGludGNfMyAvLyAyCiAgICArCiAgICB1bmNvdmVyIDIKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL3R5cGVzLnRzOjpVc2VyQWxsb2NhdGlvbj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjY5CiAgICAvLyBjb25zdCBpZCA9IHRoaXMubmV3RGlzYnVyc2VtZW50SUQoKQogICAgY2FsbHN1YiBuZXdEaXNidXJzZW1lbnRJRAogICAgY292ZXIgNAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyNzAKICAgIC8vIGNvbnN0IHBheW1lbnQgPSBndHhuLlBheW1lbnRUeG4obWJyUGF5bWVudEluZGV4KQogICAgZGlnIDMKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjI3MgogICAgLy8gY29uc3QgY29zdHMgPSB0aGlzLm1icih0aXRsZSwgbm90ZSkKICAgIGNvdmVyIDIKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL3Jld2FyZHMvYmFzZS50czo6QmFzZVJld2FyZHMubWJyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjI3MwogICAgLy8gY29uc3QgZGlzYnVyc2VtZW50TWJyQW1vdW50ID0gY29zdHMuZGlzYnVyc2VtZW50cwogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6Mjc0CiAgICAvLyBjb25zdCBhbGxvY2F0aW9uTWJyQW1vdW50OiB1aW50NjQgPSBjb3N0cy51c2VyQWxsb2NhdGlvbnMgKiBhbGxvY2F0aW9ucy5sZW5ndGgKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgKgogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyNzYKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgRVJSX0lOVkFMSURfUEFZTUVOVCkKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBjcmVhdGVBc2FEaXNidXJzZW1lbnRGcm9tR3JvdXBfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjXzEgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCmNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6Mjc3CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPj0gZGlzYnVyc2VtZW50TWJyQW1vdW50ICsgYWxsb2NhdGlvbk1ickFtb3VudCwgRVJSX0lOVkFMSURfUEFZTUVOVCkKICAgIGRpZyAxMAogICAgZ3R4bnMgQW1vdW50CiAgICBkdXAKICAgIGJ1cnkgMTMKICAgIGRpZyAyCiAgICBkaWcgMgogICAgKwogICAgPj0KICAgIGJueiBjcmVhdGVBc2FEaXNidXJzZW1lbnRGcm9tR3JvdXBfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjXzEgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCmNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cF9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjgwCiAgICAvLyBjcmVhdG9yOiBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyODgKICAgIC8vIG1ickNyZWRpdHM6IHBheW1lbnQuYW1vdW50IC0gZGlzYnVyc2VtZW50TWJyQW1vdW50LAogICAgZGlnIDEyCiAgICBkaWcgMwogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyNzktMjkxCiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlID0gewogICAgLy8gICBjcmVhdG9yOiBUeG4uc2VuZGVyLAogICAgLy8gICBmaW5hbGl6ZWQ6IGZhbHNlLAogICAgLy8gICB0aXRsZSwKICAgIC8vICAgYW1vdW50OiAwLAogICAgLy8gICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgIGV4cGlyYXRpb24sCiAgICAvLyAgIGFsbG9jYXRpb25zOiAwLAogICAgLy8gICBkaXN0cmlidXRlZDogMCwKICAgIC8vICAgbWJyQ3JlZGl0czogcGF5bWVudC5hbW91bnQgLSBkaXNidXJzZW1lbnRNYnJBbW91bnQsCiAgICAvLyAgIHVzZWRNYnJDcmVkaXRzOiAwLAogICAgLy8gICBub3RlLAogICAgLy8gfQogICAgZGlnIDEwCiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBieXRlYyAxMyAvLyAweDAwMDA1ZAogICAgY29uY2F0CiAgICBkaWcgMQogICAgbGVuCiAgICBwdXNoaW50IDkzCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjI4MwogICAgLy8gYW1vdW50OiAwLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6Mjc5LTI5MQogICAgLy8gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZSA9IHsKICAgIC8vICAgY3JlYXRvcjogVHhuLnNlbmRlciwKICAgIC8vICAgZmluYWxpemVkOiBmYWxzZSwKICAgIC8vICAgdGl0bGUsCiAgICAvLyAgIGFtb3VudDogMCwKICAgIC8vICAgdGltZVRvVW5sb2NrLAogICAgLy8gICBleHBpcmF0aW9uLAogICAgLy8gICBhbGxvY2F0aW9uczogMCwKICAgIC8vICAgZGlzdHJpYnV0ZWQ6IDAsCiAgICAvLyAgIG1ickNyZWRpdHM6IHBheW1lbnQuYW1vdW50IC0gZGlzYnVyc2VtZW50TWJyQW1vdW50LAogICAgLy8gICB1c2VkTWJyQ3JlZGl0czogMCwKICAgIC8vICAgbm90ZSwKICAgIC8vIH0KICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgZGlnIDEKICAgIGNvbmNhdAogICAgZGlnIDEyCiAgICBpdG9iCiAgICBjb25jYXQKICAgIGRpZyAxMQogICAgaXRvYgogICAgY29uY2F0CiAgICBkaWcgMQogICAgY29uY2F0CiAgICBkaWcgMQogICAgY29uY2F0CiAgICB1bmNvdmVyIDQKICAgIGl0b2IKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICBkaWcgOAogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHVuY292ZXIgMgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjI3OQogICAgLy8gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZSA9IHsKICAgIGRpZyAzCiAgICBpdG9iCiAgICBkdXAKICAgIGJ1cnkgMjAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NjkKICAgIC8vIGRpc2J1cnNlbWVudHMgPSBCb3hNYXA8dWludDY0LCBEaXNidXJzZW1lbnREZXRhaWxzPih7IGtleVByZWZpeDogUmV3YXJkc0JveFByZWZpeERpc2J1cnNlbWVudHMgfSkKICAgIGJ5dGVjXzAgLy8gImQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgYnVyeSAxOQogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyNzktMjkxCiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlID0gewogICAgLy8gICBjcmVhdG9yOiBUeG4uc2VuZGVyLAogICAgLy8gICBmaW5hbGl6ZWQ6IGZhbHNlLAogICAgLy8gICB0aXRsZSwKICAgIC8vICAgYW1vdW50OiAwLAogICAgLy8gICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgIGV4cGlyYXRpb24sCiAgICAvLyAgIGFsbG9jYXRpb25zOiAwLAogICAgLy8gICBkaXN0cmlidXRlZDogMCwKICAgIC8vICAgbWJyQ3JlZGl0czogcGF5bWVudC5hbW91bnQgLSBkaXNidXJzZW1lbnRNYnJBbW91bnQsCiAgICAvLyAgIHVzZWRNYnJDcmVkaXRzOiAwLAogICAgLy8gICBub3RlLAogICAgLy8gfQogICAgZHVwCiAgICBib3hfZGVsCiAgICBwb3AKICAgIHN3YXAKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjkzCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgYWxsb2NhdGlvbnMubGVuZ3RoOyBpICs9IDEpIHsKICAgIGludGNfMCAvLyAwCiAgICBidXJ5IDE0CgpjcmVhdGVBc2FEaXNidXJzZW1lbnRGcm9tR3JvdXBfd2hpbGVfdG9wQDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjI5MwogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGFsbG9jYXRpb25zLmxlbmd0aDsgaSArPSAxKSB7CiAgICBkaWcgMTMKICAgIGRpZyA0CiAgICA8CiAgICBieiBjcmVhdGVBc2FEaXNidXJzZW1lbnRGcm9tR3JvdXBfYWZ0ZXJfd2hpbGVAMTQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6Mjk0CiAgICAvLyBjb25zdCBhc3NldFhmZXIgPSBndHhuLkFzc2V0VHJhbnNmZXJUeG4oYXNzZXRUcmFuc2ZlclN0YXJ0SW5kZXggKyBpKQogICAgZGlnIDkKICAgIGRpZyAxNAogICAgZHVwCiAgICBjb3ZlciAyCiAgICArCiAgICBkdXAKICAgIGJ1cnkgMTcKICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNCAvLyBheGZlcgogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGF4ZmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjI5OAogICAgLy8gYWRkcmVzczogYWxsb2NhdGlvbi5hZGRyZXNzLAogICAgZGlnIDYKICAgIGV4dHJhY3QgMiAwCiAgICB1bmNvdmVyIDIKICAgIHB1c2hpbnQgNDAKICAgICoKICAgIHB1c2hpbnQgNDAKICAgIGV4dHJhY3QzIC8vIG9uIGVycm9yOiBpbmRleCBhY2Nlc3MgaXMgb3V0IG9mIGJvdW5kcwogICAgZHVwCiAgICBidXJ5IDIxCiAgICBleHRyYWN0IDAgMzIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6Mjk5CiAgICAvLyBhc3NldDogYXNzZXRYZmVyLnhmZXJBc3NldC5pZCwKICAgIHN3YXAKICAgIGd0eG5zIFhmZXJBc3NldAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyOTYtMzAwCiAgICAvLyBjb25zdCB1c2VyQWxsb2NhdGlvbnNLZXk6IFVzZXJBbGxvY2F0aW9uc0tleSA9IHsKICAgIC8vICAgZGlzYnVyc2VtZW50SUQ6IGlkLAogICAgLy8gICBhZGRyZXNzOiBhbGxvY2F0aW9uLmFkZHJlc3MsCiAgICAvLyAgIGFzc2V0OiBhc3NldFhmZXIueGZlckFzc2V0LmlkLAogICAgLy8gfQogICAgaXRvYgogICAgY29uY2F0CiAgICBkaWcgMTgKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo3NQogICAgLy8gdXNlckFsbG9jYXRpb25zID0gQm94TWFwPFVzZXJBbGxvY2F0aW9uc0tleSwgdWludDY0Pih7IGtleVByZWZpeDogUmV3YXJkc0JveFByZWZpeFVzZXJBbGxvY2F0aW9ucyB9KQogICAgYnl0ZWMgNSAvLyAidSIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBidXJ5IDE3CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjMwMgogICAgLy8gbG9nZ2VkQXNzZXJ0KCF0aGlzLnVzZXJBbGxvY2F0aW9ucyh1c2VyQWxsb2NhdGlvbnNLZXkpLmV4aXN0cywgRVJSX0FMTE9DQVRJT05fQUxSRUFEWV9FWElTVFMpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cF9hZnRlcl9hc3NlcnRAOQogICAgYnl0ZWMgMTIgLy8gIkVSUjpBTEFFIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkFMQUUKCmNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cF9hZnRlcl9hc3NlcnRAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzAzCiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLmFzc2V0UmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfSU5WQUxJRF9UUkFOU0ZFUikKICAgIGRpZyAxNAogICAgZ3R4bnMgQXNzZXRSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogY3JlYXRlQXNhRGlzYnVyc2VtZW50RnJvbUdyb3VwX2FmdGVyX2Fzc2VydEAxMQogICAgYnl0ZWMgNyAvLyAiRVJSOklYRlIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVhGUgoKY3JlYXRlQXNhRGlzYnVyc2VtZW50RnJvbUdyb3VwX2FmdGVyX2Fzc2VydEAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzA0CiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLmFzc2V0QW1vdW50ID09PSBhbGxvY2F0aW9uLmFtb3VudCwgRVJSX0lOVkFMSURfVFJBTlNGRVIpCiAgICBkaWcgMTQKICAgIGd0eG5zIEFzc2V0QW1vdW50CiAgICBkaWcgMTkKICAgIHB1c2hpbnQgMzIKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGJ1cnkgMTUKICAgID09CiAgICBibnogY3JlYXRlQXNhRGlzYnVyc2VtZW50RnJvbUdyb3VwX2FmdGVyX2Fzc2VydEAxMwogICAgYnl0ZWMgNyAvLyAiRVJSOklYRlIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVhGUgoKY3JlYXRlQXNhRGlzYnVyc2VtZW50RnJvbUdyb3VwX2FmdGVyX2Fzc2VydEAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzA2CiAgICAvLyB0aGlzLnVzZXJBbGxvY2F0aW9ucyh1c2VyQWxsb2NhdGlvbnNLZXkpLnZhbHVlID0gYWxsb2NhdGlvbi5hbW91bnQKICAgIGRpZyAxMgogICAgZHVwCiAgICBpdG9iCiAgICBkaWcgMTcKICAgIHN3YXAKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzA3CiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlLmFsbG9jYXRpb25zICs9IDEKICAgIGRpZyAxNwogICAgZHVwCiAgICBwdXNoaW50IDU5CiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBpdG9iCiAgICBkaWcgMQogICAgcHVzaGludCA1OQogICAgdW5jb3ZlciAyCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozMDgKICAgIC8vIHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUuYW1vdW50ICs9IGFsbG9jYXRpb24uYW1vdW50CiAgICBkdXAKICAgIHB1c2hpbnQgMzUKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgdW5jb3ZlciAyCiAgICArCiAgICBpdG9iCiAgICBwdXNoaW50IDM1CiAgICBzd2FwCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyOTMKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBhbGxvY2F0aW9ucy5sZW5ndGg7IGkgKz0gMSkgewogICAgZGlnIDEzCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgYnVyeSAxNAogICAgYiBjcmVhdGVBc2FEaXNidXJzZW1lbnRGcm9tR3JvdXBfd2hpbGVfdG9wQDYKCmNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cF9hZnRlcl93aGlsZUAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzExCiAgICAvLyB0aGlzLnVzZU1ickNyZWRpdChpZCwgYWxsb2NhdGlvbk1ickFtb3VudCkKICAgIGRpZyAyCiAgICBkaWcgMQogICAgY2FsbHN1YiB1c2VNYnJDcmVkaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzE0CiAgICAvLyB0aW1lVG9VbmxvY2sgPj0gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCB8fCB0aW1lVG9VbmxvY2sgPT09IDAsCiAgICBkaWcgNwogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgPj0KICAgIGJueiBjcmVhdGVBc2FEaXNidXJzZW1lbnRGcm9tR3JvdXBfYm9vbF90cnVlQDE2CiAgICBkaWcgNwogICAgYm56IGNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cF9ib29sX2ZhbHNlQDE3CgpjcmVhdGVBc2FEaXNidXJzZW1lbnRGcm9tR3JvdXBfYm9vbF90cnVlQDE2OgogICAgaW50Y18xIC8vIDEKCmNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cF9ib29sX21lcmdlQDE4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozMTMtMzE2CiAgICAvLyBsb2dnZWRBc3NlcnQoCiAgICAvLyAgIHRpbWVUb1VubG9jayA+PSBHbG9iYWwubGF0ZXN0VGltZXN0YW1wIHx8IHRpbWVUb1VubG9jayA9PT0gMCwKICAgIC8vICAgRVJSX0lOVkFMSURfRElTQlVSU0VNRU5UX1VOTE9DS19USU1FCiAgICAvLyApCiAgICBibnogY3JlYXRlQXNhRGlzYnVyc2VtZW50RnJvbUdyb3VwX2FmdGVyX2Fzc2VydEAyMAogICAgYnl0ZWMgMTQgLy8gIkVSUjpJRFVUIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklEVVQKCmNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cF9hZnRlcl9hc3NlcnRAMjA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjMxOAogICAgLy8gZXhwaXJhdGlvbiA+PSBHbG9iYWwubGF0ZXN0VGltZXN0YW1wICsgNjAgfHwgZXhwaXJhdGlvbiA9PT0gMCwKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIHB1c2hpbnQgNjAKICAgICsKICAgIGRpZyA3CiAgICA8PQogICAgYm56IGNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cF9ib29sX3RydWVAMjIKICAgIGRpZyA2CiAgICBibnogY3JlYXRlQXNhRGlzYnVyc2VtZW50RnJvbUdyb3VwX2Jvb2xfZmFsc2VAMjMKCmNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cF9ib29sX3RydWVAMjI6CiAgICBpbnRjXzEgLy8gMQoKY3JlYXRlQXNhRGlzYnVyc2VtZW50RnJvbUdyb3VwX2Jvb2xfbWVyZ2VAMjQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjMxNy0zMjAKICAgIC8vIGxvZ2dlZEFzc2VydCgKICAgIC8vICAgZXhwaXJhdGlvbiA+PSBHbG9iYWwubGF0ZXN0VGltZXN0YW1wICsgNjAgfHwgZXhwaXJhdGlvbiA9PT0gMCwKICAgIC8vICAgRVJSX0lOVkFMSURfRElTQlVSU0VNRU5UX0VYUElSQVRJT05fVElNRQogICAgLy8gKQogICAgYm56IGNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cF9hZnRlcl9hc3NlcnRAMjYKICAgIGJ5dGVjIDE1IC8vICJFUlI6SURYVCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJRFhUCgpjcmVhdGVBc2FEaXNidXJzZW1lbnRGcm9tR3JvdXBfYWZ0ZXJfYXNzZXJ0QDI2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozMjEKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlLmFtb3VudCA+IDAsIEVSUl9ESVNCVVJTRU1FTlRTX0NBTk5PVF9CRV9FTVBUWSkKICAgIGRpZyAxNgogICAgcHVzaGludCAzNQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBibnogY3JlYXRlQXNhRGlzYnVyc2VtZW50RnJvbUdyb3VwX2FmdGVyX2Fzc2VydEAyOAogICAgYnl0ZWMgMTYgLy8gIkVSUjpEQkVNIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkRCRU0KCmNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cF9hZnRlcl9hc3NlcnRAMjg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjMyMgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUuYWxsb2NhdGlvbnMgPiAwLCBFUlJfRElTQlVSU0VNRU5UU19NVVNUX0hBVkVfQUxMT0NBVElPTlMpCiAgICBkaWcgMTYKICAgIHB1c2hpbnQgNTkKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgYm56IGNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cF9hZnRlcl9hc3NlcnRAMzAKICAgIGJ5dGVjIDE3IC8vICJFUlI6REJNQSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpEQk1BCgpjcmVhdGVBc2FEaXNidXJzZW1lbnRGcm9tR3JvdXBfYWZ0ZXJfYXNzZXJ0QDMwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozMjQKICAgIC8vIHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUuZmluYWxpemVkID0gdHJ1ZQogICAgZGlnIDE2CiAgICBkdXAKICAgIHB1c2hpbnQgMzIKICAgIGludGNfMSAvLyAxCiAgICBib3hfZXh0cmFjdAogICAgaW50Y18wIC8vIDAKICAgIGludGNfMSAvLyAxCiAgICBzZXRiaXQKICAgIHB1c2hpbnQgMzIKICAgIHN3YXAKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjI2MC0yNjgKICAgIC8vIGNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cCgKICAgIC8vICAgbWJyUGF5bWVudEluZGV4OiB1aW50NjQsCiAgICAvLyAgIGFzc2V0VHJhbnNmZXJTdGFydEluZGV4OiB1aW50NjQsCiAgICAvLyAgIHRpdGxlOiBzdHJpbmcsCiAgICAvLyAgIHRpbWVUb1VubG9jazogdWludDY0LAogICAgLy8gICBleHBpcmF0aW9uOiB1aW50NjQsCiAgICAvLyAgIG5vdGU6IHN0cmluZywKICAgIC8vICAgYWxsb2NhdGlvbnM6IFVzZXJBbGxvY2F0aW9uW10KICAgIC8vICk6IHVpbnQ2NCB7CiAgICBieXRlYyA2IC8vIDB4MTUxZjdjNzUKICAgIGRpZyAxOAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cF9ib29sX2ZhbHNlQDIzOgogICAgaW50Y18wIC8vIDAKICAgIGIgY3JlYXRlQXNhRGlzYnVyc2VtZW50RnJvbUdyb3VwX2Jvb2xfbWVyZ2VAMjQKCmNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cF9ib29sX2ZhbHNlQDE3OgogICAgaW50Y18wIC8vIDAKICAgIGIgY3JlYXRlQXNhRGlzYnVyc2VtZW50RnJvbUdyb3VwX2Jvb2xfbWVyZ2VAMTgKCgovLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjpSZXdhcmRzLmZpbmFsaXplRGlzYnVyc2VtZW50W3JvdXRpbmddKCkgLT4gdm9pZDoKZmluYWxpemVEaXNidXJzZW1lbnQ6CiAgICBieXRlY18yIC8vICIiCiAgICBkdXBuIDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzI5CiAgICAvLyBmaW5hbGl6ZURpc2J1cnNlbWVudChpZDogdWludDY0KTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjMzMAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZGlzYnVyc2VtZW50cyhpZCkuZXhpc3RzLCBFUlJfRElTQlVSU0VNRU5UX0RPRVNfTk9UX0VYSVNUKQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2OQogICAgLy8gZGlzYnVyc2VtZW50cyA9IEJveE1hcDx1aW50NjQsIERpc2J1cnNlbWVudERldGFpbHM+KHsga2V5UHJlZml4OiBSZXdhcmRzQm94UHJlZml4RGlzYnVyc2VtZW50cyB9KQogICAgYnl0ZWNfMCAvLyAiZCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjMzMAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZGlzYnVyc2VtZW50cyhpZCkuZXhpc3RzLCBFUlJfRElTQlVSU0VNRU5UX0RPRVNfTk9UX0VYSVNUKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogZmluYWxpemVEaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjXzMgLy8gIkVSUjpEQk5FIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkRCTkUKCmZpbmFsaXplRGlzYnVyc2VtZW50X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozMzIKICAgIC8vIGNvbnN0IHsgY3JlYXRvciwgZmluYWxpemVkLCB0aW1lVG9VbmxvY2ssIGV4cGlyYXRpb24sIGFtb3VudCwgYWxsb2NhdGlvbnMgfSA9IHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUKICAgIGR1cG4gMgogICAgaW50Y18wIC8vIDAKICAgIHB1c2hpbnQgMzIKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBkaWcgMQogICAgcHVzaGludCAzMgogICAgaW50Y18xIC8vIDEKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Yml0CiAgICBidXJ5IDUKICAgIGRpZyAxCiAgICBwdXNoaW50IDQzCiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGJ1cnkgNAogICAgZGlnIDEKICAgIHB1c2hpbnQgNTEKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgYnVyeSA2CiAgICBkaWcgMQogICAgcHVzaGludCAzNQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBidXJ5IDcKICAgIHN3YXAKICAgIHB1c2hpbnQgNTkKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgYnVyeSA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjMzMwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IGNyZWF0b3IsIEVSUl9ZT1VfQVJFX05PVF9USEVfQ1JFQVRPUikKICAgIHR4biBTZW5kZXIKICAgID09CiAgICBibnogZmluYWxpemVEaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjIDQgLy8gIkVSUjpZTkNSIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOllOQ1IKCmZpbmFsaXplRGlzYnVyc2VtZW50X2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozMzQKICAgIC8vIGxvZ2dlZEFzc2VydCghZmluYWxpemVkLCBFUlJfRElTQlVSU0VNRU5UX0FMUkVBRFlfRklOQUwpCiAgICBkaWcgMgogICAgYnogZmluYWxpemVEaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDcKICAgIGJ5dGVjIDggLy8gIkVSUjpEQkFGIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkRCQUYKCmZpbmFsaXplRGlzYnVyc2VtZW50X2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozMzYKICAgIC8vIHRpbWVUb1VubG9jayA+PSBHbG9iYWwubGF0ZXN0VGltZXN0YW1wIHx8IHRpbWVUb1VubG9jayA9PT0gMCwKICAgIGRpZyAxCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICA+PQogICAgYm56IGZpbmFsaXplRGlzYnVyc2VtZW50X2Jvb2xfdHJ1ZUA5CiAgICBkaWcgMQogICAgYm56IGZpbmFsaXplRGlzYnVyc2VtZW50X2Jvb2xfZmFsc2VAMTAKCmZpbmFsaXplRGlzYnVyc2VtZW50X2Jvb2xfdHJ1ZUA5OgogICAgaW50Y18xIC8vIDEKCmZpbmFsaXplRGlzYnVyc2VtZW50X2Jvb2xfbWVyZ2VAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjMzNS0zMzgKICAgIC8vIGxvZ2dlZEFzc2VydCgKICAgIC8vICAgdGltZVRvVW5sb2NrID49IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgfHwgdGltZVRvVW5sb2NrID09PSAwLAogICAgLy8gICBFUlJfSU5WQUxJRF9ESVNCVVJTRU1FTlRfVU5MT0NLX1RJTUUKICAgIC8vICkKICAgIGJueiBmaW5hbGl6ZURpc2J1cnNlbWVudF9hZnRlcl9hc3NlcnRAMTMKICAgIGJ5dGVjIDE0IC8vICJFUlI6SURVVCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJRFVUCgpmaW5hbGl6ZURpc2J1cnNlbWVudF9hZnRlcl9hc3NlcnRAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjM0MAogICAgLy8gZXhwaXJhdGlvbiA+PSBHbG9iYWwubGF0ZXN0VGltZXN0YW1wICsgNjAgfHwgZXhwaXJhdGlvbiA9PT0gMCwKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIHB1c2hpbnQgNjAKICAgICsKICAgIGRpZyA0CiAgICA8PQogICAgYm56IGZpbmFsaXplRGlzYnVyc2VtZW50X2Jvb2xfdHJ1ZUAxNQogICAgZGlnIDMKICAgIGJueiBmaW5hbGl6ZURpc2J1cnNlbWVudF9ib29sX2ZhbHNlQDE2CgpmaW5hbGl6ZURpc2J1cnNlbWVudF9ib29sX3RydWVAMTU6CiAgICBpbnRjXzEgLy8gMQoKZmluYWxpemVEaXNidXJzZW1lbnRfYm9vbF9tZXJnZUAxNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzM5LTM0MgogICAgLy8gbG9nZ2VkQXNzZXJ0KAogICAgLy8gICBleHBpcmF0aW9uID49IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgKyA2MCB8fCBleHBpcmF0aW9uID09PSAwLAogICAgLy8gICBFUlJfSU5WQUxJRF9ESVNCVVJTRU1FTlRfRVhQSVJBVElPTl9USU1FCiAgICAvLyApCiAgICBibnogZmluYWxpemVEaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDE5CiAgICBieXRlYyAxNSAvLyAiRVJSOklEWFQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SURYVAoKZmluYWxpemVEaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDE5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozNDMKICAgIC8vIGxvZ2dlZEFzc2VydChhbW91bnQgPiAwLCBFUlJfRElTQlVSU0VNRU5UU19DQU5OT1RfQkVfRU1QVFkpCiAgICBkaWcgNAogICAgYm56IGZpbmFsaXplRGlzYnVyc2VtZW50X2FmdGVyX2Fzc2VydEAyMQogICAgYnl0ZWMgMTYgLy8gIkVSUjpEQkVNIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkRCRU0KCmZpbmFsaXplRGlzYnVyc2VtZW50X2FmdGVyX2Fzc2VydEAyMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzQ0CiAgICAvLyBsb2dnZWRBc3NlcnQoYWxsb2NhdGlvbnMgPiAwLCBFUlJfRElTQlVSU0VNRU5UU19NVVNUX0hBVkVfQUxMT0NBVElPTlMpCiAgICBkaWcgNQogICAgYm56IGZpbmFsaXplRGlzYnVyc2VtZW50X2FmdGVyX2Fzc2VydEAyMwogICAgYnl0ZWMgMTcgLy8gIkVSUjpEQk1BIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkRCTUEKCmZpbmFsaXplRGlzYnVyc2VtZW50X2FmdGVyX2Fzc2VydEAyMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzQ2CiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlLmZpbmFsaXplZCA9IHRydWUKICAgIGR1cG4gMgogICAgcHVzaGludCAzMgogICAgaW50Y18xIC8vIDEKICAgIGJveF9leHRyYWN0CiAgICBpbnRjXzAgLy8gMAogICAgaW50Y18xIC8vIDEKICAgIHNldGJpdAogICAgcHVzaGludCAzMgogICAgc3dhcAogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzI5CiAgICAvLyBmaW5hbGl6ZURpc2J1cnNlbWVudChpZDogdWludDY0KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpmaW5hbGl6ZURpc2J1cnNlbWVudF9ib29sX2ZhbHNlQDE2OgogICAgaW50Y18wIC8vIDAKICAgIGIgZmluYWxpemVEaXNidXJzZW1lbnRfYm9vbF9tZXJnZUAxNwoKZmluYWxpemVEaXNidXJzZW1lbnRfYm9vbF9mYWxzZUAxMDoKICAgIGludGNfMCAvLyAwCiAgICBiIGZpbmFsaXplRGlzYnVyc2VtZW50X2Jvb2xfbWVyZ2VAMTEKCgovLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjpSZXdhcmRzLmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRbcm91dGluZ10oKSAtPiB2b2lkOgpjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozNDktMzU0CiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICBtYnJQYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIHRpbWVUb1VubG9jazogdWludDY0LAogICAgLy8gICBleHBpcmF0aW9uOiB1aW50NjQsCiAgICAvLyAgIGFsbG9jYXRpb25zOiBVc2VyQWxsb2NhdGlvbltdCiAgICAvLyApOiB1aW50NjQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXBuIDIKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGR1cAogICAgcHVzaGludCA0MAogICAgKgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIHVuY292ZXIgMgogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8c21hcnRfY29udHJhY3RzL3Jld2FyZHMvdHlwZXMudHM6OlVzZXJBbGxvY2F0aW9uPgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozNTUKICAgIC8vIGNvbnN0IGlkID0gdGhpcy5uZXdEaXNidXJzZW1lbnRJRCgpCiAgICBjYWxsc3ViIG5ld0Rpc2J1cnNlbWVudElECiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjM1NwogICAgLy8gY29uc3QgYWxsb2NhdGlvbnNNYnI6IHVpbnQ2NCA9IFVzZXJBbGxvY2F0aW9uTUJSICogYWxsb2NhdGlvbnMubGVuZ3RoCiAgICBpbnRjIDQgLy8gMjUzMDAKICAgICoKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozNTgKICAgIC8vIGNvbnN0IG1ickFtb3VudDogdWludDY0ID0gTWluRGlzYnVyc2VtZW50c01CUiArIGFsbG9jYXRpb25zTWJyCiAgICBpbnRjIDUgLy8gNDE3MDAKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzYwCiAgICAvLyBsZXQgc3VtOiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozNjEKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBhbGxvY2F0aW9ucy5sZW5ndGg7IGkgKz0gMSkgewogICAgZHVwCgpjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X3doaWxlX3RvcEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozNjEKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBhbGxvY2F0aW9ucy5sZW5ndGg7IGkgKz0gMSkgewogICAgZHVwCiAgICBkaWcgNgogICAgPAogICAgYnogY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9hZnRlcl93aGlsZUA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjM2NAogICAgLy8gYWRkcmVzczogYWxsb2NhdGlvbnNbaV0uYWRkcmVzcywKICAgIGRpZyA2CiAgICBleHRyYWN0IDIgMAogICAgZGlnIDEKICAgIGR1cAogICAgY292ZXIgMgogICAgcHVzaGludCA0MAogICAgKgogICAgcHVzaGludCA0MAogICAgZXh0cmFjdDMgLy8gb24gZXJyb3I6IGluZGV4IGFjY2VzcyBpcyBvdXQgb2YgYm91bmRzCiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozNjUKICAgIC8vIGFzc2V0OiAwLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzYyLTM2NgogICAgLy8gY29uc3QgdXNlckFsbG9jYXRpb25zS2V5OiBVc2VyQWxsb2NhdGlvbnNLZXkgPSB7CiAgICAvLyAgIGRpc2J1cnNlbWVudElEOiBpZCwKICAgIC8vICAgYWRkcmVzczogYWxsb2NhdGlvbnNbaV0uYWRkcmVzcywKICAgIC8vICAgYXNzZXQ6IDAsCiAgICAvLyB9CiAgICBpdG9iCiAgICBjb25jYXQKICAgIGRpZyA3CiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzY4CiAgICAvLyB0aGlzLnVzZXJBbGxvY2F0aW9ucyh1c2VyQWxsb2NhdGlvbnNLZXkpLnZhbHVlID0gYWxsb2NhdGlvbnNbaV0uYW1vdW50CiAgICBzd2FwCiAgICBwdXNoaW50IDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo3NQogICAgLy8gdXNlckFsbG9jYXRpb25zID0gQm94TWFwPFVzZXJBbGxvY2F0aW9uc0tleSwgdWludDY0Pih7IGtleVByZWZpeDogUmV3YXJkc0JveFByZWZpeFVzZXJBbGxvY2F0aW9ucyB9KQogICAgYnl0ZWMgNSAvLyAidSIKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjM2OAogICAgLy8gdGhpcy51c2VyQWxsb2NhdGlvbnModXNlckFsbG9jYXRpb25zS2V5KS52YWx1ZSA9IGFsbG9jYXRpb25zW2ldLmFtb3VudAogICAgZGlnIDEKICAgIGl0b2IKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzY5CiAgICAvLyBzdW0gKz0gYWxsb2NhdGlvbnNbaV0uYW1vdW50CiAgICBkaWcgMwogICAgKwogICAgYnVyeSAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjM2MQogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGFsbG9jYXRpb25zLmxlbmd0aDsgaSArPSAxKSB7CiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgYnVyeSAxCiAgICBiIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfd2hpbGVfdG9wQDIKCmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYWZ0ZXJfd2hpbGVANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzcyCiAgICAvLyBsb2dnZWRBc3NlcnQobWJyUGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIEVSUl9JTlZBTElEX1BBWU1FTlQpCiAgICBkaWcgOQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDYKICAgIGJ5dGVjXzEgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjM3MwogICAgLy8gbG9nZ2VkQXNzZXJ0KG1iclBheW1lbnQuYW1vdW50ID09PSBtYnJBbW91bnQgKyBzdW0sIEVSUl9JTlZBTElEX1BBWU1FTlQpCiAgICBkaWcgOQogICAgZ3R4bnMgQW1vdW50CiAgICBkaWcgMwogICAgZGlnIDMKICAgICsKICAgID09CiAgICBibnogY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9hZnRlcl9hc3NlcnRAOAogICAgYnl0ZWNfMSAvLyAiRVJSOklQQVkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBBWQoKY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9hZnRlcl9hc3NlcnRAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6Mzc2CiAgICAvLyBjcmVhdG9yOiBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozNzUtMzg3CiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlID0gewogICAgLy8gICBjcmVhdG9yOiBUeG4uc2VuZGVyLAogICAgLy8gICBmaW5hbGl6ZWQ6IHRydWUsCiAgICAvLyAgIHRpdGxlOiAnJywKICAgIC8vICAgYW1vdW50OiBzdW0sCiAgICAvLyAgIHRpbWVUb1VubG9jaywKICAgIC8vICAgZXhwaXJhdGlvbiwKICAgIC8vICAgYWxsb2NhdGlvbnM6IGFsbG9jYXRpb25zLmxlbmd0aCwKICAgIC8vICAgZGlzdHJpYnV0ZWQ6IDAsCiAgICAvLyAgIG1ickNyZWRpdHM6IDAsCiAgICAvLyAgIHVzZWRNYnJDcmVkaXRzOiBhbGxvY2F0aW9uc01iciwKICAgIC8vICAgbm90ZTogJycsCiAgICAvLyB9CiAgICBpbnRjXzAgLy8gMAogICAgaXRvYgogICAgc3dhcAogICAgYnl0ZWMgMTggLy8gMHg4MDAwNWQKICAgIGNvbmNhdAogICAgZGlnIDMKICAgIGl0b2IKICAgIGNvbmNhdAogICAgZGlnIDEwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIGRpZyA5CiAgICBpdG9iCiAgICBjb25jYXQKICAgIGRpZyA3CiAgICBpdG9iCiAgICBjb25jYXQKICAgIGRpZyAxCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZGlnIDQKICAgIGl0b2IKICAgIGNvbmNhdAogICAgYnl0ZWMgMTkgLy8gMHgwMDVmMDAwMDAwMDAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozNzUKICAgIC8vIHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUgPSB7CiAgICBkaWcgNQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2OQogICAgLy8gZGlzYnVyc2VtZW50cyA9IEJveE1hcDx1aW50NjQsIERpc2J1cnNlbWVudERldGFpbHM+KHsga2V5UHJlZml4OiBSZXdhcmRzQm94UHJlZml4RGlzYnVyc2VtZW50cyB9KQogICAgYnl0ZWNfMCAvLyAiZCIKICAgIGRpZyAxCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6Mzc1LTM4NwogICAgLy8gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZSA9IHsKICAgIC8vICAgY3JlYXRvcjogVHhuLnNlbmRlciwKICAgIC8vICAgZmluYWxpemVkOiB0cnVlLAogICAgLy8gICB0aXRsZTogJycsCiAgICAvLyAgIGFtb3VudDogc3VtLAogICAgLy8gICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgIGV4cGlyYXRpb24sCiAgICAvLyAgIGFsbG9jYXRpb25zOiBhbGxvY2F0aW9ucy5sZW5ndGgsCiAgICAvLyAgIGRpc3RyaWJ1dGVkOiAwLAogICAgLy8gICBtYnJDcmVkaXRzOiAwLAogICAgLy8gICB1c2VkTWJyQ3JlZGl0czogYWxsb2NhdGlvbnNNYnIsCiAgICAvLyAgIG5vdGU6ICcnLAogICAgLy8gfQogICAgZHVwCiAgICBib3hfZGVsCiAgICBwb3AKICAgIHVuY292ZXIgMgogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozNDktMzU0CiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICBtYnJQYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIHRpbWVUb1VubG9jazogdWludDY0LAogICAgLy8gICBleHBpcmF0aW9uOiB1aW50NjQsCiAgICAvLyAgIGFsbG9jYXRpb25zOiBVc2VyQWxsb2NhdGlvbltdCiAgICAvLyApOiB1aW50NjQgewogICAgYnl0ZWMgNiAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6OlJld2FyZHMuY3JlYXRlSW5zdGFudEFzYURpc2J1cnNlbWVudFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjM5Mi0zOTgKICAgIC8vIGNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnQoCiAgICAvLyAgIG1iclBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIHRpbWVUb1VubG9jazogdWludDY0LAogICAgLy8gICBleHBpcmF0aW9uOiB1aW50NjQsCiAgICAvLyAgIGFsbG9jYXRpb25zOiBVc2VyQWxsb2NhdGlvbltdCiAgICAvLyApOiB1aW50NjQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMyAvLyAyCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNCAvLyBheGZlcgogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGF4ZmVyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXBuIDIKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGR1cAogICAgcHVzaGludCA0MAogICAgKgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIHVuY292ZXIgMgogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8c21hcnRfY29udHJhY3RzL3Jld2FyZHMvdHlwZXMudHM6OlVzZXJBbGxvY2F0aW9uPgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozOTkKICAgIC8vIGNvbnN0IGlkID0gdGhpcy5uZXdEaXNidXJzZW1lbnRJRCgpCiAgICBjYWxsc3ViIG5ld0Rpc2J1cnNlbWVudElECiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQwMQogICAgLy8gY29uc3QgYWxsb2NhdGlvbnNNYnI6IHVpbnQ2NCA9IFVzZXJBbGxvY2F0aW9uTUJSICogYWxsb2NhdGlvbnMubGVuZ3RoCiAgICBpbnRjIDQgLy8gMjUzMDAKICAgICoKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0MDIKICAgIC8vIGNvbnN0IG1ickFtb3VudDogdWludDY0ID0gTWluRGlzYnVyc2VtZW50c01CUiArIGFsbG9jYXRpb25zTWJyCiAgICBpbnRjIDUgLy8gNDE3MDAKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDA0CiAgICAvLyBsZXQgc3VtOiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0MDUKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBhbGxvY2F0aW9ucy5sZW5ndGg7IGkgKz0gMSkgewogICAgZHVwCgpjcmVhdGVJbnN0YW50QXNhRGlzYnVyc2VtZW50X3doaWxlX3RvcEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0MDUKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBhbGxvY2F0aW9ucy5sZW5ndGg7IGkgKz0gMSkgewogICAgZHVwCiAgICBkaWcgNgogICAgPAogICAgYnogY3JlYXRlSW5zdGFudEFzYURpc2J1cnNlbWVudF9hZnRlcl93aGlsZUA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQwOAogICAgLy8gYWRkcmVzczogYWxsb2NhdGlvbnNbaV0uYWRkcmVzcywKICAgIGRpZyA2CiAgICBleHRyYWN0IDIgMAogICAgZGlnIDEKICAgIGR1cAogICAgY292ZXIgMgogICAgcHVzaGludCA0MAogICAgKgogICAgcHVzaGludCA0MAogICAgZXh0cmFjdDMgLy8gb24gZXJyb3I6IGluZGV4IGFjY2VzcyBpcyBvdXQgb2YgYm91bmRzCiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0MDkKICAgIC8vIGFzc2V0OiBhc3NldFhmZXIueGZlckFzc2V0LmlkLAogICAgZGlnIDEyCiAgICBndHhucyBYZmVyQXNzZXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDA2LTQxMAogICAgLy8gY29uc3QgdXNlckFsbG9jYXRpb25zS2V5OiBVc2VyQWxsb2NhdGlvbnNLZXkgPSB7CiAgICAvLyAgIGRpc2J1cnNlbWVudElEOiBpZCwKICAgIC8vICAgYWRkcmVzczogYWxsb2NhdGlvbnNbaV0uYWRkcmVzcywKICAgIC8vICAgYXNzZXQ6IGFzc2V0WGZlci54ZmVyQXNzZXQuaWQsCiAgICAvLyB9CiAgICBpdG9iCiAgICBjb25jYXQKICAgIGRpZyA3CiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDEyCiAgICAvLyB0aGlzLnVzZXJBbGxvY2F0aW9ucyh1c2VyQWxsb2NhdGlvbnNLZXkpLnZhbHVlID0gYWxsb2NhdGlvbnNbaV0uYW1vdW50CiAgICBzd2FwCiAgICBwdXNoaW50IDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo3NQogICAgLy8gdXNlckFsbG9jYXRpb25zID0gQm94TWFwPFVzZXJBbGxvY2F0aW9uc0tleSwgdWludDY0Pih7IGtleVByZWZpeDogUmV3YXJkc0JveFByZWZpeFVzZXJBbGxvY2F0aW9ucyB9KQogICAgYnl0ZWMgNSAvLyAidSIKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQxMgogICAgLy8gdGhpcy51c2VyQWxsb2NhdGlvbnModXNlckFsbG9jYXRpb25zS2V5KS52YWx1ZSA9IGFsbG9jYXRpb25zW2ldLmFtb3VudAogICAgZGlnIDEKICAgIGl0b2IKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDEzCiAgICAvLyBzdW0gKz0gYWxsb2NhdGlvbnNbaV0uYW1vdW50CiAgICBkaWcgMwogICAgKwogICAgYnVyeSAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQwNQogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGFsbG9jYXRpb25zLmxlbmd0aDsgaSArPSAxKSB7CiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgYnVyeSAxCiAgICBiIGNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnRfd2hpbGVfdG9wQDIKCmNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnRfYWZ0ZXJfd2hpbGVANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDE2CiAgICAvLyBsb2dnZWRBc3NlcnQobWJyUGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIEVSUl9JTlZBTElEX1BBWU1FTlQpCiAgICBkaWcgMTAKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBjcmVhdGVJbnN0YW50QXNhRGlzYnVyc2VtZW50X2FmdGVyX2Fzc2VydEA2CiAgICBieXRlY18xIC8vICJFUlI6SVBBWSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUEFZCgpjcmVhdGVJbnN0YW50QXNhRGlzYnVyc2VtZW50X2FmdGVyX2Fzc2VydEA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0MTcKICAgIC8vIGxvZ2dlZEFzc2VydChtYnJQYXltZW50LmFtb3VudCA9PT0gbWJyQW1vdW50LCBFUlJfSU5WQUxJRF9QQVlNRU5UKQogICAgZGlnIDEwCiAgICBndHhucyBBbW91bnQKICAgIGRpZyAzCiAgICA9PQogICAgYm56IGNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDgKICAgIGJ5dGVjXzEgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCmNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQxOQogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci5hc3NldFJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgRVJSX0lOVkFMSURfVFJBTlNGRVIpCiAgICBkaWcgOQogICAgZ3R4bnMgQXNzZXRSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogY3JlYXRlSW5zdGFudEFzYURpc2J1cnNlbWVudF9hZnRlcl9hc3NlcnRAMTAKICAgIGJ5dGVjIDcgLy8gIkVSUjpJWEZSIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklYRlIKCmNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0MjAKICAgIC8vIGxvZ2dlZEFzc2VydChhc3NldFhmZXIuYXNzZXRBbW91bnQgPT09IHN1bSwgRVJSX0lOVkFMSURfVFJBTlNGRVIpCiAgICBkaWcgOQogICAgZ3R4bnMgQXNzZXRBbW91bnQKICAgIGRpZyAyCiAgICA9PQogICAgYm56IGNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDEyCiAgICBieXRlYyA3IC8vICJFUlI6SVhGUiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJWEZSCgpjcmVhdGVJbnN0YW50QXNhRGlzYnVyc2VtZW50X2FmdGVyX2Fzc2VydEAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDIzCiAgICAvLyBjcmVhdG9yOiBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0MjItNDM0CiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlID0gewogICAgLy8gICBjcmVhdG9yOiBUeG4uc2VuZGVyLAogICAgLy8gICBmaW5hbGl6ZWQ6IHRydWUsCiAgICAvLyAgIHRpdGxlOiAnJywKICAgIC8vICAgYW1vdW50OiBzdW0sCiAgICAvLyAgIHRpbWVUb1VubG9jaywKICAgIC8vICAgZXhwaXJhdGlvbiwKICAgIC8vICAgYWxsb2NhdGlvbnM6IGFsbG9jYXRpb25zLmxlbmd0aCwKICAgIC8vICAgZGlzdHJpYnV0ZWQ6IDAsCiAgICAvLyAgIG1ickNyZWRpdHM6IDAsCiAgICAvLyAgIHVzZWRNYnJDcmVkaXRzOiBhbGxvY2F0aW9uc01iciwKICAgIC8vICAgbm90ZTogJycsCiAgICAvLyB9CiAgICBpbnRjXzAgLy8gMAogICAgaXRvYgogICAgc3dhcAogICAgYnl0ZWMgMTggLy8gMHg4MDAwNWQKICAgIGNvbmNhdAogICAgZGlnIDMKICAgIGl0b2IKICAgIGNvbmNhdAogICAgZGlnIDEwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIGRpZyA5CiAgICBpdG9iCiAgICBjb25jYXQKICAgIGRpZyA3CiAgICBpdG9iCiAgICBjb25jYXQKICAgIGRpZyAxCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZGlnIDQKICAgIGl0b2IKICAgIGNvbmNhdAogICAgYnl0ZWMgMTkgLy8gMHgwMDVmMDAwMDAwMDAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0MjIKICAgIC8vIHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUgPSB7CiAgICBkaWcgNQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2OQogICAgLy8gZGlzYnVyc2VtZW50cyA9IEJveE1hcDx1aW50NjQsIERpc2J1cnNlbWVudERldGFpbHM+KHsga2V5UHJlZml4OiBSZXdhcmRzQm94UHJlZml4RGlzYnVyc2VtZW50cyB9KQogICAgYnl0ZWNfMCAvLyAiZCIKICAgIGRpZyAxCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDIyLTQzNAogICAgLy8gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZSA9IHsKICAgIC8vICAgY3JlYXRvcjogVHhuLnNlbmRlciwKICAgIC8vICAgZmluYWxpemVkOiB0cnVlLAogICAgLy8gICB0aXRsZTogJycsCiAgICAvLyAgIGFtb3VudDogc3VtLAogICAgLy8gICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgIGV4cGlyYXRpb24sCiAgICAvLyAgIGFsbG9jYXRpb25zOiBhbGxvY2F0aW9ucy5sZW5ndGgsCiAgICAvLyAgIGRpc3RyaWJ1dGVkOiAwLAogICAgLy8gICBtYnJDcmVkaXRzOiAwLAogICAgLy8gICB1c2VkTWJyQ3JlZGl0czogYWxsb2NhdGlvbnNNYnIsCiAgICAvLyAgIG5vdGU6ICcnLAogICAgLy8gfQogICAgZHVwCiAgICBib3hfZGVsCiAgICBwb3AKICAgIHVuY292ZXIgMgogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozOTItMzk4CiAgICAvLyBjcmVhdGVJbnN0YW50QXNhRGlzYnVyc2VtZW50KAogICAgLy8gICBtYnJQYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICB0aW1lVG9VbmxvY2s6IHVpbnQ2NCwKICAgIC8vICAgZXhwaXJhdGlvbjogdWludDY0LAogICAgLy8gICBhbGxvY2F0aW9uczogVXNlckFsbG9jYXRpb25bXQogICAgLy8gKTogdWludDY0IHsKICAgIGJ5dGVjIDYgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjpSZXdhcmRzLmNsYWltUmV3YXJkc1tyb3V0aW5nXSgpIC0+IHZvaWQ6CmNsYWltUmV3YXJkczoKICAgIGludGNfMCAvLyAwCiAgICBkdXBuIDQKICAgIGJ5dGVjXzIgLy8gIiIKICAgIGR1cG4gNAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0MzkKICAgIC8vIGNsYWltUmV3YXJkcyhyZXdhcmRzOiBDbGFpbURldGFpbHNbXSk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwbiAyCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBwdXNoaW50IDE2CiAgICAqCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8c21hcnRfY29udHJhY3RzL3Jld2FyZHMvdHlwZXMudHM6OkNsYWltRGV0YWlscz4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDQwCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgcmV3YXJkcy5sZW5ndGg7IGkgKz0gMSkgewogICAgaW50Y18wIC8vIDAKCmNsYWltUmV3YXJkc193aGlsZV90b3BAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDQwCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgcmV3YXJkcy5sZW5ndGg7IGkgKz0gMSkgewogICAgZHVwCiAgICBkaWcgMgogICAgPAogICAgYnogY2xhaW1SZXdhcmRzX2FmdGVyX3doaWxlQDE5CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ0MQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZGlzYnVyc2VtZW50cyhyZXdhcmRzW2ldLmlkKS5leGlzdHMsIEVSUl9ESVNCVVJTRU1FTlRfRE9FU19OT1RfRVhJU1QpCiAgICBkaWcgMgogICAgZXh0cmFjdCAyIDAKICAgIGRpZyAxCiAgICBwdXNoaW50IDE2CiAgICAqCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0MyAvLyBvbiBlcnJvcjogaW5kZXggYWNjZXNzIGlzIG91dCBvZiBib3VuZHMKICAgIGR1cAogICAgYnVyeSAxNAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGJ1cnkgNQogICAgaXRvYgogICAgZHVwCiAgICBidXJ5IDEzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjY5CiAgICAvLyBkaXNidXJzZW1lbnRzID0gQm94TWFwPHVpbnQ2NCwgRGlzYnVyc2VtZW50RGV0YWlscz4oeyBrZXlQcmVmaXg6IFJld2FyZHNCb3hQcmVmaXhEaXNidXJzZW1lbnRzIH0pCiAgICBieXRlY18wIC8vICJkIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGJ1cnkgMTIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDQxCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5kaXNidXJzZW1lbnRzKHJld2FyZHNbaV0uaWQpLmV4aXN0cywgRVJSX0RJU0JVUlNFTUVOVF9ET0VTX05PVF9FWElTVCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGNsYWltUmV3YXJkc19hZnRlcl9hc3NlcnRANQogICAgYnl0ZWNfMyAvLyAiRVJSOkRCTkUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6REJORQoKY2xhaW1SZXdhcmRzX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0NDMKICAgIC8vIGNvbnN0IHsgdGltZVRvVW5sb2NrLCBleHBpcmF0aW9uLCBhbW91bnQsIGRpc3RyaWJ1dGVkLCBub3RlIH0gPSB0aGlzLmRpc2J1cnNlbWVudHMocmV3YXJkc1tpXS5pZCkudmFsdWUKICAgIGRpZyAxMAogICAgZHVwCiAgICBwdXNoaW50IDQzCiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGRpZyAxCiAgICBwdXNoaW50IDUxCiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGJ1cnkgOAogICAgZGlnIDEKICAgIHB1c2hpbnQgMzUKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgYnVyeSAxMAogICAgZGlnIDEKICAgIHB1c2hpbnQgNjcKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgYnVyeSA5CiAgICBkaWcgMQogICAgcHVzaGludCA5MQogICAgaW50Y18zIC8vIDIKICAgIGJveF9leHRyYWN0CiAgICBidG9pCiAgICBkaWcgMgogICAgZGlnIDEKICAgIGludGNfMyAvLyAyCiAgICBib3hfZXh0cmFjdAogICAgYnRvaQogICAgaW50Y18zIC8vIDIKICAgICsKICAgIHVuY292ZXIgMwogICAgY292ZXIgMgogICAgYm94X2V4dHJhY3QKICAgIGV4dHJhY3QgMiAwCiAgICBidXJ5IDEwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ0NAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRpbWVUb1VubG9jayA8PSBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLCBFUlJfRElTQlVSU0VNRU5UX0xPQ0tFRCkKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIDw9CiAgICBibnogY2xhaW1SZXdhcmRzX2FmdGVyX2Fzc2VydEA3CiAgICBieXRlYyAyMCAvLyAiRVJSOkRCTEsiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6REJMSwoKY2xhaW1SZXdhcmRzX2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0NDUKICAgIC8vIGxvZ2dlZEFzc2VydChleHBpcmF0aW9uID49IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsIEVSUl9ESVNCVVJTRU1FTlRfTE9DS0VEKQogICAgZGlnIDUKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgID49CiAgICBibnogY2xhaW1SZXdhcmRzX2FmdGVyX2Fzc2VydEA5CiAgICBieXRlYyAyMCAvLyAiRVJSOkRCTEsiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6REJMSwoKY2xhaW1SZXdhcmRzX2FmdGVyX2Fzc2VydEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0NDYKICAgIC8vIGxvZ2dlZEFzc2VydChhbW91bnQgPiBkaXN0cmlidXRlZCwgRVJSX0RJU0JVUlNFTUVOVF9GVUxMWV9ESVNUUklCVVRFRCkKICAgIGRpZyA3CiAgICBkaWcgNwogICAgPgogICAgYm56IGNsYWltUmV3YXJkc19hZnRlcl9hc3NlcnRAMTEKICAgIHB1c2hieXRlcyAiRVJSOkRCRkQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6REJGRAoKY2xhaW1SZXdhcmRzX2FmdGVyX2Fzc2VydEAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDUwCiAgICAvLyBhZGRyZXNzOiBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0NTEKICAgIC8vIGFzc2V0OiByZXdhcmRzW2ldLmFzc2V0LAogICAgZGlnIDEzCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgYnVyeSA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ0OC00NTIKICAgIC8vIGNvbnN0IHVzZXJBbGxvY2F0aW9uc0tleTogVXNlckFsbG9jYXRpb25zS2V5ID0gewogICAgLy8gICBkaXNidXJzZW1lbnRJRDogcmV3YXJkc1tpXS5pZCwKICAgIC8vICAgYWRkcmVzczogVHhuLnNlbmRlciwKICAgIC8vICAgYXNzZXQ6IHJld2FyZHNbaV0uYXNzZXQsCiAgICAvLyB9CiAgICBpdG9iCiAgICBjb25jYXQKICAgIGRpZyAxMgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjc1CiAgICAvLyB1c2VyQWxsb2NhdGlvbnMgPSBCb3hNYXA8VXNlckFsbG9jYXRpb25zS2V5LCB1aW50NjQ+KHsga2V5UHJlZml4OiBSZXdhcmRzQm94UHJlZml4VXNlckFsbG9jYXRpb25zIH0pCiAgICBieXRlYyA1IC8vICJ1IgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGJ1cnkgMTEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDUzCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy51c2VyQWxsb2NhdGlvbnModXNlckFsbG9jYXRpb25zS2V5KS5leGlzdHMsIEVSUl9BTExPQ0FUSU9OX0RPRVNfTk9UX0VYSVNUKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogY2xhaW1SZXdhcmRzX2FmdGVyX2Fzc2VydEAxMwogICAgYnl0ZWMgMjEgLy8gIkVSUjpBTE5FIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkFMTkUKCmNsYWltUmV3YXJkc19hZnRlcl9hc3NlcnRAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ1NAogICAgLy8gY29uc3QgdXNlckFsbG9jYXRpb24gPSB0aGlzLnVzZXJBbGxvY2F0aW9ucyh1c2VyQWxsb2NhdGlvbnNLZXkpLnZhbHVlCiAgICBkaWcgOQogICAgZHVwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgYnRvaQogICAgZHVwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ1NgogICAgLy8gdGhpcy5kaXNidXJzZW1lbnRzKHJld2FyZHNbaV0uaWQpLnZhbHVlLmFsbG9jYXRpb25zIC09IDEKICAgIGRpZyAxMwogICAgZHVwCiAgICBwdXNoaW50IDU5CiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBpdG9iCiAgICBkaWcgMQogICAgcHVzaGludCA1OQogICAgdW5jb3ZlciAyCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0NTcKICAgIC8vIHRoaXMuZGlzYnVyc2VtZW50cyhyZXdhcmRzW2ldLmlkKS52YWx1ZS5kaXN0cmlidXRlZCArPSB1c2VyQWxsb2NhdGlvbgogICAgZHVwCiAgICBwdXNoaW50IDY3CiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIHVuY292ZXIgMgogICAgKwogICAgaXRvYgogICAgcHVzaGludCA2NwogICAgc3dhcAogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDU4CiAgICAvLyB0aGlzLnVzZXJBbGxvY2F0aW9ucyh1c2VyQWxsb2NhdGlvbnNLZXkpLmRlbGV0ZSgpCiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDU5CiAgICAvLyB0aGlzLnJlZnVuZEFsbG9jYXRpb25NYnIocmV3YXJkc1tpXS5pZCkKICAgIGRpZyA0CiAgICBjYWxsc3ViIHJlZnVuZEFsbG9jYXRpb25NYnIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDYzCiAgICAvLyBpZiAoIWlzQWxnbykgewogICAgZGlnIDUKICAgIGJ6IGNsYWltUmV3YXJkc19lbHNlX2JvZHlAMTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDY1CiAgICAvLyBhc3NldFJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0NzEKICAgIC8vIGFzc2V0WGZlci5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgZGlnIDEwCiAgICBpdHhuX2ZpZWxkIE5vdGUKICAgIGRpZyA2CiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ2NC00NjkKICAgIC8vIGNvbnN0IGFzc2V0WGZlciA9IGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgIGFzc2V0UmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgIGFzc2V0QW1vdW50OiB1c2VyQWxsb2NhdGlvbiwKICAgIC8vICAgeGZlckFzc2V0OiByZXdhcmRzW2ldLmFzc2V0LAogICAgLy8gICBub3RlLAogICAgLy8gfSkKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ3MQogICAgLy8gYXNzZXRYZmVyLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAoKY2xhaW1SZXdhcmRzX2FmdGVyX2lmX2Vsc2VAMTg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ0MAogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IHJld2FyZHMubGVuZ3RoOyBpICs9IDEpIHsKICAgIGR1cAogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGJ1cnkgMQogICAgYiBjbGFpbVJld2FyZHNfd2hpbGVfdG9wQDIKCmNsYWltUmV3YXJkc19lbHNlX2JvZHlAMTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ3NAogICAgLy8gcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ3OQogICAgLy8gcGF5bWVudC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgZGlnIDEwCiAgICBpdHhuX2ZpZWxkIE5vdGUKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ3My00NzcKICAgIC8vIGNvbnN0IHBheW1lbnQgPSBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgYW1vdW50OiB1c2VyQWxsb2NhdGlvbiwKICAgIC8vICAgbm90ZSwKICAgIC8vIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ3OQogICAgLy8gcGF5bWVudC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIGIgY2xhaW1SZXdhcmRzX2FmdGVyX2lmX2Vsc2VAMTgKCmNsYWltUmV3YXJkc19hZnRlcl93aGlsZUAxOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDM5CiAgICAvLyBjbGFpbVJld2FyZHMocmV3YXJkczogQ2xhaW1EZXRhaWxzW10pOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjpSZXdhcmRzLnJlY2xhaW1SZXdhcmRzW3JvdXRpbmddKCkgLT4gdm9pZDoKcmVjbGFpbVJld2FyZHM6CiAgICBpbnRjXzAgLy8gMAogICAgZHVwCiAgICBieXRlY18yIC8vICIiCiAgICBkdXBuIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDg0CiAgICAvLyByZWNsYWltUmV3YXJkcyhpZDogdWludDY0LCByZWNsYWltczogQWxsb2NhdGlvblJlY2xhaW1EZXRhaWxzW10pOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIHB1c2hpbnQgNDAKICAgICoKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxzbWFydF9jb250cmFjdHMvcmV3YXJkcy90eXBlcy50czo6QWxsb2NhdGlvblJlY2xhaW1EZXRhaWxzPgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0ODUKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmRpc2J1cnNlbWVudHMoaWQpLmV4aXN0cywgRVJSX0RJU0JVUlNFTUVOVF9ET0VTX05PVF9FWElTVCkKICAgIGl0b2IKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2OQogICAgLy8gZGlzYnVyc2VtZW50cyA9IEJveE1hcDx1aW50NjQsIERpc2J1cnNlbWVudERldGFpbHM+KHsga2V5UHJlZml4OiBSZXdhcmRzQm94UHJlZml4RGlzYnVyc2VtZW50cyB9KQogICAgYnl0ZWNfMCAvLyAiZCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ4NQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZGlzYnVyc2VtZW50cyhpZCkuZXhpc3RzLCBFUlJfRElTQlVSU0VNRU5UX0RPRVNfTk9UX0VYSVNUKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogcmVjbGFpbVJld2FyZHNfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjXzMgLy8gIkVSUjpEQk5FIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkRCTkUKCnJlY2xhaW1SZXdhcmRzX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0ODYKICAgIC8vIGNvbnN0IHsgY3JlYXRvciwgZmluYWxpemVkLCBleHBpcmF0aW9uIH0gPSB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlCiAgICBkdXBuIDIKICAgIGludGNfMCAvLyAwCiAgICBwdXNoaW50IDMyCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgZHVwCiAgICBjb3ZlciAyCiAgICBidXJ5IDEzCiAgICBkdXAKICAgIHB1c2hpbnQgMzIKICAgIGludGNfMSAvLyAxCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgYnVyeSAxMAogICAgcHVzaGludCA1MQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBidXJ5IDEwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ4OAogICAgLy8gbG9nZ2VkQXNzZXJ0KGNyZWF0b3IgPT09IFR4bi5zZW5kZXIsIEVSUl9ZT1VfQVJFX05PVF9USEVfQ1JFQVRPUikKICAgIHR4biBTZW5kZXIKICAgID09CiAgICBibnogcmVjbGFpbVJld2FyZHNfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjIDQgLy8gIkVSUjpZTkNSIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOllOQ1IKCnJlY2xhaW1SZXdhcmRzX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0ODkKICAgIC8vIGxvZ2dlZEFzc2VydChmaW5hbGl6ZWQsIEVSUl9ESVNCVVJTRU1FTlRfQUxSRUFEWV9GSU5BTCkKICAgIGRpZyA3CiAgICBibnogcmVjbGFpbVJld2FyZHNfYWZ0ZXJfYXNzZXJ0QDcKICAgIGJ5dGVjIDggLy8gIkVSUjpEQkFGIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkRCQUYKCnJlY2xhaW1SZXdhcmRzX2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0OTAKICAgIC8vIGxvZ2dlZEFzc2VydChleHBpcmF0aW9uIDw9IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsIEVSUl9ESVNCVVJTRU1FTlRfTk9UX0VYUElSRUQpCiAgICBkaWcgOAogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgPD0KICAgIGJueiByZWNsYWltUmV3YXJkc19hZnRlcl9hc3NlcnRAOQogICAgcHVzaGJ5dGVzICJFUlI6REJOWCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpEQk5YCgpyZWNsYWltUmV3YXJkc19hZnRlcl9hc3NlcnRAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDkyCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgcmVjbGFpbXMubGVuZ3RoOyBpICs9IDEpIHsKICAgIGludGNfMCAvLyAwCiAgICBidXJ5IDcKCnJlY2xhaW1SZXdhcmRzX3doaWxlX3RvcEAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDkyCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgcmVjbGFpbXMubGVuZ3RoOyBpICs9IDEpIHsKICAgIGRpZyA2CiAgICBkaWcgMwogICAgPAogICAgYnogcmVjbGFpbVJld2FyZHNfYWZ0ZXJfd2hpbGVAMTkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDk1CiAgICAvLyBhZGRyZXNzOiByZWNsYWltc1tpXS5hZGRyZXNzLAogICAgZGlnIDMKICAgIGV4dHJhY3QgMiAwCiAgICBkaWcgNwogICAgcHVzaGludCA0MAogICAgKgogICAgcHVzaGludCA0MAogICAgZXh0cmFjdDMgLy8gb24gZXJyb3I6IGluZGV4IGFjY2VzcyBpcyBvdXQgb2YgYm91bmRzCiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0OTYKICAgIC8vIGFzc2V0OiByZWNsYWltc1tpXS5hc3NldCwKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDk1LTQ5NgogICAgLy8gYWRkcmVzczogcmVjbGFpbXNbaV0uYWRkcmVzcywKICAgIC8vIGFzc2V0OiByZWNsYWltc1tpXS5hc3NldCwKICAgIHB1c2hpbnQgMzIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDk2CiAgICAvLyBhc3NldDogcmVjbGFpbXNbaV0uYXNzZXQsCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBidXJ5IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDkzLTQ5NwogICAgLy8gY29uc3QgdXNlckFsbG9jYXRpb25zS2V5OiBVc2VyQWxsb2NhdGlvbnNLZXkgPSB7CiAgICAvLyAgIGRpc2J1cnNlbWVudElEOiBpZCwKICAgIC8vICAgYWRkcmVzczogcmVjbGFpbXNbaV0uYWRkcmVzcywKICAgIC8vICAgYXNzZXQ6IHJlY2xhaW1zW2ldLmFzc2V0LAogICAgLy8gfQogICAgaXRvYgogICAgY29uY2F0CiAgICBkaWcgMgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjc1CiAgICAvLyB1c2VyQWxsb2NhdGlvbnMgPSBCb3hNYXA8VXNlckFsbG9jYXRpb25zS2V5LCB1aW50NjQ+KHsga2V5UHJlZml4OiBSZXdhcmRzQm94UHJlZml4VXNlckFsbG9jYXRpb25zIH0pCiAgICBieXRlYyA1IC8vICJ1IgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGJ1cnkgMTEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDk4CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy51c2VyQWxsb2NhdGlvbnModXNlckFsbG9jYXRpb25zS2V5KS5leGlzdHMsIEVSUl9BTExPQ0FUSU9OX0RPRVNfTk9UX0VYSVNUKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogcmVjbGFpbVJld2FyZHNfYWZ0ZXJfYXNzZXJ0QDEzCiAgICBieXRlYyAyMSAvLyAiRVJSOkFMTkUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6QUxORQoKcmVjbGFpbVJld2FyZHNfYWZ0ZXJfYXNzZXJ0QDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1MDAKICAgIC8vIGNvbnN0IHVzZXJBbGxvY2F0aW9uID0gdGhpcy51c2VyQWxsb2NhdGlvbnModXNlckFsbG9jYXRpb25zS2V5KS52YWx1ZQogICAgZGlnIDkKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGJ0b2kKICAgIGR1cAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1MDIKICAgIC8vIHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUuYWxsb2NhdGlvbnMgLT0gMQogICAgZGlnIDMKICAgIGR1cAogICAgcHVzaGludCA1OQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgaXRvYgogICAgZGlnIDEKICAgIHB1c2hpbnQgNTkKICAgIHVuY292ZXIgMgogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTAzCiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlLmFtb3VudCAtPSB1c2VyQWxsb2NhdGlvbgogICAgZHVwCiAgICBwdXNoaW50IDM1CiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIHVuY292ZXIgMgogICAgLQogICAgaXRvYgogICAgcHVzaGludCAzNQogICAgc3dhcAogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTA0CiAgICAvLyB0aGlzLnVzZXJBbGxvY2F0aW9ucyh1c2VyQWxsb2NhdGlvbnNLZXkpLmRlbGV0ZSgpCiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTA1CiAgICAvLyB0aGlzLnJlZnVuZEFsbG9jYXRpb25NYnIoaWQpCiAgICBkaWcgNQogICAgY2FsbHN1YiByZWZ1bmRBbGxvY2F0aW9uTWJyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjUwOQogICAgLy8gaWYgKCFpc0FsZ28pIHsKICAgIGRpZyA2CiAgICBieiByZWNsYWltUmV3YXJkc19lbHNlX2JvZHlAMTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTE2CiAgICAvLyB4ZmVyLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICBkaWcgNgogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGRpZyAxMAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjUxMC01MTQKICAgIC8vIGNvbnN0IHhmZXIgPSBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICBhc3NldFJlY2VpdmVyOiBjcmVhdG9yLAogICAgLy8gICBhc3NldEFtb3VudDogdXNlckFsbG9jYXRpb24sCiAgICAvLyAgIHhmZXJBc3NldDogcmVjbGFpbXNbaV0uYXNzZXQsCiAgICAvLyB9KQogICAgcHVzaGludCA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTE2CiAgICAvLyB4ZmVyLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAoKcmVjbGFpbVJld2FyZHNfYWZ0ZXJfaWZfZWxzZUAxODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDkyCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgcmVjbGFpbXMubGVuZ3RoOyBpICs9IDEpIHsKICAgIGRpZyA2CiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgYnVyeSA3CiAgICBiIHJlY2xhaW1SZXdhcmRzX3doaWxlX3RvcEAxMAoKcmVjbGFpbVJld2FyZHNfZWxzZV9ib2R5QDE2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1MTgtNTIzCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogY3JlYXRvciwKICAgIC8vICAgICBhbW91bnQ6IHVzZXJBbGxvY2F0aW9uLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBkaWcgMTAKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTE4LTUyMgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IGNyZWF0b3IsCiAgICAvLyAgICAgYW1vdW50OiB1c2VyQWxsb2NhdGlvbiwKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTE4LTUyMwogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IGNyZWF0b3IsCiAgICAvLyAgICAgYW1vdW50OiB1c2VyQWxsb2NhdGlvbiwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgYiByZWNsYWltUmV3YXJkc19hZnRlcl9pZl9lbHNlQDE4CgpyZWNsYWltUmV3YXJkc19hZnRlcl93aGlsZUAxOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDg0CiAgICAvLyByZWNsYWltUmV3YXJkcyhpZDogdWludDY0LCByZWNsYWltczogQWxsb2NhdGlvblJlY2xhaW1EZXRhaWxzW10pOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjpSZXdhcmRzLmFsbG9jYXRpb25NYnJDcmVkaXRTaG9ydGZhbGxbcm91dGluZ10oKSAtPiB2b2lkOgphbGxvY2F0aW9uTWJyQ3JlZGl0U2hvcnRmYWxsOgogICAgYnl0ZWNfMiAvLyAiIgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjUzMAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjUzMgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZGlzYnVyc2VtZW50cyhpZCkuZXhpc3RzLCBFUlJfRElTQlVSU0VNRU5UX0RPRVNfTk9UX0VYSVNUKQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2OQogICAgLy8gZGlzYnVyc2VtZW50cyA9IEJveE1hcDx1aW50NjQsIERpc2J1cnNlbWVudERldGFpbHM+KHsga2V5UHJlZml4OiBSZXdhcmRzQm94UHJlZml4RGlzYnVyc2VtZW50cyB9KQogICAgYnl0ZWNfMCAvLyAiZCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjUzMgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZGlzYnVyc2VtZW50cyhpZCkuZXhpc3RzLCBFUlJfRElTQlVSU0VNRU5UX0RPRVNfTk9UX0VYSVNUKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogYWxsb2NhdGlvbk1ickNyZWRpdFNob3J0ZmFsbF9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWNfMyAvLyAiRVJSOkRCTkUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6REJORQoKYWxsb2NhdGlvbk1ickNyZWRpdFNob3J0ZmFsbF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTM0CiAgICAvLyBjb25zdCBtYnJBbW91bnQ6IHVpbnQ2NCA9IFVzZXJBbGxvY2F0aW9uTUJSICogYWxsb2NhdGlvbkNvdW50CiAgICBpbnRjIDQgLy8gMjUzMDAKICAgIGRpZyAyCiAgICAqCiAgICBkdXAKICAgIGJ1cnkgNAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1MzUKICAgIC8vIGNvbnN0IGNyZWRpdHM6IHVpbnQ2NCA9IHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUubWJyQ3JlZGl0cwogICAgZGlnIDEKICAgIHB1c2hpbnQgNzUKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgZHVwCiAgICBidXJ5IDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTM2CiAgICAvLyBpZiAoY3JlZGl0cyA+PSBtYnJBbW91bnQpIHsKICAgIDw9CiAgICBieiBhbGxvY2F0aW9uTWJyQ3JlZGl0U2hvcnRmYWxsX2FmdGVyX2lmX2Vsc2VANQogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1MzcKICAgIC8vIHJldHVybiAwCiAgICBpbnRjXzAgLy8gMAoKYWxsb2NhdGlvbk1ickNyZWRpdFNob3J0ZmFsbF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6OlJld2FyZHMuYWxsb2NhdGlvbk1ickNyZWRpdFNob3J0ZmFsbEA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1MzAKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgaXRvYgogICAgYnl0ZWMgNiAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKYWxsb2NhdGlvbk1ickNyZWRpdFNob3J0ZmFsbF9hZnRlcl9pZl9lbHNlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjU0MAogICAgLy8gcmV0dXJuIG1ickFtb3VudCAtIGNyZWRpdHMKICAgIGRpZyAyCiAgICBkaWcgNAogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1MzAKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYiBhbGxvY2F0aW9uTWJyQ3JlZGl0U2hvcnRmYWxsX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo6UmV3YXJkcy5hbGxvY2F0aW9uTWJyQ3JlZGl0U2hvcnRmYWxsQDYKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6QWtpdGFCYXNlQ29udHJhY3QudXBkYXRlQWtpdGFEQU9bcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGVBa2l0YURBTzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM2CiAgICAvLyB1cGRhdGVBa2l0YURBTyhha2l0YURBTzogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM3CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWMgMTEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBwdXNoYnl0ZXMgIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM3CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGJueiB1cGRhdGVBa2l0YURBT19hZnRlcl9hc3NlcnRAMwogICAgcHVzaGJ5dGVzICJFUlI6TkRBTyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOREFPCgp1cGRhdGVBa2l0YURBT19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWMgMTEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM4CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlID0gYWtpdGFEQU8KICAgIGRpZyAxCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzYKICAgIC8vIHVwZGF0ZUFraXRhREFPKGFraXRhREFPOiBBcHBsaWNhdGlvbik6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2Jhc2UudHM6OkJhc2VSZXdhcmRzLm1icltyb3V0aW5nXSgpIC0+IHZvaWQ6Cm1icjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2Jhc2UudHM6NwogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL3Jld2FyZHMvYmFzZS50czo6QmFzZVJld2FyZHMubWJyCiAgICBieXRlYyA2IC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjpDb250cmFjdFdpdGhPcHRJbi5vcHRJbltyb3V0aW5nXSgpIC0+IHZvaWQ6Cm9wdEluOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjIzCiAgICAvLyBvcHRJbihwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGFzc2V0OiBBc3NldCk6IHZvaWQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXBuIDIKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6MjUKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgRVJSX0lOVkFMSURfUEFZTUVOVF9SRUNFSVZFUikKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBvcHRJbl9hZnRlcl9hc3NlcnRAMwogICAgcHVzaGJ5dGVzICJFUlI6SVBNUiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUE1SCgpvcHRJbl9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czoyNgogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UsIEVSUl9JTlZBTElEX1BBWU1FTlRfQU1PVU5UKQogICAgZGlnIDEKICAgIGd0eG5zIEFtb3VudAogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICA9PQogICAgYm56IG9wdEluX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjpJUE1BIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQTUEKCm9wdEluX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjI4LTM0CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogMCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjMwCiAgICAvLyBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBkaWcgMQogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czozMQogICAgLy8gYXNzZXRBbW91bnQ6IDAsCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6MjgtMzMKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vICAgfSkKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6MjgtMzQKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjIzCiAgICAvLyBvcHRJbihwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGFzc2V0OiBBc3NldCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6OlJld2FyZHMubmV3RGlzYnVyc2VtZW50SUQoKSAtPiB1aW50NjQ6Cm5ld0Rpc2J1cnNlbWVudElEOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo4MAogICAgLy8gY29uc3QgaWQgPSB0aGlzLmRpc2J1cnNlbWVudElELnZhbHVlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1OQogICAgLy8gZGlzYnVyc2VtZW50SUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAxLCBrZXk6IFJld2FyZHNHbG9iYWxTdGF0ZUtleURpc2J1cnNlbWVudElEIH0pCiAgICBieXRlYyAxMCAvLyAiZGlzYnVyc2VtZW50X2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo4MAogICAgLy8gY29uc3QgaWQgPSB0aGlzLmRpc2J1cnNlbWVudElELnZhbHVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo4MQogICAgLy8gdGhpcy5kaXNidXJzZW1lbnRJRC52YWx1ZSArPSAxCiAgICBkdXAKICAgIGludGNfMSAvLyAxCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjU5CiAgICAvLyBkaXNidXJzZW1lbnRJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDEsIGtleTogUmV3YXJkc0dsb2JhbFN0YXRlS2V5RGlzYnVyc2VtZW50SUQgfSkKICAgIGJ5dGVjIDEwIC8vICJkaXNidXJzZW1lbnRfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjgxCiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudElELnZhbHVlICs9IDEKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjgyCiAgICAvLyByZXR1cm4gaWQKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6OlJld2FyZHMudXNlTWJyQ3JlZGl0KGlkOiB1aW50NjQsIGFtb3VudDogdWludDY0KSAtPiB2b2lkOgp1c2VNYnJDcmVkaXQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjg5CiAgICAvLyBwcml2YXRlIHVzZU1ickNyZWRpdChpZDogdWludDY0LCBhbW91bnQ6IHVpbnQ2NCk6IHZvaWQgewogICAgcHJvdG8gMiAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjkwCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZS5tYnJDcmVkaXRzID49IGFtb3VudCwgRVJSX0lOVkFMSURfTUJSX0FNT1VOVCkKICAgIGZyYW1lX2RpZyAtMgogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2OQogICAgLy8gZGlzYnVyc2VtZW50cyA9IEJveE1hcDx1aW50NjQsIERpc2J1cnNlbWVudERldGFpbHM+KHsga2V5UHJlZml4OiBSZXdhcmRzQm94UHJlZml4RGlzYnVyc2VtZW50cyB9KQogICAgYnl0ZWNfMCAvLyAiZCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjkwCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZS5tYnJDcmVkaXRzID49IGFtb3VudCwgRVJSX0lOVkFMSURfTUJSX0FNT1VOVCkKICAgIHB1c2hpbnQgNzUKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgZnJhbWVfZGlnIC0xCiAgICA+PQogICAgYm56IHVzZU1ickNyZWRpdF9hZnRlcl9hc3NlcnRAMgogICAgYnl0ZWMgOSAvLyAiRVJSOklNQlIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SU1CUgoKdXNlTWJyQ3JlZGl0X2FmdGVyX2Fzc2VydEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo5MQogICAgLy8gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZS5tYnJDcmVkaXRzIC09IGFtb3VudAogICAgZnJhbWVfZGlnIDAKICAgIGR1cAogICAgcHVzaGludCA3NQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBmcmFtZV9kaWcgLTEKICAgIC0KICAgIGl0b2IKICAgIGRpZyAxCiAgICBwdXNoaW50IDc1CiAgICB1bmNvdmVyIDIKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjkyCiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlLnVzZWRNYnJDcmVkaXRzICs9IGFtb3VudAogICAgZHVwCiAgICBwdXNoaW50IDgzCiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGZyYW1lX2RpZyAtMQogICAgKwogICAgaXRvYgogICAgcHVzaGludCA4MwogICAgc3dhcAogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6OlJld2FyZHMucmVmdW5kQWxsb2NhdGlvbk1icihpZDogdWludDY0KSAtPiB2b2lkOgpyZWZ1bmRBbGxvY2F0aW9uTWJyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxMDEKICAgIC8vIHByaXZhdGUgcmVmdW5kQWxsb2NhdGlvbk1icihpZDogdWludDY0KTogdm9pZCB7CiAgICBwcm90byAxIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6OTYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlLnVzZWRNYnJDcmVkaXRzID49IGFtb3VudCwgRVJSX0lOVkFMSURfTUJSX0FNT1VOVCkKICAgIGZyYW1lX2RpZyAtMQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2OQogICAgLy8gZGlzYnVyc2VtZW50cyA9IEJveE1hcDx1aW50NjQsIERpc2J1cnNlbWVudERldGFpbHM+KHsga2V5UHJlZml4OiBSZXdhcmRzQm94UHJlZml4RGlzYnVyc2VtZW50cyB9KQogICAgYnl0ZWNfMCAvLyAiZCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjk2CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZS51c2VkTWJyQ3JlZGl0cyA+PSBhbW91bnQsIEVSUl9JTlZBTElEX01CUl9BTU9VTlQpCiAgICBwdXNoaW50IDgzCiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTAyCiAgICAvLyB0aGlzLnJlbGVhc2VNYnJDcmVkaXQoaWQsIFVzZXJBbGxvY2F0aW9uTUJSKQogICAgaW50YyA0IC8vIDI1MzAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjk2CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZS51c2VkTWJyQ3JlZGl0cyA+PSBhbW91bnQsIEVSUl9JTlZBTElEX01CUl9BTU9VTlQpCiAgICA+PQogICAgYm56IHJlZnVuZEFsbG9jYXRpb25NYnJfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDkgLy8gIkVSUjpJTUJSIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklNQlIKCnJlZnVuZEFsbG9jYXRpb25NYnJfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjk3CiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlLnVzZWRNYnJDcmVkaXRzIC09IGFtb3VudAogICAgZnJhbWVfZGlnIDAKICAgIGR1cAogICAgcHVzaGludCA4MwogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjEwMgogICAgLy8gdGhpcy5yZWxlYXNlTWJyQ3JlZGl0KGlkLCBVc2VyQWxsb2NhdGlvbk1CUikKICAgIGludGMgNCAvLyAyNTMwMAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo5NwogICAgLy8gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZS51c2VkTWJyQ3JlZGl0cyAtPSBhbW91bnQKICAgIC0KICAgIGl0b2IKICAgIGRpZyAxCiAgICBwdXNoaW50IDgzCiAgICB1bmNvdmVyIDIKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjk4CiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlLm1ickNyZWRpdHMgKz0gYW1vdW50CiAgICBkdXAKICAgIHB1c2hpbnQgNzUKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxMDIKICAgIC8vIHRoaXMucmVsZWFzZU1ickNyZWRpdChpZCwgVXNlckFsbG9jYXRpb25NQlIpCiAgICBpbnRjIDQgLy8gMjUzMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6OTgKICAgIC8vIHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUubWJyQ3JlZGl0cyArPSBhbW91bnQKICAgICsKICAgIGl0b2IKICAgIHB1c2hpbnQgNzUKICAgIHN3YXAKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9iYXNlLnRzOjpCYXNlUmV3YXJkcy5tYnIodGl0bGU6IGJ5dGVzLCBub3RlOiBieXRlcykgLT4gYnl0ZXM6CnNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2Jhc2UudHM6OkJhc2VSZXdhcmRzLm1icjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2Jhc2UudHM6Ny04CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIC8vIG1icih0aXRsZTogc3RyaW5nLCBub3RlOiBzdHJpbmcpOiBSZXdhcmRzTUJSRGF0YSB7CiAgICBwcm90byAyIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2Jhc2UudHM6MTAKICAgIC8vIGRpc2J1cnNlbWVudHM6IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoQm94Q29zdFBlckJ5dGUgKiAoQnl0ZXModGl0bGUpLmxlbmd0aCArIEJ5dGVzKG5vdGUpLmxlbmd0aCkpLAogICAgZnJhbWVfZGlnIC0yCiAgICBsZW4KICAgIGZyYW1lX2RpZyAtMQogICAgbGVuCiAgICArCiAgICBwdXNoaW50IDQwMAogICAgKgogICAgaW50YyA1IC8vIDQxNzAwCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9iYXNlLnRzOjktMTIKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIGRpc2J1cnNlbWVudHM6IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoQm94Q29zdFBlckJ5dGUgKiAoQnl0ZXModGl0bGUpLmxlbmd0aCArIEJ5dGVzKG5vdGUpLmxlbmd0aCkpLAogICAgLy8gICB1c2VyQWxsb2NhdGlvbnM6IFVzZXJBbGxvY2F0aW9uTUJSCiAgICAvLyB9CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9iYXNlLnRzOjExCiAgICAvLyB1c2VyQWxsb2NhdGlvbnM6IFVzZXJBbGxvY2F0aW9uTUJSCiAgICBpbnRjIDQgLy8gMjUzMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2Jhc2UudHM6OS0xMgogICAgLy8gcmV0dXJuIHsKICAgIC8vICAgZGlzYnVyc2VtZW50czogTWluRGlzYnVyc2VtZW50c01CUiArIChCb3hDb3N0UGVyQnl0ZSAqIChCeXRlcyh0aXRsZSkubGVuZ3RoICsgQnl0ZXMobm90ZSkubGVuZ3RoKSksCiAgICAvLyAgIHVzZXJBbGxvY2F0aW9uczogVXNlckFsbG9jYXRpb25NQlIKICAgIC8vIH0KICAgIGl0b2IKICAgIGNvbmNhdAogICAgcmV0c3ViCg==", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyAGAAEIAtTFAeTFAiYWAWQIRVJSOklQQVkACEVSUjpEQk5FCEVSUjpZTkNSAXUEFR98dQhFUlI6SVhGUghFUlI6REJBRghFUlI6SU1CUg9kaXNidXJzZW1lbnRfaWQJYWtpdGFfZGFvCEVSUjpBTEFFAwAAXQhFUlI6SURVVAhFUlI6SURYVAhFUlI6REJFTQhFUlI6REJNQQOAAF0GAF8AAAAACEVSUjpEQkxLCEVSUjpBTE5FMRhAAAQnCiNnMRkURDEYQQCBghEEZmEgWgTWGmn6BByeu9sEj0kmLQRWVqz5BPYs3CsEb1wQzwRUJKWRBHt9xfwErxoU8gQ+xAqkBL080JAEFJadlwQz6SyUBIVN7eAE1Uu62QQ5Tq6yNhoAjhEAPACaAQgB2gKnA9YFCwcbB9EInwmUCs4L4AwqAAEMXgyIACNDgATNmtZ+NhoAjgEAAQA2GgFJIlklCEsBFRJEVwIANhoCSRUkEkQXgAd2ZXJzaW9uTwJnJwtMZyNDKjYaAUkVJBJEFzEWIwlJTgI4ECMSRBYoTFBJvUUBQAADK7AASSKBILoxABJAAAQnBLAASwE4BzIKEkAAAymwAEsBOAhJRQRAAAMpsABHAoFLJLoXSwQIFoFLTLsjQzYaAUkVJBJEFzYaAkkVJBJEF0wWKExQSb1FAUAAAyuwAEkigSC6MQASQAAEJwSwAEsBQAAEJwmwAEmBSyS6F0sCD0AABCcJsABHAoFLJLoXSwNJTgIJFk8CgUtPAruxMQCyB7III7IQIrIBsyNDKjEWIwlHAjgQIxJENhoBSSJZJQhLARUSRFcCAElOAjYaAkkVJBJEF04CNhoDSRUkEkQXTgI2GgRJIlklCEsBFRJEVwIASU4DiAuKTgOIDAgiW0w4BzIKEkAAAymwAEsGOAhJRQlLAQ9AAAMpsAAxAEsISwIJSwdJFRZXBgJMUE8CJw1QSwEVgV0IIhZPAksBUEsJFlBLCBZQSwFQSwFQTwQWUExQSwVJFRZXBgJMUE8CFlcGAk8CTFBPAlBMUEsCFihLAVBJvEhPAr8nBkxQsCNDKjYaAUkVJBJEFzYaAklOAkkiWSUITBVJTgMSRDYaA0lOAhUkEkQ2GgRJTgIVJBJENhoFSU4CSSJZJQhMFRJEFihMUEm9RQFAAAMrsABHAiKBILpMgSAjuiJTRQgxABJAAAQnBLAASwZBAAQnCLAARwK+REmBIVlLASJLAlhLCVBLAoFbWUsDFU8ESwJPAlJPAkxQSwFPAwlPAksICEwJFlcGAlxbSwG8SEsBTL9JgStLBrtJgTNLBbtJvkhJgVtZIkxYSwNQSwG8SL8jQyJHAypHAjEWIwlJOBAjEkQ2GgFJFSQSRBdJNhoCSU4CSSJZSU4DgSgLJQhMFRJEFkkoTFBJvUUBQAADK7AARwIigSC6SwGBICO6IlNFC0sBgV0luhclCEsCgV1PArpXAgBFDEsBgVsluhdLAksBJboXJQhPA04CulcCAEUMMQASQAAEJwSwAEsIQQAEJwiwACJFByJFCEsHSwMMQQBjSwNXAgBLCIEoC4EoWElFDlcAICIWUEsCUCcFTFBJRQ29RQFBAAQnDLAASwyBIFtJFksNTL9LAUmBOyS6FyMIFksBgTtPArtJgSMkuhdLAggWgSNMu0sHCEUHSwcjCEUIQv+VSwlLC4gJsSRbSwMLSwVMiAkwSwU4BzIKEkAAAymwAEsFOAhLBxJAAAMpsAAjQyJHAypHAjEWIwlJOBCBBBJENhoBSRUkEkQXSTYaAklOAkkiWUlOA4EoCyUITBUSRBZJKExQSb1FAUAAAyuwAEcCIoEguksBgSAjuiJTRQtLAYFdJboXJQhLAoFdTwK6VwIARQxLAYFbJboXSwJLASW6FyUITwNOArpXAgBFDDEAEkAABCcEsABLCEEABCcIsAAiRQciRQhLB0sDDEEAZksDVwIASwiBKAuBKFhJRQ5XACBLBjgRFlBLAlAnBUxQSUUNvUUBQQAEJwywAEsMgSBbSRZLDUy/SwFJgTskuhcjCBZLAYE7TwK7SYEjJLoXSwIIFoEjTLtLBwhFB0sHIwhFCEL/kksJSwuICH4kW0sDC0sFTIgH/UsFOBQyChJAAAQnB7AASwU4EksHEkAABCcHsAAjQyJHAypHAzYaAUkVJBJEF0k2GgJJFSQSRBdMNhoDSSJZJQhLARUSRFcCAElOAjYaBEkVJBJEF04CNhoFSRUkEkQXTgI2GgZJIlklCEsBFRJEVwIASU4DNhoHSU4ESSJZSU4FSYEoCyUITwIVEkSIB2JOBEsDOBAjEkROAogH10kiW04DJFsLTDgHMgoSQAADKbAASwo4CElFDUsCSwIID0AAAymwADEASwxLAwlLCkkVFlcGAkxQTwInDVBLARWBXQgiFk8CSwFQSwwWUEsLFlBLAVBLAVBPBBZQTFBLCEkVFlcGAkxQTwIWVwYCTwJMUE8CUExQSwMWSUUUKExQSUUTSbxITL8iRQ5LDUsEDEEAkUsJSw5JTgIISUURSTgQgQQSREsGVwIATwKBKAuBKFhJRRVXACBMOBEWUEsSUCcFTFBJRRG9RQFBAAQnDLAASw44FDIKEkAABCcHsABLDjgSSxOBIFtJRQ8SQAAEJwewAEsMSRZLEUy/SxFJgTskuhcjCBZLAYE7TwK7SYEjJLoXTwIIFoEjTLtLDSMIRQ5C/2dLAksBiAY2SwcyBw9AAAVLB0AAViNAAAQnDrAAMgeBPAhLBw5AAAVLBkAAOiNAAAQnD7AASxCBIyS6F0AABCcQsABLEIE7JLoXQAAEJxGwAEsQSYEgI7oiI1SBIEy7JwZLElCwI0MiQv/DIkL/pypHBDYaAUkVJBJEFxYoTFBJvUUBQAADK7AARwIigSC6SwGBICO6IlNFBUsBgSskuhdFBEsBgTMkuhdFBksBgSMkuhdFB0yBOyS6F0UHMQASQAAEJwSwAEsCQQAEJwiwAEsBMgcPQAAFSwFAAEUjQAAEJw6wADIHgTwISwQOQAAFSwNAACkjQAAEJw+wAEsEQAAEJxCwAEsFQAAEJxGwAEcCgSAjuiIjVIEgTLsjQyJC/9QiQv+4MRYjCUk4ECMSRDYaAUkVJBJEFzYaAkkVJBJEFzYaA0cCIllJTgJJgSgLJQhPAhUSRIgE2EwhBAtJIQUIIklJSwYMQQA0SwZXAgBLAUlOAoEoC4EoWElXACAiFlBLBxZQTIEgWycFTwJQSwEWv0sDCEUDIwhFAUL/xUsJOAcyChJAAAMpsABLCTgISwNLAwgSQAADKbAAMQAiFkwnElBLAxZQSwoWUEsJFlBLBxZQSwFQTFBLBBZQJxNQSwUWKEsBUEm8SE8CvycGTFCwI0MxFiUJSTgQIxJEMRYjCUk4EIEEEkQ2GgFJFSQSRBc2GgJJFSQSRBc2GgNHAiJZSU4CSYEoCyUITwIVEkSIA/9MIQQLSSEFCCJJSUsGDEEAN0sGVwIASwFJTgKBKAuBKFhJVwAgSww4ERZQSwcWUEyBIFsnBU8CUEsBFr9LAwhFAyMIRQFC/8JLCjgHMgoSQAADKbAASwo4CEsDEkAAAymwAEsJOBQyChJAAAQnB7AASwk4EksCEkAABCcHsAAxACIWTCcSUEsDFlBLChZQSwkWUEsHFlBLAVBMUEsEFlAnE1BLBRYoSwFQSbxITwK/JwZMULAjQyJHBCpHBDYaAUcCIllJTgKBEAslCEwVEkQiSUsCDEEBF0sCVwIASwGBEAuBEFhJRQ4iW0lFBRZJRQ0oTFBJRQy9RQFAAAMrsABLCkmBKyS6F0sBgTMkuhdFCEsBgSMkuhdFCksBgUMkuhdFCUsBgVsluhdLAksBJboXJQhPA04CulcCAEUKMgcOQAAEJxSwAEsFMgcPQAAEJxSwAEsHSwcNQAAMgAhFUlI6REJGRLAAMQBLDSRbSUUHFlBLDFAnBUxQSUULvUUBQAAEJxWwAEsJSb5EF0lOAksNSYE7JLoXIwkWSwGBO08Cu0mBQyS6F08CCBaBQ0y7vEhLBIgCkksFQQAfMQCxSwqyBUsGshGyFLISgQSyECKyAbNJIwhFAUL+9zEAsUsKsgWyB7III7IQIrIBs0L/4yNDIkkqRwM2GgFJFSQSRBdJNhoCSU4CSSJZSU4DgSgLJQhMFRJEFkkoTFBJvUUBQAADK7AARwIigSC6SU4CRQ1JgSAjuiJTRQqBMyS6F0UKMQASQAAEJwSwAEsHQAAEJwiwAEsIMgcOQAAMgAhFUlI6REJOWLAAIkUHSwZLAwxBAJBLA1cCAEsHgSgLgShYSVcAIEyBIFtJRQgWUEsCUCcFTFBJRQu9RQFAAAQnFbAASwlJvkQXSU4CSwNJgTskuhcjCRZLAYE7TwK7SYEjJLoXTwIJFoEjTLu8SEsFiAF5SwZBAByxSwayEbISSwqyFIEEshAisgGzSwYjCEUHQv95sbIISwqyByOyECKyAbNC/+YjQypJNhoBSRUkEkQXNhoCSRUkEkQXTBYoTFBJvUUBQAADK7AAIQRLAgtJRQRLAYFLJLoXSUUGDkEACSIWJwZMULAjQ0sCSwQJQv/wNhoBSRUkEkQXMQAiJwtlRIAGd2FsbGV0ZUhyCEQSQAAMgAhFUlI6TkRBT7AAJwtLAWcjQzYaAUkiWSUISwEVEkRXAgA2GgJJIlklCEsBFRJEVwIAiADfJwZMULAjQzEWIwlHAjgQIxJENhoBSRUkEkQXTDgHMgoSQAAMgAhFUlI6SVBNUrAASwE4CDIQEkAADIAIRVJSOklQTUGwALEyCksBshEishKyFIEEshAisgGzI0MiJwplREkjCCcKTGeJigIAi/4WKExQSYFLJLoXi/8PQAAEJwmwAIsASYFLJLoXi/8JFksBgUtPArtJgVMkuheL/wgWgVNMu4mKAQCL/xYoTFBJgVMkuhchBA9AAAQnCbAAiwBJgVMkuhchBAkWSwGBU08Cu0mBSyS6FyEECBaBS0y7iYoCAYv+FYv/FQiBkAMLIQUIFiEEFlCJ", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
var RewardsParamsFactory = class _RewardsParamsFactory {
  /**
   * Gets available create ABI call param factories
   */
  static get create() {
    return {
      _resolveByMethod(params) {
        switch (params.method) {
          case "create":
          case "create(string,uint64)void":
            return _RewardsParamsFactory.create.create(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs create ABI call params for the Rewards smart contract using the create(string,uint64)void ABI method
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
   * Constructs a no op call for the fundMbrCredits(uint64,pay)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static fundMbrCredits(params) {
    return {
      ...params,
      method: "fundMbrCredits(uint64,pay)void",
      args: Array.isArray(params.args) ? params.args : [params.args.id, params.args.payment]
    };
  }
  /**
   * Constructs a no op call for the withdrawMbrCredits(uint64,uint64)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static withdrawMbrCredits(params) {
    return {
      ...params,
      method: "withdrawMbrCredits(uint64,uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.id, params.args.amount]
    };
  }
  /**
   * Constructs a no op call for the createDisbursement(pay,string,uint64,uint64,string)uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static createDisbursement(params) {
    return {
      ...params,
      method: "createDisbursement(pay,string,uint64,uint64,string)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.mbrPayment, params.args.title, params.args.timeToUnlock, params.args.expiration, params.args.note]
    };
  }
  /**
   * Constructs a no op call for the editDisbursement(uint64,string,uint64,uint64,string)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static editDisbursement(params) {
    return {
      ...params,
      method: "editDisbursement(uint64,string,uint64,uint64,string)void",
      args: Array.isArray(params.args) ? params.args : [params.args.id, params.args.title, params.args.timeToUnlock, params.args.expiration, params.args.note]
    };
  }
  /**
   * Constructs a no op call for the createUserAllocations(pay,uint64,(address,uint64)[])void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static createUserAllocations(params) {
    return {
      ...params,
      method: "createUserAllocations(pay,uint64,(address,uint64)[])void",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.id, params.args.allocations]
    };
  }
  /**
   * Constructs a no op call for the createAsaUserAllocations(axfer,uint64,(address,uint64)[])void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static createAsaUserAllocations(params) {
    return {
      ...params,
      method: "createAsaUserAllocations(axfer,uint64,(address,uint64)[])void",
      args: Array.isArray(params.args) ? params.args : [params.args.assetXfer, params.args.id, params.args.allocations]
    };
  }
  /**
   * Constructs a no op call for the createAsaDisbursementFromGroup(uint64,uint64,string,uint64,uint64,string,(address,uint64)[])uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static createAsaDisbursementFromGroup(params) {
    return {
      ...params,
      method: "createAsaDisbursementFromGroup(uint64,uint64,string,uint64,uint64,string,(address,uint64)[])uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.mbrPaymentIndex, params.args.assetTransferStartIndex, params.args.title, params.args.timeToUnlock, params.args.expiration, params.args.note, params.args.allocations]
    };
  }
  /**
   * Constructs a no op call for the finalizeDisbursement(uint64)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static finalizeDisbursement(params) {
    return {
      ...params,
      method: "finalizeDisbursement(uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.id]
    };
  }
  /**
   * Constructs a no op call for the createInstantDisbursement(pay,uint64,uint64,(address,uint64)[])uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static createInstantDisbursement(params) {
    return {
      ...params,
      method: "createInstantDisbursement(pay,uint64,uint64,(address,uint64)[])uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.mbrPayment, params.args.timeToUnlock, params.args.expiration, params.args.allocations]
    };
  }
  /**
   * Constructs a no op call for the createInstantAsaDisbursement(pay,axfer,uint64,uint64,(address,uint64)[])uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static createInstantAsaDisbursement(params) {
    return {
      ...params,
      method: "createInstantAsaDisbursement(pay,axfer,uint64,uint64,(address,uint64)[])uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.mbrPayment, params.args.assetXfer, params.args.timeToUnlock, params.args.expiration, params.args.allocations]
    };
  }
  /**
   * Constructs a no op call for the claimRewards((uint64,uint64)[])void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static claimRewards(params) {
    return {
      ...params,
      method: "claimRewards((uint64,uint64)[])void",
      args: Array.isArray(params.args) ? params.args : [params.args.rewards]
    };
  }
  /**
   * Constructs a no op call for the reclaimRewards(uint64,(address,uint64)[])void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static reclaimRewards(params) {
    return {
      ...params,
      method: "reclaimRewards(uint64,(address,uint64)[])void",
      args: Array.isArray(params.args) ? params.args : [params.args.id, params.args.reclaims]
    };
  }
  /**
   * Constructs a no op call for the allocationMbrCreditShortfall(uint64,uint64)uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static allocationMbrCreditShortfall(params) {
    return {
      ...params,
      method: "allocationMbrCreditShortfall(uint64,uint64)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.id, params.args.allocationCount]
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
   * Constructs a no op call for the mbr(string,string)(uint64,uint64) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static mbr(params) {
    return {
      ...params,
      method: "mbr(string,string)(uint64,uint64)",
      args: Array.isArray(params.args) ? params.args : [params.args.title, params.args.note]
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
};
var RewardsFactory = class {
  /**
   * The underlying `AppFactory` for when you want to have more flexibility
   */
  appFactory;
  /**
   * Creates a new instance of `RewardsFactory`
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
    return new RewardsClient(this.appFactory.getAppClientById(params));
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
    return new RewardsClient(await this.appFactory.getAppClientByCreatorAndName(params));
  }
  /**
   * Idempotently deploys the Rewards smart contract.
   *
   * @param params The arguments for the contract calls and any additional parameters for the call
   * @returns The deployment result
   */
  async deploy(params = {}) {
    var _a;
    const result = await this.appFactory.deploy({
      ...params,
      createParams: ((_a = params.createParams) == null ? void 0 : _a.method) ? RewardsParamsFactory.create._resolveByMethod(params.createParams) : params.createParams ? params.createParams : void 0
    });
    return { result: result.result, appClient: new RewardsClient(result.appClient) };
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
       * Creates a new instance of the Rewards smart contract using the create(string,uint64)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create params
       */
      create: (params) => {
        return this.appFactory.params.create(RewardsParamsFactory.create.create(params));
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
       * Creates a new instance of the Rewards smart contract using the create(string,uint64)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create transaction
       */
      create: (params) => {
        return this.appFactory.createTransaction.create(RewardsParamsFactory.create.create(params));
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
       * Creates a new instance of the Rewards smart contract using an ABI method call using the create(string,uint64)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create result
       */
      create: async (params) => {
        const result = await this.appFactory.send.create(RewardsParamsFactory.create.create(params));
        return { result: { ...result.result, return: result.result.return }, appClient: new RewardsClient(result.appClient) };
      }
    }
  };
};
var RewardsClient = class _RewardsClient {
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
   * Returns a new `RewardsClient` client, resolving the app by creator address and name
   * using AlgoKit app deployment semantics (i.e. looking for the app creation transaction note).
   * @param params The parameters to create the app client
   */
  static async fromCreatorAndName(params) {
    return new _RewardsClient(await _AppClient.fromCreatorAndName({ ...params, appSpec: APP_SPEC }));
  }
  /**
   * Returns an `RewardsClient` instance for the current network based on
   * pre-determined network-specific app IDs specified in the ARC-56 app spec.
   *
   * If no IDs are in the app spec or the network isn't recognised, an error is thrown.
   * @param params The parameters to create the app client
   */
  static async fromNetwork(params) {
    return new _RewardsClient(await _AppClient.fromNetwork({ ...params, appSpec: APP_SPEC }));
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
     * Makes a clear_state call to an existing instance of the Rewards smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.params.bare.clearState(params);
    },
    /**
     * Makes a call to the Rewards smart contract using the `fundMbrCredits(uint64,pay)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    fundMbrCredits: (params) => {
      return this.appClient.params.call(RewardsParamsFactory.fundMbrCredits(params));
    },
    /**
     * Makes a call to the Rewards smart contract using the `withdrawMbrCredits(uint64,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    withdrawMbrCredits: (params) => {
      return this.appClient.params.call(RewardsParamsFactory.withdrawMbrCredits(params));
    },
    /**
     * Makes a call to the Rewards smart contract using the `createDisbursement(pay,string,uint64,uint64,string)uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    createDisbursement: (params) => {
      return this.appClient.params.call(RewardsParamsFactory.createDisbursement(params));
    },
    /**
     * Makes a call to the Rewards smart contract using the `editDisbursement(uint64,string,uint64,uint64,string)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    editDisbursement: (params) => {
      return this.appClient.params.call(RewardsParamsFactory.editDisbursement(params));
    },
    /**
     * Makes a call to the Rewards smart contract using the `createUserAllocations(pay,uint64,(address,uint64)[])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    createUserAllocations: (params) => {
      return this.appClient.params.call(RewardsParamsFactory.createUserAllocations(params));
    },
    /**
     * Makes a call to the Rewards smart contract using the `createAsaUserAllocations(axfer,uint64,(address,uint64)[])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    createAsaUserAllocations: (params) => {
      return this.appClient.params.call(RewardsParamsFactory.createAsaUserAllocations(params));
    },
    /**
     * Makes a call to the Rewards smart contract using the `createAsaDisbursementFromGroup(uint64,uint64,string,uint64,uint64,string,(address,uint64)[])uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    createAsaDisbursementFromGroup: (params) => {
      return this.appClient.params.call(RewardsParamsFactory.createAsaDisbursementFromGroup(params));
    },
    /**
     * Makes a call to the Rewards smart contract using the `finalizeDisbursement(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    finalizeDisbursement: (params) => {
      return this.appClient.params.call(RewardsParamsFactory.finalizeDisbursement(params));
    },
    /**
     * Makes a call to the Rewards smart contract using the `createInstantDisbursement(pay,uint64,uint64,(address,uint64)[])uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    createInstantDisbursement: (params) => {
      return this.appClient.params.call(RewardsParamsFactory.createInstantDisbursement(params));
    },
    /**
     * Makes a call to the Rewards smart contract using the `createInstantAsaDisbursement(pay,axfer,uint64,uint64,(address,uint64)[])uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    createInstantAsaDisbursement: (params) => {
      return this.appClient.params.call(RewardsParamsFactory.createInstantAsaDisbursement(params));
    },
    /**
     * Makes a call to the Rewards smart contract using the `claimRewards((uint64,uint64)[])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    claimRewards: (params) => {
      return this.appClient.params.call(RewardsParamsFactory.claimRewards(params));
    },
    /**
     * Makes a call to the Rewards smart contract using the `reclaimRewards(uint64,(address,uint64)[])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    reclaimRewards: (params) => {
      return this.appClient.params.call(RewardsParamsFactory.reclaimRewards(params));
    },
    /**
     * Makes a call to the Rewards smart contract using the `allocationMbrCreditShortfall(uint64,uint64)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    allocationMbrCreditShortfall: (params) => {
      return this.appClient.params.call(RewardsParamsFactory.allocationMbrCreditShortfall(params));
    },
    /**
     * Makes a call to the Rewards smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    updateAkitaDao: (params) => {
      return this.appClient.params.call(RewardsParamsFactory.updateAkitaDao(params));
    },
    /**
     * Makes a call to the Rewards smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    opUp: (params = { args: [] }) => {
      return this.appClient.params.call(RewardsParamsFactory.opUp(params));
    },
    /**
     * Makes a call to the Rewards smart contract using the `mbr(string,string)(uint64,uint64)` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    mbr: (params) => {
      return this.appClient.params.call(RewardsParamsFactory.mbr(params));
    },
    /**
     * Makes a call to the Rewards smart contract using the `optIn(pay,uint64)void` ABI method.
     *
     * optin tells the contract to opt into an asa
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    optIn: (params) => {
      return this.appClient.params.call(RewardsParamsFactory.optIn(params));
    }
  };
  /**
   * Create transactions for the current app
   */
  createTransaction = {
    /**
     * Makes a clear_state call to an existing instance of the Rewards smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.createTransaction.bare.clearState(params);
    },
    /**
     * Makes a call to the Rewards smart contract using the `fundMbrCredits(uint64,pay)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    fundMbrCredits: (params) => {
      return this.appClient.createTransaction.call(RewardsParamsFactory.fundMbrCredits(params));
    },
    /**
     * Makes a call to the Rewards smart contract using the `withdrawMbrCredits(uint64,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    withdrawMbrCredits: (params) => {
      return this.appClient.createTransaction.call(RewardsParamsFactory.withdrawMbrCredits(params));
    },
    /**
     * Makes a call to the Rewards smart contract using the `createDisbursement(pay,string,uint64,uint64,string)uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    createDisbursement: (params) => {
      return this.appClient.createTransaction.call(RewardsParamsFactory.createDisbursement(params));
    },
    /**
     * Makes a call to the Rewards smart contract using the `editDisbursement(uint64,string,uint64,uint64,string)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    editDisbursement: (params) => {
      return this.appClient.createTransaction.call(RewardsParamsFactory.editDisbursement(params));
    },
    /**
     * Makes a call to the Rewards smart contract using the `createUserAllocations(pay,uint64,(address,uint64)[])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    createUserAllocations: (params) => {
      return this.appClient.createTransaction.call(RewardsParamsFactory.createUserAllocations(params));
    },
    /**
     * Makes a call to the Rewards smart contract using the `createAsaUserAllocations(axfer,uint64,(address,uint64)[])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    createAsaUserAllocations: (params) => {
      return this.appClient.createTransaction.call(RewardsParamsFactory.createAsaUserAllocations(params));
    },
    /**
     * Makes a call to the Rewards smart contract using the `createAsaDisbursementFromGroup(uint64,uint64,string,uint64,uint64,string,(address,uint64)[])uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    createAsaDisbursementFromGroup: (params) => {
      return this.appClient.createTransaction.call(RewardsParamsFactory.createAsaDisbursementFromGroup(params));
    },
    /**
     * Makes a call to the Rewards smart contract using the `finalizeDisbursement(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    finalizeDisbursement: (params) => {
      return this.appClient.createTransaction.call(RewardsParamsFactory.finalizeDisbursement(params));
    },
    /**
     * Makes a call to the Rewards smart contract using the `createInstantDisbursement(pay,uint64,uint64,(address,uint64)[])uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    createInstantDisbursement: (params) => {
      return this.appClient.createTransaction.call(RewardsParamsFactory.createInstantDisbursement(params));
    },
    /**
     * Makes a call to the Rewards smart contract using the `createInstantAsaDisbursement(pay,axfer,uint64,uint64,(address,uint64)[])uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    createInstantAsaDisbursement: (params) => {
      return this.appClient.createTransaction.call(RewardsParamsFactory.createInstantAsaDisbursement(params));
    },
    /**
     * Makes a call to the Rewards smart contract using the `claimRewards((uint64,uint64)[])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    claimRewards: (params) => {
      return this.appClient.createTransaction.call(RewardsParamsFactory.claimRewards(params));
    },
    /**
     * Makes a call to the Rewards smart contract using the `reclaimRewards(uint64,(address,uint64)[])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    reclaimRewards: (params) => {
      return this.appClient.createTransaction.call(RewardsParamsFactory.reclaimRewards(params));
    },
    /**
     * Makes a call to the Rewards smart contract using the `allocationMbrCreditShortfall(uint64,uint64)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    allocationMbrCreditShortfall: (params) => {
      return this.appClient.createTransaction.call(RewardsParamsFactory.allocationMbrCreditShortfall(params));
    },
    /**
     * Makes a call to the Rewards smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    updateAkitaDao: (params) => {
      return this.appClient.createTransaction.call(RewardsParamsFactory.updateAkitaDao(params));
    },
    /**
     * Makes a call to the Rewards smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    opUp: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(RewardsParamsFactory.opUp(params));
    },
    /**
     * Makes a call to the Rewards smart contract using the `mbr(string,string)(uint64,uint64)` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    mbr: (params) => {
      return this.appClient.createTransaction.call(RewardsParamsFactory.mbr(params));
    },
    /**
     * Makes a call to the Rewards smart contract using the `optIn(pay,uint64)void` ABI method.
     *
     * optin tells the contract to opt into an asa
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    optIn: (params) => {
      return this.appClient.createTransaction.call(RewardsParamsFactory.optIn(params));
    }
  };
  /**
   * Send calls to the current app
   */
  send = {
    /**
     * Makes a clear_state call to an existing instance of the Rewards smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.send.bare.clearState(params);
    },
    /**
     * Makes a call to the Rewards smart contract using the `fundMbrCredits(uint64,pay)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    fundMbrCredits: async (params) => {
      const result = await this.appClient.send.call(RewardsParamsFactory.fundMbrCredits(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Rewards smart contract using the `withdrawMbrCredits(uint64,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    withdrawMbrCredits: async (params) => {
      const result = await this.appClient.send.call(RewardsParamsFactory.withdrawMbrCredits(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Rewards smart contract using the `createDisbursement(pay,string,uint64,uint64,string)uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    createDisbursement: async (params) => {
      const result = await this.appClient.send.call(RewardsParamsFactory.createDisbursement(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Rewards smart contract using the `editDisbursement(uint64,string,uint64,uint64,string)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    editDisbursement: async (params) => {
      const result = await this.appClient.send.call(RewardsParamsFactory.editDisbursement(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Rewards smart contract using the `createUserAllocations(pay,uint64,(address,uint64)[])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    createUserAllocations: async (params) => {
      const result = await this.appClient.send.call(RewardsParamsFactory.createUserAllocations(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Rewards smart contract using the `createAsaUserAllocations(axfer,uint64,(address,uint64)[])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    createAsaUserAllocations: async (params) => {
      const result = await this.appClient.send.call(RewardsParamsFactory.createAsaUserAllocations(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Rewards smart contract using the `createAsaDisbursementFromGroup(uint64,uint64,string,uint64,uint64,string,(address,uint64)[])uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    createAsaDisbursementFromGroup: async (params) => {
      const result = await this.appClient.send.call(RewardsParamsFactory.createAsaDisbursementFromGroup(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Rewards smart contract using the `finalizeDisbursement(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    finalizeDisbursement: async (params) => {
      const result = await this.appClient.send.call(RewardsParamsFactory.finalizeDisbursement(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Rewards smart contract using the `createInstantDisbursement(pay,uint64,uint64,(address,uint64)[])uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    createInstantDisbursement: async (params) => {
      const result = await this.appClient.send.call(RewardsParamsFactory.createInstantDisbursement(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Rewards smart contract using the `createInstantAsaDisbursement(pay,axfer,uint64,uint64,(address,uint64)[])uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    createInstantAsaDisbursement: async (params) => {
      const result = await this.appClient.send.call(RewardsParamsFactory.createInstantAsaDisbursement(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Rewards smart contract using the `claimRewards((uint64,uint64)[])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    claimRewards: async (params) => {
      const result = await this.appClient.send.call(RewardsParamsFactory.claimRewards(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Rewards smart contract using the `reclaimRewards(uint64,(address,uint64)[])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    reclaimRewards: async (params) => {
      const result = await this.appClient.send.call(RewardsParamsFactory.reclaimRewards(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Rewards smart contract using the `allocationMbrCreditShortfall(uint64,uint64)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    allocationMbrCreditShortfall: async (params) => {
      const result = await this.appClient.send.call(RewardsParamsFactory.allocationMbrCreditShortfall(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Rewards smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    updateAkitaDao: async (params) => {
      const result = await this.appClient.send.call(RewardsParamsFactory.updateAkitaDao(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Rewards smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    opUp: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(RewardsParamsFactory.opUp(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Rewards smart contract using the `mbr(string,string)(uint64,uint64)` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    mbr: async (params) => {
      const result = await this.appClient.send.call(RewardsParamsFactory.mbr(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Rewards smart contract using the `optIn(pay,uint64)void` ABI method.
     *
     * optin tells the contract to opt into an asa
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    optIn: async (params) => {
      const result = await this.appClient.send.call(RewardsParamsFactory.optIn(params));
      return { ...result, return: result.return };
    }
  };
  /**
   * Clone this app client with different params
   *
   * @param params The params to use for the cloned app client. Omit a param to keep the original value. Set a param to override the original value. Setting to undefined will clear the original value.
   * @returns A new app client with the altered params
   */
  clone(params) {
    return new _RewardsClient(this.appClient.clone(params));
  }
  /**
   * Makes a readonly (simulated) call to the Rewards smart contract using the `allocationMbrCreditShortfall(uint64,uint64)uint64` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async allocationMbrCreditShortfall(params) {
    const result = await this.appClient.send.call(RewardsParamsFactory.allocationMbrCreditShortfall(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Rewards smart contract using the `mbr(string,string)(uint64,uint64)` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async mbr(params) {
    const result = await this.appClient.send.call(RewardsParamsFactory.mbr(params));
    return result.return;
  }
  /**
   * Methods to access state for the current Rewards app
   */
  state = {
    /**
     * Methods to access global state for the current Rewards app
     */
    global: {
      /**
       * Get all current keyed values from global state
       */
      getAll: async () => {
        const result = await this.appClient.state.global.getAll();
        return {
          disbursementId: result.disbursementID,
          version: result.version,
          akitaDao: result.akitaDAO
        };
      },
      /**
       * Get the current value of the disbursementID key in global state
       */
      disbursementId: async () => {
        return await this.appClient.state.global.getValue("disbursementID");
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
     * Methods to access box state for the current Rewards app
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
       * Get values from the disbursements map in box state
       */
      disbursements: {
        /**
         * Get all current values of the disbursements map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("disbursements");
        },
        /**
         * Get a current value of the disbursements map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("disbursements", key);
        }
      },
      /**
       * Get values from the userAllocations map in box state
       */
      userAllocations: {
        /**
         * Get all current values of the userAllocations map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("userAllocations");
        },
        /**
         * Get a current value of the userAllocations map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("userAllocations", key);
        }
      }
    }
  };
  newGroup(composerConfig) {
    const client = this;
    const composer = this.algorand.newGroup(composerConfig);
    let promiseChain = Promise.resolve();
    return {
      /**
       * Add a fundMbrCredits(uint64,pay)void method call against the Rewards contract
       */
      fundMbrCredits(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.fundMbrCredits(params)));
        return this;
      },
      /**
       * Add a withdrawMbrCredits(uint64,uint64)void method call against the Rewards contract
       */
      withdrawMbrCredits(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.withdrawMbrCredits(params)));
        return this;
      },
      /**
       * Add a createDisbursement(pay,string,uint64,uint64,string)uint64 method call against the Rewards contract
       */
      createDisbursement(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.createDisbursement(params)));
        return this;
      },
      /**
       * Add a editDisbursement(uint64,string,uint64,uint64,string)void method call against the Rewards contract
       */
      editDisbursement(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.editDisbursement(params)));
        return this;
      },
      /**
       * Add a createUserAllocations(pay,uint64,(address,uint64)[])void method call against the Rewards contract
       */
      createUserAllocations(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.createUserAllocations(params)));
        return this;
      },
      /**
       * Add a createAsaUserAllocations(axfer,uint64,(address,uint64)[])void method call against the Rewards contract
       */
      createAsaUserAllocations(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.createAsaUserAllocations(params)));
        return this;
      },
      /**
       * Add a createAsaDisbursementFromGroup(uint64,uint64,string,uint64,uint64,string,(address,uint64)[])uint64 method call against the Rewards contract
       */
      createAsaDisbursementFromGroup(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.createAsaDisbursementFromGroup(params)));
        return this;
      },
      /**
       * Add a finalizeDisbursement(uint64)void method call against the Rewards contract
       */
      finalizeDisbursement(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.finalizeDisbursement(params)));
        return this;
      },
      /**
       * Add a createInstantDisbursement(pay,uint64,uint64,(address,uint64)[])uint64 method call against the Rewards contract
       */
      createInstantDisbursement(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.createInstantDisbursement(params)));
        return this;
      },
      /**
       * Add a createInstantAsaDisbursement(pay,axfer,uint64,uint64,(address,uint64)[])uint64 method call against the Rewards contract
       */
      createInstantAsaDisbursement(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.createInstantAsaDisbursement(params)));
        return this;
      },
      /**
       * Add a claimRewards((uint64,uint64)[])void method call against the Rewards contract
       */
      claimRewards(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.claimRewards(params)));
        return this;
      },
      /**
       * Add a reclaimRewards(uint64,(address,uint64)[])void method call against the Rewards contract
       */
      reclaimRewards(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.reclaimRewards(params)));
        return this;
      },
      /**
       * Add a allocationMbrCreditShortfall(uint64,uint64)uint64 method call against the Rewards contract
       */
      allocationMbrCreditShortfall(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.allocationMbrCreditShortfall(params)));
        return this;
      },
      /**
       * Add a updateAkitaDAO(uint64)void method call against the Rewards contract
       */
      updateAkitaDao(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateAkitaDao(params)));
        return this;
      },
      /**
       * Add a opUp()void method call against the Rewards contract
       */
      opUp(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.opUp(params)));
        return this;
      },
      /**
       * Add a mbr(string,string)(uint64,uint64) method call against the Rewards contract
       */
      mbr(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.mbr(params)));
        return this;
      },
      /**
       * Add a optIn(pay,uint64)void method call against the Rewards contract
       */
      optIn(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.optIn(params)));
        return this;
      },
      /**
       * Add a clear state call to the Rewards contract
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
};

// src/rewards/errors.ts
var REWARDS_ERROR_MESSAGES = {
  // --- Plugin / wallet ----------------------------------------------------
  PNCW: "Plugin does not control wallet",
  // --- Token allocation boxes --------------------------------------------
  TABE: "Token allocation box already exists",
  TBNE: "Token allocation box does not exist",
  // --- Disbursement authorization ----------------------------------------
  YNCR: "You are not the creator of this disbursement",
  // --- Asset opt-in -------------------------------------------------------
  ANOI: "App is not opted into asset",
  // --- Disbursement lifecycle --------------------------------------------
  DBNE: "Disbursement does not exist",
  DBAF: "Disbursement already final",
  DBLK: "Disbursement is locked",
  DBFD: "Disbursement is fully distributed",
  DBNX: "Disbursement has not expired",
  // --- Disbursement validation -------------------------------------------
  IDUT: "Invalid disbursement unlock time",
  IDXT: "Invalid disbursement expiration time",
  DBEM: "Disbursements cannot be empty",
  DBMA: "Disbursements must have allocations",
  // --- Allocations --------------------------------------------------------
  ALAE: "Allocation already exists",
  ALNE: "Allocation does not exist",
  // --- Totals -------------------------------------------------------------
  ISUM: "Invalid sum",
  IMBR: "Invalid MBR amount"
};
var translateRewardsError = makeErrorTranslator(REWARDS_ERROR_MESSAGES);

// src/rewards/index.ts
var BASE_REFERENCES = 8;
var REFERENCES_PER_OPUP = 8;
var MAX_ALGORAND_GROUP_SIZE = 16;
var CREATE_ASA_DISBURSEMENT_FROM_GROUP = ABIMethod.fromSignature(
  "createAsaDisbursementFromGroup(uint64,uint64,string,uint64,uint64,string,(address,uint64)[])uint64"
);
var RewardsSDK = class extends BaseSDK {
  constructor(params) {
    super({ factory: RewardsFactory, ...params }, ENV_VAR_NAMES.REWARDS_APP_ID);
  }
  // ========== OpUp Helpers ==========
  /**
   * Calculates the number of opUp calls needed for a given reference count.
   * @param referencesNeeded - Number of references needed for the operation
   * @param baseReferences - Base references available (default 8)
   * @returns Number of opUp calls needed (0 if none needed)
   */
  calculateOpUpsNeeded(referencesNeeded, baseReferences = BASE_REFERENCES) {
    if (referencesNeeded <= baseReferences) {
      return 0;
    }
    return Math.ceil((referencesNeeded - baseReferences) / REFERENCES_PER_OPUP);
  }
  /**
   * Adds the required number of opUp calls to a transaction group.
   * Each opUp call adds 8 more reference slots to the group.
   */
  addOpUps(group, count, sendParams) {
    for (let i = 0; i < count; i++) {
      group.opUp({
        ...sendParams,
        args: {},
        // Add unique note to avoid duplicate transaction issues
        note: i > 0 ? `opUp-${i}` : void 0
      });
    }
  }
  // ========== Read Methods ==========
  /**
   * Gets the current global state of the rewards contract.
   */
  async getState() {
    const state = await this.client.state.global.getAll();
    return {
      disbursementId: state.disbursementId ?? 1n,
      version: state.version ?? "",
      akitaDao: state.akitaDao ?? 0n
    };
  }
  /**
   * Gets the MBR (Minimum Balance Requirement) data for creating disbursements.
   * @param title - The disbursement title
   * @param note - The disbursement note
   */
  async mbr({ title, note }) {
    return await this.client.mbr({ args: { title, note } });
  }
  /**
   * Gets a specific disbursement by ID.
   */
  async getDisbursement({ id }) {
    const disbursement = await this.client.state.box.disbursements.value(id);
    if (disbursement === void 0) {
      throw new Error(`Disbursement ${id} not found`);
    }
    return disbursement;
  }
  /**
   * Gets all disbursements as a map.
   */
  async getDisbursements() {
    const disbursements = await this.client.state.box.disbursements.getMap();
    return new Map(Array.from(disbursements.entries()).map(([key, value]) => [BigInt(key), value]));
  }
  /**
   * Gets a user's allocation for a specific disbursement and asset.
   *
   * NOTE: Property order MUST match the APP_SPEC struct declaration order
   * (address, asset, disbursementId). v10's ABIStructType encoder uses
   * Object.values() which iterates in input-object property order and then
   * maps positionally onto the declared struct fields — a mismatched order
   * silently produces the wrong box key.
   */
  async getUserAllocation({ address, disbursementId, asset }) {
    const allocation = await this.client.state.box.userAllocations.value({
      address,
      asset: BigInt(asset),
      disbursementId: BigInt(disbursementId)
    });
    if (allocation === void 0) {
      throw new Error(`Allocation not found for address ${address}, disbursement ${disbursementId}`);
    }
    return allocation;
  }
  /**
   * Checks if a user has an allocation for a specific disbursement and asset.
   *
   * NOTE: Property order MUST match APP_SPEC struct order (address, asset,
   * disbursementId). See getUserAllocation for the full explanation.
   */
  async hasAllocation({ address, disbursementId, asset }) {
    try {
      const allocation = await this.client.state.box.userAllocations.value({
        address,
        asset: BigInt(asset),
        disbursementId: BigInt(disbursementId)
      });
      return allocation !== void 0;
    } catch {
      return false;
    }
  }
  /**
   * Gets the additional MBR credit needed to create allocation boxes.
   */
  async allocationMbrCreditShortfall({
    id,
    allocationCount
  }) {
    return await this.client.allocationMbrCreditShortfall({
      args: { id, allocationCount }
    });
  }
  // ========== Write Methods ==========
  /**
   * Opts the rewards contract into an asset.
   */
  async optIn({ sender, signer, asset }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const payment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: microAlgo(1e5),
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
   * Creates a new disbursement.
   * Returns the disbursement ID.
   */
  async createDisbursement({
    sender,
    signer,
    title,
    timeToUnlock,
    expiration,
    note,
    mbrCredits = 0n
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const mbrData = await this.mbr({ title, note });
    const mbrPayment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: microAlgo(mbrData.disbursements + BigInt(mbrCredits)),
      receiver: this.client.appAddress
    });
    const { return: disbursementId } = await this.client.send.createDisbursement({
      ...sendParams,
      args: {
        mbrPayment,
        title,
        timeToUnlock,
        expiration,
        note
      }
    });
    if (disbursementId === void 0) {
      throw new Error("Failed to create disbursement");
    }
    return disbursementId;
  }
  /**
   * Edits an existing disbursement (only before finalization).
   */
  async editDisbursement({
    sender,
    signer,
    id,
    title,
    timeToUnlock,
    expiration,
    note
  }) {
    const sendParams = this.getSendParams({ sender, signer });
    await this.client.send.editDisbursement({
      ...sendParams,
      args: {
        id,
        title,
        timeToUnlock,
        expiration,
        note
      }
    });
  }
  /**
   * Helper to format allocations for the contract.
   */
  formatAllocations(allocations) {
    return allocations.map((a) => [a.address, a.amount]);
  }
  /**
   * Calculates the total amount from allocations.
   */
  sumAllocations(allocations) {
    return allocations.reduce((sum, a) => sum + BigInt(a.amount), 0n);
  }
  /**
   * Funds reusable MBR credits on a disbursement.
   */
  async fundMbrCredits({ sender, signer, id, amount }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const payment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: microAlgo(BigInt(amount)),
      receiver: this.client.appAddress
    });
    await this.client.send.fundMbrCredits({
      ...sendParams,
      args: { id, payment }
    });
  }
  /**
   * Withdraws reusable MBR credits from a disbursement.
   */
  async withdrawMbrCredits({ sender, signer, id, amount }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    await this.client.send.withdrawMbrCredits({
      ...sendParams,
      extraFee: microAlgo(1e3),
      args: { id, amount }
    });
  }
  /**
   * Creates ALGO allocations using existing disbursement MBR credits.
   * Fund credits separately with fundMbrCredits when allocationMbrCreditShortfall reports a shortfall.
   */
  async createUserAllocations({
    sender,
    signer,
    id,
    allocations
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const totalAmount = this.sumAllocations(allocations);
    const payment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: microAlgo(totalAmount),
      receiver: this.client.appAddress
    });
    const referencesNeeded = allocations.length + 2;
    const opUpsNeeded = this.calculateOpUpsNeeded(referencesNeeded);
    if (opUpsNeeded === 0) {
      await this.client.send.createUserAllocations({
        ...sendParams,
        args: {
          payment,
          id,
          allocations: this.formatAllocations(allocations)
        }
      });
    } else {
      const group = this.client.newGroup();
      group.createUserAllocations({
        ...sendParams,
        args: {
          payment,
          id,
          allocations: this.formatAllocations(allocations)
        }
      });
      this.addOpUps(group, opUpsNeeded, sendParams);
      await group.send(sendParams);
    }
  }
  /**
   * Creates ASA allocations using existing disbursement MBR credits.
   * Fund credits separately with fundMbrCredits when allocationMbrCreditShortfall reports a shortfall.
   */
  async createAsaUserAllocations({
    sender,
    signer,
    id,
    asset,
    allocations
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const totalAmount = this.sumAllocations(allocations);
    const assetXfer = await this.client.algorand.createTransaction.assetTransfer({
      ...sendParams,
      amount: totalAmount,
      assetId: BigInt(asset),
      receiver: this.client.appAddress
    });
    const referencesNeeded = allocations.length + 3;
    const opUpsNeeded = this.calculateOpUpsNeeded(referencesNeeded);
    if (opUpsNeeded === 0) {
      await this.client.send.createAsaUserAllocations({
        ...sendParams,
        args: {
          assetXfer,
          id,
          allocations: this.formatAllocations(allocations)
        }
      });
    } else {
      const group = this.client.newGroup();
      group.createAsaUserAllocations({
        ...sendParams,
        args: {
          assetXfer,
          id,
          allocations: this.formatAllocations(allocations)
        }
      });
      this.addOpUps(group, opUpsNeeded, sendParams);
      await group.send(sendParams);
    }
  }
  /**
   * Creates and finalizes a multi-ASA disbursement in a single transaction group.
   *
   * Group shape:
   *   0: MBR payment
   *   1..N: ASA transfers to the rewards app
   *   N+1: createAsaDisbursementFromGroup app call
   *
   * This supports up to 14 ASA allocations in one Algorand group.
   */
  async createAsaDisbursementFromGroup({
    sender,
    signer,
    title,
    timeToUnlock,
    expiration,
    note,
    allocations
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const transactionCount = 1 + allocations.length + 1;
    if (transactionCount > MAX_ALGORAND_GROUP_SIZE) {
      throw new Error(
        `ASA disbursement requires ${transactionCount} transactions; maximum group size is ${MAX_ALGORAND_GROUP_SIZE}`
      );
    }
    const { disbursementId } = await this.getState();
    const mbrData = await this.mbr({ title, note });
    const mbrPayment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: microAlgo(mbrData.disbursements + mbrData.userAllocations * BigInt(allocations.length)),
      receiver: this.client.appAddress
    });
    const group = this.client.newGroup();
    group.addTransaction(mbrPayment, sendParams.signer);
    for (const allocation of allocations) {
      const assetXfer = await this.client.algorand.createTransaction.assetTransfer({
        ...sendParams,
        receiver: this.client.appAddress,
        assetId: BigInt(allocation.asset),
        amount: BigInt(allocation.amount)
      });
      group.addTransaction(assetXfer, sendParams.signer);
    }
    const appCall = await this.client.algorand.createTransaction.appCallMethodCall({
      ...sendParams,
      appId: this.client.appId,
      method: CREATE_ASA_DISBURSEMENT_FROM_GROUP,
      args: [
        0n,
        1n,
        title,
        timeToUnlock,
        expiration,
        note,
        allocations.map(({ address, amount }) => [address, amount])
      ],
      note: `asa-disbursement-${disbursementId}`
    });
    group.addTransaction(appCall, sendParams.signer);
    await group.send(sendParams);
    return disbursementId;
  }
  /**
   * Finalizes a disbursement, locking it for distribution.
   */
  async finalizeDisbursement({ sender, signer, id }) {
    const sendParams = this.getSendParams({ sender, signer });
    await this.client.send.finalizeDisbursement({
      ...sendParams,
      args: { id }
    });
  }
  /**
   * Creates and finalizes an ALGO disbursement in a single call.
   * Returns the disbursement ID.
   * Automatically adds opUp calls for large allocation batches.
   */
  async createInstantDisbursement({
    sender,
    signer,
    timeToUnlock,
    expiration,
    allocations
  }) {
    var _a;
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const MIN_DISBURSEMENTS_MBR = 41700n;
    const USER_ALLOCATION_MBR = 25300n;
    const mbrAmount = MIN_DISBURSEMENTS_MBR + USER_ALLOCATION_MBR * BigInt(allocations.length);
    const totalAmount = this.sumAllocations(allocations);
    const mbrPayment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: microAlgo(mbrAmount + totalAmount),
      receiver: this.client.appAddress
    });
    const referencesNeeded = allocations.length + 1;
    const opUpsNeeded = this.calculateOpUpsNeeded(referencesNeeded);
    let disbursementId;
    if (opUpsNeeded === 0) {
      const result = await this.client.send.createInstantDisbursement({
        ...sendParams,
        args: {
          mbrPayment,
          timeToUnlock,
          expiration,
          allocations: this.formatAllocations(allocations)
        }
      });
      disbursementId = result.return;
    } else {
      const group = this.client.newGroup();
      group.createInstantDisbursement({
        ...sendParams,
        args: {
          mbrPayment,
          timeToUnlock,
          expiration,
          allocations: this.formatAllocations(allocations)
        }
      });
      this.addOpUps(group, opUpsNeeded, sendParams);
      const result = await group.send(sendParams);
      disbursementId = (_a = result.returns) == null ? void 0 : _a[0];
    }
    if (disbursementId === void 0) {
      throw new Error("Failed to create instant disbursement");
    }
    return disbursementId;
  }
  /**
   * Creates and finalizes an ASA disbursement in a single call.
   * Returns the disbursement ID.
   * Automatically adds opUp calls for large allocation batches.
   */
  async createInstantAsaDisbursement({
    sender,
    signer,
    timeToUnlock,
    expiration,
    asset,
    allocations
  }) {
    var _a;
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const MIN_DISBURSEMENTS_MBR = 41700n;
    const USER_ALLOCATION_MBR = 25300n;
    const mbrAmount = MIN_DISBURSEMENTS_MBR + USER_ALLOCATION_MBR * BigInt(allocations.length);
    const totalAmount = this.sumAllocations(allocations);
    const mbrPayment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: microAlgo(mbrAmount),
      receiver: this.client.appAddress
    });
    const assetXfer = await this.client.algorand.createTransaction.assetTransfer({
      ...sendParams,
      amount: totalAmount,
      assetId: BigInt(asset),
      receiver: this.client.appAddress
    });
    const referencesNeeded = allocations.length + 2;
    const opUpsNeeded = this.calculateOpUpsNeeded(referencesNeeded);
    let disbursementId;
    if (opUpsNeeded === 0) {
      const result = await this.client.send.createInstantAsaDisbursement({
        ...sendParams,
        args: {
          mbrPayment,
          assetXfer,
          timeToUnlock,
          expiration,
          allocations: this.formatAllocations(allocations)
        }
      });
      disbursementId = result.return;
    } else {
      const group = this.client.newGroup();
      group.createInstantAsaDisbursement({
        ...sendParams,
        args: {
          mbrPayment,
          assetXfer,
          timeToUnlock,
          expiration,
          allocations: this.formatAllocations(allocations)
        }
      });
      this.addOpUps(group, opUpsNeeded, sendParams);
      const result = await group.send(sendParams);
      disbursementId = (_a = result.returns) == null ? void 0 : _a[0];
    }
    if (disbursementId === void 0) {
      throw new Error("Failed to create instant ASA disbursement");
    }
    return disbursementId;
  }
  /**
   * Claims rewards from one or more disbursements.
   * The caller claims their allocated rewards.
   * Automatically adds opUp calls for claiming from many disbursements.
   */
  async claimRewards({ sender, signer, rewards }) {
    const sendParams = this.getSendParams({ sender, signer });
    const formattedRewards = rewards.map((r) => [r.id, r.asset]);
    const referencesNeeded = rewards.length * 3;
    const opUpsNeeded = this.calculateOpUpsNeeded(referencesNeeded);
    if (opUpsNeeded === 0) {
      await this.client.send.claimRewards({
        ...sendParams,
        // Extra fee for inner transactions (1 reward transfer per claim; MBR refund is credited)
        extraFee: microAlgo(1e3 * rewards.length),
        args: {
          rewards: formattedRewards
        }
      });
    } else {
      const group = this.client.newGroup();
      group.claimRewards({
        ...sendParams,
        extraFee: microAlgo(1e3 * rewards.length),
        args: {
          rewards: formattedRewards
        }
      });
      this.addOpUps(group, opUpsNeeded, sendParams);
      await group.send(sendParams);
    }
  }
  /**
   * Reclaims unclaimed rewards after a disbursement has expired.
   * Only the disbursement creator can reclaim.
   * Automatically adds opUp calls for reclaiming many allocations.
   */
  async reclaimRewards({ sender, signer, id, reclaims }) {
    const sendParams = this.getSendParams({ sender, signer });
    const formattedReclaims = reclaims.map((r) => [r.address, r.asset]);
    const referencesNeeded = reclaims.length * 2 + 1;
    const opUpsNeeded = this.calculateOpUpsNeeded(referencesNeeded);
    if (opUpsNeeded === 0) {
      await this.client.send.reclaimRewards({
        ...sendParams,
        // Extra fee for inner transactions (1 reward transfer per reclaim; MBR refund is credited)
        extraFee: microAlgo(1e3 * reclaims.length),
        args: {
          id,
          reclaims: formattedReclaims
        }
      });
    } else {
      const group = this.client.newGroup();
      group.reclaimRewards({
        ...sendParams,
        extraFee: microAlgo(1e3 * reclaims.length),
        args: {
          id,
          reclaims: formattedReclaims
        }
      });
      this.addOpUps(group, opUpsNeeded, sendParams);
      await group.send(sendParams);
    }
  }
  /**
   * Updates the Akita DAO reference.
   */
  async updateAkitaDao({ sender, signer, akitaDao }) {
    const sendParams = this.getSendParams({ sender, signer });
    await this.client.send.updateAkitaDao({
      ...sendParams,
      args: { akitaDao }
    });
  }
};

export {
  REWARDS_ERROR_MESSAGES,
  translateRewardsError,
  RewardsSDK
};
//# sourceMappingURL=chunk-WD6CL6OZ.mjs.map
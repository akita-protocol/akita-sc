"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } var _class; var _class2;

var _chunkGIGYZ6YCjs = require('./chunk-GIGYZ6YC.js');


var _chunkKLHVDYDWjs = require('./chunk-KLHVDYDW.js');


var _chunkHFHM5QOFjs = require('./chunk-HFHM5QOF.js');

// src/rewards/index.ts
var _algokitutils = require('@algorandfoundation/algokit-utils');
var _abi = require('@algorandfoundation/algokit-utils/abi');

// src/generated/RewardsClient.ts

var _appclient = require('@algorandfoundation/algokit-utils/app-client');
var _appfactory = require('@algorandfoundation/algokit-utils/app-factory');
var APP_SPEC = { "name": "Rewards", "structs": { "DisbursementDetails": [{ "name": "creator", "type": "address" }, { "name": "finalized", "type": "bool" }, { "name": "title", "type": "string" }, { "name": "amount", "type": "uint64" }, { "name": "timeToUnlock", "type": "uint64" }, { "name": "expiration", "type": "uint64" }, { "name": "allocations", "type": "uint64" }, { "name": "distributed", "type": "uint64" }, { "name": "mbrCredits", "type": "uint64" }, { "name": "usedMbrCredits", "type": "uint64" }, { "name": "note", "type": "string" }], "RewardsMBRData": [{ "name": "disbursements", "type": "uint64" }, { "name": "userAllocations", "type": "uint64" }], "UserAllocationsKey": [{ "name": "address", "type": "address" }, { "name": "asset", "type": "uint64" }, { "name": "disbursementId", "type": "uint64" }] }, "methods": [{ "name": "create", "args": [{ "type": "string", "name": "version" }, { "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "fundMbrCredits", "args": [{ "type": "uint64", "name": "id" }, { "type": "pay", "name": "payment" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "withdrawMbrCredits", "args": [{ "type": "uint64", "name": "id" }, { "type": "uint64", "name": "amount" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "createDisbursement", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "string", "name": "title" }, { "type": "uint64", "name": "timeToUnlock" }, { "type": "uint64", "name": "expiration" }, { "type": "string", "name": "note" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "editDisbursement", "args": [{ "type": "uint64", "name": "id" }, { "type": "string", "name": "title" }, { "type": "uint64", "name": "timeToUnlock" }, { "type": "uint64", "name": "expiration" }, { "type": "string", "name": "note" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "createUserAllocations", "args": [{ "type": "pay", "name": "payment" }, { "type": "uint64", "name": "id" }, { "type": "(address,uint64)[]", "name": "allocations" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "createAsaUserAllocations", "args": [{ "type": "axfer", "name": "assetXfer" }, { "type": "uint64", "name": "id" }, { "type": "(address,uint64)[]", "name": "allocations" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "createAsaDisbursementFromGroup", "args": [{ "type": "uint64", "name": "mbrPaymentIndex" }, { "type": "uint64", "name": "assetTransferStartIndex" }, { "type": "string", "name": "title" }, { "type": "uint64", "name": "timeToUnlock" }, { "type": "uint64", "name": "expiration" }, { "type": "string", "name": "note" }, { "type": "(address,uint64)[]", "name": "allocations" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "finalizeDisbursement", "args": [{ "type": "uint64", "name": "id" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "createInstantDisbursement", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "uint64", "name": "timeToUnlock" }, { "type": "uint64", "name": "expiration" }, { "type": "(address,uint64)[]", "name": "allocations" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "createInstantAsaDisbursement", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "uint64", "name": "timeToUnlock" }, { "type": "uint64", "name": "expiration" }, { "type": "(address,uint64)[]", "name": "allocations" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "claimRewards", "args": [{ "type": "(uint64,uint64)[]", "name": "rewards" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "reclaimRewards", "args": [{ "type": "uint64", "name": "id" }, { "type": "(address,uint64)[]", "name": "reclaims" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "allocationMbrCreditShortfall", "args": [{ "type": "uint64", "name": "id" }, { "type": "uint64", "name": "allocationCount" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "mbr", "args": [{ "type": "string", "name": "title" }, { "type": "string", "name": "note" }], "returns": { "type": "(uint64,uint64)", "struct": "RewardsMBRData" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "optIn", "args": [{ "type": "pay", "name": "payment", "desc": "The payment transaction" }, { "type": "uint64", "name": "asset", "desc": "The asset to be opted into" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "optin tells the contract to opt into an asa", "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 2, "bytes": 1 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "disbursementID": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "ZGlzYnVyc2VtZW50X2lk", "desc": "the disbursement id cursor" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" } }, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": { "disbursements": { "keyType": "uint64", "valueType": "DisbursementDetails", "desc": "the disbursement map of tokens\n\nthe key is the uint64 id of the disbursement\nthe value is the details of the disbursement", "prefix": "ZA==" }, "userAllocations": { "keyType": "UserAllocationsKey", "valueType": "uint64", "desc": "the user allocations of disbursements\n\nthe key is the address of the qualified account with the uint64 id of the disbursement\nthe value is the amount they are owed", "prefix": "dQ==" } } } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [895, 2917, 3182], "errorMessage": "Box must have value" }, { "pc": [1177, 1472, 1897], "errorMessage": "ERR:ALAE" }, { "pc": [2914, 3179], "errorMessage": "ERR:ALNE" }, { "pc": [892, 1127, 1419, 2177, 3109], "errorMessage": "ERR:DBAF" }, { "pc": [2043, 2231], "errorMessage": "ERR:DBEM" }, { "pc": [2885], "errorMessage": "ERR:DBFD" }, { "pc": [2853, 2865], "errorMessage": "ERR:DBLK" }, { "pc": [2056, 2238], "errorMessage": "ERR:DBMA" }, { "pc": [420, 507, 862, 1047, 1339, 2109, 2783, 3065, 3309], "errorMessage": "ERR:DBNE" }, { "pc": [3127], "errorMessage": "ERR:DBNX" }, { "pc": [2006, 2198], "errorMessage": "ERR:IDUT" }, { "pc": [2030, 2222], "errorMessage": "ERR:IDXT" }, { "pc": [530, 546, 3558, 3615], "errorMessage": "ERR:IMBR" }, { "pc": [447, 457, 675, 688, 1264, 1274, 1714, 1731, 2397, 2413, 2622, 2635], "errorMessage": "ERR:IPAY" }, { "pc": [3499], "errorMessage": "ERR:IPMA" }, { "pc": [3478], "errorMessage": "ERR:IPMR" }, { "pc": [1560, 1571, 1911, 1931, 2649, 2662], "errorMessage": "ERR:IXFR" }, { "pc": [3389], "errorMessage": "ERR:NDAO" }, { "pc": [434, 521, 885, 1119, 1411, 2168, 3100], "errorMessage": "ERR:YNCR" }, { "pc": [3373], "errorMessage": "application exists" }, { "pc": [3360, 3525], "errorMessage": "check GlobalState exists" }, { "pc": [1152, 1444, 1868, 2347, 2569, 2756, 3148], "errorMessage": "index access is out of bounds" }, { "pc": [425, 463, 472, 512, 535, 551, 566, 868, 873, 959, 965, 1053, 1059, 1194, 1205, 1210, 1219, 1345, 1351, 1489, 1500, 1505, 1514, 1944, 1955, 1960, 1969, 2035, 2048, 2068, 2115, 2121, 2131, 2140, 2149, 2157, 2250, 2790, 2797, 2806, 2815, 2928, 2939, 2944, 2953, 3071, 3081, 3089, 3193, 3204, 3209, 3218, 3321, 3547, 3563, 3575, 3580, 3589, 3604, 3620, 3632, 3637, 3646], "errorMessage": "index out of bounds" }, { "pc": [348, 599, 640, 804, 842, 1018, 1310, 1600, 1641, 1663, 2297, 2519, 2723, 3038, 3401, 3417], "errorMessage": "invalid array length header" }, { "pc": [355, 606, 647, 813, 848, 1607, 1648, 3408, 3424], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [3050], "errorMessage": "invalid number of bytes for arc4.dynamic_array<smart_contracts/rewards/types.ts::AllocationReclaimDetails>" }, { "pc": [2735], "errorMessage": "invalid number of bytes for arc4.dynamic_array<smart_contracts/rewards/types.ts::ClaimDetails>" }, { "pc": [1030, 1322, 1677, 2311, 2533], "errorMessage": "invalid number of bytes for arc4.dynamic_array<smart_contracts/rewards/types.ts::UserAllocation>" }, { "pc": [366, 393, 482, 491, 620, 631, 794, 823, 833, 1005, 1297, 1581, 1591, 1621, 1632, 2094, 2278, 2288, 2496, 2507, 3027, 3284, 3293, 3352, 3456], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [1289, 1855, 2488], "errorMessage": "transaction type is axfer" }, { "pc": [406, 593, 997, 1689, 2270, 2477, 3448], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDggMiAyNTMwMCA0MTcwMAogICAgYnl0ZWNibG9jayAiZCIgIkVSUjpJUEFZIiAiRVJSOkRCTkUiICJFUlI6WU5DUiIgInUiIDB4MTUxZjdjNzUgIkVSUjpJWEZSIiAiRVJSOkRCQUYiICJFUlI6SU1CUiIgImRpc2J1cnNlbWVudF9pZCIgImFraXRhX2RhbyIgIkVSUjpBTEFFIiAweDAwMDA1ZCAiRVJSOklEVVQiICJFUlI6SURYVCIgIkVSUjpEQkVNIiAiRVJSOkRCTUEiIDB4ODAwMDVkIDB4MDA1ZjAwMDAwMDAwICJFUlI6REJMSyIgIkVSUjpBTE5FIgogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgIGJueiBtYWluX2FmdGVyX2lmX2Vsc2VAMgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1OQogICAgLy8gZGlzYnVyc2VtZW50SUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAxLCBrZXk6IFJld2FyZHNHbG9iYWxTdGF0ZUtleURpc2J1cnNlbWVudElEIH0pCiAgICBieXRlYyA5IC8vICJkaXNidXJzZW1lbnRfaWQiCiAgICBpbnRjXzEgLy8gMQogICAgYXBwX2dsb2JhbF9wdXQKCm1haW5fYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1NAogICAgLy8gZXhwb3J0IGNsYXNzIFJld2FyZHMgZXh0ZW5kcyBjbGFzc2VzKEJhc2VSZXdhcmRzLCBBa2l0YUJhc2VDb250cmFjdCwgQ29udHJhY3RXaXRoT3B0SW4pIHsKICAgIHR4biBPbkNvbXBsZXRpb24KICAgICEKICAgIGFzc2VydAogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgIGJ6IG1haW5fY3JlYXRlX05vT3BAMjMKICAgIHB1c2hieXRlc3MgMHg2NjYxMjA1YSAweGQ2MWE2OWZhIDB4MWM5ZWJiZGIgMHg4ZjQ5MjYyZCAweDU2NTZhY2Y5IDB4ZjYyY2RjMmIgMHg2ZjVjMTBjZiAweDU0MjRhNTkxIDB4N2I3ZGM1ZmMgMHhhZjFhMTRmMiAweDNlYzQwYWE0IDB4YmQzY2QwOTAgMHgxNDk2OWQ5NyAweDMzZTkyYzk0IDB4ODU0ZGVkZTAgMHhkNTRiYmFkOSAweDM5NGVhZWIyIC8vIG1ldGhvZCAiZnVuZE1ickNyZWRpdHModWludDY0LHBheSl2b2lkIiwgbWV0aG9kICJ3aXRoZHJhd01ickNyZWRpdHModWludDY0LHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJjcmVhdGVEaXNidXJzZW1lbnQocGF5LHN0cmluZyx1aW50NjQsdWludDY0LHN0cmluZyl1aW50NjQiLCBtZXRob2QgImVkaXREaXNidXJzZW1lbnQodWludDY0LHN0cmluZyx1aW50NjQsdWludDY0LHN0cmluZyl2b2lkIiwgbWV0aG9kICJjcmVhdGVVc2VyQWxsb2NhdGlvbnMocGF5LHVpbnQ2NCwoYWRkcmVzcyx1aW50NjQpW10pdm9pZCIsIG1ldGhvZCAiY3JlYXRlQXNhVXNlckFsbG9jYXRpb25zKGF4ZmVyLHVpbnQ2NCwoYWRkcmVzcyx1aW50NjQpW10pdm9pZCIsIG1ldGhvZCAiY3JlYXRlQXNhRGlzYnVyc2VtZW50RnJvbUdyb3VwKHVpbnQ2NCx1aW50NjQsc3RyaW5nLHVpbnQ2NCx1aW50NjQsc3RyaW5nLChhZGRyZXNzLHVpbnQ2NClbXSl1aW50NjQiLCBtZXRob2QgImZpbmFsaXplRGlzYnVyc2VtZW50KHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KHBheSx1aW50NjQsdWludDY0LChhZGRyZXNzLHVpbnQ2NClbXSl1aW50NjQiLCBtZXRob2QgImNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnQocGF5LGF4ZmVyLHVpbnQ2NCx1aW50NjQsKGFkZHJlc3MsdWludDY0KVtdKXVpbnQ2NCIsIG1ldGhvZCAiY2xhaW1SZXdhcmRzKCh1aW50NjQsdWludDY0KVtdKXZvaWQiLCBtZXRob2QgInJlY2xhaW1SZXdhcmRzKHVpbnQ2NCwoYWRkcmVzcyx1aW50NjQpW10pdm9pZCIsIG1ldGhvZCAiYWxsb2NhdGlvbk1ickNyZWRpdFNob3J0ZmFsbCh1aW50NjQsdWludDY0KXVpbnQ2NCIsIG1ldGhvZCAidXBkYXRlQWtpdGFEQU8odWludDY0KXZvaWQiLCBtZXRob2QgIm9wVXAoKXZvaWQiLCBtZXRob2QgIm1icihzdHJpbmcsc3RyaW5nKSh1aW50NjQsdWludDY0KSIsIG1ldGhvZCAib3B0SW4ocGF5LHVpbnQ2NCl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggZnVuZE1ickNyZWRpdHMgd2l0aGRyYXdNYnJDcmVkaXRzIGNyZWF0ZURpc2J1cnNlbWVudCBlZGl0RGlzYnVyc2VtZW50IGNyZWF0ZVVzZXJBbGxvY2F0aW9ucyBjcmVhdGVBc2FVc2VyQWxsb2NhdGlvbnMgY3JlYXRlQXNhRGlzYnVyc2VtZW50RnJvbUdyb3VwIGZpbmFsaXplRGlzYnVyc2VtZW50IGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQgY3JlYXRlSW5zdGFudEFzYURpc2J1cnNlbWVudCBjbGFpbVJld2FyZHMgcmVjbGFpbVJld2FyZHMgYWxsb2NhdGlvbk1ickNyZWRpdFNob3J0ZmFsbCB1cGRhdGVBa2l0YURBTyBtYWluX29wVXBfcm91dGVAMTkgbWJyIG9wdEluCiAgICBlcnIKCm1haW5fb3BVcF9yb3V0ZUAxOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQxCiAgICAvLyBvcFVwKCk6IHZvaWQgeyB9CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgptYWluX2NyZWF0ZV9Ob09wQDIzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1NAogICAgLy8gZXhwb3J0IGNsYXNzIFJld2FyZHMgZXh0ZW5kcyBjbGFzc2VzKEJhc2VSZXdhcmRzLCBBa2l0YUJhc2VDb250cmFjdCwgQ29udHJhY3RXaXRoT3B0SW4pIHsKICAgIHB1c2hieXRlcyAweGNkOWFkNjdlIC8vIG1ldGhvZCAiY3JlYXRlKHN0cmluZyx1aW50NjQpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIGNyZWF0ZQogICAgZXJyCgoKLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo6UmV3YXJkcy5jcmVhdGVbcm91dGluZ10oKSAtPiB2b2lkOgpjcmVhdGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjEwNwogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNQogICAgLy8gdmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5VmVyc2lvbiB9KQogICAgcHVzaGJ5dGVzICJ2ZXJzaW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxMDkKICAgIC8vIHRoaXMudmVyc2lvbi52YWx1ZSA9IHZlcnNpb24KICAgIHVuY292ZXIgMgogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWMgMTAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTEwCiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlID0gQXBwbGljYXRpb24oYWtpdGFEQU8pCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxMDcKICAgIC8vIEBhYmltZXRob2QoeyBvbkNyZWF0ZTogJ3JlcXVpcmUnIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo6UmV3YXJkcy5mdW5kTWJyQ3JlZGl0c1tyb3V0aW5nXSgpIC0+IHZvaWQ6CmZ1bmRNYnJDcmVkaXRzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxMTUKICAgIC8vIGZ1bmRNYnJDcmVkaXRzKGlkOiB1aW50NjQsIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4bik6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjExNgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZGlzYnVyc2VtZW50cyhpZCkuZXhpc3RzLCBFUlJfRElTQlVSU0VNRU5UX0RPRVNfTk9UX0VYSVNUKQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2OQogICAgLy8gZGlzYnVyc2VtZW50cyA9IEJveE1hcDx1aW50NjQsIERpc2J1cnNlbWVudERldGFpbHM+KHsga2V5UHJlZml4OiBSZXdhcmRzQm94UHJlZml4RGlzYnVyc2VtZW50cyB9KQogICAgYnl0ZWNfMCAvLyAiZCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjExNgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZGlzYnVyc2VtZW50cyhpZCkuZXhpc3RzLCBFUlJfRElTQlVSU0VNRU5UX0RPRVNfTk9UX0VYSVNUKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogZnVuZE1ickNyZWRpdHNfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjXzIgLy8gIkVSUjpEQk5FIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkRCTkUKCmZ1bmRNYnJDcmVkaXRzX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxMTcKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlLmNyZWF0b3IgPT09IFR4bi5zZW5kZXIsIEVSUl9ZT1VfQVJFX05PVF9USEVfQ1JFQVRPUikKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIHB1c2hpbnQgMzIKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICB0eG4gU2VuZGVyCiAgICA9PQogICAgYm56IGZ1bmRNYnJDcmVkaXRzX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlY18zIC8vICJFUlI6WU5DUiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpZTkNSCgpmdW5kTWJyQ3JlZGl0c19hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTE4CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIEVSUl9JTlZBTElEX1BBWU1FTlQpCiAgICBkaWcgMQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IGZ1bmRNYnJDcmVkaXRzX2FmdGVyX2Fzc2VydEA3CiAgICBieXRlY18xIC8vICJFUlI6SVBBWSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUEFZCgpmdW5kTWJyQ3JlZGl0c19hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTE5CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPiAwLCBFUlJfSU5WQUxJRF9QQVlNRU5UKQogICAgc3dhcAogICAgZ3R4bnMgQW1vdW50CiAgICBkdXAKICAgIGJueiBmdW5kTWJyQ3JlZGl0c19hZnRlcl9hc3NlcnRAOQogICAgYnl0ZWNfMSAvLyAiRVJSOklQQVkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBBWQoKZnVuZE1ickNyZWRpdHNfYWZ0ZXJfYXNzZXJ0QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjg2CiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlLm1ickNyZWRpdHMgKz0gYW1vdW50CiAgICBzd2FwCiAgICBkdXAKICAgIHB1c2hpbnQgNzUKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgdW5jb3ZlciAyCiAgICArCiAgICBpdG9iCiAgICBwdXNoaW50IDc1CiAgICBzd2FwCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxMTUKICAgIC8vIGZ1bmRNYnJDcmVkaXRzKGlkOiB1aW50NjQsIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4bik6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6OlJld2FyZHMud2l0aGRyYXdNYnJDcmVkaXRzW3JvdXRpbmddKCkgLT4gdm9pZDoKd2l0aGRyYXdNYnJDcmVkaXRzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxMjQKICAgIC8vIHdpdGhkcmF3TWJyQ3JlZGl0cyhpZDogdWludDY0LCBhbW91bnQ6IHVpbnQ2NCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxMjUKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmRpc2J1cnNlbWVudHMoaWQpLmV4aXN0cywgRVJSX0RJU0JVUlNFTUVOVF9ET0VTX05PVF9FWElTVCkKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NjkKICAgIC8vIGRpc2J1cnNlbWVudHMgPSBCb3hNYXA8dWludDY0LCBEaXNidXJzZW1lbnREZXRhaWxzPih7IGtleVByZWZpeDogUmV3YXJkc0JveFByZWZpeERpc2J1cnNlbWVudHMgfSkKICAgIGJ5dGVjXzAgLy8gImQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxMjUKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmRpc2J1cnNlbWVudHMoaWQpLmV4aXN0cywgRVJSX0RJU0JVUlNFTUVOVF9ET0VTX05PVF9FWElTVCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHdpdGhkcmF3TWJyQ3JlZGl0c19hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWNfMiAvLyAiRVJSOkRCTkUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6REJORQoKd2l0aGRyYXdNYnJDcmVkaXRzX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxMjYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlLmNyZWF0b3IgPT09IFR4bi5zZW5kZXIsIEVSUl9ZT1VfQVJFX05PVF9USEVfQ1JFQVRPUikKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIHB1c2hpbnQgMzIKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICB0eG4gU2VuZGVyCiAgICA9PQogICAgYm56IHdpdGhkcmF3TWJyQ3JlZGl0c19hZnRlcl9hc3NlcnRANQogICAgYnl0ZWNfMyAvLyAiRVJSOllOQ1IiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6WU5DUgoKd2l0aGRyYXdNYnJDcmVkaXRzX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxMjcKICAgIC8vIGxvZ2dlZEFzc2VydChhbW91bnQgPiAwLCBFUlJfSU5WQUxJRF9NQlJfQU1PVU5UKQogICAgZGlnIDEKICAgIGJueiB3aXRoZHJhd01ickNyZWRpdHNfYWZ0ZXJfYXNzZXJ0QDcKICAgIGJ5dGVjIDggLy8gIkVSUjpJTUJSIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklNQlIKCndpdGhkcmF3TWJyQ3JlZGl0c19hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTI4CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZS5tYnJDcmVkaXRzID49IGFtb3VudCwgRVJSX0lOVkFMSURfTUJSX0FNT1VOVCkKICAgIGR1cAogICAgcHVzaGludCA3NQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBkaWcgMgogICAgPj0KICAgIGJueiB3aXRoZHJhd01ickNyZWRpdHNfYWZ0ZXJfYXNzZXJ0QDkKICAgIGJ5dGVjIDggLy8gIkVSUjpJTUJSIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklNQlIKCndpdGhkcmF3TWJyQ3JlZGl0c19hZnRlcl9hc3NlcnRAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTI5CiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlLm1ickNyZWRpdHMgLT0gYW1vdW50CiAgICBkdXAKICAgIHB1c2hpbnQgNzUKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgdW5jb3ZlciAyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIC0KICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgcHVzaGludCA3NQogICAgdW5jb3ZlciAyCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxMzEtMTM0CiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgYW1vdW50LAogICAgLy8gfSkuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTMyCiAgICAvLyByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjEzMS0xMzQKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICBhbW91bnQsCiAgICAvLyB9KS5zdWJtaXQoKQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTI0CiAgICAvLyB3aXRoZHJhd01ickNyZWRpdHMoaWQ6IHVpbnQ2NCwgYW1vdW50OiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjpSZXdhcmRzLmNyZWF0ZURpc2J1cnNlbWVudFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNyZWF0ZURpc2J1cnNlbWVudDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTM3LTE0MwogICAgLy8gY3JlYXRlRGlzYnVyc2VtZW50KAogICAgLy8gICBtYnJQYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIHRpdGxlOiBzdHJpbmcsCiAgICAvLyAgIHRpbWVUb1VubG9jazogdWludDY0LAogICAgLy8gICBleHBpcmF0aW9uOiB1aW50NjQsCiAgICAvLyAgIG5vdGU6IHN0cmluZwogICAgLy8gKTogdWludDY0IHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwbiAyCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIGR1cAogICAgY292ZXIgMwogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgMwogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgMwogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIGR1cAogICAgY292ZXIgNAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxNDQKICAgIC8vIGNvbnN0IGlkID0gdGhpcy5uZXdEaXNidXJzZW1lbnRJRCgpCiAgICBjYWxsc3ViIG5ld0Rpc2J1cnNlbWVudElECiAgICBjb3ZlciA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjE0NgogICAgLy8gY29uc3QgY29zdHMgPSB0aGlzLm1icih0aXRsZSwgbm90ZSkKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL3Jld2FyZHMvYmFzZS50czo6QmFzZVJld2FyZHMubWJyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjE0NwogICAgLy8gY29uc3QgbWJyQW1vdW50ID0gY29zdHMuZGlzYnVyc2VtZW50cwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjE0OQogICAgLy8gbG9nZ2VkQXNzZXJ0KG1iclBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfSU5WQUxJRF9QQVlNRU5UKQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IGNyZWF0ZURpc2J1cnNlbWVudF9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWNfMSAvLyAiRVJSOklQQVkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBBWQoKY3JlYXRlRGlzYnVyc2VtZW50X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxNTAKICAgIC8vIGxvZ2dlZEFzc2VydChtYnJQYXltZW50LmFtb3VudCA+PSBtYnJBbW91bnQsIEVSUl9JTlZBTElEX1BBWU1FTlQpCiAgICBzd2FwCiAgICBndHhucyBBbW91bnQKICAgIGR1cAogICAgZGlnIDIKICAgID49CiAgICBibnogY3JlYXRlRGlzYnVyc2VtZW50X2FmdGVyX2Fzc2VydEA1CiAgICBieXRlY18xIC8vICJFUlI6SVBBWSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUEFZCgpjcmVhdGVEaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjE1MwogICAgLy8gY3JlYXRvcjogVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTYxCiAgICAvLyBtYnJDcmVkaXRzOiBtYnJQYXltZW50LmFtb3VudCAtIG1ickFtb3VudCwKICAgIHN3YXAKICAgIHVuY292ZXIgMgogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxNTItMTY0CiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlID0gewogICAgLy8gICBjcmVhdG9yOiBUeG4uc2VuZGVyLAogICAgLy8gICBmaW5hbGl6ZWQ6IGZhbHNlLAogICAgLy8gICB0aXRsZSwKICAgIC8vICAgYW1vdW50OiAwLAogICAgLy8gICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgIGV4cGlyYXRpb24sCiAgICAvLyAgIGFsbG9jYXRpb25zOiAwLAogICAgLy8gICBkaXN0cmlidXRlZDogMCwKICAgIC8vICAgbWJyQ3JlZGl0czogbWJyUGF5bWVudC5hbW91bnQgLSBtYnJBbW91bnQsCiAgICAvLyAgIHVzZWRNYnJDcmVkaXRzOiAwLAogICAgLy8gICBub3RlLAogICAgLy8gfQogICAgdW5jb3ZlciA2CiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBieXRlYyAxMiAvLyAweDAwMDA1ZAogICAgY29uY2F0CiAgICBkaWcgMQogICAgbGVuCiAgICBwdXNoaW50IDkzCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjE1NgogICAgLy8gYW1vdW50OiAwLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTUyLTE2NAogICAgLy8gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZSA9IHsKICAgIC8vICAgY3JlYXRvcjogVHhuLnNlbmRlciwKICAgIC8vICAgZmluYWxpemVkOiBmYWxzZSwKICAgIC8vICAgdGl0bGUsCiAgICAvLyAgIGFtb3VudDogMCwKICAgIC8vICAgdGltZVRvVW5sb2NrLAogICAgLy8gICBleHBpcmF0aW9uLAogICAgLy8gICBhbGxvY2F0aW9uczogMCwKICAgIC8vICAgZGlzdHJpYnV0ZWQ6IDAsCiAgICAvLyAgIG1ickNyZWRpdHM6IG1iclBheW1lbnQuYW1vdW50IC0gbWJyQW1vdW50LAogICAgLy8gICB1c2VkTWJyQ3JlZGl0czogMCwKICAgIC8vICAgbm90ZSwKICAgIC8vIH0KICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgZGlnIDEKICAgIGNvbmNhdAogICAgdW5jb3ZlciA4CiAgICBpdG9iCiAgICBjb25jYXQKICAgIHVuY292ZXIgNwogICAgaXRvYgogICAgY29uY2F0CiAgICBkaWcgMQogICAgY29uY2F0CiAgICBkaWcgMQogICAgY29uY2F0CiAgICB1bmNvdmVyIDQKICAgIGl0b2IKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICB1bmNvdmVyIDQKICAgIGR1cAogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgc3dhcAogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxNTIKICAgIC8vIHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUgPSB7CiAgICBzd2FwCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjY5CiAgICAvLyBkaXNidXJzZW1lbnRzID0gQm94TWFwPHVpbnQ2NCwgRGlzYnVyc2VtZW50RGV0YWlscz4oeyBrZXlQcmVmaXg6IFJld2FyZHNCb3hQcmVmaXhEaXNidXJzZW1lbnRzIH0pCiAgICBieXRlY18wIC8vICJkIgogICAgZGlnIDEKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxNTItMTY0CiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlID0gewogICAgLy8gICBjcmVhdG9yOiBUeG4uc2VuZGVyLAogICAgLy8gICBmaW5hbGl6ZWQ6IGZhbHNlLAogICAgLy8gICB0aXRsZSwKICAgIC8vICAgYW1vdW50OiAwLAogICAgLy8gICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgIGV4cGlyYXRpb24sCiAgICAvLyAgIGFsbG9jYXRpb25zOiAwLAogICAgLy8gICBkaXN0cmlidXRlZDogMCwKICAgIC8vICAgbWJyQ3JlZGl0czogbWJyUGF5bWVudC5hbW91bnQgLSBtYnJBbW91bnQsCiAgICAvLyAgIHVzZWRNYnJDcmVkaXRzOiAwLAogICAgLy8gICBub3RlLAogICAgLy8gfQogICAgZHVwCiAgICBib3hfZGVsCiAgICBwb3AKICAgIHVuY292ZXIgMgogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxMzctMTQzCiAgICAvLyBjcmVhdGVEaXNidXJzZW1lbnQoCiAgICAvLyAgIG1iclBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgdGl0bGU6IHN0cmluZywKICAgIC8vICAgdGltZVRvVW5sb2NrOiB1aW50NjQsCiAgICAvLyAgIGV4cGlyYXRpb246IHVpbnQ2NCwKICAgIC8vICAgbm90ZTogc3RyaW5nCiAgICAvLyApOiB1aW50NjQgewogICAgYnl0ZWMgNSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6OlJld2FyZHMuZWRpdERpc2J1cnNlbWVudFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmVkaXREaXNidXJzZW1lbnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjE2OS0xNzUKICAgIC8vIGVkaXREaXNidXJzZW1lbnQoCiAgICAvLyAgIGlkOiB1aW50NjQsCiAgICAvLyAgIHRpdGxlOiBzdHJpbmcsCiAgICAvLyAgIHRpbWVUb1VubG9jazogdWludDY0LAogICAgLy8gICBleHBpcmF0aW9uOiB1aW50NjQsCiAgICAvLyAgIG5vdGU6IHN0cmluZwogICAgLy8gKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgIGR1cAogICAgY292ZXIgMwogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA1CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxNzYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmRpc2J1cnNlbWVudHMoaWQpLmV4aXN0cywgRVJSX0RJU0JVUlNFTUVOVF9ET0VTX05PVF9FWElTVCkKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NjkKICAgIC8vIGRpc2J1cnNlbWVudHMgPSBCb3hNYXA8dWludDY0LCBEaXNidXJzZW1lbnREZXRhaWxzPih7IGtleVByZWZpeDogUmV3YXJkc0JveFByZWZpeERpc2J1cnNlbWVudHMgfSkKICAgIGJ5dGVjXzAgLy8gImQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxNzYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmRpc2J1cnNlbWVudHMoaWQpLmV4aXN0cywgRVJSX0RJU0JVUlNFTUVOVF9ET0VTX05PVF9FWElTVCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGVkaXREaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjXzIgLy8gIkVSUjpEQk5FIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkRCTkUKCmVkaXREaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjE3OAogICAgLy8gY29uc3QgeyBjcmVhdG9yLCBmaW5hbGl6ZWQgfSA9IHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUKICAgIGR1cG4gMgogICAgaW50Y18wIC8vIDAKICAgIHB1c2hpbnQgMzIKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBzd2FwCiAgICBwdXNoaW50IDMyCiAgICBpbnRjXzEgLy8gMQogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTc5CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gY3JlYXRvciwgRVJSX1lPVV9BUkVfTk9UX1RIRV9DUkVBVE9SKQogICAgdHhuIFNlbmRlcgogICAgPT0KICAgIGJueiBlZGl0RGlzYnVyc2VtZW50X2FmdGVyX2Fzc2VydEA1CiAgICBieXRlY18zIC8vICJFUlI6WU5DUiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpZTkNSCgplZGl0RGlzYnVyc2VtZW50X2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxODAKICAgIC8vIGxvZ2dlZEFzc2VydChmaW5hbGl6ZWQgPT09IGZhbHNlLCBFUlJfRElTQlVSU0VNRU5UX0FMUkVBRFlfRklOQUwpCiAgICBieiBlZGl0RGlzYnVyc2VtZW50X2FmdGVyX2Fzc2VydEA3CiAgICBieXRlYyA3IC8vICJFUlI6REJBRiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpEQkFGCgplZGl0RGlzYnVyc2VtZW50X2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxODIKICAgIC8vIHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUudGl0bGUgPSB0aXRsZQogICAgZHVwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZHVwCiAgICBwdXNoaW50IDMzCiAgICBleHRyYWN0X3VpbnQxNgogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBkaWcgMgogICAgZXh0cmFjdDMKICAgIHVuY292ZXIgOAogICAgY29uY2F0CiAgICBkaWcgMgogICAgcHVzaGludCA5MQogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyAzCiAgICBsZW4KICAgIHVuY292ZXIgNAogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgc3Vic3RyaW5nMwogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGRpZyAxCiAgICB1bmNvdmVyIDMKICAgIC0KICAgIHVuY292ZXIgMgogICAgdW5jb3ZlciA3CiAgICArCiAgICBzd2FwCiAgICAtCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgcmVwbGFjZTIgOTEKICAgIGRpZyAxCiAgICBib3hfZGVsCiAgICBwb3AKICAgIGRpZyAxCiAgICBzd2FwCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjE4MwogICAgLy8gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZS50aW1lVG9VbmxvY2sgPSB0aW1lVG9VbmxvY2sKICAgIGR1cAogICAgcHVzaGludCA0MwogICAgdW5jb3ZlciA1CiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxODQKICAgIC8vIHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUuZXhwaXJhdGlvbiA9IGV4cGlyYXRpb24KICAgIGR1cAogICAgcHVzaGludCA1MQogICAgdW5jb3ZlciA0CiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxODUKICAgIC8vIHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUubm90ZSA9IG5vdGUKICAgIGR1cAogICAgYm94X2dldAogICAgcG9wCiAgICBkdXAKICAgIHB1c2hpbnQgOTEKICAgIGV4dHJhY3RfdWludDE2CiAgICBpbnRjXzAgLy8gMAogICAgc3dhcAogICAgZXh0cmFjdDMKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICBkaWcgMQogICAgYm94X2RlbAogICAgcG9wCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjE2OS0xNzUKICAgIC8vIGVkaXREaXNidXJzZW1lbnQoCiAgICAvLyAgIGlkOiB1aW50NjQsCiAgICAvLyAgIHRpdGxlOiBzdHJpbmcsCiAgICAvLyAgIHRpbWVUb1VubG9jazogdWludDY0LAogICAgLy8gICBleHBpcmF0aW9uOiB1aW50NjQsCiAgICAvLyAgIG5vdGU6IHN0cmluZwogICAgLy8gKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo6UmV3YXJkcy5jcmVhdGVVc2VyQWxsb2NhdGlvbnNbcm91dGluZ10oKSAtPiB2b2lkOgpjcmVhdGVVc2VyQWxsb2NhdGlvbnM6CiAgICBpbnRjXzAgLy8gMAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjE4OC0xOTIKICAgIC8vIGNyZWF0ZVVzZXJBbGxvY2F0aW9ucygKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBpZDogdWludDY0LAogICAgLy8gICBhbGxvY2F0aW9uczogVXNlckFsbG9jYXRpb25bXQogICAgLy8gKTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgY292ZXIgMgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBjb3ZlciAzCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIHB1c2hpbnQgNDAKICAgICoKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxzbWFydF9jb250cmFjdHMvcmV3YXJkcy90eXBlcy50czo6VXNlckFsbG9jYXRpb24+CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjE5MwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZGlzYnVyc2VtZW50cyhpZCkuZXhpc3RzLCBFUlJfRElTQlVSU0VNRU5UX0RPRVNfTk9UX0VYSVNUKQogICAgaXRvYgogICAgZHVwCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjY5CiAgICAvLyBkaXNidXJzZW1lbnRzID0gQm94TWFwPHVpbnQ2NCwgRGlzYnVyc2VtZW50RGV0YWlscz4oeyBrZXlQcmVmaXg6IFJld2FyZHNCb3hQcmVmaXhEaXNidXJzZW1lbnRzIH0pCiAgICBieXRlY18wIC8vICJkIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTkzCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5kaXNidXJzZW1lbnRzKGlkKS5leGlzdHMsIEVSUl9ESVNCVVJTRU1FTlRfRE9FU19OT1RfRVhJU1QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBjcmVhdGVVc2VyQWxsb2NhdGlvbnNfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjXzIgLy8gIkVSUjpEQk5FIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkRCTkUKCmNyZWF0ZVVzZXJBbGxvY2F0aW9uc19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTk1CiAgICAvLyBjb25zdCB7IGNyZWF0b3IsIGZpbmFsaXplZCwgdGl0bGUsIG5vdGUgfSA9IHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUKICAgIGR1cG4gMgogICAgaW50Y18wIC8vIDAKICAgIHB1c2hpbnQgMzIKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBkaWcgMQogICAgcHVzaGludCAzMgogICAgaW50Y18xIC8vIDEKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Yml0CiAgICBjb3ZlciAzCiAgICBkaWcgMQogICAgcHVzaGludCA5MwogICAgaW50Y18zIC8vIDIKICAgIGJveF9leHRyYWN0CiAgICBidG9pCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDIKICAgIHB1c2hpbnQgOTMKICAgIHVuY292ZXIgMgogICAgYm94X2V4dHJhY3QKICAgIGV4dHJhY3QgMiAwCiAgICBidXJ5IDEwCiAgICBkaWcgMQogICAgcHVzaGludCA5MQogICAgaW50Y18zIC8vIDIKICAgIGJveF9leHRyYWN0CiAgICBidG9pCiAgICBkaWcgMgogICAgZGlnIDEKICAgIGludGNfMyAvLyAyCiAgICBib3hfZXh0cmFjdAogICAgYnRvaQogICAgaW50Y18zIC8vIDIKICAgICsKICAgIHVuY292ZXIgMwogICAgY292ZXIgMgogICAgYm94X2V4dHJhY3QKICAgIGV4dHJhY3QgMiAwCiAgICBidXJ5IDEwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjE5NgogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IGNyZWF0b3IsIEVSUl9ZT1VfQVJFX05PVF9USEVfQ1JFQVRPUikKICAgIHR4biBTZW5kZXIKICAgID09CiAgICBibnogY3JlYXRlVXNlckFsbG9jYXRpb25zX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlY18zIC8vICJFUlI6WU5DUiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpZTkNSCgpjcmVhdGVVc2VyQWxsb2NhdGlvbnNfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjE5NwogICAgLy8gbG9nZ2VkQXNzZXJ0KCFmaW5hbGl6ZWQsIEVSUl9ESVNCVVJTRU1FTlRfQUxSRUFEWV9GSU5BTCkKICAgIHN3YXAKICAgIGJ6IGNyZWF0ZVVzZXJBbGxvY2F0aW9uc19hZnRlcl9hc3NlcnRANwogICAgYnl0ZWMgNyAvLyAiRVJSOkRCQUYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6REJBRgoKY3JlYXRlVXNlckFsbG9jYXRpb25zX2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxOTkKICAgIC8vIGxldCBzdW06IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjIwMAogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGFsbG9jYXRpb25zLmxlbmd0aDsgaSArPSAxKSB7CiAgICBpbnRjXzAgLy8gMAogICAgc3dhcAoKY3JlYXRlVXNlckFsbG9jYXRpb25zX3doaWxlX3RvcEA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyMDAKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBhbGxvY2F0aW9ucy5sZW5ndGg7IGkgKz0gMSkgewogICAgZGlnIDEKICAgIGRpZyA0CiAgICA8CiAgICBieiBjcmVhdGVVc2VyQWxsb2NhdGlvbnNfYWZ0ZXJfd2hpbGVAMTIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjAzCiAgICAvLyBhZGRyZXNzOiBhbGxvY2F0aW9uc1tpXS5hZGRyZXNzLAogICAgZGlnIDYKICAgIGV4dHJhY3QgMiAwCiAgICBkaWcgMgogICAgcHVzaGludCA0MAogICAgKgogICAgcHVzaGludCA0MAogICAgZXh0cmFjdDMgLy8gb24gZXJyb3I6IGluZGV4IGFjY2VzcyBpcyBvdXQgb2YgYm91bmRzCiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyMDQKICAgIC8vIGFzc2V0OiAwLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjAxLTIwNQogICAgLy8gY29uc3QgdXNlckFsbG9jYXRpb25zS2V5OiBVc2VyQWxsb2NhdGlvbnNLZXkgPSB7CiAgICAvLyAgIGRpc2J1cnNlbWVudElEOiBpZCwKICAgIC8vICAgYWRkcmVzczogYWxsb2NhdGlvbnNbaV0uYWRkcmVzcywKICAgIC8vICAgYXNzZXQ6IDAsCiAgICAvLyB9CiAgICBpdG9iCiAgICBjb25jYXQKICAgIGRpZyA3CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NzUKICAgIC8vIHVzZXJBbGxvY2F0aW9ucyA9IEJveE1hcDxVc2VyQWxsb2NhdGlvbnNLZXksIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFJld2FyZHNCb3hQcmVmaXhVc2VyQWxsb2NhdGlvbnMgfSkKICAgIGJ5dGVjIDQgLy8gInUiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyMDcKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy51c2VyQWxsb2NhdGlvbnModXNlckFsbG9jYXRpb25zS2V5KS5leGlzdHMsIEVSUl9BTExPQ0FUSU9OX0FMUkVBRFlfRVhJU1RTKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBjcmVhdGVVc2VyQWxsb2NhdGlvbnNfYWZ0ZXJfYXNzZXJ0QDExCiAgICBieXRlYyAxMSAvLyAiRVJSOkFMQUUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6QUxBRQoKY3JlYXRlVXNlckFsbG9jYXRpb25zX2FmdGVyX2Fzc2VydEAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjA5CiAgICAvLyB0aGlzLnVzZXJBbGxvY2F0aW9ucyh1c2VyQWxsb2NhdGlvbnNLZXkpLnZhbHVlID0gYWxsb2NhdGlvbnNbaV0uYW1vdW50CiAgICBzd2FwCiAgICBwdXNoaW50IDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBpdG9iCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjEwCiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlLmFsbG9jYXRpb25zICs9IDEKICAgIGRpZyAxCiAgICBkdXAKICAgIHB1c2hpbnQgNTkKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGl0b2IKICAgIGRpZyAxCiAgICBwdXNoaW50IDU5CiAgICB1bmNvdmVyIDIKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjIxMQogICAgLy8gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZS5hbW91bnQgKz0gYWxsb2NhdGlvbnNbaV0uYW1vdW50CiAgICBkdXAKICAgIHB1c2hpbnQgMzUKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgZGlnIDIKICAgICsKICAgIGl0b2IKICAgIHB1c2hpbnQgMzUKICAgIHN3YXAKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjIxMwogICAgLy8gc3VtICs9IGFsbG9jYXRpb25zW2ldLmFtb3VudAogICAgdW5jb3ZlciAzCiAgICArCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjIwMAogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGFsbG9jYXRpb25zLmxlbmd0aDsgaSArPSAxKSB7CiAgICBzd2FwCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgc3dhcAogICAgYiBjcmVhdGVVc2VyQWxsb2NhdGlvbnNfd2hpbGVfdG9wQDgKCmNyZWF0ZVVzZXJBbGxvY2F0aW9uc19hZnRlcl93aGlsZUAxMjoKICAgIHBvcG4gMgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyMTYKICAgIC8vIGNvbnN0IGNvc3RzID0gdGhpcy5tYnIodGl0bGUsIG5vdGUpCiAgICBkaWcgNgogICAgZGlnIDgKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL3Jld2FyZHMvYmFzZS50czo6QmFzZVJld2FyZHMubWJyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjIxNwogICAgLy8gY29uc3QgbWJyQW1vdW50OiB1aW50NjQgPSBjb3N0cy51c2VyQWxsb2NhdGlvbnMgKiBhbGxvY2F0aW9ucy5sZW5ndGgKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgdW5jb3ZlciAyCiAgICAqCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjIxOAogICAgLy8gdGhpcy51c2VNYnJDcmVkaXQoaWQsIG1ickFtb3VudCkKICAgIGRpZyA1CiAgICBzd2FwCiAgICBjYWxsc3ViIHVzZU1ickNyZWRpdAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyMjAKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgRVJSX0lOVkFMSURfUEFZTUVOVCkKICAgIGRpZyAxCiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogY3JlYXRlVXNlckFsbG9jYXRpb25zX2FmdGVyX2Fzc2VydEAxNAogICAgYnl0ZWNfMSAvLyAiRVJSOklQQVkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBBWQoKY3JlYXRlVXNlckFsbG9jYXRpb25zX2FmdGVyX2Fzc2VydEAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjIxCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IHN1bSwgRVJSX0lOVkFMSURfUEFZTUVOVCkKICAgIHN3YXAKICAgIGd0eG5zIEFtb3VudAogICAgPT0KICAgIGJueiBjcmVhdGVVc2VyQWxsb2NhdGlvbnNfYWZ0ZXJfYXNzZXJ0QDE2CiAgICBieXRlY18xIC8vICJFUlI6SVBBWSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUEFZCgpjcmVhdGVVc2VyQWxsb2NhdGlvbnNfYWZ0ZXJfYXNzZXJ0QDE2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxODgtMTkyCiAgICAvLyBjcmVhdGVVc2VyQWxsb2NhdGlvbnMoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgaWQ6IHVpbnQ2NCwKICAgIC8vICAgYWxsb2NhdGlvbnM6IFVzZXJBbGxvY2F0aW9uW10KICAgIC8vICk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6OlJld2FyZHMuY3JlYXRlQXNhVXNlckFsbG9jYXRpb25zW3JvdXRpbmddKCkgLT4gdm9pZDoKY3JlYXRlQXNhVXNlckFsbG9jYXRpb25zOgogICAgaW50Y18wIC8vIDAKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyMjQtMjI4CiAgICAvLyBjcmVhdGVBc2FVc2VyQWxsb2NhdGlvbnMoCiAgICAvLyAgIGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICBpZDogdWludDY0LAogICAgLy8gICBhbGxvY2F0aW9uczogVXNlckFsbG9jYXRpb25bXQogICAgLy8gKTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNCAvLyBheGZlcgogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGF4ZmVyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgY292ZXIgMwogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgZHVwCiAgICBjb3ZlciAzCiAgICBwdXNoaW50IDQwCiAgICAqCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8c21hcnRfY29udHJhY3RzL3Jld2FyZHMvdHlwZXMudHM6OlVzZXJBbGxvY2F0aW9uPgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyMjkKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmRpc2J1cnNlbWVudHMoaWQpLmV4aXN0cywgRVJSX0RJU0JVUlNFTUVOVF9ET0VTX05PVF9FWElTVCkKICAgIGl0b2IKICAgIGR1cAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2OQogICAgLy8gZGlzYnVyc2VtZW50cyA9IEJveE1hcDx1aW50NjQsIERpc2J1cnNlbWVudERldGFpbHM+KHsga2V5UHJlZml4OiBSZXdhcmRzQm94UHJlZml4RGlzYnVyc2VtZW50cyB9KQogICAgYnl0ZWNfMCAvLyAiZCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjIyOQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZGlzYnVyc2VtZW50cyhpZCkuZXhpc3RzLCBFUlJfRElTQlVSU0VNRU5UX0RPRVNfTk9UX0VYSVNUKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogY3JlYXRlQXNhVXNlckFsbG9jYXRpb25zX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlY18yIC8vICJFUlI6REJORSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpEQk5FCgpjcmVhdGVBc2FVc2VyQWxsb2NhdGlvbnNfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjIzMQogICAgLy8gY29uc3QgeyBjcmVhdG9yLCBmaW5hbGl6ZWQsIHRpdGxlLCBub3RlIH0gPSB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlCiAgICBkdXBuIDIKICAgIGludGNfMCAvLyAwCiAgICBwdXNoaW50IDMyCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgZGlnIDEKICAgIHB1c2hpbnQgMzIKICAgIGludGNfMSAvLyAxCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgY292ZXIgMwogICAgZGlnIDEKICAgIHB1c2hpbnQgOTMKICAgIGludGNfMyAvLyAyCiAgICBib3hfZXh0cmFjdAogICAgYnRvaQogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAyCiAgICBwdXNoaW50IDkzCiAgICB1bmNvdmVyIDIKICAgIGJveF9leHRyYWN0CiAgICBleHRyYWN0IDIgMAogICAgYnVyeSAxMAogICAgZGlnIDEKICAgIHB1c2hpbnQgOTEKICAgIGludGNfMyAvLyAyCiAgICBib3hfZXh0cmFjdAogICAgYnRvaQogICAgZGlnIDIKICAgIGRpZyAxCiAgICBpbnRjXzMgLy8gMgogICAgYm94X2V4dHJhY3QKICAgIGJ0b2kKICAgIGludGNfMyAvLyAyCiAgICArCiAgICB1bmNvdmVyIDMKICAgIGNvdmVyIDIKICAgIGJveF9leHRyYWN0CiAgICBleHRyYWN0IDIgMAogICAgYnVyeSAxMAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyMzIKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSBjcmVhdG9yLCBFUlJfWU9VX0FSRV9OT1RfVEhFX0NSRUFUT1IpCiAgICB0eG4gU2VuZGVyCiAgICA9PQogICAgYm56IGNyZWF0ZUFzYVVzZXJBbGxvY2F0aW9uc19hZnRlcl9hc3NlcnRANQogICAgYnl0ZWNfMyAvLyAiRVJSOllOQ1IiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6WU5DUgoKY3JlYXRlQXNhVXNlckFsbG9jYXRpb25zX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyMzMKICAgIC8vIGxvZ2dlZEFzc2VydCghZmluYWxpemVkLCBFUlJfRElTQlVSU0VNRU5UX0FMUkVBRFlfRklOQUwpCiAgICBzd2FwCiAgICBieiBjcmVhdGVBc2FVc2VyQWxsb2NhdGlvbnNfYWZ0ZXJfYXNzZXJ0QDcKICAgIGJ5dGVjIDcgLy8gIkVSUjpEQkFGIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkRCQUYKCmNyZWF0ZUFzYVVzZXJBbGxvY2F0aW9uc19hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjM1CiAgICAvLyBsZXQgbWF0Y2hTdW06IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjIzNgogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGFsbG9jYXRpb25zLmxlbmd0aDsgaSArPSAxKSB7CiAgICBpbnRjXzAgLy8gMAogICAgc3dhcAoKY3JlYXRlQXNhVXNlckFsbG9jYXRpb25zX3doaWxlX3RvcEA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyMzYKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBhbGxvY2F0aW9ucy5sZW5ndGg7IGkgKz0gMSkgewogICAgZGlnIDEKICAgIGRpZyA0CiAgICA8CiAgICBieiBjcmVhdGVBc2FVc2VyQWxsb2NhdGlvbnNfYWZ0ZXJfd2hpbGVAMTIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjM5CiAgICAvLyBhZGRyZXNzOiBhbGxvY2F0aW9uc1tpXS5hZGRyZXNzLAogICAgZGlnIDYKICAgIGV4dHJhY3QgMiAwCiAgICBkaWcgMgogICAgcHVzaGludCA0MAogICAgKgogICAgcHVzaGludCA0MAogICAgZXh0cmFjdDMgLy8gb24gZXJyb3I6IGluZGV4IGFjY2VzcyBpcyBvdXQgb2YgYm91bmRzCiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyNDAKICAgIC8vIGFzc2V0OiBhc3NldFhmZXIueGZlckFzc2V0LmlkLAogICAgZGlnIDYKICAgIGd0eG5zIFhmZXJBc3NldAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyMzctMjQxCiAgICAvLyBjb25zdCB1c2VyQWxsb2NhdGlvbnNLZXk6IFVzZXJBbGxvY2F0aW9uc0tleSA9IHsKICAgIC8vICAgZGlzYnVyc2VtZW50SUQ6IGlkLAogICAgLy8gICBhZGRyZXNzOiBhbGxvY2F0aW9uc1tpXS5hZGRyZXNzLAogICAgLy8gICBhc3NldDogYXNzZXRYZmVyLnhmZXJBc3NldC5pZCwKICAgIC8vIH0KICAgIGl0b2IKICAgIGNvbmNhdAogICAgZGlnIDcKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo3NQogICAgLy8gdXNlckFsbG9jYXRpb25zID0gQm94TWFwPFVzZXJBbGxvY2F0aW9uc0tleSwgdWludDY0Pih7IGtleVByZWZpeDogUmV3YXJkc0JveFByZWZpeFVzZXJBbGxvY2F0aW9ucyB9KQogICAgYnl0ZWMgNCAvLyAidSIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjI0MgogICAgLy8gbG9nZ2VkQXNzZXJ0KCF0aGlzLnVzZXJBbGxvY2F0aW9ucyh1c2VyQWxsb2NhdGlvbnNLZXkpLmV4aXN0cywgRVJSX0FMTE9DQVRJT05fQUxSRUFEWV9FWElTVFMpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGNyZWF0ZUFzYVVzZXJBbGxvY2F0aW9uc19hZnRlcl9hc3NlcnRAMTEKICAgIGJ5dGVjIDExIC8vICJFUlI6QUxBRSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpBTEFFCgpjcmVhdGVBc2FVc2VyQWxsb2NhdGlvbnNfYWZ0ZXJfYXNzZXJ0QDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyNDQKICAgIC8vIHRoaXMudXNlckFsbG9jYXRpb25zKHVzZXJBbGxvY2F0aW9uc0tleSkudmFsdWUgPSBhbGxvY2F0aW9uc1tpXS5hbW91bnQKICAgIHN3YXAKICAgIHB1c2hpbnQgMzIKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyNDYKICAgIC8vIHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUuYWxsb2NhdGlvbnMgKz0gMQogICAgZGlnIDEKICAgIGR1cAogICAgcHVzaGludCA1OQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgaXRvYgogICAgZGlnIDEKICAgIHB1c2hpbnQgNTkKICAgIHVuY292ZXIgMgogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjQ3CiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlLmFtb3VudCArPSBhbGxvY2F0aW9uc1tpXS5hbW91bnQKICAgIGR1cAogICAgcHVzaGludCAzNQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBkaWcgMgogICAgKwogICAgaXRvYgogICAgcHVzaGludCAzNQogICAgc3dhcAogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjQ5CiAgICAvLyBtYXRjaFN1bSArPSBhbGxvY2F0aW9uc1tpXS5hbW91bnQKICAgIHVuY292ZXIgMwogICAgKwogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyMzYKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBhbGxvY2F0aW9ucy5sZW5ndGg7IGkgKz0gMSkgewogICAgc3dhcAogICAgaW50Y18xIC8vIDEKICAgICsKICAgIHN3YXAKICAgIGIgY3JlYXRlQXNhVXNlckFsbG9jYXRpb25zX3doaWxlX3RvcEA4CgpjcmVhdGVBc2FVc2VyQWxsb2NhdGlvbnNfYWZ0ZXJfd2hpbGVAMTI6CiAgICBwb3BuIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjUyCiAgICAvLyBjb25zdCBjb3N0cyA9IHRoaXMubWJyKHRpdGxlLCBub3RlKQogICAgZGlnIDYKICAgIGRpZyA4CiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2Jhc2UudHM6OkJhc2VSZXdhcmRzLm1icgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyNTMKICAgIC8vIGNvbnN0IG1ickFtb3VudDogdWludDY0ID0gY29zdHMudXNlckFsbG9jYXRpb25zICogYWxsb2NhdGlvbnMubGVuZ3RoCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIHVuY292ZXIgMgogICAgKgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyNTQKICAgIC8vIHRoaXMudXNlTWJyQ3JlZGl0KGlkLCBtYnJBbW91bnQpCiAgICBkaWcgNQogICAgc3dhcAogICAgY2FsbHN1YiB1c2VNYnJDcmVkaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjU2CiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLmFzc2V0UmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfSU5WQUxJRF9UUkFOU0ZFUikKICAgIGRpZyAxCiAgICBndHhucyBBc3NldFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBjcmVhdGVBc2FVc2VyQWxsb2NhdGlvbnNfYWZ0ZXJfYXNzZXJ0QDE0CiAgICBieXRlYyA2IC8vICJFUlI6SVhGUiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJWEZSCgpjcmVhdGVBc2FVc2VyQWxsb2NhdGlvbnNfYWZ0ZXJfYXNzZXJ0QDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyNTcKICAgIC8vIGxvZ2dlZEFzc2VydChhc3NldFhmZXIuYXNzZXRBbW91bnQgPT09IG1hdGNoU3VtLCBFUlJfSU5WQUxJRF9UUkFOU0ZFUikKICAgIHN3YXAKICAgIGd0eG5zIEFzc2V0QW1vdW50CiAgICA9PQogICAgYm56IGNyZWF0ZUFzYVVzZXJBbGxvY2F0aW9uc19hZnRlcl9hc3NlcnRAMTYKICAgIGJ5dGVjIDYgLy8gIkVSUjpJWEZSIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklYRlIKCmNyZWF0ZUFzYVVzZXJBbGxvY2F0aW9uc19hZnRlcl9hc3NlcnRAMTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjIyNC0yMjgKICAgIC8vIGNyZWF0ZUFzYVVzZXJBbGxvY2F0aW9ucygKICAgIC8vICAgYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIGlkOiB1aW50NjQsCiAgICAvLyAgIGFsbG9jYXRpb25zOiBVc2VyQWxsb2NhdGlvbltdCiAgICAvLyApOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjpSZXdhcmRzLmNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjYwLTI2OAogICAgLy8gY3JlYXRlQXNhRGlzYnVyc2VtZW50RnJvbUdyb3VwKAogICAgLy8gICBtYnJQYXltZW50SW5kZXg6IHVpbnQ2NCwKICAgIC8vICAgYXNzZXRUcmFuc2ZlclN0YXJ0SW5kZXg6IHVpbnQ2NCwKICAgIC8vICAgdGl0bGU6IHN0cmluZywKICAgIC8vICAgdGltZVRvVW5sb2NrOiB1aW50NjQsCiAgICAvLyAgIGV4cGlyYXRpb246IHVpbnQ2NCwKICAgIC8vICAgbm90ZTogc3RyaW5nLAogICAgLy8gICBhbGxvY2F0aW9uczogVXNlckFsbG9jYXRpb25bXQogICAgLy8gKTogdWludDY0IHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgMgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIGR1cAogICAgY292ZXIgMgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgNAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgNAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIGR1cAogICAgY292ZXIgMwogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNwogICAgZHVwCiAgICBjb3ZlciA3CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBkdXAKICAgIGNvdmVyIDgKICAgIGR1cAogICAgcHVzaGludCA0MAogICAgKgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIHVuY292ZXIgMgogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8c21hcnRfY29udHJhY3RzL3Jld2FyZHMvdHlwZXMudHM6OlVzZXJBbGxvY2F0aW9uPgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyNjkKICAgIC8vIGNvbnN0IGlkID0gdGhpcy5uZXdEaXNidXJzZW1lbnRJRCgpCiAgICBjYWxsc3ViIG5ld0Rpc2J1cnNlbWVudElECiAgICBjb3ZlciA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjI3MAogICAgLy8gY29uc3QgcGF5bWVudCA9IGd0eG4uUGF5bWVudFR4bihtYnJQYXltZW50SW5kZXgpCiAgICBkaWcgMwogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjcyCiAgICAvLyBjb25zdCBjb3N0cyA9IHRoaXMubWJyKHRpdGxlLCBub3RlKQogICAgY292ZXIgMgogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9iYXNlLnRzOjpCYXNlUmV3YXJkcy5tYnIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjczCiAgICAvLyBjb25zdCBkaXNidXJzZW1lbnRNYnJBbW91bnQgPSBjb3N0cy5kaXNidXJzZW1lbnRzCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyNzQKICAgIC8vIGNvbnN0IGFsbG9jYXRpb25NYnJBbW91bnQ6IHVpbnQ2NCA9IGNvc3RzLnVzZXJBbGxvY2F0aW9ucyAqIGFsbG9jYXRpb25zLmxlbmd0aAogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICAqCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjI3NgogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfSU5WQUxJRF9QQVlNRU5UKQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IGNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cF9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWNfMSAvLyAiRVJSOklQQVkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBBWQoKY3JlYXRlQXNhRGlzYnVyc2VtZW50RnJvbUdyb3VwX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyNzcKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LmFtb3VudCA+PSBkaXNidXJzZW1lbnRNYnJBbW91bnQgKyBhbGxvY2F0aW9uTWJyQW1vdW50LCBFUlJfSU5WQUxJRF9QQVlNRU5UKQogICAgdW5jb3ZlciA1CiAgICBndHhucyBBbW91bnQKICAgIGR1cAogICAgZGlnIDMKICAgIGRpZyAzCiAgICArCiAgICA+PQogICAgYm56IGNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cF9hZnRlcl9hc3NlcnRANQogICAgYnl0ZWNfMSAvLyAiRVJSOklQQVkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBBWQoKY3JlYXRlQXNhRGlzYnVyc2VtZW50RnJvbUdyb3VwX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyODAKICAgIC8vIGNyZWF0b3I6IFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjI4OAogICAgLy8gbWJyQ3JlZGl0czogcGF5bWVudC5hbW91bnQgLSBkaXNidXJzZW1lbnRNYnJBbW91bnQsCiAgICBzd2FwCiAgICB1bmNvdmVyIDMKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6Mjc5LTI5MQogICAgLy8gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZSA9IHsKICAgIC8vICAgY3JlYXRvcjogVHhuLnNlbmRlciwKICAgIC8vICAgZmluYWxpemVkOiBmYWxzZSwKICAgIC8vICAgdGl0bGUsCiAgICAvLyAgIGFtb3VudDogMCwKICAgIC8vICAgdGltZVRvVW5sb2NrLAogICAgLy8gICBleHBpcmF0aW9uLAogICAgLy8gICBhbGxvY2F0aW9uczogMCwKICAgIC8vICAgZGlzdHJpYnV0ZWQ6IDAsCiAgICAvLyAgIG1ickNyZWRpdHM6IHBheW1lbnQuYW1vdW50IC0gZGlzYnVyc2VtZW50TWJyQW1vdW50LAogICAgLy8gICB1c2VkTWJyQ3JlZGl0czogMCwKICAgIC8vICAgbm90ZSwKICAgIC8vIH0KICAgIHVuY292ZXIgNQogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHVuY292ZXIgMgogICAgYnl0ZWMgMTIgLy8gMHgwMDAwNWQKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIGxlbgogICAgcHVzaGludCA5MwogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyODMKICAgIC8vIGFtb3VudDogMCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjI3OS0yOTEKICAgIC8vIHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUgPSB7CiAgICAvLyAgIGNyZWF0b3I6IFR4bi5zZW5kZXIsCiAgICAvLyAgIGZpbmFsaXplZDogZmFsc2UsCiAgICAvLyAgIHRpdGxlLAogICAgLy8gICBhbW91bnQ6IDAsCiAgICAvLyAgIHRpbWVUb1VubG9jaywKICAgIC8vICAgZXhwaXJhdGlvbiwKICAgIC8vICAgYWxsb2NhdGlvbnM6IDAsCiAgICAvLyAgIGRpc3RyaWJ1dGVkOiAwLAogICAgLy8gICBtYnJDcmVkaXRzOiBwYXltZW50LmFtb3VudCAtIGRpc2J1cnNlbWVudE1ickFtb3VudCwKICAgIC8vICAgdXNlZE1ickNyZWRpdHM6IDAsCiAgICAvLyAgIG5vdGUsCiAgICAvLyB9CiAgICBpdG9iCiAgICB1bmNvdmVyIDIKICAgIGRpZyAxCiAgICBjb25jYXQKICAgIGRpZyAxMQogICAgaXRvYgogICAgY29uY2F0CiAgICBkaWcgMTAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIGNvbmNhdAogICAgdW5jb3ZlciA0CiAgICBpdG9iCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgdW5jb3ZlciA1CiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6Mjc5CiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlID0gewogICAgZGlnIDIKICAgIGl0b2IKICAgIGR1cAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2OQogICAgLy8gZGlzYnVyc2VtZW50cyA9IEJveE1hcDx1aW50NjQsIERpc2J1cnNlbWVudERldGFpbHM+KHsga2V5UHJlZml4OiBSZXdhcmRzQm94UHJlZml4RGlzYnVyc2VtZW50cyB9KQogICAgYnl0ZWNfMCAvLyAiZCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjI3OS0yOTEKICAgIC8vIHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUgPSB7CiAgICAvLyAgIGNyZWF0b3I6IFR4bi5zZW5kZXIsCiAgICAvLyAgIGZpbmFsaXplZDogZmFsc2UsCiAgICAvLyAgIHRpdGxlLAogICAgLy8gICBhbW91bnQ6IDAsCiAgICAvLyAgIHRpbWVUb1VubG9jaywKICAgIC8vICAgZXhwaXJhdGlvbiwKICAgIC8vICAgYWxsb2NhdGlvbnM6IDAsCiAgICAvLyAgIGRpc3RyaWJ1dGVkOiAwLAogICAgLy8gICBtYnJDcmVkaXRzOiBwYXltZW50LmFtb3VudCAtIGRpc2J1cnNlbWVudE1ickFtb3VudCwKICAgIC8vICAgdXNlZE1ickNyZWRpdHM6IDAsCiAgICAvLyAgIG5vdGUsCiAgICAvLyB9CiAgICBkdXAKICAgIGJveF9kZWwKICAgIHBvcAogICAgc3dhcAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyOTMKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBhbGxvY2F0aW9ucy5sZW5ndGg7IGkgKz0gMSkgewogICAgaW50Y18wIC8vIDAKICAgIHN3YXAKCmNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cF93aGlsZV90b3BANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjkzCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgYWxsb2NhdGlvbnMubGVuZ3RoOyBpICs9IDEpIHsKICAgIGRpZyAxCiAgICBkaWcgNgogICAgPAogICAgYnogY3JlYXRlQXNhRGlzYnVyc2VtZW50RnJvbUdyb3VwX2FmdGVyX3doaWxlQDE0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjI5NAogICAgLy8gY29uc3QgYXNzZXRYZmVyID0gZ3R4bi5Bc3NldFRyYW5zZmVyVHhuKGFzc2V0VHJhbnNmZXJTdGFydEluZGV4ICsgaSkKICAgIGRpZyA5CiAgICBkaWcgMgogICAgZHVwCiAgICBjb3ZlciAyCiAgICArCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNCAvLyBheGZlcgogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGF4ZmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjI5OAogICAgLy8gYWRkcmVzczogYWxsb2NhdGlvbi5hZGRyZXNzLAogICAgZGlnIDkKICAgIGV4dHJhY3QgMiAwCiAgICB1bmNvdmVyIDIKICAgIHB1c2hpbnQgNDAKICAgICoKICAgIHB1c2hpbnQgNDAKICAgIGV4dHJhY3QzIC8vIG9uIGVycm9yOiBpbmRleCBhY2Nlc3MgaXMgb3V0IG9mIGJvdW5kcwogICAgZHVwCiAgICBjb3ZlciA1CiAgICBleHRyYWN0IDAgMzIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6Mjk5CiAgICAvLyBhc3NldDogYXNzZXRYZmVyLnhmZXJBc3NldC5pZCwKICAgIHN3YXAKICAgIGd0eG5zIFhmZXJBc3NldAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyOTYtMzAwCiAgICAvLyBjb25zdCB1c2VyQWxsb2NhdGlvbnNLZXk6IFVzZXJBbGxvY2F0aW9uc0tleSA9IHsKICAgIC8vICAgZGlzYnVyc2VtZW50SUQ6IGlkLAogICAgLy8gICBhZGRyZXNzOiBhbGxvY2F0aW9uLmFkZHJlc3MsCiAgICAvLyAgIGFzc2V0OiBhc3NldFhmZXIueGZlckFzc2V0LmlkLAogICAgLy8gfQogICAgaXRvYgogICAgY29uY2F0CiAgICBkaWcgNgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjc1CiAgICAvLyB1c2VyQWxsb2NhdGlvbnMgPSBCb3hNYXA8VXNlckFsbG9jYXRpb25zS2V5LCB1aW50NjQ+KHsga2V5UHJlZml4OiBSZXdhcmRzQm94UHJlZml4VXNlckFsbG9jYXRpb25zIH0pCiAgICBieXRlYyA0IC8vICJ1IgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzAyCiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMudXNlckFsbG9jYXRpb25zKHVzZXJBbGxvY2F0aW9uc0tleSkuZXhpc3RzLCBFUlJfQUxMT0NBVElPTl9BTFJFQURZX0VYSVNUUykKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogY3JlYXRlQXNhRGlzYnVyc2VtZW50RnJvbUdyb3VwX2FmdGVyX2Fzc2VydEA5CiAgICBieXRlYyAxMSAvLyAiRVJSOkFMQUUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6QUxBRQoKY3JlYXRlQXNhRGlzYnVyc2VtZW50RnJvbUdyb3VwX2FmdGVyX2Fzc2VydEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozMDMKICAgIC8vIGxvZ2dlZEFzc2VydChhc3NldFhmZXIuYXNzZXRSZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIEVSUl9JTlZBTElEX1RSQU5TRkVSKQogICAgZGlnIDIKICAgIGd0eG5zIEFzc2V0UmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IGNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cF9hZnRlcl9hc3NlcnRAMTEKICAgIGJ5dGVjIDYgLy8gIkVSUjpJWEZSIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklYRlIKCmNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cF9hZnRlcl9hc3NlcnRAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjMwNAogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci5hc3NldEFtb3VudCA9PT0gYWxsb2NhdGlvbi5hbW91bnQsIEVSUl9JTlZBTElEX1RSQU5TRkVSKQogICAgdW5jb3ZlciAyCiAgICBndHhucyBBc3NldEFtb3VudAogICAgdW5jb3ZlciA0CiAgICBwdXNoaW50IDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBjb3ZlciAyCiAgICA9PQogICAgYm56IGNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cF9hZnRlcl9hc3NlcnRAMTMKICAgIGJ5dGVjIDYgLy8gIkVSUjpJWEZSIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklYRlIKCmNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cF9hZnRlcl9hc3NlcnRAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjMwNgogICAgLy8gdGhpcy51c2VyQWxsb2NhdGlvbnModXNlckFsbG9jYXRpb25zS2V5KS52YWx1ZSA9IGFsbG9jYXRpb24uYW1vdW50CiAgICBkdXAKICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozMDcKICAgIC8vIHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUuYWxsb2NhdGlvbnMgKz0gMQogICAgZGlnIDEKICAgIGR1cAogICAgcHVzaGludCA1OQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgaXRvYgogICAgZGlnIDEKICAgIHB1c2hpbnQgNTkKICAgIHVuY292ZXIgMgogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzA4CiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlLmFtb3VudCArPSBhbGxvY2F0aW9uLmFtb3VudAogICAgZHVwCiAgICBwdXNoaW50IDM1CiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIHVuY292ZXIgMgogICAgKwogICAgaXRvYgogICAgcHVzaGludCAzNQogICAgc3dhcAogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjkzCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgYWxsb2NhdGlvbnMubGVuZ3RoOyBpICs9IDEpIHsKICAgIHN3YXAKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBzd2FwCiAgICBiIGNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cF93aGlsZV90b3BANgoKY3JlYXRlQXNhRGlzYnVyc2VtZW50RnJvbUdyb3VwX2FmdGVyX3doaWxlQDE0OgogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjMxMQogICAgLy8gdGhpcy51c2VNYnJDcmVkaXQoaWQsIGFsbG9jYXRpb25NYnJBbW91bnQpCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMgogICAgY2FsbHN1YiB1c2VNYnJDcmVkaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzE0CiAgICAvLyB0aW1lVG9VbmxvY2sgPj0gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCB8fCB0aW1lVG9VbmxvY2sgPT09IDAsCiAgICBkaWcgNQogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgPj0KICAgIGJueiBjcmVhdGVBc2FEaXNidXJzZW1lbnRGcm9tR3JvdXBfYm9vbF90cnVlQDE2CiAgICBkaWcgNQogICAgYm56IGNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cF9ib29sX2ZhbHNlQDE3CgpjcmVhdGVBc2FEaXNidXJzZW1lbnRGcm9tR3JvdXBfYm9vbF90cnVlQDE2OgogICAgaW50Y18xIC8vIDEKCmNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cF9ib29sX21lcmdlQDE4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozMTMtMzE2CiAgICAvLyBsb2dnZWRBc3NlcnQoCiAgICAvLyAgIHRpbWVUb1VubG9jayA+PSBHbG9iYWwubGF0ZXN0VGltZXN0YW1wIHx8IHRpbWVUb1VubG9jayA9PT0gMCwKICAgIC8vICAgRVJSX0lOVkFMSURfRElTQlVSU0VNRU5UX1VOTE9DS19USU1FCiAgICAvLyApCiAgICBibnogY3JlYXRlQXNhRGlzYnVyc2VtZW50RnJvbUdyb3VwX2FmdGVyX2Fzc2VydEAyMAogICAgYnl0ZWMgMTMgLy8gIkVSUjpJRFVUIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklEVVQKCmNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cF9hZnRlcl9hc3NlcnRAMjA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjMxOAogICAgLy8gZXhwaXJhdGlvbiA+PSBHbG9iYWwubGF0ZXN0VGltZXN0YW1wICsgNjAgfHwgZXhwaXJhdGlvbiA9PT0gMCwKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIHB1c2hpbnQgNjAKICAgICsKICAgIGRpZyA1CiAgICA8PQogICAgYm56IGNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cF9ib29sX3RydWVAMjIKICAgIGRpZyA0CiAgICBibnogY3JlYXRlQXNhRGlzYnVyc2VtZW50RnJvbUdyb3VwX2Jvb2xfZmFsc2VAMjMKCmNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cF9ib29sX3RydWVAMjI6CiAgICBpbnRjXzEgLy8gMQoKY3JlYXRlQXNhRGlzYnVyc2VtZW50RnJvbUdyb3VwX2Jvb2xfbWVyZ2VAMjQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjMxNy0zMjAKICAgIC8vIGxvZ2dlZEFzc2VydCgKICAgIC8vICAgZXhwaXJhdGlvbiA+PSBHbG9iYWwubGF0ZXN0VGltZXN0YW1wICsgNjAgfHwgZXhwaXJhdGlvbiA9PT0gMCwKICAgIC8vICAgRVJSX0lOVkFMSURfRElTQlVSU0VNRU5UX0VYUElSQVRJT05fVElNRQogICAgLy8gKQogICAgYm56IGNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cF9hZnRlcl9hc3NlcnRAMjYKICAgIGJ5dGVjIDE0IC8vICJFUlI6SURYVCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJRFhUCgpjcmVhdGVBc2FEaXNidXJzZW1lbnRGcm9tR3JvdXBfYWZ0ZXJfYXNzZXJ0QDI2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozMjEKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlLmFtb3VudCA+IDAsIEVSUl9ESVNCVVJTRU1FTlRTX0NBTk5PVF9CRV9FTVBUWSkKICAgIGR1cAogICAgcHVzaGludCAzNQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBibnogY3JlYXRlQXNhRGlzYnVyc2VtZW50RnJvbUdyb3VwX2FmdGVyX2Fzc2VydEAyOAogICAgYnl0ZWMgMTUgLy8gIkVSUjpEQkVNIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkRCRU0KCmNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cF9hZnRlcl9hc3NlcnRAMjg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjMyMgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUuYWxsb2NhdGlvbnMgPiAwLCBFUlJfRElTQlVSU0VNRU5UU19NVVNUX0hBVkVfQUxMT0NBVElPTlMpCiAgICBkdXAKICAgIHB1c2hpbnQgNTkKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgYm56IGNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cF9hZnRlcl9hc3NlcnRAMzAKICAgIGJ5dGVjIDE2IC8vICJFUlI6REJNQSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpEQk1BCgpjcmVhdGVBc2FEaXNidXJzZW1lbnRGcm9tR3JvdXBfYWZ0ZXJfYXNzZXJ0QDMwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozMjQKICAgIC8vIHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUuZmluYWxpemVkID0gdHJ1ZQogICAgZHVwCiAgICBwdXNoaW50IDMyCiAgICBpbnRjXzEgLy8gMQogICAgYm94X2V4dHJhY3QKICAgIGludGNfMCAvLyAwCiAgICBpbnRjXzEgLy8gMQogICAgc2V0Yml0CiAgICBwdXNoaW50IDMyCiAgICBzd2FwCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyNjAtMjY4CiAgICAvLyBjcmVhdGVBc2FEaXNidXJzZW1lbnRGcm9tR3JvdXAoCiAgICAvLyAgIG1iclBheW1lbnRJbmRleDogdWludDY0LAogICAgLy8gICBhc3NldFRyYW5zZmVyU3RhcnRJbmRleDogdWludDY0LAogICAgLy8gICB0aXRsZTogc3RyaW5nLAogICAgLy8gICB0aW1lVG9VbmxvY2s6IHVpbnQ2NCwKICAgIC8vICAgZXhwaXJhdGlvbjogdWludDY0LAogICAgLy8gICBub3RlOiBzdHJpbmcsCiAgICAvLyAgIGFsbG9jYXRpb25zOiBVc2VyQWxsb2NhdGlvbltdCiAgICAvLyApOiB1aW50NjQgewogICAgYnl0ZWMgNSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKY3JlYXRlQXNhRGlzYnVyc2VtZW50RnJvbUdyb3VwX2Jvb2xfZmFsc2VAMjM6CiAgICBpbnRjXzAgLy8gMAogICAgYiBjcmVhdGVBc2FEaXNidXJzZW1lbnRGcm9tR3JvdXBfYm9vbF9tZXJnZUAyNAoKY3JlYXRlQXNhRGlzYnVyc2VtZW50RnJvbUdyb3VwX2Jvb2xfZmFsc2VAMTc6CiAgICBpbnRjXzAgLy8gMAogICAgYiBjcmVhdGVBc2FEaXNidXJzZW1lbnRGcm9tR3JvdXBfYm9vbF9tZXJnZUAxOAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6OlJld2FyZHMuZmluYWxpemVEaXNidXJzZW1lbnRbcm91dGluZ10oKSAtPiB2b2lkOgpmaW5hbGl6ZURpc2J1cnNlbWVudDoKICAgIHB1c2hieXRlcyAiIgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjMyOQogICAgLy8gZmluYWxpemVEaXNidXJzZW1lbnQoaWQ6IHVpbnQ2NCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozMzAKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmRpc2J1cnNlbWVudHMoaWQpLmV4aXN0cywgRVJSX0RJU0JVUlNFTUVOVF9ET0VTX05PVF9FWElTVCkKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NjkKICAgIC8vIGRpc2J1cnNlbWVudHMgPSBCb3hNYXA8dWludDY0LCBEaXNidXJzZW1lbnREZXRhaWxzPih7IGtleVByZWZpeDogUmV3YXJkc0JveFByZWZpeERpc2J1cnNlbWVudHMgfSkKICAgIGJ5dGVjXzAgLy8gImQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozMzAKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmRpc2J1cnNlbWVudHMoaWQpLmV4aXN0cywgRVJSX0RJU0JVUlNFTUVOVF9ET0VTX05PVF9FWElTVCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGZpbmFsaXplRGlzYnVyc2VtZW50X2FmdGVyX2Fzc2VydEAzCiAgICBieXRlY18yIC8vICJFUlI6REJORSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpEQk5FCgpmaW5hbGl6ZURpc2J1cnNlbWVudF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzMyCiAgICAvLyBjb25zdCB7IGNyZWF0b3IsIGZpbmFsaXplZCwgdGltZVRvVW5sb2NrLCBleHBpcmF0aW9uLCBhbW91bnQsIGFsbG9jYXRpb25zIH0gPSB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlCiAgICBkdXBuIDIKICAgIGludGNfMCAvLyAwCiAgICBwdXNoaW50IDMyCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgZGlnIDEKICAgIHB1c2hpbnQgMzIKICAgIGludGNfMSAvLyAxCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgY292ZXIgMwogICAgZGlnIDEKICAgIHB1c2hpbnQgNDMKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgYnVyeSA1CiAgICBkaWcgMQogICAgcHVzaGludCA1MQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBidXJ5IDYKICAgIGRpZyAxCiAgICBwdXNoaW50IDM1CiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGNvdmVyIDMKICAgIHN3YXAKICAgIHB1c2hpbnQgNTkKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozMzMKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSBjcmVhdG9yLCBFUlJfWU9VX0FSRV9OT1RfVEhFX0NSRUFUT1IpCiAgICB0eG4gU2VuZGVyCiAgICA9PQogICAgYm56IGZpbmFsaXplRGlzYnVyc2VtZW50X2FmdGVyX2Fzc2VydEA1CiAgICBieXRlY18zIC8vICJFUlI6WU5DUiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpZTkNSCgpmaW5hbGl6ZURpc2J1cnNlbWVudF9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzM0CiAgICAvLyBsb2dnZWRBc3NlcnQoIWZpbmFsaXplZCwgRVJSX0RJU0JVUlNFTUVOVF9BTFJFQURZX0ZJTkFMKQogICAgdW5jb3ZlciAzCiAgICBieiBmaW5hbGl6ZURpc2J1cnNlbWVudF9hZnRlcl9hc3NlcnRANwogICAgYnl0ZWMgNyAvLyAiRVJSOkRCQUYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6REJBRgoKZmluYWxpemVEaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjMzNgogICAgLy8gdGltZVRvVW5sb2NrID49IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgfHwgdGltZVRvVW5sb2NrID09PSAwLAogICAgZGlnIDMKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgID49CiAgICBibnogZmluYWxpemVEaXNidXJzZW1lbnRfYm9vbF90cnVlQDkKICAgIGRpZyAzCiAgICBibnogZmluYWxpemVEaXNidXJzZW1lbnRfYm9vbF9mYWxzZUAxMAoKZmluYWxpemVEaXNidXJzZW1lbnRfYm9vbF90cnVlQDk6CiAgICBpbnRjXzEgLy8gMQoKZmluYWxpemVEaXNidXJzZW1lbnRfYm9vbF9tZXJnZUAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzM1LTMzOAogICAgLy8gbG9nZ2VkQXNzZXJ0KAogICAgLy8gICB0aW1lVG9VbmxvY2sgPj0gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCB8fCB0aW1lVG9VbmxvY2sgPT09IDAsCiAgICAvLyAgIEVSUl9JTlZBTElEX0RJU0JVUlNFTUVOVF9VTkxPQ0tfVElNRQogICAgLy8gKQogICAgYm56IGZpbmFsaXplRGlzYnVyc2VtZW50X2FmdGVyX2Fzc2VydEAxMwogICAgYnl0ZWMgMTMgLy8gIkVSUjpJRFVUIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklEVVQKCmZpbmFsaXplRGlzYnVyc2VtZW50X2FmdGVyX2Fzc2VydEAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzQwCiAgICAvLyBleHBpcmF0aW9uID49IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgKyA2MCB8fCBleHBpcmF0aW9uID09PSAwLAogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgcHVzaGludCA2MAogICAgKwogICAgZGlnIDUKICAgIDw9CiAgICBibnogZmluYWxpemVEaXNidXJzZW1lbnRfYm9vbF90cnVlQDE1CiAgICBkaWcgNAogICAgYm56IGZpbmFsaXplRGlzYnVyc2VtZW50X2Jvb2xfZmFsc2VAMTYKCmZpbmFsaXplRGlzYnVyc2VtZW50X2Jvb2xfdHJ1ZUAxNToKICAgIGludGNfMSAvLyAxCgpmaW5hbGl6ZURpc2J1cnNlbWVudF9ib29sX21lcmdlQDE3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozMzktMzQyCiAgICAvLyBsb2dnZWRBc3NlcnQoCiAgICAvLyAgIGV4cGlyYXRpb24gPj0gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCArIDYwIHx8IGV4cGlyYXRpb24gPT09IDAsCiAgICAvLyAgIEVSUl9JTlZBTElEX0RJU0JVUlNFTUVOVF9FWFBJUkFUSU9OX1RJTUUKICAgIC8vICkKICAgIGJueiBmaW5hbGl6ZURpc2J1cnNlbWVudF9hZnRlcl9hc3NlcnRAMTkKICAgIGJ5dGVjIDE0IC8vICJFUlI6SURYVCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJRFhUCgpmaW5hbGl6ZURpc2J1cnNlbWVudF9hZnRlcl9hc3NlcnRAMTk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjM0MwogICAgLy8gbG9nZ2VkQXNzZXJ0KGFtb3VudCA+IDAsIEVSUl9ESVNCVVJTRU1FTlRTX0NBTk5PVF9CRV9FTVBUWSkKICAgIHVuY292ZXIgMgogICAgYm56IGZpbmFsaXplRGlzYnVyc2VtZW50X2FmdGVyX2Fzc2VydEAyMQogICAgYnl0ZWMgMTUgLy8gIkVSUjpEQkVNIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkRCRU0KCmZpbmFsaXplRGlzYnVyc2VtZW50X2FmdGVyX2Fzc2VydEAyMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzQ0CiAgICAvLyBsb2dnZWRBc3NlcnQoYWxsb2NhdGlvbnMgPiAwLCBFUlJfRElTQlVSU0VNRU5UU19NVVNUX0hBVkVfQUxMT0NBVElPTlMpCiAgICBibnogZmluYWxpemVEaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDIzCiAgICBieXRlYyAxNiAvLyAiRVJSOkRCTUEiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6REJNQQoKZmluYWxpemVEaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDIzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozNDYKICAgIC8vIHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUuZmluYWxpemVkID0gdHJ1ZQogICAgZHVwCiAgICBwdXNoaW50IDMyCiAgICBpbnRjXzEgLy8gMQogICAgYm94X2V4dHJhY3QKICAgIGludGNfMCAvLyAwCiAgICBpbnRjXzEgLy8gMQogICAgc2V0Yml0CiAgICBwdXNoaW50IDMyCiAgICBzd2FwCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozMjkKICAgIC8vIGZpbmFsaXplRGlzYnVyc2VtZW50KGlkOiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmZpbmFsaXplRGlzYnVyc2VtZW50X2Jvb2xfZmFsc2VAMTY6CiAgICBpbnRjXzAgLy8gMAogICAgYiBmaW5hbGl6ZURpc2J1cnNlbWVudF9ib29sX21lcmdlQDE3CgpmaW5hbGl6ZURpc2J1cnNlbWVudF9ib29sX2ZhbHNlQDEwOgogICAgaW50Y18wIC8vIDAKICAgIGIgZmluYWxpemVEaXNidXJzZW1lbnRfYm9vbF9tZXJnZUAxMQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6OlJld2FyZHMuY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjM0OS0zNTQKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIG1iclBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgdGltZVRvVW5sb2NrOiB1aW50NjQsCiAgICAvLyAgIGV4cGlyYXRpb246IHVpbnQ2NCwKICAgIC8vICAgYWxsb2NhdGlvbnM6IFVzZXJBbGxvY2F0aW9uW10KICAgIC8vICk6IHVpbnQ2NCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cG4gMgogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGR1cAogICAgY292ZXIgMgogICAgZHVwCiAgICBwdXNoaW50IDQwCiAgICAqCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgdW5jb3ZlciAyCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxzbWFydF9jb250cmFjdHMvcmV3YXJkcy90eXBlcy50czo6VXNlckFsbG9jYXRpb24+CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjM1NQogICAgLy8gY29uc3QgaWQgPSB0aGlzLm5ld0Rpc2J1cnNlbWVudElEKCkKICAgIGNhbGxzdWIgbmV3RGlzYnVyc2VtZW50SUQKICAgIGNvdmVyIDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzU3CiAgICAvLyBjb25zdCBhbGxvY2F0aW9uc01icjogdWludDY0ID0gVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9ucy5sZW5ndGgKICAgIGludGMgNCAvLyAyNTMwMAogICAgKgogICAgZHVwCiAgICBjb3ZlciA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjM1OAogICAgLy8gY29uc3QgbWJyQW1vdW50OiB1aW50NjQgPSBNaW5EaXNidXJzZW1lbnRzTUJSICsgYWxsb2NhdGlvbnNNYnIKICAgIGludGMgNSAvLyA0MTcwMAogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozNjAKICAgIC8vIGxldCBzdW06IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjM2MQogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGFsbG9jYXRpb25zLmxlbmd0aDsgaSArPSAxKSB7CiAgICBkdXAKCmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfd2hpbGVfdG9wQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjM2MQogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGFsbG9jYXRpb25zLmxlbmd0aDsgaSArPSAxKSB7CiAgICBkdXAKICAgIGRpZyA0CiAgICA8CiAgICBieiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2FmdGVyX3doaWxlQDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzY0CiAgICAvLyBhZGRyZXNzOiBhbGxvY2F0aW9uc1tpXS5hZGRyZXNzLAogICAgZGlnIDQKICAgIGV4dHJhY3QgMiAwCiAgICBkaWcgMQogICAgcHVzaGludCA0MAogICAgKgogICAgcHVzaGludCA0MAogICAgZXh0cmFjdDMgLy8gb24gZXJyb3I6IGluZGV4IGFjY2VzcyBpcyBvdXQgb2YgYm91bmRzCiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozNjUKICAgIC8vIGFzc2V0OiAwLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzYyLTM2NgogICAgLy8gY29uc3QgdXNlckFsbG9jYXRpb25zS2V5OiBVc2VyQWxsb2NhdGlvbnNLZXkgPSB7CiAgICAvLyAgIGRpc2J1cnNlbWVudElEOiBpZCwKICAgIC8vICAgYWRkcmVzczogYWxsb2NhdGlvbnNbaV0uYWRkcmVzcywKICAgIC8vICAgYXNzZXQ6IDAsCiAgICAvLyB9CiAgICBpdG9iCiAgICBjb25jYXQKICAgIGRpZyA5CiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzY4CiAgICAvLyB0aGlzLnVzZXJBbGxvY2F0aW9ucyh1c2VyQWxsb2NhdGlvbnNLZXkpLnZhbHVlID0gYWxsb2NhdGlvbnNbaV0uYW1vdW50CiAgICBzd2FwCiAgICBwdXNoaW50IDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo3NQogICAgLy8gdXNlckFsbG9jYXRpb25zID0gQm94TWFwPFVzZXJBbGxvY2F0aW9uc0tleSwgdWludDY0Pih7IGtleVByZWZpeDogUmV3YXJkc0JveFByZWZpeFVzZXJBbGxvY2F0aW9ucyB9KQogICAgYnl0ZWMgNCAvLyAidSIKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjM2OAogICAgLy8gdGhpcy51c2VyQWxsb2NhdGlvbnModXNlckFsbG9jYXRpb25zS2V5KS52YWx1ZSA9IGFsbG9jYXRpb25zW2ldLmFtb3VudAogICAgZGlnIDEKICAgIGl0b2IKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzY5CiAgICAvLyBzdW0gKz0gYWxsb2NhdGlvbnNbaV0uYW1vdW50CiAgICB1bmNvdmVyIDIKICAgICsKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzYxCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgYWxsb2NhdGlvbnMubGVuZ3RoOyBpICs9IDEpIHsKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBiIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfd2hpbGVfdG9wQDIKCmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYWZ0ZXJfd2hpbGVANDoKICAgIHBvcAogICAgdW5jb3ZlciAzCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzcyCiAgICAvLyBsb2dnZWRBc3NlcnQobWJyUGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIEVSUl9JTlZBTElEX1BBWU1FTlQpCiAgICBkaWcgMwogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDYKICAgIGJ5dGVjXzEgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjM3MwogICAgLy8gbG9nZ2VkQXNzZXJ0KG1iclBheW1lbnQuYW1vdW50ID09PSBtYnJBbW91bnQgKyBzdW0sIEVSUl9JTlZBTElEX1BBWU1FTlQpCiAgICB1bmNvdmVyIDMKICAgIGd0eG5zIEFtb3VudAogICAgdW5jb3ZlciAyCiAgICBkaWcgMgogICAgKwogICAgPT0KICAgIGJueiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2FmdGVyX2Fzc2VydEA4CiAgICBieXRlY18xIC8vICJFUlI6SVBBWSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUEFZCgpjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2FmdGVyX2Fzc2VydEA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozNzYKICAgIC8vIGNyZWF0b3I6IFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjM3NS0zODcKICAgIC8vIHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUgPSB7CiAgICAvLyAgIGNyZWF0b3I6IFR4bi5zZW5kZXIsCiAgICAvLyAgIGZpbmFsaXplZDogdHJ1ZSwKICAgIC8vICAgdGl0bGU6ICcnLAogICAgLy8gICBhbW91bnQ6IHN1bSwKICAgIC8vICAgdGltZVRvVW5sb2NrLAogICAgLy8gICBleHBpcmF0aW9uLAogICAgLy8gICBhbGxvY2F0aW9uczogYWxsb2NhdGlvbnMubGVuZ3RoLAogICAgLy8gICBkaXN0cmlidXRlZDogMCwKICAgIC8vICAgbWJyQ3JlZGl0czogMCwKICAgIC8vICAgdXNlZE1ickNyZWRpdHM6IGFsbG9jYXRpb25zTWJyLAogICAgLy8gICBub3RlOiAnJywKICAgIC8vIH0KICAgIGludGNfMCAvLyAwCiAgICBpdG9iCiAgICBzd2FwCiAgICBieXRlYyAxNyAvLyAweDgwMDA1ZAogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGl0b2IKICAgIGNvbmNhdAogICAgdW5jb3ZlciA2CiAgICBpdG9iCiAgICBjb25jYXQKICAgIHVuY292ZXIgNQogICAgaXRvYgogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGl0b2IKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIGJ5dGVjIDE4IC8vIDB4MDA1ZjAwMDAwMDAwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6Mzc1CiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlID0gewogICAgc3dhcAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2OQogICAgLy8gZGlzYnVyc2VtZW50cyA9IEJveE1hcDx1aW50NjQsIERpc2J1cnNlbWVudERldGFpbHM+KHsga2V5UHJlZml4OiBSZXdhcmRzQm94UHJlZml4RGlzYnVyc2VtZW50cyB9KQogICAgYnl0ZWNfMCAvLyAiZCIKICAgIGRpZyAxCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6Mzc1LTM4NwogICAgLy8gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZSA9IHsKICAgIC8vICAgY3JlYXRvcjogVHhuLnNlbmRlciwKICAgIC8vICAgZmluYWxpemVkOiB0cnVlLAogICAgLy8gICB0aXRsZTogJycsCiAgICAvLyAgIGFtb3VudDogc3VtLAogICAgLy8gICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgIGV4cGlyYXRpb24sCiAgICAvLyAgIGFsbG9jYXRpb25zOiBhbGxvY2F0aW9ucy5sZW5ndGgsCiAgICAvLyAgIGRpc3RyaWJ1dGVkOiAwLAogICAgLy8gICBtYnJDcmVkaXRzOiAwLAogICAgLy8gICB1c2VkTWJyQ3JlZGl0czogYWxsb2NhdGlvbnNNYnIsCiAgICAvLyAgIG5vdGU6ICcnLAogICAgLy8gfQogICAgZHVwCiAgICBib3hfZGVsCiAgICBwb3AKICAgIHVuY292ZXIgMgogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozNDktMzU0CiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICBtYnJQYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIHRpbWVUb1VubG9jazogdWludDY0LAogICAgLy8gICBleHBpcmF0aW9uOiB1aW50NjQsCiAgICAvLyAgIGFsbG9jYXRpb25zOiBVc2VyQWxsb2NhdGlvbltdCiAgICAvLyApOiB1aW50NjQgewogICAgYnl0ZWMgNSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6OlJld2FyZHMuY3JlYXRlSW5zdGFudEFzYURpc2J1cnNlbWVudFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjM5Mi0zOTgKICAgIC8vIGNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnQoCiAgICAvLyAgIG1iclBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIHRpbWVUb1VubG9jazogdWludDY0LAogICAgLy8gICBleHBpcmF0aW9uOiB1aW50NjQsCiAgICAvLyAgIGFsbG9jYXRpb25zOiBVc2VyQWxsb2NhdGlvbltdCiAgICAvLyApOiB1aW50NjQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMyAvLyAyCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNCAvLyBheGZlcgogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGF4ZmVyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciAyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciAyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGR1cAogICAgY292ZXIgMwogICAgZHVwCiAgICBwdXNoaW50IDQwCiAgICAqCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgdW5jb3ZlciAyCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxzbWFydF9jb250cmFjdHMvcmV3YXJkcy90eXBlcy50czo6VXNlckFsbG9jYXRpb24+CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjM5OQogICAgLy8gY29uc3QgaWQgPSB0aGlzLm5ld0Rpc2J1cnNlbWVudElEKCkKICAgIGNhbGxzdWIgbmV3RGlzYnVyc2VtZW50SUQKICAgIGNvdmVyIDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDAxCiAgICAvLyBjb25zdCBhbGxvY2F0aW9uc01icjogdWludDY0ID0gVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9ucy5sZW5ndGgKICAgIGludGMgNCAvLyAyNTMwMAogICAgKgogICAgZHVwCiAgICBjb3ZlciA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQwMgogICAgLy8gY29uc3QgbWJyQW1vdW50OiB1aW50NjQgPSBNaW5EaXNidXJzZW1lbnRzTUJSICsgYWxsb2NhdGlvbnNNYnIKICAgIGludGMgNSAvLyA0MTcwMAogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0MDQKICAgIC8vIGxldCBzdW06IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQwNQogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGFsbG9jYXRpb25zLmxlbmd0aDsgaSArPSAxKSB7CiAgICBkdXAKCmNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnRfd2hpbGVfdG9wQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQwNQogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGFsbG9jYXRpb25zLmxlbmd0aDsgaSArPSAxKSB7CiAgICBkdXAKICAgIGRpZyA1CiAgICA8CiAgICBieiBjcmVhdGVJbnN0YW50QXNhRGlzYnVyc2VtZW50X2FmdGVyX3doaWxlQDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDA4CiAgICAvLyBhZGRyZXNzOiBhbGxvY2F0aW9uc1tpXS5hZGRyZXNzLAogICAgZGlnIDUKICAgIGV4dHJhY3QgMiAwCiAgICBkaWcgMQogICAgcHVzaGludCA0MAogICAgKgogICAgcHVzaGludCA0MAogICAgZXh0cmFjdDMgLy8gb24gZXJyb3I6IGluZGV4IGFjY2VzcyBpcyBvdXQgb2YgYm91bmRzCiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0MDkKICAgIC8vIGFzc2V0OiBhc3NldFhmZXIueGZlckFzc2V0LmlkLAogICAgZGlnIDUKICAgIGd0eG5zIFhmZXJBc3NldAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0MDYtNDEwCiAgICAvLyBjb25zdCB1c2VyQWxsb2NhdGlvbnNLZXk6IFVzZXJBbGxvY2F0aW9uc0tleSA9IHsKICAgIC8vICAgZGlzYnVyc2VtZW50SUQ6IGlkLAogICAgLy8gICBhZGRyZXNzOiBhbGxvY2F0aW9uc1tpXS5hZGRyZXNzLAogICAgLy8gICBhc3NldDogYXNzZXRYZmVyLnhmZXJBc3NldC5pZCwKICAgIC8vIH0KICAgIGl0b2IKICAgIGNvbmNhdAogICAgZGlnIDEwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDEyCiAgICAvLyB0aGlzLnVzZXJBbGxvY2F0aW9ucyh1c2VyQWxsb2NhdGlvbnNLZXkpLnZhbHVlID0gYWxsb2NhdGlvbnNbaV0uYW1vdW50CiAgICBzd2FwCiAgICBwdXNoaW50IDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo3NQogICAgLy8gdXNlckFsbG9jYXRpb25zID0gQm94TWFwPFVzZXJBbGxvY2F0aW9uc0tleSwgdWludDY0Pih7IGtleVByZWZpeDogUmV3YXJkc0JveFByZWZpeFVzZXJBbGxvY2F0aW9ucyB9KQogICAgYnl0ZWMgNCAvLyAidSIKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQxMgogICAgLy8gdGhpcy51c2VyQWxsb2NhdGlvbnModXNlckFsbG9jYXRpb25zS2V5KS52YWx1ZSA9IGFsbG9jYXRpb25zW2ldLmFtb3VudAogICAgZGlnIDEKICAgIGl0b2IKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDEzCiAgICAvLyBzdW0gKz0gYWxsb2NhdGlvbnNbaV0uYW1vdW50CiAgICB1bmNvdmVyIDIKICAgICsKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDA1CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgYWxsb2NhdGlvbnMubGVuZ3RoOyBpICs9IDEpIHsKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBiIGNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnRfd2hpbGVfdG9wQDIKCmNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnRfYWZ0ZXJfd2hpbGVANDoKICAgIHBvcAogICAgdW5jb3ZlciA0CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDE2CiAgICAvLyBsb2dnZWRBc3NlcnQobWJyUGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIEVSUl9JTlZBTElEX1BBWU1FTlQpCiAgICBkaWcgNAogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IGNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDYKICAgIGJ5dGVjXzEgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCmNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQxNwogICAgLy8gbG9nZ2VkQXNzZXJ0KG1iclBheW1lbnQuYW1vdW50ID09PSBtYnJBbW91bnQsIEVSUl9JTlZBTElEX1BBWU1FTlQpCiAgICB1bmNvdmVyIDQKICAgIGd0eG5zIEFtb3VudAogICAgdW5jb3ZlciAyCiAgICA9PQogICAgYm56IGNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDgKICAgIGJ5dGVjXzEgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCmNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQxOQogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci5hc3NldFJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgRVJSX0lOVkFMSURfVFJBTlNGRVIpCiAgICBkaWcgMQogICAgZ3R4bnMgQXNzZXRSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogY3JlYXRlSW5zdGFudEFzYURpc2J1cnNlbWVudF9hZnRlcl9hc3NlcnRAMTAKICAgIGJ5dGVjIDYgLy8gIkVSUjpJWEZSIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklYRlIKCmNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0MjAKICAgIC8vIGxvZ2dlZEFzc2VydChhc3NldFhmZXIuYXNzZXRBbW91bnQgPT09IHN1bSwgRVJSX0lOVkFMSURfVFJBTlNGRVIpCiAgICBzd2FwCiAgICBndHhucyBBc3NldEFtb3VudAogICAgZGlnIDEKICAgID09CiAgICBibnogY3JlYXRlSW5zdGFudEFzYURpc2J1cnNlbWVudF9hZnRlcl9hc3NlcnRAMTIKICAgIGJ5dGVjIDYgLy8gIkVSUjpJWEZSIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklYRlIKCmNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0MjMKICAgIC8vIGNyZWF0b3I6IFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQyMi00MzQKICAgIC8vIHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUgPSB7CiAgICAvLyAgIGNyZWF0b3I6IFR4bi5zZW5kZXIsCiAgICAvLyAgIGZpbmFsaXplZDogdHJ1ZSwKICAgIC8vICAgdGl0bGU6ICcnLAogICAgLy8gICBhbW91bnQ6IHN1bSwKICAgIC8vICAgdGltZVRvVW5sb2NrLAogICAgLy8gICBleHBpcmF0aW9uLAogICAgLy8gICBhbGxvY2F0aW9uczogYWxsb2NhdGlvbnMubGVuZ3RoLAogICAgLy8gICBkaXN0cmlidXRlZDogMCwKICAgIC8vICAgbWJyQ3JlZGl0czogMCwKICAgIC8vICAgdXNlZE1ickNyZWRpdHM6IGFsbG9jYXRpb25zTWJyLAogICAgLy8gICBub3RlOiAnJywKICAgIC8vIH0KICAgIGludGNfMCAvLyAwCiAgICBpdG9iCiAgICBzd2FwCiAgICBieXRlYyAxNyAvLyAweDgwMDA1ZAogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGl0b2IKICAgIGNvbmNhdAogICAgdW5jb3ZlciA2CiAgICBpdG9iCiAgICBjb25jYXQKICAgIHVuY292ZXIgNQogICAgaXRvYgogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGl0b2IKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIGJ5dGVjIDE4IC8vIDB4MDA1ZjAwMDAwMDAwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDIyCiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlID0gewogICAgc3dhcAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2OQogICAgLy8gZGlzYnVyc2VtZW50cyA9IEJveE1hcDx1aW50NjQsIERpc2J1cnNlbWVudERldGFpbHM+KHsga2V5UHJlZml4OiBSZXdhcmRzQm94UHJlZml4RGlzYnVyc2VtZW50cyB9KQogICAgYnl0ZWNfMCAvLyAiZCIKICAgIGRpZyAxCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDIyLTQzNAogICAgLy8gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZSA9IHsKICAgIC8vICAgY3JlYXRvcjogVHhuLnNlbmRlciwKICAgIC8vICAgZmluYWxpemVkOiB0cnVlLAogICAgLy8gICB0aXRsZTogJycsCiAgICAvLyAgIGFtb3VudDogc3VtLAogICAgLy8gICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgIGV4cGlyYXRpb24sCiAgICAvLyAgIGFsbG9jYXRpb25zOiBhbGxvY2F0aW9ucy5sZW5ndGgsCiAgICAvLyAgIGRpc3RyaWJ1dGVkOiAwLAogICAgLy8gICBtYnJDcmVkaXRzOiAwLAogICAgLy8gICB1c2VkTWJyQ3JlZGl0czogYWxsb2NhdGlvbnNNYnIsCiAgICAvLyAgIG5vdGU6ICcnLAogICAgLy8gfQogICAgZHVwCiAgICBib3hfZGVsCiAgICBwb3AKICAgIHVuY292ZXIgMgogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozOTItMzk4CiAgICAvLyBjcmVhdGVJbnN0YW50QXNhRGlzYnVyc2VtZW50KAogICAgLy8gICBtYnJQYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICB0aW1lVG9VbmxvY2s6IHVpbnQ2NCwKICAgIC8vICAgZXhwaXJhdGlvbjogdWludDY0LAogICAgLy8gICBhbGxvY2F0aW9uczogVXNlckFsbG9jYXRpb25bXQogICAgLy8gKTogdWludDY0IHsKICAgIGJ5dGVjIDUgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjpSZXdhcmRzLmNsYWltUmV3YXJkc1tyb3V0aW5nXSgpIC0+IHZvaWQ6CmNsYWltUmV3YXJkczoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDM5CiAgICAvLyBjbGFpbVJld2FyZHMocmV3YXJkczogQ2xhaW1EZXRhaWxzW10pOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cG4gMgogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGR1cAogICAgY292ZXIgMgogICAgcHVzaGludCAxNgogICAgKgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIHN3YXAKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL3R5cGVzLnRzOjpDbGFpbURldGFpbHM+CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ0MAogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IHJld2FyZHMubGVuZ3RoOyBpICs9IDEpIHsKICAgIGludGNfMCAvLyAwCgpjbGFpbVJld2FyZHNfd2hpbGVfdG9wQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ0MAogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IHJld2FyZHMubGVuZ3RoOyBpICs9IDEpIHsKICAgIGR1cAogICAgZGlnIDIKICAgIDwKICAgIGJ6IGNsYWltUmV3YXJkc19hZnRlcl93aGlsZUAxOQogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0NDEKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmRpc2J1cnNlbWVudHMocmV3YXJkc1tpXS5pZCkuZXhpc3RzLCBFUlJfRElTQlVSU0VNRU5UX0RPRVNfTk9UX0VYSVNUKQogICAgZGlnIDIKICAgIGV4dHJhY3QgMiAwCiAgICBkaWcgMQogICAgcHVzaGludCAxNgogICAgKgogICAgcHVzaGludCAxNgogICAgZXh0cmFjdDMgLy8gb24gZXJyb3I6IGluZGV4IGFjY2VzcyBpcyBvdXQgb2YgYm91bmRzCiAgICBkdXAKICAgIGNvdmVyIDQKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBjb3ZlciA1CiAgICBpdG9iCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NjkKICAgIC8vIGRpc2J1cnNlbWVudHMgPSBCb3hNYXA8dWludDY0LCBEaXNidXJzZW1lbnREZXRhaWxzPih7IGtleVByZWZpeDogUmV3YXJkc0JveFByZWZpeERpc2J1cnNlbWVudHMgfSkKICAgIGJ5dGVjXzAgLy8gImQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0NDEKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmRpc2J1cnNlbWVudHMocmV3YXJkc1tpXS5pZCkuZXhpc3RzLCBFUlJfRElTQlVSU0VNRU5UX0RPRVNfTk9UX0VYSVNUKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogY2xhaW1SZXdhcmRzX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlY18yIC8vICJFUlI6REJORSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpEQk5FCgpjbGFpbVJld2FyZHNfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ0MwogICAgLy8gY29uc3QgeyB0aW1lVG9VbmxvY2ssIGV4cGlyYXRpb24sIGFtb3VudCwgZGlzdHJpYnV0ZWQsIG5vdGUgfSA9IHRoaXMuZGlzYnVyc2VtZW50cyhyZXdhcmRzW2ldLmlkKS52YWx1ZQogICAgZGlnIDEKICAgIGR1cAogICAgcHVzaGludCA0MwogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBkaWcgMQogICAgcHVzaGludCA1MQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBjb3ZlciA3CiAgICBkaWcgMQogICAgcHVzaGludCAzNQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBjb3ZlciA0CiAgICBkaWcgMQogICAgcHVzaGludCA2NwogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBjb3ZlciA0CiAgICBkaWcgMQogICAgcHVzaGludCA5MQogICAgaW50Y18zIC8vIDIKICAgIGJveF9leHRyYWN0CiAgICBidG9pCiAgICBkaWcgMgogICAgZGlnIDEKICAgIGludGNfMyAvLyAyCiAgICBib3hfZXh0cmFjdAogICAgYnRvaQogICAgaW50Y18zIC8vIDIKICAgICsKICAgIHVuY292ZXIgMwogICAgY292ZXIgMgogICAgYm94X2V4dHJhY3QKICAgIGV4dHJhY3QgMiAwCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ0NAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRpbWVUb1VubG9jayA8PSBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLCBFUlJfRElTQlVSU0VNRU5UX0xPQ0tFRCkKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIDw9CiAgICBibnogY2xhaW1SZXdhcmRzX2FmdGVyX2Fzc2VydEA3CiAgICBieXRlYyAxOSAvLyAiRVJSOkRCTEsiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6REJMSwoKY2xhaW1SZXdhcmRzX2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0NDUKICAgIC8vIGxvZ2dlZEFzc2VydChleHBpcmF0aW9uID49IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsIEVSUl9ESVNCVVJTRU1FTlRfTE9DS0VEKQogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgdW5jb3ZlciA5CiAgICA8PQogICAgYm56IGNsYWltUmV3YXJkc19hZnRlcl9hc3NlcnRAOQogICAgYnl0ZWMgMTkgLy8gIkVSUjpEQkxLIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkRCTEsKCmNsYWltUmV3YXJkc19hZnRlcl9hc3NlcnRAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDQ2CiAgICAvLyBsb2dnZWRBc3NlcnQoYW1vdW50ID4gZGlzdHJpYnV0ZWQsIEVSUl9ESVNCVVJTRU1FTlRfRlVMTFlfRElTVFJJQlVURUQpCiAgICB1bmNvdmVyIDQKICAgIHVuY292ZXIgNAogICAgPgogICAgYm56IGNsYWltUmV3YXJkc19hZnRlcl9hc3NlcnRAMTEKICAgIHB1c2hieXRlcyAiRVJSOkRCRkQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6REJGRAoKY2xhaW1SZXdhcmRzX2FmdGVyX2Fzc2VydEAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDUwCiAgICAvLyBhZGRyZXNzOiBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0NTEKICAgIC8vIGFzc2V0OiByZXdhcmRzW2ldLmFzc2V0LAogICAgdW5jb3ZlciA3CiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgY292ZXIgOAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0NDgtNDUyCiAgICAvLyBjb25zdCB1c2VyQWxsb2NhdGlvbnNLZXk6IFVzZXJBbGxvY2F0aW9uc0tleSA9IHsKICAgIC8vICAgZGlzYnVyc2VtZW50SUQ6IHJld2FyZHNbaV0uaWQsCiAgICAvLyAgIGFkZHJlc3M6IFR4bi5zZW5kZXIsCiAgICAvLyAgIGFzc2V0OiByZXdhcmRzW2ldLmFzc2V0LAogICAgLy8gfQogICAgaXRvYgogICAgY29uY2F0CiAgICB1bmNvdmVyIDQKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo3NQogICAgLy8gdXNlckFsbG9jYXRpb25zID0gQm94TWFwPFVzZXJBbGxvY2F0aW9uc0tleSwgdWludDY0Pih7IGtleVByZWZpeDogUmV3YXJkc0JveFByZWZpeFVzZXJBbGxvY2F0aW9ucyB9KQogICAgYnl0ZWMgNCAvLyAidSIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ1MwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMudXNlckFsbG9jYXRpb25zKHVzZXJBbGxvY2F0aW9uc0tleSkuZXhpc3RzLCBFUlJfQUxMT0NBVElPTl9ET0VTX05PVF9FWElTVCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGNsYWltUmV3YXJkc19hZnRlcl9hc3NlcnRAMTMKICAgIGJ5dGVjIDIwIC8vICJFUlI6QUxORSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpBTE5FCgpjbGFpbVJld2FyZHNfYWZ0ZXJfYXNzZXJ0QDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0NTQKICAgIC8vIGNvbnN0IHVzZXJBbGxvY2F0aW9uID0gdGhpcy51c2VyQWxsb2NhdGlvbnModXNlckFsbG9jYXRpb25zS2V5KS52YWx1ZQogICAgZHVwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgYnRvaQogICAgZHVwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ1NgogICAgLy8gdGhpcy5kaXNidXJzZW1lbnRzKHJld2FyZHNbaV0uaWQpLnZhbHVlLmFsbG9jYXRpb25zIC09IDEKICAgIHVuY292ZXIgNQogICAgZHVwCiAgICBwdXNoaW50IDU5CiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBpdG9iCiAgICBkaWcgMQogICAgcHVzaGludCA1OQogICAgdW5jb3ZlciAyCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0NTcKICAgIC8vIHRoaXMuZGlzYnVyc2VtZW50cyhyZXdhcmRzW2ldLmlkKS52YWx1ZS5kaXN0cmlidXRlZCArPSB1c2VyQWxsb2NhdGlvbgogICAgZHVwCiAgICBwdXNoaW50IDY3CiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIHVuY292ZXIgMgogICAgKwogICAgaXRvYgogICAgcHVzaGludCA2NwogICAgc3dhcAogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDU4CiAgICAvLyB0aGlzLnVzZXJBbGxvY2F0aW9ucyh1c2VyQWxsb2NhdGlvbnNLZXkpLmRlbGV0ZSgpCiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDU5CiAgICAvLyB0aGlzLnJlZnVuZEFsbG9jYXRpb25NYnIocmV3YXJkc1tpXS5pZCkKICAgIHVuY292ZXIgNgogICAgY2FsbHN1YiByZWZ1bmRBbGxvY2F0aW9uTWJyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ2MwogICAgLy8gaWYgKCFpc0FsZ28pIHsKICAgIGRpZyA1CiAgICBieiBjbGFpbVJld2FyZHNfZWxzZV9ib2R5QDE2CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ2NQogICAgLy8gYXNzZXRSZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDcxCiAgICAvLyBhc3NldFhmZXIuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBOb3RlCiAgICB1bmNvdmVyIDUKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDY0LTQ2OQogICAgLy8gY29uc3QgYXNzZXRYZmVyID0gaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgYXNzZXRSZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgYXNzZXRBbW91bnQ6IHVzZXJBbGxvY2F0aW9uLAogICAgLy8gICB4ZmVyQXNzZXQ6IHJld2FyZHNbaV0uYXNzZXQsCiAgICAvLyAgIG5vdGUsCiAgICAvLyB9KQogICAgcHVzaGludCA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDcxCiAgICAvLyBhc3NldFhmZXIuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CgpjbGFpbVJld2FyZHNfYWZ0ZXJfaWZfZWxzZUAxODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDQwCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgcmV3YXJkcy5sZW5ndGg7IGkgKz0gMSkgewogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGIgY2xhaW1SZXdhcmRzX3doaWxlX3RvcEAyCgpjbGFpbVJld2FyZHNfZWxzZV9ib2R5QDE2OgogICAgdW5jb3ZlciA1CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDc0CiAgICAvLyByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDc5CiAgICAvLyBwYXltZW50LnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgTm90ZQogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDczLTQ3NwogICAgLy8gY29uc3QgcGF5bWVudCA9IGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICBhbW91bnQ6IHVzZXJBbGxvY2F0aW9uLAogICAgLy8gICBub3RlLAogICAgLy8gfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDc5CiAgICAvLyBwYXltZW50LnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgYiBjbGFpbVJld2FyZHNfYWZ0ZXJfaWZfZWxzZUAxOAoKY2xhaW1SZXdhcmRzX2FmdGVyX3doaWxlQDE5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0MzkKICAgIC8vIGNsYWltUmV3YXJkcyhyZXdhcmRzOiBDbGFpbURldGFpbHNbXSk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6OlJld2FyZHMucmVjbGFpbVJld2FyZHNbcm91dGluZ10oKSAtPiB2b2lkOgpyZWNsYWltUmV3YXJkczoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDg0CiAgICAvLyByZWNsYWltUmV3YXJkcyhpZDogdWludDY0LCByZWNsYWltczogQWxsb2NhdGlvblJlY2xhaW1EZXRhaWxzW10pOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIHB1c2hpbnQgNDAKICAgICoKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxzbWFydF9jb250cmFjdHMvcmV3YXJkcy90eXBlcy50czo6QWxsb2NhdGlvblJlY2xhaW1EZXRhaWxzPgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0ODUKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmRpc2J1cnNlbWVudHMoaWQpLmV4aXN0cywgRVJSX0RJU0JVUlNFTUVOVF9ET0VTX05PVF9FWElTVCkKICAgIGl0b2IKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2OQogICAgLy8gZGlzYnVyc2VtZW50cyA9IEJveE1hcDx1aW50NjQsIERpc2J1cnNlbWVudERldGFpbHM+KHsga2V5UHJlZml4OiBSZXdhcmRzQm94UHJlZml4RGlzYnVyc2VtZW50cyB9KQogICAgYnl0ZWNfMCAvLyAiZCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ4NQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZGlzYnVyc2VtZW50cyhpZCkuZXhpc3RzLCBFUlJfRElTQlVSU0VNRU5UX0RPRVNfTk9UX0VYSVNUKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogcmVjbGFpbVJld2FyZHNfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjXzIgLy8gIkVSUjpEQk5FIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkRCTkUKCnJlY2xhaW1SZXdhcmRzX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0ODYKICAgIC8vIGNvbnN0IHsgY3JlYXRvciwgZmluYWxpemVkLCBleHBpcmF0aW9uIH0gPSB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlCiAgICBkdXBuIDIKICAgIGludGNfMCAvLyAwCiAgICBwdXNoaW50IDMyCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgZHVwCiAgICBjb3ZlciAyCiAgICBjb3ZlciAzCiAgICBkdXAKICAgIHB1c2hpbnQgMzIKICAgIGludGNfMSAvLyAxCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgY292ZXIgMwogICAgcHVzaGludCA1MQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ4OAogICAgLy8gbG9nZ2VkQXNzZXJ0KGNyZWF0b3IgPT09IFR4bi5zZW5kZXIsIEVSUl9ZT1VfQVJFX05PVF9USEVfQ1JFQVRPUikKICAgIHR4biBTZW5kZXIKICAgID09CiAgICBibnogcmVjbGFpbVJld2FyZHNfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjXzMgLy8gIkVSUjpZTkNSIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOllOQ1IKCnJlY2xhaW1SZXdhcmRzX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0ODkKICAgIC8vIGxvZ2dlZEFzc2VydChmaW5hbGl6ZWQsIEVSUl9ESVNCVVJTRU1FTlRfQUxSRUFEWV9GSU5BTCkKICAgIHVuY292ZXIgMgogICAgYm56IHJlY2xhaW1SZXdhcmRzX2FmdGVyX2Fzc2VydEA3CiAgICBieXRlYyA3IC8vICJFUlI6REJBRiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpEQkFGCgpyZWNsYWltUmV3YXJkc19hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDkwCiAgICAvLyBsb2dnZWRBc3NlcnQoZXhwaXJhdGlvbiA8PSBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLCBFUlJfRElTQlVSU0VNRU5UX05PVF9FWFBJUkVEKQogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgPD0KICAgIGJueiByZWNsYWltUmV3YXJkc19hZnRlcl9hc3NlcnRAOQogICAgcHVzaGJ5dGVzICJFUlI6REJOWCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpEQk5YCgpyZWNsYWltUmV3YXJkc19hZnRlcl9hc3NlcnRAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDkyCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgcmVjbGFpbXMubGVuZ3RoOyBpICs9IDEpIHsKICAgIGludGNfMCAvLyAwCgpyZWNsYWltUmV3YXJkc193aGlsZV90b3BAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ5MgogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IHJlY2xhaW1zLmxlbmd0aDsgaSArPSAxKSB7CiAgICBkdXAKICAgIGRpZyA1CiAgICA8CiAgICBieiByZWNsYWltUmV3YXJkc19hZnRlcl93aGlsZUAxOQogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0OTUKICAgIC8vIGFkZHJlc3M6IHJlY2xhaW1zW2ldLmFkZHJlc3MsCiAgICBkaWcgNQogICAgZXh0cmFjdCAyIDAKICAgIGRpZyAxCiAgICBwdXNoaW50IDQwCiAgICAqCiAgICBwdXNoaW50IDQwCiAgICBleHRyYWN0MyAvLyBvbiBlcnJvcjogaW5kZXggYWNjZXNzIGlzIG91dCBvZiBib3VuZHMKICAgIGR1cAogICAgZXh0cmFjdCAwIDMyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ5NgogICAgLy8gYXNzZXQ6IHJlY2xhaW1zW2ldLmFzc2V0LAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0OTUtNDk2CiAgICAvLyBhZGRyZXNzOiByZWNsYWltc1tpXS5hZGRyZXNzLAogICAgLy8gYXNzZXQ6IHJlY2xhaW1zW2ldLmFzc2V0LAogICAgcHVzaGludCAzMgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0OTYKICAgIC8vIGFzc2V0OiByZWNsYWltc1tpXS5hc3NldCwKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGNvdmVyIDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDkzLTQ5NwogICAgLy8gY29uc3QgdXNlckFsbG9jYXRpb25zS2V5OiBVc2VyQWxsb2NhdGlvbnNLZXkgPSB7CiAgICAvLyAgIGRpc2J1cnNlbWVudElEOiBpZCwKICAgIC8vICAgYWRkcmVzczogcmVjbGFpbXNbaV0uYWRkcmVzcywKICAgIC8vICAgYXNzZXQ6IHJlY2xhaW1zW2ldLmFzc2V0LAogICAgLy8gfQogICAgaXRvYgogICAgY29uY2F0CiAgICBkaWcgNQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjc1CiAgICAvLyB1c2VyQWxsb2NhdGlvbnMgPSBCb3hNYXA8VXNlckFsbG9jYXRpb25zS2V5LCB1aW50NjQ+KHsga2V5UHJlZml4OiBSZXdhcmRzQm94UHJlZml4VXNlckFsbG9jYXRpb25zIH0pCiAgICBieXRlYyA0IC8vICJ1IgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDk4CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy51c2VyQWxsb2NhdGlvbnModXNlckFsbG9jYXRpb25zS2V5KS5leGlzdHMsIEVSUl9BTExPQ0FUSU9OX0RPRVNfTk9UX0VYSVNUKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogcmVjbGFpbVJld2FyZHNfYWZ0ZXJfYXNzZXJ0QDEzCiAgICBieXRlYyAyMCAvLyAiRVJSOkFMTkUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6QUxORQoKcmVjbGFpbVJld2FyZHNfYWZ0ZXJfYXNzZXJ0QDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1MDAKICAgIC8vIGNvbnN0IHVzZXJBbGxvY2F0aW9uID0gdGhpcy51c2VyQWxsb2NhdGlvbnModXNlckFsbG9jYXRpb25zS2V5KS52YWx1ZQogICAgZHVwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgYnRvaQogICAgZHVwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjUwMgogICAgLy8gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZS5hbGxvY2F0aW9ucyAtPSAxCiAgICBkaWcgNAogICAgZHVwCiAgICBwdXNoaW50IDU5CiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBpdG9iCiAgICBkaWcgMQogICAgcHVzaGludCA1OQogICAgdW5jb3ZlciAyCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1MDMKICAgIC8vIHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUuYW1vdW50IC09IHVzZXJBbGxvY2F0aW9uCiAgICBkdXAKICAgIHB1c2hpbnQgMzUKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgdW5jb3ZlciAyCiAgICAtCiAgICBpdG9iCiAgICBwdXNoaW50IDM1CiAgICBzd2FwCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1MDQKICAgIC8vIHRoaXMudXNlckFsbG9jYXRpb25zKHVzZXJBbGxvY2F0aW9uc0tleSkuZGVsZXRlKCkKICAgIGJveF9kZWwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1MDUKICAgIC8vIHRoaXMucmVmdW5kQWxsb2NhdGlvbk1icihpZCkKICAgIGRpZyA4CiAgICBjYWxsc3ViIHJlZnVuZEFsbG9jYXRpb25NYnIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTA5CiAgICAvLyBpZiAoIWlzQWxnbykgewogICAgZGlnIDMKICAgIGJ6IHJlY2xhaW1SZXdhcmRzX2Vsc2VfYm9keUAxNgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1MTYKICAgIC8vIHhmZXIuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIHVuY292ZXIgMwogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGRpZyAyCiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTEwLTUxNAogICAgLy8gY29uc3QgeGZlciA9IGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgIGFzc2V0UmVjZWl2ZXI6IGNyZWF0b3IsCiAgICAvLyAgIGFzc2V0QW1vdW50OiB1c2VyQWxsb2NhdGlvbiwKICAgIC8vICAgeGZlckFzc2V0OiByZWNsYWltc1tpXS5hc3NldCwKICAgIC8vIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1MTYKICAgIC8vIHhmZXIuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CgpyZWNsYWltUmV3YXJkc19hZnRlcl9pZl9lbHNlQDE4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0OTIKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCByZWNsYWltcy5sZW5ndGg7IGkgKz0gMSkgewogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGIgcmVjbGFpbVJld2FyZHNfd2hpbGVfdG9wQDEwCgpyZWNsYWltUmV3YXJkc19lbHNlX2JvZHlAMTY6CiAgICB1bmNvdmVyIDMKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1MTgtNTIzCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogY3JlYXRvciwKICAgIC8vICAgICBhbW91bnQ6IHVzZXJBbGxvY2F0aW9uLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBkaWcgMgogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1MTgtNTIyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogY3JlYXRvciwKICAgIC8vICAgICBhbW91bnQ6IHVzZXJBbGxvY2F0aW9uLAogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1MTgtNTIzCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogY3JlYXRvciwKICAgIC8vICAgICBhbW91bnQ6IHVzZXJBbGxvY2F0aW9uLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICBiIHJlY2xhaW1SZXdhcmRzX2FmdGVyX2lmX2Vsc2VAMTgKCnJlY2xhaW1SZXdhcmRzX2FmdGVyX3doaWxlQDE5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0ODQKICAgIC8vIHJlY2xhaW1SZXdhcmRzKGlkOiB1aW50NjQsIHJlY2xhaW1zOiBBbGxvY2F0aW9uUmVjbGFpbURldGFpbHNbXSk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6OlJld2FyZHMuYWxsb2NhdGlvbk1ickNyZWRpdFNob3J0ZmFsbFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmFsbG9jYXRpb25NYnJDcmVkaXRTaG9ydGZhbGw6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjUzMAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjUzMgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZGlzYnVyc2VtZW50cyhpZCkuZXhpc3RzLCBFUlJfRElTQlVSU0VNRU5UX0RPRVNfTk9UX0VYSVNUKQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2OQogICAgLy8gZGlzYnVyc2VtZW50cyA9IEJveE1hcDx1aW50NjQsIERpc2J1cnNlbWVudERldGFpbHM+KHsga2V5UHJlZml4OiBSZXdhcmRzQm94UHJlZml4RGlzYnVyc2VtZW50cyB9KQogICAgYnl0ZWNfMCAvLyAiZCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjUzMgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZGlzYnVyc2VtZW50cyhpZCkuZXhpc3RzLCBFUlJfRElTQlVSU0VNRU5UX0RPRVNfTk9UX0VYSVNUKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogYWxsb2NhdGlvbk1ickNyZWRpdFNob3J0ZmFsbF9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWNfMiAvLyAiRVJSOkRCTkUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6REJORQoKYWxsb2NhdGlvbk1ickNyZWRpdFNob3J0ZmFsbF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTM0CiAgICAvLyBjb25zdCBtYnJBbW91bnQ6IHVpbnQ2NCA9IFVzZXJBbGxvY2F0aW9uTUJSICogYWxsb2NhdGlvbkNvdW50CiAgICBpbnRjIDQgLy8gMjUzMDAKICAgIHVuY292ZXIgMgogICAgKgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjUzNQogICAgLy8gY29uc3QgY3JlZGl0czogdWludDY0ID0gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZS5tYnJDcmVkaXRzCiAgICB1bmNvdmVyIDIKICAgIHB1c2hpbnQgNzUKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTM2CiAgICAvLyBpZiAoY3JlZGl0cyA+PSBtYnJBbW91bnQpIHsKICAgID49CiAgICBieiBhbGxvY2F0aW9uTWJyQ3JlZGl0U2hvcnRmYWxsX2FmdGVyX2lmX2Vsc2VANQogICAgcG9wbiAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjUzNwogICAgLy8gcmV0dXJuIDAKICAgIGludGNfMCAvLyAwCgphbGxvY2F0aW9uTWJyQ3JlZGl0U2hvcnRmYWxsX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo6UmV3YXJkcy5hbGxvY2F0aW9uTWJyQ3JlZGl0U2hvcnRmYWxsQDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjUzMAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBpdG9iCiAgICBieXRlYyA1IC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgphbGxvY2F0aW9uTWJyQ3JlZGl0U2hvcnRmYWxsX2FmdGVyX2lmX2Vsc2VANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTQwCiAgICAvLyByZXR1cm4gbWJyQW1vdW50IC0gY3JlZGl0cwogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1MzAKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYiBhbGxvY2F0aW9uTWJyQ3JlZGl0U2hvcnRmYWxsX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo6UmV3YXJkcy5hbGxvY2F0aW9uTWJyQ3JlZGl0U2hvcnRmYWxsQDYKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6QWtpdGFCYXNlQ29udHJhY3QudXBkYXRlQWtpdGFEQU9bcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGVBa2l0YURBTzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM2CiAgICAvLyB1cGRhdGVBa2l0YURBTyhha2l0YURBTzogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM3CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWMgMTAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBwdXNoYnl0ZXMgIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM3CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGJueiB1cGRhdGVBa2l0YURBT19hZnRlcl9hc3NlcnRAMwogICAgcHVzaGJ5dGVzICJFUlI6TkRBTyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOREFPCgp1cGRhdGVBa2l0YURBT19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWMgMTAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM4CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlID0gYWtpdGFEQU8KICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozNgogICAgLy8gdXBkYXRlQWtpdGFEQU8oYWtpdGFEQU86IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvYmFzZS50czo6QmFzZVJld2FyZHMubWJyW3JvdXRpbmddKCkgLT4gdm9pZDoKbWJyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvYmFzZS50czo3CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9iYXNlLnRzOjpCYXNlUmV3YXJkcy5tYnIKICAgIGJ5dGVjIDUgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6OkNvbnRyYWN0V2l0aE9wdEluLm9wdEluW3JvdXRpbmddKCkgLT4gdm9pZDoKb3B0SW46CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6MjMKICAgIC8vIG9wdEluKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYXNzZXQ6IEFzc2V0KTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cG4gMgogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czoyNQogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfSU5WQUxJRF9QQVlNRU5UX1JFQ0VJVkVSKQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IG9wdEluX2FmdGVyX2Fzc2VydEAzCiAgICBwdXNoYnl0ZXMgIkVSUjpJUE1SIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQTVIKCm9wdEluX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjI2CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSwgRVJSX0lOVkFMSURfUEFZTUVOVF9BTU9VTlQpCiAgICBzd2FwCiAgICBndHhucyBBbW91bnQKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgPT0KICAgIGJueiBvcHRJbl9hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6SVBNQSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUE1BCgpvcHRJbl9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czoyOC0zNAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IDAsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czozMAogICAgLy8gYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgc3dhcAogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czozMQogICAgLy8gYXNzZXRBbW91bnQ6IDAsCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6MjgtMzMKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vICAgfSkKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6MjgtMzQKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjIzCiAgICAvLyBvcHRJbihwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGFzc2V0OiBBc3NldCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6OlJld2FyZHMubmV3RGlzYnVyc2VtZW50SUQoKSAtPiB1aW50NjQ6Cm5ld0Rpc2J1cnNlbWVudElEOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo4MAogICAgLy8gY29uc3QgaWQgPSB0aGlzLmRpc2J1cnNlbWVudElELnZhbHVlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1OQogICAgLy8gZGlzYnVyc2VtZW50SUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAxLCBrZXk6IFJld2FyZHNHbG9iYWxTdGF0ZUtleURpc2J1cnNlbWVudElEIH0pCiAgICBieXRlYyA5IC8vICJkaXNidXJzZW1lbnRfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjgwCiAgICAvLyBjb25zdCBpZCA9IHRoaXMuZGlzYnVyc2VtZW50SUQudmFsdWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjgxCiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudElELnZhbHVlICs9IDEKICAgIGR1cAogICAgaW50Y18xIC8vIDEKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTkKICAgIC8vIGRpc2J1cnNlbWVudElEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMSwga2V5OiBSZXdhcmRzR2xvYmFsU3RhdGVLZXlEaXNidXJzZW1lbnRJRCB9KQogICAgYnl0ZWMgOSAvLyAiZGlzYnVyc2VtZW50X2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo4MQogICAgLy8gdGhpcy5kaXNidXJzZW1lbnRJRC52YWx1ZSArPSAxCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo4MgogICAgLy8gcmV0dXJuIGlkCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjpSZXdhcmRzLnVzZU1ickNyZWRpdChpZDogdWludDY0LCBhbW91bnQ6IHVpbnQ2NCkgLT4gdm9pZDoKdXNlTWJyQ3JlZGl0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo4OQogICAgLy8gcHJpdmF0ZSB1c2VNYnJDcmVkaXQoaWQ6IHVpbnQ2NCwgYW1vdW50OiB1aW50NjQpOiB2b2lkIHsKICAgIHByb3RvIDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo5MAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUubWJyQ3JlZGl0cyA+PSBhbW91bnQsIEVSUl9JTlZBTElEX01CUl9BTU9VTlQpCiAgICBmcmFtZV9kaWcgLTIKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NjkKICAgIC8vIGRpc2J1cnNlbWVudHMgPSBCb3hNYXA8dWludDY0LCBEaXNidXJzZW1lbnREZXRhaWxzPih7IGtleVByZWZpeDogUmV3YXJkc0JveFByZWZpeERpc2J1cnNlbWVudHMgfSkKICAgIGJ5dGVjXzAgLy8gImQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo5MAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUubWJyQ3JlZGl0cyA+PSBhbW91bnQsIEVSUl9JTlZBTElEX01CUl9BTU9VTlQpCiAgICBwdXNoaW50IDc1CiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGZyYW1lX2RpZyAtMQogICAgPj0KICAgIGJueiB1c2VNYnJDcmVkaXRfYWZ0ZXJfYXNzZXJ0QDIKICAgIGJ5dGVjIDggLy8gIkVSUjpJTUJSIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklNQlIKCnVzZU1ickNyZWRpdF9hZnRlcl9hc3NlcnRAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6OTEKICAgIC8vIHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUubWJyQ3JlZGl0cyAtPSBhbW91bnQKICAgIGR1cAogICAgcHVzaGludCA3NQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBmcmFtZV9kaWcgLTEKICAgIC0KICAgIGl0b2IKICAgIGRpZyAxCiAgICBwdXNoaW50IDc1CiAgICB1bmNvdmVyIDIKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjkyCiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlLnVzZWRNYnJDcmVkaXRzICs9IGFtb3VudAogICAgZHVwCiAgICBwdXNoaW50IDgzCiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGZyYW1lX2RpZyAtMQogICAgKwogICAgaXRvYgogICAgcHVzaGludCA4MwogICAgc3dhcAogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6OlJld2FyZHMucmVmdW5kQWxsb2NhdGlvbk1icihpZDogdWludDY0KSAtPiB2b2lkOgpyZWZ1bmRBbGxvY2F0aW9uTWJyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxMDEKICAgIC8vIHByaXZhdGUgcmVmdW5kQWxsb2NhdGlvbk1icihpZDogdWludDY0KTogdm9pZCB7CiAgICBwcm90byAxIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6OTYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlLnVzZWRNYnJDcmVkaXRzID49IGFtb3VudCwgRVJSX0lOVkFMSURfTUJSX0FNT1VOVCkKICAgIGZyYW1lX2RpZyAtMQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2OQogICAgLy8gZGlzYnVyc2VtZW50cyA9IEJveE1hcDx1aW50NjQsIERpc2J1cnNlbWVudERldGFpbHM+KHsga2V5UHJlZml4OiBSZXdhcmRzQm94UHJlZml4RGlzYnVyc2VtZW50cyB9KQogICAgYnl0ZWNfMCAvLyAiZCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjk2CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZS51c2VkTWJyQ3JlZGl0cyA+PSBhbW91bnQsIEVSUl9JTlZBTElEX01CUl9BTU9VTlQpCiAgICBwdXNoaW50IDgzCiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTAyCiAgICAvLyB0aGlzLnJlbGVhc2VNYnJDcmVkaXQoaWQsIFVzZXJBbGxvY2F0aW9uTUJSKQogICAgaW50YyA0IC8vIDI1MzAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjk2CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZS51c2VkTWJyQ3JlZGl0cyA+PSBhbW91bnQsIEVSUl9JTlZBTElEX01CUl9BTU9VTlQpCiAgICA+PQogICAgYm56IHJlZnVuZEFsbG9jYXRpb25NYnJfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDggLy8gIkVSUjpJTUJSIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklNQlIKCnJlZnVuZEFsbG9jYXRpb25NYnJfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjk3CiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlLnVzZWRNYnJDcmVkaXRzIC09IGFtb3VudAogICAgZHVwCiAgICBwdXNoaW50IDgzCiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTAyCiAgICAvLyB0aGlzLnJlbGVhc2VNYnJDcmVkaXQoaWQsIFVzZXJBbGxvY2F0aW9uTUJSKQogICAgaW50YyA0IC8vIDI1MzAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjk3CiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlLnVzZWRNYnJDcmVkaXRzIC09IGFtb3VudAogICAgLQogICAgaXRvYgogICAgZGlnIDEKICAgIHB1c2hpbnQgODMKICAgIHVuY292ZXIgMgogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6OTgKICAgIC8vIHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUubWJyQ3JlZGl0cyArPSBhbW91bnQKICAgIGR1cAogICAgcHVzaGludCA3NQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjEwMgogICAgLy8gdGhpcy5yZWxlYXNlTWJyQ3JlZGl0KGlkLCBVc2VyQWxsb2NhdGlvbk1CUikKICAgIGludGMgNCAvLyAyNTMwMAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo5OAogICAgLy8gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZS5tYnJDcmVkaXRzICs9IGFtb3VudAogICAgKwogICAgaXRvYgogICAgcHVzaGludCA3NQogICAgc3dhcAogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2Jhc2UudHM6OkJhc2VSZXdhcmRzLm1icih0aXRsZTogYnl0ZXMsIG5vdGU6IGJ5dGVzKSAtPiBieXRlczoKc21hcnRfY29udHJhY3RzL3Jld2FyZHMvYmFzZS50czo6QmFzZVJld2FyZHMubWJyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvYmFzZS50czo3LTgKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgLy8gbWJyKHRpdGxlOiBzdHJpbmcsIG5vdGU6IHN0cmluZyk6IFJld2FyZHNNQlJEYXRhIHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvYmFzZS50czoxMAogICAgLy8gZGlzYnVyc2VtZW50czogTWluRGlzYnVyc2VtZW50c01CUiArIChCb3hDb3N0UGVyQnl0ZSAqIChCeXRlcyh0aXRsZSkubGVuZ3RoICsgQnl0ZXMobm90ZSkubGVuZ3RoKSksCiAgICBmcmFtZV9kaWcgLTIKICAgIGxlbgogICAgZnJhbWVfZGlnIC0xCiAgICBsZW4KICAgICsKICAgIHB1c2hpbnQgNDAwCiAgICAqCiAgICBpbnRjIDUgLy8gNDE3MDAKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2Jhc2UudHM6OS0xMgogICAgLy8gcmV0dXJuIHsKICAgIC8vICAgZGlzYnVyc2VtZW50czogTWluRGlzYnVyc2VtZW50c01CUiArIChCb3hDb3N0UGVyQnl0ZSAqIChCeXRlcyh0aXRsZSkubGVuZ3RoICsgQnl0ZXMobm90ZSkubGVuZ3RoKSksCiAgICAvLyAgIHVzZXJBbGxvY2F0aW9uczogVXNlckFsbG9jYXRpb25NQlIKICAgIC8vIH0KICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2Jhc2UudHM6MTEKICAgIC8vIHVzZXJBbGxvY2F0aW9uczogVXNlckFsbG9jYXRpb25NQlIKICAgIGludGMgNCAvLyAyNTMwMAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvYmFzZS50czo5LTEyCiAgICAvLyByZXR1cm4gewogICAgLy8gICBkaXNidXJzZW1lbnRzOiBNaW5EaXNidXJzZW1lbnRzTUJSICsgKEJveENvc3RQZXJCeXRlICogKEJ5dGVzKHRpdGxlKS5sZW5ndGggKyBCeXRlcyhub3RlKS5sZW5ndGgpKSwKICAgIC8vICAgdXNlckFsbG9jYXRpb25zOiBVc2VyQWxsb2NhdGlvbk1CUgogICAgLy8gfQogICAgaXRvYgogICAgY29uY2F0CiAgICByZXRzdWIK", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyAGAAEIAtTFAeTFAiYVAWQIRVJSOklQQVkIRVJSOkRCTkUIRVJSOllOQ1IBdQQVH3x1CEVSUjpJWEZSCEVSUjpEQkFGCEVSUjpJTUJSD2Rpc2J1cnNlbWVudF9pZAlha2l0YV9kYW8IRVJSOkFMQUUDAABdCEVSUjpJRFVUCEVSUjpJRFhUCEVSUjpEQkVNCEVSUjpEQk1BA4AAXQYAXwAAAAAIRVJSOkRCTEsIRVJSOkFMTkUxGEAABCcJI2cxGRREMRhBAIGCEQRmYSBaBNYaafoEHJ672wSPSSYtBFZWrPkE9izcKwRvXBDPBFQkpZEEe33F/ASvGhTyBD7ECqQEvTzQkAQUlp2XBDPpLJQEhU3t4ATVS7rZBDlOrrI2GgCOEQA8AJUBAQHNApQDtwTgBt4HjwheCVcKhguHC8sAAQv+DCgAI0OABM2a1n42GgCOAQABADYaAUkiWSUISwEVEkRXAgA2GgJJFSQSRBeAB3ZlcnNpb25PAmcnCkxnI0M2GgFJFSQSRBcxFiMJSU4COBAjEkQWKExQSb1FAUAAAyqwAEkigSC6MQASQAADK7AASwE4BzIKEkAAAymwAEw4CElAAAMpsABMSYFLJLoXTwIIFoFLTLsjQzYaAUkVJBJEFzYaAkkVJBJEF0wWKExQSb1FAUAAAyqwAEkigSC6MQASQAADK7AASwFAAAQnCLAASYFLJLoXSwIPQAAEJwiwAEmBSyS6F08CSU4CCRZPAoFLTwK7sTEAsgeyCCOyECKyAbMjQzEWIwlHAjgQIxJENhoBSSJZJQhLARUSRFcCAElOAzYaAkkVJBJEF04DNhoDSRUkEkQXTgM2GgRJIlklCEsBFRJEVwIASU4EiAswTgSIC6oiW0w4BzIKEkAAAymwAEw4CElLAg9AAAMpsAAxAExPAglPBkkVFlcGAkxQTwInDFBLARWBXQgiFk8CSwFQTwgWUE8HFlBLAVBLAVBPBBZQTFBPBEkVFlcGAkxQTwIWVwYCTwJMUE8CUExQTBYoSwFQSbxITwK/JwVMULAjQzYaAUkVJBJEFzYaAklOAkkiWSUITBVJTgMSRDYaA0lOAhUkEkQ2GgRJTgIVJBJENhoFSU4CSSJZJQhMFRJEFihMUEm9RQFAAAMqsABHAiKBILpMgSAjuiJTTDEAEkAAAyuwAEEABCcHsABJvkRJgSFZSwEiSwJYTwhQSwKBW1lLAxVPBEsCTwJSTwJMUEsBTwMJTwJPBwhMCRZXBgJcW0sBvEhLAUy/SYErTwW7SYEzTwS7Sb5ISYFbWSJMWE8CUEsBvEi/I0MiSTEWIwlJOBAjEkQ2GgFJFSQSRBdJTgI2GgJJTgNJIllJTgOBKAslCEwVEkQWSU4DKExQSb1FAUAAAyqwAEcCIoEguksBgSAjuiJTTgNLAYFdJboXJQhLAoFdTwK6VwIARQpLAYFbJboXSwJLASW6FyUITwNOArpXAgBFCjEAEkAAAyuwAExBAAQnB7AAIkwiTEsBSwQMQQBcSwZXAgBLAoEoC4EoWElXACAiFlBLB1AnBExQSb1FAUEABCcLsABMgSBbSRZPAky/SwFJgTskuhcjCBZLAYE7TwK7SYEjJLoXSwIIFoEjTLtPAwhOAkwjCExC/5xGAksGSwiICWckW08CC0sFTIgI6ksBOAcyChJAAAMpsABMOAgSQAADKbAAI0MiSTEWIwlJOBCBBBJENhoBSRUkEkQXSU4CNhoCSU4DSSJZSU4DgSgLJQhMFRJEFklOAyhMUEm9RQFAAAMqsABHAiKBILpLAYEgI7oiU04DSwGBXSW6FyUISwKBXU8CulcCAEUKSwGBWyW6F0sCSwEluhclCE8DTgK6VwIARQoxABJAAAMrsABMQQAEJwewACJMIkxLAUsEDEEAX0sGVwIASwKBKAuBKFhJVwAgSwY4ERZQSwdQJwRMUEm9RQFBAAQnC7AATIEgW0kWTwJMv0sBSYE7JLoXIwgWSwGBO08Cu0mBIyS6F0sCCBaBI0y7TwMITgJMIwhMQv+ZRgJLBksIiAhAJFtPAgtLBUyIB8NLATgUMgoSQAAEJwawAEw4EhJAAAQnBrAAI0M2GgFJFSQSRBdJNhoCSRUkEkQXTgI2GgNJIlklCEsBFRJEVwIASU4CNhoESRUkEkQXTgQ2GgVJFSQSRBdOBDYaBkkiWSUISwEVEkRXAgBJTgM2GgdJTgdJIllJTghJgSgLJQhPAhUSRIgHME4ESwM4ECMSRE4CiAehSSJbTgMkWwtMOAcyChJAAAMpsABPBTgISUsDSwMID0AAAymwADEATE8DCU8FSRUWVwYCTFBPAicMUEsBFYFdCCIWTwJLAVBLCxZQSwoWUEsBUEsBUE8EFlBMUE8FSRUWVwYCTFBPAhZXBgJPAkxQTwJQTFBLAhZJTgMoTFBJTgJJvEhMvyJMSwFLBgxBAItLCUsCSU4CCElOA0k4EIEEEkRLCVcCAE8CgSgLgShYSU4FVwAgTDgRFlBLBlAnBExQSb1FAUEABCcLsABLAjgUMgoSQAAEJwawAE8COBJPBIEgW0lOAhJAAAQnBrAASRZPAky/SwFJgTskuhcjCBZLAYE7TwK7SYEjJLoXTwIIFoEjTLtMIwhMQv9tRQFPA08CiAYMSwUyBw9AAAVLBUAAUSNAAAQnDbAAMgeBPAhLBQ5AAAVLBEAANSNAAAQnDrAASYEjJLoXQAAEJw+wAEmBOyS6F0AABCcQsABJgSAjuiIjVIEgTLsnBUxQsCNDIkL/yCJC/6yAAEk2GgFJFSQSRBcWKExQSb1FAUAAAyqwAEcCIoEguksBgSAjuiJTTgNLAYErJLoXRQVLAYEzJLoXRQZLAYEjJLoXTgNMgTskuhdMMQASQAADK7AATwNBAAQnB7AASwMyBw9AAAVLA0AAQiNAAAQnDbAAMgeBPAhLBQ5AAAVLBEAAJiNAAAQnDrAATwJAAAQnD7AAQAAEJxCwAEmBICO6IiNUgSBMuyNDIkL/1yJC/7sxFiMJSTgQIxJENhoBSRUkEkQXTDYaAkkVJBJEF0w2GgNHAiJZSU4CSYEoCyUITwIVEkSIBLZOBCEEC0lOBCEFCCJJSUsEDEEALksEVwIASwGBKAuBKFhJVwAgIhZQSwkWUEyBIFsnBE8CUEsBFr9PAghMIwhC/8tITwNISwM4BzIKEkAAAymwAE8DOAhPAksCCBJAAAMpsAAxACIWTCcRUE8CFlBPBhZQTwUWUE8CFlBLAVBMUEwWUCcSUEwWKEsBUEm8SE8CvycFTFCwI0MxFiUJSTgQIxJEMRYjCUk4EIEEEkQ2GgFJFSQSRBdOAjYaAkkVJBJEF04CNhoDSU4CSSJZSU4DSYEoCyUITwIVEkSIA9hOBSEEC0lOBSEFCCJJSUsFDEEAMUsFVwIASwGBKAuBKFhJVwAgSwU4ERZQSwoWUEyBIFsnBE8CUEsBFr9PAghMIwhC/8hITwRISwQ4BzIKEkAAAymwAE8EOAhPAhJAAAMpsABLATgUMgoSQAAEJwawAEw4EksBEkAABCcGsAAxACIWTCcRUE8CFlBPBhZQTwUWUE8CFlBLAVBMUEwWUCcSUEwWKEsBUEm8SE8CvycFTFCwI0M2GgFHAiJZSU4CgRALJQhMFRJEIklLAgxBARJLAlcCAEsBgRALgRBYSU4EIltJTgUWSU4CKExQSU4CvUUBQAADKrAASwFJgSskuhdLAYEzJLoXTgdLAYEjJLoXTgRLAYFDJLoXTgRLAYFbJboXSwJLASW6FyUITwNOArpXAgBMMgcOQAAEJxOwADIHTwkOQAAEJxOwAE8ETwQNQAAMgAhFUlI6REJGRLAAMQBPByRbSU4IFlBPBFAnBExQSb1FAUAABCcUsABJvkQXSU4CTwVJgTskuhcjCRZLAYE7TwK7SYFDJLoXTwIIFoFDTLu8SE8GiAJ2SwVBABwxALFPArIFTwWyEbIUshKBBLIQIrIBsyMIQv7/TwVIMQCxTwKyBbIHsggjshAisgGzQv/jI0M2GgFJFSQSRBdJNhoCSU4CSSJZSU4DgSgLJQhMFRJEFkkoTFBJvUUBQAADKrAARwIigSC6SU4CTgNJgSAjuiJTTgOBMyS6F0wxABJAAAMrsABPAkAABCcHsAAyBw5AAAyACEVSUjpEQk5YsAAiSUsFDEEAi0sFVwIASwGBKAuBKFhJVwAgTIEgW0lOBBZQSwVQJwRMUEm9RQFAAAQnFLAASb5EF0lOAksESYE7JLoXIwkWSwGBO08Cu0mBIyS6F08CCRaBI0y7vEhLCIgBbUsDQQAYsU8DshGyEksCshSBBLIQIrIBsyMIQv+CTwNIsbIISwKyByOyECKyAbNC/+cjQzYaAUkVJBJEFzYaAkkVJBJEF0wWKExQSb1FAUAAAyqwACEETwILSU8CgUskuhdJTwIPQQALRgIiFicFTFCwI0MJQv/0NhoBSRUkEkQXMQAiJwplRIAGd2FsbGV0ZUhyCEQSQAAMgAhFUlI6TkRBT7AAJwpMZyNDNhoBSSJZJQhLARUSRFcCADYaAkkiWSUISwEVEkRXAgCIANknBUxQsCNDMRYjCUcCOBAjEkQ2GgFJFSQSRBdMOAcyChJAAAyACEVSUjpJUE1SsABMOAgyEBJAAAyACEVSUjpJUE1BsACxMgpMshEishKyFIEEshAisgGzI0MiJwllREkjCCcJTGeJigIAi/4WKExQSYFLJLoXi/8PQAAEJwiwAEmBSyS6F4v/CRZLAYFLTwK7SYFTJLoXi/8IFoFTTLuJigEAi/8WKExQSYFTJLoXIQQPQAAEJwiwAEmBUyS6FyEECRZLAYFTTwK7SYFLJLoXIQQIFoFLTLuJigIBi/4Vi/8VCIGQAwshBQgWIQQWUIk=", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
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
var RewardsFactory = (_class = class {
  /**
   * The underlying `AppFactory` for when you want to have more flexibility
   */
  
  /**
   * Creates a new instance of `RewardsFactory`
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
  __init() {this.params = {
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
       * Creates a new instance of the Rewards smart contract using the create(string,uint64)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create transaction
       */
      create: (params) => {
        return this.appFactory.createTransaction.create(RewardsParamsFactory.create.create(params));
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
  }}
}, _class);
var RewardsClient = (_class2 = class _RewardsClient {
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
   * Returns a new `RewardsClient` client, resolving the app by creator address and name
   * using AlgoKit app deployment semantics (i.e. looking for the app creation transaction note).
   * @param params The parameters to create the app client
   */
  static async fromCreatorAndName(params) {
    return new _RewardsClient(await _appclient.AppClient.fromCreatorAndName({ ...params, appSpec: APP_SPEC }));
  }
  /**
   * Returns an `RewardsClient` instance for the current network based on
   * pre-determined network-specific app IDs specified in the ARC-56 app spec.
   *
   * If no IDs are in the app spec or the network isn't recognised, an error is thrown.
   * @param params The parameters to create the app client
   */
  static async fromNetwork(params) {
    return new _RewardsClient(await _appclient.AppClient.fromNetwork({ ...params, appSpec: APP_SPEC }));
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
  }}
  /**
   * Create transactions for the current app
   */
  __init5() {this.createTransaction = {
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
  }}
  /**
   * Send calls to the current app
   */
  __init6() {this.send = {
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
  }}
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
  __init7() {this.state = {
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
  }}
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
}, _class2);

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
var translateRewardsError = _chunkGIGYZ6YCjs.makeErrorTranslator.call(void 0, REWARDS_ERROR_MESSAGES);

// src/rewards/index.ts
var MAX_ALGORAND_GROUP_SIZE = 16;
var CREATE_ASA_DISBURSEMENT_FROM_GROUP = _abi.ABIMethod.fromSignature(
  "createAsaDisbursementFromGroup(uint64,uint64,string,uint64,uint64,string,(address,uint64)[])uint64"
);
var RewardsSDK = class extends _chunkKLHVDYDWjs.BaseSDK {
  constructor(params) {
    super({ factory: RewardsFactory, ...params }, _chunkHFHM5QOFjs.ENV_VAR_NAMES.REWARDS_APP_ID);
  }
  // ========== Read Methods ==========
  /**
   * Gets the current global state of the rewards contract.
   */
  async getState() {
    const state = await this.client.state.global.getAll();
    return {
      disbursementId: _nullishCoalesce(state.disbursementId, () => ( 1n)),
      version: _nullishCoalesce(state.version, () => ( "")),
      akitaDao: _nullishCoalesce(state.akitaDao, () => ( 0n))
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
    } catch (e) {
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
      amount: _algokitutils.microAlgo.call(void 0, 1e5),
      receiver: this.client.appAddress
    });
    await this.client.send.optIn({
      ...sendParams,
      extraFee: _algokitutils.microAlgo.call(void 0, 1e3),
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
      amount: _algokitutils.microAlgo.call(void 0, mbrData.disbursements + BigInt(mbrCredits)),
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
      amount: _algokitutils.microAlgo.call(void 0, BigInt(amount)),
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
      extraFee: _algokitutils.microAlgo.call(void 0, 1e3),
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
      amount: _algokitutils.microAlgo.call(void 0, totalAmount),
      receiver: this.client.appAddress
    });
    await this.client.send.createUserAllocations({
      ...sendParams,
      args: {
        payment,
        id,
        allocations: this.formatAllocations(allocations)
      }
    });
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
    await this.client.send.createAsaUserAllocations({
      ...sendParams,
      args: {
        assetXfer,
        id,
        allocations: this.formatAllocations(allocations)
      }
    });
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
      amount: _algokitutils.microAlgo.call(void 0, mbrData.disbursements + mbrData.userAllocations * BigInt(allocations.length)),
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
   */
  async createInstantDisbursement({
    sender,
    signer,
    timeToUnlock,
    expiration,
    allocations
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const MIN_DISBURSEMENTS_MBR = 41700n;
    const USER_ALLOCATION_MBR = 25300n;
    const mbrAmount = MIN_DISBURSEMENTS_MBR + USER_ALLOCATION_MBR * BigInt(allocations.length);
    const totalAmount = this.sumAllocations(allocations);
    const mbrPayment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: _algokitutils.microAlgo.call(void 0, mbrAmount + totalAmount),
      receiver: this.client.appAddress
    });
    const result = await this.client.send.createInstantDisbursement({
      ...sendParams,
      args: {
        mbrPayment,
        timeToUnlock,
        expiration,
        allocations: this.formatAllocations(allocations)
      }
    });
    const disbursementId = result.return;
    if (disbursementId === void 0) {
      throw new Error("Failed to create instant disbursement");
    }
    return disbursementId;
  }
  /**
   * Creates and finalizes an ASA disbursement in a single call.
   * Returns the disbursement ID.
   */
  async createInstantAsaDisbursement({
    sender,
    signer,
    timeToUnlock,
    expiration,
    asset,
    allocations
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const MIN_DISBURSEMENTS_MBR = 41700n;
    const USER_ALLOCATION_MBR = 25300n;
    const mbrAmount = MIN_DISBURSEMENTS_MBR + USER_ALLOCATION_MBR * BigInt(allocations.length);
    const totalAmount = this.sumAllocations(allocations);
    const mbrPayment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: _algokitutils.microAlgo.call(void 0, mbrAmount),
      receiver: this.client.appAddress
    });
    const assetXfer = await this.client.algorand.createTransaction.assetTransfer({
      ...sendParams,
      amount: totalAmount,
      assetId: BigInt(asset),
      receiver: this.client.appAddress
    });
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
    const disbursementId = result.return;
    if (disbursementId === void 0) {
      throw new Error("Failed to create instant ASA disbursement");
    }
    return disbursementId;
  }
  /**
   * Claims rewards from one or more disbursements.
   * The caller claims their allocated rewards.
   */
  async claimRewards({ sender, signer, rewards }) {
    const sendParams = this.getSendParams({ sender, signer });
    const formattedRewards = rewards.map((r) => [r.id, r.asset]);
    await this.client.send.claimRewards({
      ...sendParams,
      // Extra fee for inner transactions (1 reward transfer per claim; MBR refund is credited)
      extraFee: _algokitutils.microAlgo.call(void 0, 1e3 * rewards.length),
      args: {
        rewards: formattedRewards
      }
    });
  }
  /**
   * Reclaims unclaimed rewards after a disbursement has expired.
   * Only the disbursement creator can reclaim.
   */
  async reclaimRewards({ sender, signer, id, reclaims }) {
    const sendParams = this.getSendParams({ sender, signer });
    const formattedReclaims = reclaims.map((r) => [r.address, r.asset]);
    await this.client.send.reclaimRewards({
      ...sendParams,
      // Extra fee for inner transactions (1 reward transfer per reclaim; MBR refund is credited)
      extraFee: _algokitutils.microAlgo.call(void 0, 1e3 * reclaims.length),
      args: {
        id,
        reclaims: formattedReclaims
      }
    });
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





exports.REWARDS_ERROR_MESSAGES = REWARDS_ERROR_MESSAGES; exports.translateRewardsError = translateRewardsError; exports.RewardsSDK = RewardsSDK;
//# sourceMappingURL=chunk-X7J773ON.js.map
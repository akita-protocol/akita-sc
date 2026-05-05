import {
  makeErrorTranslator
} from "./chunk-2AEP6DTX.mjs";
import {
  BaseSDK
} from "./chunk-JNYFBSSA.mjs";
import {
  ENV_VAR_NAMES
} from "./chunk-X7YBMTJD.mjs";

// src/staking/index.ts
import { microAlgo } from "@algorandfoundation/algokit-utils";

// src/generated/StakingClient.ts
import { ABIStructType, getStructValueFromTupleValue } from "@algorandfoundation/algokit-utils/abi";
import { AppClient as _AppClient } from "@algorandfoundation/algokit-utils/app-client";
import { AppFactory as _AppFactory } from "@algorandfoundation/algokit-utils/app-factory";
var APP_SPEC = { "name": "Staking", "structs": { "Escrow": [{ "name": "hard", "type": "uint64" }, { "name": "lock", "type": "uint64" }], "HeartbeatKey": [{ "name": "address", "type": "address" }, { "name": "asset", "type": "uint64" }], "Stake": [{ "name": "amount", "type": "uint64" }, { "name": "lastUpdate", "type": "uint64" }, { "name": "expiration", "type": "uint64" }], "StakeCheck": [{ "name": "valid", "type": "bool" }, { "name": "balance", "type": "uint64" }], "StakeInfo": [{ "name": "asset", "type": "uint64" }, { "name": "type", "type": "uint8" }], "StakeKey": [{ "name": "address", "type": "address" }, { "name": "asset", "type": "uint64" }, { "name": "type", "type": "uint8" }], "TotalsInfo": [{ "name": "locked", "type": "uint64" }, { "name": "escrowed", "type": "uint64" }] }, "methods": [{ "name": "create", "args": [{ "type": "string", "name": "version" }, { "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "init", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "optIn", "args": [{ "type": "pay", "name": "payment", "desc": "The payment transaction" }, { "type": "uint64", "name": "asset", "desc": "The asset to be opted into" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "optin tells the contract to opt into an asa", "events": [], "recommendations": {} }, { "name": "stake", "args": [{ "type": "pay", "name": "payment" }, { "type": "uint8", "name": "type" }, { "type": "uint64", "name": "amount" }, { "type": "uint64", "name": "expiration" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "stakeAsa", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "uint8", "name": "type" }, { "type": "uint64", "name": "amount" }, { "type": "uint64", "name": "expiration" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "withdraw", "args": [{ "type": "uint64", "name": "asset" }, { "type": "uint8", "name": "type" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "createHeartbeat", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "asset" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "softCheck", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "asset" }], "returns": { "type": "(bool,uint64)", "struct": "StakeCheck" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateSettings", "args": [{ "type": "pay", "name": "payment" }, { "type": "uint64", "name": "asset" }, { "type": "uint64", "name": "value" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "optInCost", "args": [], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "stakeCost", "args": [{ "type": "uint64", "name": "asset" }, { "type": "uint8", "name": "type" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getTimeLeft", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "asset" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "mustGetTimeLeft", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "asset" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getInfo", "args": [{ "type": "address", "name": "address" }, { "type": "(uint64,uint8)", "struct": "StakeInfo", "name": "stake" }], "returns": { "type": "(uint64,uint64,uint64)", "struct": "Stake" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "mustGetInfo", "args": [{ "type": "address", "name": "address" }, { "type": "(uint64,uint8)", "struct": "StakeInfo", "name": "stake" }], "returns": { "type": "(uint64,uint64,uint64)", "struct": "Stake" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getInfoAtLeast", "args": [{ "type": "address", "name": "address" }, { "type": "(uint64,uint8)", "struct": "StakeInfo", "name": "stake" }], "returns": { "type": "(uint64,uint64,uint64)[]" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getEscrowInfo", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "asset" }], "returns": { "type": "(uint64,uint64)", "struct": "Escrow" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getHeartbeat", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "asset" }], "returns": { "type": "(uint64,uint64,uint64,uint64)[4]" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "mustGetHeartbeat", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "asset" }], "returns": { "type": "(uint64,uint64,uint64,uint64)[4]" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getHeartbeatAverage", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "asset" }, { "type": "bool", "name": "includeEscrowed" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "mustGetHeartbeatAverage", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "asset" }, { "type": "bool", "name": "includeEscrowed" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getInfoList", "args": [{ "type": "address", "name": "address" }, { "type": "uint8", "name": "type" }, { "type": "uint64[]", "name": "assets" }], "returns": { "type": "(uint64,uint64,uint64)[]" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "mustGetInfoList", "args": [{ "type": "address", "name": "address" }, { "type": "uint8", "name": "type" }, { "type": "uint64[]", "name": "assets" }], "returns": { "type": "(uint64,uint64,uint64)[]" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "stakeCheck", "args": [{ "type": "address", "name": "address" }, { "type": "(uint64,uint64)[]", "name": "checks" }, { "type": "uint8", "name": "type" }, { "type": "bool", "name": "includeEscrowed" }], "returns": { "type": "bool" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getTotals", "args": [{ "type": "uint64[]", "name": "assets" }], "returns": { "type": "(uint64,uint64)[]" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 1, "bytes": 2 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "heartbeatManagerAddress": { "keyType": "AVMString", "valueType": "address", "key": "aGVhcnRiZWF0X21hbmFnZXJfYWRkcmVzcw==", "desc": "The address that is allowed to call the 'beat' method to create heartbeat records" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" } }, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": { "stakes": { "keyType": "StakeKey", "valueType": "Stake", "prefix": "cw==" }, "heartbeats": { "keyType": "HeartbeatKey", "valueType": "(uint64,uint64,uint64,uint64)[4]", "prefix": "aA==" }, "totals": { "keyType": "uint64", "valueType": "TotalsInfo", "prefix": "dA==" }, "settings": { "keyType": "uint64", "valueType": "uint64", "prefix": "ZQ==" } } } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [921, 948, 1076, 1295, 1523, 1553, 1716, 1986, 2202, 2252, 2298, 2480, 2849, 2867, 2936, 2950, 3058, 3294, 3338, 3534, 3583, 3692, 3925, 4063, 4230, 4328, 4437, 4457, 4489, 4509, 4702, 4764], "errorMessage": "Box must have value" }, { "pc": [618], "errorMessage": "ERR:AOPT" }, { "pc": [790, 1350], "errorMessage": "ERR:BEXP" }, { "pc": [1103, 1744], "errorMessage": "ERR:BEXU" }, { "pc": [1072, 1712], "errorMessage": "ERR:HBCU" }, { "pc": [2190, 3580, 3686], "errorMessage": "ERR:HBNF" }, { "pc": [1417, 1431, 1491, 1596, 1700, 1788, 1802, 1875], "errorMessage": "ERR:IAAM" }, { "pc": [1032, 1184, 1661, 1864], "errorMessage": "ERR:IBAL" }, { "pc": [640, 654, 832, 849, 966, 980, 1046, 1060, 2666, 2700], "errorMessage": "ERR:IPAY" }, { "pc": [1136, 1403, 1585, 1689, 1769], "errorMessage": "ERR:IPMA" }, { "pc": [1122, 1389, 1571, 1675, 1758], "errorMessage": "ERR:IPMR" }, { "pc": [2018, 2947], "errorMessage": "ERR:LOCK" }, { "pc": [2652], "errorMessage": "ERR:NACR" }, { "pc": [4404], "errorMessage": "ERR:NDAO" }, { "pc": [2155], "errorMessage": "ERR:NHBM" }, { "pc": [1982, 2930, 3055], "errorMessage": "ERR:NLCK" }, { "pc": [1482, 1649, 1849, 2560], "errorMessage": "ERR:NOPT" }, { "pc": [2477], "errorMessage": "ERR:SNEX" }, { "pc": [4059], "errorMessage": "ERR:SNFD" }, { "pc": [1938], "errorMessage": "ERR:WHOL" }, { "pc": [888, 1022, 1171, 2498, 2512, 2529, 4567], "errorMessage": "account funded" }, { "pc": [4388], "errorMessage": "application exists" }, { "pc": [2636], "errorMessage": "asset exists" }, { "pc": [2139, 4375], "errorMessage": "check GlobalState exists" }, { "pc": [2337, 2353, 3718, 3857, 4009, 4166, 4322, 4790], "errorMessage": "index access is out of bounds" }, { "pc": [2391, 4446, 4466, 4498, 4518], "errorMessage": "index out of bounds" }, { "pc": [537, 3824, 3976, 4114, 4286], "errorMessage": "invalid array length header" }, { "pc": [3614, 3656, 4143], "errorMessage": "invalid number of bytes for arc4.bool" }, { "pc": [545], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [4127], "errorMessage": "invalid number of bytes for arc4.dynamic_array<smart_contracts/staking/types.ts::AssetCheck>" }, { "pc": [3836, 3988, 4298], "errorMessage": "invalid number of bytes for arc4.dynamic_array<uint64>" }, { "pc": [2098, 2419, 2801, 2884, 2971, 2999, 3083, 3241, 3363, 3545, 3597, 3639, 3809, 3961, 4107], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [556, 594, 720, 730, 1245, 1255, 1900, 2106, 2427, 2618, 2628, 2735, 2809, 2892, 3249, 3371, 3553, 3605, 3647, 4367], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [712, 1237, 1910, 2747, 3817, 3969, 4135], "errorMessage": "invalid number of bytes for arc4.uint8" }, { "pc": [2980, 3011, 3093], "errorMessage": "invalid number of bytes for smart_contracts/staking/types.ts::StakeInfo" }, { "pc": [1227], "errorMessage": "transaction type is axfer" }, { "pc": [586, 703, 1215, 2610], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDggMzIgMjg5MDAgOTkwMDAgMzE1MzYwMDAKICAgIGJ5dGVjYmxvY2sgInMiIDB4MTUxZjdjNzUgMHgyOCAiIiAweDFlICJFUlI6SVBBWSIgIkVSUjpJQUFNIiAiaCIgInQiIDB4MGEgIkVSUjpJUE1SIiAiRVJSOklQTUEiICJFUlI6SUJBTCIgIkVSUjpOT1BUIiAweDE0IDB4MDAwMCAiYWtpdGFfZGFvIiAiRVJSOk5MQ0siICJFUlI6SEJORiIgMHgwMCAweDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwICJFUlI6QkVYUCIgMHgwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAgIkVSUjpIQkNVIiAiRVJSOkJFWFUiICJFUlI6TE9DSyIgMHgwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NzIKICAgIC8vIGV4cG9ydCBjbGFzcyBTdGFraW5nIGV4dGVuZHMgY2xhc3NlcyhCYXNlU3Rha2luZywgQWtpdGFCYXNlQ29udHJhY3QpIHsKICAgIHR4biBPbkNvbXBsZXRpb24KICAgICEKICAgIGFzc2VydAogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgIGJ6IG1haW5fY3JlYXRlX05vT3BAMzIKICAgIHB1c2hieXRlc3MgMHg4M2YxNDc0OCAweDM5NGVhZWIyIDB4ODI1NmNmMTkgMHgyMDQ2N2I5MyAweDgzMDQ4MGYzIDB4YzgxNzNjYTEgMHg0ODcxNmYxYSAweDVkOWQxNDI4IDB4MjIzNWE2ODMgMHg2Y2IwMGU3ZCAweDlmNGY1Njc0IDB4NzVkMTM4ZmIgMHhjOTA2ODgwOSAweGY1MjMyYmYzIDB4MjMzMzRjMGIgMHg0Yzg4ZWFjZSAweGVhZTY1ZjEyIDB4ZGQ0NGE4NDMgMHhjNmZkMGNhNSAweDhhZTI2NmI5IDB4ZTk3YTU2NTUgMHgxMTI1ZDczYiAweDlkZmY0MDYwIDB4NmJlOGNlZTYgMHgzM2U5MmM5NCAweDg1NGRlZGUwIC8vIG1ldGhvZCAiaW5pdCgpdm9pZCIsIG1ldGhvZCAib3B0SW4ocGF5LHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJzdGFrZShwYXksdWludDgsdWludDY0LHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJzdGFrZUFzYShwYXksYXhmZXIsdWludDgsdWludDY0LHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJ3aXRoZHJhdyh1aW50NjQsdWludDgpdm9pZCIsIG1ldGhvZCAiY3JlYXRlSGVhcnRiZWF0KGFkZHJlc3MsdWludDY0KXZvaWQiLCBtZXRob2QgInNvZnRDaGVjayhhZGRyZXNzLHVpbnQ2NCkoYm9vbCx1aW50NjQpIiwgbWV0aG9kICJ1cGRhdGVTZXR0aW5ncyhwYXksdWludDY0LHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJvcHRJbkNvc3QoKXVpbnQ2NCIsIG1ldGhvZCAic3Rha2VDb3N0KHVpbnQ2NCx1aW50OCl1aW50NjQiLCBtZXRob2QgImdldFRpbWVMZWZ0KGFkZHJlc3MsdWludDY0KXVpbnQ2NCIsIG1ldGhvZCAibXVzdEdldFRpbWVMZWZ0KGFkZHJlc3MsdWludDY0KXVpbnQ2NCIsIG1ldGhvZCAiZ2V0SW5mbyhhZGRyZXNzLCh1aW50NjQsdWludDgpKSh1aW50NjQsdWludDY0LHVpbnQ2NCkiLCBtZXRob2QgIm11c3RHZXRJbmZvKGFkZHJlc3MsKHVpbnQ2NCx1aW50OCkpKHVpbnQ2NCx1aW50NjQsdWludDY0KSIsIG1ldGhvZCAiZ2V0SW5mb0F0TGVhc3QoYWRkcmVzcywodWludDY0LHVpbnQ4KSkodWludDY0LHVpbnQ2NCx1aW50NjQpW10iLCBtZXRob2QgImdldEVzY3Jvd0luZm8oYWRkcmVzcyx1aW50NjQpKHVpbnQ2NCx1aW50NjQpIiwgbWV0aG9kICJnZXRIZWFydGJlYXQoYWRkcmVzcyx1aW50NjQpKHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NClbNF0iLCBtZXRob2QgIm11c3RHZXRIZWFydGJlYXQoYWRkcmVzcyx1aW50NjQpKHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NClbNF0iLCBtZXRob2QgImdldEhlYXJ0YmVhdEF2ZXJhZ2UoYWRkcmVzcyx1aW50NjQsYm9vbCl1aW50NjQiLCBtZXRob2QgIm11c3RHZXRIZWFydGJlYXRBdmVyYWdlKGFkZHJlc3MsdWludDY0LGJvb2wpdWludDY0IiwgbWV0aG9kICJnZXRJbmZvTGlzdChhZGRyZXNzLHVpbnQ4LHVpbnQ2NFtdKSh1aW50NjQsdWludDY0LHVpbnQ2NClbXSIsIG1ldGhvZCAibXVzdEdldEluZm9MaXN0KGFkZHJlc3MsdWludDgsdWludDY0W10pKHVpbnQ2NCx1aW50NjQsdWludDY0KVtdIiwgbWV0aG9kICJzdGFrZUNoZWNrKGFkZHJlc3MsKHVpbnQ2NCx1aW50NjQpW10sdWludDgsYm9vbClib29sIiwgbWV0aG9kICJnZXRUb3RhbHModWludDY0W10pKHVpbnQ2NCx1aW50NjQpW10iLCBtZXRob2QgInVwZGF0ZUFraXRhREFPKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJvcFVwKCl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggbWFpbl9pbml0X3JvdXRlQDUgb3B0SW4gc3Rha2Ugc3Rha2VBc2Egd2l0aGRyYXcgY3JlYXRlSGVhcnRiZWF0IHNvZnRDaGVjayB1cGRhdGVTZXR0aW5ncyBvcHRJbkNvc3Qgc3Rha2VDb3N0IGdldFRpbWVMZWZ0IG11c3RHZXRUaW1lTGVmdCBnZXRJbmZvIG11c3RHZXRJbmZvIGdldEluZm9BdExlYXN0IGdldEVzY3Jvd0luZm8gZ2V0SGVhcnRiZWF0IG11c3RHZXRIZWFydGJlYXQgZ2V0SGVhcnRiZWF0QXZlcmFnZSBtdXN0R2V0SGVhcnRiZWF0QXZlcmFnZSBnZXRJbmZvTGlzdCBtdXN0R2V0SW5mb0xpc3Qgc3Rha2VDaGVjayBnZXRUb3RhbHMgdXBkYXRlQWtpdGFEQU8gbWFpbl9vcFVwX3JvdXRlQDMwCiAgICBlcnIKCm1haW5fb3BVcF9yb3V0ZUAzMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQxCiAgICAvLyBvcFVwKCk6IHZvaWQgeyB9CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgptYWluX2luaXRfcm91dGVANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODgKICAgIC8vIHRvdGFscyA9IEJveE1hcDx1aW50NjQsIFRvdGFsc0luZm8+KHsga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4VG90YWxzIH0pCiAgICBwdXNoYnl0ZXMgMHg3NDAwMDAwMDAwMDAwMDAwMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTAxCiAgICAvLyB0aGlzLnRvdGFscygwKS52YWx1ZSA9IHsgbG9ja2VkOiAwLCBlc2Nyb3dlZDogMCB9CiAgICBieXRlYyAyMCAvLyAweDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwMAogICAgLy8gaW5pdCgpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCm1haW5fY3JlYXRlX05vT3BAMzI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjcyCiAgICAvLyBleHBvcnQgY2xhc3MgU3Rha2luZyBleHRlbmRzIGNsYXNzZXMoQmFzZVN0YWtpbmcsIEFraXRhQmFzZUNvbnRyYWN0KSB7CiAgICBwdXNoYnl0ZXMgMHhjZDlhZDY3ZSAvLyBtZXRob2QgImNyZWF0ZShzdHJpbmcsdWludDY0KXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBjcmVhdGUKICAgIGVycgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuY3JlYXRlW3JvdXRpbmddKCkgLT4gdm9pZDoKY3JlYXRlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo5NAogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjUKICAgIC8vIHZlcnNpb24gPSBHbG9iYWxTdGF0ZTxzdHJpbmc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleVZlcnNpb24gfSkKICAgIHB1c2hieXRlcyAidmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OTYKICAgIC8vIHRoaXMudmVyc2lvbi52YWx1ZSA9IHZlcnNpb24KICAgIHVuY292ZXIgMgogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWMgMTYgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OTcKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUgPSBha2l0YURBTwogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OTQKICAgIC8vIEBhYmltZXRob2QoeyBvbkNyZWF0ZTogJ3JlcXVpcmUnIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5vcHRJbltyb3V0aW5nXSgpIC0+IHZvaWQ6Cm9wdEluOgogICAgYnl0ZWNfMyAvLyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxNjkKICAgIC8vIG9wdEluKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYXNzZXQ6IHVpbnQ2NCk6IHZvaWQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTcwCiAgICAvLyBsb2dnZWRBc3NlcnQoIUdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLmlzT3B0ZWRJbihBc3NldChhc3NldCkpLCBFUlJfQUxSRUFEWV9PUFRFRF9JTikKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBzd2FwCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYnogb3B0SW5fYWZ0ZXJfYXNzZXJ0QDMKICAgIHB1c2hieXRlcyAiRVJSOkFPUFQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6QU9QVAoKb3B0SW5fYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjE3NAogICAgLy8gdG90YWxzTUJSICsKICAgIHB1c2hpbnQgMTI1MDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTc1CiAgICAvLyBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxNzQtMTc1CiAgICAvLyB0b3RhbHNNQlIgKwogICAgLy8gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICArCiAgICBidXJ5IDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTc4CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIEVSUl9JTlZBTElEX1BBWU1FTlQpCiAgICBkaWcgMQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IG9wdEluX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyA1IC8vICJFUlI6SVBBWSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUEFZCgpvcHRJbl9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTc5CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IG1iciwgRVJSX0lOVkFMSURfUEFZTUVOVCkKICAgIGRpZyAxCiAgICBndHhucyBBbW91bnQKICAgIGRpZyAzCiAgICA9PQogICAgYm56IG9wdEluX2FmdGVyX2Fzc2VydEA3CiAgICBieXRlYyA1IC8vICJFUlI6SVBBWSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUEFZCgpvcHRJbl9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTgxLTE4NQogICAgLy8gaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyB9KS5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxODIKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGRpZyAxCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjE4MwogICAgLy8gYXNzZXRBbW91bnQ6IDAsCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjE4MS0xODUKICAgIC8vIGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICBhc3NldEFtb3VudDogMCwKICAgIC8vICAgeGZlckFzc2V0OiBhc3NldAogICAgLy8gfSkuc3VibWl0KCkKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxODcKICAgIC8vIHRoaXMudG90YWxzKGFzc2V0KS52YWx1ZSA9IHsKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODgKICAgIC8vIHRvdGFscyA9IEJveE1hcDx1aW50NjQsIFRvdGFsc0luZm8+KHsga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4VG90YWxzIH0pCiAgICBieXRlYyA4IC8vICJ0IgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjE4Ny0xOTAKICAgIC8vIHRoaXMudG90YWxzKGFzc2V0KS52YWx1ZSA9IHsKICAgIC8vICAgbG9ja2VkOiAwLAogICAgLy8gICBlc2Nyb3dlZDogMCwKICAgIC8vIH0KICAgIGJ5dGVjIDIwIC8vIDB4MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTY5CiAgICAvLyBvcHRJbihwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGFzc2V0OiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLnN0YWtlW3JvdXRpbmddKCkgLT4gdm9pZDoKc3Rha2U6CiAgICBpbnRjXzAgLy8gMAogICAgZHVwbiA0CiAgICBieXRlY18zIC8vICIiCiAgICBkdXBuIDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTkzCiAgICAvLyBzdGFrZShwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIHR5cGU6IFN0YWtpbmdUeXBlLCBhbW91bnQ6IHVpbnQ2NCwgZXhwaXJhdGlvbjogdWludDY0KTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cG4gMgogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50OAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjE5NAogICAgLy8gY29uc3QgaW5UaGVGdXR1cmUgPSBleHBpcmF0aW9uID4gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcAogICAgZHVwCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICA+CiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjE5NQogICAgLy8gY29uc3QgbGVzc1RoYW5PbmVZZWFySW5UaGVGdXR1cmUgPSBleHBpcmF0aW9uIDw9IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgKyBPTkVfWUVBUgogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgaW50YyA2IC8vIDMxNTM2MDAwCiAgICArCiAgICA8PQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxOTYKICAgIC8vIGNvbnN0IGxvY2tlZCA9IHR5cGUgPT09IFNUQUtJTkdfVFlQRV9MT0NLCiAgICBkdXAKICAgIGJ5dGVjXzIgLy8gMHgyOAogICAgPT0KICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTk3CiAgICAvLyBjb25zdCBpc0VzY3JvdyA9IHR5cGUgPT09IFNUQUtJTkdfVFlQRV9IQVJEIHx8IHR5cGUgPT09IFNUQUtJTkdfVFlQRV9MT0NLCiAgICBieXRlYyA0IC8vIDB4MWUKICAgID09CiAgICBibnogc3Rha2VfYm9vbF90cnVlQDMKICAgIGR1cAogICAgYnogc3Rha2VfYm9vbF9mYWxzZUA0CgpzdGFrZV9ib29sX3RydWVAMzoKICAgIGludGNfMSAvLyAxCiAgICBidXJ5IDEwCgpzdGFrZV9ib29sX21lcmdlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjE5OAogICAgLy8gY29uc3QgdGltZXN0YW1wID0gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcAogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgYnVyeSA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjIwMAogICAgLy8gbG9nZ2VkQXNzZXJ0KChpblRoZUZ1dHVyZSAmJiBsZXNzVGhhbk9uZVllYXJJblRoZUZ1dHVyZSkgfHwgIWxvY2tlZCwgRVJSX0JBRF9FWFBJUkFUSU9OKQogICAgZGlnIDIKICAgIGJ6IHN0YWtlX29yX2NvbnRkQDcKICAgIGRpZyAxCiAgICBibnogc3Rha2VfYm9vbF90cnVlQDgKCnN0YWtlX29yX2NvbnRkQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjIwMAogICAgLy8gbG9nZ2VkQXNzZXJ0KChpblRoZUZ1dHVyZSAmJiBsZXNzVGhhbk9uZVllYXJJblRoZUZ1dHVyZSkgfHwgIWxvY2tlZCwgRVJSX0JBRF9FWFBJUkFUSU9OKQogICAgZHVwCiAgICBibnogc3Rha2VfYm9vbF9mYWxzZUA5CgpzdGFrZV9ib29sX3RydWVAODoKICAgIGludGNfMSAvLyAxCgpzdGFrZV9ib29sX21lcmdlQDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoyMDAKICAgIC8vIGxvZ2dlZEFzc2VydCgoaW5UaGVGdXR1cmUgJiYgbGVzc1RoYW5PbmVZZWFySW5UaGVGdXR1cmUpIHx8ICFsb2NrZWQsIEVSUl9CQURfRVhQSVJBVElPTikKICAgIGJueiBzdGFrZV9hZnRlcl9hc3NlcnRAMTIKICAgIGJ5dGVjIDIxIC8vICJFUlI6QkVYUCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpCRVhQCgpzdGFrZV9hZnRlcl9hc3NlcnRAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjIwMwogICAgLy8gYWRkcmVzczogVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MjA0CiAgICAvLyBhc3NldDogMCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjIwMi0yMDYKICAgIC8vIGNvbnN0IHNrOiBTdGFrZUtleSA9IHsKICAgIC8vICAgYWRkcmVzczogVHhuLnNlbmRlciwKICAgIC8vICAgYXNzZXQ6IDAsCiAgICAvLyAgIHR5cGUsCiAgICAvLyB9CiAgICBpdG9iCiAgICBkdXAKICAgIGJ1cnkgMTkKICAgIGNvbmNhdAogICAgZGlnIDYKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4MQogICAgLy8gc3Rha2VzID0gQm94TWFwPFN0YWtlS2V5LCBTdGFrZT4oeyBrZXlQcmVmaXg6IFN0YWtpbmdCb3hQcmVmaXhTdGFrZXMgfSkKICAgIGJ5dGVjXzAgLy8gInMiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgYnVyeSAxNgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoyMDgKICAgIC8vIGNvbnN0IGlzVXBkYXRlID0gdGhpcy5zdGFrZXMoc2spLmV4aXN0cwogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjIxMAogICAgLy8gaWYgKCFpc1VwZGF0ZSkgewogICAgYm56IHN0YWtlX2Vsc2VfYm9keUAzOAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoyMTQKICAgIC8vIGlmIChpc0VzY3JvdykgewogICAgZGlnIDkKICAgIGJ6IHN0YWtlX2Vsc2VfYm9keUAxOQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoyMTYKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgRVJSX0lOVkFMSURfUEFZTUVOVCkKICAgIGRpZyA2CiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogc3Rha2VfYWZ0ZXJfYXNzZXJ0QDE2CiAgICBieXRlYyA1IC8vICJFUlI6SVBBWSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUEFZCgpzdGFrZV9hZnRlcl9hc3NlcnRAMTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjIxNwogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSBhbW91bnQgKyBjb3N0cy5zdGFrZXMsIEVSUl9JTlZBTElEX1BBWU1FTlQpCiAgICBkaWcgNgogICAgZ3R4bnMgQW1vdW50CiAgICBkaWcgNQogICAgaW50YyA0IC8vIDI4OTAwCiAgICArCiAgICA9PQogICAgYm56IHN0YWtlX2FmdGVyX2Fzc2VydEAxOAogICAgYnl0ZWMgNSAvLyAiRVJSOklQQVkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBBWQoKc3Rha2VfYWZ0ZXJfYXNzZXJ0QDE4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoyMTkKICAgIC8vIHRoaXMudXBkYXRlVG90YWxzKDAsIHR5cGUsIGFtb3VudCwgdHJ1ZSkKICAgIGludGNfMCAvLyAwCiAgICBkaWcgNgogICAgZGlnIDYKICAgIGludGNfMSAvLyAxCiAgICBjYWxsc3ViIHVwZGF0ZVRvdGFscwoKc3Rha2VfYWZ0ZXJfaWZfZWxzZUAzNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6Mjg1LTI4OQogICAgLy8gdGhpcy5zdGFrZXMoc2spLnZhbHVlID0gewogICAgLy8gICBhbW91bnQsCiAgICAvLyAgIGxhc3RVcGRhdGU6IHRpbWVzdGFtcCwKICAgIC8vICAgZXhwaXJhdGlvbiwKICAgIC8vIH0KICAgIGRpZyA0CiAgICBpdG9iCiAgICBkaWcgOAogICAgaXRvYgogICAgY29uY2F0CiAgICBkaWcgNAogICAgaXRvYgogICAgY29uY2F0CiAgICBkaWcgMTUKICAgIHN3YXAKICAgIGJveF9wdXQKCnN0YWtlX2FmdGVyX2lmX2Vsc2VANTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjE5MwogICAgLy8gc3Rha2UocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCB0eXBlOiBTdGFraW5nVHlwZSwgYW1vdW50OiB1aW50NjQsIGV4cGlyYXRpb246IHVpbnQ2NCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKc3Rha2VfZWxzZV9ib2R5QDE5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoyMjEKICAgIC8vIH0gZWxzZSBpZiAodHlwZSA9PT0gU1RBS0lOR19UWVBFX0hFQVJUQkVBVCkgewogICAgZGlnIDUKICAgIGJ5dGVjIDkgLy8gMHgwYQogICAgPT0KICAgIGJ6IHN0YWtlX2Vsc2VfYm9keUAyOQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoyMjQKICAgIC8vIGNvbnN0IGhlbGQgPSBuZXcgVWludDY0KFR4bi5zZW5kZXIuYmFsYW5jZSkKICAgIHR4biBTZW5kZXIKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0QmFsYW5jZQogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICBpdG9iCiAgICBidXJ5IDE2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjIyNQogICAgLy8gbGV0IGhhcmQ6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBidXJ5IDExCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjIyNgogICAgLy8gbGV0IGxvY2s6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBidXJ5IDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MjI5CiAgICAvLyBhZGRyZXNzOiBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoyMjgtMjMyCiAgICAvLyBjb25zdCBoYXJkU3Rha2VLZXk6IFN0YWtlS2V5ID0gewogICAgLy8gICBhZGRyZXNzOiBUeG4uc2VuZGVyLAogICAgLy8gICBhc3NldDogMCwKICAgIC8vICAgdHlwZTogU1RBS0lOR19UWVBFX0hBUkQsCiAgICAvLyB9CiAgICBkaWcgMTcKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoyMzEKICAgIC8vIHR5cGU6IFNUQUtJTkdfVFlQRV9IQVJELAogICAgYnl0ZWMgNCAvLyAweDFlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjIyOC0yMzIKICAgIC8vIGNvbnN0IGhhcmRTdGFrZUtleTogU3Rha2VLZXkgPSB7CiAgICAvLyAgIGFkZHJlc3M6IFR4bi5zZW5kZXIsCiAgICAvLyAgIGFzc2V0OiAwLAogICAgLy8gICB0eXBlOiBTVEFLSU5HX1RZUEVfSEFSRCwKICAgIC8vIH0KICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4MQogICAgLy8gc3Rha2VzID0gQm94TWFwPFN0YWtlS2V5LCBTdGFrZT4oeyBrZXlQcmVmaXg6IFN0YWtpbmdCb3hQcmVmaXhTdGFrZXMgfSkKICAgIGJ5dGVjXzAgLy8gInMiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgYnVyeSAxNQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoyMzQKICAgIC8vIGlmICh0aGlzLnN0YWtlcyhoYXJkU3Rha2VLZXkpLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBzdGFrZV9hZnRlcl9pZl9lbHNlQDIyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjIzNQogICAgLy8gaGFyZCA9IHRoaXMuc3Rha2VzKGhhcmRTdGFrZUtleSkudmFsdWUuYW1vdW50CiAgICBkaWcgMTMKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGJ1cnkgMTEKCnN0YWtlX2FmdGVyX2lmX2Vsc2VAMjI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjIzOQogICAgLy8gYWRkcmVzczogVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MjM4LTI0MgogICAgLy8gY29uc3QgbG9ja1N0YWtlS2V5OiBTdGFrZUtleSA9IHsKICAgIC8vICAgYWRkcmVzczogVHhuLnNlbmRlciwKICAgIC8vICAgYXNzZXQ6IDAsCiAgICAvLyAgIHR5cGU6IFNUQUtJTkdfVFlQRV9MT0NLLAogICAgLy8gfQogICAgZGlnIDE3CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MjQxCiAgICAvLyB0eXBlOiBTVEFLSU5HX1RZUEVfTE9DSywKICAgIGJ5dGVjXzIgLy8gMHgyOAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoyMzgtMjQyCiAgICAvLyBjb25zdCBsb2NrU3Rha2VLZXk6IFN0YWtlS2V5ID0gewogICAgLy8gICBhZGRyZXNzOiBUeG4uc2VuZGVyLAogICAgLy8gICBhc3NldDogMCwKICAgIC8vICAgdHlwZTogU1RBS0lOR19UWVBFX0xPQ0ssCiAgICAvLyB9CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODEKICAgIC8vIHN0YWtlcyA9IEJveE1hcDxTdGFrZUtleSwgU3Rha2U+KHsga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4U3Rha2VzIH0pCiAgICBieXRlY18wIC8vICJzIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGJ1cnkgMTQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MjQ0CiAgICAvLyBpZiAodGhpcy5zdGFrZXMobG9ja1N0YWtlS2V5KS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogc3Rha2VfYWZ0ZXJfaWZfZWxzZUAyNAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoyNDUKICAgIC8vIGxvY2sgPSB0aGlzLnN0YWtlcyhsb2NrU3Rha2VLZXkpLnZhbHVlLmFtb3VudAogICAgZGlnIDEyCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBidXJ5IDkKCnN0YWtlX2FmdGVyX2lmX2Vsc2VAMjQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjI0OAogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfSU5WQUxJRF9QQVlNRU5UKQogICAgZGlnIDYKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBzdGFrZV9hZnRlcl9hc3NlcnRAMjYKICAgIGJ5dGVjIDUgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCnN0YWtlX2FmdGVyX2Fzc2VydEAyNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MjQ5CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IGNvc3RzLnN0YWtlcyArIGNvc3RzLmhlYXJ0YmVhdHMsIEVSUl9JTlZBTElEX1BBWU1FTlQpCiAgICBkaWcgNgogICAgZ3R4bnMgQW1vdW50CiAgICBpbnRjIDUgLy8gOTkwMDAKICAgID09CiAgICBibnogc3Rha2VfYWZ0ZXJfYXNzZXJ0QDI4CiAgICBieXRlYyA1IC8vICJFUlI6SVBBWSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUEFZCgpzdGFrZV9hZnRlcl9hc3NlcnRAMjg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjI1MgogICAgLy8gYWRkcmVzczogVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MjUxLTI1NAogICAgLy8gY29uc3QgaGVhcnRiZWF0S2V5OiBIZWFydGJlYXRLZXkgPSB7CiAgICAvLyAgIGFkZHJlc3M6IFR4bi5zZW5kZXIsCiAgICAvLyAgIGFzc2V0OiAwLAogICAgLy8gfQogICAgZGlnIDE3CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MjU4CiAgICAvLyBoYXJkOiBuZXcgVWludDY0KGhhcmQpLAogICAgZGlnIDExCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjI1OQogICAgLy8gbG9jazogbmV3IFVpbnQ2NChsb2NrKSwKICAgIGRpZyAxMAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoyNjAKICAgIC8vIHRpbWVzdGFtcDogbmV3IFVpbnQ2NCh0aW1lc3RhbXApLAogICAgZGlnIDEwCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjI1Ni0yNjEKICAgIC8vIGNvbnN0IGhidiA9IG5ldyBhcmM0SGVhcnRiZWF0KHsKICAgIC8vICAgaGVsZCwKICAgIC8vICAgaGFyZDogbmV3IFVpbnQ2NChoYXJkKSwKICAgIC8vICAgbG9jazogbmV3IFVpbnQ2NChsb2NrKSwKICAgIC8vICAgdGltZXN0YW1wOiBuZXcgVWludDY0KHRpbWVzdGFtcCksCiAgICAvLyB9KQogICAgZGlnIDE5CiAgICB1bmNvdmVyIDMKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoyNzAtMjc1CiAgICAvLyBjb25zdCBoZWFydGJlYXRzID0gbmV3IFN0YXRpY0FycmF5PGFyYzRIZWFydGJlYXQsIDQ+KAogICAgLy8gICBjbG9uZShoYnYpLAogICAgLy8gICBjbG9uZShlaGJ2KSwKICAgIC8vICAgY2xvbmUoZWhidiksCiAgICAvLyAgIGNsb25lKGVoYnYpCiAgICAvLyApCiAgICBieXRlYyAyMiAvLyAweDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjg0LTg2CiAgICAvLyBoZWFydGJlYXRzID0gQm94TWFwPEhlYXJ0YmVhdEtleSwgYXJjNC5TdGF0aWNBcnJheTxhcmM0SGVhcnRiZWF0LCA0Pj4oewogICAgLy8gICBrZXlQcmVmaXg6IFN0YWtpbmdCb3hQcmVmaXhIZWFydGJlYXRzLAogICAgLy8gfSkKICAgIGJ5dGVjIDcgLy8gImgiCiAgICB1bmNvdmVyIDIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoyNzcKICAgIC8vIHRoaXMuaGVhcnRiZWF0cyhoZWFydGJlYXRLZXkpLnZhbHVlID0gY2xvbmUoaGVhcnRiZWF0cykKICAgIHN3YXAKICAgIGJveF9wdXQKICAgIGIgc3Rha2VfYWZ0ZXJfaWZfZWxzZUAzNwoKc3Rha2VfZWxzZV9ib2R5QDI5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoyODAKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyLmJhbGFuY2UgPj0gYW1vdW50LCBFUlJfSU5TVUZGSUNJRU5UX0JBTEFOQ0UpCiAgICB0eG4gU2VuZGVyCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdEJhbGFuY2UKICAgIGFzc2VydCAvLyBhY2NvdW50IGZ1bmRlZAogICAgZGlnIDUKICAgID49CiAgICBibnogc3Rha2VfYWZ0ZXJfYXNzZXJ0QDMxCiAgICBieXRlYyAxMiAvLyAiRVJSOklCQUwiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SUJBTAoKc3Rha2VfYWZ0ZXJfYXNzZXJ0QDMxOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoyODEKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgRVJSX0lOVkFMSURfUEFZTUVOVCkKICAgIGRpZyA2CiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogc3Rha2VfYWZ0ZXJfYXNzZXJ0QDMzCiAgICBieXRlYyA1IC8vICJFUlI6SVBBWSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUEFZCgpzdGFrZV9hZnRlcl9hc3NlcnRAMzM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjI4MgogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSBjb3N0cy5zdGFrZXMsIEVSUl9JTlZBTElEX1BBWU1FTlQpCiAgICBkaWcgNgogICAgZ3R4bnMgQW1vdW50CiAgICBpbnRjIDQgLy8gMjg5MDAKICAgID09CiAgICBibnogc3Rha2VfYWZ0ZXJfaWZfZWxzZUAzNwogICAgYnl0ZWMgNSAvLyAiRVJSOklQQVkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBBWQoKc3Rha2VfZWxzZV9ib2R5QDM4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoyOTIKICAgIC8vIGxvZ2dlZEFzc2VydCh0eXBlICE9PSBTVEFLSU5HX1RZUEVfSEVBUlRCRUFULCBFUlJfSEVBUlRCRUFUX0NBTk5PVF9VUERBVEUpCiAgICBkaWcgNQogICAgYnl0ZWMgOSAvLyAweDBhCiAgICAhPQogICAgYm56IHN0YWtlX2FmdGVyX2Fzc2VydEA0MAogICAgYnl0ZWMgMjMgLy8gIkVSUjpIQkNVIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkhCQ1UKCnN0YWtlX2FmdGVyX2Fzc2VydEA0MDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MjkzCiAgICAvLyBjb25zdCB7IGV4cGlyYXRpb246IGN1cnJlbnRTdGFrZUV4cGlyYXRpb24sIGFtb3VudDogY3VycmVudFN0YWtlQW1vdW50IH0gPSB0aGlzLnN0YWtlcyhzaykudmFsdWUKICAgIGRpZyAxNAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGR1cAogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYnVyeSAxMwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoyOTQKICAgIC8vIGxvZ2dlZEFzc2VydChleHBpcmF0aW9uID49IGN1cnJlbnRTdGFrZUV4cGlyYXRpb24gfHwgIWxvY2tlZCwgRVJSX0JBRF9FWFBJUkFUSU9OX1VQREFURSkKICAgIGRpZyA0CiAgICA8PQogICAgYm56IHN0YWtlX2Jvb2xfdHJ1ZUA0MgogICAgZHVwCiAgICBibnogc3Rha2VfYm9vbF9mYWxzZUA0MwoKc3Rha2VfYm9vbF90cnVlQDQyOgogICAgaW50Y18xIC8vIDEKCnN0YWtlX2Jvb2xfbWVyZ2VANDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjI5NAogICAgLy8gbG9nZ2VkQXNzZXJ0KGV4cGlyYXRpb24gPj0gY3VycmVudFN0YWtlRXhwaXJhdGlvbiB8fCAhbG9ja2VkLCBFUlJfQkFEX0VYUElSQVRJT05fVVBEQVRFKQogICAgYm56IHN0YWtlX2FmdGVyX2Fzc2VydEA0NgogICAgYnl0ZWMgMjQgLy8gIkVSUjpCRVhVIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkJFWFUKCnN0YWtlX2FmdGVyX2Fzc2VydEA0NjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6Mjk2CiAgICAvLyBpZiAoaXNFc2Nyb3cpIHsKICAgIGRpZyA5CiAgICBieiBzdGFrZV9lbHNlX2JvZHlANTIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6Mjk3CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIEVSUl9JTlZBTElEX1BBWU1FTlRfUkVDRUlWRVIpCiAgICBkaWcgNgogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IHN0YWtlX2FmdGVyX2Fzc2VydEA0OQogICAgYnl0ZWMgMTAgLy8gIkVSUjpJUE1SIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQTVIKCnN0YWtlX2FmdGVyX2Fzc2VydEA0OToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6Mjk4CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IGFtb3VudCwgRVJSX0lOVkFMSURfUEFZTUVOVF9BTU9VTlQpCiAgICBkaWcgNgogICAgZ3R4bnMgQW1vdW50CiAgICBkaWcgNQogICAgPT0KICAgIGJueiBzdGFrZV9hZnRlcl9hc3NlcnRANTEKICAgIGJ5dGVjIDExIC8vICJFUlI6SVBNQSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUE1BCgpzdGFrZV9hZnRlcl9hc3NlcnRANTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjMwMAogICAgLy8gdGhpcy51cGRhdGVUb3RhbHMoMCwgdHlwZSwgYW1vdW50LCB0cnVlKQogICAgaW50Y18wIC8vIDAKICAgIGRpZyA2CiAgICBkaWcgNgogICAgaW50Y18xIC8vIDEKICAgIGNhbGxzdWIgdXBkYXRlVG90YWxzCgpzdGFrZV9hZnRlcl9pZl9lbHNlQDU1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czozMDUKICAgIC8vIGNvbnN0IG5ld0Ftb3VudDogdWludDY0ID0gY3VycmVudFN0YWtlQW1vdW50ICsgYW1vdW50CiAgICBkaWcgMTEKICAgIGRpZyA1CiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjMwNy0zMTEKICAgIC8vIHRoaXMuc3Rha2VzKHNrKS52YWx1ZSA9IHsKICAgIC8vICAgYW1vdW50OiBuZXdBbW91bnQsCiAgICAvLyAgIGxhc3RVcGRhdGU6IHRpbWVzdGFtcCwKICAgIC8vICAgZXhwaXJhdGlvbgogICAgLy8gfQogICAgaXRvYgogICAgZGlnIDgKICAgIGl0b2IKICAgIGNvbmNhdAogICAgZGlnIDQKICAgIGl0b2IKICAgIGNvbmNhdAogICAgZGlnIDE1CiAgICBzd2FwCiAgICBib3hfcHV0CiAgICBiIHN0YWtlX2FmdGVyX2lmX2Vsc2VANTYKCnN0YWtlX2Vsc2VfYm9keUA1MjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MzAyCiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlci5iYWxhbmNlID49IGN1cnJlbnRTdGFrZUFtb3VudCArIGFtb3VudCwgRVJSX0lOU1VGRklDSUVOVF9CQUxBTkNFKQogICAgdHhuIFNlbmRlcgogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RCYWxhbmNlCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIGRpZyAxMgogICAgZGlnIDYKICAgICsKICAgID49CiAgICBibnogc3Rha2VfYWZ0ZXJfaWZfZWxzZUA1NQogICAgYnl0ZWMgMTIgLy8gIkVSUjpJQkFMIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklCQUwKCnN0YWtlX2Jvb2xfZmFsc2VANDM6CiAgICBpbnRjXzAgLy8gMAogICAgYiBzdGFrZV9ib29sX21lcmdlQDQ0CgpzdGFrZV9ib29sX2ZhbHNlQDk6CiAgICBpbnRjXzAgLy8gMAogICAgYiBzdGFrZV9ib29sX21lcmdlQDEwCgpzdGFrZV9ib29sX2ZhbHNlQDQ6CiAgICBpbnRjXzAgLy8gMAogICAgYnVyeSAxMAogICAgYiBzdGFrZV9ib29sX21lcmdlQDUKCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLnN0YWtlQXNhW3JvdXRpbmddKCkgLT4gdm9pZDoKc3Rha2VBc2E6CiAgICBpbnRjXzAgLy8gMAogICAgZHVwbiAzCiAgICBieXRlY18zIC8vICIiCiAgICBkdXBuIDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MzE1LTMyMQogICAgLy8gc3Rha2VBc2EoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIHR5cGU6IFN0YWtpbmdUeXBlLAogICAgLy8gICBhbW91bnQ6IHVpbnQ2NCwKICAgIC8vICAgZXhwaXJhdGlvbjogdWludDY0CiAgICAvLyApOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBwdXNoaW50IDIKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwbiAyCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA0IC8vIGF4ZmVyCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXhmZXIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgY292ZXIgMgogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50OAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjMyMgogICAgLy8gY29uc3QgaW5UaGVGdXR1cmUgPSBleHBpcmF0aW9uID4gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcAogICAgZHVwCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICA+CiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjMyMwogICAgLy8gbGV0IGxlc3NUaGFuTWF4TG9ja3VwID0gZXhwaXJhdGlvbiA8PSBHbG9iYWwubGF0ZXN0VGltZXN0YW1wICsgT05FX1lFQVIKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIGludGMgNiAvLyAzMTUzNjAwMAogICAgKwogICAgPD0KICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MzI0CiAgICAvLyBpZiAodGhpcy5zZXR0aW5ncyhhc3NldFhmZXIueGZlckFzc2V0LmlkKS5leGlzdHMpIHsKICAgIGd0eG5zIFhmZXJBc3NldAogICAgZHVwCiAgICBpdG9iCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OTAKICAgIC8vIHNldHRpbmdzID0gQm94TWFwPHVpbnQ2NCwgdWludDY0Pih7IGtleVByZWZpeDogU3Rha2luZ0JveFByZWZpeFNldHRpbmdzIH0pCiAgICBwdXNoYnl0ZXMgImUiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czozMjQKICAgIC8vIGlmICh0aGlzLnNldHRpbmdzKGFzc2V0WGZlci54ZmVyQXNzZXQuaWQpLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBzdGFrZUFzYV9hZnRlcl9pZl9lbHNlQDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MzI1CiAgICAvLyBsZXNzVGhhbk1heExvY2t1cCA9IGV4cGlyYXRpb24gPD0gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCArIHRoaXMuc2V0dGluZ3MoYXNzZXRYZmVyLnhmZXJBc3NldC5pZCkudmFsdWUKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIGRpZyAxCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgYnRvaQogICAgKwogICAgZGlnIDYKICAgID49CiAgICBidXJ5IDQKCnN0YWtlQXNhX2FmdGVyX2lmX2Vsc2VAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MzI3CiAgICAvLyBjb25zdCBsb2NrZWQgPSB0eXBlID09PSBTVEFLSU5HX1RZUEVfTE9DSwogICAgZGlnIDcKICAgIGR1cAogICAgYnl0ZWNfMiAvLyAweDI4CiAgICA9PQogICAgYnVyeSAxMwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czozMjgKICAgIC8vIGNvbnN0IGlzRXNjcm93ID0gdHlwZSA9PT0gU1RBS0lOR19UWVBFX0hBUkQgfHwgdHlwZSA9PT0gU1RBS0lOR19UWVBFX0xPQ0sKICAgIGJ5dGVjIDQgLy8gMHgxZQogICAgPT0KICAgIGJueiBzdGFrZUFzYV9ib29sX3RydWVANQogICAgZGlnIDExCiAgICBieiBzdGFrZUFzYV9ib29sX2ZhbHNlQDYKCnN0YWtlQXNhX2Jvb2xfdHJ1ZUA1OgogICAgaW50Y18xIC8vIDEKICAgIGJ1cnkgMTQKCnN0YWtlQXNhX2Jvb2xfbWVyZ2VANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MzI5CiAgICAvLyBjb25zdCB0aW1lc3RhbXAgPSBHbG9iYWwubGF0ZXN0VGltZXN0YW1wCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBidXJ5IDExCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjMzMQogICAgLy8gbG9nZ2VkQXNzZXJ0KChpblRoZUZ1dHVyZSAmJiBsZXNzVGhhbk1heExvY2t1cCkgfHwgIWxvY2tlZCwgRVJSX0JBRF9FWFBJUkFUSU9OKQogICAgZGlnIDQKICAgIGJ6IHN0YWtlQXNhX29yX2NvbnRkQDkKICAgIGRpZyAzCiAgICBibnogc3Rha2VBc2FfYm9vbF90cnVlQDEwCgpzdGFrZUFzYV9vcl9jb250ZEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czozMzEKICAgIC8vIGxvZ2dlZEFzc2VydCgoaW5UaGVGdXR1cmUgJiYgbGVzc1RoYW5NYXhMb2NrdXApIHx8ICFsb2NrZWQsIEVSUl9CQURfRVhQSVJBVElPTikKICAgIGRpZyAxMQogICAgYm56IHN0YWtlQXNhX2Jvb2xfZmFsc2VAMTEKCnN0YWtlQXNhX2Jvb2xfdHJ1ZUAxMDoKICAgIGludGNfMSAvLyAxCgpzdGFrZUFzYV9ib29sX21lcmdlQDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czozMzEKICAgIC8vIGxvZ2dlZEFzc2VydCgoaW5UaGVGdXR1cmUgJiYgbGVzc1RoYW5NYXhMb2NrdXApIHx8ICFsb2NrZWQsIEVSUl9CQURfRVhQSVJBVElPTikKICAgIGJueiBzdGFrZUFzYV9hZnRlcl9hc3NlcnRAMTQKICAgIGJ5dGVjIDIxIC8vICJFUlI6QkVYUCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpCRVhQCgpzdGFrZUFzYV9hZnRlcl9hc3NlcnRAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjMzNQogICAgLy8gY29uc3Qgc2s6IFN0YWtlS2V5ID0geyBhZGRyZXNzOiBUeG4uc2VuZGVyLCBhc3NldCwgdHlwZSB9CiAgICB0eG4gU2VuZGVyCiAgICBkaWcgMgogICAgY29uY2F0CiAgICBkaWcgOAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjgxCiAgICAvLyBzdGFrZXMgPSBCb3hNYXA8U3Rha2VLZXksIFN0YWtlPih7IGtleVByZWZpeDogU3Rha2luZ0JveFByZWZpeFN0YWtlcyB9KQogICAgYnl0ZWNfMCAvLyAicyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBidXJ5IDIzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjMzNwogICAgLy8gY29uc3QgaXNVcGRhdGUgPSB0aGlzLnN0YWtlcyhzaykuZXhpc3RzCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MzM5CiAgICAvLyBpZiAoIWlzVXBkYXRlKSB7CiAgICBibnogc3Rha2VBc2FfZWxzZV9ib2R5QDU0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjM0MwogICAgLy8gaWYgKGlzRXNjcm93KSB7CiAgICBkaWcgMTMKICAgIGJ6IHN0YWtlQXNhX2Vsc2VfYm9keUAyNQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czozNDQKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgRVJSX0lOVkFMSURfUEFZTUVOVF9SRUNFSVZFUikKICAgIGRpZyA5CiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogc3Rha2VBc2FfYWZ0ZXJfYXNzZXJ0QDE4CiAgICBieXRlYyAxMCAvLyAiRVJSOklQTVIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBNUgoKc3Rha2VBc2FfYWZ0ZXJfYXNzZXJ0QDE4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czozNDUKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LmFtb3VudCA9PT0gY29zdHMuc3Rha2VzLCBFUlJfSU5WQUxJRF9QQVlNRU5UX0FNT1VOVCkKICAgIGRpZyA5CiAgICBndHhucyBBbW91bnQKICAgIGludGMgNCAvLyAyODkwMAogICAgPT0KICAgIGJueiBzdGFrZUFzYV9hZnRlcl9hc3NlcnRAMjAKICAgIGJ5dGVjIDExIC8vICJFUlI6SVBNQSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUE1BCgpzdGFrZUFzYV9hZnRlcl9hc3NlcnRAMjA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjM0NwogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci5hc3NldFJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgRVJSX0lOVkFMSURfQVNTRVRfQU1PVU5UKQogICAgZGlnIDgKICAgIGd0eG5zIEFzc2V0UmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IHN0YWtlQXNhX2FmdGVyX2Fzc2VydEAyMgogICAgYnl0ZWMgNiAvLyAiRVJSOklBQU0iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SUFBTQoKc3Rha2VBc2FfYWZ0ZXJfYXNzZXJ0QDIyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czozNDgKICAgIC8vIGxvZ2dlZEFzc2VydChhc3NldFhmZXIuYXNzZXRBbW91bnQgPT09IGFtb3VudCwgRVJSX0lOVkFMSURfQVNTRVRfQU1PVU5UKQogICAgZGlnIDgKICAgIGd0eG5zIEFzc2V0QW1vdW50CiAgICBkaWcgNwogICAgPT0KICAgIGJueiBzdGFrZUFzYV9hZnRlcl9hc3NlcnRAMjQKICAgIGJ5dGVjIDYgLy8gIkVSUjpJQUFNIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklBQU0KCnN0YWtlQXNhX2FmdGVyX2Fzc2VydEAyNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MzUwCiAgICAvLyB0aGlzLnVwZGF0ZVRvdGFscyhhc3NldCwgdHlwZSwgYW1vdW50LCB0cnVlKQogICAgZGlnIDIKICAgIGRpZyA4CiAgICBkaWcgOAogICAgaW50Y18xIC8vIDEKICAgIGNhbGxzdWIgdXBkYXRlVG90YWxzCgpzdGFrZUFzYV9hZnRlcl9pZl9lbHNlQDUzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0MTQtNDE4CiAgICAvLyB0aGlzLnN0YWtlcyhzaykudmFsdWUgPSB7CiAgICAvLyAgIGFtb3VudCwKICAgIC8vICAgbGFzdFVwZGF0ZTogdGltZXN0YW1wLAogICAgLy8gICBleHBpcmF0aW9uLAogICAgLy8gfQogICAgZGlnIDYKICAgIGl0b2IKICAgIGRpZyAxMQogICAgaXRvYgogICAgY29uY2F0CiAgICBkaWcgNgogICAgaXRvYgogICAgY29uY2F0CiAgICBkaWcgMjIKICAgIHN3YXAKICAgIGJveF9wdXQKCnN0YWtlQXNhX2FmdGVyX2lmX2Vsc2VAODA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjMxNS0zMjEKICAgIC8vIHN0YWtlQXNhKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICB0eXBlOiBTdGFraW5nVHlwZSwKICAgIC8vICAgYW1vdW50OiB1aW50NjQsCiAgICAvLyAgIGV4cGlyYXRpb246IHVpbnQ2NAogICAgLy8gKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpzdGFrZUFzYV9lbHNlX2JvZHlAMjU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjM1MgogICAgLy8gfSBlbHNlIGlmICh0eXBlID09PSBTVEFLSU5HX1RZUEVfSEVBUlRCRUFUKSB7CiAgICBkaWcgNwogICAgYnl0ZWMgOSAvLyAweDBhCiAgICA9PQogICAgYnogc3Rha2VBc2FfZWxzZV9ib2R5QDQxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjM1MwogICAgLy8gY29uc3QgW2hvbGRpbmdBbW91bnQsIG9wdGVkSW5dID0gQXNzZXRIb2xkaW5nLmFzc2V0QmFsYW5jZShUeG4uc2VuZGVyLCBhc3NldCkKICAgIHR4biBTZW5kZXIKICAgIGRpZyAzCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIHN3YXAKICAgIGJ1cnkgMTgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MzU1CiAgICAvLyBsb2dnZWRBc3NlcnQob3B0ZWRJbiwgRVJSX05PVF9PUFRFRF9JTikKICAgIGJueiBzdGFrZUFzYV9hZnRlcl9hc3NlcnRAMjgKICAgIGJ5dGVjIDEzIC8vICJFUlI6Tk9QVCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOT1BUCgpzdGFrZUFzYV9hZnRlcl9hc3NlcnRAMjg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjM1NgogICAgLy8gbG9nZ2VkQXNzZXJ0KGhvbGRpbmdBbW91bnQgPiAwLCBFUlJfSU5WQUxJRF9BU1NFVF9BTU9VTlQpCiAgICBkaWcgMTYKICAgIGJueiBzdGFrZUFzYV9hZnRlcl9hc3NlcnRAMzAKICAgIGJ5dGVjIDYgLy8gIkVSUjpJQUFNIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklBQU0KCnN0YWtlQXNhX2FmdGVyX2Fzc2VydEAzMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MzU4CiAgICAvLyBjb25zdCBoZWxkID0gbmV3IFVpbnQ2NChob2xkaW5nQW1vdW50KQogICAgZGlnIDE2CiAgICBpdG9iCiAgICBidXJ5IDIzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjM2MAogICAgLy8gY29uc3QgaGFyZFN0YWtlS2V5OiBTdGFrZUtleSA9IHsgYWRkcmVzczogVHhuLnNlbmRlciwgYXNzZXQsIHR5cGU6IFNUQUtJTkdfVFlQRV9IQVJEIH0KICAgIHR4biBTZW5kZXIKICAgIGRpZyAyCiAgICBjb25jYXQKICAgIGJ5dGVjIDQgLy8gMHgxZQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjM2MgogICAgLy8gbGV0IGhhcmQ6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBidXJ5IDE5CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjgxCiAgICAvLyBzdGFrZXMgPSBCb3hNYXA8U3Rha2VLZXksIFN0YWtlPih7IGtleVByZWZpeDogU3Rha2luZ0JveFByZWZpeFN0YWtlcyB9KQogICAgYnl0ZWNfMCAvLyAicyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBidXJ5IDIyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjM2MwogICAgLy8gaWYgKHRoaXMuc3Rha2VzKGhhcmRTdGFrZUtleSkuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IHN0YWtlQXNhX2FmdGVyX2lmX2Vsc2VAMzIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MzY0CiAgICAvLyBoYXJkID0gdGhpcy5zdGFrZXMoaGFyZFN0YWtlS2V5KS52YWx1ZS5hbW91bnQKICAgIGRpZyAyMAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYnVyeSAxOAoKc3Rha2VBc2FfYWZ0ZXJfaWZfZWxzZUAzMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MzY3CiAgICAvLyBjb25zdCBsb2NrU3Rha2VLZXk6IFN0YWtlS2V5ID0geyBhZGRyZXNzOiBUeG4uc2VuZGVyLCBhc3NldCwgdHlwZTogU1RBS0lOR19UWVBFX0xPQ0sgfQogICAgdHhuIFNlbmRlcgogICAgZGlnIDIKICAgIGNvbmNhdAogICAgYnl0ZWNfMiAvLyAweDI4CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MzY5CiAgICAvLyBsZXQgbG9jazogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIGJ1cnkgMTQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODEKICAgIC8vIHN0YWtlcyA9IEJveE1hcDxTdGFrZUtleSwgU3Rha2U+KHsga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4U3Rha2VzIH0pCiAgICBieXRlY18wIC8vICJzIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGJ1cnkgMjEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MzcwCiAgICAvLyBpZiAodGhpcy5zdGFrZXMobG9ja1N0YWtlS2V5KS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogc3Rha2VBc2FfYWZ0ZXJfaWZfZWxzZUAzNAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czozNzEKICAgIC8vIGxvY2sgPSB0aGlzLnN0YWtlcyhsb2NrU3Rha2VLZXkpLnZhbHVlLmFtb3VudAogICAgZGlnIDE5CiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBidXJ5IDEzCgpzdGFrZUFzYV9hZnRlcl9pZl9lbHNlQDM0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czozNzQKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgRVJSX0lOVkFMSURfUEFZTUVOVF9SRUNFSVZFUikKICAgIGRpZyA5CiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogc3Rha2VBc2FfYWZ0ZXJfYXNzZXJ0QDM2CiAgICBieXRlYyAxMCAvLyAiRVJSOklQTVIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBNUgoKc3Rha2VBc2FfYWZ0ZXJfYXNzZXJ0QDM2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czozNzUKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LmFtb3VudCA9PT0gKGNvc3RzLnN0YWtlcyArIGNvc3RzLmhlYXJ0YmVhdHMpLCBFUlJfSU5WQUxJRF9QQVlNRU5UX0FNT1VOVCkKICAgIGRpZyA5CiAgICBndHhucyBBbW91bnQKICAgIGludGMgNSAvLyA5OTAwMAogICAgPT0KICAgIGJueiBzdGFrZUFzYV9hZnRlcl9hc3NlcnRAMzgKICAgIGJ5dGVjIDExIC8vICJFUlI6SVBNQSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUE1BCgpzdGFrZUFzYV9hZnRlcl9hc3NlcnRAMzg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjM3OAogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci5hc3NldEFtb3VudCA9PT0gMCwgRVJSX0lOVkFMSURfQVNTRVRfQU1PVU5UKQogICAgZGlnIDgKICAgIGd0eG5zIEFzc2V0QW1vdW50CiAgICBieiBzdGFrZUFzYV9hZnRlcl9hc3NlcnRANDAKICAgIGJ5dGVjIDYgLy8gIkVSUjpJQUFNIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklBQU0KCnN0YWtlQXNhX2FmdGVyX2Fzc2VydEA0MDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MzgwCiAgICAvLyBjb25zdCBoZWFydGJlYXRLZXk6IEhlYXJ0YmVhdEtleSA9IHsgYWRkcmVzczogVHhuLnNlbmRlciwgYXNzZXQgfQogICAgdHhuIFNlbmRlcgogICAgZGlnIDIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czozODQKICAgIC8vIGhhcmQ6IG5ldyBVaW50NjQoaGFyZCksCiAgICBkaWcgMTgKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6Mzg1CiAgICAvLyBsb2NrOiBuZXcgVWludDY0KGxvY2spLAogICAgZGlnIDE0CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjM4NgogICAgLy8gdGltZXN0YW1wOiBuZXcgVWludDY0KHRpbWVzdGFtcCksCiAgICBkaWcgMTMKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MzgyLTM4NwogICAgLy8gY29uc3QgaGJ2ID0gbmV3IGFyYzRIZWFydGJlYXQoewogICAgLy8gICBoZWxkLAogICAgLy8gICBoYXJkOiBuZXcgVWludDY0KGhhcmQpLAogICAgLy8gICBsb2NrOiBuZXcgVWludDY0KGxvY2spLAogICAgLy8gICB0aW1lc3RhbXA6IG5ldyBVaW50NjQodGltZXN0YW1wKSwKICAgIC8vIH0pCiAgICBkaWcgMjYKICAgIHVuY292ZXIgMwogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjM5Ni00MDEKICAgIC8vIHRoaXMuaGVhcnRiZWF0cyhoZWFydGJlYXRLZXkpLnZhbHVlID0gbmV3IGFyYzQuU3RhdGljQXJyYXk8YXJjNEhlYXJ0YmVhdCwgND4oCiAgICAvLyAgIGNsb25lKGhidiksCiAgICAvLyAgIGNsb25lKGVoYnYpLAogICAgLy8gICBjbG9uZShlaGJ2KSwKICAgIC8vICAgY2xvbmUoZWhidikKICAgIC8vICkKICAgIGJ5dGVjIDIyIC8vIDB4MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODQtODYKICAgIC8vIGhlYXJ0YmVhdHMgPSBCb3hNYXA8SGVhcnRiZWF0S2V5LCBhcmM0LlN0YXRpY0FycmF5PGFyYzRIZWFydGJlYXQsIDQ+Pih7CiAgICAvLyAgIGtleVByZWZpeDogU3Rha2luZ0JveFByZWZpeEhlYXJ0YmVhdHMsCiAgICAvLyB9KQogICAgYnl0ZWMgNyAvLyAiaCIKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjM5Ni00MDEKICAgIC8vIHRoaXMuaGVhcnRiZWF0cyhoZWFydGJlYXRLZXkpLnZhbHVlID0gbmV3IGFyYzQuU3RhdGljQXJyYXk8YXJjNEhlYXJ0YmVhdCwgND4oCiAgICAvLyAgIGNsb25lKGhidiksCiAgICAvLyAgIGNsb25lKGVoYnYpLAogICAgLy8gICBjbG9uZShlaGJ2KSwKICAgIC8vICAgY2xvbmUoZWhidikKICAgIC8vICkKICAgIHN3YXAKICAgIGJveF9wdXQKICAgIGIgc3Rha2VBc2FfYWZ0ZXJfaWZfZWxzZUA1MwoKc3Rha2VBc2FfZWxzZV9ib2R5QDQxOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0MDMKICAgIC8vIGNvbnN0IFtob2xkaW5nQW1vdW50LCBvcHRlZEluXSA9IEFzc2V0SG9sZGluZy5hc3NldEJhbGFuY2UoVHhuLnNlbmRlciwgYXNzZXQpCiAgICB0eG4gU2VuZGVyCiAgICBkaWcgMwogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBzd2FwCiAgICBidXJ5IDE3CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQwNAogICAgLy8gbG9nZ2VkQXNzZXJ0KG9wdGVkSW4sIEVSUl9OT1RfT1BURURfSU4pCiAgICBibnogc3Rha2VBc2FfYWZ0ZXJfYXNzZXJ0QDQzCiAgICBieXRlYyAxMyAvLyAiRVJSOk5PUFQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6Tk9QVAoKc3Rha2VBc2FfYWZ0ZXJfYXNzZXJ0QDQzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0MDUKICAgIC8vIGxvZ2dlZEFzc2VydChob2xkaW5nQW1vdW50ID49IGFtb3VudCwgRVJSX0lOU1VGRklDSUVOVF9CQUxBTkNFKQogICAgZGlnIDE1CiAgICBkaWcgNwogICAgPj0KICAgIGJueiBzdGFrZUFzYV9hZnRlcl9hc3NlcnRANDUKICAgIGJ5dGVjIDEyIC8vICJFUlI6SUJBTCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJQkFMCgpzdGFrZUFzYV9hZnRlcl9hc3NlcnRANDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQwNwogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfSU5WQUxJRF9QQVlNRU5UX1JFQ0VJVkVSKQogICAgZGlnIDkKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBzdGFrZUFzYV9hZnRlcl9hc3NlcnRANDcKICAgIGJ5dGVjIDEwIC8vICJFUlI6SVBNUiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUE1SCgpzdGFrZUFzYV9hZnRlcl9hc3NlcnRANDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQwOAogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSBjb3N0cy5zdGFrZXMsIEVSUl9JTlZBTElEX1BBWU1FTlRfQU1PVU5UKQogICAgZGlnIDkKICAgIGd0eG5zIEFtb3VudAogICAgaW50YyA0IC8vIDI4OTAwCiAgICA9PQogICAgYm56IHN0YWtlQXNhX2FmdGVyX2Fzc2VydEA0OQogICAgYnl0ZWMgMTEgLy8gIkVSUjpJUE1BIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQTUEKCnN0YWtlQXNhX2FmdGVyX2Fzc2VydEA0OToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDExCiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLmFzc2V0QW1vdW50ID09PSAwLCBFUlJfSU5WQUxJRF9BU1NFVF9BTU9VTlQpCiAgICBkaWcgOAogICAgZ3R4bnMgQXNzZXRBbW91bnQKICAgIGJ6IHN0YWtlQXNhX2FmdGVyX2lmX2Vsc2VANTMKICAgIGJ5dGVjIDYgLy8gIkVSUjpJQUFNIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklBQU0KCnN0YWtlQXNhX2Vsc2VfYm9keUA1NDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDIwCiAgICAvLyBsb2dnZWRBc3NlcnQodHlwZSAhPT0gU1RBS0lOR19UWVBFX0hFQVJUQkVBVCwgRVJSX0hFQVJUQkVBVF9DQU5OT1RfVVBEQVRFKQogICAgZGlnIDcKICAgIGJ5dGVjIDkgLy8gMHgwYQogICAgIT0KICAgIGJueiBzdGFrZUFzYV9hZnRlcl9hc3NlcnRANTYKICAgIGJ5dGVjIDIzIC8vICJFUlI6SEJDVSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpIQkNVCgpzdGFrZUFzYV9hZnRlcl9hc3NlcnRANTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQyMQogICAgLy8gY29uc3QgeyBleHBpcmF0aW9uOiBjdXJyZW50U3Rha2VFeHBpcmF0aW9uLCBhbW91bnQ6IGN1cnJlbnRTdGFrZUFtb3VudCB9ID0gdGhpcy5zdGFrZXMoc2spLnZhbHVlCiAgICBkaWcgMjEKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBkdXAKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGJ1cnkgMjAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDIyCiAgICAvLyBsb2dnZWRBc3NlcnQoZXhwaXJhdGlvbiA+PSBjdXJyZW50U3Rha2VFeHBpcmF0aW9uIHx8ICFsb2NrZWQsIEVSUl9CQURfRVhQSVJBVElPTl9VUERBVEUpCiAgICBkaWcgNgogICAgPD0KICAgIGJueiBzdGFrZUFzYV9ib29sX3RydWVANTgKICAgIGRpZyAxMQogICAgYm56IHN0YWtlQXNhX2Jvb2xfZmFsc2VANTkKCnN0YWtlQXNhX2Jvb2xfdHJ1ZUA1ODoKICAgIGludGNfMSAvLyAxCgpzdGFrZUFzYV9ib29sX21lcmdlQDYwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0MjIKICAgIC8vIGxvZ2dlZEFzc2VydChleHBpcmF0aW9uID49IGN1cnJlbnRTdGFrZUV4cGlyYXRpb24gfHwgIWxvY2tlZCwgRVJSX0JBRF9FWFBJUkFUSU9OX1VQREFURSkKICAgIGJueiBzdGFrZUFzYV9hZnRlcl9hc3NlcnRANjIKICAgIGJ5dGVjIDI0IC8vICJFUlI6QkVYVSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpCRVhVCgpzdGFrZUFzYV9hZnRlcl9hc3NlcnRANjI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQyNQogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfSU5WQUxJRF9QQVlNRU5UX1JFQ0VJVkVSKQogICAgZGlnIDkKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBzdGFrZUFzYV9hZnRlcl9hc3NlcnRANjQKICAgIGJ5dGVjIDEwIC8vICJFUlI6SVBNUiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUE1SCgpzdGFrZUFzYV9hZnRlcl9hc3NlcnRANjQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQyNgogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSAwLCBFUlJfSU5WQUxJRF9QQVlNRU5UX0FNT1VOVCkKICAgIGRpZyA5CiAgICBndHhucyBBbW91bnQKICAgIGJ6IHN0YWtlQXNhX2FmdGVyX2Fzc2VydEA2NgogICAgYnl0ZWMgMTEgLy8gIkVSUjpJUE1BIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQTUEKCnN0YWtlQXNhX2FmdGVyX2Fzc2VydEA2NjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDI4CiAgICAvLyBpZiAoaXNFc2Nyb3cpIHsKICAgIGRpZyAxMwogICAgYnogc3Rha2VBc2FfZWxzZV9ib2R5QDcyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQyOQogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci5hc3NldFJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgRVJSX0lOVkFMSURfQVNTRVRfQU1PVU5UKQogICAgZGlnIDgKICAgIGd0eG5zIEFzc2V0UmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IHN0YWtlQXNhX2FmdGVyX2Fzc2VydEA2OQogICAgYnl0ZWMgNiAvLyAiRVJSOklBQU0iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SUFBTQoKc3Rha2VBc2FfYWZ0ZXJfYXNzZXJ0QDY5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0MzAKICAgIC8vIGxvZ2dlZEFzc2VydChhc3NldFhmZXIuYXNzZXRBbW91bnQgPT09IGFtb3VudCwgRVJSX0lOVkFMSURfQVNTRVRfQU1PVU5UKQogICAgZGlnIDgKICAgIGd0eG5zIEFzc2V0QW1vdW50CiAgICBkaWcgNwogICAgPT0KICAgIGJueiBzdGFrZUFzYV9hZnRlcl9hc3NlcnRANzEKICAgIGJ5dGVjIDYgLy8gIkVSUjpJQUFNIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklBQU0KCnN0YWtlQXNhX2FmdGVyX2Fzc2VydEA3MToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDMyCiAgICAvLyB0aGlzLnVwZGF0ZVRvdGFscyhhc3NldCwgdHlwZSwgYW1vdW50LCB0cnVlKQogICAgZGlnIDIKICAgIGRpZyA4CiAgICBkaWcgOAogICAgaW50Y18xIC8vIDEKICAgIGNhbGxzdWIgdXBkYXRlVG90YWxzCgpzdGFrZUFzYV9hZnRlcl9pZl9lbHNlQDc5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0NDEKICAgIC8vIGNvbnN0IG5ld0Ftb3VudDogdWludDY0ID0gY3VycmVudFN0YWtlQW1vdW50ICsgYW1vdW50CiAgICBkaWcgMTgKICAgIGRpZyA3CiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQ0My00NDcKICAgIC8vIHRoaXMuc3Rha2VzKHNrKS52YWx1ZSA9IHsKICAgIC8vICAgYW1vdW50OiBuZXdBbW91bnQsCiAgICAvLyAgIGxhc3RVcGRhdGU6IHRpbWVzdGFtcCwKICAgIC8vICAgZXhwaXJhdGlvbiwKICAgIC8vIH0KICAgIGl0b2IKICAgIGRpZyAxMQogICAgaXRvYgogICAgY29uY2F0CiAgICBkaWcgNgogICAgaXRvYgogICAgY29uY2F0CiAgICBkaWcgMjIKICAgIHN3YXAKICAgIGJveF9wdXQKICAgIGIgc3Rha2VBc2FfYWZ0ZXJfaWZfZWxzZUA4MAoKc3Rha2VBc2FfZWxzZV9ib2R5QDcyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0MzQKICAgIC8vIGNvbnN0IFtob2xkaW5nQW1vdW50LCBvcHRlZEluXSA9IEFzc2V0SG9sZGluZy5hc3NldEJhbGFuY2UoVHhuLnNlbmRlciwgYXNzZXQpCiAgICB0eG4gU2VuZGVyCiAgICBkaWcgMwogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBzd2FwCiAgICBidXJ5IDE2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQzNQogICAgLy8gbG9nZ2VkQXNzZXJ0KG9wdGVkSW4sIEVSUl9OT1RfT1BURURfSU4pCiAgICBibnogc3Rha2VBc2FfYWZ0ZXJfYXNzZXJ0QDc0CiAgICBieXRlYyAxMyAvLyAiRVJSOk5PUFQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6Tk9QVAoKc3Rha2VBc2FfYWZ0ZXJfYXNzZXJ0QDc0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0MzYKICAgIC8vIGxvZ2dlZEFzc2VydChob2xkaW5nQW1vdW50ID49IGN1cnJlbnRTdGFrZUFtb3VudCArIGFtb3VudCwgRVJSX0lOU1VGRklDSUVOVF9CQUxBTkNFKQogICAgZGlnIDE4CiAgICBkaWcgNwogICAgKwogICAgZGlnIDE1CiAgICA8PQogICAgYm56IHN0YWtlQXNhX2FmdGVyX2Fzc2VydEA3NgogICAgYnl0ZWMgMTIgLy8gIkVSUjpJQkFMIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklCQUwKCnN0YWtlQXNhX2FmdGVyX2Fzc2VydEA3NjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDM4CiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLmFzc2V0QW1vdW50ID09PSAwLCBFUlJfSU5WQUxJRF9BU1NFVF9BTU9VTlQpCiAgICBkaWcgOAogICAgZ3R4bnMgQXNzZXRBbW91bnQKICAgIGJ6IHN0YWtlQXNhX2FmdGVyX2lmX2Vsc2VANzkKICAgIGJ5dGVjIDYgLy8gIkVSUjpJQUFNIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklBQU0KCnN0YWtlQXNhX2Jvb2xfZmFsc2VANTk6CiAgICBpbnRjXzAgLy8gMAogICAgYiBzdGFrZUFzYV9ib29sX21lcmdlQDYwCgpzdGFrZUFzYV9ib29sX2ZhbHNlQDExOgogICAgaW50Y18wIC8vIDAKICAgIGIgc3Rha2VBc2FfYm9vbF9tZXJnZUAxMgoKc3Rha2VBc2FfYm9vbF9mYWxzZUA2OgogICAgaW50Y18wIC8vIDAKICAgIGJ1cnkgMTQKICAgIGIgc3Rha2VBc2FfYm9vbF9tZXJnZUA3CgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy53aXRoZHJhd1tyb3V0aW5nXSgpIC0+IHZvaWQ6CndpdGhkcmF3OgogICAgaW50Y18wIC8vIDAKICAgIGJ5dGVjXzMgLy8gIiIKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0NTEKICAgIC8vIHdpdGhkcmF3KGFzc2V0OiB1aW50NjQsIHR5cGU6IFN0YWtpbmdUeXBlKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXBuIDIKICAgIGxlbgogICAgaW50Y18xIC8vIDEKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDUzCiAgICAvLyB0eXBlID09PSBTVEFLSU5HX1RZUEVfSEFSRCB8fCB0eXBlID09PSBTVEFLSU5HX1RZUEVfTE9DSywKICAgIGJ5dGVjIDQgLy8gMHgxZQogICAgPT0KICAgIGJueiB3aXRoZHJhd19ib29sX3RydWVAMwogICAgZHVwCiAgICBieXRlY18yIC8vIDB4MjgKICAgID09CiAgICBieiB3aXRoZHJhd19ib29sX2ZhbHNlQDQKCndpdGhkcmF3X2Jvb2xfdHJ1ZUAzOgogICAgaW50Y18xIC8vIDEKCndpdGhkcmF3X2Jvb2xfbWVyZ2VANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDUyLTQ1NQogICAgLy8gbG9nZ2VkQXNzZXJ0KAogICAgLy8gICB0eXBlID09PSBTVEFLSU5HX1RZUEVfSEFSRCB8fCB0eXBlID09PSBTVEFLSU5HX1RZUEVfTE9DSywKICAgIC8vICAgRVJSX1dJVEhEUkFXX0lTX09OTFlfRk9SX0hBUkRfT1JfTE9DSwogICAgLy8gKQogICAgYm56IHdpdGhkcmF3X2FmdGVyX2Fzc2VydEA3CiAgICBwdXNoYnl0ZXMgIkVSUjpXSE9MIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOldIT0wKCndpdGhkcmF3X2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0NTcKICAgIC8vIGNvbnN0IHNrID0geyBhZGRyZXNzOiBUeG4uc2VuZGVyLCBhc3NldCwgdHlwZSB9CiAgICB0eG4gU2VuZGVyCiAgICBkaWcgMgogICAgaXRvYgogICAgY29uY2F0CiAgICBkaWcgMQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQ1OAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc3Rha2VzKHNrKS5leGlzdHMsIEVSUl9OT19MT0NLKQogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIGRpZyAxCiAgICBleHRyYWN0IDMyIDgKICAgIHVuY292ZXIgMgogICAgZXh0cmFjdCA0MCAxCiAgICBjb3ZlciAyCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4MQogICAgLy8gc3Rha2VzID0gQm94TWFwPFN0YWtlS2V5LCBTdGFrZT4oeyBrZXlQcmVmaXg6IFN0YWtpbmdCb3hQcmVmaXhTdGFrZXMgfSkKICAgIGJ5dGVjXzAgLy8gInMiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgYnVyeSA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQ1OAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc3Rha2VzKHNrKS5leGlzdHMsIEVSUl9OT19MT0NLKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogd2l0aGRyYXdfYWZ0ZXJfYXNzZXJ0QDkKICAgIGJ5dGVjIDE3IC8vICJFUlI6TkxDSyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOTENLCgp3aXRoZHJhd19hZnRlcl9hc3NlcnRAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDYwCiAgICAvLyBjb25zdCB7IGV4cGlyYXRpb24sIGFtb3VudCB9ID0gdGhpcy5zdGFrZXMoc2spLnZhbHVlCiAgICBkaWcgNAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGR1cAogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIGJ1cnkgNAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBidXJ5IDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDYxCiAgICAvLyBsb2dnZWRBc3NlcnQodHlwZSAhPT0gU1RBS0lOR19UWVBFX0xPQ0sgfHwgZXhwaXJhdGlvbiA8IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsIEVSUl9MT0NLRUQpCiAgICBkdXAKICAgIGJ5dGVjXzIgLy8gMHgyOAogICAgIT0KICAgIGJueiB3aXRoZHJhd19ib29sX3RydWVAMTEKICAgIGRpZyAyCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICA8CiAgICBieiB3aXRoZHJhd19ib29sX2ZhbHNlQDEyCgp3aXRoZHJhd19ib29sX3RydWVAMTE6CiAgICBpbnRjXzEgLy8gMQoKd2l0aGRyYXdfYm9vbF9tZXJnZUAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDYxCiAgICAvLyBsb2dnZWRBc3NlcnQodHlwZSAhPT0gU1RBS0lOR19UWVBFX0xPQ0sgfHwgZXhwaXJhdGlvbiA8IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsIEVSUl9MT0NLRUQpCiAgICBibnogd2l0aGRyYXdfYWZ0ZXJfYXNzZXJ0QDE1CiAgICBieXRlYyAyNSAvLyAiRVJSOkxPQ0siCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TE9DSwoKd2l0aGRyYXdfYWZ0ZXJfYXNzZXJ0QDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0NjMKICAgIC8vIGlmIChhc3NldCA9PT0gMCkgewogICAgZGlnIDEKICAgIGJueiB3aXRoZHJhd19lbHNlX2JvZHlAMTgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDY0LTQ2OQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgYW1vdW50OiBhbW91bnQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQ2NgogICAgLy8gcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICBkaWcgNAogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDY0LTQ2OAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgYW1vdW50OiBhbW91bnQKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDY0LTQ2OQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgYW1vdW50OiBhbW91bnQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAoKd2l0aGRyYXdfYWZ0ZXJfaWZfZWxzZUAyMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDgwCiAgICAvLyB0aGlzLnVwZGF0ZVRvdGFscyhhc3NldCwgdHlwZSwgYW1vdW50LCBmYWxzZSkKICAgIGR1cDIKICAgIGRpZyA1CiAgICBpbnRjXzAgLy8gMAogICAgY2FsbHN1YiB1cGRhdGVUb3RhbHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDgyCiAgICAvLyB0aGlzLnN0YWtlcyhzaykuZGVsZXRlKCkKICAgIGRpZyA0CiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDUxCiAgICAvLyB3aXRoZHJhdyhhc3NldDogdWludDY0LCB0eXBlOiBTdGFraW5nVHlwZSk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKd2l0aGRyYXdfZWxzZV9ib2R5QDE4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0NzEtNDc3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnQsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDczCiAgICAvLyBhc3NldFJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgZGlnIDIKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBkaWcgNAogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQ3MS00NzYKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyAgIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0NzEtNDc3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnQsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICBiIHdpdGhkcmF3X2FmdGVyX2lmX2Vsc2VAMjAKCndpdGhkcmF3X2Jvb2xfZmFsc2VAMTI6CiAgICBpbnRjXzAgLy8gMAogICAgYiB3aXRoZHJhd19ib29sX21lcmdlQDEzCgp3aXRoZHJhd19ib29sX2ZhbHNlQDQ6CiAgICBpbnRjXzAgLy8gMAogICAgYiB3aXRoZHJhd19ib29sX21lcmdlQDUKCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmNyZWF0ZUhlYXJ0YmVhdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNyZWF0ZUhlYXJ0YmVhdDoKICAgIGludGNfMCAvLyAwCiAgICBkdXBuIDYKICAgIGJ5dGVjXzMgLy8gIiIKICAgIGR1cG4gNAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0ODUKICAgIC8vIGNyZWF0ZUhlYXJ0YmVhdChhZGRyZXNzOiBBY2NvdW50LCBhc3NldDogdWludDY0KTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDg2CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5oZWFydGJlYXRNYW5hZ2VyQWRkcmVzcy52YWx1ZSwgRVJSX05PVF9IRUFSVEJFQVRfTUFOQUdFUikKICAgIHR4biBTZW5kZXIKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjc2CiAgICAvLyBoZWFydGJlYXRNYW5hZ2VyQWRkcmVzcyA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBTdGFraW5nR2xvYmFsU3RhdGVLZXlIZWFydGJlYXRNYW5hZ2VyQWRkcmVzcyB9KQogICAgcHVzaGJ5dGVzICJoZWFydGJlYXRfbWFuYWdlcl9hZGRyZXNzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0ODYKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmhlYXJ0YmVhdE1hbmFnZXJBZGRyZXNzLnZhbHVlLCBFUlJfTk9UX0hFQVJUQkVBVF9NQU5BR0VSKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgID09CiAgICBibnogY3JlYXRlSGVhcnRiZWF0X2FmdGVyX2Fzc2VydEAzCiAgICBwdXNoYnl0ZXMgIkVSUjpOSEJNIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5IQk0KCmNyZWF0ZUhlYXJ0YmVhdF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDg4CiAgICAvLyBjb25zdCBoYmsgPSB7IGFkZHJlc3MsIGFzc2V0IH0KICAgIGR1cAogICAgaXRvYgogICAgZGlnIDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBidXJ5IDE1CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQ4OQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuaGVhcnRiZWF0cyhoYmspLmV4aXN0cywgRVJSX0hFQVJCRUFUX05PVF9GT1VORCkKICAgIGR1cAogICAgZXh0cmFjdCAwIDMyCiAgICBzd2FwCiAgICBleHRyYWN0IDMyIDgKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4NC04NgogICAgLy8gaGVhcnRiZWF0cyA9IEJveE1hcDxIZWFydGJlYXRLZXksIGFyYzQuU3RhdGljQXJyYXk8YXJjNEhlYXJ0YmVhdCwgND4+KHsKICAgIC8vICAga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4SGVhcnRiZWF0cywKICAgIC8vIH0pCiAgICBieXRlYyA3IC8vICJoIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGJ1cnkgMTIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDg5CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5oZWFydGJlYXRzKGhiaykuZXhpc3RzLCBFUlJfSEVBUkJFQVRfTk9UX0ZPVU5EKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogY3JlYXRlSGVhcnRiZWF0X2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyAxOCAvLyAiRVJSOkhCTkYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SEJORgoKY3JlYXRlSGVhcnRiZWF0X2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0OTEKICAgIC8vIGNvbnN0IHRpbWVzdGFtcCA9IG5ldyBVaW50NjQoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCkKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIGl0b2IKICAgIGJ1cnkgOAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0OTIKICAgIC8vIGNvbnN0IGhlYXJ0YmVhdHMgPSBjbG9uZSh0aGlzLmhlYXJ0YmVhdHMoaGJrKS52YWx1ZSkKICAgIGRpZyAxMAogICAgYm94X2dldAogICAgc3dhcAogICAgYnVyeSAxNAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDk0CiAgICAvLyBjb25zdCBbaG9sZGluZ3NdID0gQXNzZXRIb2xkaW5nLmFzc2V0QmFsYW5jZShhZGRyZXNzLCBhc3NldCkKICAgIGR1cDIKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQ5NQogICAgLy8gY29uc3QgaGVsZCA9IG5ldyBVaW50NjQoaG9sZGluZ3MpCiAgICBpdG9iCiAgICBidXJ5IDEyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQ5Ny01MDEKICAgIC8vIGNvbnN0IGhhcmRTdGFrZUtleSA9IHsKICAgIC8vICAgYWRkcmVzcywKICAgIC8vICAgYXNzZXQsCiAgICAvLyAgIHR5cGU6IFNUQUtJTkdfVFlQRV9IQVJECiAgICAvLyB9CiAgICBkaWcgMTMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTAwCiAgICAvLyB0eXBlOiBTVEFLSU5HX1RZUEVfSEFSRAogICAgYnl0ZWMgNCAvLyAweDFlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQ5Ny01MDEKICAgIC8vIGNvbnN0IGhhcmRTdGFrZUtleSA9IHsKICAgIC8vICAgYWRkcmVzcywKICAgIC8vICAgYXNzZXQsCiAgICAvLyAgIHR5cGU6IFNUQUtJTkdfVFlQRV9IQVJECiAgICAvLyB9CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTAzCiAgICAvLyBsZXQgaGFyZDogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIGJ1cnkgOAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1MDQKICAgIC8vIGlmICh0aGlzLnN0YWtlcyhoYXJkU3Rha2VLZXkpLmV4aXN0cykgewogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIGRpZyAxCiAgICBleHRyYWN0IDMyIDgKICAgIHVuY292ZXIgMgogICAgZXh0cmFjdCA0MCAxCiAgICBjb3ZlciAyCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4MQogICAgLy8gc3Rha2VzID0gQm94TWFwPFN0YWtlS2V5LCBTdGFrZT4oeyBrZXlQcmVmaXg6IFN0YWtpbmdCb3hQcmVmaXhTdGFrZXMgfSkKICAgIGJ5dGVjXzAgLy8gInMiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgYnVyeSAxMQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1MDQKICAgIC8vIGlmICh0aGlzLnN0YWtlcyhoYXJkU3Rha2VLZXkpLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBjcmVhdGVIZWFydGJlYXRfYWZ0ZXJfaWZfZWxzZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjUwNQogICAgLy8gaGFyZCA9IHRoaXMuc3Rha2VzKGhhcmRTdGFrZUtleSkudmFsdWUuYW1vdW50CiAgICBkaWcgOQogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYnVyeSA3CgpjcmVhdGVIZWFydGJlYXRfYWZ0ZXJfaWZfZWxzZUA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1MDgtNTEyCiAgICAvLyBjb25zdCBsb2NrU3Rha2VLZXkgPSB7CiAgICAvLyAgIGFkZHJlc3MsCiAgICAvLyAgIGFzc2V0LAogICAgLy8gICB0eXBlOiBTVEFLSU5HX1RZUEVfTE9DSwogICAgLy8gfQogICAgZGlnIDEzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjUxMQogICAgLy8gdHlwZTogU1RBS0lOR19UWVBFX0xPQ0sKICAgIGJ5dGVjXzIgLy8gMHgyOAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1MDgtNTEyCiAgICAvLyBjb25zdCBsb2NrU3Rha2VLZXkgPSB7CiAgICAvLyAgIGFkZHJlc3MsCiAgICAvLyAgIGFzc2V0LAogICAgLy8gICB0eXBlOiBTVEFLSU5HX1RZUEVfTE9DSwogICAgLy8gfQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjUxNAogICAgLy8gbGV0IGxvY2s6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBidXJ5IDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTE1CiAgICAvLyBpZiAodGhpcy5zdGFrZXMobG9ja1N0YWtlS2V5KS5leGlzdHMpIHsKICAgIGR1cAogICAgZXh0cmFjdCAwIDMyCiAgICBkaWcgMQogICAgZXh0cmFjdCAzMiA4CiAgICB1bmNvdmVyIDIKICAgIGV4dHJhY3QgNDAgMQogICAgY292ZXIgMgogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODEKICAgIC8vIHN0YWtlcyA9IEJveE1hcDxTdGFrZUtleSwgU3Rha2U+KHsga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4U3Rha2VzIH0pCiAgICBieXRlY18wIC8vICJzIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGJ1cnkgMTAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTE1CiAgICAvLyBpZiAodGhpcy5zdGFrZXMobG9ja1N0YWtlS2V5KS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogY3JlYXRlSGVhcnRiZWF0X2FmdGVyX2lmX2Vsc2VAOQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1MTYKICAgIC8vIGxvY2sgPSB0aGlzLnN0YWtlcyhsb2NrU3Rha2VLZXkpLnZhbHVlLmFtb3VudAogICAgZGlnIDgKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGJ1cnkgNAoKY3JlYXRlSGVhcnRiZWF0X2FmdGVyX2lmX2Vsc2VAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTI1CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgNDsgaSArPSAxKSB7CiAgICBpbnRjXzAgLy8gMAogICAgYnVyeSA2CgpjcmVhdGVIZWFydGJlYXRfd2hpbGVfdG9wQDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1MjUKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCA0OyBpICs9IDEpIHsKICAgIGRpZyA1CiAgICBwdXNoaW50IDQKICAgIDwKICAgIGJ6IGNyZWF0ZUhlYXJ0YmVhdF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuY3JlYXRlSGVhcnRiZWF0QDE5CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjUyNwogICAgLy8gaSA9PT0gMyB8fAogICAgZGlnIDUKICAgIHB1c2hpbnQgMwogICAgPT0KICAgIGR1cAogICAgYnVyeSA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjUyNy01MjgKICAgIC8vIGkgPT09IDMgfHwKICAgIC8vIGhlYXJ0YmVhdHNbaV0udGltZXN0YW1wLmFzVWludDY0KCkgPiBoZWFydGJlYXRzW2kgKyAxXS50aW1lc3RhbXAuYXNVaW50NjQoKQogICAgYm56IGNyZWF0ZUhlYXJ0YmVhdF9pZl9ib2R5QDEzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjUyOAogICAgLy8gaGVhcnRiZWF0c1tpXS50aW1lc3RhbXAuYXNVaW50NjQoKSA+IGhlYXJ0YmVhdHNbaSArIDFdLnRpbWVzdGFtcC5hc1VpbnQ2NCgpCiAgICBkaWcgNQogICAgZHVwCiAgICBpbnRjXzMgLy8gMzIKICAgICoKICAgIGRpZyAxNAogICAgZHVwCiAgICBjb3ZlciAzCiAgICBzd2FwCiAgICBpbnRjXzMgLy8gMzIKICAgIGV4dHJhY3QzIC8vIG9uIGVycm9yOiBpbmRleCBhY2Nlc3MgaXMgb3V0IG9mIGJvdW5kcwogICAgcHVzaGludCAyNAogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBkdXAKICAgIGJ1cnkgOAogICAgaW50Y18zIC8vIDMyCiAgICAqCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGludGNfMyAvLyAzMgogICAgZXh0cmFjdDMgLy8gb24gZXJyb3I6IGluZGV4IGFjY2VzcyBpcyBvdXQgb2YgYm91bmRzCiAgICBwdXNoaW50IDI0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgPgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1MjctNTI4CiAgICAvLyBpID09PSAzIHx8CiAgICAvLyBoZWFydGJlYXRzW2ldLnRpbWVzdGFtcC5hc1VpbnQ2NCgpID4gaGVhcnRiZWF0c1tpICsgMV0udGltZXN0YW1wLmFzVWludDY0KCkKICAgIGJ6IGNyZWF0ZUhlYXJ0YmVhdF9hZnRlcl9pZl9lbHNlQDE3CgpjcmVhdGVIZWFydGJlYXRfaWZfYm9keUAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTMwCiAgICAvLyBjb25zdCBpbmRleFRvTW9kaWZ5OiB1aW50NjQgPSBpID09PSAzID8gMCA6IGkgKyAxCiAgICBkaWcgMgogICAgYnogY3JlYXRlSGVhcnRiZWF0X3Rlcm5hcnlfZmFsc2VAMTUKICAgIGludGNfMCAvLyAwCgpjcmVhdGVIZWFydGJlYXRfdGVybmFyeV9tZXJnZUAxNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTMzCiAgICAvLyBoYXJkOiBuZXcgVWludDY0KGhhcmQpLAogICAgZGlnIDcKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTM0CiAgICAvLyBsb2NrOiBuZXcgVWludDY0KGxvY2spLAogICAgZGlnIDUKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTMxLTUzNgogICAgLy8gdGhpcy5oZWFydGJlYXRzKGhiaykudmFsdWVbaW5kZXhUb01vZGlmeV0gPSBuZXcgYXJjNEhlYXJ0YmVhdCh7CiAgICAvLyAgIGhlbGQsCiAgICAvLyAgIGhhcmQ6IG5ldyBVaW50NjQoaGFyZCksCiAgICAvLyAgIGxvY2s6IG5ldyBVaW50NjQobG9jayksCiAgICAvLyAgIHRpbWVzdGFtcCwKICAgIC8vIH0pCiAgICBkaWcgMTQKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGRpZyA5CiAgICBjb25jYXQKICAgIHN3YXAKICAgIGludGNfMyAvLyAzMgogICAgKgogICAgZGlnIDEyCiAgICBzd2FwCiAgICB1bmNvdmVyIDIKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCgpjcmVhdGVIZWFydGJlYXRfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmNyZWF0ZUhlYXJ0YmVhdEAxOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDg1CiAgICAvLyBjcmVhdGVIZWFydGJlYXQoYWRkcmVzczogQWNjb3VudCwgYXNzZXQ6IHVpbnQ2NCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKY3JlYXRlSGVhcnRiZWF0X3Rlcm5hcnlfZmFsc2VAMTU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjUzMAogICAgLy8gY29uc3QgaW5kZXhUb01vZGlmeTogdWludDY0ID0gaSA9PT0gMyA/IDAgOiBpICsgMQogICAgZGlnIDUKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBiIGNyZWF0ZUhlYXJ0YmVhdF90ZXJuYXJ5X21lcmdlQDE2CgpjcmVhdGVIZWFydGJlYXRfYWZ0ZXJfaWZfZWxzZUAxNzoKICAgIGRpZyA0CiAgICBidXJ5IDYKICAgIGIgY3JlYXRlSGVhcnRiZWF0X3doaWxlX3RvcEAxMAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuc29mdENoZWNrW3JvdXRpbmddKCkgLT4gdm9pZDoKc29mdENoZWNrOgogICAgYnl0ZWNfMyAvLyAiIgogICAgZHVwbiA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjU0MgogICAgLy8gc29mdENoZWNrKGFkZHJlc3M6IEFjY291bnQsIGFzc2V0OiB1aW50NjQpOiBTdGFrZUNoZWNrIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cG4gMgogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjU0MwogICAgLy8gY29uc3Qgc2sgPSB7IGFkZHJlc3MsIGFzc2V0LCB0eXBlOiBTVEFLSU5HX1RZUEVfU09GVCB9CiAgICBpdG9iCiAgICBjb25jYXQKICAgIGJ5dGVjIDE0IC8vIDB4MTQKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1NDQKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnN0YWtlcyhzaykuZXhpc3RzLCBFUlJfU1RBS0VfRE9FU05UX0VYSVNUKQogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIGRpZyAxCiAgICBleHRyYWN0IDMyIDgKICAgIHVuY292ZXIgMgogICAgZXh0cmFjdCA0MCAxCiAgICBjb3ZlciAyCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4MQogICAgLy8gc3Rha2VzID0gQm94TWFwPFN0YWtlS2V5LCBTdGFrZT4oeyBrZXlQcmVmaXg6IFN0YWtpbmdCb3hQcmVmaXhTdGFrZXMgfSkKICAgIGJ5dGVjXzAgLy8gInMiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1NDQKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnN0YWtlcyhzaykuZXhpc3RzLCBFUlJfU1RBS0VfRE9FU05UX0VYSVNUKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogc29mdENoZWNrX2FmdGVyX2Fzc2VydEAzCiAgICBwdXNoYnl0ZXMgIkVSUjpTTkVYIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOlNORVgKCnNvZnRDaGVja19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTQ2CiAgICAvLyBjb25zdCB7IGFtb3VudCB9ID0gdGhpcy5zdGFrZXMoc2spLnZhbHVlCiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGJ1cnkgOAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1NDcKICAgIC8vIGNvbnN0IGxhc3RVcGRhdGUgPSBHbG9iYWwubGF0ZXN0VGltZXN0YW1wCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBidXJ5IDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTQ5CiAgICAvLyBpZiAoYXNzZXQgPT09IDApIHsKICAgIGRpZyAxCiAgICBibnogc29mdENoZWNrX2FmdGVyX2lmX2Vsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1NTAKICAgIC8vIGNvbnN0IHZhbGlkID0gYWRkcmVzcy5iYWxhbmNlID49IGFtb3VudAogICAgZGlnIDIKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0QmFsYW5jZQogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICBkaWcgOAogICAgPj0KICAgIGR1cAogICAgYnVyeSA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjU1MQogICAgLy8gaWYgKCF2YWxpZCkgewogICAgYm56IHNvZnRDaGVja19hZnRlcl9pZl9lbHNlQDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTUzCiAgICAvLyBhbW91bnQ6IGFkZHJlc3MuYmFsYW5jZSwKICAgIGRpZyAyCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdEJhbGFuY2UKICAgIGFzc2VydCAvLyBhY2NvdW50IGZ1bmRlZAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1NTItNTU2CiAgICAvLyB0aGlzLnN0YWtlcyhzaykudmFsdWUgPSB7CiAgICAvLyAgIGFtb3VudDogYWRkcmVzcy5iYWxhbmNlLAogICAgLy8gICBsYXN0VXBkYXRlLAogICAgLy8gICBleHBpcmF0aW9uOiAwLAogICAgLy8gfQogICAgaXRvYgogICAgZGlnIDYKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1NTUKICAgIC8vIGV4cGlyYXRpb246IDAsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1NTItNTU2CiAgICAvLyB0aGlzLnN0YWtlcyhzaykudmFsdWUgPSB7CiAgICAvLyAgIGFtb3VudDogYWRkcmVzcy5iYWxhbmNlLAogICAgLy8gICBsYXN0VXBkYXRlLAogICAgLy8gICBleHBpcmF0aW9uOiAwLAogICAgLy8gfQogICAgaXRvYgogICAgY29uY2F0CiAgICBkaWcgMQogICAgc3dhcAogICAgYm94X3B1dAoKc29mdENoZWNrX2FmdGVyX2lmX2Vsc2VANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTU4CiAgICAvLyByZXR1cm4geyB2YWxpZCwgYmFsYW5jZTogYWRkcmVzcy5iYWxhbmNlIH0KICAgIGRpZyAyCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdEJhbGFuY2UKICAgIGFzc2VydCAvLyBhY2NvdW50IGZ1bmRlZAogICAgYnl0ZWMgMTkgLy8gMHgwMAogICAgaW50Y18wIC8vIDAKICAgIGRpZyA3CiAgICBzZXRiaXQKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAoKc29mdENoZWNrX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5zb2Z0Q2hlY2tAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjU0MgogICAgLy8gc29mdENoZWNrKGFkZHJlc3M6IEFjY291bnQsIGFzc2V0OiB1aW50NjQpOiBTdGFrZUNoZWNrIHsKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCnNvZnRDaGVja19hZnRlcl9pZl9lbHNlQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjU2MQogICAgLy8gY29uc3QgW2hvbGRpbmdBbW91bnQsIG9wdGVkSW5dID0gQXNzZXRIb2xkaW5nLmFzc2V0QmFsYW5jZShhZGRyZXNzLCBhc3NldCkKICAgIGRpZyAyCiAgICBkaWcgMgogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBzd2FwCiAgICBidXJ5IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTYyCiAgICAvLyBsb2dnZWRBc3NlcnQob3B0ZWRJbiwgRVJSX05PVF9PUFRFRF9JTikKICAgIGJueiBzb2Z0Q2hlY2tfYWZ0ZXJfYXNzZXJ0QDkKICAgIGJ5dGVjIDEzIC8vICJFUlI6Tk9QVCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOT1BUCgpzb2Z0Q2hlY2tfYWZ0ZXJfYXNzZXJ0QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjU2MwogICAgLy8gY29uc3QgdmFsaWQgPSBob2xkaW5nQW1vdW50ID49IGFtb3VudAogICAgZGlnIDYKICAgIGRpZyA4CiAgICA+PQogICAgZHVwCiAgICBidXJ5IDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTY0CiAgICAvLyBpZiAoIXZhbGlkKSB7CiAgICBibnogc29mdENoZWNrX2FmdGVyX2lmX2Vsc2VAMTEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTY1LTU2OQogICAgLy8gdGhpcy5zdGFrZXMoc2spLnZhbHVlID0gewogICAgLy8gICBhbW91bnQ6IGhvbGRpbmdBbW91bnQsCiAgICAvLyAgIGxhc3RVcGRhdGUsCiAgICAvLyAgIGV4cGlyYXRpb246IDAsCiAgICAvLyB9CiAgICBkaWcgNgogICAgaXRvYgogICAgZGlnIDYKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1NjgKICAgIC8vIGV4cGlyYXRpb246IDAsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1NjUtNTY5CiAgICAvLyB0aGlzLnN0YWtlcyhzaykudmFsdWUgPSB7CiAgICAvLyAgIGFtb3VudDogaG9sZGluZ0Ftb3VudCwKICAgIC8vICAgbGFzdFVwZGF0ZSwKICAgIC8vICAgZXhwaXJhdGlvbjogMCwKICAgIC8vIH0KICAgIGl0b2IKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIHN3YXAKICAgIGJveF9wdXQKCnNvZnRDaGVja19hZnRlcl9pZl9lbHNlQDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1NzIKICAgIC8vIHJldHVybiB7IHZhbGlkLCBiYWxhbmNlOiBob2xkaW5nQW1vdW50IH0KICAgIGJ5dGVjIDE5IC8vIDB4MDAKICAgIGludGNfMCAvLyAwCiAgICBkaWcgNQogICAgc2V0Yml0CiAgICBkaWcgNwogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjU0MgogICAgLy8gc29mdENoZWNrKGFkZHJlc3M6IEFjY291bnQsIGFzc2V0OiB1aW50NjQpOiBTdGFrZUNoZWNrIHsKICAgIGIgc29mdENoZWNrX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5zb2Z0Q2hlY2tAMTIKCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLnVwZGF0ZVNldHRpbmdzW3JvdXRpbmddKCkgLT4gdm9pZDoKdXBkYXRlU2V0dGluZ3M6CiAgICBpbnRjXzAgLy8gMAogICAgYnl0ZWNfMyAvLyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1NzUKICAgIC8vIHVwZGF0ZVNldHRpbmdzKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYXNzZXQ6IHVpbnQ2NCwgdmFsdWU6IHVpbnQ2NCk6IHZvaWQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTc2CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gQXNzZXQoYXNzZXQpLmNyZWF0b3IsIEVSUl9OT1RfQVNTRVRfQ1JFQVRPUikKICAgIHR4biBTZW5kZXIKICAgIHN3YXAKICAgIGFzc2V0X3BhcmFtc19nZXQgQXNzZXRDcmVhdG9yCiAgICBhc3NlcnQgLy8gYXNzZXQgZXhpc3RzCiAgICA9PQogICAgYm56IHVwZGF0ZVNldHRpbmdzX2FmdGVyX2Fzc2VydEAzCiAgICBwdXNoYnl0ZXMgIkVSUjpOQUNSIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5BQ1IKCnVwZGF0ZVNldHRpbmdzX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1NzcKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgRVJSX0lOVkFMSURfUEFZTUVOVCkKICAgIGRpZyAyCiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogdXBkYXRlU2V0dGluZ3NfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjIDUgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCnVwZGF0ZVNldHRpbmdzX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1NzkKICAgIC8vIHBheW1lbnQuYW1vdW50ID09PSAodGhpcy5zZXR0aW5ncyhhc3NldCkuZXhpc3RzID8gMCA6IHRoaXMubWJyKCkuc2V0dGluZ3MpLAogICAgZGlnIDIKICAgIGd0eG5zIEFtb3VudAogICAgYnVyeSA0CiAgICBkaWcgMQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo5MAogICAgLy8gc2V0dGluZ3MgPSBCb3hNYXA8dWludDY0LCB1aW50NjQ+KHsga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4U2V0dGluZ3MgfSkKICAgIHB1c2hieXRlcyAiZSIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBidXJ5IDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTc5CiAgICAvLyBwYXltZW50LmFtb3VudCA9PT0gKHRoaXMuc2V0dGluZ3MoYXNzZXQpLmV4aXN0cyA/IDAgOiB0aGlzLm1icigpLnNldHRpbmdzKSwKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogdXBkYXRlU2V0dGluZ3NfdGVybmFyeV9mYWxzZUA3CiAgICBpbnRjXzAgLy8gMAoKdXBkYXRlU2V0dGluZ3NfdGVybmFyeV9tZXJnZUA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1NzkKICAgIC8vIHBheW1lbnQuYW1vdW50ID09PSAodGhpcy5zZXR0aW5ncyhhc3NldCkuZXhpc3RzID8gMCA6IHRoaXMubWJyKCkuc2V0dGluZ3MpLAogICAgZGlnIDQKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjU3OC01ODEKICAgIC8vIGxvZ2dlZEFzc2VydCgKICAgIC8vICAgcGF5bWVudC5hbW91bnQgPT09ICh0aGlzLnNldHRpbmdzKGFzc2V0KS5leGlzdHMgPyAwIDogdGhpcy5tYnIoKS5zZXR0aW5ncyksCiAgICAvLyAgIEVSUl9JTlZBTElEX1BBWU1FTlQKICAgIC8vICkKICAgIGJueiB1cGRhdGVTZXR0aW5nc19hZnRlcl9hc3NlcnRAMTAKICAgIGJ5dGVjIDUgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCnVwZGF0ZVNldHRpbmdzX2FmdGVyX2Fzc2VydEAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTgzCiAgICAvLyB0aGlzLnNldHRpbmdzKGFzc2V0KS52YWx1ZSA9IHZhbHVlCiAgICBkdXAKICAgIGl0b2IKICAgIGRpZyA1CiAgICBzd2FwCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjU3NQogICAgLy8gdXBkYXRlU2V0dGluZ3MocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBhc3NldDogdWludDY0LCB2YWx1ZTogdWludDY0KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgp1cGRhdGVTZXR0aW5nc190ZXJuYXJ5X2ZhbHNlQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjU3OQogICAgLy8gcGF5bWVudC5hbW91bnQgPT09ICh0aGlzLnNldHRpbmdzKGFzc2V0KS5leGlzdHMgPyAwIDogdGhpcy5tYnIoKS5zZXR0aW5ncyksCiAgICBwdXNoaW50IDkzMDAKICAgIGIgdXBkYXRlU2V0dGluZ3NfdGVybmFyeV9tZXJnZUA4CgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5vcHRJbkNvc3Rbcm91dGluZ10oKSAtPiB2b2lkOgpvcHRJbkNvc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjU5MAogICAgLy8gcmV0dXJuIHRvdGFsc01CUiArIEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgcHVzaGludCAxMjUwMAogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjU4OAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBpdG9iCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5zdGFrZUNvc3Rbcm91dGluZ10oKSAtPiB2b2lkOgpzdGFrZUNvc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjU5MwogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50OAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1OTUKICAgIC8vIGNvbnN0IHsgc3Rha2VzLCBoZWFydGJlYXRzIH0gPSB0aGlzLm1icigpCiAgICBpbnRjIDQgLy8gMjg5MDAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTk2CiAgICAvLyBjb25zdCBzazogU3Rha2VLZXkgPSB7IGFkZHJlc3M6IFR4bi5zZW5kZXIsIGFzc2V0LCB0eXBlIH0KICAgIHR4biBTZW5kZXIKICAgIHVuY292ZXIgMgogICAgaXRvYgogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODEKICAgIC8vIHN0YWtlcyA9IEJveE1hcDxTdGFrZUtleSwgU3Rha2U+KHsga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4U3Rha2VzIH0pCiAgICBieXRlY18wIC8vICJzIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjU5NwogICAgLy8gY29uc3QgaXNVcGRhdGUgPSB0aGlzLnN0YWtlcyhzaykuZXhpc3RzCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTk5CiAgICAvLyBpZiAoaXNVcGRhdGUpIHsKICAgIGJ6IHN0YWtlQ29zdF9hZnRlcl9pZl9lbHNlQDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NjAwCiAgICAvLyByZXR1cm4gMAogICAgaW50Y18wIC8vIDAKCnN0YWtlQ29zdF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuc3Rha2VDb3N0QDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjU5MwogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBpdG9iCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpzdGFrZUNvc3RfYWZ0ZXJfaWZfZWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2MDMKICAgIC8vIGlmICh0eXBlID09PSBTVEFLSU5HX1RZUEVfSEVBUlRCRUFUKSB7CiAgICBkaWcgMQogICAgYnl0ZWMgOSAvLyAweDBhCiAgICA9PQogICAgYnogc3Rha2VDb3N0X2FmdGVyX2lmX2Vsc2VANQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2MDQKICAgIC8vIHJldHVybiBzdGFrZXMgKyBoZWFydGJlYXRzCiAgICBpbnRjIDUgLy8gOTkwMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTkzCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGIgc3Rha2VDb3N0X2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5zdGFrZUNvc3RANgoKc3Rha2VDb3N0X2FmdGVyX2lmX2Vsc2VANToKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1OTMKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYiBzdGFrZUNvc3RfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLnN0YWtlQ29zdEA2CgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5nZXRUaW1lTGVmdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmdldFRpbWVMZWZ0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2MTAKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjYxMgogICAgLy8gY29uc3Qgc2sgPSB7IGFkZHJlc3MsIGFzc2V0LCB0eXBlOiBTVEFLSU5HX1RZUEVfTE9DSyB9CiAgICBpdG9iCiAgICBjb25jYXQKICAgIGJ5dGVjXzIgLy8gMHgyOAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjYxMwogICAgLy8gaWYgKCF0aGlzLnN0YWtlcyhzaykuZXhpc3RzIHx8IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPj0gdGhpcy5zdGFrZXMoc2spLnZhbHVlLmV4cGlyYXRpb24pIHsKICAgIGR1cAogICAgZXh0cmFjdCAwIDMyCiAgICBkaWcgMQogICAgZXh0cmFjdCAzMiA4CiAgICB1bmNvdmVyIDIKICAgIGV4dHJhY3QgNDAgMQogICAgY292ZXIgMgogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODEKICAgIC8vIHN0YWtlcyA9IEJveE1hcDxTdGFrZUtleSwgU3Rha2U+KHsga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4U3Rha2VzIH0pCiAgICBieXRlY18wIC8vICJzIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NjEzCiAgICAvLyBpZiAoIXRoaXMuc3Rha2VzKHNrKS5leGlzdHMgfHwgR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+PSB0aGlzLnN0YWtlcyhzaykudmFsdWUuZXhwaXJhdGlvbikgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBnZXRUaW1lTGVmdF9pZl9ib2R5QDMKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIGRpZyAxCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgID49CiAgICBieiBnZXRUaW1lTGVmdF9hZnRlcl9pZl9lbHNlQDQKCmdldFRpbWVMZWZ0X2lmX2JvZHlAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NjE0CiAgICAvLyByZXR1cm4gMAogICAgaW50Y18wIC8vIDAKCmdldFRpbWVMZWZ0X2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5nZXRUaW1lTGVmdEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2MTAKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgaXRvYgogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKZ2V0VGltZUxlZnRfYWZ0ZXJfaWZfZWxzZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2MTcKICAgIC8vIHJldHVybiB0aGlzLnN0YWtlcyhzaykudmFsdWUuZXhwaXJhdGlvbiAtIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjYxMAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBiIGdldFRpbWVMZWZ0X2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5nZXRUaW1lTGVmdEA1CgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5tdXN0R2V0VGltZUxlZnRbcm91dGluZ10oKSAtPiB2b2lkOgptdXN0R2V0VGltZUxlZnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjYyMAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NjIyCiAgICAvLyBjb25zdCBzayA9IHsgYWRkcmVzcywgYXNzZXQsIHR5cGU6IFNUQUtJTkdfVFlQRV9MT0NLIH0KICAgIGl0b2IKICAgIGNvbmNhdAogICAgYnl0ZWNfMiAvLyAweDI4CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NjIzCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zdGFrZXMoc2spLmV4aXN0cywgRVJSX05PX0xPQ0spCiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgZGlnIDEKICAgIGV4dHJhY3QgMzIgOAogICAgdW5jb3ZlciAyCiAgICBleHRyYWN0IDQwIDEKICAgIGNvdmVyIDIKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjgxCiAgICAvLyBzdGFrZXMgPSBCb3hNYXA8U3Rha2VLZXksIFN0YWtlPih7IGtleVByZWZpeDogU3Rha2luZ0JveFByZWZpeFN0YWtlcyB9KQogICAgYnl0ZWNfMCAvLyAicyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjYyMwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc3Rha2VzKHNrKS5leGlzdHMsIEVSUl9OT19MT0NLKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogbXVzdEdldFRpbWVMZWZ0X2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAxNyAvLyAiRVJSOk5MQ0siCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TkxDSwoKbXVzdEdldFRpbWVMZWZ0X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2MjQKICAgIC8vIGxvZ2dlZEFzc2VydChHbG9iYWwubGF0ZXN0VGltZXN0YW1wIDwgdGhpcy5zdGFrZXMoc2spLnZhbHVlLmV4cGlyYXRpb24sIEVSUl9MT0NLRUQpCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBkaWcgMQogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICA8CiAgICBibnogbXVzdEdldFRpbWVMZWZ0X2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyAyNSAvLyAiRVJSOkxPQ0siCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TE9DSwoKbXVzdEdldFRpbWVMZWZ0X2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2MjUKICAgIC8vIHJldHVybiB0aGlzLnN0YWtlcyhzaykudmFsdWUuZXhwaXJhdGlvbiAtIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjYyMAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBpdG9iCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5nZXRJbmZvW3JvdXRpbmddKCkgLT4gdm9pZDoKZ2V0SW5mbzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NjI4CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgOQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3N0YWtpbmcvdHlwZXMudHM6OlN0YWtlSW5mbwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2MzAKICAgIC8vIHJldHVybiB0aGlzLmdldEluZm9PckVtcHR5KGFkZHJlc3MsIHN0YWtlKQogICAgY2FsbHN1YiBnZXRJbmZvT3JFbXB0eQogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjYyOAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5tdXN0R2V0SW5mb1tyb3V0aW5nXSgpIC0+IHZvaWQ6Cm11c3RHZXRJbmZvOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2MzMKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwbiAyCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDkKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL3R5cGVzLnRzOjpTdGFrZUluZm8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NjM1CiAgICAvLyBjb25zdCBzayA9IHsgYWRkcmVzcywgLi4uc3Rha2UgfQogICAgZHVwCiAgICBleHRyYWN0IDAgOAogICAgc3dhcAogICAgZXh0cmFjdCA4IDEKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjYzNgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc3Rha2VzKHNrKS5leGlzdHMsIEVSUl9OT19MT0NLKQogICAgZHVwCiAgICBleHRyYWN0IDkgMzIKICAgIGRpZyAxCiAgICBleHRyYWN0IDAgOAogICAgdW5jb3ZlciAyCiAgICBleHRyYWN0IDggMQogICAgY292ZXIgMgogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODEKICAgIC8vIHN0YWtlcyA9IEJveE1hcDxTdGFrZUtleSwgU3Rha2U+KHsga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4U3Rha2VzIH0pCiAgICBieXRlY18wIC8vICJzIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NjM2CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zdGFrZXMoc2spLmV4aXN0cywgRVJSX05PX0xPQ0spCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBtdXN0R2V0SW5mb19hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMTcgLy8gIkVSUjpOTENLIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5MQ0sKCm11c3RHZXRJbmZvX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2MzgKICAgIC8vIHJldHVybiB0aGlzLnN5bmNTb2Z0U3Rha2VJbmZvKGFkZHJlc3MsIHN0YWtlLCB0aGlzLnN0YWtlcyhzaykudmFsdWUpCiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBkaWcgMwogICAgZGlnIDMKICAgIHVuY292ZXIgMgogICAgY2FsbHN1YiBzeW5jU29mdFN0YWtlSW5mbwogICAgcG9wbiAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjYzMwogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5nZXRJbmZvQXRMZWFzdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmdldEluZm9BdExlYXN0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2NDEKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXBuIDIKICAgIGxlbgogICAgcHVzaGludCA5CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvc3Rha2luZy90eXBlcy50czo6U3Rha2VJbmZvCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjY0MwogICAgLy8gY29uc3QgcmVzdWx0czogU3Rha2VbXSA9IFtdCiAgICBieXRlYyAxNSAvLyAweDAwMDAKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NjQ1CiAgICAvLyBpZiAoc3Rha2UudHlwZSA9PT0gU1RBS0lOR19UWVBFX1NPRlQpIHsKICAgIGV4dHJhY3QgOCAxCiAgICBkdXAKICAgIGJ5dGVjIDE0IC8vIDB4MTQKICAgID09CiAgICBkdXAKICAgIGJ6IGdldEluZm9BdExlYXN0X2FmdGVyX2lmX2Vsc2VAMwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2NDYKICAgIC8vIHJlc3VsdHMucHVzaCh0aGlzLmdldEluZm9PckVtcHR5KGFkZHJlc3MsIHsgYXNzZXQ6IHN0YWtlLmFzc2V0LCB0eXBlOiBTVEFLSU5HX1RZUEVfU09GVCB9KSkKICAgIGRpZyAzCiAgICBleHRyYWN0IDAgOAogICAgYnl0ZWMgMTQgLy8gMHgxNAogICAgY29uY2F0CiAgICBkaWcgNQogICAgc3dhcAogICAgY2FsbHN1YiBnZXRJbmZvT3JFbXB0eQogICAgcG9wCiAgICBwdXNoYnl0ZXMgMHgwMDAxCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJ1cnkgMwoKZ2V0SW5mb0F0TGVhc3RfYWZ0ZXJfaWZfZWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2NDkKICAgIC8vIGlmIChzdGFrZS50eXBlID09PSBTVEFLSU5HX1RZUEVfU09GVCB8fCBzdGFrZS50eXBlID09PSBTVEFLSU5HX1RZUEVfSEFSRCkgewogICAgZHVwCiAgICBibnogZ2V0SW5mb0F0TGVhc3RfaWZfYm9keUA1CiAgICBkaWcgMQogICAgYnl0ZWMgNCAvLyAweDFlCiAgICA9PQogICAgYnogZ2V0SW5mb0F0TGVhc3RfYWZ0ZXJfaWZfZWxzZUA2CgpnZXRJbmZvQXRMZWFzdF9pZl9ib2R5QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjY1MAogICAgLy8gcmVzdWx0cy5wdXNoKHRoaXMuZ2V0SW5mb09yRW1wdHkoYWRkcmVzcywgeyBhc3NldDogc3Rha2UuYXNzZXQsIHR5cGU6IFNUQUtJTkdfVFlQRV9IQVJEIH0pKQogICAgZGlnIDMKICAgIGV4dHJhY3QgMCA4CiAgICBieXRlYyA0IC8vIDB4MWUKICAgIGNvbmNhdAogICAgZGlnIDUKICAgIHN3YXAKICAgIGNhbGxzdWIgZ2V0SW5mb09yRW1wdHkKICAgIHBvcAogICAgZGlnIDMKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjY1MAogICAgLy8gcmVzdWx0cy5wdXNoKHRoaXMuZ2V0SW5mb09yRW1wdHkoYWRkcmVzcywgeyBhc3NldDogc3Rha2UuYXNzZXQsIHR5cGU6IFNUQUtJTkdfVFlQRV9IQVJEIH0pKQogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGl0b2IKICAgIGV4dHJhY3QgNiAwCiAgICByZXBsYWNlMiAwCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJ1cnkgMwoKZ2V0SW5mb0F0TGVhc3RfYWZ0ZXJfaWZfZWxzZUA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2NTQtNjU1CiAgICAvLyBzdGFrZS50eXBlID09PSBTVEFLSU5HX1RZUEVfU09GVCB8fAogICAgLy8gc3Rha2UudHlwZSA9PT0gU1RBS0lOR19UWVBFX0hBUkQgfHwKICAgIGR1cAogICAgYm56IGdldEluZm9BdExlYXN0X2lmX2JvZHlAOQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2NTUKICAgIC8vIHN0YWtlLnR5cGUgPT09IFNUQUtJTkdfVFlQRV9IQVJEIHx8CiAgICBkaWcgMQogICAgYnl0ZWMgNCAvLyAweDFlCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2NTQtNjU1CiAgICAvLyBzdGFrZS50eXBlID09PSBTVEFLSU5HX1RZUEVfU09GVCB8fAogICAgLy8gc3Rha2UudHlwZSA9PT0gU1RBS0lOR19UWVBFX0hBUkQgfHwKICAgIGJueiBnZXRJbmZvQXRMZWFzdF9pZl9ib2R5QDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NjU2CiAgICAvLyBzdGFrZS50eXBlID09PSBTVEFLSU5HX1RZUEVfTE9DSwogICAgZGlnIDEKICAgIGJ5dGVjXzIgLy8gMHgyOAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NjU0LTY1NgogICAgLy8gc3Rha2UudHlwZSA9PT0gU1RBS0lOR19UWVBFX1NPRlQgfHwKICAgIC8vIHN0YWtlLnR5cGUgPT09IFNUQUtJTkdfVFlQRV9IQVJEIHx8CiAgICAvLyBzdGFrZS50eXBlID09PSBTVEFLSU5HX1RZUEVfTE9DSwogICAgYnogZ2V0SW5mb0F0TGVhc3RfYWZ0ZXJfaWZfZWxzZUAxMAoKZ2V0SW5mb0F0TGVhc3RfaWZfYm9keUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2NTgKICAgIC8vIHJlc3VsdHMucHVzaCh0aGlzLmdldEluZm9PckVtcHR5KGFkZHJlc3MsIHsgYXNzZXQ6IHN0YWtlLmFzc2V0LCB0eXBlOiBTVEFLSU5HX1RZUEVfTE9DSyB9KSkKICAgIGRpZyAzCiAgICBleHRyYWN0IDAgOAogICAgYnl0ZWNfMiAvLyAweDI4CiAgICBjb25jYXQKICAgIGRpZyA1CiAgICBzd2FwCiAgICBjYWxsc3ViIGdldEluZm9PckVtcHR5CiAgICBwb3AKICAgIGRpZyAzCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2NTgKICAgIC8vIHJlc3VsdHMucHVzaCh0aGlzLmdldEluZm9PckVtcHR5KGFkZHJlc3MsIHsgYXNzZXQ6IHN0YWtlLmFzc2V0LCB0eXBlOiBTVEFLSU5HX1RZUEVfTE9DSyB9KSkKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMAogICAgcmVwbGFjZTIgMAogICAgc3dhcAogICAgY29uY2F0CiAgICBidXJ5IDMKCmdldEluZm9BdExlYXN0X2FmdGVyX2lmX2Vsc2VAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjY0MQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIGRpZyAzCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuZ2V0RXNjcm93SW5mb1tyb3V0aW5nXSgpIC0+IHZvaWQ6CmdldEVzY3Jvd0luZm86CiAgICBpbnRjXzAgLy8gMAogICAgYnl0ZWNfMyAvLyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2NjQKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjY2NgogICAgLy8gY29uc3Qgc2sgPSB7IGFkZHJlc3MsIGFzc2V0LCB0eXBlOiBTVEFLSU5HX1RZUEVfSEFSRCB9CiAgICBpdG9iCiAgICBjb25jYXQKICAgIGR1cAogICAgYnl0ZWMgNCAvLyAweDFlCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NjY3CiAgICAvLyBjb25zdCBsayA9IHsgYWRkcmVzcywgYXNzZXQsIHR5cGU6IFNUQUtJTkdfVFlQRV9MT0NLIH0KICAgIHN3YXAKICAgIGJ5dGVjXzIgLy8gMHgyOAogICAgY29uY2F0CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjY2OQogICAgLy8gbGV0IGhhcmQ6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjY3MAogICAgLy8gaWYgKHRoaXMuc3Rha2VzKHNrKS5leGlzdHMpIHsKICAgIGR1cAogICAgZXh0cmFjdCAwIDMyCiAgICBkaWcgMQogICAgZXh0cmFjdCAzMiA4CiAgICB1bmNvdmVyIDIKICAgIGV4dHJhY3QgNDAgMQogICAgY292ZXIgMgogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODEKICAgIC8vIHN0YWtlcyA9IEJveE1hcDxTdGFrZUtleSwgU3Rha2U+KHsga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4U3Rha2VzIH0pCiAgICBieXRlY18wIC8vICJzIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NjcwCiAgICAvLyBpZiAodGhpcy5zdGFrZXMoc2spLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBnZXRFc2Nyb3dJbmZvX2FmdGVyX2lmX2Vsc2VAMwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2NzEKICAgIC8vIGhhcmQgPSB0aGlzLnN0YWtlcyhzaykudmFsdWUuYW1vdW50CiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGJ1cnkgMgoKZ2V0RXNjcm93SW5mb19hZnRlcl9pZl9lbHNlQDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjY3NAogICAgLy8gbGV0IGxvY2s6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBidXJ5IDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6Njc1CiAgICAvLyBpZiAodGhpcy5zdGFrZXMobGspLmV4aXN0cykgewogICAgZGlnIDIKICAgIGR1cAogICAgZXh0cmFjdCAwIDMyCiAgICBkaWcgMQogICAgZXh0cmFjdCAzMiA4CiAgICB1bmNvdmVyIDIKICAgIGV4dHJhY3QgNDAgMQogICAgY292ZXIgMgogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODEKICAgIC8vIHN0YWtlcyA9IEJveE1hcDxTdGFrZUtleSwgU3Rha2U+KHsga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4U3Rha2VzIH0pCiAgICBieXRlY18wIC8vICJzIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGJ1cnkgNgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2NzUKICAgIC8vIGlmICh0aGlzLnN0YWtlcyhsaykuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGdldEVzY3Jvd0luZm9fYWZ0ZXJfaWZfZWxzZUA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjY3NgogICAgLy8gbG9jayA9IHRoaXMuc3Rha2VzKGxrKS52YWx1ZS5hbW91bnQKICAgIGRpZyA0CiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBidXJ5IDQKCmdldEVzY3Jvd0luZm9fYWZ0ZXJfaWZfZWxzZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2NzkKICAgIC8vIHJldHVybiB7IGhhcmQsIGxvY2sgfQogICAgZGlnIDEKICAgIGl0b2IKICAgIGRpZyA0CiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NjY0CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmdldEhlYXJ0YmVhdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmdldEhlYXJ0YmVhdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NjgyCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2ODQKICAgIC8vIGNvbnN0IGhiayA9IHsgYWRkcmVzcywgYXNzZXQgfQogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjY4NQogICAgLy8gaWYgKCF0aGlzLmhlYXJ0YmVhdHMoaGJrKS5leGlzdHMpIHsKICAgIGR1cAogICAgZXh0cmFjdCAwIDMyCiAgICBzd2FwCiAgICBleHRyYWN0IDMyIDgKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4NC04NgogICAgLy8gaGVhcnRiZWF0cyA9IEJveE1hcDxIZWFydGJlYXRLZXksIGFyYzQuU3RhdGljQXJyYXk8YXJjNEhlYXJ0YmVhdCwgND4+KHsKICAgIC8vICAga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4SGVhcnRiZWF0cywKICAgIC8vIH0pCiAgICBieXRlYyA3IC8vICJoIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6Njg1CiAgICAvLyBpZiAoIXRoaXMuaGVhcnRiZWF0cyhoYmspLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogZ2V0SGVhcnRiZWF0X2FmdGVyX2lmX2Vsc2VAMwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2ODYtNjkxCiAgICAvLyByZXR1cm4gbmV3IGFyYzQuU3RhdGljQXJyYXk8YXJjNEhlYXJ0YmVhdCwgND4oCiAgICAvLyAgIGVtcHR5SGVhcnRiZWF0KCksCiAgICAvLyAgIGVtcHR5SGVhcnRiZWF0KCksCiAgICAvLyAgIGVtcHR5SGVhcnRiZWF0KCksCiAgICAvLyAgIGVtcHR5SGVhcnRiZWF0KCkKICAgIC8vICkKICAgIHB1c2hieXRlcyAweDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAKCmdldEhlYXJ0YmVhdF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuZ2V0SGVhcnRiZWF0QDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjY4MgogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpnZXRIZWFydGJlYXRfYWZ0ZXJfaWZfZWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2OTQKICAgIC8vIHJldHVybiB0aGlzLmhlYXJ0YmVhdHMoaGJrKS52YWx1ZQogICAgZHVwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2ODIKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYiBnZXRIZWFydGJlYXRfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmdldEhlYXJ0YmVhdEA0CgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5tdXN0R2V0SGVhcnRiZWF0W3JvdXRpbmddKCkgLT4gdm9pZDoKbXVzdEdldEhlYXJ0YmVhdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6Njk3CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2OTkKICAgIC8vIGNvbnN0IGhiayA9IHsgYWRkcmVzcywgYXNzZXQgfQogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjcwMAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuaGVhcnRiZWF0cyhoYmspLmV4aXN0cywgRVJSX0hFQVJCRUFUX05PVF9GT1VORCkKICAgIGR1cAogICAgZXh0cmFjdCAwIDMyCiAgICBzd2FwCiAgICBleHRyYWN0IDMyIDgKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4NC04NgogICAgLy8gaGVhcnRiZWF0cyA9IEJveE1hcDxIZWFydGJlYXRLZXksIGFyYzQuU3RhdGljQXJyYXk8YXJjNEhlYXJ0YmVhdCwgND4+KHsKICAgIC8vICAga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4SGVhcnRiZWF0cywKICAgIC8vIH0pCiAgICBieXRlYyA3IC8vICJoIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NzAwCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5oZWFydGJlYXRzKGhiaykuZXhpc3RzLCBFUlJfSEVBUkJFQVRfTk9UX0ZPVU5EKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogbXVzdEdldEhlYXJ0YmVhdF9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMTggLy8gIkVSUjpIQk5GIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkhCTkYKCm11c3RHZXRIZWFydGJlYXRfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjcwMQogICAgLy8gcmV0dXJuIHRoaXMuaGVhcnRiZWF0cyhoYmspLnZhbHVlCiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjY5NwogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5nZXRIZWFydGJlYXRBdmVyYWdlW3JvdXRpbmddKCkgLT4gdm9pZDoKZ2V0SGVhcnRiZWF0QXZlcmFnZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NzA0CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmJvb2wKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5nZXRIZWFydGJlYXRBdmVyYWdlCiAgICBpdG9iCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5tdXN0R2V0SGVhcnRiZWF0QXZlcmFnZVtyb3V0aW5nXSgpIC0+IHZvaWQ6Cm11c3RHZXRIZWFydGJlYXRBdmVyYWdlOgogICAgaW50Y18wIC8vIDAKICAgIGR1cAogICAgYnl0ZWNfMyAvLyAiIgogICAgZHVwbiAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjczNAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5ib29sCiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Yml0CiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjczNgogICAgLy8gY29uc3QgaGJrID0geyBhZGRyZXNzLCBhc3NldCB9CiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NzM3CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5oZWFydGJlYXRzKGhiaykuZXhpc3RzLCBFUlJfSEVBUkJFQVRfTk9UX0ZPVU5EKQogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIHN3YXAKICAgIGV4dHJhY3QgMzIgOAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjg0LTg2CiAgICAvLyBoZWFydGJlYXRzID0gQm94TWFwPEhlYXJ0YmVhdEtleSwgYXJjNC5TdGF0aWNBcnJheTxhcmM0SGVhcnRiZWF0LCA0Pj4oewogICAgLy8gICBrZXlQcmVmaXg6IFN0YWtpbmdCb3hQcmVmaXhIZWFydGJlYXRzLAogICAgLy8gfSkKICAgIGJ5dGVjIDcgLy8gImgiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3MzcKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmhlYXJ0YmVhdHMoaGJrKS5leGlzdHMsIEVSUl9IRUFSQkVBVF9OT1RfRk9VTkQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBtdXN0R2V0SGVhcnRiZWF0QXZlcmFnZV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMTggLy8gIkVSUjpIQk5GIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkhCTkYKCm11c3RHZXRIZWFydGJlYXRBdmVyYWdlX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3MzkKICAgIC8vIGNvbnN0IGhlYXJ0YmVhdHMgPSBjbG9uZSh0aGlzLmhlYXJ0YmVhdHMoaGJrKS52YWx1ZSkKICAgIGR1cAogICAgYm94X2dldAogICAgc3dhcAogICAgYnVyeSA3CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3NDEKICAgIC8vIGxldCB0b3RhbDogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIGJ1cnkgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3NDIKICAgIC8vIGxldCBjb3VudDogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIGJ1cnkgNQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3NDMKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCA0OyBpICs9IDEpIHsKICAgIGludGNfMCAvLyAwCiAgICBidXJ5IDQKCm11c3RHZXRIZWFydGJlYXRBdmVyYWdlX3doaWxlX3RvcEA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3NDMKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCA0OyBpICs9IDEpIHsKICAgIGRpZyAzCiAgICBwdXNoaW50IDQKICAgIDwKICAgIGJ6IG11c3RHZXRIZWFydGJlYXRBdmVyYWdlX2FmdGVyX3doaWxlQDExCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjc0NQogICAgLy8gaWYgKGhlYXJ0YmVhdHNbaV0udGltZXN0YW1wLmFzVWludDY0KCkgPiAwKSB7CiAgICBkaWcgMwogICAgaW50Y18zIC8vIDMyCiAgICAqCiAgICBkaWcgNgogICAgc3dhcAogICAgaW50Y18zIC8vIDMyCiAgICBleHRyYWN0MyAvLyBvbiBlcnJvcjogaW5kZXggYWNjZXNzIGlzIG91dCBvZiBib3VuZHMKICAgIGR1cAogICAgYnVyeSA4CiAgICBwdXNoaW50IDI0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgYnogbXVzdEdldEhlYXJ0YmVhdEF2ZXJhZ2VfYWZ0ZXJfaWZfZWxzZUAxMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3NDYKICAgIC8vIGNvdW50ICs9IDEKICAgIGRpZyA0CiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgYnVyeSA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjc0NwogICAgLy8gaWYgKGluY2x1ZGVFc2Nyb3dlZCkgewogICAgZGlnIDEKICAgIGJ6IG11c3RHZXRIZWFydGJlYXRBdmVyYWdlX2Vsc2VfYm9keUA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjc0OAogICAgLy8gdG90YWwgKz0gaGVhcnRiZWF0c1tpXS5oZWxkLmFzVWludDY0KCkgKyBoZWFydGJlYXRzW2ldLmhhcmQuYXNVaW50NjQoKSArIGhlYXJ0YmVhdHNbaV0ubG9jay5hc1VpbnQ2NCgpCiAgICBkaWcgNgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGRpZyAxCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgICsKICAgIHN3YXAKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICArCiAgICBkaWcgMwogICAgKwogICAgYnVyeSAzCgptdXN0R2V0SGVhcnRiZWF0QXZlcmFnZV9hZnRlcl9pZl9lbHNlQDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3NDMKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCA0OyBpICs9IDEpIHsKICAgIGRpZyAzCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgYnVyeSA0CiAgICBiIG11c3RHZXRIZWFydGJlYXRBdmVyYWdlX3doaWxlX3RvcEA0CgptdXN0R2V0SGVhcnRiZWF0QXZlcmFnZV9lbHNlX2JvZHlAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NzUwCiAgICAvLyB0b3RhbCArPSBoZWFydGJlYXRzW2ldLmhlbGQuYXNVaW50NjQoKQogICAgZGlnIDYKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZGlnIDMKICAgICsKICAgIGJ1cnkgMwogICAgYiBtdXN0R2V0SGVhcnRiZWF0QXZlcmFnZV9hZnRlcl9pZl9lbHNlQDEwCgptdXN0R2V0SGVhcnRiZWF0QXZlcmFnZV9hZnRlcl93aGlsZUAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NzU1CiAgICAvLyBpZiAoY291bnQgPT09IDApIHsKICAgIGRpZyA0CiAgICBibnogbXVzdEdldEhlYXJ0YmVhdEF2ZXJhZ2VfYWZ0ZXJfaWZfZWxzZUAxMwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3NTYKICAgIC8vIHJldHVybiAwCiAgICBpbnRjXzAgLy8gMAoKbXVzdEdldEhlYXJ0YmVhdEF2ZXJhZ2VfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLm11c3RHZXRIZWFydGJlYXRBdmVyYWdlQDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3MzQKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgaXRvYgogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKbXVzdEdldEhlYXJ0YmVhdEF2ZXJhZ2VfYWZ0ZXJfaWZfZWxzZUAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NzU5CiAgICAvLyByZXR1cm4gdG90YWwgLyBjb3VudAogICAgZGlnIDIKICAgIGRpZyA1CiAgICAvCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjczNAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBiIG11c3RHZXRIZWFydGJlYXRBdmVyYWdlX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5tdXN0R2V0SGVhcnRiZWF0QXZlcmFnZUAxNAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuZ2V0SW5mb0xpc3Rbcm91dGluZ10oKSAtPiB2b2lkOgpnZXRJbmZvTGlzdDoKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjc2MgogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50OAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwbiAyCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBpbnRjXzIgLy8gOAogICAgKgogICAgcHVzaGludCAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTx1aW50NjQ+CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjc2NAogICAgLy8gY29uc3QgcmVzdWx0czogU3Rha2VbXSA9IFtdCiAgICBieXRlYyAxNSAvLyAweDAwMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NzY1CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgYXNzZXRzLmxlbmd0aDsgaSArPSAxKSB7CiAgICBpbnRjXzAgLy8gMAoKZ2V0SW5mb0xpc3Rfd2hpbGVfdG9wQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjc2NQogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGFzc2V0cy5sZW5ndGg7IGkgKz0gMSkgewogICAgZHVwCiAgICBkaWcgMwogICAgPAogICAgYnogZ2V0SW5mb0xpc3RfYWZ0ZXJfd2hpbGVANwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3NjYKICAgIC8vIGNvbnN0IHNrID0geyBhZGRyZXNzLCBhc3NldDogYXNzZXRzW2ldLCB0eXBlIH0KICAgIGRpZyAzCiAgICBleHRyYWN0IDIgMAogICAgZGlnIDEKICAgIGludGNfMiAvLyA4CiAgICAqCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdDMgLy8gb24gZXJyb3I6IGluZGV4IGFjY2VzcyBpcyBvdXQgb2YgYm91bmRzCiAgICBkaWcgNgogICAgc3dhcAogICAgY29uY2F0CiAgICBkaWcgNQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjc2NwogICAgLy8gaWYgKCF0aGlzLnN0YWtlcyhzaykuZXhpc3RzKSB7CiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgZGlnIDEKICAgIGV4dHJhY3QgMzIgOAogICAgdW5jb3ZlciAyCiAgICBleHRyYWN0IDQwIDEKICAgIGNvdmVyIDIKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjgxCiAgICAvLyBzdGFrZXMgPSBCb3hNYXA8U3Rha2VLZXksIFN0YWtlPih7IGtleVByZWZpeDogU3Rha2luZ0JveFByZWZpeFN0YWtlcyB9KQogICAgYnl0ZWNfMCAvLyAicyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBidXJ5IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NzY3CiAgICAvLyBpZiAoIXRoaXMuc3Rha2VzKHNrKS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGdldEluZm9MaXN0X2FmdGVyX2lmX2Vsc2VANQogICAgZGlnIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjc3NQogICAgLy8gcmVzdWx0cy5wdXNoKGVtcHR5U3Rha2UpCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgaXRvYgogICAgZXh0cmFjdCA2IDAKICAgIHJlcGxhY2UyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NzY5LTc3MwogICAgLy8gY29uc3QgZW1wdHlTdGFrZTogU3Rha2UgPSB7CiAgICAvLyAgIGFtb3VudDogMCwKICAgIC8vICAgbGFzdFVwZGF0ZTogMCwKICAgIC8vICAgZXhwaXJhdGlvbjogMCwKICAgIC8vIH0KICAgIGJ5dGVjIDI2IC8vIDB4MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwCiAgICBjb25jYXQKICAgIGJ1cnkgMgoKZ2V0SW5mb0xpc3RfYmxvY2tANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NzY1CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgYXNzZXRzLmxlbmd0aDsgaSArPSAxKSB7CiAgICBkdXAKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBidXJ5IDEKICAgIGIgZ2V0SW5mb0xpc3Rfd2hpbGVfdG9wQDIKCmdldEluZm9MaXN0X2FmdGVyX2lmX2Vsc2VANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6Nzc5CiAgICAvLyByZXN1bHRzLnB1c2godGhpcy5zdGFrZXMoc2spLnZhbHVlKQogICAgZGlnIDYKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBkaWcgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6Nzc5CiAgICAvLyByZXN1bHRzLnB1c2godGhpcy5zdGFrZXMoc2spLnZhbHVlKQogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGl0b2IKICAgIGV4dHJhY3QgNiAwCiAgICByZXBsYWNlMiAwCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJ1cnkgMgogICAgYiBnZXRJbmZvTGlzdF9ibG9ja0A2CgpnZXRJbmZvTGlzdF9hZnRlcl93aGlsZUA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3NjIKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBkaWcgMgogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLm11c3RHZXRJbmZvTGlzdFtyb3V0aW5nXSgpIC0+IHZvaWQ6Cm11c3RHZXRJbmZvTGlzdDoKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjc4NAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50OAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwbiAyCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBpbnRjXzIgLy8gOAogICAgKgogICAgcHVzaGludCAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTx1aW50NjQ+CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjc4NgogICAgLy8gY29uc3QgcmVzdWx0czogU3Rha2VbXSA9IFtdCiAgICBieXRlYyAxNSAvLyAweDAwMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6Nzg3CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgYXNzZXRzLmxlbmd0aDsgaSArPSAxKSB7CiAgICBpbnRjXzAgLy8gMAoKbXVzdEdldEluZm9MaXN0X3doaWxlX3RvcEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3ODcKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBhc3NldHMubGVuZ3RoOyBpICs9IDEpIHsKICAgIGR1cAogICAgZGlnIDMKICAgIDwKICAgIGJ6IG11c3RHZXRJbmZvTGlzdF9hZnRlcl93aGlsZUA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjc4OAogICAgLy8gY29uc3Qgc2sgPSB7IGFkZHJlc3MsIGFzc2V0OiBhc3NldHNbaV0sIHR5cGUgfQogICAgZGlnIDMKICAgIGV4dHJhY3QgMiAwCiAgICBkaWcgMQogICAgaW50Y18yIC8vIDgKICAgICoKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0MyAvLyBvbiBlcnJvcjogaW5kZXggYWNjZXNzIGlzIG91dCBvZiBib3VuZHMKICAgIGRpZyA2CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGRpZyA1CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6Nzg5CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zdGFrZXMoc2spLmV4aXN0cywgRVJSX1NUQUtFX05PVF9GT1VORCkKICAgIGR1cAogICAgZXh0cmFjdCAwIDMyCiAgICBkaWcgMQogICAgZXh0cmFjdCAzMiA4CiAgICB1bmNvdmVyIDIKICAgIGV4dHJhY3QgNDAgMQogICAgY292ZXIgMgogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODEKICAgIC8vIHN0YWtlcyA9IEJveE1hcDxTdGFrZUtleSwgU3Rha2U+KHsga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4U3Rha2VzIH0pCiAgICBieXRlY18wIC8vICJzIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGJ1cnkgOAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3ODkKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnN0YWtlcyhzaykuZXhpc3RzLCBFUlJfU1RBS0VfTk9UX0ZPVU5EKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogbXVzdEdldEluZm9MaXN0X2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjpTTkZEIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOlNORkQKCm11c3RHZXRJbmZvTGlzdF9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NzkwCiAgICAvLyByZXN1bHRzLnB1c2godGhpcy5zdGFrZXMoc2spLnZhbHVlKQogICAgZGlnIDYKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBkaWcgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NzkwCiAgICAvLyByZXN1bHRzLnB1c2godGhpcy5zdGFrZXMoc2spLnZhbHVlKQogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGl0b2IKICAgIGV4dHJhY3QgNiAwCiAgICByZXBsYWNlMiAwCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJ1cnkgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3ODcKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBhc3NldHMubGVuZ3RoOyBpICs9IDEpIHsKICAgIGR1cAogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGJ1cnkgMQogICAgYiBtdXN0R2V0SW5mb0xpc3Rfd2hpbGVfdG9wQDIKCm11c3RHZXRJbmZvTGlzdF9hZnRlcl93aGlsZUA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3ODQKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBkaWcgMgogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLnN0YWtlQ2hlY2tbcm91dGluZ10oKSAtPiB2b2lkOgpzdGFrZUNoZWNrOgogICAgaW50Y18wIC8vIDAKICAgIGR1cAogICAgYnl0ZWNfMyAvLyAiIgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjc5NQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cG4gMgogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGR1cAogICAgY292ZXIgMgogICAgcHVzaGludCAxNgogICAgKgogICAgcHVzaGludCAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxzbWFydF9jb250cmFjdHMvc3Rha2luZy90eXBlcy50czo6QXNzZXRDaGVjaz4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50OAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmJvb2wKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6Nzk3CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgY2hlY2tzLmxlbmd0aDsgaSArPSAxKSB7CiAgICBpbnRjXzAgLy8gMAoKc3Rha2VDaGVja193aGlsZV90b3BAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6Nzk3CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgY2hlY2tzLmxlbmd0aDsgaSArPSAxKSB7CiAgICBkdXAKICAgIGRpZyA0CiAgICA8CiAgICBieiBzdGFrZUNoZWNrX2FmdGVyX3doaWxlQDEwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjc5OAogICAgLy8gY29uc3Qgc2sgPSB7IGFkZHJlc3MsIGFzc2V0OiBjaGVja3NbaV0uYXNzZXQsIHR5cGUgfQogICAgZGlnIDQKICAgIGV4dHJhY3QgMiAwCiAgICBkaWcgMQogICAgcHVzaGludCAxNgogICAgKgogICAgcHVzaGludCAxNgogICAgZXh0cmFjdDMgLy8gb24gZXJyb3I6IGluZGV4IGFjY2VzcyBpcyBvdXQgb2YgYm91bmRzCiAgICBkdXAKICAgIGJ1cnkgMTEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBidXJ5IDgKICAgIGl0b2IKICAgIGRpZyA2CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGRpZyAzCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6Nzk5CiAgICAvLyBpZiAoIXRoaXMuc3Rha2VzKHNrKS5leGlzdHMpIHsKICAgIGR1cAogICAgZXh0cmFjdCAwIDMyCiAgICBkaWcgMQogICAgZXh0cmFjdCAzMiA4CiAgICB1bmNvdmVyIDIKICAgIGV4dHJhY3QgNDAgMQogICAgY292ZXIgMgogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODEKICAgIC8vIHN0YWtlcyA9IEJveE1hcDxTdGFrZUtleSwgU3Rha2U+KHsga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4U3Rha2VzIH0pCiAgICBieXRlY18wIC8vICJzIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGJ1cnkgMTAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6Nzk5CiAgICAvLyBpZiAoIXRoaXMuc3Rha2VzKHNrKS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHN0YWtlQ2hlY2tfYWZ0ZXJfaWZfZWxzZUA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjgwMAogICAgLy8gcmV0dXJuIGZhbHNlCiAgICBpbnRjXzAgLy8gMAoKc3Rha2VDaGVja19hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuc3Rha2VDaGVja0AxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6Nzk1CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjIDE5IC8vIDB4MDAKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDIKICAgIHNldGJpdAogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKc3Rha2VDaGVja19hZnRlcl9pZl9lbHNlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjgwMwogICAgLy8gbGV0IGFtb3VudFRvQ2hlY2s6IHVpbnQ2NCA9IHRoaXMuc3Rha2VzKHNrKS52YWx1ZS5hbW91bnQKICAgIGRpZyA4CiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBidXJ5IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODA0CiAgICAvLyBpZiAodHlwZSA9PT0gU1RBS0lOR19UWVBFX0hFQVJUQkVBVCkgewogICAgZGlnIDIKICAgIGJ5dGVjIDkgLy8gMHgwYQogICAgPT0KICAgIGJ6IHN0YWtlQ2hlY2tfYWZ0ZXJfaWZfZWxzZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjgwNQogICAgLy8gYW1vdW50VG9DaGVjayA9IHRoaXMuZ2V0SGVhcnRiZWF0QXZlcmFnZShhZGRyZXNzLCBjaGVja3NbaV0uYXNzZXQsIGluY2x1ZGVFc2Nyb3dlZCkKICAgIGRpZyA1CiAgICBkaWcgNwogICAgZGlnIDMKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5nZXRIZWFydGJlYXRBdmVyYWdlCiAgICBidXJ5IDgKCnN0YWtlQ2hlY2tfYWZ0ZXJfaWZfZWxzZUA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4MDgKICAgIC8vIGlmIChjaGVja3NbaV0uYW1vdW50ID49IGFtb3VudFRvQ2hlY2spIHsKICAgIGRpZyA5CiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIGRpZyA4CiAgICA+PQogICAgYnogc3Rha2VDaGVja19hZnRlcl9pZl9lbHNlQDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODA5CiAgICAvLyByZXR1cm4gZmFsc2UKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjc5NQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBiIHN0YWtlQ2hlY2tfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLnN0YWtlQ2hlY2tAMTEKCnN0YWtlQ2hlY2tfYWZ0ZXJfaWZfZWxzZUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3OTcKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBjaGVja3MubGVuZ3RoOyBpICs9IDEpIHsKICAgIGR1cAogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGJ1cnkgMQogICAgYiBzdGFrZUNoZWNrX3doaWxlX3RvcEAyCgpzdGFrZUNoZWNrX2FmdGVyX3doaWxlQDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4MTMKICAgIC8vIHJldHVybiB0cnVlCiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3OTUKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYiBzdGFrZUNoZWNrX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5zdGFrZUNoZWNrQDExCgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5nZXRUb3RhbHNbcm91dGluZ10oKSAtPiB2b2lkOgpnZXRUb3RhbHM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjgxNgogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXBuIDIKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGludGNfMiAvLyA4CiAgICAqCiAgICBwdXNoaW50IDIKICAgICsKICAgIHN3YXAKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PHVpbnQ2ND4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODE4CiAgICAvLyBjb25zdCByZXN1bHRzOiBUb3RhbHNJbmZvW10gPSBbXQogICAgYnl0ZWMgMTUgLy8gMHgwMDAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjgxOQogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGFzc2V0cy5sZW5ndGg7IGkgKz0gMSkgewogICAgaW50Y18wIC8vIDAKCmdldFRvdGFsc193aGlsZV90b3BAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODE5CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgYXNzZXRzLmxlbmd0aDsgaSArPSAxKSB7CiAgICBkdXAKICAgIGRpZyAzCiAgICA8CiAgICBieiBnZXRUb3RhbHNfYWZ0ZXJfd2hpbGVANAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4MjAKICAgIC8vIHJlc3VsdHMucHVzaCh0aGlzLnRvdGFscyhhc3NldHNbaV0pLnZhbHVlKQogICAgZGlnIDMKICAgIGV4dHJhY3QgMiAwCiAgICBkaWcgMQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBpbnRjXzIgLy8gOAogICAgKgogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3QzIC8vIG9uIGVycm9yOiBpbmRleCBhY2Nlc3MgaXMgb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4OAogICAgLy8gdG90YWxzID0gQm94TWFwPHVpbnQ2NCwgVG90YWxzSW5mbz4oeyBrZXlQcmVmaXg6IFN0YWtpbmdCb3hQcmVmaXhUb3RhbHMgfSkKICAgIGJ5dGVjIDggLy8gInQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODIwCiAgICAvLyByZXN1bHRzLnB1c2godGhpcy50b3RhbHMoYXNzZXRzW2ldKS52YWx1ZSkKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBkaWcgMwogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODIwCiAgICAvLyByZXN1bHRzLnB1c2godGhpcy50b3RhbHMoYXNzZXRzW2ldKS52YWx1ZSkKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMAogICAgcmVwbGFjZTIgMAogICAgc3dhcAogICAgY29uY2F0CiAgICBidXJ5IDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODE5CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgYXNzZXRzLmxlbmd0aDsgaSArPSAxKSB7CiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgYnVyeSAxCiAgICBiIGdldFRvdGFsc193aGlsZV90b3BAMgoKZ2V0VG90YWxzX2FmdGVyX3doaWxlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjgxNgogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIGRpZyAyCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpBa2l0YUJhc2VDb250cmFjdC51cGRhdGVBa2l0YURBT1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZUFraXRhREFPOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzYKICAgIC8vIHVwZGF0ZUFraXRhREFPKGFraXRhREFPOiBBcHBsaWNhdGlvbik6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzcKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlYyAxNiAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHB1c2hieXRlcyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzcKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IHVwZGF0ZUFraXRhREFPX2FmdGVyX2Fzc2VydEAzCiAgICBwdXNoYnl0ZXMgIkVSUjpOREFPIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5EQU8KCnVwZGF0ZUFraXRhREFPX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlYyAxNiAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzgKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUgPSBha2l0YURBTwogICAgZGlnIDEKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozNgogICAgLy8gdXBkYXRlQWtpdGFEQU8oYWtpdGFEQU86IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy51cGRhdGVUb3RhbHMoYXNzZXQ6IHVpbnQ2NCwgdHlwZTogYnl0ZXMsIGFtb3VudDogdWludDY0LCBpc0FkZDogdWludDY0KSAtPiB2b2lkOgp1cGRhdGVUb3RhbHM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwNgogICAgLy8gcHJpdmF0ZSB1cGRhdGVUb3RhbHMoYXNzZXQ6IHVpbnQ2NCwgdHlwZTogU3Rha2luZ1R5cGUsIGFtb3VudDogdWludDY0LCBpc0FkZDogYm9vbGVhbik6IHZvaWQgewogICAgcHJvdG8gNCAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwNwogICAgLy8gaWYgKHR5cGUgPT09IFNUQUtJTkdfVFlQRV9IQVJEKSB7CiAgICBmcmFtZV9kaWcgLTMKICAgIGJ5dGVjIDQgLy8gMHgxZQogICAgPT0KICAgIGJ6IHVwZGF0ZVRvdGFsc19lbHNlX2JvZHlANQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDgKICAgIC8vIGlmIChpc0FkZCkgewogICAgZnJhbWVfZGlnIC0xCiAgICBieiB1cGRhdGVUb3RhbHNfZWxzZV9ib2R5QDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTA5CiAgICAvLyB0aGlzLnRvdGFscyhhc3NldCkudmFsdWUuZXNjcm93ZWQgKz0gYW1vdW50CiAgICBmcmFtZV9kaWcgLTQKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODgKICAgIC8vIHRvdGFscyA9IEJveE1hcDx1aW50NjQsIFRvdGFsc0luZm8+KHsga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4VG90YWxzIH0pCiAgICBieXRlYyA4IC8vICJ0IgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwOQogICAgLy8gdGhpcy50b3RhbHMoYXNzZXQpLnZhbHVlLmVzY3Jvd2VkICs9IGFtb3VudAogICAgZHVwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBmcmFtZV9kaWcgLTIKICAgICsKICAgIGl0b2IKICAgIGludGNfMiAvLyA4CiAgICBzd2FwCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwoKdXBkYXRlVG90YWxzX2FmdGVyX2lmX2Vsc2VAMTE6CiAgICByZXRzdWIKCnVwZGF0ZVRvdGFsc19lbHNlX2JvZHlAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTExCiAgICAvLyB0aGlzLnRvdGFscyhhc3NldCkudmFsdWUuZXNjcm93ZWQgLT0gYW1vdW50CiAgICBmcmFtZV9kaWcgLTQKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODgKICAgIC8vIHRvdGFscyA9IEJveE1hcDx1aW50NjQsIFRvdGFsc0luZm8+KHsga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4VG90YWxzIH0pCiAgICBieXRlYyA4IC8vICJ0IgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExMQogICAgLy8gdGhpcy50b3RhbHMoYXNzZXQpLnZhbHVlLmVzY3Jvd2VkIC09IGFtb3VudAogICAgZHVwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBmcmFtZV9kaWcgLTIKICAgIC0KICAgIGl0b2IKICAgIGludGNfMiAvLyA4CiAgICBzd2FwCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgcmV0c3ViCgp1cGRhdGVUb3RhbHNfZWxzZV9ib2R5QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExMwogICAgLy8gfSBlbHNlIGlmICh0eXBlID09PSBTVEFLSU5HX1RZUEVfTE9DSykgewogICAgZnJhbWVfZGlnIC0zCiAgICBieXRlY18yIC8vIDB4MjgKICAgID09CiAgICBieiB1cGRhdGVUb3RhbHNfYWZ0ZXJfaWZfZWxzZUAxMQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMTQKICAgIC8vIGlmIChpc0FkZCkgewogICAgZnJhbWVfZGlnIC0xCiAgICBieiB1cGRhdGVUb3RhbHNfZWxzZV9ib2R5QDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTE1CiAgICAvLyB0aGlzLnRvdGFscyhhc3NldCkudmFsdWUubG9ja2VkICs9IGFtb3VudAogICAgZnJhbWVfZGlnIC00CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjg4CiAgICAvLyB0b3RhbHMgPSBCb3hNYXA8dWludDY0LCBUb3RhbHNJbmZvPih7IGtleVByZWZpeDogU3Rha2luZ0JveFByZWZpeFRvdGFscyB9KQogICAgYnl0ZWMgOCAvLyAidCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMTUKICAgIC8vIHRoaXMudG90YWxzKGFzc2V0KS52YWx1ZS5sb2NrZWQgKz0gYW1vdW50CiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGZyYW1lX2RpZyAtMgogICAgKwogICAgaXRvYgogICAgaW50Y18wIC8vIDAKICAgIHN3YXAKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICByZXRzdWIKCnVwZGF0ZVRvdGFsc19lbHNlX2JvZHlAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTE3CiAgICAvLyB0aGlzLnRvdGFscyhhc3NldCkudmFsdWUubG9ja2VkIC09IGFtb3VudAogICAgZnJhbWVfZGlnIC00CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjg4CiAgICAvLyB0b3RhbHMgPSBCb3hNYXA8dWludDY0LCBUb3RhbHNJbmZvPih7IGtleVByZWZpeDogU3Rha2luZ0JveFByZWZpeFRvdGFscyB9KQogICAgYnl0ZWMgOCAvLyAidCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMTcKICAgIC8vIHRoaXMudG90YWxzKGFzc2V0KS52YWx1ZS5sb2NrZWQgLT0gYW1vdW50CiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGZyYW1lX2RpZyAtMgogICAgLQogICAgaXRvYgogICAgaW50Y18wIC8vIDAKICAgIHN3YXAKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLnN5bmNTb2Z0U3Rha2VJbmZvKGFkZHJlc3M6IGJ5dGVzLCBzdGFrZTogYnl0ZXMsIGluZm86IGJ5dGVzKSAtPiBieXRlcywgYnl0ZXMsIGJ5dGVzOgpzeW5jU29mdFN0YWtlSW5mbzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTIyCiAgICAvLyBwcml2YXRlIHN5bmNTb2Z0U3Rha2VJbmZvKGFkZHJlc3M6IEFjY291bnQsIHN0YWtlOiBTdGFrZUluZm8sIGluZm86IFN0YWtlKTogU3Rha2UgewogICAgcHJvdG8gMyAzCiAgICBieXRlY18zIC8vICIiCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTIzCiAgICAvLyBpZiAoc3Rha2UudHlwZSAhPT0gU1RBS0lOR19UWVBFX1NPRlQpIHsKICAgIGZyYW1lX2RpZyAtMgogICAgZXh0cmFjdCA4IDEKICAgIGR1cAogICAgYnl0ZWMgMTQgLy8gMHgxNAogICAgIT0KICAgIGJ6IHN5bmNTb2Z0U3Rha2VJbmZvX2FmdGVyX2lmX2Vsc2VAMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMjQKICAgIC8vIHJldHVybiBpbmZvCiAgICBmcmFtZV9kaWcgLTEKICAgIGZyYW1lX2RpZyAtMgogICAgZnJhbWVfZGlnIC0xCiAgICB1bmNvdmVyIDUKICAgIHVuY292ZXIgNQogICAgdW5jb3ZlciA1CiAgICByZXRzdWIKCnN5bmNTb2Z0U3Rha2VJbmZvX2FmdGVyX2lmX2Vsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTI4CiAgICAvLyBpZiAoc3Rha2UuYXNzZXQgPT09IDApIHsKICAgIGZyYW1lX2RpZyAtMgogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMQogICAgYm56IHN5bmNTb2Z0U3Rha2VJbmZvX2Vsc2VfYm9keUA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEyOQogICAgLy8gaGVsZCA9IGFkZHJlc3MuYmFsYW5jZQogICAgZnJhbWVfZGlnIC0zCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdEJhbGFuY2UKICAgIHN3YXAKICAgIGZyYW1lX2J1cnkgMAogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCgpzeW5jU29mdFN0YWtlSW5mb19hZnRlcl9pZl9lbHNlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEzNAogICAgLy8gaWYgKGluZm8uYW1vdW50ID09PSBoZWxkKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZnJhbWVfZGlnIDAKICAgID09CiAgICBieiBzeW5jU29mdFN0YWtlSW5mb19hZnRlcl9pZl9lbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTM1CiAgICAvLyByZXR1cm4gaW5mbwogICAgZnJhbWVfZGlnIC0xCiAgICBmcmFtZV9kaWcgLTIKICAgIGZyYW1lX2RpZyAtMQogICAgdW5jb3ZlciA1CiAgICB1bmNvdmVyIDUKICAgIHVuY292ZXIgNQogICAgcmV0c3ViCgpzeW5jU29mdFN0YWtlSW5mb19hZnRlcl9pZl9lbHNlQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjE0MAogICAgLy8gbGFzdFVwZGF0ZTogR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTQxCiAgICAvLyBleHBpcmF0aW9uOiBpbmZvLmV4cGlyYXRpb24sCiAgICBmcmFtZV9kaWcgLTEKICAgIGV4dHJhY3QgMTYgOAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMzgtMTQyCiAgICAvLyBjb25zdCBzeW5jZWQ6IFN0YWtlID0gewogICAgLy8gICBhbW91bnQ6IGhlbGQsCiAgICAvLyAgIGxhc3RVcGRhdGU6IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICAvLyAgIGV4cGlyYXRpb246IGluZm8uZXhwaXJhdGlvbiwKICAgIC8vIH0KICAgIGZyYW1lX2RpZyAwCiAgICBpdG9iCiAgICB1bmNvdmVyIDIKICAgIGl0b2IKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjE0NAogICAgLy8gdGhpcy5zdGFrZXMoeyBhZGRyZXNzLCAuLi5zdGFrZSB9KS52YWx1ZSA9IGNsb25lKHN5bmNlZCkKICAgIGZyYW1lX2RpZyAxCiAgICBpdG9iCiAgICBmcmFtZV9kaWcgLTMKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIDIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4MQogICAgLy8gc3Rha2VzID0gQm94TWFwPFN0YWtlS2V5LCBTdGFrZT4oeyBrZXlQcmVmaXg6IFN0YWtpbmdCb3hQcmVmaXhTdGFrZXMgfSkKICAgIGJ5dGVjXzAgLy8gInMiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTQ0CiAgICAvLyB0aGlzLnN0YWtlcyh7IGFkZHJlc3MsIC4uLnN0YWtlIH0pLnZhbHVlID0gY2xvbmUoc3luY2VkKQogICAgZGlnIDEKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTQ2CiAgICAvLyByZXR1cm4gc3luY2VkCiAgICBmcmFtZV9kaWcgLTIKICAgIGZyYW1lX2RpZyAtMQogICAgdW5jb3ZlciA1CiAgICB1bmNvdmVyIDUKICAgIHVuY292ZXIgNQogICAgcmV0c3ViCgpzeW5jU29mdFN0YWtlSW5mb19lbHNlX2JvZHlANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTMxCiAgICAvLyBoZWxkID0gQXNzZXRIb2xkaW5nLmFzc2V0QmFsYW5jZShhZGRyZXNzLCBzdGFrZS5hc3NldClbMF0KICAgIGZyYW1lX2RpZyAtMwogICAgZnJhbWVfZGlnIDEKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgcG9wCiAgICBmcmFtZV9idXJ5IDAKICAgIGIgc3luY1NvZnRTdGFrZUluZm9fYWZ0ZXJfaWZfZWxzZUA1CgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5nZXRJbmZvT3JFbXB0eShhZGRyZXNzOiBieXRlcywgc3Rha2U6IGJ5dGVzKSAtPiBieXRlcywgYnl0ZXM6CmdldEluZm9PckVtcHR5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxNTMKICAgIC8vIHByaXZhdGUgZ2V0SW5mb09yRW1wdHkoYWRkcmVzczogQWNjb3VudCwgc3Rha2U6IFN0YWtlSW5mbyk6IFN0YWtlIHsKICAgIHByb3RvIDIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxNTQKICAgIC8vIGNvbnN0IHNrID0geyBhZGRyZXNzLCAuLi5zdGFrZSB9CiAgICBmcmFtZV9kaWcgLTEKICAgIGV4dHJhY3QgMCA4CiAgICBmcmFtZV9kaWcgLTEKICAgIGV4dHJhY3QgOCAxCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtMgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjE1NQogICAgLy8gaWYgKCF0aGlzLnN0YWtlcyhzaykuZXhpc3RzKSB7CiAgICBkdXAKICAgIGV4dHJhY3QgOSAzMgogICAgZGlnIDEKICAgIGV4dHJhY3QgMCA4CiAgICB1bmNvdmVyIDIKICAgIGV4dHJhY3QgOCAxCiAgICBjb3ZlciAyCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4MQogICAgLy8gc3Rha2VzID0gQm94TWFwPFN0YWtlS2V5LCBTdGFrZT4oeyBrZXlQcmVmaXg6IFN0YWtpbmdCb3hQcmVmaXhTdGFrZXMgfSkKICAgIGJ5dGVjXzAgLy8gInMiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxNTUKICAgIC8vIGlmICghdGhpcy5zdGFrZXMoc2spLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogZ2V0SW5mb09yRW1wdHlfYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjE1MAogICAgLy8gcmV0dXJuIHsgYW1vdW50OiAwLCBsYXN0VXBkYXRlOiAwLCBleHBpcmF0aW9uOiAwIH0KICAgIGJ5dGVjIDI2IC8vIDB4MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjE1NgogICAgLy8gcmV0dXJuIHRoaXMuZW1wdHlTdGFrZSgpCiAgICBmcmFtZV9kaWcgLTEKICAgIHVuY292ZXIgMgogICAgcmV0c3ViCgpnZXRJbmZvT3JFbXB0eV9hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjE1OQogICAgLy8gcmV0dXJuIHRoaXMuc3luY1NvZnRTdGFrZUluZm8oYWRkcmVzcywgc3Rha2UsIHRoaXMuc3Rha2VzKHNrKS52YWx1ZSkKICAgIGZyYW1lX2RpZyAwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZnJhbWVfZGlnIC0yCiAgICBmcmFtZV9kaWcgLTEKICAgIHVuY292ZXIgMgogICAgY2FsbHN1YiBzeW5jU29mdFN0YWtlSW5mbwogICAgcG9wCiAgICBkdXAKICAgIGZyYW1lX2J1cnkgLTEKICAgIHVuY292ZXIgMgogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5nZXRIZWFydGJlYXRBdmVyYWdlKGFkZHJlc3M6IGJ5dGVzLCBhc3NldDogdWludDY0LCBpbmNsdWRlRXNjcm93ZWQ6IHVpbnQ2NCkgLT4gdWludDY0OgpzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmdldEhlYXJ0YmVhdEF2ZXJhZ2U6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjcwNC03MDUKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgLy8gZ2V0SGVhcnRiZWF0QXZlcmFnZShhZGRyZXNzOiBBY2NvdW50LCBhc3NldDogdWludDY0LCBpbmNsdWRlRXNjcm93ZWQ6IGJvb2xlYW4pOiB1aW50NjQgewogICAgcHJvdG8gMyAxCiAgICBpbnRjXzAgLy8gMAogICAgZHVwCiAgICBieXRlY18zIC8vICIiCiAgICBkdXBuIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NzA2CiAgICAvLyBjb25zdCBoYmsgPSB7IGFkZHJlc3MsIGFzc2V0IH0KICAgIGZyYW1lX2RpZyAtMgogICAgaXRvYgogICAgZnJhbWVfZGlnIC0zCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NzA4CiAgICAvLyBpZiAoIXRoaXMuaGVhcnRiZWF0cyhoYmspLmV4aXN0cykgewogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIHN3YXAKICAgIGV4dHJhY3QgMzIgOAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjg0LTg2CiAgICAvLyBoZWFydGJlYXRzID0gQm94TWFwPEhlYXJ0YmVhdEtleSwgYXJjNC5TdGF0aWNBcnJheTxhcmM0SGVhcnRiZWF0LCA0Pj4oewogICAgLy8gICBrZXlQcmVmaXg6IFN0YWtpbmdCb3hQcmVmaXhIZWFydGJlYXRzLAogICAgLy8gfSkKICAgIGJ5dGVjIDcgLy8gImgiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3MDgKICAgIC8vIGlmICghdGhpcy5oZWFydGJlYXRzKGhiaykuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmdldEhlYXJ0YmVhdEF2ZXJhZ2VfYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjcwOQogICAgLy8gcmV0dXJuIDAKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5nZXRIZWFydGJlYXRBdmVyYWdlX2FmdGVyX2lmX2Vsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NzEyCiAgICAvLyBjb25zdCBoZWFydGJlYXRzID0gY2xvbmUodGhpcy5oZWFydGJlYXRzKGhiaykudmFsdWUpCiAgICBmcmFtZV9kaWcgNQogICAgYm94X2dldAogICAgc3dhcAogICAgZnJhbWVfYnVyeSAxCiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3MTQKICAgIC8vIGxldCB0b3RhbDogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2J1cnkgNAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3MTUKICAgIC8vIGxldCBjb3VudDogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2J1cnkgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3MTYKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBoZWFydGJlYXRzLmxlbmd0aDsgaSArPSAxKSB7CiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfYnVyeSAzCgpzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmdldEhlYXJ0YmVhdEF2ZXJhZ2Vfd2hpbGVfdG9wQDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjcxNgogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGhlYXJ0YmVhdHMubGVuZ3RoOyBpICs9IDEpIHsKICAgIGZyYW1lX2RpZyAzCiAgICBwdXNoaW50IDQKICAgIDwKICAgIGJ6IHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuZ2V0SGVhcnRiZWF0QXZlcmFnZV9hZnRlcl93aGlsZUAxMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3MTcKICAgIC8vIGlmIChoZWFydGJlYXRzW2ldLnRpbWVzdGFtcC5hc1VpbnQ2NCgpID4gMCkgewogICAgZnJhbWVfZGlnIDMKICAgIGludGNfMyAvLyAzMgogICAgKgogICAgZnJhbWVfZGlnIDEKICAgIHN3YXAKICAgIGludGNfMyAvLyAzMgogICAgZXh0cmFjdDMgLy8gb24gZXJyb3I6IGluZGV4IGFjY2VzcyBpcyBvdXQgb2YgYm91bmRzCiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMAogICAgcHVzaGludCAyNAogICAgZXh0cmFjdF91aW50NjQKICAgIGJ6IHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuZ2V0SGVhcnRiZWF0QXZlcmFnZV9hZnRlcl9pZl9lbHNlQDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NzE4CiAgICAvLyBjb3VudCArPSAxCiAgICBmcmFtZV9kaWcgMgogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGZyYW1lX2J1cnkgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3MTkKICAgIC8vIGlmIChpbmNsdWRlRXNjcm93ZWQpIHsKICAgIGZyYW1lX2RpZyAtMQogICAgYnogc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5nZXRIZWFydGJlYXRBdmVyYWdlX2Vsc2VfYm9keUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjcyMAogICAgLy8gdG90YWwgKz0gaGVhcnRiZWF0c1tpXS5oZWxkLmFzVWludDY0KCkgKyBoZWFydGJlYXRzW2ldLmhhcmQuYXNVaW50NjQoKSArIGhlYXJ0YmVhdHNbaV0ubG9jay5hc1VpbnQ2NCgpCiAgICBmcmFtZV9kaWcgMAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGRpZyAxCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgICsKICAgIHN3YXAKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICArCiAgICBmcmFtZV9kaWcgNAogICAgKwogICAgZnJhbWVfYnVyeSA0CgpzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmdldEhlYXJ0YmVhdEF2ZXJhZ2VfYWZ0ZXJfaWZfZWxzZUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3MTYKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBoZWFydGJlYXRzLmxlbmd0aDsgaSArPSAxKSB7CiAgICBmcmFtZV9kaWcgMwogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGZyYW1lX2J1cnkgMwogICAgYiBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmdldEhlYXJ0YmVhdEF2ZXJhZ2Vfd2hpbGVfdG9wQDMKCnNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuZ2V0SGVhcnRiZWF0QXZlcmFnZV9lbHNlX2JvZHlANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NzIyCiAgICAvLyB0b3RhbCArPSBoZWFydGJlYXRzW2ldLmhlbGQuYXNVaW50NjQoKQogICAgZnJhbWVfZGlnIDAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZnJhbWVfZGlnIDQKICAgICsKICAgIGZyYW1lX2J1cnkgNAogICAgYiBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmdldEhlYXJ0YmVhdEF2ZXJhZ2VfYWZ0ZXJfaWZfZWxzZUA5CgpzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmdldEhlYXJ0YmVhdEF2ZXJhZ2VfYWZ0ZXJfd2hpbGVAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjcyNwogICAgLy8gaWYgKGNvdW50ID09PSAwKSB7CiAgICBmcmFtZV9kaWcgMgogICAgYm56IHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuZ2V0SGVhcnRiZWF0QXZlcmFnZV9hZnRlcl9pZl9lbHNlQDEyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjcyOAogICAgLy8gcmV0dXJuIDAKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5nZXRIZWFydGJlYXRBdmVyYWdlX2FmdGVyX2lmX2Vsc2VAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjczMQogICAgLy8gcmV0dXJuIHRvdGFsIC8gY291bnQKICAgIGZyYW1lX2RpZyA0CiAgICBmcmFtZV9kaWcgMgogICAgLwogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIK", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyAHAAEIIOThAbiFBoDnhA8mGwFzBBUffHUBKAABHghFUlI6SVBBWQhFUlI6SUFBTQFoAXQBCghFUlI6SVBNUghFUlI6SVBNQQhFUlI6SUJBTAhFUlI6Tk9QVAEUAgAACWFraXRhX2RhbwhFUlI6TkxDSwhFUlI6SEJORgEAEAAAAAAAAAAAAAAAAAAAAAAIRVJSOkJFWFBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACEVSUjpIQkNVCEVSUjpCRVhVCEVSUjpMT0NLGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADEZFEQxGEEA0IIaBIPxR0gEOU6usgSCVs8ZBCBGe5MEgwSA8wTIFzyhBEhxbxoEXZ0UKAQiNaaDBGywDn0En09WdAR10Tj7BMkGiAkE9SMr8wQjM0wLBEyI6s4E6uZfEgTdRKhDBMb9DKUEiuJmuQTpelZVBBEl1zsEnf9AYARr6M7mBDPpLJQEhU3t4DYaAI4aAAMATQC9ArwFbwYyB3UINAioCLUI9wlKCaEJvAoRCq0LKQvfDBMMOAzmDX4ODQ7FDxUAAQAjQ4AJdAAAAAAAAAAAJxS/I0OABM2a1n42GgCOAQABADYaAUkiWYECCEsBFRJEVwIANhoCSRUkEkQXgAd2ZXJzaW9uTwJnJxBMZyNDKzEWIwlJOBAjEkQ2GgFJFSQSRBdJMgpMcABFAUEADIAIRVJSOkFPUFSwAIHUYTIQCEUDSwE4BzIKEkAABCcFsABLATgISwMSQAAEJwWwALEyCksBSU4CshEishKyFIEEshAisgGzFicITFAnFL8jQyJHBCtHBDEWIwlJOBAjEkQ2GgFHAhUjEkQ2GgJJFSQSRBdMNhoDSRUkEkQXSU4CSTIHDU4CMgchBggOTEkqEkwnBBJAAARJQQGvI0UKMgdFCEsCQQAFSwFAAARJQAGWI0AABCcVsAAxACIWSUUTUEsGUChMUElFEL1FAUAA90sJQQA5SwY4BzIKEkAABCcFsABLBjgISwUhBAgSQAAEJwWwACJLBksGI4gN4UsEFksIFlBLBBZQSw9MvyNDSwUnCRJBAIYxAHMARBZFECJFCyJFCTEASxFQJwRQKExQSUUPvUUBQQAISw2+RCJbRQsxAEsRUCpQKExQSUUOvUUBQQAISwy+RCJbRQlLBjgHMgoSQAAEJwWwAEsGOAghBRJAAAQnBbAAMQBLEVBLCxZLChZLChZLE08DUE8CUExQJxZQJwdPAlBMv0L/YTEAcwBESwUPQAAEJwywAEsGOAcyChJAAAQnBbAASwY4CCEEEkD/OicFsABLBScJE0AABCcXsABLDr5ESYEQW0wiW0UNSwQOQAAESUAAWSNAAAQnGLAASwlBADpLBjgHMgoSQAAEJwqwAEsGOAhLBRJAAAQnC7AAIksGSwYjiAzCSwtLBQgWSwgWUEsEFlBLD0y/Qv7bMQBzAERLDEsGCA9A/90nDLAAIkL/pCJC/mciRQpC/k4iRwMrRwgxFoECCUk4ECMSRDEWIwlHAjgQgQQSRDYaAUlOAhUjEkQ2GgJJFSQSRBdMNhoDSRUkEkQXSU4CSTIHDU4CMgchBggOTDgRSRZJgAFlTFBJvUUBQQANMgdLAb5EFwhLBg9FBEsHSSoSRQ0nBBJAAAVLC0ECMyNFDjIHRQtLBEEABUsDQAAFSwtAAhkjQAAEJxWwADEASwJQSwhQKExQSUUXvUUBQAFKSw1BAFNLCTgHMgoSQAAEJwqwAEsJOAghBBJAAAQnC7AASwg4FDIKEkAABCcGsABLCDgSSwcSQAAEJwawAEsCSwhLCCOIC5pLBhZLCxZQSwYWUEsWTL8jQ0sHJwkSQQCnMQBLA3AATEUSQAAEJw2wAEsQQAAEJwawAEsQFkUXMQBLAlAnBFAiRRMoTFBJRRa9RQFBAAhLFL5EIltFEjEASwJQKlAiRQ4oTFBJRRW9RQFBAAhLE75EIltFDUsJOAcyChJAAAQnCrAASwk4CCEFEkAABCcLsABLCDgSQQAEJwawADEASwJQSxIWSw4WSw0WSxpPA1BPAlBMUCcWUCcHTwJQTL9C/0AxAEsDcABMRRFAAAQnDbAASw9LBw9AAAQnDLAASwk4BzIKEkAABCcKsABLCTgIIQQSQAAEJwuwAEsIOBJB/wEnBrAASwcnCRNAAAQnF7AASxW+REmBEFtMIltFFEsGDkAABUsLQACLI0AABCcYsABLCTgHMgoSQAAEJwqwAEsJOAhBAAQnC7AASw1BADtLCDgUMgoSQAAEJwawAEsIOBJLBxJAAAQnBrAASwJLCEsII4gKJ0sSSwcIFksLFlBLBhZQSxZMv0L+hzEASwNwAExFEEAABCcNsABLEksHCEsPDkAABCcMsABLCDgSQf/FJwawACJC/3IiQv3kIkUOQv3KIitJNhoBSRUkEkQXNhoCRwIVIxJEJwQSQAAGSSoSQQCeI0AADIAIRVJSOldIT0ywADEASwIWUEsBUElXACBLAVcgCE8CVygBTgJQTFAoTFBJRQa9RQFAAAQnEbAASwS+REmBEFtFBCJbRQRJKhNAAAhLAjIHDEEAQiNAAAQnGbAASwFAAB2xMQBLBLIIsgcjshAisgGzSksFIogJPUsEvEgjQ7ExAEsCshFLBLISshSBBLIQIrIBs0L/2yJC/7siQv9fIkcGK0cENhoBSRUlEkQ2GgJJFSQSRBcxACKAGWhlYXJ0YmVhdF9tYW5hZ2VyX2FkZHJlc3NlRBJAAAyACEVSUjpOSEJNsABJFksCTFBJRQ9JVwAgTFcgCFAnB0xQSUUMvUUBQAAEJxKwADIHFkUISwq+TEUOREpwAEgWRQxLDScEUCJFCElXACBLAVcgCE8CVygBTgJQTFAoTFBJRQu9RQFBAAhLCb5EIltFB0sNKlAiRQVJVwAgSwFXIAhPAlcoAU4CUExQKExQSUUKvUUBQQAISwi+RCJbRQQiRQZLBYEEDEEATksFgQMSSUUEQAAkSwVJJQtLDklOA0wlWIEYW0wjCElFCCULTwJMJViBGFsNQQAoSwJBABwiSwcWSwUWSw5PAlBMUEsJUEwlC0sMTE8CuyNDSwUjCEL/3ksERQZC/5orRwQ2GgFHAhUlEkQ2GgJJFSQSRBdJTgIWUCcOUElXACBLAVcgCE8CVygBTgJQTFAoTFBJvUUBQAAMgAhFUlI6U05FWLAASb5EIltFCDIHRQZLAUAAM0sCcwBESwgPSUUGQAARSwJzAEQWSwYWUCIWUEsBTL9LAnMARCcTIksHVEwWUClMULAjQ0sCSwJwAExFCEAABCcNsABLBksID0lFBUAADksGFksGFlAiFlBLAUy/JxMiSwVUSwcWUEL/xCIrMRYjCUk4ECMSRDYaAUkVJBJEF0k2GgJJFSQSRBdMMQBMcQtEEkAADIAIRVJSOk5BQ1KwAEsCOAcyChJAAAQnBbAASwI4CEUESwEWgAFlTFBJRQa9RQFBABMiSwQSQAAEJwWwAEkWSwVMvyNDgdRIQv/ogdRhMhAIFilMULAjQzYaAUkVJBJEFzYaAklOAkkVIxJEIQROAjEATwIWUExQKExQvUUBQQAIIhYpTFCwI0NLAScJEkEABSEFQv/sSUL/6DYaAUkVJRJENhoCSRUkEkQXFlAqUElXACBLAVcgCE8CVygBTgJQTFAoTFBJvUUBQQANMgdLAb5EgRBbD0EACCIWKUxQsCNDSb5EgRBbMgcJQv/tNhoBSRUlEkQ2GgJJFSQSRBcWUCpQSVcAIEsBVyAITwJXKAFOAlBMUChMUEm9RQFAAAQnEbAAMgdLAb5EgRBbDEAABCcZsABJvkSBEFsyBwkWKUxQsCNDNhoBSRUlEkQ2GgJJFYEJEkSIBn5IKUxQsCNDNhoBRwIVJRJENhoCSU4CSRWBCRJESVcACExXCAFQTFBJVwkgSwFXAAhPAlcIAU4CUExQKExQSb1FAUAABCcRsABJvkRLA0sDTwKIBaxGAilMULAjQzYaAUkVJRJENhoCRwIVgQkSRCcPTFcIAUknDhJJQQAXSwNXAAgnDlBLBUyIBfRIgAIAAUxQRQNJQAAISwEnBBJBACBLA1cACCcEUEsFTIgF0UhLA0kiWSMIFlcGAFwATFBFA0lAAA9LAScEEkAAB0sBKhJBAB9LA1cACCpQSwVMiAWfSEsDSSJZIwgWVwYAXABMUEUDKUsDULAjQyIrNhoBSRUlEkQ2GgJJFSQSRBcWUEknBFBMKlBMIkxJVwAgSwFXIAhPAlcoAU4CUExQKExQSb1FAUEAB0m+RCJbRQIiRQRLAklXACBLAVcgCE8CVygBTgJQTFAoTFBJRQa9RQFBAAhLBL5EIltFBEsBFksEFlApTFCwI0M2GgFJFSUSRDYaAkkVJBJEFxZQSVcAIExXIAhQJwdMUEm9RQFAAImAgAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAClMULAjQ0m+REL/9DYaAUkVJRJENhoCSRUkEkQXFlBJVwAgTFcgCFAnB0xQSb1FAUAABCcSsABJvkQpTFCwI0M2GgFJFSUSRDYaAkkVJBJEFzYaA0kVIxJEIlOIBEsWKUxQsCNDIkkrRwI2GgFJFSUSRDYaAkkVJBJEFzYaA0kVIxJEIlNOAhZQSVcAIExXIAhQJwdMUEm9RQFAAAQnErAASb5MRQdEIkUDIkUFIkUESwOBBAxBAEZLAyULSwZMJVhJRQiBGFtBAB9LBCMIRQVLAUEAHUsGSSJbSwEkWwhMgRBbCEsDCEUDSwMjCEUEQv++SwYiW0sDCEUDQv/rSwRAAAgiFilMULAjQ0sCSwUKQv/xIjYaAUkVJRJENhoCSRUjEkQ2GgNHAiJZSU4CJAuBAghMFRJEJw8iSUsDDEEAY0sDVwIASwEkCyRYSwZMUEsFUElXACBLAVcgCE8CVygBTgJQTFAoTFBJRQi9RQFAABpLAUkiWSMIFlcGAFwAJxpQRQJJIwhFAUL/rksGvkRLAkkiWSMIFlcGAFwATFBFAkL/4ClLAlCwI0MiNhoBSRUlEkQ2GgJJFSMSRDYaA0cCIllJTgIkC4ECCEwVEkQnDyJJSwMMQQBaSwNXAgBLASQLJFhLBkxQSwVQSVcAIEsBVyAITwJXKAFOAlBMUChMUElFCL1FAUAADIAIRVJSOlNORkSwAEsGvkRLAkkiWSMIFlcGAFwATFBFAkkjCEUBQv+fKUsCULAjQyJJK0k2GgFJFSUSRDYaAkcCIllJTgKBEAuBAghMFRJENhoDSRUjEkQ2GgRJFSMSRCJTIklLBAxBAHpLBFcCAEsBgRALgRBYSUULIltJRQgWSwZMUEsDUElXACBLAVcgCE8CVygBTgJQTFAoTFBJRQq9RQFAAA0iJxMiTwJUKUxQsCNDSwi+RCJbRQhLAicJEkEAC0sFSwdLA4gB00UISwkkW0sID0EABCJC/8tJIwhFAUL/fyNC/782GgFHAiJZSU4CJAuBAghMFRJEJw8iSUsDDEEALEsDVwIASwFJTgIkCyRYJwhMUL5ESwNJIlkjCBZXBgBcAExQRQMjCEUBQv/NKUsCULAjQzYaAUkVJBJEFzEAIicQZUSABndhbGxldGVIcghEEkAADIAIRVJSOk5EQU+wACcQSwFnI0OKBACL/ScEEkEALYv/QQAUi/wWJwhMUEm+RCRbi/4IFiRMu4mL/BYnCExQSb5EJFuL/gkWJEy7iYv9KhJB/+SL/0EAFIv8FicITFBJvkQiW4v+CBYiTLuJi/wWJwhMUEm+RCJbi/4JFiJMu4mKAwMrSYv+VwgBSScOE0EADYv/i/6L/08FTwVPBYmL/iJbSYwBQABKi/1zAEyMAESL/yJbiwASQQANi/+L/ov/TwVPBU8FiTIHi/9XEAiLABZPAhZQTFCLARaL/UxQiwJQKExQSwG/i/6L/08FTwVPBYmL/YsBcABIjABC/7KKAgKL/1cACIv/VwgBUIv+UElXCSBLAVcACE8CVwgBTgJQTFAoTFBJvUUBQAAHJxqL/08CiYsAvkSL/ov/TwKI/0BISYz/TwKJigMBIkkrRwKL/haL/UxQSVcAIExXIAhQJwdMUEm9RQFAAAQijACJiwW+TIwBRCKMBCKMAiKMA4sDgQQMQQBGiwMlC4sBTCVYSYwAgRhbQQAfiwIjCIwCi/9BAB2LAEkiW0sBJFsITIEQWwiLBAiMBIsDIwiMA0L/vosAIluLBAiMBEL/64sCQAAEIowAiYsEiwIKjACJ", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
var StakingParamsFactory = class _StakingParamsFactory {
  /**
   * Gets available create ABI call param factories
   */
  static get create() {
    return {
      _resolveByMethod(params) {
        switch (params.method) {
          case "create":
          case "create(string,uint64)void":
            return _StakingParamsFactory.create.create(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs create ABI call params for the Staking smart contract using the create(string,uint64)void ABI method
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
   * Constructs a no op call for the init()void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static init(params) {
    return {
      ...params,
      method: "init()void",
      args: Array.isArray(params.args) ? params.args : []
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
   * Constructs a no op call for the stake(pay,uint8,uint64,uint64)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static stake(params) {
    return {
      ...params,
      method: "stake(pay,uint8,uint64,uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.type, params.args.amount, params.args.expiration]
    };
  }
  /**
   * Constructs a no op call for the stakeAsa(pay,axfer,uint8,uint64,uint64)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static stakeAsa(params) {
    return {
      ...params,
      method: "stakeAsa(pay,axfer,uint8,uint64,uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.assetXfer, params.args.type, params.args.amount, params.args.expiration]
    };
  }
  /**
   * Constructs a no op call for the withdraw(uint64,uint8)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static withdraw(params) {
    return {
      ...params,
      method: "withdraw(uint64,uint8)void",
      args: Array.isArray(params.args) ? params.args : [params.args.asset, params.args.type]
    };
  }
  /**
   * Constructs a no op call for the createHeartbeat(address,uint64)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static createHeartbeat(params) {
    return {
      ...params,
      method: "createHeartbeat(address,uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.address, params.args.asset]
    };
  }
  /**
   * Constructs a no op call for the softCheck(address,uint64)(bool,uint64) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static softCheck(params) {
    return {
      ...params,
      method: "softCheck(address,uint64)(bool,uint64)",
      args: Array.isArray(params.args) ? params.args : [params.args.address, params.args.asset]
    };
  }
  /**
   * Constructs a no op call for the updateSettings(pay,uint64,uint64)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static updateSettings(params) {
    return {
      ...params,
      method: "updateSettings(pay,uint64,uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.asset, params.args.value]
    };
  }
  /**
   * Constructs a no op call for the optInCost()uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static optInCost(params) {
    return {
      ...params,
      method: "optInCost()uint64",
      args: Array.isArray(params.args) ? params.args : []
    };
  }
  /**
   * Constructs a no op call for the stakeCost(uint64,uint8)uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static stakeCost(params) {
    return {
      ...params,
      method: "stakeCost(uint64,uint8)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.asset, params.args.type]
    };
  }
  /**
   * Constructs a no op call for the getTimeLeft(address,uint64)uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static getTimeLeft(params) {
    return {
      ...params,
      method: "getTimeLeft(address,uint64)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.address, params.args.asset]
    };
  }
  /**
   * Constructs a no op call for the mustGetTimeLeft(address,uint64)uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static mustGetTimeLeft(params) {
    return {
      ...params,
      method: "mustGetTimeLeft(address,uint64)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.address, params.args.asset]
    };
  }
  /**
   * Constructs a no op call for the getInfo(address,(uint64,uint8))(uint64,uint64,uint64) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static getInfo(params) {
    return {
      ...params,
      method: "getInfo(address,(uint64,uint8))(uint64,uint64,uint64)",
      args: Array.isArray(params.args) ? params.args : [params.args.address, params.args.stake]
    };
  }
  /**
   * Constructs a no op call for the mustGetInfo(address,(uint64,uint8))(uint64,uint64,uint64) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static mustGetInfo(params) {
    return {
      ...params,
      method: "mustGetInfo(address,(uint64,uint8))(uint64,uint64,uint64)",
      args: Array.isArray(params.args) ? params.args : [params.args.address, params.args.stake]
    };
  }
  /**
   * Constructs a no op call for the getInfoAtLeast(address,(uint64,uint8))(uint64,uint64,uint64)[] ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static getInfoAtLeast(params) {
    return {
      ...params,
      method: "getInfoAtLeast(address,(uint64,uint8))(uint64,uint64,uint64)[]",
      args: Array.isArray(params.args) ? params.args : [params.args.address, params.args.stake]
    };
  }
  /**
   * Constructs a no op call for the getEscrowInfo(address,uint64)(uint64,uint64) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static getEscrowInfo(params) {
    return {
      ...params,
      method: "getEscrowInfo(address,uint64)(uint64,uint64)",
      args: Array.isArray(params.args) ? params.args : [params.args.address, params.args.asset]
    };
  }
  /**
   * Constructs a no op call for the getHeartbeat(address,uint64)(uint64,uint64,uint64,uint64)[4] ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static getHeartbeat(params) {
    return {
      ...params,
      method: "getHeartbeat(address,uint64)(uint64,uint64,uint64,uint64)[4]",
      args: Array.isArray(params.args) ? params.args : [params.args.address, params.args.asset]
    };
  }
  /**
   * Constructs a no op call for the mustGetHeartbeat(address,uint64)(uint64,uint64,uint64,uint64)[4] ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static mustGetHeartbeat(params) {
    return {
      ...params,
      method: "mustGetHeartbeat(address,uint64)(uint64,uint64,uint64,uint64)[4]",
      args: Array.isArray(params.args) ? params.args : [params.args.address, params.args.asset]
    };
  }
  /**
   * Constructs a no op call for the getHeartbeatAverage(address,uint64,bool)uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static getHeartbeatAverage(params) {
    return {
      ...params,
      method: "getHeartbeatAverage(address,uint64,bool)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.address, params.args.asset, params.args.includeEscrowed]
    };
  }
  /**
   * Constructs a no op call for the mustGetHeartbeatAverage(address,uint64,bool)uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static mustGetHeartbeatAverage(params) {
    return {
      ...params,
      method: "mustGetHeartbeatAverage(address,uint64,bool)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.address, params.args.asset, params.args.includeEscrowed]
    };
  }
  /**
   * Constructs a no op call for the getInfoList(address,uint8,uint64[])(uint64,uint64,uint64)[] ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static getInfoList(params) {
    return {
      ...params,
      method: "getInfoList(address,uint8,uint64[])(uint64,uint64,uint64)[]",
      args: Array.isArray(params.args) ? params.args : [params.args.address, params.args.type, params.args.assets]
    };
  }
  /**
   * Constructs a no op call for the mustGetInfoList(address,uint8,uint64[])(uint64,uint64,uint64)[] ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static mustGetInfoList(params) {
    return {
      ...params,
      method: "mustGetInfoList(address,uint8,uint64[])(uint64,uint64,uint64)[]",
      args: Array.isArray(params.args) ? params.args : [params.args.address, params.args.type, params.args.assets]
    };
  }
  /**
   * Constructs a no op call for the stakeCheck(address,(uint64,uint64)[],uint8,bool)bool ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static stakeCheck(params) {
    return {
      ...params,
      method: "stakeCheck(address,(uint64,uint64)[],uint8,bool)bool",
      args: Array.isArray(params.args) ? params.args : [params.args.address, params.args.checks, params.args.type, params.args.includeEscrowed]
    };
  }
  /**
   * Constructs a no op call for the getTotals(uint64[])(uint64,uint64)[] ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static getTotals(params) {
    return {
      ...params,
      method: "getTotals(uint64[])(uint64,uint64)[]",
      args: Array.isArray(params.args) ? params.args : [params.args.assets]
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
var StakingFactory = class {
  /**
   * The underlying `AppFactory` for when you want to have more flexibility
   */
  appFactory;
  /**
   * Creates a new instance of `StakingFactory`
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
    return new StakingClient(this.appFactory.getAppClientById(params));
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
    return new StakingClient(await this.appFactory.getAppClientByCreatorAndName(params));
  }
  /**
   * Idempotently deploys the Staking smart contract.
   *
   * @param params The arguments for the contract calls and any additional parameters for the call
   * @returns The deployment result
   */
  async deploy(params = {}) {
    var _a;
    const result = await this.appFactory.deploy({
      ...params,
      createParams: ((_a = params.createParams) == null ? void 0 : _a.method) ? StakingParamsFactory.create._resolveByMethod(params.createParams) : params.createParams ? params.createParams : void 0
    });
    return { result: result.result, appClient: new StakingClient(result.appClient) };
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
       * Creates a new instance of the Staking smart contract using the create(string,uint64)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create params
       */
      create: (params) => {
        return this.appFactory.params.create(StakingParamsFactory.create.create(params));
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
       * Creates a new instance of the Staking smart contract using the create(string,uint64)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create transaction
       */
      create: (params) => {
        return this.appFactory.createTransaction.create(StakingParamsFactory.create.create(params));
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
       * Creates a new instance of the Staking smart contract using an ABI method call using the create(string,uint64)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create result
       */
      create: async (params) => {
        const result = await this.appFactory.send.create(StakingParamsFactory.create.create(params));
        return { result: { ...result.result, return: result.result.return }, appClient: new StakingClient(result.appClient) };
      }
    }
  };
};
var StakingClient = class _StakingClient {
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
   * Returns a new `StakingClient` client, resolving the app by creator address and name
   * using AlgoKit app deployment semantics (i.e. looking for the app creation transaction note).
   * @param params The parameters to create the app client
   */
  static async fromCreatorAndName(params) {
    return new _StakingClient(await _AppClient.fromCreatorAndName({ ...params, appSpec: APP_SPEC }));
  }
  /**
   * Returns an `StakingClient` instance for the current network based on
   * pre-determined network-specific app IDs specified in the ARC-56 app spec.
   *
   * If no IDs are in the app spec or the network isn't recognised, an error is thrown.
   * @param params The parameters to create the app client
   */
  static async fromNetwork(params) {
    return new _StakingClient(await _AppClient.fromNetwork({ ...params, appSpec: APP_SPEC }));
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
     * Makes a clear_state call to an existing instance of the Staking smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.params.bare.clearState(params);
    },
    /**
     * Makes a call to the Staking smart contract using the `init()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    init: (params = { args: [] }) => {
      return this.appClient.params.call(StakingParamsFactory.init(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `optIn(pay,uint64)void` ABI method.
     *
     * optin tells the contract to opt into an asa
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    optIn: (params) => {
      return this.appClient.params.call(StakingParamsFactory.optIn(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `stake(pay,uint8,uint64,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    stake: (params) => {
      return this.appClient.params.call(StakingParamsFactory.stake(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `stakeAsa(pay,axfer,uint8,uint64,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    stakeAsa: (params) => {
      return this.appClient.params.call(StakingParamsFactory.stakeAsa(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `withdraw(uint64,uint8)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    withdraw: (params) => {
      return this.appClient.params.call(StakingParamsFactory.withdraw(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `createHeartbeat(address,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    createHeartbeat: (params) => {
      return this.appClient.params.call(StakingParamsFactory.createHeartbeat(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `softCheck(address,uint64)(bool,uint64)` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    softCheck: (params) => {
      return this.appClient.params.call(StakingParamsFactory.softCheck(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `updateSettings(pay,uint64,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    updateSettings: (params) => {
      return this.appClient.params.call(StakingParamsFactory.updateSettings(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `optInCost()uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    optInCost: (params = { args: [] }) => {
      return this.appClient.params.call(StakingParamsFactory.optInCost(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `stakeCost(uint64,uint8)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    stakeCost: (params) => {
      return this.appClient.params.call(StakingParamsFactory.stakeCost(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `getTimeLeft(address,uint64)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    getTimeLeft: (params) => {
      return this.appClient.params.call(StakingParamsFactory.getTimeLeft(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `mustGetTimeLeft(address,uint64)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    mustGetTimeLeft: (params) => {
      return this.appClient.params.call(StakingParamsFactory.mustGetTimeLeft(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `getInfo(address,(uint64,uint8))(uint64,uint64,uint64)` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    getInfo: (params) => {
      return this.appClient.params.call(StakingParamsFactory.getInfo(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `mustGetInfo(address,(uint64,uint8))(uint64,uint64,uint64)` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    mustGetInfo: (params) => {
      return this.appClient.params.call(StakingParamsFactory.mustGetInfo(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `getInfoAtLeast(address,(uint64,uint8))(uint64,uint64,uint64)[]` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    getInfoAtLeast: (params) => {
      return this.appClient.params.call(StakingParamsFactory.getInfoAtLeast(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `getEscrowInfo(address,uint64)(uint64,uint64)` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    getEscrowInfo: (params) => {
      return this.appClient.params.call(StakingParamsFactory.getEscrowInfo(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `getHeartbeat(address,uint64)(uint64,uint64,uint64,uint64)[4]` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    getHeartbeat: (params) => {
      return this.appClient.params.call(StakingParamsFactory.getHeartbeat(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `mustGetHeartbeat(address,uint64)(uint64,uint64,uint64,uint64)[4]` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    mustGetHeartbeat: (params) => {
      return this.appClient.params.call(StakingParamsFactory.mustGetHeartbeat(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `getHeartbeatAverage(address,uint64,bool)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    getHeartbeatAverage: (params) => {
      return this.appClient.params.call(StakingParamsFactory.getHeartbeatAverage(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `mustGetHeartbeatAverage(address,uint64,bool)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    mustGetHeartbeatAverage: (params) => {
      return this.appClient.params.call(StakingParamsFactory.mustGetHeartbeatAverage(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `getInfoList(address,uint8,uint64[])(uint64,uint64,uint64)[]` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    getInfoList: (params) => {
      return this.appClient.params.call(StakingParamsFactory.getInfoList(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `mustGetInfoList(address,uint8,uint64[])(uint64,uint64,uint64)[]` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    mustGetInfoList: (params) => {
      return this.appClient.params.call(StakingParamsFactory.mustGetInfoList(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `stakeCheck(address,(uint64,uint64)[],uint8,bool)bool` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    stakeCheck: (params) => {
      return this.appClient.params.call(StakingParamsFactory.stakeCheck(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `getTotals(uint64[])(uint64,uint64)[]` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    getTotals: (params) => {
      return this.appClient.params.call(StakingParamsFactory.getTotals(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    updateAkitaDao: (params) => {
      return this.appClient.params.call(StakingParamsFactory.updateAkitaDao(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    opUp: (params = { args: [] }) => {
      return this.appClient.params.call(StakingParamsFactory.opUp(params));
    }
  };
  /**
   * Create transactions for the current app
   */
  createTransaction = {
    /**
     * Makes a clear_state call to an existing instance of the Staking smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.createTransaction.bare.clearState(params);
    },
    /**
     * Makes a call to the Staking smart contract using the `init()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    init: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(StakingParamsFactory.init(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `optIn(pay,uint64)void` ABI method.
     *
     * optin tells the contract to opt into an asa
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    optIn: (params) => {
      return this.appClient.createTransaction.call(StakingParamsFactory.optIn(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `stake(pay,uint8,uint64,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    stake: (params) => {
      return this.appClient.createTransaction.call(StakingParamsFactory.stake(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `stakeAsa(pay,axfer,uint8,uint64,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    stakeAsa: (params) => {
      return this.appClient.createTransaction.call(StakingParamsFactory.stakeAsa(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `withdraw(uint64,uint8)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    withdraw: (params) => {
      return this.appClient.createTransaction.call(StakingParamsFactory.withdraw(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `createHeartbeat(address,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    createHeartbeat: (params) => {
      return this.appClient.createTransaction.call(StakingParamsFactory.createHeartbeat(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `softCheck(address,uint64)(bool,uint64)` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    softCheck: (params) => {
      return this.appClient.createTransaction.call(StakingParamsFactory.softCheck(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `updateSettings(pay,uint64,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    updateSettings: (params) => {
      return this.appClient.createTransaction.call(StakingParamsFactory.updateSettings(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `optInCost()uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    optInCost: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(StakingParamsFactory.optInCost(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `stakeCost(uint64,uint8)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    stakeCost: (params) => {
      return this.appClient.createTransaction.call(StakingParamsFactory.stakeCost(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `getTimeLeft(address,uint64)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    getTimeLeft: (params) => {
      return this.appClient.createTransaction.call(StakingParamsFactory.getTimeLeft(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `mustGetTimeLeft(address,uint64)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    mustGetTimeLeft: (params) => {
      return this.appClient.createTransaction.call(StakingParamsFactory.mustGetTimeLeft(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `getInfo(address,(uint64,uint8))(uint64,uint64,uint64)` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    getInfo: (params) => {
      return this.appClient.createTransaction.call(StakingParamsFactory.getInfo(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `mustGetInfo(address,(uint64,uint8))(uint64,uint64,uint64)` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    mustGetInfo: (params) => {
      return this.appClient.createTransaction.call(StakingParamsFactory.mustGetInfo(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `getInfoAtLeast(address,(uint64,uint8))(uint64,uint64,uint64)[]` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    getInfoAtLeast: (params) => {
      return this.appClient.createTransaction.call(StakingParamsFactory.getInfoAtLeast(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `getEscrowInfo(address,uint64)(uint64,uint64)` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    getEscrowInfo: (params) => {
      return this.appClient.createTransaction.call(StakingParamsFactory.getEscrowInfo(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `getHeartbeat(address,uint64)(uint64,uint64,uint64,uint64)[4]` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    getHeartbeat: (params) => {
      return this.appClient.createTransaction.call(StakingParamsFactory.getHeartbeat(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `mustGetHeartbeat(address,uint64)(uint64,uint64,uint64,uint64)[4]` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    mustGetHeartbeat: (params) => {
      return this.appClient.createTransaction.call(StakingParamsFactory.mustGetHeartbeat(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `getHeartbeatAverage(address,uint64,bool)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    getHeartbeatAverage: (params) => {
      return this.appClient.createTransaction.call(StakingParamsFactory.getHeartbeatAverage(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `mustGetHeartbeatAverage(address,uint64,bool)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    mustGetHeartbeatAverage: (params) => {
      return this.appClient.createTransaction.call(StakingParamsFactory.mustGetHeartbeatAverage(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `getInfoList(address,uint8,uint64[])(uint64,uint64,uint64)[]` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    getInfoList: (params) => {
      return this.appClient.createTransaction.call(StakingParamsFactory.getInfoList(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `mustGetInfoList(address,uint8,uint64[])(uint64,uint64,uint64)[]` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    mustGetInfoList: (params) => {
      return this.appClient.createTransaction.call(StakingParamsFactory.mustGetInfoList(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `stakeCheck(address,(uint64,uint64)[],uint8,bool)bool` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    stakeCheck: (params) => {
      return this.appClient.createTransaction.call(StakingParamsFactory.stakeCheck(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `getTotals(uint64[])(uint64,uint64)[]` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    getTotals: (params) => {
      return this.appClient.createTransaction.call(StakingParamsFactory.getTotals(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    updateAkitaDao: (params) => {
      return this.appClient.createTransaction.call(StakingParamsFactory.updateAkitaDao(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    opUp: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(StakingParamsFactory.opUp(params));
    }
  };
  /**
   * Send calls to the current app
   */
  send = {
    /**
     * Makes a clear_state call to an existing instance of the Staking smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.send.bare.clearState(params);
    },
    /**
     * Makes a call to the Staking smart contract using the `init()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    init: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(StakingParamsFactory.init(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Staking smart contract using the `optIn(pay,uint64)void` ABI method.
     *
     * optin tells the contract to opt into an asa
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    optIn: async (params) => {
      const result = await this.appClient.send.call(StakingParamsFactory.optIn(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Staking smart contract using the `stake(pay,uint8,uint64,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    stake: async (params) => {
      const result = await this.appClient.send.call(StakingParamsFactory.stake(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Staking smart contract using the `stakeAsa(pay,axfer,uint8,uint64,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    stakeAsa: async (params) => {
      const result = await this.appClient.send.call(StakingParamsFactory.stakeAsa(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Staking smart contract using the `withdraw(uint64,uint8)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    withdraw: async (params) => {
      const result = await this.appClient.send.call(StakingParamsFactory.withdraw(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Staking smart contract using the `createHeartbeat(address,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    createHeartbeat: async (params) => {
      const result = await this.appClient.send.call(StakingParamsFactory.createHeartbeat(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Staking smart contract using the `softCheck(address,uint64)(bool,uint64)` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    softCheck: async (params) => {
      const result = await this.appClient.send.call(StakingParamsFactory.softCheck(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Staking smart contract using the `updateSettings(pay,uint64,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    updateSettings: async (params) => {
      const result = await this.appClient.send.call(StakingParamsFactory.updateSettings(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Staking smart contract using the `optInCost()uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    optInCost: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(StakingParamsFactory.optInCost(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Staking smart contract using the `stakeCost(uint64,uint8)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    stakeCost: async (params) => {
      const result = await this.appClient.send.call(StakingParamsFactory.stakeCost(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Staking smart contract using the `getTimeLeft(address,uint64)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    getTimeLeft: async (params) => {
      const result = await this.appClient.send.call(StakingParamsFactory.getTimeLeft(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Staking smart contract using the `mustGetTimeLeft(address,uint64)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    mustGetTimeLeft: async (params) => {
      const result = await this.appClient.send.call(StakingParamsFactory.mustGetTimeLeft(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Staking smart contract using the `getInfo(address,(uint64,uint8))(uint64,uint64,uint64)` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    getInfo: async (params) => {
      const result = await this.appClient.send.call(StakingParamsFactory.getInfo(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Staking smart contract using the `mustGetInfo(address,(uint64,uint8))(uint64,uint64,uint64)` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    mustGetInfo: async (params) => {
      const result = await this.appClient.send.call(StakingParamsFactory.mustGetInfo(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Staking smart contract using the `getInfoAtLeast(address,(uint64,uint8))(uint64,uint64,uint64)[]` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    getInfoAtLeast: async (params) => {
      const result = await this.appClient.send.call(StakingParamsFactory.getInfoAtLeast(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Staking smart contract using the `getEscrowInfo(address,uint64)(uint64,uint64)` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    getEscrowInfo: async (params) => {
      const result = await this.appClient.send.call(StakingParamsFactory.getEscrowInfo(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Staking smart contract using the `getHeartbeat(address,uint64)(uint64,uint64,uint64,uint64)[4]` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    getHeartbeat: async (params) => {
      const result = await this.appClient.send.call(StakingParamsFactory.getHeartbeat(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Staking smart contract using the `mustGetHeartbeat(address,uint64)(uint64,uint64,uint64,uint64)[4]` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    mustGetHeartbeat: async (params) => {
      const result = await this.appClient.send.call(StakingParamsFactory.mustGetHeartbeat(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Staking smart contract using the `getHeartbeatAverage(address,uint64,bool)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    getHeartbeatAverage: async (params) => {
      const result = await this.appClient.send.call(StakingParamsFactory.getHeartbeatAverage(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Staking smart contract using the `mustGetHeartbeatAverage(address,uint64,bool)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    mustGetHeartbeatAverage: async (params) => {
      const result = await this.appClient.send.call(StakingParamsFactory.mustGetHeartbeatAverage(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Staking smart contract using the `getInfoList(address,uint8,uint64[])(uint64,uint64,uint64)[]` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    getInfoList: async (params) => {
      const result = await this.appClient.send.call(StakingParamsFactory.getInfoList(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Staking smart contract using the `mustGetInfoList(address,uint8,uint64[])(uint64,uint64,uint64)[]` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    mustGetInfoList: async (params) => {
      const result = await this.appClient.send.call(StakingParamsFactory.mustGetInfoList(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Staking smart contract using the `stakeCheck(address,(uint64,uint64)[],uint8,bool)bool` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    stakeCheck: async (params) => {
      const result = await this.appClient.send.call(StakingParamsFactory.stakeCheck(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Staking smart contract using the `getTotals(uint64[])(uint64,uint64)[]` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    getTotals: async (params) => {
      const result = await this.appClient.send.call(StakingParamsFactory.getTotals(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Staking smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    updateAkitaDao: async (params) => {
      const result = await this.appClient.send.call(StakingParamsFactory.updateAkitaDao(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Staking smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    opUp: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(StakingParamsFactory.opUp(params));
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
    return new _StakingClient(this.appClient.clone(params));
  }
  /**
   * Makes a readonly (simulated) call to the Staking smart contract using the `optInCost()uint64` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async optInCost(params = { args: [] }) {
    const result = await this.appClient.send.call(StakingParamsFactory.optInCost(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Staking smart contract using the `stakeCost(uint64,uint8)uint64` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async stakeCost(params) {
    const result = await this.appClient.send.call(StakingParamsFactory.stakeCost(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Staking smart contract using the `getTimeLeft(address,uint64)uint64` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async getTimeLeft(params) {
    const result = await this.appClient.send.call(StakingParamsFactory.getTimeLeft(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Staking smart contract using the `mustGetTimeLeft(address,uint64)uint64` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async mustGetTimeLeft(params) {
    const result = await this.appClient.send.call(StakingParamsFactory.mustGetTimeLeft(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Staking smart contract using the `getInfo(address,(uint64,uint8))(uint64,uint64,uint64)` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async getInfo(params) {
    const result = await this.appClient.send.call(StakingParamsFactory.getInfo(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Staking smart contract using the `mustGetInfo(address,(uint64,uint8))(uint64,uint64,uint64)` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async mustGetInfo(params) {
    const result = await this.appClient.send.call(StakingParamsFactory.mustGetInfo(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Staking smart contract using the `getInfoAtLeast(address,(uint64,uint8))(uint64,uint64,uint64)[]` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async getInfoAtLeast(params) {
    const result = await this.appClient.send.call(StakingParamsFactory.getInfoAtLeast(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Staking smart contract using the `getEscrowInfo(address,uint64)(uint64,uint64)` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async getEscrowInfo(params) {
    const result = await this.appClient.send.call(StakingParamsFactory.getEscrowInfo(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Staking smart contract using the `getHeartbeat(address,uint64)(uint64,uint64,uint64,uint64)[4]` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async getHeartbeat(params) {
    const result = await this.appClient.send.call(StakingParamsFactory.getHeartbeat(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Staking smart contract using the `mustGetHeartbeat(address,uint64)(uint64,uint64,uint64,uint64)[4]` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async mustGetHeartbeat(params) {
    const result = await this.appClient.send.call(StakingParamsFactory.mustGetHeartbeat(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Staking smart contract using the `getHeartbeatAverage(address,uint64,bool)uint64` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async getHeartbeatAverage(params) {
    const result = await this.appClient.send.call(StakingParamsFactory.getHeartbeatAverage(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Staking smart contract using the `mustGetHeartbeatAverage(address,uint64,bool)uint64` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async mustGetHeartbeatAverage(params) {
    const result = await this.appClient.send.call(StakingParamsFactory.mustGetHeartbeatAverage(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Staking smart contract using the `getInfoList(address,uint8,uint64[])(uint64,uint64,uint64)[]` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async getInfoList(params) {
    const result = await this.appClient.send.call(StakingParamsFactory.getInfoList(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Staking smart contract using the `mustGetInfoList(address,uint8,uint64[])(uint64,uint64,uint64)[]` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async mustGetInfoList(params) {
    const result = await this.appClient.send.call(StakingParamsFactory.mustGetInfoList(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Staking smart contract using the `stakeCheck(address,(uint64,uint64)[],uint8,bool)bool` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async stakeCheck(params) {
    const result = await this.appClient.send.call(StakingParamsFactory.stakeCheck(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Staking smart contract using the `getTotals(uint64[])(uint64,uint64)[]` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async getTotals(params) {
    const result = await this.appClient.send.call(StakingParamsFactory.getTotals(params));
    return result.return;
  }
  /**
   * Methods to access state for the current Staking app
   */
  state = {
    /**
     * Methods to access global state for the current Staking app
     */
    global: {
      /**
       * Get all current keyed values from global state
       */
      getAll: async () => {
        const result = await this.appClient.state.global.getAll();
        return {
          heartbeatManagerAddress: result.heartbeatManagerAddress,
          version: result.version,
          akitaDao: result.akitaDAO
        };
      },
      /**
       * Get the current value of the heartbeatManagerAddress key in global state
       */
      heartbeatManagerAddress: async () => {
        return await this.appClient.state.global.getValue("heartbeatManagerAddress");
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
     * Methods to access box state for the current Staking app
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
       * Get values from the stakes map in box state
       */
      stakes: {
        /**
         * Get all current values of the stakes map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("stakes");
        },
        /**
         * Get a current value of the stakes map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("stakes", key);
        }
      },
      /**
       * Get values from the heartbeats map in box state
       */
      heartbeats: {
        /**
         * Get all current values of the heartbeats map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("heartbeats");
        },
        /**
         * Get a current value of the heartbeats map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("heartbeats", key);
        }
      },
      /**
       * Get values from the totals map in box state
       */
      totals: {
        /**
         * Get all current values of the totals map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("totals");
        },
        /**
         * Get a current value of the totals map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("totals", key);
        }
      },
      /**
       * Get values from the settings map in box state
       */
      settings: {
        /**
         * Get all current values of the settings map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("settings");
        },
        /**
         * Get a current value of the settings map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("settings", key);
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
       * Add a init()void method call against the Staking contract
       */
      init(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.init(params)));
        return this;
      },
      /**
       * Add a optIn(pay,uint64)void method call against the Staking contract
       */
      optIn(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.optIn(params)));
        return this;
      },
      /**
       * Add a stake(pay,uint8,uint64,uint64)void method call against the Staking contract
       */
      stake(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.stake(params)));
        return this;
      },
      /**
       * Add a stakeAsa(pay,axfer,uint8,uint64,uint64)void method call against the Staking contract
       */
      stakeAsa(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.stakeAsa(params)));
        return this;
      },
      /**
       * Add a withdraw(uint64,uint8)void method call against the Staking contract
       */
      withdraw(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.withdraw(params)));
        return this;
      },
      /**
       * Add a createHeartbeat(address,uint64)void method call against the Staking contract
       */
      createHeartbeat(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.createHeartbeat(params)));
        return this;
      },
      /**
       * Add a softCheck(address,uint64)(bool,uint64) method call against the Staking contract
       */
      softCheck(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.softCheck(params)));
        return this;
      },
      /**
       * Add a updateSettings(pay,uint64,uint64)void method call against the Staking contract
       */
      updateSettings(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateSettings(params)));
        return this;
      },
      /**
       * Add a optInCost()uint64 method call against the Staking contract
       */
      optInCost(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.optInCost(params)));
        return this;
      },
      /**
       * Add a stakeCost(uint64,uint8)uint64 method call against the Staking contract
       */
      stakeCost(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.stakeCost(params)));
        return this;
      },
      /**
       * Add a getTimeLeft(address,uint64)uint64 method call against the Staking contract
       */
      getTimeLeft(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getTimeLeft(params)));
        return this;
      },
      /**
       * Add a mustGetTimeLeft(address,uint64)uint64 method call against the Staking contract
       */
      mustGetTimeLeft(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.mustGetTimeLeft(params)));
        return this;
      },
      /**
       * Add a getInfo(address,(uint64,uint8))(uint64,uint64,uint64) method call against the Staking contract
       */
      getInfo(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getInfo(params)));
        return this;
      },
      /**
       * Add a mustGetInfo(address,(uint64,uint8))(uint64,uint64,uint64) method call against the Staking contract
       */
      mustGetInfo(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.mustGetInfo(params)));
        return this;
      },
      /**
       * Add a getInfoAtLeast(address,(uint64,uint8))(uint64,uint64,uint64)[] method call against the Staking contract
       */
      getInfoAtLeast(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getInfoAtLeast(params)));
        return this;
      },
      /**
       * Add a getEscrowInfo(address,uint64)(uint64,uint64) method call against the Staking contract
       */
      getEscrowInfo(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getEscrowInfo(params)));
        return this;
      },
      /**
       * Add a getHeartbeat(address,uint64)(uint64,uint64,uint64,uint64)[4] method call against the Staking contract
       */
      getHeartbeat(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getHeartbeat(params)));
        return this;
      },
      /**
       * Add a mustGetHeartbeat(address,uint64)(uint64,uint64,uint64,uint64)[4] method call against the Staking contract
       */
      mustGetHeartbeat(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.mustGetHeartbeat(params)));
        return this;
      },
      /**
       * Add a getHeartbeatAverage(address,uint64,bool)uint64 method call against the Staking contract
       */
      getHeartbeatAverage(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getHeartbeatAverage(params)));
        return this;
      },
      /**
       * Add a mustGetHeartbeatAverage(address,uint64,bool)uint64 method call against the Staking contract
       */
      mustGetHeartbeatAverage(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.mustGetHeartbeatAverage(params)));
        return this;
      },
      /**
       * Add a getInfoList(address,uint8,uint64[])(uint64,uint64,uint64)[] method call against the Staking contract
       */
      getInfoList(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getInfoList(params)));
        return this;
      },
      /**
       * Add a mustGetInfoList(address,uint8,uint64[])(uint64,uint64,uint64)[] method call against the Staking contract
       */
      mustGetInfoList(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.mustGetInfoList(params)));
        return this;
      },
      /**
       * Add a stakeCheck(address,(uint64,uint64)[],uint8,bool)bool method call against the Staking contract
       */
      stakeCheck(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.stakeCheck(params)));
        return this;
      },
      /**
       * Add a getTotals(uint64[])(uint64,uint64)[] method call against the Staking contract
       */
      getTotals(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getTotals(params)));
        return this;
      },
      /**
       * Add a updateAkitaDAO(uint64)void method call against the Staking contract
       */
      updateAkitaDao(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateAkitaDao(params)));
        return this;
      },
      /**
       * Add a opUp()void method call against the Staking contract
       */
      opUp(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.opUp(params)));
        return this;
      },
      /**
       * Add a clear state call to the Staking contract
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

// src/staking/types.ts
var StakingType = /* @__PURE__ */ ((StakingType2) => {
  StakingType2[StakingType2["Heartbeat"] = 10] = "Heartbeat";
  StakingType2[StakingType2["Soft"] = 20] = "Soft";
  StakingType2[StakingType2["Hard"] = 30] = "Hard";
  StakingType2[StakingType2["Lock"] = 40] = "Lock";
  return StakingType2;
})(StakingType || {});

// src/staking/errors.ts
var STAKING_ERROR_MESSAGES = {
  // --- Lock lifecycle -----------------------------------------------------
  NLCK: "Lock not found",
  LOCK: "This asset is still locked",
  BEXP: "Expiration must be in the future or hardlock disabled",
  BEXU: "Expiration must be greater than or equal to the current unlock time or hardlock disabled",
  // --- Stake lifecycle ----------------------------------------------------
  SNFD: "Stake not found",
  SNEX: "Stake does not exist",
  BAMH: "Insufficient amount held",
  IBAL: "Insufficient balance",
  WHOL: "Withdraw is only for hard or lock",
  // --- Heartbeat ----------------------------------------------------------
  HBCU: "Heartbeat stakes cannot be updated",
  NHBM: "Only the heartbeat manager can call this method",
  HBNF: "Heartbeat not found"
};
var translateStakingError = makeErrorTranslator(STAKING_ERROR_MESSAGES);

// src/staking/index.ts
var StakingSDK = class extends BaseSDK {
  constructor(params) {
    super({ factory: StakingFactory, ...params }, ENV_VAR_NAMES.STAKING_APP_ID);
  }
  async softCheck({ address, asset }) {
    const { return: result } = await this.client.send.softCheck({
      args: { address, asset }
    });
    if (result === void 0) {
      throw new Error("Failed to perform soft check");
    }
    return result;
  }
  async getTimeLeft({ address, asset }) {
    const { return: timeLeft } = await this.client.send.getTimeLeft({
      args: { address, asset }
    });
    return timeLeft ?? 0n;
  }
  async mustGetTimeLeft({ address, asset }) {
    const { return: timeLeft } = await this.client.send.mustGetTimeLeft({
      args: { address, asset }
    });
    if (timeLeft === void 0) {
      throw new Error("No active stake found");
    }
    return timeLeft;
  }
  /**
   * Gets stake info for an address and stake type.
   * Returns undefined if no stake exists.
   */
  async getInfo({ address, stake }) {
    return await this.client.getInfo({
      args: { address, stake }
    });
  }
  /**
   * Gets stake info for an address and stake type.
   * Throws if no stake exists.
   */
  async mustGetInfo({ address, stake }) {
    const { return: info } = await this.client.send.mustGetInfo({
      args: { address, stake }
    });
    if (info === void 0) {
      throw new Error("No stake info found");
    }
    return info;
  }
  /**
   * Gets escrow info for an address and asset.
   */
  async getEscrowInfo({ address, asset }) {
    const { return: info } = await this.client.send.getEscrowInfo({
      args: { address, asset }
    });
    return info;
  }
  /**
   * Gets heartbeat data for an address and asset.
   * Returns an array of heartbeat entries.
   */
  async getHeartbeat({ address, asset }) {
    const { return: heartbeats } = await this.client.send.getHeartbeat({
      args: { address, asset }
    });
    if (!heartbeats) {
      return [];
    }
    return heartbeats.map(([timestamp, balance, escrowed, average]) => ({
      timestamp,
      balance,
      escrowed,
      average
    }));
  }
  /**
   * Gets heartbeat data for an address and asset.
   * Throws if no heartbeat exists.
   */
  async mustGetHeartbeat({ address, asset }) {
    const { return: heartbeats } = await this.client.send.mustGetHeartbeat({
      args: { address, asset }
    });
    if (heartbeats === void 0) {
      throw new Error("No heartbeat found");
    }
    return heartbeats.map(([timestamp, balance, escrowed, average]) => ({
      timestamp,
      balance,
      escrowed,
      average
    }));
  }
  /**
   * Gets the average heartbeat value for an address and asset.
   */
  async getHeartbeatAverage({ address, asset, includeEscrowed }) {
    const { return: average } = await this.client.send.getHeartbeatAverage({
      args: { address, asset, includeEscrowed }
    });
    return average ?? 0n;
  }
  /**
   * Gets the average heartbeat value for an address and asset.
   * Throws if no heartbeat exists.
   */
  async mustGetHeartbeatAverage({ address, asset, includeEscrowed }) {
    const { return: average } = await this.client.send.mustGetHeartbeatAverage({
      args: { address, asset, includeEscrowed }
    });
    if (average === void 0) {
      throw new Error("No heartbeat average found");
    }
    return average;
  }
  /**
   * Gets stake info for multiple assets at once.
   */
  async getInfoList({ address, type, assets }) {
    const { return: infoList } = await this.client.send.getInfoList({
      args: { address, type, assets }
    });
    if (!infoList) {
      return [];
    }
    return infoList.map(([amount, lastUpdate, expiration]) => ({
      amount,
      lastUpdate,
      expiration
    }));
  }
  /**
   * Gets stake info for multiple assets at once.
   * Throws if any stake doesn't exist.
   */
  async mustGetInfoList({ address, type, assets }) {
    const { return: infoList } = await this.client.send.mustGetInfoList({
      args: { address, type, assets }
    });
    if (infoList === void 0) {
      throw new Error("Failed to get info list");
    }
    return infoList.map(([amount, lastUpdate, expiration]) => ({
      amount,
      lastUpdate,
      expiration
    }));
  }
  async stakeCheck({
    address,
    checks,
    type,
    includeEscrowed
  }) {
    const formattedChecks = checks.map((r) => [
      r.asset,
      r.amount
    ]);
    return await this.client.stakeCheck({
      args: {
        address,
        checks: formattedChecks,
        type,
        includeEscrowed
      }
    });
  }
  /**
   * Stakes an asset in the staking contract.
   * @param type - The staking type (Heartbeat, Soft, Hard, Lock)
   * @param asset - The asset ID to stake
   * @param amount - The amount to stake
   * @param expiration - The expiration timestamp (for Hard/Lock staking)
   */
  async stake(args) {
    const { sender, signer, type, asset = 0n, amount } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const isEscrowed = type === 30 /* Hard */ || type === 40 /* Lock */;
    let expiration;
    if (isEscrowed) {
      if (args.expiration < BigInt(Date.now() / 1e3)) {
        throw new Error("Expiration must be in the future");
      }
      expiration = args.expiration;
    } else {
      expiration = 0n;
    }
    const cost = await this.stakeCost(asset, type);
    if (asset === 0n) {
      const total = microAlgo(isEscrowed ? cost + amount : cost);
      const payment = this.client.algorand.createTransaction.payment({
        ...sendParams,
        amount: total,
        receiver: this.client.appAddress
      });
      await this.client.send.stake({
        ...sendParams,
        args: {
          payment,
          type,
          amount,
          expiration
        }
      });
    } else {
      const payment = this.client.algorand.createTransaction.payment({
        ...sendParams,
        amount: microAlgo(cost),
        receiver: this.client.appAddress
      });
      const assetXfer = this.client.algorand.createTransaction.assetTransfer({
        ...sendParams,
        amount,
        assetId: asset,
        receiver: this.client.appAddress
      });
      await this.client.send.stakeAsa({
        ...sendParams,
        args: {
          payment,
          assetXfer,
          type,
          amount,
          expiration
        }
      });
    }
  }
  /**
   * Withdraws a stake from the contract.
   * @param asset - The asset ID (0 for ALGO)
   * @param type - The staking type
   */
  async withdraw({ sender, signer, asset, type }) {
    return await this.client.send.withdraw({
      ...this.getSendParams({ sender, signer }),
      args: { asset, type }
    });
  }
  /**
   * Creates a heartbeat entry for tracking stake history.
   * @param address - The address to create heartbeat for
   * @param asset - The asset ID (0 for ALGO)
   */
  async createHeartbeat({ sender, signer, address, asset }) {
    return await this.client.send.createHeartbeat({
      ...this.getSendParams({ sender, signer }),
      args: { address, asset }
    });
  }
  /**
   * Updates settings for a stake (e.g., extending expiration).
   * @param asset - The asset ID
   * @param value - The new value/setting
   */
  async updateSettings({ sender, signer, asset, value }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const payment = this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: microAlgo(0),
      // May need adjustment based on operation
      receiver: this.client.appAddress
    });
    await this.client.send.updateSettings({
      ...sendParams,
      args: {
        payment,
        asset,
        value
      }
    });
  }
  async optIn({ sender, signer, asset }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const cost = await this.optInCost();
    const payment = this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: microAlgo(cost),
      receiver: this.client.appAddress
    });
    await this.client.send.optIn({
      ...sendParams,
      args: { payment, asset }
    });
  }
  async optInCost() {
    return await this.client.optInCost();
  }
  async stakeCost(asset, type) {
    return await this.client.stakeCost({
      args: { asset, type }
    });
  }
  async getTotals(assets) {
    return await this.client.getTotals({
      args: { assets }
    });
  }
};

export {
  StakingType,
  STAKING_ERROR_MESSAGES,
  translateStakingError,
  StakingSDK
};
//# sourceMappingURL=chunk-4SLXREOB.mjs.map
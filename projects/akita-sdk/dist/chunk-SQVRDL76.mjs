import {
  makeErrorTranslator,
  withErrorCodeAliases
} from "./chunk-GOQ4H3PG.mjs";
import {
  BaseSDK
} from "./chunk-LAW6GIX3.mjs";
import {
  ENV_VAR_NAMES
} from "./chunk-PZ5SMDC2.mjs";

// src/rewards/index.ts
import { microAlgo } from "@algorandfoundation/algokit-utils";
import { ABIMethod, ABIType, Address, ALGORAND_ZERO_ADDRESS_STRING } from "algosdk";

// src/generated/RewardsClient.ts
import { getArc56ReturnValue, getABIStructFromABITuple } from "@algorandfoundation/algokit-utils/types/app-arc56";
import {
  AppClient as _AppClient
} from "@algorandfoundation/algokit-utils/types/app-client";
import { AppFactory as _AppFactory } from "@algorandfoundation/algokit-utils/types/app-factory";
var APP_SPEC = { "name": "Rewards", "structs": { "DisbursementDetails": [{ "name": "creator", "type": "address" }, { "name": "finalized", "type": "bool" }, { "name": "title", "type": "string" }, { "name": "amount", "type": "uint64" }, { "name": "timeToUnlock", "type": "uint64" }, { "name": "expiration", "type": "uint64" }, { "name": "allocations", "type": "uint64" }, { "name": "distributed", "type": "uint64" }, { "name": "mbrCredits", "type": "uint64" }, { "name": "reclaimTo", "type": "address" }, { "name": "note", "type": "string" }], "RewardsMBRData": [{ "name": "disbursements", "type": "uint64" }, { "name": "userAllocations", "type": "uint64" }], "UserAllocationsKey": [{ "name": "address", "type": "address" }, { "name": "asset", "type": "uint64" }, { "name": "disbursementId", "type": "uint64" }] }, "methods": [{ "name": "create", "args": [{ "type": "string", "name": "version" }, { "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "fundMbrCredits", "args": [{ "type": "uint64", "name": "id" }, { "type": "pay", "name": "payment" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "withdrawMbrCredits", "args": [{ "type": "uint64", "name": "id" }, { "type": "uint64", "name": "amount" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "createDisbursement", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "string", "name": "title" }, { "type": "uint64", "name": "timeToUnlock" }, { "type": "uint64", "name": "expiration" }, { "type": "string", "name": "note" }, { "type": "address", "name": "reclaimTo" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Opens a draft disbursement; allocations follow in batches, then `finalizeDisbursement`. After\n`expiration`, anyone may sweep what is unclaimed to a non-zero `reclaimTo` (`sweepExpired`).", "events": [], "recommendations": {} }, { "name": "createDisbursement", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "string", "name": "title" }, { "type": "uint64", "name": "timeToUnlock" }, { "type": "uint64", "name": "expiration" }, { "type": "string", "name": "note" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "The pre-reclaim-target selector: `createDisbursement` with no reclaim target.", "events": [], "recommendations": {} }, { "name": "editDisbursement", "args": [{ "type": "uint64", "name": "id" }, { "type": "string", "name": "title" }, { "type": "uint64", "name": "timeToUnlock" }, { "type": "uint64", "name": "expiration" }, { "type": "string", "name": "note" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "createUserAllocations", "args": [{ "type": "pay", "name": "payment" }, { "type": "uint64", "name": "id" }, { "type": "(address,uint64)[]", "name": "allocations" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "createAsaUserAllocations", "args": [{ "type": "axfer", "name": "assetXfer" }, { "type": "uint64", "name": "id" }, { "type": "(address,uint64)[]", "name": "allocations" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "createAsaDisbursementFromGroup", "args": [{ "type": "uint64", "name": "mbrPaymentIndex" }, { "type": "uint64", "name": "assetTransferStartIndex" }, { "type": "string", "name": "title" }, { "type": "uint64", "name": "timeToUnlock" }, { "type": "uint64", "name": "expiration" }, { "type": "string", "name": "note" }, { "type": "(address,uint64)[]", "name": "allocations" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Creates and finalizes a multi-ASA disbursement funded by the `allocations.length + 1`\ntransactions immediately before this call: one exact MBR payment from any payer, then one asset\ntransfer per allocation from the caller.\n\nThe index arguments are kept for ABI compatibility and must equal those positions. Binding\nthe funding to the slots directly before the call means no other call in the group (this\nmethod or any positional transaction argument) can reuse it (C-1).", "events": [], "recommendations": {} }, { "name": "finalizeDisbursement", "args": [{ "type": "uint64", "name": "id" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "createInstantDisbursement", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "uint64", "name": "timeToUnlock" }, { "type": "uint64", "name": "expiration" }, { "type": "(address,uint64)[]", "name": "allocations" }, { "type": "address", "name": "reclaimTo" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Instant ALGO disbursement. The payment must be exactly the disbursement MBR, one allocation\nMBR per entry, and the allocation sum, from any payer (a payer other than the caller adds\n`PayerRecordMBR` and gets the storage back; the reward amounts stay the caller's). Repeated\naddresses are summed and zero amounts are skipped; the MBR of boxes not created stays as\nwithdrawable credit. After `expiration`, anyone may sweep what is unclaimed to\na non-zero `reclaimTo` (`sweepExpired`).", "events": [], "recommendations": {} }, { "name": "createInstantDisbursement", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "uint64", "name": "timeToUnlock" }, { "type": "uint64", "name": "expiration" }, { "type": "(address,uint64)[]", "name": "allocations" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "The pre-reclaim-target selector: `createInstantDisbursement` with no reclaim target. It charges the\nv2 disbursement MBR, so deployed callers that pay the v1 amount revert.", "events": [], "recommendations": {} }, { "name": "createInstantAsaDisbursement", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "uint64", "name": "timeToUnlock" }, { "type": "uint64", "name": "expiration" }, { "type": "(address,uint64)[]", "name": "allocations" }, { "type": "address", "name": "reclaimTo" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Instant ASA disbursement; same rules as `createInstantDisbursement`, with the sum sent as `assetXfer`.", "events": [], "recommendations": {} }, { "name": "createInstantAsaDisbursement", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "uint64", "name": "timeToUnlock" }, { "type": "uint64", "name": "expiration" }, { "type": "(address,uint64)[]", "name": "allocations" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "The pre-reclaim-target selector: `createInstantAsaDisbursement` with no reclaim target, at the v2 MBR.", "events": [], "recommendations": {} }, { "name": "claimRewards", "args": [{ "type": "(uint64,uint64)[]", "name": "rewards" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "reclaimRewards", "args": [{ "type": "uint64", "name": "id" }, { "type": "(address,uint64)[]", "name": "reclaims" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "sweepExpired", "args": [{ "type": "uint64", "name": "id" }, { "type": "(address,uint64)[]", "name": "reclaims" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Permissionless sweep of an expired disbursement that has a reclaim target. Each listed\nallocation that still exists is deleted and its amount and box MBR go to the reclaim target\n(allocations already claimed or swept are skipped). Once no allocations remain, the\ndisbursement box is deleted and its MBR and the remaining MBR credits go there too. The\ncreator's own `reclaimRewards` is unchanged.", "events": [], "recommendations": {} }, { "name": "closeDisbursement", "args": [{ "type": "uint64", "name": "id" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Deletes a disbursement with no outstanding allocations (never-used drafts, or finalized\ndisbursements fully claimed/reclaimed) and refunds its box MBR and any remaining MBR credits to\nwhoever funded it (the creator, unless someone else paid).", "events": [], "recommendations": {} }, { "name": "allocationMbrCreditShortfall", "args": [{ "type": "uint64", "name": "id" }, { "type": "uint64", "name": "allocationCount" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "mbr", "args": [{ "type": "string", "name": "title" }, { "type": "string", "name": "note" }], "returns": { "type": "(uint64,uint64)", "struct": "RewardsMBRData" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "optIn", "args": [{ "type": "pay", "name": "payment", "desc": "The payment transaction" }, { "type": "uint64", "name": "asset", "desc": "The asset to be opted into" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "optin tells the contract to opt into an asa", "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 2, "bytes": 1 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "disbursementID": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "ZGlzYnVyc2VtZW50X2lk", "desc": "the disbursement id cursor" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" } }, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": { "disbursements": { "keyType": "uint64", "valueType": "DisbursementDetails", "desc": "the disbursement map of tokens\n\nthe key is the uint64 id of the disbursement\nthe value is the details of the disbursement", "prefix": "ZA==" }, "userAllocations": { "keyType": "UserAllocationsKey", "valueType": "uint64", "desc": "the user allocations of disbursements\n\nthe key is the address of the qualified account with the uint64 id of the disbursement\nthe value is the amount they are owed", "prefix": "dQ==" } } } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [1467, 3280, 3556], "errorMessage": "Box must have value" }, { "pc": [3277, 3553], "errorMessage": "ERR:errAlne" }, { "pc": [1391, 1672, 1898, 2555], "errorMessage": "ERR:errDbaf" }, { "pc": [2354, 2433, 2574], "errorMessage": "ERR:errDbem" }, { "pc": [3248], "errorMessage": "ERR:errDbfd" }, { "pc": [3204, 3225], "errorMessage": "ERR:errDblk" }, { "pc": [2089, 2446, 2581, 4903], "errorMessage": "ERR:errDbma" }, { "pc": [866, 976, 1310, 1643, 1869, 2487, 3115, 3436, 3709, 4098, 4207], "errorMessage": "ERR:errDbne" }, { "pc": [3192, 3480, 3762], "errorMessage": "ERR:errDbnl" }, { "pc": [3755], "errorMessage": "ERR:errDbns" }, { "pc": [3501, 3783], "errorMessage": "ERR:errDbnx" }, { "pc": [4142], "errorMessage": "ERR:errDbny" }, { "pc": [784], "errorMessage": "ERR:errIaam" }, { "pc": [734], "errorMessage": "ERR:errIare" }, { "pc": [759], "errorMessage": "ERR:errIast" }, { "pc": [4781], "errorMessage": "ERR:errIcto" }, { "pc": [4555], "errorMessage": "ERR:errIdut" }, { "pc": [4598], "errorMessage": "ERR:errIdxt" }, { "pc": [2101, 2116, 2130], "errorMessage": "ERR:errIgix" }, { "pc": [999, 1015, 1448, 4505], "errorMessage": "ERR:errImbr" }, { "pc": [928, 938, 5108, 5126], "errorMessage": "ERR:errIpay" }, { "pc": [540, 1811, 4382], "errorMessage": "ERR:errIpma" }, { "pc": [526, 1801, 4369], "errorMessage": "ERR:errIpmr" }, { "pc": [656, 1761], "errorMessage": "ERR:errIpms" }, { "pc": [911], "errorMessage": "ERR:errIpyr" }, { "pc": [4713, 4727, 4741, 4795, 4809], "errorMessage": "ERR:errIxfr" }, { "pc": [489, 695, 1775], "errorMessage": "ERR:errNcls" }, { "pc": [681], "errorMessage": "ERR:errNclw" }, { "pc": [4289], "errorMessage": "ERR:errNdao" }, { "pc": [503, 709, 1789], "errorMessage": "ERR:errNrky" }, { "pc": [3927], "errorMessage": "ERR:errRcoi" }, { "pc": [881, 990, 1382, 1665, 1891, 2546, 3472, 4124], "errorMessage": "ERR:errYncr" }, { "pc": [4270], "errorMessage": "application exists" }, { "pc": [4257, 4408], "errorMessage": "check GlobalState exists" }, { "pc": [1699, 1930, 2340, 3088, 3522, 3810, 5011], "errorMessage": "index access is out of bounds" }, { "pc": [872, 981, 1004, 1020, 1035, 1316, 1322, 1439, 1455, 1464, 1531, 1537, 1571, 1583, 1648, 1653, 1874, 1879, 2425, 2438, 2458, 2493, 2499, 2509, 2518, 2527, 2535, 2593, 3122, 3130, 3139, 3148, 3157, 3291, 3302, 3307, 3316, 3442, 3452, 3460, 3567, 3578, 3583, 3592, 3715, 3723, 3731, 3848, 3859, 3864, 3873, 3965, 4104, 4113, 4219, 4430, 4439, 4494, 4510, 4519, 4651, 4660, 4685, 4693, 4828], "errorMessage": "index out of bounds" }, { "pc": [791, 1086, 1120, 1165, 1199, 1242, 1285, 1617, 1843, 2009, 2047, 2068, 2629, 2736, 2847, 2972, 3055, 3409, 3682, 4301, 4317, 4895], "errorMessage": "invalid array length header" }, { "pc": [798, 1093, 1127, 1172, 1206, 1252, 1292, 2016, 2054, 4308, 4324], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [3421, 3694], "errorMessage": "invalid number of bytes for arc4.dynamic_array<smart_contracts/rewards/types.ts::AllocationReclaimDetails>" }, { "pc": [3067], "errorMessage": "invalid number of bytes for arc4.dynamic_array<smart_contracts/rewards/types.ts::ClaimDetails>" }, { "pc": [1629, 1855, 2082, 2639, 2746, 2857, 2982], "errorMessage": "invalid number of bytes for arc4.dynamic_array<smart_contracts/rewards/types.ts::UserAllocation>" }, { "pc": [1139, 2648, 2866], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [809, 836, 951, 960, 1104, 1113, 1183, 1192, 1232, 1266, 1276, 1604, 1832, 1993, 2002, 2029, 2039, 2472, 2613, 2622, 2720, 2729, 2831, 2840, 2956, 2965, 3398, 3671, 4082, 4182, 4191, 4249, 4355], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [1824, 2328, 2823, 2948], "errorMessage": "transaction type is axfer" }, { "pc": [850, 1080, 1159, 1596, 2158, 2605, 2712, 2812, 2937, 4347], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDggMiAyNTMwMCA1NDUwMCA0MDAgMjg1MDAKICAgIGJ5dGVjYmxvY2sgImQiICJFUlI6ZXJyRGJuZSIgMHgxNTFmN2M3NSAiRVJSOmVyclluY3IiICJFUlI6ZXJySXhmciIgIkVSUjplcnJJcGF5IiAiRVJSOmVyckltYnIiICJFUlI6ZXJyRGJhZiIgIkVSUjplcnJEYm1hIiAidSIgImRpc2J1cnNlbWVudF9pZCIgIkVSUjplcnJOY2xzIiAiRVJSOmVyck5ya3kiICJFUlI6ZXJySXBtciIgIkVSUjplcnJJcG1hIiAiJCIgImFraXRhX2RhbyIgIkVSUjplcnJJZ2l4IiAiRVJSOmVyckRiZW0iICJFUlI6ZXJyRGJubCIgIkVSUjplcnJJcG1zIiAweDAwMDA3NSAiRVJSOmVyckRibGsiICJFUlI6ZXJyQWxuZSIgIkVSUjplcnJEYm54IgogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgIGJueiBtYWluX2FmdGVyX2lmX2Vsc2VAMgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo3NAogICAgLy8gZGlzYnVyc2VtZW50SUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAxLCBrZXk6IFJld2FyZHNHbG9iYWxTdGF0ZUtleURpc2J1cnNlbWVudElEIH0pCiAgICBieXRlYyAxMCAvLyAiZGlzYnVyc2VtZW50X2lkIgogICAgaW50Y18xIC8vIDEKICAgIGFwcF9nbG9iYWxfcHV0CgptYWluX2FmdGVyX2lmX2Vsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NjkKICAgIC8vIGV4cG9ydCBjbGFzcyBSZXdhcmRzIGV4dGVuZHMgY2xhc3NlcyhCYXNlUmV3YXJkcywgQWtpdGFCYXNlQ29udHJhY3QsIENvbnRyYWN0V2l0aE9wdEluKSB7CiAgICB0eG4gT25Db21wbGV0aW9uCiAgICAhCiAgICBhc3NlcnQKICAgIHR4biBBcHBsaWNhdGlvbklECiAgICBieiBtYWluX2NyZWF0ZV9Ob09wQDI4CiAgICBwdXNoYnl0ZXNzIDB4NjY2MTIwNWEgMHhkNjFhNjlmYSAweDY1ZTQ5NjQzIDB4MWM5ZWJiZGIgMHg4ZjQ5MjYyZCAweDU2NTZhY2Y5IDB4ZjYyY2RjMmIgMHg2ZjVjMTBjZiAweDU0MjRhNTkxIDB4ZGNhYzA5MzUgMHg3YjdkYzVmYyAweGEzYTE2Y2FhIDB4YWYxYTE0ZjIgMHgzZWM0MGFhNCAweGJkM2NkMDkwIDB4ODhjNWY5NzMgMHgwODdiNGI2NSAweDE0OTY5ZDk3IDB4MzNlOTJjOTQgMHg4NTRkZWRlMCAweGQ1NGJiYWQ5IDB4Mzk0ZWFlYjIgLy8gbWV0aG9kICJmdW5kTWJyQ3JlZGl0cyh1aW50NjQscGF5KXZvaWQiLCBtZXRob2QgIndpdGhkcmF3TWJyQ3JlZGl0cyh1aW50NjQsdWludDY0KXZvaWQiLCBtZXRob2QgImNyZWF0ZURpc2J1cnNlbWVudChwYXksc3RyaW5nLHVpbnQ2NCx1aW50NjQsc3RyaW5nLGFkZHJlc3MpdWludDY0IiwgbWV0aG9kICJjcmVhdGVEaXNidXJzZW1lbnQocGF5LHN0cmluZyx1aW50NjQsdWludDY0LHN0cmluZyl1aW50NjQiLCBtZXRob2QgImVkaXREaXNidXJzZW1lbnQodWludDY0LHN0cmluZyx1aW50NjQsdWludDY0LHN0cmluZyl2b2lkIiwgbWV0aG9kICJjcmVhdGVVc2VyQWxsb2NhdGlvbnMocGF5LHVpbnQ2NCwoYWRkcmVzcyx1aW50NjQpW10pdm9pZCIsIG1ldGhvZCAiY3JlYXRlQXNhVXNlckFsbG9jYXRpb25zKGF4ZmVyLHVpbnQ2NCwoYWRkcmVzcyx1aW50NjQpW10pdm9pZCIsIG1ldGhvZCAiY3JlYXRlQXNhRGlzYnVyc2VtZW50RnJvbUdyb3VwKHVpbnQ2NCx1aW50NjQsc3RyaW5nLHVpbnQ2NCx1aW50NjQsc3RyaW5nLChhZGRyZXNzLHVpbnQ2NClbXSl1aW50NjQiLCBtZXRob2QgImZpbmFsaXplRGlzYnVyc2VtZW50KHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KHBheSx1aW50NjQsdWludDY0LChhZGRyZXNzLHVpbnQ2NClbXSxhZGRyZXNzKXVpbnQ2NCIsIG1ldGhvZCAiY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudChwYXksdWludDY0LHVpbnQ2NCwoYWRkcmVzcyx1aW50NjQpW10pdWludDY0IiwgbWV0aG9kICJjcmVhdGVJbnN0YW50QXNhRGlzYnVyc2VtZW50KHBheSxheGZlcix1aW50NjQsdWludDY0LChhZGRyZXNzLHVpbnQ2NClbXSxhZGRyZXNzKXVpbnQ2NCIsIG1ldGhvZCAiY3JlYXRlSW5zdGFudEFzYURpc2J1cnNlbWVudChwYXksYXhmZXIsdWludDY0LHVpbnQ2NCwoYWRkcmVzcyx1aW50NjQpW10pdWludDY0IiwgbWV0aG9kICJjbGFpbVJld2FyZHMoKHVpbnQ2NCx1aW50NjQpW10pdm9pZCIsIG1ldGhvZCAicmVjbGFpbVJld2FyZHModWludDY0LChhZGRyZXNzLHVpbnQ2NClbXSl2b2lkIiwgbWV0aG9kICJzd2VlcEV4cGlyZWQodWludDY0LChhZGRyZXNzLHVpbnQ2NClbXSl2b2lkIiwgbWV0aG9kICJjbG9zZURpc2J1cnNlbWVudCh1aW50NjQpdm9pZCIsIG1ldGhvZCAiYWxsb2NhdGlvbk1ickNyZWRpdFNob3J0ZmFsbCh1aW50NjQsdWludDY0KXVpbnQ2NCIsIG1ldGhvZCAidXBkYXRlQWtpdGFEQU8odWludDY0KXZvaWQiLCBtZXRob2QgIm9wVXAoKXZvaWQiLCBtZXRob2QgIm1icihzdHJpbmcsc3RyaW5nKSh1aW50NjQsdWludDY0KSIsIG1ldGhvZCAib3B0SW4ocGF5LHVpbnQ2NCl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggZnVuZE1ickNyZWRpdHMgd2l0aGRyYXdNYnJDcmVkaXRzIGNyZWF0ZURpc2J1cnNlbWVudCBsZWdhY3lDcmVhdGVEaXNidXJzZW1lbnQgZWRpdERpc2J1cnNlbWVudCBjcmVhdGVVc2VyQWxsb2NhdGlvbnMgY3JlYXRlQXNhVXNlckFsbG9jYXRpb25zIGNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cCBmaW5hbGl6ZURpc2J1cnNlbWVudCBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50IGxlZ2FjeUNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQgY3JlYXRlSW5zdGFudEFzYURpc2J1cnNlbWVudCBsZWdhY3lDcmVhdGVJbnN0YW50QXNhRGlzYnVyc2VtZW50IGNsYWltUmV3YXJkcyByZWNsYWltUmV3YXJkcyBzd2VlcEV4cGlyZWQgY2xvc2VEaXNidXJzZW1lbnQgYWxsb2NhdGlvbk1ickNyZWRpdFNob3J0ZmFsbCB1cGRhdGVBa2l0YURBTyBtYWluX29wVXBfcm91dGVAMjQgbWJyIG9wdEluCiAgICBlcnIKCm1haW5fb3BVcF9yb3V0ZUAyNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozMAogICAgLy8gb3BVcCgpOiB2b2lkIHsgfQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKbWFpbl9jcmVhdGVfTm9PcEAyODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NjkKICAgIC8vIGV4cG9ydCBjbGFzcyBSZXdhcmRzIGV4dGVuZHMgY2xhc3NlcyhCYXNlUmV3YXJkcywgQWtpdGFCYXNlQ29udHJhY3QsIENvbnRyYWN0V2l0aE9wdEluKSB7CiAgICBwdXNoYnl0ZXMgMHhjZDlhZDY3ZSAvLyBtZXRob2QgImNyZWF0ZShzdHJpbmcsdWludDY0KXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBjcmVhdGUKICAgIGVycgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmFzc2VydFBsYWluUGF5bWVudCh0eG46IHVpbnQ2NCkgLT4gdm9pZDoKYXNzZXJ0UGxhaW5QYXltZW50OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NwogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIGFzc2VydFBsYWluUGF5bWVudCh0eG46IGd0eG4uUGF5bWVudFR4bik6IHZvaWQgewogICAgcHJvdG8gMSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY4CiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLmNsb3NlUmVtYWluZGVyVG8gPT09IEdsb2JhbC56ZXJvQWRkcmVzcywgZXJyQ2xvc2VGb3JiaWRkZW4pCiAgICBmcmFtZV9kaWcgLTEKICAgIGd0eG5zIENsb3NlUmVtYWluZGVyVG8KICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIGJueiBhc3NlcnRQbGFpblBheW1lbnRfYWZ0ZXJfYXNzZXJ0QDIKICAgIGJ5dGVjIDExIC8vICJFUlI6ZXJyTmNscyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOY2xzCgphc3NlcnRQbGFpblBheW1lbnRfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY5CiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLnJla2V5VG8gPT09IEdsb2JhbC56ZXJvQWRkcmVzcywgZXJyUmVrZXlGb3JiaWRkZW4pCiAgICBmcmFtZV9kaWcgLTEKICAgIGd0eG5zIFJla2V5VG8KICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIGJueiBhc3NlcnRQbGFpblBheW1lbnRfYWZ0ZXJfYXNzZXJ0QDQKICAgIGJ5dGVjIDEyIC8vICJFUlI6ZXJyTnJreSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOcmt5Cgphc3NlcnRQbGFpblBheW1lbnRfYWZ0ZXJfYXNzZXJ0QDQ6CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjphc3NlcnRFeGFjdFBheW1lbnQodHhuOiB1aW50NjQsIHJlY2VpdmVyOiBieXRlcywgYW1vdW50OiB1aW50NjQpIC0+IHZvaWQ6CmFzc2VydEV4YWN0UGF5bWVudDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzYKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiBhc3NlcnRFeGFjdFBheW1lbnQodHhuOiBndHhuLlBheW1lbnRUeG4sIHJlY2VpdmVyOiBBY2NvdW50LCBhbW91bnQ6IHVpbnQ2NCk6IHZvaWQgewogICAgcHJvdG8gMyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc3CiAgICAvLyBhc3NlcnRQbGFpblBheW1lbnQodHhuKQogICAgZnJhbWVfZGlnIC0zCiAgICBjYWxsc3ViIGFzc2VydFBsYWluUGF5bWVudAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3OAogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5yZWNlaXZlciA9PT0gcmVjZWl2ZXIsIGVyckludmFsaWRQYXltZW50UmVjZWl2ZXIpCiAgICBmcmFtZV9kaWcgLTMKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBmcmFtZV9kaWcgLTIKICAgID09CiAgICBibnogYXNzZXJ0RXhhY3RQYXltZW50X2FmdGVyX2Fzc2VydEAyCiAgICBieXRlYyAxMyAvLyAiRVJSOmVycklwbXIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBtcgoKYXNzZXJ0RXhhY3RQYXltZW50X2FmdGVyX2Fzc2VydEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3OQogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5hbW91bnQgPT09IGFtb3VudCwgZXJySW52YWxpZFBheW1lbnRBbW91bnQpCiAgICBmcmFtZV9kaWcgLTMKICAgIGd0eG5zIEFtb3VudAogICAgZnJhbWVfZGlnIC0xCiAgICA9PQogICAgYm56IGFzc2VydEV4YWN0UGF5bWVudF9hZnRlcl9hc3NlcnRANAogICAgYnl0ZWMgMTQgLy8gIkVSUjplcnJJcG1hIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwbWEKCmFzc2VydEV4YWN0UGF5bWVudF9hZnRlcl9hc3NlcnRANDoKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnBheWVyT2YocmVjb3JkOiBieXRlcywgb3duZXI6IGJ5dGVzKSAtPiBieXRlczoKcGF5ZXJPZjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTEyCiAgICAvLyBleHBvcnQgZnVuY3Rpb24gcGF5ZXJPZihyZWNvcmQ6IGJ5dGVzLCBvd25lcjogQWNjb3VudCk6IEFjY291bnQgewogICAgcHJvdG8gMiAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk2CiAgICAvLyByZXR1cm4gQnl0ZXMoUGF5ZXJCb3hQcmVmaXgpLmNvbmNhdChzaGEyNTYocmVjb3JkKSkKICAgIGZyYW1lX2RpZyAtMgogICAgc2hhMjU2CiAgICBieXRlYyAxNSAvLyAiJCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMTMKICAgIC8vIGNvbnN0IFtwYXllciwgc3BvbnNvcmVkXSA9IG9wLkJveC5nZXQocGF5ZXJSZWNvcmRLZXkocmVjb3JkKSkKICAgIGJveF9nZXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTE0CiAgICAvLyByZXR1cm4gc3BvbnNvcmVkID8gQWNjb3VudChwYXllcikgOiBvd25lcgogICAgYnogcGF5ZXJPZl90ZXJuYXJ5X2ZhbHNlQDIKICAgIHJldHN1YgoKcGF5ZXJPZl90ZXJuYXJ5X2ZhbHNlQDI6CiAgICBwb3AKICAgIGZyYW1lX2RpZyAtMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMTQKICAgIC8vIHJldHVybiBzcG9uc29yZWQgPyBBY2NvdW50KHBheWVyKSA6IG93bmVyCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpjYW5SZWNlaXZlQWxnbyhyZWNlaXZlcjogYnl0ZXMsIGFtb3VudDogdWludDY0KSAtPiB1aW50NjQ6CmNhblJlY2VpdmVBbGdvOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMjkKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiBjYW5SZWNlaXZlQWxnbyhyZWNlaXZlcjogQWNjb3VudCwgYW1vdW50OiB1aW50NjQpOiBib29sZWFuIHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMzAKICAgIC8vIGNvbnN0IFssIGZ1bmRlZF0gPSBvcC5BY2N0UGFyYW1zLmFjY3RCYWxhbmNlKHJlY2VpdmVyKQogICAgZnJhbWVfZGlnIC0yCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdEJhbGFuY2UKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMzEKICAgIC8vIHJldHVybiBmdW5kZWQgfHwgYW1vdW50ID49IEdsb2JhbC5taW5CYWxhbmNlCiAgICBibnogY2FuUmVjZWl2ZUFsZ29fYm9vbF90cnVlQDIKICAgIGZyYW1lX2RpZyAtMQogICAgZ2xvYmFsIE1pbkJhbGFuY2UKICAgID49CiAgICBieiBjYW5SZWNlaXZlQWxnb19ib29sX2ZhbHNlQDMKCmNhblJlY2VpdmVBbGdvX2Jvb2xfdHJ1ZUAyOgogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTMxCiAgICAvLyByZXR1cm4gZnVuZGVkIHx8IGFtb3VudCA+PSBHbG9iYWwubWluQmFsYW5jZQogICAgcmV0c3ViCgpjYW5SZWNlaXZlQWxnb19ib29sX2ZhbHNlQDM6CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMzEKICAgIC8vIHJldHVybiBmdW5kZWQgfHwgYW1vdW50ID49IEdsb2JhbC5taW5CYWxhbmNlCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpyZWxlYXNlRGVwb3NpdChyZWNvcmQ6IGJ5dGVzLCBvd25lcjogYnl0ZXMsIGFtb3VudDogdWludDY0KSAtPiBieXRlczoKcmVsZWFzZURlcG9zaXQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE0MAogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIHJlbGVhc2VEZXBvc2l0KHJlY29yZDogYnl0ZXMsIG93bmVyOiBBY2NvdW50LCBhbW91bnQ6IHVpbnQ2NCk6IFtBY2NvdW50LCB1aW50NjRdIHsKICAgIHByb3RvIDMgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5NgogICAgLy8gcmV0dXJuIEJ5dGVzKFBheWVyQm94UHJlZml4KS5jb25jYXQoc2hhMjU2KHJlY29yZCkpCiAgICBmcmFtZV9kaWcgLTMKICAgIHNoYTI1NgogICAgYnl0ZWMgMTUgLy8gIiQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNDIKICAgIC8vIGNvbnN0IFtwYXllciwgc3BvbnNvcmVkXSA9IG9wLkJveC5nZXQoa2V5KQogICAgYm94X2dldAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNDMKICAgIC8vIGlmICghc3BvbnNvcmVkKSB7CiAgICBibnogcmVsZWFzZURlcG9zaXRfYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE0NAogICAgLy8gcmV0dXJuIFtvd25lciwgYW1vdW50XQogICAgZnJhbWVfZGlnIC0xCiAgICBpdG9iCiAgICBmcmFtZV9kaWcgLTIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCnJlbGVhc2VEZXBvc2l0X2FmdGVyX2lmX2Vsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTQ2CiAgICAvLyBvcC5Cb3guZGVsZXRlKGtleSkKICAgIHN3YXAKICAgIGJveF9kZWwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNDcKICAgIC8vIGNvbnN0IHRvdGFsOiB1aW50NjQgPSBhbW91bnQgKyBQYXllclJlY29yZE1CUgogICAgZnJhbWVfZGlnIC0xCiAgICBpbnRjIDcgLy8gMjg1MDAKICAgICsKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNDgKICAgIC8vIHJldHVybiBbY2FuUmVjZWl2ZUFsZ28oQWNjb3VudChwYXllciksIHRvdGFsKSA/IEFjY291bnQocGF5ZXIpIDogb3duZXIsIHRvdGFsXQogICAgZGlnIDIKICAgIHN3YXAKICAgIGNhbGxzdWIgY2FuUmVjZWl2ZUFsZ28KICAgIGJ6IHJlbGVhc2VEZXBvc2l0X3Rlcm5hcnlfZmFsc2VANAogICAgc3dhcAoKcmVsZWFzZURlcG9zaXRfdGVybmFyeV9tZXJnZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNDgKICAgIC8vIHJldHVybiBbY2FuUmVjZWl2ZUFsZ28oQWNjb3VudChwYXllciksIHRvdGFsKSA/IEFjY291bnQocGF5ZXIpIDogb3duZXIsIHRvdGFsXQogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICByZXRzdWIKCnJlbGVhc2VEZXBvc2l0X3Rlcm5hcnlfZmFsc2VANDoKICAgIGJ1cnkgMQogICAgZnJhbWVfZGlnIC0yCiAgICBiIHJlbGVhc2VEZXBvc2l0X3Rlcm5hcnlfbWVyZ2VANQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmFzc2VydEJvdW5kQXNzZXRUcmFuc2Zlcih0eG46IHVpbnQ2NCwgc2VuZGVyOiBieXRlcywgcmVjZWl2ZXI6IGJ5dGVzLCBhc3NldDogdWludDY0LCBhbW91bnQ6IHVpbnQ2NCkgLT4gdm9pZDoKYXNzZXJ0Qm91bmRBc3NldFRyYW5zZmVyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxODctMTkzCiAgICAvLyBleHBvcnQgZnVuY3Rpb24gYXNzZXJ0Qm91bmRBc3NldFRyYW5zZmVyKAogICAgLy8gICB0eG46IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgc2VuZGVyOiBBY2NvdW50LAogICAgLy8gICByZWNlaXZlcjogQWNjb3VudCwKICAgIC8vICAgYXNzZXQ6IEFzc2V0LAogICAgLy8gICBhbW91bnQ6IHVpbnQ2NAogICAgLy8gKTogdm9pZCB7CiAgICBwcm90byA1IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTc3CiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLnNlbmRlciA9PT0gc2VuZGVyLCBlcnJJbnZhbGlkUGF5bWVudFNlbmRlcikKICAgIGZyYW1lX2RpZyAtNQogICAgZ3R4bnMgU2VuZGVyCiAgICBmcmFtZV9kaWcgLTQKICAgID09CiAgICBibnogYXNzZXJ0Qm91bmRBc3NldFRyYW5zZmVyX2FmdGVyX2Fzc2VydEA5CiAgICBieXRlYyAyMCAvLyAiRVJSOmVycklwbXMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBtcwoKYXNzZXJ0Qm91bmRBc3NldFRyYW5zZmVyX2FmdGVyX2Fzc2VydEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNzgKICAgIC8vIGxvZ2dlZEFzc2VydCh0eG4uYXNzZXRTZW5kZXIgPT09IEdsb2JhbC56ZXJvQWRkcmVzcywgZXJyQ2xhd2JhY2tGb3JiaWRkZW4pCiAgICBmcmFtZV9kaWcgLTUKICAgIGd0eG5zIEFzc2V0U2VuZGVyCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgID09CiAgICBibnogYXNzZXJ0Qm91bmRBc3NldFRyYW5zZmVyX2FmdGVyX2Fzc2VydEAxMQogICAgcHVzaGJ5dGVzICJFUlI6ZXJyTmNsdyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOY2x3Cgphc3NlcnRCb3VuZEFzc2V0VHJhbnNmZXJfYWZ0ZXJfYXNzZXJ0QDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNzkKICAgIC8vIGxvZ2dlZEFzc2VydCh0eG4uYXNzZXRDbG9zZVRvID09PSBHbG9iYWwuemVyb0FkZHJlc3MsIGVyckNsb3NlRm9yYmlkZGVuKQogICAgZnJhbWVfZGlnIC01CiAgICBndHhucyBBc3NldENsb3NlVG8KICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIGJueiBhc3NlcnRCb3VuZEFzc2V0VHJhbnNmZXJfYWZ0ZXJfYXNzZXJ0QDEzCiAgICBieXRlYyAxMSAvLyAiRVJSOmVyck5jbHMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmNscwoKYXNzZXJ0Qm91bmRBc3NldFRyYW5zZmVyX2FmdGVyX2Fzc2VydEAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTgwCiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLnJla2V5VG8gPT09IEdsb2JhbC56ZXJvQWRkcmVzcywgZXJyUmVrZXlGb3JiaWRkZW4pCiAgICBmcmFtZV9kaWcgLTUKICAgIGd0eG5zIFJla2V5VG8KICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIGJueiBhc3NlcnRCb3VuZEFzc2V0VHJhbnNmZXJfYWZ0ZXJfYXNzZXJ0QDE1CiAgICBieXRlYyAxMiAvLyAiRVJSOmVyck5ya3kiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTnJreQoKYXNzZXJ0Qm91bmRBc3NldFRyYW5zZmVyX2FmdGVyX2Fzc2VydEAxNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTk1CiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLmFzc2V0UmVjZWl2ZXIgPT09IHJlY2VpdmVyLCBlcnJJbnZhbGlkQXNzZXRSZWNlaXZlcikKICAgIGZyYW1lX2RpZyAtNQogICAgZ3R4bnMgQXNzZXRSZWNlaXZlcgogICAgZnJhbWVfZGlnIC0zCiAgICA9PQogICAgYm56IGFzc2VydEJvdW5kQXNzZXRUcmFuc2Zlcl9hZnRlcl9hc3NlcnRAMgogICAgcHVzaGJ5dGVzICJFUlI6ZXJySWFyZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJYXJlCgphc3NlcnRCb3VuZEFzc2V0VHJhbnNmZXJfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE5NgogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi54ZmVyQXNzZXQgPT09IGFzc2V0LCBlcnJJbnZhbGlkQXNzZXQpCiAgICBmcmFtZV9kaWcgLTUKICAgIGd0eG5zIFhmZXJBc3NldAogICAgZnJhbWVfZGlnIC0yCiAgICA9PQogICAgYm56IGFzc2VydEJvdW5kQXNzZXRUcmFuc2Zlcl9hZnRlcl9hc3NlcnRANAogICAgcHVzaGJ5dGVzICJFUlI6ZXJySWFzdCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJYXN0Cgphc3NlcnRCb3VuZEFzc2V0VHJhbnNmZXJfYWZ0ZXJfYXNzZXJ0QDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE5NwogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5hc3NldEFtb3VudCA9PT0gYW1vdW50LCBlcnJJbnZhbGlkQXNzZXRBbW91bnQpCiAgICBmcmFtZV9kaWcgLTUKICAgIGd0eG5zIEFzc2V0QW1vdW50CiAgICBmcmFtZV9kaWcgLTEKICAgID09CiAgICBibnogYXNzZXJ0Qm91bmRBc3NldFRyYW5zZmVyX2FmdGVyX2Fzc2VydEA2CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJJYWFtIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklhYW0KCmFzc2VydEJvdW5kQXNzZXRUcmFuc2Zlcl9hZnRlcl9hc3NlcnRANjoKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6OlJld2FyZHMuY3JlYXRlW3JvdXRpbmddKCkgLT4gdm9pZDoKY3JlYXRlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyODIKICAgIC8vIEBhYmltZXRob2QoeyBvbkNyZWF0ZTogJ3JlcXVpcmUnIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE0CiAgICAvLyB2ZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogR2xvYmFsU3RhdGVLZXlWZXJzaW9uIH0pCiAgICBwdXNoYnl0ZXMgInZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjI4NAogICAgLy8gdGhpcy52ZXJzaW9uLnZhbHVlID0gdmVyc2lvbgogICAgdW5jb3ZlciAyCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWMgMTYgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6Mjg1CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlID0gQXBwbGljYXRpb24oYWtpdGFEQU8pCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyODIKICAgIC8vIEBhYmltZXRob2QoeyBvbkNyZWF0ZTogJ3JlcXVpcmUnIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo6UmV3YXJkcy5mdW5kTWJyQ3JlZGl0c1tyb3V0aW5nXSgpIC0+IHZvaWQ6CmZ1bmRNYnJDcmVkaXRzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyOTAKICAgIC8vIGZ1bmRNYnJDcmVkaXRzKGlkOiB1aW50NjQsIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4bik6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgY292ZXIgMgogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjkxCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5kaXNidXJzZW1lbnRzKGlkKS5leGlzdHMsIGVyckRpc2J1cnNlbWVudERvZXNOb3RFeGlzdCkKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6ODQKICAgIC8vIGRpc2J1cnNlbWVudHMgPSBCb3hNYXA8dWludDY0LCBEaXNidXJzZW1lbnREZXRhaWxzPih7IGtleVByZWZpeDogUmV3YXJkc0JveFByZWZpeERpc2J1cnNlbWVudHMgfSkKICAgIGJ5dGVjXzAgLy8gImQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyOTEKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmRpc2J1cnNlbWVudHMoaWQpLmV4aXN0cywgZXJyRGlzYnVyc2VtZW50RG9lc05vdEV4aXN0KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogZnVuZE1ickNyZWRpdHNfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjXzEgLy8gIkVSUjplcnJEYm5lIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckRibmUKCmZ1bmRNYnJDcmVkaXRzX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyOTIKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlLmNyZWF0b3IgPT09IFR4bi5zZW5kZXIsIGVycllvdUFyZU5vdFRoZUNyZWF0b3IpCiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIHB1c2hpbnQgMzIKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICB0eG4gU2VuZGVyCiAgICA9PQogICAgYm56IGZ1bmRNYnJDcmVkaXRzX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlY18zIC8vICJFUlI6ZXJyWW5jciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJZbmNyCgpmdW5kTWJyQ3JlZGl0c19hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6Mjk0CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5zZW5kZXIgPT09IHBheWVyT2YodGhpcy5kaXNidXJzZW1lbnRzKGlkKS5rZXksIFR4bi5zZW5kZXIpLCBlcnJQYXllck9ubHkpCiAgICBkdXAKICAgIGd0eG5zIFNlbmRlcgogICAgdHhuIFNlbmRlcgogICAgdW5jb3ZlciAzCiAgICBzd2FwCiAgICBjYWxsc3ViIHBheWVyT2YKICAgID09CiAgICBibnogZnVuZE1ickNyZWRpdHNfYWZ0ZXJfYXNzZXJ0QDcKICAgIHB1c2hieXRlcyAiRVJSOmVycklweXIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXB5cgoKZnVuZE1ickNyZWRpdHNfYWZ0ZXJfYXNzZXJ0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjI5NQogICAgLy8gYXNzZXJ0UGxhaW5QYXltZW50KHBheW1lbnQpCiAgICBkdXBuIDIKICAgIGNhbGxzdWIgYXNzZXJ0UGxhaW5QYXltZW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjI5NgogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBlcnJJbnZhbGlkUGF5bWVudCkKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBmdW5kTWJyQ3JlZGl0c19hZnRlcl9hc3NlcnRAOQogICAgYnl0ZWMgNSAvLyAiRVJSOmVycklwYXkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBheQoKZnVuZE1ickNyZWRpdHNfYWZ0ZXJfYXNzZXJ0QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjI5NwogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID4gMCwgZXJySW52YWxpZFBheW1lbnQpCiAgICBndHhucyBBbW91bnQKICAgIGR1cAogICAgYm56IGZ1bmRNYnJDcmVkaXRzX2FmdGVyX2Fzc2VydEAxMQogICAgYnl0ZWMgNSAvLyAiRVJSOmVycklwYXkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBheQoKZnVuZE1ickNyZWRpdHNfYWZ0ZXJfYXNzZXJ0QDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyOTkKICAgIC8vIHRoaXMuYWRkTWJyQ3JlZGl0KGlkLCBwYXltZW50LmFtb3VudCkKICAgIGNhbGxzdWIgYWRkTWJyQ3JlZGl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjI5MAogICAgLy8gZnVuZE1ickNyZWRpdHMoaWQ6IHVpbnQ2NCwgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo6UmV3YXJkcy53aXRoZHJhd01ickNyZWRpdHNbcm91dGluZ10oKSAtPiB2b2lkOgp3aXRoZHJhd01ickNyZWRpdHM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjMwMgogICAgLy8gd2l0aGRyYXdNYnJDcmVkaXRzKGlkOiB1aW50NjQsIGFtb3VudDogdWludDY0KTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjMwMwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZGlzYnVyc2VtZW50cyhpZCkuZXhpc3RzLCBlcnJEaXNidXJzZW1lbnREb2VzTm90RXhpc3QpCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjg0CiAgICAvLyBkaXNidXJzZW1lbnRzID0gQm94TWFwPHVpbnQ2NCwgRGlzYnVyc2VtZW50RGV0YWlscz4oeyBrZXlQcmVmaXg6IFJld2FyZHNCb3hQcmVmaXhEaXNidXJzZW1lbnRzIH0pCiAgICBieXRlY18wIC8vICJkIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzAzCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5kaXNidXJzZW1lbnRzKGlkKS5leGlzdHMsIGVyckRpc2J1cnNlbWVudERvZXNOb3RFeGlzdCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHdpdGhkcmF3TWJyQ3JlZGl0c19hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWNfMSAvLyAiRVJSOmVyckRibmUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyRGJuZQoKd2l0aGRyYXdNYnJDcmVkaXRzX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozMDQKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlLmNyZWF0b3IgPT09IFR4bi5zZW5kZXIsIGVycllvdUFyZU5vdFRoZUNyZWF0b3IpCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBwdXNoaW50IDMyCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgdHhuIFNlbmRlcgogICAgPT0KICAgIGJueiB3aXRoZHJhd01ickNyZWRpdHNfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjXzMgLy8gIkVSUjplcnJZbmNyIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclluY3IKCndpdGhkcmF3TWJyQ3JlZGl0c19hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzA1CiAgICAvLyBsb2dnZWRBc3NlcnQoYW1vdW50ID4gMCwgZXJySW52YWxpZE1ickFtb3VudCkKICAgIGRpZyAxCiAgICBibnogd2l0aGRyYXdNYnJDcmVkaXRzX2FmdGVyX2Fzc2VydEA3CiAgICBieXRlYyA2IC8vICJFUlI6ZXJySW1iciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJbWJyCgp3aXRoZHJhd01ickNyZWRpdHNfYWZ0ZXJfYXNzZXJ0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjMwNgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUubWJyQ3JlZGl0cyA+PSBhbW91bnQsIGVyckludmFsaWRNYnJBbW91bnQpCiAgICBkdXAKICAgIHB1c2hpbnQgNzUKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgZGlnIDIKICAgID49CiAgICBibnogd2l0aGRyYXdNYnJDcmVkaXRzX2FmdGVyX2Fzc2VydEA5CiAgICBieXRlYyA2IC8vICJFUlI6ZXJySW1iciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJbWJyCgp3aXRoZHJhd01ickNyZWRpdHNfYWZ0ZXJfYXNzZXJ0QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjMwNwogICAgLy8gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZS5tYnJDcmVkaXRzIC09IGFtb3VudAogICAgZHVwCiAgICBwdXNoaW50IDc1CiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGRpZyAyCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIC0KICAgIGl0b2IKICAgIGRpZyAxCiAgICBwdXNoaW50IDc1CiAgICB1bmNvdmVyIDIKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjMxMAogICAgLy8gY29uc3QgcGF5ZXIgPSBwYXllck9mKHRoaXMuZGlzYnVyc2VtZW50cyhpZCkua2V5LCBUeG4uc2VuZGVyKQogICAgdHhuIFNlbmRlcgogICAgY2FsbHN1YiBwYXllck9mCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzExLTMxNAogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IGNhblJlY2VpdmVBbGdvKHBheWVyLCBhbW91bnQpID8gcGF5ZXIgOiBUeG4uc2VuZGVyLAogICAgLy8gICBhbW91bnQsCiAgICAvLyB9KS5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozMTIKICAgIC8vIHJlY2VpdmVyOiBjYW5SZWNlaXZlQWxnbyhwYXllciwgYW1vdW50KSA/IHBheWVyIDogVHhuLnNlbmRlciwKICAgIHN3YXAKICAgIGNhbGxzdWIgY2FuUmVjZWl2ZUFsZ28KICAgIGJ6IHdpdGhkcmF3TWJyQ3JlZGl0c190ZXJuYXJ5X2ZhbHNlQDExCgp3aXRoZHJhd01ickNyZWRpdHNfdGVybmFyeV9tZXJnZUAxMjoKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjMxMS0zMTQKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBjYW5SZWNlaXZlQWxnbyhwYXllciwgYW1vdW50KSA/IHBheWVyIDogVHhuLnNlbmRlciwKICAgIC8vICAgYW1vdW50LAogICAgLy8gfSkuc3VibWl0KCkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjMwMgogICAgLy8gd2l0aGRyYXdNYnJDcmVkaXRzKGlkOiB1aW50NjQsIGFtb3VudDogdWludDY0KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgp3aXRoZHJhd01ickNyZWRpdHNfdGVybmFyeV9mYWxzZUAxMToKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozMTIKICAgIC8vIHJlY2VpdmVyOiBjYW5SZWNlaXZlQWxnbyhwYXllciwgYW1vdW50KSA/IHBheWVyIDogVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIGIgd2l0aGRyYXdNYnJDcmVkaXRzX3Rlcm5hcnlfbWVyZ2VAMTIKCgovLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjpSZXdhcmRzLmNyZWF0ZURpc2J1cnNlbWVudFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNyZWF0ZURpc2J1cnNlbWVudDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzIxLTMyOAogICAgLy8gY3JlYXRlRGlzYnVyc2VtZW50KAogICAgLy8gICBtYnJQYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIHRpdGxlOiBzdHJpbmcsCiAgICAvLyAgIHRpbWVUb1VubG9jazogdWludDY0LAogICAgLy8gICBleHBpcmF0aW9uOiB1aW50NjQsCiAgICAvLyAgIG5vdGU6IHN0cmluZywKICAgIC8vICAgcmVjbGFpbVRvOiBBY2NvdW50CiAgICAvLyApOiB1aW50NjQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDUKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzI5CiAgICAvLyByZXR1cm4gdGhpcy5uZXdEaXNidXJzZW1lbnQobWJyUGF5bWVudCwgdGl0bGUsIHRpbWVUb1VubG9jaywgZXhwaXJhdGlvbiwgbm90ZSwgcmVjbGFpbVRvKQogICAgY2FsbHN1YiBuZXdEaXNidXJzZW1lbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzIxLTMyOAogICAgLy8gY3JlYXRlRGlzYnVyc2VtZW50KAogICAgLy8gICBtYnJQYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIHRpdGxlOiBzdHJpbmcsCiAgICAvLyAgIHRpbWVUb1VubG9jazogdWludDY0LAogICAgLy8gICBleHBpcmF0aW9uOiB1aW50NjQsCiAgICAvLyAgIG5vdGU6IHN0cmluZywKICAgIC8vICAgcmVjbGFpbVRvOiBBY2NvdW50CiAgICAvLyApOiB1aW50NjQgewogICAgaXRvYgogICAgYnl0ZWNfMiAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6OlJld2FyZHMubGVnYWN5Q3JlYXRlRGlzYnVyc2VtZW50W3JvdXRpbmddKCkgLT4gdm9pZDoKbGVnYWN5Q3JlYXRlRGlzYnVyc2VtZW50OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozMzMKICAgIC8vIEBhYmltZXRob2QoeyBuYW1lOiAnY3JlYXRlRGlzYnVyc2VtZW50JyB9KQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzQxCiAgICAvLyByZXR1cm4gdGhpcy5uZXdEaXNidXJzZW1lbnQobWJyUGF5bWVudCwgdGl0bGUsIHRpbWVUb1VubG9jaywgZXhwaXJhdGlvbiwgbm90ZSwgR2xvYmFsLnplcm9BZGRyZXNzKQogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICBjYWxsc3ViIG5ld0Rpc2J1cnNlbWVudAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozMzMKICAgIC8vIEBhYmltZXRob2QoeyBuYW1lOiAnY3JlYXRlRGlzYnVyc2VtZW50JyB9KQogICAgaXRvYgogICAgYnl0ZWNfMiAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6OlJld2FyZHMuZWRpdERpc2J1cnNlbWVudFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmVkaXREaXNidXJzZW1lbnQ6CiAgICBwdXNoYnl0ZXMgIiIKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozNDQtMzUwCiAgICAvLyBlZGl0RGlzYnVyc2VtZW50KAogICAgLy8gICBpZDogdWludDY0LAogICAgLy8gICB0aXRsZTogc3RyaW5nLAogICAgLy8gICB0aW1lVG9VbmxvY2s6IHVpbnQ2NCwKICAgIC8vICAgZXhwaXJhdGlvbjogdWludDY0LAogICAgLy8gICBub3RlOiBzdHJpbmcKICAgIC8vICk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgZHVwCiAgICBjb3ZlciA0CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBzd2FwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA1CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjM1MQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZGlzYnVyc2VtZW50cyhpZCkuZXhpc3RzLCBlcnJEaXNidXJzZW1lbnREb2VzTm90RXhpc3QpCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjg0CiAgICAvLyBkaXNidXJzZW1lbnRzID0gQm94TWFwPHVpbnQ2NCwgRGlzYnVyc2VtZW50RGV0YWlscz4oeyBrZXlQcmVmaXg6IFJld2FyZHNCb3hQcmVmaXhEaXNidXJzZW1lbnRzIH0pCiAgICBieXRlY18wIC8vICJkIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzUxCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5kaXNidXJzZW1lbnRzKGlkKS5leGlzdHMsIGVyckRpc2J1cnNlbWVudERvZXNOb3RFeGlzdCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGVkaXREaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjXzEgLy8gIkVSUjplcnJEYm5lIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckRibmUKCmVkaXREaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjM1MwogICAgLy8gY29uc3QgeyBjcmVhdG9yLCBmaW5hbGl6ZWQsIHRpdGxlOiBvbGRUaXRsZSwgbm90ZTogb2xkTm90ZSB9ID0gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZQogICAgZHVwbiAyCiAgICBpbnRjXzAgLy8gMAogICAgcHVzaGludCAzMgogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGRpZyAxCiAgICBwdXNoaW50IDMyCiAgICBpbnRjXzEgLy8gMQogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIGNvdmVyIDMKICAgIGRpZyAxCiAgICBwdXNoaW50IDExNwogICAgaW50Y18zIC8vIDIKICAgIGJveF9leHRyYWN0CiAgICBidG9pCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDIKICAgIHB1c2hpbnQgMTE3CiAgICB1bmNvdmVyIDIKICAgIGJveF9leHRyYWN0CiAgICBleHRyYWN0IDIgMAogICAgY292ZXIgMwogICAgZGlnIDEKICAgIHB1c2hpbnQgMTE1CiAgICBpbnRjXzMgLy8gMgogICAgYm94X2V4dHJhY3QKICAgIGJ0b2kKICAgIGRpZyAyCiAgICBkaWcgMQogICAgaW50Y18zIC8vIDIKICAgIGJveF9leHRyYWN0CiAgICBidG9pCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgdW5jb3ZlciAzCiAgICBjb3ZlciAyCiAgICBib3hfZXh0cmFjdAogICAgZXh0cmFjdCAyIDAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzU0CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gY3JlYXRvciwgZXJyWW91QXJlTm90VGhlQ3JlYXRvcikKICAgIHR4biBTZW5kZXIKICAgID09CiAgICBibnogZWRpdERpc2J1cnNlbWVudF9hZnRlcl9hc3NlcnRANQogICAgYnl0ZWNfMyAvLyAiRVJSOmVyclluY3IiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyWW5jcgoKZWRpdERpc2J1cnNlbWVudF9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzU1CiAgICAvLyBsb2dnZWRBc3NlcnQoZmluYWxpemVkID09PSBmYWxzZSwgZXJyRGlzYnVyc2VtZW50QWxyZWFkeUZpbmFsKQogICAgdW5jb3ZlciAzCiAgICBieiBlZGl0RGlzYnVyc2VtZW50X2FmdGVyX2Fzc2VydEA3CiAgICBieXRlYyA3IC8vICJFUlI6ZXJyRGJhZiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJEYmFmCgplZGl0RGlzYnVyc2VtZW50X2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozNTkKICAgIC8vIGNvbnN0IG9sZE1iciA9IHRoaXMuZGlzYnVyc2VtZW50Qm94TWJyKEJ5dGVzKG9sZFRpdGxlKS5sZW5ndGgsIEJ5dGVzKG9sZE5vdGUpLmxlbmd0aCkKICAgIHVuY292ZXIgMgogICAgbGVuCiAgICB1bmNvdmVyIDIKICAgIGxlbgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxODQKICAgIC8vIHJldHVybiBNaW5EaXNidXJzZW1lbnRzTUJSICsgKEJveENvc3RQZXJCeXRlICogKHRpdGxlTGVuZ3RoICsgbm90ZUxlbmd0aCkpCiAgICArCiAgICBpbnRjIDYgLy8gNDAwCiAgICAqCiAgICBpbnRjIDUgLy8gNTQ1MDAKICAgICsKICAgIGR1cAogICAgYnVyeSAxMAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozNjAKICAgIC8vIGNvbnN0IG5ld01iciA9IHRoaXMuZGlzYnVyc2VtZW50Qm94TWJyKEJ5dGVzKHRpdGxlKS5sZW5ndGgsIEJ5dGVzKG5vdGUpLmxlbmd0aCkKICAgIHVuY292ZXIgNgogICAgbGVuCiAgICB1bmNvdmVyIDMKICAgIGxlbgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxODQKICAgIC8vIHJldHVybiBNaW5EaXNidXJzZW1lbnRzTUJSICsgKEJveENvc3RQZXJCeXRlICogKHRpdGxlTGVuZ3RoICsgbm90ZUxlbmd0aCkpCiAgICArCiAgICBpbnRjIDYgLy8gNDAwCiAgICAqCiAgICBpbnRjIDUgLy8gNTQ1MDAKICAgICsKICAgIGR1cAogICAgYnVyeSAxMAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozNjEKICAgIC8vIGlmIChuZXdNYnIgPiBvbGRNYnIpIHsKICAgIDwKICAgIGJ6IGVkaXREaXNidXJzZW1lbnRfZWxzZV9ib2R5QDExCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjM2MgogICAgLy8gY29uc3QgZGVsdGE6IHVpbnQ2NCA9IG5ld01iciAtIG9sZE1icgogICAgZGlnIDcKICAgIGRpZyA3CiAgICAtCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzYzCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZS5tYnJDcmVkaXRzID49IGRlbHRhLCBlcnJJbnZhbGlkTWJyQW1vdW50KQogICAgZGlnIDIKICAgIHB1c2hpbnQgNzUKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgPD0KICAgIGJueiBlZGl0RGlzYnVyc2VtZW50X2FmdGVyX2Fzc2VydEAxMAogICAgYnl0ZWMgNiAvLyAiRVJSOmVyckltYnIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySW1icgoKZWRpdERpc2J1cnNlbWVudF9hZnRlcl9hc3NlcnRAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjM2NAogICAgLy8gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZS5tYnJDcmVkaXRzIC09IGRlbHRhCiAgICBkaWcgMQogICAgZHVwCiAgICBwdXNoaW50IDc1CiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIHVuY292ZXIgMgogICAgLQogICAgaXRvYgogICAgcHVzaGludCA3NQogICAgc3dhcAogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKCmVkaXREaXNidXJzZW1lbnRfYWZ0ZXJfaWZfZWxzZUAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzY5CiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlLnRpdGxlID0gdGl0bGUKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGR1cAogICAgcHVzaGludCAzMwogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyAxCiAgICBpbnRjXzAgLy8gMAogICAgZGlnIDIKICAgIGV4dHJhY3QzCiAgICB1bmNvdmVyIDgKICAgIGNvbmNhdAogICAgZGlnIDIKICAgIHB1c2hpbnQgMTE1CiAgICBleHRyYWN0X3VpbnQxNgogICAgZGlnIDMKICAgIGxlbgogICAgdW5jb3ZlciA0CiAgICBkaWcgMgogICAgdW5jb3ZlciAyCiAgICBzdWJzdHJpbmczCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIHVuY292ZXIgMwogICAgLQogICAgdW5jb3ZlciAyCiAgICB1bmNvdmVyIDcKICAgICsKICAgIHN3YXAKICAgIC0KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICByZXBsYWNlMiAxMTUKICAgIGRpZyAxCiAgICBib3hfZGVsCiAgICBwb3AKICAgIGRpZyAxCiAgICBzd2FwCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjM3MAogICAgLy8gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZS50aW1lVG9VbmxvY2sgPSB0aW1lVG9VbmxvY2sKICAgIGR1cAogICAgcHVzaGludCA0MwogICAgdW5jb3ZlciA1CiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozNzEKICAgIC8vIHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUuZXhwaXJhdGlvbiA9IGV4cGlyYXRpb24KICAgIGR1cAogICAgcHVzaGludCA1MQogICAgdW5jb3ZlciA0CiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozNzIKICAgIC8vIHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUubm90ZSA9IG5vdGUKICAgIGR1cAogICAgYm94X2dldAogICAgcG9wCiAgICBkdXAKICAgIHB1c2hpbnQgMTE1CiAgICBleHRyYWN0X3VpbnQxNgogICAgaW50Y18wIC8vIDAKICAgIHN3YXAKICAgIGV4dHJhY3QzCiAgICB1bmNvdmVyIDIKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIGJveF9kZWwKICAgIHBvcAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozNDQtMzUwCiAgICAvLyBlZGl0RGlzYnVyc2VtZW50KAogICAgLy8gICBpZDogdWludDY0LAogICAgLy8gICB0aXRsZTogc3RyaW5nLAogICAgLy8gICB0aW1lVG9VbmxvY2s6IHVpbnQ2NCwKICAgIC8vICAgZXhwaXJhdGlvbjogdWludDY0LAogICAgLy8gICBub3RlOiBzdHJpbmcKICAgIC8vICk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKZWRpdERpc2J1cnNlbWVudF9lbHNlX2JvZHlAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjM2NQogICAgLy8gfSBlbHNlIGlmIChvbGRNYnIgPiBuZXdNYnIpIHsKICAgIGRpZyA2CiAgICBkaWcgOAogICAgPgogICAgYnogZWRpdERpc2J1cnNlbWVudF9hZnRlcl9pZl9lbHNlQDE0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjM2NgogICAgLy8gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZS5tYnJDcmVkaXRzICs9IG9sZE1iciAtIG5ld01icgogICAgZHVwbiAyCiAgICBwdXNoaW50IDc1CiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGRpZyA4CiAgICBkaWcgMTAKICAgIC0KICAgICsKICAgIGl0b2IKICAgIHB1c2hpbnQgNzUKICAgIHN3YXAKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBiIGVkaXREaXNidXJzZW1lbnRfYWZ0ZXJfaWZfZWxzZUAxNAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6OlJld2FyZHMuY3JlYXRlVXNlckFsbG9jYXRpb25zW3JvdXRpbmddKCkgLT4gdm9pZDoKY3JlYXRlVXNlckFsbG9jYXRpb25zOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozNzUtMzc5CiAgICAvLyBjcmVhdGVVc2VyQWxsb2NhdGlvbnMoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgaWQ6IHVpbnQ2NCwKICAgIC8vICAgYWxsb2NhdGlvbnM6IFVzZXJBbGxvY2F0aW9uW10KICAgIC8vICk6IHZvaWQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgY292ZXIgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgZHVwCiAgICBjb3ZlciA2CiAgICBwdXNoaW50IDQwCiAgICAqCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8c21hcnRfY29udHJhY3RzL3Jld2FyZHMvdHlwZXMudHM6OlVzZXJBbGxvY2F0aW9uPgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozODAKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmRpc2J1cnNlbWVudHMoaWQpLmV4aXN0cywgZXJyRGlzYnVyc2VtZW50RG9lc05vdEV4aXN0KQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo4NAogICAgLy8gZGlzYnVyc2VtZW50cyA9IEJveE1hcDx1aW50NjQsIERpc2J1cnNlbWVudERldGFpbHM+KHsga2V5UHJlZml4OiBSZXdhcmRzQm94UHJlZml4RGlzYnVyc2VtZW50cyB9KQogICAgYnl0ZWNfMCAvLyAiZCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjM4MAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZGlzYnVyc2VtZW50cyhpZCkuZXhpc3RzLCBlcnJEaXNidXJzZW1lbnREb2VzTm90RXhpc3QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBjcmVhdGVVc2VyQWxsb2NhdGlvbnNfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjXzEgLy8gIkVSUjplcnJEYm5lIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckRibmUKCmNyZWF0ZVVzZXJBbGxvY2F0aW9uc19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzgyCiAgICAvLyBjb25zdCB7IGNyZWF0b3IsIGZpbmFsaXplZCB9ID0gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgcHVzaGludCAzMgogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIHN3YXAKICAgIHB1c2hpbnQgMzIKICAgIGludGNfMSAvLyAxCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozODMKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSBjcmVhdG9yLCBlcnJZb3VBcmVOb3RUaGVDcmVhdG9yKQogICAgdHhuIFNlbmRlcgogICAgPT0KICAgIGJueiBjcmVhdGVVc2VyQWxsb2NhdGlvbnNfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjXzMgLy8gIkVSUjplcnJZbmNyIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclluY3IKCmNyZWF0ZVVzZXJBbGxvY2F0aW9uc19hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6Mzg0CiAgICAvLyBsb2dnZWRBc3NlcnQoIWZpbmFsaXplZCwgZXJyRGlzYnVyc2VtZW50QWxyZWFkeUZpbmFsKQogICAgYnogY3JlYXRlVXNlckFsbG9jYXRpb25zX2FmdGVyX2Fzc2VydEA3CiAgICBieXRlYyA3IC8vICJFUlI6ZXJyRGJhZiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJEYmFmCgpjcmVhdGVVc2VyQWxsb2NhdGlvbnNfYWZ0ZXJfYXNzZXJ0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjM4NgogICAgLy8gbGV0IHN1bTogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6Mzg3CiAgICAvLyBsZXQgbmV3Qm94ZXM6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjM4OAogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGFsbG9jYXRpb25zLmxlbmd0aDsgaSArPSAxKSB7CiAgICBpbnRjXzAgLy8gMAoKY3JlYXRlVXNlckFsbG9jYXRpb25zX3doaWxlX3RvcEA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozODgKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBhbGxvY2F0aW9ucy5sZW5ndGg7IGkgKz0gMSkgewogICAgZHVwCiAgICBkaWcgNwogICAgPAogICAgYnogY3JlYXRlVXNlckFsbG9jYXRpb25zX2FmdGVyX3doaWxlQDEwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjM4OQogICAgLy8gbmV3Qm94ZXMgKz0gdGhpcy53cml0ZUFsbG9jYXRpb24oaWQsIGFsbG9jYXRpb25zW2ldLmFkZHJlc3MsIDAsIGFsbG9jYXRpb25zW2ldLmFtb3VudCkKICAgIGRpZyAxCiAgICBleHRyYWN0IDIgMAogICAgZGlnIDEKICAgIHB1c2hpbnQgNDAKICAgICoKICAgIHB1c2hpbnQgNDAKICAgIGV4dHJhY3QzIC8vIG9uIGVycm9yOiBpbmRleCBhY2Nlc3MgaXMgb3V0IG9mIGJvdW5kcwogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIHN3YXAKICAgIHB1c2hpbnQgMzIKICAgIGV4dHJhY3RfdWludDY0CiAgICBkaWcgNwogICAgdW5jb3ZlciAyCiAgICBpbnRjXzAgLy8gMAogICAgZGlnIDMKICAgIGNhbGxzdWIgd3JpdGVBbGxvY2F0aW9uCiAgICB1bmNvdmVyIDUKICAgICsKICAgIGNvdmVyIDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzkwCiAgICAvLyBzdW0gKz0gYWxsb2NhdGlvbnNbaV0uYW1vdW50CiAgICB1bmNvdmVyIDUKICAgICsKICAgIGNvdmVyIDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6Mzg4CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgYWxsb2NhdGlvbnMubGVuZ3RoOyBpICs9IDEpIHsKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBiIGNyZWF0ZVVzZXJBbGxvY2F0aW9uc193aGlsZV90b3BAOAoKY3JlYXRlVXNlckFsbG9jYXRpb25zX2FmdGVyX3doaWxlQDEwOgogICAgcG9wbiAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjM5MwogICAgLy8gdGhpcy51c2VNYnJDcmVkaXQoaWQsIFVzZXJBbGxvY2F0aW9uTUJSICogbmV3Qm94ZXMpCiAgICBpbnRjIDQgLy8gMjUzMDAKICAgIHVuY292ZXIgMgogICAgKgogICAgdW5jb3ZlciAzCiAgICBzd2FwCiAgICBjYWxsc3ViIHVzZU1ickNyZWRpdAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozOTUKICAgIC8vIGFzc2VydEJvdW5kUGF5bWVudChwYXltZW50LCBUeG4uc2VuZGVyLCBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgc3VtKQogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTU2CiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLnNlbmRlciA9PT0gc2VuZGVyLCBlcnJJbnZhbGlkUGF5bWVudFNlbmRlcikKICAgIGRpZyAyCiAgICBndHhucyBTZW5kZXIKICAgID09CiAgICBibnogY3JlYXRlVXNlckFsbG9jYXRpb25zX2FmdGVyX2Fzc2VydEAxMwogICAgYnl0ZWMgMjAgLy8gIkVSUjplcnJJcG1zIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwbXMKCmNyZWF0ZVVzZXJBbGxvY2F0aW9uc19hZnRlcl9hc3NlcnRAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE1NwogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5jbG9zZVJlbWFpbmRlclRvID09PSBHbG9iYWwuemVyb0FkZHJlc3MsIGVyckNsb3NlRm9yYmlkZGVuKQogICAgZGlnIDEKICAgIGd0eG5zIENsb3NlUmVtYWluZGVyVG8KICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIGJueiBjcmVhdGVVc2VyQWxsb2NhdGlvbnNfYWZ0ZXJfYXNzZXJ0QDE1CiAgICBieXRlYyAxMSAvLyAiRVJSOmVyck5jbHMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmNscwoKY3JlYXRlVXNlckFsbG9jYXRpb25zX2FmdGVyX2Fzc2VydEAxNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTU4CiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLnJla2V5VG8gPT09IEdsb2JhbC56ZXJvQWRkcmVzcywgZXJyUmVrZXlGb3JiaWRkZW4pCiAgICBkaWcgMQogICAgZ3R4bnMgUmVrZXlUbwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYm56IGNyZWF0ZVVzZXJBbGxvY2F0aW9uc19hZnRlcl9hc3NlcnRAMTcKICAgIGJ5dGVjIDEyIC8vICJFUlI6ZXJyTnJreSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOcmt5CgpjcmVhdGVVc2VyQWxsb2NhdGlvbnNfYWZ0ZXJfYXNzZXJ0QDE3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNjcKICAgIC8vIGxvZ2dlZEFzc2VydCh0eG4ucmVjZWl2ZXIgPT09IHJlY2VpdmVyLCBlcnJJbnZhbGlkUGF5bWVudFJlY2VpdmVyKQogICAgZGlnIDEKICAgIGd0eG5zIFJlY2VpdmVyCiAgICA9PQogICAgYm56IGNyZWF0ZVVzZXJBbGxvY2F0aW9uc19hZnRlcl9hc3NlcnRAMTkKICAgIGJ5dGVjIDEzIC8vICJFUlI6ZXJySXBtciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcG1yCgpjcmVhdGVVc2VyQWxsb2NhdGlvbnNfYWZ0ZXJfYXNzZXJ0QDE5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNjgKICAgIC8vIGxvZ2dlZEFzc2VydCh0eG4uYW1vdW50ID09PSBhbW91bnQsIGVyckludmFsaWRQYXltZW50QW1vdW50KQogICAgZ3R4bnMgQW1vdW50CiAgICA9PQogICAgYm56IGNyZWF0ZVVzZXJBbGxvY2F0aW9uc19hZnRlcl9hc3NlcnRAMjEKICAgIGJ5dGVjIDE0IC8vICJFUlI6ZXJySXBtYSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcG1hCgpjcmVhdGVVc2VyQWxsb2NhdGlvbnNfYWZ0ZXJfYXNzZXJ0QDIxOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozNzUtMzc5CiAgICAvLyBjcmVhdGVVc2VyQWxsb2NhdGlvbnMoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgaWQ6IHVpbnQ2NCwKICAgIC8vICAgYWxsb2NhdGlvbnM6IFVzZXJBbGxvY2F0aW9uW10KICAgIC8vICk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6OlJld2FyZHMuY3JlYXRlQXNhVXNlckFsbG9jYXRpb25zW3JvdXRpbmddKCkgLT4gdm9pZDoKY3JlYXRlQXNhVXNlckFsbG9jYXRpb25zOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozOTgtNDAyCiAgICAvLyBjcmVhdGVBc2FVc2VyQWxsb2NhdGlvbnMoCiAgICAvLyAgIGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICBpZDogdWludDY0LAogICAgLy8gICBhbGxvY2F0aW9uczogVXNlckFsbG9jYXRpb25bXQogICAgLy8gKTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNCAvLyBheGZlcgogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGF4ZmVyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgY292ZXIgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgZHVwCiAgICBjb3ZlciA2CiAgICBwdXNoaW50IDQwCiAgICAqCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8c21hcnRfY29udHJhY3RzL3Jld2FyZHMvdHlwZXMudHM6OlVzZXJBbGxvY2F0aW9uPgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0MDMKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmRpc2J1cnNlbWVudHMoaWQpLmV4aXN0cywgZXJyRGlzYnVyc2VtZW50RG9lc05vdEV4aXN0KQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo4NAogICAgLy8gZGlzYnVyc2VtZW50cyA9IEJveE1hcDx1aW50NjQsIERpc2J1cnNlbWVudERldGFpbHM+KHsga2V5UHJlZml4OiBSZXdhcmRzQm94UHJlZml4RGlzYnVyc2VtZW50cyB9KQogICAgYnl0ZWNfMCAvLyAiZCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQwMwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZGlzYnVyc2VtZW50cyhpZCkuZXhpc3RzLCBlcnJEaXNidXJzZW1lbnREb2VzTm90RXhpc3QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBjcmVhdGVBc2FVc2VyQWxsb2NhdGlvbnNfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjXzEgLy8gIkVSUjplcnJEYm5lIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckRibmUKCmNyZWF0ZUFzYVVzZXJBbGxvY2F0aW9uc19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDA1CiAgICAvLyBjb25zdCB7IGNyZWF0b3IsIGZpbmFsaXplZCB9ID0gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgcHVzaGludCAzMgogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIHN3YXAKICAgIHB1c2hpbnQgMzIKICAgIGludGNfMSAvLyAxCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0MDYKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSBjcmVhdG9yLCBlcnJZb3VBcmVOb3RUaGVDcmVhdG9yKQogICAgdHhuIFNlbmRlcgogICAgPT0KICAgIGJueiBjcmVhdGVBc2FVc2VyQWxsb2NhdGlvbnNfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjXzMgLy8gIkVSUjplcnJZbmNyIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclluY3IKCmNyZWF0ZUFzYVVzZXJBbGxvY2F0aW9uc19hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDA3CiAgICAvLyBsb2dnZWRBc3NlcnQoIWZpbmFsaXplZCwgZXJyRGlzYnVyc2VtZW50QWxyZWFkeUZpbmFsKQogICAgYnogY3JlYXRlQXNhVXNlckFsbG9jYXRpb25zX2FmdGVyX2Fzc2VydEA3CiAgICBieXRlYyA3IC8vICJFUlI6ZXJyRGJhZiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJEYmFmCgpjcmVhdGVBc2FVc2VyQWxsb2NhdGlvbnNfYWZ0ZXJfYXNzZXJ0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQwOQogICAgLy8gY29uc3QgYXNzZXQgPSBhc3NldFhmZXIueGZlckFzc2V0LmlkCiAgICBkaWcgMgogICAgZ3R4bnMgWGZlckFzc2V0CiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQxMAogICAgLy8gbGV0IG1hdGNoU3VtOiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0MTEKICAgIC8vIGxldCBuZXdCb3hlczogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDEyCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgYWxsb2NhdGlvbnMubGVuZ3RoOyBpICs9IDEpIHsKICAgIGludGNfMCAvLyAwCgpjcmVhdGVBc2FVc2VyQWxsb2NhdGlvbnNfd2hpbGVfdG9wQDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQxMgogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGFsbG9jYXRpb25zLmxlbmd0aDsgaSArPSAxKSB7CiAgICBkdXAKICAgIGRpZyA4CiAgICA8CiAgICBieiBjcmVhdGVBc2FVc2VyQWxsb2NhdGlvbnNfYWZ0ZXJfd2hpbGVAMTAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDEzCiAgICAvLyBuZXdCb3hlcyArPSB0aGlzLndyaXRlQWxsb2NhdGlvbihpZCwgYWxsb2NhdGlvbnNbaV0uYWRkcmVzcywgYXNzZXQsIGFsbG9jYXRpb25zW2ldLmFtb3VudCkKICAgIGRpZyAxCiAgICBleHRyYWN0IDIgMAogICAgZGlnIDEKICAgIHB1c2hpbnQgNDAKICAgICoKICAgIHB1c2hpbnQgNDAKICAgIGV4dHJhY3QzIC8vIG9uIGVycm9yOiBpbmRleCBhY2Nlc3MgaXMgb3V0IG9mIGJvdW5kcwogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIHN3YXAKICAgIHB1c2hpbnQgMzIKICAgIGV4dHJhY3RfdWludDY0CiAgICBkaWcgNQogICAgdW5jb3ZlciAyCiAgICBkaWcgOQogICAgZGlnIDMKICAgIGNhbGxzdWIgd3JpdGVBbGxvY2F0aW9uCiAgICB1bmNvdmVyIDQKICAgICsKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDE0CiAgICAvLyBtYXRjaFN1bSArPSBhbGxvY2F0aW9uc1tpXS5hbW91bnQKICAgIHVuY292ZXIgNgogICAgKwogICAgY292ZXIgNQogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0MTIKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBhbGxvY2F0aW9ucy5sZW5ndGg7IGkgKz0gMSkgewogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGIgY3JlYXRlQXNhVXNlckFsbG9jYXRpb25zX3doaWxlX3RvcEA4CgpjcmVhdGVBc2FVc2VyQWxsb2NhdGlvbnNfYWZ0ZXJfd2hpbGVAMTA6CiAgICBwb3BuIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDE3CiAgICAvLyB0aGlzLnVzZU1ickNyZWRpdChpZCwgVXNlckFsbG9jYXRpb25NQlIgKiBuZXdCb3hlcykKICAgIGludGMgNCAvLyAyNTMwMAogICAgKgogICAgY2FsbHN1YiB1c2VNYnJDcmVkaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDE5CiAgICAvLyBhc3NlcnRCb3VuZEFzc2V0VHJhbnNmZXIoYXNzZXRYZmVyLCBUeG4uc2VuZGVyLCBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgYXNzZXRYZmVyLnhmZXJBc3NldCwgbWF0Y2hTdW0pCiAgICB0eG4gU2VuZGVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgdW5jb3ZlciA0CiAgICB1bmNvdmVyIDQKICAgIGNhbGxzdWIgYXNzZXJ0Qm91bmRBc3NldFRyYW5zZmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjM5OC00MDIKICAgIC8vIGNyZWF0ZUFzYVVzZXJBbGxvY2F0aW9ucygKICAgIC8vICAgYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIGlkOiB1aW50NjQsCiAgICAvLyAgIGFsbG9jYXRpb25zOiBVc2VyQWxsb2NhdGlvbltdCiAgICAvLyApOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjpSZXdhcmRzLmNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDMxLTQzOQogICAgLy8gY3JlYXRlQXNhRGlzYnVyc2VtZW50RnJvbUdyb3VwKAogICAgLy8gICBtYnJQYXltZW50SW5kZXg6IHVpbnQ2NCwKICAgIC8vICAgYXNzZXRUcmFuc2ZlclN0YXJ0SW5kZXg6IHVpbnQ2NCwKICAgIC8vICAgdGl0bGU6IHN0cmluZywKICAgIC8vICAgdGltZVRvVW5sb2NrOiB1aW50NjQsCiAgICAvLyAgIGV4cGlyYXRpb246IHVpbnQ2NCwKICAgIC8vICAgbm90ZTogc3RyaW5nLAogICAgLy8gICBhbGxvY2F0aW9uczogVXNlckFsbG9jYXRpb25bXQogICAgLy8gKTogdWludDY0IHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBjb3ZlciAyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA1CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA2CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgY292ZXIgMwogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNwogICAgZHVwCiAgICBjb3ZlciA3CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGR1cAogICAgcHVzaGludCA0MAogICAgKgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIHVuY292ZXIgMgogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8c21hcnRfY29udHJhY3RzL3Jld2FyZHMvdHlwZXMudHM6OlVzZXJBbGxvY2F0aW9uPgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0NDEKICAgIC8vIGxvZ2dlZEFzc2VydChjb3VudCA+IDAsIGVyckRpc2J1cnNlbWVudHNNdXN0SGF2ZUFsbG9jYXRpb25zKQogICAgYm56IGNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cF9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgOCAvLyAiRVJSOmVyckRibWEiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyRGJtYQoKY3JlYXRlQXNhRGlzYnVyc2VtZW50RnJvbUdyb3VwX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0NDIKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uZ3JvdXBJbmRleCA+IGNvdW50LCBlcnJJbnZhbGlkR3JvdXBJbmRleCkKICAgIHR4biBHcm91cEluZGV4CiAgICBkaWcgMQogICAgPgogICAgYm56IGNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cF9hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgMTcgLy8gIkVSUjplcnJJZ2l4IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklnaXgKCmNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cF9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDQzCiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRUcmFuc2ZlclN0YXJ0SW5kZXggPT09IFR4bi5ncm91cEluZGV4IC0gY291bnQsIGVyckludmFsaWRHcm91cEluZGV4KQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGRpZyAxCiAgICAtCiAgICBkaWcgMgogICAgPT0KICAgIGJueiBjcmVhdGVBc2FEaXNidXJzZW1lbnRGcm9tR3JvdXBfYWZ0ZXJfYXNzZXJ0QDcKICAgIGJ5dGVjIDE3IC8vICJFUlI6ZXJySWdpeCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJZ2l4CgpjcmVhdGVBc2FEaXNidXJzZW1lbnRGcm9tR3JvdXBfYWZ0ZXJfYXNzZXJ0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ0NAogICAgLy8gbG9nZ2VkQXNzZXJ0KG1iclBheW1lbnRJbmRleCA9PT0gYXNzZXRUcmFuc2ZlclN0YXJ0SW5kZXggLSAxLCBlcnJJbnZhbGlkR3JvdXBJbmRleCkKICAgIGRpZyAxCiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZGlnIDYKICAgID09CiAgICBibnogY3JlYXRlQXNhRGlzYnVyc2VtZW50RnJvbUdyb3VwX2FmdGVyX2Fzc2VydEA5CiAgICBieXRlYyAxNyAvLyAiRVJSOmVycklnaXgiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySWdpeAoKY3JlYXRlQXNhRGlzYnVyc2VtZW50RnJvbUdyb3VwX2FmdGVyX2Fzc2VydEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0NDYKICAgIC8vIHRoaXMuYXNzZXJ0VmFsaWRVbmxvY2sodGltZVRvVW5sb2NrKQogICAgdW5jb3ZlciAzCiAgICBkdXAKICAgIGNhbGxzdWIgYXNzZXJ0VmFsaWRVbmxvY2sKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDQ3CiAgICAvLyB0aGlzLmFzc2VydFZhbGlkRXhwaXJhdGlvbihleHBpcmF0aW9uKQogICAgdW5jb3ZlciAzCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGNhbGxzdWIgYXNzZXJ0VmFsaWRFeHBpcmF0aW9uCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ0OQogICAgLy8gY29uc3QgaWQgPSB0aGlzLm5ld0Rpc2J1cnNlbWVudElEKCkKICAgIGNhbGxzdWIgbmV3RGlzYnVyc2VtZW50SUQKICAgIGR1cAogICAgY292ZXIgNQogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0NTAKICAgIC8vIGNvbnN0IHBheW1lbnQgPSBndHhuLlBheW1lbnRUeG4obWJyUGF5bWVudEluZGV4KQogICAgdW5jb3ZlciA3CiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ1MgogICAgLy8gY29uc3QgY29zdHMgPSB0aGlzLm1icih0aXRsZSwgbm90ZSkKICAgIHVuY292ZXIgOAogICAgZHVwCiAgICBjb3ZlciAzCiAgICB1bmNvdmVyIDkKICAgIGR1cAogICAgY292ZXIgNwogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9iYXNlLnRzOjpCYXNlUmV3YXJkcy5tYnIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDUzCiAgICAvLyBjb25zdCBkaXNidXJzZW1lbnRNYnJBbW91bnQgPSBjb3N0cy5kaXNidXJzZW1lbnRzCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0NTQKICAgIC8vIGNvbnN0IGFsbG9jYXRpb25NYnJBbW91bnQ6IHVpbnQ2NCA9IGNvc3RzLnVzZXJBbGxvY2F0aW9ucyAqIGNvdW50CiAgICBzd2FwCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIGRpZyA4CiAgICAqCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ1OQogICAgLy8gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0NjAKICAgIC8vIGRpc2J1cnNlbWVudE1ickFtb3VudCArIGFsbG9jYXRpb25NYnJBbW91bnQgKyB0aGlzLnNwb25zb3IoaWQsIHBheW1lbnQuc2VuZGVyKQogICAgdW5jb3ZlciAyCiAgICBkaWcgMgogICAgKwogICAgZGlnIDMKICAgIGd0eG5zIFNlbmRlcgogICAgZGlnIDUKICAgIHN3YXAKICAgIGNhbGxzdWIgc3BvbnNvcgogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0NTctNDYxCiAgICAvLyBhc3NlcnRFeGFjdFBheW1lbnQoCiAgICAvLyAgIHBheW1lbnQsCiAgICAvLyAgIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICBkaXNidXJzZW1lbnRNYnJBbW91bnQgKyBhbGxvY2F0aW9uTWJyQW1vdW50ICsgdGhpcy5zcG9uc29yKGlkLCBwYXltZW50LnNlbmRlcikKICAgIC8vICkKICAgIHVuY292ZXIgMwogICAgY292ZXIgMgogICAgY2FsbHN1YiBhc3NlcnRFeGFjdFBheW1lbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDY0CiAgICAvLyBjcmVhdG9yOiBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0NzMKICAgIC8vIHJlY2xhaW1UbzogR2xvYmFsLnplcm9BZGRyZXNzLAogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ2My00NzUKICAgIC8vIHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUgPSB7CiAgICAvLyAgIGNyZWF0b3I6IFR4bi5zZW5kZXIsCiAgICAvLyAgIGZpbmFsaXplZDogZmFsc2UsCiAgICAvLyAgIHRpdGxlLAogICAgLy8gICBhbW91bnQ6IDAsCiAgICAvLyAgIHRpbWVUb1VubG9jaywKICAgIC8vICAgZXhwaXJhdGlvbiwKICAgIC8vICAgYWxsb2NhdGlvbnM6IDAsCiAgICAvLyAgIGRpc3RyaWJ1dGVkOiAwLAogICAgLy8gICBtYnJDcmVkaXRzOiBhbGxvY2F0aW9uTWJyQW1vdW50LAogICAgLy8gICByZWNsYWltVG86IEdsb2JhbC56ZXJvQWRkcmVzcywKICAgIC8vICAgbm90ZSwKICAgIC8vIH0KICAgIGRpZyA0CiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICB1bmNvdmVyIDUKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBieXRlYyAyMSAvLyAweDAwMDA3NQogICAgY29uY2F0CiAgICBkaWcgMQogICAgbGVuCiAgICBwdXNoaW50IDExNwogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0NjcKICAgIC8vIGFtb3VudDogMCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ2My00NzUKICAgIC8vIHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUgPSB7CiAgICAvLyAgIGNyZWF0b3I6IFR4bi5zZW5kZXIsCiAgICAvLyAgIGZpbmFsaXplZDogZmFsc2UsCiAgICAvLyAgIHRpdGxlLAogICAgLy8gICBhbW91bnQ6IDAsCiAgICAvLyAgIHRpbWVUb1VubG9jaywKICAgIC8vICAgZXhwaXJhdGlvbiwKICAgIC8vICAgYWxsb2NhdGlvbnM6IDAsCiAgICAvLyAgIGRpc3RyaWJ1dGVkOiAwLAogICAgLy8gICBtYnJDcmVkaXRzOiBhbGxvY2F0aW9uTWJyQW1vdW50LAogICAgLy8gICByZWNsYWltVG86IEdsb2JhbC56ZXJvQWRkcmVzcywKICAgIC8vICAgbm90ZSwKICAgIC8vIH0KICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgZGlnIDEKICAgIGNvbmNhdAogICAgdW5jb3ZlciA3CiAgICBpdG9iCiAgICBjb25jYXQKICAgIHVuY292ZXIgNwogICAgaXRvYgogICAgY29uY2F0CiAgICBkaWcgMQogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIHVuY292ZXIgNAogICAgaXRvYgogICAgY29uY2F0CiAgICB1bmNvdmVyIDMKICAgIGNvbmNhdAogICAgZGlnIDQKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHVuY292ZXIgNQogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0NjMKICAgIC8vIHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUgPSB7CiAgICBzd2FwCiAgICBpdG9iCiAgICBkdXAKICAgIGNvdmVyIDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6ODQKICAgIC8vIGRpc2J1cnNlbWVudHMgPSBCb3hNYXA8dWludDY0LCBEaXNidXJzZW1lbnREZXRhaWxzPih7IGtleVByZWZpeDogUmV3YXJkc0JveFByZWZpeERpc2J1cnNlbWVudHMgfSkKICAgIGJ5dGVjXzAgLy8gImQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0NjMtNDc1CiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlID0gewogICAgLy8gICBjcmVhdG9yOiBUeG4uc2VuZGVyLAogICAgLy8gICBmaW5hbGl6ZWQ6IGZhbHNlLAogICAgLy8gICB0aXRsZSwKICAgIC8vICAgYW1vdW50OiAwLAogICAgLy8gICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgIGV4cGlyYXRpb24sCiAgICAvLyAgIGFsbG9jYXRpb25zOiAwLAogICAgLy8gICBkaXN0cmlidXRlZDogMCwKICAgIC8vICAgbWJyQ3JlZGl0czogYWxsb2NhdGlvbk1ickFtb3VudCwKICAgIC8vICAgcmVjbGFpbVRvOiBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICAvLyAgIG5vdGUsCiAgICAvLyB9CiAgICBkdXAKICAgIGJveF9kZWwKICAgIHBvcAogICAgc3dhcAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0NzcKICAgIC8vIGxldCBuZXdCb3hlczogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDc4CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgY291bnQ7IGkgKz0gMSkgewogICAgaW50Y18wIC8vIDAKICAgIHN3YXAKCmNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cF93aGlsZV90b3BAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ3OAogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGNvdW50OyBpICs9IDEpIHsKICAgIGRpZyAxCiAgICBkaWcgMwogICAgPAogICAgYnogY3JlYXRlQXNhRGlzYnVyc2VtZW50RnJvbUdyb3VwX2FmdGVyX3doaWxlQDE0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ3OQogICAgLy8gY29uc3QgYXNzZXRYZmVyID0gZ3R4bi5Bc3NldFRyYW5zZmVyVHhuKGFzc2V0VHJhbnNmZXJTdGFydEluZGV4ICsgaSkKICAgIGRpZyA0CiAgICBkaWcgMgogICAgZHVwCiAgICBjb3ZlciAyCiAgICArCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDQgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0ODAtNDgxCiAgICAvLyBjb25zdCBhbGxvY2F0aW9uID0gY2xvbmUoYWxsb2NhdGlvbnNbaV0pCiAgICAvLyBsb2dnZWRBc3NlcnQoYWxsb2NhdGlvbi5hbW91bnQgPiAwLCBlcnJEaXNidXJzZW1lbnRzQ2Fubm90QmVFbXB0eSkKICAgIGRpZyA5CiAgICBleHRyYWN0IDIgMAogICAgc3dhcAogICAgcHVzaGludCA0MAogICAgKgogICAgcHVzaGludCA0MAogICAgZXh0cmFjdDMgLy8gb24gZXJyb3I6IGluZGV4IGFjY2VzcyBpcyBvdXQgb2YgYm91bmRzCiAgICBkdXAKICAgIGNvdmVyIDYKICAgIHB1c2hpbnQgMzIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDgxCiAgICAvLyBsb2dnZWRBc3NlcnQoYWxsb2NhdGlvbi5hbW91bnQgPiAwLCBlcnJEaXNidXJzZW1lbnRzQ2Fubm90QmVFbXB0eSkKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGJueiBjcmVhdGVBc2FEaXNidXJzZW1lbnRGcm9tR3JvdXBfYWZ0ZXJfYXNzZXJ0QDEzCiAgICBieXRlYyAxOCAvLyAiRVJSOmVyckRiZW0iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyRGJlbQoKY3JlYXRlQXNhRGlzYnVyc2VtZW50RnJvbUdyb3VwX2FmdGVyX2Fzc2VydEAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDg0CiAgICAvLyBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0ODUKICAgIC8vIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDg2CiAgICAvLyBhc3NldFhmZXIueGZlckFzc2V0LAogICAgdW5jb3ZlciAzCiAgICBkdXAKICAgIGd0eG5zIFhmZXJBc3NldAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0ODItNDg4CiAgICAvLyBhc3NlcnRCb3VuZEFzc2V0VHJhbnNmZXIoCiAgICAvLyAgIGFzc2V0WGZlciwKICAgIC8vICAgVHhuLnNlbmRlciwKICAgIC8vICAgR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgIGFzc2V0WGZlci54ZmVyQXNzZXQsCiAgICAvLyAgIGFsbG9jYXRpb24uYW1vdW50CiAgICAvLyApCiAgICBzd2FwCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMwogICAgZGlnIDMKICAgIGRpZyA1CiAgICBjYWxsc3ViIGFzc2VydEJvdW5kQXNzZXRUcmFuc2ZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0ODkKICAgIC8vIG5ld0JveGVzICs9IHRoaXMud3JpdGVBbGxvY2F0aW9uKGlkLCBhbGxvY2F0aW9uLmFkZHJlc3MsIGFzc2V0WGZlci54ZmVyQXNzZXQuaWQsIGFsbG9jYXRpb24uYW1vdW50KQogICAgdW5jb3ZlciA2CiAgICBleHRyYWN0IDAgMzIKICAgIGRpZyA5CiAgICBzd2FwCiAgICB1bmNvdmVyIDIKICAgIHVuY292ZXIgMwogICAgY2FsbHN1YiB3cml0ZUFsbG9jYXRpb24KICAgIHVuY292ZXIgNAogICAgKwogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0NzgKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBjb3VudDsgaSArPSAxKSB7CiAgICBzd2FwCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgc3dhcAogICAgYiBjcmVhdGVBc2FEaXNidXJzZW1lbnRGcm9tR3JvdXBfd2hpbGVfdG9wQDEwCgpjcmVhdGVBc2FEaXNidXJzZW1lbnRGcm9tR3JvdXBfYWZ0ZXJfd2hpbGVAMTQ6CiAgICBidXJ5IDEKICAgIGJ1cnkgMQogICAgdW5jb3ZlciAyCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDkyCiAgICAvLyB0aGlzLnVzZU1ickNyZWRpdChpZCwgVXNlckFsbG9jYXRpb25NQlIgKiBuZXdCb3hlcykKICAgIGludGMgNCAvLyAyNTMwMAogICAgdW5jb3ZlciAyCiAgICAqCiAgICB1bmNvdmVyIDMKICAgIHN3YXAKICAgIGNhbGxzdWIgdXNlTWJyQ3JlZGl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ5NAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUuYW1vdW50ID4gMCwgZXJyRGlzYnVyc2VtZW50c0Nhbm5vdEJlRW1wdHkpCiAgICBkdXAKICAgIHB1c2hpbnQgMzUKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgYm56IGNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cF9hZnRlcl9hc3NlcnRAMTYKICAgIGJ5dGVjIDE4IC8vICJFUlI6ZXJyRGJlbSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJEYmVtCgpjcmVhdGVBc2FEaXNidXJzZW1lbnRGcm9tR3JvdXBfYWZ0ZXJfYXNzZXJ0QDE2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0OTUKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlLmFsbG9jYXRpb25zID4gMCwgZXJyRGlzYnVyc2VtZW50c011c3RIYXZlQWxsb2NhdGlvbnMpCiAgICBkdXAKICAgIHB1c2hpbnQgNTkKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgYm56IGNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cF9hZnRlcl9hc3NlcnRAMTgKICAgIGJ5dGVjIDggLy8gIkVSUjplcnJEYm1hIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckRibWEKCmNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cF9hZnRlcl9hc3NlcnRAMTg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ5NwogICAgLy8gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZS5maW5hbGl6ZWQgPSB0cnVlCiAgICBkdXAKICAgIHB1c2hpbnQgMzIKICAgIGludGNfMSAvLyAxCiAgICBib3hfZXh0cmFjdAogICAgaW50Y18wIC8vIDAKICAgIGludGNfMSAvLyAxCiAgICBzZXRiaXQKICAgIHB1c2hpbnQgMzIKICAgIHN3YXAKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQzMS00MzkKICAgIC8vIGNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cCgKICAgIC8vICAgbWJyUGF5bWVudEluZGV4OiB1aW50NjQsCiAgICAvLyAgIGFzc2V0VHJhbnNmZXJTdGFydEluZGV4OiB1aW50NjQsCiAgICAvLyAgIHRpdGxlOiBzdHJpbmcsCiAgICAvLyAgIHRpbWVUb1VubG9jazogdWludDY0LAogICAgLy8gICBleHBpcmF0aW9uOiB1aW50NjQsCiAgICAvLyAgIG5vdGU6IHN0cmluZywKICAgIC8vICAgYWxsb2NhdGlvbnM6IFVzZXJBbGxvY2F0aW9uW10KICAgIC8vICk6IHVpbnQ2NCB7CiAgICBieXRlY18yIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo6UmV3YXJkcy5maW5hbGl6ZURpc2J1cnNlbWVudFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmZpbmFsaXplRGlzYnVyc2VtZW50OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1MDIKICAgIC8vIGZpbmFsaXplRGlzYnVyc2VtZW50KGlkOiB1aW50NjQpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTAzCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5kaXNidXJzZW1lbnRzKGlkKS5leGlzdHMsIGVyckRpc2J1cnNlbWVudERvZXNOb3RFeGlzdCkKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6ODQKICAgIC8vIGRpc2J1cnNlbWVudHMgPSBCb3hNYXA8dWludDY0LCBEaXNidXJzZW1lbnREZXRhaWxzPih7IGtleVByZWZpeDogUmV3YXJkc0JveFByZWZpeERpc2J1cnNlbWVudHMgfSkKICAgIGJ5dGVjXzAgLy8gImQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1MDMKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmRpc2J1cnNlbWVudHMoaWQpLmV4aXN0cywgZXJyRGlzYnVyc2VtZW50RG9lc05vdEV4aXN0KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogZmluYWxpemVEaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjXzEgLy8gIkVSUjplcnJEYm5lIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckRibmUKCmZpbmFsaXplRGlzYnVyc2VtZW50X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1MDUKICAgIC8vIGNvbnN0IHsgY3JlYXRvciwgZmluYWxpemVkLCB0aW1lVG9VbmxvY2ssIGV4cGlyYXRpb24sIGFtb3VudCwgYWxsb2NhdGlvbnMgfSA9IHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUKICAgIGR1cG4gMgogICAgaW50Y18wIC8vIDAKICAgIHB1c2hpbnQgMzIKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBkaWcgMQogICAgcHVzaGludCAzMgogICAgaW50Y18xIC8vIDEKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Yml0CiAgICBjb3ZlciAzCiAgICBkaWcgMQogICAgcHVzaGludCA0MwogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBjb3ZlciAzCiAgICBkaWcgMQogICAgcHVzaGludCA1MQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBjb3ZlciAzCiAgICBkaWcgMQogICAgcHVzaGludCAzNQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBjb3ZlciAzCiAgICBzd2FwCiAgICBwdXNoaW50IDU5CiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTA2CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gY3JlYXRvciwgZXJyWW91QXJlTm90VGhlQ3JlYXRvcikKICAgIHR4biBTZW5kZXIKICAgID09CiAgICBibnogZmluYWxpemVEaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjXzMgLy8gIkVSUjplcnJZbmNyIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclluY3IKCmZpbmFsaXplRGlzYnVyc2VtZW50X2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1MDcKICAgIC8vIGxvZ2dlZEFzc2VydCghZmluYWxpemVkLCBlcnJEaXNidXJzZW1lbnRBbHJlYWR5RmluYWwpCiAgICB1bmNvdmVyIDUKICAgIGJ6IGZpbmFsaXplRGlzYnVyc2VtZW50X2FmdGVyX2Fzc2VydEA3CiAgICBieXRlYyA3IC8vICJFUlI6ZXJyRGJhZiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJEYmFmCgpmaW5hbGl6ZURpc2J1cnNlbWVudF9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTA4CiAgICAvLyB0aGlzLmFzc2VydFZhbGlkVW5sb2NrKHRpbWVUb1VubG9jaykKICAgIHVuY292ZXIgNAogICAgY2FsbHN1YiBhc3NlcnRWYWxpZFVubG9jawogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1MDkKICAgIC8vIHRoaXMuYXNzZXJ0VmFsaWRFeHBpcmF0aW9uKGV4cGlyYXRpb24pCiAgICB1bmNvdmVyIDMKICAgIGNhbGxzdWIgYXNzZXJ0VmFsaWRFeHBpcmF0aW9uCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjUxMAogICAgLy8gbG9nZ2VkQXNzZXJ0KGFtb3VudCA+IDAsIGVyckRpc2J1cnNlbWVudHNDYW5ub3RCZUVtcHR5KQogICAgdW5jb3ZlciAyCiAgICBibnogZmluYWxpemVEaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDkKICAgIGJ5dGVjIDE4IC8vICJFUlI6ZXJyRGJlbSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJEYmVtCgpmaW5hbGl6ZURpc2J1cnNlbWVudF9hZnRlcl9hc3NlcnRAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTExCiAgICAvLyBsb2dnZWRBc3NlcnQoYWxsb2NhdGlvbnMgPiAwLCBlcnJEaXNidXJzZW1lbnRzTXVzdEhhdmVBbGxvY2F0aW9ucykKICAgIGJueiBmaW5hbGl6ZURpc2J1cnNlbWVudF9hZnRlcl9hc3NlcnRAMTEKICAgIGJ5dGVjIDggLy8gIkVSUjplcnJEYm1hIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckRibWEKCmZpbmFsaXplRGlzYnVyc2VtZW50X2FmdGVyX2Fzc2VydEAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTEzCiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlLmZpbmFsaXplZCA9IHRydWUKICAgIGR1cAogICAgcHVzaGludCAzMgogICAgaW50Y18xIC8vIDEKICAgIGJveF9leHRyYWN0CiAgICBpbnRjXzAgLy8gMAogICAgaW50Y18xIC8vIDEKICAgIHNldGJpdAogICAgcHVzaGludCAzMgogICAgc3dhcAogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTAyCiAgICAvLyBmaW5hbGl6ZURpc2J1cnNlbWVudChpZDogdWludDY0KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo6UmV3YXJkcy5jcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50W3JvdXRpbmddKCkgLT4gdm9pZDoKY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTI0LTUzMAogICAgLy8gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgbWJyUGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICB0aW1lVG9VbmxvY2s6IHVpbnQ2NCwKICAgIC8vICAgZXhwaXJhdGlvbjogdWludDY0LAogICAgLy8gICBhbGxvY2F0aW9uczogVXNlckFsbG9jYXRpb25bXSwKICAgIC8vICAgcmVjbGFpbVRvOiBBY2NvdW50CiAgICAvLyApOiB1aW50NjQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDQwCiAgICAqCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL3R5cGVzLnRzOjpVc2VyQWxsb2NhdGlvbj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTMxCiAgICAvLyBjb25zdCB7IGlkLCBzdW0sIG1ickFtb3VudCB9ID0gdGhpcy5uZXdJbnN0YW50RGlzYnVyc2VtZW50KDAsIHRpbWVUb1VubG9jaywgZXhwaXJhdGlvbiwgYWxsb2NhdGlvbnMsIHJlY2xhaW1UbykKICAgIGludGNfMCAvLyAwCiAgICBjb3ZlciA0CiAgICBjYWxsc3ViIG5ld0luc3RhbnREaXNidXJzZW1lbnQKICAgIHBvcAogICAgZHVwCiAgICBleHRyYWN0IDAgOAogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZGlnIDIKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgdW5jb3ZlciAzCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1MzIKICAgIC8vIGFzc2VydEV4YWN0UGF5bWVudChtYnJQYXltZW50LCBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgbWJyQW1vdW50ICsgc3VtICsgdGhpcy5zcG9uc29yKGlkLCBtYnJQYXltZW50LnNlbmRlcikpCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgc3dhcAogICAgdW5jb3ZlciAyCiAgICArCiAgICBkaWcgNAogICAgZ3R4bnMgU2VuZGVyCiAgICB1bmNvdmVyIDMKICAgIHN3YXAKICAgIGNhbGxzdWIgc3BvbnNvcgogICAgKwogICAgdW5jb3ZlciAzCiAgICBjb3ZlciAyCiAgICBjYWxsc3ViIGFzc2VydEV4YWN0UGF5bWVudAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1MjQtNTMwCiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICBtYnJQYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIHRpbWVUb1VubG9jazogdWludDY0LAogICAgLy8gICBleHBpcmF0aW9uOiB1aW50NjQsCiAgICAvLyAgIGFsbG9jYXRpb25zOiBVc2VyQWxsb2NhdGlvbltdLAogICAgLy8gICByZWNsYWltVG86IEFjY291bnQKICAgIC8vICk6IHVpbnQ2NCB7CiAgICBieXRlY18yIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo6UmV3YXJkcy5sZWdhY3lDcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50W3JvdXRpbmddKCkgLT4gdm9pZDoKbGVnYWN5Q3JlYXRlSW5zdGFudERpc2J1cnNlbWVudDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTQwCiAgICAvLyBAYWJpbWV0aG9kKHsgbmFtZTogJ2NyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQnIH0pCiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgNDAKICAgICoKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8c21hcnRfY29udHJhY3RzL3Jld2FyZHMvdHlwZXMudHM6OlVzZXJBbGxvY2F0aW9uPgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1NDcKICAgIC8vIGNvbnN0IHsgaWQsIHN1bSwgbWJyQW1vdW50IH0gPSB0aGlzLm5ld0luc3RhbnREaXNidXJzZW1lbnQoMCwgdGltZVRvVW5sb2NrLCBleHBpcmF0aW9uLCBhbGxvY2F0aW9ucywgR2xvYmFsLnplcm9BZGRyZXNzKQogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICBpbnRjXzAgLy8gMAogICAgY292ZXIgNAogICAgY2FsbHN1YiBuZXdJbnN0YW50RGlzYnVyc2VtZW50CiAgICBwb3AKICAgIGR1cAogICAgZXh0cmFjdCAwIDgKICAgIGRpZyAxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGRpZyAyCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIHVuY292ZXIgMwogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTQ4CiAgICAvLyBhc3NlcnRFeGFjdFBheW1lbnQobWJyUGF5bWVudCwgR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIG1ickFtb3VudCArIHN1bSArIHRoaXMuc3BvbnNvcihpZCwgbWJyUGF5bWVudC5zZW5kZXIpKQogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIHN3YXAKICAgIHVuY292ZXIgMgogICAgKwogICAgZGlnIDQKICAgIGd0eG5zIFNlbmRlcgogICAgdW5jb3ZlciAzCiAgICBzd2FwCiAgICBjYWxsc3ViIHNwb25zb3IKICAgICsKICAgIHVuY292ZXIgMwogICAgY292ZXIgMgogICAgY2FsbHN1YiBhc3NlcnRFeGFjdFBheW1lbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTQwCiAgICAvLyBAYWJpbWV0aG9kKHsgbmFtZTogJ2NyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQnIH0pCiAgICBieXRlY18yIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo6UmV3YXJkcy5jcmVhdGVJbnN0YW50QXNhRGlzYnVyc2VtZW50W3JvdXRpbmddKCkgLT4gdm9pZDoKY3JlYXRlSW5zdGFudEFzYURpc2J1cnNlbWVudDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTUzLTU2MAogICAgLy8gY3JlYXRlSW5zdGFudEFzYURpc2J1cnNlbWVudCgKICAgIC8vICAgbWJyUGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgdGltZVRvVW5sb2NrOiB1aW50NjQsCiAgICAvLyAgIGV4cGlyYXRpb246IHVpbnQ2NCwKICAgIC8vICAgYWxsb2NhdGlvbnM6IFVzZXJBbGxvY2F0aW9uW10sCiAgICAvLyAgIHJlY2xhaW1UbzogQWNjb3VudAogICAgLy8gKTogdWludDY0IHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzMgLy8gMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDQgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCA0MAogICAgKgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxzbWFydF9jb250cmFjdHMvcmV3YXJkcy90eXBlcy50czo6VXNlckFsbG9jYXRpb24+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjU2MQogICAgLy8gY29uc3QgeyBpZCwgc3VtLCBtYnJBbW91bnQgfSA9IHRoaXMubmV3SW5zdGFudERpc2J1cnNlbWVudChhc3NldFhmZXIueGZlckFzc2V0LmlkLCB0aW1lVG9VbmxvY2ssIGV4cGlyYXRpb24sIGFsbG9jYXRpb25zLCByZWNsYWltVG8pCiAgICBkaWcgNAogICAgZ3R4bnMgWGZlckFzc2V0CiAgICBjb3ZlciA0CiAgICBjYWxsc3ViIG5ld0luc3RhbnREaXNidXJzZW1lbnQKICAgIHBvcAogICAgZHVwCiAgICBleHRyYWN0IDAgOAogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZGlnIDIKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgdW5jb3ZlciAzCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1NjIKICAgIC8vIGFzc2VydEV4YWN0UGF5bWVudChtYnJQYXltZW50LCBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgbWJyQW1vdW50ICsgdGhpcy5zcG9uc29yKGlkLCBtYnJQYXltZW50LnNlbmRlcikpCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgZGlnIDYKICAgIGd0eG5zIFNlbmRlcgogICAgdW5jb3ZlciA0CiAgICBzd2FwCiAgICBjYWxsc3ViIHNwb25zb3IKICAgIHVuY292ZXIgMgogICAgKwogICAgdW5jb3ZlciA1CiAgICBjb3ZlciAyCiAgICBjYWxsc3ViIGFzc2VydEV4YWN0UGF5bWVudAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1NjMKICAgIC8vIHRoaXMuYXNzZXJ0SW5ib3VuZEFzc2V0VHJhbnNmZXIoYXNzZXRYZmVyLCBzdW0pCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGNhbGxzdWIgYXNzZXJ0SW5ib3VuZEFzc2V0VHJhbnNmZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTUzLTU2MAogICAgLy8gY3JlYXRlSW5zdGFudEFzYURpc2J1cnNlbWVudCgKICAgIC8vICAgbWJyUGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgdGltZVRvVW5sb2NrOiB1aW50NjQsCiAgICAvLyAgIGV4cGlyYXRpb246IHVpbnQ2NCwKICAgIC8vICAgYWxsb2NhdGlvbnM6IFVzZXJBbGxvY2F0aW9uW10sCiAgICAvLyAgIHJlY2xhaW1UbzogQWNjb3VudAogICAgLy8gKTogdWludDY0IHsKICAgIGJ5dGVjXzIgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjpSZXdhcmRzLmxlZ2FjeUNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnRbcm91dGluZ10oKSAtPiB2b2lkOgpsZWdhY3lDcmVhdGVJbnN0YW50QXNhRGlzYnVyc2VtZW50OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1NjgKICAgIC8vIEBhYmltZXRob2QoeyBuYW1lOiAnY3JlYXRlSW5zdGFudEFzYURpc2J1cnNlbWVudCcgfSkKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzMgLy8gMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDQgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCA0MAogICAgKgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxzbWFydF9jb250cmFjdHMvcmV3YXJkcy90eXBlcy50czo6VXNlckFsbG9jYXRpb24+CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjU3NgogICAgLy8gY29uc3QgeyBpZCwgc3VtLCBtYnJBbW91bnQgfSA9IHRoaXMubmV3SW5zdGFudERpc2J1cnNlbWVudChhc3NldFhmZXIueGZlckFzc2V0LmlkLCB0aW1lVG9VbmxvY2ssIGV4cGlyYXRpb24sIGFsbG9jYXRpb25zLCBHbG9iYWwuemVyb0FkZHJlc3MpCiAgICBkaWcgMwogICAgZ3R4bnMgWGZlckFzc2V0CiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgIHN3YXAKICAgIGNvdmVyIDQKICAgIGNhbGxzdWIgbmV3SW5zdGFudERpc2J1cnNlbWVudAogICAgcG9wCiAgICBkdXAKICAgIGV4dHJhY3QgMCA4CiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBkaWcgMgogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICB1bmNvdmVyIDMKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjU3NwogICAgLy8gYXNzZXJ0RXhhY3RQYXltZW50KG1iclBheW1lbnQsIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBtYnJBbW91bnQgKyB0aGlzLnNwb25zb3IoaWQsIG1iclBheW1lbnQuc2VuZGVyKSkKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBkaWcgNgogICAgZ3R4bnMgU2VuZGVyCiAgICB1bmNvdmVyIDQKICAgIHN3YXAKICAgIGNhbGxzdWIgc3BvbnNvcgogICAgdW5jb3ZlciAyCiAgICArCiAgICB1bmNvdmVyIDUKICAgIGNvdmVyIDIKICAgIGNhbGxzdWIgYXNzZXJ0RXhhY3RQYXltZW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjU3OAogICAgLy8gdGhpcy5hc3NlcnRJbmJvdW5kQXNzZXRUcmFuc2Zlcihhc3NldFhmZXIsIHN1bSkKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgY2FsbHN1YiBhc3NlcnRJbmJvdW5kQXNzZXRUcmFuc2ZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1NjgKICAgIC8vIEBhYmltZXRob2QoeyBuYW1lOiAnY3JlYXRlSW5zdGFudEFzYURpc2J1cnNlbWVudCcgfSkKICAgIGJ5dGVjXzIgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjpSZXdhcmRzLmNsYWltUmV3YXJkc1tyb3V0aW5nXSgpIC0+IHZvaWQ6CmNsYWltUmV3YXJkczoKICAgIHB1c2hieXRlcyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1ODIKICAgIC8vIGNsYWltUmV3YXJkcyhyZXdhcmRzOiBDbGFpbURldGFpbHNbXSk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwbiAyCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBwdXNoaW50IDE2CiAgICAqCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8c21hcnRfY29udHJhY3RzL3Jld2FyZHMvdHlwZXMudHM6OkNsYWltRGV0YWlscz4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTgzCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgcmV3YXJkcy5sZW5ndGg7IGkgKz0gMSkgewogICAgaW50Y18wIC8vIDAKCmNsYWltUmV3YXJkc193aGlsZV90b3BAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTgzCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgcmV3YXJkcy5sZW5ndGg7IGkgKz0gMSkgewogICAgZHVwCiAgICBkaWcgMgogICAgPAogICAgYnogY2xhaW1SZXdhcmRzX2FmdGVyX3doaWxlQDI1CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjU4NAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZGlzYnVyc2VtZW50cyhyZXdhcmRzW2ldLmlkKS5leGlzdHMsIGVyckRpc2J1cnNlbWVudERvZXNOb3RFeGlzdCkKICAgIGRpZyAyCiAgICBleHRyYWN0IDIgMAogICAgZGlnIDEKICAgIHB1c2hpbnQgMTYKICAgICoKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3QzIC8vIG9uIGVycm9yOiBpbmRleCBhY2Nlc3MgaXMgb3V0IG9mIGJvdW5kcwogICAgZHVwCiAgICBjb3ZlciA0CiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgY292ZXIgNQogICAgaXRvYgogICAgZHVwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjg0CiAgICAvLyBkaXNidXJzZW1lbnRzID0gQm94TWFwPHVpbnQ2NCwgRGlzYnVyc2VtZW50RGV0YWlscz4oeyBrZXlQcmVmaXg6IFJld2FyZHNCb3hQcmVmaXhEaXNidXJzZW1lbnRzIH0pCiAgICBieXRlY18wIC8vICJkIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTg0CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5kaXNidXJzZW1lbnRzKHJld2FyZHNbaV0uaWQpLmV4aXN0cywgZXJyRGlzYnVyc2VtZW50RG9lc05vdEV4aXN0KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogY2xhaW1SZXdhcmRzX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlY18xIC8vICJFUlI6ZXJyRGJuZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJEYm5lCgpjbGFpbVJld2FyZHNfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjU4NgogICAgLy8gY29uc3QgeyBmaW5hbGl6ZWQsIHRpbWVUb1VubG9jaywgZXhwaXJhdGlvbiwgYW1vdW50LCBkaXN0cmlidXRlZCwgbm90ZSB9ID0gdGhpcy5kaXNidXJzZW1lbnRzKHJld2FyZHNbaV0uaWQpLnZhbHVlCiAgICBkaWcgMQogICAgZHVwCiAgICBwdXNoaW50IDMyCiAgICBpbnRjXzEgLy8gMQogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIGRpZyAxCiAgICBwdXNoaW50IDQzCiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGNvdmVyIDgKICAgIGRpZyAxCiAgICBwdXNoaW50IDUxCiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGJ1cnkgMTEKICAgIGRpZyAxCiAgICBwdXNoaW50IDM1CiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGNvdmVyIDQKICAgIGRpZyAxCiAgICBwdXNoaW50IDY3CiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGNvdmVyIDQKICAgIGRpZyAxCiAgICBwdXNoaW50IDExNQogICAgaW50Y18zIC8vIDIKICAgIGJveF9leHRyYWN0CiAgICBidG9pCiAgICBkaWcgMgogICAgZGlnIDEKICAgIGludGNfMyAvLyAyCiAgICBib3hfZXh0cmFjdAogICAgYnRvaQogICAgaW50Y18zIC8vIDIKICAgICsKICAgIHVuY292ZXIgMwogICAgY292ZXIgMgogICAgYm94X2V4dHJhY3QKICAgIGV4dHJhY3QgMiAwCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjU4NwogICAgLy8gbG9nZ2VkQXNzZXJ0KGZpbmFsaXplZCwgZXJyRGlzYnVyc2VtZW50Tm90RmluYWwpCiAgICBibnogY2xhaW1SZXdhcmRzX2FmdGVyX2Fzc2VydEA3CiAgICBieXRlYyAxOSAvLyAiRVJSOmVyckRibmwiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyRGJubAoKY2xhaW1SZXdhcmRzX2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1ODgKICAgIC8vIGxvZ2dlZEFzc2VydCh0aW1lVG9VbmxvY2sgPD0gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwgZXJyRGlzYnVyc2VtZW50TG9ja2VkKQogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgdW5jb3ZlciAxMAogICAgPj0KICAgIGJueiBjbGFpbVJld2FyZHNfYWZ0ZXJfYXNzZXJ0QDkKICAgIGJ5dGVjIDIyIC8vICJFUlI6ZXJyRGJsayIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJEYmxrCgpjbGFpbVJld2FyZHNfYWZ0ZXJfYXNzZXJ0QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjU5MAogICAgLy8gbG9nZ2VkQXNzZXJ0KGV4cGlyYXRpb24gPT09IDAgfHwgZXhwaXJhdGlvbiA+PSBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLCBlcnJEaXNidXJzZW1lbnRMb2NrZWQpCiAgICBkaWcgMTAKICAgIGJ6IGNsYWltUmV3YXJkc19ib29sX3RydWVAMTEKICAgIGRpZyAxMAogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgPj0KICAgIGJ6IGNsYWltUmV3YXJkc19ib29sX2ZhbHNlQDEyCgpjbGFpbVJld2FyZHNfYm9vbF90cnVlQDExOgogICAgaW50Y18xIC8vIDEKCmNsYWltUmV3YXJkc19ib29sX21lcmdlQDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1OTAKICAgIC8vIGxvZ2dlZEFzc2VydChleHBpcmF0aW9uID09PSAwIHx8IGV4cGlyYXRpb24gPj0gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwgZXJyRGlzYnVyc2VtZW50TG9ja2VkKQogICAgYm56IGNsYWltUmV3YXJkc19hZnRlcl9hc3NlcnRAMTUKICAgIGJ5dGVjIDIyIC8vICJFUlI6ZXJyRGJsayIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJEYmxrCgpjbGFpbVJld2FyZHNfYWZ0ZXJfYXNzZXJ0QDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1OTEKICAgIC8vIGxvZ2dlZEFzc2VydChhbW91bnQgPiBkaXN0cmlidXRlZCwgZXJyRGlzYnVyc2VtZW50RnVsbHlEaXN0cmlidXRlZCkKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciA0CiAgICA+CiAgICBibnogY2xhaW1SZXdhcmRzX2FmdGVyX2Fzc2VydEAxNwogICAgcHVzaGJ5dGVzICJFUlI6ZXJyRGJmZCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJEYmZkCgpjbGFpbVJld2FyZHNfYWZ0ZXJfYXNzZXJ0QDE3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1OTUKICAgIC8vIGFkZHJlc3M6IFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjU5NgogICAgLy8gYXNzZXQ6IHJld2FyZHNbaV0uYXNzZXQsCiAgICB1bmNvdmVyIDcKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBjb3ZlciA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjU5My01OTcKICAgIC8vIGNvbnN0IHVzZXJBbGxvY2F0aW9uc0tleTogVXNlckFsbG9jYXRpb25zS2V5ID0gewogICAgLy8gICBkaXNidXJzZW1lbnRJRDogcmV3YXJkc1tpXS5pZCwKICAgIC8vICAgYWRkcmVzczogVHhuLnNlbmRlciwKICAgIC8vICAgYXNzZXQ6IHJld2FyZHNbaV0uYXNzZXQsCiAgICAvLyB9CiAgICBpdG9iCiAgICBjb25jYXQKICAgIHVuY292ZXIgNAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjkwCiAgICAvLyB1c2VyQWxsb2NhdGlvbnMgPSBCb3hNYXA8VXNlckFsbG9jYXRpb25zS2V5LCB1aW50NjQ+KHsga2V5UHJlZml4OiBSZXdhcmRzQm94UHJlZml4VXNlckFsbG9jYXRpb25zIH0pCiAgICBieXRlYyA5IC8vICJ1IgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTk4CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy51c2VyQWxsb2NhdGlvbnModXNlckFsbG9jYXRpb25zS2V5KS5leGlzdHMsIGVyckFsbG9jYXRpb25Eb2VzTm90RXhpc3QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBjbGFpbVJld2FyZHNfYWZ0ZXJfYXNzZXJ0QDE5CiAgICBieXRlYyAyMyAvLyAiRVJSOmVyckFsbmUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQWxuZQoKY2xhaW1SZXdhcmRzX2FmdGVyX2Fzc2VydEAxOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTk5CiAgICAvLyBjb25zdCB1c2VyQWxsb2NhdGlvbiA9IHRoaXMudXNlckFsbG9jYXRpb25zKHVzZXJBbGxvY2F0aW9uc0tleSkudmFsdWUKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGJ0b2kKICAgIGR1cAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2MDEKICAgIC8vIHRoaXMuZGlzYnVyc2VtZW50cyhyZXdhcmRzW2ldLmlkKS52YWx1ZS5hbGxvY2F0aW9ucyAtPSAxCiAgICB1bmNvdmVyIDUKICAgIGR1cAogICAgcHVzaGludCA1OQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgaXRvYgogICAgZGlnIDEKICAgIHB1c2hpbnQgNTkKICAgIHVuY292ZXIgMgogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NjAyCiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMocmV3YXJkc1tpXS5pZCkudmFsdWUuZGlzdHJpYnV0ZWQgKz0gdXNlckFsbG9jYXRpb24KICAgIGR1cAogICAgcHVzaGludCA2NwogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICB1bmNvdmVyIDIKICAgICsKICAgIGl0b2IKICAgIHB1c2hpbnQgNjcKICAgIHN3YXAKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjYwMwogICAgLy8gdGhpcy51c2VyQWxsb2NhdGlvbnModXNlckFsbG9jYXRpb25zS2V5KS5kZWxldGUoKQogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjEyMgogICAgLy8gdGhpcy5hZGRNYnJDcmVkaXQoaWQsIFVzZXJBbGxvY2F0aW9uTUJSKQogICAgdW5jb3ZlciA2CiAgICBpbnRjIDQgLy8gMjUzMDAKICAgIGNhbGxzdWIgYWRkTWJyQ3JlZGl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjYwOAogICAgLy8gaWYgKCFpc0FsZ28pIHsKICAgIGRpZyA1CiAgICBieiBjbGFpbVJld2FyZHNfZWxzZV9ib2R5QDIyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjYxMAogICAgLy8gYXNzZXRSZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NjE2CiAgICAvLyBhc3NldFhmZXIuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBOb3RlCiAgICB1bmNvdmVyIDUKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NjA5LTYxNAogICAgLy8gY29uc3QgYXNzZXRYZmVyID0gaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgYXNzZXRSZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgYXNzZXRBbW91bnQ6IHVzZXJBbGxvY2F0aW9uLAogICAgLy8gICB4ZmVyQXNzZXQ6IHJld2FyZHNbaV0uYXNzZXQsCiAgICAvLyAgIG5vdGUsCiAgICAvLyB9KQogICAgcHVzaGludCA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NjE2CiAgICAvLyBhc3NldFhmZXIuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CgpjbGFpbVJld2FyZHNfYWZ0ZXJfaWZfZWxzZUAyNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTgzCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgcmV3YXJkcy5sZW5ndGg7IGkgKz0gMSkgewogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGIgY2xhaW1SZXdhcmRzX3doaWxlX3RvcEAyCgpjbGFpbVJld2FyZHNfZWxzZV9ib2R5QDIyOgogICAgdW5jb3ZlciA1CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NjE5CiAgICAvLyByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NjI0CiAgICAvLyBwYXltZW50LnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgTm90ZQogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NjE4LTYyMgogICAgLy8gY29uc3QgcGF5bWVudCA9IGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICBhbW91bnQ6IHVzZXJBbGxvY2F0aW9uLAogICAgLy8gICBub3RlLAogICAgLy8gfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NjI0CiAgICAvLyBwYXltZW50LnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgYiBjbGFpbVJld2FyZHNfYWZ0ZXJfaWZfZWxzZUAyNAoKY2xhaW1SZXdhcmRzX2Jvb2xfZmFsc2VAMTI6CiAgICBpbnRjXzAgLy8gMAogICAgYiBjbGFpbVJld2FyZHNfYm9vbF9tZXJnZUAxMwoKY2xhaW1SZXdhcmRzX2FmdGVyX3doaWxlQDI1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1ODIKICAgIC8vIGNsYWltUmV3YXJkcyhyZXdhcmRzOiBDbGFpbURldGFpbHNbXSk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6OlJld2FyZHMucmVjbGFpbVJld2FyZHNbcm91dGluZ10oKSAtPiB2b2lkOgpyZWNsYWltUmV3YXJkczoKICAgIHB1c2hieXRlcyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2MjkKICAgIC8vIHJlY2xhaW1SZXdhcmRzKGlkOiB1aW50NjQsIHJlY2xhaW1zOiBBbGxvY2F0aW9uUmVjbGFpbURldGFpbHNbXSk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGR1cAogICAgY292ZXIgMwogICAgcHVzaGludCA0MAogICAgKgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIHN3YXAKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL3R5cGVzLnRzOjpBbGxvY2F0aW9uUmVjbGFpbURldGFpbHM+CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjYzMAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZGlzYnVyc2VtZW50cyhpZCkuZXhpc3RzLCBlcnJEaXNidXJzZW1lbnREb2VzTm90RXhpc3QpCiAgICBpdG9iCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6ODQKICAgIC8vIGRpc2J1cnNlbWVudHMgPSBCb3hNYXA8dWludDY0LCBEaXNidXJzZW1lbnREZXRhaWxzPih7IGtleVByZWZpeDogUmV3YXJkc0JveFByZWZpeERpc2J1cnNlbWVudHMgfSkKICAgIGJ5dGVjXzAgLy8gImQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2MzAKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmRpc2J1cnNlbWVudHMoaWQpLmV4aXN0cywgZXJyRGlzYnVyc2VtZW50RG9lc05vdEV4aXN0KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogcmVjbGFpbVJld2FyZHNfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjXzEgLy8gIkVSUjplcnJEYm5lIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckRibmUKCnJlY2xhaW1SZXdhcmRzX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2MzEKICAgIC8vIGNvbnN0IHsgY3JlYXRvciwgZmluYWxpemVkLCBleHBpcmF0aW9uIH0gPSB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlCiAgICBkdXBuIDIKICAgIGludGNfMCAvLyAwCiAgICBwdXNoaW50IDMyCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgZHVwCiAgICBjb3ZlciAyCiAgICBjb3ZlciAzCiAgICBkdXAKICAgIHB1c2hpbnQgMzIKICAgIGludGNfMSAvLyAxCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgY292ZXIgMwogICAgcHVzaGludCA1MQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBidXJ5IDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NjMzCiAgICAvLyBsb2dnZWRBc3NlcnQoY3JlYXRvciA9PT0gVHhuLnNlbmRlciwgZXJyWW91QXJlTm90VGhlQ3JlYXRvcikKICAgIHR4biBTZW5kZXIKICAgID09CiAgICBibnogcmVjbGFpbVJld2FyZHNfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjXzMgLy8gIkVSUjplcnJZbmNyIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclluY3IKCnJlY2xhaW1SZXdhcmRzX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2MzQKICAgIC8vIGxvZ2dlZEFzc2VydChmaW5hbGl6ZWQsIGVyckRpc2J1cnNlbWVudE5vdEZpbmFsKQogICAgc3dhcAogICAgYm56IHJlY2xhaW1SZXdhcmRzX2FmdGVyX2Fzc2VydEA3CiAgICBieXRlYyAxOSAvLyAiRVJSOmVyckRibmwiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyRGJubAoKcmVjbGFpbVJld2FyZHNfYWZ0ZXJfYXNzZXJ0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjYzNgogICAgLy8gbG9nZ2VkQXNzZXJ0KGV4cGlyYXRpb24gIT09IDAgJiYgZXhwaXJhdGlvbiA8IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsIGVyckRpc2J1cnNlbWVudE5vdEV4cGlyZWQpCiAgICBkaWcgNgogICAgYnogcmVjbGFpbVJld2FyZHNfYm9vbF9mYWxzZUAxMAogICAgZGlnIDYKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIDwKICAgIGJ6IHJlY2xhaW1SZXdhcmRzX2Jvb2xfZmFsc2VAMTAKICAgIGludGNfMSAvLyAxCgpyZWNsYWltUmV3YXJkc19ib29sX21lcmdlQDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2MzYKICAgIC8vIGxvZ2dlZEFzc2VydChleHBpcmF0aW9uICE9PSAwICYmIGV4cGlyYXRpb24gPCBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLCBlcnJEaXNidXJzZW1lbnROb3RFeHBpcmVkKQogICAgYm56IHJlY2xhaW1SZXdhcmRzX2FmdGVyX2Fzc2VydEAxMwogICAgYnl0ZWMgMjQgLy8gIkVSUjplcnJEYm54IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckRibngKCnJlY2xhaW1SZXdhcmRzX2FmdGVyX2Fzc2VydEAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NjM4CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgcmVjbGFpbXMubGVuZ3RoOyBpICs9IDEpIHsKICAgIGludGNfMCAvLyAwCgpyZWNsYWltUmV3YXJkc193aGlsZV90b3BAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjYzOAogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IHJlY2xhaW1zLmxlbmd0aDsgaSArPSAxKSB7CiAgICBkdXAKICAgIGRpZyA1CiAgICA8CiAgICBieiByZWNsYWltUmV3YXJkc19hZnRlcl93aGlsZUAyMwogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2NDEKICAgIC8vIGFkZHJlc3M6IHJlY2xhaW1zW2ldLmFkZHJlc3MsCiAgICBkaWcgNQogICAgZXh0cmFjdCAyIDAKICAgIGRpZyAxCiAgICBwdXNoaW50IDQwCiAgICAqCiAgICBwdXNoaW50IDQwCiAgICBleHRyYWN0MyAvLyBvbiBlcnJvcjogaW5kZXggYWNjZXNzIGlzIG91dCBvZiBib3VuZHMKICAgIGR1cAogICAgZXh0cmFjdCAwIDMyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjY0MgogICAgLy8gYXNzZXQ6IHJlY2xhaW1zW2ldLmFzc2V0LAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2NDEtNjQyCiAgICAvLyBhZGRyZXNzOiByZWNsYWltc1tpXS5hZGRyZXNzLAogICAgLy8gYXNzZXQ6IHJlY2xhaW1zW2ldLmFzc2V0LAogICAgcHVzaGludCAzMgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2NDIKICAgIC8vIGFzc2V0OiByZWNsYWltc1tpXS5hc3NldCwKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGNvdmVyIDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NjM5LTY0MwogICAgLy8gY29uc3QgdXNlckFsbG9jYXRpb25zS2V5OiBVc2VyQWxsb2NhdGlvbnNLZXkgPSB7CiAgICAvLyAgIGRpc2J1cnNlbWVudElEOiBpZCwKICAgIC8vICAgYWRkcmVzczogcmVjbGFpbXNbaV0uYWRkcmVzcywKICAgIC8vICAgYXNzZXQ6IHJlY2xhaW1zW2ldLmFzc2V0LAogICAgLy8gfQogICAgaXRvYgogICAgY29uY2F0CiAgICBkaWcgNQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjkwCiAgICAvLyB1c2VyQWxsb2NhdGlvbnMgPSBCb3hNYXA8VXNlckFsbG9jYXRpb25zS2V5LCB1aW50NjQ+KHsga2V5UHJlZml4OiBSZXdhcmRzQm94UHJlZml4VXNlckFsbG9jYXRpb25zIH0pCiAgICBieXRlYyA5IC8vICJ1IgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NjQ0CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy51c2VyQWxsb2NhdGlvbnModXNlckFsbG9jYXRpb25zS2V5KS5leGlzdHMsIGVyckFsbG9jYXRpb25Eb2VzTm90RXhpc3QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiByZWNsYWltUmV3YXJkc19hZnRlcl9hc3NlcnRAMTcKICAgIGJ5dGVjIDIzIC8vICJFUlI6ZXJyQWxuZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJBbG5lCgpyZWNsYWltUmV3YXJkc19hZnRlcl9hc3NlcnRAMTc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjY0NgogICAgLy8gY29uc3QgdXNlckFsbG9jYXRpb24gPSB0aGlzLnVzZXJBbGxvY2F0aW9ucyh1c2VyQWxsb2NhdGlvbnNLZXkpLnZhbHVlCiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBidG9pCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NjQ4CiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlLmFsbG9jYXRpb25zIC09IDEKICAgIGRpZyA0CiAgICBkdXAKICAgIHB1c2hpbnQgNTkKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGl0b2IKICAgIGRpZyAxCiAgICBwdXNoaW50IDU5CiAgICB1bmNvdmVyIDIKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjY0OQogICAgLy8gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZS5hbW91bnQgLT0gdXNlckFsbG9jYXRpb24KICAgIGR1cAogICAgcHVzaGludCAzNQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICB1bmNvdmVyIDIKICAgIC0KICAgIGl0b2IKICAgIHB1c2hpbnQgMzUKICAgIHN3YXAKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjY1MAogICAgLy8gdGhpcy51c2VyQWxsb2NhdGlvbnModXNlckFsbG9jYXRpb25zS2V5KS5kZWxldGUoKQogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjEyMgogICAgLy8gdGhpcy5hZGRNYnJDcmVkaXQoaWQsIFVzZXJBbGxvY2F0aW9uTUJSKQogICAgZGlnIDgKICAgIGludGMgNCAvLyAyNTMwMAogICAgY2FsbHN1YiBhZGRNYnJDcmVkaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NjU1CiAgICAvLyBpZiAoIWlzQWxnbykgewogICAgZGlnIDMKICAgIGJ6IHJlY2xhaW1SZXdhcmRzX2Vsc2VfYm9keUAyMAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2NjIKICAgIC8vIHhmZXIuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIHVuY292ZXIgMwogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGRpZyAyCiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NjU2LTY2MAogICAgLy8gY29uc3QgeGZlciA9IGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgIGFzc2V0UmVjZWl2ZXI6IGNyZWF0b3IsCiAgICAvLyAgIGFzc2V0QW1vdW50OiB1c2VyQWxsb2NhdGlvbiwKICAgIC8vICAgeGZlckFzc2V0OiByZWNsYWltc1tpXS5hc3NldCwKICAgIC8vIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2NjIKICAgIC8vIHhmZXIuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CgpyZWNsYWltUmV3YXJkc19hZnRlcl9pZl9lbHNlQDIyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2MzgKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCByZWNsYWltcy5sZW5ndGg7IGkgKz0gMSkgewogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGIgcmVjbGFpbVJld2FyZHNfd2hpbGVfdG9wQDE0CgpyZWNsYWltUmV3YXJkc19lbHNlX2JvZHlAMjA6CiAgICB1bmNvdmVyIDMKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2NjQtNjY5CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogY3JlYXRvciwKICAgIC8vICAgICBhbW91bnQ6IHVzZXJBbGxvY2F0aW9uLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBkaWcgMgogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2NjQtNjY4CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogY3JlYXRvciwKICAgIC8vICAgICBhbW91bnQ6IHVzZXJBbGxvY2F0aW9uLAogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2NjQtNjY5CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogY3JlYXRvciwKICAgIC8vICAgICBhbW91bnQ6IHVzZXJBbGxvY2F0aW9uLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICBiIHJlY2xhaW1SZXdhcmRzX2FmdGVyX2lmX2Vsc2VAMjIKCnJlY2xhaW1SZXdhcmRzX2FmdGVyX3doaWxlQDIzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2MjkKICAgIC8vIHJlY2xhaW1SZXdhcmRzKGlkOiB1aW50NjQsIHJlY2xhaW1zOiBBbGxvY2F0aW9uUmVjbGFpbURldGFpbHNbXSk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKcmVjbGFpbVJld2FyZHNfYm9vbF9mYWxzZUAxMDoKICAgIGludGNfMCAvLyAwCiAgICBiIHJlY2xhaW1SZXdhcmRzX2Jvb2xfbWVyZ2VAMTEKCgovLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjpSZXdhcmRzLnN3ZWVwRXhwaXJlZFtyb3V0aW5nXSgpIC0+IHZvaWQ6CnN3ZWVwRXhwaXJlZDoKICAgIGludGNfMCAvLyAwCiAgICBkdXBuIDIKICAgIHB1c2hieXRlcyAiIgogICAgZHVwbiA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjY4MQogICAgLy8gc3dlZXBFeHBpcmVkKGlkOiB1aW50NjQsIHJlY2xhaW1zOiBBbGxvY2F0aW9uUmVjbGFpbURldGFpbHNbXSk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGR1cAogICAgY292ZXIgMwogICAgcHVzaGludCA0MAogICAgKgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIHN3YXAKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL3R5cGVzLnRzOjpBbGxvY2F0aW9uUmVjbGFpbURldGFpbHM+CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjY4MgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZGlzYnVyc2VtZW50cyhpZCkuZXhpc3RzLCBlcnJEaXNidXJzZW1lbnREb2VzTm90RXhpc3QpCiAgICBpdG9iCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6ODQKICAgIC8vIGRpc2J1cnNlbWVudHMgPSBCb3hNYXA8dWludDY0LCBEaXNidXJzZW1lbnREZXRhaWxzPih7IGtleVByZWZpeDogUmV3YXJkc0JveFByZWZpeERpc2J1cnNlbWVudHMgfSkKICAgIGJ5dGVjXzAgLy8gImQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2ODIKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmRpc2J1cnNlbWVudHMoaWQpLmV4aXN0cywgZXJyRGlzYnVyc2VtZW50RG9lc05vdEV4aXN0KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogc3dlZXBFeHBpcmVkX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlY18xIC8vICJFUlI6ZXJyRGJuZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJEYm5lCgpzd2VlcEV4cGlyZWRfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjY4MwogICAgLy8gY29uc3QgeyBmaW5hbGl6ZWQsIGV4cGlyYXRpb24sIHJlY2xhaW1UbyB9ID0gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZQogICAgZHVwbiAyCiAgICBwdXNoaW50IDMyCiAgICBpbnRjXzEgLy8gMQogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIHN3YXAKICAgIGR1cAogICAgcHVzaGludCA1MQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBidXJ5IDExCiAgICBwdXNoaW50cyA4MyAzMgogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGR1cAogICAgYnVyeSAxMwogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2ODQKICAgIC8vIGxvZ2dlZEFzc2VydChyZWNsYWltVG8gIT09IEdsb2JhbC56ZXJvQWRkcmVzcywgZXJyRGlzYnVyc2VtZW50Tm90U3dlZXBhYmxlKQogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICAhPQogICAgYm56IHN3ZWVwRXhwaXJlZF9hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6ZXJyRGJucyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJEYm5zCgpzd2VlcEV4cGlyZWRfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjY4NQogICAgLy8gbG9nZ2VkQXNzZXJ0KGZpbmFsaXplZCwgZXJyRGlzYnVyc2VtZW50Tm90RmluYWwpCiAgICBibnogc3dlZXBFeHBpcmVkX2FmdGVyX2Fzc2VydEA3CiAgICBieXRlYyAxOSAvLyAiRVJSOmVyckRibmwiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyRGJubAoKc3dlZXBFeHBpcmVkX2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2ODYKICAgIC8vIGxvZ2dlZEFzc2VydChleHBpcmF0aW9uICE9PSAwICYmIGV4cGlyYXRpb24gPCBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLCBlcnJEaXNidXJzZW1lbnROb3RFeHBpcmVkKQogICAgZGlnIDgKICAgIGJ6IHN3ZWVwRXhwaXJlZF9ib29sX2ZhbHNlQDEwCiAgICBkaWcgOAogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgPAogICAgYnogc3dlZXBFeHBpcmVkX2Jvb2xfZmFsc2VAMTAKICAgIGludGNfMSAvLyAxCgpzd2VlcEV4cGlyZWRfYm9vbF9tZXJnZUAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6Njg2CiAgICAvLyBsb2dnZWRBc3NlcnQoZXhwaXJhdGlvbiAhPT0gMCAmJiBleHBpcmF0aW9uIDwgR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwgZXJyRGlzYnVyc2VtZW50Tm90RXhwaXJlZCkKICAgIGJueiBzd2VlcEV4cGlyZWRfYWZ0ZXJfYXNzZXJ0QDEzCiAgICBieXRlYyAyNCAvLyAiRVJSOmVyckRibngiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyRGJueAoKc3dlZXBFeHBpcmVkX2FmdGVyX2Fzc2VydEAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NjkwCiAgICAvLyBsZXQgYWxnb0Ftb3VudDogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIGJ1cnkgMTAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NjkxCiAgICAvLyBsZXQgc3RvcmFnZTogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIGJ1cnkgOAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2OTIKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCByZWNsYWltcy5sZW5ndGg7IGkgKz0gMSkgewogICAgaW50Y18wIC8vIDAKCnN3ZWVwRXhwaXJlZF93aGlsZV90b3BAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjY5MgogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IHJlY2xhaW1zLmxlbmd0aDsgaSArPSAxKSB7CiAgICBkdXAKICAgIGRpZyA0CiAgICA8CiAgICBieiBzd2VlcEV4cGlyZWRfYWZ0ZXJfd2hpbGVAMjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6Njk1CiAgICAvLyBhZGRyZXNzOiByZWNsYWltc1tpXS5hZGRyZXNzLAogICAgZGlnIDQKICAgIGV4dHJhY3QgMiAwCiAgICBkaWcgMQogICAgcHVzaGludCA0MAogICAgKgogICAgcHVzaGludCA0MAogICAgZXh0cmFjdDMgLy8gb24gZXJyb3I6IGluZGV4IGFjY2VzcyBpcyBvdXQgb2YgYm91bmRzCiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2OTYKICAgIC8vIGFzc2V0OiByZWNsYWltc1tpXS5hc3NldCwKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6Njk1LTY5NgogICAgLy8gYWRkcmVzczogcmVjbGFpbXNbaV0uYWRkcmVzcywKICAgIC8vIGFzc2V0OiByZWNsYWltc1tpXS5hc3NldCwKICAgIHB1c2hpbnQgMzIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6Njk2CiAgICAvLyBhc3NldDogcmVjbGFpbXNbaV0uYXNzZXQsCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBidXJ5IDEwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjY5My02OTcKICAgIC8vIGNvbnN0IHVzZXJBbGxvY2F0aW9uc0tleTogVXNlckFsbG9jYXRpb25zS2V5ID0gewogICAgLy8gICBkaXNidXJzZW1lbnRJRDogaWQsCiAgICAvLyAgIGFkZHJlc3M6IHJlY2xhaW1zW2ldLmFkZHJlc3MsCiAgICAvLyAgIGFzc2V0OiByZWNsYWltc1tpXS5hc3NldCwKICAgIC8vIH0KICAgIGl0b2IKICAgIGNvbmNhdAogICAgZGlnIDMKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo5MAogICAgLy8gdXNlckFsbG9jYXRpb25zID0gQm94TWFwPFVzZXJBbGxvY2F0aW9uc0tleSwgdWludDY0Pih7IGtleVByZWZpeDogUmV3YXJkc0JveFByZWZpeFVzZXJBbGxvY2F0aW9ucyB9KQogICAgYnl0ZWMgOSAvLyAidSIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBidXJ5IDE0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjY5OAogICAgLy8gY29uc3QgW3VzZXJBbGxvY2F0aW9uLCBleGlzdHNdID0gdGhpcy51c2VyQWxsb2NhdGlvbnModXNlckFsbG9jYXRpb25zS2V5KS5tYXliZSgpCiAgICBib3hfZ2V0CiAgICBzd2FwCiAgICBidG9pCiAgICBidXJ5IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6Njk5CiAgICAvLyBpZiAoZXhpc3RzKSB7CiAgICBieiBzd2VlcEV4cGlyZWRfYWZ0ZXJfaWZfZWxzZUAyMwogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo3MDAKICAgIC8vIHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUuYWxsb2NhdGlvbnMgLT0gMQogICAgZGlnIDEKICAgIGR1cAogICAgcHVzaGludCA1OQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgaXRvYgogICAgZGlnIDEKICAgIHB1c2hpbnQgNTkKICAgIHVuY292ZXIgMgogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NzAxCiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlLmFtb3VudCAtPSB1c2VyQWxsb2NhdGlvbgogICAgZHVwCiAgICBwdXNoaW50IDM1CiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGRpZyA4CiAgICAtCiAgICBpdG9iCiAgICBwdXNoaW50IDM1CiAgICBzd2FwCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo3MDIKICAgIC8vIHRoaXMudXNlckFsbG9jYXRpb25zKHVzZXJBbGxvY2F0aW9uc0tleSkuZGVsZXRlKCkKICAgIGRpZyAxMgogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjcwMwogICAgLy8gc3RvcmFnZSArPSBVc2VyQWxsb2NhdGlvbk1CUgogICAgZGlnIDgKICAgIGludGMgNCAvLyAyNTMwMAogICAgKwogICAgYnVyeSA5CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjcwNQogICAgLy8gaWYgKHJlY2xhaW1zW2ldLmFzc2V0ID09PSAwKSB7CiAgICBkaWcgNwogICAgYm56IHN3ZWVwRXhwaXJlZF9lbHNlX2JvZHlAMTgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NzA2CiAgICAvLyBhbGdvQW1vdW50ICs9IHVzZXJBbGxvY2F0aW9uCiAgICBkaWcgMTAKICAgIGRpZyA3CiAgICArCiAgICBidXJ5IDExCgpzd2VlcEV4cGlyZWRfYWZ0ZXJfaWZfZWxzZUAyMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NjkyCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgcmVjbGFpbXMubGVuZ3RoOyBpICs9IDEpIHsKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBiIHN3ZWVwRXhwaXJlZF93aGlsZV90b3BAMTQKCnN3ZWVwRXhwaXJlZF9lbHNlX2JvZHlAMTg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjcwOAogICAgLy8gbG9nZ2VkQXNzZXJ0KHJlY2xhaW1Uby5pc09wdGVkSW4oQXNzZXQocmVjbGFpbXNbaV0uYXNzZXQpKSwgZXJyUmVjbGFpbVRhcmdldE5vdE9wdGVkSW4pCiAgICBkaWcgMTEKICAgIGRpZyA4CiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYm56IHN3ZWVwRXhwaXJlZF9hZnRlcl9hc3NlcnRAMjAKICAgIHB1c2hieXRlcyAiRVJSOmVyclJjb2kiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyUmNvaQoKc3dlZXBFeHBpcmVkX2FmdGVyX2Fzc2VydEAyMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NzA5LTcxMwogICAgLy8gaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgYXNzZXRSZWNlaXZlcjogcmVjbGFpbVRvLAogICAgLy8gICBhc3NldEFtb3VudDogdXNlckFsbG9jYXRpb24sCiAgICAvLyAgIHhmZXJBc3NldDogcmVjbGFpbXNbaV0uYXNzZXQsCiAgICAvLyB9KS5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgZGlnIDcKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBkaWcgNgogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgZGlnIDExCiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgYiBzd2VlcEV4cGlyZWRfYWZ0ZXJfaWZfZWxzZUAyMwoKc3dlZXBFeHBpcmVkX2FmdGVyX3doaWxlQDI0OgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjcxOQogICAgLy8gbGV0IGZ1bmRlciA9IHBheWVyT2YocmVjb3JkLCByZWNsYWltVG8pCiAgICBkdXBuIDIKICAgIGRpZyAxMgogICAgY2FsbHN1YiBwYXllck9mCiAgICBidXJ5IDE0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjcyMAogICAgLy8gaWYgKHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUuYWxsb2NhdGlvbnMgPT09IDApIHsKICAgIHB1c2hpbnQgNTkKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgYm56IHN3ZWVwRXhwaXJlZF9hZnRlcl9pZl9lbHNlQDI2CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjcyMQogICAgLy8gY29uc3QgcmVsZWFzZWQ6IHVpbnQ2NCA9IHN0b3JhZ2UgKyB0aGlzLmRlbGV0ZURpc2J1cnNlbWVudChpZCkKICAgIGRpZyA0CiAgICBjYWxsc3ViIGRlbGV0ZURpc2J1cnNlbWVudAogICAgZGlnIDgKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NzIyCiAgICAvLyBjb25zdCBbcmVjZWl2ZXIsIHRvdGFsXSA9IHJlbGVhc2VEZXBvc2l0KHJlY29yZCwgcmVjbGFpbVRvLCByZWxlYXNlZCkKICAgIGRpZyAxCiAgICBkaWcgMTIKICAgIHVuY292ZXIgMgogICAgY2FsbHN1YiByZWxlYXNlRGVwb3NpdAogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIHN3YXAKICAgIHB1c2hpbnQgMzIKICAgIGV4dHJhY3RfdWludDY0CiAgICBidXJ5IDkKICAgIGJ1cnkgMTMKCnN3ZWVwRXhwaXJlZF9hZnRlcl9pZl9lbHNlQDI2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo3MjYKICAgIC8vIGlmIChmdW5kZXIgPT09IHJlY2xhaW1UbyB8fCAhY2FuUmVjZWl2ZUFsZ28oZnVuZGVyLCBzdG9yYWdlKSkgewogICAgZGlnIDEyCiAgICBkaWcgMTEKICAgID09CiAgICBibnogc3dlZXBFeHBpcmVkX2lmX2JvZHlAMjgKICAgIGRpZyAxMgogICAgZGlnIDgKICAgIGNhbGxzdWIgY2FuUmVjZWl2ZUFsZ28KICAgIGJueiBzd2VlcEV4cGlyZWRfZWxzZV9ib2R5QDI5Cgpzd2VlcEV4cGlyZWRfaWZfYm9keUAyODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NzI3CiAgICAvLyBhbGdvQW1vdW50ICs9IHN0b3JhZ2UKICAgIGRpZyA5CiAgICBkaWcgOAogICAgKwogICAgYnVyeSAxMAoKc3dlZXBFeHBpcmVkX2FmdGVyX2lmX2Vsc2VAMzM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjczMgogICAgLy8gaWYgKGFsZ29BbW91bnQgPiAwKSB7CiAgICBkaWcgOQogICAgYnogc3dlZXBFeHBpcmVkX2FmdGVyX2lmX2Vsc2VAMzYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NzMzCiAgICAvLyBpdHhuLnBheW1lbnQoeyByZWNlaXZlcjogcmVjbGFpbVRvLCBhbW91bnQ6IGFsZ29BbW91bnQgfSkuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIGRpZyA5CiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgZGlnIDEwCiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAoKc3dlZXBFeHBpcmVkX2FmdGVyX2lmX2Vsc2VAMzY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjY4MQogICAgLy8gc3dlZXBFeHBpcmVkKGlkOiB1aW50NjQsIHJlY2xhaW1zOiBBbGxvY2F0aW9uUmVjbGFpbURldGFpbHNbXSk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKc3dlZXBFeHBpcmVkX2Vsc2VfYm9keUAyOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NzI4CiAgICAvLyB9IGVsc2UgaWYgKHN0b3JhZ2UgPiAwKSB7CiAgICBkaWcgNwogICAgYnogc3dlZXBFeHBpcmVkX2FmdGVyX2lmX2Vsc2VAMzMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NzI5CiAgICAvLyBpdHhuLnBheW1lbnQoeyByZWNlaXZlcjogZnVuZGVyLCBhbW91bnQ6IHN0b3JhZ2UgfSkuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIGRpZyA3CiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgZGlnIDEyCiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgYiBzd2VlcEV4cGlyZWRfYWZ0ZXJfaWZfZWxzZUAzMwoKc3dlZXBFeHBpcmVkX2Jvb2xfZmFsc2VAMTA6CiAgICBpbnRjXzAgLy8gMAogICAgYiBzd2VlcEV4cGlyZWRfYm9vbF9tZXJnZUAxMQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6OlJld2FyZHMuY2xvc2VEaXNidXJzZW1lbnRbcm91dGluZ10oKSAtPiB2b2lkOgpjbG9zZURpc2J1cnNlbWVudDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NzQyCiAgICAvLyBjbG9zZURpc2J1cnNlbWVudChpZDogdWludDY0KTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NzQzCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5kaXNidXJzZW1lbnRzKGlkKS5leGlzdHMsIGVyckRpc2J1cnNlbWVudERvZXNOb3RFeGlzdCkKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6ODQKICAgIC8vIGRpc2J1cnNlbWVudHMgPSBCb3hNYXA8dWludDY0LCBEaXNidXJzZW1lbnREZXRhaWxzPih7IGtleVByZWZpeDogUmV3YXJkc0JveFByZWZpeERpc2J1cnNlbWVudHMgfSkKICAgIGJ5dGVjXzAgLy8gImQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo3NDMKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmRpc2J1cnNlbWVudHMoaWQpLmV4aXN0cywgZXJyRGlzYnVyc2VtZW50RG9lc05vdEV4aXN0KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogY2xvc2VEaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjXzEgLy8gIkVSUjplcnJEYm5lIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckRibmUKCmNsb3NlRGlzYnVyc2VtZW50X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo3NDQKICAgIC8vIGNvbnN0IHsgY3JlYXRvciwgYWxsb2NhdGlvbnMgfSA9IHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUKICAgIGR1cG4gMgogICAgaW50Y18wIC8vIDAKICAgIHB1c2hpbnQgMzIKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGNvdmVyIDQKICAgIHB1c2hpbnQgNTkKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo3NDUKICAgIC8vIGxvZ2dlZEFzc2VydChjcmVhdG9yID09PSBUeG4uc2VuZGVyLCBlcnJZb3VBcmVOb3RUaGVDcmVhdG9yKQogICAgdHhuIFNlbmRlcgogICAgPT0KICAgIGJueiBjbG9zZURpc2J1cnNlbWVudF9hZnRlcl9hc3NlcnRANQogICAgYnl0ZWNfMyAvLyAiRVJSOmVyclluY3IiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyWW5jcgoKY2xvc2VEaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjc0NgogICAgLy8gbG9nZ2VkQXNzZXJ0KGFsbG9jYXRpb25zID09PSAwLCBlcnJEaXNidXJzZW1lbnROb3RFbXB0eSkKICAgIGJ6IGNsb3NlRGlzYnVyc2VtZW50X2FmdGVyX2Fzc2VydEA3CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJEYm55IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckRibnkKCmNsb3NlRGlzYnVyc2VtZW50X2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo3NDgKICAgIC8vIGNvbnN0IHJlbGVhc2VkID0gdGhpcy5kZWxldGVEaXNidXJzZW1lbnQoaWQpCiAgICBzd2FwCiAgICBjYWxsc3ViIGRlbGV0ZURpc2J1cnNlbWVudAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo3NDkKICAgIC8vIGNvbnN0IFtyZWNlaXZlciwgYW1vdW50XSA9IHJlbGVhc2VEZXBvc2l0KHRoaXMuZGlzYnVyc2VtZW50cyhpZCkua2V5LCBjcmVhdG9yLCByZWxlYXNlZCkKICAgIHN3YXAKICAgIGNvdmVyIDIKICAgIGNhbGxzdWIgcmVsZWFzZURlcG9zaXQKICAgIGR1cAogICAgZXh0cmFjdCAwIDMyCiAgICBzd2FwCiAgICBwdXNoaW50IDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo3NTAKICAgIC8vIGl0eG4ucGF5bWVudCh7IHJlY2VpdmVyLCBhbW91bnQgfSkuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo3NDIKICAgIC8vIGNsb3NlRGlzYnVyc2VtZW50KGlkOiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjpSZXdhcmRzLmFsbG9jYXRpb25NYnJDcmVkaXRTaG9ydGZhbGxbcm91dGluZ10oKSAtPiB2b2lkOgphbGxvY2F0aW9uTWJyQ3JlZGl0U2hvcnRmYWxsOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo3NTUKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo3NTcKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmRpc2J1cnNlbWVudHMoaWQpLmV4aXN0cywgZXJyRGlzYnVyc2VtZW50RG9lc05vdEV4aXN0KQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo4NAogICAgLy8gZGlzYnVyc2VtZW50cyA9IEJveE1hcDx1aW50NjQsIERpc2J1cnNlbWVudERldGFpbHM+KHsga2V5UHJlZml4OiBSZXdhcmRzQm94UHJlZml4RGlzYnVyc2VtZW50cyB9KQogICAgYnl0ZWNfMCAvLyAiZCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjc1NwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZGlzYnVyc2VtZW50cyhpZCkuZXhpc3RzLCBlcnJEaXNidXJzZW1lbnREb2VzTm90RXhpc3QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBhbGxvY2F0aW9uTWJyQ3JlZGl0U2hvcnRmYWxsX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlY18xIC8vICJFUlI6ZXJyRGJuZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJEYm5lCgphbGxvY2F0aW9uTWJyQ3JlZGl0U2hvcnRmYWxsX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo3NTkKICAgIC8vIGNvbnN0IG1ickFtb3VudDogdWludDY0ID0gVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9uQ291bnQKICAgIGludGMgNCAvLyAyNTMwMAogICAgdW5jb3ZlciAyCiAgICAqCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NzYwCiAgICAvLyBjb25zdCBjcmVkaXRzOiB1aW50NjQgPSB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlLm1ickNyZWRpdHMKICAgIHVuY292ZXIgMgogICAgcHVzaGludCA3NQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo3NjEKICAgIC8vIGlmIChjcmVkaXRzID49IG1ickFtb3VudCkgewogICAgPj0KICAgIGJ6IGFsbG9jYXRpb25NYnJDcmVkaXRTaG9ydGZhbGxfYWZ0ZXJfaWZfZWxzZUA1CiAgICBwb3BuIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NzYyCiAgICAvLyByZXR1cm4gMAogICAgaW50Y18wIC8vIDAKCmFsbG9jYXRpb25NYnJDcmVkaXRTaG9ydGZhbGxfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjpSZXdhcmRzLmFsbG9jYXRpb25NYnJDcmVkaXRTaG9ydGZhbGxANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NzU1CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGl0b2IKICAgIGJ5dGVjXzIgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmFsbG9jYXRpb25NYnJDcmVkaXRTaG9ydGZhbGxfYWZ0ZXJfaWZfZWxzZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo3NjUKICAgIC8vIHJldHVybiBtYnJBbW91bnQgLSBjcmVkaXRzCiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjc1NQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBiIGFsbG9jYXRpb25NYnJDcmVkaXRTaG9ydGZhbGxfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjpSZXdhcmRzLmFsbG9jYXRpb25NYnJDcmVkaXRTaG9ydGZhbGxANgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czo6QWtpdGFCYXNlQ29udHJhY3QudXBkYXRlQWtpdGFEQU9bcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGVBa2l0YURBTzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNQogICAgLy8gdXBkYXRlQWtpdGFEQU8oYWtpdGFEQU86IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MjYKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjIDE2IC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHB1c2hieXRlcyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjI2CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIGVyck5vdEFraXRhRGFvKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGJueiB1cGRhdGVBa2l0YURBT19hZnRlcl9hc3NlcnRAMwogICAgcHVzaGJ5dGVzICJFUlI6ZXJyTmRhbyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOZGFvCgp1cGRhdGVBa2l0YURBT19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjIDE2IC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MjcKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUgPSBha2l0YURBTwogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNQogICAgLy8gdXBkYXRlQWtpdGFEQU8oYWtpdGFEQU86IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvYmFzZS50czo6QmFzZVJld2FyZHMubWJyW3JvdXRpbmddKCkgLT4gdm9pZDoKbWJyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvYmFzZS50czo3CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9iYXNlLnRzOjpCYXNlUmV3YXJkcy5tYnIKICAgIGJ5dGVjXzIgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6OkNvbnRyYWN0V2l0aE9wdEluLm9wdEluW3JvdXRpbmddKCkgLT4gdm9pZDoKb3B0SW46CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6MjMKICAgIC8vIG9wdEluKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYXNzZXQ6IEFzc2V0KTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cG4gMgogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czoyNQogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBlcnJJbnZhbGlkUGF5bWVudFJlY2VpdmVyKQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IG9wdEluX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAxMyAvLyAiRVJSOmVycklwbXIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBtcgoKb3B0SW5fYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6MjYKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LmFtb3VudCA9PT0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlLCBlcnJJbnZhbGlkUGF5bWVudEFtb3VudCkKICAgIHN3YXAKICAgIGd0eG5zIEFtb3VudAogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICA9PQogICAgYm56IG9wdEluX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyAxNCAvLyAiRVJSOmVycklwbWEiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBtYQoKb3B0SW5fYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6MjgtMzQKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6MzAKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6MzEKICAgIC8vIGFzc2V0QW1vdW50OiAwLAogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjI4LTMzCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogMCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyAgIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjI4LTM0CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogMCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czoyMwogICAgLy8gb3B0SW4ocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBhc3NldDogQXNzZXQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjpSZXdhcmRzLm5ld0Rpc2J1cnNlbWVudElEKCkgLT4gdWludDY0OgpuZXdEaXNidXJzZW1lbnRJRDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6OTUKICAgIC8vIGNvbnN0IGlkID0gdGhpcy5kaXNidXJzZW1lbnRJRC52YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NzQKICAgIC8vIGRpc2J1cnNlbWVudElEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMSwga2V5OiBSZXdhcmRzR2xvYmFsU3RhdGVLZXlEaXNidXJzZW1lbnRJRCB9KQogICAgYnl0ZWMgMTAgLy8gImRpc2J1cnNlbWVudF9pZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6OTUKICAgIC8vIGNvbnN0IGlkID0gdGhpcy5kaXNidXJzZW1lbnRJRC52YWx1ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6OTYKICAgIC8vIHRoaXMuZGlzYnVyc2VtZW50SUQudmFsdWUgKz0gMQogICAgZHVwCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo3NAogICAgLy8gZGlzYnVyc2VtZW50SUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAxLCBrZXk6IFJld2FyZHNHbG9iYWxTdGF0ZUtleURpc2J1cnNlbWVudElEIH0pCiAgICBieXRlYyAxMCAvLyAiZGlzYnVyc2VtZW50X2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo5NgogICAgLy8gdGhpcy5kaXNidXJzZW1lbnRJRC52YWx1ZSArPSAxCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo5NwogICAgLy8gcmV0dXJuIGlkCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjpSZXdhcmRzLmFkZE1ickNyZWRpdChpZDogdWludDY0LCBhbW91bnQ6IHVpbnQ2NCkgLT4gdm9pZDoKYWRkTWJyQ3JlZGl0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxMDAKICAgIC8vIHByaXZhdGUgYWRkTWJyQ3JlZGl0KGlkOiB1aW50NjQsIGFtb3VudDogdWludDY0KTogdm9pZCB7CiAgICBwcm90byAyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTAxCiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlLm1ickNyZWRpdHMgKz0gYW1vdW50CiAgICBmcmFtZV9kaWcgLTIKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6ODQKICAgIC8vIGRpc2J1cnNlbWVudHMgPSBCb3hNYXA8dWludDY0LCBEaXNidXJzZW1lbnREZXRhaWxzPih7IGtleVByZWZpeDogUmV3YXJkc0JveFByZWZpeERpc2J1cnNlbWVudHMgfSkKICAgIGJ5dGVjXzAgLy8gImQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTAxCiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlLm1ickNyZWRpdHMgKz0gYW1vdW50CiAgICBkdXAKICAgIHB1c2hpbnQgNzUKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgZnJhbWVfZGlnIC0xCiAgICArCiAgICBpdG9iCiAgICBwdXNoaW50IDc1CiAgICBzd2FwCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo6UmV3YXJkcy5zcG9uc29yKGlkOiB1aW50NjQsIHBheWVyOiBieXRlcykgLT4gdWludDY0OgpzcG9uc29yOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxMTAKICAgIC8vIHByaXZhdGUgc3BvbnNvcihpZDogdWludDY0LCBwYXllcjogQWNjb3VudCk6IHVpbnQ2NCB7CiAgICBwcm90byAyIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTExCiAgICAvLyByZWNvcmRQYXllcih0aGlzLmRpc2J1cnNlbWVudHMoaWQpLmtleSwgcGF5ZXIsIFR4bi5zZW5kZXIpCiAgICBmcmFtZV9kaWcgLTIKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6ODQKICAgIC8vIGRpc2J1cnNlbWVudHMgPSBCb3hNYXA8dWludDY0LCBEaXNidXJzZW1lbnREZXRhaWxzPih7IGtleVByZWZpeDogUmV3YXJkc0JveFByZWZpeERpc2J1cnNlbWVudHMgfSkKICAgIGJ5dGVjXzAgLy8gImQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA2CiAgICAvLyBpZiAocGF5ZXIgIT09IG93bmVyKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTExCiAgICAvLyByZWNvcmRQYXllcih0aGlzLmRpc2J1cnNlbWVudHMoaWQpLmtleSwgcGF5ZXIsIFR4bi5zZW5kZXIpCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwNgogICAgLy8gaWYgKHBheWVyICE9PSBvd25lcikgewogICAgIT0KICAgIGJ6IHNwb25zb3JfYWZ0ZXJfaWZfZWxzZUAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk2CiAgICAvLyByZXR1cm4gQnl0ZXMoUGF5ZXJCb3hQcmVmaXgpLmNvbmNhdChzaGEyNTYocmVjb3JkKSkKICAgIGZyYW1lX2RpZyAwCiAgICBzaGEyNTYKICAgIGJ5dGVjIDE1IC8vICIkIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwNwogICAgLy8gb3AuQm94LnB1dChwYXllclJlY29yZEtleShyZWNvcmQpLCBwYXllci5ieXRlcykKICAgIGZyYW1lX2RpZyAtMQogICAgYm94X3B1dAoKc3BvbnNvcl9hZnRlcl9pZl9lbHNlQDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwMQogICAgLy8gcmV0dXJuIHBheWVyID09PSBvd25lciA/IDAgOiBQYXllclJlY29yZE1CUgogICAgZnJhbWVfZGlnIC0xCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjExMgogICAgLy8gcmV0dXJuIHNwb25zb3JDb3N0KHBheWVyLCBUeG4uc2VuZGVyKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDEKICAgIC8vIHJldHVybiBwYXllciA9PT0gb3duZXIgPyAwIDogUGF5ZXJSZWNvcmRNQlIKICAgID09CiAgICBpbnRjIDcgLy8gMjg1MDAKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxMTIKICAgIC8vIHJldHVybiBzcG9uc29yQ29zdChwYXllciwgVHhuLnNlbmRlcikKICAgIHN3YXAKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6OlJld2FyZHMudXNlTWJyQ3JlZGl0KGlkOiB1aW50NjQsIGFtb3VudDogdWludDY0KSAtPiB2b2lkOgp1c2VNYnJDcmVkaXQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjExNQogICAgLy8gcHJpdmF0ZSB1c2VNYnJDcmVkaXQoaWQ6IHVpbnQ2NCwgYW1vdW50OiB1aW50NjQpOiB2b2lkIHsKICAgIHByb3RvIDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxMTYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlLm1ickNyZWRpdHMgPj0gYW1vdW50LCBlcnJJbnZhbGlkTWJyQW1vdW50KQogICAgZnJhbWVfZGlnIC0yCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjg0CiAgICAvLyBkaXNidXJzZW1lbnRzID0gQm94TWFwPHVpbnQ2NCwgRGlzYnVyc2VtZW50RGV0YWlscz4oeyBrZXlQcmVmaXg6IFJld2FyZHNCb3hQcmVmaXhEaXNidXJzZW1lbnRzIH0pCiAgICBieXRlY18wIC8vICJkIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTE2CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZS5tYnJDcmVkaXRzID49IGFtb3VudCwgZXJySW52YWxpZE1ickFtb3VudCkKICAgIHB1c2hpbnQgNzUKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgZnJhbWVfZGlnIC0xCiAgICA+PQogICAgYm56IHVzZU1ickNyZWRpdF9hZnRlcl9hc3NlcnRAMgogICAgYnl0ZWMgNiAvLyAiRVJSOmVyckltYnIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySW1icgoKdXNlTWJyQ3JlZGl0X2FmdGVyX2Fzc2VydEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxMTcKICAgIC8vIHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUubWJyQ3JlZGl0cyAtPSBhbW91bnQKICAgIGR1cAogICAgcHVzaGludCA3NQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBmcmFtZV9kaWcgLTEKICAgIC0KICAgIGl0b2IKICAgIHB1c2hpbnQgNzUKICAgIHN3YXAKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjpSZXdhcmRzLmFzc2VydFZhbGlkVW5sb2NrKHRpbWVUb1VubG9jazogdWludDY0KSAtPiB2b2lkOgphc3NlcnRWYWxpZFVubG9jazoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTI2CiAgICAvLyBwcml2YXRlIGFzc2VydFZhbGlkVW5sb2NrKHRpbWVUb1VubG9jazogdWludDY0KTogdm9pZCB7CiAgICBwcm90byAxIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTI4CiAgICAvLyB0aW1lVG9VbmxvY2sgPj0gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCB8fCB0aW1lVG9VbmxvY2sgPT09IDAsCiAgICBmcmFtZV9kaWcgLTEKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgID49CiAgICBibnogYXNzZXJ0VmFsaWRVbmxvY2tfYm9vbF90cnVlQDIKICAgIGZyYW1lX2RpZyAtMQogICAgYm56IGFzc2VydFZhbGlkVW5sb2NrX2Jvb2xfZmFsc2VAMwoKYXNzZXJ0VmFsaWRVbmxvY2tfYm9vbF90cnVlQDI6CiAgICBpbnRjXzEgLy8gMQoKYXNzZXJ0VmFsaWRVbmxvY2tfYm9vbF9tZXJnZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxMjctMTMwCiAgICAvLyBsb2dnZWRBc3NlcnQoCiAgICAvLyAgIHRpbWVUb1VubG9jayA+PSBHbG9iYWwubGF0ZXN0VGltZXN0YW1wIHx8IHRpbWVUb1VubG9jayA9PT0gMCwKICAgIC8vICAgZXJySW52YWxpZERpc2J1cnNlbWVudFVubG9ja1RpbWUKICAgIC8vICkKICAgIGJueiBhc3NlcnRWYWxpZFVubG9ja19hZnRlcl9hc3NlcnRANgogICAgcHVzaGJ5dGVzICJFUlI6ZXJySWR1dCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJZHV0Cgphc3NlcnRWYWxpZFVubG9ja19hZnRlcl9hc3NlcnRANjoKICAgIHJldHN1YgoKYXNzZXJ0VmFsaWRVbmxvY2tfYm9vbF9mYWxzZUAzOgogICAgaW50Y18wIC8vIDAKICAgIGIgYXNzZXJ0VmFsaWRVbmxvY2tfYm9vbF9tZXJnZUA0CgoKLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo6UmV3YXJkcy5hc3NlcnRWYWxpZEV4cGlyYXRpb24oZXhwaXJhdGlvbjogdWludDY0KSAtPiB2b2lkOgphc3NlcnRWYWxpZEV4cGlyYXRpb246CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjEzNAogICAgLy8gcHJpdmF0ZSBhc3NlcnRWYWxpZEV4cGlyYXRpb24oZXhwaXJhdGlvbjogdWludDY0KTogdm9pZCB7CiAgICBwcm90byAxIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTM2CiAgICAvLyBleHBpcmF0aW9uID49IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgKyA2MCB8fCBleHBpcmF0aW9uID09PSAwLAogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgcHVzaGludCA2MAogICAgKwogICAgZnJhbWVfZGlnIC0xCiAgICA8PQogICAgYm56IGFzc2VydFZhbGlkRXhwaXJhdGlvbl9ib29sX3RydWVAMgogICAgZnJhbWVfZGlnIC0xCiAgICBibnogYXNzZXJ0VmFsaWRFeHBpcmF0aW9uX2Jvb2xfZmFsc2VAMwoKYXNzZXJ0VmFsaWRFeHBpcmF0aW9uX2Jvb2xfdHJ1ZUAyOgogICAgaW50Y18xIC8vIDEKCmFzc2VydFZhbGlkRXhwaXJhdGlvbl9ib29sX21lcmdlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjEzNS0xMzgKICAgIC8vIGxvZ2dlZEFzc2VydCgKICAgIC8vICAgZXhwaXJhdGlvbiA+PSBHbG9iYWwubGF0ZXN0VGltZXN0YW1wICsgNjAgfHwgZXhwaXJhdGlvbiA9PT0gMCwKICAgIC8vICAgZXJySW52YWxpZERpc2J1cnNlbWVudEV4cGlyYXRpb25UaW1lCiAgICAvLyApCiAgICBibnogYXNzZXJ0VmFsaWRFeHBpcmF0aW9uX2FmdGVyX2Fzc2VydEA2CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJJZHh0IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklkeHQKCmFzc2VydFZhbGlkRXhwaXJhdGlvbl9hZnRlcl9hc3NlcnRANjoKICAgIHJldHN1YgoKYXNzZXJ0VmFsaWRFeHBpcmF0aW9uX2Jvb2xfZmFsc2VAMzoKICAgIGludGNfMCAvLyAwCiAgICBiIGFzc2VydFZhbGlkRXhwaXJhdGlvbl9ib29sX21lcmdlQDQKCgovLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjpSZXdhcmRzLndyaXRlQWxsb2NhdGlvbihpZDogdWludDY0LCBhZGRyZXNzOiBieXRlcywgYXNzZXQ6IHVpbnQ2NCwgYW1vdW50OiB1aW50NjQpIC0+IHVpbnQ2NDoKd3JpdGVBbGxvY2F0aW9uOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxNDcKICAgIC8vIHByaXZhdGUgd3JpdGVBbGxvY2F0aW9uKGlkOiB1aW50NjQsIGFkZHJlc3M6IEFjY291bnQsIGFzc2V0OiB1aW50NjQsIGFtb3VudDogdWludDY0KTogdWludDY0IHsKICAgIHByb3RvIDQgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxNDgKICAgIC8vIGlmIChhbW91bnQgPT09IDApIHsKICAgIGZyYW1lX2RpZyAtMQogICAgYm56IHdyaXRlQWxsb2NhdGlvbl9hZnRlcl9pZl9lbHNlQDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTQ5CiAgICAvLyByZXR1cm4gMAogICAgaW50Y18wIC8vIDAKICAgIHJldHN1YgoKd3JpdGVBbGxvY2F0aW9uX2FmdGVyX2lmX2Vsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTUyCiAgICAvLyBjb25zdCBrZXk6IFVzZXJBbGxvY2F0aW9uc0tleSA9IHsgZGlzYnVyc2VtZW50SUQ6IGlkLCBhZGRyZXNzLCBhc3NldCB9CiAgICBmcmFtZV9kaWcgLTIKICAgIGl0b2IKICAgIGZyYW1lX2RpZyAtMwogICAgc3dhcAogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgLTQKICAgIGl0b2IKICAgIHN3YXAKICAgIGRpZyAxCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6OTAKICAgIC8vIHVzZXJBbGxvY2F0aW9ucyA9IEJveE1hcDxVc2VyQWxsb2NhdGlvbnNLZXksIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFJld2FyZHNCb3hQcmVmaXhVc2VyQWxsb2NhdGlvbnMgfSkKICAgIGJ5dGVjIDkgLy8gInUiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxNTMKICAgIC8vIGNvbnN0IFtwcmV2aW91cywgZXhpc3RzXSA9IHRoaXMudXNlckFsbG9jYXRpb25zKGtleSkubWF5YmUoKQogICAgYm94X2dldAogICAgc3dhcAogICAgYnRvaQogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo4NAogICAgLy8gZGlzYnVyc2VtZW50cyA9IEJveE1hcDx1aW50NjQsIERpc2J1cnNlbWVudERldGFpbHM+KHsga2V5UHJlZml4OiBSZXdhcmRzQm94UHJlZml4RGlzYnVyc2VtZW50cyB9KQogICAgYnl0ZWNfMCAvLyAiZCIKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTU0CiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlLmFtb3VudCArPSBhbW91bnQKICAgIGR1cAogICAgcHVzaGludCAzNQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBmcmFtZV9kaWcgLTEKICAgICsKICAgIGl0b2IKICAgIHB1c2hpbnQgMzUKICAgIHN3YXAKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjE1NgogICAgLy8gaWYgKGV4aXN0cykgewogICAgYnogd3JpdGVBbGxvY2F0aW9uX2FmdGVyX2lmX2Vsc2VANAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjE1NwogICAgLy8gdGhpcy51c2VyQWxsb2NhdGlvbnMoa2V5KS52YWx1ZSA9IHByZXZpb3VzICsgYW1vdW50CiAgICBmcmFtZV9kaWcgLTEKICAgICsKICAgIGl0b2IKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTU4CiAgICAvLyByZXR1cm4gMAogICAgaW50Y18wIC8vIDAKICAgIHJldHN1YgoKd3JpdGVBbGxvY2F0aW9uX2FmdGVyX2lmX2Vsc2VANDoKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxNjEKICAgIC8vIHRoaXMudXNlckFsbG9jYXRpb25zKGtleSkudmFsdWUgPSBhbW91bnQKICAgIGZyYW1lX2RpZyAtMQogICAgaXRvYgogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjE2MgogICAgLy8gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZS5hbGxvY2F0aW9ucyArPSAxCiAgICBkdXAKICAgIHB1c2hpbnQgNTkKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGl0b2IKICAgIHB1c2hpbnQgNTkKICAgIHN3YXAKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjE2MwogICAgLy8gcmV0dXJuIDEKICAgIGludGNfMSAvLyAxCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjpSZXdhcmRzLmFzc2VydEluYm91bmRBc3NldFRyYW5zZmVyKGFzc2V0WGZlcjogdWludDY0LCBhbW91bnQ6IHVpbnQ2NCkgLT4gdm9pZDoKYXNzZXJ0SW5ib3VuZEFzc2V0VHJhbnNmZXI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjE3MAogICAgLy8gcHJpdmF0ZSBhc3NlcnRJbmJvdW5kQXNzZXRUcmFuc2Zlcihhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwgYW1vdW50OiB1aW50NjQpOiB2b2lkIHsKICAgIHByb3RvIDIgMAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTcxCiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLnNlbmRlciA9PT0gVHhuLnNlbmRlciwgZXJySW52YWxpZFRyYW5zZmVyKQogICAgZnJhbWVfZGlnIC0yCiAgICBndHhucyBTZW5kZXIKICAgIHR4biBTZW5kZXIKICAgID09CiAgICBibnogYXNzZXJ0SW5ib3VuZEFzc2V0VHJhbnNmZXJfYWZ0ZXJfYXNzZXJ0QDIKICAgIGJ5dGVjIDQgLy8gIkVSUjplcnJJeGZyIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckl4ZnIKCmFzc2VydEluYm91bmRBc3NldFRyYW5zZmVyX2FmdGVyX2Fzc2VydEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxNzIKICAgIC8vIGxvZ2dlZEFzc2VydChhc3NldFhmZXIuYXNzZXRTZW5kZXIgPT09IEdsb2JhbC56ZXJvQWRkcmVzcywgZXJySW52YWxpZFRyYW5zZmVyKQogICAgZnJhbWVfZGlnIC0yCiAgICBndHhucyBBc3NldFNlbmRlcgogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYm56IGFzc2VydEluYm91bmRBc3NldFRyYW5zZmVyX2FmdGVyX2Fzc2VydEA0CiAgICBieXRlYyA0IC8vICJFUlI6ZXJySXhmciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJeGZyCgphc3NlcnRJbmJvdW5kQXNzZXRUcmFuc2Zlcl9hZnRlcl9hc3NlcnRANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTczCiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLnJla2V5VG8gPT09IEdsb2JhbC56ZXJvQWRkcmVzcywgZXJySW52YWxpZFRyYW5zZmVyKQogICAgZnJhbWVfZGlnIC0yCiAgICBndHhucyBSZWtleVRvCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgID09CiAgICBibnogYXNzZXJ0SW5ib3VuZEFzc2V0VHJhbnNmZXJfYWZ0ZXJfYXNzZXJ0QDYKICAgIGJ5dGVjIDQgLy8gIkVSUjplcnJJeGZyIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckl4ZnIKCmFzc2VydEluYm91bmRBc3NldFRyYW5zZmVyX2FmdGVyX2Fzc2VydEA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxNzUKICAgIC8vIGFzc2V0WGZlci5hc3NldENsb3NlVG8gPT09IEdsb2JhbC56ZXJvQWRkcmVzcyB8fCBhc3NldFhmZXIuYXNzZXRDbG9zZVRvID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIGZyYW1lX2RpZyAtMgogICAgZ3R4bnMgQXNzZXRDbG9zZVRvCiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMAogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYm56IGFzc2VydEluYm91bmRBc3NldFRyYW5zZmVyX2Jvb2xfdHJ1ZUA4CiAgICBmcmFtZV9kaWcgMAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBieiBhc3NlcnRJbmJvdW5kQXNzZXRUcmFuc2Zlcl9ib29sX2ZhbHNlQDkKCmFzc2VydEluYm91bmRBc3NldFRyYW5zZmVyX2Jvb2xfdHJ1ZUA4OgogICAgaW50Y18xIC8vIDEKCmFzc2VydEluYm91bmRBc3NldFRyYW5zZmVyX2Jvb2xfbWVyZ2VAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjE3NC0xNzcKICAgIC8vIGxvZ2dlZEFzc2VydCgKICAgIC8vICAgYXNzZXRYZmVyLmFzc2V0Q2xvc2VUbyA9PT0gR2xvYmFsLnplcm9BZGRyZXNzIHx8IGFzc2V0WGZlci5hc3NldENsb3NlVG8gPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICBlcnJJbnZhbGlkQ2xvc2VUbwogICAgLy8gKQogICAgYm56IGFzc2VydEluYm91bmRBc3NldFRyYW5zZmVyX2FmdGVyX2Fzc2VydEAxMgogICAgcHVzaGJ5dGVzICJFUlI6ZXJySWN0byIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJY3RvCgphc3NlcnRJbmJvdW5kQXNzZXRUcmFuc2Zlcl9hZnRlcl9hc3NlcnRAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjE3OAogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci5hc3NldFJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJySW52YWxpZFRyYW5zZmVyKQogICAgZnJhbWVfZGlnIC0yCiAgICBndHhucyBBc3NldFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBhc3NlcnRJbmJvdW5kQXNzZXRUcmFuc2Zlcl9hZnRlcl9hc3NlcnRAMTQKICAgIGJ5dGVjIDQgLy8gIkVSUjplcnJJeGZyIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckl4ZnIKCmFzc2VydEluYm91bmRBc3NldFRyYW5zZmVyX2FmdGVyX2Fzc2VydEAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTc5CiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLmFzc2V0QW1vdW50ID09PSBhbW91bnQsIGVyckludmFsaWRUcmFuc2ZlcikKICAgIGZyYW1lX2RpZyAtMgogICAgZ3R4bnMgQXNzZXRBbW91bnQKICAgIGZyYW1lX2RpZyAtMQogICAgPT0KICAgIGJueiBhc3NlcnRJbmJvdW5kQXNzZXRUcmFuc2Zlcl9hZnRlcl9hc3NlcnRAMTYKICAgIGJ5dGVjIDQgLy8gIkVSUjplcnJJeGZyIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckl4ZnIKCmFzc2VydEluYm91bmRBc3NldFRyYW5zZmVyX2FmdGVyX2Fzc2VydEAxNjoKICAgIHJldHN1YgoKYXNzZXJ0SW5ib3VuZEFzc2V0VHJhbnNmZXJfYm9vbF9mYWxzZUA5OgogICAgaW50Y18wIC8vIDAKICAgIGIgYXNzZXJ0SW5ib3VuZEFzc2V0VHJhbnNmZXJfYm9vbF9tZXJnZUAxMAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6OlJld2FyZHMuZGVsZXRlRGlzYnVyc2VtZW50KGlkOiB1aW50NjQpIC0+IHVpbnQ2NDoKZGVsZXRlRGlzYnVyc2VtZW50OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxOTEKICAgIC8vIHByaXZhdGUgZGVsZXRlRGlzYnVyc2VtZW50KGlkOiB1aW50NjQpOiB1aW50NjQgewogICAgcHJvdG8gMSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjE5MgogICAgLy8gY29uc3QgeyBtYnJDcmVkaXRzLCB0aXRsZSwgbm90ZSB9ID0gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZQogICAgZnJhbWVfZGlnIC0xCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjg0CiAgICAvLyBkaXNidXJzZW1lbnRzID0gQm94TWFwPHVpbnQ2NCwgRGlzYnVyc2VtZW50RGV0YWlscz4oeyBrZXlQcmVmaXg6IFJld2FyZHNCb3hQcmVmaXhEaXNidXJzZW1lbnRzIH0pCiAgICBieXRlY18wIC8vICJkIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjE5MgogICAgLy8gY29uc3QgeyBtYnJDcmVkaXRzLCB0aXRsZSwgbm90ZSB9ID0gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZQogICAgZHVwCiAgICBwdXNoaW50IDc1CiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGRpZyAxCiAgICBwdXNoaW50IDExNwogICAgaW50Y18zIC8vIDIKICAgIGJveF9leHRyYWN0CiAgICBidG9pCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDIKICAgIHB1c2hpbnQgMTE3CiAgICB1bmNvdmVyIDIKICAgIGJveF9leHRyYWN0CiAgICBleHRyYWN0IDIgMAogICAgZGlnIDIKICAgIHB1c2hpbnQgMTE1CiAgICBpbnRjXzMgLy8gMgogICAgYm94X2V4dHJhY3QKICAgIGJ0b2kKICAgIGRpZyAzCiAgICBkaWcgMQogICAgaW50Y18zIC8vIDIKICAgIGJveF9leHRyYWN0CiAgICBidG9pCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDQKICAgIGNvdmVyIDIKICAgIGJveF9leHRyYWN0CiAgICBleHRyYWN0IDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxOTMKICAgIC8vIGNvbnN0IHJlbGVhc2VkOiB1aW50NjQgPSB0aGlzLmRpc2J1cnNlbWVudEJveE1icihCeXRlcyh0aXRsZSkubGVuZ3RoLCBCeXRlcyhub3RlKS5sZW5ndGgpICsgbWJyQ3JlZGl0cwogICAgc3dhcAogICAgbGVuCiAgICBzd2FwCiAgICBsZW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTg0CiAgICAvLyByZXR1cm4gTWluRGlzYnVyc2VtZW50c01CUiArIChCb3hDb3N0UGVyQnl0ZSAqICh0aXRsZUxlbmd0aCArIG5vdGVMZW5ndGgpKQogICAgKwogICAgaW50YyA2IC8vIDQwMAogICAgKgogICAgaW50YyA1IC8vIDU0NTAwCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjE5MwogICAgLy8gY29uc3QgcmVsZWFzZWQ6IHVpbnQ2NCA9IHRoaXMuZGlzYnVyc2VtZW50Qm94TWJyKEJ5dGVzKHRpdGxlKS5sZW5ndGgsIEJ5dGVzKG5vdGUpLmxlbmd0aCkgKyBtYnJDcmVkaXRzCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjE5NAogICAgLy8gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS5kZWxldGUoKQogICAgc3dhcAogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjE5NQogICAgLy8gcmV0dXJuIHJlbGVhc2VkCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjpSZXdhcmRzLm5ld0luc3RhbnREaXNidXJzZW1lbnQoYXNzZXQ6IHVpbnQ2NCwgdGltZVRvVW5sb2NrOiB1aW50NjQsIGV4cGlyYXRpb246IHVpbnQ2NCwgYWxsb2NhdGlvbnM6IGJ5dGVzLCByZWNsYWltVG86IGJ5dGVzKSAtPiBieXRlcywgYnl0ZXM6Cm5ld0luc3RhbnREaXNidXJzZW1lbnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjIwMy0yMDkKICAgIC8vIHByaXZhdGUgbmV3SW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgYXNzZXQ6IHVpbnQ2NCwKICAgIC8vICAgdGltZVRvVW5sb2NrOiB1aW50NjQsCiAgICAvLyAgIGV4cGlyYXRpb246IHVpbnQ2NCwKICAgIC8vICAgYWxsb2NhdGlvbnM6IFVzZXJBbGxvY2F0aW9uW10sCiAgICAvLyAgIHJlY2xhaW1UbzogQWNjb3VudAogICAgLy8gKTogeyBpZDogdWludDY0LCBzdW06IHVpbnQ2NCwgbWJyQW1vdW50OiB1aW50NjQgfSB7CiAgICBwcm90byA1IDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjEwCiAgICAvLyBsb2dnZWRBc3NlcnQoYWxsb2NhdGlvbnMubGVuZ3RoID4gMCwgZXJyRGlzYnVyc2VtZW50c011c3RIYXZlQWxsb2NhdGlvbnMpCiAgICBmcmFtZV9kaWcgLTIKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBkdXAKICAgIGJueiBuZXdJbnN0YW50RGlzYnVyc2VtZW50X2FmdGVyX2Fzc2VydEAyCiAgICBieXRlYyA4IC8vICJFUlI6ZXJyRGJtYSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJEYm1hCgpuZXdJbnN0YW50RGlzYnVyc2VtZW50X2FmdGVyX2Fzc2VydEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyMTEKICAgIC8vIHRoaXMuYXNzZXJ0VmFsaWRVbmxvY2sodGltZVRvVW5sb2NrKQogICAgZnJhbWVfZGlnIC00CiAgICBjYWxsc3ViIGFzc2VydFZhbGlkVW5sb2NrCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjIxMgogICAgLy8gdGhpcy5hc3NlcnRWYWxpZEV4cGlyYXRpb24oZXhwaXJhdGlvbikKICAgIGZyYW1lX2RpZyAtMwogICAgY2FsbHN1YiBhc3NlcnRWYWxpZEV4cGlyYXRpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjE0CiAgICAvLyBjb25zdCBpZCA9IHRoaXMubmV3RGlzYnVyc2VtZW50SUQoKQogICAgY2FsbHN1YiBuZXdEaXNidXJzZW1lbnRJRAogICAgZHVwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjIxNgogICAgLy8gY29uc3QgYWxsb2NhdGlvbnNNYnI6IHVpbnQ2NCA9IFVzZXJBbGxvY2F0aW9uTUJSICogYWxsb2NhdGlvbnMubGVuZ3RoCiAgICBpbnRjIDQgLy8gMjUzMDAKICAgIGRpZyAyCiAgICAqCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjIxNwogICAgLy8gY29uc3QgbWJyQW1vdW50OiB1aW50NjQgPSBNaW5EaXNidXJzZW1lbnRzTUJSICsgYWxsb2NhdGlvbnNNYnIKICAgIGludGMgNSAvLyA1NDUwMAogICAgZGlnIDEKICAgICsKICAgIGNvdmVyIDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjIwCiAgICAvLyBjcmVhdG9yOiBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyMTktMjMxCiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlID0gewogICAgLy8gICBjcmVhdG9yOiBUeG4uc2VuZGVyLAogICAgLy8gICBmaW5hbGl6ZWQ6IHRydWUsCiAgICAvLyAgIHRpdGxlOiAnJywKICAgIC8vICAgYW1vdW50OiAwLAogICAgLy8gICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgIGV4cGlyYXRpb24sCiAgICAvLyAgIGFsbG9jYXRpb25zOiAwLAogICAgLy8gICBkaXN0cmlidXRlZDogMCwKICAgIC8vICAgbWJyQ3JlZGl0czogYWxsb2NhdGlvbnNNYnIsCiAgICAvLyAgIHJlY2xhaW1UbywKICAgIC8vICAgbm90ZTogJycsCiAgICAvLyB9CiAgICBpbnRjXzAgLy8gMAogICAgaXRvYgogICAgc3dhcAogICAgcHVzaGJ5dGVzIDB4ODAwMDc1CiAgICBjb25jYXQKICAgIGRpZyAxCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtNAogICAgaXRvYgogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgLTMKICAgIGl0b2IKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtMQogICAgY29uY2F0CiAgICBwdXNoYnl0ZXMgMHgwMDc3MDAwMDAwMDAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyMTkKICAgIC8vIHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUgPSB7CiAgICBzd2FwCiAgICBpdG9iCiAgICBkdXAKICAgIGNvdmVyIDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6ODQKICAgIC8vIGRpc2J1cnNlbWVudHMgPSBCb3hNYXA8dWludDY0LCBEaXNidXJzZW1lbnREZXRhaWxzPih7IGtleVByZWZpeDogUmV3YXJkc0JveFByZWZpeERpc2J1cnNlbWVudHMgfSkKICAgIGJ5dGVjXzAgLy8gImQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjE5LTIzMQogICAgLy8gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZSA9IHsKICAgIC8vICAgY3JlYXRvcjogVHhuLnNlbmRlciwKICAgIC8vICAgZmluYWxpemVkOiB0cnVlLAogICAgLy8gICB0aXRsZTogJycsCiAgICAvLyAgIGFtb3VudDogMCwKICAgIC8vICAgdGltZVRvVW5sb2NrLAogICAgLy8gICBleHBpcmF0aW9uLAogICAgLy8gICBhbGxvY2F0aW9uczogMCwKICAgIC8vICAgZGlzdHJpYnV0ZWQ6IDAsCiAgICAvLyAgIG1ickNyZWRpdHM6IGFsbG9jYXRpb25zTWJyLAogICAgLy8gICByZWNsYWltVG8sCiAgICAvLyAgIG5vdGU6ICcnLAogICAgLy8gfQogICAgZHVwCiAgICBib3hfZGVsCiAgICBwb3AKICAgIHN3YXAKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjMzCiAgICAvLyBsZXQgc3VtOiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyMzQKICAgIC8vIGxldCBuZXdCb3hlczogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjM1CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgYWxsb2NhdGlvbnMubGVuZ3RoOyBpICs9IDEpIHsKICAgIGludGNfMCAvLyAwCgpuZXdJbnN0YW50RGlzYnVyc2VtZW50X3doaWxlX3RvcEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyMzUKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBhbGxvY2F0aW9ucy5sZW5ndGg7IGkgKz0gMSkgewogICAgZHVwCiAgICBkaWcgMgogICAgPAogICAgYnogbmV3SW5zdGFudERpc2J1cnNlbWVudF9hZnRlcl93aGlsZUA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjIzNgogICAgLy8gbmV3Qm94ZXMgKz0gdGhpcy53cml0ZUFsbG9jYXRpb24oaWQsIGFsbG9jYXRpb25zW2ldLmFkZHJlc3MsIGFzc2V0LCBhbGxvY2F0aW9uc1tpXS5hbW91bnQpCiAgICBmcmFtZV9kaWcgLTIKICAgIGV4dHJhY3QgMiAwCiAgICBkaWcgMQogICAgcHVzaGludCA0MAogICAgKgogICAgcHVzaGludCA0MAogICAgZXh0cmFjdDMgLy8gb24gZXJyb3I6IGluZGV4IGFjY2VzcyBpcyBvdXQgb2YgYm91bmRzCiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgc3dhcAogICAgcHVzaGludCAzMgogICAgZXh0cmFjdF91aW50NjQKICAgIGRpZyA2CiAgICB1bmNvdmVyIDIKICAgIGZyYW1lX2RpZyAtNQogICAgZGlnIDMKICAgIGNhbGxzdWIgd3JpdGVBbGxvY2F0aW9uCiAgICB1bmNvdmVyIDQKICAgICsKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjM3CiAgICAvLyBzdW0gKz0gYWxsb2NhdGlvbnNbaV0uYW1vdW50CiAgICB1bmNvdmVyIDQKICAgICsKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjM1CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgYWxsb2NhdGlvbnMubGVuZ3RoOyBpICs9IDEpIHsKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBiIG5ld0luc3RhbnREaXNidXJzZW1lbnRfd2hpbGVfdG9wQDMKCm5ld0luc3RhbnREaXNidXJzZW1lbnRfYWZ0ZXJfd2hpbGVANToKICAgIHBvcG4gMgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyMzkKICAgIC8vIHRoaXMudXNlTWJyQ3JlZGl0KGlkLCBVc2VyQWxsb2NhdGlvbk1CUiAqIG5ld0JveGVzKQogICAgaW50YyA0IC8vIDI1MzAwCiAgICAqCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGNhbGxzdWIgdXNlTWJyQ3JlZGl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjI0MQogICAgLy8gcmV0dXJuIHsgaWQsIHN1bSwgbWJyQW1vdW50IH0KICAgIGl0b2IKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgLTIKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6OlJld2FyZHMubmV3RGlzYnVyc2VtZW50KG1iclBheW1lbnQ6IHVpbnQ2NCwgdGl0bGU6IGJ5dGVzLCB0aW1lVG9VbmxvY2s6IHVpbnQ2NCwgZXhwaXJhdGlvbjogdWludDY0LCBub3RlOiBieXRlcywgcmVjbGFpbVRvOiBieXRlcykgLT4gdWludDY0OgpuZXdEaXNidXJzZW1lbnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjI0NC0yNTEKICAgIC8vIHByaXZhdGUgbmV3RGlzYnVyc2VtZW50KAogICAgLy8gICBtYnJQYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIHRpdGxlOiBzdHJpbmcsCiAgICAvLyAgIHRpbWVUb1VubG9jazogdWludDY0LAogICAgLy8gICBleHBpcmF0aW9uOiB1aW50NjQsCiAgICAvLyAgIG5vdGU6IHN0cmluZywKICAgIC8vICAgcmVjbGFpbVRvOiBBY2NvdW50CiAgICAvLyApOiB1aW50NjQgewogICAgcHJvdG8gNiAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjI1MgogICAgLy8gY29uc3QgaWQgPSB0aGlzLm5ld0Rpc2J1cnNlbWVudElEKCkKICAgIGNhbGxzdWIgbmV3RGlzYnVyc2VtZW50SUQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyNTQKICAgIC8vIGNvbnN0IGNvc3RzID0gdGhpcy5tYnIodGl0bGUsIG5vdGUpCiAgICBmcmFtZV9kaWcgLTUKICAgIGZyYW1lX2RpZyAtMgogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9iYXNlLnRzOjpCYXNlUmV3YXJkcy5tYnIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjU1CiAgICAvLyBjb25zdCBtYnJBbW91bnQgPSBjb3N0cy5kaXNidXJzZW1lbnRzCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjU4CiAgICAvLyBjb25zdCBzcG9uc29yID0gdGhpcy5zcG9uc29yKGlkLCBtYnJQYXltZW50LnNlbmRlcikKICAgIGZyYW1lX2RpZyAtNgogICAgZ3R4bnMgU2VuZGVyCiAgICBjYWxsc3ViIHNwb25zb3IKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjU5CiAgICAvLyBhc3NlcnRQbGFpblBheW1lbnQobWJyUGF5bWVudCkKICAgIGZyYW1lX2RpZyAtNgogICAgY2FsbHN1YiBhc3NlcnRQbGFpblBheW1lbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjYwCiAgICAvLyBsb2dnZWRBc3NlcnQobWJyUGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRQYXltZW50KQogICAgZnJhbWVfZGlnIC02CiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogbmV3RGlzYnVyc2VtZW50X2FmdGVyX2Fzc2VydEAyCiAgICBieXRlYyA1IC8vICJFUlI6ZXJySXBheSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcGF5CgpuZXdEaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjI2MQogICAgLy8gbG9nZ2VkQXNzZXJ0KG1iclBheW1lbnQuYW1vdW50ID49IG1ickFtb3VudCArIHNwb25zb3IsIGVyckludmFsaWRQYXltZW50KQogICAgZnJhbWVfZGlnIC02CiAgICBndHhucyBBbW91bnQKICAgIGR1cAogICAgZGlnIDIKICAgIGRpZyA0CiAgICArCiAgICA+PQogICAgYm56IG5ld0Rpc2J1cnNlbWVudF9hZnRlcl9hc3NlcnRANAogICAgYnl0ZWMgNSAvLyAiRVJSOmVycklwYXkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBheQoKbmV3RGlzYnVyc2VtZW50X2FmdGVyX2Fzc2VydEA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyNjQKICAgIC8vIGNyZWF0b3I6IFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjI3MgogICAgLy8gbWJyQ3JlZGl0czogbWJyUGF5bWVudC5hbW91bnQgLSBtYnJBbW91bnQgLSBzcG9uc29yLAogICAgc3dhcAogICAgdW5jb3ZlciAyCiAgICAtCiAgICB1bmNvdmVyIDIKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjYzLTI3NQogICAgLy8gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZSA9IHsKICAgIC8vICAgY3JlYXRvcjogVHhuLnNlbmRlciwKICAgIC8vICAgZmluYWxpemVkOiBmYWxzZSwKICAgIC8vICAgdGl0bGUsCiAgICAvLyAgIGFtb3VudDogMCwKICAgIC8vICAgdGltZVRvVW5sb2NrLAogICAgLy8gICBleHBpcmF0aW9uLAogICAgLy8gICBhbGxvY2F0aW9uczogMCwKICAgIC8vICAgZGlzdHJpYnV0ZWQ6IDAsCiAgICAvLyAgIG1ickNyZWRpdHM6IG1iclBheW1lbnQuYW1vdW50IC0gbWJyQW1vdW50IC0gc3BvbnNvciwKICAgIC8vICAgcmVjbGFpbVRvLAogICAgLy8gICBub3RlLAogICAgLy8gfQogICAgZnJhbWVfZGlnIC01CiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBmcmFtZV9kaWcgLTUKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBieXRlYyAyMSAvLyAweDAwMDA3NQogICAgY29uY2F0CiAgICBkaWcgMQogICAgbGVuCiAgICBwdXNoaW50IDExNwogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyNjcKICAgIC8vIGFtb3VudDogMCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjI2My0yNzUKICAgIC8vIHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUgPSB7CiAgICAvLyAgIGNyZWF0b3I6IFR4bi5zZW5kZXIsCiAgICAvLyAgIGZpbmFsaXplZDogZmFsc2UsCiAgICAvLyAgIHRpdGxlLAogICAgLy8gICBhbW91bnQ6IDAsCiAgICAvLyAgIHRpbWVUb1VubG9jaywKICAgIC8vICAgZXhwaXJhdGlvbiwKICAgIC8vICAgYWxsb2NhdGlvbnM6IDAsCiAgICAvLyAgIGRpc3RyaWJ1dGVkOiAwLAogICAgLy8gICBtYnJDcmVkaXRzOiBtYnJQYXltZW50LmFtb3VudCAtIG1ickFtb3VudCAtIHNwb25zb3IsCiAgICAvLyAgIHJlY2xhaW1UbywKICAgIC8vICAgbm90ZSwKICAgIC8vIH0KICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgZGlnIDEKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC00CiAgICBpdG9iCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtMwogICAgaXRvYgogICAgY29uY2F0CiAgICBkaWcgMQogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIHVuY292ZXIgMwogICAgaXRvYgogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgLTEKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC0yCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBmcmFtZV9kaWcgLTIKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjYzCiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlID0gewogICAgZGlnIDEKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6ODQKICAgIC8vIGRpc2J1cnNlbWVudHMgPSBCb3hNYXA8dWludDY0LCBEaXNidXJzZW1lbnREZXRhaWxzPih7IGtleVByZWZpeDogUmV3YXJkc0JveFByZWZpeERpc2J1cnNlbWVudHMgfSkKICAgIGJ5dGVjXzAgLy8gImQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjYzLTI3NQogICAgLy8gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZSA9IHsKICAgIC8vICAgY3JlYXRvcjogVHhuLnNlbmRlciwKICAgIC8vICAgZmluYWxpemVkOiBmYWxzZSwKICAgIC8vICAgdGl0bGUsCiAgICAvLyAgIGFtb3VudDogMCwKICAgIC8vICAgdGltZVRvVW5sb2NrLAogICAgLy8gICBleHBpcmF0aW9uLAogICAgLy8gICBhbGxvY2F0aW9uczogMCwKICAgIC8vICAgZGlzdHJpYnV0ZWQ6IDAsCiAgICAvLyAgIG1ickNyZWRpdHM6IG1iclBheW1lbnQuYW1vdW50IC0gbWJyQW1vdW50IC0gc3BvbnNvciwKICAgIC8vICAgcmVjbGFpbVRvLAogICAgLy8gICBub3RlLAogICAgLy8gfQogICAgZHVwCiAgICBib3hfZGVsCiAgICBwb3AKICAgIHN3YXAKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6Mjc3CiAgICAvLyByZXR1cm4gaWQKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2Jhc2UudHM6OkJhc2VSZXdhcmRzLm1icih0aXRsZTogYnl0ZXMsIG5vdGU6IGJ5dGVzKSAtPiBieXRlczoKc21hcnRfY29udHJhY3RzL3Jld2FyZHMvYmFzZS50czo6QmFzZVJld2FyZHMubWJyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvYmFzZS50czo3LTgKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgLy8gbWJyKHRpdGxlOiBzdHJpbmcsIG5vdGU6IHN0cmluZyk6IFJld2FyZHNNQlJEYXRhIHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvYmFzZS50czoxMAogICAgLy8gZGlzYnVyc2VtZW50czogTWluRGlzYnVyc2VtZW50c01CUiArIChCb3hDb3N0UGVyQnl0ZSAqIChCeXRlcyh0aXRsZSkubGVuZ3RoICsgQnl0ZXMobm90ZSkubGVuZ3RoKSksCiAgICBmcmFtZV9kaWcgLTIKICAgIGxlbgogICAgZnJhbWVfZGlnIC0xCiAgICBsZW4KICAgICsKICAgIGludGMgNiAvLyA0MDAKICAgICoKICAgIGludGMgNSAvLyA1NDUwMAogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvYmFzZS50czo5LTEyCiAgICAvLyByZXR1cm4gewogICAgLy8gICBkaXNidXJzZW1lbnRzOiBNaW5EaXNidXJzZW1lbnRzTUJSICsgKEJveENvc3RQZXJCeXRlICogKEJ5dGVzKHRpdGxlKS5sZW5ndGggKyBCeXRlcyhub3RlKS5sZW5ndGgpKSwKICAgIC8vICAgdXNlckFsbG9jYXRpb25zOiBVc2VyQWxsb2NhdGlvbk1CUgogICAgLy8gfQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvYmFzZS50czoxMQogICAgLy8gdXNlckFsbG9jYXRpb25zOiBVc2VyQWxsb2NhdGlvbk1CUgogICAgaW50YyA0IC8vIDI1MzAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9iYXNlLnRzOjktMTIKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIGRpc2J1cnNlbWVudHM6IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoQm94Q29zdFBlckJ5dGUgKiAoQnl0ZXModGl0bGUpLmxlbmd0aCArIEJ5dGVzKG5vdGUpLmxlbmd0aCkpLAogICAgLy8gICB1c2VyQWxsb2NhdGlvbnM6IFVzZXJBbGxvY2F0aW9uTUJSCiAgICAvLyB9CiAgICBpdG9iCiAgICBjb25jYXQKICAgIHJldHN1Ygo=", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyAIAAEIAtTFAeSpA5AD1N4BJhkBZAtFUlI6ZXJyRGJuZQQVH3x1C0VSUjplcnJZbmNyC0VSUjplcnJJeGZyC0VSUjplcnJJcGF5C0VSUjplcnJJbWJyC0VSUjplcnJEYmFmC0VSUjplcnJEYm1hAXUPZGlzYnVyc2VtZW50X2lkC0VSUjplcnJOY2xzC0VSUjplcnJOcmt5C0VSUjplcnJJcG1yC0VSUjplcnJJcG1hASQJYWtpdGFfZGFvC0VSUjplcnJJZ2l4C0VSUjplcnJEYmVtC0VSUjplcnJEYm5sC0VSUjplcnJJcG1zAwAAdQtFUlI6ZXJyRGJsawtFUlI6ZXJyQWxuZQtFUlI6ZXJyRGJueDEYQAAEJwojZzEZFEQxGEEApIIWBGZhIFoE1hpp+gRl5JZDBByeu9sEj0kmLQRWVqz5BPYs3CsEb1wQzwRUJKWRBNysCTUEe33F/ASjoWyqBK8aFPIEPsQKpAS9PNCQBIjF+XMECHtLZQQUlp2XBDPpLJQEhU3t4ATVS7rZBDlOrrI2GgCOFgF1AegCZwK2Av4EawVOBfoH2QhcCMcJKwmoCh8LdQyBDiMOhw7KAAEPAA8pACNDgATNmtZ+NhoAjgEBOgCKAQCL/zgJMgMSQAAEJwuwAIv/OCAyAxJAAAQnDLAAiYoDAIv9iP/Yi/04B4v+EkAABCcNsACL/TgIi/8SQAAEJw6wAImKAgGL/gEnD0xQvkEAAYlIi/+JigIBi/5zAEUBQAAIi/8yAQ9BAAIjiSKJigMBi/0BJw9MUEm+QAAKi/8Wi/5MUIwAiUy8SIv/IQcISUsCTIj/wEEABUxMFlCJRQGL/kL/9YoFAIv7OACL/BJAAAQnFLAAi/s4EzIDEkAAD4ALRVJSOmVyck5jbHewAIv7OBUyAxJAAAQnC7AAi/s4IDIDEkAABCcMsACL+zgUi/0SQAAPgAtFUlI6ZXJySWFyZbAAi/s4EYv+EkAAD4ALRVJSOmVycklhc3SwAIv7OBKL/xJAAA+AC0VSUjplcnJJYWFtsACJNhoBSSJZJQhLARUSRFcCADYaAkkVJBJEF4AHdmVyc2lvbk8CZycQTGcjQzYaAUkVJBJEF0kxFiMJSU4COBAjEkQWKExQSU4CvUUBQAADKbAASwEigSC6MQASQAADK7AASTgAMQBPA0yI/qESQAAPgAtFUlI6ZXJySXB5crAARwKI/kQ4BzIKEkAABCcFsAA4CElAAAQnBbAAiA2TI0M2GgFJFSQSRBc2GgJJFSQSRBdMFihMUEm9RQFAAAMpsABJIoEgujEAEkAAAyuwAEsBQAAEJwawAEmBSyS6F0sCD0AABCcGsABJgUskuhdLAklOAwkWSwGBS08CuzEAiP4NSU4CsUyI/hhBAA2yB7III7IQIrIBsyNDSDEAQv/tMRYjCUk4ECMSRDYaAUkiWSUISwEVEkRXAgA2GgJJFSQSRBc2GgNJFSQSRBc2GgRJIlklCEsBFRJEVwIANhoFSRWBIBJEiA9SFipMULAjQzEWIwlJOBAjEkQ2GgFJIlklCEsBFRJEVwIANhoCSRUkEkQXNhoDSRUkEkQXNhoESSJZJQhLARUSRFcCADIDiA8KFipMULAjQ4AASTYaAUkVJBJEFzYaAklOAkkiWSUISwEVSU4EEkRXAgBMNhoDSU4CFSQSRDYaBElOAhUkEkQ2GgVJTgJJIlklCEsBFRJEVwIATBYoTFBJvUUBQAADKbAARwIigSC6SwGBICO6IlNOA0sBgXUluhclCEsCgXVPArpXAgBOA0sBgXMluhdLAksBJboXJQhPA04CulcCAE4CMQASQAADK7AATwNBAAQnB7AATwIVTwIVCCEGCyEFCElFCk8GFU8DFQghBgshBQhJRQoMQQCCSwdLBwlJSwKBSyS6Fw5AAAQnBrAASwFJgUskuhdPAgkWgUtMu0m+REmBIVlLASJLAlhPCFBLAoFzWUsDFU8ESwJPAlJPAkxQSwFPAwlPAk8HCEwJFlcGAlxzSwG8SEsBTL9JgStPBbtJgTNPBLtJvkhJgXNZIkxYTwJQSwG8SL8jQ0sGSwgNQf+bRwKBSyS6F0sISwoJCBaBS0y7Qv+GMRYjCUk4ECMSRDYaAUkVJBJEF0lOAjYaAklOAkkiWUlOBoEoCyUITBUSRBYoTFBJvUUBQAADKbAASSKBILpMgSAjuiJTTDEAEkAAAyuwAEEABCcHsAAiTgIiTgIiSUsHDEEALksBVwIASwGBKAuBKFhJVwAgTIEgW0sHTwIiSwOIC0ZPBQhOBE8FCE4EIwhC/8tGAiEETwILTwNMiAqvMgoxAEsCOAASQAAEJxSwAEsBOAkyAxJAAAQnC7AASwE4IDIDEkAABCcMsABLATgHEkAABCcNsAA4CBJAAAQnDrAAI0MxFiMJSTgQgQQSRDYaAUkVJBJEF0k2GgJJTgJJIllJTgaBKAslCEwVEkQWKExQSb1FAUAAAymwAEkigSC6TIEgI7oiU0wxABJAAAMrsABBAAQnB7AASwI4EU4DIk4DIkwiSUsIDEEAL0sBVwIASwGBKAuBKFhJVwAgTIEgW0sFTwJLCUsDiApeTwQITgNPBghOBSMIQv/KRgIhBAuICcwxADIKTwRPBIj6wCNDNhoBSRUkEkQXNhoCSRUkEkQXNhoDSSJZJQhLARUSRFcCAE4CNhoESRUkEkQXTDYaBUkVJBJEF0w2GgZJIlklCEsBFRJEVwIATgM2GgdJTgdJIllJTgJJgSgLJQhPAhUSREAABCcIsAAxFksBDUAABCcRsAAxFksBCUsCEkAABCcRsABLASMJSwYSQAAEJxGwAE8DSYgJUE8DSU4CiAlwiAjQSU4FTwdJOBAjEkRPCElOA08JSU4HiAvpSSJbTCRbSwgLMgpPAksCCEsDOABLBUyICMMITwNOAoj5WzEAMgNLBBUWVwYCTwVQTwInFVBLARWBdQgiFk8CSwFQTwcWUE8HFlBLAVBMUE8EFlBPA1BLBBUWVwYCTwVQTwIWVwYCTwJMUE8CUExQTBZJTgQoTFBJTgJJvEhMvyJOAiJMSwFLAwxBAFtLBEsCSU4CCElOAjgQgQQSREsJVwIATIEoC4EoWElOBoEgW0lAAAQnErAAMQAyCk8DSTgRTE8DTwNLA0sFiPk4TwZXACBLCUxPAk8DiAilTwQITgNMIwhMQv+dRQFFAU8CSCEETwILTwNMiAgMSYEjJLoXQAAEJxKwAEmBOyS6F0AABCcIsABJgSAjuiIjVIEgTLsqTFCwI0M2GgFJFSQSRBcWKExQSb1FAUAAAymwAEcCIoEguksBgSAjuiJTTgNLAYErJLoXTgNLAYEzJLoXTgNLAYEjJLoXTgNMgTskuhdMMQASQAADK7AATwVBAAQnB7AATwSIB6hPA4gHy08CQAAEJxKwAEAABCcIsABJgSAjuiIjVIEgTLsjQzEWIwlJOBAjEkQ2GgFJFSQSRBc2GgJJFSQSRBc2GgNJIlmBKAslCEsBFRJENhoESRWBIBJEIk4EiAi6SElXAAhLASJbSwIkW08DgRBbMgpMTwIISwQ4AE8DTIgG2AhPA04CiPdwKkxQsCNDMRYjCUk4ECMSRDYaAUkVJBJEFzYaAkkVJBJEFzYaA0kiWYEoCyUISwEVEkQyAyJOBIgIVkhJVwAISwEiW0sCJFtPA4EQWzIKTE8CCEsEOABPA0yIBnQITwNOAoj3DCpMULAjQzEWJQlJOBAjEkQxFiMJSTgQgQQSRDYaAUkVJBJEFzYaAkkVJBJEFzYaA0kiWYEoCyUISwEVEkQ2GgRJFYEgEkRLBDgRTgSIB91ISVcACEsBIltLAiRbTwOBEFsyCksGOABPBEyIBf9PAghPBU4CiPaVTwJMiAbuKkxQsCNDMRYlCUk4ECMSRDEWIwlJOBCBBBJENhoBSRUkEkQXNhoCSRUkEkQXNhoDSSJZgSgLJQhLARUSREsDOBEyA0xOBIgHZkhJVwAISwEiW0sCJFtPA4EQWzIKSwY4AE8ETIgFiE8CCE8FTgKI9h5PAkyIBncqTFCwI0OAADYaAUcCIllJTgKBEAslCEwVEkQiSUsCDEEBN0sCVwIASwGBEAuBEFhJTgQiW0lOBRZJTgIoTFBJTgK9RQFAAAMpsABLAUmBICO6IlNLAYErJLoXTghLAYEzJLoXRQtLAYEjJLoXTgRLAYFDJLoXTgRLAYFzJboXSwJLASW6FyUITwNOArpXAgBMQAAEJxOwADIHTwoPQAAEJxawAEsKQQAISwoyBw9BAKUjQAAEJxawAE8ETwQNQAAPgAtFUlI6ZXJyRGJmZLAAMQBPByRbSU4IFlBPBFAnCUxQSb1FAUAABCcXsABJvkQXSU4CTwVJgTskuhcjCRZLAYE7TwK7SYFDJLoXTwIIFoFDTLu8SE8GIQSIBENLBUEAHDEAsU8CsgVPBbIRshSyEoEEshAisgGzIwhC/t5PBUgxALFPArIFsgeyCCOyECKyAbNC/+MiQv9YI0OAADYaAUkVJBJEF0k2GgJJTgJJIllJTgOBKAslCEwVEkQWSShMUEm9RQFAAAMpsABHAiKBILpJTgJOA0mBICO6IlNOA4EzJLoXRQkxABJAAAMrsABMQAAEJxOwAEsGQQCnSwYyBwxBAJ8jQAAEJxiwACJJSwUMQQCNSwVXAgBLAYEoC4EoWElXACBMgSBbSU4EFlBLBVAnCUxQSb1FAUAABCcXsABJvkQXSU4CSwRJgTskuhcjCRZLAYE7TwK7SYEjJLoXTwIJFoEjTLu8SEsIIQSIAy9LA0EAGLFPA7IRshJLArIUgQSyECKyAbMjCEL/gE8DSLGyCEsCsgcjshAisgGzQv/nI0MiQv9eIkcCgABHBDYaAUkVJBJEF0k2GgJJTgJJIllJTgOBKAslCEwVEkQWSShMUEm9RQFAAAMpsABHAoEgI7oiU0xJgTMkuhdFC4MCUyC6SUUNMgMTQAAPgAtFUlI6ZXJyRGJuc7AAQAAEJxOwAEsIQQEvSwgyBwxBAScjQAAEJxiwACJFCiJFCCJJSwQMQQCaSwRXAgBLAYEoC4EoWElXACBMgSBbSUUKFlBLA1AnCUxQSUUOvkwXRQhBADdLAUmBOyS6FyMJFksBgTtPArtJgSMkuhdLCAkWgSNMu0sMvEhLCCEECEUJSwdAAAxLCksHCEULIwhC/5FLC0sIcABFAUAAD4ALRVJSOmVyclJjb2mwALFLB7IRSwayEksLshSBBLIQIrIBs0L/yUhHAksMiPKmRQ6BOyS6F0AAHUsEiANISwgISwFLDE8CiPK2SVcAIEyBIFtFCUUNSwxLCxJAAApLDEsIiPKDQAAeSwlLCAhFCksJQQAQsUsJsghLCrIHI7IQIrIBsyNDSwdB/+SxSweyCEsMsgcjshAisgGzQv/RIkL+1jYaAUkVJBJEF0kWKExQSb1FAUAAAymwAEcCIoEguklOAk4EgTskuhdMMQASQAADK7AAQQAPgAtFUlI6ZXJyRGJuebAATIgCnExOAojyEElXACBMgSBbsbIIsgcjshAisgGzI0M2GgFJFSQSRBc2GgJJFSQSRBdMFihMUEm9RQFAAAMpsAAhBE8CC0lPAoFLJLoXSU8CD0EACkYCIhYqTFCwI0MJQv/1NhoBSRUkEkQXMQAiJxBlRIAGd2FsbGV0ZUhyCEQSQAAPgAtFUlI6ZXJyTmRhb7AAJxBMZyNDNhoBSSJZJQhLARUSRFcCADYaAkkiWSUISwEVEkRXAgCIA3oqTFCwI0MxFiMJRwI4ECMSRDYaAUkVJBJEF0w4BzIKEkAABCcNsABMOAgyEBJAAAQnDrAAsTIKTLIRIrISshSBBLIQIrIBsyNDIicKZURJIwgnCkxniYoCAIv+FihMUEmBSyS6F4v/CBaBS0y7iYoCAYv+FihMUIv/MQATQQAKiwABJw9MUIv/v4v/MQASIQciTwJNTImKAgCL/hYoTFBJgUskuheL/w9AAAQnBrAASYFLJLoXi/8JFoFLTLuJigEAi/8yBw9AAAWL/0AAFCNAAA+AC0VSUjplcnJJZHV0sACJIkL/6YoBADIHgTwIi/8OQAAFi/9AABQjQAAPgAtFUlI6ZXJySWR4dLAAiSJC/+mKBAGL/0AAAiKJi/4Wi/1MUIv8FkxLAVAnCUxQSU4CvkwXTgIoTwJQSU4CSYEjJLoXi/8IFoEjTLtBAAhIi/8IFr8iiUUBi/8WTwJMv0mBOyS6FyMIFoE7TLsjiYoCACKL/jgAMQASQAAEJwSwAIv+OBMyAxJAAAQnBLAAi/44IDIDEkAABCcEsACL/jgVSYwAMgMSQAAIiwAyChJBADAjQAAPgAtFUlI6ZXJySWN0b7AAi/44FDIKEkAABCcEsACL/jgSi/8SQAAEJwSwAIkiQv/NigEBi/8WKExQSYFLJLoXSwGBdSW6FyUISwKBdU8CulcCAEsCgXMluhdLA0sBJboXJQhLBE4CulcCAEwVTBUIIQYLIQUICEy8SImKBQKL/iJZSUAABCcIsACL/Ij+fIv9iP6fiP3/SU4CIQRLAgshBUsBCE4EMQAiFkyAA4AAdVBLAVCL/BZQi/0WUEsBUExQTBZQi/9QgAYAdwAAAABQTBZJTgQoTFBJvEhMvyJMIkwiSUsCDEEAL4v+VwIASwGBKAuBKFhJVwAgTIEgW0sGTwKL+0sDiP5VTwQITgNPBAhOAyMIQv/KRgIhBAtPAkyI/cAWUEwWUIv+iYoGAYj9ZUmL+4v+iACOIltMi/o4AIj9eEyL+ojt8ov6OAcyChJAAAQnBbAAi/o4CElLAksECA9AAAQnBbAAMQBMTwIJTwIJi/sVFlcGAov7UE8CJxVQSwEVgXUIIhZPAksBUIv8FlCL/RZQSwFQTFBPAxZQi/9Qi/4VFlcGAov+UE8CFlcGAk8CTFBPAlBMUEsBFihMUEm8SEy/iYoCAYv+FYv/FQghBgshBQgWIQQWUIk=", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
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
     * Constructs a no op call for the createDisbursement(pay,string,uint64,uint64,string,address)uint64 ABI method
     *
    * Opens a draft disbursement; allocations follow in batches, then `finalizeDisbursement`. After
    `expiration`, anyone may sweep what is unclaimed to a non-zero `reclaimTo` (`sweepExpired`).
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static createDisbursementPayStringUint64Uint64StringAddressUint64(params) {
    return {
      ...params,
      method: "createDisbursement(pay,string,uint64,uint64,string,address)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.mbrPayment, params.args.title, params.args.timeToUnlock, params.args.expiration, params.args.note, params.args.reclaimTo]
    };
  }
  /**
   * Constructs a no op call for the createDisbursement(pay,string,uint64,uint64,string)uint64 ABI method
   *
   * The pre-reclaim-target selector: `createDisbursement` with no reclaim target.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static createDisbursementPayStringUint64Uint64StringUint64(params) {
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
    * Creates and finalizes a multi-ASA disbursement funded by the `allocations.length + 1`
    transactions immediately before this call: one exact MBR payment from any payer, then one asset
    transfer per allocation from the caller.
  
    The index arguments are kept for ABI compatibility and must equal those positions. Binding
    the funding to the slots directly before the call means no other call in the group (this
    method or any positional transaction argument) can reuse it (C-1).
  
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
     * Constructs a no op call for the createInstantDisbursement(pay,uint64,uint64,(address,uint64)[],address)uint64 ABI method
     *
    * Instant ALGO disbursement. The payment must be exactly the disbursement MBR, one allocation
    MBR per entry, and the allocation sum, from any payer (a payer other than the caller adds
    `PayerRecordMBR` and gets the storage back; the reward amounts stay the caller's). Repeated
    addresses are summed and zero amounts are skipped; the MBR of boxes not created stays as
    withdrawable credit. After `expiration`, anyone may sweep what is unclaimed to
    a non-zero `reclaimTo` (`sweepExpired`).
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static createInstantDisbursementPayUint64Uint64AddressUint64AddressUint64(params) {
    return {
      ...params,
      method: "createInstantDisbursement(pay,uint64,uint64,(address,uint64)[],address)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.mbrPayment, params.args.timeToUnlock, params.args.expiration, params.args.allocations, params.args.reclaimTo]
    };
  }
  /**
     * Constructs a no op call for the createInstantDisbursement(pay,uint64,uint64,(address,uint64)[])uint64 ABI method
     *
    * The pre-reclaim-target selector: `createInstantDisbursement` with no reclaim target. It charges the
    v2 disbursement MBR, so deployed callers that pay the v1 amount revert.
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static createInstantDisbursementPayUint64Uint64AddressUint64Uint64(params) {
    return {
      ...params,
      method: "createInstantDisbursement(pay,uint64,uint64,(address,uint64)[])uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.mbrPayment, params.args.timeToUnlock, params.args.expiration, params.args.allocations]
    };
  }
  /**
   * Constructs a no op call for the createInstantAsaDisbursement(pay,axfer,uint64,uint64,(address,uint64)[],address)uint64 ABI method
   *
   * Instant ASA disbursement; same rules as `createInstantDisbursement`, with the sum sent as `assetXfer`.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static createInstantAsaDisbursementPayAxferUint64Uint64AddressUint64AddressUint64(params) {
    return {
      ...params,
      method: "createInstantAsaDisbursement(pay,axfer,uint64,uint64,(address,uint64)[],address)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.mbrPayment, params.args.assetXfer, params.args.timeToUnlock, params.args.expiration, params.args.allocations, params.args.reclaimTo]
    };
  }
  /**
   * Constructs a no op call for the createInstantAsaDisbursement(pay,axfer,uint64,uint64,(address,uint64)[])uint64 ABI method
   *
   * The pre-reclaim-target selector: `createInstantAsaDisbursement` with no reclaim target, at the v2 MBR.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static createInstantAsaDisbursementPayAxferUint64Uint64AddressUint64Uint64(params) {
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
     * Constructs a no op call for the sweepExpired(uint64,(address,uint64)[])void ABI method
     *
    * Permissionless sweep of an expired disbursement that has a reclaim target. Each listed
    allocation that still exists is deleted and its amount and box MBR go to the reclaim target
    (allocations already claimed or swept are skipped). Once no allocations remain, the
    disbursement box is deleted and its MBR and the remaining MBR credits go there too. The
    creator's own `reclaimRewards` is unchanged.
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static sweepExpired(params) {
    return {
      ...params,
      method: "sweepExpired(uint64,(address,uint64)[])void",
      args: Array.isArray(params.args) ? params.args : [params.args.id, params.args.reclaims]
    };
  }
  /**
     * Constructs a no op call for the closeDisbursement(uint64)void ABI method
     *
    * Deletes a disbursement with no outstanding allocations (never-used drafts, or finalized
    disbursements fully claimed/reclaimed) and refunds its box MBR and any remaining MBR credits to
    whoever funded it (the creator, unless someone else paid).
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static closeDisbursement(params) {
    return {
      ...params,
      method: "closeDisbursement(uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.id]
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
   * Checks for decode errors on the given return value and maps the return value to the return type for the given method
   * @returns The typed return value or undefined if there was no value
   */
  decodeReturnValue(method, returnValue) {
    return returnValue !== void 0 ? getArc56ReturnValue(returnValue, this.appClient.getABIMethod(method), APP_SPEC.structs) : void 0;
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
         * Makes a call to the Rewards smart contract using the `createDisbursement(pay,string,uint64,uint64,string,address)uint64` ABI method.
         *
        * Opens a draft disbursement; allocations follow in batches, then `finalizeDisbursement`. After
        `expiration`, anyone may sweep what is unclaimed to a non-zero `reclaimTo` (`sweepExpired`).
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    createDisbursementPayStringUint64Uint64StringAddressUint64: (params) => {
      return this.appClient.params.call(RewardsParamsFactory.createDisbursementPayStringUint64Uint64StringAddressUint64(params));
    },
    /**
     * Makes a call to the Rewards smart contract using the `createDisbursement(pay,string,uint64,uint64,string)uint64` ABI method.
     *
     * The pre-reclaim-target selector: `createDisbursement` with no reclaim target.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    createDisbursementPayStringUint64Uint64StringUint64: (params) => {
      return this.appClient.params.call(RewardsParamsFactory.createDisbursementPayStringUint64Uint64StringUint64(params));
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
        * Creates and finalizes a multi-ASA disbursement funded by the `allocations.length + 1`
        transactions immediately before this call: one exact MBR payment from any payer, then one asset
        transfer per allocation from the caller.
    
        The index arguments are kept for ABI compatibility and must equal those positions. Binding
        the funding to the slots directly before the call means no other call in the group (this
        method or any positional transaction argument) can reuse it (C-1).
    
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
         * Makes a call to the Rewards smart contract using the `createInstantDisbursement(pay,uint64,uint64,(address,uint64)[],address)uint64` ABI method.
         *
        * Instant ALGO disbursement. The payment must be exactly the disbursement MBR, one allocation
        MBR per entry, and the allocation sum, from any payer (a payer other than the caller adds
        `PayerRecordMBR` and gets the storage back; the reward amounts stay the caller's). Repeated
        addresses are summed and zero amounts are skipped; the MBR of boxes not created stays as
        withdrawable credit. After `expiration`, anyone may sweep what is unclaimed to
        a non-zero `reclaimTo` (`sweepExpired`).
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    createInstantDisbursementPayUint64Uint64AddressUint64AddressUint64: (params) => {
      return this.appClient.params.call(RewardsParamsFactory.createInstantDisbursementPayUint64Uint64AddressUint64AddressUint64(params));
    },
    /**
         * Makes a call to the Rewards smart contract using the `createInstantDisbursement(pay,uint64,uint64,(address,uint64)[])uint64` ABI method.
         *
        * The pre-reclaim-target selector: `createInstantDisbursement` with no reclaim target. It charges the
        v2 disbursement MBR, so deployed callers that pay the v1 amount revert.
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    createInstantDisbursementPayUint64Uint64AddressUint64Uint64: (params) => {
      return this.appClient.params.call(RewardsParamsFactory.createInstantDisbursementPayUint64Uint64AddressUint64Uint64(params));
    },
    /**
     * Makes a call to the Rewards smart contract using the `createInstantAsaDisbursement(pay,axfer,uint64,uint64,(address,uint64)[],address)uint64` ABI method.
     *
     * Instant ASA disbursement; same rules as `createInstantDisbursement`, with the sum sent as `assetXfer`.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    createInstantAsaDisbursementPayAxferUint64Uint64AddressUint64AddressUint64: (params) => {
      return this.appClient.params.call(RewardsParamsFactory.createInstantAsaDisbursementPayAxferUint64Uint64AddressUint64AddressUint64(params));
    },
    /**
     * Makes a call to the Rewards smart contract using the `createInstantAsaDisbursement(pay,axfer,uint64,uint64,(address,uint64)[])uint64` ABI method.
     *
     * The pre-reclaim-target selector: `createInstantAsaDisbursement` with no reclaim target, at the v2 MBR.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    createInstantAsaDisbursementPayAxferUint64Uint64AddressUint64Uint64: (params) => {
      return this.appClient.params.call(RewardsParamsFactory.createInstantAsaDisbursementPayAxferUint64Uint64AddressUint64Uint64(params));
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
         * Makes a call to the Rewards smart contract using the `sweepExpired(uint64,(address,uint64)[])void` ABI method.
         *
        * Permissionless sweep of an expired disbursement that has a reclaim target. Each listed
        allocation that still exists is deleted and its amount and box MBR go to the reclaim target
        (allocations already claimed or swept are skipped). Once no allocations remain, the
        disbursement box is deleted and its MBR and the remaining MBR credits go there too. The
        creator's own `reclaimRewards` is unchanged.
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    sweepExpired: (params) => {
      return this.appClient.params.call(RewardsParamsFactory.sweepExpired(params));
    },
    /**
         * Makes a call to the Rewards smart contract using the `closeDisbursement(uint64)void` ABI method.
         *
        * Deletes a disbursement with no outstanding allocations (never-used drafts, or finalized
        disbursements fully claimed/reclaimed) and refunds its box MBR and any remaining MBR credits to
        whoever funded it (the creator, unless someone else paid).
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    closeDisbursement: (params) => {
      return this.appClient.params.call(RewardsParamsFactory.closeDisbursement(params));
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
         * Makes a call to the Rewards smart contract using the `createDisbursement(pay,string,uint64,uint64,string,address)uint64` ABI method.
         *
        * Opens a draft disbursement; allocations follow in batches, then `finalizeDisbursement`. After
        `expiration`, anyone may sweep what is unclaimed to a non-zero `reclaimTo` (`sweepExpired`).
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    createDisbursementPayStringUint64Uint64StringAddressUint64: (params) => {
      return this.appClient.createTransaction.call(RewardsParamsFactory.createDisbursementPayStringUint64Uint64StringAddressUint64(params));
    },
    /**
     * Makes a call to the Rewards smart contract using the `createDisbursement(pay,string,uint64,uint64,string)uint64` ABI method.
     *
     * The pre-reclaim-target selector: `createDisbursement` with no reclaim target.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    createDisbursementPayStringUint64Uint64StringUint64: (params) => {
      return this.appClient.createTransaction.call(RewardsParamsFactory.createDisbursementPayStringUint64Uint64StringUint64(params));
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
        * Creates and finalizes a multi-ASA disbursement funded by the `allocations.length + 1`
        transactions immediately before this call: one exact MBR payment from any payer, then one asset
        transfer per allocation from the caller.
    
        The index arguments are kept for ABI compatibility and must equal those positions. Binding
        the funding to the slots directly before the call means no other call in the group (this
        method or any positional transaction argument) can reuse it (C-1).
    
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
         * Makes a call to the Rewards smart contract using the `createInstantDisbursement(pay,uint64,uint64,(address,uint64)[],address)uint64` ABI method.
         *
        * Instant ALGO disbursement. The payment must be exactly the disbursement MBR, one allocation
        MBR per entry, and the allocation sum, from any payer (a payer other than the caller adds
        `PayerRecordMBR` and gets the storage back; the reward amounts stay the caller's). Repeated
        addresses are summed and zero amounts are skipped; the MBR of boxes not created stays as
        withdrawable credit. After `expiration`, anyone may sweep what is unclaimed to
        a non-zero `reclaimTo` (`sweepExpired`).
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    createInstantDisbursementPayUint64Uint64AddressUint64AddressUint64: (params) => {
      return this.appClient.createTransaction.call(RewardsParamsFactory.createInstantDisbursementPayUint64Uint64AddressUint64AddressUint64(params));
    },
    /**
         * Makes a call to the Rewards smart contract using the `createInstantDisbursement(pay,uint64,uint64,(address,uint64)[])uint64` ABI method.
         *
        * The pre-reclaim-target selector: `createInstantDisbursement` with no reclaim target. It charges the
        v2 disbursement MBR, so deployed callers that pay the v1 amount revert.
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    createInstantDisbursementPayUint64Uint64AddressUint64Uint64: (params) => {
      return this.appClient.createTransaction.call(RewardsParamsFactory.createInstantDisbursementPayUint64Uint64AddressUint64Uint64(params));
    },
    /**
     * Makes a call to the Rewards smart contract using the `createInstantAsaDisbursement(pay,axfer,uint64,uint64,(address,uint64)[],address)uint64` ABI method.
     *
     * Instant ASA disbursement; same rules as `createInstantDisbursement`, with the sum sent as `assetXfer`.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    createInstantAsaDisbursementPayAxferUint64Uint64AddressUint64AddressUint64: (params) => {
      return this.appClient.createTransaction.call(RewardsParamsFactory.createInstantAsaDisbursementPayAxferUint64Uint64AddressUint64AddressUint64(params));
    },
    /**
     * Makes a call to the Rewards smart contract using the `createInstantAsaDisbursement(pay,axfer,uint64,uint64,(address,uint64)[])uint64` ABI method.
     *
     * The pre-reclaim-target selector: `createInstantAsaDisbursement` with no reclaim target, at the v2 MBR.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    createInstantAsaDisbursementPayAxferUint64Uint64AddressUint64Uint64: (params) => {
      return this.appClient.createTransaction.call(RewardsParamsFactory.createInstantAsaDisbursementPayAxferUint64Uint64AddressUint64Uint64(params));
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
         * Makes a call to the Rewards smart contract using the `sweepExpired(uint64,(address,uint64)[])void` ABI method.
         *
        * Permissionless sweep of an expired disbursement that has a reclaim target. Each listed
        allocation that still exists is deleted and its amount and box MBR go to the reclaim target
        (allocations already claimed or swept are skipped). Once no allocations remain, the
        disbursement box is deleted and its MBR and the remaining MBR credits go there too. The
        creator's own `reclaimRewards` is unchanged.
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    sweepExpired: (params) => {
      return this.appClient.createTransaction.call(RewardsParamsFactory.sweepExpired(params));
    },
    /**
         * Makes a call to the Rewards smart contract using the `closeDisbursement(uint64)void` ABI method.
         *
        * Deletes a disbursement with no outstanding allocations (never-used drafts, or finalized
        disbursements fully claimed/reclaimed) and refunds its box MBR and any remaining MBR credits to
        whoever funded it (the creator, unless someone else paid).
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    closeDisbursement: (params) => {
      return this.appClient.createTransaction.call(RewardsParamsFactory.closeDisbursement(params));
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
         * Makes a call to the Rewards smart contract using the `createDisbursement(pay,string,uint64,uint64,string,address)uint64` ABI method.
         *
        * Opens a draft disbursement; allocations follow in batches, then `finalizeDisbursement`. After
        `expiration`, anyone may sweep what is unclaimed to a non-zero `reclaimTo` (`sweepExpired`).
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    createDisbursementPayStringUint64Uint64StringAddressUint64: async (params) => {
      const result = await this.appClient.send.call(RewardsParamsFactory.createDisbursementPayStringUint64Uint64StringAddressUint64(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Rewards smart contract using the `createDisbursement(pay,string,uint64,uint64,string)uint64` ABI method.
     *
     * The pre-reclaim-target selector: `createDisbursement` with no reclaim target.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    createDisbursementPayStringUint64Uint64StringUint64: async (params) => {
      const result = await this.appClient.send.call(RewardsParamsFactory.createDisbursementPayStringUint64Uint64StringUint64(params));
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
        * Creates and finalizes a multi-ASA disbursement funded by the `allocations.length + 1`
        transactions immediately before this call: one exact MBR payment from any payer, then one asset
        transfer per allocation from the caller.
    
        The index arguments are kept for ABI compatibility and must equal those positions. Binding
        the funding to the slots directly before the call means no other call in the group (this
        method or any positional transaction argument) can reuse it (C-1).
    
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
         * Makes a call to the Rewards smart contract using the `createInstantDisbursement(pay,uint64,uint64,(address,uint64)[],address)uint64` ABI method.
         *
        * Instant ALGO disbursement. The payment must be exactly the disbursement MBR, one allocation
        MBR per entry, and the allocation sum, from any payer (a payer other than the caller adds
        `PayerRecordMBR` and gets the storage back; the reward amounts stay the caller's). Repeated
        addresses are summed and zero amounts are skipped; the MBR of boxes not created stays as
        withdrawable credit. After `expiration`, anyone may sweep what is unclaimed to
        a non-zero `reclaimTo` (`sweepExpired`).
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    createInstantDisbursementPayUint64Uint64AddressUint64AddressUint64: async (params) => {
      const result = await this.appClient.send.call(RewardsParamsFactory.createInstantDisbursementPayUint64Uint64AddressUint64AddressUint64(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the Rewards smart contract using the `createInstantDisbursement(pay,uint64,uint64,(address,uint64)[])uint64` ABI method.
         *
        * The pre-reclaim-target selector: `createInstantDisbursement` with no reclaim target. It charges the
        v2 disbursement MBR, so deployed callers that pay the v1 amount revert.
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    createInstantDisbursementPayUint64Uint64AddressUint64Uint64: async (params) => {
      const result = await this.appClient.send.call(RewardsParamsFactory.createInstantDisbursementPayUint64Uint64AddressUint64Uint64(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Rewards smart contract using the `createInstantAsaDisbursement(pay,axfer,uint64,uint64,(address,uint64)[],address)uint64` ABI method.
     *
     * Instant ASA disbursement; same rules as `createInstantDisbursement`, with the sum sent as `assetXfer`.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    createInstantAsaDisbursementPayAxferUint64Uint64AddressUint64AddressUint64: async (params) => {
      const result = await this.appClient.send.call(RewardsParamsFactory.createInstantAsaDisbursementPayAxferUint64Uint64AddressUint64AddressUint64(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Rewards smart contract using the `createInstantAsaDisbursement(pay,axfer,uint64,uint64,(address,uint64)[])uint64` ABI method.
     *
     * The pre-reclaim-target selector: `createInstantAsaDisbursement` with no reclaim target, at the v2 MBR.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    createInstantAsaDisbursementPayAxferUint64Uint64AddressUint64Uint64: async (params) => {
      const result = await this.appClient.send.call(RewardsParamsFactory.createInstantAsaDisbursementPayAxferUint64Uint64AddressUint64Uint64(params));
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
         * Makes a call to the Rewards smart contract using the `sweepExpired(uint64,(address,uint64)[])void` ABI method.
         *
        * Permissionless sweep of an expired disbursement that has a reclaim target. Each listed
        allocation that still exists is deleted and its amount and box MBR go to the reclaim target
        (allocations already claimed or swept are skipped). Once no allocations remain, the
        disbursement box is deleted and its MBR and the remaining MBR credits go there too. The
        creator's own `reclaimRewards` is unchanged.
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    sweepExpired: async (params) => {
      const result = await this.appClient.send.call(RewardsParamsFactory.sweepExpired(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the Rewards smart contract using the `closeDisbursement(uint64)void` ABI method.
         *
        * Deletes a disbursement with no outstanding allocations (never-used drafts, or finalized
        disbursements fully claimed/reclaimed) and refunds its box MBR and any remaining MBR credits to
        whoever funded it (the creator, unless someone else paid).
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    closeDisbursement: async (params) => {
      const result = await this.appClient.send.call(RewardsParamsFactory.closeDisbursement(params));
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
   * @param params The params to use for the the cloned app client. Omit a param to keep the original value. Set a param to override the original value. Setting to undefined will clear the original value.
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
  newGroup() {
    const client = this;
    const composer = this.algorand.newGroup();
    let promiseChain = Promise.resolve();
    const resultMappers = [];
    return {
      /**
       * Add a fundMbrCredits(uint64,pay)void method call against the Rewards contract
       */
      fundMbrCredits(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.fundMbrCredits(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a withdrawMbrCredits(uint64,uint64)void method call against the Rewards contract
       */
      withdrawMbrCredits(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.withdrawMbrCredits(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a createDisbursement(pay,string,uint64,uint64,string,address)uint64 method call against the Rewards contract
       */
      createDisbursementPayStringUint64Uint64StringAddressUint64(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.createDisbursementPayStringUint64Uint64StringAddressUint64(params)));
        resultMappers.push((v) => client.decodeReturnValue("createDisbursement(pay,string,uint64,uint64,string,address)uint64", v));
        return this;
      },
      /**
       * Add a createDisbursement(pay,string,uint64,uint64,string)uint64 method call against the Rewards contract
       */
      createDisbursementPayStringUint64Uint64StringUint64(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.createDisbursementPayStringUint64Uint64StringUint64(params)));
        resultMappers.push((v) => client.decodeReturnValue("createDisbursement(pay,string,uint64,uint64,string)uint64", v));
        return this;
      },
      /**
       * Add a editDisbursement(uint64,string,uint64,uint64,string)void method call against the Rewards contract
       */
      editDisbursement(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.editDisbursement(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a createUserAllocations(pay,uint64,(address,uint64)[])void method call against the Rewards contract
       */
      createUserAllocations(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.createUserAllocations(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a createAsaUserAllocations(axfer,uint64,(address,uint64)[])void method call against the Rewards contract
       */
      createAsaUserAllocations(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.createAsaUserAllocations(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a createAsaDisbursementFromGroup(uint64,uint64,string,uint64,uint64,string,(address,uint64)[])uint64 method call against the Rewards contract
       */
      createAsaDisbursementFromGroup(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.createAsaDisbursementFromGroup(params)));
        resultMappers.push((v) => client.decodeReturnValue("createAsaDisbursementFromGroup(uint64,uint64,string,uint64,uint64,string,(address,uint64)[])uint64", v));
        return this;
      },
      /**
       * Add a finalizeDisbursement(uint64)void method call against the Rewards contract
       */
      finalizeDisbursement(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.finalizeDisbursement(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a createInstantDisbursement(pay,uint64,uint64,(address,uint64)[],address)uint64 method call against the Rewards contract
       */
      createInstantDisbursementPayUint64Uint64AddressUint64AddressUint64(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.createInstantDisbursementPayUint64Uint64AddressUint64AddressUint64(params)));
        resultMappers.push((v) => client.decodeReturnValue("createInstantDisbursement(pay,uint64,uint64,(address,uint64)[],address)uint64", v));
        return this;
      },
      /**
       * Add a createInstantDisbursement(pay,uint64,uint64,(address,uint64)[])uint64 method call against the Rewards contract
       */
      createInstantDisbursementPayUint64Uint64AddressUint64Uint64(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.createInstantDisbursementPayUint64Uint64AddressUint64Uint64(params)));
        resultMappers.push((v) => client.decodeReturnValue("createInstantDisbursement(pay,uint64,uint64,(address,uint64)[])uint64", v));
        return this;
      },
      /**
       * Add a createInstantAsaDisbursement(pay,axfer,uint64,uint64,(address,uint64)[],address)uint64 method call against the Rewards contract
       */
      createInstantAsaDisbursementPayAxferUint64Uint64AddressUint64AddressUint64(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.createInstantAsaDisbursementPayAxferUint64Uint64AddressUint64AddressUint64(params)));
        resultMappers.push((v) => client.decodeReturnValue("createInstantAsaDisbursement(pay,axfer,uint64,uint64,(address,uint64)[],address)uint64", v));
        return this;
      },
      /**
       * Add a createInstantAsaDisbursement(pay,axfer,uint64,uint64,(address,uint64)[])uint64 method call against the Rewards contract
       */
      createInstantAsaDisbursementPayAxferUint64Uint64AddressUint64Uint64(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.createInstantAsaDisbursementPayAxferUint64Uint64AddressUint64Uint64(params)));
        resultMappers.push((v) => client.decodeReturnValue("createInstantAsaDisbursement(pay,axfer,uint64,uint64,(address,uint64)[])uint64", v));
        return this;
      },
      /**
       * Add a claimRewards((uint64,uint64)[])void method call against the Rewards contract
       */
      claimRewards(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.claimRewards(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a reclaimRewards(uint64,(address,uint64)[])void method call against the Rewards contract
       */
      reclaimRewards(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.reclaimRewards(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a sweepExpired(uint64,(address,uint64)[])void method call against the Rewards contract
       */
      sweepExpired(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.sweepExpired(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a closeDisbursement(uint64)void method call against the Rewards contract
       */
      closeDisbursement(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.closeDisbursement(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a allocationMbrCreditShortfall(uint64,uint64)uint64 method call against the Rewards contract
       */
      allocationMbrCreditShortfall(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.allocationMbrCreditShortfall(params)));
        resultMappers.push((v) => client.decodeReturnValue("allocationMbrCreditShortfall(uint64,uint64)uint64", v));
        return this;
      },
      /**
       * Add a updateAkitaDAO(uint64)void method call against the Rewards contract
       */
      updateAkitaDao(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateAkitaDao(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a opUp()void method call against the Rewards contract
       */
      opUp(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.opUp(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a mbr(string,string)(uint64,uint64) method call against the Rewards contract
       */
      mbr(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.mbr(params)));
        resultMappers.push((v) => client.decodeReturnValue("mbr(string,string)(uint64,uint64)", v));
        return this;
      },
      /**
       * Add a optIn(pay,uint64)void method call against the Rewards contract
       */
      optIn(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.optIn(params)));
        resultMappers.push(void 0);
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

// src/rewards/errors.ts
var REWARDS_ERROR_MESSAGES = withErrorCodeAliases({
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
  IMBR: "Invalid MBR amount",
  // --- Rewards v2 (2026-10 audit) -----------------------------------------
  DBNL: "Disbursement is not finalized",
  DBNY: "Disbursement still has allocations",
  IGIX: "Funding transactions must immediately precede the call",
  ICTO: "Asset transfer may only close out to the rewards app",
  DBNS: "Disbursement has no reclaim target to sweep to",
  RCOI: "Reclaim target is not opted into the asset",
  // --- RewardsPlugin (STAKE-4) --------------------------------------------
  RWAP: "Not the current or the legacy Rewards app"
});
var translateRewardsError = makeErrorTranslator(REWARDS_ERROR_MESSAGES);

// src/rewards/index.ts
var MAX_ALGORAND_GROUP_SIZE = 16;
var DISBURSEMENT_BOX_PREFIX = 100;
var USER_ALLOCATION_BOX_PREFIX = 117;
var USER_ALLOCATION_BOX_NAME_LENGTH = 49;
var MIN_DISBURSEMENTS_MBR = 54500n;
var USER_ALLOCATION_MBR = 25300n;
var DISBURSEMENT_V2 = ABIType.from("(address,bool,string,uint64,uint64,uint64,uint64,uint64,uint64,address,string)");
var DISBURSEMENT_V1 = ABIType.from("(address,bool,string,uint64,uint64,uint64,uint64,uint64,uint64,uint64,string)");
var DISBURSEMENT_V1_HEAD_SIZE = 93;
function decodeDisbursementDetails(value) {
  const titleOffset = value[33] << 8 | value[34];
  const v1 = titleOffset === DISBURSEMENT_V1_HEAD_SIZE;
  const fields = (v1 ? DISBURSEMENT_V1 : DISBURSEMENT_V2).decode(value);
  const address = (field) => field instanceof Address ? field.toString() : String(field);
  return {
    creator: address(fields[0]),
    finalized: fields[1],
    title: fields[2],
    amount: fields[3],
    timeToUnlock: fields[4],
    expiration: fields[5],
    allocations: fields[6],
    distributed: fields[7],
    mbrCredits: fields[8],
    reclaimTo: v1 ? ALGORAND_ZERO_ADDRESS_STRING : address(fields[9]),
    note: fields[10]
  };
}
function disbursementBoxName(id) {
  const name = new Uint8Array(9);
  name[0] = DISBURSEMENT_BOX_PREFIX;
  new DataView(name.buffer).setBigUint64(1, BigInt(id));
  return name;
}
function allocationKeysOf(names, id) {
  return names.flatMap((name) => {
    if (name.length !== USER_ALLOCATION_BOX_NAME_LENGTH || name[0] !== USER_ALLOCATION_BOX_PREFIX) return [];
    const view = new DataView(name.buffer, name.byteOffset, name.byteLength);
    if (view.getBigUint64(41) !== id) return [];
    return [{ name, address: new Address(name.slice(1, 33)).toString(), asset: view.getBigUint64(33) }];
  });
}
function isSweepable(disbursement, now) {
  return disbursement.reclaimTo !== ALGORAND_ZERO_ADDRESS_STRING && disbursement.expiration !== 0n && disbursement.expiration < now;
}
var CREATE_ASA_DISBURSEMENT_FROM_GROUP = ABIMethod.fromSignature(
  "createAsaDisbursementFromGroup(uint64,uint64,string,uint64,uint64,string,(address,uint64)[])uint64"
);
async function getDisbursementsAcrossDeployments(clients, { currentAppId } = {}) {
  if (new Set(clients.map((client) => client.network)).size > 1) throw new Error("Rewards clients must use the same network");
  const unique = new Map(clients.map((client) => [client.appId, client]));
  if ([...unique.keys()].some((id) => id <= 0n)) throw new Error("Rewards deployment IDs must be positive");
  return Promise.all([...unique.values()].map(async (client) => ({
    appId: client.appId,
    client,
    /** Wallet claims from this deployment go through `RewardsPluginSDK.claimLegacyRewards` (see `claimRewardsFrom`). */
    legacy: currentAppId !== void 0 && client.appId !== currentAppId,
    disbursements: await client.getDisbursements()
  })));
}
var RewardsSDK = class extends BaseSDK {
  constructor(params) {
    super({ factory: RewardsFactory, ...params }, ENV_VAR_NAMES.REWARDS_APP_ID);
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
    let value;
    try {
      value = await this.algorand.app.getBoxValue(this.appId, disbursementBoxName(id));
    } catch {
      throw new Error(`Disbursement ${id} not found`);
    }
    return decodeDisbursementDetails(value);
  }
  /**
   * Gets all disbursements as a map.
   */
  async getDisbursements() {
    const names = (await this.algorand.app.getBoxNames(this.appId)).map((box) => box.nameRaw).filter((name) => name.length === 9 && name[0] === DISBURSEMENT_BOX_PREFIX);
    const values = await this.algorand.app.getBoxValues(this.appId, names);
    return new Map(names.map((name, i) => [
      new DataView(name.buffer, name.byteOffset, name.byteLength).getBigUint64(1),
      decodeDisbursementDetails(values[i])
    ]));
  }
  /** The reclaim target of disbursement `id`, or undefined when it has none (v1, or created without one). */
  async getReclaimTarget({ id }) {
    const { reclaimTo } = await this.getDisbursement({ id });
    return reclaimTo === ALGORAND_ZERO_ADDRESS_STRING ? void 0 : reclaimTo;
  }
  /** The open allocations of disbursement `id`: what `sweepExpired` (or `reclaimRewards`) would move. */
  async getSweepableAllocations({ id }) {
    const names = (await this.algorand.app.getBoxNames(this.appId)).map((box) => box.nameRaw);
    const keys = allocationKeysOf(names, BigInt(id));
    if (keys.length === 0) return [];
    const values = await this.algorand.app.getBoxValues(this.appId, keys.map((key) => key.name));
    return keys.map((key, i) => ({
      address: key.address,
      asset: key.asset,
      amount: new DataView(values[i].buffer, values[i].byteOffset, values[i].byteLength).getBigUint64(0)
    }));
  }
  /**
   * IDs of the disbursements anyone may sweep now (reclaim target set, expired at the latest block).
   * A keeper calls `sweepExpired` for each.
   */
  async getSweepableDisbursementIds() {
    const status = await this.algorand.client.algod.status().do();
    const block = await this.algorand.client.algod.block(status.lastRound).do();
    const now = BigInt(block.block.header.timestamp);
    return [...await this.getDisbursements()].filter(([, disbursement]) => isSweepable(disbursement, now)).map(([id]) => id);
  }
  /**
     * Gets a user's allocation for a specific disbursement and asset.
  
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
      extraFee: microAlgo(1e3),
      args: {
        payment,
        asset
      }
    });
  }
  /**
   * Creates a draft disbursement; add allocations in batches, then finalize it.
   * With `reclaimTo` (v2 only), anyone can sweep what is unclaimed at `expiration` to that address.
   * Returns the disbursement ID.
   */
  async createDisbursement({
    sender,
    signer,
    title,
    timeToUnlock,
    expiration,
    note,
    mbrCredits = 0n,
    reclaimTo
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const mbrData = await this.mbr({ title, note });
    const mbrPayment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: microAlgo(mbrData.disbursements + BigInt(mbrCredits)),
      receiver: this.client.appAddress
    });
    const args = { mbrPayment, title, timeToUnlock, expiration, note };
    const { return: disbursementId } = reclaimTo === void 0 ? await this.client.send.createDisbursementPayStringUint64Uint64StringUint64({ ...sendParams, args }) : await this.client.send.createDisbursementPayStringUint64Uint64StringAddressUint64({
      ...sendParams,
      args: { ...args, reclaimTo }
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
   * Deletes a disbursement with no outstanding allocations and refunds its box MBR plus any
   * remaining MBR credits to the creator.
   */
  async closeDisbursement({ sender, signer, id }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    await this.client.send.closeDisbursement({
      ...sendParams,
      extraFee: microAlgo(1e3),
      args: { id }
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
   * With `reclaimTo` (v2 only), anyone can sweep what is unclaimed at `expiration` to that address.
   * Returns the disbursement ID.
   */
  async createInstantDisbursement({
    sender,
    signer,
    timeToUnlock,
    expiration,
    allocations,
    reclaimTo
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const mbrAmount = this.instantMbr(allocations.length);
    const totalAmount = this.sumAllocations(allocations);
    const mbrPayment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: microAlgo(mbrAmount + totalAmount),
      receiver: this.client.appAddress
    });
    const formatted = this.formatAllocations(allocations);
    const { return: disbursementId } = reclaimTo === void 0 ? await this.client.send.createInstantDisbursementPayUint64Uint64AddressUint64Uint64({
      ...sendParams,
      args: { mbrPayment, timeToUnlock, expiration, allocations: formatted }
    }) : await this.client.send.createInstantDisbursementPayUint64Uint64AddressUint64AddressUint64({
      ...sendParams,
      args: { mbrPayment, timeToUnlock, expiration, allocations: formatted, reclaimTo }
    });
    if (disbursementId === void 0) {
      throw new Error("Failed to create instant disbursement");
    }
    return disbursementId;
  }
  /**
   * Creates and finalizes an ASA disbursement in a single call.
   * With `reclaimTo` (v2 only), anyone can sweep what is unclaimed at `expiration` to that address.
   * Returns the disbursement ID.
   */
  async createInstantAsaDisbursement({
    sender,
    signer,
    timeToUnlock,
    expiration,
    asset,
    allocations,
    reclaimTo
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const mbrAmount = this.instantMbr(allocations.length);
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
    const formatted = this.formatAllocations(allocations);
    const { return: disbursementId } = reclaimTo === void 0 ? await this.client.send.createInstantAsaDisbursementPayAxferUint64Uint64AddressUint64Uint64({
      ...sendParams,
      args: { mbrPayment, assetXfer, timeToUnlock, expiration, allocations: formatted }
    }) : await this.client.send.createInstantAsaDisbursementPayAxferUint64Uint64AddressUint64AddressUint64({
      ...sendParams,
      args: { mbrPayment, assetXfer, timeToUnlock, expiration, allocations: formatted, reclaimTo }
    });
    if (disbursementId === void 0) {
      throw new Error("Failed to create instant ASA disbursement");
    }
    return disbursementId;
  }
  /** Exact MBR an instant disbursement charges: the disbursement box plus one allocation box per entry. */
  instantMbr(allocationCount) {
    return MIN_DISBURSEMENTS_MBR + USER_ALLOCATION_MBR * BigInt(allocationCount);
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
      extraFee: microAlgo(1e3 * rewards.length),
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
      extraFee: microAlgo(1e3 * reclaims.length),
      args: {
        id,
        reclaims: formattedReclaims
      }
    });
  }
  /**
   * Permissionless: after expiration, sends the listed allocations (default: every open one) and the
   * freed MBR to the disbursement's reclaim target, and closes the disbursement once it is empty.
   * The reclaim target must be opted into every swept ASA.
   */
  async sweepExpired({ sender, signer, id, reclaims }) {
    const sendParams = this.getSendParams({ sender, signer });
    const targets = reclaims ?? await this.getSweepableAllocations({ id });
    await this.client.send.sweepExpired({
      ...sendParams,
      // one ASA transfer per ASA allocation and at most two payments (ALGO amounts and freed MBR to the
      // reclaim target, freed MBR to a payer other than the creator)
      extraFee: microAlgo(1e3 * (targets.filter((r) => BigInt(r.asset) !== 0n).length + 2)),
      args: {
        id,
        reclaims: targets.map((r) => [r.address, r.asset])
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

export {
  REWARDS_ERROR_MESSAGES,
  translateRewardsError,
  MIN_DISBURSEMENTS_MBR,
  USER_ALLOCATION_MBR,
  decodeDisbursementDetails,
  allocationKeysOf,
  isSweepable,
  getDisbursementsAcrossDeployments,
  RewardsSDK
};
//# sourceMappingURL=chunk-SQVRDL76.mjs.map
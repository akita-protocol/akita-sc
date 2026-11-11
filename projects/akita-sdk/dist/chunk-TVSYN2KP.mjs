import {
  makeErrorTranslator,
  withErrorCodeAliases
} from "./chunk-74RCU6FN.mjs";
import {
  BaseSDK
} from "./chunk-6GNFHGHN.mjs";
import {
  ENV_VAR_NAMES
} from "./chunk-4QUVIZBD.mjs";

// src/rewards/index.ts
import { microAlgo } from "@algorandfoundation/algokit-utils";
import { ABIMethod, ABIType, Address, ALGORAND_ZERO_ADDRESS_STRING } from "algosdk";

// src/generated/RewardsClient.ts
import { getArc56ReturnValue, getABIStructFromABITuple } from "@algorandfoundation/algokit-utils/types/app-arc56";
import {
  AppClient as _AppClient
} from "@algorandfoundation/algokit-utils/types/app-client";
import { AppFactory as _AppFactory } from "@algorandfoundation/algokit-utils/types/app-factory";
var APP_SPEC = { "name": "Rewards", "structs": { "DisbursementDetails": [{ "name": "creator", "type": "address" }, { "name": "finalized", "type": "bool" }, { "name": "title", "type": "string" }, { "name": "amount", "type": "uint64" }, { "name": "timeToUnlock", "type": "uint64" }, { "name": "expiration", "type": "uint64" }, { "name": "allocations", "type": "uint64" }, { "name": "distributed", "type": "uint64" }, { "name": "mbrCredits", "type": "uint64" }, { "name": "reclaimTo", "type": "address" }, { "name": "note", "type": "string" }], "RewardsMBRData": [{ "name": "disbursements", "type": "uint64" }, { "name": "userAllocations", "type": "uint64" }], "UserAllocationsKey": [{ "name": "address", "type": "address" }, { "name": "asset", "type": "uint64" }, { "name": "disbursementId", "type": "uint64" }] }, "methods": [{ "name": "create", "args": [{ "type": "string", "name": "version" }, { "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "fundMbrCredits", "args": [{ "type": "uint64", "name": "id" }, { "type": "pay", "name": "payment" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "withdrawMbrCredits", "args": [{ "type": "uint64", "name": "id" }, { "type": "uint64", "name": "amount" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "createDisbursement", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "string", "name": "title" }, { "type": "uint64", "name": "timeToUnlock" }, { "type": "uint64", "name": "expiration" }, { "type": "string", "name": "note" }, { "type": "address", "name": "reclaimTo" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Opens a draft disbursement; allocations follow in batches, then `finalizeDisbursement`. After\n`expiration`, anyone may sweep what is unclaimed to a non-zero `reclaimTo` (`sweepExpired`).", "events": [], "recommendations": {} }, { "name": "createDisbursement", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "string", "name": "title" }, { "type": "uint64", "name": "timeToUnlock" }, { "type": "uint64", "name": "expiration" }, { "type": "string", "name": "note" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "The pre-reclaim-target selector: `createDisbursement` with no reclaim target.", "events": [], "recommendations": {} }, { "name": "editDisbursement", "args": [{ "type": "uint64", "name": "id" }, { "type": "string", "name": "title" }, { "type": "uint64", "name": "timeToUnlock" }, { "type": "uint64", "name": "expiration" }, { "type": "string", "name": "note" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "createUserAllocations", "args": [{ "type": "pay", "name": "payment" }, { "type": "uint64", "name": "id" }, { "type": "(address,uint64)[]", "name": "allocations" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "createAsaUserAllocations", "args": [{ "type": "axfer", "name": "assetXfer" }, { "type": "uint64", "name": "id" }, { "type": "(address,uint64)[]", "name": "allocations" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "createAsaDisbursementFromGroup", "args": [{ "type": "uint64", "name": "mbrPaymentIndex" }, { "type": "uint64", "name": "assetTransferStartIndex" }, { "type": "string", "name": "title" }, { "type": "uint64", "name": "timeToUnlock" }, { "type": "uint64", "name": "expiration" }, { "type": "string", "name": "note" }, { "type": "(address,uint64)[]", "name": "allocations" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Creates and finalizes a multi-ASA disbursement funded by the `allocations.length + 1`\ntransactions immediately before this call: one exact MBR payment, then one asset transfer\nper allocation, all from the caller.\n\nThe index arguments are kept for ABI compatibility and must equal those positions. Binding\nthe funding to the slots directly before the call means no other call in the group (this\nmethod or any positional transaction argument) can reuse it (C-1).", "events": [], "recommendations": {} }, { "name": "finalizeDisbursement", "args": [{ "type": "uint64", "name": "id" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "createInstantDisbursement", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "uint64", "name": "timeToUnlock" }, { "type": "uint64", "name": "expiration" }, { "type": "(address,uint64)[]", "name": "allocations" }, { "type": "address", "name": "reclaimTo" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Instant ALGO disbursement. The payment must be exactly the disbursement MBR, one allocation\nMBR per entry, and the allocation sum, from the caller. Repeated addresses are summed and zero amounts are skipped; the MBR of boxes not created\nstays as creator-withdrawable credit. After `expiration`, anyone may sweep what is unclaimed to\na non-zero `reclaimTo` (`sweepExpired`).", "events": [], "recommendations": {} }, { "name": "createInstantDisbursement", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "uint64", "name": "timeToUnlock" }, { "type": "uint64", "name": "expiration" }, { "type": "(address,uint64)[]", "name": "allocations" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "The pre-reclaim-target selector: `createInstantDisbursement` with no reclaim target. It charges the\nv2 disbursement MBR, so deployed callers that pay the v1 amount revert.", "events": [], "recommendations": {} }, { "name": "createInstantAsaDisbursement", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "uint64", "name": "timeToUnlock" }, { "type": "uint64", "name": "expiration" }, { "type": "(address,uint64)[]", "name": "allocations" }, { "type": "address", "name": "reclaimTo" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Instant ASA disbursement; same rules as `createInstantDisbursement`, with the sum sent as `assetXfer`.", "events": [], "recommendations": {} }, { "name": "createInstantAsaDisbursement", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "uint64", "name": "timeToUnlock" }, { "type": "uint64", "name": "expiration" }, { "type": "(address,uint64)[]", "name": "allocations" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "The pre-reclaim-target selector: `createInstantAsaDisbursement` with no reclaim target, at the v2 MBR.", "events": [], "recommendations": {} }, { "name": "claimRewards", "args": [{ "type": "(uint64,uint64)[]", "name": "rewards" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "reclaimRewards", "args": [{ "type": "uint64", "name": "id" }, { "type": "(address,uint64)[]", "name": "reclaims" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "sweepExpired", "args": [{ "type": "uint64", "name": "id" }, { "type": "(address,uint64)[]", "name": "reclaims" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Permissionless sweep of an expired disbursement that has a reclaim target. Each listed\nallocation that still exists is deleted and its amount and box MBR go to the reclaim target\n(allocations already claimed or swept are skipped). Once no allocations remain, the\ndisbursement box is deleted and its MBR and the remaining MBR credits go there too. The\ncreator's own `reclaimRewards` is unchanged.", "events": [], "recommendations": {} }, { "name": "closeDisbursement", "args": [{ "type": "uint64", "name": "id" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Deletes a disbursement with no outstanding allocations (never-used drafts, or finalized\ndisbursements fully claimed/reclaimed) and refunds its box MBR and any remaining MBR credits to\nthe creator.", "events": [], "recommendations": {} }, { "name": "allocationMbrCreditShortfall", "args": [{ "type": "uint64", "name": "id" }, { "type": "uint64", "name": "allocationCount" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "mbr", "args": [{ "type": "string", "name": "title" }, { "type": "string", "name": "note" }], "returns": { "type": "(uint64,uint64)", "struct": "RewardsMBRData" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "optIn", "args": [{ "type": "pay", "name": "payment", "desc": "The payment transaction" }, { "type": "uint64", "name": "asset", "desc": "The asset to be opted into" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "optin tells the contract to opt into an asa", "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 2, "bytes": 1 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "disbursementID": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "ZGlzYnVyc2VtZW50X2lk", "desc": "the disbursement id cursor" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" } }, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": { "disbursements": { "keyType": "uint64", "valueType": "DisbursementDetails", "desc": "the disbursement map of tokens\n\nthe key is the uint64 id of the disbursement\nthe value is the details of the disbursement", "prefix": "ZA==" }, "userAllocations": { "keyType": "UserAllocationsKey", "valueType": "uint64", "desc": "the user allocations of disbursements\n\nthe key is the address of the qualified account with the uint64 id of the disbursement\nthe value is the amount they are owed", "prefix": "dQ==" } } } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [1332, 3027, 3303], "errorMessage": "Box must have value" }, { "pc": [3024, 3300], "errorMessage": "ERR:errAlne" }, { "pc": [1256, 1535, 1702, 2352], "errorMessage": "ERR:errDbaf" }, { "pc": [2151, 2230, 2371], "errorMessage": "ERR:errDbem" }, { "pc": [2995], "errorMessage": "ERR:errDbfd" }, { "pc": [2951, 2972], "errorMessage": "ERR:errDblk" }, { "pc": [1893, 2243, 2378, 4519], "errorMessage": "ERR:errDbma" }, { "pc": [777, 860, 1175, 1506, 1673, 2284, 2862, 3183, 3455, 3770, 3863], "errorMessage": "ERR:errDbne" }, { "pc": [2939, 3227, 3510], "errorMessage": "ERR:errDbnl" }, { "pc": [3502], "errorMessage": "ERR:errDbns" }, { "pc": [3248, 3531], "errorMessage": "ERR:errDbnx" }, { "pc": [3813], "errorMessage": "ERR:errDbny" }, { "pc": [697], "errorMessage": "ERR:errIaam" }, { "pc": [647], "errorMessage": "ERR:errIare" }, { "pc": [672], "errorMessage": "ERR:errIast" }, { "pc": [4397], "errorMessage": "ERR:errIcto" }, { "pc": [4171], "errorMessage": "ERR:errIdut" }, { "pc": [4214], "errorMessage": "ERR:errIdxt" }, { "pc": [1905, 1920, 1934], "errorMessage": "ERR:errIgix" }, { "pc": [883, 899, 1313, 4121], "errorMessage": "ERR:errImbr" }, { "pc": [812, 822, 4716, 4731], "errorMessage": "ERR:errIpay" }, { "pc": [551, 4038], "errorMessage": "ERR:errIpma" }, { "pc": [537, 4025], "errorMessage": "ERR:errIpmr" }, { "pc": [484, 569], "errorMessage": "ERR:errIpms" }, { "pc": [4329, 4343, 4357, 4411, 4425], "errorMessage": "ERR:errIxfr" }, { "pc": [498, 608], "errorMessage": "ERR:errNcls" }, { "pc": [594], "errorMessage": "ERR:errNclw" }, { "pc": [3945], "errorMessage": "ERR:errNdao" }, { "pc": [512, 622], "errorMessage": "ERR:errNrky" }, { "pc": [3675], "errorMessage": "ERR:errRcoi" }, { "pc": [790, 874, 1247, 1528, 1695, 2343, 3219, 3795], "errorMessage": "ERR:errYncr" }, { "pc": [3926], "errorMessage": "application exists" }, { "pc": [3913, 4064], "errorMessage": "check GlobalState exists" }, { "pc": [1561, 1734, 2137, 2835, 3269, 3557, 4627], "errorMessage": "index access is out of bounds" }, { "pc": [781, 865, 888, 904, 919, 1181, 1187, 1304, 1320, 1329, 1396, 1402, 1436, 1448, 1511, 1516, 1678, 1683, 2222, 2235, 2255, 2290, 2296, 2306, 2315, 2324, 2332, 2390, 2869, 2877, 2886, 2895, 2904, 3038, 3049, 3054, 3063, 3189, 3199, 3207, 3314, 3325, 3330, 3339, 3461, 3470, 3478, 3594, 3605, 3610, 3619, 3705, 3775, 3784, 3875, 4086, 4095, 4110, 4126, 4135, 4267, 4276, 4301, 4309, 4444], "errorMessage": "index out of bounds" }, { "pc": [704, 951, 985, 1030, 1064, 1107, 1150, 1480, 1647, 1813, 1851, 1872, 2426, 2521, 2620, 2732, 2802, 3156, 3428, 3957, 3973, 4511], "errorMessage": "invalid array length header" }, { "pc": [711, 958, 992, 1037, 1071, 1117, 1157, 1820, 1858, 3964, 3980], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [3168, 3440], "errorMessage": "invalid number of bytes for arc4.dynamic_array<smart_contracts/rewards/types.ts::AllocationReclaimDetails>" }, { "pc": [2814], "errorMessage": "invalid number of bytes for arc4.dynamic_array<smart_contracts/rewards/types.ts::ClaimDetails>" }, { "pc": [1492, 1659, 1886, 2436, 2531, 2630, 2742], "errorMessage": "invalid number of bytes for arc4.dynamic_array<smart_contracts/rewards/types.ts::UserAllocation>" }, { "pc": [1004, 2445, 2639], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [722, 749, 835, 844, 969, 978, 1048, 1057, 1097, 1131, 1141, 1469, 1636, 1797, 1806, 1833, 1843, 2269, 2410, 2419, 2505, 2514, 2604, 2613, 2716, 2725, 3145, 3417, 3754, 3838, 3847, 3905, 4011], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [1628, 2125, 2596, 2708], "errorMessage": "transaction type is axfer" }, { "pc": [763, 945, 1024, 1461, 1964, 2402, 2497, 2585, 2697, 4003], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDggMiAyNTMwMCA1NDUwMCA0MDAKICAgIGJ5dGVjYmxvY2sgImQiICJFUlI6ZXJyRGJuZSIgMHgxNTFmN2M3NSAiRVJSOmVyclluY3IiICJFUlI6ZXJySXhmciIgIkVSUjplcnJJcGF5IiAiRVJSOmVyckltYnIiICJFUlI6ZXJyRGJhZiIgIkVSUjplcnJEYm1hIiAidSIgImRpc2J1cnNlbWVudF9pZCIgImFraXRhX2RhbyIgIkVSUjplcnJJZ2l4IiAiRVJSOmVyckRiZW0iICJFUlI6ZXJyRGJubCIgIkVSUjplcnJJcG1zIiAiRVJSOmVyck5jbHMiICJFUlI6ZXJyTnJreSIgIkVSUjplcnJJcG1yIiAiRVJSOmVycklwbWEiIDB4MDAwMDc1ICJFUlI6ZXJyRGJsayIgIkVSUjplcnJBbG5lIiAiRVJSOmVyckRibngiCiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgYm56IG1haW5fYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjcwCiAgICAvLyBkaXNidXJzZW1lbnRJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDEsIGtleTogUmV3YXJkc0dsb2JhbFN0YXRlS2V5RGlzYnVyc2VtZW50SUQgfSkKICAgIGJ5dGVjIDEwIC8vICJkaXNidXJzZW1lbnRfaWQiCiAgICBpbnRjXzEgLy8gMQogICAgYXBwX2dsb2JhbF9wdXQKCm1haW5fYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2NQogICAgLy8gZXhwb3J0IGNsYXNzIFJld2FyZHMgZXh0ZW5kcyBjbGFzc2VzKEJhc2VSZXdhcmRzLCBBa2l0YUJhc2VDb250cmFjdCwgQ29udHJhY3RXaXRoT3B0SW4pIHsKICAgIHR4biBPbkNvbXBsZXRpb24KICAgICEKICAgIGFzc2VydAogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgIGJ6IG1haW5fY3JlYXRlX05vT3BAMjgKICAgIHB1c2hieXRlc3MgMHg2NjYxMjA1YSAweGQ2MWE2OWZhIDB4NjVlNDk2NDMgMHgxYzllYmJkYiAweDhmNDkyNjJkIDB4NTY1NmFjZjkgMHhmNjJjZGMyYiAweDZmNWMxMGNmIDB4NTQyNGE1OTEgMHhkY2FjMDkzNSAweDdiN2RjNWZjIDB4YTNhMTZjYWEgMHhhZjFhMTRmMiAweDNlYzQwYWE0IDB4YmQzY2QwOTAgMHg4OGM1Zjk3MyAweDA4N2I0YjY1IDB4MTQ5NjlkOTcgMHgzM2U5MmM5NCAweDg1NGRlZGUwIDB4ZDU0YmJhZDkgMHgzOTRlYWViMiAvLyBtZXRob2QgImZ1bmRNYnJDcmVkaXRzKHVpbnQ2NCxwYXkpdm9pZCIsIG1ldGhvZCAid2l0aGRyYXdNYnJDcmVkaXRzKHVpbnQ2NCx1aW50NjQpdm9pZCIsIG1ldGhvZCAiY3JlYXRlRGlzYnVyc2VtZW50KHBheSxzdHJpbmcsdWludDY0LHVpbnQ2NCxzdHJpbmcsYWRkcmVzcyl1aW50NjQiLCBtZXRob2QgImNyZWF0ZURpc2J1cnNlbWVudChwYXksc3RyaW5nLHVpbnQ2NCx1aW50NjQsc3RyaW5nKXVpbnQ2NCIsIG1ldGhvZCAiZWRpdERpc2J1cnNlbWVudCh1aW50NjQsc3RyaW5nLHVpbnQ2NCx1aW50NjQsc3RyaW5nKXZvaWQiLCBtZXRob2QgImNyZWF0ZVVzZXJBbGxvY2F0aW9ucyhwYXksdWludDY0LChhZGRyZXNzLHVpbnQ2NClbXSl2b2lkIiwgbWV0aG9kICJjcmVhdGVBc2FVc2VyQWxsb2NhdGlvbnMoYXhmZXIsdWludDY0LChhZGRyZXNzLHVpbnQ2NClbXSl2b2lkIiwgbWV0aG9kICJjcmVhdGVBc2FEaXNidXJzZW1lbnRGcm9tR3JvdXAodWludDY0LHVpbnQ2NCxzdHJpbmcsdWludDY0LHVpbnQ2NCxzdHJpbmcsKGFkZHJlc3MsdWludDY0KVtdKXVpbnQ2NCIsIG1ldGhvZCAiZmluYWxpemVEaXNidXJzZW1lbnQodWludDY0KXZvaWQiLCBtZXRob2QgImNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQocGF5LHVpbnQ2NCx1aW50NjQsKGFkZHJlc3MsdWludDY0KVtdLGFkZHJlc3MpdWludDY0IiwgbWV0aG9kICJjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KHBheSx1aW50NjQsdWludDY0LChhZGRyZXNzLHVpbnQ2NClbXSl1aW50NjQiLCBtZXRob2QgImNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnQocGF5LGF4ZmVyLHVpbnQ2NCx1aW50NjQsKGFkZHJlc3MsdWludDY0KVtdLGFkZHJlc3MpdWludDY0IiwgbWV0aG9kICJjcmVhdGVJbnN0YW50QXNhRGlzYnVyc2VtZW50KHBheSxheGZlcix1aW50NjQsdWludDY0LChhZGRyZXNzLHVpbnQ2NClbXSl1aW50NjQiLCBtZXRob2QgImNsYWltUmV3YXJkcygodWludDY0LHVpbnQ2NClbXSl2b2lkIiwgbWV0aG9kICJyZWNsYWltUmV3YXJkcyh1aW50NjQsKGFkZHJlc3MsdWludDY0KVtdKXZvaWQiLCBtZXRob2QgInN3ZWVwRXhwaXJlZCh1aW50NjQsKGFkZHJlc3MsdWludDY0KVtdKXZvaWQiLCBtZXRob2QgImNsb3NlRGlzYnVyc2VtZW50KHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJhbGxvY2F0aW9uTWJyQ3JlZGl0U2hvcnRmYWxsKHVpbnQ2NCx1aW50NjQpdWludDY0IiwgbWV0aG9kICJ1cGRhdGVBa2l0YURBTyh1aW50NjQpdm9pZCIsIG1ldGhvZCAib3BVcCgpdm9pZCIsIG1ldGhvZCAibWJyKHN0cmluZyxzdHJpbmcpKHVpbnQ2NCx1aW50NjQpIiwgbWV0aG9kICJvcHRJbihwYXksdWludDY0KXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBmdW5kTWJyQ3JlZGl0cyB3aXRoZHJhd01ickNyZWRpdHMgY3JlYXRlRGlzYnVyc2VtZW50IGxlZ2FjeUNyZWF0ZURpc2J1cnNlbWVudCBlZGl0RGlzYnVyc2VtZW50IGNyZWF0ZVVzZXJBbGxvY2F0aW9ucyBjcmVhdGVBc2FVc2VyQWxsb2NhdGlvbnMgY3JlYXRlQXNhRGlzYnVyc2VtZW50RnJvbUdyb3VwIGZpbmFsaXplRGlzYnVyc2VtZW50IGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQgbGVnYWN5Q3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCBjcmVhdGVJbnN0YW50QXNhRGlzYnVyc2VtZW50IGxlZ2FjeUNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnQgY2xhaW1SZXdhcmRzIHJlY2xhaW1SZXdhcmRzIHN3ZWVwRXhwaXJlZCBjbG9zZURpc2J1cnNlbWVudCBhbGxvY2F0aW9uTWJyQ3JlZGl0U2hvcnRmYWxsIHVwZGF0ZUFraXRhREFPIG1haW5fb3BVcF9yb3V0ZUAyNCBtYnIgb3B0SW4KICAgIGVycgoKbWFpbl9vcFVwX3JvdXRlQDI0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjMwCiAgICAvLyBvcFVwKCk6IHZvaWQgeyB9CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgptYWluX2NyZWF0ZV9Ob09wQDI4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2NQogICAgLy8gZXhwb3J0IGNsYXNzIFJld2FyZHMgZXh0ZW5kcyBjbGFzc2VzKEJhc2VSZXdhcmRzLCBBa2l0YUJhc2VDb250cmFjdCwgQ29udHJhY3RXaXRoT3B0SW4pIHsKICAgIHB1c2hieXRlcyAweGNkOWFkNjdlIC8vIG1ldGhvZCAiY3JlYXRlKHN0cmluZyx1aW50NjQpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIGNyZWF0ZQogICAgZXJyCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6YXNzZXJ0U2FmZVBheW1lbnQodHhuOiB1aW50NjQsIHNlbmRlcjogYnl0ZXMpIC0+IHZvaWQ6CmFzc2VydFNhZmVQYXltZW50OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MQogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIGFzc2VydFNhZmVQYXltZW50KHR4bjogZ3R4bi5QYXltZW50VHhuLCBzZW5kZXI6IEFjY291bnQpOiB2b2lkIHsKICAgIHByb3RvIDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MgogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5zZW5kZXIgPT09IHNlbmRlciwgZXJySW52YWxpZFBheW1lbnRTZW5kZXIpCiAgICBmcmFtZV9kaWcgLTIKICAgIGd0eG5zIFNlbmRlcgogICAgZnJhbWVfZGlnIC0xCiAgICA9PQogICAgYm56IGFzc2VydFNhZmVQYXltZW50X2FmdGVyX2Fzc2VydEAyCiAgICBieXRlYyAxNSAvLyAiRVJSOmVycklwbXMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBtcwoKYXNzZXJ0U2FmZVBheW1lbnRfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYzCiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLmNsb3NlUmVtYWluZGVyVG8gPT09IEdsb2JhbC56ZXJvQWRkcmVzcywgZXJyQ2xvc2VGb3JiaWRkZW4pCiAgICBmcmFtZV9kaWcgLTIKICAgIGd0eG5zIENsb3NlUmVtYWluZGVyVG8KICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIGJueiBhc3NlcnRTYWZlUGF5bWVudF9hZnRlcl9hc3NlcnRANAogICAgYnl0ZWMgMTYgLy8gIkVSUjplcnJOY2xzIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5jbHMKCmFzc2VydFNhZmVQYXltZW50X2FmdGVyX2Fzc2VydEA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NAogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5yZWtleVRvID09PSBHbG9iYWwuemVyb0FkZHJlc3MsIGVyclJla2V5Rm9yYmlkZGVuKQogICAgZnJhbWVfZGlnIC0yCiAgICBndHhucyBSZWtleVRvCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgID09CiAgICBibnogYXNzZXJ0U2FmZVBheW1lbnRfYWZ0ZXJfYXNzZXJ0QDYKICAgIGJ5dGVjIDE3IC8vICJFUlI6ZXJyTnJreSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOcmt5Cgphc3NlcnRTYWZlUGF5bWVudF9hZnRlcl9hc3NlcnRANjoKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmFzc2VydEJvdW5kUGF5bWVudCh0eG46IHVpbnQ2NCwgc2VuZGVyOiBieXRlcywgcmVjZWl2ZXI6IGJ5dGVzLCBhbW91bnQ6IHVpbnQ2NCkgLT4gdm9pZDoKYXNzZXJ0Qm91bmRQYXltZW50OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3MQogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIGFzc2VydEJvdW5kUGF5bWVudCh0eG46IGd0eG4uUGF5bWVudFR4biwgc2VuZGVyOiBBY2NvdW50LCByZWNlaXZlcjogQWNjb3VudCwgYW1vdW50OiB1aW50NjQpOiB2b2lkIHsKICAgIHByb3RvIDQgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3MgogICAgLy8gYXNzZXJ0U2FmZVBheW1lbnQodHhuLCBzZW5kZXIpCiAgICBmcmFtZV9kaWcgLTQKICAgIGZyYW1lX2RpZyAtMwogICAgY2FsbHN1YiBhc3NlcnRTYWZlUGF5bWVudAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3MwogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5yZWNlaXZlciA9PT0gcmVjZWl2ZXIsIGVyckludmFsaWRQYXltZW50UmVjZWl2ZXIpCiAgICBmcmFtZV9kaWcgLTQKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBmcmFtZV9kaWcgLTIKICAgID09CiAgICBibnogYXNzZXJ0Qm91bmRQYXltZW50X2FmdGVyX2Fzc2VydEAyCiAgICBieXRlYyAxOCAvLyAiRVJSOmVycklwbXIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBtcgoKYXNzZXJ0Qm91bmRQYXltZW50X2FmdGVyX2Fzc2VydEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3NAogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5hbW91bnQgPT09IGFtb3VudCwgZXJySW52YWxpZFBheW1lbnRBbW91bnQpCiAgICBmcmFtZV9kaWcgLTQKICAgIGd0eG5zIEFtb3VudAogICAgZnJhbWVfZGlnIC0xCiAgICA9PQogICAgYm56IGFzc2VydEJvdW5kUGF5bWVudF9hZnRlcl9hc3NlcnRANAogICAgYnl0ZWMgMTkgLy8gIkVSUjplcnJJcG1hIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwbWEKCmFzc2VydEJvdW5kUGF5bWVudF9hZnRlcl9hc3NlcnRANDoKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmFzc2VydEJvdW5kQXNzZXRUcmFuc2Zlcih0eG46IHVpbnQ2NCwgc2VuZGVyOiBieXRlcywgcmVjZWl2ZXI6IGJ5dGVzLCBhc3NldDogdWludDY0LCBhbW91bnQ6IHVpbnQ2NCkgLT4gdm9pZDoKYXNzZXJ0Qm91bmRBc3NldFRyYW5zZmVyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5My05OQogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIGFzc2VydEJvdW5kQXNzZXRUcmFuc2ZlcigKICAgIC8vICAgdHhuOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIHNlbmRlcjogQWNjb3VudCwKICAgIC8vICAgcmVjZWl2ZXI6IEFjY291bnQsCiAgICAvLyAgIGFzc2V0OiBBc3NldCwKICAgIC8vICAgYW1vdW50OiB1aW50NjQKICAgIC8vICk6IHZvaWQgewogICAgcHJvdG8gNSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjgzCiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLnNlbmRlciA9PT0gc2VuZGVyLCBlcnJJbnZhbGlkUGF5bWVudFNlbmRlcikKICAgIGZyYW1lX2RpZyAtNQogICAgZ3R4bnMgU2VuZGVyCiAgICBmcmFtZV9kaWcgLTQKICAgID09CiAgICBibnogYXNzZXJ0Qm91bmRBc3NldFRyYW5zZmVyX2FmdGVyX2Fzc2VydEA5CiAgICBieXRlYyAxNSAvLyAiRVJSOmVycklwbXMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBtcwoKYXNzZXJ0Qm91bmRBc3NldFRyYW5zZmVyX2FmdGVyX2Fzc2VydEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo4NAogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5hc3NldFNlbmRlciA9PT0gR2xvYmFsLnplcm9BZGRyZXNzLCBlcnJDbGF3YmFja0ZvcmJpZGRlbikKICAgIGZyYW1lX2RpZyAtNQogICAgZ3R4bnMgQXNzZXRTZW5kZXIKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIGJueiBhc3NlcnRCb3VuZEFzc2V0VHJhbnNmZXJfYWZ0ZXJfYXNzZXJ0QDExCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJOY2x3IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5jbHcKCmFzc2VydEJvdW5kQXNzZXRUcmFuc2Zlcl9hZnRlcl9hc3NlcnRAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjg1CiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLmFzc2V0Q2xvc2VUbyA9PT0gR2xvYmFsLnplcm9BZGRyZXNzLCBlcnJDbG9zZUZvcmJpZGRlbikKICAgIGZyYW1lX2RpZyAtNQogICAgZ3R4bnMgQXNzZXRDbG9zZVRvCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgID09CiAgICBibnogYXNzZXJ0Qm91bmRBc3NldFRyYW5zZmVyX2FmdGVyX2Fzc2VydEAxMwogICAgYnl0ZWMgMTYgLy8gIkVSUjplcnJOY2xzIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5jbHMKCmFzc2VydEJvdW5kQXNzZXRUcmFuc2Zlcl9hZnRlcl9hc3NlcnRAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjg2CiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLnJla2V5VG8gPT09IEdsb2JhbC56ZXJvQWRkcmVzcywgZXJyUmVrZXlGb3JiaWRkZW4pCiAgICBmcmFtZV9kaWcgLTUKICAgIGd0eG5zIFJla2V5VG8KICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIGJueiBhc3NlcnRCb3VuZEFzc2V0VHJhbnNmZXJfYWZ0ZXJfYXNzZXJ0QDE1CiAgICBieXRlYyAxNyAvLyAiRVJSOmVyck5ya3kiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTnJreQoKYXNzZXJ0Qm91bmRBc3NldFRyYW5zZmVyX2FmdGVyX2Fzc2VydEAxNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTAxCiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLmFzc2V0UmVjZWl2ZXIgPT09IHJlY2VpdmVyLCBlcnJJbnZhbGlkQXNzZXRSZWNlaXZlcikKICAgIGZyYW1lX2RpZyAtNQogICAgZ3R4bnMgQXNzZXRSZWNlaXZlcgogICAgZnJhbWVfZGlnIC0zCiAgICA9PQogICAgYm56IGFzc2VydEJvdW5kQXNzZXRUcmFuc2Zlcl9hZnRlcl9hc3NlcnRAMgogICAgcHVzaGJ5dGVzICJFUlI6ZXJySWFyZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJYXJlCgphc3NlcnRCb3VuZEFzc2V0VHJhbnNmZXJfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwMgogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi54ZmVyQXNzZXQgPT09IGFzc2V0LCBlcnJJbnZhbGlkQXNzZXQpCiAgICBmcmFtZV9kaWcgLTUKICAgIGd0eG5zIFhmZXJBc3NldAogICAgZnJhbWVfZGlnIC0yCiAgICA9PQogICAgYm56IGFzc2VydEJvdW5kQXNzZXRUcmFuc2Zlcl9hZnRlcl9hc3NlcnRANAogICAgcHVzaGJ5dGVzICJFUlI6ZXJySWFzdCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJYXN0Cgphc3NlcnRCb3VuZEFzc2V0VHJhbnNmZXJfYWZ0ZXJfYXNzZXJ0QDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwMwogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5hc3NldEFtb3VudCA9PT0gYW1vdW50LCBlcnJJbnZhbGlkQXNzZXRBbW91bnQpCiAgICBmcmFtZV9kaWcgLTUKICAgIGd0eG5zIEFzc2V0QW1vdW50CiAgICBmcmFtZV9kaWcgLTEKICAgID09CiAgICBibnogYXNzZXJ0Qm91bmRBc3NldFRyYW5zZmVyX2FmdGVyX2Fzc2VydEA2CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJJYWFtIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklhYW0KCmFzc2VydEJvdW5kQXNzZXRUcmFuc2Zlcl9hZnRlcl9hc3NlcnRANjoKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6OlJld2FyZHMuY3JlYXRlW3JvdXRpbmddKCkgLT4gdm9pZDoKY3JlYXRlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyNjYKICAgIC8vIEBhYmltZXRob2QoeyBvbkNyZWF0ZTogJ3JlcXVpcmUnIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE0CiAgICAvLyB2ZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogR2xvYmFsU3RhdGVLZXlWZXJzaW9uIH0pCiAgICBwdXNoYnl0ZXMgInZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjI2OAogICAgLy8gdGhpcy52ZXJzaW9uLnZhbHVlID0gdmVyc2lvbgogICAgdW5jb3ZlciAyCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWMgMTEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjY5CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlID0gQXBwbGljYXRpb24oYWtpdGFEQU8pCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyNjYKICAgIC8vIEBhYmltZXRob2QoeyBvbkNyZWF0ZTogJ3JlcXVpcmUnIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo6UmV3YXJkcy5mdW5kTWJyQ3JlZGl0c1tyb3V0aW5nXSgpIC0+IHZvaWQ6CmZ1bmRNYnJDcmVkaXRzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyNzQKICAgIC8vIGZ1bmRNYnJDcmVkaXRzKGlkOiB1aW50NjQsIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4bik6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgY292ZXIgMgogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6Mjc1CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5kaXNidXJzZW1lbnRzKGlkKS5leGlzdHMsIGVyckRpc2J1cnNlbWVudERvZXNOb3RFeGlzdCkKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6ODAKICAgIC8vIGRpc2J1cnNlbWVudHMgPSBCb3hNYXA8dWludDY0LCBEaXNidXJzZW1lbnREZXRhaWxzPih7IGtleVByZWZpeDogUmV3YXJkc0JveFByZWZpeERpc2J1cnNlbWVudHMgfSkKICAgIGJ5dGVjXzAgLy8gImQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyNzUKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmRpc2J1cnNlbWVudHMoaWQpLmV4aXN0cywgZXJyRGlzYnVyc2VtZW50RG9lc05vdEV4aXN0KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogZnVuZE1ickNyZWRpdHNfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjXzEgLy8gIkVSUjplcnJEYm5lIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckRibmUKCmZ1bmRNYnJDcmVkaXRzX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyNzYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlLmNyZWF0b3IgPT09IFR4bi5zZW5kZXIsIGVycllvdUFyZU5vdFRoZUNyZWF0b3IpCiAgICBpbnRjXzAgLy8gMAogICAgcHVzaGludCAzMgogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIHR4biBTZW5kZXIKICAgID09CiAgICBibnogZnVuZE1ickNyZWRpdHNfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjXzMgLy8gIkVSUjplcnJZbmNyIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclluY3IKCmZ1bmRNYnJDcmVkaXRzX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyNzgKICAgIC8vIGFzc2VydFNhZmVQYXltZW50KHBheW1lbnQsIFR4bi5zZW5kZXIpCiAgICB0eG4gU2VuZGVyCiAgICBkaWcgMQogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgYXNzZXJ0U2FmZVBheW1lbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6Mjc5CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRQYXltZW50KQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IGZ1bmRNYnJDcmVkaXRzX2FmdGVyX2Fzc2VydEA3CiAgICBieXRlYyA1IC8vICJFUlI6ZXJySXBheSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcGF5CgpmdW5kTWJyQ3JlZGl0c19hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjgwCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPiAwLCBlcnJJbnZhbGlkUGF5bWVudCkKICAgIGd0eG5zIEFtb3VudAogICAgZHVwCiAgICBibnogZnVuZE1ickNyZWRpdHNfYWZ0ZXJfYXNzZXJ0QDkKICAgIGJ5dGVjIDUgLy8gIkVSUjplcnJJcGF5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwYXkKCmZ1bmRNYnJDcmVkaXRzX2FmdGVyX2Fzc2VydEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyODIKICAgIC8vIHRoaXMuYWRkTWJyQ3JlZGl0KGlkLCBwYXltZW50LmFtb3VudCkKICAgIGNhbGxzdWIgYWRkTWJyQ3JlZGl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjI3NAogICAgLy8gZnVuZE1ickNyZWRpdHMoaWQ6IHVpbnQ2NCwgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo6UmV3YXJkcy53aXRoZHJhd01ickNyZWRpdHNbcm91dGluZ10oKSAtPiB2b2lkOgp3aXRoZHJhd01ickNyZWRpdHM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjI4NQogICAgLy8gd2l0aGRyYXdNYnJDcmVkaXRzKGlkOiB1aW50NjQsIGFtb3VudDogdWludDY0KTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjI4NgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZGlzYnVyc2VtZW50cyhpZCkuZXhpc3RzLCBlcnJEaXNidXJzZW1lbnREb2VzTm90RXhpc3QpCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjgwCiAgICAvLyBkaXNidXJzZW1lbnRzID0gQm94TWFwPHVpbnQ2NCwgRGlzYnVyc2VtZW50RGV0YWlscz4oeyBrZXlQcmVmaXg6IFJld2FyZHNCb3hQcmVmaXhEaXNidXJzZW1lbnRzIH0pCiAgICBieXRlY18wIC8vICJkIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6Mjg2CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5kaXNidXJzZW1lbnRzKGlkKS5leGlzdHMsIGVyckRpc2J1cnNlbWVudERvZXNOb3RFeGlzdCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHdpdGhkcmF3TWJyQ3JlZGl0c19hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWNfMSAvLyAiRVJSOmVyckRibmUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyRGJuZQoKd2l0aGRyYXdNYnJDcmVkaXRzX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyODcKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlLmNyZWF0b3IgPT09IFR4bi5zZW5kZXIsIGVycllvdUFyZU5vdFRoZUNyZWF0b3IpCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBwdXNoaW50IDMyCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgdHhuIFNlbmRlcgogICAgPT0KICAgIGJueiB3aXRoZHJhd01ickNyZWRpdHNfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjXzMgLy8gIkVSUjplcnJZbmNyIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclluY3IKCndpdGhkcmF3TWJyQ3JlZGl0c19hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6Mjg4CiAgICAvLyBsb2dnZWRBc3NlcnQoYW1vdW50ID4gMCwgZXJySW52YWxpZE1ickFtb3VudCkKICAgIGRpZyAxCiAgICBibnogd2l0aGRyYXdNYnJDcmVkaXRzX2FmdGVyX2Fzc2VydEA3CiAgICBieXRlYyA2IC8vICJFUlI6ZXJySW1iciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJbWJyCgp3aXRoZHJhd01ickNyZWRpdHNfYWZ0ZXJfYXNzZXJ0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjI4OQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUubWJyQ3JlZGl0cyA+PSBhbW91bnQsIGVyckludmFsaWRNYnJBbW91bnQpCiAgICBkdXAKICAgIHB1c2hpbnQgNzUKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgZGlnIDIKICAgID49CiAgICBibnogd2l0aGRyYXdNYnJDcmVkaXRzX2FmdGVyX2Fzc2VydEA5CiAgICBieXRlYyA2IC8vICJFUlI6ZXJySW1iciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJbWJyCgp3aXRoZHJhd01ickNyZWRpdHNfYWZ0ZXJfYXNzZXJ0QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjI5MAogICAgLy8gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZS5tYnJDcmVkaXRzIC09IGFtb3VudAogICAgZHVwCiAgICBwdXNoaW50IDc1CiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIHVuY292ZXIgMgogICAgZHVwCiAgICBjb3ZlciAyCiAgICAtCiAgICBpdG9iCiAgICB1bmNvdmVyIDIKICAgIHB1c2hpbnQgNzUKICAgIHVuY292ZXIgMgogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjkyLTI5NQogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgIGFtb3VudCwKICAgIC8vIH0pLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjI5MwogICAgLy8gcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyOTItMjk1CiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgYW1vdW50LAogICAgLy8gfSkuc3VibWl0KCkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjI4NQogICAgLy8gd2l0aGRyYXdNYnJDcmVkaXRzKGlkOiB1aW50NjQsIGFtb3VudDogdWludDY0KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo6UmV3YXJkcy5jcmVhdGVEaXNidXJzZW1lbnRbcm91dGluZ10oKSAtPiB2b2lkOgpjcmVhdGVEaXNidXJzZW1lbnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjMwMi0zMDkKICAgIC8vIGNyZWF0ZURpc2J1cnNlbWVudCgKICAgIC8vICAgbWJyUGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICB0aXRsZTogc3RyaW5nLAogICAgLy8gICB0aW1lVG9VbmxvY2s6IHVpbnQ2NCwKICAgIC8vICAgZXhwaXJhdGlvbjogdWludDY0LAogICAgLy8gICBub3RlOiBzdHJpbmcsCiAgICAvLyAgIHJlY2xhaW1UbzogQWNjb3VudAogICAgLy8gKTogdWludDY0IHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA1CiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjMxMAogICAgLy8gcmV0dXJuIHRoaXMubmV3RGlzYnVyc2VtZW50KG1iclBheW1lbnQsIHRpdGxlLCB0aW1lVG9VbmxvY2ssIGV4cGlyYXRpb24sIG5vdGUsIHJlY2xhaW1UbykKICAgIGNhbGxzdWIgbmV3RGlzYnVyc2VtZW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjMwMi0zMDkKICAgIC8vIGNyZWF0ZURpc2J1cnNlbWVudCgKICAgIC8vICAgbWJyUGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICB0aXRsZTogc3RyaW5nLAogICAgLy8gICB0aW1lVG9VbmxvY2s6IHVpbnQ2NCwKICAgIC8vICAgZXhwaXJhdGlvbjogdWludDY0LAogICAgLy8gICBub3RlOiBzdHJpbmcsCiAgICAvLyAgIHJlY2xhaW1UbzogQWNjb3VudAogICAgLy8gKTogdWludDY0IHsKICAgIGl0b2IKICAgIGJ5dGVjXzIgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjpSZXdhcmRzLmxlZ2FjeUNyZWF0ZURpc2J1cnNlbWVudFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmxlZ2FjeUNyZWF0ZURpc2J1cnNlbWVudDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzE0CiAgICAvLyBAYWJpbWV0aG9kKHsgbmFtZTogJ2NyZWF0ZURpc2J1cnNlbWVudCcgfSkKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjMyMgogICAgLy8gcmV0dXJuIHRoaXMubmV3RGlzYnVyc2VtZW50KG1iclBheW1lbnQsIHRpdGxlLCB0aW1lVG9VbmxvY2ssIGV4cGlyYXRpb24sIG5vdGUsIEdsb2JhbC56ZXJvQWRkcmVzcykKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgY2FsbHN1YiBuZXdEaXNidXJzZW1lbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzE0CiAgICAvLyBAYWJpbWV0aG9kKHsgbmFtZTogJ2NyZWF0ZURpc2J1cnNlbWVudCcgfSkKICAgIGl0b2IKICAgIGJ5dGVjXzIgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjpSZXdhcmRzLmVkaXREaXNidXJzZW1lbnRbcm91dGluZ10oKSAtPiB2b2lkOgplZGl0RGlzYnVyc2VtZW50OgogICAgcHVzaGJ5dGVzICIiCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzI1LTMzMQogICAgLy8gZWRpdERpc2J1cnNlbWVudCgKICAgIC8vICAgaWQ6IHVpbnQ2NCwKICAgIC8vICAgdGl0bGU6IHN0cmluZywKICAgIC8vICAgdGltZVRvVW5sb2NrOiB1aW50NjQsCiAgICAvLyAgIGV4cGlyYXRpb246IHVpbnQ2NCwKICAgIC8vICAgbm90ZTogc3RyaW5nCiAgICAvLyApOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgY292ZXIgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgIGR1cAogICAgY292ZXIgNAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgc3dhcAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBjb3ZlciAyCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozMzIKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmRpc2J1cnNlbWVudHMoaWQpLmV4aXN0cywgZXJyRGlzYnVyc2VtZW50RG9lc05vdEV4aXN0KQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo4MAogICAgLy8gZGlzYnVyc2VtZW50cyA9IEJveE1hcDx1aW50NjQsIERpc2J1cnNlbWVudERldGFpbHM+KHsga2V5UHJlZml4OiBSZXdhcmRzQm94UHJlZml4RGlzYnVyc2VtZW50cyB9KQogICAgYnl0ZWNfMCAvLyAiZCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjMzMgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZGlzYnVyc2VtZW50cyhpZCkuZXhpc3RzLCBlcnJEaXNidXJzZW1lbnREb2VzTm90RXhpc3QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBlZGl0RGlzYnVyc2VtZW50X2FmdGVyX2Fzc2VydEAzCiAgICBieXRlY18xIC8vICJFUlI6ZXJyRGJuZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJEYm5lCgplZGl0RGlzYnVyc2VtZW50X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozMzQKICAgIC8vIGNvbnN0IHsgY3JlYXRvciwgZmluYWxpemVkLCB0aXRsZTogb2xkVGl0bGUsIG5vdGU6IG9sZE5vdGUgfSA9IHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUKICAgIGR1cG4gMgogICAgaW50Y18wIC8vIDAKICAgIHB1c2hpbnQgMzIKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBkaWcgMQogICAgcHVzaGludCAzMgogICAgaW50Y18xIC8vIDEKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Yml0CiAgICBjb3ZlciAzCiAgICBkaWcgMQogICAgcHVzaGludCAxMTcKICAgIGludGNfMyAvLyAyCiAgICBib3hfZXh0cmFjdAogICAgYnRvaQogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAyCiAgICBwdXNoaW50IDExNwogICAgdW5jb3ZlciAyCiAgICBib3hfZXh0cmFjdAogICAgZXh0cmFjdCAyIDAKICAgIGNvdmVyIDMKICAgIGRpZyAxCiAgICBwdXNoaW50IDExNQogICAgaW50Y18zIC8vIDIKICAgIGJveF9leHRyYWN0CiAgICBidG9pCiAgICBkaWcgMgogICAgZGlnIDEKICAgIGludGNfMyAvLyAyCiAgICBib3hfZXh0cmFjdAogICAgYnRvaQogICAgaW50Y18zIC8vIDIKICAgICsKICAgIHVuY292ZXIgMwogICAgY292ZXIgMgogICAgYm94X2V4dHJhY3QKICAgIGV4dHJhY3QgMiAwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjMzNQogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IGNyZWF0b3IsIGVycllvdUFyZU5vdFRoZUNyZWF0b3IpCiAgICB0eG4gU2VuZGVyCiAgICA9PQogICAgYm56IGVkaXREaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjXzMgLy8gIkVSUjplcnJZbmNyIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclluY3IKCmVkaXREaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjMzNgogICAgLy8gbG9nZ2VkQXNzZXJ0KGZpbmFsaXplZCA9PT0gZmFsc2UsIGVyckRpc2J1cnNlbWVudEFscmVhZHlGaW5hbCkKICAgIHVuY292ZXIgMwogICAgYnogZWRpdERpc2J1cnNlbWVudF9hZnRlcl9hc3NlcnRANwogICAgYnl0ZWMgNyAvLyAiRVJSOmVyckRiYWYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyRGJhZgoKZWRpdERpc2J1cnNlbWVudF9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzQwCiAgICAvLyBjb25zdCBvbGRNYnIgPSB0aGlzLmRpc2J1cnNlbWVudEJveE1icihCeXRlcyhvbGRUaXRsZSkubGVuZ3RoLCBCeXRlcyhvbGROb3RlKS5sZW5ndGgpCiAgICB1bmNvdmVyIDIKICAgIGxlbgogICAgdW5jb3ZlciAyCiAgICBsZW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTY5CiAgICAvLyByZXR1cm4gTWluRGlzYnVyc2VtZW50c01CUiArIChCb3hDb3N0UGVyQnl0ZSAqICh0aXRsZUxlbmd0aCArIG5vdGVMZW5ndGgpKQogICAgKwogICAgaW50YyA2IC8vIDQwMAogICAgKgogICAgaW50YyA1IC8vIDU0NTAwCiAgICArCiAgICBkdXAKICAgIGJ1cnkgMTAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzQxCiAgICAvLyBjb25zdCBuZXdNYnIgPSB0aGlzLmRpc2J1cnNlbWVudEJveE1icihCeXRlcyh0aXRsZSkubGVuZ3RoLCBCeXRlcyhub3RlKS5sZW5ndGgpCiAgICB1bmNvdmVyIDYKICAgIGxlbgogICAgdW5jb3ZlciAzCiAgICBsZW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTY5CiAgICAvLyByZXR1cm4gTWluRGlzYnVyc2VtZW50c01CUiArIChCb3hDb3N0UGVyQnl0ZSAqICh0aXRsZUxlbmd0aCArIG5vdGVMZW5ndGgpKQogICAgKwogICAgaW50YyA2IC8vIDQwMAogICAgKgogICAgaW50YyA1IC8vIDU0NTAwCiAgICArCiAgICBkdXAKICAgIGJ1cnkgMTAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzQyCiAgICAvLyBpZiAobmV3TWJyID4gb2xkTWJyKSB7CiAgICA8CiAgICBieiBlZGl0RGlzYnVyc2VtZW50X2Vsc2VfYm9keUAxMQogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozNDMKICAgIC8vIGNvbnN0IGRlbHRhOiB1aW50NjQgPSBuZXdNYnIgLSBvbGRNYnIKICAgIGRpZyA3CiAgICBkaWcgNwogICAgLQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjM0NAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUubWJyQ3JlZGl0cyA+PSBkZWx0YSwgZXJySW52YWxpZE1ickFtb3VudCkKICAgIGRpZyAyCiAgICBwdXNoaW50IDc1CiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIDw9CiAgICBibnogZWRpdERpc2J1cnNlbWVudF9hZnRlcl9hc3NlcnRAMTAKICAgIGJ5dGVjIDYgLy8gIkVSUjplcnJJbWJyIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckltYnIKCmVkaXREaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozNDUKICAgIC8vIHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUubWJyQ3JlZGl0cyAtPSBkZWx0YQogICAgZGlnIDEKICAgIGR1cAogICAgcHVzaGludCA3NQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICB1bmNvdmVyIDIKICAgIC0KICAgIGl0b2IKICAgIHB1c2hpbnQgNzUKICAgIHN3YXAKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCgplZGl0RGlzYnVyc2VtZW50X2FmdGVyX2lmX2Vsc2VAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjM1MAogICAgLy8gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZS50aXRsZSA9IHRpdGxlCiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBkdXAKICAgIHB1c2hpbnQgMzMKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGRpZyAyCiAgICBleHRyYWN0MwogICAgdW5jb3ZlciA4CiAgICBjb25jYXQKICAgIGRpZyAyCiAgICBwdXNoaW50IDExNQogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyAzCiAgICBsZW4KICAgIHVuY292ZXIgNAogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgc3Vic3RyaW5nMwogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGRpZyAxCiAgICB1bmNvdmVyIDMKICAgIC0KICAgIHVuY292ZXIgMgogICAgdW5jb3ZlciA3CiAgICArCiAgICBzd2FwCiAgICAtCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgcmVwbGFjZTIgMTE1CiAgICBkaWcgMQogICAgYm94X2RlbAogICAgcG9wCiAgICBkaWcgMQogICAgc3dhcAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozNTEKICAgIC8vIHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUudGltZVRvVW5sb2NrID0gdGltZVRvVW5sb2NrCiAgICBkdXAKICAgIHB1c2hpbnQgNDMKICAgIHVuY292ZXIgNQogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzUyCiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlLmV4cGlyYXRpb24gPSBleHBpcmF0aW9uCiAgICBkdXAKICAgIHB1c2hpbnQgNTEKICAgIHVuY292ZXIgNAogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzUzCiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlLm5vdGUgPSBub3RlCiAgICBkdXAKICAgIGJveF9nZXQKICAgIHBvcAogICAgZHVwCiAgICBwdXNoaW50IDExNQogICAgZXh0cmFjdF91aW50MTYKICAgIGludGNfMCAvLyAwCiAgICBzd2FwCiAgICBleHRyYWN0MwogICAgdW5jb3ZlciAyCiAgICBjb25jYXQKICAgIGRpZyAxCiAgICBib3hfZGVsCiAgICBwb3AKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzI1LTMzMQogICAgLy8gZWRpdERpc2J1cnNlbWVudCgKICAgIC8vICAgaWQ6IHVpbnQ2NCwKICAgIC8vICAgdGl0bGU6IHN0cmluZywKICAgIC8vICAgdGltZVRvVW5sb2NrOiB1aW50NjQsCiAgICAvLyAgIGV4cGlyYXRpb246IHVpbnQ2NCwKICAgIC8vICAgbm90ZTogc3RyaW5nCiAgICAvLyApOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmVkaXREaXNidXJzZW1lbnRfZWxzZV9ib2R5QDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozNDYKICAgIC8vIH0gZWxzZSBpZiAob2xkTWJyID4gbmV3TWJyKSB7CiAgICBkaWcgNgogICAgZGlnIDgKICAgID4KICAgIGJ6IGVkaXREaXNidXJzZW1lbnRfYWZ0ZXJfaWZfZWxzZUAxNAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozNDcKICAgIC8vIHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUubWJyQ3JlZGl0cyArPSBvbGRNYnIgLSBuZXdNYnIKICAgIGR1cG4gMgogICAgcHVzaGludCA3NQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBkaWcgOAogICAgZGlnIDEwCiAgICAtCiAgICArCiAgICBpdG9iCiAgICBwdXNoaW50IDc1CiAgICBzd2FwCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYiBlZGl0RGlzYnVyc2VtZW50X2FmdGVyX2lmX2Vsc2VAMTQKCgovLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjpSZXdhcmRzLmNyZWF0ZVVzZXJBbGxvY2F0aW9uc1tyb3V0aW5nXSgpIC0+IHZvaWQ6CmNyZWF0ZVVzZXJBbGxvY2F0aW9uczoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzU2LTM2MAogICAgLy8gY3JlYXRlVXNlckFsbG9jYXRpb25zKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGlkOiB1aW50NjQsCiAgICAvLyAgIGFsbG9jYXRpb25zOiBVc2VyQWxsb2NhdGlvbltdCiAgICAvLyApOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGR1cAogICAgY292ZXIgNQogICAgcHVzaGludCA0MAogICAgKgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIHN3YXAKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL3R5cGVzLnRzOjpVc2VyQWxsb2NhdGlvbj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzYxCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5kaXNidXJzZW1lbnRzKGlkKS5leGlzdHMsIGVyckRpc2J1cnNlbWVudERvZXNOb3RFeGlzdCkKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6ODAKICAgIC8vIGRpc2J1cnNlbWVudHMgPSBCb3hNYXA8dWludDY0LCBEaXNidXJzZW1lbnREZXRhaWxzPih7IGtleVByZWZpeDogUmV3YXJkc0JveFByZWZpeERpc2J1cnNlbWVudHMgfSkKICAgIGJ5dGVjXzAgLy8gImQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozNjEKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmRpc2J1cnNlbWVudHMoaWQpLmV4aXN0cywgZXJyRGlzYnVyc2VtZW50RG9lc05vdEV4aXN0KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogY3JlYXRlVXNlckFsbG9jYXRpb25zX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlY18xIC8vICJFUlI6ZXJyRGJuZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJEYm5lCgpjcmVhdGVVc2VyQWxsb2NhdGlvbnNfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjM2MwogICAgLy8gY29uc3QgeyBjcmVhdG9yLCBmaW5hbGl6ZWQgfSA9IHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIHB1c2hpbnQgMzIKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBzd2FwCiAgICBwdXNoaW50IDMyCiAgICBpbnRjXzEgLy8gMQogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzY0CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gY3JlYXRvciwgZXJyWW91QXJlTm90VGhlQ3JlYXRvcikKICAgIHR4biBTZW5kZXIKICAgID09CiAgICBibnogY3JlYXRlVXNlckFsbG9jYXRpb25zX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlY18zIC8vICJFUlI6ZXJyWW5jciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJZbmNyCgpjcmVhdGVVc2VyQWxsb2NhdGlvbnNfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjM2NQogICAgLy8gbG9nZ2VkQXNzZXJ0KCFmaW5hbGl6ZWQsIGVyckRpc2J1cnNlbWVudEFscmVhZHlGaW5hbCkKICAgIGJ6IGNyZWF0ZVVzZXJBbGxvY2F0aW9uc19hZnRlcl9hc3NlcnRANwogICAgYnl0ZWMgNyAvLyAiRVJSOmVyckRiYWYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyRGJhZgoKY3JlYXRlVXNlckFsbG9jYXRpb25zX2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozNjcKICAgIC8vIGxldCBzdW06IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjM2OAogICAgLy8gbGV0IG5ld0JveGVzOiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozNjkKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBhbGxvY2F0aW9ucy5sZW5ndGg7IGkgKz0gMSkgewogICAgaW50Y18wIC8vIDAKCmNyZWF0ZVVzZXJBbGxvY2F0aW9uc193aGlsZV90b3BAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzY5CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgYWxsb2NhdGlvbnMubGVuZ3RoOyBpICs9IDEpIHsKICAgIGR1cAogICAgZGlnIDYKICAgIDwKICAgIGJ6IGNyZWF0ZVVzZXJBbGxvY2F0aW9uc19hZnRlcl93aGlsZUAxMAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozNzAKICAgIC8vIG5ld0JveGVzICs9IHRoaXMud3JpdGVBbGxvY2F0aW9uKGlkLCBhbGxvY2F0aW9uc1tpXS5hZGRyZXNzLCAwLCBhbGxvY2F0aW9uc1tpXS5hbW91bnQpCiAgICBkaWcgMQogICAgZXh0cmFjdCAyIDAKICAgIGRpZyAxCiAgICBwdXNoaW50IDQwCiAgICAqCiAgICBwdXNoaW50IDQwCiAgICBleHRyYWN0MyAvLyBvbiBlcnJvcjogaW5kZXggYWNjZXNzIGlzIG91dCBvZiBib3VuZHMKICAgIGR1cAogICAgZXh0cmFjdCAwIDMyCiAgICBzd2FwCiAgICBwdXNoaW50IDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZGlnIDUKICAgIHVuY292ZXIgMgogICAgaW50Y18wIC8vIDAKICAgIGRpZyAzCiAgICBjYWxsc3ViIHdyaXRlQWxsb2NhdGlvbgogICAgdW5jb3ZlciA0CiAgICArCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjM3MQogICAgLy8gc3VtICs9IGFsbG9jYXRpb25zW2ldLmFtb3VudAogICAgdW5jb3ZlciA1CiAgICArCiAgICBjb3ZlciA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjM2OQogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGFsbG9jYXRpb25zLmxlbmd0aDsgaSArPSAxKSB7CiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgYiBjcmVhdGVVc2VyQWxsb2NhdGlvbnNfd2hpbGVfdG9wQDgKCmNyZWF0ZVVzZXJBbGxvY2F0aW9uc19hZnRlcl93aGlsZUAxMDoKICAgIHBvcG4gMgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozNzQKICAgIC8vIHRoaXMudXNlTWJyQ3JlZGl0KGlkLCBVc2VyQWxsb2NhdGlvbk1CUiAqIG5ld0JveGVzKQogICAgaW50YyA0IC8vIDI1MzAwCiAgICAqCiAgICBjYWxsc3ViIHVzZU1ickNyZWRpdAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozNzYKICAgIC8vIGFzc2VydEJvdW5kUGF5bWVudChwYXltZW50LCBUeG4uc2VuZGVyLCBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgc3VtKQogICAgdHhuIFNlbmRlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGRpZyA0CiAgICBjb3ZlciAyCiAgICB1bmNvdmVyIDMKICAgIGNhbGxzdWIgYXNzZXJ0Qm91bmRQYXltZW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjM1Ni0zNjAKICAgIC8vIGNyZWF0ZVVzZXJBbGxvY2F0aW9ucygKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBpZDogdWludDY0LAogICAgLy8gICBhbGxvY2F0aW9uczogVXNlckFsbG9jYXRpb25bXQogICAgLy8gKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo6UmV3YXJkcy5jcmVhdGVBc2FVc2VyQWxsb2NhdGlvbnNbcm91dGluZ10oKSAtPiB2b2lkOgpjcmVhdGVBc2FVc2VyQWxsb2NhdGlvbnM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjM3OS0zODMKICAgIC8vIGNyZWF0ZUFzYVVzZXJBbGxvY2F0aW9ucygKICAgIC8vICAgYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIGlkOiB1aW50NjQsCiAgICAvLyAgIGFsbG9jYXRpb25zOiBVc2VyQWxsb2NhdGlvbltdCiAgICAvLyApOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA0IC8vIGF4ZmVyCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXhmZXIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBkdXAKICAgIGNvdmVyIDYKICAgIHB1c2hpbnQgNDAKICAgICoKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxzbWFydF9jb250cmFjdHMvcmV3YXJkcy90eXBlcy50czo6VXNlckFsbG9jYXRpb24+CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjM4NAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZGlzYnVyc2VtZW50cyhpZCkuZXhpc3RzLCBlcnJEaXNidXJzZW1lbnREb2VzTm90RXhpc3QpCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjgwCiAgICAvLyBkaXNidXJzZW1lbnRzID0gQm94TWFwPHVpbnQ2NCwgRGlzYnVyc2VtZW50RGV0YWlscz4oeyBrZXlQcmVmaXg6IFJld2FyZHNCb3hQcmVmaXhEaXNidXJzZW1lbnRzIH0pCiAgICBieXRlY18wIC8vICJkIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6Mzg0CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5kaXNidXJzZW1lbnRzKGlkKS5leGlzdHMsIGVyckRpc2J1cnNlbWVudERvZXNOb3RFeGlzdCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGNyZWF0ZUFzYVVzZXJBbGxvY2F0aW9uc19hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWNfMSAvLyAiRVJSOmVyckRibmUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyRGJuZQoKY3JlYXRlQXNhVXNlckFsbG9jYXRpb25zX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozODYKICAgIC8vIGNvbnN0IHsgY3JlYXRvciwgZmluYWxpemVkIH0gPSB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBwdXNoaW50IDMyCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgc3dhcAogICAgcHVzaGludCAzMgogICAgaW50Y18xIC8vIDEKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Yml0CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjM4NwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IGNyZWF0b3IsIGVycllvdUFyZU5vdFRoZUNyZWF0b3IpCiAgICB0eG4gU2VuZGVyCiAgICA9PQogICAgYm56IGNyZWF0ZUFzYVVzZXJBbGxvY2F0aW9uc19hZnRlcl9hc3NlcnRANQogICAgYnl0ZWNfMyAvLyAiRVJSOmVyclluY3IiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyWW5jcgoKY3JlYXRlQXNhVXNlckFsbG9jYXRpb25zX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozODgKICAgIC8vIGxvZ2dlZEFzc2VydCghZmluYWxpemVkLCBlcnJEaXNidXJzZW1lbnRBbHJlYWR5RmluYWwpCiAgICBieiBjcmVhdGVBc2FVc2VyQWxsb2NhdGlvbnNfYWZ0ZXJfYXNzZXJ0QDcKICAgIGJ5dGVjIDcgLy8gIkVSUjplcnJEYmFmIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckRiYWYKCmNyZWF0ZUFzYVVzZXJBbGxvY2F0aW9uc19hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzkwCiAgICAvLyBjb25zdCBhc3NldCA9IGFzc2V0WGZlci54ZmVyQXNzZXQuaWQKICAgIGRpZyAyCiAgICBndHhucyBYZmVyQXNzZXQKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzkxCiAgICAvLyBsZXQgbWF0Y2hTdW06IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjM5MgogICAgLy8gbGV0IG5ld0JveGVzOiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozOTMKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBhbGxvY2F0aW9ucy5sZW5ndGg7IGkgKz0gMSkgewogICAgaW50Y18wIC8vIDAKCmNyZWF0ZUFzYVVzZXJBbGxvY2F0aW9uc193aGlsZV90b3BAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MzkzCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgYWxsb2NhdGlvbnMubGVuZ3RoOyBpICs9IDEpIHsKICAgIGR1cAogICAgZGlnIDgKICAgIDwKICAgIGJ6IGNyZWF0ZUFzYVVzZXJBbGxvY2F0aW9uc19hZnRlcl93aGlsZUAxMAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozOTQKICAgIC8vIG5ld0JveGVzICs9IHRoaXMud3JpdGVBbGxvY2F0aW9uKGlkLCBhbGxvY2F0aW9uc1tpXS5hZGRyZXNzLCBhc3NldCwgYWxsb2NhdGlvbnNbaV0uYW1vdW50KQogICAgZGlnIDEKICAgIGV4dHJhY3QgMiAwCiAgICBkaWcgMQogICAgcHVzaGludCA0MAogICAgKgogICAgcHVzaGludCA0MAogICAgZXh0cmFjdDMgLy8gb24gZXJyb3I6IGluZGV4IGFjY2VzcyBpcyBvdXQgb2YgYm91bmRzCiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgc3dhcAogICAgcHVzaGludCAzMgogICAgZXh0cmFjdF91aW50NjQKICAgIGRpZyA1CiAgICB1bmNvdmVyIDIKICAgIGRpZyA5CiAgICBkaWcgMwogICAgY2FsbHN1YiB3cml0ZUFsbG9jYXRpb24KICAgIHVuY292ZXIgNAogICAgKwogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozOTUKICAgIC8vIG1hdGNoU3VtICs9IGFsbG9jYXRpb25zW2ldLmFtb3VudAogICAgdW5jb3ZlciA2CiAgICArCiAgICBjb3ZlciA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjM5MwogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGFsbG9jYXRpb25zLmxlbmd0aDsgaSArPSAxKSB7CiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgYiBjcmVhdGVBc2FVc2VyQWxsb2NhdGlvbnNfd2hpbGVfdG9wQDgKCmNyZWF0ZUFzYVVzZXJBbGxvY2F0aW9uc19hZnRlcl93aGlsZUAxMDoKICAgIHBvcG4gMgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czozOTgKICAgIC8vIHRoaXMudXNlTWJyQ3JlZGl0KGlkLCBVc2VyQWxsb2NhdGlvbk1CUiAqIG5ld0JveGVzKQogICAgaW50YyA0IC8vIDI1MzAwCiAgICAqCiAgICBjYWxsc3ViIHVzZU1ickNyZWRpdAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0MDAKICAgIC8vIGFzc2VydEJvdW5kQXNzZXRUcmFuc2Zlcihhc3NldFhmZXIsIFR4bi5zZW5kZXIsIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBhc3NldFhmZXIueGZlckFzc2V0LCBtYXRjaFN1bSkKICAgIHR4biBTZW5kZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICB1bmNvdmVyIDQKICAgIHVuY292ZXIgNAogICAgY2FsbHN1YiBhc3NlcnRCb3VuZEFzc2V0VHJhbnNmZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6Mzc5LTM4MwogICAgLy8gY3JlYXRlQXNhVXNlckFsbG9jYXRpb25zKAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgaWQ6IHVpbnQ2NCwKICAgIC8vICAgYWxsb2NhdGlvbnM6IFVzZXJBbGxvY2F0aW9uW10KICAgIC8vICk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6OlJld2FyZHMuY3JlYXRlQXNhRGlzYnVyc2VtZW50RnJvbUdyb3VwW3JvdXRpbmddKCkgLT4gdm9pZDoKY3JlYXRlQXNhRGlzYnVyc2VtZW50RnJvbUdyb3VwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0MTItNDIwCiAgICAvLyBjcmVhdGVBc2FEaXNidXJzZW1lbnRGcm9tR3JvdXAoCiAgICAvLyAgIG1iclBheW1lbnRJbmRleDogdWludDY0LAogICAgLy8gICBhc3NldFRyYW5zZmVyU3RhcnRJbmRleDogdWludDY0LAogICAgLy8gICB0aXRsZTogc3RyaW5nLAogICAgLy8gICB0aW1lVG9VbmxvY2s6IHVpbnQ2NCwKICAgIC8vICAgZXhwaXJhdGlvbjogdWludDY0LAogICAgLy8gICBub3RlOiBzdHJpbmcsCiAgICAvLyAgIGFsbG9jYXRpb25zOiBVc2VyQWxsb2NhdGlvbltdCiAgICAvLyApOiB1aW50NjQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIGNvdmVyIDIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDUKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDYKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBjb3ZlciAzCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA3CiAgICBkdXAKICAgIGNvdmVyIDcKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGR1cAogICAgY292ZXIgMgogICAgZHVwCiAgICBwdXNoaW50IDQwCiAgICAqCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgdW5jb3ZlciAyCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxzbWFydF9jb250cmFjdHMvcmV3YXJkcy90eXBlcy50czo6VXNlckFsbG9jYXRpb24+CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQyMgogICAgLy8gbG9nZ2VkQXNzZXJ0KGNvdW50ID4gMCwgZXJyRGlzYnVyc2VtZW50c011c3RIYXZlQWxsb2NhdGlvbnMpCiAgICBibnogY3JlYXRlQXNhRGlzYnVyc2VtZW50RnJvbUdyb3VwX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA4IC8vICJFUlI6ZXJyRGJtYSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJEYm1hCgpjcmVhdGVBc2FEaXNidXJzZW1lbnRGcm9tR3JvdXBfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQyMwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5ncm91cEluZGV4ID4gY291bnQsIGVyckludmFsaWRHcm91cEluZGV4KQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGRpZyAxCiAgICA+CiAgICBibnogY3JlYXRlQXNhRGlzYnVyc2VtZW50RnJvbUdyb3VwX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyAxMiAvLyAiRVJSOmVycklnaXgiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySWdpeAoKY3JlYXRlQXNhRGlzYnVyc2VtZW50RnJvbUdyb3VwX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0MjQKICAgIC8vIGxvZ2dlZEFzc2VydChhc3NldFRyYW5zZmVyU3RhcnRJbmRleCA9PT0gVHhuLmdyb3VwSW5kZXggLSBjb3VudCwgZXJySW52YWxpZEdyb3VwSW5kZXgpCiAgICB0eG4gR3JvdXBJbmRleAogICAgZGlnIDEKICAgIC0KICAgIGRpZyAyCiAgICA9PQogICAgYm56IGNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cF9hZnRlcl9hc3NlcnRANwogICAgYnl0ZWMgMTIgLy8gIkVSUjplcnJJZ2l4IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklnaXgKCmNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cF9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDI1CiAgICAvLyBsb2dnZWRBc3NlcnQobWJyUGF5bWVudEluZGV4ID09PSBhc3NldFRyYW5zZmVyU3RhcnRJbmRleCAtIDEsIGVyckludmFsaWRHcm91cEluZGV4KQogICAgZGlnIDEKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkaWcgNgogICAgPT0KICAgIGJueiBjcmVhdGVBc2FEaXNidXJzZW1lbnRGcm9tR3JvdXBfYWZ0ZXJfYXNzZXJ0QDkKICAgIGJ5dGVjIDEyIC8vICJFUlI6ZXJySWdpeCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJZ2l4CgpjcmVhdGVBc2FEaXNidXJzZW1lbnRGcm9tR3JvdXBfYWZ0ZXJfYXNzZXJ0QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQyNwogICAgLy8gdGhpcy5hc3NlcnRWYWxpZFVubG9jayh0aW1lVG9VbmxvY2spCiAgICB1bmNvdmVyIDMKICAgIGR1cAogICAgY2FsbHN1YiBhc3NlcnRWYWxpZFVubG9jawogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0MjgKICAgIC8vIHRoaXMuYXNzZXJ0VmFsaWRFeHBpcmF0aW9uKGV4cGlyYXRpb24pCiAgICB1bmNvdmVyIDMKICAgIGR1cAogICAgY292ZXIgMgogICAgY2FsbHN1YiBhc3NlcnRWYWxpZEV4cGlyYXRpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDMwCiAgICAvLyBjb25zdCBpZCA9IHRoaXMubmV3RGlzYnVyc2VtZW50SUQoKQogICAgY2FsbHN1YiBuZXdEaXNidXJzZW1lbnRJRAogICAgZHVwCiAgICBjb3ZlciAzCiAgICBjb3ZlciA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQzMQogICAgLy8gY29uc3QgcGF5bWVudCA9IGd0eG4uUGF5bWVudFR4bihtYnJQYXltZW50SW5kZXgpCiAgICB1bmNvdmVyIDcKICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDMzCiAgICAvLyBjb25zdCBjb3N0cyA9IHRoaXMubWJyKHRpdGxlLCBub3RlKQogICAgdW5jb3ZlciA4CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIHVuY292ZXIgOQogICAgZHVwCiAgICBjb3ZlciA2CiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2Jhc2UudHM6OkJhc2VSZXdhcmRzLm1icgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0MzQKICAgIC8vIGNvbnN0IGRpc2J1cnNlbWVudE1ickFtb3VudCA9IGNvc3RzLmRpc2J1cnNlbWVudHMKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQzNQogICAgLy8gY29uc3QgYWxsb2NhdGlvbk1ickFtb3VudDogdWludDY0ID0gY29zdHMudXNlckFsbG9jYXRpb25zICogY291bnQKICAgIHN3YXAKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZGlnIDgKICAgICoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDM4CiAgICAvLyBhc3NlcnRCb3VuZFBheW1lbnQocGF5bWVudCwgVHhuLnNlbmRlciwgR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGRpc2J1cnNlbWVudE1ickFtb3VudCArIGFsbG9jYXRpb25NYnJBbW91bnQpCiAgICB0eG4gU2VuZGVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgdW5jb3ZlciAzCiAgICBkaWcgMwogICAgKwogICAgdW5jb3ZlciA0CiAgICBjb3ZlciAzCiAgICBjYWxsc3ViIGFzc2VydEJvdW5kUGF5bWVudAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0NDEKICAgIC8vIGNyZWF0b3I6IFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ1MAogICAgLy8gcmVjbGFpbVRvOiBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDQwLTQ1MgogICAgLy8gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZSA9IHsKICAgIC8vICAgY3JlYXRvcjogVHhuLnNlbmRlciwKICAgIC8vICAgZmluYWxpemVkOiBmYWxzZSwKICAgIC8vICAgdGl0bGUsCiAgICAvLyAgIGFtb3VudDogMCwKICAgIC8vICAgdGltZVRvVW5sb2NrLAogICAgLy8gICBleHBpcmF0aW9uLAogICAgLy8gICBhbGxvY2F0aW9uczogMCwKICAgIC8vICAgZGlzdHJpYnV0ZWQ6IDAsCiAgICAvLyAgIG1ickNyZWRpdHM6IGFsbG9jYXRpb25NYnJBbW91bnQsCiAgICAvLyAgIHJlY2xhaW1UbzogR2xvYmFsLnplcm9BZGRyZXNzLAogICAgLy8gICBub3RlLAogICAgLy8gfQogICAgZGlnIDMKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHVuY292ZXIgNAogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGJ5dGVjIDIwIC8vIDB4MDAwMDc1CiAgICBjb25jYXQKICAgIGRpZyAxCiAgICBsZW4KICAgIHB1c2hpbnQgMTE3CiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ0NAogICAgLy8gYW1vdW50OiAwLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDQwLTQ1MgogICAgLy8gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZSA9IHsKICAgIC8vICAgY3JlYXRvcjogVHhuLnNlbmRlciwKICAgIC8vICAgZmluYWxpemVkOiBmYWxzZSwKICAgIC8vICAgdGl0bGUsCiAgICAvLyAgIGFtb3VudDogMCwKICAgIC8vICAgdGltZVRvVW5sb2NrLAogICAgLy8gICBleHBpcmF0aW9uLAogICAgLy8gICBhbGxvY2F0aW9uczogMCwKICAgIC8vICAgZGlzdHJpYnV0ZWQ6IDAsCiAgICAvLyAgIG1ickNyZWRpdHM6IGFsbG9jYXRpb25NYnJBbW91bnQsCiAgICAvLyAgIHJlY2xhaW1UbzogR2xvYmFsLnplcm9BZGRyZXNzLAogICAgLy8gICBub3RlLAogICAgLy8gfQogICAgaXRvYgogICAgdW5jb3ZlciAyCiAgICBkaWcgMQogICAgY29uY2F0CiAgICB1bmNvdmVyIDYKICAgIGl0b2IKICAgIGNvbmNhdAogICAgdW5jb3ZlciA2CiAgICBpdG9iCiAgICBjb25jYXQKICAgIGRpZyAxCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgdW5jb3ZlciA0CiAgICBpdG9iCiAgICBjb25jYXQKICAgIHVuY292ZXIgMwogICAgY29uY2F0CiAgICBkaWcgMwogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgdW5jb3ZlciA0CiAgICBjb25jYXQKICAgIHVuY292ZXIgMgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ0MAogICAgLy8gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZSA9IHsKICAgIHN3YXAKICAgIGl0b2IKICAgIGR1cAogICAgY292ZXIgNAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo4MAogICAgLy8gZGlzYnVyc2VtZW50cyA9IEJveE1hcDx1aW50NjQsIERpc2J1cnNlbWVudERldGFpbHM+KHsga2V5UHJlZml4OiBSZXdhcmRzQm94UHJlZml4RGlzYnVyc2VtZW50cyB9KQogICAgYnl0ZWNfMCAvLyAiZCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ0MC00NTIKICAgIC8vIHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUgPSB7CiAgICAvLyAgIGNyZWF0b3I6IFR4bi5zZW5kZXIsCiAgICAvLyAgIGZpbmFsaXplZDogZmFsc2UsCiAgICAvLyAgIHRpdGxlLAogICAgLy8gICBhbW91bnQ6IDAsCiAgICAvLyAgIHRpbWVUb1VubG9jaywKICAgIC8vICAgZXhwaXJhdGlvbiwKICAgIC8vICAgYWxsb2NhdGlvbnM6IDAsCiAgICAvLyAgIGRpc3RyaWJ1dGVkOiAwLAogICAgLy8gICBtYnJDcmVkaXRzOiBhbGxvY2F0aW9uTWJyQW1vdW50LAogICAgLy8gICByZWNsYWltVG86IEdsb2JhbC56ZXJvQWRkcmVzcywKICAgIC8vICAgbm90ZSwKICAgIC8vIH0KICAgIGR1cAogICAgYm94X2RlbAogICAgcG9wCiAgICBzd2FwCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ1NAogICAgLy8gbGV0IG5ld0JveGVzOiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0NTUKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBjb3VudDsgaSArPSAxKSB7CiAgICBpbnRjXzAgLy8gMAogICAgc3dhcAoKY3JlYXRlQXNhRGlzYnVyc2VtZW50RnJvbUdyb3VwX3doaWxlX3RvcEAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDU1CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgY291bnQ7IGkgKz0gMSkgewogICAgZGlnIDEKICAgIGRpZyAzCiAgICA8CiAgICBieiBjcmVhdGVBc2FEaXNidXJzZW1lbnRGcm9tR3JvdXBfYWZ0ZXJfd2hpbGVAMTQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDU2CiAgICAvLyBjb25zdCBhc3NldFhmZXIgPSBndHhuLkFzc2V0VHJhbnNmZXJUeG4oYXNzZXRUcmFuc2ZlclN0YXJ0SW5kZXggKyBpKQogICAgZGlnIDQKICAgIGRpZyAyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgICsKICAgIGR1cAogICAgY292ZXIgMgogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNCAvLyBheGZlcgogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGF4ZmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ1Ny00NTgKICAgIC8vIGNvbnN0IGFsbG9jYXRpb24gPSBjbG9uZShhbGxvY2F0aW9uc1tpXSkKICAgIC8vIGxvZ2dlZEFzc2VydChhbGxvY2F0aW9uLmFtb3VudCA+IDAsIGVyckRpc2J1cnNlbWVudHNDYW5ub3RCZUVtcHR5KQogICAgZGlnIDkKICAgIGV4dHJhY3QgMiAwCiAgICBzd2FwCiAgICBwdXNoaW50IDQwCiAgICAqCiAgICBwdXNoaW50IDQwCiAgICBleHRyYWN0MyAvLyBvbiBlcnJvcjogaW5kZXggYWNjZXNzIGlzIG91dCBvZiBib3VuZHMKICAgIGR1cAogICAgY292ZXIgNgogICAgcHVzaGludCAzMgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0NTgKICAgIC8vIGxvZ2dlZEFzc2VydChhbGxvY2F0aW9uLmFtb3VudCA+IDAsIGVyckRpc2J1cnNlbWVudHNDYW5ub3RCZUVtcHR5KQogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgYm56IGNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cF9hZnRlcl9hc3NlcnRAMTMKICAgIGJ5dGVjIDEzIC8vICJFUlI6ZXJyRGJlbSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJEYmVtCgpjcmVhdGVBc2FEaXNidXJzZW1lbnRGcm9tR3JvdXBfYWZ0ZXJfYXNzZXJ0QDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0NjEKICAgIC8vIFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ2MgogICAgLy8gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0NjMKICAgIC8vIGFzc2V0WGZlci54ZmVyQXNzZXQsCiAgICB1bmNvdmVyIDMKICAgIGR1cAogICAgZ3R4bnMgWGZlckFzc2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ1OS00NjUKICAgIC8vIGFzc2VydEJvdW5kQXNzZXRUcmFuc2ZlcigKICAgIC8vICAgYXNzZXRYZmVyLAogICAgLy8gICBUeG4uc2VuZGVyLAogICAgLy8gICBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgYXNzZXRYZmVyLnhmZXJBc3NldCwKICAgIC8vICAgYWxsb2NhdGlvbi5hbW91bnQKICAgIC8vICkKICAgIHN3YXAKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAzCiAgICBkaWcgMwogICAgZGlnIDUKICAgIGNhbGxzdWIgYXNzZXJ0Qm91bmRBc3NldFRyYW5zZmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ2NgogICAgLy8gbmV3Qm94ZXMgKz0gdGhpcy53cml0ZUFsbG9jYXRpb24oaWQsIGFsbG9jYXRpb24uYWRkcmVzcywgYXNzZXRYZmVyLnhmZXJBc3NldC5pZCwgYWxsb2NhdGlvbi5hbW91bnQpCiAgICB1bmNvdmVyIDYKICAgIGV4dHJhY3QgMCAzMgogICAgZGlnIDkKICAgIHN3YXAKICAgIHVuY292ZXIgMgogICAgdW5jb3ZlciAzCiAgICBjYWxsc3ViIHdyaXRlQWxsb2NhdGlvbgogICAgdW5jb3ZlciA0CiAgICArCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ1NQogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGNvdW50OyBpICs9IDEpIHsKICAgIHN3YXAKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBzd2FwCiAgICBiIGNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cF93aGlsZV90b3BAMTAKCmNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cF9hZnRlcl93aGlsZUAxNDoKICAgIGJ1cnkgMQogICAgYnVyeSAxCiAgICB1bmNvdmVyIDIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0NjkKICAgIC8vIHRoaXMudXNlTWJyQ3JlZGl0KGlkLCBVc2VyQWxsb2NhdGlvbk1CUiAqIG5ld0JveGVzKQogICAgaW50YyA0IC8vIDI1MzAwCiAgICB1bmNvdmVyIDIKICAgICoKICAgIHVuY292ZXIgMwogICAgc3dhcAogICAgY2FsbHN1YiB1c2VNYnJDcmVkaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDcxCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZS5hbW91bnQgPiAwLCBlcnJEaXNidXJzZW1lbnRzQ2Fubm90QmVFbXB0eSkKICAgIGR1cAogICAgcHVzaGludCAzNQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBibnogY3JlYXRlQXNhRGlzYnVyc2VtZW50RnJvbUdyb3VwX2FmdGVyX2Fzc2VydEAxNgogICAgYnl0ZWMgMTMgLy8gIkVSUjplcnJEYmVtIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckRiZW0KCmNyZWF0ZUFzYURpc2J1cnNlbWVudEZyb21Hcm91cF9hZnRlcl9hc3NlcnRAMTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ3MgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUuYWxsb2NhdGlvbnMgPiAwLCBlcnJEaXNidXJzZW1lbnRzTXVzdEhhdmVBbGxvY2F0aW9ucykKICAgIGR1cAogICAgcHVzaGludCA1OQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBibnogY3JlYXRlQXNhRGlzYnVyc2VtZW50RnJvbUdyb3VwX2FmdGVyX2Fzc2VydEAxOAogICAgYnl0ZWMgOCAvLyAiRVJSOmVyckRibWEiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyRGJtYQoKY3JlYXRlQXNhRGlzYnVyc2VtZW50RnJvbUdyb3VwX2FmdGVyX2Fzc2VydEAxODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDc0CiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlLmZpbmFsaXplZCA9IHRydWUKICAgIGR1cAogICAgcHVzaGludCAzMgogICAgaW50Y18xIC8vIDEKICAgIGJveF9leHRyYWN0CiAgICBpbnRjXzAgLy8gMAogICAgaW50Y18xIC8vIDEKICAgIHNldGJpdAogICAgcHVzaGludCAzMgogICAgc3dhcAogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDEyLTQyMAogICAgLy8gY3JlYXRlQXNhRGlzYnVyc2VtZW50RnJvbUdyb3VwKAogICAgLy8gICBtYnJQYXltZW50SW5kZXg6IHVpbnQ2NCwKICAgIC8vICAgYXNzZXRUcmFuc2ZlclN0YXJ0SW5kZXg6IHVpbnQ2NCwKICAgIC8vICAgdGl0bGU6IHN0cmluZywKICAgIC8vICAgdGltZVRvVW5sb2NrOiB1aW50NjQsCiAgICAvLyAgIGV4cGlyYXRpb246IHVpbnQ2NCwKICAgIC8vICAgbm90ZTogc3RyaW5nLAogICAgLy8gICBhbGxvY2F0aW9uczogVXNlckFsbG9jYXRpb25bXQogICAgLy8gKTogdWludDY0IHsKICAgIGJ5dGVjXzIgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjpSZXdhcmRzLmZpbmFsaXplRGlzYnVyc2VtZW50W3JvdXRpbmddKCkgLT4gdm9pZDoKZmluYWxpemVEaXNidXJzZW1lbnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ3OQogICAgLy8gZmluYWxpemVEaXNidXJzZW1lbnQoaWQ6IHVpbnQ2NCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0ODAKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmRpc2J1cnNlbWVudHMoaWQpLmV4aXN0cywgZXJyRGlzYnVyc2VtZW50RG9lc05vdEV4aXN0KQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo4MAogICAgLy8gZGlzYnVyc2VtZW50cyA9IEJveE1hcDx1aW50NjQsIERpc2J1cnNlbWVudERldGFpbHM+KHsga2V5UHJlZml4OiBSZXdhcmRzQm94UHJlZml4RGlzYnVyc2VtZW50cyB9KQogICAgYnl0ZWNfMCAvLyAiZCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ4MAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZGlzYnVyc2VtZW50cyhpZCkuZXhpc3RzLCBlcnJEaXNidXJzZW1lbnREb2VzTm90RXhpc3QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBmaW5hbGl6ZURpc2J1cnNlbWVudF9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWNfMSAvLyAiRVJSOmVyckRibmUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyRGJuZQoKZmluYWxpemVEaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ4MgogICAgLy8gY29uc3QgeyBjcmVhdG9yLCBmaW5hbGl6ZWQsIHRpbWVUb1VubG9jaywgZXhwaXJhdGlvbiwgYW1vdW50LCBhbGxvY2F0aW9ucyB9ID0gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZQogICAgZHVwbiAyCiAgICBpbnRjXzAgLy8gMAogICAgcHVzaGludCAzMgogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGRpZyAxCiAgICBwdXNoaW50IDMyCiAgICBpbnRjXzEgLy8gMQogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIGNvdmVyIDMKICAgIGRpZyAxCiAgICBwdXNoaW50IDQzCiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGNvdmVyIDMKICAgIGRpZyAxCiAgICBwdXNoaW50IDUxCiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGNvdmVyIDMKICAgIGRpZyAxCiAgICBwdXNoaW50IDM1CiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGNvdmVyIDMKICAgIHN3YXAKICAgIHB1c2hpbnQgNTkKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0ODMKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSBjcmVhdG9yLCBlcnJZb3VBcmVOb3RUaGVDcmVhdG9yKQogICAgdHhuIFNlbmRlcgogICAgPT0KICAgIGJueiBmaW5hbGl6ZURpc2J1cnNlbWVudF9hZnRlcl9hc3NlcnRANQogICAgYnl0ZWNfMyAvLyAiRVJSOmVyclluY3IiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyWW5jcgoKZmluYWxpemVEaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ4NAogICAgLy8gbG9nZ2VkQXNzZXJ0KCFmaW5hbGl6ZWQsIGVyckRpc2J1cnNlbWVudEFscmVhZHlGaW5hbCkKICAgIHVuY292ZXIgNQogICAgYnogZmluYWxpemVEaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDcKICAgIGJ5dGVjIDcgLy8gIkVSUjplcnJEYmFmIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckRiYWYKCmZpbmFsaXplRGlzYnVyc2VtZW50X2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0ODUKICAgIC8vIHRoaXMuYXNzZXJ0VmFsaWRVbmxvY2sodGltZVRvVW5sb2NrKQogICAgdW5jb3ZlciA0CiAgICBjYWxsc3ViIGFzc2VydFZhbGlkVW5sb2NrCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjQ4NgogICAgLy8gdGhpcy5hc3NlcnRWYWxpZEV4cGlyYXRpb24oZXhwaXJhdGlvbikKICAgIHVuY292ZXIgMwogICAgY2FsbHN1YiBhc3NlcnRWYWxpZEV4cGlyYXRpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDg3CiAgICAvLyBsb2dnZWRBc3NlcnQoYW1vdW50ID4gMCwgZXJyRGlzYnVyc2VtZW50c0Nhbm5vdEJlRW1wdHkpCiAgICB1bmNvdmVyIDIKICAgIGJueiBmaW5hbGl6ZURpc2J1cnNlbWVudF9hZnRlcl9hc3NlcnRAOQogICAgYnl0ZWMgMTMgLy8gIkVSUjplcnJEYmVtIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckRiZW0KCmZpbmFsaXplRGlzYnVyc2VtZW50X2FmdGVyX2Fzc2VydEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0ODgKICAgIC8vIGxvZ2dlZEFzc2VydChhbGxvY2F0aW9ucyA+IDAsIGVyckRpc2J1cnNlbWVudHNNdXN0SGF2ZUFsbG9jYXRpb25zKQogICAgYm56IGZpbmFsaXplRGlzYnVyc2VtZW50X2FmdGVyX2Fzc2VydEAxMQogICAgYnl0ZWMgOCAvLyAiRVJSOmVyckRibWEiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyRGJtYQoKZmluYWxpemVEaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0OTAKICAgIC8vIHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUuZmluYWxpemVkID0gdHJ1ZQogICAgZHVwCiAgICBwdXNoaW50IDMyCiAgICBpbnRjXzEgLy8gMQogICAgYm94X2V4dHJhY3QKICAgIGludGNfMCAvLyAwCiAgICBpbnRjXzEgLy8gMQogICAgc2V0Yml0CiAgICBwdXNoaW50IDMyCiAgICBzd2FwCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0NzkKICAgIC8vIGZpbmFsaXplRGlzYnVyc2VtZW50KGlkOiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjpSZXdhcmRzLmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRbcm91dGluZ10oKSAtPiB2b2lkOgpjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo0OTktNTA1CiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICBtYnJQYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIHRpbWVUb1VubG9jazogdWludDY0LAogICAgLy8gICBleHBpcmF0aW9uOiB1aW50NjQsCiAgICAvLyAgIGFsbG9jYXRpb25zOiBVc2VyQWxsb2NhdGlvbltdLAogICAgLy8gICByZWNsYWltVG86IEFjY291bnQKICAgIC8vICk6IHVpbnQ2NCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgNDAKICAgICoKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8c21hcnRfY29udHJhY3RzL3Jld2FyZHMvdHlwZXMudHM6OlVzZXJBbGxvY2F0aW9uPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1MDYKICAgIC8vIGNvbnN0IHsgaWQsIHN1bSwgbWJyQW1vdW50IH0gPSB0aGlzLm5ld0luc3RhbnREaXNidXJzZW1lbnQoMCwgdGltZVRvVW5sb2NrLCBleHBpcmF0aW9uLCBhbGxvY2F0aW9ucywgcmVjbGFpbVRvKQogICAgaW50Y18wIC8vIDAKICAgIGNvdmVyIDQKICAgIGNhbGxzdWIgbmV3SW5zdGFudERpc2J1cnNlbWVudAogICAgcG9wCiAgICBkdXAKICAgIGV4dHJhY3QgMCA4CiAgICBkaWcgMQogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICB1bmNvdmVyIDIKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjUwNwogICAgLy8gYXNzZXJ0Qm91bmRQYXltZW50KG1iclBheW1lbnQsIFR4bi5zZW5kZXIsIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBtYnJBbW91bnQgKyBzdW0pCiAgICB0eG4gU2VuZGVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgdW5jb3ZlciAyCiAgICB1bmNvdmVyIDMKICAgICsKICAgIHVuY292ZXIgNAogICAgY292ZXIgMwogICAgY2FsbHN1YiBhc3NlcnRCb3VuZFBheW1lbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NDk5LTUwNQogICAgLy8gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgbWJyUGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICB0aW1lVG9VbmxvY2s6IHVpbnQ2NCwKICAgIC8vICAgZXhwaXJhdGlvbjogdWludDY0LAogICAgLy8gICBhbGxvY2F0aW9uczogVXNlckFsbG9jYXRpb25bXSwKICAgIC8vICAgcmVjbGFpbVRvOiBBY2NvdW50CiAgICAvLyApOiB1aW50NjQgewogICAgYnl0ZWNfMiAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6OlJld2FyZHMubGVnYWN5Q3JlYXRlSW5zdGFudERpc2J1cnNlbWVudFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmxlZ2FjeUNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjUxNQogICAgLy8gQGFiaW1ldGhvZCh7IG5hbWU6ICdjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50JyB9KQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDQwCiAgICAqCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL3R5cGVzLnRzOjpVc2VyQWxsb2NhdGlvbj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTIyCiAgICAvLyBjb25zdCB7IGlkLCBzdW0sIG1ickFtb3VudCB9ID0gdGhpcy5uZXdJbnN0YW50RGlzYnVyc2VtZW50KDAsIHRpbWVUb1VubG9jaywgZXhwaXJhdGlvbiwgYWxsb2NhdGlvbnMsIEdsb2JhbC56ZXJvQWRkcmVzcykKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgaW50Y18wIC8vIDAKICAgIGNvdmVyIDQKICAgIGNhbGxzdWIgbmV3SW5zdGFudERpc2J1cnNlbWVudAogICAgcG9wCiAgICBkdXAKICAgIGV4dHJhY3QgMCA4CiAgICBkaWcgMQogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICB1bmNvdmVyIDIKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjUyMwogICAgLy8gYXNzZXJ0Qm91bmRQYXltZW50KG1iclBheW1lbnQsIFR4bi5zZW5kZXIsIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBtYnJBbW91bnQgKyBzdW0pCiAgICB0eG4gU2VuZGVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgdW5jb3ZlciAyCiAgICB1bmNvdmVyIDMKICAgICsKICAgIHVuY292ZXIgNAogICAgY292ZXIgMwogICAgY2FsbHN1YiBhc3NlcnRCb3VuZFBheW1lbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTE1CiAgICAvLyBAYWJpbWV0aG9kKHsgbmFtZTogJ2NyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQnIH0pCiAgICBieXRlY18yIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo6UmV3YXJkcy5jcmVhdGVJbnN0YW50QXNhRGlzYnVyc2VtZW50W3JvdXRpbmddKCkgLT4gdm9pZDoKY3JlYXRlSW5zdGFudEFzYURpc2J1cnNlbWVudDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTI4LTUzNQogICAgLy8gY3JlYXRlSW5zdGFudEFzYURpc2J1cnNlbWVudCgKICAgIC8vICAgbWJyUGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgdGltZVRvVW5sb2NrOiB1aW50NjQsCiAgICAvLyAgIGV4cGlyYXRpb246IHVpbnQ2NCwKICAgIC8vICAgYWxsb2NhdGlvbnM6IFVzZXJBbGxvY2F0aW9uW10sCiAgICAvLyAgIHJlY2xhaW1UbzogQWNjb3VudAogICAgLy8gKTogdWludDY0IHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzMgLy8gMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDQgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCA0MAogICAgKgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxzbWFydF9jb250cmFjdHMvcmV3YXJkcy90eXBlcy50czo6VXNlckFsbG9jYXRpb24+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjUzNgogICAgLy8gY29uc3QgeyBpZCwgc3VtLCBtYnJBbW91bnQgfSA9IHRoaXMubmV3SW5zdGFudERpc2J1cnNlbWVudChhc3NldFhmZXIueGZlckFzc2V0LmlkLCB0aW1lVG9VbmxvY2ssIGV4cGlyYXRpb24sIGFsbG9jYXRpb25zLCByZWNsYWltVG8pCiAgICBkaWcgNAogICAgZ3R4bnMgWGZlckFzc2V0CiAgICBjb3ZlciA0CiAgICBjYWxsc3ViIG5ld0luc3RhbnREaXNidXJzZW1lbnQKICAgIHBvcAogICAgZHVwCiAgICBleHRyYWN0IDAgOAogICAgZGlnIDEKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgdW5jb3ZlciAyCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1MzcKICAgIC8vIGFzc2VydEJvdW5kUGF5bWVudChtYnJQYXltZW50LCBUeG4uc2VuZGVyLCBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgbWJyQW1vdW50KQogICAgdHhuIFNlbmRlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIHVuY292ZXIgNgogICAgY292ZXIgMgogICAgdW5jb3ZlciAzCiAgICBjYWxsc3ViIGFzc2VydEJvdW5kUGF5bWVudAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1MzgKICAgIC8vIHRoaXMuYXNzZXJ0SW5ib3VuZEFzc2V0VHJhbnNmZXIoYXNzZXRYZmVyLCBzdW0pCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGNhbGxzdWIgYXNzZXJ0SW5ib3VuZEFzc2V0VHJhbnNmZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTI4LTUzNQogICAgLy8gY3JlYXRlSW5zdGFudEFzYURpc2J1cnNlbWVudCgKICAgIC8vICAgbWJyUGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgdGltZVRvVW5sb2NrOiB1aW50NjQsCiAgICAvLyAgIGV4cGlyYXRpb246IHVpbnQ2NCwKICAgIC8vICAgYWxsb2NhdGlvbnM6IFVzZXJBbGxvY2F0aW9uW10sCiAgICAvLyAgIHJlY2xhaW1UbzogQWNjb3VudAogICAgLy8gKTogdWludDY0IHsKICAgIGJ5dGVjXzIgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjpSZXdhcmRzLmxlZ2FjeUNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnRbcm91dGluZ10oKSAtPiB2b2lkOgpsZWdhY3lDcmVhdGVJbnN0YW50QXNhRGlzYnVyc2VtZW50OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1NDMKICAgIC8vIEBhYmltZXRob2QoeyBuYW1lOiAnY3JlYXRlSW5zdGFudEFzYURpc2J1cnNlbWVudCcgfSkKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzMgLy8gMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDQgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCA0MAogICAgKgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxzbWFydF9jb250cmFjdHMvcmV3YXJkcy90eXBlcy50czo6VXNlckFsbG9jYXRpb24+CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjU1MQogICAgLy8gY29uc3QgeyBpZCwgc3VtLCBtYnJBbW91bnQgfSA9IHRoaXMubmV3SW5zdGFudERpc2J1cnNlbWVudChhc3NldFhmZXIueGZlckFzc2V0LmlkLCB0aW1lVG9VbmxvY2ssIGV4cGlyYXRpb24sIGFsbG9jYXRpb25zLCBHbG9iYWwuemVyb0FkZHJlc3MpCiAgICBkaWcgMwogICAgZ3R4bnMgWGZlckFzc2V0CiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgIHN3YXAKICAgIGNvdmVyIDQKICAgIGNhbGxzdWIgbmV3SW5zdGFudERpc2J1cnNlbWVudAogICAgcG9wCiAgICBkdXAKICAgIGV4dHJhY3QgMCA4CiAgICBkaWcgMQogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICB1bmNvdmVyIDIKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjU1MgogICAgLy8gYXNzZXJ0Qm91bmRQYXltZW50KG1iclBheW1lbnQsIFR4bi5zZW5kZXIsIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBtYnJBbW91bnQpCiAgICB0eG4gU2VuZGVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgdW5jb3ZlciA2CiAgICBjb3ZlciAyCiAgICB1bmNvdmVyIDMKICAgIGNhbGxzdWIgYXNzZXJ0Qm91bmRQYXltZW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjU1MwogICAgLy8gdGhpcy5hc3NlcnRJbmJvdW5kQXNzZXRUcmFuc2Zlcihhc3NldFhmZXIsIHN1bSkKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgY2FsbHN1YiBhc3NlcnRJbmJvdW5kQXNzZXRUcmFuc2ZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1NDMKICAgIC8vIEBhYmltZXRob2QoeyBuYW1lOiAnY3JlYXRlSW5zdGFudEFzYURpc2J1cnNlbWVudCcgfSkKICAgIGJ5dGVjXzIgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjpSZXdhcmRzLmNsYWltUmV3YXJkc1tyb3V0aW5nXSgpIC0+IHZvaWQ6CmNsYWltUmV3YXJkczoKICAgIHB1c2hieXRlcyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1NTcKICAgIC8vIGNsYWltUmV3YXJkcyhyZXdhcmRzOiBDbGFpbURldGFpbHNbXSk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwbiAyCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBwdXNoaW50IDE2CiAgICAqCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8c21hcnRfY29udHJhY3RzL3Jld2FyZHMvdHlwZXMudHM6OkNsYWltRGV0YWlscz4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTU4CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgcmV3YXJkcy5sZW5ndGg7IGkgKz0gMSkgewogICAgaW50Y18wIC8vIDAKCmNsYWltUmV3YXJkc193aGlsZV90b3BAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTU4CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgcmV3YXJkcy5sZW5ndGg7IGkgKz0gMSkgewogICAgZHVwCiAgICBkaWcgMgogICAgPAogICAgYnogY2xhaW1SZXdhcmRzX2FmdGVyX3doaWxlQDI1CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjU1OQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZGlzYnVyc2VtZW50cyhyZXdhcmRzW2ldLmlkKS5leGlzdHMsIGVyckRpc2J1cnNlbWVudERvZXNOb3RFeGlzdCkKICAgIGRpZyAyCiAgICBleHRyYWN0IDIgMAogICAgZGlnIDEKICAgIHB1c2hpbnQgMTYKICAgICoKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3QzIC8vIG9uIGVycm9yOiBpbmRleCBhY2Nlc3MgaXMgb3V0IG9mIGJvdW5kcwogICAgZHVwCiAgICBjb3ZlciA0CiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgY292ZXIgNQogICAgaXRvYgogICAgZHVwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjgwCiAgICAvLyBkaXNidXJzZW1lbnRzID0gQm94TWFwPHVpbnQ2NCwgRGlzYnVyc2VtZW50RGV0YWlscz4oeyBrZXlQcmVmaXg6IFJld2FyZHNCb3hQcmVmaXhEaXNidXJzZW1lbnRzIH0pCiAgICBieXRlY18wIC8vICJkIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTU5CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5kaXNidXJzZW1lbnRzKHJld2FyZHNbaV0uaWQpLmV4aXN0cywgZXJyRGlzYnVyc2VtZW50RG9lc05vdEV4aXN0KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogY2xhaW1SZXdhcmRzX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlY18xIC8vICJFUlI6ZXJyRGJuZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJEYm5lCgpjbGFpbVJld2FyZHNfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjU2MQogICAgLy8gY29uc3QgeyBmaW5hbGl6ZWQsIHRpbWVUb1VubG9jaywgZXhwaXJhdGlvbiwgYW1vdW50LCBkaXN0cmlidXRlZCwgbm90ZSB9ID0gdGhpcy5kaXNidXJzZW1lbnRzKHJld2FyZHNbaV0uaWQpLnZhbHVlCiAgICBkaWcgMQogICAgZHVwCiAgICBwdXNoaW50IDMyCiAgICBpbnRjXzEgLy8gMQogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIGRpZyAxCiAgICBwdXNoaW50IDQzCiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGNvdmVyIDgKICAgIGRpZyAxCiAgICBwdXNoaW50IDUxCiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGJ1cnkgMTEKICAgIGRpZyAxCiAgICBwdXNoaW50IDM1CiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGNvdmVyIDQKICAgIGRpZyAxCiAgICBwdXNoaW50IDY3CiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGNvdmVyIDQKICAgIGRpZyAxCiAgICBwdXNoaW50IDExNQogICAgaW50Y18zIC8vIDIKICAgIGJveF9leHRyYWN0CiAgICBidG9pCiAgICBkaWcgMgogICAgZGlnIDEKICAgIGludGNfMyAvLyAyCiAgICBib3hfZXh0cmFjdAogICAgYnRvaQogICAgaW50Y18zIC8vIDIKICAgICsKICAgIHVuY292ZXIgMwogICAgY292ZXIgMgogICAgYm94X2V4dHJhY3QKICAgIGV4dHJhY3QgMiAwCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjU2MgogICAgLy8gbG9nZ2VkQXNzZXJ0KGZpbmFsaXplZCwgZXJyRGlzYnVyc2VtZW50Tm90RmluYWwpCiAgICBibnogY2xhaW1SZXdhcmRzX2FmdGVyX2Fzc2VydEA3CiAgICBieXRlYyAxNCAvLyAiRVJSOmVyckRibmwiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyRGJubAoKY2xhaW1SZXdhcmRzX2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1NjMKICAgIC8vIGxvZ2dlZEFzc2VydCh0aW1lVG9VbmxvY2sgPD0gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwgZXJyRGlzYnVyc2VtZW50TG9ja2VkKQogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgdW5jb3ZlciAxMAogICAgPj0KICAgIGJueiBjbGFpbVJld2FyZHNfYWZ0ZXJfYXNzZXJ0QDkKICAgIGJ5dGVjIDIxIC8vICJFUlI6ZXJyRGJsayIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJEYmxrCgpjbGFpbVJld2FyZHNfYWZ0ZXJfYXNzZXJ0QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjU2NQogICAgLy8gbG9nZ2VkQXNzZXJ0KGV4cGlyYXRpb24gPT09IDAgfHwgZXhwaXJhdGlvbiA+PSBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLCBlcnJEaXNidXJzZW1lbnRMb2NrZWQpCiAgICBkaWcgMTAKICAgIGJ6IGNsYWltUmV3YXJkc19ib29sX3RydWVAMTEKICAgIGRpZyAxMAogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgPj0KICAgIGJ6IGNsYWltUmV3YXJkc19ib29sX2ZhbHNlQDEyCgpjbGFpbVJld2FyZHNfYm9vbF90cnVlQDExOgogICAgaW50Y18xIC8vIDEKCmNsYWltUmV3YXJkc19ib29sX21lcmdlQDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1NjUKICAgIC8vIGxvZ2dlZEFzc2VydChleHBpcmF0aW9uID09PSAwIHx8IGV4cGlyYXRpb24gPj0gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwgZXJyRGlzYnVyc2VtZW50TG9ja2VkKQogICAgYm56IGNsYWltUmV3YXJkc19hZnRlcl9hc3NlcnRAMTUKICAgIGJ5dGVjIDIxIC8vICJFUlI6ZXJyRGJsayIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJEYmxrCgpjbGFpbVJld2FyZHNfYWZ0ZXJfYXNzZXJ0QDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1NjYKICAgIC8vIGxvZ2dlZEFzc2VydChhbW91bnQgPiBkaXN0cmlidXRlZCwgZXJyRGlzYnVyc2VtZW50RnVsbHlEaXN0cmlidXRlZCkKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciA0CiAgICA+CiAgICBibnogY2xhaW1SZXdhcmRzX2FmdGVyX2Fzc2VydEAxNwogICAgcHVzaGJ5dGVzICJFUlI6ZXJyRGJmZCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJEYmZkCgpjbGFpbVJld2FyZHNfYWZ0ZXJfYXNzZXJ0QDE3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1NzAKICAgIC8vIGFkZHJlc3M6IFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjU3MQogICAgLy8gYXNzZXQ6IHJld2FyZHNbaV0uYXNzZXQsCiAgICB1bmNvdmVyIDcKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBjb3ZlciA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjU2OC01NzIKICAgIC8vIGNvbnN0IHVzZXJBbGxvY2F0aW9uc0tleTogVXNlckFsbG9jYXRpb25zS2V5ID0gewogICAgLy8gICBkaXNidXJzZW1lbnRJRDogcmV3YXJkc1tpXS5pZCwKICAgIC8vICAgYWRkcmVzczogVHhuLnNlbmRlciwKICAgIC8vICAgYXNzZXQ6IHJld2FyZHNbaV0uYXNzZXQsCiAgICAvLyB9CiAgICBpdG9iCiAgICBjb25jYXQKICAgIHVuY292ZXIgNAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjg2CiAgICAvLyB1c2VyQWxsb2NhdGlvbnMgPSBCb3hNYXA8VXNlckFsbG9jYXRpb25zS2V5LCB1aW50NjQ+KHsga2V5UHJlZml4OiBSZXdhcmRzQm94UHJlZml4VXNlckFsbG9jYXRpb25zIH0pCiAgICBieXRlYyA5IC8vICJ1IgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTczCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy51c2VyQWxsb2NhdGlvbnModXNlckFsbG9jYXRpb25zS2V5KS5leGlzdHMsIGVyckFsbG9jYXRpb25Eb2VzTm90RXhpc3QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBjbGFpbVJld2FyZHNfYWZ0ZXJfYXNzZXJ0QDE5CiAgICBieXRlYyAyMiAvLyAiRVJSOmVyckFsbmUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQWxuZQoKY2xhaW1SZXdhcmRzX2FmdGVyX2Fzc2VydEAxOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTc0CiAgICAvLyBjb25zdCB1c2VyQWxsb2NhdGlvbiA9IHRoaXMudXNlckFsbG9jYXRpb25zKHVzZXJBbGxvY2F0aW9uc0tleSkudmFsdWUKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGJ0b2kKICAgIGR1cAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1NzYKICAgIC8vIHRoaXMuZGlzYnVyc2VtZW50cyhyZXdhcmRzW2ldLmlkKS52YWx1ZS5hbGxvY2F0aW9ucyAtPSAxCiAgICB1bmNvdmVyIDUKICAgIGR1cAogICAgcHVzaGludCA1OQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgaXRvYgogICAgZGlnIDEKICAgIHB1c2hpbnQgNTkKICAgIHVuY292ZXIgMgogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTc3CiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMocmV3YXJkc1tpXS5pZCkudmFsdWUuZGlzdHJpYnV0ZWQgKz0gdXNlckFsbG9jYXRpb24KICAgIGR1cAogICAgcHVzaGludCA2NwogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICB1bmNvdmVyIDIKICAgICsKICAgIGl0b2IKICAgIHB1c2hpbnQgNjcKICAgIHN3YXAKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjU3OAogICAgLy8gdGhpcy51c2VyQWxsb2NhdGlvbnModXNlckFsbG9jYXRpb25zS2V5KS5kZWxldGUoKQogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjEwNwogICAgLy8gdGhpcy5hZGRNYnJDcmVkaXQoaWQsIFVzZXJBbGxvY2F0aW9uTUJSKQogICAgdW5jb3ZlciA2CiAgICBpbnRjIDQgLy8gMjUzMDAKICAgIGNhbGxzdWIgYWRkTWJyQ3JlZGl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjU4MwogICAgLy8gaWYgKCFpc0FsZ28pIHsKICAgIGRpZyA1CiAgICBieiBjbGFpbVJld2FyZHNfZWxzZV9ib2R5QDIyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjU4NQogICAgLy8gYXNzZXRSZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTkxCiAgICAvLyBhc3NldFhmZXIuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBOb3RlCiAgICB1bmNvdmVyIDUKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTg0LTU4OQogICAgLy8gY29uc3QgYXNzZXRYZmVyID0gaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgYXNzZXRSZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgYXNzZXRBbW91bnQ6IHVzZXJBbGxvY2F0aW9uLAogICAgLy8gICB4ZmVyQXNzZXQ6IHJld2FyZHNbaV0uYXNzZXQsCiAgICAvLyAgIG5vdGUsCiAgICAvLyB9KQogICAgcHVzaGludCA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTkxCiAgICAvLyBhc3NldFhmZXIuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CgpjbGFpbVJld2FyZHNfYWZ0ZXJfaWZfZWxzZUAyNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTU4CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgcmV3YXJkcy5sZW5ndGg7IGkgKz0gMSkgewogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGIgY2xhaW1SZXdhcmRzX3doaWxlX3RvcEAyCgpjbGFpbVJld2FyZHNfZWxzZV9ib2R5QDIyOgogICAgdW5jb3ZlciA1CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTk0CiAgICAvLyByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTk5CiAgICAvLyBwYXltZW50LnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgTm90ZQogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTkzLTU5NwogICAgLy8gY29uc3QgcGF5bWVudCA9IGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICBhbW91bnQ6IHVzZXJBbGxvY2F0aW9uLAogICAgLy8gICBub3RlLAogICAgLy8gfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NTk5CiAgICAvLyBwYXltZW50LnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgYiBjbGFpbVJld2FyZHNfYWZ0ZXJfaWZfZWxzZUAyNAoKY2xhaW1SZXdhcmRzX2Jvb2xfZmFsc2VAMTI6CiAgICBpbnRjXzAgLy8gMAogICAgYiBjbGFpbVJld2FyZHNfYm9vbF9tZXJnZUAxMwoKY2xhaW1SZXdhcmRzX2FmdGVyX3doaWxlQDI1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo1NTcKICAgIC8vIGNsYWltUmV3YXJkcyhyZXdhcmRzOiBDbGFpbURldGFpbHNbXSk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6OlJld2FyZHMucmVjbGFpbVJld2FyZHNbcm91dGluZ10oKSAtPiB2b2lkOgpyZWNsYWltUmV3YXJkczoKICAgIHB1c2hieXRlcyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2MDQKICAgIC8vIHJlY2xhaW1SZXdhcmRzKGlkOiB1aW50NjQsIHJlY2xhaW1zOiBBbGxvY2F0aW9uUmVjbGFpbURldGFpbHNbXSk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGR1cAogICAgY292ZXIgMwogICAgcHVzaGludCA0MAogICAgKgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIHN3YXAKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL3R5cGVzLnRzOjpBbGxvY2F0aW9uUmVjbGFpbURldGFpbHM+CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjYwNQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZGlzYnVyc2VtZW50cyhpZCkuZXhpc3RzLCBlcnJEaXNidXJzZW1lbnREb2VzTm90RXhpc3QpCiAgICBpdG9iCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6ODAKICAgIC8vIGRpc2J1cnNlbWVudHMgPSBCb3hNYXA8dWludDY0LCBEaXNidXJzZW1lbnREZXRhaWxzPih7IGtleVByZWZpeDogUmV3YXJkc0JveFByZWZpeERpc2J1cnNlbWVudHMgfSkKICAgIGJ5dGVjXzAgLy8gImQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2MDUKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmRpc2J1cnNlbWVudHMoaWQpLmV4aXN0cywgZXJyRGlzYnVyc2VtZW50RG9lc05vdEV4aXN0KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogcmVjbGFpbVJld2FyZHNfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjXzEgLy8gIkVSUjplcnJEYm5lIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckRibmUKCnJlY2xhaW1SZXdhcmRzX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2MDYKICAgIC8vIGNvbnN0IHsgY3JlYXRvciwgZmluYWxpemVkLCBleHBpcmF0aW9uIH0gPSB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlCiAgICBkdXBuIDIKICAgIGludGNfMCAvLyAwCiAgICBwdXNoaW50IDMyCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgZHVwCiAgICBjb3ZlciAyCiAgICBjb3ZlciAzCiAgICBkdXAKICAgIHB1c2hpbnQgMzIKICAgIGludGNfMSAvLyAxCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgY292ZXIgMwogICAgcHVzaGludCA1MQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBidXJ5IDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NjA4CiAgICAvLyBsb2dnZWRBc3NlcnQoY3JlYXRvciA9PT0gVHhuLnNlbmRlciwgZXJyWW91QXJlTm90VGhlQ3JlYXRvcikKICAgIHR4biBTZW5kZXIKICAgID09CiAgICBibnogcmVjbGFpbVJld2FyZHNfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjXzMgLy8gIkVSUjplcnJZbmNyIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclluY3IKCnJlY2xhaW1SZXdhcmRzX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2MDkKICAgIC8vIGxvZ2dlZEFzc2VydChmaW5hbGl6ZWQsIGVyckRpc2J1cnNlbWVudE5vdEZpbmFsKQogICAgc3dhcAogICAgYm56IHJlY2xhaW1SZXdhcmRzX2FmdGVyX2Fzc2VydEA3CiAgICBieXRlYyAxNCAvLyAiRVJSOmVyckRibmwiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyRGJubAoKcmVjbGFpbVJld2FyZHNfYWZ0ZXJfYXNzZXJ0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjYxMQogICAgLy8gbG9nZ2VkQXNzZXJ0KGV4cGlyYXRpb24gIT09IDAgJiYgZXhwaXJhdGlvbiA8IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsIGVyckRpc2J1cnNlbWVudE5vdEV4cGlyZWQpCiAgICBkaWcgNgogICAgYnogcmVjbGFpbVJld2FyZHNfYm9vbF9mYWxzZUAxMAogICAgZGlnIDYKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIDwKICAgIGJ6IHJlY2xhaW1SZXdhcmRzX2Jvb2xfZmFsc2VAMTAKICAgIGludGNfMSAvLyAxCgpyZWNsYWltUmV3YXJkc19ib29sX21lcmdlQDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2MTEKICAgIC8vIGxvZ2dlZEFzc2VydChleHBpcmF0aW9uICE9PSAwICYmIGV4cGlyYXRpb24gPCBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLCBlcnJEaXNidXJzZW1lbnROb3RFeHBpcmVkKQogICAgYm56IHJlY2xhaW1SZXdhcmRzX2FmdGVyX2Fzc2VydEAxMwogICAgYnl0ZWMgMjMgLy8gIkVSUjplcnJEYm54IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckRibngKCnJlY2xhaW1SZXdhcmRzX2FmdGVyX2Fzc2VydEAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NjEzCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgcmVjbGFpbXMubGVuZ3RoOyBpICs9IDEpIHsKICAgIGludGNfMCAvLyAwCgpyZWNsYWltUmV3YXJkc193aGlsZV90b3BAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjYxMwogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IHJlY2xhaW1zLmxlbmd0aDsgaSArPSAxKSB7CiAgICBkdXAKICAgIGRpZyA1CiAgICA8CiAgICBieiByZWNsYWltUmV3YXJkc19hZnRlcl93aGlsZUAyMwogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2MTYKICAgIC8vIGFkZHJlc3M6IHJlY2xhaW1zW2ldLmFkZHJlc3MsCiAgICBkaWcgNQogICAgZXh0cmFjdCAyIDAKICAgIGRpZyAxCiAgICBwdXNoaW50IDQwCiAgICAqCiAgICBwdXNoaW50IDQwCiAgICBleHRyYWN0MyAvLyBvbiBlcnJvcjogaW5kZXggYWNjZXNzIGlzIG91dCBvZiBib3VuZHMKICAgIGR1cAogICAgZXh0cmFjdCAwIDMyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjYxNwogICAgLy8gYXNzZXQ6IHJlY2xhaW1zW2ldLmFzc2V0LAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2MTYtNjE3CiAgICAvLyBhZGRyZXNzOiByZWNsYWltc1tpXS5hZGRyZXNzLAogICAgLy8gYXNzZXQ6IHJlY2xhaW1zW2ldLmFzc2V0LAogICAgcHVzaGludCAzMgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2MTcKICAgIC8vIGFzc2V0OiByZWNsYWltc1tpXS5hc3NldCwKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGNvdmVyIDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NjE0LTYxOAogICAgLy8gY29uc3QgdXNlckFsbG9jYXRpb25zS2V5OiBVc2VyQWxsb2NhdGlvbnNLZXkgPSB7CiAgICAvLyAgIGRpc2J1cnNlbWVudElEOiBpZCwKICAgIC8vICAgYWRkcmVzczogcmVjbGFpbXNbaV0uYWRkcmVzcywKICAgIC8vICAgYXNzZXQ6IHJlY2xhaW1zW2ldLmFzc2V0LAogICAgLy8gfQogICAgaXRvYgogICAgY29uY2F0CiAgICBkaWcgNQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjg2CiAgICAvLyB1c2VyQWxsb2NhdGlvbnMgPSBCb3hNYXA8VXNlckFsbG9jYXRpb25zS2V5LCB1aW50NjQ+KHsga2V5UHJlZml4OiBSZXdhcmRzQm94UHJlZml4VXNlckFsbG9jYXRpb25zIH0pCiAgICBieXRlYyA5IC8vICJ1IgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NjE5CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy51c2VyQWxsb2NhdGlvbnModXNlckFsbG9jYXRpb25zS2V5KS5leGlzdHMsIGVyckFsbG9jYXRpb25Eb2VzTm90RXhpc3QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiByZWNsYWltUmV3YXJkc19hZnRlcl9hc3NlcnRAMTcKICAgIGJ5dGVjIDIyIC8vICJFUlI6ZXJyQWxuZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJBbG5lCgpyZWNsYWltUmV3YXJkc19hZnRlcl9hc3NlcnRAMTc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjYyMQogICAgLy8gY29uc3QgdXNlckFsbG9jYXRpb24gPSB0aGlzLnVzZXJBbGxvY2F0aW9ucyh1c2VyQWxsb2NhdGlvbnNLZXkpLnZhbHVlCiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBidG9pCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NjIzCiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlLmFsbG9jYXRpb25zIC09IDEKICAgIGRpZyA0CiAgICBkdXAKICAgIHB1c2hpbnQgNTkKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGl0b2IKICAgIGRpZyAxCiAgICBwdXNoaW50IDU5CiAgICB1bmNvdmVyIDIKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjYyNAogICAgLy8gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZS5hbW91bnQgLT0gdXNlckFsbG9jYXRpb24KICAgIGR1cAogICAgcHVzaGludCAzNQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICB1bmNvdmVyIDIKICAgIC0KICAgIGl0b2IKICAgIHB1c2hpbnQgMzUKICAgIHN3YXAKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjYyNQogICAgLy8gdGhpcy51c2VyQWxsb2NhdGlvbnModXNlckFsbG9jYXRpb25zS2V5KS5kZWxldGUoKQogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjEwNwogICAgLy8gdGhpcy5hZGRNYnJDcmVkaXQoaWQsIFVzZXJBbGxvY2F0aW9uTUJSKQogICAgZGlnIDgKICAgIGludGMgNCAvLyAyNTMwMAogICAgY2FsbHN1YiBhZGRNYnJDcmVkaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NjMwCiAgICAvLyBpZiAoIWlzQWxnbykgewogICAgZGlnIDMKICAgIGJ6IHJlY2xhaW1SZXdhcmRzX2Vsc2VfYm9keUAyMAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2MzcKICAgIC8vIHhmZXIuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIHVuY292ZXIgMwogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGRpZyAyCiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NjMxLTYzNQogICAgLy8gY29uc3QgeGZlciA9IGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgIGFzc2V0UmVjZWl2ZXI6IGNyZWF0b3IsCiAgICAvLyAgIGFzc2V0QW1vdW50OiB1c2VyQWxsb2NhdGlvbiwKICAgIC8vICAgeGZlckFzc2V0OiByZWNsYWltc1tpXS5hc3NldCwKICAgIC8vIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2MzcKICAgIC8vIHhmZXIuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CgpyZWNsYWltUmV3YXJkc19hZnRlcl9pZl9lbHNlQDIyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2MTMKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCByZWNsYWltcy5sZW5ndGg7IGkgKz0gMSkgewogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGIgcmVjbGFpbVJld2FyZHNfd2hpbGVfdG9wQDE0CgpyZWNsYWltUmV3YXJkc19lbHNlX2JvZHlAMjA6CiAgICB1bmNvdmVyIDMKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2MzktNjQ0CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogY3JlYXRvciwKICAgIC8vICAgICBhbW91bnQ6IHVzZXJBbGxvY2F0aW9uLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBkaWcgMgogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2MzktNjQzCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogY3JlYXRvciwKICAgIC8vICAgICBhbW91bnQ6IHVzZXJBbGxvY2F0aW9uLAogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2MzktNjQ0CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogY3JlYXRvciwKICAgIC8vICAgICBhbW91bnQ6IHVzZXJBbGxvY2F0aW9uLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICBiIHJlY2xhaW1SZXdhcmRzX2FmdGVyX2lmX2Vsc2VAMjIKCnJlY2xhaW1SZXdhcmRzX2FmdGVyX3doaWxlQDIzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2MDQKICAgIC8vIHJlY2xhaW1SZXdhcmRzKGlkOiB1aW50NjQsIHJlY2xhaW1zOiBBbGxvY2F0aW9uUmVjbGFpbURldGFpbHNbXSk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKcmVjbGFpbVJld2FyZHNfYm9vbF9mYWxzZUAxMDoKICAgIGludGNfMCAvLyAwCiAgICBiIHJlY2xhaW1SZXdhcmRzX2Jvb2xfbWVyZ2VAMTEKCgovLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjpSZXdhcmRzLnN3ZWVwRXhwaXJlZFtyb3V0aW5nXSgpIC0+IHZvaWQ6CnN3ZWVwRXhwaXJlZDoKICAgIGludGNfMCAvLyAwCiAgICBkdXAKICAgIHB1c2hieXRlcyAiIgogICAgZHVwbiAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjY1NgogICAgLy8gc3dlZXBFeHBpcmVkKGlkOiB1aW50NjQsIHJlY2xhaW1zOiBBbGxvY2F0aW9uUmVjbGFpbURldGFpbHNbXSk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGR1cAogICAgY292ZXIgMwogICAgcHVzaGludCA0MAogICAgKgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIHN3YXAKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL3R5cGVzLnRzOjpBbGxvY2F0aW9uUmVjbGFpbURldGFpbHM+CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjY1NwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZGlzYnVyc2VtZW50cyhpZCkuZXhpc3RzLCBlcnJEaXNidXJzZW1lbnREb2VzTm90RXhpc3QpCiAgICBpdG9iCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6ODAKICAgIC8vIGRpc2J1cnNlbWVudHMgPSBCb3hNYXA8dWludDY0LCBEaXNidXJzZW1lbnREZXRhaWxzPih7IGtleVByZWZpeDogUmV3YXJkc0JveFByZWZpeERpc2J1cnNlbWVudHMgfSkKICAgIGJ5dGVjXzAgLy8gImQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2NTcKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmRpc2J1cnNlbWVudHMoaWQpLmV4aXN0cywgZXJyRGlzYnVyc2VtZW50RG9lc05vdEV4aXN0KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogc3dlZXBFeHBpcmVkX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlY18xIC8vICJFUlI6ZXJyRGJuZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJEYm5lCgpzd2VlcEV4cGlyZWRfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjY1OAogICAgLy8gY29uc3QgeyBmaW5hbGl6ZWQsIGV4cGlyYXRpb24sIHJlY2xhaW1UbyB9ID0gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZQogICAgZHVwbiAyCiAgICBwdXNoaW50IDMyCiAgICBpbnRjXzEgLy8gMQogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIGNvdmVyIDIKICAgIGR1cAogICAgcHVzaGludCA1MQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBidXJ5IDEwCiAgICBwdXNoaW50cyA4MyAzMgogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGR1cAogICAgYnVyeSAxMgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2NTkKICAgIC8vIGxvZ2dlZEFzc2VydChyZWNsYWltVG8gIT09IEdsb2JhbC56ZXJvQWRkcmVzcywgZXJyRGlzYnVyc2VtZW50Tm90U3dlZXBhYmxlKQogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICAhPQogICAgYm56IHN3ZWVwRXhwaXJlZF9hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6ZXJyRGJucyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJEYm5zCgpzd2VlcEV4cGlyZWRfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjY2MAogICAgLy8gbG9nZ2VkQXNzZXJ0KGZpbmFsaXplZCwgZXJyRGlzYnVyc2VtZW50Tm90RmluYWwpCiAgICBzd2FwCiAgICBibnogc3dlZXBFeHBpcmVkX2FmdGVyX2Fzc2VydEA3CiAgICBieXRlYyAxNCAvLyAiRVJSOmVyckRibmwiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyRGJubAoKc3dlZXBFeHBpcmVkX2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2NjEKICAgIC8vIGxvZ2dlZEFzc2VydChleHBpcmF0aW9uICE9PSAwICYmIGV4cGlyYXRpb24gPCBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLCBlcnJEaXNidXJzZW1lbnROb3RFeHBpcmVkKQogICAgZGlnIDcKICAgIGJ6IHN3ZWVwRXhwaXJlZF9ib29sX2ZhbHNlQDEwCiAgICBkaWcgNwogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgPAogICAgYnogc3dlZXBFeHBpcmVkX2Jvb2xfZmFsc2VAMTAKICAgIGludGNfMSAvLyAxCgpzd2VlcEV4cGlyZWRfYm9vbF9tZXJnZUAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NjYxCiAgICAvLyBsb2dnZWRBc3NlcnQoZXhwaXJhdGlvbiAhPT0gMCAmJiBleHBpcmF0aW9uIDwgR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwgZXJyRGlzYnVyc2VtZW50Tm90RXhwaXJlZCkKICAgIGJueiBzd2VlcEV4cGlyZWRfYWZ0ZXJfYXNzZXJ0QDEzCiAgICBieXRlYyAyMyAvLyAiRVJSOmVyckRibngiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyRGJueAoKc3dlZXBFeHBpcmVkX2FmdGVyX2Fzc2VydEAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NjYzCiAgICAvLyBsZXQgYWxnb0Ftb3VudDogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIGJ1cnkgOQogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2NjQKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCByZWNsYWltcy5sZW5ndGg7IGkgKz0gMSkgewogICAgaW50Y18wIC8vIDAKICAgIHN3YXAKCnN3ZWVwRXhwaXJlZF93aGlsZV90b3BAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjY2NAogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IHJlY2xhaW1zLmxlbmd0aDsgaSArPSAxKSB7CiAgICBkaWcgMQogICAgZGlnIDQKICAgIDwKICAgIGJ6IHN3ZWVwRXhwaXJlZF9hZnRlcl93aGlsZUAyNAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2NjcKICAgIC8vIGFkZHJlc3M6IHJlY2xhaW1zW2ldLmFkZHJlc3MsCiAgICBkaWcgNAogICAgZXh0cmFjdCAyIDAKICAgIGRpZyAyCiAgICBwdXNoaW50IDQwCiAgICAqCiAgICBwdXNoaW50IDQwCiAgICBleHRyYWN0MyAvLyBvbiBlcnJvcjogaW5kZXggYWNjZXNzIGlzIG91dCBvZiBib3VuZHMKICAgIGR1cAogICAgZXh0cmFjdCAwIDMyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjY2OAogICAgLy8gYXNzZXQ6IHJlY2xhaW1zW2ldLmFzc2V0LAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2NjctNjY4CiAgICAvLyBhZGRyZXNzOiByZWNsYWltc1tpXS5hZGRyZXNzLAogICAgLy8gYXNzZXQ6IHJlY2xhaW1zW2ldLmFzc2V0LAogICAgcHVzaGludCAzMgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2NjgKICAgIC8vIGFzc2V0OiByZWNsYWltc1tpXS5hc3NldCwKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGJ1cnkgMTAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NjY1LTY2OQogICAgLy8gY29uc3QgdXNlckFsbG9jYXRpb25zS2V5OiBVc2VyQWxsb2NhdGlvbnNLZXkgPSB7CiAgICAvLyAgIGRpc2J1cnNlbWVudElEOiBpZCwKICAgIC8vICAgYWRkcmVzczogcmVjbGFpbXNbaV0uYWRkcmVzcywKICAgIC8vICAgYXNzZXQ6IHJlY2xhaW1zW2ldLmFzc2V0LAogICAgLy8gfQogICAgaXRvYgogICAgY29uY2F0CiAgICBkaWcgMwogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjg2CiAgICAvLyB1c2VyQWxsb2NhdGlvbnMgPSBCb3hNYXA8VXNlckFsbG9jYXRpb25zS2V5LCB1aW50NjQ+KHsga2V5UHJlZml4OiBSZXdhcmRzQm94UHJlZml4VXNlckFsbG9jYXRpb25zIH0pCiAgICBieXRlYyA5IC8vICJ1IgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGJ1cnkgMTMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NjcwCiAgICAvLyBjb25zdCBbdXNlckFsbG9jYXRpb24sIGV4aXN0c10gPSB0aGlzLnVzZXJBbGxvY2F0aW9ucyh1c2VyQWxsb2NhdGlvbnNLZXkpLm1heWJlKCkKICAgIGJveF9nZXQKICAgIHN3YXAKICAgIGJ0b2kKICAgIGJ1cnkgOAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2NzEKICAgIC8vIGlmIChleGlzdHMpIHsKICAgIGJ6IHN3ZWVwRXhwaXJlZF9hZnRlcl9pZl9lbHNlQDIzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjY3MgogICAgLy8gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZS5hbGxvY2F0aW9ucyAtPSAxCiAgICBkdXBuIDIKICAgIHB1c2hpbnQgNTkKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGl0b2IKICAgIGRpZyAxCiAgICBwdXNoaW50IDU5CiAgICB1bmNvdmVyIDIKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjY3MwogICAgLy8gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZS5hbW91bnQgLT0gdXNlckFsbG9jYXRpb24KICAgIGR1cAogICAgcHVzaGludCAzNQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBkaWcgOAogICAgLQogICAgaXRvYgogICAgcHVzaGludCAzNQogICAgc3dhcAogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6Njc0CiAgICAvLyB0aGlzLnVzZXJBbGxvY2F0aW9ucyh1c2VyQWxsb2NhdGlvbnNLZXkpLmRlbGV0ZSgpCiAgICBkaWcgMTEKICAgIGJveF9kZWwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2NzUKICAgIC8vIGFsZ29BbW91bnQgKz0gVXNlckFsbG9jYXRpb25NQlIKICAgIGRpZyA5CiAgICBpbnRjIDQgLy8gMjUzMDAKICAgICsKICAgIGJ1cnkgMTAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6Njc3CiAgICAvLyBpZiAocmVjbGFpbXNbaV0uYXNzZXQgPT09IDApIHsKICAgIGRpZyA3CiAgICBibnogc3dlZXBFeHBpcmVkX2Vsc2VfYm9keUAxOAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2NzgKICAgIC8vIGFsZ29BbW91bnQgKz0gdXNlckFsbG9jYXRpb24KICAgIGRpZyA5CiAgICBkaWcgNwogICAgKwogICAgYnVyeSAxMAoKc3dlZXBFeHBpcmVkX2FmdGVyX2lmX2Vsc2VAMjM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjY2NAogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IHJlY2xhaW1zLmxlbmd0aDsgaSArPSAxKSB7CiAgICBzd2FwCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgc3dhcAogICAgYiBzd2VlcEV4cGlyZWRfd2hpbGVfdG9wQDE0Cgpzd2VlcEV4cGlyZWRfZWxzZV9ib2R5QDE4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2ODAKICAgIC8vIGxvZ2dlZEFzc2VydChyZWNsYWltVG8uaXNPcHRlZEluKEFzc2V0KHJlY2xhaW1zW2ldLmFzc2V0KSksIGVyclJlY2xhaW1UYXJnZXROb3RPcHRlZEluKQogICAgZGlnIDEwCiAgICBkaWcgOAogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJueiBzd2VlcEV4cGlyZWRfYWZ0ZXJfYXNzZXJ0QDIwCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJSY29pIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclJjb2kKCnN3ZWVwRXhwaXJlZF9hZnRlcl9hc3NlcnRAMjA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjY4MS02ODUKICAgIC8vIGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgIGFzc2V0UmVjZWl2ZXI6IHJlY2xhaW1UbywKICAgIC8vICAgYXNzZXRBbW91bnQ6IHVzZXJBbGxvY2F0aW9uLAogICAgLy8gICB4ZmVyQXNzZXQ6IHJlY2xhaW1zW2ldLmFzc2V0LAogICAgLy8gfSkuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIGRpZyA3CiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgZGlnIDYKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGRpZyAxMAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGIgc3dlZXBFeHBpcmVkX2FmdGVyX2lmX2Vsc2VAMjMKCnN3ZWVwRXhwaXJlZF9hZnRlcl93aGlsZUAyNDoKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2OTAKICAgIC8vIGlmICh0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlLmFsbG9jYXRpb25zID09PSAwKSB7CiAgICBwdXNoaW50IDU5CiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGJueiBzd2VlcEV4cGlyZWRfYWZ0ZXJfaWZfZWxzZUAyNgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2OTEKICAgIC8vIGFsZ29BbW91bnQgKz0gdGhpcy5kZWxldGVEaXNidXJzZW1lbnQoaWQpCiAgICBkaWcgMwogICAgY2FsbHN1YiBkZWxldGVEaXNidXJzZW1lbnQKICAgIGRpZyA4CiAgICArCiAgICBidXJ5IDgKCnN3ZWVwRXhwaXJlZF9hZnRlcl9pZl9lbHNlQDI2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo2OTQKICAgIC8vIGlmIChhbGdvQW1vdW50ID4gMCkgewogICAgZGlnIDcKICAgIGJ6IHN3ZWVwRXhwaXJlZF9hZnRlcl9pZl9lbHNlQDI5CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjY5NQogICAgLy8gaXR4bi5wYXltZW50KHsgcmVjZWl2ZXI6IHJlY2xhaW1UbywgYW1vdW50OiBhbGdvQW1vdW50IH0pLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICBkaWcgNwogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGRpZyA4CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAoKc3dlZXBFeHBpcmVkX2FmdGVyX2lmX2Vsc2VAMjk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjY1NgogICAgLy8gc3dlZXBFeHBpcmVkKGlkOiB1aW50NjQsIHJlY2xhaW1zOiBBbGxvY2F0aW9uUmVjbGFpbURldGFpbHNbXSk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKc3dlZXBFeHBpcmVkX2Jvb2xfZmFsc2VAMTA6CiAgICBpbnRjXzAgLy8gMAogICAgYiBzd2VlcEV4cGlyZWRfYm9vbF9tZXJnZUAxMQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6OlJld2FyZHMuY2xvc2VEaXNidXJzZW1lbnRbcm91dGluZ10oKSAtPiB2b2lkOgpjbG9zZURpc2J1cnNlbWVudDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NzA0CiAgICAvLyBjbG9zZURpc2J1cnNlbWVudChpZDogdWludDY0KTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NzA1CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5kaXNidXJzZW1lbnRzKGlkKS5leGlzdHMsIGVyckRpc2J1cnNlbWVudERvZXNOb3RFeGlzdCkKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6ODAKICAgIC8vIGRpc2J1cnNlbWVudHMgPSBCb3hNYXA8dWludDY0LCBEaXNidXJzZW1lbnREZXRhaWxzPih7IGtleVByZWZpeDogUmV3YXJkc0JveFByZWZpeERpc2J1cnNlbWVudHMgfSkKICAgIGJ5dGVjXzAgLy8gImQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo3MDUKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmRpc2J1cnNlbWVudHMoaWQpLmV4aXN0cywgZXJyRGlzYnVyc2VtZW50RG9lc05vdEV4aXN0KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogY2xvc2VEaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjXzEgLy8gIkVSUjplcnJEYm5lIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckRibmUKCmNsb3NlRGlzYnVyc2VtZW50X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo3MDYKICAgIC8vIGNvbnN0IHsgY3JlYXRvciwgYWxsb2NhdGlvbnMgfSA9IHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIHB1c2hpbnQgMzIKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGNvdmVyIDMKICAgIHB1c2hpbnQgNTkKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo3MDcKICAgIC8vIGxvZ2dlZEFzc2VydChjcmVhdG9yID09PSBUeG4uc2VuZGVyLCBlcnJZb3VBcmVOb3RUaGVDcmVhdG9yKQogICAgdHhuIFNlbmRlcgogICAgPT0KICAgIGJueiBjbG9zZURpc2J1cnNlbWVudF9hZnRlcl9hc3NlcnRANQogICAgYnl0ZWNfMyAvLyAiRVJSOmVyclluY3IiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyWW5jcgoKY2xvc2VEaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjcwOAogICAgLy8gbG9nZ2VkQXNzZXJ0KGFsbG9jYXRpb25zID09PSAwLCBlcnJEaXNidXJzZW1lbnROb3RFbXB0eSkKICAgIGJ6IGNsb3NlRGlzYnVyc2VtZW50X2FmdGVyX2Fzc2VydEA3CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJEYm55IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckRibnkKCmNsb3NlRGlzYnVyc2VtZW50X2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo3MTAKICAgIC8vIGl0eG4ucGF5bWVudCh7IHJlY2VpdmVyOiBjcmVhdG9yLCBhbW91bnQ6IHRoaXMuZGVsZXRlRGlzYnVyc2VtZW50KGlkKSB9KS5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgY2FsbHN1YiBkZWxldGVEaXNidXJzZW1lbnQKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo3MDQKICAgIC8vIGNsb3NlRGlzYnVyc2VtZW50KGlkOiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjpSZXdhcmRzLmFsbG9jYXRpb25NYnJDcmVkaXRTaG9ydGZhbGxbcm91dGluZ10oKSAtPiB2b2lkOgphbGxvY2F0aW9uTWJyQ3JlZGl0U2hvcnRmYWxsOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo3MTUKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo3MTcKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmRpc2J1cnNlbWVudHMoaWQpLmV4aXN0cywgZXJyRGlzYnVyc2VtZW50RG9lc05vdEV4aXN0KQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo4MAogICAgLy8gZGlzYnVyc2VtZW50cyA9IEJveE1hcDx1aW50NjQsIERpc2J1cnNlbWVudERldGFpbHM+KHsga2V5UHJlZml4OiBSZXdhcmRzQm94UHJlZml4RGlzYnVyc2VtZW50cyB9KQogICAgYnl0ZWNfMCAvLyAiZCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjcxNwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZGlzYnVyc2VtZW50cyhpZCkuZXhpc3RzLCBlcnJEaXNidXJzZW1lbnREb2VzTm90RXhpc3QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBhbGxvY2F0aW9uTWJyQ3JlZGl0U2hvcnRmYWxsX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlY18xIC8vICJFUlI6ZXJyRGJuZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJEYm5lCgphbGxvY2F0aW9uTWJyQ3JlZGl0U2hvcnRmYWxsX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo3MTkKICAgIC8vIGNvbnN0IG1ickFtb3VudDogdWludDY0ID0gVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9uQ291bnQKICAgIGludGMgNCAvLyAyNTMwMAogICAgdW5jb3ZlciAyCiAgICAqCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NzIwCiAgICAvLyBjb25zdCBjcmVkaXRzOiB1aW50NjQgPSB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlLm1ickNyZWRpdHMKICAgIHVuY292ZXIgMgogICAgcHVzaGludCA3NQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo3MjEKICAgIC8vIGlmIChjcmVkaXRzID49IG1ickFtb3VudCkgewogICAgPj0KICAgIGJ6IGFsbG9jYXRpb25NYnJDcmVkaXRTaG9ydGZhbGxfYWZ0ZXJfaWZfZWxzZUA1CiAgICBwb3BuIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NzIyCiAgICAvLyByZXR1cm4gMAogICAgaW50Y18wIC8vIDAKCmFsbG9jYXRpb25NYnJDcmVkaXRTaG9ydGZhbGxfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjpSZXdhcmRzLmFsbG9jYXRpb25NYnJDcmVkaXRTaG9ydGZhbGxANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NzE1CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGl0b2IKICAgIGJ5dGVjXzIgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmFsbG9jYXRpb25NYnJDcmVkaXRTaG9ydGZhbGxfYWZ0ZXJfaWZfZWxzZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo3MjUKICAgIC8vIHJldHVybiBtYnJBbW91bnQgLSBjcmVkaXRzCiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjcxNQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBiIGFsbG9jYXRpb25NYnJDcmVkaXRTaG9ydGZhbGxfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjpSZXdhcmRzLmFsbG9jYXRpb25NYnJDcmVkaXRTaG9ydGZhbGxANgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czo6QWtpdGFCYXNlQ29udHJhY3QudXBkYXRlQWtpdGFEQU9bcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGVBa2l0YURBTzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNQogICAgLy8gdXBkYXRlQWtpdGFEQU8oYWtpdGFEQU86IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MjYKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjIDExIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHB1c2hieXRlcyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjI2CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIGVyck5vdEFraXRhRGFvKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGJueiB1cGRhdGVBa2l0YURBT19hZnRlcl9hc3NlcnRAMwogICAgcHVzaGJ5dGVzICJFUlI6ZXJyTmRhbyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOZGFvCgp1cGRhdGVBa2l0YURBT19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjIDExIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MjcKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUgPSBha2l0YURBTwogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNQogICAgLy8gdXBkYXRlQWtpdGFEQU8oYWtpdGFEQU86IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvYmFzZS50czo6QmFzZVJld2FyZHMubWJyW3JvdXRpbmddKCkgLT4gdm9pZDoKbWJyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvYmFzZS50czo3CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9iYXNlLnRzOjpCYXNlUmV3YXJkcy5tYnIKICAgIGJ5dGVjXzIgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6OkNvbnRyYWN0V2l0aE9wdEluLm9wdEluW3JvdXRpbmddKCkgLT4gdm9pZDoKb3B0SW46CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6MjMKICAgIC8vIG9wdEluKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYXNzZXQ6IEFzc2V0KTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cG4gMgogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czoyNQogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBlcnJJbnZhbGlkUGF5bWVudFJlY2VpdmVyKQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IG9wdEluX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAxOCAvLyAiRVJSOmVycklwbXIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBtcgoKb3B0SW5fYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6MjYKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LmFtb3VudCA9PT0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlLCBlcnJJbnZhbGlkUGF5bWVudEFtb3VudCkKICAgIHN3YXAKICAgIGd0eG5zIEFtb3VudAogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICA9PQogICAgYm56IG9wdEluX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyAxOSAvLyAiRVJSOmVycklwbWEiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBtYQoKb3B0SW5fYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6MjgtMzQKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6MzAKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6MzEKICAgIC8vIGFzc2V0QW1vdW50OiAwLAogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjI4LTMzCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogMCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyAgIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjI4LTM0CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogMCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czoyMwogICAgLy8gb3B0SW4ocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBhc3NldDogQXNzZXQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjpSZXdhcmRzLm5ld0Rpc2J1cnNlbWVudElEKCkgLT4gdWludDY0OgpuZXdEaXNidXJzZW1lbnRJRDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6OTEKICAgIC8vIGNvbnN0IGlkID0gdGhpcy5kaXNidXJzZW1lbnRJRC52YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6NzAKICAgIC8vIGRpc2J1cnNlbWVudElEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMSwga2V5OiBSZXdhcmRzR2xvYmFsU3RhdGVLZXlEaXNidXJzZW1lbnRJRCB9KQogICAgYnl0ZWMgMTAgLy8gImRpc2J1cnNlbWVudF9pZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6OTEKICAgIC8vIGNvbnN0IGlkID0gdGhpcy5kaXNidXJzZW1lbnRJRC52YWx1ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6OTIKICAgIC8vIHRoaXMuZGlzYnVyc2VtZW50SUQudmFsdWUgKz0gMQogICAgZHVwCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo3MAogICAgLy8gZGlzYnVyc2VtZW50SUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAxLCBrZXk6IFJld2FyZHNHbG9iYWxTdGF0ZUtleURpc2J1cnNlbWVudElEIH0pCiAgICBieXRlYyAxMCAvLyAiZGlzYnVyc2VtZW50X2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo5MgogICAgLy8gdGhpcy5kaXNidXJzZW1lbnRJRC52YWx1ZSArPSAxCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo5MwogICAgLy8gcmV0dXJuIGlkCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjpSZXdhcmRzLmFkZE1ickNyZWRpdChpZDogdWludDY0LCBhbW91bnQ6IHVpbnQ2NCkgLT4gdm9pZDoKYWRkTWJyQ3JlZGl0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo5NgogICAgLy8gcHJpdmF0ZSBhZGRNYnJDcmVkaXQoaWQ6IHVpbnQ2NCwgYW1vdW50OiB1aW50NjQpOiB2b2lkIHsKICAgIHByb3RvIDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo5NwogICAgLy8gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZS5tYnJDcmVkaXRzICs9IGFtb3VudAogICAgZnJhbWVfZGlnIC0yCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjgwCiAgICAvLyBkaXNidXJzZW1lbnRzID0gQm94TWFwPHVpbnQ2NCwgRGlzYnVyc2VtZW50RGV0YWlscz4oeyBrZXlQcmVmaXg6IFJld2FyZHNCb3hQcmVmaXhEaXNidXJzZW1lbnRzIH0pCiAgICBieXRlY18wIC8vICJkIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjk3CiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlLm1ickNyZWRpdHMgKz0gYW1vdW50CiAgICBkdXAKICAgIHB1c2hpbnQgNzUKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgZnJhbWVfZGlnIC0xCiAgICArCiAgICBpdG9iCiAgICBwdXNoaW50IDc1CiAgICBzd2FwCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo6UmV3YXJkcy51c2VNYnJDcmVkaXQoaWQ6IHVpbnQ2NCwgYW1vdW50OiB1aW50NjQpIC0+IHZvaWQ6CnVzZU1ickNyZWRpdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTAwCiAgICAvLyBwcml2YXRlIHVzZU1ickNyZWRpdChpZDogdWludDY0LCBhbW91bnQ6IHVpbnQ2NCk6IHZvaWQgewogICAgcHJvdG8gMiAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjEwMQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUubWJyQ3JlZGl0cyA+PSBhbW91bnQsIGVyckludmFsaWRNYnJBbW91bnQpCiAgICBmcmFtZV9kaWcgLTIKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6ODAKICAgIC8vIGRpc2J1cnNlbWVudHMgPSBCb3hNYXA8dWludDY0LCBEaXNidXJzZW1lbnREZXRhaWxzPih7IGtleVByZWZpeDogUmV3YXJkc0JveFByZWZpeERpc2J1cnNlbWVudHMgfSkKICAgIGJ5dGVjXzAgLy8gImQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxMDEKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlLm1ickNyZWRpdHMgPj0gYW1vdW50LCBlcnJJbnZhbGlkTWJyQW1vdW50KQogICAgcHVzaGludCA3NQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBmcmFtZV9kaWcgLTEKICAgID49CiAgICBibnogdXNlTWJyQ3JlZGl0X2FmdGVyX2Fzc2VydEAyCiAgICBieXRlYyA2IC8vICJFUlI6ZXJySW1iciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJbWJyCgp1c2VNYnJDcmVkaXRfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjEwMgogICAgLy8gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZS5tYnJDcmVkaXRzIC09IGFtb3VudAogICAgZHVwCiAgICBwdXNoaW50IDc1CiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGZyYW1lX2RpZyAtMQogICAgLQogICAgaXRvYgogICAgcHVzaGludCA3NQogICAgc3dhcAogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6OlJld2FyZHMuYXNzZXJ0VmFsaWRVbmxvY2sodGltZVRvVW5sb2NrOiB1aW50NjQpIC0+IHZvaWQ6CmFzc2VydFZhbGlkVW5sb2NrOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxMTEKICAgIC8vIHByaXZhdGUgYXNzZXJ0VmFsaWRVbmxvY2sodGltZVRvVW5sb2NrOiB1aW50NjQpOiB2b2lkIHsKICAgIHByb3RvIDEgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxMTMKICAgIC8vIHRpbWVUb1VubG9jayA+PSBHbG9iYWwubGF0ZXN0VGltZXN0YW1wIHx8IHRpbWVUb1VubG9jayA9PT0gMCwKICAgIGZyYW1lX2RpZyAtMQogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgPj0KICAgIGJueiBhc3NlcnRWYWxpZFVubG9ja19ib29sX3RydWVAMgogICAgZnJhbWVfZGlnIC0xCiAgICBibnogYXNzZXJ0VmFsaWRVbmxvY2tfYm9vbF9mYWxzZUAzCgphc3NlcnRWYWxpZFVubG9ja19ib29sX3RydWVAMjoKICAgIGludGNfMSAvLyAxCgphc3NlcnRWYWxpZFVubG9ja19ib29sX21lcmdlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjExMi0xMTUKICAgIC8vIGxvZ2dlZEFzc2VydCgKICAgIC8vICAgdGltZVRvVW5sb2NrID49IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgfHwgdGltZVRvVW5sb2NrID09PSAwLAogICAgLy8gICBlcnJJbnZhbGlkRGlzYnVyc2VtZW50VW5sb2NrVGltZQogICAgLy8gKQogICAgYm56IGFzc2VydFZhbGlkVW5sb2NrX2FmdGVyX2Fzc2VydEA2CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJJZHV0IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklkdXQKCmFzc2VydFZhbGlkVW5sb2NrX2FmdGVyX2Fzc2VydEA2OgogICAgcmV0c3ViCgphc3NlcnRWYWxpZFVubG9ja19ib29sX2ZhbHNlQDM6CiAgICBpbnRjXzAgLy8gMAogICAgYiBhc3NlcnRWYWxpZFVubG9ja19ib29sX21lcmdlQDQKCgovLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjpSZXdhcmRzLmFzc2VydFZhbGlkRXhwaXJhdGlvbihleHBpcmF0aW9uOiB1aW50NjQpIC0+IHZvaWQ6CmFzc2VydFZhbGlkRXhwaXJhdGlvbjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTE5CiAgICAvLyBwcml2YXRlIGFzc2VydFZhbGlkRXhwaXJhdGlvbihleHBpcmF0aW9uOiB1aW50NjQpOiB2b2lkIHsKICAgIHByb3RvIDEgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxMjEKICAgIC8vIGV4cGlyYXRpb24gPj0gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCArIDYwIHx8IGV4cGlyYXRpb24gPT09IDAsCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBwdXNoaW50IDYwCiAgICArCiAgICBmcmFtZV9kaWcgLTEKICAgIDw9CiAgICBibnogYXNzZXJ0VmFsaWRFeHBpcmF0aW9uX2Jvb2xfdHJ1ZUAyCiAgICBmcmFtZV9kaWcgLTEKICAgIGJueiBhc3NlcnRWYWxpZEV4cGlyYXRpb25fYm9vbF9mYWxzZUAzCgphc3NlcnRWYWxpZEV4cGlyYXRpb25fYm9vbF90cnVlQDI6CiAgICBpbnRjXzEgLy8gMQoKYXNzZXJ0VmFsaWRFeHBpcmF0aW9uX2Jvb2xfbWVyZ2VANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTIwLTEyMwogICAgLy8gbG9nZ2VkQXNzZXJ0KAogICAgLy8gICBleHBpcmF0aW9uID49IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgKyA2MCB8fCBleHBpcmF0aW9uID09PSAwLAogICAgLy8gICBlcnJJbnZhbGlkRGlzYnVyc2VtZW50RXhwaXJhdGlvblRpbWUKICAgIC8vICkKICAgIGJueiBhc3NlcnRWYWxpZEV4cGlyYXRpb25fYWZ0ZXJfYXNzZXJ0QDYKICAgIHB1c2hieXRlcyAiRVJSOmVycklkeHQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySWR4dAoKYXNzZXJ0VmFsaWRFeHBpcmF0aW9uX2FmdGVyX2Fzc2VydEA2OgogICAgcmV0c3ViCgphc3NlcnRWYWxpZEV4cGlyYXRpb25fYm9vbF9mYWxzZUAzOgogICAgaW50Y18wIC8vIDAKICAgIGIgYXNzZXJ0VmFsaWRFeHBpcmF0aW9uX2Jvb2xfbWVyZ2VANAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6OlJld2FyZHMud3JpdGVBbGxvY2F0aW9uKGlkOiB1aW50NjQsIGFkZHJlc3M6IGJ5dGVzLCBhc3NldDogdWludDY0LCBhbW91bnQ6IHVpbnQ2NCkgLT4gdWludDY0Ogp3cml0ZUFsbG9jYXRpb246CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjEzMgogICAgLy8gcHJpdmF0ZSB3cml0ZUFsbG9jYXRpb24oaWQ6IHVpbnQ2NCwgYWRkcmVzczogQWNjb3VudCwgYXNzZXQ6IHVpbnQ2NCwgYW1vdW50OiB1aW50NjQpOiB1aW50NjQgewogICAgcHJvdG8gNCAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjEzMwogICAgLy8gaWYgKGFtb3VudCA9PT0gMCkgewogICAgZnJhbWVfZGlnIC0xCiAgICBibnogd3JpdGVBbGxvY2F0aW9uX2FmdGVyX2lmX2Vsc2VAMgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxMzQKICAgIC8vIHJldHVybiAwCiAgICBpbnRjXzAgLy8gMAogICAgcmV0c3ViCgp3cml0ZUFsbG9jYXRpb25fYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxMzcKICAgIC8vIGNvbnN0IGtleTogVXNlckFsbG9jYXRpb25zS2V5ID0geyBkaXNidXJzZW1lbnRJRDogaWQsIGFkZHJlc3MsIGFzc2V0IH0KICAgIGZyYW1lX2RpZyAtMgogICAgaXRvYgogICAgZnJhbWVfZGlnIC0zCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtNAogICAgaXRvYgogICAgc3dhcAogICAgZGlnIDEKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo4NgogICAgLy8gdXNlckFsbG9jYXRpb25zID0gQm94TWFwPFVzZXJBbGxvY2F0aW9uc0tleSwgdWludDY0Pih7IGtleVByZWZpeDogUmV3YXJkc0JveFByZWZpeFVzZXJBbGxvY2F0aW9ucyB9KQogICAgYnl0ZWMgOSAvLyAidSIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjEzOAogICAgLy8gY29uc3QgW3ByZXZpb3VzLCBleGlzdHNdID0gdGhpcy51c2VyQWxsb2NhdGlvbnMoa2V5KS5tYXliZSgpCiAgICBib3hfZ2V0CiAgICBzd2FwCiAgICBidG9pCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjgwCiAgICAvLyBkaXNidXJzZW1lbnRzID0gQm94TWFwPHVpbnQ2NCwgRGlzYnVyc2VtZW50RGV0YWlscz4oeyBrZXlQcmVmaXg6IFJld2FyZHNCb3hQcmVmaXhEaXNidXJzZW1lbnRzIH0pCiAgICBieXRlY18wIC8vICJkIgogICAgdW5jb3ZlciAyCiAgICBjb25jYXQKICAgIGR1cAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxMzkKICAgIC8vIHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUuYW1vdW50ICs9IGFtb3VudAogICAgZHVwCiAgICBwdXNoaW50IDM1CiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGZyYW1lX2RpZyAtMQogICAgKwogICAgaXRvYgogICAgcHVzaGludCAzNQogICAgc3dhcAogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTQxCiAgICAvLyBpZiAoZXhpc3RzKSB7CiAgICBieiB3cml0ZUFsbG9jYXRpb25fYWZ0ZXJfaWZfZWxzZUA0CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTQyCiAgICAvLyB0aGlzLnVzZXJBbGxvY2F0aW9ucyhrZXkpLnZhbHVlID0gcHJldmlvdXMgKyBhbW91bnQKICAgIGZyYW1lX2RpZyAtMQogICAgKwogICAgaXRvYgogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxNDMKICAgIC8vIHJldHVybiAwCiAgICBpbnRjXzAgLy8gMAogICAgcmV0c3ViCgp3cml0ZUFsbG9jYXRpb25fYWZ0ZXJfaWZfZWxzZUA0OgogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjE0NgogICAgLy8gdGhpcy51c2VyQWxsb2NhdGlvbnMoa2V5KS52YWx1ZSA9IGFtb3VudAogICAgZnJhbWVfZGlnIC0xCiAgICBpdG9iCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTQ3CiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlLmFsbG9jYXRpb25zICs9IDEKICAgIGR1cAogICAgcHVzaGludCA1OQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgaXRvYgogICAgcHVzaGludCA1OQogICAgc3dhcAogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTQ4CiAgICAvLyByZXR1cm4gMQogICAgaW50Y18xIC8vIDEKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6OlJld2FyZHMuYXNzZXJ0SW5ib3VuZEFzc2V0VHJhbnNmZXIoYXNzZXRYZmVyOiB1aW50NjQsIGFtb3VudDogdWludDY0KSAtPiB2b2lkOgphc3NlcnRJbmJvdW5kQXNzZXRUcmFuc2ZlcjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTU1CiAgICAvLyBwcml2YXRlIGFzc2VydEluYm91bmRBc3NldFRyYW5zZmVyKGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLCBhbW91bnQ6IHVpbnQ2NCk6IHZvaWQgewogICAgcHJvdG8gMiAwCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxNTYKICAgIC8vIGxvZ2dlZEFzc2VydChhc3NldFhmZXIuc2VuZGVyID09PSBUeG4uc2VuZGVyLCBlcnJJbnZhbGlkVHJhbnNmZXIpCiAgICBmcmFtZV9kaWcgLTIKICAgIGd0eG5zIFNlbmRlcgogICAgdHhuIFNlbmRlcgogICAgPT0KICAgIGJueiBhc3NlcnRJbmJvdW5kQXNzZXRUcmFuc2Zlcl9hZnRlcl9hc3NlcnRAMgogICAgYnl0ZWMgNCAvLyAiRVJSOmVyckl4ZnIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXhmcgoKYXNzZXJ0SW5ib3VuZEFzc2V0VHJhbnNmZXJfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjE1NwogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci5hc3NldFNlbmRlciA9PT0gR2xvYmFsLnplcm9BZGRyZXNzLCBlcnJJbnZhbGlkVHJhbnNmZXIpCiAgICBmcmFtZV9kaWcgLTIKICAgIGd0eG5zIEFzc2V0U2VuZGVyCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgID09CiAgICBibnogYXNzZXJ0SW5ib3VuZEFzc2V0VHJhbnNmZXJfYWZ0ZXJfYXNzZXJ0QDQKICAgIGJ5dGVjIDQgLy8gIkVSUjplcnJJeGZyIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckl4ZnIKCmFzc2VydEluYm91bmRBc3NldFRyYW5zZmVyX2FmdGVyX2Fzc2VydEA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxNTgKICAgIC8vIGxvZ2dlZEFzc2VydChhc3NldFhmZXIucmVrZXlUbyA9PT0gR2xvYmFsLnplcm9BZGRyZXNzLCBlcnJJbnZhbGlkVHJhbnNmZXIpCiAgICBmcmFtZV9kaWcgLTIKICAgIGd0eG5zIFJla2V5VG8KICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIGJueiBhc3NlcnRJbmJvdW5kQXNzZXRUcmFuc2Zlcl9hZnRlcl9hc3NlcnRANgogICAgYnl0ZWMgNCAvLyAiRVJSOmVyckl4ZnIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXhmcgoKYXNzZXJ0SW5ib3VuZEFzc2V0VHJhbnNmZXJfYWZ0ZXJfYXNzZXJ0QDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjE2MAogICAgLy8gYXNzZXRYZmVyLmFzc2V0Q2xvc2VUbyA9PT0gR2xvYmFsLnplcm9BZGRyZXNzIHx8IGFzc2V0WGZlci5hc3NldENsb3NlVG8gPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgZnJhbWVfZGlnIC0yCiAgICBndHhucyBBc3NldENsb3NlVG8KICAgIGR1cAogICAgZnJhbWVfYnVyeSAwCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgID09CiAgICBibnogYXNzZXJ0SW5ib3VuZEFzc2V0VHJhbnNmZXJfYm9vbF90cnVlQDgKICAgIGZyYW1lX2RpZyAwCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJ6IGFzc2VydEluYm91bmRBc3NldFRyYW5zZmVyX2Jvb2xfZmFsc2VAOQoKYXNzZXJ0SW5ib3VuZEFzc2V0VHJhbnNmZXJfYm9vbF90cnVlQDg6CiAgICBpbnRjXzEgLy8gMQoKYXNzZXJ0SW5ib3VuZEFzc2V0VHJhbnNmZXJfYm9vbF9tZXJnZUAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTU5LTE2MgogICAgLy8gbG9nZ2VkQXNzZXJ0KAogICAgLy8gICBhc3NldFhmZXIuYXNzZXRDbG9zZVRvID09PSBHbG9iYWwuemVyb0FkZHJlc3MgfHwgYXNzZXRYZmVyLmFzc2V0Q2xvc2VUbyA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgIGVyckludmFsaWRDbG9zZVRvCiAgICAvLyApCiAgICBibnogYXNzZXJ0SW5ib3VuZEFzc2V0VHJhbnNmZXJfYWZ0ZXJfYXNzZXJ0QDEyCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJJY3RvIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckljdG8KCmFzc2VydEluYm91bmRBc3NldFRyYW5zZmVyX2FmdGVyX2Fzc2VydEAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTYzCiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLmFzc2V0UmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBlcnJJbnZhbGlkVHJhbnNmZXIpCiAgICBmcmFtZV9kaWcgLTIKICAgIGd0eG5zIEFzc2V0UmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IGFzc2VydEluYm91bmRBc3NldFRyYW5zZmVyX2FmdGVyX2Fzc2VydEAxNAogICAgYnl0ZWMgNCAvLyAiRVJSOmVyckl4ZnIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXhmcgoKYXNzZXJ0SW5ib3VuZEFzc2V0VHJhbnNmZXJfYWZ0ZXJfYXNzZXJ0QDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxNjQKICAgIC8vIGxvZ2dlZEFzc2VydChhc3NldFhmZXIuYXNzZXRBbW91bnQgPT09IGFtb3VudCwgZXJySW52YWxpZFRyYW5zZmVyKQogICAgZnJhbWVfZGlnIC0yCiAgICBndHhucyBBc3NldEFtb3VudAogICAgZnJhbWVfZGlnIC0xCiAgICA9PQogICAgYm56IGFzc2VydEluYm91bmRBc3NldFRyYW5zZmVyX2FmdGVyX2Fzc2VydEAxNgogICAgYnl0ZWMgNCAvLyAiRVJSOmVyckl4ZnIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXhmcgoKYXNzZXJ0SW5ib3VuZEFzc2V0VHJhbnNmZXJfYWZ0ZXJfYXNzZXJ0QDE2OgogICAgcmV0c3ViCgphc3NlcnRJbmJvdW5kQXNzZXRUcmFuc2Zlcl9ib29sX2ZhbHNlQDk6CiAgICBpbnRjXzAgLy8gMAogICAgYiBhc3NlcnRJbmJvdW5kQXNzZXRUcmFuc2Zlcl9ib29sX21lcmdlQDEwCgoKLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo6UmV3YXJkcy5kZWxldGVEaXNidXJzZW1lbnQoaWQ6IHVpbnQ2NCkgLT4gdWludDY0OgpkZWxldGVEaXNidXJzZW1lbnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjE3NgogICAgLy8gcHJpdmF0ZSBkZWxldGVEaXNidXJzZW1lbnQoaWQ6IHVpbnQ2NCk6IHVpbnQ2NCB7CiAgICBwcm90byAxIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTc3CiAgICAvLyBjb25zdCB7IG1ickNyZWRpdHMsIHRpdGxlLCBub3RlIH0gPSB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6ODAKICAgIC8vIGRpc2J1cnNlbWVudHMgPSBCb3hNYXA8dWludDY0LCBEaXNidXJzZW1lbnREZXRhaWxzPih7IGtleVByZWZpeDogUmV3YXJkc0JveFByZWZpeERpc2J1cnNlbWVudHMgfSkKICAgIGJ5dGVjXzAgLy8gImQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTc3CiAgICAvLyBjb25zdCB7IG1ickNyZWRpdHMsIHRpdGxlLCBub3RlIH0gPSB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlCiAgICBkdXAKICAgIHB1c2hpbnQgNzUKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgZGlnIDEKICAgIHB1c2hpbnQgMTE3CiAgICBpbnRjXzMgLy8gMgogICAgYm94X2V4dHJhY3QKICAgIGJ0b2kKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMgogICAgcHVzaGludCAxMTcKICAgIHVuY292ZXIgMgogICAgYm94X2V4dHJhY3QKICAgIGV4dHJhY3QgMiAwCiAgICBkaWcgMgogICAgcHVzaGludCAxMTUKICAgIGludGNfMyAvLyAyCiAgICBib3hfZXh0cmFjdAogICAgYnRvaQogICAgZGlnIDMKICAgIGRpZyAxCiAgICBpbnRjXzMgLy8gMgogICAgYm94X2V4dHJhY3QKICAgIGJ0b2kKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgNAogICAgY292ZXIgMgogICAgYm94X2V4dHJhY3QKICAgIGV4dHJhY3QgMiAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjE3OAogICAgLy8gY29uc3QgcmVsZWFzZWQ6IHVpbnQ2NCA9IHRoaXMuZGlzYnVyc2VtZW50Qm94TWJyKEJ5dGVzKHRpdGxlKS5sZW5ndGgsIEJ5dGVzKG5vdGUpLmxlbmd0aCkgKyBtYnJDcmVkaXRzCiAgICBzd2FwCiAgICBsZW4KICAgIHN3YXAKICAgIGxlbgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxNjkKICAgIC8vIHJldHVybiBNaW5EaXNidXJzZW1lbnRzTUJSICsgKEJveENvc3RQZXJCeXRlICogKHRpdGxlTGVuZ3RoICsgbm90ZUxlbmd0aCkpCiAgICArCiAgICBpbnRjIDYgLy8gNDAwCiAgICAqCiAgICBpbnRjIDUgLy8gNTQ1MDAKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTc4CiAgICAvLyBjb25zdCByZWxlYXNlZDogdWludDY0ID0gdGhpcy5kaXNidXJzZW1lbnRCb3hNYnIoQnl0ZXModGl0bGUpLmxlbmd0aCwgQnl0ZXMobm90ZSkubGVuZ3RoKSArIG1ickNyZWRpdHMKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTc5CiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLmRlbGV0ZSgpCiAgICBzd2FwCiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTgwCiAgICAvLyByZXR1cm4gcmVsZWFzZWQKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6OlJld2FyZHMubmV3SW5zdGFudERpc2J1cnNlbWVudChhc3NldDogdWludDY0LCB0aW1lVG9VbmxvY2s6IHVpbnQ2NCwgZXhwaXJhdGlvbjogdWludDY0LCBhbGxvY2F0aW9uczogYnl0ZXMsIHJlY2xhaW1UbzogYnl0ZXMpIC0+IGJ5dGVzLCBieXRlczoKbmV3SW5zdGFudERpc2J1cnNlbWVudDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTg4LTE5NAogICAgLy8gcHJpdmF0ZSBuZXdJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICBhc3NldDogdWludDY0LAogICAgLy8gICB0aW1lVG9VbmxvY2s6IHVpbnQ2NCwKICAgIC8vICAgZXhwaXJhdGlvbjogdWludDY0LAogICAgLy8gICBhbGxvY2F0aW9uczogVXNlckFsbG9jYXRpb25bXSwKICAgIC8vICAgcmVjbGFpbVRvOiBBY2NvdW50CiAgICAvLyApOiB7IGlkOiB1aW50NjQsIHN1bTogdWludDY0LCBtYnJBbW91bnQ6IHVpbnQ2NCB9IHsKICAgIHByb3RvIDUgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxOTUKICAgIC8vIGxvZ2dlZEFzc2VydChhbGxvY2F0aW9ucy5sZW5ndGggPiAwLCBlcnJEaXNidXJzZW1lbnRzTXVzdEhhdmVBbGxvY2F0aW9ucykKICAgIGZyYW1lX2RpZyAtMgogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGR1cAogICAgYm56IG5ld0luc3RhbnREaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDIKICAgIGJ5dGVjIDggLy8gIkVSUjplcnJEYm1hIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckRibWEKCm5ld0luc3RhbnREaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjE5NgogICAgLy8gdGhpcy5hc3NlcnRWYWxpZFVubG9jayh0aW1lVG9VbmxvY2spCiAgICBmcmFtZV9kaWcgLTQKICAgIGNhbGxzdWIgYXNzZXJ0VmFsaWRVbmxvY2sKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MTk3CiAgICAvLyB0aGlzLmFzc2VydFZhbGlkRXhwaXJhdGlvbihleHBpcmF0aW9uKQogICAgZnJhbWVfZGlnIC0zCiAgICBjYWxsc3ViIGFzc2VydFZhbGlkRXhwaXJhdGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoxOTkKICAgIC8vIGNvbnN0IGlkID0gdGhpcy5uZXdEaXNidXJzZW1lbnRJRCgpCiAgICBjYWxsc3ViIG5ld0Rpc2J1cnNlbWVudElECiAgICBkdXAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjAxCiAgICAvLyBjb25zdCBhbGxvY2F0aW9uc01icjogdWludDY0ID0gVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9ucy5sZW5ndGgKICAgIGludGMgNCAvLyAyNTMwMAogICAgZGlnIDIKICAgICoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjAyCiAgICAvLyBjb25zdCBtYnJBbW91bnQ6IHVpbnQ2NCA9IE1pbkRpc2J1cnNlbWVudHNNQlIgKyBhbGxvY2F0aW9uc01icgogICAgaW50YyA1IC8vIDU0NTAwCiAgICBkaWcgMQogICAgKwogICAgY292ZXIgNAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyMDUKICAgIC8vIGNyZWF0b3I6IFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjIwNC0yMTYKICAgIC8vIHRoaXMuZGlzYnVyc2VtZW50cyhpZCkudmFsdWUgPSB7CiAgICAvLyAgIGNyZWF0b3I6IFR4bi5zZW5kZXIsCiAgICAvLyAgIGZpbmFsaXplZDogdHJ1ZSwKICAgIC8vICAgdGl0bGU6ICcnLAogICAgLy8gICBhbW91bnQ6IDAsCiAgICAvLyAgIHRpbWVUb1VubG9jaywKICAgIC8vICAgZXhwaXJhdGlvbiwKICAgIC8vICAgYWxsb2NhdGlvbnM6IDAsCiAgICAvLyAgIGRpc3RyaWJ1dGVkOiAwLAogICAgLy8gICBtYnJDcmVkaXRzOiBhbGxvY2F0aW9uc01iciwKICAgIC8vICAgcmVjbGFpbVRvLAogICAgLy8gICBub3RlOiAnJywKICAgIC8vIH0KICAgIGludGNfMCAvLyAwCiAgICBpdG9iCiAgICBzd2FwCiAgICBwdXNoYnl0ZXMgMHg4MDAwNzUKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC00CiAgICBpdG9iCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtMwogICAgaXRvYgogICAgY29uY2F0CiAgICBkaWcgMQogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC0xCiAgICBjb25jYXQKICAgIHB1c2hieXRlcyAweDAwNzcwMDAwMDAwMAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjIwNAogICAgLy8gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZSA9IHsKICAgIHN3YXAKICAgIGl0b2IKICAgIGR1cAogICAgY292ZXIgNAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo4MAogICAgLy8gZGlzYnVyc2VtZW50cyA9IEJveE1hcDx1aW50NjQsIERpc2J1cnNlbWVudERldGFpbHM+KHsga2V5UHJlZml4OiBSZXdhcmRzQm94UHJlZml4RGlzYnVyc2VtZW50cyB9KQogICAgYnl0ZWNfMCAvLyAiZCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyMDQtMjE2CiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlID0gewogICAgLy8gICBjcmVhdG9yOiBUeG4uc2VuZGVyLAogICAgLy8gICBmaW5hbGl6ZWQ6IHRydWUsCiAgICAvLyAgIHRpdGxlOiAnJywKICAgIC8vICAgYW1vdW50OiAwLAogICAgLy8gICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgIGV4cGlyYXRpb24sCiAgICAvLyAgIGFsbG9jYXRpb25zOiAwLAogICAgLy8gICBkaXN0cmlidXRlZDogMCwKICAgIC8vICAgbWJyQ3JlZGl0czogYWxsb2NhdGlvbnNNYnIsCiAgICAvLyAgIHJlY2xhaW1UbywKICAgIC8vICAgbm90ZTogJycsCiAgICAvLyB9CiAgICBkdXAKICAgIGJveF9kZWwKICAgIHBvcAogICAgc3dhcAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyMTgKICAgIC8vIGxldCBzdW06IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjIxOQogICAgLy8gbGV0IG5ld0JveGVzOiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyMjAKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBhbGxvY2F0aW9ucy5sZW5ndGg7IGkgKz0gMSkgewogICAgaW50Y18wIC8vIDAKCm5ld0luc3RhbnREaXNidXJzZW1lbnRfd2hpbGVfdG9wQDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjIyMAogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGFsbG9jYXRpb25zLmxlbmd0aDsgaSArPSAxKSB7CiAgICBkdXAKICAgIGRpZyAyCiAgICA8CiAgICBieiBuZXdJbnN0YW50RGlzYnVyc2VtZW50X2FmdGVyX3doaWxlQDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjIxCiAgICAvLyBuZXdCb3hlcyArPSB0aGlzLndyaXRlQWxsb2NhdGlvbihpZCwgYWxsb2NhdGlvbnNbaV0uYWRkcmVzcywgYXNzZXQsIGFsbG9jYXRpb25zW2ldLmFtb3VudCkKICAgIGZyYW1lX2RpZyAtMgogICAgZXh0cmFjdCAyIDAKICAgIGRpZyAxCiAgICBwdXNoaW50IDQwCiAgICAqCiAgICBwdXNoaW50IDQwCiAgICBleHRyYWN0MyAvLyBvbiBlcnJvcjogaW5kZXggYWNjZXNzIGlzIG91dCBvZiBib3VuZHMKICAgIGR1cAogICAgZXh0cmFjdCAwIDMyCiAgICBzd2FwCiAgICBwdXNoaW50IDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZGlnIDYKICAgIHVuY292ZXIgMgogICAgZnJhbWVfZGlnIC01CiAgICBkaWcgMwogICAgY2FsbHN1YiB3cml0ZUFsbG9jYXRpb24KICAgIHVuY292ZXIgNAogICAgKwogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyMjIKICAgIC8vIHN1bSArPSBhbGxvY2F0aW9uc1tpXS5hbW91bnQKICAgIHVuY292ZXIgNAogICAgKwogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyMjAKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBhbGxvY2F0aW9ucy5sZW5ndGg7IGkgKz0gMSkgewogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGIgbmV3SW5zdGFudERpc2J1cnNlbWVudF93aGlsZV90b3BAMwoKbmV3SW5zdGFudERpc2J1cnNlbWVudF9hZnRlcl93aGlsZUA1OgogICAgcG9wbiAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjIyNAogICAgLy8gdGhpcy51c2VNYnJDcmVkaXQoaWQsIFVzZXJBbGxvY2F0aW9uTUJSICogbmV3Qm94ZXMpCiAgICBpbnRjIDQgLy8gMjUzMDAKICAgICoKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgY2FsbHN1YiB1c2VNYnJDcmVkaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjI2CiAgICAvLyByZXR1cm4geyBpZCwgc3VtLCBtYnJBbW91bnQgfQogICAgaXRvYgogICAgY29uY2F0CiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtMgogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czo6UmV3YXJkcy5uZXdEaXNidXJzZW1lbnQobWJyUGF5bWVudDogdWludDY0LCB0aXRsZTogYnl0ZXMsIHRpbWVUb1VubG9jazogdWludDY0LCBleHBpcmF0aW9uOiB1aW50NjQsIG5vdGU6IGJ5dGVzLCByZWNsYWltVG86IGJ5dGVzKSAtPiB1aW50NjQ6Cm5ld0Rpc2J1cnNlbWVudDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjI5LTIzNgogICAgLy8gcHJpdmF0ZSBuZXdEaXNidXJzZW1lbnQoCiAgICAvLyAgIG1iclBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgdGl0bGU6IHN0cmluZywKICAgIC8vICAgdGltZVRvVW5sb2NrOiB1aW50NjQsCiAgICAvLyAgIGV4cGlyYXRpb246IHVpbnQ2NCwKICAgIC8vICAgbm90ZTogc3RyaW5nLAogICAgLy8gICByZWNsYWltVG86IEFjY291bnQKICAgIC8vICk6IHVpbnQ2NCB7CiAgICBwcm90byA2IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjM3CiAgICAvLyBjb25zdCBpZCA9IHRoaXMubmV3RGlzYnVyc2VtZW50SUQoKQogICAgY2FsbHN1YiBuZXdEaXNidXJzZW1lbnRJRAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyMzkKICAgIC8vIGNvbnN0IGNvc3RzID0gdGhpcy5tYnIodGl0bGUsIG5vdGUpCiAgICBmcmFtZV9kaWcgLTUKICAgIGZyYW1lX2RpZyAtMgogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9iYXNlLnRzOjpCYXNlUmV3YXJkcy5tYnIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjQwCiAgICAvLyBjb25zdCBtYnJBbW91bnQgPSBjb3N0cy5kaXNidXJzZW1lbnRzCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjQzCiAgICAvLyBhc3NlcnRTYWZlUGF5bWVudChtYnJQYXltZW50LCBUeG4uc2VuZGVyKQogICAgZnJhbWVfZGlnIC02CiAgICB0eG4gU2VuZGVyCiAgICBjYWxsc3ViIGFzc2VydFNhZmVQYXltZW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjI0NAogICAgLy8gbG9nZ2VkQXNzZXJ0KG1iclBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBlcnJJbnZhbGlkUGF5bWVudCkKICAgIGZyYW1lX2RpZyAtNgogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IG5ld0Rpc2J1cnNlbWVudF9hZnRlcl9hc3NlcnRAMgogICAgYnl0ZWMgNSAvLyAiRVJSOmVycklwYXkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBheQoKbmV3RGlzYnVyc2VtZW50X2FmdGVyX2Fzc2VydEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyNDUKICAgIC8vIGxvZ2dlZEFzc2VydChtYnJQYXltZW50LmFtb3VudCA+PSBtYnJBbW91bnQsIGVyckludmFsaWRQYXltZW50KQogICAgZnJhbWVfZGlnIC02CiAgICBndHhucyBBbW91bnQKICAgIGR1cAogICAgZGlnIDIKICAgID49CiAgICBibnogbmV3RGlzYnVyc2VtZW50X2FmdGVyX2Fzc2VydEA0CiAgICBieXRlYyA1IC8vICJFUlI6ZXJySXBheSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcGF5CgpuZXdEaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9jb250cmFjdC5hbGdvLnRzOjI0OAogICAgLy8gY3JlYXRvcjogVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjU2CiAgICAvLyBtYnJDcmVkaXRzOiBtYnJQYXltZW50LmFtb3VudCAtIG1ickFtb3VudCwKICAgIHN3YXAKICAgIHVuY292ZXIgMgogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyNDctMjU5CiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlID0gewogICAgLy8gICBjcmVhdG9yOiBUeG4uc2VuZGVyLAogICAgLy8gICBmaW5hbGl6ZWQ6IGZhbHNlLAogICAgLy8gICB0aXRsZSwKICAgIC8vICAgYW1vdW50OiAwLAogICAgLy8gICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgIGV4cGlyYXRpb24sCiAgICAvLyAgIGFsbG9jYXRpb25zOiAwLAogICAgLy8gICBkaXN0cmlidXRlZDogMCwKICAgIC8vICAgbWJyQ3JlZGl0czogbWJyUGF5bWVudC5hbW91bnQgLSBtYnJBbW91bnQsCiAgICAvLyAgIHJlY2xhaW1UbywKICAgIC8vICAgbm90ZSwKICAgIC8vIH0KICAgIGZyYW1lX2RpZyAtNQogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgZnJhbWVfZGlnIC01CiAgICBjb25jYXQKICAgIHVuY292ZXIgMgogICAgYnl0ZWMgMjAgLy8gMHgwMDAwNzUKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIGxlbgogICAgcHVzaGludCAxMTcKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjUxCiAgICAvLyBhbW91bnQ6IDAsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyNDctMjU5CiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlID0gewogICAgLy8gICBjcmVhdG9yOiBUeG4uc2VuZGVyLAogICAgLy8gICBmaW5hbGl6ZWQ6IGZhbHNlLAogICAgLy8gICB0aXRsZSwKICAgIC8vICAgYW1vdW50OiAwLAogICAgLy8gICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgIGV4cGlyYXRpb24sCiAgICAvLyAgIGFsbG9jYXRpb25zOiAwLAogICAgLy8gICBkaXN0cmlidXRlZDogMCwKICAgIC8vICAgbWJyQ3JlZGl0czogbWJyUGF5bWVudC5hbW91bnQgLSBtYnJBbW91bnQsCiAgICAvLyAgIHJlY2xhaW1UbywKICAgIC8vICAgbm90ZSwKICAgIC8vIH0KICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgZGlnIDEKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC00CiAgICBpdG9iCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtMwogICAgaXRvYgogICAgY29uY2F0CiAgICBkaWcgMQogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIHVuY292ZXIgMwogICAgaXRvYgogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgLTEKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC0yCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBmcmFtZV9kaWcgLTIKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjQ3CiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMoaWQpLnZhbHVlID0gewogICAgZGlnIDEKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6ODAKICAgIC8vIGRpc2J1cnNlbWVudHMgPSBCb3hNYXA8dWludDY0LCBEaXNidXJzZW1lbnREZXRhaWxzPih7IGtleVByZWZpeDogUmV3YXJkc0JveFByZWZpeERpc2J1cnNlbWVudHMgfSkKICAgIGJ5dGVjXzAgLy8gImQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2NvbnRyYWN0LmFsZ28udHM6MjQ3LTI1OQogICAgLy8gdGhpcy5kaXNidXJzZW1lbnRzKGlkKS52YWx1ZSA9IHsKICAgIC8vICAgY3JlYXRvcjogVHhuLnNlbmRlciwKICAgIC8vICAgZmluYWxpemVkOiBmYWxzZSwKICAgIC8vICAgdGl0bGUsCiAgICAvLyAgIGFtb3VudDogMCwKICAgIC8vICAgdGltZVRvVW5sb2NrLAogICAgLy8gICBleHBpcmF0aW9uLAogICAgLy8gICBhbGxvY2F0aW9uczogMCwKICAgIC8vICAgZGlzdHJpYnV0ZWQ6IDAsCiAgICAvLyAgIG1ickNyZWRpdHM6IG1iclBheW1lbnQuYW1vdW50IC0gbWJyQW1vdW50LAogICAgLy8gICByZWNsYWltVG8sCiAgICAvLyAgIG5vdGUsCiAgICAvLyB9CiAgICBkdXAKICAgIGJveF9kZWwKICAgIHBvcAogICAgc3dhcAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvY29udHJhY3QuYWxnby50czoyNjEKICAgIC8vIHJldHVybiBpZAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3Jld2FyZHMvYmFzZS50czo6QmFzZVJld2FyZHMubWJyKHRpdGxlOiBieXRlcywgbm90ZTogYnl0ZXMpIC0+IGJ5dGVzOgpzbWFydF9jb250cmFjdHMvcmV3YXJkcy9iYXNlLnRzOjpCYXNlUmV3YXJkcy5tYnI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9iYXNlLnRzOjctOAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICAvLyBtYnIodGl0bGU6IHN0cmluZywgbm90ZTogc3RyaW5nKTogUmV3YXJkc01CUkRhdGEgewogICAgcHJvdG8gMiAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9iYXNlLnRzOjEwCiAgICAvLyBkaXNidXJzZW1lbnRzOiBNaW5EaXNidXJzZW1lbnRzTUJSICsgKEJveENvc3RQZXJCeXRlICogKEJ5dGVzKHRpdGxlKS5sZW5ndGggKyBCeXRlcyhub3RlKS5sZW5ndGgpKSwKICAgIGZyYW1lX2RpZyAtMgogICAgbGVuCiAgICBmcmFtZV9kaWcgLTEKICAgIGxlbgogICAgKwogICAgaW50YyA2IC8vIDQwMAogICAgKgogICAgaW50YyA1IC8vIDU0NTAwCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9iYXNlLnRzOjktMTIKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIGRpc2J1cnNlbWVudHM6IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoQm94Q29zdFBlckJ5dGUgKiAoQnl0ZXModGl0bGUpLmxlbmd0aCArIEJ5dGVzKG5vdGUpLmxlbmd0aCkpLAogICAgLy8gICB1c2VyQWxsb2NhdGlvbnM6IFVzZXJBbGxvY2F0aW9uTUJSCiAgICAvLyB9CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV3YXJkcy9iYXNlLnRzOjExCiAgICAvLyB1c2VyQWxsb2NhdGlvbnM6IFVzZXJBbGxvY2F0aW9uTUJSCiAgICBpbnRjIDQgLy8gMjUzMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXdhcmRzL2Jhc2UudHM6OS0xMgogICAgLy8gcmV0dXJuIHsKICAgIC8vICAgZGlzYnVyc2VtZW50czogTWluRGlzYnVyc2VtZW50c01CUiArIChCb3hDb3N0UGVyQnl0ZSAqIChCeXRlcyh0aXRsZSkubGVuZ3RoICsgQnl0ZXMobm90ZSkubGVuZ3RoKSksCiAgICAvLyAgIHVzZXJBbGxvY2F0aW9uczogVXNlckFsbG9jYXRpb25NQlIKICAgIC8vIH0KICAgIGl0b2IKICAgIGNvbmNhdAogICAgcmV0c3ViCg==", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyAHAAEIAtTFAeSpA5ADJhgBZAtFUlI6ZXJyRGJuZQQVH3x1C0VSUjplcnJZbmNyC0VSUjplcnJJeGZyC0VSUjplcnJJcGF5C0VSUjplcnJJbWJyC0VSUjplcnJEYmFmC0VSUjplcnJEYm1hAXUPZGlzYnVyc2VtZW50X2lkCWFraXRhX2RhbwtFUlI6ZXJySWdpeAtFUlI6ZXJyRGJlbQtFUlI6ZXJyRGJubAtFUlI6ZXJySXBtcwtFUlI6ZXJyTmNscwtFUlI6ZXJyTnJreQtFUlI6ZXJySXBtcgtFUlI6ZXJySXBtYQMAAHULRVJSOmVyckRibGsLRVJSOmVyckFsbmULRVJSOmVyckRibngxGEAABCcKI2cxGRREMRhBAKSCFgRmYSBaBNYaafoEZeSWQwQcnrvbBI9JJi0EVlas+QT2LNwrBG9cEM8EVCSlkQTcrAk1BHt9xfwEo6FsqgSvGhTyBD7ECqQEvTzQkASIxflzBAh7S2UEFJadlwQz6SyUBIVN7eAE1Uu62QQ5Tq6yNhoAjhYBIwF5AeUCNAJ8A+kEjwU7BxMHlgf1CE0IvQknCn0LiQzgDTQNdwABDa0N1gAjQ4AEzZrWfjYaAI4BAOgAigIAi/44AIv/EkAABCcPsACL/jgJMgMSQAAEJxCwAIv+OCAyAxJAAAQnEbAAiYoEAIv8i/2I/8iL/DgHi/4SQAAEJxKwAIv8OAiL/xJAAAQnE7AAiYoFAIv7OACL/BJAAAQnD7AAi/s4EzIDEkAAD4ALRVJSOmVyck5jbHewAIv7OBUyAxJAAAQnELAAi/s4IDIDEkAABCcRsACL+zgUi/0SQAAPgAtFUlI6ZXJySWFyZbAAi/s4EYv+EkAAD4ALRVJSOmVycklhc3SwAIv7OBKL/xJAAA+AC0VSUjplcnJJYWFtsACJNhoBSSJZJQhLARUSRFcCADYaAkkVJBJEF4AHdmVyc2lvbk8CZycLTGcjQzYaAUkVJBJEF0kxFiMJSU4COBAjEkQWKExQSb1FAUAAAymwACKBILoxABJAAAMrsAAxAEsBSU8CiP6zOAcyChJAAAQnBbAAOAhJQAAEJwWwAIgMryNDNhoBSRUkEkQXNhoCSRUkEkQXTBYoTFBJvUUBQAADKbAASSKBILoxABJAAAMrsABLAUAABCcGsABJgUskuhdLAg9AAAQnBrAASYFLJLoXTwJJTgIJFk8CgUtPAruxMQCyB7III7IQIrIBsyNDMRYjCUk4ECMSRDYaAUkiWSUISwEVEkRXAgA2GgJJFSQSRBc2GgNJFSQSRBc2GgRJIlklCEsBFRJEVwIANhoFSRWBIBJEiA5ZFipMULAjQzEWIwlJOBAjEkQ2GgFJIlklCEsBFRJEVwIANhoCSRUkEkQXNhoDSRUkEkQXNhoESSJZJQhLARUSRFcCADIDiA4RFipMULAjQ4AASTYaAUkVJBJEFzYaAklOAkkiWSUISwEVSU4EEkRXAgBMNhoDSU4CFSQSRDYaBElOAhUkEkQ2GgVJTgJJIlklCEsBFRJEVwIATBYoTFBJvUUBQAADKbAARwIigSC6SwGBICO6IlNOA0sBgXUluhclCEsCgXVPArpXAgBOA0sBgXMluhdLAksBJboXJQhPA04CulcCAE4CMQASQAADK7AATwNBAAQnB7AATwIVTwIVCCEGCyEFCElFCk8GFU8DFQghBgshBQhJRQoMQQCCSwdLBwlJSwKBSyS6Fw5AAAQnBrAASwFJgUskuhdPAgkWgUtMu0m+REmBIVlLASJLAlhPCFBLAoFzWUsDFU8ESwJPAlJPAkxQSwFPAwlPAk8HCEwJFlcGAlxzSwG8SEsBTL9JgStPBbtJgTNPBLtJvkhJgXNZIkxYTwJQSwG8SL8jQ0sGSwgNQf+bRwKBSyS6F0sISwoJCBaBS0y7Qv+GMRYjCUk4ECMSRDYaAUkVJBJEF0k2GgJJTgJJIllJTgWBKAslCEwVEkQWKExQSb1FAUAAAymwAEkigSC6TIEgI7oiU0wxABJAAAMrsABBAAQnB7AAIk4CIkwiSUsGDEEALksBVwIASwGBKAuBKFhJVwAgTIEgW0sFTwIiSwOIClBPBAhOA08FCE4EIwhC/8tGAiEEC4gJvjEAMgpLBE4CTwOI+7IjQzEWIwlJOBCBBBJENhoBSRUkEkQXSTYaAklOAkkiWUlOBoEoCyUITBUSRBYoTFBJvUUBQAADKbAASSKBILpMgSAjuiJTTDEAEkAAAyuwAEEABCcHsABLAjgRTgMiTgMiTCJJSwgMQQAvSwFXAgBLAYEoC4EoWElXACBMgSBbSwVPAksJSwOICaJPBAhOA08GCE4FIwhC/8pGAiEEC4gJEDEAMgpPBE8EiPstI0M2GgFJFSQSRBc2GgJJFSQSRBc2GgNJIlklCEsBFRJEVwIATgI2GgRJFSQSRBdMNhoFSRUkEkQXTDYaBkkiWSUISwEVEkRXAgBOAzYaB0lOB0kiWUlOAkmBKAslCE8CFRJEQAAEJwiwADEWSwENQAAEJwywADEWSwEJSwISQAAEJwywAEsBIwlLBhJAAAQnDLAATwNJiAiUTwNJTgKICLSICDxJTgNOBU8HSTgQIxJETwhJTgJPCUlOBogLHUkiW0wkW0sICzEAMgpPA0sDCE8ETgOI+i8xADIDSwMVFlcGAk8EUE8CJxRQSwEVgXUIIhZPAksBUE8GFlBPBhZQSwFQTFBPBBZQTwNQSwMVFlcGAk8EUE8CFlcGAk8CTFBPAlBMUEwWSU4EKExQSU4CSbxITL8iTgIiTEsBSwMMQQBbSwRLAklOAghJTgI4EIEEEkRLCVcCAEyBKAuBKFhJTgaBIFtJQAAEJw2wADEAMgpPA0k4EUxPA08DSwNLBYj5rE8GVwAgSwlMTwJPA4gH8E8ECE4DTCMITEL/nUUBRQFPAkghBE8CC08DTIgHV0mBIyS6F0AABCcNsABJgTskuhdAAAQnCLAASYEgI7oiI1SBIEy7KkxQsCNDNhoBSRUkEkQXFihMUEm9RQFAAAMpsABHAiKBILpLAYEgI7oiU04DSwGBKyS6F04DSwGBMyS6F04DSwGBIyS6F04DTIE7JLoXTDEAEkAAAyuwAE8FQQAEJwewAE8EiAbzTwOIBxZPAkAABCcNsABAAAQnCLAASYEgI7oiI1SBIEy7I0MxFiMJSTgQIxJENhoBSRUkEkQXNhoCSRUkEkQXNhoDSSJZgSgLJQhLARUSRDYaBEkVgSASRCJOBIgIBUhJVwAISwEkW08CgRBbMQAyCk8CTwMITwROA4j4UCpMULAjQzEWIwlJOBAjEkQ2GgFJFSQSRBc2GgJJFSQSRBc2GgNJIlmBKAslCEsBFRJEMgMiTgSIB61ISVcACEsBJFtPAoEQWzEAMgpPAk8DCE8ETgOI9/gqTFCwI0MxFiUJSTgQIxJEMRYjCUk4EIEEEkQ2GgFJFSQSRBc2GgJJFSQSRBc2GgNJIlmBKAslCEsBFRJENhoESRWBIBJESwQ4EU4EiAdASElXAAhLASRbTwKBEFsxADIKTwZOAk8DiPeOTwJMiAZeKkxQsCNDMRYlCUk4ECMSRDEWIwlJOBCBBBJENhoBSRUkEkQXNhoCSRUkEkQXNhoDSSJZgSgLJQhLARUSREsDOBEyA0xOBIgG1khJVwAISwEkW08CgRBbMQAyCk8GTgJPA4j3JE8CTIgF9CpMULAjQ4AANhoBRwIiWUlOAoEQCyUITBUSRCJJSwIMQQE3SwJXAgBLAYEQC4EQWElOBCJbSU4FFklOAihMUElOAr1FAUAAAymwAEsBSYEgI7oiU0sBgSskuhdOCEsBgTMkuhdFC0sBgSMkuhdOBEsBgUMkuhdOBEsBgXMluhdLAksBJboXJQhPA04CulcCAExAAAQnDrAAMgdPCg9AAAQnFbAASwpBAAhLCjIHD0EApSNAAAQnFbAATwRPBA1AAA+AC0VSUjplcnJEYmZksAAxAE8HJFtJTggWUE8EUCcJTFBJvUUBQAAEJxawAEm+RBdJTgJPBUmBOyS6FyMJFksBgTtPArtJgUMkuhdPAggWgUNMu7xITwYhBIgD6EsFQQAcMQCxTwKyBU8FshGyFLISgQSyECKyAbMjCEL+3k8FSDEAsU8CsgWyB7III7IQIrIBs0L/4yJC/1gjQ4AANhoBSRUkEkQXSTYaAklOAkkiWUlOA4EoCyUITBUSRBZJKExQSb1FAUAAAymwAEcCIoEguklOAk4DSYEgI7oiU04DgTMkuhdFCTEAEkAAAyuwAExAAAQnDrAASwZBAKdLBjIHDEEAnyNAAAQnF7AAIklLBQxBAI1LBVcCAEsBgSgLgShYSVcAIEyBIFtJTgQWUEsFUCcJTFBJvUUBQAAEJxawAEm+RBdJTgJLBEmBOyS6FyMJFksBgTtPArtJgSMkuhdPAgkWgSNMu7xISwghBIgC1EsDQQAYsU8DshGyEksCshSBBLIQIrIBsyMIQv+ATwNIsbIISwKyByOyECKyAbNC/+cjQyJC/14iSYAARwM2GgFJFSQSRBdJNhoCSU4CSSJZSU4DgSgLJQhMFRJEFkkoTFBJvUUBQAADKbAARwKBICO6IlNOAkmBMyS6F0UKgwJTILpJRQwyAxNAAA+AC0VSUjplcnJEYm5zsABMQAAEJw6wAEsHQQDjSwcyBwxBANsjQAAEJxewACJFCSJMSwFLBAxBAJtLBFcCAEsCgSgLgShYSVcAIEyBIFtJRQoWUEsDUCcJTFBJRQ2+TBdFCEEANkcCgTskuhcjCRZLAYE7TwK7SYEjJLoXSwgJFoEjTLtLC7xISwkhBAhFCksHQAAOSwlLBwhFCkwjCExC/49LCksIcABFAUAAD4ALRVJSOmVyclJjb2mwALFLB7IRSwayEksKshSBBLIQIrIBs0L/x0UBgTskuhdAAApLA4gCzEsICEUISwdBABCxSweyCEsIsgcjshAisgGzI0MiQv8iNhoBSRUkEkQXSRYoTFBJvUUBQAADKbAASSKBILpJTgJOA4E7JLoXTDEAEkAAAyuwAEEAD4ALRVJSOmVyckRibnmwALGIAmWyCLIHI7IQIrIBsyNDNhoBSRUkEkQXNhoCSRUkEkQXTBYoTFBJvUUBQAADKbAAIQRPAgtJTwKBSyS6F0lPAg9BAApGAiIWKkxQsCNDCUL/9TYaAUkVJBJEFzEAIicLZUSABndhbGxldGVIcghEEkAAD4ALRVJSOmVyck5kYW+wACcLTGcjQzYaAUkiWSUISwEVEkRXAgA2GgJJIlklCEsBFRJEVwIAiANEKkxQsCNDMRYjCUcCOBAjEkQ2GgFJFSQSRBdMOAcyChJAAAQnErAATDgIMhASQAAEJxOwALEyCkyyESKyErIUgQSyECKyAbMjQyInCmVESSMIJwpMZ4mKAgCL/hYoTFBJgUskuheL/wgWgUtMu4mKAgCL/hYoTFBJgUskuheL/w9AAAQnBrAASYFLJLoXi/8JFoFLTLuJigEAi/8yBw9AAAWL/0AAFCNAAA+AC0VSUjplcnJJZHV0sACJIkL/6YoBADIHgTwIi/8OQAAFi/9AABQjQAAPgAtFUlI6ZXJySWR4dLAAiSJC/+mKBAGL/0AAAiKJi/4Wi/1MUIv8FkxLAVAnCUxQSU4CvkwXTgIoTwJQSU4CSYEjJLoXi/8IFoEjTLtBAAhIi/8IFr8iiUUBi/8WTwJMv0mBOyS6FyMIFoE7TLsjiYoCACKL/jgAMQASQAAEJwSwAIv+OBMyAxJAAAQnBLAAi/44IDIDEkAABCcEsACL/jgVSYwAMgMSQAAIiwAyChJBADAjQAAPgAtFUlI6ZXJySWN0b7AAi/44FDIKEkAABCcEsACL/jgSi/8SQAAEJwSwAIkiQv/NigEBi/8WKExQSYFLJLoXSwGBdSW6FyUISwKBdU8CulcCAEsCgXMluhdLA0sBJboXJQhLBE4CulcCAEwVTBUIIQYLIQUICEy8SImKBQKL/iJZSUAABCcIsACL/Ij+fIv9iP6fiP4nSU4CIQRLAgshBUsBCE4EMQAiFkyAA4AAdVBLAVCL/BZQi/0WUEsBUExQTBZQi/9QgAYAdwAAAABQTBZJTgQoTFBJvEhMvyJMIkwiSUsCDEEAL4v+VwIASwGBKAuBKFhJVwAgTIEgW0sGTwKL+0sDiP5VTwQITgNPBAhOAyMIQv/KRgIhBAtPAkyI/cAWUEwWUIv+iYoGAYj9jYv7i/6IAIEiW4v6MQCI73WL+jgHMgoSQAAEJwWwAIv6OAhJSwIPQAAEJwWwADEATE8CCYv7FRZXBgKL+1BPAicUUEsBFYF1CCIWTwJLAVCL/BZQi/0WUEsBUExQTwMWUIv/UIv+FRZXBgKL/lBPAhZXBgJPAkxQTwJQTFBLARYoTFBJvEhMv4mKAgGL/hWL/xUIIQYLIQUIFiEEFlCJ", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
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
    transactions immediately before this call: one exact MBR payment, then one asset transfer
    per allocation, all from the caller.
  
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
    MBR per entry, and the allocation sum, from the caller. Repeated addresses are summed and zero amounts are skipped; the MBR of boxes not created
    stays as creator-withdrawable credit. After `expiration`, anyone may sweep what is unclaimed to
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
    the creator.
  
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
        transactions immediately before this call: one exact MBR payment, then one asset transfer
        per allocation, all from the caller.
    
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
        MBR per entry, and the allocation sum, from the caller. Repeated addresses are summed and zero amounts are skipped; the MBR of boxes not created
        stays as creator-withdrawable credit. After `expiration`, anyone may sweep what is unclaimed to
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
        the creator.
    
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
        transactions immediately before this call: one exact MBR payment, then one asset transfer
        per allocation, all from the caller.
    
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
        MBR per entry, and the allocation sum, from the caller. Repeated addresses are summed and zero amounts are skipped; the MBR of boxes not created
        stays as creator-withdrawable credit. After `expiration`, anyone may sweep what is unclaimed to
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
        the creator.
    
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
        transactions immediately before this call: one exact MBR payment, then one asset transfer
        per allocation, all from the caller.
    
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
        MBR per entry, and the allocation sum, from the caller. Repeated addresses are summed and zero amounts are skipped; the MBR of boxes not created
        stays as creator-withdrawable credit. After `expiration`, anyone may sweep what is unclaimed to
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
        the creator.
    
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
      // one ASA transfer per ASA allocation and at most one payment (ALGO amounts + freed MBR)
      extraFee: microAlgo(1e3 * (targets.filter((r) => BigInt(r.asset) !== 0n).length + 1)),
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
//# sourceMappingURL=chunk-TVSYN2KP.mjs.map
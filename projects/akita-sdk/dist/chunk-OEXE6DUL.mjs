import {
  makeErrorTranslator,
  withErrorCodeAliases
} from "./chunk-GOQ4H3PG.mjs";
import {
  BaseSDK
} from "./chunk-ITXBJZ4G.mjs";
import {
  ENV_VAR_NAMES
} from "./chunk-POLXD3ER.mjs";

// src/staking/index.ts
import { microAlgo } from "@algorandfoundation/algokit-utils";

// src/generated/StakingClient.ts
import { getArc56ReturnValue, getABIStructFromABITuple } from "@algorandfoundation/algokit-utils/types/app-arc56";
import {
  AppClient as _AppClient
} from "@algorandfoundation/algokit-utils/types/app-client";
import { AppFactory as _AppFactory } from "@algorandfoundation/algokit-utils/types/app-factory";
var APP_SPEC = { "name": "Staking", "structs": { "AppStake": [{ "name": "amount", "type": "uint64" }, { "name": "lastUpdate", "type": "uint64" }, { "name": "weightedAge", "type": "uint64" }, { "name": "inheritedAge", "type": "uint64" }], "AppStakeKey": [{ "name": "app", "type": "uint64" }, { "name": "address", "type": "address" }, { "name": "asset", "type": "uint64" }], "Escrow": [{ "name": "hard", "type": "uint64" }, { "name": "lock", "type": "uint64" }], "HeartbeatKey": [{ "name": "address", "type": "address" }, { "name": "asset", "type": "uint64" }], "Stake": [{ "name": "amount", "type": "uint64" }, { "name": "lastUpdate", "type": "uint64" }, { "name": "expiration", "type": "uint64" }, { "name": "weightedAge", "type": "uint64" }], "StakeCheck": [{ "name": "valid", "type": "bool" }, { "name": "balance", "type": "uint64" }], "StakeInfo": [{ "name": "asset", "type": "uint64" }, { "name": "type", "type": "uint8" }], "StakeKey": [{ "name": "address", "type": "address" }, { "name": "asset", "type": "uint64" }, { "name": "type", "type": "uint8" }], "TotalsInfo": [{ "name": "locked", "type": "uint64" }, { "name": "escrowed", "type": "uint64" }, { "name": "liveLockedStake", "type": "uint64" }], "WeightedStake": [{ "name": "amount", "type": "uint64" }, { "name": "weightedAge", "type": "uint64" }] }, "methods": [{ "name": "create", "args": [{ "type": "string", "name": "version" }, { "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "init", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "optIn", "args": [{ "type": "pay", "name": "payment", "desc": "The payment transaction" }, { "type": "uint64", "name": "asset", "desc": "The asset to be opted into" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "optin tells the contract to opt into an asa", "events": [], "recommendations": {} }, { "name": "stake", "args": [{ "type": "pay", "name": "payment" }, { "type": "uint8", "name": "type" }, { "type": "uint64", "name": "amount" }, { "type": "uint64", "name": "expiration" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "stakeAsa", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "uint8", "name": "type" }, { "type": "uint64", "name": "amount" }, { "type": "uint64", "name": "expiration" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "withdraw", "args": [{ "type": "uint64", "name": "asset" }, { "type": "uint8", "name": "type" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "checkpointExpiredLock", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "asset" }], "returns": { "type": "bool" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Permissionlessly removes an expired lock from the live governance total.", "events": [], "recommendations": {} }, { "name": "createHeartbeat", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "asset" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "checkpointSoftStake", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "asset" }], "returns": { "type": "(bool,uint64)", "struct": "StakeCheck" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Permissionlessly records an observed shortfall against the portable root commitment.", "events": [], "recommendations": {} }, { "name": "commitAppSoftStake", "args": [{ "type": "pay", "name": "payment" }, { "type": "address", "name": "address" }, { "type": "uint64", "name": "asset" }, { "type": "uint64", "name": "amount" }, { "type": "bool", "name": "inheritRoot" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Creates or adds to a soft commitment scoped to one consuming app.\nNew commitments may inherit the portable root's current weighted age.", "events": [], "recommendations": {} }, { "name": "checkpointAppSoftStake", "args": [{ "type": "uint64", "name": "app" }, { "type": "address", "name": "address" }, { "type": "uint64", "name": "asset" }], "returns": { "type": "(bool,uint64)", "struct": "StakeCheck" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": 'Records a shortfall against an app-scoped commitment.\n\nAnyone may call it, but only the consuming app itself may shrink the commitment; any other\ncaller only resets its accrued age. Otherwise a holder could empty their wallet, shrink their\nown commitment to 0 and stay "valid" for that app forever (H-1). A missing commitment (never\nmade, or released) is reported as invalid instead of failing.', "events": [], "recommendations": {} }, { "name": "updateSettings", "args": [{ "type": "pay", "name": "payment" }, { "type": "uint64", "name": "asset" }, { "type": "uint64", "name": "value" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Sets an asset's maximum lock duration (stakeAsa LOCK).\n\n- The DAO's governance assets (AKTA / BONES) can only be configured by the DAO wallet; any\n  other asset by its creator (DAO-05).\n- The value must lie in [2 weeks, 4 years] and may never decrease, so a configured lockup can\n  neither freeze locking nor strand existing lockers' assumptions (G-5).", "events": [], "recommendations": {} }, { "name": "setHeartbeatManager", "args": [{ "type": "address", "name": "manager" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Sets the account allowed to record heartbeats. DAO wallet only (ST-4).", "events": [], "recommendations": {} }, { "name": "closeSoftStake", "args": [{ "type": "uint64", "name": "asset" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Owner closes their SOFT stake; the stake box MBR goes back to whoever paid it (L-2).", "events": [], "recommendations": {} }, { "name": "closeHeartbeat", "args": [{ "type": "uint64", "name": "asset" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Owner closes their heartbeat stake and its history; both boxes' MBR goes back to whoever paid it (L-2).", "events": [], "recommendations": {} }, { "name": "releaseAppStake", "args": [{ "type": "uint64", "name": "app" }, { "type": "address", "name": "address" }, { "type": "uint64", "name": "asset" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Deletes an app-scoped commitment and refunds its box MBR to the committed address (L-2).\nAllowed for the consuming app itself, or for the owner once that app no longer exists.", "events": [], "recommendations": {} }, { "name": "reclaimAppStake", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "asset" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "`releaseAppStake` for the consuming app, with the commitment's box MBR returned to that app\ninstead of the committed address. The app paid that deposit (`commitAppSoftStake`) on behalf of\nwhoever funded it there, and settles with that account itself.", "events": [], "recommendations": {} }, { "name": "optInCost", "args": [], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "stakeCost", "args": [{ "type": "uint64", "name": "asset" }, { "type": "uint8", "name": "type" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "appStakeCost", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "asset" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getTimeLeft", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "asset" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "mustGetTimeLeft", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "asset" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getInfo", "args": [{ "type": "address", "name": "address" }, { "type": "(uint64,uint8)", "struct": "StakeInfo", "name": "stake" }], "returns": { "type": "(uint64,uint64,uint64,uint64)", "struct": "Stake" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "mustGetInfo", "args": [{ "type": "address", "name": "address" }, { "type": "(uint64,uint8)", "struct": "StakeInfo", "name": "stake" }], "returns": { "type": "(uint64,uint64,uint64,uint64)", "struct": "Stake" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getWeightedStake", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "asset" }], "returns": { "type": "(uint64,uint64)", "struct": "WeightedStake" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "softCheck", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "asset" }], "returns": { "type": "(bool,uint64)", "struct": "StakeCheck" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getAppWeightedStake", "args": [{ "type": "uint64", "name": "app" }, { "type": "address", "name": "address" }, { "type": "uint64", "name": "asset" }, { "type": "bool", "name": "acceptInherited" }], "returns": { "type": "(uint64,uint64)", "struct": "WeightedStake" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getInfoAtLeast", "args": [{ "type": "address", "name": "address" }, { "type": "(uint64,uint8)", "struct": "StakeInfo", "name": "stake" }], "returns": { "type": "(uint64,uint64,uint64,uint64)[]" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getEscrowInfo", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "asset" }], "returns": { "type": "(uint64,uint64)", "struct": "Escrow" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getHeartbeat", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "asset" }], "returns": { "type": "(uint64,uint64,uint64,uint64)[4]" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "mustGetHeartbeat", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "asset" }], "returns": { "type": "(uint64,uint64,uint64,uint64)[4]" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getHeartbeatAverage", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "asset" }, { "type": "bool", "name": "includeEscrowed" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "mustGetHeartbeatAverage", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "asset" }, { "type": "bool", "name": "includeEscrowed" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getInfoList", "args": [{ "type": "address", "name": "address" }, { "type": "uint8", "name": "type" }, { "type": "uint64[]", "name": "assets" }], "returns": { "type": "(uint64,uint64,uint64,uint64)[]" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "mustGetInfoList", "args": [{ "type": "address", "name": "address" }, { "type": "uint8", "name": "type" }, { "type": "uint64[]", "name": "assets" }], "returns": { "type": "(uint64,uint64,uint64,uint64)[]" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "stakeCheck", "args": [{ "type": "address", "name": "address" }, { "type": "(uint64,uint64)[]", "name": "checks" }, { "type": "uint8", "name": "type" }, { "type": "bool", "name": "includeEscrowed" }], "returns": { "type": "bool" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getTotals", "args": [{ "type": "uint64[]", "name": "assets" }], "returns": { "type": "(uint64,uint64,uint64)[]" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getSettings", "args": [{ "type": "uint64[]", "name": "assets" }], "returns": { "type": "(uint64,bool)[]" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "update", "args": [{ "type": "string", "name": "newVersion" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["UpdateApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 1, "bytes": 2 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "heartbeatManagerAddress": { "keyType": "AVMString", "valueType": "address", "key": "aGVhcnRiZWF0X21hbmFnZXJfYWRkcmVzcw==", "desc": "The address that is allowed to call the 'beat' method to create heartbeat records" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" } }, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": { "stakes": { "keyType": "StakeKey", "valueType": "Stake", "prefix": "cw==" }, "appStakes": { "keyType": "AppStakeKey", "valueType": "AppStake", "prefix": "YQ==" }, "heartbeats": { "keyType": "HeartbeatKey", "valueType": "(uint64,uint64,uint64,uint64)[4]", "prefix": "aA==" }, "totals": { "keyType": "uint64", "valueType": "TotalsInfo", "prefix": "dA==" }, "settings": { "keyType": "uint64", "valueType": "uint64", "prefix": "ZQ==" } } } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [1532, 1868, 2238, 2527, 2776, 2915, 2965, 3009, 3178, 3462, 3525, 3693, 3928, 4618, 4636, 4705, 4718, 4832, 4931, 5271, 5313, 5380, 5428, 5529, 5748, 5900, 6074, 6182, 6285, 6461, 6481, 6513, 6533, 6561, 6583, 6771, 6977, 7033, 7072, 7139, 7217], "errorMessage": "Box must have value" }, { "pc": [3327, 4383, 4530], "errorMessage": "ERR:errAcrq" }, { "pc": [1123], "errorMessage": "ERR:errAopt" }, { "pc": [4335], "errorMessage": "ERR:errAsiu" }, { "pc": [1298, 1921], "errorMessage": "ERR:errBexp" }, { "pc": [1567, 2273], "errorMessage": "ERR:errBexu" }, { "pc": [1522, 2228], "errorMessage": "ERR:errHbcu" }, { "pc": [2903, 5426, 5527], "errorMessage": "ERR:errHbnf" }, { "pc": [2006, 2018, 2096, 2137, 2214, 2314, 2326, 2418], "errorMessage": "ERR:errIaam" }, { "pc": [1481, 1666, 2175, 2409, 3428, 3489, 3541], "errorMessage": "ERR:errIbal" }, { "pc": [3911], "errorMessage": "ERR:errIlks" }, { "pc": [1071], "errorMessage": "ERR:errInit" }, { "pc": [1142, 1153, 1354, 1371, 1437, 1451, 1493, 1507, 3395, 3408, 3967, 3987], "errorMessage": "ERR:errIpay" }, { "pc": [1595, 1993, 2127, 2205, 2298], "errorMessage": "ERR:errIpma" }, { "pc": [1583, 1977, 2110, 2189, 2287], "errorMessage": "ERR:errIpmr" }, { "pc": [1773], "errorMessage": "ERR:errIpms" }, { "pc": [6907], "errorMessage": "ERR:errIstp" }, { "pc": [6392], "errorMessage": "ERR:errIupg" }, { "pc": [3950], "errorMessage": "ERR:errLkdc" }, { "pc": [2560, 4716], "errorMessage": "ERR:errLock" }, { "pc": [4034], "errorMessage": "ERR:errNacr" }, { "pc": [880, 1810], "errorMessage": "ERR:errNcls" }, { "pc": [1797], "errorMessage": "ERR:errNclw" }, { "pc": [1048], "errorMessage": "ERR:errNcre" }, { "pc": [3873, 4067, 6356, 6429], "errorMessage": "ERR:errNdao" }, { "pc": [2868], "errorMessage": "ERR:errNhbm" }, { "pc": [2524, 4699, 4830], "errorMessage": "ERR:errNlck" }, { "pc": [2089, 2165, 2399, 3366], "errorMessage": "ERR:errNopt" }, { "pc": [894, 1823], "errorMessage": "ERR:errNrky" }, { "pc": [3158, 3456, 4104, 4172, 4289, 4407, 4929], "errorMessage": "ERR:errSnex" }, { "pc": [5898], "errorMessage": "ERR:errSnfd" }, { "pc": [2482], "errorMessage": "ERR:errWhol" }, { "pc": [1471, 1656, 4946, 4953, 6687], "errorMessage": "account funded" }, { "pc": [3865, 4059, 6348, 6421], "errorMessage": "application exists" }, { "pc": [4015], "errorMessage": "asset exists" }, { "pc": [2849, 3800, 3858, 4052, 6341, 6361, 6414], "errorMessage": "check GlobalState exists" }, { "pc": [3046, 3062, 5547, 6012, 6176, 6250, 7235], "errorMessage": "index access is out of bounds" }, { "pc": [2814, 3098, 6470, 6490, 6522, 6542, 6572, 6594], "errorMessage": "index out of bounds" }, { "pc": [994, 5649, 5811, 5958, 6143, 6217, 6323], "errorMessage": "invalid array length header" }, { "pc": [3316, 5033, 5459, 5497, 5989], "errorMessage": "invalid number of bytes for arc4.bool" }, { "pc": [1002, 6331], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [5971], "errorMessage": "invalid number of bytes for arc4.dynamic_array<smart_contracts/staking/types.ts::AssetCheck>" }, { "pc": [5661, 5823, 6155, 6229], "errorMessage": "invalid number of bytes for arc4.dynamic_array<uint64>" }, { "pc": [2728, 2833, 3125, 3289, 3617, 4045, 4256, 4365, 4512, 4570, 4653, 4739, 4767, 4850, 4879, 5016, 5058, 5214, 5338, 5391, 5442, 5480, 5632, 5794, 5951], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [1013, 1096, 1215, 1226, 1728, 1739, 2441, 2736, 2841, 3133, 3297, 3307, 3607, 3625, 3785, 3794, 4081, 4146, 4243, 4264, 4373, 4448, 4520, 4578, 4661, 4858, 4887, 5007, 5024, 5222, 5346, 5399, 5450, 5488, 6406], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [1207, 1720, 2451, 4457, 5642, 5804, 5981], "errorMessage": "invalid number of bytes for arc4.uint8" }, { "pc": [4748, 4776, 5068], "errorMessage": "invalid number of bytes for smart_contracts/staking/types.ts::StakeInfo" }, { "pc": [1709], "errorMessage": "transaction type is axfer" }, { "pc": [1088, 1196, 1695, 3279, 3777], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDggMzIgMzIxMDAgMTAyMjAwIDM0OTAwIDI4NTAwIDMxNTM2MDAwCiAgICBieXRlY2Jsb2NrICJzIiAweDE1MWY3Yzc1IDB4MjggIkVSUjplcnJJcGF5IiAweDFlIDB4MTQgImFraXRhX2RhbyIgInQiIDB4MGEgImgiICJFUlI6ZXJySWFhbSIgMHgwMCAiRVJSOmVyckliYWwiICJFUlI6ZXJyU25leCIgImEiICJFUlI6ZXJySXBtciIgIkVSUjplcnJJcG1hIiAweDAwMDAgIkVSUjplcnJOb3B0IiAid2FsbGV0IiAiRVJSOmVyck5kYW8iIDB4MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCAiZSIgIkVSUjplcnJObGNrIiAiRVJSOmVyckhibmYiICJFUlI6ZXJyQWNycSIgIkVSUjplcnJOY2xzIiAiRVJSOmVyck5ya3kiICJ2ZXJzaW9uIiAweDc0MDAwMDAwMDAwMDAwMDAwMCAweDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCAiRVJSOmVyckJleHAiICJFUlI6ZXJySGJjdSIgIkVSUjplcnJCZXh1IiAiRVJSOmVyckxvY2siICJoZWFydGJlYXRfbWFuYWdlcl9hZGRyZXNzIiAweDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwIDB4MDAwMDAwMDAwMDAwMDAwMDAwIDB4MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo5NgogICAgLy8gZXhwb3J0IGNsYXNzIFN0YWtpbmcgZXh0ZW5kcyBjbGFzc2VzKEJhc2VTdGFraW5nLCBVcGdyYWRlYWJsZUFraXRhQmFzZUNvbnRyYWN0KSB7CiAgICBwdXNoYnl0ZXMgMHhlYTkxODBkZCAvLyBtZXRob2QgInVwZGF0ZShzdHJpbmcpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIG1haW5fdXBkYXRlX3JvdXRlQDQKCm1haW5fc3dpdGNoX2Nhc2VfbmV4dEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo5NgogICAgLy8gZXhwb3J0IGNsYXNzIFN0YWtpbmcgZXh0ZW5kcyBjbGFzc2VzKEJhc2VTdGFraW5nLCBVcGdyYWRlYWJsZUFraXRhQmFzZUNvbnRyYWN0KSB7CiAgICB0eG4gT25Db21wbGV0aW9uCiAgICAhCiAgICBhc3NlcnQKICAgIHR4biBBcHBsaWNhdGlvbklECiAgICBieiBtYWluX2NyZWF0ZV9Ob09wQDQ3CiAgICBwdXNoYnl0ZXNzIDB4ODNmMTQ3NDggMHgzOTRlYWViMiAweDgyNTZjZjE5IDB4MjA0NjdiOTMgMHg4MzA0ODBmMyAweGM0MjhhMTI3IDB4YzgxNzNjYTEgMHhhMTAwMzM5ZiAweDBkMDM3Yzg5IDB4NWJmZGU4MDIgMHg1ZDlkMTQyOCAweGU5MTAzYzRmIDB4MDk1YzljYTUgMHgxNTVhNDY3YSAweDZlYjc3MDc4IDB4NTlkNTRjZTEgMHgyMjM1YTY4MyAweDZjYjAwZTdkIDB4YTE0NzdiNzMgMHg5ZjRmNTY3NCAweDc1ZDEzOGZiIDB4ZDQwMTYyYWYgMHhlYTdkYTk1NSAweGJiNmMzNzI4IDB4NDg3MTZmMWEgMHhlZjE4YTQ5NiAweGZhZDdmODE3IDB4NGM4OGVhY2UgMHhlYWU2NWYxMiAweGRkNDRhODQzIDB4YzZmZDBjYTUgMHg4YWUyNjZiOSAweDI2MzUxNDhkIDB4M2UwMGI5OTQgMHg5ZGZmNDA2MCAweDRmYzMxNmNhIDB4OGFlNzg5OWYgMHgzM2U5MmM5NCAweDg1NGRlZGUwIC8vIG1ldGhvZCAiaW5pdCgpdm9pZCIsIG1ldGhvZCAib3B0SW4ocGF5LHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJzdGFrZShwYXksdWludDgsdWludDY0LHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJzdGFrZUFzYShwYXksYXhmZXIsdWludDgsdWludDY0LHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJ3aXRoZHJhdyh1aW50NjQsdWludDgpdm9pZCIsIG1ldGhvZCAiY2hlY2twb2ludEV4cGlyZWRMb2NrKGFkZHJlc3MsdWludDY0KWJvb2wiLCBtZXRob2QgImNyZWF0ZUhlYXJ0YmVhdChhZGRyZXNzLHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJjaGVja3BvaW50U29mdFN0YWtlKGFkZHJlc3MsdWludDY0KShib29sLHVpbnQ2NCkiLCBtZXRob2QgImNvbW1pdEFwcFNvZnRTdGFrZShwYXksYWRkcmVzcyx1aW50NjQsdWludDY0LGJvb2wpdm9pZCIsIG1ldGhvZCAiY2hlY2twb2ludEFwcFNvZnRTdGFrZSh1aW50NjQsYWRkcmVzcyx1aW50NjQpKGJvb2wsdWludDY0KSIsIG1ldGhvZCAidXBkYXRlU2V0dGluZ3MocGF5LHVpbnQ2NCx1aW50NjQpdm9pZCIsIG1ldGhvZCAic2V0SGVhcnRiZWF0TWFuYWdlcihhZGRyZXNzKXZvaWQiLCBtZXRob2QgImNsb3NlU29mdFN0YWtlKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJjbG9zZUhlYXJ0YmVhdCh1aW50NjQpdm9pZCIsIG1ldGhvZCAicmVsZWFzZUFwcFN0YWtlKHVpbnQ2NCxhZGRyZXNzLHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJyZWNsYWltQXBwU3Rha2UoYWRkcmVzcyx1aW50NjQpdm9pZCIsIG1ldGhvZCAib3B0SW5Db3N0KCl1aW50NjQiLCBtZXRob2QgInN0YWtlQ29zdCh1aW50NjQsdWludDgpdWludDY0IiwgbWV0aG9kICJhcHBTdGFrZUNvc3QoYWRkcmVzcyx1aW50NjQpdWludDY0IiwgbWV0aG9kICJnZXRUaW1lTGVmdChhZGRyZXNzLHVpbnQ2NCl1aW50NjQiLCBtZXRob2QgIm11c3RHZXRUaW1lTGVmdChhZGRyZXNzLHVpbnQ2NCl1aW50NjQiLCBtZXRob2QgImdldEluZm8oYWRkcmVzcywodWludDY0LHVpbnQ4KSkodWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0KSIsIG1ldGhvZCAibXVzdEdldEluZm8oYWRkcmVzcywodWludDY0LHVpbnQ4KSkodWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0KSIsIG1ldGhvZCAiZ2V0V2VpZ2h0ZWRTdGFrZShhZGRyZXNzLHVpbnQ2NCkodWludDY0LHVpbnQ2NCkiLCBtZXRob2QgInNvZnRDaGVjayhhZGRyZXNzLHVpbnQ2NCkoYm9vbCx1aW50NjQpIiwgbWV0aG9kICJnZXRBcHBXZWlnaHRlZFN0YWtlKHVpbnQ2NCxhZGRyZXNzLHVpbnQ2NCxib29sKSh1aW50NjQsdWludDY0KSIsIG1ldGhvZCAiZ2V0SW5mb0F0TGVhc3QoYWRkcmVzcywodWludDY0LHVpbnQ4KSkodWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0KVtdIiwgbWV0aG9kICJnZXRFc2Nyb3dJbmZvKGFkZHJlc3MsdWludDY0KSh1aW50NjQsdWludDY0KSIsIG1ldGhvZCAiZ2V0SGVhcnRiZWF0KGFkZHJlc3MsdWludDY0KSh1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQpWzRdIiwgbWV0aG9kICJtdXN0R2V0SGVhcnRiZWF0KGFkZHJlc3MsdWludDY0KSh1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQpWzRdIiwgbWV0aG9kICJnZXRIZWFydGJlYXRBdmVyYWdlKGFkZHJlc3MsdWludDY0LGJvb2wpdWludDY0IiwgbWV0aG9kICJtdXN0R2V0SGVhcnRiZWF0QXZlcmFnZShhZGRyZXNzLHVpbnQ2NCxib29sKXVpbnQ2NCIsIG1ldGhvZCAiZ2V0SW5mb0xpc3QoYWRkcmVzcyx1aW50OCx1aW50NjRbXSkodWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0KVtdIiwgbWV0aG9kICJtdXN0R2V0SW5mb0xpc3QoYWRkcmVzcyx1aW50OCx1aW50NjRbXSkodWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0KVtdIiwgbWV0aG9kICJzdGFrZUNoZWNrKGFkZHJlc3MsKHVpbnQ2NCx1aW50NjQpW10sdWludDgsYm9vbClib29sIiwgbWV0aG9kICJnZXRUb3RhbHModWludDY0W10pKHVpbnQ2NCx1aW50NjQsdWludDY0KVtdIiwgbWV0aG9kICJnZXRTZXR0aW5ncyh1aW50NjRbXSkodWludDY0LGJvb2wpW10iLCBtZXRob2QgInVwZGF0ZUFraXRhREFPKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJvcFVwKCl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggaW5pdCBvcHRJbiBzdGFrZSBzdGFrZUFzYSB3aXRoZHJhdyBjaGVja3BvaW50RXhwaXJlZExvY2sgY3JlYXRlSGVhcnRiZWF0IGNoZWNrcG9pbnRTb2Z0U3Rha2UgY29tbWl0QXBwU29mdFN0YWtlIGNoZWNrcG9pbnRBcHBTb2Z0U3Rha2UgdXBkYXRlU2V0dGluZ3Mgc2V0SGVhcnRiZWF0TWFuYWdlciBjbG9zZVNvZnRTdGFrZSBjbG9zZUhlYXJ0YmVhdCByZWxlYXNlQXBwU3Rha2UgcmVjbGFpbUFwcFN0YWtlIG9wdEluQ29zdCBzdGFrZUNvc3QgYXBwU3Rha2VDb3N0IGdldFRpbWVMZWZ0IG11c3RHZXRUaW1lTGVmdCBnZXRJbmZvIG11c3RHZXRJbmZvIGdldFdlaWdodGVkU3Rha2Ugc29mdENoZWNrIGdldEFwcFdlaWdodGVkU3Rha2UgZ2V0SW5mb0F0TGVhc3QgZ2V0RXNjcm93SW5mbyBnZXRIZWFydGJlYXQgbXVzdEdldEhlYXJ0YmVhdCBnZXRIZWFydGJlYXRBdmVyYWdlIG11c3RHZXRIZWFydGJlYXRBdmVyYWdlIGdldEluZm9MaXN0IG11c3RHZXRJbmZvTGlzdCBzdGFrZUNoZWNrIGdldFRvdGFscyBnZXRTZXR0aW5ncyB1cGRhdGVBa2l0YURBTyBtYWluX29wVXBfcm91dGVANDUKICAgIGVycgoKbWFpbl9vcFVwX3JvdXRlQDQ1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjMwCiAgICAvLyBvcFVwKCk6IHZvaWQgeyB9CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgptYWluX2NyZWF0ZV9Ob09wQDQ3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo5NgogICAgLy8gZXhwb3J0IGNsYXNzIFN0YWtpbmcgZXh0ZW5kcyBjbGFzc2VzKEJhc2VTdGFraW5nLCBVcGdyYWRlYWJsZUFraXRhQmFzZUNvbnRyYWN0KSB7CiAgICBwdXNoYnl0ZXMgMHhjZDlhZDY3ZSAvLyBtZXRob2QgImNyZWF0ZShzdHJpbmcsdWludDY0KXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBjcmVhdGUKICAgIGVycgoKbWFpbl91cGRhdGVfcm91dGVANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozNQogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICB0eG4gT25Db21wbGV0aW9uCiAgICBwdXNoaW50IDQgLy8gVXBkYXRlQXBwbGljYXRpb24KICAgID09CiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgJiYKICAgIGFzc2VydAogICAgYiB1cGRhdGUKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjphc3NlcnRQbGFpblBheW1lbnQodHhuOiB1aW50NjQpIC0+IHZvaWQ6CmFzc2VydFBsYWluUGF5bWVudDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjcKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiBhc3NlcnRQbGFpblBheW1lbnQodHhuOiBndHhuLlBheW1lbnRUeG4pOiB2b2lkIHsKICAgIHByb3RvIDEgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2OAogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5jbG9zZVJlbWFpbmRlclRvID09PSBHbG9iYWwuemVyb0FkZHJlc3MsIGVyckNsb3NlRm9yYmlkZGVuKQogICAgZnJhbWVfZGlnIC0xCiAgICBndHhucyBDbG9zZVJlbWFpbmRlclRvCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgID09CiAgICBibnogYXNzZXJ0UGxhaW5QYXltZW50X2FmdGVyX2Fzc2VydEAyCiAgICBieXRlYyAyNiAvLyAiRVJSOmVyck5jbHMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmNscwoKYXNzZXJ0UGxhaW5QYXltZW50X2FmdGVyX2Fzc2VydEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2OQogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5yZWtleVRvID09PSBHbG9iYWwuemVyb0FkZHJlc3MsIGVyclJla2V5Rm9yYmlkZGVuKQogICAgZnJhbWVfZGlnIC0xCiAgICBndHhucyBSZWtleVRvCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgID09CiAgICBibnogYXNzZXJ0UGxhaW5QYXltZW50X2FmdGVyX2Fzc2VydEA0CiAgICBieXRlYyAyNyAvLyAiRVJSOmVyck5ya3kiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTnJreQoKYXNzZXJ0UGxhaW5QYXltZW50X2FmdGVyX2Fzc2VydEA0OgogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6cmVjb3JkUGF5ZXIocmVjb3JkOiBieXRlcywgcGF5ZXI6IGJ5dGVzLCBvd25lcjogYnl0ZXMpIC0+IHZvaWQ6CnJlY29yZFBheWVyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDUKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiByZWNvcmRQYXllcihyZWNvcmQ6IGJ5dGVzLCBwYXllcjogQWNjb3VudCwgb3duZXI6IEFjY291bnQpOiB2b2lkIHsKICAgIHByb3RvIDMgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDYKICAgIC8vIGlmIChwYXllciAhPT0gb3duZXIpIHsKICAgIGZyYW1lX2RpZyAtMgogICAgZnJhbWVfZGlnIC0xCiAgICAhPQogICAgYnogcmVjb3JkUGF5ZXJfYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk2CiAgICAvLyByZXR1cm4gQnl0ZXMoUGF5ZXJCb3hQcmVmaXgpLmNvbmNhdChzaGEyNTYocmVjb3JkKSkKICAgIGZyYW1lX2RpZyAtMwogICAgc2hhMjU2CiAgICBwdXNoYnl0ZXMgIiQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA3CiAgICAvLyBvcC5Cb3gucHV0KHBheWVyUmVjb3JkS2V5KHJlY29yZCksIHBheWVyLmJ5dGVzKQogICAgZnJhbWVfZGlnIC0yCiAgICBib3hfcHV0CgpyZWNvcmRQYXllcl9hZnRlcl9pZl9lbHNlQDI6CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpyZWxlYXNlRGVwb3NpdChyZWNvcmQ6IGJ5dGVzLCBvd25lcjogYnl0ZXMsIGFtb3VudDogdWludDY0KSAtPiBieXRlczoKcmVsZWFzZURlcG9zaXQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE0MAogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIHJlbGVhc2VEZXBvc2l0KHJlY29yZDogYnl0ZXMsIG93bmVyOiBBY2NvdW50LCBhbW91bnQ6IHVpbnQ2NCk6IFtBY2NvdW50LCB1aW50NjRdIHsKICAgIHByb3RvIDMgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5NgogICAgLy8gcmV0dXJuIEJ5dGVzKFBheWVyQm94UHJlZml4KS5jb25jYXQoc2hhMjU2KHJlY29yZCkpCiAgICBmcmFtZV9kaWcgLTMKICAgIHNoYTI1NgogICAgcHVzaGJ5dGVzICIkIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTQyCiAgICAvLyBjb25zdCBbcGF5ZXIsIHNwb25zb3JlZF0gPSBvcC5Cb3guZ2V0KGtleSkKICAgIGJveF9nZXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTQzCiAgICAvLyBpZiAoIXNwb25zb3JlZCkgewogICAgYm56IHJlbGVhc2VEZXBvc2l0X2FmdGVyX2lmX2Vsc2VAMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNDQKICAgIC8vIHJldHVybiBbb3duZXIsIGFtb3VudF0KICAgIGZyYW1lX2RpZyAtMQogICAgaXRvYgogICAgZnJhbWVfZGlnIC0yCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpyZWxlYXNlRGVwb3NpdF9hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE0NgogICAgLy8gb3AuQm94LmRlbGV0ZShrZXkpCiAgICBzd2FwCiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTQ3CiAgICAvLyBjb25zdCB0b3RhbDogdWludDY0ID0gYW1vdW50ICsgUGF5ZXJSZWNvcmRNQlIKICAgIGZyYW1lX2RpZyAtMQogICAgaW50YyA3IC8vIDI4NTAwCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEzMAogICAgLy8gY29uc3QgWywgZnVuZGVkXSA9IG9wLkFjY3RQYXJhbXMuYWNjdEJhbGFuY2UocmVjZWl2ZXIpCiAgICBkaWcgMQogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RCYWxhbmNlCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTMxCiAgICAvLyByZXR1cm4gZnVuZGVkIHx8IGFtb3VudCA+PSBHbG9iYWwubWluQmFsYW5jZQogICAgYm56IHJlbGVhc2VEZXBvc2l0X2Jvb2xfdHJ1ZUA4CiAgICBkdXAKICAgIGdsb2JhbCBNaW5CYWxhbmNlCiAgICA+PQogICAgYnogcmVsZWFzZURlcG9zaXRfYm9vbF9mYWxzZUA5CgpyZWxlYXNlRGVwb3NpdF9ib29sX3RydWVAODoKICAgIGludGNfMSAvLyAxCgpyZWxlYXNlRGVwb3NpdF9ib29sX21lcmdlQDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNDgKICAgIC8vIHJldHVybiBbY2FuUmVjZWl2ZUFsZ28oQWNjb3VudChwYXllciksIHRvdGFsKSA/IEFjY291bnQocGF5ZXIpIDogb3duZXIsIHRvdGFsXQogICAgYnogcmVsZWFzZURlcG9zaXRfdGVybmFyeV9mYWxzZUA0CiAgICBzd2FwCgpyZWxlYXNlRGVwb3NpdF90ZXJuYXJ5X21lcmdlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE0OAogICAgLy8gcmV0dXJuIFtjYW5SZWNlaXZlQWxnbyhBY2NvdW50KHBheWVyKSwgdG90YWwpID8gQWNjb3VudChwYXllcikgOiBvd25lciwgdG90YWxdCiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHJldHN1YgoKcmVsZWFzZURlcG9zaXRfdGVybmFyeV9mYWxzZUA0OgogICAgYnVyeSAxCiAgICBmcmFtZV9kaWcgLTIKICAgIGIgcmVsZWFzZURlcG9zaXRfdGVybmFyeV9tZXJnZUA1CgpyZWxlYXNlRGVwb3NpdF9ib29sX2ZhbHNlQDk6CiAgICBpbnRjXzAgLy8gMAogICAgYiByZWxlYXNlRGVwb3NpdF9ib29sX21lcmdlQDEwCgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5jcmVhdGVbcm91dGluZ10oKSAtPiB2b2lkOgpjcmVhdGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEyMgogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE0CiAgICAvLyB2ZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogR2xvYmFsU3RhdGVLZXlWZXJzaW9uIH0pCiAgICBieXRlYyAyOCAvLyAidmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTI0CiAgICAvLyB0aGlzLnZlcnNpb24udmFsdWUgPSB2ZXJzaW9uCiAgICB1bmNvdmVyIDIKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlYyA2IC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEyNQogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSA9IGFraXRhREFPCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMjIKICAgIC8vIEBhYmltZXRob2QoeyBvbkNyZWF0ZTogJ3JlcXVpcmUnIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5pbml0W3JvdXRpbmddKCkgLT4gdm9pZDoKaW5pdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTI5CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gR2xvYmFsLmNyZWF0b3JBZGRyZXNzLCBlcnJOb3RDcmVhdG9yKQogICAgdHhuIFNlbmRlcgogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICA9PQogICAgYm56IGluaXRfYWZ0ZXJfYXNzZXJ0QDMKICAgIHB1c2hieXRlcyAiRVJSOmVyck5jcmUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmNyZQoKaW5pdF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTE2CiAgICAvLyB0b3RhbHMgPSBCb3hNYXA8dWludDY0LCBUb3RhbHNJbmZvPih7IGtleVByZWZpeDogU3Rha2luZ0JveFByZWZpeFRvdGFscyB9KQogICAgYnl0ZWMgMjkgLy8gMHg3NDAwMDAwMDAwMDAwMDAwMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTMwCiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMudG90YWxzKDApLmV4aXN0cywgZXJyQWxyZWFkeUluaXRpYWxpemVkKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBpbml0X2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJJbml0IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckluaXQKCmluaXRfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExNgogICAgLy8gdG90YWxzID0gQm94TWFwPHVpbnQ2NCwgVG90YWxzSW5mbz4oeyBrZXlQcmVmaXg6IFN0YWtpbmdCb3hQcmVmaXhUb3RhbHMgfSkKICAgIGJ5dGVjIDI5IC8vIDB4NzQwMDAwMDAwMDAwMDAwMDAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEzMQogICAgLy8gdGhpcy50b3RhbHMoMCkudmFsdWUgPSB7IGxvY2tlZDogMCwgZXNjcm93ZWQ6IDAsIGxpdmVMb2NrZWRTdGFrZTogMCB9CiAgICBieXRlYyAzMCAvLyAweDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMjgKICAgIC8vIGluaXQoKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5vcHRJbltyb3V0aW5nXSgpIC0+IHZvaWQ6Cm9wdEluOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoyNzMKICAgIC8vIG9wdEluKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYXNzZXQ6IHVpbnQ2NCk6IHZvaWQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6Mjc0CiAgICAvLyBsb2dnZWRBc3NlcnQoIUdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLmlzT3B0ZWRJbihBc3NldChhc3NldCkpLCBlcnJBbHJlYWR5T3B0ZWRJbikKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBzd2FwCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYnogb3B0SW5fYWZ0ZXJfYXNzZXJ0QDMKICAgIHB1c2hieXRlcyAiRVJSOmVyckFvcHQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQW9wdAoKb3B0SW5fYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjI3OAogICAgLy8gdG90YWxzTUJSICsKICAgIHB1c2hpbnQgMTU3MDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6Mjc5CiAgICAvLyBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoyNzgtMjc5CiAgICAvLyB0b3RhbHNNQlIgKwogICAgLy8gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjI4MgogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBlcnJJbnZhbGlkUGF5bWVudCkKICAgIGRpZyAyCiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogb3B0SW5fYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjXzMgLy8gIkVSUjplcnJJcGF5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwYXkKCm9wdEluX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoyODMKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LmFtb3VudCA9PT0gbWJyLCBlcnJJbnZhbGlkUGF5bWVudCkKICAgIHVuY292ZXIgMgogICAgZ3R4bnMgQW1vdW50CiAgICA9PQogICAgYm56IG9wdEluX2FmdGVyX2Fzc2VydEA3CiAgICBieXRlY18zIC8vICJFUlI6ZXJySXBheSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcGF5CgpvcHRJbl9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6Mjg1LTI4OQogICAgLy8gaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyB9KS5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoyODYKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGRpZyAxCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoyODcKICAgIC8vIGFzc2V0QW1vdW50OiAwLAogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoyODUtMjg5CiAgICAvLyBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgYXNzZXRBbW91bnQ6IDAsCiAgICAvLyAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vIH0pLnN1Ym1pdCgpCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MjkxCiAgICAvLyB0aGlzLnRvdGFscyhhc3NldCkudmFsdWUgPSB7CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExNgogICAgLy8gdG90YWxzID0gQm94TWFwPHVpbnQ2NCwgVG90YWxzSW5mbz4oeyBrZXlQcmVmaXg6IFN0YWtpbmdCb3hQcmVmaXhUb3RhbHMgfSkKICAgIGJ5dGVjIDcgLy8gInQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MjkxLTI5NQogICAgLy8gdGhpcy50b3RhbHMoYXNzZXQpLnZhbHVlID0gewogICAgLy8gICBsb2NrZWQ6IDAsCiAgICAvLyAgIGVzY3Jvd2VkOiAwLAogICAgLy8gICBsaXZlTG9ja2VkU3Rha2U6IDAsCiAgICAvLyB9CiAgICBieXRlYyAzMCAvLyAweDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoyNzMKICAgIC8vIG9wdEluKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYXNzZXQ6IHVpbnQ2NCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuc3Rha2Vbcm91dGluZ10oKSAtPiB2b2lkOgpzdGFrZToKICAgIHB1c2hieXRlcyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoyOTgKICAgIC8vIHN0YWtlKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgdHlwZTogU3Rha2luZ1R5cGUsIGFtb3VudDogdWludDY0LCBleHBpcmF0aW9uOiB1aW50NjQpOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwbiAyCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBjb3ZlciAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18xIC8vIDEKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDgKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDQKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgY292ZXIgNQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoyOTkKICAgIC8vIHRoaXMuYXNzZXJ0VmFsaWRTdGFrZVR5cGUodHlwZSkKICAgIGRpZyAxCiAgICBjYWxsc3ViIGFzc2VydFZhbGlkU3Rha2VUeXBlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjMwMwogICAgLy8gYXNzZXJ0UGxhaW5QYXltZW50KHBheW1lbnQpCiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgYXNzZXJ0UGxhaW5QYXltZW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjMwNAogICAgLy8gY29uc3QgaW5UaGVGdXR1cmUgPSBleHBpcmF0aW9uID4gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcAogICAgZHVwCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICA+CiAgICBjb3ZlciA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjMwNQogICAgLy8gY29uc3QgbGVzc1RoYW5PbmVZZWFySW5UaGVGdXR1cmUgPSBleHBpcmF0aW9uIDw9IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgKyBPTkVfWUVBUgogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgaW50YyA4IC8vIDMxNTM2MDAwCiAgICArCiAgICA8PQogICAgY292ZXIgNQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czozMDYKICAgIC8vIGNvbnN0IGxvY2tlZCA9IHR5cGUgPT09IFNUQUtJTkdfVFlQRV9MT0NLCiAgICBkdXAKICAgIGJ5dGVjXzIgLy8gMHgyOAogICAgPT0KICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MzA3CiAgICAvLyBjb25zdCBpc0VzY3JvdyA9IHR5cGUgPT09IFNUQUtJTkdfVFlQRV9IQVJEIHx8IHR5cGUgPT09IFNUQUtJTkdfVFlQRV9MT0NLCiAgICBieXRlYyA0IC8vIDB4MWUKICAgID09CiAgICBibnogc3Rha2VfYm9vbF90cnVlQDMKICAgIGRpZyAxCiAgICBieiBzdGFrZV9ib29sX2ZhbHNlQDQKCnN0YWtlX2Jvb2xfdHJ1ZUAzOgogICAgaW50Y18xIC8vIDEKCnN0YWtlX2Jvb2xfbWVyZ2VANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MzA4CiAgICAvLyBjb25zdCB0aW1lc3RhbXAgPSBHbG9iYWwubGF0ZXN0VGltZXN0YW1wCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBjb3ZlciA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjMxMAogICAgLy8gbG9nZ2VkQXNzZXJ0KChpblRoZUZ1dHVyZSAmJiBsZXNzVGhhbk9uZVllYXJJblRoZUZ1dHVyZSkgfHwgIWxvY2tlZCwgZXJyQmFkRXhwaXJhdGlvbikKICAgIHVuY292ZXIgNQogICAgYnogc3Rha2Vfb3JfY29udGRANwogICAgZGlnIDYKICAgIGJueiBzdGFrZV9ib29sX3RydWVAOAoKc3Rha2Vfb3JfY29udGRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MzEwCiAgICAvLyBsb2dnZWRBc3NlcnQoKGluVGhlRnV0dXJlICYmIGxlc3NUaGFuT25lWWVhckluVGhlRnV0dXJlKSB8fCAhbG9ja2VkLCBlcnJCYWRFeHBpcmF0aW9uKQogICAgZGlnIDIKICAgIGJueiBzdGFrZV9ib29sX2ZhbHNlQDkKCnN0YWtlX2Jvb2xfdHJ1ZUA4OgogICAgaW50Y18xIC8vIDEKCnN0YWtlX2Jvb2xfbWVyZ2VAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjMxMAogICAgLy8gbG9nZ2VkQXNzZXJ0KChpblRoZUZ1dHVyZSAmJiBsZXNzVGhhbk9uZVllYXJJblRoZUZ1dHVyZSkgfHwgIWxvY2tlZCwgZXJyQmFkRXhwaXJhdGlvbikKICAgIGJueiBzdGFrZV9hZnRlcl9hc3NlcnRAMTIKICAgIGJ5dGVjIDMxIC8vICJFUlI6ZXJyQmV4cCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJCZXhwCgpzdGFrZV9hZnRlcl9hc3NlcnRAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjMxMwogICAgLy8gYWRkcmVzczogVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MzE0CiAgICAvLyBhc3NldDogMCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjMxMi0zMTYKICAgIC8vIGNvbnN0IHNrOiBTdGFrZUtleSA9IHsKICAgIC8vICAgYWRkcmVzczogVHhuLnNlbmRlciwKICAgIC8vICAgYXNzZXQ6IDAsCiAgICAvLyAgIHR5cGUsCiAgICAvLyB9CiAgICBpdG9iCiAgICBkdXAKICAgIGNvdmVyIDcKICAgIGNvbmNhdAogICAgZGlnIDQKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDUKICAgIC8vIHN0YWtlcyA9IEJveE1hcDxTdGFrZUtleSwgU3Rha2U+KHsga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4U3Rha2VzIH0pCiAgICBieXRlY18wIC8vICJzIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGNvdmVyIDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MzE4CiAgICAvLyBjb25zdCBpc1VwZGF0ZSA9IHRoaXMuc3Rha2VzKHNrKS5leGlzdHMKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czozMjAKICAgIC8vIGlmICghaXNVcGRhdGUpIHsKICAgIGJueiBzdGFrZV9lbHNlX2JvZHlAMzYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MzIzCiAgICAvLyBjb25zdCBzcG9uc29yID0gc3BvbnNvckNvc3QocGF5bWVudC5zZW5kZXIsIFR4bi5zZW5kZXIpCiAgICBkaWcgMQogICAgZ3R4bnMgU2VuZGVyCiAgICBkdXAKICAgIGNvdmVyIDkKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTAxCiAgICAvLyByZXR1cm4gcGF5ZXIgPT09IG93bmVyID8gMCA6IFBheWVyUmVjb3JkTUJSCiAgICA9PQogICAgaW50YyA3IC8vIDI4NTAwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIGNvdmVyIDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MzI1CiAgICAvLyBpZiAoaXNFc2Nyb3cpIHsKICAgIGJ6IHN0YWtlX2Vsc2VfYm9keUAyMQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czozMjcKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJySW52YWxpZFBheW1lbnQpCiAgICBkdXAKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBzdGFrZV9hZnRlcl9hc3NlcnRAMTYKICAgIGJ5dGVjXzMgLy8gIkVSUjplcnJJcGF5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwYXkKCnN0YWtlX2FmdGVyX2Fzc2VydEAxNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MzI4CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IGFtb3VudCArIGNvc3RzLnN0YWtlcyArIHNwb25zb3IsIGVyckludmFsaWRQYXltZW50KQogICAgZ3R4bnMgQW1vdW50CiAgICBkaWcgMTAKICAgIGludGMgNCAvLyAzMjEwMAogICAgKwogICAgdW5jb3ZlciA0CiAgICArCiAgICA9PQogICAgYm56IHN0YWtlX2FmdGVyX2Fzc2VydEAxOAogICAgYnl0ZWNfMyAvLyAiRVJSOmVycklwYXkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBheQoKc3Rha2VfYWZ0ZXJfYXNzZXJ0QDE4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czozMzAKICAgIC8vIHRoaXMudXBkYXRlVG90YWxzKDAsIHR5cGUsIGFtb3VudCwgdHJ1ZSkKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDIKICAgIGRpZyA5CiAgICBpbnRjXzEgLy8gMQogICAgY2FsbHN1YiB1cGRhdGVUb3RhbHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MzMxCiAgICAvLyBpZiAobG9ja2VkKSB7CiAgICBieiBzdGFrZV9hZnRlcl9pZl9lbHNlQDM1CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjMzMgogICAgLy8gdGhpcy51cGRhdGVMaXZlTG9ja2VkU3Rha2UoMCwgYW1vdW50LCB0cnVlKQogICAgaW50Y18wIC8vIDAKICAgIGRpZyA3CiAgICBpbnRjXzEgLy8gMQogICAgY2FsbHN1YiB1cGRhdGVMaXZlTG9ja2VkU3Rha2UKCnN0YWtlX2FmdGVyX2lmX2Vsc2VAMzU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjM1NS0zNjAKICAgIC8vIHRoaXMuc3Rha2VzKHNrKS52YWx1ZSA9IHsKICAgIC8vICAgYW1vdW50LAogICAgLy8gICBsYXN0VXBkYXRlOiB0aW1lc3RhbXAsCiAgICAvLyAgIGV4cGlyYXRpb24sCiAgICAvLyAgIHdlaWdodGVkQWdlOiAwLAogICAgLy8gfQogICAgZGlnIDYKICAgIGl0b2IKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgdW5jb3ZlciAzCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIHN3YXAKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MzYxCiAgICAvLyByZWNvcmRQYXllcih0aGlzLnN0YWtlcyhzaykua2V5LCBwYXltZW50LnNlbmRlciwgVHhuLnNlbmRlcikKICAgIHR4biBTZW5kZXIKICAgIHN3YXAKICAgIGNvdmVyIDIKICAgIGNhbGxzdWIgcmVjb3JkUGF5ZXIKCnN0YWtlX2FmdGVyX2lmX2Vsc2VANTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjI5OAogICAgLy8gc3Rha2UocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCB0eXBlOiBTdGFraW5nVHlwZSwgYW1vdW50OiB1aW50NjQsIGV4cGlyYXRpb246IHVpbnQ2NCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKc3Rha2VfZWxzZV9ib2R5QDIxOgogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjMzNQogICAgLy8gfSBlbHNlIGlmICh0eXBlID09PSBTVEFLSU5HX1RZUEVfSEVBUlRCRUFUKSB7CiAgICBzd2FwCiAgICBieXRlYyA4IC8vIDB4MGEKICAgID09CiAgICBieiBzdGFrZV9lbHNlX2JvZHlAMjcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MzM5CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRQYXltZW50KQogICAgZHVwCiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogc3Rha2VfYWZ0ZXJfYXNzZXJ0QDI0CiAgICBieXRlY18zIC8vICJFUlI6ZXJySXBheSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcGF5CgpzdGFrZV9hZnRlcl9hc3NlcnRAMjQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjM0MAogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSBjb3N0cy5zdGFrZXMgKyBjb3N0cy5oZWFydGJlYXRzICsgc3BvbnNvciwgZXJySW52YWxpZFBheW1lbnQpCiAgICBndHhucyBBbW91bnQKICAgIGludGMgNSAvLyAxMDIyMDAKICAgIHVuY292ZXIgMgogICAgKwogICAgPT0KICAgIGJueiBzdGFrZV9hZnRlcl9hc3NlcnRAMjYKICAgIGJ5dGVjXzMgLy8gIkVSUjplcnJJcGF5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwYXkKCnN0YWtlX2FmdGVyX2Fzc2VydEAyNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MzQzCiAgICAvLyBhZGRyZXNzOiBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czozNDItMzQ1CiAgICAvLyBjb25zdCBoZWFydGJlYXRLZXk6IEhlYXJ0YmVhdEtleSA9IHsKICAgIC8vICAgYWRkcmVzczogVHhuLnNlbmRlciwKICAgIC8vICAgYXNzZXQ6IDAsCiAgICAvLyB9CiAgICBkaWcgMgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExMi0xMTQKICAgIC8vIGhlYXJ0YmVhdHMgPSBCb3hNYXA8SGVhcnRiZWF0S2V5LCBhcmM0LlN0YXRpY0FycmF5PGFyYzRIZWFydGJlYXQsIDQ+Pih7CiAgICAvLyAgIGtleVByZWZpeDogU3Rha2luZ0JveFByZWZpeEhlYXJ0YmVhdHMsCiAgICAvLyB9KQogICAgYnl0ZWMgOSAvLyAiaCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoyNTgtMjYzCiAgICAvLyByZXR1cm4gbmV3IGFyYzQuU3RhdGljQXJyYXk8YXJjNEhlYXJ0YmVhdCwgND4oCiAgICAvLyAgIGVtcHR5SGVhcnRiZWF0KCksCiAgICAvLyAgIGVtcHR5SGVhcnRiZWF0KCksCiAgICAvLyAgIGVtcHR5SGVhcnRiZWF0KCksCiAgICAvLyAgIGVtcHR5SGVhcnRiZWF0KCkKICAgIC8vICkKICAgIGJ5dGVjIDIxIC8vIDB4MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czozNDcKICAgIC8vIHRoaXMuaGVhcnRiZWF0cyhoZWFydGJlYXRLZXkpLnZhbHVlID0gdGhpcy5lbXB0eUhlYXJ0YmVhdHMoKQogICAgYm94X3B1dAogICAgYiBzdGFrZV9hZnRlcl9pZl9lbHNlQDM1CgpzdGFrZV9lbHNlX2JvZHlAMjc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjM1MAogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIuYmFsYW5jZSA+PSBhbW91bnQsIGVyckluc3VmZmljaWVudEJhbGFuY2UpCiAgICB0eG4gU2VuZGVyCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdEJhbGFuY2UKICAgIGFzc2VydCAvLyBhY2NvdW50IGZ1bmRlZAogICAgZGlnIDkKICAgID49CiAgICBibnogc3Rha2VfYWZ0ZXJfYXNzZXJ0QDI5CiAgICBieXRlYyAxMiAvLyAiRVJSOmVyckliYWwiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySWJhbAoKc3Rha2VfYWZ0ZXJfYXNzZXJ0QDI5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czozNTEKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJySW52YWxpZFBheW1lbnQpCiAgICBkdXAKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBzdGFrZV9hZnRlcl9hc3NlcnRAMzEKICAgIGJ5dGVjXzMgLy8gIkVSUjplcnJJcGF5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwYXkKCnN0YWtlX2FmdGVyX2Fzc2VydEAzMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MzUyCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IGNvc3RzLnN0YWtlcyArIHNwb25zb3IsIGVyckludmFsaWRQYXltZW50KQogICAgZ3R4bnMgQW1vdW50CiAgICBpbnRjIDQgLy8gMzIxMDAKICAgIHVuY292ZXIgMgogICAgKwogICAgPT0KICAgIGJueiBzdGFrZV9hZnRlcl9pZl9lbHNlQDM1CiAgICBieXRlY18zIC8vICJFUlI6ZXJySXBheSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcGF5CgpzdGFrZV9lbHNlX2JvZHlAMzY6CiAgICB1bmNvdmVyIDUKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czozNjQKICAgIC8vIGxvZ2dlZEFzc2VydCh0eXBlICE9PSBTVEFLSU5HX1RZUEVfSEVBUlRCRUFULCBlcnJIZWFydGJlYXRDYW5ub3RVcGRhdGUpCiAgICBkaWcgMwogICAgYnl0ZWMgOCAvLyAweDBhCiAgICAhPQogICAgYm56IHN0YWtlX2FmdGVyX2Fzc2VydEAzOAogICAgYnl0ZWMgMzIgLy8gIkVSUjplcnJIYmN1IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckhiY3UKCnN0YWtlX2FmdGVyX2Fzc2VydEAzODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MzY1CiAgICAvLyBjb25zdCBjdXJyZW50U3Rha2UgPSBjbG9uZSh0aGlzLnN0YWtlcyhzaykudmFsdWUpCiAgICBkaWcgNQogICAgYm94X2dldAogICAgc3dhcAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBjb3ZlciA2CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czozNjYKICAgIC8vIGNvbnN0IHsgZXhwaXJhdGlvbjogY3VycmVudFN0YWtlRXhwaXJhdGlvbiwgYW1vdW50OiBjdXJyZW50U3Rha2VBbW91bnQgfSA9IGN1cnJlbnRTdGFrZQogICAgZHVwCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBidXJ5IDEzCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MzY3CiAgICAvLyBjb25zdCBuZXdBbW91bnQ6IHVpbnQ2NCA9IGN1cnJlbnRTdGFrZUFtb3VudCArIGFtb3VudAogICAgZGlnIDExCiAgICArCiAgICBjb3ZlciA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjM2OAogICAgLy8gbG9nZ2VkQXNzZXJ0KGV4cGlyYXRpb24gPj0gY3VycmVudFN0YWtlRXhwaXJhdGlvbiB8fCAhbG9ja2VkLCBlcnJCYWRFeHBpcmF0aW9uVXBkYXRlKQogICAgZGlnIDkKICAgIDw9CiAgICBibnogc3Rha2VfYm9vbF90cnVlQDQwCiAgICBkaWcgMgogICAgYm56IHN0YWtlX2Jvb2xfZmFsc2VANDEKCnN0YWtlX2Jvb2xfdHJ1ZUA0MDoKICAgIGludGNfMSAvLyAxCgpzdGFrZV9ib29sX21lcmdlQDQyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czozNjgKICAgIC8vIGxvZ2dlZEFzc2VydChleHBpcmF0aW9uID49IGN1cnJlbnRTdGFrZUV4cGlyYXRpb24gfHwgIWxvY2tlZCwgZXJyQmFkRXhwaXJhdGlvblVwZGF0ZSkKICAgIGJueiBzdGFrZV9hZnRlcl9hc3NlcnRANDQKICAgIGJ5dGVjIDMzIC8vICJFUlI6ZXJyQmV4dSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJCZXh1CgpzdGFrZV9hZnRlcl9hc3NlcnRANDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjM3MAogICAgLy8gaWYgKGlzRXNjcm93KSB7CiAgICBieiBzdGFrZV9lbHNlX2JvZHlANTIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MzcxCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRQYXltZW50UmVjZWl2ZXIpCiAgICBkdXAKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBzdGFrZV9hZnRlcl9hc3NlcnRANDcKICAgIGJ5dGVjIDE1IC8vICJFUlI6ZXJySXBtciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcG1yCgpzdGFrZV9hZnRlcl9hc3NlcnRANDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjM3MgogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSBhbW91bnQsIGVyckludmFsaWRQYXltZW50QW1vdW50KQogICAgZ3R4bnMgQW1vdW50CiAgICBkaWcgOQogICAgPT0KICAgIGJueiBzdGFrZV9hZnRlcl9hc3NlcnRANDkKICAgIGJ5dGVjIDE2IC8vICJFUlI6ZXJySXBtYSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcG1hCgpzdGFrZV9hZnRlcl9hc3NlcnRANDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjM3NAogICAgLy8gdGhpcy51cGRhdGVUb3RhbHMoMCwgdHlwZSwgYW1vdW50LCB0cnVlKQogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMwogICAgZGlnIDkKICAgIGludGNfMSAvLyAxCiAgICBjYWxsc3ViIHVwZGF0ZVRvdGFscwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czozNzUKICAgIC8vIGlmIChsb2NrZWQpIHsKICAgIGJ6IHN0YWtlX2FmdGVyX2lmX2Vsc2VANTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6Mzc4CiAgICAvLyB0aGlzLnVwZGF0ZUxpdmVMb2NrZWRTdGFrZSgwLCBjdXJyZW50U3Rha2VFeHBpcmF0aW9uID09PSAwID8gbmV3QW1vdW50IDogYW1vdW50LCB0cnVlKQogICAgZGlnIDcKICAgICEKICAgIGRpZyA3CiAgICBkaWcgMgogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIGludGNfMCAvLyAwCiAgICBzd2FwCiAgICBpbnRjXzEgLy8gMQogICAgY2FsbHN1YiB1cGRhdGVMaXZlTG9ja2VkU3Rha2UKCnN0YWtlX2FmdGVyX2lmX2Vsc2VANTU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjM4OAogICAgLy8gd2VpZ2h0ZWRBZ2U6IHRoaXMuY2FsY3VsYXRlVXBkYXRlZFdlaWdodGVkQWdlKGN1cnJlbnRTdGFrZSwgbmV3QW1vdW50KSwKICAgIGR1cAogICAgY292ZXIgMgogICAgY2FsbHN1YiBjYWxjdWxhdGVVcGRhdGVkV2VpZ2h0ZWRBZ2UKICAgIHBvcAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czozODQtMzg5CiAgICAvLyB0aGlzLnN0YWtlcyhzaykudmFsdWUgPSB7CiAgICAvLyAgIGFtb3VudDogbmV3QW1vdW50LAogICAgLy8gICBsYXN0VXBkYXRlOiB0aW1lc3RhbXAsCiAgICAvLyAgIGV4cGlyYXRpb24sCiAgICAvLyAgIHdlaWdodGVkQWdlOiB0aGlzLmNhbGN1bGF0ZVVwZGF0ZWRXZWlnaHRlZEFnZShjdXJyZW50U3Rha2UsIG5ld0Ftb3VudCksCiAgICAvLyB9CiAgICBpdG9iCiAgICB1bmNvdmVyIDIKICAgIGl0b2IKICAgIGNvbmNhdAogICAgdW5jb3ZlciAzCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgYm94X3B1dAogICAgYiBzdGFrZV9hZnRlcl9pZl9lbHNlQDU2CgpzdGFrZV9lbHNlX2JvZHlANTI6CiAgICBwb3BuIDIKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czozODEKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyLmJhbGFuY2UgPj0gY3VycmVudFN0YWtlQW1vdW50ICsgYW1vdW50LCBlcnJJbnN1ZmZpY2llbnRCYWxhbmNlKQogICAgdHhuIFNlbmRlcgogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RCYWxhbmNlCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIGRpZyAxCiAgICA+PQogICAgYm56IHN0YWtlX2FmdGVyX2lmX2Vsc2VANTUKICAgIGJ5dGVjIDEyIC8vICJFUlI6ZXJySWJhbCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJYmFsCgpzdGFrZV9ib29sX2ZhbHNlQDQxOgogICAgaW50Y18wIC8vIDAKICAgIGIgc3Rha2VfYm9vbF9tZXJnZUA0MgoKc3Rha2VfYm9vbF9mYWxzZUA5OgogICAgaW50Y18wIC8vIDAKICAgIGIgc3Rha2VfYm9vbF9tZXJnZUAxMAoKc3Rha2VfYm9vbF9mYWxzZUA0OgogICAgaW50Y18wIC8vIDAKICAgIGIgc3Rha2VfYm9vbF9tZXJnZUA1CgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5zdGFrZUFzYVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnN0YWtlQXNhOgogICAgaW50Y18wIC8vIDAKICAgIHB1c2hieXRlcyAiIgogICAgZHVwbiAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjM5My0zOTkKICAgIC8vIHN0YWtlQXNhKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICB0eXBlOiBTdGFraW5nVHlwZSwKICAgIC8vICAgYW1vdW50OiB1aW50NjQsCiAgICAvLyAgIGV4cGlyYXRpb246IHVpbnQ2NAogICAgLy8gKTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgcHVzaGludCAyCiAgICAtCiAgICBkdXBuIDIKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgY292ZXIgMgogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA0IC8vIGF4ZmVyCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXhmZXIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgY292ZXIgNQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ4CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciA2CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQwMAogICAgLy8gdGhpcy5hc3NlcnRWYWxpZFN0YWtlVHlwZSh0eXBlKQogICAgY2FsbHN1YiBhc3NlcnRWYWxpZFN0YWtlVHlwZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0MDEKICAgIC8vIGFzc2VydFBsYWluUGF5bWVudChwYXltZW50KQogICAgc3dhcAogICAgY2FsbHN1YiBhc3NlcnRQbGFpblBheW1lbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDAzCiAgICAvLyBhc3NlcnRTYWZlQXNzZXRUcmFuc2Zlcihhc3NldFhmZXIsIFR4bi5zZW5kZXIpCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE3NwogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5zZW5kZXIgPT09IHNlbmRlciwgZXJySW52YWxpZFBheW1lbnRTZW5kZXIpCiAgICBzd2FwCiAgICBndHhucyBTZW5kZXIKICAgID09CiAgICBibnogc3Rha2VBc2FfYWZ0ZXJfYXNzZXJ0QDgzCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJJcG1zIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwbXMKCnN0YWtlQXNhX2FmdGVyX2Fzc2VydEA4MzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTc4CiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLmFzc2V0U2VuZGVyID09PSBHbG9iYWwuemVyb0FkZHJlc3MsIGVyckNsYXdiYWNrRm9yYmlkZGVuKQogICAgZHVwCiAgICBndHhucyBBc3NldFNlbmRlcgogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYm56IHN0YWtlQXNhX2FmdGVyX2Fzc2VydEA4NQogICAgcHVzaGJ5dGVzICJFUlI6ZXJyTmNsdyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOY2x3CgpzdGFrZUFzYV9hZnRlcl9hc3NlcnRAODU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE3OQogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5hc3NldENsb3NlVG8gPT09IEdsb2JhbC56ZXJvQWRkcmVzcywgZXJyQ2xvc2VGb3JiaWRkZW4pCiAgICBkdXAKICAgIGd0eG5zIEFzc2V0Q2xvc2VUbwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYm56IHN0YWtlQXNhX2FmdGVyX2Fzc2VydEA4NwogICAgYnl0ZWMgMjYgLy8gIkVSUjplcnJOY2xzIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5jbHMKCnN0YWtlQXNhX2FmdGVyX2Fzc2VydEA4NzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTgwCiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLnJla2V5VG8gPT09IEdsb2JhbC56ZXJvQWRkcmVzcywgZXJyUmVrZXlGb3JiaWRkZW4pCiAgICBkdXAKICAgIGd0eG5zIFJla2V5VG8KICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIGJueiBzdGFrZUFzYV9hZnRlcl9hc3NlcnRAODkKICAgIGJ5dGVjIDI3IC8vICJFUlI6ZXJyTnJreSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOcmt5CgpzdGFrZUFzYV9hZnRlcl9hc3NlcnRAODk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQwNAogICAgLy8gY29uc3QgaW5UaGVGdXR1cmUgPSBleHBpcmF0aW9uID4gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcAogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgZGlnIDQKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICA+CiAgICBjb3ZlciA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQwNQogICAgLy8gbGV0IGxlc3NUaGFuTWF4TG9ja3VwID0gZXhwaXJhdGlvbiA8PSBHbG9iYWwubGF0ZXN0VGltZXN0YW1wICsgT05FX1lFQVIKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIGludGMgOCAvLyAzMTUzNjAwMAogICAgKwogICAgPD0KICAgIGJ1cnkgNwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0MDYKICAgIC8vIGlmICh0aGlzLnNldHRpbmdzKGFzc2V0WGZlci54ZmVyQXNzZXQuaWQpLmV4aXN0cykgewogICAgZHVwCiAgICBndHhucyBYZmVyQXNzZXQKICAgIGR1cAogICAgYnVyeSAxMAogICAgaXRvYgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExOAogICAgLy8gc2V0dGluZ3MgPSBCb3hNYXA8dWludDY0LCB1aW50NjQ+KHsga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4U2V0dGluZ3MgfSkKICAgIGJ5dGVjIDIyIC8vICJlIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGJ1cnkgMTIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDA2CiAgICAvLyBpZiAodGhpcy5zZXR0aW5ncyhhc3NldFhmZXIueGZlckFzc2V0LmlkKS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogc3Rha2VBc2FfYWZ0ZXJfaWZfZWxzZUAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQwNwogICAgLy8gbGVzc1RoYW5NYXhMb2NrdXAgPSBleHBpcmF0aW9uIDw9IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgKyB0aGlzLnNldHRpbmdzKGFzc2V0WGZlci54ZmVyQXNzZXQuaWQpLnZhbHVlCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBkaWcgMTEKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBidG9pCiAgICArCiAgICBkaWcgNQogICAgPj0KICAgIGJ1cnkgOAoKc3Rha2VBc2FfYWZ0ZXJfaWZfZWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0MDkKICAgIC8vIGNvbnN0IGxvY2tlZCA9IHR5cGUgPT09IFNUQUtJTkdfVFlQRV9MT0NLCiAgICBkaWcgMwogICAgZHVwCiAgICBieXRlY18yIC8vIDB4MjgKICAgID09CiAgICBjb3ZlciA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQxMAogICAgLy8gY29uc3QgaXNFc2Nyb3cgPSB0eXBlID09PSBTVEFLSU5HX1RZUEVfSEFSRCB8fCB0eXBlID09PSBTVEFLSU5HX1RZUEVfTE9DSwogICAgYnl0ZWMgNCAvLyAweDFlCiAgICA9PQogICAgYm56IHN0YWtlQXNhX2Jvb2xfdHJ1ZUA1CiAgICBkaWcgNAogICAgYnogc3Rha2VBc2FfYm9vbF9mYWxzZUA2CgpzdGFrZUFzYV9ib29sX3RydWVANToKICAgIGludGNfMSAvLyAxCgpzdGFrZUFzYV9ib29sX21lcmdlQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQxMQogICAgLy8gY29uc3QgdGltZXN0YW1wID0gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcAogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgY292ZXIgNQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0MTMKICAgIC8vIGxvZ2dlZEFzc2VydCgoaW5UaGVGdXR1cmUgJiYgbGVzc1RoYW5NYXhMb2NrdXApIHx8ICFsb2NrZWQsIGVyckJhZEV4cGlyYXRpb24pCiAgICB1bmNvdmVyIDgKICAgIGJ6IHN0YWtlQXNhX29yX2NvbnRkQDkKICAgIGRpZyA5CiAgICBibnogc3Rha2VBc2FfYm9vbF90cnVlQDEwCgpzdGFrZUFzYV9vcl9jb250ZEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0MTMKICAgIC8vIGxvZ2dlZEFzc2VydCgoaW5UaGVGdXR1cmUgJiYgbGVzc1RoYW5NYXhMb2NrdXApIHx8ICFsb2NrZWQsIGVyckJhZEV4cGlyYXRpb24pCiAgICBkaWcgNgogICAgYm56IHN0YWtlQXNhX2Jvb2xfZmFsc2VAMTEKCnN0YWtlQXNhX2Jvb2xfdHJ1ZUAxMDoKICAgIGludGNfMSAvLyAxCgpzdGFrZUFzYV9ib29sX21lcmdlQDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0MTMKICAgIC8vIGxvZ2dlZEFzc2VydCgoaW5UaGVGdXR1cmUgJiYgbGVzc1RoYW5NYXhMb2NrdXApIHx8ICFsb2NrZWQsIGVyckJhZEV4cGlyYXRpb24pCiAgICBibnogc3Rha2VBc2FfYWZ0ZXJfYXNzZXJ0QDE0CiAgICBieXRlYyAzMSAvLyAiRVJSOmVyckJleHAiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQmV4cAoKc3Rha2VBc2FfYWZ0ZXJfYXNzZXJ0QDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0MTcKICAgIC8vIGNvbnN0IHNrOiBTdGFrZUtleSA9IHsgYWRkcmVzczogVHhuLnNlbmRlciwgYXNzZXQsIHR5cGUgfQogICAgdHhuIFNlbmRlcgogICAgZGlnIDIKICAgIGNvbmNhdAogICAgZGlnIDUKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDUKICAgIC8vIHN0YWtlcyA9IEJveE1hcDxTdGFrZUtleSwgU3Rha2U+KHsga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4U3Rha2VzIH0pCiAgICBieXRlY18wIC8vICJzIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGNvdmVyIDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDE5CiAgICAvLyBjb25zdCBpc1VwZGF0ZSA9IHRoaXMuc3Rha2VzKHNrKS5leGlzdHMKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0MjEKICAgIC8vIGlmICghaXNVcGRhdGUpIHsKICAgIGJueiBzdGFrZUFzYV9lbHNlX2JvZHlANTIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDI1CiAgICAvLyBjb25zdCBzcG9uc29yID0gc3BvbnNvckNvc3QocGF5bWVudC5zZW5kZXIsIFR4bi5zZW5kZXIpCiAgICBkaWcgMwogICAgZ3R4bnMgU2VuZGVyCiAgICBkdXAKICAgIGNvdmVyIDEwCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwMQogICAgLy8gcmV0dXJuIHBheWVyID09PSBvd25lciA/IDAgOiBQYXllclJlY29yZE1CUgogICAgPT0KICAgIGludGMgNyAvLyAyODUwMAogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBjb3ZlciA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQyNwogICAgLy8gaWYgKGlzRXNjcm93KSB7CiAgICBieiBzdGFrZUFzYV9lbHNlX2JvZHlAMjcKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0MjgKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJySW52YWxpZFBheW1lbnRSZWNlaXZlcikKICAgIGRpZyAxCiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogc3Rha2VBc2FfYWZ0ZXJfYXNzZXJ0QDE4CiAgICBieXRlYyAxNSAvLyAiRVJSOmVycklwbXIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBtcgoKc3Rha2VBc2FfYWZ0ZXJfYXNzZXJ0QDE4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0MjkKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LmFtb3VudCA9PT0gY29zdHMuc3Rha2VzICsgc3BvbnNvciwgZXJySW52YWxpZFBheW1lbnRBbW91bnQpCiAgICBzd2FwCiAgICBndHhucyBBbW91bnQKICAgIGludGMgNCAvLyAzMjEwMAogICAgdW5jb3ZlciA0CiAgICArCiAgICA9PQogICAgYm56IHN0YWtlQXNhX2FmdGVyX2Fzc2VydEAyMAogICAgYnl0ZWMgMTYgLy8gIkVSUjplcnJJcG1hIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwbWEKCnN0YWtlQXNhX2FmdGVyX2Fzc2VydEAyMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDMxCiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLmFzc2V0UmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBlcnJJbnZhbGlkQXNzZXRBbW91bnQpCiAgICBkdXAKICAgIGd0eG5zIEFzc2V0UmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IHN0YWtlQXNhX2FmdGVyX2Fzc2VydEAyMgogICAgYnl0ZWMgMTAgLy8gIkVSUjplcnJJYWFtIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklhYW0KCnN0YWtlQXNhX2FmdGVyX2Fzc2VydEAyMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDMyCiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLmFzc2V0QW1vdW50ID09PSBhbW91bnQsIGVyckludmFsaWRBc3NldEFtb3VudCkKICAgIGd0eG5zIEFzc2V0QW1vdW50CiAgICBkaWcgNwogICAgPT0KICAgIGJueiBzdGFrZUFzYV9hZnRlcl9hc3NlcnRAMjQKICAgIGJ5dGVjIDEwIC8vICJFUlI6ZXJySWFhbSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJYWFtCgpzdGFrZUFzYV9hZnRlcl9hc3NlcnRAMjQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQzNAogICAgLy8gdGhpcy51cGRhdGVUb3RhbHMoYXNzZXQsIHR5cGUsIGFtb3VudCwgdHJ1ZSkKICAgIGRpZyA5CiAgICBzd2FwCiAgICBkaWcgNwogICAgaW50Y18xIC8vIDEKICAgIGNhbGxzdWIgdXBkYXRlVG90YWxzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQzNQogICAgLy8gaWYgKGxvY2tlZCkgewogICAgc3dhcAogICAgYnogc3Rha2VBc2FfYWZ0ZXJfaWZfZWxzZUA1MQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0MzYKICAgIC8vIHRoaXMudXBkYXRlTGl2ZUxvY2tlZFN0YWtlKGFzc2V0LCBhbW91bnQsIHRydWUpCiAgICBkaWcgNwogICAgZGlnIDUKICAgIGludGNfMSAvLyAxCiAgICBjYWxsc3ViIHVwZGF0ZUxpdmVMb2NrZWRTdGFrZQoKc3Rha2VBc2FfYWZ0ZXJfaWZfZWxzZUA1MToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDY2LTQ3MQogICAgLy8gdGhpcy5zdGFrZXMoc2spLnZhbHVlID0gewogICAgLy8gICBhbW91bnQsCiAgICAvLyAgIGxhc3RVcGRhdGU6IHRpbWVzdGFtcCwKICAgIC8vICAgZXhwaXJhdGlvbiwKICAgIC8vICAgd2VpZ2h0ZWRBZ2U6IDAsCiAgICAvLyB9CiAgICBkaWcgNAogICAgaXRvYgogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDcwCiAgICAvLyB3ZWlnaHRlZEFnZTogMCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQ2Ni00NzEKICAgIC8vIHRoaXMuc3Rha2VzKHNrKS52YWx1ZSA9IHsKICAgIC8vICAgYW1vdW50LAogICAgLy8gICBsYXN0VXBkYXRlOiB0aW1lc3RhbXAsCiAgICAvLyAgIGV4cGlyYXRpb24sCiAgICAvLyAgIHdlaWdodGVkQWdlOiAwLAogICAgLy8gfQogICAgaXRvYgogICAgY29uY2F0CiAgICBkaWcgMQogICAgc3dhcAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0NzIKICAgIC8vIHJlY29yZFBheWVyKHRoaXMuc3Rha2VzKHNrKS5rZXksIHBheW1lbnQuc2VuZGVyLCBUeG4uc2VuZGVyKQogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgY292ZXIgMgogICAgY2FsbHN1YiByZWNvcmRQYXllcgoKc3Rha2VBc2FfYWZ0ZXJfaWZfZWxzZUA4MDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MzkzLTM5OQogICAgLy8gc3Rha2VBc2EoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIHR5cGU6IFN0YWtpbmdUeXBlLAogICAgLy8gICBhbW91bnQ6IHVpbnQ2NCwKICAgIC8vICAgZXhwaXJhdGlvbjogdWludDY0CiAgICAvLyApOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCnN0YWtlQXNhX2Vsc2VfYm9keUAyNzoKICAgIHVuY292ZXIgNgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQzOQogICAgLy8gfSBlbHNlIGlmICh0eXBlID09PSBTVEFLSU5HX1RZUEVfSEVBUlRCRUFUKSB7CiAgICB1bmNvdmVyIDMKICAgIGJ5dGVjIDggLy8gMHgwYQogICAgPT0KICAgIGJ6IHN0YWtlQXNhX2Vsc2VfYm9keUAzOQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0NDAKICAgIC8vIGNvbnN0IFtob2xkaW5nQW1vdW50LCBvcHRlZEluXSA9IEFzc2V0SG9sZGluZy5hc3NldEJhbGFuY2UoVHhuLnNlbmRlciwgYXNzZXQpCiAgICB0eG4gU2VuZGVyCiAgICBkaWcgMTIKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0NDIKICAgIC8vIGxvZ2dlZEFzc2VydChvcHRlZEluLCBlcnJOb3RPcHRlZEluKQogICAgYm56IHN0YWtlQXNhX2FmdGVyX2Fzc2VydEAzMAogICAgYnl0ZWMgMTggLy8gIkVSUjplcnJOb3B0IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5vcHQKCnN0YWtlQXNhX2FmdGVyX2Fzc2VydEAzMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDQzCiAgICAvLyBsb2dnZWRBc3NlcnQoaG9sZGluZ0Ftb3VudCA+IDAsIGVyckludmFsaWRBc3NldEFtb3VudCkKICAgIGJueiBzdGFrZUFzYV9hZnRlcl9hc3NlcnRAMzIKICAgIGJ5dGVjIDEwIC8vICJFUlI6ZXJySWFhbSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJYWFtCgpzdGFrZUFzYV9hZnRlcl9hc3NlcnRAMzI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQ0NQogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBlcnJJbnZhbGlkUGF5bWVudFJlY2VpdmVyKQogICAgZGlnIDIKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBzdGFrZUFzYV9hZnRlcl9hc3NlcnRAMzQKICAgIGJ5dGVjIDE1IC8vICJFUlI6ZXJySXBtciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcG1yCgpzdGFrZUFzYV9hZnRlcl9hc3NlcnRAMzQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQ0NgogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSAoY29zdHMuc3Rha2VzICsgY29zdHMuaGVhcnRiZWF0cyArIHNwb25zb3IpLCBlcnJJbnZhbGlkUGF5bWVudEFtb3VudCkKICAgIHVuY292ZXIgMgogICAgZ3R4bnMgQW1vdW50CiAgICBpbnRjIDUgLy8gMTAyMjAwCiAgICB1bmNvdmVyIDQKICAgICsKICAgID09CiAgICBibnogc3Rha2VBc2FfYWZ0ZXJfYXNzZXJ0QDM2CiAgICBieXRlYyAxNiAvLyAiRVJSOmVycklwbWEiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBtYQoKc3Rha2VBc2FfYWZ0ZXJfYXNzZXJ0QDM2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0NDkKICAgIC8vIGxvZ2dlZEFzc2VydChhc3NldFhmZXIuYXNzZXRBbW91bnQgPT09IDAsIGVyckludmFsaWRBc3NldEFtb3VudCkKICAgIHN3YXAKICAgIGd0eG5zIEFzc2V0QW1vdW50CiAgICBieiBzdGFrZUFzYV9hZnRlcl9hc3NlcnRAMzgKICAgIGJ5dGVjIDEwIC8vICJFUlI6ZXJySWFhbSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJYWFtCgpzdGFrZUFzYV9hZnRlcl9hc3NlcnRAMzg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQ1MgogICAgLy8gY29uc3QgaGVhcnRiZWF0S2V5OiBIZWFydGJlYXRLZXkgPSB7IGFkZHJlc3M6IFR4bi5zZW5kZXIsIGFzc2V0IH0KICAgIHR4biBTZW5kZXIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMTItMTE0CiAgICAvLyBoZWFydGJlYXRzID0gQm94TWFwPEhlYXJ0YmVhdEtleSwgYXJjNC5TdGF0aWNBcnJheTxhcmM0SGVhcnRiZWF0LCA0Pj4oewogICAgLy8gICBrZXlQcmVmaXg6IFN0YWtpbmdCb3hQcmVmaXhIZWFydGJlYXRzLAogICAgLy8gfSkKICAgIGJ5dGVjIDkgLy8gImgiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MjU4LTI2MwogICAgLy8gcmV0dXJuIG5ldyBhcmM0LlN0YXRpY0FycmF5PGFyYzRIZWFydGJlYXQsIDQ+KAogICAgLy8gICBlbXB0eUhlYXJ0YmVhdCgpLAogICAgLy8gICBlbXB0eUhlYXJ0YmVhdCgpLAogICAgLy8gICBlbXB0eUhlYXJ0YmVhdCgpLAogICAgLy8gICBlbXB0eUhlYXJ0YmVhdCgpCiAgICAvLyApCiAgICBieXRlYyAyMSAvLyAweDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDUzCiAgICAvLyB0aGlzLmhlYXJ0YmVhdHMoaGVhcnRiZWF0S2V5KS52YWx1ZSA9IHRoaXMuZW1wdHlIZWFydGJlYXRzKCkKICAgIGJveF9wdXQKICAgIGIgc3Rha2VBc2FfYWZ0ZXJfaWZfZWxzZUA1MQoKc3Rha2VBc2FfZWxzZV9ib2R5QDM5OgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQ1NQogICAgLy8gY29uc3QgW2hvbGRpbmdBbW91bnQsIG9wdGVkSW5dID0gQXNzZXRIb2xkaW5nLmFzc2V0QmFsYW5jZShUeG4uc2VuZGVyLCBhc3NldCkKICAgIHR4biBTZW5kZXIKICAgIGRpZyAxMQogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQ1NgogICAgLy8gbG9nZ2VkQXNzZXJ0KG9wdGVkSW4sIGVyck5vdE9wdGVkSW4pCiAgICBibnogc3Rha2VBc2FfYWZ0ZXJfYXNzZXJ0QDQxCiAgICBieXRlYyAxOCAvLyAiRVJSOmVyck5vcHQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTm9wdAoKc3Rha2VBc2FfYWZ0ZXJfYXNzZXJ0QDQxOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0NTcKICAgIC8vIGxvZ2dlZEFzc2VydChob2xkaW5nQW1vdW50ID49IGFtb3VudCwgZXJySW5zdWZmaWNpZW50QmFsYW5jZSkKICAgIGRpZyA4CiAgICA+PQogICAgYm56IHN0YWtlQXNhX2FmdGVyX2Fzc2VydEA0MwogICAgYnl0ZWMgMTIgLy8gIkVSUjplcnJJYmFsIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckliYWwKCnN0YWtlQXNhX2FmdGVyX2Fzc2VydEA0MzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDU5CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRQYXltZW50UmVjZWl2ZXIpCiAgICBkaWcgMQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IHN0YWtlQXNhX2FmdGVyX2Fzc2VydEA0NQogICAgYnl0ZWMgMTUgLy8gIkVSUjplcnJJcG1yIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwbXIKCnN0YWtlQXNhX2FmdGVyX2Fzc2VydEA0NToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDYwCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IGNvc3RzLnN0YWtlcyArIHNwb25zb3IsIGVyckludmFsaWRQYXltZW50QW1vdW50KQogICAgc3dhcAogICAgZ3R4bnMgQW1vdW50CiAgICBpbnRjIDQgLy8gMzIxMDAKICAgIHVuY292ZXIgMwogICAgKwogICAgPT0KICAgIGJueiBzdGFrZUFzYV9hZnRlcl9hc3NlcnRANDcKICAgIGJ5dGVjIDE2IC8vICJFUlI6ZXJySXBtYSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcG1hCgpzdGFrZUFzYV9hZnRlcl9hc3NlcnRANDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQ2MwogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci5hc3NldEFtb3VudCA9PT0gMCwgZXJySW52YWxpZEFzc2V0QW1vdW50KQogICAgZ3R4bnMgQXNzZXRBbW91bnQKICAgIGJ6IHN0YWtlQXNhX2FmdGVyX2lmX2Vsc2VANTEKICAgIGJ5dGVjIDEwIC8vICJFUlI6ZXJySWFhbSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJYWFtCgpzdGFrZUFzYV9lbHNlX2JvZHlANTI6CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDc0CiAgICAvLyBsb2dnZWRBc3NlcnQodHlwZSAhPT0gU1RBS0lOR19UWVBFX0hFQVJUQkVBVCwgZXJySGVhcnRiZWF0Q2Fubm90VXBkYXRlKQogICAgZGlnIDMKICAgIGJ5dGVjIDggLy8gMHgwYQogICAgIT0KICAgIGJueiBzdGFrZUFzYV9hZnRlcl9hc3NlcnRANTQKICAgIGJ5dGVjIDMyIC8vICJFUlI6ZXJySGJjdSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJIYmN1CgpzdGFrZUFzYV9hZnRlcl9hc3NlcnRANTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQ3NQogICAgLy8gY29uc3QgY3VycmVudFN0YWtlID0gY2xvbmUodGhpcy5zdGFrZXMoc2spLnZhbHVlKQogICAgZGlnIDcKICAgIGJveF9nZXQKICAgIHN3YXAKICAgIGR1cAogICAgY292ZXIgMgogICAgY292ZXIgNgogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDc2CiAgICAvLyBjb25zdCB7IGV4cGlyYXRpb246IGN1cnJlbnRTdGFrZUV4cGlyYXRpb24sIGFtb3VudDogY3VycmVudFN0YWtlQW1vdW50IH0gPSBjdXJyZW50U3Rha2UKICAgIGR1cAogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgY292ZXIgMgogICAgYnVyeSAxNAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQ3NwogICAgLy8gY29uc3QgbmV3QW1vdW50OiB1aW50NjQgPSBjdXJyZW50U3Rha2VBbW91bnQgKyBhbW91bnQKICAgIGRpZyAxMQogICAgKwogICAgY292ZXIgNQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0NzgKICAgIC8vIGxvZ2dlZEFzc2VydChleHBpcmF0aW9uID49IGN1cnJlbnRTdGFrZUV4cGlyYXRpb24gfHwgIWxvY2tlZCwgZXJyQmFkRXhwaXJhdGlvblVwZGF0ZSkKICAgIGRpZyA5CiAgICA8PQogICAgYm56IHN0YWtlQXNhX2Jvb2xfdHJ1ZUA1NgogICAgZGlnIDcKICAgIGJueiBzdGFrZUFzYV9ib29sX2ZhbHNlQDU3CgpzdGFrZUFzYV9ib29sX3RydWVANTY6CiAgICBpbnRjXzEgLy8gMQoKc3Rha2VBc2FfYm9vbF9tZXJnZUA1ODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDc4CiAgICAvLyBsb2dnZWRBc3NlcnQoZXhwaXJhdGlvbiA+PSBjdXJyZW50U3Rha2VFeHBpcmF0aW9uIHx8ICFsb2NrZWQsIGVyckJhZEV4cGlyYXRpb25VcGRhdGUpCiAgICBibnogc3Rha2VBc2FfYWZ0ZXJfYXNzZXJ0QDYwCiAgICBieXRlYyAzMyAvLyAiRVJSOmVyckJleHUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQmV4dQoKc3Rha2VBc2FfYWZ0ZXJfYXNzZXJ0QDYwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0ODEKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJySW52YWxpZFBheW1lbnRSZWNlaXZlcikKICAgIGRpZyAyCiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogc3Rha2VBc2FfYWZ0ZXJfYXNzZXJ0QDYyCiAgICBieXRlYyAxNSAvLyAiRVJSOmVycklwbXIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBtcgoKc3Rha2VBc2FfYWZ0ZXJfYXNzZXJ0QDYyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0ODIKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LmFtb3VudCA9PT0gMCwgZXJySW52YWxpZFBheW1lbnRBbW91bnQpCiAgICB1bmNvdmVyIDIKICAgIGd0eG5zIEFtb3VudAogICAgYnogc3Rha2VBc2FfYWZ0ZXJfYXNzZXJ0QDY0CiAgICBieXRlYyAxNiAvLyAiRVJSOmVycklwbWEiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBtYQoKc3Rha2VBc2FfYWZ0ZXJfYXNzZXJ0QDY0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0ODQKICAgIC8vIGlmIChpc0VzY3JvdykgewogICAgYnogc3Rha2VBc2FfZWxzZV9ib2R5QDcyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQ4NQogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci5hc3NldFJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJySW52YWxpZEFzc2V0QW1vdW50KQogICAgZHVwCiAgICBndHhucyBBc3NldFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBzdGFrZUFzYV9hZnRlcl9hc3NlcnRANjcKICAgIGJ5dGVjIDEwIC8vICJFUlI6ZXJySWFhbSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJYWFtCgpzdGFrZUFzYV9hZnRlcl9hc3NlcnRANjc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQ4NgogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci5hc3NldEFtb3VudCA9PT0gYW1vdW50LCBlcnJJbnZhbGlkQXNzZXRBbW91bnQpCiAgICBndHhucyBBc3NldEFtb3VudAogICAgZGlnIDgKICAgID09CiAgICBibnogc3Rha2VBc2FfYWZ0ZXJfYXNzZXJ0QDY5CiAgICBieXRlYyAxMCAvLyAiRVJSOmVycklhYW0iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySWFhbQoKc3Rha2VBc2FfYWZ0ZXJfYXNzZXJ0QDY5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0ODgKICAgIC8vIHRoaXMudXBkYXRlVG90YWxzKGFzc2V0LCB0eXBlLCBhbW91bnQsIHRydWUpCiAgICBkaWcgMTAKICAgIHN3YXAKICAgIGRpZyA4CiAgICBpbnRjXzEgLy8gMQogICAgY2FsbHN1YiB1cGRhdGVUb3RhbHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDg5CiAgICAvLyBpZiAobG9ja2VkKSB7CiAgICB1bmNvdmVyIDMKICAgIGJ6IHN0YWtlQXNhX2FmdGVyX2lmX2Vsc2VANzkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDkyCiAgICAvLyB0aGlzLnVwZGF0ZUxpdmVMb2NrZWRTdGFrZShhc3NldCwgY3VycmVudFN0YWtlRXhwaXJhdGlvbiA9PT0gMCA/IG5ld0Ftb3VudCA6IGFtb3VudCwgdHJ1ZSkKICAgIGRpZyA3CiAgICAhCiAgICBkaWcgNgogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBkaWcgOQogICAgc3dhcAogICAgaW50Y18xIC8vIDEKICAgIGNhbGxzdWIgdXBkYXRlTGl2ZUxvY2tlZFN0YWtlCgpzdGFrZUFzYV9hZnRlcl9pZl9lbHNlQDc5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1MDYKICAgIC8vIHdlaWdodGVkQWdlOiB0aGlzLmNhbGN1bGF0ZVVwZGF0ZWRXZWlnaHRlZEFnZShjdXJyZW50U3Rha2UsIG5ld0Ftb3VudCksCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGNhbGxzdWIgY2FsY3VsYXRlVXBkYXRlZFdlaWdodGVkQWdlCiAgICBwb3AKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTAyLTUwNwogICAgLy8gdGhpcy5zdGFrZXMoc2spLnZhbHVlID0gewogICAgLy8gICBhbW91bnQ6IG5ld0Ftb3VudCwKICAgIC8vICAgbGFzdFVwZGF0ZTogdGltZXN0YW1wLAogICAgLy8gICBleHBpcmF0aW9uLAogICAgLy8gICB3ZWlnaHRlZEFnZTogdGhpcy5jYWxjdWxhdGVVcGRhdGVkV2VpZ2h0ZWRBZ2UoY3VycmVudFN0YWtlLCBuZXdBbW91bnQpLAogICAgLy8gfQogICAgaXRvYgogICAgdW5jb3ZlciAyCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHVuY292ZXIgMgogICAgaXRvYgogICAgY29uY2F0CiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIGJveF9wdXQKICAgIGIgc3Rha2VBc2FfYWZ0ZXJfaWZfZWxzZUA4MAoKc3Rha2VBc2FfZWxzZV9ib2R5QDcyOgogICAgYnVyeSAxCiAgICB1bmNvdmVyIDQKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0OTUKICAgIC8vIGNvbnN0IFtob2xkaW5nQW1vdW50LCBvcHRlZEluXSA9IEFzc2V0SG9sZGluZy5hc3NldEJhbGFuY2UoVHhuLnNlbmRlciwgYXNzZXQpCiAgICB0eG4gU2VuZGVyCiAgICBkaWcgMTAKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0OTYKICAgIC8vIGxvZ2dlZEFzc2VydChvcHRlZEluLCBlcnJOb3RPcHRlZEluKQogICAgYm56IHN0YWtlQXNhX2FmdGVyX2Fzc2VydEA3NAogICAgYnl0ZWMgMTggLy8gIkVSUjplcnJOb3B0IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5vcHQKCnN0YWtlQXNhX2FmdGVyX2Fzc2VydEA3NDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDk3CiAgICAvLyBsb2dnZWRBc3NlcnQoaG9sZGluZ0Ftb3VudCA+PSBjdXJyZW50U3Rha2VBbW91bnQgKyBhbW91bnQsIGVyckluc3VmZmljaWVudEJhbGFuY2UpCiAgICBkaWcgMgogICAgPj0KICAgIGJueiBzdGFrZUFzYV9hZnRlcl9hc3NlcnRANzYKICAgIGJ5dGVjIDEyIC8vICJFUlI6ZXJySWJhbCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJYmFsCgpzdGFrZUFzYV9hZnRlcl9hc3NlcnRANzY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQ5OQogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci5hc3NldEFtb3VudCA9PT0gMCwgZXJySW52YWxpZEFzc2V0QW1vdW50KQogICAgZ3R4bnMgQXNzZXRBbW91bnQKICAgIGJ6IHN0YWtlQXNhX2FmdGVyX2lmX2Vsc2VANzkKICAgIGJ5dGVjIDEwIC8vICJFUlI6ZXJySWFhbSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJYWFtCgpzdGFrZUFzYV9ib29sX2ZhbHNlQDU3OgogICAgaW50Y18wIC8vIDAKICAgIGIgc3Rha2VBc2FfYm9vbF9tZXJnZUA1OAoKc3Rha2VBc2FfYm9vbF9mYWxzZUAxMToKICAgIGludGNfMCAvLyAwCiAgICBiIHN0YWtlQXNhX2Jvb2xfbWVyZ2VAMTIKCnN0YWtlQXNhX2Jvb2xfZmFsc2VANjoKICAgIGludGNfMCAvLyAwCiAgICBiIHN0YWtlQXNhX2Jvb2xfbWVyZ2VANwoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcud2l0aGRyYXdbcm91dGluZ10oKSAtPiB2b2lkOgp3aXRoZHJhdzoKICAgIHB1c2hieXRlcyAiIgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjUxMQogICAgLy8gd2l0aGRyYXcoYXNzZXQ6IHVpbnQ2NCwgdHlwZTogU3Rha2luZ1R5cGUpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cG4gMgogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50OAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1MTMKICAgIC8vIHR5cGUgPT09IFNUQUtJTkdfVFlQRV9IQVJEIHx8IHR5cGUgPT09IFNUQUtJTkdfVFlQRV9MT0NLLAogICAgYnl0ZWMgNCAvLyAweDFlCiAgICA9PQogICAgYm56IHdpdGhkcmF3X2Jvb2xfdHJ1ZUAzCiAgICBkdXAKICAgIGJ5dGVjXzIgLy8gMHgyOAogICAgPT0KICAgIGJ6IHdpdGhkcmF3X2Jvb2xfZmFsc2VANAoKd2l0aGRyYXdfYm9vbF90cnVlQDM6CiAgICBpbnRjXzEgLy8gMQoKd2l0aGRyYXdfYm9vbF9tZXJnZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1MTItNTE1CiAgICAvLyBsb2dnZWRBc3NlcnQoCiAgICAvLyAgIHR5cGUgPT09IFNUQUtJTkdfVFlQRV9IQVJEIHx8IHR5cGUgPT09IFNUQUtJTkdfVFlQRV9MT0NLLAogICAgLy8gICBlcnJXaXRoZHJhd0lzT25seUZvckhhcmRPckxvY2sKICAgIC8vICkKICAgIGJueiB3aXRoZHJhd19hZnRlcl9hc3NlcnRANwogICAgcHVzaGJ5dGVzICJFUlI6ZXJyV2hvbCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJXaG9sCgp3aXRoZHJhd19hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTE3CiAgICAvLyBjb25zdCBzayA9IHsgYWRkcmVzczogVHhuLnNlbmRlciwgYXNzZXQsIHR5cGUgfQogICAgdHhuIFNlbmRlcgogICAgZGlnIDIKICAgIGl0b2IKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1MTgKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnN0YWtlcyhzaykuZXhpc3RzLCBlcnJOb0xvY2spCiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgZGlnIDEKICAgIGV4dHJhY3QgMzIgOAogICAgdW5jb3ZlciAyCiAgICBleHRyYWN0IDQwIDEKICAgIGNvdmVyIDIKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwNQogICAgLy8gc3Rha2VzID0gQm94TWFwPFN0YWtlS2V5LCBTdGFrZT4oeyBrZXlQcmVmaXg6IFN0YWtpbmdCb3hQcmVmaXhTdGFrZXMgfSkKICAgIGJ5dGVjXzAgLy8gInMiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1MTgKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnN0YWtlcyhzaykuZXhpc3RzLCBlcnJOb0xvY2spCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiB3aXRoZHJhd19hZnRlcl9hc3NlcnRAOQogICAgYnl0ZWMgMjMgLy8gIkVSUjplcnJObGNrIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5sY2sKCndpdGhkcmF3X2FmdGVyX2Fzc2VydEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1MjAKICAgIC8vIGNvbnN0IHsgZXhwaXJhdGlvbiwgYW1vdW50IH0gPSB0aGlzLnN0YWtlcyhzaykudmFsdWUKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGR1cAogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIGJ1cnkgNQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBidXJ5IDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTIxCiAgICAvLyBsb2dnZWRBc3NlcnQodHlwZSAhPT0gU1RBS0lOR19UWVBFX0xPQ0sgfHwgZXhwaXJhdGlvbiA8IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsIGVyckxvY2tlZCkKICAgIGRpZyAxCiAgICBieXRlY18yIC8vIDB4MjgKICAgICE9CiAgICBibnogd2l0aGRyYXdfYm9vbF90cnVlQDExCiAgICBkaWcgMwogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgPAogICAgYnogd2l0aGRyYXdfYm9vbF9mYWxzZUAxMgoKd2l0aGRyYXdfYm9vbF90cnVlQDExOgogICAgaW50Y18xIC8vIDEKCndpdGhkcmF3X2Jvb2xfbWVyZ2VAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjUyMQogICAgLy8gbG9nZ2VkQXNzZXJ0KHR5cGUgIT09IFNUQUtJTkdfVFlQRV9MT0NLIHx8IGV4cGlyYXRpb24gPCBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLCBlcnJMb2NrZWQpCiAgICBibnogd2l0aGRyYXdfYWZ0ZXJfYXNzZXJ0QDE1CiAgICBieXRlYyAzNCAvLyAiRVJSOmVyckxvY2siCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTG9jawoKd2l0aGRyYXdfYWZ0ZXJfYXNzZXJ0QDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1MjUKICAgIC8vIGNvbnN0IFtyZWNlaXZlciwgcmVmdW5kXSA9IHJlbGVhc2VEZXBvc2l0KHRoaXMuc3Rha2VzKHNrKS5rZXksIFR4bi5zZW5kZXIsIFN0YWtlc01CUikKICAgIGR1cAogICAgdHhuIFNlbmRlcgogICAgaW50YyA0IC8vIDMyMTAwCiAgICBjYWxsc3ViIHJlbGVhc2VEZXBvc2l0CiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgY292ZXIgMwogICAgaW50Y18zIC8vIDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1MjYKICAgIC8vIGlmIChhc3NldCA9PT0gMCAmJiByZWNlaXZlciA9PT0gVHhuLnNlbmRlcikgewogICAgZGlnIDQKICAgIGJueiB3aXRoZHJhd19lbHNlX2JvZHlAMTkKICAgIGRpZyAzCiAgICB0eG4gU2VuZGVyCiAgICA9PQogICAgYnogd2l0aGRyYXdfZWxzZV9ib2R5QDE5CiAgICB1bmNvdmVyIDMKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1MjctNTMyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudCArIHJlZnVuZAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTI5CiAgICAvLyByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTMwCiAgICAvLyBhbW91bnQ6IGFtb3VudCArIHJlZnVuZAogICAgZGlnIDYKICAgIHVuY292ZXIgMwogICAgKwogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTI3LTUzMQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgYW1vdW50OiBhbW91bnQgKyByZWZ1bmQKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTI3LTUzMgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgYW1vdW50OiBhbW91bnQgKyByZWZ1bmQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAoKd2l0aGRyYXdfYWZ0ZXJfaWZfZWxzZUAyNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTU0CiAgICAvLyB0aGlzLnVwZGF0ZVRvdGFscyhhc3NldCwgdHlwZSwgYW1vdW50LCBmYWxzZSkKICAgIGRpZyAyCiAgICB1bmNvdmVyIDIKICAgIGR1cAogICAgY292ZXIgMgogICAgZGlnIDYKICAgIGludGNfMCAvLyAwCiAgICBjYWxsc3ViIHVwZGF0ZVRvdGFscwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1MjEKICAgIC8vIGxvZ2dlZEFzc2VydCh0eXBlICE9PSBTVEFLSU5HX1RZUEVfTE9DSyB8fCBleHBpcmF0aW9uIDwgR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwgZXJyTG9ja2VkKQogICAgYnl0ZWNfMiAvLyAweDI4CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjU1NQogICAgLy8gaWYgKHR5cGUgPT09IFNUQUtJTkdfVFlQRV9MT0NLICYmIGV4cGlyYXRpb24gIT09IDApIHsKICAgID09CiAgICBieiB3aXRoZHJhd19hZnRlcl9pZl9lbHNlQDI5CiAgICBkaWcgMgogICAgYnogd2l0aGRyYXdfYWZ0ZXJfaWZfZWxzZUAyOQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1NTYKICAgIC8vIHRoaXMudXBkYXRlTGl2ZUxvY2tlZFN0YWtlKGFzc2V0LCBhbW91bnQsIGZhbHNlKQogICAgZGlnIDEKICAgIGRpZyA0CiAgICBpbnRjXzAgLy8gMAogICAgY2FsbHN1YiB1cGRhdGVMaXZlTG9ja2VkU3Rha2UKCndpdGhkcmF3X2FmdGVyX2lmX2Vsc2VAMjk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjU1OQogICAgLy8gdGhpcy5zdGFrZXMoc2spLmRlbGV0ZSgpCiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTExCiAgICAvLyB3aXRoZHJhdyhhc3NldDogdWludDY0LCB0eXBlOiBTdGFraW5nVHlwZSk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKd2l0aGRyYXdfZWxzZV9ib2R5QDE5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1MzQKICAgIC8vIGlmIChhc3NldCA9PT0gMCkgewogICAgZGlnIDQKICAgIGJueiB3aXRoZHJhd19lbHNlX2JvZHlAMjIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTM1CiAgICAvLyBpdHhuLnBheW1lbnQoeyByZWNlaXZlcjogVHhuLnNlbmRlciwgYW1vdW50IH0pLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICB0eG4gU2VuZGVyCiAgICBkaWcgNwogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0Cgp3aXRoZHJhd19hZnRlcl9pZl9lbHNlQDI0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1NDYtNTUxCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlciwKICAgIC8vICAgICBhbW91bnQ6IHJlZnVuZAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTQ2LTU1MAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXIsCiAgICAvLyAgICAgYW1vdW50OiByZWZ1bmQKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTQ2LTU1MQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXIsCiAgICAvLyAgICAgYW1vdW50OiByZWZ1bmQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgYiB3aXRoZHJhd19hZnRlcl9pZl9lbHNlQDI2Cgp3aXRoZHJhd19lbHNlX2JvZHlAMjI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjUzNy01NDMKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1MzkKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICBkaWcgNQogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGRpZyA3CiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTM3LTU0MgogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50LAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vICAgfSkKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjUzNy01NDMKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIGIgd2l0aGRyYXdfYWZ0ZXJfaWZfZWxzZUAyNAoKd2l0aGRyYXdfYm9vbF9mYWxzZUAxMjoKICAgIGludGNfMCAvLyAwCiAgICBiIHdpdGhkcmF3X2Jvb2xfbWVyZ2VAMTMKCndpdGhkcmF3X2Jvb2xfZmFsc2VANDoKICAgIGludGNfMCAvLyAwCiAgICBiIHdpdGhkcmF3X2Jvb2xfbWVyZ2VANQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuY2hlY2twb2ludEV4cGlyZWRMb2NrW3JvdXRpbmddKCkgLT4gdm9pZDoKY2hlY2twb2ludEV4cGlyZWRMb2NrOgogICAgcHVzaGJ5dGVzICIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjU2MwogICAgLy8gY2hlY2twb2ludEV4cGlyZWRMb2NrKGFkZHJlc3M6IEFjY291bnQsIGFzc2V0OiB1aW50NjQpOiBib29sZWFuIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjU2NAogICAgLy8gY29uc3Qgc2s6IFN0YWtlS2V5ID0geyBhZGRyZXNzLCBhc3NldCwgdHlwZTogU1RBS0lOR19UWVBFX0xPQ0sgfQogICAgaXRvYgogICAgY29uY2F0CiAgICBieXRlY18yIC8vIDB4MjgKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDUKICAgIC8vIHN0YWtlcyA9IEJveE1hcDxTdGFrZUtleSwgU3Rha2U+KHsga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4U3Rha2VzIH0pCiAgICBieXRlY18wIC8vICJzIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTY1CiAgICAvLyBpZiAoIXRoaXMuc3Rha2VzKHNrKS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGNoZWNrcG9pbnRFeHBpcmVkTG9ja19hZnRlcl9pZl9lbHNlQDMKICAgIHBvcG4gMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1NjYKICAgIC8vIHJldHVybiBmYWxzZQogICAgaW50Y18wIC8vIDAKCmNoZWNrcG9pbnRFeHBpcmVkTG9ja19hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuY2hlY2twb2ludEV4cGlyZWRMb2NrQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjU2MwogICAgLy8gY2hlY2twb2ludEV4cGlyZWRMb2NrKGFkZHJlc3M6IEFjY291bnQsIGFzc2V0OiB1aW50NjQpOiBib29sZWFuIHsKICAgIGJ5dGVjIDExIC8vIDB4MDAKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDIKICAgIHNldGJpdAogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKY2hlY2twb2ludEV4cGlyZWRMb2NrX2FmdGVyX2lmX2Vsc2VAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTY5CiAgICAvLyBjb25zdCBpbmZvID0gY2xvbmUodGhpcy5zdGFrZXMoc2spLnZhbHVlKQogICAgZHVwCiAgICBib3hfZ2V0CiAgICBzd2FwCiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTcwCiAgICAvLyBpZiAoaW5mby5leHBpcmF0aW9uID09PSAwIHx8IGluZm8uZXhwaXJhdGlvbiA+PSBHbG9iYWwubGF0ZXN0VGltZXN0YW1wKSB7CiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBidXJ5IDUKICAgIGJ6IGNoZWNrcG9pbnRFeHBpcmVkTG9ja19pZl9ib2R5QDUKICAgIGRpZyAzCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICA+PQogICAgYnogY2hlY2twb2ludEV4cGlyZWRMb2NrX2FmdGVyX2lmX2Vsc2VANgoKY2hlY2twb2ludEV4cGlyZWRMb2NrX2lmX2JvZHlANToKICAgIHBvcG4gMwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1NzEKICAgIC8vIHJldHVybiBmYWxzZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTYzCiAgICAvLyBjaGVja3BvaW50RXhwaXJlZExvY2soYWRkcmVzczogQWNjb3VudCwgYXNzZXQ6IHVpbnQ2NCk6IGJvb2xlYW4gewogICAgYiBjaGVja3BvaW50RXhwaXJlZExvY2tfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmNoZWNrcG9pbnRFeHBpcmVkTG9ja0A3CgpjaGVja3BvaW50RXhwaXJlZExvY2tfYWZ0ZXJfaWZfZWxzZUA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1NzQKICAgIC8vIHRoaXMudXBkYXRlTGl2ZUxvY2tlZFN0YWtlKGFzc2V0LCBpbmZvLmFtb3VudCwgZmFsc2UpCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgaW50Y18wIC8vIDAKICAgIGNhbGxzdWIgdXBkYXRlTGl2ZUxvY2tlZFN0YWtlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjU3NQogICAgLy8gaW5mby5leHBpcmF0aW9uID0gMAogICAgaW50Y18wIC8vIDAKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTc1LTU3NgogICAgLy8gaW5mby5leHBpcmF0aW9uID0gMAogICAgLy8gdGhpcy5zdGFrZXMoc2spLnZhbHVlID0gY2xvbmUoaW5mbykKICAgIHB1c2hpbnQgMTYKICAgIHN3YXAKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjU3NwogICAgLy8gcmV0dXJuIHRydWUKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjU2MwogICAgLy8gY2hlY2twb2ludEV4cGlyZWRMb2NrKGFkZHJlc3M6IEFjY291bnQsIGFzc2V0OiB1aW50NjQpOiBib29sZWFuIHsKICAgIGIgY2hlY2twb2ludEV4cGlyZWRMb2NrX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5jaGVja3BvaW50RXhwaXJlZExvY2tANwoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuY3JlYXRlSGVhcnRiZWF0W3JvdXRpbmddKCkgLT4gdm9pZDoKY3JlYXRlSGVhcnRiZWF0OgogICAgaW50Y18wIC8vIDAKICAgIGR1cG4gNQogICAgcHVzaGJ5dGVzICIiCiAgICBkdXBuIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTgwCiAgICAvLyBjcmVhdGVIZWFydGJlYXQoYWRkcmVzczogQWNjb3VudCwgYXNzZXQ6IHVpbnQ2NCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjU4MQogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuaGVhcnRiZWF0TWFuYWdlckFkZHJlc3MudmFsdWUsIGVyck5vdEhlYXJ0YmVhdE1hbmFnZXIpCiAgICB0eG4gU2VuZGVyCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDAKICAgIC8vIGhlYXJ0YmVhdE1hbmFnZXJBZGRyZXNzID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IFN0YWtpbmdHbG9iYWxTdGF0ZUtleUhlYXJ0YmVhdE1hbmFnZXJBZGRyZXNzIH0pCiAgICBieXRlYyAzNSAvLyAiaGVhcnRiZWF0X21hbmFnZXJfYWRkcmVzcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTgxCiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5oZWFydGJlYXRNYW5hZ2VyQWRkcmVzcy52YWx1ZSwgZXJyTm90SGVhcnRiZWF0TWFuYWdlcikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA9PQogICAgYm56IGNyZWF0ZUhlYXJ0YmVhdF9hZnRlcl9hc3NlcnRAMwogICAgcHVzaGJ5dGVzICJFUlI6ZXJyTmhibSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOaGJtCgpjcmVhdGVIZWFydGJlYXRfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjU4MwogICAgLy8gY29uc3QgaGJrID0geyBhZGRyZXNzLCBhc3NldCB9CiAgICBkdXAKICAgIGl0b2IKICAgIGRpZyAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1ODQKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmhlYXJ0YmVhdHMoaGJrKS5leGlzdHMsIGVyckhlYXJiZWF0Tm90Rm91bmQpCiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgc3dhcAogICAgZXh0cmFjdCAzMiA4CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTEyLTExNAogICAgLy8gaGVhcnRiZWF0cyA9IEJveE1hcDxIZWFydGJlYXRLZXksIGFyYzQuU3RhdGljQXJyYXk8YXJjNEhlYXJ0YmVhdCwgND4+KHsKICAgIC8vICAga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4SGVhcnRiZWF0cywKICAgIC8vIH0pCiAgICBieXRlYyA5IC8vICJoIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGJ1cnkgMTIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTg0CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5oZWFydGJlYXRzKGhiaykuZXhpc3RzLCBlcnJIZWFyYmVhdE5vdEZvdW5kKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogY3JlYXRlSGVhcnRiZWF0X2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyAyNCAvLyAiRVJSOmVyckhibmYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySGJuZgoKY3JlYXRlSGVhcnRiZWF0X2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1ODYKICAgIC8vIGNvbnN0IHRpbWVzdGFtcCA9IG5ldyBVaW50NjQoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCkKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIGl0b2IKICAgIGJ1cnkgOAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1ODcKICAgIC8vIGNvbnN0IGhlYXJ0YmVhdHMgPSBjbG9uZSh0aGlzLmhlYXJ0YmVhdHMoaGJrKS52YWx1ZSkKICAgIGRpZyAxMAogICAgYm94X2dldAogICAgc3dhcAogICAgYnVyeSAxNAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTkwCiAgICAvLyBjb25zdCBoZWxkID0gbmV3IFVpbnQ2NCh0aGlzLmdldEhlbGQoYWRkcmVzcywgYXNzZXQpLmJhbGFuY2UpCiAgICBjYWxsc3ViIGdldEhlbGQKICAgIGV4dHJhY3QgMCA4CiAgICBidXJ5IDEwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjU5Mi01OTYKICAgIC8vIGNvbnN0IGhhcmRTdGFrZUtleSA9IHsKICAgIC8vICAgYWRkcmVzcywKICAgIC8vICAgYXNzZXQsCiAgICAvLyAgIHR5cGU6IFNUQUtJTkdfVFlQRV9IQVJECiAgICAvLyB9CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTk1CiAgICAvLyB0eXBlOiBTVEFLSU5HX1RZUEVfSEFSRAogICAgYnl0ZWMgNCAvLyAweDFlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjU5Mi01OTYKICAgIC8vIGNvbnN0IGhhcmRTdGFrZUtleSA9IHsKICAgIC8vICAgYWRkcmVzcywKICAgIC8vICAgYXNzZXQsCiAgICAvLyAgIHR5cGU6IFNUQUtJTkdfVFlQRV9IQVJECiAgICAvLyB9CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTk4CiAgICAvLyBsZXQgaGFyZDogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIGJ1cnkgNgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1OTkKICAgIC8vIGlmICh0aGlzLnN0YWtlcyhoYXJkU3Rha2VLZXkpLmV4aXN0cykgewogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIGRpZyAxCiAgICBleHRyYWN0IDMyIDgKICAgIHVuY292ZXIgMgogICAgZXh0cmFjdCA0MCAxCiAgICBjb3ZlciAyCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDUKICAgIC8vIHN0YWtlcyA9IEJveE1hcDxTdGFrZUtleSwgU3Rha2U+KHsga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4U3Rha2VzIH0pCiAgICBieXRlY18wIC8vICJzIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGJ1cnkgOQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1OTkKICAgIC8vIGlmICh0aGlzLnN0YWtlcyhoYXJkU3Rha2VLZXkpLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBjcmVhdGVIZWFydGJlYXRfYWZ0ZXJfaWZfZWxzZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjYwMAogICAgLy8gaGFyZCA9IHRoaXMuc3Rha2VzKGhhcmRTdGFrZUtleSkudmFsdWUuYW1vdW50CiAgICBkaWcgNwogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYnVyeSA1CgpjcmVhdGVIZWFydGJlYXRfYWZ0ZXJfaWZfZWxzZUA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2MDYKICAgIC8vIHR5cGU6IFNUQUtJTkdfVFlQRV9MT0NLCiAgICBieXRlY18yIC8vIDB4MjgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NjAzLTYwNwogICAgLy8gY29uc3QgbG9ja1N0YWtlS2V5ID0gewogICAgLy8gICBhZGRyZXNzLAogICAgLy8gICBhc3NldCwKICAgIC8vICAgdHlwZTogU1RBS0lOR19UWVBFX0xPQ0sKICAgIC8vIH0KICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2MDkKICAgIC8vIGxldCBsb2NrOiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgYnVyeSAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjYxMAogICAgLy8gaWYgKHRoaXMuc3Rha2VzKGxvY2tTdGFrZUtleSkuZXhpc3RzKSB7CiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgZGlnIDEKICAgIGV4dHJhY3QgMzIgOAogICAgdW5jb3ZlciAyCiAgICBleHRyYWN0IDQwIDEKICAgIGNvdmVyIDIKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwNQogICAgLy8gc3Rha2VzID0gQm94TWFwPFN0YWtlS2V5LCBTdGFrZT4oeyBrZXlQcmVmaXg6IFN0YWtpbmdCb3hQcmVmaXhTdGFrZXMgfSkKICAgIGJ5dGVjXzAgLy8gInMiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgYnVyeSA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjYxMAogICAgLy8gaWYgKHRoaXMuc3Rha2VzKGxvY2tTdGFrZUtleSkuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGNyZWF0ZUhlYXJ0YmVhdF9hZnRlcl9pZl9lbHNlQDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NjExCiAgICAvLyBsb2NrID0gdGhpcy5zdGFrZXMobG9ja1N0YWtlS2V5KS52YWx1ZS5hbW91bnQKICAgIGRpZyA1CiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBidXJ5IDEKCmNyZWF0ZUhlYXJ0YmVhdF9hZnRlcl9pZl9lbHNlQDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjYyMAogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IDQ7IGkgKz0gMSkgewogICAgaW50Y18wIC8vIDAKICAgIGJ1cnkgMwoKY3JlYXRlSGVhcnRiZWF0X3doaWxlX3RvcEAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NjIwCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgNDsgaSArPSAxKSB7CiAgICBkaWcgMgogICAgcHVzaGludCA0CiAgICA8CiAgICBieiBjcmVhdGVIZWFydGJlYXRfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmNyZWF0ZUhlYXJ0YmVhdEAxOQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2MjIKICAgIC8vIGkgPT09IDMgfHwKICAgIGRpZyAyCiAgICBwdXNoaW50IDMKICAgID09CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NjIyLTYyMwogICAgLy8gaSA9PT0gMyB8fAogICAgLy8gaGVhcnRiZWF0c1tpXS50aW1lc3RhbXAuYXNVaW50NjQoKSA+IGhlYXJ0YmVhdHNbaSArIDFdLnRpbWVzdGFtcC5hc1VpbnQ2NCgpCiAgICBibnogY3JlYXRlSGVhcnRiZWF0X2lmX2JvZHlAMTMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NjIzCiAgICAvLyBoZWFydGJlYXRzW2ldLnRpbWVzdGFtcC5hc1VpbnQ2NCgpID4gaGVhcnRiZWF0c1tpICsgMV0udGltZXN0YW1wLmFzVWludDY0KCkKICAgIGRpZyAzCiAgICBkdXAKICAgIGludGNfMyAvLyAzMgogICAgKgogICAgZGlnIDEyCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIHN3YXAKICAgIGludGNfMyAvLyAzMgogICAgZXh0cmFjdDMgLy8gb24gZXJyb3I6IGluZGV4IGFjY2VzcyBpcyBvdXQgb2YgYm91bmRzCiAgICBwdXNoaW50IDI0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgc3dhcAogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGR1cAogICAgYnVyeSA2CiAgICBpbnRjXzMgLy8gMzIKICAgICoKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgaW50Y18zIC8vIDMyCiAgICBleHRyYWN0MyAvLyBvbiBlcnJvcjogaW5kZXggYWNjZXNzIGlzIG91dCBvZiBib3VuZHMKICAgIHB1c2hpbnQgMjQKICAgIGV4dHJhY3RfdWludDY0CiAgICA+CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjYyMi02MjMKICAgIC8vIGkgPT09IDMgfHwKICAgIC8vIGhlYXJ0YmVhdHNbaV0udGltZXN0YW1wLmFzVWludDY0KCkgPiBoZWFydGJlYXRzW2kgKyAxXS50aW1lc3RhbXAuYXNVaW50NjQoKQogICAgYnogY3JlYXRlSGVhcnRiZWF0X2FmdGVyX2lmX2Vsc2VAMTcKCmNyZWF0ZUhlYXJ0YmVhdF9pZl9ib2R5QDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2MjUKICAgIC8vIGNvbnN0IGluZGV4VG9Nb2RpZnk6IHVpbnQ2NCA9IGkgPT09IDMgPyAwIDogaSArIDEKICAgIGJ6IGNyZWF0ZUhlYXJ0YmVhdF90ZXJuYXJ5X2ZhbHNlQDE1CiAgICBpbnRjXzAgLy8gMAoKY3JlYXRlSGVhcnRiZWF0X3Rlcm5hcnlfbWVyZ2VAMTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjYyOAogICAgLy8gaGFyZDogbmV3IFVpbnQ2NChoYXJkKSwKICAgIGRpZyA0CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjYyOQogICAgLy8gbG9jazogbmV3IFVpbnQ2NChsb2NrKSwKICAgIGRpZyAyCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjYyNi02MzEKICAgIC8vIHRoaXMuaGVhcnRiZWF0cyhoYmspLnZhbHVlW2luZGV4VG9Nb2RpZnldID0gbmV3IGFyYzRIZWFydGJlYXQoewogICAgLy8gICBoZWxkLAogICAgLy8gICBoYXJkOiBuZXcgVWludDY0KGhhcmQpLAogICAgLy8gICBsb2NrOiBuZXcgVWludDY0KGxvY2spLAogICAgLy8gICB0aW1lc3RhbXAsCiAgICAvLyB9KQogICAgZGlnIDExCiAgICB1bmNvdmVyIDIKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICBkaWcgNgogICAgY29uY2F0CiAgICBzd2FwCiAgICBpbnRjXzMgLy8gMzIKICAgICoKICAgIGRpZyA5CiAgICBzd2FwCiAgICB1bmNvdmVyIDIKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCgpjcmVhdGVIZWFydGJlYXRfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmNyZWF0ZUhlYXJ0YmVhdEAxOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTgwCiAgICAvLyBjcmVhdGVIZWFydGJlYXQoYWRkcmVzczogQWNjb3VudCwgYXNzZXQ6IHVpbnQ2NCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKY3JlYXRlSGVhcnRiZWF0X3Rlcm5hcnlfZmFsc2VAMTU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjYyNQogICAgLy8gY29uc3QgaW5kZXhUb01vZGlmeTogdWludDY0ID0gaSA9PT0gMyA/IDAgOiBpICsgMQogICAgZGlnIDIKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBiIGNyZWF0ZUhlYXJ0YmVhdF90ZXJuYXJ5X21lcmdlQDE2CgpjcmVhdGVIZWFydGJlYXRfYWZ0ZXJfaWZfZWxzZUAxNzoKICAgIHBvcAogICAgZGlnIDEKICAgIGJ1cnkgMwogICAgYiBjcmVhdGVIZWFydGJlYXRfd2hpbGVfdG9wQDEwCgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5jaGVja3BvaW50U29mdFN0YWtlW3JvdXRpbmddKCkgLT4gdm9pZDoKY2hlY2twb2ludFNvZnRTdGFrZToKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjYzOAogICAgLy8gY2hlY2twb2ludFNvZnRTdGFrZShhZGRyZXNzOiBBY2NvdW50LCBhc3NldDogdWludDY0KTogU3Rha2VDaGVjayB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXBuIDIKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2MzkKICAgIC8vIGNvbnN0IHNrOiBTdGFrZUtleSA9IHsgYWRkcmVzcywgYXNzZXQsIHR5cGU6IFNUQUtJTkdfVFlQRV9TT0ZUIH0KICAgIGl0b2IKICAgIGNvbmNhdAogICAgYnl0ZWMgNSAvLyAweDE0CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTA1CiAgICAvLyBzdGFrZXMgPSBCb3hNYXA8U3Rha2VLZXksIFN0YWtlPih7IGtleVByZWZpeDogU3Rha2luZ0JveFByZWZpeFN0YWtlcyB9KQogICAgYnl0ZWNfMCAvLyAicyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjY0MAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc3Rha2VzKHNrKS5leGlzdHMsIGVyclN0YWtlRG9lc250RXhpc3QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBjaGVja3BvaW50U29mdFN0YWtlX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAxMyAvLyAiRVJSOmVyclNuZXgiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyU25leAoKY2hlY2twb2ludFNvZnRTdGFrZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NjQyCiAgICAvLyBjb25zdCB7IGJhbGFuY2UsIG9wdGVkSW4gfSA9IHRoaXMuZ2V0SGVsZChhZGRyZXNzLCBhc3NldCkKICAgIGNhbGxzdWIgZ2V0SGVsZAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIHB1c2hpbnQgNjQKICAgIGdldGJpdAogICAgZHVwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjY0MwogICAgLy8gY29uc3QgaW5mbyA9IGNsb25lKHRoaXMuc3Rha2VzKHNrKS52YWx1ZSkKICAgIGRpZyAzCiAgICBib3hfZ2V0CiAgICBzd2FwCiAgICBidXJ5IDYKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjY0NAogICAgLy8gY29uc3QgdmFsaWQgPSBvcHRlZEluICYmIGJhbGFuY2UgPj0gaW5mby5hbW91bnQKICAgIGJ6IGNoZWNrcG9pbnRTb2Z0U3Rha2VfYm9vbF9mYWxzZUA2CiAgICBkaWcgMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBkaWcgMQogICAgPD0KICAgIGJ6IGNoZWNrcG9pbnRTb2Z0U3Rha2VfYm9vbF9mYWxzZUA2CiAgICBpbnRjXzEgLy8gMQoKY2hlY2twb2ludFNvZnRTdGFrZV9ib29sX21lcmdlQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjY0NQogICAgLy8gaWYgKCF2YWxpZCkgewogICAgZHVwCiAgICBibnogY2hlY2twb2ludFNvZnRTdGFrZV9hZnRlcl9pZl9lbHNlQDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NjQ2CiAgICAvLyB0aGlzLnN0YWtlcyhzaykudmFsdWUgPSB0aGlzLmNoZWNrcG9pbnRTdGFrZShpbmZvLCBvcHRlZEluID8gYmFsYW5jZSA6IDApCiAgICBpbnRjXzAgLy8gMAogICAgZGlnIDIKICAgIGRpZyA0CiAgICBzZWxlY3QKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxOTQKICAgIC8vIGlmIChiYWxhbmNlID49IGluZm8uYW1vdW50KSB7CiAgICBkaWcgNgogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICA+PQogICAgYnogY2hlY2twb2ludFNvZnRTdGFrZV9hZnRlcl9pZl9lbHNlQDEyCiAgICBwb3AKICAgIGRpZyA0CgpjaGVja3BvaW50U29mdFN0YWtlX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5jaGVja3BvaW50U3Rha2VAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjY0NgogICAgLy8gdGhpcy5zdGFrZXMoc2spLnZhbHVlID0gdGhpcy5jaGVja3BvaW50U3Rha2UoaW5mbywgb3B0ZWRJbiA/IGJhbGFuY2UgOiAwKQogICAgZGlnIDQKICAgIHN3YXAKICAgIGJveF9wdXQKCmNoZWNrcG9pbnRTb2Z0U3Rha2VfYWZ0ZXJfaWZfZWxzZUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2NDkKICAgIC8vIHJldHVybiB7IHZhbGlkLCBiYWxhbmNlOiBvcHRlZEluID8gYmFsYW5jZSA6IDAgfQogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMgogICAgdW5jb3ZlciAzCiAgICBzZWxlY3QKICAgIGJ5dGVjIDExIC8vIDB4MDAKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDMKICAgIHNldGJpdAogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjYzOAogICAgLy8gY2hlY2twb2ludFNvZnRTdGFrZShhZGRyZXNzOiBBY2NvdW50LCBhc3NldDogdWludDY0KTogU3Rha2VDaGVjayB7CiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpjaGVja3BvaW50U29mdFN0YWtlX2FmdGVyX2lmX2Vsc2VAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjIwMAogICAgLy8gbGFzdFVwZGF0ZTogR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MjAxCiAgICAvLyBleHBpcmF0aW9uOiBpbmZvLmV4cGlyYXRpb24sCiAgICBkaWcgNgogICAgZXh0cmFjdCAxNiA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjE5OC0yMDMKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIGFtb3VudDogYmFsYW5jZSwKICAgIC8vICAgbGFzdFVwZGF0ZTogR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIC8vICAgZXhwaXJhdGlvbjogaW5mby5leHBpcmF0aW9uLAogICAgLy8gICB3ZWlnaHRlZEFnZTogMCwKICAgIC8vIH0KICAgIHVuY292ZXIgMgogICAgaXRvYgogICAgdW5jb3ZlciAyCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoyMDIKICAgIC8vIHdlaWdodGVkQWdlOiAwLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTk4LTIwMwogICAgLy8gcmV0dXJuIHsKICAgIC8vICAgYW1vdW50OiBiYWxhbmNlLAogICAgLy8gICBsYXN0VXBkYXRlOiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgLy8gICBleHBpcmF0aW9uOiBpbmZvLmV4cGlyYXRpb24sCiAgICAvLyAgIHdlaWdodGVkQWdlOiAwLAogICAgLy8gfQogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjY0NgogICAgLy8gdGhpcy5zdGFrZXMoc2spLnZhbHVlID0gdGhpcy5jaGVja3BvaW50U3Rha2UoaW5mbywgb3B0ZWRJbiA/IGJhbGFuY2UgOiAwKQogICAgYiBjaGVja3BvaW50U29mdFN0YWtlX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5jaGVja3BvaW50U3Rha2VAMTMKCmNoZWNrcG9pbnRTb2Z0U3Rha2VfYm9vbF9mYWxzZUA2OgogICAgaW50Y18wIC8vIDAKICAgIGIgY2hlY2twb2ludFNvZnRTdGFrZV9ib29sX21lcmdlQDcKCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmNvbW1pdEFwcFNvZnRTdGFrZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNvbW1pdEFwcFNvZnRTdGFrZToKICAgIGludGNfMCAvLyAwCiAgICBwdXNoYnl0ZXMgIiIKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2NTYtNjYyCiAgICAvLyBjb21taXRBcHBTb2Z0U3Rha2UoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgYWRkcmVzczogQWNjb3VudCwKICAgIC8vICAgYXNzZXQ6IHVpbnQ2NCwKICAgIC8vICAgYW1vdW50OiB1aW50NjQsCiAgICAvLyAgIGluaGVyaXRSb290OiBib29sZWFuCiAgICAvLyApOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18xIC8vIDEKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuYm9vbAogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2NjMKICAgIC8vIGxvZ2dlZEFzc2VydChHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25JZCAhPT0gMCwgZXJyQXBwQ2FsbFJlcXVpcmVkKQogICAgZ2xvYmFsIENhbGxlckFwcGxpY2F0aW9uSUQKICAgIGJueiBjb21taXRBcHBTb2Z0U3Rha2VfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDI1IC8vICJFUlI6ZXJyQWNycSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJBY3JxCgpjb21taXRBcHBTb2Z0U3Rha2VfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjY2NAogICAgLy8gY29uc3QgYXBwID0gR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uSWQKICAgIGdsb2JhbCBDYWxsZXJBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjY2NQogICAgLy8gY29uc3Qga2V5OiBBcHBTdGFrZUtleSA9IHsgYXBwLCBhZGRyZXNzLCBhc3NldCB9CiAgICBpdG9iCiAgICBkaWcgNQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBjb25jYXQKICAgIHVuY292ZXIgNQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBpdG9iCiAgICBkdXAKICAgIGJ1cnkgMTEKICAgIGNvbmNhdAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2NjYKICAgIC8vIGNvbnN0IHsgYmFsYW5jZSwgb3B0ZWRJbiB9ID0gdGhpcy5nZXRIZWxkKGFkZHJlc3MsIGFzc2V0KQogICAgY2FsbHN1YiBnZXRIZWxkCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYnVyeSA4CiAgICBwdXNoaW50IDY0CiAgICBnZXRiaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NjY3CiAgICAvLyBsb2dnZWRBc3NlcnQob3B0ZWRJbiwgZXJyTm90T3B0ZWRJbikKICAgIGJueiBjb21taXRBcHBTb2Z0U3Rha2VfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjIDE4IC8vICJFUlI6ZXJyTm9wdCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOb3B0Cgpjb21taXRBcHBTb2Z0U3Rha2VfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwOQogICAgLy8gYXBwU3Rha2VzID0gQm94TWFwPEFwcFN0YWtlS2V5LCBBcHBTdGFrZT4oeyBrZXlQcmVmaXg6IFN0YWtpbmdCb3hQcmVmaXhBcHBTdGFrZXMgfSkKICAgIGJ5dGVjIDE0IC8vICJhIgogICAgdW5jb3ZlciAyCiAgICBjb25jYXQKICAgIGR1cAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2NjkKICAgIC8vIGNvbnN0IGNvc3Q6IHVpbnQ2NCA9IHRoaXMuYXBwU3Rha2VzKGtleSkuZXhpc3RzID8gMCA6IHRoaXMubWJyKCkuYXBwU3Rha2VzCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGNvbW1pdEFwcFNvZnRTdGFrZV90ZXJuYXJ5X2ZhbHNlQDcKICAgIGludGNfMCAvLyAwCiAgICBzd2FwCgpjb21taXRBcHBTb2Z0U3Rha2VfdGVybmFyeV9tZXJnZUA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2NzAKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJySW52YWxpZFBheW1lbnQpCiAgICBkaWcgNAogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IGNvbW1pdEFwcFNvZnRTdGFrZV9hZnRlcl9hc3NlcnRAMTAKICAgIGJ5dGVjXzMgLy8gIkVSUjplcnJJcGF5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwYXkKCmNvbW1pdEFwcFNvZnRTdGFrZV9hZnRlcl9hc3NlcnRAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjY3MQogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSBjb3N0LCBlcnJJbnZhbGlkUGF5bWVudCkKICAgIHVuY292ZXIgNAogICAgZ3R4bnMgQW1vdW50CiAgICB1bmNvdmVyIDIKICAgID09CiAgICBibnogY29tbWl0QXBwU29mdFN0YWtlX2FmdGVyX2Fzc2VydEAxMgogICAgYnl0ZWNfMyAvLyAiRVJSOmVycklwYXkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBheQoKY29tbWl0QXBwU29mdFN0YWtlX2FmdGVyX2Fzc2VydEAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NjczCiAgICAvLyBpZiAoIXRoaXMuYXBwU3Rha2VzKGtleSkuZXhpc3RzKSB7CiAgICBkaWcgMgogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogY29tbWl0QXBwU29mdFN0YWtlX2FmdGVyX2lmX2Vsc2VAMjYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6Njc0CiAgICAvLyBsb2dnZWRBc3NlcnQoYmFsYW5jZSA+PSBhbW91bnQsIGVyckluc3VmZmljaWVudEJhbGFuY2UpCiAgICBkaWcgNQogICAgZGlnIDIKICAgID49CiAgICBibnogY29tbWl0QXBwU29mdFN0YWtlX2FmdGVyX2Fzc2VydEAxNQogICAgYnl0ZWMgMTIgLy8gIkVSUjplcnJJYmFsIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckliYWwKCmNvbW1pdEFwcFNvZnRTdGFrZV9hZnRlcl9hc3NlcnRAMTU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjY3NgogICAgLy8gbGV0IGluaGVyaXRlZEFnZTogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6Njc3CiAgICAvLyBpZiAoaW5oZXJpdFJvb3QpIHsKICAgIHN3YXAKICAgIGJ6IGNvbW1pdEFwcFNvZnRTdGFrZV9hZnRlcl9pZl9lbHNlQDI1CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6Njc4CiAgICAvLyBjb25zdCByb290S2V5OiBTdGFrZUtleSA9IHsgYWRkcmVzcywgYXNzZXQsIHR5cGU6IFNUQUtJTkdfVFlQRV9TT0ZUIH0KICAgIGRpZyAyCiAgICBkaWcgNgogICAgY29uY2F0CiAgICBieXRlYyA1IC8vIDB4MTQKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDUKICAgIC8vIHN0YWtlcyA9IEJveE1hcDxTdGFrZUtleSwgU3Rha2U+KHsga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4U3Rha2VzIH0pCiAgICBieXRlY18wIC8vICJzIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6Njc5CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zdGFrZXMocm9vdEtleSkuZXhpc3RzLCBlcnJTdGFrZURvZXNudEV4aXN0KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogY29tbWl0QXBwU29mdFN0YWtlX2FmdGVyX2Fzc2VydEAxOAogICAgYnl0ZWMgMTMgLy8gIkVSUjplcnJTbmV4IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclNuZXgKCmNvbW1pdEFwcFNvZnRTdGFrZV9hZnRlcl9hc3NlcnRAMTg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjY4MAogICAgLy8gY29uc3Qgcm9vdCA9IGNsb25lKHRoaXMuc3Rha2VzKHJvb3RLZXkpLnZhbHVlKQogICAgYm94X2dldAogICAgc3dhcAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjY4MQogICAgLy8gbG9nZ2VkQXNzZXJ0KGJhbGFuY2UgPj0gcm9vdC5hbW91bnQgJiYgYW1vdW50IDw9IHJvb3QuYW1vdW50LCBlcnJJbnN1ZmZpY2llbnRCYWxhbmNlKQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGJ1cnkgNgogICAgZGlnIDYKICAgIDw9CiAgICBieiBjb21taXRBcHBTb2Z0U3Rha2VfYm9vbF9mYWxzZUAyMQogICAgZGlnIDEKICAgIGRpZyA1CiAgICA8PQogICAgYnogY29tbWl0QXBwU29mdFN0YWtlX2Jvb2xfZmFsc2VAMjEKICAgIGludGNfMSAvLyAxCgpjb21taXRBcHBTb2Z0U3Rha2VfYm9vbF9tZXJnZUAyMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NjgxCiAgICAvLyBsb2dnZWRBc3NlcnQoYmFsYW5jZSA+PSByb290LmFtb3VudCAmJiBhbW91bnQgPD0gcm9vdC5hbW91bnQsIGVyckluc3VmZmljaWVudEJhbGFuY2UpCiAgICBibnogY29tbWl0QXBwU29mdFN0YWtlX2FmdGVyX2Fzc2VydEAyNAogICAgYnl0ZWMgMTIgLy8gIkVSUjplcnJJYmFsIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckliYWwKCmNvbW1pdEFwcFNvZnRTdGFrZV9hZnRlcl9hc3NlcnRAMjQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjY4MgogICAgLy8gaW5oZXJpdGVkQWdlID0gdGhpcy5nZXRXZWlnaHRlZEFnZShyb290KQogICAgY2FsbHN1YiBnZXRXZWlnaHRlZEFnZQogICAgcG9wCgpjb21taXRBcHBTb2Z0U3Rha2VfYWZ0ZXJfaWZfZWxzZUAyNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6Njg3CiAgICAvLyBsYXN0VXBkYXRlOiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2ODUtNjkwCiAgICAvLyB0aGlzLmFwcFN0YWtlcyhrZXkpLnZhbHVlID0gewogICAgLy8gICBhbW91bnQsCiAgICAvLyAgIGxhc3RVcGRhdGU6IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICAvLyAgIHdlaWdodGVkQWdlOiBpbmhlcml0ZWRBZ2UsCiAgICAvLyAgIGluaGVyaXRlZEFnZSwKICAgIC8vIH0KICAgIHVuY292ZXIgMgogICAgaXRvYgogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICBzd2FwCiAgICBpdG9iCiAgICBzd2FwCiAgICBkaWcgMQogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJveF9wdXQKCmNvbW1pdEFwcFNvZnRTdGFrZV9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuY29tbWl0QXBwU29mdFN0YWtlQDI5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2NTYtNjYyCiAgICAvLyBjb21taXRBcHBTb2Z0U3Rha2UoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgYWRkcmVzczogQWNjb3VudCwKICAgIC8vICAgYXNzZXQ6IHVpbnQ2NCwKICAgIC8vICAgYW1vdW50OiB1aW50NjQsCiAgICAvLyAgIGluaGVyaXRSb290OiBib29sZWFuCiAgICAvLyApOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmNvbW1pdEFwcFNvZnRTdGFrZV9ib29sX2ZhbHNlQDIxOgogICAgaW50Y18wIC8vIDAKICAgIGIgY29tbWl0QXBwU29mdFN0YWtlX2Jvb2xfbWVyZ2VAMjIKCmNvbW1pdEFwcFNvZnRTdGFrZV9hZnRlcl9pZl9lbHNlQDI2OgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjY5NAogICAgLy8gY29uc3QgY3VycmVudCA9IGNsb25lKHRoaXMuYXBwU3Rha2VzKGtleSkudmFsdWUpCiAgICBkaWcgMQogICAgYm94X2dldAogICAgc3dhcAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjY5NQogICAgLy8gY29uc3QgbmV3QW1vdW50OiB1aW50NjQgPSBjdXJyZW50LmFtb3VudCArIGFtb3VudAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICB1bmNvdmVyIDIKICAgICsKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2OTYKICAgIC8vIGxvZ2dlZEFzc2VydChiYWxhbmNlID49IG5ld0Ftb3VudCwgZXJySW5zdWZmaWNpZW50QmFsYW5jZSkKICAgIGRpZyA2CiAgICA8PQogICAgYm56IGNvbW1pdEFwcFNvZnRTdGFrZV9hZnRlcl9hc3NlcnRAMjgKICAgIGJ5dGVjIDEyIC8vICJFUlI6ZXJySWJhbCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJYmFsCgpjb21taXRBcHBTb2Z0U3Rha2VfYWZ0ZXJfYXNzZXJ0QDI4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxNzUKICAgIC8vIGNvbnN0IGN1cnJlbnRBZ2U6IHVpbnQ2NCA9IHRoaXMuZ2V0QXBwV2VpZ2h0ZWRBZ2UoaW5mbywgdHJ1ZSkKICAgIHN3YXAKICAgIGludGNfMSAvLyAxCiAgICBjYWxsc3ViIGdldEFwcFdlaWdodGVkQWdlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjE3OAogICAgLy8gbGFzdFVwZGF0ZTogR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTc5CiAgICAvLyB3ZWlnaHRlZEFnZTogb3AuZGl2dyguLi5vcC5tdWx3KGN1cnJlbnRBZ2UsIGluZm8uYW1vdW50KSwgbmV3QW1vdW50KSwKICAgIGRpZyAxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIHVuY292ZXIgMwogICAgZGlnIDEKICAgIG11bHcKICAgIHVuY292ZXIgNQogICAgZHVwCiAgICBjb3ZlciA1CiAgICBkaXZ3CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjE4MAogICAgLy8gaW5oZXJpdGVkQWdlOiBvcC5kaXZ3KC4uLm9wLm11bHcoaW5mby5pbmhlcml0ZWRBZ2UsIGluZm8uYW1vdW50KSwgbmV3QW1vdW50KSwKICAgIHVuY292ZXIgNAogICAgcHVzaGludCAyNAogICAgZXh0cmFjdF91aW50NjQKICAgIHVuY292ZXIgMgogICAgbXVsdwogICAgZGlnIDQKICAgIGRpdncKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTc2LTE4MQogICAgLy8gcmV0dXJuIHsKICAgIC8vICAgYW1vdW50OiBuZXdBbW91bnQsCiAgICAvLyAgIGxhc3RVcGRhdGU6IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICAvLyAgIHdlaWdodGVkQWdlOiBvcC5kaXZ3KC4uLm9wLm11bHcoY3VycmVudEFnZSwgaW5mby5hbW91bnQpLCBuZXdBbW91bnQpLAogICAgLy8gICBpbmhlcml0ZWRBZ2U6IG9wLmRpdncoLi4ub3AubXVsdyhpbmZvLmluaGVyaXRlZEFnZSwgaW5mby5hbW91bnQpLCBuZXdBbW91bnQpLAogICAgLy8gfQogICAgdW5jb3ZlciAzCiAgICBpdG9iCiAgICB1bmNvdmVyIDMKICAgIGl0b2IKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2OTcKICAgIC8vIHRoaXMuYXBwU3Rha2VzKGtleSkudmFsdWUgPSB0aGlzLmNhbGN1bGF0ZVVwZGF0ZWRBcHBTdGFrZShjdXJyZW50LCBuZXdBbW91bnQpCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjY1Ni02NjIKICAgIC8vIGNvbW1pdEFwcFNvZnRTdGFrZSgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBhZGRyZXNzOiBBY2NvdW50LAogICAgLy8gICBhc3NldDogdWludDY0LAogICAgLy8gICBhbW91bnQ6IHVpbnQ2NCwKICAgIC8vICAgaW5oZXJpdFJvb3Q6IGJvb2xlYW4KICAgIC8vICk6IHZvaWQgewogICAgYiBjb21taXRBcHBTb2Z0U3Rha2VfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmNvbW1pdEFwcFNvZnRTdGFrZUAyOQoKY29tbWl0QXBwU29mdFN0YWtlX3Rlcm5hcnlfZmFsc2VANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NjY5CiAgICAvLyBjb25zdCBjb3N0OiB1aW50NjQgPSB0aGlzLmFwcFN0YWtlcyhrZXkpLmV4aXN0cyA/IDAgOiB0aGlzLm1icigpLmFwcFN0YWtlcwogICAgaW50YyA2IC8vIDM0OTAwCiAgICBzd2FwCiAgICBiIGNvbW1pdEFwcFNvZnRTdGFrZV90ZXJuYXJ5X21lcmdlQDgKCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmNoZWNrcG9pbnRBcHBTb2Z0U3Rha2Vbcm91dGluZ10oKSAtPiB2b2lkOgpjaGVja3BvaW50QXBwU29mdFN0YWtlOgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NzA4CiAgICAvLyBjaGVja3BvaW50QXBwU29mdFN0YWtlKGFwcDogdWludDY0LCBhZGRyZXNzOiBBY2NvdW50LCBhc3NldDogdWludDY0KTogU3Rha2VDaGVjayB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3MDkKICAgIC8vIGNvbnN0IGtleTogQXBwU3Rha2VLZXkgPSB7IGFwcCwgYWRkcmVzcywgYXNzZXQgfQogICAgdW5jb3ZlciAyCiAgICBpdG9iCiAgICBkaWcgMgogICAgY29uY2F0CiAgICBkaWcgMQogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjcxMAogICAgLy8gY29uc3QgeyBiYWxhbmNlLCBvcHRlZEluIH0gPSB0aGlzLmdldEhlbGQoYWRkcmVzcywgYXNzZXQpCiAgICBjb3ZlciAyCiAgICBjYWxsc3ViIGdldEhlbGQKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGNvdmVyIDMKICAgIHB1c2hpbnQgNjQKICAgIGdldGJpdAogICAgZHVwCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjcxMQogICAgLy8gY29uc3QgaGVsZDogdWludDY0ID0gb3B0ZWRJbiA/IGJhbGFuY2UgOiAwCiAgICBpbnRjXzAgLy8gMAogICAgY292ZXIgMgogICAgc2VsZWN0CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwOQogICAgLy8gYXBwU3Rha2VzID0gQm94TWFwPEFwcFN0YWtlS2V5LCBBcHBTdGFrZT4oeyBrZXlQcmVmaXg6IFN0YWtpbmdCb3hQcmVmaXhBcHBTdGFrZXMgfSkKICAgIGJ5dGVjIDE0IC8vICJhIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NzEyCiAgICAvLyBpZiAoIXRoaXMuYXBwU3Rha2VzKGtleSkuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBjaGVja3BvaW50QXBwU29mdFN0YWtlX2FmdGVyX2lmX2Vsc2VAMwogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjcxMwogICAgLy8gcmV0dXJuIHsgdmFsaWQ6IGZhbHNlLCBiYWxhbmNlOiBoZWxkIH0KICAgIGl0b2IKICAgIGJ5dGVjIDExIC8vIDB4MDAKICAgIHN3YXAKICAgIGNvbmNhdAoKY2hlY2twb2ludEFwcFNvZnRTdGFrZV9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuY2hlY2twb2ludEFwcFNvZnRTdGFrZUAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NzA4CiAgICAvLyBjaGVja3BvaW50QXBwU29mdFN0YWtlKGFwcDogdWludDY0LCBhZGRyZXNzOiBBY2NvdW50LCBhc3NldDogdWludDY0KTogU3Rha2VDaGVjayB7CiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpjaGVja3BvaW50QXBwU29mdFN0YWtlX2FmdGVyX2lmX2Vsc2VAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NzE2CiAgICAvLyBjb25zdCBpbmZvID0gY2xvbmUodGhpcy5hcHBTdGFrZXMoa2V5KS52YWx1ZSkKICAgIGRpZyAyCiAgICBib3hfZ2V0CiAgICBzd2FwCiAgICBidXJ5IDcKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjcxNwogICAgLy8gY29uc3QgdmFsaWQgPSBvcHRlZEluICYmIGJhbGFuY2UgPj0gaW5mby5hbW91bnQKICAgIHN3YXAKICAgIGJ6IGNoZWNrcG9pbnRBcHBTb2Z0U3Rha2VfYm9vbF9mYWxzZUA2CiAgICBkaWcgNAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBkaWcgMwogICAgPD0KICAgIGJ6IGNoZWNrcG9pbnRBcHBTb2Z0U3Rha2VfYm9vbF9mYWxzZUA2CiAgICBpbnRjXzEgLy8gMQoKY2hlY2twb2ludEFwcFNvZnRTdGFrZV9ib29sX21lcmdlQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjcxOAogICAgLy8gaWYgKCF2YWxpZCkgewogICAgZHVwCiAgICBibnogY2hlY2twb2ludEFwcFNvZnRTdGFrZV9hZnRlcl9pZl9lbHNlQDEyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjcxOQogICAgLy8gY29uc3QgYW1vdW50OiB1aW50NjQgPSBHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25JZCA9PT0gYXBwID8gaGVsZCA6IGluZm8uYW1vdW50CiAgICBnbG9iYWwgQ2FsbGVyQXBwbGljYXRpb25JRAogICAgZGlnIDUKICAgID09CiAgICBieiBjaGVja3BvaW50QXBwU29mdFN0YWtlX3Rlcm5hcnlfZmFsc2VAMTAKICAgIGRpZyAxCgpjaGVja3BvaW50QXBwU29mdFN0YWtlX3Rlcm5hcnlfbWVyZ2VAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjcyMgogICAgLy8gbGFzdFVwZGF0ZTogR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NzIwLTcyNQogICAgLy8gdGhpcy5hcHBTdGFrZXMoa2V5KS52YWx1ZSA9IHsKICAgIC8vICAgYW1vdW50LAogICAgLy8gICBsYXN0VXBkYXRlOiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgLy8gICB3ZWlnaHRlZEFnZTogMCwKICAgIC8vICAgaW5oZXJpdGVkQWdlOiAwLAogICAgLy8gfQogICAgc3dhcAogICAgaXRvYgogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjcyMwogICAgLy8gd2VpZ2h0ZWRBZ2U6IDAsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3MjAtNzI1CiAgICAvLyB0aGlzLmFwcFN0YWtlcyhrZXkpLnZhbHVlID0gewogICAgLy8gICBhbW91bnQsCiAgICAvLyAgIGxhc3RVcGRhdGU6IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICAvLyAgIHdlaWdodGVkQWdlOiAwLAogICAgLy8gICBpbmhlcml0ZWRBZ2U6IDAsCiAgICAvLyB9CiAgICBpdG9iCiAgICBzd2FwCiAgICBkaWcgMQogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGRpZyAzCiAgICBzd2FwCiAgICBib3hfcHV0CgpjaGVja3BvaW50QXBwU29mdFN0YWtlX2FmdGVyX2lmX2Vsc2VAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjcyNwogICAgLy8gcmV0dXJuIHsgdmFsaWQsIGJhbGFuY2U6IGhlbGQgfQogICAgYnl0ZWMgMTEgLy8gMHgwMAogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMgogICAgc2V0Yml0CiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NzA4CiAgICAvLyBjaGVja3BvaW50QXBwU29mdFN0YWtlKGFwcDogdWludDY0LCBhZGRyZXNzOiBBY2NvdW50LCBhc3NldDogdWludDY0KTogU3Rha2VDaGVjayB7CiAgICBiIGNoZWNrcG9pbnRBcHBTb2Z0U3Rha2VfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmNoZWNrcG9pbnRBcHBTb2Z0U3Rha2VAMTMKCmNoZWNrcG9pbnRBcHBTb2Z0U3Rha2VfdGVybmFyeV9mYWxzZUAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NzE5CiAgICAvLyBjb25zdCBhbW91bnQ6IHVpbnQ2NCA9IEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbklkID09PSBhcHAgPyBoZWxkIDogaW5mby5hbW91bnQKICAgIGRpZyA1CiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGIgY2hlY2twb2ludEFwcFNvZnRTdGFrZV90ZXJuYXJ5X21lcmdlQDExCgpjaGVja3BvaW50QXBwU29mdFN0YWtlX2Jvb2xfZmFsc2VANjoKICAgIGludGNfMCAvLyAwCiAgICBiIGNoZWNrcG9pbnRBcHBTb2Z0U3Rha2VfYm9vbF9tZXJnZUA3CgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy51cGRhdGVTZXR0aW5nc1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZVNldHRpbmdzOgogICAgcHVzaGJ5dGVzICIiCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NzM4CiAgICAvLyB1cGRhdGVTZXR0aW5ncyhwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGFzc2V0OiB1aW50NjQsIHZhbHVlOiB1aW50NjQpOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoyNDkKICAgIC8vIGNvbnN0IFtieXRlcywgZXhpc3RzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBc3NldHMpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjIDYgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MjQ5CiAgICAvLyBjb25zdCBbYnl0ZXMsIGV4aXN0c10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXNzZXRzKSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBwdXNoYnl0ZXMgImFraXRhX2Fzc2V0cyIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjI1MAogICAgLy8gaWYgKCFleGlzdHMpIHsKICAgIGJueiB1cGRhdGVTZXR0aW5nc19hZnRlcl9pZl9lbHNlQDMxCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MjUxCiAgICAvLyByZXR1cm4geyBha3RhOiAwLCBib25lczogMCB9CiAgICBieXRlYyAzNiAvLyAweDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwCgp1cGRhdGVTZXR0aW5nc19hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuZ292ZXJuYW5jZUFzc2V0c0AzMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NzM5CiAgICAvLyBjb25zdCB7IGFrdGEsIGJvbmVzIH0gPSB0aGlzLmdvdmVybmFuY2VBc3NldHMoKQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGJ1cnkgNgogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBidXJ5IDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NzQwCiAgICAvLyBpZiAoYXNzZXQgIT09IDAgJiYgKGFzc2V0ID09PSBha3RhIHx8IGFzc2V0ID09PSBib25lcykpIHsKICAgIGRpZyAxCiAgICBieiB1cGRhdGVTZXR0aW5nc19lbHNlX2JvZHlANwogICAgZGlnIDEKICAgIGRpZyA1CiAgICA9PQogICAgYm56IHVwZGF0ZVNldHRpbmdzX2lmX2JvZHlANAogICAgZGlnIDEKICAgIGRpZyA0CiAgICA9PQogICAgYnogdXBkYXRlU2V0dGluZ3NfZWxzZV9ib2R5QDcKCnVwZGF0ZVNldHRpbmdzX2lmX2JvZHlANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NzQxCiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIGVyck5vdEFraXRhRGFvKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlYyA2IC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjIDE5IC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjc0MQogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogdXBkYXRlU2V0dGluZ3NfYWZ0ZXJfaWZfZWxzZUAxMAogICAgYnl0ZWMgMjAgLy8gIkVSUjplcnJOZGFvIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5kYW8KCnVwZGF0ZVNldHRpbmdzX2FmdGVyX2lmX2Vsc2VAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjc0NgogICAgLy8gbG9nZ2VkQXNzZXJ0KHZhbHVlID49IE1JTl9NQVhfTE9DS1VQICYmIHZhbHVlIDw9IE1BWF9NQVhfTE9DS1VQLCBlcnJJbnZhbGlkTG9ja3VwU2V0dGluZykKICAgIGR1cAogICAgcHVzaGludCAxMjA5NjAwCiAgICA+PQogICAgYnogdXBkYXRlU2V0dGluZ3NfYm9vbF9mYWxzZUAxMwogICAgZHVwCiAgICBwdXNoaW50IDEyNjE0NDAwMAogICAgPD0KICAgIGJ6IHVwZGF0ZVNldHRpbmdzX2Jvb2xfZmFsc2VAMTMKICAgIGludGNfMSAvLyAxCgp1cGRhdGVTZXR0aW5nc19ib29sX21lcmdlQDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3NDYKICAgIC8vIGxvZ2dlZEFzc2VydCh2YWx1ZSA+PSBNSU5fTUFYX0xPQ0tVUCAmJiB2YWx1ZSA8PSBNQVhfTUFYX0xPQ0tVUCwgZXJySW52YWxpZExvY2t1cFNldHRpbmcpCiAgICBibnogdXBkYXRlU2V0dGluZ3NfYWZ0ZXJfYXNzZXJ0QDE2CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJJbGtzIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklsa3MKCnVwZGF0ZVNldHRpbmdzX2FmdGVyX2Fzc2VydEAxNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NzQ3CiAgICAvLyBjb25zdCBjdXJyZW50OiB1aW50NjQgPSB0aGlzLnNldHRpbmdzKGFzc2V0KS5leGlzdHMgPyB0aGlzLnNldHRpbmdzKGFzc2V0KS52YWx1ZSA6IE9ORV9ZRUFSCiAgICBkaWcgMQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMTgKICAgIC8vIHNldHRpbmdzID0gQm94TWFwPHVpbnQ2NCwgdWludDY0Pih7IGtleVByZWZpeDogU3Rha2luZ0JveFByZWZpeFNldHRpbmdzIH0pCiAgICBieXRlYyAyMiAvLyAiZSIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjc0NwogICAgLy8gY29uc3QgY3VycmVudDogdWludDY0ID0gdGhpcy5zZXR0aW5ncyhhc3NldCkuZXhpc3RzID8gdGhpcy5zZXR0aW5ncyhhc3NldCkudmFsdWUgOiBPTkVfWUVBUgogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiB1cGRhdGVTZXR0aW5nc190ZXJuYXJ5X2ZhbHNlQDE4CiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBidG9pCgp1cGRhdGVTZXR0aW5nc190ZXJuYXJ5X21lcmdlQDE5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3NDgKICAgIC8vIGxvZ2dlZEFzc2VydCh2YWx1ZSA+PSBjdXJyZW50LCBlcnJMb2NrdXBEZWNyZWFzZSkKICAgIGRpZyAyCiAgICA8PQogICAgYm56IHVwZGF0ZVNldHRpbmdzX2FmdGVyX2Fzc2VydEAyMQogICAgcHVzaGJ5dGVzICJFUlI6ZXJyTGtkYyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJMa2RjCgp1cGRhdGVTZXR0aW5nc19hZnRlcl9hc3NlcnRAMjE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjc1MAogICAgLy8gYXNzZXJ0UGxhaW5QYXltZW50KHBheW1lbnQpCiAgICBkaWcgMwogICAgZHVwCiAgICBjYWxsc3ViIGFzc2VydFBsYWluUGF5bWVudAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3NTEKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJySW52YWxpZFBheW1lbnQpCiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogdXBkYXRlU2V0dGluZ3NfYWZ0ZXJfYXNzZXJ0QDIzCiAgICBieXRlY18zIC8vICJFUlI6ZXJySXBheSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcGF5Cgp1cGRhdGVTZXR0aW5nc19hZnRlcl9hc3NlcnRAMjM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjc1MwogICAgLy8gcGF5bWVudC5hbW91bnQgPT09ICh0aGlzLnNldHRpbmdzKGFzc2V0KS5leGlzdHMgPyAwIDogdGhpcy5tYnIoKS5zZXR0aW5ncyksCiAgICBkaWcgMwogICAgZ3R4bnMgQW1vdW50CiAgICBkaWcgMQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiB1cGRhdGVTZXR0aW5nc190ZXJuYXJ5X2ZhbHNlQDI1CiAgICBpbnRjXzAgLy8gMAoKdXBkYXRlU2V0dGluZ3NfdGVybmFyeV9tZXJnZUAyNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NzUzCiAgICAvLyBwYXltZW50LmFtb3VudCA9PT0gKHRoaXMuc2V0dGluZ3MoYXNzZXQpLmV4aXN0cyA/IDAgOiB0aGlzLm1icigpLnNldHRpbmdzKSwKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjc1Mi03NTUKICAgIC8vIGxvZ2dlZEFzc2VydCgKICAgIC8vICAgcGF5bWVudC5hbW91bnQgPT09ICh0aGlzLnNldHRpbmdzKGFzc2V0KS5leGlzdHMgPyAwIDogdGhpcy5tYnIoKS5zZXR0aW5ncyksCiAgICAvLyAgIGVyckludmFsaWRQYXltZW50CiAgICAvLyApCiAgICBibnogdXBkYXRlU2V0dGluZ3NfYWZ0ZXJfYXNzZXJ0QDI4CiAgICBieXRlY18zIC8vICJFUlI6ZXJySXBheSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcGF5Cgp1cGRhdGVTZXR0aW5nc19hZnRlcl9hc3NlcnRAMjg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjc1NwogICAgLy8gdGhpcy5zZXR0aW5ncyhhc3NldCkudmFsdWUgPSB2YWx1ZQogICAgZGlnIDEKICAgIGl0b2IKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NzM4CiAgICAvLyB1cGRhdGVTZXR0aW5ncyhwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGFzc2V0OiB1aW50NjQsIHZhbHVlOiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCnVwZGF0ZVNldHRpbmdzX3Rlcm5hcnlfZmFsc2VAMjU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjc1MwogICAgLy8gcGF5bWVudC5hbW91bnQgPT09ICh0aGlzLnNldHRpbmdzKGFzc2V0KS5leGlzdHMgPyAwIDogdGhpcy5tYnIoKS5zZXR0aW5ncyksCiAgICBwdXNoaW50IDkzMDAKICAgIGIgdXBkYXRlU2V0dGluZ3NfdGVybmFyeV9tZXJnZUAyNgoKdXBkYXRlU2V0dGluZ3NfdGVybmFyeV9mYWxzZUAxODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NzQ3CiAgICAvLyBjb25zdCBjdXJyZW50OiB1aW50NjQgPSB0aGlzLnNldHRpbmdzKGFzc2V0KS5leGlzdHMgPyB0aGlzLnNldHRpbmdzKGFzc2V0KS52YWx1ZSA6IE9ORV9ZRUFSCiAgICBpbnRjIDggLy8gMzE1MzYwMDAKICAgIGIgdXBkYXRlU2V0dGluZ3NfdGVybmFyeV9tZXJnZUAxOQoKdXBkYXRlU2V0dGluZ3NfYm9vbF9mYWxzZUAxMzoKICAgIGludGNfMCAvLyAwCiAgICBiIHVwZGF0ZVNldHRpbmdzX2Jvb2xfbWVyZ2VAMTQKCnVwZGF0ZVNldHRpbmdzX2Vsc2VfYm9keUA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3NDMKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSBBc3NldChhc3NldCkuY3JlYXRvciwgZXJyTm90QXNzZXRDcmVhdG9yKQogICAgdHhuIFNlbmRlcgogICAgZGlnIDIKICAgIGFzc2V0X3BhcmFtc19nZXQgQXNzZXRDcmVhdG9yCiAgICBhc3NlcnQgLy8gYXNzZXQgZXhpc3RzCiAgICA9PQogICAgYm56IHVwZGF0ZVNldHRpbmdzX2FmdGVyX2lmX2Vsc2VAMTAKICAgIHB1c2hieXRlcyAiRVJSOmVyck5hY3IiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmFjcgoKdXBkYXRlU2V0dGluZ3NfYWZ0ZXJfaWZfZWxzZUAzMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NzM5CiAgICAvLyBjb25zdCB7IGFrdGEsIGJvbmVzIH0gPSB0aGlzLmdvdmVybmFuY2VBc3NldHMoKQogICAgYiB1cGRhdGVTZXR0aW5nc19hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuZ292ZXJuYW5jZUFzc2V0c0AzMgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuc2V0SGVhcnRiZWF0TWFuYWdlcltyb3V0aW5nXSgpIC0+IHZvaWQ6CnNldEhlYXJ0YmVhdE1hbmFnZXI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjc2MQogICAgLy8gc2V0SGVhcnRiZWF0TWFuYWdlcihtYW5hZ2VyOiBBY2NvdW50KTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NzYyCiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIGVyck5vdEFraXRhRGFvKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlYyA2IC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjIDE5IC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjc2MgogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogc2V0SGVhcnRiZWF0TWFuYWdlcl9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMjAgLy8gIkVSUjplcnJOZGFvIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5kYW8KCnNldEhlYXJ0YmVhdE1hbmFnZXJfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwMAogICAgLy8gaGVhcnRiZWF0TWFuYWdlckFkZHJlc3MgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogU3Rha2luZ0dsb2JhbFN0YXRlS2V5SGVhcnRiZWF0TWFuYWdlckFkZHJlc3MgfSkKICAgIGJ5dGVjIDM1IC8vICJoZWFydGJlYXRfbWFuYWdlcl9hZGRyZXNzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3NjMKICAgIC8vIHRoaXMuaGVhcnRiZWF0TWFuYWdlckFkZHJlc3MudmFsdWUgPSBtYW5hZ2VyCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3NjEKICAgIC8vIHNldEhlYXJ0YmVhdE1hbmFnZXIobWFuYWdlcjogQWNjb3VudCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuY2xvc2VTb2Z0U3Rha2Vbcm91dGluZ10oKSAtPiB2b2lkOgpjbG9zZVNvZnRTdGFrZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NzY3CiAgICAvLyBjbG9zZVNvZnRTdGFrZShhc3NldDogdWludDY0KTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjc2OAogICAgLy8gY29uc3Qgc2s6IFN0YWtlS2V5ID0geyBhZGRyZXNzOiBUeG4uc2VuZGVyLCBhc3NldCwgdHlwZTogU1RBS0lOR19UWVBFX1NPRlQgfQogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICBieXRlYyA1IC8vIDB4MTQKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDUKICAgIC8vIHN0YWtlcyA9IEJveE1hcDxTdGFrZUtleSwgU3Rha2U+KHsga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4U3Rha2VzIH0pCiAgICBieXRlY18wIC8vICJzIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NzY5CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zdGFrZXMoc2spLmV4aXN0cywgZXJyU3Rha2VEb2VzbnRFeGlzdCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGNsb3NlU29mdFN0YWtlX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAxMyAvLyAiRVJSOmVyclNuZXgiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyU25leAoKY2xvc2VTb2Z0U3Rha2VfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjc3MAogICAgLy8gdGhpcy5zdGFrZXMoc2spLmRlbGV0ZSgpCiAgICBkdXAKICAgIGJveF9kZWwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3NzIKICAgIC8vIGNvbnN0IFtyZWNlaXZlciwgcmVmdW5kXSA9IHJlbGVhc2VEZXBvc2l0KHRoaXMuc3Rha2VzKHNrKS5rZXksIFR4bi5zZW5kZXIsIFN0YWtlc01CUikKICAgIHR4biBTZW5kZXIKICAgIGludGMgNCAvLyAzMjEwMAogICAgY2FsbHN1YiByZWxlYXNlRGVwb3NpdAogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIHN3YXAKICAgIGludGNfMyAvLyAzMgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NzczCiAgICAvLyBpdHhuLnBheW1lbnQoeyByZWNlaXZlciwgYW1vdW50OiByZWZ1bmQgfSkuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3NjcKICAgIC8vIGNsb3NlU29mdFN0YWtlKGFzc2V0OiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmNsb3NlSGVhcnRiZWF0W3JvdXRpbmddKCkgLT4gdm9pZDoKY2xvc2VIZWFydGJlYXQ6CiAgICBpbnRjXzAgLy8gMAogICAgcHVzaGJ5dGVzICIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjc3NwogICAgLy8gY2xvc2VIZWFydGJlYXQoYXNzZXQ6IHVpbnQ2NCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3NzgKICAgIC8vIGNvbnN0IHNrOiBTdGFrZUtleSA9IHsgYWRkcmVzczogVHhuLnNlbmRlciwgYXNzZXQsIHR5cGU6IFNUQUtJTkdfVFlQRV9IRUFSVEJFQVQgfQogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgaXRvYgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBjb25jYXQKICAgIGJ5dGVjIDggLy8gMHgwYQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwNQogICAgLy8gc3Rha2VzID0gQm94TWFwPFN0YWtlS2V5LCBTdGFrZT4oeyBrZXlQcmVmaXg6IFN0YWtpbmdCb3hQcmVmaXhTdGFrZXMgfSkKICAgIGJ5dGVjXzAgLy8gInMiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3NzkKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnN0YWtlcyhzaykuZXhpc3RzLCBlcnJTdGFrZURvZXNudEV4aXN0KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogY2xvc2VIZWFydGJlYXRfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDEzIC8vICJFUlI6ZXJyU25leCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJTbmV4CgpjbG9zZUhlYXJ0YmVhdF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NzgwCiAgICAvLyB0aGlzLnN0YWtlcyhzaykuZGVsZXRlKCkKICAgIGR1cAogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjc4MgogICAgLy8gbGV0IGJveGVzOiB1aW50NjQgPSBTdGFrZXNNQlIKICAgIGludGMgNCAvLyAzMjEwMAogICAgYnVyeSAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjc4MwogICAgLy8gY29uc3QgaGJrOiBIZWFydGJlYXRLZXkgPSB7IGFkZHJlc3M6IFR4bi5zZW5kZXIsIGFzc2V0IH0KICAgIHR4biBTZW5kZXIKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExMi0xMTQKICAgIC8vIGhlYXJ0YmVhdHMgPSBCb3hNYXA8SGVhcnRiZWF0S2V5LCBhcmM0LlN0YXRpY0FycmF5PGFyYzRIZWFydGJlYXQsIDQ+Pih7CiAgICAvLyAgIGtleVByZWZpeDogU3Rha2luZ0JveFByZWZpeEhlYXJ0YmVhdHMsCiAgICAvLyB9KQogICAgYnl0ZWMgOSAvLyAiaCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBidXJ5IDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6Nzg0CiAgICAvLyBpZiAodGhpcy5oZWFydGJlYXRzKGhiaykuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGNsb3NlSGVhcnRiZWF0X2FmdGVyX2lmX2Vsc2VANQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3ODUKICAgIC8vIHRoaXMuaGVhcnRiZWF0cyhoYmspLmRlbGV0ZSgpCiAgICBkaWcgMgogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjc4NgogICAgLy8gYm94ZXMgKz0gSGVhcnRiZWF0c01CUgogICAgaW50YyA1IC8vIDEwMjIwMAogICAgYnVyeSAyCgpjbG9zZUhlYXJ0YmVhdF9hZnRlcl9pZl9lbHNlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjc4OQogICAgLy8gY29uc3QgW3JlY2VpdmVyLCByZWZ1bmRdID0gcmVsZWFzZURlcG9zaXQodGhpcy5zdGFrZXMoc2spLmtleSwgVHhuLnNlbmRlciwgYm94ZXMpCiAgICB0eG4gU2VuZGVyCiAgICBkaWcgMgogICAgY2FsbHN1YiByZWxlYXNlRGVwb3NpdAogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIHN3YXAKICAgIGludGNfMyAvLyAzMgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NzkwCiAgICAvLyBpdHhuLnBheW1lbnQoeyByZWNlaXZlciwgYW1vdW50OiByZWZ1bmQgfSkuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3NzcKICAgIC8vIGNsb3NlSGVhcnRiZWF0KGFzc2V0OiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLnJlbGVhc2VBcHBTdGFrZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnJlbGVhc2VBcHBTdGFrZToKICAgIHB1c2hieXRlcyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3OTcKICAgIC8vIHJlbGVhc2VBcHBTdGFrZShhcHA6IHVpbnQ2NCwgYWRkcmVzczogQWNjb3VudCwgYXNzZXQ6IHVpbnQ2NCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3OTgKICAgIC8vIGNvbnN0IGtleTogQXBwU3Rha2VLZXkgPSB7IGFwcCwgYWRkcmVzcywgYXNzZXQgfQogICAgdW5jb3ZlciAyCiAgICBpdG9iCiAgICB1bmNvdmVyIDIKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwOQogICAgLy8gYXBwU3Rha2VzID0gQm94TWFwPEFwcFN0YWtlS2V5LCBBcHBTdGFrZT4oeyBrZXlQcmVmaXg6IFN0YWtpbmdCb3hQcmVmaXhBcHBTdGFrZXMgfSkKICAgIGJ5dGVjIDE0IC8vICJhIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6Nzk5CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5hcHBTdGFrZXMoa2V5KS5leGlzdHMsIGVyclN0YWtlRG9lc250RXhpc3QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiByZWxlYXNlQXBwU3Rha2VfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDEzIC8vICJFUlI6ZXJyU25leCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJTbmV4CgpyZWxlYXNlQXBwU3Rha2VfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjgwMQogICAgLy8gY29uc3QgWywgYXBwRXhpc3RzXSA9IG9wLkFwcFBhcmFtcy5hcHBDcmVhdG9yKGFwcCkKICAgIHVuY292ZXIgMgogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBDcmVhdG9yCiAgICBidXJ5IDUKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4MDMKICAgIC8vIEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbklkID09PSBhcHAgfHwgKCFhcHBFeGlzdHMgJiYgVHhuLnNlbmRlciA9PT0gYWRkcmVzcyksCiAgICBnbG9iYWwgQ2FsbGVyQXBwbGljYXRpb25JRAogICAgPT0KICAgIGJueiByZWxlYXNlQXBwU3Rha2VfYm9vbF90cnVlQDYKICAgIGRpZyAyCiAgICBibnogcmVsZWFzZUFwcFN0YWtlX2Jvb2xfZmFsc2VANwogICAgdHhuIFNlbmRlcgogICAgZGlnIDIKICAgID09CiAgICBieiByZWxlYXNlQXBwU3Rha2VfYm9vbF9mYWxzZUA3CgpyZWxlYXNlQXBwU3Rha2VfYm9vbF90cnVlQDY6CiAgICBpbnRjXzEgLy8gMQoKcmVsZWFzZUFwcFN0YWtlX2Jvb2xfbWVyZ2VAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODAyLTgwNQogICAgLy8gbG9nZ2VkQXNzZXJ0KAogICAgLy8gICBHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25JZCA9PT0gYXBwIHx8ICghYXBwRXhpc3RzICYmIFR4bi5zZW5kZXIgPT09IGFkZHJlc3MpLAogICAgLy8gICBlcnJBcHBTdGFrZUluVXNlCiAgICAvLyApCiAgICBibnogcmVsZWFzZUFwcFN0YWtlX2FmdGVyX2Fzc2VydEAxMAogICAgcHVzaGJ5dGVzICJFUlI6ZXJyQXNpdSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJBc2l1CgpyZWxlYXNlQXBwU3Rha2VfYWZ0ZXJfYXNzZXJ0QDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4MDcKICAgIC8vIHRoaXMuYXBwU3Rha2VzKGtleSkuZGVsZXRlKCkKICAgIGJveF9kZWwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4MDgKICAgIC8vIGl0eG4ucGF5bWVudCh7IHJlY2VpdmVyOiBhZGRyZXNzLCBhbW91bnQ6IEFwcFN0YWtlc01CUiB9KS5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgaW50YyA2IC8vIDM0OTAwCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6Nzk3CiAgICAvLyByZWxlYXNlQXBwU3Rha2UoYXBwOiB1aW50NjQsIGFkZHJlc3M6IEFjY291bnQsIGFzc2V0OiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCnJlbGVhc2VBcHBTdGFrZV9ib29sX2ZhbHNlQDc6CiAgICBpbnRjXzAgLy8gMAogICAgYiByZWxlYXNlQXBwU3Rha2VfYm9vbF9tZXJnZUA4CgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5yZWNsYWltQXBwU3Rha2Vbcm91dGluZ10oKSAtPiB2b2lkOgpyZWNsYWltQXBwU3Rha2U6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjgxNgogICAgLy8gcmVjbGFpbUFwcFN0YWtlKGFkZHJlc3M6IEFjY291bnQsIGFzc2V0OiB1aW50NjQpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4MTcKICAgIC8vIGxvZ2dlZEFzc2VydChHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25JZCAhPT0gMCwgZXJyQXBwQ2FsbFJlcXVpcmVkKQogICAgZ2xvYmFsIENhbGxlckFwcGxpY2F0aW9uSUQKICAgIGJueiByZWNsYWltQXBwU3Rha2VfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDI1IC8vICJFUlI6ZXJyQWNycSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJBY3JxCgpyZWNsYWltQXBwU3Rha2VfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjgxOAogICAgLy8gY29uc3Qga2V5OiBBcHBTdGFrZUtleSA9IHsgYXBwOiBHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25JZCwgYWRkcmVzcywgYXNzZXQgfQogICAgZ2xvYmFsIENhbGxlckFwcGxpY2F0aW9uSUQKICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTA5CiAgICAvLyBhcHBTdGFrZXMgPSBCb3hNYXA8QXBwU3Rha2VLZXksIEFwcFN0YWtlPih7IGtleVByZWZpeDogU3Rha2luZ0JveFByZWZpeEFwcFN0YWtlcyB9KQogICAgYnl0ZWMgMTQgLy8gImEiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4MTkKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmFwcFN0YWtlcyhrZXkpLmV4aXN0cywgZXJyU3Rha2VEb2VzbnRFeGlzdCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHJlY2xhaW1BcHBTdGFrZV9hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgMTMgLy8gIkVSUjplcnJTbmV4IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclNuZXgKCnJlY2xhaW1BcHBTdGFrZV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODIxCiAgICAvLyB0aGlzLmFwcFN0YWtlcyhrZXkpLmRlbGV0ZSgpCiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODIyCiAgICAvLyBpdHhuLnBheW1lbnQoeyByZWNlaXZlcjogR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uQWRkcmVzcywgYW1vdW50OiBBcHBTdGFrZXNNQlIgfSkuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIGdsb2JhbCBDYWxsZXJBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGludGMgNiAvLyAzNDkwMAogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjgxNgogICAgLy8gcmVjbGFpbUFwcFN0YWtlKGFkZHJlc3M6IEFjY291bnQsIGFzc2V0OiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLm9wdEluQ29zdFtyb3V0aW5nXSgpIC0+IHZvaWQ6Cm9wdEluQ29zdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODI5CiAgICAvLyByZXR1cm4gdG90YWxzTUJSICsgR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBwdXNoaW50IDE1NzAwCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODI3CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGl0b2IKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLnN0YWtlQ29zdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CnN0YWtlQ29zdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODMyCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50OAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4MzUKICAgIC8vIGNvbnN0IHNrOiBTdGFrZUtleSA9IHsgYWRkcmVzczogVHhuLnNlbmRlciwgYXNzZXQsIHR5cGUgfQogICAgdHhuIFNlbmRlcgogICAgdW5jb3ZlciAyCiAgICBpdG9iCiAgICBjb25jYXQKICAgIGRpZyAxCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTA1CiAgICAvLyBzdGFrZXMgPSBCb3hNYXA8U3Rha2VLZXksIFN0YWtlPih7IGtleVByZWZpeDogU3Rha2luZ0JveFByZWZpeFN0YWtlcyB9KQogICAgYnl0ZWNfMCAvLyAicyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4MzYKICAgIC8vIGNvbnN0IGlzVXBkYXRlID0gdGhpcy5zdGFrZXMoc2spLmV4aXN0cwogICAgYm94X2xlbgogICAgY292ZXIgMgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjgzOAogICAgLy8gaWYgKHR5cGUgPT09IFNUQUtJTkdfVFlQRV9IRUFSVEJFQVQpIHsKICAgIGJ5dGVjIDggLy8gMHgwYQogICAgPT0KICAgIGJ6IHN0YWtlQ29zdF9hZnRlcl9pZl9lbHNlQDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODM5CiAgICAvLyByZXR1cm4gaXNVcGRhdGUgPyAwIDogc3Rha2VzICsgaGVhcnRiZWF0cwogICAgYnogc3Rha2VDb3N0X3Rlcm5hcnlfZmFsc2VANAogICAgaW50Y18wIC8vIDAKCnN0YWtlQ29zdF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuc3Rha2VDb3N0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjgzMgogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBpdG9iCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpzdGFrZUNvc3RfdGVybmFyeV9mYWxzZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4MzkKICAgIC8vIHJldHVybiBpc1VwZGF0ZSA/IDAgOiBzdGFrZXMgKyBoZWFydGJlYXRzCiAgICBpbnRjIDUgLy8gMTAyMjAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjgzMgogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBiIHN0YWtlQ29zdF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuc3Rha2VDb3N0QDcKCnN0YWtlQ29zdF9hZnRlcl9pZl9lbHNlQDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjgzNAogICAgLy8gY29uc3QgeyBzdGFrZXMsIGhlYXJ0YmVhdHMgfSA9IHRoaXMubWJyKCkKICAgIGludGMgNCAvLyAzMjEwMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4NDIKICAgIC8vIHJldHVybiBpc1VwZGF0ZSA/IDAgOiBzdGFrZXMKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4MzIKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYiBzdGFrZUNvc3RfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLnN0YWtlQ29zdEA3CgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5hcHBTdGFrZUNvc3Rbcm91dGluZ10oKSAtPiB2b2lkOgphcHBTdGFrZUNvc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjg0NQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODQ3CiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uSWQgIT09IDAsIGVyckFwcENhbGxSZXF1aXJlZCkKICAgIGdsb2JhbCBDYWxsZXJBcHBsaWNhdGlvbklECiAgICBibnogYXBwU3Rha2VDb3N0X2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAyNSAvLyAiRVJSOmVyckFjcnEiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQWNycQoKYXBwU3Rha2VDb3N0X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4NDgKICAgIC8vIGNvbnN0IGtleTogQXBwU3Rha2VLZXkgPSB7IGFwcDogR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uSWQsIGFkZHJlc3MsIGFzc2V0IH0KICAgIGdsb2JhbCBDYWxsZXJBcHBsaWNhdGlvbklECiAgICBpdG9iCiAgICB1bmNvdmVyIDIKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwOQogICAgLy8gYXBwU3Rha2VzID0gQm94TWFwPEFwcFN0YWtlS2V5LCBBcHBTdGFrZT4oeyBrZXlQcmVmaXg6IFN0YWtpbmdCb3hQcmVmaXhBcHBTdGFrZXMgfSkKICAgIGJ5dGVjIDE0IC8vICJhIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjg0OQogICAgLy8gcmV0dXJuIHRoaXMuYXBwU3Rha2VzKGtleSkuZXhpc3RzID8gMCA6IHRoaXMubWJyKCkuYXBwU3Rha2VzCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGFwcFN0YWtlQ29zdF90ZXJuYXJ5X2ZhbHNlQDUKICAgIGludGNfMCAvLyAwCgphcHBTdGFrZUNvc3RfdGVybmFyeV9tZXJnZUA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4NDUKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgaXRvYgogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKYXBwU3Rha2VDb3N0X3Rlcm5hcnlfZmFsc2VANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODQ5CiAgICAvLyByZXR1cm4gdGhpcy5hcHBTdGFrZXMoa2V5KS5leGlzdHMgPyAwIDogdGhpcy5tYnIoKS5hcHBTdGFrZXMKICAgIGludGMgNiAvLyAzNDkwMAogICAgYiBhcHBTdGFrZUNvc3RfdGVybmFyeV9tZXJnZUA2CgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5nZXRUaW1lTGVmdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmdldFRpbWVMZWZ0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4NTIKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjg1NAogICAgLy8gY29uc3Qgc2sgPSB7IGFkZHJlc3MsIGFzc2V0LCB0eXBlOiBTVEFLSU5HX1RZUEVfTE9DSyB9CiAgICBpdG9iCiAgICBjb25jYXQKICAgIGJ5dGVjXzIgLy8gMHgyOAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjg1NQogICAgLy8gaWYgKCF0aGlzLnN0YWtlcyhzaykuZXhpc3RzIHx8IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPj0gdGhpcy5zdGFrZXMoc2spLnZhbHVlLmV4cGlyYXRpb24pIHsKICAgIGR1cAogICAgZXh0cmFjdCAwIDMyCiAgICBkaWcgMQogICAgZXh0cmFjdCAzMiA4CiAgICB1bmNvdmVyIDIKICAgIGV4dHJhY3QgNDAgMQogICAgY292ZXIgMgogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTA1CiAgICAvLyBzdGFrZXMgPSBCb3hNYXA8U3Rha2VLZXksIFN0YWtlPih7IGtleVByZWZpeDogU3Rha2luZ0JveFByZWZpeFN0YWtlcyB9KQogICAgYnl0ZWNfMCAvLyAicyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjg1NQogICAgLy8gaWYgKCF0aGlzLnN0YWtlcyhzaykuZXhpc3RzIHx8IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPj0gdGhpcy5zdGFrZXMoc2spLnZhbHVlLmV4cGlyYXRpb24pIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogZ2V0VGltZUxlZnRfaWZfYm9keUAzCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBkaWcgMQogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICA+PQogICAgYnogZ2V0VGltZUxlZnRfYWZ0ZXJfaWZfZWxzZUA0CgpnZXRUaW1lTGVmdF9pZl9ib2R5QDM6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODU2CiAgICAvLyByZXR1cm4gMAogICAgaW50Y18wIC8vIDAKCmdldFRpbWVMZWZ0X2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5nZXRUaW1lTGVmdEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4NTIKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgaXRvYgogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKZ2V0VGltZUxlZnRfYWZ0ZXJfaWZfZWxzZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4NTkKICAgIC8vIHJldHVybiB0aGlzLnN0YWtlcyhzaykudmFsdWUuZXhwaXJhdGlvbiAtIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4NTIKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYiBnZXRUaW1lTGVmdF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuZ2V0VGltZUxlZnRANQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcubXVzdEdldFRpbWVMZWZ0W3JvdXRpbmddKCkgLT4gdm9pZDoKbXVzdEdldFRpbWVMZWZ0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4NjIKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjg2NAogICAgLy8gY29uc3Qgc2sgPSB7IGFkZHJlc3MsIGFzc2V0LCB0eXBlOiBTVEFLSU5HX1RZUEVfTE9DSyB9CiAgICBpdG9iCiAgICBjb25jYXQKICAgIGJ5dGVjXzIgLy8gMHgyOAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjg2NQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc3Rha2VzKHNrKS5leGlzdHMsIGVyck5vTG9jaykKICAgIGR1cAogICAgZXh0cmFjdCAwIDMyCiAgICBkaWcgMQogICAgZXh0cmFjdCAzMiA4CiAgICB1bmNvdmVyIDIKICAgIGV4dHJhY3QgNDAgMQogICAgY292ZXIgMgogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTA1CiAgICAvLyBzdGFrZXMgPSBCb3hNYXA8U3Rha2VLZXksIFN0YWtlPih7IGtleVByZWZpeDogU3Rha2luZ0JveFByZWZpeFN0YWtlcyB9KQogICAgYnl0ZWNfMCAvLyAicyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjg2NQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc3Rha2VzKHNrKS5leGlzdHMsIGVyck5vTG9jaykKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IG11c3RHZXRUaW1lTGVmdF9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMjMgLy8gIkVSUjplcnJObGNrIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5sY2sKCm11c3RHZXRUaW1lTGVmdF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODY2CiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA8IHRoaXMuc3Rha2VzKHNrKS52YWx1ZS5leHBpcmF0aW9uLCBlcnJMb2NrZWQpCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBkaWcgMQogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICA8CiAgICBibnogbXVzdEdldFRpbWVMZWZ0X2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyAzNCAvLyAiRVJSOmVyckxvY2siCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTG9jawoKbXVzdEdldFRpbWVMZWZ0X2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4NjcKICAgIC8vIHJldHVybiB0aGlzLnN0YWtlcyhzaykudmFsdWUuZXhwaXJhdGlvbiAtIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4NjIKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgaXRvYgogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuZ2V0SW5mb1tyb3V0aW5nXSgpIC0+IHZvaWQ6CmdldEluZm86CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjg3MAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDkKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL3R5cGVzLnRzOjpTdGFrZUluZm8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODcyCiAgICAvLyByZXR1cm4gdGhpcy5nZXRJbmZvT3JFbXB0eShhZGRyZXNzLCBzdGFrZSkKICAgIGNhbGxzdWIgZ2V0SW5mb09yRW1wdHkKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4NzAKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcubXVzdEdldEluZm9bcm91dGluZ10oKSAtPiB2b2lkOgptdXN0R2V0SW5mbzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODc1CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cG4gMgogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgOQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3N0YWtpbmcvdHlwZXMudHM6OlN0YWtlSW5mbwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4NzcKICAgIC8vIGNvbnN0IHNrID0geyBhZGRyZXNzLCAuLi5zdGFrZSB9CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBjb3ZlciAzCiAgICBleHRyYWN0IDggMQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBjb3ZlciAzCiAgICBpdG9iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4NzgKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnN0YWtlcyhzaykuZXhpc3RzLCBlcnJOb0xvY2spCiAgICBkdXAKICAgIGV4dHJhY3QgOSAzMgogICAgZGlnIDEKICAgIGV4dHJhY3QgMCA4CiAgICB1bmNvdmVyIDIKICAgIGV4dHJhY3QgOCAxCiAgICBjb3ZlciAyCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDUKICAgIC8vIHN0YWtlcyA9IEJveE1hcDxTdGFrZUtleSwgU3Rha2U+KHsga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4U3Rha2VzIH0pCiAgICBieXRlY18wIC8vICJzIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODc4CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zdGFrZXMoc2spLmV4aXN0cywgZXJyTm9Mb2NrKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogbXVzdEdldEluZm9fYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDIzIC8vICJFUlI6ZXJyTmxjayIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJObGNrCgptdXN0R2V0SW5mb19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODgwCiAgICAvLyByZXR1cm4gdGhpcy5jbGFtcFNvZnQoYWRkcmVzcywgc3Rha2UuYXNzZXQsIHN0YWtlLnR5cGUsIHRoaXMuc3Rha2VzKHNrKS52YWx1ZSkKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBjYWxsc3ViIGNsYW1wU29mdAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjg3NQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5nZXRXZWlnaHRlZFN0YWtlW3JvdXRpbmddKCkgLT4gdm9pZDoKZ2V0V2VpZ2h0ZWRTdGFrZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODgzCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4ODUKICAgIC8vIHJldHVybiB0aGlzLmdldFdlaWdodGVkU3Rha2VGb3JBcHAoYWRkcmVzcywgYXNzZXQsIDAsIHRydWUpCiAgICBpbnRjXzAgLy8gMAogICAgaW50Y18xIC8vIDEKICAgIGNhbGxzdWIgZ2V0V2VpZ2h0ZWRTdGFrZUZvckFwcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4ODMKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuc29mdENoZWNrW3JvdXRpbmddKCkgLT4gdm9pZDoKc29mdENoZWNrOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4ODgKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwbiAyCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODkwCiAgICAvLyBjb25zdCBzayA9IHsgYWRkcmVzcywgYXNzZXQsIHR5cGU6IFNUQUtJTkdfVFlQRV9TT0ZUIH0KICAgIGl0b2IKICAgIGNvbmNhdAogICAgYnl0ZWMgNSAvLyAweDE0CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODkxCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zdGFrZXMoc2spLmV4aXN0cywgZXJyU3Rha2VEb2VzbnRFeGlzdCkKICAgIGR1cAogICAgZXh0cmFjdCAwIDMyCiAgICBkaWcgMQogICAgZXh0cmFjdCAzMiA4CiAgICB1bmNvdmVyIDIKICAgIGV4dHJhY3QgNDAgMQogICAgY292ZXIgMgogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTA1CiAgICAvLyBzdGFrZXMgPSBCb3hNYXA8U3Rha2VLZXksIFN0YWtlPih7IGtleVByZWZpeDogU3Rha2luZ0JveFByZWZpeFN0YWtlcyB9KQogICAgYnl0ZWNfMCAvLyAicyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjg5MQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc3Rha2VzKHNrKS5leGlzdHMsIGVyclN0YWtlRG9lc250RXhpc3QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBzb2Z0Q2hlY2tfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDEzIC8vICJFUlI6ZXJyU25leCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJTbmV4Cgpzb2Z0Q2hlY2tfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjg5MwogICAgLy8gY29uc3QgeyBhbW91bnQgfSA9IHRoaXMuc3Rha2VzKHNrKS52YWx1ZQogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4OTQKICAgIC8vIGlmIChhc3NldCA9PT0gMCkgewogICAgZGlnIDIKICAgIGJueiBzb2Z0Q2hlY2tfYWZ0ZXJfaWZfZWxzZUA1CiAgICB1bmNvdmVyIDIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4OTUKICAgIC8vIGNvbnN0IHZhbGlkID0gYWRkcmVzcy5iYWxhbmNlID49IGFtb3VudAogICAgc3dhcAogICAgZHVwCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdEJhbGFuY2UKICAgIGFzc2VydCAvLyBhY2NvdW50IGZ1bmRlZAogICAgdW5jb3ZlciAyCiAgICA+PQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4OTYKICAgIC8vIHJldHVybiB7IHZhbGlkLCBiYWxhbmNlOiBhZGRyZXNzLmJhbGFuY2UgfQogICAgc3dhcAogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RCYWxhbmNlCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIGJ5dGVjIDExIC8vIDB4MDAKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDMKICAgIHNldGJpdAogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0Cgpzb2Z0Q2hlY2tfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLnNvZnRDaGVja0A4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4ODgKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKc29mdENoZWNrX2FmdGVyX2lmX2Vsc2VANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODk5CiAgICAvLyBjb25zdCBbaG9sZGluZ0Ftb3VudCwgb3B0ZWRJbl0gPSBBc3NldEhvbGRpbmcuYXNzZXRCYWxhbmNlKGFkZHJlc3MsIGFzc2V0KQogICAgc3dhcAogICAgdW5jb3ZlciAyCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OTAxCiAgICAvLyBpZiAoIW9wdGVkSW4pIHsKICAgIGJueiBzb2Z0Q2hlY2tfYWZ0ZXJfaWZfZWxzZUA3CiAgICBwb3BuIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OTAyCiAgICAvLyByZXR1cm4geyB2YWxpZDogZmFsc2UsIGJhbGFuY2U6IDAgfQogICAgYnl0ZWMgMzcgLy8gMHgwMDAwMDAwMDAwMDAwMDAwMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODg4CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGIgc29mdENoZWNrX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5zb2Z0Q2hlY2tAOAoKc29mdENoZWNrX2FmdGVyX2lmX2Vsc2VANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OTA1CiAgICAvLyBjb25zdCB2YWxpZCA9IGhvbGRpbmdBbW91bnQgPj0gYW1vdW50CiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgPj0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OTA3CiAgICAvLyByZXR1cm4geyB2YWxpZCwgYmFsYW5jZTogaG9sZGluZ0Ftb3VudCB9CiAgICBieXRlYyAxMSAvLyAweDAwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBzZXRiaXQKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4ODgKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYiBzb2Z0Q2hlY2tfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLnNvZnRDaGVja0A4CgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5nZXRBcHBXZWlnaHRlZFN0YWtlW3JvdXRpbmddKCkgLT4gdm9pZDoKZ2V0QXBwV2VpZ2h0ZWRTdGFrZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OTEwCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmJvb2wKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OTE3CiAgICAvLyByZXR1cm4gdGhpcy5nZXRXZWlnaHRlZFN0YWtlRm9yQXBwKGFkZHJlc3MsIGFzc2V0LCBhcHAsIGFjY2VwdEluaGVyaXRlZCkKICAgIGNvdmVyIDIKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAzCiAgICBjYWxsc3ViIGdldFdlaWdodGVkU3Rha2VGb3JBcHAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OTEwCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmdldEluZm9BdExlYXN0W3JvdXRpbmddKCkgLT4gdm9pZDoKZ2V0SW5mb0F0TGVhc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjk4MgogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cG4gMgogICAgbGVuCiAgICBwdXNoaW50IDkKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL3R5cGVzLnRzOjpTdGFrZUluZm8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OTg0CiAgICAvLyBjb25zdCByZXN1bHRzOiBTdGFrZVtdID0gW10KICAgIGJ5dGVjIDE3IC8vIDB4MDAwMAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo5ODYKICAgIC8vIGlmIChzdGFrZS50eXBlID09PSBTVEFLSU5HX1RZUEVfU09GVCkgewogICAgZXh0cmFjdCA4IDEKICAgIGR1cAogICAgYnl0ZWMgNSAvLyAweDE0CiAgICA9PQogICAgZHVwCiAgICBieiBnZXRJbmZvQXRMZWFzdF9hZnRlcl9pZl9lbHNlQDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OTg3CiAgICAvLyByZXN1bHRzLnB1c2godGhpcy5nZXRJbmZvT3JFbXB0eShhZGRyZXNzLCB7IGFzc2V0OiBzdGFrZS5hc3NldCwgdHlwZTogU1RBS0lOR19UWVBFX1NPRlQgfSkpCiAgICBkaWcgMwogICAgZXh0cmFjdCAwIDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OTg2CiAgICAvLyBpZiAoc3Rha2UudHlwZSA9PT0gU1RBS0lOR19UWVBFX1NPRlQpIHsKICAgIGJ5dGVjIDUgLy8gMHgxNAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo5ODcKICAgIC8vIHJlc3VsdHMucHVzaCh0aGlzLmdldEluZm9PckVtcHR5KGFkZHJlc3MsIHsgYXNzZXQ6IHN0YWtlLmFzc2V0LCB0eXBlOiBTVEFLSU5HX1RZUEVfU09GVCB9KSkKICAgIGNvbmNhdAogICAgZGlnIDUKICAgIHN3YXAKICAgIGNhbGxzdWIgZ2V0SW5mb09yRW1wdHkKICAgIHBvcAogICAgcHVzaGJ5dGVzIDB4MDAwMQogICAgc3dhcAogICAgY29uY2F0CiAgICBidXJ5IDMKCmdldEluZm9BdExlYXN0X2FmdGVyX2lmX2Vsc2VAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OTkwCiAgICAvLyBpZiAoc3Rha2UudHlwZSA9PT0gU1RBS0lOR19UWVBFX1NPRlQgfHwgc3Rha2UudHlwZSA9PT0gU1RBS0lOR19UWVBFX0hBUkQpIHsKICAgIGR1cAogICAgYm56IGdldEluZm9BdExlYXN0X2lmX2JvZHlANQogICAgZGlnIDEKICAgIGJ5dGVjIDQgLy8gMHgxZQogICAgPT0KICAgIGJ6IGdldEluZm9BdExlYXN0X2FmdGVyX2lmX2Vsc2VANgoKZ2V0SW5mb0F0TGVhc3RfaWZfYm9keUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo5OTEKICAgIC8vIHJlc3VsdHMucHVzaCh0aGlzLmdldEluZm9PckVtcHR5KGFkZHJlc3MsIHsgYXNzZXQ6IHN0YWtlLmFzc2V0LCB0eXBlOiBTVEFLSU5HX1RZUEVfSEFSRCB9KSkKICAgIGRpZyAzCiAgICBleHRyYWN0IDAgOAogICAgYnl0ZWMgNCAvLyAweDFlCiAgICBjb25jYXQKICAgIGRpZyA1CiAgICBzd2FwCiAgICBjYWxsc3ViIGdldEluZm9PckVtcHR5CiAgICBwb3AKICAgIGRpZyAzCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo5OTEKICAgIC8vIHJlc3VsdHMucHVzaCh0aGlzLmdldEluZm9PckVtcHR5KGFkZHJlc3MsIHsgYXNzZXQ6IHN0YWtlLmFzc2V0LCB0eXBlOiBTVEFLSU5HX1RZUEVfSEFSRCB9KSkKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMAogICAgcmVwbGFjZTIgMAogICAgc3dhcAogICAgY29uY2F0CiAgICBidXJ5IDMKCmdldEluZm9BdExlYXN0X2FmdGVyX2lmX2Vsc2VANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OTk1LTk5NgogICAgLy8gc3Rha2UudHlwZSA9PT0gU1RBS0lOR19UWVBFX1NPRlQgfHwKICAgIC8vIHN0YWtlLnR5cGUgPT09IFNUQUtJTkdfVFlQRV9IQVJEIHx8CiAgICBibnogZ2V0SW5mb0F0TGVhc3RfaWZfYm9keUA5CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjk5NgogICAgLy8gc3Rha2UudHlwZSA9PT0gU1RBS0lOR19UWVBFX0hBUkQgfHwKICAgIGR1cAogICAgYnl0ZWMgNCAvLyAweDFlCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo5OTUtOTk2CiAgICAvLyBzdGFrZS50eXBlID09PSBTVEFLSU5HX1RZUEVfU09GVCB8fAogICAgLy8gc3Rha2UudHlwZSA9PT0gU1RBS0lOR19UWVBFX0hBUkQgfHwKICAgIGJueiBnZXRJbmZvQXRMZWFzdF9pZl9ib2R5QDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OTk3CiAgICAvLyBzdGFrZS50eXBlID09PSBTVEFLSU5HX1RZUEVfTE9DSwogICAgZHVwCiAgICBieXRlY18yIC8vIDB4MjgKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjk5NS05OTcKICAgIC8vIHN0YWtlLnR5cGUgPT09IFNUQUtJTkdfVFlQRV9TT0ZUIHx8CiAgICAvLyBzdGFrZS50eXBlID09PSBTVEFLSU5HX1RZUEVfSEFSRCB8fAogICAgLy8gc3Rha2UudHlwZSA9PT0gU1RBS0lOR19UWVBFX0xPQ0sKICAgIGJ6IGdldEluZm9BdExlYXN0X2FmdGVyX2lmX2Vsc2VAMTAKCmdldEluZm9BdExlYXN0X2lmX2JvZHlAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OTk5CiAgICAvLyByZXN1bHRzLnB1c2godGhpcy5nZXRJbmZvT3JFbXB0eShhZGRyZXNzLCB7IGFzc2V0OiBzdGFrZS5hc3NldCwgdHlwZTogU1RBS0lOR19UWVBFX0xPQ0sgfSkpCiAgICBkaWcgMgogICAgZXh0cmFjdCAwIDgKICAgIGJ5dGVjXzIgLy8gMHgyOAogICAgY29uY2F0CiAgICBkaWcgNAogICAgc3dhcAogICAgY2FsbHN1YiBnZXRJbmZvT3JFbXB0eQogICAgcG9wCiAgICBkaWcgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OTk5CiAgICAvLyByZXN1bHRzLnB1c2godGhpcy5nZXRJbmZvT3JFbXB0eShhZGRyZXNzLCB7IGFzc2V0OiBzdGFrZS5hc3NldCwgdHlwZTogU1RBS0lOR19UWVBFX0xPQ0sgfSkpCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgaXRvYgogICAgZXh0cmFjdCA2IDAKICAgIHJlcGxhY2UyIDAKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYnVyeSAyCgpnZXRJbmZvQXRMZWFzdF9hZnRlcl9pZl9lbHNlQDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo5ODIKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBkaWcgMgogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmdldEVzY3Jvd0luZm9bcm91dGluZ10oKSAtPiB2b2lkOgpnZXRFc2Nyb3dJbmZvOgogICAgaW50Y18wIC8vIDAKICAgIHB1c2hieXRlcyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDA1CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDA3CiAgICAvLyBjb25zdCBzayA9IHsgYWRkcmVzcywgYXNzZXQsIHR5cGU6IFNUQUtJTkdfVFlQRV9IQVJEIH0KICAgIGl0b2IKICAgIGNvbmNhdAogICAgZHVwCiAgICBieXRlYyA0IC8vIDB4MWUKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDA4CiAgICAvLyBjb25zdCBsayA9IHsgYWRkcmVzcywgYXNzZXQsIHR5cGU6IFNUQUtJTkdfVFlQRV9MT0NLIH0KICAgIHN3YXAKICAgIGJ5dGVjXzIgLy8gMHgyOAogICAgY29uY2F0CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwMTAKICAgIC8vIGxldCBoYXJkOiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDExCiAgICAvLyBpZiAodGhpcy5zdGFrZXMoc2spLmV4aXN0cykgewogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIGRpZyAxCiAgICBleHRyYWN0IDMyIDgKICAgIHVuY292ZXIgMgogICAgZXh0cmFjdCA0MCAxCiAgICBjb3ZlciAyCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDUKICAgIC8vIHN0YWtlcyA9IEJveE1hcDxTdGFrZUtleSwgU3Rha2U+KHsga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4U3Rha2VzIH0pCiAgICBieXRlY18wIC8vICJzIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTAxMQogICAgLy8gaWYgKHRoaXMuc3Rha2VzKHNrKS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogZ2V0RXNjcm93SW5mb19hZnRlcl9pZl9lbHNlQDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTAxMgogICAgLy8gaGFyZCA9IHRoaXMuc3Rha2VzKHNrKS52YWx1ZS5hbW91bnQKICAgIGRpZyAxCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBidXJ5IDMKCmdldEVzY3Jvd0luZm9fYWZ0ZXJfaWZfZWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDE1CiAgICAvLyBsZXQgbG9jazogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIGJ1cnkgNAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDE2CiAgICAvLyBpZiAodGhpcy5zdGFrZXMobGspLmV4aXN0cykgewogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIGRpZyAxCiAgICBleHRyYWN0IDMyIDgKICAgIHVuY292ZXIgMgogICAgZXh0cmFjdCA0MCAxCiAgICBjb3ZlciAyCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDUKICAgIC8vIHN0YWtlcyA9IEJveE1hcDxTdGFrZUtleSwgU3Rha2U+KHsga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4U3Rha2VzIH0pCiAgICBieXRlY18wIC8vICJzIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGJ1cnkgNQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDE2CiAgICAvLyBpZiAodGhpcy5zdGFrZXMobGspLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBnZXRFc2Nyb3dJbmZvX2FmdGVyX2lmX2Vsc2VANQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDE3CiAgICAvLyBsb2NrID0gdGhpcy5zdGFrZXMobGspLnZhbHVlLmFtb3VudAogICAgZGlnIDMKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGJ1cnkgMwoKZ2V0RXNjcm93SW5mb19hZnRlcl9pZl9lbHNlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwMjAKICAgIC8vIHJldHVybiB7IGhhcmQsIGxvY2sgfQogICAgZGlnIDEKICAgIGl0b2IKICAgIGRpZyAzCiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTAwNQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5nZXRIZWFydGJlYXRbcm91dGluZ10oKSAtPiB2b2lkOgpnZXRIZWFydGJlYXQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwMjMKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwMjUKICAgIC8vIGNvbnN0IGhiayA9IHsgYWRkcmVzcywgYXNzZXQgfQogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwMjYKICAgIC8vIGlmICghdGhpcy5oZWFydGJlYXRzKGhiaykuZXhpc3RzKSB7CiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgc3dhcAogICAgZXh0cmFjdCAzMiA4CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTEyLTExNAogICAgLy8gaGVhcnRiZWF0cyA9IEJveE1hcDxIZWFydGJlYXRLZXksIGFyYzQuU3RhdGljQXJyYXk8YXJjNEhlYXJ0YmVhdCwgND4+KHsKICAgIC8vICAga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4SGVhcnRiZWF0cywKICAgIC8vIH0pCiAgICBieXRlYyA5IC8vICJoIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTAyNgogICAgLy8gaWYgKCF0aGlzLmhlYXJ0YmVhdHMoaGJrKS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGdldEhlYXJ0YmVhdF9hZnRlcl9pZl9lbHNlQDMKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDI3LTEwMzIKICAgIC8vIHJldHVybiBuZXcgYXJjNC5TdGF0aWNBcnJheTxhcmM0SGVhcnRiZWF0LCA0PigKICAgIC8vICAgZW1wdHlIZWFydGJlYXQoKSwKICAgIC8vICAgZW1wdHlIZWFydGJlYXQoKSwKICAgIC8vICAgZW1wdHlIZWFydGJlYXQoKSwKICAgIC8vICAgZW1wdHlIZWFydGJlYXQoKQogICAgLy8gKQogICAgYnl0ZWMgMjEgLy8gMHgwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwCgpnZXRIZWFydGJlYXRfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmdldEhlYXJ0YmVhdEA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDIzCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmdldEhlYXJ0YmVhdF9hZnRlcl9pZl9lbHNlQDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwMzUKICAgIC8vIHJldHVybiB0aGlzLmhlYXJ0YmVhdHMoaGJrKS52YWx1ZQogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTAyMwogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBiIGdldEhlYXJ0YmVhdF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuZ2V0SGVhcnRiZWF0QDQKCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLm11c3RHZXRIZWFydGJlYXRbcm91dGluZ10oKSAtPiB2b2lkOgptdXN0R2V0SGVhcnRiZWF0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDM4CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDQwCiAgICAvLyBjb25zdCBoYmsgPSB7IGFkZHJlc3MsIGFzc2V0IH0KICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDQxCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5oZWFydGJlYXRzKGhiaykuZXhpc3RzLCBlcnJIZWFyYmVhdE5vdEZvdW5kKQogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIHN3YXAKICAgIGV4dHJhY3QgMzIgOAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExMi0xMTQKICAgIC8vIGhlYXJ0YmVhdHMgPSBCb3hNYXA8SGVhcnRiZWF0S2V5LCBhcmM0LlN0YXRpY0FycmF5PGFyYzRIZWFydGJlYXQsIDQ+Pih7CiAgICAvLyAgIGtleVByZWZpeDogU3Rha2luZ0JveFByZWZpeEhlYXJ0YmVhdHMsCiAgICAvLyB9KQogICAgYnl0ZWMgOSAvLyAiaCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwNDEKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmhlYXJ0YmVhdHMoaGJrKS5leGlzdHMsIGVyckhlYXJiZWF0Tm90Rm91bmQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBtdXN0R2V0SGVhcnRiZWF0X2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAyNCAvLyAiRVJSOmVyckhibmYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySGJuZgoKbXVzdEdldEhlYXJ0YmVhdF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTA0MgogICAgLy8gcmV0dXJuIHRoaXMuaGVhcnRiZWF0cyhoYmspLnZhbHVlCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDM4CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmdldEhlYXJ0YmVhdEF2ZXJhZ2Vbcm91dGluZ10oKSAtPiB2b2lkOgpnZXRIZWFydGJlYXRBdmVyYWdlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDQ1CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmJvb2wKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5nZXRIZWFydGJlYXRBdmVyYWdlCiAgICBpdG9iCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5tdXN0R2V0SGVhcnRiZWF0QXZlcmFnZVtyb3V0aW5nXSgpIC0+IHZvaWQ6Cm11c3RHZXRIZWFydGJlYXRBdmVyYWdlOgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTA3NQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5ib29sCiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Yml0CiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwNzcKICAgIC8vIGNvbnN0IGhiayA9IHsgYWRkcmVzcywgYXNzZXQgfQogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwNzgKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmhlYXJ0YmVhdHMoaGJrKS5leGlzdHMsIGVyckhlYXJiZWF0Tm90Rm91bmQpCiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgc3dhcAogICAgZXh0cmFjdCAzMiA4CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTEyLTExNAogICAgLy8gaGVhcnRiZWF0cyA9IEJveE1hcDxIZWFydGJlYXRLZXksIGFyYzQuU3RhdGljQXJyYXk8YXJjNEhlYXJ0YmVhdCwgND4+KHsKICAgIC8vICAga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4SGVhcnRiZWF0cywKICAgIC8vIH0pCiAgICBieXRlYyA5IC8vICJoIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTA3OAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuaGVhcnRiZWF0cyhoYmspLmV4aXN0cywgZXJySGVhcmJlYXROb3RGb3VuZCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IG11c3RHZXRIZWFydGJlYXRBdmVyYWdlX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAyNCAvLyAiRVJSOmVyckhibmYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySGJuZgoKbXVzdEdldEhlYXJ0YmVhdEF2ZXJhZ2VfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwODAKICAgIC8vIGNvbnN0IGhlYXJ0YmVhdHMgPSBjbG9uZSh0aGlzLmhlYXJ0YmVhdHMoaGJrKS52YWx1ZSkKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwODIKICAgIC8vIGxldCB0b3RhbDogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTA4My0xMDg0CiAgICAvLyBsZXQgY291bnQ6IHVpbnQ2NCA9IDAKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCA0OyBpICs9IDEpIHsKICAgIGR1cG4gMgoKbXVzdEdldEhlYXJ0YmVhdEF2ZXJhZ2Vfd2hpbGVfdG9wQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwODQKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCA0OyBpICs9IDEpIHsKICAgIGR1cAogICAgcHVzaGludCA0CiAgICA8CiAgICBieiBtdXN0R2V0SGVhcnRiZWF0QXZlcmFnZV9hZnRlcl93aGlsZUAxMQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDg2CiAgICAvLyBpZiAoaGVhcnRiZWF0c1tpXS50aW1lc3RhbXAuYXNVaW50NjQoKSA+IDApIHsKICAgIGR1cAogICAgaW50Y18zIC8vIDMyCiAgICAqCiAgICBkaWcgNAogICAgc3dhcAogICAgaW50Y18zIC8vIDMyCiAgICBleHRyYWN0MyAvLyBvbiBlcnJvcjogaW5kZXggYWNjZXNzIGlzIG91dCBvZiBib3VuZHMKICAgIGR1cAogICAgYnVyeSA3CiAgICBwdXNoaW50IDI0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgYnogbXVzdEdldEhlYXJ0YmVhdEF2ZXJhZ2VfYWZ0ZXJfaWZfZWxzZUAxMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDg3CiAgICAvLyBjb3VudCArPSAxCiAgICBzd2FwCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDg4CiAgICAvLyBpZiAoaW5jbHVkZUVzY3Jvd2VkKSB7CiAgICBkaWcgNAogICAgYnogbXVzdEdldEhlYXJ0YmVhdEF2ZXJhZ2VfZWxzZV9ib2R5QDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTA4OQogICAgLy8gdG90YWwgKz0gaGVhcnRiZWF0c1tpXS5oZWxkLmFzVWludDY0KCkgKyBoZWFydGJlYXRzW2ldLmhhcmQuYXNVaW50NjQoKSArIGhlYXJ0YmVhdHNbaV0ubG9jay5hc1VpbnQ2NCgpCiAgICBkaWcgNQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGRpZyAxCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgICsKICAgIHN3YXAKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICArCiAgICB1bmNvdmVyIDMKICAgICsKICAgIGNvdmVyIDIKCm11c3RHZXRIZWFydGJlYXRBdmVyYWdlX2FmdGVyX2lmX2Vsc2VAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwODQKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCA0OyBpICs9IDEpIHsKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBiIG11c3RHZXRIZWFydGJlYXRBdmVyYWdlX3doaWxlX3RvcEA0CgptdXN0R2V0SGVhcnRiZWF0QXZlcmFnZV9lbHNlX2JvZHlAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTA5MQogICAgLy8gdG90YWwgKz0gaGVhcnRiZWF0c1tpXS5oZWxkLmFzVWludDY0KCkKICAgIGRpZyA1CiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIHVuY292ZXIgMwogICAgKwogICAgY292ZXIgMgogICAgYiBtdXN0R2V0SGVhcnRiZWF0QXZlcmFnZV9hZnRlcl9pZl9lbHNlQDEwCgptdXN0R2V0SGVhcnRiZWF0QXZlcmFnZV9hZnRlcl93aGlsZUAxMToKICAgIHBvcAogICAgdW5jb3ZlciAyCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTA5NgogICAgLy8gaWYgKGNvdW50ID09PSAwKSB7CiAgICBkdXAKICAgIGJueiBtdXN0R2V0SGVhcnRiZWF0QXZlcmFnZV9hZnRlcl9pZl9lbHNlQDEzCiAgICBwb3BuIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTA5NwogICAgLy8gcmV0dXJuIDAKICAgIGludGNfMCAvLyAwCgptdXN0R2V0SGVhcnRiZWF0QXZlcmFnZV9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcubXVzdEdldEhlYXJ0YmVhdEF2ZXJhZ2VAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwNzUKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgaXRvYgogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKbXVzdEdldEhlYXJ0YmVhdEF2ZXJhZ2VfYWZ0ZXJfaWZfZWxzZUAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTEwMAogICAgLy8gcmV0dXJuIHRvdGFsIC8gY291bnQKICAgIC8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTA3NQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBiIG11c3RHZXRIZWFydGJlYXRBdmVyYWdlX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5tdXN0R2V0SGVhcnRiZWF0QXZlcmFnZUAxNAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuZ2V0SW5mb0xpc3Rbcm91dGluZ10oKSAtPiB2b2lkOgpnZXRJbmZvTGlzdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTEwMwogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgY292ZXIgMgogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50OAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwbiAyCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBpbnRjXzIgLy8gOAogICAgKgogICAgcHVzaGludCAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTx1aW50NjQ+CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExMDUKICAgIC8vIGNvbnN0IHJlc3VsdHM6IFN0YWtlW10gPSBbXQogICAgYnl0ZWMgMTcgLy8gMHgwMDAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExMDYKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBhc3NldHMubGVuZ3RoOyBpICs9IDEpIHsKICAgIGludGNfMCAvLyAwCgpnZXRJbmZvTGlzdF93aGlsZV90b3BAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTEwNgogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGFzc2V0cy5sZW5ndGg7IGkgKz0gMSkgewogICAgZHVwCiAgICBkaWcgMwogICAgPAogICAgYnogZ2V0SW5mb0xpc3RfYWZ0ZXJfd2hpbGVANwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMTA3CiAgICAvLyBjb25zdCBzayA9IHsgYWRkcmVzcywgYXNzZXQ6IGFzc2V0c1tpXSwgdHlwZSB9CiAgICBkaWcgMwogICAgZXh0cmFjdCAyIDAKICAgIGRpZyAxCiAgICBpbnRjXzIgLy8gOAogICAgKgogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgY292ZXIgMwogICAgaXRvYgogICAgZGlnIDYKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZGlnIDcKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMTA4CiAgICAvLyBpZiAoIXRoaXMuc3Rha2VzKHNrKS5leGlzdHMpIHsKICAgIGR1cAogICAgZXh0cmFjdCAwIDMyCiAgICBkaWcgMQogICAgZXh0cmFjdCAzMiA4CiAgICB1bmNvdmVyIDIKICAgIGV4dHJhY3QgNDAgMQogICAgY292ZXIgMgogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTA1CiAgICAvLyBzdGFrZXMgPSBCb3hNYXA8U3Rha2VLZXksIFN0YWtlPih7IGtleVByZWZpeDogU3Rha2luZ0JveFByZWZpeFN0YWtlcyB9KQogICAgYnl0ZWNfMCAvLyAicyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExMDgKICAgIC8vIGlmICghdGhpcy5zdGFrZXMoc2spLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogZ2V0SW5mb0xpc3RfYWZ0ZXJfaWZfZWxzZUA1CiAgICBwb3AKICAgIHVuY292ZXIgMgogICAgcG9wCiAgICBzd2FwCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMTE3CiAgICAvLyByZXN1bHRzLnB1c2goZW1wdHlTdGFrZSkKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMAogICAgcmVwbGFjZTIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMTEwLTExMTUKICAgIC8vIGNvbnN0IGVtcHR5U3Rha2U6IFN0YWtlID0gewogICAgLy8gICBhbW91bnQ6IDAsCiAgICAvLyAgIGxhc3RVcGRhdGU6IDAsCiAgICAvLyAgIGV4cGlyYXRpb246IDAsCiAgICAvLyAgIHdlaWdodGVkQWdlOiAwLAogICAgLy8gfQogICAgYnl0ZWMgMzggLy8gMHgwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwCiAgICBjb25jYXQKICAgIHN3YXAKCmdldEluZm9MaXN0X2Jsb2NrQDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExMDYKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBhc3NldHMubGVuZ3RoOyBpICs9IDEpIHsKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBiIGdldEluZm9MaXN0X3doaWxlX3RvcEAyCgpnZXRJbmZvTGlzdF9hZnRlcl9pZl9lbHNlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExMjEKICAgIC8vIHJlc3VsdHMucHVzaCh0aGlzLmNsYW1wU29mdChhZGRyZXNzLCBhc3NldHNbaV0sIHR5cGUsIHRoaXMuc3Rha2VzKHNrKS52YWx1ZSkpCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZGlnIDYKICAgIHVuY292ZXIgNAogICAgZGlnIDgKICAgIHVuY292ZXIgMwogICAgY2FsbHN1YiBjbGFtcFNvZnQKICAgIHBvcAogICAgdW5jb3ZlciAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMTIxCiAgICAvLyByZXN1bHRzLnB1c2godGhpcy5jbGFtcFNvZnQoYWRkcmVzcywgYXNzZXRzW2ldLCB0eXBlLCB0aGlzLnN0YWtlcyhzaykudmFsdWUpKQogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGl0b2IKICAgIGV4dHJhY3QgNiAwCiAgICByZXBsYWNlMiAwCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGIgZ2V0SW5mb0xpc3RfYmxvY2tANgoKZ2V0SW5mb0xpc3RfYWZ0ZXJfd2hpbGVANzoKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMTAzCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLm11c3RHZXRJbmZvTGlzdFtyb3V0aW5nXSgpIC0+IHZvaWQ6Cm11c3RHZXRJbmZvTGlzdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTEyNgogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgY292ZXIgMgogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50OAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwbiAyCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBpbnRjXzIgLy8gOAogICAgKgogICAgcHVzaGludCAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTx1aW50NjQ+CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExMjgKICAgIC8vIGNvbnN0IHJlc3VsdHM6IFN0YWtlW10gPSBbXQogICAgYnl0ZWMgMTcgLy8gMHgwMDAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExMjkKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBhc3NldHMubGVuZ3RoOyBpICs9IDEpIHsKICAgIGludGNfMCAvLyAwCgptdXN0R2V0SW5mb0xpc3Rfd2hpbGVfdG9wQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExMjkKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBhc3NldHMubGVuZ3RoOyBpICs9IDEpIHsKICAgIGR1cAogICAgZGlnIDMKICAgIDwKICAgIGJ6IG11c3RHZXRJbmZvTGlzdF9hZnRlcl93aGlsZUA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExMzAKICAgIC8vIGNvbnN0IHNrID0geyBhZGRyZXNzLCBhc3NldDogYXNzZXRzW2ldLCB0eXBlIH0KICAgIGRpZyAzCiAgICBleHRyYWN0IDIgMAogICAgZGlnIDEKICAgIGludGNfMiAvLyA4CiAgICAqCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBjb3ZlciAzCiAgICBpdG9iCiAgICBkaWcgNgogICAgc3dhcAogICAgY29uY2F0CiAgICBkaWcgNwogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExMzEKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnN0YWtlcyhzaykuZXhpc3RzLCBlcnJTdGFrZU5vdEZvdW5kKQogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIGRpZyAxCiAgICBleHRyYWN0IDMyIDgKICAgIHVuY292ZXIgMgogICAgZXh0cmFjdCA0MCAxCiAgICBjb3ZlciAyCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDUKICAgIC8vIHN0YWtlcyA9IEJveE1hcDxTdGFrZUtleSwgU3Rha2U+KHsga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4U3Rha2VzIH0pCiAgICBieXRlY18wIC8vICJzIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTEzMQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc3Rha2VzKHNrKS5leGlzdHMsIGVyclN0YWtlTm90Rm91bmQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBtdXN0R2V0SW5mb0xpc3RfYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOmVyclNuZmQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyU25mZAoKbXVzdEdldEluZm9MaXN0X2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMTMyCiAgICAvLyByZXN1bHRzLnB1c2godGhpcy5jbGFtcFNvZnQoYWRkcmVzcywgYXNzZXRzW2ldLCB0eXBlLCB0aGlzLnN0YWtlcyhzaykudmFsdWUpKQogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGRpZyA2CiAgICB1bmNvdmVyIDQKICAgIGRpZyA4CiAgICB1bmNvdmVyIDMKICAgIGNhbGxzdWIgY2xhbXBTb2Z0CiAgICBwb3AKICAgIHVuY292ZXIgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTEzMgogICAgLy8gcmVzdWx0cy5wdXNoKHRoaXMuY2xhbXBTb2Z0KGFkZHJlc3MsIGFzc2V0c1tpXSwgdHlwZSwgdGhpcy5zdGFrZXMoc2spLnZhbHVlKSkKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMAogICAgcmVwbGFjZTIgMAogICAgc3dhcAogICAgY29uY2F0CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExMjkKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBhc3NldHMubGVuZ3RoOyBpICs9IDEpIHsKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBiIG11c3RHZXRJbmZvTGlzdF93aGlsZV90b3BAMgoKbXVzdEdldEluZm9MaXN0X2FmdGVyX3doaWxlQDY6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTEyNgogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5zdGFrZUNoZWNrW3JvdXRpbmddKCkgLT4gdm9pZDoKc3Rha2VDaGVjazoKICAgIHB1c2hieXRlcyAiIgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExMzcKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXBuIDIKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIHB1c2hpbnQgMTYKICAgICoKICAgIHB1c2hpbnQgMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8c21hcnRfY29udHJhY3RzL3N0YWtpbmcvdHlwZXMudHM6OkFzc2V0Q2hlY2s+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGNvdmVyIDQKICAgIGxlbgogICAgaW50Y18xIC8vIDEKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDgKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5ib29sCiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Yml0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExMzkKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBjaGVja3MubGVuZ3RoOyBpICs9IDEpIHsKICAgIGludGNfMCAvLyAwCgpzdGFrZUNoZWNrX3doaWxlX3RvcEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMTM5CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgY2hlY2tzLmxlbmd0aDsgaSArPSAxKSB7CiAgICBkdXAKICAgIGRpZyAzCiAgICA8CiAgICBieiBzdGFrZUNoZWNrX2FmdGVyX3doaWxlQDEwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExNDAKICAgIC8vIGNvbnN0IHNrID0geyBhZGRyZXNzLCBhc3NldDogY2hlY2tzW2ldLmFzc2V0LCB0eXBlIH0KICAgIGRpZyAzCiAgICBleHRyYWN0IDIgMAogICAgZGlnIDEKICAgIHB1c2hpbnQgMTYKICAgICoKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3QzIC8vIG9uIGVycm9yOiBpbmRleCBhY2Nlc3MgaXMgb3V0IG9mIGJvdW5kcwogICAgZHVwCiAgICBjb3ZlciAyCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgYnVyeSA5CiAgICBpdG9iCiAgICBkaWcgNgogICAgc3dhcAogICAgY29uY2F0CiAgICBkaWcgNwogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExNDEKICAgIC8vIGlmICghdGhpcy5zdGFrZXMoc2spLmV4aXN0cykgewogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIGRpZyAxCiAgICBleHRyYWN0IDMyIDgKICAgIHVuY292ZXIgMgogICAgZXh0cmFjdCA0MCAxCiAgICBjb3ZlciAyCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDUKICAgIC8vIHN0YWtlcyA9IEJveE1hcDxTdGFrZUtleSwgU3Rha2U+KHsga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4U3Rha2VzIH0pCiAgICBieXRlY18wIC8vICJzIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTE0MQogICAgLy8gaWYgKCF0aGlzLnN0YWtlcyhzaykuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBzdGFrZUNoZWNrX2FmdGVyX2lmX2Vsc2VANQogICAgcG9wbiA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExNDIKICAgIC8vIHJldHVybiBmYWxzZQogICAgaW50Y18wIC8vIDAKCnN0YWtlQ2hlY2tfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLnN0YWtlQ2hlY2tAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExMzcKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYnl0ZWMgMTEgLy8gMHgwMAogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMgogICAgc2V0Yml0CiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpzdGFrZUNoZWNrX2FmdGVyX2lmX2Vsc2VANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTE0NQogICAgLy8gbGV0IGFtb3VudFRvQ2hlY2s6IHVpbnQ2NCA9IHRoaXMuY2xhbXBTb2Z0KGFkZHJlc3MsIGNoZWNrc1tpXS5hc3NldCwgdHlwZSwgdGhpcy5zdGFrZXMoc2spLnZhbHVlKS5hbW91bnQKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBkaWcgNgogICAgZGlnIDkKICAgIGRpZyA5CiAgICBkdXAKICAgIGNvdmVyIDQKICAgIHVuY292ZXIgMwogICAgY2FsbHN1YiBjbGFtcFNvZnQKICAgIHBvcAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBidXJ5IDEwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExNDYKICAgIC8vIGlmICh0eXBlID09PSBTVEFLSU5HX1RZUEVfSEVBUlRCRUFUKSB7CiAgICBieXRlYyA4IC8vIDB4MGEKICAgID09CiAgICBieiBzdGFrZUNoZWNrX2FmdGVyX2lmX2Vsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMTQ3CiAgICAvLyBhbW91bnRUb0NoZWNrID0gdGhpcy5nZXRIZWFydGJlYXRBdmVyYWdlKGFkZHJlc3MsIGNoZWNrc1tpXS5hc3NldCwgaW5jbHVkZUVzY3Jvd2VkKQogICAgZGlnIDUKICAgIGRpZyA4CiAgICBkaWcgNAogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmdldEhlYXJ0YmVhdEF2ZXJhZ2UKICAgIGJ1cnkgOQoKc3Rha2VDaGVja19hZnRlcl9pZl9lbHNlQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExNTEKICAgIC8vIGlmIChjaGVja3NbaV0uYW1vdW50ID4gYW1vdW50VG9DaGVjaykgewogICAgc3dhcAogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBkaWcgOAogICAgPgogICAgYnogc3Rha2VDaGVja19hZnRlcl9pZl9lbHNlQDkKICAgIHBvcG4gNgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMTUyCiAgICAvLyByZXR1cm4gZmFsc2UKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExMzcKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYiBzdGFrZUNoZWNrX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5zdGFrZUNoZWNrQDExCgpzdGFrZUNoZWNrX2FmdGVyX2lmX2Vsc2VAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTEzOQogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGNoZWNrcy5sZW5ndGg7IGkgKz0gMSkgewogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGIgc3Rha2VDaGVja193aGlsZV90b3BAMgoKc3Rha2VDaGVja19hZnRlcl93aGlsZUAxMDoKICAgIHBvcG4gNgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMTU2CiAgICAvLyByZXR1cm4gdHJ1ZQogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTEzNwogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBiIHN0YWtlQ2hlY2tfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLnN0YWtlQ2hlY2tAMTEKCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmdldFRvdGFsc1tyb3V0aW5nXSgpIC0+IHZvaWQ6CmdldFRvdGFsczoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTE1OQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXBuIDIKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGludGNfMiAvLyA4CiAgICAqCiAgICBwdXNoaW50IDIKICAgICsKICAgIHN3YXAKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PHVpbnQ2ND4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTE2MQogICAgLy8gY29uc3QgcmVzdWx0czogVG90YWxzSW5mb1tdID0gW10KICAgIGJ5dGVjIDE3IC8vIDB4MDAwMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMTYyCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgYXNzZXRzLmxlbmd0aDsgaSArPSAxKSB7CiAgICBpbnRjXzAgLy8gMAoKZ2V0VG90YWxzX3doaWxlX3RvcEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMTYyCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgYXNzZXRzLmxlbmd0aDsgaSArPSAxKSB7CiAgICBkdXAKICAgIGRpZyAzCiAgICA8CiAgICBieiBnZXRUb3RhbHNfYWZ0ZXJfd2hpbGVANAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMTYzCiAgICAvLyByZXN1bHRzLnB1c2godGhpcy50b3RhbHMoYXNzZXRzW2ldKS52YWx1ZSkKICAgIGRpZyAzCiAgICBleHRyYWN0IDIgMAogICAgZGlnIDEKICAgIGludGNfMiAvLyA4CiAgICAqCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdDMgLy8gb24gZXJyb3I6IGluZGV4IGFjY2VzcyBpcyBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExNgogICAgLy8gdG90YWxzID0gQm94TWFwPHVpbnQ2NCwgVG90YWxzSW5mbz4oeyBrZXlQcmVmaXg6IFN0YWtpbmdCb3hQcmVmaXhUb3RhbHMgfSkKICAgIGJ5dGVjIDcgLy8gInQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTE2MwogICAgLy8gcmVzdWx0cy5wdXNoKHRoaXMudG90YWxzKGFzc2V0c1tpXSkudmFsdWUpCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgdW5jb3ZlciAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMTYzCiAgICAvLyByZXN1bHRzLnB1c2godGhpcy50b3RhbHMoYXNzZXRzW2ldKS52YWx1ZSkKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMAogICAgcmVwbGFjZTIgMAogICAgc3dhcAogICAgY29uY2F0CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExNjIKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBhc3NldHMubGVuZ3RoOyBpICs9IDEpIHsKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBiIGdldFRvdGFsc193aGlsZV90b3BAMgoKZ2V0VG90YWxzX2FmdGVyX3doaWxlQDQ6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTE1OQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5nZXRTZXR0aW5nc1tyb3V0aW5nXSgpIC0+IHZvaWQ6CmdldFNldHRpbmdzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMTY4CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cG4gMgogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGR1cAogICAgY292ZXIgMgogICAgaW50Y18yIC8vIDgKICAgICoKICAgIHB1c2hpbnQgMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8dWludDY0PgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMTcwCiAgICAvLyBjb25zdCByZXN1bHRzOiBTZXR0aW5nc0NoZWNrW10gPSBbXQogICAgYnl0ZWMgMTcgLy8gMHgwMDAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExNzEKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBhc3NldHMubGVuZ3RoOyBpICs9IDEpIHsKICAgIGludGNfMCAvLyAwCgpnZXRTZXR0aW5nc193aGlsZV90b3BAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTE3MQogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGFzc2V0cy5sZW5ndGg7IGkgKz0gMSkgewogICAgZHVwCiAgICBkaWcgMwogICAgPAogICAgYnogZ2V0U2V0dGluZ3NfYWZ0ZXJfd2hpbGVANwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMTcyCiAgICAvLyBpZiAoIXRoaXMuc2V0dGluZ3MoYXNzZXRzW2ldKS5leGlzdHMpIHsKICAgIGRpZyAzCiAgICBleHRyYWN0IDIgMAogICAgZGlnIDEKICAgIGludGNfMiAvLyA4CiAgICAqCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdDMgLy8gb24gZXJyb3I6IGluZGV4IGFjY2VzcyBpcyBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExOAogICAgLy8gc2V0dGluZ3MgPSBCb3hNYXA8dWludDY0LCB1aW50NjQ+KHsga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4U2V0dGluZ3MgfSkKICAgIGJ5dGVjIDIyIC8vICJlIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTE3MgogICAgLy8gaWYgKCF0aGlzLnNldHRpbmdzKGFzc2V0c1tpXSkuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBnZXRTZXR0aW5nc19hZnRlcl9pZl9lbHNlQDUKICAgIHBvcAogICAgc3dhcAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTE3MwogICAgLy8gcmVzdWx0cy5wdXNoKHsgdmFsdWU6IDAsIGV4aXN0czogZmFsc2UgfSkKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMAogICAgcmVwbGFjZTIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMTczCiAgICAvLyByZXN1bHRzLnB1c2goeyB2YWx1ZTogMCwgZXhpc3RzOiBmYWxzZSB9KQogICAgYnl0ZWMgMzcgLy8gMHgwMDAwMDAwMDAwMDAwMDAwMDAKICAgIGNvbmNhdAogICAgc3dhcAoKZ2V0U2V0dGluZ3NfYmxvY2tANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTE3MQogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGFzc2V0cy5sZW5ndGg7IGkgKz0gMSkgewogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGIgZ2V0U2V0dGluZ3Nfd2hpbGVfdG9wQDIKCmdldFNldHRpbmdzX2FmdGVyX2lmX2Vsc2VANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTE3NwogICAgLy8gcmVzdWx0cy5wdXNoKHsgdmFsdWU6IHRoaXMuc2V0dGluZ3MoYXNzZXRzW2ldKS52YWx1ZSwgZXhpc3RzOiB0cnVlIH0pCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgYnRvaQogICAgaXRvYgogICAgcHVzaGJ5dGVzIDB4ODAKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMTc3CiAgICAvLyByZXN1bHRzLnB1c2goeyB2YWx1ZTogdGhpcy5zZXR0aW5ncyhhc3NldHNbaV0pLnZhbHVlLCBleGlzdHM6IHRydWUgfSkKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMAogICAgcmVwbGFjZTIgMAogICAgc3dhcAogICAgY29uY2F0CiAgICBzd2FwCiAgICBiIGdldFNldHRpbmdzX2Jsb2NrQDYKCmdldFNldHRpbmdzX2FmdGVyX3doaWxlQDc6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTE2OAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjpVcGdyYWRlYWJsZUFraXRhQmFzZUNvbnRyYWN0LnVwZGF0ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozNQogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozNwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWMgNiAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyAxOSAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM3CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIGVyck5vdEFraXRhRGFvKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGJueiB1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDIwIC8vICJFUlI6ZXJyTmRhbyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOZGFvCgp1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzgKICAgIC8vIGNvbnN0IFtwbHVnaW5zXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzUGx1Z2luQXBwTGlzdCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWMgNiAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM4CiAgICAvLyBjb25zdCBbcGx1Z2luc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1BsdWdpbkFwcExpc3QpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHB1c2hieXRlcyAicGFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM5CiAgICAvLyBjb25zdCB1cGRhdGVQbHVnaW4gPSBkZWNvZGVBcmM0PFBsdWdpbkFwcExpc3Q+KHBsdWdpbnMpLnVwZGF0ZQogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czo0MAogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbklkID09PSB1cGRhdGVQbHVnaW4sIGVyckludmFsaWRVcGdyYWRlKQogICAgZ2xvYmFsIENhbGxlckFwcGxpY2F0aW9uSUQKICAgID09CiAgICBibnogdXBkYXRlX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJJdXBnIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckl1cGcKCnVwZGF0ZV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNAogICAgLy8gdmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5VmVyc2lvbiB9KQogICAgYnl0ZWMgMjggLy8gInZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6NDEKICAgIC8vIHRoaXMudmVyc2lvbi52YWx1ZSA9IG5ld1ZlcnNpb24KICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzUKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czo6QWtpdGFCYXNlQ29udHJhY3QudXBkYXRlQWtpdGFEQU9bcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGVBa2l0YURBTzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNQogICAgLy8gdXBkYXRlQWtpdGFEQU8oYWtpdGFEQU86IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MjYKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjIDYgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWMgMTkgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNgogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogdXBkYXRlQWtpdGFEQU9fYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDIwIC8vICJFUlI6ZXJyTmRhbyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOZGFvCgp1cGRhdGVBa2l0YURBT19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjIDYgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNwogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSA9IGFraXRhREFPCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjI1CiAgICAvLyB1cGRhdGVBa2l0YURBTyhha2l0YURBTzogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLnVwZGF0ZVRvdGFscyhhc3NldDogdWludDY0LCB0eXBlOiBieXRlcywgYW1vdW50OiB1aW50NjQsIGlzQWRkOiB1aW50NjQpIC0+IHZvaWQ6CnVwZGF0ZVRvdGFsczoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTM2CiAgICAvLyBwcml2YXRlIHVwZGF0ZVRvdGFscyhhc3NldDogdWludDY0LCB0eXBlOiBTdGFraW5nVHlwZSwgYW1vdW50OiB1aW50NjQsIGlzQWRkOiBib29sZWFuKTogdm9pZCB7CiAgICBwcm90byA0IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTM3CiAgICAvLyBpZiAodHlwZSA9PT0gU1RBS0lOR19UWVBFX0hBUkQpIHsKICAgIGZyYW1lX2RpZyAtMwogICAgYnl0ZWMgNCAvLyAweDFlCiAgICA9PQogICAgYnogdXBkYXRlVG90YWxzX2Vsc2VfYm9keUA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEzOAogICAgLy8gaWYgKGlzQWRkKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ6IHVwZGF0ZVRvdGFsc19lbHNlX2JvZHlAMwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMzkKICAgIC8vIHRoaXMudG90YWxzKGFzc2V0KS52YWx1ZS5lc2Nyb3dlZCArPSBhbW91bnQKICAgIGZyYW1lX2RpZyAtNAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMTYKICAgIC8vIHRvdGFscyA9IEJveE1hcDx1aW50NjQsIFRvdGFsc0luZm8+KHsga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4VG90YWxzIH0pCiAgICBieXRlYyA3IC8vICJ0IgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEzOQogICAgLy8gdGhpcy50b3RhbHMoYXNzZXQpLnZhbHVlLmVzY3Jvd2VkICs9IGFtb3VudAogICAgZHVwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBmcmFtZV9kaWcgLTIKICAgICsKICAgIGl0b2IKICAgIGludGNfMiAvLyA4CiAgICBzd2FwCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwoKdXBkYXRlVG90YWxzX2FmdGVyX2lmX2Vsc2VAMTE6CiAgICByZXRzdWIKCnVwZGF0ZVRvdGFsc19lbHNlX2JvZHlAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTQxCiAgICAvLyB0aGlzLnRvdGFscyhhc3NldCkudmFsdWUuZXNjcm93ZWQgLT0gYW1vdW50CiAgICBmcmFtZV9kaWcgLTQKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTE2CiAgICAvLyB0b3RhbHMgPSBCb3hNYXA8dWludDY0LCBUb3RhbHNJbmZvPih7IGtleVByZWZpeDogU3Rha2luZ0JveFByZWZpeFRvdGFscyB9KQogICAgYnl0ZWMgNyAvLyAidCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxNDEKICAgIC8vIHRoaXMudG90YWxzKGFzc2V0KS52YWx1ZS5lc2Nyb3dlZCAtPSBhbW91bnQKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZnJhbWVfZGlnIC0yCiAgICAtCiAgICBpdG9iCiAgICBpbnRjXzIgLy8gOAogICAgc3dhcAogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIHJldHN1YgoKdXBkYXRlVG90YWxzX2Vsc2VfYm9keUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxNDMKICAgIC8vIH0gZWxzZSBpZiAodHlwZSA9PT0gU1RBS0lOR19UWVBFX0xPQ0spIHsKICAgIGZyYW1lX2RpZyAtMwogICAgYnl0ZWNfMiAvLyAweDI4CiAgICA9PQogICAgYnogdXBkYXRlVG90YWxzX2FmdGVyX2lmX2Vsc2VAMTEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTQ0CiAgICAvLyBpZiAoaXNBZGQpIHsKICAgIGZyYW1lX2RpZyAtMQogICAgYnogdXBkYXRlVG90YWxzX2Vsc2VfYm9keUA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjE0NQogICAgLy8gdGhpcy50b3RhbHMoYXNzZXQpLnZhbHVlLmxvY2tlZCArPSBhbW91bnQKICAgIGZyYW1lX2RpZyAtNAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMTYKICAgIC8vIHRvdGFscyA9IEJveE1hcDx1aW50NjQsIFRvdGFsc0luZm8+KHsga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4VG90YWxzIH0pCiAgICBieXRlYyA3IC8vICJ0IgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjE0NQogICAgLy8gdGhpcy50b3RhbHMoYXNzZXQpLnZhbHVlLmxvY2tlZCArPSBhbW91bnQKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZnJhbWVfZGlnIC0yCiAgICArCiAgICBpdG9iCiAgICBpbnRjXzAgLy8gMAogICAgc3dhcAogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIHJldHN1YgoKdXBkYXRlVG90YWxzX2Vsc2VfYm9keUA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxNDcKICAgIC8vIHRoaXMudG90YWxzKGFzc2V0KS52YWx1ZS5sb2NrZWQgLT0gYW1vdW50CiAgICBmcmFtZV9kaWcgLTQKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTE2CiAgICAvLyB0b3RhbHMgPSBCb3hNYXA8dWludDY0LCBUb3RhbHNJbmZvPih7IGtleVByZWZpeDogU3Rha2luZ0JveFByZWZpeFRvdGFscyB9KQogICAgYnl0ZWMgNyAvLyAidCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxNDcKICAgIC8vIHRoaXMudG90YWxzKGFzc2V0KS52YWx1ZS5sb2NrZWQgLT0gYW1vdW50CiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGZyYW1lX2RpZyAtMgogICAgLQogICAgaXRvYgogICAgaW50Y18wIC8vIDAKICAgIHN3YXAKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLnVwZGF0ZUxpdmVMb2NrZWRTdGFrZShhc3NldDogdWludDY0LCBhbW91bnQ6IHVpbnQ2NCwgaXNBZGQ6IHVpbnQ2NCkgLT4gdm9pZDoKdXBkYXRlTGl2ZUxvY2tlZFN0YWtlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxNTIKICAgIC8vIHByaXZhdGUgdXBkYXRlTGl2ZUxvY2tlZFN0YWtlKGFzc2V0OiB1aW50NjQsIGFtb3VudDogdWludDY0LCBpc0FkZDogYm9vbGVhbik6IHZvaWQgewogICAgcHJvdG8gMyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjE1MwogICAgLy8gaWYgKGlzQWRkKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ6IHVwZGF0ZUxpdmVMb2NrZWRTdGFrZV9lbHNlX2JvZHlAMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxNTQKICAgIC8vIHRoaXMudG90YWxzKGFzc2V0KS52YWx1ZS5saXZlTG9ja2VkU3Rha2UgKz0gYW1vdW50CiAgICBmcmFtZV9kaWcgLTMKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTE2CiAgICAvLyB0b3RhbHMgPSBCb3hNYXA8dWludDY0LCBUb3RhbHNJbmZvPih7IGtleVByZWZpeDogU3Rha2luZ0JveFByZWZpeFRvdGFscyB9KQogICAgYnl0ZWMgNyAvLyAidCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxNTQKICAgIC8vIHRoaXMudG90YWxzKGFzc2V0KS52YWx1ZS5saXZlTG9ja2VkU3Rha2UgKz0gYW1vdW50CiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZnJhbWVfZGlnIC0yCiAgICArCiAgICBpdG9iCiAgICBwdXNoaW50IDE2CiAgICBzd2FwCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgcmV0c3ViCgp1cGRhdGVMaXZlTG9ja2VkU3Rha2VfZWxzZV9ib2R5QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjE1NgogICAgLy8gdGhpcy50b3RhbHMoYXNzZXQpLnZhbHVlLmxpdmVMb2NrZWRTdGFrZSAtPSBhbW91bnQKICAgIGZyYW1lX2RpZyAtMwogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMTYKICAgIC8vIHRvdGFscyA9IEJveE1hcDx1aW50NjQsIFRvdGFsc0luZm8+KHsga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4VG90YWxzIH0pCiAgICBieXRlYyA3IC8vICJ0IgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjE1NgogICAgLy8gdGhpcy50b3RhbHMoYXNzZXQpLnZhbHVlLmxpdmVMb2NrZWRTdGFrZSAtPSBhbW91bnQKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBmcmFtZV9kaWcgLTIKICAgIC0KICAgIGl0b2IKICAgIHB1c2hpbnQgMTYKICAgIHN3YXAKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmNhbGN1bGF0ZVVwZGF0ZWRXZWlnaHRlZEFnZShpbmZvOiBieXRlcywgbmV3QW1vdW50OiB1aW50NjQpIC0+IHVpbnQ2NCwgYnl0ZXM6CmNhbGN1bGF0ZVVwZGF0ZWRXZWlnaHRlZEFnZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTYwCiAgICAvLyBwcml2YXRlIGNhbGN1bGF0ZVVwZGF0ZWRXZWlnaHRlZEFnZShpbmZvOiBTdGFrZSwgbmV3QW1vdW50OiB1aW50NjQpOiB1aW50NjQgewogICAgcHJvdG8gMiAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjE2MQogICAgLy8gY29uc3QgY3VycmVudEFnZTogdWludDY0ID0gaW5mby53ZWlnaHRlZEFnZSArIChHbG9iYWwubGF0ZXN0VGltZXN0YW1wIC0gaW5mby5sYXN0VXBkYXRlKQogICAgZnJhbWVfZGlnIC0yCiAgICBwdXNoaW50IDI0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgZnJhbWVfZGlnIC0yCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIC0KICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTYyCiAgICAvLyByZXR1cm4gb3AuZGl2dyguLi5vcC5tdWx3KGN1cnJlbnRBZ2UsIGluZm8uYW1vdW50KSwgbmV3QW1vdW50KQogICAgZnJhbWVfZGlnIC0yCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIG11bHcKICAgIGZyYW1lX2RpZyAtMQogICAgZGl2dwogICAgZnJhbWVfZGlnIC0yCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmdldFdlaWdodGVkQWdlKGluZm86IGJ5dGVzKSAtPiB1aW50NjQsIGJ5dGVzOgpnZXRXZWlnaHRlZEFnZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTY1CiAgICAvLyBwcml2YXRlIGdldFdlaWdodGVkQWdlKGluZm86IFN0YWtlKTogdWludDY0IHsKICAgIHByb3RvIDEgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxNjYKICAgIC8vIHJldHVybiBpbmZvLndlaWdodGVkQWdlICsgKEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgLSBpbmZvLmxhc3RVcGRhdGUpCiAgICBmcmFtZV9kaWcgLTEKICAgIHB1c2hpbnQgMjQKICAgIGV4dHJhY3RfdWludDY0CiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBmcmFtZV9kaWcgLTEKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLQogICAgKwogICAgZnJhbWVfZGlnIC0xCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmdldEFwcFdlaWdodGVkQWdlKGluZm86IGJ5dGVzLCBhY2NlcHRJbmhlcml0ZWQ6IHVpbnQ2NCkgLT4gdWludDY0LCBieXRlczoKZ2V0QXBwV2VpZ2h0ZWRBZ2U6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjE2OQogICAgLy8gcHJpdmF0ZSBnZXRBcHBXZWlnaHRlZEFnZShpbmZvOiBBcHBTdGFrZSwgYWNjZXB0SW5oZXJpdGVkOiBib29sZWFuKTogdWludDY0IHsKICAgIHByb3RvIDIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxNzAKICAgIC8vIGNvbnN0IGFnZTogdWludDY0ID0gaW5mby53ZWlnaHRlZEFnZSArIChHbG9iYWwubGF0ZXN0VGltZXN0YW1wIC0gaW5mby5sYXN0VXBkYXRlKQogICAgZnJhbWVfZGlnIC0yCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgZnJhbWVfZGlnIC0yCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIC0KICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTcxCiAgICAvLyByZXR1cm4gYWNjZXB0SW5oZXJpdGVkID8gYWdlIDogYWdlIC0gaW5mby5pbmhlcml0ZWRBZ2UKICAgIGZyYW1lX2RpZyAtMQogICAgYnogZ2V0QXBwV2VpZ2h0ZWRBZ2VfdGVybmFyeV9mYWxzZUAyCgpnZXRBcHBXZWlnaHRlZEFnZV90ZXJuYXJ5X21lcmdlQDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjE3MQogICAgLy8gcmV0dXJuIGFjY2VwdEluaGVyaXRlZCA/IGFnZSA6IGFnZSAtIGluZm8uaW5oZXJpdGVkQWdlCiAgICBmcmFtZV9kaWcgLTIKICAgIHJldHN1YgoKZ2V0QXBwV2VpZ2h0ZWRBZ2VfdGVybmFyeV9mYWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxNzEKICAgIC8vIHJldHVybiBhY2NlcHRJbmhlcml0ZWQgPyBhZ2UgOiBhZ2UgLSBpbmZvLmluaGVyaXRlZEFnZQogICAgZnJhbWVfZGlnIC0yCiAgICBwdXNoaW50IDI0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLQogICAgYiBnZXRBcHBXZWlnaHRlZEFnZV90ZXJuYXJ5X21lcmdlQDMKCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmdldEhlbGQoYWRkcmVzczogYnl0ZXMsIGFzc2V0OiB1aW50NjQpIC0+IGJ5dGVzOgpnZXRIZWxkOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxODQKICAgIC8vIHByaXZhdGUgZ2V0SGVsZChhZGRyZXNzOiBBY2NvdW50LCBhc3NldDogdWludDY0KTogeyBiYWxhbmNlOiB1aW50NjQ7IG9wdGVkSW46IGJvb2xlYW4gfSB7CiAgICBwcm90byAyIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTg1CiAgICAvLyBpZiAoYXNzZXQgPT09IDApIHsKICAgIGZyYW1lX2RpZyAtMQogICAgYm56IGdldEhlbGRfYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjE4NgogICAgLy8gcmV0dXJuIHsgYmFsYW5jZTogYWRkcmVzcy5iYWxhbmNlLCBvcHRlZEluOiB0cnVlIH0KICAgIGZyYW1lX2RpZyAtMgogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RCYWxhbmNlCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIGl0b2IKICAgIHB1c2hieXRlcyAweDgwCiAgICBjb25jYXQKICAgIHJldHN1YgoKZ2V0SGVsZF9hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjE4OQogICAgLy8gY29uc3QgW2JhbGFuY2UsIG9wdGVkSW5dID0gQXNzZXRIb2xkaW5nLmFzc2V0QmFsYW5jZShhZGRyZXNzLCBhc3NldCkKICAgIGZyYW1lX2RpZyAtMgogICAgZnJhbWVfZGlnIC0xCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTkwCiAgICAvLyByZXR1cm4geyBiYWxhbmNlLCBvcHRlZEluIH0KICAgIHN3YXAKICAgIGl0b2IKICAgIGJ5dGVjIDExIC8vIDB4MDAKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDMKICAgIHNldGJpdAogICAgY29uY2F0CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmdldEluZm9PckVtcHR5KGFkZHJlc3M6IGJ5dGVzLCBzdGFrZTogYnl0ZXMpIC0+IGJ5dGVzLCBieXRlczoKZ2V0SW5mb09yRW1wdHk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjIxMAogICAgLy8gcHJpdmF0ZSBnZXRJbmZvT3JFbXB0eShhZGRyZXNzOiBBY2NvdW50LCBzdGFrZTogU3Rha2VJbmZvKTogU3Rha2UgewogICAgcHJvdG8gMiAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjIxMQogICAgLy8gY29uc3Qgc2sgPSB7IGFkZHJlc3MsIC4uLnN0YWtlIH0KICAgIGZyYW1lX2RpZyAtMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGZyYW1lX2RpZyAtMQogICAgZXh0cmFjdCA4IDEKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICBpdG9iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtMgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjIxMgogICAgLy8gaWYgKCF0aGlzLnN0YWtlcyhzaykuZXhpc3RzKSB7CiAgICBkdXAKICAgIGV4dHJhY3QgOSAzMgogICAgZGlnIDEKICAgIGV4dHJhY3QgMCA4CiAgICB1bmNvdmVyIDIKICAgIGV4dHJhY3QgOCAxCiAgICBjb3ZlciAyCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDUKICAgIC8vIHN0YWtlcyA9IEJveE1hcDxTdGFrZUtleSwgU3Rha2U+KHsga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4U3Rha2VzIH0pCiAgICBieXRlY18wIC8vICJzIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MjEyCiAgICAvLyBpZiAoIXRoaXMuc3Rha2VzKHNrKS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGdldEluZm9PckVtcHR5X2FmdGVyX2lmX2Vsc2VAMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoyMDcKICAgIC8vIHJldHVybiB7IGFtb3VudDogMCwgbGFzdFVwZGF0ZTogMCwgZXhwaXJhdGlvbjogMCwgd2VpZ2h0ZWRBZ2U6IDAgfQogICAgYnl0ZWMgMzggLy8gMHgwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjIxMwogICAgLy8gcmV0dXJuIHRoaXMuZW1wdHlTdGFrZSgpCiAgICBmcmFtZV9kaWcgLTEKICAgIGZyYW1lX2J1cnkgMQogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCmdldEluZm9PckVtcHR5X2FmdGVyX2lmX2Vsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MjE2CiAgICAvLyByZXR1cm4gdGhpcy5jbGFtcFNvZnQoYWRkcmVzcywgc3Rha2UuYXNzZXQsIHN0YWtlLnR5cGUsIHRoaXMuc3Rha2VzKHNrKS52YWx1ZSkKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBmcmFtZV9kaWcgLTIKICAgIGNvdmVyIDMKICAgIGNhbGxzdWIgY2xhbXBTb2Z0CiAgICBwb3AKICAgIGZyYW1lX2RpZyAtMQogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5jbGFtcFNvZnQoYWRkcmVzczogYnl0ZXMsIGFzc2V0OiB1aW50NjQsIHR5cGU6IGJ5dGVzLCBpbmZvOiBieXRlcykgLT4gYnl0ZXMsIGJ5dGVzOgpjbGFtcFNvZnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjIyMwogICAgLy8gcHJpdmF0ZSBjbGFtcFNvZnQoYWRkcmVzczogQWNjb3VudCwgYXNzZXQ6IHVpbnQ2NCwgdHlwZTogU3Rha2luZ1R5cGUsIGluZm86IFN0YWtlKTogU3Rha2UgewogICAgcHJvdG8gNCAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjIyNAogICAgLy8gaWYgKHR5cGUgIT09IFNUQUtJTkdfVFlQRV9TT0ZUKSB7CiAgICBmcmFtZV9kaWcgLTIKICAgIGJ5dGVjIDUgLy8gMHgxNAogICAgIT0KICAgIGJ6IGNsYW1wU29mdF9hZnRlcl9pZl9lbHNlQDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MjI1CiAgICAvLyByZXR1cm4gaW5mbwogICAgZnJhbWVfZGlnIC0xCiAgICBkdXAKICAgIHJldHN1YgoKY2xhbXBTb2Z0X2FmdGVyX2lmX2Vsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MjI4CiAgICAvLyBjb25zdCB7IGJhbGFuY2UsIG9wdGVkSW4gfSA9IHRoaXMuZ2V0SGVsZChhZGRyZXNzLCBhc3NldCkKICAgIGZyYW1lX2RpZyAtNAogICAgZnJhbWVfZGlnIC0zCiAgICBjYWxsc3ViIGdldEhlbGQKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICBwdXNoaW50IDY0CiAgICBnZXRiaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MjI5CiAgICAvLyBjb25zdCBiYWNrZWQ6IHVpbnQ2NCA9IG9wdGVkSW4gPyBiYWxhbmNlIDogMAogICAgaW50Y18wIC8vIDAKICAgIGNvdmVyIDIKICAgIHNlbGVjdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjIzMAogICAgLy8gaWYgKGJhY2tlZCA+PSBpbmZvLmFtb3VudCkgewogICAgZnJhbWVfZGlnIC0xCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgID49CiAgICBieiBjbGFtcFNvZnRfYWZ0ZXJfaWZfZWxzZUA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjIzMQogICAgLy8gcmV0dXJuIGluZm8KICAgIGZyYW1lX2RpZyAtMQogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIHJldHN1YgoKY2xhbXBTb2Z0X2FmdGVyX2lmX2Vsc2VANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MjM0CiAgICAvLyByZXR1cm4geyBhbW91bnQ6IGJhY2tlZCwgbGFzdFVwZGF0ZTogaW5mby5sYXN0VXBkYXRlLCBleHBpcmF0aW9uOiBpbmZvLmV4cGlyYXRpb24sIHdlaWdodGVkQWdlOiAwIH0KICAgIGZyYW1lX2RpZyAtMQogICAgZXh0cmFjdCA4IDgKICAgIGZyYW1lX2RpZyAtMQogICAgZXh0cmFjdCAxNiA4CiAgICB1bmNvdmVyIDIKICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGludGNfMCAvLyAwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtMQogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5hc3NlcnRWYWxpZFN0YWtlVHlwZSh0eXBlOiBieXRlcykgLT4gdm9pZDoKYXNzZXJ0VmFsaWRTdGFrZVR5cGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjIzNwogICAgLy8gcHJpdmF0ZSBhc3NlcnRWYWxpZFN0YWtlVHlwZSh0eXBlOiBTdGFraW5nVHlwZSk6IHZvaWQgewogICAgcHJvdG8gMSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjIzOQogICAgLy8gdHlwZSA9PT0gU1RBS0lOR19UWVBFX0hFQVJUQkVBVCB8fAogICAgZnJhbWVfZGlnIC0xCiAgICBieXRlYyA4IC8vIDB4MGEKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjIzOS0yNDAKICAgIC8vIHR5cGUgPT09IFNUQUtJTkdfVFlQRV9IRUFSVEJFQVQgfHwKICAgIC8vIHR5cGUgPT09IFNUQUtJTkdfVFlQRV9TT0ZUIHx8CiAgICBibnogYXNzZXJ0VmFsaWRTdGFrZVR5cGVfYm9vbF90cnVlQDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MjQwCiAgICAvLyB0eXBlID09PSBTVEFLSU5HX1RZUEVfU09GVCB8fAogICAgZnJhbWVfZGlnIC0xCiAgICBieXRlYyA1IC8vIDB4MTQKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjIzOS0yNDAKICAgIC8vIHR5cGUgPT09IFNUQUtJTkdfVFlQRV9IRUFSVEJFQVQgfHwKICAgIC8vIHR5cGUgPT09IFNUQUtJTkdfVFlQRV9TT0ZUIHx8CiAgICBibnogYXNzZXJ0VmFsaWRTdGFrZVR5cGVfYm9vbF90cnVlQDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MjQxCiAgICAvLyB0eXBlID09PSBTVEFLSU5HX1RZUEVfSEFSRCB8fAogICAgZnJhbWVfZGlnIC0xCiAgICBieXRlYyA0IC8vIDB4MWUKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjIzOS0yNDEKICAgIC8vIHR5cGUgPT09IFNUQUtJTkdfVFlQRV9IRUFSVEJFQVQgfHwKICAgIC8vIHR5cGUgPT09IFNUQUtJTkdfVFlQRV9TT0ZUIHx8CiAgICAvLyB0eXBlID09PSBTVEFLSU5HX1RZUEVfSEFSRCB8fAogICAgYm56IGFzc2VydFZhbGlkU3Rha2VUeXBlX2Jvb2xfdHJ1ZUA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjI0MgogICAgLy8gdHlwZSA9PT0gU1RBS0lOR19UWVBFX0xPQ0ssCiAgICBmcmFtZV9kaWcgLTEKICAgIGJ5dGVjXzIgLy8gMHgyOAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MjM5LTI0MgogICAgLy8gdHlwZSA9PT0gU1RBS0lOR19UWVBFX0hFQVJUQkVBVCB8fAogICAgLy8gdHlwZSA9PT0gU1RBS0lOR19UWVBFX1NPRlQgfHwKICAgIC8vIHR5cGUgPT09IFNUQUtJTkdfVFlQRV9IQVJEIHx8CiAgICAvLyB0eXBlID09PSBTVEFLSU5HX1RZUEVfTE9DSywKICAgIGJ6IGFzc2VydFZhbGlkU3Rha2VUeXBlX2Jvb2xfZmFsc2VANQoKYXNzZXJ0VmFsaWRTdGFrZVR5cGVfYm9vbF90cnVlQDQ6CiAgICBpbnRjXzEgLy8gMQoKYXNzZXJ0VmFsaWRTdGFrZVR5cGVfYm9vbF9tZXJnZUA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoyMzgtMjQ0CiAgICAvLyBsb2dnZWRBc3NlcnQoCiAgICAvLyAgIHR5cGUgPT09IFNUQUtJTkdfVFlQRV9IRUFSVEJFQVQgfHwKICAgIC8vICAgdHlwZSA9PT0gU1RBS0lOR19UWVBFX1NPRlQgfHwKICAgIC8vICAgdHlwZSA9PT0gU1RBS0lOR19UWVBFX0hBUkQgfHwKICAgIC8vICAgdHlwZSA9PT0gU1RBS0lOR19UWVBFX0xPQ0ssCiAgICAvLyAgIGVyckludmFsaWRTdGFrZVR5cGUKICAgIC8vICkKICAgIGJueiBhc3NlcnRWYWxpZFN0YWtlVHlwZV9hZnRlcl9hc3NlcnRAOAogICAgcHVzaGJ5dGVzICJFUlI6ZXJySXN0cCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJc3RwCgphc3NlcnRWYWxpZFN0YWtlVHlwZV9hZnRlcl9hc3NlcnRAODoKICAgIHJldHN1YgoKYXNzZXJ0VmFsaWRTdGFrZVR5cGVfYm9vbF9mYWxzZUA1OgogICAgaW50Y18wIC8vIDAKICAgIGIgYXNzZXJ0VmFsaWRTdGFrZVR5cGVfYm9vbF9tZXJnZUA2CgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5nZXRXZWlnaHRlZFN0YWtlRm9yQXBwKGFkZHJlc3M6IGJ5dGVzLCBhc3NldDogdWludDY0LCBhcHA6IHVpbnQ2NCwgYWNjZXB0SW5oZXJpdGVkOiB1aW50NjQpIC0+IGJ5dGVzOgpnZXRXZWlnaHRlZFN0YWtlRm9yQXBwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo5MjAtOTI1CiAgICAvLyBwcml2YXRlIGdldFdlaWdodGVkU3Rha2VGb3JBcHAoCiAgICAvLyAgIGFkZHJlc3M6IEFjY291bnQsCiAgICAvLyAgIGFzc2V0OiB1aW50NjQsCiAgICAvLyAgIGFwcDogdWludDY0LAogICAgLy8gICBhY2NlcHRJbmhlcml0ZWQ6IGJvb2xlYW4KICAgIC8vICk6IFdlaWdodGVkU3Rha2UgewogICAgcHJvdG8gNCAxCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo5MjYKICAgIC8vIGxldCB0b3RhbEFtb3VudDogdWludDY0ID0gMAogICAgZHVwbiA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjkyNwogICAgLy8gbGV0IHRvdGFsV2VpZ2h0ZWRBZ2UgPSBCaWdVaW50KDApCiAgICBwdXNoYnl0ZXMgMHgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OTI5CiAgICAvLyBjb25zdCBzb2Z0S2V5OiBTdGFrZUtleSA9IHsgYWRkcmVzcywgYXNzZXQsIHR5cGU6IFNUQUtJTkdfVFlQRV9TT0ZUIH0KICAgIGZyYW1lX2RpZyAtMwogICAgaXRvYgogICAgZnJhbWVfZGlnIC00CiAgICBkaWcgMQogICAgY29uY2F0CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGJ5dGVjIDUgLy8gMHgxNAogICAgY29uY2F0CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjkzMAogICAgLy8gY29uc3QgYXBwS2V5OiBBcHBTdGFrZUtleSA9IHsgYXBwLCBhZGRyZXNzLCBhc3NldCB9CiAgICBmcmFtZV9kaWcgLTIKICAgIGl0b2IKICAgIGZyYW1lX2RpZyAtNAogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OTMxCiAgICAvLyBjb25zdCBoZWxkID0gdGhpcy5nZXRIZWxkKGFkZHJlc3MsIGFzc2V0KQogICAgZnJhbWVfZGlnIC00CiAgICBmcmFtZV9kaWcgLTMKICAgIGNhbGxzdWIgZ2V0SGVsZAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo5MzIKICAgIC8vIGlmIChhcHAgPT09IDApIHsKICAgIGZyYW1lX2RpZyAtMgogICAgYm56IGdldFdlaWdodGVkU3Rha2VGb3JBcHBfZWxzZV9ib2R5QDcKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDUKICAgIC8vIHN0YWtlcyA9IEJveE1hcDxTdGFrZUtleSwgU3Rha2U+KHsga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4U3Rha2VzIH0pCiAgICBieXRlY18wIC8vICJzIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo5MzMKICAgIC8vIGlmICh0aGlzLnN0YWtlcyhzb2Z0S2V5KS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogZ2V0V2VpZ2h0ZWRTdGFrZUZvckFwcF9hZnRlcl9pZl9lbHNlQDEzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjkzNAogICAgLy8gY29uc3QgaW5mbyA9IGNsb25lKHRoaXMuc3Rha2VzKHNvZnRLZXkpLnZhbHVlKQogICAgZnJhbWVfZGlnIDIKICAgIGJveF9nZXQKICAgIHN3YXAKICAgIGZyYW1lX2J1cnkgMAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OTM1CiAgICAvLyBpZiAoaGVsZC5vcHRlZEluICYmIGhlbGQuYmFsYW5jZSA+PSBpbmZvLmFtb3VudCkgewogICAgZnJhbWVfZGlnIDgKICAgIHB1c2hpbnQgNjQKICAgIGdldGJpdAogICAgYnogZ2V0V2VpZ2h0ZWRTdGFrZUZvckFwcF9hZnRlcl9pZl9lbHNlQDEzCiAgICBmcmFtZV9kaWcgOAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBmcmFtZV9kaWcgMAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICA+PQogICAgYnogZ2V0V2VpZ2h0ZWRTdGFrZUZvckFwcF9hZnRlcl9pZl9lbHNlQDEzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjkzNgogICAgLy8gY29uc3QgYWdlID0gdGhpcy5nZXRXZWlnaHRlZEFnZShpbmZvKQogICAgZnJhbWVfZGlnIDAKICAgIGNhbGxzdWIgZ2V0V2VpZ2h0ZWRBZ2UKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OTM3CiAgICAvLyB0b3RhbEFtb3VudCArPSBpbmZvLmFtb3VudAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgNgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo5MzgKICAgIC8vIHRvdGFsV2VpZ2h0ZWRBZ2UgKz0gQmlnVWludChpbmZvLmFtb3VudCkgKiBCaWdVaW50KGFnZSkKICAgIGl0b2IKICAgIHN3YXAKICAgIGl0b2IKICAgIGIqCiAgICBmcmFtZV9idXJ5IDcKCmdldFdlaWdodGVkU3Rha2VGb3JBcHBfYWZ0ZXJfaWZfZWxzZUAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OTUyCiAgICAvLyBjb25zdCBoYXJkS2V5OiBTdGFrZUtleSA9IHsgYWRkcmVzcywgYXNzZXQsIHR5cGU6IFNUQUtJTkdfVFlQRV9IQVJEIH0KICAgIGR1cAogICAgYnl0ZWMgNCAvLyAweDFlCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTA1CiAgICAvLyBzdGFrZXMgPSBCb3hNYXA8U3Rha2VLZXksIFN0YWtlPih7IGtleVByZWZpeDogU3Rha2luZ0JveFByZWZpeFN0YWtlcyB9KQogICAgYnl0ZWNfMCAvLyAicyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBmcmFtZV9idXJ5IDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OTUzCiAgICAvLyBpZiAodGhpcy5zdGFrZXMoaGFyZEtleSkuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGdldFdlaWdodGVkU3Rha2VGb3JBcHBfYWZ0ZXJfaWZfZWxzZUAxNQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo5NTQKICAgIC8vIGNvbnN0IGluZm8gPSBjbG9uZSh0aGlzLnN0YWtlcyhoYXJkS2V5KS52YWx1ZSkKICAgIGZyYW1lX2RpZyA0CiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo5NTUKICAgIC8vIGNvbnN0IGFnZSA9IHRoaXMuZ2V0V2VpZ2h0ZWRBZ2UoaW5mbykKICAgIGNhbGxzdWIgZ2V0V2VpZ2h0ZWRBZ2UKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OTU2CiAgICAvLyB0b3RhbEFtb3VudCArPSBpbmZvLmFtb3VudAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBmcmFtZV9kaWcgNgogICAgZGlnIDEKICAgICsKICAgIGZyYW1lX2J1cnkgNgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo5NTcKICAgIC8vIHRvdGFsV2VpZ2h0ZWRBZ2UgKz0gQmlnVWludChpbmZvLmFtb3VudCkgKiBCaWdVaW50KGFnZSkKICAgIGl0b2IKICAgIHN3YXAKICAgIGl0b2IKICAgIGIqCiAgICBmcmFtZV9kaWcgNwogICAgYisKICAgIGZyYW1lX2J1cnkgNwoKZ2V0V2VpZ2h0ZWRTdGFrZUZvckFwcF9hZnRlcl9pZl9lbHNlQDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo5NjAKICAgIC8vIGNvbnN0IGxvY2tLZXk6IFN0YWtlS2V5ID0geyBhZGRyZXNzLCBhc3NldCwgdHlwZTogU1RBS0lOR19UWVBFX0xPQ0sgfQogICAgYnl0ZWNfMiAvLyAweDI4CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTA1CiAgICAvLyBzdGFrZXMgPSBCb3hNYXA8U3Rha2VLZXksIFN0YWtlPih7IGtleVByZWZpeDogU3Rha2luZ0JveFByZWZpeFN0YWtlcyB9KQogICAgYnl0ZWNfMCAvLyAicyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBmcmFtZV9idXJ5IDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OTYxCiAgICAvLyBpZiAodGhpcy5zdGFrZXMobG9ja0tleSkuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGdldFdlaWdodGVkU3Rha2VGb3JBcHBfYWZ0ZXJfaWZfZWxzZUAxNwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo5NjIKICAgIC8vIGNvbnN0IGluZm8gPSBjbG9uZSh0aGlzLnN0YWtlcyhsb2NrS2V5KS52YWx1ZSkKICAgIGZyYW1lX2RpZyA1CiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo5NjMKICAgIC8vIGNvbnN0IGFnZSA9IHRoaXMuZ2V0V2VpZ2h0ZWRBZ2UoaW5mbykKICAgIGNhbGxzdWIgZ2V0V2VpZ2h0ZWRBZ2UKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OTY0CiAgICAvLyB0b3RhbEFtb3VudCArPSBpbmZvLmFtb3VudAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBmcmFtZV9kaWcgNgogICAgZGlnIDEKICAgICsKICAgIGZyYW1lX2J1cnkgNgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo5NjUKICAgIC8vIHRvdGFsV2VpZ2h0ZWRBZ2UgKz0gQmlnVWludChpbmZvLmFtb3VudCkgKiBCaWdVaW50KGFnZSkKICAgIGl0b2IKICAgIHN3YXAKICAgIGl0b2IKICAgIGIqCiAgICBmcmFtZV9kaWcgNwogICAgYisKICAgIGZyYW1lX2J1cnkgNwoKZ2V0V2VpZ2h0ZWRTdGFrZUZvckFwcF9hZnRlcl9pZl9lbHNlQDE3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo5NjgKICAgIC8vIGlmICh0b3RhbEFtb3VudCA9PT0gMCkgewogICAgZnJhbWVfZGlnIDYKICAgIGJueiBnZXRXZWlnaHRlZFN0YWtlRm9yQXBwX2FmdGVyX2lmX2Vsc2VAMTkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OTY5CiAgICAvLyByZXR1cm4geyBhbW91bnQ6IDAsIHdlaWdodGVkQWdlOiAwIH0KICAgIGJ5dGVjIDM2IC8vIDB4MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpnZXRXZWlnaHRlZFN0YWtlRm9yQXBwX2FmdGVyX2lmX2Vsc2VAMTk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjk3OAogICAgLy8gd2VpZ2h0ZWRBZ2U6IG9wLmJ0b2koQnl0ZXModG90YWxXZWlnaHRlZEFnZSAvIEJpZ1VpbnQodG90YWxBbW91bnQpKSksCiAgICBmcmFtZV9kaWcgNgogICAgaXRvYgogICAgZnJhbWVfZGlnIDcKICAgIGRpZyAxCiAgICBiLwogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo5NzItOTc5CiAgICAvLyByZXR1cm4gewogICAgLy8gICBhbW91bnQ6IHRvdGFsQW1vdW50LAogICAgLy8gICAvLyBCaWdVaW50IHZhbHVlcyB1c2UgYSB2YXJpYWJsZS1sZW5ndGggYmlnLWVuZGlhbiBlbmNvZGluZy4gVGhlIHdlaWdodGVkCiAgICAvLyAgIC8vIGF2ZXJhZ2UgaXMgYm91bmRlZCBieSB1aW50NjQgYmVjYXVzZSBldmVyeSBjb250cmlidXRpbmcgYWdlIGlzIHVpbnQ2NCwKICAgIC8vICAgLy8gc28gZGVjb2RlIHRoZSBxdW90aWVudCBkaXJlY3RseSBpbnN0ZWFkIG9mIHNsaWNpbmcgYXMgaWYgaXQgd2VyZSBhCiAgICAvLyAgIC8vIGZpeGVkIDY0LWJ5dGUgdmFsdWUuCiAgICAvLyAgIHdlaWdodGVkQWdlOiBvcC5idG9pKEJ5dGVzKHRvdGFsV2VpZ2h0ZWRBZ2UgLyBCaWdVaW50KHRvdGFsQW1vdW50KSkpLAogICAgLy8gfQogICAgaXRvYgogICAgY29uY2F0CiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKZ2V0V2VpZ2h0ZWRTdGFrZUZvckFwcF9lbHNlX2JvZHlANzoKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDkKICAgIC8vIGFwcFN0YWtlcyA9IEJveE1hcDxBcHBTdGFrZUtleSwgQXBwU3Rha2U+KHsga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4QXBwU3Rha2VzIH0pCiAgICBieXRlYyAxNCAvLyAiYSIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBmcmFtZV9idXJ5IDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OTQyCiAgICAvLyBpZiAodGhpcy5hcHBTdGFrZXMoYXBwS2V5KS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogZ2V0V2VpZ2h0ZWRTdGFrZUZvckFwcF9hZnRlcl9pZl9lbHNlQDEzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjk0MwogICAgLy8gY29uc3QgaW5mbyA9IGNsb25lKHRoaXMuYXBwU3Rha2VzKGFwcEtleSkudmFsdWUpCiAgICBmcmFtZV9kaWcgMwogICAgYm94X2dldAogICAgc3dhcAogICAgZnJhbWVfYnVyeSAxCiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo5NDQKICAgIC8vIGlmIChoZWxkLm9wdGVkSW4gJiYgaGVsZC5iYWxhbmNlID49IGluZm8uYW1vdW50KSB7CiAgICBmcmFtZV9kaWcgOAogICAgcHVzaGludCA2NAogICAgZ2V0Yml0CiAgICBieiBnZXRXZWlnaHRlZFN0YWtlRm9yQXBwX2FmdGVyX2lmX2Vsc2VAMTMKICAgIGZyYW1lX2RpZyA4CiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGZyYW1lX2RpZyAxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgID49CiAgICBieiBnZXRXZWlnaHRlZFN0YWtlRm9yQXBwX2FmdGVyX2lmX2Vsc2VAMTMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OTQ1CiAgICAvLyBjb25zdCBhZ2UgPSB0aGlzLmdldEFwcFdlaWdodGVkQWdlKGluZm8sIGFjY2VwdEluaGVyaXRlZCkKICAgIGZyYW1lX2RpZyAxCiAgICBmcmFtZV9kaWcgLTEKICAgIGNhbGxzdWIgZ2V0QXBwV2VpZ2h0ZWRBZ2UKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OTQ2CiAgICAvLyB0b3RhbEFtb3VudCArPSBpbmZvLmFtb3VudAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgNgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo5NDcKICAgIC8vIHRvdGFsV2VpZ2h0ZWRBZ2UgKz0gQmlnVWludChpbmZvLmFtb3VudCkgKiBCaWdVaW50KGFnZSkKICAgIGl0b2IKICAgIHN3YXAKICAgIGl0b2IKICAgIGIqCiAgICBmcmFtZV9idXJ5IDcKICAgIGIgZ2V0V2VpZ2h0ZWRTdGFrZUZvckFwcF9hZnRlcl9pZl9lbHNlQDEzCgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5nZXRIZWFydGJlYXRBdmVyYWdlKGFkZHJlc3M6IGJ5dGVzLCBhc3NldDogdWludDY0LCBpbmNsdWRlRXNjcm93ZWQ6IHVpbnQ2NCkgLT4gdWludDY0OgpzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmdldEhlYXJ0YmVhdEF2ZXJhZ2U6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwNDUtMTA0NgogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICAvLyBnZXRIZWFydGJlYXRBdmVyYWdlKGFkZHJlc3M6IEFjY291bnQsIGFzc2V0OiB1aW50NjQsIGluY2x1ZGVFc2Nyb3dlZDogYm9vbGVhbik6IHVpbnQ2NCB7CiAgICBwcm90byAzIDEKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwNDcKICAgIC8vIGNvbnN0IGhiayA9IHsgYWRkcmVzcywgYXNzZXQgfQogICAgZnJhbWVfZGlnIC0yCiAgICBpdG9iCiAgICBmcmFtZV9kaWcgLTMKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDQ5CiAgICAvLyBpZiAoIXRoaXMuaGVhcnRiZWF0cyhoYmspLmV4aXN0cykgewogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIHN3YXAKICAgIGV4dHJhY3QgMzIgOAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExMi0xMTQKICAgIC8vIGhlYXJ0YmVhdHMgPSBCb3hNYXA8SGVhcnRiZWF0S2V5LCBhcmM0LlN0YXRpY0FycmF5PGFyYzRIZWFydGJlYXQsIDQ+Pih7CiAgICAvLyAgIGtleVByZWZpeDogU3Rha2luZ0JveFByZWZpeEhlYXJ0YmVhdHMsCiAgICAvLyB9KQogICAgYnl0ZWMgOSAvLyAiaCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwNDkKICAgIC8vIGlmICghdGhpcy5oZWFydGJlYXRzKGhiaykuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmdldEhlYXJ0YmVhdEF2ZXJhZ2VfYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwNTAKICAgIC8vIHJldHVybiAwCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCnNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuZ2V0SGVhcnRiZWF0QXZlcmFnZV9hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwNTMKICAgIC8vIGNvbnN0IGhlYXJ0YmVhdHMgPSBjbG9uZSh0aGlzLmhlYXJ0YmVhdHMoaGJrKS52YWx1ZSkKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwNTUKICAgIC8vIGxldCB0b3RhbDogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTA1Ni0xMDU3CiAgICAvLyBsZXQgY291bnQ6IHVpbnQ2NCA9IDAKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBoZWFydGJlYXRzLmxlbmd0aDsgaSArPSAxKSB7CiAgICBkdXBuIDIKCnNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuZ2V0SGVhcnRiZWF0QXZlcmFnZV93aGlsZV90b3BAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTA1NwogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGhlYXJ0YmVhdHMubGVuZ3RoOyBpICs9IDEpIHsKICAgIGR1cAogICAgcHVzaGludCA0CiAgICA8CiAgICBieiBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmdldEhlYXJ0YmVhdEF2ZXJhZ2VfYWZ0ZXJfd2hpbGVAMTAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTA1OAogICAgLy8gaWYgKGhlYXJ0YmVhdHNbaV0udGltZXN0YW1wLmFzVWludDY0KCkgPiAwKSB7CiAgICBkdXAKICAgIGludGNfMyAvLyAzMgogICAgKgogICAgZGlnIDQKICAgIHN3YXAKICAgIGludGNfMyAvLyAzMgogICAgZXh0cmFjdDMgLy8gb24gZXJyb3I6IGluZGV4IGFjY2VzcyBpcyBvdXQgb2YgYm91bmRzCiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMAogICAgcHVzaGludCAyNAogICAgZXh0cmFjdF91aW50NjQKICAgIGJ6IHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuZ2V0SGVhcnRiZWF0QXZlcmFnZV9hZnRlcl9pZl9lbHNlQDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTA1OQogICAgLy8gY291bnQgKz0gMQogICAgc3dhcAogICAgaW50Y18xIC8vIDEKICAgICsKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTA2MAogICAgLy8gaWYgKGluY2x1ZGVFc2Nyb3dlZCkgewogICAgZnJhbWVfZGlnIC0xCiAgICBieiBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmdldEhlYXJ0YmVhdEF2ZXJhZ2VfZWxzZV9ib2R5QDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTA2MQogICAgLy8gdG90YWwgKz0gaGVhcnRiZWF0c1tpXS5oZWxkLmFzVWludDY0KCkgKyBoZWFydGJlYXRzW2ldLmhhcmQuYXNVaW50NjQoKSArIGhlYXJ0YmVhdHNbaV0ubG9jay5hc1VpbnQ2NCgpCiAgICBmcmFtZV9kaWcgMAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGRpZyAxCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgICsKICAgIHN3YXAKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICArCiAgICB1bmNvdmVyIDMKICAgICsKICAgIGNvdmVyIDIKCnNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuZ2V0SGVhcnRiZWF0QXZlcmFnZV9hZnRlcl9pZl9lbHNlQDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwNTcKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBoZWFydGJlYXRzLmxlbmd0aDsgaSArPSAxKSB7CiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgYiBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmdldEhlYXJ0YmVhdEF2ZXJhZ2Vfd2hpbGVfdG9wQDMKCnNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuZ2V0SGVhcnRiZWF0QXZlcmFnZV9lbHNlX2JvZHlANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTA2MwogICAgLy8gdG90YWwgKz0gaGVhcnRiZWF0c1tpXS5oZWxkLmFzVWludDY0KCkKICAgIGZyYW1lX2RpZyAwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIHVuY292ZXIgMwogICAgKwogICAgY292ZXIgMgogICAgYiBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmdldEhlYXJ0YmVhdEF2ZXJhZ2VfYWZ0ZXJfaWZfZWxzZUA5CgpzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmdldEhlYXJ0YmVhdEF2ZXJhZ2VfYWZ0ZXJfd2hpbGVAMTA6CiAgICBwb3AKICAgIHVuY292ZXIgMgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwNjgKICAgIC8vIGlmIChjb3VudCA9PT0gMCkgewogICAgZHVwCiAgICBibnogc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5nZXRIZWFydGJlYXRBdmVyYWdlX2FmdGVyX2lmX2Vsc2VAMTIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTA2OQogICAgLy8gcmV0dXJuIDAKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5nZXRIZWFydGJlYXRBdmVyYWdlX2FmdGVyX2lmX2Vsc2VAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwNzIKICAgIC8vIHJldHVybiB0b3RhbCAvIGNvdW50CiAgICAvCiAgICBzd2FwCiAgICByZXRzdWIK", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyAJAAEIIOT6AbieBtSQAtTeAYDnhA8mJwFzBBUffHUBKAtFUlI6ZXJySXBheQEeARQJYWtpdGFfZGFvAXQBCgFoC0VSUjplcnJJYWFtAQALRVJSOmVyckliYWwLRVJSOmVyclNuZXgBYQtFUlI6ZXJySXBtcgtFUlI6ZXJySXBtYQIAAAtFUlI6ZXJyTm9wdAZ3YWxsZXQLRVJSOmVyck5kYW+AAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWULRVJSOmVyck5sY2sLRVJSOmVyckhibmYLRVJSOmVyckFjcnELRVJSOmVyck5jbHMLRVJSOmVyck5ya3kHdmVyc2lvbgl0AAAAAAAAAAAYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC0VSUjplcnJCZXhwC0VSUjplcnJIYmN1C0VSUjplcnJCZXh1C0VSUjplcnJMb2NrGWhlYXJ0YmVhdF9tYW5hZ2VyX2FkZHJlc3MQAAAAAAAAAAAAAAAAAAAAAAkAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACABOqRgN02GgCOAQEyMRkURDEYQQEbgicEg/FHSAQ5Tq6yBIJWzxkEIEZ7kwSDBIDzBMQooScEyBc8oQShADOfBA0DfIkEW/3oAgRdnRQoBOkQPE8ECVycpQQVWkZ6BG63cHgEWdVM4QQiNaaDBGywDn0EoUd7cwSfT1Z0BHXROPsE1AFirwTqfalVBLtsNygESHFvGgTvGKSWBPrX+BcETIjqzgTq5l8SBN1EqEMExv0MpQSK4ma5BCY1FI0EPgC5lASd/0BgBE/DFsoEiueJnwQz6SyUBIVN7eA2GgCOJwC/APQBXQNMBjwHXAfACOkJfwrMC3IMgwynDOUNRw3DDgkOFg5WDpAO4w85D1QPqA/EEEUQeBEREZARxRH4Eh0SthNYE/IUthUAFbwAAQAjQ4AEzZrWfjYaAI4BAIoAMRmBBBIxGBBEQhVOigEAi/84CTIDEkAABCcasACL/zggMgMSQAAEJxuwAImKAwCL/ov/E0EAC4v9AYABJExQi/6/iYoDAYv9AYABJExQSb5AAAqL/xaL/kxQjACJTLxIi/8hBwhLAXMARQFAAAdJMgEPQQAQI0EABUxMFlCJRQGL/kL/9SJC/+02GgFJIlmBAghLARUSRFcCADYaAkkVJBJEFyccTwJnJwZMZyNDMQAyCRJAAA+AC0VSUjplcnJOY3JlsAAnHb1FAUEAD4ALRVJSOmVyckluaXSwACcdJx6/I0MxFiMJSTgQIxJENhoBSRUkEkQXSTIKTHAARQFBAA+AC0VSUjplcnJBb3B0sACB1HoyEAhLAjgHMgoSQAADK7AATwI4CBJAAAMrsACxMgpLAbIRIrISshSBBLIQIrIBsxYnB0xQJx6/I0OAADEWIwlHAjgQIxJENhoBSU4DSRUjEkQ2GgJJFSQSRBdOBDYaA0kVJBJEF0lOBUsBiBXzTwKI/odJMgcNTgQyByEICA5OBUkqEk4CJwQSQAAFSwFBAZQjMgdOBE8FQQAFSwZAAAVLAkABfCNAAAQnH7AAMQAiFklOB1BLBFAoTFBJTge9RQFAALpLATgASU4JMQASIQciTwJNTgRBAEpJOAcyChJAAAMrsAA4CEsKIQQITwQIEkAAAyuwACJPAksJI4gTv0EAByJLByOIFCFLBhZMFlBPAxZQTFBLAUy/MQBMTgKI/fkjQ0UBTCcIEkEAKUk4BzIKEkAAAyuwADgIIQVPAggSQAADK7AAMQBLAlAnCUxQJxW/Qv+0MQBzAERLCQ9AAAQnDLAASTgHMgoSQAADK7AAOAghBE8CCBJA/44rsABPBUhLAycIE0AABCcgsABLBb5MSU4CTgZESYEQW0lOAkUNIltLCwhOBEsJDkAABUsCQABrI0AABCchsABBAE1JOAcyChJAAAQnD7AAOAhLCRJAAAQnELAAIk8DSwkjiBLfQQAQSwcUSwdLAk8CTSJMI4gTOElOAogTZkhMFk8CFlBPAxZQTBZQv0L/F0YCRQExAHMAREsBD0D/2ScMsAAiQv+SIkL+gSJC/mkigABHAjEWgQIJRwI4ECMSRDEWIwlJTgJJOBCBBBJENhoBSU4FSRUjEkQ2GgJJFSQSRBdOBjYaA0kVJBJEF04GiBP1TIj8ijEATDgAEkAAD4ALRVJSOmVycklwbXOwAEk4EzIDEkAAD4ALRVJSOmVyck5jbHewAEk4FTIDEkAABCcasABJOCAyAxJAAAQnG7AAMgdLBElPAg1OBTIHIQgIDkUHSTgRSUUKFkknFkxQSUUMvUUBQQANMgdLC75EFwhLBQ9FCEsDSSoSTgUnBBJAAAVLBEECFSMyB04FTwhBAAVLCUAABUsGQAH9I0AABCcfsAAxAEsCUEsFUChMUElOCb1FAUABEUsDOABJTgoxABIhByJPAk1OBUEAZ0hLATgHMgoSQAAEJw+wAEw4CCEETwQIEkAABCcQsABJOBQyChJAAAQnCrAAOBJLBxJAAAQnCrAASwlMSwcjiBE4TEEACEsHSwUjiBGYSwQWTBZQTBZQIhZQSwFMvzEATE4CiPtwI0NPBkhPAycIEkEASzEASwxwAEAABCcSsABAAAQnCrAASwI4BzIKEkAABCcPsABPAjgIIQVPBAgSQAAEJxCwAEw4EkEABCcKsAAxAExQJwlMUCcVv0L/kEgxAEsLcABAAAQnErAASwgPQAAEJwywAEsBOAcyChJAAAQnD7AATDgIIQRPAwgSQAAEJxCwADgSQf9VJwqwAEUBSwMnCBNAAAQnILAASwe+TElOAk4GREmBEFtJTgJFDiJbSwsITgVLCQ5AAAVLB0AAmSNAAAQnIbAASwI4BzIKEkAABCcPsABPAjgIQQAEJxCwAEEAUEk4FDIKEkAABCcKsAA4EksIEkAABCcKsABLCkxLCCOIEARPA0EAEUsHFEsGSwJPAk1LCUwjiBBaSU4CiBCISEwWTwIWUE8CFlBMFlC/Qv7CRQFPBEgxAEsKcABAAAQnErAASwIPQAAEJwywADgSQf/HJwqwACJC/2QiQv4AIkL96IAASTYaAUkVJBJEFzYaAkcCFSMSRCcEEkAABkkqEkEA+yNAAA+AC0VSUjplcnJXaG9ssAAxAEsCFlBLAVBJVwAgSwFXIAhPAlcoAU4CUExQKExQSb1FAUAABCcXsABJvkRJgRBbRQUiW0UFSwEqE0AACEsDMgcMQQCeI0AABCcisABJMQAhBIj5jklXACBOAyVbTEsEQABBSwMxABJBADlPA0ixMQBLBk8DCLIIsgcjshAisgGzSwJPAklOAksGIogO4ioSQQANSwJBAAhLAUsEIogPPLxII0NLBEAAIrExAEsHsgiyByOyECKyAbOxTLIITwKyByOyECKyAbNC/7axMQBLBbIRSweyErIUgQSyECKyAbNC/9YiQv9fIkL/AoAANhoBSRUlEkQ2GgJJFSQSRBdJTgIWUCpQKExQSb1FAUAAD0YCIicLIk8CVClMULAjQ0m+TElPAkSBEFtJRQVBAAhLAzIHD0EABkYDIkL/1iJbTwJMIogOlyIWgRBMuyNC/8MiRwWAAEcDNhoBSRUlEkQ2GgJJFSQSRBcxACInI2VEEkAAD4ALRVJSOmVyck5oYm2wAEkWSwJMUElOA0lXACBMVyAIUCcJTFBJRQy9RQFAAAQnGLAAMgcWRQhLCr5MRQ5EiA6sVwAIRQpJJwRQIkUGSVcAIEsBVyAITwJXKAFOAlBMUChMUElFCb1FAUEACEsHvkQiW0UFKlAiRQJJVwAgSwFXIAhPAlcoAU4CUExQKExQSUUHvUUBQQAISwW+RCJbRQEiRQNLAoEEDEEASksCgQMSSUAAJEsDSSULSwxJTgNMJViBGFtMIwhJRQYlC08CTCVYgRhbDUEAJkEAHCJLBBZLAhZLC08CUExQSwZQTCULSwlMTwK7I0NLAiMIQv/eSEsBRQNC/50iNhoBRwIVJRJENhoCSRUkEkQXSU4CFlAnBVAoTFBJTgO9RQFAAAQnDbAAiA25SSJbTIFAU0lOAksDvkxFBkRBAFBLAyJbSwEOQQBGI0lAABYiSwJLBE1JSwYiWw9BABxISwRLBEy/Ik8CTwNNJwsiTwNUTBZQKUxQsCNDMgdLBlcQCE8CFk8CFlBMUCIWUEL/0SJC/7cigABJMRYjCUk4ECMSRDYaAUlOAhUlEkQ2GgJJFSQSRBdMNhoDSRUkEkQXNhoESRUjEkQiUzINQAAEJxmwADINFksFSU4CUE8FSU4CFklFC1BOA4gM+0kiW0UIgUBTQAAEJxKwACcOTwJQSU4DvUUBQQDUIkxLBDgHMgoSQAADK7AATwQ4CE8CEkAAAyuwAEsCvUUBQABkSwVLAg9AAAQnDLAAIkxBADxISwJLBlAnBVAoTFBJvUUBQAAEJw2wAL5MSU8CRCJbSUUGSwYOQQAnSwFLBQ5BAB8jQAAEJwywAIgMOkgyB08CFkwWUEwWTEsBUExQvyNDIkL/3khLAb5MSU8CRCJbTwIISUsGDkAABCcMsABMI4gMFzIHSwEiW08DSwEdTwVJTgWXTwSBGFtPAh1LBJdPAxZPAxZQTwIWUEwWUL9C/64hBkxC/ygiNhoBSRUkEkQXSTYaAkkVJRJENhoDSRUkEkQXTwIWSwJQSwEWUE4CiAvZSSJbSU4CTgOBQFNJTgMiTgJNTCcOTFBJTgO9RQFAAA1FARYnC0xQKUxQsCNDSwK+TEUHRExBAD9LBCJbSwMOQQA1I0lAAB0yDUsFEkEAIUsBMgdMFkwWUCIWTEsBUExQSwNMvycLIk8CVEwWUEL/t0sFIltC/9oiQv/IgABJMRYjCUk4ECMSRDYaAUkVJBJEFzYaAkkVJBJEFyInBmVEgAxha2l0YV9hc3NldHNlQADYSCckSSJbRQYkW0UESwFBAK1LAUsFEkAACEsBSwQSQQCdMQAiJwZlRCcTZUhyCEQSQAAEJxSwAEmBgOpJD0EAekmBgJyTPA5BAHAjQAAPgAtFUlI6ZXJySWxrc7AASwEWJxZMUEm9RQFBAEpJvkQXSwIOQAAPgAtFUlI6ZXJyTGtkY7AASwNJiPPrOAcyChJAAAMrsABLAzgISwG9RQFBAA4iEkAAAyuwAEsBFr8jQ4HUSEL/7SEIQv+1IkL/jTEASwJxC0QSQP9ugAtFUlI6ZXJyTmFjcrAAQv8oNhoBSRUlEkQxACInBmVEJxNlSHIIRBJAAAQnFLAAJyNMZyNDNhoBSRUkEkQXMQBMFlAnBVAoTFBJvUUBQAAEJw2wAEm8SDEAIQSI84RJVwAgTCVbsbIIsgcjshAisgGzI0MigAA2GgFJFSQSRBcxAEwWSU4CUCcIUChMUEm9RQFAAAQnDbAASbxIIQRFAzEATwJQJwlMUElFBL1FAUEACEsCvEghBUUCMQBLAojzIklXACBMJVuxsgiyByOyECKyAbMjQ4AANhoBSRUkEkQXSTYaAklOAkkVJRJENhoDSRUkEkQXTwIWTwJQTBZQJw5MUEm9RQFAAAQnDbAATwJJcgdFBUgyDRJAAA1LAkAALTEASwISQQAlI0AAD4ALRVJSOmVyckFzaXWwALxIsSEGsgiyByOyECKyAbMjQyJC/9g2GgFJFSUSRDYaAkkVJBJEFzINQAAEJxmwADINFk8CUEwWUCcOTFBJvUUBQAAEJw2wALxIsTIOIQayCLIHI7IQIrIBsyNDgdR6MhAIFilMULAjQzYaAUkVJBJEFzYaAkkVIxJEMQBPAhZQSwFQKExQvU4CSCcIEkEAEEEACCIWKUxQsCNDIQVC//QhBCJPAk1C/+s2GgFJFSUSRDYaAkkVJBJEFzINQAAEJxmwADINFk8CUEwWUCcOTFC9RQFBAAgiFilMULAjQyEGQv/0NhoBSRUlEkQ2GgJJFSQSRBcWUCpQSVcAIEsBVyAITwJXKAFOAlBMUChMUEm9RQFBAA0yB0sBvkSBEFsPQQAJSCIWKUxQsCNDvkSBEFsyBwlC/+42GgFJFSUSRDYaAkkVJBJEFxZQKlBJVwAgSwFXIAhPAlcoAU4CUExQKExQSb1FAUAABCcXsAAyB0sBvkSBEFsMQAAEJyKwAL5EgRBbMgcJFilMULAjQzYaAUkVJRJENhoCSRWBCRJEiAemSClMULAjQzYaAUcCFSUSRDYaAkkVgQkSREkiW0lOAk4DVwgBSU4CTgMWTFBMUElXCSBLAVcACE8CVwgBTgJQTFAoTFBJvUUBQAAEJxewAL5EiAebSClMULAjQzYaAUkVJRJENhoCSRUkEkQXIiOICAApTFCwI0M2GgFHAhUlEkQ2GgJJFSQSRBdJTgMWUCcFUElXACBLAVcgCE8CVygBTgJQTFAoTFBJvUUBQAAEJw2wAL5EIltLAkAAHk8CSExJcwBETwIPTHMARCcLIk8DVEwWUClMULAjQ0xPAnAAQAAHRgInJUL/60lPAg8nCyJPAlRMFlBC/9s2GgFJFSQSRBc2GgJJFSUSRDYaA0kVJBJEFzYaBEkVIxJEIlNOAk8DTwOIB0wpTFCwI0M2GgFJFSUSRDYaAkcCFYEJEkQnEUxXCAFJJwUSSUEAF0sDVwAIJwVQSwVMiAZNSIACAAFMUEUDSUAACEsBJwQSQQAgSwNXAAgnBFBLBUyIBipISwNJIlkjCBZXBgBcAExQRQNAAA1JJwQSQAAGSSoSQQAfSwJXAAgqUEsETIgF+0hLAkkiWSMIFlcGAFwATFBFAilLAlCwI0MigAA2GgFJFSUSRDYaAkkVJBJEFxZQSScEUEwqUEwiTgJJVwAgSwFXIAhPAlcoAU4CUExQKExQSU4CvUUBQQAISwG+RCJbRQMiRQRJVwAgSwFXIAhPAlcoAU4CUExQKExQSUUFvUUBQQAISwO+RCJbRQNLARZLAxZQKUxQsCNDNhoBSRUlEkQ2GgJJFSQSRBcWUElXACBMVyAIUCcJTFBJvUUBQAAJSCcVKUxQsCNDvkRC//U2GgFJFSUSRDYaAkkVJBJEFxZQSVcAIExXIAhQJwlMUEm9RQFAAAQnGLAAvkQpTFCwI0M2GgFJFSUSRDYaAkkVJBJEFzYaA0kVIxJEIlOIBrQWKUxQsCNDIjYaAUkVJRJENhoCSRUkEkQXNhoDSRUjEkQiU04CFlBJVwAgTFcgCFAnCUxQSb1FAUAABCcYsAC+RCJHAkmBBAxBAD9JJQtLBEwlWElFB4EYW0EAHUwjCExLBEEAGUsFSSJbSwEkWwhMgRBbCE8DCE4CIwhC/8ZLBSJbTwMITgJC/+9ITwJISUAACkYCIhYpTFCwI0MKQv/1NhoBSRUlEkQ2GgJJTgIVIxJENhoDRwIiWUlOAiQLgQIITBUSRCcRIklLAwxBAGxLA1cCAEsBJAtbSU4DFksGTFBLB1BJVwAgSwFXIAhPAlcoAU4CUExQKExQSb1FAUAAGUhPAkhMSSJZIwgWVwYAXAAnJlBMIwhC/66+REsGTwRLCE8DiAP/SE8CSSJZIwgWVwYAXABMUExC/9pIKUxQsCNDNhoBSRUlEkQ2GgJJTgIVIxJENhoDRwIiWUlOAiQLgQIITBUSRCcRIklLAwxBAGRLA1cCAEsBJAtbSU4DFksGTFBLB1BJVwAgSwFXIAhPAlcoAU4CUExQKExQSb1FAUAAD4ALRVJSOmVyclNuZmSwAL5ESwZPBEsITwOIA2dITwJJIlkjCBZXBgBcAExQTCMIQv+VSClMULAjQ4AASTYaAUkVJRJENhoCRwIiWUlOAoEQC4ECCEwVEkQ2GgNJTgQVIxJENhoESRUjEkQiUyJJSwMMQQCDSwNXAgBLAYEQC4EQWElOAiJbSUUJFksGTFBLB1BJVwAgSwFXIAhPAlcoAU4CUExQKExQSb1FAUAAD0YIIicLIk8CVClMULAjQ75ESwZLCUsJSU4ETwOIArZIIltFCicIEkEAC0sFSwhLBIgEMEUJTCRbSwgNQQAGRgYiQv+/IwhC/3ZGBiNC/7Q2GgFHAiJZSU4CJAuBAghMFRJEJxEiSUsDDEEAJksDVwIASwEkCyRYJwdMUL5ETwJJIlkjCBZXBgBcAExQTCMIQv/TSClMULAjQzYaAUcCIllJTgIkC4ECCEwVEkQnESJJSwMMQQBHSwNXAgBLASQLJFgnFkxQSb1FAUAAFkhMSSJZIwgWVwYAXAAnJVBMIwhC/82+RBcWgAGAUE8CSSJZIwgWVwYAXABMUExC/+BIKUxQsCNDNhoBSSJZgQIISwEVEkRXAgAxACInBmVEJxNlSHIIRBJAAAQnFLAAIicGZUSAA3BhbGVIgRBbMg0SQAAPgAtFUlI6ZXJySXVwZ7AAJxxMZyNDNhoBSRUkEkQXMQAiJwZlRCcTZUhyCEQSQAAEJxSwACcGTGcjQ4oEAIv9JwQSQQAti/9BABSL/BYnB0xQSb5EJFuL/ggWJEy7iYv8FicHTFBJvkQkW4v+CRYkTLuJi/0qEkH/5Iv/QQAUi/wWJwdMUEm+RCJbi/4IFiJMu4mL/BYnB0xQSb5EIluL/gkWIky7iYoDAIv/QQAWi/0WJwdMUEm+RIEQW4v+CBaBEEy7iYv9FicHTFBJvkSBEFuL/gkWgRBMu4mKAgKL/oEYWzIHi/4kWwkIi/4iWx2L/5eL/omKAQKL/4EYWzIHi/8kWwkIi/+JigICi/6BEFsyB4v+JFsJCIv/QQADi/6Ji/6BGFsJQv/0igIBi/9AAAuL/nMARBaAAYBQiYv+i/9wAEwWJwsiTwNUUImKAgKL/yJbSYv/VwgBSU8CFkxQi/5QSVcJIEsBVwAITwJXCAFOAlBMUChMUEm9RQFAAAknJov/jAGMAIm+RIv+TgOIAARIi/+JigQCi/4nBRNBAASL/0mJi/yL/Yj/fkkiW0yBQFMiTgJNSYv/IlsPQQAGi/9JTwKJi/9XCAiL/1cQCE8CFk8CUExQIhZQi/+JigEAi/8nCBJAABeL/ycFEkAAD4v/JwQSQAAHi/8qEkEAFCNAAA+AC0VSUjplcnJJc3RwsACJIkL/6YoEASJHBoAAi/0Wi/xLAVBJTgInBVBMi/4Wi/xQTFCL/Iv9iP7sTgOL/kAAoEgoTFBJjAK9RQFBACuLAr5MjABEiwiBQFNBAByLCCJbiwAiWw9BABCLAIj+hCJbSYwGFkwWo4wHSScEUChMUEmMBL1FAUEAGYsEvkSI/mIiW4sGSwEIjAYWTBajiwegjAcqUChMUEmMBb1FAUEAGYsFvkSI/jsiW4sGSwEIjAYWTBajiwegjAeLBkAABSckjACJiwYWiwdLAaIXFlCMAIlFAScOTFBJjAO9RQFB/4mLA75MjAFEiwiBQFNB/3qLCCJbiwEiWw9B/26LAYv/iP3zIltJjAYWTBajjAdC/1mKAwEii/4Wi/1MUElXACBMVyAIUCcJTFBJvUUBQAAEIowAib5EIkcCSYEEDEEAP0klC0sETCVYSYwAgRhbQQAdTCMITIv/QQAZiwBJIltLASRbCEyBEFsITwMITgIjCEL/xosAIltPAwhOAkL/70hPAkhJQAAEIowAiQpMiQ==", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
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
   * Gets available update ABI call param factories
   */
  static get update() {
    return {
      _resolveByMethod(params) {
        switch (params.method) {
          case "update":
          case "update(string)void":
            return _StakingParamsFactory.update.update(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs update ABI call params for the Staking smart contract using the update(string)void ABI method
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
   * Constructs a no op call for the checkpointExpiredLock(address,uint64)bool ABI method
   *
   * Permissionlessly removes an expired lock from the live governance total.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static checkpointExpiredLock(params) {
    return {
      ...params,
      method: "checkpointExpiredLock(address,uint64)bool",
      args: Array.isArray(params.args) ? params.args : [params.args.address, params.args.asset]
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
   * Constructs a no op call for the checkpointSoftStake(address,uint64)(bool,uint64) ABI method
   *
   * Permissionlessly records an observed shortfall against the portable root commitment.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static checkpointSoftStake(params) {
    return {
      ...params,
      method: "checkpointSoftStake(address,uint64)(bool,uint64)",
      args: Array.isArray(params.args) ? params.args : [params.args.address, params.args.asset]
    };
  }
  /**
     * Constructs a no op call for the commitAppSoftStake(pay,address,uint64,uint64,bool)void ABI method
     *
    * Creates or adds to a soft commitment scoped to one consuming app.
    New commitments may inherit the portable root's current weighted age.
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static commitAppSoftStake(params) {
    return {
      ...params,
      method: "commitAppSoftStake(pay,address,uint64,uint64,bool)void",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.address, params.args.asset, params.args.amount, params.args.inheritRoot]
    };
  }
  /**
     * Constructs a no op call for the checkpointAppSoftStake(uint64,address,uint64)(bool,uint64) ABI method
     *
    * Records a shortfall against an app-scoped commitment.
  
    Anyone may call it, but only the consuming app itself may shrink the commitment; any other
    caller only resets its accrued age. Otherwise a holder could empty their wallet, shrink their
    own commitment to 0 and stay "valid" for that app forever (H-1). A missing commitment (never
    made, or released) is reported as invalid instead of failing.
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static checkpointAppSoftStake(params) {
    return {
      ...params,
      method: "checkpointAppSoftStake(uint64,address,uint64)(bool,uint64)",
      args: Array.isArray(params.args) ? params.args : [params.args.app, params.args.address, params.args.asset]
    };
  }
  /**
     * Constructs a no op call for the updateSettings(pay,uint64,uint64)void ABI method
     *
    * Sets an asset's maximum lock duration (stakeAsa LOCK).
  
    - The DAO's governance assets (AKTA / BONES) can only be configured by the DAO wallet; any
     other asset by its creator (DAO-05).
    - The value must lie in [2 weeks, 4 years] and may never decrease, so a configured lockup can
     neither freeze locking nor strand existing lockers' assumptions (G-5).
  
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
   * Constructs a no op call for the setHeartbeatManager(address)void ABI method
   *
   * Sets the account allowed to record heartbeats. DAO wallet only (ST-4).
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static setHeartbeatManager(params) {
    return {
      ...params,
      method: "setHeartbeatManager(address)void",
      args: Array.isArray(params.args) ? params.args : [params.args.manager]
    };
  }
  /**
   * Constructs a no op call for the closeSoftStake(uint64)void ABI method
   *
   * Owner closes their SOFT stake; the stake box MBR goes back to whoever paid it (L-2).
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static closeSoftStake(params) {
    return {
      ...params,
      method: "closeSoftStake(uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.asset]
    };
  }
  /**
   * Constructs a no op call for the closeHeartbeat(uint64)void ABI method
   *
   * Owner closes their heartbeat stake and its history; both boxes' MBR goes back to whoever paid it (L-2).
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static closeHeartbeat(params) {
    return {
      ...params,
      method: "closeHeartbeat(uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.asset]
    };
  }
  /**
     * Constructs a no op call for the releaseAppStake(uint64,address,uint64)void ABI method
     *
    * Deletes an app-scoped commitment and refunds its box MBR to the committed address (L-2).
    Allowed for the consuming app itself, or for the owner once that app no longer exists.
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static releaseAppStake(params) {
    return {
      ...params,
      method: "releaseAppStake(uint64,address,uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.app, params.args.address, params.args.asset]
    };
  }
  /**
     * Constructs a no op call for the reclaimAppStake(address,uint64)void ABI method
     *
    * `releaseAppStake` for the consuming app, with the commitment's box MBR returned to that app
    instead of the committed address. The app paid that deposit (`commitAppSoftStake`) on behalf of
    whoever funded it there, and settles with that account itself.
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static reclaimAppStake(params) {
    return {
      ...params,
      method: "reclaimAppStake(address,uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.address, params.args.asset]
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
   * Constructs a no op call for the appStakeCost(address,uint64)uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static appStakeCost(params) {
    return {
      ...params,
      method: "appStakeCost(address,uint64)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.address, params.args.asset]
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
   * Constructs a no op call for the getInfo(address,(uint64,uint8))(uint64,uint64,uint64,uint64) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static getInfo(params) {
    return {
      ...params,
      method: "getInfo(address,(uint64,uint8))(uint64,uint64,uint64,uint64)",
      args: Array.isArray(params.args) ? params.args : [params.args.address, params.args.stake]
    };
  }
  /**
   * Constructs a no op call for the mustGetInfo(address,(uint64,uint8))(uint64,uint64,uint64,uint64) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static mustGetInfo(params) {
    return {
      ...params,
      method: "mustGetInfo(address,(uint64,uint8))(uint64,uint64,uint64,uint64)",
      args: Array.isArray(params.args) ? params.args : [params.args.address, params.args.stake]
    };
  }
  /**
   * Constructs a no op call for the getWeightedStake(address,uint64)(uint64,uint64) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static getWeightedStake(params) {
    return {
      ...params,
      method: "getWeightedStake(address,uint64)(uint64,uint64)",
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
   * Constructs a no op call for the getAppWeightedStake(uint64,address,uint64,bool)(uint64,uint64) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static getAppWeightedStake(params) {
    return {
      ...params,
      method: "getAppWeightedStake(uint64,address,uint64,bool)(uint64,uint64)",
      args: Array.isArray(params.args) ? params.args : [params.args.app, params.args.address, params.args.asset, params.args.acceptInherited]
    };
  }
  /**
   * Constructs a no op call for the getInfoAtLeast(address,(uint64,uint8))(uint64,uint64,uint64,uint64)[] ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static getInfoAtLeast(params) {
    return {
      ...params,
      method: "getInfoAtLeast(address,(uint64,uint8))(uint64,uint64,uint64,uint64)[]",
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
   * Constructs a no op call for the getInfoList(address,uint8,uint64[])(uint64,uint64,uint64,uint64)[] ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static getInfoList(params) {
    return {
      ...params,
      method: "getInfoList(address,uint8,uint64[])(uint64,uint64,uint64,uint64)[]",
      args: Array.isArray(params.args) ? params.args : [params.args.address, params.args.type, params.args.assets]
    };
  }
  /**
   * Constructs a no op call for the mustGetInfoList(address,uint8,uint64[])(uint64,uint64,uint64,uint64)[] ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static mustGetInfoList(params) {
    return {
      ...params,
      method: "mustGetInfoList(address,uint8,uint64[])(uint64,uint64,uint64,uint64)[]",
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
   * Constructs a no op call for the getTotals(uint64[])(uint64,uint64,uint64)[] ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static getTotals(params) {
    return {
      ...params,
      method: "getTotals(uint64[])(uint64,uint64,uint64)[]",
      args: Array.isArray(params.args) ? params.args : [params.args.assets]
    };
  }
  /**
   * Constructs a no op call for the getSettings(uint64[])(uint64,bool)[] ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static getSettings(params) {
    return {
      ...params,
      method: "getSettings(uint64[])(uint64,bool)[]",
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
    var _a, _b;
    const result = await this.appFactory.deploy({
      ...params,
      createParams: ((_a = params.createParams) == null ? void 0 : _a.method) ? StakingParamsFactory.create._resolveByMethod(params.createParams) : params.createParams ? params.createParams : void 0,
      updateParams: ((_b = params.updateParams) == null ? void 0 : _b.method) ? StakingParamsFactory.update._resolveByMethod(params.updateParams) : params.updateParams ? params.updateParams : void 0
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
    },
    /**
     * Gets available deployUpdate methods
     */
    deployUpdate: {
      /**
       * Updates an existing instance of the Staking smart contract using the update(string)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The deployUpdate params
       */
      update: (params) => {
        return this.appFactory.params.deployUpdate(StakingParamsFactory.update.update(params));
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
   * Checks for decode errors on the given return value and maps the return value to the return type for the given method
   * @returns The typed return value or undefined if there was no value
   */
  decodeReturnValue(method, returnValue) {
    return returnValue !== void 0 ? getArc56ReturnValue(returnValue, this.appClient.getABIMethod(method), APP_SPEC.structs) : void 0;
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
     * Gets available update methods
     */
    update: {
      /**
       * Updates an existing instance of the Staking smart contract using the `update(string)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The update params
       */
      update: (params) => {
        return this.appClient.params.update(StakingParamsFactory.update.update(params));
      }
    },
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
     * Makes a call to the Staking smart contract using the `checkpointExpiredLock(address,uint64)bool` ABI method.
     *
     * Permissionlessly removes an expired lock from the live governance total.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    checkpointExpiredLock: (params) => {
      return this.appClient.params.call(StakingParamsFactory.checkpointExpiredLock(params));
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
     * Makes a call to the Staking smart contract using the `checkpointSoftStake(address,uint64)(bool,uint64)` ABI method.
     *
     * Permissionlessly records an observed shortfall against the portable root commitment.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    checkpointSoftStake: (params) => {
      return this.appClient.params.call(StakingParamsFactory.checkpointSoftStake(params));
    },
    /**
         * Makes a call to the Staking smart contract using the `commitAppSoftStake(pay,address,uint64,uint64,bool)void` ABI method.
         *
        * Creates or adds to a soft commitment scoped to one consuming app.
        New commitments may inherit the portable root's current weighted age.
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    commitAppSoftStake: (params) => {
      return this.appClient.params.call(StakingParamsFactory.commitAppSoftStake(params));
    },
    /**
         * Makes a call to the Staking smart contract using the `checkpointAppSoftStake(uint64,address,uint64)(bool,uint64)` ABI method.
         *
        * Records a shortfall against an app-scoped commitment.
    
        Anyone may call it, but only the consuming app itself may shrink the commitment; any other
        caller only resets its accrued age. Otherwise a holder could empty their wallet, shrink their
        own commitment to 0 and stay "valid" for that app forever (H-1). A missing commitment (never
        made, or released) is reported as invalid instead of failing.
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    checkpointAppSoftStake: (params) => {
      return this.appClient.params.call(StakingParamsFactory.checkpointAppSoftStake(params));
    },
    /**
         * Makes a call to the Staking smart contract using the `updateSettings(pay,uint64,uint64)void` ABI method.
         *
        * Sets an asset's maximum lock duration (stakeAsa LOCK).
    
        - The DAO's governance assets (AKTA / BONES) can only be configured by the DAO wallet; any
         other asset by its creator (DAO-05).
        - The value must lie in [2 weeks, 4 years] and may never decrease, so a configured lockup can
         neither freeze locking nor strand existing lockers' assumptions (G-5).
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    updateSettings: (params) => {
      return this.appClient.params.call(StakingParamsFactory.updateSettings(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `setHeartbeatManager(address)void` ABI method.
     *
     * Sets the account allowed to record heartbeats. DAO wallet only (ST-4).
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    setHeartbeatManager: (params) => {
      return this.appClient.params.call(StakingParamsFactory.setHeartbeatManager(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `closeSoftStake(uint64)void` ABI method.
     *
     * Owner closes their SOFT stake; the stake box MBR goes back to whoever paid it (L-2).
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    closeSoftStake: (params) => {
      return this.appClient.params.call(StakingParamsFactory.closeSoftStake(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `closeHeartbeat(uint64)void` ABI method.
     *
     * Owner closes their heartbeat stake and its history; both boxes' MBR goes back to whoever paid it (L-2).
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    closeHeartbeat: (params) => {
      return this.appClient.params.call(StakingParamsFactory.closeHeartbeat(params));
    },
    /**
         * Makes a call to the Staking smart contract using the `releaseAppStake(uint64,address,uint64)void` ABI method.
         *
        * Deletes an app-scoped commitment and refunds its box MBR to the committed address (L-2).
        Allowed for the consuming app itself, or for the owner once that app no longer exists.
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    releaseAppStake: (params) => {
      return this.appClient.params.call(StakingParamsFactory.releaseAppStake(params));
    },
    /**
         * Makes a call to the Staking smart contract using the `reclaimAppStake(address,uint64)void` ABI method.
         *
        * `releaseAppStake` for the consuming app, with the commitment's box MBR returned to that app
        instead of the committed address. The app paid that deposit (`commitAppSoftStake`) on behalf of
        whoever funded it there, and settles with that account itself.
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    reclaimAppStake: (params) => {
      return this.appClient.params.call(StakingParamsFactory.reclaimAppStake(params));
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
     * Makes a call to the Staking smart contract using the `appStakeCost(address,uint64)uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    appStakeCost: (params) => {
      return this.appClient.params.call(StakingParamsFactory.appStakeCost(params));
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
     * Makes a call to the Staking smart contract using the `getInfo(address,(uint64,uint8))(uint64,uint64,uint64,uint64)` ABI method.
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
     * Makes a call to the Staking smart contract using the `mustGetInfo(address,(uint64,uint8))(uint64,uint64,uint64,uint64)` ABI method.
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
     * Makes a call to the Staking smart contract using the `getWeightedStake(address,uint64)(uint64,uint64)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    getWeightedStake: (params) => {
      return this.appClient.params.call(StakingParamsFactory.getWeightedStake(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `softCheck(address,uint64)(bool,uint64)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    softCheck: (params) => {
      return this.appClient.params.call(StakingParamsFactory.softCheck(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `getAppWeightedStake(uint64,address,uint64,bool)(uint64,uint64)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    getAppWeightedStake: (params) => {
      return this.appClient.params.call(StakingParamsFactory.getAppWeightedStake(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `getInfoAtLeast(address,(uint64,uint8))(uint64,uint64,uint64,uint64)[]` ABI method.
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
     * Makes a call to the Staking smart contract using the `getInfoList(address,uint8,uint64[])(uint64,uint64,uint64,uint64)[]` ABI method.
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
     * Makes a call to the Staking smart contract using the `mustGetInfoList(address,uint8,uint64[])(uint64,uint64,uint64,uint64)[]` ABI method.
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
     * Makes a call to the Staking smart contract using the `getTotals(uint64[])(uint64,uint64,uint64)[]` ABI method.
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
     * Makes a call to the Staking smart contract using the `getSettings(uint64[])(uint64,bool)[]` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    getSettings: (params) => {
      return this.appClient.params.call(StakingParamsFactory.getSettings(params));
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
     * Gets available update methods
     */
    update: {
      /**
       * Updates an existing instance of the Staking smart contract using the `update(string)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The update transaction
       */
      update: (params) => {
        return this.appClient.createTransaction.update(StakingParamsFactory.update.update(params));
      }
    },
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
     * Makes a call to the Staking smart contract using the `checkpointExpiredLock(address,uint64)bool` ABI method.
     *
     * Permissionlessly removes an expired lock from the live governance total.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    checkpointExpiredLock: (params) => {
      return this.appClient.createTransaction.call(StakingParamsFactory.checkpointExpiredLock(params));
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
     * Makes a call to the Staking smart contract using the `checkpointSoftStake(address,uint64)(bool,uint64)` ABI method.
     *
     * Permissionlessly records an observed shortfall against the portable root commitment.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    checkpointSoftStake: (params) => {
      return this.appClient.createTransaction.call(StakingParamsFactory.checkpointSoftStake(params));
    },
    /**
         * Makes a call to the Staking smart contract using the `commitAppSoftStake(pay,address,uint64,uint64,bool)void` ABI method.
         *
        * Creates or adds to a soft commitment scoped to one consuming app.
        New commitments may inherit the portable root's current weighted age.
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    commitAppSoftStake: (params) => {
      return this.appClient.createTransaction.call(StakingParamsFactory.commitAppSoftStake(params));
    },
    /**
         * Makes a call to the Staking smart contract using the `checkpointAppSoftStake(uint64,address,uint64)(bool,uint64)` ABI method.
         *
        * Records a shortfall against an app-scoped commitment.
    
        Anyone may call it, but only the consuming app itself may shrink the commitment; any other
        caller only resets its accrued age. Otherwise a holder could empty their wallet, shrink their
        own commitment to 0 and stay "valid" for that app forever (H-1). A missing commitment (never
        made, or released) is reported as invalid instead of failing.
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    checkpointAppSoftStake: (params) => {
      return this.appClient.createTransaction.call(StakingParamsFactory.checkpointAppSoftStake(params));
    },
    /**
         * Makes a call to the Staking smart contract using the `updateSettings(pay,uint64,uint64)void` ABI method.
         *
        * Sets an asset's maximum lock duration (stakeAsa LOCK).
    
        - The DAO's governance assets (AKTA / BONES) can only be configured by the DAO wallet; any
         other asset by its creator (DAO-05).
        - The value must lie in [2 weeks, 4 years] and may never decrease, so a configured lockup can
         neither freeze locking nor strand existing lockers' assumptions (G-5).
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    updateSettings: (params) => {
      return this.appClient.createTransaction.call(StakingParamsFactory.updateSettings(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `setHeartbeatManager(address)void` ABI method.
     *
     * Sets the account allowed to record heartbeats. DAO wallet only (ST-4).
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    setHeartbeatManager: (params) => {
      return this.appClient.createTransaction.call(StakingParamsFactory.setHeartbeatManager(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `closeSoftStake(uint64)void` ABI method.
     *
     * Owner closes their SOFT stake; the stake box MBR goes back to whoever paid it (L-2).
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    closeSoftStake: (params) => {
      return this.appClient.createTransaction.call(StakingParamsFactory.closeSoftStake(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `closeHeartbeat(uint64)void` ABI method.
     *
     * Owner closes their heartbeat stake and its history; both boxes' MBR goes back to whoever paid it (L-2).
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    closeHeartbeat: (params) => {
      return this.appClient.createTransaction.call(StakingParamsFactory.closeHeartbeat(params));
    },
    /**
         * Makes a call to the Staking smart contract using the `releaseAppStake(uint64,address,uint64)void` ABI method.
         *
        * Deletes an app-scoped commitment and refunds its box MBR to the committed address (L-2).
        Allowed for the consuming app itself, or for the owner once that app no longer exists.
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    releaseAppStake: (params) => {
      return this.appClient.createTransaction.call(StakingParamsFactory.releaseAppStake(params));
    },
    /**
         * Makes a call to the Staking smart contract using the `reclaimAppStake(address,uint64)void` ABI method.
         *
        * `releaseAppStake` for the consuming app, with the commitment's box MBR returned to that app
        instead of the committed address. The app paid that deposit (`commitAppSoftStake`) on behalf of
        whoever funded it there, and settles with that account itself.
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    reclaimAppStake: (params) => {
      return this.appClient.createTransaction.call(StakingParamsFactory.reclaimAppStake(params));
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
     * Makes a call to the Staking smart contract using the `appStakeCost(address,uint64)uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    appStakeCost: (params) => {
      return this.appClient.createTransaction.call(StakingParamsFactory.appStakeCost(params));
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
     * Makes a call to the Staking smart contract using the `getInfo(address,(uint64,uint8))(uint64,uint64,uint64,uint64)` ABI method.
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
     * Makes a call to the Staking smart contract using the `mustGetInfo(address,(uint64,uint8))(uint64,uint64,uint64,uint64)` ABI method.
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
     * Makes a call to the Staking smart contract using the `getWeightedStake(address,uint64)(uint64,uint64)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    getWeightedStake: (params) => {
      return this.appClient.createTransaction.call(StakingParamsFactory.getWeightedStake(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `softCheck(address,uint64)(bool,uint64)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    softCheck: (params) => {
      return this.appClient.createTransaction.call(StakingParamsFactory.softCheck(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `getAppWeightedStake(uint64,address,uint64,bool)(uint64,uint64)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    getAppWeightedStake: (params) => {
      return this.appClient.createTransaction.call(StakingParamsFactory.getAppWeightedStake(params));
    },
    /**
     * Makes a call to the Staking smart contract using the `getInfoAtLeast(address,(uint64,uint8))(uint64,uint64,uint64,uint64)[]` ABI method.
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
     * Makes a call to the Staking smart contract using the `getInfoList(address,uint8,uint64[])(uint64,uint64,uint64,uint64)[]` ABI method.
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
     * Makes a call to the Staking smart contract using the `mustGetInfoList(address,uint8,uint64[])(uint64,uint64,uint64,uint64)[]` ABI method.
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
     * Makes a call to the Staking smart contract using the `getTotals(uint64[])(uint64,uint64,uint64)[]` ABI method.
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
     * Makes a call to the Staking smart contract using the `getSettings(uint64[])(uint64,bool)[]` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    getSettings: (params) => {
      return this.appClient.createTransaction.call(StakingParamsFactory.getSettings(params));
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
     * Gets available update methods
     */
    update: {
      /**
       * Updates an existing instance of the Staking smart contract using the `update(string)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The update result
       */
      update: async (params) => {
        const result = await this.appClient.send.update(StakingParamsFactory.update.update(params));
        return { ...result, return: result.return };
      }
    },
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
     * Makes a call to the Staking smart contract using the `checkpointExpiredLock(address,uint64)bool` ABI method.
     *
     * Permissionlessly removes an expired lock from the live governance total.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    checkpointExpiredLock: async (params) => {
      const result = await this.appClient.send.call(StakingParamsFactory.checkpointExpiredLock(params));
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
     * Makes a call to the Staking smart contract using the `checkpointSoftStake(address,uint64)(bool,uint64)` ABI method.
     *
     * Permissionlessly records an observed shortfall against the portable root commitment.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    checkpointSoftStake: async (params) => {
      const result = await this.appClient.send.call(StakingParamsFactory.checkpointSoftStake(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the Staking smart contract using the `commitAppSoftStake(pay,address,uint64,uint64,bool)void` ABI method.
         *
        * Creates or adds to a soft commitment scoped to one consuming app.
        New commitments may inherit the portable root's current weighted age.
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    commitAppSoftStake: async (params) => {
      const result = await this.appClient.send.call(StakingParamsFactory.commitAppSoftStake(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the Staking smart contract using the `checkpointAppSoftStake(uint64,address,uint64)(bool,uint64)` ABI method.
         *
        * Records a shortfall against an app-scoped commitment.
    
        Anyone may call it, but only the consuming app itself may shrink the commitment; any other
        caller only resets its accrued age. Otherwise a holder could empty their wallet, shrink their
        own commitment to 0 and stay "valid" for that app forever (H-1). A missing commitment (never
        made, or released) is reported as invalid instead of failing.
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    checkpointAppSoftStake: async (params) => {
      const result = await this.appClient.send.call(StakingParamsFactory.checkpointAppSoftStake(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the Staking smart contract using the `updateSettings(pay,uint64,uint64)void` ABI method.
         *
        * Sets an asset's maximum lock duration (stakeAsa LOCK).
    
        - The DAO's governance assets (AKTA / BONES) can only be configured by the DAO wallet; any
         other asset by its creator (DAO-05).
        - The value must lie in [2 weeks, 4 years] and may never decrease, so a configured lockup can
         neither freeze locking nor strand existing lockers' assumptions (G-5).
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    updateSettings: async (params) => {
      const result = await this.appClient.send.call(StakingParamsFactory.updateSettings(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Staking smart contract using the `setHeartbeatManager(address)void` ABI method.
     *
     * Sets the account allowed to record heartbeats. DAO wallet only (ST-4).
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    setHeartbeatManager: async (params) => {
      const result = await this.appClient.send.call(StakingParamsFactory.setHeartbeatManager(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Staking smart contract using the `closeSoftStake(uint64)void` ABI method.
     *
     * Owner closes their SOFT stake; the stake box MBR goes back to whoever paid it (L-2).
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    closeSoftStake: async (params) => {
      const result = await this.appClient.send.call(StakingParamsFactory.closeSoftStake(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Staking smart contract using the `closeHeartbeat(uint64)void` ABI method.
     *
     * Owner closes their heartbeat stake and its history; both boxes' MBR goes back to whoever paid it (L-2).
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    closeHeartbeat: async (params) => {
      const result = await this.appClient.send.call(StakingParamsFactory.closeHeartbeat(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the Staking smart contract using the `releaseAppStake(uint64,address,uint64)void` ABI method.
         *
        * Deletes an app-scoped commitment and refunds its box MBR to the committed address (L-2).
        Allowed for the consuming app itself, or for the owner once that app no longer exists.
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    releaseAppStake: async (params) => {
      const result = await this.appClient.send.call(StakingParamsFactory.releaseAppStake(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the Staking smart contract using the `reclaimAppStake(address,uint64)void` ABI method.
         *
        * `releaseAppStake` for the consuming app, with the commitment's box MBR returned to that app
        instead of the committed address. The app paid that deposit (`commitAppSoftStake`) on behalf of
        whoever funded it there, and settles with that account itself.
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    reclaimAppStake: async (params) => {
      const result = await this.appClient.send.call(StakingParamsFactory.reclaimAppStake(params));
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
     * Makes a call to the Staking smart contract using the `appStakeCost(address,uint64)uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    appStakeCost: async (params) => {
      const result = await this.appClient.send.call(StakingParamsFactory.appStakeCost(params));
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
     * Makes a call to the Staking smart contract using the `getInfo(address,(uint64,uint8))(uint64,uint64,uint64,uint64)` ABI method.
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
     * Makes a call to the Staking smart contract using the `mustGetInfo(address,(uint64,uint8))(uint64,uint64,uint64,uint64)` ABI method.
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
     * Makes a call to the Staking smart contract using the `getWeightedStake(address,uint64)(uint64,uint64)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    getWeightedStake: async (params) => {
      const result = await this.appClient.send.call(StakingParamsFactory.getWeightedStake(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Staking smart contract using the `softCheck(address,uint64)(bool,uint64)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    softCheck: async (params) => {
      const result = await this.appClient.send.call(StakingParamsFactory.softCheck(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Staking smart contract using the `getAppWeightedStake(uint64,address,uint64,bool)(uint64,uint64)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    getAppWeightedStake: async (params) => {
      const result = await this.appClient.send.call(StakingParamsFactory.getAppWeightedStake(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Staking smart contract using the `getInfoAtLeast(address,(uint64,uint8))(uint64,uint64,uint64,uint64)[]` ABI method.
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
     * Makes a call to the Staking smart contract using the `getInfoList(address,uint8,uint64[])(uint64,uint64,uint64,uint64)[]` ABI method.
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
     * Makes a call to the Staking smart contract using the `mustGetInfoList(address,uint8,uint64[])(uint64,uint64,uint64,uint64)[]` ABI method.
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
     * Makes a call to the Staking smart contract using the `getTotals(uint64[])(uint64,uint64,uint64)[]` ABI method.
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
     * Makes a call to the Staking smart contract using the `getSettings(uint64[])(uint64,bool)[]` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    getSettings: async (params) => {
      const result = await this.appClient.send.call(StakingParamsFactory.getSettings(params));
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
   * @param params The params to use for the the cloned app client. Omit a param to keep the original value. Set a param to override the original value. Setting to undefined will clear the original value.
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
   * Makes a readonly (simulated) call to the Staking smart contract using the `appStakeCost(address,uint64)uint64` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async appStakeCost(params) {
    const result = await this.appClient.send.call(StakingParamsFactory.appStakeCost(params));
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
   * Makes a readonly (simulated) call to the Staking smart contract using the `getInfo(address,(uint64,uint8))(uint64,uint64,uint64,uint64)` ABI method.
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
   * Makes a readonly (simulated) call to the Staking smart contract using the `mustGetInfo(address,(uint64,uint8))(uint64,uint64,uint64,uint64)` ABI method.
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
   * Makes a readonly (simulated) call to the Staking smart contract using the `getWeightedStake(address,uint64)(uint64,uint64)` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async getWeightedStake(params) {
    const result = await this.appClient.send.call(StakingParamsFactory.getWeightedStake(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Staking smart contract using the `softCheck(address,uint64)(bool,uint64)` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async softCheck(params) {
    const result = await this.appClient.send.call(StakingParamsFactory.softCheck(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Staking smart contract using the `getAppWeightedStake(uint64,address,uint64,bool)(uint64,uint64)` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async getAppWeightedStake(params) {
    const result = await this.appClient.send.call(StakingParamsFactory.getAppWeightedStake(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Staking smart contract using the `getInfoAtLeast(address,(uint64,uint8))(uint64,uint64,uint64,uint64)[]` ABI method.
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
   * Makes a readonly (simulated) call to the Staking smart contract using the `getInfoList(address,uint8,uint64[])(uint64,uint64,uint64,uint64)[]` ABI method.
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
   * Makes a readonly (simulated) call to the Staking smart contract using the `mustGetInfoList(address,uint8,uint64[])(uint64,uint64,uint64,uint64)[]` ABI method.
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
   * Makes a readonly (simulated) call to the Staking smart contract using the `getTotals(uint64[])(uint64,uint64,uint64)[]` ABI method.
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
   * Makes a readonly (simulated) call to the Staking smart contract using the `getSettings(uint64[])(uint64,bool)[]` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async getSettings(params) {
    const result = await this.appClient.send.call(StakingParamsFactory.getSettings(params));
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
       * Get values from the appStakes map in box state
       */
      appStakes: {
        /**
         * Get all current values of the appStakes map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("appStakes");
        },
        /**
         * Get a current value of the appStakes map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("appStakes", key);
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
  newGroup() {
    const client = this;
    const composer = this.algorand.newGroup();
    let promiseChain = Promise.resolve();
    const resultMappers = [];
    return {
      /**
       * Add a init()void method call against the Staking contract
       */
      init(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.init(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a optIn(pay,uint64)void method call against the Staking contract
       */
      optIn(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.optIn(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a stake(pay,uint8,uint64,uint64)void method call against the Staking contract
       */
      stake(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.stake(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a stakeAsa(pay,axfer,uint8,uint64,uint64)void method call against the Staking contract
       */
      stakeAsa(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.stakeAsa(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a withdraw(uint64,uint8)void method call against the Staking contract
       */
      withdraw(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.withdraw(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a checkpointExpiredLock(address,uint64)bool method call against the Staking contract
       */
      checkpointExpiredLock(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.checkpointExpiredLock(params)));
        resultMappers.push((v) => client.decodeReturnValue("checkpointExpiredLock(address,uint64)bool", v));
        return this;
      },
      /**
       * Add a createHeartbeat(address,uint64)void method call against the Staking contract
       */
      createHeartbeat(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.createHeartbeat(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a checkpointSoftStake(address,uint64)(bool,uint64) method call against the Staking contract
       */
      checkpointSoftStake(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.checkpointSoftStake(params)));
        resultMappers.push((v) => client.decodeReturnValue("checkpointSoftStake(address,uint64)(bool,uint64)", v));
        return this;
      },
      /**
       * Add a commitAppSoftStake(pay,address,uint64,uint64,bool)void method call against the Staking contract
       */
      commitAppSoftStake(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.commitAppSoftStake(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a checkpointAppSoftStake(uint64,address,uint64)(bool,uint64) method call against the Staking contract
       */
      checkpointAppSoftStake(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.checkpointAppSoftStake(params)));
        resultMappers.push((v) => client.decodeReturnValue("checkpointAppSoftStake(uint64,address,uint64)(bool,uint64)", v));
        return this;
      },
      /**
       * Add a updateSettings(pay,uint64,uint64)void method call against the Staking contract
       */
      updateSettings(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateSettings(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a setHeartbeatManager(address)void method call against the Staking contract
       */
      setHeartbeatManager(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.setHeartbeatManager(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a closeSoftStake(uint64)void method call against the Staking contract
       */
      closeSoftStake(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.closeSoftStake(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a closeHeartbeat(uint64)void method call against the Staking contract
       */
      closeHeartbeat(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.closeHeartbeat(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a releaseAppStake(uint64,address,uint64)void method call against the Staking contract
       */
      releaseAppStake(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.releaseAppStake(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a reclaimAppStake(address,uint64)void method call against the Staking contract
       */
      reclaimAppStake(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.reclaimAppStake(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a optInCost()uint64 method call against the Staking contract
       */
      optInCost(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.optInCost(params)));
        resultMappers.push((v) => client.decodeReturnValue("optInCost()uint64", v));
        return this;
      },
      /**
       * Add a stakeCost(uint64,uint8)uint64 method call against the Staking contract
       */
      stakeCost(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.stakeCost(params)));
        resultMappers.push((v) => client.decodeReturnValue("stakeCost(uint64,uint8)uint64", v));
        return this;
      },
      /**
       * Add a appStakeCost(address,uint64)uint64 method call against the Staking contract
       */
      appStakeCost(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.appStakeCost(params)));
        resultMappers.push((v) => client.decodeReturnValue("appStakeCost(address,uint64)uint64", v));
        return this;
      },
      /**
       * Add a getTimeLeft(address,uint64)uint64 method call against the Staking contract
       */
      getTimeLeft(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getTimeLeft(params)));
        resultMappers.push((v) => client.decodeReturnValue("getTimeLeft(address,uint64)uint64", v));
        return this;
      },
      /**
       * Add a mustGetTimeLeft(address,uint64)uint64 method call against the Staking contract
       */
      mustGetTimeLeft(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.mustGetTimeLeft(params)));
        resultMappers.push((v) => client.decodeReturnValue("mustGetTimeLeft(address,uint64)uint64", v));
        return this;
      },
      /**
       * Add a getInfo(address,(uint64,uint8))(uint64,uint64,uint64,uint64) method call against the Staking contract
       */
      getInfo(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getInfo(params)));
        resultMappers.push((v) => client.decodeReturnValue("getInfo(address,(uint64,uint8))(uint64,uint64,uint64,uint64)", v));
        return this;
      },
      /**
       * Add a mustGetInfo(address,(uint64,uint8))(uint64,uint64,uint64,uint64) method call against the Staking contract
       */
      mustGetInfo(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.mustGetInfo(params)));
        resultMappers.push((v) => client.decodeReturnValue("mustGetInfo(address,(uint64,uint8))(uint64,uint64,uint64,uint64)", v));
        return this;
      },
      /**
       * Add a getWeightedStake(address,uint64)(uint64,uint64) method call against the Staking contract
       */
      getWeightedStake(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getWeightedStake(params)));
        resultMappers.push((v) => client.decodeReturnValue("getWeightedStake(address,uint64)(uint64,uint64)", v));
        return this;
      },
      /**
       * Add a softCheck(address,uint64)(bool,uint64) method call against the Staking contract
       */
      softCheck(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.softCheck(params)));
        resultMappers.push((v) => client.decodeReturnValue("softCheck(address,uint64)(bool,uint64)", v));
        return this;
      },
      /**
       * Add a getAppWeightedStake(uint64,address,uint64,bool)(uint64,uint64) method call against the Staking contract
       */
      getAppWeightedStake(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getAppWeightedStake(params)));
        resultMappers.push((v) => client.decodeReturnValue("getAppWeightedStake(uint64,address,uint64,bool)(uint64,uint64)", v));
        return this;
      },
      /**
       * Add a getInfoAtLeast(address,(uint64,uint8))(uint64,uint64,uint64,uint64)[] method call against the Staking contract
       */
      getInfoAtLeast(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getInfoAtLeast(params)));
        resultMappers.push((v) => client.decodeReturnValue("getInfoAtLeast(address,(uint64,uint8))(uint64,uint64,uint64,uint64)[]", v));
        return this;
      },
      /**
       * Add a getEscrowInfo(address,uint64)(uint64,uint64) method call against the Staking contract
       */
      getEscrowInfo(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getEscrowInfo(params)));
        resultMappers.push((v) => client.decodeReturnValue("getEscrowInfo(address,uint64)(uint64,uint64)", v));
        return this;
      },
      /**
       * Add a getHeartbeat(address,uint64)(uint64,uint64,uint64,uint64)[4] method call against the Staking contract
       */
      getHeartbeat(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getHeartbeat(params)));
        resultMappers.push((v) => client.decodeReturnValue("getHeartbeat(address,uint64)(uint64,uint64,uint64,uint64)[4]", v));
        return this;
      },
      /**
       * Add a mustGetHeartbeat(address,uint64)(uint64,uint64,uint64,uint64)[4] method call against the Staking contract
       */
      mustGetHeartbeat(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.mustGetHeartbeat(params)));
        resultMappers.push((v) => client.decodeReturnValue("mustGetHeartbeat(address,uint64)(uint64,uint64,uint64,uint64)[4]", v));
        return this;
      },
      /**
       * Add a getHeartbeatAverage(address,uint64,bool)uint64 method call against the Staking contract
       */
      getHeartbeatAverage(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getHeartbeatAverage(params)));
        resultMappers.push((v) => client.decodeReturnValue("getHeartbeatAverage(address,uint64,bool)uint64", v));
        return this;
      },
      /**
       * Add a mustGetHeartbeatAverage(address,uint64,bool)uint64 method call against the Staking contract
       */
      mustGetHeartbeatAverage(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.mustGetHeartbeatAverage(params)));
        resultMappers.push((v) => client.decodeReturnValue("mustGetHeartbeatAverage(address,uint64,bool)uint64", v));
        return this;
      },
      /**
       * Add a getInfoList(address,uint8,uint64[])(uint64,uint64,uint64,uint64)[] method call against the Staking contract
       */
      getInfoList(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getInfoList(params)));
        resultMappers.push((v) => client.decodeReturnValue("getInfoList(address,uint8,uint64[])(uint64,uint64,uint64,uint64)[]", v));
        return this;
      },
      /**
       * Add a mustGetInfoList(address,uint8,uint64[])(uint64,uint64,uint64,uint64)[] method call against the Staking contract
       */
      mustGetInfoList(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.mustGetInfoList(params)));
        resultMappers.push((v) => client.decodeReturnValue("mustGetInfoList(address,uint8,uint64[])(uint64,uint64,uint64,uint64)[]", v));
        return this;
      },
      /**
       * Add a stakeCheck(address,(uint64,uint64)[],uint8,bool)bool method call against the Staking contract
       */
      stakeCheck(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.stakeCheck(params)));
        resultMappers.push((v) => client.decodeReturnValue("stakeCheck(address,(uint64,uint64)[],uint8,bool)bool", v));
        return this;
      },
      /**
       * Add a getTotals(uint64[])(uint64,uint64,uint64)[] method call against the Staking contract
       */
      getTotals(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getTotals(params)));
        resultMappers.push((v) => client.decodeReturnValue("getTotals(uint64[])(uint64,uint64,uint64)[]", v));
        return this;
      },
      /**
       * Add a getSettings(uint64[])(uint64,bool)[] method call against the Staking contract
       */
      getSettings(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getSettings(params)));
        resultMappers.push((v) => client.decodeReturnValue("getSettings(uint64[])(uint64,bool)[]", v));
        return this;
      },
      /**
       * Add a updateAkitaDAO(uint64)void method call against the Staking contract
       */
      updateAkitaDao(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateAkitaDao(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a opUp()void method call against the Staking contract
       */
      opUp(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.opUp(params)));
        resultMappers.push(void 0);
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

// src/staking/types.ts
var StakingType = /* @__PURE__ */ ((StakingType2) => {
  StakingType2[StakingType2["Heartbeat"] = 10] = "Heartbeat";
  StakingType2[StakingType2["Soft"] = 20] = "Soft";
  StakingType2[StakingType2["Hard"] = 30] = "Hard";
  StakingType2[StakingType2["Lock"] = 40] = "Lock";
  return StakingType2;
})(StakingType || {});

// src/staking/errors.ts
var STAKING_ERROR_MESSAGES = withErrorCodeAliases({
  // --- Lock lifecycle -----------------------------------------------------
  NLCK: "Lock not found",
  LOCK: "This asset is still locked",
  BEXP: "Expiration must be in the future or hardlock disabled",
  BEXU: "Expiration must be greater than or equal to the current unlock time or hardlock disabled",
  // --- Stake lifecycle ----------------------------------------------------
  INIT: "Staking is already initialized",
  SNFD: "Stake not found",
  SNEX: "Stake does not exist",
  BAMH: "Insufficient amount held",
  IBAL: "Insufficient balance",
  ACRQ: "App commitment must be created by an app call",
  WHOL: "Withdraw is only for hard or lock",
  // --- Heartbeat ----------------------------------------------------------
  HBCU: "Heartbeat stakes cannot be updated",
  NHBM: "Only the heartbeat manager can call this method",
  HBNF: "Heartbeat not found",
  // --- 2026-10 audit fixes ------------------------------------------------
  NCRE: "Only the creator can call this method",
  ISTP: "Invalid stake type",
  ILKS: "Max-lockup setting must be between 2 weeks and 4 years",
  LKDC: "Max-lockup setting cannot decrease",
  ASIU: "App commitment can only be released by its app, or by its owner once the app is deleted"
});
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
  async checkpointSoftStake({ sender, signer, address, asset }) {
    const result = await this.client.send.checkpointSoftStake({
      ...this.getRequiredSendParams({ sender, signer }),
      args: { address, asset }
    });
    if (result.return === void 0) throw new Error("Failed to checkpoint soft stake");
    return result.return;
  }
  async checkpointExpiredLock({ sender, signer, address, asset }) {
    const result = await this.client.send.checkpointExpiredLock({
      ...this.getRequiredSendParams({ sender, signer }),
      args: { address, asset }
    });
    if (result.return === void 0) throw new Error("Failed to checkpoint expired lock");
    return result.return;
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
      ...this.getReaderSendParams(),
      args: { address, stake }
    });
  }
  /** Gets the valid cumulative stake amount and its weighted average age. */
  async getWeightedStake({ address, asset }) {
    return await this.client.getWeightedStake({
      ...this.getReaderSendParams(),
      args: { address, asset }
    });
  }
  async getAppWeightedStake({
    app,
    address,
    asset,
    acceptInherited
  }) {
    return await this.client.getAppWeightedStake({
      ...this.getReaderSendParams(),
      args: { app, address, asset, acceptInherited }
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
    return infoList.map(([amount, lastUpdate, expiration, weightedAge]) => ({
      amount,
      lastUpdate,
      expiration,
      weightedAge
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
    return infoList.map(([amount, lastUpdate, expiration, weightedAge]) => ({
      amount,
      lastUpdate,
      expiration,
      weightedAge
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
      const algod = this.client.algorand.client.algod;
      const status = await algod.status().do();
      const latestTimestamp = (await algod.block(status.lastRound).do()).block.header.timestamp;
      if (args.expiration < latestTimestamp) {
        throw new Error("Expiration must be in the future");
      }
      expiration = args.expiration;
    } else {
      expiration = 0n;
    }
    const cost = await this.stakeCost(asset, type, sendParams.sender.toString());
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
        amount: isEscrowed ? amount : 0n,
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
      args: { asset, type },
      extraFee: microAlgo(BigInt(asset) === 0n ? 1e3 : 2e3)
    });
  }
  /** Sets the heartbeat manager. Staking only accepts this from the DAO wallet. */
  async setHeartbeatManager({ sender, signer, manager }) {
    return await this.client.send.setHeartbeatManager({
      ...this.getSendParams({ sender, signer }),
      args: { manager }
    });
  }
  /** Closes the sender's SOFT stake for `asset` and refunds its box MBR. */
  async closeSoftStake({ sender, signer, asset }) {
    return await this.client.send.closeSoftStake({
      ...this.getSendParams({ sender, signer }),
      args: { asset },
      extraFee: microAlgo(1e3)
    });
  }
  /** Closes the sender's heartbeat stake and history for `asset` and refunds both boxes' MBR. */
  async closeHeartbeat({ sender, signer, asset }) {
    return await this.client.send.closeHeartbeat({
      ...this.getSendParams({ sender, signer }),
      args: { asset },
      extraFee: microAlgo(1e3)
    });
  }
  /**
   * Releases an app-scoped commitment and refunds its MBR to `address`. Callable by the owner
   * once the consuming app has been deleted (the app itself releases otherwise).
   */
  async releaseAppStake({ sender, signer, app, address, asset }) {
    return await this.client.send.releaseAppStake({
      ...this.getSendParams({ sender, signer }),
      args: { app, address, asset },
      extraFee: microAlgo(1e3),
      populateAppCallResources: true
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
    const [current] = await this.client.getSettings({ args: { assets: [BigInt(asset)] } });
    const payment = this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: microAlgo((current == null ? void 0 : current[1]) ? 0 : 9300),
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
  /** MBR `staker` pays for a new stake of this kind; 0 when it already has one (a top-up). */
  async stakeCost(asset, type, staker) {
    return await this.client.stakeCost({
      ...staker ? { sender: staker } : {},
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
//# sourceMappingURL=chunk-OEXE6DUL.mjs.map
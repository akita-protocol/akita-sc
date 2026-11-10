"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } var _class; var _class2;


var _chunkQ5IKYOZSjs = require('./chunk-Q5IKYOZS.js');


var _chunk3QW7XUAWjs = require('./chunk-3QW7XUAW.js');


var _chunkMY4J3UZTjs = require('./chunk-MY4J3UZT.js');

// src/staking/index.ts
var _algokitutils = require('@algorandfoundation/algokit-utils');

// src/generated/StakingClient.ts
var _apparc56 = require('@algorandfoundation/algokit-utils/types/app-arc56');


var _appclient = require('@algorandfoundation/algokit-utils/types/app-client');
var _appfactory = require('@algorandfoundation/algokit-utils/types/app-factory');
var APP_SPEC = { "name": "Staking", "structs": { "AppStake": [{ "name": "amount", "type": "uint64" }, { "name": "lastUpdate", "type": "uint64" }, { "name": "weightedAge", "type": "uint64" }, { "name": "inheritedAge", "type": "uint64" }], "AppStakeKey": [{ "name": "app", "type": "uint64" }, { "name": "address", "type": "address" }, { "name": "asset", "type": "uint64" }], "Escrow": [{ "name": "hard", "type": "uint64" }, { "name": "lock", "type": "uint64" }], "HeartbeatKey": [{ "name": "address", "type": "address" }, { "name": "asset", "type": "uint64" }], "Stake": [{ "name": "amount", "type": "uint64" }, { "name": "lastUpdate", "type": "uint64" }, { "name": "expiration", "type": "uint64" }, { "name": "weightedAge", "type": "uint64" }], "StakeCheck": [{ "name": "valid", "type": "bool" }, { "name": "balance", "type": "uint64" }], "StakeInfo": [{ "name": "asset", "type": "uint64" }, { "name": "type", "type": "uint8" }], "StakeKey": [{ "name": "address", "type": "address" }, { "name": "asset", "type": "uint64" }, { "name": "type", "type": "uint8" }], "TotalsInfo": [{ "name": "locked", "type": "uint64" }, { "name": "escrowed", "type": "uint64" }, { "name": "liveLockedStake", "type": "uint64" }], "WeightedStake": [{ "name": "amount", "type": "uint64" }, { "name": "weightedAge", "type": "uint64" }] }, "methods": [{ "name": "create", "args": [{ "type": "string", "name": "version" }, { "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "init", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "optIn", "args": [{ "type": "pay", "name": "payment", "desc": "The payment transaction" }, { "type": "uint64", "name": "asset", "desc": "The asset to be opted into" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "optin tells the contract to opt into an asa", "events": [], "recommendations": {} }, { "name": "stake", "args": [{ "type": "pay", "name": "payment" }, { "type": "uint8", "name": "type" }, { "type": "uint64", "name": "amount" }, { "type": "uint64", "name": "expiration" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "stakeAsa", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "uint8", "name": "type" }, { "type": "uint64", "name": "amount" }, { "type": "uint64", "name": "expiration" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "withdraw", "args": [{ "type": "uint64", "name": "asset" }, { "type": "uint8", "name": "type" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "checkpointExpiredLock", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "asset" }], "returns": { "type": "bool" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Permissionlessly removes an expired lock from the live governance total.", "events": [], "recommendations": {} }, { "name": "createHeartbeat", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "asset" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "checkpointSoftStake", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "asset" }], "returns": { "type": "(bool,uint64)", "struct": "StakeCheck" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Permissionlessly records an observed shortfall against the portable root commitment.", "events": [], "recommendations": {} }, { "name": "commitAppSoftStake", "args": [{ "type": "pay", "name": "payment" }, { "type": "address", "name": "address" }, { "type": "uint64", "name": "asset" }, { "type": "uint64", "name": "amount" }, { "type": "bool", "name": "inheritRoot" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Creates or adds to a soft commitment scoped to one consuming app.\nNew commitments may inherit the portable root's current weighted age.", "events": [], "recommendations": {} }, { "name": "checkpointAppSoftStake", "args": [{ "type": "uint64", "name": "app" }, { "type": "address", "name": "address" }, { "type": "uint64", "name": "asset" }], "returns": { "type": "(bool,uint64)", "struct": "StakeCheck" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": 'Records a shortfall against an app-scoped commitment.\n\nAnyone may call it, but only the consuming app itself may shrink the commitment; any other\ncaller only resets its accrued age. Otherwise a holder could empty their wallet, shrink their\nown commitment to 0 and stay "valid" for that app forever (H-1). A missing commitment (never\nmade, or released) is reported as invalid instead of failing.', "events": [], "recommendations": {} }, { "name": "updateSettings", "args": [{ "type": "pay", "name": "payment" }, { "type": "uint64", "name": "asset" }, { "type": "uint64", "name": "value" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Sets an asset's maximum lock duration (stakeAsa LOCK).\n\n- The DAO's governance assets (AKTA / BONES) can only be configured by the DAO wallet; any\n  other asset by its creator (DAO-05).\n- The value must lie in [2 weeks, 4 years] and may never decrease, so a configured lockup can\n  neither freeze locking nor strand existing lockers' assumptions (G-5).", "events": [], "recommendations": {} }, { "name": "setHeartbeatManager", "args": [{ "type": "address", "name": "manager" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Sets the account allowed to record heartbeats. DAO wallet only (ST-4).", "events": [], "recommendations": {} }, { "name": "closeSoftStake", "args": [{ "type": "uint64", "name": "asset" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Owner closes their SOFT stake and gets the stake box MBR back (L-2).", "events": [], "recommendations": {} }, { "name": "closeHeartbeat", "args": [{ "type": "uint64", "name": "asset" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Owner closes their heartbeat stake and its history and gets both boxes' MBR back (L-2).", "events": [], "recommendations": {} }, { "name": "releaseAppStake", "args": [{ "type": "uint64", "name": "app" }, { "type": "address", "name": "address" }, { "type": "uint64", "name": "asset" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Deletes an app-scoped commitment and refunds its box MBR to the committed address (L-2).\nAllowed for the consuming app itself, or for the owner once that app no longer exists.", "events": [], "recommendations": {} }, { "name": "optInCost", "args": [], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "stakeCost", "args": [{ "type": "uint64", "name": "asset" }, { "type": "uint8", "name": "type" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "appStakeCost", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "asset" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getTimeLeft", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "asset" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "mustGetTimeLeft", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "asset" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getInfo", "args": [{ "type": "address", "name": "address" }, { "type": "(uint64,uint8)", "struct": "StakeInfo", "name": "stake" }], "returns": { "type": "(uint64,uint64,uint64,uint64)", "struct": "Stake" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "mustGetInfo", "args": [{ "type": "address", "name": "address" }, { "type": "(uint64,uint8)", "struct": "StakeInfo", "name": "stake" }], "returns": { "type": "(uint64,uint64,uint64,uint64)", "struct": "Stake" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getWeightedStake", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "asset" }], "returns": { "type": "(uint64,uint64)", "struct": "WeightedStake" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "softCheck", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "asset" }], "returns": { "type": "(bool,uint64)", "struct": "StakeCheck" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getAppWeightedStake", "args": [{ "type": "uint64", "name": "app" }, { "type": "address", "name": "address" }, { "type": "uint64", "name": "asset" }, { "type": "bool", "name": "acceptInherited" }], "returns": { "type": "(uint64,uint64)", "struct": "WeightedStake" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getInfoAtLeast", "args": [{ "type": "address", "name": "address" }, { "type": "(uint64,uint8)", "struct": "StakeInfo", "name": "stake" }], "returns": { "type": "(uint64,uint64,uint64,uint64)[]" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getEscrowInfo", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "asset" }], "returns": { "type": "(uint64,uint64)", "struct": "Escrow" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getHeartbeat", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "asset" }], "returns": { "type": "(uint64,uint64,uint64,uint64)[4]" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "mustGetHeartbeat", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "asset" }], "returns": { "type": "(uint64,uint64,uint64,uint64)[4]" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getHeartbeatAverage", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "asset" }, { "type": "bool", "name": "includeEscrowed" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "mustGetHeartbeatAverage", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "asset" }, { "type": "bool", "name": "includeEscrowed" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getInfoList", "args": [{ "type": "address", "name": "address" }, { "type": "uint8", "name": "type" }, { "type": "uint64[]", "name": "assets" }], "returns": { "type": "(uint64,uint64,uint64,uint64)[]" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "mustGetInfoList", "args": [{ "type": "address", "name": "address" }, { "type": "uint8", "name": "type" }, { "type": "uint64[]", "name": "assets" }], "returns": { "type": "(uint64,uint64,uint64,uint64)[]" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "stakeCheck", "args": [{ "type": "address", "name": "address" }, { "type": "(uint64,uint64)[]", "name": "checks" }, { "type": "uint8", "name": "type" }, { "type": "bool", "name": "includeEscrowed" }], "returns": { "type": "bool" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getTotals", "args": [{ "type": "uint64[]", "name": "assets" }], "returns": { "type": "(uint64,uint64,uint64)[]" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getSettings", "args": [{ "type": "uint64[]", "name": "assets" }], "returns": { "type": "(uint64,bool)[]" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "update", "args": [{ "type": "string", "name": "newVersion" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["UpdateApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 1, "bytes": 2 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "heartbeatManagerAddress": { "keyType": "AVMString", "valueType": "address", "key": "aGVhcnRiZWF0X21hbmFnZXJfYWRkcmVzcw==", "desc": "The address that is allowed to call the 'beat' method to create heartbeat records" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" } }, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": { "stakes": { "keyType": "StakeKey", "valueType": "Stake", "prefix": "cw==" }, "appStakes": { "keyType": "AppStakeKey", "valueType": "AppStake", "prefix": "YQ==" }, "heartbeats": { "keyType": "HeartbeatKey", "valueType": "(uint64,uint64,uint64,uint64)[4]", "prefix": "aA==" }, "totals": { "keyType": "uint64", "valueType": "TotalsInfo", "prefix": "dA==" }, "settings": { "keyType": "uint64", "valueType": "uint64", "prefix": "ZQ==" } } } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [1419, 1750, 2082, 2371, 2569, 2708, 2758, 2802, 2971, 3255, 3318, 3486, 3721, 4322, 4340, 4409, 4422, 4536, 4635, 4975, 5017, 5084, 5132, 5233, 5452, 5604, 5778, 5886, 5989, 6165, 6185, 6217, 6237, 6265, 6287, 6475, 6681, 6737, 6776, 6843, 6921], "errorMessage": "Box must have value" }, { "pc": [3120, 4234], "errorMessage": "ERR:errAcrq" }, { "pc": [1046], "errorMessage": "ERR:errAopt" }, { "pc": [4109], "errorMessage": "ERR:errAsiu" }, { "pc": [1222, 1803], "errorMessage": "ERR:errBexp" }, { "pc": [1454, 2117], "errorMessage": "ERR:errBexu" }, { "pc": [1409, 2072], "errorMessage": "ERR:errHbcu" }, { "pc": [2696, 5130, 5231], "errorMessage": "ERR:errHbnf" }, { "pc": [1867, 1879, 1946, 1984, 2058, 2158, 2170, 2262], "errorMessage": "ERR:errIaam" }, { "pc": [1371, 1555, 2022, 2253, 3221, 3282, 3334], "errorMessage": "ERR:errIbal" }, { "pc": [3704], "errorMessage": "ERR:errIlks" }, { "pc": [994], "errorMessage": "ERR:errInit" }, { "pc": [1065, 1076, 1261, 1276, 1330, 1341, 1383, 1394, 3188, 3201, 3764, 3784], "errorMessage": "ERR:errIpay" }, { "pc": [1484, 1854, 1974, 2049, 2142], "errorMessage": "ERR:errIpma" }, { "pc": [1471, 1841, 1960, 2036, 2131], "errorMessage": "ERR:errIpmr" }, { "pc": [882, 1655], "errorMessage": "ERR:errIpms" }, { "pc": [6611], "errorMessage": "ERR:errIstp" }, { "pc": [6096], "errorMessage": "ERR:errIupg" }, { "pc": [3743], "errorMessage": "ERR:errLkdc" }, { "pc": [2404, 4420], "errorMessage": "ERR:errLock" }, { "pc": [3831], "errorMessage": "ERR:errNacr" }, { "pc": [896, 1692], "errorMessage": "ERR:errNcls" }, { "pc": [1679], "errorMessage": "ERR:errNclw" }, { "pc": [971], "errorMessage": "ERR:errNcre" }, { "pc": [3666, 3864, 6060, 6133], "errorMessage": "ERR:errNdao" }, { "pc": [2661], "errorMessage": "ERR:errNhbm" }, { "pc": [2368, 4403, 4534], "errorMessage": "ERR:errNlck" }, { "pc": [1939, 2012, 2243, 3159], "errorMessage": "ERR:errNopt" }, { "pc": [910, 1705], "errorMessage": "ERR:errNrky" }, { "pc": [2951, 3249, 3901, 3958, 4063, 4633], "errorMessage": "ERR:errSnex" }, { "pc": [5602], "errorMessage": "ERR:errSnfd" }, { "pc": [2326], "errorMessage": "ERR:errWhol" }, { "pc": [1361, 1545, 4650, 4657, 6391], "errorMessage": "account funded" }, { "pc": [3658, 3856, 6052, 6125], "errorMessage": "application exists" }, { "pc": [3812], "errorMessage": "asset exists" }, { "pc": [2642, 3593, 3651, 3849, 6045, 6065, 6118], "errorMessage": "check GlobalState exists" }, { "pc": [2839, 2855, 5251, 5716, 5880, 5954, 6939], "errorMessage": "index access is out of bounds" }, { "pc": [2607, 2891, 6174, 6194, 6226, 6246, 6276, 6298], "errorMessage": "index out of bounds" }, { "pc": [917, 5353, 5515, 5662, 5847, 5921, 6027], "errorMessage": "invalid array length header" }, { "pc": [3109, 4737, 5163, 5201, 5693], "errorMessage": "invalid number of bytes for arc4.bool" }, { "pc": [925, 6035], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [5675], "errorMessage": "invalid number of bytes for arc4.dynamic_array<smart_contracts/staking/types.ts::AssetCheck>" }, { "pc": [5365, 5527, 5859, 5933], "errorMessage": "invalid number of bytes for arc4.dynamic_array<uint64>" }, { "pc": [2521, 2626, 2918, 3082, 3410, 3842, 4030, 4216, 4274, 4357, 4443, 4471, 4554, 4583, 4720, 4762, 4918, 5042, 5095, 5146, 5184, 5336, 5498, 5655], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [936, 1019, 1138, 1149, 1617, 1628, 2285, 2529, 2634, 2926, 3090, 3100, 3400, 3418, 3578, 3587, 3878, 3932, 4017, 4038, 4152, 4224, 4282, 4365, 4562, 4591, 4711, 4728, 4926, 5050, 5103, 5154, 5192, 6110], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [1130, 1609, 2295, 4161, 5346, 5508, 5685], "errorMessage": "invalid number of bytes for arc4.uint8" }, { "pc": [4452, 4480, 4772], "errorMessage": "invalid number of bytes for smart_contracts/staking/types.ts::StakeInfo" }, { "pc": [1598], "errorMessage": "transaction type is axfer" }, { "pc": [1011, 1119, 1584, 3072, 3570], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDggMzIgMzIxMDAgMTAyMjAwIDMxNTM2MDAwIDM0OTAwCiAgICBieXRlY2Jsb2NrICJzIiAweDE1MWY3Yzc1IDB4MjggIkVSUjplcnJJcGF5IiAweDFlIDB4MTQgImFraXRhX2RhbyIgInQiIDB4MGEgImgiICJFUlI6ZXJySWFhbSIgMHgwMCAiRVJSOmVyckliYWwiICJFUlI6ZXJyU25leCIgIkVSUjplcnJJcG1yIiAiRVJSOmVycklwbWEiICJhIiAweDAwMDAgIkVSUjplcnJOb3B0IiAid2FsbGV0IiAiRVJSOmVyck5kYW8iIDB4MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCAiZSIgIkVSUjplcnJObGNrIiAiRVJSOmVyckhibmYiICJFUlI6ZXJySXBtcyIgIkVSUjplcnJOY2xzIiAiRVJSOmVyck5ya3kiICJ2ZXJzaW9uIiAweDc0MDAwMDAwMDAwMDAwMDAwMCAweDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCAiRVJSOmVyckJleHAiICJFUlI6ZXJySGJjdSIgIkVSUjplcnJCZXh1IiAiRVJSOmVyckxvY2siICJoZWFydGJlYXRfbWFuYWdlcl9hZGRyZXNzIiAiRVJSOmVyckFjcnEiIDB4MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAgMHgwMDAwMDAwMDAwMDAwMDAwMDAgMHgwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjk2CiAgICAvLyBleHBvcnQgY2xhc3MgU3Rha2luZyBleHRlbmRzIGNsYXNzZXMoQmFzZVN0YWtpbmcsIFVwZ3JhZGVhYmxlQWtpdGFCYXNlQ29udHJhY3QpIHsKICAgIHB1c2hieXRlcyAweGVhOTE4MGRkIC8vIG1ldGhvZCAidXBkYXRlKHN0cmluZyl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggbWFpbl91cGRhdGVfcm91dGVANAoKbWFpbl9zd2l0Y2hfY2FzZV9uZXh0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjk2CiAgICAvLyBleHBvcnQgY2xhc3MgU3Rha2luZyBleHRlbmRzIGNsYXNzZXMoQmFzZVN0YWtpbmcsIFVwZ3JhZGVhYmxlQWtpdGFCYXNlQ29udHJhY3QpIHsKICAgIHR4biBPbkNvbXBsZXRpb24KICAgICEKICAgIGFzc2VydAogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgIGJ6IG1haW5fY3JlYXRlX05vT3BANDYKICAgIHB1c2hieXRlc3MgMHg4M2YxNDc0OCAweDM5NGVhZWIyIDB4ODI1NmNmMTkgMHgyMDQ2N2I5MyAweDgzMDQ4MGYzIDB4YzQyOGExMjcgMHhjODE3M2NhMSAweGExMDAzMzlmIDB4MGQwMzdjODkgMHg1YmZkZTgwMiAweDVkOWQxNDI4IDB4ZTkxMDNjNGYgMHgwOTVjOWNhNSAweDE1NWE0NjdhIDB4NmViNzcwNzggMHgyMjM1YTY4MyAweDZjYjAwZTdkIDB4YTE0NzdiNzMgMHg5ZjRmNTY3NCAweDc1ZDEzOGZiIDB4ZDQwMTYyYWYgMHhlYTdkYTk1NSAweGJiNmMzNzI4IDB4NDg3MTZmMWEgMHhlZjE4YTQ5NiAweGZhZDdmODE3IDB4NGM4OGVhY2UgMHhlYWU2NWYxMiAweGRkNDRhODQzIDB4YzZmZDBjYTUgMHg4YWUyNjZiOSAweDI2MzUxNDhkIDB4M2UwMGI5OTQgMHg5ZGZmNDA2MCAweDRmYzMxNmNhIDB4OGFlNzg5OWYgMHgzM2U5MmM5NCAweDg1NGRlZGUwIC8vIG1ldGhvZCAiaW5pdCgpdm9pZCIsIG1ldGhvZCAib3B0SW4ocGF5LHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJzdGFrZShwYXksdWludDgsdWludDY0LHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJzdGFrZUFzYShwYXksYXhmZXIsdWludDgsdWludDY0LHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJ3aXRoZHJhdyh1aW50NjQsdWludDgpdm9pZCIsIG1ldGhvZCAiY2hlY2twb2ludEV4cGlyZWRMb2NrKGFkZHJlc3MsdWludDY0KWJvb2wiLCBtZXRob2QgImNyZWF0ZUhlYXJ0YmVhdChhZGRyZXNzLHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJjaGVja3BvaW50U29mdFN0YWtlKGFkZHJlc3MsdWludDY0KShib29sLHVpbnQ2NCkiLCBtZXRob2QgImNvbW1pdEFwcFNvZnRTdGFrZShwYXksYWRkcmVzcyx1aW50NjQsdWludDY0LGJvb2wpdm9pZCIsIG1ldGhvZCAiY2hlY2twb2ludEFwcFNvZnRTdGFrZSh1aW50NjQsYWRkcmVzcyx1aW50NjQpKGJvb2wsdWludDY0KSIsIG1ldGhvZCAidXBkYXRlU2V0dGluZ3MocGF5LHVpbnQ2NCx1aW50NjQpdm9pZCIsIG1ldGhvZCAic2V0SGVhcnRiZWF0TWFuYWdlcihhZGRyZXNzKXZvaWQiLCBtZXRob2QgImNsb3NlU29mdFN0YWtlKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJjbG9zZUhlYXJ0YmVhdCh1aW50NjQpdm9pZCIsIG1ldGhvZCAicmVsZWFzZUFwcFN0YWtlKHVpbnQ2NCxhZGRyZXNzLHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJvcHRJbkNvc3QoKXVpbnQ2NCIsIG1ldGhvZCAic3Rha2VDb3N0KHVpbnQ2NCx1aW50OCl1aW50NjQiLCBtZXRob2QgImFwcFN0YWtlQ29zdChhZGRyZXNzLHVpbnQ2NCl1aW50NjQiLCBtZXRob2QgImdldFRpbWVMZWZ0KGFkZHJlc3MsdWludDY0KXVpbnQ2NCIsIG1ldGhvZCAibXVzdEdldFRpbWVMZWZ0KGFkZHJlc3MsdWludDY0KXVpbnQ2NCIsIG1ldGhvZCAiZ2V0SW5mbyhhZGRyZXNzLCh1aW50NjQsdWludDgpKSh1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQpIiwgbWV0aG9kICJtdXN0R2V0SW5mbyhhZGRyZXNzLCh1aW50NjQsdWludDgpKSh1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQpIiwgbWV0aG9kICJnZXRXZWlnaHRlZFN0YWtlKGFkZHJlc3MsdWludDY0KSh1aW50NjQsdWludDY0KSIsIG1ldGhvZCAic29mdENoZWNrKGFkZHJlc3MsdWludDY0KShib29sLHVpbnQ2NCkiLCBtZXRob2QgImdldEFwcFdlaWdodGVkU3Rha2UodWludDY0LGFkZHJlc3MsdWludDY0LGJvb2wpKHVpbnQ2NCx1aW50NjQpIiwgbWV0aG9kICJnZXRJbmZvQXRMZWFzdChhZGRyZXNzLCh1aW50NjQsdWludDgpKSh1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQpW10iLCBtZXRob2QgImdldEVzY3Jvd0luZm8oYWRkcmVzcyx1aW50NjQpKHVpbnQ2NCx1aW50NjQpIiwgbWV0aG9kICJnZXRIZWFydGJlYXQoYWRkcmVzcyx1aW50NjQpKHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NClbNF0iLCBtZXRob2QgIm11c3RHZXRIZWFydGJlYXQoYWRkcmVzcyx1aW50NjQpKHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NClbNF0iLCBtZXRob2QgImdldEhlYXJ0YmVhdEF2ZXJhZ2UoYWRkcmVzcyx1aW50NjQsYm9vbCl1aW50NjQiLCBtZXRob2QgIm11c3RHZXRIZWFydGJlYXRBdmVyYWdlKGFkZHJlc3MsdWludDY0LGJvb2wpdWludDY0IiwgbWV0aG9kICJnZXRJbmZvTGlzdChhZGRyZXNzLHVpbnQ4LHVpbnQ2NFtdKSh1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQpW10iLCBtZXRob2QgIm11c3RHZXRJbmZvTGlzdChhZGRyZXNzLHVpbnQ4LHVpbnQ2NFtdKSh1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQpW10iLCBtZXRob2QgInN0YWtlQ2hlY2soYWRkcmVzcywodWludDY0LHVpbnQ2NClbXSx1aW50OCxib29sKWJvb2wiLCBtZXRob2QgImdldFRvdGFscyh1aW50NjRbXSkodWludDY0LHVpbnQ2NCx1aW50NjQpW10iLCBtZXRob2QgImdldFNldHRpbmdzKHVpbnQ2NFtdKSh1aW50NjQsYm9vbClbXSIsIG1ldGhvZCAidXBkYXRlQWtpdGFEQU8odWludDY0KXZvaWQiLCBtZXRob2QgIm9wVXAoKXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBpbml0IG9wdEluIHN0YWtlIHN0YWtlQXNhIHdpdGhkcmF3IGNoZWNrcG9pbnRFeHBpcmVkTG9jayBjcmVhdGVIZWFydGJlYXQgY2hlY2twb2ludFNvZnRTdGFrZSBjb21taXRBcHBTb2Z0U3Rha2UgY2hlY2twb2ludEFwcFNvZnRTdGFrZSB1cGRhdGVTZXR0aW5ncyBzZXRIZWFydGJlYXRNYW5hZ2VyIGNsb3NlU29mdFN0YWtlIGNsb3NlSGVhcnRiZWF0IHJlbGVhc2VBcHBTdGFrZSBvcHRJbkNvc3Qgc3Rha2VDb3N0IGFwcFN0YWtlQ29zdCBnZXRUaW1lTGVmdCBtdXN0R2V0VGltZUxlZnQgZ2V0SW5mbyBtdXN0R2V0SW5mbyBnZXRXZWlnaHRlZFN0YWtlIHNvZnRDaGVjayBnZXRBcHBXZWlnaHRlZFN0YWtlIGdldEluZm9BdExlYXN0IGdldEVzY3Jvd0luZm8gZ2V0SGVhcnRiZWF0IG11c3RHZXRIZWFydGJlYXQgZ2V0SGVhcnRiZWF0QXZlcmFnZSBtdXN0R2V0SGVhcnRiZWF0QXZlcmFnZSBnZXRJbmZvTGlzdCBtdXN0R2V0SW5mb0xpc3Qgc3Rha2VDaGVjayBnZXRUb3RhbHMgZ2V0U2V0dGluZ3MgdXBkYXRlQWtpdGFEQU8gbWFpbl9vcFVwX3JvdXRlQDQ0CiAgICBlcnIKCm1haW5fb3BVcF9yb3V0ZUA0NDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozMAogICAgLy8gb3BVcCgpOiB2b2lkIHsgfQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKbWFpbl9jcmVhdGVfTm9PcEA0NjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OTYKICAgIC8vIGV4cG9ydCBjbGFzcyBTdGFraW5nIGV4dGVuZHMgY2xhc3NlcyhCYXNlU3Rha2luZywgVXBncmFkZWFibGVBa2l0YUJhc2VDb250cmFjdCkgewogICAgcHVzaGJ5dGVzIDB4Y2Q5YWQ2N2UgLy8gbWV0aG9kICJjcmVhdGUoc3RyaW5nLHVpbnQ2NCl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggY3JlYXRlCiAgICBlcnIKCm1haW5fdXBkYXRlX3JvdXRlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzUKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgdHhuIE9uQ29tcGxldGlvbgogICAgcHVzaGludCA0IC8vIFVwZGF0ZUFwcGxpY2F0aW9uCiAgICA9PQogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgICYmCiAgICBhc3NlcnQKICAgIGIgdXBkYXRlCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6YXNzZXJ0U2FmZVBheW1lbnQodHhuOiB1aW50NjQsIHNlbmRlcjogYnl0ZXMpIC0+IHZvaWQ6CmFzc2VydFNhZmVQYXltZW50OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MQogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIGFzc2VydFNhZmVQYXltZW50KHR4bjogZ3R4bi5QYXltZW50VHhuLCBzZW5kZXI6IEFjY291bnQpOiB2b2lkIHsKICAgIHByb3RvIDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MgogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5zZW5kZXIgPT09IHNlbmRlciwgZXJySW52YWxpZFBheW1lbnRTZW5kZXIpCiAgICBmcmFtZV9kaWcgLTIKICAgIGd0eG5zIFNlbmRlcgogICAgZnJhbWVfZGlnIC0xCiAgICA9PQogICAgYm56IGFzc2VydFNhZmVQYXltZW50X2FmdGVyX2Fzc2VydEAyCiAgICBieXRlYyAyNSAvLyAiRVJSOmVycklwbXMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBtcwoKYXNzZXJ0U2FmZVBheW1lbnRfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYzCiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLmNsb3NlUmVtYWluZGVyVG8gPT09IEdsb2JhbC56ZXJvQWRkcmVzcywgZXJyQ2xvc2VGb3JiaWRkZW4pCiAgICBmcmFtZV9kaWcgLTIKICAgIGd0eG5zIENsb3NlUmVtYWluZGVyVG8KICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIGJueiBhc3NlcnRTYWZlUGF5bWVudF9hZnRlcl9hc3NlcnRANAogICAgYnl0ZWMgMjYgLy8gIkVSUjplcnJOY2xzIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5jbHMKCmFzc2VydFNhZmVQYXltZW50X2FmdGVyX2Fzc2VydEA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NAogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5yZWtleVRvID09PSBHbG9iYWwuemVyb0FkZHJlc3MsIGVyclJla2V5Rm9yYmlkZGVuKQogICAgZnJhbWVfZGlnIC0yCiAgICBndHhucyBSZWtleVRvCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgID09CiAgICBibnogYXNzZXJ0U2FmZVBheW1lbnRfYWZ0ZXJfYXNzZXJ0QDYKICAgIGJ5dGVjIDI3IC8vICJFUlI6ZXJyTnJreSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOcmt5Cgphc3NlcnRTYWZlUGF5bWVudF9hZnRlcl9hc3NlcnRANjoKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuY3JlYXRlW3JvdXRpbmddKCkgLT4gdm9pZDoKY3JlYXRlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMjIKICAgIC8vIEBhYmltZXRob2QoeyBvbkNyZWF0ZTogJ3JlcXVpcmUnIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNAogICAgLy8gdmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5VmVyc2lvbiB9KQogICAgYnl0ZWMgMjggLy8gInZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEyNAogICAgLy8gdGhpcy52ZXJzaW9uLnZhbHVlID0gdmVyc2lvbgogICAgdW5jb3ZlciAyCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWMgNiAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMjUKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUgPSBha2l0YURBTwogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTIyCiAgICAvLyBAYWJpbWV0aG9kKHsgb25DcmVhdGU6ICdyZXF1aXJlJyB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuaW5pdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmluaXQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEyOQogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywgZXJyTm90Q3JlYXRvcikKICAgIHR4biBTZW5kZXIKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgPT0KICAgIGJueiBpbml0X2FmdGVyX2Fzc2VydEAzCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJOY3JlIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5jcmUKCmluaXRfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExNgogICAgLy8gdG90YWxzID0gQm94TWFwPHVpbnQ2NCwgVG90YWxzSW5mbz4oeyBrZXlQcmVmaXg6IFN0YWtpbmdCb3hQcmVmaXhUb3RhbHMgfSkKICAgIGJ5dGVjIDI5IC8vIDB4NzQwMDAwMDAwMDAwMDAwMDAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEzMAogICAgLy8gbG9nZ2VkQXNzZXJ0KCF0aGlzLnRvdGFscygwKS5leGlzdHMsIGVyckFscmVhZHlJbml0aWFsaXplZCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogaW5pdF9hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6ZXJySW5pdCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJbml0Cgppbml0X2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMTYKICAgIC8vIHRvdGFscyA9IEJveE1hcDx1aW50NjQsIFRvdGFsc0luZm8+KHsga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4VG90YWxzIH0pCiAgICBieXRlYyAyOSAvLyAweDc0MDAwMDAwMDAwMDAwMDAwMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMzEKICAgIC8vIHRoaXMudG90YWxzKDApLnZhbHVlID0geyBsb2NrZWQ6IDAsIGVzY3Jvd2VkOiAwLCBsaXZlTG9ja2VkU3Rha2U6IDAgfQogICAgYnl0ZWMgMzAgLy8gMHgwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTI4CiAgICAvLyBpbml0KCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcub3B0SW5bcm91dGluZ10oKSAtPiB2b2lkOgpvcHRJbjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MjczCiAgICAvLyBvcHRJbihwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGFzc2V0OiB1aW50NjQpOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjI3NAogICAgLy8gbG9nZ2VkQXNzZXJ0KCFHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcy5pc09wdGVkSW4oQXNzZXQoYXNzZXQpKSwgZXJyQWxyZWFkeU9wdGVkSW4pCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgc3dhcAogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJ6IG9wdEluX2FmdGVyX2Fzc2VydEAzCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJBb3B0IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckFvcHQKCm9wdEluX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoyNzgKICAgIC8vIHRvdGFsc01CUiArCiAgICBwdXNoaW50IDE1NzAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjI3OQogICAgLy8gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6Mjc4LTI3OQogICAgLy8gdG90YWxzTUJSICsKICAgIC8vIEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoyODIKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJySW52YWxpZFBheW1lbnQpCiAgICBkaWcgMgogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IG9wdEluX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlY18zIC8vICJFUlI6ZXJySXBheSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcGF5CgpvcHRJbl9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MjgzCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IG1iciwgZXJySW52YWxpZFBheW1lbnQpCiAgICB1bmNvdmVyIDIKICAgIGd0eG5zIEFtb3VudAogICAgPT0KICAgIGJueiBvcHRJbl9hZnRlcl9hc3NlcnRANwogICAgYnl0ZWNfMyAvLyAiRVJSOmVycklwYXkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBheQoKb3B0SW5fYWZ0ZXJfYXNzZXJ0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjI4NS0yODkKICAgIC8vIGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICBhc3NldEFtb3VudDogMCwKICAgIC8vICAgeGZlckFzc2V0OiBhc3NldAogICAgLy8gfSkuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6Mjg2CiAgICAvLyBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBkaWcgMQogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6Mjg3CiAgICAvLyBhc3NldEFtb3VudDogMCwKICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6Mjg1LTI4OQogICAgLy8gaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyB9KS5zdWJtaXQoKQogICAgcHVzaGludCA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjI5MQogICAgLy8gdGhpcy50b3RhbHMoYXNzZXQpLnZhbHVlID0gewogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMTYKICAgIC8vIHRvdGFscyA9IEJveE1hcDx1aW50NjQsIFRvdGFsc0luZm8+KHsga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4VG90YWxzIH0pCiAgICBieXRlYyA3IC8vICJ0IgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjI5MS0yOTUKICAgIC8vIHRoaXMudG90YWxzKGFzc2V0KS52YWx1ZSA9IHsKICAgIC8vICAgbG9ja2VkOiAwLAogICAgLy8gICBlc2Nyb3dlZDogMCwKICAgIC8vICAgbGl2ZUxvY2tlZFN0YWtlOiAwLAogICAgLy8gfQogICAgYnl0ZWMgMzAgLy8gMHgwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MjczCiAgICAvLyBvcHRJbihwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGFzc2V0OiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLnN0YWtlW3JvdXRpbmddKCkgLT4gdm9pZDoKc3Rha2U6CiAgICBwdXNoYnl0ZXMgIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6Mjk4CiAgICAvLyBzdGFrZShwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIHR5cGU6IFN0YWtpbmdUeXBlLCBhbW91bnQ6IHVpbnQ2NCwgZXhwaXJhdGlvbjogdWludDY0KTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cG4gMgogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgY292ZXIgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ4CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciA0CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIGNvdmVyIDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6Mjk5CiAgICAvLyB0aGlzLmFzc2VydFZhbGlkU3Rha2VUeXBlKHR5cGUpCiAgICBkaWcgMQogICAgY2FsbHN1YiBhc3NlcnRWYWxpZFN0YWtlVHlwZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czozMDEKICAgIC8vIGFzc2VydFNhZmVQYXltZW50KHBheW1lbnQsIFR4bi5zZW5kZXIpCiAgICB0eG4gU2VuZGVyCiAgICB1bmNvdmVyIDMKICAgIHN3YXAKICAgIGNhbGxzdWIgYXNzZXJ0U2FmZVBheW1lbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MzAyCiAgICAvLyBjb25zdCBpblRoZUZ1dHVyZSA9IGV4cGlyYXRpb24gPiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wCiAgICBkdXAKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgID4KICAgIGNvdmVyIDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MzAzCiAgICAvLyBjb25zdCBsZXNzVGhhbk9uZVllYXJJblRoZUZ1dHVyZSA9IGV4cGlyYXRpb24gPD0gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCArIE9ORV9ZRUFSCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBpbnRjIDYgLy8gMzE1MzYwMDAKICAgICsKICAgIDw9CiAgICBjb3ZlciA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjMwNAogICAgLy8gY29uc3QgbG9ja2VkID0gdHlwZSA9PT0gU1RBS0lOR19UWVBFX0xPQ0sKICAgIGR1cAogICAgYnl0ZWNfMiAvLyAweDI4CiAgICA9PQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czozMDUKICAgIC8vIGNvbnN0IGlzRXNjcm93ID0gdHlwZSA9PT0gU1RBS0lOR19UWVBFX0hBUkQgfHwgdHlwZSA9PT0gU1RBS0lOR19UWVBFX0xPQ0sKICAgIGJ5dGVjIDQgLy8gMHgxZQogICAgPT0KICAgIGJueiBzdGFrZV9ib29sX3RydWVAMwogICAgZHVwCiAgICBieiBzdGFrZV9ib29sX2ZhbHNlQDQKCnN0YWtlX2Jvb2xfdHJ1ZUAzOgogICAgaW50Y18xIC8vIDEKCnN0YWtlX2Jvb2xfbWVyZ2VANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MzA2CiAgICAvLyBjb25zdCB0aW1lc3RhbXAgPSBHbG9iYWwubGF0ZXN0VGltZXN0YW1wCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBjb3ZlciA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjMwOAogICAgLy8gbG9nZ2VkQXNzZXJ0KChpblRoZUZ1dHVyZSAmJiBsZXNzVGhhbk9uZVllYXJJblRoZUZ1dHVyZSkgfHwgIWxvY2tlZCwgZXJyQmFkRXhwaXJhdGlvbikKICAgIHVuY292ZXIgNQogICAgYnogc3Rha2Vfb3JfY29udGRANwogICAgZGlnIDYKICAgIGJueiBzdGFrZV9ib29sX3RydWVAOAoKc3Rha2Vfb3JfY29udGRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MzA4CiAgICAvLyBsb2dnZWRBc3NlcnQoKGluVGhlRnV0dXJlICYmIGxlc3NUaGFuT25lWWVhckluVGhlRnV0dXJlKSB8fCAhbG9ja2VkLCBlcnJCYWRFeHBpcmF0aW9uKQogICAgZGlnIDEKICAgIGJueiBzdGFrZV9ib29sX2ZhbHNlQDkKCnN0YWtlX2Jvb2xfdHJ1ZUA4OgogICAgaW50Y18xIC8vIDEKCnN0YWtlX2Jvb2xfbWVyZ2VAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjMwOAogICAgLy8gbG9nZ2VkQXNzZXJ0KChpblRoZUZ1dHVyZSAmJiBsZXNzVGhhbk9uZVllYXJJblRoZUZ1dHVyZSkgfHwgIWxvY2tlZCwgZXJyQmFkRXhwaXJhdGlvbikKICAgIGJueiBzdGFrZV9hZnRlcl9hc3NlcnRAMTIKICAgIGJ5dGVjIDMxIC8vICJFUlI6ZXJyQmV4cCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJCZXhwCgpzdGFrZV9hZnRlcl9hc3NlcnRAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjMxMQogICAgLy8gYWRkcmVzczogVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MzEyCiAgICAvLyBhc3NldDogMCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjMxMC0zMTQKICAgIC8vIGNvbnN0IHNrOiBTdGFrZUtleSA9IHsKICAgIC8vICAgYWRkcmVzczogVHhuLnNlbmRlciwKICAgIC8vICAgYXNzZXQ6IDAsCiAgICAvLyAgIHR5cGUsCiAgICAvLyB9CiAgICBpdG9iCiAgICBkdXAKICAgIGNvdmVyIDcKICAgIGNvbmNhdAogICAgZGlnIDQKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDUKICAgIC8vIHN0YWtlcyA9IEJveE1hcDxTdGFrZUtleSwgU3Rha2U+KHsga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4U3Rha2VzIH0pCiAgICBieXRlY18wIC8vICJzIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGNvdmVyIDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MzE2CiAgICAvLyBjb25zdCBpc1VwZGF0ZSA9IHRoaXMuc3Rha2VzKHNrKS5leGlzdHMKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czozMTgKICAgIC8vIGlmICghaXNVcGRhdGUpIHsKICAgIGJueiBzdGFrZV9lbHNlX2JvZHlAMzYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MzIyCiAgICAvLyBpZiAoaXNFc2Nyb3cpIHsKICAgIGJ6IHN0YWtlX2Vsc2VfYm9keUAyMQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czozMjQKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJySW52YWxpZFBheW1lbnQpCiAgICBkaWcgMQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IHN0YWtlX2FmdGVyX2Fzc2VydEAxNgogICAgYnl0ZWNfMyAvLyAiRVJSOmVycklwYXkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBheQoKc3Rha2VfYWZ0ZXJfYXNzZXJ0QDE2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czozMjUKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LmFtb3VudCA9PT0gYW1vdW50ICsgY29zdHMuc3Rha2VzLCBlcnJJbnZhbGlkUGF5bWVudCkKICAgIHN3YXAKICAgIGd0eG5zIEFtb3VudAogICAgZGlnIDgKICAgIGludGMgNCAvLyAzMjEwMAogICAgKwogICAgPT0KICAgIGJueiBzdGFrZV9hZnRlcl9hc3NlcnRAMTgKICAgIGJ5dGVjXzMgLy8gIkVSUjplcnJJcGF5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwYXkKCnN0YWtlX2FmdGVyX2Fzc2VydEAxODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MzI3CiAgICAvLyB0aGlzLnVwZGF0ZVRvdGFscygwLCB0eXBlLCBhbW91bnQsIHRydWUpCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBkaWcgOAogICAgaW50Y18xIC8vIDEKICAgIGNhbGxzdWIgdXBkYXRlVG90YWxzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjMyOAogICAgLy8gaWYgKGxvY2tlZCkgewogICAgYnogc3Rha2VfYWZ0ZXJfaWZfZWxzZUAzNQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czozMjkKICAgIC8vIHRoaXMudXBkYXRlTGl2ZUxvY2tlZFN0YWtlKDAsIGFtb3VudCwgdHJ1ZSkKICAgIGludGNfMCAvLyAwCiAgICBkaWcgNgogICAgaW50Y18xIC8vIDEKICAgIGNhbGxzdWIgdXBkYXRlTGl2ZUxvY2tlZFN0YWtlCgpzdGFrZV9hZnRlcl9pZl9lbHNlQDM1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czozNTItMzU3CiAgICAvLyB0aGlzLnN0YWtlcyhzaykudmFsdWUgPSB7CiAgICAvLyAgIGFtb3VudCwKICAgIC8vICAgbGFzdFVwZGF0ZTogdGltZXN0YW1wLAogICAgLy8gICBleHBpcmF0aW9uLAogICAgLy8gICB3ZWlnaHRlZEFnZTogMCwKICAgIC8vIH0KICAgIGRpZyA1CiAgICBpdG9iCiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHVuY292ZXIgMwogICAgaXRvYgogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJveF9wdXQKCnN0YWtlX2FmdGVyX2lmX2Vsc2VANTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjI5OAogICAgLy8gc3Rha2UocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCB0eXBlOiBTdGFraW5nVHlwZSwgYW1vdW50OiB1aW50NjQsIGV4cGlyYXRpb246IHVpbnQ2NCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKc3Rha2VfZWxzZV9ib2R5QDIxOgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjMzMgogICAgLy8gfSBlbHNlIGlmICh0eXBlID09PSBTVEFLSU5HX1RZUEVfSEVBUlRCRUFUKSB7CiAgICBzd2FwCiAgICBieXRlYyA4IC8vIDB4MGEKICAgID09CiAgICBieiBzdGFrZV9lbHNlX2JvZHlAMjcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MzM2CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRQYXltZW50KQogICAgZHVwCiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogc3Rha2VfYWZ0ZXJfYXNzZXJ0QDI0CiAgICBieXRlY18zIC8vICJFUlI6ZXJySXBheSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcGF5CgpzdGFrZV9hZnRlcl9hc3NlcnRAMjQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjMzNwogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSBjb3N0cy5zdGFrZXMgKyBjb3N0cy5oZWFydGJlYXRzLCBlcnJJbnZhbGlkUGF5bWVudCkKICAgIGd0eG5zIEFtb3VudAogICAgaW50YyA1IC8vIDEwMjIwMAogICAgPT0KICAgIGJueiBzdGFrZV9hZnRlcl9hc3NlcnRAMjYKICAgIGJ5dGVjXzMgLy8gIkVSUjplcnJJcGF5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwYXkKCnN0YWtlX2FmdGVyX2Fzc2VydEAyNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MzQwCiAgICAvLyBhZGRyZXNzOiBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czozMzktMzQyCiAgICAvLyBjb25zdCBoZWFydGJlYXRLZXk6IEhlYXJ0YmVhdEtleSA9IHsKICAgIC8vICAgYWRkcmVzczogVHhuLnNlbmRlciwKICAgIC8vICAgYXNzZXQ6IDAsCiAgICAvLyB9CiAgICBkaWcgMgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExMi0xMTQKICAgIC8vIGhlYXJ0YmVhdHMgPSBCb3hNYXA8SGVhcnRiZWF0S2V5LCBhcmM0LlN0YXRpY0FycmF5PGFyYzRIZWFydGJlYXQsIDQ+Pih7CiAgICAvLyAgIGtleVByZWZpeDogU3Rha2luZ0JveFByZWZpeEhlYXJ0YmVhdHMsCiAgICAvLyB9KQogICAgYnl0ZWMgOSAvLyAiaCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoyNTgtMjYzCiAgICAvLyByZXR1cm4gbmV3IGFyYzQuU3RhdGljQXJyYXk8YXJjNEhlYXJ0YmVhdCwgND4oCiAgICAvLyAgIGVtcHR5SGVhcnRiZWF0KCksCiAgICAvLyAgIGVtcHR5SGVhcnRiZWF0KCksCiAgICAvLyAgIGVtcHR5SGVhcnRiZWF0KCksCiAgICAvLyAgIGVtcHR5SGVhcnRiZWF0KCkKICAgIC8vICkKICAgIGJ5dGVjIDIxIC8vIDB4MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czozNDQKICAgIC8vIHRoaXMuaGVhcnRiZWF0cyhoZWFydGJlYXRLZXkpLnZhbHVlID0gdGhpcy5lbXB0eUhlYXJ0YmVhdHMoKQogICAgYm94X3B1dAogICAgYiBzdGFrZV9hZnRlcl9pZl9lbHNlQDM1CgpzdGFrZV9lbHNlX2JvZHlAMjc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjM0NwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIuYmFsYW5jZSA+PSBhbW91bnQsIGVyckluc3VmZmljaWVudEJhbGFuY2UpCiAgICB0eG4gU2VuZGVyCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdEJhbGFuY2UKICAgIGFzc2VydCAvLyBhY2NvdW50IGZ1bmRlZAogICAgZGlnIDcKICAgID49CiAgICBibnogc3Rha2VfYWZ0ZXJfYXNzZXJ0QDI5CiAgICBieXRlYyAxMiAvLyAiRVJSOmVyckliYWwiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySWJhbAoKc3Rha2VfYWZ0ZXJfYXNzZXJ0QDI5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czozNDgKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJySW52YWxpZFBheW1lbnQpCiAgICBkdXAKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBzdGFrZV9hZnRlcl9hc3NlcnRAMzEKICAgIGJ5dGVjXzMgLy8gIkVSUjplcnJJcGF5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwYXkKCnN0YWtlX2FmdGVyX2Fzc2VydEAzMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MzQ5CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IGNvc3RzLnN0YWtlcywgZXJySW52YWxpZFBheW1lbnQpCiAgICBndHhucyBBbW91bnQKICAgIGludGMgNCAvLyAzMjEwMAogICAgPT0KICAgIGJueiBzdGFrZV9hZnRlcl9pZl9lbHNlQDM1CiAgICBieXRlY18zIC8vICJFUlI6ZXJySXBheSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcGF5CgpzdGFrZV9lbHNlX2JvZHlAMzY6CiAgICB1bmNvdmVyIDUKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czozNjAKICAgIC8vIGxvZ2dlZEFzc2VydCh0eXBlICE9PSBTVEFLSU5HX1RZUEVfSEVBUlRCRUFULCBlcnJIZWFydGJlYXRDYW5ub3RVcGRhdGUpCiAgICBkaWcgMwogICAgYnl0ZWMgOCAvLyAweDBhCiAgICAhPQogICAgYm56IHN0YWtlX2FmdGVyX2Fzc2VydEAzOAogICAgYnl0ZWMgMzIgLy8gIkVSUjplcnJIYmN1IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckhiY3UKCnN0YWtlX2FmdGVyX2Fzc2VydEAzODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MzYxCiAgICAvLyBjb25zdCBjdXJyZW50U3Rha2UgPSBjbG9uZSh0aGlzLnN0YWtlcyhzaykudmFsdWUpCiAgICBkaWcgNQogICAgYm94X2dldAogICAgc3dhcAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBjb3ZlciA2CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czozNjIKICAgIC8vIGNvbnN0IHsgZXhwaXJhdGlvbjogY3VycmVudFN0YWtlRXhwaXJhdGlvbiwgYW1vdW50OiBjdXJyZW50U3Rha2VBbW91bnQgfSA9IGN1cnJlbnRTdGFrZQogICAgZHVwCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBidXJ5IDEzCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MzYzCiAgICAvLyBjb25zdCBuZXdBbW91bnQ6IHVpbnQ2NCA9IGN1cnJlbnRTdGFrZUFtb3VudCArIGFtb3VudAogICAgZGlnIDExCiAgICArCiAgICBjb3ZlciA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjM2NAogICAgLy8gbG9nZ2VkQXNzZXJ0KGV4cGlyYXRpb24gPj0gY3VycmVudFN0YWtlRXhwaXJhdGlvbiB8fCAhbG9ja2VkLCBlcnJCYWRFeHBpcmF0aW9uVXBkYXRlKQogICAgZGlnIDkKICAgIDw9CiAgICBibnogc3Rha2VfYm9vbF90cnVlQDQwCiAgICBkaWcgMQogICAgYm56IHN0YWtlX2Jvb2xfZmFsc2VANDEKCnN0YWtlX2Jvb2xfdHJ1ZUA0MDoKICAgIGludGNfMSAvLyAxCgpzdGFrZV9ib29sX21lcmdlQDQyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czozNjQKICAgIC8vIGxvZ2dlZEFzc2VydChleHBpcmF0aW9uID49IGN1cnJlbnRTdGFrZUV4cGlyYXRpb24gfHwgIWxvY2tlZCwgZXJyQmFkRXhwaXJhdGlvblVwZGF0ZSkKICAgIGJueiBzdGFrZV9hZnRlcl9hc3NlcnRANDQKICAgIGJ5dGVjIDMzIC8vICJFUlI6ZXJyQmV4dSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJCZXh1CgpzdGFrZV9hZnRlcl9hc3NlcnRANDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjM2NgogICAgLy8gaWYgKGlzRXNjcm93KSB7CiAgICBieiBzdGFrZV9lbHNlX2JvZHlANTIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MzY3CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRQYXltZW50UmVjZWl2ZXIpCiAgICBkaWcgMQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IHN0YWtlX2FmdGVyX2Fzc2VydEA0NwogICAgYnl0ZWMgMTQgLy8gIkVSUjplcnJJcG1yIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwbXIKCnN0YWtlX2FmdGVyX2Fzc2VydEA0NzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MzY4CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IGFtb3VudCwgZXJySW52YWxpZFBheW1lbnRBbW91bnQpCiAgICBzd2FwCiAgICBndHhucyBBbW91bnQKICAgIGRpZyA5CiAgICA9PQogICAgYm56IHN0YWtlX2FmdGVyX2Fzc2VydEA0OQogICAgYnl0ZWMgMTUgLy8gIkVSUjplcnJJcG1hIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwbWEKCnN0YWtlX2FmdGVyX2Fzc2VydEA0OToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MzcwCiAgICAvLyB0aGlzLnVwZGF0ZVRvdGFscygwLCB0eXBlLCBhbW91bnQsIHRydWUpCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAzCiAgICBkaWcgOQogICAgaW50Y18xIC8vIDEKICAgIGNhbGxzdWIgdXBkYXRlVG90YWxzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjM3MQogICAgLy8gaWYgKGxvY2tlZCkgewogICAgYnogc3Rha2VfYWZ0ZXJfaWZfZWxzZUA1NQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czozNzQKICAgIC8vIHRoaXMudXBkYXRlTGl2ZUxvY2tlZFN0YWtlKDAsIGN1cnJlbnRTdGFrZUV4cGlyYXRpb24gPT09IDAgPyBuZXdBbW91bnQgOiBhbW91bnQsIHRydWUpCiAgICBkaWcgNwogICAgIQogICAgZGlnIDcKICAgIGRpZyAyCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgaW50Y18wIC8vIDAKICAgIHN3YXAKICAgIGludGNfMSAvLyAxCiAgICBjYWxsc3ViIHVwZGF0ZUxpdmVMb2NrZWRTdGFrZQoKc3Rha2VfYWZ0ZXJfaWZfZWxzZUA1NToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6Mzg0CiAgICAvLyB3ZWlnaHRlZEFnZTogdGhpcy5jYWxjdWxhdGVVcGRhdGVkV2VpZ2h0ZWRBZ2UoY3VycmVudFN0YWtlLCBuZXdBbW91bnQpLAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBjYWxsc3ViIGNhbGN1bGF0ZVVwZGF0ZWRXZWlnaHRlZEFnZQogICAgcG9wCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjM4MC0zODUKICAgIC8vIHRoaXMuc3Rha2VzKHNrKS52YWx1ZSA9IHsKICAgIC8vICAgYW1vdW50OiBuZXdBbW91bnQsCiAgICAvLyAgIGxhc3RVcGRhdGU6IHRpbWVzdGFtcCwKICAgIC8vICAgZXhwaXJhdGlvbiwKICAgIC8vICAgd2VpZ2h0ZWRBZ2U6IHRoaXMuY2FsY3VsYXRlVXBkYXRlZFdlaWdodGVkQWdlKGN1cnJlbnRTdGFrZSwgbmV3QW1vdW50KSwKICAgIC8vIH0KICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgaXRvYgogICAgY29uY2F0CiAgICB1bmNvdmVyIDMKICAgIGl0b2IKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICBib3hfcHV0CiAgICBiIHN0YWtlX2FmdGVyX2lmX2Vsc2VANTYKCnN0YWtlX2Vsc2VfYm9keUA1MjoKICAgIHBvcG4gMgogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjM3NwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIuYmFsYW5jZSA+PSBjdXJyZW50U3Rha2VBbW91bnQgKyBhbW91bnQsIGVyckluc3VmZmljaWVudEJhbGFuY2UpCiAgICB0eG4gU2VuZGVyCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdEJhbGFuY2UKICAgIGFzc2VydCAvLyBhY2NvdW50IGZ1bmRlZAogICAgZGlnIDEKICAgID49CiAgICBibnogc3Rha2VfYWZ0ZXJfaWZfZWxzZUA1NQogICAgYnl0ZWMgMTIgLy8gIkVSUjplcnJJYmFsIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckliYWwKCnN0YWtlX2Jvb2xfZmFsc2VANDE6CiAgICBpbnRjXzAgLy8gMAogICAgYiBzdGFrZV9ib29sX21lcmdlQDQyCgpzdGFrZV9ib29sX2ZhbHNlQDk6CiAgICBpbnRjXzAgLy8gMAogICAgYiBzdGFrZV9ib29sX21lcmdlQDEwCgpzdGFrZV9ib29sX2ZhbHNlQDQ6CiAgICBpbnRjXzAgLy8gMAogICAgYiBzdGFrZV9ib29sX21lcmdlQDUKCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLnN0YWtlQXNhW3JvdXRpbmddKCkgLT4gdm9pZDoKc3Rha2VBc2E6CiAgICBpbnRjXzAgLy8gMAogICAgcHVzaGJ5dGVzICIiCiAgICBkdXBuIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6Mzg5LTM5NQogICAgLy8gc3Rha2VBc2EoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIHR5cGU6IFN0YWtpbmdUeXBlLAogICAgLy8gICBhbW91bnQ6IHVpbnQ2NCwKICAgIC8vICAgZXhwaXJhdGlvbjogdWludDY0CiAgICAvLyApOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBwdXNoaW50IDIKICAgIC0KICAgIGR1cG4gMgogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDQgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBjb3ZlciA1CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18xIC8vIDEKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDgKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDYKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6Mzk2CiAgICAvLyB0aGlzLmFzc2VydFZhbGlkU3Rha2VUeXBlKHR5cGUpCiAgICBjYWxsc3ViIGFzc2VydFZhbGlkU3Rha2VUeXBlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjM5NwogICAgLy8gYXNzZXJ0U2FmZVBheW1lbnQocGF5bWVudCwgVHhuLnNlbmRlcikKICAgIHR4biBTZW5kZXIKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgY2FsbHN1YiBhc3NlcnRTYWZlUGF5bWVudAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czozOTkKICAgIC8vIGFzc2VydFNhZmVBc3NldFRyYW5zZmVyKGFzc2V0WGZlciwgVHhuLnNlbmRlcikKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODMKICAgIC8vIGxvZ2dlZEFzc2VydCh0eG4uc2VuZGVyID09PSBzZW5kZXIsIGVyckludmFsaWRQYXltZW50U2VuZGVyKQogICAgc3dhcAogICAgZ3R4bnMgU2VuZGVyCiAgICA9PQogICAgYm56IHN0YWtlQXNhX2FmdGVyX2Fzc2VydEA4MwogICAgYnl0ZWMgMjUgLy8gIkVSUjplcnJJcG1zIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwbXMKCnN0YWtlQXNhX2FmdGVyX2Fzc2VydEA4MzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODQKICAgIC8vIGxvZ2dlZEFzc2VydCh0eG4uYXNzZXRTZW5kZXIgPT09IEdsb2JhbC56ZXJvQWRkcmVzcywgZXJyQ2xhd2JhY2tGb3JiaWRkZW4pCiAgICBkdXAKICAgIGd0eG5zIEFzc2V0U2VuZGVyCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgID09CiAgICBibnogc3Rha2VBc2FfYWZ0ZXJfYXNzZXJ0QDg1CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJOY2x3IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5jbHcKCnN0YWtlQXNhX2FmdGVyX2Fzc2VydEA4NToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODUKICAgIC8vIGxvZ2dlZEFzc2VydCh0eG4uYXNzZXRDbG9zZVRvID09PSBHbG9iYWwuemVyb0FkZHJlc3MsIGVyckNsb3NlRm9yYmlkZGVuKQogICAgZHVwCiAgICBndHhucyBBc3NldENsb3NlVG8KICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIGJueiBzdGFrZUFzYV9hZnRlcl9hc3NlcnRAODcKICAgIGJ5dGVjIDI2IC8vICJFUlI6ZXJyTmNscyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOY2xzCgpzdGFrZUFzYV9hZnRlcl9hc3NlcnRAODc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjg2CiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLnJla2V5VG8gPT09IEdsb2JhbC56ZXJvQWRkcmVzcywgZXJyUmVrZXlGb3JiaWRkZW4pCiAgICBkdXAKICAgIGd0eG5zIFJla2V5VG8KICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIGJueiBzdGFrZUFzYV9hZnRlcl9hc3NlcnRAODkKICAgIGJ5dGVjIDI3IC8vICJFUlI6ZXJyTnJreSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOcmt5CgpzdGFrZUFzYV9hZnRlcl9hc3NlcnRAODk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQwMAogICAgLy8gY29uc3QgaW5UaGVGdXR1cmUgPSBleHBpcmF0aW9uID4gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcAogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgZGlnIDQKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICA+CiAgICBjb3ZlciA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQwMQogICAgLy8gbGV0IGxlc3NUaGFuTWF4TG9ja3VwID0gZXhwaXJhdGlvbiA8PSBHbG9iYWwubGF0ZXN0VGltZXN0YW1wICsgT05FX1lFQVIKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIGludGMgNiAvLyAzMTUzNjAwMAogICAgKwogICAgPD0KICAgIGJ1cnkgNwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0MDIKICAgIC8vIGlmICh0aGlzLnNldHRpbmdzKGFzc2V0WGZlci54ZmVyQXNzZXQuaWQpLmV4aXN0cykgewogICAgZHVwCiAgICBndHhucyBYZmVyQXNzZXQKICAgIGR1cAogICAgYnVyeSAxMAogICAgaXRvYgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExOAogICAgLy8gc2V0dGluZ3MgPSBCb3hNYXA8dWludDY0LCB1aW50NjQ+KHsga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4U2V0dGluZ3MgfSkKICAgIGJ5dGVjIDIyIC8vICJlIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGJ1cnkgMTIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDAyCiAgICAvLyBpZiAodGhpcy5zZXR0aW5ncyhhc3NldFhmZXIueGZlckFzc2V0LmlkKS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogc3Rha2VBc2FfYWZ0ZXJfaWZfZWxzZUAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQwMwogICAgLy8gbGVzc1RoYW5NYXhMb2NrdXAgPSBleHBpcmF0aW9uIDw9IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgKyB0aGlzLnNldHRpbmdzKGFzc2V0WGZlci54ZmVyQXNzZXQuaWQpLnZhbHVlCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBkaWcgMTEKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBidG9pCiAgICArCiAgICBkaWcgNQogICAgPj0KICAgIGJ1cnkgOAoKc3Rha2VBc2FfYWZ0ZXJfaWZfZWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0MDUKICAgIC8vIGNvbnN0IGxvY2tlZCA9IHR5cGUgPT09IFNUQUtJTkdfVFlQRV9MT0NLCiAgICBkaWcgMwogICAgZHVwCiAgICBieXRlY18yIC8vIDB4MjgKICAgID09CiAgICBjb3ZlciA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQwNgogICAgLy8gY29uc3QgaXNFc2Nyb3cgPSB0eXBlID09PSBTVEFLSU5HX1RZUEVfSEFSRCB8fCB0eXBlID09PSBTVEFLSU5HX1RZUEVfTE9DSwogICAgYnl0ZWMgNCAvLyAweDFlCiAgICA9PQogICAgYm56IHN0YWtlQXNhX2Jvb2xfdHJ1ZUA1CiAgICBkaWcgNAogICAgYnogc3Rha2VBc2FfYm9vbF9mYWxzZUA2CgpzdGFrZUFzYV9ib29sX3RydWVANToKICAgIGludGNfMSAvLyAxCgpzdGFrZUFzYV9ib29sX21lcmdlQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQwNwogICAgLy8gY29uc3QgdGltZXN0YW1wID0gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcAogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgY292ZXIgNQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0MDkKICAgIC8vIGxvZ2dlZEFzc2VydCgoaW5UaGVGdXR1cmUgJiYgbGVzc1RoYW5NYXhMb2NrdXApIHx8ICFsb2NrZWQsIGVyckJhZEV4cGlyYXRpb24pCiAgICB1bmNvdmVyIDgKICAgIGJ6IHN0YWtlQXNhX29yX2NvbnRkQDkKICAgIGRpZyA5CiAgICBibnogc3Rha2VBc2FfYm9vbF90cnVlQDEwCgpzdGFrZUFzYV9vcl9jb250ZEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0MDkKICAgIC8vIGxvZ2dlZEFzc2VydCgoaW5UaGVGdXR1cmUgJiYgbGVzc1RoYW5NYXhMb2NrdXApIHx8ICFsb2NrZWQsIGVyckJhZEV4cGlyYXRpb24pCiAgICBkaWcgNgogICAgYm56IHN0YWtlQXNhX2Jvb2xfZmFsc2VAMTEKCnN0YWtlQXNhX2Jvb2xfdHJ1ZUAxMDoKICAgIGludGNfMSAvLyAxCgpzdGFrZUFzYV9ib29sX21lcmdlQDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0MDkKICAgIC8vIGxvZ2dlZEFzc2VydCgoaW5UaGVGdXR1cmUgJiYgbGVzc1RoYW5NYXhMb2NrdXApIHx8ICFsb2NrZWQsIGVyckJhZEV4cGlyYXRpb24pCiAgICBibnogc3Rha2VBc2FfYWZ0ZXJfYXNzZXJ0QDE0CiAgICBieXRlYyAzMSAvLyAiRVJSOmVyckJleHAiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQmV4cAoKc3Rha2VBc2FfYWZ0ZXJfYXNzZXJ0QDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0MTMKICAgIC8vIGNvbnN0IHNrOiBTdGFrZUtleSA9IHsgYWRkcmVzczogVHhuLnNlbmRlciwgYXNzZXQsIHR5cGUgfQogICAgdHhuIFNlbmRlcgogICAgZGlnIDIKICAgIGNvbmNhdAogICAgZGlnIDUKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDUKICAgIC8vIHN0YWtlcyA9IEJveE1hcDxTdGFrZUtleSwgU3Rha2U+KHsga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4U3Rha2VzIH0pCiAgICBieXRlY18wIC8vICJzIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGNvdmVyIDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDE1CiAgICAvLyBjb25zdCBpc1VwZGF0ZSA9IHRoaXMuc3Rha2VzKHNrKS5leGlzdHMKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0MTcKICAgIC8vIGlmICghaXNVcGRhdGUpIHsKICAgIGJueiBzdGFrZUFzYV9lbHNlX2JvZHlANTIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDIxCiAgICAvLyBpZiAoaXNFc2Nyb3cpIHsKICAgIGJ6IHN0YWtlQXNhX2Vsc2VfYm9keUAyNwogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQyMgogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBlcnJJbnZhbGlkUGF5bWVudFJlY2VpdmVyKQogICAgZGlnIDEKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBzdGFrZUFzYV9hZnRlcl9hc3NlcnRAMTgKICAgIGJ5dGVjIDE0IC8vICJFUlI6ZXJySXBtciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcG1yCgpzdGFrZUFzYV9hZnRlcl9hc3NlcnRAMTg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQyMwogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSBjb3N0cy5zdGFrZXMsIGVyckludmFsaWRQYXltZW50QW1vdW50KQogICAgc3dhcAogICAgZ3R4bnMgQW1vdW50CiAgICBpbnRjIDQgLy8gMzIxMDAKICAgID09CiAgICBibnogc3Rha2VBc2FfYWZ0ZXJfYXNzZXJ0QDIwCiAgICBieXRlYyAxNSAvLyAiRVJSOmVycklwbWEiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBtYQoKc3Rha2VBc2FfYWZ0ZXJfYXNzZXJ0QDIwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0MjUKICAgIC8vIGxvZ2dlZEFzc2VydChhc3NldFhmZXIuYXNzZXRSZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRBc3NldEFtb3VudCkKICAgIGR1cAogICAgZ3R4bnMgQXNzZXRSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogc3Rha2VBc2FfYWZ0ZXJfYXNzZXJ0QDIyCiAgICBieXRlYyAxMCAvLyAiRVJSOmVycklhYW0iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySWFhbQoKc3Rha2VBc2FfYWZ0ZXJfYXNzZXJ0QDIyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0MjYKICAgIC8vIGxvZ2dlZEFzc2VydChhc3NldFhmZXIuYXNzZXRBbW91bnQgPT09IGFtb3VudCwgZXJySW52YWxpZEFzc2V0QW1vdW50KQogICAgZ3R4bnMgQXNzZXRBbW91bnQKICAgIGRpZyA2CiAgICA9PQogICAgYm56IHN0YWtlQXNhX2FmdGVyX2Fzc2VydEAyNAogICAgYnl0ZWMgMTAgLy8gIkVSUjplcnJJYWFtIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklhYW0KCnN0YWtlQXNhX2FmdGVyX2Fzc2VydEAyNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDI4CiAgICAvLyB0aGlzLnVwZGF0ZVRvdGFscyhhc3NldCwgdHlwZSwgYW1vdW50LCB0cnVlKQogICAgZGlnIDgKICAgIHN3YXAKICAgIGRpZyA2CiAgICBpbnRjXzEgLy8gMQogICAgY2FsbHN1YiB1cGRhdGVUb3RhbHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDI5CiAgICAvLyBpZiAobG9ja2VkKSB7CiAgICBzd2FwCiAgICBieiBzdGFrZUFzYV9hZnRlcl9pZl9lbHNlQDUxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQzMAogICAgLy8gdGhpcy51cGRhdGVMaXZlTG9ja2VkU3Rha2UoYXNzZXQsIGFtb3VudCwgdHJ1ZSkKICAgIGRpZyA2CiAgICBkaWcgNAogICAgaW50Y18xIC8vIDEKICAgIGNhbGxzdWIgdXBkYXRlTGl2ZUxvY2tlZFN0YWtlCgpzdGFrZUFzYV9hZnRlcl9pZl9lbHNlQDUxOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0NjAtNDY1CiAgICAvLyB0aGlzLnN0YWtlcyhzaykudmFsdWUgPSB7CiAgICAvLyAgIGFtb3VudCwKICAgIC8vICAgbGFzdFVwZGF0ZTogdGltZXN0YW1wLAogICAgLy8gICBleHBpcmF0aW9uLAogICAgLy8gICB3ZWlnaHRlZEFnZTogMCwKICAgIC8vIH0KICAgIGRpZyAzCiAgICBpdG9iCiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0NjQKICAgIC8vIHdlaWdodGVkQWdlOiAwLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDYwLTQ2NQogICAgLy8gdGhpcy5zdGFrZXMoc2spLnZhbHVlID0gewogICAgLy8gICBhbW91bnQsCiAgICAvLyAgIGxhc3RVcGRhdGU6IHRpbWVzdGFtcCwKICAgIC8vICAgZXhwaXJhdGlvbiwKICAgIC8vICAgd2VpZ2h0ZWRBZ2U6IDAsCiAgICAvLyB9CiAgICBpdG9iCiAgICBjb25jYXQKICAgIGJveF9wdXQKCnN0YWtlQXNhX2FmdGVyX2lmX2Vsc2VAODA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjM4OS0zOTUKICAgIC8vIHN0YWtlQXNhKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICB0eXBlOiBTdGFraW5nVHlwZSwKICAgIC8vICAgYW1vdW50OiB1aW50NjQsCiAgICAvLyAgIGV4cGlyYXRpb246IHVpbnQ2NAogICAgLy8gKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpzdGFrZUFzYV9lbHNlX2JvZHlAMjc6CiAgICB1bmNvdmVyIDUKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0MzMKICAgIC8vIH0gZWxzZSBpZiAodHlwZSA9PT0gU1RBS0lOR19UWVBFX0hFQVJUQkVBVCkgewogICAgdW5jb3ZlciAzCiAgICBieXRlYyA4IC8vIDB4MGEKICAgID09CiAgICBieiBzdGFrZUFzYV9lbHNlX2JvZHlAMzkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDM0CiAgICAvLyBjb25zdCBbaG9sZGluZ0Ftb3VudCwgb3B0ZWRJbl0gPSBBc3NldEhvbGRpbmcuYXNzZXRCYWxhbmNlKFR4bi5zZW5kZXIsIGFzc2V0KQogICAgdHhuIFNlbmRlcgogICAgZGlnIDEwCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDM2CiAgICAvLyBsb2dnZWRBc3NlcnQob3B0ZWRJbiwgZXJyTm90T3B0ZWRJbikKICAgIGJueiBzdGFrZUFzYV9hZnRlcl9hc3NlcnRAMzAKICAgIGJ5dGVjIDE4IC8vICJFUlI6ZXJyTm9wdCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOb3B0CgpzdGFrZUFzYV9hZnRlcl9hc3NlcnRAMzA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQzNwogICAgLy8gbG9nZ2VkQXNzZXJ0KGhvbGRpbmdBbW91bnQgPiAwLCBlcnJJbnZhbGlkQXNzZXRBbW91bnQpCiAgICBibnogc3Rha2VBc2FfYWZ0ZXJfYXNzZXJ0QDMyCiAgICBieXRlYyAxMCAvLyAiRVJSOmVycklhYW0iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySWFhbQoKc3Rha2VBc2FfYWZ0ZXJfYXNzZXJ0QDMyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0MzkKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJySW52YWxpZFBheW1lbnRSZWNlaXZlcikKICAgIGRpZyAyCiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogc3Rha2VBc2FfYWZ0ZXJfYXNzZXJ0QDM0CiAgICBieXRlYyAxNCAvLyAiRVJSOmVycklwbXIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBtcgoKc3Rha2VBc2FfYWZ0ZXJfYXNzZXJ0QDM0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0NDAKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LmFtb3VudCA9PT0gKGNvc3RzLnN0YWtlcyArIGNvc3RzLmhlYXJ0YmVhdHMpLCBlcnJJbnZhbGlkUGF5bWVudEFtb3VudCkKICAgIHVuY292ZXIgMgogICAgZ3R4bnMgQW1vdW50CiAgICBpbnRjIDUgLy8gMTAyMjAwCiAgICA9PQogICAgYm56IHN0YWtlQXNhX2FmdGVyX2Fzc2VydEAzNgogICAgYnl0ZWMgMTUgLy8gIkVSUjplcnJJcG1hIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwbWEKCnN0YWtlQXNhX2FmdGVyX2Fzc2VydEAzNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDQzCiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLmFzc2V0QW1vdW50ID09PSAwLCBlcnJJbnZhbGlkQXNzZXRBbW91bnQpCiAgICBzd2FwCiAgICBndHhucyBBc3NldEFtb3VudAogICAgYnogc3Rha2VBc2FfYWZ0ZXJfYXNzZXJ0QDM4CiAgICBieXRlYyAxMCAvLyAiRVJSOmVycklhYW0iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySWFhbQoKc3Rha2VBc2FfYWZ0ZXJfYXNzZXJ0QDM4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0NDYKICAgIC8vIGNvbnN0IGhlYXJ0YmVhdEtleTogSGVhcnRiZWF0S2V5ID0geyBhZGRyZXNzOiBUeG4uc2VuZGVyLCBhc3NldCB9CiAgICB0eG4gU2VuZGVyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTEyLTExNAogICAgLy8gaGVhcnRiZWF0cyA9IEJveE1hcDxIZWFydGJlYXRLZXksIGFyYzQuU3RhdGljQXJyYXk8YXJjNEhlYXJ0YmVhdCwgND4+KHsKICAgIC8vICAga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4SGVhcnRiZWF0cywKICAgIC8vIH0pCiAgICBieXRlYyA5IC8vICJoIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjI1OC0yNjMKICAgIC8vIHJldHVybiBuZXcgYXJjNC5TdGF0aWNBcnJheTxhcmM0SGVhcnRiZWF0LCA0PigKICAgIC8vICAgZW1wdHlIZWFydGJlYXQoKSwKICAgIC8vICAgZW1wdHlIZWFydGJlYXQoKSwKICAgIC8vICAgZW1wdHlIZWFydGJlYXQoKSwKICAgIC8vICAgZW1wdHlIZWFydGJlYXQoKQogICAgLy8gKQogICAgYnl0ZWMgMjEgLy8gMHgwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQ0NwogICAgLy8gdGhpcy5oZWFydGJlYXRzKGhlYXJ0YmVhdEtleSkudmFsdWUgPSB0aGlzLmVtcHR5SGVhcnRiZWF0cygpCiAgICBib3hfcHV0CiAgICBiIHN0YWtlQXNhX2FmdGVyX2lmX2Vsc2VANTEKCnN0YWtlQXNhX2Vsc2VfYm9keUAzOToKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0NDkKICAgIC8vIGNvbnN0IFtob2xkaW5nQW1vdW50LCBvcHRlZEluXSA9IEFzc2V0SG9sZGluZy5hc3NldEJhbGFuY2UoVHhuLnNlbmRlciwgYXNzZXQpCiAgICB0eG4gU2VuZGVyCiAgICBkaWcgOQogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQ1MAogICAgLy8gbG9nZ2VkQXNzZXJ0KG9wdGVkSW4sIGVyck5vdE9wdGVkSW4pCiAgICBibnogc3Rha2VBc2FfYWZ0ZXJfYXNzZXJ0QDQxCiAgICBieXRlYyAxOCAvLyAiRVJSOmVyck5vcHQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTm9wdAoKc3Rha2VBc2FfYWZ0ZXJfYXNzZXJ0QDQxOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0NTEKICAgIC8vIGxvZ2dlZEFzc2VydChob2xkaW5nQW1vdW50ID49IGFtb3VudCwgZXJySW5zdWZmaWNpZW50QmFsYW5jZSkKICAgIGRpZyA2CiAgICA+PQogICAgYm56IHN0YWtlQXNhX2FmdGVyX2Fzc2VydEA0MwogICAgYnl0ZWMgMTIgLy8gIkVSUjplcnJJYmFsIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckliYWwKCnN0YWtlQXNhX2FmdGVyX2Fzc2VydEA0MzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDUzCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRQYXltZW50UmVjZWl2ZXIpCiAgICBkaWcgMQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IHN0YWtlQXNhX2FmdGVyX2Fzc2VydEA0NQogICAgYnl0ZWMgMTQgLy8gIkVSUjplcnJJcG1yIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwbXIKCnN0YWtlQXNhX2FmdGVyX2Fzc2VydEA0NToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDU0CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IGNvc3RzLnN0YWtlcywgZXJySW52YWxpZFBheW1lbnRBbW91bnQpCiAgICBzd2FwCiAgICBndHhucyBBbW91bnQKICAgIGludGMgNCAvLyAzMjEwMAogICAgPT0KICAgIGJueiBzdGFrZUFzYV9hZnRlcl9hc3NlcnRANDcKICAgIGJ5dGVjIDE1IC8vICJFUlI6ZXJySXBtYSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcG1hCgpzdGFrZUFzYV9hZnRlcl9hc3NlcnRANDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQ1NwogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci5hc3NldEFtb3VudCA9PT0gMCwgZXJySW52YWxpZEFzc2V0QW1vdW50KQogICAgZ3R4bnMgQXNzZXRBbW91bnQKICAgIGJ6IHN0YWtlQXNhX2FmdGVyX2lmX2Vsc2VANTEKICAgIGJ5dGVjIDEwIC8vICJFUlI6ZXJySWFhbSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJYWFtCgpzdGFrZUFzYV9lbHNlX2JvZHlANTI6CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDY3CiAgICAvLyBsb2dnZWRBc3NlcnQodHlwZSAhPT0gU1RBS0lOR19UWVBFX0hFQVJUQkVBVCwgZXJySGVhcnRiZWF0Q2Fubm90VXBkYXRlKQogICAgZGlnIDMKICAgIGJ5dGVjIDggLy8gMHgwYQogICAgIT0KICAgIGJueiBzdGFrZUFzYV9hZnRlcl9hc3NlcnRANTQKICAgIGJ5dGVjIDMyIC8vICJFUlI6ZXJySGJjdSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJIYmN1CgpzdGFrZUFzYV9hZnRlcl9hc3NlcnRANTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQ2OAogICAgLy8gY29uc3QgY3VycmVudFN0YWtlID0gY2xvbmUodGhpcy5zdGFrZXMoc2spLnZhbHVlKQogICAgZGlnIDcKICAgIGJveF9nZXQKICAgIHN3YXAKICAgIGR1cAogICAgY292ZXIgMgogICAgY292ZXIgNgogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDY5CiAgICAvLyBjb25zdCB7IGV4cGlyYXRpb246IGN1cnJlbnRTdGFrZUV4cGlyYXRpb24sIGFtb3VudDogY3VycmVudFN0YWtlQW1vdW50IH0gPSBjdXJyZW50U3Rha2UKICAgIGR1cAogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgY292ZXIgMgogICAgYnVyeSAxNAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQ3MAogICAgLy8gY29uc3QgbmV3QW1vdW50OiB1aW50NjQgPSBjdXJyZW50U3Rha2VBbW91bnQgKyBhbW91bnQKICAgIGRpZyAxMQogICAgKwogICAgY292ZXIgNQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0NzEKICAgIC8vIGxvZ2dlZEFzc2VydChleHBpcmF0aW9uID49IGN1cnJlbnRTdGFrZUV4cGlyYXRpb24gfHwgIWxvY2tlZCwgZXJyQmFkRXhwaXJhdGlvblVwZGF0ZSkKICAgIGRpZyA5CiAgICA8PQogICAgYm56IHN0YWtlQXNhX2Jvb2xfdHJ1ZUA1NgogICAgZGlnIDcKICAgIGJueiBzdGFrZUFzYV9ib29sX2ZhbHNlQDU3CgpzdGFrZUFzYV9ib29sX3RydWVANTY6CiAgICBpbnRjXzEgLy8gMQoKc3Rha2VBc2FfYm9vbF9tZXJnZUA1ODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDcxCiAgICAvLyBsb2dnZWRBc3NlcnQoZXhwaXJhdGlvbiA+PSBjdXJyZW50U3Rha2VFeHBpcmF0aW9uIHx8ICFsb2NrZWQsIGVyckJhZEV4cGlyYXRpb25VcGRhdGUpCiAgICBibnogc3Rha2VBc2FfYWZ0ZXJfYXNzZXJ0QDYwCiAgICBieXRlYyAzMyAvLyAiRVJSOmVyckJleHUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQmV4dQoKc3Rha2VBc2FfYWZ0ZXJfYXNzZXJ0QDYwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0NzQKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJySW52YWxpZFBheW1lbnRSZWNlaXZlcikKICAgIGRpZyAyCiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogc3Rha2VBc2FfYWZ0ZXJfYXNzZXJ0QDYyCiAgICBieXRlYyAxNCAvLyAiRVJSOmVycklwbXIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBtcgoKc3Rha2VBc2FfYWZ0ZXJfYXNzZXJ0QDYyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0NzUKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LmFtb3VudCA9PT0gMCwgZXJySW52YWxpZFBheW1lbnRBbW91bnQpCiAgICB1bmNvdmVyIDIKICAgIGd0eG5zIEFtb3VudAogICAgYnogc3Rha2VBc2FfYWZ0ZXJfYXNzZXJ0QDY0CiAgICBieXRlYyAxNSAvLyAiRVJSOmVycklwbWEiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBtYQoKc3Rha2VBc2FfYWZ0ZXJfYXNzZXJ0QDY0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0NzcKICAgIC8vIGlmIChpc0VzY3JvdykgewogICAgYnogc3Rha2VBc2FfZWxzZV9ib2R5QDcyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQ3OAogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci5hc3NldFJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJySW52YWxpZEFzc2V0QW1vdW50KQogICAgZHVwCiAgICBndHhucyBBc3NldFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBzdGFrZUFzYV9hZnRlcl9hc3NlcnRANjcKICAgIGJ5dGVjIDEwIC8vICJFUlI6ZXJySWFhbSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJYWFtCgpzdGFrZUFzYV9hZnRlcl9hc3NlcnRANjc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQ3OQogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci5hc3NldEFtb3VudCA9PT0gYW1vdW50LCBlcnJJbnZhbGlkQXNzZXRBbW91bnQpCiAgICBndHhucyBBc3NldEFtb3VudAogICAgZGlnIDgKICAgID09CiAgICBibnogc3Rha2VBc2FfYWZ0ZXJfYXNzZXJ0QDY5CiAgICBieXRlYyAxMCAvLyAiRVJSOmVycklhYW0iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySWFhbQoKc3Rha2VBc2FfYWZ0ZXJfYXNzZXJ0QDY5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0ODEKICAgIC8vIHRoaXMudXBkYXRlVG90YWxzKGFzc2V0LCB0eXBlLCBhbW91bnQsIHRydWUpCiAgICBkaWcgMTAKICAgIHN3YXAKICAgIGRpZyA4CiAgICBpbnRjXzEgLy8gMQogICAgY2FsbHN1YiB1cGRhdGVUb3RhbHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDgyCiAgICAvLyBpZiAobG9ja2VkKSB7CiAgICB1bmNvdmVyIDMKICAgIGJ6IHN0YWtlQXNhX2FmdGVyX2lmX2Vsc2VANzkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDg1CiAgICAvLyB0aGlzLnVwZGF0ZUxpdmVMb2NrZWRTdGFrZShhc3NldCwgY3VycmVudFN0YWtlRXhwaXJhdGlvbiA9PT0gMCA/IG5ld0Ftb3VudCA6IGFtb3VudCwgdHJ1ZSkKICAgIGRpZyA3CiAgICAhCiAgICBkaWcgNgogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBkaWcgOQogICAgc3dhcAogICAgaW50Y18xIC8vIDEKICAgIGNhbGxzdWIgdXBkYXRlTGl2ZUxvY2tlZFN0YWtlCgpzdGFrZUFzYV9hZnRlcl9pZl9lbHNlQDc5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0OTkKICAgIC8vIHdlaWdodGVkQWdlOiB0aGlzLmNhbGN1bGF0ZVVwZGF0ZWRXZWlnaHRlZEFnZShjdXJyZW50U3Rha2UsIG5ld0Ftb3VudCksCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGNhbGxzdWIgY2FsY3VsYXRlVXBkYXRlZFdlaWdodGVkQWdlCiAgICBwb3AKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDk1LTUwMAogICAgLy8gdGhpcy5zdGFrZXMoc2spLnZhbHVlID0gewogICAgLy8gICBhbW91bnQ6IG5ld0Ftb3VudCwKICAgIC8vICAgbGFzdFVwZGF0ZTogdGltZXN0YW1wLAogICAgLy8gICBleHBpcmF0aW9uLAogICAgLy8gICB3ZWlnaHRlZEFnZTogdGhpcy5jYWxjdWxhdGVVcGRhdGVkV2VpZ2h0ZWRBZ2UoY3VycmVudFN0YWtlLCBuZXdBbW91bnQpLAogICAgLy8gfQogICAgaXRvYgogICAgdW5jb3ZlciAyCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHVuY292ZXIgMgogICAgaXRvYgogICAgY29uY2F0CiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIGJveF9wdXQKICAgIGIgc3Rha2VBc2FfYWZ0ZXJfaWZfZWxzZUA4MAoKc3Rha2VBc2FfZWxzZV9ib2R5QDcyOgogICAgYnVyeSAxCiAgICB1bmNvdmVyIDQKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0ODgKICAgIC8vIGNvbnN0IFtob2xkaW5nQW1vdW50LCBvcHRlZEluXSA9IEFzc2V0SG9sZGluZy5hc3NldEJhbGFuY2UoVHhuLnNlbmRlciwgYXNzZXQpCiAgICB0eG4gU2VuZGVyCiAgICBkaWcgMTAKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo0ODkKICAgIC8vIGxvZ2dlZEFzc2VydChvcHRlZEluLCBlcnJOb3RPcHRlZEluKQogICAgYm56IHN0YWtlQXNhX2FmdGVyX2Fzc2VydEA3NAogICAgYnl0ZWMgMTggLy8gIkVSUjplcnJOb3B0IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5vcHQKCnN0YWtlQXNhX2FmdGVyX2Fzc2VydEA3NDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NDkwCiAgICAvLyBsb2dnZWRBc3NlcnQoaG9sZGluZ0Ftb3VudCA+PSBjdXJyZW50U3Rha2VBbW91bnQgKyBhbW91bnQsIGVyckluc3VmZmljaWVudEJhbGFuY2UpCiAgICBkaWcgMgogICAgPj0KICAgIGJueiBzdGFrZUFzYV9hZnRlcl9hc3NlcnRANzYKICAgIGJ5dGVjIDEyIC8vICJFUlI6ZXJySWJhbCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJYmFsCgpzdGFrZUFzYV9hZnRlcl9hc3NlcnRANzY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjQ5MgogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci5hc3NldEFtb3VudCA9PT0gMCwgZXJySW52YWxpZEFzc2V0QW1vdW50KQogICAgZ3R4bnMgQXNzZXRBbW91bnQKICAgIGJ6IHN0YWtlQXNhX2FmdGVyX2lmX2Vsc2VANzkKICAgIGJ5dGVjIDEwIC8vICJFUlI6ZXJySWFhbSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJYWFtCgpzdGFrZUFzYV9ib29sX2ZhbHNlQDU3OgogICAgaW50Y18wIC8vIDAKICAgIGIgc3Rha2VBc2FfYm9vbF9tZXJnZUA1OAoKc3Rha2VBc2FfYm9vbF9mYWxzZUAxMToKICAgIGludGNfMCAvLyAwCiAgICBiIHN0YWtlQXNhX2Jvb2xfbWVyZ2VAMTIKCnN0YWtlQXNhX2Jvb2xfZmFsc2VANjoKICAgIGludGNfMCAvLyAwCiAgICBiIHN0YWtlQXNhX2Jvb2xfbWVyZ2VANwoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcud2l0aGRyYXdbcm91dGluZ10oKSAtPiB2b2lkOgp3aXRoZHJhdzoKICAgIHB1c2hieXRlcyAiIgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjUwNAogICAgLy8gd2l0aGRyYXcoYXNzZXQ6IHVpbnQ2NCwgdHlwZTogU3Rha2luZ1R5cGUpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cG4gMgogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50OAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1MDYKICAgIC8vIHR5cGUgPT09IFNUQUtJTkdfVFlQRV9IQVJEIHx8IHR5cGUgPT09IFNUQUtJTkdfVFlQRV9MT0NLLAogICAgYnl0ZWMgNCAvLyAweDFlCiAgICA9PQogICAgYm56IHdpdGhkcmF3X2Jvb2xfdHJ1ZUAzCiAgICBkdXAKICAgIGJ5dGVjXzIgLy8gMHgyOAogICAgPT0KICAgIGJ6IHdpdGhkcmF3X2Jvb2xfZmFsc2VANAoKd2l0aGRyYXdfYm9vbF90cnVlQDM6CiAgICBpbnRjXzEgLy8gMQoKd2l0aGRyYXdfYm9vbF9tZXJnZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1MDUtNTA4CiAgICAvLyBsb2dnZWRBc3NlcnQoCiAgICAvLyAgIHR5cGUgPT09IFNUQUtJTkdfVFlQRV9IQVJEIHx8IHR5cGUgPT09IFNUQUtJTkdfVFlQRV9MT0NLLAogICAgLy8gICBlcnJXaXRoZHJhd0lzT25seUZvckhhcmRPckxvY2sKICAgIC8vICkKICAgIGJueiB3aXRoZHJhd19hZnRlcl9hc3NlcnRANwogICAgcHVzaGJ5dGVzICJFUlI6ZXJyV2hvbCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJXaG9sCgp3aXRoZHJhd19hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTEwCiAgICAvLyBjb25zdCBzayA9IHsgYWRkcmVzczogVHhuLnNlbmRlciwgYXNzZXQsIHR5cGUgfQogICAgdHhuIFNlbmRlcgogICAgZGlnIDIKICAgIGl0b2IKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1MTEKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnN0YWtlcyhzaykuZXhpc3RzLCBlcnJOb0xvY2spCiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgZGlnIDEKICAgIGV4dHJhY3QgMzIgOAogICAgdW5jb3ZlciAyCiAgICBleHRyYWN0IDQwIDEKICAgIGNvdmVyIDIKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwNQogICAgLy8gc3Rha2VzID0gQm94TWFwPFN0YWtlS2V5LCBTdGFrZT4oeyBrZXlQcmVmaXg6IFN0YWtpbmdCb3hQcmVmaXhTdGFrZXMgfSkKICAgIGJ5dGVjXzAgLy8gInMiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1MTEKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnN0YWtlcyhzaykuZXhpc3RzLCBlcnJOb0xvY2spCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiB3aXRoZHJhd19hZnRlcl9hc3NlcnRAOQogICAgYnl0ZWMgMjMgLy8gIkVSUjplcnJObGNrIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5sY2sKCndpdGhkcmF3X2FmdGVyX2Fzc2VydEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1MTMKICAgIC8vIGNvbnN0IHsgZXhwaXJhdGlvbiwgYW1vdW50IH0gPSB0aGlzLnN0YWtlcyhzaykudmFsdWUKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGR1cAogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIGJ1cnkgNQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBidXJ5IDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTE0CiAgICAvLyBsb2dnZWRBc3NlcnQodHlwZSAhPT0gU1RBS0lOR19UWVBFX0xPQ0sgfHwgZXhwaXJhdGlvbiA8IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsIGVyckxvY2tlZCkKICAgIGRpZyAxCiAgICBieXRlY18yIC8vIDB4MjgKICAgICE9CiAgICBibnogd2l0aGRyYXdfYm9vbF90cnVlQDExCiAgICBkaWcgMwogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgPAogICAgYnogd2l0aGRyYXdfYm9vbF9mYWxzZUAxMgoKd2l0aGRyYXdfYm9vbF90cnVlQDExOgogICAgaW50Y18xIC8vIDEKCndpdGhkcmF3X2Jvb2xfbWVyZ2VAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjUxNAogICAgLy8gbG9nZ2VkQXNzZXJ0KHR5cGUgIT09IFNUQUtJTkdfVFlQRV9MT0NLIHx8IGV4cGlyYXRpb24gPCBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLCBlcnJMb2NrZWQpCiAgICBibnogd2l0aGRyYXdfYWZ0ZXJfYXNzZXJ0QDE1CiAgICBieXRlYyAzNCAvLyAiRVJSOmVyckxvY2siCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTG9jawoKd2l0aGRyYXdfYWZ0ZXJfYXNzZXJ0QDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1MTcKICAgIC8vIGlmIChhc3NldCA9PT0gMCkgewogICAgZGlnIDIKICAgIGJueiB3aXRoZHJhd19lbHNlX2JvZHlAMTgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTE4LTUyMwogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgYW1vdW50OiBhbW91bnQgKyBTdGFrZXNNQlIKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjUyMAogICAgLy8gcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjUyMQogICAgLy8gYW1vdW50OiBhbW91bnQgKyBTdGFrZXNNQlIKICAgIGRpZyA1CiAgICBpbnRjIDQgLy8gMzIxMDAKICAgICsKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjUxOC01MjIKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIGFtb3VudDogYW1vdW50ICsgU3Rha2VzTUJSCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjUxOC01MjMKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIGFtb3VudDogYW1vdW50ICsgU3Rha2VzTUJSCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKCndpdGhkcmF3X2FmdGVyX2lmX2Vsc2VAMjE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjU0MQogICAgLy8gdGhpcy51cGRhdGVUb3RhbHMoYXNzZXQsIHR5cGUsIGFtb3VudCwgZmFsc2UpCiAgICBkaWcgMgogICAgdW5jb3ZlciAyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGRpZyA2CiAgICBpbnRjXzAgLy8gMAogICAgY2FsbHN1YiB1cGRhdGVUb3RhbHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTE0CiAgICAvLyBsb2dnZWRBc3NlcnQodHlwZSAhPT0gU1RBS0lOR19UWVBFX0xPQ0sgfHwgZXhwaXJhdGlvbiA8IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsIGVyckxvY2tlZCkKICAgIGJ5dGVjXzIgLy8gMHgyOAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1NDIKICAgIC8vIGlmICh0eXBlID09PSBTVEFLSU5HX1RZUEVfTE9DSyAmJiBleHBpcmF0aW9uICE9PSAwKSB7CiAgICA9PQogICAgYnogd2l0aGRyYXdfYWZ0ZXJfaWZfZWxzZUAyNAogICAgZGlnIDIKICAgIGJ6IHdpdGhkcmF3X2FmdGVyX2lmX2Vsc2VAMjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTQzCiAgICAvLyB0aGlzLnVwZGF0ZUxpdmVMb2NrZWRTdGFrZShhc3NldCwgYW1vdW50LCBmYWxzZSkKICAgIGRpZyAxCiAgICBkaWcgNAogICAgaW50Y18wIC8vIDAKICAgIGNhbGxzdWIgdXBkYXRlTGl2ZUxvY2tlZFN0YWtlCgp3aXRoZHJhd19hZnRlcl9pZl9lbHNlQDI0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1NDYKICAgIC8vIHRoaXMuc3Rha2VzKHNrKS5kZWxldGUoKQogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjUwNAogICAgLy8gd2l0aGRyYXcoYXNzZXQ6IHVpbnQ2NCwgdHlwZTogU3Rha2luZ1R5cGUpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCndpdGhkcmF3X2Vsc2VfYm9keUAxODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTI1LTUzMQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50LAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjUyNwogICAgLy8gYXNzZXRSZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIGRpZyAzCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgZGlnIDUKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1MjUtNTMwCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnQsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldAogICAgLy8gICB9KQogICAgcHVzaGludCA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTI1LTUzMQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50LAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1MzMtNTM4CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICBhbW91bnQ6IFN0YWtlc01CUgogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTM1CiAgICAvLyByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTM2CiAgICAvLyBhbW91bnQ6IFN0YWtlc01CUgogICAgaW50YyA0IC8vIDMyMTAwCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1MzMtNTM3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICBhbW91bnQ6IFN0YWtlc01CUgogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1MzMtNTM4CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICBhbW91bnQ6IFN0YWtlc01CUgogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICBiIHdpdGhkcmF3X2FmdGVyX2lmX2Vsc2VAMjEKCndpdGhkcmF3X2Jvb2xfZmFsc2VAMTI6CiAgICBpbnRjXzAgLy8gMAogICAgYiB3aXRoZHJhd19ib29sX21lcmdlQDEzCgp3aXRoZHJhd19ib29sX2ZhbHNlQDQ6CiAgICBpbnRjXzAgLy8gMAogICAgYiB3aXRoZHJhd19ib29sX21lcmdlQDUKCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmNoZWNrcG9pbnRFeHBpcmVkTG9ja1tyb3V0aW5nXSgpIC0+IHZvaWQ6CmNoZWNrcG9pbnRFeHBpcmVkTG9jazoKICAgIHB1c2hieXRlcyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1NTAKICAgIC8vIGNoZWNrcG9pbnRFeHBpcmVkTG9jayhhZGRyZXNzOiBBY2NvdW50LCBhc3NldDogdWludDY0KTogYm9vbGVhbiB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1NTEKICAgIC8vIGNvbnN0IHNrOiBTdGFrZUtleSA9IHsgYWRkcmVzcywgYXNzZXQsIHR5cGU6IFNUQUtJTkdfVFlQRV9MT0NLIH0KICAgIGl0b2IKICAgIGNvbmNhdAogICAgYnl0ZWNfMiAvLyAweDI4CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTA1CiAgICAvLyBzdGFrZXMgPSBCb3hNYXA8U3Rha2VLZXksIFN0YWtlPih7IGtleVByZWZpeDogU3Rha2luZ0JveFByZWZpeFN0YWtlcyB9KQogICAgYnl0ZWNfMCAvLyAicyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjU1MgogICAgLy8gaWYgKCF0aGlzLnN0YWtlcyhzaykuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBjaGVja3BvaW50RXhwaXJlZExvY2tfYWZ0ZXJfaWZfZWxzZUAzCiAgICBwb3BuIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTUzCiAgICAvLyByZXR1cm4gZmFsc2UKICAgIGludGNfMCAvLyAwCgpjaGVja3BvaW50RXhwaXJlZExvY2tfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmNoZWNrcG9pbnRFeHBpcmVkTG9ja0A3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1NTAKICAgIC8vIGNoZWNrcG9pbnRFeHBpcmVkTG9jayhhZGRyZXNzOiBBY2NvdW50LCBhc3NldDogdWludDY0KTogYm9vbGVhbiB7CiAgICBieXRlYyAxMSAvLyAweDAwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBzZXRiaXQKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmNoZWNrcG9pbnRFeHBpcmVkTG9ja19hZnRlcl9pZl9lbHNlQDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjU1NgogICAgLy8gY29uc3QgaW5mbyA9IGNsb25lKHRoaXMuc3Rha2VzKHNrKS52YWx1ZSkKICAgIGR1cAogICAgYm94X2dldAogICAgc3dhcAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjU1NwogICAgLy8gaWYgKGluZm8uZXhwaXJhdGlvbiA9PT0gMCB8fCBpbmZvLmV4cGlyYXRpb24gPj0gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCkgewogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgYnVyeSA1CiAgICBieiBjaGVja3BvaW50RXhwaXJlZExvY2tfaWZfYm9keUA1CiAgICBkaWcgMwogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgPj0KICAgIGJ6IGNoZWNrcG9pbnRFeHBpcmVkTG9ja19hZnRlcl9pZl9lbHNlQDYKCmNoZWNrcG9pbnRFeHBpcmVkTG9ja19pZl9ib2R5QDU6CiAgICBwb3BuIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTU4CiAgICAvLyByZXR1cm4gZmFsc2UKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjU1MAogICAgLy8gY2hlY2twb2ludEV4cGlyZWRMb2NrKGFkZHJlc3M6IEFjY291bnQsIGFzc2V0OiB1aW50NjQpOiBib29sZWFuIHsKICAgIGIgY2hlY2twb2ludEV4cGlyZWRMb2NrX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5jaGVja3BvaW50RXhwaXJlZExvY2tANwoKY2hlY2twb2ludEV4cGlyZWRMb2NrX2FmdGVyX2lmX2Vsc2VANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTYxCiAgICAvLyB0aGlzLnVwZGF0ZUxpdmVMb2NrZWRTdGFrZShhc3NldCwgaW5mby5hbW91bnQsIGZhbHNlKQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGludGNfMCAvLyAwCiAgICBjYWxsc3ViIHVwZGF0ZUxpdmVMb2NrZWRTdGFrZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1NjIKICAgIC8vIGluZm8uZXhwaXJhdGlvbiA9IDAKICAgIGludGNfMCAvLyAwCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjU2Mi01NjMKICAgIC8vIGluZm8uZXhwaXJhdGlvbiA9IDAKICAgIC8vIHRoaXMuc3Rha2VzKHNrKS52YWx1ZSA9IGNsb25lKGluZm8pCiAgICBwdXNoaW50IDE2CiAgICBzd2FwCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1NjQKICAgIC8vIHJldHVybiB0cnVlCiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1NTAKICAgIC8vIGNoZWNrcG9pbnRFeHBpcmVkTG9jayhhZGRyZXNzOiBBY2NvdW50LCBhc3NldDogdWludDY0KTogYm9vbGVhbiB7CiAgICBiIGNoZWNrcG9pbnRFeHBpcmVkTG9ja19hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuY2hlY2twb2ludEV4cGlyZWRMb2NrQDcKCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmNyZWF0ZUhlYXJ0YmVhdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNyZWF0ZUhlYXJ0YmVhdDoKICAgIGludGNfMCAvLyAwCiAgICBkdXBuIDUKICAgIHB1c2hieXRlcyAiIgogICAgZHVwbiAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjU2NwogICAgLy8gY3JlYXRlSGVhcnRiZWF0KGFkZHJlc3M6IEFjY291bnQsIGFzc2V0OiB1aW50NjQpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1NjgKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmhlYXJ0YmVhdE1hbmFnZXJBZGRyZXNzLnZhbHVlLCBlcnJOb3RIZWFydGJlYXRNYW5hZ2VyKQogICAgdHhuIFNlbmRlcgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTAwCiAgICAvLyBoZWFydGJlYXRNYW5hZ2VyQWRkcmVzcyA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBTdGFraW5nR2xvYmFsU3RhdGVLZXlIZWFydGJlYXRNYW5hZ2VyQWRkcmVzcyB9KQogICAgYnl0ZWMgMzUgLy8gImhlYXJ0YmVhdF9tYW5hZ2VyX2FkZHJlc3MiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjU2OAogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuaGVhcnRiZWF0TWFuYWdlckFkZHJlc3MudmFsdWUsIGVyck5vdEhlYXJ0YmVhdE1hbmFnZXIpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPT0KICAgIGJueiBjcmVhdGVIZWFydGJlYXRfYWZ0ZXJfYXNzZXJ0QDMKICAgIHB1c2hieXRlcyAiRVJSOmVyck5oYm0iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmhibQoKY3JlYXRlSGVhcnRiZWF0X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1NzAKICAgIC8vIGNvbnN0IGhiayA9IHsgYWRkcmVzcywgYXNzZXQgfQogICAgZHVwCiAgICBpdG9iCiAgICBkaWcgMgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTcxCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5oZWFydGJlYXRzKGhiaykuZXhpc3RzLCBlcnJIZWFyYmVhdE5vdEZvdW5kKQogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIHN3YXAKICAgIGV4dHJhY3QgMzIgOAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExMi0xMTQKICAgIC8vIGhlYXJ0YmVhdHMgPSBCb3hNYXA8SGVhcnRiZWF0S2V5LCBhcmM0LlN0YXRpY0FycmF5PGFyYzRIZWFydGJlYXQsIDQ+Pih7CiAgICAvLyAgIGtleVByZWZpeDogU3Rha2luZ0JveFByZWZpeEhlYXJ0YmVhdHMsCiAgICAvLyB9KQogICAgYnl0ZWMgOSAvLyAiaCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBidXJ5IDEyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjU3MQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuaGVhcnRiZWF0cyhoYmspLmV4aXN0cywgZXJySGVhcmJlYXROb3RGb3VuZCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGNyZWF0ZUhlYXJ0YmVhdF9hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgMjQgLy8gIkVSUjplcnJIYm5mIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckhibmYKCmNyZWF0ZUhlYXJ0YmVhdF9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTczCiAgICAvLyBjb25zdCB0aW1lc3RhbXAgPSBuZXcgVWludDY0KEdsb2JhbC5sYXRlc3RUaW1lc3RhbXApCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBpdG9iCiAgICBidXJ5IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTc0CiAgICAvLyBjb25zdCBoZWFydGJlYXRzID0gY2xvbmUodGhpcy5oZWFydGJlYXRzKGhiaykudmFsdWUpCiAgICBkaWcgMTAKICAgIGJveF9nZXQKICAgIHN3YXAKICAgIGJ1cnkgMTQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjU3NwogICAgLy8gY29uc3QgaGVsZCA9IG5ldyBVaW50NjQodGhpcy5nZXRIZWxkKGFkZHJlc3MsIGFzc2V0KS5iYWxhbmNlKQogICAgY2FsbHN1YiBnZXRIZWxkCiAgICBleHRyYWN0IDAgOAogICAgYnVyeSAxMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1NzktNTgzCiAgICAvLyBjb25zdCBoYXJkU3Rha2VLZXkgPSB7CiAgICAvLyAgIGFkZHJlc3MsCiAgICAvLyAgIGFzc2V0LAogICAgLy8gICB0eXBlOiBTVEFLSU5HX1RZUEVfSEFSRAogICAgLy8gfQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjU4MgogICAgLy8gdHlwZTogU1RBS0lOR19UWVBFX0hBUkQKICAgIGJ5dGVjIDQgLy8gMHgxZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1NzktNTgzCiAgICAvLyBjb25zdCBoYXJkU3Rha2VLZXkgPSB7CiAgICAvLyAgIGFkZHJlc3MsCiAgICAvLyAgIGFzc2V0LAogICAgLy8gICB0eXBlOiBTVEFLSU5HX1RZUEVfSEFSRAogICAgLy8gfQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjU4NQogICAgLy8gbGV0IGhhcmQ6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBidXJ5IDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTg2CiAgICAvLyBpZiAodGhpcy5zdGFrZXMoaGFyZFN0YWtlS2V5KS5leGlzdHMpIHsKICAgIGR1cAogICAgZXh0cmFjdCAwIDMyCiAgICBkaWcgMQogICAgZXh0cmFjdCAzMiA4CiAgICB1bmNvdmVyIDIKICAgIGV4dHJhY3QgNDAgMQogICAgY292ZXIgMgogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTA1CiAgICAvLyBzdGFrZXMgPSBCb3hNYXA8U3Rha2VLZXksIFN0YWtlPih7IGtleVByZWZpeDogU3Rha2luZ0JveFByZWZpeFN0YWtlcyB9KQogICAgYnl0ZWNfMCAvLyAicyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBidXJ5IDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTg2CiAgICAvLyBpZiAodGhpcy5zdGFrZXMoaGFyZFN0YWtlS2V5KS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogY3JlYXRlSGVhcnRiZWF0X2FmdGVyX2lmX2Vsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1ODcKICAgIC8vIGhhcmQgPSB0aGlzLnN0YWtlcyhoYXJkU3Rha2VLZXkpLnZhbHVlLmFtb3VudAogICAgZGlnIDcKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGJ1cnkgNQoKY3JlYXRlSGVhcnRiZWF0X2FmdGVyX2lmX2Vsc2VANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTkzCiAgICAvLyB0eXBlOiBTVEFLSU5HX1RZUEVfTE9DSwogICAgYnl0ZWNfMiAvLyAweDI4CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjU5MC01OTQKICAgIC8vIGNvbnN0IGxvY2tTdGFrZUtleSA9IHsKICAgIC8vICAgYWRkcmVzcywKICAgIC8vICAgYXNzZXQsCiAgICAvLyAgIHR5cGU6IFNUQUtJTkdfVFlQRV9MT0NLCiAgICAvLyB9CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NTk2CiAgICAvLyBsZXQgbG9jazogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIGJ1cnkgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1OTcKICAgIC8vIGlmICh0aGlzLnN0YWtlcyhsb2NrU3Rha2VLZXkpLmV4aXN0cykgewogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIGRpZyAxCiAgICBleHRyYWN0IDMyIDgKICAgIHVuY292ZXIgMgogICAgZXh0cmFjdCA0MCAxCiAgICBjb3ZlciAyCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDUKICAgIC8vIHN0YWtlcyA9IEJveE1hcDxTdGFrZUtleSwgU3Rha2U+KHsga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4U3Rha2VzIH0pCiAgICBieXRlY18wIC8vICJzIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGJ1cnkgNwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo1OTcKICAgIC8vIGlmICh0aGlzLnN0YWtlcyhsb2NrU3Rha2VLZXkpLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBjcmVhdGVIZWFydGJlYXRfYWZ0ZXJfaWZfZWxzZUA5CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjU5OAogICAgLy8gbG9jayA9IHRoaXMuc3Rha2VzKGxvY2tTdGFrZUtleSkudmFsdWUuYW1vdW50CiAgICBkaWcgNQogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYnVyeSAxCgpjcmVhdGVIZWFydGJlYXRfYWZ0ZXJfaWZfZWxzZUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2MDcKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCA0OyBpICs9IDEpIHsKICAgIGludGNfMCAvLyAwCiAgICBidXJ5IDMKCmNyZWF0ZUhlYXJ0YmVhdF93aGlsZV90b3BAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjYwNwogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IDQ7IGkgKz0gMSkgewogICAgZGlnIDIKICAgIHB1c2hpbnQgNAogICAgPAogICAgYnogY3JlYXRlSGVhcnRiZWF0X2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5jcmVhdGVIZWFydGJlYXRAMTkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NjA5CiAgICAvLyBpID09PSAzIHx8CiAgICBkaWcgMgogICAgcHVzaGludCAzCiAgICA9PQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjYwOS02MTAKICAgIC8vIGkgPT09IDMgfHwKICAgIC8vIGhlYXJ0YmVhdHNbaV0udGltZXN0YW1wLmFzVWludDY0KCkgPiBoZWFydGJlYXRzW2kgKyAxXS50aW1lc3RhbXAuYXNVaW50NjQoKQogICAgYm56IGNyZWF0ZUhlYXJ0YmVhdF9pZl9ib2R5QDEzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjYxMAogICAgLy8gaGVhcnRiZWF0c1tpXS50aW1lc3RhbXAuYXNVaW50NjQoKSA+IGhlYXJ0YmVhdHNbaSArIDFdLnRpbWVzdGFtcC5hc1VpbnQ2NCgpCiAgICBkaWcgMwogICAgZHVwCiAgICBpbnRjXzMgLy8gMzIKICAgICoKICAgIGRpZyAxMgogICAgZHVwCiAgICBjb3ZlciAzCiAgICBzd2FwCiAgICBpbnRjXzMgLy8gMzIKICAgIGV4dHJhY3QzIC8vIG9uIGVycm9yOiBpbmRleCBhY2Nlc3MgaXMgb3V0IG9mIGJvdW5kcwogICAgcHVzaGludCAyNAogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBkdXAKICAgIGJ1cnkgNgogICAgaW50Y18zIC8vIDMyCiAgICAqCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGludGNfMyAvLyAzMgogICAgZXh0cmFjdDMgLy8gb24gZXJyb3I6IGluZGV4IGFjY2VzcyBpcyBvdXQgb2YgYm91bmRzCiAgICBwdXNoaW50IDI0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgPgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2MDktNjEwCiAgICAvLyBpID09PSAzIHx8CiAgICAvLyBoZWFydGJlYXRzW2ldLnRpbWVzdGFtcC5hc1VpbnQ2NCgpID4gaGVhcnRiZWF0c1tpICsgMV0udGltZXN0YW1wLmFzVWludDY0KCkKICAgIGJ6IGNyZWF0ZUhlYXJ0YmVhdF9hZnRlcl9pZl9lbHNlQDE3CgpjcmVhdGVIZWFydGJlYXRfaWZfYm9keUAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NjEyCiAgICAvLyBjb25zdCBpbmRleFRvTW9kaWZ5OiB1aW50NjQgPSBpID09PSAzID8gMCA6IGkgKyAxCiAgICBieiBjcmVhdGVIZWFydGJlYXRfdGVybmFyeV9mYWxzZUAxNQogICAgaW50Y18wIC8vIDAKCmNyZWF0ZUhlYXJ0YmVhdF90ZXJuYXJ5X21lcmdlQDE2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2MTUKICAgIC8vIGhhcmQ6IG5ldyBVaW50NjQoaGFyZCksCiAgICBkaWcgNAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2MTYKICAgIC8vIGxvY2s6IG5ldyBVaW50NjQobG9jayksCiAgICBkaWcgMgogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2MTMtNjE4CiAgICAvLyB0aGlzLmhlYXJ0YmVhdHMoaGJrKS52YWx1ZVtpbmRleFRvTW9kaWZ5XSA9IG5ldyBhcmM0SGVhcnRiZWF0KHsKICAgIC8vICAgaGVsZCwKICAgIC8vICAgaGFyZDogbmV3IFVpbnQ2NChoYXJkKSwKICAgIC8vICAgbG9jazogbmV3IFVpbnQ2NChsb2NrKSwKICAgIC8vICAgdGltZXN0YW1wLAogICAgLy8gfSkKICAgIGRpZyAxMQogICAgdW5jb3ZlciAyCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZGlnIDYKICAgIGNvbmNhdAogICAgc3dhcAogICAgaW50Y18zIC8vIDMyCiAgICAqCiAgICBkaWcgOQogICAgc3dhcAogICAgdW5jb3ZlciAyCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwoKY3JlYXRlSGVhcnRiZWF0X2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5jcmVhdGVIZWFydGJlYXRAMTk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjU2NwogICAgLy8gY3JlYXRlSGVhcnRiZWF0KGFkZHJlc3M6IEFjY291bnQsIGFzc2V0OiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmNyZWF0ZUhlYXJ0YmVhdF90ZXJuYXJ5X2ZhbHNlQDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2MTIKICAgIC8vIGNvbnN0IGluZGV4VG9Nb2RpZnk6IHVpbnQ2NCA9IGkgPT09IDMgPyAwIDogaSArIDEKICAgIGRpZyAyCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgYiBjcmVhdGVIZWFydGJlYXRfdGVybmFyeV9tZXJnZUAxNgoKY3JlYXRlSGVhcnRiZWF0X2FmdGVyX2lmX2Vsc2VAMTc6CiAgICBwb3AKICAgIGRpZyAxCiAgICBidXJ5IDMKICAgIGIgY3JlYXRlSGVhcnRiZWF0X3doaWxlX3RvcEAxMAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuY2hlY2twb2ludFNvZnRTdGFrZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNoZWNrcG9pbnRTb2Z0U3Rha2U6CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2MjUKICAgIC8vIGNoZWNrcG9pbnRTb2Z0U3Rha2UoYWRkcmVzczogQWNjb3VudCwgYXNzZXQ6IHVpbnQ2NCk6IFN0YWtlQ2hlY2sgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwbiAyCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NjI2CiAgICAvLyBjb25zdCBzazogU3Rha2VLZXkgPSB7IGFkZHJlc3MsIGFzc2V0LCB0eXBlOiBTVEFLSU5HX1RZUEVfU09GVCB9CiAgICBpdG9iCiAgICBjb25jYXQKICAgIGJ5dGVjIDUgLy8gMHgxNAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwNQogICAgLy8gc3Rha2VzID0gQm94TWFwPFN0YWtlS2V5LCBTdGFrZT4oeyBrZXlQcmVmaXg6IFN0YWtpbmdCb3hQcmVmaXhTdGFrZXMgfSkKICAgIGJ5dGVjXzAgLy8gInMiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2MjcKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnN0YWtlcyhzaykuZXhpc3RzLCBlcnJTdGFrZURvZXNudEV4aXN0KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogY2hlY2twb2ludFNvZnRTdGFrZV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMTMgLy8gIkVSUjplcnJTbmV4IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclNuZXgKCmNoZWNrcG9pbnRTb2Z0U3Rha2VfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjYyOQogICAgLy8gY29uc3QgeyBiYWxhbmNlLCBvcHRlZEluIH0gPSB0aGlzLmdldEhlbGQoYWRkcmVzcywgYXNzZXQpCiAgICBjYWxsc3ViIGdldEhlbGQKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICBwdXNoaW50IDY0CiAgICBnZXRiaXQKICAgIGR1cAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2MzAKICAgIC8vIGNvbnN0IGluZm8gPSBjbG9uZSh0aGlzLnN0YWtlcyhzaykudmFsdWUpCiAgICBkaWcgMwogICAgYm94X2dldAogICAgc3dhcAogICAgYnVyeSA2CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2MzEKICAgIC8vIGNvbnN0IHZhbGlkID0gb3B0ZWRJbiAmJiBiYWxhbmNlID49IGluZm8uYW1vdW50CiAgICBieiBjaGVja3BvaW50U29mdFN0YWtlX2Jvb2xfZmFsc2VANgogICAgZGlnIDMKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZGlnIDEKICAgIDw9CiAgICBieiBjaGVja3BvaW50U29mdFN0YWtlX2Jvb2xfZmFsc2VANgogICAgaW50Y18xIC8vIDEKCmNoZWNrcG9pbnRTb2Z0U3Rha2VfYm9vbF9tZXJnZUA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2MzIKICAgIC8vIGlmICghdmFsaWQpIHsKICAgIGR1cAogICAgYm56IGNoZWNrcG9pbnRTb2Z0U3Rha2VfYWZ0ZXJfaWZfZWxzZUA5CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjYzMwogICAgLy8gdGhpcy5zdGFrZXMoc2spLnZhbHVlID0gdGhpcy5jaGVja3BvaW50U3Rha2UoaW5mbywgb3B0ZWRJbiA/IGJhbGFuY2UgOiAwKQogICAgaW50Y18wIC8vIDAKICAgIGRpZyAyCiAgICBkaWcgNAogICAgc2VsZWN0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTk0CiAgICAvLyBpZiAoYmFsYW5jZSA+PSBpbmZvLmFtb3VudCkgewogICAgZGlnIDYKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgPj0KICAgIGJ6IGNoZWNrcG9pbnRTb2Z0U3Rha2VfYWZ0ZXJfaWZfZWxzZUAxMgogICAgcG9wCiAgICBkaWcgNAoKY2hlY2twb2ludFNvZnRTdGFrZV9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuY2hlY2twb2ludFN0YWtlQDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2MzMKICAgIC8vIHRoaXMuc3Rha2VzKHNrKS52YWx1ZSA9IHRoaXMuY2hlY2twb2ludFN0YWtlKGluZm8sIG9wdGVkSW4gPyBiYWxhbmNlIDogMCkKICAgIGRpZyA0CiAgICBzd2FwCiAgICBib3hfcHV0CgpjaGVja3BvaW50U29mdFN0YWtlX2FmdGVyX2lmX2Vsc2VAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NjM2CiAgICAvLyByZXR1cm4geyB2YWxpZCwgYmFsYW5jZTogb3B0ZWRJbiA/IGJhbGFuY2UgOiAwIH0KICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDIKICAgIHVuY292ZXIgMwogICAgc2VsZWN0CiAgICBieXRlYyAxMSAvLyAweDAwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAzCiAgICBzZXRiaXQKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2MjUKICAgIC8vIGNoZWNrcG9pbnRTb2Z0U3Rha2UoYWRkcmVzczogQWNjb3VudCwgYXNzZXQ6IHVpbnQ2NCk6IFN0YWtlQ2hlY2sgewogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKY2hlY2twb2ludFNvZnRTdGFrZV9hZnRlcl9pZl9lbHNlQDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoyMDAKICAgIC8vIGxhc3RVcGRhdGU6IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjIwMQogICAgLy8gZXhwaXJhdGlvbjogaW5mby5leHBpcmF0aW9uLAogICAgZGlnIDYKICAgIGV4dHJhY3QgMTYgOAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxOTgtMjAzCiAgICAvLyByZXR1cm4gewogICAgLy8gICBhbW91bnQ6IGJhbGFuY2UsCiAgICAvLyAgIGxhc3RVcGRhdGU6IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICAvLyAgIGV4cGlyYXRpb246IGluZm8uZXhwaXJhdGlvbiwKICAgIC8vICAgd2VpZ2h0ZWRBZ2U6IDAsCiAgICAvLyB9CiAgICB1bmNvdmVyIDIKICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgaXRvYgogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MjAyCiAgICAvLyB3ZWlnaHRlZEFnZTogMCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjE5OC0yMDMKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIGFtb3VudDogYmFsYW5jZSwKICAgIC8vICAgbGFzdFVwZGF0ZTogR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIC8vICAgZXhwaXJhdGlvbjogaW5mby5leHBpcmF0aW9uLAogICAgLy8gICB3ZWlnaHRlZEFnZTogMCwKICAgIC8vIH0KICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2MzMKICAgIC8vIHRoaXMuc3Rha2VzKHNrKS52YWx1ZSA9IHRoaXMuY2hlY2twb2ludFN0YWtlKGluZm8sIG9wdGVkSW4gPyBiYWxhbmNlIDogMCkKICAgIGIgY2hlY2twb2ludFNvZnRTdGFrZV9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuY2hlY2twb2ludFN0YWtlQDEzCgpjaGVja3BvaW50U29mdFN0YWtlX2Jvb2xfZmFsc2VANjoKICAgIGludGNfMCAvLyAwCiAgICBiIGNoZWNrcG9pbnRTb2Z0U3Rha2VfYm9vbF9tZXJnZUA3CgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5jb21taXRBcHBTb2Z0U3Rha2Vbcm91dGluZ10oKSAtPiB2b2lkOgpjb21taXRBcHBTb2Z0U3Rha2U6CiAgICBpbnRjXzAgLy8gMAogICAgcHVzaGJ5dGVzICIiCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NjQzLTY0OQogICAgLy8gY29tbWl0QXBwU29mdFN0YWtlKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGFkZHJlc3M6IEFjY291bnQsCiAgICAvLyAgIGFzc2V0OiB1aW50NjQsCiAgICAvLyAgIGFtb3VudDogdWludDY0LAogICAgLy8gICBpbmhlcml0Um9vdDogYm9vbGVhbgogICAgLy8gKTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgY292ZXIgMgogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmJvb2wKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NjUwCiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uSWQgIT09IDAsIGVyckFwcENhbGxSZXF1aXJlZCkKICAgIGdsb2JhbCBDYWxsZXJBcHBsaWNhdGlvbklECiAgICBibnogY29tbWl0QXBwU29mdFN0YWtlX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAzNiAvLyAiRVJSOmVyckFjcnEiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQWNycQoKY29tbWl0QXBwU29mdFN0YWtlX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2NTEKICAgIC8vIGNvbnN0IGFwcCA9IEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbklkCiAgICBnbG9iYWwgQ2FsbGVyQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2NTIKICAgIC8vIGNvbnN0IGtleTogQXBwU3Rha2VLZXkgPSB7IGFwcCwgYWRkcmVzcywgYXNzZXQgfQogICAgaXRvYgogICAgZGlnIDUKICAgIGR1cAogICAgY292ZXIgMgogICAgY29uY2F0CiAgICB1bmNvdmVyIDUKICAgIGR1cAogICAgY292ZXIgMgogICAgaXRvYgogICAgZHVwCiAgICBidXJ5IDExCiAgICBjb25jYXQKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NjUzCiAgICAvLyBjb25zdCB7IGJhbGFuY2UsIG9wdGVkSW4gfSA9IHRoaXMuZ2V0SGVsZChhZGRyZXNzLCBhc3NldCkKICAgIGNhbGxzdWIgZ2V0SGVsZAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGJ1cnkgOAogICAgcHVzaGludCA2NAogICAgZ2V0Yml0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjY1NAogICAgLy8gbG9nZ2VkQXNzZXJ0KG9wdGVkSW4sIGVyck5vdE9wdGVkSW4pCiAgICBibnogY29tbWl0QXBwU29mdFN0YWtlX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyAxOCAvLyAiRVJSOmVyck5vcHQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTm9wdAoKY29tbWl0QXBwU29mdFN0YWtlX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDkKICAgIC8vIGFwcFN0YWtlcyA9IEJveE1hcDxBcHBTdGFrZUtleSwgQXBwU3Rha2U+KHsga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4QXBwU3Rha2VzIH0pCiAgICBieXRlYyAxNiAvLyAiYSIKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICBkdXAKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NjU2CiAgICAvLyBjb25zdCBjb3N0OiB1aW50NjQgPSB0aGlzLmFwcFN0YWtlcyhrZXkpLmV4aXN0cyA/IDAgOiB0aGlzLm1icigpLmFwcFN0YWtlcwogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBjb21taXRBcHBTb2Z0U3Rha2VfdGVybmFyeV9mYWxzZUA3CiAgICBpbnRjXzAgLy8gMAogICAgc3dhcAoKY29tbWl0QXBwU29mdFN0YWtlX3Rlcm5hcnlfbWVyZ2VAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NjU3CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRQYXltZW50KQogICAgZGlnIDQKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBjb21taXRBcHBTb2Z0U3Rha2VfYWZ0ZXJfYXNzZXJ0QDEwCiAgICBieXRlY18zIC8vICJFUlI6ZXJySXBheSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcGF5Cgpjb21taXRBcHBTb2Z0U3Rha2VfYWZ0ZXJfYXNzZXJ0QDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2NTgKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LmFtb3VudCA9PT0gY29zdCwgZXJySW52YWxpZFBheW1lbnQpCiAgICB1bmNvdmVyIDQKICAgIGd0eG5zIEFtb3VudAogICAgdW5jb3ZlciAyCiAgICA9PQogICAgYm56IGNvbW1pdEFwcFNvZnRTdGFrZV9hZnRlcl9hc3NlcnRAMTIKICAgIGJ5dGVjXzMgLy8gIkVSUjplcnJJcGF5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwYXkKCmNvbW1pdEFwcFNvZnRTdGFrZV9hZnRlcl9hc3NlcnRAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjY2MAogICAgLy8gaWYgKCF0aGlzLmFwcFN0YWtlcyhrZXkpLmV4aXN0cykgewogICAgZGlnIDIKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGNvbW1pdEFwcFNvZnRTdGFrZV9hZnRlcl9pZl9lbHNlQDI2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjY2MQogICAgLy8gbG9nZ2VkQXNzZXJ0KGJhbGFuY2UgPj0gYW1vdW50LCBlcnJJbnN1ZmZpY2llbnRCYWxhbmNlKQogICAgZGlnIDUKICAgIGRpZyAyCiAgICA+PQogICAgYm56IGNvbW1pdEFwcFNvZnRTdGFrZV9hZnRlcl9hc3NlcnRAMTUKICAgIGJ5dGVjIDEyIC8vICJFUlI6ZXJySWJhbCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJYmFsCgpjb21taXRBcHBTb2Z0U3Rha2VfYWZ0ZXJfYXNzZXJ0QDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2NjMKICAgIC8vIGxldCBpbmhlcml0ZWRBZ2U6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjY2NAogICAgLy8gaWYgKGluaGVyaXRSb290KSB7CiAgICBzd2FwCiAgICBieiBjb21taXRBcHBTb2Z0U3Rha2VfYWZ0ZXJfaWZfZWxzZUAyNQogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjY2NQogICAgLy8gY29uc3Qgcm9vdEtleTogU3Rha2VLZXkgPSB7IGFkZHJlc3MsIGFzc2V0LCB0eXBlOiBTVEFLSU5HX1RZUEVfU09GVCB9CiAgICBkaWcgMgogICAgZGlnIDYKICAgIGNvbmNhdAogICAgYnl0ZWMgNSAvLyAweDE0CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTA1CiAgICAvLyBzdGFrZXMgPSBCb3hNYXA8U3Rha2VLZXksIFN0YWtlPih7IGtleVByZWZpeDogU3Rha2luZ0JveFByZWZpeFN0YWtlcyB9KQogICAgYnl0ZWNfMCAvLyAicyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjY2NgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc3Rha2VzKHJvb3RLZXkpLmV4aXN0cywgZXJyU3Rha2VEb2VzbnRFeGlzdCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGNvbW1pdEFwcFNvZnRTdGFrZV9hZnRlcl9hc3NlcnRAMTgKICAgIGJ5dGVjIDEzIC8vICJFUlI6ZXJyU25leCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJTbmV4Cgpjb21taXRBcHBTb2Z0U3Rha2VfYWZ0ZXJfYXNzZXJ0QDE4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2NjcKICAgIC8vIGNvbnN0IHJvb3QgPSBjbG9uZSh0aGlzLnN0YWtlcyhyb290S2V5KS52YWx1ZSkKICAgIGJveF9nZXQKICAgIHN3YXAKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2NjgKICAgIC8vIGxvZ2dlZEFzc2VydChiYWxhbmNlID49IHJvb3QuYW1vdW50ICYmIGFtb3VudCA8PSByb290LmFtb3VudCwgZXJySW5zdWZmaWNpZW50QmFsYW5jZSkKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBidXJ5IDYKICAgIGRpZyA2CiAgICA8PQogICAgYnogY29tbWl0QXBwU29mdFN0YWtlX2Jvb2xfZmFsc2VAMjEKICAgIGRpZyAxCiAgICBkaWcgNQogICAgPD0KICAgIGJ6IGNvbW1pdEFwcFNvZnRTdGFrZV9ib29sX2ZhbHNlQDIxCiAgICBpbnRjXzEgLy8gMQoKY29tbWl0QXBwU29mdFN0YWtlX2Jvb2xfbWVyZ2VAMjI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjY2OAogICAgLy8gbG9nZ2VkQXNzZXJ0KGJhbGFuY2UgPj0gcm9vdC5hbW91bnQgJiYgYW1vdW50IDw9IHJvb3QuYW1vdW50LCBlcnJJbnN1ZmZpY2llbnRCYWxhbmNlKQogICAgYm56IGNvbW1pdEFwcFNvZnRTdGFrZV9hZnRlcl9hc3NlcnRAMjQKICAgIGJ5dGVjIDEyIC8vICJFUlI6ZXJySWJhbCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJYmFsCgpjb21taXRBcHBTb2Z0U3Rha2VfYWZ0ZXJfYXNzZXJ0QDI0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2NjkKICAgIC8vIGluaGVyaXRlZEFnZSA9IHRoaXMuZ2V0V2VpZ2h0ZWRBZ2Uocm9vdCkKICAgIGNhbGxzdWIgZ2V0V2VpZ2h0ZWRBZ2UKICAgIHBvcAoKY29tbWl0QXBwU29mdFN0YWtlX2FmdGVyX2lmX2Vsc2VAMjU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjY3NAogICAgLy8gbGFzdFVwZGF0ZTogR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NjcyLTY3NwogICAgLy8gdGhpcy5hcHBTdGFrZXMoa2V5KS52YWx1ZSA9IHsKICAgIC8vICAgYW1vdW50LAogICAgLy8gICBsYXN0VXBkYXRlOiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgLy8gICB3ZWlnaHRlZEFnZTogaW5oZXJpdGVkQWdlLAogICAgLy8gICBpbmhlcml0ZWRBZ2UsCiAgICAvLyB9CiAgICB1bmNvdmVyIDIKICAgIGl0b2IKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXRvYgogICAgc3dhcAogICAgZGlnIDEKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICBib3hfcHV0Cgpjb21taXRBcHBTb2Z0U3Rha2VfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmNvbW1pdEFwcFNvZnRTdGFrZUAyOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NjQzLTY0OQogICAgLy8gY29tbWl0QXBwU29mdFN0YWtlKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGFkZHJlc3M6IEFjY291bnQsCiAgICAvLyAgIGFzc2V0OiB1aW50NjQsCiAgICAvLyAgIGFtb3VudDogdWludDY0LAogICAgLy8gICBpbmhlcml0Um9vdDogYm9vbGVhbgogICAgLy8gKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpjb21taXRBcHBTb2Z0U3Rha2VfYm9vbF9mYWxzZUAyMToKICAgIGludGNfMCAvLyAwCiAgICBiIGNvbW1pdEFwcFNvZnRTdGFrZV9ib29sX21lcmdlQDIyCgpjb21taXRBcHBTb2Z0U3Rha2VfYWZ0ZXJfaWZfZWxzZUAyNjoKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2ODEKICAgIC8vIGNvbnN0IGN1cnJlbnQgPSBjbG9uZSh0aGlzLmFwcFN0YWtlcyhrZXkpLnZhbHVlKQogICAgZGlnIDEKICAgIGJveF9nZXQKICAgIHN3YXAKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2ODIKICAgIC8vIGNvbnN0IG5ld0Ftb3VudDogdWludDY0ID0gY3VycmVudC5hbW91bnQgKyBhbW91bnQKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgdW5jb3ZlciAyCiAgICArCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NjgzCiAgICAvLyBsb2dnZWRBc3NlcnQoYmFsYW5jZSA+PSBuZXdBbW91bnQsIGVyckluc3VmZmljaWVudEJhbGFuY2UpCiAgICBkaWcgNgogICAgPD0KICAgIGJueiBjb21taXRBcHBTb2Z0U3Rha2VfYWZ0ZXJfYXNzZXJ0QDI4CiAgICBieXRlYyAxMiAvLyAiRVJSOmVyckliYWwiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySWJhbAoKY29tbWl0QXBwU29mdFN0YWtlX2FmdGVyX2Fzc2VydEAyODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTc1CiAgICAvLyBjb25zdCBjdXJyZW50QWdlOiB1aW50NjQgPSB0aGlzLmdldEFwcFdlaWdodGVkQWdlKGluZm8sIHRydWUpCiAgICBzd2FwCiAgICBpbnRjXzEgLy8gMQogICAgY2FsbHN1YiBnZXRBcHBXZWlnaHRlZEFnZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxNzgKICAgIC8vIGxhc3RVcGRhdGU6IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjE3OQogICAgLy8gd2VpZ2h0ZWRBZ2U6IG9wLmRpdncoLi4ub3AubXVsdyhjdXJyZW50QWdlLCBpbmZvLmFtb3VudCksIG5ld0Ftb3VudCksCiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICB1bmNvdmVyIDMKICAgIGRpZyAxCiAgICBtdWx3CiAgICB1bmNvdmVyIDUKICAgIGR1cAogICAgY292ZXIgNQogICAgZGl2dwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxODAKICAgIC8vIGluaGVyaXRlZEFnZTogb3AuZGl2dyguLi5vcC5tdWx3KGluZm8uaW5oZXJpdGVkQWdlLCBpbmZvLmFtb3VudCksIG5ld0Ftb3VudCksCiAgICB1bmNvdmVyIDQKICAgIHB1c2hpbnQgMjQKICAgIGV4dHJhY3RfdWludDY0CiAgICB1bmNvdmVyIDIKICAgIG11bHcKICAgIGRpZyA0CiAgICBkaXZ3CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjE3Ni0xODEKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIGFtb3VudDogbmV3QW1vdW50LAogICAgLy8gICBsYXN0VXBkYXRlOiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgLy8gICB3ZWlnaHRlZEFnZTogb3AuZGl2dyguLi5vcC5tdWx3KGN1cnJlbnRBZ2UsIGluZm8uYW1vdW50KSwgbmV3QW1vdW50KSwKICAgIC8vICAgaW5oZXJpdGVkQWdlOiBvcC5kaXZ3KC4uLm9wLm11bHcoaW5mby5pbmhlcml0ZWRBZ2UsIGluZm8uYW1vdW50KSwgbmV3QW1vdW50KSwKICAgIC8vIH0KICAgIHVuY292ZXIgMwogICAgaXRvYgogICAgdW5jb3ZlciAzCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHVuY292ZXIgMgogICAgaXRvYgogICAgY29uY2F0CiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6Njg0CiAgICAvLyB0aGlzLmFwcFN0YWtlcyhrZXkpLnZhbHVlID0gdGhpcy5jYWxjdWxhdGVVcGRhdGVkQXBwU3Rha2UoY3VycmVudCwgbmV3QW1vdW50KQogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2NDMtNjQ5CiAgICAvLyBjb21taXRBcHBTb2Z0U3Rha2UoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgYWRkcmVzczogQWNjb3VudCwKICAgIC8vICAgYXNzZXQ6IHVpbnQ2NCwKICAgIC8vICAgYW1vdW50OiB1aW50NjQsCiAgICAvLyAgIGluaGVyaXRSb290OiBib29sZWFuCiAgICAvLyApOiB2b2lkIHsKICAgIGIgY29tbWl0QXBwU29mdFN0YWtlX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5jb21taXRBcHBTb2Z0U3Rha2VAMjkKCmNvbW1pdEFwcFNvZnRTdGFrZV90ZXJuYXJ5X2ZhbHNlQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjY1NgogICAgLy8gY29uc3QgY29zdDogdWludDY0ID0gdGhpcy5hcHBTdGFrZXMoa2V5KS5leGlzdHMgPyAwIDogdGhpcy5tYnIoKS5hcHBTdGFrZXMKICAgIGludGMgNyAvLyAzNDkwMAogICAgc3dhcAogICAgYiBjb21taXRBcHBTb2Z0U3Rha2VfdGVybmFyeV9tZXJnZUA4CgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5jaGVja3BvaW50QXBwU29mdFN0YWtlW3JvdXRpbmddKCkgLT4gdm9pZDoKY2hlY2twb2ludEFwcFNvZnRTdGFrZToKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjY5NQogICAgLy8gY2hlY2twb2ludEFwcFNvZnRTdGFrZShhcHA6IHVpbnQ2NCwgYWRkcmVzczogQWNjb3VudCwgYXNzZXQ6IHVpbnQ2NCk6IFN0YWtlQ2hlY2sgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6Njk2CiAgICAvLyBjb25zdCBrZXk6IEFwcFN0YWtlS2V5ID0geyBhcHAsIGFkZHJlc3MsIGFzc2V0IH0KICAgIHVuY292ZXIgMgogICAgaXRvYgogICAgZGlnIDIKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2OTcKICAgIC8vIGNvbnN0IHsgYmFsYW5jZSwgb3B0ZWRJbiB9ID0gdGhpcy5nZXRIZWxkKGFkZHJlc3MsIGFzc2V0KQogICAgY292ZXIgMgogICAgY2FsbHN1YiBnZXRIZWxkCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBjb3ZlciAzCiAgICBwdXNoaW50IDY0CiAgICBnZXRiaXQKICAgIGR1cAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo2OTgKICAgIC8vIGNvbnN0IGhlbGQ6IHVpbnQ2NCA9IG9wdGVkSW4gPyBiYWxhbmNlIDogMAogICAgaW50Y18wIC8vIDAKICAgIGNvdmVyIDIKICAgIHNlbGVjdAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDkKICAgIC8vIGFwcFN0YWtlcyA9IEJveE1hcDxBcHBTdGFrZUtleSwgQXBwU3Rha2U+KHsga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4QXBwU3Rha2VzIH0pCiAgICBieXRlYyAxNiAvLyAiYSIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjY5OQogICAgLy8gaWYgKCF0aGlzLmFwcFN0YWtlcyhrZXkpLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogY2hlY2twb2ludEFwcFNvZnRTdGFrZV9hZnRlcl9pZl9lbHNlQDMKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3MDAKICAgIC8vIHJldHVybiB7IHZhbGlkOiBmYWxzZSwgYmFsYW5jZTogaGVsZCB9CiAgICBpdG9iCiAgICBieXRlYyAxMSAvLyAweDAwCiAgICBzd2FwCiAgICBjb25jYXQKCmNoZWNrcG9pbnRBcHBTb2Z0U3Rha2VfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmNoZWNrcG9pbnRBcHBTb2Z0U3Rha2VAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjY5NQogICAgLy8gY2hlY2twb2ludEFwcFNvZnRTdGFrZShhcHA6IHVpbnQ2NCwgYWRkcmVzczogQWNjb3VudCwgYXNzZXQ6IHVpbnQ2NCk6IFN0YWtlQ2hlY2sgewogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKY2hlY2twb2ludEFwcFNvZnRTdGFrZV9hZnRlcl9pZl9lbHNlQDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjcwMwogICAgLy8gY29uc3QgaW5mbyA9IGNsb25lKHRoaXMuYXBwU3Rha2VzKGtleSkudmFsdWUpCiAgICBkaWcgMgogICAgYm94X2dldAogICAgc3dhcAogICAgYnVyeSA3CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3MDQKICAgIC8vIGNvbnN0IHZhbGlkID0gb3B0ZWRJbiAmJiBiYWxhbmNlID49IGluZm8uYW1vdW50CiAgICBzd2FwCiAgICBieiBjaGVja3BvaW50QXBwU29mdFN0YWtlX2Jvb2xfZmFsc2VANgogICAgZGlnIDQKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZGlnIDMKICAgIDw9CiAgICBieiBjaGVja3BvaW50QXBwU29mdFN0YWtlX2Jvb2xfZmFsc2VANgogICAgaW50Y18xIC8vIDEKCmNoZWNrcG9pbnRBcHBTb2Z0U3Rha2VfYm9vbF9tZXJnZUA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3MDUKICAgIC8vIGlmICghdmFsaWQpIHsKICAgIGR1cAogICAgYm56IGNoZWNrcG9pbnRBcHBTb2Z0U3Rha2VfYWZ0ZXJfaWZfZWxzZUAxMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3MDYKICAgIC8vIGNvbnN0IGFtb3VudDogdWludDY0ID0gR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uSWQgPT09IGFwcCA/IGhlbGQgOiBpbmZvLmFtb3VudAogICAgZ2xvYmFsIENhbGxlckFwcGxpY2F0aW9uSUQKICAgIGRpZyA1CiAgICA9PQogICAgYnogY2hlY2twb2ludEFwcFNvZnRTdGFrZV90ZXJuYXJ5X2ZhbHNlQDEwCiAgICBkaWcgMQoKY2hlY2twb2ludEFwcFNvZnRTdGFrZV90ZXJuYXJ5X21lcmdlQDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3MDkKICAgIC8vIGxhc3RVcGRhdGU6IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjcwNy03MTIKICAgIC8vIHRoaXMuYXBwU3Rha2VzKGtleSkudmFsdWUgPSB7CiAgICAvLyAgIGFtb3VudCwKICAgIC8vICAgbGFzdFVwZGF0ZTogR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIC8vICAgd2VpZ2h0ZWRBZ2U6IDAsCiAgICAvLyAgIGluaGVyaXRlZEFnZTogMCwKICAgIC8vIH0KICAgIHN3YXAKICAgIGl0b2IKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3MTAKICAgIC8vIHdlaWdodGVkQWdlOiAwLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NzA3LTcxMgogICAgLy8gdGhpcy5hcHBTdGFrZXMoa2V5KS52YWx1ZSA9IHsKICAgIC8vICAgYW1vdW50LAogICAgLy8gICBsYXN0VXBkYXRlOiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgLy8gICB3ZWlnaHRlZEFnZTogMCwKICAgIC8vICAgaW5oZXJpdGVkQWdlOiAwLAogICAgLy8gfQogICAgaXRvYgogICAgc3dhcAogICAgZGlnIDEKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICBkaWcgMwogICAgc3dhcAogICAgYm94X3B1dAoKY2hlY2twb2ludEFwcFNvZnRTdGFrZV9hZnRlcl9pZl9lbHNlQDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3MTQKICAgIC8vIHJldHVybiB7IHZhbGlkLCBiYWxhbmNlOiBoZWxkIH0KICAgIGJ5dGVjIDExIC8vIDB4MDAKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDIKICAgIHNldGJpdAogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjY5NQogICAgLy8gY2hlY2twb2ludEFwcFNvZnRTdGFrZShhcHA6IHVpbnQ2NCwgYWRkcmVzczogQWNjb3VudCwgYXNzZXQ6IHVpbnQ2NCk6IFN0YWtlQ2hlY2sgewogICAgYiBjaGVja3BvaW50QXBwU29mdFN0YWtlX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5jaGVja3BvaW50QXBwU29mdFN0YWtlQDEzCgpjaGVja3BvaW50QXBwU29mdFN0YWtlX3Rlcm5hcnlfZmFsc2VAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjcwNgogICAgLy8gY29uc3QgYW1vdW50OiB1aW50NjQgPSBHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25JZCA9PT0gYXBwID8gaGVsZCA6IGluZm8uYW1vdW50CiAgICBkaWcgNQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBiIGNoZWNrcG9pbnRBcHBTb2Z0U3Rha2VfdGVybmFyeV9tZXJnZUAxMQoKY2hlY2twb2ludEFwcFNvZnRTdGFrZV9ib29sX2ZhbHNlQDY6CiAgICBpbnRjXzAgLy8gMAogICAgYiBjaGVja3BvaW50QXBwU29mdFN0YWtlX2Jvb2xfbWVyZ2VANwoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcudXBkYXRlU2V0dGluZ3Nbcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGVTZXR0aW5nczoKICAgIHB1c2hieXRlcyAiIgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjcyNQogICAgLy8gdXBkYXRlU2V0dGluZ3MocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBhc3NldDogdWludDY0LCB2YWx1ZTogdWludDY0KTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MjQ5CiAgICAvLyBjb25zdCBbYnl0ZXMsIGV4aXN0c10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXNzZXRzKSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlYyA2IC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjI0OQogICAgLy8gY29uc3QgW2J5dGVzLCBleGlzdHNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXModGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFzc2V0cykpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgcHVzaGJ5dGVzICJha2l0YV9hc3NldHMiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoyNTAKICAgIC8vIGlmICghZXhpc3RzKSB7CiAgICBibnogdXBkYXRlU2V0dGluZ3NfYWZ0ZXJfaWZfZWxzZUAzMQogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjI1MQogICAgLy8gcmV0dXJuIHsgYWt0YTogMCwgYm9uZXM6IDAgfQogICAgYnl0ZWMgMzcgLy8gMHgwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAoKdXBkYXRlU2V0dGluZ3NfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmdvdmVybmFuY2VBc3NldHNAMzI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjcyNgogICAgLy8gY29uc3QgeyBha3RhLCBib25lcyB9ID0gdGhpcy5nb3Zlcm5hbmNlQXNzZXRzKCkKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBidXJ5IDYKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgYnVyeSA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjcyNwogICAgLy8gaWYgKGFzc2V0ICE9PSAwICYmIChhc3NldCA9PT0gYWt0YSB8fCBhc3NldCA9PT0gYm9uZXMpKSB7CiAgICBkaWcgMQogICAgYnogdXBkYXRlU2V0dGluZ3NfZWxzZV9ib2R5QDcKICAgIGRpZyAxCiAgICBkaWcgNQogICAgPT0KICAgIGJueiB1cGRhdGVTZXR0aW5nc19pZl9ib2R5QDQKICAgIGRpZyAxCiAgICBkaWcgNAogICAgPT0KICAgIGJ6IHVwZGF0ZVNldHRpbmdzX2Vsc2VfYm9keUA3Cgp1cGRhdGVTZXR0aW5nc19pZl9ib2R5QDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjcyOAogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWMgNiAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyAxOSAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3MjgKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IHVwZGF0ZVNldHRpbmdzX2FmdGVyX2lmX2Vsc2VAMTAKICAgIGJ5dGVjIDIwIC8vICJFUlI6ZXJyTmRhbyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOZGFvCgp1cGRhdGVTZXR0aW5nc19hZnRlcl9pZl9lbHNlQDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3MzMKICAgIC8vIGxvZ2dlZEFzc2VydCh2YWx1ZSA+PSBNSU5fTUFYX0xPQ0tVUCAmJiB2YWx1ZSA8PSBNQVhfTUFYX0xPQ0tVUCwgZXJySW52YWxpZExvY2t1cFNldHRpbmcpCiAgICBkdXAKICAgIHB1c2hpbnQgMTIwOTYwMAogICAgPj0KICAgIGJ6IHVwZGF0ZVNldHRpbmdzX2Jvb2xfZmFsc2VAMTMKICAgIGR1cAogICAgcHVzaGludCAxMjYxNDQwMDAKICAgIDw9CiAgICBieiB1cGRhdGVTZXR0aW5nc19ib29sX2ZhbHNlQDEzCiAgICBpbnRjXzEgLy8gMQoKdXBkYXRlU2V0dGluZ3NfYm9vbF9tZXJnZUAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NzMzCiAgICAvLyBsb2dnZWRBc3NlcnQodmFsdWUgPj0gTUlOX01BWF9MT0NLVVAgJiYgdmFsdWUgPD0gTUFYX01BWF9MT0NLVVAsIGVyckludmFsaWRMb2NrdXBTZXR0aW5nKQogICAgYm56IHVwZGF0ZVNldHRpbmdzX2FmdGVyX2Fzc2VydEAxNgogICAgcHVzaGJ5dGVzICJFUlI6ZXJySWxrcyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJbGtzCgp1cGRhdGVTZXR0aW5nc19hZnRlcl9hc3NlcnRAMTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjczNAogICAgLy8gY29uc3QgY3VycmVudDogdWludDY0ID0gdGhpcy5zZXR0aW5ncyhhc3NldCkuZXhpc3RzID8gdGhpcy5zZXR0aW5ncyhhc3NldCkudmFsdWUgOiBPTkVfWUVBUgogICAgZGlnIDEKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTE4CiAgICAvLyBzZXR0aW5ncyA9IEJveE1hcDx1aW50NjQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFN0YWtpbmdCb3hQcmVmaXhTZXR0aW5ncyB9KQogICAgYnl0ZWMgMjIgLy8gImUiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3MzQKICAgIC8vIGNvbnN0IGN1cnJlbnQ6IHVpbnQ2NCA9IHRoaXMuc2V0dGluZ3MoYXNzZXQpLmV4aXN0cyA/IHRoaXMuc2V0dGluZ3MoYXNzZXQpLnZhbHVlIDogT05FX1lFQVIKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogdXBkYXRlU2V0dGluZ3NfdGVybmFyeV9mYWxzZUAxOAogICAgZHVwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgYnRvaQoKdXBkYXRlU2V0dGluZ3NfdGVybmFyeV9tZXJnZUAxOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NzM1CiAgICAvLyBsb2dnZWRBc3NlcnQodmFsdWUgPj0gY3VycmVudCwgZXJyTG9ja3VwRGVjcmVhc2UpCiAgICBkaWcgMgogICAgPD0KICAgIGJueiB1cGRhdGVTZXR0aW5nc19hZnRlcl9hc3NlcnRAMjEKICAgIHB1c2hieXRlcyAiRVJSOmVyckxrZGMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTGtkYwoKdXBkYXRlU2V0dGluZ3NfYWZ0ZXJfYXNzZXJ0QDIxOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3MzcKICAgIC8vIGFzc2VydFNhZmVQYXltZW50KHBheW1lbnQsIFR4bi5zZW5kZXIpCiAgICB0eG4gU2VuZGVyCiAgICBkaWcgNAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgYXNzZXJ0U2FmZVBheW1lbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NzM4CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRQYXltZW50KQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IHVwZGF0ZVNldHRpbmdzX2FmdGVyX2Fzc2VydEAyMwogICAgYnl0ZWNfMyAvLyAiRVJSOmVycklwYXkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBheQoKdXBkYXRlU2V0dGluZ3NfYWZ0ZXJfYXNzZXJ0QDIzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3NDAKICAgIC8vIHBheW1lbnQuYW1vdW50ID09PSAodGhpcy5zZXR0aW5ncyhhc3NldCkuZXhpc3RzID8gMCA6IHRoaXMubWJyKCkuc2V0dGluZ3MpLAogICAgZGlnIDMKICAgIGd0eG5zIEFtb3VudAogICAgZGlnIDEKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogdXBkYXRlU2V0dGluZ3NfdGVybmFyeV9mYWxzZUAyNQogICAgaW50Y18wIC8vIDAKCnVwZGF0ZVNldHRpbmdzX3Rlcm5hcnlfbWVyZ2VAMjY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjc0MAogICAgLy8gcGF5bWVudC5hbW91bnQgPT09ICh0aGlzLnNldHRpbmdzKGFzc2V0KS5leGlzdHMgPyAwIDogdGhpcy5tYnIoKS5zZXR0aW5ncyksCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3MzktNzQyCiAgICAvLyBsb2dnZWRBc3NlcnQoCiAgICAvLyAgIHBheW1lbnQuYW1vdW50ID09PSAodGhpcy5zZXR0aW5ncyhhc3NldCkuZXhpc3RzID8gMCA6IHRoaXMubWJyKCkuc2V0dGluZ3MpLAogICAgLy8gICBlcnJJbnZhbGlkUGF5bWVudAogICAgLy8gKQogICAgYm56IHVwZGF0ZVNldHRpbmdzX2FmdGVyX2Fzc2VydEAyOAogICAgYnl0ZWNfMyAvLyAiRVJSOmVycklwYXkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBheQoKdXBkYXRlU2V0dGluZ3NfYWZ0ZXJfYXNzZXJ0QDI4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3NDQKICAgIC8vIHRoaXMuc2V0dGluZ3MoYXNzZXQpLnZhbHVlID0gdmFsdWUKICAgIGRpZyAxCiAgICBpdG9iCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjcyNQogICAgLy8gdXBkYXRlU2V0dGluZ3MocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBhc3NldDogdWludDY0LCB2YWx1ZTogdWludDY0KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgp1cGRhdGVTZXR0aW5nc190ZXJuYXJ5X2ZhbHNlQDI1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3NDAKICAgIC8vIHBheW1lbnQuYW1vdW50ID09PSAodGhpcy5zZXR0aW5ncyhhc3NldCkuZXhpc3RzID8gMCA6IHRoaXMubWJyKCkuc2V0dGluZ3MpLAogICAgcHVzaGludCA5MzAwCiAgICBiIHVwZGF0ZVNldHRpbmdzX3Rlcm5hcnlfbWVyZ2VAMjYKCnVwZGF0ZVNldHRpbmdzX3Rlcm5hcnlfZmFsc2VAMTg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjczNAogICAgLy8gY29uc3QgY3VycmVudDogdWludDY0ID0gdGhpcy5zZXR0aW5ncyhhc3NldCkuZXhpc3RzID8gdGhpcy5zZXR0aW5ncyhhc3NldCkudmFsdWUgOiBPTkVfWUVBUgogICAgaW50YyA2IC8vIDMxNTM2MDAwCiAgICBiIHVwZGF0ZVNldHRpbmdzX3Rlcm5hcnlfbWVyZ2VAMTkKCnVwZGF0ZVNldHRpbmdzX2Jvb2xfZmFsc2VAMTM6CiAgICBpbnRjXzAgLy8gMAogICAgYiB1cGRhdGVTZXR0aW5nc19ib29sX21lcmdlQDE0Cgp1cGRhdGVTZXR0aW5nc19lbHNlX2JvZHlANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NzMwCiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gQXNzZXQoYXNzZXQpLmNyZWF0b3IsIGVyck5vdEFzc2V0Q3JlYXRvcikKICAgIHR4biBTZW5kZXIKICAgIGRpZyAyCiAgICBhc3NldF9wYXJhbXNfZ2V0IEFzc2V0Q3JlYXRvcgogICAgYXNzZXJ0IC8vIGFzc2V0IGV4aXN0cwogICAgPT0KICAgIGJueiB1cGRhdGVTZXR0aW5nc19hZnRlcl9pZl9lbHNlQDEwCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJOYWNyIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5hY3IKCnVwZGF0ZVNldHRpbmdzX2FmdGVyX2lmX2Vsc2VAMzE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjcyNgogICAgLy8gY29uc3QgeyBha3RhLCBib25lcyB9ID0gdGhpcy5nb3Zlcm5hbmNlQXNzZXRzKCkKICAgIGIgdXBkYXRlU2V0dGluZ3NfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmdvdmVybmFuY2VBc3NldHNAMzIKCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLnNldEhlYXJ0YmVhdE1hbmFnZXJbcm91dGluZ10oKSAtPiB2b2lkOgpzZXRIZWFydGJlYXRNYW5hZ2VyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3NDgKICAgIC8vIHNldEhlYXJ0YmVhdE1hbmFnZXIobWFuYWdlcjogQWNjb3VudCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjc0OQogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWMgNiAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyAxOSAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3NDkKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IHNldEhlYXJ0YmVhdE1hbmFnZXJfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDIwIC8vICJFUlI6ZXJyTmRhbyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOZGFvCgpzZXRIZWFydGJlYXRNYW5hZ2VyX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDAKICAgIC8vIGhlYXJ0YmVhdE1hbmFnZXJBZGRyZXNzID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IFN0YWtpbmdHbG9iYWxTdGF0ZUtleUhlYXJ0YmVhdE1hbmFnZXJBZGRyZXNzIH0pCiAgICBieXRlYyAzNSAvLyAiaGVhcnRiZWF0X21hbmFnZXJfYWRkcmVzcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NzUwCiAgICAvLyB0aGlzLmhlYXJ0YmVhdE1hbmFnZXJBZGRyZXNzLnZhbHVlID0gbWFuYWdlcgogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NzQ4CiAgICAvLyBzZXRIZWFydGJlYXRNYW5hZ2VyKG1hbmFnZXI6IEFjY291bnQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmNsb3NlU29mdFN0YWtlW3JvdXRpbmddKCkgLT4gdm9pZDoKY2xvc2VTb2Z0U3Rha2U6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjc1NAogICAgLy8gY2xvc2VTb2Z0U3Rha2UoYXNzZXQ6IHVpbnQ2NCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3NTUKICAgIC8vIGNvbnN0IHNrOiBTdGFrZUtleSA9IHsgYWRkcmVzczogVHhuLnNlbmRlciwgYXNzZXQsIHR5cGU6IFNUQUtJTkdfVFlQRV9TT0ZUIH0KICAgIHR4biBTZW5kZXIKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgYnl0ZWMgNSAvLyAweDE0CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTA1CiAgICAvLyBzdGFrZXMgPSBCb3hNYXA8U3Rha2VLZXksIFN0YWtlPih7IGtleVByZWZpeDogU3Rha2luZ0JveFByZWZpeFN0YWtlcyB9KQogICAgYnl0ZWNfMCAvLyAicyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjc1NgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc3Rha2VzKHNrKS5leGlzdHMsIGVyclN0YWtlRG9lc250RXhpc3QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBjbG9zZVNvZnRTdGFrZV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMTMgLy8gIkVSUjplcnJTbmV4IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclNuZXgKCmNsb3NlU29mdFN0YWtlX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3NTcKICAgIC8vIHRoaXMuc3Rha2VzKHNrKS5kZWxldGUoKQogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjc1OQogICAgLy8gaXR4bi5wYXltZW50KHsgcmVjZWl2ZXI6IFR4bi5zZW5kZXIsIGFtb3VudDogU3Rha2VzTUJSIH0pLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICB0eG4gU2VuZGVyCiAgICBpbnRjIDQgLy8gMzIxMDAKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3NTQKICAgIC8vIGNsb3NlU29mdFN0YWtlKGFzc2V0OiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmNsb3NlSGVhcnRiZWF0W3JvdXRpbmddKCkgLT4gdm9pZDoKY2xvc2VIZWFydGJlYXQ6CiAgICBpbnRjXzAgLy8gMAogICAgcHVzaGJ5dGVzICIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjc2MwogICAgLy8gY2xvc2VIZWFydGJlYXQoYXNzZXQ6IHVpbnQ2NCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3NjQKICAgIC8vIGNvbnN0IHNrOiBTdGFrZUtleSA9IHsgYWRkcmVzczogVHhuLnNlbmRlciwgYXNzZXQsIHR5cGU6IFNUQUtJTkdfVFlQRV9IRUFSVEJFQVQgfQogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgaXRvYgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBjb25jYXQKICAgIGJ5dGVjIDggLy8gMHgwYQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwNQogICAgLy8gc3Rha2VzID0gQm94TWFwPFN0YWtlS2V5LCBTdGFrZT4oeyBrZXlQcmVmaXg6IFN0YWtpbmdCb3hQcmVmaXhTdGFrZXMgfSkKICAgIGJ5dGVjXzAgLy8gInMiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3NjUKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnN0YWtlcyhzaykuZXhpc3RzLCBlcnJTdGFrZURvZXNudEV4aXN0KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogY2xvc2VIZWFydGJlYXRfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDEzIC8vICJFUlI6ZXJyU25leCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJTbmV4CgpjbG9zZUhlYXJ0YmVhdF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NzY2CiAgICAvLyB0aGlzLnN0YWtlcyhzaykuZGVsZXRlKCkKICAgIGJveF9kZWwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3NjgKICAgIC8vIGxldCByZWZ1bmQ6IHVpbnQ2NCA9IFN0YWtlc01CUgogICAgaW50YyA0IC8vIDMyMTAwCiAgICBidXJ5IDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NzY5CiAgICAvLyBjb25zdCBoYms6IEhlYXJ0YmVhdEtleSA9IHsgYWRkcmVzczogVHhuLnNlbmRlciwgYXNzZXQgfQogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExMi0xMTQKICAgIC8vIGhlYXJ0YmVhdHMgPSBCb3hNYXA8SGVhcnRiZWF0S2V5LCBhcmM0LlN0YXRpY0FycmF5PGFyYzRIZWFydGJlYXQsIDQ+Pih7CiAgICAvLyAgIGtleVByZWZpeDogU3Rha2luZ0JveFByZWZpeEhlYXJ0YmVhdHMsCiAgICAvLyB9KQogICAgYnl0ZWMgOSAvLyAiaCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBidXJ5IDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NzcwCiAgICAvLyBpZiAodGhpcy5oZWFydGJlYXRzKGhiaykuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGNsb3NlSGVhcnRiZWF0X2FmdGVyX2lmX2Vsc2VANQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3NzEKICAgIC8vIHRoaXMuaGVhcnRiZWF0cyhoYmspLmRlbGV0ZSgpCiAgICBkaWcgMQogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjc3MgogICAgLy8gcmVmdW5kICs9IEhlYXJ0YmVhdHNNQlIKICAgIGludGMgNSAvLyAxMDIyMDAKICAgIGJ1cnkgMQoKY2xvc2VIZWFydGJlYXRfYWZ0ZXJfaWZfZWxzZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3NzUKICAgIC8vIGl0eG4ucGF5bWVudCh7IHJlY2VpdmVyOiBUeG4uc2VuZGVyLCBhbW91bnQ6IHJlZnVuZCB9KS5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgdHhuIFNlbmRlcgogICAgZGlnIDEKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3NjMKICAgIC8vIGNsb3NlSGVhcnRiZWF0KGFzc2V0OiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLnJlbGVhc2VBcHBTdGFrZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnJlbGVhc2VBcHBTdGFrZToKICAgIHB1c2hieXRlcyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3ODIKICAgIC8vIHJlbGVhc2VBcHBTdGFrZShhcHA6IHVpbnQ2NCwgYWRkcmVzczogQWNjb3VudCwgYXNzZXQ6IHVpbnQ2NCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3ODMKICAgIC8vIGNvbnN0IGtleTogQXBwU3Rha2VLZXkgPSB7IGFwcCwgYWRkcmVzcywgYXNzZXQgfQogICAgdW5jb3ZlciAyCiAgICBpdG9iCiAgICB1bmNvdmVyIDIKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwOQogICAgLy8gYXBwU3Rha2VzID0gQm94TWFwPEFwcFN0YWtlS2V5LCBBcHBTdGFrZT4oeyBrZXlQcmVmaXg6IFN0YWtpbmdCb3hQcmVmaXhBcHBTdGFrZXMgfSkKICAgIGJ5dGVjIDE2IC8vICJhIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6Nzg0CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5hcHBTdGFrZXMoa2V5KS5leGlzdHMsIGVyclN0YWtlRG9lc250RXhpc3QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiByZWxlYXNlQXBwU3Rha2VfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDEzIC8vICJFUlI6ZXJyU25leCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJTbmV4CgpyZWxlYXNlQXBwU3Rha2VfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjc4NgogICAgLy8gY29uc3QgWywgYXBwRXhpc3RzXSA9IG9wLkFwcFBhcmFtcy5hcHBDcmVhdG9yKGFwcCkKICAgIHVuY292ZXIgMgogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBDcmVhdG9yCiAgICBidXJ5IDUKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3ODgKICAgIC8vIEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbklkID09PSBhcHAgfHwgKCFhcHBFeGlzdHMgJiYgVHhuLnNlbmRlciA9PT0gYWRkcmVzcyksCiAgICBnbG9iYWwgQ2FsbGVyQXBwbGljYXRpb25JRAogICAgPT0KICAgIGJueiByZWxlYXNlQXBwU3Rha2VfYm9vbF90cnVlQDYKICAgIGRpZyAyCiAgICBibnogcmVsZWFzZUFwcFN0YWtlX2Jvb2xfZmFsc2VANwogICAgdHhuIFNlbmRlcgogICAgZGlnIDIKICAgID09CiAgICBieiByZWxlYXNlQXBwU3Rha2VfYm9vbF9mYWxzZUA3CgpyZWxlYXNlQXBwU3Rha2VfYm9vbF90cnVlQDY6CiAgICBpbnRjXzEgLy8gMQoKcmVsZWFzZUFwcFN0YWtlX2Jvb2xfbWVyZ2VAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6Nzg3LTc5MAogICAgLy8gbG9nZ2VkQXNzZXJ0KAogICAgLy8gICBHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25JZCA9PT0gYXBwIHx8ICghYXBwRXhpc3RzICYmIFR4bi5zZW5kZXIgPT09IGFkZHJlc3MpLAogICAgLy8gICBlcnJBcHBTdGFrZUluVXNlCiAgICAvLyApCiAgICBibnogcmVsZWFzZUFwcFN0YWtlX2FmdGVyX2Fzc2VydEAxMAogICAgcHVzaGJ5dGVzICJFUlI6ZXJyQXNpdSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJBc2l1CgpyZWxlYXNlQXBwU3Rha2VfYWZ0ZXJfYXNzZXJ0QDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3OTIKICAgIC8vIHRoaXMuYXBwU3Rha2VzKGtleSkuZGVsZXRlKCkKICAgIGJveF9kZWwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo3OTMKICAgIC8vIGl0eG4ucGF5bWVudCh7IHJlY2VpdmVyOiBhZGRyZXNzLCBhbW91bnQ6IEFwcFN0YWtlc01CUiB9KS5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgaW50YyA3IC8vIDM0OTAwCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6NzgyCiAgICAvLyByZWxlYXNlQXBwU3Rha2UoYXBwOiB1aW50NjQsIGFkZHJlc3M6IEFjY291bnQsIGFzc2V0OiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCnJlbGVhc2VBcHBTdGFrZV9ib29sX2ZhbHNlQDc6CiAgICBpbnRjXzAgLy8gMAogICAgYiByZWxlYXNlQXBwU3Rha2VfYm9vbF9tZXJnZUA4CgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5vcHRJbkNvc3Rbcm91dGluZ10oKSAtPiB2b2lkOgpvcHRJbkNvc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjgwMAogICAgLy8gcmV0dXJuIHRvdGFsc01CUiArIEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgcHVzaGludCAxNTcwMAogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjc5OAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBpdG9iCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5zdGFrZUNvc3Rbcm91dGluZ10oKSAtPiB2b2lkOgpzdGFrZUNvc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjgwMwogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18xIC8vIDEKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODA2CiAgICAvLyBjb25zdCBzazogU3Rha2VLZXkgPSB7IGFkZHJlc3M6IFR4bi5zZW5kZXIsIGFzc2V0LCB0eXBlIH0KICAgIHR4biBTZW5kZXIKICAgIHVuY292ZXIgMgogICAgaXRvYgogICAgY29uY2F0CiAgICBkaWcgMQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwNQogICAgLy8gc3Rha2VzID0gQm94TWFwPFN0YWtlS2V5LCBTdGFrZT4oeyBrZXlQcmVmaXg6IFN0YWtpbmdCb3hQcmVmaXhTdGFrZXMgfSkKICAgIGJ5dGVjXzAgLy8gInMiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODA3CiAgICAvLyBjb25zdCBpc1VwZGF0ZSA9IHRoaXMuc3Rha2VzKHNrKS5leGlzdHMKICAgIGJveF9sZW4KICAgIGNvdmVyIDIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4MDkKICAgIC8vIGlmICh0eXBlID09PSBTVEFLSU5HX1RZUEVfSEVBUlRCRUFUKSB7CiAgICBieXRlYyA4IC8vIDB4MGEKICAgID09CiAgICBieiBzdGFrZUNvc3RfYWZ0ZXJfaWZfZWxzZUA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjgxMAogICAgLy8gcmV0dXJuIGlzVXBkYXRlID8gMCA6IHN0YWtlcyArIGhlYXJ0YmVhdHMKICAgIGJ6IHN0YWtlQ29zdF90ZXJuYXJ5X2ZhbHNlQDQKICAgIGludGNfMCAvLyAwCgpzdGFrZUNvc3RfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLnN0YWtlQ29zdEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4MDMKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgaXRvYgogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKc3Rha2VDb3N0X3Rlcm5hcnlfZmFsc2VANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODEwCiAgICAvLyByZXR1cm4gaXNVcGRhdGUgPyAwIDogc3Rha2VzICsgaGVhcnRiZWF0cwogICAgaW50YyA1IC8vIDEwMjIwMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4MDMKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYiBzdGFrZUNvc3RfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLnN0YWtlQ29zdEA3CgpzdGFrZUNvc3RfYWZ0ZXJfaWZfZWxzZUA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4MDUKICAgIC8vIGNvbnN0IHsgc3Rha2VzLCBoZWFydGJlYXRzIH0gPSB0aGlzLm1icigpCiAgICBpbnRjIDQgLy8gMzIxMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODEzCiAgICAvLyByZXR1cm4gaXNVcGRhdGUgPyAwIDogc3Rha2VzCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODAzCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGIgc3Rha2VDb3N0X2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5zdGFrZUNvc3RANwoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuYXBwU3Rha2VDb3N0W3JvdXRpbmddKCkgLT4gdm9pZDoKYXBwU3Rha2VDb3N0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4MTYKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjgxOAogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbklkICE9PSAwLCBlcnJBcHBDYWxsUmVxdWlyZWQpCiAgICBnbG9iYWwgQ2FsbGVyQXBwbGljYXRpb25JRAogICAgYm56IGFwcFN0YWtlQ29zdF9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMzYgLy8gIkVSUjplcnJBY3JxIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckFjcnEKCmFwcFN0YWtlQ29zdF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODE5CiAgICAvLyBjb25zdCBrZXk6IEFwcFN0YWtlS2V5ID0geyBhcHA6IEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbklkLCBhZGRyZXNzLCBhc3NldCB9CiAgICBnbG9iYWwgQ2FsbGVyQXBwbGljYXRpb25JRAogICAgaXRvYgogICAgdW5jb3ZlciAyCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDkKICAgIC8vIGFwcFN0YWtlcyA9IEJveE1hcDxBcHBTdGFrZUtleSwgQXBwU3Rha2U+KHsga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4QXBwU3Rha2VzIH0pCiAgICBieXRlYyAxNiAvLyAiYSIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4MjAKICAgIC8vIHJldHVybiB0aGlzLmFwcFN0YWtlcyhrZXkpLmV4aXN0cyA/IDAgOiB0aGlzLm1icigpLmFwcFN0YWtlcwogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBhcHBTdGFrZUNvc3RfdGVybmFyeV9mYWxzZUA1CiAgICBpbnRjXzAgLy8gMAoKYXBwU3Rha2VDb3N0X3Rlcm5hcnlfbWVyZ2VANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODE2CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGl0b2IKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmFwcFN0YWtlQ29zdF90ZXJuYXJ5X2ZhbHNlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjgyMAogICAgLy8gcmV0dXJuIHRoaXMuYXBwU3Rha2VzKGtleSkuZXhpc3RzID8gMCA6IHRoaXMubWJyKCkuYXBwU3Rha2VzCiAgICBpbnRjIDcgLy8gMzQ5MDAKICAgIGIgYXBwU3Rha2VDb3N0X3Rlcm5hcnlfbWVyZ2VANgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuZ2V0VGltZUxlZnRbcm91dGluZ10oKSAtPiB2b2lkOgpnZXRUaW1lTGVmdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODIzCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4MjUKICAgIC8vIGNvbnN0IHNrID0geyBhZGRyZXNzLCBhc3NldCwgdHlwZTogU1RBS0lOR19UWVBFX0xPQ0sgfQogICAgaXRvYgogICAgY29uY2F0CiAgICBieXRlY18yIC8vIDB4MjgKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4MjYKICAgIC8vIGlmICghdGhpcy5zdGFrZXMoc2spLmV4aXN0cyB8fCBHbG9iYWwubGF0ZXN0VGltZXN0YW1wID49IHRoaXMuc3Rha2VzKHNrKS52YWx1ZS5leHBpcmF0aW9uKSB7CiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgZGlnIDEKICAgIGV4dHJhY3QgMzIgOAogICAgdW5jb3ZlciAyCiAgICBleHRyYWN0IDQwIDEKICAgIGNvdmVyIDIKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwNQogICAgLy8gc3Rha2VzID0gQm94TWFwPFN0YWtlS2V5LCBTdGFrZT4oeyBrZXlQcmVmaXg6IFN0YWtpbmdCb3hQcmVmaXhTdGFrZXMgfSkKICAgIGJ5dGVjXzAgLy8gInMiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4MjYKICAgIC8vIGlmICghdGhpcy5zdGFrZXMoc2spLmV4aXN0cyB8fCBHbG9iYWwubGF0ZXN0VGltZXN0YW1wID49IHRoaXMuc3Rha2VzKHNrKS52YWx1ZS5leHBpcmF0aW9uKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGdldFRpbWVMZWZ0X2lmX2JvZHlAMwogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgZGlnIDEKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgPj0KICAgIGJ6IGdldFRpbWVMZWZ0X2FmdGVyX2lmX2Vsc2VANAoKZ2V0VGltZUxlZnRfaWZfYm9keUAzOgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjgyNwogICAgLy8gcmV0dXJuIDAKICAgIGludGNfMCAvLyAwCgpnZXRUaW1lTGVmdF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuZ2V0VGltZUxlZnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODIzCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGl0b2IKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmdldFRpbWVMZWZ0X2FmdGVyX2lmX2Vsc2VANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODMwCiAgICAvLyByZXR1cm4gdGhpcy5zdGFrZXMoc2spLnZhbHVlLmV4cGlyYXRpb24gLSBHbG9iYWwubGF0ZXN0VGltZXN0YW1wCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODIzCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGIgZ2V0VGltZUxlZnRfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmdldFRpbWVMZWZ0QDUKCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLm11c3RHZXRUaW1lTGVmdFtyb3V0aW5nXSgpIC0+IHZvaWQ6Cm11c3RHZXRUaW1lTGVmdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODMzCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4MzUKICAgIC8vIGNvbnN0IHNrID0geyBhZGRyZXNzLCBhc3NldCwgdHlwZTogU1RBS0lOR19UWVBFX0xPQ0sgfQogICAgaXRvYgogICAgY29uY2F0CiAgICBieXRlY18yIC8vIDB4MjgKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4MzYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnN0YWtlcyhzaykuZXhpc3RzLCBlcnJOb0xvY2spCiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgZGlnIDEKICAgIGV4dHJhY3QgMzIgOAogICAgdW5jb3ZlciAyCiAgICBleHRyYWN0IDQwIDEKICAgIGNvdmVyIDIKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwNQogICAgLy8gc3Rha2VzID0gQm94TWFwPFN0YWtlS2V5LCBTdGFrZT4oeyBrZXlQcmVmaXg6IFN0YWtpbmdCb3hQcmVmaXhTdGFrZXMgfSkKICAgIGJ5dGVjXzAgLy8gInMiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4MzYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnN0YWtlcyhzaykuZXhpc3RzLCBlcnJOb0xvY2spCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBtdXN0R2V0VGltZUxlZnRfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDIzIC8vICJFUlI6ZXJyTmxjayIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJObGNrCgptdXN0R2V0VGltZUxlZnRfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjgzNwogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPCB0aGlzLnN0YWtlcyhzaykudmFsdWUuZXhwaXJhdGlvbiwgZXJyTG9ja2VkKQogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgZGlnIDEKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgPAogICAgYm56IG11c3RHZXRUaW1lTGVmdF9hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgMzQgLy8gIkVSUjplcnJMb2NrIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckxvY2sKCm11c3RHZXRUaW1lTGVmdF9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODM4CiAgICAvLyByZXR1cm4gdGhpcy5zdGFrZXMoc2spLnZhbHVlLmV4cGlyYXRpb24gLSBHbG9iYWwubGF0ZXN0VGltZXN0YW1wCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODMzCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGl0b2IKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmdldEluZm9bcm91dGluZ10oKSAtPiB2b2lkOgpnZXRJbmZvOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4NDEKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA5CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvc3Rha2luZy90eXBlcy50czo6U3Rha2VJbmZvCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjg0MwogICAgLy8gcmV0dXJuIHRoaXMuZ2V0SW5mb09yRW1wdHkoYWRkcmVzcywgc3Rha2UpCiAgICBjYWxsc3ViIGdldEluZm9PckVtcHR5CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODQxCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLm11c3RHZXRJbmZvW3JvdXRpbmddKCkgLT4gdm9pZDoKbXVzdEdldEluZm86CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjg0NgogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXBuIDIKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDkKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL3R5cGVzLnRzOjpTdGFrZUluZm8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODQ4CiAgICAvLyBjb25zdCBzayA9IHsgYWRkcmVzcywgLi4uc3Rha2UgfQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgY292ZXIgMgogICAgY292ZXIgMwogICAgZXh0cmFjdCA4IDEKICAgIGR1cAogICAgY292ZXIgMgogICAgY292ZXIgMwogICAgaXRvYgogICAgc3dhcAogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODQ5CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zdGFrZXMoc2spLmV4aXN0cywgZXJyTm9Mb2NrKQogICAgZHVwCiAgICBleHRyYWN0IDkgMzIKICAgIGRpZyAxCiAgICBleHRyYWN0IDAgOAogICAgdW5jb3ZlciAyCiAgICBleHRyYWN0IDggMQogICAgY292ZXIgMgogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTA1CiAgICAvLyBzdGFrZXMgPSBCb3hNYXA8U3Rha2VLZXksIFN0YWtlPih7IGtleVByZWZpeDogU3Rha2luZ0JveFByZWZpeFN0YWtlcyB9KQogICAgYnl0ZWNfMCAvLyAicyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjg0OQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc3Rha2VzKHNrKS5leGlzdHMsIGVyck5vTG9jaykKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IG11c3RHZXRJbmZvX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAyMyAvLyAiRVJSOmVyck5sY2siCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmxjawoKbXVzdEdldEluZm9fYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjg1MQogICAgLy8gcmV0dXJuIHRoaXMuY2xhbXBTb2Z0KGFkZHJlc3MsIHN0YWtlLmFzc2V0LCBzdGFrZS50eXBlLCB0aGlzLnN0YWtlcyhzaykudmFsdWUpCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgY2FsbHN1YiBjbGFtcFNvZnQKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4NDYKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuZ2V0V2VpZ2h0ZWRTdGFrZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmdldFdlaWdodGVkU3Rha2U6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjg1NAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODU2CiAgICAvLyByZXR1cm4gdGhpcy5nZXRXZWlnaHRlZFN0YWtlRm9yQXBwKGFkZHJlc3MsIGFzc2V0LCAwLCB0cnVlKQogICAgaW50Y18wIC8vIDAKICAgIGludGNfMSAvLyAxCiAgICBjYWxsc3ViIGdldFdlaWdodGVkU3Rha2VGb3JBcHAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODU0CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLnNvZnRDaGVja1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnNvZnRDaGVjazoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODU5CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cG4gMgogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjg2MQogICAgLy8gY29uc3Qgc2sgPSB7IGFkZHJlc3MsIGFzc2V0LCB0eXBlOiBTVEFLSU5HX1RZUEVfU09GVCB9CiAgICBpdG9iCiAgICBjb25jYXQKICAgIGJ5dGVjIDUgLy8gMHgxNAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjg2MgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc3Rha2VzKHNrKS5leGlzdHMsIGVyclN0YWtlRG9lc250RXhpc3QpCiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgZGlnIDEKICAgIGV4dHJhY3QgMzIgOAogICAgdW5jb3ZlciAyCiAgICBleHRyYWN0IDQwIDEKICAgIGNvdmVyIDIKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwNQogICAgLy8gc3Rha2VzID0gQm94TWFwPFN0YWtlS2V5LCBTdGFrZT4oeyBrZXlQcmVmaXg6IFN0YWtpbmdCb3hQcmVmaXhTdGFrZXMgfSkKICAgIGJ5dGVjXzAgLy8gInMiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4NjIKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnN0YWtlcyhzaykuZXhpc3RzLCBlcnJTdGFrZURvZXNudEV4aXN0KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogc29mdENoZWNrX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAxMyAvLyAiRVJSOmVyclNuZXgiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyU25leAoKc29mdENoZWNrX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo4NjQKICAgIC8vIGNvbnN0IHsgYW1vdW50IH0gPSB0aGlzLnN0YWtlcyhzaykudmFsdWUKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODY1CiAgICAvLyBpZiAoYXNzZXQgPT09IDApIHsKICAgIGRpZyAyCiAgICBibnogc29mdENoZWNrX2FmdGVyX2lmX2Vsc2VANQogICAgdW5jb3ZlciAyCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODY2CiAgICAvLyBjb25zdCB2YWxpZCA9IGFkZHJlc3MuYmFsYW5jZSA+PSBhbW91bnQKICAgIHN3YXAKICAgIGR1cAogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RCYWxhbmNlCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIHVuY292ZXIgMgogICAgPj0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODY3CiAgICAvLyByZXR1cm4geyB2YWxpZCwgYmFsYW5jZTogYWRkcmVzcy5iYWxhbmNlIH0KICAgIHN3YXAKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0QmFsYW5jZQogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICBieXRlYyAxMSAvLyAweDAwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAzCiAgICBzZXRiaXQKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAoKc29mdENoZWNrX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5zb2Z0Q2hlY2tAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODU5CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCnNvZnRDaGVja19hZnRlcl9pZl9lbHNlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjg3MAogICAgLy8gY29uc3QgW2hvbGRpbmdBbW91bnQsIG9wdGVkSW5dID0gQXNzZXRIb2xkaW5nLmFzc2V0QmFsYW5jZShhZGRyZXNzLCBhc3NldCkKICAgIHN3YXAKICAgIHVuY292ZXIgMgogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjg3MgogICAgLy8gaWYgKCFvcHRlZEluKSB7CiAgICBibnogc29mdENoZWNrX2FmdGVyX2lmX2Vsc2VANwogICAgcG9wbiAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjg3MwogICAgLy8gcmV0dXJuIHsgdmFsaWQ6IGZhbHNlLCBiYWxhbmNlOiAwIH0KICAgIGJ5dGVjIDM4IC8vIDB4MDAwMDAwMDAwMDAwMDAwMDAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjg1OQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBiIHNvZnRDaGVja19hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuc29mdENoZWNrQDgKCnNvZnRDaGVja19hZnRlcl9pZl9lbHNlQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjg3NgogICAgLy8gY29uc3QgdmFsaWQgPSBob2xkaW5nQW1vdW50ID49IGFtb3VudAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgID49CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjg3OAogICAgLy8gcmV0dXJuIHsgdmFsaWQsIGJhbGFuY2U6IGhvbGRpbmdBbW91bnQgfQogICAgYnl0ZWMgMTEgLy8gMHgwMAogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMgogICAgc2V0Yml0CiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODU5CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGIgc29mdENoZWNrX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5zb2Z0Q2hlY2tAOAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuZ2V0QXBwV2VpZ2h0ZWRTdGFrZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmdldEFwcFdlaWdodGVkU3Rha2U6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjg4MQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5ib29sCiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Yml0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjg4OAogICAgLy8gcmV0dXJuIHRoaXMuZ2V0V2VpZ2h0ZWRTdGFrZUZvckFwcChhZGRyZXNzLCBhc3NldCwgYXBwLCBhY2NlcHRJbmhlcml0ZWQpCiAgICBjb3ZlciAyCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMwogICAgY2FsbHN1YiBnZXRXZWlnaHRlZFN0YWtlRm9yQXBwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjg4MQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5nZXRJbmZvQXRMZWFzdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmdldEluZm9BdExlYXN0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo5NTMKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXBuIDIKICAgIGxlbgogICAgcHVzaGludCA5CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvc3Rha2luZy90eXBlcy50czo6U3Rha2VJbmZvCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjk1NQogICAgLy8gY29uc3QgcmVzdWx0czogU3Rha2VbXSA9IFtdCiAgICBieXRlYyAxNyAvLyAweDAwMDAKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OTU3CiAgICAvLyBpZiAoc3Rha2UudHlwZSA9PT0gU1RBS0lOR19UWVBFX1NPRlQpIHsKICAgIGV4dHJhY3QgOCAxCiAgICBkdXAKICAgIGJ5dGVjIDUgLy8gMHgxNAogICAgPT0KICAgIGR1cAogICAgYnogZ2V0SW5mb0F0TGVhc3RfYWZ0ZXJfaWZfZWxzZUAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjk1OAogICAgLy8gcmVzdWx0cy5wdXNoKHRoaXMuZ2V0SW5mb09yRW1wdHkoYWRkcmVzcywgeyBhc3NldDogc3Rha2UuYXNzZXQsIHR5cGU6IFNUQUtJTkdfVFlQRV9TT0ZUIH0pKQogICAgZGlnIDMKICAgIGV4dHJhY3QgMCA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjk1NwogICAgLy8gaWYgKHN0YWtlLnR5cGUgPT09IFNUQUtJTkdfVFlQRV9TT0ZUKSB7CiAgICBieXRlYyA1IC8vIDB4MTQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OTU4CiAgICAvLyByZXN1bHRzLnB1c2godGhpcy5nZXRJbmZvT3JFbXB0eShhZGRyZXNzLCB7IGFzc2V0OiBzdGFrZS5hc3NldCwgdHlwZTogU1RBS0lOR19UWVBFX1NPRlQgfSkpCiAgICBjb25jYXQKICAgIGRpZyA1CiAgICBzd2FwCiAgICBjYWxsc3ViIGdldEluZm9PckVtcHR5CiAgICBwb3AKICAgIHB1c2hieXRlcyAweDAwMDEKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYnVyeSAzCgpnZXRJbmZvQXRMZWFzdF9hZnRlcl9pZl9lbHNlQDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjk2MQogICAgLy8gaWYgKHN0YWtlLnR5cGUgPT09IFNUQUtJTkdfVFlQRV9TT0ZUIHx8IHN0YWtlLnR5cGUgPT09IFNUQUtJTkdfVFlQRV9IQVJEKSB7CiAgICBkdXAKICAgIGJueiBnZXRJbmZvQXRMZWFzdF9pZl9ib2R5QDUKICAgIGRpZyAxCiAgICBieXRlYyA0IC8vIDB4MWUKICAgID09CiAgICBieiBnZXRJbmZvQXRMZWFzdF9hZnRlcl9pZl9lbHNlQDYKCmdldEluZm9BdExlYXN0X2lmX2JvZHlANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OTYyCiAgICAvLyByZXN1bHRzLnB1c2godGhpcy5nZXRJbmZvT3JFbXB0eShhZGRyZXNzLCB7IGFzc2V0OiBzdGFrZS5hc3NldCwgdHlwZTogU1RBS0lOR19UWVBFX0hBUkQgfSkpCiAgICBkaWcgMwogICAgZXh0cmFjdCAwIDgKICAgIGJ5dGVjIDQgLy8gMHgxZQogICAgY29uY2F0CiAgICBkaWcgNQogICAgc3dhcAogICAgY2FsbHN1YiBnZXRJbmZvT3JFbXB0eQogICAgcG9wCiAgICBkaWcgMwogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OTYyCiAgICAvLyByZXN1bHRzLnB1c2godGhpcy5nZXRJbmZvT3JFbXB0eShhZGRyZXNzLCB7IGFzc2V0OiBzdGFrZS5hc3NldCwgdHlwZTogU1RBS0lOR19UWVBFX0hBUkQgfSkpCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgaXRvYgogICAgZXh0cmFjdCA2IDAKICAgIHJlcGxhY2UyIDAKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYnVyeSAzCgpnZXRJbmZvQXRMZWFzdF9hZnRlcl9pZl9lbHNlQDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjk2Ni05NjcKICAgIC8vIHN0YWtlLnR5cGUgPT09IFNUQUtJTkdfVFlQRV9TT0ZUIHx8CiAgICAvLyBzdGFrZS50eXBlID09PSBTVEFLSU5HX1RZUEVfSEFSRCB8fAogICAgYm56IGdldEluZm9BdExlYXN0X2lmX2JvZHlAOQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo5NjcKICAgIC8vIHN0YWtlLnR5cGUgPT09IFNUQUtJTkdfVFlQRV9IQVJEIHx8CiAgICBkdXAKICAgIGJ5dGVjIDQgLy8gMHgxZQogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OTY2LTk2NwogICAgLy8gc3Rha2UudHlwZSA9PT0gU1RBS0lOR19UWVBFX1NPRlQgfHwKICAgIC8vIHN0YWtlLnR5cGUgPT09IFNUQUtJTkdfVFlQRV9IQVJEIHx8CiAgICBibnogZ2V0SW5mb0F0TGVhc3RfaWZfYm9keUA5CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjk2OAogICAgLy8gc3Rha2UudHlwZSA9PT0gU1RBS0lOR19UWVBFX0xPQ0sKICAgIGR1cAogICAgYnl0ZWNfMiAvLyAweDI4CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo5NjYtOTY4CiAgICAvLyBzdGFrZS50eXBlID09PSBTVEFLSU5HX1RZUEVfU09GVCB8fAogICAgLy8gc3Rha2UudHlwZSA9PT0gU1RBS0lOR19UWVBFX0hBUkQgfHwKICAgIC8vIHN0YWtlLnR5cGUgPT09IFNUQUtJTkdfVFlQRV9MT0NLCiAgICBieiBnZXRJbmZvQXRMZWFzdF9hZnRlcl9pZl9lbHNlQDEwCgpnZXRJbmZvQXRMZWFzdF9pZl9ib2R5QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjk3MAogICAgLy8gcmVzdWx0cy5wdXNoKHRoaXMuZ2V0SW5mb09yRW1wdHkoYWRkcmVzcywgeyBhc3NldDogc3Rha2UuYXNzZXQsIHR5cGU6IFNUQUtJTkdfVFlQRV9MT0NLIH0pKQogICAgZGlnIDIKICAgIGV4dHJhY3QgMCA4CiAgICBieXRlY18yIC8vIDB4MjgKICAgIGNvbmNhdAogICAgZGlnIDQKICAgIHN3YXAKICAgIGNhbGxzdWIgZ2V0SW5mb09yRW1wdHkKICAgIHBvcAogICAgZGlnIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjk3MAogICAgLy8gcmVzdWx0cy5wdXNoKHRoaXMuZ2V0SW5mb09yRW1wdHkoYWRkcmVzcywgeyBhc3NldDogc3Rha2UuYXNzZXQsIHR5cGU6IFNUQUtJTkdfVFlQRV9MT0NLIH0pKQogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGl0b2IKICAgIGV4dHJhY3QgNiAwCiAgICByZXBsYWNlMiAwCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJ1cnkgMgoKZ2V0SW5mb0F0TGVhc3RfYWZ0ZXJfaWZfZWxzZUAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OTUzCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgZGlnIDIKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5nZXRFc2Nyb3dJbmZvW3JvdXRpbmddKCkgLT4gdm9pZDoKZ2V0RXNjcm93SW5mbzoKICAgIGludGNfMCAvLyAwCiAgICBwdXNoYnl0ZXMgIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OTc2CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo5NzgKICAgIC8vIGNvbnN0IHNrID0geyBhZGRyZXNzLCBhc3NldCwgdHlwZTogU1RBS0lOR19UWVBFX0hBUkQgfQogICAgaXRvYgogICAgY29uY2F0CiAgICBkdXAKICAgIGJ5dGVjIDQgLy8gMHgxZQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjk3OQogICAgLy8gY29uc3QgbGsgPSB7IGFkZHJlc3MsIGFzc2V0LCB0eXBlOiBTVEFLSU5HX1RZUEVfTE9DSyB9CiAgICBzd2FwCiAgICBieXRlY18yIC8vIDB4MjgKICAgIGNvbmNhdAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo5ODEKICAgIC8vIGxldCBoYXJkOiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo5ODIKICAgIC8vIGlmICh0aGlzLnN0YWtlcyhzaykuZXhpc3RzKSB7CiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgZGlnIDEKICAgIGV4dHJhY3QgMzIgOAogICAgdW5jb3ZlciAyCiAgICBleHRyYWN0IDQwIDEKICAgIGNvdmVyIDIKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwNQogICAgLy8gc3Rha2VzID0gQm94TWFwPFN0YWtlS2V5LCBTdGFrZT4oeyBrZXlQcmVmaXg6IFN0YWtpbmdCb3hQcmVmaXhTdGFrZXMgfSkKICAgIGJ5dGVjXzAgLy8gInMiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo5ODIKICAgIC8vIGlmICh0aGlzLnN0YWtlcyhzaykuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGdldEVzY3Jvd0luZm9fYWZ0ZXJfaWZfZWxzZUAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjk4MwogICAgLy8gaGFyZCA9IHRoaXMuc3Rha2VzKHNrKS52YWx1ZS5hbW91bnQKICAgIGRpZyAxCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBidXJ5IDMKCmdldEVzY3Jvd0luZm9fYWZ0ZXJfaWZfZWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo5ODYKICAgIC8vIGxldCBsb2NrOiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgYnVyeSA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjk4NwogICAgLy8gaWYgKHRoaXMuc3Rha2VzKGxrKS5leGlzdHMpIHsKICAgIGR1cAogICAgZXh0cmFjdCAwIDMyCiAgICBkaWcgMQogICAgZXh0cmFjdCAzMiA4CiAgICB1bmNvdmVyIDIKICAgIGV4dHJhY3QgNDAgMQogICAgY292ZXIgMgogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTA1CiAgICAvLyBzdGFrZXMgPSBCb3hNYXA8U3Rha2VLZXksIFN0YWtlPih7IGtleVByZWZpeDogU3Rha2luZ0JveFByZWZpeFN0YWtlcyB9KQogICAgYnl0ZWNfMCAvLyAicyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBidXJ5IDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OTg3CiAgICAvLyBpZiAodGhpcy5zdGFrZXMobGspLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBnZXRFc2Nyb3dJbmZvX2FmdGVyX2lmX2Vsc2VANQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo5ODgKICAgIC8vIGxvY2sgPSB0aGlzLnN0YWtlcyhsaykudmFsdWUuYW1vdW50CiAgICBkaWcgMwogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYnVyeSAzCgpnZXRFc2Nyb3dJbmZvX2FmdGVyX2lmX2Vsc2VANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OTkxCiAgICAvLyByZXR1cm4geyBoYXJkLCBsb2NrIH0KICAgIGRpZyAxCiAgICBpdG9iCiAgICBkaWcgMwogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjk3NgogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5nZXRIZWFydGJlYXRbcm91dGluZ10oKSAtPiB2b2lkOgpnZXRIZWFydGJlYXQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjk5NAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OTk2CiAgICAvLyBjb25zdCBoYmsgPSB7IGFkZHJlc3MsIGFzc2V0IH0KICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo5OTcKICAgIC8vIGlmICghdGhpcy5oZWFydGJlYXRzKGhiaykuZXhpc3RzKSB7CiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgc3dhcAogICAgZXh0cmFjdCAzMiA4CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTEyLTExNAogICAgLy8gaGVhcnRiZWF0cyA9IEJveE1hcDxIZWFydGJlYXRLZXksIGFyYzQuU3RhdGljQXJyYXk8YXJjNEhlYXJ0YmVhdCwgND4+KHsKICAgIC8vICAga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4SGVhcnRiZWF0cywKICAgIC8vIH0pCiAgICBieXRlYyA5IC8vICJoIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OTk3CiAgICAvLyBpZiAoIXRoaXMuaGVhcnRiZWF0cyhoYmspLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogZ2V0SGVhcnRiZWF0X2FmdGVyX2lmX2Vsc2VAMwogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjk5OC0xMDAzCiAgICAvLyByZXR1cm4gbmV3IGFyYzQuU3RhdGljQXJyYXk8YXJjNEhlYXJ0YmVhdCwgND4oCiAgICAvLyAgIGVtcHR5SGVhcnRiZWF0KCksCiAgICAvLyAgIGVtcHR5SGVhcnRiZWF0KCksCiAgICAvLyAgIGVtcHR5SGVhcnRiZWF0KCksCiAgICAvLyAgIGVtcHR5SGVhcnRiZWF0KCkKICAgIC8vICkKICAgIGJ5dGVjIDIxIC8vIDB4MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAoKZ2V0SGVhcnRiZWF0X2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5nZXRIZWFydGJlYXRANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OTk0CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmdldEhlYXJ0YmVhdF9hZnRlcl9pZl9lbHNlQDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwMDYKICAgIC8vIHJldHVybiB0aGlzLmhlYXJ0YmVhdHMoaGJrKS52YWx1ZQogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OTk0CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGIgZ2V0SGVhcnRiZWF0X2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5nZXRIZWFydGJlYXRANAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcubXVzdEdldEhlYXJ0YmVhdFtyb3V0aW5nXSgpIC0+IHZvaWQ6Cm11c3RHZXRIZWFydGJlYXQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwMDkKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwMTEKICAgIC8vIGNvbnN0IGhiayA9IHsgYWRkcmVzcywgYXNzZXQgfQogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwMTIKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmhlYXJ0YmVhdHMoaGJrKS5leGlzdHMsIGVyckhlYXJiZWF0Tm90Rm91bmQpCiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgc3dhcAogICAgZXh0cmFjdCAzMiA4CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTEyLTExNAogICAgLy8gaGVhcnRiZWF0cyA9IEJveE1hcDxIZWFydGJlYXRLZXksIGFyYzQuU3RhdGljQXJyYXk8YXJjNEhlYXJ0YmVhdCwgND4+KHsKICAgIC8vICAga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4SGVhcnRiZWF0cywKICAgIC8vIH0pCiAgICBieXRlYyA5IC8vICJoIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTAxMgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuaGVhcnRiZWF0cyhoYmspLmV4aXN0cywgZXJySGVhcmJlYXROb3RGb3VuZCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IG11c3RHZXRIZWFydGJlYXRfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDI0IC8vICJFUlI6ZXJySGJuZiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJIYm5mCgptdXN0R2V0SGVhcnRiZWF0X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDEzCiAgICAvLyByZXR1cm4gdGhpcy5oZWFydGJlYXRzKGhiaykudmFsdWUKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwMDkKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuZ2V0SGVhcnRiZWF0QXZlcmFnZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmdldEhlYXJ0YmVhdEF2ZXJhZ2U6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwMTYKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18xIC8vIDEKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuYm9vbAogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmdldEhlYXJ0YmVhdEF2ZXJhZ2UKICAgIGl0b2IKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLm11c3RHZXRIZWFydGJlYXRBdmVyYWdlW3JvdXRpbmddKCkgLT4gdm9pZDoKbXVzdEdldEhlYXJ0YmVhdEF2ZXJhZ2U6CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDQ2CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmJvb2wKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTA0OAogICAgLy8gY29uc3QgaGJrID0geyBhZGRyZXNzLCBhc3NldCB9CiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTA0OQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuaGVhcnRiZWF0cyhoYmspLmV4aXN0cywgZXJySGVhcmJlYXROb3RGb3VuZCkKICAgIGR1cAogICAgZXh0cmFjdCAwIDMyCiAgICBzd2FwCiAgICBleHRyYWN0IDMyIDgKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMTItMTE0CiAgICAvLyBoZWFydGJlYXRzID0gQm94TWFwPEhlYXJ0YmVhdEtleSwgYXJjNC5TdGF0aWNBcnJheTxhcmM0SGVhcnRiZWF0LCA0Pj4oewogICAgLy8gICBrZXlQcmVmaXg6IFN0YWtpbmdCb3hQcmVmaXhIZWFydGJlYXRzLAogICAgLy8gfSkKICAgIGJ5dGVjIDkgLy8gImgiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDQ5CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5oZWFydGJlYXRzKGhiaykuZXhpc3RzLCBlcnJIZWFyYmVhdE5vdEZvdW5kKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogbXVzdEdldEhlYXJ0YmVhdEF2ZXJhZ2VfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDI0IC8vICJFUlI6ZXJySGJuZiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJIYm5mCgptdXN0R2V0SGVhcnRiZWF0QXZlcmFnZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTA1MQogICAgLy8gY29uc3QgaGVhcnRiZWF0cyA9IGNsb25lKHRoaXMuaGVhcnRiZWF0cyhoYmspLnZhbHVlKQogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTA1MwogICAgLy8gbGV0IHRvdGFsOiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDU0LTEwNTUKICAgIC8vIGxldCBjb3VudDogdWludDY0ID0gMAogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IDQ7IGkgKz0gMSkgewogICAgZHVwbiAyCgptdXN0R2V0SGVhcnRiZWF0QXZlcmFnZV93aGlsZV90b3BANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTA1NQogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IDQ7IGkgKz0gMSkgewogICAgZHVwCiAgICBwdXNoaW50IDQKICAgIDwKICAgIGJ6IG11c3RHZXRIZWFydGJlYXRBdmVyYWdlX2FmdGVyX3doaWxlQDExCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwNTcKICAgIC8vIGlmIChoZWFydGJlYXRzW2ldLnRpbWVzdGFtcC5hc1VpbnQ2NCgpID4gMCkgewogICAgZHVwCiAgICBpbnRjXzMgLy8gMzIKICAgICoKICAgIGRpZyA0CiAgICBzd2FwCiAgICBpbnRjXzMgLy8gMzIKICAgIGV4dHJhY3QzIC8vIG9uIGVycm9yOiBpbmRleCBhY2Nlc3MgaXMgb3V0IG9mIGJvdW5kcwogICAgZHVwCiAgICBidXJ5IDcKICAgIHB1c2hpbnQgMjQKICAgIGV4dHJhY3RfdWludDY0CiAgICBieiBtdXN0R2V0SGVhcnRiZWF0QXZlcmFnZV9hZnRlcl9pZl9lbHNlQDEwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwNTgKICAgIC8vIGNvdW50ICs9IDEKICAgIHN3YXAKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwNTkKICAgIC8vIGlmIChpbmNsdWRlRXNjcm93ZWQpIHsKICAgIGRpZyA0CiAgICBieiBtdXN0R2V0SGVhcnRiZWF0QXZlcmFnZV9lbHNlX2JvZHlAOAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDYwCiAgICAvLyB0b3RhbCArPSBoZWFydGJlYXRzW2ldLmhlbGQuYXNVaW50NjQoKSArIGhlYXJ0YmVhdHNbaV0uaGFyZC5hc1VpbnQ2NCgpICsgaGVhcnRiZWF0c1tpXS5sb2NrLmFzVWludDY0KCkKICAgIGRpZyA1CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZGlnIDEKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgKwogICAgc3dhcAogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgICsKICAgIHVuY292ZXIgMwogICAgKwogICAgY292ZXIgMgoKbXVzdEdldEhlYXJ0YmVhdEF2ZXJhZ2VfYWZ0ZXJfaWZfZWxzZUAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTA1NQogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IDQ7IGkgKz0gMSkgewogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGIgbXVzdEdldEhlYXJ0YmVhdEF2ZXJhZ2Vfd2hpbGVfdG9wQDQKCm11c3RHZXRIZWFydGJlYXRBdmVyYWdlX2Vsc2VfYm9keUA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDYyCiAgICAvLyB0b3RhbCArPSBoZWFydGJlYXRzW2ldLmhlbGQuYXNVaW50NjQoKQogICAgZGlnIDUKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgdW5jb3ZlciAzCiAgICArCiAgICBjb3ZlciAyCiAgICBiIG11c3RHZXRIZWFydGJlYXRBdmVyYWdlX2FmdGVyX2lmX2Vsc2VAMTAKCm11c3RHZXRIZWFydGJlYXRBdmVyYWdlX2FmdGVyX3doaWxlQDExOgogICAgcG9wCiAgICB1bmNvdmVyIDIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDY3CiAgICAvLyBpZiAoY291bnQgPT09IDApIHsKICAgIGR1cAogICAgYm56IG11c3RHZXRIZWFydGJlYXRBdmVyYWdlX2FmdGVyX2lmX2Vsc2VAMTMKICAgIHBvcG4gMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDY4CiAgICAvLyByZXR1cm4gMAogICAgaW50Y18wIC8vIDAKCm11c3RHZXRIZWFydGJlYXRBdmVyYWdlX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5tdXN0R2V0SGVhcnRiZWF0QXZlcmFnZUAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTA0NgogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBpdG9iCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgptdXN0R2V0SGVhcnRiZWF0QXZlcmFnZV9hZnRlcl9pZl9lbHNlQDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDcxCiAgICAvLyByZXR1cm4gdG90YWwgLyBjb3VudAogICAgLwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDQ2CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGIgbXVzdEdldEhlYXJ0YmVhdEF2ZXJhZ2VfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLm11c3RHZXRIZWFydGJlYXRBdmVyYWdlQDE0CgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5nZXRJbmZvTGlzdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmdldEluZm9MaXN0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDc0CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ4CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXBuIDIKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGludGNfMiAvLyA4CiAgICAqCiAgICBwdXNoaW50IDIKICAgICsKICAgIHN3YXAKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PHVpbnQ2ND4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTA3NgogICAgLy8gY29uc3QgcmVzdWx0czogU3Rha2VbXSA9IFtdCiAgICBieXRlYyAxNyAvLyAweDAwMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTA3NwogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGFzc2V0cy5sZW5ndGg7IGkgKz0gMSkgewogICAgaW50Y18wIC8vIDAKCmdldEluZm9MaXN0X3doaWxlX3RvcEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDc3CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgYXNzZXRzLmxlbmd0aDsgaSArPSAxKSB7CiAgICBkdXAKICAgIGRpZyAzCiAgICA8CiAgICBieiBnZXRJbmZvTGlzdF9hZnRlcl93aGlsZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwNzgKICAgIC8vIGNvbnN0IHNrID0geyBhZGRyZXNzLCBhc3NldDogYXNzZXRzW2ldLCB0eXBlIH0KICAgIGRpZyAzCiAgICBleHRyYWN0IDIgMAogICAgZGlnIDEKICAgIGludGNfMiAvLyA4CiAgICAqCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBjb3ZlciAzCiAgICBpdG9iCiAgICBkaWcgNgogICAgc3dhcAogICAgY29uY2F0CiAgICBkaWcgNwogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwNzkKICAgIC8vIGlmICghdGhpcy5zdGFrZXMoc2spLmV4aXN0cykgewogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIGRpZyAxCiAgICBleHRyYWN0IDMyIDgKICAgIHVuY292ZXIgMgogICAgZXh0cmFjdCA0MCAxCiAgICBjb3ZlciAyCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDUKICAgIC8vIHN0YWtlcyA9IEJveE1hcDxTdGFrZUtleSwgU3Rha2U+KHsga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4U3Rha2VzIH0pCiAgICBieXRlY18wIC8vICJzIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTA3OQogICAgLy8gaWYgKCF0aGlzLnN0YWtlcyhzaykuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBnZXRJbmZvTGlzdF9hZnRlcl9pZl9lbHNlQDUKICAgIHBvcAogICAgdW5jb3ZlciAyCiAgICBwb3AKICAgIHN3YXAKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwODgKICAgIC8vIHJlc3VsdHMucHVzaChlbXB0eVN0YWtlKQogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGl0b2IKICAgIGV4dHJhY3QgNiAwCiAgICByZXBsYWNlMiAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwODEtMTA4NgogICAgLy8gY29uc3QgZW1wdHlTdGFrZTogU3Rha2UgPSB7CiAgICAvLyAgIGFtb3VudDogMCwKICAgIC8vICAgbGFzdFVwZGF0ZTogMCwKICAgIC8vICAgZXhwaXJhdGlvbjogMCwKICAgIC8vICAgd2VpZ2h0ZWRBZ2U6IDAsCiAgICAvLyB9CiAgICBieXRlYyAzOSAvLyAweDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAKICAgIGNvbmNhdAogICAgc3dhcAoKZ2V0SW5mb0xpc3RfYmxvY2tANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTA3NwogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGFzc2V0cy5sZW5ndGg7IGkgKz0gMSkgewogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGIgZ2V0SW5mb0xpc3Rfd2hpbGVfdG9wQDIKCmdldEluZm9MaXN0X2FmdGVyX2lmX2Vsc2VANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTA5MgogICAgLy8gcmVzdWx0cy5wdXNoKHRoaXMuY2xhbXBTb2Z0KGFkZHJlc3MsIGFzc2V0c1tpXSwgdHlwZSwgdGhpcy5zdGFrZXMoc2spLnZhbHVlKSkKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBkaWcgNgogICAgdW5jb3ZlciA0CiAgICBkaWcgOAogICAgdW5jb3ZlciAzCiAgICBjYWxsc3ViIGNsYW1wU29mdAogICAgcG9wCiAgICB1bmNvdmVyIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwOTIKICAgIC8vIHJlc3VsdHMucHVzaCh0aGlzLmNsYW1wU29mdChhZGRyZXNzLCBhc3NldHNbaV0sIHR5cGUsIHRoaXMuc3Rha2VzKHNrKS52YWx1ZSkpCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgaXRvYgogICAgZXh0cmFjdCA2IDAKICAgIHJlcGxhY2UyIDAKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc3dhcAogICAgYiBnZXRJbmZvTGlzdF9ibG9ja0A2CgpnZXRJbmZvTGlzdF9hZnRlcl93aGlsZUA3OgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwNzQKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcubXVzdEdldEluZm9MaXN0W3JvdXRpbmddKCkgLT4gdm9pZDoKbXVzdEdldEluZm9MaXN0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDk3CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ4CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXBuIDIKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGludGNfMiAvLyA4CiAgICAqCiAgICBwdXNoaW50IDIKICAgICsKICAgIHN3YXAKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PHVpbnQ2ND4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTA5OQogICAgLy8gY29uc3QgcmVzdWx0czogU3Rha2VbXSA9IFtdCiAgICBieXRlYyAxNyAvLyAweDAwMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTEwMAogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGFzc2V0cy5sZW5ndGg7IGkgKz0gMSkgewogICAgaW50Y18wIC8vIDAKCm11c3RHZXRJbmZvTGlzdF93aGlsZV90b3BAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTEwMAogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGFzc2V0cy5sZW5ndGg7IGkgKz0gMSkgewogICAgZHVwCiAgICBkaWcgMwogICAgPAogICAgYnogbXVzdEdldEluZm9MaXN0X2FmdGVyX3doaWxlQDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTEwMQogICAgLy8gY29uc3Qgc2sgPSB7IGFkZHJlc3MsIGFzc2V0OiBhc3NldHNbaV0sIHR5cGUgfQogICAgZGlnIDMKICAgIGV4dHJhY3QgMiAwCiAgICBkaWcgMQogICAgaW50Y18yIC8vIDgKICAgICoKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGl0b2IKICAgIGRpZyA2CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGRpZyA3CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTEwMgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc3Rha2VzKHNrKS5leGlzdHMsIGVyclN0YWtlTm90Rm91bmQpCiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgZGlnIDEKICAgIGV4dHJhY3QgMzIgOAogICAgdW5jb3ZlciAyCiAgICBleHRyYWN0IDQwIDEKICAgIGNvdmVyIDIKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwNQogICAgLy8gc3Rha2VzID0gQm94TWFwPFN0YWtlS2V5LCBTdGFrZT4oeyBrZXlQcmVmaXg6IFN0YWtpbmdCb3hQcmVmaXhTdGFrZXMgfSkKICAgIGJ5dGVjXzAgLy8gInMiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMTAyCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zdGFrZXMoc2spLmV4aXN0cywgZXJyU3Rha2VOb3RGb3VuZCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IG11c3RHZXRJbmZvTGlzdF9hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6ZXJyU25mZCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJTbmZkCgptdXN0R2V0SW5mb0xpc3RfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExMDMKICAgIC8vIHJlc3VsdHMucHVzaCh0aGlzLmNsYW1wU29mdChhZGRyZXNzLCBhc3NldHNbaV0sIHR5cGUsIHRoaXMuc3Rha2VzKHNrKS52YWx1ZSkpCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZGlnIDYKICAgIHVuY292ZXIgNAogICAgZGlnIDgKICAgIHVuY292ZXIgMwogICAgY2FsbHN1YiBjbGFtcFNvZnQKICAgIHBvcAogICAgdW5jb3ZlciAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMTAzCiAgICAvLyByZXN1bHRzLnB1c2godGhpcy5jbGFtcFNvZnQoYWRkcmVzcywgYXNzZXRzW2ldLCB0eXBlLCB0aGlzLnN0YWtlcyhzaykudmFsdWUpKQogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGl0b2IKICAgIGV4dHJhY3QgNiAwCiAgICByZXBsYWNlMiAwCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTEwMAogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGFzc2V0cy5sZW5ndGg7IGkgKz0gMSkgewogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGIgbXVzdEdldEluZm9MaXN0X3doaWxlX3RvcEAyCgptdXN0R2V0SW5mb0xpc3RfYWZ0ZXJfd2hpbGVANjoKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDk3CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLnN0YWtlQ2hlY2tbcm91dGluZ10oKSAtPiB2b2lkOgpzdGFrZUNoZWNrOgogICAgcHVzaGJ5dGVzICIiCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTEwOAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cG4gMgogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGR1cAogICAgY292ZXIgMgogICAgcHVzaGludCAxNgogICAgKgogICAgcHVzaGludCAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxzbWFydF9jb250cmFjdHMvc3Rha2luZy90eXBlcy50czo6QXNzZXRDaGVjaz4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgY292ZXIgNAogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50OAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmJvb2wKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTExMAogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGNoZWNrcy5sZW5ndGg7IGkgKz0gMSkgewogICAgaW50Y18wIC8vIDAKCnN0YWtlQ2hlY2tfd2hpbGVfdG9wQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExMTAKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBjaGVja3MubGVuZ3RoOyBpICs9IDEpIHsKICAgIGR1cAogICAgZGlnIDMKICAgIDwKICAgIGJ6IHN0YWtlQ2hlY2tfYWZ0ZXJfd2hpbGVAMTAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTExMQogICAgLy8gY29uc3Qgc2sgPSB7IGFkZHJlc3MsIGFzc2V0OiBjaGVja3NbaV0uYXNzZXQsIHR5cGUgfQogICAgZGlnIDMKICAgIGV4dHJhY3QgMiAwCiAgICBkaWcgMQogICAgcHVzaGludCAxNgogICAgKgogICAgcHVzaGludCAxNgogICAgZXh0cmFjdDMgLy8gb24gZXJyb3I6IGluZGV4IGFjY2VzcyBpcyBvdXQgb2YgYm91bmRzCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBidXJ5IDkKICAgIGl0b2IKICAgIGRpZyA2CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGRpZyA3CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTExMgogICAgLy8gaWYgKCF0aGlzLnN0YWtlcyhzaykuZXhpc3RzKSB7CiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgZGlnIDEKICAgIGV4dHJhY3QgMzIgOAogICAgdW5jb3ZlciAyCiAgICBleHRyYWN0IDQwIDEKICAgIGNvdmVyIDIKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwNQogICAgLy8gc3Rha2VzID0gQm94TWFwPFN0YWtlS2V5LCBTdGFrZT4oeyBrZXlQcmVmaXg6IFN0YWtpbmdCb3hQcmVmaXhTdGFrZXMgfSkKICAgIGJ5dGVjXzAgLy8gInMiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMTEyCiAgICAvLyBpZiAoIXRoaXMuc3Rha2VzKHNrKS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHN0YWtlQ2hlY2tfYWZ0ZXJfaWZfZWxzZUA1CiAgICBwb3BuIDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTExMwogICAgLy8gcmV0dXJuIGZhbHNlCiAgICBpbnRjXzAgLy8gMAoKc3Rha2VDaGVja19hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuc3Rha2VDaGVja0AxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTEwOAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBieXRlYyAxMSAvLyAweDAwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBzZXRiaXQKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCnN0YWtlQ2hlY2tfYWZ0ZXJfaWZfZWxzZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMTE2CiAgICAvLyBsZXQgYW1vdW50VG9DaGVjazogdWludDY0ID0gdGhpcy5jbGFtcFNvZnQoYWRkcmVzcywgY2hlY2tzW2ldLmFzc2V0LCB0eXBlLCB0aGlzLnN0YWtlcyhzaykudmFsdWUpLmFtb3VudAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGRpZyA2CiAgICBkaWcgOQogICAgZGlnIDkKICAgIGR1cAogICAgY292ZXIgNAogICAgdW5jb3ZlciAzCiAgICBjYWxsc3ViIGNsYW1wU29mdAogICAgcG9wCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGJ1cnkgMTAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTExNwogICAgLy8gaWYgKHR5cGUgPT09IFNUQUtJTkdfVFlQRV9IRUFSVEJFQVQpIHsKICAgIGJ5dGVjIDggLy8gMHgwYQogICAgPT0KICAgIGJ6IHN0YWtlQ2hlY2tfYWZ0ZXJfaWZfZWxzZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExMTgKICAgIC8vIGFtb3VudFRvQ2hlY2sgPSB0aGlzLmdldEhlYXJ0YmVhdEF2ZXJhZ2UoYWRkcmVzcywgY2hlY2tzW2ldLmFzc2V0LCBpbmNsdWRlRXNjcm93ZWQpCiAgICBkaWcgNQogICAgZGlnIDgKICAgIGRpZyA0CiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuZ2V0SGVhcnRiZWF0QXZlcmFnZQogICAgYnVyeSA5CgpzdGFrZUNoZWNrX2FmdGVyX2lmX2Vsc2VANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTEyMgogICAgLy8gaWYgKGNoZWNrc1tpXS5hbW91bnQgPiBhbW91bnRUb0NoZWNrKSB7CiAgICBzd2FwCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIGRpZyA4CiAgICA+CiAgICBieiBzdGFrZUNoZWNrX2FmdGVyX2lmX2Vsc2VAOQogICAgcG9wbiA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExMjMKICAgIC8vIHJldHVybiBmYWxzZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTEwOAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBiIHN0YWtlQ2hlY2tfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLnN0YWtlQ2hlY2tAMTEKCnN0YWtlQ2hlY2tfYWZ0ZXJfaWZfZWxzZUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMTEwCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgY2hlY2tzLmxlbmd0aDsgaSArPSAxKSB7CiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgYiBzdGFrZUNoZWNrX3doaWxlX3RvcEAyCgpzdGFrZUNoZWNrX2FmdGVyX3doaWxlQDEwOgogICAgcG9wbiA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExMjcKICAgIC8vIHJldHVybiB0cnVlCiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMTA4CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGIgc3Rha2VDaGVja19hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuc3Rha2VDaGVja0AxMQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuZ2V0VG90YWxzW3JvdXRpbmddKCkgLT4gdm9pZDoKZ2V0VG90YWxzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMTMwCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cG4gMgogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGR1cAogICAgY292ZXIgMgogICAgaW50Y18yIC8vIDgKICAgICoKICAgIHB1c2hpbnQgMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8dWludDY0PgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMTMyCiAgICAvLyBjb25zdCByZXN1bHRzOiBUb3RhbHNJbmZvW10gPSBbXQogICAgYnl0ZWMgMTcgLy8gMHgwMDAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExMzMKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBhc3NldHMubGVuZ3RoOyBpICs9IDEpIHsKICAgIGludGNfMCAvLyAwCgpnZXRUb3RhbHNfd2hpbGVfdG9wQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExMzMKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBhc3NldHMubGVuZ3RoOyBpICs9IDEpIHsKICAgIGR1cAogICAgZGlnIDMKICAgIDwKICAgIGJ6IGdldFRvdGFsc19hZnRlcl93aGlsZUA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExMzQKICAgIC8vIHJlc3VsdHMucHVzaCh0aGlzLnRvdGFscyhhc3NldHNbaV0pLnZhbHVlKQogICAgZGlnIDMKICAgIGV4dHJhY3QgMiAwCiAgICBkaWcgMQogICAgaW50Y18yIC8vIDgKICAgICoKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0MyAvLyBvbiBlcnJvcjogaW5kZXggYWNjZXNzIGlzIG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTE2CiAgICAvLyB0b3RhbHMgPSBCb3hNYXA8dWludDY0LCBUb3RhbHNJbmZvPih7IGtleVByZWZpeDogU3Rha2luZ0JveFByZWZpeFRvdGFscyB9KQogICAgYnl0ZWMgNyAvLyAidCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMTM0CiAgICAvLyByZXN1bHRzLnB1c2godGhpcy50b3RhbHMoYXNzZXRzW2ldKS52YWx1ZSkKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICB1bmNvdmVyIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExMzQKICAgIC8vIHJlc3VsdHMucHVzaCh0aGlzLnRvdGFscyhhc3NldHNbaV0pLnZhbHVlKQogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGl0b2IKICAgIGV4dHJhY3QgNiAwCiAgICByZXBsYWNlMiAwCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTEzMwogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGFzc2V0cy5sZW5ndGg7IGkgKz0gMSkgewogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGIgZ2V0VG90YWxzX3doaWxlX3RvcEAyCgpnZXRUb3RhbHNfYWZ0ZXJfd2hpbGVANDoKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMTMwCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmdldFNldHRpbmdzW3JvdXRpbmddKCkgLT4gdm9pZDoKZ2V0U2V0dGluZ3M6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExMzkKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwbiAyCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBpbnRjXzIgLy8gOAogICAgKgogICAgcHVzaGludCAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTx1aW50NjQ+CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExNDEKICAgIC8vIGNvbnN0IHJlc3VsdHM6IFNldHRpbmdzQ2hlY2tbXSA9IFtdCiAgICBieXRlYyAxNyAvLyAweDAwMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTE0MgogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGFzc2V0cy5sZW5ndGg7IGkgKz0gMSkgewogICAgaW50Y18wIC8vIDAKCmdldFNldHRpbmdzX3doaWxlX3RvcEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMTQyCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgYXNzZXRzLmxlbmd0aDsgaSArPSAxKSB7CiAgICBkdXAKICAgIGRpZyAzCiAgICA8CiAgICBieiBnZXRTZXR0aW5nc19hZnRlcl93aGlsZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExNDMKICAgIC8vIGlmICghdGhpcy5zZXR0aW5ncyhhc3NldHNbaV0pLmV4aXN0cykgewogICAgZGlnIDMKICAgIGV4dHJhY3QgMiAwCiAgICBkaWcgMQogICAgaW50Y18yIC8vIDgKICAgICoKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0MyAvLyBvbiBlcnJvcjogaW5kZXggYWNjZXNzIGlzIG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTE4CiAgICAvLyBzZXR0aW5ncyA9IEJveE1hcDx1aW50NjQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFN0YWtpbmdCb3hQcmVmaXhTZXR0aW5ncyB9KQogICAgYnl0ZWMgMjIgLy8gImUiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMTQzCiAgICAvLyBpZiAoIXRoaXMuc2V0dGluZ3MoYXNzZXRzW2ldKS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGdldFNldHRpbmdzX2FmdGVyX2lmX2Vsc2VANQogICAgcG9wCiAgICBzd2FwCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMTQ0CiAgICAvLyByZXN1bHRzLnB1c2goeyB2YWx1ZTogMCwgZXhpc3RzOiBmYWxzZSB9KQogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGl0b2IKICAgIGV4dHJhY3QgNiAwCiAgICByZXBsYWNlMiAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExNDQKICAgIC8vIHJlc3VsdHMucHVzaCh7IHZhbHVlOiAwLCBleGlzdHM6IGZhbHNlIH0pCiAgICBieXRlYyAzOCAvLyAweDAwMDAwMDAwMDAwMDAwMDAwMAogICAgY29uY2F0CiAgICBzd2FwCgpnZXRTZXR0aW5nc19ibG9ja0A2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMTQyCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgYXNzZXRzLmxlbmd0aDsgaSArPSAxKSB7CiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgYiBnZXRTZXR0aW5nc193aGlsZV90b3BAMgoKZ2V0U2V0dGluZ3NfYWZ0ZXJfaWZfZWxzZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMTQ4CiAgICAvLyByZXN1bHRzLnB1c2goeyB2YWx1ZTogdGhpcy5zZXR0aW5ncyhhc3NldHNbaV0pLnZhbHVlLCBleGlzdHM6IHRydWUgfSkKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBidG9pCiAgICBpdG9iCiAgICBwdXNoYnl0ZXMgMHg4MAogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExNDgKICAgIC8vIHJlc3VsdHMucHVzaCh7IHZhbHVlOiB0aGlzLnNldHRpbmdzKGFzc2V0c1tpXSkudmFsdWUsIGV4aXN0czogdHJ1ZSB9KQogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGl0b2IKICAgIGV4dHJhY3QgNiAwCiAgICByZXBsYWNlMiAwCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGIgZ2V0U2V0dGluZ3NfYmxvY2tANgoKZ2V0U2V0dGluZ3NfYWZ0ZXJfd2hpbGVANzoKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMTM5CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6OlVwZ3JhZGVhYmxlQWtpdGFCYXNlQ29udHJhY3QudXBkYXRlW3JvdXRpbmddKCkgLT4gdm9pZDoKdXBkYXRlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM1CiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiBbJ1VwZGF0ZUFwcGxpY2F0aW9uJ10gfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM3CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIGVyck5vdEFraXRhRGFvKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlYyA2IC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjIDE5IC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzcKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IHVwZGF0ZV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMjAgLy8gIkVSUjplcnJOZGFvIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5kYW8KCnVwZGF0ZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozOAogICAgLy8gY29uc3QgW3BsdWdpbnNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXModGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNQbHVnaW5BcHBMaXN0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlYyA2IC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzgKICAgIC8vIGNvbnN0IFtwbHVnaW5zXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzUGx1Z2luQXBwTGlzdCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgcHVzaGJ5dGVzICJwYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzkKICAgIC8vIGNvbnN0IHVwZGF0ZVBsdWdpbiA9IGRlY29kZUFyYzQ8UGx1Z2luQXBwTGlzdD4ocGx1Z2lucykudXBkYXRlCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjQwCiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uSWQgPT09IHVwZGF0ZVBsdWdpbiwgZXJySW52YWxpZFVwZ3JhZGUpCiAgICBnbG9iYWwgQ2FsbGVyQXBwbGljYXRpb25JRAogICAgPT0KICAgIGJueiB1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOmVyckl1cGciCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXVwZwoKdXBkYXRlX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE0CiAgICAvLyB2ZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogR2xvYmFsU3RhdGVLZXlWZXJzaW9uIH0pCiAgICBieXRlYyAyOCAvLyAidmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czo0MQogICAgLy8gdGhpcy52ZXJzaW9uLnZhbHVlID0gbmV3VmVyc2lvbgogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozNQogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjpBa2l0YUJhc2VDb250cmFjdC51cGRhdGVBa2l0YURBT1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZUFraXRhREFPOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjI1CiAgICAvLyB1cGRhdGVBa2l0YURBTyhha2l0YURBTzogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNgogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWMgNiAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyAxOSAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjI2CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIGVyck5vdEFraXRhRGFvKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGJueiB1cGRhdGVBa2l0YURBT19hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMjAgLy8gIkVSUjplcnJOZGFvIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5kYW8KCnVwZGF0ZUFraXRhREFPX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWMgNiAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjI3CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlID0gYWtpdGFEQU8KICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MjUKICAgIC8vIHVwZGF0ZUFraXRhREFPKGFraXRhREFPOiBBcHBsaWNhdGlvbik6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcudXBkYXRlVG90YWxzKGFzc2V0OiB1aW50NjQsIHR5cGU6IGJ5dGVzLCBhbW91bnQ6IHVpbnQ2NCwgaXNBZGQ6IHVpbnQ2NCkgLT4gdm9pZDoKdXBkYXRlVG90YWxzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMzYKICAgIC8vIHByaXZhdGUgdXBkYXRlVG90YWxzKGFzc2V0OiB1aW50NjQsIHR5cGU6IFN0YWtpbmdUeXBlLCBhbW91bnQ6IHVpbnQ2NCwgaXNBZGQ6IGJvb2xlYW4pOiB2b2lkIHsKICAgIHByb3RvIDQgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMzcKICAgIC8vIGlmICh0eXBlID09PSBTVEFLSU5HX1RZUEVfSEFSRCkgewogICAgZnJhbWVfZGlnIC0zCiAgICBieXRlYyA0IC8vIDB4MWUKICAgID09CiAgICBieiB1cGRhdGVUb3RhbHNfZWxzZV9ib2R5QDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTM4CiAgICAvLyBpZiAoaXNBZGQpIHsKICAgIGZyYW1lX2RpZyAtMQogICAgYnogdXBkYXRlVG90YWxzX2Vsc2VfYm9keUAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEzOQogICAgLy8gdGhpcy50b3RhbHMoYXNzZXQpLnZhbHVlLmVzY3Jvd2VkICs9IGFtb3VudAogICAgZnJhbWVfZGlnIC00CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExNgogICAgLy8gdG90YWxzID0gQm94TWFwPHVpbnQ2NCwgVG90YWxzSW5mbz4oeyBrZXlQcmVmaXg6IFN0YWtpbmdCb3hQcmVmaXhUb3RhbHMgfSkKICAgIGJ5dGVjIDcgLy8gInQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTM5CiAgICAvLyB0aGlzLnRvdGFscyhhc3NldCkudmFsdWUuZXNjcm93ZWQgKz0gYW1vdW50CiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIGZyYW1lX2RpZyAtMgogICAgKwogICAgaXRvYgogICAgaW50Y18yIC8vIDgKICAgIHN3YXAKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCgp1cGRhdGVUb3RhbHNfYWZ0ZXJfaWZfZWxzZUAxMToKICAgIHJldHN1YgoKdXBkYXRlVG90YWxzX2Vsc2VfYm9keUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxNDEKICAgIC8vIHRoaXMudG90YWxzKGFzc2V0KS52YWx1ZS5lc2Nyb3dlZCAtPSBhbW91bnQKICAgIGZyYW1lX2RpZyAtNAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMTYKICAgIC8vIHRvdGFscyA9IEJveE1hcDx1aW50NjQsIFRvdGFsc0luZm8+KHsga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4VG90YWxzIH0pCiAgICBieXRlYyA3IC8vICJ0IgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjE0MQogICAgLy8gdGhpcy50b3RhbHMoYXNzZXQpLnZhbHVlLmVzY3Jvd2VkIC09IGFtb3VudAogICAgZHVwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBmcmFtZV9kaWcgLTIKICAgIC0KICAgIGl0b2IKICAgIGludGNfMiAvLyA4CiAgICBzd2FwCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgcmV0c3ViCgp1cGRhdGVUb3RhbHNfZWxzZV9ib2R5QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjE0MwogICAgLy8gfSBlbHNlIGlmICh0eXBlID09PSBTVEFLSU5HX1RZUEVfTE9DSykgewogICAgZnJhbWVfZGlnIC0zCiAgICBieXRlY18yIC8vIDB4MjgKICAgID09CiAgICBieiB1cGRhdGVUb3RhbHNfYWZ0ZXJfaWZfZWxzZUAxMQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxNDQKICAgIC8vIGlmIChpc0FkZCkgewogICAgZnJhbWVfZGlnIC0xCiAgICBieiB1cGRhdGVUb3RhbHNfZWxzZV9ib2R5QDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTQ1CiAgICAvLyB0aGlzLnRvdGFscyhhc3NldCkudmFsdWUubG9ja2VkICs9IGFtb3VudAogICAgZnJhbWVfZGlnIC00CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExNgogICAgLy8gdG90YWxzID0gQm94TWFwPHVpbnQ2NCwgVG90YWxzSW5mbz4oeyBrZXlQcmVmaXg6IFN0YWtpbmdCb3hQcmVmaXhUb3RhbHMgfSkKICAgIGJ5dGVjIDcgLy8gInQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTQ1CiAgICAvLyB0aGlzLnRvdGFscyhhc3NldCkudmFsdWUubG9ja2VkICs9IGFtb3VudAogICAgZHVwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBmcmFtZV9kaWcgLTIKICAgICsKICAgIGl0b2IKICAgIGludGNfMCAvLyAwCiAgICBzd2FwCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgcmV0c3ViCgp1cGRhdGVUb3RhbHNfZWxzZV9ib2R5QDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjE0NwogICAgLy8gdGhpcy50b3RhbHMoYXNzZXQpLnZhbHVlLmxvY2tlZCAtPSBhbW91bnQKICAgIGZyYW1lX2RpZyAtNAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMTYKICAgIC8vIHRvdGFscyA9IEJveE1hcDx1aW50NjQsIFRvdGFsc0luZm8+KHsga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4VG90YWxzIH0pCiAgICBieXRlYyA3IC8vICJ0IgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjE0NwogICAgLy8gdGhpcy50b3RhbHMoYXNzZXQpLnZhbHVlLmxvY2tlZCAtPSBhbW91bnQKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZnJhbWVfZGlnIC0yCiAgICAtCiAgICBpdG9iCiAgICBpbnRjXzAgLy8gMAogICAgc3dhcAogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcudXBkYXRlTGl2ZUxvY2tlZFN0YWtlKGFzc2V0OiB1aW50NjQsIGFtb3VudDogdWludDY0LCBpc0FkZDogdWludDY0KSAtPiB2b2lkOgp1cGRhdGVMaXZlTG9ja2VkU3Rha2U6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjE1MgogICAgLy8gcHJpdmF0ZSB1cGRhdGVMaXZlTG9ja2VkU3Rha2UoYXNzZXQ6IHVpbnQ2NCwgYW1vdW50OiB1aW50NjQsIGlzQWRkOiBib29sZWFuKTogdm9pZCB7CiAgICBwcm90byAzIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTUzCiAgICAvLyBpZiAoaXNBZGQpIHsKICAgIGZyYW1lX2RpZyAtMQogICAgYnogdXBkYXRlTGl2ZUxvY2tlZFN0YWtlX2Vsc2VfYm9keUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjE1NAogICAgLy8gdGhpcy50b3RhbHMoYXNzZXQpLnZhbHVlLmxpdmVMb2NrZWRTdGFrZSArPSBhbW91bnQKICAgIGZyYW1lX2RpZyAtMwogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMTYKICAgIC8vIHRvdGFscyA9IEJveE1hcDx1aW50NjQsIFRvdGFsc0luZm8+KHsga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4VG90YWxzIH0pCiAgICBieXRlYyA3IC8vICJ0IgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjE1NAogICAgLy8gdGhpcy50b3RhbHMoYXNzZXQpLnZhbHVlLmxpdmVMb2NrZWRTdGFrZSArPSBhbW91bnQKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBmcmFtZV9kaWcgLTIKICAgICsKICAgIGl0b2IKICAgIHB1c2hpbnQgMTYKICAgIHN3YXAKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICByZXRzdWIKCnVwZGF0ZUxpdmVMb2NrZWRTdGFrZV9lbHNlX2JvZHlAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTU2CiAgICAvLyB0aGlzLnRvdGFscyhhc3NldCkudmFsdWUubGl2ZUxvY2tlZFN0YWtlIC09IGFtb3VudAogICAgZnJhbWVfZGlnIC0zCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjExNgogICAgLy8gdG90YWxzID0gQm94TWFwPHVpbnQ2NCwgVG90YWxzSW5mbz4oeyBrZXlQcmVmaXg6IFN0YWtpbmdCb3hQcmVmaXhUb3RhbHMgfSkKICAgIGJ5dGVjIDcgLy8gInQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTU2CiAgICAvLyB0aGlzLnRvdGFscyhhc3NldCkudmFsdWUubGl2ZUxvY2tlZFN0YWtlIC09IGFtb3VudAogICAgZHVwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIGZyYW1lX2RpZyAtMgogICAgLQogICAgaXRvYgogICAgcHVzaGludCAxNgogICAgc3dhcAogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuY2FsY3VsYXRlVXBkYXRlZFdlaWdodGVkQWdlKGluZm86IGJ5dGVzLCBuZXdBbW91bnQ6IHVpbnQ2NCkgLT4gdWludDY0LCBieXRlczoKY2FsY3VsYXRlVXBkYXRlZFdlaWdodGVkQWdlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxNjAKICAgIC8vIHByaXZhdGUgY2FsY3VsYXRlVXBkYXRlZFdlaWdodGVkQWdlKGluZm86IFN0YWtlLCBuZXdBbW91bnQ6IHVpbnQ2NCk6IHVpbnQ2NCB7CiAgICBwcm90byAyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTYxCiAgICAvLyBjb25zdCBjdXJyZW50QWdlOiB1aW50NjQgPSBpbmZvLndlaWdodGVkQWdlICsgKEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgLSBpbmZvLmxhc3RVcGRhdGUpCiAgICBmcmFtZV9kaWcgLTIKICAgIHB1c2hpbnQgMjQKICAgIGV4dHJhY3RfdWludDY0CiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBmcmFtZV9kaWcgLTIKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxNjIKICAgIC8vIHJldHVybiBvcC5kaXZ3KC4uLm9wLm11bHcoY3VycmVudEFnZSwgaW5mby5hbW91bnQpLCBuZXdBbW91bnQpCiAgICBmcmFtZV9kaWcgLTIKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgbXVsdwogICAgZnJhbWVfZGlnIC0xCiAgICBkaXZ3CiAgICBmcmFtZV9kaWcgLTIKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuZ2V0V2VpZ2h0ZWRBZ2UoaW5mbzogYnl0ZXMpIC0+IHVpbnQ2NCwgYnl0ZXM6CmdldFdlaWdodGVkQWdlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxNjUKICAgIC8vIHByaXZhdGUgZ2V0V2VpZ2h0ZWRBZ2UoaW5mbzogU3Rha2UpOiB1aW50NjQgewogICAgcHJvdG8gMSAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjE2NgogICAgLy8gcmV0dXJuIGluZm8ud2VpZ2h0ZWRBZ2UgKyAoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCAtIGluZm8ubGFzdFVwZGF0ZSkKICAgIGZyYW1lX2RpZyAtMQogICAgcHVzaGludCAyNAogICAgZXh0cmFjdF91aW50NjQKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIGZyYW1lX2RpZyAtMQogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICAtCiAgICArCiAgICBmcmFtZV9kaWcgLTEKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuZ2V0QXBwV2VpZ2h0ZWRBZ2UoaW5mbzogYnl0ZXMsIGFjY2VwdEluaGVyaXRlZDogdWludDY0KSAtPiB1aW50NjQsIGJ5dGVzOgpnZXRBcHBXZWlnaHRlZEFnZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTY5CiAgICAvLyBwcml2YXRlIGdldEFwcFdlaWdodGVkQWdlKGluZm86IEFwcFN0YWtlLCBhY2NlcHRJbmhlcml0ZWQ6IGJvb2xlYW4pOiB1aW50NjQgewogICAgcHJvdG8gMiAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjE3MAogICAgLy8gY29uc3QgYWdlOiB1aW50NjQgPSBpbmZvLndlaWdodGVkQWdlICsgKEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgLSBpbmZvLmxhc3RVcGRhdGUpCiAgICBmcmFtZV9kaWcgLTIKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBmcmFtZV9kaWcgLTIKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxNzEKICAgIC8vIHJldHVybiBhY2NlcHRJbmhlcml0ZWQgPyBhZ2UgOiBhZ2UgLSBpbmZvLmluaGVyaXRlZEFnZQogICAgZnJhbWVfZGlnIC0xCiAgICBieiBnZXRBcHBXZWlnaHRlZEFnZV90ZXJuYXJ5X2ZhbHNlQDIKCmdldEFwcFdlaWdodGVkQWdlX3Rlcm5hcnlfbWVyZ2VAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTcxCiAgICAvLyByZXR1cm4gYWNjZXB0SW5oZXJpdGVkID8gYWdlIDogYWdlIC0gaW5mby5pbmhlcml0ZWRBZ2UKICAgIGZyYW1lX2RpZyAtMgogICAgcmV0c3ViCgpnZXRBcHBXZWlnaHRlZEFnZV90ZXJuYXJ5X2ZhbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjE3MQogICAgLy8gcmV0dXJuIGFjY2VwdEluaGVyaXRlZCA/IGFnZSA6IGFnZSAtIGluZm8uaW5oZXJpdGVkQWdlCiAgICBmcmFtZV9kaWcgLTIKICAgIHB1c2hpbnQgMjQKICAgIGV4dHJhY3RfdWludDY0CiAgICAtCiAgICBiIGdldEFwcFdlaWdodGVkQWdlX3Rlcm5hcnlfbWVyZ2VAMwoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuZ2V0SGVsZChhZGRyZXNzOiBieXRlcywgYXNzZXQ6IHVpbnQ2NCkgLT4gYnl0ZXM6CmdldEhlbGQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjE4NAogICAgLy8gcHJpdmF0ZSBnZXRIZWxkKGFkZHJlc3M6IEFjY291bnQsIGFzc2V0OiB1aW50NjQpOiB7IGJhbGFuY2U6IHVpbnQ2NDsgb3B0ZWRJbjogYm9vbGVhbiB9IHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxODUKICAgIC8vIGlmIChhc3NldCA9PT0gMCkgewogICAgZnJhbWVfZGlnIC0xCiAgICBibnogZ2V0SGVsZF9hZnRlcl9pZl9lbHNlQDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTg2CiAgICAvLyByZXR1cm4geyBiYWxhbmNlOiBhZGRyZXNzLmJhbGFuY2UsIG9wdGVkSW46IHRydWUgfQogICAgZnJhbWVfZGlnIC0yCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdEJhbGFuY2UKICAgIGFzc2VydCAvLyBhY2NvdW50IGZ1bmRlZAogICAgaXRvYgogICAgcHVzaGJ5dGVzIDB4ODAKICAgIGNvbmNhdAogICAgcmV0c3ViCgpnZXRIZWxkX2FmdGVyX2lmX2Vsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTg5CiAgICAvLyBjb25zdCBbYmFsYW5jZSwgb3B0ZWRJbl0gPSBBc3NldEhvbGRpbmcuYXNzZXRCYWxhbmNlKGFkZHJlc3MsIGFzc2V0KQogICAgZnJhbWVfZGlnIC0yCiAgICBmcmFtZV9kaWcgLTEKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxOTAKICAgIC8vIHJldHVybiB7IGJhbGFuY2UsIG9wdGVkSW4gfQogICAgc3dhcAogICAgaXRvYgogICAgYnl0ZWMgMTEgLy8gMHgwMAogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMwogICAgc2V0Yml0CiAgICBjb25jYXQKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuZ2V0SW5mb09yRW1wdHkoYWRkcmVzczogYnl0ZXMsIHN0YWtlOiBieXRlcykgLT4gYnl0ZXMsIGJ5dGVzOgpnZXRJbmZvT3JFbXB0eToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MjEwCiAgICAvLyBwcml2YXRlIGdldEluZm9PckVtcHR5KGFkZHJlc3M6IEFjY291bnQsIHN0YWtlOiBTdGFrZUluZm8pOiBTdGFrZSB7CiAgICBwcm90byAyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MjExCiAgICAvLyBjb25zdCBzayA9IHsgYWRkcmVzcywgLi4uc3Rha2UgfQogICAgZnJhbWVfZGlnIC0xCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgZnJhbWVfZGlnIC0xCiAgICBleHRyYWN0IDggMQogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIGl0b2IKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC0yCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MjEyCiAgICAvLyBpZiAoIXRoaXMuc3Rha2VzKHNrKS5leGlzdHMpIHsKICAgIGR1cAogICAgZXh0cmFjdCA5IDMyCiAgICBkaWcgMQogICAgZXh0cmFjdCAwIDgKICAgIHVuY292ZXIgMgogICAgZXh0cmFjdCA4IDEKICAgIGNvdmVyIDIKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwNQogICAgLy8gc3Rha2VzID0gQm94TWFwPFN0YWtlS2V5LCBTdGFrZT4oeyBrZXlQcmVmaXg6IFN0YWtpbmdCb3hQcmVmaXhTdGFrZXMgfSkKICAgIGJ5dGVjXzAgLy8gInMiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoyMTIKICAgIC8vIGlmICghdGhpcy5zdGFrZXMoc2spLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogZ2V0SW5mb09yRW1wdHlfYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjIwNwogICAgLy8gcmV0dXJuIHsgYW1vdW50OiAwLCBsYXN0VXBkYXRlOiAwLCBleHBpcmF0aW9uOiAwLCB3ZWlnaHRlZEFnZTogMCB9CiAgICBieXRlYyAzOSAvLyAweDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MjEzCiAgICAvLyByZXR1cm4gdGhpcy5lbXB0eVN0YWtlKCkKICAgIGZyYW1lX2RpZyAtMQogICAgZnJhbWVfYnVyeSAxCiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKZ2V0SW5mb09yRW1wdHlfYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoyMTYKICAgIC8vIHJldHVybiB0aGlzLmNsYW1wU29mdChhZGRyZXNzLCBzdGFrZS5hc3NldCwgc3Rha2UudHlwZSwgdGhpcy5zdGFrZXMoc2spLnZhbHVlKQogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGZyYW1lX2RpZyAtMgogICAgY292ZXIgMwogICAgY2FsbHN1YiBjbGFtcFNvZnQKICAgIHBvcAogICAgZnJhbWVfZGlnIC0xCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmNsYW1wU29mdChhZGRyZXNzOiBieXRlcywgYXNzZXQ6IHVpbnQ2NCwgdHlwZTogYnl0ZXMsIGluZm86IGJ5dGVzKSAtPiBieXRlcywgYnl0ZXM6CmNsYW1wU29mdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MjIzCiAgICAvLyBwcml2YXRlIGNsYW1wU29mdChhZGRyZXNzOiBBY2NvdW50LCBhc3NldDogdWludDY0LCB0eXBlOiBTdGFraW5nVHlwZSwgaW5mbzogU3Rha2UpOiBTdGFrZSB7CiAgICBwcm90byA0IDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MjI0CiAgICAvLyBpZiAodHlwZSAhPT0gU1RBS0lOR19UWVBFX1NPRlQpIHsKICAgIGZyYW1lX2RpZyAtMgogICAgYnl0ZWMgNSAvLyAweDE0CiAgICAhPQogICAgYnogY2xhbXBTb2Z0X2FmdGVyX2lmX2Vsc2VAMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoyMjUKICAgIC8vIHJldHVybiBpbmZvCiAgICBmcmFtZV9kaWcgLTEKICAgIGR1cAogICAgcmV0c3ViCgpjbGFtcFNvZnRfYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoyMjgKICAgIC8vIGNvbnN0IHsgYmFsYW5jZSwgb3B0ZWRJbiB9ID0gdGhpcy5nZXRIZWxkKGFkZHJlc3MsIGFzc2V0KQogICAgZnJhbWVfZGlnIC00CiAgICBmcmFtZV9kaWcgLTMKICAgIGNhbGxzdWIgZ2V0SGVsZAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIHB1c2hpbnQgNjQKICAgIGdldGJpdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoyMjkKICAgIC8vIGNvbnN0IGJhY2tlZDogdWludDY0ID0gb3B0ZWRJbiA/IGJhbGFuY2UgOiAwCiAgICBpbnRjXzAgLy8gMAogICAgY292ZXIgMgogICAgc2VsZWN0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MjMwCiAgICAvLyBpZiAoYmFja2VkID49IGluZm8uYW1vdW50KSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgPj0KICAgIGJ6IGNsYW1wU29mdF9hZnRlcl9pZl9lbHNlQDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MjMxCiAgICAvLyByZXR1cm4gaW5mbwogICAgZnJhbWVfZGlnIC0xCiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgcmV0c3ViCgpjbGFtcFNvZnRfYWZ0ZXJfaWZfZWxzZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoyMzQKICAgIC8vIHJldHVybiB7IGFtb3VudDogYmFja2VkLCBsYXN0VXBkYXRlOiBpbmZvLmxhc3RVcGRhdGUsIGV4cGlyYXRpb246IGluZm8uZXhwaXJhdGlvbiwgd2VpZ2h0ZWRBZ2U6IDAgfQogICAgZnJhbWVfZGlnIC0xCiAgICBleHRyYWN0IDggOAogICAgZnJhbWVfZGlnIC0xCiAgICBleHRyYWN0IDE2IDgKICAgIHVuY292ZXIgMgogICAgaXRvYgogICAgdW5jb3ZlciAyCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgaW50Y18wIC8vIDAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC0xCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmFzc2VydFZhbGlkU3Rha2VUeXBlKHR5cGU6IGJ5dGVzKSAtPiB2b2lkOgphc3NlcnRWYWxpZFN0YWtlVHlwZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MjM3CiAgICAvLyBwcml2YXRlIGFzc2VydFZhbGlkU3Rha2VUeXBlKHR5cGU6IFN0YWtpbmdUeXBlKTogdm9pZCB7CiAgICBwcm90byAxIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MjM5CiAgICAvLyB0eXBlID09PSBTVEFLSU5HX1RZUEVfSEVBUlRCRUFUIHx8CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ5dGVjIDggLy8gMHgwYQogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MjM5LTI0MAogICAgLy8gdHlwZSA9PT0gU1RBS0lOR19UWVBFX0hFQVJUQkVBVCB8fAogICAgLy8gdHlwZSA9PT0gU1RBS0lOR19UWVBFX1NPRlQgfHwKICAgIGJueiBhc3NlcnRWYWxpZFN0YWtlVHlwZV9ib29sX3RydWVANAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoyNDAKICAgIC8vIHR5cGUgPT09IFNUQUtJTkdfVFlQRV9TT0ZUIHx8CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ5dGVjIDUgLy8gMHgxNAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MjM5LTI0MAogICAgLy8gdHlwZSA9PT0gU1RBS0lOR19UWVBFX0hFQVJUQkVBVCB8fAogICAgLy8gdHlwZSA9PT0gU1RBS0lOR19UWVBFX1NPRlQgfHwKICAgIGJueiBhc3NlcnRWYWxpZFN0YWtlVHlwZV9ib29sX3RydWVANAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoyNDEKICAgIC8vIHR5cGUgPT09IFNUQUtJTkdfVFlQRV9IQVJEIHx8CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ5dGVjIDQgLy8gMHgxZQogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MjM5LTI0MQogICAgLy8gdHlwZSA9PT0gU1RBS0lOR19UWVBFX0hFQVJUQkVBVCB8fAogICAgLy8gdHlwZSA9PT0gU1RBS0lOR19UWVBFX1NPRlQgfHwKICAgIC8vIHR5cGUgPT09IFNUQUtJTkdfVFlQRV9IQVJEIHx8CiAgICBibnogYXNzZXJ0VmFsaWRTdGFrZVR5cGVfYm9vbF90cnVlQDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MjQyCiAgICAvLyB0eXBlID09PSBTVEFLSU5HX1RZUEVfTE9DSywKICAgIGZyYW1lX2RpZyAtMQogICAgYnl0ZWNfMiAvLyAweDI4CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoyMzktMjQyCiAgICAvLyB0eXBlID09PSBTVEFLSU5HX1RZUEVfSEVBUlRCRUFUIHx8CiAgICAvLyB0eXBlID09PSBTVEFLSU5HX1RZUEVfU09GVCB8fAogICAgLy8gdHlwZSA9PT0gU1RBS0lOR19UWVBFX0hBUkQgfHwKICAgIC8vIHR5cGUgPT09IFNUQUtJTkdfVFlQRV9MT0NLLAogICAgYnogYXNzZXJ0VmFsaWRTdGFrZVR5cGVfYm9vbF9mYWxzZUA1Cgphc3NlcnRWYWxpZFN0YWtlVHlwZV9ib29sX3RydWVANDoKICAgIGludGNfMSAvLyAxCgphc3NlcnRWYWxpZFN0YWtlVHlwZV9ib29sX21lcmdlQDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjIzOC0yNDQKICAgIC8vIGxvZ2dlZEFzc2VydCgKICAgIC8vICAgdHlwZSA9PT0gU1RBS0lOR19UWVBFX0hFQVJUQkVBVCB8fAogICAgLy8gICB0eXBlID09PSBTVEFLSU5HX1RZUEVfU09GVCB8fAogICAgLy8gICB0eXBlID09PSBTVEFLSU5HX1RZUEVfSEFSRCB8fAogICAgLy8gICB0eXBlID09PSBTVEFLSU5HX1RZUEVfTE9DSywKICAgIC8vICAgZXJySW52YWxpZFN0YWtlVHlwZQogICAgLy8gKQogICAgYm56IGFzc2VydFZhbGlkU3Rha2VUeXBlX2FmdGVyX2Fzc2VydEA4CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJJc3RwIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklzdHAKCmFzc2VydFZhbGlkU3Rha2VUeXBlX2FmdGVyX2Fzc2VydEA4OgogICAgcmV0c3ViCgphc3NlcnRWYWxpZFN0YWtlVHlwZV9ib29sX2ZhbHNlQDU6CiAgICBpbnRjXzAgLy8gMAogICAgYiBhc3NlcnRWYWxpZFN0YWtlVHlwZV9ib29sX21lcmdlQDYKCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmdldFdlaWdodGVkU3Rha2VGb3JBcHAoYWRkcmVzczogYnl0ZXMsIGFzc2V0OiB1aW50NjQsIGFwcDogdWludDY0LCBhY2NlcHRJbmhlcml0ZWQ6IHVpbnQ2NCkgLT4gYnl0ZXM6CmdldFdlaWdodGVkU3Rha2VGb3JBcHA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjg5MS04OTYKICAgIC8vIHByaXZhdGUgZ2V0V2VpZ2h0ZWRTdGFrZUZvckFwcCgKICAgIC8vICAgYWRkcmVzczogQWNjb3VudCwKICAgIC8vICAgYXNzZXQ6IHVpbnQ2NCwKICAgIC8vICAgYXBwOiB1aW50NjQsCiAgICAvLyAgIGFjY2VwdEluaGVyaXRlZDogYm9vbGVhbgogICAgLy8gKTogV2VpZ2h0ZWRTdGFrZSB7CiAgICBwcm90byA0IDEKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjg5NwogICAgLy8gbGV0IHRvdGFsQW1vdW50OiB1aW50NjQgPSAwCiAgICBkdXBuIDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6ODk4CiAgICAvLyBsZXQgdG90YWxXZWlnaHRlZEFnZSA9IEJpZ1VpbnQoMCkKICAgIHB1c2hieXRlcyAweAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo5MDAKICAgIC8vIGNvbnN0IHNvZnRLZXk6IFN0YWtlS2V5ID0geyBhZGRyZXNzLCBhc3NldCwgdHlwZTogU1RBS0lOR19UWVBFX1NPRlQgfQogICAgZnJhbWVfZGlnIC0zCiAgICBpdG9iCiAgICBmcmFtZV9kaWcgLTQKICAgIGRpZyAxCiAgICBjb25jYXQKICAgIGR1cAogICAgY292ZXIgMgogICAgYnl0ZWMgNSAvLyAweDE0CiAgICBjb25jYXQKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OTAxCiAgICAvLyBjb25zdCBhcHBLZXk6IEFwcFN0YWtlS2V5ID0geyBhcHAsIGFkZHJlc3MsIGFzc2V0IH0KICAgIGZyYW1lX2RpZyAtMgogICAgaXRvYgogICAgZnJhbWVfZGlnIC00CiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo5MDIKICAgIC8vIGNvbnN0IGhlbGQgPSB0aGlzLmdldEhlbGQoYWRkcmVzcywgYXNzZXQpCiAgICBmcmFtZV9kaWcgLTQKICAgIGZyYW1lX2RpZyAtMwogICAgY2FsbHN1YiBnZXRIZWxkCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjkwMwogICAgLy8gaWYgKGFwcCA9PT0gMCkgewogICAgZnJhbWVfZGlnIC0yCiAgICBibnogZ2V0V2VpZ2h0ZWRTdGFrZUZvckFwcF9lbHNlX2JvZHlANwogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwNQogICAgLy8gc3Rha2VzID0gQm94TWFwPFN0YWtlS2V5LCBTdGFrZT4oeyBrZXlQcmVmaXg6IFN0YWtpbmdCb3hQcmVmaXhTdGFrZXMgfSkKICAgIGJ5dGVjXzAgLy8gInMiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgZnJhbWVfYnVyeSAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjkwNAogICAgLy8gaWYgKHRoaXMuc3Rha2VzKHNvZnRLZXkpLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBnZXRXZWlnaHRlZFN0YWtlRm9yQXBwX2FmdGVyX2lmX2Vsc2VAMTMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OTA1CiAgICAvLyBjb25zdCBpbmZvID0gY2xvbmUodGhpcy5zdGFrZXMoc29mdEtleSkudmFsdWUpCiAgICBmcmFtZV9kaWcgMgogICAgYm94X2dldAogICAgc3dhcAogICAgZnJhbWVfYnVyeSAwCiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo5MDYKICAgIC8vIGlmIChoZWxkLm9wdGVkSW4gJiYgaGVsZC5iYWxhbmNlID49IGluZm8uYW1vdW50KSB7CiAgICBmcmFtZV9kaWcgOAogICAgcHVzaGludCA2NAogICAgZ2V0Yml0CiAgICBieiBnZXRXZWlnaHRlZFN0YWtlRm9yQXBwX2FmdGVyX2lmX2Vsc2VAMTMKICAgIGZyYW1lX2RpZyA4CiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGZyYW1lX2RpZyAwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgID49CiAgICBieiBnZXRXZWlnaHRlZFN0YWtlRm9yQXBwX2FmdGVyX2lmX2Vsc2VAMTMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OTA3CiAgICAvLyBjb25zdCBhZ2UgPSB0aGlzLmdldFdlaWdodGVkQWdlKGluZm8pCiAgICBmcmFtZV9kaWcgMAogICAgY2FsbHN1YiBnZXRXZWlnaHRlZEFnZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo5MDgKICAgIC8vIHRvdGFsQW1vdW50ICs9IGluZm8uYW1vdW50CiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgZnJhbWVfYnVyeSA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjkwOQogICAgLy8gdG90YWxXZWlnaHRlZEFnZSArPSBCaWdVaW50KGluZm8uYW1vdW50KSAqIEJpZ1VpbnQoYWdlKQogICAgaXRvYgogICAgc3dhcAogICAgaXRvYgogICAgYioKICAgIGZyYW1lX2J1cnkgNwoKZ2V0V2VpZ2h0ZWRTdGFrZUZvckFwcF9hZnRlcl9pZl9lbHNlQDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo5MjMKICAgIC8vIGNvbnN0IGhhcmRLZXk6IFN0YWtlS2V5ID0geyBhZGRyZXNzLCBhc3NldCwgdHlwZTogU1RBS0lOR19UWVBFX0hBUkQgfQogICAgZHVwCiAgICBieXRlYyA0IC8vIDB4MWUKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDUKICAgIC8vIHN0YWtlcyA9IEJveE1hcDxTdGFrZUtleSwgU3Rha2U+KHsga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4U3Rha2VzIH0pCiAgICBieXRlY18wIC8vICJzIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgNAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo5MjQKICAgIC8vIGlmICh0aGlzLnN0YWtlcyhoYXJkS2V5KS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogZ2V0V2VpZ2h0ZWRTdGFrZUZvckFwcF9hZnRlcl9pZl9lbHNlQDE1CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjkyNQogICAgLy8gY29uc3QgaW5mbyA9IGNsb25lKHRoaXMuc3Rha2VzKGhhcmRLZXkpLnZhbHVlKQogICAgZnJhbWVfZGlnIDQKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjkyNgogICAgLy8gY29uc3QgYWdlID0gdGhpcy5nZXRXZWlnaHRlZEFnZShpbmZvKQogICAgY2FsbHN1YiBnZXRXZWlnaHRlZEFnZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo5MjcKICAgIC8vIHRvdGFsQW1vdW50ICs9IGluZm8uYW1vdW50CiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGZyYW1lX2RpZyA2CiAgICBkaWcgMQogICAgKwogICAgZnJhbWVfYnVyeSA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjkyOAogICAgLy8gdG90YWxXZWlnaHRlZEFnZSArPSBCaWdVaW50KGluZm8uYW1vdW50KSAqIEJpZ1VpbnQoYWdlKQogICAgaXRvYgogICAgc3dhcAogICAgaXRvYgogICAgYioKICAgIGZyYW1lX2RpZyA3CiAgICBiKwogICAgZnJhbWVfYnVyeSA3CgpnZXRXZWlnaHRlZFN0YWtlRm9yQXBwX2FmdGVyX2lmX2Vsc2VAMTU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjkzMQogICAgLy8gY29uc3QgbG9ja0tleTogU3Rha2VLZXkgPSB7IGFkZHJlc3MsIGFzc2V0LCB0eXBlOiBTVEFLSU5HX1RZUEVfTE9DSyB9CiAgICBieXRlY18yIC8vIDB4MjgKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDUKICAgIC8vIHN0YWtlcyA9IEJveE1hcDxTdGFrZUtleSwgU3Rha2U+KHsga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4U3Rha2VzIH0pCiAgICBieXRlY18wIC8vICJzIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgNQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo5MzIKICAgIC8vIGlmICh0aGlzLnN0YWtlcyhsb2NrS2V5KS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogZ2V0V2VpZ2h0ZWRTdGFrZUZvckFwcF9hZnRlcl9pZl9lbHNlQDE3CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjkzMwogICAgLy8gY29uc3QgaW5mbyA9IGNsb25lKHRoaXMuc3Rha2VzKGxvY2tLZXkpLnZhbHVlKQogICAgZnJhbWVfZGlnIDUKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjkzNAogICAgLy8gY29uc3QgYWdlID0gdGhpcy5nZXRXZWlnaHRlZEFnZShpbmZvKQogICAgY2FsbHN1YiBnZXRXZWlnaHRlZEFnZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo5MzUKICAgIC8vIHRvdGFsQW1vdW50ICs9IGluZm8uYW1vdW50CiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGZyYW1lX2RpZyA2CiAgICBkaWcgMQogICAgKwogICAgZnJhbWVfYnVyeSA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjkzNgogICAgLy8gdG90YWxXZWlnaHRlZEFnZSArPSBCaWdVaW50KGluZm8uYW1vdW50KSAqIEJpZ1VpbnQoYWdlKQogICAgaXRvYgogICAgc3dhcAogICAgaXRvYgogICAgYioKICAgIGZyYW1lX2RpZyA3CiAgICBiKwogICAgZnJhbWVfYnVyeSA3CgpnZXRXZWlnaHRlZFN0YWtlRm9yQXBwX2FmdGVyX2lmX2Vsc2VAMTc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjkzOQogICAgLy8gaWYgKHRvdGFsQW1vdW50ID09PSAwKSB7CiAgICBmcmFtZV9kaWcgNgogICAgYm56IGdldFdlaWdodGVkU3Rha2VGb3JBcHBfYWZ0ZXJfaWZfZWxzZUAxOQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo5NDAKICAgIC8vIHJldHVybiB7IGFtb3VudDogMCwgd2VpZ2h0ZWRBZ2U6IDAgfQogICAgYnl0ZWMgMzcgLy8gMHgwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCmdldFdlaWdodGVkU3Rha2VGb3JBcHBfYWZ0ZXJfaWZfZWxzZUAxOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OTQ5CiAgICAvLyB3ZWlnaHRlZEFnZTogb3AuYnRvaShCeXRlcyh0b3RhbFdlaWdodGVkQWdlIC8gQmlnVWludCh0b3RhbEFtb3VudCkpKSwKICAgIGZyYW1lX2RpZyA2CiAgICBpdG9iCiAgICBmcmFtZV9kaWcgNwogICAgZGlnIDEKICAgIGIvCiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjk0My05NTAKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIGFtb3VudDogdG90YWxBbW91bnQsCiAgICAvLyAgIC8vIEJpZ1VpbnQgdmFsdWVzIHVzZSBhIHZhcmlhYmxlLWxlbmd0aCBiaWctZW5kaWFuIGVuY29kaW5nLiBUaGUgd2VpZ2h0ZWQKICAgIC8vICAgLy8gYXZlcmFnZSBpcyBib3VuZGVkIGJ5IHVpbnQ2NCBiZWNhdXNlIGV2ZXJ5IGNvbnRyaWJ1dGluZyBhZ2UgaXMgdWludDY0LAogICAgLy8gICAvLyBzbyBkZWNvZGUgdGhlIHF1b3RpZW50IGRpcmVjdGx5IGluc3RlYWQgb2Ygc2xpY2luZyBhcyBpZiBpdCB3ZXJlIGEKICAgIC8vICAgLy8gZml4ZWQgNjQtYnl0ZSB2YWx1ZS4KICAgIC8vICAgd2VpZ2h0ZWRBZ2U6IG9wLmJ0b2koQnl0ZXModG90YWxXZWlnaHRlZEFnZSAvIEJpZ1VpbnQodG90YWxBbW91bnQpKSksCiAgICAvLyB9CiAgICBpdG9iCiAgICBjb25jYXQKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpnZXRXZWlnaHRlZFN0YWtlRm9yQXBwX2Vsc2VfYm9keUA3OgogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwOQogICAgLy8gYXBwU3Rha2VzID0gQm94TWFwPEFwcFN0YWtlS2V5LCBBcHBTdGFrZT4oeyBrZXlQcmVmaXg6IFN0YWtpbmdCb3hQcmVmaXhBcHBTdGFrZXMgfSkKICAgIGJ5dGVjIDE2IC8vICJhIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo5MTMKICAgIC8vIGlmICh0aGlzLmFwcFN0YWtlcyhhcHBLZXkpLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBnZXRXZWlnaHRlZFN0YWtlRm9yQXBwX2FmdGVyX2lmX2Vsc2VAMTMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OTE0CiAgICAvLyBjb25zdCBpbmZvID0gY2xvbmUodGhpcy5hcHBTdGFrZXMoYXBwS2V5KS52YWx1ZSkKICAgIGZyYW1lX2RpZyAzCiAgICBib3hfZ2V0CiAgICBzd2FwCiAgICBmcmFtZV9idXJ5IDEKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjkxNQogICAgLy8gaWYgKGhlbGQub3B0ZWRJbiAmJiBoZWxkLmJhbGFuY2UgPj0gaW5mby5hbW91bnQpIHsKICAgIGZyYW1lX2RpZyA4CiAgICBwdXNoaW50IDY0CiAgICBnZXRiaXQKICAgIGJ6IGdldFdlaWdodGVkU3Rha2VGb3JBcHBfYWZ0ZXJfaWZfZWxzZUAxMwogICAgZnJhbWVfZGlnIDgKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZnJhbWVfZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgPj0KICAgIGJ6IGdldFdlaWdodGVkU3Rha2VGb3JBcHBfYWZ0ZXJfaWZfZWxzZUAxMwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo5MTYKICAgIC8vIGNvbnN0IGFnZSA9IHRoaXMuZ2V0QXBwV2VpZ2h0ZWRBZ2UoaW5mbywgYWNjZXB0SW5oZXJpdGVkKQogICAgZnJhbWVfZGlnIDEKICAgIGZyYW1lX2RpZyAtMQogICAgY2FsbHN1YiBnZXRBcHBXZWlnaHRlZEFnZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo5MTcKICAgIC8vIHRvdGFsQW1vdW50ICs9IGluZm8uYW1vdW50CiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgZnJhbWVfYnVyeSA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjkxOAogICAgLy8gdG90YWxXZWlnaHRlZEFnZSArPSBCaWdVaW50KGluZm8uYW1vdW50KSAqIEJpZ1VpbnQoYWdlKQogICAgaXRvYgogICAgc3dhcAogICAgaXRvYgogICAgYioKICAgIGZyYW1lX2J1cnkgNwogICAgYiBnZXRXZWlnaHRlZFN0YWtlRm9yQXBwX2FmdGVyX2lmX2Vsc2VAMTMKCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmdldEhlYXJ0YmVhdEF2ZXJhZ2UoYWRkcmVzczogYnl0ZXMsIGFzc2V0OiB1aW50NjQsIGluY2x1ZGVFc2Nyb3dlZDogdWludDY0KSAtPiB1aW50NjQ6CnNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuZ2V0SGVhcnRiZWF0QXZlcmFnZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTAxNi0xMDE3CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIC8vIGdldEhlYXJ0YmVhdEF2ZXJhZ2UoYWRkcmVzczogQWNjb3VudCwgYXNzZXQ6IHVpbnQ2NCwgaW5jbHVkZUVzY3Jvd2VkOiBib29sZWFuKTogdWludDY0IHsKICAgIHByb3RvIDMgMQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTAxOAogICAgLy8gY29uc3QgaGJrID0geyBhZGRyZXNzLCBhc3NldCB9CiAgICBmcmFtZV9kaWcgLTIKICAgIGl0b2IKICAgIGZyYW1lX2RpZyAtMwogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjEwMjAKICAgIC8vIGlmICghdGhpcy5oZWFydGJlYXRzKGhiaykuZXhpc3RzKSB7CiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgc3dhcAogICAgZXh0cmFjdCAzMiA4CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTEyLTExNAogICAgLy8gaGVhcnRiZWF0cyA9IEJveE1hcDxIZWFydGJlYXRLZXksIGFyYzQuU3RhdGljQXJyYXk8YXJjNEhlYXJ0YmVhdCwgND4+KHsKICAgIC8vICAga2V5UHJlZml4OiBTdGFraW5nQm94UHJlZml4SGVhcnRiZWF0cywKICAgIC8vIH0pCiAgICBieXRlYyA5IC8vICJoIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTAyMAogICAgLy8gaWYgKCF0aGlzLmhlYXJ0YmVhdHMoaGJrKS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuZ2V0SGVhcnRiZWF0QXZlcmFnZV9hZnRlcl9pZl9lbHNlQDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTAyMQogICAgLy8gcmV0dXJuIDAKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5nZXRIZWFydGJlYXRBdmVyYWdlX2FmdGVyX2lmX2Vsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTAyNAogICAgLy8gY29uc3QgaGVhcnRiZWF0cyA9IGNsb25lKHRoaXMuaGVhcnRiZWF0cyhoYmspLnZhbHVlKQogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTAyNgogICAgLy8gbGV0IHRvdGFsOiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDI3LTEwMjgKICAgIC8vIGxldCBjb3VudDogdWludDY0ID0gMAogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGhlYXJ0YmVhdHMubGVuZ3RoOyBpICs9IDEpIHsKICAgIGR1cG4gMgoKc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5nZXRIZWFydGJlYXRBdmVyYWdlX3doaWxlX3RvcEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDI4CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgaGVhcnRiZWF0cy5sZW5ndGg7IGkgKz0gMSkgewogICAgZHVwCiAgICBwdXNoaW50IDQKICAgIDwKICAgIGJ6IHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuZ2V0SGVhcnRiZWF0QXZlcmFnZV9hZnRlcl93aGlsZUAxMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDI5CiAgICAvLyBpZiAoaGVhcnRiZWF0c1tpXS50aW1lc3RhbXAuYXNVaW50NjQoKSA+IDApIHsKICAgIGR1cAogICAgaW50Y18zIC8vIDMyCiAgICAqCiAgICBkaWcgNAogICAgc3dhcAogICAgaW50Y18zIC8vIDMyCiAgICBleHRyYWN0MyAvLyBvbiBlcnJvcjogaW5kZXggYWNjZXNzIGlzIG91dCBvZiBib3VuZHMKICAgIGR1cAogICAgZnJhbWVfYnVyeSAwCiAgICBwdXNoaW50IDI0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgYnogc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5nZXRIZWFydGJlYXRBdmVyYWdlX2FmdGVyX2lmX2Vsc2VAOQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDMwCiAgICAvLyBjb3VudCArPSAxCiAgICBzd2FwCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDMxCiAgICAvLyBpZiAoaW5jbHVkZUVzY3Jvd2VkKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ6IHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuZ2V0SGVhcnRiZWF0QXZlcmFnZV9lbHNlX2JvZHlANwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDMyCiAgICAvLyB0b3RhbCArPSBoZWFydGJlYXRzW2ldLmhlbGQuYXNVaW50NjQoKSArIGhlYXJ0YmVhdHNbaV0uaGFyZC5hc1VpbnQ2NCgpICsgaGVhcnRiZWF0c1tpXS5sb2NrLmFzVWludDY0KCkKICAgIGZyYW1lX2RpZyAwCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZGlnIDEKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgKwogICAgc3dhcAogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgICsKICAgIHVuY292ZXIgMwogICAgKwogICAgY292ZXIgMgoKc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5nZXRIZWFydGJlYXRBdmVyYWdlX2FmdGVyX2lmX2Vsc2VAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTAyOAogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGhlYXJ0YmVhdHMubGVuZ3RoOyBpICs9IDEpIHsKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBiIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuZ2V0SGVhcnRiZWF0QXZlcmFnZV93aGlsZV90b3BAMwoKc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czo6U3Rha2luZy5nZXRIZWFydGJlYXRBdmVyYWdlX2Vsc2VfYm9keUA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDM0CiAgICAvLyB0b3RhbCArPSBoZWFydGJlYXRzW2ldLmhlbGQuYXNVaW50NjQoKQogICAgZnJhbWVfZGlnIDAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgdW5jb3ZlciAzCiAgICArCiAgICBjb3ZlciAyCiAgICBiIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuZ2V0SGVhcnRiZWF0QXZlcmFnZV9hZnRlcl9pZl9lbHNlQDkKCnNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmcuZ2V0SGVhcnRiZWF0QXZlcmFnZV9hZnRlcl93aGlsZUAxMDoKICAgIHBvcAogICAgdW5jb3ZlciAyCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTAzOQogICAgLy8gaWYgKGNvdW50ID09PSAwKSB7CiAgICBkdXAKICAgIGJueiBzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmdldEhlYXJ0YmVhdEF2ZXJhZ2VfYWZ0ZXJfaWZfZWxzZUAxMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmcvY29udHJhY3QuYWxnby50czoxMDQwCiAgICAvLyByZXR1cm4gMAogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpzbWFydF9jb250cmFjdHMvc3Rha2luZy9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nLmdldEhlYXJ0YmVhdEF2ZXJhZ2VfYWZ0ZXJfaWZfZWxzZUAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL2NvbnRyYWN0LmFsZ28udHM6MTA0MwogICAgLy8gcmV0dXJuIHRvdGFsIC8gY291bnQKICAgIC8KICAgIHN3YXAKICAgIHJldHN1Ygo=", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyAIAAEIIOT6AbieBoDnhA/UkAImKAFzBBUffHUBKAtFUlI6ZXJySXBheQEeARQJYWtpdGFfZGFvAXQBCgFoC0VSUjplcnJJYWFtAQALRVJSOmVyckliYWwLRVJSOmVyclNuZXgLRVJSOmVycklwbXILRVJSOmVycklwbWEBYQIAAAtFUlI6ZXJyTm9wdAZ3YWxsZXQLRVJSOmVyck5kYW+AAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWULRVJSOmVyck5sY2sLRVJSOmVyckhibmYLRVJSOmVycklwbXMLRVJSOmVyck5jbHMLRVJSOmVyck5ya3kHdmVyc2lvbgl0AAAAAAAAAAAYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC0VSUjplcnJCZXhwC0VSUjplcnJIYmN1C0VSUjplcnJCZXh1C0VSUjplcnJMb2NrGWhlYXJ0YmVhdF9tYW5hZ2VyX2FkZHJlc3MLRVJSOmVyckFjcnEQAAAAAAAAAAAAAAAAAAAAAAkAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACABOqRgN02GgCOAQErMRkURDEYQQEUgiYEg/FHSAQ5Tq6yBIJWzxkEIEZ7kwSDBIDzBMQooScEyBc8oQShADOfBA0DfIkEW/3oAgRdnRQoBOkQPE8ECVycpQQVWkZ6BG63cHgEIjWmgwRssA59BKFHe3MEn09WdAR10Tj7BNQBYq8E6n2pVQS7bDcoBEhxbxoE7xiklgT61/gXBEyI6s4E6uZfEgTdRKhDBMb9DKUEiuJmuQQmNRSNBD4AuZQEnf9AYARPwxbKBIrniZ8EM+kslASFTe3gNhoAjiYAcAClAQ4C2wWeBosG7wgYCK4J+wqhC7YL2gwNDGMM3wzsDSwNZg25Dg8OKg5+DpoPGw9OD+cQZhCbEM4Q8xGMEi4SyBOME9YUkgABACNDgATNmtZ+NhoAjgEAOwAxGYEEEjEYEERCFCSKAgCL/jgAi/8SQAAEJxmwAIv+OAkyAxJAAAQnGrAAi/44IDIDEkAABCcbsACJNhoBSSJZgQIISwEVEkRXAgA2GgJJFSQSRBcnHE8CZycGTGcjQzEAMgkSQAAPgAtFUlI6ZXJyTmNyZbAAJx29RQFBAA+AC0VSUjplcnJJbml0sAAnHScevyNDMRYjCUk4ECMSRDYaAUkVJBJEF0kyCkxwAEUBQQAPgAtFUlI6ZXJyQW9wdLAAgdR6MhAISwI4BzIKEkAAAyuwAE8COAgSQAADK7AAsTIKSwGyESKyErIUgQSyECKyAbMWJwdMUCcevyNDgAAxFiMJRwI4ECMSRDYaAUlOA0kVIxJENhoCSRUkEkQXTgQ2GgNJFSQSRBdJTgVLAYgVGDEATwNMiP7TSTIHDU4EMgchBggOTgVJKhJMJwQSQAAESUEBcSMyB04ETwVBAAVLBkAABUsBQAFZI0AABCcfsAAxACIWSU4HUEsEUChMUElOB71FAUAAlUEAPksBOAcyChJAAAMrsABMOAhLCCEECBJAAAMrsAAiTwJLCCOIEvZBAAciSwYjiBNYSwUWTBZQTwMWUExQvyNDSEwnCBJBACZJOAcyChJAAAMrsAA4CCEFEkAAAyuwADEASwJQJwlMUCcVv0L/wzEAcwBESwcPQAAEJwywAEk4BzIKEkAAAyuwADgIIQQSQP+gK7AATwVISwMnCBNAAAQnILAASwW+TElOAk4GREmBEFtJTgJFDSJbSwsITgRLCQ5AAAVLAUAAbSNAAAQnIbAAQQBPSwE4BzIKEkAABCcOsABMOAhLCRJAAAQnD7AAIk8DSwkjiBImQQAQSwcUSwdLAk8CTSJMI4gSf0lOAogSrUhMFk8CFlBPAxZQTBZQv0L/HEYCRQExAHMAREsBD0D/2ScMsAAiQv+QIkL+pCJC/owigABHAjEWgQIJRwI4ECMSRDEWIwlJTgJJOBCBBBJENhoBSU4FSRUjEkQ2GgJJFSQSRBdOBjYaA0kVJBJEF04GiBM8MQBPAkyI/PcxAEw4ABJAAAQnGbAASTgTMgMSQAAPgAtFUlI6ZXJyTmNsd7AASTgVMgMSQAAEJxqwAEk4IDIDEkAABCcbsAAyB0sESU8CDU4FMgchBggORQdJOBFJRQoWSScWTFBJRQy9RQFBAA0yB0sLvkQXCEsFD0UISwNJKhJOBScEEkAABUsEQQHvIzIHTgVPCEEABUsJQAAFSwZAAdcjQAAEJx+wADEASwJQSwVQKExQSU4JvUUBQADrQQBZSEsBOAcyChJAAAQnDrAATDgIIQQSQAAEJw+wAEk4FDIKEkAABCcKsAA4EksGEkAABCcKsABLCExLBiOIEJtMQQAISwZLBCOIEPtLAxZMFlBMFlAiFlC/I0NPBUhPAycIEkEASDEASwpwAEAABCcSsABAAAQnCrAASwI4BzIKEkAABCcOsABPAjgIIQUSQAAEJw+wAEw4EkEABCcKsAAxAExQJwlMUCcVv0L/nkgxAEsJcABAAAQnErAASwYPQAAEJwywAEsBOAcyChJAAAQnDrAATDgIIQQSQAAEJw+wADgSQf9mJwqwAEUBSwMnCBNAAAQnILAASwe+TElOAk4GREmBEFtJTgJFDiJbSwsITgVLCQ5AAAVLB0AAmSNAAAQnIbAASwI4BzIKEkAABCcOsABPAjgIQQAEJw+wAEEAUEk4FDIKEkAABCcKsAA4EksIEkAABCcKsABLCkxLCCOID3hPA0EAEUsHFEsGSwJPAk1LCUwjiA/OSU4CiA/8SEwWTwIWUE8CFlBMFlC/Qv7IRQFPBEgxAEsKcABAAAQnErAASwIPQAAEJwywADgSQf/HJwqwACJC/2QiQv4mIkL+DoAASTYaAUkVJBJEFzYaAkcCFSMSRCcEEkAABkkqEkEAyCNAAA+AC0VSUjplcnJXaG9ssAAxAEsCFlBLAVBJVwAgSwFXIAhPAlcoAU4CUExQKExQSb1FAUAABCcXsABJvkRJgRBbRQUiW0UFSwEqE0AACEsDMgcMQQBrI0AABCcisABLAkAANrExAEsFIQQIsgiyByOyECKyAbNLAk8CSU4CSwYiiA5yKhJBAA1LAkEACEsBSwQiiA7MvEgjQ7ExAEsDshFLBbISshSBBLIQIrIBs7ExACEEsgiyByOyECKyAbNC/7UiQv+SIkL/NYAANhoBSRUlEkQ2GgJJFSQSRBdJTgIWUCpQKExQSb1FAUAAD0YCIicLIk8CVClMULAjQ0m+TElPAkSBEFtJRQVBAAhLAzIHD0EABkYDIkL/1iJbTwJMIogOPiIWgRBMuyNC/8MiRwWAAEcDNhoBSRUlEkQ2GgJJFSQSRBcxACInI2VEEkAAD4ALRVJSOmVyck5oYm2wAEkWSwJMUElOA0lXACBMVyAIUCcJTFBJRQy9RQFAAAQnGLAAMgcWRQhLCr5MRQ5EiA5TVwAIRQpJJwRQIkUGSVcAIEsBVyAITwJXKAFOAlBMUChMUElFCb1FAUEACEsHvkQiW0UFKlAiRQJJVwAgSwFXIAhPAlcoAU4CUExQKExQSUUHvUUBQQAISwW+RCJbRQEiRQNLAoEEDEEASksCgQMSSUAAJEsDSSULSwxJTgNMJViBGFtMIwhJRQYlC08CTCVYgRhbDUEAJkEAHCJLBBZLAhZLC08CUExQSwZQTCULSwlMTwK7I0NLAiMIQv/eSEsBRQNC/50iNhoBRwIVJRJENhoCSRUkEkQXSU4CFlAnBVAoTFBJTgO9RQFAAAQnDbAAiA1gSSJbTIFAU0lOAksDvkxFBkRBAFBLAyJbSwEOQQBGI0lAABYiSwJLBE1JSwYiWw9BABxISwRLBEy/Ik8CTwNNJwsiTwNUTBZQKUxQsCNDMgdLBlcQCE8CFk8CFlBMUCIWUEL/0SJC/7cigABJMRYjCUk4ECMSRDYaAUlOAhUlEkQ2GgJJFSQSRBdMNhoDSRUkEkQXNhoESRUjEkQiUzINQAAEJySwADINFksFSU4CUE8FSU4CFklFC1BOA4gMokkiW0UIgUBTQAAEJxKwACcQTwJQSU4DvUUBQQDUIkxLBDgHMgoSQAADK7AATwQ4CE8CEkAAAyuwAEsCvUUBQABkSwVLAg9AAAQnDLAAIkxBADxISwJLBlAnBVAoTFBJvUUBQAAEJw2wAL5MSU8CRCJbSUUGSwYOQQAnSwFLBQ5BAB8jQAAEJwywAIgL4UgyB08CFkwWUEwWTEsBUExQvyNDIkL/3khLAb5MSU8CRCJbTwIISUsGDkAABCcMsABMI4gLvjIHSwEiW08DSwEdTwVJTgWXTwSBGFtPAh1LBJdPAxZPAxZQTwIWUEwWUL9C/64hB0xC/ygiNhoBSRUkEkQXSTYaAkkVJRJENhoDSRUkEkQXTwIWSwJQSwEWUE4CiAuASSJbSU4CTgOBQFNJTgMiTgJNTCcQTFBJTgO9RQFAAA1FARYnC0xQKUxQsCNDSwK+TEUHRExBAD9LBCJbSwMOQQA1I0lAAB0yDUsFEkEAIUsBMgdMFkwWUCIWTEsBUExQSwNMvycLIk8CVEwWUEL/t0sFIltC/9oiQv/IgABJMRYjCUk4ECMSRDYaAUkVJBJEFzYaAkkVJBJEFyInBmVEgAxha2l0YV9hc3NldHNlQADcSCclSSJbRQYkW0UESwFBALFLAUsFEkAACEsBSwQSQQChMQAiJwZlRCcTZUhyCEQSQAAEJxSwAEmBgOpJD0EAfkmBgJyTPA5BAHQjQAAPgAtFUlI6ZXJySWxrc7AASwEWJxZMUEm9RQFBAE5JvkQXSwIOQAAPgAtFUlI6ZXJyTGtkY7AAMQBLBElPAoj0uDgHMgoSQAADK7AASwM4CEsBvUUBQQAOIhJAAAMrsABLARa/I0OB1EhC/+0hBkL/sSJC/4kxAEsCcQtEEkD/aoALRVJSOmVyck5hY3KwAEL/JDYaAUkVJRJEMQAiJwZlRCcTZUhyCEQSQAAEJxSwACcjTGcjQzYaAUkVJBJEFzEATBZQJwVQKExQSb1FAUAABCcNsAC8SLExACEEsgiyByOyECKyAbMjQyKAADYaAUkVJBJEFzEATBZJTgJQJwhQKExQSb1FAUAABCcNsAC8SCEERQIxAExQJwlMUElFA71FAUEACEsBvEghBUUBsTEASwGyCLIHI7IQIrIBsyNDgAA2GgFJFSQSRBdJNhoCSU4CSRUlEkQ2GgNJFSQSRBdPAhZPAlBMFlAnEExQSb1FAUAABCcNsABPAklyB0UFSDINEkAADUsCQAAtMQBLAhJBACUjQAAPgAtFUlI6ZXJyQXNpdbAAvEixIQeyCLIHI7IQIrIBsyNDIkL/2IHUejIQCBYpTFCwI0M2GgFJFSQSRBc2GgJJFSMSRDEATwIWUEsBUChMUL1OAkgnCBJBABBBAAgiFilMULAjQyEFQv/0IQQiTwJNQv/rNhoBSRUlEkQ2GgJJFSQSRBcyDUAABCcksAAyDRZPAlBMFlAnEExQvUUBQQAIIhYpTFCwI0MhB0L/9DYaAUkVJRJENhoCSRUkEkQXFlAqUElXACBLAVcgCE8CVygBTgJQTFAoTFBJvUUBQQANMgdLAb5EgRBbD0EACUgiFilMULAjQ75EgRBbMgcJQv/uNhoBSRUlEkQ2GgJJFSQSRBcWUCpQSVcAIEsBVyAITwJXKAFOAlBMUChMUEm9RQFAAAQnF7AAMgdLAb5EgRBbDEAABCcisAC+RIEQWzIHCRYpTFCwI0M2GgFJFSUSRDYaAkkVgQkSRIgHpkgpTFCwI0M2GgFHAhUlEkQ2GgJJFYEJEkRJIltJTgJOA1cIAUlOAk4DFkxQTFBJVwkgSwFXAAhPAlcIAU4CUExQKExQSb1FAUAABCcXsAC+RIgHm0gpTFCwI0M2GgFJFSUSRDYaAkkVJBJEFyIjiAgAKUxQsCNDNhoBRwIVJRJENhoCSRUkEkQXSU4DFlAnBVBJVwAgSwFXIAhPAlcoAU4CUExQKExQSb1FAUAABCcNsAC+RCJbSwJAAB5PAkhMSXMARE8CD0xzAEQnCyJPA1RMFlApTFCwI0NMTwJwAEAAB0YCJyZC/+tJTwIPJwsiTwJUTBZQQv/bNhoBSRUkEkQXNhoCSRUlEkQ2GgNJFSQSRBc2GgRJFSMSRCJTTgJPA08DiAdMKUxQsCNDNhoBSRUlEkQ2GgJHAhWBCRJEJxFMVwgBSScFEklBABdLA1cACCcFUEsFTIgGTUiAAgABTFBFA0lAAAhLAScEEkEAIEsDVwAIJwRQSwVMiAYqSEsDSSJZIwgWVwYAXABMUEUDQAANSScEEkAABkkqEkEAH0sCVwAIKlBLBEyIBftISwJJIlkjCBZXBgBcAExQRQIpSwJQsCNDIoAANhoBSRUlEkQ2GgJJFSQSRBcWUEknBFBMKlBMIk4CSVcAIEsBVyAITwJXKAFOAlBMUChMUElOAr1FAUEACEsBvkQiW0UDIkUESVcAIEsBVyAITwJXKAFOAlBMUChMUElFBb1FAUEACEsDvkQiW0UDSwEWSwMWUClMULAjQzYaAUkVJRJENhoCSRUkEkQXFlBJVwAgTFcgCFAnCUxQSb1FAUAACUgnFSlMULAjQ75EQv/1NhoBSRUlEkQ2GgJJFSQSRBcWUElXACBMVyAIUCcJTFBJvUUBQAAEJxiwAL5EKUxQsCNDNhoBSRUlEkQ2GgJJFSQSRBc2GgNJFSMSRCJTiAa0FilMULAjQyI2GgFJFSUSRDYaAkkVJBJEFzYaA0kVIxJEIlNOAhZQSVcAIExXIAhQJwlMUEm9RQFAAAQnGLAAvkQiRwJJgQQMQQA/SSULSwRMJVhJRQeBGFtBAB1MIwhMSwRBABlLBUkiW0sBJFsITIEQWwhPAwhOAiMIQv/GSwUiW08DCE4CQv/vSE8CSElAAApGAiIWKUxQsCNDCkL/9TYaAUkVJRJENhoCSU4CFSMSRDYaA0cCIllJTgIkC4ECCEwVEkQnESJJSwMMQQBsSwNXAgBLASQLW0lOAxZLBkxQSwdQSVcAIEsBVyAITwJXKAFOAlBMUChMUEm9RQFAABlITwJITEkiWSMIFlcGAFwAJydQTCMIQv+uvkRLBk8ESwhPA4gD/0hPAkkiWSMIFlcGAFwATFBMQv/aSClMULAjQzYaAUkVJRJENhoCSU4CFSMSRDYaA0cCIllJTgIkC4ECCEwVEkQnESJJSwMMQQBkSwNXAgBLASQLW0lOAxZLBkxQSwdQSVcAIEsBVyAITwJXKAFOAlBMUChMUEm9RQFAAA+AC0VSUjplcnJTbmZksAC+REsGTwRLCE8DiANnSE8CSSJZIwgWVwYAXABMUEwjCEL/lUgpTFCwI0OAAEk2GgFJFSUSRDYaAkcCIllJTgKBEAuBAghMFRJENhoDSU4EFSMSRDYaBEkVIxJEIlMiSUsDDEEAg0sDVwIASwGBEAuBEFhJTgIiW0lFCRZLBkxQSwdQSVcAIEsBVyAITwJXKAFOAlBMUChMUEm9RQFAAA9GCCInCyJPAlQpTFCwI0O+REsGSwlLCUlOBE8DiAK2SCJbRQonCBJBAAtLBUsISwSIBDBFCUwkW0sIDUEABkYGIkL/vyMIQv92RgYjQv+0NhoBRwIiWUlOAiQLgQIITBUSRCcRIklLAwxBACZLA1cCAEsBJAskWCcHTFC+RE8CSSJZIwgWVwYAXABMUEwjCEL/00gpTFCwI0M2GgFHAiJZSU4CJAuBAghMFRJEJxEiSUsDDEEAR0sDVwIASwEkCyRYJxZMUEm9RQFAABZITEkiWSMIFlcGAFwAJyZQTCMIQv/NvkQXFoABgFBPAkkiWSMIFlcGAFwATFBMQv/gSClMULAjQzYaAUkiWYECCEsBFRJEVwIAMQAiJwZlRCcTZUhyCEQSQAAEJxSwACInBmVEgANwYWxlSIEQWzINEkAAD4ALRVJSOmVyckl1cGewACccTGcjQzYaAUkVJBJEFzEAIicGZUQnE2VIcghEEkAABCcUsAAnBkxnI0OKBACL/ScEEkEALYv/QQAUi/wWJwdMUEm+RCRbi/4IFiRMu4mL/BYnB0xQSb5EJFuL/gkWJEy7iYv9KhJB/+SL/0EAFIv8FicHTFBJvkQiW4v+CBYiTLuJi/wWJwdMUEm+RCJbi/4JFiJMu4mKAwCL/0EAFov9FicHTFBJvkSBEFuL/ggWgRBMu4mL/RYnB0xQSb5EgRBbi/4JFoEQTLuJigICi/6BGFsyB4v+JFsJCIv+Ilsdi/+Xi/6JigECi/+BGFsyB4v/JFsJCIv/iYoCAov+gRBbMgeL/iRbCQiL/0EAA4v+iYv+gRhbCUL/9IoCAYv/QAALi/5zAEQWgAGAUImL/ov/cABMFicLIk8DVFCJigICi/8iW0mL/1cIAUlPAhZMUIv+UElXCSBLAVcACE8CVwgBTgJQTFAoTFBJvUUBQAAJJyeL/4wBjACJvkSL/k4DiAAESIv/iYoEAov+JwUTQQAEi/9JiYv8i/2I/35JIltMgUBTIk4CTUmL/yJbD0EABov/SU8CiYv/VwgIi/9XEAhPAhZPAlBMUCIWUIv/iYoBAIv/JwgSQAAXi/8nBRJAAA+L/ycEEkAAB4v/KhJBABQjQAAPgAtFUlI6ZXJySXN0cLAAiSJC/+mKBAEiRwaAAIv9Fov8SwFQSU4CJwVQTIv+Fov8UExQi/yL/Yj+7E4Di/5AAKBIKExQSYwCvUUBQQAriwK+TIwARIsIgUBTQQAciwgiW4sAIlsPQQAQiwCI/oQiW0mMBhZMFqOMB0knBFAoTFBJjAS9RQFBABmLBL5EiP5iIluLBksBCIwGFkwWo4sHoIwHKlAoTFBJjAW9RQFBABmLBb5EiP47IluLBksBCIwGFkwWo4sHoIwHiwZAAAUnJYwAiYsGFosHSwGiFxZQjACJRQEnEExQSYwDvUUBQf+JiwO+TIwBRIsIgUBTQf96iwgiW4sBIlsPQf9uiwGL/4j98yJbSYwGFkwWo4wHQv9ZigMBIov+Fov9TFBJVwAgTFcgCFAnCUxQSb1FAUAABCKMAIm+RCJHAkmBBAxBAD9JJQtLBEwlWEmMAIEYW0EAHUwjCEyL/0EAGYsASSJbSwEkWwhMgRBbCE8DCE4CIwhC/8aLACJbTwMITgJC/+9ITwJISUAABCKMAIkKTIk=", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
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
   * Owner closes their SOFT stake and gets the stake box MBR back (L-2).
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
   * Owner closes their heartbeat stake and its history and gets both boxes' MBR back (L-2).
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
var StakingFactory = (_class = class {
  /**
   * The underlying `AppFactory` for when you want to have more flexibility
   */
  
  /**
   * Creates a new instance of `StakingFactory`
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
  __init() {this.params = {
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
       * Creates a new instance of the Staking smart contract using the create(string,uint64)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create transaction
       */
      create: (params) => {
        return this.appFactory.createTransaction.create(StakingParamsFactory.create.create(params));
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
  }}
}, _class);
var StakingClient = (_class2 = class _StakingClient {
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
   * Returns a new `StakingClient` client, resolving the app by creator address and name
   * using AlgoKit app deployment semantics (i.e. looking for the app creation transaction note).
   * @param params The parameters to create the app client
   */
  static async fromCreatorAndName(params) {
    return new _StakingClient(await _appclient.AppClient.fromCreatorAndName({ ...params, appSpec: APP_SPEC }));
  }
  /**
   * Returns an `StakingClient` instance for the current network based on
   * pre-determined network-specific app IDs specified in the ARC-56 app spec.
   *
   * If no IDs are in the app spec or the network isn't recognised, an error is thrown.
   * @param params The parameters to create the app client
   */
  static async fromNetwork(params) {
    return new _StakingClient(await _appclient.AppClient.fromNetwork({ ...params, appSpec: APP_SPEC }));
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
     * Owner closes their SOFT stake and gets the stake box MBR back (L-2).
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
     * Owner closes their heartbeat stake and its history and gets both boxes' MBR back (L-2).
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
     * Owner closes their SOFT stake and gets the stake box MBR back (L-2).
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
     * Owner closes their heartbeat stake and its history and gets both boxes' MBR back (L-2).
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
     * Owner closes their SOFT stake and gets the stake box MBR back (L-2).
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
     * Owner closes their heartbeat stake and its history and gets both boxes' MBR back (L-2).
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
  }}
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
  __init7() {this.state = {
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
  }}
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
}, _class2);

// src/staking/types.ts
var StakingType = /* @__PURE__ */ ((StakingType2) => {
  StakingType2[StakingType2["Heartbeat"] = 10] = "Heartbeat";
  StakingType2[StakingType2["Soft"] = 20] = "Soft";
  StakingType2[StakingType2["Hard"] = 30] = "Hard";
  StakingType2[StakingType2["Lock"] = 40] = "Lock";
  return StakingType2;
})(StakingType || {});

// src/staking/errors.ts
var STAKING_ERROR_MESSAGES = _chunkQ5IKYOZSjs.withErrorCodeAliases.call(void 0, {
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
var translateStakingError = _chunkQ5IKYOZSjs.makeErrorTranslator.call(void 0, STAKING_ERROR_MESSAGES);

// src/staking/index.ts
var StakingSDK = class extends _chunk3QW7XUAWjs.BaseSDK {
  constructor(params) {
    super({ factory: StakingFactory, ...params }, _chunkMY4J3UZTjs.ENV_VAR_NAMES.STAKING_APP_ID);
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
    return _nullishCoalesce(timeLeft, () => ( 0n));
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
    return _nullishCoalesce(average, () => ( 0n));
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
      const total = _algokitutils.microAlgo.call(void 0, isEscrowed ? cost + amount : cost);
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
        amount: _algokitutils.microAlgo.call(void 0, cost),
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
      extraFee: _algokitutils.microAlgo.call(void 0, BigInt(asset) === 0n ? 1e3 : 2e3)
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
      extraFee: _algokitutils.microAlgo.call(void 0, 1e3)
    });
  }
  /** Closes the sender's heartbeat stake and history for `asset` and refunds both boxes' MBR. */
  async closeHeartbeat({ sender, signer, asset }) {
    return await this.client.send.closeHeartbeat({
      ...this.getSendParams({ sender, signer }),
      args: { asset },
      extraFee: _algokitutils.microAlgo.call(void 0, 1e3)
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
      extraFee: _algokitutils.microAlgo.call(void 0, 1e3),
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
      amount: _algokitutils.microAlgo.call(void 0, (current == null ? void 0 : current[1]) ? 0 : 9300),
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
      amount: _algokitutils.microAlgo.call(void 0, cost),
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






exports.StakingType = StakingType; exports.STAKING_ERROR_MESSAGES = STAKING_ERROR_MESSAGES; exports.translateStakingError = translateStakingError; exports.StakingSDK = StakingSDK;
//# sourceMappingURL=chunk-6R3GFQH2.js.map